'use strict';

import gulp from 'gulp';
import less from 'gulp-less';
import path from 'path';
import runSequence from 'run-sequence';
import gutil from 'gulp-util';
import del from 'del';

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
         .pipe(gulp.dest(paths.dist));
});

gulp.task('less', () => {
  return gulp.src(paths.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('default', (cb) => {
  runSequence('clean',['fonts','less'], cb);
});
