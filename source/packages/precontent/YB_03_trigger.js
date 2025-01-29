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
}