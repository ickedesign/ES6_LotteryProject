//创建一个脚本文件对js做处理
import gulp from 'gulp';					//基础包
import gulpif from 'gulp-if';			//用gulp的语句做if判断
import concat from 'gulp-concat'; //在gulp中处理文字拼接
import webpack from 'webpack';		//打包
//gulp处理的都是文件流，基于stream，对webpack的处理要结合webpack-stream
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';	//命名
import livereload from 'gulp-livereload';//热更新
import plumber from 'gulp-plumber';//处理文件信息流
import rename from 'gulp-rename'; //重命名
import uglify from 'gulp-uglify';  //处理js,css压缩
import {log,colors} from 'gulp-util'; //命令行工具的输出
import args from './util/args';   //对命令行的参数做解析

//安装命令:$ npm install gulp gulp-if gulp-concat webpack webpack-stream vinyl-named gulp-livereload gulp-plumber gulp-rename gulp-uglify gulp-util yargs --save-dev
//--save-dev的作用是表示要把文件除了安装外还要在package.json中创建一个安装包依赖的一些字段

//创建gulp的js编译任务,gulp.task()
gulp.task('scripts',()=>{

	//打开路径文件
	return gulp.src(['app/js/index.js'])

	//处理常规的错误逻辑，因为按照gulp规定的错误逻辑是在每次pipe出现错误都抛出异常，又因为处理脚本文件要经历很长的流程
	//为了避免在某一环节报错抛出异常，我们要集中处理错误
		.pipe(plumber({
			errorHandle: function() {

			}
		}))

		//文件命名
		.pipe(named())	

		//对js进行编译，使用webpack
		.pipe(gulpWebpack({
			module: {
				loaders: [{
					test: /\.js$/,
					loader: 'babel'
				}]
			}
		}),null,(err,stats)=>{
			log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
				chunks: false
			}))
		})

		//编译完成后文件的存放路径
		.pipe(gulp.dest('server/public/javascripts'))

		//为了压缩文件而用重命名的方式来备份文件
		.pipe(rename({
			basename: 'cp',
			extname: '.min.js'
		}))

		//压缩文件
		.pipe(uglify({compress:{properties:false},output:{'quote_keys':true}}))

		//压缩文件的存储路径
		//这样这个文件夹中就有两个文件，一个是压缩的，一个是未压缩的
		.pipe(gulp.dest('server/public/javascripts'))
		
		
		//监听文件，热更新
		.pipe(gulpif(args.watch,livereload()))
})