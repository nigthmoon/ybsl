import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

/** @type { importCharacterConfig['skill'] } */
const skill = {
	//---------------六艺篇
	'_ybsl_sixart':{
		enable:'phaseUse',
		usable:1,
		filterCard:true,
		check:function(card){
			if(card.name=='du') return 20;
			var player=_status.event.player;
			var nh=player.countCards('h');
			if(!player.needsToDiscard()){
				if(nh<3) return 0;
				if(nh==3) return 5-get.value(card);
				return 7-get.value(card);
			}
			return 10-get.useful(card);
		},
		discard:false,
		lose:false,
		delay:false,
		selectCard:function(){
			var player=_status.event.player;
			if(!player.hasSkillTag('sixartSkill'))return 1;
			var max=6;
			var num=max-player.countCards('s',function(card){
				return card.hasGaintag('_ybsl_sixart')
			});
			if(num>3){num=3};
			return [1,num];
		},
		prompt:function (player){
			var player=_status.event.player;
			var max=6;
			var num=max-player.countCards('s',function(card){
				return card.hasGaintag('_ybsl_sixart')
			});
			if(num>3){num=3};
			if(!player.hasSkillTag('sixartSkill')||num==1){
				return '是否将一张牌置入六艺区';
			}
			else{
				return '是否将一至'+get.cnNumber(num)+'张牌置入六艺区';
			}
		},
		filter:function(event,player){
			var max=6;
			return player.countCards('h')>0&&player.countCards('s',function(card){return card.hasGaintag('_ybsl_sixart')})<max;
		},
		content:function(){
			'step 0'
			player.loseToSpecial(cards,'_ybsl_sixart').gaintag=['_ybsl_sixart'];
			//player.storage._ybsl_artlist.push(cards);失败的写法
			game.log(player,'将',get.cnNumber(cards.length),'张牌置入了六艺区');
			player.addMark('_ybsl_sixart',cards.length);
			player.updateMarks();
			'step 1'
			if(player.countCards('s',function(card){return card.hasGaintag('_ybsl_sixart')})>2){
				player.addTempSkill('ybsl_master',{player:'phaseBeginStart'});
			}
		},
		ai:{
			order:function(){
				var player=_status.event.player;
				if(player.hasSkillTag('sixartSkill'))return 8;
				return 2;
			},
			expose:0.1,
			result:{
				player:1,
			}
		},
		ruleSkill:true,
		mark:true,
		marktext:'艺',
		intro:{
			name:'六艺',
			content:function(storage,player,skill){
				var str='共有';
				//str+=player.storage._ybsl_sixart;
				str+=player.countCards('s',function(card){return card.hasGaintag('_ybsl_sixart')});
				str+='/';
				str+='6';
				str+='张六艺牌';
				return str;
			}
		},
	},
	'_ybsl_sixart2':{
		trigger:{
			player:['loseAfter','useCard','respond','equipEnd','loseAsyncAfter','cardsDiscardAfter'],
		},
		direct:true,
		ruleSkill:true,
		filter:function(event,player){
			return player.getHistory('lose',function(evt){
				if(evt.getParent()!=event) return false;
				for(var i in evt.gaintag_map){
					if(evt.gaintag_map[i].includes('_ybsl_sixart')) return true;
				}
				return false;
			}).length>0;
			
			//var evt=event.getl(player);
			//return evt&&evt.player==player&&evt.cards('s',function(card){return card.hasGaintag('_ybsl_sixart')})&&evt.cards('s',function(card){return card.hasGaintag('_ybsl_sixart')}).length>0;
		},
		content:function(){
			'step 0'
			var cards=trigger.cards.filter(function(card){
				return player.getHistory('lose',function(evt){
					if(evt.getParent()!=event) return false;
					for(var i in evt.gaintag_map){
						if(evt.gaintag_map[i].includes('_ybsl_sixart')) return true;
					}
					return false;
				});
			});
			//player.storage._ybsl_artlist.remove(cards);
			player.removeMark('_ybsl_sixart',cards.length);
			player.updateMarks();
			if(player.hasSkill('ybsl_master')){
				game.log('调试1',cards.length);
				player.draw(cards.length);
			}
		},
	},
	'ybsl_master':{charlotte:true,},
	//-----------------六艺应用
	yb013_shanwu:{
		inherit:'yb017_shanwu',
		audio:'dz013_shanwu',
	},
	yb016_shanwu:{
		inherit:'yb017_shanwu',
		audio:'dz016_shanwu',
	},
	//-----------------六艺——善舞
	'yb017_shanwu':{
		audio:'dz017_shanwu',
		group:['yb017_shanwu_sha','yb017_shanwu_shan'],
		audioname2:{
			ybart_013yinji:'yb013_shanwu',
			dzsl_013yinji:'dz013_shanwu',
			dzsl_014xinzhikui:'dz014_shanwu',
			ybart_016manchengqi:'yb016_shanwu',
			dzsl_016manchengqi:'dz016_shanwu',
			ybold_018zhangqing:'yb018_shanwu',
		},
		subSkill:{
			sha:{
				audio:'dz017_shanwu',
				audioname2:{
					ybart_013yinji:'yb013_shanwu',
					dzsl_013yinji:'dz013_shanwu',
					dzsl_014xinzhikui:'dz014_shanwu',
					ybart_016manchengqi:'yb016_shanwu',
					dzsl_016manchengqi:'dz016_shanwu',
					ybold_018zhangqing:'yb018_shanwu',
				},
				enable:['chooseToUse','chooseToRespond'],
				filterCard:function(card){
					return card.hasGaintag('_ybsl_sixart');
				},
				viewAs:{name:'sha'},
				viewAsFilter:function(player){
					if(!player.countCards('s')) return false;
				},
				position:'s',
				prompt:'将一张六艺牌当杀使用或打出',
				check:function(){return 1},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondSha')&&current<0) return 0.6;
						}
					},
					respondSha:true,
					sixartSkill:true,
					skillTagFilter:function(player){
						if(!player.countCards('s')) return false;
					},
					order:function(){
						return get.order({name:'sha'})+0.1;
					},
					useful:-1,
					value:-1
				}
			},
			shan:{
				audio:'dz017_shanwu',
				audioname2:{
					ybart_013yinji:'yb013_shanwu',
					dzsl_013yinji:'dz013_shanwu',
					dzsl_014xinzhikui:'dz014_shanwu',
					ybart_016manchengqi:'yb016_shanwu',
					dzsl_016manchengqi:'dz016_shanwu',
					ybold_018zhangqing:'yb018_shanwu',
				},
				enable:['chooseToRespond','chooseToUse'],
				filterCard:function(card){
					return card.hasGaintag('_ybsl_sixart');
				},
				viewAs:{name:'shan'},
				prompt:'将一张六艺牌当闪使用或打出',
				check:function(){return 1},
				position:'s',
				viewAsFilter:function(player){
					if(!player.countCards('s')) return false;
				},
				ai:{
					sixartSkill:true,
					respondShan:true,
					skillTagFilter:function(player){
						if(!player.countCards('s')) return false;
					},
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondShan')&&current<0) return 0.6;
						}
					},
					order:4,
					useful:-1,
					value:-1
				}
			}
		},
		ai:{
			sixartSkill:true,
		},
		derivation:['_ybsl_sixart','ybsl_master'],
	},
	//-----------------六艺——鹿鸣
	'yb017_luming':{
		audio:'dz017_zhushi_shibai',
		enable:'phaseUse',
		viewAsFilter:function(player){
			return player.countCards('hs')>0;
		},
		viewAs:{name:'ybsl_lumingqianzhuan'},
		filterCard:function(card,player){
			var suit=get.suit(card);
			var list=player.storage.yb017_luming_block;
			for(var i=0;i<list.length;i++){
				if(suit==list[i]){
					return false;
				}
			}
			return true;
		},
		prompt:function (player){
			var player=_status.event.player;
			var str='是否将一张手牌当【鹿鸣千转】使用？';
			if(!player.storage.yb017_luming_block==[]){
				str+='<br>不能使用以下花色：';
				str+=get.translation(player.storage.yb017_luming_block);
			}
			return str;
		},
		position:'hs',
		check:function(card){
			return 7-get.value(card);
		},
		reset:function(player){
			player.addTempSkill('yb017_luming_block');
			player.storage.yb017_luming_block=[];
			game.log(player,'重置了鹿鸣的花色');
		},
		group:['yb017_luming_2','yb017_luming_reset'],
		mark:true,
		marktext:'鹿',
		intro:{
			content:function(storage,player){
				var str='已用过';
				var list=player.storage.yb017_luming_block;
				for (var i=0;i<list.length;i++){
					str+=get.translation(list[i]);
				}
				return str;
			},
		},
		init:function(player){
			lib.skill.yb017_luming.reset(player);
		},
		derivation:['ybsl_lumingqianzhuan'],
		subSkill:{
			2:{
				trigger:{player:'useCard'},
				silent:true,
				filter:function(event,player){
					return event.skill=='yb017_luming'/*&&Array.isArray(event.respondTo)*/;
					game.log(Array.isArray(event.respondTo));
				},
				content:function(){
					player.storage.yb017_luming_block.push(trigger.card.suit);
					game.log(player,'的鹿鸣记录了',trigger.card.suit);
				},
			},
			block:{
				onremove:function(player){
					lib.skill.yb017_luming.reset(player);	
				}
			},
			reset:{
				charlotte:true,
				forced:true,
				direct:true,
				trigger:{
					global:'phaseBefore',
					player:['phaseUseBefore','phaseUseAfter','enterGame'],
					source:['die'],
				},
				content:function(){
					lib.skill.yb017_luming.reset(player);			
				},
			},
		}
	},
	//-----------------------征雄
	'yb017_zhengxiong':{
		audio:'dz017_zhushi_buff',
		trigger:{
			source:'damageAfter',
		},
		intro:{
			content:'已经征服了$',
		},
		filter:function(event,player){
			return (!player.storage.yb017_zhengxiong||!player.storage.yb017_zhengxiong.includes(event.player))&&event.player.hasSex('male');
		},
		content:function(){
			'step 0'
			player.draw(2);
			player.storage.yb017_zhengxiong.add(trigger.player);
			player.markSkill('yb017_zhengxiong');
			player.addTempSkill('yb017_zhengxiong_block');
			'step 1'
			if(player.countCards('s',function(card){return card.hasGaintag('_ybsl_sixart')})<6){
				player.chooseCard('h',1,true);
			}
			'step 2'
			if(result.bool){
				player.loseToSpecial(result.cards,'_ybsl_sixart').gaintag=['_ybsl_sixart'];
				game.log(player,'将',get.cnNumber(1),'张牌置入了六艺区');
				player.addMark('_ybsl_sixart',1);
				player.updateMarks();
			}
		},
		init:function(player,skill){
			player.storage.yb017_zhengxiong=[];
		},
		group:'yb017_zhengxiong_buff',
		subSkill:{
			buff:{
				audio:'dz017_zhushi_buff',
				trigger:{
					global:'phaseBegin',
				},
				direct:true,
				forced:true,
				charlotte:true,
				content:function(){
					player.storage.yb017_zhengxiong=[];
				},
				sub:true,
			},
			block:{
				onremove:function(player){
					player.storage.yb017_zhengxiong=[];
				}
			}
		}
	},			
	//-----------------六艺——聚心
	'yb041_juxin':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		filterCard:true,
		filterTarget:function(card,player,target){
			return target!=player&&target.countCards('he')>0;
		},
		check:function(card){//主动技选牌ai，括号里参数是card
			return 7-get.value(card);//弃置价值小于4的牌
		},
		ai:{
			threaten:1.1,//嘲讽值
			expose:1,
			order:8,//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
			result:{//主动技的收益
				target:function(player,target){
					return -1;
				},
			},
		},
		filter:function(event,player){
			var max=6;
			return player.countCards('h')>0&&player.countCards('s',function(card){return card.hasGaintag('_ybsl_sixart')})<max;
		},
		selectCard:function(){
			var player=_status.event.player;
			if(!player.hasSkillTag('sixartSkill'))return 1;
			var max=6;
			var num=max-player.countCards('s',function(card){
				return card.hasGaintag('_ybsl_sixart')
			});
			return [1,num];
		},
		selectTarget:function(){
			if(ui.selected.targets.length>ui.selected.cards.length){
				game.uncheck('target');
			}
			return ui.selected.cards.length;
		},
		position:'h',
		check:function(card){
			return 6-get.value(card);
		},
		content:function(){
			'step 0'
			if(target.countCards('he')>=1){
				player.choosePlayerCard(target,'he',true);
			}
			else(event.goto(4))
			'step 1'
			player.showCards(result.cards);
			event.cards2=result.cards;
			'step 2'
			target.$give(event.cards2,player,false);
			target.loseToSpecial(event.cards2,'_ybsl_sixart',player).visible=true;
			game.log(player,'将',target,'的',get.cnNumber(1),'张牌置入了六艺区');
			player.addMark('_ybsl_sixart',1);
			player.updateMarks();
			if(player.countCards('s',function(card){return card.hasGaintag('_ybsl_sixart')})>2){
				player.addTempSkill('ybsl_master',{player:'phaseBeginStart'});
			}
		}
	},
	'yb041_sange':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseJieshuBegin',
		},
		prompt:'是否弃置六艺区所有牌？',
		filter:function(event,player){
			return (player.countCards('s',function(card){return card.hasGaintag('_ybsl_sixart')})>0)
		},
		content:function(){
			'step 0'
			event.num=player.countCards('s',function(card){return card.hasGaintag('_ybsl_sixart')});
			event.cards=player.getCards('s',function(card){return card.hasGaintag('_ybsl_sixart')})
			'step 1'
			player.discard(event.cards);
			player.removeMark('_ybsl_sixart',event.num);
			player.updateMarks();
			if(player.hasSkill('ybsl_master')){
				game.log('调试2',event.num);
				player.draw(event.num);
			}
			'step 2'
			if(event.num>=1)player.draw();
			'step 3'
			if(event.num>=2)player.recover();
			'step 4'
			if(event.num>=3)player.gainMaxHp();
			'step 5'
			if(event.num>=4)player.chooseTarget([1,3],lib.filter.notMe,'选择至多三名其他角色，依次弃置其各一张牌。').set('ai',function(target){
				return -get.attitude(_status.event.player,target);
			});
			'step 6'
			if(result.targets){
				event.targets=result.targets;
			}
			else{
				delete result.targets;
				event.goto(12);
			}
			'step 7'
			event.numb=0;
			'step 8'
			event.numb++;
			if(event.targets.length>0&&event.targets[0].countCards('he')>=1){
				player.discardPlayerCard(event.targets[0],'he',true);
			}
			else{
				event.goto(11);
			}
			'step 9'
			event.cards2=result.cards;
			'step 10'
			event.cards.push(event.cards2);
			'step 11'
			event.targets.remove(event.targets[0]);
			if(event.numb<cards.length){
				game.log('GO');
				event.goto(8);
			}
			else{
				game.log('END');
				delete result.targets;
				delete event.targets;
				event.goto(12);
			}
			'step 12'
			if(event.num>=6){
				player.chooseTarget(1,lib.filter.notMe,'令一名其他角色获得所有以此法弃置的牌').set('ai',function(card){
					return get.attitude(_status.event.player,card);
				});
			}
			else{
				event.finish();
			}
			'step 13'
			if(result.bool){
				game.log(result.targets[0],event.cards,event.cards.length);
				for(var i=0;i<event.cards.length;i++){
					result.targets[0].gain(event.cards[i],'gain2');
				}
			}
		},
		check:function(event,player){//触发技ai，括号里参数是event,plater
			if(player.hasSkill('ybsl_master'))return true;//如果你有精艺就发动
			else return false;//否则不发动
		},
		ai:{
			sixartSkill:true,
			expose:0.3,
		},
		derivation:['_ybsl_sixart','ybsl_master'],
	},
	yb014_shifu:{
		audio:'ext:夜白神略/audio/character:1',
		enable:'chooseToUse',
		derivation:['_ybsl_sixart','ybsl_master'],
		filter:function(event,player){
			return event.type!='wuxie'&&player.countCards('s',function(card){
				return card.hasGaintag('_ybsl_sixart')
			})>0;
		},
		hiddenCard:function(player,name){
			return (!player.getStorage('yb014_shifu_block').includes(name)&&player.countCards('s',function(card){
				return card.hasGaintag('_ybsl_sixart')
			})>0&&lib.inpile.includes(name));
		},
		init:function(player){
			if(!player.storage.yb014_shifu_block) player.storage.yb014_shifu_block=[];
		},
		onremove:true,
		chooseButton:{
			dialog:function(event,player){
			var list=[];
				for(var i=0;i<lib.inpile.length;i++){
					var name=lib.inpile[i];
					if(player.storage.yb014_shifu_block&&player.storage.yb014_shifu_block.includes(name)) continue;
					if(get.type(name)=='trick') list.push(['锦囊','',name]);
				}
				if(list.length==0){
					return ui.create.dialog('诗赋已无可用牌');
				}
				return ui.create.dialog('诗赋',[list,'vcard']);
			},
			filter:function(button,player){
				return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
			},
			check:function(button){
				var player=_status.event.player;
				if(button.link[2]=='wugu') return 0;
				var effect=player.getUseValue(button.link[2]);
				if(effect>0) return effect;
				return 0;
			},
			backup:function(links,player){
				return {
					filterCard:function(card,player){
						return card.hasGaintag('_ybsl_sixart');
					},
					audio:'yb014_shifu',
					selectCard:1,
					popname:true,
					check:function(card){
						return 6-get.value(card);
					},
					position:'s',
					viewAs:{name:links[0][2],nature:links[0][3]},
					onuse:function(result,player){
						player.storage.yb014_shifu_block.add(result.card.name);
					},
				}
			},
			prompt:function (links,player){
				return '将一张六艺牌当作'+get.translation(links[0][2])+'使用';
			},
		},
		ai:{
			sixartSkill:true,
			order:4,
			result:{
				player:function(player){
					var allshown=true,players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i].ai.shown==0){
							allshown=false;
						}
						if(players[i]!=player&&players[i].countCards('h')&&get.attitude(player,players[i])>0){
							return 1;
						}
					}
					if(allshown) return 1;
					return 0;
				}
			},
			threaten:1.9,
		},
		group:['yb014_shifu5']
	},
	yb014_shifu5:{
		audio:'yb014_shifu',
		enable:'chooseToUse',
		prompt:'将一张六艺牌当做无懈可击使用',
		viewAsFilter:function(player){
			return !player.getStorage('yb014_shifu_block').includes('wuxie')&&player.countCards('s',function(card){
				return card.hasGaintag('_ybsl_sixart')
			});
		},
		onuse:function(result,player){
			player.storage.yb014_shifu_block.add('wuxie');
		},
		filterCard:function(card,player){
			return card.hasGaintag('_ybsl_sixart');
		},
		position:'s',
		selectCard:1,
		viewAs:{name:'wuxie'},
	},
	yb014_shifu_backup:{},
	'yb014_shifu2':{
		direct:true,
		charlotte:true,
		trigger:{
			player:['useCardAfter','damageAfter','phaseBegin'],
		},
		content:function(){
			'step 0'
			event.num=11;
			if(event.triggername=='useCardAfter'){
				// if(trigger.skill=='yb014_shifu_backup'||trigger.skill=='yb014_shifu5'){
				if(trigger.card.isCard&&trigger.cards.length==1){
					event.num=13;
				}
				else{
					event.num=7;
				} 
			}
			if(event.triggername=='phaseBegin')event.num=6;
			'step 1'
			player.addMark('yb014_shifu2',event.num);
			var list=['moon','clam','lightning','wind','flame'];
			var list6=[];
			for(var i of list){
				list6.push('ybsl_'+i);
			}
			event.list=list;
			event.list3=list6;
			'step 2'
			var list7=event.list;
			var list2=event.list3;
			for(var j of list7){
				// game.log(player.storage.yb014_shifu2);
				// game.log(player.storage['ybsl_'+j+'_lv']+1);
				// game.log(game.checkMod(event,player,0,'ybsl'+j+'Mod',player));
				// game.log(j);
				// game.log(game.checkMod(event,player,0,'ybsl'+j+'lvMod',player));
				if(
					(player.storage.yb014_shifu2>=(player.storage['ybsl_'+j+'_lv']+1)*game.checkMod(event,player,0,'ybsl'+j+'Mod',player))&&player.storage['ybsl_'+j+'_lv']<game.checkMod(event,player,0,'ybsl'+j+'lvMod',player)
				) {
					player.addMark('ybsl_'+j+'_lv');
					switch(j){
						case 'moon':lib.skill.ybsl_moon.up(player);break;
						case 'clam':lib.skill.ybsl_clam.up(player);break;
						case 'lightning':lib.skill.ybsl_lightning.up(player);break;
						case 'wind':lib.skill.ybsl_wind.up(player);break;
						case 'flame':lib.skill.ybsl_flame.up(player);break;
					}
				}
			}
			
		},
		init:function(player,skill){
			player.storage.yb014_shifu99=['','','','','',''];
			player.addMark('ybsl_moon_lv');
			player.addMark('ybsl_clam_lv');
			player.addMark('ybsl_lightning_lv');
			player.addMark('ybsl_wind_lv');
			player.addMark('ybsl_flame_lv');
			player.removeMark('ybsl_moon_lv');
			player.removeMark('ybsl_clam_lv');
			player.removeMark('ybsl_lightning_lv');
			player.removeMark('ybsl_wind_lv');
			player.removeMark('ybsl_flame_lv');
		},
		mark:true,
		marktext:'诗',
		intro:{
			name:'诗篇',
			content:function(storage,player,skill){
				var str='';
				var list6=player.storage.yb014_shifu99;
				var list={
					'moon':{
						0:'①决堰（陆抗）',
						1:'<br>②伪伤（key宫泽谦吾）',
						2:'<br>③游凤（key凤千早）',
						3:'<br>④止啼（手杀神张辽）',
						4:'<br>⑤浮萍（夏侯令女）',
						5:'<br>⑥均步（key凤咲夜）/烈武（key凤千早）',
						6:'<br>⑦弥笃（胡昭）',
						7:'<br>⑧贤望（胡昭）/奋锐（霍峻）',
					},
					'clam':{
						0:'①武圣（界关羽）+倾国（界甄姬）',
						1:'<br>②龙胆（界赵云）',
						2:'<br>③善断+义烈（ol周处）',
						3:'<br>④急救（华佗）+连环（界庞统）',
						4:'<br>⑤火计+看破（手杀卧龙）',
						5:'<br>⑥矫诏+殚心（界郭皇后）',
						6:'<br>⑦龙魂（神赵云）',
						7:'<br>⑧双掣（key三枝二木）',
					},
					'lightning':{
						0:'①符咒（DIY张宁）',
						1:'<br>②鬼道（DIY张宁）',
						2:'<br>③太平（DIY张宁）',
						3:'<br>④筹策（戏志才）',
						4:'<br>⑤屯田（ol界邓艾）',
						5:'<br>⑥暴球（key枣铃）',
						6:'<br>⑦八阵（卧龙）',
						7:'<br>⑧吉境（王荣）',
					},
					'wind':{
						0:'①制衡（界孙权）',
						1:'<br>②法箓+真仪（张琪瑛）',
						2:'<br>③会输（全不会解）',
						3:'<br>④易输（全不会解）',
						4:'<br>⑤点化（张琪瑛）',
						5:'<br>⑥淑武（key七濑留美）',
						6:'<br>⑦苦肉（黄盖）/募兵（SP张辽已觉醒）',
						7:'<br>⑧敏思（王荣）/巧思（马均）',
					},
					'flame':{
						0:'①锋略（荀谌）',
						1:'<br>②天义（太史慈）+探虎（星SP吕蒙）',
						2:'<br>③烈刃（手杀祝融）',
						3:'<br>④专对（秦宓）',
						4:'<br>⑤明伐（手杀羊祜）+大喝（星SP张飞）',
						5:'<br>⑥酣战（界太史慈）/天辩（秦宓）',
						6:'<br>⑦咆哮（界张飞）/陷阵（界高顺）',
						7:'<br>⑧除害（周处）',
					},
				}
				if(player.storage.yb014_shifu99[0]=='sakuya_junbu'){
					list.moon[5]='<br>⑥均步（key凤咲夜）/<span style="text-decoration: line-through;">烈武（key凤千早）</span>'
				}
				else if(player.storage.yb014_shifu99[0]=='chihaya_liewu'){
					list.moon[5]='<br>⑥<span style="text-decoration: line-through;">均步（key凤咲夜）</span>/烈武（key凤千早）'
				}
				if(player.storage.yb014_shifu99[1]=='xianwang'){
					list.moon[7]='<br>⑧贤望（胡昭）/<span style="text-decoration: line-through;">奋锐（霍峻）</span>'
				}
				else if(player.storage.yb014_shifu99[1]=='fenrui'){
					list.moon[7]='<br>⑧<span style="text-decoration: line-through;">贤望（胡昭）</span>/奋锐（霍峻）'
				}
				if(player.storage.yb014_shifu99[2]=='kurou'){
					list.wind[6]='<br>⑦苦肉（黄盖）/<span style="text-decoration: line-through;">募兵（SP张辽已觉醒）</span>'
				}
				else if(player.storage.yb014_shifu99[2]=='mubing'){
					list.wind[6]='<br>⑦<span style="text-decoration: line-through;">苦肉（黄盖）</span>/募兵（SP张辽已觉醒）'
				}
				if(player.storage.yb014_shifu99[3]=='minsi'){
					list.wind[7]='<br>⑧敏思（王荣）/<span style="text-decoration: line-through;">巧思（马均）</span>'
				}
				else if(player.storage.yb014_shifu99[3]=='qiaosi'){
					list.wind[7]='<br>⑧<span style="text-decoration: line-through;">敏思（王荣）</span>/巧思（马均）'
				}
				if(player.storage.yb014_shifu99[4]=='hanzhan'){
					list.flame[5]='<br>⑥酣战（界太史慈）/<span style="text-decoration: line-through;">天辩（秦宓）</span>'
				}
				else if(player.storage.yb014_shifu99[4]=='tianbian'){
					list.flame[5]='<br>⑥<span style="text-decoration: line-through;">酣战（界太史慈）</span>/天辩（秦宓）'
				}
				if(player.storage.yb014_shifu99[5]=='olpaoxiao'){
					list.flame[6]='<br>⑦咆哮（界张飞）/<span style="text-decoration: line-through;">陷阵（界高顺）</span>'
				}
				else if(player.storage.yb014_shifu99[5]=='decadexianzhen'){
					list.flame[6]='<br>⑦<span style="text-decoration: line-through;">咆哮（界张飞）</span>/陷阵（界高顺）'
				}
				for(var i in list){
					var j='ybsl_'+i;
					var k='ybmyx_'+i;
					if(player.storage[j].includes('key')){
						str+='<br>主流派<br>',
						str+=player.storage[j+'_lv']+'---'+player.storage.yb014_shifu2+'/'+(player.storage[j+'_lv']+1)*game.checkMod(event,player,0,'ybsl'+i+'Mod',player)+'<br>';
						for (var q=0;q<8;q++){
							var numa=player.storage['ybsl_'+i+'_lv'];
							if(q<numa){
								list[i][q]='<span class=yellowtext>'+list[i][q]+'</span>'
							}
							else{
								list[i][q]='<span style="opacity:0.5;">'+list[i][q]+'</span>'
							}
							str+=list[i][q];
						}
					}
					else if(player.storage[j].includes('sec')){
						str+='<br>支流派<br>'
						str+=player.storage[j+'_lv']+'---'+player.storage.yb014_shifu2+'/'+(player.storage[j+'_lv']+1)*game.checkMod(event,player,0,'ybsl'+i+'Mod',player)+'<br>';
						for (var p=0;p<5;p++){
							var numb=player.storage['ybsl_'+i+'_lv'];
							if(p<numb){
								list[i][p]='<span class=yellowtext>'+list[i][p]+'</span>'
							}
							else{
								list[i][p]='<span style="opacity:0.5;">'+list[i][p]+'</span>'
							}
							str+=list[i][p];
						}
					}
				}
				return str;
			},
		},
		group:['ybsl_moon','ybsl_clam','ybsl_lightning','ybsl_wind','ybsl_flame','ybsl_moon_lv','ybsl_clam_lv','ybsl_lightning_lv','ybsl_wind_lv','ybsl_flame_lv'],
	},
	'ybsl_moon':{
		charlotte:true,
		mod:{
			ybslmoonMod:function(event,player,num){
				var str=Infinity;
				if(player.storage.ybsl_moon.includes('key'))str=50;
				if(player.storage.ybsl_moon.includes('sec'))str=35;
				return num+str;
			},
			ybslmoonlvMod:function(event,player,num){
				var str=0;
				if(player.storage.ybsl_moon.includes('key'))str=8;
				else if(player.storage.ybsl_moon.includes('sec'))str=5;
				return num+str;
			},
		},
		up:function(player){
			var next=game.createEvent('yb014_shifu2',false);
			next.player=player;
			next.setContent(lib.skill.ybsl_moon.upc);
		},
		upc:function(){
			'step 0'
			event.num=0;
			event.list66=[];
			//if(!['key','sec'].contains(player.storage.ybsl_moon[0])){event.finish();}//若不在主支线中，则截断，禁止升级
			'step 1'
			var list=[];
			var list2=[];
			switch(event.num){
				case 0:
					event.list66.push('drlt_jueyan');break;
				case 1:
					event.list66.push('kengo_weishang');break;
				case 2:
					event.list66.push('chihaya_youfeng');break;
				case 3:
					event.list66.push('drlt_zhiti');break;
				case 4:
					event.list66.push('fuping');break;
				case 5:
					if(player.storage.yb014_shifu99[0]==''){
						var next=game.createEvent('yb014_shifu2');
						next.player=player;
						next.list66=event.list66;
						next.setContent(function(){
							'step 0'
							var list=[];
							var list2=[];
							list.push(['烈武：'+get.translation('chihaya_liewu_info'),function(){
								 event.list66.push('chihaya_liewu');
								 player.storage.yb014_shifu99[0]='chihaya_liewu';
							}],['均步：'+get.translation('sakuya_junbu_info'),function(){
								 event.list66.push('sakuya_junbu');
								 player.storage.yb014_shifu99[0]='sakuya_junbu';
							}]);
							for(var i=0;i<list.length;i++){
								 list2.push(list[i][1]);
								 list[i]=list[i][0];
							 }
							 event.list000=list2;
							player.chooseControl().set(
								'choiceList',list).set(
								'prompt','请选择分支');
							'step 1'
							event.reward=event.list000[result.index];
							event.reward();
						});
					}
					event.list66.push(player.storage.yb014_shifu99[0]);
					break;
				case 6:
					event.list66.push('midu');break;
				case 7:
					if(player.storage.yb014_shifu99[1]==''){
						var next=game.createEvent('yb014_shifu2');
						next.player=player;
						next.list66=event.list66;
						next.setContent(function(){
							'step 0'
							var list=[];
							var list2=[];
							list.push(['贤望：'+get.translation('xianwang_info'),function(){
								 event.list66.push('xianwang');
								 player.storage.yb014_shifu99[1]='xianwang';
							}],['奋锐：'+get.translation('fenrui_info'),function(){
								 event.list66.push('fenrui');
								 player.storage.yb014_shifu99[1]='fenrui';
							}]);
							for(var i=0;i<list.length;i++){
								 list2.push(list[i][1]);
								 list[i]=list[i][0];
							 }
							player.chooseControl().set(
								'choiceList',list).set(
								'prompt','请选择分支');
							 event.list000=list2;
							'step 1'
							event.reward=event.list000[result.index];
							event.reward();
						});
						
					}
					event.list66.push(player.storage.yb014_shifu99[1]);
					break;
			}
			'step 2'
			// if(result.control)
			// 'step 3'
			if(event.num+1<player.storage.ybsl_moon_lv){
				event.num++;
				event.goto(1);
			}
			else{
				player.addAdditionalSkill('ybsl_moon',event.list66,true);
				event.finish();
			}
		},
	},
	'ybsl_clam':{
		charlotte:true,
		mod:{
			ybslclamMod:function(event,player,num){
				var str=Infinity;
				if(player.storage.ybsl_clam.includes('key'))str=40;
				if(player.storage.ybsl_clam.includes('sec'))str=28;
				return num+str;
			},
			ybslclamlvMod:function(event,player,num){
				var str=0;
				if(player.storage.ybsl_clam.includes('key'))str=8;
				else if(player.storage.ybsl_clam.includes('sec'))str=5;
				return num+str;
			},
		},
		up:function(player){
			var next=game.createEvent('yb014_shifu2',false);
			next.player=player;
			next.setContent(lib.skill.ybsl_clam.upc);
		},
		upc:function(){
			'step 0'
			event.num=0;
			event.list66=[];
			//if(!['key','sec'].contains(player.storage.ybsl_clam[0])){event.finish();}//若不在主支线中，则截断，禁止升级
			'step 1'
			var list=[];
			var list2=[];
			switch(event.num){
				case 0:
					event.list66.push('new_rewusheng','reqingguo');break;
				case 1:
					event.list66.push('ollongdan');break;
				case 2:
					event.list66.push('shanduan','yilie');break;
				case 3:
					event.list66.push('jijiu','ollianhuan');break;
				case 4:
					event.list66.push('rehuoji','rekanpo');break;
				case 5:
					event.list66.push('rejiaozhao','redanxin');break;
				case 6:
					event.list66.push('relonghun');break;
				case 7:
					event.list66.push('haruka_shuangche');break;
			}
			'step 2'
			if(event.num+1<player.storage.ybsl_clam_lv){
				event.num++;
				event.goto(1);
			}
			else{
				player.addAdditionalSkill('ybsl_clam',event.list66,true);
				event.finish();
			}
		},
	},
	'ybsl_lightning':{
		charlotte:true,
		mod:{
			ybsllightningMod:function(event,player,num){
				var str=Infinity;
				if(player.storage.ybsl_lightning.includes('key'))str=40;
				if(player.storage.ybsl_lightning.includes('sec'))str=28;
				return num+str;
			},
			ybsllightninglvMod:function(event,player,num){
				var str=0;
				if(player.storage.ybsl_lightning.includes('key'))str=8;
				else if(player.storage.ybsl_lightning.includes('sec'))str=5;
				return num+str;
			},
		},
		up:function(player){
			var next=game.createEvent('yb014_shifu2',false);
			next.player=player;
			next.setContent(lib.skill.ybsl_lightning.upc);
		},
		upc:function(){
			'step 0'
			event.num=0;
			event.list66=[];
			//if(!['key','sec'].contains(player.storage.ybsl_lightning[0])){event.finish();}//若不在主支线中，则截断，禁止升级
			'step 1'
			var list=[];
			var list2=[];
			switch(event.num){
				case 0:
					event.list66.push('nsfuzhou');break;
				case 1:
					event.list66.push('nsguidao');break;
				case 2:
					event.list66.push('nstaiping');break;
				case 3:
					event.list66.push('chouce');break;
				case 4:
					event.list66.push('oltuntian');break;
				case 5:
					event.list66.push('rin_baoqiu');break;
				case 6:
					event.list66.push('bazhen');break;
				case 7:
					event.list66.push('jijing');break;
			}
			'step 2'
			if(event.num+1<player.storage.ybsl_lightning_lv){
				event.num++;
				event.goto(1);
			}
			else{
				player.addAdditionalSkill('ybsl_lightning',event.list66,true);
				event.finish();
			}
		},
	},
	'ybsl_wind':{
		charlotte:true,
		mod:{
			ybslwindMod:function(event,player,num){
				var str=Infinity;
				if(player.storage.ybsl_wind.includes('key'))str=50;
				if(player.storage.ybsl_wind.includes('sec'))str=35;
				return num+str;
			},
			ybslwindlvMod:function(event,player,num){
				var str=0;
				if(player.storage.ybsl_wind.includes('key'))str=8;
				else if(player.storage.ybsl_wind.includes('sec'))str=5;
				return num+str;
			},
		},
		up:function(player){
			var next=game.createEvent('yb014_shifu2',false);
			next.player=player;
			next.setContent(lib.skill.ybsl_wind.upc);
		},
		upc:function(){
			'step 0'
			event.num=0;
			event.list66=[];
			//if(!['key','sec'].contains(player.storage.ybsl_wind[0])){event.finish();}//若不在主支线中，则截断，禁止升级
			'step 1'
			var list=[];
			var list2=[];
			switch(event.num){
				case 0:
					event.list66.push('rezhiheng');break;
				case 1:
					event.list66.push('xinfu_ybfalu','xinfu_ybzhenyi');break;
				case 2:
					event.list66.push('dchuishu');break;
				case 3:
					event.list66.push('dcyishu');break;
				case 4:
					event.list66.push('xinfu_ybdianhua');break;
				case 5:
					event.list66.push('rumi_shuwu');break;
				case 6:
					if(player.storage.yb014_shifu99[2]==''){
						var next=game.createEvent('yb014_shifu2');
						next.player=player;
						next.list66=event.list66;
						next.setContent(function(){
							'step 0'
							var list=[];
							var list2=[];
							list.push(['苦肉：'+get.translation('kurou_info'),function(){
								 event.list66.push('kurou');
								 player.storage.yb014_shifu99[2]='kurou';
							}],['募兵：'+get.translation('mubing_rewrite_info'),function(){
								 event.list66.push('mubing');
								 player.storage.mubing2=true;
								 player.markSkill('mubing_rewrite');
								 player.storage.yb014_shifu99[2]='mubing';
							}]);
							for(var i=0;i<list.length;i++){
								 list2.push(list[i][1]);
								 list[i]=list[i][0];
							 }
							player.chooseControl().set(
								'choiceList',list).set(
								'prompt','请选择分支');
							 event.list000=list2;
							'step 1'
							event.reward=event.list000[result.index];
							event.reward();
						});
						
					}
					event.list66.push(player.storage.yb014_shifu99[2]);
					break;
				case 7:
					if(player.storage.yb014_shifu99[3]==''){
						var next=game.createEvent('yb014_shifu2');
						next.player=player;
						next.list66=event.list66;
						next.setContent(function(){
							'step 0'
							var list=[];
							var list2=[];
							list.push(['敏思：'+get.translation('minsi_info'),function(){
								 event.list66.push('minsi');
								 player.storage.yb014_shifu99[3]='minsi';
							}],['巧思：'+get.translation('qiaosi_info'),function(){
								 event.list66.push('qiaosi');
								 player.storage.yb014_shifu99[3]='qiaosi';
							}]);
							for(var i=0;i<list.length;i++){
								 list2.push(list[i][1]);
								 list[i]=list[i][0];
							 }
							player.chooseControl().set(
								'choiceList',list).set(
								'prompt','请选择分支');
							 event.list000=list2;
							'step 1'
							event.reward=event.list000[result.index];
							event.reward();
						});
						
					}
					event.list66.push(player.storage.yb014_shifu99[3]);
					break;
			}
			'step 2'
			if(event.num+1<player.storage.ybsl_wind_lv){
				event.num++;
				// game.log(event.num);
				event.goto(1);
			}
			else{
				player.addAdditionalSkill('ybsl_wind',event.list66,true);
				event.finish();
			}
		},
	},
	'ybsl_flame':{
		charlotte:true,
		mod:{
			ybslflameMod:function(event,player,num){
				var str=Infinity;
				if(player.storage.ybsl_flame.includes('key'))str=20;
				if(player.storage.ybsl_flame.includes('sec'))str=14;
				return num+str;
			},
			ybslflamelvMod:function(event,player,num){
				var str=0;
				if(player.storage.ybsl_flame.includes('key'))str=8;
				else if(player.storage.ybsl_flame.includes('sec'))str=5;
				return num+str;
			},
		},
		up:function(player){
			var next=game.createEvent('yb014_shifu2',false);
			next.player=player;
			next.setContent(lib.skill.ybsl_flame.upc);
		},
		upc:function(){
			'step 0'
			event.num=0;
			event.list66=[];
			//if(!['key','sec'].contains(player.storage.ybsl_flame[0])){event.finish();}//若不在主支线中，则截断，禁止升级
			'step 1'
			var list=[];
			var list2=[];
			switch(event.num){
				case 0:
					event.list66.push('refenglve');break;
				case 1:
					event.list66.push('tianyi','tanhu');break;
				case 2:
					event.list66.push('relieren');break;
				case 3:
					event.list66.push('zhuandui');break;
				case 4:
					event.list66.push('mingfa','dahe');break;
				case 5:
					if(player.storage.yb014_shifu99[4]==''){
						var next=game.createEvent('yb014_shifu2');
						next.player=player;
						next.list66=event.list66;
						next.setContent(function(){
							'step 0'
							var list=[];
							var list2=[];
							list.push(['酣战：'+get.translation('hanzhan_info'),function(){
								 event.list66.push('hanzhan');
								 player.storage.yb014_shifu99[4]='hanzhan';
							}],['天辩：'+get.translation('tianbian_info'),function(){
								 event.list66.push('tianbian');
								 player.storage.yb014_shifu99[4]='tianbian';
							}]);
							for(var i=0;i<list.length;i++){
								 list2.push(list[i][1]);
								 list[i]=list[i][0];
							 }
							player.chooseControl().set(
								'choiceList',list).set(
								'prompt','请选择分支');
							 event.list000=list2;
							'step 1'
							event.reward=event.list000[result.index];
							event.reward();
						});
						
					}
					event.list66.push(player.storage.yb014_shifu99[4]);
					break;
				case 6:
					if(player.storage.yb014_shifu99[5]==''){
						var next=game.createEvent('yb014_shifu2');
						next.player=player;
						next.list66=event.list66;
						next.setContent(function(){
							'step 0'
							var list=[];
							var list2=[];
							list.push(['咆哮：'+get.translation('olpaoxiao_info'),function(){
								 event.list66.push('olpaoxiao');
								 player.storage.yb014_shifu99[5]='olpaoxiao';
							}],['陷阵：'+get.translation('decadexianzhen_info'),function(){
								 event.list66.push('decadexianzhen');
								 player.storage.yb014_shifu99[5]='decadexianzhen';
							}]);
							for(var i=0;i<list.length;i++){
								 list2.push(list[i][1]);
								 list[i]=list[i][0];
							 }
							player.chooseControl().set(
								'choiceList',list).set(
								'prompt','请选择分支');
							 event.list000=list2;
							'step 1'
							event.reward=event.list000[result.index];
							event.reward();
						});
						
					}
					event.list66.push(player.storage.yb014_shifu99[5]);
					break;
				case 7:
					event.list66.push('rechuhai');break;
			}
			'step 2'
			if(event.num+1<player.storage.ybsl_flame_lv){
				event.num++;
				event.goto(1);
			}
			else{
				player.addAdditionalSkill('ybsl_flame',event.list66,true);
				event.finish();
			}
		},
	},
	'ybsl_moon_lv':{charlotte:true},
	'ybsl_clam_lv':{charlotte:true},
	'ybsl_lightning_lv':{charlotte:true},
	'ybsl_wind_lv':{charlotte:true},
	'ybsl_flame_lv':{charlotte:true},
	'yb014_huanlei':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		filter:function (event,player){
			return player.storage.yb014_shifu_block.length>3;
		},
		limited:true,
		skillAnimation:true,
		animationColor:'YB_snow',
		content:function(){
			'step 0'
			player.awakenSkill('yb014_huanlei');
			player.addSkill('yb014_shifu2');
			event.list66=['moon','clam','lightning','wind','flame'];
			for(var p of event.list66){
				player.storage['ybsl_'+p]=[];
				// player.addMark('ybsl_'+p+'_lv');
			}
			'step 1'
			//var list=[];
			//var list99=['moon','clam','lightning','wind','flame'];
			/*for(var i of list99){
				list.push('ybmyx_'+i);
			}*/
			var list2=['moon','clam','clam','lightning','lightning','wind','flame','flame','flame','flame'];
			var list=list2.randomGets(player.storage.yb014_shifu_block.length);
			list=list.map(function(i){
				return ['','','ybmyx_'+i];
			});
			/*颜色快速提取
			'ybsl_cuixing_spade':'<span style=\'color:#28e3ce\'>淬星</span>',淡蓝色
			'ybsl_cuixing_heart':'<span style=\'color:#fff600\'>淬星</span>',比较亮的黄色
			'ybsl_cuixing_club':'<span style=\'color:#a900ff\'>淬星</span>',比较暗的紫色
			'ybsl_cuixing_diamond':'<span style=\'color:#ff0000\'>淬星</span>',刺眼的红色
			*/
			var next=player.chooseToMove('请依次选择作为主流派和支流派的线路');
			next.set('list',[
				['主流派和支流派一样时，将加快主流派升级速度<bt>当前主流派为'+get.translation(list2[0])+'，支流派为'+get.translation(list2[1])+'。',[list,'vcard'],function(list){
					var list2=list.map(function(i){
						return get.translation(i[2]);
					});
				return '操作方法：将主流派调整至第一位，支流派调整至第二位';
				}]
				
			]);
			'step 2'
			if(result.bool){
				var list1=event.list66;
				list=list1.map(function(i){
					return ['','','ybsl_'+i];
				});
				var list2=result.moved[0].map(function(i){
					return i[2];
				});//输出调序结果
				var list3=[];
				var x=1;
				for(var y of list1){
					if(list2[0]==('ybmyx_'+y)){
						player.storage['ybsl_'+y].push('key');
					}
					if(list2[1]==('ybmyx_'+y)){
						player.storage['ybsl_'+y].push('sec');
						x=2;
					}
				}
				var str='#g';
				for(var j=0;j<x;j++){
					str+=get.translation(list2[j]);
					if(j<(x-1)) str+='/';
				}
				game.log(player,'#g【还酹】','主、支流派依次为',str);
				
			}
			
		},
	},

}
