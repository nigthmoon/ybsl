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
}