//将app编译成功原文件放入server/public中
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';//gulp常用的函数集合
import args from './util/args';//处理命令行

gulp.task('browser',(cb)=>{
	if(!args.watch) return cb();
	
	//监听app/js中的js发生变化的时候启动tasks中的scripts.js构建脚本
	////当启动时，会将app/js中的js由ES6转成ES5或ES4，然后放入server/public/javascripts中
	//第一个参数是要监听的任务，第二个参数是要执行的任务
	gulp.watch('app/**/*.js',['scripts']);
	
	gulp.watch('app/**/*.ejs',['pages']);

	gulp.watch('app/**/*.css',['css']);

	
});