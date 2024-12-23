import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

const skill = {
	//--------------------一将成名
	//--------神庞统
	ybsl_ptchiling:{
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			global:['gameStart'],
			player: "enterGame",
		},
		filter:function(event,player,name){
			if(name=='gameStart'||game.phaseNumber == 0)return true;
		},
		content:function(){
			game.log('<span style=\'color:#ff7b00\'>牌堆燃起来了！！！</span>');
			game.YB_fire(ui.cardPile.childNodes);
		},
		group:['ybsl_ptchiling_eat','ybsl_ptchiling_1','ybsl_ptchiling_2','ybsl_ptchiling_3'],
		mark:true,
		marktext:'焰',
		intro:{
			name:'火焰',
			content:'$',
		},
		derivation:'ybsl_ptchiling_eat',
		subSkill:{
			eat:{
				name:'炽翎·吸收',
				audio: 'ybsl_ptchiling',
				locked:true,
				trigger: {
					global: ["loseAfter", "cardsDiscardAfter", "loseAsyncAfter"]
				},
				filter(event, player) {
					if (event.name.indexOf("lose") == 0) {
						if (event.getlx === false || event.position != ui.discardPile) return false;
					}
					return get.YB_flames(event.cards).length&&get.YB_flames(event.cards).length>0;
				},
				content() {
					player.YB_nofire(trigger.cards);
				},
				prompt:function (event,player){
					var list=get.YB_flames(event.cards);
					list=get.translation(list);
					// <span style=\'color:#00c4ff\'>文字</span>自写颜色
					return `是否吸收<span style=\'color:#1eff00\'>${list}</span>的火焰？`
				},
				check:function(){return true},
				frequent:true,

			},
			1:{
				name:'炽翎·火伤',
				audio: 'ybsl_ptchiling',
				locked:true,
				usable:1,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countMark('ybsl_ptchiling')>=2;
				},
				chooseButton:{
					dialog:function (event,player){
						var list=[];
						for(var i=1;i<4;i++){
							list.push(['消耗',get.YB_fire_num(i),'ybsl_ptchiling'+i]);
						}
						return ui.create.dialog('炽翎',[list,'vcard']);
					},
					filter:function (button,player){
						var list=[2,5,10],list2=[];
						for(var i = 0;i<list.length;i++){
							if(player.countMark('ybsl_ptchiling')>=list[i])list2.push('ybsl_ptchiling'+(i+1))
						}
						return list2.includes(button.link[2]);
					},
					check:function(button){
						return get.value({
							name:button.link[2],
						});
					},
					backup:function (links,player){
						return {
							audio:'ybsl_ptchiling',
							name:'炽翎·火伤',
							filterCard:function(){return false},
							selectCard: -1,
							filterTarget:function(card,player,target){
								return target!=player;
							},
							selectTarget:1,
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
							ai:{
								order:1,
								expose:1,//跳立场
								fireAttack:true,
								result:{
									player:function(player,target){
										return get.damageEffect(target,player,player,'fire');
									},
									target:function(player,target){
										return get.damageEffect(target,player,target,'fire');
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
				contentx:function(){
					var card = lib.skill.ybsl_ptchiling_1_backup.card;
					var num=card[2].slice(-1)
					num-=0;
					player.removeMark('ybsl_ptchiling',card[1]);
					target.damage(num,'fire');
					// var num=cards[0].name.slice(-1);
					// num-=0;
					// player.removeMark('ybsl_ptchiling',get.YB_fire_num(num));
					// target.damage(num,'fire');
				},
				ai:{
					order:1,
					expose:1,//跳立场
					fireAttack:true,
					result:{
						player:function(player,target){
							// return get.damageEffect(target,player,player,'fire');
							return 1;
						},
						// target:function(player,target){
						// 	return get.damageEffect(target,player,target,'fire');
						// },
					}
				},
			},
			2:{
				name:'炽翎·点燃',
				audio: 'ybsl_ptchiling',
				locked:true,
				usable:1,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countMark('ybsl_ptchiling')>=20;
				},
				prompt:function(event,player){
					if(!player)var player=_status.event.player;
					var num=player.countMark('ybsl_ptchiling');
					return `当前拥有<span style=\'color:#99fffd\'>${num}</span>枚火焰，是否消耗<span style=\'color:#ff7b00\'>20</span>枚火焰，点燃弃牌堆？`
				},
				content:function(){
					player.removeMark('ybsl_ptchiling',20);
					game.log('<span style=\'color:#ff7b00\'>弃牌堆燃起来了！！！</span>');
					game.YB_fire(ui.discardPile.childNodes);
				},
				ai:{
					result:{
						player:function(player,target){
							var list = ui.discardPile.childNodes,list2=ui.cardPile.childNodes;
							if(get.YB_noflames(list)>player.countMark('ybsl_ptchiling'))return 20;
							if(get.YB_noflames(list)>ui.cardPile.childNodes.length)return 20;
							return -1;
						}
					},
					order:6,
					
				}
			},
			3:{
				name:'炽翎·毕方',
				audio: 'ybsl_ptchiling',
				locked:true,
				usable:1,
				enable:'phaseUse',
				unique: true,
				animationColor:'fire',
				skillAnimation:true,
				filter:function(event,player){
					return player.countMark('ybsl_ptchiling')>=40;
				},
				selectTarget:-1,
				filterTarget: true,
				prompt:function(event,player){
					if(!player)var player=_status.event.player;
					var num=player.countMark('ybsl_ptchiling');
					return `当前拥有<span style=\'color:#99fffd\'>${num}</span>枚火焰，是否消耗<span style=\'color:#ff7b00\'>40</span>枚火焰，毁天灭地？<br>出牌阶段限一次，你可以移除40枚火焰，然后令场上角色依次展示手牌，然后弃置其中的附着火焰的牌并受到等量火属性伤害。`
				},
				contentBefore:function(){
					player.removeMark('ybsl_ptchiling',40);
				},
				content:function(){
					'step 0'
					if(!target.countCards('h'))event.finish();
					else {
						target.showCards(target.getCards('h'));
						event.cards=get.YB_flames(target.getCards('h'))
					}
					'step 1'
					if(!event.cards||!event.cards.length)event.finish();
					else {
						target.discard(event.cards);
						target.damage(event.cards.length,'fire');
					}
				},
				// content:function*(event,map){
				// 	let player=map.player,trigger=map.trigger;
				// 	yield target.showCards(target.getCards('h'));
				// 	let cards=get.YB_flames(target.getCards('h'));
				// 	yield target.discard(cards);
				// 	yield target.damage(cards.length,'fire');
				// },
				ai:{
					result:{
						player:function(player,target){
							if(get.YB_flames(player.getCards('h'))<player.hp) {
								var targets1=game.filterPlayer(function(target){
									return get.attitude(player,target)>0
								});
								var targets2=game.filterPlayer(function(target){
									return get.attitude(player,target)<=0
								});
								// var num1=0,num2=0;
								if(targets1.length){
									for(var i of targets1){
										var num=get.YB_flames(target.getCards('h'));
										if(num>i.hp)return false;
									}
								}
								if(targets2.length){
									for(var i of targets1){
										var num=get.YB_flames(target.getCards('h'));
										if(num>i.hp)return true;
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
					
					fireAttack:true,
					order:6,
				}
			},
		}
	},
	ybsl_ptqiwu:{
		audio: 'ext:夜白神略/audio/character:2',
		group:['ybsl_ptqiwu_use','ybsl_ptqiwu_eat','ybsl_ptqiwu_1','ybsl_ptqiwu_2','ybsl_ptqiwu_3'],
		ai:{combo:'ybsl_ptchiling'},
		derivation:'ybsl_ptqiwu_eat',
		subSkill:{
			use:{
				name:'栖梧·吸收',
				audio:'ybsl_ptqiwu',
				enable:'phaseUse',
				filter:function(event,player){
					return get.YB_flames(player.getCards('h')).length&&get.YB_flames(player.getCards('h')).length>0;
				},
				discard:false,
				lose:false,
				selectCard:[1,Infinity],
				filterCard:function(card,player){
					return get.YB_flames(player.getCards('h')).includes(card);
				},
				content:function(){
					player.showCards(cards);
					player.YB_nofire(cards);
				},
				check:function(card){
					return true;
				},
				ai:{
					order:1000,
					result:{
						player:10,
					}
				}
			},
			eat:{
				audio:'ybsl_ptqiwu',
				trigger:{
					player:'damageBegin4',
				},
				filter:function(event,player){
					return event.hasNature('fire');
				},
				frequent:true,
				check:function(){return true},
				content:function(){
					player.addMark('ybsl_ptchiling',trigger.num*2);
				},
			},
			1:{
				name:'栖梧·吃桃',
				audio:'ybsl_ptqiwu',
				usable:1,
				// init:function(player){
				// 	for(var i=1;i<4;i++){
				// 		var card=game.createCard('ybsl_ptqiwu'+i,null,get.YB_fire_num(i))
				// 		player.directgains([card], null, "ybsl_ptqiwu");
				// 	}
				// },
				enable:'chooseToUse',
				filter:function(event,player){
					var filter=event.filterCard;
					if(filter({name:'tao'},player,event)&&player.countMark('ybsl_ptchiling')>=2) return true;
				},
				chooseButton:{
					dialog:function (event,player){
						var list=[];
						for(var i=1;i<4;i++){
							list.push(['消耗',get.YB_fire_num(i),'ybsl_ptqiwu'+i]);
						}
						return ui.create.dialog('栖梧',[list,'vcard']);
					},
					filter:function (button,player){
						var list=[2,5,10],list2=[];
						for(var i = 0;i<list.length;i++){
							if(player.countMark('ybsl_ptchiling')>=list[i])list2.push('ybsl_ptqiwu'+(i+1))
						}
						return list2.includes(button.link[2]);
					},
					check:function(button){
						return get.value({
							name:button.link[2],
						});
					},
					backup:function (links,player){
						return {
							audio:'ybsl_ptqiwu',
							name:'栖梧·吃桃',
							filterCard:function(){return false},
							selectCard: -1,
							// filterTarget:function(card,player,target){
							// 	// return target!=player;
							// 	return false;
							// },
							// selectTarget:1,
							delay: false,
							lose:false,
							discard:false,
							cardx: links[0],
							viewAs:function(){
								var card=links[0];
								return {
									name:'tao',
									YB_baseDamage:card[2],
								}
							},
							precontent:function(){
								event.result.cards = [];
							},
							// content:function(){
							// 	var card = lib.skill.ybsl_ptqiwu_1_backup.cardx;
							// 	var num=card[0][2].slice(-1);
							// 	num-=0;
							// 	player.removeMark('ybsl_ptchiling',get.YB_fire_num(num));
							// 	target.damage(num,'fire');
							// },
							ai:{
								order:1,
								save:true,
								recover:1,
								effect:{
									// player:function(player,target){
									// 	// return get.damageEffect(target,player,'fire');
									// 	return get.effect(target, { name: "tao" }, player,player);
									// },
									target:function(player,target){
										// return get.damageEffect(target,player,'fire');
										return get.effect(target, { name: "tao" }, player,target);
									},
								}
							},
							prompt:function (links,player){
								// var card = links[0];
								var num=links[0][2].slice(-1);
								num-=0;
								return `消耗${links[0][1]}枚火焰，对一名角色使用数值为${num}的桃`;
							},
						};
					},
				},
				
				ai:{
					order:1,
					recover:1,
					save:true,
					result:{
						player:function(player,target){
							// return get.damageEffect(target,player,'fire');
							return get.effect(target, { name: "tao" }, player,player);
							// return 1;
						},
						// target:function(player,target){
						// 	// return get.damageEffect(target,player,'fire');
						// 	return get.effect(target, { name: "tao" }, player,target);
						// },
					}
				},
				hiddenCard:function (player,name){
					return player.countMark('ybsl_ptqiwu')>=2&&name=='tao';
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
			2:{
				direct:true,
				forced:true,
				locked:true,
				charlotte:true,
				firstDo:true,
				trigger:{
					player:'useCardBefore',
				},
				filter:function(event,player){
					return event.card.YB_baseDamage;
				},
				content:function(){
					// game.log(1);
					// game.log(trigger.baseDamage);
					// game.log(trigger.card.YB_baseDamage);
					player.logSkill('ybsl_ptqiwu_1_backup')
					var num=trigger.card.YB_baseDamage.slice(-1);
					num-=0;
					// var num=result.links[0][2].slice(-1);
					// num-=0;
					player.removeMark('ybsl_ptchiling',get.YB_fire_num(num));
					trigger.baseDamage=num
				}
			},
			3:{
				name:'栖梧·重明',
				audio:'ybsl_ptqiwu',
				round:1,
				enable:'chooseToUse',
				filter:function(event,player){
					if(player.countMark('ybsl_ptchiling')<40)return false;
					if(event.type=='dying'){
						if(player!=event.dying) return false;
						return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					player.removeMark('ybsl_ptchiling',40);
					'step 1'
					player.recover(player.maxHp-player.hp);
					player.draw(3);
				},
				ai:{
					order:10,
					skillTagFilter:function(player,arg,target){
						if(player!=target) return false;
					},
					save:true,
					result:{
						player:function(player){
							if(player.hp<=0) return 10;
							if(player.hp<=2&&player.countCards('he')<=1) return 10;
							return 0;
						}
					},
				},
			},
		}
	},
	//-----------鹰原羽依里
	hairi_shangshi:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:['loseAfter','changeHp','gainMaxHpAfter','loseMaxHpAfter'],
			global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
		},
		// frequent:true,
		forced:true,
		filter:function(event,player){
			if(event.getl&&!event.getl(player)) return false;
			return player.countCards('h')<player.getDamagedHp();
		},
		content:function(){
			player.draw(player.getDamagedHp()-player.countCards('h'));
		},
		ai:{
			noh:true,
			skillTagFilter:function(player,tag){
				if(tag=='noh'&&player.maxHp-player.hp<player.countCards('h')){
					return false;
				}
			}
		}
	},
	hairi_zheyi:{
		trigger:{
			global:'phaseBefore',
			player:['enterGame','showCharacterAfter'],
		},
		forced:true,
		filter:function (event, player,name) {
			if(get.mode()=='guozhan') return name=='showCharacterAfter';
			return (name == 'enterGame' || game.phaseNumber == 0);
		},
		content:function () {
			if(get.mode()=='guozhan'&&!player.checkMainSkill('hairi_zheyi')){
				return;
			}
			else{
				player.disableEquip('equip1');
				player.disableEquip('equip2');
				player.disableEquip('equip3');
				player.disableEquip('equip4');
				player.disableEquip('equip5');
			}
		},
	},
	hairi_zhongxia:{
		audio:'ext:夜白神略/audio/character:2',
		enable:'chooseToUse',
		dutySkill:true,
		hiddenCard:function(player,name){
			if(player.hasSkill('hairi_zhongxia_block'))return false;
			if(get.type(name)=='basic'&&lib.inpile.includes(name)&&player.countCards('h')>0) return true;
		},
		filter:function(event,player){
			if(event.responded||player.hasSkill('hairi_zhongxia_block')||player.countCards('h')<=0) return false;
			for(var i of lib.inpile){
				if(get.type(i)=='basic'&&event.filterCard({name:i},player,event)) return true;
			}
			return false;
		},
		chooseButton:{
			dialog:function(event,player){
				var list=[];
				for(var i of lib.inpile){
					if(get.type(i)=='basic'&&event.filterCard({name:i},player,event)){
						list.push(['基本','',i]);
						if(i=='sha'){
							for(var j of lib.inpile_nature) list.push(['基本','','sha',j]);
						}
					}
				}
				return ui.create.dialog('终夏',[list,'vcard'],'hidden')
			},
			check:function(button){
				if(button.link[2]=='shan') return 3;
				var player=_status.event.player;
				if(button.link[2]=='jiu'){
					if(player.getUseValue({name:'jiu'})<=0) return 0;
					if(player.countCards('h','sha')) return player.getUseValue({name:'jiu'});
				}
				return player.getUseValue({name:button.link[2],nature:button.link[3]})/4;
			},
			backup:function(links,player){
				return {
					selectCard:-1,
					filterCard:function(card,player){
						if(player.hasSkill('hairi_zhongxia_block'))return false;
						if(player.countCards('h')<=0)return false;
						return true;
					},
					filter:function(event,player){
						if(player.hasSkill('hairi_zhongxia_block'))return false;
						if(player.countCards('h')<=0)return false;
						return true;
					},
					complexCard:true,
					viewAs:{
						name:links[0][2],
						nature:links[0][3],
						suit:'none',
						number:null,
						isCard:true,
					},
					position:'h',
					ignoreMod:true,
					check:function(card){
						var player=_status.event.player;
						if(player.countCards('h',{name:card.name})>0)return false;
						var cards=player.getCards('h');
						var list=[];
						for(var i of cards){
							var suit=get.suit(i);
							if(list.includes(suit))return false;
							else list.push(suit);
						}
						return true;
					},
					precontent:function(){
						'step 0'
						player.logSkill('hairi_zhongxia');
						var cards=event.result.cards;
						player.discard(cards);
						// player.draw();
						event.result.card={
							name:event.result.card.name,
							nature:event.result.card.nature,
							isCard:true,
						};
						event.result.cards=[];
						delete event.result.skill;
						if(cards.length){
							var list2=[];
							for(var i=0;i<cards.length;i++){
								var suit=get.suit(cards[i]);
								if(list2.includes(suit)){
									// game.log('list2:' ,list2);
									// game.log('suit:', suit);
									var evt=event.getParent();
									evt.set('hairi_zhongxia',true);
									evt.goto(0);
									player.addTempSkill('hairi_zhongxia_block');
									if(cards.length==player.maxHp||cards.length==player.maxHp-player.hp)player.gainMaxHp();
									return;
								}
								else {
									list2.push(suit);
								}
							}
							if(cards.length==player.maxHp||cards.length==player.maxHp-player.hp)player.gainMaxHp();
						}
					},
				}
			},
			prompt:function(links,player){
				var name=links[0][2];
				var nature=links[0][3];
				return '弃置所有手牌，若以此法弃置的牌花色各不相同，则视为使用'+(get.translation(nature)||'')+get.translation(name)+'，若以此法弃置的牌数等于你体力上限，你加一点体力上限。';
			},
		},
		ai:{
			order:function(item,player){
				// if(_status.event.type=='phase'&&!player.countMark('jinzhi2')&&player.getUseValue({name:'jiu'},null,true)>0&&player.countCards('h','sha')) return get.order({name:'jiu'})+1;
				var num=player.countCards('h');
				return Math.max(6-num,1);
			},
			respondShan:true,
			respondSha:true,
			// skillTagFilter:function(player){
				// if(player.countMark('jinzhi2')>=player.countCards('he')) return false;
			// },
			result:{
				player:function(player){
					if(_status.event.dying) return get.attitude(player,_status.event.dying);
					return 1;
				}
			}
		},
		onremove:true,
		group:['hairi_zhongxia_achieve','hairi_zhongxia_fail'],
		subSkill:{
			achieve:{
				trigger:{
					player:['phaseZhunbeiBegin'],
				},
				forced:true,
				filter:function(event,player){
					if(player.maxHp>=5)return true;
					return false;
				},
				skillAnimation:true,
				animationColor:'key',
				content:function(){
					'step 0'
					game.log(player,'成功完成使命');
					
					var list=['获得炒饭','重新度过夏日'];
					player.chooseControl(list).set('prompt','将这个夏日装进口袋？');
					'step 1'
					if(result.control=='获得炒饭'){
						player.awakenSkill('hairi_zhongxia');
						player.addSkill('umi_chaofan');
						player.enableEquip('equip1');
						player.enableEquip('equip2');
						player.enableEquip('equip3');
						player.enableEquip('equip4');
						player.enableEquip('equip5');
					}
					else{
						var num=player.maxHp-1;
						player.loseMaxHp(num);
					}
				},
			},
			fail:{
				trigger:{player:'die'},
				direct:true,
				forceDie:true,
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					game.log(player,'使命失败');
					player.chooseTarget(true,get.prompt('hairi_zhongxia'),'令一名其他角色获得“终夏”',lib.filter.notMe);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						target.addSkill('hairi_zhongxia');
					}
				},
			},
			block:{
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
				mark:true,
				// skillBlocker:function(skill,player){
				// 	return skill=='hairi_zhongxia';
				// },
			}
		},
	},
	//--------------界纵丝
	kagari_ybzongsi:{
		enable:'phaseUse',
		usable:1,
		content:function(){
			'step 0'
			var controls=[];
			if(ui.cardPile.hasChildNodes()) controls.push('选择牌堆中的一张牌');
			if(ui.discardPile.hasChildNodes()) controls.push('选择弃牌堆中的一张牌');
			if(game.hasPlayer(function(current){
				return current.countCards('hej')>0;
			})) controls.push('选择一名角色区域内的一张牌');
			if(!controls.length){event.finish();return;}
			event.controls=controls;
			var next=player.chooseControl();
			next.set('choiceList',controls)
			next.set('prompt','请选择要移动的卡牌的来源');
			next.ai=function(){return 0};
			'step 1'
			result.control=event.controls[result.index];
			var list=['弃牌堆','牌堆','角色'];
			for(var i=0;i<list.length;i++){
				if(result.control.indexOf(list[i])!=-1){event.index=i;break;}
			}
			if(event.index==2){
				player.chooseTarget('请选择要移动的卡牌的来源',true,function(card,kagari,target){
					return target.countCards('hej')>0;
				});
			}
			else{
				var source=ui[event.index==0?'discardPile':'cardPile'].childNodes;
				var list=[];
				for(var i=0;i<source.length;i++) list.push(source[i]);
				player.chooseButton(['请选择要移动的卡牌',list],true).ai=get.buttonValue;
			}
			'step 2'
			if(event.index==2){
				player.line(result.targets[0]);
				event.target1=result.targets[0];
				player.choosePlayerCard(result.targets[0],true,'hej').set('visible',true);
			}
			else{
				event.card=result.links[0];
			}
			'step 3'
			if(event.index==2) event.card=result.cards[0];
			var controls=[
				'将这张牌移动到牌堆的顶部或者底部',
				'将这张牌移动到弃牌堆的顶部或者底部',
				'将这张牌移动到一名角色对应的区域里',
			];
			event.controls=controls;
			var next=player.chooseControl();
			next.set('prompt','要对'+get.translation(event.card)+'做什么呢？');
			next.set('choiceList',controls);
			next.ai=function(){return 2};
			'step 4'
			result.control=event.controls[result.index];
			var list=['弃牌堆','牌堆','角色'];
			for(var i=0;i<list.length;i++){
				if(result.control.indexOf(list[i])!=-1){event.index2=i;break;}
			}
			if(event.index2==2){
				player.chooseTarget('要将'+get.translation(card)+'移动到哪一名角色的对应区域呢',true).ai=function(target){
					return target==_status.event.player?1:0;
				};
			}
			else{
				player.chooseControl('顶部','底部').set('prompt','把'+get.translation(card)+'移动到'+(event.index2==0?'弃':'')+'牌堆的...');
			}
			'step 5'
			if(event.index2!=2){
				//if(event.target1) event.target1.lose(card,ui.special);
				//else card.goto(ui.special);
				event.way=result.control;
			}
			else{
				event.target2=result.targets[0];
				var list=['手牌区'];
				// if(lib.card[card.name].type=='equip'&&event.target2.canEquip(card)) list.push('装备区');
				list.push('装备区');
				if(!event.target2.isDisabledJudge()) list.push('判定区');
				if(list.length==1) event._result={control:list[0]};
				else{
					player.chooseControl(list).set('prompt','把'+get.translation(card)+'移动到'+get.translation(event.target2)+'的...').ai=function(){return 0};
				}
			}
			'step 6'
			if(event.index2!=2){
				var node=ui[event.index==0?'discardPile':'cardPile'];
				if(event.target1){
					var next=event.target1.lose(card,event.position);
					if(event.way=='顶部') next.insert_card=true;
				}
				else{
					if(event.way=='底部') node.appendChild(card);
					else node.insertBefore(card,node.firstChild);
				}
				game.updateRoundNumber();
				event.finish();
			}
			else{
				if(result.control=='手牌区'){
					var next=event.target2.gain(card);
					if(event.target1){
						next.source=event.target1;
						next.animate='giveAuto';
					}
					else next.animate='draw';
					event.goto(8);
				}
				else if(result.control=='装备区'){
					event.goto(12);
				}
				else{
					event.goto(10);
				}
			}
			'step 7'
			game.updateRoundNumber();
			event.finish();
			'step 8'
			
			//-----------此处设置此牌的视为牌名
			var list55=[];
			for(var yb of lib.inpile){
			// for(var yb in lib.card){
				// if(lib.card[yb].mode&&lib.card[yb].mode.includes(lib.config.mode)==false) continue;
				// if(lib.card[yb].forbid&&lib.card[yb].forbid.includes(lib.config.mode)) continue;
				// if(!lib.card[yb].type||['db_atk','db_def','pss','hstuteng'].includes(lib.card[yb].type)) continue;
				// if(lib.card[yb].type!='equip'){
					if(yb=='sha'){
						for(var kkk of lib.inpile_nature){
							switch(kkk){
								case 'fire':list55.add([get.type2(yb),'','sha','fire']);break;
								case 'thunder':list55.add([get.type2(yb),'','sha','thunder']);break;
								case 'kami':list55.add([get.type2(yb),'','sha','kami']);break;
								case 'ice':list55.add([get.type2(yb),'','sha','ice']);break;
								case 'stab':list55.add([get.type2(yb),'','sha','stab']);break;
								default:list55.add([get.type2(yb),'','sha',kkk]);break;
							}
						}
					}
					else{
						list55.add([get.type2(yb),'',yb]);
					}
				// }
			};
			player.chooseButton(['纵丝','令'+('<span class=yellowtext>'+get.translation(card)+'</span>')+'视为什（shén）么？<br>（知道有多音字，所以特意标上了读音[机智]）',[list55,'vcard']]).set('prompt2','将此牌转化为什（shén）么？<br>（知道有多音字，所以特意标上了读音[机智]）').set('ai',function(button){
				var player=_status.event.player,name=button.link[2];
				return player.getUseValue({name:name});
			});
			event.goto(9);
			'step 9'
			if(result.links){
				var name=result.links[0][2];
				var nature=result.links[0][3];
				//主代码页有_kagari_ybzongsi_card全局技能
				card.addGaintag('_kagari_ybzongsi_card');
				_status.kagari_ybzongsi[card.cardid]=name;
				_status.kagari_ybzongsi_nature[card.cardid]=nature;
				
			}
			game.updateRoundNumber();
			event.finish();
			'step 10'
			var list66=[];
			for(var yb of lib.inpile){
			// for(var yb in lib.card){
				// if(lib.card[yb].mode&&lib.card[yb].mode.includes(lib.config.mode)==false) continue;
				// if(lib.card[yb].forbid&&lib.card[yb].forbid.includes(lib.config.mode)) continue;
				// if(!lib.card[yb].type||lib.card[yb].type.includes(['db_atk','db_def'	])) continue;
				if(lib.card[yb].type=='delay')list66.add([get.type2(yb),'',yb]);
				if(lib.card[yb].type=='special_delay')list66.add([get.type2(yb),'',yb]);
			};
			player.chooseButton(['纵丝','令'+('<span class=yellowtext>'+get.translation(card)+'</span>')+'视为什（shén）么？选择原牌名则不会转化<br>（知道有多音字，所以特意标上了读音[机智]）',[list66,'vcard']]/*,true*/).set('prompt2','将此牌转化为什（shén）么？选择原牌名则不会转化，取消则蓄谋<br>（知道有多音字，所以特意标上了读音[机智]）');
			'step 11'
			if(event.target1) event.target1.line(event.target2,'water');
			if(!result.links) event.target2.addJudge({name:'xumou_jsrg'},[card]);
			else if(result.links[0][2]==get.name(card)) event.target2.addJudge(card);
			else event.target2.addJudge({name:result.links[0][2]},[card]);
			game.updateRoundNumber();
			event.finish();
			'step 12'
			var list66=[];
			for(var yb of lib.inpile){
			// for(var yb in lib.card){
				// if(lib.card[yb].mode&&lib.card[yb].mode.includes(lib.config.mode)==false) continue;
				// if(lib.card[yb].forbid&&lib.card[yb].forbid.includes(lib.config.mode)) continue;
				// if(!lib.card[yb].type||lib.card[yb].type.includes(['db_atk','db_def'	])) continue;
				if(lib.card[yb].type=='equip')list66.add([get.type2(yb),'',yb]);
			};
			player.chooseButton(['纵丝','令'+('<span class=yellowtext>'+get.translation(card)+'</span>')+'视为什（shén）么？选择原牌名则不会转化<br>（知道有多音字，所以特意标上了读音[机智]）',[list66,'vcard']]/*,true*/).set('prompt2','将此牌转化为什（shén）么？选择原牌名则不会转化，取消则蓄谋<br>（知道有多音字，所以特意标上了读音[机智]）');
			'step 13'
			if(event.target1) event.target1.$give(card,event.target2);
			// event.target2.equip(card);
			if(!result.links) event.target2.equip(card);
			else if(result.links[0][2]==get.name(card)) event.target2.equip(card);
			// else event.target2.addJudge({name:result.links[0][2]},[card]);
			else event.target2.equip(get.autoViewAs({name:result.links[0][2]},[card]),[card]);
			// else event.target2.equip({name:result.links[0][2]},[card]);
			game.updateRoundNumber();
			event.finish();
		},
		ai:{
			order:10,
			result:{player:1},
		},
	},
	//--------------张琪瑛改（界了法箓点化真仪）
	xinfu_ybfalu:{
		forced:true,
		audio:'xinfu_falu',
		trigger:{
			player:['loseAfter','enterGame'],
			global:'phaseBefore',
		},
		filter:function (event,player){
			if(event.name!='lose') return (event.name!='phase'||game.phaseNumber==0);
			if(event.type!='discard') return false;
			for(var i=0;i<event.cards2.length;i++){
				if(!player.hasMark('xinfu_falu_'+get.suit(event.cards2[i]))||
					player.countMark('xinfu_falu_'+get.suit(event.cards2[i]))<3) return true;
				else if(player.countMark('xinfu_falu_'+get.suit(event.cards2[i]))>=3&&player.countMark('xinfu_falu_none')<3){
					return true;
				}
			}
			return false;
		},
		content:function (){
			if(trigger.name!='lose'){
				var list66=['spade','heart','club','diamond','none'];
				for(var i=0;i<list66.length;i++){
					if(!player.hasMark('xinfu_falu_'+list66[i])) player.addMark('xinfu_falu_'+list66[i]);
				}
				return;
			}
			for(var i=0;i<trigger.cards2.length;i++){
				var suit=get.suit(trigger.cards2[i]);
				if(!player.hasMark('xinfu_falu_'+suit)||player.countMark('xinfu_falu_'+suit)<3) {
					player.addMark('xinfu_falu_'+suit);
				}
				else if(player.countMark('xinfu_falu_'+suit)>=3&&player.countMark('xinfu_falu_none')<3){
					player.addMark('xinfu_falu_none');
				}
			}
		},
		ai:{threaten:1.4},
	},
	xinfu_falu_none:{
		marktext:'◈',
		intro:{
			name:'虚无',
			content:'mark',
		},
	},
	"xinfu_ybzhenyi":{
		group:["xinfu_ybzhenyi_spade","xinfu_ybzhenyi_club","xinfu_ybzhenyi_heart"],
		trigger:{
			player:"damageEnd",
		},
		audio:'xinfu_zhenyi',
		filter:function (event,player){
			//if(!event.hasNature()) return false;
			return (player.hasMark('xinfu_falu_diamond')||player.hasMark('xinfu_falu_none'));
		},
		prompt2:'弃置「勾陈♦」标记，从牌堆中获得每种类型的牌各一张。',
		content:function (){
			'step 0'
			if(player.hasMark('xinfu_falu_diamond'))player.removeMark('xinfu_falu_diamond');
			else player.removeMark('xinfu_falu_none');
			event.num=0;
			event.togain=[];
			'step 1'
			var card=get.cardPile(function(card){
				for(var i=0;i<event.togain.length;i++){
					if(get.type(card,'trick')==get.type(event.togain[i],'trick')) return false;
				}
				return true;
			});
			if(card){
				event.togain.push(card);
				event.num++;
				if(event.num<3) event.redo();
			}
			'step 2'
			if(event.togain.length){
				player.gain(event.togain,'gain2');
			}
		},
		subSkill:{
			spade:{
				trigger:{
					global:"judge",
				},
				direct:true,
				filter:function(event,player){
					return (player.hasMark('xinfu_falu_spade')||player.hasMark('xinfu_falu_none'));
				},
				content:function(){
					"step 0"
					var str=get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，是否发动【真仪】，弃置「紫薇♠」标记并修改判定结果？';
					player.chooseControl('spade','heart','diamond','club','cancel2').set('prompt',str).set('ai',function(){
						//return '取消';
						var judging=_status.event.judging;
						var trigger=_status.event.getTrigger();
						var res1=trigger.judge(judging);
						var list=lib.suit.slice(0);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0) return 0;
						var getj=function(suit){
							return trigger.judge({
								name:get.name(judging),
								nature:get.nature(judging),
								suit:suit,
								number:5,
							})
						};
						list.sort(function(a,b){
							return (getj(b)-getj(a))*get.sgn(attitude);
						});
						if((getj(list[0])-res1)*attitude>0) return list[0];
						return 'cancel2';
					}).set('judging',trigger.player.judging[0]);
					"step 1"
					if(result.control!='cancel2'){
						player.addExpose(0.25);
						if(player.hasMark('xinfu_falu_spade'))player.removeMark('xinfu_falu_spade');
						else player.removeMark('xinfu_falu_none');
						player.logSkill('xinfu_ybzhenyi',trigger.player);
						//player.line(trigger.player);
						player.popup(result.control);
						game.log(player,'将判定结果改为了','#y'+get.translation(result.control+2)+5);
						trigger.fixedResult={
							suit:result.control,
							color:get.color({suit:result.control}),
							number:5,
						};
					}
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:1,
					},
					expose:0.5,
				},
			},
			club:{
				audio:'xinfu_zhenyi',
				enable:"chooseToUse",
				viewAsFilter:function(player){
					if(player==_status.currentPhase) return false;
					return (player.hasMark('xinfu_falu_club')||player.hasMark('xinfu_falu_none'))&&player.countCards('hs')>0;
				},
				filterCard:true,
				position:"hs",
				viewAs:{
					name:"tao",
				},
				prompt:"弃置「后土♣」标记，将一张手牌当桃使用",
				check:function(card){return 15-get.value(card)},
				precontent:function(){
					if(player.hasMark('xinfu_falu_club'))player.removeMark('xinfu_falu_club');
					else player.removeMark('xinfu_falu_none');
				},
			},
			heart:{
				trigger:{
					source:"damageBegin1",
				},
				audio:'xinfu_zhenyi',
				filter:function (event,player){
					return (player.hasMark('xinfu_falu_heart')||player.hasMark('xinfu_falu_none'));
				},
				check:function (event,player){
					if(get.attitude(player,event.player)>=0) return false;
					if(event.player.hasSkillTag('filterDamage',null,{
						player:player,
						card:event.card,
					})) return false;
					return true;
					//return player.hasMark('xinfu_falu_spade')||get.color(ui.cardPile.firstChild)=='black';
				},
				prompt2:function(event){
					return '弃置「玉清♥」标记，令对'+get.translation(event.player)+'即将造成的伤害+1。';
				},
				logTarget:"player",
				content:function(){
					if(player.hasMark('xinfu_falu_heart'))player.removeMark('xinfu_falu_heart');
					else player.removeMark('xinfu_falu_none');
					trigger.num++;
				},
			},
		}
	},
	"xinfu_ybdianhua":{
		trigger:{
			player:["phaseZhunbeiBegin","phaseJieshuBegin"],
		},
		frequent:true,
		audio:'xinfu_dianhua',
		filter:function (event,player){
			var list=['spade','heart','club','diamond','none'];
			for(var i=0;i<list.length;i++){
				if(player.hasMark('xinfu_falu_'+list[i])) return true;
			}
			return false;
		},
		content:function (){
			'step 0'
			var num=0;
			var list66=['spade','heart','club','diamond','none'];
			for(var i=0;i<list66.length;i++){
				if(player.hasMark('xinfu_falu_'+list66[i])) num+=(player.countMark('xinfu_falu_'+list66[i]));
			}
			var cards=get.cards(num);
			game.cardsGotoOrdering(cards);
			var next=player.chooseToMove();
			next.set('list',[
				['牌堆顶',cards],
				['牌堆底'],
			]);
			next.set('prompt','点化：点击将牌移动到牌堆顶或牌堆底');
			next.processAI=function(list){
				var cards=list[0][1],player=_status.event.player;
				var target=(_status.event.getTrigger().name=='phaseZhunbei')?player:player.next;
				var att=get.sgn(get.attitude(player,target));
				var top=[];
				var judges=target.getCards('j');
				var stopped=false;
				if(player!=target||!target.hasWuxie()){
					for(var i=0;i<judges.length;i++){
						var judge=get.judge(judges[i]);
						cards.sort(function(a,b){
							return (judge(b)-judge(a))*att;
						});
						if(judge(cards[0])*att<0){
							stopped=true;break;
						}
						else{
							top.unshift(cards.shift());
						}
					}
				}
				var bottom;
				if(!stopped){
					cards.sort(function(a,b){
						return (get.value(b,player)-get.value(a,player))*att;
					});
					while(cards.length){
						if((get.value(cards[0],player)<=5)==(att>0)) break;
						top.unshift(cards.shift());
					}
				}
				bottom=cards;
				return [top,bottom];
			}
			"step 1"
			var top=result.moved[0];
			var bottom=result.moved[1];
			top.reverse();
			for(var i=0;i<top.length;i++){
				ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
			}
			for(i=0;i<bottom.length;i++){
				ui.cardPile.appendChild(bottom[i]);
			}
			player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(bottom.length)+'下');
			game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
			game.updateRoundNumber();
			game.delayx();
		},
		ai:{
			threaten:2.2
		},
	},
	//----------------界神诸葛亮
	ybsl_qixing:{
		audio:'qixing',
		unique:true,
		trigger:{
			global:'phaseBefore',
			player:'enterGame',
		},
		forced:true,
		locked:false,
		filter:function(event,player){
			return (event.name!='phase'||game.phaseNumber==0);
		},
		content:function(){
			"step 0"
			player.addToExpansion(get.cards(7),'draw').gaintag.add('qixing');
			"step 1"
			var cards=player.getExpansions('qixing');
			if(!cards.length||!player.countCards('h')){
				event.finish();
				return;
			}
			var next=player.chooseToMove('七星：是否交换“星”和手牌？');
			next.set('list',[
				[get.translation(player)+'（你）的星',cards],
				['手牌区',player.getCards('h')],
			]);
			next.set('filterMove',function(from,to){
				return typeof to!='number';
			});
			next.set('processAI',function(list){
				var player=_status.event.player,cards=list[0][1].concat(list[1][1]).sort(function(a,b){
					return get.useful(a)-get.useful(b);
				}),cards2=cards.splice(0,player.getExpansions('qixing').length);
				return [cards2,cards];
			});
			"step 2"
			if(result.bool){
				var pushs=result.moved[0],gains=result.moved[1];
				pushs.removeArray(player.getExpansions('qixing'));
				gains.removeArray(player.getCards('h'));
				if(!pushs.length||pushs.length!=gains.length) return;
				player.addToExpansion(pushs,player,'giveAuto').gaintag.add('qixing');
				//game.log(player,'将',pushs,'作为“星”置于武将牌上');
				player.gain(gains,'draw');
			}
		},
		intro:{
			markcount:function(storage,player){
				var content=player.getExpansions('qixing');
				return content.length;
			},
			mark:function(dialog,content,player){
				var content=player.getExpansions('qixing');
				if(content&&content.length){
					if(player==game.me||player.isUnderControl()){
						dialog.addAuto(content);
					}
					else{
						return '共有'+get.cnNumber(content.length)+'张星';
					}
				}
			},
			content:function(content,player){
				var content=player.getExpansions('qixing');
				if(content&&content.length){
					if(player==game.me||player.isUnderControl()){
						return get.translation(content);
					}
					return '共有'+get.cnNumber(content.length)+'张星';
				}
			}
		},
		group:['ybsl_qixing_2'],
		ai:{combo:'dawu'},
		subSkill:{
			2:{
				trigger:{
					player:'phaseDrawAfter'
				},
				prompt:'收回所有星，并将至多7张手牌充入星',
				content:function(){
					'step 0'
					player.gain(player.getExpansions('qixing'),'gain2');
					player.logSkill('qixing2');
					'step 1'
					player.chooseCard('h',[1,7],'将至多七张手牌置于武将牌上称为星').set('ai',function(card){
						return 6-get.value(card);
					});
					'step 2'
					game.log(player,'将',result.cards,'作为“星”置于武将牌上');
					player.addToExpansion(result.cards,player,'giveAuto').gaintag.add('qixing');
				},
			}
		}
	},
	ybsl_kuangfeng:{
		unique:true,
		audio:2,
		enable:'phaseUse',
		usable:1,
		filter:function(event,player){
			return player.getExpansions('qixing').length;
		},
		filterTarget:function (card,player,target){
			return !target.hasSkill('kuangfeng2');
		},
		selectTarget:1,
		content:function(){
			'step 0'
			target.addAdditionalSkill(`kuangfeng_${player.playerid}`,'kuangfeng2');
			target.markAuto('kuangfeng2',[player]);
			player.addTempSkill('kuangfeng3',{player:'phaseBeginStart'})
			player.chooseCardButton('选择弃置'+get.cnNumber(1)+'张“星”',1,player.getExpansions('qixing'),true);
			'step 1'
			player.loseToDiscardpile(result.links);
		},
		ai:{combo:'ybsl_qixing'},
		group:'ybsl_kuangfeng_66',
		subSkill:{
			66:{
				unique:true,
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player.getExpansions('qixing').length;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('kuangfeng'),'令一名角色获得“狂风”标记',function(card,player,target){
						return !target.hasSkill('kuangfeng2');
					}).ai=function(target){
						return -1;
					}
					'step 1'
					if(result.bool){
						var targets=result.targets.sortBySeat();
						player.logSkill('kuangfeng',targets,'fire');
						var length=targets.length;
						targets.forEach(target=>{
							target.addAdditionalSkill(`kuangfeng_${player.playerid}`,'kuangfeng2');
							target.markAuto('kuangfeng2',[player]);
						});
						player.addTempSkill('kuangfeng3',{player:'phaseBeginStart'})
						player.chooseCardButton('选择弃置'+get.cnNumber(length)+'张“星”',length,player.getExpansions('qixing'),true);
					}
					else{
						event.finish();
					}
					'step 2'
					player.loseToDiscardpile(result.links);
				},
			}
		}
	},
	//------------界佐藤雏（神视）
	hina_ybshenshi:{
		firstDo:true,
		groupSkill:true,
		trigger:{player:['phaseUseBegin','phaseUseEnd']},
		frequent:true,
		filter:function(event,player){
			return player.group=='shen';
		},
		content:function(){
			'step 0'
			player.draw(2).gaintag=['hina_shenshi'];
			player.addSkill('hina_shenshi_yingbian');
			'step 1'
			var cards=player.getCards('h',function(card){
				return card.hasGaintag('hina_shenshi');
			});
			if(!cards.length) event.finish();
			else if(cards.length==1) event._result={bool:true,cards:cards};
			else player.chooseCard('h',true,'将一张牌置于牌堆顶');
			'step 2'
			if(result.bool){
				game.log(player,'将一张牌置于了牌堆顶');
				player.lose(result.cards,ui.cardPile,'insert');
				player.$throw(1,1000);
			}
			else event.finish();
			'step 3'
			game.delayx();
		},
		onremove:function(player){
			player.removeGaintag('hina_shenshi');
		},
		mod:{
			ignoredHandcard:function(card,player){
				if(card.hasGaintag('hina_shenshi')) return true;
			},
			cardDiscardable:function(card,player,name){
				if(name=='phaseDiscard'&&card.hasGaintag('hina_shenshi')) return false;
			},
		},
		group:'hina_shenshi_yingbian',
	},
	//------------界神户小鸟
	kotori_ybyumo:{
		trigger:{
			global:['phaseBefore','die'],
			player:'enterGame',
		},
		forced:true,
		charlotte:true,
		filter:function(event,player){
			return (event.name!='phase'||game.phaseNumber==0||event.name=='die');
		},
		content:function(){
			var list=['wei','shu','wu','qun','jin','key','YB_memory','YB_dream'];
			for(var i of list){
				if(player.countMark('kotori_yumo_'+i)<3){
					player.addMark('kotori_yumo_'+i,1,false);
					game.log(player,'获得了一个',lib.translate['kotori_yumo_'+i].replace(/魔物/g,'【魔物】'));
				}
			}
		},
		group:['kotori_ybyumo_damage','kotori_ybyumo_gain'],
		subSkill:{
			damage:{
				trigger:{global:'damageEnd',player:'phaseBegin'},
				forced:true,
				filter:function(event,player){
					var name='kotori_yumo_'+event.player.group;
					return (lib.skill[name]&&player.countMark(name)<3)||event.player.group=='shen';
				},
				popup:false,
				content:function(){
					'step 0'
					game.log(player,'对',trigger.player,'发动了','#g【驭魔】');
					if(trigger.player.group=='shen'){
						event.num=0;
						event.goto(1);
					}
					else{
						var group=trigger.player.group;
						player.popup('驭魔',get.groupnature(group));
						player.addMark('kotori_yumo_'+group,1,false);
						game.log(player,'获得了一个',lib.translate['kotori_yumo_'+group].replace(/魔物/g,'【魔物】'));
						event.finish();
					}
					'step 1'
					event.num++;
					event.list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
					event.list2=[];
					for(var i of event.list){
						if(player.countMark('kotori_yumo_'+i)<3){
							event.list2.push(i);
						}
					}
					'step 2'
					if(event.list2.length>0){
						var group=event.list2.randomGets(1);
						player.popup('驭魔',get.groupnature(group[0]));
						player.addMark('kotori_yumo_'+group[0],1,false);
						game.log(player,'获得了一个',lib.translate['kotori_yumo_'+group[0]].replace(/魔物/g,'【魔物】'));
					}
					else{event.goto(3);}
					'step 3'
					if(event.num&&event.num<2){
						event.goto(1);
					}
					else{
						event.finish();
					}
				},
			},
			gain:{
				trigger:{player:'phaseBegin'},
				direct:true,
				filter:function(event,player){
					var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
					for(var i in list){
						if(player.hasMark('kotori_yumo_'+list[i]))	return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					event.list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
					event.list2=[];
					for(var i of event.list){
						if(player.hasMark('kotori_yumo_'+i))	event.list2.push('kotori_skill_'+i);
					}
					event.list2.push('cancel2');
					'step 1'
					player.chooseControl(event.list2).set('prompt','###是否发动【驭魔】？###弃置对应的标记并获得下列技能中的一个，或点取消，不获得技能').set('choice',function(){
						if(event.list2.includes('kotori_skill_shu')&&player.countCards('h',function(card){
							return get.name(card,player)=='sha'&&player.getUseValue(card)>0;
						})>1) return 'kotori_skill_shu';
						if(event.list2.includes('kotori_skill_key')&&player.hp>1) return 'kotori_skill_key';
						if(event.list2.includes('kotori_skill_qun')&&player.isDamaged()&&player.needsToDiscard()>1) return 'kotori_skill_qun';
						return 'cancel2';
					}()).set('ai',function(){
						return _status.event.choice;
					});
					'step 2'
					if(result.control!='cancel2'){
						player.logSkill('kotori_yumo');
						var name='kotori_yumo_'+result.control.slice(13);
						player.removeMark(name,1,false);game.log(player,'移去了一个',lib.translate[name].replace(/魔物/g,'【魔物】'));
						player.addTempSkill(result.control);
						game.log(player,'获得了技能',lib.translate[name].replace(/魔物/g,'【'+get.translation(result.control)+'】'));
						event.list2.remove(result.control);
						event.goto(1)
					}
				},
			},
		},
	},
	kotori_yumo_YB_memory:{
		marktext:'<span style=\'color:#28e3ce\'>魔</span>',
		intro:{name:'<span style=\'color:#28e3ce\'>魔物</span>',content:'mark'},
	},
	kotori_yumo_YB_dream:{
		marktext:'<span style=\'color:#e328b7\'>魔</span>',
		intro:{name:'<span style=\'color:#e328b7\'>魔物</span>',content:'mark'},
	},
	kotori_skill_YB_memory:{
		trigger:{
			player:'phaseEnd',
		},
		direct:true,
		content:function (){
			'step 0'
			var discarded=get.discarded();
			if(discarded.length){
				player.chooseCardButton('选择一张获得之',discarded).set('ai',function(button){
					return get.value(button.link);
				});
			}
			else{
				event.finish();
			}
			'step 1'
			if(result.bool&&result.links&&result.links.length){
				player.gain(result.links,'gain2');
			}
			event.finish();
		},
	},
	kotori_skill_YB_dream:{
		audio:'ext:夜白神略/image/audio:2',
		trigger:{
			player:'phaseZhunbeiBegin',
		},
		groupSkill:true,
		direct:true,
		content:function (){
			'step 0'
			player.chooseControl('是','cancel2').set('prompt','是否摸两张牌，令本回合手牌上限-1').set('ai',function(){
				if(player.hasJudge('lubu')){
					return 'cancel2';
				}
				return '是';
			});
			'step 1'						
			if(result.control=='cancel2'){
				event.finish();return;
			}
			player.logSkill('kotori_skill_YB_dream');
			player.draw(2);
			player.addTempSkill('kotori_skill_YB_dream_buff');
		},
		subSkill:{
			buff:{
				mark:true,
				marktext:'散',
				trigger:{
					player:'phaseDiscardBefore',
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseToDiscard(2,'he').set('prompt','是否弃置两张牌，取消此次手牌上限减一？'
														).set('ai',function(card){
						return player.countCards('h')>player.getHandcardLimit();
					});
					'step 1'
					if(result.bool){
						player.removeSkill('kotori_skill_YB_dream_buff');
					}
				},
				intro:{
					content:'本回合手牌上限-1',
				},
				mod:{
					maxHandcard:function (player,num){
						return num-1;
					},
				},
				sub:true,
			},
		},
	},
	kotori_ybhuazhan:{
		charlotte:true,
		enable:'chooseToUse',
		filter:function(event,player){
			var bool=false;
			var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
			for(var i of list){
				if(player.hasMark('kotori_yumo_'+i)&&!player.getStorage('kotori_huazhan2').includes('kotori_yumo_'+i)){
					bool=true;break;
				}
			}
			return	bool&&event.filterCard({name:'kaihua',isCard:true},player,event);
		},
		chooseButton:{
			dialog:function(event,player){
				return ui.create.dialog('###花绽###'+lib.translate.kotori_huazhan_info);
			},
			chooseControl:function(event,player){
				var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
				var list2=[];
				for(var i of list){
					if(player.hasMark('kotori_yumo_'+i)&&
						!player.getStorage('kotori_huazhan2').includes('kotori_yumo_'+i))
						list2.push('kotori_yumo_'+i);
				}
				list2.push('cancel2');
				return list2;
			},
			check:function(){
				var player=_status.event.player;
				var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
				var list2=[];
				for(var i of list){
					if(player.hasMark('kotori_yumo_'+i)&&
						!player.getStorage('kotori_huazhan2').includes('kotori_yumo_'+i))
						list2.push('kotori_yumo_'+i);
				}
				if(list2.includes('kotori_yumo_wei')) return 'kotori_yumo_wei';
				if(list2.includes('kotori_yumo_wu')) return 'kotori_yumo_wu';
				if(list2.includes('kotori_yumo_qun')) return 'kotori_yumo_qun';
				if(list2.includes('kotori_yumo_key')) return 'kotori_yumo_key';
				if(list2.includes('kotori_yumo_YB_memory')) return 'kotori_yumo_YB_memory';
				if(list2.includes('kotori_yumo_YB_dream')) return 'kotori_yumo_YB_dream';
				if(list2.includes('kotori_yumo_shu')&&game.hasPlayer(function(current){
					return current.group=='shu';
				})) return 'kotori_yumo_shu';
				return 'cancel2';
			},
			backup:function(result,player){
				return {
					markname:result.control,
					viewAs:{name:'kaihua',isCard:true},
					filterCard:function(){return false},
					selectCard:-1,
					precontent:function(){
						delete event.result.skill;
						var name=lib.skill.kotori_huazhan_backup.markname;
						if(!player.storage.kotori_huazhan2) player.storage.kotori_huazhan2=[];
						player.storage.kotori_huazhan2.push(name);
						player.addTempSkill('kotori_huazhan2');
						player.popup('花绽',get.groupnature(name.slice(12)));
						game.log(player,'发动了技能',lib.translate[name].replace(/魔物/g,'【花绽】'));
						player.removeMark(name,1,false);
						;game.log(player,'移去了一个',lib.translate[name].replace(/魔物/g,'【魔物】'));
					},
				}
			}
		},
		ai:{
			order:1,
			result:{
				player:function(player){
					if(player.countCards('he',function(card){
						if(get.type(card,player)=='equip') return get.value(card)<6;
						return get.value(card)<5;
					})<2) return 0;
					return player.getUseValue({name:'kaihua'});
				},
			},
		},
		group:['kotori_ybhuazhan_fly','kotori_ybhuazhan_recover'],
		subSkill:{
			fly:{
				name:'花飞',
				charlotte:true,
				enable:'chooseToUse',
				filter:function(event,player){
					var bool=false;
					var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
					for(var i of list){
						if(player.hasMark('kotori_yumo_'+i)&&!player.getStorage('kotori_huazhan3').includes('kotori_yumo_'+i)){
						bool=true;break;
						}
					}
					return	bool&&event.filterCard({name:'kaihua',isCard:true},player,event);
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('###花绽###'+lib.translate.kotori_huazhan_info);
					},
					chooseControl:function(event,player){
						var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
						var list2=[];
						for(var i of list){
							if(player.hasMark('kotori_yumo_'+i)&&!player.getStorage('kotori_huazhan3').includes('kotori_yumo_'+i))
								list2.push('kotori_yumo_'+i);
						}
						list2.push('cancel2');
						return list2;
					},
					check:function(){
						var player=_status.event.player;
						var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
						var list2=[];
						for(var i of list){
							if(player.hasMark('kotori_yumo_'+i)&&
								!player.getStorage('kotori_huazhan3').includes('kotori_yumo_'+i))
								list2.push('kotori_yumo_'+i);
						}
						if(list2.includes('kotori_yumo_wei')) return 'kotori_yumo_wei';
						if(list2.includes('kotori_yumo_wu')) return 'kotori_yumo_wu';
						if(list2.includes('kotori_yumo_qun')) return 'kotori_yumo_qun';
						if(list2.includes('kotori_yumo_key')) return 'kotori_yumo_key';
						if(list2.includes('kotori_yumo_YB_memory')) return 'kotori_yumo_YB_memory';
						if(list2.includes('kotori_yumo_YB_dream')) return 'kotori_yumo_YB_dream';
						if(list2.includes('kotori_yumo_shu')&&game.hasPlayer(function(current){
							return current.group=='shu';
						})) return 'kotori_yumo_shu';
						return 'cancel2';
					},
					backup:function(result,player){
						return {
							markname:result.control,
							viewAs:{name:'yihuajiemu',isCard:true},
							filterCard:function(){return false},
							selectCard:-1,
							precontent:function(){
								delete event.result.skill;
								var name=lib.skill.kotori_huazhan_fly_backup.markname;
								if(!player.storage.kotori_huazhan3) player.storage.kotori_huazhan3=[];
								player.storage.kotori_huazhan3.push(name);
								player.addTempSkill('kotori_huazhan3');
								player.popup('花绽',get.groupnature(name.slice(12)));
								game.log(player,'发动了技能',lib.translate[name].replace(/魔物/g,'【花绽】'));
								player.removeMark(name,1,false);
								;game.log(player,'移去了一个',lib.translate[name].replace(/魔物/g,'【魔物】'));
							},
						}
					}
				},
				ai:{
					order:7,
					result:{
						target:function(player,target){
							return player.getUseValue({name:'yihuajiemu'});
						}
					}
				}
			},
			recover:{
				name:'愈伤',
				charlotte:true,
				enable:'chooseToUse',
				filter:function(event,player){
					var bool=false;
					var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
					for(var i of list){
						if(player.hasMark('kotori_yumo_'+i)&&!player.getStorage('kotori_huazhan4').includes('kotori_yumo_'+i)){
							bool=true;break;
						}
					}
					return	bool&&event.filterCard({name:'kaihua',isCard:true},player,event);
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('###花绽###'+lib.translate.kotori_huazhan_info);
					},
					chooseControl:function(event,player){
						var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
						var list2=[];
						for(var i of list){
							if(player.hasMark('kotori_yumo_'+i)&&
								!player.getStorage('kotori_huazhan4').includes('kotori_yumo_'+i))
								list2.push('kotori_yumo_'+i);
						}
						list2.push('cancel2');
						return list2;
					},
					check:function(){
						var player=_status.event.player;
						var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
						var list2=[];
						for(var i of list){
							if(player.hasMark('kotori_yumo_'+i)&&
								!player.getStorage('kotori_huazhan4').includes('kotori_yumo_'+i))	list2.push('kotori_yumo_'+i);
						}
						if(list2.includes('kotori_yumo_wei')) return 'kotori_yumo_wei';
						if(list2.includes('kotori_yumo_wu')) return 'kotori_yumo_wu';
						if(list2.includes('kotori_yumo_qun')) return 'kotori_yumo_qun';
						if(list2.includes('kotori_yumo_key')) return 'kotori_yumo_key';
						if(list2.includes('kotori_yumo_YB_memory')) return 'kotori_yumo_YB_memory';
						if(list2.includes('kotori_yumo_YB_dream')) return 'kotori_yumo_YB_dream';
						if(list2.includes('kotori_yumo_shu')&&game.hasPlayer(function(current){
							return current.group=='shu';
						})) return 'kotori_yumo_shu';
						return 'cancel2';
					},
					backup:function(result,player){
						return {
							markname:result.control,
							viewAs:{name:'guaguliaodu',isCard:true},
							filterCard:function(){return false},
							selectCard:-1,
							precontent:function(){
								delete event.result.skill;
								var name=lib.skill.kotori_huazhan_recover_backup.markname;
								if(!player.storage.kotori_huazhan4) player.storage.kotori_huazhan4=[];
								player.storage.kotori_huazhan4.push(name);
								player.addTempSkill('kotori_huazhan4');
								player.popup('花绽',get.groupnature(name.slice(12)));
								game.log(player,'发动了技能',lib.translate[name].replace(/魔物/g,'【花绽】'));
								player.removeMark(name,1,false);
								;game.log(player,'移去了一个',lib.translate[name].replace(/魔物/g,'【魔物】'));
							},
						}
					}
				},
				ai:{
					order:2,
					tag:{
						recover:1,
					},
					result:{
						target:function(player,target){
							return player.getUseValue({name:'guaguliaodu'});
						}
					}
				},
			},
		},
	},
	kotori_huazhan3:{onremove:true,},
	kotori_huazhan4:{onremove:true,},
	//--------------sp乌米酱
	//------------界马钧
	xinfu_ybjingxie:{
		getJingxie:function(){
			return [
				'bagua','baiyin','lanyinjia','renwang','tengjia','zhuge',
				'ybsl_wangzhui','chitu','zhuque','wuxinghelingshan','yitianjian',
				'shandian','fulei','taigongyinfu','ybsl_tianleiyubi','hongshui',
				'huoshan',/*'du',*/'chiyanzhenhunqin','tongque','qinglong',
				'fangtian','wutiesuolian','huxinjing','goujiangdesidai'
			];
		},
		firstDo:true,
		// group:['xinfu_jingxie2'/*,'ybsl_tianhuoduan_skill'*/],
		group: ["xinfu_jingxie_recast"],
		position:'he',
		audio:'xinfu_jingxie',
		enable:'phaseUse',
		filter:function(event,player){
			var he=player.getCards('he');
			var list=lib.skill.xinfu_ybjingxie.getJingxie();
			for(var i=0;i<he.length;i++){
				if(list.includes(he[i].name)) return true;
			}
			return false;
		},
		filterCard:function(card,player){
			var list=lib.skill.xinfu_ybjingxie.getJingxie();
			return list.includes(card.name);
		},
		discard:false,
		lose:false,
		delay:false,
		check:function(){
			return 1;
		},
		content:function(){
			'step 0'
			player.showCards(cards);
			'step 1'
			var card=cards[0];
			var bool=(get.position(card)=='e');
			// var tag=[];
			// // if(get.cardtag(card,'gifts')){tag.push('gifts');}
			// for(var i of _status.cardtag){
			// 	if(get.cardtag(card,i)){tag.push(i);}
			// }
			if(bool) player.removeEquipTrigger(card);
			game.addVideo('skill',player,['xinfu_ybjingxie',[bool,get.cardInfo(card)]])
			game.broadcastAll(function(card){
				if(card.name=='wuxinghelingshan'){card.name='zhuque'}
				if(card.name=='chiyanzhenhunqin'){card.name='zhuque'}
				if(card.name=='shandian'&&card.suit=='spade'){card.name='fulei'}
				if(card.name=='taigongyinfu'){card.name='fulei'}
				if(card.name=='hongshui'){card.name='shandian'}
				if(card.name=='huoshan'){card.name='shandian'}
				if(card.name=='wutiesuolian'){card.name='fangtian'}
				card.init([card.suit,card.number,'rewrite_'+card.name,card.nature/*,tag*/]);
				//
				if (bool && card.card && player.vcardsMap?.equips) {
					const cardx = game.createCard("rewrite_" + card.card.name, card.card.suit, card.card.number);
					player.vcardsMap.equips[player.vcardsMap.equips.indexOf(card.card)] = cardx;
					card.card = cardx;
				}
				//
			},card,bool);//bool
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
		ai:{
			basic:{
				order:10,
			},
			result:{
				player:1,
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
		filter: function(event, player) {
			// game.log( event.getParent().skill );
			// game.log( event.getParent().name );
			// game.log( event.getParent(2).skill );
			// game.log( event.getParent(2).name );
			// game.log( event.getParent(2) );
			if (event.getParent(2).name == "ybsl_zigong") return false;
			return true;
		},
		// check:true,
		check: function(event, player) {
			return true;
		},
		content: function*(event, map) {
			let trigger = map.trigger,
				player = map.player;
			var cards = trigger.cards;
			let num = Math.min(cards.length, 5);
			yield player.discard(trigger.cards);
			yield player.draw(num);
		},
	},
	ybsl_zicai: {
		audio: 'nzry_chenglue',
		trigger: {
			player: 'discardAfter',
		},
		check: function(event, player) {
			return true;
		},
		filter: function(event, player) {
			return true;
		},
		derivation: 'ybsl_zhaosanmusi',
		content: function*(event, map) {
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
							isCard: true,
							card: cards,
						},
						cards,
						"请选择火【杀】的目标。",
						false
					);
					break;
				case 2:
					yield player.chooseUseTarget({
							name: "diaobingqianjiang",
							isCard: true,
							card: cards,
						},
						cards,
						"是否使用【调兵谴将】。",
						false
					);
					break;
				case 3:
					yield player.chooseUseTarget({
							name: "yiyi",
							isCard: true,
							card: cards,
						},
						cards,
						"是否使用【以逸待劳】。",
						false
					);
					break;
				case 4:
					yield player.chooseUseTarget({
							name: "zengbin",
							isCard: true,
							card: cards,
						},
						cards,
						"是否使用【增兵减灶】。",
						false
					);
					break;
				default:
					yield player.chooseUseTarget({
							name: "ybsl_zhaosanmusi",
							isCard: true,
							card: cards,
						},
						cards,
						"是否使用【朝三暮四】。",
						false
					);
					break;
			}
		},
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
		filter: function(event, player) {
			if (player == _status.currentPhase) return false;
			if (event.name == "gain" && event.player == player) return false;
			var evt = event.getl(player);
			return evt && evt.cards2 && evt.cards2.length > 0;
		},
		content: function*(event, map) {
			let trigger = map.trigger,
				player = map.player;
			var result = yield player.judge(function(card) {
				if (get.suit(card) == "heart") return -1;
				return 1;
			}).set('judge2', function(result) {
				return result.bool;
			});
			if (!result.bool || get.position(result.card) != "d") {
				//game.cardsDiscard(card);
				event.finish();
				return;
			} else {
				var card = result.card;
				var next = yield player.chooseBool("是否将" + get.translation(card) + "作为“田”置于武将牌上？").ai =
					function() {
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
		onremove: function(player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		group: "ybsl_tuntian_dist",
		locked: false,
		subSkill: {
			dist: {
				locked: false,
				mod: {
					globalFrom: function(from, to, distance) {
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
				target: function(card, player, target, current) {
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
			threaten: function(player, target) {
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
		filter: function(event, player) {
			return (player.getExpansions("tuntian").length > 0 || player.countDiscardableCards(player, 'he')) && game.countPlayer(function(current) {
				return current != player && (ai.get.attitude(player, current) < 0);
			}) > 0
		},
		check: function(card) {
			return 8 - get.value(card);
		},
		chooseButton: {
			dialog: function(event, player) {
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
			backup: function(links, player) {
				return {
					audio: "ybsl_quanfan",
					filterTarget: false,
					filterCard: function() {
						return false;
					},
					selectCard: -1,
					card: links[0],
					delay: false,
					content: lib.skill.ybsl_quanfan.contentx,
					ai: {
						order: 10,
						result: {
							target: function(player, target) {
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
		contentx: function() {
			'step 0'
			var vard = lib.skill.ybsl_quanfan_backup.card;
			player.discard(vard);
			'step 1'
			var next = player.judge(function(card) {
				if (get.suit(card) == "heart") return -1;
				return 1;
			});
			next.judge2 = function(result) {
				return result.bool;
			};
			'step 2'
			event.card = result.card;
			if (game.filterPlayer().filter(tar => tar != player && tar.countCards('h'))) player.chooseTarget('展示一名其他角色的至多Y张手牌（Y为其体力值且至多为5），弃置其中与判定颜色相同的牌。', true, function(card, player, target) {
				return target.countCards('h') && target != player;
			}).set('ai', function(target) {
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
	// ybsl_quanbian_info:'出牌阶段，当你使用牌后，若此花色为你本阶段首次使用，你可以摸一张牌。否则你需失去一点体力，且攻击范围+1。',
	// ybsl_quanbianx:'权辩',
	// ybsl_quanbianx_info:'出牌阶段，当你使用牌后，你可以摸一张牌，每种花色每阶段限一次。若如此做，本阶段你再次使用该花色牌后，你需失去一点体力，且攻击范围+1。',
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

		content: function() {
			"step 0"
			var suit1 = get.suit(trigger.card);
			var suits = get.YB_suit(player.getHistory("useCard", function(evt) {
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
					content: function(event, player, storage, name, skill) {
						var text = '';
						// if(player.storage.ybsl_quanbian_mark) text +='本阶段已因'+player.storage.ybsl_quanbianx_mark+'触发过技能。';
						if (player.storage.ybsl_quanbian_markR) text += '本阶段因此技能增加攻击范围' + player.storage.ybsl_quanbian_markR;
					},
				},
				mod: {
					attackRange: function(player, distance) {
						return (
							distance + player.storage.ybsl_quanbian_markR
						);
					},
				},
				init: function(player) {
					if (!player.storage.ybsl_quanbian_markR) player.storage.ybsl_quanbian_markR = 0;
				},
				forced: true,
				onremove: function(player) {
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
		content: function() {
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
					content: function(event, player, storage, name, skill) {
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
				init: function(player) {
					if (!player.storage.ybsl_quanbianx_mark) player.storage.ybsl_quanbianx_mark = [];
					if (!player.storage.ybsl_quanbianx_markR) player.storage.ybsl_quanbianx_markR = 0;
				},
				// lastdo:true,
				forced: true,
				mod: {
					attackRange: function(player, distance) {
						return (
							distance + player.storage.ybsl_quanbianx_markR
						);
					},
				},
				onremove: function(player) {
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
	// // ybsl_quanbian_info:'出牌阶段，当你使用牌时，若此花色为你本阶段首次使用，你可以摸一张牌。否则此牌结算完成后，你需失去一点体力，且攻击范围+1。',
	// // ybsl_quanbianx:'权辩',
	// // ybsl_quanbianx_info:'出牌阶段，当你使用牌时，你可以摸一张牌。若此花色不为你本阶段首次触发，此牌结算完成后，你需失去一点体力，且攻击范围+1。',
	// // ybsl_quanbian:'权辩',
	// // ybsl_quanbian_info:'出牌阶段，当你使用牌时，若此花色为你本阶段首次使用，你可以摸一张牌。否则你需失去一点体力，且攻击范围+1。',
	// // ybsl_quanbianx:'权辩',
	// // ybsl_quanbianx_info:'出牌阶段，当你使用牌时，你可以摸一张牌。若此花色不为你本阶段首次触发，你需失去一点体力，且攻击范围+1。',
	// ybsl_zhaxiang:'诈降',
	// ybsl_zhaxiang_info:'此技能仅提供一条语音。',
	ybsl_ranxin: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			global: 'phaseEnd'
		},
		filter: function(event, player) {
			if (!_status.currentPhase || !_status.currentPhase.isIn()) return false;
			if(event.player==player)return true;
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
		// .set("choiceList", ["令"+ get.translation(trigger.player) +"回复一点体力", "令" + get.translation(trigger.player) + "摸两张牌","cancel2"])
		// .set("ai", function () {
		// if (get.effect(_status.event.getTrigger().player, { name: "sha" }, _status.event.player) > 0) {

		// }
		// return 2;
		// })
		// .forResult();
		// event.result.cost_data.index = index;
		// },
		direct: true,
		content: function*(event, map) {
			let trigger = map.trigger,
				player = map.player;
			let target = trigger.player;
			var result = yield player
				.chooseControl()
				.set("prompt", "燃心：请选择一项，然后视为对其使用一张伤害+1的火【杀】")
				.set("choiceList", ["令" + get.translation(trigger.player) + "回复一点体力", "令" + get.translation(trigger.player) + "摸两张牌", "取消"])
				.set("ai", function() {
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
			if (result.index!=2) {
				yield player.logSkill('ybsl_ranxin', target);
				if (result.index==0) {
					yield target.recover();
				} else yield target.draw(2);
				// yield player.useCard({
					// name: "sha",
					// nature: 'fire'
				// }, target).baseDamage++;
				
				if(player!=target)yield player.useCard({
					name: "sha",
					nature: 'fire',
					ybdamage:true,
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
				filter: function(event, player) {
					if (event.card&&event.card.ybdamage) return true;
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
		filter: function(event, player, name) {
			if (name == 'rewriteGainResult') return event.player != player;
			else return event.source != player;
		},
		content: function() {
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
	// ybsl_ranxin:'燃心',
	// ybsl_ranxin_info:'每个回合结束时，若为你的回合，或本回合有阶段被跳过或有伤害被防止，你可令当前回合角色回复1点体力或摸两张牌，然后视为对其使用一张伤害+1的火【杀】。',
	// ybsl_fuju:'付炬',
	// ybsl_fuju_info:'锁定技，其他角色获得你的牌/对你造成伤害时，你改为弃置之/失去1点体力。然后你依次执行：①若其体力值大于你，你对其造成1点伤害；②若其手牌数大于你，你弃置其一张牌。',
	//宗族武将


	ybsl_clanxingzu: {
		// audio:'ext:夜白神略/audio/character:2',
		clanSkill: true,
		trigger: {
			player: 'useCardAfter',
		},
		filter: function(event, player) {
			if (player.getStat("damage")) return false;
			var list = [];
			player.getHistory("useCard", function(evt) {
				if (evt.card != event.card) list.push(evt.card);
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
			event.result = await player.chooseTarget(1, function(card, player, target) {
				return list.includes(target)
			}).set('prompt', '请选择一名同族角色，令其发动一个出牌阶段限一次的技能').set('ai', function(target) {
				if (list.includes(player)) return target == player;
				else {
					return get.attitude(player, target);
				}
			}).forResult();
		},
		// popup: false,
		content: function*(event, map) {
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
			if (skill.control) {
				if(!targets[0].getStat('skill')[skill.control])yield targets[0].getStat('skill')[skill.control]=0;
				yield targets[0].getStat('skill')[skill.control]--;
				// yield game.log('发动兴族时',targets[0].getStat('skill')[skill.control]);
				var skillName = skill.control;
				//↓此段代码感谢霸天大佬的指导
				var next = targets[0].chooseToUse();
				next.set("openskilldialog", get.prompt(skillName));
				next.set("norestore", true);
				next.set("_backupevent", skillName);
				next.set("custom", {
					add: {},
					replace: {
						window: function() {}
					},
				});
				// next.set('addCount',false);
				next._triggered = null;
				next.backup(skillName);
				
				yield next;
				
				// if(targets[0].getStat('skill')[skill.control]&&targets[0].getStat('skill')[skill.control]>0)
				// yield targets[0].getStat('skill')[skill.control]--;
				// yield game.log('发动兴族后',targets[0].getStat('skill')[skill.control]);
				//↑此段代码感谢霸天大佬的指导
				// if(targets[0].getStat('skill')[skill.control]&&targets[0].getStat('skill')[skill.control]>0) yield targets[0].getStat('skill')[skill.control]--;
			}
		},
	},
	/*
	ybsl_clanxingzu:'兴族',
	ybsl_clanxingzu_info:'宗族技，当你每回合首次使用一种类型的牌后，若你本回合未造成伤害，你可以令一名同族角色发动一个出牌阶段限一次的技能（不计入次数）。',//可能些微调整
	*/
	ybsl_lxtujing: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: 'phaseUse',
		usable: 1,
		filterTarget: function(card, player, target) {
			return player != target && !target.isMinHandcard(); //此函数加true为全场唯一
		},
		content: function*(event, map) {
			let trigger = map.trigger,
				player = map.player,
				target = event.target;
			let list = [];
			game.countPlayer(function(con) {
				if (con.countCards('h') < target.countCards('h')) list.push(con);
			})
			list.sortBySeat(player);
			for (var i of list) {
				if (i.isIn()) {
					var result = yield i.chooseCard('h', function(card, i) {
						if (!game.checkMod(card, i, 'unchanged', 'cardEnabled2', i)) return false;
						return i.canUse(get.autoViewAs({
							name: 'sha'
						}, [card]), target, false);
					}, '选择一张手牌当做【杀】对' + get.translation(target) + '使用').set('ai', function(card) {
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
				target: function(player, target) {
					var num = 0;
					let list = [];
					game.countPlayer(function(con) {
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
		filterTarget: function(card, player, target) {
			return true;
		},
		content: function*(event, map) {
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
					cardEnabled2: function(card) {
						if (get.itemtype(card) == "card" && !card.hasGaintag("ybsl_lxweiyu_buff")) return false;
					},
				},
				mark: true,
				marktext: '傲',
				intro: {
					name: '傲慢',
					markcount: function(storage, player) {
						return player.countCards('h', card => card.hasGaintag('ybsl_lxweiyu_buff'));
					},
					mark: function(dialog, content, player) {
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
				target: function(player, target) {
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
		filter: function(event, player) {
			if (player.hasSkill('ybsl_lyyaoe_suit')) return false;
			else if (!player.isPhaseUsing() || !event.targets.length) return false;
			var tars = event.targets.filter(current => current != player);
			return tars.length;
		},
		// cost: function() {
		// 	player.damage(player);
		// },
		content: function() {
			'step 0'
			player.damage(player);
			'step 1'
			for(var i of trigger.targets.filter(su=>su!=player).sortBySeat(player)){
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
					content: function(storage, player) {
						// if(storage)return '锁定技，当你于回合内使用牌时，若此牌目标包含其他角色，你对自己造成一点伤害';
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
					content: function(storage, player) {
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
		content: function*(event, map) {
			let trigger = map.trigger,
				player = map.player;
			var jud = yield player.judge();
			var card = jud.card;
			var cho = yield player.chooseCard('he', function(cardx) {
				if (get.suit(card) != get.suit(cardx) /*&&get.number(card) != get.number(cardx)*/ ) return false;
				return true;
			}).set('ai', function(cardx) {
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
	ybsl_lyyaoe_info:'锁定技，每种类型牌你每回合限用一次；锁定技，当你于回合内使用牌时，若此牌目标包含其他角色，你对自己造成一点伤害。',
	锁定技，当你于回合内使用牌时，若此牌目标包含其他角色，你对自己造成一点伤害；锁定技，每种类型牌你每回合限用一次。'
	//ybsl_lyyaoe_info:'锁定技，每种类型牌你每回合限用一次；锁定技，当你每回合首次使用某个类型的牌指定目标后，若目标为其他角色，你对自己和目标各造成x点伤害（x为你本回合使用的类型数，从1开始算，至多为3）。',
	ybsl_lytiandu:'天妒',
	ybsl_lytiandu_info:'你猜天妒啥效果。不出意外的话，这条技能仅提供一条语音。',
	ybsl_lykangming:'抗命',
	ybsl_lykangming_info:'出牌阶段限一次，你可以进行一次判定。然后你可以弃置一张花色或点数与判定结果相同的牌。若弃置牌与判定结果：花色相同，本回合夭厄一效果失效；点数相同，本回合夭厄二效果失效；花色和点数均相同，本回合夭厄两效果均失效，然后你减一点体力上限。',
	*/

	ybsl_ljfumin:{
		audio: 'ext:夜白神略/audio/character:2',
		enable: 'phaseUse',
		usable: 1,
		filter:function(event,player){
			return player.countCards('h')>0;
		},
		filterTarget: function(card, player, target) {
			return player != target; //此函数加true为全场唯一
		},
		selectCard:1,
		filterCard:true,
		discard:false,
		lose:false,
		position:'h',
		check:function(card){
			if(card.name=='du') return 20;
			if(card.name=='tao') return -1;
			if(card.name=='ybsl_juhua') return -1;
			return 10-get.value(card);
		},
		content(){
			'step 0'
			player.give(cards,target);
			'step 1'
			if(player.countCards('h')==target.countCards('h'))
				player.getStat('skill')['ybsl_ljfumin']=0;
				// if(player.getStat('skill')['ybsl_ljfumin']&&player.getStat('skill')['ybsl_ljfumin']>0) yield player.getStat('skill')['ybsl_ljfumin']--;
			
			// 
			else if(player.countCards('h')<target.countCards('h'))player.draw(2);
			else target.draw(2);
			// 'step 2'
			// game.log('发动福民后',player.getStat('skill')['ybsl_ljfumin']);
		},
		ai:{
			order:2,
			result:{
				target:function(player,target){
					if(player.countCards('h')-target.countCards('h')>2)return 3;
					else return 1;
				},
				player:function(player,target){
					if(player.countCards('h')-target.countCards('h')<2)return 2;
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
	ybsl_ljguihang:{
		audio: 'ext:夜白神略/audio/character:2',
		dutySkill: true,
		forced:true,
		group:['ybsl_ljguihang_1','ybsl_ljguihang_2'],
		subSkill:{
			1:{
				forced:true,
				audio: 'ybsl_ljguihang',
				trigger:{
					player: "loseAfter",
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				filter(event, player) {
					if (player.countCards("h")>=player.maxHp) return false;
					const evt = event.getl(player);
					return evt && evt.player == player && evt.hs && evt.hs.length > 0;
				},
				async content(event, trigger, player) {
					player.gain(lib.card.ying.getYing(player.maxHp-player.countCards('h')), "gain2");
				},
			},
			2:{
				forced:true,
				audio: 'ybsl_ljguihang',
				trigger:{
					player:'phaseZhunbeiBegin',
				},
				filter:function(event,player){
					var cards=player.getCards('h');
					for(var i of cards){
						if(i.name!='ying')return false;
					}
					return true;
				},
				content:function*(event,map){
					let trigger=map.trigger,player=map.player;
					game.log(player,'成功完成使命');
					yield player.awakenSkill('ybsl_ljguihang');
					
					const num=player.getCards('h').length;
					yield player.discard(player.getCards('h'));
					yield player.addMark("nzry_huaiju", num);
					yield player.addSkill('nzry_huaiju');
					yield player.addSkill("nzry_huaiju_ai");
					yield player.draw(Math.min(num,5));
					yield player.addMaxHp();//夜白的懒人函数，直接增加体力上限并回复体力
				}
			}
		}
	},
	// ybsl_ljfumin:'福民',
	// ybsl_ljfumin_info:'出牌阶段限一次，你可将一张手牌交给其他角色，然后若你与对方手牌数相同，此技能视为未发动过，否则手牌数较少的一方摸两张牌。',
	// ybsl_ljguihang:'归航',
	// ybsl_ljguihang_info:'使命技，锁定技，当你失去手牌后，若你手牌数小于体力上限，你获得【影】补充至体力上限；成功：准备阶段，若你手牌中均为【影】，你弃置所有手牌，并摸等量手牌（至多5张），然后增加一点体力上限并回复一点体力。
	


	
	//-------------------------华胥
	'sgsh_talei':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'phaseZhunbeiBegin',
		},
		check:function (event,player){
			return get.attitude(player,event.player)<=0;
		},
		content:function (){
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
		ai:{
			expose:1,//跳立场
			threaten:0.5,//嘲讽值
		},
	},
	'sgsh_yunyuu':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'judgeEnd',
		},
		preHidden:true,
		frequent:true,
		filter:function (event,player){
			return get.suit(event.result.card)=='heart'
		},
		content:function (){
			player.draw(1);
		},
	},
	//-----------------------------太子长琴
	'sgsh_yuefeng':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseJieshuBefore',
		},
		filter:function (event,player){
			return !event.numFixed;
		},
		frequent:true,
		content:function (){
			player.YB_shelie(3,'乐风');
		},
		ai:{
			threaten:1.2,//嘲讽值
		},
	},
	'sgsh_zhisheng':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'useCardAfter',
		},
		filter:function (event,player){
			if(player.countCards('hes')==0)return false;
			if(event.player!=player&&event.card.isCard&&event.player.isPhaseUsing()){
				return event.player.getHistory('useCard').indexOf(event)==player.hp-1;
			}
		},
		check:function (event,player){
			return get.attitude(player,event.player)<0;
		},
		// nopop:true,
		async cost(event, trigger, player){
			event.result = await player.chooseToDiscard('he').forResult();
		},
		content:function (){
			// 'step 0'
			// player.chooseToDiscard('he');
			// 'step 1'
			// if(result.bool){
				// player.logSkill('sgsh_zhisheng')
				var evt=_status.event.getParent('phaseUse');
				if(evt&&evt.name=='phaseUse'){
					evt.skipped=true;
					event.finish();
				}
			// }
		},
		ai:{
			result:{
				player:-0.5,
				target:function (target){
					return -0.5*(Math.pow(target.countCards('h')-target.maxHandcard))
				},
			},
			threaten:3,//嘲讽值
			expose:1,//跳立场
		},
	},
	//-----------------------女魃
	'sgsh_buyu':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'phaseZhunbeiBegin',
		},
		check:function (event,player){
			if(get.attitude(player,event.player)<-2){
				var cards=player.getCards('h');
				if(cards.length>player.hp) return true;
				for(var i=0;i<cards.length;i++){
					var useful=get.useful(cards[i]);
					if(useful<5) return true;
					if(cards[i].number>9&&useful<7) return true;
				}
			}
			return false;
		},
		logTarget:'player',
		filter:function (event,player){
			return player.canCompare(event.player);
		},
		content:function (){
			'step 0'
			player.chooseToCompare(trigger.player);
			'step 1'
			if(result.bool){
				trigger.player.addTempSkill('sgsh_buyu2')
			}
		},
		ai:{
			threaten:3,//嘲讽值
			expose:1,//跳立场
		},
	},
	'sgsh_hanshen':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:['equipAfter','addJudgeAfter','loseAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
		},
		forced:true,
		filter:function (event,player){
			return game.hasPlayer(function(current){
				var evt=event.getl(current);
				return evt&&evt.hs&&evt.hs.length&&current.countCards('h')==0;
			});
		},
		content:function (){
			player.draw();
		},
		ai:{
			threaten:1.3,//嘲讽值
			noh:true,
		},
	},
	'sgsh_hanshenx':{
		preHidden:true,
		audio:'sgsh_hanshen',
		trigger:{
			global:['YB_anyEnd'],
		},
		forced:true,
		filter:function (event,player){
			return game.hasPlayer(function(current){
				var evt=event.getl(current);
				return evt&&evt.hs&&evt.hs.length&&current.countCards('h')==0;
			});
		},
		content:function (){
			player.draw();
		},
		ai:{
			threaten:1.3,//嘲讽值
			// noh:true,
		},
	},
	'sgsh_buyu2':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseDrawBefore',
		},
		forced:true,
		content:function (){
			trigger.cancel();
		},
	},
	//-----------------------罗睺
	'sgsh_yueshi':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'useCardAfter',
		},
		// direct:true,
		// popup:false,
		filter:function (event,player){
			return player.countCards('he')!=0;
		},
		async cost(event, trigger, player){
			event.result=await player.chooseCard('he').forResult();
		},
		content:function(){
			// player.logSkill('sgsh_yueshi',player);
			player.recast(event.cards)
		},
		// content:function (){
			// 'step 0'
			// player.choosePlayerCard(player,'he');
			// 'step 1'
			// if(result.bool){
				// player.logSkill('sgsh_yueshi',player);
				// player.recast(result.cards)
			// }
		// },
	},
	//------------------------东王公
	'sgsh_baigong':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseDrawBefore',
			global:'phaseDrawAfter',
		},
		forced:true,
		content:function (){
			if(trigger.player!=player){
				player.gainPlayerCard('he',trigger.player,true);
				if(game.countPlayer()<=4&&trigger.player.countCards('he')>player.countCards('he')){
					player.gainPlayerCard('he',trigger.player,true);
				}
			}
			else{
				trigger.cancel();
			}
		},
	},
	'sgsh_cangling':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseUseAfter',
		},
		filter:function (event,player){
			//if(player.getHistory('skipped').includes('phaseUse')) return false;
			return player.getHistory('useCard',function(evt){
				if(evt.targets&&evt.targets.length&&evt.isPhaseUsing()){
					var targets=evt.targets.slice(0);
					while(targets.includes(player)) targets.remove(player);
					return targets.length>0;
				}
				return false;
			}).length==0;
		},
		async cost(event, trigger, player){
			event.result = await player.chooseTarget('请选择一名角色令其增加一点体力上限，然后你回复一点体力').set('ai',function(target){
				// return get.attitude(player,target);
				return target==player;
			}).forResult();
		},
		content:function (){
			// 'step 0'
			// player.chooseTarget('请选择一名角色令其增加一点体力上限，然后你回复一点体力',true);
			// 'step 1'
			// var target=result.targets[0];
			var target=event.targets[0];
			target.gainMaxHp();
			player.recover();
		},
	},
	//---------------------------应龙
	'sgsh_zongshui':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		animationColor:'thunder',
		skillAnimation:true,
		filterCard:function(card){
			var suit=get.suit(card);
			for(var i=0;i<ui.selected.cards.length;i++){
				if(get.suit(ui.selected.cards[i])==suit) return false;
			}
			return true;
		},
		selectCard:[1,Infinity],
		complexCard:true,
		filterTarget:function(card,player,target){
			return player!=target&&target.countDiscardableCards(player,get.is.single()?'he':'hej');
		},
		selectTarget:[1,Infinity],
		content:function(){
			'step 0'
			player.discardPlayerCard(target,'he',1,true);
			'step 1'
			event.card=result.cards[0];
			event.cards=cards;
			for (var i of event.cards){
				var t=get.suit(i,false);
				if(get.suit(event.card)==t){
					target.addTempSkill('sgsh_zongshui_mo');
				}
			}
		},
		check:function(card){
			return 6-get.value(card);
		},
		position:'he',
		ai:{
			threaten:1.5,//嘲讽值
			damage:true,
			expose:1,//跳立场
			order:8,//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
			result:{//主动技的收益
				player:function(player,target){
					return 1;
				},
				target:function(player,target){
					return get.damageEffect(target,player);
				},
			},
		},
		subSkill:{
			mo:{
				mark:true,
				mod:{
					cardEnabled:function(){
						return false;
					},
					cardRespondable:function(){
						return false;
					},
					cardSavable:function(){
						return false;
					}
				},
				intro:{
					content:'不能使用或打出卡牌'
				}
			}
		}
	},
	///-------------刑天
	sgsh_fuchou:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{global:'phaseAfter'},
		filter:function(event,player){
			var target=event.player;
			return target.getHistory('sourceDamage',function(evt){
				return evt.player==player;
			}).length>0;
		},
		check:function(event,player){
			var target=event.player;
			if(get.effect(target,{name:'sha'},target,player)>0)return true;
			return false;
		},
		content:function(){
			'step 0'
			player.draw();
			player.useCard({name:'sha',isCard:false},trigger.player,'sgsh_fuchou');
		},
	},
	//--------------西王母
	sgsh_kunlun:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			target:'useCardToTargeted',
		},
		filter:function(event,player){
			// if(!player.isDamaged())return false;
			return get.suit(event.card)=='spade';
		},
		content:function(){
			'step 0'
			player.draw(2);
			'step 1'
			if(!player.isDamaged())player.chooseToDiscard('he',2,true);
		},
	},
	sgsh_huasheng:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseUseAfter',
		},
		filter:function (event,player){
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
		async cost(event, trigger, player){
			event.result = await player.chooseCard('h',get.prompt('sgsh_huasheng'),'展示并视为使用一张基本牌或普通锦囊牌',function(card,player){
				var type=get.type(card,player);
				return type=='basic'||type=='trick';
			}).set('ai',function(card){
				var player=_status.event.player,name=get.name(card,player);
				if(name=='jiu') return 0;
				return player.getUseValue({
					name:name,
					nature:get.nature(card,player),
					isCard:true,
				})
			}).forResult();
		},
		content:function(){
			// 'step 0'
			// player.chooseCard('h',get.prompt('sgsh_huasheng'),'展示并视为使用一张基本牌或普通锦囊牌',function(card,player){
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
				// player.logSkill('sgsh_huasheng');
				var cardv=event.cards[0];
				player.showCards(cardv,get.translation(player)+'发动了【化生】');
				var card={
					name:get.name(cardv,player),
					nature:get.nature(cardv,player),
					isCard:true,
				}
				player.chooseUseTarget(card,true,false);
			// }
		},
	},
	//---------禺强
	sgsh_zhihai:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{global:'phaseBegin'},
		filter:function(event,player){
			var tar=event.player;
			if(player==tar) return false;
			return true;
		},
		content:function(){
			'step 0'
			player.storage.sgsh_zhihai_list=ui.cardPile;
			player.storage.sgsh_zhihai_list2=ui.discardPile;
			'step 1'
			ui.cardPile=player.storage.sgsh_zhihai_list2;
			ui.discardPile=player.storage.sgsh_zhihai_list;
		},
	},
	sgsh_xuanming:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{global:'phaseAfter'},
		filter:function(event,player){
			return true;
		},
		content:function(){
			'step 0'
			var discarded=get.discarded();
			if(discarded.length){
				var next=player.chooseToMove();
				next.set('list',[
					['弃牌堆顶（翻过来后就是牌堆底）',discarded],
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
			else{
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
	//---------------大禹
	sgsh_zhishui:{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		enable:'phaseUse',
		selectTarget:function(event,player){
			var num=player.hp;
			return [1,num];
		},
		content:function(){
			'step 0'
			var cards=target.getCards('he');
			event.num=cards.length;
			target.discard(cards);
			'step 1'
			target.draw(event.num); 
		}
	},
	/*
	sgsh_kunlun:'昆仑',
	'sgsh_kunlun_info':'锁定技，当你成为黑桃牌的目标时，若你已受伤，你摸两张牌。',
	sgsh_huasheng:'化生',
	'sgsh_huasheng_info':'若你出牌阶段未使用任何牌，结束阶段开始时，你可以将一张手牌当任意基本牌或非延时锦囊牌使用。',
	sgsh_zhihai:'治海',
	'sgsh_zhihai_info':'一名其他角色的出牌阶段开始时，你可以将弃牌堆与牌堆交换。',
	sgsh_xuanming:'玄冥',
	'sgsh_xuanming_info':'每当一名角色的回合结束后，你可以将此回合进入弃牌堆的牌任意顺序放置在弃牌堆顶或弃牌堆底。',
	sgsh_zhishui:'治水',
	'sgsh_zhishui_info':'出牌阶段限一次，你可以令至多X名角色弃置所有牌并摸等量的牌，X为你当前体力值。',
	*/


}