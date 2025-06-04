import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

/** @type { importCharacterConfig['skill'] } */
const skill = {
	//名曹操
	ybmjz_jianxiong:{
		audio:'rejianxiong',
		trigger: {
			player: "damageEnd",
		},
		content: function () {
			"step 0";
			if (get.itemtype(trigger.cards) == "cards" && get.position(trigger.cards[0], true) == "o") {
				player.gain(trigger.cards, "gain2");
			}
			var num=player.storage.ybmjz_jianxiong_gai?player.getDamagedHp():trigger.num;
			if(num<1)num=1;
			player.draw("nodelay",num);
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target: function (card, player, target) {
					if (player.hasSkillTag("jueqing", false, target)) return [1, -1];
					if (get.tag(card, "damage") && player != target) {
						var cards = card.cards,
							evt = _status.event;
						if (evt.player == target && card.name == "damage" && evt.getParent().type == "card") cards = evt.getParent().cards.filterInD();
						if (target.hp <= 1) return;
						if (get.itemtype(cards) != "cards") return;
						for (var i of cards) {
							if (get.name(i, target) == "tao") return [1, 4.5];
						}
						if (get.value(cards, target) >= 7 + target.getDamagedHp()) return [1, 2.5];
						return [1, 0.6];
					}
				},
			},
		},
		derivation:'ybmjz_jianxiong_gai',
		group:['ybmjz_jianxiong_gaix','ybmjz_jianxiong_gai'],
		subSkill:{
			gai:{

			},
			gaix:{
				name:'奸雄',
				mark:true,
				intro:{
					content:function(storage,player,skill){
						if(player.storage.ybmjz_jianxiong_gaix.length){
							var list = player.storage.ybmjz_jianxiong_gaix.sort((a,b)=>a-b);
							var str = '';
							for(var i of list){
								if(i!=list[0])str += '、';
								str += i;
							}
							return str;
						}
						return '毫无野心。'
					},
				},
				init:function(player){
					if(!player.storage.ybmjz_jianxiong_gaix)player.storage.ybmjz_jianxiong_gaix=[];
				},
				audio:'ybmjz_jianxiong',
				trigger:{
					player:'gainEnd',
				},
				filter:function(event,player){
					// game.log('event.skill：',event.skill)
					// game.log('event.getParent(1)：',event.getParent(1))
					// game.log('event.getParent(2)：',event.getParent(2))
					// game.log('event.getParent(2).name：',event.getParent(2).name)
					// game.log('event.getParent(2).skill：',event.getParent(2).skill)
					// game.log('event.getParent(3)：',event.getParent(3))
					// game.log('event.getParent(4)：',event.getParent(4))
					// game.log('event.getParent(5)：',event.getParent(5))
					if(player.storage.ybmjz_jianxiong_gai)return false;
					if(event.getParent(2)&&event.getParent(2).name&&(event.getParent(2).name=='ybmjz_jianxiong'||event.getParent(2).skill=='ybmjz_jianxiong'))return true;
					return false;
				},
				check:()=>true,
				content:function*(event,map){
					let trigger=map.trigger,player=map.player;
					let cards = trigger.cards;
					yield player.showCards(cards);
					if(!player.storage.ybmjz_jianxiong_gaix)yield player.storage.ybmjz_jianxiong_gaix=[];
					for(var i of cards){
						if(!player.storage.ybmjz_jianxiong_gaix.includes(get.number(i))){
							yield player.markSkill('ybmjz_jianxiong_gaix');
							yield player.storage.ybmjz_jianxiong_gaix.push(get.number(i));
						}
					}
					if(player.storage.ybmjz_jianxiong_gaix.length>=9){
						yield player.gainMaxHp();
						let skills = player.getStockSkills(true, true).filter(skill => {
							if (player.hasSkill(skill)) return false;
							let info = get.info(skill);
							return info && info.zhuSkill;
						});
						if (skills.length) yield player.addSkills(skills);
						yield player.awakenSkill("ybmjz_jianxiong_gaix");
						yield player.storage.ybmjz_jianxiong_gai=true;
						// yield player.removeSkill("ybmjz_jianxiong_gai");
						
					}
				},
			}
		},
	},
	ybmjz_hujia:{
		// audio:'guixin',
		audio:'rehujia',
		unique: true,
		zhuSkill: true,
		trigger: { player: ["chooseToRespondBefore", "chooseToUseBefore"] },
		filter(event, player) {
			if (event.responded) return false;
			if (player.storage.hujiaing) return false;
			if (!player.hasZhuSkill("ybmjz_hujia")) return false;
			if (!event.filterCard({ name: "shan", isCard: true }, player, event)) return false;
			return game.hasPlayer(current => current != player && current.group == "wei");
		},
		check(event, player) {
			if (get.damageEffect(player, event.player, player) >= 0) return false;
			return true;
		},
		async content(event, trigger, player) {
			while (true) {
				let bool;
				if (!event.current) event.current = player.next;
				if (event.current == player) return;
				else if (event.current.group == "wei") {
					if ((event.current == game.me && !_status.auto) || get.attitude(event.current, player) > 2 || event.current.isOnline()) {
						player.storage.hujiaing = true;
						const next = event.current.chooseToRespond("是否替" + get.translation(player) + "打出一张闪？", { name: "shan" });
						next.set("ai", () => {
							const event = _status.event;
							return get.attitude(event.player, event.source) - 2;
						});
						next.set("skillwarn", "替" + get.translation(player) + "打出一张闪");
						next.autochoose = lib.filter.autoRespondShan;
						next.set("source", player);
						bool = await next.forResultBool();
					}
				}
				player.storage.hujiaing = false;
				if (bool) {
					trigger.result = { bool: true, card: { name: "shan", isCard: true } };
					trigger.responded = true;
					trigger.animate = false;
					if (typeof event.current.ai.shown == "number" && event.current.ai.shown < 0.95) {
						event.current.ai.shown += 0.3;
						if (event.current.ai.shown > 0.95) event.current.ai.shown = 0.95;
					}
					return;
				} else {
					event.current = event.current.next;
				}
			}
		},
		ai: {
			respondShan: true,
			skillTagFilter(player) {
				if (player.storage.hujiaing) return false;
				if (!player.hasZhuSkill("ybmjz_hujia")) return false;
				return game.hasPlayer(current => current != player && current.group == "wei");
			},
		},
		group:['ybmjz_hujia_txgx','ybmjz_hujia_zhishuo'],
		subSkill:{
			zhishuo:{
				global:'ybmjz_hujia_zgtb',
				mark:true,
				intro: {
					name:'短歌行',
					markcount: "expansion",
					mark: function (dialog, storage, player) {
						if(player.getExpansions("ybmjz_hujia_zhishuo")){
							var cards = player.getExpansions("ybmjz_hujia_zhishuo");
							if(cards)dialog.addAuto(cards);
						}
						// else return "共有" + get.cnNumber(cards.length) + "张牌";
					},
				},

			},
			zgtb:{
				// audio:'guixin',
				audio:'ybmjz_hujia',
				trigger:{
					global:['loseAfter','loseAsyncAfter'],
				},
				filter:function(event,player){
					if(event.type!='discard') return false;
					if(player.group!='wei') return false;
					return event.discarder&&event.discarder==player&&
						game.hasPlayer(function (current) {
						return current.hasSkill("ybmjz_hujia_zhishuo");
					});
				},
				async cost(event, trigger, player){
					var list = game.filterPlayer(function (current) {
						return current.hasSkill("ybmjz_hujia_zhishuo");
					});
					var cards=trigger.cards;
					var str = '是否将'+get.translation(cards)+'置于'+get.translation(list);
					if (list.length > 1) str += "其中一人";
					str+='的武将牌上';
					event.result = await player.chooseTarget(function(card,player,target){
						return target.hasSkill("ybmjz_hujia_zhishuo");
					})
						.set('prompt',str)
						.set('ai',function(target){
							return get.attitude(player,target)>5;
						})
						.forResult();
				},
				content(){
					player.logSkill("ybmjz_hujia_zhishuo",event.targets[0]);
					event.targets[0].addToExpansion(trigger.cards, "giveAuto", event.targets[0]).gaintag.add("ybmjz_hujia_zhishuo");
				}
			},
			txgx:{
				audio:'ybmjz_hujia',
				trigger: { global: ["useCard", "respond"] },
				filter: function (event, player) {
					var cards = player.getExpansions("ybmjz_hujia_zhishuo");
					var cards2=event.card;
					var suits=get.YB_suit(cards);
					return event.player.group == "wei" && event.player.isIn()&&get.suit(cards2)&&suits.includes(get.suit(cards2));
				},
				logTarget(event, player) {
					return event.player;
				},
				async cost(event, trigger, player){
					var cards = player.getExpansions("ybmjz_hujia_zhishuo");
					var cards2=trigger.card;
					event.result = await player.chooseCardButton(cards)
						.set('filterButton',function(i){
							return get.suit(i)==get.suit(cards2)
						})
						.set('ai',function(k){
							if(get.attitude(player,trigger.player)>5)return get.value(k);
							return false;
						})
						.set('prompt',get.translation(trigger.player)+'，赏？').forResult();
					if (event.result.bool) {
						event.result.cards = event.result.links;
					}
				},
				content: function *(event,map) {
					let trigger=map.trigger,player=map.player;
					var cardx=event.cards;
					yield player.give(cardx,trigger.player);
					yield player.draw();
				},
				
			},
		}
	},
	ybmjz_zhishuo:{
		audio:'ybmjz_hujia',
		unique: true,
		zhuSkill: true,
		group:['ybmjz_zhishuo_txgx','ybmjz_hujia_zhishuo','ybmjz_zhishuo_damage'],
		init:function(player){
			var card=game.createCard('zhungangshuo','spade',5,null);
			player.equip(card);
		},
		subSkill:{
			txgx:{
				audio:'ybmjz_hujia',
				trigger: { global: ["useCard", "respond"] },
				filter: function (event, player) {
					var cards = Array.from(player.getExpansions("ybmjz_hujia_zhishuo"));
					var cards2=event.card;
					var suits=get.YB_suit(cards);
					var cards3=cards.filter(z=>get.suit(z)==get.suit(cards2));
					return event.player.group == "wei" && event.player.isIn()&&get.suit(cards2)&&suits.includes(get.suit(cards2));
				},
				direct:true,
				content: function *(event,map) {
					let trigger=map.trigger,player=map.player;
					var cards = Array.from(player.getExpansions("ybmjz_hujia_zhishuo"));
					var cards2=trigger.card;
					var cards3=cards.filter(z=>get.suit(z)==get.suit(cards2));
					yield player.chooseUseTarget(
						cards3,
						get.prompt('ybmjz_zhishuo_txgx'),
						{
							name:'sha',
							nature:null,
							isCard:true,
							YB_zhishuo:true,
							card:cards3,
						},
					).set('logSkill','ybmjz_zhishuo_txgx').set('addCount',false)
				},
			},
			damage:{
				audio:'ybmjz_hujia',
				direct:true,
				// popup:true,
				character:true,
				trigger:{
					player:'useCard',
					global:'damageEnd',
				},
				filter:function(event,player,name){
					if(name=='damageEnd')return event.card&&event.card.YB_zhishuo&&event.source==player&&event.player.isIn();
					else return event.card.YB_zhishuo;
				},
				*content(event,map){
					let trigger=map.trigger,player=map.player;
					if(event.triggername=='useCard'){
						yield trigger.baseDamage=trigger.cards.length;
						yield player.logSkill('ybmjz_zhishuo_txgx');
					}
					else {
						var result = yield player.chooseControl('ok2','cancel2')
							.set('ai',function(con){
								if(get.attitude(player,trigger.player)>5)return con=='ok2';
								return con=='cancel2';
							})
							.set('prompt','是否令'+get.translation(trigger.player)+'回复'+trigger.num+'点体力？');
						if(result&&result.control=='ok2'){
							yield trigger.player.recover(trigger.num);
							yield player.logSkill('ybmjz_zhishuo_txgx');
						}
					}

				}
			}
		}
	},
	//名司马懿
	ybmjz_dayuan:{
		trigger: {
			global: "judge",
		},
		audio: true,
		direct: true,
		// lastDo: true,
		content: function () {
			"step 0";
			var card = trigger.player.judging[0];
			var judge0 = trigger.judge(card);
			var judge1 = 0;
			var choice = "cancel2";
			event.suitchoice = "cancel2";
			var attitude = get.attitude(player, trigger.player);
			var list = [];
			event.suitx = ["heart", "diamond", "club", "spade"];
			for (var x = 0; x < 4; x++) {
				for (var i = 1; i < 14; i++) {
					list.add(i);
					var judge2 =
						(trigger.judge({
							name: get.name(card),
							suit: event.suitx[x],
							number: i,
							nature: get.nature(card),
						}) -
							judge0) *
						attitude;
					if (judge2 > judge1) {
						choice = i;
						event.suitchoice = event.suitx[x];
						judge1 = judge2;
					}
				}
			}
			list.push("cancel2");
			event.suitx.push("cancel2");
			player
				.chooseControl(list)
				.set("ai", function () {
					return _status.event.choice;
				})
				.set("choice", choice).prompt = get.prompt2(event.name);
			"step 1";
			if (result.control != "cancel2") {
				if (!event.logged) {
					event.logged = true;
					player.logSkill(event.name, trigger.player);
				}
				game.log(trigger.player, "判定结果点数为", "#g" + result.control);
				player.popup(result.control, "fire");
				if (!trigger.fixedResult) trigger.fixedResult = {};
				trigger.fixedResult.number = result.control;
			}
			player
				.chooseControl(event.suitx)
				.set("ai", function () {
					return _status.event.choice;
				})
				.set("choice", event.suitchoice).prompt = get.prompt2(event.name);
			"step 2";
			if (result.control != "cancel2") {
				if (!event.logged) {
					event.logged = true;
					player.logSkill(event.name, trigger.player);
				}
				game.log(trigger.player, "判定结果花色为", "#g" + result.control);
				player.popup(result.control, "fire");
				if (!trigger.fixedResult) trigger.fixedResult = {};
				trigger.fixedResult.suit = result.control;
				if (result.control == "club" || result.control == "spade") {
					trigger.fixedResult.color = "black";
				} else if (result.control == "heart" || result.control == "diamond") {
					trigger.fixedResult.color = "red";
				}
			}
		},
	},
	ybmjz_fankui:{
		audio:'refankui',
		trigger: { player: "damageEnd" },
		filter: function (event, player) {
			return event.source && event.source.countGainableCards(player, event.source != player ? "he" : "e") && event.num > 0;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.choosePlayerCard(get.prompt("refankui", trigger.source), trigger.source, trigger.source != player ? "he" : "e")
				.set("ai", button => {
					let val = get.buttonValue(button);
					if (get.event("att") > 0) return 1 - val;
					return val;
				})
				.set("att", get.attitude(player, trigger.source))
				.forResult();
		},
		logTarget: "source",
		getIndex(event, player) {
			return event.num;
		},
		*content(event,map){
			let player=map.player,trigger=map.trigger;
			yield player.gain(event.cards, trigger.source, "giveAuto", "bySelf");
			if(player.countCards('h')<trigger.source.countCards('h')&&trigger.source.countGainableCards(player, trigger.source != player ? "he" : "e")){
				var relu=yield  player
					.choosePlayerCard(get.prompt("refankui", trigger.source), trigger.source, trigger.source != player ? "he" : "e")
					.set("ai", button => {
						let val = get.buttonValue(button);
						if (get.event("att") > 0) return 1 - val;
						return val;
					})
					.set("att", get.attitude(player, trigger.source));
				if(relu.cards)yield player.gain(event.cards, trigger.source, "giveAuto", "bySelf");
			}
		},
		ai: {
			maixie_defend: true,
			effect: {
				target: function (card, player, target) {
					if (player.countCards("he") > 1 && get.tag(card, "damage")) {
						if (player.hasSkillTag("jueqing", false, target)) return [1, -1.5];
						if (get.attitude(target, player) < 0) return [1, 1];
					}
				},
			},
		},
	},
	ybmjz_fankuix:{
		audio:'refankui',
		trigger: { player: "damageEnd" },
		filter: function (event, player) {
			return game.filterPlayer(k=>k!=player&&k.countGainableCards(player,"he"));
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseTarget(function(card,player,target){
				return target!=player&&target.countGainableCards(player,"he")
			})
			// .set("att", get.attitude(player, trigger.source))
			.set('ai',function(target){
				var att=get.attitude(_status.event.player,target);
				if(trigger.source&&trigger.source==target&&att<0)att-=3; 
				return -att;
			})
			.forResult();
		},
		// logTarget: "source",
		getIndex(event, player) {
			return event.num;
		},
		*content(event,map){
			let player=map.player,trigger=map.trigger;
			let target = event.targets[0];
			var result = yield player
				.choosePlayerCard(get.prompt("ybmjz_fankuix", target),true, target,"he")
				.set("ai", button => {
					let val = get.buttonValue(button);
					if (get.event("att") > 0) return 1 - val;
					return val;
				})
				.set("att", get.attitude(player, target));
			if(result.cards){
				yield player.gain(result.cards, target);
				if(trigger.source&&trigger.source!=target||!trigger.source){
					player.chooseToDiscard('he');
				}
			}
		},
		ai: {
			maixie_defend: true,
			effect: {
				target: function (card, player, target) {
					if (player.countCards("he") > 1 && get.tag(card, "damage")) {
						if (player.hasSkillTag("jueqing", false, target)) return [1, -1.5];
						if (get.attitude(target, player) < 0) return [1, 1];
					}
				},
			},
		},
	},
	ybmjz_guicai:{
		audio:'reguicai',
		trigger: { global: "judge" },
		direct: true,
		filter: function (event, player) {
			return player.countCards("hes") > 0;
		},
		content: function () {
			"step 0";
			player
				.chooseCard(get.translation(trigger.player) + "的" + (trigger.judgestr || "") + "判定为" + get.translation(trigger.player.judging[0]) + "，" + get.prompt("ybmjz_guicai"), "hes", function (card) {
					var player = _status.event.player;
					var mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
					if (mod2 != "unchanged") return mod2;
					var mod = game.checkMod(card, player, "unchanged", "cardRespondable", player);
					if (mod != "unchanged") return mod;
					return true;
				})
				.set("ai", function (card) {
					var trigger = _status.event.getTrigger();
					var player = _status.event.player;
					var judging = _status.event.judging;
					var result = trigger.judge(card) - trigger.judge(judging);
					var attitude = get.attitude(player, trigger.player);
					let val = get.value(card);
					if (get.subtype(card) == "equip2") val /= 2;
					else val /= 4;
					if (attitude == 0 || result == 0) return 0;
					if (attitude > 0) {
						return result - val;
					}
					return -result - val;
				})
				.set("judging", trigger.player.judging[0]);
			"step 1";
			if (result.bool) {
				player.respond(result.cards, "ybmjz_guicai", "highlight", "noOrdering");
			} else {
				event.finish();
			}
			"step 2";
			if (result.bool) {
				if (trigger.player.judging[0].clone) {
					trigger.player.judging[0].clone.classList.remove("thrownhighlight");
					game.broadcast(function (card) {
						if (card.clone) {
							card.clone.classList.remove("thrownhighlight");
						}
					}, trigger.player.judging[0]);
					game.addVideo("deletenode", player, get.cardsInfo([trigger.player.judging[0].clone]));
				}
				game.cardsDiscard(trigger.player.judging[0]);
				trigger.player.judging[0] = result.cards[0];
				trigger.orderingCards.addArray(result.cards);
				game.log(trigger.player, "的判定牌改为", result.cards[0]);
				game.delay(2);
				// trigger.noJudgeTrigger=true;
			}
		},
		group:'ybmjz_guicai_draw2',
		subSkill:{
			draw2:{
				audio:'ybmjz_guicai',
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				},
				usable(player){
					return player.getDamagedHp()+1;
				},
				filter: function (event, player, name) {
					if (event.name.indexOf("lose") == 0) {
						if (event.getlx === false || event.position != ui.discardPile) {
							return false;
						}
					} else {
						var evt = event.getParent();
						if (evt.relatedEvent && evt.relatedEvent.name == "useCard") {
							return false;
						}
					}
					return true;
				},
				content(){
					player.draw();
				},
			},
			draw:{
				audio:'ybmjz_guicai',
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				},
				// usable(player){
				// 	return player.getDamagedHp()+1;
				// },
				filter: function (event, player, name) {
					var evt = event.getl(player);
					if (!evt || evt.player!=player||!evt.hs || !evt.hs.length) return false;
					var list2 = [];
					for(var z of event.cards){
						if(/*get.position(z, true) == "o"||*/get.position(z,true)=='d')list2.push(z);
					}
					if(!list2.length)return false;
					if(!player.hasSkill('ybmjz_guicai_2'))return true;
					var list = player.getStorage("ybmjz_guicai_2");
					for (var i of evt.hs) {
						var suit = get.suit(i, player);
						if (!list.includes(suit)) return true;
					}
					return false;
				},
				direct:true,
				content: function () {
					'step 0'
					if(!player.hasSkill('ybmjz_guicai_2'))player.YB_tempy('ybmjz_guicai_2');
					'step 1'
					var list=[];
					var evt = trigger.getl(player);
					var suits = get.copy(player.storage.ybmjz_guicai_2);
					if (evt?.hs?.length){
						var cards=trigger.cards;
						for(var i of cards){
							if((/*get.position(i, true) == "o"||*/get.position(i,true)=='d')&&!suits.includes(get.suit(i)))list.push(get.suit(i));
						}
					}
					event.list=list;
					'step 2'
					if(event.list.length){
						event.suit1=event.list[0];
						player.chooseControl('ok2','cancel2').set('prompt','失去了'+get.translation(event.suit1)+'牌，是否摸一张牌？');
					}
					'step 3'
					event.list.remove(event.suit1);
					if(result.control=='ok2'){
						player.draw();
						player.logSkill('ybmjz_guicai_draw')
						player.storage.ybmjz_guicai_2.push(event.suit1);
						event.list.filter(k=>k!=event.suit1);
					}
					'step 4'
					if(event.list.length)event.goto(2);
				},
			},
			2:{
				charlotte:true,
				onremove:true,
				mark:true,
				init:function(player){
					player.storage.ybmjz_guicai_2=[];
				},
				intro: {
					content: "已因$牌触发过效果",
				},
			}
		}
	},
	//名夏侯惇
	ybmjz_ganglie:{
		audio: 'reganglie',
		trigger: { player: "damageEnd" },
		filter: function (event, player) {
			return event.source != undefined && event.num > 0;
		},
		check: function (event, player) {
			return get.attitude(player, event.source) <= 0;
		},
		logTarget: "source",
		preHidden: true,
		getIndex(event, player) {
			return event.num;
		},
		*content(event,map){
			let player=map.player,trigger=map.trigger;
			var result = yield player.judge(function (card) {
				if (get.color(card) == "red") return 1;
				return 0;
			});
			switch (result.color) {
				case "black":
					if (trigger.source.countCards("he")) {
						yield player.discardPlayerCard(trigger.source, "he", true);
						var relu = yield player.chooseToDiscard('he',function(card){
							return get.color(card)=='black';
						}).set('prompt','是否弃置一张黑色牌，然后再弃置其一张牌？').set('ai',function(card){
							if(trigger.source.countCards("he")&&get.attitude(_status.event.player,trigger.source)<0){
								return 10-get.value(card);
							}
							return 0;
						});
						if(relu.bool&&trigger.source.countCards("he"))yield player.discardPlayerCard(trigger.source, "he", true);
					}
					break;

				case "red":
					if (trigger.source.isIn()) {
						yield trigger.source.damage();
						var relu = yield player.chooseToDiscard('he',function(card){
							return get.color(card)=='red';
						}).set('prompt','是否弃置一张红色牌，然后再对其造成一点伤害？').set('ai',function(card){
							if(trigger.source.countCards("he")&&get.attitude(_status.event.player,trigger.source)<0){
								return 10-get.value(card);
							}
							return 0;
						});
						if(relu.bool&&trigger.source.isIn())yield trigger.source.damage();
					}
					break;
				default:
					break;
			}
		},
		ai: {
			maixie_defend: true,
			expose: 0.4,
		},
		subSkill:{
			mark:{
				mark:true,
				intro:{
					markcount: "expansion",
					mark: function (dialog, storage, player) {
						if(player.getExpansions("ybmjz_ganglie_mark")&&player.getExpansions("ybmjz_ganglie_mark").length){
							var cards = player.getExpansions("ybmjz_ganglie_mark");
							if(cards)dialog.addAuto(cards);
						}
						else return '无';
						// else return "共有" + get.cnNumber(cards.length) + "张牌";
					},
				}
			}
		}
	},
	ybmjz_gangliex:{
		audio: 'reganglie',
		trigger: { player: "damageEnd" },
		filter: function (event, player) {
			return event.source != undefined && event.num > 0;
		},
		check: function (event, player) {
			return get.attitude(player, event.source) <= 0;
		},
		logTarget: "source",
		preHidden: true,
		getIndex(event, player) {
			return event.num;
		},
		*content(event,map){
			let player=map.player,trigger=map.trigger;
			var result = yield player.judge(function (card) {
				if (get.color(card) == "red") return 1;
				return 0;
			});
			switch (result.color) {
				case "black":
					if (trigger.source.countCards("he")) {
						yield player.discardPlayerCard(trigger.source, "he", true);
					}
					break;
				case "red":
					if (trigger.source.isIn()) {
						yield trigger.source.damage();
					}
					break;
				default:
					break;
			}
			if(result.card){
				var relu = yield player.chooseBool('是否将判定牌置于来源的武将牌上？').set('ai',function(){
					var att=get.attitude(_status.event.player,trigger.source);
					if(att<0) return true;
					else return false;
				});
				if(relu.bool){
					player.logSkill('ybmjz_gangliex')
					trigger.source.addToExpansion(result.card, "giveAuto", trigger.source)
						.gaintag.add("ybmjz_ganglie_mark")
					// trigger.trigger('ybmjz_ganglie_card');
					// trigger.player=trigger.source;
				}
			}
		},
		ai: {
			maixie_defend: true,
			expose: 0.4,
		},
		group:'ybmjz_gangliex_next',
		subSkill:{
			next:{
				trigger:{
					global:['loseAfter'],
					source:'damageAfter',
				},
				filter:(event,player,name)=>{
					if(!event.player.getExpansions("ybmjz_ganglie_mark"))return false;
					var cards=event.player.getExpansions("ybmjz_ganglie_mark");
					if(cards.length<0)return false;
					if(name=='loseAfter'){
						if(event.type=='discard')
							return event.discarder&&event.discarder==player&&cards.filter(c=>get.color(c)=='red').length>0;
						return false;
					}
					return event.player.isIn()&&cards.filter(c=>get.color(c)=='black').length>0
				},
				forced:true,
				*content(event,map){
					let player=map.player,trigger=map.trigger;
					yield player.line(trigger.player)
					var cards=trigger.player.getExpansions("ybmjz_ganglie_mark");
					if(event.triggername=='loseAfter'){
						var redcard=cards.filter(c=>get.color(c)=='red');
						if(redcard.length<=1)yield trigger.player.discard(redcard);
						else {
							var relu = yield player.chooseCardButton(cards,true).set('filterButton',function(i){
								return get.color(i)=='red'
							})
							if(relu.links)yield trigger.player.discard(relu.links[0]);
						}
						yield trigger.player.damage();
					}
					else {
						var blackcard=cards.filter(c=>get.color(c)=='black');
						if(blackcard.length<=1)yield trigger.player.discard(blackcard);
						else {
							var relu = yield player.chooseCardButton(cards,true).set('filterButton',function(i){
								return get.color(i)=='black'
							})
							if(relu.links)yield trigger.player.discard(relu.links[0]);
						}
						yield player.discardPlayerCard(trigger.player, "he", true);
					}
				}
			},
		}
	},
	ybmjz_gangliey:{
		audio: 'reganglie',
		trigger: { player: "damageEnd" },
		filter: function (event, player) {
			return event.source != undefined && event.num > 0;
		},
		check: function (event, player) {
			return get.attitude(player, event.source) <= 0;
		},
		logTarget: "source",
		preHidden: true,
		getIndex(event, player) {
			return event.num;
		},
		*content(event,map){
			let player=map.player,trigger=map.trigger;
			var result = yield player.judge(function (card) {
				if (get.color(card) == "red") return 1;
				return 0;
			});
			switch (result.color) {
				case "black":
					if (trigger.source.countCards("he")) {
						yield player.discardPlayerCard(trigger.source, "he", true);
					}
					break;
				case "red":
					if (trigger.source.isIn()) {
						yield trigger.source.damage();
					}
					break;
				default:
					break;
			}
			if(result.card){
				var relu = yield player.chooseBool('是否将判定牌置于来源的武将牌上？').set('ai',function(){
					var att=get.attitude(_status.event.player,trigger.source);
					if(att<0) return true;
					else return false;
				});
				if(relu.bool){
					player.logSkill('ybmjz_gangliey')
					yield trigger.source.addToExpansion(result.card, "giveAuto", trigger.source)
						.gaintag.add("ybmjz_ganglie_mark")
					
					// trigger.trigger('ybmjz_ganglie_card')
					// trigger.player=trigger.source;
					var cards=trigger.source.getExpansions("ybmjz_ganglie_mark");
					if(get.YB_suit(cards,'color').includes('black')&&get.YB_suit(cards,'color').includes('red')){
						var relu = yield player.chooseCardButton(cards,2,true).set('filterButton',function(i){
							if(!get.color(i))return false;
							if(ui.selected.cards.length)return get.color(ui.selected.cards[0])!=get.color(i);
							return true;
						}).set('complexCard',true)
						if(relu.links){
							yield player.logSkill('ybmjz_gangliey_next');
							// yield trigger.source.discard(relu.links);
							yield player.gain(relu.links);
							yield trigger.source.damage(2,player);
						}
					}
				}
			}
		},
		ai: {
			maixie_defend: true,
			expose: 0.4,
		},
		group:'ybmjz_gangliey_next',
		subSkill:{
			next:{
				trigger:{
					global:['phaseEnd','ybmjz_ganglie_cardAfter'],
				},
				filter:(event,player,name)=>{
					/*if(name == 'ybmjz_ganglie_cardAfter')var tar = event.source;
					else */var tar = event.player;
					if(!tar.getExpansions("ybmjz_ganglie_mark"))return false;
					return true;
					// var cards=tar.getExpansions("ybmjz_ganglie_mark");
					// if(name == 'phaseeEnd')return cards.length>0;
					// else {
					// 	return get.YB_suit(cards,'color').includes('black')&&get.YB_suit(cards,'color').includes('red');
					// }
				},
				direct:true,
				forced:true,
				*content(event,map){
					let player=map.player,trigger=map.trigger;
					/*if(event.triggername == 'ybmjz_ganglie_cardAfter')var tar = trigger.source;
					else */var tar = trigger.player;
					yield player.line(tar);
					var cards=tar.getExpansions("ybmjz_ganglie_mark");
					if(event.triggername=='phaseEnd'){
						yield player.logSkill('ybmjz_gangliey_next');
						// yield tar.discard(cards);
						yield player.gain(cards);
						var rcard=caeds.filter(i=>get.color(i)=='red'),
							bcard=caeds.filter(i=>get.color(i)=='black');
						if(rcard.length>0)yield player.recover(rcard.length);
						if(bcard.length>0)yield player.draw(bcard.length);
					}
					// else {
						
					// }
				}
			},
		}
	},
	ybmjz_qingjian:{},
	// 'ybmjz_tuxi':'突袭',
	// 'ybmjz_tuxi_info':'出牌阶段开始时，
	// 你可以弃置至多X张牌（X为你本回合获得的牌数），
	// 并选择等量有手牌的其他角色，展示并获得他们各一张牌，
	// 若你弃置的牌花色包含此牌花色，你对其造成一点伤害。',
	//名张辽
	ybmjz_tuxi:{
		audio:'retuxi',
		trigger:{
			player:'phaseDrawBegin2',
		},
		filter:function(event,player){
			return event.num > 0
		},
		cost(){
			event.result = player.chooseTarget(
				get.prompt("ybmjz_tuxi"),
				[1, trigger.num],
				function (card, player, target) {
					return target.countCards("he") > 0 && player != target&&target.hasCard(card => lib.filter.canBeDiscarded(card, player, target), "he");
				},
				function (target) {
					var att = get.attitude(_status.event.player, target);
					if (target.hasSkill("tuntian")) {
						return att / 10;
					}
					return 1 - att;
				}
			).forResult();
		},
		*content(event,map) {
			let trigger=map.trigger,player=map.player,targets = event.targets;
			targets.sortBySeat();
			var lose_list = [],
				cards = [];
			for(var i of targets){
				if(i.isIn()){
					var relu = yield player.choosePlayerCard('he',i,true).set('ai',function (button) {
						var trigger=_status.event;
						if (get.attitude(_status.event.player,i) > 5) {
							return -get.value(button.link);
						}
						return get.value(button.link);
					}).set("filterButton", function (button) {
						return lib.filter.canBeDiscarded(button.link, player, i);
					}).forResult();
					if(relu){
						yield lose_list.push([i, relu.cards]);
						yield cards.push(relu.cards[0]);
					}
				}
			}
			yield game.loseAsync({
				lose_list: lose_list,
				discarder: player,
			}).setContent("discardMultiple");
			var cardlist=cards.filter(c=>get.position(c, true) == "d");
			if(cardlist.length)var relu2 = yield player.chooseCardButton(cardlist,[1,Infinity],'突袭：是否获得其中任意张？').set("ai", function (button) {
				return get.useful(button.link)>3;
			});
			if(relu2&&relu2.bool){
				yield player.gain(relu2.links,'gain2');
				trigger.num-=relu2.links.length;
			}
		},
		ai: {
			threaten: 1.6,
			expose: 0.2,
		},
	},
	//名许褚
	ybmjz_luoyi:{
		audio:'reluoyi',
		trigger:{
			player:'phaseUseBegin',
		},
		filter:function(event,player){
			return player.countCards('he')>0;
		},
		async cost(event, trigger, player){
			event.result=await player.chooseToDiscard('he').set('prompt2',get.prompt2('ybmjz_luoyi')).set("chooseonly", true).forResult();
		},
		init:function(){
			if(!lib.skill.reluoyi2.mark){
				lib.skill.reluoyi2.mark=true;
				lib.skill.reluoyi2.intro={
					content:'使用【杀】或【决斗】伤害+1，直到下回合开始。'
				}
			}
		},
		*content(event,map){
			let player=map.player,trigger=map.trigger;
			yield player.discard(event.cards);
			var cardsx=[];
			cardsx.push(event.cards[0]);
			var relu = yield player.draw(2,"visible");
			for(var k of relu){
				cardsx.push(k);
			}
			if(cardsx.filter(card=>get.type2(card)=='equip').length>0){
				yield player.addTempSkill("reluoyi2", { player: "phaseBefore" });
			}
			if(cardsx.filter(card=>get.type2(card)=='basic').length>0){
				yield player.addTempSkill("ybmjz_luoyi_use");
			}
			if(cardsx.filter(card=>get.type2(card)=='trick').length>0){
				yield player.addTempSkill("ybmjz_luoyi_tag");
			}
			// else player.addTempSkill("ybmjz_luoyi_max");
		},
		subSkill:{
			max:{
				mod:{
					cardEnabled: function (card) {
						if (card.name == "sha"||card.name=='juedou') return false;
					},
				},
				mark:true,
				intro:{
					content:'本回合【杀】和【决斗】不计入手牌上限。'
				}
			},
			use:{
				mod: {
					cardUsable: function (card, player, num) {
						if (card.name == "sha") return num + 1;
					},
				},
				mark:true,
				intro:{
					content:'本回合使用【杀】次数+1。'
				}
			},
			tag:{
				mod: {
					targetInRange: function (card, player, target, now) {
						if (card.name == "sha") return true;
					},
				},
				mark:true,
				intro:{
					content:'本回合使用【杀】无距离限制。'
				}
			}
		}
	},

	//郭嘉
	tiandu_re_guojia:{
		audio: 2,
	},
	ybmjz_tiandu:{
		audio:'tiandu',
		forced:true,
		trigger:{
			player:['phaseZhunbei','judgeEnd'],
		},
		filter(event,player,name){
			if(name=='phaseZhunbei')return true;
			return get.position(event.result.card, true) == "o";
		},
		async content(event,trigger,player){
			if(event.triggername=='phaseZhunbei'){
				let result = await player.judge('天妒',function(card){
					if(get.tag(card,'damage')>0.5){
						return player.hp-1.5;
					}
					return 0;//这里return 的数字别私自改
				}).forResult();
				if(result.card){
					if(get.tag(result.card,'damage')>0.5){
						await player.damage(result.card,'nosource');
					}
				}
			}
			else {
				player.gain(trigger.result.card, "gain2");
			}
		},
		// group:['ybmjz_tiandu_tiandu'],
		// subSkill:{
		// 	tiandu:{
		// 		audio:'ybmjz_tiandu',
		// 		trigger: { player: "judgeEnd" },
		// 		forced: true,
		// 		filter(event, player) {
		// 			return get.position(event.result.card, true) == "o";
		// 		},
		// 		async content(event, trigger, player) {
		// 			player.gain(trigger.result.card, "gain2");
		// 		},

		// 	}
		// }
	},
	ybmjz_limu:{
		mod: {
			targetInRange(card, player, target) {
				if (player.countCards("j") && player.inRange(target)) {
					return true;
				}
			},
			cardUsableTarget(card, player, target) {
				if (player.countCards("j") && player.inRange(target)) return true;
			},
			aiOrder(player, card, num) {
				if (get.type(card, null, player) == "trick" && player.canUse(card, player) && player.canAddJudge(card)) return 15;
			},
		},
		locked: false,
		audio: 'xinfu_limu',
		enable: "phaseUse",
		discard: false,
		filter(event, player) {
			if (player.hasJudge("shandian")&&player.hasJudge("huoshan")&&player.hasJudge("hongshui")&&player.hasJudge('suibozhuliu')) return false;
			return player.countCards("hes",function(card){return ['spade','heart','club','yanxiao_card'].includes(get.suit(card))}) > 0;
		},
		// prompt: "将♦牌当做杀，♥牌当做桃，♣牌当做闪，♠牌当做无懈可击使用或打出",
		//动态的viewAs
		viewAs(cards, player) {
			if (cards.length) {
				var name = false;
				//根据选择的卡牌的花色 判断要转化出的卡牌是闪还是火杀还是无懈还是桃
				switch (get.suit(cards[0], player)) {
					case "club":
						name = "hongshui";
						break;
					case "diamond":
						name = "suibozhuliu";
						break;
					case "spade":
						name = "shandian";
						break;
					case "heart":
						name = "huoshan";
						break;
				}
				//返回判断结果
				if (name) return { name: name };
			}
			return null;
		},
		//prepare:"throw",
		position: "hes",
		//选牌合法性判断
		filterCard(card, player, event) {
			//获取卡牌花色
			var name = get.suit(card, player);
			//如果这张牌是梅花并且当前时机能够使用/打出闪 那么这张牌可以选择
			if (name == "club" && player.canAddJudge({ name: "hongshui", cards: [card] })) return true;
			//如果这张牌是方片并且当前时机能够使用/打出火杀 那么这张牌可以选择
			if (name == "diamond" && player.canAddJudge({ name: "suibozhuliu", cards: [card] })) return true;
			//如果这张牌是黑桃并且当前时机能够使用/打出无懈 那么这张牌可以选择
			if (name == "spade" && player.canAddJudge({ name: "shandian", cards: [card] })) return true;
			//如果这张牌是红桃并且当前时机能够使用/打出桃 那么这张牌可以选择
			if (name == "heart" && player.canAddJudge({ name: "huoshan", cards: [card] })) return true;
			//上述条件都不满足 那么就不能选择这张牌
			return false;
		},
		selectTarget: -1,
		filterTarget(card, player, target) {
			return player == target;
		},
		check(card) {
			var player = _status.event.player;
			if (!player.getEquip("zhangba")) {
				let damaged = player.maxHp - player.hp - 1;
				if (
					player.countCards("h", function (cardx) {
						if (cardx == card) return false;
						if (cardx.name == "tao") {
							if (damaged < 1) return true;
							damaged--;
						}
						return ["shan", "jiu"].includes(cardx.name);
					}) > 0
				)
					return 0;
			}
			if (card.name == "shan") return 15;
			if (card.name == "tao" || card.name == "jiu") return 10;
			return 9 - get.value(card);
		},
		// onuse(links, player) {
		// 	var next = game.createEvent("limu_recover", false, _status.event.getParent());
		// 	next.player = player;
		// 	next.setContent(function () {
		// 		player.recover();
		// 	});
		// },
		ai: {
			result: {
				target(player, target) {
					if (player.countCards("hes", "zhangba")) return player.countCards("h", { type: "basic" });
					let res = lib.card.lebu.ai.result.target(player, target);
					if (player.countCards("hs", "sha") >= player.hp) res++;
					if (target.isDamaged()) return res + 2 * Math.abs(get.recoverEffect(target, player, target));
					return res;
				},
				ignoreStatus: true,
			},
			order(item, player) {
				if (player.hp > 1 && player.countCards("j")) return 0;
				return 12;
			},
			effect: {
				target(card, player, target) {
					if (target.isPhaseUsing() && typeof card === "object" && get.type(card, null, target) === "delay" && !target.countCards("j")) {
						let shas =
							target.getCards("hs", i => {
								if (card === i || (card.cards && card.cards.includes(i))) return false;
								return get.name(i, target) === "sha" && target.getUseValue(i) > 0;
							}) - target.getCardUsable("sha");
						if (shas > 0) return [1, 1.5 * shas];
					}
				},
			},
		},

	},





	//成神阳太
	ybmjz_fengshen:{
		audio:'ext:夜白神略/audio/character:2',
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		forced:true,
		filter: function (event, player) {
			if (player.name2 != undefined)return false;
			var list = ['db_key_hina','ybmjz_hina'];
			if(game.filterPlayer(c=>{
				return list.includes(c.name)||list.includes(c.name1)||list.includes(c.name2)
			}).length>0)return false;
			return event.name != 'phase' || game.phaseNumber == 0;
		},
		content: function () {
			'step 0'
			player.loseMaxHp();
			'step 1'
			var name = lib.character['ybmjz_hina']?'ybmjz_hina':'db_key_hina';
			player.changeCharacter([player.name,name])
			// game.broadcastAll(
			// 	function (player, first, chosen) {
			// 		player.name2 = name;
			// 		player.skin.name2 = name;
			// 		player.classList.add("fullskin2");
			// 		player.node.avatar2.classList.remove("hidden");
			// 		player.node.avatar2.setBackground(chosen, "character");
			// 		player.node.name2.innerHTML = get.slimName(name);
			// 		if (player == game.me && ui.fakeme) {
			// 			ui.fakeme.style.backgroundImage = player.node.avatar.style.backgroundImage;
			// 		}
			// 	},
			// 	player,
			// );
		},
	},
	ybmjz_yingshen:{
		group:['ybmjz_yingshen_zhuzhan','ybmjz_yingshen_discard','ybmjz_yingshen_exchange'],
		subSkill:{
			zhuzhan: {
				trigger: { player: "yingbianZhuzhanBegin" },
				forced: true,
				locked: false,
				popup: false,
				firstDo: true,
				content() {
					trigger.setContent(get.info("ybmjz_yingshen").yingbian);
				},
			},
			discard: {
				// trigger: { player: "chooseCardBegin" },
				// filter(event, player) {
				// 	return event.getParent().name == "yingbianZhuzhan";
				// },
				// forced: true,
				// popup: false,
				// firstDo: true,
				// content() {
				// 	trigger.filterCard = lib.filter.cardDiscardable;
				// },
			},
			exchange:{
				trigger:{player:['useSkill','logSkillBegin']},
				// filter(event,player){return true},
				filter(event,player){return event.skill=='ybmjz_yingshen'&&(!player.storage.ybmjz_huanshen)},
				forced: true,
				popup: false,
				content(){
					player.YB_exchange();
				}
			},
		},
		yingbian() {
			"step 0";
			event._global_waiting = true;
			event.send = (player, card, source, targets, id, id2, yingbianZhuzhanAI, skillState) => {
				if (skillState) player.applySkills(skillState);
				var type = get.type2(card),
					str = get.translation(source);
				if (targets && targets.length) str += `对${get.translation(targets)}`;
				str += `使用了${get.translation(card)}，是否弃置一张${get.translation(type)}为其助战？`;
				player.chooseCard({
					filterCard: (card, player) => get.type2(card) == type && lib.filter.cardDiscardable(card, player),
					prompt: str,
					position: "h",
					_global_waiting: true,
					id: id,
					id2: id2,
					ai:
						typeof yingbianZhuzhanAI == "function"
							? yingbianZhuzhanAI(player, card, source, targets)
							: cardx => {
									var info = get.info(card);
									if (info && info.ai && info.ai.yingbian) {
										var ai = info.ai.yingbian(card, source, targets, player);
										if (!ai) return 0;
										return ai - get.value(cardx);
									} else if (get.attitude(player, source) <= 0) return 0;
									return 5 - get.value(cardx);
								},
				});
				if (!game.online) return;
				_status.event._resultid = id;
				game.resume();
			};
			"step 1";
			var type = get.type2(card);
			event.list = game.filterPlayer(current => current.countCards("h") && (_status.connectMode || current.hasCard(cardx => get.type2(cardx) == type, "h"))).sortBySeat(_status.currentPhase || player);
			event.id = get.id();
			"step 2";
			if (!event.list.length) event.finish();
			else if (_status.connectMode && (event.list[0].isOnline() || event.list[0] == game.me)) event.goto(4);
			else event.send((event.current = event.list.shift()), event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI);
			"step 3";
			if (result.bool) {
				event.zhuzhanresult = event.current;
				event.zhuzhanresult2 = result;
				if (event.current != game.me) game.delayx();
				event.goto(8);
			} else event.goto(2);
			"step 4";
			var id = event.id,
				sendback = (result, player) => {
					if (result && result.id == id && !event.zhuzhanresult && result.bool) {
						event.zhuzhanresult = player;
						event.zhuzhanresult2 = result;
						game.broadcast("cancel", id);
						if (_status.event.id == id && _status.event.name == "chooseCard" && _status.paused)
							return () => {
								event.resultOL = _status.event.resultOL;
								ui.click.cancel();
								if (ui.confirm) ui.confirm.close();
							};
					} else if (_status.event.id == id && _status.event.name == "chooseCard" && _status.paused) return () => (event.resultOL = _status.event.resultOL);
				},
				withme = false,
				withol = false,
				list = event.list;
			for (var i = 0; i < list.length; i++) {
				var current = list[i];
				if (current.isOnline()) {
					withol = true;
					current.wait(sendback);
					current.send(event.send, current, event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI, get.skillState(current));
					list.splice(i--, 1);
				} else if (current == game.me) {
					withme = true;
					event.send(current, event.card, player, trigger.targets, event.id, trigger.parent.id, trigger.yingbianZhuzhanAI);
					list.splice(i--, 1);
				}
			}
			if (!withme) event.goto(6);
			if (_status.connectMode && (withme || withol))
				game.players.forEach(value => {
					if (value != player) value.showTimer();
				});
			event.withol = withol;
			"step 5";
			if (!result || !result.bool || event.zhuzhanresult) return;
			game.broadcast("cancel", event.id);
			event.zhuzhanresult = game.me;
			event.zhuzhanresult2 = result;
			"step 6";
			if (event.withol && !event.resultOL) game.pause();
			"step 7";
			game.players.forEach(value => value.hideTimer());
			"step 8";
			if (event.zhuzhanresult) {
				var target = event.zhuzhanresult;
				if (target == player && player.hasSkill("ybmjz_yingshen")) player.logSkill("ybmjz_yingshen");
				target.line(player, "green");
				target.discard(event.zhuzhanresult2.cards).discarder = target;
				if (typeof event.afterYingbianZhuzhan == "function") event.afterYingbianZhuzhan(event, trigger);
				var yingbianCondition = event.name.slice(8).toLowerCase(),
					yingbianConditionTag = `yingbian_${yingbianCondition}_tag`;
				target.popup(yingbianConditionTag, lib.yingbian.condition.color.get(yingbianCondition));
				game.log(target, "响应了", '<span class="bluetext">' + (target == player ? "自己" : get.translation(player)) + "</span>", "发起的", yingbianConditionTag);
				target.addExpose(0.2);
				event.result = {
					bool: true,
				};
			} else
				event.result = {
					bool: false,
				};
		},
		audio:'ext:夜白神略/audio/character:2',
		enable:'chooseCard',
		filter(event, player) {
			return event.getParent().name == "yingbianZhuzhan";
		},
		// content(){
		// if(!player.storage.ybmjz_huanshen)player.YB_exchange();
		// 	console.log(trigger.getParent())
		// 	// trigger.getParent().forceYingbian=true;
		// 	// trigger.getParent().zhuzhanresult=player;
		// 	// trigger.getParent().zhuzhanresult.YB_exchange();
		// }
		
	},
	ybmjz_huanshen:{
		audio:'ext:夜白神略/audio/character:2',
		groupSkill: "shen",
		unique: true,
		skillAnimation:true,
		limited:true,
		animationColor: "key",
		trigger: { global: "dying" },
		mark:true,
		filter:function(event,player){
			if(player.storage.ybmjz_huanshen) return false;
			if(_status.currentPhase==event.player)return false;
			return true;
		},
		content:function(){
			'step 0'
			player.awakenSkill('ybmjz_huanshen');
			player.storage.ybmjz_huanshen=true;
			'step 1'
			if(player!=trigger.player)player.line(trigger.player,'key');
			'step 2'
			player.YB_exchange();
			'step 3'
			trigger.player.recover(1 - trigger.player.hp);
		},
		ai:{
			save:true,
		}
	},
	//神郭嘉
	ybmjz_reshuishi:{
		audio: "shuishi",
		enable: "phaseUse",
		usable: 1,
		frequent: true,
		filter(event, player) {
			return true;
		},
		content() {
			"step 0";
			event.cards = [];
			event.suits = [];
			"step 1";
			player
				.judge(function (result) {
					var evt = _status.event.getParent("ybmjz_reshuishi");
					if (evt && evt.suits && evt.suits.includes(get.suit(result))) return 0;
					return 1;
				})
				.set("callback", lib.skill.ybmjz_reshuishi.callback).judge2 = function (result) {
				return result.bool ? true : false;
			};
			"step 2";
			var cards = cards.filterInD();
			if (cards.length)
				player
					.chooseTarget("将" + get.translation(cards) + "交给一名角色", true)
					.set("ai", function (target) {
						var player = _status.event.player,
							att = get.attitude(player, target);
						if (att <= 0) return att;
						if (target.countCards("h") + _status.event.num >= _status.event.max) att /= 3;
						if (target.hasSkillTag("nogain")) att /= 10;
						return att;
					})
					.set("num", cards.length)
					.set(
						"max",
						game.filterPlayer().reduce((num, i) => {
							return Math.max(num, i.countCards("h"));
						}, 0)
					);
			else event.finish();
			"step 3";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.line(target, "green");
				target.gain(cards, "gain2").giver = player;
			} else event.finish();
			"step 4";
			if (target.isMaxHandcard()) player.loseMaxHp();
		},
		callback() {
			"step 0";
			var evt = event.getParent(2);
			event.getParent().orderingCards.remove(event.judgeResult.card);
			evt.cards.push(event.judgeResult.card);
			if (event.getParent().result.bool) {
				evt.suits.push(event.getParent().result.suit);
				if(player.maxHp < 10)player.gainMaxHp();
				player.chooseBool("是否继续发动【慧识】？").set("frequentSkill", "reshuishi");
			} else event._result = { bool: false };
			"step 1";
			if (result.bool) event.getParent(2).redo();
		},
		ai: {
			order: 9,
			result: {
				player: 1,
			},
		},
	},
	ybmjz_stianyi:{
		audio: "stianyi",
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: "gray",
		filter(event, player) {
			return !game.hasPlayer(function (current) {
				return current.getAllHistory("damage").length == 0;
			});
		},
		content() {
			"step 0";
			player.awakenSkill("stianyi");
			player.gainMaxHp(2);
			player.recover();
			"step 1";
			player.chooseTarget(true, "令一名角色获得技能〖佐幸〗").set("ai", function (target) {
				return get.attitude(_status.event.player, target);
			});
			"step 2";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, "green");
				target.storage.ybmjz_zuoxing = player;
				target.addSkills("ybmjz_zuoxing");
			}
		},
		derivation: "ybmjz_zuoxing",
	},
	ybmjz_zuoxing:{
		audio: 'zuoxing',
		enable: "chooseToUse",
		usable: 1,
		filter(event, player) {
			var target = player.storage.ybmjz_zuoxing;
			if (!target || !target.isIn() || target.maxHp < 2) return false;
			for (var i of lib.inpile) {
				if (get.type(i) == "trick" && event.filterCard({ name: i, isCard: true }, player, event)) return true;
			}
			return false;
		},
		hiddenCard:function (player,name){
			var target = player.storage.ybmjz_zuoxing;
			var type=get.type(name);
			return type=='trick'&&target&&target.isIn()&&target.maxHp >= 2;
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				for (var i of lib.inpile) {
					if (get.type(i) == "trick" && event.filterCard({ name: i, isCard: true }, player, event)) list.push(["锦囊", "", i]);
				}
				return ui.create.dialog("佐幸", [list, "vcard"]);
			},
			check(button) {
				return _status.event.player.getUseValue({ name: button.link[2], isCard: true });
			},
			backup(links, player) {
				return {
					viewAs: {
						name: links[0][2],
						isCard: true,
					},
					filterCard: () => false,
					selectCard: -1,
					popname: true,
					log: false,
					precontent() {
						player.logSkill("ybmjz_zuoxing");
						var target = player.storage.ybmjz_zuoxing;
						target.loseMaxHp();
					},
				};
			},
			prompt(links, player) {
				return "请选择" + get.translation(links[0][2]) + "的目标";
			},
		},
		ai: { order: 1, result: { player: 1 } },
	},
	//神曹丕
	ybmjz_chuyuan:{
		audio: 'chuyuan',
		trigger: { global: "damageEnd" },
		filter(event, player) {
			return event.player.isIn() && player.getExpansions("chuyuan").length < player.maxHp;
		},
		logTarget: "player",
		locked: false,
		content() {
			"step 0";
			trigger.player.draw();
			"step 1";
			if (!trigger.player.countCards("h")) event.finish();
			else trigger.player.chooseCard("h", true, "选择一张牌置于" + get.translation(player) + "的武将牌上作为「储」");
			"step 2";
			player.addToExpansion(result.cards, trigger.player, "give").gaintag.add("chuyuan");
		},
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove(player, skill) {
			var cards = player.getExpansions('chuyuan');
			if (cards.length) player.loseToDiscardpile(cards);
		},
		levelUp(player){
			player.storage.ybmjz_chuyuan=true;
		},
		group:'ybmjz_chuyuan_wenji',
		subSkill:{
			wenji:{
				audio: 'chuyuan',
				trigger: { player: "phaseZhunbeiBegin" },
				filter(event,player){
					var cards = player.getExpansions('chuyuan');
					return cards.length&&cards.length>=player.maxHp&&player.storage.ybmjz_chuyuan==true;
				},
				forced:true,
				content(){
					player.gain(player.getExpansions("chuyuan"), "gain2", "fromStorage");
					player.gainMaxHp();
				}
			},
		},
		ai: {
			notemp: true,
		},
	},
	ybmjz_dengji:{
		audio:'dengji',
		derivation: ["ybmjz_tianxing", "new_rejianxiong", "rerende", "rezhiheng", "olluanji", "caopi_xingdong",'caopi_xinkui'],
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		unique: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: "water",
		filter(event, player) {
			return player.getExpansions("chuyuan").length >= 3;
		},
		content() {
			player.awakenSkill(event.name);
			player.addSkills(["ybmjz_tianxing", "new_rejianxiong"]);
			player.loseMaxHp();
			player.gain(player.getExpansions("chuyuan"), "gain2", "fromStorage");
		},
		ai: {
			combo: "chuyuan",
		},
	},
	ybmjz_tianxing:{
		audio:'tianxing',
		trigger: { player: "phaseZhunbeiBegin" },
		forced: true,
		unique: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: "thunder",
		filter(event, player) {
			return player.getExpansions("chuyuan").length >= 3;
		},
		content() {
			"step 0";
			player.awakenSkill(event.name);
			player.loseMaxHp();
			player.gain(player.getExpansions("chuyuan"), "gain2", "fromStorage");
			"step 1";
			// player.YB_levelUp("ybmjz_chuyuan");
			player.storage.ybmjz_chuyuan=true;
			player
				.chooseControl("rerende", "rezhiheng", "olluanji", "caopi_xingdong","caopi_xinkui")
				.set("prompt", "选择获得一个技能")
				.set("ai", function () {
					var player = _status.event.player;
					if (!player.hasSkill("luanji") && !player.hasSkill("olluanji") && player.getUseValue({ name: "wanjian" }) > 4) return "olluanji";
					if (!player.hasSkill("rezhiheng")) return "rezhiheng";
					if (!player.hasSkill("caopi_xingdong")) return "caopi_xingdong";
					if (!player.hasSkill("caopi_xinkui")) return "caopi_xinkui";
					return "rerende";
				});
			"step 2";
			player.addSkills(result.control);
		},
		ai: {
			combo: "chuyuan",
		},

	},
	caopi_xinkui:{
		preHidden:true,
		audio:'sbxingshang',
		trigger:{
			global:'dieAfter',
		},
		forced:true,
		filter:function (event,player){
			if(!player.side) player.side=player.playerid;
			return !event.player.isAlive()&&(!event.player.side||event.player.side!=player.side);
		},
		available:function (mode){
			if(['versus','boss','chess'].includes(mode)) return false;
		},
		logTarget:'player',
		content:function (){
			game.addGlobalSkill('autoswap');
			var fun=function(self,me){
				me=(me||game.me);
				var that=this._trueMe||this;
				if(that.isMad()||game.notMe) return false;
				if(this===me){
					if(self) return true;
					return false;
				}
				if(that===me||this==me._trueMe) return true;
				if(_status.connectMode) return false;
				if(lib.config.mode=='versus'){
					if(_status.mode=='three') return this.side==me.side;
					if(_status.mode=='standard') return lib.storage.single_control&&this.side==me.side;
					if(_status.mode=='four') return get.config('four_phaseswap')&&this.side==me.side;
					if(_status.mode=='two') return get.config('two_phaseswap')&&this.side==me.side;
					return false;
				}
				else if(lib.config.mode=='boss'){
					if(me.side) return false;
					return this.side==me.side&&get.config('single_control');
				}
				else if(game.chess){
					if(lib.config.mode=='chess'){
						if(_status.mode=='combat'&&!get.config('single_control')) return false;
					}
					return this.side==me.side;
				};
				if(this.side&&this.side==me.side) return true;
				return false;
			};
			lib.element.player.isUnderControl=fun;
			for(var i of game.players){
				i.isUnderControl=fun;
			};
			if(!player.side) player.side=player.playerid;
			trigger.player.side=player.side;
			trigger.player._trueMe=player;
			if(trigger.player==game.me){
				game.notMe=true;
				if(!_status.auto) ui.click.auto();
			}
			trigger.player.init('ybmjz_shen_caopi_kui');
			trigger.player.storage.dz014_xinkui=player;
			if (!lib.translate['commoner']) lib.translate['commoner'] = '民';
			trigger.player.identity = 'commoner';
			trigger.player.setIdentity('commoner');
			trigger.player.identityShown = trigger.player.storage.dz014_xinkui.identityShown;
			trigger.player.ai.modAttitudeFrom = function (from, to, att) {
				const source = game.findPlayer(target => target == from.side || target.side == from.side && target.identity != 'commoner');
				if (to == from.side || to.side == from.side) return 20;
				return get.attitude(source, to);
			};
			trigger.player.ai.modAttitudeTo = function (from, to, att) {
				const source = game.findPlayer(target => target == to.side || target.side == to.side && target.identity != 'commoner');
				if (from == to.side || from.side == to.side) return 20;
				return get.attitude(from, source) * (to.identity == 'commoner' ? 0.8 : 1);
			};
			trigger.player.revive(3,false);
			trigger.player.draw(4);
		},
	},
}