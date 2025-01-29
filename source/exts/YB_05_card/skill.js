import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

const skill = {
	// ybsl_diedpk_skill: {
	// 	mod: {
	// 		cardname: function (card, player) {
	// 			if (card.name == "ybsl_diedpk")return 'juedou';
	// 		},
	// 	},
	// },
	//----------暗度陈仓
	ybsl_anduchencang_skill:{
		trigger:{global:'phaseBegin'},
		forced:true,
		direct:true,
		priority:6,
		filter:function(event,player){
			return player!=_status.currentPhase&&player.hasUsableCard('ybsl_anduchencang');
		},
		content:function(){
			var next=player.chooseToUse();
			next.set('prompt','是否使用【暗度陈仓】？');
			next.set('filterCard',function(card,player){
				if(get.name(card)!='ybsl_anduchencang') return false;
				return true;
			});
			next.set('ai2',function(){
				return get.effect_use.apply(this,arguments)+0.01;
			});
			// next.event._trigger=next;
		},
	},
	ybsl_anduchencang_skill2:{
		cardSkill:true,
		unique:true,
		trigger:{player:'phaseDrawBegin'},
		popup:false,
		charlotte:true,
		forced:true,
		content:function(){
			trigger.num--;
		},
	},
	//----------凤求凰
	ybsl_fengqiuhuang:{
		equipSkill:true,
		trigger: {
			player: "useCardEnd"
		},
		forced:true,
		audio:'ext:夜白神略/audio/card:true',
		filter: (event, player, _name) => {
			if (event.huiyinUse || !["trick","basic"].includes(get.type(event.card))) return false
			event.xtargets = event.targets.filter(current => current.isAlive() && player.canUse(event.card, current, false))
			return event.xtargets.length > 0
		},
		content: (trigger) => {
			// 重置使用牌事件
			trigger.finished = 0;
			trigger._triggered = 2;
			//
			trigger.num = 0;
			trigger.step = 0;
			trigger.targets = trigger.xtargets;
			//
			trigger.addCount = false;
			//
			trigger.huiyinUse = true;
		},
		ai:{
			effect:{
				player:function(card,player,target){
					if(get.name(card)=='tiesuo')return 0;
					else if(get.type(card)=='trick') return 2;
					else if(get.type(card)=='basic') return 2;
					return 1;
				}
				// player:function(card,player,target){
					 // if(player==target&&get.subtype(card)=='equip5'){
					// 	if(get.equipValue(card)<=8.5) return 0;
					// }
				// 	if(!target.hasEmptySlot(5)) return;
				// 	return lib.skill.ybsl_fengqiuhuang.ai.effect.player.apply(this,arguments);
				// 	-------凤求凰没有以上代码
				// }
			}
		}
	},
	//-------------------------飘雪神符
	'ybsl_piaoxueruyi':{
		equipSkill:true,
		trigger:{
			source:'damageSource',
		},
		filter:function (event){
			return event.card&&event.card.name=='sha'&&event.num>0&&event.player.isAlive();
		},
		audio:'hanbing_skill',
		logTarget:'player',
		content:function (){
			'step 0'
			trigger.player.draw(Math.min(5,trigger.player.hp));
			'step 1'
			trigger.player.turnOver();
		},
		check:function (event,player){
			if(event.player.isTurnedOver()) return get.attitude(player,event.player)>0;
			if(event.player.hp<3){
				return get.attitude(player,event.player)<0;
			}
			return get.attitude(player,event.player)>0;
		},
	},
	//----------桃之夭夭
	ybsl_taoyao:{
		equipSkill:true,
		charlotte:true,
		enable:['chooseToUse'],
		filterCard:function(card,player){
			return get.suit(card)=='heart';
		},
		audio:'tao',
		viewAs:{name:'tao'},
		viewAsFilter:function(player){
			return player.countCards('hes')>0;
		},
		prompt:'将一张红桃牌当桃使用',
		position:'hes',
		selectCard:1,
		check:function(card){
			if(card.name=='ybsl_taoyao') return 0.1;
			return 15-get.value(card)
		},
		mod:{
			aiValue:function(player,card,num){
				if(get.name(card)!='tao'&&get.color(card)!='red') return;
				var cards=player.getCards('hs',function(card){
					return get.name(card)=='tao'||get.color(card)=='red';
				});
				cards.sort(function(a,b){
					return (get.name(a)=='tao'?1:2)-(get.name(b)=='tao'?1:2);
				});
				var geti=function(){
					if(cards.includes(card)){
						return cards.indexOf(card);
					}
					return cards.length;
				};
				return Math.max(num,[6.5,4,3,2][Math.min(geti(),2)]);
			},
			aiUseful:function(){
				return lib.skill.kanpo.mod.aiValue.apply(this,arguments);
			},
		},
		ai:{
			threaten:1.5,
		}
	},
	//-----------青鳞盔
	ybsl_qinglinkui:{
		audio:'renwang',
		equipSkill:true,
		trigger:{
			player:"damageBegin4",
		},
		forced:true,
		// frequent:true,
		filter:function (event,player){
			if(player.hasSkillTag('unequip2')) return false;
			if(_status.currentPhase==player||event.source==player)return false;
			return !player.inRange(event.source);
		},
		content:function (){
			trigger.num--;
		},
		ai:{
			// threaten:0.3,
			// effect:{
			// 	target:function(card,player,target,current,isLink){
			// 		if(!player.inRange(target)&&get.tag(card,'damage')) return 0;
			// 	},
			// }
		}
	},
	//-----------水镜袍
	ybsl_shuijingpao:{
		audio:'rewrite_bagua',
		equipSkill:true,
		trigger:{
			target:"useCardToPlayered",
		},
		forced:true,
		// frequent:true,
		filter:function (event,player){
			if(get.type2(event.card)!='trick') return false;
			// if(event.getParent().triggeredTargets3.length>1) return false;
			return event.targets.length>0;
		},
		content:function (){
			player.draw(trigger.targets.length);
		},
		ai:{
			threaten:0.3,
			effect:{
				target:function(card,player,target){
					if(card.type2=='trick') return 1.5;
				},
			}
		}
	},
	//------------国士圣袍
	ybsl_guoshishengpao:{
		equipSkill:true,
		trigger:{target:'shaBegin'},
		forced:true,
		priority:6,
		audio:true,
		filter:function(event,player){
			if(player.hasSkillTag('unequip2')) return false;
			if(event.player.hasSkillTag('unequip',false,{
				name:event.card?event.card.name:null,
				target:player,
				card:event.card
			})) return false;
			return (event.card.name=='sha'&&get.suit(event.card)=='heart')
		},
		content:function(){
			trigger.cancel();
		},
		mod:{
			maxHandcard:function (player,num){
				return num+2;
			},
		},
		ai:{
			effect:{
				target:function(card,player,target){
					if(target.hasSkillTag('unequip2')) return;
					if(player.hasSkillTag('unequip',false,{
						name:card?card.name:null,
						target:target,
						card:card
					})||player.hasSkillTag('unequip_ai',false,{
						name:card?card.name:null,
						target:target,
						card:card
					})) return;
					if(card.name=='sha'&&get.suit(card)=='heart') return 'zerotarget';
				}
			}
		}
	},
	//-----------锁龙偃月刀
	rewrite_qinglong_skill:{
		audio:'qinglong_skill',
		equipSkill:true,
		trigger:{player:['shaMiss','eventNeutralized']},
		direct:true,
		filter:function(event,player){
			if(get.mode()=='guozhan'||!event.card||event.card.name!='sha') return false;
			return event.target.isIn()&&player.canUse('sha',event.target,false);
			//&&(player.hasSha()||_status.connectMode&&player.countCards('h'))
		},
		content:function(){
			"step 0"
			player.draw();
			"step 1"
			player.chooseToUse(get.prompt('rewrite_qinglong',trigger.target),function(card,player,event){
				if(get.name(card)!='sha') return false;
				if(player.getEquip('rewrite_qinglong')==card) return false;
				return lib.filter.filterCard.apply(this,arguments);
			},trigger.target,-1).set('addCount',false).logSkill='rewrite_qinglong_skill';
		}
	},
	rewrite_qinglong_fengyin:{
		audio:'qinglong_skill',
		shaRelated:true,
		trigger:{player:'useCardToPlayered'},
		check:function(event,player){
			return get.attitude(player,event.target)<=0;
		},
		filter:function(event,player){
			return event.card.name=='sha';
		},
		logTarget:'target',
		content:function(){
			"step 0"
			if(!trigger.target.hasSkill('fengyin')){
				trigger.target.addTempSkill('fengyin');
			}
		},
		ai:{
			ignoreSkill:true,
			skillTagFilter:function(player,tag,arg){
				if(tag=='directHit_ai'){
					return get.attitude(player,arg.target)<=0;
				}
				if(!arg||arg.isLink||!arg.card||arg.card.name!='sha') return false;
				if(!arg.target||get.attitude(player,arg.target)>=0) return false;
				if(!arg.skill||!lib.skill[arg.skill]||lib.skill[arg.skill].charlotte||get.is.locked(arg.skill)||!arg.target.getSkills(true,false).includes(arg.skill)) return false;
			},
			directHit_ai:true,
		}
	},
	ybsl_milu:{
		// trigger:{//不能成功，别私自改回
			// player:'loseBegin',
			// global:['equipBegin','addJudgeBegin','gainBegin','loseAsyncBegin'],
		// },
		// equipSkill:true,
		// forceDie:true,
		// charlotte:true,
		// forced:true,
		// popup:false,
		// filter:function(event,player){
			// // return event.cards.some(card=>card.name.indexOf('qiexie_')==0)
			// game.log(2)
			// var evt=event.getl(player);
			// game.log(evt.es)
			// return evt&&evt.player==player&&evt.es&&evt.es.length>0;
		// },
		// content:function(){
			// var cards=trigger.getl(player).es;
			// game.log(cards)
			// player.gain(cards,'gain2');
		// },
		enable:'phaseUse',
		usable:1,
		filter:function(event,player){
			return player.countCards('h')>0;
		},
		filterCard:true,
		position:'h',
		filterTarget:lib.filter.notMe,
		check:function(card){
			var player=_status.event.player;
			var val=5;
			if(player.needsToDiscard()) val=15;
			return val-get.value(card);
		},
		discard:false,
		lose:false,
		delay:false,
		equipSkill:true,
		content:function(){
			player.give(cards,target);
			target.chooseDrawRecover(1,true);
		},
		ai:{
			expose:0.1,
			order:1,
			result:{
				target:function(player,target){
					if(!ui.selected.cards.length) return 0;
					if(get.value(ui.selected.cards[0],false,'raw')<0) return -1;
					return 1;
				}
			}
		}
	},
	ybsl_yangtuo:{
		equipSkill:true,
		trigger:{global:['useCardAfter']},
		direct:true,
		filter:function(event,player){
			if(player.countCards('h')<1)return false;
			if(event.card.name=='sha'&&event.player!=player&&event.targets.includes(player))return true;
			return false;
		},
		content:function(){
			'step 0'
			player.chooseCard('h',function(card,player){
				if(!game.checkMod(card,player,'unchanged','cardEnabled2',player)) return false;
				if(get.color(card)==get.color(trigger.card))return false;
				return player.canUse(get.autoViewAs({name:'sha'},[card]),trigger.player,false);
			},'选择一张手牌当做【杀】对'+get.translation(trigger.source)+'使用').set('ai',function(card){
				var player=_status.event.player;
				return get.effect(trigger.player,get.autoViewAs({name:'sha'},[card]),player,player)/Math.max(1,get.value(card));
			});
			'step 1'
			if(result.bool){
				// player.logSkill('ybsl_yangtuo')
				player.useCard({name:'sha'},result.cards,'ybsl_yangtuo',trigger.player,false);
			}
		}
	},
	//-----------------君子之花
	'_ybsl_junzizhihua':{
		trigger:{
			player:'useCardAfter',
		},
		equipSkill:false,
		direct:true,
		forced:true,
		ruleSkill:true,
		filter:function (event,player){
			return event.card&&['ybsl_meihua','ybsl_lanhua','ybsl_zhuzi','ybsl_juhua'].includes(event.card.name)&&
				event.targets.length>0;
		},
		content:function(){
			if(trigger.targets.length<2){
				var tar=[];
				for (var i=0;i<trigger.targets.length;i++){
					//trigger.targets[i].gain(game.createCard('du',null,null,null,['gifts']),'gain2');
					tar.push(trigger.targets[i]);
				}
				var cards=trigger.cards;
				// game.cardsGotoSpecial(cards);
				tar[0].draw();
				game.log(cards,'被',tar,'独自享用');
			}
			if(trigger.targets.length>=2){
				var tar=[];
				for (var i=0;i<trigger.targets.length;i++){
					//trigger.targets[i].gain(game.createCard('du',null,null,null,['gifts']),'gain2');
					tar.push(trigger.targets[i]);
				}
				var cards=trigger.cards;
				game.cardsGotoSpecial(cards);
				game.log(cards,'被',tar,'分而食之');
			}
		},
	},
	//---------------天火煅
	'ybsl_tianhuoduan_skill':{
		equipSkill:false,
		direct:true,
		forced:true,
		ruleSkill:true,
	},
	//----------------乌云踏雪
	'rewrite_ybsl_wangzhui':{
		equipSkill:true,
		trigger:{
			target:'useCardToTarget',
			player:'useCardToTarget',
		},
		usable:1,
		audio:'ext:夜白神略/audio/card:true',
		filter:function (event){
			if(event.card.isCard&&event.card.name=='sha') return true;
		},
		content:function (){
			player.gain(trigger.cards,'gain2');
		},
		ai:{
			effect:{
				target:function(card,player,target){
					if(card.name=='sha') return [1,0.9];
				},
				player:function(card,player,target){
					if(card.name=='sha') return [1,1];
				}
			}
		}
	},
	//----------------烈焰赤兔
	'rewrite_chitu':{
		equipSkill:true,
		trigger:{
			target:'useCardToTargeted',
			player:'useCardToPlayered',
		},
		audio:'ext:夜白神略/audio/card:true',
		filter:function (event,player){
			if(!(event.card.name=='juedou'||(event.card.name=='sha'&&get.color(event.card)=='red'))) return false;
			return player==event.target||event.getParent().triggeredTargets3.length==1;
		},
		content:function (){
			player.draw();
		},
		ai:{
			effect:{
				target:function(card,player,target){
					if(card.name=='sha'&&get.color(card)=='red') return [1,0.6];
				},
				player:function(card,player,target){
					if(card.name=='sha'&&get.color(card)=='red') return [1,1];
				}
			}
		}
	},
	//--------------北斗七星扇
	'rewrite_zhuque':{
		equipSkill:true,
		trigger:{player:'useCard1'},
		filter:function(event,player){
			return (['basic','trick'].includes(get.type(event.card))&&get.tag(event.card,'damage')>0)&&
				event.cards&&event.cards.length;
		},
		audio:'wuxinghelingahan_skill',
		direct:true,
		content:function(){
			'step 0'
			var next=trigger.player.chooseBool('是否发动【北斗七星扇】？',
								  '修改'+get.translation(trigger.card)+'的花色和伤害属性');
			if(player==next.player) next.setHiddenSkill(event.name);
			'step 1'
			if(result.bool){
				player.logSkill('rewrite_zhuque');
				trigger.player.addTempSkill('rewrite_zhuque2');
				if(player!=trigger.player){
					trigger.player.line(player,'green');
					//player.gain(result.cards,trigger.player,'giveAuto');
				}
			}
			else event.finish();
			'step 2'
			if(player.isUnderControl()){
				game.swapPlayerAuto(player);
			}
			var switchToAuto=function(){
				_status.imchoosing=false;
				var listn=['普通'].concat(lib.inpile_nature);
				event._result={
					bool:true,
					suit:lib.suit.randomGet(),
					nature:listn.randomGet(),
				};
				if(event.dialog) event.dialog.close();
				if(event.control) event.control.close();
			};
			var chooseButton=function(player,card){
				var event=_status.event;
				player=player||event.player;
				if(!event._result) event._result={};
				var dialog=ui.create.dialog('北斗：请修改'+card+'的花色和属性','forcebutton','hidden');
				event.dialog=dialog;
				dialog.addText('花色');
				var table=document.createElement('div');
				table.classList.add('add-setting');
				table.style.margin='0';
				table.style.width='100%';
				table.style.position='relative';
				var listi=['spade','heart','club','diamond'];
				for(var i=0;i<listi.length;i++){
					var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
					td.link=listi[i];
					table.appendChild(td);
					td.innerHTML='<span>'+get.translation(listi[i])+'</span>';
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
						event._result.suit=link;
					});
				}
				dialog.content.appendChild(table);
				dialog.addText('属性');
				var table2=document.createElement('div');
				table2.classList.add('add-setting');
				table2.style.margin='0';
				table2.style.width='100%';
				table2.style.position='relative';
				var listn=['普通'].concat(lib.inpile_nature);
				for(var i=0;i<listn.length;i++){
					var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
					var nature=listn[i];
					td.link=nature;
					table2.appendChild(td);
					td.innerHTML='<span>'+get.translation(nature)+'</span>';
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
						event._result.nature=link;
					});
				}
				dialog.content.appendChild(table2);
				dialog.add('　　');
				event.dialog.open();
				
				event.switchToAuto=function(){
					event._result={
						bool:true,
						nature:listn.randomGet(),
						suit:listi.randomGet(),
					};
					event.dialog.close();
					event.control.close();
					game.resume();
					_status.imchoosing=false;
				};
				event.control=ui.create.control('ok','cancel2',function(link){
					var result=event._result;
					if(link=='cancel2') result.bool=false;
					else{
						if(!result.nature||!result.suit) return;
						result.bool=true;
					}
					event.dialog.close();
					event.control.close();
					game.resume();
					_status.imchoosing=false;
				});
				for(var i=0;i<event.dialog.buttons.length;i++){
					event.dialog.buttons[i].classList.add('selectable');
				}
				game.pause();
				game.countChoose();
			};
			if(event.isMine()){
				chooseButton(player,get.translation(trigger.card));
			}
			else if(event.isOnline()){
				event.player.send(chooseButton,event.player,get.translation(trigger.card));
				event.player.wait();
				game.pause();
			}
			else{
				switchToAuto();
			}
			
			'step 3'
			var map=event.result||result;
			if(map.bool){
				game.log(player,'将',trigger.card,'的花色属性修改为了','#g'+get.translation(map.suit+2),
					'#y'+get.translation(map.nature));
				trigger.card.suit=map.suit;
				if(map.nature=='普通') delete trigger.card.nature;
				else trigger.card.nature=map.nature;
				trigger.player.storage.rewrite_zhuque2=[trigger.card,map.nature];
				player.popup(get.translation(map.suit+2)+get.translation(map.nature),'thunder');
			}
		}	
	},
	'rewrite_zhuque2':{
		charlotte:true,
		trigger:{source:'damageBefore'},
		forced:true,
		firstDo:true,
		popup:false,
		onremove:true,
		filter:function(event,player){
			return player.storage.rewrite_zhuque2&&event.card==player.storage.rewrite_zhuque2[0];
		},
		content:function(){
			var nature=player.storage.rewrite_zhuque2[1];
			if(nature=='普通') delete trigger.nature;
			else trigger.nature=nature;
		},
	},
	//-------------------------七星龙渊剑
	'rewrite_yitianjian':{
		audio:'yitianjian_skill',
		trigger:{source:'damageSource'},
		direct:true,
		equipSkill:true,
		filter:function(event,player){
			return player.isDamaged()&&player.countCards('h')>0;
		},
		content:function(){
			'step 0'
			player.chooseToDiscard('h',get.prompt('rewrite_yitianjian'),'弃置一张手牌并回复1点体力').set(
				'ai',(card)=>7-get.value(card)).logSkill='rewrite_yitianjian';
			'step 1'
			if(result.bool) player.recover();
		},
	},
	//-------------白虎镜
	'rewrite_huxinjing':{
		audio:'huxinjing',
		equipSkill:true,
		trigger:{player:'damageBegin4'},
		direct:true,
		filter:function(event,player){
			if(player.hasSkillTag('unequip2')) return false;
			if(event.source&&event.source.hasSkillTag('unequip',false,{
				name:event.card?event.card.name:null,
				target:player,
				card:event.card
			})) return false;
			var cards=player.getEquips('rewrite_huxinjing');
			if(!cards.length) return false;
			if(player.hasMark('rewrite_huxinjing2'))return true;
			if(get.mode()!='guozhan'&&event.num>1) return true;
			return event.num>=player.hp;
		},
		content:function(){
			'step 0'
			if(player.hasMark('rewrite_huxinjing2')&&player.getEquips('rewrite_huxinjing').length){
				var e2=player.getEquips('rewrite_huxinjing');
				if(e2.length){
					player.discard(e2);
				}
				// player.removeSkill('rewrite_huxinjing');
				player.removeSkill('rewrite_huxinjing2');
				event.finish();
			}
			else{
				player.chooseBool(get.prompt('rewrite_huxinjing',player),lib.translate.rewrite_huxinjing_info);
			}
			'step 1'
			if(result.bool){
				player.logSkill('rewrite_huxinjing');
				trigger.cancel();
				player.addMark('rewrite_huxinjing2')
			}
		}
	},
	'rewrite_huxinjing2':{
		audio:'baiyin',
		equipSkill:true,
		trigger:{source:'damageBegin2'},
		forced:true,
		marktext:'虎',
		intro:{
			content:'下次造成的伤害+1，若你在此状态再次受到伤害，则失去此效果，同时弃置白虎镜',
		},
		filter:function(event,player){
			if(player.hasSkillTag('unequip2')) return false;
			var cards=player.getEquips('rewrite_huxinjing');
			if(!cards.length) return false;
			return player.hasMark('rewrite_huxinjing2');
		},
		content:function(){
			player.removeMark('rewrite_huxinjing2');
			trigger.num++;
		}
	},
	//-------------原版铜雀
	rewrite_tongque:{
		// trigger:{player:'useCard1'},
		// equipSkill:true,
		// forced:true,
		// filter:function(event,player){
		// 	return !event.card.yingbian&&get.is.yingbian(event.card);
		// },
		// content:function(){
		// 	trigger.card.yingbian=true;
		// 	var info=get.info(trigger.card);
		// 	if(info&&info.yingbian) info.yingbian(trigger);
		// 	player.addTempSkill('yingbian_changeTarget');
		// },
		trigger:{
			player:"yingbian",
		},
		equipSkill:true,
		forced:true,
		filter:(event,player)=>get.is.yingbianConditional(event.card),
		content:()=>{
			trigger.forceYingbian=true;
		},
		"_priority":-25,
	},
	//--------------方天锁链鞭（什么J8玩意）
	rewrite_fangtian:{
		trigger:{player:'useCardToPlayered'},
		forced:true,
		equipSkill:true,
		audio:true,
		filter:function(event,player){
			return event.card.name=='sha'&&!event.target.isLinked();//||event.target.countCards('h'));
		},
		logTarget:'target',
		content:function(){
			var target=trigger.target;
			if(!target.isLinked()) target.link();
			else player.viewHandcards(target);
		},
	},
	//---------------------绿沉枪
	ybsl_lvchenqiang1_skill:{
		charlotte:true,
		equipSkill:true,
		enable:['chooseToUse','chooseToRespond'],
		filter:function(event,player){
			return player.countCards('h')>0;
		},
		audio:'zhangba_skill',
		viewAs:{name:'sha'},
		viewAsFilter:function(player){
			return player.countCards('h')>0;
		},
		prompt:'将所有手牌当杀使用或打出',
		position:'h',
		selectCard:-1,
		filterCard:true,
	},
	ybsl_lvchenqiang2_skill:{
		charlotte:true,
		equipSkill:true,
		enable:['chooseToUse','chooseToRespond'],
		filter:function(event,player){
			return !player.countCards('h');
		},
		viewAs:{name:'shan'},
		viewAsFilter:function(player){
			return !player.countCards('h');
		},
		prompt:'摸一张牌视为使用或打出了一张闪',
		position:'h',
		audio:'bagua_skill',
		filterCard:()=>false,
		selectCard:-1,
		log:false,
		check:()=>1,
		precontent:function(){
			player.logSkill('ybsl_lvchenqiang2_skill');
			player.draw();
		},
	},
	//-----------------伏羲镇魂琴
	// ybsl_fuxizhenhunqin:{
	// 	equipSkill:true,
	// 	trigger:{player:'useCard1'},
	// 	//priority:7,
	// 	filter:function(event,player){
	// 		if(event.card.name=='sha') return true;
	// 	},
	// 	audio:true,
	// 	check:function(event,player){
	// 		var eff=0;
	// 		for(var i=0;i<event.targets.length;i++){
	// 			var target=event.targets[i];
	// 			var eff1=get.damageEffect(target,player,player);
	// 			var eff2=get.damageEffect(target,player,player,'fire|thunder|ice|YB_snow|YB_blood');
	// 			eff+=eff2;
	// 			eff-=eff1;
	// 		}
	// 		return eff>=0;
	// 	},
	// 	prompt2:function(event,player){
	// 		return '将'+get.translation(event.card)+'附着全部属性';
	// 	},
	// 	content:function(){
	// 		var list=lib.inpile_nature;
	// 		if(trigger.card.hasNature('kami'))var list=lib.inpile_nature.concat('kami');
	// 		game.setNature(trigger.card,list);
	// 		if(get.itemtype(trigger.card)=='card'){
	// 			var next=game.createEvent('ybsl_fuxizhenhunqin_clear');
	// 			next.card=trigger.card;
	// 			event.next.remove(next);
	// 			trigger.after.push(next);
	// 			next.setContent(function(){
	// 				game.setNature(trigger.card,[]);
	// 			});
	// 		}
	// 	}
	// },
	ybsl_fuxizhenhunqin:{
		equipSkill:true,
		trigger:{
			global:'loseAfter',
		},
		direct:true,
		filter:(event,player)=>{
			if(event.type!='discard') return false;
			if(event.player!=player) return false;
			if(!event.cards.length)return false;
			if(event.getl(player).hs) return true;
		},
		content:function*(event,map){
			let player=map.player,trigger=map.trigger;
			let num = trigger.cards.length;
			var result =yield player.chooseTarget([1,num]).set('ai',function(target){
				var player=_status.event.player;
				return get.damageEffect(target,player,'fire');
			}).set('prompt',`请选择至多${num}名角色，对这些角色各造成一点由这些牌造成的火焰伤害`);
			if(result.bool){
				var list=result.targets;
				list.sortBySeat();
				for(var i of list){
					i.damage(1,get.autoViewAs({name:'ybsl_fuxizhenhunqin'},trigger.cards),trigger.cards,'fire',player);
					// i.damage(1,{name:'ybsl_fuxizhenhunqin',card:trigger.cards},'fire',player);
				}
			}
		}
	},
	//---------无双铠
	ybsl_nodouble:{
		equipSkill:true,
		trigger:{
			target:'useCardToTargeted',
			player:'useCardToPlayered',
		},
		audio:'ext:夜白神略/audio/card:true',
		filter:function (event,player,name){
			if(!(event.card.name=='juedou'||event.card.name=='sha')) return false;
			if(!player.hasSkill('wushuang')&&name=='useCardToPlayered')return false;
			return player==event.target||event.getParent().triggeredTargets3.length==1;
		},
		content:function (){
			player.draw();
		},
		ai:{
			effect:{
				target:function(card,player,target){
					if(card.name=='sha'||card.name=='juedou') return [1,0.6];
				},
				player:function(card,player,target){
					if(!player.hasSkill('wushuang'))return;
					if(card.name=='sha'||card.name=='juedou') return [1,1];
				}
			}
		}
	},
	//--------------吴六剑
	ybsl_baihong:{
		charlotte:true,
		equipSkill:true,
		audio:'ext:夜白神略/audio/card:true',
		firstDo:true,
		trigger:{player:'useCard1'},
		forced:true,
		filter:function(event,player){
			return !event.audioed&&((event.card.name=='sha'&&player.countUsed('sha',true)>1)||(event.card.name=='jiu'&&player.countUsed('jiu',true)>1))&&event.getParent().type=='phase';
		},
		content:function(){
			trigger.audioed=true;
		},
		mod:{
			cardUsable:function(card,player,num){
				if(player.countCards('h')<=player.hp) return Infinity;
			}
		},
		// ai:{
		// 	unequip:true,
		// }
	},
	ybsl_zidian1:{
		charlotte:true,
		equipSkill:true,
		audio:'ext:夜白神略/audio/card:true',
		trigger:{player:'useCard1'},
		filter:function(event,player){
			if(event.card.name=='sha'&&!event.card.nature) return true;
		},
		check:function(event,player){
			var eff=0;
			for(var i=0;i<event.targets.length;i++){
				var target=event.targets[i];
				var eff1=get.damageEffect(target,player,player);
				var eff2=get.damageEffect(target,player,player,'thunder');
				eff+=eff2;
				eff-=eff1;
			}
			return eff>=0;
		},
		content:function(){
			// trigger.card.nature='thunder';
			// if(get.itemtype(trigger.card)=='card'){
				// var next=game.createEvent('ybsl_zidian1_clear');
				// next.card=trigger.card;
				// event.next.remove(next);
				// trigger.after.push(next);
				// next.setContent(function(){
					// delete card.nature;
				// });
			// }
			game.setNature(trigger.card,'thunder');
			if(get.itemtype(trigger.card)=='card'){
				var next=game.createEvent('ybsl_zidian1_clear');
				next.card=trigger.card;
				event.next.remove(next);
				trigger.after.push(next);
				next.setContent(function(){
					game.setNature(trigger.card,[]);
				});
			}
		}
	},
	ybsl_zidian2:{
		charlotte:true,
		equipSkill:true,
		audio:'ybsl_zidian1',
		enable:'phaseUse',
		filter:function(event,player){
			return player.countCards('h','sha')>0;
		},
		filterCard:{name:'sha'},
		prepare:function(cards,player){
			player.$throw(cards,1000);
			game.log(player,'将',cards,'置入了弃牌堆');
		},
		discard:false,
		loseTo:'discardPile',
		visible:true,
		delay:0.5,
		content:function(){
			player.draw();
			player.addSkill('ybsl_zidian3');
			player.addMark('ybsl_zidian3');
		},
		ai:{
			basic:{
				order:6
			},
			result:{
				player:1,
			},
		},
		check:function(cardx,player){
			if(player&&player==cardx.player) return true;
			var player=_status.event.player;
			var shas=player.getCards('hs',function(card){
				return card!=cardx&&get.name(card,player)=='sha';
			});
			if(shas.length>1) return 1;
			return -1;//改自界董卓酒池，大力出奇迹，只判断手中杀的数量
		},
	},
	ybsl_zidian3:{
		mark:true,
		marktext:'紫',
		intro:{
			name:'紫电',
			content:'mark',
		},
		trigger:{player:'useCardAfter',global:'phaseAfter'},
		priority:2,
		firstDo:true,
		charlotte:true,
		filter:function(event){
			if(event.name=='useCard') return (event.card&&(event.card.name=='sha'));
			return true;
		},
		forced:true,
		popup:false,
		audio:false,
		content:function(){
			game.broadcastAll(function(player){
				player.removeSkill('ybsl_zidian3');
			},player);
			// game.addVideo('jiuNode',player,false);
		},
		group:'ybsl_zidian4',
		onremove:function(player){
			if(player.node.ybsl_zidian3){
				player.node.ybsl_zidian3.delete();
				player.node.ybsl_zidian4.delete();
				delete player.node.ybsl_zidian3;
				delete player.node.ybsl_zidian4;
			}
			delete player.storage.ybsl_zidian3;
		},
	},
	
	ybsl_zidian4:{
		trigger:{player:'useCard1'},
		filter:function(event){
			return event.card&&event.card.name=='sha';
		},
		forced:true,
		charlotte:true,
		firstDo:true,
		content:function(){
			if(!trigger.baseDamage) trigger.baseDamage=1;
			trigger.baseDamage+=player.storage.ybsl_zidian3;
			trigger.ybsl_zidian3=true;
			trigger.ybsl_zidian3_add=player.storage.ybsl_zidian3;
			// game.addVideo('jiuNode',player,false);
			game.broadcastAll(function(player){
				player.removeSkill('ybsl_zidian3');
			},player);
		},
		temp:true,
		vanish:true,
		silent:true,
		popup:false,
		nopop:true,
		
		ai:{
			damageBonus:true
		},
		
	},
	ybsl_bixie:{
		shaRelated:true,
		audio:'ext:夜白神略/audio/card:true',
		trigger:{player:'useCardToPlayered'},
		direct:true,
		filter:function(event,player){
			return event.card.name=='sha'&&event.target.countCards('he');
		},
		logTarget:'target',
		content:function(){
			'step 0'
			var target=trigger.target;
			if(!get.is.single()&&target.countDiscardableCards(player,'he')){
				player.discardPlayerCard('he',target);
			}
			// 'step 1'
			// if(result.bool){
				// // game.log(player,,'ybsl_bixie');
				// player.logSkill('ybsl_bixie')
			// }
		},
		check:function(event,player){
			return get.attitude(player,event.player)<0;
			//这里没有判断假如弃牌是否会给对方带来正收益
		},
	},
	ybsl_liuxing:{
		equipSkill:true,
		mod:{
			maxHandcard:function(player,num){
				return num+1;
			},
			// attackRange:function(player,num){
				// return num+1;
			// },
			cardUsable:function(card,player,num){
				if(card.name=='sha') return num+1;
			},
		},
		audio:'ext:夜白神略/audio/card:true',
		trigger:{player:'phaseDrawBegin2'},
		forced:true,
		filter:function(event,player){
			return !event.numFixed;
		},
		content:function(){
			trigger.num++;
		},
	},
	ybsl_qingming:{
		equipSkill:true,
		audio:'ext:夜白神略/audio/card:true',
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
			event.cards=trigger.num;
			var suits=[];
			for(var i=0;i<trigger.cards.length;i++){
				suits.add(get.suit(trigger.cards[i]));
			}
			event.suits=suits.length;
			player.chooseTarget(get.prompt('ybsl_qingming'),'选择一名其他角色，弃置其的'+get.cnNumber(event.num)+'张牌或对其造成'+get.cnNumber(event.suits)+'点伤害',function(card,player,target){
				return player!=target
			}).set('ai',function(target){
				var att=get.attitude(_status.event.player,target);
				if(target.countDiscardableCards(_status.event.player,'he')>=_status.event.getParent().num) att=att*2;
				return -att;
			});
			'step 1'
			if(result.bool){
				event.target=result.targets[0];
				var list=[];
				if(event.target.countDiscardableCards(player,'he')>0)list.push('弃置其牌');
				list.push('造成伤害');
				player.chooseControl(list).set('prompt','弃置其的'+get.cnNumber(event.num)+'张牌还是对其造成'+get.cnNumber(event.suits)+'点伤害');
			}
			else{event.finish();}
			'step 2'
			if(result.control=='弃置其牌'){
				player.logSkill('ybsl_qingming',target);
				player.discardPlayerCard(event.target,'he',true,num);
			}
			else{
				player.logSkill('ybsl_qingming',target);
				target.damage(event.suits,'nocard');
			}
		},
		
	},
	ybsl_baili_give:{
		audio:'ext:夜白神略/audio/card:true',
		enable:'phaseUse',
		usable:1,
		filterCard:true,
		selectCard:[1],
		discard:false,
		lose:false,
		delay:0,
		filterTarget:function(card,player,target){
			return player!=target;
		},
		check:function(card){
			if(card.name=='du') return 20;
			if(card.name=='tao') return -1;
			if(card.name=='ybsl_juhua') return -1;
			return 10-get.value(card);
		},
		content:()=>{player.give(cards,target);},
	},
	ybsl_baili_skill:{
		audio:'ybsl_baili_give',
		trigger:{global:'gainEnd'},
		// forced:true,
		// popup:false,
		check:function(event,player){
			return get.attitude(player,event.player)<0;
		},
		filter:function(event,player){
			if(player==event.player) return false;
			if(_status.currentPhase!=player) return false;
			var evt=event.getl(player);
			return evt&&evt.hs&&evt.hs.length;
		},
		content:function(){
			trigger.player.damage(1,'nocard');
		},
	},
	//----------百鸟朝凤枪
	ybsl_bainiaochaofeng:{
		audio:'zhangba_skill',
		trigger:{player:'useCardToTargeted'},
		check:function(event,player){
			if(!event.target)return false;
			if(event.target==player)return false;
			var att=get.attitude(_status.event.player,event.target);
			if(att>0)return false;
			return true;
		},
		filter:function(event,player){
			if(!event.target)return false;
			if(event.target==player)return false;
			return true;
		},
		logTarget:'target',
		content:function(){
			trigger.target.addTempSkill('ybsl_bainiaochaofeng_ban');
			trigger.target.storage.ybsl_bainiaochaofeng_ban=trigger.card;
		},
	},
	ybsl_bainiaochaofeng_ban:{
		trigger:{global:['useCardAfter','phaseAfter']},
		forced:true,
		popup:false,
		filter:function(event,player,name){
			if(name=='phaseAfter')return true;
			if(event.card==player.storage.ybsl_bainiaochaofeng_ban)return true;
			return false;
		},
		content:function(){
			player.removeSkill('ybsl_bainiaochaofeng_ban');
		},
		onremove:true,
		mod:{
			cardEnabled2:function(card,player){
				if(get.position(card)=='h'&&get.color(card)==get.color(player.storage.ybsl_bainiaochaofeng_ban)) return false;
			},
		}
	},
	/*
	ybsl_bainiaochaofeng:{
		audio:'zhangba_skill',
		trigger:{player:'useCard'},
		global:'ybsl_bainiaochaofeng_ban',
		// forced:true,
		// popup:false,
		check:function(event,player){
			return true;
		},
		filter:function(event,player){
			return true;
		},
		init:function(player){
			player.storage.ybsl_bainiaochaofeng_ban=[];
		},
		content:function(){
			player.storage.ybsl_bainiaochaofeng_ban.push(trigger.card);
			trigger.directHit.addArray(game.filterPlayer(function(current){
				return current!=player&&get.distance(current,player)<=1;
			}));
		},
	},
	ybsl_bainiaochaofeng_ban:{
		trigger:{player:'useCardAfter'},
		forced:true,
		popup:false,
		filter:function(event,player){
			return(game.filterPlayer(function(current){
				return current.storage.ybsl_bainiaochaofeng_ban&&current.storage.ybsl_bainiaochaofeng_ban.contains(event.card);
			}));
		},
		init:function(player){
			player.storage.ybsl_bainiaochaofeng_ban=[];
		},
		content:function(){
			player.storage.ybsl_bainiaochaofeng_ban.remove(trigger.card);
		},
	},
	*/
	//----------七星刀
	ybsl_qixingdao:{
		equipSkill:true,
		audio:true,
		trigger:{source:'damageBegin1'},
		filter:function(event,player){
			if(event.card&&event.card.name=='sha'&&!event.card.nature)return true;
			if(event.player.hp>player.hp)return true;
			return false;
		},
		forced:true,
		content:function(){
			// if(trigger.card&&trigger.card.name=='sha'&&!trigger.card.nature)trigger.num++;
			// if(trigger.target.hp>player.hp)trigger.num++;
			'step 0'
			event.num=0;
			if(trigger.card&&trigger.card.name=='sha'&&!trigger.card.nature)event.num++;
			if(trigger.player.hp>player.hp)event.num++;
			'step 1'
			trigger.num+=event.num;
		},
		ai:{
			effect:{
				player:function(card,player,target,current,isLink){
					if(card.name=='sha'&&!isLink&&target.countCards('h')==0&&!target.hasSkillTag('filterDamage',null,{
						player:player,
						card:card,
					})) return [1,0,1,-3];
				}
			}
		}
	},
	// 'ybsl_qixingdao':'七星刀',//2
	// 'ybsl_qixingdao_info':'锁定技，①当你使用普通【杀】造成伤害时②当你对体力值大于你的角色造成伤害时，以上每满足一条，此伤害便+1。',
	// _ybsl_wuliujian:{
		// silent: true,
		// locked: true,
		// trigger: {
			// player: 'equipBegin',
		// },
		// ruleSkill:true,
		// filter: function (event, player,card) {
			// var subtype = get.subtype(event.card);
			// if (subtype != 'equip1') return false;//判定装备的类型
			// if (event.card.name!='ybsl_baihong'&&event.card.name!='ybsl_zidian'&&event.card.name!='ybsl_bixie'&&event.card.name!='ybsl_liuxing'&&event.card.name!='ybsl_qingming'&&event.card.name!='ybsl_baili') return false;
			// return (player.getEquip('ybsl_baihong')||player.getEquip('ybsl_zidian')||player.getEquip('ybsl_bixie')||player.getEquip('ybsl_liuxing')||player.getEquip('ybsl_qingming')||player.getEquip('ybsl_baili'))
			// // return true;
		// },
		// content: function () {
			// // game.log('event.name',event.name)
			// trigger.setContent(lib.skill.ybsl_infEquip.equip);
		// },
	// },
	//吴六剑共存现今版本会出问题，故此取消
	//-------------------------勾玉连环
	'ybsl_tianleiyubi_link':{
		audio:'taigongyinfu_link',
		trigger:{player:'phaseUseBegin'},
		equipSkill:true,
		direct:true,
		content:function(){
			'step 0'
			player.chooseTarget(
				'是否发动勾玉之力，横置或重置一名角色？').set('ai',function(target){
				return get.effect(target,{name:'tiesuo'},_status.event.player,_status.event.player);
			});
			'step 1'
			if(result.bool){
				var target=result.targets[0];
				player.logSkill('ybsl_tianleiyubi_link',target);
				target.link();
			}
		},
		ai:{
			expose:0.2,
		},
	},
	'ybsl_tianleiyubi_mix1':{
		equipSkill:true,
		audio:'equip5',
		trigger:{
			player:['equipBegin','useBegin'],
		},
		skillAnimation:true,
		animationColor:'thunder',
		direct:true,
		forced:true,
		filter:function(event,player,card){
			return event.card.name=='rewrite_shandian';
		},
		content:function(){
			'step 0'
			var cards=player.getEquips('rewrite_fulei');
			game.cardsGotoSpecial(cards);
			game.log(cards,'与',trigger.cards[0],'融合了');
			event.card=cards;
			'step 1'
			var card=trigger.cards[0];
			player.showCards(card);
			var bool=(get.position(card)=='e');
			if(bool) player.removeEquipTrigger(card);
			game.broadcastAll(function(card){
				card.init([event.card.suit,event.card.number,'ybsl_tianleiyubi']);
			},card);
			var bool=(get.position(card)=='e');
			if(bool) player.removeEquipTrigger(card);
			if(bool){
				var info=get.info(card);
				if(info.skills){
					for(var i=0;i<info.skills.length;i++){
						player.addSkillTrigger(info.skills[i]);
					}
				}
			}
		},
	},
	'ybsl_tianleiyubi_mix2':{
		equipSkill:true,
		audio:'equip5',
		trigger:{
			player:['equipBegin','useBegin'],
		},
		skillAnimation:true,
		animationColor:'YB_snow',
		direct:true,
		forced:true,
		filter:function(event,player,card){
			return event.card.name=='rewrite_fulei';
		},
		content:function(){
			'step 0'
			var cards=player.getEquips('rewrite_shandian');
			game.cardsGotoSpecial(cards);
			game.log(cards,'与',trigger.cards[0],'融合了');
			event.card=cards;
			'step 1'
			var card=trigger.cards[0];
			player.showCards(card);
			var bool=(get.position(card)=='e');
			if(bool) player.removeEquipTrigger(card);
			game.broadcastAll(function(card){
				card.init([event.card.suit,event.card.number,'ybsl_tianleiyubi']);
			},card);
			var bool=(get.position(card)=='e');
			if(bool) player.removeEquipTrigger(card);
			if(bool){
				var info=get.info(card);
				if(info.skills){
					for(var i=0;i<info.skills.length;i++){
						player.addSkillTrigger(info.skills[i]);
					}
				}
			}
		},
	},
	//-------------------------阴勾玉
	'rewrite_fulei_skill':{
		equipSkill:true,
		audio:'link',
		trigger:{player:'phaseUseEnd'},
		direct:true,
		filter:function(event,player){
			return player.countCards('h')>0;
		},
		content:function(){
			'step 0'
			player.chooseCard('h','阴勾玉隐隐闪烁，是否重铸一张手牌？').set(
				'prompt2','重铸后，若此牌不为红手牌数小于体力值，则摸一张牌；<br>若此牌为红且体力值小于手牌数，则恢复一点体力').set('ai',function(card){
				return 5-get.value(card);
			});
			'step 1'
			if(result.bool){
				player.logSkill('rewrite_fulei_skill');
				player.lose(result.cards,ui.discardPile,'visible');
				player.$throw(result.cards,1000);
				game.log(player,'将',result.cards,'置入了弃牌堆');
				player.draw();
				if(get.color(result.cards)=='red'&&player.hp<player.countCards()){
					player.recover()
				}
				if(get.color(result.cards)!='red'&&player.countCards()<player.hp){
					player.draw();
				}
			}
		},
	},
	//-------------------------阳勾玉
	'rewrite_shandian_skill':{
		equipSkill:true,
		trigger:{
			player:'phaseJieshuBegin',
		},
		audio:'judge',
		direct:true,
		content:function (){
			'step 0'
			player.chooseControl('发动','不发动',true).set('prompt','阳勾玉上隐隐跳动着电光，是否判定？').set(
				'prompt2','判定若为黑色，则令一名其他角色进入横置状态，并对其造成一点雷电伤害').set(
				'ai',function(event,player){return '发动'});
			'step 1'
			if(result.control=='发动'){
				player.judge(function(card){//你进行一次判定
					return (get.color(card)=='black')?2:0;//黑色返回2，否则返回0
				});
			}
			'step 2'
			if(result.judge==2){
				player.chooseTarget('请选择一个目标',function(card,player,target){//选1个目标
					return player!=target;//限制条件:你不是目标
				},function(target){//ai:
					var player=get.player();//定义变量player为选目标的发起者(不懂可以先不写)
					return -get.attitude(player,target);//选敌人
				});
			}
			else{
				event.goto(4);
			}
			'step 3'
			if(result.targets){
				if(!result.targets[0].isLinked()){
					result.targets[0].link(true);
				}
				result.targets[0].damage('thunder','nocard');
			}
			'step 4'
			event.finish();
		},
	},
	//-------------------------天雷玉璧
	'ybsl_tianleiyubi_skill':{
		audio:'judge',
		equipSkill:true,
		trigger:{
			global:'phaseZhunbeiBegin',
		},
		check:function (event,player){
			return get.attitude(player,event.player)<=0;
		},
		content:function (){
			'step 0'
			if(!trigger.player.isLinked()){
				trigger.player.link(true);
			}
			'step 1'
			trigger.player.judge(function(card){
				if(get.suit(card)=='spade'&&get.number(card)>1&&get.number(card)<10)return -5;
				return 1;
			});
			'step 2'
			if(result.bool==false){
				trigger.player.damage(3,'thunder','nosource');
			}
			else{
				event.finish();
			}
		},
		ai:{
			expose:0.7,
			threaten:0.5,
		},
	},
	//-------------------------天雷玉璧觉醒
	'rewrite_ybsl_tianleiyubi_skill':{
		audio:'judge',
		trigger:{source:'damageSource'},
		equipSkill:true,
		filter:function(event,player){
			return event.hasNature('thunder')&&event.num>0;
		},
		direct:true,
		preHidden:true,
		content:function(){
			'step 0'
			event.num=trigger.num;
			'step 1'
			var choice;
			if(player.isDamaged()&&get.recoverEffect(player)>0&&(player.countCards('hs',function(card){
				return card.name=='sha'&&player.hasValueTarget(card);
			})>=player.getCardUsable('sha'))){
				choice='recover_hp';
			}
			else{
				choice='draw_card';
			}
			var next=player.chooseDrawRecover(get.prompt(event.name)).set('logSkill',event.name).set('prompt2','摸一张牌或回复1点体力');
			next.set('choice',choice);
			next.set('ai',function(){
				return _status.event.getParent().choice;
			});
			next.setHiddenSkill('rewrite_ybsl_tianleiyubi_skill');
			'step 2'
			if(result.control!='cancel2'){
				event.num--;
				if(event.num>0){
					event.goto(1);
				}
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
	'qicaishenlu':{
		trigger:{source:'damageBegin1'},
		forced:true,
		filter:function(event,player){
			return event.hasNature('linked');
		},
		content:function(){
			trigger.num++;
		},
	},
	// _ybsl_yingbian:{
	// 	trigger:{player:'useCard',},
	// 	direct:true,
	// 	charlotte:true,
	// 	ruleSkill:true,
	// 	filter:function(event,player){
	// 		if (!event.yingbian_lianDa) return false;
	// 		return true;
	// 	},
	// 	content:function(){
	// 		player.addTempSkill('_yingbian_doubleBlow','phaseUseAfter');
	// 		trigger._yingbian_doubleBlow=player;
	// 	}
	// },
	_yingbian_doubleBlow:{
		trigger:{player:'useCardToTargeted'},
		forced:true,
		charlotte:true,
		ruleSkill:true,
		popup:false,
		lastDo:true,
		filter:function(event,player){
			if(event.parent._yingbian_doubleBlow==player&&event.targets.length==event.parent.triggeredTargets4.length) return true;
			else if (event.parent._yingbian_Cunzhi==player&&event.targets.length==event.parent.triggeredTargets4.length) return true;
			return false;
		},
		content:function(){
			'step 0'
			if(trigger.parent._yingbian_doubleBlow==player){
				trigger.getParent().effectCount++
				game.log(trigger.card,'连打生效，额外执行一次');
			}
			'step 1'
			if(trigger.parent._yingbian_Cunzhi==player){
				trigger.getParent().effectCount--
				game.log(trigger.card,'寸止生效，执行次数减一');
			}
		},
		onremove:true,
	},

	/*
	// _yingbian_doubleBlow:{
	// 	trigger: {
	// 		player: "useCardEnd"
	// 	},
	// 	forced:true,
	// 	ruleSkill:true,
	// 	audio:'ext:夜白神略/audio/card:true',
	// 	filter: (event, player, _name) => {
	// 		if (!event.yingbian_lianDa) return false
	// 		if (event.doubleUse) return false
	// 		event.xtargets = event.targets.filter(current => current.isAlive() && player.canUse(event.card, current, false))
	// 		return event.xtargets.length > 0
	// 	},
	// 	content: (trigger) => {
	// 		// 重置使用牌事件
	// 		trigger.finished = 0;
	// 		trigger._triggered = 2;
	// 		//
	// 		trigger.num = 0;
	// 		trigger.step = 0;
	// 		trigger.targets = trigger.xtargets;
	// 		//
	// 		trigger.addCount = false;
	// 		//
	// 		trigger.doubleUse = true;
	// 	}
	// },
	/*
	_ybsl_nature:{
		trigger:{
			global:['phaseBefore','enterGame','gameStart'],
			player:'enterGame',
		},
		limited:true,
		ruleSkill:true,
		filter:function (event,player){
			return (event.name!='phase'||game.phaseNumber==0);
		},
		direct:true,
		content:()=>{
			//-------------改杀描述
			// var NorthShaPrompt=lib.card.sha.cardPrompt;
			// lib.card.sha.cardPrompt=function(card){
				// if(card.name=='sha'&&card.nature=='YB_blood') 
					// return '出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】。否则你对其造成1点血属性伤害（造成伤害后，你恢复等同伤害值的生命值。）';
				// return NorthShaPrompt.apply(this,arguments);
			// };
			// lib.card.sha.nature.add('YB_blood');
			// lib.card.sha.nature.add('YB_snow');
			// lib.card.sha.cardPrompt=function(card){
				// if(card.nature=='stab') 
					// return '出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】，且在此之后需弃置一张手牌（没有则不弃）。否则你对其造成1点伤害。';
				// if(card.nature=='YB_blood') 
					// return '出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】。否则你对其造成1点血属性伤害（造成伤害后，你恢复等同伤害值的生命值。）';
				// if(lib.linked.contains(card.nature)) 
					// return '出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】，否则你对其造成1点'+get.translation(card.nature)+'属性伤害。';
				// return '出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】，否则你对其造成1点伤害。';
			// }
			lib.card.yanxiao_card.image='ext:夜白神略/image/card/yanxiao_card.png'
			lib.card.goujiangdesidai.image='ext:夜白神略/image/card/goujiangdesidai.png'
			delete lib.card.goujiangdesidai.modeimage;
			lib.card.shenzhixiunvfu.image='ext:夜白神略/image/card/shenzhixiunvfu.png'
			delete lib.card.shenzhixiunvfu.modeimage;
		},

	}
	*/

}
