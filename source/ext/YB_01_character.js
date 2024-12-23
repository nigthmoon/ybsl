"use strict";
const extname = '夜白神略';
game.import('character',function(lib, game, ui, get, ai, _status){ 
	var YB_one={ 
		name:'YB_one',//武将包命名（必填） 
		connect:true,//该武将包是否可以联机（必填） 
		connectBanned:[],//联机禁用
		characterSort:{
			YB_one:{
				one_01:[

				],
			}	
		},
		character:{
			//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
			//最后的括号可以不加内容，但不能没有！已经有呆宝宝犯过错了
			yb_wan_wujiangceshi:['female','qun',4,[
				'yb_wan_xueyi','yb_wan_jianli','yb_wan_linglong','yb_wan_yaoji','yb_wan_luosuo','yb_wan_qingzhu',
				'yb_wan_xueyii','yb_wan_suyi','yb_wan_fushui','yb_wan_huantian','yb_wan_huangtian'
			],['forbidai','name:null|null']]

		},//武将（必填） 
		characterIntro:{
			
		},//武将介绍（选填） 
		perfectPair:{

		},//珠联璧合武将（选填）
		characterFilter:{

		},//武将使用条件
		characterTitle:{

		},//武将标题（用于写称号或注释）（选填） 
		skill:{
			yb_wan_qingzhu:{//请诛有bug
				// mark:true,
				// skillAnimation:true,
				// limited:true,
				// animationColor:'thunder',
				// init:function(player){
				// 	player.storage.yb_wan_qingzhu=false;
				// },
				enable:'phaseUse',
				filter:function(event,player){
					// if(player.storage.yb_wan_qingzhu) return false;
					var tars = game.filterPlayer(tar=>tar!=player&&tar.isIn());
					return tars.length>0;
				},
				filterCard:function(){return false},
				selectCard:-1,
				lose:false,
				discard:false,
				delay:false,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				multitarget:true,
				selectTarget:2,
				content:function*(event,map){
					let trigger = map.trigger,
						player = map.player,
						targets = event.targets;
					let target1 = targets[0],target2=targets[1],cards = player.getCards('h').filter(card=>get.tag(card, "damage")>0.5);
					yield target1.viewHandcards(player);
					var relu = yield target1.chooseControl()
						.set('choiceList', ['对'+get.translation(target2)+'使用'+get.translation(player)+'手牌中所有伤害牌，然后直到回合结束不能使用或打出任何手牌','摸'+get.translation(player)+'手牌中伤害类牌数量数牌。'])
						.set('prompt', '请诛：清选择一项')
						.set('ai', () => 1);
					yield player.removeSkill('yb_wan_qingzhu');
					if(relu.index==1){
						yield target1.draw(cards.length);
					}
					else {
						let ybok = cards.filter(card=>/*player.getCards('h').includes(card)&&*/target1.canUse(card,target2));
						var cardsx = cards.map(card => {
							var cardx = ui.create.card();
							cardx.init(get.cardInfo(card));
							cardx._cardid = card.cardid;
							return cardx;
						});
						// var cardsx = cards;
						yield target1.directgains(cardsx, null, "yb_wan_qingzhu");
						while(target2.isIn()&&target1.isIn()&&cardsx.length){
							var relu2 = yield target1.chooseToUse(target2)
								.set('addCount',false)
								.set('filterCard',function(card){
									if(cardsx.includes(card))return lib.filter.filterCard.apply(this,arguments);
									// return true;
									return false;
								})
								.set("targetRequired", true)
								.set("complexSelect", true)
								.set("sourcex", event.addedTarget);
							if(relu2.bool){
								// cardsxx = target1.getCards("s", card => card.hasGaintag("sbhuanshi_tag"));
								// if (cardsx.length) {
								// 	if (cards) {
								// 		cards = cards.map(card => {
								// 			if (cardsx.includes(card)) return card.preCard;
								// 			return card;
								// 		});
								// 	}
								// 	if (player.isOnline2()) {
								// 		player.send(
								// 			function (cards, player) {
								// 				cards.forEach(i => i.delete());
								// 				if (player == game.me) ui.updatehl();
								// 			},
								// 			cardsx,
								// 			player
								// 		);
								// 	}
								// 	cardsx.forEach(i => i.delete());
								// 	if (player == game.me) ui.updatehl();
								// }
								let card;
								if (relu2.bool) {
									card = cards.find(card => card.cardid === relu2.cards[0]._cardid);
								}
								cardsx.remove(relu2.cards[0])
							}
						}
						yield target1.addTempSkill('spduyi2');//这里我直接从本体粘贴了一个该效果技能
					}
				},
				// group:'yb_wan_qingzhu_cardx',
				// subSkill:{
				// 	cardx:{
				// 		trigger: {
				// 			global: ["useCardBefore", "respondBefore"],
				// 		},
				// 		charlotte: true,
				// 		forced: true,
				// 		popup: false,
				// 		firstDo: true,
				// 		filter: function (event, player) {
				// 			var cards = event.player.getCards("s", card => card.hasGaintag("yb_wan_qingzhu") && card._cardid);
				// 			return (
				// 				event.cards &&
				// 				event.cards.some(card => {
				// 					return cards.includes(card);
				// 				})
				// 			);
				// 		},
				// 		content: function () {
				// 			var idList = trigger.player.getCards("s", card => card.hasGaintag("yb_wan_qingzhu")).map(i => i._cardid);
				// 			var cards = [];
				// 			game.checkGlobalHistory("cardMove", evt => {
				// 				if ((evt.name == "lose" && evt.position == ui.discardPile) || evt.name == "cardsDiscard") {
				// 					cards.addArray(evt.cards.filter(i => idList.includes(i.cardid)));
				// 				}
				// 			});
				// 			var cards2 = [];
				// 			for (var card of trigger.cards) {
				// 				var cardx = cards.find(cardx => cardx.cardid == card._cardid);
				// 				if (cardx) cards2.push(cardx);
				// 				else cards2.push(card);
				// 			}
				// 			var cards3 = trigger.cards.slice().filter(card => card.hasGaintag("yb_wan_qingzhu"));
				// 			trigger.cards = cards2;
				// 			trigger.card.cards = cards2;
				// 			if (trigger.player.isOnline2()) {
				// 				trigger.player.send(
				// 					function (cards, player) {
				// 						cards.forEach(i => i.delete());
				// 						if (player == game.me) ui.updatehl();
				// 					},
				// 					cards3,
				// 					player
				// 				);
				// 			}
				// 			cards3.forEach(i => i.delete());
				// 			if (player == game.me) ui.updatehl();
				// 			// player.addTempSkill("jsrgmanjuan_used");
				// 			// player.markAuto(
				// 			// 	"jsrgmanjuan_used",
				// 			// 	cards3.map(card => get.number(card, false))
				// 			// );
				// 		},

				// 	}
				// }
				

			// 	// yb_wan_qingzhu:'请诛',
			// 	// yb_wan_qingzhu_info:'你可令一名其他角色观看你的手牌，其选择一项：
			// 	// 1、对一名你选择的另一名角色视为使用其中所有伤害类牌，
			// 	// 该角色直到回合结束不能打出或使用任何手牌。
			// 	// 2、摸伤害类牌数量数牌。
			// 	// 然后你失去此技能，再然后若其选择的是第二项你获得技能【搏宦】。',
			// 	// yb_wan_bohuan:'搏宦',
			// 	// yb_wan_bohuan_info:'限定技，
			// 	// 展示所有手牌，对一名角色使用其中所有伤害类牌，
			// 	// 该角色不能打出或使用任何手牌。然后你弃置所有手牌。',
			},
			yb_wan_jiqiao:{

			},
			// yb_wan_jiqiao:'机巧',
			// yb_wan_jiqiao_info:'出牌阶段限一次，你可弃置你区域（装备区、手牌区）x张装备牌，
			// 然后根据你弃置牌数，发动以下效果：
			// 1，一张，选择一名角色，其下回合准备阶段亮出牌堆顶一张牌，
			// 其需任意选择自己手牌（最少一张）点数相加等于牌堆顶这张牌点数，否则其跳过出牌阶段。
			// 2，两张，选择一名角色，其下回合准备阶段亮出牌堆顶牌堆底各一张牌，
			// 你可令其摸或者弃置亮出的牌的颜色数的牌（此法摸的牌不计入手牌上限），
			// 然后其需任意选择自己手牌（最少一张）点数相加大于亮出的两张牌点数之和，
			// 否则其跳过出牌阶段。
			// 3，三张，你可选择令一名角色弃置三张牌或摸三张牌（此法摸的牌不计入手牌上限），
			// 然后其跳过出牌阶段。',
			// yb_wan_suyi:'溯艺',
			// yb_wan_suyi_info:'锁定技，当你艺大于等于四时，失去一点体力上限，你失去学艺，获得技能枪意。',

			"yb_wan_xueyi": {//血裔
				forced: true,
				trigger: {
					player: "phaseDrawBegin",
				},
				filter: (event, player) => {
					return true;
				},
				content() {
					'step 0'
					trigger.changeToZero();
					event.i='血裔';
					event.cards=get.cards(4);
					game.cardsGotoOrdering(event.cards);
					event.videoId=lib.status.videoId++;
					player.showCards(event.cards);//
					// event.dialog=event.videoId;
					game.broadcastAll(function(player,id,cards){
						var str=event.i;
						if(player==game.me&&!_status.auto){
							str+='：交换这些牌的顺序';
						}
						var dialog=ui.create.dialog(str,cards);
						dialog.videoId=id;
					},player,event.videoId,event.cards);
					event.time=get.utc();
					game.addVideo('showCards',player,[event.i,get.cardsInfo(event.cards)]);
					game.addVideo('delay',null,2);
					'step 1'
					var next = player.chooseToMove();
					// next.set('dialog',event.videoId);
					next.set("list", [["牌堆顶", event.cards]]);
					next.set("prompt", "点击交换牌的顺序，交换后的牌序也会展示给其他玩家看");
					next.set('processAI',  (list) =>{
						var cards = list[0][1], cards1 = [];
						//cards为待定选择牌 cards1为牌堆顶的牌
						var player = _status.event.player;
						cards.sort(function(a,b){
							return get.value(b,player)-get.value(a,player);
						});
						//为cards排序，价值最大的在最前面
						//将cards数组中的牌加入cards1数组
						return [[], cards];
					})//
					// next.videoId=event.videoId;
					'step 2'
					game.broadcastAll('closeDialog',event.videoId);
					var top=result.moved[0],list=[];
					for(var k=0 ;k>top.length;k++){
						list.push(top[k]);
					}
					top.reverse();
					let ttt=top.reverse();
					player.showCards(ttt,'交换后的牌的顺序');
					while(top.length){
						ui.cardPile.insertBefore(top.pop(),ui.cardPile.firstChild);
					}
					'step 3'
					player.draw(3);
				},
			},
			yb_wan_jianli:{//坚利
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				selectCard:-1,
				filterCard:false,
				check:function(event,player){
					var cards=player.getCards('h');
					var list2=[];
					for(var k of cards){
						if(list2.length==0||!list2.includes(get.color(k)))list2.add(get.color(k));
					}
					return list2.length==1;
				},
				lose:false,
				discard:false,
				delay:false,
				*content(event,map){
					let trigger=map.trigger,player=map.player;
					var cards = player.getCards('h');
					yield player.showCards(cards);//
					var list2=[];
					for(var k of cards){
						if(list2.length==0||!list2.includes(get.color(k)))yield list2.add(get.color(k));
					}
					if(list2.length==1){
						var relu = yield player.chooseTarget('选择一名角色，对其造成一点伤害').set('ai',function(target){
							return -get.attitude(_status.event.player,target);
						})
						if(relu.bool){
							var tar=relu.targets[0];
							player.line(tar);
							tar.damage();
						}
					}
				}
			},
			yb_wan_linglong:{//玲珑
				enable: ["chooseToRespond", "chooseToUse"],
				filterCard(card, player) {
					return get.suit(card) == "diamond";
				},
				position: "hes",
				viewAs: { name: "sha" },
				viewAsFilter(player) {
					if (!player.countCards("hes", { suit: "diamond" })) return false;
				},
				prompt: "将一张方片牌当杀使用或打出",
				check(card) {
					const val = get.value(card);
					if (_status.event.name == "chooseToRespond") return 1 / Math.max(0.1, val);
					return 5 - val;
				},
				ai: {
					skillTagFilter(player) {
						if (!player.countCards("hes", { suit: "diamond" })) return false;
					},
					respondSha: true,
				},
				group:['yb_wan_linglong_wushen'],
				subSkill:{
					wushen:{
						mod: {
							cardUsable(card) {
								if (card.name === "sha") {
									const suit = get.suit(card);
									if (suit === "diamond" || suit === "unsure") return Infinity;
								}
							},
						},
						audio: 2,
						trigger: { player: "useCard" },
						forced: true,
						filter(event, player) {
							return event.card.name == "sha" && get.suit(event.card) == "diamond";
						},
						content() {
							trigger.directHit.addArray(game.players);
							if (trigger.addCount !== false) {
								trigger.addCount = false;
								if (player.stat[player.stat.length - 1].card.sha > 0) {
									player.stat[player.stat.length - 1].card.sha--;
								}
							}
						},
						ai: {
							effect: {
								target(card, player, target, current) {
									if (get.tag(card, "respondSha") && current < 0) return 0.6;
								},
							},
							skillTagFilter(player, tag, arg) {
								return arg.card.name == "sha" && get.suit(arg.card) == "diamond";
							},
						},

					}
				}
			},
			yb_wan_yaoji:{//邀计
				mark:true,
				skillAnimation:true,
				limited:true,
				animationColor:'thunder',
				init:function(player){
					player.storage.yb_wan_yaoji=false;
				},
				enable:'phaseUse',
				filter(event,player){
					return !player.storage.yb_wan_yaoji;
				},
				targetprompt:['角色a','角色b'],
				selectTarget:2,
				multitarget:true,
				filterTarget:function (card,player,target){
					if(ui.selected.targets.length==1){
						return target!=player;
					}
					// return player!=target;
					return true;
				},
				content:function*(event,map){
					let trigger = map.trigger,player = map.player,targets=event.targets;
					player.awakenSkill('yb_wan_yaoji');
					var tara = targets[0],tarb = targets[1];
					var relu = yield tarb.chooseControl()
						.set('choiceList', ['令'+get.translation(tara)+'摸'+tarb.countCards('h')+'张牌，然后你摸'+tara.countCards('h')+'张牌','弃置所有手牌，在你下个回合开始前免疫所有伤害，你下个出牌阶段开始时摸x（弃置数量）张手牌'])
						.set('prompt', '邀计：清选择一项')
						.set('ai', () => 0);
					if(relu.index==0){
						const num1 = tara.countCards('h'),num2 = tarb.countCards('h');
						if(num2>0&&tara.isAlive())yield tara.draw(num2);
						if(num1>0&&tarb.isAlive())yield tarb.draw(num1);
					}
					else {
						const cards = tarb.getCards('h');
						const num3 = cards.length;
						yield tarb.discard(cards);
						yield tarb.addTempSkill('yb_wan_yaoji_buff',{player:'phaseBegin'});
						tarb.storage.yb_wan_yaoji_draw=num3;
						tarb.when({ player: 'phaseUseBegin' }).then(() => {
							if(player.storage.yb_wan_yaoji_draw&&typeof player.storage.yb_wan_yaoji_draw=='number'&&player.storage.yb_wan_yaoji_draw>0){
								player.draw(player.storage.yb_wan_yaoji_draw);
								// trigger.num+=player.storage.yb_wan_yaoji_draw;
								// delete player.storage.yb_wan_yaoji_draw;
							}
							// if(trigger.num<=0) trigger.finish();
						});
					}
				},
				subSkill:{
					buff:{
						trigger:{player:'damageBegin3'},
						filter:()=>true,
						content:()=>trigger.cancel(),
						forced:true,
					},
				}
			},
			yb_wan_luosuo:{//落锁
				// forced:true,
				locked:true,
				trigger: {
					player: "loseAfter",
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter","phaseUseSkipped", "phaseUseCancelled"],
				},
				frequent: true,
				getIndex(event, player,name) {
					if(name=='phaseUseSkipped'||name=='phaseUseCancelled')return 1;
					const evt = event.getl(player);
					if (evt && evt.player === player/* && evt.es*/) {
						var cards = [];
						if(evt.es){
							for(var i of evt.es){
								cards.push(i);
							}
						}
						if(evt.hs){
							for(var z of evt.hs){
								if(get.type(z)=='equip')cards.push(z);
							}
						}
						if(cards.length>0)return cards.length;
					}
					return false;
				},
				*content(event,map){
					let trigger=map.trigger,player=map.player;
					var relu = yield player.judge(function(card){//你进行一次判定
						return (get.color(card)=='black')?2:-0.3;//黑色返回2，否则返回0
					});
					if(relu.bool){
						yield player.chooseDrawRecover(1);
					}
				},
			},
			yb_wan_xueyii:{//学艺
				// locked:true,
				trigger:{player:['useCard','respond']},
				// filter:function(event,player){
				// 	return event.card.name=='sha'&&_status.currentPhase!=player;
				// },
				// cost(){
				// 	event.result = player.choosePlayerCard(_status.currentPhase,1,'hej').set('ai',function(card){
				// 		var att = get.attitude(player,_status.currentPhase);
				// 		if(att>0)return get.value(card)<0;
				// 		return get.value(card);
				// 	}).set('prompt2','锁定技，当你回合外打出或使用一张杀时，你可选择当前角色区域的一张牌置于你武将牌上称为艺。你每有一张艺，进攻距离加一。').forResult();
				// },
				// content(){
				// 	player.addToExpansion(event.cards, "giveAuto", player).gaintag.add("yb_wan_xueyii");
				// },
				filter:function(event,player){
					return event.card.name=='sha';
				},
				cost(){
					event.result = player.chooseTarget(function(card,player,target){
						return target.countCards('hej')>0;
					}).set('ai',function(target){
						var att = get.attitude(_status.event.player,target);
						if(target.getCards('e').filter(card=>get.value(card)<0).length>0)return att>0;
						if(target.countCards('j')>0)return att>0;
						else return att<0;
					}).set('prompt2','当你打出或使用一张杀时，你可选择场上一名角色区域一张牌（手牌、判定区、装备区）置于你武将牌上称为艺。你每有一张艺，进攻距离加一。').forResult();
				},
				content(){
					'step 0'
					player.choosePlayerCard(event.targets[0],1,'hej').set('ai',function(card){
						var att = get.attitude(player,event.targets[0]);
						if(att>0)return get.value(card)<0;
						return get.value(card);
					}).set('prompt2','当你打出或使用一张杀时，你可选择场上一名角色区域一张牌（手牌、判定区、装备区）置于你武将牌上称为艺。你每有一张艺，进攻距离加一。').forResult();
					'step 1'
					player.addToExpansion(result.cards, "giveAuto", player).gaintag.add("yb_wan_xueyii");
				},
				onremove(player){
					player.discard(player.getExpansions('yb_wan_xueyii'));
				},
				mark:true,
				marktext:'兿',
				intro:{
					mark:function(dialog,storage,player){
						var numb = player.getExpansions('yb_wan_xueyii').length||0;
						dialog.addText('至其他角色的距离-'+numb);
						dialog.addSmall([player.getExpansions('yb_wan_xueyii'),'card']);
					},
				},
			},
			yb_wan_suyi:{//溯艺
				forced:true,
				skillAnimation:true,
				animationColor:'thunder',
				unique:true,
				juexingji:true,
				trigger:{
					player:'yb_wan_xueyiiAfter',
				},
				filter(e,p){
					return !player.storage.yb_wan_suyi&&p.getExpansions('yb_wan_xueyii')?.length>=4;
				},
				contentBefore: function () {
					player.awakenSkill("yb_wan_suyi");
				},
				content(){
					player.loseMaxHp();
					// player.removeSkill('yb_wan_xueyii');
					player.addSkill('yb_wan_qiangyi');
				},
				derivation:'yb_wan_qiangyi',
				init:function(player){
					player.storage.yb_wan_suyi=false;
				},
				
			},
			yb_wan_qiangyi:{//枪意
				trigger: { player: "useCard" },
				direct: true,
				filter(event, player) {
					if (player.additionalSkills.yb_wan_qiangyi) return false;
					return event.card && event.card.name == "sha" && player.storage.yb_wan_qiangyi && player.storage.yb_wan_qiangyi.length > 0;
				},
				group: "yb_wan_qiangyi_clear",
				init(player) {
					var check = function (list) {
						for (var i = 0; i < list.length; i++) {
							var info = lib.skill[list[i]];
							if (!info) continue;
							if (info.shaRelated) return true;
							if (info && info.trigger) {
								for (var j in info.trigger) {
									var cond = info.trigger[j];
									if (typeof cond == "string") {
										cond = [cond];
									}
									if (j == "source" || j == "global") {
										if (cond.indexOf("damageBefore") != -1) return true;
										if (cond.indexOf("damageBegin") != -1) return true;
										if (cond.indexOf("damageBegin1") != -1) return true;
										if (cond.indexOf("damageBegin2") != -1) return true;
										if (cond.indexOf("damageEnd") != -1) return true;
										if (cond.indexOf("damageSource") != -1) return true;
										if (cond.indexOf("damageAfter") != -1) return true;
									}
								}
							}
							if (info.shaRelated === false) return false;
							if (get.skillInfoTranslation(list[i], player).includes("【杀】")) return true;
						}
						return false;
					};
					player.storage.yb_wan_qiangyi = get.gainableSkills(function (info, skill) {
						var list = [skill];
						game.expandSkills(list);
						return check(list);
					}, player);
				},
				content() {
					"step 0";
					var list = player.storage.yb_wan_qiangyi.slice(0);
					event.skillai = function () {
						return get.max(list, get.skillRank, "item");
					};
					if (event.isMine()) {
						var dialog = ui.create.dialog("forcebutton");
						dialog.add(get.prompt("yb_wan_qiangyi"));
						var clickItem = function () {
							_status.event._result = this.link;
							dialog.close();
							game.resume();
						};
						for (var i = 0; i < list.length; i++) {
							if (lib.translate[list[i] + "_info"]) {
								var translation = get.translation(list[i]);
								if (translation[0] == "新" && translation.length == 3) {
									translation = translation.slice(1, 3);
								} else {
									translation = translation.slice(0, 2);
								}
								var item = dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' + translation + "】</div><div>" + lib.translate[list[i] + "_info"] + "</div></div>");
								item.firstChild.addEventListener("click", clickItem);
								item.firstChild.link = list[i];
							}
						}
						dialog.add(ui.create.div(".placeholder"));
						event.switchToAuto = function () {
							event._result = event.skillai();
							dialog.close();
							game.resume();
						};
						event.confirm = ui.create.confirm("c");
						event.custom.replace.confirm = function () {
							event._result = null;
							dialog.close();
							game.resume();
						};
						_status.imchoosing = true;
						game.pause();
					} else {
						event._result = event.skillai();
					}
					"step 1";
					_status.imchoosing = false;
					if (event.confirm) {
						event.confirm.close();
					}
					if (typeof result == "string") {
						player.logSkill("yb_wan_qiangyi");
						var link = result;
						player.addAdditionalSkill("yb_wan_qiangyi", link);
						player.logSkill("yb_wan_qiangyi");
						player.popup(link);
						game.log(player, "获得了技能", "【" + get.translation(link) + "】");
						game.delay();
						player.storage.yb_wan_qiangyi.remove(link);
						trigger.yb_wan_qiangyi = true;
					}
				},
				subSkill: {
					clear: {
						trigger: { player: "useCardAfter" },
						silent: true,
						filter(event) {
							return event.yb_wan_qiangyi == true;
						},
						content() {
							player.removeAdditionalSkill("yb_wan_qiangyi");
						},
					},
				},
			

			},
			yb_wan_shuangqiang:{//双枪
				init(player){
					player.expandEquip(1);
				},
				mod:{
					maxHandcard:function(player,num){
						if(player.getCards('e').filter(card=>get.subtype(card)=='equip1'))return num+player.getCards('e').filter(card=>get.subtype(card)=='equip1').length;
						else return num;
					}
				}
			},
			yb_wan_fushui:{//符水
				enable: "phaseUse",
				filterCard: true,
				check(card) {
					return 9 - get.value(card);
				},
				filterTarget(card, player, target) {
					// if (target.hp >= target.maxHp) return false;
					return true;
				},
				async content(event, trigger, player) {
					event.target.recover();
					if(event.target.countMark('yb_wan_fushui_mark')<=0){
						event.target.markSkill('yb_wan_fushui_mark');
						event.target.addMark('yb_wan_fushui_mark');
					}
				},
				ai: {
					order: 9,
					result: {
						target(player, target) {
							if (target.hp == 1) return 5;
							if (target.hp == target.maxHp) return -1;
							if (player == target && player.countCards("h") > player.hp) return 5;
							return 2;
						},
					},
					threaten: 2,
				},
				mod:{
					maxHandcard:function (player,num){
						var numb = 0;
						var players = game.filterPlayer(current=>{
							return current.countMark('yb_wan_fushui_mark')>0;
						});
						for(var i of players){
							numb+=i.countMark('yb_wan_fushui_mark')
						}
						return num+numb;
					},
				},
				subSkill:{
					mark:{
						mark:true,
						marktext:'徒',
						intro:{
							content:'也不悔做你的信徒'
						}
					}
				}
			},
			yb_wan_huantian:{//换天
				mark:true,
				limited:true,
				unique: true,
				skillAnimation:true,
				animationColor:'thunder',
				init:function(player){
					player.storage.yb_wan_huantian=false;
				},
				enable:'phaseUse',
				filter(event,player){
					return !player.storage.yb_wan_huantian&&game.filterPlayer(current=>{
						return current.countMark('yb_wan_fushui_mark')>0;
					}).length>0;
				},
				filterTarget: function (card, player, target) {
					return target != player&&target.countMark('yb_wan_fushui_mark');
				},
				selectTarget: -1,
				multitarget: true,
				multiline: true,
				// contentBefore: function () {
				// 	player.awakenSkill("yb_wan_huantian");
				// },
				content(){
					'step 0'
					player.awakenSkill("yb_wan_huantian");
					'step 1'
					for(var i of targets){
						if(i.isIn())player.gain(i.getCards('h'));
					}
					'step 2'
					player.removeSkill('yb_wan_fushui');
					player.addSkill('yb_wan_huantian_damage');

				},
				// content(){
				// 	player.gain(target.getCards('h'));
				// },
				// contentAfter: function () {
				// 	player.removeSkill('yb_wan_fushui');
				// 	player.addSkill('yb_wan_huantian_damage');
				// },
				subSkill:{
					damage:{
						name:'换天',
						trigger:{
							player:'damageBegin3',
						},
						filter(event,player){
							return game.filterPlayer(current=>{
								return current.countMark('yb_wan_fushui_mark')>0;
							}).length>0;
						},
						cost(){
							event.result = player.chooseTarget(get.prompt2('yb_wan_fushui_mark'),function(card,player,target){
								return target.countMark('yb_wan_fushui_mark')>0;
							}).set('ai',function(current){
								return true;
							}).forResult();
						},
						content(){
							targets[0].removeMark('yb_wan_fushui_mark',1);
							trigger.num--;
						}
					}
				}

			},
			yb_wan_huangtian:{//黄天
				unique: true,
				zhuSkill: true,
				// global:'yb_wan_huangtian_draw',
				group:'yb_wan_huangtian_draw',
				subSkill:{
					draw:{
						trigger:{
							global:'damageSource',
						},
						sourceSkill: "yb_wan_huangtian",
						// filter:function(event,player){
						// 	if(player.group!='qun') return false;
						// 	return game.hasPlayer(function (current) {
						// 		return current.hasSkill("yb_wan_huangtian");
						// 	});
						// },
						filter(event, player) {
							if (/*player == event.source ||*/ !event.source || event.source.group != "qun") return false;
							if(event.source.getHistory("sourceDamage").indexOf(event) != 0)return false;
							return player.hasZhuSkill("yb_wan_huangtian", event.source);
						},
						async cost(event, trigger, player) {
							event.result = await trigger.source
								.chooseBool("是否对" + get.translation(player) + "发动【黄天】？")
								.set("choice", get.attitude(trigger.source, player) > 0)
								.forResult();
						},
						async content(event, trigger, player) {
							trigger.source.line(player, "green");
							player.draw();
						},

					}
				}
			},
		},//技能（必填） ……………………！…！！！【…？。！！？？？？…………
		card:{

		},
		translate:{
			one_01:'将包1',
			yb_wan_wujiangceshi:'测试武将',



			"yb_wan_xueyi": "血裔",//√
			"yb_wan_xueyi_info": "锁定技，你的摸牌阶段改为展示牌堆顶四张牌，你可随意排列顺序，然后你摸三张牌。",
			yb_wan_jianli:'坚利',//√
			yb_wan_jianli_info:'出牌阶段限一次，你可以展示所有手牌，若颜色均一致，你可对一名角色造成一点伤害。',
			yb_wan_qingzhu:'请诛',
			yb_wan_qingzhu_info:'你可令一名其他角色观看你的手牌，其选择一项：1、对一名你选择的另一名角色视为使用其中所有伤害类牌，该角色直到回合结束不能打出或使用任何手牌。2、摸伤害类牌数量数牌。然后你失去此技能，再然后若其选择的是第二项你获得技能【搏宦】。',
			yb_wan_bohuan:'搏宦',
			yb_wan_bohuan_info:'限定技，展示所有手牌，对一名角色使用其中所有伤害类牌，该角色不能打出或使用任何手牌。然后你弃置所有手牌。',
			// yb_wan_qingzhu_info:'限定技，你可令一名角色观看你的手牌，其选择一项：1、对一名你选择的另一名角色使用其中所有伤害类牌，该角色不能打出或使用任何手牌。2、摸伤害类牌数量数牌。',
			yb_wan_linglong:'玲珑',//√
			yb_wan_linglong_info:'你的方片牌无出杀次数限制且不计入出杀次数，你的方片牌可以当做杀或闪使用或打出。',
			yb_wan_yaoji:'邀计',//√
			yb_wan_yaoji_info:'限定技，出牌阶段你可依次选择两名不同的角色a、b（b不能是你），令b选择一项：1，a摸b角色手牌数手牌，b摸a角色手牌数手牌。2，弃置所有手牌，在其下个回合开始前免疫所有伤害，其下个出牌阶段开始时摸x（弃置数量）张手牌。',
			yb_wan_luosuo:'落锁',//√
			yb_wan_luosuo_info:'锁定技，当有人跳过出牌阶段或你失去一张装备时你可进行一次判定，若为黑色则你可选择摸一张牌或回复一点体力。',
			yb_wan_jiqiao:'机巧',
			yb_wan_jiqiao_info:'出牌阶段限一次，你可弃置你区域（装备区、手牌区）x张装备牌，然后根据你弃置牌数，发动以下效果：1，一张，选择一名角色，其下回合准备阶段亮出牌堆顶一张牌，其需任意选择自己手牌（最少一张）点数相加等于牌堆顶这张牌点数，否则其跳过出牌阶段。2，两张，选择一名角色，其下回合准备阶段亮出牌堆顶牌堆底各一张牌，你可令其摸或者弃置亮出的牌的颜色数的牌（此法摸的牌不计入手牌上限），然后其需任意选择自己手牌（最少一张）点数相加大于亮出的两张牌点数之和，否则其跳过出牌阶段。3，三张，你可选择令一名角色弃置三张牌或摸三张牌（此法摸的牌不计入手牌上限），然后其跳过出牌阶段。',
			yb_wan_xueyii:'学艺',//√
			yb_wan_xueyii_info:'每当你使用或打出一张杀时，你可选择场上一名角色区域一张牌（手牌、判定区、装备区）置于你武将牌上称为艺。你每有一张艺，进攻距离加一。',
			// yb_wan_xueyii_info:'锁定技，当你回合外打出或使用一张杀时，你可选择当前角色区域的一张牌置于你武将牌上称为艺。你每有一张艺，进攻距离加一。',
			yb_wan_suyi:'溯艺',//√
			yb_wan_suyi_info:'觉醒技，当你艺大于等于四时，失去一点体力上限，你获得技能枪意。',
			yb_wan_shuangqiang:'双枪',//√
			yb_wan_shuangqiang_info:'你多一个武器栏。你的手牌上限+x（x为你当前装备区武器数）',
			yb_wan_qiangyi:'枪意',//√
			yb_wan_qiangyi_info:'当你使用【杀】时，你可以获得一项未获得过且与杀或伤害相关的技能，此【杀】结算完毕后，你失去以此法获得的技能。',
			// 那个枪意就是张绣的百鸣，你套一下然后改名字改成枪意就好了
			yb_wan_qiangxia:'枪匣',
			yb_wan_qiangxia_info:'锁定技，游戏开局时、你的出牌阶段开始时、你的结束阶段时，你可选择从溯麟枪、沧泪槊、潮汐矛、藏黛刺中选择两把武器置入你的武器区，这些武器离开你的装备区销毁。',
			// 枪匣：游戏开局时、你的出牌阶段开始时、你的结束阶段时，你可选择从溯麟枪、沧泪槊、潮汐矛、藏黛刺中选择两把武器置入你的武器区，这些武器离开你的装备区销毁。
			// 溯麟枪：攻击距离3，可将锦囊牌当做无懈可击使用或打出，可将闪当杀使用或打出。
			// 沧泪槊：攻击距离2，当你闪避一张杀时可视为对对方打出一张杀，你打出或使用杀可令对方无法响应。
			// 潮汐矛：攻击距离4，当你使用或打出一张基本牌时你摸一张牌。
			// 藏黛刺：攻击距离1，你对一名角色出杀时可令其非锁定技失效，能将杀当闪使用或打出。
			// 学艺 溯义 枪匣改成锁定技，双枪后半段改成你的手牌上限+x（x为你当前装备区武器数）
			yb_wan_jici:'疾刺',
			yb_wan_jici_info:'回合内，当你第一次使用或打出一张杀后你可弃置一张手牌视为又打出一张杀。',
			yb_wan_xianshuai:'先率',
			yb_wan_xianshuai_info:'当你回合内第一次打出杀，若造成伤害则你可增加一体力上限然后恢复一体力，若没造成伤害则你摸两张牌。',
			yb_wan_zeishi:'贼势',
			yb_wan_zeishi_info:'每轮限一次，当你受到一点伤害后你可弃置一张牌令此伤害减一，该回合你再受到伤害时伤害加一。',
			yb_wan_fushui:'符水',//√
			yb_wan_fushui_info:'出牌阶段，你可弃置一张手牌令一名角色回复一点体力，然后其获得一个“徒”标记，一名角色最多有一个“徒”标记，你的手牌上限+x（x为场上徒标记数）',
			yb_wan_huantian:'换天',
			yb_wan_huantian_info:"限定技，出牌阶段，你可获得所有有“徒”标记的角色的所有手牌，然后失去技能符水，当你即将受到伤害时你可移去场上一个徒标记令伤害减一。",
			yb_wan_huangtian:'黄天',
			yb_wan_huangtian_info:'主公技，群雄势力角色回合内第一次造成伤害后其可令你摸一张牌。',
			yb_wan_fushui_mark:'徒',
			yb_wan_fushui_mark_info:'当你即将受到伤害时你可移去场上一个徒标记令伤害减一。',
		},//翻译（必填） 
		dynamicTranslate:{

		},
		
	};
	// const extensionName = extensionName;
	for(var i in YB_one.character){
		if(YB_one.character[i][4])YB_one.character[i][4].push(`ext:${extname}/image/character/${i}.jpg`);
		else YB_one.character[i].img=`extension/${extname}/image/character/${i}.jpg`;
		
	} 
	for(var i in YB_one.character){
		if(YB_one.character[i][4])YB_one.character[i][4].push(`die:${extname}/audio/die/${i}.mp3`);
	}
	for(var i in YB_one.card){
		if(!YB_one.card[i].image) YB_one.card[i].image=`ext:${extname}/image/card/${i}.png`
	}
	lib.config.all.characters.add('YB_one');
	lib.translate['YB_one_character_config'] = '<span style=\'color:#e328b7\'>无名将包</span>';
	return YB_one; 
}); 