import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

const skill = {
	//-------------------------林逸
	'xhly_tiancan':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'useCard',
		},
		filter:function(e,p){
			if(e.player==p)return false;
			return e.player.countCards('h')<=p.countCards('h');
		},
		content:function(){
			player.viewHandcards(trigger.player);
		},
	},
	'xhly_baihe':{
		audio:'ext:夜白神略/audio/character:2',
		init:function(player,skill){
			player.storage.xhly_baihe_list=lib.skill.xhly_baihe.getBaihe(player);
		},
		getBaihe:function(player){
			return ['sha','shan','tao','jiu'];
		},
		mark:true,
		marktext:'鹤',
		intro:{
			content:function(storage,player,skill){
				var str='';
				var list=lib.skill.xhly_baihe.getBaihe(player),list2=player.storage.xhly_baihe_list;
				str+='';
				for(var j=0;j<list.length;j++){
					if(j!=0)str+='、';
					if(!list2.includes(list[j])){str+='<span class=greentext>'+get.translation(list[j])+'</span>'}
					else{str+=get.translation(list[j]);}
				}
				return str;
			}
		},
		trigger:{
			player:'useCard1',
			target:'useCardToTargeted',
		},
		forced:true,
		filter:function(event,player){
			if(!player.storage.xhly_baihe_list.includes(event.card.name))return false;
			return true;
		},
		content:function(){
			'step 0'
			player.storage.xhly_baihe_list.remove(trigger.card.name);
			'step 1'
			if(player.storage.xhly_baihe_list.length==0){
				player.storage.xhly_baihe_list=lib.skill.xhly_baihe.getBaihe(player);
				player.gainMaxHp();
				player.recover();
			}
			else{
				event.finish();
			}
		},
	},
	'xhly_wuji':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{global:'useCard1'},
		direct:true,
		filter:(e,p,c)=>{
			if(p.hasSkill('xhly_wuji_block'))return false;
			if(get.suit(e.cards[0])==null)return false;
			return get.type2(e.card)!='equip';
		},
		init:function(player,skill){
			if(!player.storage.xhly_wuji_wuji)player.storage.xhly_wuji_wuji=[];
		},
		// content:()=>{
		// 	'step 0'
		// 	event.name=trigger.card.name;
		// 	event.suit=get.suit(trigger.cards[0]);
		// 	player.chooseControl('学习','cancel2').set('prompt2','是否学习'+get.translation(event.name)+'的'+get.translation(event.suit)+'变化？');
		// 	'step 1'
		// 	if(result.control=='cancel2'){event.finish();}
		// 	'step 2'
		// 	if(!player.storage.xhly_wuji_wuji.contains(event.name)){
		// 		player.storage.xhly_wuji_wuji.push(event.name);
		// 	}
		// 	if(!player.storage.xhly_wuji_wuji[event.name]){
		// 		player.storage.xhly_wuji_wuji[event.name]=[];
		// 	}
		// 	'step 3'
		// 	if(!(player.storage.xhly_wuji_wuji[event.name]).contains(event.suit)){
		// 		player.storage.xhly_wuji_wuji[event.name].push(event.suit);
		// 		player.addTempSkill('xhly_wuji_block');
		// 		game.log(player,'学到了，'+get.translation(event.name)+'的'+get.translation(event.suit)+'变化');
		// 	}
		// 	else{game.log(player,'，你好像已经学会了哦，'+get.translation(event.name)+'的'+get.translation(event.suit)+'变化')}
		// },
		content:function*(event,map){
			let player=map.player,trigger=map.trigger;
			let name=trigger.card.name,suit=get.suit(trigger.cards[0]);
			var result = yield player.chooseControl('学习','cancel2').set('prompt2','是否学习'+get.translation(event.name)+'的'+get.translation(event.suit)+'变化？');
			if(result.control=='cancel2'){event.finish();}
			else{
				if(!player.storage.xhly_wuji_wuji.includes(name)){
					player.storage.xhly_wuji_wuji.push(name);
				}
				if(!player.storage.xhly_wuji_wuji[name]){
					player.storage.xhly_wuji_wuji[name]=[];
				}
				if(!(player.storage.xhly_wuji_wuji[name]).includes(suit)){
					player.storage.xhly_wuji_wuji[name].push(suit);
					player.addTempSkill('xhly_wuji_block');
					game.log(player,'学到了，'+get.translation(name)+'的'+get.translation(suit)+'变化');
				}
				else{game.log(player,'，你好像已经学会了哦，'+get.translation(name)+'的'+get.translation(suit)+'变化')}
			}
		},
		mark:true,
		marktext:'武',
		intro:{
			name:'学会的武技',
			content:function(storage,player,skill){
				var str='<br>';
				for(var i of player.storage.xhly_wuji_wuji){
					str+=get.translation(i);
					str+='：';
					str+=get.translation(player.storage.xhly_wuji_wuji[i]);
					str+='<br>';
				};
				return str;
			},
		},
		group:['xhly_wuji_draw','xhly_wuji_use'],
		subSkill:{
			block:{onremove:true,},
		},
	},
	xhly_wuji_use:{
		enable:['chooseToUse','chooseToRespond'],
		name:'武技',
		filter:function (event,player){
			if(player.countCards('h',function(card){
				return card.hasGaintag('xhly_wuji_draw');
			})<1) return false;
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;
			for(var i of player.storage.xhly_wuji_wuji){
				if(evt({name:i},player,event)) return true;
			};
			return false;
		},
		chooseButton:{
			dialog:function (event,player){
				// player.countCards('h',function(card){
				// 	if(card.hasGaintag('xhly_wuji_draw'))card.classList.add('thrownhighlight');
				// })
				var list=[];
				for(var i=0;i<lib.inpile.length;i++){
					if(player.storage.xhly_wuji_wuji.includes(lib.inpile[i])){
						list.push(['<span style=\"color:#e328b7\">'+get.YB_tobo2(player.storage.xhly_wuji_wuji[lib.inpile[i]])+'</span>',,lib.inpile[i]]);
					}
				}
				return ui.create.dialog('万能武技','可转化为目标牌的花色标记在牌的左上角',[list,'vcard']);
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
					filterCard:function(card,player){
						var suit=get.suit(card);
						var list=player.storage.xhly_wuji_wuji[links[0][2]];
						for(var i of list){
							if(i==suit)return card.hasGaintag('xhly_wuji_draw');
						}
						return false;
					},
					selectCard:1,
					complexCard:true,
					position:'h',
					popname:true,
					viewAs:{name:links[0][2]},
					precontent:function(){
						player.logSkill('xhly_wuji_use');
					},
				};
			},
			prompt:function (links,player){
				return '将一张真气牌当作'+get.translation(links[0][2])+'使用';
			},
		},
		hiddenCard:function (player,name){
			return player.storage.xhly_wuji_wuji.includes(name)&&player.countCards('h')>=1;
		},
		ai:{
			fireAttack:true,
			respondSha:true,
			respondShan:true,
			skillTagFilter:function (player){
				if(player.countCards('h')<1) return false;
			},
			order:1,
			result:{
				player:function (player){
					if(_status.event.dying) return get.attitude(player,_status.event.dying);
					return 1;
				},
			},
		},
		
	},
	xhly_wuji_draw:{
		trigger:{
			player:'gainEnd',
		},
		filter:function(event,player){
			return (event.getParent(2).name=='phaseDraw')&&event.player.countCards('h');
		},
		direct:true,
		content:function(){
			'step 0'
			trigger.player.addGaintag(trigger.cards,'xhly_wuji_draw');
		},
	},
	'xhly_duotian':{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{player:'phaseDrawBegin2'},
		filter:(e,p)=>{return p.storage.xhly_duotian_ey},
		content:()=>{
			'step 0'
			trigger.num+=player.storage.xhly_duotian_ey;
			'step 1'
			player.storage.xhly_duotian_ey=0;
		},
		mark:true,
		intro:{
			content:function(event,player,storage){
				if(player.storage.xhly_duotian_ey)return get.translation(player.storage.xhly_duotian_ey);
				return '0';
			},
		},
		group:['xhly_duotian_ey'],
		derivation:'xhly_duotian_ey',
		subSkill:{
			ey:{
				name:'夺天',
				audio:'xhly_duotian',
				trigger:{player:['loseAfter','cardsDiscardAfter','loseAsyncAfter'],},
				filter:function(event,player){
					return true;
				},
				// preHidden:true,
				frequent:function(event,player){
					if(!player.storage.xhly_duotian_ey||event.num>player.storage.xhly_duotian_ey)return true;
					else if(player.storage.xhly_duotian_ey&&player.storage.xhly_duotian_ey<=event.num)return false;
				},
				prompt:'是否记录此次失去牌的数量？',
				content:()=>{player.storage.xhly_duotian_ey=trigger.num},
				check:function(event,player){
					if(!player.storage.xhly_duotian_ey||event.num>player.storage.xhly_duotian_ey)return true;
				},
			},
		},
	},
	//---------------------张龙李妖
	'xhzlly_guihuo':{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:"damageBegin4",
			source:"damageBegin2",
		},
		filter:function(event){
			if(event._notrigger.includes(event.player)) return false;
			return event.source&&event.player&&
			event.player.isIn()&&event.source.isIn()&&event.source!=event.player;
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
			trigger.num++;
			if(!trigger.xhzlly_guihuo)trigger.xhzlly_guihuo=[];
			trigger.xhzlly_guihuo.add(player);
		},
		group:['xhzlly_guihuo_add','xhzlly_guihuo_ddd'],
		subSkill:{
			ddd:{
				trigger:{
					player:"damageEnd",
					source:"damageSource",
				},
				forced:true,
				filter:function(event,player){
					if(!event.xhzlly_guihuo)return false;
					if(!event.xhzlly_guihuo.includes(player))return false;
					if(event._notrigger.includes(event.player)) return false;
					return event.source&&event.player&&
					event.player.isIn()&&event.source.isIn()&&event.source!=event.player;
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
					"step 0"
					event.target=lib.skill.xhzlly_guihuo_ddd.logTarget(trigger,player);
					"step 1"
					if(player&&target&&player.isIn()&&target.isIn()){
						if(target.countGainableCards(player,'hej')){
							player.gainPlayerCard('hej',target,true);
						}
					}
				},
			},
			add:{
				trigger:{
					player:"die",
				},
				forced:true,
				forceDie:true,
				skillAnimation:true,
				animationColor:"gray",
				filter:function(event){
					return event.source&&event.source.isIn();
				},
				content:function(){
					trigger.source.addSkill('xhzlly_guihuo');
				},
				logTarget:"source",
			}
		}
	},
	/*
	'xhzlly_guihuo':'诡祸',
	'xhzlly_guihuo_info':'锁定技，当你对其他角色造成伤害时或受到其他角色造成的伤害时，此伤害+1，然后若双方均存活，你获得对方的一张牌；锁定技，杀死你的角色获得【诡祸】。',
	*/
	/*
	_ybxh_neijialiupai:{
		charlotte:true,
		direct:true,
		ruleSkill:true,
		trigger:{
			player:'phaseDrawAfter',
		},
		filter:function(event,player){
			if(!player.hasXhclan('内家流派'))return false;
			return event.player.getHistory('gain',function(evt){
				return evt.getParent('phaseDraw')==event;
			}).length>0;
		},
		
	},
	*/
}