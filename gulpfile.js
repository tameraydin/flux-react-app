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

gulp.task('browserify', function() {
  browserify('./' + PATHS.SOURCE + 'js/main.js')
    .transform(reactify)
    .bundle()
    .pipe(source('js/main.js'))
    .pipe(gulp.dest(PATHS.DIST));
});

gulp.task('init', function() {
  tasks = DEVELOPMENT ?
    ['clean', 'html', 'browserify'] :
    ['clean', 'html', 'browserify'];
  runSequence.apply(this, tasks);
});

gulp.task('build', function(env) {
  DEVELOPMENT = true;
  gulp.run('init');
});

gulp.task('deploy', function(env) {
  DEVELOPMENT = false;
  gulp.run('init');
});
