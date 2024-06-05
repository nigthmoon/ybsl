game.import("extension",function(lib,game,ui,get,ai,_status){
	return {
		name:"夜白神略",
		editable: false,
		content:function (config,pack){
			/*
			//抄来的更新公告格式，暂未动笔
			lib.translate['mode_extension_夜白神略_character_config'] = "<img style=width:100px src="+lib.assetURL+"extension/夜白神略/title.png>"
			lib.extensionPack['夜白神略'].version = '4.1.5';
			var str = "<br><li>这是一条提示";
			str += "<br><li>假如武将包和牌堆没有打开，请前往武将菜单，下滑找到夜白将包，开启，然后前往卡牌菜单，找到夜白牌堆和BOSS搬运，分别开启";
			game.showExtensionChangeLog(str, '夜白神略');
			*/
			//-------------云端弹窗公告(已放弃)
			if(config.ybslb){
				for(var i in lib.characterPack['ybslb']){
					if(lib.character[i][4].indexOf("forbidai")<0)lib.character[i][4].push("forbidai");
				};
			};//选项触发内容，原因见config
			//---------------------------------创建势力------------------------------------//
			//---------------------------------创建势力------------------------------------//
			//---------------------------------武将评级------------------------------------//
			// for(var pack of ["ybslj","ybsc","ybxh","ybdd","ybgod","ybslc","ybart"]){
				// for(var name in lib.characterPack[pack]){
					// // var rarity=lib.characterPack[pack][name][5];
					// // if(['junk','common','rare','epic','legend'].contains(rarity)) lib.rank.rarity[rarity].add(name);
					// for(var rarity of ['junk','common','rare','epic','legend']){//废材，普通，精品，史诗，传说
					// //common用不了，对应普通
						// if(lib.characterPack[pack][name][4].contains(rarity)){
							// lib.rank.rarity[rarity].add(name);
							// break;
						// }
					// }
				// }
			// }
			//-------------改变牌堆-----------搬自时空枢纽
			if(lib.config.cards.contains('ybslc')&&lib.config.cards.contains('ybgod')&&lib.config.ybsl_cardPileReplace){
				if(lib.config.ybsl_cardPileReplace=='ybslCardPile'){
					lib.arenaReady.push(function(){
						lib.init.js(lib.assetURL+'extension/夜白神略/ext',lib.config.ybsl_cardPileReplace,function(){
							if(lib&&window.cardPile){
								lib.card.list.splice(0,lib.card.list.length);
								if(typeof window.cardPile=='function'){
									window.cardPile=window.cardPile();
								}
								lib.card.list.addArray(window.cardPile);
								lib.card.list.randomSort();
								game.ybsl_cardPile_on=true;
							}
						})
					})
				}
				else if(lib.config.ybsl_cardPileReplace=='ybslminiCardPile'){
					lib.arenaReady.push(function(){
						lib.init.js(lib.assetURL+'extension/夜白神略/ext',lib.config.ybsl_cardPileReplace,function(){
							if(lib&&window.minicardPile){
								lib.card.list.splice(0,lib.card.list.length);
								if(typeof window.minicardPile=='function'){
									window.minicardPile=window.minicardPile();
								}
								lib.card.list.addArray(window.minicardPile);
								lib.card.list.randomSort();
								game.ybsl_cardPile_on=true;
							}
						})
					})
				}
				else if(lib.config.ybsl_cardPileReplace=='ybslExtraCardPile'){
					lib.arenaReady.push(function(){
						lib.init.js(lib.assetURL+'extension/夜白神略/ext',lib.config.ybsl_cardPileReplace,function(){
							if(lib&&window.extracardPile){
								lib.card.list.splice(0,lib.card.list.length);
								if(typeof window.minicardPile=='function'){
									window.extracardPile=window.extracardPile();
								}
								lib.card.list.addArray(window.extracardPile);
								lib.card.list.randomSort();
								game.ybsl_cardPile_on=true;
							}
						})
					})
				}
			}
			//------------------------此部分照搬自云将扩展
			game.yjGetQhlySkin=function(name){
				if(game.qhly_getSkin){
					return game.qhly_getSkin(name);
				}
				return null;
			};
			//-----------------------此段稍加修改以适配扩展
			// if(lib.config.extension_云将_yishifenghua=='on'&&player.name1=='yunsunshangxiang'&&!game.yjGetQhlySkin('yunsunshangxiang')){
			// player.node.avatar.setBackgroundImage('extension/云将/yunsunshangxianga.jpg');
			// }
			// if(lib.config.extension_云将_yishifenghua=='on'&&player.name1=='yunsunshangxiang'&&game.yjGetQhlySkin('yunsunshangxiang')=='yunsunshangxiang5.jpg'){
			// player.node.avatar.setBackgroundImage('extension/云将/yunsunshangxiang5a.jpg');
			// }
			//--------------------万能的狂神-----------------//
			//------------------------自动开启武将包
			
			if(!lib.config.extension_夜白神略_init){
				game.saveConfig('extension_夜白神略_init',true);
				game.saveConfig('characters',lib.config.characters.concat('ybslj'));
				game.saveConfig('characters',lib.config.characters.concat('ybgz'));
				game.saveConfig('characters',lib.config.characters.concat('ybxh'));
				game.saveConfig('characters',lib.config.characters.concat('ybsc'));
				// game.saveConfig('characters',lib.config.characters.concat('ybart'));//六艺篇的六艺之前被人反馈说不喜欢，希望关掉，因此此包不设为自动开启
				game.saveConfig('cards',lib.config.cards.concat('ybslc'));
				game.saveConfig('cards',lib.config.cards.concat('ybgod'));
				
				game.saveConfig('characters',lib.config.characters.concat('ybnew1'));
				game.saveConfig('cards',lib.config.cards.concat('ybnew2'));
			};
			//------------------------更新素材-----------------//
			if (config.夜白神略的自动更新素材开关&&game.getFileList){
				if (lib.config.extensions && lib.config.extensions.contains('十周年UI') && lib.config['extension_十周年UI_enable']) {
					game.getFileList('extension/十周年UI/image/decoration',(folders,files)=> {
						var decoration=['name_YB_dream.png','name_YB_memory.png'];
						decoration.forEach(function(image){ 
							if(!files.contains(image)){
								if(game.readFile&&game.writeFile){
									game.readFile('extension/夜白神略/image/十周年势力/'+image,(data) => {
										game.writeFile( data,'extension/十周年UI/image/decoration',image,()=>{});
									});
								}
							}
						});
					});
					game.getFileList('extension/十周年UI/image/card',(folders,files)=> {
						var decoration=[
							//----------webp素材
							'lianjunshengyan_gai.webp','rewrite_chitu.webp','rewrite_ybsl_wangzhui.webp','rewrite_du.webp',
							'rewrite_fulei.webp','rewrite_shandian.webp','rewrite_ybsl_suozijia.webp','rewrite_ybsl_tianleiyubi.webp',
							'rewrite_yitianjian.webp','rewrite_zhuque.webp','ybsl_bedou.webp','ybsl_cu.webp',
							'ybsl_wusun.webp','ybsl_xiji.webp','ybsl_wangzhui.webp','ybsl_benlei.webp',
							'ybsl_dafeng.webp','ybsl_luolei.webp','ybsl_fengqiuhuang.webp','ybsl_fuxizhenhunqin.webp',
							'ybsl_meihua.webp','ybsl_lanhua.webp','ybsl_zhuzi.webp','ybsl_juhua.webp',
							'ybsl_zhaoyeyushi.webp','ybsl_yulanbailongju.webp','ybsl_piaoxueruyi.webp','ybsl_tututu.webp',
							'ybsl_mixianshenshu.webp','ybsl_qiuxianruoke.webp','ybsl_suozijia.webp','ybsl_taoyao.webp',
							'ybsl_tianhuoduan.webp','ybsl_tongguiyujin.webp','ybsl_tianleiyubi.webp','ybsl_lumingqianzhuan.webp',
							'ybsl_zhijizhibi.webp','YB_snowsha.webp','YB_bloodsha.webp',
							//----------第三批制作的卡牌
							'rewrite_qinglong.webp','rewrite_fangtian.webp','rewrite_tongque.webp',
							'ybsl_tang.webp',
							'ybsl_qingming.webp','ybsl_zidian.webp','ybsl_baihong.webp',
							'ybsl_bixie.webp','ybsl_liuxing.webp','ybsl_baili.webp',
							'ybsl_zhezhiqiang.webp','ybsl_lvchenqiang.webp','ybsl_bainiaochaofeng.webp',
							'ybsl_meteor.webp','ybsl_disarm.webp','ybsl_zhiziyugui.webp','ybsl_qisihuisheng.webp',
							//----------十周年风格素材
							'lianjunshengyan_gai.png'
						];
						decoration.forEach(function(image){ 
							if(!files.contains(image)){
								if(game.readFile&&game.writeFile){
									game.readFile('extension/夜白神略/image/十周年卡牌/'+image,(data) => {
										game.writeFile( data,'extension/十周年UI/image/card',image,()=>{});
									},(err)=>console.log(err));
								}
							}
						});
					});
				}
			}
			//-----------------------千幻
			if (!lib.qhly_groupimage) {
				lib.qhly_groupimage = {};
			}
			if (!lib.qhly_groupcolor) {
				lib.qhly_groupcolor = {};
			}
			lib.qhly_groupimage['YB_memory'] = 'extension/夜白神略/image/千幻势力/name_YB_memory.webp';
			lib.qhly_groupimage['YB_dream'] = 'extension/夜白神略/image/千幻势力/name_YB_dream.webp';
			lib.qhly_groupcolor['YB_memory'] = "#28e3ce";
			lib.qhly_groupcolor['YB_dream'] = "#e328b7";

			//----------------------------------//
			if(config.ybsl_loglog=='开启'){
				lib.translate._YBSL_log='log发生器'
				lib.skill._YBSL_log={
					direct:true,
					charlotte:true,
					ruleSkill:true,
					trigger:{
						player:[
							'getCurrentWindow',
							"gameStart",'gameDrawBegin','gameDrawAfter',
							'chooseCharacterBefore',"showCharacterAfter",'enterGameBefore','enterGame',
							'addMarkBefore',
							'changeGroup',
							'chooseControl','chooseButton','chooseGroup',
							'enableEquipBefore','chooseBoolBefore','choosePlayerCardBefore',
							'discardPlayerCardBefore','gainPlayerCardBefore' ,
							'chooseToMoveBefore','chooseToPlayBeatmapBefore',
							'subPlayerExit','nit','subPlayerDie','compareBefore','recoverBefore',
							'playercontrol','linkBefore',
							'changeHujiaBefore','changeGroupBefore','changeHpBefore','disableEquipBefore',
							'changeBossBefore','chooseButtonBefore','chooseCharacterBefore',
							'chooseListBefore','gainBefore',
							'useCard','useCardBefore','useCardBegin','useCardEnd','useCardAfter',
							'useCardToPlayered',
							'judge','judgeBefore','judgeBegin','judgeEnd','judgeAfter',
							'equipBefore','equipAfter',
							"roundStart",'roundBegin',
							'phaseBefore',"phaseBeginStart",
							'phaseZhunbeiBefore','phaseZhunbeiBegin',
							'phaseJudgeBefore','phaseJudgeEnd',
							'phaseDrawBefore','phaseDrawEnd',
							'phaseUseBefore','phaseUseEnd',
							'phaseDiscardBefore','phaseDiscardAfter',
							'phaseJieshuBefore','phaseJieshuBegin',
							'phaseEnd',
							'turnOverBefore',
							'damageBefore','damageBegin','damageZero','damageCancelled',
							'loseHpBefore',"loseHpBegin",
							'dieBefore',
							'turnOverEnd','useSkillBefore',
							'chooseToUseBefore','chooseToRespondBefore',
							'chooseToDiscardBefore','chooseToCompareBefore',
							'chooseButtonBefore','chooseCardBefore','chooseTargetBefore',
							'chooseCardTargetBefore', 'chooseControlBefore','chooseBoolBefore',
							"choosePlayerCardBefore",'discardPlayerCardBefore',
							"cardsGotoOrderingBefore",'orderingDiscardBefore',
							'cardsGotoSpecialBefore' ,'cardsDiscardBefore',
							'addJudgeBefore','loseAsyncBefore','dieAfter','addToExpansionBefore',
							'showCharacterBegin',' showCharacterBefore' ,
							'showldentity','showHandcards' ,'showTimer',
							'TLAoLogSkillBefore',
							"useSkill",	"useSkillBefore",
							'chooseTargetBegin',

							"phaseBefore",'useCardBefore',"useCardBefore",'damageBefore','judgeBefore','gameStart'
						]
					},
					content:function(){
						if(event.triggername)game.log('log发生器：',event.triggername);
						if(trigger.player)game.log('trigger.player：',trigger.player,get.translation(trigger.player));
						if(trigger.source)game.log('trigger.source：',trigger.source,get.translation(trigger.source));
						if(trigger.target)game.log('trigger.target：',trigger.target,get.translation(trigger.target));
						if(trigger.targets)game.log('trigger.targets：',trigger.targets);
						if(trigger.card)game.log('trigger.card：',trigger.card);
						if(trigger.card.name)game.log('trigger.card.name：',trigger.card.name);
						if(trigger.card.type)game.log('trigger.card.type：',trigger.card.type);
						if(trigger.cards)game.log('trigger.cards：',trigger.cards);
						if(trigger.cards.name)game.log('trigger.cards.name：',trigger.cards.name);
						if(trigger.cards2)game.log('trigger.cards2：',trigger.cards2);
						if(trigger.num)game.log('trigger.num：',trigger.num);
						if(trigger.skill)game.log('trigger.skill：',trigger.skill);
						if(trigger.button)game.log('trigger.button：',trigger.button);
						if(trigger.control)game.log('trigger.control：',trigger.control);
						if(trigger.links)game.log('trigger.links：',trigger.links);
					},
				}
			}
			//-----------------------------------//
			if(config.ybsl_skillstrengthen==true){
				//--------------------佐藤雏
				lib.character['db_key_hina']=['female','key',3,['hina_ybshenshi','hina_xingzhi'],['doublegroup:key:shen']]

				//-------------神户小鸟
				lib.character['key_kotori']=['female','key',3,['kotori_ybyumo','kotori_ybhuazhan'],[]]
				
				/*
				<span style=\'color:#28e3ce\'>忆</span>
				<span style=\'color:#e328b7\'>梦</span>
				*/
				//-------------------张琪瑛改
				lib.character.zhangqiying=["female","qun",3,["xinfu_ybfalu","xinfu_ybdianhua","xinfu_ybzhenyi"],[]],
				//-------------------篝
				lib.character.key_kagari=["female","shen",3,["kagari_ybzongsi"],[]],
				//-------------------马均
				lib.skill.xinfu_jingxie1={
					firstDo:true,
					group:['xinfu_jingxie2'/*,'ybsl_tianhuoduan_skill'*/],
					position:'he',
					audio:'xinfu_jingxie',
					enable:'phaseUse',
					filter:function(event,player){
						var he=player.getCards('he');
						var list=lib.skill.xinfu_ybjingxie.getJingxie();
						for(var i=0;i<he.length;i++){
							if(list.contains(he[i].name)) return true;
						}
						return false;
					},
					filterCard:function(card,player){
						var list=lib.skill.xinfu_ybjingxie.getJingxie();
						return list.contains(card.name);
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
						game.addVideo('skill',player,['xinfu_jingxie',[bool,get.cardInfo(card)]])
						game.broadcastAll(function(card){
							if(card.name=='wuxinghelingshan'){card.name='zhuque'}
							if(card.name=='chiyanzhenhunqin'){card.name='zhuque'}
							if(card.name=='shandian'&&card.suit=='spade'){card.name='fulei'}
							if(card.name=='taigongyinfu'){card.name='fulei'}
							if(card.name=='hongshui'){card.name='shandian'}
							if(card.name=='huoshan'){card.name='shandian'}
							if(card.name=='wutiesuolian'){card.name='fangtian'}
							card.init([card.suit,card.number,'rewrite_'+card.name,card.nature/*,tag*/]);
						},card);
						if(bool){
							var info=get.info(card);
							if(info.skills){
								for(var i=0;i<info.skills.length;i++){
									player.addSkillTrigger(info.skills[i]);
								}
							}
						}
					},
					ai:{
						basic:{
							order:10,
						},
						result:{
							player:1,
						},
					},
				}
				lib.translate.xinfu_jingxie1_info='出牌阶段，你可以展示一张未强化过的【诸葛连弩】或标准包/军争包/SP包中的防具牌，<span class=yellowtext>赤兔，王追，闪电及其变种牌，洪水，火山，朱雀扇及其变种牌，倚天剑，毒，青龙刀，铜雀，护心镜</span>，然后对其进行强化。当你处于濒死状态时，你可以重铸一张防具牌，然后将体力回复至1点。'
				//----------------------曹金玉
				{
					lib.skill.yuqi={
						audio:2,
						trigger:{global:'damageEnd'},
						init:function(player){
							if(!player.storage.yuqi) player.storage.yuqi=[0,3,1,1];
						},
						getInfo:function(player){
							if(!player.storage.yuqi) player.storage.yuqi=[0,3,1,1];
							return player.storage.yuqi;
						},
						onremove:true,
						usable:3,
						filter:function(event,player){
							var list=lib.skill.yuqi.getInfo(player);
							return event.player.isIn()&&get.distance(player,event.player)<=list[0];
						},
						logTarget:'player',
						content:function(){
							'step 0'
							event.list=lib.skill.yuqi.getInfo(player);
							var cards=get.cards(event.list[1]);
							event.cards=cards;
							game.cardsGotoOrdering(cards);
							var next=player.chooseToMove(true,'隅泣（若对话框显示不完整，可下滑操作）');
							next.set('list',[
								['牌堆顶的牌',cards],
								['交给'+get.translation(trigger.player)+'（至少一张'+(event.list[2]>1?('，至多'+get.cnNumber(event.list[2])+'张'):'')+'）'],
								['交给自己（至多'+get.cnNumber(event.list[3])+'张）'],
							]);
							next.set('filterMove',function(from,to,moved){
								var info=lib.skill.yuqi.getInfo(_status.event.player);
								if(to==1) return moved[1].length<info[2];
								if(to==2) return moved[2].length<info[3];
								return true;
							});
							next.set('processAI',function(list){
								var cards=list[0][1].slice(0).sort(function(a,b){
									return get.value(b,'raw')-get.value(a,'raw');
								}),player=_status.event.player,target=_status.event.getTrigger().player;
								var info=lib.skill.yuqi.getInfo(_status.event.player);
								var cards1=cards.splice(0,Math.min(info[3],cards.length-1));
								var card2;
								if(get.attitude(player,target)>0) card2=cards.shift();
								else card2=cards.pop();
								return [cards,[card2],cards1];
							});
							next.set('filterOk',function(moved){
								return moved[1].length>0;
							});
							'step 1'
							if(result.bool){
								var moved=result.moved;
								cards.removeArray(moved[1]);
								cards.removeArray(moved[2]);
								while(cards.length){
									ui.cardPile.insertBefore(cards.pop().fix(),ui.cardPile.firstChild);
								}
								// trigger.player.gain(moved[1],'gain2');
								// if(moved[2].length) player.gain(moved[2],'gain2');
								var list=[[trigger.player,moved[1]]];
								if(moved[2].length) list.push([player,moved[2]]);
								game.loseAsync({
									gain_list:list,
									giver:player,
									animate:'gain2',
								}).setContent('gaincardMultiple');
							}
							
						},
						mark:true,
						intro:{
							content:function(storage,player){
								var info=lib.skill.yuqi.getInfo(player);
								return '<div class="text center"><span class=thundertext>蓝色：'+info[0]+'</span>　<span class=firetext>红色：'+info[1]+'</span><br><span class=greentext>绿色：'+info[2]+'</span>　<span class=yellowtext>黄色：'+info[3]+'</span></div>'
							},
						},
						ai:{
							threaten:8.8,
						},
					}
					lib.skill.shanshen={
						audio:2,
						trigger:{global:'die'},
						direct:true,
						content:function(){
							'step 0'
							event.goon=!player.hasAllHistory('sourceDamage',function(evt){
								return evt.player==trigger.player;
							});
							var list=lib.skill.yuqi.getInfo(player);
							player.chooseControl('<span class=thundertext>蓝色('+list[0]+')</span>',
												'<span class=firetext>红色('+list[1]+')</span>',
												'<span class=greentext>绿色('+list[2]+')</span>',
												'<span class=yellowtext>黄色('+list[3]+')</span>',
												'cancel2').set('prompt',get.prompt('shanshen')).set('prompt2',
																									'令〖隅泣〗中的一个数字+2'+(event.goon?'并回复1点体力':'')).set(
								'ai',function(){
								var player=_status.event.player,info=lib.skill.yuqi.getInfo(player);
								if(info[0]<info[3]&&game.countPlayer(function(current){
									return get.distance(player,current)<=info[0];
								})<Math.min(3,game.countPlayer())) return 0;
									if(info[3]<info[1]-1) return 3;
									if(info[1]<10) return 1;
									if(info[0]<5&&game.hasPlayer(function(current){
										return current!=player&&get.distance(player,current)>info[0];
									})) return 0;
									return 2;
								});
							'step 1'
							if(result.control!='cancel2'){
								if(result.index==1){var k=10}
								else{var k=5}
								player.logSkill('shanshen',trigger.player);
								var list=lib.skill.yuqi.getInfo(player);
								list[result.index]=Math.min(k,list[result.index]+2);
								game.log(player,'将',result.control,'数字改为','#y'+list[result.index])
								player.markSkill('yuqi');
								if(event.goon) player.recover();
							}
						},
					}
					lib.skill.xianjing={
						audio:2,
						trigger:{player:'phaseZhunbeiBegin'},
						direct:true,
						content:function(){
							'step 0'
							var list=lib.skill.yuqi.getInfo(player);
							player.chooseControl('<span class=thundertext>蓝色('+list[0]+')</span>',
												'<span class=firetext>红色('+list[1]+')</span>',
												'<span class=greentext>绿色('+list[2]+')</span>',
												'<span class=yellowtext>黄色('+list[3]+')</span>','cancel2').set(
								'prompt',get.prompt('xianjing')).set('prompt2','令〖隅泣〗中的一个数字+1').set('ai',
																									function(){
								var player=_status.event.player,info=lib.skill.yuqi.getInfo(player);
								if(info[0]<info[3]&&game.countPlayer(function(current){
									return get.distance(player,current)<=info[0];
								})<Math.min(3,game.countPlayer())) return 0;
								if(info[3]<info[1]-1) return 3;
								if(info[1]<10) return 1;
								if(info[0]<5&&game.hasPlayer(function(current){
									return current!=player&&get.distance(player,current)>info[0];
								})) return 0;
								return 2;
							});
							'step 1'
							if(result.control!='cancel2'){
								if(result.index==1){var k=10}
								else{var k=5}
								player.logSkill('xianjing');
								var list=lib.skill.yuqi.getInfo(player);
								list[result.index]=Math.min(k,list[result.index]+1);
								game.log(player,'将',result.control,'数字改为','#y'+list[result.index])
								player.markSkill('yuqi');
								if(player.isDamaged()) event.finish();
							}
							else event.finish();
							'step 2'
							var list=lib.skill.yuqi.getInfo(player);
							player.chooseControl('<span class=thundertext>蓝色('+list[0]+')</span>',
												'<span class=firetext>红色('+list[1]+')</span>',
												'<span class=greentext>绿色('+list[2]+')</span>',
												'<span class=yellowtext>黄色('+list[3]+')</span>','cancel2').set('prompt',
																												'是否令〖隅泣〗中的一个数字+1？').set('ai',
																																		function(){
								var player=_status.event.player,info=lib.skill.yuqi.getInfo(player);
								if(info[0]<info[3]&&game.countPlayer(function(current){
									return get.distance(player,current)<=info[0];
								})<Math.min(3,game.countPlayer())) return 0;
								if(info[3]<info[1]-1) return 3;
								if(info[1]<10) return 1;
								if(info[0]<5&&game.hasPlayer(function(current){
									return current!=player&&get.distance(player,current)>info[0];
								})) return 0;
								return 2;
							});
							'step 3'
							if(result.control!='cancel2'){
								if(result.index==1){var k=10}
								else{var k=5}
								var list=lib.skill.yuqi.getInfo(player);
								list[result.index]=Math.min(k,list[result.index]+1);
								game.log(player,'将',result.control,'数字改为','#y'+list[result.index])
								player.markSkill('yuqi');
							}
						},
					}
					lib.translate.yuqi_info='每回合限<span class=yellowtext>三</span>次。当有角色受到伤害后，若你至其的距离不大于<span class=thundertext>0</span>，则你可以观看牌堆顶的<span class=firetext>3</span>张牌。你将其中至多<span class=greentext>1</span>张牌交给受伤角色，然后可以获得剩余牌中的至多<span class=yellowtext>1</span>张牌，并将其余牌以原顺序放回牌堆顶。<span class=yellowtext>（红色的数字至多为10，其余的数字至多为5）</span>'				
					lib.dynamicTranslate.yuqi=function(player){
						var info=lib.skill.yuqi.getInfo(player);
						return '每回合限<span class=yellowtext>三</span>次。当有角色受到伤害后，若你至其的距离不大于<span class=thundertext>'+info[0]+'</span>，则你可以观看牌堆顶的<span class=firetext>'+info[1]+'</span>张牌。你将其中至多<span class=greentext>'+info[2]+'</span>张牌交给受伤角色，然后可以获得剩余牌中的至多<span class=yellowtext>'+info[3]+'</span>张牌，并将其余牌以原顺序放回牌堆顶。<span class=yellowtext>（红色的数字至多为10，其余的数字至多为5）</span>';
					}
				}
				//----------------------神诸葛
				lib.character['shen_zhugeliang']=['male','shen',3,['ybsl_qixing','ybsl_kuangfeng','dawu'],['shu']]
				// lib.skill.qixing2={
				// 	trigger:{
				// 		player:'phaseDrawAfter'
				// 	},
				// 	prompt:'收回所有星，并将至多7张手牌充入星',
				// 	content:function(){
				// 		'step 0'
				// 		player.gain(player.getExpansions('qixing'),'gain2');
				// 		player.logSkill('qixing2');
				// 		'step 1'
				// 		player.chooseCard('h',[1,7],'将至多七张手牌置于武将牌上称为星').set('ai',function(card){
				// 			return 6-get.value(card);
				// 		});
				// 		'step 2'
				// 		game.log(player,'将',result.cards,'作为“星”置于武将牌上');
				// 		player.addToExpansion(result.cards,player,'giveAuto').gaintag.add('qixing');
				// 	},
				// }
				// lib.translate.qixing_info='游戏开始时，你将牌堆顶的七张牌置于你的武将牌上，称之为“星”。然后你可用任意数量的手牌等量交换这些“星”；<span class=yellowtext>摸牌阶段结束后，你可以获得武将牌上所有星，然后选择至多七张手牌置于武将牌上称为星。</span>'
				
				// lib.skill.kuangfeng={
				// 	unique:true,
				// 	audio:2,
				// 	enable:'phaseUse',
				// 	usable:1,
				// 	enable:'chooseToUse',
				// 	filter:function(event,player){
				// 		return player.getExpansions('qixing').length;
				// 	},
				// 	filterTarget:function (card,player,target){
				// 		return !target.hasSkill('kuangfeng2');
				// 	},
				// 	content:function(){
				// 		'step 0'
				// 		target.addSkill('kuangfeng2');
				// 		var length=targets.length;
				// 		player.chooseCardButton('弃置'+get.cnNumber(length)+'枚星',length,player.getExpansions('qixing'),true);
				// 		player.addSkill('dawu3');
				// 		'step 1'
				// 		player.loseToDiscardpile(result.links);
				// 	},
				// 	ai:{combo:'qixing'},
				// 	group:'kuangfeng_66',
				// 	subSkill:{
				// 		66:{
				// 			unique:true,
				// 			audio:2,
				// 			trigger:{player:'phaseJieshuBegin'},
				// 			direct:true,
				// 			filter:function(event,player){
				// 				return player.getExpansions('qixing').length;
				// 			},
				// 			content:function(){
				// 				'step 0'
				// 				player.chooseTarget(get.prompt('kuangfeng'),'令一名角色获得“狂风”标记',function(card,player,target){
				// 					return !target.hasSkill('kuangfeng2');
				// 				}).ai=function(target){
				// 					return -1;
				// 				}
				// 				'step 1'
				// 				if(result.bool){
				// 					var length=result.targets.length;
				// 					for(var i=0;i<length;i++){
				// 						result.targets[i].addSkill('kuangfeng2');
				// 					}
				// 					player.logSkill('kuangfeng',result.targets,'fire');
				// 					player.chooseCardButton('弃置'+get.cnNumber(length)+'枚星',length,player.getExpansions('qixing'),true);
				// 					player.addSkill('dawu3');
				// 				}
				// 				else{
				// 					event.finish();
				// 				}
				// 				'step 2'
				// 				player.loseToDiscardpile(result.links);
				// 			},
				// 		}
				// 	}
				// }
				// lib.translate.kuangfeng_info='<span class=yellowtext>出牌阶段限一次</span>/结束阶段，你可以弃置1张“星”并指定一名角色：直到你的下回合开始，该角色受到火焰伤害时，此伤害+1。'
				//-----------------------铜雀
				/*
				//因为原版铜雀被作者加入了天火煅升级公式因此移除
				lib.card.tongque={
					audio:true,
					fullskin:true,
					type:'equip',
					subtype:'equip5',
					ai:{
						basic:{
							equipValue:7,
						}
					},
					skills:['tongque_skill']
				}
				lib.skill.tongque_skill={
					trigger:{player:'useCard1'},
					equipSkill:true,
					forced:true,
					filter:function(event,player){
						return !event.card.yingbian&&get.is.yingbian(event.card);
					},
					content:function(){
						trigger.card.yingbian=true;
						var info=get.info(trigger.card);
						if(info&&info.yingbian) info.yingbian(trigger);
						player.addTempSkill('yingbian_changeTarget');
					},
				}
				lib.translate.tongque_info='锁定技，你使用的带有【应变】效果的牌无视条件直接生效。'
				*/
				//-------------------------------卡牌修改
				
			}
			if(lib.config.extension_夜白神略_ybsl_wujinshilian=='lc'){
				lib.translate._YBLC_level='加点特权'
				lib.skill._YBLC_level={
					mark:true,
					marktext:'☆',
					direct:true,
					charlotte:true,
					ruleSkill:true,
					trigger:{player:'phaseBefore'},
					filter:function(event,player){
						if(!player.storage._YBLC_level>0)return false;
						return true;
					},
					content:function(){
						"step 0"
						if(!player.storage._YBLC_maxhp)player.storage._YBLC_maxhp=0;
						if(!player.storage._YBLC_hand)player.storage._YBLC_hand=0;
						if(!player.storage._YBLC_draw)player.storage._YBLC_draw=0;
						if(!player.storage._YBLC_damage)player.storage._YBLC_damage=0;
						if(!player.storage._YBLC_damage2)player.storage._YBLC_damage2=0;
						"step 1"
						var list=["伤害增加","额外摸牌数",'伤害减免',"体力上限","出杀次数","cancel2"];
						var xx=player.storage._YBLC_damage*20;
						if(xx>_status.yebailvcheng.completeNumber){
							list.remove("伤害增加");
						}
						var yy=player.storage._YBLC_draw*10;
						if(yy>_status.yebailvcheng.completeNumber){
							list.remove("额外摸牌数");
						}
						var zz=player.storage._YBLC_hand*15;
						if(zz>_status.yebailvcheng.completeNumber){
							list.remove("出杀次数");
						}
						var aa=player.storage._YBLC_damage2*20;
						if(aa>_status.yebailvcheng.completeNumber){
							list.remove("伤害减免");
						}
						player.chooseControl(list).set("prompt","你还有"+player.storage._YBLC_level+"个可用属性点，请选择加点。");
						"step 2"
						if(result.control=="伤害增加"){
							player.removeMark("_YBLC_level");
							player.storage._YBLC_damage++;
						}
						if(result.control=="额外摸牌数"){
							player.removeMark("_YBLC_level");
							player.storage._YBLC_draw++;
						}
						if(result.control=="伤害减免"){
							player.removeMark("_YBLC_level");
							player.storage._YBLC_damage2++;
						}
						if(result.control=="体力上限"){
							player.removeMark("_YBLC_level");
							player.gainMaxHp();
							player.recover();
							player.storage._YBLC_maxhp++;
						}
						if(result.control=="出杀次数"){
							player.removeMark("_YBLC_level");
							player.storage._YBLC_hand++;
						}
						if(result.control=="cancel2"){
							event.finish();
						}
						"step 3"
						if(player.storage._YBLC_level>0){
							event.goto(1);
						}
						else{
							event.finish();
						}
					},
				
					intro:{
						name:'闯关加点',
						content:function(storage,player,skill){
							var str='<br>剩余点数<li>';
							str+=player.storage._YBLC_level;
							str+='<br/>体力上限增加<li>';
							str+=get.translation(player.storage._YBLC_maxhp);
							str+='<br/>出杀次数增加<li>';
							str+=get.translation(player.storage._YBLC_hand);
							str+='<br/>摸牌阶段多摸<li>';
							str+=get.translation(player.storage._YBLC_draw);
							str+='<br/>造成伤害增加<li>';
							str+=get.translation(player.storage._YBLC_damage);
							str+='<br/>受到伤害减免<li>';
							str+=get.translation(player.storage._YBLC_damage2);
							return str;
						},
					},
					group:['_YBLC_level_1','_YBLC_level_2','_YBLC_level_3','_YBLC_level_4'],
					subSkill:{
						1:{
							trigger:{
								player:'phaseDrawBegin2',
							},
							direct:true,
							charlotte:true,
							filter:function (event,player){
								if(!player.storage._YBLC_draw) return false;
								return !event.numFixed;
							},
							content:function (){
								'step 0'
								if(!player.storage._YBLC_maxhp)player.storage._YBLC_maxhp=0;
								if(!player.storage._YBLC_hand)player.storage._YBLC_hand=0;
								if(!player.storage._YBLC_draw)player.storage._YBLC_draw=0;
								if(!player.storage._YBLC_damage)player.storage._YBLC_damage=0;
								if(!player.storage._YBLC_damage2)player.storage._YBLC_damage2=0;
								'step 1'
								if(player.storage._YBLC_draw>0){
									game.log(player,'加点特权，摸牌阶段多模'+get.translation(player.storage._YBLC_draw)+'张');
								}
								trigger.num+=(player.storage._YBLC_draw);
							},
						},
						2:{
							trigger:{
								source:'damageBegin1',
							},
							direct:true,
							charlotte:true,
							filter:function (event,player){
								if(!player.storage._YBLC_damage) return false;
								return !event.numFixed;
							},
							content:function (){
								'step 0'
								if(!player.storage._YBLC_maxhp)player.storage._YBLC_maxhp=0;
								if(!player.storage._YBLC_hand)player.storage._YBLC_hand=0;
								if(!player.storage._YBLC_draw)player.storage._YBLC_draw=0;
								if(!player.storage._YBLC_damage)player.storage._YBLC_damage=0;
								if(!player.storage._YBLC_damage2)player.storage._YBLC_damage2=0;
								'step 1'
								if(player.storage._YBLC_damage>0){
									game.log(player,'加点特权，伤害增加'+get.translation(player.storage._YBLC_damage)+'点');
								}
								trigger.num+=(player.storage._YBLC_damage);
							},
						},
						3:{
							charlotte:true,
							mod:{
								// maxHandcard:function (player,num){
									// return num+player.storage._YBLC_hand;
								// },
								cardUsable:function(card, player, num) {
									if (card.name == 'sha') return num+(player.storage._YBLC_hand||0);
								},
							},
					
							filter:function(event,player){
								if(!player.storage._YBLC_level>0)return false;
								return true;
							},
							enable:'phaseUse',
							prompt2:'是否消耗一个加点机会，摸一张牌？',
							content:function(){
								player.removeMark('_YBLC_level');
								player.draw();
							},
						},
						4:{
							trigger:{
								player:'damageBegin3',
							},
							direct:true,
							charlotte:true,
							filter:function (event,player){
								if(!player.storage._YBLC_damage2) return false;
								return !event.numFixed;
							},
							content:function (){
								'step 0'
								if(!player.storage._YBLC_maxhp)player.storage._YBLC_maxhp=0;
								if(!player.storage._YBLC_hand)player.storage._YBLC_hand=0;
								if(!player.storage._YBLC_draw)player.storage._YBLC_draw=0;
								if(!player.storage._YBLC_damage)player.storage._YBLC_damage=0;
								if(!player.storage._YBLC_damage2)player.storage._YBLC_damage2=0;
								'step 1'
								if(player.storage._YBLC_damage>0){
									game.log(player,'加点特权，伤害减免'+get.translation(player.storage._YBLC_damage2)+'点');
								}
								trigger.num-=(player.storage._YBLC_damage2);
							},
						}
					},
				}
				if(lib.brawl)lib.brawl.yebailvcheng={
					name:'夜白旅程',
					mode:'identity',
					showcase:function(init){
						var node=this;
						var player635;
						var player1;
						if(init){
							player635=ui.create.player(null,true).init('db_ybsp_014liutianyu');
							player635.node.marks.remove();
							player635.node.hp.remove();
							player635.style.left='calc(40%)';
							player635.style.top='calc(20%)';
							player635.style.transform='scale(0.5)';
							player635.node.count.remove();
							this.appendChild(player635);
							this.player635=player635;
						}
						else{
							player635=this.player635;
						}
						if(init){
							player1=ui.create.player(null,true).init('ybsl_002chenailin');
							player1.node.marks.remove();
							player1.node.hp.remove();
							player1.style.left='calc(10%)';
							player1.style.top='calc(-10%)';
							player1.style.transform='scale(0.5)';
							player1.node.count.remove();
							this.appendChild(player1);
							this.player1=player1;
							ui.refresh(player1);
						}
						else{
							player1=this.player1;
						}
						var func=function(){
							var player2=ui.create.player(null,true).init('ybsl_022salt');
							player2.node.marks.remove();
							player2.node.hp.remove();
							player2.style.left='auto';
							player2.style.right='calc(10%)';
							player2.style.top='calc(-10%)';
							player2.node.count.remove();
							player2.style.transform='scale(0.4)';
							player2.style.opacity=0;
							node.appendChild(player2);
							ui.refresh(player2);
							player2.style.opacity=1;
							player2.style.transform='scale(0.5)';
								
							setTimeout(function(){
								if(!player2) return;
								game.linexy([//线条
									player635.getLeft()+player635.offsetWidth/2,
									player635.getTop()+player635.offsetHeight/2,
									player1.getLeft()+player1.offsetWidth/2,
									player1.getTop()+player1.offsetHeight/2,
								],node);
								setTimeout(function(){
									var popup1=ui.create.div('.damage');//字体
									popup1.innerHTML='520';//字体的描述：
									popup1.dataset.nature='wood';//-1字体的颜色：木色
									player1.appendChild(popup1);//player1身上飘字popup1
									ui.refresh(popup1);
									popup1.classList.add('damageadded');
									popup1.listenTransition(function(){
										
										setTimeout(function(){
											popup1.delete();
										},300);//player1身上字体持续时间
									});
									
									setTimeout(function(){
										game.linexy([
											player1.getLeft()+player1.offsetWidth/2,
											player1.getTop()+player1.offsetHeight/2,
											player2.getLeft()+player2.offsetWidth/2,
											player2.getTop()+player2.offsetHeight/2,
										],node);
										var popup=ui.create.div('.damage');//字体的类别:：伤害
										popup.innerHTML='-999';//字体的描述：-1
										popup.dataset.nature='fire';//-1字体的颜色：火
										player2.appendChild(popup);//player2身上飘字popup
										ui.refresh(popup);
										popup.classList.add('damageadded');
										popup.listenTransition(function(){
											setTimeout(function(){
												popup.delete();
											},300);//player2身上字体持续时间
										});
									},900)//（两个动作之间的延迟）
								},250)//陈爱琳状态执行延迟
							},600);//决定从何时开始
							
							setTimeout(function(){
								if(!player2) return;
								player2.style.transition='all 0.5s';//player2受伤动画
								player2.style.transform='scale(0.7)';
								player2.delete();
							},2500);//盐的执行时间
						};
						node.showcaseinterval=setInterval(func,3500);//循环时间
						func();
					},
					intro:[
						'夜白的魔改，尔将进行无尽而漫长的单挑试炼',
						(lib.config.yebailvcheng_level?('你的最高纪录是连续通过'+lib.config.yebailvcheng_level+'关，是否能够突破这一记录呢？'):'你能否过五关斩六将，击败古城战神蔡阳呢？'),
					],
					init:function(){
						if(!_status.yebailvcheng) _status.yebailvcheng={
							completeNumber:0,
							used:['pujing','huban','caiyang'],
							addFellow:function(name){
								game.fan.dataset.position=3;
								ui.arena.setNumber(3);
								game.fellow=game.addFellow(1,name);
								var gain=4;
 								var add=0;
 								switch(_status.yebailvcheng.completeNumber){
									case 1:gain=5;break;
									case 2:gain=5;add=1;break;
									case 3:gain=6;add=1;break;
									default:gain=6;add=2;break;
								};
								game.fellow.hp+=add;
 								game.fellow.maxHp+=add;
								game.fellow.gain(get.cards(gain));
								game.fellow.identity='zhong';
								game.fellow.setIdentity();
								game.fellow.identityShown=true;
								game.fellow.node.identity.classList.remove('guessing');
								_status.event.getParent('phaseLoop').player=game.fellow;
							},
							/*//-----------已作废
							addDiren:function(name){
								game.fan.dataset.position=3;
								ui.arena.setNumber(5);
								game.diren=game.addDiren(4,name);
								game.diren.gain(get.cards(4));
								game.diren.identity='fan';
								game.diren.setIdentity();
								game.diren.identityShown=true;
								game.diren.node.identity.classList.remove('guessing');
								_status.event.getParent('phaseLoop').player=game.diren;
							},
							addPaohui:function(name){
								game.fan.dataset.position=3;
								ui.arena.setNumber(2);
								game.paohui=game.addPaohui(2,name);
								game.paohui.gain(get.cards(4));
								game.paohui.identity='fan';
								game.paohui.setIdentity();
								game.paohui.identityShown=true;
								game.paohui.node.identity.classList.remove('guessing');
								_status.event.getParent('phaseLoop').player=game.paohui;
							},
							*/
							completeReward:[
								['回复1点体力并摸一张牌',function(){
									game.zhu.recover();
									game.zhu.draw();
								}],
								['摸三张牌',function(){
									game.zhu.draw(3);
								}],
								['将一张防具牌置入装备区并摸一张牌',function(){
									var card=get.cardPile(function(card){
										return get.subtype(card)=='equip2'&&!get.cardtag(card,'gifts');
									});
									if(card) game.zhu.equip(card);
									game.zhu.draw();
								}],
								['将一张武器牌置入装备区并摸一张牌',function(){
									var card=get.cardPile(function(card){
										return get.subtype(card)=='equip1'&&!get.cardtag(card,'gifts');
									});
									if(card) game.zhu.equip(card);
									game.zhu.draw();
								}],
								['回复2点体力并弃置一张牌',function(){
									game.zhu.recover(2);
									game.zhu.chooseToDiscard('he',true);
								}],
								['摸五张牌，然后弃置三张牌',function(){
									game.zhu.draw(5);
									game.zhu.chooseToDiscard(3,'he',true);
								}],
								['摸五张牌，然后对手摸两张牌',function(){
									game.zhu.draw(5);
									game.fan.draw(2);
								}],
								['将一张武器牌和一张防具牌置入装备区',function(){
									var card=get.cardPile(function(card){
										return get.subtype(card)=='equip1'&&!get.cardtag(card,'gifts');
									});
									if(card) game.zhu.equip(card);
									var card2=get.cardPile(function(card){
										return get.subtype(card)=='equip2'&&!get.cardtag(card,'gifts');
									});
									if(card2) game.zhu.equip(card2);
								}],
								['将一张武器牌和一张防御坐骑牌置入装备区',function(){
									var card=get.cardPile(function(card){
										return get.subtype(card)=='equip1'&&!get.cardtag(card,'gifts');
									});
									if(card) game.zhu.equip(card);
									var card2=get.cardPile(function(card){
										return get.subtype(card)=='equip3'&&!get.cardtag(card,'gifts');
									});
									if(card2) game.zhu.equip(card2);
								}],
								['弃置所有手牌并于下一关获得【涅槃】(标)',function(){
									var hs=game.zhu.getCards('h');
									if(hs.length) game.zhu.discard(hs);
									game.zhu.addSkill('oldniepan');
									game.zhu.restoreSkill('oldniepan');
									game.zhu._oldniepan=true;
								}],
								['获得两张锦囊牌',function(){
									var list=[];
									while(list.length<2){
										var card=get.cardPile(function(card){
											return !list.contains(card)&&get.type(card,'trick')=='trick';
										});
										if(!card) break;
										list.push(card);
									}
									if(list.length) game.zhu.gain(list,'gain2','log');
								}],
								['将体力回复至体力上限，然后弃置一张牌',function(){
									var num=game.zhu.maxHp-game.zhu.hp;
									if(num) game.zhu.recover(num);
									game.zhu.chooseToDiscard('he',true);
								}],
								['弃置两张牌，在下一关的第一个回合后进行一个额外的回合',function(){
									game.zhu.chooseToDiscard(2,true,'he');
									game.zhu.addSkill('yebailvcheng_phase');
								}],
								['摸一张牌，然后将对手翻面',function(){
									game.zhu.draw();
									game.fan.turnOver(true);
								}],
								['摸一张牌，然后令对手受到1点伤害',function(){
									game.zhu.draw();
									game.fan.damage(game.zhu);
								}],
								['获得五张基本牌',function(){
									var list=[];
									while(list.length<5){
										var card=get.cardPile(function(card){
											return !list.contains(card)&&get.type(card)=='basic';
										});
										if(!card) break;
										list.push(card);
									}
									if(list.length) game.zhu.gain(list,'gain2','log');
								}],
								['失去1点体力，然后摸五张牌',function(){
									game.zhu.loseHp();
									game.zhu.draw(5);
								}],
								['失去体力至1点，然后摸七张牌',function(){
									var num=game.zhu.hp-1;
									if(num) game.zhu.loseHp(num);
									game.zhu.draw(7)
								}],
								['弃置一张牌，然后令对手受到2点伤害',function(){
									game.zhu.chooseToDiscard('he',true);
									game.fan.damage(game.zhu,2);
								}],
								['在下一关中召唤孙丽松一同战斗',function(){
									_status.yebailvcheng.addFellow('ybsl_001sunlisong');
								}],
								['在下一关中召唤满城柒一同战斗',function(){
									_status.yebailvcheng.addFellow('dzsl_016manchengqi');
								}],
								['在下一关中召唤蚕一同战斗',function(){
									_status.yebailvcheng.addFellow('ybsl_026can');
								}],
								['将一张宝物牌置入装备区并摸一张牌',function(){
									var card=get.cardPile(function(card){
										return get.subtype(card)=='equip5'&&!get.cardtag(card,'gifts');
									});
									if(card) game.zhu.equip(card);
									game.zhu.draw();
								}],
								['摸五张牌，然后将自己翻面',function(){
									game.zhu.draw(5);
									game.zhu.turnOver(true);
								}],
								['获得一张【酒】和一张【杀】',function(){
									var list=[];
									var card=get.cardPile(function(card){
											return card.name=='sha';
										});
									if(card) list.push(card);
									var card=get.cardPile(function(card){
										return card.name=='jiu';
										});
									if(card) list.push(card);
									if(list.length) game.zhu.gain(list,'gain2','log');
								}],
								['弃置五张牌，获得花中四君子各一张',function(){
									game.zhu.chooseToDiscard(5,true,'he');
									var list=[];
									var card=game.createCard('ybsl_meihua','club',null,null);
									if(card) list.push(card);
									var card=game.createCard('ybsl_lanhua','diamond',null,null);
									if(card) list.push(card);
									var card=game.createCard('ybsl_zhuzi','spade',null,null);
									if(card) list.push(card);
									var card=game.createCard('ybsl_juhua','heart',null,null);
									if(card) list.push(card);
									game.zhu.gain(list,'gain2','log');
								}],
								['额外获得一次加点',function(){
									game.zhu.addMark('_YBLC_level');
								}],
							],
							// Spades, hearts, clubs, diamonds
							completeYbsl:[
								
							],
							replace_character:function(){
								'step 0'
								if(game.zhu._oldniepan){
									game.zhu.removeSkill('oldniepan');
									delete game.zhu._oldniepan;
								}
								_status.yebailvcheng.completeNumber++;
								if(!lib.config.yebailvcheng_level||lib.config.yebailvcheng_level<_status.yebailvcheng.completeNumber){
									lib.config.yebailvcheng_level=_status.yebailvcheng.completeNumber;
									game.saveConfig('yebailvcheng_level',lib.config.yebailvcheng_level);
								}
								if(game.fellow&&game.fellow.isAlive()){
									if(ui.land&&ui.land.player==game.fellow){
										game.addVideo('destroyLand');
										ui.land.destroy();
									}
									game.zhu.next=game.fan;
									game.fan.next=game.zhu;
									game.zhu.nextSeat=game.fan;
									game.fan.nextSeat=game.zhu;
									game.players.remove(game.fellow);
									_status.dying.remove(game.fellow);
									game.fellow.out();
									for(var mark in game.fellow.marks){
										game.fellow.unmarkSkill(mark);
									}
									while(game.fellow.node.marks.childNodes.length>1){
										game.fellow.node.marks.lastChild.remove();
									}
									for(var i in game.fellow.tempSkills){
										game.fellow.removeSkill(i);
									}
									var skills=game.fellow.getSkills();
									for(var i=0;i<skills.length;i++){
										if(lib.skill[skills[i]].temp){
											game.fellow.removeSkill(skills[i]);
										}
									}
									var cards=game.fellow.getCards('hej');
									while(cards.length){
										ui.discardPile.appendChild(cards.shift());
									}
								}
								'step 1'
								/*
								if(game.fellow||game.fan){
									if(game.fan){
										game.dead.remove(game.fan);
										game.fan.remove();
									}
								}
								*/
								if(game.fellow){
									game.dead.remove(game.fellow);
									game.fellow.remove();
								}
								game.fan.dataset.position=1;
								ui.arena.setNumber(2);
								game.zhu.next=game.fan;
								game.fan.next=game.zhu;
								game.zhu.nextSeat=game.fan;
								game.fan.nextSeat=game.zhu;
 								var list=_status.yebailvcheng.completeReward.randomGets(3);
 								var list2=[];
 								for(var i=0;i<list.length;i++){
 									list2.push(list[i][1]);
 									list[i]=list[i][0];
 								}
								var list6=_status.yebailvcheng.completeYbsl.randomGets(1);
								list2.push(list6[0][1]);
 								list.push(list6[0][0]);
								
								/*
 								var list=_status.yebailvcheng.completeReward.randomGets(4);
 								var list2=[];
 								for(var i=0;i<list.length;i++){
 									list2.push(list[i][1]);
 									list[i]=list[i][0];
 								}
								*/
								
 								if(_status.yebailvcheng.completeNumber>=6){
									list.push('我不想再打了，直接在这里结束吧！');
 									list2.push(function(){
 										game.over(true);
 									});
 								}
 								event.list=list2;
 								if(_status.yebailvcheng.completeNumber%5!=0||_status.yebailvcheng.completeNumber>30){
 									game.zhu.chooseControl().set(
										'choiceList',list).set(
										'prompt','请选择一项奖励（当前已通过'+_status.yebailvcheng.completeNumber+'关）');
								}
								else if(_status.yebailvcheng.completeNumber==35){
									game.zhu.addMark('_YBLC_level');
									event.list=[
										['在下一关中召唤sp陈爱琳一同战斗',function(){
											_status.yebailvcheng.addFellow('ybsp_002chenailin');
										}],
										['在下一关中召唤sp陈爱琳一同战斗',function(){
											_status.yebailvcheng.addFellow('ybsp_002chenailin');
										}],
										['在下一关中召唤sp陈爱琳一同战斗',function(){
											_status.yebailvcheng.addFellow('ybsp_002chenailin');
										}],
										['在下一关中召唤sp陈爱琳一同战斗',function(){
											_status.yebailvcheng.addFellow('ybsp_002chenailin');
										}],
										['我不想再打了，直接在这里结束吧！',function(){
											game.over(true);
										}],
									];
									game.zhu.chooseControl().set(
										'choiceList',list).set(
										'prompt','下一关BOSS战，请选择一项（当前已通过'+_status.yebailvcheng.completeNumber+'关）');
								}
								else{
									game.zhu.addMark('_YBLC_level');
									game.zhu.chooseControl().set(
										'choiceList',list).set(
										'prompt','下一关BOSS战，请选择一项（当前已通过'+_status.yebailvcheng.completeNumber+'关）');
								}
								'step 2'
								if(result.index==4){
									game.over(true);
									return;
								}
								event.reward=event.list[result.index];
								_status.characterlist.removeArray(_status.yebailvcheng.used);
								if(_status.yebailvcheng.completeNumber==5) {event._result={links:['ybsl_011gaoyuhang']};}
								else if(_status.yebailvcheng.completeNumber==10) {event._result={links:['ybsl_009liyushan']};}
								else if(_status.yebailvcheng.completeNumber==15) {event._result={links:['ybsl_008wuyuxin']};}
								else if(_status.yebailvcheng.completeNumber==20) {event._result={links:['ybsl_010zhouyue']};}
								else if(_status.yebailvcheng.completeNumber==25) {event._result={links:['ybsl_001sunlisong']};}
								else if(_status.yebailvcheng.completeNumber==30) {event._result={links:['ybsl_002chenailin']};}
								else if(_status.yebailvcheng.completeNumber==35) {event._result={links:['ybsl_022salt']};}
								
								else game.zhu.chooseButton(['选择下一关出战的对手',[_status.characterlist.randomGets(lib.config.extension_夜白神略_ybsl_wujianghouxuan),'character']],true);
								//-------------------------------------------------此处数值为第二关及以后候选敌人的数目↑↑--------------//
								/*
								else if(_status.yebailvcheng.completeNumber<5){
									game.zhu.chooseButton(['选择下一关出战的对手',[_status.characterlist.randomGets(8),'character']],true);
								}
								else if(_status.yebailvcheng.completeNumber>5){
									game.zhu.chooseButton(['选择下一关出战的对手及其一个跟班',[_status.characterlist.randomGets(14),'character']],2,true);
								}
								else if(_status.yebailvcheng.completeNumber>=10){
									game.zhu.chooseButton(['选择下一关出战的对手及其两个跟班',[_status.characterlist.randomGets(20),'character']],3,true);
								}
								*/
								/*功能正在测试*/
								'step 3'
								_status.event.getParent('phaseLoop').player=game.zhu;
								var source=game.fan;
								var name=result.links[0];
								source.revive(null,false);
 								_status.characterlist.remove(name);
 								_status.yebailvcheng.used.push(name);
 								source.uninit();
 								source.init(name);
 							
 								source.addMark('_YBLC_level',Math.floor(_status.yebailvcheng.completeNumber/5)+1);
 								if(_status.yebailvcheng.completeNumber==15){
 									source.addSkill('yb009_tuling');
 								}
 								if(_status.yebailvcheng.completeNumber==20){
 									source.addSkill('yb008_jianwu');
 								}
 								if(_status.yebailvcheng.completeNumber==30){
 									source.addSkill('yb001_wanyue');
 									source.addSkill('yb001_fufeng');
 								}
 								source.lose(source.getCards('hejs'))._triggered=null;
 								game.addVideo('reinit',source,[name]);
 								var gain=4;
 								var add=0;
 								switch(_status.yebailvcheng.completeNumber){
									case 1:gain=5;break;
									case 2:gain=5;add=1;break;
									case 3:gain=6;add=1;break;
									default:gain=6;add=2;break;
								};
 								source.hp+=add;
 								source.maxHp+=add;
 								source.update();
 								source.gain(get.cards(gain))._triggered=null;
 								game.triggerEnter(source);
								//--------------------------招降模块
								_status.yebailvcheng.completeYbsl.push(
									['在下一关中召唤'+get.translation(name)+'一同战斗',function(){
									_status.yebailvcheng.addFellow(name);
									}]
								)
								//--------------------------召唤炮灰
								//if(result.links[1]){_status.yebailvcheng.addDiren(result.links[1]);}
								//if(result.links[2]){_status.yebailvcheng.addPaohui(result.links[2]);}
										//---------------------------
								/*
					 					if(result.links[1]){
									var paohui=game.fan;
								 	var name2=result.links[1];
											paohui.revive(null,false);
 									_status.characterlist.remove(name2);
 											_status.yebailvcheng.used.push(name2);
 									paohui.uninit();
									paohui.dataset.position=3;
									paohui.init(name2);
 									game.addVideo('reinit',paohui,[name2]);
 									paohui.lose(paohui.getCards('hejs'))._triggered=null;
 									paohui.hp+=1;
 									paohui.maxHp+=1;
 											paohui.update();
 									paohui.gain(get.cards(5))._triggered=null;
										}
								if(result.links[2]){
									var zabing=game.fan;
									var name3=result.links[2];
									zabing.revive(null,false);
									_status.characterlist.remove(name3);
 									_status.yebailvcheng.used.push(name3);
 									zabing.uninit();
									zabing.dataset.position=3;
 									zabing.init(name3);
 									game.addVideo('reinit',zabing,[name3]);
 									zabing.lose(zabing.getCards('hejs'))._triggered=null;
 									zabing.hp+=1;
 									zabing.maxHp+=1;
									zabing.update();
 									zabing.gain(get.cards(5))._triggered=null;
								}
								*/
								if(event.reward) event.reward();
								'step 4'
								var cards=Array.from(ui.ordering.childNodes);
								while(cards.length){
									cards.shift().discard();
								}
								var evt=_status.event.getParent('phase');
								if(evt){
									game.resetSkills();
									_status.event=evt;
									_status.event.finish();
									_status.event.untrigger(true);
								}
							},
						};
						_status.yebailvcheng.player_number=get.config('player_number');
						game.saveConfig('player_number','2','identity');
					},
					content:{
						submode:'normal',
						chooseCharacterBefore:function(){
							game.identityVideoName='夜白旅程';
							game.saveConfig('player_number',_status.yebailvcheng.player_number,'identity');
							game.chooseCharacter=function(){
								var next=game.createEvent('chooseCharacter',false);
								next.showConfig=true;
								next.setContent(function(){
									'step 0'
									ui.arena.classList.add('choose-character');
									game.me.identity='zhu';
									game.zhu=game.me;
									game.fan=game.me.next;
									game.fan.identity='fan';
									game.zhu.setIdentity();
									game.zhu.identityShown=true;
									game.zhu.node.identity.classList.remove('guessing');
									game.fan.setIdentity();
									game.fan.identityShown=true;
									game.fan.node.identity.classList.remove('guessing');
									event.list=[];
									for(var i in lib.character){
										if(lib.filter.characterDisabled(i)) continue;
										event.list.push(i);
									}
									event.list.randomSort();
									_status.characterlist=event.list.slice(0);
									var list=event.list.slice(0,5);
									var list2=['ybslshen_014liutianyu'];
									delete event.swapnochoose;
									var dialog;
									if(event.swapnodialog){
										dialog=ui.dialog;
										event.swapnodialog(dialog,list);
										delete event.swapnodialog;
									}
									else{
										var str='选择角色';
										var strt='神夜白将在此界面常驻，方便选择<br>（若有其他想点的将可以联系作者进行加入）';
										//或者在上边list2方括号里自己写武将ID，将与将之间用英文逗号隔开
										dialog=ui.create.dialog(str,'hidden',strt,[list,'character'],[list2,'character']);
									}
									dialog.setCaption('选择角色');
									game.me.chooseButton(dialog,true).set('onfree',true);
									ui.create.cheat=function(){
										_status.createControl=ui.cheat2;
										ui.cheat=ui.create.control('更换',function(){
											if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
												return;
											}
											if(game.changeCoin){
												game.changeCoin(-3);
											}
											event.list.randomSort();
											list=event.list.slice(0,5);
											var buttons=ui.create.div('.buttons');
											var node=_status.event.dialog.buttons[0].parentNode;
											_status.event.dialog.buttons=ui.create.buttons(list,'character',buttons);
											_status.event.dialog.content.insertBefore(buttons,node);
											buttons.animate('start');
											node.remove();
											game.uncheck();
											game.check();
										});
										delete _status.createControl;
									};
									if(lib.onfree){
										lib.onfree.push(function(){
											event.dialogxx=ui.create.characterDialog('heightset');
											if(ui.cheat2){
												ui.cheat2.animate('controlpressdownx',500);
												ui.cheat2.classList.remove('disabled');
											}
										});
									}
									else{
										event.dialogxx=ui.create.characterDialog('heightset');
									}
									ui.create.cheat2=function(){
										ui.cheat2=ui.create.control('自由选将',function(){
											if(this.dialog==_status.event.dialog){
												if(game.changeCoin){
													game.changeCoin(50);
												}
												this.dialog.close();
												_status.event.dialog=this.backup;
												this.backup.open();
												delete this.backup;
												game.uncheck();
												game.check();
												if(ui.cheat){
													ui.cheat.animate('controlpressdownx',500);
													ui.cheat.classList.remove('disabled');
												}
											}
											else{
												if(game.changeCoin){
													game.changeCoin(-10);
												}
												this.backup=_status.event.dialog;
												_status.event.dialog.close();
												_status.event.dialog=_status.event.parent.dialogxx;
												this.dialog=_status.event.dialog;
												this.dialog.open();
												game.uncheck();
												game.check();
												if(ui.cheat){
													ui.cheat.classList.add('disabled');
												}
											}
										});
										if(lib.onfree){
											ui.cheat2.classList.add('disabled');
										}
									}
									if(!_status.brawl||!_status.brawl.chooseCharacterFixed){
										if(!ui.cheat&&get.config('change_choice'))
											ui.create.cheat();
										if(!ui.cheat2&&get.config('free_choose'))
											ui.create.cheat2();
									}
									'step 1'
									if(ui.cheat){
										ui.cheat.close();
										delete ui.cheat;
									}
									if(ui.cheat2){
										ui.cheat2.close();
										delete ui.cheat2;
									}
									game.addRecentCharacter(result.buttons[0].link);
									game.zhu.init(result.buttons[0].link);
									_status.characterlist.remove(result.buttons[0].link);
									_status.yebailvcheng.used.add(result.buttons[0].link);
									game.zhu.chooseControl('一阶','二阶','三阶','四阶','五阶').set('prompt','请选择武将等阶');
									'step 2'
									var hp=Math.floor(result.index/2);
									event.draw=Math.floor((result.index+1)/2);
									if(hp){
										game.zhu.hp+=hp;
										game.zhu.maxHp+=hp;
										game.zhu.update();
									}
									game.zhu.addMark('_YBLC_level');
									var list666=_status.characterlist.randomGets(lib.config.extension_夜白神略_ybsl_wujianghouxuan);
									list666.push('ybsl_059starsFall3');
									game.zhu.chooseButton(['请选择对手的登场武将',[list666,'character']],true);
									'step 3'
									game.fan.init(result.links[0]);
									game.fan.addMark('_YBLC_level');
									_status.characterlist.remove(result.links[0]);
									_status.yebailvcheng.used.add(result.links[0]);
									if(event.draw){
										game.zhu.directgain(get.cards(event.draw));
									}
									setTimeout(function(){
										ui.arena.classList.remove('choose-character');
									},500);
									_status.yebailvcheng.completeYbsl.push([
										'在下一关中召唤'+get.translation(result.links[0])+'一同战斗',
										function(){_status.yebailvcheng.addFellow(result.links[0]);
									}])
									var pack={
										character:{
											pujing:['male','qun',1,[],[]],
											huban:['male','qun',2,[],[]],
											caiyang:['male','qun',1,['zhuixi'],[]],
										},
										translate:{
											pujing:'普净',
											huban:'胡班',
											_YBLC_level:'特权加点',
										},
										skill:{
											yebailvcheng_phase:{
												trigger:{global:'phaseAfter'},
												forced:true,
												silent:true,
												firstDo:true,
												content:function(){
													player.removeSkill('yebailvcheng_phase');
													player.insertPhase();
												},
											},
										},
									};
									for(var i in pack){
										for(var j in pack[i]){
											lib[i][j]=pack[i][j];
										}
									}
									delete pack.skill;
									game.addVideo('arrangeLib',null,pack);
									game.addOverDialog=function(dialog){
										dialog.addText('共计通过'+_status.yebailvcheng.completeNumber+'关');
									};
									lib.element.player.dieAfter=function(){
										if(this==game.fellow) return;
										_status.characterlist.removeArray(_status.yebailvcheng.used);
										if(game.zhu==this||!_status.characterlist.length){
											var bool=false;
											if(_status.yebailvcheng.completeNumber>5) bool=true;
											game.over(bool);
										}
										else{
											var next=game.createEvent('yebailvcheng_replace',false);
											next.setContent(_status.yebailvcheng.replace_character);
										}
									};
									lib.element.player.dieAfter2=function(){
										_status.characterlist.removeArray(_status.yebailvcheng.used);
									};
									game.zhu.dieAfter=lib.element.player.dieAfter;
									game.fan.dieAfter=lib.element.player.dieAfter;
									game.zhu.dieAfter2=lib.element.player.dieAfter2;
									game.fan.dieAfter2=lib.element.player.dieAfter2;
								});
							};
						}
					}
				}
			}
			
			if(lib.config.extension_夜白神略_ybsl_wujinshilian=='tf'){
				lib.brawl.yebailvcheng={
					name:'夜白塔防',
					mode:'chess',
					showcase:function(init){//简介动画
						var node=this;
						var player635;
						var player1;
						if(init){
							player635=ui.create.player(null,true).init('db_ybsp_014liutianyu');
							player635.node.marks.remove();
							player635.node.hp.remove();
							player635.style.left='calc(40%)';
							player635.style.top='calc(20%)';
							player635.style.transform='scale(0.5)';
							player635.node.count.remove();
							this.appendChild(player635);
							this.player635=player635;
						}
						else{
							player635=this.player635;
						}
						if(init){
							player1=ui.create.player(null,true).init('ybsl_002chenailin');
							player1.node.marks.remove();
							player1.node.hp.remove();
							player1.style.left='calc(10%)';
							player1.style.top='calc(-10%)';
							player1.style.transform='scale(0.5)';
							player1.node.count.remove();
							this.appendChild(player1);
							this.player1=player1;
							ui.refresh(player1);
						}
						else{
							player1=this.player1;
						}
						var func=function(){
							var player2=ui.create.player(null,true).init('ybsl_022salt');
							player2.node.marks.remove();
							player2.node.hp.remove();
							player2.style.left='auto';
							player2.style.right='calc(10%)';
							player2.style.top='calc(-10%)';
							player2.node.count.remove();
							player2.style.transform='scale(0.4)';
							player2.style.opacity=0;
							node.appendChild(player2);
							ui.refresh(player2);
							player2.style.opacity=1;
							player2.style.transform='scale(0.5)';
								
							setTimeout(function(){
								if(!player2) return;
								game.linexy([//线条
									player635.getLeft()+player635.offsetWidth/2,
									player635.getTop()+player635.offsetHeight/2,
									player1.getLeft()+player1.offsetWidth/2,
									player1.getTop()+player1.offsetHeight/2,
								],node);
								setTimeout(function(){
									var popup1=ui.create.div('.damage');//字体
									popup1.innerHTML='520';//字体的描述：
									popup1.dataset.nature='wood';//-1字体的颜色：木色
									player1.appendChild(popup1);//player1身上飘字popup1
									ui.refresh(popup1);
									popup1.classList.add('damageadded');
									popup1.listenTransition(function(){
										
										setTimeout(function(){
											popup1.delete();
										},300);//player1身上字体持续时间
									});
									
									setTimeout(function(){
										game.linexy([
											player1.getLeft()+player1.offsetWidth/2,
											player1.getTop()+player1.offsetHeight/2,
											player2.getLeft()+player2.offsetWidth/2,
											player2.getTop()+player2.offsetHeight/2,
										],node);
										var popup=ui.create.div('.damage');//字体的类别:：伤害
										popup.innerHTML='-999';//字体的描述：-1
										popup.dataset.nature='fire';//-1字体的颜色：火
										player2.appendChild(popup);//player2身上飘字popup
										ui.refresh(popup);
										popup.classList.add('damageadded');
										popup.listenTransition(function(){
											setTimeout(function(){
												popup.delete();
											},300);//player2身上字体持续时间
										});
									},900)//（两个动作之间的延迟）
								},250)//陈爱琳状态执行延迟
							},600);//决定从何时开始
							
							setTimeout(function(){
								if(!player2) return;
								player2.style.transition='all 0.5s';//player2受伤动画
								player2.style.transform='scale(0.7)';
								player2.delete();
							},2500);//盐的执行时间
						};
						node.showcaseinterval=setInterval(func,3500);//循环时间
						func();
					},
					intro:[
						'夜白的魔改，尔将进行无尽而漫长的塔防战争',
						(lib.config.yebaitafang_level?('你的最高纪录是连续通过'+lib.config.yebaitafang_level+'关，是否能够突破这一记录呢？'):'你能走到哪一步呢？'),
					],
				}
			}
			if(lib.config.extension_夜白神略_ybsl_wujinshilian=='gz'){
				var list=lib.characterPack.ybslj;
				for(var i in list){
					lib.characterPack.mode_guozhan['gz_'+i]=[list[i][0],list[i][1],list[i][2],list[i][3],list[i][4]]
				}
				var list2=lib.characterPack.ybart;
				for(var k in list2){
					lib.characterPack.mode_guozhan['gz_'+k]=[list2[k][0],list2[k][1],list2[k][2],list2[k][3],list2[k][4]]
				}
			}
		},
		precontent:function (ybslb){
			if(ybslb.enable){ //武将包 
				//---------------------整活--------------------//
				{// 读取文件夹
					lib.init.js(lib.assetURL + `extension/夜白神略/ext`, "ybslj");
					lib.config.all.characters.push('ybslj');
					if(!lib.config.characters.contains('ybslj'))lib.config.characters.remove('ybslj');
					lib.translate['ybslj_character_config']='<span style=\'color:#28e3ce\'>夜白将包</span>';

					
					
					lib.init.js(lib.assetURL + `extension/夜白神略/ext`, "ybgz");
					lib.config.all.characters.push('ybgz');
					if(!lib.config.characters.contains('ybgz'))lib.config.characters.remove('ybgz');
					lib.translate['ybgz_character_config']='<span style=\'color:#28e3ce\'>夜白国战</span>';

					lib.init.js(lib.assetURL + `extension/夜白神略/ext`, "ybxh");
					lib.config.all.characters.push('ybxh');
					if(!lib.config.characters.contains('ybxh'))lib.config.characters.remove('ybxh');
					lib.translate['ybxh_character_config']='<span style=\'color:#28e3ce\'>校花</span>';
					
					lib.init.js(lib.assetURL + `extension/夜白神略/ext`, "ybart");
					lib.config.all.characters.push('ybart');
					if(!lib.config.characters.contains('ybart'))lib.config.characters.remove('ybart');
					lib.translate['ybart_character_config']='<span style=\'color:#28e3ce\'>六艺篇</span>';
							
					lib.init.js(lib.assetURL + `extension/夜白神略/ext`, "ybslc");
					lib.config.all.cards.push('ybslc');//包名翻译
					if(!lib.config.cards.contains('ybslc'))lib.config.cards.remove('ybslc');
					lib.translate['ybslc_card_config']='<span style=\'color:#ff00cc\'>夜白牌堆</span>';
					
					lib.init.js(lib.assetURL + `extension/夜白神略/ext`, "ybgod");
					lib.config.all.cards.push('ybgod');
					if(!lib.config.cards.contains('ybgod'))lib.config.cards.remove('ybgod');
					lib.translate['ybgod_card_config']='<span style=\'color:#e1ff00\'>BOSS搬运</span>';

					lib.init.js(lib.assetURL + `extension/夜白神略/ext`, "ybdd");
					// lib.config.all.cards.push('ybdd');
					lib.config.all.characters.push('ybdd');
					if(!lib.config.characters.contains('ybdd'))lib.config.characters.remove('ybdd');
					lib.translate['ybdd_character_config']='<span style=\'color:#e1ff00\'>夜白接单</span>';

					// lib.init.js(lib.assetURL + `extension/夜白神略/ext`, "shashan");
					lib.init.js(lib.assetURL + `extension/夜白神略/ext`, "list24");
					
					lib.init.js(lib.assetURL + `extension/夜白神略/ext2`, "yb1");
					//此后新版本的更新方式，以便于拼接
					
					
					// lib.list24=[];
					// for(var i=0;i<window.list24.length;i++){
					// 	lib.list24.add(window.list24[i]);
					// }
					// lib.list24.addArray(window.list24);
					lib.skill.ybsl_list24={
						getList24:function(){
							// var list=[];
							// for(var i=0;i<window.list24.length;i++){
							// 	list.add(window.list24[i]);
							// }
							// return list;
							return window.list24;
						}
					}
				}
				{//武将第五格评级
				    //狂神著
					lib.arenaReady.push(function(){
						for(var pack of ["ybslj","ybxh","ybdd","ybgod","ybslc","ybart"]){
							for(var name in lib.characterPack[pack]){
								// var rarity=lib.characterPack[pack][name][5];
								// if(['junk','common','rare','epic','legend'].contains(rarity)) lib.rank.rarity[rarity].add(name);
								for(var rarity of ['junk','common','rare','epic','legend']){//废材，普通，精品，史诗，传说
									if(lib.characterPack[pack][name][4].contains(rarity)){
										lib.rank.rarity[rarity].add(name);
										break;
									}
								}
							}
						}
					});
				}
				{//夜白创建时机
					//---------------卡牌伤害时机
					lib.skill._YB_cardDamage={
						trigger:{
							player:['damage','damageBefore','damageBegin','damageBegin1','damageBegin2','damageBegin3','damageBegin4','damageEnd','damageAfter','die','dying','dieAfter','dieAfter2'],
							source:['damageSource'],
						},
						filter:function(event){
							return event.card&&lib.card[event.card.name];
						},
						popup:false,
						forced:true,
						content:function(){
							var str=event.triggername;
							trigger.trigger("YBcard_"+str);
						},
					};
					//---------------每阶段时机
					lib.skill._YB_any={
						trigger:{
							player:['phaseZhunbei','phaseJudge','phaseDraw','phaseUse','phaseDiscard','phaseJieshu'],
						},
						popup:false,
						forced:true,
						content:function(){
							trigger.trigger("YB_any");
						},
					};
					//---------------每阶段时机开始前
					lib.skill._YB_anyBefore={
						trigger:{
							player:['phaseZhunbeiBefore','phaseJudgeBefore','phaseDrawBefore','phaseUseBefore','phaseDiscardBefore','phaseJieshuBefore'],
						},
						popup:false,
						forced:true,
						content:function(){
							trigger.trigger("YB_anyBefore");
						},
					};
					//---------------每阶段时机开始时
					lib.skill._YB_anyBegin={
						trigger:{
							player:['phaseZhunbeiBegin','phaseJudgeBegin','phaseDrawBegin','phaseUseBegin','phaseDiscardBegin','phaseJieshuBegin'],
						},
						popup:false,
						forced:true,
						content:function(){
							trigger.trigger("YB_anyBegin");
						},
					};
					//---------------每阶段时机结束时
					lib.skill._YB_anyEnd={
						trigger:{
							player:['phaseZhunbeiEnd','phaseJudgeEnd','phaseDrawEnd','phaseUseEnd','phaseDiscardEnd','phaseJieshuEnd'],
						},
						popup:false,
						forced:true,
						content:function(){
							trigger.trigger("YB_anyEnd");
						},
					};
					//---------------每阶段时机结束后
					lib.skill._YB_anyAfter={
						trigger:{
							player:['phaseZhunbeiAfter','phaseJudgeAfter','phaseDrawAfter','phaseUseAfter','phaseDiscardAfter','phaseJieshuAfter'],
						},
						popup:false,
						forced:true,
						content:function(){
							trigger.trigger("YB_anyAfter");
						},
					};
					//---------------因旅心摸牌时
					lib.skill._YB_lvxindraw={
						trigger:{
							player:['gainEnd'],
						},
						popup:false,
						forced:true,
						filter:function(event,player){
							if(event.skill&&event.skill=='yb014_lvxin') event.trigger('YB_lvxindraw');
							return false;
						},
						// content:function(){
						// 	trigger.trigger("YB_lvxindraw");
						// },
					};
				}
				{//---------------属性伤害特效
					lib.skill._YB_snowsha={//------雪杀
						trigger:{
							source:'damageSource',
						},
						equipSkill:false,
						ruleSkill:true,
						shaRelated:true,
						filter:function (event,player){
							return event.hasNature('YB_snow')&&event.num>0&&event.player.isAlive();
						},
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
					};
					lib.skill._YB_bloodsha={//--------血杀
						trigger:{
							source:'damageSource',
						},
						equipSkill:false,
						direct:true,
						forced:true,
						ruleSkill:true,
						shaRelated:true,
						filter:function (event,player){
							return event.hasNature('YB_blood')&&event.num>0;
						},
						content:function (){
							player.recover(trigger.num);
						},
					};
				}
				lib.skill._ybsl_tiandu_audio={
					direct:true,
					ruleSkill:true,
					trigger:{
						global:['phaseBefore','enterGame','gameStart','chooseButtonBefore'],
					},
					filter:function(event,player){
						return true;
					},
					characterlist:function(){
						return [
							'luxun','re_luxun','shen_luxun','diy_luxun','diy_lukang',
							'jsrg_luxun','luyusheng','ns_luyusheng','lukang','luji',
							'ol_lukai','lukai','wu_luxun'
						]
					},
					content:function(){
						'step 0'
						if(!lib.skill.tiandu.audioname2)lib.skill.tiandu.audioname2={};
						lib.skill.tiandu.audioname2.ybslclan_luyan='ybsl_lytiandu';
						var list=lib.skill._ybsl_tiandu_audio.characterlist();
						for(var i of list){
							// lib.character[i].clans.push("吴郡陆氏")
							if(lib.character[i]){
								lib.character[i][4].push('clan:吴郡陆氏')
							}
						}
						'step 1'
						game.removeGlobalSkill('_ybsl_tiandu_audio');
					}
				}
				//------------------言笑加入牌堆……
				lib.skill._ybsl_yanxiao={//-----------言笑
					ruleSkill:true,
					trigger:{player:'phaseJudgeBegin'},
					forced:true,
					filter:function(event,player){
						return player.countCards('j')>0&&player.hasJudge('yanxiao_card');
					},
					content:function(){
						player.gain(player.getCards('j'),'gain2');
					},
					ai:{
						effect:{
							target:function(card,player,target){
								if(get.type(card)=='delay'&&target.hasJudge('yanxiao_card')) return [0,0,0,0.1];
							}
						}
					}
				};
				//----------出牌阶段计数
				lib.skill._YB_phaseNumber={
					direct:true,
					charlotte:true,
					trigger:{
						player:'phaseUseBegin',
					},
					ruleSkill:true,
					content:function(){
						player.addMark('_YB_phaseNumber',1,false);
						// player.unmarkSkill('_YB_phaseNumber');
					},
					// mark:false,
					firstDo:true,
					// marktext:'出',
					// intro:{
					// 	name:'出牌阶段计数',
					// 	content:'你经历了$个出牌阶段',
					// },
				}
				lib.translate._yb_phaseNumber='出牌阶段计数'
				//话说，我要是整个
				// lib.skill._YB_damage={
				// 	trigger:{player:'damageBegin4'},
				// 	filter:function(event,player){
				// 		if()
				// 	}
				// }
				//-------------国战模式选将时梦改忆
				lib.skill._ybsl_huiyi={
					ruleSkill:true,
					trigger:{
						global:['phaseBefore','enterGame','gameStart','chooseButtonBefore'],
					},
					round:1,
					direct:true,
					limited:true,
					available:function (mode){
						if(['guozhan'].contains(mode)) return true;
						return false;
					},
					// filter:function (event,player){
					// 	return (event.name!='phase'||game.phaseNumber==0);
					// },
					characterlist:function(){//-------梦势力将池
						return [
							'ybsl_026can','ybsl_027rain','ybsl_028crystal','ybsl_029dawn','ybsl_030book',
							'ybsl_031huanqing','ybsl_034zhoulianyuan','ybnb_034zhoulianyuan','ybsl_035stamp',
							'ybsl_036bright','ybsl_037diamondqueen','db_ybsl_038tengwu','ybsl_039zhafu','ybsl_040ether',
							'db_ybsl_067snake','ybsl_069xiangzi','ybsl_076zhujun','ybsl_077yangqixu','ybsl_078zhuyahai',
							'ybsl_081chenli','ybsl_081chensi','ybsl_083xiaozhu','ybsb_084zhangmi','ybsl_084zhangmi','ybnb_084zhangmi',
							'db_ybsp_038tengwu','ybsp_027rain','ybsb_077yangqixu'
						]
					},
					content:function(){
						'step 0'
						game.log('梦势力初始化为忆！')
						var list=lib.skill._ybsl_huiyi.characterlist();
						for(var i of list){
							// if(lib.character[i]){
							// 	lib.character[i][1]='YB_memory';
							// 	lib.character[i][3].push('ybsl_rumeng');
							// }
							if(lib.character['gz_'+i]){
								lib.character['gz_'+i][1]='YB_memory';
								lib.character['gz_'+i][3].push('ybsl_rumeng');
							}
						}
						'step 1'
						// game.log('游戏中加入夜白包武将国战版')
						// var list=lib.characterPack.ybslj;
						// for(var i in list){
						// 	lib.characterPack.mode_guozhan['gz_'+i]=[list[i][0],list[i][1],list[i][2],list[i][3],list[i][4]]
						// }
						// player.update();
						'step 2'
						game.removeGlobalSkill('_ybsl_huiyi');
					}
				};
				//------------此处控制裁巾牌进入弃牌堆后，把原牌点数加回来，并让区域内有它的角色回血
				lib.skill._yb054_caijin={
					trigger:{global:['loseEnd','cardsDiscardEnd']},
					forced:true,
					charlotte:true,
					filter:function(event,player){
						var cs=event.cards;
						for(var i=0;i<cs.length;i++){
							if(cs[i].storage._yb054_caijin&&get.position(cs[i],true)=='d') return true;
						}
						return false;
					},
					forceDie:true,
					content:function(){
						var list=[];
						var list2=[];
						var cs=trigger.cards;
						for(var i=0;i<cs.length;i++){
							if(cs[i].storage._yb054_caijin&&get.position(cs[i],true)=='d'){
								list.push(cs[i]);
								var card1=cs[i].storage._yb054_caijin;
								list2.push(card1);
							}
						}
						game.log(list,'已被移出游戏');
						game.log(list2,'的点数已被加了回来');
						game.cardsGotoSpecial(list);
						for(var j of list2){
							if(j){
								var cards=j;
								var card=get.copy(cards);
								var tag=[];
								if(get.cardtag(card,'gifts'))var tag=['gifts'];
								cards.init([card.suit,card.number+1,card.name,card.nature,tag]);
								if(card.cardtag)cards.cardtag=card.cardtag;
								// j.number++;
								game.countPlayer(function(current){// if(current.getEquip(j)) {
									if( current.getCards('e').contains(j) ){
										current.recover();
										game.log(j,'在',get.translation(current),'的装备区，因而回血');
										// break;
									}
									else if(current.getCards('j').contains(j)){
										current.recover();
										game.log(j,'在',get.translation(current),'的判定区，因而回血');
										// break;
									}
								})
							}
						}
					},
				}
				//---------此段控制界纵丝的卡牌视为牌名
				_status.kagari_ybzongsi={}
				_status.kagari_ybzongsi_nature={}
				lib.skill._kagari_ybzongsi_card={
					trigger:{
						global:['equipAfter','addJudgeAfter','loseAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
					},
					charlotte:true,
					ruleskill:true,
					direct:true,
					firstDo:true,
					// filter:(event,player)=>{
					// 	var list=_status.kagari_ybzongsi;
					// 	for(var i of event.cards){
					// 		for(var k in list){
					// 			if(i.cardid==k){
					// 				return true;
					// 			};
					// 		}
					// 	}
					// 	return false;
					// },
					content:function(){
						var list=_status.kagari_ybzongsi;
						var evt=trigger.getl(player);
						if(list&&evt&&evt.hs&&evt.hs.length){
							for(var i of evt.hs){
								for(var k in list){
									if(i.cardid==k){
										delete _status.kagari_ybzongsi[i.cardid];
										delete _status.kagari_ybzongsi_nature[i.cardid];
									};
								}
							}
						}
					},
					mod:{
						cardname:function(card,player){
							var map=_status.kagari_ybzongsi;
							if(map&&map[card.cardid]&&get.itemtype(card)=='card') return map[card.cardid];
						},
						cardnature:function(card,player){
							var map=_status.kagari_ybzongsi_nature;
							if(map&&map[card.cardid]&&get.itemtype(card)=='card') return map[card.cardid];
						},
					},
				}
				lib.translate['_kagari_ybzongsi_card']='纵丝'
				/*
				错误文件: app.html
				错误信息: Uncaught TypeError: trigger.cards is not iterable
				行号: 7
				列号: 29
				无名杀版本: 1.10.4
				event.name: _kagari_ybzongsi_card
				event.step: 0
				event.parent.name: trigger
				event.parent.step: 4
				event.parent.parent.name: arrangeTrigger
				event.parent.parent.step: 1
				-------------
				player: 林逸[ybxh_linyi]
				座位号: 2
				-------------
				TypeError: trigger.cards is not iterable
					at GameEvent.eval [as content] (eval at Legacy (game/game.js:11589:15), <anonymous>:7:29)
					at Object.loop (game/game.js:41395:16)
					at Object.resume (game/game.js:41425:10)
					at Object.ok (game/game.js:56872:10)
					at HTMLDivElement.control (game/game.js:56750:15)
				
				
				*/







				// lib.pinyins.鹰原羽未=['Takahara','Umi']
				// lib.pinyins.神山识=['Kamiyama','Shiki']
				// lib.pinyins.御结=['omusubi']
				// lib.pinyins.篝=['Kagari']
				// lib.pinyins.佐藤雏=['Satō','Hina']
				lib.pinyins.罗睺=['Rahu']
				lib.pinyins.重振=['chóng','zhèn']
				lib.pinyins.散梦=['sǎn','mèng']
				lib.pinyins.折叶=['zhé','yè']
				lib.pinyins.命轮·折叶=['mìng','lún','·','zhé','yè']
				lib.pinyins.吴格格=['wú','gé','ge']
				lib.pinyins.秋儿=['qīu','er']
				lib.pinyins.悦儿=['yuè','er']
				lib.pinyins.清月姑娘=['qīng','yuè','gū','niang']
				lib.pinyins.旧版清月=['qīng','yuè','gū','niang']
				lib.pinyins.香紫姑娘=['xiāng','zǐ','gū','niang']
				lib.pinyins.方块Q=['Diamond','Q']
				lib.pinyins.朱焌=['Zhū','jùn']
				lib.pinyins['滕叔颖&武宁']=['Téng','shū','yǐng','Wǔ','níng']
				lib.pinyins['滕&武']=['Téng','shū','yǐng','Wǔ','níng']
				lib.pinyins['SP滕叔颖&武宁']=['Téng','shū','yǐng','Wǔ','níng']
				lib.pinyins.苏令燚=['Sū','lìng','yì']
				lib.pinyins.铝=['BauxiteAl']
				lib.pinyins.苟卡=['Gǒu','kǎ']
				lib.pinyins.华胥=['Huà','xū']
				lib.pinyins.应龙=['Yìng','lóng']
				lib.pinyins.乐风=['yuè','fēng']
				lib.pinyins.泣露=['qì','lù']
				lib.pinyins.皓腕=['hào','wǎn']
				lib.pinyins.鹰原羽依里=['Takahara','Hairi']
				lib.pinyins.折翼=['zhé','yì']
				/*
				key_hairi|鹰原羽依里，4
				hairi_shuiyong|水泳
				锁定技，你不会受到火焰伤害。
				hairi_Mypockets|My Pockets
				锁定技，当你受到伤害后，你随机获得一项以下技能中未拥有的技能并增加一点体力上限：整遗，炒饭，窥魂，扬帆，miki_zhiluo，ryoichi_baoyi，封还，姆啾，避忆
				//这么烂的设计就不拿出来丢人现眼了，感觉比初代佐藤雏还创
				ybsl_hairi|鹰原羽依里，4
				hairi_shangshi|伤逝
				当你的手牌数小于X时，你可以将手牌摸至X张（X为你已损失的体力值）
				hairi_zhongxia|终夏
				使命技，当你需要使用一张基本牌时，你可以弃置所有手牌，若这些牌花色各不相同，你视为使用之，若你以此法弃置的牌数等于你体力上限，你加一点体力上限。
				成功：准备阶段，若你的体力上限不小于5，你选择一项：①获得技能“炒饭”，②将体力上限调整为1，并重置[终夏]。
				失败：当你死亡时，你另一名其他角色获得[终夏]。
				*/
				// lib.character['ybsl_hairi']=['male','key',1,['hairi_shangshi','hairi_zheyi','hairi_zhongxia'],['ext:夜白神略/image/character/ybsl_hairi.jpg']]
				lib.skill.hairi_shangshi={
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
				};
				lib.skill.hairi_zheyi={
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
				};
				lib.skill.hairi_zhongxia={
					audio:'ext:夜白神略/audio/character:2',
					enable:'chooseToUse',
					dutySkill:true,
					hiddenCard:function(player,name){
						if(player.hasSkill('hairi_zhongxia_block'))return false;
						if(get.type(name)=='basic'&&lib.inpile.contains(name)&&player.countCards('h')>0) return true;
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
										if(list.contains(suit))return false;
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
											if(list2.contains(suit)){
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
				};
				lib.translate.ybsl_hairi='鹰原羽依里'
				lib.translate.ybsl_hairi_append='夜白制作夜白制作夜白制作'
				lib.translate.hairi_shangshi='伤逝'
				lib.translate.hairi_shangshi_info='锁定技，当你的手牌数小于X时，你需将手牌摸至X张（X为你已损失的体力值）。'
				lib.translate.hairi_zheyi='折翼'
				lib.translate.hairi_zheyi_info='锁定技，游戏开始时，你废除所有装备栏。'
				lib.translate.hairi_zheyi_info_guozhan='锁定技，当你明置此武将牌时，你废除所有装备栏。'
				lib.translate.hairi_zhongxia='终夏'
				lib.translate.hairi_zhongxia_info='使命技，当你需要使用一张基本牌时，你可以弃置所有手牌（至少一张），若你以此法弃置的牌花色各不相同，你视为使用之，若你以此法弃置的牌数等于你已损体力值或体力上限，你加一点体力上限（若未成功使用目标牌，此技能本回合不能再用）<br>成功：准备阶段，若你的体力上限不小于5，你选择一项：①获得技能“炒饭”，并恢复所有已废除装备栏。②将体力上限调整为1，并重置[终夏]。<br>失败：当你死亡时，你令一名其他角色获得[终夏]。'
				// lib.skill.caiyi.audioname=['key_umi','key_umi2','sp_key_umi']
				// lib.skill.guili.audioname=['key_umi','key_umi2','sp_key_umi']
				// lib.characterSort.ybslj.ybsl_sjfk.add('ybsl_hairi')
				//-------------隐藏牌
				lib.skill._ybsl_yin={
					// ruleSkill:true,
					// trigger:{
					// 	global:['useCardBefore'],
					// },
					// filter:function(){
					// 	if(event.card&&event.card)
					// },
				};

				// lib.translate.yb053_yinren=lib.skill.yb053_yinren.getname(player);
				//---------------------整活完毕----------------//
			};
			var nor=lib.assetURL+'extension/夜白神略/css';
			lib.init.css(nor,'ybcss')
			// lib.init.css(nor,'menu')
			// lib.init.css(nor,'menu1')

			// {
			// 	if(lib.config.theme=='woodden'){
			// 		lib.init.css(nor,'dark')
			// 	}
			// 	else{
			// 		lib.init.css(nor,'light')
			// 	}
			// }
			{
				// lib.init.css(nor,'dark')
				lib.init.css(nor,'light')
				// var style2=document.createElement('style');
				// style2.innerHTML='.YB_snowtext {color: rgb('+lib.config.theme=='woodden'?'71,165,156':'40,243,223'+');}';
				// style2.innerHTML+='.YB_mysterytext {color: rgb('+lib.config.theme=='woodden'?'112,21,85':'243,40,182'+');}';
				// style2.innerHTML+='.YB_dark1text {color: rgb('+lib.config.theme=='woodden'?'137, 58, 168':'177,76,218'+');}';
				// style2.innerHTML+='.YB_dark2text {color: rgb('+lib.config.theme=='woodden'?'154, 61, 190':'204,79,255'+');}';
				// style2.innerHTML+='.YB_darktext {color: rgb('+lib.config.theme=='woodden'?'176, 57, 182':'247,79,255'+');}';
				// style2.innerHTML+='.YB_moneytext {color: rgb('+lib.config.theme=='woodden'?'129,126,27':'255,245,0'+');}';
				// document.head.appendChild(style2);
				// style2.innerHTML=".player .identity[data-color='snow'],";
				// style2.innerHTML+="div[data-nature='snow'],";
				// style2.innerHTML+="span[data-nature='snow'] {text-shadow: black 0 0 1px,rgba(40,243,223,1) 0 0 2px,rgba(40,243,223,1) 0 0 5px,rgba(40,243,223,1) 0 0 10px,rgba(40,243,223,1) 0 0 10px}";
				// style2.innerHTML+="div[data-nature='snowm'],";
				// style2.innerHTML+="span[data-nature='snowm'] {text-shadow: black 0 0 1px,rgba(40,243,223,1) 0 0 2px,rgba(40,243,223,1) 0 0 5px,rgba(40,243,223,1) 0 0 5px,rgba(40,243,223,1) 0 0 5px,black 0 0 1px;}";
				// style2.innerHTML+="div[data-nature='snowmm'],";
				// style2.innerHTML+="span[data-nature='snowmm'] {text-shadow: black 0 0 1px,rgba(40,243,223,1) 0 0 2px,rgba(40,243,223,1) 0 0 2px,rgba(40,243,223,1) 0 0 2px,rgba(40,243,223,1) 0 0 2px,black 0 0 1px;}";
				// document.head.appendChild(style2);
			}
			lib.translate.ybsl_magicbook='刻印';

			game.addGroup('YB_memory','忆','回忆',{
				// color: 'YB_snow',
				color:'#28e3ce',
				// image: 'ext:夜白神略/image/card/group_YB_memory.png',
			})
			game.addGroup('YB_dream','梦','梦境',{
				// color: 'YB_mystery',
				color:'#e328b7',
				// image: 'ext:夜白神略/image/card/group_YB_dream.png',
			})
			
			// lib.group.push('YB_memory');
			// lib.translate.YB_memory='忆';
			// lib.translate.YB_memory2='回忆';
			// lib.groupnature.YB_memory='YB_snow';

			// lib.group.push('YB_dream');
			// lib.translate.YB_dream='梦';
			// lib.translate.YB_dream2='梦境';
			// lib.groupnature.YB_dream='YB_mystery';

			// lib.group.push('YB_demon');
			// lib.translate.YB_demon='魔';
			// lib.translate.YB_demon2='魔将';
			// lib.groupnature.YB_demon='YB_dark';

			// lib.group.push('YB_schao');
			// lib.translate.YB_schao='壕';
			// lib.translate.YB_schao2='壕将';
			// lib.groupnature.YB_schao='YB_money';
			// 
			// <span style=\'color:#28e3ce\'>忆</span>//40,243,223
			// <span style=\'color:#e328b7\'>梦</span>//243,40,182
			// <span style=\'color:#e328b7\'>魔</span>//177,76,218
			// 
			//------------------------创建雪属性----------------------------//
			//此处收纳前缀
			{
				lib.namePrefix.set('废案',{
					showName:'废',
					color:'#a4a4a4',
					nature:'black',
				})
				lib.namePrefix.set('废案神',{
					getSpan:(prefix,name)=>{
						return `${get.prefixSpan('废案')}${get.prefixSpan('神')}`
					},
				})
				lib.namePrefix.set('旧版',{
					showName:'废',
					color:'#a4a4a4',
					nature:'black',
				})
				lib.namePrefix.set('通渠',{
					showName:'废',
					color:'#a4a4a4',
					nature:'black',
				})
				lib.namePrefix.set('六艺',{
					showName:'艺',
					color:'#2abcff',
					nature:'thunder',
				})
				
			}
			//宗族：吴郡陆氏
			var clan_list=['陆逊','陆抗','陆郁生','陆绩','陆凯','陆机','陆云','陆延'];
			
			game.addNature('YB_snow','雪',{
				linked:true,
				order:55,
				lineColor:'YB_snow',
				color:'YB_snow',
			})
			game.addNature('YB_blood','血',{
				linked:false,
				order:35,
				lineColor:'YB_mystery',
				color:'YB_mystery',
			})
			// if(lib.inpile_nature)lib.inpile_nature.push('YB_blood');
			// if(lib.addNature)lib.addNature.push('YB_blood');
			// if(card.addNature)card.addNature.push('YB_blood');
			// lib.translate.YB_blood='血';
			// lib.translate._YB_bloodsha='血杀';
			// lib.groupnature.YB_blood='YB_mystery';
			
			// lib.card.YB_snowsha.image='sha';
			// lib.card.YB_bloodsha.image='sha';
			lib.translate.YB_snowsha_info='当你造成雪属性伤害时，你可以令目标摸X张牌，然后其武将牌翻面（X为目标当前体力值且至多为5）。';
			lib.translate.YB_bloodsha_info='锁定技，造成血属性伤害时，恢复等同伤害值的体力值。';

			// lib.translate._YB_snowsha_info='当你造成雪属性伤害时，你可以令目标摸X张牌，然后其武将牌翻面（X为目标当前体力值且至多为5）。';
			// lib.translate._YB_bloodsha_info='锁定技，造成血属性伤害时，恢复等同伤害值的体力值。';
			
			// if(!lib.characterPack.mode_guozhan)lib.characterPack.mode_guozhan={};
			// var list=lib.characterPack.ybslj;
			// for(var i in list){
			// 	lib.characterPack.mode_guozhan['gz_'+i]=[list[i][0],list[i][1],list[i][2],list[i][3],list[i][4]]
			// }
			//lib.nature.addArray(['_YB_snow','_YB_blood']);
			//lib.card.sha.nature.addArray(['_YB_snowsha','faceYB_snow']);
			//lib.linked.addArray(['_YB_snowsha','faceYB_snow']);
	
			/*
			lib.nature.push('_YB_snowsha');	
			lib.nature.addArray(['_YB_snowsha','faceYB_snow']);
			lib.card.sha.nature.addArray(['_YB_snowsha','faceYB_snow']);
			lib.linked.addArray(['_YB_snowsha','faceYB_snow']);
			lib.translate.faceYB_snow='未响应';
			lib.translate._YB_snowsha='雪';//属性翻译
			lib.translate.faceYB_snowsha='未响应杀';
			lib.translate._YB_snowshasha='雪杀';*/
			//------------------------创建卡牌类型----------------------------//
			
			//------------------------千幻换肤----------------------------//
	
			if(!lib.qhlypkg){
				lib.qhlypkg=[];
			}
			lib.qhlypkg.push({
				isExt:true,//是否是扩展，一般填true
				filterCharacter:function(name){
					var qianzhui=[
						'dzsl_','dzsp_','ybsl_','ybsp_','db_ybsl_','db_ybsp_',
						'ybslshen_','sgsh_','ybxh_','North_','ybnb_','ybart_',
						'ybmo_','ybhao_','ybdi_','ybhaoshen_','ybsc_',
					];
					for(var i=0;i<qianzhui.length;i++){
						if(name.indexOf(qianzhui[i])==0) return true;
					}
					//判断此ID的武将是否属于此皮肤包。推荐用前缀判断。
					//在这里不判断直接返回true是很没有武德的行为，可能覆盖别人的扩展配置。
				},
				prefix:'extension/夜白神略/image/character/',//原皮前缀，标识原皮肤的位置。
				skin:{
					standard:'extension/夜白神略/skin/standard/',//可切换普通皮肤的前缀
				},
				audioOrigin:'extension/夜白神略/audio/character/',//原技能配音位置
				audio:'extension/夜白神略/skin/audio/',//切换皮肤后的技能配音位置
			});
			
	
					//-------------------------抄袭完毕

			
			// var YBSLcardinit=lib.element.card.init;
			// lib.element.card.init=function(card){
				// var ret=YBSLcardinit.apply(this,arguments);
				// if(Array.isArray(card)){
					// if(card[2]=='YB_snowsha'){
						// card[2]='sha';
						// card[3]='YB_snow';
					// }
					// if(card[2]=='YB_bloodsha'){
						// card[2]='sha';
						// card[3]='YB_blood';
					// }
				// }
				// if((ret.name=='sha'&&ret.nature=='YB_blood')){
					// if(lib.config['extension_十周年UI_enable'] && lib.config.extension_十周年UI_cardPrettify != 'off'){
						// ret.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/image/card/YB_bloodsha.' + lib.config.extension_十周年UI_cardPrettify + '")';
					// }
					// if(ret.node.$name)ret.node.$name.innerText = '血杀';
					// if(ret.node.name)ret.node.name.innerHTML='血杀';
				// }
				// if((ret.name=='sha'&&ret.nature=='YB_snow')){
					// if(lib.config['extension_十周年UI_enable'] && lib.config.extension_十周年UI_cardPrettify != 'off'){
						// ret.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/image/card/YB_snowsha.' + lib.config.extension_十周年UI_cardPrettify + '")';
					// }
					// if(ret.node.$name)ret.node.$name.innerText = '雪杀';
					// if(ret.node.name)ret.node.name.innerHTML='雪杀';
				// }
				// return ret;
			// }
			// var YBSLTranslation=get.translation;
			// get.translation=function(str,arg){
				// if(str && str.name == 'sha' &&(str.nature =='YB_blood'||str.nature=='YB_snow')){
					// if(str&&typeof str=='object'&&(str.name||str._tempTranslate)){
						// if(str._tempTranslate) return str._tempTranslate;
						// var str2;
						// if(arg=='viewAs'&&str.viewAs){
							// str2=get.translation(str.viewAs);
						// }
						// else{
							// str2=get.translation(str.name);
						// }
						// if(str2=='杀'){
							// if(str.nature=='YB_blood'){
								// str2='血'+str2;
							// }
							// else if(str.nature=='YB_snow'){
								// str2='雪'+str2;
							// }
						// }
						// if(get.itemtype(str)=='card'||str.isCard){
							// if(_status.cardtag&&str.cardid){
								// var tagstr='';
								// for(var i in _status.cardtag){
									// if(_status.cardtag[i].contains(str.cardid)){
										// tagstr+=lib.translate[i+'_tag'];
									// }
								// }
								// if(tagstr){
									// str2+='·'+tagstr;
								// }
							// }
							// if(str.suit&&str.number){
								// var cardnum=str.number||'';
								// if([1,11,12,13].contains(cardnum)){
									// cardnum={'1':'A','11':'J','12':'Q','13':'K'}[cardnum]
								// }
								// if(arg=='viewAs'&&str.viewAs!=str.name&&str.viewAs){
									// str2+='（'+get.translation(str)+'）';
								// }
								// else{
									// str2+='【'+get.translation(str.suit)+cardnum+'】';
									// // var len=str2.length-1;
									// // str2=str2.slice(0,len)+'<span style="letter-spacing: -2px">'+str2[len]+'·</span>'+get.translation(str.suit)+str.number;
								// }
							// }
						// }
						// return str2;
					// }
					// if(Array.isArray(str)){
						// var str2=get.translation(str[0],arg);
						// for(var i=1;i<str.length;i++){
							// str2+='、'+get.translation(str[i],arg);
						// }
						// return str2;
					// }
					// if(arg=='skill'){
						// if(lib.translate[str+'_ab']) return lib.translate[str+'_ab'];
						// if(lib.translate[str]) return lib.translate[str].slice(0,2);
						// return str;
					// }
					// else if(arg=='info'){
						// if(lib.translate[str+'_info']) return lib.translate[str+'_info'];
						// var str2=str.slice(0,str.length-1);
						// if(lib.translate[str2+'_info']) return lib.translate[str2+'_info'];
						// if(str.lastIndexOf('_')>0){
							// str2=str.slice(0,str.lastIndexOf('_'));
							// if(lib.translate[str2+'_info']) return lib.translate[str2+'_info'];
						// }
						// str2=str.slice(0,str.length-2);
						// if(lib.translate[str2+'_info']) return lib.translate[str2+'_info'];
						// if(lib.skill[str]&&lib.skill[str].prompt) return lib.skill[str].prompt;
					// }
					// if(lib.translate[str]){
						// return lib.translate[str];
					// }
					// if(typeof str=='string'){
						// return str;
					// }
					// if(typeof str=='number'||typeof str=='boolean'){
						// return str.toString();
					// }
					// if(str&&str.toString){
						// return str.toString();
					// }
					// return '';
				// }else{
					// return YBSLTranslation.apply(this,arguments);
				// }
			// };
			
			//------------------------------------------------改函数实现属性杀
			{//----------自定义函数
				//----------换行点
				//至子虚：从这往下到截止的地方，别忘CV过去，这是关联函数。
				//----------获取同族角色
				
				get.YB_clan = function(player,bool){
					var list=[];
					game.hasPlayer2(current => {
						if(current == player&&bool) list.push(current);
						else if (player.getClan().some(i => current.getClan().includes(i)) && current != player) list.push(current);
						//player.getClan().some(i => target.getClan().includes(i))
					})
					return list;
				}
				//获取目标的出限一技能
				get.YB_pu1 = function(player){
					var skills = player.getSkills(null, false, false);
					var skills2 = game.expandSkills(skills);
					var skills3 = skills2.filter(function (i) {
						if(lib.skill[i].enable&&lib.skill[i].enable=='phaseUse'&&lib.skill[i].usable&&lib.skill[i].usable==1)return true;
					});
					// var skills = player.getSkills(null, false, false).filter(function (i) {
						// if(lib.skill[i].enable&&lib.skill[i].enable=='phaseUse'&&lib.skill[i].usable&&lib.skill[i].usable==1)return true;
					// });
					return skills3;
				}
				//至子虚：复制到这里截止
				//全技能库的出限一的夜白式筛选
				get.YB_allpu1 = function(){
					var skills=[];
					for(var i in lib.skill){
						if(lib.skill[i].enable&&lib.skill[i].enable=='phaseUse'&&lib.skill[i].usable&&lib.skill[i].usable==1&&lib.skill[i].precontent)skills.push(i);
					}
					return skills;
				}
				//---------此处函数抄自子虚扩展↓
				lib.element.player.getClan = function (unseen) {
					var list = []
					if (unseen || !this.isUnseen(0)) {
						let info = lib.character[this.name1];
						if (info && info[4]) {
							for (let i of info[4]) {
								if (typeof i == 'string' && i.startsWith('clan:')) list.add(i.slice(5))
							}
						}
					}
					if (this.name2 && (unseen || !this.isUnseen(1))) {
						let info = lib.character[this.name2];
						if (info && info[4]) {
							for (let i of info[4]) {
								if (typeof i == 'string' && i.startsWith('clan:')) list.add(i.slice(5))
							}
						}
					}
					return list
				}
				//---------此处函数抄自子虚扩展↑
				get.YB_key = function(list){
					var list2=[];
					for(var i in list){
						list2.push(i);
					}
					return list2;
				}
				//如下
				lib.element.player.YB_temp = function(skill,num){
					var num=(num||1);
					if(!lib.skill[skill])lib.skill[skill]={onremove:true,charlotte:true,}
					this.addTempSkill(skill);
					this.addMark(skill,num);
				}
				//-----------改变血量至
				lib.element.player.YB_HpTo = function(num){
					var next=game.createEvent('YB_HpTo',false);
					next.num=num;
					next.player=this;
					next.setContent('YB_HpTo');
					return next;
				}
				lib.element.content.YB_HpTo = function(){
					if(num==player.hp){event.finish();}
					else{
						if(num>player.hp){
							player.hp+=(num-player.hp);
							if(num>player.maxHp-player.hp){
								player.maxHp+=(num-player.maxHp);
							}
						}
						if(num<player.hp){
							player.hp-=(player.hp-num)
						}
						game.log(player,'将体力值调整至了'+get.cnNumber(num)+'点')
						player.update();
					}
				}
				/*
				lib.element.player.YB_button = function(title,dialog,switchToAuto,ok){
					var next=game.createEvent('YB_button',false);
					next.player=this;
					next.title=title;
					next.list6666=dialog;
					if(switchToAuto)next.switchToAuto=switchToAuto;
					if(ok)next.ok=ok;
					next.setContent('YB_button');
					return next;
				}
				//[{suit:'花色'},{spade:'黑桃'}]
				lib.element.content.YB_button = function(){
					'step 0'
					var list6666=event.list6666,title=event.title;
					
					var switchToAuto=function(){
						_status.imchoosing=false;
						// var listn=['普通'].concat(lib.inpile_nature);
						event._result={
							bool:true,
							// suit:suita[0],
							// type:typea[0],
						};
						for (var yb03 of list6666){
							var k=get.YB_cobo(yb03[0]);
							// var title2=yb03[0][k];
							var zs=get.YB_cobo(yb03[1]);
							event._result[k]=zs[0];
						}
						if(event.dialog) event.dialog.close();
						if(event.control) event.control.close();
					};
					var chooseButton=function(player){
						var event=_status.event;
						player=player||event.player;
						if(!event._result) event._result={};
						var dialog=ui.create.dialog('<font size=6><b>'+title[0]+'</b></font>','forcebutton','hidden');
						dialog.add(title[1]);
						// var dialog=ui.create.dialog('你声明一个花色和类型，然后亮出牌堆顶三张牌，获得与你描述相符的牌。<br>若有两项皆满足的牌，你回复一点体力。','forcebutton','hidden');
						event.dialog=dialog;
						for (var yb01 of list6666){
							var k=get.YB_cobo(yb01[0]);
							var title2=yb01[0][k];
							dialog.addText(title2);
							var table=document.createElement('div');
							table.classList.add('add-setting');
							table.style.margin='0';
							table.style.width='100%';
							table.style.position='relative';
							var suit = yb01[1];//
							var listi = get.YB_cobo(yb01[1]);
							// var listi=[];
							// for(var ybi in suit){
								// listi.push(ybi);
							// }
							// var listn=[];
							// for(var ybn in type){
								// listn.push(ybn);
							// }
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
									event._result[k]=link;
								});
							}
							dialog.content.appendChild(table);
						}
						
						// dialog.addText('类型');
						// var table2=document.createElement('div');
						// table2.classList.add('add-setting');
						// table2.style.margin='0';
						// table2.style.width='100%';
						// table2.style.position='relative';
						// // var listn=['普通'].concat(lib.inpile_nature);
						// for(var i=0;i<listn.length;i++){
							// var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							// var nature=listn[i];
							// td.link=nature;
							// table2.appendChild(td);
							// td.innerHTML='<span>'+type[nature]+'</span>';
							// td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
								// if(_status.dragged) return;
								// if(_status.justdragged) return;
								// _status.tempNoButton=true;
								// setTimeout(function(){
									// _status.tempNoButton=false;
								// },500);
								// var link=this.link;
								// var current=this.parentNode.querySelector('.bluebg');
								// if(current){
									// current.classList.remove('bluebg');
								// }
								// this.classList.add('bluebg');
								// event._result.type=link;
							// });
						// }
						// dialog.content.appendChild(table2);
						dialog.add('　　');
						event.dialog.open();
						
						if(!event.switchToAuto){
							event.switchToAuto=function(){
								event._result={
									bool:true,
									// type:listn[0],
									// suit:listi[0],
								};
								for (var yb03 of list6666){
									var k=get.YB_cobo(yb03[0]);
									// var title2=yb03[0][k];
									var zs=get.YB_cobo(yb03[1]);
									event._result[k]=zs[0];
								}
								event.dialog.close();
								event.control.close();
								game.resume();
								_status.imchoosing=false;
							};
						}
						
						if(event.ok){
							event.control=event.ok;
							
						}
						else {
							event.control=ui.create.control('ok',function(link){
								var result=event._result;
								for (var yb04 of list6666){
									var k=get.YB_cobo(yb04[0]);
									// var title2=yb03[0][k];
									// var zs=get.YB_cobo(yb04[1]);
									if(!result[k]) return;//此行切换注释，可令按钮无视选项，直接确定
								}
								// if(!result.type||!result.suit) return;
								// else{
									result.bool=true;
								// }
								event.dialog.close();
								event.control.close();
								game.resume();
								_status.imchoosing=false;
							});
						}
						// event.control=ui.create.control('ok',function(link){
							// var result=event._result;
							// for (var yb04 of list6666){
								// var k=get.YB_cobo(yb04[0]);
								// // var title2=yb03[0][k];
								// // var zs=get.YB_cobo(yb04[1]);
								// if(!result[k]) return;//此行切换注释，可令按钮无视选项，直接确定
							// }
							// // if(!result.type||!result.suit) return;
							// // else{
								// result.bool=true;
							// // }
							// event.dialog.close();
							// event.control.close();
							// game.resume();
							// _status.imchoosing=false;
						// });
						for(var i=0;i<event.dialog.buttons.length;i++){
							event.dialog.buttons[i].classList.add('selectable');

						}
						game.pause();
						game.countChoose();
					};
					if(event.isMine()){
						chooseButton(player);
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
					event.result=result;
				}
				*/
				//----------涉猎任意张
				lib.element.player.YB_shelie = function(num,i,log){
					var next=game.createEvent('YB_shelie',false);
					next.num=num;
					next.i='涉猎';
					if(i&&i!==true) next.i=i;
					if(i==true||log==true) next.k=true;
					next.player=this;
					next.setContent('YB_shelie');
					return next;
				}
				lib.element.content.YB_shelie = function(){
					'step 0'
					event.cards=get.cards(num);
					game.cardsGotoOrdering(event.cards);
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(player,id,cards){
						var str=event.i;
						if(player==game.me&&!_status.auto){
							str+='：获取花色各不相同的牌';
						}
						var dialog=ui.create.dialog(str,cards);
						dialog.videoId=id;
					},player,event.videoId,event.cards);
					event.time=get.utc();
					game.addVideo('showCards',player,[event.i,get.cardsInfo(event.cards)]);
					game.addVideo('delay',null,2);
					'step 1'
					var list=[];
					for(var i of cards) list.add(get.suit(i,false));
					if(event.k==true){var k=list.length;}
					else{var k=[0,Infinity];}
					var next=player.chooseButton(k,true);
					next.set('dialog',event.videoId);
					next.set('filterButton',function(button){
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(get.suit(ui.selected.buttons[i].link)==get.suit(button.link)) return false;
						}
						return true;
					});
					next.set('ai',function(button){
						return get.value(button.link,_status.event.player);
					});
					'step 2'
					if(result.bool&&result.links){
						event.cards2=result.links;
					}
					else{
						event.finish();
					}
					var time=1000-(get.utc()-event.time);
					if(time>0){
						game.delay(0,time);
					}
					'step 3'
					game.broadcastAll('closeDialog',event.videoId);
					var cards2=event.cards2;
					player.gain(cards2,'log','gain2');
				}
				//-------------扶汉函数
				lib.element.player.YB_fuhan = function(i,type){
					var next=game.createEvent('YB_fuhan',false);
					next.player=this;
					if(i!='old'&&i!='tw'){
						next.groupa=i[0];
						next.numa=i[1];
						next.numb=i[2];
						next.band=i[3];
						next.sex=i[4];
						next.zhu=i[5];
						next.banb=type;
					}
					else{
						next.banb=i;
					}
					next.setContent('YB_fuhan');
					return next;
				}
				lib.element.content.YB_fuhan = function(){
					'step 0'
					if(!event.numa){event.numa=5;}
					if(!event.band){event.band=[];}
					if(event.groupa=='all'){delete event.groupa;}
					if(!event.zhu){event.zhu=='';}
					if(!event.sex||event.sex.length==0||event.sex=='all'){event.sex=['female','male','double','none'];}
					if(event.banb=='old'){event.goto(3);}
					if(event.banb=='tw'){event.goto(5);}
					'step 1'
					var list;
					if(!event.numb){event.numb=2;}
					if(_status.characterlist){
						list=[];
						for(var i=0;i<_status.characterlist.length;i++){
							var name=_status.characterlist[i];
							if(event.sex.contains(lib.character[name][0])){
								if(!event.groupa){list.push(name);}
								else if(event.groupa.contains(lib.character[name][1])){list.push(name);}//groupa应用
							}
						}
					}
					else if(_status.connectMode){
						list=get.charactersOL(function(i){
							return event.groupa.contains(lib.character[i][1])&&event.sex.contains(lib.character[i][0]);
						});
					}
					else{
						list=get.gainableCharacters(function(info){
							return event.groupa.contains(info[1])&&event.sex.contains(info[0]);
						});
					}
					var players=game.players.concat(game.dead);
					for(var i=0;i<players.length;i++){
						list.remove(players[i].name);
						list.remove(players[i].name1);
						list.remove(players[i].name2);
					}
					if(event.zhu=='zhu'){
						for(var z of list){
							if(!lib.character[z][4]||!lib.character[z][4].contains('zhu'))event.band.add(z)
						}
					}
					else if(event.zhu=='nozhu'){
						for(var z of list){
							if(lib.character[z][4]&&lib.character[z][4].contains('zhu'))event.band.add(z)
						}
					}
					if(event.band.length>0){
						for(var j of event.band){
							if(list.contains(j))list.remove(j);//应用数据band
						}
					}
					list=list.randomGets(event.numa);//应用数据numa
					var skills=[];
					for(var i of list){
						skills.addArray((lib.character[i][3]||[]).filter(function(skill){
							var info=get.info(skill);
							return info&&!info.zhuSkill&&!info.limited&&!info.juexingji&&!info.hiddenSkill&&!info.charlotte&&!info.dutySkill;
						}));
					}
					if(!list.length||!skills.length){event.finish();return;}
					if(player.isUnderControl()){
						game.swapPlayerAuto(player);
					}
					var switchToAuto=function(){
						_status.imchoosing=false;
						event._result={
							bool:true,
							skills:skills.randomGets(2),
						};
						if(event.dialog) event.dialog.close();
						if(event.control) event.control.close();
					};
					var tara=get.cnNumber(event.numb);//翻译大写数字
					var chooseButton=function(list,skills){
						var event=_status.event;
						if(!event._result) event._result={};
						event._result.skills=[];
						var rSkill=event._result.skills;
						var dialog=ui.create.dialog('请选择获得至多'+tara+'个技能',[list,'character'],'hidden');
						event.dialog=dialog;
						var table=document.createElement('div');
						table.classList.add('add-setting');
						table.style.margin='0';
						table.style.width='100%';
						table.style.position='relative';
						for(var i=0;i<skills.length;i++){
							var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.link=skills[i];
							table.appendChild(td);
							td.innerHTML='<span>'+get.translation(skills[i])+'</span>';
							td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
								if(_status.dragged) return;
								if(_status.justdragged) return;
								_status.tempNoButton=true;
								setTimeout(function(){
									_status.tempNoButton=false;
								},500);
								var link=this.link;
								if(!this.classList.contains('bluebg')){
									if(rSkill.length>=event.numb) return;
									rSkill.add(link);
									this.classList.add('bluebg');
								}
								else{
									this.classList.remove('bluebg');
									rSkill.remove(link);
								}
							});
						}
						dialog.content.appendChild(table);
						dialog.add('　　');
						dialog.open();
						
						event.switchToAuto=function(){
							event.dialog.close();
							event.control.close();
							game.resume();
							_status.imchoosing=false;
						};
						event.control=ui.create.control('ok',function(link){
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
						chooseButton(list,skills);
					}
					else if(event.isOnline()){
						event.player.send(chooseButton,list,skills);
						event.player.wait();
						game.pause();
					}
					else{
						switchToAuto();
					}
					'step 2'
					var map=event.result||result;
					if(map&&map.skills&&map.skills.length){
						for(var i of map.skills) player.addSkillLog(i);
					}
					game.broadcastAll(function(list){
						game.expandSkills(list);
						for(var i of list){
							var info=lib.skill[i];
							if(!info) continue;
							if(!info.audioname2) info.audioname2={};
							info.audioname2.old_yuanshu='weidi';
						}
					},map.skills);
					event.finish();
					'step 3'
					event.num=event.numa;
					var list;
					if(!event.numb){event.numb=(player.name1||player.name);}
					if(_status.characterlist){
						list=[];
						for(var i=0;i<_status.characterlist.length;i++){
							var name=_status.characterlist[i];
							if(event.sex.contains(lib.character[name][0])){
								if(!event.groupa){list.push(name);}
								else if(event.groupa.contains(lib.character[name][1])){list.push(name);}//groupa应用
							}
						}
					}
					else if(_status.connectMode){
						list=get.charactersOL(function(i){
							return event.groupa.contains(lib.character[i][1])&&event.sex.contains(lib.character[i][0]);
						});
					}
					else{
						list=get.gainableCharacters(function(info){
							return event.groupa.contains(info[1])&&event.sex.contains(info[0]);
						});
					}
					var players=game.players.concat(game.dead);
					for(var i=0;i<players.length;i++){
						list.remove(players[i].name);
						list.remove(players[i].name1);
						list.remove(players[i].name2);
					}
					if(event.band.length>0){
						for(var j of event.band){
							if(list.contains(j))list.remove(j);//应用数据band
						}
					}
					if(event.zhu=='zhu'){
						for(var z of list){
							if(!lib.character[z][4]||!lib.character[z][4].contains('zhu'))event.band.add(z)
						}
					}
					else if(event.zhu=='nozhu'){
						for(var z of list){
							if(lib.character[z][4]&&lib.character[z][4].contains('zhu'))event.band.add(z)
						}
					}
					// var dialog=ui.create.dialog();
					// dialog.add([list.randomGets(5),'character']);
					var kkk=get.translation(event.numb)
					player.chooseButton(true).set('ai',function(button){
						return get.rank(button.link,true)-lib.character[button.link][2];
					}).set('createDialog',['将'+kkk+'替换为一名角色',[list.randomGets(event.num),'character']]);
					'step 4'
					// event.name=event.numb;
					player.reinit(event.numb,result.links[0],false);
					if(_status.characterlist){
						_status.characterlist.add(event.numb);
						_status.characterlist.remove(result.links[0]);
					}
					event.finish();
					'step 5'
					event.num=event.numa;
					if(_status.characterlist){
						list=[];
						for(var i=0;i<_status.characterlist.length;i++){
							var name=_status.characterlist[i];
							if(event.sex.contains(lib.character[name][0])){
								if(!event.groupa){list.push(name);}
								else if(event.groupa.contains(lib.character[name][1])){list.push(name);}//groupa应用
							}
						}
					}
					else if(_status.connectMode){
						list=get.charactersOL(function(i){
							return event.groupa.contains(lib.character[i][1])&&event.sex.contains(lib.character[i][0]);
						});
					}
					else{
						list=get.gainableCharacters(function(info){
							return event.groupa.contains(info[1])&&event.sex.contains(info[0]);
						});
					}
					var players=game.players.concat(game.dead);
					for(var i=0;i<players.length;i++){
						list.remove(players[i].name);
						list.remove(players[i].name1);
						list.remove(players[i].name2);
					}
					if(event.band.length>0){
						for(var j of event.band){
							if(list.contains(j))list.remove(j);//应用数据band
						}
					}
					if(event.zhu=='zhu'){
						for(var z of list){
							if(!lib.character[z][4]||!lib.character[z][4].contains('zhu'))event.band.add(z)
						}
					}
					else if(event.zhu=='nozhu'){
						for(var z of list){
							if(lib.character[z][4]&&lib.character[z][4].contains('zhu'))event.band.add(z)
						}
					}
					var ttt=get.translation(event.numb);
					player.chooseButton([ttt+'：选择获得一张武将牌上的所有技能',[list.randomGets(event.num),'character']],true);
					'step 6'
					if(result.bool){
						var name=result.links[0];
						player.flashAvatar(event.numb,name);
						game.log(player,'获得了','#y'+get.translation(name),'的所有技能');
						player.addSkill(lib.character[name][3])
					}
				}
				//-------------逐个翻译
				get.YB_tobo = function(cards){
					var list=[];
					for(var i of cards){
						list.push(get.translation(i));
					}
					return list;
				}
				//------------紧密贴合的逐个翻译
				get.YB_tobo2 = function(cards){
					var list='';
					for(var i of cards){
						list+=(get.translation(i));
					}
					return list;
				}
				//------------中文顿号分隔的的逐个翻译
				get.YB_tobo3 = function(cards){
					var list='';
					for(var i of cards){
						if(i!=cards[0])list+='、';
						list+=(get.translation(i));
					}
					return list;
				}
				//-------------解码（划掉）翻译
				get.YB_map = function(list,map){
					var list2=[];
					for(var i of list){
						list2.push(map[i]);
					}
					return list2;
				}
				//-----------判断一个卡组，懒得介绍自己悟
				get.YB_suit = function(cards,i){
					let atk=get[i]||get.suit;
					var list2=[];
					for(var k of cards){
						if(list2.length==0||!list2.contains(atk(k)))list2.add(atk(k));
					}
					return list2;
				}
				//-------------包装
				get.YB_cobo = function(map){
					var list=[];
					for(var i in map){
						list.push(i);
						// list[list.length-1].innerHTML='<span>'+map[i]+'</span>';
					}
					// var list2=[];
					// for(var k=0;k<list.length;k++){
					// 	list2.push(list[k]);
					// 	list2[k].innerHTML='<span>'+map[list[k]]+'</span>';
					// }
					return list;
				}
				
				//--------所有卡牌类型
				get.YB_type=function(){
					var type=[];
					var list={};
					var listk=[];
					var listn=[];
					for(var i of lib.inpile){
						if(event[get.type2(i)]!=true){
							type.add(get.translation(get.type2(i)));
							var n=get.type2(i);
							list[n]=get.type2(i);
							listn.add(n);
							listk.add([n,get.translation(get.type2(i))]);
							event[n]=true;
						}
					};
					return listk;
				}
				//--------输入卡牌组的类型
				get.YB_type2=function(cards){
					var type=[];
					var list={};
					var listk=[];
					var listn=[];
					for(var i of cards){
						if(event[get.type2(i)]!=true){
							type.add(get.translation(get.type2(i)));
							var n=get.type2(i);
							list[n]=get.type2(i);
							listn.add(n);
							listk.add([n,get.translation(get.type2(i))]);
							event[n]=true;
						}
					};
					return listk;
				}
				//-------------重铸函数（需输入要重铸的牌）
				//-------------本体已经有重铸函数了，player.recast(cards)即可
				lib.element.player.YB_chongzhu = function(card){
					'step 0'
					this.loseToDiscardpile(card);
					'step 1'
					this.draw(card.length||1);
				}
				//-------------制衡函数
				lib.element.player.YB_zhiheng = function(list){
					this.discard(list);
					this.draw(list.length);
				}
				//-------------谋离间函数
				lib.element.player.YB_sblijian = function(list){
					game.countPlayer(function(current){
					//计算游戏中的每个玩家
						if(list.contains(current)){
							var targetx=list.slice().sortBySeat(current)[1];
							var card={name:'juedou',isCard:true};
							if(current.canUse(card,targetx)) current.useCard(card,targetx);
						}
					});
				}
				//-------------将手牌数调整至num，num不能不写
				lib.element.player.YB_changeHandCard = function(num){
					'step 0'
					var num22=this.countCards('h');
					if(num22>num){
						this.chooseToDiscard('h',num22-num,true)
					}
					else if(num22<num){
						this.draw(num-num22);
					}
				}
				//----------执行：重铸手中一种花色的所有牌
				lib.element.content.YB_chooseToChongzhu=function(){
					'step 0'
					event.list=[];
					var cards=player.getCards('h');
					var suits=get.YB_suit(cards);
					player.showCards(cards);
					for(var k=0;k<suits.length;k++){
						event.list.add([suits[k],[]]);
						for(var j of cards){
							if(get.suit(j)==suits[k])event.list[k][1].add(j);
						}
					}
					var list=[],list6=[];
					for(var h=0;h<event.list.length;h++){
						list.add(get.translation(event.list[h][0]+'2'));
						list6.add([get.translation(event.list[h][0]+'2')+'：',get.translation(event.list[h][1])]);
					}
					if(!list.length)event.finish();
					else player.chooseControl(list).set('choiceList',list6).set('prompt','请选择重铸一种花色的所有牌');
					'step 1'
					player.recast(event.list[result.index][1]);
				}
				//----------------中流
				lib.element.player.YB_zhongliu=function(){
					var player=this;
					var skills=player.getStockSkills(true,true);
					game.expandSkills(skills);
					var resetSkills=[];
					var suffixs=['used','round','block','blocker'];
					for(var skill of skills){
						var info=get.info(skill);
						if(typeof info.usable=='number'){
							if(player.hasSkill('counttrigger')&&player.storage.counttrigger[skill]&&player.storage.counttrigger[skill]>=1){
								delete player.storage.counttrigger[skill];
								resetSkills.add(skill);
							}
							if(typeof get.skillCount(skill)=='number'&&get.skillCount(skill)>=1){
								delete player.getStat('skill')[skill];
								resetSkills.add(skill);
							}
						}
						if(info.round&&player.storage[skill+'_roundcount']){
							delete player.storage[skill+'_roundcount'];
							resetSkills.add(skill);
						}
						if(player.storage[`temp_ban_${skill}`]){
							delete player.storage[`temp_ban_${skill}`];
						}
						if(player.awakenedSkills.contains(skill)){
							player.restoreSkill(skill);
							resetSkills.add(skill);
						}
						for(var suffix of suffixs){
							if(player.hasSkill(skill+'_'+suffix)){
								player.removeSkill(skill+'_'+suffix);
								resetSkills.add(skill);
							}
						}
					}
					if(resetSkills.length){
						var str='';
						for(var i of resetSkills){
							str+='【'+get.translation(i)+'】、';
						}
						game.log(player,'重置了技能','#g'+str.slice(0,-1));
					}
				}
				//-------------角色集合从主视角按座位排序
				get.YB_1234=function(list){
					var list2=[];
					game.countPlayer(function(current){
					//计算游戏中的每个玩家
						if(list.contains(current)){
							list2.push(current);
						}
					});
					return list2;
				}
				//-------------获取其已发动限定技
				get.North_bmh_chizhang = function(player){
					var list=[];
					var skills=player.getOriginalSkills();
					for(var i=0;i<skills.length;i++){
						if(lib.skill[skills[i]].limited&&player.awakenedSkills.contains(skills[i])){
							list.push(skills[i]);
						}
					}
					return list;
				}
				//---------------突袭价值
				get.YB_tuxivalue = function(player){
					var player=player;
					var check,i,num=0,num2=0,players=game.filterPlayer();
					for(i=0;i<players.length;i++){
						if(player!=players[i]&&players[i].countCards('h')){
							var att=get.attitude(player,players[i]);
							if(att<=0){
								num++;
							}
							if(att<0){
								num2++;
							}
						}
					}
					if(num>=2&&num2>0)check=true;
					else check=false;
					return check;
				}
				//---------------移牌价值
				get.YB_movevalue = function(player){
					var player=player;
					var check;
					if(!player.canMoveCard(true)){
						check=false;
					}
					else{
						check=game.hasPlayer(function(current){
							return get.attitude(player,current)>0&&current.countCards('j');
						});
						if(!check){
							if(player.countCards('h')>player.hp+1){
								check=false;
							}
							else if(player.countCards('h',{name:['wuzhong']})){
								check=false;
							}
							else{
								check=true;
							}
						}
					}
					return check;
				}
				//--------当前步骤立即选择并输出结果
				// get.YB_comeon=function(list){
					// 'step 0'
					
				// }
				//--------------升级指定技能--------------//
				lib.element.player.YB_levelUp=function(str){
					for (var i of str){
						lib.skill[i].levelUp(this);
					}
				}
				//-------------按钮翻页
				lib.element.player.YB_control = function(control,num,str){
					var next=game.createEvent('YB_control',false);
					next.player=this;
					next.list=control;
					if(typeof num=='number'){next.numb=num;next.str=str;}
					else{next.str=num;}
					next.setContent('YB_control');
					return next;
				}
				lib.element.content.YB_control = function(){
					'step 0'
					event.num=1;
					if(!event.numb)event.numb=8;
					if(event.ai==undefined) event.ai=function(control){
						return 0;
						// return true;
					};
					if(!event.isMine())event.goto(2);
					'step 1'
					var kd=event.numb;//定义宽度
					var ss=event.list.length;
					var qy=ss%kd;//技能数除kd余数
					if(event.num*kd>ss){
						var sl=qy;
					}
					else{
						var sl=kd;
					}//定义这一页的数量
					var list=[];//定义集合
					if(event.num>1){
						list.push('上页');
					}
					for(var i=0;i<sl;i++){
						var t=(event.num-1)*kd+i;
						list.push(event.list[t]);
					}
					if(ss>kd*event.num){
						list.push('下页');
					}
					list.push('cancel2');
					var str=event.str?event.str:'<span class=yellowtext>请选择一项：</span>';
					player.chooseControl(list).set(
						'prompt',
						str
					);
					'step 2'
					if(result.control=='上页'){
						event.num--;
						event.goto(1);
					}
					else if(result.control=='下页'){
						event.num++;
						event.goto(1);
					}
					else if(!event.isMine()){
						var list=[];
						for(var i=0;i<event.list.length;i++){
							list.push(event.list[i]);
						}
						list.push('cancel2');
						player.chooseControl(list).set(
							'prompt',
							'\u6b63\u5e38\u6765\u8bf4\uff0c\u8fd9\u4e2a\u9009\u62e9\u7684\u6309\u94ae\u53ea\u4f1a\u5c55\u793a\u7ed9\u0061\u0069\uff0c\u5047\u5982\u4f60\u770b\u5230\u8fd9\u6bb5\u8bdd\uff0c\u4f60\u5c31\u8981\u601d\u8003\u4e00\u4e0b\uff0c\u662f\u4e0d\u662f\u505a\u4e86\u4ec0\u4e48\u8ff7\u60d1\u884c\u4e3a\uff0c\u6bd4\u5982\u6258\u7ba1\u4e2d\u7a81\u7136\u63a5\u624b\u4e4b\u7c7b\u7684\u3002&#19981;&#36807;&#20320;&#21487;&#20197;&#25226;&#36825;&#20010;&#39029;&#38754;&#25130;&#22270;&#21457;&#36827;&#32676;&#37324;&#65292;&#39318;&#20010;&#21457;&#29616;&#24182;&#25130;&#22270;&#21457;&#36827;&#22812;&#30333;&#32676;&#37324;&#30340;&#65292;&#20250;&#33719;&#36192;&#31070;&#31192;&#22836;&#34900;&#19968;&#20010;&#12290;'
						).set('ai',event.ai);
					}
					'step 3'
					event.result=result;
				}
				//-------------分支选择
				// lib.element.player.YB_chooseY = function(card,viewAs,log){
				// }
				//-------------隅泣函数
				lib.element.player.YB_yuqi = function(i,target){
					var next=game.createEvent('YB_yuqi',false);
					next.player=this;
					// if(get.itemtype(i)=='select'){
						next.list2=i;
					// }
					// else{next.list2=['隅泣',3,1,1];}
					if(target)next.target=target;
					// next.log=log;//技能说明
					// next.numa=numa;//展示数量
					// next.numb=numb;//对方数量
					// next.numc=numc;//自己数量
					next.setContent('YB_yuqi');
					return next;
				}
				lib.element.content.YB_yuqi = function(){
					'step 0'
					event.list=event.list2;
					if(!event.target) {
						event.target=player;
						// if(trigger.player)event.target=trigger.player;
					}
					var cards=get.cards(event.list[1]);
					event.cards=cards;
					game.cardsGotoOrdering(cards);
					var str=event.list[0];
					str+='（若对话框显示不完整，可下滑操作）';
					var next=player.chooseToMove(true,str);
					next.set('list',[
						['牌堆顶的牌',cards],
						['交给'+get.translation(event.target)+'（至少一张'+(event.list[2]>1?('，至多'+get.cnNumber(event.list[2])+'张'):'')+'）'],
						['交给自己（至多'+get.cnNumber(event.list[3])+'张）'],
					]);
					next.set('filterMove',function(from,to,moved){
						var info=event.list2;
						if(to==1) return moved[1].length<info[2];
						if(to==2) return moved[2].length<info[3];
						return true;
					});
					next.set('processAI',function(list){
						var cards=list[0][1].slice(0).sort(function(a,b){
							return get.value(b,'raw')-get.value(a,'raw');
						}),player=_status.event.player,target=event.target;
						var info=event.list2;
						var cards1=cards.splice(0,Math.min(info[3],cards.length-1));
						var card2;
						if(get.attitude(player,target)>0) card2=cards.shift();
						else card2=cards.pop();
						return [cards,[card2],cards1];
					});
					next.set('filterOk',function(moved){
						return moved[1].length>0;
					});
					'step 1'
					if(result.bool){
						var moved=result.moved;
						cards.removeArray(moved[1]);
						cards.removeArray(moved[2]);
						while(cards.length){
							ui.cardPile.insertBefore(cards.pop().fix(),ui.cardPile.firstChild);
						}
						var list=[[event.target,moved[1]]];
						if(moved[2].length) list.push([player,moved[2]]);
						game.loseAsync({
							gain_list:list,
							giver:player,
							animate:'gain2',
						}).setContent('gaincardMultiple');
					}
				}
				//-------------24点（搬运自福瑞拓展）
				lib.element.player.FY_24 = function(cards,log){
					var next=game.createEvent('FY_24',false);
					next.player=this;
					next.list2=cards;
					next.log='算演';
					if(log)next.log=log;
					next.setContent('FY_24');
					return next;
				}
				lib.element.content.FY_24 = function(){
					'step 0'
					var cards = event.list2;
					game.cardsGotoOrdering(cards);
					event.cards = cards
					var dialog = ui.create.dialog(event.log, cards, true)
					event.dialog = dialog
					event.list2 = []
					for (var i = 0; i < event.cards.length; i++) {
						event.list2.push(get.number(event.cards[i]))
					}
					event.list2.sort(function(a,b){return a-b});
					if (!event.isMine()) {
						player.popup('计算成功！');
						player.gain(cards, 'gain2').gaintag.add('delta_sy')
						player.addTempSkill('delta_sy_1')
						event.dialog.close()
						event.finish()
					}
					'step 1'
					event.list = [];
					for (var i = 0; i < event.list2.length; i++) {
						event.list.push(event.list2[i])
					}
					event.log='';
					'step 2'
					player.chooseControl(event.list).set('prompt', '请选择要算的第一个数字')
					'step 3'
					event.num1 = result.control
					event.list.splice(event.list.indexOf(event.num1), 1)
					player.chooseControl(event.list).set('prompt', '刚才选择了'+event.num1+'，请选择要算的第二个数字')
					'step 4'
					event.num2 = result.control
					event.list.splice(event.list.indexOf(event.num2), 1)
					player.chooseControl(['+', '-', '*', '/', '重做', '放弃']).set('prompt','要把'+event.num1+'和'+event.num2+'怎麼樣呢');
					'step 5'
					if (result.control == '+') {
						event.count = event.num1 + event.num2
						var log=(event.num1+' + '+event.num2+' = '+event.count);
						event.log+=log;
					}
					if (result.control == '-') {
						var num = event.num1 - event.num2
						if (num > 0) {
							event.count = num;
							var log=(event.num1+' - '+event.num2+' = '+event.count);
							event.log+=log;
						} else {
							event.count = -num;
							var log=(event.num2+' - '+event.num1+' = '+event.count);
							event.log+=log;
						}
					}
					if (result.control == '*') {
						event.count = event.num1 * event.num2;
						var log=(event.num1+' * '+event.num2+' = '+event.count);
						event.log+=log;
					}
					if (result.control == '/') {
						var result = event.num1 / event.num2
						event.count = result;
						var log=(event.num1+' / '+event.num2+' = '+event.count);
						event.log+=log;
					}
					if (result.control == '重做') {
						event.goto(1);
					}
					if (result.control == '放弃') {
						event.goto(8)
					}
					'step 6'
					event.list.push(event.count)
					'step 7'
					if (event.list.length != 1) {
						event.log+=' ；<br> ';
						event.goto(2)
					}
					else if(Math.abs(event.list[0]-24)<0.0001){
						event.goto(8)
					}
					else{
						player.popup(event.log+'算错了');
						game.log('本次计算展示数字为：<span class=bluetext>'+event.list2+'</span>，计算公式如下<br><span class=yellowtext> '+event.log+'，但是计算错误~ </span>')
						event.goto(1)
					}
					'step 8'
					if (event.list.length==1&&(Math.abs(event.list[0]-24)<0.0001)){
						player.popup('成功！');
						event._result={FY_24:'victoey'}
						game.log('本次计算展示数字为：<span class=bluetext>'+event.list2+'</span>，计算公式如下<br><span class=yellowtext> '+event.log+' ，计算正确！</span>')
						event.dialog.close()
						event.goto(9)
					} else {
						player.popup('失败！');
						event._result={FY_24:'defeat'}
						game.log('本次计算展示数字为：<span class=bluetext>'+event.list2+'</span>，但是未能成功计算')
						event.dialog.close()
						event.goto(9)
					}
					'step 9'
					event.result=result;
				}
				//-------------请人摸牌
				// lib.element.player.pleaseDraw = function(num){
				// }
				// get.YB_friend = function(player){
				// }
				//-------------彩蛋
				lib.element.player.addMaxHp=function(num,num2){
					this.gainMaxHp(num||1);
					this.recover(num2||num||1);
				}
				lib.element.player.YB_rua=function(str){
					lib.card['YB_'+get.pinyin(str)]={
						fullimage:true,
						image:'character:'+get.pinyin(str),
					}
					var card=game.creatCard('YB_'+get.pinyin(str));
					player.$gain2(card);
					game.log(this,'摸了摸',str);
				}
				//-------------翻牌小游戏
				lib.element.player.YB_playTurnCard=function(){
					var next=game.createEvent('YB_playTurnCard',false);
					next.player=this;
					next.setContent('YB_playTurnCard');
					return next;
				}
				lib.element.content.YB_playTurnCard=function(){
					//没写呢，别急
				}
				
				//-------------命名
				//-------------这部分作废，因为我没抄明白，bug连连，还不想删
				lib.element.player.YB_name=function(){
					var next=game.createEvent('YB_name',false);
					next.player=this;
					next.setContent('YB_name');
					return next;
				}
				lib.element.content.YB_name=function(){
					'step 0'
					var dialog = ui.create.dialog(false);
					dialog.add('【命名】<br>请输入你要命的名~');
					dialog.add('\u6211\u7279\u610f\u6ca1\u5220\u5e72\u51c0\uff0c\u8fd9\u6837\u4f60\u624d\u4f1a\u77e5\u9053\uff0c\u539f\u6765\u6211\u6284\u4e86\u9b54\u738b');
					var div = document.createElement('div');
					var input = div.appendChild(document.createElement('input'));
					input.type = 'text';
					input.setAttribute('maxlength', '20');
					input.addEventListener('keydown', e => {
						e.stopPropagation();
					});
					input.addEventListener('keyup', e => {
						e.stopPropagation();
					});
					input.placeholder = '请输入喵~';
					dialog.add(div);
					event.dialog = dialog;
					event.input = input;
					'step 1'
					var {
						dialog,
						input
					} = event;
					var clickFun = () => {
						/* 移除dialog */
						dialog.remove();
						var value = input.value;
						event.text= input.value;
						game.resume();
					}
					if (event.isMine()) {
						dialog.open();
						game.pause();
						var button = ui.create.control('确定',()=>{
							if(!input.value){
								return alert('输入不能为空');
								input.value='';
							}
							button.remove();
							clickFun();
						});

					} else if(event.isOnline()){   
						input.value ='未命名'
						clickFun();
					}else {
						input.value ='未命名'
						clickFun();
					}
					event.resume();
				}
				//-------------钫酸酱的文本输入
				lib.element.player.FY_chooseText = function chooseText() {
					var next = game.createEvent('FY_chooseText');
					for (var i = 0; i < arguments.length; i++) {
						if (typeof arguments[i] == 'boolean') {
							next.forced = arguments[i];
						} else if (Array.isArray(arguments[i])) {
							next.filterText = arguments[i]
						} else if (typeof arguments[i] == 'function') {
							if (next.ai) next.filterText = arguments[i];
							else next.ai = arguments[i];
						}
						else if (typeof arguments[i] == 'string') {
							get.evtprompt(next, arguments[i]);
						}
						else if (get.itemtype(arguments[i]) == 'dialog') {
							next.dialog = arguments[i];
						}
						else if (typeof arguments[i] == 'number') {
							next.max = arguments[i]
						}
						if (next.forced == undefined) next.forced = false;
					}
					next.player = this;
					next.setContent('FY_chooseText');
					next._args = Array.from(arguments);
					next.forceDie = true;
					return next;
				}
				lib.element.content.FY_chooseText = function chooseTextContent() {
					'step 0';
					if (event.isMine()) {
						if (event.dialog) {
							event.dialog.open();
						}
						else if (event.prompt) {
							event.dialog = ui.create.dialog(event.prompt);
							if (event.prompt2) {
								event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
							}
						}
						event.result = {}
						const div = document.createElement('div');
						const input = div.appendChild(document.createElement('input'));
						input.style.background = 'while';
						input.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=50,finishOpacity=40)";
						input.style.opacity = "1"
						input.style.width = '100%';
						input.style.fontSize = '20px';
						input.style.textAlign = 'center';
						input.style.color = '#e328b7';
						input.addEventListener('keydown', e => e.stopPropagation());
						input.addEventListener('keyup', e => e.stopPropagation());
						input.placeholder = '请在此输入文本';
						input.setAttribute('maxlength', event.max);
						event.dialog.add(div);
						game.pause();
						game.countChoose();
						event.choosing = true;
						var button = ui.create.control('确定', () => {
							if (event.filterText) {
								if (typeof event.filterText == 'function') {
									event.filterText = event.filterText()
								}
								if (!event.filterText.contains(input.value)) {
									return alert('您输入的内容不合要求')
								}
							}
							event.result.bool = true
							event.result.text = input.value ? input.value : ''
							doClose()
						});
						if (!event.forced) {
							var cancel = ui.create.control('取消', () => {
								event.result.bool = false
								doClose()
							});
						}
						event.switchToAuto = () => {
							event.result = 'ai';
							doClose()
						};
						const doClose = () => {
							button.remove();
							if (cancel) cancel.remove();
							game.resume();
						}
					} else if (event.isOnline()) {
						event.send();
					} else {
						event.result = 'ai';
					}
					'step 1';
					if (event.result == 'ai') {
						if (event.ai) {
							event.value = event.ai(event.getParent(), player);
						}
						event.result = {}
						event.result.bool = (event.value != -1 || event.forced)
						if (event.result.bool) event.result.text = event.value
					}
					_status.imchoosing = false;
					event.choosing = false;
					if (event.dialog) event.dialog.close();
					event.resume();
				}
				//-------------夜白很愤怒！
				game.YB_createCard=function(name,suit,number,nature,tag){
					if(typeof name=='object'){
						nature=name.nature;
						number=name.number;
						suit=name.suit;
						name=name.name;
					}
					if(typeof name!='string'){
						name='sha';
					}
					var noclick=false;
					if(suit=='noclick'){
						noclick=true;
						suit=null;
					}
					if(!suit&&lib.card[name].cardcolor){
						suit=lib.card[name].cardcolor;
					}
					if(!nature&&lib.card[name].cardnature){
						nature=lib.card[name].cardnature;
					}
					if(typeof suit!='string'){
						suit=['heart','diamond','club','spade'].randomGet();
					}
					else if(suit=='black'){
						suit=Math.random()<0.5?'club':'spade';
					}
					else if(suit=='red'){
						suit=Math.random()<0.5?'diamond':'heart';
					}
					if(typeof number!='number'&&typeof number!='string'){
						number=Math.ceil(Math.random()*13);
					}
					var card;
					if(noclick){
						card=ui.create.card(ui.special,'noclick',true);
					}
					else{
						card=ui.create.card(ui.special);
					}
					card.storage.vanish=true;
					return card.init([suit,number,name,nature,tag]);
				}
				//--------函数演示，定向火焰伤害
				//--------未知bug，禁止使用
				// lib.element.player.YB_toFire=function(targets,numb){
					// if(numb&&typeof numb=='string')var numa=numb;
					// else {
						// var num=(numb||1);
					// }
					// if(typeof targets=='string'&&targets.length){
						// for(var i=0;i<targets.length;i++){targets[i].damage('fire',(numa[i]||num),this)}
					// }
					// else targets.damage('fire',num,this)
				// }
				// //--------函数演示，定向指定伤害
				// lib.element.player.YB_toDamage=function(targets,natures,numb){
					// if(natures&&typeof natures=='string'&&(get.itemtype(natures[0])=='nature'||natures[0]=='recover'||natures[0]=='jueqing'))var nature=natures;
					// else if(!natures||get.itemtype(natures)=='nature'||natures=='revover'||natures=='jueqing'){
						// var naturey=(nature||null);
					// }
					// else {
						// numb=natures;
					// }
					// if(numb&&typeof numb=='string')var numa=numb;
					// else {
						// var num=(numb||1);
					// }
					// if(typeof targets=='string'&&targets.length){
						// for(var i=0;i<targets.length;i++){
							// if((nature[i]||naturey)=='recover'){targets[i].recover((numa[i]||num),this)}
							// else if((nature[i]||naturey)=='jueqing')targets[i].loseHp((numa[i]||num))
							// else targets[i].damage((nature[i]||naturey),(numa[i]||num),this)
						// }
					// }
					// else {
						// if((nature[0]||naturey)=='recover'){targets.recover((numa[0]||num),this)}
						// else if((nature[0]||naturey)=='jueqing')targets.loseHp((numa[0]||num))
						// else targets.damage((nature[0]||naturey),(numa[0]||num),this)
					// }
				// }
				// //--------魏武怒焰
				// lib.skill.YBSL_weiwunuyan={
					// mark:true,
					// marktext:'焰',
					// intro:{
						// name:'魏武怒焰',
						// content:'mark',
					// },
				// }
				// //--------清退（清除其他角色的怒焰）（单填true,或false则各流失一点，填false+true则根据标记数流失）
				// //--------清退（我是个sb）（不填则仅移除，填false则流失1，填true则根据标记数流失）
				// lib.element.player.YB_qingtui=function(str){
					// var player=this;
					// game.countPlayer(function(current){
						// var list=[];
						// if(current!=player&&current.hasMark('YBSL_weiwunuyan')){
							// list.push(current);
						// }
						// player.line(list,'thunder')
						// for (var i of list){
							// i.YB_yinbaofire(str);
						// }
					// })
				// }
				// //-----------------引爆输入的单体角色的魏武怒焰
				// lib.element.player.YB_yinbaofire=function(str){
					// var target=this;
					// if(target.hasMark('YBSL_weiwunuyan')){
						// if(str&&typeof str=='number'){
							// var num=target.storage.YBSL_weiwunuyan;
							// target.removeMark('YBSL_weiwunuyan',num);
							// target.loseHp(str);
						// }
						// else if(str){
							// var next=game.createEvent('YB_qingtui');
							// next.i=target;
							// next.numb=target.storage.YBSL_weiwunuyan;
							// next.setContent(function(){
								// event.i.removeMark('YBSL_weiwunuyan',event.numb);
								// event.i.loseHp(event.numb);
							// });
						// }
						// else{
							// var num=target.storage.YBSL_weiwunuyan;
							// target.removeMark('YBSL_weiwunuyan',num);
						// }
					// }
				// }
				// //-------------结阵相关
				// _status.yb_jiezhenPlayers={}//此集合记录所有阵列及其成员
				// _status.yb_zhenyanPlayers={}//此集合记录所有阵列的阵眼
				// //判断输入的角色是否已加入阵列，若为是则输出角色所处阵列，否则输出true
				// get.YB_jiezhen=function(player){//-----------二级
					// var list=_status.yb_jiezhenPlayers;
					// for(var i in list){
						// if(i&&list[i].contains(player)){
							// return i;
						// }
					// }
					// return true;
				// }
				// //判断输入的角色是否为阵眼，若为否则输出阵眼序号，否则输出true
				// get.YB_zhenyan=function(player){//-----------三级
					// if(get.YB_jiezhen(player)==true)return false;
					// var list=_status.yb_jiezhenPlayers;
					// var list2=_status.yb_zhenyanPlayers;
					// for(var i in list){
						// if(i&&list[i].contains(player)){
							// var k=i;
						// }
					// }
					// var p=list2[k];
					// if(list[k][p]==player)return true;
					// return p;
				// }
				// //判断输入角色所在阵的阵眼
				// get.YB_zhenyan2=function(player){//-----------二级
					// var list=_status.yb_jiezhenPlayers;
					// var list2=_status.yb_zhenyanPlayers;
					// for(var i in list){
						// if(i&&list[i].contains(player)){
							// var k=i;
						// }
					// }
					// var p=list2[k];
					// return list[k][p];
				// }
				// //输出结阵成员
				// get.YB_jiezhenPlayers=function(str){//-----------二级
					// var list=_status.yb_jiezhenPlayers[str];
					// var list2=[];
					// if(list.length){
						// for (var i=0;i<list.length;i++){
							// list2.push(list[i].name);
						// }
					// }
					// return list2;
				// }
				// //输出结阵成员卡牌
				// get.YB_jiezhenPlayers2=function(str){//-----------二级
					// var list=_status.yb_jiezhenPlayers[str];
					// var list2=[];
					// if(list.length){
						// for (var i=0;i<list.length;i++){
							// list2.push(list[i]);
						// }
					// }
					// return list2;
				// }
				// //获取输入角色在所处阵列的序号
				// get.YB_jiezhen_num=function(player){//-----------二级
					// var list=_status.yb_jiezhenPlayers;
					// var list2=_status.yb_zhenyanPlayers;
					// for(var i in list){
						// if(i&&list[i].contains(player)){
							// var k=i;
						// }
					// }
					// for(var x=0;x<list[k].length;x++){
						// if(list[k][x]==player)return x;
					// }
				// }
				// //判断输入的两名角色是否在同一阵列
				// get.YB_zhenlie=function(player,target){//-----------三级
					// var x=get.YB_jiezhen(player);
					// var y=get.YB_jiezhen(target);
					// if(x!=true&&y!=true&&x==y)return true;
					// return false;
				// }
				// //一行代码让输入的角色结阵，不输入阵名则随机用一个武将技能翻译作为阵名
				// lib.element.player.YB_jiezhen=function(ii,str){//-----------三级
					// var player=this;
					// // 'step 0'
					// if(get.YB_jiezhen(player)!=true) return;
					// var list5=[];
					// list5.push(player);
					// for(var k of ii){
						// if(get.YB_jiezhen(k)!=true) return;
						// list5.push(k);
					// }
					// if(!str){
						// var list=[],skills=[];
						// for(var i in lib.character){
							// list.push(i);
						// }
						// for(var i of list){
							// for(var j of lib.character[i][3]){
								// var skill=lib.skill[j];
								// if(!skill) continue;
								// for(var ab in _status.yb_jiezhenPlayers){
									// if(get.translation(j)!=ab)skills.add(j);
								// }
								// skills.add(j);
							// }
						// }
						// var list6=skills.randomSort()
						// var str=get.translation(list6[0]);
					// }
					// // 'step 1'
					// _status.yb_jiezhenPlayers[str]=list5;
					// for(var z of list5){
						// if(get.itemtype(z)=='player')z.markSkill('_ybsc_jiezhen');
					// }
					// var list6=[];
					// for(var st=1;st<list5.length;st++){
						// list6.push(list5[st])
					// }
					// game.log(player,'与',list6,'结成了'+str+'阵，阵眼是',player)
					// _status.yb_zhenyanPlayers[str]='0';
				// }
				// //解除阵列
				// lib.element.player.YB_jiezhen2=function(str){//-----------三级
					// if(!str)var str=get.YB_jiezhen(this);
					// if(str!=true){
						// var list=_status.yb_jiezhenPlayers[str];
						// for (var k of list){
							// k.unmarkSkill('_ybsc_jiezhen');
						// }
						// game.log(this,'解除了'+str+'阵')
						// delete _status.yb_jiezhenPlayers[str];
						// delete _status.yb_zhenyanPlayers[str];
					// }
				// }
				// //换阵眼
				// lib.element.player.YB_zhenyan=function(str){//-----------四级
					// if(!str)event.str=get.YB_jiezhen(this);
					// if(str!=true){
						// if(get.YB_zhenyan(this)!=true){
							// game.log(this,'将'+str+'阵的阵眼改成了',this,'。')
							// _status.yb_zhenyanPlayers[str]=get.YB_jiezhen_num(this);
						// }
					// }
				// }
				// //退出阵型
				// lib.element.player.YB_tuichu=function(ctrl){//-----------四级
					// var list=get.YB_jiezhen(this);
					// if(list==true)return;
					// if(get.YB_zhenyan(this)==true)return;
					// var list2=_status.yb_jiezhenPlayers[list];
					// if(ctrl&&ctrl==true)var str=this+'被踢出了'+list+'阵';
					// else var str=this+'退出了'+list+'阵';
					// _status.yb_jiezhenPlayers[list].remove(this);
					// this.unmarkSkill('_ybsc_jiezhen');
					// game.log(str)
				// }
				// //加入阵型
				// lib.element.player.YB_jiaru=function(str2){//-----------三级
					// var list=get.YB_jiezhen(this);
					// if(list!=true)return;
					// if(!str2)return;
					// var str=this+'加入了'+str2+'阵';
					// _status.yb_jiezhenPlayers[str2].push(this);
					// this.markSkill('_ybsc_jiezhen');
					// game.log(str)
				// }
				// //结阵相关技能
				// lib.skill.YBSL_jiezhen={
					// enable:'phaseUse',
					// usable:1,
					// delay:false,
					// charlotte:true,
					// prompt:function (player){
						// if(get.YB_jiezhen(player)==true)return '请选择两名其他角色，与他们结成阵列。';
						// return '是否将阵眼转移给自己？';
					// },
					// filter:function(event,player){
						// if(get.YB_jiezhen(player)==true)return game.countPlayer(function(current){
							// return current!=player&&get.YB_jiezhen(current)==true;
						// })>=1;
						// return get.YB_zhenyan(player)!=true;
					// },
					// selectTarget:function(event,player){
						// // var player=_status.event.player;
						// if(get.YB_jiezhen(player)!=true&&get.YB_zhenyan(player)!=true)return [0,0];
						// return [1,2];
					// },
					// filterTarget:function(card,player,target){
						// if(get.YB_jiezhen(player)!=true&&get.YB_zhenyan(player)!=true)return false;
						// return (target!=player&&get.YB_jiezhen(target)==true);
					// },
					// multiline:true,
					// multitarget:true,
					// content:function(){
						// 'step 0'
						// if(targets){
							// player.FY_chooseText().set('prompt','请为此阵命名。不输入直接确定会出错，点取消则会随机取名。');
							// event.list=[];
							// for(var i of targets){
								// event.list.push(i);
							// }
						// }
						// else {
							// player.YB_zhenyan();
							// event.finish();
						// }
						// 'step 1'
						// if(result.text=='')player.YB_jiezhen(event.list);
						// else player.YB_jiezhen(event.list,result.text);
					// },
					// ai:{
						// order:function(){
							// var player=_status.event.player;
							// return 8;
						// },
						// expose:0.1,
						// result:{
							// player:1,
							// target:1,
						// }
					// },
				// }
				// lib.skill._ybsc_jiezhen={
					// enable:'phaseUse',
					// usable:1,
					// delay:false,
					// prompt:function (player){
						// return '是否解除你所处的阵列？';
					// },
					// filter:function(event,player){
						// if(get.YB_jiezhen(player)==true)return false;
						// return true;
					// },
					// content:function(){
						// var str=get.YB_jiezhen(player);
						// player.YB_jiezhen2(str);
					// },
					// // mark:true,
					// marktext:'阵',
					// intro:{
						// name:'结阵',
						// content:function(event,player,storage,name,skill){
							// var list=get.YB_jiezhen(player);
							// var list2=get.YB_zhenyan2(player);
							// return list+'阵，成员包括'+get.YB_tobo3(get.YB_jiezhenPlayers(list))+'，阵眼是'+get.translation(list2.name);
						// }
					// },
					// ai:{
						// order:function(){
							// var player=_status.event.player;
							// return 8;
						// },
						// expose:0.1,
						// result:{
							// player:function(player,target){
								// var xx=get.YB_jiezhen(player);
								// var list=_status.yb_jiezhenPlayers[xx];
								// if(list.length){
									// for(var i of list){
										// if(i!=player){
											// var att=get.attitude(player,i);
											// if(att<0)return 10;
										// }
									// }
								// }
								// return 0;
							// }
						// }
					// },
				// }
				// lib.skill._ybsc_jiezhen2={
					// trigger:{
						// player:'damageBegin4',
					// },
					// direct:true,
					// firstDo:true,
					// delay:false,
					// filter:function(event,player){
						// if(get.YB_zhenlie(event.player,event.source))return true;
						// return false;
					// },
					// content:function(){
						// game.log(trigger.source,'触发了阵内伤害豁免，防止了对',player,'的伤害。')
						// trigger.cancel();
					// },
					// ai:{
						// expose:0.1,
						// effect:{
							// target:function(card,player,target){
								// if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
								// if(get.YB_zhenlie(player,target)==true)return 0;
								// return;
							// }
						// }
					// },
				// }
				// lib.skill._ybsc_jiezhen3={
					// trigger:{
						// global:'die',
					// },
					// direct:true,
					// firstDo:true,
					// delay:false,
					// filter:function(event,player){
						// if(get.YB_jiezhen(event.player)==true)return false;
						// if(get.YB_zhenyan(event.player)==true){return true;}
						// else{
							// var tar=get.YB_jiezhen(event.player);
							// var list=get.YB_jiezhenPlayers2(tar);
							// list.remove(list[get.YB_zhenyan(event.player)]);
							// for(var i of list){
								// if(i.isAlive())return false;
							// }
							// return true;
						// }
					// },
					// content:function(){
						// var str=get.YB_jiezhen(trigger.player);
						// var list=_status.yb_jiezhenPlayers[str];
						// for(var k of list){
							// k.unmarkSkill('_ybsc_jiezhen');
						// }
						// game.log(this,'阵亡，'+str+'阵被迫解除。')
						// delete _status.yb_jiezhenPlayers[str];
						// delete _status.yb_zhenyanPlayers[str];
					// },
					// ai:{
						// expose:0.1,
					// },
				// }
				get.YB_chongzhijiList=function(player,skill){
					if(!player.storage[skill+'_chongzhijiList']){
						player.storage[skill+'_chongzhijiList']=[];
						if(lib.skill[skill].chongzhijiList)player.storage[skill+'_chongzhijiList']=lib.skill[skill].chongzhijiList;
					}
					return player.storage[skill+'_chongzhijiList'];
				}
				get.YB_chongzhiList=function(player,skill){
					if(!player.storage[skill]||player.storage[skill].length==0){
						player.storage[skill]=[];
						if(player.storage[skill+'_chongzhijiList']){
							for(var i = 0;i<player.storage[skill+'_chongzhijiList'].length;i++){
								player.storage[skill].add(player.storage[skill+'_chongzhijiList'][i]);
							}
						}
					} 
					return player.storage[skill];
				}
				//-------------
				
				//-------------
			}
			//---------------------------------------------------------*/
			/********************更新公告********************/
			// lib.init.js(lib.assetURL + `extension/夜白神略/ext`, "update");
			lib.init.js(lib.assetURL + `extension/夜白神略/ext2`, "update");
			//此处岔开
			get.ybslb_gengxin = function() {
				var cfg = 'extension_夜白神略_changelog';
				// delete window.ybslb_update;
				var update = window.ybslb_update;
				if(!update) return false;
				lib.extensionPack['夜白神略'].version = update.version;
				var gengxing = update[update.version];
				if(!gengxing) return false;
				if (lib.extensionPack['夜白神略'] && lib.extensionPack['夜白神略'].version != lib.config[cfg]) {
					game.saveConfig(cfg, lib.extensionPack['夜白神略'].version);
				} else {
					return false;
				};
				var ul = document.createElement('ul');
				ul.style.textAlign = 'left';
				var caption;
				var version = update.version;
				var players = gengxing.players || [];
				var cards = gengxing.cards || [];
				var changeLog = gengxing.changeLog || [];
				caption = '夜白神略更新';
				
				for (var i of changeLog) {
					var li = document.createElement('li');
					li.innerHTML = i;
					ul.appendChild(li);
				};
				var dialog = ui.create.dialog(caption, 'hidden');
				dialog.add(version);
				dialog.forcebutton = true;
				dialog.classList.add('forcebutton');
				var lic = ui.create.div(dialog.content);
				lic.style.display = 'block';
				ul.style.display = 'inline-block';
				ul.style.marginLeft = '-40px';
				lic.appendChild(ul);
				if (players.length) {
					for (var i = 0; i < players.length; i++) {
						if (!lib.character[players[i]]) {
							var result = get.character(players[i]);
							if (result) {
								if (!result[4]) {
									result[4] = [];
								};
								lib.character[players[i]] = result;
							};
						};
						if (!lib.character[players[i]]) {
							players.splice(i--, 1);
						};
					};
					if (players.length) {
						dialog.addText('武将更新');
						dialog.add([players, 'character']);
						//dialog.addSmall([players,'character']);				
					};
				};
				if (cards.length) {
					for (var i = 0; i < cards.length; i++) {
						if (!lib.card[cards[i]]) {
							cards.splice(i--, 1);
						};
					};
					if (cards.length) {
						for (var i = 0; i < cards.length; i++) {
							cards[i] = [get.translation(get.type(cards[i])), '', cards[i]];
						};
						dialog.addText('卡牌更新');
						dialog.add([cards, 'vcard']);
						//dialog.addSmall([cards,'vcard']);									
					}
				}
				dialog.addText('-----------------------------------------');
				dialog.addText('-----------------------------------------');
				dialog.addText('-------------------END-------------------');
				dialog.addText('-----------------------------------------');
				dialog.addText('-----------------------------------------');
				dialog.open();
				var hidden = false;
				if (!ui.auto.classList.contains('hidden')) {
					ui.auto.hide();
					hidden = true;
				};
				game.pause();
				var control = ui.create.control('确定', function() {
					dialog.close();
					control.close();
					if (hidden) ui.auto.show();
					game.resume();
				});
				lib.init.onfree();
			};
			var _showChangeLog = game.showChangeLog;
			game.showChangeLog = function() {
				_showChangeLog();
				var next = game.createEvent('ybslb_gengxin', false);
				next.setContent(function() {
					get.ybslb_gengxin();
				});
			};
	
	
	
	//同素异形体
	
		},
		help:{
			'夜白神略':'总有游客玩我的扩展不开将包，然后找不到别的武将呢，说没意思。现在我希望你能耐心读指引。'
			+'<br>首先打开菜单，去武将列表下翻找到夜白将包和六艺篇，打开，然后去卡牌列表下翻找到夜白牌堆，打开（BOSS搬运看心情开），然后重启就OK了。',

			"六艺篇":"<li>关于六艺系列"
			+"<br>六艺区是夜白神略包创立的机制。六艺区相当于一个私人的木牛流马，可以如手牌般使用或打出。"
			+"<br>出牌阶段限一次，你可以将一张手牌置入六艺区，然后若六艺区牌数大于等于3，则获得精艺（精艺：每当你失去一张六艺区的牌时，你摸一张牌。）六艺区至多为6。"
			+"<br>与此同时，作者同时推出了六艺技，其特征是可以通过对六艺区牌的应用来触发效果。需要注意的是，某些技能虽然和六艺区有关，但作者并没有给它定义为六艺技，因为它只是额外的把牌放入六艺区而并没有利用。",
			
			// "结阵技":"<li>关于结阵技"
			// +"<br>结阵是夜白神略包三传分包创立的机制。"
			// // +"<br>出牌阶段限一次，若你未处于阵列，你可以选择至多两名其他角色发起结阵，然后设定你为阵眼；若你处于阵列且不是阵眼，你可以将阵眼转移给你。"
			// // +"<br>出牌阶段限一次，若你处于阵列，你可以解除你所处的阵列。"
			// // +"<br>同一角色仅能加入一个阵列，假如某个成员自私的退出了阵列，那么阵列便会直接破解。"
			// // +"<br>同一阵列内彼此伤害豁免，一些技能会因为阵列或阵眼而发生变化。大嘴表示：快给我个结阵技。"
			// +"<br>有结阵技的角色出牌阶段限一次，若其未结阵，其可以选择至多两名其他角色进行结阵，发起结阵的角色称为阵眼。"
			// +"<br>若其已结阵，且其有结阵技，其可以消耗结阵次数，将阵眼改为自己。"
			// +"<br>每名角色的出牌阶段限一次，若其处于结阵状态，其可以解除结阵状态。"
			// +"<br>一名角色仅能加入一个阵列。"
			// +"<br>同一阵列内的成员造成的伤害对彼此豁免，一些技能会因为阵列或阵眼而发生变化。大嘴表示：快给我个结阵技。"
		},
		config:{
			// "ybslb":{
			// 	"name":"禁用此包",
			// 	"intro":"测试中，别动",
			// 	"init":false
			// },
			"ybslb_help":{
				name:'<span class="yellowtext">查看介绍</span><span style="color:#ff00cc"><font size="4px">▶▶▶</font></span>',
				clear:true,
				onclick: function(){
					if(this.help==undefined){
						var log=["未加入到启动代码的那些东西别乱动，都是没做完，不能用的<br>",
						"除原版马均公式外，还有以下马均不能的：",
						"· <span class=firetext>王追</span>可升级成为<span class=yellowtext>乌云踏雪</span>，",
						"· <span class=firetext>赤兔</span>可升级为<span class=yellowtext>烈焰赤兔</span>，",
						"· <span class=firetext>朱雀扇</span>、<span class=firetext>赤炎琴</span>和<span class=firetext>五行扇</span>可升级为<span class=yellowtext>北斗七星扇</span>，",
						"· <span class=firetext>倚天剑</span>可升级为<span class=yellowtext>七星龙渊剑</span>，",
						"· 黑桃<span class=firetext>闪电</span>、<span class=firetext>太公阴符</span>和<span class=firetext>浮雷</span>可升级为<span class=yellowtext>阴勾玉</span>，",
						"· 非黑桃<span class=firetext>闪电</span>、<span class=firetext>洪水</span>和<span class=firetext>火山</span>可升级为<span class=yellowtext>阳勾玉</span>，",
						"· <span class=firetext>阴/阳勾玉</span>在装备区时，用<span class=firetext>阳/阴勾玉</span>替掉就会合成<span class=yellowtext>天雷玉璧</span>，",
						"· <span class=firetext>天雷玉璧</span>可升级为<span class=yellowtext>神雷玉璧</span>，",
						"· <span class=firetext>毒</span>可锻造为<span class=yellowtext>毒箭</span>，",
						"· <span class=firetext>青龙刀</span>可锻造为<span class=yellowtext>锁龙偃月刀</span>，",
						"· <span class=firetext>方天画戟</span>和<span class=firetext>乌铁锁链</span>可锻造为<span class=yellowtext>方天锁链鞭</span>。",
						"· <span class=firetext>铜雀</span>可锻造为<span class=yellowtext>界铜雀</span>。",
						"· <span class=firetext>护心镜</span>可锻造为<span class=yellowtext>白虎镜</span>。"
						];
						
						var more=ui.create.div('.help','<div style="border:2px solid gray"><P align=left>'+log.join('<br>')+'</P>');
						this.parentNode.insertBefore(more, this.nextSibling);
						this.help=more;
						this.innerHTML='<span class="yellowtext">查看介绍</span><span style="color:#ff00cc"><font size="4px">▼▼▼</font></span>';
					}else{
						this.parentNode.removeChild(this.help);
						delete this.help;
						this.innerHTML='<span class="yellowtext">查看介绍</span><span style="color:#ff00cc"><font size="4px">▶▶▶</font></span>';
					};
				},
			},
			// "ybslb_help":{
			// 	"nopointer":true,
			// 	"name":"<span class=firetext>夜</span><span class=yellowtext>白</span><font color=cyan>神</font><span class=thundertext>略</span>",
			// 	"init":"1",
			// 	"item":{
			// 		"1":"<span style='color:#ff00cc'>查看介绍</span>",
			// 		"2":"若这段话挤满整个页面，<span style='color:#ff00cc'>请点这</span>然后点<span style='color:#ff00cc'>查看介绍</span>，",
			// 		"3":"未加入到启动代码的那些东西别乱动，都是没做完，不能用的",
			// 		"4":"除原版马均公式外，还有以下马均不能的，",
			// 		"5":"<li><span class=firetext>王追</span>可升级成为<span class=yellowtext>乌云踏雪</span>，",
			// 		"6":"<li><span class=firetext>赤兔</span>可升级为<span class=yellowtext>烈焰赤兔</span>，",
			// 		"7":"<li><span class=firetext>朱雀扇</span>、<span class=firetext>赤炎琴</span>和<span class=firetext>五行扇</span>可升级为<span class=yellowtext>北斗七星扇</span>，",
			// 		"8":"<li><span class=firetext>倚天剑</span>可升级为<span class=yellowtext>七星龙渊剑</span>，",
			// 		"9":"<li>黑桃<span class=firetext>闪电</span>、<span class=firetext>太公阴符</span>和<span class=firetext>浮雷</span>可升级为<span class=yellowtext>阴勾玉</span>，",
			// 		"10":"<li>非黑桃<span class=firetext>闪电</span>、<span class=firetext>洪水</span>和<span class=firetext>火山</span>可升级为<span class=yellowtext>阳勾玉</span>，",
			// 		"11":"<li><span class=firetext>阴/阳勾玉</span>在装备区时，用<span class=firetext>阳/阴勾玉</span>替掉就会合成<span class=yellowtext>天雷玉璧</span>，",
			// 		"12":"<li><span class=firetext>天雷玉璧</span>可升级为<span class=yellowtext>神雷玉璧</span>，",
			// 		"13":"<li><span class=firetext>毒</span>可锻造为<span class=yellowtext>毒箭</span>。"
			// 	}
			// },
			"ybslb_jiaqun":{
				name:'<span class="yellowtext">欢迎加群</span><span style="color:#ff00cc"><font size="4px">▶▶▶</font></span>',
				clear:true,
				onclick:function(){
					if(this.jiaqun==undefined){
						var more=ui.create.div('.jiaqun','<div style="border:2px solid gray"><span><img style=width:238px src='+lib.assetURL+'extension/夜白神略/ybslb_QQ.jpg></span>');
						this.parentNode.insertBefore(more, this.nextSibling);
						this.jiaqun=more;
						this.innerHTML='<span class="yellowtext">欢迎加群</span><span style="color:#ff00cc"><font size="4px">▼▼▼</font></span>';
					}else{
						this.parentNode.removeChild(this.jiaqun);
						delete this.jiaqun;
						this.innerHTML='<span class="yellowtext">欢迎加群</span><span style="color:#ff00cc"><font size="4px">▶▶▶</font></span>';
					};
				},
			},
			"ybsl_skillstrengthen":{
				name:"技能加强（需重启）",
				intro:"加强部分武将技能，有其它想加强的可跟作者许愿。"
				+"<br>当前加强的有："
				+"<br><span class=firetext>佐藤雏</span>的<span class=yellowtext>神视</span>，"
				+"<br><span class=firetext>张琪瑛</span>的<span class=yellowtext>所有技能</span>，"
				+"<br><span class=firetext>篝酱</span>的<span class=yellowtext>纵丝</span>，"
				+"<br><span class=firetext>马均</span>的<span class=yellowtext>精械</span>，"
				+"<br><span class=firetext>神诸葛亮</span>的<span class=yellowtext>七星</span>和<span class=yellowtext>狂风</span>，"
				+"<br>因原版<span class=yellowtext>铜雀</span>被作者加入天火煅升级公式，故此移除，"//
				+"<br><span class=firetext>曹金玉</span>的<span class=yellowtext>隅泣</span>，"
				+"<br><span class=firetext>神户小鸟</span>的<span class=yellowtext>所有技能</span>。",
				init:true,
			},
			'ybsl_func':{
				name:'<span class="yellowtext">夜白函数详情说明</span><span style="color:#ff00cc"><font size="4px">▶▶▶</font></span>',
				clear:true,
				onclick: function(){
					if(this.help==undefined){
						var log=[
						"有点长，阅读全文需做好心理准备<br>",
						"· YB_HpTo",
						"完整写法为：player.YB_HpTo(num)，括号内填写整数即可。",
						"作用是将角色血量直接调整至该数值，且不触发相关技能。若目标血上限小于目标数值，则会把血条撑到这个数值。（夜白的牛刀小试）<br>",
						"· YB_yuqi",
						"完整写法为：player.YB_yuqi(i,target)，参数i为数组，target为目标角色，两个参数不能调换顺序。",
						"作用是对参数target使用隅泣，参数i为数组，必须要填。",
						"['隅泣',3,1,1]第一个参数为这个隅泣显示的名字，第二个参数为观看牌的数量，第三个参数是给目标的数量，第四个参数是给自己的数量。",
						"参数target为隅泣的目标，不填默认为自己。<br>",
						"· YB_fuhan",
						"完整写法为：player.YB_fuhan(i,type)，参数i为数组，type为扶汉类型，两个参数不能调换顺序。",
						"作用是player执行扶汉，类型为type，type不填为默认扶汉，填'tw'则为tw赵襄的扶汉模式，填'old'则为旧版扶汉。",
						"i参数不填则为默认参数，详情在下方具体列举<br>",
						"默认扶汉：默认参数i为['all',5,2,,'all',]。若创建了i的集合，则不论参数填写与否，英文逗号必须保留。作用是从参数一所列势力中抽取参数二张武将牌，<span class=yellowtext>player挑选至多参数三个技能获得之</span>，抽取的武将排除掉参数四所列举的武将，抽取的武将性别限定为参数五，第六个参数筛选是否为主公。",
						"第一个参数为势力筛选，是个嵌套数组，需要列举势力id（例['wei','shu']），若不输入数组或输入all则为所有势力；第二个参数为抽取武将的数量，不填默认为5；<span class=yellowtext>第三个参数为挑选技能的数量，不填默认为2</span>；第四个参数是被筛除的武将，是个嵌套的数组，需在其中列举（例['zuoci','huatuo']），默认为空，即不筛选；第五个参数为性别筛选，是个嵌套的数组，需在其中列举（例['male','double']），不填数组或填入'all'则不筛选势力；第六个参数筛选是否为主公，填'zhu'则挑选主公。填'nozhu'则挑选非主公，填其他或不填则不筛选。<br>",
						"tw扶汉：默认参数i为['all',5,,,'all',]。若创建了i的集合，则不论参数填写与否，英文逗号必须保留。作用是从参数一所列势力中抽取参数二张武将牌，<span class=yellowtext>player挑选一个获得其技能</span>，抽取的武将排除掉参数四所列举的武将，抽取的武将性别限定为参数五，第六个参数筛选是否为主公。",
						"第一个参数为势力筛选，是个嵌套数组，需要列举势力id（例['wei','shu']），若不输入数组或输入all则为所有势力；第二个参数为抽取武将的数量，不填默认为5；<span class=yellowtext>第三个参数为发动此技能的角色id，乱填不知会有何后果，不填默认为player的主将</span>；第四个参数是被筛除的武将，是个嵌套的数组，需在其中列举（例['zuoci','huatuo']），默认为空，即不筛选；第五个参数为性别筛选，是个嵌套的数组，需在其中列举（例['male','double']），不填数组或填入'all'则不筛选势力；第六个参数筛选是否为主公，填'zhu'则挑选主公。填'nozhu'则挑选非主公，填其他或不填则不筛选。<br>",
						"旧版扶汉：默认参数i为['all',5,,,'all',]。若创建了i的集合，则不论参数填写与否，英文逗号必须保留。作用是从参数一所列势力中抽取参数二张武将牌，<span class=yellowtext>player挑选一个将参数三武将替换为所选武将</span>，抽取的武将排除掉参数四所列举的武将，抽取的武将性别限定为参数五，第六个参数筛选是否为主公。",
						"第一个参数为势力筛选，是个嵌套数组，需要列举势力id（例['wei','shu']），若不输入数组或输入all则为所有势力；第二个参数为抽取武将的数量，不填默认为5；<span class=yellowtext>第三个参数为被替换角色的id，乱填不知会有何后果，不填默认为player的主将</span>；第四个参数是被筛除的武将，是个嵌套的数组，需在其中列举（例['zuoci','huatuo']），默认为空，即不筛选；第五个参数为性别筛选，是个嵌套的数组，需在其中列举（例['male','double']），不填数组或填入'all'则不筛选势力；第六个参数筛选是否为主公，填'zhu'则挑选主公。填'nozhu'则挑选非主公，填其他或不填则不筛选。",
						"综上。<br>",
						"· YB_shelie",
						"完整写法是：player.YB_shelie(num,i,log)，各个参数不能调换顺序",
						"作用是player展示牌堆顶num张牌，获取其中每种花色至多一张，参数i为窗口显示的名字，默认为涉猎，参数log若为true，则强制选择每种花色各一张。",
						"参数num不填默认为5，参数i不填默认为“涉猎”，参数log若为true则表示强制选择<br>",
						"· YB_control",
						"完整写法是：player.YB_control(control,num,str)，各个参数不能调换顺序",
						"作用是若不为玩家操作，则player.chooseControl(control)①，否则玩家进行一个可翻页的player.chooseControl(control)，参数num为每页的按钮数，log为选按钮时显示的字幕",
						"请勿在翻页选择时托管，翻页的界面ai不会选……",
						"player.YB_control()可以接.set('ai',function(control){巴拉巴拉})，会接在上面①的位置用来提供ai思考。<br>",
						"· YB_1234",
						"完整写法是：get.YB_1234(list)，list必须为一组玩家的集合",
						"作用是从当前视角重新排列list。<br>",
						"· YB_tobo",
						"完整写法是：get.YB_tobo(cards)，cards必须为一组每一项都可以翻译的集合",
						"作用是将cards每个元素都翻译出来。<br>",
						"· YB_zhiheng",
						"完整写法是：player.YB_zhiheng(list)，list需为一组卡牌",
						"作用是玩家弃置这些牌，再摸等量牌。<br>",
						// "· YB_chongzhu",
						// "完整写法是：player.YB_chongzhu(card)，card需为一组卡牌",
						// "作用是玩家将这些牌置入弃牌堆，再摸等量牌。<br>",
						"· North_bmh_chizhang",
						"完整写法是：get.North_bmh_chizhang(player)，player需为场上一名角色",
						"作用是获取player的所有已发动限定技。<br>",
						"· YB_sblijian",
						"完整写法是：player.YB_sblijian(list)，list需为一组玩家的集合",
						"作用是令list里的角色依次对处于此集合中的上家使用决斗。<br>",
						"· FY_chooseText",
						"完整写法是：player.FY_chooseText()，",
						"作用是令玩家自由输入文本（来自福瑞拓展）<br>",
						"· YB_suit",
						"完整写法是：get.YB_suit(cards,i)，cards必须为一组有属性的集合，i不写默认为suit",
						"作用是不重复的获取cards每个元素的get[i]属性。<br>",
						"",
						];
						
						var more=ui.create.div('.help','<div style="border:2px solid gray"><P align=left>'+log.join('<br>')+'</P>');
						this.parentNode.insertBefore(more, this.nextSibling);
						this.help=more;
						this.innerHTML='<span class="yellowtext">夜白函数详情说明</span><span style="color:#ff00cc"><font size="4px">▼▼▼</font></span>';
					}else{
						this.parentNode.removeChild(this.help);
						delete this.help;
						this.innerHTML='<span class="yellowtext">夜白函数详情说明</span><span style="color:#ff00cc"><font size="4px">▶▶▶</font></span>';
					};
				},
			},
			
			"夜白神略的自动更新素材开关":{
				"name":"<b>自动导入素材</b>",
				'init': true,
				'intro': '<font color=\'#ADEAEA\'>开启后将自动检测并导入图片素材',
			},
			// 'furryCardFileConfig2': {
			// 	'name': '<b>自动导入素材</b>',
			// 	'init': true,
			// 	'intro': '<font color=\'#ADEAEA\'>开启后将自动检测并导入图片素材',
			// },
			"ybsl_cardPile":{
				"name":"<b>牌堆选取</b>",
				"intro":"使用夜白神略的专属牌堆替换当前牌堆（会与其他牌堆替换冲突）（为了便于测试，特地在标准军争牌堆加了两张煽风点火）",
				"init":lib.config.ybsl_cardPileReplace===undefined?"close":lib.config.ybsl_cardPileReplace,
				"item":{
					"ybslCardPile":"夜白自用牌堆（共547张）",
					"ybslminiCardPile":"夜白迷你牌堆（约4副扑克）",
					"ybslExtraCardPile":'标准军争牌堆',
					"close":"关闭",
				},
				onclick:function(item){
					game.saveConfig('extension_夜白神略_ybsl_cardPile',item);
					game.saveConfig('ybsl_cardPileReplace',item);
				}
			},
			"ybsl_wujinshilian":{
				name:"无尽试炼（需重启）",
				intro:"经实验发现，夜白国战和无尽试炼不可兼得，开了无尽试炼玩不了夜白国战，不知为何。"
				+"<br><span class=yellowtext>夜白国战</span>："
				+"<br>将夜白包武将加入国战。"
				+"<br>平衡有待调整。"
				+"<br><span class=yellowtext>夜白旅程</span>："
				+"<br>已挑战过的敌人会作为可选队友出现在列表中；"
				+"<br>加入选项：弃置五张牌，然后凭空印制花中四君子各一张。"
				+"<br><span class=yellowtext>夜白塔防</span>："
				+"<br>可以自由点将；"
				+"<br>其它有待魔改。",
				init:false,
				"item":{
					"gz":"<span class=yellowtext>夜白国战</span>",
					"lc":"<span class=yellowtext>夜白旅程</span>",
					// "tf":"<span class=yellowtext>夜白塔防</span>"
				}
			},
			"ybsl_loglog":{
				name:"log发生器（已禁用）",
				intro:"开启后，场上角色每次执行操作都会log一遍所有参数。（参数或时机有遗漏欢迎补充）"
				+"<br>由于会导致卡顿，请在适时使用。"
				+"<br>如果由于私自开启导致出现无法关闭，重启的bug，请游戏外前往主代码区把条件检测改成别的",
				"init":"关闭",
				"item":{
					// "开启":"<span class=yellowtext>开启</span>",
					"关闭":"<span class=yellowtext>关闭</span>"
				}
			},
			"ybsl_wujianghouxuan":{
				name:"单骑候选",
				intro:"<span class=yellowtext>夜白旅程可选敌方的数量，需开启无尽试炼。</span>",
				init:"5",
				"item":{
					"3":"三",
					"4":"四",
					"5":"五",
					"6":"六",
					"7":"七",
					"8":"八",
					"9":"九",
					"10":"十",
					"11":"十一",
					"12":"十二",
					"13":"十三",
					"14":"十四",
					"15":"十五"
				}
			},
		},
		package:{
			character:{
				character:{
					//"ybsl_bikan":["female","YB_demon",999,["ybsl_yindao"],["forbidai","hiddenSkill","des:必看"]],
				},
				translate:{
					"ybsl_mo_zhangjiao":"张角",
					"ybsl_wudi":"无敌",
					"ybsl_fuhuceshi":"伏虎",
					"ybsl_sunben":"孙笨",
					//"ybsl_bikan":"必看",
				},
				characterTitle:{
					//"dzsl_014liutianyu":"<font color=cyan>夜白</font>",
				},
			},
			card:{
				list:[],
			},
			skill:{
				skill:{
					//"ybsl_yindao":{},
				},
				translate:{
					"ybsl_lvli":"膂力",
					"ybsl_lvli_info":"每回合限两次，当你造成伤害后或受到伤害后，你可选择：1，若你的体力值大于你的手牌数，你摸Ｘ张牌；2，若你的手牌数大于你的体力值且你已受伤，你回复Ｘ点体力（Ｘ为你的手牌数与体力值之差）（手牌数和体力值中。大于8的视为8）。",
					"ybsl_zuogeceshi":"测试",
					"ybsl_zuogeceshi_info":"结束阶段，你可以展示牌堆顶的三张牌，然后根据X值（X为这三张牌中红色牌的数量），令一名其他角色获得对应的效果直到其下回合结束：①三张：其摸牌阶段多摸两张牌，使用【杀】的次数上限+1。②两张：其使用【杀】的次数上限-1，跳过弃牌阶段。③小于两张：其于准备阶段开始时弃置一张手牌。",
					"ybsl_fenshe":"奋射",
					"ybsl_fenshe_info":"出牌阶段，你可以弃置X张牌对你攻击范围内的一名其他角色造成1点伤害（X为该角色的体力值），然后后的一枚“伏”标记。若该角色因此法进入濒死状态且存活，则你于濒死状态结算后失去1点体力，且本回合不能再发动此技能。",
					"ybsl_fenshe2":"ybsl_fenshe2",
					"ybsl_fenshe2_info":"",
					"ybsl_fenshe3":"ybsl_fenshe3",
					"ybsl_fenshe3_info":"",
					"ybsl_chengyu":"乘舆",
					"ybsl_chengyu_info":"当你失去装备区内的牌后，你可以摸二倍的牌张牌或恢复等量体力，然后获得两枚伏。",
					"ybsl_fuhu":"伏虎",
					"ybsl_fuhu_info":"转换技，略",
					"ybsl_fuhu2":"ybsl_fuhu2",
					"ybsl_fuhu2_info":"",
					"ybsl_shoujian":"受谏",
					"ybsl_shoujian_info":"当你的判定牌生效后，你可以获得之，然后获得一枚伏虎。",
					"ybsl_quanchi":"拳斥",
					"ybsl_quanchi_info":"当你即将受到伤害时，你可以弃置一张牌，然后获得伤害来源的一张牌并展示，若两张牌花色相同，则防止此伤害。然后你获得两枚伏虎。",
					"ybsl_scsaodang":"扫荡",
					"ybsl_scsaodang_info":"锁定技，你使用杀指定手牌数大于你的角色无距离限制；你使用杀指定手牌数小于你的角色时，你本回合使用杀的次数-1。",
					"ybsl_scpingjun":"平郡",
					"ybsl_scpingjun_info":"每当你使用杀指定目标后，你可令目标获得此杀，若如此做，此杀不可被闪避，然后你与其各摸一张牌。",
					"ybsl_suoziji_skill":"锁子甲",
					"ybsl_suoziji_skill_info":"锁定技，当你受到杀的伤害时，此伤害-1；当你受到锦囊的伤害时，此伤害+1.",
					"rewrite_ybsl_suoziji_skill":"七星甲",
					"rewrite_ybsl_suoziji_skill_info":"锁定技，当你受到杀的伤害时，此伤害-1；当你受到锦囊的伤害时，你摸一张牌。",
					//"ybsl_yindao":"引导",
					//"ybsl_yindao_info":"总有游客玩我的扩展不开将包，然后找不到别的武将呢，说没意思。现在我希望你能耐心读指引。<br>首先打开菜单，去武将列表下翻找到夜白将包和六艺篇，打开，然后去卡牌列表下翻找到夜白牌堆，打开（BOSS搬运看心情开），然后重启就OK了。",
				},
			},
	
			intro: (function () {
				var log = [
			
			
			
			//----------------5.7.0-1.5--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：5.7.0-1.5',
			'更新日期：2024-06-02',
			'------------更新详情------------',
			'- 本扩展需本体版本为1.10.2以上，建议最新版！。',
			'- 新武将族陆逊，郑佳怡。',
			'- 削弱张汨，稍微增强通渠张汨。',
			'- 晶的水剑元交换位置部分仍旧有点bug，无法发动，还望体谅',
			'- 修复若干bug，可能添加若干bug。',
			'------------鸣谢清单------------',
			'- 狂神is NB！',
			'- 经过我和B站up主鸣濑白羽酱的沟通，现本扩展包部分武将插图采用他的ai制图，具体被应用的武将在该角色的简介里备注。',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案合理即可。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 铝宝就是天使！。',
			'- <span class=yellowtext>感谢Angle为本扩展的想去远方撰写ai，以及优化张晴。</span>',
			'- <span class=yellowtext>感谢周子鱼为本扩展制作的十周年美化卡牌。</span>',
			'- <span class=yellowtext>感谢鬼神易早期为本扩展撰写的几个武将。</span>',
			//为什么用黄色？因为这些是我花钱搞的=w=
			'- 铝宝就是天使！。',
			
				];
				return '<p style="color:rgb(210,210,000); font-size:12px; line-height:14px; text-shadow: 0 0 2px black;">' + log.join('<br>') + '</p>';
			})(),
			author:"夜白&<span style=\"opacity:0.5;\">鬼神易</span>",
			diskURL:"",
			forumURL:"",
			version:"5.7.0-1.5",
		},
		files:{
			"character":[
				//"ybsl_bikan.jpg"
			],
			"card":[
				
			],
			"skill":[
				
			]
		},
	}
})
			

