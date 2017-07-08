// 基本模块
// 任二，任三这些的内容提示。玩法提示的内容只是一个DOM节点
// 奖金信息的维护
import $ from 'jquery';

class Base {
	// es6特性：在类中写方法不用,
	/**
	 * [initPlayList 初始化奖金和玩法说明]
	 * @return {[type]} [description]
	 */
	initPlayList() {
		// play_list是个Map集合
		// (key,value),使用级联操作，可以写入大量数据
		this.play_list.set('r2', {
			bonus: 6,
			tip: '从01~11中任选2个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">6</em>元</span>',
			name: '任二'
		})
		.set('r3', {
			bonus: 19,
			tip: '从01~11中任选3个或多个号码，所选号码与开奖号码任意三个号码相同，即中奖<em class="red">19</em>元</span>',
			name: '任三'
		})
		.set('r4', {
			bonus: 78,
			tip: '从01~11中任选4个或多个号码，所选号码与开奖号码任意四个号码相同，即中奖<em class="red">78</em>元</span>',
			name: '任四'
		})
		.set('r5', {
			bonus: 540,
			tip: '从01~11中任选5个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">540</em>元</span>',
			name: '任五'
		})
		.set('r6', {
			bonus: 90,
			tip: '从01~11中任选6个或多个号码，所选号码与开奖号码五个号码相同，即中奖<em class="red">90</em>元</span>',
			name: '任六'
		})
		.set('r7', {
			bonus: 26,
			tip: '从01~11中任选7个或多个号码，所选号码与开奖号码五个号码相同，即中奖<em class="red">26</em>元</span>',
			name: '任七'			
		})	
		.set('r8', {
			bonus: 9,
			tip: '从01~11中任选8个或多个号码，所选号码与开奖号码五个号码相同，即中奖<em class="red">9</em>元</span>',
			name: '任八'			
		})				
	};

	/**
	 * [initNumber 初始化号码]
	 * @return {[type]} [description]
	 */
	initNumber() {
		for(let i = 1; i < 12; i ++) {
			// number是个Set对象。因为投注号码不能重复。所以Set很符合
			// padStart()，字符串的一个方法，让字符串保持两位的长度，如果长度不够，则在起始部添加0
			// es6的字符串方法padStart()
			this.number.add(('' + i).padStart(2, '0'))
		};
	};

	/**
	 * [setOmit 设置遗漏数据]
	 * @param {Map} omit [description]
	 */
	setOmit(omit) {
		let self = this;
		// 把当前保存的遗漏数据清空，omit是个Map对象
		// clear()适用于Map和Set对象
		self.omit.clear();
		// 遗漏数据的重新设置
		// let of遍历接口，使用entries()拿到key,value
		// 如果只想拿到key就用Keys();value同理,则用values()
		for(let [index,item] of omit.entries()) {
			self.omit.set(index ,item);
		}

		// 把数据更新到页面上
		// omit_el是个选择器
		// 获取遗漏数据使用Map的get()方法
		$(self.omit_el).each(function(index, item) {
			$(item).text(self.omit.get(index));
		});
	};

	/**
	 * [setOpenCode 设置开奖]
	 * @param {[type]} code [description]
	 */
	setOpenCode(code) {
		let self = this;
		self.open_code.clear();
		// open_code是个Set对象，因为开奖号不重复
		for(let item of code.values()) {
			self.open_code.add(item);
		};
		// 调更新奖号的接口，如果该接口存在则调用
		self.updateOpenCode && self.updateOpenCode.call(self, code);
	};

