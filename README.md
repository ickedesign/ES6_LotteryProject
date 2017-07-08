# ES6彩票项目

### 项目目前基本的目录结构如下：
- app （前端代码）
  - css
  - js 
    - class （初始化test.js，放置类）
    - index.js （入口文件）
  - views （放置HTML、模板等）
    - error.ejs （错误文件）
    - index.ejs （入口文件）
- server （建立在Node.js的服务器文件）
  - Express脚手架的一些文件  （使用`express -e .`命令行创建，已引入）
  - node_modules  （文件夹过大，未引入）
- tasks （存放构建工具）
  - util
    - args.js （该构建脚本用于处理命令行参数）
  - browser.js （将app编译成功原文件放入server/public中）
  - build.js （把所有的任务关联起来，划分依赖关系）
  - clean.js （在app中的文件执行拷贝的时候，清空server/public和server/views中的文件）
  - css.js （创建一个处理CSS的构建文件）
  - default.js （输入命令行gulp的时候，第一个找的是gulpfile.babel.js,然后默认执行该文件）
  - pages.js （创建一个处理模板的构建文件）
  - scripts.js (创建js编译任务)  
  - server.js （创建一个处理服务器脚本的构建文件）
- node_modules  （文件夹过大，未引入）  
- .babelrc （给babel使用）
- gulpfile.babel.js （文件名加babel的原因是使用了ES6，不然gulp会报错）
- package.json

### 项目技术：
- 语法： ES6
- 任务自动化工具： gulp
- 编译工具： babel、webpack
- 后台服务器： node、express

### 项目功能：
- 正在构建中

**备注**：
- 由于node_modules文件夹过大未引入，因为根目录和server文件夹下已经引入了package.json，所以直接在这两个文件夹中输入命令行`npm install`即可
- 项目有什么错误之处，麻烦在Issues或者Pull Requests中提出您的宝贵建议
