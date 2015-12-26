var gulp = require('gulp'),
  concat = require('gulp-concat');
  browserSync = require('browser-sync');
  exec = require('child_process').exec;

var reload = browserSync.reload;

//Run Flask server
gulp.task('build', function() {
  var proc = exec('python ../webserver.py');
  return gulp.src(['static/js/views/*.js', 'static/js/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('static/js/'));
});

// Default task: Watch Files For Changes & Reload browser
gulp.task('default', ['build'], function () {
  browserSync({
    notify: false,
    proxy: "127.0.0.1:5000"
  });
 
  gulp.watch(['templates/*.*', 'static/*/*.*'], reload);

});
