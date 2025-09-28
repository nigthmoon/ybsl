import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
import { precontent } from '../../packages/precontent.js';
export { skill }

/** @type { importCharacterConfig['skill'] } */
const skill = {
	//--------------------一将成名
	//--------神庞统
	ybsl_ptchiling: {
		audio: 'ext:夜白神略/audio/character:2',
		forced: true,
		trigger: {
			global: ['gameStart'],
			player: "enterGame",
		},
		filter: function (event, player, name) {
			if (name == 'gameStart' || game.phaseNumber == 0) return true;
		},
		content: function () {
			game.log('<span style=\'color:#ff7b00\'>牌堆燃起来了！！！</span>');
			game.YB_fire(ui.cardPile.childNodes);
		},
		group: ['ybsl_ptchiling_eat', 'ybsl_ptchiling_1', 'ybsl_ptchiling_2', 'ybsl_ptchiling_3'],
		mark: true,
		marktext: '焰',
		intro: {
			name: '火焰',
			content: '$',
		},
		derivation: 'ybsl_ptchiling_eat',
		subSkill: {
			eat: {
				name: '炽翎·吸收',
				audio: 'ybsl_ptchiling',
				locked: true,
				trigger: {
					global: ["loseAfter", "cardsDiscardAfter", "loseAsyncAfter"]
				},
				filter(event, player) {
					if (event.name.indexOf("lose") == 0) {
						if (event.getlx === false || event.position != ui.discardPile) return false;
					}
					return get.YB_flames(event.cards).length && get.YB_flames(event.cards).length > 0;
				},
				content() {
					player.YB_nofire(trigger.cards);
				},
				prompt: function (event, player) {
					var list = get.YB_flames(event.cards);
					list = get.translation(list);
					// <span style=\'color:#00c4ff\'>文字</span>自写颜色
					return `是否吸收<span style=\'color:#1eff00\'>${list}</span>的火焰？`
				},
				check: function () { return true },
				frequent: true,

			},
			1: {
				name: '炽翎·火伤',
				audio: 'ybsl_ptchiling',
				locked: true,
				usable: 1,
				enable: 'phaseUse',
				filter: function (event, player) {
					return player.countMark('ybsl_ptchiling') >= 2;
				},
				chooseButton: {
					dialog: function (event, player) {
						var list = [];
						for (var i = 1; i < 4; i++) {
							list.push(['消耗', get.YB_fire_num(i), 'ybsl_ptchiling' + i]);
						}
						return ui.create.dialog('炽翎', [list, 'vcard']);
					},
					filter: function (button, player) {
						var list = [2, 5, 10], list2 = [];
						for (var i = 0; i < list.length; i++) {
							if (player.countMark('ybsl_ptchiling') >= list[i]) list2.push('ybsl_ptchiling' + (i + 1))
						}
						return list2.includes(button.link[2]);
					},
					check: function (button) {
						return get.value({
							name: button.link[2],
						});
					},
					backup: function (links, player) {
						return {
							audio: 'ybsl_ptchiling',
							name: '炽翎·火伤',
							filterCard: function () { return false },
							selectCard: -1,
							filterTarget: function (card, player, target) {
								return target != player;
							},
							selectTarget: 1,
							delay: false,
							card: links[0],
							// precontent:function(){
							// 	var num=result.links[0][2].slice(-1);
							// 	num-=0;
							// 	player.removeMark('ybsl_ptchiling',get.YB_fire_num(num));
							// },
							content: lib.skill.ybsl_ptchiling_1.contentx,
							// content:function(){
							// 	// var num=result.links[0][2].slice(-1);
							// 	// num-=0;
							// 	var card = lib.skill.ybsl_ptchiling_1_backup.card;
							// 	var num=card[2].slice(-1)
							// 	num-=0;
							// 	target.damage(num,'fire');
							// },
							ai: {
								order: 1,
								expose: 1,//跳立场
								fireAttack: true,
								result: {
									player: function (player, target) {
										return get.damageEffect(target, player, player, 'fire');
									},
									target: function (player, target) {
										return get.damageEffect(target, player, target, 'fire');
									},
								}
							},
							// prompt:function (links,player){
							// 	// var card = links[0];
							// 	var num=links[0][2].slice(-1);
							// 	num-=0;
							// 	return `消耗${links[0][1]}枚火焰，对一名其他角色造成${num}点伤害`;
							// },
							// discard:false,
							// lose:false,
							// ignoreMod:true,
							// complexCard:true,
						};
					},
				},
				// hiddenCard:function (player,name){
				// 	return player.countCards('hes')>=1;
				// },
				// init:function(player){
				// 	for(var i=1;i<4;i++){
				// 		var card=game.createCard('ybsl_ptchiling'+i,null,get.YB_fire_num(i))
				// 		player.directgains([card], null, "ybsl_ptchiling");
				// 	}
				// },
				// discard:false,
				// lose:false,
				// ignoreMod:true,
				// complexCard:true,
				// position:'s',
				// filterCard:function(card,player){
				// 	var list=[2,5,10],list2=[];
				// 	for(var i = 0;i<list.length;i++){
				// 		if(player.countMark('ybsl_ptchiling')>=list[i])list2.push('ybsl_ptchiling'+(i+1))
				// 	}
				// 	return list2.includes(card.name);
				// },
				// prompt:function(event,player){
				// 	if(!player)var player=_status.event.player;
				// 	var num=player.countMark('ybsl_ptchiling');
				// 	return `当前拥有<span style=\'color:#99fffd\'>${num}</span>枚火焰，请选择炽翎的种类和目标<br>炽翎点数为消耗，炽翎后面的数字为伤害`
				// },
				// check:function(card){
				// 	return get.value(card);
				// },
				// selectCard:1,
				// filterTarget:function(card,player,target){
				// 	return target!=player;
				// },
				// selectTarget:1,
				contentx: function () {
					var card = lib.skill.ybsl_ptchiling_1_backup.card;
					var num = card[2].slice(-1)
					num -= 0;
					player.removeMark('ybsl_ptchiling', card[1]);
					target.damage(num, 'fire');
					// var num=cards[0].name.slice(-1);
					// num-=0;
					// player.removeMark('ybsl_ptchiling',get.YB_fire_num(num));
					// target.damage(num,'fire');
				},
				ai: {
					order: 1,
					expose: 1,//跳立场
					fireAttack: true,
					result: {
						player: function (player, target) {
							// return get.damageEffect(target,player,player,'fire');
							return 1;
						},
						// target:function(player,target){
						// 	return get.damageEffect(target,player,target,'fire');
						// },
					}
				},
			},
			2: {
				name: '炽翎·点燃',
				audio: 'ybsl_ptchiling',
				locked: true,
				usable: 1,
				enable: 'phaseUse',
				filter: function (event, player) {
					return player.countMark('ybsl_ptchiling') >= 20;
				},
				prompt: function (event, player) {
					if (!player) var player = _status.event.player;
					var num = player.countMark('ybsl_ptchiling');
					return `当前拥有<span style=\'color:#99fffd\'>${num}</span>枚火焰，是否消耗<span style=\'color:#ff7b00\'>20</span>枚火焰，点燃弃牌堆？`
				},
				content: function () {
					player.removeMark('ybsl_ptchiling', 20);
					game.log('<span style=\'color:#ff7b00\'>弃牌堆燃起来了！！！</span>');
					game.YB_fire(ui.discardPile.childNodes);
				},
				ai: {
					result: {
						player: function (player, target) {
							var list = ui.discardPile.childNodes, list2 = ui.cardPile.childNodes;
							if (get.YB_noflames(list) > player.countMark('ybsl_ptchiling')) return 20;
							if (get.YB_noflames(list) > ui.cardPile.childNodes.length) return 20;
							return -1;
						}
					},
					order: 6,

				}
			},
			3: {
				name: '炽翎·毕方',
				audio: 'ybsl_ptchiling',
				locked: true,
				usable: 1,
				enable: 'phaseUse',
				unique: true,
				animationColor: 'fire',
				skillAnimation: true,
				filter: function (event, player) {
					return player.countMark('ybsl_ptchiling') >= 40;
				},
				selectTarget: -1,
				filterTarget: true,
				prompt: function (event, player) {
					if (!player) var player = _status.event.player;
					var num = player.countMark('ybsl_ptchiling');
					return `当前拥有<span style=\'color:#99fffd\'>${num}</span>枚火焰，是否消耗<span style=\'color:#ff7b00\'>40</span>枚火焰，毁天灭地？<br>出牌阶段限一次，你可以移除40枚火焰，然后令场上角色依次展示手牌，然后弃置其中的附着火焰的牌并受到等量火属性伤害。`
				},
				contentBefore: function () {
					player.removeMark('ybsl_ptchiling', 40);
				},
				content: function () {
					'step 0'
					if (!target.countCards('h')) event.finish();
					else {
						target.showCards(target.getCards('h'));
						event.cards = get.YB_flames(target.getCards('h'))
					}
					'step 1'
					if (!event.cards || !event.cards.length) event.finish();
					else {
						target.discard(event.cards);
						target.damage(event.cards.length, 'fire');
					}
				},
				// content:function*(event,map){
				// 	let player=map.player,trigger=map.trigger;
				// 	yield target.showCards(target.getCards('h'));
				// 	let cards=get.YB_flames(target.getCards('h'));
				// 	yield target.discard(cards);
				// 	yield target.damage(cards.length,'fire');
				// },
				ai: {
					result: {
						player: function (player, target) {
							if (get.YB_flames(player.getCards('h')) < player.hp) {
								var targets1 = game.filterPlayer(function (target) {
									return get.attitude(player, target) > 0
								});
								var targets2 = game.filterPlayer(function (target) {
									return get.attitude(player, target) <= 0
								});
								// var num1=0,num2=0;
								if (targets1.length) {
									for (var i of targets1) {
										var num = get.YB_flames(target.getCards('h'));
										if (num > i.hp) return false;
									}
								}
								if (targets2.length) {
									for (var i of targets1) {
										var num = get.YB_flames(target.getCards('h'));
										if (num > i.hp) return true;
									}
								}
								// return 1;
							}
							return -1;
						},
						// target:function(player,target){
						// 	var num=get.YB_flames(target.getCards('h'));
						// 	return get.damageEffect(target,player,target,'fire')*num;
						// },
					},

					fireAttack: true,
					order: 6,
				}
			},
		}
	},
	ybsl_ptqiwu: {
		audio: 'ext:夜白神略/audio/character:2',
		group: ['ybsl_ptqiwu_use', 'ybsl_ptqiwu_eat', 'ybsl_ptqiwu_1', 'ybsl_ptqiwu_2', 'ybsl_ptqiwu_3'],
		ai: { combo: 'ybsl_ptchiling' },
		derivation: 'ybsl_ptqiwu_eat',
		subSkill: {
			use: {
				name: '栖梧·吸收',
				audio: 'ybsl_ptqiwu',
				enable: 'phaseUse',
				filter: function (event, player) {
					return get.YB_flames(player.getCards('h')).length && get.YB_flames(player.getCards('h')).length > 0;
				},
				discard: false,
				lose: false,
				selectCard: [1, Infinity],
				filterCard: function (card, player) {
					return get.YB_flames(player.getCards('h')).includes(card);
				},
				content: function () {
					player.showCards(cards);
					player.YB_nofire(cards);
				},
				check: function (card) {
					return true;
				},
				ai: {
					order: 1000,
					result: {
						player: 10,
					}
				}
			},
			eat: {
				audio: 'ybsl_ptqiwu',
				trigger: {
					player: 'damageBegin4',
				},
				filter: function (event, player) {
					return event.hasNature('fire');
				},
				frequent: true,
				check: function () { return true },
				content: function () {
					player.addMark('ybsl_ptchiling', trigger.num * 2);
				},
			},
			1: {
				name: '栖梧·吃桃',
				audio: 'ybsl_ptqiwu',
				usable: 1,
				// init:function(player){
				// 	for(var i=1;i<4;i++){
				// 		var card=game.createCard('ybsl_ptqiwu'+i,null,get.YB_fire_num(i))
				// 		player.directgains([card], null, "ybsl_ptqiwu");
				// 	}
				// },
				enable: 'chooseToUse',
				filter: function (event, player) {
					var filter = event.filterCard;
					if (filter({ name: 'tao' }, player, event) && player.countMark('ybsl_ptchiling') >= 2) return true;
				},
				chooseButton: {
					dialog: function (event, player) {
						var list = [];
						for (var i = 1; i < 4; i++) {
							list.push(['消耗', get.YB_fire_num(i), 'ybsl_ptqiwu' + i]);
						}
						return ui.create.dialog('栖梧', [list, 'vcard']);
					},
					filter: function (button, player) {
						var list = [2, 5, 10], list2 = [];
						for (var i = 0; i < list.length; i++) {
							if (player.countMark('ybsl_ptchiling') >= list[i]) list2.push('ybsl_ptqiwu' + (i + 1))
						}
						return list2.includes(button.link[2]);
					},
					check: function (button) {
						return get.value({
							name: button.link[2],
						});
					},
					backup: function (links, player) {
						return {
							audio: 'ybsl_ptqiwu',
							name: '栖梧·吃桃',
							filterCard: function () { return false },
							selectCard: -1,
							// filterTarget:function(card,player,target){
							// 	// return target!=player;
							// 	return false;
							// },
							// selectTarget:1,
							delay: false,
							lose: false,
							discard: false,
							cardx: links[0],
							viewAs: function () {
								var card = links[0];
								return {
									name: 'tao',
									YB_baseDamage: card[2],
								}
							},
							precontent: function () {
								event.result.cards = [];
							},
							// content:function(){
							// 	var card = lib.skill.ybsl_ptqiwu_1_backup.cardx;
							// 	var num=card[0][2].slice(-1);
							// 	num-=0;
							// 	player.removeMark('ybsl_ptchiling',get.YB_fire_num(num));
							// 	target.damage(num,'fire');
							// },
							ai: {
								order: 1,
								save: true,
								recover: 1,
								effect: {
									// player:function(player,target){
									// 	// return get.damageEffect(target,player,'fire');
									// 	return get.effect(target, { name: "tao" }, player,player);
									// },
									target: function (player, target) {
										// return get.damageEffect(target,player,'fire');
										return get.effect(target, { name: "tao" }, player, target);
									},
								}
							},
							prompt: function (links, player) {
								// var card = links[0];
								var num = links[0][2].slice(-1);
								num -= 0;
								return `消耗${links[0][1]}枚火焰，对一名角色使用数值为${num}的桃`;
							},
						};
					},
				},

				ai: {
					order: 1,
					recover: 1,
					save: true,
					result: {
						player: function (player, target) {
							// return get.damageEffect(target,player,'fire');
							return get.effect(target, { name: "tao" }, player, player);
							// return 1;
						},
						// target:function(player,target){
						// 	// return get.damageEffect(target,player,'fire');
						// 	return get.effect(target, { name: "tao" }, player,target);
						// },
					}
				},
				hiddenCard: function (player, name) {
					return player.countMark('ybsl_ptqiwu') >= 2 && name == 'tao';
				},
				// filter:function(event,player){
				// 	var filter=event.filterCard;
				// 	if(filter({name:'tao'},player,event)&&player.countMark('ybsl_ptchiling')>=2) return true;
				// },
				// discard:false,
				// lose:false,
				// ignoreMod:true,
				// complexCard:true,
				// position:'s',
				// filterCard:function(card,player){
				// 	var list=[2,5,10],list2=[];
				// 	for(var i = 0;i<list.length;i++){
				// 		if(player.countMark('ybsl_ptchiling')>=list[i])list2.push('ybsl_ptqiwu'+(i+1))
				// 	}
				// 	return list2.includes(card.name);
				// },
				// prompt:function(event,player){
				// 	if(!player)var player=_status.event.player;
				// 	var num=player.countMark('ybsl_ptchiling');
				// 	return `当前拥有<span style=\'color:#99fffd\'>${num}</span>枚火焰，请选择栖梧的种类和目标<br>栖梧点数为消耗，栖梧后面的数字为此牌回复值`
				// },
				// check:function(card){
				// 	return get.value(card);
				// },
				// selectCard:1,
				// // filterTarget:function(card,player,target){
				// // 	return target.hp < target.maxHp;
				// // },
				// // toself: true,
				// // savable: true,
				// // // modTarget: function (card, player, target) {
				// // // 	return target.hp < target.maxHp;
				// // // },
				// // selectTarget:-1,
				// viewAs:function(cards,player){
				// 	if(!cards)return null;
				// 	// var num=get.name(cards[0]).slice(-1);
				// 	var num=get.number(cards[0]);
				// 	num-=0;
				// 	//返回判断结果
				// 	if(num) return {name:'tao',isCard:false,YB_baseDamage:cards[0]};
				// 	return null;
				// },
				// viewAsFilter:function(player){
				// 	return true;
				// },
				// precontent:function(){
				// 	var num=event.result.cards[0].name.slice(-1);
				// 	num-=0;
				// 	player.removeMark('ybsl_ptchiling',get.YB_fire_num(num));
				// 	// event.card={name:'tao',cards:false,inCards:false}
				// 	// delete event.card;
				// 	event.result.cards = [];

				// 	// event.result.cards[0]
				// },
				// contentBefore:function(){
				// 	// var num=cards[0].name.slice(-1);
				// 	// num-=0;
				// 	// player.removeMark('ybsl_ptchiling',get.YB_fire_num(num));
				// 	// var cardx={name:'tao',baseDamage:num}
				// 	// player.useCard([cardx],target,'ybsl_ptqiwu');
				// },
				// content:function(){
				// 	// target.damage(num,'fire');
				// },
				// ai:{
				// 	order:1,
				// 	save:true,
				// 	result:{
				// 		target:function(player,target){
				// 			// return get.damageEffect(target,player,'fire');
				// 			return get.effect(player, { name: "tao" }, target,player);
				// 		},
				// 	}
				// },
			},
			2: {
				direct: true,
				forced: true,
				locked: true,
				charlotte: true,
				firstDo: true,
				trigger: {
					player: 'useCardBefore',
				},
				filter: function (event, player) {
					return event.card.YB_baseDamage;
				},
				content: function () {
					// game.log(1);
					// game.log(trigger.baseDamage);
					// game.log(trigger.card.YB_baseDamage);
					player.logSkill('ybsl_ptqiwu_1_backup')
					var num = trigger.card.YB_baseDamage.slice(-1);
					num -= 0;
					// var num=result.links[0][2].slice(-1);
					// num-=0;
					player.removeMark('ybsl_ptchiling', get.YB_fire_num(num));
					trigger.baseDamage = num
				}
			},
			3: {
				name: '栖梧·重明',
				audio: 'ybsl_ptqiwu',
				round: 1,
				enable: 'chooseToUse',
				filter: function (event, player) {
					if (player.countMark('ybsl_ptchiling') < 40) return false;
					if (event.type == 'dying') {
						if (player != event.dying) return false;
						return true;
					}
					return false;
				},
				content: function () {
					'step 0'
					player.removeMark('ybsl_ptchiling', 40);
					'step 1'
					player.recover(player.maxHp - player.hp);
					player.draw(3);
				},
				ai: {
					order: 10,
					skillTagFilter: function (player, arg, target) {
						if (player != target) return false;
					},
					save: true,
					result: {
						player: function (player) {
							if (player.hp <= 0) return 10;
							if (player.hp <= 2 && player.countCards('he') <= 1) return 10;
							return 0;
						}
					},
				},
			},
		}
	},
	//-----------鹰原羽依里
	hairi_shangshi: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: ['loseAfter', 'changeHp', 'gainMaxHpAfter', 'loseMaxHpAfter'],
			global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
		},
		// frequent:true,
		forced: true,
		filter: function (event, player) {
			if (event.getl && !event.getl(player)) return false;
			return player.countCards('h') < player.getDamagedHp();
		},
		content: function () {
			player.draw(player.getDamagedHp() - player.countCards('h'));
		},
		ai: {
			noh: true,
			skillTagFilter: function (player, tag) {
				if (tag == 'noh' && player.maxHp - player.hp < player.countCards('h')) {
					return false;
				}
			}
		}
	},
	hairi_zheyi: {
		trigger: {
			global: 'phaseBefore',
			player: ['enterGame', 'showCharacterAfter'],
		},
		forced: true,
		filter: function (event, player, name) {
			if (get.mode() == 'guozhan') return name == 'showCharacterAfter';
			return (name == 'enterGame' || game.phaseNumber == 0);
		},
		content: function () {
			if (get.mode() == 'guozhan' && !player.checkMainSkill('hairi_zheyi')) {
				return;
			}
			else {
				player.disableEquip('equip1');
				player.disableEquip('equip2');
				player.disableEquip('equip3');
				player.disableEquip('equip4');
				player.disableEquip('equip5');
			}
		},
	},
	hairi_zhongxia: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: 'chooseToUse',
		dutySkill: true,
		hiddenCard: function (player, name) {
			if (player.hasSkill('hairi_zhongxia_block')) return false;
			if (get.type(name) == 'basic' && lib.inpile.includes(name) && player.countCards('h') > 0) return true;
		},
		filter: function (event, player) {
			if (event.responded || player.hasSkill('hairi_zhongxia_block') || player.countCards('h') <= 0) return false;
			for (var i of lib.inpile) {
				if (get.type(i) == 'basic' && event.filterCard({ name: i }, player, event)) return true;
			}
			return false;
		},
		chooseButton: {
			dialog: function (event, player) {
				var list = [];
				for (var i of lib.inpile) {
					if (get.type(i) == 'basic' && event.filterCard({ name: i }, player, event)) {
						list.push(['基本', '', i]);
						if (i == 'sha') {
							for (var j of get.YB_natureList()) list.push(['基本', '', 'sha', j]);
						}
					}
				}
				return ui.create.dialog('终夏', [list, 'vcard'], 'hidden')
			},
			check: function (button) {
				if (button.link[2] == 'shan') return 3;
				var player = _status.event.player;
				if (button.link[2] == 'jiu') {
					if (player.getUseValue({ name: 'jiu' }) <= 0) return 0;
					if (player.countCards('h', 'sha')) return player.getUseValue({ name: 'jiu' });
				}
				return player.getUseValue({ name: button.link[2], nature: button.link[3] }) / 4;
			},
			backup: function (links, player) {
				return {
					selectCard: -1,
					filterCard: function (card, player) {
						if (player.hasSkill('hairi_zhongxia_block')) return false;
						if (player.countCards('h') <= 0) return false;
						return true;
					},
					filter: function (event, player) {
						if (player.hasSkill('hairi_zhongxia_block')) return false;
						if (player.countCards('h') <= 0) return false;
						return true;
					},
					complexCard: true,
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						suit: 'none',
						number: null,
						isCard: true,
					},
					position: 'h',
					ignoreMod: true,
					check: function (card) {
						var player = _status.event.player;
						if (player.countCards('h', { name: card.name }) > 0) return false;
						var cards = player.getCards('h');
						var list = [];
						for (var i of cards) {
							var suit = get.suit(i);
							if (list.includes(suit)) return false;
							else list.push(suit);
						}
						return true;
					},
					precontent: function () {
						'step 0'
						player.logSkill('hairi_zhongxia');
						var cards = event.result.cards;
						player.discard(cards);
						// player.draw();
						event.result.card = {
							name: event.result.card.name,
							nature: event.result.card.nature,
							isCard: true,
						};
						event.result.cards = [];
						delete event.result.skill;
						if (cards.length) {
							var list2 = [];
							for (var i = 0; i < cards.length; i++) {
								var suit = get.suit(cards[i]);
								if (list2.includes(suit)) {
									// game.log('list2:' ,list2);
									// game.log('suit:', suit);
									var evt = event.getParent();
									evt.set('hairi_zhongxia', true);
									evt.goto(0);
									player.addTempSkill('hairi_zhongxia_block');
									if (cards.length == player.maxHp || cards.length == player.maxHp - player.hp) player.gainMaxHp();
									return;
								}
								else {
									list2.push(suit);
								}
							}
							if (cards.length == player.maxHp || cards.length == player.maxHp - player.hp) player.gainMaxHp();
						}
					},
				}
			},
			prompt: function (links, player) {
				var name = links[0][2];
				var nature = links[0][3];
				return '弃置所有手牌，若以此法弃置的牌花色各不相同，则视为使用' + (get.translation(nature) || '') + get.translation(name) + '，若以此法弃置的牌数等于你体力上限，你加1点体力上限。';
			},
		},
		ai: {
			order: function (item, player) {
				// if(_status.event.type=='phase'&&!player.countMark('jinzhi2')&&player.getUseValue({name:'jiu'},null,true)>0&&player.countCards('h','sha')) return get.order({name:'jiu'})+1;
				var num = player.countCards('h');
				return Math.max(6 - num, 1);
			},
			respondShan: true,
			respondSha: true,
			// skillTagFilter:function(player){
			// if(player.countMark('jinzhi2')>=player.countCards('he')) return false;
			// },
			result: {
				player: function (player) {
					if (_status.event.dying) return get.attitude(player, _status.event.dying);
					return 1;
				}
			}
		},
		onremove: true,
		group: ['hairi_zhongxia_achieve', 'hairi_zhongxia_fail'],
		subSkill: {
			achieve: {
				trigger: {
					player: ['phaseZhunbeiBegin'],
				},
				forced: true,
				filter: function (event, player) {
					if (player.maxHp >= 5) return true;
					return false;
				},
				skillAnimation: true,
				animationColor: 'key',
				content: function () {
					'step 0'
					game.log(player, '成功完成使命');

					var list = ['获得炒饭', '重新度过夏日'];
					player.chooseControl(list).set('prompt', '将这个夏日装进口袋？');
					'step 1'
					if (result.control == '获得炒饭') {
						player.awakenSkill('hairi_zhongxia');
						player.addSkill('umi_chaofan');
						player.enableEquip('equip1');
						player.enableEquip('equip2');
						player.enableEquip('equip3');
						player.enableEquip('equip4');
						player.enableEquip('equip5');
					}
					else {
						var num = player.maxHp - 1;
						player.loseMaxHp(num);
					}
				},
			},
			fail: {
				trigger: { player: 'die' },
				direct: true,
				forceDie: true,
				filter: function (event, player) {
					return true;
				},
				content: function () {
					'step 0'
					game.log(player, '使命失败');
					player.chooseTarget(true, get.prompt('hairi_zhongxia'), '令一名其他角色获得“终夏”', lib.filter.notMe);
					'step 1'
					if (result.bool) {
						var target = result.targets[0];
						target.addSkill('hairi_zhongxia');
					}
				},
			},
			block: {
				// trigger:{global:['useCardAfter','respondAfter','useSkillAfter','phaseAfter','damage']},
				// direct:true,
				// forced:true,
				// filter:function(event,player,name){
				// 	if(name=='useSkillAfter') return (event.skill!='hairi_zhongxia'&&event.skill!='hairi_zhongxia_backup'&&event.skill!='hairi_shangshi');
				// 	return true;
				// },
				// content:function(){
				// 	// game.log(2);
				// 	player.removeSkill('hairi_zhongxia_block');
				// },
				mark: true,
				// skillBlocker:function(skill,player){
				// 	return skill=='hairi_zhongxia';
				// },
			}
		},
	},
	//鸥
	kamome_ybyangfan:{
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: ["loseAfter", "enterGame"],
			global: ["equipAfter", "addJudgeAfter", "phaseBefore", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		derivation:'kamome_suitcase',
		forced: true,
		filter(event, player,name) {
			if (typeof event.getl != "function") {
				return event.name != "phase" || game.phaseNumber == 0;
			}
			var evt = event.getl(player);
			var list = [];
			event.kamome_ybyangfan_sun_suit=false ;
			if(evt &&evt.hs&&evt.hs.length){
				if (event.name == "lose"/*||event.name=="loseAsync"*/) {
					for (var i in event.gaintag_map) {
						if (event.gaintag_map[i].includes("kamome_ybyangfan_ying")||event.gaintag_map[i].includes("kamome_ybyangfan_yan")||event.gaintag_map[i].includes("kamome_ybyangfan_sun")||event.gaintag_map[i].includes("kamome_ybyangfan_que")) {
							// console.log('lose.event:',event);
							// console.log('lose:',event.gaintag_map);
							if(event.gaintag_map[i].includes("kamome_ybyangfan_sun")){
								event.cards.forEach(c=>{
									if(c.cardid = i){
										event.kamome_ybyangfan_sun_suit=c.suit;
									}
								})
							}
							return true;
						}
					}
				}
				if(player.hasHistory("lose", evt => {
					if (event != evt.getParent()) {
						return false;
					}
					for (var i in evt.gaintag_map) {
						if (evt.gaintag_map[i].includes("kamome_ybyangfan_ying")||evt.gaintag_map[i].includes("kamome_ybyangfan_yan")||evt.gaintag_map[i].includes("kamome_ybyangfan_sun")||evt.gaintag_map[i].includes("kamome_ybyangfan_que")) {
							if(evt.gaintag_map[i].includes("kamome_ybyangfan_ying"))list.push('kamome_ybyangfan_ying');
							if(evt.gaintag_map[i].includes("kamome_ybyangfan_yan"))list.push('kamome_ybyangfan_yan');
							if(evt.gaintag_map[i].includes("kamome_ybyangfan_sun")){
								list.push('kamome_ybyangfan_sun');
								evt.cards.forEach(c=>{
									if(c.cardid = i){
										event.kamome_ybyangfan_sun_suit=c.suit;
									}
								})
								// event.kamome_ybyangfan.suit = 
							}
							if(evt.gaintag_map[i].includes("kamome_ybyangfan_que"))list.push('kamome_ybyangfan_que');
						}
					}
					if(list&&list.length>0){
						event.kamome_ybyangfan = list;
						// console.log('History.evt:',evt);
						// console.log('History:',evt.gaintag_map);
						return true;
					};
				}))return true;
			}
			if(evt && evt.player == player &&( (evt.es && evt.es.length)))return true;
		},
		async content(event,trigger,player) {
			if (trigger.cards && trigger.name == 'lose') {
				for (var i in trigger.gaintag_map) {
					if (trigger.gaintag_map[i].includes('kamome_ybyangfan_ying')) {
						game.log(player, '发动了','#y鹰·观星')
						await player.chooseToGuanxing(2).set("prompt", "鹰：点击或拖动将牌移动到牌堆顶或牌堆底");
					}
					else if (trigger.gaintag_map[i].includes('kamome_ybyangfan_yan')) {
						game.log(player, '发动了','#y燕·伤害')
						if (game.filterPlayer(current => current != player && current.isIn()).length) {
							var next = game.createEvent('kamome_ybyangfan_yan', false);
							next.player = player;
							next.setContent(async function (event, trigger, player) {
								var result = await player.chooseTarget(true, 1, '燕：对一名其他角色造成1点伤害').set('filterTarget', function (card, player, target) {
									return target != player && target.isIn();
								}).set('ai', function (target) {
									return get.damageEffect(player, target, _status.event.player);
								}).forResult();
								if (result.bool) {
									await result.targets[0].damage(player);
								}
							})
							await next;
						}
					}
					else if (trigger.gaintag_map[i].includes('kamome_ybyangfan_sun')) {
						game.log(player, '发动了','#y隼·捡牌')
						var suitx = trigger.kamome_ybyangfan_sun_suit;
						if (suitx&&ui.discardPile.childNodes.length && Array.from(ui.discardPile.childNodes).filter(c => get.type2(c) == 'trick'&&get.suit(c) == suitx)&&Array.from(ui.discardPile.childNodes).filter(c => get.type2(c) == 'trick'&&get.suit(c) == suitx).length) {
							var next = game.createEvent('kamome_ybyangfan_sun', false);
							next.player = player;
							next.suitx = suitx;
							next.setContent(async function (event, trigger, player) {
								var cardsx = Array.from(ui.discardPile.childNodes).filter(c => get.type2(c) == 'trick'&&get.suit(c) == event.suitx);
								var resultx = await player.chooseCardButton(cardsx, '隼：选择一张牌获得之', 1, true).set('ai', function (button) {
									return get.value(button.link);
								}).forResult();
								if (resultx.bool) {
									await player.gain(resultx.links[0]);
								}
							})
							await next;
						}
					}
					else if (trigger.gaintag_map[i].includes('kamome_ybyangfan_que')) {
						game.log(player, '发动了','#y雀·回复')
						await player.recover();
					}
				}
			}
			if(trigger.kamome_ybyangfan){
				var listxxx = trigger.kamome_ybyangfan;
				if (listxxx.includes('kamome_ybyangfan_ying')) {
					game.log(player, '发动了','#y鹰·观星')
					await player.chooseToGuanxing(2).set("prompt", "鹰：点击或拖动将牌移动到牌堆顶或牌堆底");
				}
				else if (listxxx.includes('kamome_ybyangfan_yan')) {
					game.log(player, '发动了','#y燕·伤害')
					if (game.filterPlayer(current => current != player && current.isIn()).length) {
						var next = game.createEvent('kamome_ybyangfan_yan', false);
						next.player = player;
						next.setContent(async function (event, trigger, player) {
							var result = await player.chooseTarget(true, 1, '燕：对一名其他角色造成1点伤害').set('filterTarget', function (card, player, target) {
								return target != player && target.isIn();
							}).set('ai', function (target) {
								return get.damageEffect(player, target, _status.event.player);
							}).forResult();
							if (result.bool) {
								await result.targets[0].damage(player);
							}
						})
						await next;
					}
				}
				else if (listxxx.includes('kamome_ybyangfan_sun')) {
					game.log(player, '发动了','#y隼·捡牌')
					var suitx = trigger.kamome_ybyangfan_sun_suit;
					if (suitx&&ui.discardPile.childNodes.length && Array.from(ui.discardPile.childNodes).filter(c => get.type2(c) == 'trick'&&get.suit(c) == suitx)&&Array.from(ui.discardPile.childNodes).filter(c => get.type2(c) == 'trick'&&get.suit(c) == suitx).length) {
						var next = game.createEvent('kamome_ybyangfan_sun', false);
						next.player = player;
						next.suitx = suitx;
						next.setContent(async function (event, trigger, player) {
							var cardsx = Array.from(ui.discardPile.childNodes).filter(c => get.type2(c) == 'trick'&&get.suit(c) == event.suitx);
							var resultx = await player.chooseCardButton(cardsx, '隼：选择一张牌获得之', 1, true).set('ai', function (button) {
								return get.value(button.link);
							}).forResult();
							if (resultx.bool) {
								await player.gain(resultx.links[0]);
							}
						})
						await next;
					}
				}
				else if (listxxx.includes('kamome_ybyangfan_que')) {
					game.log(player, '发动了','#y雀·回复')
					await player.recover();
				}
			}
			if (trigger.getl&&trigger.getl(player).es&&trigger.getl(player).es.length) {
				game.log(player, '发动了','#y鸥·召集')
				var num = player.getCards('h').filter(c=>get.kamome_ybyangfan(c)).length;
				if(4-num>0){
					var next = game.createEvent('kamome_ybyangfan', false);
					next.player = player;
					next.num=4-num;
					next.setContent(function(){
						'step 0'
						var nextx = player.gain(get.cards(event.num),'draw');
						nextx._triggered = null;
						nextx;
						event.cardsx = nextx.cards;
						'step 1'
						player.kamome_ybyangfan(event.cardsx);
					})
					await next;
					// lib.skill.kamome_ybyangfan.init(player);
				}
			} 
			if((trigger.name == "phase" && game.phaseNumber == 0)||trigger.name=='enterGame'){
				await player.equip(game.createCard2("kamome_suitcase", "spade", 1));
				player.kamome_ybyangfan();
			}
		},
		init:function(player){
			player.kamome_ybyangfan();
		},
		ai: {
			noe: true,
			reverseEquip: true,
			effect: {
				target(card, player, target, current) {
					if (get.type(card) == "equip" && !get.cardtag(card, "gifts")) {
						return [1, 3];
					}
				},
			},
		},

	},
	kamome_ybyangfan_ying:{},
	kamome_ybyangfan_yan:{},
	kamome_ybyangfan_sun:{},
	kamome_ybyangfan_que:{},
	kamome_huanmeng_ybsl_kamome:{
		audio: 'ext:夜白神略/audio/character:2',
	},
	kamome_jieban_ybsl_kamome:{
		audio: 'ext:夜白神略/audio/character:2',
	},
	// ybsl_boommoomm:{
	// 	trigger:'gainAfter',

	// },
	//成神阳太
	youta_fengshen:{
		audio:'ext:夜白神略/audio/character:2',
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		forced:true,
		filter: function (event, player) {
			if (player.name2 != undefined)return false;
			var list = ['db_key_hina','yb_key_hina'];
			if(game.filterPlayer(c=>{
				return list.includes(c.name)||list.includes(c.name1)||list.includes(c.name2)
			}).length>0)return false;
			return event.name != 'phase' || game.phaseNumber == 0;
		},
		content: function () {
			'step 0'
			player.loseMaxHp();
			'step 1'
			var name = lib.character['yb_key_hina']?'yb_key_hina':'db_key_hina';
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
	youta_yingshen:{
		ai:{
			canZhuzhan:true,
		},
		group:['youta_yingshen_zhuzhan','youta_yingshen_discard','youta_yingshen_exchange'],
		subSkill:{
			zhuzhan: {
				trigger: { player: "yingbianZhuzhanBegin" },
				forced: true,
				locked: false,
				popup: false,
				firstDo: true,
				content() {
					trigger.setContent(get.info("youta_yingshen").yingbian);
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
				filter(event,player){return event.skill=='youta_yingshen'&&(!player.storage.youta_huanshen)},
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
			event.list = game.filterPlayer(current => current.countCards("h") && (_status.connectMode || current.hasCard(cardx => get.type2(cardx) == type, "h")) || current.hasSkillTag('canZhuzhan', true)).sortBySeat(_status.currentPhase || player);
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
				if (target == player && player.hasSkill("youta_yingshen")) player.logSkill("youta_yingshen");
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
		// if(!player.storage.youta_huanshen)player.YB_exchange();
		// 	console.log(trigger.getParent())
		// 	// trigger.getParent().forceYingbian=true;
		// 	// trigger.getParent().zhuzhanresult=player;
		// 	// trigger.getParent().zhuzhanresult.YB_exchange();
		// }
		
	},
	youta_huanshen:{
		audio:'ext:夜白神略/audio/character:2',
		groupSkill: "shen",
		unique: true,
		skillAnimation:true,
		limited:true,
		animationColor: "key",
		trigger: { global: "dying" },
		mark:true,
		filter:function(event,player){
			if(player.group!='shen') return false;
			if(player.storage.youta_huanshen) return false;
			if(_status.currentPhase==event.player)return false;
			return true;
		},
		content:function(){
			'step 0'
			player.awakenSkill('youta_huanshen');
			player.storage.youta_huanshen=true;
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
	//--------------普净
	ybsl_shidao: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			global: 'phaseUseBefore',
		},
		filter(event, player) {
			if (_status.currentPhase == player) return false;
			return player.countCards('he') > 0;
		},
		cost() {
			event.result = player.choosePlayerCard(player, 'he')
				.set('prompt2', '是否展示一张牌警示' + get.translation(trigger.player) + '？')
				.set('ai', function (card) {
					var att = get.attitude(player, trigger.player);
					if (att > 0) {
						// var cards = player.getCards('he');
						if (get.type(card) == 'equip') return 3
						return 2;
					}
					return false;
				})
				.forResult();
		},
		*content(event, map) {
			let trigger = map.trigger, player = map.player, cards = event.cards;
			yield player.showCards(cards);
			var relu = yield player.chooseControl()
				.set('choiceList', ['其本阶段使用此颜色牌无次数限制', '其本阶段可以将此颜色牌当【杀】使用且不可被闪避。'])
				.set('prompt', '示刀：清选择一项').set('ai', function () {
					return 0;
					// if(get.color(event.cards[0])=='red'){
					// 	return 
					// }
				});
			if (relu.index == 0) {
				yield trigger.player.addTempSkill('ybsl_shidao_paoxiao');
				if (!player.storage.ybsl_shidao_paoxiao) yield player.storage.ybsl_shidao_paoxiao = [];
				yield trigger.player.storage.ybsl_shidao_paoxiao.push(get.color(cards[0]));
			}
			else {
				yield trigger.player.addTempSkill('ybsl_shidao_wusheng');
				if (!player.storage.ybsl_shidao_wusheng) yield player.storage.ybsl_shidao_wusheng = [];
				yield trigger.player.storage.ybsl_shidao_wusheng.push(get.color(cards[0]));
			}
			if (get.type(cards[0]) == 'equip') {
				yield trigger.player.addTempSkill(lib.card[cards[0].name].skills, { player: 'phaseUseAfter' });
			}
		},
		subSkill: {
			wusheng: {
				forced: true,
				init: function (player) {
					if (!player.storage.ybsl_shidao_wusheng) player.storage.ybsl_shidao_wusheng = [];
				},
				onremove: true,
				enable: 'chooseToUse',
				filterCard(card, player) {
					const color = get.color(card);
					return player.getStorage("ybsl_shidao_wusheng").includes(color);
				},
				position: "hes",
				viewAs: {
					name: "sha",
					storage: {
						ybsl_shidao: true,
					},
				},
				filter(event, player, name) {
					if (name && name == 'shaBegin') return event.card.name == "sha" && event.card?.storage?.ybsl_shidao == true;
					return player.getStorage("ybsl_shidao_wusheng");
				},
				viewAsFilter(player) {
					if (!player.countCards("hes", function (card) {
						const color = get.color(card);
						return player.getStorage("ybsl_shidao_wusheng").includes(color);
					})) return false;
				},
				prompt: "将一张示刀指示的牌当杀使用",
				check(card) {
					var val = get.value(card);
					return 5 - val;
				},
				trigger: { player: "shaBegin" },
				content: function () {
					if (trigger && event.triggername && event.triggername == 'shaBegin') trigger.directHit = true;
				},
				ai: {
					respondSha: true,
					skillTagFilter: function (player) {
						if (!player.countCards('he')) return false;
						var cards = player.getCards('he');
						for (var card of cards) {
							const color = get.color(card);
							if (player.getStorage("ybsl_shidao_wusheng").includes(color)) return true;
						}
					},
				},
			},
			paoxiao: {
				forced: true,
				init: function (player) {
					if (!player.storage.ybsl_shidao_paoxiao) player.storage.ybsl_shidao_paoxiao = [];
				},
				mod: {
					cardUsable(card, player) {
						const color = get.color(card);
						if (color == "unsure" || player.getStorage("ybsl_shidao_paoxiao").includes(color)) return Infinity;
					},
				},
				onremove: true,
			},
		},
		ai: {
			expose: 1,
		}
	},
	ybsl_reshidao: {
		inherit: 'ybsl_shidao',
		filter(event, player) {
			// if (_status.currentPhase == player) return false;
			return player.countCards('he') > 0;
		},
	},
	ybsl_duhun: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: { global: "die" },
		filter(event, player) { return event.player != player },
		// direct: true,
		skillAnimation: true,
		animationColor: "wood",
		forceDie: true,
		content: function () {
			"step 0";
			trigger.player
				.chooseTarget(get.prompt2("ybsl_duhun"), function (card, player, target) {
					return trigger.player != target && _status.event.sourcex != target;
				})
				.set("forceDie", true)
				.set("ai", function (target) {
					var num = get.attitude(_status.event.player, target);
					if (num > 0) {
						if (target.hp == 1) {
							num += 2;
						}
						if (target.hp < target.maxHp) {
							num += 2;
						}
					}
					return num;
				})
				.set("sourcex", trigger.source);
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				trigger.player.logSkill("zhuiyi", target);
				trigger.player.line(target, "green");
				target.recover();
				target.draw(3);
			}
		},
	},
	//--------------界纵丝
	kagari_ybzongsi: {
		enable: 'phaseUse',
		usable: 1,
		content: function () {
			'step 0'
			var controls = [];
			if (ui.cardPile.hasChildNodes()) controls.push('选择牌堆中的一张牌');
			if (ui.discardPile.hasChildNodes()) controls.push('选择弃牌堆中的一张牌');
			if (game.hasPlayer(function (current) {
				return current.countCards('hej') > 0;
			})) controls.push('选择一名角色区域内的一张牌');
			if (!controls.length) { event.finish(); return; }
			event.controls = controls;
			var next = player.chooseControl();
			next.set('choiceList', controls)
			next.set('prompt', '请选择要移动的卡牌的来源');
			next.ai = function () { return 0 };
			'step 1'
			result.control = event.controls[result.index];
			var list = ['弃牌堆', '牌堆', '角色'];
			for (var i = 0; i < list.length; i++) {
				if (result.control.indexOf(list[i]) != -1) { event.index = i; break; }
			}
			if (event.index == 2) {
				player.chooseTarget('请选择要移动的卡牌的来源', true, function (card, kagari, target) {
					return target.countCards('hej') > 0;
				});
			}
			else {
				var source = ui[event.index == 0 ? 'discardPile' : 'cardPile'].childNodes;
				var list = [];
				for (var i = 0; i < source.length; i++) list.push(source[i]);
				player.chooseButton(['请选择要移动的卡牌', list], true).ai = get.buttonValue;
			}
			'step 2'
			if (event.index == 2) {
				player.line(result.targets[0]);
				event.target1 = result.targets[0];
				player.choosePlayerCard(result.targets[0], true, 'hej').set('visible', true);
			}
			else {
				event.card = result.links[0];
			}
			'step 3'
			if (event.index == 2) event.card = result.cards[0];
			var controls = [
				'将这张牌移动到牌堆的顶部或者底部',
				'将这张牌移动到弃牌堆的顶部或者底部',
				'将这张牌移动到一名角色对应的区域里',
			];
			event.controls = controls;
			var next = player.chooseControl();
			next.set('prompt', '要对' + get.translation(event.card) + '做什么呢？');
			next.set('choiceList', controls);
			next.ai = function () { return 2 };
			'step 4'
			result.control = event.controls[result.index];
			var list = ['弃牌堆', '牌堆', '角色'];
			for (var i = 0; i < list.length; i++) {
				if (result.control.indexOf(list[i]) != -1) { event.index2 = i; break; }
			}
			if (event.index2 == 2) {
				player.chooseTarget('要将' + get.translation(card) + '移动到哪一名角色的对应区域呢', true).ai = function (target) {
					return target == _status.event.player ? 1 : 0;
				};
			}
			else {
				player.chooseControl('顶部', '底部').set('prompt', '把' + get.translation(card) + '移动到' + (event.index2 == 0 ? '弃' : '') + '牌堆的...');
			}
			'step 5'
			if (event.index2 != 2) {
				//if(event.target1) event.target1.lose(card,ui.special);
				//else card.goto(ui.special);
				event.way = result.control;
			}
			else {
				event.target2 = result.targets[0];
				var list = ['手牌区'];
				// if(lib.card[card.name].type=='equip'&&event.target2.canEquip(card)) list.push('装备区');
				list.push('装备区');
				if (!event.target2.isDisabledJudge()) list.push('判定区');
				if (list.length == 1) event._result = { control: list[0] };
				else {
					player.chooseControl(list).set('prompt', '把' + get.translation(card) + '移动到' + get.translation(event.target2) + '的...').ai = function () { return 0 };
				}
			}
			'step 6'
			if (event.index2 != 2) {
				var node = ui[event.index == 0 ? 'discardPile' : 'cardPile'];
				if (event.target1) {
					var next = event.target1.lose(card, event.position);
					if (event.way == '顶部') next.insert_card = true;
				}
				else {
					if (event.way == '底部') node.appendChild(card);
					else node.insertBefore(card, node.firstChild);
				}
				game.updateRoundNumber();
				event.finish();
			}
			else {
				if (result.control == '手牌区') {
					var next = event.target2.gain(card);
					if (event.target1) {
						next.source = event.target1;
						next.animate = 'giveAuto';
					}
					else next.animate = 'draw';
					event.goto(8);
				}
				else if (result.control == '装备区') {
					event.goto(12);
				}
				else {
					event.goto(10);
				}
			}
			'step 7'
			game.updateRoundNumber();
			event.finish();
			'step 8'

			//-----------此处设置此牌的视为牌名
			
			var list55 = [];
			for (var yb of lib.inpile) {
				// for(var yb in lib.card){
				// if(lib.card[yb].mode&&lib.card[yb].mode.includes(lib.config.mode)==false) continue;
				// if(lib.card[yb].forbid&&lib.card[yb].forbid.includes(lib.config.mode)) continue;
				// if(!lib.card[yb].type||['db_atk','db_def','pss','hstuteng'].includes(lib.card[yb].type)) continue;
				// if(lib.card[yb].type!='equip'){
				if (yb == 'sha') {
					list55.add([get.type2(yb), '', 'sha']);
					var listxx= get.YB_natureList();
					for (var zzz of listxx){
						list55.add([get.type2(yb), '', 'sha', zzz]);
						// switch (zzz) {
						// 	case 'fire': list55.add([get.type2(yb), '', 'sha', 'fire']); break;
						// 	case 'thunder': list55.add([get.type2(yb), '', 'sha', 'thunder']); break;
						// 	case 'kami': list55.add([get.type2(yb), '', 'sha', 'kami']); break;
						// 	case 'ice': list55.add([get.type2(yb), '', 'sha', 'ice']); break;
						// 	case 'stab': list55.add([get.type2(yb), '', 'sha', 'stab']); break;
						// 	default: 
						// }

					}
				}
				else {
					list55.add([get.type2(yb), '', yb]);
				}
				// }
			};
			player.chooseButton(['纵丝', '令' + ('<span class=yellowtext>' + get.translation(card) + '</span>') + '视为什（shén）么？<br>（知道有多音字，所以特意标上了读音[机智]）', [list55, 'vcard']]).set('prompt2', '将此牌转化为什（shén）么？<br>（知道有多音字，所以特意标上了读音[机智]）').set('ai', function (button) {
				var player = _status.event.player, name = button.link[2];
				return player.getUseValue({ name: name });
			});
			event.goto(9);
			'step 9'
			if (result.links) {
				var name = result.links[0][2];
				var nature = result.links[0][3];
				//主代码页有_kagari_ybzongsi_card全局技能
				game.broadcastAll(
					function(card,name,nature){
						card.addGaintag('_kagari_ybzongsi_card');
						_status.kagari_ybzongsi[card.cardid] = name;
						_status.kagari_ybzongsi_nature[card.cardid] = nature;
					},
					card,
					name,
					nature
				)

			}
			game.updateRoundNumber();
			event.finish();
			'step 10'
			var list66 = [];
			for (var yb of lib.inpile) {
				// for(var yb in lib.card){
				// if(lib.card[yb].mode&&lib.card[yb].mode.includes(lib.config.mode)==false) continue;
				// if(lib.card[yb].forbid&&lib.card[yb].forbid.includes(lib.config.mode)) continue;
				// if(!lib.card[yb].type||lib.card[yb].type.includes(['db_atk','db_def'	])) continue;
				if (lib.card[yb].type == 'delay') list66.add([get.type2(yb), '', yb]);
				if (lib.card[yb].type == 'special_delay') list66.add([get.type2(yb), '', yb]);
			};
			player.chooseButton(['纵丝', '令' + ('<span class=yellowtext>' + get.translation(card) + '</span>') + '视为什（shén）么？选择原牌名则不会转化<br>（知道有多音字，所以特意标上了读音[机智]）', [list66, 'vcard']]/*,true*/).set('prompt2', '将此牌转化为什（shén）么？选择原牌名则不会转化，取消则蓄谋<br>（知道有多音字，所以特意标上了读音[机智]）');
			'step 11'
			if (event.target1) event.target1.line(event.target2, 'water');
			if (!result.links) event.target2.addJudge({ name: 'xumou_jsrg' }, [card]);
			else if (result.links[0][2] == get.name(card)) event.target2.addJudge(card);
			else event.target2.addJudge({ name: result.links[0][2] }, [card]);
			game.updateRoundNumber();
			event.finish();
			'step 12'
			var list66 = [];
			for (var yb of lib.inpile) {
				// for(var yb in lib.card){
				// if(lib.card[yb].mode&&lib.card[yb].mode.includes(lib.config.mode)==false) continue;
				// if(lib.card[yb].forbid&&lib.card[yb].forbid.includes(lib.config.mode)) continue;
				// if(!lib.card[yb].type||lib.card[yb].type.includes(['db_atk','db_def'	])) continue;
				if (lib.card[yb].type == 'equip') list66.add([get.type2(yb), '', yb]);
			};
			player.chooseButton(['纵丝', '令' + ('<span class=yellowtext>' + get.translation(card) + '</span>') + '视为什（shén）么？选择原牌名则不会转化<br>（知道有多音字，所以特意标上了读音[机智]）', [list66, 'vcard']]/*,true*/).set('prompt2', '将此牌转化为什（shén）么？选择原牌名则不会转化，取消则蓄谋<br>（知道有多音字，所以特意标上了读音[机智]）');
			'step 13'
			if (event.target1) event.target1.$give(card, event.target2);
			// event.target2.equip(card);
			if (!result.links) event.target2.equip(card);
			else if (result.links[0][2] == get.name(card)) event.target2.equip(card);
			// else event.target2.addJudge({name:result.links[0][2]},[card]);
			else event.target2.equip(get.autoViewAs({ name: result.links[0][2] }, [card]), [card]);
			// else event.target2.equip({name:result.links[0][2]},[card]);
			game.updateRoundNumber();
			event.finish();
		},
		ai: {
			order: 10,
			result: { player: 1 },
		},
	},
	//--------------测试纵丝
	kagari_ybzongsix: {
		enable: 'phaseUse',
		usable: 1,
		content: function () {
			'step 0'
			var controls = [];
			if (ui.cardPile.hasChildNodes()) controls.push('选择牌堆中的一张牌');
			if (ui.discardPile.hasChildNodes()) controls.push('选择弃牌堆中的一张牌');
			if (game.hasPlayer(function (current) {
				return current.countCards('hej') > 0;
			})) controls.push('选择一名角色区域内的一张牌');
			if (!controls.length) { event.finish(); return; }
			event.controls = controls;
			var next = player.chooseControl();
			next.set('choiceList', controls)
			next.set('prompt', '请选择要移动的卡牌的来源');
			next.ai = function () { return 0 };
			'step 1'
			result.control = event.controls[result.index];
			var list = ['弃牌堆', '牌堆', '角色'];
			for (var i = 0; i < list.length; i++) {
				if (result.control.indexOf(list[i]) != -1) { event.index = i; break; }
			}
			if (event.index == 2) {
				player.chooseTarget('请选择要移动的卡牌的来源', true, function (card, kagari, target) {
					return target.countCards('hej') > 0;
				});
			}
			else {
				var source = ui[event.index == 0 ? 'discardPile' : 'cardPile'].childNodes;
				var list = [];
				for (var i = 0; i < source.length; i++) list.push(source[i]);
				player.chooseButton(['请选择要移动的卡牌', list], true).ai = get.buttonValue;
			}
			'step 2'
			if (event.index == 2) {
				player.line(result.targets[0]);
				event.target1 = result.targets[0];
				player.choosePlayerCard(result.targets[0], true, 'hej').set('visible', true);
			}
			else {
				event.card = result.links[0];
			}
			'step 3'
			if (event.index == 2) event.card = result.cards[0];
			var controls = [
				'将这张牌移动到牌堆的顶部或者底部',
				'将这张牌移动到弃牌堆的顶部或者底部',
				'将这张牌移动到一名角色对应的区域里',
			];
			event.controls = controls;
			var next = player.chooseControl();
			next.set('prompt', '要对' + get.translation(event.card) + '做什么呢？');
			next.set('choiceList', controls);
			next.ai = function () { return 2 };
			'step 4'
			result.control = event.controls[result.index];
			var list = ['弃牌堆', '牌堆', '角色'];
			for (var i = 0; i < list.length; i++) {
				if (result.control.indexOf(list[i]) != -1) { event.index2 = i; break; }
			}
			if (event.index2 == 2) {
				player.chooseTarget('要将' + get.translation(card) + '移动到哪一名角色的对应区域呢', true).ai = function (target) {
					return target == _status.event.player ? 1 : 0;
				};
			}
			else {
				player.chooseControl('顶部', '底部').set('prompt', '把' + get.translation(card) + '移动到' + (event.index2 == 0 ? '弃' : '') + '牌堆的...');
			}
			'step 5'
			if (event.index2 != 2) {
				//if(event.target1) event.target1.lose(card,ui.special);
				//else card.goto(ui.special);
				event.way = result.control;
			}
			else {
				event.target2 = result.targets[0];
				var list = ['手牌区'];
				// if(lib.card[card.name].type=='equip'&&event.target2.canEquip(card)) list.push('装备区');
				list.push('装备区');
				if (!event.target2.isDisabledJudge()) list.push('判定区');
				if (list.length == 1) event._result = { control: list[0] };
				else {
					player.chooseControl(list).set('prompt', '把' + get.translation(card) + '移动到' + get.translation(event.target2) + '的...').ai = function () { return 0 };
				}
			}
			'step 6'
			if (event.index2 != 2) {
				var node = ui[event.index == 0 ? 'discardPile' : 'cardPile'];
				if (event.target1) {
					var next = event.target1.lose(card, event.position);
					if (event.way == '顶部') next.insert_card = true;
				}
				else {
					if (event.way == '底部') node.appendChild(card);
					else node.insertBefore(card, node.firstChild);
				}
				game.updateRoundNumber();
				event.finish();
			}
			else {
				if (result.control == '手牌区') {
					var next = event.target2.gain(card);
					if (event.target1) {
						next.source = event.target1;
						next.animate = 'giveAuto';
					}
					else next.animate = 'draw';
					event.goto(8);
				}
				else if (result.control == '装备区') {
					event.goto(12);
				}
				else {
					event.goto(10);
				}
			}
			'step 7'
			game.updateRoundNumber();
			event.finish();
			'step 8'

			//-----------此处设置此牌的视为牌名
			var list55 = [];
			// for (var yb of lib.inpile) {
			for(var yb in lib.card){
				// if(lib.card[yb].mode&&lib.card[yb].mode.includes(lib.config.mode)==false) continue;
				// if(lib.card[yb].forbid&&lib.card[yb].forbid.includes(lib.config.mode)) continue;
				// if(!lib.card[yb].type||['db_atk','db_def','pss','hstuteng'].includes(lib.card[yb].type)) continue;
				// if(lib.card[yb].type!='equip'){
				if (yb == 'sha') {
					list55.add([get.type2(yb), '', 'sha']);
					var listxx= get.YB_natureList();
					for (var zzz of listxx){
						list55.add([get.type2(yb), '', 'sha', zzz]);
						// switch (zzz) {
						// 	case 'fire': list55.add([get.type2(yb), '', 'sha', 'fire']); break;
						// 	case 'thunder': list55.add([get.type2(yb), '', 'sha', 'thunder']); break;
						// 	case 'kami': list55.add([get.type2(yb), '', 'sha', 'kami']); break;
						// 	case 'ice': list55.add([get.type2(yb), '', 'sha', 'ice']); break;
						// 	case 'stab': list55.add([get.type2(yb), '', 'sha', 'stab']); break;
						// 	default: 
						// }

					}
				}
				else {
					list55.add([get.type2(yb), '', yb]);
				}
				// }
			};
			player.chooseButton(['纵丝', '令' + ('<span class=yellowtext>' + get.translation(card) + '</span>') + '视为什（shén）么？<br>（知道有多音字，所以特意标上了读音[机智]）', [list55, 'vcard']]).set('prompt2', '将此牌转化为什（shén）么？<br>（知道有多音字，所以特意标上了读音[机智]）').set('ai', function (button) {
				var player = _status.event.player, name = button.link[2];
				return player.getUseValue({ name: name });
			});
			event.goto(9);
			'step 9'
			if (result.links) {
				var name = result.links[0][2];
				var nature = result.links[0][3];
				//主代码页有_kagari_ybzongsi_card全局技能
				game.broadcastAll(
					function(card,name,nature){
						card.addGaintag('_kagari_ybzongsi_card');
						_status.kagari_ybzongsi[card.cardid] = name;
						_status.kagari_ybzongsi_nature[card.cardid] = nature;
					},
					card,
					name,
					nature
				)

			}
			game.updateRoundNumber();
			event.finish();
			'step 10'
			var list66 = [];
			// for (var yb of lib.inpile) {
			for(var yb in lib.card){
				// if(lib.card[yb].mode&&lib.card[yb].mode.includes(lib.config.mode)==false) continue;
				// if(lib.card[yb].forbid&&lib.card[yb].forbid.includes(lib.config.mode)) continue;
				// if(!lib.card[yb].type||lib.card[yb].type.includes(['db_atk','db_def'	])) continue;
				if (lib.card[yb].type == 'delay') list66.add([get.type2(yb), '', yb]);
				if (lib.card[yb].type == 'special_delay') list66.add([get.type2(yb), '', yb]);
			};
			player.chooseButton(['纵丝', '令' + ('<span class=yellowtext>' + get.translation(card) + '</span>') + '视为什（shén）么？选择原牌名则不会转化<br>（知道有多音字，所以特意标上了读音[机智]）', [list66, 'vcard']]/*,true*/).set('prompt2', '将此牌转化为什（shén）么？选择原牌名则不会转化，取消则蓄谋<br>（知道有多音字，所以特意标上了读音[机智]）');
			'step 11'
			if (event.target1) event.target1.line(event.target2, 'water');
			if (!result.links) event.target2.addJudge({ name: 'xumou_jsrg' }, [card]);
			else if (result.links[0][2] == get.name(card)) event.target2.addJudge(card);
			else event.target2.addJudge({ name: result.links[0][2] }, [card]);
			game.updateRoundNumber();
			event.finish();
			'step 12'
			var list66 = [];
			for (var yb of lib.inpile) {
				// for(var yb in lib.card){
				// if(lib.card[yb].mode&&lib.card[yb].mode.includes(lib.config.mode)==false) continue;
				// if(lib.card[yb].forbid&&lib.card[yb].forbid.includes(lib.config.mode)) continue;
				// if(!lib.card[yb].type||lib.card[yb].type.includes(['db_atk','db_def'	])) continue;
				if (lib.card[yb].type == 'equip') list66.add([get.type2(yb), '', yb]);
			};
			player.chooseButton(['纵丝', '令' + ('<span class=yellowtext>' + get.translation(card) + '</span>') + '视为什（shén）么？选择原牌名则不会转化<br>（知道有多音字，所以特意标上了读音[机智]）', [list66, 'vcard']]/*,true*/).set('prompt2', '将此牌转化为什（shén）么？选择原牌名则不会转化，取消则蓄谋<br>（知道有多音字，所以特意标上了读音[机智]）');
			'step 13'
			if (event.target1) event.target1.$give(card, event.target2);
			// event.target2.equip(card);
			if (!result.links) event.target2.equip(card);
			else if (result.links[0][2] == get.name(card)) event.target2.equip(card);
			// else event.target2.addJudge({name:result.links[0][2]},[card]);
			else event.target2.equip(get.autoViewAs({ name: result.links[0][2] }, [card]), [card]);
			// else event.target2.equip({name:result.links[0][2]},[card]);
			game.updateRoundNumber();
			event.finish();
		},
		ai: {
			order: 10,
			result: { player: 1 },
		},
	},
	//--------------张琪瑛改（界了法箓点化真仪）
	xinfu_ybfalu: {
		forced: true,
		audio: 'xinfu_falu',
		trigger: {
			player: ['loseAfter', 'enterGame'],
			global: 'phaseBefore',
		},
		filter: function (event, player) {
			if (event.name != 'lose') return (event.name != 'phase' || game.phaseNumber == 0);
			if (event.type != 'discard') return false;
			for (var i = 0; i < event.cards2.length; i++) {
				if (!player.hasMark('xinfu_falu_' + get.suit(event.cards2[i])) ||
					player.countMark('xinfu_falu_' + get.suit(event.cards2[i])) < 3) return true;
				else if (player.countMark('xinfu_falu_' + get.suit(event.cards2[i])) >= 3 && player.countMark('xinfu_falu_none') < 3) {
					return true;
				}
			}
			return false;
		},
		content: function () {
			if (trigger.name != 'lose') {
				var list66 = ['spade', 'heart', 'club', 'diamond', 'none'];
				for (var i = 0; i < list66.length; i++) {
					if (!player.hasMark('xinfu_falu_' + list66[i])) player.addMark('xinfu_falu_' + list66[i]);
				}
				return;
			}
			for (var i = 0; i < trigger.cards2.length; i++) {
				var suit = get.suit(trigger.cards2[i]);
				if (!player.hasMark('xinfu_falu_' + suit) || player.countMark('xinfu_falu_' + suit) < 3) {
					player.addMark('xinfu_falu_' + suit);
				}
				else if (player.countMark('xinfu_falu_' + suit) >= 3 && player.countMark('xinfu_falu_none') < 3) {
					player.addMark('xinfu_falu_none');
				}
			}
		},
		ai: { threaten: 1.4 },
	},
	xinfu_falu_none: {
		marktext: '◈',
		intro: {
			name: '虚无',
			content: 'mark',
		},
	},
	"xinfu_ybzhenyi": {
		group: ["xinfu_ybzhenyi_spade", "xinfu_ybzhenyi_club", "xinfu_ybzhenyi_heart"],
		trigger: {
			player: "damageEnd",
		},
		audio: 'xinfu_zhenyi',
		filter: function (event, player) {
			//if(!event.hasNature()) return false;
			return (player.hasMark('xinfu_falu_diamond') || player.hasMark('xinfu_falu_none'));
		},
		prompt2: '弃置「勾陈♦」标记，从牌堆中获得每种类型的牌各一张。',
		content: function () {
			'step 0'
			if (player.hasMark('xinfu_falu_diamond')) player.removeMark('xinfu_falu_diamond');
			else player.removeMark('xinfu_falu_none');
			event.num = 0;
			event.togain = [];
			'step 1'
			var card = get.cardPile(function (card) {
				for (var i = 0; i < event.togain.length; i++) {
					if (get.type(card, 'trick') == get.type(event.togain[i], 'trick')) return false;
				}
				return true;
			});
			if (card) {
				event.togain.push(card);
				event.num++;
				if (event.num < 3) event.redo();
			}
			'step 2'
			if (event.togain.length) {
				player.gain(event.togain, 'gain2');
			}
		},
		subSkill: {
			spade: {
				trigger: {
					global: "judge",
				},
				direct: true,
				filter: function (event, player) {
					return (player.hasMark('xinfu_falu_spade') || player.hasMark('xinfu_falu_none'));
				},
				content: function () {
					"step 0"
					var str = get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
						get.translation(trigger.player.judging[0]) + '，是否发动【真仪】，弃置「紫薇♠」标记并修改判定结果？';
					player.chooseControl('spade', 'heart', 'diamond', 'club', 'cancel2').set('prompt', str).set('ai', function () {
						//return '取消';
						var judging = _status.event.judging;
						var trigger = _status.event.getTrigger();
						var res1 = trigger.judge(judging);
						var list = lib.suit.slice(0);
						var attitude = get.attitude(player, trigger.player);
						if (attitude == 0) return 0;
						var getj = function (suit) {
							return trigger.judge({
								name: get.name(judging),
								nature: get.nature(judging),
								suit: suit,
								number: 5,
							})
						};
						list.sort(function (a, b) {
							return (getj(b) - getj(a)) * get.sgn(attitude);
						});
						if ((getj(list[0]) - res1) * attitude > 0) return list[0];
						return 'cancel2';
					}).set('judging', trigger.player.judging[0]);
					"step 1"
					if (result.control != 'cancel2') {
						player.addExpose(0.25);
						if (player.hasMark('xinfu_falu_spade')) player.removeMark('xinfu_falu_spade');
						else player.removeMark('xinfu_falu_none');
						player.logSkill('xinfu_ybzhenyi', trigger.player);
						//player.line(trigger.player);
						player.popup(result.control);
						game.log(player, '将判定结果改为了', '#y' + get.translation(result.control + 2) + 5);
						trigger.fixedResult = {
							suit: result.control,
							color: get.color({ suit: result.control }),
							number: 5,
						};
					}
				},
				ai: {
					rejudge: true,
					tag: {
						rejudge: 1,
					},
					expose: 0.5,
				},
			},
			club: {
				audio: 'xinfu_zhenyi',
				enable: "chooseToUse",
				viewAsFilter: function (player) {
					if (player == _status.currentPhase) return false;
					return (player.hasMark('xinfu_falu_club') || player.hasMark('xinfu_falu_none')) && player.countCards('hs') > 0;
				},
				filterCard: true,
				position: "hs",
				viewAs: {
					name: "tao",
				},
				prompt: "弃置「后土♣」标记，将一张手牌当桃使用",
				check: function (card) { return 15 - get.value(card) },
				precontent: function () {
					if (player.hasMark('xinfu_falu_club')) player.removeMark('xinfu_falu_club');
					else player.removeMark('xinfu_falu_none');
				},
			},
			heart: {
				trigger: {
					source: "damageBegin1",
				},
				audio: 'xinfu_zhenyi',
				filter: function (event, player) {
					return (player.hasMark('xinfu_falu_heart') || player.hasMark('xinfu_falu_none'));
				},
				check: function (event, player) {
					if (get.attitude(player, event.player) >= 0) return false;
					if (event.player.hasSkillTag('filterDamage', null, {
						player: player,
						card: event.card,
					})) return false;
					return true;
					//return player.hasMark('xinfu_falu_spade')||get.color(ui.cardPile.firstChild)=='black';
				},
				prompt2: function (event) {
					return '弃置「玉清♥」标记，令对' + get.translation(event.player) + '即将造成的伤害+1。';
				},
				logTarget: "player",
				content: function () {
					if (player.hasMark('xinfu_falu_heart')) player.removeMark('xinfu_falu_heart');
					else player.removeMark('xinfu_falu_none');
					trigger.num++;
				},
			},
		}
	},
	"xinfu_ybdianhua": {
		trigger: {
			player: ["phaseZhunbeiBegin", "phaseJieshuBegin"],
		},
		frequent: true,
		audio: 'xinfu_dianhua',
		filter: function (event, player) {
			var list = ['spade', 'heart', 'club', 'diamond', 'none'];
			for (var i = 0; i < list.length; i++) {
				if (player.hasMark('xinfu_falu_' + list[i])) return true;
			}
			return false;
		},
		content: function () {
			'step 0'
			var num = 0;
			var list66 = ['spade', 'heart', 'club', 'diamond', 'none'];
			for (var i = 0; i < list66.length; i++) {
				if (player.hasMark('xinfu_falu_' + list66[i])) num += (player.countMark('xinfu_falu_' + list66[i]));
			}
			var cards = get.cards(num);
			game.cardsGotoOrdering(cards);
			var next = player.chooseToMove();
			next.set('list', [
				['牌堆顶', cards],
				['牌堆底'],
			]);
			next.set('prompt', '点化：点击将牌移动到牌堆顶或牌堆底');
			next.processAI = function (list) {
				var cards = list[0][1], player = _status.event.player;
				var target = (_status.event.getTrigger().name == 'phaseZhunbei') ? player : player.next;
				var att = get.sgn(get.attitude(player, target));
				var top = [];
				var judges = target.getCards('j');
				var stopped = false;
				if (player != target || !target.hasWuxie()) {
					for (var i = 0; i < judges.length; i++) {
						var judge = get.judge(judges[i]);
						cards.sort(function (a, b) {
							return (judge(b) - judge(a)) * att;
						});
						if (judge(cards[0]) * att < 0) {
							stopped = true; break;
						}
						else {
							top.unshift(cards.shift());
						}
					}
				}
				var bottom;
				if (!stopped) {
					cards.sort(function (a, b) {
						return (get.value(b, player) - get.value(a, player)) * att;
					});
					while (cards.length) {
						if ((get.value(cards[0], player) <= 5) == (att > 0)) break;
						top.unshift(cards.shift());
					}
				}
				bottom = cards;
				return [top, bottom];
			}
			"step 1"
			var top = result.moved[0];
			var bottom = result.moved[1];
			top.reverse();
			for (var i = 0; i < top.length; i++) {
				ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
			}
			for (i = 0; i < bottom.length; i++) {
				ui.cardPile.appendChild(bottom[i]);
			}
			player.popup(get.cnNumber(top.length) + '上' + get.cnNumber(bottom.length) + '下');
			game.log(player, '将' + get.cnNumber(top.length) + '张牌置于牌堆顶');
			game.updateRoundNumber();
			game.delayx();
		},
		ai: {
			threaten: 2.2
		},
	},
	//----------------界神诸葛亮
	ybsl_qixing: {
		audio: 'qixing',
		unique: true,
		trigger: {
			global: 'phaseBefore',
			player: 'enterGame',
		},
		forced: true,
		locked: false,
		filter: function (event, player) {
			return (event.name != 'phase' || game.phaseNumber == 0);
		},
		content: function () {
			"step 0"
			player.addToExpansion(get.cards(7), 'draw').gaintag.add('qixing');
			"step 1"
			var cards = player.getExpansions('qixing');
			if (!cards.length || !player.countCards('h')) {
				event.finish();
				return;
			}
			var next = player.chooseToMove('七星：是否交换“星”和手牌？');
			next.set('list', [
				[get.translation(player) + '（你）的星', cards],
				['手牌区', player.getCards('h')],
			]);
			next.set('filterMove', function (from, to) {
				return typeof to != 'number';
			});
			next.set('processAI', function (list) {
				var player = _status.event.player, cards = list[0][1].concat(list[1][1]).sort(function (a, b) {
					return get.useful(a) - get.useful(b);
				}), cards2 = cards.splice(0, player.getExpansions('qixing').length);
				return [cards2, cards];
			});
			"step 2"
			if (result.bool) {
				var pushs = result.moved[0], gains = result.moved[1];
				pushs.removeArray(player.getExpansions('qixing'));
				gains.removeArray(player.getCards('h'));
				if (!pushs.length || pushs.length != gains.length) return;
				player.addToExpansion(pushs, player, 'giveAuto').gaintag.add('qixing');
				//game.log(player,'将',pushs,'作为“星”置于武将牌上');
				player.gain(gains, 'draw');
			}
		},
		intro: {
			markcount: function (storage, player) {
				var content = player.getExpansions('qixing');
				return content.length;
			},
			mark: function (dialog, content, player) {
				var content = player.getExpansions('qixing');
				if (content && content.length) {
					if (player == game.me || player.isUnderControl()) {
						dialog.addAuto(content);
					}
					else {
						return '共有' + get.cnNumber(content.length) + '张星';
					}
				}
			},
			content: function (content, player) {
				var content = player.getExpansions('qixing');
				if (content && content.length) {
					if (player == game.me || player.isUnderControl()) {
						return get.translation(content);
					}
					return '共有' + get.cnNumber(content.length) + '张星';
				}
			}
		},
		group: ['ybsl_qixing_2'],
		ai: { combo: 'dawu' },
		subSkill: {
			2: {
				trigger: {
					player: 'phaseDrawAfter'
				},
				prompt: '收回所有星，并将至多七张手牌充入星',
				content: function () {
					'step 0'
					player.gain(player.getExpansions('qixing'), 'gain2');
					player.logSkill('qixing2');
					'step 1'
					player.chooseCard('h', [1, 7], '将至多七张手牌置于武将牌上称为星').set('ai', function (card) {
						return 6 - get.value(card);
					});
					'step 2'
					game.log(player, '将', result.cards, '作为“星”置于武将牌上');
					player.addToExpansion(result.cards, player, 'giveAuto').gaintag.add('qixing');
				},
			}
		}
	},
	ybsl_kuangfeng: {
		unique: true,
		audio: 2,
		enable: 'phaseUse',
		usable: 1,
		filter: function (event, player) {
			return player.getExpansions('qixing').length;
		},
		filterTarget: function (card, player, target) {
			return !target.hasSkill('kuangfeng2');
		},
		selectTarget: 1,
		content: function () {
			'step 0'
			target.addAdditionalSkill(`kuangfeng_${player.playerid}`, 'kuangfeng2');
			target.markAuto('kuangfeng2', [player]);
			player.addTempSkill('kuangfeng3', { player: 'phaseBeginStart' })
			player.chooseCardButton('选择弃置' + get.cnNumber(1) + '张“星”', 1, player.getExpansions('qixing'), true);
			'step 1'
			player.loseToDiscardpile(result.links);
		},
		ai: { combo: 'ybsl_qixing' },
		group: 'ybsl_kuangfeng_66',
		subSkill: {
			66: {
				unique: true,
				audio: 2,
				trigger: { player: 'phaseJieshuBegin' },
				direct: true,
				filter: function (event, player) {
					return player.getExpansions('qixing').length;
				},
				content: function () {
					'step 0'
					player.chooseTarget(get.prompt('kuangfeng'), '令一名角色获得“狂风”标记', function (card, player, target) {
						return !target.hasSkill('kuangfeng2');
					}).ai = function (target) {
						return -1;
					}
					'step 1'
					if (result.bool) {
						var targets = result.targets.sortBySeat();
						player.logSkill('kuangfeng', targets, 'fire');
						var length = targets.length;
						targets.forEach(target => {
							target.addAdditionalSkill(`kuangfeng_${player.playerid}`, 'kuangfeng2');
							target.markAuto('kuangfeng2', [player]);
						});
						player.addTempSkill('kuangfeng3', { player: 'phaseBeginStart' })
						player.chooseCardButton('选择弃置' + get.cnNumber(length) + '张“星”', length, player.getExpansions('qixing'), true);
					}
					else {
						event.finish();
					}
					'step 2'
					player.loseToDiscardpile(result.links);
				},
			}
		}
	},
	//------------界佐藤雏（神视）
	hina_ybshenshi: {
		firstDo: true,
		groupSkill: true,
		trigger: { player: ['phaseUseBegin', 'phaseUseEnd'] },
		frequent: true,
		filter: function (event, player) {
			return player.group == 'shen';
		},
		content: function () {
			'step 0'
			player.draw(2).gaintag = ['hina_shenshi'];
			player.addSkill('hina_shenshi_yingbian');
			'step 1'
			var cards = player.getCards('h', function (card) {
				// return card.hasGaintag('hina_shenshi');
				return true
			});
			if (!cards.length) event.finish();
			else if (cards.length == 1) event._result = { bool: true, cards: cards };
			else player.chooseCard('h', true, '将一张牌置于牌堆顶');
			'step 2'
			if (result.bool) {
				game.log(player, '将一张牌置于了牌堆顶');
				player.lose(result.cards, ui.cardPile, 'insert');
				player.$throw(1, 1000);
			}
			else event.finish();
			'step 3'
			game.delayx();
		},
		onremove: function (player) {
			player.removeGaintag('hina_shenshi');
		},
		mod: {
			ignoredHandcard: function (card, player) {
				if (card.hasGaintag('hina_shenshi')) return true;
			},
			cardDiscardable: function (card, player, name) {
				if (name == 'phaseDiscard' && card.hasGaintag('hina_shenshi')) return false;
			},
		},
		group: 'hina_shenshi_yingbian',
	},
	//------------界神户小鸟
	kotori_ybyumo: {
		trigger: {
			global: ['phaseBefore', 'die'],
			player: 'enterGame',
		},
		forced: true,
		charlotte: true,
		filter: function (event, player) {
			return (event.name != 'phase' || game.phaseNumber == 0 || event.name == 'die');
		},
		content: function () {
			var list = ['wei', 'shu', 'wu', 'qun', 'jin', 'key', 'YB_memory', 'YB_dream'];
			for (var i of list) {
				if (player.countMark('kotori_yumo_' + i) < 3) {
					player.addMark('kotori_yumo_' + i, 1, false);
					game.log(player, '获得了一个', lib.translate['kotori_yumo_' + i].replace(/魔物/g, '【魔物】'));
				}
			}
		},
		group: ['kotori_ybyumo_damage', 'kotori_ybyumo_gain'],
		subSkill: {
			damage: {
				trigger: { global: 'damageEnd', player: 'phaseBegin' },
				forced: true,
				filter: function (event, player) {
					var name = 'kotori_yumo_' + event.player.group;
					return (lib.skill[name] && player.countMark(name) < 3) || event.player.group == 'shen';
				},
				popup: false,
				content: function () {
					'step 0'
					game.log(player, '对', trigger.player, '发动了', '#g【驭魔】');
					if (trigger.player.group == 'shen') {
						event.num = 0;
						event.goto(1);
					}
					else {
						var group = trigger.player.group;
						player.popup('驭魔', get.groupnature(group));
						player.addMark('kotori_yumo_' + group, 1, false);
						game.log(player, '获得了一个', lib.translate['kotori_yumo_' + group].replace(/魔物/g, '【魔物】'));
						event.finish();
					}
					'step 1'
					event.num++;
					event.list = ['wei', 'shu', 'wu', 'qun', 'key', 'jin', 'YB_memory', 'YB_dream'];
					event.list2 = [];
					for (var i of event.list) {
						if (player.countMark('kotori_yumo_' + i) < 3) {
							event.list2.push(i);
						}
					}
					'step 2'
					if (event.list2.length > 0) {
						var group = event.list2.randomGets(1);
						player.popup('驭魔', get.groupnature(group[0]));
						player.addMark('kotori_yumo_' + group[0], 1, false);
						game.log(player, '获得了一个', lib.translate['kotori_yumo_' + group[0]].replace(/魔物/g, '【魔物】'));
					}
					else { event.goto(3); }
					'step 3'
					if (event.num && event.num < 2) {
						event.goto(1);
					}
					else {
						event.finish();
					}
				},
			},
			gain: {
				trigger: { player: 'phaseBegin' },
				direct: true,
				filter: function (event, player) {
					var list = ['wei', 'shu', 'wu', 'qun', 'key', 'jin', 'YB_memory', 'YB_dream'];
					for (var i in list) {
						if (player.hasMark('kotori_yumo_' + list[i])) return true;
					}
					return false;
				},
				content: function () {
					'step 0'
					event.list = ['wei', 'shu', 'wu', 'qun', 'key', 'jin', 'YB_memory', 'YB_dream'];
					event.list2 = [];
					for (var i of event.list) {
						if (player.hasMark('kotori_yumo_' + i)) event.list2.push('kotori_skill_' + i);
					}
					event.list2.push('cancel2');
					'step 1'
					player.chooseControl(event.list2).set('prompt', '###是否发动【驭魔】？###弃置对应的标记并获得下列技能中的一个，或点取消，不获得技能').set('choice', function () {
						if (event.list2.includes('kotori_skill_shu') && player.countCards('h', function (card) {
							return get.name(card, player) == 'sha' && player.getUseValue(card) > 0;
						}) > 1) return 'kotori_skill_shu';
						if (event.list2.includes('kotori_skill_key') && player.hp > 1) return 'kotori_skill_key';
						if (event.list2.includes('kotori_skill_qun') && player.isDamaged() && player.needsToDiscard() > 1) return 'kotori_skill_qun';
						return 'cancel2';
					}()).set('ai', function () {
						return _status.event.choice;
					});
					'step 2'
					if (result.control != 'cancel2') {
						player.logSkill('kotori_yumo');
						var name = 'kotori_yumo_' + result.control.slice(13);
						player.removeMark(name, 1, false); game.log(player, '移去了一个', lib.translate[name].replace(/魔物/g, '【魔物】'));
						player.addTempSkill(result.control);
						game.log(player, '获得了技能', lib.translate[name].replace(/魔物/g, '【' + get.translation(result.control) + '】'));
						event.list2.remove(result.control);
						event.goto(1)
					}
				},
			},
		},
	},
	kotori_yumo_YB_memory: {
		marktext: '<span style=\'color:#28e3ce\'>魔</span>',
		intro: { name: '<span style=\'color:#28e3ce\'>魔物</span>', content: 'mark' },
	},
	kotori_yumo_YB_dream: {
		marktext: '<span style=\'color:#e328b7\'>魔</span>',
		intro: { name: '<span style=\'color:#e328b7\'>魔物</span>', content: 'mark' },
	},
	kotori_skill_YB_memory: {
		trigger: {
			player: 'phaseEnd',
		},
		direct: true,
		content: function () {
			'step 0'
			var discarded = get.discarded();
			if (discarded.length) {
				player.chooseCardButton('选择一张获得之', discarded).set('ai', function (button) {
					return get.value(button.link);
				});
			}
			else {
				event.finish();
			}
			'step 1'
			if (result.bool && result.links && result.links.length) {
				player.gain(result.links, 'gain2');
			}
			event.finish();
		},
	},
	kotori_skill_YB_dream: {
		audio: 'ext:夜白神略/image/audio:2',
		trigger: {
			player: 'phaseZhunbeiBegin',
		},
		groupSkill: true,
		direct: true,
		content: function () {
			'step 0'
			player.chooseControl('是', 'cancel2').set('prompt', '是否摸两张牌，令本回合手牌上限-1').set('ai', function () {
				if (player.hasJudge('lubu')) {
					return 'cancel2';
				}
				return '是';
			});
			'step 1'
			if (result.control == 'cancel2') {
				event.finish(); return;
			}
			player.logSkill('kotori_skill_YB_dream');
			player.draw(2);
			player.addTempSkill('kotori_skill_YB_dream_buff');
		},
		subSkill: {
			buff: {
				mark: true,
				marktext: '散',
				trigger: {
					player: 'phaseDiscardBefore',
				},
				direct: true,
				content: function () {
					'step 0'
					player.chooseToDiscard(2, 'he').set('prompt', '是否弃置两张牌，取消此次手牌上限减一？'
					).set('ai', function (card) {
						return player.countCards('h') > player.getHandcardLimit();
					});
					'step 1'
					if (result.bool) {
						player.removeSkill('kotori_skill_YB_dream_buff');
					}
				},
				intro: {
					content: '本回合手牌上限-1',
				},
				mod: {
					maxHandcard: function (player, num) {
						return num - 1;
					},
				},
				sub: true,
			},
		},
	},
	kotori_ybhuazhan: {
		charlotte: true,
		enable: 'chooseToUse',
		filter: function (event, player) {
			var bool = false;
			var list = ['wei', 'shu', 'wu', 'qun', 'key', 'jin', 'YB_memory', 'YB_dream'];
			for (var i of list) {
				if (player.hasMark('kotori_yumo_' + i) && !player.getStorage('kotori_huazhan2').includes('kotori_yumo_' + i)) {
					bool = true; break;
				}
			}
			return bool && event.filterCard({ name: 'kaihua', isCard: true }, player, event);
		},
		chooseButton: {
			dialog: function (event, player) {
				return ui.create.dialog('###花绽###' + lib.translate.kotori_huazhan_info);
			},
			chooseControl: function (event, player) {
				var list = ['wei', 'shu', 'wu', 'qun', 'key', 'jin', 'YB_memory', 'YB_dream'];
				var list2 = [];
				for (var i of list) {
					if (player.hasMark('kotori_yumo_' + i) &&
						!player.getStorage('kotori_huazhan2').includes('kotori_yumo_' + i))
						list2.push('kotori_yumo_' + i);
				}
				list2.push('cancel2');
				return list2;
			},
			check: function () {
				var player = _status.event.player;
				var list = ['wei', 'shu', 'wu', 'qun', 'key', 'jin', 'YB_memory', 'YB_dream'];
				var list2 = [];
				for (var i of list) {
					if (player.hasMark('kotori_yumo_' + i) &&
						!player.getStorage('kotori_huazhan2').includes('kotori_yumo_' + i))
						list2.push('kotori_yumo_' + i);
				}
				if (list2.includes('kotori_yumo_wei')) return 'kotori_yumo_wei';
				if (list2.includes('kotori_yumo_wu')) return 'kotori_yumo_wu';
				if (list2.includes('kotori_yumo_qun')) return 'kotori_yumo_qun';
				if (list2.includes('kotori_yumo_key')) return 'kotori_yumo_key';
				if (list2.includes('kotori_yumo_YB_memory')) return 'kotori_yumo_YB_memory';
				if (list2.includes('kotori_yumo_YB_dream')) return 'kotori_yumo_YB_dream';
				if (list2.includes('kotori_yumo_shu') && game.hasPlayer(function (current) {
					return current.group == 'shu';
				})) return 'kotori_yumo_shu';
				return 'cancel2';
			},
			backup: function (result, player) {
				return {
					markname: result.control,
					viewAs: { name: 'kaihua', isCard: true },
					filterCard: function () { return false },
					selectCard: -1,
					precontent: function () {
						delete event.result.skill;
						var name = lib.skill.kotori_huazhan_backup.markname;
						if (!player.storage.kotori_huazhan2) player.storage.kotori_huazhan2 = [];
						player.storage.kotori_huazhan2.push(name);
						player.addTempSkill('kotori_huazhan2');
						player.popup('花绽', get.groupnature(name.slice(12)));
						game.log(player, '发动了技能', lib.translate[name].replace(/魔物/g, '【花绽】'));
						player.removeMark(name, 1, false);
						; game.log(player, '移去了一个', lib.translate[name].replace(/魔物/g, '【魔物】'));
					},
				}
			}
		},
		ai: {
			order: 1,
			result: {
				player: function (player) {
					if (player.countCards('he', function (card) {
						if (get.type(card, player) == 'equip') return get.value(card) < 6;
						return get.value(card) < 5;
					}) < 2) return 0;
					return player.getUseValue({ name: 'kaihua' });
				},
			},
		},
		group: ['kotori_ybhuazhan_fly', 'kotori_ybhuazhan_recover'],
		subSkill: {
			fly: {
				name: '花飞',
				charlotte: true,
				enable: 'chooseToUse',
				filter: function (event, player) {
					var bool = false;
					var list = ['wei', 'shu', 'wu', 'qun', 'key', 'jin', 'YB_memory', 'YB_dream'];
					for (var i of list) {
						if (player.hasMark('kotori_yumo_' + i) && !player.getStorage('kotori_huazhan3').includes('kotori_yumo_' + i)) {
							bool = true; break;
						}
					}
					return bool && event.filterCard({ name: 'kaihua', isCard: true }, player, event);
				},
				chooseButton: {
					dialog: function (event, player) {
						return ui.create.dialog('###花绽###' + lib.translate.kotori_huazhan_info);
					},
					chooseControl: function (event, player) {
						var list = ['wei', 'shu', 'wu', 'qun', 'key', 'jin', 'YB_memory', 'YB_dream'];
						var list2 = [];
						for (var i of list) {
							if (player.hasMark('kotori_yumo_' + i) && !player.getStorage('kotori_huazhan3').includes('kotori_yumo_' + i))
								list2.push('kotori_yumo_' + i);
						}
						list2.push('cancel2');
						return list2;
					},
					check: function () {
						var player = _status.event.player;
						var list = ['wei', 'shu', 'wu', 'qun', 'key', 'jin', 'YB_memory', 'YB_dream'];
						var list2 = [];
						for (var i of list) {
							if (player.hasMark('kotori_yumo_' + i) &&
								!player.getStorage('kotori_huazhan3').includes('kotori_yumo_' + i))
								list2.push('kotori_yumo_' + i);
						}
						if (list2.includes('kotori_yumo_wei')) return 'kotori_yumo_wei';
						if (list2.includes('kotori_yumo_wu')) return 'kotori_yumo_wu';
						if (list2.includes('kotori_yumo_qun')) return 'kotori_yumo_qun';
						if (list2.includes('kotori_yumo_key')) return 'kotori_yumo_key';
						if (list2.includes('kotori_yumo_YB_memory')) return 'kotori_yumo_YB_memory';
						if (list2.includes('kotori_yumo_YB_dream')) return 'kotori_yumo_YB_dream';
						if (list2.includes('kotori_yumo_shu') && game.hasPlayer(function (current) {
							return current.group == 'shu';
						})) return 'kotori_yumo_shu';
						return 'cancel2';
					},
					backup: function (result, player) {
						return {
							markname: result.control,
							viewAs: { name: 'yihuajiemu', isCard: true },
							filterCard: function () { return false },
							selectCard: -1,
							precontent: function () {
								delete event.result.skill;
								var name = lib.skill.kotori_huazhan_fly_backup.markname;
								if (!player.storage.kotori_huazhan3) player.storage.kotori_huazhan3 = [];
								player.storage.kotori_huazhan3.push(name);
								player.addTempSkill('kotori_huazhan3');
								player.popup('花绽', get.groupnature(name.slice(12)));
								game.log(player, '发动了技能', lib.translate[name].replace(/魔物/g, '【花绽】'));
								player.removeMark(name, 1, false);
								; game.log(player, '移去了一个', lib.translate[name].replace(/魔物/g, '【魔物】'));
							},
						}
					}
				},
				ai: {
					order: 7,
					result: {
						target: function (player, target) {
							return player.getUseValue({ name: 'yihuajiemu' });
						}
					}
				}
			},
			recover: {
				name: '愈伤',
				charlotte: true,
				enable: 'chooseToUse',
				filter: function (event, player) {
					var bool = false;
					var list = ['wei', 'shu', 'wu', 'qun', 'key', 'jin', 'YB_memory', 'YB_dream'];
					for (var i of list) {
						if (player.hasMark('kotori_yumo_' + i) && !player.getStorage('kotori_huazhan4').includes('kotori_yumo_' + i)) {
							bool = true; break;
						}
					}
					return bool && event.filterCard({ name: 'kaihua', isCard: true }, player, event);
				},
				chooseButton: {
					dialog: function (event, player) {
						return ui.create.dialog('###花绽###' + lib.translate.kotori_huazhan_info);
					},
					chooseControl: function (event, player) {
						var list = ['wei', 'shu', 'wu', 'qun', 'key', 'jin', 'YB_memory', 'YB_dream'];
						var list2 = [];
						for (var i of list) {
							if (player.hasMark('kotori_yumo_' + i) &&
								!player.getStorage('kotori_huazhan4').includes('kotori_yumo_' + i))
								list2.push('kotori_yumo_' + i);
						}
						list2.push('cancel2');
						return list2;
					},
					check: function () {
						var player = _status.event.player;
						var list = ['wei', 'shu', 'wu', 'qun', 'key', 'jin', 'YB_memory', 'YB_dream'];
						var list2 = [];
						for (var i of list) {
							if (player.hasMark('kotori_yumo_' + i) &&
								!player.getStorage('kotori_huazhan4').includes('kotori_yumo_' + i)) list2.push('kotori_yumo_' + i);
						}
						if (list2.includes('kotori_yumo_wei')) return 'kotori_yumo_wei';
						if (list2.includes('kotori_yumo_wu')) return 'kotori_yumo_wu';
						if (list2.includes('kotori_yumo_qun')) return 'kotori_yumo_qun';
						if (list2.includes('kotori_yumo_key')) return 'kotori_yumo_key';
						if (list2.includes('kotori_yumo_YB_memory')) return 'kotori_yumo_YB_memory';
						if (list2.includes('kotori_yumo_YB_dream')) return 'kotori_yumo_YB_dream';
						if (list2.includes('kotori_yumo_shu') && game.hasPlayer(function (current) {
							return current.group == 'shu';
						})) return 'kotori_yumo_shu';
						return 'cancel2';
					},
					backup: function (result, player) {
						return {
							markname: result.control,
							viewAs: { name: 'guaguliaodu', isCard: true },
							filterCard: function () { return false },
							selectCard: -1,
							precontent: function () {
								delete event.result.skill;
								var name = lib.skill.kotori_huazhan_recover_backup.markname;
								if (!player.storage.kotori_huazhan4) player.storage.kotori_huazhan4 = [];
								player.storage.kotori_huazhan4.push(name);
								player.addTempSkill('kotori_huazhan4');
								player.popup('花绽', get.groupnature(name.slice(12)));
								game.log(player, '发动了技能', lib.translate[name].replace(/魔物/g, '【花绽】'));
								player.removeMark(name, 1, false);
								; game.log(player, '移去了一个', lib.translate[name].replace(/魔物/g, '【魔物】'));
							},
						}
					}
				},
				ai: {
					order: 2,
					tag: {
						recover: 1,
					},
					result: {
						target: function (player, target) {
							return player.getUseValue({ name: 'guaguliaodu' });
						}
					}
				},
			},
		},
	},
	kotori_huazhan3: { onremove: true, },
	kotori_huazhan4: { onremove: true, },
	//--------------sp乌米酱
	//------------界马钧
	xinfu_ybjingxie: {
		getJingxie: function () {
			return [
				'bagua', 'baiyin', 'lanyinjia', 'renwang', 'tengjia', 'zhuge',
				'ybsl_wangzhui', 'chitu', 'zhuque', 'wuxinghelingshan', 'yitianjian',
				'shandian', 'fulei', 'taigongyinfu', 'ybsl_tianleiyubi', 'hongshui',
				'huoshan',/*'du',*/'chiyanzhenhunqin', 'tongque', 'qinglong',
				'fangtian', 'wutiesuolian', 'huxinjing', 'goujiangdesidai'
			];
		},
		firstDo: true,
		// group:['xinfu_jingxie2'/*,'ybsl_tianhuoduan_skill'*/],
		group: ["xinfu_jingxie_recast"],
		position: 'he',
		audio: 'xinfu_jingxie',
		enable: 'phaseUse',
		filter: function (event, player) {
			var he = player.getCards('he');
			var list = _status.YB_jingxieList;
			for (var i = 0; i < he.length; i++) {
				if (list.includes(he[i].name)) return true;
			}
			return false;
		},
		filterCard: function (card, player) {
			var list = _status.YB_jingxieList;
			return list.includes(card.name);
		},
		discard: false,
		lose: false,
		delay: false,
		check: function () {
			return 1;
		},
		content: function () {
			'step 0'
			player.showCards(cards);
			'step 1'
			var card = cards[0];
			var bool = (get.position(card) == 'e');
			// var tag=[];
			// // if(get.cardtag(card,'gifts')){tag.push('gifts');}
			// for(var i of _status.cardtag){
			// 	if(get.cardtag(card,i)){tag.push(i);}
			// }
			if (bool) player.removeEquipTrigger(card);
			game.addVideo('skill', player, ['xinfu_ybjingxie', [bool, get.cardInfo(card)]])
			game.broadcastAll(function (card,bool) {
				if (card.name == 'wuxinghelingshan') { card.name = 'zhuque' }
				if (card.name == 'chiyanzhenhunqin') { card.name = 'zhuque' }
				if (card.name == 'shandian' && card.suit == 'spade') { card.name = 'fulei' }
				if (card.name == 'taigongyinfu') { card.name = 'fulei' }
				if (card.name == 'hongshui') { card.name = 'shandian' }
				if (card.name == 'huoshan') { card.name = 'shandian' }
				if (card.name == 'wutiesuolian') { card.name = 'fangtian' }
				var tag = get.YB_tag(card)
				card.YB_init([card.suit, card.number, 'rewrite_' + card.name, card.nature,tag]);
				//
				if (bool && card.card && player.vcardsMap?.equips) {
					const cardx = game.YB_createCard("rewrite_" + card.card.name, card.card.suit, card.card.number);
					player.vcardsMap.equips[player.vcardsMap.equips.indexOf(card.card)] = cardx;
					card.card = cardx;
				}
				//
			}, card, bool);//bool
			if (bool) player.addEquipTrigger(card.card || card);
			// if(bool){
			// 	var info=get.info(card);
			// 	if(info.skills){
			// 		for(var i=0;i<info.skills.length;i++){
			// 			player.addSkillTrigger(info.skills[i]);
			// 		}
			// 	}
			// }
		},
		ai: {
			basic: {
				order: 10,
			},
			result: {
				player: 1,
			},
		},
		// video: function (player, info) {
		// 	var l2 = player.getCards(info[0] ? "e" : "h"),
		// 		l1 = info[1];
		// 	for (var j = 0; j < l2.length; j++) {
		// 		if (l2[j].suit == l1[0] && l2[j].number == l1[1] && l2[j].name == l1[2]) {
		// 			l2[j].init([l2[j].suit, l2[j].number, "rewrite_" + l2[j].name]);
		// 			break;
		// 		}
		// 	}
		// },
		// position: "he",
		// enable: "phaseUse",
		// filter: function (event, player) {
		// 	var he = player.getCards("he");
		// 	for (var i = 0; i < he.length; i++) {
		// 		if (["bagua", "baiyin", "lanyinjia", "renwang", "tengjia", "zhuge"].includes(he[i].name)) return true;
		// 	}
		// 	return false;
		// },
		// filterCard: function (card) {
		// 	return ["bagua", "baiyin", "lanyinjia", "renwang", "tengjia", "zhuge"].includes(card.name);
		// },
		// discard: false,
		// lose: false,
		// delay: false,
		// check: function () {
		// 	return 1;
		// },
		// content: function () {
		// 	"step 0";
		// 	player.showCards(cards);
		// 	"step 1";
		// 	var card = cards[0];
		// 	var bool = get.position(card) == "e";
		// 	if (bool) player.removeEquipTrigger(card.card || card);
		// 	game.addVideo("skill", player, ["xinfu_jingxie", [bool, get.cardInfo(card)]]);
		// 	game.broadcastAll(function (card, bool) {
		// 		card.init([card.suit, card.number, "rewrite_" + card.name]);
		// 		if (bool && card.card && player.vcardsMap?.equips) {
		// 			const cardx = game.createCard("rewrite_" + card.card.name, card.card.suit, card.card.number);
		// 			player.vcardsMap.equips[player.vcardsMap.equips.indexOf(card.card)] = cardx;
		// 			card.card = cardx;
		// 		}
		// 	}, card, bool);
		// 	if (bool) player.addEquipTrigger(card.card || card);
		// },
		// ai: {
		// 	basic: {
		// 		order: 10,
		// 	},
		// 	result: {
		// 		player: 1,
		// 	},
		// },
		// subSkill: {
		// 	recast: {
		// 		audio: "xinfu_jingxie",
		// 		enable: "chooseToUse",
		// 		filterCard: (card, player) => get.subtype(card) == "equip2" && player.canRecast(card),
		// 		filter: (event, player) => {
		// 			if (event.type != "dying") return false;
		// 			if (player != event.dying) return false;
		// 			return player.hasCard(card => lib.skill.xinfu_jingxie.subSkill.recast.filterCard(card, player), "he");
		// 		},
		// 		position: "he",
		// 		discard: false,
		// 		lose: false,
		// 		delay: false,
		// 		prompt: "重铸一张防具牌，然后将体力回复至1点。",
		// 		content: function () {
		// 			"step 0";
		// 			player.recast(cards);
		// 			"step 1";
		// 			var num = 1 - player.hp;
		// 			if (num) player.recover(num);
		// 		},
		// 		ai: {
		// 			order: 0.5,
		// 			skillTagFilter: function (player, arg, target) {
		// 				if (player != target) return false;
		// 				return player.hasCard(card => (_status.connectMode && get.position(card) == "h") || (get.subtype(card) == "equip2" && player.canRecast(card)), "he");
		// 			},
		// 			save: true,
		// 			result: {
		// 				player: function (player) {
		// 					return 10;
		// 				},
		// 			},
		// 		},
		// 	},
		// },
	},
	//-------------------------群友共创
	//许攸
	ybsl_zigong: {
		audio: 'nzry_shicai',
		trigger: {
			player: "gainEnd"
		},
		filter: function (event, player) {
			// game.log( event.getParent().skill );
			// game.log( event.getParent().name );
			// game.log( event.getParent(2).skill );
			// game.log( event.getParent(2).name );
			// game.log( event.getParent(2) );
			if (event.getParent(2).name == "ybsl_zigong") return false;
			return true;
		},
		content: function* (event, map) {
			let trigger = map.trigger,
				player = map.player;
			var cards = trigger.cards;
			let num = Math.min(cards.length, 5);
			yield player.discard(trigger.cards);
			yield player.draw(num);
		},
	},
	ybsl_zicai: {
		audio: 'nzry_chenglve',
		trigger: {
			player: 'discardAfter',
		},
		derivation: 'ybsl_zhaosanmusi',
		content: function* (event, map) {
			let trigger = map.trigger,
				player = map.player;
			var cards = trigger.cards;
			let num = Math.min(cards.length, 5);
			switch (num) {
				case 0:
					event.finish();
					break;
				case 1:
					yield player.chooseUseTarget({
						name: "sha",
						nature: "fire",
					},
						cards,
						"请选择火【杀】的目标。",
						false
					);
					break;
				case 2:
					yield player.chooseUseTarget({
						name: "diaobingqianjiang",
					},
						cards,
						"是否使用【调兵谴将】。",
						false
					);
					break;
				case 3:
					yield player.chooseUseTarget({
						name: "yiyi",
					},
						cards,
						"是否使用【以逸待劳】。",
						false
					);
					break;
				case 4:
					yield player.chooseUseTarget({
						name: "zengbin",
					},
						cards,
						"是否使用【增兵减灶】。",
						false
					);
					break;
				default:
					yield player.chooseUseTarget({
						name: "ybsl_zhaosanmusi",
					},
						cards,
						"是否使用【朝三暮四】。",
						false
					);
					break;
			}
		},
	},
	//刘焉
	niya_limu:{
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
			if (player.hasJudge("shandian")&&player.hasJudge("lebu")&&player.hasJudge("bingliang")&&player.hasJudge('niya_wangmeizhike')) return false;
			return player.countCards("hes",function(card){return ['spade','heart','club','diamond'].includes(get.suit(card))}) > 0;
		},
		// prompt: "将♦牌当做杀，♥牌当做桃，♣牌当做闪，♠牌当做无懈可击使用或打出",
		//动态的viewAs
		viewAs(cards, player) {
			if (cards.length) {
				var name = false;
				//根据选择的卡牌的花色 判断要转化出的卡牌是闪还是火杀还是无懈还是桃
				switch (get.suit(cards[0], player)) {
					case "club":
						name = "bingliang";
						break;
					case "diamond":
						name = "lebu";
						break;
					case "spade":
						name = "shandian";
						break;
					case "heart":
						name = "niya_wangmeizhike";
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
			if (name == "club" && player.canAddJudge({ name: "bingliang", cards: [card] })) return true;
			//如果这张牌是方片并且当前时机能够使用/打出火杀 那么这张牌可以选择
			if (name == "diamond" && player.canAddJudge({ name: "lebu", cards: [card] })) return true;
			//如果这张牌是黑桃并且当前时机能够使用/打出无懈 那么这张牌可以选择
			if (name == "spade" && player.canAddJudge({ name: "shandian", cards: [card] })) return true;
			//如果这张牌是红桃并且当前时机能够使用/打出桃 那么这张牌可以选择
			if (name == "heart" && player.canAddJudge({ name: "niya_wangmeizhike", cards: [card] })) return true;
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
		onuse(links, player) {
			console.log(links)
			var name = links.card.name;
			var next = game.createEvent("limu_recover", false, _status.event.getParent());
			next.player = player;
			next.name = name;
			next.setContent(async function (event,trigger,player) {
				if(event.name =='lebu'){
					await player.recover();
				}
				else if(event.name =='bingliang'){
					var players = game.filterPlayer(p=>p.countDiscardableCards(player,'he'))
					if(players){
						var result = await player.chooseTarget("请选择一名角色，弃置其至多两张牌",true).set('filterTarget',function(card,player,target){
							return players.includes(target);
						}).forResult();
						if(result.bool){
							await player.discardPlayerCard(result.targets[0],[1,2],true)
						}
					}
				}
				else if(event.name == 'niya_wangmeizhike'){
					await player.draw(2)
				}
				else if(event.name == 'shandian'){
					var players = game.filterPlayer(p=>p.isIn());
					if(players){
						var result = await player.chooseTarget("请选择一名角色，对其造成1点雷电伤害",true).set('filterTarget',function(card,player,target){
							return players.includes(target);
						}).forResult();
						if(result.bool){
							await result.targets[0].damage(player,1,'thunder');
						}
					}
				}
			});
		},
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
	niya_tushe:{
		audio: 'xinfu_tushe',
		mod: {
			aiOrder(player, card, num) {
				if (get.tag(card, "multitarget")) {
					if (player.countCards("h", { type: "basic" })) {
						return num / 10;
					}
					return num * 10;
				}
				if (get.type(card) === "basic") {
					return num + 10;
				}
			},
			aiValue(player, card, num) {
				if (card.name === "zhangba") {
					return 114514;
				}
				if (["shan", "tao", "jiu"].includes(card.name)) {
					if (player.getEquip("zhangba") && player.countCards("hs") > 1) {
						return 0.01;
					}
					return num / 2;
				}
				if (get.tag(card, "multitarget")) {
					return num + game.players.length;
				}
			},
			aiUseful(player, card, num) {
				if (card.name === "zhangba") {
					return 114514;
				}
				if (get.name(card, player) === "shan") {
					if (
						player.countCards("hs", i => {
							if (card === i || (card.cards && card.cards.includes(i))) {
								return false;
							}
							return get.name(i, player) === "shan";
						})
					) {
						return -1;
					}
					return num / Math.pow(Math.max(1, player.hp), 2);
				}
			},
		},
		trigger: {
			global: "useCardToPlayered",
		},
		locked: false,
		frequent: true,
		filter(event, player) {
			if (get.type(event.card) == "equip") {
				return false;
			}
			if (event.getParent().triggeredTargets3.length > 1) {
				return false;
			}
			if(player.countCards("h", { type: "basic" })&&player.hasSkill('niya_tushe_block'))return false;
			return event.targets.length > 0 && (event.player==player||event.targets.includes(player));
		},
		content() {
			player.addTempSkill('niya_tushe_block');
			player.draw(trigger.targets.length);
		},
		subSkill:{
			block:{
				onremove:true,
				charlotte:true,
			},
		},
		ai: {
			presha: true,
			pretao: true,
			threaten: 1.8,
			effect: {
				player_use(card, player, target) {
					if (
						typeof card === "object" &&
						card.name !== "shan" &&
						get.type(card) !== "equip" &&
						!player.countCards("h", i => {
							if (card === i || (card.cards && card.cards.includes(i))) {
								return false;
							}
							return get.type(i) === "basic";
						})
					) {
						let targets = [],
							evt = _status.event.getParent("useCard");
						targets.addArray(ui.selected.targets);
						if (evt && evt.card == card) {
							targets.addArray(evt.targets);
						}
						if (targets.length) {
							return [1, targets.length];
						}
						if (get.tag(card, "multitarget")) {
							return [1, game.players.length - 1];
						}
						return [1, 1];
					}
				},
			},
		},
	},
	//曹微
	niya_youbo:{
		audio:'ext:夜白神略/audio/character:2',
		trigger: {
			global: ['loseHpAfter',"loseAfter","loseAsyncAfter", "equipAfter", "cardsDiscardAfter"],
		},
		filter(event, player) {
			if(event.name == "loseHp")return true;
			return event.getd?.().some(card => get.color(card)=='black');
		},
		content(){
			'step 0'
			var num = player.maxHp;
			event.cards = get.cards(num);
			// game.cardsGotoOrdering(cards);
			for (var i = event.cards.length - 1; i >= 0; i--) {
				ui.cardPile.insertBefore(event.cards[i], ui.cardPile.firstChild);
			}
			game.updateRoundNumber();
			player.chooseControl("ok").set("dialog", [event.cards]);
			event.numx = 0;
			for(var i of event.cards){
				if(get.number(i))event.numx+=get.number(i);
			} 
			game.log(player, "本次观看牌的点数和为", event.numx, "。")
			if(!player.storage.niya_youbo)player.storage.niya_youbo=0;
			player.storage.niya_youbo+=event.numx;
			player.update();
			'step 1'
			var numb = Math.log2(player.storage.niya_youbo);
			event.numb=Math.floor(numb);
			player.chooseBool("是否进行摸牌？（当前摸牌数为"+event.numb+"）").set('ai',function () {
				var att=get.attitude(_status.event.player,_status.currentPhase);
				if(att>0)return event.numb!=_status.currentPhase.maxHp;
				// else return event.numb==_status.currentPhase.maxHp;
				else return true;
			})
			// player.chooseNumbers(get.prompt2("niya_youbo"), [{ prompt: "请选择你摸牌数，若选择"+_status.currentPhase.maxHp+"，则"+get.translation(_status.currentPhase)+"失去1点体力上限。", min: 1, max: numb }]).set("processAI", () => {
			// 	var att=get.attitude(_status.event.player,_status.currentPhase);
			// 	if(att>0&&get.event().maxNum==_status.currentPhase.maxHp){
			// 		if(get.event().maxNum>1)return [get.event().maxNum-1];
			// 		else return false;
			// 	}
			// 	if(att<0&&get.event().maxNum>=_status.currentPhase.maxHp){
			// 		if(player.countCards("h")+_status.currentPhase.maxHp>3)return [_status.currentPhase.maxHp]
			// 	}
			// 	return [get.event().maxNum];
			// })
			'step 2'
			if (result.bool) {
				// var number = result.numbers[0];
				player.storage.niya_youbo = 0;
				player.update();
				var number = event.numb;
				player.draw(number);
				if(_status.currentPhase&&_status.currentPhase.isIn()&&number==_status.currentPhase.maxHp){
					_status.currentPhase.loseMaxHp();
				}
			}
		},
		mark:true,
		intro:{
			markcount:(storage,player)=>{return player.storage.niya_youbo|| 0;},
		}
	},
	niya_anren:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			global:'useCardToPlayered',
		},
		filter(event, player) {
			if(event.player!=player){
				return event.target==player&&event.player.maxHp>=player.maxHp;
			}
			else {
				return event.target.maxHp<=player.maxHp;
			}
		},
		async content(event, trigger, player) {
			if(trigger.player!=player){
				const eff = get.effect(player, trigger.card, trigger.player, trigger.player);
				const { result } = await trigger.player
					.chooseToDiscard("暗刃：弃置一张黑色牌，否则"+get.translation(trigger.card)+"对" + get.translation(player) + "无效", function (card) {
						return get.color(card) == "black";
					})
					.set("ai", function (card) {
						if (_status.event.eff > 0) {
							return 10 - get.value(card);
						}
						return 0;
					})
					.set("eff", eff);
				if (!result?.bool) {
					trigger.getParent().excluded.add(player);
				}
			}
			else {
				trigger.getParent().directHit.add(trigger.target);
				if(!trigger.getParent().card.storage.niya_anren){
					trigger.getParent().card.storage.niya_anren = [];
				}
				trigger.getParent().card.storage.niya_anren.push(trigger.target);
			}
		},
		group: ["niya_anren_damage"],
		subSkill:{
			damage:{
				audio:'niya_anren',
				trigger: {
					global: "damageEnd",
				},
				forced: true,
				filter: function (event, player) {
					return event.card?.storage?.niya_anren?.includes(event.player);
				},
				content: function () {
					trigger.player.loseHp();
				},
			},
		},
	},
	niya_xuantu:{
		audio:'ext:夜白神略/audio/character:2',
		group:'niya_xuantu_use',
		subSkill:{
			use:{
				enable:'phaseUse',
				usable:1,
				audio:'niya_xuantu',
				selectCard:[1,Infinity],
				filterCard:lib.filter.cardDiscardable,
				filter(event,player){
					return player.isDamaged();
				},
				prompt:'当你受到伤害后或出牌阶段限一次，你可弃置y张牌，然后回复至多lnb点体力。b为玄途弃置y张牌的点数和。',
				content:()=>{
					var next=game.createEvent('niya_xuantu',false);
					next.player=player;
					next.cards=event.cards;
					next.setContent(lib.skill.niya_xuantu.sword);
					// trigger.setContent(lib.skill.yb025_zanzhu.sword);
				},
				ai:{
					rusult:{
						player:1.1,
					}
				}
			}
		},
		trigger:{player:'damageEnd'},
		cost:function(){
			event.result = player.chooseToDiscard([1,Infinity],'he').set('prompt',get.prompt2('niya_xuantu')).set('filterCard',lib.filter.cardDiscardable).set('ai',function(card){
				var player=_status.event.player;
				var numa = player.getDamagedHp();
				if(numa>3)numa=3;
				var num=0;
				for(var i of ui.selected.cards){
					num+=i.number;
				}
				var numb = Math.pow(Math.E,numa);
				if(num>=numb) return 0;
				if(card.number+num>=numb) return 15-get.value(card);
				if(!ui.selected.cards.length){
					var min=_status.event.min;
					if(card.number<min&&!player.countCards('h',function(xcard){
						return xcard!=card&&card.number+xcard.number>min;
					})) return 0;
					return card.number;
				}
				return Math.max(5-get.value(card),card.number);
			}).set('chooseonly',true).forResult();
		},
		content(){
			var next=game.createEvent('niya_xuantu',false);
			next.player=player;
			next.cards=event.cards;
			next.setContent(lib.skill.niya_xuantu.sword);
		},
		sword:function(){
			'step 0'
			player.discard(event.cards);
			'step 1'
			event.numx = 0;
			for(var i of event.cards){
				if(get.number(i))event.numx+=get.number(i);
			} 
			game.log(player, "本次弃置牌的点数和为", event.numx, "。")
			'step 2'
			var numb = Math.log(event.numx);
			event.numb=Math.floor(numb);
			player.recover(event.numb);
		},
	},
	//杜琼
	Fe2O3_huishi:{
		mod : {
			aiValue(player, card, num) {
				//降低手牌价值
				if (get.position(card) == 'h') {
					//自己的出牌阶段不降低可用牌的价值
					if (player.isPhaseUsing() && player.getUseValue(card)) {
						const name = get.name(card)
						let usable = player.getCardUsable(name, true) - player.countUsed(name)
						if (name == 'tao') usable = Math.min(usable, player.getDamagedHp())
						const cards = player.getCards('h', cardx => cardx.name == name)
						cards.sort((a, b) => player.getUseValue(b) - player.getUseValue(a))
						if (cards.indexOf(card) < usable) return num
					}
					//根据下回合角色判定区内的牌保留手牌
					let next = player.getNext()
					if (game.hasPlayer(current => !current.isTurnedOver())) while (next.isTurnedOver()) next = next.getNext()
					let att = get.sgn(get.attitude(player, next)),
						js = next.getCards("j")
					let top = []
					for (const j of js) top.push(player.getCards('h', i => get.judge(j)(i) * att > 0 && !top.includes(i))[0])
					if (top.includes(card)) return num * 1.2
					//如果下回合角色是敌方角色，保留低价值牌
					if (att < 0) return - num / 4
					return num / 4
				}
				//增加非手牌价值
				return num * 2
			},
			get aiUseful() {
				return lib.skill.Fe2O3_huishi.mod.aiValue
			}
		},
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			global: "phaseEnd",
		},
		filter(event, player) {
			return player.countCards("h")
		},
		content: async function (event, trigger, player) {
			var cards = player.getCards("h");
			if (cards.length > 1) {
				const { result } = await player
					.chooseToMove("会失：将牌按顺序置于牌堆顶", true)
					.set("list", [["牌堆顶", cards]])
					.set("reverse", _status.currentPhase?.next && get.attitude(player, _status.currentPhase.next) > 0)
					.set("processAI", function (list) {
						let cards = list[0][1],
							player = _status.event.player,
							target = (_status.currentPhase || player).next,
							countWuxie = current => {
								let num = current.getKnownCards(player, card => {
									return get.name(card, current) === "wuxie";
								});
								if (num && current !== player) {
									return num;
								}
								let skills = current.getSkills("invisible").concat(lib.skill.global);
								game.expandSkills(skills);
								for (let i = 0; i < skills.length; i++) {
									let ifo = get.info(skills[i]);
									if (!ifo) {
										continue;
									}
									if (ifo.viewAs && typeof ifo.viewAs != "function" && ifo.viewAs.name == "wuxie") {
										if (!ifo.viewAsFilter || ifo.viewAsFilter(current)) {
											num++;
											break;
										}
									} else {
										let hiddenCard = ifo.hiddenCard;
										if (typeof hiddenCard == "function" && hiddenCard(current, "wuxie")) {
											num++;
											break;
										}
									}
								}
								return num;
							},
							top = [];
						if (game.hasPlayer(current => !current.isTurnedOver())) while (target.isTurnedOver()) target = target.getNext()
						let att = get.sgn(get.attitude(player, target)),
							judges = target.getCards("j"),
							needs = 0,
							wuxie = countWuxie(target);
						for (let i = Math.min(cards.length, judges.length) - 1; i >= 0; i--) {
							let j = judges[i],
								cardj = j.viewAs ? { name: j.viewAs, cards: j.cards || [j] } : j;
							if (wuxie > 0 && get.effect(target, j, target, target) < 0) {
								wuxie--;
								continue;
							}
							let judge = get.judge(j);
							cards.sort((a, b) => {
								return (judge(b) - judge(a)) * att;
							});
							if (judge(cards[0]) * att < 0) {
								needs++;
								continue;
							} else {
								top.unshift(cards.shift());
							}
						}
						if (needs > 0 && needs >= judges.length) {
							return [top.concat(cards)];
						}
						cards.sort((a, b) => {
							return (get.value(b, target) - get.value(a, target)) * att;
						});
						while (needs--) {
							top.unshift(cards.shift());
						}
						while (cards.length) {
							if (get.value(cards[0], target) > 6 == att > 0) {
								top.push(cards.shift());
							} else {
								break;
							}
						}
						return [top.concat(cards)]
					});
				if (!result.bool) {
					return;
				}
				cards = result.moved[0];
			}
			// cards.reverse();
			// await game.cardsGotoPile(cards, "insert");
			// player.update();
			// if (player == game.me) ui.updatehl()
			await player.lose(cards,ui.cardPile,'insert');
			game.addCardKnower(cards, player);
			game.log(player, "将" + get.cnNumber(cards.length) + "张牌置于牌堆顶");
		},
		ai : {
			neg : true,
			nogain : true,
		}
	},
	Fe2O3_xingchen:{
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			target: "useCardToTargeted",
		},
		check(event, player) {
			var num = player.countMark('Fe2O3_xingchen_discard')+1;
			if(num>=3)return player.countCards('h')+3>num*2;
			return true;
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseBool(get.prompt2('Fe2O3_xingchen')).set('choice', lib.skill.Fe2O3_xingchen.check('丈八二桃把营连', player)).forResult()
			if (!event.result.bool) return
			player.addTempSkill('Fe2O3_xingchen_used');
			player.addMark('Fe2O3_xingchen_used');
			player.markSkill('Fe2O3_xingchen_used');
		},
		async content(event, trigger, player) {
			await player.draw(3,'bottom');
			var num = player.countMark('Fe2O3_xingchen_used');
			const next = player.chooseToDiscard('星谶：请弃置'+num+'张牌','he',num,true);
			next.set('cardx', trigger.card)
			next.set('Fe2O3_xingchen', true)
			next.set('sourcex', trigger.player)
			next.set('complexCard', true)
			next.set('ai', card => {
				let num = - get.value(card),
					cardx = get.event('cardx'),
					type = get.subtype(card)
				//保留一张可响应触发此技能牌的牌
				let sourcex = get.event('source'),
					eff = get.effect(player, cardx, sourcex),
					useEvent = get.event().getParent('useCard')
				if (eff < 0 && card == player.getCards('h', i => player.canRespond(useEvent, i, true))[0]) return num - 5
				//成为装备牌的目标后优先弃置装备区内同副类别牌
				if (get.type(card) != 'equip') return num
				if (get.type(cardx) != 'equip') return num
				if (get.position(card) != 'e') return num
				if (type != get.subtype(cardx)) return num
				if (player.countEmptySlot(type)) return num
				if (ui.selected.cards.some(i => get.subtype(i) == type && get.position(i) == 'e')) return num
				return 12 + num
			})
		},
		mark:true,
		intro:{
			markcount: (storage,player) => {
				var num = player.countMark('Fe2O3_xingchen_used');
				return num;
			},
		},
		subSkill:{
			used :{
				// mark:true,
				onremove:true,
				// marktext: "谶",
			}
		},
		ai : {
			effect : {
				target(card, player, target) {
					const num = player.countMark('Fe2O3_xingchen')
					if (num > 3 || !target.hasFriend() || get.event('Fe2O3_xingchen')) return
					return [1, 0.33 * (3 - num)]
				}
			}
		},
	},
	//甄宓
	zxunnamed_qinglan : {
		forced : true,
		trigger : {
			player : 'useCardToPlayered'
		},
		filter(event, player) {
			const chosen = player.storage.zxunnamed_qinglan_chosen || []
			const target = event.targets[0]
			if (target == player || event.targets.length != 1) return false
			if (!chosen.includes(2)) return true
			if (!chosen.includes(0) && target.countDiscardableCards(target, 'he')) return true
			if (!chosen.includes(1) && ui.cardPile.firstChild && target.canEquip(get.autoViewAs({ name : 'zheji' }, [ui.cardPile.firstChild]), true)) return true
			return false
		},
		choiceAfter : [
			`await target.discard(result.cards)
			await target.chooseUseTarget({ name : 'jiu' }, true)`,
			`await target.useCard({ name : 'zheji' }, target, get.cards())
			await target.recover()`,
			`await game.asyncDraw([player, target].sortBySeat(_status.currentPhase || player))`
		],
		processAI : [
			function() {
				const target = get.event().getParent().player
				const player = get.player()
				const chosen = get.event('chosen')
				const card = target.getCards('he', card => lib.filter.cardDiscardable(card, target) && get.useful(card) < 7).sort((a, b) => get.useful(a) - get.useful(b))[0]
				if (eval(this[1])) return { links : [0], cards : [card] }
				if (eval(this[2])) return { links : [1] }
				if (chosen.includes(2)) {
					if (!chosen.includes(0)) return { links : [0], cards : [card] }
					return {links : [1]}
				}
				return { links : [2] }
			},
			`(function() {
				if (chosen.includes(0)) return false
				if (get.attitude(player, target) < 0 || !target.hasSkill('zxunnamed_lingbo')) return false
				if (!player.hasValueTarget(get.autoViewAs({ name : 'sha' }, target.getCards('e')))) return false
				if (!target.countCards('e') || !card) return false
				return true
			})()`,
			`(function() {
				if (chosen.includes(1)) return false
				if (!player.canEquip(get.autoViewAs({ name : 'zheji' }, 'unsure'), true)) return false
				if (get.cacheEffectUse(player, get.autoViewAs({ name : 'zheji' }, 'unsure'), player) + player.isDamaged() * 1.5 < 0) {
					if (get.attitude(player, target) < 0 || !target.hasSkill('zxunnamed_lingbo')) return false
					if (!player.hasValueTarget(get.autoViewAs({ name : 'sha' }, target.getCards('e')))) return false
				}
				return true
			})()`
		],
		filterButton(button) {
			const player = get.player()
			if (get.event('chosen').includes(button.link)) return false
			if (button.link == 0) return player.countDiscardableCards(player, 'he')
			if (button.link == 1) return ui.cardPile.childNodes.length && player.canEquip(get.autoViewAs({ name : 'zheji' }, [ui.cardPile.firstChild]), true)
			return true
		},
		async content(event, trigger, player) {
			player.addTempSkill('zxunnamed_qinglan_chosen')
			const target = trigger.targets[0]
			const skill = lib.skill[event.name]
			const options = ['弃置一张牌并视为使用一张【酒】', '将牌堆顶的牌当做【折戟】对自己使用并回复1点体力', `与${get.translation(player)}各摸一张牌`]
			const chosen = player.storage.zxunnamed_qinglan_chosen
			const { result } = await target.chooseButton(options.map((i, j) => [[[j, i]], 'tdnodes']), true)
				.set('processAI', skill.processAI[0])
				.set('chosen', chosen)
				.set('filterCard', lib.filter.cardDiscardable)
				.set('selectCard', () => {
					if (!ui.selected.buttons.length || !ui.selected.buttons[0].link) return 1
					return 0
				})
				.set('filterButton', skill.filterButton)
			game.log(target, '选择了', '#g【轻澜】','的', `#y选项${ get.cnNumber(result.links[0] + 1, true) }`)
			chosen.add(result.links[0])
			player.syncStorage('zxunnamed_qinglan_chosen')
			await eval(`(async function () {${skill.choiceAfter[result.links[0]]}})()`)
		},
		subSkill : {
			chosen : {
				init(player, skill) {
					player.storage[skill] = []
				},
				onremove: true
			}
		}
	},
	zxunnamed_lingbo : {
		zhuanhuanji : true,
		mark : true,
		enable : 'phaseUse',
		marktext: '☯',
		intro: {
			content : storage => `出牌阶段，你可以${ storage ? '令一名角色将你装备区内的牌当做【杀】使用' : '将一名角色装备区内的牌当做【无中生有】对其使用' }`
		},
		filterTarget(card, player, target){
			const sha = get.autoViewAs({ name : 'sha' }, player.getCards('e'))
			const wuzhong = get.autoViewAs({ name : 'wuzhong' }, target.getCards('e'))
			let ok
			if (player.storage.zxunnamed_lingbo) {
				ui.selected.cards.addArray(player.getCards('e'))
				ok = player.countCards('e') && target.hasUseTarget(sha)
			}
			else {
				ui.selected.cards.addArray(target.getCards('e'))
				ok = target.countCards('e') && lib.filter.targetEnabled2(wuzhong, player, target)
			}
			ui.selected.cards = []
			return ok
		},
		filter : (event, player) => game.hasPlayer(current => lib.skill.zxunnamed_lingbo.filterTarget(null, player, current)),
		viewAsFilter : player => lib.skill.zxunnamed_lingbo.filter(null, player),
		selectTarget : 1,
		selectCard : 0,
		get viewAs() {
			if (get.player()?.storage.zxunnamed_lingbo) return null
			return { name : 'wuzhong' }
		},
		discard: false,
		lose: false,
		async content(event, trigger, player) {
			const target = event.targets[0]
			ui.selected.cards.addArray(player.getCards('e'))
			const targets = game.filterPlayer(current => target.canUse(get.autoViewAs({ name : 'sha' }, player.getCards('e')), current))
			ui.selected.cards = []
			await target.chooseUseTarget({ name : 'sha' }, player.getCards('e'), false, true, targets, 'nodistance')
		},
		async precontent(event, trigger, player) {
			if (!player.storage.zxunnamed_lingbo) event.result.cards = event.result.targets[0].getCards('e')
			player.changeZhuanhuanji('zxunnamed_lingbo')
		},
		ai : {
			order : 15,
			reverseEquip : true,
			result : {
				target(player, target) {
					if (player.storage.zxunnamed_lingbo) return target.getUseValue(get.autoViewAs({ name : 'sha' }, player.getCards('e')))
					let val = 2 + Math.sign(get.attitude(player.target))
					target.countCards('e', card => get.value(card) < 0 ? val ++ : val --)
					if (target.hasSkillTag('noe')) val += 2
					return val
				}
			}
		}
	},
	//紫虚
	Fe2O3_shuding : {
		trigger : {
			global : 'useCardAfter'
		},
		filter(event, player) {
			if (player != _status.currentPhase) return false
			const suit = get.suit(event.card)
			if (suit == 'none') return false
			return get.discarded().filterInD('d').every(card => get.suit(card) != suit)
		},
		forced : true,
		logTarget : 'player',
		async content(event, trigger, player) {
			await player.draw()
			const target = trigger.player
			const {result} = await target.chooseCard(
				2, 'he', `###数定###重铸两张${get.translation(get.color(trigger.card))}牌`,
				card => get.color(card) == get.color(trigger.card) && target.canRecast(card),
				card => 11 - get.value(card)
			)
			if (result.bool) target.recast(result.cards)
			else target.loseHp()
		}
	},
	Fe2O3_titi : {
		trigger : {
			player : 'phaseUseEnd'
		},
		forced : true,
		async content() {
			const gains = []
			for (const target of game.filterPlayer(current => current.hasHistory('lose',evt => evt.cards2?.length)).sortBySeat()) {
				if (!get.discarded().filterInD('d').length) break
				const { result } = await target.chooseCardButton('折折：选择一张牌获得', get.discarded().filterInD('d'))
				if (result.bool) {
					await target.gain(result.links[0], 'gain2')
					gains.add(target)
				}
			}
			for (const target of game.filterPlayer(current => !gains.includes(current)).sortBySeat()) await target.chooseToUse()
		}
	},
	//关羽
	Fe3O4_jinxiao : {
		trigger : {
			target: 'useCardToTargeted',
			player: 'useCardToPlayered'
		},
		filter(event, player) {
			if (event.player == event.target || event.targets.length != 1) return false
			if (event.card.name != 'sha') return false
			return event.player.countCards()
		},
		async cost(event, trigger, player) {
			event.result = await trigger.player.chooseToDiscard('he')
				.set('prompt', '矜骁 : 弃置一张牌，若为红色，此【杀】伤害+1')
				.set('onlychoose', true)
				.set('ai', card => {
					if (get.attitude(trigger.player, trigger.targets[0]) > 0) return false
					if (get.color(card) == 'red') return 8 - get.value(card)
					return 6 - get.value(card)
				}).forResult()
		},
		async content(event, trigger, player) {
			await trigger.player.discard(event.cards)
			if (get.color(event.cards) == 'red') trigger.getParent().baseDamage ++
			const {result} = await trigger.player.discardPlayerCard(trigger.targets[0])
			if (result?.bool && get.color(result.cards) == 'red') {
				await player.draw()
				trigger.directHit.addArray(game.players)
			}
		}
	},
	Fe3O4_danji : {
		limited : true,
		skillAnimation : true,
		animationColor : 'water',
		trigger : {
			player : 'phaseJieshuBegin'
		},
		check(event, player) {
			if (get.attitude(player, player.getNext()) > 0) return false
			return player.getNext().hp == 1 || !player.getNext().hasFriend()
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name)
			const target = player.getNext()
			game.broadcastAll(
				function (target1, target2) {
					game.swapSeat(target1, target2)
				},
				player,
				target
			)
			await player.useCard({name : 'sha', isCard : true}, false, target)
			if (
				game.getGlobalHistory('everything', evt => {
					if (evt.name != 'die' || evt.player != target) return false
					return evt.getParent(5) == event
				}).length
			) player.restoreSkill(event.name)
		}
	},
	//诸葛亮
	Fe2O3_guanji : {
		trigger: {
			player: ['damageEnd', 'loseHpEnd', 'recoverEnd', 'loseAfter', 'drawAfter'],
			global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter']
		},
		filter(event, player, name) {
			if (player.countCards() != player.getHp()) return false
			if (['damageEnd', 'loseHpEnd', 'recoverEnd', 'drawAfter'].includes(name)) return true
			if (event.name == 'gain' && event.player == player) return event.getg(player)?.hs?.length
			return event.getl(player)?.hs?.length
		},
		usable : 1,
		async content(event, trigger, player) {
			await player.draw(2)
		}
	},
	Fe2O3_weixuan : {
		hiddenCard : (player, name) => name == 'tao' || name == 'zengbin',
		enable : 'chooseToUse',
		filter(event, player) {
			const filter = event.filterCard
			return player.countCards('hes', card => {
				if (get.type(card) != 'equip') return false
				if (get.color(card) == 'red') {
					if (!filter(get.autoViewAs({ name: 'tao' }, [card]), player, event)) return false
					return game.hasPlayer(current => event.filterTarget(get.autoViewAs({ name: 'tao' }, [card]), player, current) && current.hp <= 1)
				}
				if (get.color(card) == 'black') {
					if (!filter(get.autoViewAs({ name: 'zengbin' }, [card]), player, event)) return false
					return game.hasPlayer(current => event.filterTarget(get.autoViewAs({ name: 'zengbin' }, [card]), player, current) && current.countCards() <= 1)
				}
				return false
			})
		},
		position : 'hes',
		filterCard(card, player, event) {
			event = event || _status.event
			const filter = event._backup.filterCard
			if (get.type(card) != 'equip') return false
			if (get.color(card) == 'red') {
				if (!filter(get.autoViewAs({ name: 'tao' }, [card]), player, event)) return false
				return game.hasPlayer(current => event.filterTarget(get.autoViewAs({ name: 'tao' }, [card]), player, current) && current.hp <= 1)
			}
			if (get.color(card) == 'black') {
				if (!filter(get.autoViewAs({ name: 'zengbin' }, [card]), player, event)) return false
				return game.hasPlayer(current => event.filterTarget(get.autoViewAs({ name: 'zengbin' }, [card]), player, current) && current.countCards() <= 1)
			}
			return false
		},
		viewAs : cards => ({
			name : get.color(cards) == 'red' ? 'tao' : 'zengbin'
		}),
		filterTarget(card, player, target) {
			const event = _status.event
			const filter = event._backup.filterTarget
			if (!ui.selected.targets.length && lib.filter.selectTarget()[0] != -1) {
				if (card.name == 'tao' && target.hp >1) return false
				if (card.name == 'zengbin' && target.countCards() > 1) return false
			}
			return filter(card, player, target)
		},
		ai : {
			order : 12
		}
	},
	//赵云
	Fe2O3_bayun : {
		get mod() {
			return lib.skill.ollongdan.mod
		},
		hiddenCard : (player, name) => name == 'tao' || name == 'jiu',
		ai: {
			respondSha: true,
			respondShan: true,
			order(item, player) {
				if (player && _status.event.type == 'phase') {
					var max = 0
					var list = ['sha', 'tao', 'jiu']
					var map = { sha: 'shan', tao: 'jiu', jiu: 'tao' }
					for (var i = 0; i < list.length; i++) {
						var name = list[i]
						if (player.countCards('hs', map[name]) > (name == 'jiu' ? 1 : 0) && player.getUseValue({ name: name }) > 0) {
							var temp = get.order({ name: name })
							if (temp > max) {
								max = temp
							}
						}
					}
					if (max > 0) {
						max += 0.3
					}
					return max
				}
				return 4
			},
			result : {
				player : 1
			}
		},
		enable : ['chooseToUse', 'chooseToRespond'],
		onChooseToUse(event) {
			const filter = (event._backup || event).filterCard
			const filterTarget = (event._backup || event).filterTarget
			const player = event.player
			const useShan = (function() {
				if (filter(get.autoViewAs({ name: 'sha' }, 'unsure'), player, event)) return false
				if (filter(get.autoViewAs({ name: 'tao' }, 'unsure'), player, event)) return false
				if (filter(get.autoViewAs({ name: 'jiu' }, 'unsure'), player, event)) return false
				if (!filter(get.autoViewAs({ name: 'shan' }, 'unsure'), player, event)) return false
				return (event.respondTo || [])[0]
			})()//防一手“使用一张【闪】或【杀】”这种神秘的技能
			if (useShan) return void (event.Fe2O3_bayun_target = useShan)
			if (event.type == 'dying' && event.dying) return void (event.Fe2O3_bayun_target = event.dying)
			event.Fe2O3_bayun_target = game.filterPlayer(target => {
				if (player == target || !target.countGainableCards(player, 'he')) return false
				if (filter(get.autoViewAs({ name: 'sha' }, 'unsure'), player, event) && filterTarget(get.autoViewAs({ name: 'sha' }, 'unsure'), player, target)) return true
				if (filter(get.autoViewAs({ name: 'sha' }, 'unsure'), player, event) && filterTarget(get.autoViewAs({ name: 'jiu' }, 'unsure'), player, target)) return true
				if (filter(get.autoViewAs({ name: 'sha' }, 'unsure'), player, event) && filterTarget(get.autoViewAs({ name: 'tao' }, 'unsure'), player, target)) return true
				if (filter(get.autoViewAs({ name: 'shan' }, 'unsure'), player, event)) return target == (event.respondTo || [])[0]
				return false
			})//预判一手有人会把【酒】【桃】改成对一名角色使用，多判断一下，【闪】。。。就不判断了吧
		},
		onChooseToRespond(event) {
			event.Fe2O3_bayun_target = event.source || (event.respondTo || [])[0]
		},
		filter(event, player) {
			const filter = event.filterCard
			if (player.hasSkill('Fe2O3_bayun_1')) return false
			if (filter(get.autoViewAs({ name: 'sha' }, 'unsure'), player, event)) return true
			if (filter(get.autoViewAs({ name: 'shan' }, 'unsure'), player, event)) return true
			if (filter(get.autoViewAs({ name: 'tao' }, 'unsure'), player, event)) return true
			if (filter(get.autoViewAs({ name: 'jiu' }, 'unsure'), player, event)) return true
			return false
		},
		prompt(event) {
			const target = event.Fe2O3_bayun_target
			if (get.itemtype(target) == 'player') return `摸一张牌或获得${get.translation(target)}一张牌并发动${get.poptip('ollongdan')}或令此技能本回合失效`
			if (get.itemtype(target) == 'players') return `摸一张牌或获得一名角色一张牌以发动${get.poptip('ollongdan')}（对其）使用一张牌或令此技能本回合失效`
			return `摸一张牌以发动${get.poptip('ollongdan')}或令此技能本回合失效`
		},
		async precontent(event, trigger, player) {
			const target = event.getParent().Fe2O3_bayun_target
			if (get.itemtype(target) == 'player') {
				if (player == target || !target.countGainableCards(player, 'he')) return
				const bool = await player.chooseBool(`获得${get.translation(target)}一张牌或取消摸一张牌`)
					.set('target', target)
					.set('ai', (event, player) => lib.card.shunshou_copy2.ai.result.target(player, get.event().target) > 0)
					.forResultBool()
				if (bool) event.result.targets = [target]
				return
			}
			if (get.itemtype(target) == 'players') {
				const result = await player.chooseTarget('获得一名角色一张牌或取消摸一张牌')
					.set('ai', target => lib.card.shunshou_copy2.ai.result.target(get.player(), target))
					.set('targets', target)
					.set('filterTarget', (card, player, target) => get.event().targets.includes(target))
					.forResult()
				if (result.bool) event.result.targets = result.targets
			}
		},
		async content(event, trigger, player) {
			const target = (event.targets || [])[0]
			if (target) await player.gainPlayerCard(target, true)
			else await player.draw()
			event.getParent(2).goto(0)
			event.getParent(2).Fe2O3_bayun_longdan = target
			player.addTempSkill('Fe2O3_bayun_1')
			event.getParent(2).backup('Fe2O3_bayun_longdan')
			event.getParent(2).openskilldialog = get.prompt2('ollongdan')
		},
		subSkill : {
			1 : {
				charlotte : true
			},
			longdan : {
				inherit : 'ollongdan',
				log : false,
				filterOk() {
					const event = get.event()
					const player = get.player()
					const target = event.Fe2O3_bayun_longdan
					if (target) {
						if (event.name == 'chooseToRespond' && event.source || event.type == 'dying') return true
						if (get.card().name == 'shan' && event.respondTo) return target == event.respondTo[0]
						return ui.selected.targets.includes(target)
					}
					return true
				},
				async precontent(event, trigger, player) {
					player.removeSkill('Fe2O3_bayun_1')
				}
			}
		}
	},
	//邓艾
	ddddssssbbbb_chouxuan : {
		forced : true,
		trigger : {
			player : 'useCard'
		},
		init(player, skill) {
			player.storage[skill] = {
				translate : lib.translate[skill + '_info'],
				str : '锁定技当你使用一张牌时若此牌与你上上家使用的上上张牌名相同你选择两项弃置一张牌并选择两项弃置一张牌并令此牌额外结算一次删除删除一个重复字符串摸X张牌删除一个重复字符串摸X张牌摸X张牌',
				num : 91
			}
		},
		mark : true,
		intro : {
			content : storage => storage.str,
			markcount : storage => storage.num - storage.str.length
		},
		filter(event, player) {
			const str = player.storage.ddddssssbbbb_chouxuan.str
			let target = player.getPrevious()
			if (str.includes('上上家')) target = target.getPrevious()
			const history = target.getAllHistory('useCard', evt => evt != event)
			return history[history.length - 1 - str.includes('上上张')]?.card.name == event.card.name
		},
		async content(event, trigger, player) {
			let links, first
			const storage = player.storage[event.name]
			do {
				function update() {
					for (const i of list) {
						storage.translate = storage.translate.replaceAll(/(\d\.)，*/g, (_, p1) => p1)
						storage.translate = storage.translate.replaceAll(/(\d\.)\d\./g, (_, p1) => p1)
						storage.translate = storage.translate.replaceAll(/，\d\.。/g, '。')
						for (let i = 1; i < list.length; i ++) if (!storage.translate.includes(i + '.'))
							for (let j = i; j < list.length + 1; j ++) if (storage.translate.includes(j + '.')) {
								storage.translate = storage.translate.replaceAll(j + '.', i + '.')
								break
							}
					}
					player.syncStorage(event.name)
					player.update(event.name)
				}
				let list = [...get.skillInfoTranslation(event.name, player).matchAll(/(?<=\d\.).*?(?=，\d\.|。)/g)]
				if (first) list = list.filter(i => !i[0].includes('选择两项'))
				links = await player.chooseButton(['筹旋：选择两项', ...list.map(i => [i, 'textbutton'])], 2, true).forResultLinks()
				for (const link of links) {
					if (link.includes('弃置一张牌')) await player.chooseToDiscard('he', true)
					if (link.includes('令此牌额外结算一次')) trigger.effectCount++
					if (/删除“.*?”/.test(link)) {
						const del = link.match(/删除“(.*?)”/)[1]
						storage.translate = storage.translate.replaceAll(del, '')
						storage.translate = storage.translate.replaceAll('“”', '')
						storage.str = storage.str.replaceAll(del, '')
						update()
					}
					else if (link.includes('删除一个重复字符串')) {
						let str = storage.str
						const dblist = []
						for (let i = 1; i < str.length / 2; i ++) for (let j = 0; j < str.length - i; j ++)
							if (str.slice(j, j + i) == str.slice(j + i, j + 2 * i)) dblist.push(str.slice(j, j + i))
						for (let i = 0; i < dblist.length; i ++) {
							let j = dblist[i], k = dblist[i]
							const replace = `<a href='javascript:ui.selected.buttons.add({link : ${i}});ui.click.ok()'>${k}</a>`
							if (str.includes(j + k)) str = str.replace(j + k, j + replace)
							else do {
								j = j.slice(1)
								if (str.includes('</a>' + j + k)) {
									str = str.replace('</a>' + j + k, '</a>' + j + replace)
									break
								}
							} while (j.length)
						}
						const dialog = ui.create.dialog('hidden')
						dialog.add('删除一个重复字符串')
						dialog.addText(str)
						const index = (await player.chooseButton(dialog, true).set('processAI', () => ({bool : true, links : [0]})).forResultLinks())[0]
						str = str.replace(`<a href='javascript:ui.selected.buttons.add({link : ${index}});ui.click.ok()'>${dblist[index]}</a>`, '')
						str = str.replaceAll(/\d\.|<.*?>/g, '')
						storage.str = str
						const strx = dblist[index], db = strx + strx
						let i = 1
						for (let j = 0; j < index; j ++) if (dblist[j] == strx) i ++
						const translatexx = []
						let translate = storage.translate
						let num = 0, tempstr = '', temp = 0, temp2 = 0, start, end
						for (let ii = 0; ii < translate.length; ii ++) {
							if (/[\d\.，。：“”]/.test(translate[ii]) && temp) {
								tempstr += translate[ii]
								temp2 ++
							}
							else if (translate[ii] == db[temp]) {
								if (temp == strx.length) start = ii
								if (temp + 1 == db.length) end = ii + 1
								tempstr += translate[ii]
								temp ++
							}
							else {
								tempstr = ''
								temp = 0
								temp2 = 0
								i -= temp + temp2
							}
							if (temp == db.length) num ++
							if (num == i) {
								storage.translate = translate.slice(0, start) + translate.slice(end)
								break
							}
						}
						update()
					}
					if (link.includes('删除，')) {
						const index = list.indexOf(link) + 1
						storage.translate = storage.translate.replaceAll(link, '')
						storage.str = storage.str.replaceAll(link.replaceAll('，', ''), '')
						update()
					}
					if (link.includes('摸X张牌')) {
						const num = Math.floor((storage.num - storage.str.length) / 10) + 1
						for (const i of link.matchAll(/摸X张牌/g)) await player.draw(num)
					}
				}
				first = true
			} while (links.some(i => i.includes('选择两项')))
		}
	},
	//公孙渊
	zxunnamed_huaiyi : {
		enable : 'phaseUse',
		usable : 1,
		derivation : ['zxunnamed_shixian'],
		init(player, skill) {
			player.storage[skill] = 0
			player.storage[`${skill}_items`] = []
		},
		zhuanhuanji(player, skill) {
			if (player.storage[skill] == player.storage[`${skill}_items`].length) player.storage[skill] = 0
			else player.storage[skill] ++
		},
		mark : true,
		marktext: '异',
		$zhuanhuanji() {},
		intro: {
			markcount : storage => storage + 1,
			content(storage, player) {
				let list = [...get.skillInfoTranslation('zxunnamed_shixian', player).matchAll(/(?<=\d\.).*?(?=，\d\.|；)/g)]
				return `出牌阶段限一次，你可以${ storage ? list[player.storage[`zxunnamed_huaiyi_items`][storage - 1]] : `弃置两张牌并获得或重置${get.poptip('zxunnamed_shixian')}` }`
			}
		},
		filterCard : true,
		position : 'he',
		selectCard : ()=> (get.player().storage.zxunnamed_huaiyi == 0) * 2,
		async content (event, trigger, player) {
			const storage = player.storage[event.name]
			const items = player.storage[`${event.name}_items`]
			if (!storage) {
				if (player.hasSkill('zxunnamed_shixian')) player.removeSkill('zxunnamed_shixian_used')
				else await player.addSkills('zxunnamed_shixian')
			}
			else await eval(`(async function () {${lib.skill.zxunnamed_shixian.choiceAfter[items[storage - 1]]}})()`)
			player.changeZhuanhuanji(event.name)
		},
		ai : {
			order : 7,
			result : {
				player : 1
			}
		}
	},
	zxunnamed_shixian : {
		trigger : {
			player : ['phaseJieshuBegin', 'damageEnd'],
			source : 'damageSource'
		},
		filter : (event, player, name) => !player.storage.zxunnamed_shixian_used?.trigger.includes(name),
		forced : true,
		choiceAfter : [
			'await player.draw(2)',
			'if (get.itemtype(_status.currentPhase) == `player`) await player.discardPlayerCard(_status.currentPhase)',
			`await player.removeSkills([event.name])
			let list = [...get.plainText(get.skillInfoTranslation(event.name, player)).matchAll(/(?<=\\d\\.).*?(?=，\\d\\.|；)/g)]
			console.log(list)
			for (const [i] of list)
				if (i == '摸两张牌') await player.draw(2)
				else if (i == '弃置当前回合角色一张牌') {
					if (get.itemtype(_status.currentPhase) == 'player')
						await player.discardPlayerCard(_status.currentPhase)
				}
				else if (i == '失去此技能并执行所有项') continue
				else {
					await player.chooseToDiscard('he', 2, true)
					if (player.hasSkill('zxunnamed_shixian')) player.removeSkill('zxunnamed_shixian_used')
					else await player.addSkills('zxunnamed_shixian')
				}`
		],
		async content(event, trigger, player) {
			if (!player.hasSkill('zxunnamed_shixian_used')) await player.addSkill('zxunnamed_shixian_used')
			player.storage.zxunnamed_shixian_used.trigger.add(event.triggername)
			const chosen = player.storage.zxunnamed_shixian_used.chosen
			let list = [...get.skillInfoTranslation(event.name, player).matchAll(/(?<=\d\.).*?(?=，\d\.|；)/g)]
			list = list.map((i, j) => [j, ...i])
			const { result } = await player.chooseButton(['恃险：选择一项', [list, 'tdnodes']], true)
				.set('chosen', chosen)
				.set('filterButton', button => !get.event('chosen').includes(button.link))
			game.log(player, '选择了', '#g【恃险】','的', `#y选项${ get.cnNumber(result.links[0] + 1, true) }`)
			chosen.add(result.links[0])
			player.storage.zxunnamed_huaiyi_items?.push(result.links[0])
			player.syncStorage('zxunnamed_shixian_used')
			player.syncStorage('zxunnamed_huaiyi_items')
			await eval(`(async function () {${lib.skill[event.name].choiceAfter[result.links[0]]}})()`)
		},
		onremove(player) {
			player.removeSkill('zxunnamed_shixian_used')
		},
		mark : true,
		marktext: '险',
		intro: {
			mark(dialog, storage, player) {
				const used = player.storage.zxunnamed_shixian_used || { trigger : [], chosen : [] }
				const addNewRow = lib.element.dialog.addNewRow.bind(dialog)
				const triggers = {
					phaseJieshuBegin : '结束阶段',
					damageSource : '造成伤害',
					damageEnd : '受到伤害'
				}
				const options = ['摸两张牌', '弃置牌', '失去技能']
				dialog.css({ width: '35%' })
				used.trigger.forEach(i => triggers[i] = '')
				used.chosen.forEach(i => options[i] = '')
				const triggerx = Object.values(triggers)
				addNewRow(...[
					{ item : '时机', ratio : 2 },
					{ item : triggerx[0], ratio : 3 },
					{ item : triggerx[1], ratio : 3 },
					{ item : triggerx[2], ratio : 3 },
				])
				addNewRow(...[
					{ item : '选项', ratio : 2 },
					{ item : options[0], ratio : 3 },
					{ item : options[1], ratio : 3 },
					{ item : options[2], ratio : 3 },
				])
			}
		},
		subSkill : {
			used : {
				init(player, skill) {
					player.storage[skill] = {
						trigger : [],
						chosen : []
					}
				},
				onremove: true
			}
		}
	},
	//诸葛亮
	FeO3_dafei : {
		trigger : {
			player: 'useCardToPlayered'
		},
		filter(event, player) {
			game.log(1)
			if (event.targets.length != 1) return false
			const evt = player.getAllHistory('useCard', evt => evt != event.getParent() && evt.targets).lastItem
			if (!evt) return false
 			if (evt.targets.length != 1) return false
			const target = event.targets[0],
				targetx = evt.targets[0]
			if (target.hasSkill('undist') || targetx.hasSkill('undist')) return false
			let left = [],
				right = [],
				left2 = target,
				right2 = target
			while (left2 != targetx && right2 != targetx) {
				left2 = left2.getPrevious()
				right2 = right2.getNext()
				if (left2 != targetx) left.push(left2)
				if (right2 != targetx) right.push(right2)
			}
			if (targetx == left2 && left.some(i => i.countDiscardableCards(player, 'he'))) return true
			if (targetx == right2 && right.some(i => i.countDiscardableCards(player, 'he'))) return true
			return false
		},
		async content(event, trigger, player) {
			const evt = player.getAllHistory('useCard', evt => evt != trigger.getParent() && evt.targets).lastItem
			const target = trigger.targets[0],
				targetx = evt.targets[0]
			if (target.hasSkill('undist') || targetx.hasSkill('undist')) return
			if (target.isDead() || targetx.isDead()) return
			let left = [],
				right = [],
				left2 = target,
				right2 = target,
				left_eff = 0,
				right_eff = 0
			while (left2 != targetx && right2 != targetx) {
				left2 = left2.getPrevious()
				right2 = right2.getNext()
				if (left2 != target) left.push(left2)
				if (right2 != target) right.push(right2)
			}
			const choices = []
			const card = { name: 'guohe_copy', position: 'he' }
			if (targetx == right2)
				for (const i of right) 
					if (i.countDiscardableCards(player, 'he')) {
						choices.add('↖顺时针')
						right_eff += get.effect(i, card, player)
					}
			
			if (targetx == left2)
				for (const i of left) 
					if (i.countDiscardableCards(player, 'he')) {
						choices.add('逆时针↗')
						left_eff += get.effect(i, card, player)
					}
			const choice = right_eff > left_eff ? 1 : 0
			const {result} = await player
				.chooseControl(choices)
				.set('prompt', get.prompt('FeO3_dafei'))
				.set('prompt2', `弃置${get.translation(targetx)}和${get.translation(target)}某个方向之间的所有角色各一张牌`)
				.set('choice', choice)
			const targets = []
			if (result.control == '↖顺时针') {
				let current = targetx.getPrevious()
				while (current != trigger.target) {
					if (current.countDiscardableCards(player, 'he')) targets.push(current)
					current = current.getPrevious()
				}
			}
			else {
				let current = targetx.getNext()
				while (current != trigger.target) {
					if (current.countDiscardableCards(player, 'he')) targets.push(current)
					current = current.getNext()
				}
			}
			if (!targets.length) return
			const lose_list = []
			for (const current of targets) {
				if (!current.countDiscardableCards(player, 'he')) continue
				const {result : result2} = await player.discardPlayerCard(current, true).set('chooseonly', true)
				lose_list.push([current, result2.cards])
			}
			await game.loseAsync({lose_list}).setContent('discardMultiple')
		}
	},
	FeO3_zhengjie : {
		trigger : {
			player: 'loseAfter',
			global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter']
		},
		filter : (event, player) => event.getl(player)?.cards2.length,
		async cost(event, trigger, player) {
			event.result = await player.chooseUseTarget({name : 'diaohulishan', isCard : true}).set('logSkill', 'FeO3_zhengjie').forResult()
		},
		popup : false,
		async content(event, trigger, player) {
		}
	},
	FeO3_jinqi : {
		trigger: {
			global: 'dieAfter'
		},
		filter : ()=> get.discarded().someInD('d'),
		async content(event, trigger, player) {
			const cards = get.discarded().filterInD('d')
			if (cards.length) {
				const suits = []
				for (const card of cards) suits.add(get.suit(card))
				const {result} = await player.chooseButton(['提子：获得不同花色的牌各一张', cards], true, suits.length)
					.set('ai', button => {
						const player = get.player()
						return get.value(button.link, player)
					})
					.set('filterButton', button => get.links(ui.selected.buttons).every(card => get.suit(card) != get.suit(button.link)))
				await player.gain(result.links, 'gain2')
			}
			for (const phase of lib.phaseName) {
				const evt = event.getParent(phase)
				if (evt && evt.name == phase) {
					evt.skipped = true
					game.log(player, '令', _status.currentPhase, '结束了' + get.translation(phase))
				}
			}
			const evt2 = event.getParent('phase')
			if (evt2 && evt2.name == 'phase') {
				evt2.finish()
				game.log(player, '令', _status.currentPhase, '结束了当前回合')
			}
		}
	},
	//诸葛亮
	Fe3O4_chichi : {
		enable : 'chooseToUse',
		viewAs(cards) {
			if (cards.length) return get.autoViewAs(cards[0])
			return null
		},
		position : 'h',
		log : false,
		zhuanhuanji: true,
		mark: true,
		marktext: '☯',
		intro: {
			content(storage) {
				if (storage == true) return '你可以以明置方式使用牌'
				return '你可以以重铸方式使用牌'
			}
		},
		filterCard(card, player, event) {
			event ??= get.event()
			if (!event._backup.filterCard(card, player, event)) return false
			if (player.storage.Fe3O4_chichi) return player.canRecast(card)
			return !get.is.shownCard(card)
		},
		//邪门
		frequent : true,
		onChooseToUse(event) {
			const player = get.player()
			if (lib.config.autoskilllist.includes('Fe3O4_chichi')) return//此技能没有开启自动发动
			let skills = player.getSkills("invisible")
			skills = game.expandSkills(skills).concat(lib.skill.global).filter(skill => lib.filter.filterEnable(event, player, skill))
			skills.remove('Fe3O4_chichi')
			if (skills.length) return//有其他可以发动的技能
			if (event.type != 'phase') return//不为出牌阶段
			if (!event.isMine()) return//不是玩家操作
			if (event.norestore || event._backup || event.skill) return//不能发动技能或已经有技能
			event.fakeforce = true
			event.backup('Fe3O4_chichi')
			event.openskilldialog = ui.create.dialog(get.translation('Fe3O4_chichi'), '<div><div style="width:100%">' + lib.dynamicTranslate['Fe3O4_chichi'](player, 'Fe3O4_chichi') + "</div></div>");
		},
		async precontent(event, trigger, player) {
			let next
			if (player.storage.Fe3O4_chichi) next = player.recast(event.result.cards)
			else next = player.addShownCards(event.result.cards, 'visible_Fe3O4_chichi')
			event.result.cards = []
			game.log('Fe3O4_chichi')
			player.changeZhuanhuanji('Fe3O4_chichi')
			await next
			if (get.type(event.result.card) == 'equip' || get.type(event.result.card) == 'delay') event.getParent().nouse = true
		},
		ai : {
			order : 7,
			result : {
				player : 1
			}
		}
	},
	Fe2O3_chichi : {
		mod : {
			cardEnabled(card, player) {
				if (card.cards) {
					for (const i of card.cards)
						if (lib.skill.Fe2O3_chichi.mod.cardEnabled(i, player) === false) return false
					return
				}
				if (!player.getCards().includes(card)) return
				for (let i of player.getCards()) {
					if (get.is.shownCard(i)) return false
					if (i == card) return
				}
			},
			get cardSavable() {
				return lib.skill.Fe2O3_chichi.mod.cardEnabled
			},
			get cardRespondable() {
				return lib.skill.Fe2O3_chichi.mod.cardEnabled
			},
			ignoredHandcard(card, player) {
				for (let i of player.getCards()) {
					if (get.is.shownCard(i)) return true
					if (i == card) return
				}
			},
			cardDiscardable(card, player, name) {
				if (!player.getCards().includes(card)) return
				if (name == 'phaseDiscard') {
					for (let i of player.getCards()) {
						if (get.is.shownCard(i)) return false
						if (i == card) return
					}
				}
			}
		},
		forced : true,
		trigger : {
			player : 'recastBegin'
		},
		filter : (event, player) => player.countCards('he', card => {
			if (get.suit(card) == 'none') return false
			if (event.cards.includes(card)) return false
			if (event.cards.every(i => get.suit(i) != get.suit(card))) return false
			return player.canRecast(card)
		}),
		async content(event, trigger, player) {
			const suits = [], cards = trigger.cards
			for (const card of cards) suits.add(get.suit(card))
			suits.remove('none')
			for (const suit of suits) cards.addArray(player.getCards('he', card => get.suit(card) == suit && player.canRecast(card)))
		},
		ai : {
			noSortCard: true,
			neg : true
		}
	},






	//别群比赛（练手作品）
	//吕乂
	ybsl_jianyue: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: "judgeEnd"
		},
		preHidden: true,
		check(event, player) {
			return player.hasUseTarget(event.result.card);
		},
		filter(event, player) {
			return get.position(event.result.card, true) == "o" && player.hasUseTarget(event.result.card);
		},
		async content(event, trigger, player) {
			player.chooseUseTarget(trigger.result.card, false);
		},
	},
	ybsl_tuntian: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: "loseAfter",
			global: [
				"equipAfter",
				"addJudgeAfter",
				"gainAfter",
				"loseAsyncAfter",
				"addToExpansionAfter",
			],
		},
		frequent: true,
		preHidden: true,
		filter: function (event, player) {
			if (player == _status.currentPhase) return false;
			if (event.name == "gain" && event.player == player) return false;
			var evt = event.getl(player);
			return evt && evt.cards2 && evt.cards2.length > 0;
		},
		content: function* (event, map) {
			let trigger = map.trigger,
				player = map.player;
			var result = yield player.judge(function (card) {
				if (get.suit(card) == "heart") return -1;
				return 1;
			}).set('judge2', function (result) {
				return result.bool;
			});
			if (!result.bool || get.position(result.card) != "d") {
				//game.cardsDiscard(card);
				event.finish();
				return;
			} else {
				var card = result.card;
				var next = yield player.chooseBool("是否将" + get.translation(card) + "作为“田”置于武将牌上？").ai =
					function () {
						return true;
					};
				if (!next.bool && !event.directbool) {
					return;
				} else {
					yield player.addToExpansion(card, "gain2").gaintag.add("tuntian");
				}
			}

		},
		// content: function () {
		// "step 0";
		// var next = player.judge(function (card) {
		// if (get.suit(card) == "heart") return -1;
		// return 1;
		// });
		// next.judge2 = function (result) {
		// return result.bool;
		// };
		// // next.callback = lib.skill.ybsl_tuntian.callback;
		// "step 1";
		// if (!result.bool || get.position(result.card) != "d") {
		// //game.cardsDiscard(card);
		// event.finish();
		// return;
		// }
		// event.card = result.card;
		// player.chooseBool("是否将" + get.translation(event.card) + "作为“田”置于武将牌上？").ai =
		// function () {
		// return true;
		// };
		// "step 2";
		// if (!result.bool && !event.directbool) {
		// return;
		// }
		// player.addToExpansion(event.card, "gain2").gaintag.add("tuntian");
		// },
		// callback: function () {
		// if (!event.judgeResult.bool) {
		// event.finish();
		// return;
		// }
		// player.addToExpansion(event.judgeResult.card, "gain2").gaintag.add("tuntian");
		// },
		marktext: "田",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		group: "ybsl_tuntian_dist",
		locked: false,
		subSkill: {
			dist: {
				locked: false,
				mod: {
					globalFrom: function (from, to, distance) {
						var num = distance - from.getExpansions("tuntian").length;
						if (
							_status.event.skill == "jixi_backup" ||
							_status.event.skill == "gzjixi_backup"
						)
							num++;
						return num;
					},
				},
			},
		},
		ai: {
			effect: {
				target: function (card, player, target, current) {
					if (
						typeof card === "object" &&
						get.name(card) === "sha" &&
						target.mayHaveShan(
							player,
							"use",
							target.getCards("h", (i) => {
								return i.hasGaintag("sha_notshan");
							})
						)
					)
						return [0.6, 0.75];
					if (!target.hasFriend() && !player.hasUnknown()) return;
					if (_status.currentPhase == target || get.type(card) === "delay") return;
					if (
						card.name != "shuiyanqijunx" &&
						get.tag(card, "loseCard") &&
						target.countCards("he")
					) {
						if (target.hasSkill("ziliang")) return 0.7;
						return [0.5, Math.max(2, target.countCards("h"))];
					}
					if (target.isUnderControl(true, player)) {
						if (
							(get.tag(card, "respondSha") && target.countCards("h", "sha")) ||
							(get.tag(card, "respondShan") && target.countCards("h", "shan"))
						) {
							if (target.hasSkill("ziliang")) return 0.7;
							return [0.5, 1];
						}
					} else if (get.tag(card, "respondSha") || get.tag(card, "respondShan")) {
						if (get.attitude(player, target) > 0 && card.name == "juedou") return;
						if (get.tag(card, "damage") && target.hasSkillTag("maixie")) return;
						if (target.countCards("h") == 0) return 2;
						if (target.hasSkill("ziliang")) return 0.7;
						if (get.mode() == "guozhan") return 0.5;
						return [
							0.5,
							Math.max(
								target.countCards("h") / 4,
								target.countCards("h", "sha") + target.countCards("h", "shan")
							),
						];
					}
				},
			},
			threaten: function (player, target) {
				if (target.countCards("h") == 0) return 2;
				return 0.5;
			},
			nodiscard: true,
			nolose: true,
		},
	},
	ybsl_quanfan: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: 'phaseUse',
		usable: 1,
		filter: function (event, player) {
			return (player.getExpansions("tuntian").length > 0 || player.countDiscardableCards(player, 'he')) && game.countPlayer(function (current) {
				return current != player && (ai.get.attitude(player, current) < 0);
			}) > 0
		},
		check: function (card) {
			return 8 - get.value(card);
		},
		chooseButton: {
			dialog: function (event, player) {
				var dialog = ui.create.dialog('请选择一张手牌或田');
				if (player.countDiscardableCards(player, 'he')) {
					dialog.add("手牌");
					dialog.add(player.getCards('h'));
				}
				if (player.getExpansions("tuntian").length > 0) {
					dialog.add("田");
					dialog.add(player.getExpansions("tuntian"));
				}
				return dialog;
			},
			backup: function (links, player) {
				return {
					audio: "ybsl_quanfan",
					filterTarget: false,
					filterCard: function () {
						return false;
					},
					selectCard: -1,
					card: links[0],
					delay: false,
					content: lib.skill.ybsl_quanfan.contentx,
					ai: {
						order: 10,
						result: {
							target: function (player, target) {
								return -2;
							},
						},
					},
				};
			},
			// prompt: function () {
			// return "请选择〖劝范〗的目标";
			// },
		},
		contentx: function () {
			'step 0'
			var vard = lib.skill.ybsl_quanfan_backup.card;
			player.discard(vard);
			'step 1'
			var next = player.judge(function (card) {
				if (get.suit(card) == "heart") return -1;
				return 1;
			});
			next.judge2 = function (result) {
				return result.bool;
			};
			'step 2'
			event.card = result.card;
			if (game.filterPlayer().filter(tar => tar != player && tar.countCards('h'))) player.chooseTarget('展示一名其他角色的至多Y张手牌（Y为其体力值且至多为5），弃置其中与判定颜色相同的牌。', true, function (card, player, target) {
				return target.countCards('h') && target != player;
			}).set('ai', function (target) {
				return -get.attitude(_status.event.player, target);
			});
			else event.finish();
			'step 3'
			if (result.bool) {
				delete result.cards;
				event.target = result.targets[0];
				player.choosePlayerCard(
					event.target,
					"h",
					[1, Math.min(event.target.countCards("he"), 5, event.target.hp)],
					'展示一名其他角色的至多Y张手牌（Y为其体力值且至多为5），弃置其中与判定花色相同的牌。',
				).set("forceAuto", true);
			} else event.finish();
			'step 4'
			if (result.bool) {
				var cards = result.cards,
					cards2 = [];
				event.target.showCards(cards);
				for (var i = 0; i < cards.length; i++) {
					if (get.suit(cards[i]) == get.suit(event.card)) cards2.push(cards[i]);
				}
				event.target.discard(cards2);
			}
		},
		ai: {
			order: 9,
			result: {
				player: 1,
				// target:-2,
			},
			threaten: 2, //嘲讽值
		},
	},
	// ybsl_quanbian:'权辩',
	// ybsl_quanbian_info:'出牌阶段，当你使用牌后，若此花色为你本阶段首次使用，你可以摸一张牌。否则你需失去1点体力，且攻击范围+1。',
	// ybsl_quanbianx:'权辩',
	// ybsl_quanbianx_info:'出牌阶段，当你使用牌后，你可以摸一张牌，每种花色每阶段限一次。若如此做，本阶段你再次使用该花色牌后，你需失去1点体力，且攻击范围+1。',
	ybsl_quanbian: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: "useCardAfter"
		},
		// forced: true,
		direct: true,
		filter: (event, player) => {
			return player.isPhaseUsing();
		},

		content: function () {
			"step 0"
			var suit1 = get.suit(trigger.card);
			var suits = get.YB_suit(player.getHistory("useCard", function (evt) {
				return evt.card != trigger; //
			}));
			if (suits.includes(suit1)) {
				player.loseHp();
				player.logSkill('ybsl_quanbian');
				player.markSkill('ybsl_quanbian_mark');
				player.addTempSkill('ybsl_quanbian_mark', 'phaseUseAfter');
				if (!player.storage.ybsl_quanbian_markR) player.storage.ybsl_quanbian_markR = 0;
				player.storage.ybsl_quanbian_markR++;
			} else {
				player.chooseControl('是', '否').set('prompt', '是否摸牌？');
			}
			// event.count = trigger.num;
			"step 1"
			if (result.control == '是') {
				player.draw().logSkill('ybsl_quanbian');
			}
		},
		subSkill: {
			mark: {
				mark: true,
				marktext: '辩',
				intro: {
					name: '权辩',
					content: function (event, player, storage, name, skill) {
						var text = '';
						// if(player.storage.ybsl_quanbian_mark) text +='本阶段已因'+player.storage.ybsl_quanbianx_mark+'触发过技能。';
						if (player.storage.ybsl_quanbian_markR) text += '本阶段因此技能增加攻击范围' + player.storage.ybsl_quanbian_markR;
					},
				},
				mod: {
					attackRange: function (player, distance) {
						return (
							distance + player.storage.ybsl_quanbian_markR
						);
					},
				},
				init: function (player) {
					if (!player.storage.ybsl_quanbian_markR) player.storage.ybsl_quanbian_markR = 0;
				},
				forced: true,
				onremove: function (player) {
					delete player.storage.ybsl_quanbian_markR;
				},
				// onremove:true,
			}
		}
	},
	ybsl_quanbianx: {
		audio: 'ybsl_quanbian',
		trigger: {
			player: "useCardAfter"
		},
		// forced: true,
		direct: true,
		filter: (event, player) => {
			return player.isPhaseUsing();
		},
		content: function () {
			"step 0"
			if (!player.storage.ybsl_quanbianx_mark) player.storage.ybsl_quanbianx_mark = [];
			var suit1 = get.suit(trigger.card);
			var suits = player.storage.ybsl_quanbianx_mark;
			if (suits.includes(suit1)) {
				player.loseHp();
				player.logSkill('ybsl_quanbianx');
				// player.storage.ybsl_quanbianx_mark.push(get.suit(trigger.card));
				if (!player.storage.ybsl_quanbianx_markR) player.storage.ybsl_quanbianx_markR = 0;
				player.storage.ybsl_quanbianx_markR++
			} else {
				player.chooseControl('是', '否').set('prompt', '是否摸牌？');
				// event.suit=suit1;
			}
			// event.count = trigger.num;
			"step 1"
			if (result.control == '是') {
				player.draw();
				player.logSkill('ybsl_quanbianx');
				player.markSkill('ybsl_quanbianx_mark');
				player.addTempSkill('ybsl_quanbianx_mark', 'phaseUseAfter');
				// player.storage.ybsl_quanbianx_mark.push(event.suit);
				player.storage.ybsl_quanbianx_mark.push(get.suit(trigger.card));
			}
		},

		subSkill: {
			mark: {
				mark: true,
				marktext: '辩',
				intro: {
					name: '权辩',
					content: function (event, player, storage, name, skill) {
						var text = '';
						if (player.storage.ybsl_quanbianx_mark) text += '本阶段已因' + player.storage.ybsl_quanbianx_mark + '触发过技能。';
						if (player.storage.ybsl_quanbianx_markR) text += '<br>本阶段因此技能增加攻击范围' + player.storage.ybsl_quanbianx_markR;
						return text;
					},
				},
				// driect:true,
				// trigger:{
				// 	trigger: { player: "phaseUseAfter" },
				// },
				// content:function(){
				// 	player.removeSkill('ybsl_quanbianx_mark');
				// },
				// priority:114514,
				init: function (player) {
					if (!player.storage.ybsl_quanbianx_mark) player.storage.ybsl_quanbianx_mark = [];
					if (!player.storage.ybsl_quanbianx_markR) player.storage.ybsl_quanbianx_markR = 0;
				},
				// lastdo:true,
				forced: true,
				mod: {
					attackRange: function (player, distance) {
						return (
							distance + player.storage.ybsl_quanbianx_markR
						);
					},
				},
				onremove: function (player) {
					delete player.storage.ybsl_quanbianx_mark;
					delete player.storage.ybsl_quanbianx_markR;
				},
				// onremove:true,
			}
		}
	},
	ybsl_zhaxiang: {
		audio: 'ext:夜白神略/audio/character:2',
	},
	// // ybsl_quanbian:'权辩',
	// // ybsl_quanbian_info:'出牌阶段，当你使用牌时，若此花色为你本阶段首次使用，你可以摸一张牌。否则此牌结算完成后，你需失去1点体力，且攻击范围+1。',
	// // ybsl_quanbianx:'权辩',
	// // ybsl_quanbianx_info:'出牌阶段，当你使用牌时，你可以摸一张牌。若此花色不为你本阶段首次触发，此牌结算完成后，你需失去1点体力，且攻击范围+1。',
	// // ybsl_quanbian:'权辩',
	// // ybsl_quanbian_info:'出牌阶段，当你使用牌时，若此花色为你本阶段首次使用，你可以摸一张牌。否则你需失去1点体力，且攻击范围+1。',
	// // ybsl_quanbianx:'权辩',
	// // ybsl_quanbianx_info:'出牌阶段，当你使用牌时，你可以摸一张牌。若此花色不为你本阶段首次触发，你需失去1点体力，且攻击范围+1。',
	// ybsl_zhaxiang:'诈降',
	// ybsl_zhaxiang_info:'此技能仅提供一条语音。',
	ybsl_ranxin: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			global: 'phaseEnd'
		},
		filter: function (event, player) {
			if (!_status.currentPhase || !_status.currentPhase.isIn()) return false;
			if (event.player == player) return true;
			if (event.player.getHistory("skipped").length > 0) return true;
			var list = game.filterPlayer();
			for (var i of list) {
				// if (!i || !i.isIn()) break;
				// if (i.getHistory("damageCancelled")) return i.isIn();
				// if (i.getHistory("damageZero")) return i.isIn();
				if (i.hasSkill('YB_damageCancel2')) return i.isIn();
			}
		},
		// async cost(event, trigger, player) {
		// const { index } = await player
		// .chooseControl()
		// .set("prompt", "燃心：请选择一项，然后视为对其使用一张伤害+1的火【杀】")
		// .set("choiceList", ["令"+ get.translation(trigger.player) +"回复1点体力", "令" + get.translation(trigger.player) + "摸两张牌","cancel2"])
		// .set("ai", function () {
		// if (get.effect(_status.event.getTrigger().player, { name: "sha" }, _status.event.player) > 0) {

		// }
		// return 2;
		// })
		// .forResult();
		// event.result.cost_data.index = index;
		// },
		direct: true,
		content: function* (event, map) {
			let trigger = map.trigger,
				player = map.player;
			let target = trigger.player;
			var result = yield player
				.chooseControl()
				.set("prompt", "燃心：请选择一项，然后视为对其使用一张伤害+1的火【杀】")
				.set("choiceList", ["令" + get.translation(trigger.player) + "回复1点体力", "令" + get.translation(trigger.player) + "摸两张牌", "取消"])
				.set("ai", function () {
					var target = trigger.player;
					if (get.effect(_status.event.getTrigger().player, {
						name: "sha",
						nature: 'fire'
					}, _status.event.player) > 0) {
						// if (target.maxHp - target.hp = 0 && !target.hasSkillTag("maixie")) return 0;
						if (target.maxHp >= target.hp && !target.hasSkillTag("maixie")) return 0;
						return 2;
					} else {
						if (get.attitude(player, target) > 0) {
							if (target.hasSkill('xiangle')) {
								if (target.hp <= 1 && target.maxHp - target.hp >= 1) return 0
								else return 1
							} else if (target.hasShan()) {
								if (target.hp <= 1 && target.maxHp - target.hp >= 1) return 0
								else return 1
							}
						}
					}
					return 2;
				});
			// .forResult();
			if (result.index != 2) {
				yield player.logSkill('ybsl_ranxin', target);
				if (result.index == 0) {
					yield target.recover();
				} else yield target.draw(2);
				// yield player.useCard({
				// name: "sha",
				// nature: 'fire'
				// }, target).baseDamage++;

				if (player != target) yield player.useCard({
					name: "sha",
					nature: 'fire',
					ybdamage: true,
				}, target);
			}
		},
		group: 'ybsl_ranxin_damage',
		subSkill: {
			damage: {
				direct: true,
				trigger: {
					source: 'damageBegin1',
				},
				filter: function (event, player) {
					if (event.card && event.card.ybdamage) return true;
				},
				content() {
					trigger.num++;
				}

			}
		},
	},
	ybsl_fuju: {
		audio: 'ext:夜白神略/audio/character:2',
		forced: true,
		// trigger: { target: ["rewriteGainResult", "rewriteDiscardResult"] },
		trigger: {
			target: 'rewriteGainResult',
			player: 'damageBegin3',
		},
		filter: function (event, player, name) {
			if (name == 'rewriteGainResult') return event.player != player;
			else return event.source != player;
		},
		content: function () {
			'step 0'
			trigger.cancel();
			if (event.triggername == 'rewriteGainResult') {
				player.discard(trigger.cards);
				event.target = trigger.player;
			} else {
				player.loseHp();
				event.target = trigger.source;
			}
			'step 1'
			if (target.hp > player.hp) target.damage(player);
			'step 2'
			if (target.countCards('h') > player.countCards('h') && target.countDiscardableCards(player, 'he')) {
				player.discardPlayerCard('he', target, true);
			}
		}
	},
	ybsl_ranxinx: {
		audio: 'ybsl_ranxin',
		trigger: {
			global: 'phaseEnd'
		},
		filter: function (event, player) {
			if (!_status.currentPhase || !_status.currentPhase.isIn()) return false;
			if (event.player == player) return true;
			if (event.player.getHistory("skipped").length > 0) return true;
			var list = game.filterPlayer();
			for (var i of list) {
				if (i.hasSkill('YB_damageCancel2') || i.hasSkill('YB_excludedCancel2')) return i.isIn();
			}
		},
		direct: true,
		content: function* (event, map) {
			let trigger = map.trigger,
				player = map.player;
			let target = trigger.player;
			var result = yield player
				.chooseControl()
				.set("prompt", "燃心：请选择一项，然后视为对其使用一张伤害+1的火【杀】")
				.set("choiceList", ["令" + get.translation(trigger.player) + "回复1点体力", "令" + get.translation(trigger.player) + "摸两张牌", "取消"])
				.set("ai", function () {
					var target = trigger.player;
					if (get.effect(_status.event.getTrigger().player, {
						name: "sha",
						nature: 'fire'
					}, _status.event.player) > 0) {
						if (target.maxHp >= target.hp && !target.hasSkillTag("maixie")) return 0;
						return 2;
					} else {
						if (get.attitude(player, target) > 0) {
							if (target.hasSkill('xiangle')) {
								if (target.hp <= 1 && target.maxHp - target.hp >= 1) return 0
								else return 1
							} else if (target.hasShan()) {
								if (target.hp <= 1 && target.maxHp - target.hp >= 1) return 0
								else return 1
							}
						}
					}
					return 2;
				});
			if (result.index != 2) {
				yield player.logSkill('ybsl_ranxin', target);
				if (result.index == 0) {
					yield target.recover();
				} else yield target.draw(2);

				if (player != target) yield player.useCard({
					name: "sha",
					nature: 'fire',
					ybdamage: true,
				}, target);
			}
		},
		group: 'ybsl_ranxin_damage',
		subSkill: {
			damage: {
				direct: true,
				trigger: {
					source: 'damageBegin1',
				},
				filter: function (event, player) {
					if (event.card && event.card.ybdamage) return true;
				},
				content() {
					trigger.num++;
				}

			}
		},
	},
	ybsl_ranxiny: {
		audio: 'ybsl_ranxin',
		trigger: {
			global: 'phaseEnd'
		},
		filter: function (event, player) {
			if (!_status.currentPhase || !_status.currentPhase.isIn()) return false;
			// if(event.player==player)return true;
			if (event.player.getHistory("skipped").length > 0) return true;
			// var list = game.filterPlayer();
			return _status.currentPhase.hasHistory("lose", function (evt) {
				return evt.type == "discard" && evt.cards2.length > 0;
			})
		},
		direct: true,
		content: function* (event, map) {
			let trigger = map.trigger,
				player = map.player;
			let target = trigger.player;
			if (event.player.getHistory("skipped").length > 0 && _status.currentPhase.hasHistory("lose", function (evt) {
				return evt.type == "discard" && evt.cards2.length > 0;
			})) {
				var result = yield player
					.chooseControl()
					.set("prompt", "燃心：请选择一项，然后视为对其使用一张伤害+1的火【杀】")
					.set("choiceList", [
						"令" + get.translation(trigger.player) + "回复1点体力",
						"令" + get.translation(trigger.player) + "摸两张牌",
						"令" + get.translation(trigger.player) + "回复1点体力，然后令" + get.translation(trigger.player) + "摸两张牌",
						"取消"
					])
					.set("ai", function () {
						var target = trigger.player;
						if (get.effect(_status.event.getTrigger().player, {
							name: "sha",
							nature: 'fire'
						}, _status.event.player) > 0) {
							if (target.maxHp >= target.hp && !target.hasSkillTag("maixie")) return 0;
							return 3;
						} else {
							if (get.attitude(player, target) > 0) {
								return 2;
								// if (target.hasSkill('xiangle')) {
								// 	if (target.hp <= 1 && target.maxHp - target.hp >= 1) return 0
								// 	else return 1
								// } else if (target.hasShan()) {
								// 	if (target.hp <= 1 && target.maxHp - target.hp >= 1) return 0
								// 	else return 1
								// }
							}
						}
						return 2;
					});
				if (result.index != 3) {
					yield player.logSkill('ybsl_ranxin', target);
					if (result.index == 0 || result.index == 2) {
						yield target.recover();
					}
					if (result.index == 1 || result.index == 2) {
						yield target.draw(2);
					}

					if (player != target) yield player.useCard({
						name: "sha",
						nature: 'fire',
						ybdamage: true,
					}, target);
				}
			}
			else {
				var result = yield player
					.chooseControl()
					.set("prompt", "燃心：请选择一项，然后视为对其使用一张伤害+1的火【杀】")
					.set("choiceList", ["令" + get.translation(trigger.player) + "回复1点体力", "令" + get.translation(trigger.player) + "摸两张牌", "取消"])
					.set("ai", function () {
						var target = trigger.player;
						if (get.effect(_status.event.getTrigger().player, {
							name: "sha",
							nature: 'fire'
						}, _status.event.player) > 0) {
							if (target.maxHp >= target.hp && !target.hasSkillTag("maixie")) return 0;
							return 2;
						} else {
							if (get.attitude(player, target) > 0) {
								if (target.hasSkill('xiangle')) {
									if (target.hp <= 1 && target.maxHp - target.hp >= 1) return 0
									else return 1
								} else if (target.hasShan()) {
									if (target.hp <= 1 && target.maxHp - target.hp >= 1) return 0
									else return 1
								}
							}
						}
						return 2;
					});
				if (result.index != 2) {
					yield player.logSkill('ybsl_ranxin', target);
					if (result.index == 0) {
						yield target.recover();
					} else yield target.draw(2);

					if (player != target) yield player.useCard({
						name: "sha",
						nature: 'fire',
						ybdamage: true,
					}, target);
				}

			}
		},
		group: 'ybsl_ranxin_damage',
		subSkill: {
			damage: {
				direct: true,
				trigger: {
					source: 'damageBegin1',
				},
				filter: function (event, player) {
					if (event.card && event.card.ybdamage) return true;
				},
				content() {
					trigger.num++;
				}

			}
		},
	},
	// ybsl_ranxin:'燃心',
	// ybsl_ranxin_info:'每个回合结束时，若为你的回合，或本回合有阶段被跳过或有伤害被防止，你可令当前回合角色回复1点体力或摸两张牌，然后视为对其使用一张伤害+1的火【杀】。',
	// ybsl_fuju:'付炬',
	// ybsl_fuju_info:'锁定技，其他角色获得你的牌/对你造成伤害时，你改为弃置之/失去1点体力。然后你依次执行：①若其体力值大于你，你对其造成1点伤害；②若其手牌数大于你，你弃置其一张牌。',
	

	ybsl_rongjie: {
		audio: 'mbganjue',
		usable: 1,
		trigger: {
			player: 'useCardToTargeted',
			target: 'useCardToTargeted',
		},
		filter(event, player) {
			if (!get.tag(event.card, "damage")) return false;
			if (event.player == player) {
				return event.targets.length == 1 && event.target != player;
			}
			return true;
		},
		content() {
			'step 0'
			var targetx = trigger.player == player ? trigger.target : trigger.player;
			event.list = [player, targetx];
			event.list2 = [];
			event.count = 0;
			'step 1'
			event.source = event.list[event.count];
			event.target = event.list[1 - event.count];
			var list66 = get.YB_pu1(event.source);
			if (list66.length > 0) {
				event.source.YB_control(list66, 8, '请选择一个出限一技能发动，选错了不能取消');
			}
			else {
				event._result = false;
				event.goto(3);
			}
			'step 2'
			if (result.control && result.control != 'cancel2') {
				if (!event.source.getStat('skill')[result.control]) event.source.getStat('skill')[result.control] = 0;
				//event.source.getStat('skill')[result.control]--;
				event.skillName = result.control;
				//↓此段代码感谢霸天大佬的指导
				var next = event.source.chooseToUse();
				next.set("openskilldialog", get.prompt(event.skillName));
				next.set("norestore", true);
				next.set("_backupevent", event.skillName);
				next.set("custom", {
					add: {},
					replace: {
						window: function () { }
					},
				});
				// next.set('addCount',false);
				next._triggered = null;
				next.backup(event.skillName);
				next.set('chooseonly', true)
			}
			'step 3'
			if (result.boo) {
				const evt = result.cost_data.ResultEvent
				evt.addCount = false
				evt.start()
			}
			if (!result.bool) {
				if (event.source.countGainableCards(event.target, "h"))
					event.target.gainPlayerCard('h', event.source, true).set("target", event.source).set("complexSelect", false).set("ai", button => {
						let val = get.buttonValue(button);
						if (get.event("att") > 0) return 1 - val;
						return val;
					}).set("att", get.attitude(event.target, event.source));
				// event.target
				// 	.choosePlayerCard(get.prompt("ybsl_rongjie", event.source),true, event.source,"he")
				// 	.set("ai", button => {
				// 		let val = get.buttonValue(button);
				// 		if (get.event("att") > 0) return 1 - val;
				// 		return val;
				// 	})
				// 	.set("att", get.attitude(event.target,  event.source));
			}
			else event.list2.push(event.source);
			'step 4'
			event.count++;
			'step 5'
			if (event.count < 2) event.goto(1);
			else {
				if (event.list2.length >= 2)
					trigger.getParent().excluded.add(trigger.target);
			}
		}
	},
	ybsl_xiangcha: {
		audio: 'mbzhuji',
		logAudio(event,player){
			if (player.storage['ybsl_xiangcha'] == true) {
				return ['mbzhuji2.mp3'];
			}
			return ['mbzhuji1.mp3'];
		},
		usable: 1,
		enable: 'phaseUse',
		zhuanhuanji: true,
		mark: true,
		marktext: '☯',
		// init(skill){
		// 	// player.storage[skill]=true;
		// },
		intro: {
			content: function (storage, player, skill) {
				if (player.storage[skill] == true) {
					return '转换技，出牌阶段限一次，<span class="bluetext">阳：你可以将一张红色牌当【洞烛先机】使用</span>；阴，你可以将一张黑色牌当【知己知彼】。若因此观看到了与本次使用牌相同颜色的牌，你可以展示之，令你本回合下次造成的伤害+1。';
				}
				return '转换技，出牌阶段限一次，阳：你可以将一张红色牌当【洞烛先机】使用；<span class="bluetext">阴，你可以将一张黑色牌当【知己知彼】</span>。若因此观看到了与本次使用牌相同颜色的牌，你可以展示之，令你本回合下次造成的伤害+1。';
			},
		},
		viewAs(cards, player) {
			var storage = player.storage.ybsl_xiangcha;
			var name = storage == true ? "dongzhuxianji" : "ybsl_zhijizhibi";
			return { name: name, ybsl_xiangcha: true };
		},
		check(card) {
			var player = _status.event.player;
			var storage = player.storage.ybsl_xiangcha;
			var name = storage == true ? "dongzhuxianji" : "ybsl_zhijizhibi";
			return (get.value({ name: name }, player) + 6 - get.value(card)) * 2;
		},
		position: "hes",
		filterCard(card, player) {
			var storage = player.storage.ybsl_xiangcha;
			return get.color(card) == (storage == true ? "red" : "black");
		},
		prompt() {
			var storage = _status.event.player.storage.ybsl_xiangcha;
			if (storage == true) return "将一张红色牌当【洞烛先机】使用";
			return "将一张黑色牌当【知己知彼】使用";
		},
		precontent() {
			"step 0";
			var skill = "ybsl_xiangcha";
			// player.logSkill(skill);
			player.changeZhuanhuanji(skill);
			// player.awakenSkill(skill, true);
			// delete event.result.skill;
		},
		group: 'ybsl_xiangcha_watch',
		subSkill: {
			watch: {
				audio: 'ybsl_xiangcha',
				trigger: {
					player: ['chooseToGuanxingAfter', 'chooseControlAfter'],
				},
				logAudio(event,player,name){
					// if (name == 'chooseToGuanxingAfter') {
					// 	return 2;
					// }
					// return ['mbzhuji3.mp3', 'mbzhuji4.mp3'];
					return ['mbzhuji3.mp3']
				},
				filter(event, player, name) {
					// if(event.card)game.log('eevent.card:',event.card)
					// game.log('event.getParent():',event.getParent())
					// game.log('event.getParent(1):',event.getParent(1))
					// if(event.getParent(1).name)game.log('event.getParent(1).name:',event.getParent(1).name)
					// if(event.getParent(1).card)game.log('event.getParent(1).card:',event.getParent(1).card)
					// if(event.getParent(1).card.ybsl_xiangcha)game.log('event.getParent(1).card.ybsl_xiangcha:',event.getParent(1).card.ybsl_xiangcha)
					// game.log('event.getParent(2):',event.getParent(2))
					// game.log('event.getParent(3):',event.getParent(3))
					// game.log('event.getParent(4):',event.getParent(4))
					if (event.getParent(1).card && event.getParent(1).card.ybsl_xiangcha) {
						return true;
					}
					return false;
					// if(name=='chooseToGuanxingAfter'){
					// 	// if(event.getParent(1).card)var card = event.getParent(1).card;
					// }
				},
				async cost(event, trigger, player) {
					// var cards=[];
					if (event.triggername == 'chooseToGuanxingAfter') {
						// var cards=[];
						var cards1 = trigger.result.moved[0];
						var cards2 = trigger.result.moved[1];
						var cards = cards1.concat(cards2);
						// cards.concat(cards2);
						// game.log(cards)
						// if(trigger.result.moved[0])cards.push(trigger.result.moved[0]);
						// if(trigger.result.moved[1])cards.push(trigger.result.moved[1]);
					}
					else {
						if (trigger.dialog) var dialog = trigger.dialog;
						if (dialog) {
							var cardsxx = dialog.buttons;
							var cards = [];
							for (var j of cardsxx) {
								cards.push(j.link);
							}
							// console.log(cards)
							// var list =[];
							// // game.log(cards.textContent)
							// for(var i in cards){
							// 	if(cards[i]&&typeof cards[i]!='function'){
							// 		list.push(i);
							// 		list.push(':');
							// 		list.push(cards[i]);
							// 	}
							// }
							// game.log(list)
							// game.log(cards.buttons)
							// var cards2=cards.buttons;
							// for(var z of cards2){
							// 	game.log(z.link);
							// 	console.log(z.link);
							// }
							// game.log(Array.from(cards.buttons))
							// console.log(list666)
							// game.log(list666)
							// var kk=cards.view;
							// var list2=[];
							// for(var k in kk){
							// 	list2.push(k);
							// 	list2.push(':');
							// 	list2.push(kk[k]);

							// }
						}
					}
					if (cards) {
						const {
							result: { bool, links },
						} = await player.chooseButton(['详查：请选择欲展示之牌', cards], [1, cards.length]).set('ai', function (button) {
							return true;
						}).set('filterButton', function (button) {
							var card = trigger.getParent(1).card;
							return get.color(button.link) == get.color(card);
						});
						event.result = {
							bool: bool,
							cost_data: links,
						};
					}
					// player.chooseControl('ok').set('dialog',cards);
					// player.showCards(cards)
				},
				content() {
					player.showCards(event.cost_data);
					player.YB_tempx('ybsl_xiangcha_damage', event.cost_data.length);
				}
			},
			damage: {
				audio: 'ybsl_xiangcha',
				logAudio(event,player,name){
					// if (name == 'chooseToGuanxingAfter') {
					// 	return 2;
					// }
					// return ['mbzhuji3.mp3', 'mbzhuji4.mp3'];
					return ['mbzhuji4.mp3']
				},
				onremove: true,
				charlotte: true,
				forced: true,
				mark: true,
				intro: {
					content: '本回合下次伤害+$',
				},
				trigger: {
					source: 'damageBegin1',
				},
				filter: (event, player) => player.countMark('ybsl_xiangcha_damage') > 0,
				content() {
					const num = player.countMark('ybsl_xiangcha_damage');
					player.removeMark('ybsl_xiangcha_damage', num);
					trigger.num += num;
				},
			}
		},
	},
	// ybsl_rongjie:'戎戒',
	// ybsl_rongjie_info:'每回合限一次，当你使用伤害牌指定其他角色为唯一目标或成为其他角色使用伤害牌的目标时，你可以令你和对方依次选择发动一个出牌阶段限一次的主动技能（不计入发动次数），不如此做（或无法如此做）者令对方获得自己一张手牌。若双方均如此做，此牌对目标无效。',
	// ybsl_xiangcha:'详查',
	// ybsl_xiangcha_info:'转换技，出牌阶段限一次，阳：你可以将一张红色牌当【洞烛先机】使用；阴，你可以将一张黑色牌当【知己知彼】。若因此观看到了与本次使用牌相同颜色的牌，你可以展示之，令你本回合下次造成的伤害+1。',


	ybsl_xijian:{
		audio:'ext:夜白神略/audio/character:2',
		unique:true,
		mark:true,
		skillAnimation:true,
		limited:true,
		animationColor:'water',
		init:function(player){
			player.storage.ybsl_xijian=false;
		},
		trigger:{
			global:['dyingAfter'],
		},
		filter(event,player){
			return event.player.isIn()&&event.player.hp>0;
		},
		async content(event,trigger,player){
			player.awakenSkill('ybsl_xijian');
			player.storage.ybsl_xijian=true;
			await trigger.player.loseHp(trigger.player.hp);			
		},
	},
	ybsl_shilu:{
		audio: 'ext:夜白神略/audio/character:2',
		// inherit:'olshilu',
	},
	ybsl_qingguo:{
		audio: 'ext:夜白神略/audio/character:2',
		// inherit:'reqingguo',
	},
	ybsl_yedun:{
		derivation:['olshilu'],
		audio: 'ext:夜白神略/audio/character:2',
		// forecd:true,
		locked:true,
		init(player){
			if(!player.storage.ybsl_yedun)player.storage.ybsl_yedun=[];
		},
		trigger: { player: "damageEnd" },
		filter(event,player){
			return player.getHistory("damage").indexOf(event) == 0;
		},
		async cost(event,trigger,player){
			if(!player.storage.ybsl_yedun)player.storage.ybsl_yedun=[];
			if(game.countPlayer(c=>!player.storage.ybsl_yedun.includes(c)&&player!=c)>0){
				event.result = await player.chooseTarget(true).set('prompt2',get.prompt2('ybsl_yedun')).set('filterTarget',function(event,player,target){
					return !player.storage.ybsl_yedun.includes(target)&&player!=target;
				}).forResult();
			}
		},
		async content(event,trigger,player){
			var target=event.targets[0];
			if(!player.storage.ybsl_yedun)player.storage.ybsl_yedun=[];
			await player.storage.ybsl_yedun.push(target);
			var list = ['令你摸三张牌，然后你本回合不能成为黑色牌目标','令你失去1点体力，然后你本局游戏获得〖失路〗'];
			event.result2 = await target.chooseControl().set('choiceList',list).set('ai',function(){
				var att = get.attitude(_status.event.player,player);
				if(att>0&&player.hp<3)return 0;
				return 1;
			}).forResult();
			if(event.result2.index){
				if(event.result2.index==0){
					await player.draw(3);
					await player.addTempSkill('ybsl_yedun_weimu');
				}
				else{
					await player.loseHp();
					await player.addSkill('olshilu');
				}
			}
		},
		subSkill:{
			weimu:{
				trigger: { global: "useCard1" },
				audio: 'ybsl_yedun',
				forced: true,
				firstDo: true,
				filter(event, player) {
					if (event.player == player) return false;
					if (get.color(event.card) != "black" ) return false;
					var info = lib.card[event.card.name];
					return info && info.selectTarget && info.selectTarget == -1 && !info.toself;
				},
				async content() {},
				mod: {
					targetEnabled(card) {
						if (get.color(card) == "black") return false;
					},
				},
				mark:true,
				marktext:'遁',
				intro:{
					content:'本回合不能成为黑色牌目标',
				},
			}
		}
	},
	ybsl_yedunx:{
		audio: 'ybsl_yedun',
		derivation:['olshilu'],
		// forecd:true,
		locked:true,
		init(player){
			if(!player.storage.ybsl_yedunx)player.storage.ybsl_yedunx=[];
		},
		trigger: { player: "damageEnd" },
		filter(event,player){
			return player.getHistory("damage").indexOf(event) == 0;
		},
		async cost(event,trigger,player){
			if(!player.storage.ybsl_yedunx)player.storage.ybsl_yedunx=[];
			if(game.countPlayer(c=>!player.storage.ybsl_yedunx.includes(c)&&player!=c)>0){
				event.result = await player.chooseTarget(true).set('prompt2',get.prompt2('ybsl_yedunx')).set('filterTarget',function(event,player,target){
					return !player.storage.ybsl_yedunx.includes(target)&&player!=target;
				}).forResult();
			}
		},
		async content(event,trigger,player){
			var target=event.targets[0];
			if(!player.storage.ybsl_yedunx)player.storage.ybsl_yedunx=[];
			await player.storage.ybsl_yedunx.push(target);
			var list = ['令你摸三张牌，然后你本回合不能成为黑色牌目标','令你失去1点体力，然后你本局游戏获得〖失路〗（可以获得多个）'];
			event.result2 = await target.chooseControl().set('choiceList',list).set('ai',function(){
				var att = get.attitude(_status.event.player,player);
				if(att>0&&player.hp<3)return 0;
				return 1;
			}).forResult();
			if(event.result2.index){
				if(event.result2.index==0){
					await player.draw(3);
					await player.addTempSkill('ybsl_yedunx_weimu');
				}
				else{
					await player.loseHp();
					// if(!lib.skill.ybsl_shilu.subSkill)lib.skill.ybsl_shilu.subSkill={}
					lib.skill['ybsl_shilu_'+target.playerid]=lib.skill.olshilu;
					lib.translate['ybsl_shilu_'+target.playerid]=lib.translate.olshilu;
					lib.translate['ybsl_shilu_'+target.playerid+'_info']=lib.translate.olshilu_info;
					await player.addSkill('ybsl_shilu_'+target.playerid);
				}
			}
		},
		subSkill:{
			weimu:{
				trigger: { global: "useCard1" },
				audio: 'ybsl_yedun',
				forced: true,
				firstDo: true,
				filter(event, player) {
					if (event.player == player) return false;
					if (get.color(event.card) != "black" ) return false;
					var info = lib.card[event.card.name];
					return info && info.selectTarget && info.selectTarget == -1 && !info.toself;
				},
				async content() {},
				mod: {
					targetEnabled(card) {
						if (get.color(card) == "black") return false;
					},
				},
				mark:true,
				marktext:'遁',
				intro:{
					content:'本回合不能成为黑色牌目标',
				},
			}
		}
	},
	ybsl_shilu:{
		audio: 'ext:夜白神略/audio/character:2',
		subSkill:{

		},
	},

	
	// ybsl_xijian:'悉谏',
	// ybsl_xijian_info:'限定技，当有角色脱离濒死状态时，你可令该角色失去全部体力。',
	// ybsl_yedun:'夜遁',
	// ybsl_yedun_info:'锁定技，当你每回合首次受到伤害后，你需选择一名其他角色（不能是本局游戏以此法选择过的角色），其需选择：①令你摸3张牌，然后你本回合不能成为黑色牌目标；②令你失去1点体力，然后你本局游戏获得【失路】。',
	// ybsl_yedunx:'夜遁',
	// ybsl_yedunx_info:'锁定技，当你每回合首次受到伤害后，你需选择一名其他角色（不能是本局游戏以此法选择过的角色），其需选择：①令你摸3张牌，然后你本回合不能成为黑色牌目标；②令你失去1点体力，然后你本局游戏获得【失路】。',
	// ybsl_shilu:'失路',
	// ybsl_shilu_info:'锁定技。当你受到伤害后，你摸X张牌（X为你的体力值且至多为5）。然后你展示攻击范围内一名角色的一张手牌并令此牌视为无属性【杀】。',
	// ybsl_qingguo:'倾国',
	// ybsl_qingguo_info:'你可以将一张黑色牌当做【闪】使用或打出。',
	
	//蒋子文
	ybsl_fengci:{
		audio: 'ext:夜白神略/audio/character:2',
		marktext:'祭',
		intro:{
			name:'贡品',
			content:'expansion',
		},
		subSkill:{
			draw:{
				audio: 'ybsl_fengci',
				trigger:{
					player:'phaseDrawBegin',
				},
				async cost(event,trigger,player){
					event.result={bool:false}
					var cards = player.getExpansions('ybsl_fengci');
					if(cards&&cards.length>0){
						event.result = await player.chooseCardButton(cards,[1,cards.length]).set('filterButton',function(button){
							var cardsy=ui.selected.buttons;
							var cardst=[];
							if(cardsy){
								for(var i of cardsy){
									cardst.push(i.link);
								}
							}
							if(cardst)return !get.YB_suit(cardst,'suit').includes(get.suit(button.link)); 
							return true;
						}).forResult();
					}
					event.result.cards = event.result.links;
				},
				content(){
					player.discard(event.cards);
					trigger.num+=event.cards.length;
				}
			}
		},
	},
	ybsl_fengcix:{
		audio: 'ybsl_fengci',
		forced:true,
		trigger:{
			global:'loseAfter',
		},
		filter:function(event,player){
			if(event.type!='discard'||event.getlx===false) return false;
			var cards=event.cards.slice(0);
			var evt=event.getl(player);
			if (evt && evt.cards) cards.removeArray(evt.cards);
			for (var i = 0; i < cards.length; i++) {
				if (get.position(cards[i], true) == "d") {
					return event.player== _status.currentPhase;;
				}
			}
			return false;
		},
		*content(event,map){
			let trigger=map.trigger,player=map.player;
			var cards = [],
				cards2 = trigger.cards.slice(0),
				evt = trigger.getl(player);
			if (evt && evt.cards) cards2.removeArray(evt.cards);
			for (var i = 0; i < cards2.length; i++) {
				if (get.position(cards2[i], true) == "d") {
					cards.push(cards2[i]);
				}
			}
			let result={bool:false};
			if(cards.length) result = yield trigger.player.chooseBool('是：将本次弃置的牌置于'+get.translation(player)+'武将牌上称为“祭”<br>否：令你本回合下次摸的牌明置且视为【毒】').set('ai',function(){return true}).forResult();
			if(result.bool==true||result==true){
				yield player.addToExpansion(cards,player,'gain').gaintag.add("ybsl_fengci");
			}
			else{
				yield trigger.player.addTempSkill('ybsl_fengcix_du');
			}
		},
		group:'ybsl_fengci_draw',
		subSkill:{
			du:{
				forced:true,
				audio:'ybsl_fengcix',
				trigger:{
					// player:'drawEnd',
					player:'drawBegin',
				},
				filter(event,player){
					return event.num>0;
				},
				firstDo:true,
				content(){
					'step 0'
					player.addTempSkill('ybsl_fengcix_dux');
					// player.addShownCards(cards, "ybsl_fengcix_dux");
					trigger.visible=true;
					trigger.gaintag.add('ybsl_fengcix');
					player.when('drawEnd').then(function(){
						if(trigger.gaintag&&trigger.gaintag.includes('ybsl_fengcix')){

							var cards=trigger.result;
							for(var i of cards){
								i.YB_cardname('du','ybsl_fengcix');
							}
						}
					})
					'step 1'
					player.removeSkill('ybsl_fengcix_du');
				}
			},
			dux:{
				forced:true,
				// mod:{
				// 	cardname(card, player) {
				// 		if (card.hasGaintag("ybsl_fengcix")) return 'du';
				// 	},
				// },
				onremove(player){
					player.removeGaintag("ybsl_fengcix");
				}
			}
		}
	},
	ybsl_youxiang:{
		audio: 'ext:夜白神略/audio/character:2',
	},
	ybsl_youxiangx:{
		audio: 'ybsl_youxiang',
		forced:true,
		global:'ybsl_youxiangx_bann',
		getLastUsed(player, event) {
			var history = player.getAllHistory("useCard");
			var index;
			if (event) {
				index = history.indexOf(event) - 1;
			} else {
				index = history.length - 1;
			}
			if (index >= 0) {
				return history[index];
			}
			return false;
		},
		subSkill:{
			bann:{
				audio: 'ybsl_youxiang',
				charlotte:true,
				mod:{
					cardEnabled(card,player) {
						var evt = lib.skill.ybsl_youxiangx.getLastUsed(player);
						if (evt && evt.card&&get.type2(evt.card)&&get.type2(evt.card)==get.type2(card)){
							if(!player.hasSkill('ybsl_youxiangx'))return false;
						}
					},
				}
			}
		},
		trigger:{
			player:'useCard',
		},
		filter(event, player) {
			var evt = lib.skill.ybsl_youxiangx.getLastUsed(player, event);
			if (!evt || !evt.card) {
				return false;
			}
			return (get.type2(evt.card)&&get.type2(evt.card) != get.type2(event.card));
		},
		content(){
			player.draw();
		}
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * 索靖
	 */
	ybsl_feimo:{
		trigger: { player: "useCard" },
		frequent: true,
		filter(event) {
			return get.suit(event.card) == "club" && event.card.isCard;
		},
		content() {
			player.draw();
		},
		ai: {
			threaten: 1.4,
		},
	},
	ybsl_benzhan:{
		zhuanhuanji:true,
		mark:true,
		marktext:'☯',
		init(player, skill) {
			player.storage[skill]=true
		},
		intro:{
			// content:function(storage,player,skill){
			// 	if (player.storage.ybsl_benzhan==true){
			// 		return '转换技，<span class="bluetext">阳：你可以将一张【杀】当伤害锦囊牌使用，或将一张【闪】当非伤害锦囊牌使用；</span>阴：你可以将一张伤害锦囊牌当【杀】使用，或将一张非伤害锦囊牌当【闪】使用。每回合限X次，当你使用此技能时，此技能不转换，X为你已损体力值。';
			// 	}
			// 	return '转换技，阳：你可以将一张【杀】当伤害锦囊牌使用，或将一张【闪】当非伤害锦囊牌使用；<span class="bluetext">阴：你可以将一张伤害锦囊牌当【杀】使用，或将一张非伤害锦囊牌当【闪】使用。</span>每回合限X次，当你使用此技能时，此技能不转换，X为你已损体力值。';
			// },
			markcount: (storage,player) => {
				var num = player.storage.ybsl_benzhan_used||0;
				var numb = player.getDamagedHp();
				if(num>=numb) return '<span class=\'firetext\'>'+num+'/'+numb+'</span>';
				return num+'/'+numb;
			},
			content:function(storage,player,skill){
				if (player.storage.ybsl_benzhan==true){
					return '转换技，<span class="bluetext">阳：你可以将一张【杀】当伤害锦囊牌使用，或将一张伤害锦囊牌当【杀】使用；</span>阴：你可以将一张【闪】当非伤害锦囊牌使用，或将一张非伤害锦囊牌当【闪】使用。每回合限X次，当你使用此技能时，此技能不转换，X为你已损体力值。';
				}
				return '转换技，阳：你可以将一张【杀】当伤害锦囊牌使用，或将一张伤害锦囊牌当【杀】使用；<span class="bluetext">阴：你可以将一张【闪】当非伤害锦囊牌使用，或将一张非伤害锦囊牌当【闪】使用。</span>每回合限X次，当你使用此技能时，此技能不转换，X为你已损体力值。';
			},
		},
		audio:'ext:夜白神略/audio/character:2',
		enable:'chooseToUse',
		hiddenCard:function(player,name){
			var type=get.type2(name);
			if(player.storage.ybsl_benzhan) return (type=='trick'&&get.tag(name,'damage')>0.5)||name=='sha';
			return (type=='trick'&&(!get.tag({name},'damage') || get.tag({name},'damage')<0.5))||name=='shan';
		},
		filter:function(event,player){
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;

			for(var name of lib.inpile){
				console.log(name);
				if(player.storage.ybsl_benzhan){
					if(((get.type2(name)=='trick'&&get.tag({name},'damage')>0.5)||name=='sha')&&evt(get.autoViewAs({ name }, 'unsure'),player,event)) return true;
				}
				else if (((get.type2(name)=='trick'&&(!get.tag({name},'damage') || get.tag({name},'damage')<0.5))||name=='shan')&&evt(get.autoViewAs({ name }, 'unsure'),player,event)) return true;
			}
			return false;
		},
		chooseButton:{
			dialog:function(event,player){
				var list=[];
				for(var name of lib.inpile){
					if(player.storage.ybsl_benzhan){
						if((get.type2(name)=='trick'&&get.tag({name},'damage')>0.5)||name=='sha') list.push([get.type(name),'',name]);
					}
					else if((get.type2(name)=='trick'&&(!get.tag({name},'damage') || get.tag({name},'damage')<0.5))||name=='shan') list.push([get.type(name),'',name]);
				}
				return ui.create.dialog('奔战',[list, 'vcard']);
			},
			check:function(button){
				return 1;
			},
			filter:function (button,player){
				return _status.event.getParent().filterCard(get.autoViewAs({ name:button.link[2] }, 'unsure'),player,_status.event.getParent());
			},
			backup:function(links,player){
				return {
					audio: 'ybsl_benzhan',
					filterCard:function(card){
						if(player.storage.ybsl_benzhan){
							if(links[0][2]=='sha') return get.type2(card)=='trick'&&get.tag(card,'damage');
							return get.name(card)=='sha';
						}
						else {
							if(links[0][2]=='shan') return get.type2(card)=='trick'&&!get.tag(card,'damage');
							return get.name(card)=='shan';
						}
						
					},
					selectCard:1,
					viewAs:{name:links[0][2]},
					position:'hes',
					precontent() {
						player.addTempSkill('ybsl_benzhan_used','phaseAfter');
						if(!player.storage.ybsl_benzhan_used) player.storage.ybsl_benzhan_used=0;
						if(player.storage.ybsl_benzhan_used<player.getDamagedHp()) player.storage.ybsl_benzhan_used++;
						else player.changeZhuanhuanji('ybsl_benzhan');
					},
					prompt:'选择一张牌当【'+get.translation(links[0][2])+'】使用',
				};
			},
		},
		//先不写了，类，懒，笔走龙蛇还没审稿呢
		//军师中郎将画饼了，说抽空要给讲讲，先摆在这
		ai:{
			respondSha:true,
			respondShan:true,
			skillTagFilter:function(player,tag,arg){
				if(arg=='respond') return false;
			},
			order:1,
			result:{
				player:1,
			},
		},
		subSkill:{
			//这里改名是为了中流
			used:{
				init(player) {
					player.storage.ybsl_benzhan_num=0;
				},
				onremove : true,
				charlotte:true,
			},
		}
	},
	/**
	 * 王裒
	 */
	ybsl_zhelei:{
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			global:['phaseJudgeBefore','damageBefore'],
		},
		filter(event,player){
			if(player.isLinked()||event.player.isLinked())return false;
			return true;
		},
		async content(event,trigger,player){
			await player.link(true);
			if(player!=trigger.player)await trigger.player.link(true);
			trigger.cancel();
		},
		check(event, player,name){
			var att=get.attitude(player,event.player);
			if(att>5){
				if(name=='phaseJudgeBefore')return event.player.countCards('j')>0;
				return true;
			}
			return false;
		}
	},
	ybsl_xunxiao:{
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			global:'damageBegin1',
		},
		filter(event,player){
			return player.isLinked()&&event.source?.isIn();
		},
		async content(event,trigger,player){
			trigger.nature='fire';
			// game.YB_addNature(trigger, "fire");
		},
	},
	ybsl_wanbie:{
		audio: 'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		selectCard(){
			var player=_status.event.player;
			if(player.isLinked())return [0,1];
			else return 1;
		},
		filterCard:true,
		position:'he',
		selectTarget:1,
		filterTarget(card,player,target){
			return player!=target&&(target.isLinked()||target.countDiscardableCards(target,'he'));
		},
		async content(event,trigger,player){
			const target = event.target;
			if(event.cards.length<=0)player.link(false);
			var bool = target.isLinked()?false:true;
			var str = '请弃置一张牌'+(target.isLinked()?'，或点取消解除横置':'')+'，然后'+get.translation(player)+'与你各摸一张牌。';
			var result = await target.chooseToDiscard('he',1,bool,str).forResult();
			if(!result.bool){
				await target.link(false);
			}
			await game.asyncDraw([player,target].sortBySeat(player));
		},
		ai:{
			result:{
				player:2,
				target:1,
			}
		}
		// filterCard:
	},
	ybsl_oldwanbie:{
		audio: 'ybsl_wanbie',
		trigger:{
			player:'phaseDrawBegin2',
		},
		filter(event,player){
			return game.countPlayer(c=>c.isLinked())>0;
		},
		async content(event,trigger,player){
			var num = game.countPlayer(c=>c.isLinked());
			trigger.num+=num;
			player.addSkill("ybsl_oldwanbie_2");

		},
		subSkill:{
			2:{
				forced: true,
				popup: false,
				audio: false,
				sourceSkill: "ybsl_oldwanbie",
				trigger: { player: "phaseDrawEnd" },
				async content(event, trigger, player) {
					player.removeSkill("ybsl_oldwanbie_2");
					if (player.countCards("he") <= 0) {
						return;
					}
					//这个函数没写好，以后重写
					await player.YB_liangying(true,player.getCards('he'),game.countPlayer(c=>c.isLinked()))
					// const { result } = await player.chooseCardTarget({
					// 	selectCard: Math.floor(player.countCards("h") / 2),
					// 	filterTarget(card, player, target) {
					// 		return target.isMinHandcard();
					// 	},
					// 	prompt: "将一半的手牌交给场上手牌数最少的一名角色",
					// 	forced: true,
					// 	ai2(target) {
					// 		return get.attitude(_status.event.player, target);
					// 	},
					// });
					// if (result.targets && result.targets[0]) {
					// 	await player.give(result.cards, result.targets[0]);
					// }
				},
			}
		}
	},//这个技能没写好

	/**
	 * 羊续
	 */
	ybsl_kanxiao:{
		audio: 'ext:夜白神略/audio/character:2',
		chargeSkill: 3,
		trigger:{
			player:['damageAfter','loseHpAfter','loseEnd'],
		},
		filter(event, player,name) {
			if(name=='loseEnd')return player.countCharge()>0&&player.isDamaged();
			else return player.countCharge() > 0;
		},
		init(player){
			if(!player.storage.ybsl_kanxiao)player.storage.ybsl_kanxiao=0;
		},
		usable(skill,player){
			var num = player.getStorage("ybsl_kanxiao");
			return player.storage.ybsl_kanxiao+1;
		},
		content(){
			'step 0'
			player.removeCharge();
			if(event.triggername=='loseEnd'){
				player.recover();
			}
			else {
				player.draw(2);
			}
		},
		group: [/*"ybsl_kanxiao_damage",*/ "ybsl_kanxiao_init"],
		subSkill: {
			// damage: {
			// 	trigger: { player: "damageEnd" },
			// 	direct: true,
			// 	content() {
			// 		"step 0";
			// 		if (player.countCharge(true)) {
			// 			player.logSkill("sbyaoming_damage");
			// 			player.addCharge(trigger.num);
			// 			game.delayx();
			// 		}
			// 		"step 1";
			// 		player.chooseTarget(get.prompt("sbyaoming"), lib.skill.sbyaoming.prompt()).set("ai", function (target) {
			// 			var player = _status.event.player;
			// 			return get.effect(target, "sbyaoming", player, player);
			// 		});
			// 		"step 2";
			// 		if (result.bool) {
			// 			player.useSkill("sbyaoming", result.targets);
			// 		}
			// 	},
			// },
			init: {
				audio: "ybsl_kanxiao",
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				forced: true,
				locked: false,
				filter(event, player) {
					return (event.name != "phase" || game.phaseNumber == 0) && player.countCharge(true);
				},
				content() {
					player.addCharge(1);
				},
			},
		},
	},
	ybsl_shipin:{
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			target:'useCardToTargeted',
			player:'useCard',
		},
		usable(skill,player){
			var num = player.getStorage("ybsl_shipin");
			return player.storage.ybsl_shipin+1;
		},
		init(player){
			if(!player.storage.ybsl_shipin)player.storage.ybsl_shipin=0;
		},
		filter(event, player,name){
			if(name=='useCard'){
				return (!event.targets.length||!event.targets.includes(player))&&player.countCards('h')<=1;
			}
			return player.countCards('h')<=1;
		},
		async content(event, trigger, player){
			hs = player.getCards()
			if (hs.length) await player.showCards(hs)
			await player.addCharge()
			if (hs.length == 1 && get.type2(hs[0]) != 'trick') {
				await player.discard(hs)
				var list = []
				if (player.getStorage("ybsl_kanxiao") == 0) list.push("ybsl_kanxiao")
				if (player.getStorage('ybsl_shipin') == 0) list.push('ybsl_shipin')
				if (!list.length) return
				const {result} = await player.chooseControl(list)
				if (result.control) {
					player.storage[result.control]++
					game.log(player,'修改了'+result.control+'的技能效果')
				}
			}
		}
	},
	//----------石崇
	ybsl_shehao:{
		audio: 'ext:夜白神略/audio/character:2',
		zhuanhuanji:true,
		mark:true,
		marktext:'☯',
		intro:{
			content:function(storage,player){
				if (player.storage.ybsl_shehao==true){
					return '转换技，当你使用非虚拟或转化的非装备牌后，你需选择是否：阳：将此牌置入装备区一个空栏；<span class="bluetext">阴：选择装备区一张同类型的牌，然后弃置之并摸X张牌或将之当作触发此技能的牌使用（X为弃置的牌与触发技能使用的牌[花色，点数，牌名字数]相同的项数），以此法使用的牌不计入次数且无次数限制。</span><br>此技能选是不转，选否才转。'
				}
				else {
					return '转换技，当你使用非虚拟或转化的非装备牌后，你需选择是否：<span class="bluetext">阳：将此牌置入装备区一个空栏；</span>阴：选择装备区一张同类型的牌，然后弃置之并摸X张牌或将之当作触发此技能的牌使用（X为弃置的牌与触发技能使用的牌[花色，点数，牌名字数]相同的项数），以此法使用的牌不计入次数且无次数限制。<br>此技能选是不转，选否才转。'
				}
			}
		},
		forced:true,
		locked:false,
		trigger:{
			player:'useCardAfter',
		},
		filter(event,player){
			if(event.card&&event.card.isCard&&event.cards&&event.cards[0]&&get.type2(event.card)!='equip'){
				// if(!player.storage.ybsl_shehao){
				// 	for (var i = 1; i < 6; i++) {
				// 		if (player.hasEmptySlot(i)) {
				// 			return true;
				// 		}
				// 	}
				// 	return false;
				// }
				// else {
				// 	return player.getCards('e',function(card){
				// 		return get.type2(card)!='equip';
				// 	})
				// }
				return true;
			}
			return false;
			
		},
		*content(event,map){
			let trigger=map.trigger,player=map.player;
			if(!player.storage.ybsl_shehao){
				var list = [];
				const sub = ['武器', '防具', '防马', '攻马', '宝物'];
				for (var i = 1; i < 6; i++) {
					if (player.hasEmptySlot(i)) {
						list.push(sub[i - 1]);
					}
				}
				var dialog = ui.create.dialog('奢豪');
				dialog.addText('请选择置入一个装备栏');
				dialog.add([sub,'tdnodes'])
				var result = yield player.chooseButton(dialog,1).set('filterButton',function(button){
					return list.includes(button.link);
				}).set('filterOk',function(buttons){
					var player = _status.event.player;
					var trigger = _status.event.getTrigger();
					return ui.selected.buttons[0]&&trigger.cards&&get.position(trigger.cards[0], true) == "o"
				});
				if(result.bool){
					var type = null;
					var links=result.links;
					type = sub.includes(links[0])?'equip'.concat(sub.indexOf(links[0])+1):null;
					if(type != null){
						const card = get.autoViewAs(trigger.cards[0]);
						card.subtypes = [type];
						yield player.equip(card);
					}
					event.finish();
				}
				else {
					yield player.changeZhuanhuanji('ybsl_shehao');
					event.finish();
				}
			}
			else {
				var cards = player.getCards('e');
				var listx = ['摸牌','转化'];
				var dialog = ui.create.dialog('奢豪');
				dialog.addText('请选择一个卡牌和效果');
				if(cards.length){
					dialog.add(cards);
					dialog.add([listx,'tdnodes']);
				}
				var result = yield player.chooseButtonTarget({
					createDialog:dialog,
					filterButton(button){
						var type=typeof button.link;
						if(ui.selected.buttons.length&&type==typeof ui.selected.buttons[0].link) return false;
						var trigger = _status.event.getParent().getTrigger();
						if(type!='string') {
							if (ui.selected.buttons[0]?.link == '转化' && !lib.filter.filterCard(get.autoViewAs(trigger.card, button.link), player, get.event())) return false
							return get.type2(trigger.card)==get.type2(button.link)
						}
						if (ui.selected.buttons.length&&button.link == '转化') return lib.filter.filterCard(get.autoViewAs(trigger.card, ui.selected.buttons[0].link), player, get.event())
						return true
					},
					selectButton:2,
					selectTarget() {
						const buttons = ui.selected.buttons;
						var aaa = [];
						buttons.forEach(button=>{
							if(typeof button==='object'){
								aaa.unshift(button);
							}
							else if(typeof button==='string'){
								aaa.push(button);
							};
						})
						var trigger = _status.event.getParent().getTrigger();
						if (aaa[0] == '摸牌') return 0
						return lib.filter.selectTarget(get.autoViewAs(trigger.card, aaa[0]), get.player())
					},
					filterTarget:function(card,player,target){
						const buttons = ui.selected.buttons;
						var aaa = [];
						buttons.forEach(button=>{
							if(typeof button==='object'){
								aaa.unshift(button);
							}
							else if(typeof button==='string'){
								aaa.push(button);
							};
						})
						if(aaa[1]=='摸牌'){
							return false;
						}
						else {
							var trigger = _status.event.getParent().getTrigger();
							var card = get.autoViewAs(trigger.card, aaa[0]);
							return lib.filter.filterTarget(card, player, target)
							// return lib.card[get.name(aaa[0])].filterTarget(card,player,target);
						}
						// return target!=player;
					},
					// filterOk() {
					// 	if (ui.selected.buttons.length) {
					// 		const link = ui.selected.buttons[0].link;
					// 		if (link == "discard") {
					// 			return ui.selected.targets.length == 1;
					// 		}
					// 		return true;
					// 	}
					// 	return false;
					// },
				})
				if(result.bool&&result.links?.length){
					var aaa = [];
					result.links.forEach(button=>{
						if(typeof button==='object'){
							aaa.unshift(button);
						}
						else if(typeof button==='string'){
							aaa.push(button);
						};
					})
					if(aaa[1]=='摸牌'){
						var num = 0;
						if(get.suit(aaa[0])==get.suit(trigger.card))num++;
						if(get.number(aaa[0])==get.number(trigger.card))num++;
						if(get.cardNameLength(aaa[0])==get.cardNameLength(trigger.card))num++;
						yield player.discard(aaa[0]);
						yield player.draw(num);
					}
					else {
						var card = get.autoViewAs(trigger.card);
						if(!card) return;
						card.isCard = false
						var targets = result.targets;
						yield player.useCard(card, targets, [aaa[0]],false);
					}
					event.finish();
				}
				else {
					yield player.changeZhuanhuanji('ybsl_shehao');
					event.finish();
				}
			}
		}
	},
	ybsl_jugu:{
		audio: 'ext:夜白神略/audio/character:2',
	},
	ybsl_jiegu:{
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			global:'gameDrawBegin',
		},
		forced:true,
		filter(event,player){
			return true;
		},
		async content(event, trigger, player) {
			const me = player;
			const numx = trigger.num;
			trigger.num = function (player) {
				return player == me ? (typeof numx == "function" ? numx(player) : numx)+game.countPlayer(function(current){return current!=me}) : (typeof numx == "function" ? numx(player) : numx)-1;
			};
		},

	},
	ybsl_daixin:{
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			player:'useCard',
		},
		filter(event,player){
			if(event.card&&event.card.isCard&&event.cards&&event.cards[0]&&get.type2(event.card)!='equip'){
				return true;
			}
			return false;
		},
		getIndex(event,player){
			if(!player.storage.ybsl_daixin_used||player.storage.ybsl_daixin_used&&!player.storage.ybsl_daixin_used.includes(event.card.name)){
				return 1
			}
		},
		async cost(event,trigger,player){
			event.result = await player.chooseCard('是否发动代薪？','he').set('filterCard',function(card){
				return get.type2(card)=='equip';
			}).forResult();
			// event.result.cards = event.result.links;
		},
		async content(event,trigger,player){
			player.addTempSkill('ybsl_daixin_used'),
			player.storage.ybsl_daixin_used = player.storage.ybsl_daixin_used||[];
			player.storage.ybsl_daixin_used.push(trigger.card.name);
			var card = [];
			var subtype = null;
			card.push(event.cards[0]);
			if(player.getCards('e')&&player.getCards('e').includes(event.cards[0])){
				subtype = get.subtype(event.cards[0]);
			}
			var cardx = [];
			cardx.push(trigger.cards[0]);
			await player.lose(card,"visible",ui.ordering);
			trigger.cards=card;
			trigger.card.isCard=false;
			if(subtype!=null){
				const cardz = get.autoViewAs(cardx[0]);
				cardz.subtypes = [subtype];
				await player.equip(cardz);
			}
			else {
				await player.gain(cardx,'gain2');
			}
		},
		subSkill:{
			used:{
				onremove:true,
				mark:true,
				marktext:'薪',
				intro:{
					content:function(storage,player){
						var list =player.storage.ybsl_daixin_used||[];
						list = get.YB_suit(list,'translation');
						return '本回合已回收卡牌：'+list;
					}
				}
			}
		}
	},





	//宗族武将
	ybsl_clanqianlei: {//谦累
		clanSkill: true,
		trigger: {
			player: ['YB_anySkipped', 'YB_anyCancelled'],
			// target: "shaMiss",
			// global: "eventNeutralized",
		},
		forced: true,
		content() {
			'step 0'
			player.loseHp();
			'step 1'
			var list = get.YB_clan(player, true);
			if (list.length) player.chooseTarget(1, true, function (card, player, target) {
				return list.includes(target)
			}).set('prompt', '请选择一名同族角色，令其执行一个额外回合').set('ai', function (target) {
				if (list.includes(player)) return target == player;
				else {
					return get.attitude(player, target);
				}
			});
			'step 2'
			if (result.targets) {
				result.targets[0].insertPhase();
			}
			var evt = _status.event.getParent("phase");
			if (evt) {
				game.resetSkills();
				_status.event = evt;
				_status.event.finish();
				_status.event.untrigger(true);
				// console.log(ybnext)
			}
		}
	},
	// ybsl_clanqianlei:'谦累',
	// ybsl_clanqianlei_info:'宗族技，锁定技，你的阶段被跳过时，结束此回合并令一名同族角色执行一个额外回合；
	// 当你于一个你执行的阶段中使用的前X张牌被抵消后（X为同族角色数），你结束此阶段并执行一个相同的阶段。',
	ybsl_clanxingzu: {
		// audio:'ext:夜白神略/audio/character:2',
		clanSkill: true,
		trigger: {
			player: 'useCardAfter',
		},
		filter: function (event, player) {
			if (player.getStat("damage")) return false;
			var list = [];
			player.getHistory("useCard", function (evt) {
				if (evt != event) list.push(evt.card);
			});
			for (var i of list) {
				if (get.type2(i) == get.type2(event.card)) return false;
			}
			var list = get.YB_clan(player, true);
			var list2 = {};
			for (var k of list) {
				var skills = get.YB_pu1(k);
				// for(var yb of skills){
				// if(lib.skill[yb].filter&&lib.skill[yb].filter(event,k)!=true) skills.remove(yb);
				// }
				if (!skills.length) list.remove(k);
			}
			return list.length > 0;
		},
		// direct:true,
		async cost(event, trigger, player) {
			var list = get.YB_clan(player, true);
			var list2 = {};
			for (var k of list) {
				var skills = get.YB_pu1(k);
				// for(var yb of skills){
				// if(lib.skill[yb].filter&&lib.skill[yb].filter(event,k)!=true) skills.remove(yb);
				// }
				if (!skills.length) list.remove(k);
			}
			event.result = await player.chooseTarget(1, function (card, player, target) {
				return list.includes(target)
			}).set('prompt', '请选择一名同族角色，令其发动一个“出牌阶段限一次”的技能').set('ai', function (target) {
				if (list.includes(player)) return target == player;
				else {
					return get.attitude(player, target);
				}
			}).forResult();
		},
		// popup: false,
		content: function* (event, map) {
			let trigger = map.trigger,
				player = map.player;
			// event.targets=
			// let targets=(event.targets||targets);
			let targets = event.targets;
			var skillList = [];
			// player.logSkill('ybsl_clanxingzu');
			var list66 = get.YB_pu1(targets[0]);
			// for(var z of list66){
			// if(lib.skill[z].filter&&lib.skill[z].filter(event,targets[0])!=true) list66.remove(z);
			// }
			var skill = yield targets[0].YB_control(list66, 8, '请选择一个出限一技能发动');
			if (skill.control && skill.control != 'cancel2') {
				if (!targets[0].getStat('skill')[skill.control]) yield targets[0].getStat('skill')[skill.control] = 0;
				//yield targets[0].getStat('skill')[skill.control]--;
				// yield game.log('发动兴族时',targets[0].getStat('skill')[skill.control]);
				// game.log(get.translation(skill.control),targets[0].getStat('skill')[skill.control])
				var skillName = skill.control;
				//↓此段代码感谢霸天大佬的指导

				var ybnext = game.createEvent('YB_xingzu');
				ybnext.tar = targets[0];
				ybnext.skillname = skillName;
				ybnext.setContent(async function(event, trigger, player) {
					var next = event.tar.chooseToUse();
					next.set("openskilldialog", get.prompt(event.skillname));
					next.set("norestore", true);
					next.set("_backupevent", event.skillname);
					next.set("custom", {
						add: {},
						replace: {
							window: function () { }
						},
					});
					// next.set('addCount',false);
					next._triggered = null;
					next.backup(event.skillname);
					next.set('chooseonly', true)
					const result = await next.forResult()
					if (!result.bool) return
					//if (!result.bool) {
						//event.tar.getStat('skill')[event.skillname]++;
					//}
					const evt = result.cost_data.ResultEvent
					evt.addCount = false
					await evt.start()

				});
				yield ybnext;
				// if (!next.bool) {
				// 	yield targets[0].getStat('skill')[skill.control]++;
				// }
				// game.log(get.translation(skill.control),targets[0].getStat('skill')[skill.control])
				// if(targets[0].getStat('skill')[skill.control]&&targets[0].getStat('skill')[skill.control]>0)
				// yield targets[0].getStat('skill')[skill.control]--;
				// yield game.log('发动兴族后',targets[0].getStat('skill')[skill.control]);
				//↑此段代码感谢霸天大佬的指导
				// if(targets[0].getStat('skill')[skill.control]&&targets[0].getStat('skill')[skill.control]>0) yield targets[0].getStat('skill')[skill.control]--;
			}
		},
	},
	// ybsl_clanxingzu:'兴族',
	// ybsl_clanxingzu_info:'宗族技，当你每回合首次使用一种类型的牌后，若你本回合未造成伤害，你可以令一名同族角色发动一个出牌阶段限一次的技能（不计入次数）。',//可能些微调整
	ybsl_lxtujing: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: 'phaseUse',
		usable: 1,
		filterTarget: function (card, player, target) {
			return player != target && !target.isMinHandcard(); //此函数加true为全场唯一
		},
		selectTarget : [0, 1],
		filterOk() {
			game.filterPlayer(current => current.unprompt())
			const target = ui.selected.targets[0]
			if (!target) return false
			game.filterPlayer(current => {
				if (current.countCards() < target.countCards()) current.prompt('使用杀')
			})
			return true
		},
		content: function* (event, map) {
			let trigger = map.trigger,
				player = map.player,
				target = event.target;
			let list = [];
			game.countPlayer(function (con) {
				if (con.countCards('h') < target.countCards('h')) list.push(con);
			})
			list.sortBySeat(player);
			for (var i of list) {
				if (i.isIn()) {
					var result = yield i.chooseCard('h', function (card, i) {
						if (!game.checkMod(card, i, 'unchanged', 'cardEnabled2', i)) return false;
						return i.canUse(get.autoViewAs({
							name: 'sha'
						}, [card]), target, false);
					}, '选择一张手牌当做【杀】对' + get.translation(target) + '使用').set('ai', function (card) {
						var player = _status.event.player;
						return get.effect(target, get.autoViewAs({
							name: 'sha'
						}, [card]), player, player) / Math.max(1, get.value(card));
					});
					if (result.bool) {
						i.useCard({
							name: 'sha'
						}, result.cards, target, false);
					}
				}

			}
		},
		ai: {
			order: 9,
			result: {
				// player:1,
				target: function (player, target) {
					var num = 0;
					let list = [];
					game.countPlayer(function (con) {
						if (con.countCards('h') < target.countCards('h')) list.push(con);
					})
					list.sortBySeat(player);
					for (var i of list) {
						if (get.effect(target, get.autoViewAs({
							name: 'sha'
						}), player, player)) num += 2;
					}
					return -num;
				}
			},
			threaten: 3, //嘲讽值
		}
	},
	ybsl_lxweiyu: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: 'phaseUse',
		usable: 1,
		filterTarget: function (card, player, target) {
			return true;
		},
		content: function* (event, map) {
			let trigger = map.trigger,
				player = map.player,
				target = event.target;
			yield target.draw(2, "visible").gaintag = ["ybsl_lxweiyu_buff"];
			yield target.addTempSkill('ybsl_lxweiyu_buff');
		},
		subSkill: {
			buff: {
				sub: true,
				onremove: true,
				mod: {
					cardEnabled(card) {
						for (const cardx of card.cards) if (!cardx.hasGaintag("ybsl_lxweiyu_buff")) return false
					},
					cardUsable(card) {
						for (const cardx of card.cards) if (!cardx.hasGaintag("ybsl_lxweiyu_buff")) return false
					},
					cardSavable(card) {
						for (const cardx of card.cards) if (!cardx.hasGaintag("ybsl_lxweiyu_buff")) return false
					},
				},
				mark: true,
				marktext: '傲',
				intro: {
					name: '傲慢',
					markcount: function (storage, player) {
						return player.countCards('h', card => card.hasGaintag('ybsl_lxweiyu_buff'));
					},
					mark: function (dialog, content, player) {
						var cards = player.getCards('h', card => card.hasGaintag('ybsl_lxweiyu_buff'));
						if (cards.length) {
							dialog.addAuto(cards);
						} else return '无可使用牌';
					},
				},
			}
		},
		ai: {
			order: 9,
			result: {
				// player:1,
				target: function (player, target) {
					if (target.countCards('h') < 3) return 2;
					else return -1;
				}
			},
			threaten: 3, //嘲讽值
		}
	},
	/*
	ybslclan_luxun:'族陆逊',
	ybslclan_luxun_prefix:'族',
	ybsl_lxtujing:'图荆',
	ybsl_lxtujing_info:'出牌阶段限一次，你可以选择一名手牌数不为最少或之一的其他角色，然后从你开始，每名手牌数小于其的角色可以依次将一张牌当〖杀〗对其使用（以发动此技能时，场上角色的手牌数为准）。',//可能有待调整
	// ybsl_lxtujing_info:'转换技，出牌阶段限一次，你可以将一张手牌交给一名其他角色：阳，视为对其使用一张【逐近弃远】；阴，视为对其使用一张【杀】。',//可能有待调整
	//思路1万钧神弩
	//思路2偷梁换柱
	ybsl_lxweiyu:'伪誉',
	ybsl_lxweiyu_info:'出牌阶段限一次，你可令一名角色摸两张牌并展示之。若如此做，其本回合不能使用不因此获得的牌。',//可能有待调
	ybslclan_luxun:'族陆逊',
	ybslclan_luxun_prefix:'族',
	ybsl_lxtujing:'图荆',
	ybsl_lxtujing_info:'转换技，出牌阶段限一次，你可以将一张手牌交给一名其他角色：阳，视为对其使用一张【逐近弃远】；阴，视为对其使用一张【杀】。',//可能有待调整
	//思路1万钧神弩
	//思路2偷梁换柱
	ybsl_lxzhiyu:'智誉',
	ybsl_lxzhiyu_info:'锁定技，当其他角色获得你的牌时，其本回合展示手牌，并令其本回合无法使用数量最多的颜色的牌。',//可能有待调整
	*/

	//族陆延
	ybsl_lyyaoe: {
		audio: 'ext:夜白神略/audio/character:2',
		forced: true,
		// group:['ybsl_lyyaoe_suit','ybsl_lyyaoe_number'],
		trigger: {
			player: 'useCard',
		},
		filter: function (event, player) {
			if (player.hasSkill('ybsl_lyyaoe_suit')) return false;
			else if (!player.isPhaseUsing() || !event.targets.length) return false;
			var tars = event.targets.filter(current => current != player);
			return tars.length;
		},
		// cost: function() {
		// 	player.damage(player);
		// },
		content: function () {
			'step 0'
			player.damage(player);
			'step 1'
			for (var i of trigger.targets.filter(su => su != player).sortBySeat(player)) {
				i.damage(player);
			}
		},
		ai: {
			result: {
				player(player, target) {
					if (!player.hasSkill('ybsl_lyyaoe_suit') && player.isPhaseUsing()) {
						if (event.targets.length && event.targets.filter(current => current != player).length) return -2;
					}
					return 1;
				},
			},
		},
		// mod: {
		// cardUsable: function (card, player, num) {
		// if(player.hasSkill('ybsl_lyyaoe_number'))return num;
		// var list = player.getHistory("useCard");
		// if(!list.length)return num;
		// var list2 = get.YB_suit(list,'type2');
		// if(list2.contains(get.type2(card)))return false;
		// return num;
		// },
		// },
		subSkill: {
			suit: {
				forced: true,
				audio: 'ybsl_lyyaoe',
				mark: true,
				marktext: '<span style="text-decoration: line-through;">伤</span>',
				intro: {
					content: function (storage, player) {
						// if(storage)return '锁定技，当你于回合内使用牌时，若此牌目标包含其他角色，你对自己造成1点伤害';
						return '已封印夭厄。';
					}
				},
				onremove: true,
			},
			number: {
				forced: true,
				audio: 'ybsl_lyyaoe',
				mark: true,
				marktext: '<span style="text-decoration: line-through;">限</span>',
				intro: {
					content: function (storage, player) {
						// if(storage)return '锁定技，每种类型牌你每回合限用一次';
						return '已封印二效果。';
					}
				},
				onremove: true,
			},
		}
	},
	ybsl_lytiandu: {
		audio: 'ext:夜白神略/audio/character:2',
	},
	ybsl_lykangming: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: 'phaseUse',
		usable: 1,
		content: function* (event, map) {
			let trigger = map.trigger,
				player = map.player;
			var jud = yield player.judge();
			var card = jud.card;
			var cho = yield player.chooseCard('he', function (cardx) {
				if (get.suit(card) != get.suit(cardx) /*&&get.number(card) != get.number(cardx)*/) return false;
				return true;
			}).set('ai', function (cardx) {
				// if(get.suit(card) == get.suit(cardx)&&get.number(card) == get.number(cardx))return false;
				/*if(!player.hasSkill('ybsl_lyyaoe_number')) return get.suit(card) != get.suit(cardx)&&get.number(card) == get.number(cardx);
				else */
				if (!player.hasSkill('ybsl_lyyaoe_suit')) return get.suit(card) == get.suit(cardx) && get.number(card) != get.number(cardx);
				return false;
			}).set('prompt', get.prompt('ybsl_lykangming'));
			// cho;
			if (cho.cards) {
				var cardy = cho.cards[0];
				yield player.discard(cardy);
				if (get.suit(cardy) == get.suit(card) && get.number(cardy) == get.number(card)) {
					yield player.addTempSkill(['ybsl_lyyaoe_suit', 'ybsl_lyyaoe_number']);
					yield player.markSkill(['ybsl_lyyaoe_suit', 'ybsl_lyyaoe_number']);
					yield player.loseMaxHp();
				} else if (get.suit(cardy) == get.suit(card)) {
					yield player.addTempSkill('ybsl_lyyaoe_suit');
					yield player.markSkill('ybsl_lyyaoe_suit');
				}
				// else if(get.number(cardy)==get.number(card)){
				// yield player.addTempSkill('ybsl_lyyaoe_number');
				// yield player.markSkill('ybsl_lyyaoe_number');
				// }
			}
		},
		ai: {
			order: 10,
			result: {
				player: 1,
				// target:-2,
			},
		}
	},
	/*
	
	ybslclan_luyan:'族陆延',
	ybslclan_luyan_prefix:'族',
	ybsl_lyyaoe:'夭厄',
	ybsl_lyyaoe_info:'锁定技，每种类型牌你每回合限用一次；锁定技，当你于回合内使用牌时，若此牌目标包含其他角色，你对自己造成1点伤害。',
	锁定技，当你于回合内使用牌时，若此牌目标包含其他角色，你对自己造成1点伤害；锁定技，每种类型牌你每回合限用一次。'
	//ybsl_lyyaoe_info:'锁定技，每种类型牌你每回合限用一次；锁定技，当你每回合首次使用某个类型的牌指定目标后，若目标为其他角色，你对自己和目标各造成x点伤害（x为你本回合使用的类型数，从1开始算，至多为3）。',
	ybsl_lytiandu:'天妒',
	ybsl_lytiandu_info:'你猜天妒啥效果。不出意外的话，这条技能仅提供一条语音。',
	ybsl_lykangming:'抗命',
	ybsl_lykangming_info:'出牌阶段限一次，你可以进行一次判定。然后你可以弃置一张花色或点数与判定结果相同的牌。若弃置牌与判定结果：花色相同，本回合夭厄一效果失效；点数相同，本回合夭厄二效果失效；花色和点数均相同，本回合夭厄两效果均失效，然后你减1点体力上限。',
	*/

	ybsl_ljfumin: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: 'phaseUse',
		usable: 1,
		filter: function (event, player) {
			return player.countCards('h') > 0;
		},
		filterTarget: function (card, player, target) {
			return player != target; //此函数加true为全场唯一
		},
		selectCard: 1,
		filterCard: true,
		discard: false,
		lose: false,
		position: 'h',
		check: function (card) {
			if (card.name == 'du') return 20;
			if (card.name == 'tao') return -1;
			if (card.name == 'ybsl_juhua') return -1;
			return 10 - get.value(card);
		},
		content() {
			'step 0'
			player.give(cards, target);
			'step 1'
			if (player.countCards('h') == target.countCards('h'))
				player.getStat('skill')['ybsl_ljfumin'] = 0;
			// if(player.getStat('skill')['ybsl_ljfumin']&&player.getStat('skill')['ybsl_ljfumin']>0) yield player.getStat('skill')['ybsl_ljfumin']--;

			// 
			else if (player.countCards('h') < target.countCards('h')) player.draw(2);
			else target.draw(2);
			// 'step 2'
			// game.log('发动福民后',player.getStat('skill')['ybsl_ljfumin']);
		},
		ai: {
			order: 2,
			result: {
				target: function (player, target) {
					if (player.countCards('h') - target.countCards('h') > 2) return 3;
					else return 1;
				},
				player: function (player, target) {
					if (player.countCards('h') - target.countCards('h') < 2) return 2;
					else return 0;
				},
			}
		},
		// group:'ybsl_ljfumin_de',
		// subSkill:{
		// 	de:{
		// 		direct:true,
		// 		trigger:{
		// 			player:'useSkillAfter',
		// 		},
		// 		filter:function(event,player){
		// 			return event.skill=='ybsl_ljfumin'&&event.skill.ybfumin;
		// 		},
		// 		content:function(){
		// 			'step 0'
		// 			player.getStat('skill')['ybsl_ljfumin']=0;
		// 			'step 1'
		// 			game.log('发动福民后',player.getStat('skill')['ybsl_ljfumin']);
		// 		}
		// 	}
		// }
	},
	ybsl_ljguihang: {
		audio: 'ext:夜白神略/audio/character:2',
		dutySkill: true,
		forced: true,
		group: ['ybsl_ljguihang_1', 'ybsl_ljguihang_2'],
		subSkill: {
			1: {
				forced: true,
				audio: 'ybsl_ljguihang',
				trigger: {
					player: "loseAfter",
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				filter(event, player) {
					if (player.countCards("h") >= player.maxHp) return false;
					const evt = event.getl(player);
					return evt && evt.player == player && evt.hs && evt.hs.length > 0;
				},
				async content(event, trigger, player) {
					player.gain(lib.card.ying.getYing(player.maxHp - player.countCards('h')), "gain2");
				},
			},
			2: {
				forced: true,
				audio: 'ybsl_ljguihang',
				trigger: {
					player: 'phaseZhunbeiBegin',
				},
				filter: function (event, player) {
					var cards = player.getCards('h');
					for (var i of cards) {
						if (i.name != 'ying') return false;
					}
					return true;
				},
				content: function* (event, map) {
					let trigger = map.trigger, player = map.player;
					game.log(player, '成功完成使命');
					yield player.awakenSkill('ybsl_ljguihang');

					const num = player.getCards('h').length;
					yield player.discard(player.getCards('h'));
					yield player.addMark("nzry_huaiju", num);
					yield player.addSkill('nzry_huaiju');
					yield player.addSkill("nzry_huaiju_ai");
					yield player.draw(Math.min(num, 5));
					yield player.addMaxHp();//夜白的懒人函数，直接增加体力上限并回复体力
				}
			}
		}
	},
	// ybsl_ljfumin:'福民',
	// ybsl_ljfumin_info:'出牌阶段限一次，你可将一张手牌交给其他角色，然后若你与对方手牌数相同，此技能视为未发动过，否则手牌数较少的一方摸两张牌。',
	// ybsl_ljguihang:'归航',
	// ybsl_ljguihang_info:'使命技，锁定技，当你失去手牌后，若你手牌数小于体力上限，你获得【影】补充至体力上限；成功：准备阶段，若你手牌中均为【影】，你弃置所有手牌，并摸等量手牌（至多5张），然后增加1点体力上限并回复1点体力。


	ybsl_kegu: {//刻骨
		enable: 'chooseToUse',
		usable: 1,
		audio: 'ext:夜白神略/audio/character:2',
		filter: function (event, player) {
			return player.countCards('h') > 0;
		},
		filterCard: function (card, player, event) {
			event = event || _status.event;
			var filter = event._backup.filterCard;
			if (filter({ name: get.name(card), isCard: false, nature: get.nature(card) }, player, event)) return true;
			return false;
		},
		selectCard: 1,
		viewAs: function (cards, player) {
			var cardx = cards[0];
			if (!cardx) return false;
			var name = get.name(cardx);
			var nature = get.nature(cardx);
			var suit = get.suit(cardx);
			var card = {
				name: name,
				nature: nature,
				suit: suit,
				isCard: true,
			};
			if (name) return card;
			return null;
		},
		// filterTarget:function(card,player,target){
		// },
		discard: false,
		losecard: false,
		lose: false,
		position: 'h',
		precontent: function () {
			'step 0'
			player.showCards(event.result.cards);
			'step 1'
			event.result.cards = [];
		},
	},

	/** */
	//---------天帝
	sgsk_zhizun: {
		audio: 'ext:夜白神略/audio/character:2',
		forced: true,
		locked: true,
		charlotte: true,
		superCharlotte: true,
		zhizunFilter() {
			if (ui.discardPile.hasChildNodes()) {
				var card = Array.from(ui.discardPile.childNodes)[ui.discardPile.childNodes.length - 1];
				return get.number(card) == 5 || get.number(card) == 9;
			}
			return false;
		},
	},
	sgsk_zhizunx: {
		audio: 'sgsk_zhizun',
		filter(event, player) {
			if (event.name == 'useCard') return get.number(event.card) == 5 || get.number(event.card) == 9;
			return lib.skill.sgsk_zhizun.zhizunFilter();
		},
		trigger: {
			player: ['damageBefore', 'damageBegin1', 'damageBegin2', 'damageBegin3', 'damageBegin4', 'useCardAfter'],
		},
		content() {
			if (event.triggername == 'useCardAfter') {
				player.draw();
			}
			else {
				event.cancel();
			}
		},
		forced: true,
		locked: true,
		charlotte: true,
		superCharlotte: true,
		mod: {
			targetEnabled: function (card) {
				if (lib.skill.sgsk_zhizun.zhizunFilter()) return false;
			},
		},
		group: "sgsk_zhizunx_log",
		subSkill: {
			log: {
				audio: "sgsk_zhizun",
				trigger: { global: "useCard1" },
				forced: true,
				firstDo: true,
				filter(event, player) {
					if (event.player == player) return false;
					if (!lib.skill.sgsk_zhizun.zhizunFilter()) return false;
					var info = lib.card[event.card.name];
					return info && info.selectTarget && info.selectTarget == -1 && !info.toself;
				},
				content() { },
			},
		},
	},
	//---------神农
	sgsk_wugu: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			return player.getCards('h') && player.getCards('h').length > 0 && game.filterPlayer(c => c != player).length > 0;
		},
		content() {
			'step 0'
			ui.clear();
			var cards;
			if (player.getCards('h') && player.getCards('h').length > 0) {
				cards = player.getCards('h');
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
				// if (lose_list.length) {
				// 	lose_list.forEach(list => {
				// 		list[0].$throw(list[1]);
				// 		game.log(list[0], "将", list[1], "置于了处理区");
				// 	});
				// 	game.loseAsync({
				// 		lose_list: lose_list,
				// 		visible: true,
				// 	}).setContent("chooseToCompareLose");
				// }
				// if (cards2.length) game.cardsGotoOrdering(cards2);
				game.delayex();
				var dialog = ui.create.dialog("神农五谷", cards, true);
				_status.dieClose.push(dialog);
				dialog.videoId = lib.status.videoId++;
				game.addVideo("cardDialog", null, ["神农五谷", get.cardsInfo(cards), dialog.videoId]);
				event.getParent().preResult = dialog.videoId;
				game.broadcast(
					function (cards, id) {
						var dialog = ui.create.dialog("神农五谷", cards, true);
						_status.dieClose.push(dialog);
						dialog.videoId = id;
					},
					cards,
					dialog.videoId
				);
				event.dialog = dialog;
				game.log(player, "五谷展示了", cards);
			} else {
				event.finish();
			}
			'step 1'
			var targets2 = game.filterPlayer().sortBySeat(player).filter(c => c != player);
			for (var k of targets2) {
				var next = game.createEvent('sgsk_wugu', false);
				next.target = k;
				if (event.dialog) next.dialog = event.dialog;
				// next.cards=cards;
				next.preResult = event.preResult;
				next.setContent(function () {
					var target = event.target;
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
			'step 2'
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
						event.trigger("sgsk_wuguDiscard");
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
			'step 3'
			if (player.countCards('h') == 0) player.recover();
		},
		ai: {
			order: 1,
			result: {
				player: function (player) {
					var num1 = player.countCards('h');
					var num2 = game.countPlayer(c => c != player);
					if (num1 > num2) return false;
					var num = 0;
					num += player.getDamagedHp(true);
					num /= player.countCards('h');
					return num - 1.5;
				}
			}
		}
	},
	sgsk_changcao: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: 'phaseUse',
		content() {
			'step 0'
			var card = get.cards()[0];
			game.cardsGotoOrdering(card);
			event.card = card;
			game.broadcast(function (card) {
				ui.arena.classList.add('thrownhighlight');
				card.copy('thrown', 'center', 'thrownhighlight', ui.arena).animate('start');
			}, event.card);
			event.node = event.card.copy('thrown', 'center', 'thrownhighlight', ui.arena).animate('start');
			ui.arena.classList.add('thrownhighlight');
			game.addVideo('thrownhighlight1');
			game.addVideo('centernode', null, get.cardInfo(event.card));
			game.delay(2);
			'step 1'
			game.addVideo('deletenode', player, [get.cardInfo(event.node)]);
			event.node.delete();
			game.broadcast(function (card) {
				ui.arena.classList.remove('thrownhighlight');
				if (card.clone) {
					card.clone.delete();
				}
			}, event.card);
			player.gain(event.card, 'gain2');
			if (get.suit(event.card) == 'spade') player.loseHp();
		},
		ai: {
			order: 10,
			result: {
				player: function (player) {
					// if(player.hp<=1)return false;
					return player.hp - 1.5;
				}
			}
		}
	},
	sgsk_changcaox: {
		audio: 'sgsk_changcao',
		inherit: 'sgsk_changcao',
		usable(skill, player) {
			return player.hp;
		}
	},
	//---------轩辕
	sgsk_xiude: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: ['useCardAfter', 'respondAfter'],
		},
		filter(event, player) {
			return get.type(event.card) == 'basic';
		},
		chect() { return true },
		content() {
			'step 0'
			player.judge(function (card) {
				if (get.type(card) == "basic") return 1;
				return -1;
			}).set('judge2', function (result) {
				return result.bool;
			});
			'step 1'
			if (result.bool) {
				var next = player.chooseTarget("令一名角色摸一张牌");
				next.set("ai", function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target) / Math.sqrt(1 + target.countCards("h"));
					if (target.hasSkillTag("nogain")) att /= 10;
					return att;
				});
			}
			else event.finish();
			'step 2'
			if (result.bool) {
				player.line(target, "green");
				result.targets[0].draw();
			}
		},
	},
	sgsk_xiudex: {
		audio: 'sgsk_xiude',
		trigger: {
			player: ['useCardAfter', 'respondAfter'],
		},
		filter(event, player) {
			return get.type(event.card) == 'basic';
		},
		chect() { return true },
		content() {
			'step 0'
			player.judge(function (card) {
				if (get.type(card) == "basic") return 1;
				return -1;
			}).set('judge2', function (result) {
				return result.bool;
			});
			'step 1'
			if (result.bool) {
				var next = player.chooseTarget("与一名角色各摸一张牌");
				next.set("ai", function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target) / Math.sqrt(1 + target.countCards("h"));
					if (target.hasSkillTag("nogain")) att /= 10;
					return att;
				});
			}
			else event.finish();
			'step 2'
			if (result.bool) {
				player.line(target, "green");
				player.draw();
				result.targets[0].draw();
			}
		},
	},
	sgsk_xiudey: {
		audio: 'sgsk_xiude',
		trigger: {
			player: ['useCardAfter', 'respondAfter'],
		},
		filter(event, player) {
			// return get.type(event.card)=='basic';
			return true;
		},
		chect() { return true },
		content() {
			'step 0'
			player.judge(function (card) {
				if (get.type2(card) == get.type2(trigger.card)) return 1;
				return -1;
			}).set('judge2', function (result) {
				return result.bool;
			});
			'step 1'
			if (result.bool) {
				var next = player.chooseTarget("令一名角色摸一张牌");
				next.set("ai", function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target) / Math.sqrt(1 + target.countCards("h"));
					if (target.hasSkillTag("nogain")) att /= 10;
					return att;
				});
			}
			else event.finish();
			'step 2'
			if (result.bool) {
				player.line(target, "green");
				result.targets[0].draw();
			}
		},
	},
	sgsk_xiudexy: {
		audio: 'sgsk_xiude',
		trigger: {
			player: ['useCardAfter', 'respondAfter'],
		},
		filter(event, player) {
			// return get.type(event.card)=='basic';
			return true;
		},
		chect() { return true },
		content() {
			'step 0'
			player.judge(function (card) {
				if (get.type2(card) == get.type2(trigger.card)) return 1;
				return -1;
			}).set('judge2', function (result) {
				return result.bool;
			});
			'step 1'
			if (result.bool) {
				var next = player.chooseTarget("与一名角色摸一张牌");
				next.set("ai", function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target) / Math.sqrt(1 + target.countCards("h"));
					if (target.hasSkillTag("nogain")) att /= 10;
					return att;
				});
			}
			else event.finish();
			'step 2'
			if (result.bool) {
				player.line(target, "green");
				player.draw();
				result.targets[0].draw();
			}
		},
	},
	sgsk_wending: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'equipEnd',
		},
		forced: true,
		filter(event, player) {
			for (var i = 1; i < 6; i++) {
				if (player.hasEmptySlot(i)) return false;
			}
			var cards = player.getCards('e');
			if (cards) var num = get.YB_suit(cards, 'suit');
			else return false;
			return num == 4;
		},
		content() {
			var winners = player.getFriends();
			game.over(player == game.me || winners.includes(game.me));
		}
	},
	//---------少昊
	sgsk_qiongsang: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'phaseUseEnd',
		},
		filter(event, player) {
			if (player.countCards('h')) return false;
			const history = player.getHistory("useCard");
			for (let i = 0; i < history.length; i++) {
				if (history[i].isPhaseUsing()) return true;
			}
			return false;
		},
		direct:true,
		
		content() {
			player.when('phaseJieshuBegin').then(function () {
				player.chooseBool().set('ai', function () { return true })
					.set('prompt', '是否摸三张牌并回复1点体力？');
			}).then(function () {
				if (result.bool) {
					player.draw(3);
					player.recover();
				}
			})
		},
	},
	sgsk_qiongsangx: {
		audio: 'sgsk_qiongsang',
		inherit: 'sgsk_qiongsang',
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		filter(event, player) {
			if (!player.isPhaseUsing()) return false;
			if (player.countCards("h")) return false;
			var evt = event.getl(player);
			return evt && evt.hs && evt.hs.length;
		},
	},
	sgsk_qiongsangy: {
		audio: 'sgsk_qiongsang',
		inherit: 'sgsk_qiongsang',
		filter(event, player) {
			if (player.countCards('h')) return false;
			return true;
		},
	},
	//---------颛顼
	sgsk_chuangzhi: {
		audio: 'ext:夜白神略/audio/character:2',
	},
	//---------青龙
	sgsk_longxiao: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: ["chooseToRespond", "chooseToUse"],
		filter: function (event, player) {
			if (!player.countCards("hes", { type: "basic" })) return false;
			var evt=lib.filter.filterCard;
			for (var i of lib.inpile) {
				var type = get.type(i);
				if (type == 'basic' && evt({ name: i }, player, event)) return true;
			};
			return false;
		},
		hiddenCard: function (player, name) {
			var type = get.type(name);
			return type == 'basic';
		},
		chooseButton: {
			dialog: function (event,player) {
				var list = [];
				// var nature = null;
				for (var i = 0; i < lib.inpile.length; i++) {
					if (get.type(lib.inpile[i]) == 'basic') {
						list.push(['基本', '', lib.inpile[i], null]);
						if (lib.inpile[i] == 'sha') {
							for (var k of get.YB_natureList()) {
								list.push(['基本', '', lib.inpile[i], k]);
							}
							list.push(['基本', '', lib.inpile[i], 'kami']);
						}

					}
				}
				var dialog = ui.create.dialog("龙啸", [list, "vcard"], "hidden");
				dialog.direct = true;
				return dialog;
			},
			filter:function (button,player){
				return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
			},
			backup: function (links, player) {
				return {
					filterCard(card, player) {
						return get.type2(card) == "basic";
					},
					position: "hes",
					check(card) {
						const val = get.value(card);
						if (_status.event.name == "chooseToRespond") return 1 / Math.max(0.1, val);
						return 5 - val;
					},
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
					},
					precontent: function () {
						player.logSkill("sgsk_longxiao");
					},
				};
			},
			prompt: function (links, player) {
				return "龙啸：将一张基本牌当【" + links[0][3] ? get.translation(links[0][3]) : '' + get.translation(links[0][2]) + "】使用或打出";
			},
		},
		ai:{
			fireAttack:true,
			respondSha:true,
			respondShan:true,
			save:true,
			order:4,
			result:{
				player:function (player){
					if(_status.event.dying) return get.attitude(player,_status.event.dying);
					return 1;
				},
			},
		},

	},
	//---------白虎
	sgsk_huwei: {
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		mod:{
			selectTarget:function(card,player,range){
				if(!card.suit||card.suit!='club')return;
				if(range[1]==-1) return;
				range[1]++;
			}
		},
		trigger:{
			player:'useCard',
		},
		filter(event,player){
			var suitx=get.suit(event.card);
			if(suitx=='spade')return true;
			if(suitx=='club')return lib.filter.selectTarget(event.card,player)[1]!=-1;
			// if(!['spade','club'].suitx)return false;
			// return true;
		},
		content(){
			var suit=get.suit(trigger.card);
			if(suit=='spade')trigger.baseDamage++;
		},
	},
	//---------朱雀
	sgsk_zhiyan: {
		audio: 'ext:夜白神略/audio/character:2',
	},
	sgsk_zhiyanx: {
		audio: 'sgsk_zhiyan',
		forced:true,
		mod:{
			cardnature:function(card,player){
				if(get.name(card)=='sha') return 'fire';
				if(card.type=='trick'&&lib.card[card.name]&&
					lib.card[card.name].ai&&
					lib.card[card.name].ai.tag&&
					lib.card[card.name].ai.tag.damage){
						return 'fire';
					}
			},
			cardname:function(card,player){
				if(card.type=='trick'&&lib.card[card.name]&&
					lib.card[card.name].ai&&
					lib.card[card.name].ai.tag&&
					lib.card[card.name].ai.tag.damage){
						if(card.name=='wanjian')return 'ybsl_meteor';
						return 'huogong';
					}
			},
		},
		group:['sgsk_zhiyanx_liuxing','sgsk_zhiyanx_fire'],
		subSkill:{
			liuxing:{
				//鸽
			},
			fire:{
				forced:true,
				trigger:{
					player:'damageBegin4',
					source:'damageAfter',
				},
				filter(event,player,name){
					return event.hasNature("fire");
				},
				content(){
					if(event.triggername=='damageAfter')player.draw();
					else trigger.cancel();
				},

			}
		}
	},
	sgsk_zhiyany: {
		audio: 'sgsk_zhiyan',
		forced:true,
		mod:{
			cardnature:function(card,player){
				if(get.name(card)=='sha') return 'fire';
			},
		},
		trigger:{
			player:'useCardToBegin',
		},
		filter(event, player) {
			if (get.type(event.card) != "trick") return false;
			if(get.name(event.card)=='wuxie')return false;
			if (!event.targets) return false;
			return true;
		},
		firstDo: true,
		async content(event, trigger, player) {
			trigger.setContent(lib.card['ybsl_meteor'].content);
		},
		group:['sgsk_zhiyanx_fire'],
	},
	//---------玄武
	sgsk_xuanzhen: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseZhunbeiBegin',
		},
		filter:function(event,player){
			if(player.countDiscardableCards(player, 'h')>0)return true;
			if(player.countDiscardableCards(player, 'e')>0)return true;
			if(player.countDiscardableCards(player, 'j')>0)return true;
			return false;
		},
		cost:function*(event,map){
			let trigger=map.trigger,player=map.player;
			event.result = { bool: false, cost_data: { control: 'cancel2' } };
			var listx=[];
			if(player.countDiscardableCards(player, 'h')>0)yield listx.push('手牌区');
			if(player.countDiscardableCards(player, 'e')>0)yield listx.push('装备区');
			if(player.countDiscardableCards(player, 'j')>0)yield listx.push('判定区');
			
			if(listx.length>=1){
				var cont = yield player
					.chooseControl(listx, "cancel2")
					.set("prompt", "是否发动玄震？你可以弃置一个区域的所有牌，然后摸等量的牌。")
					.set("ai", function () {
						return '判定区'
					})
					.forResult();
					console.log(cont);
				event.result.bool = typeof cont.control === "string" && cont.control !== "cancel2";
				event.result.cost_data.control = cont.control;
			}
			
		},
		content:function*(event,map){
			let trigger=map.trigger,player=map.player;
			const result = event.cost_data;
			console.log(result);
			if(result.control=='cancel2') yield event.finish();
			else{
				var por;
				if(result.control=='手牌区')por='h';
				if(result.control=='装备区')por='e';
				if(result.control=='判定区')por='j';
				var cards = player.getDiscardableCards(player,por);
				yield player.discard(cards);
				yield player.draw(cards.length);
			}
		}
	},
	//---------麒麟
	sgsk_decai: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseUseBegin',
		},
		cost(){
			'step 0'
			event.result = {bool : false,cost_data:{target:null,control:null}}
			var targets1 = game.filterPlayer(c=>c.countCards('h')<player.countCards('h'));
			var targets2 = game.filterPlayer(c=>c.hp<player.hp);
			player.chooseTarget().set('filterTarget',function(card,player,target){
				var str = '';
				if(targets1.includes(target))str+='其可摸牌<br>'
				if(targets2.includes(target)&&target.getDamagedHp())str+='其可回血<br>'
				target.prompt(str,'wood');
				return targets1.includes(target)||targets2.includes(target);
			}).set('ai',function(target){
				return get.attitude(_status.event.player,target)-5-target.hp-target.countCards('h');
			});
			'step 1'
			if(!result.bool){
				event.result.bool=false;
				event.finish();
			}
			else{
				event.tar = result.targets[0];
				var list = [];
				if(event.tar.countCards('h')<player.countCards('h'))list.push('令其摸牌');
				if(event.tar.hp<player.hp&&event.tar.getDamagedHp())list.push('令其回血');
				list.push('回上一步');
				player.chooseControl(list).set('prompt2','令'+get.translation(event.tar)+'怎么样？')
			}
			'step 2'
			if(result.control=='回上一步'){
				event.goto(0);
			}
			else{
				event.result = {bool : true,cost_data:{target:event.tar,control:result.control}}
			}
		},
		//                              子虚保佑
		//              FFFFFFFFFFFFFFFF                                  OOOOOOOOOO
		//              FFF                                             OOO        OOO
		//              FFF                                            OOO          OOO
		//              FFF                                           OOO            OOO
		//              FFF                                          OOO              OOO
		//              FFF                                          OOO              OOO
		//              FFFFFFFFFFFFFFFF     eeeeeeeeee              OOO              OOO
		//              FFF                 ee         ee            OOO              OOO
		//              FFF                ee           ee           OOO              OOO
		//              FFF                ee   eeeeeeeeee            OOO            OOO
		//              FFF                 ee                         OOO          OOO
		//              FFF                  ee                22       OOO        OOO      33
		//              FFF                   eeeeeeeeeee     2  2        OOOOOOOOOO       3  3
		//                                                      2                            3
		//                                                     2                           3  3
		//                                                    2222                          33
		content(){
			'step 0'
			var result=event.cost_data;
			if(result.control=='令其摸牌'){
				result.target.draw();
			}
			else {
				result.target.recover();
			}
		},
	},
	sgsk_decaix:{
		audio: 'sgsk_decai',
		trigger:{
			player:'phaseUseBegin',
		},
		cost(){
			var targets1 = game.filterPlayer(c=>c.countCards('h')<player.countCards('h'));
			var targets2 = game.filterPlayer(c=>c.hp<player.hp);
			event.result = player.chooseTarget().set('filterTarget',function(card,player,target){
				var str = '';
				if(targets1.includes(target))str+='其可摸牌<br>'
				if(targets2.includes(target)&&target.getDamagedHp())str+='其可回血<br>'
				target.prompt(str,'wood');
				return targets1.includes(target)||targets2.includes(target);
			}).set('ai',function(target){
				return get.attitude(_status.event.player,target)-5-target.hp-target.countCards('h');
			});
		},
		content(){
			var tar = event.target;
			if(tar.countCards('h')<player.countCards('h'))tar.draw();
			if(tar.hp<player.hp)tar.recover();
		}
	},
	//------------------------东王公
	'sgsk_baigong': {
		preHidden: true,
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'phaseDrawBefore',
			global: 'phaseDrawAfter',
		},
		forced: true,
		content: function () {
			if (trigger.player != player) {
				player.gainPlayerCard('he', trigger.player, true);
				if (game.countPlayer() <= 4 && trigger.player.countCards('he') > player.countCards('he')) {
					player.gainPlayerCard('he', trigger.player, true);
				}
			}
			else {
				trigger.cancel();
			}
		},
	},
	'sgsk_cangling': {
		preHidden: true,
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'phaseUseAfter',
		},
		filter: function (event, player) {
			//if(player.getHistory('skipped').includes('phaseUse')) return false;
			return player.getHistory('useCard', function (evt) {
				if (evt.targets && evt.targets.length && evt.isPhaseUsing()) {
					var targets = evt.targets.slice(0);
					while (targets.includes(player)) targets.remove(player);
					return targets.length > 0;
				}
				return false;
			}).length == 0;
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseTarget('请选择一名角色令其增加1点体力上限，然后你回复1点体力').set('ai', function (target) {
				// return get.attitude(player,target);
				return target == player;
			}).forResult();
		},
		content: function () {
			// 'step 0'
			// player.chooseTarget('请选择一名角色令其增加1点体力上限，然后你回复1点体力',true);
			// 'step 1'
			// var target=result.targets[0];
			var target = event.targets[0];
			target.gainMaxHp();
			player.recover();
		},
	},
	//--------------西王母
	sgsk_kunlun: {
		audio: 'ext:夜白神略/audio/character:2',
		forced: true,
		trigger: {
			target: 'useCardToTargeted',
		},
		filter: function (event, player) {
			// if(!player.isDamaged())return false;
			return get.suit(event.card) == 'spade';
		},
		content: function () {
			'step 0'
			player.draw(2);
			'step 1'
			if (!player.isDamaged()) player.chooseToDiscard('he', 2, true);
		},
	},
	sgsk_huasheng: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'phaseUseAfter',
		},
		filter: function (event, player) {
			//if(player.getHistory('skipped').includes('phaseUse')) return false;
			// return player.getHistory('useCard',function(evt){
			// 	if(evt.targets&&evt.targets.length&&evt.isPhaseUsing()){
			// 		var targets=evt.targets.slice(0);
			// 		while(targets.includes(player)) targets.remove(player);
			// 		return targets.length>0;
			// 	}
			// 	return false;
			// }).length==0;
			return true;
		},
		// filter:function(event,player){
		// 	var target=event.player;
		// 	return target.getHistory('useCard',function(evt){
		// 		return evt.isPhaseUsing();
		// 	}).length==0;
		// },
		// direct:true,
		async cost(event, trigger, player) {
			event.result = await player.chooseCard('h', get.prompt('sgsk_huasheng'), '展示并视为使用一张基本牌或普通锦囊牌', function (card, player) {
				var type = get.type(card, player);
				return type == 'basic' || type == 'trick';
			}).set('ai', function (card) {
				var player = _status.event.player, name = get.name(card, player);
				if (name == 'jiu') return 0;
				return player.getUseValue({
					name: name,
					nature: get.nature(card, player),
					isCard: true,
				})
			}).forResult();
		},
		content: function () {
			// 'step 0'
			// player.chooseCard('h',get.prompt('sgsk_huasheng'),'展示并视为使用一张基本牌或普通锦囊牌',function(card,player){
			// var type=get.type(card,player);
			// return type=='basic'||type=='trick';
			// }).set('ai',function(card){
			// var player=_status.event.player,name=get.name(card,player);
			// if(name=='jiu') return 0;
			// return player.getUseValue({
			// name:name,
			// nature:get.nature(card,player),
			// isCard:true,
			// })
			// });
			// 'step 1'
			// if(result.bool){
			// player.logSkill('sgsk_huasheng');
			var cardv = event.cards[0];
			player.showCards(cardv, get.translation(player) + '发动了【化生】');
			var card = {
				name: get.name(cardv, player),
				nature: get.nature(cardv, player),
				isCard: true,
			}
			player.chooseUseTarget(card, true, false);
			// }
		},
	},
	//-------------------------华胥
	'sgsk_talei': {
		preHidden: true,
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			global: 'phaseZhunbeiBegin',
		},
		check: function (event, player) {
			return get.attitude(player, event.player) <= 0;
		},
		content: function () {
			// 'step 0'
			// event.judgestr="闪电";
			// trigger.player.judge(event.judgestr,function(card){
			// if(get.suit(card)=='spade'&&get.number(card)>1&&get.number(card)<10)return -5;
			// return 1;
			// });
			// 'step 1'
			// if(result.bool==false){
			// trigger.player.damage(3,'thunder','nosource');
			// }
			// else{
			// event.finish();
			// }
			trigger.player.executeDelayCardEffect('shandian');
		},
		ai: {
			expose: 1,//跳立场
			threaten: 0.5,//嘲讽值
		},
	},
	'sgsk_yunyuu': {
		preHidden: true,
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			global: 'judgeEnd',
		},
		preHidden: true,
		frequent: true,
		filter: function (event, player) {
			return get.suit(event.result.card) == 'heart'
		},
		content: function () {
			player.draw(1);
		},
	},

	//---------瑶姬
	sgsk_yunyu: {
		audio: 'ext:夜白神略/audio/character:2',
		group:['sgsk_yunyu_1','sgsk_yunyu_2'],
		subSkill:{
			1:{
				audio: 'sgsk_yunyu',
				trigger:{
					player:'damageAfter',
				},
				filter(event,player){
					return true;
				},
				cost(){
					event.result = player.chooseTarget()
					.set('ai', function (target) { 
						return (get.attitude(_status.event.player,target)-5)*target.getDamagedHp(true); 
					})
					.set('prompt2', '是否令一名男性角色回复1点体力？')
					.set('filterTarget',function(card,player,target){
						return target.hasSex("male")&&target.isDamaged()
					}).forResult();
				},
				content(){
					event.targets[0].recover();
				}
			},
			2:{
				audio: 'sgsk_yunyu',
				trigger:{
					global:'damageAfter',
				},
				filter(event,player){
					return event.player.hasSex("male")&&player.isDamaged();
				},
				cost(){
					event.result = trigger.player.chooseBool().set('ai', function () { return get.attitude(_status.event.player,player)>5 })
					.set('prompt', '是否令'+get.translation(player)+'回复1点体力？').forResult();
				},
				content(){
					player.recover();
				}
			},
		},
	},
	sgsk_mengzhen: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: "phaseJieshuBegin",
		},
		check(event, player) {
			if (game.countPlayer() > 4) return true;
			return event.player.hp + player.countCards("h") < 4;
		},
		async content(event, trigger, player){
			const num = game.countPlayer();
			await player.turnOver();
			await player.draw(num);
		},
	},
	//---------鸿钧老祖
	sgsk_pudu: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseDrawBefore',
		},
		filter(){return true},
		content(){
			trigger.changeToZero();
			var tars=game.filterPlayer().sortBySeat();
			for(var i of tars){
				i.draw();
			}
		},
	},
	sgsk_xiansheng: {
		audio: 'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		//出牌阶段限一次，你可以从手牌数最多的角色处获得任意张手牌直到其不为手牌数最多。
		filter(event,player){
			var players=game.filterPlayer(c=>c!=player);
			for(var i of players){
				if(i.isMaxHandcard())return true;
			}
		},
		filterTarget(card,player,target){
			return target!=player&&target.isMaxHandcard();
		},
		content(){
			'step 0';
			var num=get.YB_cardMaxLose(target);
			player.choosePlayerCard(target,'h',true,num);
			'step 1'
			if(result.links){
				player.gain(result.links,'gain2');
			}
		},
		ai:{
			order(item, player){
				return 6-player.countCards('h');
			},
			result:{
				player:10,
				target:-10,
			},
		}
	},
	sgsk_xianshengx: {
		audio: 'sgsk_xiansheng',
		enable:'phaseUse',
		usable:1,
		filter(event,player){
			var players=game.filterPlayer(c=>c!=player);
			for(var i of players){
				if(i.isMaxHandcard())return true;
			}
		},
		filterTarget(card,player,target){
			return target!=player&&target.isMaxHandcard();
		},
		content(){
			'step 0';
			event.count=0;
			'step 1'
			player.choosePlayerCard(target,'h',true);
			'step 2'
			if(result.links){
				player.gain(result.links,'gain2');
				event.count++;
			}
			else event.finish()
			'step 3'
			if(event.count>=5||!target.isMaxHandcard()){
				event.finish();
			}
			else{
				event.goto(1);
			}
		},
		ai:{
			order(item, player){
				return 6-player.countCards('h');
			},
			result:{
				player:10,
				target:-10,
			},
		}
	},
	//---------共工//测试通过
	sgsk_taotian: {
		audio: 'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		filter(){return true},
		filterCard:function(card){
			var player=_status.event.player;
			var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
			if(mod2!='unchanged') return mod2;
			var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
			if(mod!='unchanged') return mod;
			return true;
		},
		check(card){
			return 6-get.value(card);
		},
		discard:false,
		lose:false,
		content(){
			var suit=get.suit(cards[0]);
			'step 0'
			player.respond(cards[0],'highlight','noOrdering');
			'step 1'
			var targets=game.filterPlayer(c=>c!=player).sortBySeat();
			for(var i of targets){
				var next = game.createEvent('sgsk_taotian_next', false);
				next.player=player;
				next.target=i;
				next.card=cards[0];
				next.suit=suit;
				next.setContent(function(){
					'step 0'
					target.chooseToRespond('请打出一张非'+get.translation(event.suit)+'牌，否则'+get.translation(player)+'摸一张牌。',function(card,player){
						var suitx=get.suit(card);
						return suitx!=event.suit;
					}).set('ai',function(card){
						if(get.attitude(_status.event.player,player)>5)return false;
						return -get.value(card,target);
					});
					'step 1'
					if(!result.bool)player.draw();
				});
			}
		},
		ai:{
			order:10,
			result:{
				player:1,
			}
		}
	},
	//---------祝融
	sgsk_fentian: {
		audio: 'ext:夜白神略/audio/character:2',
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
				if(get.color(k)!='red')return false;
				// if(list2.length==0||!list2.includes(get.color(k)))list2.add(get.color(k));
			}
			return true;
			// return list2.length==1;
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
				if(get.color(k)!='red')return false;
				if(list2.length==0||!list2.includes(get.color(k)))yield list2.add(get.color(k));
			}
			if(list2.length==1&&list2[0]=='red'){
				var relu = yield player.chooseTarget('选择至多'+cards.length+'名角色，对其各造成1点火焰伤害').set('ai',function(target){
					return -get.attitude(_status.event.player,target);
				})
				if(relu.bool){
					var tars=relu.targets;
					player.line(tars);
					var targets=tars;
					for(var i of targets){
						var next = game.createEvent('sgsk_fentian_next', false);
						next.player=player;
						next.target=i;
						next.setContent(function(){
							target.damage('fire');
						});
					}
				}
			}
		}
	},
	//---------句芒
	sgsk_fusang: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseUseBegin',
		},
		filter(event,player){
			return !player.isMaxHandcard();
		},
		content(){
			var num=1;
			game.filterPlayer(function(c){
				if(c.isMaxHandcard()){
					num=c.countCards('h');
				}
			})
			player.draw(num-player.countCards('h'))
		},
		check:()=>true,
	},
	sgsk_mangtong: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			player:['changeHp'],
		},
		forced:true,
		content:function (){
			event.num=Math.abs(trigger.num);
			if(trigger.num>0)player.draw(event.num);
			else player.chooseToDiscard(event.num,true,'he');
		},
	},
	sgsk_mangtongx: {
		audio: 'sgsk_mangtong',
		inherit:'yb018_zheye',
	},
	sgsk_mushen: {
		audio: 'ext:夜白神略/audio/character:2',
		unique:true,
		enable:'chooseToUse',
		mark:true,
		skillAnimation:true,
		limited:true,
		animationColor:'orange',
		init:function(player){
			player.storage.sgsk_mushen=false;
		},
		filter:function(event,player){
			if(!player.countCards('h'))return false;
			if(player.storage.sgsk_mushen) return false;
			if(event.type=='dying'){
				if(player!=event.dying) return false;
				return true;
			}
			return false;
		},
		check:(event,player)=>{
			return player.countCards('h',function(c){return get.suit(c)=='club'})>0;
		},
		content:function(){
			'step 0'
			player.awakenSkill('sgsk_mushen');
			player.storage.sgsk_mushen=true;
			event.cards=player.getCards('h').filter(c=>get.suit(c)=='club');
			'step 1'
			player.discard(player.getCards('h'));
			'step 2'
			if(event.cards.length>0){
				player.recover(event.cards.length);
			}
			'step 3'
			player.turnOver(false);
			player.link(false);
		},
	},
	sgsk_mushenx: {
		audio: 'sgsk_mushen',
		unique:true,
		enable:'chooseToUse',
		mark:true,
		skillAnimation:true,
		limited:true,
		animationColor:'orange',
		init:function(player){
			player.storage.sgsk_mushenx=false;
		},
		check:(event,player)=>{
			return player.countCards('h',function(c){return get.suit(c)=='club'})>0;
		},
		filter:function(event,player){
			if(!player.countCards('h'))return false;
			if(player.storage.sgsk_mushenx) return false;
			if(event.type=='dying'){
				if(player!=event.dying) return false;
				return true;
			}
			return false;
		},
		content:function(){
			'step 0'
			player.awakenSkill('sgsk_mushenx');
			player.storage.sgsk_mushenx=true;
			event.cards=player.getCards('h').filter(c=>get.suit(c)=='club');
			'step 1'
			player.discard(player.getCards('h'));
			'step 2'
			if(event.cards.length>0){
				player.YB_recover(event.cards.length);
			}
			'step 3'
			player.turnOver(false);
			player.link(false);
		}
	},
	//---------后土
	sgsk_yutu: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			player:'damageAfter'
		},
		filter(event,player){
			return true;
		},
		check(){return true},
		content(){
			var num=0;
			if(!player.countCards('h'))num++;
			if(!player.countCards('e'))num++;
			if(!player.countCards('j'))num++;
			if(num<=0)num=1;
			player.draw(num);
		},
	},
	sgsk_yutux: {
		audio: 'sgsk_yutu',
		// trigger:{
		// 	player:'damageAfter'
		// },
		//懒得写了
	},
	sgsk_shengtu: {
		audio: 'ext:夜白神略/audio/character:2',
		enable:'chooseToUse',
		filterCard:function(card){
			return get.type(card)=='equip';
		},
		position:'hes',
		viewAs:{name:'wuzhong'},
		viewAsFilter:function(player){
			if(!player.countCards('hes',function(card){
				return get.type(card)=='equip';
			})) return false;
		},
		prompt:'将一张装备牌当无中生有使用',
		check:function(card){return 4-get.value(card)}
	},
	//---------禺强
	sgsk_zhihai: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: { global: 'phaseBegin' },
		filter: function (event, player) {
			var tar = event.player;
			if (player == tar) return false;
			return true;
		},
		content: function () {
			'step 0'
			player.storage.sgsk_zhihai_list = ui.cardPile;
			player.storage.sgsk_zhihai_list2 = ui.discardPile;
			'step 1'
			ui.cardPile = player.storage.sgsk_zhihai_list2;
			ui.discardPile = player.storage.sgsk_zhihai_list;
		},
	},
	sgsk_xuanming: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: { global: 'phaseAfter' },
		filter: function (event, player) {
			return true;
		},
		content: function () {
			'step 0'
			var discarded = get.discarded();
			if (discarded.length) {
				var next = player.chooseToMove();
				next.set('list', [
					['弃牌堆顶（翻过来后就是牌堆底）', discarded],
					['弃牌堆底（翻过来后就是牌堆顶）'],
				]);
				next.set('prompt', '玄冥：选择任意张牌，以任意顺序置于弃牌堆底（翻过来之后就成了牌堆顶）').set('processAI', function (list) {
					var player = _status.event.player, cards = list[0][1].sort(function (a, b) {
						return get.useful(a) - get.useful(b);
					}), cards2 = cards.splice(0, Math.ceil(discarded.length / 2));
					return [cards2, cards];
				});
				// player.chooseCardButton('选择任意张牌，以任意顺序置于弃牌堆底（翻过来之后就成了牌堆顶）',[0,Infinity],discarded).set('ai',function(button){
				// 	return 6-get.value(button.link);
				// });
			}
			else {
				event.finish();
			}
			'step 1'
			// console.log(result);
			if (result.moved) {
				var top = result.moved[1];
				var bottom = result.moved[0];
				top.reverse();
				for (var i = 0; i < top.length; i++) {
					ui.discardPile.insertBefore(top[i], ui.discardPile.firstChild);
				}
				for (i = 0; i < bottom.length; i++) {
					ui.discardPile.appendChild(bottom[i]);
				}
				player.popup(get.cnNumber(top.length) + '上' + get.cnNumber(bottom.length) + '下');
				game.log(player, '将' + get.cnNumber(top.length) + '张牌置于牌堆顶');
				game.updateRoundNumber();
				game.delayx();
			}//QQQ
		},
	},
	//---------伏羲//测试完成
	sgsk_yuhan: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			player:'damageAfter',
		},
		filter(event,player){
			return true;
		},
		cost(){
			event.result = player.chooseToDiscard('he').set("chooseonly", true).forResult();
		},
		content(){
			'step 0'
			player.discard(event.cards);
			'step 1'
			player.recover();
		}
	},
	sgsk_jiabian: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: "judge",
		},
		audio: true,
		direct: true,
		lastDo: true,
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
	//---------相柳
	sgsk_jiushou: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: { player: "dying" },
		forced: true,
		// group: "sanku_nogain",
		content() {
			"step 0";
			player.loseMaxHp();
			"step 1";
			var num = player.maxHp - player.hp;
			if (num > 0) player.recover(num);
		},
		ai: { halfneg: true },
	},
	//---------后羿
	sgsk_sheri: {
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		mod:{
			targetInRange(card, player, target, now) {
				var name = get.name(card);
				if (name == "sha") return true;
			},
		},
		trigger: { player: "useCardToTargeted" },
		logTarget: "target",
		locked: false,
		check(event, player) {
			return get.attitude(player, event.target) <= 0;
		},
		filter(event, player) {
			if (event.card.name != "sha") return false;
			return true;
		},
		async content(event, trigger, player) {
			if(!player.inRange(trigger.target))trigger.getParent().directHit.push(trigger.target);
			else{
				const id = trigger.target.playerid;
				const map = trigger.getParent().customArgs;
				if (!map[id]) map[id] = {};
				if (typeof map[id].extraDamage != "number") {
					map[id].extraDamage = 0;
				}
				map[id].extraDamage++;
			}
		},
	},
	//---------------大禹
	sgsk_zhishui: {
		audio: 'ext:夜白神略/audio/character:2',
		usable: 1,
		enable: 'phaseUse',
		selectTarget: function (event, player) {
			var num = player.hp;
			return [1, num];
		},
		content: function () {
			'step 0'
			var cards = target.getCards('he');
			event.num = cards.length;
			target.discard(cards);
			'step 1'
			target.draw(event.num);
		}
	},
	//---------夸父
	sgsk_zhuiri: {//实测不影响游玩
		audio: 'ext:夜白神略/audio/character:2',
		group: ["sgsk_zhuiri_summer"],
		audio: 2,
		// trigger: {
		// 	player: "useCard2",
		// },
		forced: true,
		mod: {
			globalFrom(from, to, distance) {
				if (_status.currentPhase == from) {
					return distance - from.storage.sgsk_zhuiri;
				}
			},
		},
		init(player) {
			player.storage.sgsk_zhuiri = 0;
			player.markSkill('sgsk_zhuiri');
		},
		trigger:{
			player:'phaseJieshuBefore'
		},
		filter(trigger, player) {
			return (
				!game.hasPlayer(function (current) {
					return get.distance(player, current)>1;
				})
			);
		},
		marktext:'追',
		intro:{
			content(event,player,storage,name,skill){
				var storage = player.storage.sgsk_zhuiri;
				return '计算至其他角色的距离-'+storage;
			}
		},
		content(){
			var winners = player.getFriends();
			game.over(player == game.me || winners.includes(game.me));
		},
		subSkill:{
			summer: {
				trigger: { player: ["phaseAfter", "useCard"] },
				silent: true,
				filter(event, player) {
					var evt = event.getParent("phaseUse");
					if (!evt || evt.player != player) return player == _status.currentPhase;
					return true;
				},
				content() {
					if (trigger.name == "phase") {
						player.storage.sgsk_zhuiri = 0;
						return;
					} else if (event.triggername == "useCard") {
						player.logSkill("sgsk_zhuiri");
						player.storage.sgsk_zhuiri++;
						player.syncStorage("sgsk_zhuiri");
						return;
					}
				},
			},
		},
	},
	sgsk_zhuirix: {
		inherit:'sgsk_zhuiri',
		audio: 'sgsk_zhuiri',
		content(){
			var num = game.countPlayer();
			player.draw(num||1);
		},
	},
	//---------土伯
	sgsk_xuemu: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			player:'damageAfter',
		},
		getIndex(event,player){
			return event.num;
		},
		cost(){
			event.result = player.chooseToDiscard('he',[1,Infinity]).set('filterCard',function(card){
				return get.color(card)=='red';
			}).set('prompt2',get.prompt2('sgsk_xuemu')).set("chooseonly", true).forResult();
		},
		content(){
			'step 0'
			player.discard(event.cards);
			'step 1'
			player.draw(event.cards.length*2);
		}
	},
	sgsk_jiuqu: {
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		mod: {
			maxHandcardBase(player, num) {
				return 9;
			},
		},
	},
	//---------精卫
	sgsk_xianmu: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			global:'loseAfter',
		},
		filter:(event,player)=>{
			if(event.type!='discard') return false;
			if(event.player==player) return false;
			var cards = event.cards.filter(i=>get.position(i,true)=='d');
			if(cards.length>0)return true;
			return false;
		},
		async cost(event,trigger,player){
			var dialog = ui.create.dialog('衔木');
			dialog.addText('选择一张获得或置入任意装备栏');
			dialog.add(trigger.cards.filter(i=>get.position(i,true)=='d'));
			dialog.add([['获得','武器','防具','防马','攻马','宝物','双格马'],'tdnodes'])
			event.result = await player.chooseButton(dialog,2).set('filterButton',function(button){
				var type=typeof button.link;
				if(ui.selected.buttons.length&&type==typeof ui.selected.buttons[0].link) return false;
				return true;
			}).set('ai',function(button){
				var type=typeof button.link;
				if(type == 'string')return '获得';
				else return get.value(button.link);
			}).forResult();
			event.result.cost_data = event.result.links;
		},
		async content(event,trigger,player){
			let links=event.cost_data;
			if(typeof links[0]=='string'){
				links = [links[1],links[0]];
			}
			var type = null;
			// switch(links[1]){
			// 	case '武器':type = 'equip1';break;
			// 	case '防具':type = 'equip2';break;
			// 	case '防马':type = 'equip3';break;
			// 	case '攻马':type = 'equip4';break;
			// 	case '宝物':type = 'equip5';break;
			// 	case '双格马':type = 'equip6';break;
			// 	default :type = null;break;
			// }
			const sub = ['武器', '防具', '防马', '攻马', '宝物', '双格马'];
			type = sub.includes(links[1])?'equip'.concat(sub.indexOf(links[1])+1):null;
			if(type == null){
				await player.gain(links[0],'gain2');
			}
			else {
				const card = get.autoViewAs(links[0]);
				card.subtypes = [type];
				await player.equip(card);
			}
		},
		group:'sgsk_xianmu_pu',
		subSkill:{
			pu:{
				audio: 'sgsk_xianmu',
				trigger:{
					player:'phaseUseBegin',
				},
				filter:(event,player)=>{
					if(ui.discardPile.hasChildNodes()) return true;
					return false;
				},
				async cost(event,trigger,player){
					var source = ui.discardPile.childNodes;
					var list = [];
					for (var i = 0; i < source.length; i++) list.push(source[i]);
					var dialog = ui.create.dialog('衔木');
					dialog.addText('选择一张获得或置入任意装备栏');
					dialog.add(list);
					dialog.add([['获得','武器','防具','防马','攻马','宝物','双格马'],'tdnodes'])
					event.result = await player.chooseButton(dialog,2).set('filterButton',function(button){
						var type=typeof button.link;
						if(ui.selected.buttons.length&&type==typeof ui.selected.buttons[0].link) return false;
						return true;
					}).set('ai',function(button){
						var type=typeof button.link;
						if(type == 'string')return '获得';
						else return get.value(button.link);
					}).forResult();
					event.result.cost_data = event.result.links;
				},
				async content(event,trigger,player){
					let links=event.cost_data;
					if(typeof links[0]=='string'){
						links = [links[1],links[0]];
					}
					var type = null;
					// switch(links[1]){
					// 	case '武器':type = 'equip1';break;
					// 	case '防具':type = 'equip2';break;
					// 	case '防马':type = 'equip3';break;
					// 	case '攻马':type = 'equip4';break;
					// 	case '宝物':type = 'equip5';break;
					// 	case '双格马':type = 'equip6';break;
					// 	default :type = null;break;
					// }
					const sub = ['武器', '防具', '防马', '攻马', '宝物', '双格马'];
					type = sub.includes(links[1])?'equip'.concat(sub.indexOf(links[1])+1):null;
					if(type == null){
						await player.gain(links[0],'gain2');
					}
					else {
						const card = get.autoViewAs(links[0]);
						card.subtypes = [type];
						await player.equip(card);
					}
				},
				
			}
		},
	},
	sgsk_tianhai: {
		audio: 'ext:夜白神略/audio/character:2',
		usable(skill,player){
			// return player.countCards('e',c=>get.type(c)!='equip');
			return player.countCards('e');
		},
		enable:'chooseToUse',
		filter: function (event, player) {
			if(player.countCards('e')<=0)return false;
			if (player.countCards('e',c=>get.type(c)!='equip')<=0) return false;
			var evt=lib.filter.filterCard;
			var cards =player.getCards('e',c=>get.type(c)!='equip')
			for (var i of cards) {
				if (evt({ name: get.name(i) }, player, event)) return true;
			};
			return false;
		},
		hiddenCard: function (player, name) {
			if(player.countCards('e')<=0)return false;
			var cards = player.getCards('e',c=>get.type(c)!='equip')
			// var names=[];
			if(cards.length)for(var i of cards){
				// names.push()
				if(get.name(i)==name)return true;
			}
			// return names.includes(name);
		},
		chooseButton: {
			dialog: function (event,player) {
				var list = [];
				var cards = player.getCards('e',c=>get.type(c)!='equip');
				for (var i = 0; i < cards.length; i++) {
					list.push(['填海', '', get.name(cards[i]), get.nature(cards[i])]);
				}
				var dialog = ui.create.dialog("填海", [list, "vcard"], "hidden");
				// dialog.direct = true;
				return dialog;
			},
			filter:function (button,player){
				return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
			},
			backup: function (links, player) {
				return {
					// filterCard(card, player) {
					// 	return get.type2(card) == "basic";
					// },
					// filterCard(){return false},
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
					},
					position:'hs',
					selectCard: 1,
					filterCard: function (card, player) {
						return true;
					},
					precontent: function () {
						player.logSkill("sgsk_tianhai");
					},
				};
			},
			prompt: function (links, player) {
				return "填海：将一张手牌当作【" + (links[0][3] ? get.translation(links[0][3]) : '') + get.translation(links[0][2]) + "】使用？";
			},
		},
		// enable:'phaseUse',
		// filterCard(card, player) {
		// 	return !ui.selected.cards.some(cardx => get.suit(cardx, player) == get.suit(card, player));
		// },
		// position:'he',
		// selectCard:4,
		// selectTarget:[1,4],
		// filterTarget(card, player, target){
		// 	if(target==player) return target.hasCard(card => lib.filter.canBeDiscarded(card, player, target)&&!ui.selected.cards.includes(card), "he")
		// 	return target.hasCard(card => lib.filter.canBeDiscarded(card, player, target), "he");
		// },
		// complexCard: true,
		// complexSelect: true,
		// multitarget:true,
		// multiline: true,
		// async content(event,trigger,player){
		// 	// let targets=result.targets;
		// 	// console.log(trigger,targets);
		// 	await targets.sortBySeat();
		// 	let list = {}
		// 	var dialog = ui.create.dialog('填海');
		// 	for(var target of targets){
		// 		if(target.countCards(card => lib.filter.canBeDiscarded(card, player, target), "he")<=0)targets.remove(target);
		// 		else {
		// 			list[target]=target.getCards(card => lib.filter.canBeDiscarded(card, player, target),'he');
		// 			dialog.addText(get.translation(target),'title');
		// 			dialog.add(list[target]);
		// 		}
		// 	}
		// 	if(Object.keys(list)){
		// 		var listy = Object.keys(list);
		// 		event.result = await player.chooseButton(dialog,listy.length,true).set('filterButton',function(button){
		// 			var listx = ui.selected.buttons;
		// 			var listz = [];
		// 			if(listx.length>0){
		// 				for(var i of listy){
		// 					for(var k of list[i]){
		// 						if(listx.includes(k)){
		// 							listz.push(listy[i]);
		// 						}
		// 					}
		// 					// if(list[1].includes())
		// 				}
		// 				return !listz.includes(button);
		// 			}
		// 			else return true;
		// 		}).forResult();
		// 		if(result.bool&&result.links){
		// 			await game.loseAsync({ lose_list: result.links }).setContent("discardMultiple");
		// 			if(targets.includes(player)){
		// 				await player.recover();
		// 			}
		// 		}
		// 	}
		// 	// else {
		// 	// 	event.finish();
		// 	// }
		// },
		// content(){
		// 	'step 0'
		// 	console.log(targets);
		// 	targets.sortBySeat();
		// 	'step 1'
		// 	let list = {}
		// 	var dialog = ui.create.dialog('填海');
		// 	for(var target of targets){
		// 		if(target.countCards('he',card => lib.filter.canBeDiscarded(card, player, target))<=0)targets.remove(target);
		// 		else {
		// 			list[target.playerid]=target.getCards('he',card => lib.filter.canBeDiscarded(card, player, target));
		// 			dialog.add(get.translation(target),'title');
		// 			dialog.add(target.getCards('he',card => lib.filter.canBeDiscarded(card, player, target)));
		// 		}
		// 	}
		// 	if(Object.keys(list)){
		// 		var listy = Object.keys(list);
		// 		event.result = player.chooseButton(dialog,listy.length,true).set('filterButton',function(button){
		// 			var listx = ui.selected.buttons;
		// 			var listz = [];
		// 			if(listx.length>0){
		// 				for(var i of listy){
		// 					for(var k of list[i]){
		// 						if(listx.includes(k)){
		// 							listz.push(listy[i]);
		// 						}
		// 					}
		// 					// if(list[1].includes())
		// 				}
		// 				return !listz.includes(button);
		// 			}
		// 			else return true;
		// 		});
		// 	}
		// 	else{
		// 		event.finish();
		// 	}
		// 	'step 2'
		// 	if(result.bool&&result.links){
		// 		game.loseAsync({ lose_list: result.links }).setContent("discardMultiple");
		// 		if(targets.includes(player)){
		// 			player.recover();
		// 		}
		// 	}
		// },
	},
	//---------岐伯
	sgsk_suwen: {
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		trigger: { player: "taoBegin" },
		forced: true,
		content() {
			trigger.setContent(lib.skill.sgsk_suwen.taoContent);
		},
		taoContent() {
			'step 0'
			event.baseDamage = target.maxHp - target.hp;
			'step 1'
			target.recover();
		},
	},
	sgsk_lingjiu: {
		audio: 'ext:夜白神略/audio/character:2',
		enable:'chooseToUse',
		filterCard:function(card){
			return get.type(card)=='equip';
		},
		position:'hes',
		viewAs:{name:'tao'},
		viewAsFilter:function(player){
			if(!player.countCards('hes',function(card){
				return get.type(card)=='equip';
			})) return false;
		},
		prompt:'将一张装备牌当桃使用',
		check:function(card){return 4-get.value(card)}
	},
	//-----------------------------太子长琴
	'sgsk_yuefeng': {
		preHidden: true,
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'phaseJieshuBefore',
		},
		filter: function (event, player) {
			return !event.numFixed;
		},
		frequent: true,
		content: function () {
			player.YB_shelie(3, '乐风');
		},
		ai: {
			threaten: 1.2,//嘲讽值
		},
	},
	'sgsk_zhisheng': {
		preHidden: true,
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			global: 'useCardAfter',
		},
		filter: function (event, player) {
			if (player.countCards('hes') == 0) return false;
			if (event.player != player && event.card.isCard && event.player.isPhaseUsing()) {
				return event.player.getHistory('useCard').indexOf(event) == player.hp - 1;
			}
		},
		check: function (event, player) {
			return get.attitude(player, event.player) < 0;
		},
		// nopop:true,
		async cost(event, trigger, player) {
			event.result = await player.chooseToDiscard('he').forResult();
		},
		content: function () {
			// 'step 0'
			// player.chooseToDiscard('he');
			// 'step 1'
			// if(result.bool){
			// player.logSkill('sgsk_zhisheng')
			var evt = _status.event.getParent('phaseUse');
			if (evt && evt.name == 'phaseUse') {
				evt.skipped = true;
				event.finish();
			}
			// }
		},
		ai: {
			result: {
				player: -0.5,
				target: function (target) {
					return -0.5 * (Math.pow(target.countCards('h') - target.maxHandcard))
				},
			},
			threaten: 3,//嘲讽值
			expose: 1,//跳立场
		},
	},
	//---------噎鸣
	sgsk_cunyin: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			player:'sgsk_sanqiuok',
		},
		filter(){
			return true;
		},
		content(){
			player.logSkill('sgsk_cunyin');
			player.addMark('sgsk_cunyin',1,false);
		},
		direct:true,
		// popup:true,
		mark:true,
		marktext:'阴',
		intro:{
			content:'攻击范围加$',
		},
	},
	sgsk_sanqiu: {
		audio: 'ext:夜白神略/audio/character:2',
		subSkill:{
			storage:{
				charlotte:true,
				onremove:true,
				mark:true,
				marktext:'秋',
				intro:{
					content:'本阶段已使用过$牌。'
				},
			}
		}
	},
	sgsk_sanqiux: {
		audio: 'sgsk_sanqiu',
	},
	sgsk_sanqiuy: {
		audio: 'sgsk_sanqiu',
		trigger: { player: ["useCardAfter"] },
		filter(event, player) {
			var evt = event.getParent("phaseUse");
			if (!evt || evt.player != player) return false;
			return true;
		},
		nopop:true,
		cost(){
			if(!player.hasSkill('sgsk_sanqiu_storage')){
				player.addTempSkill('sgsk_sanqiu_storage',{player:['phaseUseAfter']})
				player.storage.sgsk_sanqiu_storage=[];
			}
			if(!player.storage.sgsk_sanqiu_storage.includes(get.type2(trigger.card))&&['trick','basic','equip'].includes(get.type2(trigger.card))){
				player.storage.sgsk_sanqiu_storage.push(get.type2(trigger.card));
			}
			if(player.storage.sgsk_sanqiu_storage.length&&player.storage.sgsk_sanqiu_storage.length==3){
				event.result = player.chooseBool(get.prompt2('sgsk_sanqiuy')).set('ai',function(){return true}).forResult();
			}
		},
		content() {
			'step 0'
			trigger.trigger('sgsk_sanqiuok');
			var evt=_status.event.getParent('phaseUse');
			if(evt&&evt.name=='phaseUse'&&trigger.player.isPhaseUsing()){
				evt.skipped=true;
			}
			player.when('phaseUseAfter').then(function(){
				player.draw(3);
				var next=player.phaseUse();
				event.next.remove(next);
				trigger.next.push(next);
			})
		},
	},
	//---------------------------应龙
	sgsk_zongshuit: {
		audio: 'sgsk_zongshui',
	},
	'sgsk_zongshui': {
		audio: 'ext:夜白神略/audio/character:2',
		enable: 'phaseUse',
		usable: 1,
		animationColor: 'thunder',
		skillAnimation: true,
		filterCard: function (card) {
			var suit = get.suit(card);
			for (var i = 0; i < ui.selected.cards.length; i++) {
				if (get.suit(ui.selected.cards[i]) == suit) return false;
			}
			return true;
		},
		selectCard: [1, Infinity],
		complexCard: true,
		filterTarget: function (card, player, target) {
			return player != target && target.countDiscardableCards(player, get.is.single() ? 'he' : 'hej');
		},
		selectTarget: [1, Infinity],
		content: function () {
			'step 0'
			player.discardPlayerCard(target, 'he', 1, true);
			'step 1'
			event.card = result.cards[0];
			event.cards = cards;
			for (var i of event.cards) {
				var t = get.suit(i, false);
				if (get.suit(event.card) == t) {
					target.addTempSkill('sgsk_zongshui_mo');
				}
			}
		},
		check: function (card) {
			return 6 - get.value(card);
		},
		position: 'he',
		ai: {
			threaten: 1.5,//嘲讽值
			damage: true,
			expose: 1,//跳立场
			order: 8,//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
			result: {//主动技的收益
				player: function (player, target) {
					return 1;
				},
				target: function (player, target) {
					return get.damageEffect(target, player);
				},
			},
		},
		subSkill: {
			mo: {
				mark: true,
				mod: {
					cardEnabled: function () {
						return false;
					},
					cardRespondable: function () {
						return false;
					},
					cardSavable: function () {
						return false;
					}
				},
				intro: {
					content: '不能使用或打出卡牌'
				}
			}
		}
	},
	//-----------------------女魃
	'sgsk_buyu': {
		preHidden: true,
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			global: 'phaseZhunbeiBegin',
		},
		check: function (event, player) {
			if (get.attitude(player, event.player) < -2) {
				var cards = player.getCards('h');
				if (cards.length > player.hp) return true;
				for (var i = 0; i < cards.length; i++) {
					var useful = get.useful(cards[i]);
					if (useful < 5) return true;
					if (cards[i].number > 9 && useful < 7) return true;
				}
			}
			return false;
		},
		logTarget: 'player',
		filter: function (event, player) {
			return player.canCompare(event.player);
		},
		content: function () {
			'step 0'
			player.chooseToCompare(trigger.player);
			'step 1'
			if (result.bool) {
				trigger.player.addTempSkill('sgsk_buyu2')
			}
		},
		ai: {
			threaten: 3,//嘲讽值
			expose: 1,//跳立场
		},
	},
	'sgsk_hanshen': {
		preHidden: true,
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			global: ['equipAfter', 'addJudgeAfter', 'loseAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
		},
		forced: true,
		filter: function (event, player) {
			return game.hasPlayer(function (current) {
				var evt = event.getl(current);
				return evt && evt.hs && evt.hs.length && current.countCards('h') == 0;
			});
		},
		content: function () {
			player.draw();
		},
		ai: {
			threaten: 1.3,//嘲讽值
			noh: true,
		},
	},
	'sgsk_hanshenx': {
		preHidden: true,
		audio: 'sgsk_hanshen',
		trigger: {
			global: ['YB_anyEnd'],
		},
		forced: true,
		filter: function (event, player) {
			return game.hasPlayer(function (current) {
				return current.countCards('h') == 0;
			});
		},
		content: function () {
			player.draw();
		},
		ai: {
			threaten: 1.3,//嘲讽值
			// noh:true,
		},
	},
	'sgsk_buyu2': {
		audio: 'sgsk_buyu',
		trigger: {
			player: 'phaseDrawBefore',
		},
		forced: true,
		content: function () {
			trigger.cancel();
		},
	},
	//---------蚩尤
	sgsk_zhanshen: {
		audio: 'ext:夜白神略/audio/character:2',
		// locked:true,
		forced:true,
		trigger:{
			player:'useCardAfter',
		},
		filter(event,player){
			var evt = event.getParent("phaseUse");
			if (!evt || evt.player != player) return false;
			return true;
		},
		// cost(){
		// },
		content(){
			'step 0'
			player.chooseTarget(true,'请选择对一名角色造成1点伤害').set('ai',function(target){
				return get.damageEffect(target, player, player);
			})
			'step 1'
			if(result.bool)result.targets[0].damage();
		},
		group:'sgsk_zhanshen_debuff',
		subSkill:{
			debuff:{
				trigger: { player: "phaseAfter" },
				forced: true,
				filter(event, player) {
					return !player.getStat("kill")||player.getStat("kill") <= 0;
				},
				content() {
					player.damage();
				},
			}
		}
	},
	sgsk_shizhan: {
		// audio: 'sgsk_zhanshen',
		// forced:true,
		// trigger:{
		// 	player:'useCard',
		// },
		// filter(event,player){
		// 	var evt = event.getParent("phaseUse");
		// 	if (!evt || evt.player != player) return false;
		// 	return true;
		// },
		// cost(){
		// 	event.result = player.chooseTarget(true,'请选择对一名角色造成1点伤害').set('ai',function(target){
		// 		return get.damageEffect(target, player, player);
		// 	})
		// },
		// content(){
		// 	event.targets[0].damage();
		// },
		// group:'sgsk_shizhan_debuff',
		// subSkill:{
		// 	debuff:{
		// 		trigger: { global: "phaseAfter" },
		// 		forced: true,
		// 		filter(event, player) {
		// 			return player.getStat("kill") <= 0;
		// 		},
		// 		content() {
		// 			player.damage();
		// 		},
		// 	}
		// }
	},
	//---------风后
	sgsk_sinan: {
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'judgeEnd',
		},
		filter: function (event, player) {
			return get.suit(event.result.card) == 'heart'
		},
		content: function () {
			player.recover(1);
		},
	},
	sgsk_shence: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			player:'damageEnd',
			source:'damageSource',
		},
		filter(event,player){
			return true;
		},
		async content(event,trigger,player){
			var result = await player.judge(function(card){
				if(get.type2(card)=='trick') return 2;
				return -1;
			}).forResult();
			if(result&&get.type2(result.card)=='trick'){
				var result2 = await player.chooseTarget(1,true,'令一名角色翻面并摸两张牌。').set("ai", target => {
					if (target.hasSkillTag("noturn")) return 0;
					const player = _status.event.player;
					const current = _status.currentPhase;
					const dis = current ? get.distance(current, target, "absolute") : 1;
					const draw = 2;
					const att = get.attitude(player, target);
					if (att == 0) return target.hasJudge("lebu") ? Math.random() / 3 : Math.sqrt(get.threaten(target)) / 5 + Math.random() / 2;
					if (att > 0) {
						if (target.isTurnedOver()) return att + draw;
						if (draw < 4) return -1;
						if (current && target.getSeatNum() > current.getSeatNum()) return att + draw / 3;
						return (10 * Math.sqrt(Math.max(0.01, get.threaten(target)))) / (3.5 - draw) + dis / (2 * game.countPlayer());
					} else {
						if (target.isTurnedOver()) return att - draw;
						if (draw >= 5) return -1;
						if (current && target.getSeatNum() <= current.getSeatNum()) return -att + draw / 3;
						return (4.25 - draw) * 10 * Math.sqrt(Math.max(0.01, get.threaten(target))) + (2 * game.countPlayer()) / dis;
					}
				}).forResult();
				if(result2.bool){
					result2.targets[0].turnOver();
					result2.targets[0].draw(2);
				}
			}
		}
	},
	sgsk_shencex: {
		audio: 'sgsk_shence',
	},
	//---------九天玄女
	sgsk_taolue: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: { player: ["phaseJieshuBegin",'damageAfter'], },
		// direct: true,
		// content() {
		// 	"step 0";
		// 	player.chooseTarget(get.prompt("zhiyan"), "令一名角色摸一张牌并展示之。若为红桃，其回复1点体力").set("ai", function (target) {
		// 		return get.attitude(_status.event.player, target) * (target.isDamaged() ? 2 : 1);
		// 	});
		// 	"step 1";
		// 	if (result.bool) {
		// 		event.target = result.targets[0];
		// 		player.logSkill("xinzhiyan", result.targets);
		// 		event.bool = false;
		// 		event.target.draw("visible");
		// 	} else {
		// 		event.finish();
		// 	}
		// 	"step 2";
		// 	var card = result[0];
		// 	event.card = card;
		// 	if (get.type(card) == "basic") player.draw();
		// 	"step 3";
		// 	if (get.type(card) == "equip") {
		// 		if (target.getCards("h").includes(card) && target.hasUseTarget(card)) {
		// 			event.target.chooseUseTarget(card, true, "nopopup");
		// 			game.delay();
		// 		}
		// 		event.bool = true;
		// 	}
		// 	"step 4";
		// 	if (event.bool) target.recover();
		// },
		cost(){
			event.result = player.chooseTarget(get.prompt("zhiyan"), "令一名角色摸一张牌并展示之。若为红桃，其回复1点体力").set("ai", function (target) {
				return get.attitude(_status.event.player, target) * (target.isDamaged() ? 2 : 1);
			}).forResult();
		},
		content(){
			'step 0'
			event.target = event.targets[0];
			player.line(event.target);
			event.target.draw("visible");
			'step 1'
			var card = result[0];
			if (get.suit(card) == "heart") event.target.recover();
		},
		ai: {
			expose: 0.2,
			threaten: 1.2,
		},
	},
	sgsk_xuanji: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'useCardAfter',
		},
		filter: (event, player) => player.isPhaseUsing() && event.cards.filterInD().length,
		async content(event, trigger, player) {
			const cards = trigger.cards.filterInD()
			if (!cards.length) return //预判一手会有人从处理区捡牌
			var result = await player.chooseToMove()
				.set('list', [['牌堆顶', cards], ['牌堆底']])
				.set('prompt', '点击或拖动将牌移动到牌堆顶或牌堆底')
				.set('processAI', list => {
					let cards = list[0][1],
						player = _status.event.player,
						next = (_status.currentPhase || player).next, //都是谁在往别人回合插自己阶段啊
						top = []
					for (const card of cards)
						if (player.hasCard(cardx => get.tag(cardx,'draw'))) {
							if (get.value(card) > 6.5) top.add(card)
						}
						else {
							if (get.attitude(player, next) > 0 && get.value(card) > 6.5) top.add(card)
							if (get.attitude(player, next) < 0 && get.value(card) < 5.5) top.add(card)
						}
					if (_status.currentPhase == player && (!ui.cardPile.firstChild.isKnownBy(player) || get.suit(ui.cardPile.firstChild) != 'heart')) {
						const heart = cards.filter(card => get.suit(card) == 'heart').sort((a, b) => get.value(b) - get.value(a))[0]
						if (heart) {
							top.remove(heart)
							top.unshift(heart)
						}
					}
					return [top, cards.removeArray(top)]
				})
			var top = result.moved[0];
			var bottom = result.moved[1];
			top.reverse();
			for (var i = 0; i < top.length; i++) {
				ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
			}
			for (i = 0; i < bottom.length; i++) {
				ui.cardPile.appendChild(bottom[i]);
			}
			event.result = {
				bool: true,
				moved: [top, bottom],
			};
			game.addCardKnower(top, player);
			game.addCardKnower(bottom, player);
			player.popup(get.cnNumber(top.length) + "上" + get.cnNumber(bottom.length) + "下");
			game.log(player, "将" + get.cnNumber(top.length) + "张牌置于牌堆顶");
			game.updateRoundNumber();
			game.delayx();

		}
	},
	sgsk_xuanjix: {
		audio: 'sgsk_xuanji',
		trigger: {
			player: 'useCardAfter',
		},
		filter: (event, player) => player.isPhaseUsing() && event.cards.filterInD().length && !player.storage.sgsk_xuanjix_1?.includes(event.vard.name),
		async content(event, trigger, player) {
			const cards = trigger.cards.filterInD()
			if (!cards.length) return //预判一手会有人从处理区捡牌
			var result = await player.chooseToMove()
				.set('list', [['牌堆顶', cards], ['牌堆底']])
				.set('prompt', '点击或拖动将牌移动到牌堆顶或牌堆底')
				.set('processAI', list => {
					let cards = list[0][1],
						player = _status.event.player,
						next = (_status.currentPhase || player).next, //都是谁在往别人回合插自己阶段啊
						top = []
					for (const card of cards)
						if (player.hasCard(cardx => get.tag(cardx,'draw'))) {
							if (get.value(card) > 6.5) top.add(card)
						}
						else {
							if (get.attitude(player, next) > 0 && get.value(card) > 6.5) top.add(card)
							if (get.attitude(player, next) < 0 && get.value(card) < 5.5) top.add(card)
						}
					if (_status.currentPhase == player && (!ui.cardPile.firstChild.isKnownBy(player) || get.suit(ui.cardPile.firstChild) != 'heart')) {
						const heart = cards.filter(card => get.suit(card) == 'heart').sort((a, b) => get.value(b) - get.value(a))[0]
						if (heart) {
							top.remove(heart)
							top.unshift(heart)
						}
					}
					return [top, cards.removeArray(top)]
				})
			var top = result.moved[0];
			var bottom = result.moved[1];
			top.reverse();
			for (var i = 0; i < top.length; i++) {
				ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
			}
			for (i = 0; i < bottom.length; i++) {
				ui.cardPile.appendChild(bottom[i]);
			}
			event.result = {
				bool: true,
				moved: [top, bottom],
			};
			game.addCardKnower(top, player);
			game.addCardKnower(bottom, player);
			player.popup(get.cnNumber(top.length) + "上" + get.cnNumber(bottom.length) + "下");
			game.log(player, "将" + get.cnNumber(top.length) + "张牌置于牌堆顶");
			game.updateRoundNumber();
			game.delayx();
			player.storage.sgsk_xuanjix_1 ??= []
			player.storage.sgsk_xuanjix_1.add(trigger.card.name)
			player.addTempSkill('sgsk_xuanjix_1')
		},
		subSkill: {
			1: {
				onremove: true,
				charlotte: true
			}
		}
	},
	sgsk_xuanjiy: {
		audio: 'sgsk_xuanji',
		trigger: {
			player: 'useCardAfter',
		},
		usable: 1,
		filter: (event, player) => event.cards.filterInD().length,
		async content(event, trigger, player) {
			const cards = trigger.cards.filterInD()
			if (!cards.length) return //预判一手会有人从处理区捡牌
			var result = await player.chooseToMove()
				.set('list', [['牌堆顶', cards], ['牌堆底']])
				.set('prompt', '点击或拖动将牌移动到牌堆顶或牌堆底')
				.set('processAI', list => {
					let cards = list[0][1],
						player = _status.event.player,
						next = (_status.currentPhase || player).next, //都是谁在往别人回合插自己阶段啊
						top = []
					for (const card of cards)
						if (player.hasCard(cardx => get.tag(cardx,'draw'))) {
							if (get.value(card) > 6.5) top.add(card)
						}
						else {
							if (get.attitude(player, next) > 0 && get.value(card) > 6.5) top.add(card)
							if (get.attitude(player, next) < 0 && get.value(card) < 5.5) top.add(card)
						}
					if (_status.currentPhase == player && (!ui.cardPile.firstChild.isKnownBy(player) || get.suit(ui.cardPile.firstChild) != 'heart')) {
						const heart = cards.filter(card => get.suit(card) == 'heart').sort((a, b) => get.value(b) - get.value(a))[0]
						if (heart) {
							top.remove(heart)
							top.unshift(heart)
						}
					}
					return [top, cards.removeArray(top)]
				})
			var top = result.moved[0];
			var bottom = result.moved[1];
			top.reverse();
			for (var i = 0; i < top.length; i++) {
				ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
			}
			for (i = 0; i < bottom.length; i++) {
				ui.cardPile.appendChild(bottom[i]);
			}
			event.result = {
				bool: true,
				moved: [top, bottom],
			};
			game.addCardKnower(top, player);
			game.addCardKnower(bottom, player);
			player.popup(get.cnNumber(top.length) + "上" + get.cnNumber(bottom.length) + "下");
			game.log(player, "将" + get.cnNumber(top.length) + "张牌置于牌堆顶");
			game.updateRoundNumber();
			game.delayx();
		}
	},
	sgsk_xuanjiz: {
		audio: 'sgsk_xuanji',
	},
	//---------螺祖
	sgsk_sangcan: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: 'phaseUse',
		usable: 1,
		filter: () => get.discarded().filterInD('d').length,
		async content(event, trigger, player) {
			player.draw(Math.min(get.discarded().filterInD('d').length, 5))
		},
		ai: {
			order() {
				if (get.discarded().filterInD('d').length >= 5) return 10
				return 1
			},
			result: {
				player: 1
			}
		}
	},
	sgsk_bianjuan: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: 'phaseUse',
		usable: 1,
		filterTarget: (card, player, target) => target.hasCard(card => lib.filter.canBeDiscarded(card, player, target), 'e'),
		async content(event, trigger, player) {
			await player.discardPlayerCard(event.targets[0], 'e', true)
		},
		ai: {
			order: 7,
			result: {
				target: (player, target) => lib.card.guohe_copy.ai.result.target(player, target, { name: 'guohe_copy', position: 'e' })
			}
		}
	},
	sgsk_bianjuanx: {
		audio: 'sgsk_bianjuan',
		enable: 'phaseUse',
		usable: 1,
		filterTarget: (card, player, target) => target.hasCard(card => lib.filter.canBeDiscarded(card, player, target), 'e'),
		async content(event, trigger, player) {
			const target = event.targets[0]
			await player.discardPlayerCard(target, 'e', true)
			await game.asyncDraw([player, target].sortBySeat())
		},
		ai: {
			order: 7,
			result: {
				target: (player, target) => lib.card.guohe_copy.ai.result.target(player, target, { name: 'guohe_copy', position: 'e' }) + 1,
				player: 1
			}
		}
	},
	sgsk_bianjuany:{
		audio: 'sgsk_bianjuan',
		enable: 'phaseUse',
		usable: 1,
		filterTarget: (card, player, target) => target.hasCard(card => lib.filter.canBeDiscarded(card, player, target), 'ej'),
		async content(event, trigger, player) {
			const target = event.targets[0]
			await player.discardPlayerCard(target, 'ej', true)
			await game.asyncDraw([player, target].sortBySeat())
		},
		ai: {
			order: 7,
			result: {
				target: (player, target) => lib.card.guohe_copy.ai.result.target(player, target, { name: 'guohe_copy', position: 'ej' }) + 1,
				player: 1
			}
		}
	},
	//---------仓颉
	sgsk_zuoshu: {
		audio: 'ext:夜白神略/audio/character:2',
		usable:1,
		enable: "chooseToUse",
		getUsed(player) {
			var list = [];
			player.getHistory("useCard", function (evt) {
				list.add(evt.card.name);
			});
			return list;
		},
		onChooseToUse(event) {
			if (game.online || event.sgsk_zuoshu_list) {
				return;
			}
			var list = lib.skill.sgsk_zuoshu.getUsed(event.player);
			event.set("sgsk_zuoshu_list", list);
		},
		hiddenCard(player, name) {
			var list = lib.skill.sgsk_zuoshu.getUsed(player);
			if (list.includes(name)) {
				return false;
			}
			// return player.hasCard(function (card) {
			// 	return get.color(card) == "black" && get.type(card) != "basic";
			// }, "eh");
			return true;
		},
		filter(event,player){
			if(!player.hasCard(function(card){
				return get.color(card) == "black" && get.type(card) != "basic";
			},'hes')) return false;
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;
			for(var i of lib.inpile){
				var type=get.type(i);
				if(evt({name:i},player,event)) return true;
			};
			var list = event.sgsk_zuoshu_list || lib.skill.sgsk_zuoshu.getUsed(player);
			for (var name of lib.inpile) {
				if (list.includes(name)) {
					continue;
				}
				var card = { name: name, isCard: true };
				if (event.filterCard(card, player, event)) {
					return true;
				}
				if (name == "sha") {
					for (var nature of get.YB_natureList()) {
						card.nature = nature;
						if (event.filterCard(card, player, event)) {
							return true;
						}
					}
				}
			}
		},
		chooseButton: {
			dialog(event, player) {
				var vcards = [];
				var list = event.sgsk_zuoshu_list || lib.skill.sgsk_zuoshu.getUsed(player);
				for (var name of lib.inpile) {
					if (list.includes(name)) {
						continue;
					}
					var card = { name: name, isCard: true };
					if (event.filterCard(card, player, event)) {
						vcards.push([get.type(name), "", name]);
					}
					if (name == "sha") {
						for (var nature of get.YB_natureList()) {
							card.nature = nature;
							if (event.filterCard(card, player, event)) {
								vcards.push([get.type(name), "", name, nature]);
							}
						}
					}
				}
				return ui.create.dialog("作书", [vcards, "vcard"], "hidden");
			},
			check(button) {
				if (_status.event.getParent().type != "phase") {
					return 1;
				}
				var player = _status.event.player;
				if (["wugu", "zhulu_card", "yiyi", "lulitongxin", "lianjunshengyan", "diaohulishan"].includes(button.link[2])) {
					return 0;
				}
				return player.getUseValue({
					name: button.link[2],
					nature: button.link[3],
				});
			},
			backup(links, player) {
				return {
					check(card) {
						return 1 / Math.max(0.1, get.value(card));
					},
					filterCard(card) {
						return get.type(card) != "basic" && get.color(card) == "black";
					},
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						// suit: "none",
						// number: null,
						// isCard: true,
					},
					position: "hes",
					popname: true,
					// ignoreMod: true,
					precontent() {
						player.logSkill("sgsk_zuoshu");
						// var card = event.result.cards[0];
						// game.log(player, "将", card, "置于牌堆顶");
						// event.result.card = {
						// 	name: event.result.card.name,
						// 	nature: event.result.card.nature,
						// };
						// event.result.cards = [];
						// player.loseToDiscardpile(card, ui.cardPile, "visible", "insert").log = false;
					},
				};
			},
			prompt(links, player) {
				return "将一张黑色非基本牌当作" + get.translation(links[0][3] || "") + get.translation(links[0][2])+'使用';
			},
		},
	},
	sgsk_zuoshux: {
		audio: 'sgsk_zuoshu',
		audio: 'ext:夜白神略/audio/character:2',
		usable:1,
		enable: "chooseToUse",
		getUsed(player) {
			var list = [];
			player.getHistory("useCard", function (evt) {
				list.add(evt.card.name);
			});
			return list;
		},
		onChooseToUse(event) {
			if (game.online || event.sgsk_zuoshu_list) {
				return;
			}
			var list = lib.skill.sgsk_zuoshu.getUsed(event.player);
			event.set("sgsk_zuoshu_list", list);
		},
		hiddenCard(player, name) {
			var list = lib.skill.sgsk_zuoshu.getUsed(player);
			if (list.includes(name)) {
				return false;
			}
			// return player.hasCard(function (card) {
			// 	return get.color(card) == "black" && get.type(card) != "basic";
			// }, "eh");
			return true;
		},
		filter(event,player){
			if(!player.hasCard(function(card){
				return get.type(card) != "basic";
			},'hes')) return false;
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;
			for(var i of lib.inpile){
				var type=get.type(i);
				if(evt({name:i},player,event)) return true;
			};
			var list = event.sgsk_zuoshu_list || lib.skill.sgsk_zuoshu.getUsed(player);
			for (var name of lib.inpile) {
				if (list.includes(name)) {
					continue;
				}
				var card = { name: name, isCard: true };
				if (event.filterCard(card, player, event)) {
					return true;
				}
				if (name == "sha") {
					for (var nature of get.YB_natureList()) {
						card.nature = nature;
						if (event.filterCard(card, player, event)) {
							return true;
						}
					}
				}
			}
		},
		chooseButton: {
			dialog(event, player) {
				var vcards = [];
				var list = event.sgsk_zuoshu_list || lib.skill.sgsk_zuoshu.getUsed(player);
				for (var name of lib.inpile) {
					if (list.includes(name)) {
						continue;
					}
					var card = { name: name, isCard: true };
					if (event.filterCard(card, player, event)) {
						vcards.push([get.type(name), "", name]);
					}
					if (name == "sha") {
						for (var nature of get.YB_natureList()) {
							card.nature = nature;
							if (event.filterCard(card, player, event)) {
								vcards.push([get.type(name), "", name, nature]);
							}
						}
					}
				}
				return ui.create.dialog("作书", [vcards, "vcard"], "hidden");
			},
			check(button) {
				if (_status.event.getParent().type != "phase") {
					return 1;
				}
				var player = _status.event.player;
				if (["wugu", "zhulu_card", "yiyi", "lulitongxin", "lianjunshengyan", "diaohulishan"].includes(button.link[2])) {
					return 0;
				}
				return player.getUseValue({
					name: button.link[2],
					nature: button.link[3],
				});
			},
			backup(links, player) {
				return {
					check(card) {
						return 1 / Math.max(0.1, get.value(card));
					},
					filterCard(card) {
						return get.color(card) == "black";
					},
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						// suit: "none",
						// number: null,
						// isCard: true,
					},
					position: "hes",
					popname: true,
					// ignoreMod: true,
					precontent() {
						player.logSkill("sgsk_zuoshu");
						// var card = event.result.cards[0];
						// game.log(player, "将", card, "置于牌堆顶");
						// event.result.card = {
						// 	name: event.result.card.name,
						// 	nature: event.result.card.nature,
						// };
						// event.result.cards = [];
						// player.loseToDiscardpile(card, ui.cardPile, "visible", "insert").log = false;
					},
				};
			},
			prompt(links, player) {
				return "将一张黑色牌当作" + get.translation(links[0][3] || "") + get.translation(links[0][2])+'使用';
			},
		},
	
	},
	//---------力牧
	sgsk_qianjun: {
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:'useCard',
		},
		filter(event,player){
			return event.card.name=='sha'&&get.color(event.card);
		},
		async content(event,trigger,player){
			if(get.color(trigger.card)=='red'){
				trigger.baseDamage++
			}
			else if(get.color(trigger.card)=='black'){
				trigger.card.directHit = true;
			}
		}
	},
	//---------常先
	sgsk_zhangu: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			global: 'phaseZhunbeiBegin'
		},
		async cost(event, trigger, player) {
			const target = trigger.player
			event.result = await player.chooseToDiscard({color:'red'}, 'he')
				.set('prompt', `弃置一张红色牌，令${get.translation(target)}本回合出牌阶段使用的【杀】或【决斗】伤害+1`)
				.set('ai', card => {
					const player = get.player(),
						target = get.event().target
					//没错，是ai透视
					if (get.attitude(player, target) < 1.5) return 0
					if (target.hasCard(cardx => get.name(cardx) == 'juedou')) return 7 - get.value(card)
					if (target.hasCard(cardx => get.name(cardx) == 'sha')) return 5 - get.value(card)
					return 3 - get.value(card)
				})
				.set('target', target)
				.set('chooseOnly', true)
				.forResult()
			event.result.targets = [target]
		},
		async content(event, trigger, player) {
			await player.discard(event.cards)
			await event.targets[0].addMark('sgsk_zhangu_1')
			await event.targets[0].addTempSkill('sgsk_zhangu_1')
		},
		subSkill: {
			1: {
				charlotte: true,
				trigger: {
					source: 'damageBegin1'
				},
				filter: (event,player) => (event.card?.name == 'sha' || event.card?.name == 'juedou') && player.isPhaseUsing(),
				forced: true,
				mark: true,
				marktext:'战',
				onremove:true,
				intro:{
					name:'战鼓',
					content: '本回合出牌阶段的杀或决斗造成的伤害+$'
				},
				async content(event, trigger, player) {
					var num = player.countMark('sgsk_zhangu_1')
					trigger.num+=num;
				},
				ai: {
					damageBonus: true,
					skillTagFilter: (player, tag, arg) => (arg?.card?.name == 'sha' || arg?.card?.name == 'juedou') && player.isPhaseUsing()
				}
			}
		}
	},
	sgsk_sanggu: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			global: 'phaseZhunbeiBegin'
		},
		async cost(event, trigger, player) {
			const target = trigger.player
			event.result = await player.chooseToDiscard({color:'black'}, 'he')
				.set('prompt', `弃置一张黑色牌，令${get.translation(target)}本回合出牌阶段使用的【杀】或【决斗】伤害-1`)
				.set('ai', card => {
					const player = get.player(),
						target = get.event().target
					//没错，是ai透视
					if (get.attitude(player, target) > 0) return 0
					if (target.hasCard(cardx => get.name(cardx) == 'juedou')) return 7 - get.value(card)
					if (target.hasCard(cardx => get.name(cardx) == 'sha')) return 5 - get.value(card)
					return 3 - get.value(card)
				})
				.set('target', target)
				.set('chooseOnly', true)
				.forResult()
			event.result.targets = [target]
		},
		async content(event, trigger, player) {
			await player.discard(event.cards)
			await event.targets[0].addMark('sgsk_sanggu_1')
			await event.targets[0].addTempSkill('sgsk_sanggu_1')
		},
		subSkill: {
			1: {
				charlotte: true,
				trigger: {
					source: 'damageBegin2'
				},
				filter: (event,player) => (event.card?.name == 'sha' || event.card?.name == 'juedou') && player.isPhaseUsing(),
				forced: true,
				mark: true,
				marktext:'丧',
				onremove:true,
				intro:{
					name:'丧鼓',
					content: '本回合出牌阶段的杀或决斗造成的伤害-$'
				},
				async content(event, trigger, player) {
					var num = player.countMark('sgsk_sanggu_1')
					trigger.num-=num;
				},
			}
		}
	},
	//---------鬼臾区
	sgsk_zhanxing: {
		audio: 'ext:夜白神略/audio/character:2',
	},
	sgsk_wuxing: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'useCardToPlayered',
			target: 'useCardToTargeted'
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseToDiscard(2,'he')
				.set('prompt', get.prompt2('sgsk_wuxing'))
				.set('filterCard', function(card)  {
					if (!ui.selected.cards.length) return true;
					// if (get.number(ui.selected.cards[0]) + get.number(card) == 5) return true
					return Math.abs(get.number(ui.selected.cards[0]) - get.number(card)) == 5||(get.number(ui.selected.cards[0]) + get.number(card) == 5);
				}).set("complexCard", true).set('chooseonly',true).forResult();
		},
		async content(event, trigger, player) {
			await player.discard(event.cards);
			if (event.triggername == 'useCardToPlayered') trigger.getParent().directHit.addArray(game.players)
			else {
				trigger.excluded.add(player)
				trigger.getParent().targets.length = 0
				trigger.getParent().all_excluded = true
			}
			trigger.getParent().sgsk_wuxing = []
			trigger.getParent().sgsk_wuxing.add(player);
			
		},
		group: 'sgsk_wuxing_1',
		subSkill: {
			1: {
				trigger: {
					global: 'useCardAfter',
				},
				charlotte: true,
				forced: true,
				silent: true,
				popup: false,
				filter: (event,player) => event.sgsk_wuxing&&event.sgsk_wuxing.includes(player),
				async content(event, trigger, player) {
					await player.draw(5)
					var cards = Array.from(ui.ordering.childNodes)
					while (cards.length) {
						cards.shift().discard()
					}
					var evt = _status.event.getParent('phase');
					if (evt) {
						game.resetSkills()
						let evtx = _status.event;
						while (evtx != evt) {
							evtx.finish();
							evtx.untrigger(true);
							evtx = evtx.getParent();
						}
						evtx.finish();
						evtx.untrigger(true);
						// _status.event = evt
						// _status.event.finish()
						// _status.event.untrigger(true)
					}
				}
			}
		}
	},
	//---------释迦牟尼
	sgsk_dianhua: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return player.countCards("h") > 0;
		},
		filterCard: true,
		selectCard: -1,
		filterTarget(card, player, target) {
			return player != target;
		},
		discard: false,
		lose: false,
		delay: false,
		ai: {
			order: 1,
			result: {
				player: 0,
				target(player, target) {
					if (target.hasSkillTag("nogain")) {
						return 0;
					}
					return 1;
				},
			},
		},
		content() {
			"step 0";
			event.target1 = targets[0];
			player.give(cards, targets[0], false);
			"step 1";
			event.target1.chooseTarget('令一名角色回复1点体力或对一名角色造成1点伤害',true).set('ai',function(target){
				var att = get.attitude(_status.event.player,target);
				// if(att>0){
				// 	if(!target.isDamaged())return -1;
				// 	else  
				// }
				if(att<0) return get.damageEffect(target,event.target1,_status.event.player);
				return target.getDamagedHp()
			})
			'step 2'
			if(result.targets){
				event.target2=result.targets[0];
				var list = [];
				list.push('伤害');
				if(result.targets[0].isDamaged())list.push('回复');
				if(list.length==1){
					event._result = { bool: true, control: '伤害' }
				}
				else{
					event.target1.chooseControl(list).set('prompt','令'+get.translation(result.targets[0])+'回复还是受到伤害').set('ai',function(target){
						var player=_status.event.player;//定义变量player为选目标的发起者(不懂可以先不写)
						var target=result.targets[0];
						return get.attitude(player,target)>0?'回复':'伤害';
					})
				}
			}
			'step 3'
			if(event.target1&&event.target2&&result.control){
				if(result.control=='伤害'){
					event.target2.damage(event.target1);
				}
				else {
					event.target2.recover(event.target1);
				}
			}
		},
	},
	sgsk_wuwo: {
		audio: 'ext:夜白神略/audio/character:2',
		mod: {
			targetEnabled(card, player, target, now) {
				if (target.countCards("h") == 0) {
					if (get.type2(card)=='trick') {
						return false;
					}
				}
			},
		},
		group: "sgsk_wuwo_1",
		ai: {
			noh: true,
			skillTagFilter(player, tag) {
				if (tag == "noh") {
					if (player.countCards("h") != 1) {
						return false;
					}
				}
			},
		},
		trigger: { global: "useCard1" },
		forced: true,
		firstDo: true,
		filter(event, player) {
			if (event.player == player) {
				return false;
			}
			if (get.type(event.card) != "trick") {
				return false;
			}
			var info = lib.card[event.card.name];
			return info && info.selectTarget && info.selectTarget == -1 && !info.toself;
		},
		async content(event, trigger, player) {},
		subSkill:{
			1:{
				audio: 'sgsk_wuwo',
				trigger: { player: "loseEnd" },
				forced: true,
				firstDo: true,
				sourceSkill: "sgsk_wuwo",
				filter(event, player) {
					if (player.countCards("h")) {
						return false;
					}
					for (let i = 0; i < event.cards.length; i++) {
						if (event.cards[i].original == "h") {
							return true;
						}
					}
					return false;
				},
				async content() {},
			}
		}
	},
	//-----------------------罗睺
	'sgsk_yueshi': {
		preHidden: true,
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'useCardAfter',
		},
		// direct:true,
		// popup:false,
		filter: function (event, player) {
			return player.countCards('he') != 0;
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseCard('he').forResult();
		},
		content: function () {
			// player.logSkill('sgsk_yueshi',player);
			player.recast(event.cards)
		},
		// content:function (){
		// 'step 0'
		// player.choosePlayerCard(player,'he');
		// 'step 1'
		// if(result.bool){
		// player.logSkill('sgsk_yueshi',player);
		// player.recast(result.cards)
		// }
		// },
	},
	///-------------刑天
	sgsk_fuchou: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: { global: 'phaseAfter' },
		filter: function (event, player) {
			var target = event.player;
			return target.getHistory('sourceDamage', function (evt) {
				return evt.player == player;
			}).length > 0;
		},
		check: function (event, player) {
			var target = event.player;
			if (get.effect(target, { name: 'sha' }, target, player) > 0) return true;
			return false;
		},
		content: function () {
			'step 0'
			player.draw();
			player.useCard({ name: 'sha', isCard: false }, trigger.player, 'sgsk_fuchou');
		},
	},


}