	/**
	 * [toggleCodeActive 号码选中取消]
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	toggleCodeActive(e) {
		let self = this;
		// 使用jquery获取当前选中的对象，使用委托代理来实现
		let $cur = $(e.currentTarget);
		// jq的切换类方法toggleClass()
		$cur.toggleClass('btn-boll-active');
		// 奖金级联操作的过程
		self.getCount();
	}

	/**
	 * [changePlayNav 切换玩法]
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	changePlayNav(e) {
		let self = this;
		// currentTagert: 比如事件绑定在父元素上，但点击子元素，则返回的是子元素
		let $cur = $(e.currentTarget);
		$cur.addClass('active').siblings().removeClass('active');
		// 获取当前玩法
		// 把R转为r
		self.cur_play = $cur.attr('desc').toLocaleLowerCase();
		$('#zx_sm span').html(self.play_list.get(self.cur_play).tip);
		// 把上次选中的号码清空
		$('.boll-list .btn-boll').removeClass('btn-boll-active');
		// 奖金的级联操作，重新计算
		self.getCount();
	}

	/**
	 * [assistHandle 操作区]
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	assistHandle(e) {
		// 阻止默认事件
		e.preventDefault();
		let self = this;
		let $cur = $(e.currentTarget);
		// 使用index()，查看当前选中的索引。
		// 鼠标点击的是操作区的全大小奇偶对应的Li
		let index = $cur.index();
		$('.boll-list .btn-boll').removeClass('btn-boll-active');
		// 全
		if(index === 0) {
			$('.boll-list .btn-boll').addClass('btn-boll-active');
		}
		// 大
		if(index === 1) {
			$('.boll-list .btn-boll').each(function(i, t) {
				// t.textContent获取数字文本,减5来让它转化为Number类型
				if(t.textContent - 5 > 0) {
					$(t).addClass('btn-boll-active');
				}
			});
		}
		// 小
		if(index === 2) {
			$('.boll-list .btn-boll').each(function(i, t) {
				if(t.textContent - 6 < 0) {
					$(t).addClass('btn-boll-active');
				}
			});
		}
		// 奇
		if(index === 3) {
			$('.boll-list .btn-boll').each(function(i, t) {
				if(t.textContent % 2 == 1) {
					$(t).addClass('btn-boll-active');
				}
			});
		}
		// 偶
		if(index === 4) {
			$('.boll-list .btn-boll').each(function(i, t) {
				if(t.textContent % 2 == 0) {
					$(t).addClass('btn-boll-active');
				}
			});
		}
		// 奖金的级联操作，重新计算
		self.getCount();		
	};

	/**
	 * [getName 获取当前彩票名称]
	 * @return {[type]} [description]
	 */
	getName() {
		return this.name;
	}

