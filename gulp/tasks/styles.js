var gulp = require('gulp'),
sass = require('gulp-sass'),
postcss = require('gulp-postcss'), // plugin to use the 'postcss'
minifycss = require('gulp-minify-css'),
autoprefixer = require('gulp-autoprefixer'), // plugin to use the 'autoprefixer' feature
cssvars = require('postcss-simple-vars'), // plugin to use the variables in css
nestedcss = require('postcss-nested'), // plugin to write the nested css
cssImport = require('postcss-import'), // to download the code where the import is there
mixins = require('postcss-mixins');

gulp.task('styles', function () {
    return gulp.src('./assets/styles/styles.scss')
      .on('error', function (errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
      })
      .pipe(sass({ style: 'expanded'}))
      .pipe(autoprefixer("last 3 version", "safari 5", "ie 8", "ie 9"))
      .pipe(gulp.dest('./temp/styles'));
});