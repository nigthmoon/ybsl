import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { YBSL_ybslf }
/**
 * 夜白的自建函数
 */
const YBSL_ybslf = function () {
	{//----------自定义函数

		/**
		 * 创建一个分配卡牌的事件。
		 * - 遍历输入的元素，根据类型自动识别并赋值给 `cards`、`str` 和 `num`。
		 * - 将 `cards` 中的 `num` 张牌分配给场上角色，分配时的提示信息为 `str`。
		 *
		 * @param {...*} args - 输入的元素（可以是卡牌组、字符串、数字，顺序不固定）。
		 * @returns {Object} - 返回创建的事件对象。
		 *
		 * @example
		 * const cards = [{ id: 1, name: '杀' }, { id: 2, name: '闪' }];
		 * const event = lib.element.player.YB_yiji(cards, '请选择一张牌', 1);
		 * console.log(event);
		 */
		lib.element.player.YB_yiji = function (...args) {
			let cards = [];
			let str = '遗计';
			let num;
			// 遍历输入的元素，根据类型赋值
			args.forEach(arg => {
				if (typeof arg === 'object') {
					cards = arg; // 如果是数组，赋值给 cards
				} else if (typeof arg === 'string') {
					str = arg; // 如果是字符串，赋值给 str
				} else if (typeof arg === 'number') {
					num = arg; // 如果是数字，赋值给 num
				}
			});
			// 如果 num 未提供，则默认为 cards.length
			if (!num) {
				num = cards.length;
			}
			// 创建事件
			var next = game.createEvent('YB_yiji', false);
			next.player = this;
			next.cards = cards;
			next.number = num;
			next.setContent('YB_yiji');
			next.str = str;
			return next;
		};
		lib.element.content.YB_yiji = async function (event, trigger, player) {
			const { cards } = event.cards;
			let num = event.number;
			let num2 = cards.length - num;
			let str = event.str;
			if (_status.connectMode)
				game.broadcastAll(function () {
					_status.noclearcountdown = true;
				});
			let given_map = {};
			if (!cards.length) return;
			// event.goto -> do while
			do {
				const {
					result: { bool, links },
				} =
					cards.length == 1
						? { result: { links: cards.slice(0), bool: true } }
						: await player.chooseCardButton(str + "请选择要分配的牌。还可以分配" + (cards.length - num2) + "张牌", true, cards, [1, cards.length - num2]).set("ai", () => {
							if (ui.selected.buttons.length == 0) return 1;
							return 0;
						});
				if (!bool) return;
				cards.removeArray(links);
				let togive = links.slice(0);
				const {
					result: { targets },
				} = await player
					.chooseTarget("选择一名角色获得" + get.translation(links), true)
					.set("ai", target => {
						const att = get.attitude(_status.event.player, target);
						if (_status.event.enemy) {
							return -att;
						} else if (att > 0) {
							return att / (1 + target.countCards("h"));
						} else {
							return att / 100;
						}
					})
					.set("enemy", get.value(togive[0], player, "raw") < 0);
				if (targets.length) {
					const id = targets[0].playerid,
						map = given_map;
					if (!map[id]) map[id] = [];
					map[id].addArray(togive);
				}
			} while (cards.length > num2);
			if (_status.connectMode) {
				game.broadcastAll(function () {
					delete _status.noclearcountdown;
					game.stopCountChoose();
				});
			}
			const list = [];
			for (const i in given_map) {
				const source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
				player.line(source, "green");
				if (player !== source && (get.mode() !== "identity" || player.identity !== "nei")) player.addExpose(0.2);
				list.push([source, given_map[i]]);
			}
			game.loseAsync({
				gain_list: list,
				giver: player,
				animate: "draw",
			}).setContent("gaincardMultiple");
		}
		/**
		 * 创建一个分配卡牌的事件。
		 * - 遍历输入的元素，根据类型自动识别并赋值给 `cards`、`boolyb`、`str` 和 `num`。
		 * - 将 `cards` 中的 `num` 张牌分配给场上角色，分配时的提示信息为 `str`。
		 * - `boolyb` 是一个布尔值，用于控制某些逻辑。
		 *
		 * @param {...*} args - 输入的元素（可以是卡牌组、布尔值、字符串、数字，顺序不固定）。
		 * @returns {Object} - 返回创建的事件对象。
		 *
		 * @example
		 * const cards = [{ id: 1, name: '杀' }, { id: 2, name: '闪' }];
		 * const event = lib.element.player.YB_liangying(cards, true, '请选择一张牌', 1);
		 * console.log(event);
		 */
		lib.element.player.YB_liangying = function (...args) {
			let cards = [];
			let str = '粮营';
			let num;
			let boolyb=false;
			// 遍历输入的元素，根据类型赋值
			args.forEach(arg => {
				if (typeof arg === 'object') {
					cards = arg; // 如果是数组，赋值给 cards
				} else if (typeof arg === 'string') {
					str = arg; // 如果是字符串，赋值给 str
				} else if (typeof arg === 'number') {
					num = arg; // 如果是数字，赋值给 num
				} else if (typeof arg === 'boolean') {
					boolyb = arg; // 如果是数字，赋值给 num
				}
			});
			// 如果 num 未提供，则默认为 cards.length
			if (!num) {
				num = cards.length;
			}
			var next = game.createEvent('YB_liangying', false);
			next.player = this;
			next.cards = cards;
			next.number = num;
			next.setContent('YB_liangying');
			next.boolyb = boolyb;
			next.str = str;
			return next;
		}
		lib.element.content.YB_liangying = async function (event, trigger, player) {
			// const draws = Array.from({ length: player.countMark("recangchu") }).map((_, i) => get.cnNumber(i + 1) + "张");
			// const draws = Array.from(cards)
			// player.logSkill("reliangying");
			const max = Math.min(
				event.number,
				event.boolyb == true ? event.cards.length : player.countCards("he"),
				game.countPlayer(target => target != player)
			);
			// await player.draw(num);
			let list = [];
			// let given_map = {};
			let listx = [];
			if (_status.connectMode) game.broadcastAll(() => (_status.noclearcountdown = true));
			while (max - list.length > 0) {
				const {
					result: { bool, cards, targets },
				} = await player
					.chooseCardTarget({
						prompt: event.str + "：将" + get.cnNumber(max - 1) + "至" + get.cnNumber(max) + "张牌分配给任意角色",
						position: "he",
						animate: false,
						filterCard(card, player) {
							// if(event.boolyb==true)return event.cards.includes(card)&&!get.event("list").some(listx => listx == card);
							// return !get.event("list").some(listx => listx == card);
							if (event.boolyb == true) return event.cards.includes(card) && !get.event("list").some(list => list[1] == card);
							return !get.event("list").some(list => list[1] == card);
						},
						// selectCard(){return max - listx.length},
						filterTarget(card, player, target) {
							// return target != player && !get.event("list").some(list => list[0] == target);
							return true;
						},
						ai1(card) {
							if (card.name == "shan") return 1;
							return Math.random();
						},
						ai2(target) {
							return get.attitude(get.event("player"), target);
						},
					})
					.set("list", list)
					.set("forced", max - list.length > 1);
				if (bool) {
					// let togive = cards.slice(0);
					// var id = targets[0].playerid,
					// 	map = given_map;
					// if (!map[id]) map[id] = [];
					// map[id].addArray(togive);
					listx.push(cards);
					list.push([targets[0], cards[0]]);
					// list.push([targets[0], cards]);
					player.addGaintag(cards, "olsujian_given");
				} else break;
			}
			if (_status.connectMode) {
				game.broadcastAll(() => {
					delete _status.noclearcountdown;
					game.stopCountChoose();
				});
			}
			if (list.length) {
				await game
					.loseAsync({
						gain_list: list,
						player: player,
						cards: list.slice().map(list => list[1]),
						giver: player,
						animate: "giveAuto",
					})
					.setContent("gaincardMultiple");
			}
			// event.yb=event.cards.filter(z=>!listx.includes(z));
			event.result = list;
			// var list4=[];
			// for(var z of event.cards){
			// 	if(!listx.includes(z)&&(player.isIn()&&player.getCards('h').includes(z)||!player.isIn()))list4.push(z);
			// }
			// event.resultyb=list4;
		}
		/**
		 * 未完成
		 * @param {*} cards 
		 * @param {*} str 
		 * @param {*} targets 
		 * @returns 
		 */
		lib.element.player.YB_wugu = function (cards, str, targets) {
			var next = game.createEvent('YB_wugu', false);
			next.player = this;
			next.cards = cards;
			next.setContent('YB_wugu');
			next.str = str;
			next.targets = targets;
			return next;
		}
		// lib.element.content.YB_wugu = async function(event, trigger, player){

		// }
		lib.element.content.YB_wugu = function* (event, map) {
			let trigger = map.trigger, player = map.player;
			var cards = event.cards;
			var str = event.str;
			var targets = event.targets;
			ui.clear();
			var dialog = ui.create.dialog(str, cards, true);
			_status.dieClose.push(dialog);
			dialog.videoId = lib.status.videoId++;
			game.addVideo("cardDialog", null, [str, get.cardsInfo(cards), dialog.videoId]);
			event.getParent().preResult = dialog.videoId;
			game.broadcast(
				function (cards, id) {
					var dialog = ui.create.dialog(str, cards, true);
					_status.dieClose.push(dialog);
					dialog.videoId = id;
				},
				cards,
				dialog.videoId
			);
			game.log(player, "亮出了", cards);
		}
		// get.YB_lianzhaoList = function (player) {
		// 	var skills = player.getSkills(null, false, false);
		// 	var skills2 = game.expandSkills(skills);
		// 	var skills3 = skills2.filter(function (i) {
		// 		if (lib.skill[i].getLianzhao) return true;
		// 	});
		// 	return skills3;
		// }
		// get.YB_lianzhao = function (player, skill, card) {
		// 	if (!lib.skill[skill].getLianzhao) return false;
		// 	var num = player.storage[skill] || 0;
		// 	// if(typeof num != 'number')var num=0;
		// 	if (lib.skill[skill].getLianzhao()[num](card)) return true;
		// 	return false;
		// }
		//----------换行点
		//至子虚：从这往下到截止的地方，别忘CV过去，这是关联函数。
		//----------获取同族角色

		get.YB_clan = function (player, bool) {
			var list = [];
			game.hasPlayer2(current => {
				if (current == player && bool) list.push(current);
				else if (player.getClan().some(i => current.getClan().includes(i)) && current != player) list.push(current);
				//player.getClan().some(i => target.getClan().includes(i))
			})
			return list;
		}
		//获取目标的出限一技能
		get.YB_pu1 = function (player) {
			var skills = player.getSkills(null, false, false);
			var skills2 = game.expandSkills(skills);
			var skills3 = skills2.filter(function (i) {
				if (lib.skill[i].enable && 
					lib.skill[i].enable == 'phaseUse'&& 
					lib.skill[i].usable
				) {
					if(typeof lib.skill[i].usable=='number'){
						return lib.skill[i].usable == 1
					}
					else if(typeof lib.skill[i].usable=='function'){
						return lib.skill[i].usable(i, player) == 1
					}
				}
			});
			if (skills3) return skills3;
			else return [];
		}
		//至子虚：复制到这里截止
		//全技能库的出限一的夜白式筛选
		// get.YB_allpu1 = function(player){
		// 	var skills=[];
		// 	for(var i in lib.skill){
		// 		if(lib.skill[i].enable&&lib.skill[i].enable=='phaseUse'&&lib.skill[i].usable&&(lib.skill[i].usable==1||lib.skill[i].usable(i,player)==1))skills.push(i);
		// 	}
		// 	return skills;
		// }
		//---------此处函数抄自子虚扩展↓
		lib.element.player.getClan = function (unseen) {
			var list = []
			if (unseen || !this.isUnseen(0)) {
				let info = lib.character[this.name1];
				if (info && info[4]) {
					for (let i of info[4]) {
						if (typeof i == 'string' && i.startsWith('clan:')) list.add(i.slice(5))
					}
				}
			}
			if (this.name2 && (unseen || !this.isUnseen(1))) {
				let info = lib.character[this.name2];
				if (info && info[4]) {
					for (let i of info[4]) {
						if (typeof i == 'string' && i.startsWith('clan:')) list.add(i.slice(5))
					}
				}
			}
			return list
		}
		//---------此处函数抄自子虚扩展↑
		// get.YB_damageCancel(){

		// }
		//点燃卡牌与吸收卡牌火焰
		{//神庞统相关函数
			/**
			 * 输出list中未点燃的卡
			 * @param {*} list 
			 * @returns 
			 */
			get.YB_noflames = function (list) {
				var list2 = Array.from(list).filter(c => !c.storage.YB_flames);
				return list2;
			}
			/**
			 * 输出list中点燃的卡
			 * @param {*} list 
			 * @returns 
			 */
			get.YB_flames = function (list) {
				var list2 = Array.from(list).filter(c => c.storage.YB_flames);
				return list2;
			}
			/**
			 * 点燃输入卡组
			 * @param {*} list 
			 */
			game.YB_fire = function (list) {
				var list2 = Array.from(list)
				list2.forEach(c => {
					if (!c.storage.YB_flames) {
						c.storage.YB_flames = true;
						c.classList.add("YB_flames");
					}
				})
			}/**
			* 熄灭输入卡组
			* @param {*} list 
			*/
			game.YB_nofire = function (list) {
				var list2 = Array.from(list)
				list2.forEach(c => {
					if (c.storage.YB_flames) {
						delete c.storage.YB_flames;
						c.classList.remove("YB_flames");
					}
				})
			}
			// var list= Array.from(ui.cardPile)
			/**
			 * 吸收卡组火焰
			 * @param {*} list 
			 */
			lib.element.player.YB_nofire = function (list) {
				var list2 = Array.from(list), num = [];
				list2.forEach(c => {
					if (c.storage.YB_flames) {
						delete c.storage.YB_flames;
						c.classList.remove("YB_flames");
						num.push(c);
					}
				})
				// if(this.storage.ybsl_ptchiling)this.storage.ybsl_ptchiling=0;
				// this.storage.ybsl_ptchiling+=num;
				this.addMark('ybsl_ptchiling', num.length, false);
				var cards = get.translation(num);
				game.log(this, '吸收了', '#y' + cards, `的火焰，获得了共计<span style=\'color:yellow\'>${num.length}</span>枚`, '#g' + '火焰', '。')
			}
			get.YB_fire_num = function (num) {
				switch (num) {
					case 1: return 2;
					case 2: return 5;
					case 3: return 10;
					case 4: return 20;
					case 5: return 40;
					default: return 0;
				}
			}
		}
		{//AB技//势极技
			lib.skill._ybsl_shiji = {
				firstDo: true,
				direct: true,
				ruleSkill: true,
				trigger: {
					player: ["useSkill", "logSkillBegin", "useCard", "respond"],
				},
				filter: function (event, player) {
					let skill = get.sourceSkillFor(event);
					// if(skill)game.log(skill)
					return lib.skill[skill]?.YB_shiji;
				},
				content: function () {
					let skill = get.sourceSkillFor(trigger);
					if (lib.skill[skill].YB_shiji == 'yin') {
						if (player.hasSkill('ybsl_shiji_yang')) {
							player.YB_shiji();
						}
						player.YB_tempy('ybsl_shiji_yin')
					}
					else {
						if (player.hasSkill('ybsl_shiji_yin')) {
							player.YB_shiji(true);
						}
						player.YB_tempy('ybsl_shiji_yang')
					}

				}
			}
			lib.element.player.YB_shiji = function (i) {
				// arguments.length > 0
				var str = i ? 'yin' : 'yang';
				game.log(this, '重置了', i ? '#g势极技阴极' : '#g势极技阳极')
				this.removeSkill('ybsl_shiji_' + str);
			}
			lib.skill.ybsl_shiji_yin = {
				// onremove:true,
				charlotte: true,
				skillBlocker: function (skill, player) {
					return lib.skill[skill].YB_shiji && lib.skill[skill].YB_shiji == 'yin';
				},
				init: function (player, skill) {
					player.addSkillBlocker(skill);
				},
				onremove: function (player, skill) {
					player.removeSkillBlocker(skill);
				},
				mark: true,
				marktext: '<span class=thundertext>势</span>',
				intro: {
					name: '势极技',
					content: '本回合不能使用势极技<span class=thundertext>阴极</span>。'
				}
			}
			lib.skill.ybsl_shiji_yang = {
				onremove: true,
				charlotte: true,
				skillBlocker: function (skill, player) {
					return lib.skill[skill].YB_shiji && lib.skill[skill].YB_shiji == 'yang';
				},
				init: function (player, skill) {
					player.addSkillBlocker(skill);
				},
				onremove: function (player, skill) {
					player.removeSkillBlocker(skill);
				},
				mark: true,
				marktext: '<span class=firetext>势</span>',
				intro: {
					name: '势极技',
					content: '本回合不能使用势极技<span class=firetext>阳极</span>。'
				}
			}
		}
		get.YB_key = function (list) {
			var list2 = [];
			for (var i in list) {
				list2.push(i);
			}
			return list2;
		}
		//如下
		/**
		 * 临时获得标记用的子技能并获得标记，若没有对应的子技能会当场创建该自己能
		 * @param { skill } skill - 此参数输入技能id
		 * @param { num } num - 此参数输入获得的标记数
		 */
		lib.element.player.YB_temp = function (skill, num) {
			var num = (num || 1);
			if (!lib.skill[skill]) lib.skill[skill] = { onremove: true, charlotte: true, }
			this.addTempSkill(skill);
			this.addMark(skill, num);
		}
		/**
		 * 临时获得标记用的子技能并静默获得标记，若没有对应的子技能会当场创建该自己能
		 * @param { skill } skill - 此参数输入技能id
		 * @param { num } num - 此参数输入获得的标记数
		 */
		lib.element.player.YB_tempx = function (skill, num) {
			var num = (num || 1);
			if (!lib.skill[skill]) lib.skill[skill] = { onremove: true, charlotte: true, }
			this.addTempSkill(skill);
			this.addMark(skill, num, false);
		}
		/**
		 * 临时获得标记用的子技能并显示该技能标记，若没有对应的子技能会当场创建该自己能
		 * @param { skill } skill - 此参数输入技能id
		 * @param { num } num - 此参数输入获得的标记数
		 */
		lib.element.player.YB_tempy = function (skill, num) {
			var num = (num || 1);
			if (!lib.skill[skill]) lib.skill[skill] = { onremove: true, charlotte: true, }
			this.addTempSkill(skill);
			this.markSkill(skill);
		}
		//-----------改变血量至
		lib.element.player.YB_HpTo = function (num) {
			var next = game.createEvent('YB_HpTo', false);
			next.num = num;
			next.player = this;
			next.setContent('YB_HpTo');
			return next;
		}
		lib.element.content.YB_HpTo = function () {
			if (num == player.hp) { event.finish(); }
			else {
				if (num > player.hp) {
					player.hp += (num - player.hp);
					if (num > player.maxHp - player.hp) {
						player.maxHp += (num - player.maxHp);
					}
				}
				if (num < player.hp) {
					player.hp -= (player.hp - num)
				}
				game.log(player, '将体力值调整至了' + get.cnNumber(num) + '点')
				player.update();
			}
		}
		/*
		lib.element.player.YB_button = function(title,dialog,switchToAuto,ok){
			var next=game.createEvent('YB_button',false);
			next.player=this;
			next.title=title;
			next.list6666=dialog;
			if(switchToAuto)next.switchToAuto=switchToAuto;
			if(ok)next.ok=ok;
			next.setContent('YB_button');
			return next;
		}
		//[{suit:'花色'},{spade:'黑桃'}]
		lib.element.content.YB_button = function(){
			'step 0'
			var list6666=event.list6666,title=event.title;
			
			var switchToAuto=function(){
				_status.imchoosing=false;
				// var listn=['普通'].concat(lib.inpile_nature);
				event._result={
					bool:true,
					// suit:suita[0],
					// type:typea[0],
				};
				for (var yb03 of list6666){
					var k=get.YB_cobo(yb03[0]);
					// var title2=yb03[0][k];
					var zs=get.YB_cobo(yb03[1]);
					event._result[k]=zs[0];
				}
				if(event.dialog) event.dialog.close();
				if(event.control) event.control.close();
			};
			var chooseButton=function(player){
				var event=_status.event;
				player=player||event.player;
				if(!event._result) event._result={};
				var dialog=ui.create.dialog('<font size=6><b>'+title[0]+'</b></font>','forcebutton','hidden');
				dialog.add(title[1]);
				// var dialog=ui.create.dialog('你声明一个花色和类型，然后亮出牌堆顶三张牌，获得与你描述相符的牌。<br>若有两项皆满足的牌，你回复一点体力。','forcebutton','hidden');
				event.dialog=dialog;
				for (var yb01 of list6666){
					var k=get.YB_cobo(yb01[0]);
					var title2=yb01[0][k];
					dialog.addText(title2);
					var table=document.createElement('div');
					table.classList.add('add-setting');
					table.style.margin='0';
					table.style.width='100%';
					table.style.position='relative';
					var suit = yb01[1];//
					var listi = get.YB_cobo(yb01[1]);
					// var listi=[];
					// for(var ybi in suit){
						// listi.push(ybi);
					// }
					// var listn=[];
					// for(var ybn in type){
						// listn.push(ybn);
					// }
					for(var i=0;i<listi.length;i++){
						var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
						td.link=listi[i];
						table.appendChild(td);
						td.innerHTML='<span>'+suit[listi[i]]+'</span>';
						td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
							if(_status.dragged) return;
							if(_status.justdragged) return;
							_status.tempNoButton=true;
							setTimeout(function(){
								_status.tempNoButton=false;
							},500);
							var link=this.link;
							var current=this.parentNode.querySelector('.bluebg');
							if(current){
								current.classList.remove('bluebg');
							}
							this.classList.add('bluebg');
							event._result[k]=link;
						});
					}
					dialog.content.appendChild(table);
				}
				
				// dialog.addText('类型');
				// var table2=document.createElement('div');
				// table2.classList.add('add-setting');
				// table2.style.margin='0';
				// table2.style.width='100%';
				// table2.style.position='relative';
				// // var listn=['普通'].concat(lib.inpile_nature);
				// for(var i=0;i<listn.length;i++){
					// var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
					// var nature=listn[i];
					// td.link=nature;
					// table2.appendChild(td);
					// td.innerHTML='<span>'+type[nature]+'</span>';
					// td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
						// if(_status.dragged) return;
						// if(_status.justdragged) return;
						// _status.tempNoButton=true;
						// setTimeout(function(){
							// _status.tempNoButton=false;
						// },500);
						// var link=this.link;
						// var current=this.parentNode.querySelector('.bluebg');
						// if(current){
							// current.classList.remove('bluebg');
						// }
						// this.classList.add('bluebg');
						// event._result.type=link;
					// });
				// }
				// dialog.content.appendChild(table2);
				dialog.add('　　');
				event.dialog.open();
				
				if(!event.switchToAuto){
					event.switchToAuto=function(){
						event._result={
							bool:true,
							// type:listn[0],
							// suit:listi[0],
						};
						for (var yb03 of list6666){
							var k=get.YB_cobo(yb03[0]);
							// var title2=yb03[0][k];
							var zs=get.YB_cobo(yb03[1]);
							event._result[k]=zs[0];
						}
						event.dialog.close();
						event.control.close();
						game.resume();
						_status.imchoosing=false;
					};
				}
				
				if(event.ok){
					event.control=event.ok;
					
				}
				else {
					event.control=ui.create.control('ok',function(link){
						var result=event._result;
						for (var yb04 of list6666){
							var k=get.YB_cobo(yb04[0]);
							// var title2=yb03[0][k];
							// var zs=get.YB_cobo(yb04[1]);
							if(!result[k]) return;//此行切换注释，可令按钮无视选项，直接确定
						}
						// if(!result.type||!result.suit) return;
						// else{
							result.bool=true;
						// }
						event.dialog.close();
						event.control.close();
						game.resume();
						_status.imchoosing=false;
					});
				}
				// event.control=ui.create.control('ok',function(link){
					// var result=event._result;
					// for (var yb04 of list6666){
						// var k=get.YB_cobo(yb04[0]);
						// // var title2=yb03[0][k];
						// // var zs=get.YB_cobo(yb04[1]);
						// if(!result[k]) return;//此行切换注释，可令按钮无视选项，直接确定
					// }
					// // if(!result.type||!result.suit) return;
					// // else{
						// result.bool=true;
					// // }
					// event.dialog.close();
					// event.control.close();
					// game.resume();
					// _status.imchoosing=false;
				// });
				for(var i=0;i<event.dialog.buttons.length;i++){
					event.dialog.buttons[i].classList.add('selectable');

				}
				game.pause();
				game.countChoose();
			};
			if(event.isMine()){
				chooseButton(player);
			}
			else if(event.isOnline()){
				event.player.send(chooseButton,event.player);
				event.player.wait();
				game.pause();
			}
			else{
				switchToAuto();
			}
			'step 1'
			event.result=result;
		}
		*/
		//----------涉猎任意张
		lib.element.player.YB_shelie = function (num, i, log) {
			var next = game.createEvent('YB_shelie', false);
			next.num = num;
			next.i = '涉猎';
			if (i && i !== true) next.i = i;
			if (i == true || log == true) next.k = true;
			next.player = this;
			next.setContent('YB_shelie');
			return next;
		}
		lib.element.content.YB_shelie = function () {
			'step 0'
			event.cards = get.cards(num);
			game.cardsGotoOrdering(event.cards);
			event.videoId = lib.status.videoId++;
			game.broadcastAll(function (player, id, cards) {
				var str = event.i;
				if (player == game.me && !_status.auto) {
					str += '：获取花色各不相同的牌';
				}
				var dialog = ui.create.dialog(str, cards);
				dialog.videoId = id;
			}, player, event.videoId, event.cards);
			event.time = get.utc();
			game.addVideo('showCards', player, [event.i, get.cardsInfo(event.cards)]);
			game.addVideo('delay', null, 2);
			'step 1'
			var list = [];
			for (var i of cards) list.add(get.suit(i, false));
			if (event.k == true) { var k = list.length; }
			else { var k = [0, Infinity]; }
			var next = player.chooseButton(k, true);
			next.set('dialog', event.videoId);
			next.set('filterButton', function (button) {
				for (var i = 0; i < ui.selected.buttons.length; i++) {
					if (get.suit(ui.selected.buttons[i].link) == get.suit(button.link)) return false;
				}
				return true;
			});
			next.set('ai', function (button) {
				return get.value(button.link, _status.event.player);
			});
			'step 2'
			if (result.bool && result.links) {
				event.cards2 = result.links;
			}
			else {
				event.finish();
			}
			var time = 1000 - (get.utc() - event.time);
			if (time > 0) {
				game.delay(0, time);
			}
			'step 3'
			game.broadcastAll('closeDialog', event.videoId);
			var cards2 = event.cards2;
			player.gain(cards2, 'log', 'gain2');
		}
		//-------------扶汉函数
		lib.element.player.YB_fuhan = function (i, type) {
			var next = game.createEvent('YB_fuhan', false);
			next.player = this;
			if (i != 'old' && i != 'tw') {
				next.groupa = i[0];
				next.numa = i[1];
				next.numb = i[2];
				next.band = i[3];
				next.sex = i[4];
				next.zhu = i[5];
				next.banb = type;
			}
			else {
				next.banb = i;
			}
			next.setContent('YB_fuhan');
			return next;
		}
		lib.element.content.YB_fuhan = function () {
			'step 0'
			if (!event.numa) { event.numa = 5; }
			if (!event.band) { event.band = []; }
			if (event.groupa == 'all') { delete event.groupa; }
			if (!event.zhu) { event.zhu == ''; }
			if (!event.sex || event.sex.length == 0 || event.sex == 'all') { event.sex = ['female', 'male', 'double', 'none']; }
			if (event.banb == 'old') { event.goto(3); }
			if (event.banb == 'tw') { event.goto(5); }
			'step 1'
			var list;
			if (!event.numb) { event.numb = 2; }
			if (_status.characterlist) {
				list = [];
				for (var i = 0; i < _status.characterlist.length; i++) {
					var name = _status.characterlist[i];
					if (event.sex.contains(lib.character[name][0])) {
						if (!event.groupa) { list.push(name); }
						else if (event.groupa.contains(lib.character[name][1])) { list.push(name); }//groupa应用
					}
				}
			}
			else if (_status.connectMode) {
				list = get.charactersOL(function (i) {
					return event.groupa.contains(lib.character[i][1]) && event.sex.contains(lib.character[i][0]);
				});
			}
			else {
				list = get.gainableCharacters(function (info) {
					return event.groupa.contains(info[1]) && event.sex.contains(info[0]);
				});
			}
			var players = game.players.concat(game.dead);
			for (var i = 0; i < players.length; i++) {
				list.remove(players[i].name);
				list.remove(players[i].name1);
				list.remove(players[i].name2);
			}
			if (event.zhu == 'zhu') {
				for (var z of list) {
					if (!lib.character[z][4] || !lib.character[z][4].contains('zhu')) event.band.add(z)
				}
			}
			else if (event.zhu == 'nozhu') {
				for (var z of list) {
					if (lib.character[z][4] && lib.character[z][4].contains('zhu')) event.band.add(z)
				}
			}
			if (event.band.length > 0) {
				for (var j of event.band) {
					if (list.contains(j)) list.remove(j);//应用数据band
				}
			}
			list = list.randomGets(event.numa);//应用数据numa
			var skills = [];
			for (var i of list) {
				skills.addArray((lib.character[i][3] || []).filter(function (skill) {
					var info = get.info(skill);
					return info && !info.zhuSkill && !info.limited && !info.juexingji && !info.hiddenSkill && !info.charlotte && !info.dutySkill;
				}));
			}
			if (!list.length || !skills.length) { event.finish(); return; }
			if (player.isUnderControl()) {
				game.swapPlayerAuto(player);
			}
			var switchToAuto = function () {
				_status.imchoosing = false;
				event._result = {
					bool: true,
					skills: skills.randomGets(2),
				};
				if (event.dialog) event.dialog.close();
				if (event.control) event.control.close();
			};
			var tara = get.cnNumber(event.numb);//翻译大写数字
			var chooseButton = function (list, skills) {
				var event = _status.event;
				if (!event._result) event._result = {};
				event._result.skills = [];
				var rSkill = event._result.skills;
				var dialog = ui.create.dialog('请选择获得至多' + tara + '个技能', [list, 'character'], 'hidden');
				event.dialog = dialog;
				var table = document.createElement('div');
				table.classList.add('add-setting');
				table.style.margin = '0';
				table.style.width = '100%';
				table.style.position = 'relative';
				for (var i = 0; i < skills.length; i++) {
					var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
					td.link = skills[i];
					table.appendChild(td);
					td.innerHTML = '<span>' + get.translation(skills[i]) + '</span>';
					td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
						if (_status.dragged) return;
						if (_status.justdragged) return;
						_status.tempNoButton = true;
						setTimeout(function () {
							_status.tempNoButton = false;
						}, 500);
						var link = this.link;
						if (!this.classList.contains('bluebg')) {
							if (rSkill.length >= event.numb) return;
							rSkill.add(link);
							this.classList.add('bluebg');
						}
						else {
							this.classList.remove('bluebg');
							rSkill.remove(link);
						}
					});
				}
				dialog.content.appendChild(table);
				dialog.add('　　');
				dialog.open();

				event.switchToAuto = function () {
					event.dialog.close();
					event.control.close();
					game.resume();
					_status.imchoosing = false;
				};
				event.control = ui.create.control('ok', function (link) {
					event.dialog.close();
					event.control.close();
					game.resume();
					_status.imchoosing = false;
				});
				for (var i = 0; i < event.dialog.buttons.length; i++) {
					event.dialog.buttons[i].classList.add('selectable');
				}
				game.pause();
				game.countChoose();
			};
			if (event.isMine()) {
				chooseButton(list, skills);
			}
			else if (event.isOnline()) {
				event.player.send(chooseButton, list, skills);
				event.player.wait();
				game.pause();
			}
			else {
				switchToAuto();
			}
			'step 2'
			var map = event.result || result;
			if (map && map.skills && map.skills.length) {
				for (var i of map.skills) player.addSkillLog(i);
			}
			game.broadcastAll(function (list) {
				game.expandSkills(list);
				for (var i of list) {
					var info = lib.skill[i];
					if (!info) continue;
					if (!info.audioname2) info.audioname2 = {};
					info.audioname2.old_yuanshu = 'weidi';
				}
			}, map.skills);
			event.finish();
			'step 3'
			event.num = event.numa;
			var list;
			if (!event.numb) { event.numb = (player.name1 || player.name); }
			if (_status.characterlist) {
				list = [];
				for (var i = 0; i < _status.characterlist.length; i++) {
					var name = _status.characterlist[i];
					if (event.sex.contains(lib.character[name][0])) {
						if (!event.groupa) { list.push(name); }
						else if (event.groupa.contains(lib.character[name][1])) { list.push(name); }//groupa应用
					}
				}
			}
			else if (_status.connectMode) {
				list = get.charactersOL(function (i) {
					return event.groupa.contains(lib.character[i][1]) && event.sex.contains(lib.character[i][0]);
				});
			}
			else {
				list = get.gainableCharacters(function (info) {
					return event.groupa.contains(info[1]) && event.sex.contains(info[0]);
				});
			}
			var players = game.players.concat(game.dead);
			for (var i = 0; i < players.length; i++) {
				list.remove(players[i].name);
				list.remove(players[i].name1);
				list.remove(players[i].name2);
			}
			if (event.band.length > 0) {
				for (var j of event.band) {
					if (list.contains(j)) list.remove(j);//应用数据band
				}
			}
			if (event.zhu == 'zhu') {
				for (var z of list) {
					if (!lib.character[z][4] || !lib.character[z][4].contains('zhu')) event.band.add(z)
				}
			}
			else if (event.zhu == 'nozhu') {
				for (var z of list) {
					if (lib.character[z][4] && lib.character[z][4].contains('zhu')) event.band.add(z)
				}
			}
			// var dialog=ui.create.dialog();
			// dialog.add([list.randomGets(5),'character']);
			var kkk = get.translation(event.numb)
			player.chooseButton(true).set('ai', function (button) {
				return get.rank(button.link, true) - lib.character[button.link][2];
			}).set('createDialog', ['将' + kkk + '替换为一名角色', [list.randomGets(event.num), 'character']]);
			'step 4'
			// event.name=event.numb;
			player.reinit(event.numb, result.links[0], false);
			if (_status.characterlist) {
				_status.characterlist.add(event.numb);
				_status.characterlist.remove(result.links[0]);
			}
			event.finish();
			'step 5'
			event.num = event.numa;
			if (_status.characterlist) {
				list = [];
				for (var i = 0; i < _status.characterlist.length; i++) {
					var name = _status.characterlist[i];
					if (event.sex.contains(lib.character[name][0])) {
						if (!event.groupa) { list.push(name); }
						else if (event.groupa.contains(lib.character[name][1])) { list.push(name); }//groupa应用
					}
				}
			}
			else if (_status.connectMode) {
				list = get.charactersOL(function (i) {
					return event.groupa.contains(lib.character[i][1]) && event.sex.contains(lib.character[i][0]);
				});
			}
			else {
				list = get.gainableCharacters(function (info) {
					return event.groupa.contains(info[1]) && event.sex.contains(info[0]);
				});
			}
			var players = game.players.concat(game.dead);
			for (var i = 0; i < players.length; i++) {
				list.remove(players[i].name);
				list.remove(players[i].name1);
				list.remove(players[i].name2);
			}
			if (event.band.length > 0) {
				for (var j of event.band) {
					if (list.contains(j)) list.remove(j);//应用数据band
				}
			}
			if (event.zhu == 'zhu') {
				for (var z of list) {
					if (!lib.character[z][4] || !lib.character[z][4].contains('zhu')) event.band.add(z)
				}
			}
			else if (event.zhu == 'nozhu') {
				for (var z of list) {
					if (lib.character[z][4] && lib.character[z][4].contains('zhu')) event.band.add(z)
				}
			}
			var ttt = get.translation(event.numb);
			player.chooseButton([ttt + '：选择获得一张武将牌上的所有技能', [list.randomGets(event.num), 'character']], true);
			'step 6'
			if (result.bool) {
				var name = result.links[0];
				player.flashAvatar(event.numb, name);
				game.log(player, '获得了', '#y' + get.translation(name), '的所有技能');
				player.addSkill(lib.character[name][3])
			}
		}
		//-------------逐个翻译
		get.YB_tobo = function (cards) {
			var list = [];
			for (var i of cards) {
				list.push(get.translation(i));
			}
			return list;
		}
		//------------紧密贴合的逐个翻译
		get.YB_tobo2 = function (cards) {
			var list = '';
			for (var i of cards) {
				list += (get.translation(i));
			}
			return list;
		}
		//------------中文顿号分隔的的逐个翻译
		get.YB_tobo3 = function (cards) {
			var list = '';
			for (var i of cards) {
				if (i != cards[0]) list += '、';
				list += (get.translation(i));
			}
			return list;
		}
		//-------------解码（划掉）翻译
		get.YB_map = function (list, map) {
			var list2 = [];
			for (var i of list) {
				list2.push(map[i]);
			}
			return list2;
		}
		//-----------判断一个卡组，懒得介绍自己悟
		get.YB_suit = function (cards, i) {
			let atk = get[i] || get.suit;
			var list2 = [];
			for (var k of cards) {
				if (list2.length == 0 || !list2.includes(atk(k))) list2.add(atk(k));
			}
			return list2;
		}
		//-------------包装
		get.YB_cobo = function (map) {
			var list = [];
			for (var i in map) {
				list.push(i);
				// list[list.length-1].innerHTML='<span>'+map[i]+'</span>';
			}
			// var list2=[];
			// for(var k=0;k<list.length;k++){
			// 	list2.push(list[k]);
			// 	list2[k].innerHTML='<span>'+map[list[k]]+'</span>';
			// }
			return list;
		}

		//--------所有卡牌类型
		get.YB_type = function () {
			var type = [];
			var list = {};
			var listk = [];
			var listn = [];
			for (var i of lib.inpile) {
				if (event[get.type2(i)] != true) {
					type.add(get.translation(get.type2(i)));
					var n = get.type2(i);
					list[n] = get.type2(i);
					listn.add(n);
					listk.add([n, get.translation(get.type2(i))]);
					event[n] = true;
				}
			};
			return listk;
		}
		//--------输入卡牌组的类型
		get.YB_type2 = function (cards) {
			var type = [];
			var list = {};
			var listk = [];
			var listn = [];
			for (var i of cards) {
				if (!listn.length || !listn.includes(get.type2(i))) {
					type.add(get.translation(get.type2(i)));
					var n = get.type2(i);
					list[n] = get.type2(i);
					listn.add(n);
					listk.add([n, get.translation(get.type2(i))]);
					// event[n]=true;
				}
			};
			return listk;
		}
		//-------------重铸函数（需输入要重铸的牌）
		//-------------本体已经有重铸函数了，player.recast(cards)即可
		lib.element.player.YB_chongzhu = function (card) {
			'step 0'
			this.loseToDiscardpile(card);
			'step 1'
			this.draw(card.length || 1);
		}
		//-------------制衡函数
		lib.element.player.YB_zhiheng = function (list) {
			this.discard(list);
			this.draw(list.length);
		}
		//-------------谋离间函数
		lib.element.player.YB_sblijian = function (list) {
			game.countPlayer(function (current) {
				//计算游戏中的每个玩家
				if (list.contains(current)) {
					var targetx = list.slice().sortBySeat(current)[1];
					var card = { name: 'juedou', isCard: true };
					if (current.canUse(card, targetx)) current.useCard(card, targetx);
				}
			});
		}
		//-------------将手牌数调整至num，num不能不写
		lib.element.player.YB_changeHandCard = function (num) {
			'step 0'
			var num22 = this.countCards('h');
			if (num22 > num) {
				this.chooseToDiscard('h', num22 - num, true)
			}
			else if (num22 < num) {
				this.draw(num - num22);
			}
		}
		//----------执行：重铸手中一种花色的所有牌
		lib.element.content.YB_chooseToChongzhu = function () {
			'step 0'
			event.list = [];
			var cards = player.getCards('h');
			var suits = get.YB_suit(cards);
			player.showCards(cards);
			for (var k = 0; k < suits.length; k++) {
				event.list.add([suits[k], []]);
				for (var j of cards) {
					if (get.suit(j) == suits[k]) event.list[k][1].add(j);
				}
			}
			var list = [], list6 = [];
			for (var h = 0; h < event.list.length; h++) {
				list.add(get.translation(event.list[h][0] + '2'));
				list6.add([get.translation(event.list[h][0] + '2') + '：', get.translation(event.list[h][1])]);
			}
			if (!list.length) event.finish();
			else player.chooseControl(list).set('choiceList', list6).set('prompt', '请选择重铸一种花色的所有牌');
			'step 1'
			player.recast(event.list[result.index][1]);
		}
		//----------------中流
		lib.element.player.YB_zhongliu = function () {
			var player = this;
			var skills = player.getStockSkills(true, true);
			game.expandSkills(skills);
			var resetSkills = [];
			var suffixs = ['used', 'round', 'block', 'blocker'];
			for (var skill of skills) {
				var info = get.info(skill);
				if (typeof info.usable == 'number') {
					if (player.hasSkill('counttrigger') && player.storage.counttrigger[skill] && player.storage.counttrigger[skill] >= 1) {
						delete player.storage.counttrigger[skill];
						resetSkills.add(skill);
					}
					if (typeof get.skillCount(skill) == 'number' && get.skillCount(skill) >= 1) {
						delete player.getStat('skill')[skill];
						resetSkills.add(skill);
					}
				}
				if (info.round && player.storage[skill + '_roundcount']) {
					delete player.storage[skill + '_roundcount'];
					resetSkills.add(skill);
				}
				if (player.storage[`temp_ban_${skill}`]) {
					delete player.storage[`temp_ban_${skill}`];
				}
				if (player.awakenedSkills.contains(skill)) {
					player.restoreSkill(skill);
					resetSkills.add(skill);
				}
				for (var suffix of suffixs) {
					if (player.hasSkill(skill + '_' + suffix)) {
						player.removeSkill(skill + '_' + suffix);
						resetSkills.add(skill);
					}
				}
			}
			if (resetSkills.length) {
				var str = '';
				for (var i of resetSkills) {
					str += '【' + get.translation(i) + '】、';
				}
				game.log(player, '重置了技能', '#g' + str.slice(0, -1));
			}
		}
		//-------------角色集合从主视角按座位排序
		get.YB_1234 = function (list) {
			var list2 = [];
			game.countPlayer(function (current) {
				//计算游戏中的每个玩家
				if (list.contains(current)) {
					list2.push(current);
				}
			});
			return list2;
		}
		//-------------获取其已发动限定技
		get.North_bmh_chizhang = function (player) {
			var list = [];
			var skills = player.getOriginalSkills();
			for (var i = 0; i < skills.length; i++) {
				if (lib.skill[skills[i]].limited && player.awakenedSkills.contains(skills[i])) {
					list.push(skills[i]);
				}
			}
			return list;
		}
		//---------------突袭价值
		get.YB_tuxivalue = function (player) {
			var player = player;
			var check, i, num = 0, num2 = 0, players = game.filterPlayer();
			for (i = 0; i < players.length; i++) {
				if (player != players[i] && players[i].countCards('h')) {
					var att = get.attitude(player, players[i]);
					if (att <= 0) {
						num++;
					}
					if (att < 0) {
						num2++;
					}
				}
			}
			if (num >= 2 && num2 > 0) check = true;
			else check = false;
			return check;
		}
		//---------------移牌价值
		get.YB_movevalue = function (player) {
			var player = player;
			var check;
			if (!player.canMoveCard(true)) {
				check = false;
			}
			else {
				check = game.hasPlayer(function (current) {
					return get.attitude(player, current) > 0 && current.countCards('j');
				});
				if (!check) {
					if (player.countCards('h') > player.hp + 1) {
						check = false;
					}
					else if (player.countCards('h', { name: ['wuzhong'] })) {
						check = false;
					}
					else {
						check = true;
					}
				}
			}
			return check;
		}
		//--------当前步骤立即选择并输出结果
		// get.YB_comeon=function(list){
		// 'step 0'

		// }
		//--------------升级指定技能--------------//
		lib.element.player.YB_levelUp = function (str) {
			for (var i of str) {
				lib.skill[i].levelUp(this);
			}
		}
		//-------------按钮翻页
		lib.element.player.YB_control = function (control, num, str) {
			var next = game.createEvent('YB_control', false);
			next.player = this;
			next.list = control;
			if (typeof num == 'number') { next.numb = num; next.str = str; }
			else { next.str = num; }
			next.setContent('YB_control');
			return next;
		}
		lib.element.content.YB_control = function () {
			'step 0'
			event.num = 1;
			if (!event.numb) event.numb = 8;
			if (event.ai == undefined) event.ai = function (control) {
				return 0;
				// return true;
			};
			if (!event.isMine()) event.goto(2);
			'step 1'
			var kd = event.numb;//定义宽度
			var ss = event.list.length;
			var qy = ss % kd;//技能数除kd余数
			if (event.num * kd > ss) {
				var sl = qy;
			}
			else {
				var sl = kd;
			}//定义这一页的数量
			var list = [];//定义集合
			if (event.num > 1) {
				list.push('上页');
			}
			for (var i = 0; i < sl; i++) {
				var t = (event.num - 1) * kd + i;
				list.push(event.list[t]);
			}
			if (ss > kd * event.num) {
				list.push('下页');
			}
			list.push('cancel2');
			var str = event.str ? event.str : '<span class=yellowtext>请选择一项：</span>';
			player.chooseControl(list).set(
				'prompt',
				str
			);
			'step 2'
			if (result.control == '上页') {
				event.num--;
				event.goto(1);
			}
			else if (result.control == '下页') {
				event.num++;
				event.goto(1);
			}
			else if (!event.isMine()) {
				var list = [];
				for (var i = 0; i < event.list.length; i++) {
					list.push(event.list[i]);
				}
				list.push('cancel2');
				player.chooseControl(list).set(
					'prompt',
					'\u6b63\u5e38\u6765\u8bf4\uff0c\u8fd9\u4e2a\u9009\u62e9\u7684\u6309\u94ae\u53ea\u4f1a\u5c55\u793a\u7ed9\u0061\u0069\uff0c\u5047\u5982\u4f60\u770b\u5230\u8fd9\u6bb5\u8bdd\uff0c\u4f60\u5c31\u8981\u601d\u8003\u4e00\u4e0b\uff0c\u662f\u4e0d\u662f\u505a\u4e86\u4ec0\u4e48\u8ff7\u60d1\u884c\u4e3a\uff0c\u6bd4\u5982\u6258\u7ba1\u4e2d\u7a81\u7136\u63a5\u624b\u4e4b\u7c7b\u7684\u3002&#19981;&#36807;&#20320;&#21487;&#20197;&#25226;&#36825;&#20010;&#39029;&#38754;&#25130;&#22270;&#21457;&#36827;&#32676;&#37324;&#65292;&#39318;&#20010;&#21457;&#29616;&#24182;&#25130;&#22270;&#21457;&#36827;&#22812;&#30333;&#32676;&#37324;&#30340;&#65292;&#20250;&#33719;&#36192;&#31070;&#31192;&#22836;&#34900;&#19968;&#20010;&#12290;'
				).set('ai', event.ai);
			}
			'step 3'
			event.result = result;
		}
		//-------------分支选择
		// lib.element.player.YB_chooseY = function(card,viewAs,log){
		// }
		//-------------隅泣函数
		lib.element.player.YB_yuqi = function (i, target) {
			var next = game.createEvent('YB_yuqi', false);
			next.player = this;
			// if(get.itemtype(i)=='select'){
			next.list2 = i;
			// }
			// else{next.list2=['隅泣',3,1,1];}
			if (target) next.target = target;
			// next.log=log;//技能说明
			// next.numa=numa;//展示数量
			// next.numb=numb;//对方数量
			// next.numc=numc;//自己数量
			next.setContent('YB_yuqi');
			return next;
		}
		lib.element.content.YB_yuqi = function () {
			'step 0'
			event.list = event.list2;
			if (!event.target) {
				event.target = player;
				// if(trigger.player)event.target=trigger.player;
			}
			var cards = get.cards(event.list[1]);
			event.cards = cards;
			game.cardsGotoOrdering(cards);
			var str = event.list[0];
			str += '（若对话框显示不完整，可下滑操作）';
			var next = player.chooseToMove(true, str);
			next.set('list', [
				['牌堆顶的牌', cards],
				['交给' + get.translation(event.target) + '（至少一张' + (event.list[2] > 1 ? ('，至多' + get.cnNumber(event.list[2]) + '张') : '') + '）'],
				['交给自己（至多' + get.cnNumber(event.list[3]) + '张）'],
			]);
			next.set('filterMove', function (from, to, moved) {
				var info = event.list2;
				if (to == 1) return moved[1].length < info[2];
				if (to == 2) return moved[2].length < info[3];
				return true;
			});
			next.set('processAI', function (list) {
				var cards = list[0][1].slice(0).sort(function (a, b) {
					return get.value(b, 'raw') - get.value(a, 'raw');
				}), player = _status.event.player, target = event.target;
				var info = event.list2;
				var cards1 = cards.splice(0, Math.min(info[3], cards.length - 1));
				var card2;
				if (get.attitude(player, target) > 0) card2 = cards.shift();
				else card2 = cards.pop();
				return [cards, [card2], cards1];
			});
			next.set('filterOk', function (moved) {
				return moved[1].length > 0;
			});
			'step 1'
			if (result.bool) {
				var moved = result.moved;
				cards.removeArray(moved[1]);
				cards.removeArray(moved[2]);
				while (cards.length) {
					ui.cardPile.insertBefore(cards.pop().fix(), ui.cardPile.firstChild);
				}
				var list = [[event.target, moved[1]]];
				if (moved[2].length) list.push([player, moved[2]]);
				game.loseAsync({
					gain_list: list,
					giver: player,
					animate: 'gain2',
				}).setContent('gaincardMultiple');
			}
		}
		//-------------24点（搬运自福瑞拓展）
		lib.element.player.FY_24 = function (cards, log) {
			var next = game.createEvent('FY_24', false);
			next.player = this;
			next.list2 = cards;
			next.log = '算演';
			if (log) next.log = log;
			next.setContent('FY_24');
			return next;
		}
		lib.element.content.FY_24 = function () {
			'step 0'
			var cards = event.list2;
			game.cardsGotoOrdering(cards);
			event.cards = cards
			var dialog = ui.create.dialog(event.log, cards, true)
			event.dialog = dialog
			event.list2 = []
			for (var i = 0; i < event.cards.length; i++) {
				event.list2.push(get.number(event.cards[i]))
			}
			event.list2.sort(function (a, b) { return a - b });
			if (!event.isMine()) {
				player.popup('计算成功！');
				player.gain(cards, 'gain2').gaintag.add('delta_sy')
				player.addTempSkill('delta_sy_1')
				event.dialog.close()
				event.finish()
			}
			'step 1'
			event.list = [];
			for (var i = 0; i < event.list2.length; i++) {
				event.list.push(event.list2[i])
			}
			event.log = '';
			'step 2'
			player.chooseControl(event.list).set('prompt', '请选择要算的第一个数字')
			'step 3'
			event.num1 = result.control
			event.list.splice(event.list.indexOf(event.num1), 1)
			player.chooseControl(event.list).set('prompt', '刚才选择了' + event.num1 + '，请选择要算的第二个数字')
			'step 4'
			event.num2 = result.control
			event.list.splice(event.list.indexOf(event.num2), 1)
			player.chooseControl(['+', '-', '*', '/', '重做', '放弃']).set('prompt', '要把' + event.num1 + '和' + event.num2 + '怎麼樣呢');
			'step 5'
			if (result.control == '+') {
				event.count = event.num1 + event.num2
				var log = (event.num1 + ' + ' + event.num2 + ' = ' + event.count);
				event.log += log;
			}
			if (result.control == '-') {
				var num = event.num1 - event.num2
				if (num > 0) {
					event.count = num;
					var log = (event.num1 + ' - ' + event.num2 + ' = ' + event.count);
					event.log += log;
				} else {
					event.count = -num;
					var log = (event.num2 + ' - ' + event.num1 + ' = ' + event.count);
					event.log += log;
				}
			}
			if (result.control == '*') {
				event.count = event.num1 * event.num2;
				var log = (event.num1 + ' * ' + event.num2 + ' = ' + event.count);
				event.log += log;
			}
			if (result.control == '/') {
				var result = event.num1 / event.num2
				event.count = result;
				var log = (event.num1 + ' / ' + event.num2 + ' = ' + event.count);
				event.log += log;
			}
			if (result.control == '重做') {
				event.goto(1);
			}
			if (result.control == '放弃') {
				event.goto(8)
			}
			'step 6'
			event.list.push(event.count)
			'step 7'
			if (event.list.length != 1) {
				event.log += ' ；<br> ';
				event.goto(2)
			}
			else if (Math.abs(event.list[0] - 24) < 0.0001) {
				event.goto(8)
			}
			else {
				player.popup(event.log + '算错了');
				game.log('本次计算展示数字为：<span class=bluetext>' + event.list2 + '</span>，计算公式如下<br><span class=yellowtext> ' + event.log + '，但是计算错误~ </span>')
				event.goto(1)
			}
			'step 8'
			if (event.list.length == 1 && (Math.abs(event.list[0] - 24) < 0.0001)) {
				player.popup('成功！');
				event._result = { FY_24: 'victoey' }
				game.log('本次计算展示数字为：<span class=bluetext>' + event.list2 + '</span>，计算公式如下<br><span class=yellowtext> ' + event.log + ' ，计算正确！</span>')
				event.dialog.close()
				event.goto(9)
			} else {
				player.popup('失败！');
				event._result = { FY_24: 'defeat' }
				game.log('本次计算展示数字为：<span class=bluetext>' + event.list2 + '</span>，但是未能成功计算')
				event.dialog.close()
				event.goto(9)
			}
			'step 9'
			event.result = result;
		}
		//-------------请人摸牌
		// lib.element.player.pleaseDraw = function(num){
		// }
		// get.YB_friend = function(player){
		// }
		//-------------彩蛋
		lib.element.player.addMaxHp = function (num, num2) {
			this.gainMaxHp(num || 1);
			this.recover(num2 || num || 1);
		}
		lib.element.player.YB_rua = function (str) {
			lib.card['YB_' + get.pinyin(str)] = {
				fullimage: true,
				image: 'character:' + get.pinyin(str),
			}
			var card = game.creatCard('YB_' + get.pinyin(str));
			player.$gain2(card);
			game.log(this, '摸了摸', str);
		}
		//-------------翻牌小游戏
		lib.element.player.YB_playTurnCard = function () {
			var next = game.createEvent('YB_playTurnCard', false);
			next.player = this;
			next.setContent('YB_playTurnCard');
			return next;
		}
		lib.element.content.YB_playTurnCard = function () {
			//没写呢，别急
		}

		//-------------命名
		//-------------这部分作废，因为我没抄明白，bug连连，还不想删
		lib.element.player.YB_name = function () {
			var next = game.createEvent('YB_name', false);
			next.player = this;
			next.setContent('YB_name');
			return next;
		}
		lib.element.content.YB_name = function () {
			'step 0'
			var dialog = ui.create.dialog(false);
			dialog.add('【命名】<br>请输入你要命的名~');
			dialog.add('\u6211\u7279\u610f\u6ca1\u5220\u5e72\u51c0\uff0c\u8fd9\u6837\u4f60\u624d\u4f1a\u77e5\u9053\uff0c\u539f\u6765\u6211\u6284\u4e86\u9b54\u738b');
			var div = document.createElement('div');
			var input = div.appendChild(document.createElement('input'));
			input.type = 'text';
			input.setAttribute('maxlength', '20');
			input.addEventListener('keydown', e => {
				e.stopPropagation();
			});
			input.addEventListener('keyup', e => {
				e.stopPropagation();
			});
			input.placeholder = '请输入喵~';
			dialog.add(div);
			event.dialog = dialog;
			event.input = input;
			'step 1'
			var {
				dialog,
				input
			} = event;
			var clickFun = () => {
				/* 移除dialog */
				dialog.remove();
				var value = input.value;
				event.text = input.value;
				game.resume();
			}
			if (event.isMine()) {
				dialog.open();
				game.pause();
				var button = ui.create.control('确定', () => {
					if (!input.value) {
						return alert('输入不能为空');
						input.value = '';
					}
					button.remove();
					clickFun();
				});

			} else if (event.isOnline()) {
				input.value = '未命名'
				clickFun();
			} else {
				input.value = '未命名'
				clickFun();
			}
			event.resume();
		}
		//-------------钫酸酱的文本输入
		lib.element.player.FY_chooseText = function chooseText() {
			var next = game.createEvent('FY_chooseText');
			for (var i = 0; i < arguments.length; i++) {
				if (typeof arguments[i] == 'boolean') {
					next.forced = arguments[i];
				} else if (Array.isArray(arguments[i])) {
					next.filterText = arguments[i]
				} else if (typeof arguments[i] == 'function') {
					if (next.ai) next.filterText = arguments[i];
					else next.ai = arguments[i];
				}
				else if (typeof arguments[i] == 'string') {
					get.evtprompt(next, arguments[i]);
				}
				else if (get.itemtype(arguments[i]) == 'dialog') {
					next.dialog = arguments[i];
				}
				else if (typeof arguments[i] == 'number') {
					next.max = arguments[i]
				}
				if (next.forced == undefined) next.forced = false;
			}
			next.player = this;
			next.setContent('FY_chooseText');
			next._args = Array.from(arguments);
			next.forceDie = true;
			return next;
		}
		lib.element.content.FY_chooseText = function chooseTextContent() {
			'step 0';
			if (event.isMine()) {
				if (event.dialog) {
					event.dialog.open();
				}
				else if (event.prompt) {
					event.dialog = ui.create.dialog(event.prompt);
					if (event.prompt2) {
						event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
					}
				}
				event.result = {}
				const div = document.createElement('div');
				const input = div.appendChild(document.createElement('input'));
				input.style.background = 'while';
				input.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=50,finishOpacity=40)";
				input.style.opacity = "1"
				input.style.width = '100%';
				input.style.fontSize = '20px';
				input.style.textAlign = 'center';
				input.style.color = '#e328b7';
				input.addEventListener('keydown', e => e.stopPropagation());
				input.addEventListener('keyup', e => e.stopPropagation());
				input.placeholder = '请在此输入文本';
				input.setAttribute('maxlength', event.max);
				event.dialog.add(div);
				game.pause();
				game.countChoose();
				event.choosing = true;
				var button = ui.create.control('确定', () => {
					if (event.filterText) {
						if (typeof event.filterText == 'function') {
							event.filterText = event.filterText()
						}
						if (!event.filterText.contains(input.value)) {
							return alert('您输入的内容不合要求')
						}
					}
					event.result.bool = true
					event.result.text = input.value ? input.value : ''
					doClose()
				});
				if (!event.forced) {
					var cancel = ui.create.control('取消', () => {
						event.result.bool = false
						doClose()
					});
				}
				event.switchToAuto = () => {
					event.result = 'ai';
					doClose()
				};
				const doClose = () => {
					button.remove();
					if (cancel) cancel.remove();
					game.resume();
				}
			} else if (event.isOnline()) {
				event.send();
			} else {
				event.result = 'ai';
			}
			'step 1';
			if (event.result == 'ai') {
				if (event.ai) {
					event.value = event.ai(event.getParent(), player);
				}
				event.result = {}
				event.result.bool = (event.value != -1 || event.forced)
				if (event.result.bool) event.result.text = event.value
			}
			_status.imchoosing = false;
			event.choosing = false;
			if (event.dialog) event.dialog.close();
			event.resume();
		}
		//-------------夜白很愤怒！
		game.YB_createCard = function (name, suit, number, nature, tag) {
			if (typeof name == 'object') {
				nature = name.nature;
				number = name.number;
				suit = name.suit;
				name = name.name;
			}
			if (typeof name != 'string') {
				name = 'sha';
			}
			var noclick = false;
			if (suit == 'noclick') {
				noclick = true;
				suit = null;
			}
			if (!suit && lib.card[name].cardcolor) {
				suit = lib.card[name].cardcolor;
			}
			if (!nature && lib.card[name].cardnature) {
				nature = lib.card[name].cardnature;
			}
			if (typeof suit != 'string') {
				suit = ['heart', 'diamond', 'club', 'spade'].randomGet();
			}
			else if (suit == 'black') {
				suit = Math.random() < 0.5 ? 'club' : 'spade';
			}
			else if (suit == 'red') {
				suit = Math.random() < 0.5 ? 'diamond' : 'heart';
			}
			if (typeof number != 'number' && typeof number != 'string') {
				number = Math.ceil(Math.random() * 13);
			}
			var card;
			if (noclick) {
				card = ui.create.card(ui.special, 'noclick', true);
			}
			else {
				card = ui.create.card(ui.special);
			}
			card.storage.vanish = true;
			return card.init([suit, number, name, nature, tag]);
		}
		get.YB_tag = function(card){
			var tags=[];
			if(!_status.cardtag){
				_status.cardtag={};
			}
			for(var m in _status.cardtag){
				if(_status.cardtag[m].contains(card.cardid)){
					tags.add(m);
				}
			}
			return tags;
		}
		//--------函数演示，定向火焰伤害
		//--------未知bug，禁止使用
		// lib.element.player.YB_toFire=function(targets,numb){
		// if(numb&&typeof numb=='string')var numa=numb;
		// else {
		// var num=(numb||1);
		// }
		// if(typeof targets=='string'&&targets.length){
		// for(var i=0;i<targets.length;i++){targets[i].damage('fire',(numa[i]||num),this)}
		// }
		// else targets.damage('fire',num,this)
		// }
		// //--------函数演示，定向指定伤害
		// lib.element.player.YB_toDamage=function(targets,natures,numb){
		// if(natures&&typeof natures=='string'&&(get.itemtype(natures[0])=='nature'||natures[0]=='recover'||natures[0]=='jueqing'))var nature=natures;
		// else if(!natures||get.itemtype(natures)=='nature'||natures=='revover'||natures=='jueqing'){
		// var naturey=(nature||null);
		// }
		// else {
		// numb=natures;
		// }
		// if(numb&&typeof numb=='string')var numa=numb;
		// else {
		// var num=(numb||1);
		// }
		// if(typeof targets=='string'&&targets.length){
		// for(var i=0;i<targets.length;i++){
		// if((nature[i]||naturey)=='recover'){targets[i].recover((numa[i]||num),this)}
		// else if((nature[i]||naturey)=='jueqing')targets[i].loseHp((numa[i]||num))
		// else targets[i].damage((nature[i]||naturey),(numa[i]||num),this)
		// }
		// }
		// else {
		// if((nature[0]||naturey)=='recover'){targets.recover((numa[0]||num),this)}
		// else if((nature[0]||naturey)=='jueqing')targets.loseHp((numa[0]||num))
		// else targets.damage((nature[0]||naturey),(numa[0]||num),this)
		// }
		// }
		// //--------魏武怒焰
		// lib.skill.YBSL_weiwunuyan={
		// mark:true,
		// marktext:'焰',
		// intro:{
		// name:'魏武怒焰',
		// content:'mark',
		// },
		// }
		// //--------清退（清除其他角色的怒焰）（单填true,或false则各流失一点，填false+true则根据标记数流失）
		// //--------清退（我是个sb）（不填则仅移除，填false则流失1，填true则根据标记数流失）
		// lib.element.player.YB_qingtui=function(str){
		// var player=this;
		// game.countPlayer(function(current){
		// var list=[];
		// if(current!=player&&current.hasMark('YBSL_weiwunuyan')){
		// list.push(current);
		// }
		// player.line(list,'thunder')
		// for (var i of list){
		// i.YB_yinbaofire(str);
		// }
		// })
		// }
		// //-----------------引爆输入的单体角色的魏武怒焰
		// lib.element.player.YB_yinbaofire=function(str){
		// var target=this;
		// if(target.hasMark('YBSL_weiwunuyan')){
		// if(str&&typeof str=='number'){
		// var num=target.storage.YBSL_weiwunuyan;
		// target.removeMark('YBSL_weiwunuyan',num);
		// target.loseHp(str);
		// }
		// else if(str){
		// var next=game.createEvent('YB_qingtui');
		// next.i=target;
		// next.numb=target.storage.YBSL_weiwunuyan;
		// next.setContent(function(){
		// event.i.removeMark('YBSL_weiwunuyan',event.numb);
		// event.i.loseHp(event.numb);
		// });
		// }
		// else{
		// var num=target.storage.YBSL_weiwunuyan;
		// target.removeMark('YBSL_weiwunuyan',num);
		// }
		// }
		// }
		// //-------------结阵相关
		// _status.yb_jiezhenPlayers={}//此集合记录所有阵列及其成员
		// _status.yb_zhenyanPlayers={}//此集合记录所有阵列的阵眼
		// //判断输入的角色是否已加入阵列，若为是则输出角色所处阵列，否则输出true
		// get.YB_jiezhen=function(player){//-----------二级
		// var list=_status.yb_jiezhenPlayers;
		// for(var i in list){
		// if(i&&list[i].contains(player)){
		// return i;
		// }
		// }
		// return true;
		// }
		// //判断输入的角色是否为阵眼，若为否则输出阵眼序号，否则输出true
		// get.YB_zhenyan=function(player){//-----------三级
		// if(get.YB_jiezhen(player)==true)return false;
		// var list=_status.yb_jiezhenPlayers;
		// var list2=_status.yb_zhenyanPlayers;
		// for(var i in list){
		// if(i&&list[i].contains(player)){
		// var k=i;
		// }
		// }
		// var p=list2[k];
		// if(list[k][p]==player)return true;
		// return p;
		// }
		// //判断输入角色所在阵的阵眼
		// get.YB_zhenyan2=function(player){//-----------二级
		// var list=_status.yb_jiezhenPlayers;
		// var list2=_status.yb_zhenyanPlayers;
		// for(var i in list){
		// if(i&&list[i].contains(player)){
		// var k=i;
		// }
		// }
		// var p=list2[k];
		// return list[k][p];
		// }
		// //输出结阵成员
		// get.YB_jiezhenPlayers=function(str){//-----------二级
		// var list=_status.yb_jiezhenPlayers[str];
		// var list2=[];
		// if(list.length){
		// for (var i=0;i<list.length;i++){
		// list2.push(list[i].name);
		// }
		// }
		// return list2;
		// }
		// //输出结阵成员卡牌
		// get.YB_jiezhenPlayers2=function(str){//-----------二级
		// var list=_status.yb_jiezhenPlayers[str];
		// var list2=[];
		// if(list.length){
		// for (var i=0;i<list.length;i++){
		// list2.push(list[i]);
		// }
		// }
		// return list2;
		// }
		// //获取输入角色在所处阵列的序号
		// get.YB_jiezhen_num=function(player){//-----------二级
		// var list=_status.yb_jiezhenPlayers;
		// var list2=_status.yb_zhenyanPlayers;
		// for(var i in list){
		// if(i&&list[i].contains(player)){
		// var k=i;
		// }
		// }
		// for(var x=0;x<list[k].length;x++){
		// if(list[k][x]==player)return x;
		// }
		// }
		// //判断输入的两名角色是否在同一阵列
		// get.YB_zhenlie=function(player,target){//-----------三级
		// var x=get.YB_jiezhen(player);
		// var y=get.YB_jiezhen(target);
		// if(x!=true&&y!=true&&x==y)return true;
		// return false;
		// }
		// //一行代码让输入的角色结阵，不输入阵名则随机用一个武将技能翻译作为阵名
		// lib.element.player.YB_jiezhen=function(ii,str){//-----------三级
		// var player=this;
		// // 'step 0'
		// if(get.YB_jiezhen(player)!=true) return;
		// var list5=[];
		// list5.push(player);
		// for(var k of ii){
		// if(get.YB_jiezhen(k)!=true) return;
		// list5.push(k);
		// }
		// if(!str){
		// var list=[],skills=[];
		// for(var i in lib.character){
		// list.push(i);
		// }
		// for(var i of list){
		// for(var j of lib.character[i][3]){
		// var skill=lib.skill[j];
		// if(!skill) continue;
		// for(var ab in _status.yb_jiezhenPlayers){
		// if(get.translation(j)!=ab)skills.add(j);
		// }
		// skills.add(j);
		// }
		// }
		// var list6=skills.randomSort()
		// var str=get.translation(list6[0]);
		// }
		// // 'step 1'
		// _status.yb_jiezhenPlayers[str]=list5;
		// for(var z of list5){
		// if(get.itemtype(z)=='player')z.markSkill('_ybsc_jiezhen');
		// }
		// var list6=[];
		// for(var st=1;st<list5.length;st++){
		// list6.push(list5[st])
		// }
		// game.log(player,'与',list6,'结成了'+str+'阵，阵眼是',player)
		// _status.yb_zhenyanPlayers[str]='0';
		// }
		// //解除阵列
		// lib.element.player.YB_jiezhen2=function(str){//-----------三级
		// if(!str)var str=get.YB_jiezhen(this);
		// if(str!=true){
		// var list=_status.yb_jiezhenPlayers[str];
		// for (var k of list){
		// k.unmarkSkill('_ybsc_jiezhen');
		// }
		// game.log(this,'解除了'+str+'阵')
		// delete _status.yb_jiezhenPlayers[str];
		// delete _status.yb_zhenyanPlayers[str];
		// }
		// }
		// //换阵眼
		// lib.element.player.YB_zhenyan=function(str){//-----------四级
		// if(!str)event.str=get.YB_jiezhen(this);
		// if(str!=true){
		// if(get.YB_zhenyan(this)!=true){
		// game.log(this,'将'+str+'阵的阵眼改成了',this,'。')
		// _status.yb_zhenyanPlayers[str]=get.YB_jiezhen_num(this);
		// }
		// }
		// }
		// //退出阵型
		// lib.element.player.YB_tuichu=function(ctrl){//-----------四级
		// var list=get.YB_jiezhen(this);
		// if(list==true)return;
		// if(get.YB_zhenyan(this)==true)return;
		// var list2=_status.yb_jiezhenPlayers[list];
		// if(ctrl&&ctrl==true)var str=this+'被踢出了'+list+'阵';
		// else var str=this+'退出了'+list+'阵';
		// _status.yb_jiezhenPlayers[list].remove(this);
		// this.unmarkSkill('_ybsc_jiezhen');
		// game.log(str)
		// }
		// //加入阵型
		// lib.element.player.YB_jiaru=function(str2){//-----------三级
		// var list=get.YB_jiezhen(this);
		// if(list!=true)return;
		// if(!str2)return;
		// var str=this+'加入了'+str2+'阵';
		// _status.yb_jiezhenPlayers[str2].push(this);
		// this.markSkill('_ybsc_jiezhen');
		// game.log(str)
		// }
		// //结阵相关技能
		// lib.skill.YBSL_jiezhen={
		// enable:'phaseUse',
		// usable:1,
		// delay:false,
		// charlotte:true,
		// prompt:function (player){
		// if(get.YB_jiezhen(player)==true)return '请选择两名其他角色，与他们结成阵列。';
		// return '是否将阵眼转移给自己？';
		// },
		// filter:function(event,player){
		// if(get.YB_jiezhen(player)==true)return game.countPlayer(function(current){
		// return current!=player&&get.YB_jiezhen(current)==true;
		// })>=1;
		// return get.YB_zhenyan(player)!=true;
		// },
		// selectTarget:function(event,player){
		// // var player=_status.event.player;
		// if(get.YB_jiezhen(player)!=true&&get.YB_zhenyan(player)!=true)return [0,0];
		// return [1,2];
		// },
		// filterTarget:function(card,player,target){
		// if(get.YB_jiezhen(player)!=true&&get.YB_zhenyan(player)!=true)return false;
		// return (target!=player&&get.YB_jiezhen(target)==true);
		// },
		// multiline:true,
		// multitarget:true,
		// content:function(){
		// 'step 0'
		// if(targets){
		// player.FY_chooseText().set('prompt','请为此阵命名。不输入直接确定会出错，点取消则会随机取名。');
		// event.list=[];
		// for(var i of targets){
		// event.list.push(i);
		// }
		// }
		// else {
		// player.YB_zhenyan();
		// event.finish();
		// }
		// 'step 1'
		// if(result.text=='')player.YB_jiezhen(event.list);
		// else player.YB_jiezhen(event.list,result.text);
		// },
		// ai:{
		// order:function(){
		// var player=_status.event.player;
		// return 8;
		// },
		// expose:0.1,
		// result:{
		// player:1,
		// target:1,
		// }
		// },
		// }
		// lib.skill._ybsc_jiezhen={
		// enable:'phaseUse',
		// usable:1,
		// delay:false,
		// prompt:function (player){
		// return '是否解除你所处的阵列？';
		// },
		// filter:function(event,player){
		// if(get.YB_jiezhen(player)==true)return false;
		// return true;
		// },
		// content:function(){
		// var str=get.YB_jiezhen(player);
		// player.YB_jiezhen2(str);
		// },
		// // mark:true,
		// marktext:'阵',
		// intro:{
		// name:'结阵',
		// content:function(event,player,storage,name,skill){
		// var list=get.YB_jiezhen(player);
		// var list2=get.YB_zhenyan2(player);
		// return list+'阵，成员包括'+get.YB_tobo3(get.YB_jiezhenPlayers(list))+'，阵眼是'+get.translation(list2.name);
		// }
		// },
		// ai:{
		// order:function(){
		// var player=_status.event.player;
		// return 8;
		// },
		// expose:0.1,
		// result:{
		// player:function(player,target){
		// var xx=get.YB_jiezhen(player);
		// var list=_status.yb_jiezhenPlayers[xx];
		// if(list.length){
		// for(var i of list){
		// if(i!=player){
		// var att=get.attitude(player,i);
		// if(att<0)return 10;
		// }
		// }
		// }
		// return 0;
		// }
		// }
		// },
		// }
		// lib.skill._ybsc_jiezhen2={
		// trigger:{
		// player:'damageBegin4',
		// },
		// direct:true,
		// firstDo:true,
		// delay:false,
		// filter:function(event,player){
		// if(get.YB_zhenlie(event.player,event.source))return true;
		// return false;
		// },
		// content:function(){
		// game.log(trigger.source,'触发了阵内伤害豁免，防止了对',player,'的伤害。')
		// trigger.cancel();
		// },
		// ai:{
		// expose:0.1,
		// effect:{
		// target:function(card,player,target){
		// if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
		// if(get.YB_zhenlie(player,target)==true)return 0;
		// return;
		// }
		// }
		// },
		// }
		// lib.skill._ybsc_jiezhen3={
		// trigger:{
		// global:'die',
		// },
		// direct:true,
		// firstDo:true,
		// delay:false,
		// filter:function(event,player){
		// if(get.YB_jiezhen(event.player)==true)return false;
		// if(get.YB_zhenyan(event.player)==true){return true;}
		// else{
		// var tar=get.YB_jiezhen(event.player);
		// var list=get.YB_jiezhenPlayers2(tar);
		// list.remove(list[get.YB_zhenyan(event.player)]);
		// for(var i of list){
		// if(i.isAlive())return false;
		// }
		// return true;
		// }
		// },
		// content:function(){
		// var str=get.YB_jiezhen(trigger.player);
		// var list=_status.yb_jiezhenPlayers[str];
		// for(var k of list){
		// k.unmarkSkill('_ybsc_jiezhen');
		// }
		// game.log(this,'阵亡，'+str+'阵被迫解除。')
		// delete _status.yb_jiezhenPlayers[str];
		// delete _status.yb_zhenyanPlayers[str];
		// },
		// ai:{
		// expose:0.1,
		// },
		// }
		get.YB_chongzhijiList = function (player, skill) {
			if (!player.storage[skill + '_chongzhijiList']) {
				player.storage[skill + '_chongzhijiList'] = [];
				if (lib.skill[skill].chongzhijiList) player.storage[skill + '_chongzhijiList'] = lib.skill[skill].chongzhijiList;
			}
			return player.storage[skill + '_chongzhijiList'];
		}
		get.YB_chongzhiList = function (player, skill) {
			if (!player.storage[skill] || player.storage[skill].length == 0) {
				player.storage[skill] = [];
				if (player.storage[skill + '_chongzhijiList']) {
					for (var i = 0; i < player.storage[skill + '_chongzhijiList'].length; i++) {
						player.storage[skill].add(player.storage[skill + '_chongzhijiList'][i]);
					}
				}
			}
			return player.storage[skill];
		}
		//-------------
		/**
		 * 判断该角色一次性失去多少张手牌会不再是手牌数最多
		 * @param {player} target 
		 */
		get.YB_cardMaxLose = function(target){
			// if(!target.isMaxHandcard(true))var num=1;
			// else{
				var players=game.filterPlayer(c=>c!=target);
				var numb=0;
				for(var i of players){
					if(i.countCards('h')>numb)numb=i.countCards('h')
				}
			return target.countCards('h')+1-numb;
			// }
		}
		lib.element.player.YB_recover = function(num){
			var next = game.createEvent('YB_recover');
			next.player=this;
			next.num=num;
			next.setContent('YB_recover');
			return next;
		}
		lib.element.content.YB_recover = function(){
			var n1=num,n2=player.getDamagedHp();
			if(n1>n2){
				var n3=n1-n2;
				player.recover(n2);
				player.gainMaxHp(n3);
			}
			else{
				player.recover(n1);
			}
		}
		// game.YB_yuanfenText= function(player,bool){
		// 	if(player&&player.name1&&lib.characterLightext&&lib.characterLightext[player.name1]&&lib.characterLightext[player.name1](player)){
		// 		var ybstr = lib.characterLightext[player.name1](player)[lib.characterLightext[player.name1](player).length-1]
		// 		if(bool!=false)ui.create.div(".xcaption", "武将缘分", rightPane.firstChild);
		// 		ui.create.div(".xskill", ybstr, rightPane.firstChild)
		// 		// ui.create.div(".xskill","<div data-color>" + ybstr+ "</div>", rightPane.firstChild)
		// 	}
		// };
		//-------------
		/**
		 * 交换主副将函数
		 * @returns 
		 */
		lib.element.player.YB_exchange = function(){
			var next = game.createEvent('YB_exchange');
			next.player=this;
			next.setContent(function(){
				'step 0'
				game.log(player,'交换了主副将')
				if(player.name2==undefined){
					player.changeCharacter(player.name1);
				}
				else{
					player.changeCharacter([player.name2, player.name1]);
					player.node.avatar.setBackground(player.name2, "character");
					player.node.name.innerHTML = get.slimName(player.name2);
				}
			});
			return next;
		}
	}
	{//----------自定义函数2
		
	}
}