// REQUIRE DEPENDENCIES
// ============================================================
var gulp = require('gulp');
var concat = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

// DECLARE FILE PATHS
// ============================================================
var paths = {
  jsSource: ['./public/app/**/*.js', '!/public/bundle.js'],
  sassSource: ['./public/styles/**/*.sass'], // Add to array or change current path to './public/styles/**/*.scss' to use Scss
};

// DEFINE TASKS
// ============================================================
gulp.task('js', function() {
  return gulp.src(paths.jsSource)
  .pipe(babel())
  .pipe(concat('bundle.js'))
  .pipe(annotate())
  //.pipe(uglify()) //Uncomment when code is production ready
  .pipe(gulp.dest('./public'));
});

gulp.task('sass', function () {
  return gulp.src(paths.sassSource)
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public'));
});

// WATCH TASKS
// ============================================================
gulp.task('watch', function() {
  gulp.watch(paths.jsSource, ['js']);
  gulp.watch(paths.sassSource, ['sass']);
//   gulp.watch(paths.sassSource, ['less']); //Uncomment if using Less
});

// RUN DEFAULT TASK - first thing to run when gulp is called
// ============================================================
gulp.task('default', ['watch', 'js', 'sass']); 
