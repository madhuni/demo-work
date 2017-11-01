var gulp = require('gulp'),
watch = require('gulp-watch'); // plugin for watching the changes to the files

gulp.task('watch', function () {

  watch('./app/assets/styles/**/*.css', function () {
        gulp.start('styles');
    });
});