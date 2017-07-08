// 负责11选5这个具体彩种
// 处理es6的兼容
import 'babel-polyfill';
import Base from './lottery/base.js';
import Timer from './lottery/timer.js';
import Calculate from './lottery/calculate.js';
import Interface from './lottery/interface.js';
import $ from 'jquery';

// 多重继承
// 深度拷贝
const copyProperties = function(target, source) {
	// 使用Reflect.ownKeys()拿到原对象所有的属性
	for(let key of Reflect.ownKeys(source)) {
		// 选择性拷贝
		if(key !== 'constructor' && key !== 'prototype' && key !== 'name') {
			// 从原对象拿到函数的明文
			let desc = Object.getOwnPropertyDescriptor(source, key);
			// 复制到目标对象上,使用ES5的方式
			Object.defineProperty(target, key, desc);			
		}
	};
};


// 使用Rest参数
const mix = function(...mixins) {
	// 声明一个空的类
	class Mix{};
	// 深度拷贝原型
	for(let mixin of mixins) {
		copyProperties(Mix, mixin);
		copyProperties(Mix.prototype, mixin.prototype);
	};
	return Mix;
};


// 使用ES6的extends去继承mix，而mix已实现多重继承
class Lottery extends mix(Base, Calculate, Interface, Timer) {
	// name:区别多个猜中,cname:中文名称,issue:当前期号,state:状态
	constructor(name = 'syy', cname= '11选5', issue = '**', state = '**') {
		// super()放在最前面
		super();
		this.name = name;
		this.cname = cname;
		this.issue = issue;
		this.state = state;
		// 当前选择器
		this.el = '';
		// 初始化遗漏Map对象
		this.omit = new Map();
		// 初始化开奖号码
		this.open_code = new Set();
		// 初始化开奖记录 
		this.open_code_list = new Set();
		// 初始化玩法列表
		this.play_list = new Map();
		// 初始化选号
		this.number = new Set();
		// 当前选号的期号选择器
		this.issue_el = '#curr_issue';
		// 倒计时选择器
		this.countdown_el = '#countdown';
		// 状态选择器
		this.state_el = '.state_el';
		// 购物车选择器
		this.cart_el = '.codelist';
		// 遗漏的选择器
		this.omit_el = '';
		// 玩法
		this.cur_play = 'r5';
		// 初始化玩法列表，已在其它继承模块定义
		this.initPlayList();
		// 初始化选号，已在其它继承模块定义
		this.initNumber();
		// 初始化销售状态
		this.updateState();
		// 初始化事件
		this.initEvent();
	}

	/**
	 * [updateState 状态更新]
	 * @return {[type]} [description]
	 */
	updateState() {
		let self = this;
		this.getState().then(function(res) {
			self.issue = res.issue;
			self.end_time = res.end_time;
			self.state = res.state;
			// 更新当前期号
			$(self.issue_el).text(res.issue);
			// 更新倒计时
			self.countdown(res.end_time, function(time) {
				$(self.countdown_el).html(time);
			}, function() {
				// 重新获取最新的销售状态
				setTimeout(function() {
					self.updateState();
					// 更新遗漏
					self.getOmit(self.issue).then(function(res) {

					});
					// 更新奖号
					self.getOpenCode(self.issue).then(function(res){
						
					})
				}, 500)
			})
		})
	}

	/**
	 * [initEvent 初始化事件]
	 * @return {[type]} [description]
	 */
	initEvent() {
		let self = this;
		// 玩法切换
		// 通过bind，把changePlayNav的this指向转到当前对象上
		$('#plays').on('click', 'li', self.changePlayNav.bind(self));
		// 号码选中
		$('.boll-list').on('click', '.btn-boll', self.toggleCodeActive.bind(self));
		// 添加号码
		$('#confirm_sel_code').on('click', self.addCode.bind(self));
		// 操作区大小奇偶的清除事件
		$('.dxjo').on('click', 'li', self.assistHandle.bind(self));
		// 随机号码
		$('qkmethod').on('click', '.btn-middle', self.getRandomCode.bind(self));		
	}
}

export default Lottery;

