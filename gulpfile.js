var gulp = require('gulp');
var runSequence = require('gulp-run-sequence');
var clean = require('gulp-clean');
var react = require('gulp-react');
var header = require('gulp-header');
var footer = require('gulp-footer');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
// gulp-ignore

var ENV_TARGET = 'dev';

gulp.task('clean', function() {
  return gulp.src(ENV_TARGET + '/**/*.*', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('copy', function(path) {
  return gulp.src('src/**/*.*')
    .pipe(gulp.dest(ENV_TARGET));
});

gulp.task('convertJSX', function() {
  return gulp.src(ENV_TARGET + '/**/views/*.jsx')
    .pipe(react())
    .pipe(header(
      'var React = require("react");' +
      'module.exports = '
    ))
    .pipe(footer(';'))
    .pipe(gulp.dest(ENV_TARGET));
});
gulp.task('convertViews', ['convertJSX'], function() {
  // convertJSX is done, now remove JSX files:
  return gulp.src(ENV_TARGET + '/**/views/*.jsx', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('browserify', function() {
  browserify('./' + ENV_TARGET + '/main.js')
    .transform(reactify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(ENV_TARGET));
});

gulp.task('build', function() {
  runSequence(
    'clean', // clean target folder
    'copy', // copy all files to target
    'convertViews', // convert JSX views to JS
    'browserify'
  )
});

// gulp.task('watch', function() {
//     gulp.watch('src/**/*.*', ['default']);
// });
