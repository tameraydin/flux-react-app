var gulp = require('gulp');
var runSequence = require('gulp-run-sequence');
var clean = require('gulp-clean');
var preprocess = require('gulp-preprocess');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var minifyHtml = require('gulp-minify-html');
var to5 = require('gulp-6to5'); // this also handles JSX transform

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

gulp.task('copyHtml', function() {
  return gulp.src(PATHS.SOURCE + '*.html')
    .pipe(preprocess({
      context: CONTEXT[DEVELOPMENT ? 'DEV' : 'PROD']
    }))
    .pipe(gulp.dest(PATHS.DIST));
});

gulp.task('minifyHtml', function() {
  return gulp.src(PATHS.DIST + '*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest(PATHS.DIST));
});

gulp.task('html', function() {
  tasks = DEVELOPMENT ?
    ['copyHtml'] :
    ['copyHtml', 'minifyHtml'];
  runSequence.apply(this, tasks);
});

gulp.task('images', function() {
  return gulp.src(PATHS.SOURCE + 'img/*.*')
    .pipe(gulp.dest(PATHS.DIST + 'img/'));
});

gulp.task('es6to5', function() {
  return gulp.src('./' + PATHS.SOURCE + 'js/**/*.js')
    .pipe(to5())
    .pipe(gulp.dest('./' + PATHS.DIST + 'js/es5'));
});

gulp.task('clean-es6', function() {
  return gulp.src('./' + PATHS.DIST + 'js/es5/')
    .pipe(clean());
});

gulp.task('browserify', ['es6to5'], function() {
  var b = browserify({
      entries: ['./' + PATHS.DIST + 'js/es5/main.js'],
      debug: DEVELOPMENT
    });
  var bndl = b.bundle();
  var src = bndl.pipe(source('js/main.js'));

  if (!DEVELOPMENT) {
    return src
      .pipe(buffer())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(PATHS.DIST));

  } else {
    return src.pipe(gulp.dest(PATHS.DIST));
  }
});

gulp.task('js', function() {
  runSequence.apply(this, ['es6to5', 'browserify', 'clean-es6']);
});

gulp.task('startBuild', function() {
  tasks = DEVELOPMENT ?
    ['clean', 'html', 'images', 'js'] :
    ['clean', 'html', 'images', 'js'];
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
