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

  gulp.src(['package.json', 'bower.json', '.bowerrc', 'tsconfig.json', 'typings.json', 'index.html'])
    .pipe(conn.newer('/home/stephen'))
    .pipe(conn.dest('/home/stephen'));

  // gulp.src(['public/**', '!public/bower_components/**'])
  //   .pipe(conn.newer('/home/stephen/public'))
  //   .pipe(conn.dest('/home/stephen/public'));

  gulp.src(['app/**'])
    .pipe(conn.newer('/home/stephen/app'))
    .pipe(conn.dest('/home/stephen/app'));
});
