import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

const skill = {
	North_qiangxi:{
		enable:'phaseUse',
		usable:1,
		name:'砸人',
		prompt:'选择一名角色，砸他一滴血。',
		selectTarget:1,
		filterTarget:function(){
			return true;
		},
		content:function(){
			target.damage();
		},
		ai:{
			result:{
				target:function(card,player,target){
					return -1;
				}
			}
		},
	},
	//-----------------毁灭
	North_huimiex:{
		audio:2,
		trigger:{
			player:'useCardToTargeted',
		},
		usable:1,
		filter:function(event,player){
			return event.card.name=='sha'||event.card.name=='juedou';
		},
		content:function(){
			trigger.getParent().baseDamage++;
			player.draw(2);
		},
		group:'North_huimiex_kill',
		subSkill:{
			kill:{
				audio:2,
				trigger:{
					source:['die'],
				},
				direct:true,
				charlotte:true,
				forced:true,
				onremove:true,
				content:function(){
					player.addSkill('counttrigger');
					if(!player.storage.counttrigger) player.storage.counttrigger={};
					if(!player.storage.counttrigger.North_huimiex) player.storage.counttrigger.North_huimiex=0;
					player.storage.counttrigger.North_huimiex--;
				},
			},
		}
	},
	North_icedamage:{
		audio:2,
		forced:true,
		trigger:{
			player:['useCardToBegin','damageBegin4'],
			source:'damageBegin1',
		},
		filter:function(event,player,name){
			if(name=='damageBegin4') return event.nature=='ice';
			if(name=='damageBegin1') return event.nature!='ice';
			return event.card.name=='sha'&&(event.card.nature=='ice');
		},
		content:()=>{
			if(event.triggername=='damageBegin4'){
				trigger.cancel();
			}
			else if(event.triggername=='damageBegin1'){
				trigger.nature='ice';
			}
		},
		mod:{
			cardnature:function(card,player){
				if(get.name(card)=='sha') return 'ice';
			},
		},
		ai:{
			threaten:3,
			noice:true,
			effect:{
				target:function(card,player,target){
					if(card.name=='sha'&&get.nature(card)=='ice') return 'zerotarget';
				}
			}
		},
	},
	//锁定技，你的判定牌无法被修改，你获得场上生效的判定牌
	North_panding:{
		group:['North_panding_a'],
		forced:true,
		trigger:{player:['judgeBefore']},
		content:function(){
			trigger.noJudgeTrigger=true;
		},
		subSkill:{
			a:{
				trigger:{
					global:"judgeEnd",
				},
				forced:true,
				filter:function (event,player){
					// game.log('_status.event.getParent()：',_status.event.getParent())
					// game.log('_status.event.getParent(1)：',_status.event.getParent(1))
					// game.log('_status.event.getParent(2)：',_status.event.getParent(2))
					// game.log('_status.event.getParent(3)：',_status.event.getParent(3))
					// if(event)game.log('event：',event)
					// if(event.name)game.log('event.name：',event.name)
					// if(event.skill)game.log('event.skill：',event.skill)
					// if(event.judge)game.log('event.judge：',event.judge)
					// if(event.judge.name)game.log('event.judge.name：',event.judge.name)
					// if(event.judgestr)game.log('event.judgestr：',event.judgestr)
					// if(event.judgestr.name)game.log('event.judgestr.name：',event.judgestr.name)
					// if(event.getParent())game.log('event.getParent()：',event.getParent())
					// if(event.getParent().name)game.log('event.getParent().name：',event.getParent().name)
					// if(event.getParent().skill)game.log('event.getParent().skill：',event.getParent().skill)
					// if(event.getParent(1))game.log('event.getParent(1)：',event.getParent(1))
					// if(event.getParent(2))game.log('event.getParent(2)：',event.getParent(2))
					// if(event.getParent(2).skill)game.log('event.getParent(2).skill：',event.getParent(2).skill)
					// game.me.addSkill('North_panding')
					// if(event.getParent().name){
					// 	if(event.getParent().name=='ygjbt')return true;
					// }
					// return false;
					return true;
				},
				content:function (){
					player.gain(trigger.result.card,'gain2');
				},
			}
		}
	},
	//当有其他角色于回合外在当前回合累积造成4点伤害后，你可摸四张牌
	YB_ceshiskill1:{
		trigger:{global:'damageSource',},
		usable:1,
		filter:function(event,player){
			if(event.player==player&&event.player!=_status.currentPhase)return false;
			var damage=player.getHistory('sourceDamage').length;
			if(damage>=4||event.num>=4) return true;
			return false;
		},
		content:function(){
			player.draw(4);
		}
	},
	//当一名其他角色对另一名其他角色造成伤害后，若双方皆存活，你弃置双方区域内各一张牌
	YB_ceshiskill2:{
		trigger:{global:'damageEnd',},
		filter:function(event,player){
			return event.player&&event.player.isAlive()&&event.source&&event.source.isAlive()&&event.player!=player&&event.source!=player&&event.player!=event.source;
		},
		content:function(){
			'step 0'
			if(trigger.source.countDiscardableCards(trigger.player,'hej')){
				trigger.player.discardPlayerCard('hej',trigger.source,true);
			}
			'step 1'
			if(trigger.player.countDiscardableCards(trigger.source,'hej')){
				trigger.source.discardPlayerCard('hej',trigger.player,true);
			}
		}
	},
	YB_ceshiskill3:{
		trigger:{player:'phaseBegin',},
		filter:function(event,player){
			return true;
		},
		content:function(){
			//调整顺序
		}
	},
	//-----------------正文
	North_yhy_xuyin:{
		audio:'huirong',
		forced:true,
		global:'North_yhy_xuyin6',
		group:['North_yhy_xuyin1','North_yhy_xuyin2','North_yhy_xuyin3'],
	},
	North_yhy_xuyin1:{
		audio:'North_yhy_xuyin',
		trigger:{
			player:'recoverBegin',
		},
		forced:true,
		logTarget:'source',
		direct:true,
		filter:function(event,player,card){
			if(!event.source||!event.card)return false;
			if(event.card.name=='tao')return true;
			if(event.card.name=='taoyuan')return true;
			return false;
		},
		content:function(){
			trigger.source.addMark('North_yhy_xuyin4');
		},
	},
	North_yhy_xuyin2:{
		audio:'North_yhy_xuyin',
		forced:true,
		trigger:{
			player:'damageBegin4',
		},
		logTarget:'source',
		filter:function(event,player,card){
			if(event.source)return true;
		},
		content:function(){
			trigger.source.addMark('North_yhy_xuyin5');
		},
	},
	North_yhy_xuyin3:{
		audio:'North_yhy_xuyin',
		forced:true,
		trigger:{
			global:['equipAfter','addJudgeAfter','loseAfter','gainAfter','loseAsyncAfter','addToExpansionAfter','changeHp','turnOverEnd','linkEnd'],
		},
		filter:function (event,player,name){
			if(name=='linkEnd')return true;
			if(name=='turnOverEnd')return true;
			if(name=='changeHp')return event.player.hp==0;
			return game.hasPlayer(function(current){
				var evt=event.getl(current);
				return evt&&evt.hs&&evt.hs.length&&current.countCards('h')==0;
			});
		},
		content:function (){
			player.draw();
		},
		ai:{
			threaten:1,
			noh:true,
		},
	},
	North_yhy_xuyin4:{
		audio:'North_yhy_xuyin',
		forced:true,
		mark:true,
		marktext:'惠',
		intro:{
			name:'惠',
			content:'mark',
		},
	},
	North_yhy_xuyin5:{
		audio:'North_yhy_xuyin',
		forced:true,
		mark:true,
		marktext:'狭',
		intro:{
			name:'狭',
			content:'mark',
		},
	},
	North_yhy_xuyin6:{
		audio:'North_yhy_xuyin',
		forced:true,
		trigger:{
			player:'phaseUseBefore',
		},
		filter:function(event,player){
			if(player.countMark('North_yhy_xuyin4')>0)return true;
			if(player.countMark('North_yhy_xuyin5')>0)return true;
			return false;
		},
		content:function(){
			'step 0'
			var list=[];
			if(player.countMark('North_yhy_xuyin4')>0)list.push('惠标记');
			if(player.countMark('North_yhy_xuyin5')>0)list.push('狭标记');
			event.list=list;
			'step 1'
			player.chooseControl(event.list);
			'step 2'
			if(result.control=='惠标记'){
				player.draw(player.countMark('North_yhy_xuyin4'));
				event.list.remove('惠标记');
			}
			if(result.control=='狭标记'){
				player.chooseToDiscard('he',player.countMark('North_yhy_xuyin5'),true);
				event.list.remove('狭标记');
			}
			'step 3'
			if(event.list.length>0){event.goto(1);}
			else{event.finish();}
		},
	},
	North_yhy_cihua:{
		audio:'ciwei',
		trigger:{
			player:['recoverEnd','damageEnd'],
		},
		'prompt2':'当你受到伤害或回复体力后，你可以先弃置三张手牌，然后选择弃置场上一张「惠」标记或一张「狭」标记，令一名角色翻面，然后可以选择与另一角色各弃置任意张牌，再摸等量的牌',
		filter:function(event,player){
			if(player.countCards('h')<3)return false;
			return true;
		},
		content:function(){
			'step 0'
			player.chooseToDiscard(3,'h',true);
			'step 1'
			if(game.hasPlayer((current)=>(current.hasMark('North_yhy_xuyin4')||current.hasMark('North_yhy_xuyin5')))){
				player.chooseTarget(true,function(card,player,target){
					return (target.hasMark('North_yhy_xuyin4')||target.hasMark('North_yhy_xuyin5'))
				}).set('prompt2','请选择一名有“惠”或“狭”的角色');
			}
			'step 2'
			if(result.targets[0]){
				event.target=result.targets[0];
				var list=[];
				if(result.targets[0].hasMark('North_yhy_xuyin4'))list.push('惠');
				if(result.targets[0].hasMark('North_yhy_xuyin5'))list.push('狭');
				player.chooseControl(list);
			}
			else{event.goto(5);}
			'step 3'
			if(result.control=='惠'){
				event.target.removeMark('North_yhy_xuyin4');
			}
			if(result.control=='狭'){
				event.target.removeMark('North_yhy_xuyin5');
			}
			player.chooseTarget(true).set('prompt2','请选择令一名角色翻面').ai=function(target){
				if(target.hasSkillTag('noturn')) return 0;
				var player=_status.event.player;
				if(get.attitude(_status.event.player,target)==0) return 0;
				if(get.attitude(_status.event.player,target)>0){
					if(target.classList.contains('turnedover')) return 1000-target.countCards('h');
					return 0;
				}
				else{
					if(target.classList.contains('turnedover')) return -1;
					return 1+target.countCards('h');
				}
			}
			'step 4'
			if(result.targets[0]){
				result.targets[0].turnOver();
			}
			'step 5'
			delete result.targets;
			delete event.target;
			'step 6'
			player.chooseTarget(lib.filter.notMe).set('prompt2','你可以选择一名其他角色，与其各自制衡任意张牌，也可以独自制衡').ai=function(target){
				var player=_status.event.player;
				if(get.attitude(_status.event.player,target)==0) return 0;
				if(get.attitude(_status.event.player,target)>0){
					return target.countCards('h')*2;
				}
				else{
					return -1;
				}
			}
			'step 7'
			if(result.targets)event.target=result.targets[0];
			player.chooseCard('he',[0,Infinity]).set('ai',function(card){
				return 6-get.value(card);
			});
			'step 8'
			player.YB_zhiheng(result.cards);
			if(!event.target){event.finish();}
			'step 9'
			event.target.chooseCard('he',[0,Infinity]).set('ai',function(card){
				return 6-get.value(card);
			});
			'step 10'
			event.target.YB_zhiheng(result.cards);
		},
		group:'North_yhy_cihua_cannt',
		subSkill:{
			cannt:{
				trigger:{
					global:'useCard',
				},
				filter:function (event,player){
			if(event.player!=player&&event.card.isCard&&event.player.isPhaseUsing()){
				return (event.player.getHistory('useCard').indexOf(event)==player.hp-1&&['basic','trick'].includes(get.type(event.card)));
			}
		},
				check:function (event,player){
			return get.attitude(player,event.player)<0;
		},
				content:function (){
			'step 0'
			trigger.cancel();
			if(trigger.cards)player.gain(trigger.cards,'gain2');
		},
				sub:true,
			},
		},
	},
	North_yhy_minzeng:{
		audio:'caiyuan',
		global:'North_yhy_minzeng_minzeng',
		trigger:{
			player:['phaseAfter'],
		},
		nobracket:true,
		North_yhy_minzeng:'悯憎·转移',
		'prompt2':'你的回合结束时，可将「悯」「憎」分别移至另一名角色的武将牌上',
		content:function(){
			'step 0'
			event.goto(2);
			'step 1'
			if(result.targets[0])result.targets[0].addMark('North_yhy_minzeng_zeng');
			event.finish();
			'step 2'
			if(game.hasPlayer(function(target){
				return target.countMark('North_yhy_minzeng_min')>0;
			})) player.chooseTarget(2,'是否转移“悯”标记？',function(card,player,target){
				if(ui.selected.targets.length) return (!target.hasMark('North_yhy_minzeng_min'));
				return target.countMark('North_yhy_minzeng_min')>0;
			}).set('complexTarget',true).set('complexSelect',true).set('targetprompt',['移走标记','获得标记']).set('ai',function(target){
				var player=_status.event.player;
				if(!ui.selected.targets.length){
					return -get.attitude(player,target);
				}
				return get.attitude(player,target);
			});
			else event.goto(4);
			'step 3'
			if(result.bool){
				var targets=result.targets;
				player.logSkill('North_yhy_minzeng',targets,false);
				player.line2(targets);
				var gain=targets[0].countMark('North_yhy_minzeng_min');
				if(gain){
					targets[0].removeMark('North_yhy_minzeng_min',gain);
					targets[1].addMark('North_yhy_minzeng_min',gain);
				}
				game.delayx();
			}
			'step 4'
			if(game.hasPlayer(function(target){
				return target.countMark('North_yhy_minzeng_zeng')>0;
			})) player.chooseTarget(2,'是否转移“憎”标记？',function(card,player,target){
				if(ui.selected.targets.length) return (!target.hasMark('North_yhy_minzeng_zeng'));
				return target.countMark('North_yhy_minzeng_zeng')>0;
			}).set('complexTarget',true).set('complexSelect',true).set('targetprompt',['移走标记','获得标记']).set('ai',function(target){
				var player=_status.event.player;
				if(!ui.selected.targets.length){
					return get.attitude(player,target);
				}
				return -get.attitude(player,target);
			});
			else event.finish();
			'step 5'
			if(result.bool){
				var targets=result.targets;
				player.logSkill('North_yhy_minzeng',targets,false);
				player.line2(targets);
				var gain=targets[0].countMark('North_yhy_minzeng_zeng');
				if(gain){
					targets[0].removeMark('North_yhy_minzeng_zeng',gain);
					targets[1].addMark('North_yhy_minzeng_zeng',gain);
				}
				game.delayx();
			}
		},
		group:['North_yhy_minzeng_minyi','North_yhy_minzeng_zengyi','North_yhy_minzeng_init'],
		subSkill:{
			min:{
				mark:true,
				marktext:'悯',
				intro:{
					content:'回合开始前回复一点体力并摸一张牌，回合结束后摸两张牌，手牌上限加二',
				},
				sub:true,
			},
			zeng:{
				mark:true,
				marktext:'憎',
				intro:{
					content:'回合开始前流失一点体力，手牌上限减二',
				},
				sub:true,
			},
		},
	},
	North_yhy_minzeng_minzeng:{
		audio:'North_yhy_minzeng',
		trigger:{
			player:['phaseBegin','phaseAfter'],
		},
		charlotte:true,
		forced:true,
		filter:function(event,player){
			return player.countMark('North_yhy_minzeng_min')>0||player.countMark('North_yhy_minzeng_zeng')>0;
		},
		nobracket:true,
		'prompt2':'拥有「悯」的角色，回合开始前回复1点体力，摸1张牌，回合结束后摸2张牌，回合手牌上限＋2。拥有「憎」的角色，回合开始前流失1点体力，手牌上限-2。',
		content:function(){
			if(event.triggername=='phaseBegin'){
				if(player.countMark('North_yhy_minzeng_min')>0){
					player.recover();
					player.draw();
				}
				if(player.countMark('North_yhy_minzeng_zeng')>0){
					player.loseHp();
				}
			}
			else{
				if(player.countMark('North_yhy_minzeng_min')>0){
					player.draw(2);
				}
				else{event.finish();}
			}
		},
		mod:{
			maxHandcard:function (player,num){
				return num+2*player.countMark('North_yhy_minzeng_min')-2*player.countMark('North_yhy_minzeng_zeng');
			},
		},
	},
	North_yhy_minzeng_minyi:{
		audio:'North_yhy_minzeng',
		trigger:{
			global:['phaseAfter','die'],
		},
		'prompt2':'拥有「悯」的角色下一回合结束或阵亡后，「悯」须移回你的武将牌上',
		forced:true,
		filter:function(event,player){
			if(event.player!=player)return event.player.hasMark('North_yhy_minzeng_min');
		},
		nobracket:true,
		charlotte:true,
		content:function(){
			trigger.player.removeMark('North_yhy_minzeng_min');
			player.addMark('North_yhy_minzeng_min');
		},
	},
	North_yhy_minzeng_zengyi:{
		audio:'North_yhy_minzeng',
		trigger:{
			global:['die'],
		},
		'prompt2':'拥有「憎」的角色阵亡后，你可选择将「憎」移至另一名角色上，若此时你放弃移动「憎」，「憎」消失移出游戏，你回复2点体力并选择是否获得其一个技能（觉醒技、限定技、主公技除外）',
		filter:function(event,player){
			if(event.player!=player)return event.player.hasMark('North_yhy_minzeng_zeng');
		},
		nobracket:true,
		charlotte:true,
		direct:true,
		content:function(){
			'step 0'
			trigger.player.removeMark('North_yhy_minzeng_zeng');
			player.chooseTarget().set('prompt','是否转移“憎”标记？').set('prompt2','如放弃转移，则此标记移出游戏，然后你回复2点体力并选择是否获得其一个技能（觉醒技、限定技、主公技除外）。');
			'step 1'
			if(result.targets){
				result.targets[0].addMark('North_yhy_minzeng_zeng');
				event.finish();
			}
			else{
				player.recover(2);
			}
			'step 2'
			var list=[];
			var listm=[];
			var listv=[];
			if(trigger.player.name1!=undefined) listm=lib.character[trigger.player.name1][3];
			else listm=lib.character[trigger.player.name][3];
			if(trigger.player.name2!=undefined) listv=lib.character[trigger.player.name2][3];
			listm=listm.concat(listv);
			var func=function(skill){
				var info=get.info(skill);
				if(info.charlotte||info.zhuSkill||(info.unique&&!info.limited)||info.juexingji||info.dutySkill||info.hiddenSkill) return false;
				return true;
			};
			for(var i=0;i<listm.length;i++){
				if(func(listm[i])) list.add(listm[i]);
			}
			if(list.length){
				player.chooseControl(list,'cancel2').set('prompt',get.prompt('North_yhy_minzeng_zengyi')).set('prompt2',get.translation('North_yhy_minzeng_zengyi_info')).set('ai',function(){
					return list.randomGet();
				});
			}
			else event.finish();
			'step 3'
			if(result.control&&result.control!='cancel2'){
				player.logSkill('North_yhy_minzeng');
				player.popup(result.control,'thunder');
				game.log(player,'获得了技能','#g【'+get.translation(result.control)+'】');
				player.addAdditionalSkill('North_yhy_minzeng',[result.control]);
			}
		},
	},
	North_yhy_minzeng_init:{
		audio:'North_yhy_minzeng',
		trigger:{
			global:'phaseBefore',
			player:'enterGame',
		},
		filter:function(event,player){
			return (event.name!='phase'||game.phaseNumber==0);
		},
		nobracket:true,
		'prompt2':'游戏开始时，你可获得一张「悯」标记与一张「憎」标记，「悯」标记置于你的武将牌上，并选择一名角色获得「憎」标记',
		content:function(){
			'step 0'
			player.addMark('North_yhy_minzeng_min');
			player.chooseTarget(true).set('ai',function(target){
				var player=_status.event.player;
				if(get.attitude(_status.event.player,target)<=0) return true;
			});
			'step 1'
			if(result.targets[0])result.targets[0].addMark('North_yhy_minzeng_zeng');
			event.finish();
		},
	},
	North_dy_qingyu:{
		audio:'sanchen',
		trigger:{
			global:'phaseBefore',
			player:'enterGame',
		},
		forced:true,
		filter:function(event,player){
			return (event.name!='phase'||game.phaseNumber==0)&&!player.storage.North_dy_qingyu_wuku;
		},
		content:function(){
			'step 0'
			player.storage.North_dy_qingyu_wuku=lib.inpile.filter(function(i){
				return get.type2(i,false)=='trick'||get.type2(i,false)=='basic';
			});
			player.storage.North_dy_qingyu_light=[];
			player.storage.North_dy_zhengwu_length
		},
		mark:true,
		marktext:'库',
		intro:{
			name:'武库',
			content:function(storage,player,skill){
				var str='';
				var list=player.storage.North_dy_qingyu_wuku;
				var list2=player.storage.North_dy_qingyu_light;
				if(player.storage.North_dy_zhengwu_length){var list3=player.storage.North_dy_zhengwu_length;}
				else{list3=[];}
				str+='';
				for(var j=0;j<list.length;j++){
					if(j!=0)str+='、';
					if(list2.includes(list[j])){
						if(list3.includes(list[j])){str+='<span style="text-decoration: line-through;"><span class=yellowtext>'+get.translation(list[j])+'</span></span>'}
						else{str+='<span class=yellowtext>'+get.translation(list[j])+'</span>';}
					}
					else{str+=get.translation(list[j]);}
				}
				return str;
			},
		},
		up:function (player){
			var next=game.createEvent('North_dy_qingyu_light',false);
			next.player=player;
			next.setContent(lib.skill.North_dy_qingyu.upc);
		},
		upc:function(){
			'step 0'
			var dialog=[get.prompt('North_dy_qingyu_light')];list1=player.storage.North_dy_qingyu_light,list2=player.storage.North_dy_qingyu_wuku.filter(function(i){
				return !list1.includes(i);
			});
			if(list1.length){
				dialog.push('<div class="text center">武库已点亮</div>');
				dialog.push([list1,'vcard']);
			}
			if(list2.length){
				dialog.push('<div class="text center">武库未点亮</div>');
				dialog.push([list2,'vcard']);
			}
			player.chooseButton(dialog).set('ai',function(button){
				var player=_status.event.player,name=button.link[2];
				return get.effect(player,{name:name},player,player)*(1+player.countCards('hs',name));
			}).set('filterButton',function(button){
				var player=_status.event.player;
				if(player.storage.North_dy_qingyu_light.includes(button.link[2]))return false;
				return true;
			});
			'step 1'
			if(result.bool){
				var name=result.links[0][2];
				player.storage.North_dy_qingyu_light.push(name);
				game.log(player,'点亮了【武库】中的','#y'+get.translation(name));
				game.delayx();
			}
			else{event.finish();}
			'step 2'
			if(player.storage.North_dy_qingyu_light.length>=6&&!player.hasSkill('North_dy_poshi')){
				player.logSkill('North_dy_qingyu_light');
				player.addSkill('North_dy_poshi');
				game.log(player,'获得了技能','#y'+'North_dy_poshi');
				player.flashAvatar('North_dy_qingyu','North_dy_poshi');
			}
		},
		group:['North_dy_qingyu_light','North_dy_qingyu_use1','North_dy_qingyu_use2'],
		subSkill:{
			light:{
				audio:'sanchen',
				enable:'phaseUse',
				filter:function(event,player,card){
					if(player.countMark('North_dy_qingyu_mark')>=player.hp)return false;
					return player.countCards('h',function(card){
						return get.type2(card)=='basic';
					})>0;
				},
				filterCard:function(card,player){
					var type=get.type2(card);
					if(type!='basic')return false;
					return true;
				},
				prepare:function(cards,player){
					player.$throw(cards,1000);
					game.log(player,'将',cards,'置入了弃牌堆');
				},
				check:function(card){
					return 8-get.value(card)
				},
				discard:false,
				loseTo:'discardPile',
				visible:true,
				delay:0.5,
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					if(!player.hasSkill('North_dy_qingyu_mark')){player.addTempSkill('North_dy_qingyu_mark');}
					player.addMark('North_dy_qingyu_mark',1,false);
					'step 2'
					var list1=player.storage.North_dy_qingyu_light;
					var list2=player.storage.North_dy_qingyu_wuku.filter(function(i){
						return !list1.includes(i);
					});
					if(list2.length>0)lib.skill.North_dy_qingyu.up(player);
				},
				ai:{
					basic:{
						order:1,
					},
					order:4,
					result:{
						player:1,
					},
				},
				sub:true,
			},
			use1:{
				audio:'sanchen',
				trigger:{
					player:'useCard',
				},
				filter:function(event,player){
					if(player!=_status.currentPhase) return false;//不为自己回合返回否
					if(get.type2(event.card)!='trick') return false;//不为锦囊牌返回否
					if(!event.card.isCard) return false;//为虚拟或转化牌返回否
					var list=player.storage.North_dy_qingyu_light;
					return list.includes(event.card.name);
				},
				'prompt2':'当你<span class=yellowtext>回合内使用一张非转化的锦囊牌</span>或回合外使用、打出的一张非转化的基本牌时，若此牌名在“武库”中已被点亮，你可以摸一张牌。',
				content:function(){
					player.draw();
				},
				sub:true,
			},
			use2:{
				audio:'sanchen',
				trigger:{
					player:['useCard','respond'],
				},
				filter:function(event,player){
					if(player==_status.currentPhase) return false;//为自己回合返回否
					var list=player.storage.North_dy_qingyu_light;
					if(event.name.indexOf('lose')!=0) return (list.includes(event.card.name)&&get.type(event.card)=='basic'&&event.card.isCard);
				},
				'prompt2':'当你回合内使用一张非转化的锦囊牌或<span class=yellowtext>回合外使用、打出的一张非转化的基本牌</span>时，若此牌名在“武库”中已被点亮，你可以摸一张牌。',
				content:function(){
					player.draw();
				},
				sub:true,
			},
			mark:{
				onremove:true,
				sub:true,
			},
		},
	},
	North_dy_zhengwu:{
		audio:'zhaotao',
		trigger:{
			player:['phaseBefore','damageEnd'],
		},
		filter:function(event,player){
			if(event.name=='phaseBefore') return true;//为自己回合返回否
			return player!=_status.currentPhase;//为自己回合返回否
		},
		content:function(){
			'step 0'
			if(event.triggername=='damageEnd'){event.count=trigger.num;}
			else{event.count=1;}
			'step 1'
			event.count--;
			player.chooseTarget([1,3],get.prompt2('每当你回合开始前或回合外受到一点伤害后，你可令至多3名角色依次摸3张牌并弃1张牌，再令至多3名角色进入横置状态'),function(card,player,target){
				return true;//target.countCards('h')<Math.min(target.maxHp,5);
			}).set('ai',function(target){
				var att=get.attitude(_status.event.player,target);
				if(target.hasSkillTag('nogain')) att/=6;
				return att/3;
			});
			'step 2'
			if(result.bool){
				player.logSkill('North_dy_zhengwu',result.targets);
				for(var i=0;i<result.targets.length;i++){
					result.targets[i].draw(3);
					result.targets[i].chooseToDiscard('he',true);
					player.addMark('North_dy_zhengwu',1,false);
				}
			}
			else{event.finish();}
			'step 3'
			delete result.targets;
			'step 4'
			player.chooseTarget([1,3],get.prompt2('每当你回合开始前或回合外受到一点伤害后，你可令至多3名角色依次摸3张牌并弃1张牌，再令至多3名角色进入横置状态'),function(card,player,target){
				return true;//target.countCards('h')<Math.min(target.maxHp,5);
			}).set('ai',function(target){
				var att=get.attitude(_status.event.player,target);
				return -att/3;
			});
			'step 5'
			if(result.bool){
				player.logSkill('North_dy_zhengwu',result.targets);
				for(var i=0;i<result.targets.length;i++){
					result.targets[i].link(true);
				}
			}
			if(event.count) event.goto(1);
		},
		group:['North_dy_zhengwu_use1'],
		subSkill:{
			use1:{
				audio:'zhaotao',
				enable:'chooseToUse',
				filter:function(event,player){
					if(player.countCards('hes')<1)return false;//牌数小于1不能用
					var max=1;
					if(player.storage.North_dy_zhengwu_plus==true)max=3;
					if(player.countMark('North_dy_zhengwu_block')>=max)return false;
					var evt=lib.filter.filterCard;
					if(event.filterCard) evt=event.filterCard;
					for(var i of player.storage.North_dy_qingyu_light){
						if(evt({name:i},player,event)) return true;
					};
					return false;
				},
				chooseButton:{
					dialog:function (event,player){
						var list=[];
						for(var i of player.storage.North_dy_qingyu_light){
							var card={name:i,isCard:true};
							if(!player.storage.North_dy_zhengwu_length){
								list.push(['整武','',i]);
								if(i=='sha'){
									for(var j of lib.inpile_nature){
										card.nature=j;
										list.push(['整武','',i,j]);
									}
								}
							}
							else{
								if(!player.storage.North_dy_zhengwu_length.includes(i))list.push(['整武','',i]);
								if(i=='sha'){
									for(var j of lib.inpile_nature){
										card.nature=j;
										if(!player.storage.North_dy_zhengwu_length.includes(i)) list.push(['整武','',i,j]);
									}
								}
							}
						}
						return ui.create.dialog('整武',[list,'vcard']);
					},
					filter:function (button,player){
						return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
					},
					check:function (button){
						if(_status.event.getParent().type!='phase') return 1;
						var player=_status.event.player;
						if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan','diaohulishan'].includes(button.link[2])) return 0;
						return player.getUseValue({
							name:button.link[2],
							nature:button.link[3],
						});
					},
					backup:function (links,player){
						return {
							filterCard:true,
							selectCard:1,
							complexCard:true,
							position:'hes',
							audio:'North_dy_zhengwu',
							popname:true,
							viewAs:{name:links[0][2],nature:links[0][3],},
							precontent:function(){
								if(!player.hasSkill('North_dy_zhengwu_length')){player.addTempSkill('North_dy_zhengwu_length');}
								if(!player.storage.North_dy_zhengwu_length){player.storage.North_dy_zhengwu_length=[];}
								player.storage.North_dy_zhengwu_length.push(event.result.card.name);
								if(!player.hasSkill('North_dy_zhengwu_block')){player.addTempSkill('North_dy_zhengwu_block');}
								player.addMark('North_dy_zhengwu',1,false);
								player.addMark('North_dy_zhengwu_block',1,false);
							},
						};
					},
					prompt:function (links,player){
						return '将一张手牌当作'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'使用';
					},
				},
				hiddenCard:function (player,name){
					return player.countCards('hes')>=1;
				},
				sub:true,
			},
			length:{
				onremove:true,
				sub:true,
			},
			block:{
				onremove:true,
			}
		},
	},
	North_dy_kuangzou:{
		audio:'dinghan',
		derivation:['North_dy_poshi'],
		forced:true,
		juexingji:true,
		skillAnimation:true,
		animationColor:'thunder',
		trigger:{
			player:'phaseUseBefore',
		},
		filter:function(e,p){
			return p.countMark('North_dy_zhengwu')>=6;
		},
		content:function(){
			'step 0'
			player.awakenSkill('North_dy_kuangzou');
			player.storage.North_dy_kuangzou=true;
			'step 1'
			player.loseMaxHp();
			player.storage.North_dy_zhengwu_plus=true;
		},
	},
	North_dy_poshi:{
		audio:'pozhu',
		trigger:{
			player:'phaseEnd',
		},
		forced:true,
		content:function(){
			'step 0'
			var i=0;
			var list=[];
			while(i++<2){
				var card=get.cardPile(function(card){
					if(get.type(card)!='equip') return false;
					return list.length==0||get.subtype(card)!=get.subtype(list[0]);
				});
				if(card) list.push(card);
			}
			if(!list.length){event.goto(2);return;}
			event.list=list;
			player.gain(event.list,'gain2');
			'step 1'
			game.delay(1);
			var card=event.list.shift();
			if(player.getCards('h').includes(card)){
				player.$give(card,player,false)
				player.equip(card);
			}
			if(event.list.length) event.redo();
			'step 2'
			var list=game.filterPlayer(function(current){
				return current.isLinked();
			});
			if(list.length){
				var target=list.randomGet();
				player.line(target,'green');
				target.damage('fire','nocard');
			}
			else {event.finish();}
		},
		group:'North_dy_poshi_sha',
		subSkill:{
			sha:{
				audio:'pozhu',
				trigger:{
					player:'useCardToPlayered',
					target:'useCardToTargeted',
				},
				filter:function(event,player,card){
					if(event.source==event.target)return false;
					return event.card.name=='sha';
				},
				forced:true,
				content:function(){
					if(event.triggername=='useCardToPlayered'){trigger.target.chooseToDiscard(2,true)}
					else{player.draw(2);}
				},
				sub:true,
			},
		},
	},
	North_ssx_jibing:{
		audio:'xiaoji',
		trigger:{
			player:'loseAfter',
			global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
		},
		filter:function(event,player){
			var evt=event.getl(player);
			return evt&&evt.player==player&&evt.es&&evt.es.length>0;
		},
		mark:true,
		marktext:'戎',
		intro:{
			name:'戎装',
			content:'expansion',
			markcount:'expansion',
		},
		forced:true,
		content:function(){
			'step 0'
			event.count=trigger.getl(player).es.length;
			'step 1'
			// event.count--;
			var num=3*event.count;
			event.cards=get.cards(num);
			game.cardsGotoOrdering(event.cards);
			player.showCards(event.cards,get.translation(player)+'展示了牌堆顶的'+get.translation(num)+'张牌并置入戎装队列。');
			// player.$throw(event.cards,2000);
			game.delay(0.5);
			// if(player.getExpansions('North_ssx_jibing').length)event.qintao=true;
			'step 2'
			var list=[];
			for (var j=event.cards.length;j>0;j--){
				list.push(event.cards[j-1]);
				// player.addToExpansion(j,player,'giveAuto').gaintag.add('North_ssx_jibing');
			}
			player.addToExpansion(list,player,'giveAuto').gaintag.add('North_ssx_jibing');
			// if(event.qintao==true){event.goto(3);}
			// else{event.list=[];}
			event.list=[];
			'step 3'
			event.cards=player.getExpansions('North_ssx_jibing');
			event.num=player.getExpansions('North_ssx_jibing').length;
			// player.$throw(event.cards,2000);
			// game.delay(0.5);
			'step 4'
			event.num--;
			'step 5'
			var i=event.num;
			if(event.cards[i]){
				if(get.type(event.cards[i])=='equip'){
					player.useCard(event.cards[i],true,player);
					// event.num++;
				}
			}
			'step 6'
			if(event.num<=0){
				player.$throw(player.getExpansions('North_ssx_jibing'),1500);
				game.delay(1);
				player.gain(player.getExpansions('North_ssx_jibing'),'gain2');
			}
			else{
				event.goto(4);
			}
			// for(var i of event.cards){
				// if(get.type(i)=='equip'){
					// player.chooseUseTarget(i,true,'nopopup');
				// }
				// else{
					// list.push(i);
				// }
			// }
			// if(list.length>0)player.gain(list,'gain2');
			// 'step 3'
			// if(event.count>0){
				// player.logSkill('North_ssx_jibing');
				// event.goto(1);
			// }
		},
		ai:{
			noe:true,
			reverseEquip:true,
			effect:{
				target:function(card,player,target,current){
					if(get.type(card)=='equip'&&!get.cardtag(card,'gifts')) return [1,3];
				},
			},
		},
		group:['North_ssx_jibing_eq','North_ssx_jibing_en'],
		subSkill:{
			eq:{
				audio:'xiaoji',
				trigger:{
					player:['phaseBefore','phaseAfter'],
				},
				forced:true,
				content:function(){
					'step 0'
					var i=0;
					var list=[];
					while(i++<1){
						var card=get.cardPile(function(card){
							if(get.type(card)!='equip') return false;
							return list.length==0||get.subtype(card)!=get.subtype(list[0]);
						});
						if(card) list.push(card);
					}
					// if(card) list.push(card);
					event.list=list;
					player.gain(event.list,'gain2');
					'step 1'
					game.delay(1);
					var card=event.list.shift();
					if(player.getCards('h').includes(card)){
						player.$give(card,player,false)
						player.equip(card);
					}
					if(event.list.length) event.redo();
				},
				sub:true,
			},
			en:{
				audio:'xiaoji',
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0);
				},
				content:function(){
					'step 0'
					var i=0;
					var list=[];
					while(i++<2){
						var card=get.cardPile(function(card){
							if(get.type(card)!='equip') return false;
							return list.length==0||get.subtype(card)!=get.subtype(list[0]);
						});
						if(card) list.push(card);
					}
					// if(card) list.push(card);
					event.list=list;
					player.gain(event.list,'gain2');
					'step 1'
					game.delay(1);
					var card=event.list.shift();
					if(player.getCards('h').includes(card)){
						player.$give(card,player,false)
						player.equip(card);
					}
					if(event.list.length) event.redo();
				},
				sub:true,
			},
		},
	},
	North_ssx_lieyuan:{
		audio:'jieyin',
		trigger:{
			player:['damageAfter','phaseUseBefore'],
		},
		filter:function(event,player){
			return player.countCards('ej')>0;
		},
		direct:true,
		content:function(){
			'step 0'
			var list=[];
			if(player.countCards('e')>0){
				list.push('装备区');
				list.push(player.getCards('e'));
			}
			if(player.countCards('j')>0){
				list.push('判定区');
				list.push(player.getCards('j'));
			}
			// game.log(list)
			player.chooseButton(1,list).set('prompt2','先选择你区域内的一张牌，<br>看好了再选，别选错！！！！！');
			// player.chooseCard('ej').set('prompt2','先选择你区域内的一张牌，<br>看好了再选，别选错！！！！！');
			'step 1'
			if(result.bool){
				event.card=result.links[0];
				// var name=result.links;
				// var name2=result.links[0].viewAs;
				// var type=get.type(name2,'trick');
				// game.log(event.card,'#y'+'card');
				// game.log(name,'#y'+'name');
				// game.log(name2,'#y'+'name2');
				// game.log(type,'#y'+'type');
				player.chooseTarget(function(card,player,target){
					if(get.position(event.card)=='e'){
						if(target.isMin()) return false;
						var type=get.subtype(event.card);
						return player!=target&&target.isEmpty(type);
					}
					else if(event.card.viewAs){
						return target.canAddJudge({name:event.card.viewAs},[event.card]);
					}
					else{
						return target.canAddJudge(event.card);
					}
				}).set('prompt2','再选择一名能接纳此牌的角色，<br>上一步选错的话，这里只能将错就错，或者取消技能。');
			}
			else {event.finish();}
			'step 2'
			if(result.bool){
				player.logSkill('North_ssx_lieyuan');
				event.target=result.targets[0];
				var link=event.card;
				// if(get.type(event.card.viewAs)=='equip') result.targets[0].equip(event.card);
				// else result.targets[0].addJudge(event.card,{name:event.card.viewAs});
				
				if(get.position(link)=='e'){
					event.target.equip(link);
				}
				else if(link.viewAs){
					event.target.addJudge({name:link.viewAs},[link]);
				}
				else{
					event.target.addJudge(link);
				}
			}
			else {event.finish();}
			
			'step 3'
			player.recover();
			player.chooseControl('是','否').set('prompt','是否令'+get.translation(event.target)+'恢复一点体力并摸两张牌？').set('ai',function(){
				var att=get.attitude(_status.event.player,event.target);
				if(att<0)return '是';
				return '否';
			});
			'step 4'
			if(result.control=='是'&&event.target.isAlive()){
				event.target.recover();
				event.target.draw(2);
			}
		},
	},
	North_ssx_lieyuanxx:{
		audio:'jieyin',
		trigger:{
			player:['damageAfter','phaseUseBefore','phaseUseAfter'],
		},
		filter:function(event,player){
			return player.countCards('ej')>0;
		},
		content:function(){
			'step 0'
			player.chooseCardTarget({
				// filterCard:function(card){
					// return get.type(card)=='equip';
				// },
				position:'he',
				filterTarget:function(card,player,target){
					return target!=player;
				},
				ai1:function(card){
					return 6-get.value(card);
				},
				ai2:function(target){
					return get.attitude(_status.event.player,target)-3;
				},
				prompt:get.prompt2('North_ssx_lieyuanxx'),
			});
			'step 1'
			if(result.bool){
				player.logSkill('North_ssx_lieyuanxx');
				var thisTarget=result.targets[0];
				var thisCard=result.cards[0];
				if(get.type(thisCard)=='equip'){thisTarget.equip(thisCard);}
				else{player.discard(thisCard);}
				event.target=result.targets[0];
			}
			'step 2'
			if(!event.target)event.finish();
			'step 3'
			player.recover();
			player.chooseControl('是','否').set('prompt','是否令'+get.translation(event.target)+'恢复一点体力并摸两张牌？').set('ai',function(){
				var att=get.attitude(_status.event.player,event.target);
				if(att<0)return '是';
				return '否';
			});
			'step 4'
			if(result.control=='是'&&event.target.isAlive()){
				event.target.recover();
				event.target.draw(2);
			}
		},
	},
	North_zgl_zhenhu:{
		audio:'bazhen',
		trigger:{
			player:'damageBegin3',
		},
		content:function(){
			'step 0'
			player.judge('阵护',function(card){
				if(get.color(card)=='red')return 2;
				if(get.color(card)=='black')return 1;
				return 0;
			});
			'step 1'
			if(result.card){
				player.gain(result.card,'gain2');
				switch(result.judge){
					case 2:trigger.cancel();break;
					case 1:player.moveCard();break;
					case 0:event.finish();break;
				}
			}
			// if(result.judge){
				
			// }
		},
	},
	North_zgl_dongxu:{
		mod:{
			aiValue:function(player,card,num){
				if(get.name(card)!='wuxie'&&get.color(card)!='black') return;
				var cards=player.getCards('hs',function(card){
					return get.name(card)=='wuxie'||get.color(card)=='black';
				});
				cards.sort(function(a,b){
					return (get.name(b)=='wuxie'?1:2)-(get.name(a)=='wuxie'?1:2);
				});
				var geti=function(){
					if(cards.includes(card)){
						return cards.indexOf(card);
					}
					return cards.length;
				};
				if(get.name(card)=='wuxie') return Math.min(num,[6,4,3][Math.min(geti(),2)])*0.6;
				return Math.max(num,[6,4,3][Math.min(geti(),2)]);
			},
			aiUseful:function(){
				return lib.skill.North_zgl_dongxu.mod.aiValue.apply(this,arguments);
			},
		},
		filter:function(event,player){
			if(player==_status.currentPhase) return false;
			return true;
		},
		locked:false,
		audio:'kanpo',
		enable:'chooseToUse',
		filterCard:function(card){
			return get.color(card)=='black';
		},
		viewAsFilter:function(player){
			return player.countCards('hes',{color:'black'})>0;
		},
		viewAs:{
			name:'wuxie',
		},
		position:'hes',
		prompt:'将一张黑色牌当无懈可击使用',
		check:function(card){
			var tri=_status.event.getTrigger();
			if(tri&&tri.card&&tri.card.name=='chiling') return -1;
			return 8-get.value(card)
		},
		precontent:function(){
			player.addTempSkill('North_zgl_dongxu_2');
			
		},
		threaten:1.2,
		group:['North_zgl_dongxu_link'],
		subSkill:{
			2:{
				trigger:{
					player:['useCardAfter'],
				},
				forced:true,
				charlotte:true,
				popup:false,
				filter:function (event,player){
					return event.skill=='North_zgl_dongxu';
				},
				content:function (){
					'step 0'
					player.chooseTarget(1).set('prompt2','是否令一名角色摸一张牌？').set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						result.targets[0].draw();
					}
				},
				sub:true,
			},
			link:{
				audio:'kanpo',
				trigger:{
					global:'phaseAfter',
				},
				filter:function(event,player){
					return player!=event.player&&player.getHistory('lose',function(evt){
						var ll=[];
						ll.add(evt.hs);
						ll.add(evt.es);
						for(var i of ll){
							if(get.color(i)=='black') return true;
						}
						// for(var j of evt.es){
						// 	if(get.color(i)=='black') return true;
						// }
					}).length>0;
				},
				direct:true,
				content:function(){
					'step 0'
					var num=player.getHistory('lose',function(evt){
						var ll=[];
						ll.add(evt.hs);
						ll.add(evt.es);
						for(var i of ll){
							if(get.color(i)=='black') return true;
						}
						// for(var j of evt.es){
						// 	if(get.color(i)=='black') return true;
						// }
					}).length;
					player.chooseTarget([1,num]).set('ai',function(target){
						// if(target.damageHp())
						return get.attitude(_status.event.player,target);
					}).set('prompt2','是否选择一'+(num>1?('至'+get.cnNumber(num)):'')+'名其他角色？<br>你可令选择的目标各恢复一点体力张牌并复原，或进入横置状态。');
					'step 1'
					if(result.bool){
						var list=['回复体力并复原','进入横置状态'];
						player.chooseControl(list,true).set('prompt2','请选择令'+result.targets+'恢复体力并复原，或进入横置状态');
						event.targets=result.targets;
					}
					else event.finish();
					'step 2'
					if(result.index==0){
						for (var i of event.targets){
							i.recover();
							i.turnOver(false);
							i.link(false);
						}
					}
					else{
						for (var i of event.targets){
							i.link(true);
						}
					}
				},
				sub:true,
			},
		},
		ai:{
			basic:{
				useful:[6,4,3],
				value:[6,4,3],
			},
			result:{
				player:1,
			},
			expose:0.2,
		},
	},
	North_zgl_qizhu:{
		audio:'qixing',
		trigger:{
			player:['phaseZhunbeiBegin','phaseJieshuBegin'],
		},
		forced:true,
		content:function(){
			'step 0'
			var num=7;
			var cards=get.cards(num);
			game.cardsGotoOrdering(cards);
			var next=player.chooseToMove();
			next.set('list',[
				['牌堆顶',cards],
				['牌堆底'],
			]);
			next.set('prompt','观星：点击将牌移动到牌堆顶或牌堆底<br>（这里我本来可以改成祈祝的，但我故意不改，因为只有保留一部分观星，才能让你知道，这个技能本质上是观星）');
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
			'step 1'
			var top=result.moved[0];
			var bottom=result.moved[1];
			top.reverse();
			for(var i=0;i<top.length;i++){
				ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
			}
			for(i=0;i<bottom.length;i++){
				ui.cardPile.appendChild(bottom[i]);
			}
			// if(event.triggername=='phaseZhunbeiBegin'&&top.length==0){
				// player.addTempSkill('reguanxing_on');
			// }
			player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(bottom.length)+'下');
			game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
			game.updateRoundNumber();
			game.delayx();
		},
		mark:true,
		marktext:'风',
		intro:{
			name:'祈祝',
			content:'expansion',
			markcount:'expansion',
		},
		group:'North_zgl_qizhu_wind',
		subSkill:{
			wind:{
				trigger:{
					player:'phaseUseBefore',
				},
				forced:true,
				content:function(){
			'step 0'
			player.draw();
			'step 1'
			if(player.countCards('h')>0){
				player.chooseCard('h',1,true,'将一张手牌置于武将牌上称为风').set('ai',function(card){
					return 6-get.value(card);
				});
			}
			else event.finish();
			'step 2'
			if(result.bool){
				// player.markSkill('North_zgl_qizhu');
				player.addToExpansion(result.cards[0],player,'give','log').gaintag.add('North_zgl_qizhu');
			}
		},
				sub:true,
			},
		},
	},
	North_zgl_shiyan:{
		audio:'huoji',
		usable:4,
		trigger:{
			player:'useCard',
		},
		filter:function(event,player){
			// game.log(event.card)
			if(!player.getExpansions('North_zgl_qizhu')||player.getExpansions('North_zgl_qizhu').length==0) {
				// game.log('6')
				return false;
			}
			// if(event.cards.length!=1) {
				// game.log('牌的数量不为1，必定无花色')
				// return false;
			// }
			// if(!player.isPhaseUsing()) return false;
			var cards=player.getExpansions('North_zgl_qizhu');
			// game.log(player.getExpansions('North_zgl_qizhu'))
			// game.log('2')
			var suit=[];
			if(!player.isPhaseUsing()) return false;
			for(var i of cards){
				if(get.suit(i)==get.suit(event.card)) return true;
			}
			return false;
		},
		check:function(event,player){
			if(game.countPlayer(function(current){
				return current!=player&&(ai.get.attitude(player,current)<0);
			})>0)return true;
			return false;
		},
		'prompt2':function(event,player){
			var str='是否摸一张牌，并对一名角色造成';
			var cards=player.getExpansions('North_zgl_qizhu');
			var suit=[];
			for(var i of cards){
				if(!suit.includes(get.suit(i)))suit.push(get.suit(i));
			}
			str+=get.cnNumber(suit.length);
			str+='点伤害';
			return str;
		},
		content:function(){
			'step 0'
			player.draw();
			var str='是否对一名角色造成';
			var cards=player.getExpansions('North_zgl_qizhu');
			var suit=[];
			for(var i of cards){
				if(!suit.includes(get.suit(i)))suit.push(get.suit(i));
			}
			event.num=suit.length;
			str+=get.cnNumber(suit.length);
			str+='点火焰伤害';
			player.chooseTarget(1,str).set('ai',function(target){
				return -get.attitude(_status.event.player,target);
			});
			'step 1'
			if(result.bool){
				result.targets[0].damage('fire','nocard',event.num);
			}
		},
		group:'North_zgl_shiyan_dis',
		subSkill:{
			dis:{
				audio:'huoji',
				direct:true,
				trigger:{
					player:'phaseUseAfter',
				},
				filter:(event,player,card)=>{
			var cards=player.getExpansions('North_zgl_qizhu');
			var suit=[];
			for(var i of cards){
				if(!suit.includes(get.suit(i)))suit.push(get.suit(i));
			}
			return (cards.length>=4||suit.length>=4);
		},
				content:function(){
			'step 0'
			var cards=player.getExpansions('North_zgl_qizhu');
			var suit=[];
			for(var i of cards){
				if(!suit.includes(get.suit(i)))suit.push(get.suit(i));
			}
			event.num=suit.length;
			'step 1'
			var str='是否选择至多'+get.cnNumber(event.num)+'名角色，对其依次造成'+get.cnNumber(event.num)+'点火焰伤害？';
			player.loseToDiscardpile(player.getExpansions('North_zgl_qizhu'));
			player.chooseTarget([0,event.num],str).set('ai',function(target){
				return -get.attitude(_status.event.player,target);
			});
			'step 2'
			if(result.targets){
				for(var i of result.targets){
					i.damage('fire','nocard',event.num);
				}
			}
		},
				sub:true,
			},
		},
	},
	North_zgl_shiyanxx:{
		audio:'huoji',
		// usable:4,
		trigger:{
			player:'useCard',
		},
		filter:function(event,player){
			if(!player.getExpansions('North_zgl_qizhu')||player.getExpansions('North_zgl_qizhu').length==0) {
				return false;
			}
			var cards=player.getExpansions('North_zgl_qizhu');
			var suit=[];
			if(!player.isPhaseUsing()) return false;
			for(var j of cards){
				suit.add(get.suit(j));
			}
			if(player.countMark('North_zgl_shiyanxx_mark')>=suit.length)return false;
			for(var i of cards){
				if(get.suit(i)==get.suit(event.card)) return true;
			}
			return false;
		},
		check:function(event,player){
			if(game.countPlayer(function(current){
				return current!=player&&(ai.get.attitude(player,current)<0);
			})>0)return true;
			return false;
		},
		'prompt2':function(event,player){
			var str='是否摸一张牌，并对至多';
			var cards=player.getExpansions('North_zgl_qizhu');
			var suit=[];
			for(var i of cards){
				if(!suit.includes(get.suit(i)))suit.push(get.suit(i));
			}
			str+=get.cnNumber(suit.length);
			str+='名角色造成1点火焰伤害';
			return str;
		},
		content:function(){
			'step 0'
			player.draw();
			// game.log('_status.event.getParent()：',_status.event.getParent())
			// game.log('_status.event.getParent(1)：',_status.event.getParent(1))
			// game.log('_status.event.getParent(2)：',_status.event.getParent(2))
			// game.log('_status.event.getParent(3)：',_status.event.getParent(3))
			// game.log('_status.event.getParent(4)：',_status.event.getParent(4))
			// game.log('_status.event.getParent(5)：',_status.event.getParent(5))
			// game.log('_status.event.getParent(6)：',_status.event.getParent(6))
			// game.log('_status.event.getParent(7)：',_status.event.getParent(7))
			// var str=_status.event.getParent(5);
			// str+='After';

			player.addTempSkill('North_zgl_shiyanxx_mark','phaseUseAfter');
			player.addMark('North_zgl_shiyanxx_mark',false);
			var str='是否对至多';
			var cards=player.getExpansions('North_zgl_qizhu');
			var suit=[];
			for(var i of cards){
				if(!suit.includes(get.suit(i)))suit.push(get.suit(i));
			}
			event.num=suit.length;
			str+=get.cnNumber(suit.length);
			str+='名角色造成1点火焰伤害';
			player.chooseTarget([1,event.num],str).set('ai',function(target){
				return -get.attitude(_status.event.player,target);
			});
			'step 1'
			if(result.bool){
				for(var i of result.targets){
					i.damage('fire','nocard',1);
				}
			}
		},
		group:'North_zgl_shiyan_dis',
		subSkill:{
			dis:{
				audio:'huoji',
				direct:true,
				trigger:{
					player:'phaseUseAfter',
				},
				filter:(event,player,card)=>{
			var cards=player.getExpansions('North_zgl_qizhu');
			var suit=[];
			for(var i of cards){
				if(!suit.includes(get.suit(i)))suit.push(get.suit(i));
			}
			return (cards.length>=4||suit.length>=4);
		},
				content:function(){
			'step 0'
			var cards=player.getExpansions('North_zgl_qizhu');
			var suit=[];
			for(var i of cards){
				if(!suit.includes(get.suit(i)))suit.push(get.suit(i));
			}
			event.num=suit.length;
			'step 1'
			var str='是否选择至多'+get.cnNumber(event.num)+'名角色，对其依次造成两点火焰伤害？';
			player.loseToDiscardpile(player.getExpansions('North_zgl_qizhu'));
			player.chooseTarget([0,event.num],str).set('ai',function(target){
				return -get.attitude(_status.event.player,target);
			});
			'step 2'
			if(result.targets){
				for(var i of result.targets){
					i.damage('fire','nocard',2);
				}
			}
		},
				sub:true,
			},
			mark:{
				charlotte:true,
				onremove:true,
			}
		},
	},

	North_ld_chenxun:{
		audio:'xunxun',
		trigger:{player:'phaseDrawBegin1'},
		preHidden:true,
		forced:true,
		mark:true,
		intro:{
			content:'expansion',
			markcount:'expansion',
		},
		// onremove:function(){
		// 	var cards=player.getExpansions(skill);
		// 	if(cards.length) player.loseToDiscardpile(cards);
		// },
		content:function(){
			"step 0"
			trigger.changeToZero();
			event.tar=(player.storage.North_ld_chenxun||player);
			var skills=event.tar.getSkills(null,false,false).filter(function(i){
				var info=get.info(i);
				return info&&!info.charlotte;
			});
			var cards=get.cards(skills.length+2);
			game.cardsGotoOrdering(cards);
			// event.tar=(player.storage.North_ld_chenxun||player);
			var next=player.chooseToMove('忱恂：获得其中两张牌',true);
			next.set('list',[
				['置于'+get.translation(event.tar)+'武将牌上',cards],
				['获得'],
			]);
			next.set('filterMove',function(from,to,moved){
				// if(to==1&&moved[1].length>=2) return false;
				// return true;
				if(moved[0].includes(from.link)){
					if(typeof to=='number'){
						if(to==1){
							if(moved[1].length>=2) return false;
						}
						return true;
					}
				}
				return true;
			});
			next.set('filterOk',function(moved){
				return moved[1].length==2;
			});
			next.set('processAI',function(list){
				var cards=list[0][1].slice(0).sort(function(a,b){
					return get.value(b)-get.value(a);
				});
				return [cards,cards.splice(2,2)];
			})
			'step 1'
			var top=result.moved[1];
			var bottom=result.moved[0];
			top.reverse();
			// for(var i=0;i<top.length;i++){
			// 	ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
			// }
			// for(i=0;i<bottom.length;i++){
			// 	ui.cardPile.appendChild(bottom[i]);
			// }
			player.gain(top,'gain2');
			event.tar.addToExpansion(bottom,player,'giveAuto').gaintag.add('North_ld_chenxun');
			game.updateRoundNumber();
			game.delayx();
		},
		group:'North_ld_chenxun_after',
		subSkill:{
			after:{
				trigger:{
					player:'phaseAfter',
				},
				audio:'xunxun',
				forced:true,
				filter:function(event,player){
					if(player.getExpansions('North_ld_chenxun').length>0)return true;
					return false;
				},
				content:function(){
					'step 0'
					var cards=player.getExpansions('North_ld_chenxun');
					// player.chooseCardButton(cards,true,'选择要交出的牌');
					event.card=cards;
					'step 1'
					// if(result.bool){
						player.chooseTarget().set('ai',function(target){
							return target==player;
						}).set(
							'prompt',
							'请选择将牌交给一名角色，令其执行一个额外的摸牌阶段和出牌阶段<br>若其未拥有技能〖忱恂〗，则你回复所有体力并将手牌补至体力上限，令其获得〖忱恂〗直到本次额外的摸牌阶段和出牌阶段结束。'
						);
						// event.card=result.links;
					// }
					// else{event.finish();}
					'step 2'
					if(result.bool){
						var tar=result.targets[0];
						tar.gain(event.card,'gain2');
						if(!tar.hasSkill('North_ld_chenxun')){
							player.recover(player.getDamagedHp());
							var numb=player.countCards('h');
							var numc=player.maxHp-numb;
							if(numc>0){
								player.draw(numc);
							}
							tar.storage.North_ld_chenxun=player;
							tar.addTempSkill('North_ld_chenxun',{player:'phaseUseAfter'});
						}
						var next=tar.phaseDraw();
						event.next.remove(next);
						trigger.next.push(next);
						var next=tar.phaseUse();
						event.next.remove(next);
						trigger.next.push(next);
					}
					else{event.finish();}
				}
			}
		}
	},
	North_ld_minde:{
		audio:'wangxi',
		trigger:{player:'damageEnd',source:'damageSource'},
		filter:function(event){
			if(event._notrigger.includes(event.player)) return false;
			return event.num&&event.source&&event.player&&
			event.player.isAlive()&&event.source.isAlive()&&event.source!=event.player;
		},
		check:function(event,player){
			if(player.isPhaseUsing()) return true;
			if(event.player==player) return get.attitude(player,event.source)>-3;
			return get.attitude(player,event.player)>-3;
		},
		logTarget:function(event,player){
			if(event.player==player) return event.source;
			return event.player;
		},
		preHidden:true,
		content:function(){
			'step 0'
			event.count=trigger.num;
			event.target=lib.skill.North_ld_minde.logTarget(trigger,player);
			'step 1'
			var skills=player.getSkills(null,false,false).filter(function(i){
				var info=get.info(i);
				return info&&!info.charlotte;
			});
			var num=(skills.length>4)?2:3;
			player.draw(num);
			event.count--;
			'step 2'
			var cards=player.getCards('he');
			if(cards.length>0&&target.isAlive()){
				if(cards.length==1) event._result={bool:true,cards:cards};
				else player.chooseCard('he','忘隙：交给'+get.translation(target)+'任意张牌（至少一张）<br>(故意保留的忘隙)',[1,Infinity],true).set('ai',function(card){
					if(ui.selected.cards.length>=1) return -get.value(card);
					return 100-get.useful(card);
				});;
			}
			else event.goto(4);
			'step 3'
			if(result.bool){
				player.give(result.cards,target);
				if(result.cards.length<2){event.goto(6);}
			}
			'step 4'
			var list=[];
			if(lib.character[target.name]) list.addArray(lib.character[target.name][3]);
			if(lib.character[target.name1]) list.addArray(lib.character[target.name1][3]);
			if(lib.character[target.name2]) list.addArray(lib.character[target.name2][3]);
			list.push('cancel2');
			player.chooseControl(list).set('prompt2','请选择想要获得的技能');
			'step 5'
			if(result.control!='cancel2'){
				player.addTempSkill(result.control,{player:'phaseAfter'});
			}
			'step 6'
			if(event.count&&target.isAlive()){
				player.chooseBool(get.prompt2('North_ld_minde',target));
			}
			else event.finish();
			'step 7'
			if(result.bool){
				player.logSkill('North_ld_minde',target);
				event.goto(1);
			}
		},
		ai:{
			maixie:true,
			maixie_hp:true
		},
	},

	North_smk_shangying:{
		audio:'gzjili',
		forced:true,
		mod:{
			aiOrder:function(player,card,num){
				if(player.isPhaseUsing()&&get.subtype(card)=='equip1'&&!get.cardtag(card,'gifts')){
					var range0=player.getAttackRange();
					var range=0;
					var info=get.info(card);
					if(info&&info.distance&&info.distance.attackFrom){
						range-=info.distance.attackFrom;
					}
					if(player.getEquip(1)){
						var num=0;
						var info=get.info(player.getEquip(1));
						if(info&&info.distance&&info.distance.attackFrom){
							num-=info.distance.attackFrom;
						}
						range0-=num;
					}
					range0+=range;
					if(range0==(player.getHistory('useCard').length+player.getHistory('respond').length+2)&&player.countCards('h',function(cardx){
						return get.subtype(cardx)!='equip1'&&player.getUseValue(cardx)>0;
					})) return num+10;
				}
			},
		},
		trigger:{player:['useCard','respond']},
		// frequent:true,
		// locked:false,
		preHidden:true,
		filter:function(event,player){
			return player.getHistory('useCard').length+player.getHistory('respond').length==player.getAttackRange();
		},
		content:function(){
			player.draw(player.getHistory('useCard').length+player.getHistory('respond').length);
		},
		ai:{
			threaten:1.8,
			effect:{
				target:function(card,player,target,current){
					if(player!=target||!player.isPhaseUsing()) return;
					if(get.subtype(card)=='equip1'&&!get.cardtag(card,'gifts')){
						var range0=player.getAttackRange();
						var range=0;
						var info=get.info(card);
						if(info&&info.distance&&info.distance.attackFrom){
							range-=info.distance.attackFrom;
						}
						if(player.getEquip(1)){
							var num=0;
							var info=get.info(player.getEquip(1));
							if(info&&info.distance&&info.distance.attackFrom){
								num-=info.distance.attackFrom;
							}
							range0-=num;
						}
						range0+=range;
						var delta=range0-(player.getHistory('useCard').length+player.getHistory('respond').length);
						if(delta<0) return;
						var num=player.countCards('h',function(card){
							return (get.cardtag(card,'gifts')||get.subtype(card)!='equip1')&&player.getUseValue(card)>0;
						});
						if(delta==2&&num>0) return [1,3];
						if(num>=delta) return 'zeroplayertarget';
					}
				},
			},
		},
		derivation:['new_yajiao','oltiaoxin','olpaoxiao','retieji','new_rewusheng'],
		group:['North_smk_shangying_eq','North_smk_shangying_qz1','North_smk_shangying_qz2','North_smk_shangying_qz3','North_smk_shangying_qz4','North_smk_shangying_qz5','North_smk_shangying_dc'],
		subSkill:{
			eq:{
				audio:'gzjili',
		forced:true,
		trigger:{
			player:['phaseBegin','phaseEnd'],
		},
		filter:function(event,player){
			return game.hasPlayer(function(current){
				return current.getEquip(1);
			});
		},
		direct:true,
		content:function(){
			'step 0'
			player.chooseTarget(get.prompt2('North_smk_shangying_eq',),true,function(card,player,current){
				return current.getEquip(1);
			}).setHiddenSkill(event.name).ai=function(target){
				var num=1;
				if(target.hasSkill('gzxiaoji')) num+=2.5;
				// if(target.isDamaged()&&target.getEquip('baiyin')) num+=2.5;
				if(target.hasSkill('xuanlve')) num+=2;
				var player=_status.event.player;
				var bl=get.attitude(player,target);
				return num*bl;
			};
			'step 1'
			if(result.bool){
				event.target1=result.targets[0];
				player.logSkill('North_smk_shangying',event.target1);
				player.line(event.target1,'North_smk_shangying');
				player.gain(event.target1.getEquip(1),event.target1,'give','bySelf');
			}
			else event.finish();
		},
			},
			qz1:{
				inherit:'olyajiao',
				audio:'gzjili',
				filter:function(event,player){
					if(!lib.skill.olyajiao.filter(event,player)) return false;
					if(player.getAttackRange()<1) return false;
					return true;
				}
			},
			qz2:{
				audio:'gzjili',
				inherit:'oltiaoxin',
				filter:function(event,player){
					if(!lib.skill.oltiaoxin.filter(event,player)) return false;
					if(player.getAttackRange()<2) return false;
					return true;
				}
			},
			qz3:{
				audio:'gzjili',
				inherit:'olpaoxiao',
				filter:function(event,player){
					if(player.getAttackRange()<3) return false;
					return true;
				}
			},
			qz4:{
				audio:'gzjili',
				inherit:'retieji',
				filter:function(event,player){
					if(!lib.skill.retieji.filter(event,player)) return false;
					if(player.getAttackRange()<4) return false;
					return true;
				}
			},
			qz5:{
				audio:'gzjili',
				inherit:'new_rewusheng',
				filter:function(event,player){
					if(player.getAttackRange()<5) return false;
					return true;
				}
			},
			dc:{
				audio:'gzjili',
		trigger:{global:'phaseAfter'},
		filter:function(event,player){
			var num=0;
			player.getHistory('lose',function(evt){
				if(evt.cards2) num+=evt.cards2.length;
			});
			return num>=player.getAttackRange();
		},
		forced:true,
		preHidden:true,
		content:function(){
			player.draw(2);
		},
			},
		}
	},
	//------------凤仪貂蝉
	North_dc_ruofu:{
		audio:'biyue',
		trigger:{
			player:'phaseEnd',
		},
		subSkill:{
			mark:{
				mark:true,
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
			}
		},
		direct:true,
		content:function(){
			'step 0'
			event.count=0;
			'step 1'
			if(game.countPlayer(function(current){
				// if(get.mode()=='tafang'||get.mode()=='chess'){
					// if(get.distance(player,current)>8)return false;
				// }
				return current!=player&&current.isIn()&&!current.getExpansions('North_dc_ruofu_mark').length;
			})){
				var str='本次第'+get.cnNumber(event.count+1)+'次发动<br>摸一张牌，并将一张牌置于其他角色上称为“若芙”';
				player.chooseBool(get.prompt('North_dc_ruofu',player),str).set('ai',function(){
					var targets=game.countPlayer(function(current){
						if(current==_status.event.player)return false;
						if(current.getExpansions('North_dc_ruofu_mark').length)return false;
						var att=get.attitude(_status.event.player,current);
						return att<=0;
					});
					return targets>0;
				});
				// event.goto(2);
			}
			else{event.finish();}
			'step 2'
			if(result.bool){
				player.logSkill('North_dc_ruofu');
				event.count++;
				player.draw();
				player.chooseCardTarget({
					forced:true,
					position:'he',
					filterTarget:function(card,player,target){
						return target!=player&&target.isIn()&&target.getExpansions('North_dc_ruofu_mark').length<1;
					},
					ai1:function(card){
						return 7-get.value(card);
					},
					ai2:function(target){
						return -get.attitude(_status.event.player,target);
					},
					prompt:get.prompt2('North_dc_ruofu'),
				});
			}
			'step 3'
			if(result.bool){
				var target=result.targets[0];
				player.line(target,'green');
				if(target.isIn()){
					target.addToExpansion(result.cards,player,'giveAuto').gaintag.add('North_dc_ruofu_mark');
				}
				else{
					event.finish();
				}
				if(event.count<8){
					event.goto(1);
				}
			}
		},
		ai:{
			expose:0.4,//跳立场
		}
	},
	North_dc_sulian:{
		audio:'huoxin',
		forced:true,
		global:['North_dc_sulian_lose'],
		// group:['North_dc_sulian_remove'],
		subSkill:{
			lose:{
				audio:'huoxin',
				trigger:{
					player:'phaseBegin',
				},
				filter:(event,player)=>{
					return player.getExpansions('North_dc_ruofu_mark').length;
				},
				forced:true,
				content:()=>{player.loseHp();},
			}
		},
		trigger:{
			global:'damageEnd',
		},
		filter:(event,player)=>{
			if(!event.source||!event.source.getExpansions('North_dc_ruofu_mark').length) return false;
			if(!event.player.isAlive()||!event.player.getExpansions('North_dc_ruofu_mark').length) return false;
			return true;
		},
		content:function(){
			trigger.player.loseToDiscardpile(trigger.player.getExpansions('North_dc_ruofu_mark'));
			if(trigger.card&&trigger.card.name=='sha'){
				player.draw(2);
				player.recover();
			}else{player.draw();}
		}
	},
	North_dc_qilu:{
		audio:'meihun',
		forced:true,
		trigger:{
			target:'useCardToBegin',
		},
		filter:function(event,player){
			if(event.targets&&event.targets.length>1) return false;
			if(event.card&&event.player!=player) return true;
		},
		content:()=>{
			player.draw();
			if(trigger.player.getExpansions('North_dc_ruofu_mark').length){
				trigger.player.loseHp();
				trigger.player.chooseToDiscard(4-player.hp,'he',true);
			}
		}
	},
	North_dc_ziman:{
		audio:'lijian',
		forced:true,
		trigger:{
			player:'phaseBegin',
		},
		group:'North_dc_ziman2',
		direct:true,
		init:function(player){
			player.storage.North_dc_ziman=[];
		},
		ybtogo:function(list){
			var list2=[];
			for(var i of list){
				list2.push(get.translation(i));
			}
			return list2;
		},
		mark:true,
		intro:{
			content:'$的下个回合交由你控制。'
		},
		content:function(){
			'step 0'
			event.count=0;
			event.list=[];
			'step 1'
			if(game.countPlayer(function(current){
				// if(get.mode()=='tafang'||get.mode()=='chess'){
					// if(get.distance(player,current)>8)return false;
				// }
				return current.isIn()&&current.getExpansions('North_dc_ruofu_mark').length;
			})){
				var str='本次第'+get.cnNumber(event.count+1)+'次发动<br>收回一名角色的“若芙”牌';
				if(event.count==0)str+='本次收回，你回复一点体力';
				if(event.count==1)str+='本次收回，令本次选择的角色流失1点体力';
				if(event.count>=2)str+='本次收回，你与本次选择的角色互换位置且其下个回合改为由你操控。';
				player.logSkill('North_dc_ziman');
				//当你收入第1/2/3张“若芙”标记时，你回复1点体力/令本次选择的角色流失1点体力/你与本次选择的角色互换位置且其下个回合改为由你操控。
				player.chooseTarget(true,function(card,player,target){
					return target.isIn()&&target.getExpansions('North_dc_ruofu_mark').length;
				}).set('prompt2',str);
			}
			else{event.finish();}
			'step 2'
			if(result.bool){
				var target=result.targets[0];
				player.line(target,'green');
				event.list.push(target);
				player.gain(target.getExpansions('North_dc_ruofu_mark'),'gain2');
				switch(event.count){
					case 0 : player.recover();break;
					case 1 : target.loseHp();break;
					case 2 : 
						if(get.mode()!='tafang'&&get.mode()!='chess')game.broadcastAll(function(target1,target2){game.swapSeat(target1,target2);},player,target);
						if(get.mode()!='tafang'&&get.mode()!='chess')player.storage.North_dc_ziman.push(target);
						break;
				}
			}
			'step 3'
			if(event.count<2){
				event.count++;
				event.goto(1);
			}
			else{
				player.chooseBool('是否令'+get.YB_tobo(event.list)+'进行谋离间？');
			}
			'step 4'
			if(result.bool){
				player.YB_sblijian(event.list);
			}
			'step 5'
			event.count=0;
			event.list=[];
			event.goto(1);
		},
	},
	North_dc_ziman2:{
		audio:'lihun',
		direct:true,
		charlotte:true,
		trigger:{
			global:'phaseBeginStart',
		},
		filter:(event,player)=>{
			return player!=event.player&&!event.player._trueMe&&player.storage.North_dc_ziman.includes(event.player);
		},
		logTarget:'player',
		content:function(){
			player.storage.North_dc_ziman.remove(trigger.player);
			trigger.player._trueMe=player;
			game.addGlobalSkill('autoswap');
			if(trigger.player==game.me){
				game.notMe=true;
				if(!_status.auto) ui.click.auto();
			}
			trigger.player.addSkill('North_dc_ziman3');
		}
	},
	North_dc_ziman3:{
		trigger:{
			player:['phaseAfter','dieAfter'],
			global:'phaseBefore',
		},
		lastDo:true,
		charlotte:true,
		forceDie:true,
		forced:true,
		silent:true,
		content:function(){
			player.removeSkill('North_dc_ziman3');
		},
		onremove:function(player){
			if(player==game.me){
				if(!game.notMe) game.swapPlayerAuto(player._trueMe)
				else delete game.notMe;
				if(_status.auto) ui.click.auto();
			}
			delete player._trueMe;
		},
	},


	North_bmh_wuzhi:{
		audio:'zongkui',
		trigger:{
			global:['damageBegin4','turnOverEnd'],
		},
		filter:(event,player)=>{
			return game.countPlayer(function(current){
			//计算游戏中的每个玩家
				return !current.hasMark('North_bmh_wuzhi_xian')&&!current.hasMark('North_bmh_wuzhi_shuai');
			})>0;
		},
		init:function(player){
			lib.translate.North_bmh_wuzhi_xian='巫治·献'
			lib.translate.North_bmh_wuzhi_shuai='巫治·率'
		},
		direct:true,
		content:function(){
			'step 0'
			var str='是否令一名没有“巫治”标记的角色获得';
			if(event.triggername=='turnOverEnd'){
				if(trigger.player.isTurnedOver()){
					event.wuzhi=1;
					str+='【献】';
				}
				else {
					event.wuzhi=2;
					str+='【率】';
				}
			}
			else if(event.triggername=='damageBegin4'){
				if(!trigger.nature){
					event.wuzhi=1;
					str+='【献】';
				}
				else {
					event.wuzhi=2;
					str+='【率】';
				}
			}
			event.str=str;
			'step 1'
			// var list=game.countPlayer(function(current){
			// //计算游戏中的每个玩家
			// 	return !current.storage.North_bmh_wuzhi_mark;
			// });
			player.chooseTarget(function(card,player,target){
				return !target.hasMark('North_bmh_wuzhi_xian')&&!target.hasMark('North_bmh_wuzhi_shuai');
			}).set('prompt',event.str).set('ai',function(target){
				var att=get.attitude(player,target);
				if(event.wuzhi==2)return -att;
				return att;
			});
			'step 2'
			if(result.bool){
				player.logSkill('North_bmh_wuzhi');
				if(event.wuzhi==1){
					player.line(result.targets[0],'wood');
					result.targets[0].markSkill('North_bmh_wuzhi_xian');
					result.targets[0].addMark('North_bmh_wuzhi_xian');
					trigger.trigger('North_bmh_wuxian');
				}
				if(event.wuzhi==2){
					player.line(result.targets[0],'fire');
					result.targets[0].markSkill('North_bmh_wuzhi_shuai');
					result.targets[0].addMark('North_bmh_wuzhi_shuai');
					trigger.trigger('North_bmh_wushuai');
				}
			}
		},
		global:['North_bmh_wuzhi_xian','North_bmh_wuzhi_shuai'],
		subSkill:{
			xian:{
				// mark:true,
				marktext:'献',
				nobracket:true,
				intro:{
					content:'巫治·献'
				},
			},
			shuai:{
				// mark:true,
				marktext:'率',
				nobracket:true,
				intro:{
					content:'巫治·率'
				},
			}
		}
	},
	North_bmh_huanchao:{
		audio:'baijia',
		limited:true,
		skillAnimation:true,
		animationColor:'water',
		enable:'phaseUse',
		init:function(player){
			player.addSkill('North_bmh_huanchao_ben');
			player.storage.North_bmh_huanchao_ben=true;
		},
		filter:function(event,player){
			if(player.storage.North_bmh_huanchao_ben==true)var huanchao='xian';
			else var huanchao='shuai';
			return game.countPlayer(function(current){
				return current.hasMark('North_bmh_wuzhi_'+huanchao);
			})>0;
		},
		filterCard:function(card){
			var type=get.type(card);
			for(var i=0;i<ui.selected.cards.length;i++){
				if(get.type(ui.selected.cards[i])==type) return false;
			}
			return true;
		},
		complexCard:true,
		limited:true,
		position:'he',
		selectCard:3,
		line:'water',
		content:function(){
			'step 0'
			player.addMark('North_bmh_huanchao_mark',1,false);
			player.awakenSkill('North_bmh_huanchao');
			'step 1'
			event.num=player.countMark('North_bmh_huanchao_mark');
			event.list=[];
			event.huanchao='shuai';
			if(player.storage.North_bmh_huanchao_ben==true){
				event.huanchao='xian';
			}
			game.filterPlayer(function(current){
				var skill='North_bmh_wuzhi_'+event.huanchao;
				if(current.hasMark(skill)){
					// game.log('skill')
					if(event.huanchao=='xian'){
						current.recover(event.num);event.list.push(current);
					}
					else{current.loseHp(event.num);event.list.push(current);}
					
				}
			})
			'step 2'
			for(var i of event.list){
				// game.log(i)
				i.removeMark('North_bmh_wuzhi_'+event.huanchao,false);
				i.unmarkSkill('North_bmh_wuzhi_'+event.huanchao);
			}
			'step 3'
			player.changeZhuanhuanji('North_bmh_huanchao_ben');
		},
		// group:'North_bmh_huanchao_ben',
		subSkill:{
			ben:{
		zhuanhuanji:true,
		mark:true,
		marktext:'☯',
		intro:{
			content:function(storage,player,skill){
				var str='';
				if(player.storage.North_bmh_huanchao_ben==true) str+='限定技。转换技。出牌阶段，你可弃置3张不同类型的牌，并执行，<span class=thundertext>阳：令拥有“献”的角色依次回复X点体力</span>；阴：令拥有“率”的角色依次流失X点体力。执行结束后，相关角色弃置“巫治”标记（X为此技能发动次数）。';
				else str+='限定技。转换技。出牌阶段，你可弃置3张不同类型的牌，并执行，阳：令拥有“献”的角色依次回复X点体力；<span class=thundertext>阴：令拥有“率”的角色依次流失X点体力</span>。执行结束后，相关角色弃置“巫治”标记（X为此技能发动次数）。';
				str+='<br>当前已使用';
				str+=player.countMark('North_bmh_huanchao_mark');
				str+='次';
				return str;
			},
		},
			}
		},
	},
	North_bmh_chizhang:{
		audio:'guju',
		trigger:{
			player:'phaseEnd',
		},
		filter:function(event,player){
			if(game.countPlayer(function(target){
				if(get.North_bmh_chizhang(target).length>0) return true;
			})<1) return false;
			var damage=player.getHistory('sourceDamage').length;
			if(damage>=player.maxHp) return true;
		},
		content:function(){
			'step 0'
			//game.me.restoreSkill('North_bmh_huanchao')
			// event.players=game.countPlayer(function(target){
			// 	if(get.North_bmh_chizhang(target).length>0) return true;
			// })
			player.chooseTarget(function(card,player,target){
				return get.North_bmh_chizhang(target).length>0;
			}).set('prompt2','请选择一名角色，并使其一个已发动的限定技恢复。').set('ai',function(target){
				var att=get.attitude(player,target);
				return att;
			});
			'step 1'
			if(result.bool){
				var target=result.targets[0];
				var list=get.North_bmh_chizhang(target);
				// game.log(list);
				if(list.length==1){
					player.restoreSkill(list[0]);
					trigger.trigger('North_bmh_chizhangu');
					event.finish();
				}
				else if(list.length>1){
					player.chooseControl(list,true).set('prompt','选择一个限定技恢复之');
				}
				else{
					event.finish();
				}
			}
			'step 2'
			player.restoreSkill(result.control);
			trigger.trigger('North_bmh_chizhangu');
		},
	},
	North_bmh_chizhangd:{
		audio:'guju',
		inherit:'North_bmh_chizhang',
		filter:function(event,player){
			if(game.countPlayer(function(target){
				if(get.North_bmh_chizhang(target).length>0) return true;
			})<1) return false;
			var damage=player.getHistory('sourceDamage').length;
			var num=player.maxHp+player.getHandcardLimit();
			if(damage>=num) return true;
		},
	},
	North_bmh_chizhangt:{
		audio:'guju',
		inherit:'North_bmh_chizhang',
		filter:function(event,player){
			if(game.countPlayer(function(target){
				if(get.North_bmh_chizhang(target).length>0) return true;
			})<1) return false;
			var damage=player.getHistory('useCard').length;
			var num=player.maxHp+player.getHandcardLimit();
			if(damage>=num) return true;
		},
	},
	North_bmh_chizhangq:{
		audio:'guju',
		inherit:'North_bmh_chizhang',
		filter:function(event,player){
			if(game.countPlayer(function(target){
				if(get.North_bmh_chizhang(target).length>0) return true;
			})<1) return false;
			var damage=player.getHistory('useCard').length;
			var list=player.getHistory('lose',function(evt){
				return evt.type=='discard'&&evt.getParent('phaseDiscard')==event;
			}).length;
			var num=player.maxHp+player.getHandcardLimit();
			if(damage>=num||list>=num) return true;
			//---------------这个技能很可能有bug，不过正常情况下也玩不到
		},
	},
	North_bmh_chizhangp:{
		audio:'guju',
		inherit:'North_bmh_chizhang',
		trigger:{global:'phaseEnd'},
		filter:function(event,player){
			if(game.countPlayer(function(target){
				if(get.North_bmh_chizhang(target).length>0) return true;
			})<1) return false;
			var damage=player.getHistory('lose').length;
			var num=event.player.getHistory('lose').length;
			if(damage>=num) return true;
		},
	},
	North_bmh_lushou:{
		audio:'bmcanshi',
		forced:true,
		popup:false,
		trigger:{
			global:['North_bmh_wuxian','North_bmh_wushuai','phaseDrawBegin1','North_bmh_chizhangu'],
		},
		filter:function(event,player,name){
			if(name=='phaseDrawBegin1') return event.player==player;
			return true;
		},
		content:function(){
			if(event.triggername=='North_bmh_wuxian'){
				player.draw(2);
				player.logSkill('North_bmh_lushou');
			}
			else if(event.triggername=='North_bmh_wushuai'){
				player.draw(3);
				player.logSkill('North_bmh_lushou');
			}
			else if(event.triggername=='phaseDrawBegin1'){
				if(get.North_bmh_chizhang(player).length>0) {
					trigger.num+=3;
					player.logSkill('North_bmh_lushou');
				}
			}
			else{
				player.draw(3);
				var players=game.filterPlayer(function(target){
					return target.hasMark('North_bmh_wuzhi_xian');
				})
				for(var i of players){
					i.draw(3);
					player.line(i,'water');
					player.logSkill('North_bmh_lushou');
				}
			}
		},
		mod:{
			maxHandcard:function (player,num){
				if(get.North_bmh_chizhang(player).length>0) return num+3;
				return num;
			},
		},
	},

	North_bls_qiangong:{
		audio:'anxu',
		enable:'phaseUse',
		getsuit:function(player){
			if(player.storage.North_bls_qiangong_suit) return player.storage.North_bls_qiangong_suit;
			return [];
		},
		getsuit2:function(player){
			if(player.storage.North_bls_qiangong_suit2) return player.storage.North_bls_qiangong_suit2;
			return [];
		},
		gettar1:function(player){
			if(player.storage.North_bls_qiangong_tar1) return player.storage.North_bls_qiangong_tar1;
			return [];
		},
		gettar2:function(player){
			if(player.storage.North_bls_qiangong_tar2) return player.storage.North_bls_qiangong_tar2;
			return [];
		},
		filter:function(event,player){
			return !player.hasSkill('North_bls_qiangong_ban');
		},
		selectCard:1,
		filterCard:function(card,player){
			// lib.skill.North_bls_qiangong.getsuit(player);
			return !lib.skill.North_bls_qiangong.getsuit(player).includes(get.suit(card));
		},
		selectTarget:2,
		filterTarget:function(card,player,target){
			if(ui.selected.targets.length==1){
				return !lib.skill.North_bls_qiangong.gettar2(player).includes(target);
			}
			return !lib.skill.North_bls_qiangong.gettar1(player).includes(target);
		},
		// multiline:true,
		multitarget:true,
		mark:true,
		intro:{
			content:function(event,player,storage,name,skill){
				var suit=lib.skill.North_bls_qiangong.getsuit(player);
				var suit2=lib.skill.North_bls_qiangong.getsuit2(player);
				var tar1=lib.skill.North_bls_qiangong.gettar1(player);
				var tar2=lib.skill.North_bls_qiangong.gettar2(player);
				var str='';
				if(player.hasSkill('North_bls_qiangong_ban'))str+='<span class=yellowtext>此技能本回合失效</span>';
				str+='<br>计入次数的花色：';
				str+=get.translation(suit);
				str+='<br>影响缘雅的花色：';
				str+=get.translation(suit2);
				str+='<br>目标A已选择：';
				str+=get.translation(tar1);
				str+='<br>目标B已选择：';
				str+=get.translation(tar2);
				return str;
			}
		},
		discard:false,
		targetprompt:['目标A','目标B'],
		content:function(){
			'step 0'
			event.suit=get.suit(cards[0]);
			player.give(cards[0],targets[0]);
			'step 1'
			targets[0].showHandcards();
			'step 2'
			var suit=event.suit;
			var cards=targets[0].getCards('he',function(i){
				return get.suit(i)==suit;
			});
			targets[0].give(cards,targets[1]);
			event.cards=cards;
			event.suit=suit;
			'step 3'
			var cards=event.cards;
			var suit=event.suit;
			if(cards.length<=2){
				player.draw();
			}
			else{
				player.addTempSkill('North_bls_qiangong_suit');
				if(!player.storage.North_bls_qiangong_suit)player.storage.North_bls_qiangong_suit=[];
				player.storage.North_bls_qiangong_suit.add(suit);
			}
			player.addTempSkill('North_bls_qiangong_suit2');
			player.addTempSkill('North_bls_qiangong_tar1');
			player.addTempSkill('North_bls_qiangong_tar2');
			if(!player.storage.North_bls_qiangong_suit2)player.storage.North_bls_qiangong_suit2=[];
			if(!player.storage.North_bls_qiangong_tar1)player.storage.North_bls_qiangong_tar1=[];
			if(!player.storage.North_bls_qiangong_tar2)player.storage.North_bls_qiangong_tar2=[];
			player.storage.North_bls_qiangong_suit2.add(suit);
			player.storage.North_bls_qiangong_tar1.add(targets[0]);
			player.storage.North_bls_qiangong_tar2.add(targets[1]);
			if(cards.length>5){
				player.addTempSkill('North_bls_qiangong_ban');
			}
			// delete target.storage.refanjian;
		},
		subSkill:{
			suit:{onremove:true,},
			suit2:{onremove:true,},
			tar1:{onremove:true,},
			tar2:{onremove:true,},
			ban:{onremove:true,},
		},
	},
	North_bls_yuanya:{
		audio:'zhuiyi',
		trigger:{
			player:['phaseBegin','phaseEnd'],
		},
		direct:true,
		filter:function(event,player,name){
			if(name=='phaseEnd')return lib.skill.North_bls_qiangong.getsuit2(player).length==4;
			return true;
		},
		content:function(){
			'step 0'
			var str=event.triggername=='phaseBegin'?'回合开始时':'回合结束时';
			player.chooseTarget().set('ai',function(target){
				var att=get.attitude(player,target);
				return att>0;
			}).set('prompt2',str+'你可以指定1名角色回复1点体力和摸3张牌并选择令其①出牌阶段后额外获得1个摸牌阶段②弃牌阶段结束后额外获得1个出牌阶段③废除判定区。');
			'step 1'
			if(result.targets){
				result.targets[0].recover();
				result.targets[0].draw(3);
				event.target=result.targets[0];
				var list=['选项一','选项二','选项三'];
				var list2=['选项一：出牌阶段结束后额外获得1个摸牌阶段','选项二：弃牌阶段结束后额外获得1个出牌阶段','选项三：废除判定区'];
				if(!player.storage['North_bls_yuanya_'+result.targets[0].playerid])player.storage['North_bls_yuanya_'+result.targets[0].playerid]=[];
				event.list=[];
				for(var i=0;i<list.length;i++){
					if(player.storage['North_bls_yuanya_'+result.targets[0].playerid].includes(list[i])){
						list2[i]=('<span style="text-decoration:line-through; opacity:0.5; ">'+list2[i]+'</span>');
					}
					else if(i==2&&result.targets[0].storage._disableJudge){
						list2[i]=('<span style="opacity:0.5;">'+list2[i]+'</span>');
					}
					else {
						event.list.push(list[i]);
					}
				}
				event.list.push('cancel2');
				var str='';
				for(var i=0;i<list2.length;i++){
					if(i!=0)str+='<br>';
					str+=list2[i];
				}
				player.chooseControl(event.list).set('prompt','请选择一项').set('prompt2',str);
			}
			'step 2'
			if(!result.control||result.control=='cancel2'){
				event.finish();
			}
			else{
				if(result.control=='选项一'){
					event.target.addSkill('North_bls_yuanya_draw');
					player.storage['North_bls_yuanya_'+event.target.playerid].add('选项一');
				}
				else if(result.control=='选项二'){
					event.target.addSkill('North_bls_yuanya_use');
					player.storage['North_bls_yuanya_'+event.target.playerid].add('选项二');
				}
				else{
					event.target.disableJudge();
					player.storage['North_bls_yuanya_'+event.target.playerid].add('选项三');
				}
			}
		},
		subSkill:{
			use:{
				audio:'zhuiyi',
				// usable:1,
				direct:true,
				charlotte:true,
				trigger:{player:'phaseDiscardAfter'},
				mark:true,
				marktext:'出',
				intro:{
					// content:'每回合限一次，弃牌阶段结束后获得一个额外出牌阶段'
					content:'弃牌阶段结束后获得一个额外出牌阶段'
				},
				content:function(){
					var next=player.phaseUse();
					event.next.remove(next);
					trigger.next.push(next);
				}
			},
			draw:{
				audio:'zhuiyi',
				// usable:1,
				direct:true,
				charlotte:true,
				// trigger:{player:'phaseUseAfter'},
				trigger:{player:'phaseDiscardBefore'},
				mark:true,
				marktext:'摸',
				intro:{
					// content:'每回合限一次，出牌阶段结束后获得一个额外摸牌阶段'
					content:'弃牌阶段开始前获得一个额外摸牌阶段'
				},
				content:function(){
					var next=player.phaseDraw();
					event.next.remove(next);
					trigger.next.push(next);
				}
			},
		}
	},
	North_cjy_bashu:{
		audio:'yuqi',
		trigger:{
			player:'phaseBefore',
		},
		filter:function(event,player){
			if(player.storage.North_cjy_lvzhi>0||player.countCards('e')>0) return true;
			return false;
		},
		content:function(){
			'step 0'
			var numaa=player.storage.North_cjy_lvzhi;
			if(player.countCards('e')>0){
				player.choosePlayerCard(player,[1,player.countCards('e')],'e').set('prompt','请选择要弃置的牌').set('prompt2','已因虑至弃置了'+numaa+'装备牌');
			}
			'step 1'
			if(result.bool){
				player.addMark('North_cjy_lvzhi',result.links.length);
				player.discard(result.links);
			}
			'step 2'
			event.num=player.storage.North_cjy_lvzhi;
			'step 3'
			player.removeMark('North_cjy_lvzhi',event.num);
			player.draw(event.num);
			if(event.num>0){
				player.storage.North_cjy_bashu_1=event.num;
				player.addTempSkill('North_cjy_bashu_1',{player:'phaseAfter'});
			}
		},
		mark:true,
		intro:{
			content:function(storage,player){
				var str='本回合以下标黄的阶段改为出牌阶段。';
				var list=['判定阶段','摸牌阶段','弃牌阶段'];
				if(player.storage.North_cjy_bashu_1){
					if(player.storage.North_cjy_bashu_1>0) list[0]=('<span class=yellowtext>'+list[0]+'</span>');
					if(player.storage.North_cjy_bashu_1>1) list[1]=('<span class=yellowtext>'+list[1]+'</span>');
					if(player.storage.North_cjy_bashu_1>2) list[2]=('<span class=yellowtext>'+list[2]+'</span>');
				}
				str+=list;
				return str;
			},
		},
		// group:'North_cjy_bashu_1',
		subSkill:{
			1:{
				audio:'yuqi',
				trigger:{player:['phaseJudgeBefore','phaseDrawBefore','phaseDiscardBefore']},
				// forced:true,
				filter:function(event,player,name){
					if(name=='phaseJudgeBefore')return player.storage.North_cjy_bashu_1>0;
					if(name=='phaseDrawBefore')return player.storage.North_cjy_bashu_1>1;
					if(name=='phaseDiscardBefore')return player.storage.North_cjy_bashu_1>2;
					return false;
				},
				direct:true,
				onremove:true,
				content:function(){
					player.logSkill('North_cjy_bashu');
					trigger.cancel();
					var map={
						phaseJudge:'判定阶段',
						phaseDraw:'摸牌阶段',
						phaseDiscard:'弃牌阶段',
					}
					game.log(player,'的',map[trigger.name],'改成了出牌阶段');
					var next=player.phaseUse();
					event.next.remove(next);
					trigger.getParent().next.push(next);
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.type(card)=='delay') return 'zerotarget';
						},
					},
				},
			},
		},
	},
	North_cjy_duijing:{
		audio:'xianjing',
		init:function(player){
			player.markSkill('_YB_phaseNumber');
		},
		trigger:{player:'phaseUseBegin'},
		content:function(){
			if(player.storage._YB_phaseNumber%4==0){var num=5;}
			player.draw(num||1);
		},
		prompt2:function(event,player){
			var str='你可以摸';
			var num=player.storage._YB_phaseNumber%4==0?5:1;
			str+=num;
			str+='张牌';
			return str;
		},
		mark:true,
		marktext:'出',
		intro:{
			name:'出牌阶段计数',
			content:function(event,player){
				var num=(player.storage._YB_phaseNumber||0);
				return '你经历了'+num+'个出牌阶段';
			},
		},
		group:'North_cjy_duijing_diancai',
		subSkill:{
			diancai:{
				audio:'xianjing',
				trigger:{global:'phaseUseEnd'},
				filter:function(event,player){
					// var tar=_status.currentPhase;
					var tar=event.player;
					if(player==tar) return false;
					return tar.getHistory('useCard',function(evt){
						if(evt.targets&&evt.targets.length&&evt.isPhaseUsing()){
							var targets=evt.targets.slice(0);
							// while(targets.includes(tar)) targets.remove(tar);//筛除自己
							for(var i of targets){
								if(get.distance(tar,i)>2) targets.remove(i);//筛除范围以外
							}
							return targets.length>0;
						}
						return false;
					}).length>0;
					return true;
				},
				direct:true,
				content:function(){
					'step 0'
					var list=[];
					if(trigger.player.countCards('ej')>0) list.push('移动');
					if(trigger.player.countDiscardableCards(player,'hej')) list.push('弃置');
					list.push('cancel2');
					player.chooseControl(list).set('prompt','对镜：请选择一项').set('prompt2','移动其区域内一张牌，或弃置其一张牌').set('ai',function(control){
						var att=get.attitude(player,trigger.player)
						if(att>0) return 'cancel2';
						return 0;
					});
					'step 1'
					if(result.control=='移动'){
						event.goto(2);
					}
					else if(result.control=='弃置'){
						event.goto(5);
					}
					else {event.finish();}
					'step 2'
					var list=[];
					if(trigger.player.countCards('e')>0){
						list.push('装备区');
						list.push(trigger.player.getCards('e'));
					}
					if(trigger.player.countCards('j')>0){
						list.push('判定区');
						list.push(trigger.player.getCards('j'));
					}
					player.chooseButton(1,list).set('prompt2','先选择其区域内的一张牌，<br>看好了再选，别选错！！！！！');
					'step 3'
					if(result.bool){
						event.card=result.links[0];
						player.chooseTarget(function(card,player,target){
							if(get.position(event.card)=='e'){
								// if(target==trigger.player) return false;
								var type=get.subtype(event.card);
								return trigger.player!=target&&target.isEmpty(type);
							}
							else if(event.card.viewAs){
								return target.canAddJudge({name:event.card.viewAs},[event.card]);
							}
							else{
								return target.canAddJudge(event.card);
							}
						}).set('prompt2','再选择一名能接纳此牌的角色，<br>上一步选错的话，这里只能将错就错，或者取消技能。');
					}
					else {event.finish();}
					'step 4'
					if(result.bool){
						player.logSkill('North_cjy_duijing');
						event.target=result.targets[0];
						var link=event.card;
						if(get.position(link)=='e'){
							event.target.equip(link);
						}
						else if(link.viewAs){
							event.target.addJudge({name:link.viewAs},[link]);
						}
						else{
							event.target.addJudge(link);
						}
					}
					event.finish();
					'step 5'
					player.logSkill('North_cjy_duijing');
					player.discardPlayerCard('hej',trigger.player);
				}
			},
		},
	},
	North_cjy_lvzhi:{
		audio:'shanshen',
		trigger:{global:'phaseAfter'},
		filter:function(event,player){
			var tar=_status.currentPhase;
			if(player==tar) return false;
			var numa=tar.getHistory('useCard',function(evt){
				if(evt.targets&&evt.targets.length&&evt.isPhaseUsing()){
					var targets=evt.targets.slice(0);
					return targets.length>0;
				}
				return false;
			}).length;
			// game.log(numa);
			var numb=player.getHistory('lose',function(evt){
				var ll=[];
				ll.add(evt.hs);
				ll.add(evt.es);
			}).length;
			if(numa>=3)return true;
			if(numb>=3)return true;
			return false;
		},
		direct:true,
		content:function(){
			'step 0'
			player.choosePlayerCard(player,'he').set('filterButton',function(button){
				var type=get.type(button.link);
				return type=='equip';
			});
			'step 1'
			if(result.bool){
				player.logSkill('North_cjy_lvzhi');
				player.discard(result.links[0]);
				player.addMark('North_cjy_lvzhi');
			}
			else {event.finish();}
			'step 2'
			player.draw();
			var next=player.phaseUse();
			event.next.remove(next);
			trigger.next.push(next);
		}
	},

	North_hyy_guishi:{
		audio:'jiqiao',
		trigger:{player:['gameDrawBegin','gameDrawAfter']},
		direct:true,
		content:function(){
			'step 0'
			if(event.triggername=='gameDrawBegin'){
				// trigger.num+=4;
				player.draw(4);
				event.finish();
			}
			else{
				if(player.countCards('he')<=4){
					player.addToExpansion(player.getCards('he'),player,'giveAuto').gaintag.add('North_hyy_guishi');
				}
				else {
					player.chooseCard('he',4);
				}
			}
			'step 1'
			player.addToExpansion(result.cards,player,'giveAuto').gaintag.add('North_hyy_guishi');
		},
		mark:true,
		intro:{
			markcount:'expansion',
			mark:function(dialog,content,player){
				var content=player.getExpansions('North_hyy_guishi');
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
				var content=player.getExpansions('North_hyy_guishi');
				if(content&&content.length){
					if(player==game.me||player.isUnderControl()){
						return get.translation(content);
					}
					return '共有'+get.cnNumber(content.length)+'张星';
				}
			}
		},
		group:['North_hyy_guishi_qixing','North_hyy_guishi_caigui','North_hyy_guishi_taoluan'],
		subSkill:{
			qixing:{
				audio:'jiqiao',
				trigger:{player:['phaseDrawAfter','phaseUseAfter']},
				direct:true,
				filter:function(event,player){
					return player.getExpansions('North_hyy_guishi').length>0&&player.countCards('h')>0;
				},
				content:function(){
					"step 0"
					var cards=player.getExpansions('North_hyy_guishi');
					if(!cards.length||!player.countCards('h')){
						event.finish();
						return;
					}
					var next=player.chooseToMove('闺识·七星：是否交换“闺识”和手牌？');
					next.set('list',[
						[get.translation(player)+'（你）的闺识',cards],
						['手牌区',player.getCards('h')],
					]);
					next.set('filterMove',function(from,to){
						return typeof to!='number';
					});
					next.set('processAI',function(list){
						var player=_status.event.player,cards=list[0][1].concat(list[1][1]).sort(function(a,b){
							return get.value(a)-get.value(b);
						}),cards2=cards.splice(0,player.getExpansions('North_hyy_guishi').length);
						return [cards2,cards];
					});
					"step 1"
					if(result.bool){
						var pushs=result.moved[0],gains=result.moved[1];
						pushs.removeArray(player.getExpansions('North_hyy_guishi'));
						gains.removeArray(player.getCards('h'));
						if(!pushs.length||pushs.length!=gains.length) return;
						player.logSkill('North_hyy_guishi');
						player.addToExpansion(pushs,player,'giveAuto').gaintag.add('North_hyy_guishi');
						game.log(player,'将',pushs,'作为“闺识”置于武将牌上');
						player.gain(gains,'draw');
					}
				},
			},
			caigui:{
				audio:'jiqiao',
				trigger:{
					global:'judgeEnd',
				},
				// preHidden:true,
				// frequent:true,
				filter:function (event,player){
					return player.getExpansions('North_hyy_guishi').length<7;
				},
				content:function (){
					var card=get.cards(1);
					player.addToExpansion(card,player,'giveAuto').gaintag.add('North_hyy_guishi');
					game.log(player,'将',card,'作为“闺识”置于武将牌上');
				},
			},
			taoluan:{
				audio:'jiqiao',
				enable:'chooseToUse',
				usable:1,
				filter:function (event,player){
					var evt=lib.filter.filterCard;
					if(event.filterCard) evt=event.filterCard;
					for(var i of player.getExpansions('North_hyy_guishi')){
						var type=get.type(i);
						if(type=='trick'&&evt({name:i.name},player,event)) return true;
					};
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var cards=player.getExpansions('North_hyy_guishi');
						return ui.create.dialog('闺识',cards,'hidden');
					},
					filter:function (button,player){
						var card=button.link;
						if(get.type(card)!='trick')return false;
						return _status.event.getParent().filterCard({name:card.name},player,_status.event.getParent());
					},
					backup:function(links,player){
						var skill=_status.event.buttoned;
						return {
							audio:'jiqiao',
							selectCard:-1,
							position:'x',
							discard:false,
							lose:false,
							filterCard:function(){return false},
							viewAs:{
								name:links[0].name,
								nature:links[0].nature,
							},
							card:links[0],
						}
					},
					prompt:function(links,player){
						return '闺识：选择 '+get.translation(links[0])+'的目标';
					}
				},
				hiddenCard:function (player,name){
					var type=get.type(name);
					return type=='trick';
				},
				/*
				// 4.每个回合限一次，你可视为使用1张“闺识”牌中的非延时锦囊的同名牌。
				*/
			},
		},
	},
	North_hyy_lancai:{
		audio:'linglong',
		trigger:{player:'phaseZhunbeiBegin'},
		frequent:true,
		preHidden:true,
		filter:(event,player)=>{
			return player.getExpansions('North_hyy_guishi').length>0;
		},
		content:function(){
			"step 0"
			var num=player.getExpansions('North_hyy_guishi').length;
			var cards=get.cards(num);
			game.cardsGotoOrdering(cards);
			var next=player.chooseToMove();
			next.set('list',[
				['牌堆顶',cards],
				['牌堆底'],
			]);
			next.set('prompt','兰才·观星：点击将牌移动到牌堆顶或牌堆底');
			next.processAI=function(list){
				var cards=list[0][1],player=_status.event.player;
				var top=[];
				var judges=player.getCards('j');
				var stopped=false;
				if(!player.hasWuxie()){
					for(var i=0;i<judges.length;i++){
						var judge=get.judge(judges[i]);
						cards.sort(function(a,b){
							return judge(b)-judge(a);
						});
						if(judge(cards[0])<0){
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
						return get.value(b,player)-get.value(a,player);
					});
					while(cards.length){
						if(get.value(cards[0],player)<=5) break;
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
			threaten:1.2
		},
		group:'North_hyy_lancai_guanxu',
		subSkill:{
			guanxu:{
		enable:'phaseUse',
		usable:1,
		filter:function(event,player){
			return player.getExpansions('North_hyy_guishi').length>0&&game.hasPlayer((current)=>lib.skill.North_hyy_lancai_guanxu.filterTarget(null,player,current));
		},
		filterTarget:function(card,player,target){
			return target!=player&&target.countCards('h')>0;
		},
		content:function(){
			'step 0'
			var cards=player.getExpansions('North_hyy_guishi');
			// for(var i=cards.length-1;i>=0;i--){
			// 	ui.cardPile.insertBefore(cards[i],ui.cardPile.firstChild);
			// }
			game.updateRoundNumber();
			var hs=target.getCards('h');
			var dialog=['兰才·观虚：选择要操作的牌','<div class="text center">'+get.translation(target)+'的手牌</div>',hs,'<div class="text center">（闺识）</div>',cards];
			player.chooseButton(dialog,2).set('filterButton',function(button){
				if(ui.selected.buttons.length) return get.position(button.link)!=get.position(ui.selected.buttons[0].link);
				return true;
			}).set('cards1',hs).set('cards2',cards).set('ai',function(button){
				var card=button.link,cards1=_status.event.cards1.slice(0);
				var cards2=_status.event.cards2.slice(0),target=_status.event.getParent().target;
				if(!ui.selected.buttons.length){
					if(!cards1.includes(card)) return 0;
					cards1.remove(card);
					var suits=cards2.map(function(i){
						return get.suit(i,target);
					});
					for(var i of lib.suit){
						var num=cards1.filter(function(c){
							return get.suit(c,target)==i;
						}).length;
						if(num>2||(num>1&&suits.includes(i))) return 20+get.value(card);
					}
					return get.value(card);
				}
				cards1.remove(ui.selected.buttons[0].link);
				cards1.push(card);
				for(var i of lib.suit){
					if(cards1.filter(function(c){
						return get.suit(c,target)==i;
					}).length>2) return 20-get.value(card);
					return get.value(ui.selected.buttons[0].link)-get.value(card);
				}
			});
			'step 1'
			if(result.bool){
				var cards=result.links;
				if(get.position(cards[0])!='h') cards.reverse();
				// var next=target.lose(cards[0],ui.cardPile);
				player.addToExpansion(cards[0],player,'giveAuto').gaintag.add('North_hyy_guishi');
				// next.insert_index_card=cards[1];
				// next.insert_index=function(event){
				// 	return event.insert_index_card;
				// }
				target.gain(cards[1],'draw');
			}
			else event.finish();
			'step 2'
			game.updateRoundNumber();
			var suits=[],map={},hs=target.getCards('h');
			if(hs.length){
				for(var i of hs){
					if(!lib.filter.canBeDiscarded(i,player,target,'North_hyy_lancai_guanxu')) continue;
					var suit=get.suit(i,target);
					if(!map[suit]) map[suit]=1;
					else map[suit]++;
					if(map[suit]>2) suits.add(suit);
				}
				var next=player.discardPlayerCard(target,3,'visible','h');
				next.set('suits',suits);
				next.set('filterButton',function(button){
					var suit=get.suit(button.link);
					if(!ui.selected.buttons.length) return _status.event.suits.includes(suit);
					return suit==get.suit(ui.selected.buttons[0].link)
				});
				if(suits.length) next.set('forced',true);
			}
		},
		ai:{
			order:9,
			result:{
				target:function(player,target){
					if(target.countCards('h')>3) return -5;
					if(target.countCards('h')==3) return -3;
					return -0.5;
				},
			},
		},
			},
		}
	},
	North_hyy_bingxue:{
		audio:'rejizhi',
		trigger:{player:'useCard'},
		frequent:true,
		filter:function(event,player){
			return (get.type(event.card)=='trick'||get.type(event.card)=='delay')&&event.card.isCard;
		},
		'prompt2':'是否发动【冰雪·集智】，展示牌堆顶三张牌，并获得其中非基本牌（基本牌进入弃牌堆）',
		content:function(){
			'step 0'
			var cards=get.cards(3);
			game.cardsGotoOrdering(cards);
			player.showCards(cards,get.translation(player)+'发动了【冰雪·集智】');
			var list=[];
			for(var i=0;i<cards.length;i++){
				if(get.type(cards[i])!='basic')list.add(cards[i]);
			}
			player.gain(list,'gain2');
		},
		mark:true,
		intro:{
			content:function(event,player,storage){
				var discarded=get.discarded();
				var numb=0;
				for(var i=0;i<discarded.length;i++){
					if(get.type(discarded[i])=='basic')numb++;
				}
				var str='本回合手牌上限加';
				str+=numb;
				return str;
			}
		},
		group:['linglong_bagua','North_hyy_bingxue_jizhi','North_hyy_bingxue_yongjin'],
		mod:{
			targetEnabled:function(card,player,target){
				var cards=target.getExpansions('North_hyy_guishi');
				var suit=[];
				for(var i of cards){
					if(!suit.includes(get.suit(i)))suit.push(get.suit(i));
				}
				if(suit.length==4){
					if(get.type(card)=='delay') return false;
				}
			},
			targetInRange:function(card,player,target,now){
				var type=get.type(card);
				if(type=='trick'||type=='delay') return true;
			},
			maxHandcard:function(player,num){
				var discarded=get.discarded();
				var numb=0;
				for(var i=0;i<discarded.length;i++){
					if(get.type(discarded[i])=='basic')numb++;
				}
				return num+numb;
			}
		},
		subSkill:{
			jizhi:{
				name:'冰雪·减伤',
		trigger:{player:'damageBegin4'},
		filter:(event,player)=>{
			var cards=player.getExpansions('North_hyy_guishi');
			var suit=[];
			for(var i of cards){
				if(!suit.includes(get.suit(i)))suit.push(get.suit(i));
			}
			// return (cards.length>=4||suit.length>=4);
			if(suit.length==4){
				return true;
			}
		},
		direct:true,
		content:function(){
			player.logSkill('North_hyy_bingxue_jizhi');
			trigger.num--;
		},
		audio:'rejizhi',
			},
			yongjin:{
				audio:'rejizhi',
				name:'冰雪·勇进',
				trigger:{player:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					return player.getExpansions('North_hyy_guishi').length>4;
				},
				content:function(){
					'step 0'
					player.logSkill('North_hyy_bingxue_yongjin');
					'step 1'
					event.num=(player.getExpansions('North_hyy_guishi').length-4);
					event.count=event.num;
					'step 2'
					player.chooseCardButton(player.getExpansions('North_hyy_guishi'),true,event.num,'冰雪：请弃至四张').set('ai',function(button){
						return 100-get.useful(button.link);
					});
					'step 3'
					player.discard(result.links);
					'step 4'
					event.count--;
					player.moveCard();
					'step 5'
					if(event.count>0){
						event.goto(4);
					}
				}
			},
		}
	},
	//--------------神二曹
	// game.me.gain(game.createCard('zhangba','none',null,'fire'),'gain2');
	
	North_cxch_lingxi:{
		audio:'huamu',
		trigger:{player:'useCard'},
		// hasHand:function(event){
		// 	var evts=event.player.getHistory('lose',function(evt){
		// 		return evt.getParent()==event;
		// 	});
		// 	return evts&&evts.length==1;
		// },
		filter:function(event,player){
			var suit=get.suit(event.card);
			return player.getHistory('useCard',function(evt){
				return get.suit(evt.card)==suit;
			}).length<=1;
			// if(!player.hasHistory('lose',function(evt){
			// 	return evt.hs.length>0&&evt.getParent()==event;
			// })) return false;
			// var suit=get.suit(event.card);
			// if(!lib.skill.North_cxch_lingxi.hasHand(event)) return false;
			// return player.getHistory('useCard',function(evt){
			// 	return evt!=event&&get.suit(evt.card)==suit&&lib.skill.North_cxch_lingxi.hasHand(evt);
			// }).length==0;
		},
		ai:{
			result:{
				player:1,
			}
		},
		// check:true,
		// content:function*(event,map){
		// 	let player=map.player,trigger=map.trigger;
		// 	yield player.draw();
		// 	var card1=get.bottomCards()[0];
		// 	game.cardsGotoOrdering(card1);
		// 	player.addToExpansion(card1,'gain2').gaintag.add('North_cxch_lingxi_yuping');
		// 	if(get.color(card1)==get.color(trigger.card)){
		// 		var card2=get.cards()[0];
		// 		game.cardsGotoOrdering(card2);
		// 		player.addToExpansion(card2,'gain2').gaintag.add('North_cxch_lingxi_tingniao');
		// 	}
		// },
		content:function(){
			'step 0'
			player.draw();
			'step 1'
			var card1=get.bottomCards()[0];
			game.cardsGotoOrdering(card1);
			player.addToExpansion(card1,'gain2').gaintag.add('North_cxch_lingxi_yuping');
			game.log(player,'将',card1,'置入了“玉娉”')
			event.card1=card1;
			'step 2'
			if(get.color(event.card1)==get.color(trigger.card)){
				var card2=get.cards()[0];
				game.cardsGotoOrdering(card2);
				player.addToExpansion(card2,'gain2').gaintag.add('North_cxch_lingxi_tingniao');
				game.log(player,'将',card2,'置入了“婷袅”')
			}
		},
		subSkill:{
			yuping:{
				mark:true,
				marktext:'娉',
				intro:{
					name:'玉娉',
					markcount:'expansion',
					mark:function(dialog,storage,player){
						if(player.getExpansions('North_cxch_lingxi_yuping').length)dialog.add(player.getExpansions('North_cxch_lingxi_yuping'));
						else{dialog.add('暂无玉娉')}
					},
				}
			},
			tingniao:{
				mark:true,
				marktext:'婷',
				intro:{
					name:'婷袅',
					markcount:'expansion',
					mark:function(dialog,storage,player){
						if(player.getExpansions('North_cxch_lingxi_tingniao').length)dialog.add(player.getExpansions('North_cxch_lingxi_tingniao'));
						else{dialog.add('暂无婷袅')}
					},
				}
			},
		}
	},
	North_cxch_gongsheng:{
		audio:'qianmeng',
		forced:true,
		trigger:{
			global:['loseAfter','equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
		},
		filter:function(event,player){
			if(event.name=='addToExpansion'){
				if(event.gaintag.includes('North_cxch_lingxi_yuping')){
					var cards2=event.player.getExpansions('North_cxch_lingxi_yuping').filter((item)=>{for(var k of event.cards){return item!=k}});
					var cards=event.player.getExpansions('North_cxch_lingxi_yuping');
					var cards3=event.player.getExpansions('North_cxch_lingxi_yuping').concat(event.cards);
					if(!cards.length||get.YB_suit(cards3,'type2').length!=get.YB_suit(cards,'type2').length||!cards2.length||get.YB_suit(cards2,'type2').length!=get.YB_suit(cards,'type2').length) {
						game.log(event.player,'的“玉娉”类型数改变了');
						return true;
					}
				}
				else if(event.gaintag.includes('North_cxch_lingxi_tingniao')){
					var cards2=event.player.getExpansions('North_cxch_lingxi_tingniao').filter((item)=>{for(var k of event.cards){return item!=k}});
					var cards=event.player.getExpansions('North_cxch_lingxi_tingniao');
					var cards3=event.player.getExpansions('North_cxch_lingxi_tingniao').concat(event.cards);
					if(!cards.length||get.YB_suit(cards3).length!=get.YB_suit(cards).length||!cards2.length||get.YB_suit(cards2).length!=get.YB_suit(cards).length) {
						game.log(event.player,'的“婷袅”花色数改变了');
						return true;
					}
				}
			}
			if(event.name=='lose'&&event.getlx!==false){
				for(var i in event.gaintag_map){
					if(event.gaintag_map[i].includes('North_cxch_lingxi_yuping')){
						var cards2=event.player.getExpansions('North_cxch_lingxi_yuping').filter((item)=>{for(var k of event.cards){return item!=k}});
						var cards=event.player.getExpansions('North_cxch_lingxi_yuping');
						var cards3=event.player.getExpansions('North_cxch_lingxi_yuping').concat(event.cards);
						if(!cards.length||get.YB_suit(cards3,'type2').length!=get.YB_suit(cards,'type2').length||!cards2.length||get.YB_suit(cards2,'type2').length!=get.YB_suit(cards,'type2').length) {
							game.log(event.player,'的“玉娉”类型数改变了');
							return true;
						}
					}
					else if(event.gaintag_map[i].includes('North_cxch_lingxi_tingniao')){
						var cards2=event.player.getExpansions('North_cxch_lingxi_tingniao').filter((item)=>{for(var k of event.cards){return item!=k}});
						var cards=event.player.getExpansions('North_cxch_lingxi_tingniao');
						var cards3=event.player.getExpansions('North_cxch_lingxi_tingniao').concat(event.cards);
						if(!cards.length||get.YB_suit(cards3).length!=get.YB_suit(cards).length||!cards2.length||get.YB_suit(cards2).length!=get.YB_suit(cards).length) {
							game.log(event.player,'的“婷袅”花色数改变了');
							return true;
						}
					}
				}
				return false;
			}
			return game.getGlobalHistory('cardMove',function(evt){
				if(evt.name!='lose'||event!=evt.getParent()) return false;
				for(var i in evt.gaintag_map){
					if(evt.gaintag_map[i].includes('North_cxch_lingxi_yuping')){
						var cards2=event.player.getExpansions('North_cxch_lingxi_yuping').filter((item)=>{for(var k of event.cards){return item!=k}});
						var cards=event.player.getExpansions('North_cxch_lingxi_yuping');
						var cards3=event.player.getExpansions('North_cxch_lingxi_yuping').concat(event.cards);
						if(!cards.length||get.YB_suit(cards3,'type2').length!=get.YB_suit(cards,'type2').length||!cards2.length||get.YB_suit(cards2,'type2').length!=get.YB_suit(cards,'type2').length) {
							game.log(event.player,'的“玉娉”类型数改变了');
							return true;
						}
					}
					else if(evt.gaintag_map[i].includes('North_cxch_lingxi_tingniao')){
						var cards2=event.player.getExpansions('North_cxch_lingxi_tingniao').filter((item)=>{for(var k of event.cards){return item!=k}});
						var cards=event.player.getExpansions('North_cxch_lingxi_tingniao');
						var cards3=event.player.getExpansions('North_cxch_lingxi_tingniao').concat(event.cards);
						if(!cards.length||get.YB_suit(cards3).length!=get.YB_suit(cards).length||!cards2.length||get.YB_suit(cards2).length!=get.YB_suit(cards).length) {
							game.log(event.player,'的“婷袅”花色数改变了');
							return true;
						}
					}
				}
				return false;
			}).length>0;
		},
		content:function(){player.draw();},
		group:['North_cxch_gongsheng_give'],
		subSkill:{
			give:{
				audio:'qianmeng',
				forced:true,
				// trigger:{
				// 	global:['loseAfter','equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				// },
				trigger:{
					player:['addToExpansionAfter'],
				},
				filter:function(event,player){
					var cards=player.getExpansions('North_cxch_lingxi_yuping');
					return get.YB_suit(cards,'type2')&&get.YB_suit(cards,'type2').length>=3;
				},
				content:function*(event,map){
					let player=map.player,trigger=map.trigger;
					var cards=event.player.getExpansions('North_cxch_lingxi_yuping');
					var result=yield player.chooseTarget(1,true).set('prompt','将所有的“玉娉”交给1名角色').set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					yield result.targets[0].gain(cards,'gain2');
					game.log(player,'将',cards,'交给了',result.targets[0])
				}
			}
		},
		"_priority":114514,
	},
	North_cxch_lianyu:{
		audio:'liangyuan',
		trigger:{
			global:['useCard','damageBegin4'],
		},
		filter:function(event,player,name){
			var cards=player.getExpansions('North_cxch_lingxi_tingniao');
			if(name=='damageBegin4'){
				if(event.player==player||!event.player.countCards('h')){
					return get.YB_suit(cards).length>=3;
				}
			}
			else{
				if(event.targets.length==1){
					if(event.targets[0]==player||!event.targets[0].countCards('h')){
						if(event.card&&get.type(event.card)!='equip'){
							return get.YB_suit(cards).length>=3;
						}
					}
				}
			}
			return false;
		},
		direct:true,
		content:function*(event,map){
			let player=map.player,trigger=map.trigger;
			var cards=event.player.getExpansions('North_cxch_lingxi_tingniao');
			var str='选择弃置三张花色各不相同的“婷袅”，令此';
			if(event.triggername!='useCard'){
				str+='伤害';
			}
			else{
				str+='牌';
			}
			str+='无效';
			var result=yield player.chooseCardButton(str,3,cards).set('filterButton',function(button){
				var suit=get.suit(button.link);
				for(var i=0;i<ui.selected.buttons.length;i++){
					if(get.suit(ui.selected.buttons[i].link)==suit){
						return false;
					}
				}
				return true;
			}).set('ai',function(){
				if(event.triggername+='useCardToPlayer'){
					return -get.effect(trigger.targets[0],trigger.card,trigger.targets[0],_status.event.player);
				}
				else{
					var att=get.attitude(_status.event.player,trigger.player);
					var eff=get.damageEffect(trigger.source,trigger.player);
					return att>0&&eff<0;
				}
			});
			if(result.links){
				yield player.discard(result.links);
				if(event.triggername!='useCard'){
					yield trigger.cancel();
				}
				else{
					// yield trigger.getParent().excluded.add(trigger.targets[0]);
					yield trigger.targets.remove(trigger.targets[0]);
				}
			}
		},
	},
	North_cxch_xixuan:{
		audio:'jisi',
		enable:'chooseToUse',
		filter:function (event,player){
			var evt=lib.filter.filterCard;
			var cards=event.player.getExpansions('North_cxch_lingxi_yuping');
			var cards2=event.player.getExpansions('North_cxch_lingxi_tingniao');
			if(event.filterCard) evt=event.filterCard;
			for(var i of lib.inpile){
				var type=get.type(i);
				if((type=='trick'&&evt({name:i},player,event)&&cards.length)||(type=='basic'&&evt({name:i},player,event)&&cards2.length)) return true;
			};
			return false;
		},
		hiddenCard:function (player,name){
			var cards=player.getExpansions('North_cxch_lingxi_yuping');
			var cards2=player.getExpansions('North_cxch_lingxi_tingniao');
			var type=get.type(name);
			return (type=='trick'&&cards.length)||(type=='basic'&&cards2.length);
		},
		chooseButton:{
			dialog:function (event,player){
				var list=[];
				var player=_status.event.player||player;
				var cards=player.getExpansions('North_cxch_lingxi_yuping');
				var cards2=player.getExpansions('North_cxch_lingxi_tingniao');
				for(var i=0;i<lib.inpile.length;i++){
					if(get.type(lib.inpile[i])=='trick'&&cards.length) list.push(['锦囊','',lib.inpile[i]]);
					else if(get.type(lib.inpile[i])=='basic'&&cards2.length) {
						if(lib.inpile[i]=='sha'){
							for(var kkk of lib.inpile_nature){
								switch(kkk){
									case 'fire':list.push(['基本','','sha','fire']);break;
									case 'thunder':list.add(['基本','','sha','thunder']);break;
									case 'kami':list.add(['基本','','sha','kami']);break;
									case 'ice':list.add(['基本','','sha','ice']);break;
									case 'stab':list.add(['基本','','sha','stab']);break;
									default:list.add(['基本','','sha',kkk]);break;
								}
							}
						}
						else list.push(['基本','',lib.inpile[i]]);
					}
				}
				return ui.create.dialog('系璇',[list,'vcard']);
			},
			filter:function (button,player){
				return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
			},
			// check:function (button){
			// 	if(_status.event.getParent().type!='phase') return 1;
			// 	var player=_status.event.player;
			// 	if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan_gai','lianjunshengyan','diaohulishan'].includes(button.link[2])) return 0;
			// 	return player.getUseValue({
			// 		name:button.link[2],
			// 		nature:button.link[3],
			// 	});
			// },
			backup:function (links,player){
				return {
					filterCard:function(){return false},
					selectCard:-1,
					audio:'jisi',
					popname:true,
					viewAs:{name:links[0][2],nature:links[0][3]},
					precontent:function(){
						var name=event.result.card.name;
						var cards=player.getExpansions('North_cxch_lingxi_yuping');
						var cards2=player.getExpansions('North_cxch_lingxi_tingniao');
						if(get.type2(name)=='trick'){
							player.lose(cards);
							player.addToExpansion(cards).gaintag.add('North_cxch_lingxi_tingniao');
							game.log(player,'将“玉娉”',cards,'置入了“婷袅”')
						}
						else{
							player.discard(cards2);
							game.log(player,'弃置了',cards2,'。')
						}
					},
				};
			},
			prompt:function (links,player){
				return '你可将“玉娉”全部置入“婷袅”，视为使用1张非延时锦囊牌；你可弃置所有的“婷袅”，视为使用1张基本牌。';
			},
		},
		ai:{
			order:10,
		},
	},

	//-------------神孙寒华
	
	North_shh_yuniao:{
		audio:'chongxu',
		init:function(player,skill){
			player.storage[skill]=true;
		},
		zhuanhuanji:true,
		mark:true,
		marktext:'☯',
		intro:{
			content:function(storage,player,skill){
				var str='';
				if(player.storage.North_shh_yuniao==true) str+='转换技。回合结束时，<span class=thundertext>阳：你可获得1名角色1张牌，然后对该角色造成1点火属性伤害</span>；阴：你可交给1名角色1张牌，然后对该角色造成1点伤害。';
				else str+='转换技。回合结束时，阳：你可获得1名角色1张牌，然后对该角色造成1点火属性伤害；<span class=thundertext>阴：你可交给1名角色1张牌，然后对该角色造成1点伤害</span>。';
				return str;
			},
		},
		trigger:{player:'phaseEnd'},
		direct:true,
		content:function(){
			'step 0'
			if(player.storage.North_shh_yuniao==true){
				var fil=function(card,player,target){return target.countCards('he')>0;}
				var str='你可获得1名角色1张牌，然后对该角色造成1点火属性伤害';
				var nat='fire'
			}
			else {
				var fil=function(card,player,target){return player.countCards('he')>0;}
				var str='你可交给1名角色1张牌，然后对该角色造成1点伤害';
				var nat=null
			}
			player.chooseTarget(1,fil).set('prompt',str).set('ai',function(target){
				var att=get.attitude(_status.event.player,target);
				var eff=get.damageEffect(target,_status.event.player,nat);
				return att<0&&eff>=0;
			});
			'step 1'
			if(result.bool){
				if(player.storage.North_shh_yuniao==true)event.list=[player,result.targets[0],'fire',result.targets[0],'fire'];
				else event.list=[result.targets[0],player,'thunder',result.targets[0],null];
				player.line(event.list[3],event.list[2]);
				player.choosePlayerCard(event.list[1],'he');
			}
			else event.finish();
			'step 2'
			if(result.cards){
				player.logSkill('North_shh_yuniao')
				player.changeZhuanhuanji('North_shh_yuniao');
				event.cards=result.cards;
			}
			else event.finish();
			'step 3'
			event.list[1].give(event.cards,event.list[0]);
			'step 4'
			event.list[3].damage(event.list[4]);
		},
	},
	North_shh_qingsi:{
		audio:'miaojian',
		trigger:{player:['useCard','respond']},
		filter:function(event,player){
			return get.color(event.card)=='red';
		},
		direct:true,
		content:function(){
			'step 0'
			player.chooseCardTarget({
				position:'he',
				filterCard:lib.filter.cardDiscardable,
				filterTarget:function(card,player,target){
					// var trigger=_status.event;
					if(player.inRange(target)){
						if(lib.filter.targetEnabled({name:'sha',nature:'thunder'},player,target)) return true;
					}
					return false;
				},
				ai1:function(card){
					return get.unuseful(card)+9;
				},
				ai2:function(target){
					if(get.attitude(_status.event.player,target)<5){
						return 6-get.attitude(_status.event.player,target);
					}
					return -1;
				},
				prompt:get.prompt('North_shh_qingsi'),
				prompt2:'弃置一张牌，视为对一名其他角色使用一张【雷杀】',
			});
			'step 1'
			if(result.bool){
				player.logSkill('North_shh_qingsi');
				player.discard(result.cards);
				player.useCard({name:'sha',nature:'thunder',isCard:false},result.targets[0],'North_shh_qingsi',false);
			}
		}
	},
	North_shh_xianyin:{
		audio:'shhlianhua',
		forced:true,
		direct:true,
		trigger:{source:'damageBegin2'},
		content:function(){
			'step 0'
			// var all=player.getAllHistory('damage');
			var all=player.getAllHistory('sourceDamage');
			if(!all.length)event.finish();
			else {
				var dam=all[all.length-1];
				if(dam.nature!=trigger.nature){
					player.logSkill('North_shh_xianyin');
					trigger.num++;
					event.finish();
				}
				else if(dam.card&&!trigger.card||!dam.card&&trigger.card){
					player.logSkill('North_shh_xianyin');
					trigger.num++;
					event.finish();
				}
			}
			'step 1'
			player.logSkill('North_shh_xianyin');
			player.draw();
			player.useSkill('North_shh_yuniao');
		},
		mark:true,
		marktext:'僊',
		intro:{
			name2:'僊',
			mark:function(dialog,storage,player){
				var str='';
				var all=player.getAllHistory('sourceDamage');
				if(!all.length)str+='无';
				else {
					var dam=all[all.length-1];
					str+='上次伤害的属性：';
					str+=get.translation(dam.nature)||'无';
					str+='<br>上次伤害的类型：';
					str+=dam.card?'卡牌':'非卡牌';
				}
				dialog.addText(str);
			},
		},
		group:['North_shh_xianyin_end'/*,'North_shh_xianyin_damage'*/],
		subSkill:{
			//------------------这段别加！我都没写好，bug连连------------------//
			//----------------要是付费20的话，我可以努力钻研一下---------------//
			// damage:{
			// 	firstDo:true,
			// 	charlotte:true,
			// 	direct:true,
			// 	trigger:{
			// 		player:['damageEnd'],
			// 	},
			// 	forced:true,
			// 	popup:false,
			// 	// lastDo:true,//全是孙寒华技能的标签，也不知道都啥用，都搬过来了
			// 	forceDie:true,
			// 	forceOut:true,
			// 	filter:function(event,player){
			// 		if(event.num<=0||!event.num) return false;
			// 		return true;
			// 	},
			// 	markColor:[
			// 		['rgba(243, 148, 40, 0.75)', 'black'],
			// 		['',''],
			// 		['rgba(70, 40, 243, 0.75)', 'rgb(200, 200, 200)']
			// 	],
			// 	content:function(){
			// 		'step 0'
			// 		// var all=player.getAllHistory('damage');
			// 		// if(!all.length)return;
			// 		// else {
			// 		// 	var dam=all[all.length-1];
			// 		// 	if(dam.card&&!this.trigger.card||!dam.card&&this.trigger.card||dam.nature!=this.trigger.nature){
			// 		// 		player.logSkill('North_shh_xianyin');
			// 		// 		this.trigger.num++;
			// 		// 		event.finish();
			// 		// 	}
			// 		// }
			// 		var tar=get.translation(trigger.nature);
			// 		var txt=trigger.card?0:2;
			// 		game.broadcastAll(function(ind){
			// 			var bgColor=lib.skill.North_shh_xianyin_damage.markColor[ind][0],text='<span style="color: '+lib.skill.North_shh_xianyin_damage.markColor[ind][1]+'">'+tar+'</span>';
			// 			for(var player of game.players){
			// 				if(player.marks.North_shh_xianyin){
			// 					player.marks.North_shh_xianyin.firstChild.style.backgroundColor=bgColor;
			// 					player.marks.North_shh_xianyin.firstChild.innerHTML=text;
			// 				}
			// 			}
			// 		},txt/*此处定义ind？ */);
			// 	},
			// },
			//------------------这段别加！我都没写好，bug连连------------------//
			//----------------要是付费20的话，我可以努力钻研一下---------------//
			end:{
				forced:true,
				trigger:{
					global:'phaseAfter',
				},
				filter:function(event,player){
					var num=0;
					player.getHistory('gain',function(evt){
						if(evt.getParent(2).name!='phaseDraw')num+=evt.cards.length;
						return 
					});
					return num&&num>0;
				},
				content:function(){
					var num=0;
					player.getHistory('gain',function(evt){
						if(evt.getParent(2).name!='phaseDraw')num+=evt.cards.length;
					});
					player.draw(num);
				}
			}
		}
	},
	//郭照
	North_gz_gongshu:{
		audio:'zunwei',
		forced:true,
		trigger:{
			global:'loseAfter',
		},
		filter:(event,player)=>{
			return event.type=='discard'&&event.cards.length;;
		},
		direct:true,
		content:function(){
			if(trigger==player){
				var leng1 = 0;
				for(var i of trigger.cards){
					leng1+=get.cardNameLength(i,player);
				}
				player.storage.North_gz_gongshu_del=leng1;
			}
			if(trigger.cards.length>1){
				player.logSkill('North_gz_gongshu');
				player.draw(trigger.cards.length-1);
			}
			
			
		},
		// mod: {
			// cardUsable(card, player) {
				// const cardSuit = get.suit(card, false);
				// const list = player.getHistory("lose", function (evt) {
					// return evt.type == "discard";
				// });
				// for (let i = 0; i < list.length; i++) {
					// if (cardSuit === "unsure" || get.suit(list[i], false) === cardSuit) return Infinity;
				// }
			// },
		// },
		group:['North_gz_gongshu_draw','North_gz_gongshu_del'],
		subSkill:{
			draw:{
				audio:'zunwei',
				forced:true,
				trigger:{
					player:'loseEnd',
				},
				// direct:true,
				filter:(event,player)=>{
					if(event.type!='discard') return false;
					var list = player.getHistory("lose", function (evt) {
						return evt.type == "discard";
					});
					if(list.length<=1) return false;
					var last = list[list.length-2];
					var leng1 = 0, leng2 = 0;
					for(var i of event.cards){
						leng1+=get.cardNameLength(i,player);
					}
					for(var k of last.cards){
						leng2+=get.cardNameLength(k,player);
					}
					// player.storage.North_gz_gongshu_del=leng1;
					return leng1 == leng2;
				},
				content:function*(event,map){
					let trigger=map.trigger,player=map.player;
					yield player.draw(2);
					yield delete player.getStat('skill')['North_gz_shujian'];
					// yield player.removeSkill('North_gz_shujian_used');
				}
			},
			del:{
				mark:true,
				marktext:'数',
				intro:{
					content:function(storage,player,skill){
						return '本回合上次弃牌的牌名字数和为'+player.storage.North_gz_gongshu_del;
					},
				},
				direct:true,
				charlotte:true,
				trigger:{
					player:'phaseAfter',
				},
				content:function(){
					player.storage.North_gz_gongshu_del=0;
				},
				init:function(player){
					player.markSkill('North_gz_gongshu_del');
					player.storage.North_gz_gongshu_del=0;
				}
			}
		}
	},
	North_gz_shujian:{
		audio:'pianchong',
		enable:'phaseUse',
		usable:3,
		selectCard:function(){
			var player=_status.event.player;
			var num = player.getStat('skill')['North_gz_shujian']?player.getStat('skill')['North_gz_shujian']+1:1;
			return [num,Infinity];
		},
		filterCard:function(card,player){
			var num = 0;
			if(ui.selected.cards){
				for(var i of ui.selected.cards){
					num+=get.cardNameLength(i,player);
				}
			}
			player.prompt('<p font-size:15px;>字数和：'+num+'<p>');
			// ui.dialog.content.firstChild.innerHTML = get.translation('North_gz_shujian_info')+'<br>当前牌名字数和为'+num;
			return true;
		},
		check:function(card){
			// var num = player.countMark("North_gz_shujian_used") + 1;
			var num = player.getStat('skill')['North_gz_shujian'];
			if(ui.selected.cards.length>=num)return false;
			else if(ui.selected.cards.length>=1)return 8-get.value(card);
			return player.hasUseTarget(card)&&player.getUseValue(card);
		},
		complexCard:true,
		// discard:false,
		// prompt:function(event,player){
			// var num = 0;
			// if(ui.selected.cards){
				// for(var i of ui.selected.cards){
					// num+=get.cardNameLength(i,player);
					// // num+=get.name(i);
				// }
			// }
			// return get.translation('North_gz_shujian_info')+'<br>当前牌名字数和为'+num;
		// },
		discard:true,
		content:function(){
			'step 0'
			// player.YB_temp('North_gz_shujian_used');
			cards.filter(i=>get.position(i,true)=='d');
			'step 1'
			// player.discard(cards);
			'step 2'
			player.chooseCardButton(cards,1,'是否使用其中一张').set('filterButton',function(button){
				return player.hasUseTarget(button.link);
			}).set('ai',function(button){
				return get.getUseValue(button.link);
			});
			'step 3'
			if(result.bool)event.card=result.links[0];
			// player.YB_temp('North_gz_shujian_used');
			'step 4'
			if(event.card&&player.hasUseTarget(event.card)){
				player.chooseUseTarget(event.card,'使用一张'+get.translation(event.card),true,false);
			}
		},
		subSkill:{
			used:{
				onremove:true,
				character:true,
			}
		}
	},
	
	//赵襄
	North_zx_huashuang:{
		audio:'fanghun',
		forced:true,
		trigger:{
			source:'damageBegin2',
		},
		filter(event,player){
			return player.getHistory('sourceDamage',function(evt){
				return evt!=event;
			}).length+1==player.hp&&player.hp!=event.player.hp;
		},
		content(){
			trigger.num+=(Math.abs(player.hp-trigger.player.hp));
		},
		group:'North_zx_huashuang_max',
		subSkill:{
			max:{
				audio:'fanghun',
				forced:true,
				trigger:{
					source:'damageSource',
				},
				filter(event,player){
					return event.num>=4&&!player.storage.North_zx_huashuang_max;
				},
				content:()=>{player.storage.North_zx_huashuang_max=true;player.gainMaxHp();},
				skillAnimation:true,
				limited:true,
				animationColor:'orange',
			},
		},
	},
	North_zx_ningao:{
		audio:'fuhan',
		forced:true,
		trigger:{player:'changeHp'},
		filter:function(e,p){
			return true;
		},
		content:function(){
			player.draw();
		},
		group:['North_zx_ningao_use','North_zx_ningao_bit','North_zx_ningao_long','North_zx_ningao_jue'],
		subSkill:{
			use:{
				locked:true,
				enable:['chooseToUse','chooseToRespond'],
		//发动时提示的技能描述
		prompt:function(event,player){
			var player=_status.event.player;
			if(player.maxHp-player.hp>=3)return '将♦牌当做火杀，♥牌当做桃。';
			else return '将♦牌当做火杀。';
		},
		//动态的viewAs
		viewAs:function(cards,player){
			var name=false;
			var nature=null;
			var suit=get.suit(cards[0],player);
			//根据选择的卡牌的花色 判断要转化出的卡牌是闪还是火杀还是无懈还是桃
			switch(suit){
				// case 'club':name='shan';break;
				case 'diamond':name='sha';nature='fire';break;
				// case 'spade':name='wuxie';break;
				case 'heart':name='tao';break;
			}
			//返回判断结果
			if(name) return {name:name,suit:suit,nature:nature};
			return null;
		},
		//-------------代价
		// precontent:function(){
		// 	player.removeMark('yb070_meiying');
		// 	player.logSkill('yb070_meiying');
		// },
		//AI选牌思路
		check:function(card){
			if(ui.selected.cards.length) return 0;
			var player=_status.event.player;
			if(_status.event.type=='phase'){
				var max=0;
				var name2;
				var list=['sha','tao'];
				var map={sha:'diamond',tao:'heart'}
				for(var i=0;i<list.length;i++){
					var name=list[i];
					if(player.countCards('hes',function(card){
						return (name!='sha'||get.value(card)<5)&&get.suit(card,player)==map[name];
					})>0&&player.getUseValue({name:name,nature:name=='sha'?'fire':null})>0){
						var temp=get.order({name:name,nature:name=='sha'?'fire':null});
						if(temp>max){
							max=temp;
							name2=map[name];
						}
					}
				}
				if(name2==get.suit(card,player)) return (name2=='diamond'?(5-get.value(card)):20-get.value(card));
				return 0;
			}
			return 1;
		},
		//选牌数量
		// selectCard:[1,2],
		selectCard:1,
		//确保选择第一张牌后 重新检测第二张牌的合法性 避免选择两张花色不同的牌
		complexCard:true,
		//选牌范围：手牌区和装备区和木马
		position:'hes',
		//选牌合法性判断
		filterCard:function(card,player,event){
			//如果已经选了一张牌 那么第二张牌和第一张花色相同即可
			// if(ui.selected.cards.length) return get.suit(card,player)==get.suit(ui.selected.cards[0],player);
			event=event||_status.event;
			//获取当前时机的卡牌选择限制
			var filter=event._backup.filterCard;
			//获取卡牌花色
			var name=get.suit(card,player);
			//如果这张牌是梅花并且当前时机能够使用/打出闪 那么这张牌可以选择
			// if(name=='club'&&filter({name:'shan',cards:[card]},player,event)) return true;
			//如果这张牌是方片并且当前时机能够使用/打出雷杀 那么这张牌可以选择
			if(name=='diamond'&&filter({name:'sha',cards:[card],nature:'fire'},player,event)) return true;
			//如果这张牌是黑桃并且当前时机能够使用/打出无懈 那么这张牌可以选择
			// if(name=='spade'&&filter({name:'wuxie',cards:[card]},player,event)) return true;
			//如果这张牌是红桃并且当前时机能够使用/打出桃 那么这张牌可以选择
			if(name=='heart'&&filter({name:'tao',cards:[card]},player,event)&&player.maxHp-player.hp>=3) return true;
			//上述条件都不满足 那么就不能选择这张牌
			return false;
		},
		//判断当前时机能否发动技能
		filter:function(event,player){
			// if(player.countMark('yb070_meiying')<1) return false;
			//获取当前时机的卡牌选择限制
			var filter=event.filterCard;
			//如果当前时机能够使用/打出火杀并且角色有方片 那么可以发动技能
			if(filter({name:'sha',nature:'fire'},player,event)&&player.countCards('hes',{suit:'diamond'})) return true;
			//如果当前时机能够使用/打出闪并且角色有梅花 那么可以发动技能
			// if(filter({name:'shan'},player,event)&&player.countCards('hes',{suit:'club'})) return true;
			//如果当前时机能够使用/打出桃并且角色有红桃 那么可以发动技能
			if(player.maxHp-player.hp>=3&&filter({name:'tao'},player,event)&&player.countCards('hes',{suit:'heart'})) return true;
			//如果当前时机能够使用/打出无懈可击并且角色有黑桃 那么可以发动技能
			// if(filter({name:'wuxie'},player,event)&&player.countCards('hes',{suit:'spade'})) return true;
			return false;
		},
		ai:{
			respondSha:true,
			respondShan:true,
			//让系统知道角色“有杀”“有闪”
			skillTagFilter:function(player,tag){
				var name;
				switch(tag){
					case 'respondSha':name='diamond';break;
					case 'save':name='heart';break;
				}
				if(player.maxHp-player.hp<3&&!player.countCards('hes',{suit:'diamond'}))return false;
				if(!player.countCards('hes',{suit:name})) return false;
			},
			//AI牌序
			order:function(item,player){
				if(player&&_status.event.type=='phase'){
					var max=0;
					var list=['sha','tao'];
					var map={sha:'diamond',tao:'heart'}
					for(var i=0;i<list.length;i++){
						var name=list[i];
						if(player.countCards('hes',function(card){
							return (name!='sha'||get.value(card)<5)&&get.suit(card,player)==map[name];
						})>0&&player.getUseValue({name:name,nature:name=='sha'?'fire':null})>0){
							var temp=get.order({name:name,nature:name=='sha'?'fire':null});
							if(temp>max) max=temp;
						}
					}
					max/=1.1;
					return max;
				}
				return 2;
			},
		},
		//让系统知道玩家“有无懈”“有桃”
		hiddenCard:function(player,name){
			if(name=='tao') return player.countCards('hes',{suit:'heart'})>0&&player.maxHp-player.hp>=3;
		},
			},
			bit:{
				forced: true,
				trigger: {
					player: "useCard",
				},
				filter: function (event, player) {
					return player.maxHp-player.hp>=1;
				},
				content: function () {
					trigger.directHit.addArray(trigger.targets);
				},
			},
			long:{
				locked:true,
				trigger:{player:['loseAfter','cardsDiscardAfter','loseAsyncAfter'],},
				filter:function(event,player){
					if(player==_status.currentPhase) return false;
					return player.maxHp-player.hp>=2;
				},
				forced:true,
				content: function () {
					"step 0";
					var next = player.chooseToUse(get.prompt("North_zx_ningao_long"), { name: "sha" });
					next.aidelay = true;
					next.logSkill = "North_zx_ningao_long";
					next.noButton = true;
					"step 1";
					if (result.bool) {
						game.delay();
					}
				},
			},
			jue:{
				locked:true,
				trigger: {
					player:['loseAfter','changeHp','gainMaxHpAfter','loseMaxHpAfter'],
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				forced: true,
				filter(event, player) {
					if(player.maxHp-player.hp<4)return false;
					// if (event.name == "gain" && event.player == player) return player.countCards("h") > 8;
					// var evt = event.getl(player);
					// if (!evt || !evt.hs || evt.hs.length == 0 || player.countCards("h") >= 8) return false;
					if (player.countCards('h')==8)return false;
					var evt = event;
					for (var i = 0; i < 8; i++) {
						evt = evt.getParent("North_zx_ningao_jue");
						if (evt.name != "North_zx_ningao_jue") return true;
					}
					return false;
				},
				content() {
					var num = 8 - player.countCards("h");
					if (num > 0) player.draw(num);
					else player.chooseToDiscard("h", true, -num);
				},
			},
		},
	},
	//刘封
	North_lf_zhenzhi:{
		audio:'xiansi',
		trigger:{
			player:['phaseZhunbeiBegin','phaseJieshuBegin'],
		},
		direct:true,
		filter:function(){return true},
		init:function(player){
			player.storage.North_lf_zhenzhi=[];
		},
		group:'North_lf_zhenzhi_buff',
		content:function*(event,map){
			let trigger=map.trigger,player=map.player;
			if(!player.storage.North_lf_zhenzhi)yield player.storage.North_lf_zhenzhi=[];
			// var num = player.storage.North_lf_zhenzhi.length||0;
			if(event.triggername=='phaseZhunbeiBegin'){
				var result = yield player.chooseTarget([0,6]).set('filterTarget',function(card,player,target){
					return target.countCards('he')>0;
				}).set('ai',function(target){
					var player=_status.event.player;
					if(ui.selected.targets.length<4){
						return -get.attitude(player,target);
					}
					return false;
				});
				if(result.bool){
					player.logSkill('North_lf_zhenzhi');
					let targets=result.targets;
					for(var i of targets){
						yield player.storage.North_lf_zhenzhi.push(i);
						yield player.gainPlayerCard('he',i,true);
					}
					for(var k of targets){
						yield k.chooseToDiscard(2,true,'he');
					}
					var num = player.storage.North_lf_zhenzhi.length||0;
					yield player.draw((6-num||6));
				}
				
			}
			else{
				var num = player.storage.North_lf_zhenzhi.length||0;
				var result = yield player.chooseTarget([0,6-num]).set('filterTarget',function(card,player,target){
					// return target.countCards('he')>0;
					return true;
				}).set('ai',function(target){
					var player=_status.event.player;
					if(ui.selected.targets.length<4){
						return -get.attitude(player,target);
					}
					return false;
				});
				if(result.bool){
					player.logSkill('North_lf_zhenzhi');
					let targets=result.targets;
					for(var i of targets){
						yield player.storage.North_lf_zhenzhi.push(i);
						yield player.discardPlayerCard('he',i,true);
					}
					for(var k of targets){
						yield k.loseHp(2);
					}
					yield player.draw(num);
				}
				
			}
		},
		subSkill:{
			buff:{
				audio:'xiansi',
				charlotte:true,
				direct:true,
				trigger:{
					player:'phaseBefore',
					global:['recoverAfter','dying'],
				},
				filter:(e,p,n)=>{
					if(n=='phaseBefore')return true;
					return p.storage.North_lf_zhenzhi.includes(e.player);
				},
				content(){
					if(event.triggername=='phaseBefore')player.storage.North_lf_zhenzhi=[];
					else if(event.triggername=='recoverAfter'){
						player.logSkill('North_lf_zhenzhi_buff')
						player.recover();
					}
					else {
						player.logSkill('North_lf_zhenzhi_buff')
						player.draw();
					}
				}
			},
		},
	},
	
	//--------------ei定制的PC
	"North_PC_zigong":{
		audio:'ext:ei扩展:2',
		forced:true,
		trigger:{
			player:['damageEnd','turnOverEnd'],
		},
		content:function(){
			player.useCard(
				{
					name:'huogong',
					isCard:false,
				},
			);
		},
	},
	"North_PC_qianshui":{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:['loseAfter'],
			global:['roundStart',"equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter","addToExpansionAfter"],
		},
		filter:function(event,player,name){
			if(name=='roundStart'){
				if(game.roundNumber==1)return true;
			}
			else{
				var evt=event.getl(player);
				if(!evt||!evt.cards2||!evt.cards2.length) return false;
				if(event.name=='lose'){
					for(var i in event.gaintag_map){
						if(event.gaintag_map[i].includes('North_PC_qianshui_tag')) return true;
					}
					return false;
				}
				return player.hasHistory('lose',function(evt){
					if(event!=evt.getParent()) return false;
					for(var i in evt.gaintag_map){
						if(evt.gaintag_map[i].includes('North_PC_qianshui_tag')) return true;
					}
					return false;
				});
			}
		},
		content:function(){
			'step 0'
			if(event.triggername=='roundStart'){
				player.chooseCard(true).ai=function(card){
					if(_status.event.getRand()<0.5) return Math.random();
					return get.value(card);
				};
			}
			else{
				event.goto(2);
			}
			'step 1'
			player.showCards(result.cards).setContent(function(){});
			event.finish();
			'step 2'
			if(trigger.delay===false) game.delayx();
			'step 3'
			player.logSkill('North_PC_qianshui');
			var num=0;
			if(trigger.name=='lose'){
				for(var i in trigger.gaintag_map){
					if(trigger.gaintag_map[i].includes('North_PC_qianshui_tag')) num++;
				}
			}
			else {
				player.getHistory('lose',function(evt){
					if(trigger!=evt.getParent()) return false;
					for(var i in evt.gaintag_map){
						if(evt.gaintag_map[i].includes('North_PC_qianshui_tag')) num++;
					}
				});
			}
			event.num=num;
			'step 4'
			event.num--;
			'step 5'
			player.draw(2);
			player.turnOver();
			'step 6'
			if(event.num>0){
				event.goto(4);
			}
		},
		mod:{
			aiValue:function(player,card,num){
				if(get.itemtype(card)!='card'||!card.hasGaintag('North_PC_qianshui_tag')) return;
				if(get.distance(_status.currentPhase,player,'absolute')==1&&!player.isTurnedOver()) return;
				if(player.countCards('h',card=>{
					return card.hasGaintag('North_PC_qianshui_tag');
				})%2==0&&!ui.selected.cards.some(card=>{
					return card.hasGaintag('North_PC_qianshui_tag');
				})){
					return num/10;
				}
			},
			aiUseful:function(){
				return lib.skill.oldaili.mod.aiValue.apply(this,arguments);
			},
		},
		mark:true,
		marktext:'潜',
		intro:{
			markcount:function(storage,player){
				return player.countCards('h',card=>card.hasGaintag('North_PC_qianshui_tag'));
			},
			mark:function(dialog,content,player){
				var cards=player.getCards('h',card=>card.hasGaintag('North_PC_qianshui_tag'));
				if(cards.length){
					dialog.addAuto(cards);
				}
				else return '无展示牌';
			},
		},
		group:'North_PC_qianshui_record',
		subSkill:{
			record:{
				trigger:{player:'showCardsEnd'},
				forced:true,
				charlotte:true,
				popup:false,
				firstDo:true,
				content:function(){
					game.broadcastAll(function(cards){
						cards.forEach(card=>card.addGaintag('North_PC_qianshui_tag'));
					},trigger.cards);
				}
			},
		}
	},
	//-----------曹轶
	caoyi_miyi:{
		audio:'ext:夜白新将/audio/character:2',
		trigger:{
			player:'phaseZhunbei',
		},
		direct:true,
		moright:[
			function(i){
				i.recover();
			},
			function(i){
				i.damage();
			}
		],
		content:function(){
			'step 0'
			delete player.storage.caoyi_miyi;
			delete player.storage.caoyi_miyi_add;
			event.list=[
				'回复一点体力',
				'受到一点你造成的伤害',
			]
			player.chooseControl('cancel2').set('choiceList',event.list).set('prompt',get.prompt('caoyi_miyi')).set('ai',function(){
				if(game.countPlayer(function(current){
					return get.attitude(player,current)<0&&current.hp==current.maxHp&&get.damageEffect(current,player,player)>0;
				})>0){
					return '选项一';
				}
				else if(player.hp>3&&game.countPlayer(function(current){
					return get.attitude(player,current)<0&&get.damageEffect(current,player,player)>0;
				})>0){
					return '选项二';
				}
				else{
					return '选项一';
				}
			});
			'step 1'
			if(result.index==2){
				event.finish();
			}
			else{
				player.logSkill('caoyi_miyi');
				event.numb=result.index;
				lib.skill['caoyi_miyi'].moright[event.numb](player);
				player.storage.caoyi_miyi_add=(event.numb+1);
			}
			'step 2'
			var str='令这些角色各'+event.list[event.numb]+'，若如此做，结束阶段这些角色执行另一项。';
			player.chooseTarget([1,Infinity],'请选择任意名角色').set('prompt2',str).set('ai',function(target){
				var att=get.attitude(player,target);
				var att2=get.damageEffect(target,player,player);
				if(event.numb==0){
					if(target.hp==target.maxHp)return att<0&&att2>0;
					return att>0;
				}
				else{
					return att2>0;
				}
			});
			'step 3'
			if(result.targets){
				var targets=result.targets.sortBySeat();
				player.storage.caoyi_miyi=[];
				player.addTempSkill('caoyi_miyi_add');
				for(var i of targets){
					if(i&&i.isIn()){
						player.line(i);
						player.storage.caoyi_miyi.push(i);
						lib.skill['caoyi_miyi'].moright[event.numb](i);
					}
				}
			}
		},
		subSkill:{
			add:{
				forced:true,
				charlotte:true,
				trigger:{
					player:'phaseJieshu',
				},
				filter:(event,player)=>{
					return player.storage.caoyi_miyi&&player.storage.caoyi_miyi.length>0&&player.storage.caoyi_miyi_add;
				},
				content:function(){
					'step 0'
					event.targets=player.storage.caoyi_miyi;
					event.xxy=player.storage.caoyi_miyi_add%2;
					'step 1'
					delete player.storage.caoyi_miyi;
					delete player.storage.caoyi_miyi_add;
					for(var i of event.targets){
						if(i&&i.isIn()){
							lib.skill['caoyi_miyi'].moright[event.xxy](i);
						}
					}
				}
			},
		},
	},
	// caoyi_miyi:'蜜饴',
	// caoyi_miyi_info:'准备阶段，你可以选择一项：<br>1.回复一点体力 <br>2.受到一点你造成的伤害<br>然后令任意名角色依次执行该项。<br>若如此做，结束阶段这些角色执行另一项。',
	// caoyi_yinjun:'寅君',
	// caoyi_yinjun_info:'当你对其他角色使用手牌中唯一目标的【杀】或锦囊牌结算后，可以视为对其使用一张【杀】(此杀造成的伤害无来源)。若你此技能本回合发动次数大于你当前体力值，此技能本回合失效。',
	caoyi_yinjun:{
		audio:'ext:夜白新将/audio/character:2',
		trigger:{player:'useCardAfter',},
		filter:(event,player)=>{
			if(player.hasSkill('caoyi_yinjun_add'))return false;
			if(event.card.name!='sha'&&get.type(event.card)!='trick')return false;
			if(event.targets.length!=1)return false;
			if(event.targets[0]==player)return false;
			if(!player.hasHistory('lose',function(evt){
				return evt.hs.length>0&&evt.getParent()==event;
			})||!event.cards.filterInD('oe').length) return false;//这段话摘自种树姐妹花
			if(!lib.filter.targetEnabled2({name:'sha'},player,event.targets[0]))return false;
			return true;
		},
		content:function(){
			player.addMark('caoyi_yinjun_mark',1,false);
			// player.addTempSkill('caoyi_yinjun_damage');
			player.useCard({name:'sha',isCard:false,caoyi_yinjun:true},trigger.targets[0]).set('addCount',false);
		},
		init:function(player){
			player.markSkill('caoyi_yinjun_mark');
		},
		check:function (event,player){
			return get.effect(player,{name:'sha'},event.targets[0],player);
		},
		group:['caoyi_yinjun_mark','caoyi_yinjun_lose','caoyi_yinjun_damage'],
		subSkill:{
			mark:{
				mark:true,
				marktext:'寅',
				intro:{
					name:'寅君',
					content:function(storage,player){
						if(!storage){
							return '本回合尚未使用';
						}
						return '本回合已使用'+storage+'次';
					}
				},
				trigger:{player:['changeHp','caoyi_yinjunAfter']},
				filter:(event,player)=>{
					var num=player.storage.caoyi_yinjun_mark;
					if(!num){
						return false;
					}
					return num>player.hp;
				},
				direct:true,
				content:function(){
					player.unmarkSkill('caoyi_yinjun_mark');
					player.addTempSkill('caoyi_yinjun_add');
				},
			},
			add:{
				mark:true,
				marktext:'<span style="text-decoration: line-through;">寅</span>',
				onremove:(player)=>{
					player.markSkill('caoyi_yinjun_mark');
				},
				intro:{
					name:'寅君',
					content:'本回合不能再用',
				},
			},
			lose:{
				direct:true,
				charlotte:true,
				trigger:{player:'phaseAfter',},
				content:function(){
					player.removeMark('caoyi_yinjun_mark',player.storage.caoyi_yinjun_mark,false)
				},
			},
			damage:{
				firstDo:true,
				trigger:{
					source:'damageBefore',
				},
				filter:function(event,player){
					return event.card&&event.card.caoyi_yinjun==true;
				},
				direct:true,
				content:function(){
					trigger.source = undefined
				},
			}
		},
	},

	
	// //---------连招技
	// _ybsl_lianzhao:{
	// 	trigger:{
	// 		player:'useCard',
	// 	},
	// 	filter:(event,player)=>{
	// 		return get.YB_lianzhaoList(player);
	// 	},
	// 	direct:true,
	// 	content(){
	// 		let skills=get.YB_lianzhaoList(player);
	// 		if(skills.length){
	// 			for(var i of skills){
	// 				if(!get.YB_lianzhao(player,i,trigger.card))player.storage[i]=0;
	// 			}
	// 			for(var i of skills){
	// 				if(get.YB_lianzhao(player,i,trigger.card))player.storage[i]++;
	// 			}
	// 			for(var i of skills){
	// 				if(lib.skill[i].getLianzhao().length==player.storage[i]){
	// 					player.storage[i]=0;
	// 					trigger.trigger('YB_'+i);
	// 				}
	// 			}
	// 		}
	// 	}
	// },
	// //----------连招张辽
	// zhangliao_yuxi:{
	// 	trigger:{
	// 		source:'damageBegin4',
	// 		player:'damageBegin4',
	// 	},
	// 	filter:()=>true,
	// 	content(){
	// 		player.draw().gaintag=['zhangliao_yuxi']
	// 	},
	// 	mod:{
	// 		cardUsable:function(card,player){
	// 			if(card.hasGaintag('zhangliao_yuxi'))return Infinity;
	// 		},
	// 	}
	// },
	// zhangliao_porong:{
	// 	getLianzhao:function(){
	// 		return [
	// 			function(card){return get.tag(card, "damage")},
	// 			function(card){return get.name(card)=='sha'}
	// 		]
	// 	},
	// 	init(player){
	// 		player.storage.zhangliao_porong=0;
	// 	},
	// 	trigger:{
	// 		player:'YB_zhangliao_porong',
	// 	},
	// 	filter(){return true;},
	// 	content(){
	// 		'step 0'
	// 		// player.logSkill('zhangliao_porong');
	// 		trigger.getParent().effectCount++;
	// 		event.targets = trigger.targets;
	// 		event.count = 0;
	// 		'step 1'
	// 		var players=[],tar=event.targets[event.count];
	// 		if(tar.isIn()){
	// 			player.line(tar,'thunder');
	// 			players.add(tar.getNext());
	// 			players.add(tar.getPrevious());
	// 			players.sortBySeat();
	// 			for(var i of players){
	// 				player.gainPlayerCard(i,true,'h');
	// 			}
	// 		}
	// 		'step 2'
	// 		event.count++;
	// 		'step 3'
	// 		if(event.count<event.targets.length)event.goto(1);
	// 	},
	// 	mark:true,
	// 	intro:{
	// 		content:function(storage,player){
	// 			var num = storage,list = ['伤害牌','杀'],str='';
	// 			for(var i=0;i<list.length;i++){
	// 				if(i>0)str+='、';
	// 				if(num>i)str+=`<span class=thundertext>${list[i]}</span>`;
	// 				else str+=list[i];
	// 			}
	// 			return str;
	// 		},
	// 	}
	// },
	//--------------shw
	
	"North_haoling":{
		audio:2,
		trigger:{player:'North_haoling_addAfter'},
		direct:true,
		filter:function(event,player){
			return true;
		},
		content:function(){
			'step 0'
			//然后你依次选择场上其他角色交给你一张牌或者受到一点伤害。
			player.awakenSkill('North_haoling');
			event.targets=[];
			game.countPlayer(function(current){
				if(current!=player)event.targets.push(current);
			});
			player.line(event.targets,'fire');
			event.numb=0;
			'step 1'
			if(event.numb<event.targets.length){
				event.tar=event.targets[event.numb];
				if(event.tar&&event.tar.isIn()){
					event.tar.chooseCard('he',1).set('prompt','号令').set('prompt2','清选择一张手牌交给'+get.translation(player)+'，否则受到一点伤害。');
				}
			}
			else event.goto(3);
			'step 2'
			if(result.cards){
				event.tar.give(result.cards,player);
			}
			else{
				event.tar.damage(player);
			}
			'step 3'
			event.numb++;
			'step 4'
			if(event.numb>=event.targets.length){
				event.finish();
			}
			else{
				event.goto(1);
			}
		},
		
		ai:{
			order:7,
			result:{
				player:function(player){
					var num=0;
					var friends=game.filterPlayer(function(current){
						return get.attitude(player,current)>=4;
					});
					var vacancies={
						equip1:0,
						equip2:0,
						equip3:0,
						equip4:0,
						equip5:0
					};
					for(var i=0;i<friends.length;i++){
						for(var j=1;j<=5;j++){
							if(friends[i].hasEmptySlot(j)){
								vacancies['equip'+j]++;
							}
						}
					}
					var sources=game.filterPlayer(function(current){
						return ((current==player&&current.hasSkill('decadexuanfeng'))||get.attitude(player,current)<0)&&current.countCards('e');
					});
					for(var i=0;i<sources.length;i++){
						var es=sources[i].getCards('e');
						for(var j=0;j<es.length;j++){
							var type=get.subtype(es[j]);
							if(sources[i]==player||vacancies[type]>0&&get.value(es[j])>0){
								num++;
								if(sources[i]==player&&vacancies[type]&&game.hasPlayer(function(current){
									return get.attitude(player,current)<0&&current.countDiscardableCards(player,'he')>0&&get.damageEffect(current,player,player)>0;
								})) num+=0.5;
								if(num>=3){
									return 1;
								}
								vacancies[type]--;
							}
						}
					}
					if(num&&player.hp==1){
						return 0.5;
					}
					return 0;
				},
			},
		},
		mark:true,
		intro:{
			content:"limited",
		},
		init:(player,skill)=>player.storage[skill]=false,
		group:'North_haoling_add',
		subSkill:{
			add:{
				unique:true,
		limited:true,
		skillAnimation:true,
		animationColor:"fire",
		enable:"phaseUse",
		filter:function(event,player,cards){
			return game.hasPlayer(function(current){
				var es=current.getCards('ej',function(card){
					return !cards||!cards.includes(card);
				});
				for(var i=0;i<es.length;i++){
					if(game.hasPlayer(function(current2){
						return current!=current2&&!current2.isMin()&&current2.canEquip(es[i]);
					})){
						return true;
					}
				}
			});
		},
		content:function(){
			'step 0'
			player.awakenSkill('North_haoling_add');
			event.count=2;
			event.cards=[];
			'step 1'
			game.log(1)
			event.count--;
			if(!lib.skill.North_haoling.filter(null,player,cards)){
				event.finish();
			}else{
				var next=player.chooseTarget(2,function(card,player,target){
					if(ui.selected.targets.length){
						var from=ui.selected.targets[0];
						if(target.isMin()) return false;
						var es=from.getCards('ej',function(card){
							return !_status.event.cards.includes(card);
						});
						for(var i=0;i<es.length;i++){
							if(target.canEquip(es[i])) return true;
						}
						return false;
					}
					else{
						return target.countCards('ej',function(card){
							return !_status.event.cards.includes(card);
						})>0;
					}
				});
				next.set('ai',function(target){
					var player=_status.event.player;
					var att=get.attitude(player,target);
					var sgnatt=get.sgn(att);
					if(ui.selected.targets.length==0){
						if(target==player&&player.hasSkill('decadexuanfeng')){
							if(player.countCards('ej',function(card){
								return !_status.event.cards.includes(card)&&game.hasPlayer(function(current){
									return current!=target&&current.canEquip(card)&&get.effect(current,card,player,player)<0;
								});
							})>0) return 18;
							return 7;
						}
						else if(att>0){
							if(target.countCards('ej',function(card){
								return get.value(card,target)<0&&!_status.event.cards.includes(card)&&game.hasPlayer(function(current){
									return current!=target&&current.canEquip(card)&&get.effect(current,card,player,player)<0;
								});
							})>0) return 9;
						}
						else if(att<0){
							if(game.hasPlayer(function(current){
								if(current!=target&&get.attitude(player,current)>0){
									var es=target.getCards('ej',function(card){
										return !_status.event.cards.includes(card);
									});
									for(var i=0;i<es.length;i++){
										if(get.value(es[i],target)>0&&current.canEquip(card)&&get.effect(current,es[i],player,current)>0) return true;
									}
								}
							})){
								return -att;
							}
						}
						return 0;
					}
					var es=ui.selected.targets[0].getCards('ej',function(card){
						return !_status.event.cards.includes(card);
					});
					var i;
					var att2=get.sgn(get.attitude(player,ui.selected.targets[0]));
					for(i=0;i<es.length;i++){
						if(sgnatt!=0&&att2!=0&&sgnatt!=att2&&
							get.sgn(get.value(es[i],ui.selected.targets[0]))==-att2&&
							get.sgn(get.effect(target,es[i],player,target))==sgnatt&&
							target.canEquip(es[i])){
							return Math.abs(att);
						}
					}
					if(i==es.length){
						return 0;
					}
					return -att*get.attitude(player,ui.selected.targets[0]);
				});
				next.set('multitarget',true);
				next.set('cards',cards);
				next.set('targetprompt',['被移走','移动目标']);
				next.set('prompt','移动场上的一张牌');
			}
			'step 2'
			if(result.bool){
				player.line2(result.targets,'green');
				event.targets=result.targets;
			}
			else{
				event.finish();
			}
			'step 3'
			game.delay();
			'step 4'
			if(targets.length==2){
				player.choosePlayerCard('ej',true,function(button){
					var player=_status.event.player;
					var targets0=_status.event.targets0;
					var targets1=_status.event.targets1;
					if(get.attitude(player,targets0)>0&&get.attitude(player,targets1)<0){
						if(get.value(button.link,targets0)<0&&get.effect(targets1,button.link,player,targets1)>0) return 10;
						return 0;
					}
					else{
						return get.value(button.link)*get.effect(targets1,button.link,player,player);
					}
				},targets[0]).set('nojudge',event.nojudge||false).set('targets0',targets[0]).set('targets1',targets[1]).set('filterButton',function(button){
					if(_status.event.cards.includes(button.link)) return false;
					var targets1=_status.event.targets1;
					return targets1.canEquip(button.link);
				}).set('cards',cards);
			}
			else{
				event.finish();
			}
			'step 5'
			if(result.bool&&result.links.length){
				var link=result.links[0];
				cards.add(link);
				if(get.position(link)=='e'){
					event.targets[1].equip(link);
					event.targets[0].$give(link,event.targets[1])
				}
				else if(link.viewAs){
					event.targets[1].addJudge({name:link.viewAs},[link]);
					event.targets[0].$give(link,event.targets[1])
				}
				else{
					event.targets[1].addJudge(link);
				}
				game.delay();
			}
			else event.finish();
			'step 6'
			if(event.count>0);
		},
			}
		}
	},
	"North_zhenglue":{
		enable:'phaseUse',
		prompt:'出牌阶段，你可以流失一点体力并获得一点护甲，然后令一名角色摸一张牌',
		content:function(){
			"step 0"
			player.loseHp(1);
			player.addMark('North_zhenglue_add',1,false);
			"step 1"
			player.changeHujia(1);
			player.chooseTarget(1,true).set('ai',function(target){
				var playerx=(_status.event.player||player);
				if(playerx){
					if(playerx.isIn())return target=playerx;
				}
				return get.attitude(playerx,target);
			}).set('promtp2','令一名角色摸一张牌');
			"step 2"
			if(result.targets){
				player.line(result.targets[0]);
				result.targets[0].draw(1);
			}
		},
		ai:{
			basic:{
				order:1
			},
			result:{
				player:function(player){
					if(player.countCards('h')>=player.hp-1) return -1;
					if(player.hp<3) return -1;
					return 1;
				}
			}
		},
		group:'North_zhenglue_add',
		subSkill:{
			add:{
				direct:true,
				nopop:false,
				trigger:{player:'phaseJieshuBegin'},
				filter:function(event,player){
					if(player.countMark('North_zhenglue_add')>=3)return true;
					return false;
				},
				skillAnimation:true,
				animationColor:'fire',
				content:function(){
					player.awakenSkill('North_zhenglue_add');
					player.gainMaxHp();
					player.recover();
					player.addSkill('North_mouhua');
				}
			}
		},
		derivation:['North_mouhua'],
	},
	"North_mouhua":{
		usable:1,
		enable:['chooseToUse','chooseToRespond'],
		filter:function(event,player){
			if(player.countMark('North_mouhua_block')>=3)return false;
			if(player.countCards('hes')<1) return false;
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;
			for(var i of lib.skill.North_mouhua.basic){
				if(evt({name:i},player,event)) return true;
			};
			for(var i of lib.skill.North_mouhua.trick){
				if(evt({name:i},player,event)) return true;
			};
			for(var i of lib.skill.North_mouhua.delay){
				if(evt({name:i},player,event)) return true;
			};
			return false;
		},
		basic:['sha','huosha','leisha','icesha','cisha','shan','tao','jiu','du'],
		trick:[
			'guohe','shunshou','wuzhong','wugu',
			'wuxie','taoyuan','wanjian','nanman',
			'juedou','jiedao','huogong','tiesuo',
			'suijiyingbian','dongzhuxianji','shuiyanqijunx','zhujinqiyuan',
			'chenghuodajie','tuixinzhifu','guaguliaodu'
		],
		delay:['shandian','lebu','bingliang'],
		chooseButton:{
			dialog:function (event,player){
				var list=[];
				for(var i of lib.skill.North_mouhua.basic){
					list.push(['基本','',i]);
				};
				for(var i of lib.skill.North_mouhua.trick){
					list.push(['锦囊','',i]);
				};
				for(var i of lib.skill.North_mouhua.delay){
					list.push(['延时锦囊','',i]);
				};
				return ui.create.dialog('谋划',[list,'vcard']);
			},
			filter:function (button,player){
				return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
			},
			check:function (button){
				if(_status.event.getParent().type!='phase') return 1;
				var player=_status.event.player;
				if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan_gai','lianjunshengyan','diaohulishan'].includes(button.link[2])) return 0;
				return player.getUseValue({
					name:button.link[2],
					nature:button.link[3],
				});
			},
			backup:function (links,player){
				return {
					filterCard:true,
					selectCard:1,
					complexCard:true,
					position:'hes',
					audio:2,
					popname:true,
					viewAs:{name:links[0][2],nature:links[0][3]},
					precontent:function(){
						player.addTempSkill('North_mouhua_block','roundStart');
						player.addMark('North_mouhua_block',1,false);
					},
				};
			},
			prompt:function (links,player){
				return '将一张牌当作'+links[0][3]?get.translation(links[0][3]):''+get.translation(links[0][2])+'使用';
			},
		},
		hiddenCard:function (player,name){
			var list=[];
			for(var i of lib.skill.North_mouhua.basic){
				list.push(i);
			};
			for(var i of lib.skill.North_mouhua.trick){
				list.push(i);
			};
			for(var i of lib.skill.North_mouhua.delay){
				list.push(i);
			};
			return list.includes(name)&&player.countCards('hes')>=1&&!player.hasSkill('North_mouhua_block');
		},
		group:['North_mouhua_add'],
		subSkill:{
			block:{
				onremove:true,
			},
			add:{
				trigger:{
					player:['useCardAfter'],
				},
				forced:true,
				charlotte:true,
				popup:false,
				filter:function (event,player){
					return event.skill=='North_mouhua_backup';
				},
				content:function (){
					player.draw();
				},
				sub:true,
			}
		}
	},
	//-------------无
	"YB_nobody_guiyin":{
		"_priority":0,
		audio:"ext:夜白神略/audio/character:2",
		forced:true,
		trigger:{
			global:["gainEnd"],
			player:"useCard",
		},
		filter:function(event,player,name){
			var players=game.filterPlayer(function(current){
				return current!=player&&current.inRange(player);
			});
			// if(players)players.sortBySeat();
			if(players.length!=1)return name=='useCard'&&['basic','trick'].includes(get.type(event.card));
			else if(players.length==1&&name=='gainEnd'&&players[0]==event.player)return true;
			else return false;
		},
		content:function(){
			'step 0'
			if(event.triggername=='gainEnd'){
				player.draw(trigger.cards.length);
				event.finish();
			}
			'step 1'
			trigger.effectCount=2;
			game.log(player,'发动癸隐，令',trigger.card,'结算了两次');
			'step 2'
			player.chooseTarget('癸隐：是否为'+get.translation(trigger.card)+'增加任意目标？',[1,Infinity],function(card,player,target){
				var trigger=_status.event.getTrigger();
				var card=trigger.card;
				return !trigger.targets.includes(target)&&lib.filter.targetEnabled2(card,player,target)&&lib.filter.targetInRange(card,player,target);
			}).set('ai',function(target){
				var player=_status.event.player;
				var card=_status.event.getTrigger().card;
				return get.effect(target,card,player,player);
			});
			'step 3'
			if(result.bool){
				var targets=result.targets;
				player.line(targets,'green');
				game.log(player,'发动癸隐，令',targets,'也成为了',trigger.card,'的目标');
				for(var i of targets){
					trigger.targets.add(i);
				}
			}
		},
	},
	"YB_nobody_linglv":{
		"_priority":0,
		audio:"ext:夜白神略/audio/character:2",
		forced:true,
		trigger:{
			global:"changeHp",
		},
		filter:function(event,player){
			return true;
		},
		content:function(){
			'step 0'
			if(trigger.player.hp<=player.hp){
				player.addTempSkill('YB_nobody_linglv_mark','roundStart');
				player.addMark('YB_nobody_linglv_mark');
				event.finish();
			}
			'step 1'
			var players=[];
			players.add(player.getNext());
			players.add(player.getPrevious());
			for(var i of players){
				player.gainPlayerCard(i,true,'he');
			}
			'step 2'
			player.chooseCard('he',3,true,'请选择三张牌重铸');
			'step 3'
			if(result.cards)player.recast(result.cards);
		},
		subSkill:{
			mark:{
				audio:"YB_nobody_linglv",
				forced:true,
				trigger:{
					player:"phaseDrawBegin",
				},
				filter:(e,p)=>{return p.storage.YB_nobody_linglv_mark},
				content:()=>{trigger.num+=player.storage.YB_nobody_linglv_mark},
				onremove:true,
				mark:true,
				intro:{
					content:"本轮防御距离和摸牌阶段摸牌数+$",
				},
				mod:{
					globalTo:function(from,to,distance){
						var numa=0;
						if(to.storage.YB_nobody_linglv_mark)var numa=to.storage.YB_nobody_linglv_mark;
						return distance+numa;
					},
				},
				sub:true,
				"_priority":0,
			},
		},
	},
	"YB_nobody_longying":{
		"_priority":0,
		audio:"ext:夜白神略/audio/character:2",
		direct:true,
		trigger:{
			global:"useCardAfter",
		},
		filter:function(event,player){
			return player.countCards('he')>0;
		},
		content:function(){
			var target=trigger.player;
			'step 0'
			var num=target.getHistory('useCard').length;
			player.chooseCard(num,'he','是否弃置'+num+'张牌，然后弃置'+get.translation(target)+'等量的牌？<br>若因此弃置了不少于两张牌，你对'+get.translation(target)+'造成一点伤害').set('ai',function(card){
				var att=get.attitude(_status.event.player,target);
				if(att<0){
					if(target.countCards('he')>0){
						return 6-get.value(card);
					}
				}
				return false;
			});
			'step 1'
			if(result.bool){
				player.logSkill('YB_nobody_longying');
				player.discard(result.cards);
				if(target.countDiscardableCards(player,'he')){
					player.discardPlayerCard('he',result.cards.length,target,true);
				}
				if(result.cards.length>=2){
					target.damage(player);
				}
			}
		},
		ai:{
			expose:1,
		},
	},
	"YB_nobody_fengguo":{
		"_priority":0,
		audio:"ext:夜白神略/audio/character:2",
		trigger:{
			global:"phaseZhunbei",
		},
		filter:(event,player)=>{
			return event.player.countCards('h')<=player.countCards('h');
		},
		check:function(event,player){
			var att=get.attitude(_status.event.player,event.player);
			return att>0;
		},
		longying:function(a){
			var his=a.getAllHistory('damage',(evt)=>{
				//if(evt.getParent())game.log('evt.getParent()：',evt.getParent());
				//if(evt.getParent().name)game.log('evt.getParent().name：',evt.getParent().name);
				//if(evt.getParent(2))game.log('evt.getParent(2)：',evt.getParent(2));
				//if(evt.getParent(2).name)game.log('evt.getParent(2).name：',evt.getParent(2).name);
				//if(evt.getParent(3))game.log('evt.getParent(3)：',evt.getParent(3));
				return evt.getParent().name=='YB_nobody_longying';
				//evt.skill&&evt.skill=='YB_nobody_longying';
			});
			if(his.length)return true;
			return false;
		},
		content:function(){
			var target=trigger.player;
			'step 0'
			var list=['与'+get.translation(player)+'各摸两张牌','本局游戏对因“龙缨”受到过伤害的角色造成的伤害＋1'];
			if(!target.hasSkill('YB_nobody_fengguo_mark'))target.chooseControl('摸牌','加伤').set('choiceList',list);
			else event._result={index:0,}
			'step 1'
			if(result.index==1){
				target.addSkill('YB_nobody_fengguo_mark');
			}
			else {
				target.draw(2);
				player.draw(2);
			}
		},
		ai:{
			expose:1,
		},
		subSkill:{
			mark:{
				trigger:{
					source:"damageBegin1",
				},
				forced:true,
				charlotte:true,
				filter:function(event,player){
		//var his=event.player.getAllHistory('damage',(evt)=>{
		//	evt.getParent(2).skill=='YB_nobody_longying';
		//});
		//if(his.length)return true;
		return lib.skill.YB_nobody_fengguo.longying(event.player);
	},
				content:function(){
		trigger.num++;
	},
				mark:true,
				intro:{
					content:function(event,player){
			var list=game.filterPlayer(a=>lib.skill.YB_nobody_fengguo.longying(a));
			if(list.length)return '对'+get.translation(list)+'造成伤害时，此伤害+1';
			return '无';
		},
				},
				sub:true,
				"_priority":0,
			},
		},
	},
	// yuanxing: {
	// 	audio: '',
	// 	forced: true,
	// 	locked: false,
	// 	enable: 'chooseToUse',
	// 	trigger: {player: 'chooseButtonBegin'},
	// 	hiddenCard: () => true,
	// 	filter: function (event, player, name, data) {
	// 		if (event.name == 'chooseButton') return event.type == 'chooseToUse_button' && event.getParent().result.skill == 'yuanxing';
	// 		return (!event.customArgs || !event.customArgs['yuanxing']) && lib.inpile.some(name => event.filterCard(get.autoViewAs({name}, 'unsure'), player, event));
	// 	},
	// 	filterCard: () => false,
	// 	selectCard: () => lib.config.auto_confirm ? [0, 1] : -1,
	// 	prompt: '令所有其他角色各摸一张牌，然后你观看并可以使用其中一张手牌',
	// 	chooseButton: {
	// 		dialog: function (event, player) {
	// 			const dialog = ui.create.dialog('你可以使用其中一张牌', 'hidden');
	// 			const map = new Map(game.filterPlayer(target => target != player).map(target => [target, target.getGainableCards(player, 'h')]));
	// 			for (const [target, cards] of map) if (cards.length) dialog.addText(`${get.translation(target)}的手牌区`).add(cards);
	// 			if (dialog.content.childElementCount == 1) dialog.addText('无');
	// 			return dialog;
	// 		},
	// 		filter: function ({link}) {
	// 			const {event, event: {player}} = _status, parent = event.getParent();
	// 			if (parent.dying) event.dying = parent.dying;
	// 			const bool = parent.filterCard(get.autoViewAs(link, [link]), player, parent);
	// 			delete event.dying;
	// 			return bool;
	// 		},
	// 		backup: function ([link], player) {
	// 			const backup = get.copy(lib.skill['yuanxing_backup']);
	// 			return Object.assign(backup, {viewAs: link});
	// 		},
	// 		prompt: function ([link], player) {
	// 			return `使用${get.translation(get.owner(link))}的${get.translation(link)}`;
	// 		},
	// 	},
	// 	content: async function (event, trigger, player) {
	// 		const parent = trigger.getParent(), targets = game.filterPlayer(target => target != player);
	// 		parent.set('customArgs', Object.assign(parent.customArgs || {}, {yuanxing: true}));
	// 		player.line(targets)
	// 		await game.asyncDraw(targets);
	// 		trigger.set('dialog', get.info(event.name).chooseButton.dialog(parent, parent.player));
	// 		if (!game.hasPlayer(target => target != player && target.countGainableCards(player, 'h'))) {
	// 			trigger.set('result', {bool: false});
	// 			trigger.finish();
	// 		}
	// 	},
	// 	subSkill: {
	// 		backup: {
	// 			log: false,
	// 			popname: true,
	// 			filterCard: () => false,
	// 			selectCard: -1,
	// 			precontent: function* (event, {player}) {
	// 				const {result, result: {card}} = event;
	// 				if (!result.cards?.length) result.cards = card.cards;
	// 				const owner = get.owner(result.cards[0]);
	// 				if (owner) {
	// 					player.line(owner);
	// 					owner.$give(result.cards, player, false);
	// 					game.delayx();
	// 				}
	// 			},
	// 		},
	// 	},
	// },
}