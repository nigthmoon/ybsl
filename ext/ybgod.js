"use strict";//此文件手动格式化太累了，有机会用电脑整整
game.import('card',function(lib, game, ui, get, ai, _status){
	var ybgod={
		name:'ybgod',//卡包命名
		connect:true,//卡包是否可以联机
		init:false,
		card:{
	 		niaobaidaowenha:{
	 			type:'equip',
	 			subtype:'equip5',
	 			skills:['niaobaidaowenha_skill'],
				modeimage:'boss',
				ai:{
					basic:{
						equipValue:7.5,
					},
				},
				fullskin:true,
	 		},
	 		goujiangdesidai:{
	 			type:'equip',
	 			subtype:'equip1',
				distance:{attackFrom:-6},
	 			skills:['goujiangdesidai_skill'],
				modeimage:'boss',
				ai:{
					basic:{
						equipValue:7.5,
					},
				},
				fullskin:true,
	 		},
	 		shenzhixiunvfu:{
	 			type:'equip',
	 			subtype:'equip2',
				modeimage:'boss',
				fullskin:true,
	 		},
	 		gubuzifeng:{
				type:'trick',
				fullskin:true,
				modeimage:'boss',
				enable:true,
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					target.addTempSkill('gubuzifeng_disable',{player:'phaseAfter'});
					var skills=target.getSkills(null,false);
					for(var i=0;i<skills.length;i++){
						if(get.info(skills[i]).charlotte) skills.splice(i--,1);
					}
					if(skills.length){
						target.storage.gubuzifeng_disable.push(skills.randomGet());
						target.disableSkill('gubuzifeng_disable',target.storage.gubuzifeng_disable);
					}
				},
				ai:{
					order:12,
					result:{
						target:function(player,target){
							return -2;
						}
					}
				}
	 		},
	 		lingsheji:{
	 			type:'equip',
	 			subtype:'equip5',
	 			skills:['lingsheji'],
				modeimage:'boss',
				ai:{
					basic:{
						equipValue:7.5,
					},
				},
				fullskin:true,
	 		},
	 		shanrangzhaoshu:{
	 			type:'equip',
	 			subtype:'equip5',
	 			skills:['shanrangzhaoshu'],
				modeimage:'boss',
				ai:{
					basic:{
						equipValue:7.5,
					},
				},
				fullskin:true,
	 		},
	 		xingtianpojunfu:{
	 			type:'equip',
	 			subtype:'equip1',
				distance:{attackFrom:-3},
	 			skills:['noda_axe'],
				modeimage:'boss',
				ai:{
					basic:{
						equipValue:7.5,
					},
				},
				fullskin:true,
	 		},
	 		jinwuluorigong:{
	 			type:'equip',
	 			subtype:'equip1',
	 			skills:['iwasawa_crowbow'],
				modeimage:'boss',
				distance:{attackFrom:-8},
				ai:{
					basic:{
						equipValue:7.5,
					},
				},
				fullskin:true,
	 		},
	 		"boss_mengpohuihun":{
		  		mode:['boss'],
		  		type:"trick",
		  		modeimage:"boss",
		  		fullskin:true,
		  		selectTarget:-1,
		  		enable:true,
		  		toself:true,
		  		multitarget:true,
		  		global:['boss_mengpohuihun1'],
				modTarget:true,
		  		filterTarget:function(card,player,target){
			  		return player==target;
		  		},
				content:function(){
					game.countPlayer2(function(current){
					  	current.enableSkill('boss_wanghun');
					});
				},
				ai:{
					basic:{
						order:function(){
							return 11;
						},
						useful:[3,1],
						value:10
					},
					result:{
						player:function(player,target){
							if(player==game.boss){
								return -2;
							}
							else{
								return 5;
							}
						},
					},
				},
			},
			sadouchengbing:{
				fullskin:true,
				type:'trick',
				enable:true,
				selectTarget:-1,
				cardcolor:'red',
				toself:true,
				modeimage:'boss',
				filterTarget:function(card,player,target){
					return target==player;
				},
				modTarget:true,
				content:function(){
					var num=Math.min(5,target.maxHp);
					if(target.group=='shen'){
						target.draw(num);
					}
					else{
						var nh=target.countCards('h');
						if(nh<num){
							target.draw(num-nh);
						}
					}
				},
				ai:{
					basic:{
						order:7.2,
						useful:4.5,
						value:9.2
					},
					result:{
						target:function(player,target){
							var num=Math.min(5,target.maxHp);
							if(target.group=='shen'){
								return Math.sqrt(num);
							}
							else{
								var nh=target.countCards('h');
								if(target==player&&player.countCards('h','sadouchengbing')){
									nh--;
								}
								if(nh<num){
									return Math.sqrt(num-nh);
								}
							}
							return 0;
						},
					},
					tag:{
						draw:2
					}
				}
			},
			yihuajiemu:{
				type:'trick',
				fullskin:true,
				modeimage:'boss',
				enable:true,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('he');
				},
				content:function(){
					'step 0'
					if(target.hasSha()){
						target.chooseToUse(function(card,player,event){
							return get.name(card)=='sha'&&lib.filter.filterCard.apply(this,arguments);
						},'使用一张杀，或交给'+get.translation(player)+'两张牌');
					}
					else{
						event.directfalse=true;
					}
					'step 1'
					var nh=target.countCards('he');
					if((event.directfalse||!result.bool)&&nh){
						if(nh<=2){
							event.directcards=true;
						}
						else{
							target.chooseCard('he',2,true,'将两张牌交给'+get.translation(player));
						}
					}
					else{
						event.finish();
					}
					'step 2'
					if(event.directcards){
						target.give(target.getCards('he'),player);
					}
					else if(result.bool&&result.cards&&result.cards.length){
						target.give(result.cards,player);
					}
				},
				ai:{
					order:7,
					result:{
						target:function(player,target){
							if(target.hasSha()&&_status.event.getRand()<0.5) return 1;
							return -2;
						}
					}
				}
			},
			chiyanzhenhunqin:{
				type:'equip',
				fullskin:true,
				subtype:'equip1',
				modeimage:'boss',
				distance:{attackFrom:-3},
				skills:['chiyanzhenhunqin'],
				nomod:true,
				nopower:true,
				unique:true,
				ai:{
					equipValue:5
				}
			},
			juechenjinge_gai:{
				type:'equip',
				fullskin:true,
				image:'ext:夜白神略/image/card/juechenjinge_gai.png',
				subtype:'equip3',
				distance:{
					globalTo:2,
				},
				skills:['juechenjinge_gai'],
				nomod:true,
				nopower:true,
				unique:true,
				ai:{
					equipValue:9
				}
			},
			xiuluolianyuji:{
				type:'equip',
				fullskin:true,
				subtype:'equip1',
				modeimage:'boss',
				distance:{attackFrom:-3},
				skills:['xiuluolianyuji'],
				nomod:true,
				nopower:true,
				unique:true,
				ai:{
					equipValue:9
				}
			},
			longfenghemingjian:{
				type:'equip',
				fullskin:true,
				modeimage:'boss',
				subtype:'equip1',
				distance:{attackFrom:-2},
				skills:['longfenghemingjian'],
				nomod:true,
				nopower:true,
				unique:true,
				ai:{
					equipValue:9
				}
			},
			// qicaishenlu:{
				// fullskin:true,
				// modeimage:'boss',
				// type:'equip',
				// subtype:'equip4',
				// distance:{globalFrom:-1},
				// skills:['qicaishenlu'],
				// nomod:true,
				// nopower:true,
				// unique:true,
				// ai:{
					// equipValue:9
				// }
			// },
			honghuangzhili:{
				type:'trick',
				enable:true,
				fullskin:true,
				filterTarget:true,
				modeimage:'boss',
				content:function(){
					if(target.group=='shen'){
						target.addSkill('honghuangzhili');
						if(target.countCards('he')){
							player.gainPlayerCard(target,'he',true);
						}
					}
					else{
						target.turnOver();
					}
				},
				ai:{
					order:4,
					value:10,
					result:{
						target:function(player,target){
							if(target.group=='shen'){
								if(target.countCards('he')) return -2;
								return 0;
							}
							else{
								if(target.isTurnedOver()) return 4;
								return -3;
							}
						}
					}
				}
			},
			lianjunshengyan_gai:{
				fullskin:true,
				audio:true,
				type:'trick',
				enable:function(card,player){
					if(get.mode()=='guozhan') return !player.isUnseen();
					return true;
				},
				image:'ext:夜白神略/image/card/lianjunshengyan_gai.png',
				filterTarget:function(card,player,target){
					if(get.mode()=='guozhan') return target!=player&&target.identity!='unknown'&&!target.isFriendOf(player);
					return true;
				},
				selectTarget:function(){
					return get.mode()=='guozhan'?1:-1;
				},
				changeTarget:function(player,targets){
					if(get.mode()=='guozhan'){
						var target=targets[0];
						targets.push(player);
						if(target.identity!='ye'){
						game.filterPlayer(function(current){
							return target!=current&&target.isFriendOf(current)&&!current.hasSkill('diaohulishan');
							},targets);
						}
					}
				},/*
				contentBefore:function(){
					if(get.mode()=='guozhan'){
						var evt=event.getParent();
						if(evt&&evt.targets&&evt.targets.contains(player)){
							evt.fixedSeat=true;
							evt.targets.sortBySeat();
							evt.targets.remove(player);
							evt.targets.push(player);
						}
					}
				},*/
				content:function(){
					'step 0'
					if(get.mode()!='guozhan'){
						if(player==target) target.draw(game.filterPlayer().length);
						else target.chooseDrawRecover(true);
						event.finish();
					}
					else{
						if(target==player){
							var num=targets.length-1;
							event.num=num;
							var damaged=target.maxHp-target.hp;
							if(damaged==0){
								target.draw(num);
								event.finish();
							}
							else{
								var list=[];
								for(var i=Math.min(num,damaged);i>=0;i--){
									list.push('摸'+(num-i)+'回'+i);
								}
								target.chooseControl(list).set('prompt','请分配自己的摸牌数和回复量').ai=function(){
									if(player.hasSkill('diaohulishan')) return 0;
									if(_status._aozhan) return list.length-1;
									return list.randomGet();
								};
							}
						}
						else{
							target.draw();
						}
					}
					'step 1'
					if(target!=player) target.link(false);
					else if(typeof result.control=='string'){
						var index=result.control.indexOf('回');
						var draw=parseInt(result.control.slice(1,index));
						var recover=parseInt(result.control.slice(index+1));
						if(draw) target.draw(draw);
						if(recover) target.recover(recover);
					}
				},
				ai:{
					order:3,
					value:4,
					useful:2,
					result:{
						target:function(player,target){
							if(player==target) return 2;
							return 1;
						},
					},
				},
			},
			
		},//卡牌
		skill:{
			niaobaidaowenha_skill:{
				trigger:{player:'loseMaxHpAfter'},
				direct:true,
				content:function(){
					'step 0'
					event.count=trigger.num;
					'step 1'
					event.count--;
					player.chooseTarget(get.prompt2('niaobaidaowenha_skill'),lib.filter.notMe).set('ai',function(target){
						return get.attitude(_status.event.player,target)/(target.maxHp||1)
					});
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('niaobaidaowenha_skill',target);
						target.gainMaxHp();
						target.recover();
						if(event.count) event.goto(1);
					}
				},
			},
			goujiangdesidai_skill:{
				inherit:'kagari_zongsi',
				filter:function(event,player){
					return !player.hasSkill('kagari_zongsi')||player.getStat('skill').kagari_zongsi;
				},
			},
			gubuzifeng_disable:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:function(player,skill){
					player.enableSkill(skill);
					delete player.storage[skill];
				},
				charlotte:true,
				locked:true,
				mark:true,
				intro:{
					content:function(storage,player,skill){
						var list=[];
						for(var i in player.disabledSkills){
							if(player.disabledSkills[i].contains(skill)){
								list.push(i)
							}
						}
						if(list.length){
							var str='失效技能：';
							for(var i=0;i<list.length;i++){
								if(lib.translate[list[i]+'_info']){
									str+=get.translation(list[i])+'、';
								}
							}
							return str.slice(0,str.length-1);
						}
					}
				}
			},
			
			thedayibecomeagod:{
				trigger:{player:'die'},
				direct:true,
				filter:function(event,player){return player.group=='shen'},
				forceDie:true,
				skillAnimation:true,
				animationColor:'kami',
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('thedayibecomeagod'),function(card,player,target){
						return target.isFriendOf(player);
					}).set('forceDie',true).ai=function(target){
						return get.attitude(_status.event.player,target);
					};
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('thedayibecomeagod',target);
						if(target.group!='shen'){
							target.changeGroup('shen');
							game.log('此刻，便是',target,'成为神明之日！');
							event.finish();
						}
						else target.turnOver(false);
					}
					else event.finish();
					'step 2'
					if(target.isDamaged()) target.recover(target.maxHp-target.hp);
					'step 3'
					target.drawTo(5);
				},
			},
			TheDayIBecomeAGod:{
				trigger:{player:'useCard1'},
				// ruleSkill:true,
				popup:false,
				// forced:true,
				prompt:'是否将此【杀】改为神属性？',
				filter:function(event,player){
					return player.group=='shen'&&event.card.name=='sha';
				},
				content:function(){
					game.log(trigger.card,'被改为神属性');
					// trigger.card.nature='kami';
					game.setNature(trigger.card,'kami');
				}
			},
			
			shanrangzhaoshu:{
				trigger:{global:'gainEnd'},
				direct:true,
				filter:function(event,player){
					return event.player!=player&&event.player!=_status.currentPhase&&event.player.getHistory('gain')[0]==event&&player.countCards('he')+event.player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					event.target=trigger.player;
					var list=[];
					if(player.countCards('he')>1) list.push('交给其一张牌');
					if(trigger.player.countCards('he')>0) list.push('令其交给你一张牌');
					event.list=list;
					player.chooseControl('cancel2').set('choiceList',list).set('prompt',get.prompt('shanrangzhaoshu',trigger.player)).set('ai',function(){
						if(get.attitude(_status.event.player,_status.event.getTrigger().player)<0) return _status.event.getParent().list.length-1;
						return 'cancel2';
					});
					'step 1'
					if(result.control=='cancel2'){
						event.finish();return;
					}
					player.logSkill('shanrangzhaoshu',target);
					if(event.list[result.index][0]=='令'){
						event.player=target;
						event.target=player;
					}
					'step 2'
					player.chooseCard('he',true).set('filterCard',function(card,player){
						if(player!=_status.event.getTrigger().player) return card!=player.getEquip('shanrangzhaoshu');
						return true;
					});
					'step 3'
					if(result.cards&&result.cards.length) target.gain(result.cards,player,'giveAuto');
				},
			},
			lingsheji:{
				trigger:{player:'phaseUseEnd'},
				equipSkill:true,
				direct:true,
				content:function(){
					'step 0'
					var list=['摸一张牌'];
					if(player.countCards('he')>1) list.push('将一张牌置于武将牌上，于回合结束后获得之');
					player.chooseControl('cancel2').set('prompt',get.prompt('lingsheji')).set('choiceList',list).set('ai',function(){
					 var player=_status.event.player;
					 if(player.countCards('e',function(card){
					  return card.name!='tengjia'&&get.value(card)<=0;
					 })) return 1;
					 if(!player.needsToDiscard()) return 0;
					 return 1;
					});
					'step 1'
					if(result.control=='cancel2'){
					 event.finish();return;
					}
					player.logSkill('lingsheji');
					if(result.index==0){
					 player.draw();
					 event.finish();
					}
					else{
					 player.chooseCard('he',true,function(card,player){
					  return card!=player.getEquip(5);
					 }).set('ai',function(card){
					  if(get.position(card)=='e'&&get.value(card)<=0) return 10;
					  return (get.position(card)=='h'?2:1)*-get.value(card);
					 });
					}
					'step 2'
					player.addSkill('lingsheji2');
					player.lose(result.cards,ui.special,'toStorage');
					player.markAuto('lingsheji2',result.cards);
				},
			},
			lingsheji2:{
				trigger:{player:'phaseEnd'},
				equipSkill:true,
				forced:true,
				popup:false,
				content:function(){
					player.gain(player.getStorage('lingsheji2'),'gain2','log');
					player.storage.lingsheji2.length=0;
					player.removeSkill('lingsheji2');
				},
				intro:{content:'cards'},
			},
			noda_axe:{
				trigger:{player:'useCardToPlayered'},
				equipSkill:true,
				direct:true,
				filter:function(event,player){
					return player.isPhaseUsing()&&player!=event.target&&event.targets.length==1&&player.countCards('he')>2;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('he',get.prompt('noda_axe',trigger.target),2,'弃置两张牌，令'+get.translation(trigger.target)+'本回合内不能使用或打出牌且防具技能无效。',function(card,player){
						return card!=player.getEquip(1);
					}).set('logSkill',['noda_axe',trigger.target]).set('goon',function(event,player){
 					if(player.hasSkill('noda_axe2')) return false;
 					if(event.getParent().excluded.contains(player)) return false;
 					if(get.attitude(event.player,player)>0){
 						return false;
 					}
 					if(get.type(event.card)=='trick'&&event.player.hasWuxie()) return true;
 					if(get.tag(event.card,'respondSha')){
 						if(!player.hasSha()) return false;
 						return true;
 					}
 					else if(get.tag(event.card,'respondShan')){
 						if(!player.hasShan()) return false;
 						return true;
 					}
 					return false;
					}(trigger,trigger.target)).set('ai',function(card){
						if(_status.event.goon) return 7.5-get.value(card);
						return 0;
					});
					'step 1'
					if(result.bool) trigger.target.addTempSkill('noda_axe2');
				},
			},
			noda_axe2:{
				equipSkill:true,
				mod:{
					cardEnabled:function(){return false},
					cardSavable:function(){return false},
					cardRespondable:function(){return false},
				},
				mark:true,
				intro:{
					content:'不能使用或打出牌且防具技能无效直到回合结束',
				},
				ai:{unequip2:true},
			},
			iwasawa_crowbow:{
				equipSkill:true,
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				},
				direct:true,
				filter:function(event,player){
					var evt=event.getl(player);
					return evt&&evt.hs&&evt.hs.length>1&&player.isPhaseUsing();
				},
				content:function(){
					'step 0'
					var evt=trigger.getl(player);
					event.num=evt.hs.length;
					player.chooseTarget(get.prompt('iwasawa_crowbow'),'弃置一名其他角色的'+get.cnNumber(event.num)+'张牌',function(card,player,target){
						return player!=target&&target.countDiscardableCards(player,'he')>0;
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(target.countDiscardableCards(_status.event.player,'he')>=_status.event.getParent().num) att=att*2;
						return -att;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('iwasawa_crowbow',target);
						player.discardPlayerCard(target,'he',true,num);
					}
				},
			},
			
			xiuluolianyuji2:{
				equipSkill:true,
				vanish:true,
				trigger:{player:'damageEnd'},
				forced:true,
				popup:false,
				content:function(){
					if(trigger.xiuluolianyuji) player.recover();
					player.removeSkill('xiuluolianyuji2');
				}
			},
			xiuluolianyuji:{
				mod:{
					selectTarget:function(card,player,range){
						if(card.name!='sha') return;
						if(range[1]==-1) return;
						range[1]=Infinity;
					}
				},
				trigger:{source:'damageBegin1'},
				forced:true,
				filter:function(event){
					return event.card&&event.card.name=='sha';
				},
				content:function(){
					trigger.num++;
					trigger.xiuluolianyuji=true;
					trigger.player.addSkill('xiuluolianyuji2');
				}
			},
			juechenjinge_gai:{
				equipSkill:true,
				global:'juechenjinge_gai2'
			},
			juechenjinge_gai2:{
				equipSkill:true,
				mod:{
					globalTo:function(from,to,distance){
						return distance+game.countPlayer(function(current){
							if(current==to) return;
							if(current.group!=to.group&&get.mode()=='guozhan') return;
							if(current.hasSkill('juechenjinge_gai')) {
								if(get.mode()=='boss')return 1;
								return 2
							}
						});
					}
				}
			},
			'chiyanzhenhunqin':{
				equipSkill:true,
				trigger:{source:'damageBegin1'},
				forced:true,
				content:function(){
					// trigger.nature='fire';
					game.setNature(trigger,'fire');
				}
			},
			longfenghemingjian:{
				equipSkill:true,
				inherit:'cixiong_skill',
				filter:function(event,player){
					// return lib.linked.contains(event.card.nature);
					return event.card.hasNature('linked');
				},
			},
			// 'qicaishenlu':{
				// trigger:{source:'damageBegin1'},
				// forced:true,
				// filter:function(event,player){
					// // return lib.linked.contains(event.nature);
					// return event.card.hasNature('linked');
				// },
				// content:function(){
					// trigger.num++;
				// },
			// },
			
			
			honghuangzhili:{
				init:function(player){
					player.disableSkill('honghuangzhili','boss_shenyi');
				},
				mark:true,
				nopop:true,
				intro:{
					content:'【神裔】无效直到下家的回合开始'
				},
				marktext:'荒',
				onremove:function(player){
					player.enableSkill('honghuangzhili','boss_shenyi');
				},
				trigger:{global:'phaseZhunbeiBegin'},
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.player==player.next;
				},
				content:function(){
					player.removeSkill('honghuangzhili');
				}
			},
			
		},//技能
		translate:{
			sadouchengbing:'撒豆成兵',
			sadouchengbing_info:'出牌阶段对自己使用，若你的势力为“神”，摸X张牌；否则将你手牌补至X；（X为你的体力上限且至多为5）',
			yihuajiemu:'移花接木',
			yihuajiemu_info:'出牌阶段对一名有牌的其他角色使用，令其使用一张【杀】，或交给你两张牌',
			chiyanzhenhunqin:'赤焰镇魂琴',
			chiyanzhenhunqin_info:'锁定技，你造成的伤害均视为具有火属性',
			juechenjinge_gai:'绝尘金戈',
			juechenjinge_gai_append:'没写好，别私自加！',
			juechenjinge_gai_info:'锁定技，其它角色计算与你的距离+2。没写好，别私自加！',
			juechenjinge_gai_info_boss:'锁定技，其它角色计算与你的距离+2，敌方角色计算与己方其他角色距离+1。没写好，别私自加！',
			juechenjinge_gai_info_guozhan:'锁定技，其它角色计算与你的距离+2，其它势力角色计算与己方势力的距离+1。没写好，别私自加！',
			xiuluolianyuji:'修罗炼狱戟',
			xiuluolianyuji_info:'你使用【杀】可以额外指定任意名攻击范围内的其他角色为目标；锁定技，你使用【杀】造成的伤害+1，然后令受到伤害的角色回复1点体力',
			longfenghemingjian:'鸾凤和鸣剑',
			longfenghemingjian_info:'你使用的【雷杀】或【火杀】指定目标后，可令对方选择弃置一张牌或令你摸一张牌',
			qicaishenlu:'七彩神鹿',
			qicaishenlu_info:'锁定技，你计算与其他角色的距离时-1，当你造成属性伤害时，你令此伤害+1。',
			boss_mengpohuihun:'回魂',
			boss_mengpohuihun_info:'若场上有角色在本局游戏中因孟婆的【忘魂】失去过技能，则令其恢复该技能；此牌进入弃牌堆后，会被销毁。',
			honghuangzhili:'洪荒之力',
			honghuangzhili_cbg:'洪',
			honghuangzhili_info:'若该角色的势力是神，你获得其一张牌，其【神裔】无效直到其下家的回合（这个下家是动态变化的，会随着一个人的死或者复活而变化）开始；若该角色的势力不是神，其翻面。',
			lingsheji:'灵蛇髻',
			lingsheji2:'灵蛇髻',
			shanrangzhaoshu:'禅让诏书',
			xingtianpojunfu:'刑天破军斧',
			noda_axe:'刑天破军斧',
			noda_axe2:'刑天破军斧',
			jinwuluorigong:'金乌落日弓',
			iwasawa_crowbow:'金乌落日弓',
			lingsheji_info:'出牌阶段结束时，你可选择：1.摸一张牌。2.将一张武将牌置于武将牌上，并于回合结束后获得此牌。',
			shanrangzhaoshu_info:'其他角色于回合外获得牌后，若是其本回合内第一次获得牌，则你可以选择一项：交给其一张牌，或令其交给你一张牌。',
			xingtianpojunfu_info:'当你于出牌阶段内使用牌指定唯一目标后，你可弃置两张牌。若如此做，其本回合内不能使用或打出牌且其防具技能无效。',
			jinwuluorigong_info:'当你于出牌阶段内一次性失去了两张以上的手牌后，你可以弃置一名其他角色等量的牌。',
			_TheDayIBecomeAGod:'神杀',
			thedayibecomeagod:'传承',
			thedayibecomeagod_info:'选择一名其他己方角色。若其势力非神，则改为神势力；若其势力为神，则将武将牌翻至正面，回复体力至体力上限，并将手牌摸至5 ',
			gubuzifeng:'故步自封',
			gubuzifeng_disable:'故步自封',
			gubuzifeng_info:'出牌阶段，对一名其他角色使用。其的一个随机技能失效直到其下个回合结束。',
			goujiangdesidai:'篝酱的丝带',
			goujiangdesidai_info:'锁定技，若你未拥有技能【纵丝】，则你视为拥有技能【纵丝】；若你拥有技能【纵丝】，则你将此技能改为「出牌阶段限两次」',
			goujiangdesidai_skill:'纵丝',
			niaobaidaowenha:'鸟白岛文蛤',
			niaobaidaowenha_skill:'鸟白岛文蛤',
			niaobaidaowenha_info:'当你减少1点体力上限后，你可令一名其他角色增加1点体力上限并回复1点体力。',
			niaobaidaowenha_skill_info:'当你减少1点体力上限后，你可令一名其他角色增加1点体力上限并回复1点体力。',
			shenzhixiunvfu:'神之修女服',
			shenzhixiunvfu_info:'没什么实际作用的衣服，仅仅是显得像个神而已。',
			lianjunshengyan_gai:'联军盛宴',
			lianjunshengyan_gai_info:'出牌阶段，对场上所有角色使用。你摸X张牌（X为存活角色数），其他角色依次选择回复1点体力或摸一张牌。',
			lianjunshengyan_gai_info_guozhan:'出牌阶段，对你和你选择的除你的势力外的一个势力的所有角色使用。若目标角色：为你，你选择摸Y张牌并回复X-Y点体力（X为该势力的角色数，Y∈[0,X]）；不为你，其摸一张牌，然后重置。',
		},//卡牌翻译
		list:[
			['spade','5','guilongzhanyuedao',],
			['spade',2,'qimenbagua'],
			['club',2,'qimenbagua'],
			//['spade','5','juechenjinge_gai'],
			['spade','6','chixueqingfeng'],
			['diamond','12','xiuluolianyuji'],
			['diamond','4','xuwangzhimian'],
			['spade','2','longfenghemingjian'],
			['diamond','3','guofengyupao'],
			['diamond','3','qicaishenlu'],
			['heart','5','jinwuluorigong'],
			['diamond','5','xingtianpojunfu'],
			['club','12','lingsheji'],
			['spade','13','shanrangzhaoshu'],
			['heart','1','goujiangdesidai'],
			['diamond','13','niaobaidaowenha'],
			['spade','13','shenzhixiunvfu'],
			['club','5','gubuzifeng'],
			['diamond','7','gubuzifeng'],
			['club','13','yihuajiemu'],
			['club','12','yihuajiemu'],
			['heart','7','sadouchengbing'],
			['heart','8','sadouchengbing'],
			['heart','9','sadouchengbing'],
			['heart','11','sadouchengbing'],
			['diamond','12','wushuangfangtianji'],
			['spade','2','linglongshimandai'],
			['club','2','linglongshimandai'],
			['spade','2','hongmianbaihuapao'],
			['club','2','hongmianbaihuapao'],
			['diamond','5','shufazijinguan'],
			['heart','3','lianjunshengyan_gai'],
			['heart','4','lianjunshengyan_gai'],
			['heart','1','lianjunshengyan_gai']
		],//牌堆添加		
	}
	return ybgod;	
});