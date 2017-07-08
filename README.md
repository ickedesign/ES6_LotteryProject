ES6_LotteryProject
===========================
> ES6彩票项目 [ES6,Gulp,Express]

### 环境依赖
node v4.0.0+<br>
npm v3.0.0+

### 部署步骤
1. 在根目录下
  - npm int
  - npm install
2. 在server目录下
  - express -e ./
  - npm install

### 项目运行
gulp --watch

### 目录结构描述
```
├── app                        // 存放前端代码               
│   ├── css                
│   ├── js    
│   |   ├── lottery            // 放置类   
│   |   |   ├── base.js        // 基本模块
│   |   |   ├── calculate.js   // 计算模块
│   |   |   ├── interface.js   // 接口模块
│   |   |   └── timer.js       // 倒计时模块
│   |   ├── index.js           // 整个彩票项目的大入口文件   
│   |   └── lottery.js         // 负责11选5这个具体彩种的入口文件
│   └── views
├── server                     // 存放Express脚手架                
├── tasks                      // 存放构建工具                               
│   ├── util                 
│   |   └── args.js            // 该构建脚本用于处理命令行参数
│   ├── browser.js             // 将app编译成功原文件放入server/public中
|   ├── build.js               // 把所有的任务关联起来，划分依赖关系    
│   ├── clean.js               // 在app中的文件执行拷贝的时候，清空server/public和server/views中的文件
|   ├── css.js                 // 处理CSS的构建文件
|   ├── default.js             // 输入命令行gulp的时候，第一个找的是gulpfile.babel.js,然后默认执行该文件
│   ├── pages.js               // 处理模板的构建文件
|   ├── script.js              // 处理js编译任务
|   └── server.js              // 创建处理服务器脚本的构建文件 
├── node_modules               // 依赖的模块
├── .babelrc                   // 设置转码的规则和插件      
├── README.md
├── gulpfile.babel.js          // 构建工具入口文件（文件名加babel的原因是使用了ES6，不然gulp会报错）
└── package.json               // 定义项目所需模块和配置信息

```
### 项目技术
1. ES6语法<br>
2. Gulp作为任务自动化工具<br> 
3. Babel、Webpack作为编译工具<br>
4. Node、Express作为后台服务器

### 功能
基于11选5的彩种，每十分钟销售一期，开奖后进入下一期。可以自由选择玩法，设置注数和随机选择。遗漏数据，花费金额，盈利亏损预测也会做相应变化。

### 项目心得
> 项目逻辑复杂，这部分是跟着老师的代码敲的。不过还是有收获的

1. Gulp的构建目录配置，比如项目的编译顺序，包的使用等
2. ES6在项目开发中的使用，比如类和模块化，Promise进行前后端通信，Map和Set的使用以及字符串模板等
3. Express脚手架中mockjs的使用，可以让前端进行独立测试
