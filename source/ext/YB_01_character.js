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
				'yb_wan_xueyi',
				'yb_wan_jianli','yb_wan_linglong','yb_wan_yaoji','yb_wan_luosuo','yb_wan_qingzhu',
				'yb_wan_xueyii','yb_wan_suyi','yb_wan_fushui','yb_wan_huantian','yb_wan_huangtian','yb_wan_shuangqiang',
				'yb_wan_qiangxia','yb_wan_xianshuai','yb_wan_zeishi','yb_wan_zhujian',
				'yb_wan_zhudao','yb_wan_zhumao','yb_wan_jici','yb_wan_yijie','yb_wan_yingai',
				'yb_wan_xiayi','yb_wan_haoqi','yb_wan_jiazi','yb_wan_yaoshu',
				'yb_wan_digong',
				'yb_wan_rengong',
				// 'yb_wan_jiqiao',
				'yb_wan_qiquan',
				'yb_wan_baquan','yb_wan_wenfeng','yb_wan_luanjing',
				'akiko_dongcha',
				'yb_wan_linzuo','yb_wan_guojiang','yb_wan_jixin',
				// 'yb_wan_gongxun',
				// 'yb_wan_kuitian',
				'yb_wan_muhua','yb_wan_xiamou','yb_wan_hanyong',
				'yb_wan_yinmou',

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
			yb_wan_qingzhu:{//请诛换了个写法，没bug了，就是有点艹淡
				audio:'ext:无名扩展/audio/character:2',
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
						yield player.addSkill('yb_wan_bohuan');
					}
					else {
						// let ybok = cards.filter(card=>/*player.getCards('h').includes(card)&&*/target1.canUse(card,target2));
						// var cardsx = cards.map(card => {
						// 	var cardx = ui.create.card();
						// 	cardx.init(get.cardInfo(card));
						// 	cardx._cardid = card.cardid;
						// 	return cardx;
						// });
						// // var cardsx = cards;
						// yield target1.directgains(cardsx, null, "yb_wan_qingzhu");
						// while(target2.isIn()&&target1.isIn()&&cardsx.length){
						// 	var relu2 = yield target1.chooseToUse(target2)
						// 		.set('addCount',false)
						// 		.set('filterCard',function(card){
						// 			if(cardsx.includes(card))return lib.filter.filterCard.apply(this,arguments);
						// 			// return true;
						// 			return false;
						// 		})
						// 		.set("targetRequired", true)
						// 		.set("complexSelect", true)
						// 		.set("sourcex", event.addedTarget);
						// 	if(relu2.bool){
						// 		// cardsxx = target1.getCards("s", card => card.hasGaintag("sbhuanshi_tag"));
						// 		// if (cardsx.length) {
						// 		// 	if (cards) {
						// 		// 		cards = cards.map(card => {
						// 		// 			if (cardsx.includes(card)) return card.preCard;
						// 		// 			return card;
						// 		// 		});
						// 		// 	}
						// 		// 	if (player.isOnline2()) {
						// 		// 		player.send(
						// 		// 			function (cards, player) {
						// 		// 				cards.forEach(i => i.delete());
						// 		// 				if (player == game.me) ui.updatehl();
						// 		// 			},
						// 		// 			cardsx,
						// 		// 			player
						// 		// 		);
						// 		// 	}
						// 		// 	cardsx.forEach(i => i.delete());
						// 		// 	if (player == game.me) ui.updatehl();
						// 		// }
						// 		let card;
						// 		if (relu2.bool) {
						// 			card = cards.find(card => card.cardid === relu2.cards[0]._cardid);
						// 		}
						// 		cardsx.remove(relu2.cards[0])
						// 	}
						// }
						while(target2.isIn()&&target1.isIn()&&cards.filter(card=>target1.canUse(card,target2,false)&&player.getCards('h').includes(card)).length>0){
							var relu2 = yield target1.chooseButton(['请诛：选择要对'+get.translation(target2)+'用的牌',cards],1,true)
								// .set('addCount',false)
								// .set('ai',function(button){
								// 	return get.value(button.link,_status.event.player,'raw');
								// })
								.set('filterButton',function(button){
									var cardxx=button.link;
									if(target1.canUse(cardxx,target2,false)&&player.getCards('h').includes(cardxx))return lib.filter.filterCard.apply(this,arguments);
									// if(cards.includes(card))return lib.filter.filterCard.apply(this,arguments);
									// return true;
									return false;
								})
								// .set("targetRequired", true)
								// .set("complexSelect", true)
								// .set("sourcex", event.addedTarget);
							if(relu2.bool){
								var cardyx=relu2.links[0];
								yield target1.useCard(cardyx,target2,false);
							}
						}
						yield target1.addTempSkill('yb_wan_qingzhu_buff');
					}
				},
				subSkill:{
					buff:{
						name:'禁牌',
						mod: {
							cardEnabled2(card) {
								if (get.position(card) == "h") return false;
							},
						},
						mark: true,
						intro: {
							content: "不能使用或打出手牌",
						},
						
					}
				}
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
			yb_wan_bohuan:{//搏宦
				audio:'ext:无名扩展/audio/character:2',
				mark:true,
				skillAnimation:true,
				limited:true,
				animationColor:'thunder',
				init:function(player){
					player.storage.yb_wan_bohuan=false;
				},
				enable:'phaseUse',
				filter(event,player){
					return player.storage.yb_wan_bohuan==false&&player.countCards('h')>0;
				},
				content(){
					'step 0'
					event.cards=player.getCards('h');
					player.showCards(event.cards);
					'step 1'
					player.chooseTarget(1,true).set('prompt','搏宦：请选择要倾泻的目标').set('ai',function(target){
						var player=_status.ebent.player;
						return -get.attitude(player,target,player);
					});
					'step 2'
					event.target=result.targets[0];
					event.target.addTempSkill('yb_wan_bohuan_buff');
					'step 3'
					var cardsx=event.cards.filter(card=>player.getCards('h').includes(card)&&player.canUse(card,event.target,false)&&get.tag(card,'damage')>0.5);
					// game.log(cardsx)
					if(cardsx.length){
						player.chooseToUse(event.target,true,get.prompt2('yb_wan_bohuan'))
							.set('addCount',false)
							.set('filterCard',function(card){
								// if(cardsx.includes(card))return lib.filter.filterCard.apply(this,arguments);
								if(cardsx.includes(card)&&player.canUse(card,event.target,false))return true;
								// return true;
								return false;
							})
							.set("targetRequired", true)
							.set("complexSelect", true)
							.set("sourcex", event.addedTarget);
					}
					else{
						event.goto(5);
					}
					'step 4'
					if(result.card){
						event.cards.remove(result.cards[0])
					}
					event.goto(3)
					'step 5'
					event.target.removeSkill('yb_wan_bohuan_buff');
					player.discard(player.getCards('h'));
				},
				subSkill:{
					buff:{
						name:'禁牌',
						mod: {
							cardEnabled2(card) {
								if (get.position(card) == "h") return false;
							},
						},
						mark: true,
						intro: {
							content: "不能使用或打出手牌",
						},
						
					}
				}
			},
			// yb_wan_jiqiao:'机巧',
			// 出牌阶段,你可弃置你区域（装备区、手牌区）任意张装备牌，
			// 选择一名没有“机巧”的角色令其获得“机巧”，然后根据你弃置的牌数，
			// 记述其“机巧”的内容直至其下个回合的结束：
			// 1，一张，其下回合准备阶段亮出牌堆顶一张牌，
			// 其需任意选择自己手牌（最少一张）点数相加等于牌堆顶这张牌点数，
			// 否则其跳过下个出牌阶段。
			// 2，两张，其下回合准备阶段亮出牌堆顶牌堆底各一张牌，你
			// 可令其摸或者弃置亮出的牌的颜色数的牌（此法摸的牌不计入手牌上限），
			// 然后其需任意选择自己手牌（最少一张）点数相加大于亮出的两张牌点数之和，
			// 否则其跳过下个出牌阶段。
			// 3，三张及以上，你可选择令其弃置X张牌或摸X张牌
			// （X为你本次弃置的牌数，此法摸的牌不计入手牌上限），
			// 然后其跳过下个出牌阶段。
			yb_wan_jiqiao:{//机巧
				audio:'ext:无名扩展/audio/character:2',
				YB_jiqiaoyinji:[
					function(player,source){
						var next=game.createEvent('yb_wan_yinmou_2',false);
						next.player=player;
						next.source=source;
						next.setContent(function(){
							var source = event.source;
							'step 0'
							var card=get.cards()[0];
							game.cardsGotoOrdering(card);
							event.card=card;
							game.broadcast(function(card){
								ui.arena.classList.add('thrownhighlight');
								card.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
							},event.card);
							event.node=event.card.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
							ui.arena.classList.add('thrownhighlight');
							game.addVideo('thrownhighlight1');
							game.addVideo('centernode',null,get.cardInfo(event.card));
							'step 1'
							var num = get.number(event.card);
							var next = player.chooseToDiscard(
								"是否弃置任意张点数之和为" + get.cnNumber(num) + "的牌，否则跳过下个出牌阶段。",
								function (card) {
									var num = 0;
									for (var i = 0; i < ui.selected.cards.length; i++) {
										num += get.number(ui.selected.cards[i]);
									}
									return get.number(card) + num <= _status.event.num;
								},
								"he"
							);
							next.set("num", num);
							next.set("complexCard", true);
							next.set("selectCard", function () {
								var num = 0;
								for (var i = 0; i < ui.selected.cards.length; i++) {
									num += get.number(ui.selected.cards[i]);
								}
								if (num == _status.event.num) return ui.selected.cards.length;
								return ui.selected.cards.length + 2;
							});
							next.set(
								"cardResult",
								(function () {
									var cards = player.getCards("he");
									var l = cards.length;
									var all = Math.pow(l, 2);
									var list = [];
									for (var i = 1; i < all; i++) {
										var array = [];
										for (var j = 0; j < l; j++) {
											if (Math.floor((i % Math.pow(2, j + 1)) / Math.pow(2, j)) > 0) array.push(cards[j]);
										}
										var numx = 0;
										for (var k of array) {
											numx += get.number(k);
										}
										if (numx == num) list.push(array);
									}
									if (list.length) {
										list.sort(function (a, b) {
											return get.value(a) - get.value(b);
										});
										return list[0];
									}
									return list;
								})()
							);
							next.set("ai", function (card) {
								if (!_status.event.cardResult.includes(card)) return 0;
								return 6 - get.value(card);
							});
							// if(player.countCards('he')>0){
							// 	player.chooseCard([1,Infinity]).set('prompt','需任意选择自己手牌（最少一张）点数相加等于牌堆顶这张牌点数，否则跳过下个出牌阶段。').set('ai',function(card){
							// 		return 6-get.value(card);
							// 	}).set('filterCard',function(cardx){
									
							// 	});
							// }
							// else event._result = false;
							'step 2'
							if(!result.bool){
								player.skip("phaseUse");
								event.finish();
							};
							'step 3'
							// event.card.discard();
							game.addVideo('deletenode',player,[get.cardInfo(event.node)]);
							event.node.delete();
							game.broadcast(function(card){
								ui.arena.classList.remove('thrownhighlight');
								if(card.clone){
									card.clone.delete();
								}
							},event.card);
						});
					},
					function(player,source){
						var next=game.createEvent('yb_wan_yinmou_2',false);
						next.player=player;
						next.source=source;
						next.setContent(function(){
							var source = event.source;
							'step 0'
							var card=get.cards()[0];
							var card2=get.bottomCards()[0];
							event.card=[card,card2];
							game.cardsGotoOrdering(event.card);
							game.broadcast(function(card){
								ui.arena.classList.add('thrownhighlight');
								card.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
							},event.card);
							event.node1=card.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
							event.node2=card2.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
							event.node=[event.node1,event.node2];
							ui.arena.classList.add('thrownhighlight');
							game.addVideo('thrownhighlight1');
							game.addVideo('centernode',null,get.cardInfo(event.card));
							'step 1'
							event.numl=[];
							for(var z of event.card){
								if(!event.numl.includes(get.color(z)))event.numl.push(get.color(z));
							}
							if(event.numl.length){
								source.chooseControl('令他摸','令他弃','cancel2').ai=function(event,player){
									if(get.attitude(_status.event.player,target)>0)return 0;
									else return 1;
								}
							}
							else event.goto(3)
							'step 2'
							if(!result){
								event.goto(3)
							}
							else if(result.index==0){
								player.draw(event.numl.length).gaintag=['yb_wan_jiqiao_card'];
							}
							else if(result.index==1){
								player.chooseToDiscard('he',event.numl.length,true);
							}
							'step 3'
							var num = get.number(event.card[0])+get.number(event.card[1]);
							var next = player.chooseToDiscard(
								"是否弃置任意张点数之和为" + get.cnNumber(num) + "的牌，否则跳过下个出牌阶段。",
								function (card) {
									var num = 0;
									for (var i = 0; i < ui.selected.cards.length; i++) {
										num += get.number(ui.selected.cards[i]);
									}
									return get.number(card) + num <= _status.event.num;
								},
								"he"
							);
							next.set("num", num);
							next.set("complexCard", true);
							next.set("selectCard", function () {
								var num = 0;
								for (var i = 0; i < ui.selected.cards.length; i++) {
									num += get.number(ui.selected.cards[i]);
								}
								if (num == _status.event.num) return ui.selected.cards.length;
								return ui.selected.cards.length + 2;
							});
							next.set(
								"cardResult",
								(function () {
									var cards = player.getCards("he");
									var l = cards.length;
									var all = Math.pow(l, 2);
									var list = [];
									for (var i = 1; i < all; i++) {
										var array = [];
										for (var j = 0; j < l; j++) {
											if (Math.floor((i % Math.pow(2, j + 1)) / Math.pow(2, j)) > 0) array.push(cards[j]);
										}
										var numx = 0;
										for (var k of array) {
											numx += get.number(k);
										}
										if (numx == num) list.push(array);
									}
									if (list.length) {
										list.sort(function (a, b) {
											return get.value(a) - get.value(b);
										});
										return list[0];
									}
									return list;
								})()
							);
							next.set("ai", function (card) {
								if (!_status.event.cardResult.includes(card)) return 0;
								return 6 - get.value(card);
							});
							// if(player.countCards('he')>0){
							// 	player.chooseCard([1,Infinity]).set('prompt','需任意选择自己手牌（最少一张）点数相加等于牌堆顶这张牌点数，否则跳过下个出牌阶段。').set('ai',function(card){
							// 		return 6-get.value(card);
							// 	}).set('filterCard',function(cardx){
									
							// 	});
							// }
							// else event._result = false;
							'step 4'
							if(!result.bool){
								player.skip("phaseUse");
								event.finish();
							};
							'step 5'
							// player.discard();
							game.addVideo('deletenode',player,[get.cardInfo(event.node)]);
							event.node.delete();
							game.broadcast(function(card){
								ui.arena.classList.remove('thrownhighlight');
								if(card.clone){
									card.clone.delete();
								}
							},event.card);
						});
					},
					function(player,source){
						player.skip("phaseUse");
					},
				],
				enable:'phaseUse',
				// usable:1,
				selectCard:[1,Infinity],
				filterCard(card){
					return get.type(card)=='equip'
				},
				position:'he',
				selectTarget:1,
				filterTarget(card,player,target){
					return !target.hasSkill('yb_wan_jiqiao_mark');
				},
				*content(event,map){
					let player=map.player,cards=event.cards,target=event.target;
					yield target.addTempSkill('yb_wan_jiqiao_mark',{player:'phaseAfter'})
					if(cards.length>=3){
						var num3=cards.length;
						var relu = yield player.chooseControl('令他摸','令他弃','cancel2').set('ai',function(){
							var att = get.attitude(_status.event.player,target);
							if (att>0)return 0;
							return 1;
						}).set('prompt','请选择令'+get.translation(target)+'摸还是弃'+num3+'张牌');
						if(relu.index==0){
							yield target.draw(num3).gaintag=['yb_wan_jiqiao_card'];
						}
						else if (relu.index==1){
							yield target.chooseToDiscard('he',num3,true);
						}
					}
					yield target.storage.yb_wan_jiqiao_mark=[player,target,cards.length-1];
				},
				global:'yb_wan_jiqiao_card',
				subSkill:{
					mark:{
						audio:'yb_wan_jiqiao',
						mark: true,
						intro: {
							content:function(event,player,storage,name,skill){
								if(!player.storage.yb_wan_jiqiao_mark)return '无效果';
								var list=player.storage.yb_wan_jiqiao_mark;
								var num=Math.min(list[2],2),a=get.translation(list[0]),b=get.translation(list[1]);
								switch(num){
									case 0:var str = `${b}下回合准备阶段亮出牌堆顶一张牌，${b}需任意选择自己手牌（最少一张）点数相加等于牌堆顶这张牌点数，否则${b}跳过下个出牌阶段。`;break;
									case 1:var str = `${b}下回合准备阶段亮出牌堆顶牌堆底各一张牌，${a}可令${b}摸或者弃置亮出的牌的颜色数的牌（此法摸的牌不计入手牌上限），然后${b}需任意选择自己手牌（最少一张）点数相加大于亮出的两张牌点数之和，否则${b}跳过下个出牌阶段。`;break;
									case 2:var str = `${b}跳过下个出牌阶段。`;break;
								}
								if(str)return str;
								else return '无';
							},
						},
						direct:true,
						trigger:{
							player:'phaseZhunbeiBegin',
						},
						filter(event,player){
							return player.storage.yb_wan_jiqiao_mark;
						},
						content(){
							var list=player.storage.yb_wan_jiqiao_mark;
							var num=Math.min(list[2],2);
							lib.skill.yb_wan_jiqiao.YB_jiqiaoyinji[num](list[1],list[0]);
						},
						onremove:true,
					},
					card:{
						charlotte:true,
						mod:{
							ignoredHandcard:function(card,player){
								if(card.hasGaintag('yb_wan_jiqiao_card')) return true;
							},
							cardDiscardable:function(card,player,name){
								if(name=='phaseDiscard'&&card.hasGaintag('yb_wan_jiqiao_card')) return false;
							},
						},
					}
				}
			},

			"yb_wan_xueyi": {//血裔
				audio:'ext:无名扩展/audio/character:2',
				forced: true,
				trigger: {
					player: "phaseDrawBegin",
				},
				filter: (event, player) => {
					return !event.numFixed;
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
				audio:'ext:无名扩展/audio/character:2',
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
				audio:'ext:无名扩展/audio/character:2',
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
						audio:'ext:无名扩展/audio/character:2',
						trigger: { player: "useCard" },
						forced: true,
						firstDo:true,
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
				audio:'ext:无名扩展/audio/character:2',
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
						audio:'yb_wan_yaoji',
						trigger:{player:'damageBegin3'},
						filter:()=>true,
						content:()=>trigger.cancel(),
						forced:true,
					},
				}
			},
			yb_wan_luosuo:{//落锁
				audio:'ext:无名扩展/audio/character:2',
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
								if(get.type(z)=='equip'){
									if(event.type!='use')cards.push(z);
								}
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
				audio:'ext:无名扩展/audio/character:2',
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
				marktext:'艺',
				intro:{
					mark:function(dialog,storage,player){
						var numb = player.getExpansions('yb_wan_xueyii').length||0;
						dialog.addText('至其他角色的距离-'+numb);
						dialog.addSmall([player.getExpansions('yb_wan_xueyii'),'card']);
					},
				},
			},
			yb_wan_suyi:{//溯艺
				audio:'ext:无名扩展/audio/character:2',
				forced:true,
				skillAnimation:true,
				animationColor:'thunder',
				unique:true,
				juexingji:true,
				trigger:{
					player:'yb_wan_xueyiiAfter',
				},
				filter(e,p){
					return !p.storage.yb_wan_suyi&&p.getExpansions('yb_wan_xueyii')?.length>=4;
				},
				// contentBefore: function () {
				// 	player.awakenSkill("yb_wan_suyi");
				// },
				content(){
					'step 0'
					player.awakenSkill("yb_wan_suyi");
					'step 1'
					player.loseMaxHp();
					
					'step 2'
					// player.removeSkill('yb_wan_xueyii');
					player.addSkill('yb_wan_qiangyi');
				},
				derivation:'yb_wan_qiangyi',
				init:function(player){
					player.storage.yb_wan_suyi=false;
				},
				
			},
			yb_wan_qiangyi:{//枪意
				audio:'ext:无名扩展/audio/character:2',
				trigger: { player: "useCard" },
				// direct: true,
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
				async cost(event, trigger, player){
					var cards = player.getExpansions('yb_wan_xueyii');
					if(!cards){
						event.result = {
							bool: false,
						};
					}
					else {
						const { result } = await player.chooseButton([get.prompt("yb_wan_qiangyi"), cards], 1).set("ai", function () {
							return 1;
						});
						if (result.bool)
							event.result = {
								bool: true,
								cards: result.links,
							};
					}
				},
				content() {
					"step 0";
					if(!event.cards){
						event.finish();
					}
					else {
						player.discard(event.cards);
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
				audio:'ext:无名扩展/audio/character:2',
				init(player){
					player.expandEquip(1);
				},
				mod:{
					maxHandcard:function(player,num){
						var numb=0;
						if(player.countCards('e')>0)for(var i of player.getCards('e')){
							if(get.subtype(i)=='equip1')numb++;
						}
						return num+numb;
					}
				}
			},
			yb_wan_fushui:{//符水
				audio:'ext:无名扩展/audio/character:2',
				enable: "phaseUse",
				filterCard: true,
				check(card) {
					return 9 - get.value(card);
				},
				filterTarget(card, player, target) {
					if (target.hp >= target.maxHp) return false;
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
				audio:'ext:无名扩展/audio/character:2',
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
						return current != player&&current.countMark('yb_wan_fushui_mark')>0;
					}).length>0;
				},
				filterTarget: function (card, player, target) {
					return target != player&&target.countMark('yb_wan_fushui_mark');
				},
				selectTarget: -1,
				// multitarget: true,
				// multiline: true,
				contentBefore: function () {
					player.awakenSkill("yb_wan_huantian");
				},
				content(){
					player.gain(target.getCards('h'));
				},
				contentAfter: function () {
					player.removeSkill('yb_wan_fushui');
					player.addSkill('yb_wan_huantian_damage');
				},
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
				},
				ai:{
					combo:'yb_wan_fushui',
				}

			},
			yb_wan_huangtian:{//黄天
				audio:'ext:无名扩展/audio/character:2',
				unique: true,
				zhuSkill: true,
				// global:'yb_wan_huangtian_draw',
				group:'yb_wan_huangtian_draw',
				subSkill:{
					draw:{
						audio:'yb_wan_huangtian',
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
			yb_wan_qiangxia:{//枪匣
				audio:'ext:无名扩展/audio/character:2',
				forced:true,
				trigger:{
					global:['gameStart'],
					player:['gameStart','phaseUseBegin','phaseJieshuBegin'],
				},
				getQiangxia:function(){
					return [
						['yb_wan_sulinqiang',Math.random()>0.5?'spade':'club',Math.floor(Math.random()*13)+1],
						['yb_wan_cangleishuo',Math.random()>0.5?'spade':'club',Math.floor(Math.random()*13)+1],
						['yb_wan_chaoximao',Math.random()>0.5?'spade':'club',Math.floor(Math.random()*13)+1],
						['yb_wan_cangdaici',Math.random()>0.5?'spade':'club',Math.floor(Math.random()*13)+1],
						// 'yb_wan_sulinqiang','yb_wan_cangleishuo','yb_wan_chaoximao','yb_wan_cangdaici'
					]
				},
				filter(event,player){
					return player.hasEnabledSlot(1);
				},
				*content(event,map){
					let trigger=map.trigger,player=map.player;
					var cardlist=[];
					// 	var equips=[
					// 	'yb_wan_sulinqiang','yb_wan_cangleishuo',
					// 	'yb_wan_chaoximao','yb_wan_cangdaici'
					// ];
					var qiangxia = lib.skill.yb_wan_qiangxia.getQiangxia();
					var num=player.countEquipableSlot(1)>1?2:1;player.countEmptySlot(i)
					var dialog = [`选择${num}张装备牌`];
					for(var i of qiangxia){
						var cardx=[i[1],i[2],i[0]];
						yield cardlist.push(cardx);
					}
					// for(var i of equips){
					// 	// var suit = ['spade','club'].randomGets(1);
					// 	var suit =Math.random()>0.5?'spade':'club';
					// 	var cardx=[suit,Math.floor(Math.random()*13)+1,i];
					// 	yield cardlist.push(cardx);
					// }
					yield dialog.push([cardlist,'vcard']);
					var relu = yield player.chooseButton(dialog,num);
					if(relu.bool){
						var cards = relu.links,cardxs=[];
						for(var k=0;k<cards.length;k++ ){
							var cc=game.createCard(cards[k][2],cards[k][0],cards[k][1],null);
							yield player.addSkill("yb_wan_qiangxia_destroy");
							if(!player.storage.yb_wan_qiangxia_destroy)yield player.storage.yb_wan_qiangxia_destroy=[];
							yield player.storage.yb_wan_qiangxia_destroy.push(cc);
							yield cardxs.push(cc);
						}
						for(var z of cardxs){
							yield player.equip(z);
						}
					}
				},
				subSkill: {
					used: { charlotte: true, onremove: true },
					destroy: {
						audio:'yb_wan_qiangxia',
						trigger: { player: "loseBegin" },
						// trigger: { global: ["loseEnd", "cardsDiscardEnd"] },
						forced: true,
						charlotte: true,
						popup: false,
						onremove: true,
						filter: function (event, player) {
							const evt = event.getl(player);
							if (event.name == "lose" &&!evt.es) return false;
							var storage = player.storage.yb_wan_qiangxia_destroy;
							if (!storage) return false;
							for (var i of event.cards) {
								if (storage.includes(i)) return true;
							}
							return false;
						},
						content: function () {
							var cards = [];
							var storage = player.storage.yb_wan_qiangxia_destroy;
							for (var i of trigger.cards) {
								if (storage.includes(i)) {
									// delete _status.yb_wan_qiangxia_map[i.name];
									i._destroy = true;
									storage.remove(i);
									cards.push(i);
								}
							}
							// game.cardsGotoSpecial(cards);
							// game.log(cards, "被撕掉了");
							if (!storage.length) player.removeSkill("yb_wan_qiangxia_destroy");
						},
					},
				},
			},
			yb_wan_sulinqiang:{//溯麟枪
				charlotte:true,
				equipSkill:true,
				enable: ["chooseToUse", "chooseToRespond"],
				//发动时提示的技能描述
				prompt: "将锦囊牌当做无懈可击，闪当杀使用或打出",
				//动态的viewAs
				viewAs(cards, player) {
					if (cards.length) {
						var name = false;
						if(get.name(cards[0])=='shan'){
							name = 'sha';
						}
						else if(get.type2(cards[0])=='trick'){
							name = 'wuxie';
						}
						if (name) return { name: name,};
					}
					return null;
				},
				//AI选牌思路
				check(card) {
					return 20 - get.value(card);
				},
				selectCards:1,
				position: "hes",
				//选牌合法性判断
				filterCard(card, player, event) {
					event = event || _status.event;
					var filter = event._backup.filterCard;
					if (get.name(card)=='shan'&& filter(get.autoViewAs({ name: "sha"}, "unsure"), player, event)) return true;
					if (get.type2(card)=='trick'&& filter(get.autoViewAs({ name: "wuxie" }, "unsure"), player, event)) return true;
					return false;
				},
				//判断当前时机能否发动技能
				filter(event, player) {
					//获取当前时机的卡牌选择限制
					var filter = event.filterCard;
					if (filter(get.autoViewAs({ name: "sha" }, "unsure"), player, event) && player.countCards("hes",function(card){
						return get.name(card)=='shan';
					})) return true;
					if (filter(get.autoViewAs({ name: "wuxie" }, "unsure"), player, event) && player.countCards("hes",function(card){
						return get.type2(card)=='trick';
					})) return true;
					return false;
				},
				ai: {
					respondSha: true,
					//让系统知道角色“有杀”“有闪”
					skillTagFilter(player, tag) {
						if (!player.countCards("hes", { name: 'shan' })) return false;
					},
					//AI牌序
					order(item, player) {
						return 2;
					},
				},
				//让系统知道玩家“有无懈”“有桃”
				hiddenCard(player, name) {
					if (name == "wuxie" && _status.connectMode && player.countCards("hs") > 0) return true;
					if (name == "wuxie") return player.countCards("hes",function(card){
						return get.type2(card)=='trick';
					}) > 0;
					if (name == "sha") return player.countCards("hes",function(card){
						return get.name(card)=='shan';
					}) > 0;
				},
				mod: {
					aiValue(player, card, num) {
						if (num <= 0) return num;
						let suit = get.type2(card, player);
						if (suit === "trick") return num + 1.8;
					},
					aiUseful(player, card, num) {
						if (num <= 0) return num;
						let suit = get.type2(card, player);
						if (suit === "trick") return num + 1;
					},
				},
			},
			yb_wan_cangleishuo:{//沧泪槊
				charlotte:true,
				equipSkill:true,
				trigger:{
					player:['useCard','useCardToTargeted'],
				},
				logTarget: function (event, player,name) {
					if (event.card.name == "sha"){
						return event.target;
					}
					return event.respondTo[0];
				},
				filter(event,player,name){
					if (event.card.name != "sha" && event.card.name != "shan") return false;
					var target = lib.skill.yb_wan_cangleishuo.logTarget(event, player);
					if (event.card.name == "sha"){
						if(name=='useCardToTargeted')return target;
						return false;
					}
					if(target.isIn()){
						if(name=='useCard')return player.canUse('sha',target);
					}
				},
				content(){
					// var target = lib.skill.yb_wan_cangleishuo.logTarget(trigger, player,event.triggername);
					if(event.triggername=='useCardToTargeted'){
						trigger.getParent().directHit.push(trigger.target);
					}
					else{
						player.useCard({name:'sha',isCard:false},trigger.respondTo[0],false);
					}
				}
			},
			yb_wan_chaoximao:{//潮汐矛
				charlotte:true,
				equipSkill:true,
				trigger:{
					player:['useCard','respond'],
				},
				filter(event,player,name){
					return get.type2(event.card)=='basic';
				},
				content(){
					player.draw();
				}

			},
			yb_wan_cangdaici1:{//藏黛刺1
				charlotte:true,
				equipSkill:true,
				trigger: { player: "useCardToPlayered" },
				check: function (event, player) {
					return get.attitude(player, event.target) <= 0;
				},
				filter: function (event, player) {
					return event.card.name == "sha";
				},
				logTarget: "target",
				content: function () {
					if (!trigger.target.hasSkill("fengyin")) {
						trigger.target.addTempSkill("fengyin");
					}
				},

			},
			yb_wan_cangdaici2:{//藏黛刺2
				charlotte:true,
				equipSkill:true,
				enable: ["chooseToRespond", "chooseToUse"],
				filterCard: { name: "sha" },
				viewAs: { name: "shan" },
				prompt: "将一张杀当闪使用或打出",
				check() {
					return 1;
				},
				position: "hs",
				viewAsFilter(player) {
					if (!player.countCards("hs", "sha")) return false;
				},
				ai: {
					respondShan: true,
					skillTagFilter(player) {
						if (!player.countCards("hs", "sha")) return false;
					},
					effect: {
						target(card, player, target, current) {
							if (get.tag(card, "respondShan") && current < 0) return 0.6;
						},
					},
					order: 4,
					useful: -1,
					value: -1,
				},

			},

			yb_wan_xianshuai:{//先率
				audio:'ext:无名扩展/audio/character:2',
				trigger:{
					player:'useCard',
				},
				direct:true,
				firstDo:true,
				filter(event,player){
					return _status.currentPhase==player&&get.name(event.card)=='sha'&&player.getHistory('useCard',function(evt){
						return get.name(evt.card)=='sha'&&evt!=event;
					}).length<1;
				},
				*content(event,map){
					let trigger=map.trigger,player=map.player;
					// yield trigger.card.yb_wan_xianshuai=true;
					yield player.storage.yb_wan_xianshuai=trigger.card;
					yield player.when({
						source:'damageAfter',
						player:'useCardAfter',
					}).filter(function(event,player,name){
						return player.storage.yb_wan_xianshuai==event.card;
					}).then(function(){
						delete player.storage.yb_wan_xianshuai;
						if(event.triggername=='damageAfter'){
							player.chooseBool('是否增加一点体力上限并回复一点体力？');
						}
						else {
							if (!player.getHistory('sourceDamage',function(evt){
								return evt.card==trigger.card;
							}).length){
								player.logSkill('yb_wan_xianshuai')
								player.draw(2);
							}
						}
					}).then(()=>{
						if(result.bool){
							player.logSkill('yb_wan_xianshuai');
							player.gainMaxHp();
							player.recover();
						}
					})
					// yield player.when({
					// 	source:'damageAfter'
					// }).filter(function(event,player){
					// 	// return event.card.yb_wan_xianshuai==true
					// 	return player.storage.yb_wan_xianshuai==event.card;
					// }).then(function(){
					// 	player.chooseBool('是否增加一点体力上限并回复一点体力？');
					// }).then(()=>{
					// 	if(result.bool){
					// 		player.logSkill('yb_wan_xianshuai');
					// 		player.gainMaxHp();
					// 		player.recover();
					// 	}
					// })
					// yield player.when({
					// 	player:'useCardAfter'
					// }).filter(function(event,player){
					// 	// return event.card.yb_wan_xianshuai==true;
					// 	return player.storage.yb_wan_xianshuai==event.card&&!player.getHistory('sourceDamage',function(evt){
					// 		return evt.card==event.card;
					// 	}).length;
					// }).then(() => {
					// 	player.logSkill('yb_wan_xianshuai')
					// 	player.draw(2);
					// })
				}
			},

			yb_wan_zeishi:{//贼势
				audio:'ext:无名扩展/audio/character:2',
				trigger:{
					player:'damageBegin3',
				},
				direct:true,
				*content(event,map){
					let trigger= map.trigger,player=map.player;
					if(player.storage.yb_wan_zeishi_mark){
						yield player.logSkill('yb_wan_zeishi');
						yield trigger.num+=player.storage.yb_wan_zeishi_mark;
						// delete player.storage.yb_wan_zeishi_mark;
						yield player.removeSkill('yb_wan_zeishi_mark');
					}
					const numb=trigger.num;
					var relu = yield player.chooseToDiscard(numb,'he').set('prompt',get.prompt2('yb_wan_zeishi'));
					if(relu.bool){
						yield player.addTempSkill('yb_wan_zeishi_mark');
						yield player.storage.yb_wan_zeishi_mark=numb;
						yield trigger.num-=numb;
					}
				},
				// cost(){
				// 	event.result = player
				// }
				subSkill:{
					mark:{
						mark:true,
						marktext:'積',
						intro:{
							content:'下次受到伤害增加$'
						},
						onremove:true,
						charlotte:true,
					}
				}
			},
			yb_wan_zhujian:{//铸剑
				audio:'ext:无名扩展/audio/character:2',
				enable:'phaseUse',
				filter(event,player){
					return  player.countEmptySlot(1)>0&&player.getEquips(1)<=0;
				},
				selectCard:1,
				filterCard(card){
					return get.color(card)=='black';
				},
				content(){
					var card = get.cardPile("cixiong", "field");
					get.cardPile()
					if (card) {
						player.equip(card, "gain2", "log");
					}
					else {
						player.equip(game.createCard('cixiong','spade',2,null), "gain2", "log")
					}
				},
				ai:{
					order:6,
					result:{
						player:1,
					}
				}
			},
			yb_wan_zhudao:{//铸刀
				audio:'ext:无名扩展/audio/character:2',
				enable:'phaseUse',
				filter(event,player){
					return  player.countEmptySlot(1)>0&&player.getEquips(1)<=0;
				},
				selectCard:1,
				filterCard(card){
					return get.color(card)=='black';
				},
				content(){
					var card = get.cardPile("qinglong", "field");
					if (card) {
						player.equip(card, "gain2", "log");
					}
					else {
						player.equip(game.createCard('qinglong','spade',5,null), "gain2", "log")
					}
				},
				ai:{
					order:6,
					result:{
						player:1.5,
					}
				}
			},
			yb_wan_zhumao:{//铸矛
				audio:'ext:无名扩展/audio/character:2',
				enable:'phaseUse',
				filter(event,player){
					return  player.countEmptySlot(1)>0&&player.getEquips(1)<=0;
				},
				selectCard:1,
				filterCard(card){
					return get.color(card)=='black';
				},
				content(){
					var card = get.cardPile("zhangba", "field");
					if (card) {
						player.equip(card, "gain2", "log");
					}
					else {
						player.equip(game.createCard('zhangba','spade',12,null), "gain2", "log")
					}
				},
				ai:{
					order:6,
					result:{
						player:2,
					}
				}
			},
			yb_wan_jici:{//疾刺
				audio:'ext:无名扩展/audio/character:2',
				trigger:{
					player:'useCardAfter',
				},
				filter(event,player){
					return _status.currentPhase==player&&get.name(event.card)=='sha'&&player.getHistory('useCard',function(evt){
						return get.name(evt.card)=='sha'&&evt!=event;
					}).length<1&&event.targets.filter(current => current.isAlive() && player.canUse(event.card, current, false)).length>0;
				},
				cost(){
					event.result = player.chooseToDiscard('h').set('ai', function (card) {
						var num=0;
						for(var i of trigger.targets){
							num-=get.attitude(_status.event.player,i)
						}
						if(num>0)return  6 - get.value(card);
					}).set("chooseonly", true).set('prompt2',get.prompt2('yb_wan_jici')).forResult();
				},
				content(){
					player.discard(event.cards);
					player.useCard(trigger.card,trigger.targets,'yb_wan_jici',false);
				}
			},
			yb_wan_shuanggu:{//双股
				audio:'ext:无名扩展/audio/character:2',
				mod: {
					cardUsable: function (card, player, num) {
						if (card.name == "sha"&&player.getEquips(1)>0) return num + 1;
					},
				},
			},
			yb_wan_yijie:{//义结
				audio:'ext:无名扩展/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filter(event,player){
					// if(!ui.selected.targets)return false;
					// var target = ui.selected.targets[0];
					// game.log(get.translation(target));
					// // var target = targets[0];
					// return game.filterPlayer(
					// 	function(current){
					// 		return current!=player
					// 		&&current!=target&&player.canCompare(current)
					// 	}
					// ).length>0;
					return true;
				},
				multitarget:true,
				selectTarget:1,
				filterTarget(card,player,target){
					return game.filterPlayer(
						function(current){
							return current!=player
							&&current!=target&&player.canCompare(current)
						}
					).length>0;
					// return player!=target;
				},
				*content(event,map){
					let player=map.player,taarget=event.target;
					var list=[player];
					var relu = yield player.chooseTarget(get.prompt2('yb_wan_yijie'),function(card,player,target){//选1个目标
						return player!=target&&taarget!=target&&player.canCompare(target);//限制条件:你不是目标
					},function(target){//ai:
						var player=get.player();//定义变量player为选目标的发起者(不懂可以先不写)
						return target.countCards('h')-get.attitude(player,target);//选敌人
					},true);
					if(relu.bool){
						var target1=relu.targets[0];
						var relu1 = yield player.chooseToCompare(target1);
						if(relu1.bool){
							yield list.push(target1)
							yield player.gain([relu1.player],'gain2','log');
						}
						else if(relu1.tie){
							yield list.push(target2)
						}
					}
					if(game.countPlayer(function(current){
						return player!=current&&taarget!=current&&player.canCompare(current)&&current!=target1;
					})){
						var relux = yield player.chooseTarget(get.prompt2('yb_wan_yijie'),function(card,player,target){//选1个目标
							return player!=target&&taarget!=target&&player.canCompare(target)&&target!=target1;//限制条件:你不是目标
						},function(target){//ai:
							var player=get.player();//定义变量player为选目标的发起者(不懂可以先不写)
							return target.countCards('h')-get.attitude(player,target);//选敌人
						},true);
						if(relux.bool){
							var target2=relux.targets[0];
							var relu2 = yield player.chooseToCompare(target2);
							if(relu2.bool){
								yield list.push(target2)
								yield player.gain([relu2.player],'gain2','log');
							}
							else if(relu2.tie){
								yield list.push(target2)
							}
						}
					}
					for(var i of list){
						if(i.isIn()&&taarget.isIn()){
							i.line(taarget);
							yield taarget.damage(i);
							game.delay(1);
						}
					}
				}
			},
			yb_wan_yingai:{//荫盖
				audio:'ext:无名扩展/audio/character:2',
				zhuSkill:true,
				unique: true,
				mod:{
					maxHandcardBase: function (player, num) {
						var numb=0;
						game.filterPlayer(function(i){
							if(i.maxHp>numb)numb=i.maxHp;
						});
						return numb; 
					},
					// maxHandcard:function(player,num){
					// 	var numb=0;
					// 	game.filterPlayer(function(i){
					// 		if(i.maxHp>numb)numb=i.maxHp;
					// 	});
					// 	return numb; 
					// }
				}
			},
			yb_wan_xiayi:{//侠义
				audio:'ext:无名扩展/audio/character:2',
				trigger:{
					source:'damageAfter',
				},
				getIndex(event, player) {
					return event.num;
				},
				prompt2:'<span class=yellowtext>每当你造成一点伤害你可弃置一张手牌视为使用一张五谷丰登。</span>锁定技，当你拼点拼输可将你的拼点牌收回。每个回合限一次，当一名角色受到伤害后你可选择与伤害来源拼点，若你赢你可对伤害来源角色造成一点伤害。',
				async cost(event, trigger, player){
					event.result=await player.chooseToDiscard('h',get.prompt2('yb_wan_xiayi')).set("chooseonly", true).set("ai", function (card) {
						// if (!_status.event.cardResult.includes(card)) return 0;
						return 4 - get.value(card);
					}).forResult();
				},
				content(){
					player.discard(event.cards);
					player.chooseUseTarget(
						get.prompt('yb_wan_xiayi'),
						'侠义：视为使用一张五谷。',
						{name:'wugu',isCard:false},
					)/*.set('logSkill','yb_wan_xiayi')*/.set('addCount',false);
					// player.useCard();
				},
				group:['yb_wan_xiayi_zongshi','yb_wan_xiayi_zhuandui'],
				subSkill:{
					zongshi:{
						audio:'ext:无名扩展/audio/character:2',
						locked:true,
						trigger: {
							player: ["chooseToCompareAfter", "compareMultipleAfter"],
							target: ["chooseToCompareAfter", "compareMultipleAfter"],
						},
						prompt2:'每当你造成一点伤害你可弃置一张手牌视为使用一张五谷丰登。<span class=yellowtext>锁定技，当你拼点拼输可将你的拼点牌收回。</span>每个回合限一次，当一名角色受到伤害后你可选择与伤害来源拼点，若你赢你可对伤害来源角色造成一点伤害。',
						filter: function (event, player) {
							if (event.preserve) return false;
							if (player == event.player) {
								if (event.num1 > event.num2) {
									return false;
								} else {
									return !get.owner(event.card1);
								}
							} else {
								if (event.num1 < event.num2) {
									return false;
								} else {
									return !get.owner(event.card2);
								}
							}
						},
						check: function (event, player) {
							if (player == event.player) {
								if (event.num1 > event.num2) {
									return event.card2.name != "du";
								} else {
									return event.card1.name != "du";
								}
							} else {
								if (event.num1 < event.num2) {
									return event.card1.name != "du";
								} else {
									return event.card2.name != "du";
								}
							}
						},
						content: function () {
							if (player == trigger.player) {
								if (trigger.num1 > trigger.num2) {
									// player.gain(trigger.card2, "gain2", "log");
									event.finish();
								} else {
									player.gain(trigger.card1, "gain2", "log");
								}
							} else {
								if (trigger.num1 < trigger.num2) {
									event.finish();
									// player.gain(trigger.card1, "gain2", "log");
								} else {
									player.gain(trigger.card2, "gain2", "log");
								}
							}
						},

					},
					zhuandui:{
						usable:1,
						trigger:{
							global:'damageAfter',
						},
						filter(event,player){
							return event.source&&event.source.isIn()&&player.canCompare(event.source);
						},
						prompt2:'每当你造成一点伤害你可弃置一张手牌视为使用一张五谷丰登。锁定技，当你拼点拼输可将你的拼点牌收回。<span class=yellowtext>每个回合限一次，当一名角色受到伤害后你可选择与伤害来源拼点，若你赢你可对伤害来源角色造成一点伤害。</span>',
						content(){
							'step 0'
							player.chooseToCompare(trigger.source);
							'step 1'
							if(result.bool){
								trigger.source.damage(player);
							}
						}
					}
				}
			},
			yb_wan_jiazi:{//家资
				audio:'ext:无名扩展/audio/character:2',
				trigger:{player:['gameDrawBegin']},
				// trigger: { global: "phaseBefore", player: "enterGame" },
				forced: true,
				filter: function (event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				content: function () {
					player.draw(2);
				},
			},
			yb_wan_haoqi:{//豪气
				audio:'ext:无名扩展/audio/character:2',
				locked:true,
				trigger: {
					player: ["chooseToCompareAfter", "compareMultipleAfter"],
					target: ["chooseToCompareAfter", "compareMultipleAfter"],
				},
				filter: function (event, player) {
					if (event.preserve) return false;
					if (player == event.player) {
						if (event.num1 > event.num2) {
							return !get.owner(event.card2);
						} else {
							return false;
						}
					} else {
						if (event.num1 < event.num2) {
							return !get.owner(event.card1);
						} else {
							return false;
						}
					}
				},
				cost(){
					event.result=player.chooseTarget(get.prompt2('yb_wan_haoqi')).set("ai", function (target) {
						let player = _status.event.player;
						if (
							target.hasSkillTag(
								"filterDamage",
								null,
								{
									player: player,
								},
								true
							)
						)
							return get.damageEffect(target, player, player);
						return 2 * get.damageEffect(target, player, player);
					}).forResult();
				},
				content: function () {
					event.targets[0].damage();
				},
				prompt2:'<span class=yellowtext>锁定技，当你拼点拼赢时，你可对一名角色造成一点伤害。</span>出牌阶段，每回合限一次，你可选择与一名角色拼点，若你输你可摸一张牌并可将这张牌交给一名角色。',
				group:'yb_wan_haoqi_use',
				subSkill:{
					use:{
						audio:'yb_wan_haoqi',
						enable:'phaseUse',
						usable:1,
						prompt2:'锁定技，当你拼点拼赢时，你可对一名角色造成一点伤害。<span class=yellowtext>出牌阶段，每回合限一次，你可选择与一名角色拼点，若你输你可摸一张牌并可将这张牌交给一名角色。</span>',
						filterTarget(card, player, target) {
							return player.canCompare(target);
						},
						filter(event, player) {
							return player.countCards("h") > 0;
						},
						*content(event,map) {
							let player=map.player;
							const relu = yield player.chooseToCompare(event.target);
							if (!relu.bool) {
								var relu2 = yield player.draw();
								const cards = relu2;
								if(player.getCards('h').includes(cards[0]))var relu3 = yield player.chooseTarget().set('ai',function(target){return false})
								// var result = yield player.chooseCardTarget({
								// 	filterCard: function (card) {
								// 		return cards.includes(card);
								// 	},
								// 	filterTarget: lib.filter.notMe,
								// 	selectCard: [1, event.num],
								// 	prompt: "请选择要分配的卡牌和目标",
								// 	ai1: function (card) {
								// 		if (!ui.selected.cards.length) return 1;
								// 		return 0;
								// 	},
								// 	ai2: function (target) {
								// 		var player = _status.event.player,
								// 			card = ui.selected.cards[0];
								// 		var val = target.getUseValue(card);
								// 		if (val > 0) return val * get.attitude(player, target) * 2;
								// 		return get.value(card, target) * get.attitude(player, target);
								// 	},
								// });
								if(relu3.bool){
									relu3.targets[0].gain(cards);
									// var res = result.cards,
									// 	target = result.targets[0].playerid;
								}
							}
						},

					}
				}
			},
			yb_wan_yaoshu:{//妖术
				audio:'ext:无名扩展/audio/character:2',
				trigger:{
					player:'useCardToTargeted',
					target:'useCardToTargeted',
				},
				filter(event,player){
					return get.name(event.card)=='sha';
				},
				async cost(event, trigger, player){
					event.result=await player.chooseToDiscard('h',get.prompt2('yb_wan_yaoshu')).set("chooseonly", true).set("ai", function (card) {
						// if (!_status.event.cardResult.includes(card)) return 0;
						return 4 - get.value(card);
					}).forResult();
				},
				content(){
					'step 0'
					player.discard(event.cards);
					'step 1'
					player.judge(function(card){//你进行一次判定
						if(trigger.target==player)return get.color(card)=='black';
						return get.color(card)=='red';
					});
					'step 2'
					if(result.bool){
						if(trigger.target==player){
							trigger.getParent().excluded.add(trigger.target);
						}
						else{
							trigger.getParent().directHit.push(trigger.target);
						}
					}
				},
			},
			yb_wan_digong:{//地公
				audio:'ext:无名扩展/audio/character:2',
				trigger: { 
					// target: 'rewriteGainResult',
					player: "loseEnd" 
				},
				locked:true,
				usable:1,
				filter: function (event, player) {
					if (player.countCards("h")) return false;
					for (var i = 0; i < event.cards.length; i++) {
						if (event.cards[i].original == "h"&&get.position(i, true) == "h"&&get.owner(i) != player) return true;
					}
					return false;
				},
				content: function () {
					player.draw();
				},
				ai: {
					effect: {
						target: function (card) {
							if (card.name == "shunshou") return 0.5;
						},
					},
					noh: true,
				},
				group:'yb_wan_digong_tiandu',
				subSkill:{
					tiandu:{
						audio:'yb_wan_digong',
						trigger: { player: "judgeEnd" },
						preHidden: true,
						frequent(event) {
							return event.result.card.name !== "du";
						},
						check(event) {
							return event.result.card.name !== "du";
						},
						filter(event, player) {
							return get.position(event.result.card, true) == "o"&&get.color(event.result.card)=='black';
						},
						async content(event, trigger, player) {
							player.gain(trigger.result.card, "gain2");
						},

					}
				}
			},
			yb_wan_rengong:{//人公
				audio:'ext:无名扩展/audio/character:2',
				locked:true,
				trigger: { global: "recoverAfter" },
				getIndex(event, player) {
					return event.num;
				},
				content(){
					player.draw();
				},
				group:['yb_wan_rengong_guicai','yb_wan_rengong_yingzi'],
				subSkill:{
					guicai:{
						audio:'yb_wan_rengong',
						trigger: { global: "judge" },
						direct: true,
						filter: function (event, player) {
							return player.countCards("hes") > 0;
						},
						content: function () {
							"step 0";
							player
								.chooseCard(get.translation(trigger.player) + "的" + (trigger.judgestr || "") + "判定为" + get.translation(trigger.player.judging[0]) + "，" + get.prompt("yb_wan_rengong"), "hes", function (card) {
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
								player.respond(result.cards, "yb_wan_rengong", "highlight", "noOrdering");
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
					},
					yingzi:{
						audio:'yb_wan_rengong',
						trigger: { player: "phaseDrawBegin2" },
						forced: true,
						preHidden: true,
						filter: function (event, player) {
							return !event.numFixed;
						},
						firstDo:true,
						content: function () {
							var numb=game.countPlayer();
							var numc=Math.floor(numb/2);
							trigger.num=numc;
						},
					}
				}
			},
			yb_wan_yinmou:{//隐谋
				audio:'ext:无名扩展/audio/character:2',
				locked:true,
				trigger:{player:'phaseUseBegin'},
				init(player){
					player.storage.yb_wan_yinmou=[];
					player.storage.yb_wan_yinmou_2=[];
					// player.storage.yb_wan_yinmou={};
					// player.storage.yb_wan_yinmou={};
				},
				onremove:true,
				filter(){
					return true;
				},
				cost(){
					event.result = player.chooseTarget(get.prompt2('yb_wan_yinmou')).set('filterTarget',function(card,player,target){
						return /*target!=player&&*/target.getCards('h',function(card){
							return !player.storage.yb_wan_yinmou_2.includes(card);
						});
					}).forResult();
				},
				content(){
					var target=event.targets[0];
					'step 0'
					player.chooseButton(["选择一张牌作为「隐」", target.getCards("h")], true).set("ai", function (button) {
						var target = _status.event.getParent().target;
						var card = button.link;
						var val = target.getUseValue(card);
						if (val > 0) return val;
						return get.value(card);
					}).set('filterButton',function(button){
						return !player.storage.yb_wan_yinmou_2.includes(button.link)
					});
					'step 1'
					player.storage.yb_wan_yinmou.push(target);
					player.storage.yb_wan_yinmou_2.push(result.links[0]);
					// if(!player.storage.yb_wan_yinmou[target])player.storage.yb_wan_yinmou[target]=[];
					// player.storage.yb_wan_yinmou[target].push(result.links[0]);
				},
				mark: true,
				intro: {
					name: "死士",
					mark: function (dialog, content, player) {
						var storage=player.storage.yb_wan_yinmou;
						var storage2=player.storage.yb_wan_yinmou_2;
						if (player == game.me || player.isUnderControl()) {
							if(storage.length){
								for(var i = 0;i<storage.length;i++){
									dialog.add(get.translation(storage[i]));
									dialog.addSmall([[storage2[i]],'card']);
								}

							}
						}
					},
				},
				group:['yb_wan_yinmou_damage','yb_wan_yinmou_add','yb_wan_yinmou_2'],
				subSkill:{
					add:{
						audio:'yb_wan_yinmou',
						trigger:{
							player:['phaseZhunbeiBegin','phaseDrawBegin'],
						},
						filter(event,player){
							return player.storage.yb_wan_yinmou&&player.storage.yb_wan_yinmou.length>0;
						},
						forced:true,
						content(){
							var num = player.storage.yb_wan_yinmou.length;
							if(event.triggername=='phaseZhunbeiBegin'){
								player.gainMaxHp(num);
								player.recover(num);
							}
							else {
								trigger.num+=num;
							}
						}
					},
					damage:{
						audio:'yb_wan_yinmou',
						trigger:{
							global:['loseAfter','loseAsyncAfter','cardsDiscardAfter'],
						},
						forced:true,
						filter(event,player){
							var cards=event.cards;
							if(cards){
								for(var i of cards){
									if(player.storage.yb_wan_yinmou_2.includes(i))return true;
								}
							}
						},
						content(){
							'step 0'
							event.cards=trigger.cards;
							event.count=0;
							'step 1'
							var i = event.cards[event.count];
							if(player.storage.yb_wan_yinmou_2.includes(i)){
								var index = player.storage.yb_wan_yinmou_2.indexOf(i);
								player.storage.yb_wan_yinmou.remove(player.storage.yb_wan_yinmou[index]);
								player.storage.yb_wan_yinmou_2.remove(player.storage.yb_wan_yinmou_2[index]);
								var next=game.createEvent('yb_wan_yinmou_2',false);
								next.player=player;
								next.setContent(function(){
									'step 0'
									player.chooseControl('受到伤害','失去体力上限');
									'step 1'
									if(result.index==1){
										player.loseMaxHp();
									}
									else {
										player.damage(player).yb_wan_yinmou=true;
									}
								});
							}
							'step 2'
							var num2=0;
							player.getAllHistory('damage',(evt)=>{
								if(evt.yb_wan_yinmou==true){
									num2+=evt.num;
									return true;
								}
							});
							if(num2>=5){
								player.removeSkill('yb_wan_yinmou');
								event.finish();
							}
							else {
								event.count++;
							}
							'step 3'
							if(event.count<event.cards.length){
								event.goto(1);
							}
						},
					},
					2:{
						onremove:true,
					},
				}
			},
			yb_wan_qiquan:{//戚权
				audio:'ext:无名扩展/audio/character:2',
				trigger:{
					player:['loseAfter','gainAfter'],
					global: "loseAsyncAfter",
				},
				getIndex(event,player,name){
					if(name=='loseAfter'){
						const evt = event.getl(player);
						if(_status.currentPhase != player){
							return evt.hs.length;
						}
						return false;
					}
					else if(name=='gainAfter'){
						if(event.getParent(2).name != "yb_wan_qiquan"&&event.getParent(2).name!='phaseDraw')return 1;
						return false;
					}
					else {
						if(event.getg(player).length > 0)return 1;
						// else if();
						return false;
					}
				},
				// forced:true,
				cost(){
					if(event.triggername=='loseAfter'){
						event.result = {bool:true};
					}
					else{
						event.result = player.chooseBool(get.prompt2('yb_wan_qiquan')).set('ai',function(){return true}).forResult();
					}
				},
				content(){
					if(event.triggername=='loseAfter'){
						player.loseHp();
					}
					else {
						player.draw().gaintag=['yb_wan_qiquan_card'];
					}
				},
				group:'yb_wan_qiquan_card',
				subSkill:{
					card:{
						onremove:true,
						charlotte:true,
						mod:{
							ignoredHandcard:function(card,player){
								if(card.hasGaintag('yb_wan_qiquan_card')) return true;
							},
							cardDiscardable:function(card,player,name){
								if(name=='phaseDiscard'&&card.hasGaintag('yb_wan_qiquan_card')) return false;
							},
						},
					}
				}
			},
			yb_wan_baquan:{//霸权
				audio:'ext:无名扩展/audio/character:2',
				forced:true,
				firstDo:true,
				trigger: { global: "phaseDrawBegin1" },
				filter(event,player){
					if(game.filterPlayer(c=>c.hasSkill('yb_wan_baquan')).length>1)return false;
					let bool = function (target) {
						if (game.hasPlayer(current => current.getSeatNum() > 0)) return target.getSeatNum() == 1;
						return target == _status.roundStart;
					};
					return game
						.filterPlayer(target => {
							// switch (get.mode()) {
							// 	case "identity":
							// 		return target.isZhu;
							// 	case "guozhan":
							// 		return get.is.jun(target);
							// 	case "versus": {
							// 		if (["three", "four", "guandu"].includes(_status.mode)) return target.identity == "zhu";
							// 		return bool(target);
							// 	}
							// 	case "doudizhu":
							// 	case "boss":
							// 		return target.identity == "zhu";
							// 	default:
									return bool(target);
							// }
						})
						.includes(event.player)&&!event.numFixed;
				},
				async content(event,trigger,player){
					// console.log('event.cards',trigger.num)
					trigger.changeToZero();
					var cardsx = await player.draw(3);
					// console.log('cardsx',cardsx.result)
					event.cards=[];
					for (var i of cardsx.result) {
						event.cards.push(i);
					}
					// console.log('event.cards',event.cards)
					event.number=2;
					event.boolyb=true;
					const max = Math.min(
						event.number,
						event.boolyb==true?event.cards.length:player.countCards("he"),
						game.countPlayer(target => target != player)
					);
					// await player.draw(num);
					let list = [];
					// let given_map = {};
					let listx=[];
					if (_status.connectMode) game.broadcastAll(() => (_status.noclearcountdown = true));
					while (max - list.length > 0) {
						const {
							result: { bool, cards, targets },
						} = await player
							.chooseCardTarget({
								prompt: "霸权：将" + get.cnNumber(max - 1) + "至" + get.cnNumber(max) + "张牌分配给任意角色",
								position: "he",
								animate: false,
								filterCard(card, player) {
									// if(event.boolyb==true)return event.cards.includes(card)&&!get.event("list").some(listx => listx == card);
									// return !get.event("list").some(listx => listx == card);
									if(event.boolyb==true)return event.cards.includes(card)&&!get.event("list").some(list => list[1] == card);
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
							listx.push(cards);
							list.push([targets[0], cards[0]]);
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
					var list01=[];
					for(var z of list){
						list01.push(z[1][0]);
					}
					var cards3=event.cards.filter(j=>player.getCards('h').includes(j)&&!list01.includes(j));
					if(trigger.player.isAlive()){
						player.line(trigger.player);
						await player.give(cards3,trigger.player);
					}
				}

			},
			yb_wan_wenfeng:{//问锋
				audio:'ext:无名扩展/audio/character:2',
				usable:1,
				enable:'phaseUse',
				selectTarget:1,
				filterTarget(card,player,target){
					return target!=player&&target.countCards('h')>0;
				},
				content(){
					'step 0'
					event.cards=target.getCards('h');
					target.showCards(event.cards);
					'step 1'
					var list2=[];
					for(var k of cards){
						if(list2.length==0||!list2.includes(get.color(k)))list2.add(get.color(k));
					}
					if(list2.length==1){
						target.line(player);
						player.damage(target);
					}
					else{
						player.line(target);
						target.damage(player);
					}
				}
			},
			yb_wan_luanjing:{//乱京
				audio:'ext:无名扩展/audio/character:2',
				usable:1,
				enable:'phaseUse',
				filter(event,player){
					return game.filterPlayer(t=>t.countCards('h')&&t!=player).length>0;
				},
				content(){
					'step 0'
					var targets=game.filterPlayer(t=>t!=player);
					player.line(targets);
					event.targets=targets;
					event.cardsx=[];
					'step 1'
					for(var i of event.targets){
						if(i.isAlive()&&i.countCards('h'>0)){
							var next=game.createEvent('yb_wan_luanjing_shangjiao',false);
							next.i=i;
							next.cardsx=event.cardsx;
							next.setContent(function(){
								'step 0'
								event.i.chooseCard(true,'h');
								'step 1'
								if(result.bool){
									// game.cardsGotoOrdering(result.cards[0]);
									event.cardsx.push(result.cards[0]);
								}
							});
						}
					}
					'step 2'
					ui.clear();
					var cards;
					if (event.cardsx&&event.cardsx.length>0) {
						cards = event.cardsx;
						var lose_list = [],
							cards2 = [];
						cards.forEach(card => {
							var owner = get.owner(card);
							if (owner) {
								var arr = lose_list.find(i => i[0] == owner);
								if (arr) arr[1].push(card);
								else lose_list.push([owner, [card]]);
							} else cards2.add(card);
						});
						if (lose_list.length) {
							lose_list.forEach(list => {
								list[0].$throw(list[1]);
								game.log(list[0], "将", list[1], "置于了处理区");
							});
							game.loseAsync({
								lose_list: lose_list,
								visible: true,
							}).setContent("chooseToCompareLose");
						}
						if (cards2.length) game.cardsGotoOrdering(cards2);
						game.delayex();
						var dialog = ui.create.dialog("乱京", cards, true);
						_status.dieClose.push(dialog);
						dialog.videoId = lib.status.videoId++;
						game.addVideo("cardDialog", null, ["乱京", get.cardsInfo(cards), dialog.videoId]);
						event.getParent().preResult = dialog.videoId;
						game.broadcast(
							function (cards, id) {
								var dialog = ui.create.dialog("乱京", cards, true);
								_status.dieClose.push(dialog);
								dialog.videoId = id;
							},
							cards,
							dialog.videoId
						);
						event.dialog=dialog;
						game.log(player, "乱京展示了", cards);
					} else {
						event.finish();
					}
					'step 3'
					var targets2=game.filterPlayer().sortBySeat(player);
					for(var k of targets2){
						var next = game.createEvent('yb_wan_luanjing_wugu',false);
						next.target=k;
						if(event.dialog)next.dialog=event.dialog;
						// next.cards=cards;
						next.preResult=event.preResult;
						next.setContent(function(){
							var target=event.target;
							"step 0";
							for (var i = 0; i < ui.dialogs.length; i++) {
								if (ui.dialogs[i].videoId == event.preResult) {
									event.dialog = ui.dialogs[i];
									break;
								}
							}
							if (!event.dialog || event.dialog.buttons.length == 0) {
								event.finish();
								return;
							}
							if (event.dialog.buttons.length > 1) {
								var next = target.chooseButton(true);
								next.set("ai", button => {
									let player = _status.event.player,
										card = button.link,
										val = get.value(card, player);
									if (get.tag(card, "recover")) {
										val += game.countPlayer(target => {
											return target.hp < 2 && get.attitude(player, target) > 0 && lib.filter.cardSavable(card, player, target);
										});
										if (player.hp <= 2 && game.checkMod(card, player, "unchanged", "cardEnabled2", player)) val *= 2;
									}
									return val;
								});
								next.set("dialog", event.preResult);
								next.set("closeDialog", false);
								next.set("dialogdisplay", true);
							} else {
								event.directButton = event.dialog.buttons[0];
							}
							"step 1";
							var dialog = event.dialog;
							var card;
							if (event.directButton) {
								card = event.directButton.link;
							} else {
								for (var i of dialog.buttons) {
									if (i.link == result.links[0]) {
										card = i.link;
										break;
									}
								}
								if (!card) card = event.dialog.buttons[0].link;
							}
							var button;
							for (var i = 0; i < dialog.buttons.length; i++) {
								if (dialog.buttons[i].link == card) {
									button = dialog.buttons[i];
									button.querySelector(".info").innerHTML = (function (target) {
										if (target._tempTranslate) return target._tempTranslate;
										var name = target.name;
										if (lib.translate[name + "_ab"]) return lib.translate[name + "_ab"];
										return get.translation(name);
									})(target);
									dialog.buttons.remove(button);
									break;
								}
							}
							var capt = get.translation(target) + "选择了" + get.translation(button.link);
							if (card) {
								target.gain(card, "visible");
								target.$gain2(card);
								game.broadcast(
									function (card, id, name, capt) {
										var dialog = get.idDialog(id);
										if (dialog) {
											dialog.content.firstChild.innerHTML = capt;
											for (var i = 0; i < dialog.buttons.length; i++) {
												if (dialog.buttons[i].link == card) {
													dialog.buttons[i].querySelector(".info").innerHTML = name;
													dialog.buttons.splice(i--, 1);
													break;
												}
											}
										}
									},
									card,
									dialog.videoId,
									(function (target) {
										if (target._tempTranslate) return target._tempTranslate;
										var name = target.name;
										if (lib.translate[name + "_ab"]) return lib.translate[name + "_ab"];
										return get.translation(name);
									})(target),
									capt
								);
							}
							dialog.content.firstChild.innerHTML = capt;
							game.addVideo("dialogCapt", null, [dialog.videoId, dialog.content.firstChild.innerHTML]);
							game.log(target, "选择了", button.link);
							game.delay();

						});
						next;
					}
					'step 4'
					for (var i = 0; i < ui.dialogs.length; i++) {
						if (ui.dialogs[i].videoId == event.dialog.videoId) {
							var dialog = ui.dialogs[i];
							dialog.close();
							_status.dieClose.remove(dialog);
							if (dialog.buttons.length) {
								event.remained = [];
								for (var i = 0; i < dialog.buttons.length; i++) {
									event.remained.push(dialog.buttons[i].link);
								}
								event.trigger("yb_wan_luanjingDiscard");
							}
							break;
						}
					}
					game.broadcast(function (id) {
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					}, event.dialog.videoId);
					game.addVideo("cardDialog", null, event.dialog.videoId);
				},
			},

			yb_wan_linzuo:{//麟佐
				audio:'ext:无名扩展/audio/character:2',
				// forced:true,
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				locked: true,
				filter: function (event, player) {
					return game.hasPlayer(current => current != player) && (event.name != "phase" || game.phaseNumber == 0);
				},
				audio: 6,
				async cost(event, trigger, player) {
					const result = await player
						.chooseTarget("请选择【麟佐】的目标", lib.translate.yb_wan_linzuo_info, true, function (card, player, target) {
							return target != player && (!player.storage.yb_wan_linzuo || !player.storage.yb_wan_linzuo.includes(target));
						})
						.set("ai", function (target) {
							let att = get.attitude(_status.event.player, target);
							if (att > 0) return att + 1;
							if (att == 0) return Math.random();
							return att;
						})
						.set("animate", false)
						.forResult();
					event.result = {
						bool: true,
						cost_data: result.targets[0],
					};
				},
				logAudio: () => 2,
				async content(event, trigger, player) {
					let target = event.cost_data;
					if (!player.storage.yb_wan_linzuo) player.storage.yb_wan_linzuo = [];
					player.storage.yb_wan_linzuo.push(target);
					// player.addSkill("yb_wan_linzuo_");
		
					const func = (player, target) => {
						if (!target.storage.yb_wan_linzuo_mark) target.storage.yb_wan_linzuo_mark = [];
						target.storage.yb_wan_linzuo_mark.add(player);
						target.storage.yb_wan_linzuo_mark.sortBySeat();
						target.markSkill('yb_wan_linzuo_mark');
						// target.markSkill("yb_wan_linzuo_mark", null, null, true);
						// target.markSkill('yb_wan_linzuo_mark',)
					};
					if (event.isMine()) func(player, target);
					else if (player.isOnline2()) player.send(func, player, target);
				},
				group:['yb_wan_linzuo_sha','yb_wan_linzuo_draw','yb_wan_linzuo_trick','yb_wan_linzuo_max'],
				subSkill:{
					mark:{
						charlotte:true,
						mark:true,
						marktext:'麟',
						intro:{
							name:'麟佑',
							content:function(storage,player,skill){
								if(storage)return `被${get.translation(storage)}选择为麟佑`
								return '无'
							}
						}
					},
					mark1:{
						charlotte:true,
						mark:true,
						marktext:'勋',
						intro:{
							name:'麟佐-勋',
							markcount:function(storage,player){
								var content=player.getExpansions('yb_wan_linzuo_mark1');
								return content.length;
							},
							mark:function(dialog,content,player){
								var content=player.getExpansions('yb_wan_linzuo_mark1');
								if(content&&content.length){
									if(player==game.me||player.isUnderControl()){
										dialog.addAuto(content);
									}
									else{
										return '共有'+get.cnNumber(content.length)+'张勋';
									}
								}
							},
							content:function(content,player){
								var content=player.getExpansions('yb_wan_linzuo_mark1');
								if(content&&content.length){
									if(player==game.me||player.isUnderControl()){
										return get.translation(content);
									}
									return '共有'+get.cnNumber(content.length)+'张勋';
								}
							}
						}
					},
					mark2:{
						charlotte:true,
						mark:true,
						marktext:'寂',
						intro:{
							name:'麟佐-寂',
							markcount:function(storage,player){
								var content=player.getExpansions('yb_wan_linzuo_mark2');
								return content.length;
							},
							mark:function(dialog,content,player){
								var content=player.getExpansions('yb_wan_linzuo_mark2');
								if(content&&content.length){
									if(player==game.me||player.isUnderControl()){
										dialog.addAuto(content);
									}
									else{
										return '共有'+get.cnNumber(content.length)+'张寂';
									}
								}
							},
							content:function(content,player){
								var content=player.getExpansions('yb_wan_linzuo_mark2');
								if(content&&content.length){
									if(player==game.me||player.isUnderControl()){
										return get.translation(content);
									}
									return '共有'+get.cnNumber(content.length)+'张寂';
								}
							}
						}
					},
					sha:{
						audio:'yb_wan_linzuo',
						trigger:{
							global:'useCardToTargeted',
						},
						filter(event,player){
							return event.card.name=='sha'&&(player.storage.yb_wan_linzuo.includes(event.target))&&player.canUse({name:'sha'},event.player);
						},
						direct:true,
						*content(event,map){
							let trigger=map.trigger,player=map.player;
							var target=trigger.target;
							var source=trigger.player;
							var result =yield player.chooseToUse(function(card,player,event){
								return get.name(card)=='sha'&&lib.filter.filterCard.apply(this,arguments);
							},source,-1).set('addCount',false)
							.set('prompt2','是否对'+get.translation(source)+'使用一张杀，令其使用的此杀无效')
							.set('logSkill','yb_wan_linzuo_sha');
							if(result.bool){
								yield trigger.getParent().excluded.add(target);
								if(player.countCards('hej')>0){
									var relu = yield player.choosePlayerCard(player,true,'hej').set('ai',function(button){
										let val = get.buttonValue(button);
										return -val;
									}).set('prompt2','请选择一张牌盖在武将牌上称为“勋”');
									if(relu.bool){
										yield player.markSkill('yb_wan_linzuo_mark1');
										yield player.addToExpansion(relu.cards,player).gaintag.add('yb_wan_linzuo_mark1');
									}
								}
								if(target.countCards('hej')>0){
									var relu2 = yield target.choosePlayerCard(target,true,'hej').set('ai',function(button){
										let val = get.buttonValue(button);
										return -val;
									}).set('prompt2','请选择一张牌交给'+get.translation(player));
									if(relu2.bool){
										yield target.give(relu2.cards,player);
									}
								}
							}
						}
					},
					draw:{
						audio:'yb_wan_linzuo',
						trigger:{
							player:'phaseDrawBegin',
						},
						filter(event,player){
							var content=player.getExpansions('yb_wan_linzuo_mark1');
							return content&&content.length>2;
						},
						forced:true,
						content(){
							trigger.num=player.getExpansions('yb_wan_linzuo_mark1').length;
						},
					},
					trick:{
						global:'yb_wan_linzuo_trick2',
						audio:'yb_wan_linzuo',
					},
					trick2:{
						audio:'yb_wan_linzuo',
						trigger:{
							global:'useCard',
						},
						filter(event,player){
							return get.type2(event.card)=='trick'&&player.storage.yb_wan_linzuo_mark&&player.storage.yb_wan_linzuo_mark.includes(event.player);
						},
						async cost(event, trigger, player) {
							event.result = {
								bool: false,
								cost_data:{
									index:2
								}
							};
							var target=trigger.player;
							const { index } = await player
								.chooseControl()
								.set("prompt", "麟佐："+get.translation(target)+"使用了"+get.translation(trigger.card)+"，请选择：")
								.set("choiceList", ["令此牌无效", "令此牌额外结算一次","取消"])
								.set("ai", function () {
									var current=_status.event.player;
									var att=get.attitude(current,target);
									if(att>5)return 1
									if(att<0)return 0;
									return 2
								})
								.forResult();
							if(index!=2){
								event.result = {
									bool: true,
									cost_data:{
										index:index,
									}
								};
							}
							// event.result.cost_data.index = index;
						},
						async content(event, trigger, player) {
							const result = event.cost_data;
							var current=trigger.player;
							if(result&&result.index == 2){
								event.finish();
							}
							else{
								if(result.index == 0){
									await trigger.cancel();
									await current.draw();
									if (current.countCards("h")) {
										const result = await current.chooseCard("将一张手牌置于武将牌上作为“寂”", true).forResult();
										if (result.bool && result.cards.length) {
											await current.addToExpansion(result.cards, current).gaintag.add("yb_wan_linzuo_mark2");
										}
									}
								}
								else {
									trigger.effectCount++;
								}
							}
						},

					},
					max:{
						audio:'yb_wan_linzuo',
						forced:true,
						mod:{
							maxHandcard:function(player,num){
								var content=player.getExpansions('yb_wan_linzuo_mark2');
								if(content&&content.length>0)return num+content.length;
								else return num;
							}
						}
					},
				}
			},
			yb_wan_guojiang:{//国将
				audio:'ext:无名扩展/audio/character:2',
				skillAnimation: true,
				animationColor: "fire",
				juexingji: true,
				derivation: ["yb_wan_gongxun", "yb_wan_linjiang"],
				unique: true,
				trigger: { player: "phaseZhunbeiBegin" },
				filter(event, player) {
					var content=player.getExpansions('yb_wan_linzuo_mark1');
					// return content&&content.length>2;
					return content&&content.length>=4&& !player.storage.hunzi;
				},
				forced: true,
				//priority:3,
				async content(event, trigger, player) {
					player.awakenSkill(event.name);
					await player.removeSkill('yb_wan_linzuo');
					await player.addSkills(["yb_wan_gongxun", "yb_wan_linjiang"]);
				},
			},
			yb_wan_jixin:{//寂心
				audio:'ext:无名扩展/audio/character:2',
				skillAnimation: true,
				animationColor: "fire",
				juexingji: true,
				derivation: ["yb_wan_yewang", "yb_wan_kuitian"],
				unique: true,
				trigger: {
					global:['yb_wan_linzuo_trick2After'],
					player:['changeHp','loseMaxHpAfter'],
				},
				filter(event, player) {
					var content=player.getExpansions('yb_wan_linzuo_mark2');
					// return content&&content.length>2;
					return content&&content.length>player.hp&& !player.storage.hunzi;
				},
				forced: true,
				//priority:3,
				content() {
					'step 0'
					player.awakenSkill(event.name);
					'step 1'
					var targets=player.storage.yb_wan_linzuo;
					if(targets&&targets.length>0){
						for(var i of targets){
							if(i.isAlive){
								player.storage.yb_wan_linzuo.remove(i);
								i.removeMark('yb_wan_linzuo_mark');
								i.storage.yb_wan_linzuo_mark.remove(player);
								i.damage(player);
							}
						}
					}
					'step 2'
					player.loseMaxHp();
					'step 3'
					player.removeSkill('yb_wan_linzuo');
					player.addSkills(["yb_wan_yewang", "yb_wan_kuitian"]);
					'step 4'
					var targetsx=game.filterPlayer();
					targetsx.sortBySeat();
					for(var i of targetsx){
						if(i.countGainableCards(player,'hej')>0){
							player.gainPlayerCard(i,true,'hej');
						}
					}
					'step 5'
					var cards = Array.from(ui.ordering.childNodes);
					while (cards.length) {
						cards.shift().discard();
					}
					'step 6'
					var evt = _status.event.getParent("phase");
					if (evt) {
						game.resetSkills();
						_status.event = evt;
						_status.event.finish();
						_status.event.untrigger(true);
					}
					'step 7'
					player.insertPhase();
				},

			},

			yb_wan_linjiang:{//麟将
				audio:'ext:无名扩展/audio/character:2',
				forced:true,
				group:['yb_wan_linjiang_sha','yb_wan_linjiang_draw','yb_wan_linjiang_trick'],
				subSkill:{
					sha:{
						audio:'yb_wan_linjiang',
						trigger:{
							global:'useCardToTargeted',
						},
						filter(event,player){
							return event.card.name=='sha'&&(player.storage.yb_wan_linzuo.includes(event.target))&&player.canUse({name:'sha'},event.player);
						},
						direct:true,
						*content(event,map){
							let trigger=map.trigger,player=map.player;
							var target=trigger.target;
							var source=trigger.player;
							var result =yield player.chooseToUse(function(card,player,event){
								return get.name(card)=='sha'&&lib.filter.filterCard.apply(this,arguments);
							},source,-1).set('addCount',false)
							.set('prompt2','是否对'+get.translation(source)+'使用一张杀，令其使用的此杀无效')
							.set('logSkill','yb_wan_linzuo_sha');
							if(result.bool){
								yield trigger.getParent().excluded.add(target);
								yield source.damage(player);
								if(player.countCards('hej')>0){
									var relu = yield player.choosePlayerCard(player,true,'hej').set('ai',function(button){
										let val = get.buttonValue(button);
										return -val;
									}).set('prompt2','请选择一张牌盖在武将牌上称为“勋”');
									if(relu.bool){
										yield player.markSkill('yb_wan_linzuo_mark1');
										yield player.addToExpansion(relu.cards,player).gaintag.add('yb_wan_linzuo_mark1');
									}
								}
								if(target.countCards('hej')>0){
									var relu2 = yield target.choosePlayerCard(target,true,'hej').set('ai',function(button){
										let val = get.buttonValue(button);
										return -val;
									}).set('prompt2','请选择一张牌交给'+get.translation(player));
									if(relu2.bool){
										yield target.give(relu2.cards,player);
									}
								}
							}
						}
					},
					draw:{
						audio:'yb_wan_linjiang',
						trigger:{
							player:'phaseDrawBegin',
						},
						filter(event,player){
							var content=player.getExpansions('yb_wan_linzuo_mark1');
							return content;
						},
						forced:true,
						content(){
							trigger.num=player.getExpansions('yb_wan_linzuo_mark1').length;
						},
					},
					trick:{
						audio:'yb_wan_linjiang',
						trigger:{
							player:'useCard',
						},
						forced:true,
						filter(event,player){
							return get.type2(event.card)=='trick';
						},
						content(){
							trigger.effectCount++;
						}
					},
				}
			},
			yb_wan_gongxun:{//功勋
				audio:'ext:无名扩展/audio/character:2',
				enable:'phaseUse',
				trigger:{
					global:['damageBegin4','phaseZhunbeiBegin','phaseJieshuBegin'],
				},
				filter(event,player,name){
					var content=player.getExpansions('yb_wan_linzuo_mark1');
					if(name=='damageBegin4')return content&&content.length>0;
					if(name=='phaseZhunbeiBegin'||name=='phaseJieshuBegin')	return _status.currentPhase!=player&&content&&content.length>0;
					return content&&content.length>0;
				},
				chooseButton: {
					dialog(event, player) {
						const dialog = ui.create.dialog("功勋", "hidden");
						var content=player.getExpansions('yb_wan_linzuo_mark1');
						var list=[[1,'造成伤害'],[2,'摸两张牌']];
						dialog.add([list, "tdnodes"]);
						dialog.add(content);
						return dialog;
					},
					filter(button) {
						if (ui.selected.buttons.length && typeof button.link == typeof ui.selected.buttons[0].link) return false;
						return true;
					},
					select() {
						return 2;
					},
					// check(button) {
					// 	var player = _status.event.player;
					// 	if (typeof button.link == "number") {
					// 		if (!player.hasEmptySlot(button.link)) {
					// 			var card = player.getEquip(button.link);
					// 			if (card) {
					// 				var val = get.value(card);
					// 				if (val > 0) return 0;
					// 				return 5 - val;
					// 			}
					// 		}
					// 		switch (button.link) {
					// 			case 3:
					// 				return 4.5;
					// 			case 4:
					// 				return 4.4;
					// 			case 5:
					// 				return 4.3;
					// 			case 2:
					// 				return (3 - player.hp) * 1.5;
					// 			case 1: {
					// 				if (
					// 					game.hasPlayer(function (current) {
					// 						return (get.realAttitude || get.attitude)(player, current) < 0 && get.distance(player, current) > 1;
					// 					})
					// 				)
					// 					return 0;
					// 				return 3.2;
					// 			}
					// 		}
					// 	}
					// 	var name = button.link[2];
					// 	var evt = _status.event.getParent();
					// 	if (get.type(name) == "basic") {
					// 		if (name == "shan") return 2;
					// 		if (evt.type == "dying") {
					// 			if (get.attitude(player, evt.dying) < 2) return false;
					// 			if (name == "jiu") return 2.1;
					// 			return 1.9;
					// 		}
					// 		if (evt.type == "phase")
					// 			return player.getUseValue({
					// 				name: name,
					// 				nature: button.link[3],
					// 				isCard: true,
					// 			});
					// 		return 1;
					// 	}
					// 	if (!["chuqibuyi", "shuiyanqijunx", "juedou", "nanman", "wanjian", "shunshou", "zhujinqiyuan"].includes(name)) return 0;
					// 	var card = { name: name, isCard: true };
					// 	if (["shunshou", "zhujinqiyuan"].includes(card.name)) {
					// 		if (
					// 			!game.hasPlayer(function (current) {
					// 				return get.attitude(player, current) != 0 && get.distance(player, current) <= 1 && player.canUse(card, current) && get.effect(current, card, player, player) > 0;
					// 			})
					// 		)
					// 			return 0;
					// 		return player.getUseValue(card) - 7;
					// 	}
					// 	return player.getUseValue(card) - 4;
					// },
					backup(links, player) {
						if (typeof links[1] == "number") links.reverse();
						var control = links[0];
						var cardx=links[1];
						// var name = links[1][2];
						// var nature = links[1][3];
						return {
							name:'功勋',
							filterCard() {
								return false;
							},
							filterTarget: true,
							selectCard: -1,
							control: control,
							cardx:cardx,
							popname: true,
							content: lib.skill.yb_wan_gongxun.contentx,
						};
					},
					prompt(links, player) {
						return '请选择移除一张“勋”，令一名角色摸两张牌或对一名角色造成一点伤害。'
					},
				},
				contentx(){
					"step 0";
					var card = lib.skill.yb_wan_gongxun_backup.cardx;
					player.loseToDiscardpile(card);
					"step 1";
					var control = lib.skill.yb_wan_gongxun_backup.control;
					if(control==1){
						target.damage(player);
					}
					else target.draw(2);
				},
				async cost(event, trigger, player) {
					var str='是否移去一张“勋”，';
					if(event.triggername=='damageBegin4'){
						str+='防止'+get.translation(trigger.player)+'受到此伤害？';
					}
					if(event.triggername=='phaseZhunbeiBegin'){
						str+='令一名角色摸两张牌？';
					}
					if(event.triggername=='phaseJieshuBegin'){
						str+='对一名角色造成一点伤害？';
					}
					event.result = {
						bool: false,
					};
					const dialog = ui.create.dialog("功勋", "hidden");
					dialog.add(str);
					var content=player.getExpansions('yb_wan_linzuo_mark1');
					dialog.add(content);
					const { result } = await player.chooseButton(dialog);
					if(result.bool){
						event.result = {
							bool: true,
							cost_data:{
								card:result.links[0],
							}
						};
					}
					else event.finish();
					// event.result.cost_data.index = index;
				},
				*content(event,map){
					let trigger=map.trigger,player=map.player;
					yield player.loseToDiscardpile(event.cost_data.card);
					if(event.triggername=='damageBegin4'){
						trigger.cancel();
					}
					else if(event.triggername=='phaseZhunbeiBegin'){
						var result = yield player.chooseTarget(true).set('prompt2','令一名角色摸两张牌。').set('ai',function(tar){
							return get.attitude(_status.event.player,tar);
						})
						if(result.bool){
							result.targets[0].draw(2);
						}
					}
					else if(event.triggername=='phaseJieshuBegin'){
						var result = yield player.chooseTarget(true).set('prompt2','对一名角色造成一点伤害。').set('ai',function(tar){
							return get.damageEffect(tar, _status.event.player,_status.event.player);
						})
						if(result.bool){
							result.targets[0].damage(player);
						}
					}
				},
				// group:['yb_wan_gongxun_1','yb_wan_gongxun_2','yb_wan_gongxun_3'],
				// subSkill:{

				// }
			},

			yb_wan_yewang:{//野妄
				audio:'ext:无名扩展/audio/character:2',
				group:'yb_wan_yewang_max',
				subSkill:{
					max:{
						audio:'yb_wan_yewang',
						forced:true,
						mod:{
							maxHandcard:function(player,num){
								var content=player.getExpansions('yb_wan_linzuo_mark2');
								if(content&&content.length>0)return num+content.length;
								else return num;
							}
						}
					},
				},
				trigger:{
					source:'damageSource',
				},
				getIndex(event,player){
					return event.num;
				},
				content(){
					'step 0'
					player.draw();
					'step 1'
					var hs = player.getCards("he");
					if (hs.length > 0) {
						if (hs.length == 1) event._result = { bool: true, cards: hs };
						else player.chooseCard("he", true, "选择一张牌作为“寂”");
					} else event.finish();
					'step 2'
					if (result.bool) {
						var cs = result.cards;
						player.addToExpansion(cs, player, "give").gaintag.add("yb_wan_linzuo_mark2");
					}
				}
			},
			yb_wan_kuitian:{//窥天
				audio:'ext:无名扩展/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filter: function (event, player) {
					return player.getExpansions("yb_wan_linzuo_mark2").length > 0;
				},
				chooseButton: {
					dialog: function (event, player) {
						return ui.create.dialog("排异", player.getExpansions("yb_wan_linzuo_mark2"), "hidden");
					},
					backup: function (links, player) {
						return {
							audio: "yb_wan_kuitian",
							// filterTarget: true,
							filterCard: function () {
								return false;
							},
							selectCard: -1,
							card: links[0],
							delay: false,
							content: lib.skill.yb_wan_kuitian.contentx,
							// ai: {
							// 	order: 10,
							// 	result: {
							// 		target: function (player, target) {
							// 			if (player != target) return 0;
							// 			if (player.hasSkill("requanji") || player.countCards("h") + 2 <= player.hp + player.getExpansions("quanji").length) return 1;
							// 			return 0;
							// 		},
							// 	},
							// },
						};
					},
					prompt: function () {
						return "是否发动【窥天】？";
					},
				},
				contentx: function () {
					"step 0"
					var card = lib.skill.yb_wan_kuitian_backup.card;
					player.loseToDiscardpile(card);
					"step 1"
					var num1=game.players.length + game.dead.length;
					var num2=game.players.length;
					event.cards=get.cards(num1);
					game.cardsGotoOrdering(event.cards);
					player.chooseCardButton(event.cards,true,num2,'窥天：获得其中'+num2+'张牌');
					
					"step 2"
					if (result.bool) {
						player.gain(result.links,'gain2');
					}
					var cards2=event.cards.filter(i=>!result.links.includes(i));
					
					while(cards2.length){
						ui.cardPile.insertBefore(cards2.pop(),ui.cardPile.firstChild);
					}
					'step 3'
					player.damage();
				},

			},

			yb_wan_xiamou:{//黠谋
				audio:'ext:无名扩展/audio/character:2',
				trigger:{
					global:'phaseZhunbeiBegin',
				},
				filter(){
					return true;
				},
				content(){
					player.chooseToGuanxing(3);
				},
			},
			yb_wan_muhua:{//幕划
				audio:'ext:无名扩展/audio/character:2',
				trigger:{
					player:'loseAfter',
					global: ["cardsDiscardAfter", "loseAsyncAfter", "equipAfter"],
				},
				filter(event, player) {
					const filter = card => ["trick"].includes(get.type2(card))&&get.color(card)=='black';
					if (event.name != "cardsDiscard") {
						return event.getd(player, "cards2").filter(filter).length > 0;
					} else {
						if (event.cards.filterInD("d").filter(filter).length <= 0) return false;
						const evt = event.getParent();
						if (evt.name != "orderingDiscard") return false;
						const evtx = evt.relatedEvent || evt.getParent();
						if (evtx.player != player) return false;
						return player.hasHistory("lose", evtxx => {
							return evtx == (evtxx.relatedEvent || evtxx.getParent());
						});
					}
				},
				direct:true,
				// async content(event, trigger, player) {
				// 	let cards;
				// 	if (trigger.name != "cardsDiscard") {
				// 		cards = trigger.getd(player, "cards2");
				// 	} else cards = trigger.cards.filterInD("d");
				// 	cards = cards.filter(card => ["trick"].includes(get.type2(card))&&get.color(card)=='black');
				// 	if (cards.length) {
				// 		const dialog = ui.create.dialog("幕划", "hidden");
				// 		var str='是否将其中一张牌交给其他角色？'
				// 		dialog.add(str);
				// 		dialog.add(cards);
				// 		const { result } = await player.chooseButton(dialog);
				// 		// const next = player.chooseButton(cards).set();
				// 		await result;
				// 	}
				// },
				content(){
					'step 0'
					let cards;
					if (trigger.name != "cardsDiscard") {
						cards = trigger.getd(player, "cards2");
					} else cards = trigger.cards.filterInD("d");
					event.cards = cards.filter(card => ["trick"].includes(get.type2(card))&&get.color(card)=='black');
					'step 1'
					event.cards = event.cards.filter(card => ["trick"].includes(get.type2(card))&&get.color(card)=='black');
					if(event.cards.length){
						var dialog = ui.create.dialog("幕划", "hidden");
						var str='是否将其中一张牌交给其他角色？'
						dialog.add(str);
						dialog.add(event.cards);
						if(game.countPlayer(c=>c!=player)>0)player.chooseButton(dialog);
					}
					else event.finish();
					'step 2'
					if(result.bool){
						player.logSkill('yb_wan_muhua');
						event.cardx=result.links[0];
						player.chooseTarget(true).set('filterTarget',function(card,player,target){
							return target!=player;
						}).set('prompt2','将'+get.translation(event.cardx)+'交给谁？')
					}
					else event.finish();
					'step 3'
					if(result.bool){
						event.cards.remove(event.cardx);
						player.line(result.targets[0]);
						player.give(event.cardx,result.targets[0]);
						// result.targets[0].$gain2(event.cardx,'yb_wan_muhua');
						player.$give(event.cardx,result.targets[0],'yb_wan_muhua');
						// event.goto(1);
					}
					else event.finish();
					'step 4'
					if(_status.currentPhase!=player)player.draw();
					else player
						.when({player:'phaseJieshuBegin'})
						.then(()=>{
							player.draw().set('logSkill','yb_wan_muhua');
						})
					event.goto(1)
				}

			},
			yb_wan_hanyong:{//憨勇
				audio:'ext:无名扩展/audio/character:2',
				trigger:{
					global:['damageBegin2','useCardAfter'],
					source:['damageSource'],
				},
				filter(event,player,name){
					if(get.name(event.card)!='sha')return false;
					if(name=='useCardAfter')return !player.getHistory('sourceDamage',function(evt){
						return evt.card==event.card;
					}).length;
					else if(name=='damageSource'){
						// //这个检测是否是首张杀，不是首张杀无效
						// var history=player.getHistory('useCard',function(evt){
						// 	return get.name(evt.card)=='sha';
						// });
						// return history&&history[0].card==event.card;
						//这个检测是不是首次杀的伤害，不是则无效
						var historyx=player.getHistory('sourceDamage',function(evt){
							return get.name(evt.card)=='sha'&&evt!=event;
						});
						return !historyx||historyx.length<1;
					}
					else {
						return player.countCards('h')>0;
					}
				},
				cost(){
					'step 0'
					event.result = {
						bool:false,
						// index:1,
						// cardx:
					}
					'step 1'
					if(event.triggername=='damageSource'){
						event.result=player.chooseBool('是否摸一张牌？').forResult();						// player.chooseControl('是','cancel2').set('prompt','是否摸一张牌？');
					}
					else {
						var str='是否弃置一张手牌，令';
						if(event.triggername=='damageBegin2'){
							str+='此伤害+1？'
						}
						else {
							str+='令';
							str+=get.translation(trigger.player);
							str+='本回合使用杀次数+1？';
						}
						player.chooseToDiscard('he').set("chooseonly", true).set('prompt2',str);
					}
					'step 2'
					if(result.cards){
						event.result={
							bool:true,
							cards:result.cards,
						}
					}
					// else {
					// 	if(result.index==0){
					// 		event.result={
					// 			bool:true,
					// 			cards:'是',
					// 		}
					// 	}
					// 	else event.result={
					// 		bool:false,
					// 	}
					// }
				},
				content(){
					if(event.cards){
						player.discard(event.cards);
						if(event.triggername=='damageBegin2'){
							trigger.num++;
						}
						else{
							trigger.player.addTempSkill('yb_wan_hanyong_use');
							trigger.player.addMark('yb_wan_hanyong_use');
						}
					}
					else {
						player.draw();
					}
					// else {
					// 	if(event.index==0){
					// 		player.draw();
					// 	}
					// }
				},
				subSkill:{
					use:{
						mod: {
							cardUsable: function (card, player, num) {
								var numb=player.countMark('yb_wan_hanyong_use');
								if (card.name == "sha") return num + numb;
							},
						},
						mark:true,
						intro:{
							content:'本回合使用【杀】次数+$。'
						},
						onremove:true,
					},

				}
			},
		},//技能（必填） ……………………！…！！！【…？。！！？？？？…………
		card:{
			yb_wan_sulinqiang:{//溯麟枪
				type:'equip',
				subtype:'equip1',
				fullskin:true,
				epic:true,
				distance:{attackFrom:-2},
				skills:['yb_wan_sulinqiang'],
				ai:{
					equipValue:4.2,
					basic:{
						equipValue:4.2,
					},
				},
			},
			yb_wan_cangleishuo:{//沧泪槊
				type:'equip',
				subtype:'equip1',
				fullskin:true,
				epic:true,
				distance:{attackFrom:-1},
				skills:['yb_wan_cangleishuo'],
				ai:{
					equipValue:4.2,
					basic:{
						equipValue:4.2,
					},
				},
			},
			yb_wan_chaoximao:{//潮汐矛
				type:'equip',
				subtype:'equip1',
				fullskin:true,
				epic:true,
				distance:{attackFrom:-3},
				skills:['yb_wan_chaoximao'],
				ai:{
					equipValue:4.2,
					basic:{
						equipValue:4.2,
					},
				},
			},
			yb_wan_cangdaici:{//藏黛刺
				type:'equip',
				subtype:'equip1',
				fullskin:true,
				epic:true,
				distance:{attackFrom:-0},
				skills:['yb_wan_cangdaici1','yb_wan_cangdaici2'],
				ai:{
					equipValue:4.2,
					basic:{
						equipValue:4.2,
					},
				},
			},
		},
		translate:{
			one_01:'将包1',
			yb_wan_wujiangceshi:'测试武将',



			"yb_wan_xueyi": "血裔",//√
			"yb_wan_xueyi_info": "锁定技，你的摸牌阶段改为展示牌堆顶四张牌，你可随意排列顺序，然后你摸三张牌。",
			yb_wan_jianli:'坚利',//√
			yb_wan_jianli_info:'出牌阶段限一次，你可以展示所有手牌，若颜色均一致，你可对一名角色造成一点伤害。',
			
			yb_wan_linglong:'玲珑',//√
			yb_wan_linglong_info:'你的方片牌无出杀次数限制且不计入出杀次数，你的方片牌可以当做杀或闪使用或打出。',
			yb_wan_yaoji:'邀计',//√
			yb_wan_yaoji_info:'限定技，出牌阶段你可依次选择两名不同的角色a、b（b不能是你），令b选择一项：1，a摸b角色手牌数手牌，b摸a角色手牌数手牌。2，弃置所有手牌，在其下个回合开始前免疫所有伤害，其下个出牌阶段开始时摸x（弃置数量）张手牌。',
			yb_wan_luosuo:'落锁',//√
			yb_wan_luosuo_info:'锁定技，当有人跳过出牌阶段或你失去一张装备时你可进行一次判定，若为黑色则你可选择摸一张牌或回复一点体力。',
			yb_wan_jiqiao:'机巧',
			yb_wan_jiqiao_info:'出牌阶段,你可弃置你区域（装备区、手牌区）任意张装备牌，然后根据你弃置牌数，发动以下效果：1，一张，选择一名角色，其下回合准备阶段亮出牌堆顶一张牌，其需任意选择自己手牌（最少一张）点数相加等于牌堆顶这张牌点数，否则其跳过出牌阶段。2，两张，选择一名角色，其下回合准备阶段亮出牌堆顶牌堆底各一张牌，你可令其摸或者弃置亮出的牌的颜色数的牌（此法摸的牌不计入手牌上限），然后其需任意选择自己手牌（最少一张）点数相加大于亮出的两张牌点数之和，否则其跳过出牌阶段。3，三张及以上，你可选择令一名角色弃置三张牌或摸三张牌（此法摸的牌不计入手牌上限），然后其跳过出牌阶段。',
			yb_wan_xueyii:'学艺',//√
			yb_wan_xueyii_info:'每当你使用或打出一张杀时，你可选择场上一名角色区域一张牌（手牌、判定区、装备区）置于你武将牌上称为艺。你每有一张艺，进攻距离加一。',
			// yb_wan_xueyii_info:'锁定技，当你回合外打出或使用一张杀时，你可选择当前角色区域的一张牌置于你武将牌上称为艺。你每有一张艺，进攻距离加一。',
			yb_wan_suyi:'溯艺',//√
			yb_wan_suyi_info:'觉醒技，当你艺大于等于四时，失去一点体力上限，你获得技能枪意。',
			yb_wan_shuangqiang:'双枪',//√
			yb_wan_shuangqiang_info:'你多一个武器栏。你的手牌上限+x（x为你当前装备区武器数）',
			yb_wan_qiangyi:'枪意',//√
			yb_wan_qiangyi_info:'（每发动一次需移去一张“艺”）当你使用【杀】时，你可以获得一项未获得过且与杀或伤害相关的技能，此【杀】结算完毕后，你失去以此法获得的技能。',
			// 那个枪意就是张绣的百鸣，你套一下然后改名字改成枪意就好了
			// 学艺 溯义 枪匣改成锁定技，双枪后半段改成你的手牌上限+x（x为你当前装备区武器数）
			yb_wan_jici:'疾刺',
			yb_wan_jici_info:'回合内，当你第一次使用一张杀后你可弃置一张手牌视为对原目标再使用一张杀。',
			yb_wan_xianshuai:'先率',//√
			yb_wan_xianshuai_info:'当你于回合内第一次使用的杀造成伤害后，你可增加一体力上限然后恢复一体力，否则此杀结算之后你摸两张牌。',
			yb_wan_zeishi:'贼势',//√
			yb_wan_zeishi_info:'当你受到伤害时弃置等同伤害值数量的牌减免该伤害，然后本回合下次受到伤害增加这个值。',
			// 先率：当你回合内第一次打出杀，若造成伤害则你可增加一体力上限然后恢复一体力，若没造成伤害则你摸两张牌。
			
			// 贼势：每轮限一次，当你受到一点伤害后你可弃置一张牌令此伤害减一，该回合你再受到伤害时伤害加一。
			yb_wan_fushui:'符水',//√
			yb_wan_fushui_info:'出牌阶段，你可弃置一张手牌令一名角色回复一点体力，然后其获得一个“徒”标记，一名角色最多有一个“徒”标记，你的手牌上限+x（x为场上徒标记数）',
			yb_wan_huantian:'换天',//√
			yb_wan_huantian_info:"限定技，出牌阶段，你可获得所有有“徒”标记的角色的所有手牌，然后失去技能符水，当你即将受到伤害时你可移去场上一个徒标记令伤害减一。",
			yb_wan_huangtian:'黄天',//√
			yb_wan_huangtian_info:'主公技，群雄势力角色回合内第一次造成伤害后其可令你摸一张牌。',
			yb_wan_fushui_mark:'徒',//√
			yb_wan_fushui_mark_info:'当你即将受到伤害时你可移去场上一个徒标记令伤害减一。',


			yb_wan_zhujian:'铸剑',//√
			yb_wan_zhujian_info:'出牌阶段若你武器栏没有武器，你可弃置一张黑色牌将雌雄双股剑置入你的武器栏。',
			yb_wan_zhudao:'铸刀',//√
			yb_wan_zhudao_info:'出牌阶段若你武器栏没有武器，你可弃置一张黑色牌将青龙偃月刀置入你的武器栏。',
			yb_wan_zhumao:'铸矛',//√
			yb_wan_zhumao_info:'出牌阶段若你武器栏没有武器，你可弃置一张黑色牌将丈八蛇矛置入你的武器栏。',

			yb_wan_shuanggu:'双股',//√
			yb_wan_shuanggu_info:'当你武器栏有武器时你出杀次数加一。',
			yb_wan_yijie:'义结',//√
			yb_wan_yijie_info:'出牌阶段限一次，你可先选择一名角色a，然后你再选择两名角色并与这两名角色依次拼点，你可将赢了的拼点牌收回，然后你和输了的角色对a角色各造成一点伤害。',
			yb_wan_yingai:'荫盖',//√
			yb_wan_yingai_info:'主公技，你的手牌上限为当前场上体力上限最多角色体力上限数。',

			yb_wan_xiayi:'侠义',//√
			yb_wan_xiayi_info:'每当你造成一点伤害你可弃置一张手牌视为使用一张五谷丰登。锁定技，当你拼点拼输可将你的拼点牌收回。每个回合限一次，当一名角色受到伤害后你可选择与伤害来源拼点，若你赢你可对伤害来源角色造成一点伤害。',

			yb_wan_jiazi:'家资',//√
			yb_wan_jiazi_info:'你的初始手牌加二。',
			yb_wan_haoqi:'豪气',//√
			yb_wan_haoqi_info:'锁定技，当你拼点拼赢时，你可对一名角色造成一点伤害。出牌阶段，每回合限一次，你可选择与一名角色拼点，若你输你可摸一张牌并可将这张牌交给一名角色。',

			yb_wan_yaoshu:'妖术',//√
			yb_wan_yaoshu_info:'当你成为【杀】的目标时，你可弃置一张手牌进行一次判定，若为黑色此【杀】无效；当你使用【杀】指定其他角色为目标时，你可弃置一张手牌进行一次判定，若为红色其无法响应此【杀】。',
			yb_wan_digong:'地公',//√
			yb_wan_digong_info:'每回合限一次，当你的最后一张手牌被别人获得时你可摸一张牌。你可获得你的黑色判定牌。',
			yb_wan_rengong:'人公',//√
			yb_wan_rengong_info:'锁定技，每当场上一名角色回复一点体力你可摸一张牌。一张判定牌即将生效时你可打出一张牌视为判定牌。你的摸牌数改为场上存活角色的一半，向下取整。',
			
			yb_wan_yinmou:'隐谋',
			yb_wan_yinmou_info:'锁定技，你的出牌阶段开始时你可观看一名角色所有手牌，并秘密选择其中一张手牌为“隐”，你的准备阶段开始时，若场上角色手中每有一张“隐”你加一点体力上限并回复一点体力，你的摸牌数+x（x为隐的数量），每当场上失去一张隐，你选择失去一体力上限或受到一点伤害，当你因此受到5点伤害后你失去隐谋。',
			// 隐谋：锁定技，你的出牌阶段开始时你可观看一名角色所有手牌，
			// 并秘密选择其中一张手牌为“隐”，
			// 你的准备阶段开始时，
			// 若场上角色手中每有一张“隐”你加一点体力上限并回复一点体力，
			// 你的摸牌数+x（x为隐的数量），
			// 每当场上失去一张隐，你选择失去一体力上限或受到一点伤害，
			// 当你因此受到5点伤害后你失去隐谋。
			yb_wan_qingzhu:'请诛',//√
			yb_wan_qingzhu_info:'你可令一名其他角色观看你的手牌，其选择一项：1、对一名你选择的另一名角色视为使用其中所有伤害类牌，该角色直到回合结束不能打出或使用任何手牌。2、摸伤害类牌数量数牌。然后你失去此技能，再然后若其选择的是第二项你获得技能【搏宦】。',
			yb_wan_bohuan:'搏宦',//√
			yb_wan_bohuan_info:'限定技，出牌阶段，你展示所有手牌，对一名角色使用其中所有伤害类牌，该角色不能打出或使用任何手牌直到此技能结束。然后你弃置所有手牌。',
			// yb_wan_qingzhu_info:'限定技，你可令一名角色观看你的手牌，其选择一项：1、对一名你选择的另一名角色使用其中所有伤害类牌，该角色不能打出或使用任何手牌。2、摸伤害类牌数量数牌。',
			yb_wan_qiquan:'戚权',//√
			yb_wan_qiquan_info:'你的回合外每当你失去一张手牌后你流失一点体力。每当你因摸牌阶段和此技能以外的方法获得牌时你可摸一张牌，此法摸的牌不计入手牌上限。',
			// 戚权：你的回合外每当你失去一张手牌后你受到一点伤害。
			// 每当你因摸牌阶段和此技能以外的方法获得牌时你可摸一张牌，
			// 此法摸的牌不计入手牌上限。
			yb_wan_baquan:'霸权',//√
			yb_wan_baquan_info:'锁定技，一号位摸牌阶段改为令你摸三张牌然后你可选择将其中两张牌任意分配交给场上角色，剩下的一张牌交给一号位。（场上多人拥有此技能时，此技能无效）',
			// 霸权：锁定技，
			// 一号位摸牌阶段改为令你摸三张牌然后你可选择将其中两张牌任意分配交给场上角色，
			// 剩下的一张牌交给一号位。
			yb_wan_wenfeng:'问锋',//√
			yb_wan_wenfeng_info:'出牌阶段限一次，你可令一名角色展示所有手牌，若颜色均一致其对你造成一点伤害，若不一致你对其造成一点伤害。',
			// 问锋：出牌阶段限一次，你可令一名角色展示所有手牌，
			// 若颜色均一致其对你造成一点伤害，若不一致你对其造成一点伤害。
			yb_wan_luanjing:"乱京",//√
			yb_wan_luanjing_info:"出牌阶段限一次，你可令其它角色各选择一张手牌，然后从你开始每个人依次选择获得其中一张牌。",
			// 乱京：出牌阶段限一次，你可令其它角色各选择一张手牌，然后从你开始每个人依次选择获得其中一张牌。
			yb_wan_linzuo:'麟佐',//√
			yb_wan_linzuo_info:'锁定技，开局时你选择一名其它角色获得“麟佑”标记。有“麟佑”标记的角色成为【杀】的目标时，你可对【杀】的使用者使用一张【杀】令其的【杀】无效，然后你将你区域内一张牌置于你武将牌上称为“勋”，然后“麟佑”角色需将其区域内一张牌交给你。若你的“勋”大于2，你的摸牌阶段摸牌数改为勋数量。当你使用一张锦囊牌时，“麟佑”角色可选择一项：1、令此牌无效，你摸一张牌再将一张手牌置于武将牌上称为“寂”。2、令此锦囊牌结算次数加一。你手牌上限加寂的数量。',
//  锁定技，开局时你选择一名其它角色获得“麟佑”标记。
// 有“麟佑”标记的角色成为【杀】的目标时，你可对【杀】的使用者使用一张【杀】令其的【杀】无效，
// 然后你将你区域内一张牌置于你武将牌上称为“勋”，
// 然后“麟佑”角色需将其区域内一张牌交给你。
// 若你的“勋”大于2，你的摸牌阶段摸牌数改为勋数量。
// 当你使用一张锦囊牌时，“麟佑”角色可选择一项：
// 1、令此牌无效，你摸一张牌再将一张手牌置于武将牌上称为“寂”。
// 2、令此锦囊牌结算次数加一。
//  你手牌上限加寂的数量。
			yb_wan_guojiang:'国将',//√
			yb_wan_guojiang_info:'觉醒技，准备阶段，当你的勋大于等于4时获得技能功勋、麟将。失去技能麟佐。',
			// 国将：觉醒技，准备阶段，当你的勋大于等于4时获得技能功勋、麟将。失去技能麟佐。
			yb_wan_linjiang:'麟将',//√
			yb_wan_linjiang_info:'锁定技，有“麟佑”标记的角色成为【杀】的目标时，你可对【杀】的使用者使用一张【杀】令其的【杀】无效，然后对【杀】的使用者造成一点伤害，然后你将你区域内一张牌置于你武将牌上称为“勋”，然后“麟佑”角色需将其区域内一张牌交给你。你的摸牌阶段摸牌数改为勋数量。当你使用锦囊牌时结算次数加一。',
			// 锁定技，有“麟佑”标记的角色成为【杀】的目标时，
			// 你可对【杀】的使用者使用一张【杀】令其的【杀】无效，
			// 然后对【杀】的使用者造成一点伤害，
			// 然后你将你区域内一张牌置于你武将牌上称为“勋”，
			// 然后“麟佑”角色需将其区域内一张牌交给你。
			// 你的摸牌阶段摸牌数改为勋数量。
			// 当你使用的锦囊牌时结算次数加一。
			yb_wan_gongxun_backup:'功勋',//√
			yb_wan_gongxun:'功勋',//√
			yb_wan_gongxun_info:'你可将勋如此使用：1、当一名角色即将受到伤害时你可移去一张勋防止此伤害。2、你可移去一张勋对一名角色造成一点伤害。3、你可移去一张勋令一名角色摸两张牌。',
			yb_wan_gongxun_append:'因代码水平受限（懒），ai不会出牌阶段主动发动该技能。',
			// 功勋：你可将勋如此使用： 
			// 1、当一名角色即将受到伤害时你可移去一张勋防止此伤害。
			// 2、出牌阶段以及其他角色结束阶段，你可移去一张勋对一名角色造成一点伤害。
			// 3、出牌阶段以及其他角色准备阶段，你可移去一张勋令一名角色摸两张牌。
			yb_wan_jixin:'寂心',//√
			yb_wan_jixin_info:'觉醒技，当你的寂大于你当前体力值时觉醒，移去麟佐标记且对其造成一点伤害，然后你减一点体力上限，失去技能麟佐，获得技能窥天、野妄，获得场上所有角色区域内一张牌，然后直接进入你的回合。',
			yb_wan_jixin_append:'注：无名杀乃至三国杀中都没有确切的标记大于等于某数值的时点，这里我因地制宜，采取了标记增加时，体力变化后，或体力上限变化后的时点来判断。',
			// 寂心：觉醒技，当你的寂大于你当前体力值时觉醒，
			// 移去麟佐标记且对其造成一点伤害，
			// 然后你减一点体力上限，
			// 失去技能麟佐，
			// 获得场上所有角色区域内一张手牌然后直接进入你的回合，
			// 获得技能窥天、野妄。
			yb_wan_yewang:'野妄',//√
			yb_wan_yewang_info:'每当你造成一点伤害，你可摸一张牌再将一张手牌置于武将牌上称为“寂”。 你手牌上限加寂的数量。',
			// 野妄：每当你造成一点伤害，
			// 你可摸一张牌再将一张手牌置于武将牌上称为“寂”。 
			// 你手牌上限加寂的数量。
			yb_wan_kuitian_backup:'窥天',
			yb_wan_kuitian:'窥天',//√
			yb_wan_kuitian_info:'出牌阶段限一次，你可移去一个寂，观看牌堆顶x张牌，然后选择获得其中y张牌，其余牌放回。然后你受到一点伤害。（x为场上玩家数，y为场上存活角色数。）',
			// 窥天：出牌阶段限一次，你可移去一个寂，
			// 观看牌堆顶x张牌，然后选择获得其中y张牌，
			// 其余手牌放回。然后你受到一点伤害。
			// （x为场上玩家数，y为场上存活角色数。）

			yb_wan_xiamou:'黠谋',//√
			yb_wan_xiamou_info:'每名角色的准备阶段时，你可观看牌堆顶三张牌，并任意分配至牌堆顶或牌堆底。',
			// 黠谋：每名角色的准备阶段时，
			// 你可观看牌堆顶三张牌，
			// 并任意分配至牌堆顶或牌堆底。
			yb_wan_muhua:'幕划',//√
			yb_wan_muhua_info:'每当你的一张黑色锦囊牌进入弃牌堆时你可将此牌交给一名其他角色，然后若处于你的回合内，本回合结束阶段你摸一张牌，若不在你回合内你摸一张牌。',
			// 每当你的一张黑色锦囊牌离开你的手牌区时你可将此牌交给一名其他角色，
			// 然后若处于你的回合内，本回合结束阶段你摸一张牌，
			// 若不在你回合内你摸一张牌。
			yb_wan_hanyong:'憨勇',
			yb_wan_hanyong_info:'当一名角色用杀造成伤害时，你可弃置一张手牌令伤害加一，当一名角色用杀未造成伤害后你可弃置一张手牌令其本回合出杀次数加一。每回合当你第一次用杀造成伤害你可摸一张牌。',
			// 憨勇：当一名角色用杀造成伤害后你可弃置一张手牌令伤害加一，
			// 当一名角色用杀未造成伤害后你可弃置一张手牌令其本回合出杀次数加一。
			// 每回合当你第一次用杀造成伤害你可摸一张牌。
			yb_wan_qiangxia:'枪匣',//√
			yb_wan_qiangxia_info:'锁定技，游戏开局时、你的出牌阶段开始时、你的结束阶段时，你可选择从溯麟枪、沧泪槊、潮汐矛、藏黛刺中选择两把武器置入你的武器区，这些武器离开你的装备区销毁。',
			// 枪匣：游戏开局时、你的出牌阶段开始时、你的结束阶段时，你可选择从溯麟枪、沧泪槊、潮汐矛、藏黛刺中选择两把武器置入你的武器区，这些武器离开你的装备区销毁。
			yb_wan_sulinqiang:'溯麟枪',//√
			yb_wan_sulinqiang_info:'可将锦囊牌当做无懈可击使用或打出，可将闪当杀使用或打出。',
			yb_wan_cangleishuo:'沧泪槊',//√
			yb_wan_cangleishuo_info:'当你闪避一张杀时可视为对对方使用一张杀，你使用杀可令对方无法响应。',
			yb_wan_chaoximao:'潮汐矛',//√
			yb_wan_chaoximao_info:'当你使用或打出一张基本牌时你摸一张牌。',
			yb_wan_cangdaici:'藏黛刺',//√
			yb_wan_cangdaici_info:'你对一名角色出杀时可令其非锁定技失效，能将杀当闪使用或打出。',
			yb_wan_cangdaici1:'藏黛刺',//√
			yb_wan_cangdaici1_info:'你对一名角色出杀时可令其非锁定技失效，能将杀当闪使用或打出。',
			yb_wan_cangdaici2:'藏黛刺',//√
			yb_wan_cangdaici2_info:'你对一名角色出杀时可令其非锁定技失效，能将杀当闪使用或打出。',
			// 溯麟枪：攻击距离3，可将锦囊牌当做无懈可击使用或打出，可将闪当杀使用或打出。
			// 沧泪槊：攻击距离2，当你闪避一张杀时可视为对对方打出一张杀，你打出或使用杀可令对方无法响应。
			// 潮汐矛：攻击距离4，当你使用或打出一张基本牌时你摸一张牌。
			// 藏黛刺：攻击距离1，你对一名角色出杀时可令其非锁定技失效，能将杀当闪使用或打出。
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