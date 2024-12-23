import { lib, game, ui, get, ai, _status } from '../../../../noname.js'
import { YB_yebailvcheng } from '../.././yblc/YBLC_1.js'
import { YB_xnqbd } from '../.././yblc/YBLC_2.js'

export async function content(config, pack) {
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
	//这里用来测试无名获得晖光不能用的bug
	/*
	lib.skill.dcchushan={
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		filter: function(event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		forced: true,
		content: async function(event, trigger, player) {
			if (!_status.characterlist) lib.skill.pingjian.initList();
			_status.characterlist.randomSort();
			let characters = _status.characterlist.randomGets(6);
			characters.push("ybsl_107tushanshuili");
			const first = characters.slice(0, 3),
				last = characters.slice(3, 7);
			const skills1 = [],
				skills2 = [];
			for (let i of first) skills1.push(get.character(i, 3).randomGet());
			for (let i of last) skills2.push(get.character(i, 3).randomGet());
			const result1 = await player
				.chooseControl(skills1)
				.set("dialog", ["无名：请选择姓氏", [first, "character"]])
				.forResult();
			const gains = [];
			let surname = first[skills1.indexOf(result1.control)];
			gains.add(result1.control);
			const result2 = await player
				.chooseControl(skills2)
				.set("dialog", ["无名：请选择名字", [last, "character"]])
				.forResult();
			let name = last[skills2.indexOf(result2.control)];
			gains.add(result2.control);
			let newname = get.characterSurname(surname).randomGet()[0] + get.characterSurname(name).randomGet()[1];
			if (newname === "某") {
				newname = "无名氏";
				player.chat("终究还是落得藉藉无名...");
			}
			game.broadcastAll(
				(player, name, list) => {
					if (player.name == "dc_noname" || player.name1 == "dc_noname") player.node.name.innerHTML = name;
					if (player.name2 == "dc_noname") player.node.name2.innerHTML = name;
					player.tempname.addArray(
						list.map(name => {
							while (get.character(name).tempname.length > 0) {
								name = get.character(name).tempname[0];
							}
							return name;
						})
					);
				},
				player,
				newname,
				[surname, name]
			);
			await player.addSkills(gains);
		},
		"_priority": 0,
	}
	*/
	//-------------改变牌堆-----------搬自时空枢纽
	if(lib.config.cards.includes('ybslc')&&lib.config.cards.includes('ybgod')&&lib.config.ybsl_cardPileReplace){
		if(lib.config.ybsl_cardPileReplace=='ybslCardPile'){
			lib.arenaReady.push(function(){
				lib.init.js(lib.assetURL+'extension/夜白神略/source/pile',lib.config.ybsl_cardPileReplace,function(){
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
				lib.init.js(lib.assetURL+'extension/夜白神略/source/pile',lib.config.ybsl_cardPileReplace,function(){
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
				lib.init.js(lib.assetURL+'extension/夜白神略/source/pile',lib.config.ybsl_cardPileReplace,function(){
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
		// game.saveConfig('characters',lib.config.characters.concat('ybgz'));
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
		if (lib.config.extensions && lib.config.extensions.includes('十周年UI') && lib.config['extension_十周年UI_enable']) {
			game.getFileList('extension/十周年UI/image/decoration',(folders,files)=> {
				var decoration=['name_YB_dream.png','name_YB_memory.png'];
				decoration.forEach(function(image){ 
					if(!files.includes(image)){
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
					'ybsl_zhijizhibi.webp','YB_snowsha.webp','YB_bloodsha.webp','sha_YB_snow.webp','sha_YB_blood.webp',
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
					if(!files.includes(image)){
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
		// lib.character['db_key_hina']=['female','key',3,['hina_ybshenshi','hina_xingzhi'],['doublegroup:key:shen']]

		//-------------神户小鸟
		// lib.character['key_kotori']=['female','key',3,['kotori_ybyumo','kotori_ybhuazhan'],[]]
		
		/*
		<span style=\'color:#28e3ce\'>忆</span>
		<span style=\'color:#e328b7\'>梦</span>
		*/
		//-------------------张琪瑛改
		// lib.character.zhangqiying=["female","qun",3,["xinfu_ybfalu","xinfu_ybdianhua","xinfu_ybzhenyi"],[]],
		//-------------------篝
		// lib.character.key_kagari=["female","shen",3,["kagari_ybzongsi"],[]],

		//-------------------马均
		{
			// lib.skill.xinfu_jingxie1={
			// 	firstDo:true,
			// 	group:['xinfu_jingxie2'/*,'ybsl_tianhuoduan_skill'*/],
			// 	position:'he',
			// 	audio:'xinfu_jingxie',
			// 	enable:'phaseUse',
			// 	filter:function(event,player){
			// 		var he=player.getCards('he');
			// 		var list=lib.skill.xinfu_ybjingxie.getJingxie();
			// 		for(var i=0;i<he.length;i++){
			// 			if(list.includes(he[i].name)) return true;
			// 		}
			// 		return false;
			// 	},
			// 	filterCard:function(card,player){
			// 		var list=lib.skill.xinfu_ybjingxie.getJingxie();
			// 		return list.includes(card.name);
			// 	},
			// 	discard:false,
			// 	lose:false,
			// 	delay:false,
			// 	check:function(){
			// 		return 1;
			// 	},
			// 	content:function(){
			// 		'step 0'
			// 		player.showCards(cards);
			// 		'step 1'
			// 		var card=cards[0];
			// 		var bool=(get.position(card)=='e');
			// 		// var tag=[];
			// 		// // if(get.cardtag(card,'gifts')){tag.push('gifts');}
			// 		// for(var i of _status.cardtag){
			// 		// 	if(get.cardtag(card,i)){tag.push(i);}
			// 		// }
			// 		if(bool) player.removeEquipTrigger(card);
			// 		game.addVideo('skill',player,['xinfu_jingxie',[bool,get.cardInfo(card)]])
			// 		game.broadcastAll(function(card){
			// 			if(card.name=='wuxinghelingshan'){card.name='zhuque'}
			// 			if(card.name=='chiyanzhenhunqin'){card.name='zhuque'}
			// 			if(card.name=='shandian'&&card.suit=='spade'){card.name='fulei'}
			// 			if(card.name=='taigongyinfu'){card.name='fulei'}
			// 			if(card.name=='hongshui'){card.name='shandian'}
			// 			if(card.name=='huoshan'){card.name='shandian'}
			// 			if(card.name=='wutiesuolian'){card.name='fangtian'}
			// 			card.init([card.suit,card.number,'rewrite_'+card.name,card.nature/*,tag*/]);
			// 		},card);
			// 		if(bool){
			// 			var info=get.info(card);
			// 			if(info.skills){
			// 				for(var i=0;i<info.skills.length;i++){
			// 					player.addSkillTrigger(info.skills[i]);
			// 				}
			// 			}
			// 		}
			// 	},
			// 	ai:{
			// 		basic:{
			// 			order:10,
			// 		},
			// 		result:{
			// 			player:1,
			// 		},
			// 	},
			// }
			// lib.translate.xinfu_jingxie1_info='出牌阶段，你可以展示一张未强化过的【诸葛连弩】或标准包/军争包/SP包中的防具牌，<span class=yellowtext>赤兔，王追，闪电及其变种牌，洪水，火山，朱雀扇及其变种牌，倚天剑，毒，青龙刀，铜雀，护心镜</span>，然后对其进行强化。当你处于濒死状态时，你可以重铸一张防具牌，然后将体力回复至1点。'
		}
		
		//----------------------曹金玉
		{
			// lib.skill.yuqi={
			// 	audio:2,
			// 	trigger:{global:'damageEnd'},
			// 	init:function(player){
			// 		if(!player.storage.yuqi) player.storage.yuqi=[0,3,1,1];
			// 	},
			// 	getInfo:function(player){
			// 		if(!player.storage.yuqi) player.storage.yuqi=[0,3,1,1];
			// 		return player.storage.yuqi;
			// 	},
			// 	onremove:true,
			// 	usable:3,
			// 	filter:function(event,player){
			// 		var list=lib.skill.yuqi.getInfo(player);
			// 		return event.player.isIn()&&get.distance(player,event.player)<=list[0];
			// 	},
			// 	logTarget:'player',
			// 	content:function(){
			// 		'step 0'
			// 		event.list=lib.skill.yuqi.getInfo(player);
			// 		var cards=get.cards(event.list[1]);
			// 		event.cards=cards;
			// 		game.cardsGotoOrdering(cards);
			// 		var next=player.chooseToMove(true,'隅泣（若对话框显示不完整，可下滑操作）');
			// 		next.set('list',[
			// 			['牌堆顶的牌',cards],
			// 			['交给'+get.translation(trigger.player)+'（至少一张'+(event.list[2]>1?('，至多'+get.cnNumber(event.list[2])+'张'):'')+'）'],
			// 			['交给自己（至多'+get.cnNumber(event.list[3])+'张）'],
			// 		]);
			// 		next.set('filterMove',function(from,to,moved){
			// 			var info=lib.skill.yuqi.getInfo(_status.event.player);
			// 			if(to==1) return moved[1].length<info[2];
			// 			if(to==2) return moved[2].length<info[3];
			// 			return true;
			// 		});
			// 		next.set('processAI',function(list){
			// 			var cards=list[0][1].slice(0).sort(function(a,b){
			// 				return get.value(b,'raw')-get.value(a,'raw');
			// 			}),player=_status.event.player,target=_status.event.getTrigger().player;
			// 			var info=lib.skill.yuqi.getInfo(_status.event.player);
			// 			var cards1=cards.splice(0,Math.min(info[3],cards.length-1));
			// 			var card2;
			// 			if(get.attitude(player,target)>0) card2=cards.shift();
			// 			else card2=cards.pop();
			// 			return [cards,[card2],cards1];
			// 		});
			// 		next.set('filterOk',function(moved){
			// 			return moved[1].length>0;
			// 		});
			// 		'step 1'
			// 		if(result.bool){
			// 			var moved=result.moved;
			// 			cards.removeArray(moved[1]);
			// 			cards.removeArray(moved[2]);
			// 			while(cards.length){
			// 				ui.cardPile.insertBefore(cards.pop().fix(),ui.cardPile.firstChild);
			// 			}
			// 			// trigger.player.gain(moved[1],'gain2');
			// 			// if(moved[2].length) player.gain(moved[2],'gain2');
			// 			var list=[[trigger.player,moved[1]]];
			// 			if(moved[2].length) list.push([player,moved[2]]);
			// 			game.loseAsync({
			// 				gain_list:list,
			// 				giver:player,
			// 				animate:'gain2',
			// 			}).setContent('gaincardMultiple');
			// 		}
					
			// 	},
			// 	mark:true,
			// 	intro:{
			// 		content:function(storage,player){
			// 			var info=lib.skill.yuqi.getInfo(player);
			// 			return '<div class="text center"><span class=thundertext>蓝色：'+info[0]+'</span>　<span class=firetext>红色：'+info[1]+'</span><br><span class=greentext>绿色：'+info[2]+'</span>　<span class=yellowtext>黄色：'+info[3]+'</span></div>'
			// 		},
			// 	},
			// 	ai:{
			// 		threaten:8.8,
			// 	},
			// }
			// lib.skill.shanshen={
			// 	audio:2,
			// 	trigger:{global:'die'},
			// 	direct:true,
			// 	content:function(){
			// 		'step 0'
			// 		event.goon=!player.hasAllHistory('sourceDamage',function(evt){
			// 			return evt.player==trigger.player;
			// 		});
			// 		var list=lib.skill.yuqi.getInfo(player);
			// 		player.chooseControl('<span class=thundertext>蓝色('+list[0]+')</span>',
			// 							'<span class=firetext>红色('+list[1]+')</span>',
			// 							'<span class=greentext>绿色('+list[2]+')</span>',
			// 							'<span class=yellowtext>黄色('+list[3]+')</span>',
			// 							'cancel2').set('prompt',get.prompt('shanshen')).set('prompt2',
			// 																				'令〖隅泣〗中的一个数字+2'+(event.goon?'并回复1点体力':'')).set(
			// 			'ai',function(){
			// 			var player=_status.event.player,info=lib.skill.yuqi.getInfo(player);
			// 			if(info[0]<info[3]&&game.countPlayer(function(current){
			// 				return get.distance(player,current)<=info[0];
			// 			})<Math.min(3,game.countPlayer())) return 0;
			// 				if(info[3]<info[1]-1) return 3;
			// 				if(info[1]<10) return 1;
			// 				if(info[0]<5&&game.hasPlayer(function(current){
			// 					return current!=player&&get.distance(player,current)>info[0];
			// 				})) return 0;
			// 				return 2;
			// 			});
			// 		'step 1'
			// 		if(result.control!='cancel2'){
			// 			if(result.index==1){var k=10}
			// 			else{var k=5}
			// 			player.logSkill('shanshen',trigger.player);
			// 			var list=lib.skill.yuqi.getInfo(player);
			// 			list[result.index]=Math.min(k,list[result.index]+2);
			// 			game.log(player,'将',result.control,'数字改为','#y'+list[result.index])
			// 			player.markSkill('yuqi');
			// 			if(event.goon) player.recover();
			// 		}
			// 	},
			// }
			// lib.skill.xianjing={
			// 	audio:2,
			// 	trigger:{player:'phaseZhunbeiBegin'},
			// 	direct:true,
			// 	content:function(){
			// 		'step 0'
			// 		var list=lib.skill.yuqi.getInfo(player);
			// 		player.chooseControl('<span class=thundertext>蓝色('+list[0]+')</span>',
			// 							'<span class=firetext>红色('+list[1]+')</span>',
			// 							'<span class=greentext>绿色('+list[2]+')</span>',
			// 							'<span class=yellowtext>黄色('+list[3]+')</span>','cancel2').set(
			// 			'prompt',get.prompt('xianjing')).set('prompt2','令〖隅泣〗中的一个数字+1').set('ai',
			// 																				function(){
			// 			var player=_status.event.player,info=lib.skill.yuqi.getInfo(player);
			// 			if(info[0]<info[3]&&game.countPlayer(function(current){
			// 				return get.distance(player,current)<=info[0];
			// 			})<Math.min(3,game.countPlayer())) return 0;
			// 			if(info[3]<info[1]-1) return 3;
			// 			if(info[1]<10) return 1;
			// 			if(info[0]<5&&game.hasPlayer(function(current){
			// 				return current!=player&&get.distance(player,current)>info[0];
			// 			})) return 0;
			// 			return 2;
			// 		});
			// 		'step 1'
			// 		if(result.control!='cancel2'){
			// 			if(result.index==1){var k=10}
			// 			else{var k=5}
			// 			player.logSkill('xianjing');
			// 			var list=lib.skill.yuqi.getInfo(player);
			// 			list[result.index]=Math.min(k,list[result.index]+1);
			// 			game.log(player,'将',result.control,'数字改为','#y'+list[result.index])
			// 			player.markSkill('yuqi');
			// 			if(player.isDamaged()) event.finish();
			// 		}
			// 		else event.finish();
			// 		'step 2'
			// 		var list=lib.skill.yuqi.getInfo(player);
			// 		player.chooseControl('<span class=thundertext>蓝色('+list[0]+')</span>',
			// 							'<span class=firetext>红色('+list[1]+')</span>',
			// 							'<span class=greentext>绿色('+list[2]+')</span>',
			// 							'<span class=yellowtext>黄色('+list[3]+')</span>','cancel2').set('prompt',
			// 																							'是否令〖隅泣〗中的一个数字+1？').set('ai',
			// 																													function(){
			// 			var player=_status.event.player,info=lib.skill.yuqi.getInfo(player);
			// 			if(info[0]<info[3]&&game.countPlayer(function(current){
			// 				return get.distance(player,current)<=info[0];
			// 			})<Math.min(3,game.countPlayer())) return 0;
			// 			if(info[3]<info[1]-1) return 3;
			// 			if(info[1]<10) return 1;
			// 			if(info[0]<5&&game.hasPlayer(function(current){
			// 				return current!=player&&get.distance(player,current)>info[0];
			// 			})) return 0;
			// 			return 2;
			// 		});
			// 		'step 3'
			// 		if(result.control!='cancel2'){
			// 			if(result.index==1){var k=10}
			// 			else{var k=5}
			// 			var list=lib.skill.yuqi.getInfo(player);
			// 			list[result.index]=Math.min(k,list[result.index]+1);
			// 			game.log(player,'将',result.control,'数字改为','#y'+list[result.index])
			// 			player.markSkill('yuqi');
			// 		}
			// 	},
			// }
			// lib.translate.yuqi_info='每回合限<span class=yellowtext>三</span>次。当有角色受到伤害后，若你至其的距离不大于<span class=thundertext>0</span>，则你可以观看牌堆顶的<span class=firetext>3</span>张牌。你将其中至多<span class=greentext>1</span>张牌交给受伤角色，然后可以获得剩余牌中的至多<span class=yellowtext>1</span>张牌，并将其余牌以原顺序放回牌堆顶。<span class=yellowtext>（红色的数字至多为10，其余的数字至多为5）</span>'				
			// lib.dynamicTranslate.yuqi=function(player){
			// 	var info=lib.skill.yuqi.getInfo(player);
			// 	return '每回合限<span class=yellowtext>三</span>次。当有角色受到伤害后，若你至其的距离不大于<span class=thundertext>'+info[0]+'</span>，则你可以观看牌堆顶的<span class=firetext>'+info[1]+'</span>张牌。你将其中至多<span class=greentext>'+info[2]+'</span>张牌交给受伤角色，然后可以获得剩余牌中的至多<span class=yellowtext>'+info[3]+'</span>张牌，并将其余牌以原顺序放回牌堆顶。<span class=yellowtext>（红色的数字至多为10，其余的数字至多为5）</span>';
			// }
		}
		//----------------------神诸葛
		// lib.character['shen_zhugeliang']=['male','shen',3,['ybsl_qixing','ybsl_kuangfeng','dawu'],['shu']]
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
	// if(lib.config.extension_夜白神略_ybsl_wujinshilian=='lc'){
	// }
	
	if (lib.config.mode == "brawl") {
		if (!lib.storage.stage) lib.storage.stage = {};
		
		if(lib.config.extension_夜白神略_ybsl_wujinshilian=='lc'){
			if(YB_yebailvcheng)YB_yebailvcheng();
		}
		else if(lib.config.extension_夜白神略_ybsl_wujinshilian=='qbd'){
			if(YB_xnqbd)YB_xnqbd();
		}
		if (!lib.storage.stage["夜白旅程（二）"]) {
			lib.storage.stage["夜白旅程（二）"] = {
				name: "夜白旅程（二）",
				intro: "夜白旅程的新型演绎形式",
				scenes: [{
					"name": "第一关",
					"intro": "夜白旅程第一关",
					"players": [{
						"name": "ybsl_012zhengjiayi",
						"name2": "none",
						"identity": "fan",
						"position": 8,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第二关",
					"intro": "夜白旅程第二关",
					"players": [{
						"name": "ybsl_011gaoyuhang",
						"name2": "none",
						"identity": "fan",
						"position": 6,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_012zhengjiayi",
						"name2": "none",
						"identity": "zhong",
						"position": 3,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第三关",
					"intro": "夜白旅程第三关",
					"players": [{
						"name": "ybsl_009liyushan",
						"name2": "none",
						"identity": "fan",
						"position": 6,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_012zhengjiayi",
						"name2": "none",
						"identity": "zhong",
						"position": 3,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第四关",
					"intro": "夜白旅程第四关（近似）",
					"players": [{
						"name": "ybsl_008wuyuxin",
						"name2": "ybsl_009liyushan",
						"identity": "fan",
						"position": 6,
						"hp": 4,
						"maxHp": 4,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_012zhengjiayi",
						"name2": "none",
						"identity": "zhong",
						"position": 3,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第五关",
					"intro": "夜白旅程第五关（近似）",
					"players": [{
						"name": "ybsl_012zhengjiayi",
						"name2": "none",
						"identity": "zhong",
						"position": 3,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_010zhouyue",
						"name2": "ybsl_008wuyuxin",
						"identity": "fan",
						"position": 6,
						"hp": 4,
						"maxHp": 4,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第六关",
					"intro": "夜白旅程第六关（近似）",
					"players": [{
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_012zhengjiayi",
						"name2": "ybsl_016manchengqi",
						"identity": "fan",
						"position": 6,
						"hp": 5,
						"maxHp": 5,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第七关",
					"intro": "夜白旅程第七关（近似）",
					"players": [{
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_002chenailin",
						"name2": "ybsl_001sunlisong",
						"identity": "fan",
						"position": 6,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第八关",
					"intro": "夜白旅程第八关（近似）",
					"players": [{
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsp_002chenailin",
						"name2": "ybsl_001sunlisong",
						"identity": "fan",
						"position": 6,
						"hp": 6,
						"maxHp": 6,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第九关",
					"intro": "夜白旅程第九关（近似）",
					"players": [{
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsp_001sunlisong",
						"name2": "ybsl_001sunlisong",
						"identity": "fan",
						"position": 6,
						"hp": 6,
						"maxHp": 6,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第十关",
					"intro": "夜白旅程第十关（近似）",
					"players": [{
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_022salt",
						"name2": "ybsl_004zhangyujie",
						"identity": "fan",
						"position": 6,
						"hp": 6,
						"maxHp": 6,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_002chenailin",
						"name2": "none",
						"identity": "zhong",
						"position": 3,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}],
				mode: "free",
				level: 0,
			};
			_status.extensionstage = true;
		}
		if (!_status.extensionmade) _status.extensionmade = [];
		_status.extensionmade.push("夜白旅程（二）");
		// lib.brawl.YB_寻你千百度={
		// 	name: "寻你千百度",
		// 	mode:'identity',
		// 	intro:[
		// 		'我寻你千百度，又一岁荣枯，可你从不在灯火阑珊处',
		// 	],
		// 	// intro: "我寻你千百度，又一岁荣枯，可你从不在灯火阑珊处",
		// 	showcase:function(init){
		// 		var node=this;
		// 		var player635;
		// 		var player1;
		// 		if(init){
		// 			player635=ui.create.player(null,true).init('db_ybsp_014liutianyu');
		// 			player635.node.marks.remove();
		// 			player635.node.hp.remove();
		// 			player635.style.left='calc(40%)';
		// 			player635.style.top='calc(20%)';
		// 			player635.style.transform='scale(0.5)';
		// 			player635.node.count.remove();
		// 			this.appendChild(player635);
		// 			this.player635=player635;
		// 		}
		// 		else{
		// 			player635=this.player635;
		// 		}
		// 		if(init){
		// 			player1=ui.create.player(null,true).init('ybsl_002chenailin');
		// 			player1.node.marks.remove();
		// 			player1.node.hp.remove();
		// 			player1.style.left='calc(10%)';
		// 			player1.style.top='calc(-10%)';
		// 			player1.style.transform='scale(0.5)';
		// 			player1.node.count.remove();
		// 			this.appendChild(player1);
		// 			this.player1=player1;
		// 			ui.refresh(player1);
		// 		}
		// 		else{
		// 			player1=this.player1;
		// 		}
		// 		var func=function(){
		// 			var player2=ui.create.player(null,true).init('ybsl_022salt');
		// 			player2.node.marks.remove();
		// 			player2.node.hp.remove();
		// 			player2.style.left='auto';
		// 			player2.style.right='calc(10%)';
		// 			player2.style.top='calc(-10%)';
		// 			player2.node.count.remove();
		// 			player2.style.transform='scale(0.4)';
		// 			player2.style.opacity=0;
		// 			node.appendChild(player2);
		// 			ui.refresh(player2);
		// 			player2.style.opacity=1;
		// 			player2.style.transform='scale(0.5)';
						
		// 			setTimeout(function(){
		// 				if(!player2) return;
		// 				game.linexy([//线条
		// 					player635.getLeft()+player635.offsetWidth/2,
		// 					player635.getTop()+player635.offsetHeight/2,
		// 					player1.getLeft()+player1.offsetWidth/2,
		// 					player1.getTop()+player1.offsetHeight/2,
		// 				],node);
		// 				setTimeout(function(){
		// 					var popup1=ui.create.div('.damage');//字体
		// 					popup1.innerHTML='520';//字体的描述：
		// 					popup1.dataset.nature='wood';//-1字体的颜色：木色
		// 					player1.appendChild(popup1);//player1身上飘字popup1
		// 					ui.refresh(popup1);
		// 					popup1.classList.add('damageadded');
		// 					popup1.listenTransition(function(){
								
		// 						setTimeout(function(){
		// 							popup1.delete();
		// 						},300);//player1身上字体持续时间
		// 					});
							
		// 					setTimeout(function(){
		// 						game.linexy([
		// 							player1.getLeft()+player1.offsetWidth/2,
		// 							player1.getTop()+player1.offsetHeight/2,
		// 							player2.getLeft()+player2.offsetWidth/2,
		// 							player2.getTop()+player2.offsetHeight/2,
		// 						],node);
		// 						var popup=ui.create.div('.damage');//字体的类别:：伤害
		// 						popup.innerHTML='-999';//字体的描述：-1
		// 						popup.dataset.nature='fire';//-1字体的颜色：火
		// 						player2.appendChild(popup);//player2身上飘字popup
		// 						ui.refresh(popup);
		// 						popup.classList.add('damageadded');
		// 						popup.listenTransition(function(){
		// 							setTimeout(function(){
		// 								popup.delete();
		// 							},300);//player2身上字体持续时间
		// 						});
		// 					},900)//（两个动作之间的延迟）
		// 				},250)//陈爱琳状态执行延迟
		// 			},600);//决定从何时开始
					
		// 			setTimeout(function(){
		// 				if(!player2) return;
		// 				player2.style.transition='all 0.5s';//player2受伤动画
		// 				player2.style.transform='scale(0.7)';
		// 				player2.delete();
		// 			},2500);//盐的执行时间
		// 		};
		// 		node.showcaseinterval=setInterval(func,3500);//循环时间
		// 		func();
		// 	},
		// 	init:function(){
		// 		var pack={
		// 			character:{
		// 				ybsl_tiaoguan1:[null,null,null,[],["ext:夜白神略/image/character/ybsl_cundang1.jpg"]],
		// 				ybsl_tiaoguan2:[null,null,null,[],["ext:夜白神略/image/character/ybsl_cundang2.jpg"]],
		// 				ybsl_tiaoguan3:[null,null,null,[],["ext:夜白神略/image/character/ybsl_cundang3.jpg"]],
		// 			},
		// 			translate:{
		// 				ybsl_tiaoguan1:'起始关卡：1',
		// 				ybsl_tiaoguan2:'起始关卡：2',
		// 				ybsl_tiaoguan3:'起始关卡：3',
		// 			},
		// 			skill:{
						
		// 			},
		// 		};
		// 		for(var i in pack){
		// 			for(var j in pack[i]){
		// 				lib[i][j]=pack[i][j];
		// 			}
		// 		}
		// 		if(!_status.xunniqianbaidu) _status.xunniqianbaidu={
		// 			used:[],

		// 		}
		// 	},
		// 	content:{
		// 		submode:'normal',
		// 		chooseCharacterBefore:function(){
		// 			game.identityVideoName='寻你千百度';
		// 			// game.saveConfig('player_number',_status.yebailvcheng.player_number,'identity');
		// 			game.chooseCharacter=function(){
		// 				var next=game.createEvent('chooseCharacter',false);
		// 				next.showConfig=true;
		// 				next.setContent(function(){
		// 					'step 0'
		// 					var list = ['ybsl_tiaoguan1','ybsl_tiaoguan2','ybsl_tiaoguan3']
		// 					var dialog;
		// 					var str='选择剧情起始点';
		// 					var strt=`剧情一：
		// 							剧情二：
		// 							剧情三：暂未设计`;
		// 					dialog=ui.create.dialog(str,'hidden',strt,[list,'character']);
		// 					// if(event.swapnodialog){
		// 					// 	dialog=ui.dialog;
		// 					// 	event.swapnodialog(dialog,list);
		// 					// 	delete event.swapnodialog;
		// 					// }
		// 					// else{
		// 					// 	var str='选择角色';
		// 					// 	var strt='神夜白将在此界面常驻，方便选择<br>（若有其他想点的将可以联系作者进行加入）';
		// 					// 	//或者在上边list2方括号里自己写武将ID，将与将之间用英文逗号隔开
		// 					// 	dialog=ui.create.dialog(str,'hidden',strt,[list,'character'],[list2,'character']);
		// 					// }
		// 					dialog.setCaption('选择剧情节点（推荐从1开始玩）');
		// 					game.me.chooseButton(dialog,true);
							
		// 					'step 0'
		// 					'step 0'
		// 					ui.arena.classList.add('choose-character');
		// 					game.me.identity='zhu';
		// 					game.zhu=game.me;
		// 					game.YBLC_memory2=game.me.next;
		// 					game.YBLC_memory2.identity='fan';
		// 					game.zhu.setIdentity();
		// 					game.zhu.identityShown=true;
		// 					game.zhu.node.identity.classList.remove('guessing');
		// 					game.YBLC_memory2.setIdentity();
		// 					game.YBLC_memory2.identityShown=true;
		// 					game.YBLC_memory2.node.identity.classList.remove('guessing');

		// 					event.list=[];
		// 					for(var i in lib.character){
		// 						if(lib.filter.characterDisabled(i)) continue;
		// 						event.list.push(i);
		// 					}
		// 					event.list.randomSort();
		// 					_status.characterlist=event.list.slice(0);
		// 					var list=event.list.slice(0,5);
		// 					var list2=['ybslshen_014liutianyu'];
		// 					delete event.swapnochoose;
		// 					var dialog;
		// 					if(event.swapnodialog){
		// 						dialog=ui.dialog;
		// 						event.swapnodialog(dialog,list);
		// 						delete event.swapnodialog;
		// 					}
		// 					else{
		// 						var str='选择角色';
		// 						var strt='神夜白将在此界面常驻，方便选择<br>（若有其他想点的将可以联系作者进行加入）';
		// 						//或者在上边list2方括号里自己写武将ID，将与将之间用英文逗号隔开
		// 						dialog=ui.create.dialog(str,'hidden',strt,[list,'character'],[list2,'character']);
		// 					}
		// 					dialog.setCaption('选择角色');
		// 					game.me.chooseButton(dialog,true).set('onfree',true);
		// 					ui.create.cheat=function(){
		// 						_status.createControl=ui.cheat2;
		// 						ui.cheat=ui.create.control('更换',function(){
		// 							if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
		// 								return;
		// 							}
		// 							if(game.changeCoin){
		// 								game.changeCoin(-3);
		// 							}
		// 							event.list.randomSort();
		// 							list=event.list.slice(0,5);
		// 							var buttons=ui.create.div('.buttons');
		// 							var node=_status.event.dialog.buttons[0].parentNode;
		// 							_status.event.dialog.buttons=ui.create.buttons(list,'character',buttons);
		// 							_status.event.dialog.content.insertBefore(buttons,node);
		// 							buttons.animate('start');
		// 							node.remove();
		// 							game.uncheck();
		// 							game.check();
		// 						});
		// 						delete _status.createControl;
		// 					};
		// 					if(lib.onfree){
		// 						lib.onfree.push(function(){
		// 							event.dialogxx=ui.create.characterDialog('heightset');
		// 							if(ui.cheat2){
		// 								ui.cheat2.animate('controlpressdownx',500);
		// 								ui.cheat2.classList.remove('disabled');
		// 							}
		// 						});
		// 					}
		// 					else{
		// 						event.dialogxx=ui.create.characterDialog('heightset');
		// 					}
		// 					ui.create.cheat2=function(){
		// 						ui.cheat2=ui.create.control('自由选将',function(){
		// 							if(this.dialog==_status.event.dialog){
		// 								if(game.changeCoin){
		// 									game.changeCoin(50);
		// 								}
		// 								this.dialog.close();
		// 								_status.event.dialog=this.backup;
		// 								this.backup.open();
		// 								delete this.backup;
		// 								game.uncheck();
		// 								game.check();
		// 								if(ui.cheat){
		// 									ui.cheat.animate('controlpressdownx',500);
		// 									ui.cheat.classList.remove('disabled');
		// 								}
		// 							}
		// 							else{
		// 								if(game.changeCoin){
		// 									game.changeCoin(-10);
		// 								}
		// 								this.backup=_status.event.dialog;
		// 								_status.event.dialog.close();
		// 								_status.event.dialog=_status.event.parent.dialogxx;
		// 								this.dialog=_status.event.dialog;
		// 								this.dialog.open();
		// 								game.uncheck();
		// 								game.check();
		// 								if(ui.cheat){
		// 									ui.cheat.classList.add('disabled');
		// 								}
		// 							}
		// 						});
		// 						if(lib.onfree){
		// 							ui.cheat2.classList.add('disabled');
		// 						}
		// 					}
		// 					if(!_status.brawl||!_status.brawl.chooseCharacterFixed){
		// 						if(!ui.cheat&&get.config('change_choice'))
		// 							ui.create.cheat();
		// 						if(!ui.cheat2&&get.config('free_choose'))
		// 							ui.create.cheat2();
		// 					}
		// 					'step 1'
		// 					if(ui.cheat){
		// 						ui.cheat.close();
		// 						delete ui.cheat;
		// 					}
		// 					if(ui.cheat2){
		// 						ui.cheat2.close();
		// 						delete ui.cheat2;
		// 					}
		// 					game.addRecentCharacter(result.buttons[0].link);
		// 					game.zhu.init(result.buttons[0].link);
		// 					_status.characterlist.remove(result.buttons[0].link);
		// 					_status.yebailvcheng.used.add(result.buttons[0].link);
		// 					// game.zhu.chooseControl('一阶','二阶','三阶','四阶','五阶').set('prompt','请选择武将等阶');
		// 					'step 2'
		// 					// var hp=Math.floor(result.index/2);
		// 					// event.draw=Math.floor((result.index+1)/2);
		// 					// if(hp){
		// 					// 	game.zhu.hp+=hp;
		// 					// 	game.zhu.maxHp+=hp;
		// 					// 	game.zhu.update();
		// 					// }
		// 					// game.zhu.addMark('_YBLC_level');
		// 					// var list666=_status.characterlist.randomGets(lib.config.extension_夜白神略_ybsl_wujianghouxuan);
		// 					var list666=[];
		// 					// list666.push('ybsl_059starsFall3');
		// 					list666.push('ybsl_012zhengjiayi');
		// 					game.zhu.chooseButton(['请选择对手的登场武将',[list666,'character']],true);
		// 					'step 3'
		// 					var character01='ybsl_012zhengjiayi';
		// 					game.YBLC_memory2.init('ybsl_012zhengjiayi');
		// 					// game.fan.addMark('_YBLC_level');
		// 					_status.characterlist.remove('ybsl_012zhengjiayi');
		// 					_status.yebailvcheng.used.add('ybsl_012zhengjiayi');
		// 					if(event.draw){
		// 						game.zhu.directgain(get.cards(event.draw));
		// 					}
		// 					setTimeout(function(){
		// 						ui.arena.classList.remove('choose-character');
		// 					},500);
		// 					_status.yebailvcheng.completeYbsl.push([
		// 						'在下一关中召唤'+get.translation(result.links[0])+'一同战斗',
		// 						function(){_status.yebailvcheng.addFellow(result.links[0]);
		// 					}])
		// 					delete pack.skill;
		// 					game.addVideo('arrangeLib',null,pack);
		// 					game.addOverDialog=function(dialog){
		// 						dialog.addText('共计通过'+_status.yebailvcheng.completeNumber+'关');
		// 					};
		// 					lib.element.player.dieAfter=function(){
		// 						if(this==game.fellow) return;
		// 						_status.characterlist.removeArray(_status.yebailvcheng.used);
		// 						if(game.zhu==this||!_status.characterlist.length){
		// 							var bool=false;
		// 							if(_status.yebailvcheng.completeNumber>5) bool=true;
		// 							game.over(bool);
		// 						}
		// 						else{
		// 							var next=game.createEvent('yebailvcheng_replace',false);
		// 							next.setContent(_status.yebailvcheng.replace_character);
		// 						}
		// 					};
		// 					lib.element.player.dieAfter2=function(){
		// 						_status.characterlist.removeArray(_status.yebailvcheng.used);
		// 					};
		// 					game.zhu.dieAfter=lib.element.player.dieAfter;
		// 					game.fan.dieAfter=lib.element.player.dieAfter;
		// 					game.zhu.dieAfter2=lib.element.player.dieAfter2;
		// 					game.fan.dieAfter2=lib.element.player.dieAfter2;
		// 				});
		// 			};
		// 		}
		// 	}

		// }
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
	
}