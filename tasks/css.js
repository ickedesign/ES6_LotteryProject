//创建一个处理CSS的构建文件
import gulp from 'gulp';
import gulpif from 'gulpif';
import livereload from 'gulp-livereload';
import args from './util/args';

gulp.task('css',()={
	return gulp.src('app/**/*.css')
		.pipe(gulp.dest('server/public'))
		//这一部分不用加热更新，因为css文件放到文件夹下就好了，不需要编译
		
})