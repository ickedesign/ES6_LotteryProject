//这个构建脚本用于处理命令行参数，程序识别
import yargs from 'yargs';

const args = yargs
	
	//option()的第一个参数为选项部分，相当于命令行中的gulp -production
	//区分线上和开发环境
	.option('production',{
		boolean: true,
		default: false,
		describe: 'min all scripts'
	})

	//监听开发环境中的文件，比如改了一个css是否自动编译
	.option('watch',{
		boolean: true,
		default: false,
		describe: 'watch all files'
	})

	//详细输出命令行执行的日志
	.option('verbose',{
		boolean: true,
		default: false,
		describe: 'log'
	})	

	//处理js文件压缩后产生的sourcemaps参数
	.option('sourcemaps',{
		describe: 'force the creation of sourcemaps'
	})

	//服务器端口
	.option('port',{
		string: true,
		default: 8080,
		describe: 'server port'
	})

	//表示对输入的命令行的内容以字符串作为解析
	.argv
