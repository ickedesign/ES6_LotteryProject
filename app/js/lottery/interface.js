// 接口模块
// 和服务器的通信接口
// 第一个接口：头部的期号，倒计时时间戳，销售状态
// 第二个接口：选号区的遗漏
// 第三个接口：左侧的奖号
// 引入jquery，简单易用，封装了ajax请求（或者使用js的fetch）
import $ from 'jquery';

class Interface {
	// 不用声明属性时，不用写constructor
	// 声明方法，每个方法都是独立的，使用;
	/**
	 * [getOmit 获取遗漏数据]
	 * @param  {String} issue [当前期号]
	 * @return {[type]}       [description]
	 */
	getOmit(issue) {
		let self = this;
		// 从前端发起请求，服务端给数据，再执行下一步操作。
		// 传统方法是使用回调，但用promise()来异步处理更好
		return new Promise((resolve, reject) => {
			// 使用$.ajax()发起通信
			$.ajax({
				url: '/get/omit',
				// 发送到服务器端的数据
				data: {
					issue: issue
				},
				dataType: 'json',
				success: function(res) {
					// 把数据保存到当前对象，即保留遗漏数据
					self.setOmit(res.data);
					// 把从服务端返回的数据全部传给resolve，以执行下一步操作
					resolve.call(self, res);
				},
				error: function(err) {
					// 如果从后台获取数据出错，则执行reject，阻塞掉。
					reject.call(err);
				}
			});
		});
	};

	/**
	 * [getOpenCode 获取开奖号码]
	 * @param  {String} issue [当前期号]
	 * @return {[type]}       [description]
	 */
	getOpenCode(issue) {
		let self = this;
		return new Promise((resolve,reject) => {
			$.ajax({
				url: '/get/opencode',
				data: {
					issue: issue
				},
				dataType: 'json',
				success: function(res) {
					// 保存当前的开奖号码
					self.setOpencode(res, data);
					resolve.call(self, res);
				},
				error: function(err) {
					reject.call(err);
				}
			});
		});
	};

	/**
	 * [getState 获取当前状态]
	 * @param  {String} issue [当前期号]
	 * @return {[type]}       [description]
	 */
	getState(issue) {
		let self = this;
		return new Promise((resolve,reject) => {
			$.ajax({
				url: '/get/state',
				data: {
					issue: issue
				},
				dataType: 'json',
				success: function(res) {
					resolve.call(self, res);
				},
				error: function(err) {
					reject.call(err);
				}
			});
		});
	}
};

export default Interface;
