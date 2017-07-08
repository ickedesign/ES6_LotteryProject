// 计算模块
// 注数，花费现金，奖金，盈利

class Calculate {
	/**
	 * [computeCount 计算注数]
	 * @param  {number} active    [当前选中的号码]
	 * @param  {String} play_name [当前的玩法标识]
	 * @return {Number}           [注数]
	 */
	computeCount(active, play_name) {
		// 当前注数为0
		let count = 0;
		// play_list是个map类型
		const exist = this.play_list.has(play_name);
		// es6中在数组初始化时允许初始化一个常量，该常量为数组的长度
		// 指定长度为active的数组，每个元素默认为0
		const arr = new Array(active).fill('0');
		if ((exist && play_name.at(0)) === 'r') {
			// combine()是个组合运算方法，类名直接引用，所以是个静态方法
			// combine()返回的是一个数组
			count = Calculate.combine(arr, play_name.split('')[1]).length;
		}
		return count;
	};

	/**
	 * [computeBonus 奖金范围预测]
	 * @param  {Number} active    [当前选中的号码]
	 * @param  {String} play_name [当前的玩法标识]
	 * @return {Array}           [奖金范围]
	 */
	computeBonus(active, play_name) {
		// 拿到当前玩法的基数
		const play = play_name.split('');
		const self = this;
		let arr = new Array(play[1]*1).fill(0);
		let min, max;
		if (play[0] === 'r') {
			// 最小命中数。在11选5中，比如任8，则至少有2个命中
			let min_active = 5 - (11 - active);
			if (min_active > 0) {
				if (min_active-play[1] >= 0) {
					arr = new Array(min_active).fill(0);
					min = Calculate.combine(arr,play[1]).length;
				} else{
					if(play[1] - 5 > 0 && active - play[1] >= 0) {
						arr = new Array(active-5).fill(0);
						min = Calculate.combine(arr, play[1]-5).length;
					} else{
						min = active - play[1] > -1 ? 1 : 0;
					}
				}
			} else{
				min = active - play[1] > -1 ? 1 : 0;
			}

			// 最大命中数
			let max_active = Math.min(active, 5);
			if(play[1] - 5 > 0) {
				if(active - play[1] >= 0) {
					arr = new Array(active - 5).fill(0);
					max = Calculate.combine(arr, play[1]-5).length;
				}else {
					max = 0;
				}
			}else if(play[1] - 5 < 0) {
				arr = new Array(Math.min(active, 5)).fill(0);
				max = Calculate.combine(arr, play[1]).length;
			}else {
				max = 1;
			}
		}
		// 把注数转化为对应奖金
		return [min,max].map(item => item*self.play_list.get(play_name).bonus);
	}

	/**
	 * [combine 组合运算]
	 * @param  {Array} arr  [参与组合运算的数组]
	 * @param  {Number} size [组合运算的基数]
	 * @return {Number}      [计算注数]
	 */
	static combine(arr, size) {
		let allResult = [];
		// 即使运行函数，
		// 在es6中不能使用arguments.callee(),否则报错
		(function f(arr, size, result) {
			let arrLen = arr.length;
			if (size > arrLen) {
				return;
			}
			if (size === arrLen) {
				allResult.push([].concat(result, arr));
			} else {
				// 组合运算
				for (let i = 0; i < arrLen; i++) {
					// 组合运算的子集
					let newResult = [].concat(result);
					newResult.push(arr[i]);
					if (size === 1) {
						allResult.push(newResult);
					} else {
						let newArr = [].concat(arr);
						newArr.splice(0, i+1);
						f(newArr, size - 1, newResult);
					}
				}
			}
		})(arr, size, [])
		return allResult;
	} 
};

export default Calculate;
