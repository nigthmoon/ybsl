import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { YBSL_special }
/**
 * 掌管专门为某些技能或卡牌设置的全局技能
 * 目前包含：
 * 所有吴姓角色全部加入到吴郡陆氏
 * 为加入牌堆的言笑赋予意义
 * 适配李昭仪的取消伤害记录
 * 适配戏中好气的曹金玉的出牌阶段计数
 * 国战梦改忆
 * 悦儿裁巾牌进入弃牌堆后，把原牌点数加回来，并让区域内有它的角色回血
 * 界纵丝的卡牌视为牌名
 * 适配小狐
 * 刻印牌的翻译
 * 缘分机制
 */
const YBSL_special = function () {
	//宗族：吴郡陆氏
	var clan_list = ['陆逊', '陆抗', '陆郁生', '陆绩', '陆凯', '陆机', '陆云', '陆延', '陆康'];
	{//吴郡陆氏角色添加宗族
		lib.arenaReady.push(function () {
			if (!lib.skill.tiandu.audioname2) lib.skill.tiandu.audioname2 = {};
			lib.skill.tiandu.audioname2.ybslclan_luyan = 'ybsl_lytiandu';
			// lib.skill.tiandu.audioname2.ybsl_121tujing = 'yb121_tiandu';
			if (!lib.skill.zhaxiang.audioname2) lib.skill.zhaxiang.audioname2 = {};
			lib.skill.zhaxiang.audioname2.ybsl_yinfan = 'ybsl_zhaxiang';
			// var listx=clan_list;
			for (var i in lib.character) {
				// if(lib.character[i]['names'])
				if (get.characterSurname(i).randomGet()[0] == '陆') {
					// if(!lib.character[i].clans)lib.character[i][4].push('clan:吴郡陆氏')
					lib.character[i][4].push('clan:吴郡陆氏')
				}
			}
		})
		// lib.skill._ybsl_tiandu_audio={
		// 	direct:true,
		// 	ruleSkill:true,
		// 	trigger:{
		// 		global:['phaseBefore','enterGame','gameStart','chooseButtonBefore'],
		// 	},
		// 	filter:function(event,player){
		// 		return true;
		// 	},
		// 	characterlist:function(){
		// 		return [
		// 			'luxun','re_luxun','shen_luxun','diy_luxun','diy_lukang',
		// 			'jsrg_luxun','luyusheng','ns_luyusheng','lukang','luji',
		// 			'ol_lukai','lukai','wu_luxun'
		// 		]
		// 	},
		// 	content:function(){
		// 		'step 0'
		// 		if(!lib.skill.tiandu.audioname2)lib.skill.tiandu.audioname2={};
		// 		lib.skill.tiandu.audioname2.ybslclan_luyan='ybsl_lytiandu';
		// 		if(!lib.skill.zhaxiang.audioname2)lib.skill.zhaxiang.audioname2={};
		// 		lib.skill.zhaxiang.audioname2.ybsl_yinfan='ybsl_zhaxiang';
		// 		// var listx=clan_list;
		// 		for(var i in lib.character){
		// 			// if(lib.character[i]['names'])
		// 			if(get.characterSurname(i).randomGet()[0]=='陆'){
		// 				// if(!lib.character[i].clans)lib.character[i][4].push('clan:吴郡陆氏')
		// 				lib.character[i][4].push('clan:吴郡陆氏')
		// 			}
		// 		}
		// 		// var list=lib.skill._ybsl_tiandu_audio.characterlist();
		// 		// for(var i of list){
		// 		// 	// lib.character[i].clans.push("吴郡陆氏")
		// 		// 	if(lib.character[i]){
		// 		// 		lib.character[i][4].push('clan:吴郡陆氏')
		// 		// 	}
		// 		// }

		// 		'step 1'
		// 		game.removeGlobalSkill('_ybsl_tiandu_audio');
		// 	}
		// }
	}
	{//-------令加入牌堆的言笑有用
		lib.skill._ybsl_yanxiao = {//-----------言笑
			ruleSkill: true,
			trigger: { player: 'phaseJudgeBegin' },
			forced: true,
			filter: function (event, player) {
				return player.countCards('j') > 0 && player.hasJudge('yanxiao_card');
			},
			content: function () {
				player.gain(player.getCards('j'), 'gain2');
			},
			ai: {
				effect: {
					target: function (card, player, target) {
						if (get.type(card) == 'delay' && target.hasJudge('yanxiao_card')) return [0, 0, 0, 0.1];
					}
				}
			}
		}
	}
	{//适配李昭仪的取消伤害的记录
		//----------取消伤害的记录
		lib.skill._YB_damageCancel = {
			direct: true,
			charlotte: true,
			trigger: {
				player: 'damageCancelled',
			},
			ruleSkill: true,
			content: function () {
				player.addTempSkill('YB_damageCancel2');
				player.addMark('YB_damageCancel2');
			},
		}
		lib.skill.YB_damageCancel2 = {
			direct: true,
			charlotte: true,
			onremove: true,
			ruleSkill: true,
			mark: true,
			marktext: '<span style="text-decoration: line-through;">伤</span>',
			intro: {
				name: '取消伤害记录',
				content: '本回合取消过伤害（来自夜白神略，目前仅用于配合李昭仪【燃心】）',
			}
		}
		lib.translate._YB_damageCancel = '取消伤害记录'
		lib.translate.YB_damageCancel2 = '取消伤害记录'
		//----------取消卡牌目标记录
		lib.skill._YB_excludedCancel = {
			direct: true,
			charlotte: true,
			trigger: {
				player: 'useCardToExcluded',
			},
			ruleSkill: true,
			content: function () {
				player.addTempSkill('YB_excludedCancel2');
				player.addMark('YB_excludedCancel2');
			},
		}
		lib.skill.YB_excludedCancel2 = {
			direct: true,
			charlotte: true,
			onremove: true,
			ruleSkill: true,
			mark: true,
			marktext: '<span style="text-decoration: line-through;">伤</span>',
			intro: {
				name: '取消卡牌目标记录',
				content: '本回合取消过卡牌目标（来自夜白神略，目前仅用于配合李昭仪【燃心】）',
			}
		}
		lib.translate._YB_excludedCancel = '取消卡牌目标记录'
		lib.translate.YB_excludedCancel2 = '取消卡牌目标记录'
	}
	{//适配戏中好气曹金玉的出牌阶段计数
		//----------出牌阶段计数
		lib.skill._YB_phaseNumber = {
			direct: true,
			charlotte: true,
			trigger: {
				player: 'phaseUseBegin',
			},
			ruleSkill: true,
			content: function () {
				player.addMark('_YB_phaseNumber', 1, false);
				// player.unmarkSkill('_YB_phaseNumber');
			},
			// mark:false,
			firstDo: true,
			// marktext:'出',
			// intro:{
			// 	name:'出牌阶段计数',
			// 	content:'你经历了$个出牌阶段',
			// },
		}
		lib.translate._yb_phaseNumber = '出牌阶段计数'
	}
	{//-------------国战模式选将时梦改忆
		lib.arenaReady.push(function () {
			if (lib.config.mode == "guozhan") {
				var list = [
					'ybsl_026can', 'ybsl_027rain', 'ybsl_028crystal', 'ybsl_029dawn', 'ybsl_030book',
					'ybsl_018huanqing', 'ybsl_034zhoulianyuan', 'ybnb_034zhoulianyuan', 'ybsl_035stamp',
					'ybsl_036bright', 'ybsl_037diamondqueen', 'db_ybsl_038tengwu', 'ybsl_039zhafu', 'ybsl_014ether',
					'db_ybsl_067snake', 'ybsl_069xiangzi', 'ybsl_076zhujun', 'ybsl_077yangqixu', 'ybsl_078zhuyahai',
					'ybsl_081chenli', 'ybsl_081chensi', 'ybsl_083xiaozhu', 'ybsb_047zhangmi', 'ybsl_047zhangmi', 'ybnb_047zhangmi',
					'db_ybsp_038tengwu', 'ybsp_027rain', 'ybsb_077yangqixu', 'ybsl_107tushanshuili'
				]
				for (var i of list) {
					if (lib.character[i]) {
						lib.character[i][1] = 'YB_memory';
						// lib.character[i][3].push('ybsl_rumeng');
					}
					if (lib.character['gz_' + i]) {
						lib.character['gz_' + i][1] = 'YB_memory';
						// lib.character['gz_'+i][3].push('ybsl_rumeng');
					}
				}
			}
		})
		// lib.skill._ybsl_huiyi={
		// 	ruleSkill:true,
		// 	trigger:{
		// 		global:['phaseBefore','enterGame','gameStart','chooseButtonBefore'],
		// 	},
		// 	round:1,
		// 	direct:true,
		// 	limited:true,
		// 	available:function (mode){
		// 		if(['guozhan'].includes(mode)) return true;
		// 		return false;
		// 	},
		// 	characterlist:function(){//-------梦势力将池
		// 		return [
		// 			'ybsl_026can','ybsl_027rain','ybsl_028crystal','ybsl_029dawn','ybsl_030book',
		// 			'ybsl_018huanqing','ybsl_034zhoulianyuan','ybnb_034zhoulianyuan','ybsl_035stamp',
		// 			'ybsl_036bright','ybsl_037diamondqueen','db_ybsl_038tengwu','ybsl_039zhafu','ybsl_014ether',
		// 			'db_ybsl_067snake','ybsl_069xiangzi','ybsl_076zhujun','ybsl_077yangqixu','ybsl_078zhuyahai',
		// 			'ybsl_081chenli','ybsl_081chensi','ybsl_083xiaozhu','ybsb_047zhangmi','ybsl_047zhangmi','ybnb_047zhangmi',
		// 			'db_ybsp_038tengwu','ybsp_027rain','ybsb_077yangqixu'
		// 		]
		// 	},
		// 	content:function(){
		// 		'step 0'
		// 		game.log('梦势力初始化为忆！')
		// 		var list=lib.skill._ybsl_huiyi.characterlist();
		// 		for(var i of list){
		// 			if(lib.character[i]){
		// 				lib.character[i][1]='YB_memory';
		// 				// lib.character[i][3].push('ybsl_rumeng');
		// 			}
		// 			if(lib.character['gz_'+i]){
		// 				lib.character['gz_'+i][1]='YB_memory';
		// 				// lib.character['gz_'+i][3].push('ybsl_rumeng');
		// 			}
		// 		}
		// 		'step 1'
		// 		'step 2'
		// 		game.removeGlobalSkill('_ybsl_huiyi');
		// 	}
		// };
	}
	{//此处控制裁巾牌进入弃牌堆后，把原牌点数加回来，并让区域内有它的角色回血
		lib.skill._yb054_caijin = {
			trigger: { global: ['loseEnd', 'cardsDiscardEnd'] },
			forced: true,
			charlotte: true,
			filter: function (event, player) {
				var cs = event.cards;
				for (var i = 0; i < cs.length; i++) {
					if (cs[i].storage._yb054_caijin && get.position(cs[i], true) == 'd') return true;
				}
				return false;
			},
			forceDie: true,
			content: function () {
				var list = [];
				var list2 = [];
				var cs = trigger.cards;
				for (var i = 0; i < cs.length; i++) {
					if (cs[i].storage._yb054_caijin && get.position(cs[i], true) == 'd') {
						list.push(cs[i]);
						var card1 = cs[i].storage._yb054_caijin;
						list2.push(card1);
					}
				}
				game.log(list, '已被移出游戏');
				game.log(list2, '的点数已被加了回来');
				game.cardsGotoSpecial(list);
				for (var j of list2) {
					if (j) {
						var cards = j;
						var card = get.copy(cards);
						var tag = [];
						if (get.cardtag(card, 'gifts')) var tag = ['gifts'];
						cards.init([card.suit, card.number + 1, card.name, card.nature, tag]);
						if (card.cardtag) cards.cardtag = card.cardtag;
						// j.number++;
						game.countPlayer(function (current) {// if(current.getEquip(j)) {
							if (current.getCards('e').includes(j)) {
								current.recover();
								game.log(j, '在', get.translation(current), '的装备区，因而回血');
								// break;
							}
							else if (current.getCards('j').includes(j)) {
								current.recover();
								game.log(j, '在', get.translation(current), '的判定区，因而回血');
								// break;
							}
						})
					}
				}
			},
		}
	}
	{//---------此段控制界纵丝的卡牌视为牌名
		_status.kagari_ybzongsi = {}
		_status.kagari_ybzongsi_nature = {}
		lib.skill._kagari_ybzongsi_card = {
			trigger: {
				global: ['equipAfter', 'addJudgeAfter', 'loseAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
			},
			charlotte: true,
			ruleskill: true,
			direct: true,
			firstDo: true,
			content: function () {
				var list = _status.kagari_ybzongsi;
				var evt = trigger.getl(player);
				if (list && evt && evt.hs && evt.hs.length) {
					for (var i of evt.hs) {
						for (var k in list) {
							if (i.cardid == k) {
								delete _status.kagari_ybzongsi[i.cardid];
								delete _status.kagari_ybzongsi_nature[i.cardid];
							};
						}
					}
				}
			},
			mod: {
				cardname: function (card, player) {
					var map = _status.kagari_ybzongsi;
					if (map && map[card.cardid] && get.itemtype(card) == 'card') return map[card.cardid];
				},
				cardnature: function (card, player) {
					var map = _status.kagari_ybzongsi_nature;
					if (map && map[card.cardid] && get.itemtype(card) == 'card') return map[card.cardid];
				},
			},
		}
		lib.translate['_kagari_ybzongsi_card'] = '纵丝'
	}
	{//适配小狐
		lib.skill._ybsl_107xiaohu_equip = {
			trigger: {
				global: 'equipBefore',
			},
			forced: true,
			ruleSkill: true,
			character: true,
			filter: function (event, player) {
				var cards = event.cards;
				if (cards.length != 1) return false;
				// for(var i of cards){
				// if(get.name(cards[0]).slice(-1)=='ybsl_107xiaohu')return true;
				if (get.name(cards[0]) == 'ybsl_107xiaohu0') return true;
				// }
				return false;
			},
			content: function*(event,map) {
				let trigger=map.trigger,player=map.player;
				trigger.cancel();
				event.list1 = ['武器', '防具', '防御马', '进攻马', '宝物', '双格马'];
				var result = yield player.chooseControl(event.list1).set('prompt', '请选择将小狐当做哪种装备');
				
				if (result.control) {
					var num = result.index + 1;
					var name = 'ybsl_107xiaohu' + num;
					let card = trigger.cards[0];
					card.init([card.suit, card.number, name, card.nature /*,tag*/]);
					player.equip(card);
				}
			}
		}

	}
	{//糖醋姐妹
		
	}
	{//折枝枪
		//
		lib.skill.
		_ybsl_zhezhiqiang_lose={
			trigger:{global:['loseEnd','cardsDiscardEnd']},
			forced:true,
			charlotte:true,
			filter:function(event,player){
				var cs=event.cards;
				for(var i=0;i<cs.length;i++){
					if(get.name(cs[i])=='ybsl_zhezhiqiang'&&get.position(cs[i],true)=='d') return true;
				}
				return false;
			},
			forceDie:true,
			content:function(){
				// var list=[];
				var cs=trigger.cards;
				for(var i=0;i<cs.length;i++){
			// 	card.fix();
			// 	// card.remove();
			// 	// card.destroyed=true;
					var suit=cs[i].suit,num=cs[i].number,nature=cs[i].nature;
					switch(suit){
						case 'club':var name='ybsl_meihua';break;
						case 'diamond':var name='ybsl_lanhua';break;
						case 'spade':var name='ybsl_zhuzi';break;
						case 'heart':var name='ybsl_juhua';break;
						case 'none':var name='ybsl_nohua';break;
					}
					if(get.name(cs[i])=='ybsl_zhezhiqiang'&&get.position(cs[i],true)=='d'){
						cs[i].init([suit,num,name,nature]);
						game.log('折枝枪变成了花朵。');
					}
				}
				// game.log(list,'已被移出游戏');
				// game.cardsGotoSpecial(list);
			},
		}
	}
	lib.translate.ybsl_magicbook = '刻印';
	{//缘分机智
		var packages = [
			"ybslj", "ybxh", "ybdd", "ybgod", "ybslc", "ybart", 'ybnew1', 'ybmjz',
			// 'YB_one'
		]
		lib.arenaReady.push(function () {

			get.characterLightext = function (list, player) {
				var str = '';
				for (var i = 0; i < list.length; i++) {
					if (typeof list[i][1] === 'object') {
						if (i >= 1) str += '<br>'
						if (!player) str += list[i][0];
						else if (player && list[i][1].YB_filterOk(player)) str += `<span class=thundertext>${list[i][0]}</span>`
						else str += list[i][0];
					}
				}
				if (typeof list[list.length - 1] !== 'string') list.push(str);
				else list[list.length - 1] = str;
				return list;
			}
			if (Object.keys(lib.characterLightextParent)) {
				for (let k in lib.characterLightextParent) {
					lib.characterLightext[k] = function (player) {
						var parenrText = lib.characterLightextParent[`${k}`];
						return get.characterLightext(parenrText, player);
					}
				}
			}
			for (var pack of packages) {
				for (var name in lib.characterPack[pack]) {
					if (lib.characterLightext[name]) {
						var list = lib.characterLightext[name]().slice(0, -1);
						if (list) {
							for (var i = 0; i < list.length; i++) {
								var namex = name + 'yuanfen_' + i;
								lib.skill[namex] = list[i][1];
								lib.skill[namex].yuanfenSkill = true;
								lib.skill[namex].superCharlotte = true;
								lib.translate[namex] = '缘分';
								lib.skill[namex].mainSkill = true;
								lib.character[name][3].push(namex);
							}
						}

					}
				}
			}
		})
	}
}