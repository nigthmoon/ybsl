import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

const skill = {
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
					if(player.disabledSkills[i].includes(skill)){
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
			 if(event.getParent().excluded.includes(player)) return false;
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
	// juechenjinge_gai:{
	// 	equipSkill:true,
	// 	global:'juechenjinge_gai2'
	// },
	// juechenjinge_gai2:{
	// 	equipSkill:true,
	// 	mod:{
	// 		globalTo:function(from,to,distance){
	// 			return distance+game.countPlayer(function(current){
	// 				if(current==to) return;
	// 				if(current.group!=to.group&&get.mode()=='guozhan') return;
	// 				if(current.hasSkill('juechenjinge_gai')) {
	// 					if(get.mode()=='boss')return 1;
	// 					return 2
	// 				}
	// 			});
	// 		}
	// 	}
	// },
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
			// return lib.linked.includes(event.card.nature);
			return event.card.hasNature('linked');
		},
	},
	// 'qicaishenlu':{
		// trigger:{source:'damageBegin1'},
		// forced:true,
		// filter:function(event,player){
			// // return lib.linked.includes(event.nature);
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
	
}
