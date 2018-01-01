// REQUIRE DEPENDENCIES
// ============================================================
const gulp = require('gulp');
const concat = require('gulp-concat');
const annotate = require('gulp-ng-annotate');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

// DECLARE FILE PATHS
// ============================================================
const paths = {
  jsSource: [ './public/app/**/*.js', '!/public/bundle.js' ],
  sassSource: [ './public/styles/**/*.sass' ], // Add to array or change current path to './public/styles/**/*.scss' to use Scss
};

// DEFINE TASKS
// ============================================================
gulp.task('js', function() {
  return gulp.src(paths.jsSource)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('bundle.js'))
    .pipe(annotate())
  //.pipe(uglify()) //Uncomment when code is production ready
    .pipe(gulp.dest('./public'));
});

gulp.task('sass', function() {
  return gulp.src(paths.sassSource)
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public'));
});

// WATCH TASKS
// ============================================================
gulp.task('watch', function() {
  gulp.watch(paths.jsSource, [ 'js' ]);
  gulp.watch(paths.sassSource, [ 'sass' ]);
//   gulp.watch(paths.sassSource, ['less']); //Uncomment if using Less
});

// RUN DEFAULT TASK - first thing to run when gulp is called
// ============================================================
gulp.task('default', [ 'watch', 'js', 'sass' ]);
