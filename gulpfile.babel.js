'use strict';

import gulp from 'gulp';
import less from 'gulp-less';
import gutil from 'gulp-util';
import minifyCSS from 'gulp-minify-css';
import rename from 'gulp-rename';
import runSequence from 'run-sequence';
import path from 'path';
import del from 'del';
import merge from 'merge-stream';

var paths = {
  dist: './dist/',
  fonts: './fonts/*',
  less: ['./less/bootstrap.less','./less/theme.less']
};

gulp.task('clean', () => {
  return del(paths.dist);
});

gulp.task('fonts', () => {
  return gulp.src(paths.fonts)
         .pipe(gulp.dest(paths.dist + "fonts/"));
});

gulp.task('less', () => {

  var lessFiles = paths.less;

  var count = 0;

  for (let f in lessFiles) {
    lessFiles[count] = gulp.src(lessFiles[f])
                        .pipe(less({
                          paths: [ path.join(__dirname, 'less', 'includes') ]
                        }))
                        .pipe(gulp.dest(paths.dist))
                        .pipe(rename({
                            suffix: "-min",
                            extname: ".css"
                        }))


                        .pipe(gulp.dest(paths.dist))
    count++;
  }

  return merge.apply(this, lessFiles)

});

gulp.task('default', (cb) => {
  runSequence('clean',['fonts','less'], cb);
});
