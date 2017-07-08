var express = require('express');
var mockjs = require('mockjs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 输出当前的状态，期号和截止时间
var makeIssue = function() {
	// 获取服务到当前的时间
	var date = new Date();
	// 2017041801 9:00~22:00过了22:00就算是第二天的第一期
	// 存储第一天的时间
	var first_issue_date = new Date();
	// 第一期的结束时间9:10
	first_issue_date.setHours(9);
	first_issue_date.setMinutes(10);
	first_issue_date.setSeconds(0);
	// 计算截止的时间 
	// 一共78期，第一期的时间加上77期的时间，一期10分钟
	var end_issue_date = new Date(first_issue_date.getTime() + 77*10*60*1000);

	// 声明几个临时存储的变量
	// 当前期，截止时间，状态值
	var cur_issue, end_time, state;
	if(date.getTime() - first_issue_date.getTime() > 0 && date.getTime() - end_issue_date.getTime() < 0) {
		// 正常销售，今天的销售和截止时间
		var cur_issue_date = new Date();
		cur_issue_date.setHours(9);
		cur_issue_date.setMinutes(0);
		cur_issue_date.setSeconds(0);
		// 当期的销售剩余时间
		var minus_time = date.getTime() - cur_issue_date.getTime();
		var h = Math.ceil(minus_time/1000/60/10);
		// 截止的时间
		var end_date = new Date(cur_issue_date.getTime() + 1000*60*10*h);
		end_time = end_date.getTime();
		cur_issue = [end_date.getFullYear(), ('0' + (end_date.getMonth() + 1)).slice(-2),('0' + end_date.getDate()).slice(-2),('0' + h).slice(-2)].join('');
	} else {
		// 今日销售已截止的情况
		// 将时间调整为下一天
		first_issue_date.setDate(first_issue_date.getDate() + 1);
		end_time = first_issue_date.getTime();
		// 输出当前的期号
		cur_issue = [first_issue_date.getFullYear(), ('0' + (first_issue_date.getMonth() + 1)).slice(-2),('0' + first_issue_date.getDate()).slice(-2),'01'].join('');
	}
	// 判断状态
	var cur_date = new Date();
	// 销售8分钟,开奖两分钟
	if(end_time - cur_date.getTime() > 1000*60*2) {
		state = '正在销售'
	}else {
		state = '开奖中'
	}
	return {
		issue: cur_issue,
		state: state,
		end_time: end_time
	};
};

// 获取接口
// router.get()是express的写法
router.get('/get/omit', function(req, res, next) {
	// 返回json格式
	res.json(mockjs.mock({
		// 返回数据
		// 返回长度为11的数据
		'data|11': [/[1-9]{1,3}|0/],
		// 期号使用自己设定的数据
		'issue': /[1-9]{8}/
	}))
});

router.get('get/opencode', function(req, res, next) {
	// 期号
	var issue = makeIssue().issue;
	// 开奖号
	var data = mockjs.mock({
		'data': [/[1-3]/, /[4-5]/, /[6-7]/, /[8-9]/, /1[0-1]/]
	}).data;
	res.json({
		issue: issue,
		data: data
	})
});

// 状态接口
router.get('/get/state', function(req, res, next) {
	var state = makeIssue();
	res.json(state);
});

module.exports = router;
