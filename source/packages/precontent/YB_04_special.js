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
 * 闫爽
 * 名将神曹丕
 * 一些本体技能的audioname2
 * 符咒世界蓝条
 * 蒋子文（划掉）
 * 久岛鸥
 * 泛用的令某牌视为某牌
 * 应变
 * 批量将一些技能加入界雷击禁止名单
 */
const YBSL_special = function () {
	_status.YB_jingxieList=[
		'bagua', 'baiyin', 'lanyinjia', 'renwang', 'tengjia', 'zhuge',
		'ybsl_wangzhui', 'chitu', 'zhuque', 'wuxinghelingshan', 'yitianjian',
		'shandian', 'fulei', 'taigongyinfu', 'ybsl_tianleiyubi', 'hongshui',
		'huoshan',/*'du',*/'chiyanzhenhunqin', 'tongque', 'qinglong',
		'fangtian', 'wutiesuolian', 'huxinjing', 'goujiangdesidai'
	];
	//天火煅
	// lib.arenaReady.push(function(){
	// 	game.broadcastAll(function(){
	// 		if(!_status.YB_jingxieList)
	// 			_status.YB_jingxieList=[
	// 				'bagua', 'baiyin', 'lanyinjia', 'renwang', 'tengjia', 'zhuge',
	// 				'ybsl_wangzhui', 'chitu', 'zhuque', 'wuxinghelingshan', 'yitianjian',
	// 				'shandian', 'fulei', 'taigongyinfu', 'ybsl_tianleiyubi', 'hongshui',
	// 				'huoshan',/*'du',*/'chiyanzhenhunqin', 'tongque', 'qinglong',
	// 				'fangtian', 'wutiesuolian', 'huxinjing', 'goujiangdesidai'
	// 			];
	// 	})
	// })
	//宗族：吴郡陆氏
	game.YB_addAudio= function(...objects){
		// if(typeof objects=='')
		objects.forEach((currentObj, index) => {
			// if(!lib.skill[currentObj[0]])continue;
			if(!lib.skill[currentObj[0]].audioname2)lib.skill[currentObj[0]].audioname2={}
			for(var i in currentObj[1]){
				lib.skill[currentObj[0]].audioname2[i]=currentObj[1][i];
				if(!lib.skill[currentObj[1][i]]){
					lib.skill[currentObj[1][i]]={
						audio:currentObj[2]||2,
					}
				}
			}
		});
	}
	game.YB_addAudioName= function(...objects){
		// if(typeof objects=='')
		objects.forEach((currentObj, index) => {
			// if(!lib.skill[currentObj[0]])continue;
			// if(!lib.skill[currentObj[0]].audioname)lib.skill[currentObj[0]].audioname=[]
			// if(!lib.skill[currentObj[0]].audioname2)lib.skill[currentObj[0]].audioname2={}
			// for(var i in currentObj[1]){
			// 	lib.skill[currentObj[0]].audioname2[i]=lib.skill[currentObj[1]].audioname2[i];
			// }
			// lib.skill[currentObj[0]].audioname.push(lib.skill[currentObj[1]].audioname);
			lib.skill[currentObj[0]].audioname=lib.skill[currentObj[1]].audioname;
			lib.skill[currentObj[0]].audioname2=lib.skill[currentObj[1]].audioname2;
		});
	}

	var clan_list = ['陆逊', '陆抗', '陆郁生', '陆绩', '陆凯', '陆机', '陆云', '陆延', '陆康'];
	{//吴郡陆氏角色添加宗族
		lib.arenaReady.push(function () {
			//天妒
			if (!lib.skill.tiandu.audioname2) lib.skill.tiandu.audioname2 = {};
			lib.skill.tiandu.audioname2.ybslclan_luyan = 'ybsl_lytiandu';
			// lib.skill.tiandu.audioname2.ybsl_121tujing = 'yb121_tiandu';
			//诈降
			if (!lib.skill.zhaxiang.audioname2) lib.skill.zhaxiang.audioname2 = {};
			lib.skill.zhaxiang.audioname2.ybsl_yinfan = 'ybsl_zhaxiang';
			//倾国
			if (!lib.skill.reqingguo.audioname2) lib.skill.reqingguo.audioname2 = {};
			lib.skill.reqingguo.audioname2.ybsl_wangbi = 'ybsl_qingguo';
			lib.skill.reqingguo.audioname2.ybnb_wangbi = 'ybsl_qingguo';
			//失路
			if (!lib.skill.olshilu.audioname2) lib.skill.olshilu.audioname2 = {};
			lib.skill.olshilu.audioname2.ybsl_wangbi = 'ybsl_shilu';
			lib.skill.olshilu.audioname2.ybnb_wangbi = 'ybsl_shilu';
			// var listx=clan_list;
			// for (var i in lib.character) {
			// 	// if(lib.character[i]['names'])
			// 	if (get.characterSurname(i).randomGet()[0] == '陆') {
			// 		// if(!lib.character[i].clans)lib.character[i][4].push('clan:吴郡陆氏')
			// 		lib.character[i][4].push('clan:吴郡陆氏')
			// 	}
			// }
		})
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
				player.addMark('YB_damageCancel2',1,false);
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
				player.addMark('YB_excludedCancel2',1,false);
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
				game.broadcastAll(
					function(trigger){
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
								// var tag = [];
								// if (get.cardtag(card, 'gifts')) var tag = ['gifts'];
								var tag = get.YB_tag(card)
								cards.YB_init([card.suit, card.number + 1, card.name, card.nature, tag]);
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
					trigger,
				)
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
			content: async function(event, trigger, player) {
				trigger.cancel();
				event.list1 = ['武器', '防具', '防御马', '进攻马', '宝物', '双格马'];
				var result = await player.chooseControl(event.list1).set('prompt', '请选择将小狐当做哪种装备').forResult();
				
				if (result.control) {
					var num = result.index + 1;
					var name = 'ybsl_107xiaohu' + num;
					let card = trigger.cards[0];
					card.YB_init([card.suit, card.number, name, card.nature ,tag]);
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
					var suit=cs[i].suit,num=cs[i].number,nature=cs[i].nature,tag=get.YB_tag(cs[i]);
					switch(suit){
						case 'club':var name='ybsl_meihua';break;
						case 'diamond':var name='ybsl_lanhua';break;
						case 'spade':var name='ybsl_zhuzi';break;
						case 'heart':var name='ybsl_juhua';break;
						case 'none':var name='ybsl_nohua';break;
					}
					if(get.name(cs[i])=='ybsl_zhezhiqiang'&&get.position(cs[i],true)=='d'){
						cs[i].YB_init([suit,num,name,nature,tag]);
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
			"ybslj","ybxh","ybdd","ybgod","ybslc","ybart",'ybnew1','ybmjz','yhky','sgstrxs','ybMagic',
			'ybnew3',
			'cyyydsgs','jhjx',
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
								if (lib.character[name]) {
									lib.character[name][3].push(namex);
								}
								else {
									debugger;
								}
							}
						}

					}
				}
			}
		})
	}
	{//闫爽零食
		/**
		 * 
		 * @returns 判断目标角色是否可以吃零食的函数
		 */
		lib.element.player.YB_canEat= function(){
			var player=this;
			return player.countMark('ybsl_baoshidu')<player.YB_maxBaoshi();
		}
		/**
		 * 
		 * @returns 判断目标角色饱食度上限的函数
		 */
		lib.element.player.YB_maxBaoshi = function(){
			var num=2;
			var player=this;
			if(game.checkMod(event,player,0,'YB_maxBaoshi',player))num=game.checkMod(event,player,0,'YB_maxBaoshi',player);
			if(game.checkMod(event,player,0,'YB_maxBaoshiAdd',player))num+=game.checkMod(event,player,0,'YB_maxBaoshiAdd',player);
			return num;
		}
		/**
		 * 增加饱食度的函数，没有判断上限
		 * @param {*} num 
		 */
		// lib.element.player.YB_addBaoshidu = function(num){
		// 	this.addTempSkill('ybsl_baoshidu');
		// 	this.addMark('ybsl_baoshidu',num);
		// }
		lib.element.player.YB_addBaoshidu = function (num) {
			const player = this;
			player.addTempSkill('ybsl_baoshidu');
			player.addMark('ybsl_baoshidu', num);
			// game.broadcastAll(
			// 	function(player){
			// 		if (!player.baoshidu) {
			// 			player.baoshidu = ui.create.div('.nengliangtiao', player);
			// 			ui.create.div('.jindutiao', player.baoshidu);
			// 		}
			// 		const jindutiao = player.baoshidu.firstChild;
			// 		const v = player.countMark('ybsl_baoshidu') / player.YB_maxBaoshi();
			// 		if (player.dataset.position == 0) {
			// 			jindutiao.style.width = `${100 * v}%`;
			// 			jindutiao.style.height = `100%`;
			// 		}
			// 		else {
			// 			jindutiao.style.width = `100%`;
			// 			jindutiao.style.height = `${100 * v}%`;
			// 		}
			// 		jindutiao.innerHTML = '<span style="font-size:24px;">'+player.countMark('ybsl_baoshidu')+'</span>';
			// 	},
			// 	player
			// )
		};
		lib.translate.ybsl_baoshidu='饱腹值'
		lib.translate.ybsl_baoshidu_info='一般情况下，上限两点，回合结束清空'
		
		// lib.skill.ybsl_baoshidu={
		// 	//写在这
		// 	mark:true,
		// 	marktext:'饱',
		// 	onremove:true,
		// 	intro:{
		// 		content(storage,player,skill){
		// 			return player.countMark('ybsl_baoshidu')+'/'+player.YB_maxBaoshi();
		// 		}
		// 	}
		// }
		lib.skill.ybsl_baoshidu = {
			//写在这
			mark: true,
			marktext: '饱',
			onremove: true,
			// onremove:function(player){
			// 	game.broadcastAll(
			// 		function(player){
			// 			if (player.baoshidu) {
			// 				player.baoshidu.remove();
			// 				delete player.baoshidu;
			// 			}
			// 		},
			// 		player
			// 	)
			// 	player.clearMark('ybsl_baoshidu');
			// },
			intro: {
				content(storage, player, skill) {
					return player.countMark('ybsl_baoshidu') + '/' + player.YB_maxBaoshi();
				},
			},
			// trigger: {
			// 	player: ['phaseEnd'],
			// },
			charlotte:true,
			forced: true,
			// filter(event, player) {
			// 	return player.countMark('ybsl_baoshidu');
			// },
			// async content(event, trigger, player) {
			// 	if (player.baoshidu) {
			// 		player.baoshidu.remove();
			// 		delete player.baoshidu;
			// 	}
			// 	player.clearMark('ybsl_baoshidu');
			// },
		};
	}
	{//名神曹丕
		lib.dynamicTranslate.chuyuan = function(player){
			var str = '一名角色受到伤害后，若你武将牌上「储」的数量小于体力上限，你可以令其摸一张牌。然后其将一张手牌置于你的武将牌上，称为「储」。';
			if(player.storage.ybmjz_chuyuan==true)str+='准备阶段，若你的“储”不小于你的体力上限，你获得所有“储”，然后增加一点体力上限。'
			return str;
		}
		lib.dynamicTranslate.ybmjz_chuyuan = function(player){
			var str = '一名角色受到伤害后，若你武将牌上「储」的数量小于体力上限，你可以令其摸一张牌。然后其将一张手牌置于你的武将牌上，称为「储」。';
			if(player.storage.ybmjz_chuyuan==true)str+='准备阶段，若你的“储”不小于你的体力上限，你获得所有“储”，然后增加一点体力上限。'
			return str;
		}
		lib.arenaReady.push(function(){
			if(!lib.skill.chuyuan.group)lib.skill.chuyuan.group=[];
			lib.skill.chuyuan.group.push('ybmjz_chuyuan_wenji');
			if(!lib.skill.rejianxiong_shen_caopi)lib.skill.rejianxiong_shen_caopi={
				audio:2,
			}
			game.YB_addAudio(
				// ['new_rejianxiong',{ybmjz_shen_caopi:'rejianxiong_shen_caopi'}],
				// ['rerende',{ybmjz_shen_caopi:'rerende_shen_caopi'}],
				// ['rezhiheng',{ybmjz_shen_caopi:'rezhiheng_shen_caopi'}],
				// ['olluanji',{ybmjz_shen_caopi:'olluanji_shen_caopi'}],
				// //界戏志才
				// ['tiandu',{qmsgswkjsgj_re_xizhicai:'tiandu_xizhicai'}],
				//真马超
				['retieji',{sgskjdbzjms_zhen_machao:'shouli'}],
				//孙立新
				['jiang',{ybsl_023sunlixin:'yb023_jiang'}],
				//名郭嘉
				// ['tiandu',{ybmjz_guojia:'tiandu_re_guojia'}],
				// ['sbxingshang',{ybmjz_shen_caopi:'caopi_xinkui'}],
			)
			// game.YB_addAudioName(
			// 	['ybmjz_tiandu','tiandu']
			// )
			// if()lib.skill.new_rejianxiong.audioname2
		})
	}
	{//符咒世界
		lib.translate._yzdel_mana='蓝量'
		
		lib.skill._yzdel_mana = {
			//写在这
			mark: true,
			marktext: 'MP',
			intro: {
				content(storage, player, skill) {
					return player.countMark('_yzdel_mana') + '/' + player.YB_yzdel_maxMana();
				},
			},
			charlotte:true,
			forced: true,
		};
		lib.element.player.YB_yzdel_maxMana = function(){
			var num=15;
			var player=this;
			if(game.checkMod(event,player,0,'YB_yzdel_maxMana',player))num=game.checkMod(event,player,0,'YB_yzdel_maxMana',player);
			if(game.checkMod(event,player,0,'YB_yzdel_maxManaAdd',player))num+=game.checkMod(event,player,0,'YB_yzdel_maxManaAdd',player);
			return num;
		}
		lib.element.player.YB_yzdel_noneMana = function(){
			const player = this;
			return player.YB_yzdel_maxMana()-player.countMark('_yzdel_mana');
		}
		lib.element.player.YB_gainMana = function (num) {
			const player = this;
			if(num==0)return ;
			if(num>player.YB_yzdel_noneMana())return player.YB_gainMana(player.YB_yzdel_noneMana());
			player.addMark('_yzdel_mana', num);
			player.YB_updateMana();
		};
		lib.element.player.YB_loseMana = function (num) {
			const player = this;
			if(num==0)return ;
			if(num>player.countMark('_yzdel_mana'))return player.YB_loseMana(player.countMark('_yzdel_mana'));
			player.removeMark('_yzdel_mana', num);
			player.YB_updateMana();
		};
		/**
		 * 更新Mana条
		 */
		lib.element.player.YB_updateMana = function(){
			const player = this;
			game.broadcastAll(
				function(player){
					if (!player._yzdel_mana) {
						player._yzdel_mana = ui.create.div('.mana_nengliangtiao', player);
						ui.create.div('.mana_jindutiao', player._yzdel_mana);
					}
					const mana_jindutiao = player._yzdel_mana.firstChild;
					const v = player.countMark('_yzdel_mana') / player.YB_yzdel_maxMana();
					if (player.dataset.position == 0) {
						mana_jindutiao.style.width = `${100 * v}%`;
						mana_jindutiao.style.height = `100%`;
					}
					else {
						mana_jindutiao.style.width = `100%`;
						mana_jindutiao.style.height = `${100 * v}%`;
					}
					mana_jindutiao.innerHTML = '<span style="font-size:24px;">'+player.countMark('_yzdel_mana')+'</span>';
				},
				player
			)
		}
	}
	//久岛鸥
	{
		//久岛鸥
		get.kamome_ybyangfan = function(card){
			if(card.hasGaintag('kamome_ybyangfan_ying')) return 'kamome_ybyangfan_ying';
			if(card.hasGaintag('kamome_ybyangfan_yan')) return 'kamome_ybyangfan_yan';
			if(card.hasGaintag('kamome_ybyangfan_sun')) return 'kamome_ybyangfan_sun';
			if(card.hasGaintag('kamome_ybyangfan_que')) return 'kamome_ybyangfan_que';
			return false;
		}
		get.kamome_ybyangfan_map = function(card){
			if(card.hasGaintag('kamome_ybyangfan_ying')) return 'kamome_ybyangfan_ying';
			if(card.hasGaintag('kamome_ybyangfan_yan')) return 'kamome_ybyangfan_yan';
			if(card.hasGaintag('kamome_ybyangfan_sun')) return 'kamome_ybyangfan_sun';
			if(card.hasGaintag('kamome_ybyangfan_que')) return 'kamome_ybyangfan_que';
			return false;
		}
		lib.arenaReady.push(function(){
			game.YB_addAudio(
				// ['kamome_yangfan',{ybsl_kamome:'kamome_ybyangfan'}],
				['kamome_huanmeng',{ybsl_kamome:'kamome_huanmeng_ybsl_kamome'}],
				['kamome_jieban',{ybsl_kamome:'kamome_jieban_ybsl_kamome'}],
			)
		})
		lib.element.player.kamome_ybyangfan = function(cards){
			var next = game.createEvent('kamome_ybyangfan', false);
			next.player = this;
			next.cards = cards||this.getCards('h');
			next.setContent(async function(event,trigger,player){
				if(player.getCards('h',function(card){
					return !get.kamome_ybyangfan(card)&&event.cards.includes(card);
				}).length>0){
					var list = ['kamome_ybyangfan_ying','kamome_ybyangfan_yan','kamome_ybyangfan_sun','kamome_ybyangfan_que'];
					for(var i = 0;i<list.length;i++){
						if(player.getCards('h',function(card){
							return get.kamome_ybyangfan(card)==list[i];
						}).length<=0){
							var result = await player.chooseCardButton(player.getCards('h',function(card){
								return !get.kamome_ybyangfan(card)&&event.cards.includes(card);
							}), '选择一张手牌将之标记为'+get.translation(list[i]),1,true).set('ai',function(button){
								return get.value(button.link);
							}).forResult();
							if(result.bool){
								game.broadcastAll(
									function(card,tag){
										card.addGaintag(tag);
									},
									result.links[0],
									list[i]
								)
							}
						}
						
					}
				}
			});
		}
		// game.YB_addAudioName(
		// 	['ybmjz_tiandu','tiandu']
		// )
		// if()lib.skill.new_rejianxiong.audioname2
	}
	// {//适配蒋歆封祠
	// 	_status.ybsl_fengcix = {}
	// 	lib.skill._ybsl_fengcix = {
	// 		trigger: {
	// 			global: ['equipAfter', 'addJudgeAfter', 'loseAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
	// 		},
	// 		charlotte: true,
	// 		ruleskill: true,
	// 		direct: true,
	// 		firstDo: true,
	// 		content: function () {
	// 			var list = _status.ybsl_fengcix;
	// 			var evt = trigger.getl(player);
	// 			if (list && evt && evt.hs && evt.hs.length) {
	// 				for (var i of evt.hs) {
	// 					for (var k in list) {
	// 						if (i.cardid == k) {
	// 							delete _status.ybsl_fengcix[i.cardid];
	// 						};
	// 					}
	// 				}
	// 			}
	// 		},
	// 		mod: {
	// 			cardname: function (card, player) {
	// 				var map = _status.ybsl_fengcix;
	// 				if (map && map[card.cardid] && get.itemtype(card) == 'card') return map[card.cardid];
	// 			},
	// 		},
	// 	}
	// }
	{//泛用的令某牌视为某牌函数
		lib.element.card.YB_cardname=function(name,tag){
			if(!_status.YB_cardname){
				_status.YB_cardname={}
			}
			var card = this;
			_status.YB_cardname[card.cardid]=name;
			card.addGaintag(tag);
		}
		lib.skill._YB_cardname = {
			trigger: {
				global: ['equipAfter', 'addJudgeAfter', 'loseAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
			},
			charlotte: true,
			ruleskill: true,
			direct: true,
			firstDo: true,
			content: function () {
				var list = _status.YB_cardname;
				var evt = trigger.getl(player);
				if (list && evt && evt.hs && evt.hs.length) {
					for (var i of evt.hs) {
						for (var k in list) {
							if (i.cardid == k) {
								delete _status.YB_cardname[i.cardid];
							};
						}
					}
				}
			},
			mod: {
				cardname: function (card, player) {
					var map = _status.YB_cardname;
					if (map && map[card.cardid] && get.itemtype(card) == 'card') return map[card.cardid];
				},
			},
		}
	}
	{//应变
		lib.yingbian.effect.set('lianDa',()=>{
			// trigger.yingbian_lianDa=true;
			player.addTempSkill('_yingbian_doubleBlow','phaseUseAfter');
			trigger._yingbian_doubleBlow=player;
			game.log(card,'触发连打，额外执行一次');
			// trigger.getParent().effectCount++;
		})
		lib.yingbian.prompt.set('lianDa','连打')
		lib.yingbian.effect.set('cunZhi',()=>{
			// trigger.yingbian_lianDa=true;
			player.addTempSkill('_yingbian_doubleBlow','phaseUseAfter');
			trigger._yingbian_Cunzhi=player;
			game.log(card,'触发寸止，执行次数减一');
			// trigger.getParent().effectCount++;
		})
		lib.yingbian.prompt.set('cunZhi','寸止')
		lib.yingbian.effect.set('luLi',()=>{
			trigger._yingbian_luLi=player;
			game.log(card,'触发勠力，横置所有目标');
		})
		lib.yingbian.prompt.set('luLi','勠力')
		lib.skill._yingbian_doubleBlow={
			trigger:{player:'useCardToTargeted'},
			forced:true,
			charlotte:true,
			ruleSkill:true,
			popup:false,
			lastDo:true,
			filter:function(event,player){
				if(event.parent._yingbian_doubleBlow==player&&event.targets.length==event.parent.triggeredTargets4.length) return true;
				else if (event.parent._yingbian_Cunzhi==player&&event.targets.length==event.parent.triggeredTargets4.length) return true;
				else if (event.parent._yingbian_luLi==player&&event.targets.length==event.parent.triggeredTargets4.length) return true;
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
				'step 2'
				if(trigger.parent._yingbian_luLi==player){
					for (var i of trigger.targets){
						i.link(true)
					}
					game.log(trigger.card,'勠力生效，横置所有目标');
				}
			},
			onremove:true,
		}
		
	}
	// game.YB_addAudio(
	// 	['tiandu',{qmsgswkjsgj_re_xizhicai:'tiandu_xizhicai'}],
	// )
	{//石崇
		lib.arenaReady.push(function(){
			game.YB_addAudio(
				['jugu',{ybsl_shichong:'ybsl_jugu'}],
			)

		})
		
	}
	{//王婉儿中流
		lib.arenaReady.push(function(){
			game.YB_addAudio(
				['clanzhongliu',{ybsl_049waner:'yb049_zhongliu'}],
			)

		})

	}
	{//神赐武陆逊
		get.ZC_playerCards = function(player,num){
			let count = 1;
			if (typeof num == "number") {
				count = Math.max(
					1,
					player.countCards("h", card => get.number(card) == num)
				);
			}
			return count;
		}
	}
	//界雷击
	{
		
		lib.arenaReady.push(function(){
			lib.skill.xinleiji_misa.disableReason.push('天祈')
			lib.skill.xinleiji_misa.disableReason.push('神策')
		})
	}
	{//缝神孙策激昂
		lib.arenaReady.push(function(){
			game.YB_addAudio(
				['jiang',{qmsgswkjsgj_shen_sunce:'jiang_re_sunben'}],
				['reyingzi',{qmsgswkjsgj_shen_sunce:'reyingzi_re_sunben'}],
				['yinghun',{qmsgswkjsgj_shen_sunce:'yinghun_re_sunben'}],
			)
			// if(!lib.skill.jiang_re_sunben){
			// 	lib.skill.jiang_re_sunben={
			// 		audio:2,
			// 	}
			// }
			// if(!lib.skill.reyingzi_re_sunben){
			// 	lib.skill.reyingzi_re_sunben={
			// 		audio:2,
			// 	}
			// }
			// if(!lib.skill.yinghun_re_sunben){
			// 	lib.skill.yinghun_re_sunben={
			// 		audio:2,
			// 	}
			// }
		})

	}
	//转换卡牌
	{

		lib.skill._zhuanhuanCard_skill={
			direct:true,
			// popup:false,
			mod: {
				cardname(card, player) {
					// console.log(card)
					if(lib.card[card.name]?.zhuanhuanList){
						if(!card.storage||!card.storage.zhuanhuanList){
							card.storage.zhuanhuanList=lib.card[card.name]?.zhuanhuanList(card)
						}
						
						if(!card.storage||!card.storage.zhuanhuanNum){
							card.storage.zhuanhuanNum=0
						}
						var num = card.storage.zhuanhuanNum||0;
						if(card.storage.zhuanhuanList[num]&&card.storage.zhuanhuanList[num]!=null){
							return card.storage.zhuanhuanList[num];
						}

					}
				},
			},
			trigger: {
				global: ["loseAfter", "loseAsyncAfter",'equipAfter'],
				player:['useCardAfter','respondAfter','YB_zhuanhuanCard']
			},
			filter(event, player,name) {
				if(name == 'YB_zhuanhuanCard'){
					return event.card.name=='ybsl_hua'&&event.card.storage.zhuanhuanNum==event.card.storage.zhuanhuanList.length-1&&event.card.storage.zhuanhuanList.length<9;
				}
				else if(name=='useCardAfter'||name=='respondAfter'){
					var card = event.card;
					if(event.cards.someInD()){
						if(lib.card[card.cards[0].name]?.zhuanhuanList){
							if(!card.cards[0].storage||!card.cards[0].storage.zhuanhuanList){
								card.cards[0].storage.zhuanhuanList=lib.card[card.cards[0].name]?.zhuanhuanList(card)
							}
							if(!card.cards[0].storage||!card.cards[0].storage.zhuanhuanNum){
								card.cards[0].storage.zhuanhuanNum=0
							}
							var num = card.cards[0].storage.zhuanhuanNum||0;
							if(event.card.isCard&&card.cards[0].storage.zhuanhuanList[num]&&card.cards[0].storage.zhuanhuanList[num]!=null&&card.cards[0].storage.zhuanhuanList[num]==card.name)return true;
						}
					}
				}
				else if(name=='replaceEquipAfter'){
					// var cards = event.cards;
					console.log(event)
					var card = event.result.cards[0];
					if(lib.card[card.name]?.zhuanhuanList){
						if(!card.storage||!card.storage.zhuanhuanList){
							card.storage.zhuanhuanList=lib.card[card.name]?.zhuanhuanList(card)
						}
						if(!card.storage||!card.storage.zhuanhuanNum){
							card.storage.zhuanhuanNum=0
						}
						var num = card.storage.zhuanhuanNum||0;
						if(card.storage.zhuanhuanList[num]&&Vcard?.name&&card.storage.zhuanhuanList[num]==Vcard?.name)return true;
					}
				}
				// else if(name=='equipAfter'){
				// 	const evt = event.getl(player);
				// 	evt.es.forEach(card => {
				// 		const Vcard = evt.vcard_map.get(card);
				// 		// if (VEquip?.name === "baiyin") {
				// 		// 	lostCards.add(VEquip);
				// 		// }
				// 		console.log(card)
				// 		console.log(Vcard)
				// 		if(lib.card[card.name]?.zhuanhuanList){
				// 			if(!card.storage||!card.storage.zhuanhuanList){
				// 				card.storage.zhuanhuanList=lib.card[card.name]?.zhuanhuanList(card)
				// 			}
				// 			if(!card.storage||!card.storage.zhuanhuanNum){
				// 				card.storage.zhuanhuanNum=0
				// 			}
				// 			var num = card.storage.zhuanhuanNum||0;
				// 			if(card.storage.zhuanhuanList[num]&&Vcard?.name&&card.storage.zhuanhuanList[num]==Vcard?.name)return true;
				// 		}
				// 	});
				// }
				else {
					const evt = event.getl(player);
					evt.es.forEach(card => {
						const Vcard = evt.vcard_map.get(card);
						if(lib.card[card.name]?.zhuanhuanList){
							if(!card.storage||!card.storage.zhuanhuanList){
								card.storage.zhuanhuanList=lib.card[card.name]?.zhuanhuanList(card)
							}
							if(!card.storage||!card.storage.zhuanhuanNum){
								card.storage.zhuanhuanNum=0
							}
							if(card.storage.zhuanhuanList[card?.storage?.zhuanhuanNum]==Vcard?.name)return true;
						}
					});
					evt.js.forEach(card => {
						const Vcard = evt.vcard_map.get(card);
						if(lib.card[card.name]?.zhuanhuanList){
							if(!card.storage||!card.storage.zhuanhuanList){
								card.storage.zhuanhuanList=lib.card[card.name]?.zhuanhuanList(card)
							}
							if(!card.storage||!card.storage.zhuanhuanNum){
								card.storage.zhuanhuanNum=0
							}
							// var num = card.storage.zhuanhuanNum||0;
							if(card.storage.zhuanhuanList[card?.storage?.zhuanhuanNum]==Vcard?.name)return true;
						}
					});
				}
			},
			// cost(){
			// 	event.result = {bool:true}
			// },
			async content(event,trigger,player){
				if(event.triggername=='YB_zhuanhuanCard'){
					var result = await player.chooseBool(`是否令${get.translation(trigger.card)}增加一项“任意牌”？`).forResult();
					if(result.bool){
						game.log(player,`令<span class = "yellowtext">${get.translation(trigger.card)}</span>增加一项<span class = "yellowtext">“任意牌”</span>`);
						trigger.card.storage.zhuanhuanList.push(null);
					}
				}
				else if(event.triggername == 'useCardAfter'||event.triggername == 'respondAfter'){
					var card = trigger.card;
					if(lib.card[card.cards[0].name]?.zhuanhuanList){
						if(!card.cards[0].storage||!card.cards[0].storage.zhuanhuanList){
							card.cards[0].storage.zhuanhuanList=lib.card[card.cards[0].name]?.zhuanhuanList(card.cards[0])
						}
						if(!card.cards[0].storage||!card.cards[0].storage.zhuanhuanNum){
							card.cards[0].storage.zhuanhuanNum=0
						}
						var num = card.cards[0].storage.zhuanhuanNum||0;
						if(card.cards[0].storage.zhuanhuanList[num]&&card.cards[0].storage.zhuanhuanList[num]!=null&&card.cards[0].storage.zhuanhuanList[num]==card.name){
							await player.YB_zhuanhuanCard(card.cards[0]);
						}
					}
				}
				else if(event.triggername == 'loseAfter'||event.triggername == 'loseAsyncAfter'||event.triggername == 'equipAfter'){
					console.log(666)
					const evt = trigger.getl(player);
					evt.es.forEach(card => {
						const Vcard = evt.vcard_map.get(card);
						console.log('card',card)
						console.log('Vcard',Vcard)
						// if (VEquip?.name === "baiyin") {
						// 	lostCards.add(VEquip);
						// }
						if(lib.card[card.name]?.zhuanhuanList){
							if(!card.storage||!card.storage.zhuanhuanList){
								card.storage.zhuanhuanList=lib.card[card.name]?.zhuanhuanList(card)
							}
							if(!card.storage||!card.storage.zhuanhuanNum){
								card.storage.zhuanhuanNum=0
							}
							// var num = card.storage.zhuanhuanNum||0;
							if(card.storage.zhuanhuanList[card.storage.zhuanhuanNum]==Vcard?.name){
								player.YB_zhuanhuanCard(card);
							}
						}
					});
					evt.js.forEach(card => {
						const Vcard = evt.vcard_map.get(card);
						if(lib.card[card.name]?.zhuanhuanList){
							if(!card.storage||!card.storage.zhuanhuanList){
								card.storage.zhuanhuanList=lib.card[card.name]?.zhuanhuanList(card)
							}
							if(!card.storage||!card.storage.zhuanhuanNum){
								card.storage.zhuanhuanNum=0
							}
							var num = card.storage.zhuanhuanNum||0;
							if(card.storage.zhuanhuanList[card.storage.zhuanhuanNum]==Vcard?.name){
								player.YB_zhuanhuanCard(card);
							}
						}
					});
				}
			},
		}
		lib.skill._zhuanhuanCard_skill_1={
			enable: ["chooseToUse",'chooseToRespond'],
			filter(event,player){
				var cards = player.getCards("hs");
				for (var card of cards) {
					// console.log(card)
					// var name = get.name(card);
					if (lib.card[card.name]?.zhuanhuanList) {
						if(!card.storage||!card.storage.zhuanhuanList){
							card.storage.zhuanhuanList=lib.card[card.name]?.zhuanhuanList(card)
						}
						
						if(!card.storage||!card.storage.zhuanhuanNum){
							card.storage.zhuanhuanNum=0
						}
						var num = card.storage.zhuanhuanNum||0;
						if(card?.storage?.zhuanhuanList[num]==null){
							// for(var i of lib.inpile){
							// 	if(
							// 		event.filterCard(
							// 			{
							// 				name: i,
							// 				isCard: true,
							// 				cards: [card],
							// 			},
							// 			player,
							// 			event
							// 		) 
							// 	)return true;
							// }
							return true;
						}
						
					}
				}
				return false;
			},
			chooseButton: {
				dialog(event, player) {
					var list = [];
					for(var i of lib.inpile){
						list.push([get.translation(get.type(i)), "", i]);
					}
					return ui.create.dialog("转换卡", [list, "vcard"], "hidden");
				},
				filter(button, player) {
					var name = button.link[2];
					// var rawname = name == "wanjian" || name == "taoyuan" ? "gongshoujianbei" : "jintuiziru";
					var cards = player.getCards("hs");
					var evt = _status.event.getParent();
					for (var i of cards) {
						var name2 = get.name(i);
						var num = i.storage.zhuanhuanNum||0;
						if (
							lib.card[i.name]?.zhuanhuanList &&
							i.storage?.zhuanhuanList[num]==null&&
							evt.filterCard(
								{
									name: name,
									isCard: true,
									cards: [i],
								},
								player,
								evt
							)
						) {
							return true;
						}
					}
					return false;
				},
				check(button) {
					return _status.event.player.getUseValue({ name: button.link[2], isCard: true });
				},
				backup(links) {
					var name = links[0][2];
					// var rawname = name == "wanjian" || name == "taoyuan" ? "gongshoujianbei" : "jintuiziru";
					return {
						popname: true,
						viewAs: { name: name, isCard: true },
						ai1: () => 1,
						filterCard: function(card) {
							var name2 = get.name(card);
							
							if(!card.storage||!card.storage.zhuanhuanNum){
								card.storage.zhuanhuanNum=0
							}
							var num = card.storage.zhuanhuanNum||0;
							if (
								lib.card[name2]?.zhuanhuanList &&
								card.storage?.zhuanhuanList[num]==null
							)return true
						},
						precontent:function(){
							var card = event.result.cards[0];
							
							if(!card.storage||!card.storage.zhuanhuanNum){
								card.storage.zhuanhuanNum=0
							}
							var num = card.storage.zhuanhuanNum||0;
							if (
								lib.card[get.name(card)]?.zhuanhuanList &&
								card.storage?.zhuanhuanList[num]==null
							){
								card.storage.zhuanhuanList[num] = event.result.card.name;
								game.log(player,`令<span class = "yellowtext">${get.translation(card)}</span>的第${get.cnNumber(num+1)}项坍缩成了<span class = "yellowtext">${get.translation(event.result.card.name)}</span>`)
							}
						},
					};
				},
				prompt(links) {
					var name = links[0][2];
					return "将一张当前形态未坍缩的转化卡当做" + get.translation(name) + "使用";
				},
			},
			hiddenCard(player,name){
				var cards = player.getCards("hs");
				for (var card of cards) {
					// console.log(card)
					// var name = get.name(card);
					if (lib.card[card.name]?.zhuanhuanList) {
						if(!card.storage||!card.storage.zhuanhuanList){
							card.storage.zhuanhuanList=lib.card[card.name]?.zhuanhuanList(card)
						}
						
						if(!card.storage||!card.storage.zhuanhuanNum){
							card.storage.zhuanhuanNum=0
						}
						var num = card.storage.zhuanhuanNum||0;
						if(card?.storage?.zhuanhuanList[num]==null){
							return true;
						}
						
					}
				}
				return false;
			},
			ai:{
				order:10,
				result:{
					player:1,
				}
			}
		}
		lib.translate._zhuanhuanCard_skill_1='转换'
	}
}