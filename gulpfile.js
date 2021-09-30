
var gulp = require('gulp');
var concate = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

 gulp.task('styles',function (){
    return gulp.src('src/*.css')
           .pipe(concate('all.css'))
           .pipe(cleanCSS({compatibility: 'ie8'}))
           .pipe(gulp.dest('dist'));
 });
