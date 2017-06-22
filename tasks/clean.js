//在app中的文件执行拷贝的时候，清空server/public和server/views中的文件
import gulp from 'gulp';
import del from 'del';//删除文件
import args from './util/args';//处理命令行参数

gulp.task('clean',()=>{
	return del(['server/public','server/views'])
})