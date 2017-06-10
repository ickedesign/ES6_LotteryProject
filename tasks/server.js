//创建一个处理服务器脚本的构建文件
import gulp from 'glup';
import gulpif from 'glup-if';
import liverserver from 'gulp-live-server';	//启动服务器
import args from './util/args';

gulp.task('serve',(cb)=>{
	if(!args.watch){
		return cb();	//如果不处于监听下，返回参数
	}
	else{
		//创建服务器
		var server = liveserver.new(['--harmony','server/bin/www']);
		//--harmony这个参数表示在当前命令行下执行后面这个脚本
		//server/bin/www是一个脚本
		server.start();

		//当js，模板发生改变的时候，浏览器实现自动刷新
		//监听server文件下的js和ejs模板引擎
		//该项目与es6相关，css不做监听处理
		
		//处理前端的字样文件，热更新
		gulp.watch(['server/public/**/*.js','server/views/**/*.ejs'],function(file){
			server.notify.apply(server,[file]);//通知服务器文件改变，作相应处理
		})

		//路由，接口发生变化时，重启服务器
		//routes下为服务器的脚本文件作接口用的；app.js是整个服务启动的入口文件
		gulp.watch(['server/routes/**/*.js','server/app.js'],function(){
			server.start.bind(server)()
		})
		
	}
})