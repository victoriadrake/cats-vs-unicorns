var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
pug = require('gulp-pug'),
gutil = require('gulp-util'),
critical = require('critical').stream;

gulp.task("default", function () {

// Process sass to minified css & autoprefix
gulp.src('sass/*.sass')
  .pipe(sass({ outputStyle: 'compressed' }))
  .pipe(autoprefixer())
  .pipe(gulp.dest('static/css/'));

});

gulp.task("watch", function () {
// Process sass to minified css & autoprefix
gulp.watch('sass/*.sass', function () {
  gulp.src('sass/*.sass')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('static/css/'));

});

});