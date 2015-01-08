var gulp = require('gulp');
var runSequence = require('gulp-run-sequence');
var clean = require('gulp-clean');
var preprocess = require('gulp-preprocess');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

var PATHS = {
  SOURCE: 'src/',
  DIST: 'dist/'
};

var CONTEXT = {
  DEV: {
    ENV: 'DEV',
    DEBUG: true
  },
  PROD: {
    ENV: 'PROD'
  }
};

var DEVELOPMENT = true;

gulp.task('clean', function() {
  return gulp.src(PATHS.DIST + '**/*.*', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('html', function() {
  return gulp.src(PATHS.SOURCE + '*.html')
    .pipe(preprocess({
      context: CONTEXT[DEVELOPMENT ? 'DEV' : 'PROD']
    }))
    .pipe(gulp.dest(PATHS.DIST));
});

gulp.task('images', function() {
  return gulp.src(PATHS.SOURCE + 'img/*.*')
    .pipe(gulp.dest(PATHS.DIST + 'img/'));
});

gulp.task('browserify', function() {
  browserify({
      entries: ['./' + PATHS.SOURCE + 'js/main.js'],
      debug: DEVELOPMENT
    })
    .transform(reactify)
    .bundle()
    .pipe(source('js/main.js'))
    .pipe(gulp.dest(PATHS.DIST));
});

gulp.task('startBuild', function() {
  tasks = DEVELOPMENT ?
    ['clean', 'html', 'images', 'browserify'] :
    ['clean', 'html', 'images', 'browserify'];
  runSequence.apply(this, tasks);
});

gulp.task('build', function(env) {
  DEVELOPMENT = true;
  gulp.run('startBuild');
});

gulp.task('deploy', function(env) {
  DEVELOPMENT = false;
  gulp.run('startBuild');
});
