// gulpfile.js

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

 //build react app
gulp.task('build', function () {
  browserify({
    entries: './private/scripts/sandbox.jsx',
    extensions: ['.jsx', '.js', '.min.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('private/dist'));
});

gulp.task('default', ['build']);

//scss
gulp.task('sass', function() {
  gulp.src('./private/sass/main.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./private/dist/'))
});

//watch scss and jsx files
gulp.task('watch', function(){
	gulp.watch('./scripts/**/*.jsx', ['build']);
  gulp.watch('./sass/**/*.scss', ['styles']);
});