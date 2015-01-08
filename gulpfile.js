var gulp = require('gulp');
var runSequence = require('gulp-run-sequence');
var clean = require('gulp-clean');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var usemin = require('gulp-usemin');
var to5 = require('gulp-6to5'); // this also handles JSX transform

var PATHS = {
  SOURCE: './src/',
  DIST: './dist/',
  BUILD: './build/'
};

var development = true;
var deploying = false;

gulp.task('clean', function() {
  return gulp.src(PATHS.BUILD + '**/*.*', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('html', function() {
  return gulp.src(PATHS.SOURCE + '*.html')
    .pipe(gulp.dest(PATHS.BUILD));
});

gulp.task('img', function() {
  return gulp.src(PATHS.SOURCE + 'img/*.*')
    .pipe(gulp.dest(PATHS.BUILD + 'img/'));
});

gulp.task('css', function () {
  return gulp.src(PATHS.SOURCE + 'css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(PATHS.BUILD + 'css/'));
});

gulp.task('es6to5', function() {
  return gulp.src(PATHS.SOURCE + 'js/**/*.js')
    .pipe(to5())
    .pipe(gulp.dest(PATHS.BUILD + 'js/es5'));
});

gulp.task('clean-es6', function() {
  return gulp.src(PATHS.BUILD + 'js/es5/')
    .pipe(clean());
});

gulp.task('browserify', ['es6to5'], function() {
  return browserify({
      entries: [PATHS.BUILD + 'js/es5/main.js'],
      debug: development
    })
    .bundle()
    .pipe(source('js/main.js'))
    .pipe(gulp.dest(PATHS.BUILD));
});

gulp.task('js', function(cb) {
  return runSequence(
    'es6to5',
    'browserify',
    'clean-es6',
    cb);
});

gulp.task('usemin', function() {
  return gulp.src(PATHS.BUILD + 'index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [uglify()]
    }))
    .pipe(gulp.dest(PATHS.DIST));
});

gulp.task('build', function(cb) {
  development = deploying ? false : true;
  return runSequence(
    'clean',
    'html',
    'img',
    'css',
    'js',
    cb);
});

gulp.task('deploy', function(cb) {
  deploying = true;
  return runSequence(
    'build',
    'usemin',
    cb);
});
