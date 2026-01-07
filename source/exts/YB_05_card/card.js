import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {card};
/** @type { importCardConfig['card'] } */
const card = {
	//整个活
	YB_snowdamage:{
		ai:{
			result:{
				target:-1.5
			},
			tag:{
				damage:1,
				YB_snowDamage:1,
				natureDamage:1,
			}
		}
	},
	YB_blooddamage:{
		ai:{
			result:{
				target:-1.5
			},
			tag:{
				damage:1,
				YB_bloodDamage:1,
				natureDamage:1,
			}
		}
	},
	rewrite_goujiangdesidai: {
		type: 'equip',
		subtype: 'equip1',
		distance: {
			attackFrom: -6
		},
		skills: ['rewrite_goujiangdesidai_skill'],
		modeimage: 'boss',
		ai: {
			basic: {
				equipValue: 8.5,
			},
		},
		fullskin: true,
	},
	//-----------------------飘雪神符
	'ybsl_piaoxueruyi':{
		bingzhu:['江雪舞'],
		fullskin:true,
		type:'equip',
		subtype:'equip1',
		distance:{
			attackFrom:-1,
		},
		skills:['ybsl_piaoxueruyi'],
		ai:{
			basic:{
				equipValue:2,
				order:function (card,player){
					if(player&&player.hasSkillTag('reverseEquip')){
						return 8.5-get.equipValue(card,player)/20;
					}
					else{
						return 8+get.equipValue(card,player)/20;
					}
				},
				useful:2,
				value:function (card,player,index,method){
					if(player.isDisabled(get.subtype(card))) return 0.01;
					var value=0;
					var info=get.info(card);
					var current=player.getEquip(info.subtype);
					if(current&&card!=current){
						value=get.value(current,player);
					}
					var equipValue=info.ai.equipValue;
					if(equipValue==undefined){
						equipValue=info.ai.basic.equipValue;
					}
					if(typeof equipValue=='function'){
						if(method=='raw') return equipValue(card,player);
						if(method=='raw2') return equipValue(card,player)-value;
						return Math.max(0.1,equipValue(card,player)-value);
					}
					if(typeof equipValue!='number') equipValue=0;
					if(method=='raw') return equipValue;
					if(method=='raw2') return equipValue-value;
					return Math.max(0.1,equipValue-value);
				},
			},
			result:{
				target:function (player,target,card){
					return get.equipResult(player,target,card.name);
				},
			},
		},
		
	},
	//-----------------------弥仙神术
	'ybsl_mixianshenshu':{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		enable:true,
		type:'trick',
		filterTarget:true,
		content:function (){
			'step 0'
			player.YB_control(lib.group.filter(function(group){
				return['wei','shu','wu','qun','jin','shen','YB_memory','key']
			}),5).set('ai',function(target){
				return 'shen';
			});
			'step 1'
			target.changeGroup(result.control);
			// target.draw(1);
		},
		chongzhu:true,
		ai:{
			order:2,
			useful:0,
			value:function(card,player,index,method){//不知道哪个参数有用，全写了
				if(player.group!='shen'){
					return 7;
				}
				else {return 0}
			},
			result:{
				// player:function(player,target){//发动这个技能对你的收益
					// if(player.group!='shen'){
						// return 7;
					// }
					// else {return 0}
				// },
				target:function(player,target){//发动这个技能对你的收益
					if(target.group!='shen'){
						return 7;
					}
					else {return 0}
				},
			},
		},
		selectTarget:1,
	},
	
	//-----------------万钧神弩
	'ybsl_tututu':{
		enable:true,
		type:'trick',
		fullskin:true,
		filterTarget:lib.filter.notMe,
		content:function(){
			'step 0'
			if(!player.isIn()||!target.isIn()){
				event.finish();
				return;
			}
			var num=game.countPlayer();
			if(num<4){num=4}
			if(num>10){num=10}
			event.showCards=get.cards(num);
			game.cardsGotoOrdering(event.showCards);
			player.showCards(event.showCards);
			player.$throw(event.showCards,1000);
			'step 1'
			if(player.isIn()&&target.isIn()&&event.showCards.length){
				for(var i of event.showCards){
					if(i.name=='sha'&&player.canUse(i,target,false)){
						player.useCard(i,target,false);
						event.showCards.remove(i);
						event.redo();
						break;
					}
				}
			}
			'step 2'
			if (event.showCards.length) {
				player.loseToDiscardpile(event.showCards);
				game.log(player,'将',event.showCards,'置入了弃牌堆');
			}
		},
		ai:{
			basic:{
				useful:4,
				value:4,
			},
			order:6,
			result:{
				target:function(player,target,card,isLink){
					if(get.effect(target,{name:'sha'},player,target)==0) return 0;
					return -2.5;
				},
			},
			tag:{
				respond:1,
				respondShan:1,
				damage:1,
			}
		}
	},
	ybsl_qiuxianruoke:{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'trick',
		enable:true,
		selectTarget:-1,
		// cardcolor:'red',
		toself:true,
		filterTarget:function(card,player,target){
			return target==player;
		},
		modTarget:true,
		content:function(){
			'step 0'
			target.say('山不厌高，海不厌深，周公吐哺，天下归心。');
			if(target.isUnderControl()){
				game.swapPlayerAuto(target);
			}
			var suit={
				'spade':'黑桃',
				'heart':'红桃',
				'club':'梅花',
				'diamond':'方片',
				'none':'无花',
			}
			var type={}
			for(var i of lib.inpile){
				if(!type[get.type2(i)]||type[get.type2(i)]==undefined)type[get.type2(i)]=get.translation(get.type2(i));
			};
			/*
			var list = [
				[
					{
						suit:'花色',
					},
					suit
				],
				[
					{
						type:'类型',
					},
					type
				],
			];
			var title = ['求贤若渴','你声明一个花色和类型，然后亮出牌堆顶三张牌，获得与你描述相符的牌。<br>若有两项皆满足的牌，你回复一点体力。'];
			var ok =function(){
				event._result={
					bool:true,
					type:listn[0],
					suit:listi[0],
				};
				event.dialog.close();
				event.control.close();
				game.resume();
				_status.imchoosing=false;
			};
			var okw=ui.create.control('ok',function(link){
				var result=event._result;
				if(!result.type||!result.suit) return;
				else{
					result.bool=true;
				}
				event.dialog.close();
				event.control.close();
				game.resume();
				_status.imchoosing=false;
			});
			player.YB_button(title,list,ok,okw);
			*/
			var suita=[];
			var typea=[];
			for(var i in suit){
				suita.push(i);
			}
			for(var j in type){
				typea.push(j);
			}
			var switchToAuto=function(){
				_status.imchoosing=false;
				// var listn=['普通'].concat(lib.inpile_nature);
				event._result={
					bool:true,
					suit:suita[0],
					type:typea[0],
				};
				if(event.dialog) event.dialog.close();
				if(event.control) event.control.close();
			};
			var chooseButton=function(player){
				var event=_status.event;
				player=target||event.player;
				if(!event._result) event._result={};
				var dialog=ui.create.dialog('<font size=6><b>求贤若渴</b></font>','forcebutton','hidden');
				dialog.add('你声明一个花色和类型，然后亮出牌堆顶三张牌，获得与你描述相符的牌。<br>若有两项皆满足的牌，你回复一点体力。');
				// var dialog=ui.create.dialog('你声明一个花色和类型，然后亮出牌堆顶三张牌，获得与你描述相符的牌。<br>若有两项皆满足的牌，你回复一点体力。','forcebutton','hidden');
				event.dialog=dialog;
				dialog.addText('花色');
				var table=document.createElement('div');
				table.classList.add('add-setting');
				table.style.margin='0';
				table.style.width='100%';
				table.style.position='relative';
				var listi=[];
				for(var ybi in suit){
					listi.push(ybi);
				}
				var listn=[];
				for(var ybn in type){
					listn.push(ybn);
				}
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
						event._result.suit=link;
					});
				}
				dialog.content.appendChild(table);
				dialog.addText('类型');
				var table2=document.createElement('div');
				table2.classList.add('add-setting');
				table2.style.margin='0';
				table2.style.width='100%';
				table2.style.position='relative';
				// var listn=['普通'].concat(lib.inpile_nature);
				for(var i=0;i<listn.length;i++){
					var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
					var nature=listn[i];
					td.link=nature;
					table2.appendChild(td);
					td.innerHTML='<span>'+type[nature]+'</span>';
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
						event._result.type=link;
					});
				}
				dialog.content.appendChild(table2);
				dialog.add('　　');
				event.dialog.open();
				
				event.switchToAuto=function(){
					event._result={
						bool:true,
						type:listn[0],
						suit:listi[0],
					};
					event.dialog.close();
					event.control.close();
					game.resume();
					_status.imchoosing=false;
				};
				event.control=ui.create.control('ok',function(link){
					var result=event._result;
					if(!result.type||!result.suit) return;
					else{
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
				chooseButton(target);
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
			var map=event.result||result;
			if(map.bool){
				var cards=get.cards(3),list=[];
				var suit=map.suit,type=map.type;
				event.cards=cards;
				game.cardsGotoOrdering(event.cards);
				target.showCards(event.cards);
				for(var i of cards){
					var li1=get.suit(i),li2=get.type2(i);
					if(li1==suit){list.add(i)}
					if(li2==type){
						if(list.includes(i)){
							event.recover=true;
						}
						else {list.add(i)}
					}
				}
				event.list=list;
				game.log(target,'声明了','#g'+get.translation(suit+2),'和','#g'+get.translation(type),'，',list,'满足条件');
			}
			else event.finish();
			'step 2'
			'step 3'
			target.gain(event.list,'gain2');
			if(event.recover==true) target.recover();
		},
		ai:{
			basic:{
				order:8,
				useful:4,
				value:3,
			},
			result:{
				target:2,
			},
			tag:{
				gain:2,
				// draw:2
			},
		},
	},
	//----------毒爆
	ybsl_duboom:{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'trick',
		enable:true,
		filterTarget:function(card,player,target){
			return target!=player&&target.countCards('h');
		},
		content:function (){
			'step 0'
			target.showCards(target.getCards('h'));
			'step 1'
			var cardxs=target.getCards('h').filter(card=>card.name=='du');
			if(cardxs.length){
				target.discard(cardxs);
			}
			else if (target.countDiscardableCards(target, 'h'))target.chooseToDiscard('h',true);
		},
		ai:{
			basic:{
				order:5,
				useful:2,
				value:4,
			},
			yingbian: function (card, player, targets, viewer) {
				if (get.attitude(viewer, player) <= 0) return 0;
				if (
					game.hasPlayer(function (current) {
						return !targets.includes(current) && lib.filter.targetEnabled2(card, player, current) && get.effect(current, card, player, player) > 0;
					})
				)
					return 6;
				return 0;
			},
			result:{
				target:function (player,target,cardx){
					if(target.getCards('h')?.filter(card=>card.name=='du'))return -5;
					return -1;
				},
			},
			tag:{
				damage:false,
			},
		},
		selectTarget:1,
		chongzhu:true,
	},
	
	//-----------------------同归于尽
	'ybsl_tongguiyujin':{
		audio:'ext:夜白神略/audio/card:true',
		enable:true,
		type:'trick',
		fullskin:true,
		// nodelay:true,
		filterTarget:function (card,player,target){
			return target!=player;
		},
		defaultYingbianEffect:'add',
		// 'yingbian_prompt':'当你使用此牌选择目标后，你可为此牌增加一个目标',
		// 'yingbian_tags':['add'],
		// yingbian:function (event){
		// 	event.yingbian_addTarget=true;
		// },
		contentBefore(){
			'step 0'
			if(player.hp>1)player.loseHp();
			'step 1'
			event.getParent().baseDamage=Math.max(player.maxHp-player.hp||1);
		},
		content:function (){
			target.damage();
		},
		ai:{
			basic:{
				order:5,
				useful:2,
				value:8,
			},
			yingbian:function (card,player,targets,viewer){
				if(get.attitude(viewer,player)<=0) return 0;
				if(game.hasPlayer(function(current){
					return !targets.includes(current)&&lib.filter.targetEnabled2(card,player,current)&&get.effect(current,card,player,player)>0;
				})) return 6;
				return 0;
			},
			result:{
				target:function (player,target,cardx){
					if(player.hasSkillTag('viewHandcard',null,target,true)) return target.countCards('h',function(card){
						return get.suit(card)!=get.suit(cardx)
					})>0?-1.5:0;
					return -1.4;
				},
			},
			tag:{
				damage:true,
			},
		},
		selectTarget:1,
	},
	ybsl_zhijizhibi:{
		audio:'zhibi',
		fullskin:true,
		type:'trick',
		enable:true,
		// chongzhu:true,
		recastable: true,
		filterTarget:function(card,player,target){
			if(player==target) return false;
			return (target.countCards('h')||target.isUnseen(2));
		},
		content:function(){
			"step 0"
			if(!player.storage.zhibi){
				player.storage.zhibi=[];
			}
			if(!player.storage.ybsl_zhijizhibi){
				player.storage.ybsl_zhijizhibi=[];
			}
			player.storage.zhibi.add(target);
			var controls=[];
			if(target.countCards('h')) controls.push('手牌');
			if(get.mode()=='guozhan'){
				if(target.isUnseen(0)) controls.push('主将');
				if(target.isUnseen(1)) controls.push('副将');
			}
			if(get.mode()=='identity'){
				if(!target.identityShown&&!player.storage.ybsl_zhijizhibi.includes(target)) controls.push('身份');
			}
			if(controls.length>1){
				player.chooseControl(controls).set('ai',function(){return 1});
			}
			if(controls.length==0) event.finish();
			"step 1"
			var content;
			var str=get.translation(target)+'的';
			if(result.control){
				if(result.control=='手牌'){
					content=[str+'手牌',target.getCards('h')];
					game.log(player,'观看了',target,'的手牌');
				}
				else if(result.control=='身份'){
					// content=[str+'身份'];
					// player.storage.ybsl_zhijizhibi.push(target);
					game.log(player,'观看了',target,'的身份');
				}
				else if(result.control=='主将'){
					content=[str+'主将',[[target.name1],'character']];
					game.log(player,'观看了',target,'的主将');
				}
				else{
					content=[str+'副将',[[target.name2],'character']];
					game.log(player,'观看了',target,'的副将');
				}
			}
			else if(target.countCards('h')){
				content=[str+'手牌',target.getCards('h')];
				game.log(player,'观看了',target,'的手牌');
			}
			else if(!target.identityShown){

				game.log(player,'观看了',target,'的身份');
			}
			else if(target.isUnseen(0)){
				content=[str+'主将',[[target.name1],'character']];
				game.log(player,'观看了',target,'的主将');
			}
			else{
				content=[str+'副将',[[target.name2],'character']];
				game.log(player,'观看了',target,'的副将');
			}
			if(result.control=='身份'){
				var func=function(){
					target.setIdentity();
				};
				if(player==game.me) func();
				else if(player.isOnline()) player.send(func);
				player.storage.ybsl_zhijizhibi.push(target);
			}
			else{
				player.chooseControl('ok').set('dialog',content);
			}
		},
		ai:{
			order:9.5,
			wuxie:function(){
				return 0;
			},
			result:{
				player:function(player,target){
					if(player.countCards('h')<=player.hp) return 0;
					if(player.storage.zhibi&&player.storage.zhibi.includes(target)) return 0;
					return target.isUnseen()?1:0;
				}
			}
		}
	},
	ybsl_anduchencang:{
		fullskin:true,
		type:'trick',
		wuxieable:true,
		global:['ybsl_anduchencang_skill'],
		selectTarget:-1,
		filterTarget:function(card,player,target){
			return target==player;
		},
		// filterTarget:true,
		toself:true,
		modTarget:true,
		// notarget:true,
		content:function(){
			'step 0'
			target.draw(2);
			'step 1'
			var next=target.phaseUse();
			// event.next.remove(next);
			// trigger.next.push(next);
		},
		ai:{
			basic:{
				useful:[6],
				value:[6],
			},
			result:{player:4},
		},
	},
	ybsl_kaicangzhenliang:{
		audio:true,
		fullskin:true,
		type:'trick',
		enable:true,
		cardcolor:'red',
		selectTarget:-1,
		filterTarget:true,
		contentBefore:function(){
			"step 0"
			if(!targets.length){
				event.finish();
				return;
			}
			if(get.is.versus()){
				player.chooseControl('顺时针','逆时针',function(event,player){
					if(player.next.side==player.side) return '逆时针';
					return '顺时针';
				}).set('prompt','选择'+get.translation(card)+'的结算方向');
			}
			else{
				event.goto(2);
			}
			"step 1"
			if(result&&result.control=='顺时针'){
				var evt=event.getParent(),sorter=(_status.currentPhase||player);
				evt.fixedSeat=true;
				evt.targets.sortBySeat(sorter);
				evt.targets.reverse();
				if(evt.targets[evt.targets.length-1]==sorter){
					evt.targets.unshift(evt.targets.pop());
				}
			}
			"step 2"
			ui.clear();
			var num;
			if(event.targets){
				num=event.targets.length;
			}
			else{
				num=game.countPlayer();
			}
			var cards=get.cards(num);
			game.cardsGotoOrdering(cards).relatedEvent=event.getParent();
			var dialog=ui.create.dialog('开仓赈粮',cards,true);
			_status.dieClose.push(dialog);
			dialog.videoId=lib.status.videoId++;
			game.addVideo('cardDialog',null,['开仓赈粮',get.cardsInfo(cards),dialog.videoId]);
			event.getParent().preResult=dialog.videoId;
			game.broadcast(function(cards,id){
				var dialog=ui.create.dialog('开仓赈粮',cards,true);
				_status.dieClose.push(dialog);
				dialog.videoId=id;
			},cards,dialog.videoId);
			game.log(event.card,'亮出了',cards);
		},
		content:function(){
			"step 0"
			for(var i=0;i<ui.dialogs.length;i++){
				if(ui.dialogs[i].videoId==event.preResult){
					event.dialog=ui.dialogs[i];break;
				}
			}
			if(!event.dialog){
				event.finish();
				return;
			}
			if(event.dialog.buttons.length>1){
				var next=player.chooseButton(true,function(button){
					return get.value(button.link,_status.event.player);
				});
				next.set('dialog',event.preResult);
				next.set('closeDialog',false);
				next.set('dialogdisplay',true);
				// next.set('prompt2',true);
			}
			else{
				event.directButton=event.dialog.buttons[0];
			}
			"step 1"
			var dialog=event.dialog;
			var card;
			if(event.directButton){
				card=event.directButton.link;
			}
			else{
				for(var i of dialog.buttons){
					if(i.link==result.links[0]){
						card=i.link;
						break;
					}
				}
				if(!card) card=event.dialog.buttons[0].link;
			}

			var button;
			for(var i=0;i<dialog.buttons.length;i++){
				if(dialog.buttons[i].link==card){
					button=dialog.buttons[i];
					button.querySelector('.info').innerHTML=function(target){
						if(target._tempTranslate) return target._tempTranslate;
						var name=target.name;
						if(lib.translate[name+'_ab']) return lib.translate[name+'_ab'];
						return get.translation(name);
					}(target);
					dialog.buttons.remove(button);
					break;
				}
			}
			var capt=get.translation(player)+'为'+get.translation(target)+'分配了'+get.translation(button.link);
			if(card){
				target.gain(card,'visible');
				target.$gain2(card);
				game.broadcast(function(card,id,name,capt){
					var dialog=get.idDialog(id);
					if(dialog){
						dialog.content.firstChild.innerHTML=capt;
						for(var i=0;i<dialog.buttons.length;i++){
							if(dialog.buttons[i].link==card){
								dialog.buttons[i].querySelector('.info').innerHTML=name;
								dialog.buttons.splice(i--,1);
								break;
							}
						}
					}
				},card,dialog.videoId,function(target){
					if(target._tempTranslate) return target._tempTranslate;
					var name=target.name;
					if(lib.translate[name+'_ab']) return lib.translate[name+'_ab'];
					return get.translation(name);
				}(target),capt);
			}
			dialog.content.firstChild.innerHTML=capt;
			game.addVideo('dialogCapt',null,[dialog.videoId,dialog.content.firstChild.innerHTML]);
			game.log(player,'为',target,'分配了',button.link);
			game.delay();
		},
		contentAfter:function(){
			for(var i=0;i<ui.dialogs.length;i++){
				if(ui.dialogs[i].videoId==event.preResult){
					var dialog=ui.dialogs[i];
					dialog.close();
					_status.dieClose.remove(dialog);
					if(dialog.buttons.length){
						event.remained=[];
						for(var i=0;i<dialog.buttons.length;i++){
							event.remained.push(dialog.buttons[i].link);
						}
						event.trigger('wuguRemained');
					}
					break;
				}
			}
			game.broadcast(function(id){
				var dialog=get.idDialog(id);
				if(dialog){
					dialog.close();
					_status.dieClose.remove(dialog);
				}
			},event.preResult);
			game.addVideo('cardDialog',null,event.preResult);
		},
		ai:{
			wuxie:function(){
				if(Math.random()<0.5) return 0;
			},
			basic:{
				order:3,
				useful:0.5,
			},
			result:{
				target:function(player,target){
					var sorter=(_status.currentPhase||player);
					if(get.is.versus()){
						if(target==sorter) return 1.5;
						return 1;
					}
					if(player.hasUnknown(2)){
						return 0;
					}
					return (1-get.distance(sorter,target,'absolute')/game.countPlayer())*get.attitude(player,target)>0?0.5:0.7;
				}
			},
			tag:{
				draw:1,
				multitarget:1
			}
		}
	},
	//-----------------------天火煅
	'ybsl_tianhuoduan':{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		enable:true,
		type:'basic',
		// toself:true,
		selectTarget:1,
		filterTarget:function(card,player,target){
			var he=player.getCards('he');
			var list=_status.YB_jingxieList;
			for(var i=0;i<he.length;i++){
				if(list.includes(he[i].name)) return target==player;
			}
			return false;
		},
		content:function (){
			'step 0'
			var list=_status.YB_jingxieList;
			if(player.countCards('he',function(card){
				return list.includes(card.name)
			})>0){
				player.chooseCard('he',1,true,function(card){
					var list=_status.YB_jingxieList;
					return list.includes(card.name)
				})
			}
			else{event.finish();}
			'step 1'
			player.showCards(result.cards);
			'step 2'
			var card=result.cards[0];
			var bool=(get.position(card)=='e');
			// var tag=[];
			// // if(get.cardtag(card,'gifts')){tag.push('gifts');}
			// for(var i of _status.cardtag){
			// 	if(get.cardtag(card,i)){tag.push(i);}
			// }
			if(bool) player.removeEquipTrigger(card);
			game.addVideo('skill',player,['xinfu_ybjingxie',[bool,get.cardInfo(card)]])
			game.broadcastAll(function(card,bool){
				if(card.name=='wuxinghelingshan'){card.name='zhuque'}
				if(card.name=='chiyanzhenhunqin'){card.name='zhuque'}
				if(card.name=='shandian'&&card.suit=='spade'){card.name='fulei'}
				if(card.name=='taigongyinfu'){card.name='fulei'}
				if(card.name=='hongshui'){card.name='shandian'}
				if(card.name=='huoshan'){card.name='shandian'}
				if(card.name=='wutiesuolian'){card.name='fangtian'}
				card.YB_init([card.suit,card.number,'rewrite_'+card.name,card.nature/*,tag*/]);
				//
				if (bool && card.card && player.vcardsMap?.equips) {
					const cardx = game.YB_createCard("rewrite_" + card.card.name, card.card.suit, card.card.number);
					player.vcardsMap.equips[player.vcardsMap.equips.indexOf(card.card)] = cardx;
					card.card = cardx;
				}
				//
			},card,bool);//bool
			if (bool) player.addEquipTrigger(card.card || card);
			// game.broadcastAll(function(card){
			// 	if(card.name=='wuxinghelingshan'){card.name='zhuque'}
			// 	if(card.name=='chiyanzhenhunqin'){card.name='zhuque'}
			// 	if(card.name=='shandian'&&card.suit=='spade'){card.name='fulei'}
			// 	if(card.name=='taigongyinfu'){card.name='fulei'}
			// 	if(card.name=='hongshui'){card.name='shandian'}
			// 	if(card.name=='huoshan'){card.name='shandian'}
			// 	if(card.name=='wutiesuolian'){card.name='fangtian'}
			// 	card.init([card.suit,card.number,'rewrite_'+card.name,card.nature/*,tag*/]);
			// },card);
			// if(bool){
			// 	var info=get.info(card);
			// 	if(info.skills){
			// 		for(var i=0;i<info.skills.length;i++){
			// 			player.addSkillTrigger(info.skills[i]);
			// 		}
			// 	}
			// }
		},
		// chongzhu:true,
		recastable: true,
		ai:{
			order:7,
			useful:0,
			value:4,
			result:{
				// player:1,
				target:1,
			},
		},
		selectTarget:-1,
	},
	//-----------------------毒箭
	// rewrite_du:{
	// 	type:'equip',
	// 	subtype:'equip5',
	// 	fullskin:true,
	// 	legend:true,
	// 	skills:['rewrite_du'],
	// 	ai:{
	// 		equipValue:7,
	// 		basic:{
	// 			equipValue:7,
	// 		},
	// 	},
	// 	enable:true,
	// 	selectTarget:-1,
	// 	filterTarget:function (card,player,target){
	// 		return target==player;
	// 	},
	// 	modTarget:true,
	// 	allowMultiple:false,
	// 	content:function (){
	// 		if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
	// 	},
	// 	toself:true,
	// },
	rewrite_du:{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'basic',
		enable:true,
		epic:true,
		selectTarget:1,
		filterTarget:function (card,player,target){
			return target!=player;
		},
		defaultYingbianEffect:'add',
		// 'yingbian_prompt':'当你使用此牌选择目标后，你可为此牌增加一个目标',
		// 'yingbian_tags':['add'],
		// yingbian:function (event){
		// 	event.yingbian_addTarget=true;
		// },
		content:function(){
			'step 0'
			if(typeof event.shanRequired!='number'||!event.shanRequired||event.shanRequired<0){
				event.shanRequired=1;
			}
			if(typeof event.baseDamage!='number') event.baseDamage=1;
			if(typeof event.extraDamage!='number') event.extraDamage=0;
			'step 1'
			if(event.directHit||event.directHit2||(!_status.connectMode&&lib.config.skip_shan&&!target.hasShan())){
				event._result={bool:false};
			}
			else if(event.skipShan){
				event._result={bool:true,result:'shaned'};
			}
			else{
				var next=target.chooseToUse('请使用一张闪响应毒箭');
				next.set('type','respondShan');
				next.set('filterCard',function(card,player){
					if(get.name(card)!='shan') return false;
					return lib.filter.cardEnabled(card,player,'forceEnable');
				});
				if(event.shanRequired>1){
					next.set('prompt2','（共需使用'+event.shanRequired+'张闪）');
				}
				next.set('ai1',function(card){
					var target=_status.event.player;
					var evt=_status.event.getParent();
					var bool=true;
					if(_status.event.shanRequired>1&&!get.is.object(card)&&target.countCards('h','shan')<_status.event.shanRequired){
						bool=false;
					}
					else if(target.hasSkillTag('useShan')){
						bool=true;
					}
					else if(target.hasSkillTag('noShan')){
						bool=false;
					}
					else if(get.damageEffect(target,evt.player,target,evt.card.nature)>=0) bool=false;
					if(bool){
						return get.order(card);
					}
					return 0;
				}).set('shanRequired',event.shanRequired);
				next.set('respondTo',[player,card]);
				//next.autochoose=lib.filter.autoRespondShan;
			}
			'step 2'
			if((!result||!result.bool||!result.result||result.result!='shaned')&&!event.unhurt){
				target.damage(get.nature(event.card));
				var suit=(card.suit||null);
				var num=(card.number||null);
				var nature=(card.nature||null);
				target.gain(game.createCard('du',suit,num,nature,['gifts']),'gain2')
				event.result={bool:true}
				event.trigger('rewrite_du_Damage');
			}
			else{
				event.result={bool:false}
				event.trigger('rewrite_du_Unhirt');
			}
			// target.damage(event.baseDamage||1);
		},
		ai:{
			basic:{
				order:5,
				useful:2,
				value:8,
			},
			yingbian:function (card,player,targets,viewer){
				if(get.attitude(viewer,player)<=0) return 0;
				if(game.hasPlayer(function(current){
					return !targets.includes(current)&&lib.filter.targetEnabled2(card,player,current)&&get.effect(current,card,player,player)>0;
				})) return 6;
				return 0;
			},
			result:{
				target:function (player,target,cardx){
					if(player.hasSkillTag('viewHandcard',null,target,true)) return target.countCards('h',function(card){
						return get.suit(card)!=get.suit(cardx)
					})>0?-1.5:0;
					return -1.4;
				},
			},
			tag:{
				damage:true,
			},
		},
	},
	// 'rewrite_du':{
	// 	audio:'ext:夜白神略/audio/card:true',
	// 	fullskin:true,
	// 	type:'basic',
	// 	enable:true,
	// 	epic:true,
	// 	selectTarget:1,
	// 	filterTarget:function (card,player,target){
	// 		return target!=player;
	// 	},
	// 	defaultYingbianEffect:'add',
	// // 	'yingbian_prompt':'当你使用此牌选择目标后，你可为此牌增加一个目标',
	// // 	'yingbian_tags':['add'],
	// // 	yingbian:function (event){
	// // 		event.yingbian_addTarget=true;
	// // 	},
	// 	content:function(){
	// 		target.damage(event.baseDamage||1);
	// 		var suit=(card.suit||null);
	// 		var num=(card.number||null);
	// 		var nature=(card.nature||null);
	// 		target.gain(game.createCard('du',suit,num,nature,['gifts']),'gain2')
	// 	},
	// 	ai:{
	// 		basic:{
	// 			order:5,
	// 			useful:2,
	// 			value:8,
	// 		},
	// 		yingbian:function (card,player,targets,viewer){
	// 			if(get.attitude(viewer,player)<=0) return 0;
	// 			if(game.hasPlayer(function(current){
	// 				return !targets.contains(current)&&lib.filter.targetEnabled2(card,player,current)&&get.effect(current,card,player,player)>0;
	// 			})) return 6;
	// 			return 0;
	// 		},
	// 		result:{
	// 			target:function (player,target,cardx){
	// 				if(player.hasSkillTag('viewHandcard',null,target,true)) return target.countCards('h',function(card){
	// 					return get.suit(card)!=get.suit(cardx)
	// 				})>0?-1.5:0;
	// 				return -1.4;
	// 			},
	// 		},
	// 		tag:{
	// 			damage:true,
	// 		},
	// 	},
	// },
	//---------无双铠
	ybsl_nodouble:{
		bingzhu:['吕布','吕玲绮'],
		fullskin:true,
		type:"equip",
		subtype:"equip2",
		skills:['ybsl_nodouble'],
		ai:{
			basic:{
				equipValue:7.5
			},
		},
	},
	//-----------------------乌孙
	'ybsl_wusun':{
		bingzhu:['司马懿'],
		fullskin:true,
		type:'equip',
		subtype:'equip3',
		distance:{
			globalTo:1,
		},
		ai:{
			basic:{
				order:function (card,player){
					if(player&&player.hasSkillTag('reverseEquip')){
						return 8.5-get.equipValue(card,player)/20;
					}
					else{
						return 8+get.equipValue(card,player)/20;
					}
				},
				useful:2,
				equipValue:7,
				value:function (card,player,index,method){
					if(player.isDisabled(get.subtype(card))) return 0.01;
					var value=0;
					var info=get.info(card);
					var current=player.getEquip(info.subtype);
					if(current&&card!=current){
						value=get.value(current,player);
					}
					var equipValue=info.ai.equipValue;
					if(equipValue==undefined){
						equipValue=info.ai.basic.equipValue;
					}
					if(typeof equipValue=='function'){
						if(method=='raw') return equipValue(card,player);
						if(method=='raw2') return equipValue(card,player)-value;
						return Math.max(0.1,equipValue(card,player)-value);
					}
					if(typeof equipValue!='number') equipValue=0;
					if(method=='raw') return equipValue;
					if(method=='raw2') return equipValue-value;
					return Math.max(0.1,equipValue-value);
				},
			},
			result:{
				target:function (player,target,card){
					return get.equipResult(player,target,card.name);
				},
			},
		},
	},
	//-----------------------王追
	'ybsl_wangzhui':{
		bingzhu:['张飞'],
		fullskin:true,
		type:'equip',
		subtype:'equip3',
		distance:{
			globalTo:1,
		},
		ai:{
			basic:{
				order:function (card,player){
					if(player&&player.hasSkillTag('reverseEquip')){
						return 8.5-get.equipValue(card,player)/20;
					}
					else{
						return 8+get.equipValue(card,player)/20;
					}
				},
				useful:2,
				equipValue:7,
				value:function (card,player,index,method){
					if(player.isDisabled(get.subtype(card))) return 0.01;
					var value=0;
					var info=get.info(card);
					var current=player.getEquip(info.subtype);
					if(current&&card!=current){
						value=get.value(current,player);
					}
					var equipValue=info.ai.equipValue;
					if(equipValue==undefined){
						equipValue=info.ai.basic.equipValue;
					}
					if(typeof equipValue=='function'){
						if(method=='raw') return equipValue(card,player);
						if(method=='raw2') return equipValue(card,player)-value;
						return Math.max(0.1,equipValue(card,player)-value);
					}
					if(typeof equipValue!='number') equipValue=0;
					if(method=='raw') return equipValue;
					if(method=='raw2') return equipValue-value;
					return Math.max(0.1,equipValue-value);
				},
			},
			result:{
				target:function (player,target,card){
					return get.equipResult(player,target,card.name);
				},
			},
		},
	},
	//-----------------------西极
	'ybsl_xiji':{
		bingzhu:['司马懿'],
		fullskin:true,
		type:'equip',
		subtype:'equip4',
		distance:{
			globalFrom:-1,
		},
		ai:{
			basic:{
				order:function (card,player){
					if(player&&player.hasSkillTag('reverseEquip')){
						return 8.5-get.equipValue(card,player)/20;
					}
					else{
						return 8+get.equipValue(card,player)/20;
					}
				},
				useful:2,
				equipValue:4,
				value:function (card,player,index,method){
					if(player.isDisabled(get.subtype(card))) return 0.01;
					var value=0;
					var info=get.info(card);
					var current=player.getEquip(info.subtype);
					if(current&&card!=current){
						value=get.value(current,player);
					}
					var equipValue=info.ai.equipValue;
					if(equipValue==undefined){
						equipValue=info.ai.basic.equipValue;
					}
					if(typeof equipValue=='function'){
						if(method=='raw') return equipValue(card,player);
						if(method=='raw2') return equipValue(card,player)-value;
						return Math.max(0.1,equipValue(card,player)-value);
					}
					if(typeof equipValue!='number') equipValue=0;
					if(method=='raw') return equipValue;
					if(method=='raw2') return equipValue-value;
					return Math.max(0.1,equipValue-value);
				},
			},
			result:{
				target:function (player,target,card){
					return get.equipResult(player,target,card.name);
				},
			},
		},
	},
	//-----------------------奔雷
	'ybsl_benlei':{
		bingzhu:['张郃'],
		fullskin:true,
		type:'equip',
		subtype:'equip4',
		distance:{
			globalFrom:-1,
		},
		ai:{
			basic:{
				order:function (card,player){
					if(player&&player.hasSkillTag('reverseEquip')){
						return 8.5-get.equipValue(card,player)/20;
					}
					else{
						return 8+get.equipValue(card,player)/20;
					}
				},
				useful:2,
				equipValue:4,
				value:function (card,player,index,method){
					if(player.isDisabled(get.subtype(card))) return 0.01;
					var value=0;
					var info=get.info(card);
					var current=player.getEquip(info.subtype);
					if(current&&card!=current){
						value=get.value(current,player);
					}
					var equipValue=info.ai.equipValue;
					if(equipValue==undefined){
						equipValue=info.ai.basic.equipValue;
					}
					if(typeof equipValue=='function'){
						if(method=='raw') return equipValue(card,player);
						if(method=='raw2') return equipValue(card,player)-value;
						return Math.max(0.1,equipValue(card,player)-value);
					}
					if(typeof equipValue!='number') equipValue=0;
					if(method=='raw') return equipValue;
					if(method=='raw2') return equipValue-value;
					return Math.max(0.1,equipValue-value);
				},
			},
			result:{
				target:function (player,target,card){
					return get.equipResult(player,target,card.name);
				},
			},
		},
	},
	//-----------------------照夜玉狮
	'ybsl_zhaoyeyushi':{
		bingzhu:['赵云'],
		fullskin:true,
		type:'equip',
		subtype:'equip3',
		epic:true,
		distance:{
			globalTo:2,
		},
		// enable:true,
		// selectTarget:-1,
		// filterTarget:function (card,player,target){
			// return target==player;
		// },
		// modTarget:true,
		// allowMultiple:false,
		// content:function (){
			// if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
		// },
		// toself:true,
		ai:{
			basic:{
				order:function (card,player){
					if(player&&player.hasSkillTag('reverseEquip')){
						return 8.5-get.equipValue(card,player)/20;
					}
					else{
						return 8+get.equipValue(card,player)/20;
					}
				},
				useful:2,
				equipValue:9,
				value:function (card,player,index,method){
					if(player.isDisabled(get.subtype(card))) return 0.01;
					var value=0;
					var info=get.info(card);
					var current=player.getEquip(info.subtype);
					if(current&&card!=current){
						value=get.value(current,player);
					}
					var equipValue=info.ai.equipValue;
					if(equipValue==undefined){
						equipValue=info.ai.basic.equipValue;
					}
					if(typeof equipValue=='function'){
						if(method=='raw') return equipValue(card,player);
						if(method=='raw2') return equipValue(card,player)-value;
						return Math.max(0.1,equipValue(card,player)-value);
					}
					if(typeof equipValue!='number') equipValue=0;
					if(method=='raw') return equipValue;
					if(method=='raw2') return equipValue-value;
					return Math.max(0.1,equipValue-value);
				},
			},
			result:{
				target:function (player,target,card){
					return get.equipResult(player,target,card.name);
				},
			},
		},
	},
	//-----------------------玉兰白龙驹
	'ybsl_yulanbailongju':{
		bingzhu:['赵云'],
		fullskin:true,
		type:'equip',
		subtype:'equip4',
		epic:true,
		distance:{
			globalFrom:-2,
		},
		ai:{
			basic:{
				order:function (card,player){
					if(player&&player.hasSkillTag('reverseEquip')){
						return 8.5-get.equipValue(card,player)/20;
					}
					else{
						return 8+get.equipValue(card,player)/20;
					}
				},
				useful:2,
				equipValue:7,
				value:function (card,player,index,method){
					if(player.isDisabled(get.subtype(card))) return 0.01;
					var value=0;
					var info=get.info(card);
					var current=player.getEquip(info.subtype);
					if(current&&card!=current){
						value=get.value(current,player);
					}
					var equipValue=info.ai.equipValue;
					if(equipValue==undefined){
						equipValue=info.ai.basic.equipValue;
					}
					if(typeof equipValue=='function'){
						if(method=='raw') return equipValue(card,player);
						if(method=='raw2') return equipValue(card,player)-value;
						return Math.max(0.1,equipValue(card,player)-value);
					}
					if(typeof equipValue!='number') equipValue=0;
					if(method=='raw') return equipValue;
					if(method=='raw2') return equipValue-value;
					return Math.max(0.1,equipValue-value);
				},
			},
			result:{
				target:function (player,target,card){
					return get.equipResult(player,target,card.name);
				},
			},
		},
	},
	//------------圣诞麋鹿
	ybsl_milu:{
		// bingzhu:['王朗'],
		fullskin:true,
		type:'equip',
		subtype:'equip4',
		legend:true,
		distance:{
			globalFrom:-1,
		},
		skills:['ybsl_milu'],
		ai:{
			basic:{
				order:function (card,player){
					if(player&&player.hasSkillTag('reverseEquip')){
						return 8.5-get.equipValue(card,player)/20;
					}
					else{
						return 8+get.equipValue(card,player)/20;
					}
				},
				useful:2,
				equipValue:7.1,
				value:function (card,player,index,method){
					if(player.isDisabled(get.subtype(card))) return 0.01;
					var value=0;
					var info=get.info(card);
					var current=player.getEquip(info.subtype);
					if(current&&card!=current){
						value=get.value(current,player);
					}
					var equipValue=info.ai.equipValue;
					if(equipValue==undefined){
						equipValue=info.ai.basic.equipValue;
					}
					if(typeof equipValue=='function'){
						if(method=='raw') return equipValue(card,player);
						if(method=='raw2') return equipValue(card,player)-value;
						return Math.max(0.1,equipValue(card,player)-value);
					}
					if(typeof equipValue!='number') equipValue=0;
					if(method=='raw') return equipValue;
					if(method=='raw2') return equipValue-value;
					return Math.max(0.1,equipValue-value);
				},
			},
			result:{
				target:function (player,target,card){
					return get.equipResult(player,target,card.name);
				},
			},
		},
	},
	//------------神兽羊驼
	ybsl_yangtuo:{
		// bingzhu:['孙坚'],
		fullskin:true,
		type:'equip',
		subtype:'equip3',
		legend:true,
		distance:{
			globalTo:1,
		},
		skills:['ybsl_yangtuo'],
		ai:{
			basic:{
				order:function (card,player){
					if(player&&player.hasSkillTag('reverseEquip')){
						return 8.5-get.equipValue(card,player)/20;
					}
					else{
						return 8+get.equipValue(card,player)/20;
					}
				},
				useful:2,
				equipValue:8.1,
				value:function (card,player,index,method){
					if(player.isDisabled(get.subtype(card))) return 0.01;
					var value=0;
					var info=get.info(card);
					var current=player.getEquip(info.subtype);
					if(current&&card!=current){
						value=get.value(current,player);
					}
					var equipValue=info.ai.equipValue;
					if(equipValue==undefined){
						equipValue=info.ai.basic.equipValue;
					}
					if(typeof equipValue=='function'){
						if(method=='raw') return equipValue(card,player);
						if(method=='raw2') return equipValue(card,player)-value;
						return Math.max(0.1,equipValue(card,player)-value);
					}
					if(typeof equipValue!='number') equipValue=0;
					if(method=='raw') return equipValue;
					if(method=='raw2') return equipValue-value;
					return Math.max(0.1,equipValue-value);
				},
			},
			result:{
				target:function (player,target,card){
					return get.equipResult(player,target,card.name);
				},
			},
		},
	},
	//-----------------------乌云踏雪
	'rewrite_ybsl_wangzhui':{
		bingzhu:['张飞'],
		fullskin:true,
		type:'equip',
		subtype:'equip3',
		legend:true,
		distance:{
			globalFrom:-1,
			globalTo:2,
		},
		skills:['rewrite_ybsl_wangzhui'],
		ai:{
			basic:{
				order:function (card,player){
					if(player&&player.hasSkillTag('reverseEquip')){
						return 8.5-get.equipValue(card,player)/20;
					}
					else{
						return 8+get.equipValue(card,player)/20;
					}
				},
				useful:2,
				equipValue:9.5,
				value:function (card,player,index,method){
					if(player.isDisabled(get.subtype(card))) return 0.01;
					var value=0;
					var info=get.info(card);
					var current=player.getEquip(info.subtype);
					if(current&&card!=current){
						value=get.value(current,player);
					}
					var equipValue=info.ai.equipValue;
					if(equipValue==undefined){
						equipValue=info.ai.basic.equipValue;
					}
					if(typeof equipValue=='function'){
						if(method=='raw') return equipValue(card,player);
						if(method=='raw2') return equipValue(card,player)-value;
						return Math.max(0.1,equipValue(card,player)-value);
					}
					if(typeof equipValue!='number') equipValue=0;
					if(method=='raw') return equipValue;
					if(method=='raw2') return equipValue-value;
					return Math.max(0.1,equipValue-value);
				},
			},
			result:{
				target:function (player,target,card){
					return get.equipResult(player,target,card.name);
				},
			},
		},
	},
	//-----------------------烈焰赤兔
	'rewrite_chitu':{
		bingzhu:['关羽','吕布'],
		fullskin:true,
		type:'equip',
		subtype:'equip4',
		legend:true,
		distance:{
			globalFrom:-2,
			globalTo:1,
		},
		skills:['rewrite_chitu'],
		ai:{
			basic:{
				order:function (card,player){
					if(player&&player.hasSkillTag('reverseEquip')){
						return 8.5-get.equipValue(card,player)/20;
					}
					else{
						return 8+get.equipValue(card,player)/20;
					}
				},
				useful:2,
				equipValue:9.1,
				value:function (card,player,index,method){
					if(player.isDisabled(get.subtype(card))) return 0.01;
					var value=0;
					var info=get.info(card);
					var current=player.getEquip(info.subtype);
					if(current&&card!=current){
						value=get.value(current,player);
					}
					var equipValue=info.ai.equipValue;
					if(equipValue==undefined){
						equipValue=info.ai.basic.equipValue;
					}
					if(typeof equipValue=='function'){
						if(method=='raw') return equipValue(card,player);
						if(method=='raw2') return equipValue(card,player)-value;
						return Math.max(0.1,equipValue(card,player)-value);
					}
					if(typeof equipValue!='number') equipValue=0;
					if(method=='raw') return equipValue;
					if(method=='raw2') return equipValue-value;
					return Math.max(0.1,equipValue-value);
				},
			},
			result:{
				target:function (player,target,card){
					return get.equipResult(player,target,card.name);
				},
			},
		},
	},
	//------------------方天锁链鞭（什么J8玩意）
	rewrite_fangtian:{
		bingzhu: ["吕布"],
		fullskin:true,
		type:'equip',
		subtype:'equip1',
		legend:true,
		distance:{attackFrom:-3},
		ai:{
			basic:{
				equipValue:3.5,
			}
		},
		skills:['fangtian_skill','fangtian_guozhan','rewrite_fangtian'],
	},
	'rewrite_huxinjing':{
		fullskin:true,
		type:'equip',
		subtype:'equip2',
		legend:true,
		// distance:{attackFrom:-3},
		ai:{
			basic:{
				equipValue:7,
			}
		},
		skills:['rewrite_huxinjing','rewrite_huxinjing2'],
		enable:true,
		// selectTarget:-1,
		// filterTarget:function (card,player,target){
			// return target==player;
		// },
		filterTarget:function(card,player,target){
			if(get.mode()=='guozhan'&&player!=target) return false;
			return target.canEquip(card,true);
		},
		selectTarget:function(){
			return get.mode()=='guozhan'?-1:1;
		},
		toself:false,
		modTarget:true,
		allowMultiple:false,
		content:function (){
			if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
		},
		// toself:true,
	},
	//------------------北斗七星扇
	'rewrite_zhuque':{
		bingzhu: ["诸葛亮"],
		fullskin:true,
		type:'equip',
		subtype:'equip1',
		legend:true,
		distance:{attackFrom:-3},
		ai:{
			basic:{
				equipValue:3.5,
			}
		},
		skills:['rewrite_zhuque'],
	},
	//--------------------七星龙渊剑
	'rewrite_yitianjian':{
		bingzhu: ["赵云"],
		type:'equip',
		subtype:'equip1',
		fullskin:true,
		epic:true,
		distance:{attackFrom:-2},
		skills:['rewrite_yitianjian'],
		ai:{
			equipValue:2.9,
			basic:{
				equipValue:2.9,
			},
		},
		
	},
	//--------------------原版铜雀
	'rewrite_tongque':{
		bingzhu: ["曹操"],
		type:'equip',
		subtype:'equip5',
		fullskin:true,
		legend:true,
		skills:['rewrite_tongque'],
		ai:{
			equipValue:7,
			basic:{
				equipValue:7,
			},
		},
	},
	//--------------------百鸟朝凤枪
	'ybsl_bainiaochaofeng':{
		bingzhu: ["赵云"],
		type:'equip',
		subtype:'equip1',
		fullskin:true,
		distance:{attackFrom:-2},
		skills:['ybsl_bainiaochaofeng'],
		ai:{
			equipValue:6,
			basic:{
				equipValue:6,
			},
		},
		addinfo:'霸天&nbsp; &nbsp; &nbsp; &nbsp;',
	},
	//----------------雷系
	'rewrite_fulei':{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'equip',
		subtype:'equip5',
		epic:true,
		ai:{
			basic:{
				equipValue:4.2
			}
		},
		skills:['rewrite_fulei_skill','ybsl_tianleiyubi_link','ybsl_tianleiyubi_mix1'],
	},
	'rewrite_shandian':{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'equip',
		subtype:'equip5',
		epic:true,
		ai:{
			basic:{
				equipValue:4.5
			}
		},
		skills:['rewrite_shandian_skill','ybsl_tianleiyubi_link','ybsl_tianleiyubi_mix2'],
	},
	'ybsl_tianleiyubi':{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'equip',
		subtype:'equip5',
		epic:true,
		ai:{
			basic:{
				equipValue:5.4
			}
		},
		skills:['ybsl_tianleiyubi_skill','rewrite_fulei_skill','ybsl_tianleiyubi_link',
				'rewrite_shandian_skill'],
	},
	'rewrite_ybsl_tianleiyubi':{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		legend:true,
		type:'equip',
		subtype:'equip5',
		ai:{
			basic:{
				equipValue:6.6
			}
		},
		skills:['ybsl_tianleiyubi_skill','rewrite_fulei_skill','ybsl_tianleiyubi_link',
				'rewrite_shandian_skill','rewrite_ybsl_tianleiyubi_skill'],
	},
	//-------------------大风
	'ybsl_dafeng':{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'trick',
		enable:true,
		selectTarget:1,
		filterTarget:function (card,player,target){
			return target!=player;
		},
		defaultYingbianEffect:'add',
		content:function(){
			'step 0'
			if(typeof event.baseDamage!='number') event.baseDamage=1;
			if(typeof event.extraDamage!='number') event.extraDamage=0;
			if(event.directHit) event._result={bool:false};
			else{
				var next=target.chooseToDiscard('h',{type:'basic'},'请弃置一张基本牌，否则受到一点伤害');
				next.set('ai',function(card){
					var evt=_status.event.getParent();
					if(get.damageEffect(evt.target,evt.player,evt.target)>=0) return 0;
					if(evt.player.hasSkillTag('notricksource')) return 0;
					if(evt.target.hasSkillTag('notrick')) return 0;
					return get.order(card);
				});
			}
			'step 1'
			if(result.bool==false){
				target.damage();
			}
		},
		ai:{
			basic:{
				order:5,
				useful:2,
				value:4.1,
			},
			yingbian:function (card,player,targets,viewer){
				if(get.attitude(viewer,player)<=0) return 0;
				if(game.hasPlayer(function(current){
					return !targets.includes(current)&&lib.filter.targetEnabled2(card,player,current)&&get.effect(current,card,player,player)>0;
				})) return 6;
				return 0;
			},
			result:{
				target:function (player,target,cardx){
					if(player.hasSkillTag('viewHandcard',null,target,true)) return target.countCards('h',function(card){
						return get.suit(card)!=get.suit(cardx)
					})>0?-1.5:0;
					return -1.4;
				},
			},
			tag:{
				damage:true,
			},
		},
	},
	
	//-------------------落雷
	'ybsl_luolei':{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'trick',
		enable:true,
		selectTarget:1,
		filterTarget:function (card,player,target){
			return target!=player;
		},
		defaultYingbianEffect:'add',
		content:function(){
			'step 0'
			if(typeof event.baseDamage!='number') event.baseDamage=1;
			if(typeof event.extraDamage!='number') event.extraDamage=0;
			if(event.directHit) event._result={bool:false};
			else{
				var next=target.chooseToDiscard('he',{type:'equip'},'请弃置一张装备牌，否则受到一点雷电伤害');
				next.set('ai',function(card){
					var evt=_status.event.getParent();
					if(get.damageEffect(evt.target,evt.player,evt.target)>=0) return 0;
					if(evt.player.hasSkillTag('notricksource')) return 0;
					if(evt.target.hasSkillTag('notrick')) return 0;
					if(evt.target.hasSkillTag('nothunder')) return 0;
					return get.order(card);
				});
			}
			'step 1'
			if(result.bool==false){
				target.damage('thunder');
			}
		},
		ai:{
			basic:{
				order:5,
				useful:2,
				value:4.1,
			},
			yingbian:function (card,player,targets,viewer){
				if(get.attitude(viewer,player)<=0) return 0;
				if(game.hasPlayer(function(current){
					return !targets.includes(current)&&lib.filter.targetEnabled2(card,player,current)&&get.effect(current,card,player,player)>0;
				})) return 6;
				return 0;
			},
			result:{
				target:function (player,target,cardx){
					if(player.hasSkillTag('viewHandcard',null,target,true)) return target.countCards('h',function(card){
						return get.suit(card)!=get.suit(cardx)
					})>0?-1.5:0;
					return -1.4;
				},
			},
			tag:{
				damage:1,
				natureDamage:1,
				thunderDamage:1,
			},
		},
	},
	ybsl_hsbwp:{//火烧博望坡
		audio: true,
		enable: true,
		type: "trick",
		fullskin: true,
		filterTarget: function (card, player, target) {
			return target != player;
		},
		defaultYingbianEffect: "all",
		content: function () {
			"step 0"
			var suit1=get.suit(card);
			if(event.directHit) event._result={bool:false};
			else {
				var next = target.chooseToUse(function(card,player,event){
					return get.suit(card)==suit1
						&&lib.filter.filterCard.apply(this,arguments)
						&&get.position(card)=='h';
				},'选择使用一张'+get.translation(suit1+'2')+'手牌，'+(event.card.yingbian_all?'然后':'或')+'受到'+get.translation(player)+'造成的一点火焰伤害').set('addCount',false);
				if(!event.card.yingbian_all)next.set('respondTo',[player,card]);
			}
			'step 1'
			if(!result.bool||event.card.yingbian_all){
				target.damage(player,'fire');
			}
		},
		ai:{
			tag: {
				damage: 1,
				fireDamage: 1,
				natureDamage: 1,
			},
			order:3,
			fireDamage:true,
			result:{
				target: function (player, target, card, isLink) {
					let hs = target.getCards("h"),
						eff = 2 * get.sgn(get.damageEffect(target, player, target, "fire"));
					if (isLink || !hs.length) return eff;
				},
			}
		}
	},
	//---------------流星火矢
	ybsl_meteor:{
		audio:true,
		fullskin:true,
		type:'trick',
		enable:true,
		selectTarget:-1,
		reverseOrder:true,
		defaultYingbianEffect:'remove',
		filterTarget:function(card,player,target){
			return target!=player;
		},
		content:function(){
			"step 0"
			if(typeof event.baseDamage!='number') event.baseDamage=1;
			if(typeof event.extraDamage!='number') event.extraDamage=0;
			if(event.directHit) event._result={bool:false};
			else{
				var next=target.chooseToRespond({name:'shan'});
				next.set('ai',function(card){
					var evt=_status.event.getParent();
					if(get.damageEffect(evt.target,evt.player,evt.target)>=0) return 0;
					if(evt.player.hasSkillTag('notricksource')) return 0;
					if(evt.target.hasSkillTag('notrick')) return 0;
					if(evt.target.hasSkillTag('noShan')){
						return -1;
					}
				return get.order(card);
				});
				next.autochoose=lib.filter.autoRespondShan;
			}
			"step 1"
			if(result.bool==false){
				target.damage('fire');
			}
		},
		ai:{
			wuxie:function(target,card,player,viewer){
				if(get.attitude(viewer,target)>0&&target.countCards('h','shan')){
					if(!target.countCards('h')||target.hp==1||Math.random()<0.7) return 0;
				}
			},
			basic:{
				order:9,
				useful:1,
				value:5
			},
			result:{
				target_use:function(player,target){
					if(player.hasUnknown(2)&&get.mode()!='guozhan') return 0;
					var nh=target.countCards('h');
					if(get.mode()=='identity'){
						if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
					}
					if(nh==0) return -2;
					if(nh==1) return -1.7
					return -1.5;
				},
				target:function(player,target){
					var nh=target.countCards('h');
					if(get.mode()=='identity'){
						if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
					}
					if(nh==0) return -2;
					if(nh==1) return -1.7
					return -1.5;
				},
			},
			tag:{
				respond:1,
				respondShan:1,
				damage:1,
				multitarget:1,
				multineg:1,
				fireDamage:function(card,nature){
					return 1;
				},
			}
		}
	},
	//--------------------铁骑兵锋
	ybsl_disarm:{
		audio:true,
		fullskin:true,
		type:'trick',
		enable:true,
		selectTarget:-1,
		defaultYingbianEffect:'remove',
		filterTarget:function(card,player,target){
			return target!=player;
		},
		reverseOrder:true,
		content:function(){
			"step 0"
			if(typeof event.baseDamage!='number') event.baseDamage=1;
			if(typeof event.extraDamage!='number') event.extraDamage=0;
			if(event.directHit) event._result={bool:false};
			else{
				var next=target.chooseToRespond({name:'sha'});
				next.set('ai',function(card){
					var evt=_status.event.getParent();
					if(get.damageEffect(evt.target,evt.player,evt.target)>=0) return 0;
					if(evt.player.hasSkillTag('notricksource')) return 0;
					if(evt.target.hasSkillTag('notrick')) return 0;
					return get.order(card);
				});
				next.autochoose=lib.filter.autoRespondSha;
			}
			"step 1"
			if(result.bool==false){
				event.goto(3);
			}
			else if(target.countCards('h')>0){
				target.chooseToDiscard('铁骑兵锋：请弃置一张牌，否则此【铁骑兵锋】依然造成伤害').set('ai',function(card){
					var target=_status.event.player;
					var evt=_status.event.getParent();
					var bool=true;
					if(get.damageEffect(target,evt.player,target,evt.card.nature)>=0) bool=false;
					if(bool){
						return 8-get.useful(card);
					}
					return 0;
				});
			}
			"step 2"
			if((!result||!result.bool)&&!event.unhurt){
				event.goto(3);
			}
			else{
				event.finish();
			}
			"step 3"
			target.damage(event.customSource||player);
		},
		ai:{
			wuxie:function(target,card,player,viewer){
				if(get.attitude(viewer,target)>0&&target.countCards('h','sha')){
					if(!target.countCards('h')||target.hp==1||Math.random()<0.7) return 0;
				}
			},
			basic:{
				order:9,
				useful:[5,1],
				value:5
			},
			result:{
				target_use:function(player,target){
					if(player.hasUnknown(2)&&get.mode()!='guozhan') return 0;
					var nh=target.countCards('h');
					if(get.mode()=='identity'){
						if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
					}
					if(nh==0) return -2;
					if(nh==1) return -1.7
					return -1.5;
				},
				target:function(player,target){
					var nh=target.countCards('h');
					if(get.mode()=='identity'){
						if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
					}
					if(nh==0) return -2;
					if(nh==1) return -1.7
					return -1.5;
				},
			},
			tag:{
				respond:1,
				respondSha:1,
				damage:1,
				multitarget:1,
				multineg:1,
			}
		}
	},
	//----------------生死决斗
	// ybsl_diedpk:{
	// 	global: "ybsl_diedpk_skill",
	// 	fullskin: true,
	// 	type: "trick",
	// },
	//--------------------花中四君子
	'ybsl_meihua':{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'basic',
		enable:true,
		defaultYingbianEffect:'add',
		filterTarget:function(card,player,target){
			if(get.is.versus()){
				return player.side==target.side&&(target.isTurnedOver()||target.isLinked());
			}
			else{
				return (target.isTurnedOver()||target.isLinked());
			}
		},
		selectTarget:[1,2],
		content:function(){
			'step 0'
			target.turnOver(false);
			'step 1'
			target.link(false);
		},
		ai:{
			wuxie:function(){
				return 0;
			},
			basic:{
				useful:3,
				value:3,
				order:5
			},
			result:{
				target:function(player,target){
					return 1;
				},
			},
			tag:{
				norepeat:1
			}
		},
	},
	'ybsl_lanhua':{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'basic',
		enable:true,
		defaultYingbianEffect:'add',
		filterTarget:function(card,player,target){
			if(get.is.versus()){
				return player.side==target.side;
			}
			else{
				return true;
			}
		},
		selectTarget:[1,2],
		content:function(){
			target.gainMaxHp(event.baseDamage||1);
		},
		ai:{
			basic:{
				useful:6,
				value:6,
				order:7
			},
			result:{
				target:function(player,target){
					var hs=target.maxHp;
					return Math.max(8-hs,2);
				},
			},
			tag:{
				norepeat:1
			}
		},
	},
	'ybsl_zhuzi':{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'basic',
		enable:true,
		defaultYingbianEffect:'add',
		filterTarget:function(card,player,target){
			if(get.is.versus()){
				return player.side==target.side;
			}
			else{
				return true;
			}
		},
		selectTarget:[1,2],
		content:function(){
			target.changeHujia(event.baseDamage||1);
		},
		ai:{
			wuxie:function(){
				return 0;
			},
			basic:{
				useful:6,
				value:6,
				order:7
			},
			result:{
				target:function(player,target){
					var hs=target.hp;
					return Math.max(8-hs,2);
				},
			},
			tag:{
				norepeat:1
			}
		},
	},
	'ybsl_juhua':{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'basic',
		enable:true,
		savable:true,
		defaultYingbianEffect:'add',
		filterTarget:function(card,player,target){
			if(get.is.versus()){
				return player.side==target.side&&target.hp!=target.maxHp;
			}
			else{
				return target.hp!=target.maxHp;
			}
		},
		selectTarget:[1,2],
		content:function(){
			target.recover(event.baseDamage||1);
		},
		ai:{
			basic:{
				useful:9,
				value:9,
				order:4
			},
			result:{
				target: (player, target) => {
					if (target.hasSkillTag("maixie")) return 3;
					return 2;
				},
				target_use: (player, target, card) => {
					let mode = get.mode(),
						taos = player.getCards("hs", i => get.name(i) === "ybsl_juhua" && lib.filter.cardEnabled(i, target, "forceEnable"));
					if (target !== _status.event.dying) {
						if (
							!player.isPhaseUsing() ||
							player.needsToDiscard(0, (i, player) => {
								return !player.canIgnoreHandcard(i) && taos.includes(i);
							}) ||
							player.hasSkillTag(
								"nokeep",
								true,
								{
									card: card,
									target: target,
								},
								true
							)
						)
							return 2;
						let min = 8.1 - (4.5 * player.hp) / player.maxHp,
							nd = player.needsToDiscard(0, (i, player) => {
								return !player.canIgnoreHandcard(i) && (taos.includes(i) || get.value(i) >= min);
							}),
							keep = nd ? 0 : 2;
						if (nd > 2 || (taos.length > 1 && (nd > 1 || (nd && player.hp < 1 + taos.length))) || (target.identity === "zhu" && (nd || target.hp < 3) && (mode === "identity" || mode === "versus" || mode === "chess")) || !player.hasFriend()) return 2;
						if (
							game.hasPlayer(current => {
								return player !== current && current.identity === "zhu" && current.hp < 3 && (mode === "identity" || mode === "versus" || mode === "chess") && get.attitude(player, current) > 0;
							})
						)
							keep = 3;
						else if (nd === 2 || player.hp < 2) return 2;
						if (nd === 2 && player.hp <= 1) return 2;
						if (keep === 3) return 0;
						if (taos.length <= player.hp / 2) keep = 1;
						if (
							keep &&
							game.countPlayer(current => {
								if (player !== current && current.hp < 3 && player.hp > current.hp && get.attitude(player, current) > 2) {
									keep += player.hp - current.hp;
									return true;
								}
								return false;
							})
						) {
							if (keep > 2) return 0;
						}
						return 2;
					}
					if (target.isZhu2() || target === game.boss) return 2;
					if (player !== target) {
						if (target.hp < 0 && taos.length + target.hp <= 0) return 0;
						if (Math.abs(get.attitude(player, target)) < 1) return 0;
					}
					if (!player.getFriends().length) return 2;
					let tri = _status.event.getTrigger(),
						num = game.countPlayer(current => {
							if (get.attitude(current, target) > 0) return current.countCards("hs", i => get.name(i) === "tao" && lib.filter.cardEnabled(i, target, "forceEnable"));
						}),
						dis = 1,
						t = _status.currentPhase || game.me;
					while (t !== target) {
						let att = get.attitude(player, t);
						if (att < -2) dis++;
						else if (att < 1) dis += 0.45;
						t = t.next;
					}
					if (mode === "identity") {
						if (tri && tri.name === "dying") {
							if (target.identity === "fan") {
								if ((!tri.source && player !== target) || (tri.source && tri.source !== target && player.getFriends().includes(tri.source.identity))) {
									if (num > dis || (player === target && player.countCards("hs", { type: "basic" }) > 1.6 * dis)) return 2;
									return 0;
								}
							} else if (tri.source && tri.source.isZhu && (target.identity === "zhong" || target.identity === "mingzhong") && (tri.source.countCards("he") > 2 || (player === tri.source && player.hasCard(i => i.name !== "tao", "he")))) return 2;
							//if(player!==target&&!target.isZhu&&target.countCards('hs')<dis) return 0;
						}
						if (player.identity === "zhu") {
							if (
								player.hp <= 1 &&
								player !== target &&
								taos + player.countCards("hs", "jiu") <=
									Math.min(
										dis,
										game.countPlayer(current => {
											return current.identity === "fan";
										})
									)
							)
								return 0;
						}
					} else if (mode === "stone" && target.isMin() && player !== target && tri && tri.name === "dying" && player.side === target.side && tri.source !== target.getEnemy()) return 0;
					return 2;
				},
			},					
			tag:{
				recover:1,
				save:1,
			}
		},
	},
	//----------界铜雀
	//-----------锁龙偃月刀
	rewrite_qinglong:{
		bingzhu: ["关羽", "关兴", "张苞", "关银屏"],
		fullskin:true,
		type:'equip',
		legend:true,
		subtype:'equip1',
		distance:{attackFrom:-2},
		ai:{
			equipValue:function(card,player){
				return Math.min(2.5+player.countCards('h','sha'),4);
			},
			basic:{
				equipValue:3.5
			}
		},
		skills:['rewrite_qinglong_skill','rewrite_qinglong_fengyin','qinglong_guozhan'],
	},
	//-----------桃之夭夭
	ybsl_taoyao:{
		bingzhu: ["孙尚香"],
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'equip',
		legend:true,
		subtype:'equip5',
		ai:{
			basic:{
				equipValue:7,
			}
		},
		skills:['ybsl_taoyao']
	},
	//--------------绿沉枪
	ybsl_lvchenqiang:{
		bingzhu: ["姜维"],
		type:'equip',
		subtype:'equip1',
		fullskin:true,
		epic:true,
		distance:{attackFrom:-2},
		skills:['ybsl_lvchenqiang1_skill','ybsl_lvchenqiang2_skill'],
		ai:{
			equipValue:4.2,
			basic:{
				equipValue:4.2,
			},
		},
		// enable:true,
		// selectTarget:-1,
		// filterTarget:function (card,player,target){
			// return target==player;
		// },
		// modTarget:true,
		// allowMultiple:false,
		// content:function (){
			// if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
		// },
		// toself:true,
	},
	ybsl_fuxizhenhunqin:{
		bingzhu: ["周瑜"],
		type:'equip',
		subtype:'equip1',
		fullskin:true,
		epic:true,
		distance:{attackFrom:-3},
		skills:['ybsl_fuxizhenhunqin'],
		ai:{
			equipValue:4.2,
			basic:{
				equipValue:4.2,
			},
		},
	},
	//----------之子于归
	ybsl_zhiziyugui:{
		bingzhu: ["孙尚香"],
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'equip',
		subtype:'equip2',
		onEquip:function(){
			player.recover();
		},
		onLose:function(){
			player.draw(2);
		},
		// legend:true,
		ai:{
			order:9.5,
			equipValue:function(card,player){
				if(player.hp<player.maxHp) return 6;
				return 0;
			},
			basic:{
				equipValue:5,
			},
		},
		// skills:['ybsl_zhiziyugui'],
	},
	//--------------青鳞盔
	ybsl_qinglinkui:{
		bingzhu: ["廖化"],
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'equip',
		subtype:'equip2',
		legend:true,
		ai:{
			basic:{
				equipValue:5.6,
			}
		},
		skills:['ybsl_qinglinkui'],
	},
	//--------------水镜袍
	ybsl_shuijingpao:{
		bingzhu: ["司马徽"],
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'equip',
		subtype:'equip2',
		legend:true,
		ai:{
			basic:{
				equipValue:5.6,
			}
		},
		skills:['ybsl_shuijingpao'],
	},
	//------------国士圣袍
	ybsl_guoshishengpao:{
		bingzhu: ["吕蒙"],
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'equip',
		subtype:'equip2',
		// legend:true,
		ai:{
			basic:{
				equipValue:5.2,
			}
		},
		skills:['ybsl_guoshishengpao'],
	},
	////-------------凤求凰
	ybsl_fengqiuhuang:{
		bingzhu: ["王元姬"],
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'equip',
		subtype:'equip5',
		legend:true,
		ai:{
			basic:{
				equipValue:7,
			}
		},
		skills:['ybsl_fengqiuhuang'],
	},
	//------------吴六剑
	ybsl_baihong:{
		bingzhu: ["孙权"],
		fullskin:true,
		type:'equip',
		legend:true,
		subtype:'equip1',
		distance:{attackFrom:-1},
		ai:{
			equipValue:function(card,player){
				return Math.min(2.5+player.countCards('h','sha'),4);
			},
			basic:{
				equipValue:3.5
			}
		},
		skills:['ybsl_baihong'],
	},
	ybsl_zidian:{
		bingzhu: ["孙权"],
		fullskin:true,
		type:'equip',
		legend:true,
		subtype:'equip1',
		distance:{attackFrom:-1},
		ai:{
			equipValue:function(card,player){
				return Math.min(2.5+player.countCards('h','sha'),4);
			},
			basic:{
				equipValue:4.5
			}
		},
		skills:['ybsl_zidian1','ybsl_zidian2'],
	},
	ybsl_bixie:{
		bingzhu: ["孙权"],
		fullskin:true,
		type:'equip',
		legend:true,
		subtype:'equip1',
		distance:{attackFrom:-1},
		ai:{
			equipValue:function(card,player){
				return Math.max(2.5+player.countCards('h'),5);
			},
			basic:{
				equipValue:7
			}
		},
		skills:['ybsl_bixie'],
	},
	ybsl_liuxing:{
		bingzhu: ["孙权"],
		fullskin:true,
		type:'equip',
		legend:true,
		subtype:'equip1',
		distance:{attackFrom:-1},
		ai:{
			equipValue:function(card,player){
				return Math.min(2.5+player.countCards('h','sha'),4);
			},
			basic:{
				equipValue:6.5
			}
		},
		skills:['ybsl_liuxing'],
	},
	ybsl_qingming:{
		bingzhu: ["孙权"],
		fullskin:true,
		type:'equip',
		legend:true,
		subtype:'equip1',
		distance:{attackFrom:-2},
		ai:{
			equipValue:function(card,player){
				return Math.min(2.5+player.countCards('h'),4);
			},
			basic:{
				equipValue:3.5
			}
		},
		skills:['ybsl_qingming'],
	},
	ybsl_baili:{
		bingzhu: ["孙权"],
		fullskin:true,
		type:'equip',
		legend:true,
		subtype:'equip1',
		distance:{attackFrom:-1},
		ai:{
			equipValue:function(card,player){
				return Math.min(2.5+player.countCards('h','sha'),4);
			},
			basic:{
				equipValue:3.5
			}
		},
		skills:['ybsl_baili_give','ybsl_baili_skill'],
	},
	//-------------七星刀
	ybsl_qixingdao:{
		bingzhu: ["曹操", "王允", "董卓"],
		fullskin:true,
		type:'equip',
		legend:true,
		subtype:'equip1',
		distance:{attackFrom:-1},
		ai:{
			equipValue:function(card,player){
				return Math.min(2.5+player.countCards('h','sha'),4);
			},
			basic:{
				equipValue:3.5
			}
		},
		skills:['ybsl_qixingdao'],
	},
	// 'ybsl_qixingdao':'七星刀',//2
	// 'ybsl_qixingdao_info':'锁定技，①当你使用普通【杀】造成伤害时②当你对体力值大于你的角色造成伤害时，以上每满足一条，此伤害便+1。',
	//-------------------移植
	'qicaishenlu':{
		fullskin:true,
		modeimage:'boss',
		type:'equip',
		subtype:'equip4',
		distance:{globalFrom:-1},
		skills:['qicaishenlu'],
		nomod:true,
		nopower:true,
		unique:true,
		ai:{
			equipValue:9
		}
	},
	'chiyanzhenhunqin':{
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
	'sadouchengbing':{
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
	'yihuajiemu':{
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
	ybsl_qisihuisheng:{
		audio:true,
		fullskin:true,
		type:'trick',
		enable:true,
		selectTarget:-1,
		savable:true,
		cardcolor:'red',
		toself:true,
		filterTarget:function(card,player,target){
			return target==player;
		},
		modTarget:true,
		defaultYingbianEffect:'add',
		// yingbian_prompt:'当你使用此牌选择目标后，你可为此牌增加一个目标',
		// yingbian_tags:['add'],
		// yingbian:function(event){
		// 	event.yingbian_addTarget=true;
		// },
		toself:true,
		addinfo:'霸天',
		content:function(){
			event.baseDamage=target.isDamaged()?3-target.hp:0;
			if(event.baseDamage>0) target.recover(event.baseDamage);
			var num=3-event.baseDamage;
			if(num>0)target.draw(Math.min(num,3));
		},
		ai:{
			basic:{
				order:function (card,player){
					if(player&&player.hp<3){
						return (3-player.hp)*2;
					}
					else if(player&&player.countCards('h')<3){
						return 6-player.countCards('h');
					}
					else return 0;
				},
				useful:2,
				value:8,
			},
			result:{
				player:0,
				target:6,
			},
			tag:{
				recover:1,
				save:3,
			}
		}
	},
	//---------------------煽风点火
	
	llfx_shanfengdianhuo:{
		audio:true,
		fullskin:true,
		type:'trick',
		enable:true,
		filterTarget:function(card,player,target){
			if(ui.selected.targets.length>0){
				for(var i of ui.selected.targets){
					var targets=game.filterPlayer(function(current){
						return i.inRange(current)
					}).sortBySeat();
					for(var k of game.filterPlayer()){
						if(targets.length>0){
							if(targets.includes(k))k.prompt('被火杀');
							else k.prompt('');
						}
						else k.prompt('');
					}
				}
			}
			return target!=player;
		},
		modTarget:true,
		defaultYingbianEffect:'add',
		addinfo:'蕾厉风行',
		content:function(){
			var targets=game.filterPlayer(function(current){
				return target.inRange(current)
			}).sortBySeat();
			if(targets.length>0)target.useCard({name:'sha',nature:'fire'},targets);
		},
		ai:{
			order:7,
			result:{
				target:function(player,target){
					var num=0;
					game.countPlayer(function(current){
						if(target.inRange(current)){
							var att=get.attitude(player,current);
							var eff=get.effect(current,{name:'sha',nature:'fire'},target,player);
							if(att>0)num++;
							else num--;
							if(eff>0)num-=2;
							else num+=2;
						}
					});
					return num;
				}
			}
		}
	},
}