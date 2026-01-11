import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { YBSL_trigger }
/**
 * 掌管夜白为了某些目的创建的公共时机
 */
const YBSL_trigger = function(){
    
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
		//---------------每阶段被跳过时
		lib.skill._YB_anySkipped={
			trigger:{
				//'phaseJudgeSkipped','phaseJudgeCancelled'
				player:['phaseZhunbeiSkipped','phaseJudgeSkipped','phaseDrawSkipped','phaseUseSkipped','phaseDiscardSkipped','phaseJieshuSkipped'],
			},
			popup:false,
			forced:true,
			content:function(){
				trigger.trigger("YB_anySkipped");
			},
		};
		lib.skill._YB_anyCancelled={
			trigger:{
				//'phaseJudgeSkipped','phaseJudgeCancelled'
				player:['phaseZhunbeiCancelled','phaseJudgeCancelled','phaseDrawCancelled','phaseUseCancelled','phaseDiscardCancelled','phaseJieshuCancelled'],
			},
			popup:false,
			forced:true,
			content:function(){
				trigger.trigger("YB_anyCancelled");
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
	{//神鬼赐福
		lib.arenaReady.push(function(){
			if(lib.config.YB_guixiecifu){
				/**
				 * 必须开启神鬼赐福才能初始化
				 */
				var YB_shenguiCharacter = {
					boss_hundun: {
						sex: "male",
						group: "qun",
						hp: 25,
						skills: ["boss_xiongshou", "boss_wuzang", "boss_xiangde", "boss_yinzei", "boss_yinzei_switch"],
						groupInGuozhan: "qun",
						isBoss: true,
						isBossAllowed: true,
						extraModeData: "qun",
					},
					boss_qiongqi: {
						sex: "male",
						group: "qun",
						hp: 20,
						maxHp: 25,
						skills: ["boss_xiongshou", "boss_zhue", "boss_futai", "boss_yandu", "boss_yandu_switch"],
						groupInGuozhan: "qun",
						isBoss: true,
						isBossAllowed: true,
						extraModeData: "qun",
					},
					boss_taotie: {
						sex: "male",
						group: "qun",
						hp: 20,
						skills: ["boss_xiongshou", "boss_tanyu", "boss_cangmu", "boss_jicai", "boss_jicai_switch"],
						groupInGuozhan: "qun",
						isBoss: true,
						isBossAllowed: true,
						extraModeData: "qun",
					},
					boss_taowu: {
						sex: "male",
						group: "qun",
						hp: 25,
						skills: ["boss_xiongshou", "boss_minwan", "boss_nitai", "boss_luanchang", "boss_luanchang_switch"],
						groupInGuozhan: "qun",
						isBoss: true,
						isBossAllowed: true,
						extraModeData: "qun",
					},
					boss_zhuyin: {
						sex: "male",
						group: "qun",
						hp: 4,
						skills: ["boss_xiongshou"],
						groupInGuozhan: "qun",
						isHiddenBoss: true,
						isBossAllowed: true,
						extraModeData: "qun",
					},
					boss_xiangliu: {
						sex: "male",
						group: "qun",
						hp: 25,
						skills: ["boss_yaoshou", "boss_duqu", "boss_jiushou", "boss_echou", "boss_echou_switch"],
						groupInGuozhan: "qun",
						isBoss: true,
						isBossAllowed: true,
						extraModeData: "qun",
					},
					boss_zhuyan: {
						sex: "male",
						group: "qun",
						hp: 25,
						maxHp: 30,
						skills: ["boss_yaoshou", "boss_bingxian", "boss_juyuan", "boss_xushi", "boss_xushi_switch"],
						groupInGuozhan: "qun",
						isBoss: true,
						isBossAllowed: true,
						extraModeData: "qun",
					},
					boss_bifang: {
						sex: "male",
						group: "qun",
						hp: 25,
						skills: ["boss_yaoshou", "boss_zhaohuo", "boss_honglianx", "boss_yanyu", "boss_yanyu_switch"],
						groupInGuozhan: "qun",
						isBoss: true,
						isBossAllowed: true,
						extraModeData: "qun",
					},
					boss_yingzhao: {
						sex: "male",
						group: "qun",
						hp: 25,
						skills: ["boss_yaoshou", "boss_fengdong", "boss_xunyou", "boss_sipu", "boss_sipu_switch"],
						groupInGuozhan: "qun",
						isBoss: true,
						isBossAllowed: true,
						extraModeData: "qun",
					},
	
	
					boss_baiwuchang: {
						sex: "male",
						group: "shen",
						hp: 9,
						skills: ["boss_baolian", "boss_qiangzheng", "boss_zuijiu", "juece"],
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_heiwuchang: {
						sex: "male",
						group: "shen",
						hp: 9,
						skills: ["boss_guiji", "boss_taiping", "boss_suoming", "boss_xixing"],
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_luocha: {
						sex: "female",
						group: "shen",
						hp: 12,
						skills: ["boss_modao", "boss_yushou", "yizhong", "boss_moyany"],
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_yecha: {
						sex: "male",
						group: "shen",
						hp: 11,
						skills: ["boss_modao", "boss_mojian", "bazhen", "boss_danshu"],
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_niutou: {
						sex: "male",
						group: "shen",
						hp: 7,
						skills: ["boss_baolian", "niepan", "boss_manjia", "boss_xiaoshou"],
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_mamian: {
						sex: "male",
						group: "shen",
						hp: 6,
						skills: ["boss_guiji", "fankui", "boss_lianyu", "juece"],
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_chi: {
						sex: "male",
						group: "shen",
						hp: 5,
						skills: ["boss_guimei", "boss_didong", "boss_shanbeng"],
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_mo: {
						sex: "female",
						group: "shen",
						hp: 5,
						skills: ["boss_guimei", "enyuan", "boss_beiming"],
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_wang: {
						sex: "male",
						group: "shen",
						hp: 5,
						skills: ["boss_guimei", "boss_luolei", "huilei"],
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_liang: {
						sex: "female",
						group: "shen",
						hp: 5,
						skills: ["boss_guimei", "boss_guihuo", "boss_minbao"],
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_qinguangwang: {
						sex: "male",
						group: "qun",
						hp: 3,
						skills: ["boss_panguan", "boss_juhun", "boss_wangxiang"],
						names: "蒋|子文",
						groupInGuozhan: "shu",
						isBoss: true,
						isBossAllowed: true,
						extraModeData: "shu",
					},
					boss_chujiangwang: {
						sex: "male",
						group: "qun",
						hp: 4,
						skills: ["weimu", "refankui", "boss_bingfeng"],
						names: "厉|温",
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_songdiwang: {
						sex: "male",
						group: "qun",
						hp: 4,
						skills: ["boss_heisheng", "boss_shengfu", "enyuan"],
						names: "余|懃",
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_wuguanwang: {
						sex: "male",
						group: "qun",
						hp: 4,
						skills: ["boss_zhiwang", "boss_gongzheng", "boss_xuechi"],
						names: "吕|岱",
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_yanluowang: {
						sex: "male",
						group: "qun",
						hp: 4,
						skills: ["boss_tiemian", "boss_zhadao", "boss_zhuxin"],
						names: "包|拯",
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_bianchengwang: {
						sex: "male",
						group: "qun",
						hp: 4,
						skills: ["boss_leizhou", "boss_leifu", "boss_leizhu"],
						names: "毕|元宾",
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_taishanwang: {
						sex: "male",
						group: "qun",
						hp: 4,
						skills: ["boss_fudu", "boss_kujiu", "boss_renao"],
						names: "董|和",
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_dushiwang: {
						sex: "male",
						group: "qun",
						hp: 4,
						skills: ["boss_remen", "boss_zhifen", "boss_huoxing"],
						names: "黄|中庸",
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_pingdengwang: {
						sex: "male",
						group: "qun",
						hp: 4,
						skills: ["boss_suozu", "boss_abi", "boss_pingdeng"],
						names: "陆|游",
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_zhuanlunwang: {
						sex: "male",
						group: "qun",
						hp: 6,
						skills: ["boss_modao", "boss_lunhui", "boss_wangsheng", "boss_zlfanshi"],
						names: "薛|礼",
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_mengpo: {
						sex: "female",
						group: "qun",
						hp: 3,
						skills: ["boss_shiyou", "boss_wanghun", "boss_wangshi"],
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					boss_dizangwang: {
						sex: "male",
						group: "qun",
						hp: 8,
						skills: ["boss_bufo", "boss_wuliang", "boss_dayuan", "boss_diting"],
						groupInGuozhan: "shu",
						isHiddenBoss: true,
						isBossAllowed: true,
					},
					
				}
				for(var i in YB_shenguiCharacter){
					YB_shenguiCharacter[i].img = `image/mode/boss/character/${i}.jpg`
					lib.character[i]=YB_shenguiCharacter[i];
				}
				if(!lib.characterPack)lib.characterPack={}
				lib.characterPack.YB_boss = YB_shenguiCharacter;
				if(!lib.characterSort)lib.characterSort={}
				lib.characterSort.YB_boss = {
					boss_xiaogui:[
						'boss_zhuyin','boss_chi','boss_mo','boss_wang','boss_liang'
					],
					boss_dagui:[
						'boss_baiwuchang','boss_heiwuchang','boss_luocha','boss_yecha',
						'boss_niutou','boss_mamian','boss_mengpo'
					],
					boss_yanluo:[
						'boss_qinguangwang','boss_chujiangwang','boss_songdiwang','boss_wuguanwang',
						'boss_yanluowang','boss_bianchengwang','boss_taishanwang','boss_dushiwang',
						'boss_pingdengwang','boss_zhuanlunwang','boss_dizangwang'
					],
					boss_xiongshou:[
						'boss_hundun','boss_qiongqi','boss_taotie','boss_taowu',
						'boss_xiangliu','boss_zhuyan','boss_bifang','boss_yingzhao',
					],
				};
				lib.translate.boss_xiaogui= '小鬼'
				lib.translate.boss_dagui= '大鬼'
				lib.translate.boss_yanluo= '阎罗'
				lib.translate.boss_xiongshou= '凶兽'
				lib.translate.YB_boss= 'boss武将'
				lib.translate['YB_boss_character_config']='<span style=\'color:#e1ff00\'>boss武将</span>';
				lib.element.player.YB_shenguicifu =function(k){
					var next = game.createEvent('YB_shenguicifu', false);
					next.player=this;
					next.k=k;
					next.setContent(function(){
						'step 0'
						var listx=['boss_xiaogui','boss_dagui','boss_yanluo','boss_xiongshou'];
						var list = lib.characterSort.YB_boss[listx[event.k-1]];
						var char = list[Math.floor(Math.random()*list.length)];
						var skills = lib.character[char][3];
						skills.filter(item=>!player.skills.includes(item));
						if (skills.length) var skill = skills[Math.floor(Math.random() * skills.length)];

						function shuffleArray(array) {
							for (let i = array.length - 1; i > 0; i--) {
								const j = Math.floor(Math.random() * (i + 1)); // 随机选取 0 到 i 的索引
								[array[i], array[j]] = [array[j], array[i]]; // 交换元素
							}
							return array;
						}

						// // 示例
						// const arr = [1, 2, 3, 4, 5];
						// shuffleArray(arr);
						// console.log(arr); // 可能输出：[3, 1, 5, 2, 4]（随机顺序）

						var suit = ['spade','heart','club','diamond'];
						shuffleArray(suit);
						var list_cifu = [];
						list_cifu.push(get.translation(suit[0])+'增加一点体力上限并回复一点体力');
						list_cifu.push(get.translation(suit[1])+'变为鬼势力');
						if(skill)list_cifu.push(get.translation(suit[2])+'获得技能'+get.translation(skill));
						list_cifu.push(get.translation(suit[3])+'摸两张牌');
						event.list_cifu=list_cifu;
						event.skillx=skill;
						event.videoId = lib.status.videoId++;
						game.broadcastAll(
							function (player, id, list_cifu,char) {
								var str= get.translation(char)+"赐福"
								var str;
								if (player == game.me && !_status.auto) {
									str = get.translation(char)+"赐福：请选择一至两项";
								} else {
									str = get.translation(char)+"赐福";
								}
								var dialog = ui.create.dialog(str, [list_cifu,'tdnodes']);
								dialog.videoId = id;
							},
							player,
							event.videoId,
							list_cifu,
							char
						);
						event.time = get.utc();
						game.addVideo("delay", null, 2);
						'step 1'
						var next = player.chooseButton([1, 2], true);
						next.set("dialog", event.videoId);
						next.set("filterButton", function (button) {
							return true;
						});
						next.set("ai", function (button) {
							return (button.link==event.list_cifu[2])||(button.link==event.list_cifu[0])  
						});
						'step 2'
						game.broadcastAll("closeDialog", event.videoId);
						if (result.bool && result.links && result.links.length) {
							for(var i of result.links){
								if(i==event.list_cifu[0]){
									player.gainMaxHp();
									player.recover();
								}
								else if(i==event.list_cifu[1]){
									player.changeGroup('YB_gui');
								}
								else if(i==event.list_cifu[2]&&event.skillx){
									player.addSkill(event.skillx);
								}
								else {
									player.draw(2);
								}

							}

						}
					});
					return next;
				}
				lib.translate.identity_YB_canhun='残魂'
				lib.translate.identity_YB_canhun2='魂'
				lib.translate.identity_YB_canhun_bg='魂'
				lib.translate._YB_xieguicifu='赐福'
				lib.translate._YB_xieguicifu_info='游戏开始时，或回合开始时，你可以获得赐福。'
				lib.translate._YB_xieguicifu_info_identity='游戏开始时，或回合开始时，你可以获得赐福；当你阵亡时，你可以获得鬼神赐福，并将身份换为“残魂”复活。'
				lib.skill._YB_xieguicifu={
					name:'神鬼赐福',
					trigger:{
						global:'phaseBefore',
						player:['enterGame','phaseBegin','die'],
					},
					forceDie:true,
					filter(event,player,name){
						if(name=='phaseBefore')return game.phaseNumber == 0;
						if(name=='phaseBegin'){
							return true;
						}
						if(name=='die'){
							return get.mode()=='identity'&&!player.special_identity||player.special_identity!='identity_YB_canhun';
						}
						return true;
					},
					direct:true,
					forced:true,
					async content(event, trigger, player) {
						if(event.triggername=='die'){
							var str;
							if(trigger.source)str='你被'+get.translation(trigger.source)+'杀害';
							else str = '你死于非命'
							var result = await player.chooseBool(str+'，这时地府鬼神向你伸出了手，是否接受鬼神赐福？').set('ai',function(){
								return true;
							}).forResult();
							if(result.bool){
								game.log(player,'获得了','#y鬼神赐福')
								if (!lib.translate['commoner']) lib.translate['commoner'] = '民';
								player.identity = 'commoner'
								player.special_identity = 'identity_YB_canhun'
								await player.setIdentity('identity_YB_canhun_bg');
								if(trigger.source&&trigger.source.isIn()){
									player.storage.identity_YB_canhun=trigger.source;
									await player.addSkill('YB_xiegui_chouhen');
									player.ai.modAttitudeFrom = function (from, to) {
										var player=from;
										if(to==player.storage.identity_YB_canhun)return -20;
										return get.attitude(from, to);
									};
									player.ai.modAttitudeTo = function (from, to, att) {
										var player=to;
										if(from==player.storage.identity_YB_canhun)return -20;
										return get.attitude(from, to);
									};
								}
								await player.revive(player.maxHp);
								await player.draw(4);
								await player.YB_shenguicifu(3)
							}
						}
						else if (event.triggername=='phaseBegin'){
							game.log(player,'获得了','#y鬼神赐福')
							await player.YB_shenguicifu(1)
						}
						else {
							game.log(player,'获得了','#y鬼神赐福')
							await player.YB_shenguicifu(2)
						}
					},
				}
				lib.skill.YB_xiegui_chouhen={
					charlotte:true,
					trigger:{
						source:'damageBegin2',
					},
					filter(event,player){
						return player.storage.identity_YB_canhun&&player.storage.identity_YB_canhun==event.player;
					},
					content(){
						trigger.num++;
					},
					forced:true,
					init:function(player){
						game.checkResult=function () {
							var me = game.me._trueMe || game.me;
							if (_status.brawl && _status.brawl.checkResult) {
								_status.brawl.checkResult();
								return;
							} else if (_status.mode == "purple") {
								var winner = [];
								var loser = [];
								var ye = game.filterPlayer(
									function (current) {
										return ["rYe", "bYe"].includes(current.identity);
									},
									null,
									true
								);
								var red = game.filterPlayer(
									function (current) {
										return ["rZhu", "rZhong", "bNei"].includes(current.identity);
									},
									null,
									true
								);
								var blue = game.filterPlayer(
									function (current) {
										return ["bZhu", "bZhong", "rNei"].includes(current.identity);
									},
									null,
									true
								);
								game.countPlayer2(function (current) {
									switch (current.identity) {
										case "rZhu":
											if (ye.length == 0 && game.bZhu.isDead()) winner.push(current);
											if (current.isDead()) loser.push(current);
											break;
										case "rZhong":
										case "bNei":
											if (ye.length == 0 && game.bZhu.isDead()) winner.push(current);
											if (game.rZhu.isDead()) loser.push(current);
											break;
										case "bZhu":
											if (ye.length == 0 && game.rZhu.isDead()) winner.push(current);
											if (current.isDead()) loser.push(current);
											break;
										case "bZhong":
										case "rNei":
											if (ye.length == 0 && game.rZhu.isDead()) winner.push(current);
											if (game.bZhu.isDead()) loser.push(current);
											break;
										default:
											if (red.length + blue.length == 0) winner.push(current);
											else if (game.rZhu.isDead() && game.bZhu.isDead()) loser.push(current);
											break;
									}
								}, true);
								var winner2 = winner.slice(0);
								var loser2 = loser.slice(0);
								for (var i = 0; i < winner.length; i++) {
									if (winner[i].isDead()) winner.splice(i--, 1);
								}
								for (var i = 0; i < loser.length; i++) {
									if (loser[i].isDead()) loser.splice(i--, 1);
								}
								if (winner.length > 0 || loser.length == game.players.length) {
									game.broadcastAll(
										function (winner, loser) {
											_status.winner = winner;
											_status.loser = loser;
										},
										winner,
										loser
									);
									if (loser.length == game.players.length) {
										game.showIdentity();
										game.over("游戏平局");
									} else if (winner2.includes(me)) {
										game.showIdentity();
										if (loser2.includes(me)) game.over(false);
										else game.over(true);
									} else {
										game.showIdentity();
										game.over(false);
									}
								}
								return;
							}
							if (!game.zhu) {
								if (get.population("fan") == 0) {
									switch (me.identity) {
										case "fan":
											game.over(false);
											break;
										case "zhong":
											game.over(true);
											break;
										case "commoner":
											if(me.storage.identity_YB_canhun){
												if(me.storage.identity_YB_canhun.isAlive())game.over(false);
												else game.over(true);
											}
											game.over(true);
											break;
										default:
											game.over();
											break;
									}
								} else if (get.population("zhong") == 0) {
									switch (me.identity) {
										case "fan":
											game.over(true);
											break;
										case "zhong":
											game.over(false);
											break;
										case "commoner":
											if(me.storage.identity_YB_canhun){
												if(me.storage.identity_YB_canhun.isAlive())game.over(false);
												else game.over(true);
											}
											game.over(true);
											break;
										default:
											game.over();
											break;
									}
								}
								return;
							}
							if (game.zhu.isAlive() && get.population("fan") + get.population("nei") > 0) return;
							if (game.zhong) {
								game.zhong.identity = "zhong";
							}
							game.showIdentity();
							if (me.identity == "zhu" || me.identity == "zhong" || me.identity == "mingzhong") {
								if (game.zhu.classList.contains("dead")) {
									game.over(false);
								} else {
									game.over(true);
								}
							} else if (me.identity == "nei") {
								if (game.players.length == 1 + game.players.filter(i => i.identity == "commoner").length && me.isAlive()) {
									game.over(true);
								} else {
									game.over(false);
								}
							} else if (me.identity == "fan") {
								if ((get.population("fan") + get.population("zhong") > 0 || get.population("nei") > 1) && game.zhu.classList.contains("dead")) {
									game.over(true);
								} else {
									game.over(false);
								}
							} else if (me.identity == "commoner") {
								if(me.storage.identity_YB_canhun){
									if(me.storage.identity_YB_canhun.isAlive())game.over(false);
									else game.over(true);
								}
								game.over(true);
							}
						}
					},
				}
				lib.translate.YB_xiegui_chouhen = '复仇'
				lib.translate.YB_xiegui_chouhen_info = '锁定技，你对杀死你的角色造成的伤害+1；游戏结束时，若杀死你的凶手死亡，你获胜，否则你失败。'
				
			}
		})
	}
	{//武魂觉醒
		lib.arenaReady.push(function(){
			if(lib.config.YB_wuhunjuexing){
				function calculateSimilarity(str1, str2) {
					// 如果其中一个字符串为空，返回0
					if (str1.length === 0 || str2.length === 0) {
						return 0;
					}
				
					// 创建一个二维数组来存储中间结果
					const len1 = str1.length;
					const len2 = str2.length;
					const distance = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));
				
					// 初始化第一行和第一列
					for (let i = 0; i <= len1; i++) {
						distance[i][0] = i;
					}
					for (let j = 0; j <= len2; j++) {
						distance[0][j] = j;
					}
				
					// 填充距离矩阵
					for (let i = 1; i <= len1; i++) {
						for (let j = 1; j <= len2; j++) {
							const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
							distance[i][j] = Math.min(
								distance[i - 1][j] + 1,    // 删除操作
								distance[i][j - 1] + 1,    // 插入操作
								distance[i - 1][j - 1] + cost // 替换操作
							);
						}
					}
				
					// 计算相似度得分
					const maxLen = Math.max(len1, len2);
					const similarityScore = (maxLen - distance[len1][len2]) / maxLen;
				
					return similarityScore;
				}

				// 示例用法
				// const text1 = "hello world";
				// const text2 = "hello world!";
				// console.log(calculateSimilarity(text1, text2)); // 输出接近1的值，表示高度相似
				
				// const text3 = "hello world";
				// const text4 = "goodbye moon";
				// console.log(calculateSimilarity(text3, text4)); // 输出较低的值，表示不相似

				// 算了，这方法不用了
				
				lib.element.player.YB_addHunli = function (num) {
					const player = this;
					player.addMark('_YB_wuhunlevel', num);
				};
				lib.element.player.YB_maxHunli = function(){
					var num=20;
					var player=this;
					// if(game.checkMod(event,player,0,'YB_maxHunli',player))num=game.checkMod(event,player,0,'YB_maxHunli',player);
					// if(game.checkMod(event,player,0,'YB_maxHunliAdd',player))num+=game.checkMod(event,player,0,'YB_maxHunliAdd',player);
					return num;
				}
				lib.element.player.YB_maxHunliTrue = function(){
					var num=20;
					var player=this;
					// if(game.checkMod(event,player,0,'YB_maxHunli',player))num=game.checkMod(event,player,0,'YB_maxHunli',player);
					// if(game.checkMod(event,player,0,'YB_maxHunliAdd',player))num+=game.checkMod(event,player,0,'YB_maxHunliAdd',player);
					return num;
				}
				lib.skill._YB_wuhunlevel = {
					ruleSkill:true,
					mark:true,
					marktext:'魂',
					intro:{
						name:'经验',
						content(storage, player, skill){
							return player.countMark(skill) + '/' + player.YB_maxHunli();
						},
					}
				}
			}
		})
	}
}