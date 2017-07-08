// 一个单独的模块，倒计时模块
// es6类的使用
// 类需要实例化才可以使用
class Timer {
	// end: 截止时间
	// update: 时间更新的回调
	// handle: 倒计时结束时的回调
	// 声明方法
	countdown (end,update,handle) {
		const now = new Date().getTime();
		const self = this;
		// 如果当前时间大于倒计时时间，说明倒计时已经结束
		if (now - end > 0) {
			handle.call(self);
		} else {
			let last_time = end - now;
			const px_d = 1000*60*60*24;
			const px_h = 1000*60*60;
			const px_m = 1000*60;
			const px_s = 1000;
			let d = Math.floor(last_time/px_d);
			let h = Math.floor((last_time-d*px_d)/px_h);
			let m = Math.floor((last_time-d*px_d-h*px_h)/px_m);
			let s = Math.floor((last_time-d*px_d-h*px_h-m*px_m)/px_s);
			let r = [];
			if (d > 0) {
				// es6模板字符串的使用
				r.push(`<em>${d}</em>天`);
			}
			// 如果没有天，不能出现0小时多少分钟多少秒，所以使用r.length来判断
			if (r.length || (h > 0)) {
				r.push(`<em>${h}</em>小时`);
			}
			if (r.length || m > 0) {
				r.push(`<em>${m}</em>分`);
			}
			if (r.length || s > 0) {
				r.push(`<em>${s}</em>秒`);
			}
			self.last_time = r.join('');
			update.call(self, r.join(''));
			setTimeout(function () {
				self.countdown(end, update, handle);
			}, 1000);			
		}
	}
};

export default Timer;
