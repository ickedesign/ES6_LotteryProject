//创建一个处理模板的构建文件
import gulp from 'gulp';
import gulpif from 'gulpif';	//判断语句
import livereload from 'gulp-livereload';	//热更新
import args from './util/args';	//处理命令行参数

//创建gulp的处理模板任务
gulp.task('pages',()=>{
	return gulp.src('app/**/*.ejs')	//打开app目录下的所有ejs文件
		.pipe(gulp.dest('server'))	//把所有文件都拷贝到server目录下
		.pipe(gulpif(args.watch,livereload()))	//监听是不是热更新
		
})