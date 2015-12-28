var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  jshint = require("gulp-jshint"),
  minify_css = require('gulp-minify-css'),
  browser_sync = require('browser-sync'),
  exec = require('child_process').exec,
  reload = browser_sync.reload;

var all_javascript = [
  'static/js/views/*.js',
  'static/js/main.js',
  'static/js/router.js',
  'static/js/models.js',
  'static/js/templates.js'
]

// Run flask server
gulp.task('runserver', function() {
  exec('python ../webserver.py');
});

// Build all.js and all.min.js
gulp.task('build-js', function(){
  return gulp.src(all_javascript)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('static/js/'))
    .pipe(uglify())   // Minify
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist'));
});

// Minify CSS
gulp.task('minify-css', function(){
  return gulp.src('static/css/*')
    .pipe(minify_css({compatibility: 'ie8'}))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('dist'));
});

// Lint JS
gulp.task('lint', function(){
  return gulp.src(all_javascript)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Watch files, build accordingly, and reload browser.
gulp.task('default', ['lint', 'build-js', 'minify-css', 'runserver'], function () {
  // Build CSS
  gulp.watch('static/css/*', function(){
    gulp.run('minify-css');
  });

  // Build JS
  gulp.watch('static/js/*/*.*', function(){
    gulp.run('build-js');
  });

  // Watch for file changes and reload browser.
  browser_sync({
    notify: false,
    proxy: "127.0.0.1:5000"
  });
  gulp.watch(['dist/*', 'templates/*.html'], reload);
});

// Build minified CSS and Javascript without browser.
gulp.task('build', ['build-js', 'minify-css'], function(){
    gulp.run('build-js')
    gulp.run('minify-css')
});
