var gulp = require('gulp');
var minimist = require('minimist');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var args = minimist(process.argv.slice(2));

gulp.task('deploy', function() {
  var conn = ftp.create({
    host: args.ip,
    user: args.user,
    password: args.password,
    log: gutil.log
  });

  gulp.src(['app.js', 'package.json', 'bower.json', '.bowerrc'])
    .pipe(conn.newer('/home/stephen'))
    .pipe(conn.dest('/home/stephen'));

  gulp.src(['public/**'])
    .pipe(conn.newer('/home/stephen/public'))
    .pipe(conn.dest('/home/stephen/public'));

  gulp.src(['test/**'])
    .pipe(conn.newer('/home/stephen/test'))
    .pipe(conn.dest('/home/stephen/test'));

});
