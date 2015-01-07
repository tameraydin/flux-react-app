var gulp = require('gulp');
var runSequence = require('gulp-run-sequence');
var clean = require('gulp-clean');
var header = require('gulp-header');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

var PATHS = {
  SOURCE: 'src/',
  DIST: 'dist/'
};

gulp.task('clean', function() {
  return gulp.src(PATHS.DIST + '**/*.*', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('copy', function() {
  return gulp.src(PATHS.SOURCE + '*.html')
    .pipe(gulp.dest(PATHS.DIST));
});

gulp.task('browserify', function() {
  browserify('./' + PATHS.SOURCE + 'js/main.js')
    .transform(reactify)
    .bundle()
    .pipe(source('js/main.js'))
    .pipe(gulp.dest(PATHS.DIST));
});

gulp.task('build', function() {
  runSequence(
    'clean',
    'copy',
    'browserify'
  )
});