/*			
			//
			//----------------5.7.0--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：5.7.0',
			'更新日期：2024-02-03',
			'------------更新详情------------',
			'- 本扩展需本体版本为1.10.2以上，建议最新版！。',
			'- 三传包武将独立分包。',
			'- 【醋】效果暂时调整。',
			'- 暂无武将更新。',
			'- 晶的水剑元交换位置部分仍旧有点bug，无法发动，还望体谅',
			'- 修复若干bug，可能添加若干bug。',
			'------------鸣谢清单------------',
			'- 狂神is NB！',
			'- 经过我和B站up主鸣濑白羽酱的沟通，现本扩展包部分武将插图采用他的ai制图，具体被应用的武将在该角色的简介里备注。',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案合理即可。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai，以及优化张晴。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			'- 铝宝就是天使！。',
			
			//----------------5.6.0--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：5.6.0',
			'更新日期：2023-12-10（13:10）',
			'------------更新详情------------',
			'- 本扩展需本体版本为1.10.2以上，建议最新版！。',
			'- 新增武将珂赛特，星落四公主，三传包刘备，凌操，夏侯氏。重做鹰原羽依里。',
			'- 引入了B站up主蕾厉风行的设计【煽风点火】。',
			'- 优化部分代码。',
			'- 因为要重做技能，故此屏蔽瑜乔和陆逊。',
			'- 晶的水剑元交换位置部分仍旧有点bug，无法发动，还望体谅',
			'- 修复若干bug，可能添加若干bug。',
			'------------鸣谢清单------------',
			'- 狂神is NB！',
			'- 经过我和B站up主鸣濑白羽酱的沟通，现本扩展包部分武将插图采用他的ai制图，具体被应用的武将在该角色的简介里备注。',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案合理即可。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai，以及优化张晴。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			'- 铝宝就是天使！。',
			//----------------5.5.0--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：5.5.0',
			'更新日期：2023-11-21（23:55）',
			'- 狂神is NB！',
			'- 本扩展需本体版本为1.10.2以上。',
			'- 新增三传包武将辛宪英，公主宪英，小乔，解禁大乔。',
			'- 设计了界篝酱，界张琪瑛，还有一个练手用的曹轶（曹轶会在本体更新后，下次本扩展更新时隐藏）。',
			'- 新增卡牌伏羲镇魂琴。',
			'- 优化部分代码。',
			'- 晶的水剑元交换位置部分仍旧有点bug，无法发动，还望体谅',
			'- 修复若干bug，没记日志（忘了）。',
			'- 背景音乐彻底单独分包。',
			'- 未雨绸缪，防患未然（知悉了友好邻邦的出圈打击，我删除了{夜白神略/image/character}里所有来源于网络的图。部分武将插画改变，且后面会陆续更新）',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案合理即可。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai，以及优化张晴。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			'- 铝宝就是天使！。',
			//----------------5.4.0--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：5.4.0',
			'更新日期：2023-10-31（凌晨1点）',
			'- 狂神is NB！',
			'- 本扩展需本体版本为1.10.2以上。',
			'- 添加了前缀。',
			'- 三传壕魔武将势力改为魏蜀吴，壕魔势力废弃。',
			'- 新增校花包张龙李妖，忆包朱涯海。',
			'- 新增卡牌青鳞盔。',
			'- 给没有图的卡牌配了图，并修正了部分卡牌图（加上滤镜）。',
			'- 晶的水剑元交换位置部分仍旧有点bug，无法发动，还望体谅',
			'- 修复若干bug，具体看日志。',
			'- 从谏良计，可得自保（听从了狂神的建议，之后的更新包不再附带背景音乐，背景音乐伺机单独分享）',
			'- 未雨绸缪，防患未然（知悉了友好邻邦的出圈打击，我删除了{夜白神略/image/character}里所有来源于网络的图。部分武将插画改变，且后面会陆续更新）',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案是这个扩展向外传播的最新的版本号。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai，以及优化张晴。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			'- 铝宝就是天使！。',
			//----------------5.3.2--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：5.3.2',
			'更新日期：2023-09-30（晚上8点）',
			'- 狂神is NB！',
			'- 与时俱进，适配了最新的应变写法（须本体版本为1.9.126以上）。',
			'- 与时俱进，适配了最新的属性杀写法（须本体版本为1.10.2以上）。',
			'- 添加了一组朝拾设计的武将。',
			'- 程昱，邓艾，钟会，姜维，典韦，张辽。',
			'- 魔黄盖技能变化。',
			'- 国士圣袍，圣诞麋鹿，神兽羊驼，七星刀。',
			'- 晶的水剑元交换位置部分仍旧有点bug，无法发动，还望体谅',
			'- 这次的更新我有部分忘了记了日志，所以如有遗漏还请自行发现【惭愧】。',
			'- 从谏良计，可得自保（听从了狂神的建议，之后的更新包不再附带背景音乐，背景音乐伺机单独分享）',
			'- 未雨绸缪，防患未然（知悉了友好邻邦的出圈打击，我删除了{夜白神略/image/character}里所有来源于网络的图。部分武将插画改变，且后面会陆续更新）',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案是这个扩展向外传播的最新的版本号。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai，以及优化张晴。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			'- 特别感谢铝宝为我开辟了☆夜白神略子频道，以及一直以来的帮助，指导和支持。',
			//----------------5.3.1--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：5.3.1',
			'更新日期：2023-09-21（中午12点20）',
			'- 狂神is NB！',
			'- 与时俱进，适配了最新的应变写法（须本体版本为1.9.126以上）。',
			'- 加入新武将：鹰原羽依里。',
			'- 牌堆中移除毒箭，以确保转化牌类武将的强度不至于离谱。',
			'- 晶的水剑元交换位置部分仍旧有点bug，无法发动，还望体谅',
			'- 这次的更新我都记了日志，所以这次肯定没有忘的【得意】。',
			'- 从谏良计，可得自保（听从了狂神的建议，之后的更新包不再附带背景音乐，背景音乐伺机单独分享）',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案是这个扩展向外传播的最新的版本号。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai，以及优化张晴。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------5.3.0--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：5.3.0',
			'更新日期：2023-09-19（上午10点30）',
			'- 狂神is NB！',
			'- 与时俱进，适配了最新的应变写法（须本体版本为1.9.126以上）。',
			'- 加入新武将：悦儿，六艺夜白，吴格格。',
			'- 加入新装备：白虎镜（由护心镜升级而成），之子于归，无双铠。',
			'- 修复了安以重置技不重置的bug。',
			'- 修复了三传包廖化的一处bug。',
			'- 学习了金庸包，让武将评级得以在联机显示。',
			'- 修改了本扩展所有属性，势力，颜色的ID。',
			'- 设置了在幸运星情况下，制符必然成功，星痕必然摸三。',
			'- 晶的水剑元交换位置部分仍旧有点bug，无法发动，还望体谅',
			'- 这次的更新我都记了日志，所以这次肯定没有忘的【得意】。',
			'- 如今的属性杀的写法，可以和其他扩展共存了！',
			'- 从谏良计，可得自保（听从了狂神的建议，之后的更新包不再附带背景音乐，背景音乐伺机单独分享）',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案是这个扩展向外传播的最新的版本号。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai，以及优化张晴。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------5.2.0--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：5.2.0',
			'更新日期：2023-09-07（凌晨0点43）',
			'- 狂神is NB！',
			'- 与时俱进，适配了最新的应变写法（须本体版本为1.9.126以上）。',
			'- 加入新武将：凤（暂时没图），新满城柒（削）（不然这阴间玩意能让对抗她的人睡不着觉）。',
			'- 修复了安以不论什么锦囊都读条的bug。',
			'- 修复了折枝枪不论什么时机都会带按钮的bug。',
			'- 修复小慧淑慧的ai中一处bug。',
			'- 吕艳秋本体的梅影修改，取消了需要标记的限制。',
			'- 调整了修改的曹金玉隅泣的代码。',
			'- 修复了鹿鸣千转ai的一处bug）。',
			'- 牌堆移除凤求凰。',
			'- 晶的水剑元交换位置部分仍旧有点bug，无法发动，还望体谅',
			'- 这次的更新我都记了日志，所以这次肯定没有忘的【得意】。',
			'- 如今的属性杀的写法，可以和其他扩展共存了！',
			'- 从谏良计，可得自保（听从了狂神的建议，之后的更新包不再附带背景音乐，背景音乐伺机单独分享）',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案是这个扩展向外传播的最新的版本号。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------5.1.0--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：5.1.0',
			'更新日期：2023-09-01（半夜23点45分）',
			'- 狂神is NB！',
			'- 画了若干大饼，新增武将：西王母，大禹，禺强，刑天，符，安以，小红，小慧。',
			'- 吴爽技能改版，原版置入垃圾桶。',
			'- 优化了想去远方的淬星，修复其可能出现的一些bug。',
			'- 修复了白虹剑无视防具的bug。',
			'- 将六艺篇的武将全部定义新的ID，技能没变。',
			'- 引入了钫酸酱的文本输入函数。',
			'- 24点计算的函数优化，当最终结果为无限小数时，假如误差不到0.0001，即可判定为24。',
			'- 新增重置技的概念，重置技：技能有若干选项，每项限一次，全部执行过后重置。',
			'- 对一些代码进行手动格式化，使其美观（不过你们可能看不见）。',
			'- 晶的水剑元交换位置部分仍旧有点bug，无法发动，还望体谅',
			'- 别的忘了。',
			'- 如今的属性杀的写法，可以和其他扩展共存了！',
			'- 从谏良计，可得自保（听从了狂神的建议，之后的更新包不再附带背景音乐，背景音乐伺机单独分享）',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案是这个扩展向外传播的最新的版本号。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------5.0.3--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：5.0.3',
			'更新日期：2023-08-11（半夜23点45分）',
			'- 狂神is NB！',
			'- 画了若干大饼，新增武将：盐，神孙丽松。',
			'- 画了若干大饼，新增卡牌：开仓赈粮，暗度陈仓（可能有bug，出现了烦请及时告诉我）。',
			'- 暗度陈仓没有十周年图，开仓赈粮没有原图和十周年图。',
			'- 重写张晴的栖月，但表现效果没有改变。',
			'- 晶的水剑元交换位置部分仍旧有点bug，无法发动，还望体谅',
			'- 别的忘了。',
			'- 如今的属性杀的写法，可以和其他扩展共存了！',
			'- 从谏良计，可得自保（听从了狂神的建议，之后的更新包不再附带背景音乐，背景音乐伺机单独分享）',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案是这个扩展向外传播的最新的版本号。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------5.0.2--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：5.0.2',
			'更新日期：2023-07-28（凌晨0点半）',
			'- 狂神is NB！',
			'- 画了若干大饼，新增若干武将，乐进，黄盖，廖化，关银屏。',
			'- 其它更新内容不记得了。',
			'- 晶的水剑元交换位置部分仍旧有点bug，无法发动，还望体谅',
			'- 修复新版清月的bug（可能没修好）。',
			'- 优化了求贤若渴的使用体验。',
			'- 出牌阶段计数的精神污染已消除。',
			'- 如今的属性杀的写法，这次可以和其他扩展共存了！',
			'- 新增的一部分十周年美化卡牌已经就绪，烦请手动前往十周年的文件夹，找到ybsl_dafeng，ybsl_tianhuoduan，ybsl_piaoxueruyi的webp文件并删除，然后重启两次即可正常导入素材。',
			'- 从谏良计，可得自保（听从了狂神的建议，之后的更新包不再附带背景音乐，背景音乐伺机单独分享）',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案稍微玩一下扩展包就会知道。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------5.0.1--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：5.0.1',
			'更新日期：2023-07-25（凌晨1点）',
			'- 画了若干大饼。',
			'- 优化扶汉函数，支持筛选是否为主公，具体详见教程页面。',
			'- 晶的水剑元交换位置部分仍旧有点bug，无法发动，还望体谅',
			'- 重做清月姑娘，重做羊祈絮，新增武将卞秋雯。',
			'- 目前只要进出牌阶段就会有个出牌阶段的计数，这一点我无可奈何，不过不影响对局，可以放心',
			'- 简化了新增属性杀的写法，这次可以和其他扩展共存了',
			'- 下次更新大概率会是新增一部分十周年美化卡牌',
			'- 从谏良计，可得自保（听从了狂神的建议，之后的更新包不再附带背景音乐，背景音乐伺机单独分享）',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案稍微玩一下扩展包就会知道。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------5.0.0--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：5.0.0',
			'更新日期：2023-07-09（23点）',
			'- 画了若干大饼。',
			'- 新增武将一大堆，同时整合了朝拾的三国杀传奇，暂时屏蔽了马超，等待重做',
			'- 朝拾设计的武将：马良，黄盖，sp关索，sp严白虎，周瑜，神赵云，曹植',
			'- 本人设计的武将：张郃，华雄，魔马超，魔张飞，魔夏侯惇，魔貂蝉，魔董卓，魔贾诩，魔黄盖，魔凌统，魔张角',
			'- 三传武将的简介均采用原三传武将的简介（部分武将原著没有单独设计简介）',
			'- 优化隅泣函数，在主页上新增所有夜白自制函数的引用教程。',
			'- 晶的水剑元交换位置部分有点bug，无法发动，还望体谅',
			'- 修复晶的水火剑元搞反了的问题，以及其它不记得的bug',
			'- 鉴于上次更新的4.2.2阴某些失误故障导致大家仿佛都没下到，我在这里把4.2.2的更新内容也摆出罢。',
			'- 新增武将（填坑）周怜渊，界周怜渊，刘域枫，秋儿，不过没有角色介绍',
			'- 新增卡牌（填坑）起死回生，流星火矢，铁骑兵锋，方天锁链鞭，知己知彼',
			'- 其中，起死回生，为群友霸天投稿，外加本人微调',
			'- 新增一组牌堆，200余张牌',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案稍微玩一下扩展包就会知道。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------4.2.2--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：4.2.2',
			'更新日期：2023-06-21（23点）',
			'- 画了若干大饼。',
			'- 新增武将做了个弱化的张汨，然后加强了张汨……',
			'- 新增武将（填坑）周怜渊，界周怜渊，刘域枫，秋儿，不过没有角色介绍',
			'- 新增卡牌（填坑）起死回生，流星火矢，铁骑兵锋，方天锁链鞭，知己知彼',
			'- 其中，起死回生，为群友霸天投稿，外加本人微调',
			'- 新增一组牌堆，200余张牌',
			'- 接下来若有通渠行动，大概率会采用原将标界，做个非界版本',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案稍微玩一下扩展包就会知道。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------4.2.1.9--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：4.2.1.9',
			'更新日期：2023-06-20（整点）',
			'- 画了若干大饼。',
			'- 新增武将做了个弱化的张汨，然后加强了张汨……',
			'- 新增武将（填坑）周怜渊，界周怜渊，刘域枫，秋儿',
			'- 接下来若有通渠行动，大概率会采用原将标界，做个非界版本',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案稍微玩一下扩展包就会知道。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------4.2.1.2--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：4.2.1.2',
			'更新日期：2023-06-？？',
			'- 画了若干大饼。',
			'- 新增武将做了个弱化的张汨，然后加强了张汨……',
			'- 最终决定放弃通渠强将',
			'- 代码中部分文字用ASCII和Unicode进行了转化，以避免剧透。',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，最好告知（就是想高兴高兴……）',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案稍微玩一下扩展包就会知道。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------4.2.1.1--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：4.2.1.1',
			'更新日期：2023-06-14（半夜零点）',
			'- 画了若干大饼。',
			'- 新增武将吕艳秋',
			'- 征求吕艳秋，张汨，吴爽的削弱意见',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，无需告知',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案稍微玩一下扩展包就会知道。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------4.2.1--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：4.2.1',
			'更新日期：2023-06-12（半夜一点）',
			'- 画了若干大饼。',
			'- 新增武将张汨和吴爽，简介待填',
			'- 新增若干函数，优化国战相关，现在梦势力角色选将时会直接变为忆势力（本质上是枚举）但是现在依旧只有自由国战才能玩到我的将，',
			'- 本扩展随时欢迎各路萌新及大佬点评和借鉴，引用或转录注明出处即可，无需告知',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案稍微玩一下扩展包就会知道。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------4.2.0.1--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：4.2.0.1',
			'更新日期：2023-06-07（半夜一点）',
			'- 画了若干大饼。',
			'- 新增了自动导入十周年的卡牌素材（仅部分，且素材可能陈旧）',
			'- 千幻可以显示自定义势力（仅限部分）',
			'- 内置一个按钮，可以快捷使用作者自用的牌堆',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案稍微玩一下扩展包就会知道。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------4.2.0--------------//
			'理论上可联机（需一劳永逸）',
			'当前版本：4.2.0',
			'更新日期：2023-06-05（半夜一点）',
			'- 画了若干大饼。',
			'- 新武将晶。',
			'- 优化属性杀相关，新增桃子的应变，新增杀的应变，新增火攻的应变',
			'- 别的更改的内容我不记得了……',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案稍微玩一下扩展包就会知道。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。包括自动开启武将包的设置，扩展介绍的优化，武将第五栏显示武将评级等等',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------4.1.9--------------//
			'理论上可联机',
			'当前版本：4.1.9',
			'更新日期：2023-05-23',
			'- 画了若干大饼。',
			'- 完善朱焌，新增武将彡，周瑜小乔。',
			'- 修复了魔改神户小鸟目标为神时且所有魔物均达到3则会报错的bug。',
			'- 别的更改的内容我不记得了……',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案稍微玩一下扩展包就会知道。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢周子鱼为本扩展制作的十周年美化卡牌。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//----------------4.1.8--------------//
		'理论上可联机',
			'当前版本：4.1.8',
			'更新日期：2023-05-09',
			'- 画了若干大饼。',
			'- 一名新的武将。',
			'- 新增吴六剑彩蛋。',
			'- 修复若干bug。',
			'- 别的更改的内容我不记得了……',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案稍微玩一下扩展包就会知道。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
		//----------------4.1.7--------------//
		'理论上可联机',
			'当前版本：4.1.7',
			'更新日期：2023-05-03',
			'- 画了若干大饼。',
			'- 新增部分卡牌。',
			'- 拆分版吴六剑。',
			'- 天火煅、大风，凤求凰修改贴图。',
			'- 飘雪如意更名飘雪神符并修改贴图。',
			'- 制作仓促，有bug烦请加群反馈。',
			'- 进群答案稍微玩一下扩展包就会知道。',
			'- 交流QQ群：369015096。',
			'- 感谢一直以来各位游玩者的关注与支持。',
			'- 感谢狂神逆天对本扩展的优化。',
			'- 感谢Angle为本扩展的想去远方撰写ai。',
			'- 感谢鬼神易早期为本扩展撰写的几个武将。',
			//'- <span style="text-decoration: line-through;">广告位招商</span>。',
	//----------------4.1.6--------------//
	'理论上可联机',
	'当前版本：4.1.6',
	'更新日期：2023-05-02',
	'- 画了若干大饼。',
	'- 新增部分卡牌。',
	'- 锁龙偃月刀，绿沉枪，桃之夭夭，界铜雀。',
	'- 旧版本铜雀不再被本扩展强化。',
	'- 水。',
	'- 制作仓促，有bug烦请加群反馈。',
	'- 进群答案稍微玩一下扩展包就会知道。',
	'- 交流QQ群：369015096。',
	'- 感谢一直以来各位游玩者的关注与支持。',
	'- 感谢狂神逆天对本扩展的优化。',
					'- 感谢Angle为本扩展的想去远方撰写ai。',
					'- 感谢鬼神易早期为本扩展撰写的几个武将。',
	//'- <span style="text-decoration: line-through;">广告位招商</span>。',


	//----------------4.1.5--------------//
	'理论上可联机',
	'当前版本：4.1.5',
	'更新日期：2023-04-19',
	'- 画了若干大饼。',
	'- 新增部分武将。',
	'- 林逸。',
	'- 我也忘记还有没有别的了。',
	'- 水。',
	'- 制作仓促，有bug烦请加群反馈。',
	'- 进群答案稍微玩一下扩展包就会知道。',
	'- 交流QQ群：369015096。',
	'- 感谢一直以来各位游玩者的关注与支持。',
	'- <span style="text-decoration: line-through;">广告位招商</span>。',


	//----------------4.1.3--------------//
	'理论上可联机',
	'当前版本：4.1.3',
	'更新日期：2023-04-09',
	'- 画了若干大饼。',
	'- 新增部分武将。',
	'- SP陈爱琳，蘋姉，<span style="text-decoration: line-through;">SP孙丽松</span>。',
	'- 上面划掉的有机会再整。',
	'- 为本次及上次更新的武将设置了强度等级。',
	'- 制作仓促，有bug烦请加群反馈。',
	'- 进群答案稍微玩一下扩展包就会知道。',
	'- 交流QQ群：369015096。',
	'- 感谢一直以来各位游玩者的关注与支持。',
	'- <span style="text-decoration: line-through;">广告位招商</span>。',


	//----------------4.1.1--------------//
	'理论上可联机',
	'当前版本：4.1.1',
	'更新日期：2023-03-//',
	'- 画了若干大饼。',
	'- 新增部分武将。',
	'- 清月姑娘，香紫姑娘，朱焌，羊祈絮，朱涯海，苟卡。',
	'- 画了若干大饼。',
	'- 画了若干大饼。',
	'- 制作仓促，有bug烦请加群反馈。',
	'- 进群答案稍微玩一下扩展包就会知道。',
	'- 交流QQ群：369015096。',
	'- 感谢一直以来各位游玩者的关注与支持。',
	'- <span style="text-decoration: line-through;">广告位招商</span>。',


	//----------------4.1.0--------------//
	'理论上可联机',
	'当前版本：4.1.0',
	'更新日期：2023-03-12',
	'- 画了若干大饼。',
	'- 夜白旅程增加了几个固定BOSS，分别在第5关之第30关之间的5的倍数处。',
	'- 夜白旅程增加了加点系统，初始一点，以后每过五关加一点，于回合开始时加点，敌人的总点数与玩家相同。',
	'- 优化了文件夹，方便查看和整理。',
	'- 画了若干大饼。',
	'- 制作仓促，有bug烦请加群反馈。',
	'- 进群答案稍微玩一下扩展包就会知道。',
	'- 交流QQ群：369015096。',
	'- 感谢一直以来各位游玩者的关注与支持。',
	'- <span style="text-decoration: line-through;">广告位招商</span>。',


	//----------------4.0.5--------------//
	'理论上可联机',
	'当前版本：4.0.5',
	'更新日期：2023-03-09',
	'- 加入了一名新武将：黎。',
	'- 蚕的技能调整至理想形态。',
	'- 优化部分技能流程及ai。',
	'- 空~。',
	'- 制作仓促，有bug烦请加群反馈。',
	'- 进群答案稍微玩一下扩展包就会知道。',
	'- 交流QQ群：369015096。',
	'- 感谢一直以来各位游玩者的关注与支持。',
	'- <span style="text-decoration: line-through;">广告位招商</span>。',


	//----------------4.0.4--------------//
	'理论上可联机',
	'当前版本：4.0.4',
	'更新日期：2023-03-07',
	'- 更新了三个新武将，分别是：。',
	'- 高宇航，吴雨欣，周玥。',
	'- 高无理周四人组终于集齐了。',
	'- 这四个人互相构成珠联璧合，且除高宇航外其他人都和夜白构成珠联璧合。',
	'- 制作仓促，有bug烦请加群反馈。',
	'- 进群答案稍微玩一下扩展包就会知道。',
	'- 交流QQ群：369015096。',
	'- 感谢一直以来各位游玩者的关注与支持。',
	'- <span style="text-decoration: line-through;">广告位招商</span>。',


	//----------------4.0.3--------------//
	'理论上可联机',
	'当前版本：4.0.3',
	'更新日期：2023-03-05',
	'- 将花朵从基本牌里移除。',
	'- 新开辟了一个牌的类型，称为花朵牌，暂时用于花朵牌的归类。',
	'- 一个新武将，铝。',
	'- 制作仓促，有bug烦请加群反馈。',
	'- 进群答案稍微玩一下扩展包就会知道。',
	'- 交流QQ群：369015096。',
	'- 感谢一直以来各位游玩者的关注与支持。',
	'- <span style="text-decoration: line-through;">广告位招商</span>。',

	
	//----------------4.0.2--------------//
	'理论上可联机',
	'当前版本：4.0.2',
	'更新日期：2023-02-02',
	'- 将花朵加毒的设定取消了，以后再改。',
	'- 一个新武将测试过程中bug层出不穷，导致本次更新鸽了很久。',
	'- 苏令燚投江没写成，以后找外包或者慢慢学。',
	'- 制作仓促，有bug烦请加群反馈。',
	'- 进群答案稍微玩一下扩展包就会知道。',
	'- 交流QQ群：369015096。',
	'- 从此版本开始，扩展包进入有史以来。',
*/
/*
			'白露':'bailu',
									'成就':'chengjiu',
									'重阳':'chongyang',
									'冬至':'dongzhi',
									'端午':'duanwu',
									'儿童':'ertong',
									'父亲':'fuqin',
									'国庆':'guoqing',
									'劳动':'laodong',
									'芒种':'mangzhong',
									'清明':'qingming',
									'七夕':'qixi',
									'虎年':'tiger',
									'元旦':'yuandan',
									'元宵':'yuanxiao',
									'中秋':'zhongqiu',
									'中元':'zhongyuan',
									'春节':'chunjie',
									'大雪':'daxue',
									'圣诞':'shengdan',
									'大暑':'dashu',
			*/
