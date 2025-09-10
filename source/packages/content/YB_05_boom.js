import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
import { config } from '../config.js'
export { YBSL_boom }
/**
 * 夜白的炸游戏器
 */
const YBSL_boom = function(){
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
	if(lib.config.extension_夜白神略_ybsl_shuxing==true){
		lib.skill._YB_fire={
			trigger:{
				player:'linkBefore',
			},
			equipSkill:false,
			ruleSkill:true,
			shaRelated:true,
			filter:function (event,player){
				var evt = event.getParent(5);
				return evt&&evt.name == "damage"&&evt.hasNature('fire')&&player.isLinked();;
			},
			forced:true,
			content:function (){
				trigger.cancel();
			},
		}
		lib.skill._YB_thunder={
			trigger:{
				player:'damageBegin4',
			},
			equipSkill:false,
			ruleSkill:true,
			shaRelated:true,
			filter:function (event,player){
				return event.hasNature('thunder')&&event.num>0&&event.player.isLinked()&&game.countPlayer(function(c){return c.isLinked()})==1&&event.lianhuanable == true;
			},
			forced:true,
			content:function (){
				trigger.num*=2;
			},
		}
	}
	//['spade','1','du',null,['yongjian']]
	if(lib.config.extension_夜白神略_ybsl_du==true){
		lib.card.du = {
			type: "basic",
			fullskin: true,
			global: ["g_du", "g_du_give"],
			// enable:true,
			enable(card, player) {
				if(get.cardtag(card,'ybsl_duzhan')){
					return true;
				}
				// else if (card)
				return false;
			},
			cardPrompt(card){
				if(get.cardtag(card,'ybsl_duzhan')){
					return '①出牌阶段，你可使用（无效果）②当此牌正面向上离开你的手牌区，或作为你的拼点牌而亮出时，你失去1点体力。'
				}
				return '①当此牌正面向上离开你的手牌区，或作为你的拼点牌而亮出时，你失去1点体力。②当你因摸牌或分发起始手牌而获得【毒】后，你可展示之并交给其他角色（不触发〖毒①〗）。'
			},
			content() {},
			ai: {
				value: -5,
				useful: 6,
				result: {
					player(player, target) {
						if (player.hasSkillTag("usedu")) {
							return 5;
						}
						return -1;
					},
				},
				order: 7.5,
			},
			
		}
		lib.skill.g_du_give={
			trigger: {
				player: "gainAfter",
				global: "phaseBefore",
			},
			cardSkill: true,
			direct: true,
			filter(event, player) {
				if (event.name == "phase") {
					if (game.phaseNumber != 0) {
						return false;
					}
					if (!player._start_cards) {
						return false;
					}
					let hs = player.getCards("h");
					for (let card of player._start_cards) {
						if (get.name(card, player) == "du" && hs.includes(card)&&(!get.cardtag(card,'ybsl_duzhan'))) {
							return true;
						}
						// if(event.card.cardtag?.legend){
						// 	if(event.card.cardtag.include('ybsl_duzhan'))return false;
						// }
					}
				} else {
					if (event.getParent().name != "draw") {
						return false;
					}
					let hs = player.getCards("h");
					for (let card of event.getg(player)) {
						if (get.name(card, player) == "du" && hs.includes(card)&&(!get.cardtag(card,'ybsl_duzhan'))) {
							return true;
						}
					}
				}
				return false;
			},
			content() {
				"step 0";
				var hs = player.getCards("h");
				if (trigger.name == "phase") {
					event.cards = player._start_cards.filter(function (card) {
						return get.name(card, player) == "du" && hs.includes(card)&&(!get.cardtag(card,'ybsl_duzhan'));
					});
				} else {
					event.cards = trigger.cards.filter(function (card) {
						return get.name(card, player) == "du" && hs.includes(card)&&(!get.cardtag(card,'ybsl_duzhan'));
					});
				}
				if (_status.connectMode) {
					game.broadcastAll(function () {
						_status.noclearcountdown = true;
					});
				}
				event.given_map = {};
				"step 1";
				player.chooseCardTarget({
					filterCard(card) {
						return _status.event.cards.includes(card);
					},
					filterTarget: lib.filter.notMe,
					selectCard: [1, cards.length],
					cards: event.cards,
					prompt: "是否发动【赠毒】？",
					prompt2: "将本次获得的【毒】交给其他角色",
					ai1(card) {
						var player = get.player();
						if (["usedu", "keepdu"].some(tag => player.hasSkillTag(tag)) || get.effect(player, { name: "losehp" }, player, player) > 0) {
							return 0;
						}
						if (!ui.selected.cards.length) {
							return 1;
						}
						return 0;
					},
					ai2(target) {
						if (["usedu", "keepdu"].some(tag => target.hasSkillTag(tag))) {
							return get.attitude(_status.event.player, target) - 0.01;
						}
						return -get.attitude(_status.event.player, target) + 0.01;
					},
				});
				"step 2";
				if (result.bool) {
					event.given = true;
					var res = result.cards,
						target = result.targets[0].playerid;
					player.addGaintag(res, "du_given");
					cards.removeArray(res);
					if (!event.given_map[target]) {
						event.given_map[target] = [];
					}
					event.given_map[target].addArray(res);
					if (cards.length) {
						event.goto(1);
					}
				} else if (!event.given) {
					if (_status.connectMode) {
						game.broadcastAll(function () {
							delete _status.noclearcountdown;
							game.stopCountChoose();
						});
					}
					event.finish();
				}
				"step 3";
				if (_status.connectMode) {
					game.broadcastAll(function () {
						delete _status.noclearcountdown;
						game.stopCountChoose();
					});
				}
				var logs = [];
				var map = [],
					cards = [];
				for (var i in event.given_map) {
					var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
					logs.push(source);
					map.push([source, event.given_map[i]]);
					cards.addArray(event.given_map[i]);
				}
				player.showCards(
					cards,
					`${get.translation(player)}对${(targets => {
						if (get.itemtype(targets) == "player") {
							targets = [targets];
						}
						if (targets[0] != player) {
							return get.translation(targets);
						}
						var selfTargets = targets.slice();
						selfTargets[0] = "自己";
						return get.translation(selfTargets);
					})(logs)}发动了【${get.skillTranslation(event.name, player)}】`
				);
				game.loseAsync({
					gain_list: map,
					player: player,
					cards: cards,
					giver: player,
					animate: "giveAuto",
				}).setContent("gaincardMultiple");
				player.logSkill("g_du_give", logs);
			},
			ai: { expose: 0.1 },
		

		}
		lib.translate.ybsl_duzhan_tag = "毒战";
	}
}