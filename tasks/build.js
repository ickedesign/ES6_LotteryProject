//把所有的任务关联起来，划分依赖关系
import gulp from 'gulp';
//处理包的顺序问题，比如scripts.js要先执行，把js编译完，再执行server.js
import gulpSequence from 'gulp-sequence';

//css和pages可以互换顺序，其它不行，server一定要放在最后面
gulp.task('build',gulpSequence('clean','css','pages','scripts',['browser','serve']));