	/**
	 * [addCode 添加号码]
	 */
	addCode() {
		let self = this;
		// text()返回的是一个010203...拼的字符串
		// match()，分割字符串，每两个字符串一组，最后是一个数组
		let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g);
		let active = $active ? $active.length : 0;
		// computeCount的两个参数：当前选中号码的长度和号码
		// 取出注数
		let count = self.computeCount(active, self.cur_play);
		if(count) {
			// 将所选的号码串起来
			self.addCodeItem($active.join(' '), self.cur_play, self.play_list.get(self.cur_play).name, count);
		}
	};

	/**
	 * [addCodeItem 添加单次号码]
	 * @param {[type]} code     [description]
	 * @param {[type]} type     [description]
	 * @param {[type]} typeName [description]
	 * @param {[type]} count    [description]
	 */
	addCodeItem(code, type, typeName, count) {
		let self = this;
		// 字符串模板
		/*
		<li codes = "r5|06 08 09 10 11" bonus="2" count="1">
			<div class="code">
				<b>任五模式</b>
				<b class="em">06 08 09 10 11</b>
				[1注,<em class="code-list-money">2</em>元]
			</div>
		</li>	
		 */
		const tpl = `
		<li codes = "${type}|${code}" bonus="${count*2}" count="${count}">
			<div class="code">
				<b>${typeName}${count>1?'复式':'单式'}</b>
				<b class="em">${code}</b>
				[${count}注,<em class="code-list-money">${count*2}</em>元]
			</div>
		</li>	
		`;
		$(self.cart_el).append(tpl);
		// 计算购物车的钱
		self.getTotal();
	};

	
	getCount() {
		let self = this;
		let active = $('.boll-list .btn-boll-active').length;
		// 取出注数
		let count = self.computeCount(active, self.cur_play);
		// 获取奖金范围
		let range = self.computeBonus(active, self.cur_play);
		// 所需花费
		let money = count*2;
		// 盈利范围
		let win1 = range[0] - money;
		let win2 = range[1] - money;
		let tpl;
		// 赚了钱用红色标注，亏了钱用绿色标注，判断盈利的情况
		// 亏的情况，两个亏损值
		let c1 = (win1<0&&win2<0)?Math.abs(win1):win1;
		let c2 = (win1<0&&win2<0)?Math.abs(win2):win2;
		if(count === 0) {
			/*您选了 <b class="red">0</b> 注，共 <b class="red">0</b> 元*/
			tpl = `您选了 <b class="red">${count}</b> 注，共 <b class="red">${count*2}</b> 元`
		} else if(range[0] === range[1]) {
			// 如果最大盈利和最小盈利都相等时
			// range[0]是奖金
			/*
			您选了 <b>7</b> 注，共 <b>14</b> 元 <em>若中奖，奖金：
			<strong class="red">180</strong>元，
			您将盈利
			<strong class="red">166 </strong> 元</em>
			 */
			tpl = `您选了 <b>${count}</b> 注，共 <b>${count*2}</b> 元 <em>若中奖，奖金：
			<strong class="red">${range[0]}</strong>元，
			您将${win1>=0?'盈利':'亏损'}
			<strong class="${win1>=0?'red':'green'}">${Math.abs(win1)} </strong> 元</em>`;
		}else {
			/*
			您选了 <b>15</b> 注，共 <b>30</b> 元 <em>若中奖，奖金：
			<strong class="red">78</strong> 至 <strong class="red">390</strong>元，
			您将盈利
			<strong class="red">48 </strong>
			至 <strong class="red"> 360 </strong>
			元</em>
			 */
			tpl = `您选了 <b>${count}</b> 注，共 <b>${count*2}</b> 元 <em>若中奖，奖金：
			<strong class="red">${range[0]}</strong> 至 <strong class="red">${range[1]}</strong>元，
			您将${(win1<0&&win2<0)?'亏损':'盈利'}
			<strong class="${win1>=0?'red':'green'}">${c1} </strong>
			至 <strong class="${win1>=0?'red':'green'}"> ${c2} </strong>
			元</em>`;
		}
		$('.sel_info').html(tpl);
	};

	/**
	 * [getTotal 计算所有金额]
	 * @return {[type]} [description]
	 */
	getTotal() {
		let count = 0;
		$('.codelist li').each(function(index, item) {
			count += $(item).attr('count')*1;
		});
		$('#count').text(count);
		$('#money').text(count*2);
	}

	/**
	 * [getRandom 生成随机数]
	 * @param  {[type]} num [description]
	 * @return {[type]}     [description]
	 */
	getRandom(num) {
		let arr = [], index;
		// 定义随机空间
		// number是个已经定义过的Set对象，把类似数组的集合转为数组使用Array.from
		let number = Array.from(this.number);
		// 生成随机的数组
		while(num--) {
			// 保证每个随机数都落在这个区间上
			index = Number.parseInt(Math.random()*number.length);
			arr.push(number[index]);
			// 在随机空间中，把用过的数组移除掉，达到每次随机的数组不重复
			number.splice(index,1);
		}
		return arr.join(' ');
	}

	/**
	 * [getRandomCode 添加随机号码]
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	getRandomCode(e) {
		e.preventDefault();
		// js原生的方法
		let num = e.currentTarget.getAttribute('count');
		// 获取当前的玩法
		// cur_play是全局的一个对象，每次玩法变化的时候，cur_play都会变化
		let play = this.cur_play.match(/\d+/g)[0];
		let self = this;
		if(num === '0') {
			// 清空购物车
			$(self.cart_el).html('')
		} else{
			for(let i = 0; i < num; i++) {
				// 机选都是单数，所以注数为1
				self.addCodeItem(self.getRandom(play), self.cur_play, self.play_list.get(self.cur_play).name, 1);
			}
		}
	};

};

export default Base;
