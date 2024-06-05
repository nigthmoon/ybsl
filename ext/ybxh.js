"use strict";
game.import('character',function(lib, game, ui, get, ai, _status){ 
	var ybxh={ 
		name:'ybxh',//武将包命名（必填） 
		connect:true,//该武将包是否可以联机（必填） 
		connectBanned:[],
		characterSort:{
			ybxh:{
				ybxh_ssj:[
					'ybxh_linyi','ybxh_zhanglongliyao',
				],
			},
		},
		character:{ //武将格式 : 
			// //----------------------忆包废案
			'ybxh_linyi':['male','shen','3/4',['xhly_tiancan','xhly_baihe','xhly_wuji','xhly_duotian'],['xhclan:内家流派','legend']],//林逸
			'ybxh_zhanglongliyao':['male','qun',4,['xhzlly_guihuo'],['epic']],//张龙李妖
			// 'ybxh_yukun':['male','qun',3,['xhyk_qietu','xhyk_shagou'],['xhclan:内家流派','legend']],//雨坤
			//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
		},//武将（必填） 
		characterIntro:{
			'ybxh_linyi':'自己百度吧，又臭又长，懒得整理了。',
			'ybxh_zhanglongliyao':'出自《校花的贴身高手》第166，167章前后。二人意欲驾驶面包车创死林逸，结果被林逸鞋尖藏刀片踢爆轮胎，二人的车翻下山崖，一命呜呼。（小说情节需要，主角神功护体，请勿现实模仿）',
		},//武将介绍（选填） 
		/*快捷复制：
		<span class=yellowtext>文字</span>暗亮双色
		<span class=thundertext>文字</span>
		<span class=thundertext></span>
		<font color=cyan>文字</font>自带单色
		<span style=\'color:#00c4ff\'>文字</span>自写颜色
		<br/>换行
		<li>点
		<span style="opacity:0.5;"></span>字体变淡
		<span style="font-family: yuanli">东吴命运线</span>
		<span style="text-decoration: line-through;">杀</span>字体划掉

		*/
		characterReplace:{//同名武将切换
			
		},//同名武将切换
		perfectPair:{//珠联璧合
			
		},//珠联璧合武将（选填）
		characterFilter:{//禁用
			
			//傀夜白和傀儡在国战禁用
		},//武将使用条件
		characterTitle:{//称号
			'ybxh_linyi':'校花的贴身高手',
			'ybxh_zhanglongliyao':'校花的贴身高手',
		},//武将标题（用于写称号或注释）（选填） 
		skill:{
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
							if(!list2.contains(list[j])){str+='<span class=greentext>'+get.translation(list[j])+'</span>'}
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
					if(!player.storage.xhly_baihe_list.contains(event.card.name))return false;
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
						if(!player.storage.xhly_wuji_wuji.contains(name)){
							player.storage.xhly_wuji_wuji.push(name);
						}
						if(!player.storage.xhly_wuji_wuji[name]){
							player.storage.xhly_wuji_wuji[name]=[];
						}
						if(!(player.storage.xhly_wuji_wuji[name]).contains(suit)){
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
							if(player.storage.xhly_wuji_wuji.contains(lib.inpile[i])){
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
						if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan','diaohulishan'].contains(button.link[2])) return 0;
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
					return player.storage.xhly_wuji_wuji.contains(name)&&player.countCards('h')>=1;
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
					if(event._notrigger.contains(event.player)) return false;
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
							if(!event.xhzlly_guihuo.contains(player))return false;
							if(event._notrigger.contains(event.player)) return false;
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
		},//技能（必填） ……………………！…！！！【…？。！！？？？？…………
		card:{
			
		},
		translate:{  
			ybxh_ssj:'世俗界',
			'ybxh_ssj_info':'大坑待填',
			ybxh_linyi:'林逸',
			'xhly_tiancan':'天蚕',
			'xhly_tiancan_info':'当其他角色使用牌时，若其手牌数不大于你，你可以观看其手牌。',
			'xhly_baihe':'白鹤',
			'xhly_baihe_info':'锁定技，当你获得此技能时，创建集合A{杀，闪，桃，酒}；当你使用或成为牌的目标时，若你有对应记录，你移除之，然后若你记录均已移除，你重置集合A、加一点体力上限并回复一点体力。',
			'xhly_wuji':'武技',
			'xhly_wuji_info':'每回合限一次，当场上角色使用非装备牌时，你可以记录此牌的牌名，并为此牌名添加一个花色（此花色根据此牌对应的首个实体牌的花色确定）。你可以于合适的时机将一种花色的真气牌当作与之关联的牌使用。 你于摸牌阶段获得的牌均标记为真气。',
			'xhly_wuji_use':'转化',
			'xhly_duotian':'夺天',
			'xhly_duotian_info':'当你失去牌时，你可以记录此次失去牌数（至多为5）并覆盖上次；锁定技，你的摸牌阶段，你额外摸此技能记录的牌数，并移除记录。',
			xhly_duotian_ey:'夺天',
			xhly_duotian_ey_info:'假如本次失去牌数大于标记就自动记录。',
			xhly_wuji_draw:'真气',
			xhly_wuji_draw_info:'你于摸牌阶段获得的牌均标记为真气',
			_ybxh_neijialiupai:'内家流派',
			_ybxh_neijialiupai_info:'内家流派起始手牌以及摸牌阶段获得的牌均标记为真气',
			ybxh_zhanglongliyao:'张龙李妖',
			'xhzlly_guihuo':'诡祸',
			'xhzlly_guihuo_info':'锁定技，当你对其他角色造成伤害时或受到其他角色造成的伤害时，此伤害+1，然后若双方均存活，你获得对方的一张牌；锁定技，杀死你的角色获得【诡祸】。',
			// 'xhzlly_guihuo_append':'至游戏结束。不加上怕被喷写的不明确，加上又不太简洁，只好这样了。',
			'xhzlly_guihuo_append':'就不写“至游戏结束”。反正意思已经表达到了。',
			ybxh_yukun:'雨坤',
			'xhyk_qietu':'窃图',
			'xhyk_shagou':'杀狗',
			//----------------------装备及其他
		},//翻译（必填） 
		dynamicTranslate:{//动态翻译
			
		},
		
	}; 
	
	
	
	if(lib.device||lib.node){ 
		for(var i in ybxh.character){ybxh.character[i][4].push('ext:夜白神略/image/xh/'+i+'.jpg');} 
	}else{ 
		for(var i in ybxh.character){ybxh.character[i][4].push('db:extension-夜白神略:'+i+'.jpg');} 
	}//由于以此法加入的武将包武将图片是用源文件的，所以要用此法改变路径 
	for(var i in ybxh.character){
		ybxh.character[i][4].push('die:夜白神略/audio/die/'+i+'.mp3');
	}
	return ybxh; 
}); 
