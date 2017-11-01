var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
minifyhtml = require('gulp-minify-html');

// creating a task to delete the 'docs' folder completely so that we have a new fresh build each time
gulp.task('deleteDocsFolder', function () {
  return del('./docs');
});

// creating a task to compress all the images and move those to docs folder
gulp.task('optimizeImages', ['deleteDocsFolder'], function () {
  return gulp.src(['./app/assets/images/**/*'])
    .pipe(imagemin({
      progressive: true, // optimize the jpeg images
      interlaced: true, // it will help with the .gif images
      multipass: true // for all kind of svg images
    }))
    .pipe(gulp.dest('./docs/assets/images'));
});

// creating a task to compress all the videos and move those to docs folder
gulp.task('optimizeVideos', ['deleteDocsFolder'], function () {
  return gulp.src(['./app/assets/videos/**/*'])
    .pipe(gulp.dest('./docs/assets/videos'));
});

// moving the JS libs files to the docs folder
gulp.task('moveJsLibs', ['deleteDocsFolder'], function () {
  return gulp.src(['./app/assets/scripts/libs/**/*'])
    .pipe(gulp.dest('./docs/assets/scripts/libs'));
});

/* 
  Optimizing the CSS and JS files. The optimization includes:
    1) Copy the files to the Docs folder
    2) Compress file size
    3) Revision (This help us creating the new version of file every time so that browser will download the file every time)
*/
gulp.task('usemin', ['deleteDocsFolder', 'styles'], function () {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}], // cssnano will compress the css files
      js: [function() {return rev()}, function() {return uglify()}] // uglify will compress the js files
    }))
    .pipe(minifyhtml()) // this will minified the index.html file
    .pipe(gulp.dest('./docs/')); // this will copy the HTML file to destination
});

/* In the main build file, we add the dependencies in the array */
gulp.task('build', ['deleteDocsFolder', 'optimizeImages', 'optimizeVideos', 'moveJsLibs', 'usemin']);