/*
  var levels = ['普通','精品','史诗','传说','限定','白露','成就','重阳','冬至','端午','儿童','父亲','国庆','劳动','芒种','清明','七夕','虎年','元旦','元宵','中秋','中元','春节','大雪','圣诞','大暑'];
						var map = {
							'普通':'putong',
							'精品':'jingpin',
							'史诗':'shishi',
							'传说':'chuanshuo',
							'限定':'xianding',
							'白露':'bailu',
							'成就':'chengjiu',
							'重阳':'chongyang',
							'冬至':'dongzhi',
							'端午':'duanwu',
							'儿童':'ertong',
							'父亲':'fuqin',
							'国庆':'guoqing',
							'劳动':'laodong',
							'芒种':'mangzhong',
							'清明':'qingming',
							'七夕':'qixi',
							'虎年':'tiger',
							'元旦':'yuandan',
							'元宵':'yuanxiao',
							'中秋':'zhongqiu',
							'中元':'zhongyuan',
							'春节':'chunjie',
							'大雪':'daxue',
							'圣诞':'shengdan',
							'大暑':'dashu',
					 */
					 /*
						['精品','史诗','传说','限定','白露','成就','重阳','冬至','端午','儿童','父亲','国庆','劳动','芒种','清明','七夕','虎年','元旦','元宵','中秋','中元','春节','大雪','圣诞','大暑'].contains(title)){
						var obj = {
							'精品':'jingpin',
							'史诗':'shishi',
							'传说':'chuanshuo',
							'限定':'xianding',
							'白露':'bailu',
							'成就':'chengjiu',
							'重阳':'chongyang',
							'冬至':'dongzhi',
							'端午':'duanwu',
							'儿童':'ertong',
							'父亲':'fuqin',
							'国庆':'guoqing',
							'劳动':'laodong',
							'芒种':'mangzhong',
							'清明':'qingming',
							'七夕':'qixi',
							'虎年':'tiger',
							'元旦':'yuandan',
							'元宵':'yuanxiao',
							'中秋':'zhongqiu',
							'中元':'zhongyuan',
							'春节':'chunjie',
							'大雪':'daxue',
							'圣诞':'shengdan',
							'大暑':'dashu',
						};
					 */
					 /*
						lib.qhly_groupimage['YB_memory'] = 'extension/千幻聆音/name_YB_memory.webp';
						lib.qhly_groupimage['YB_dream'] = 'extension/千幻聆音/name_YB_dream.webp';

						lib.qhly_groupcolor['YB_memory'] = "#28e3ce";
						lib.qhly_groupcolor['YB_dream'] = "#e328b7";
					 */