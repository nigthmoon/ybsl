"use strict";
import { card } from '../exts/YB_05_card/card.js'
import { skill } from '../exts/YB_05_card/skill.js'
import { translate } from '../exts/YB_05_card/translate.js'
import { list } from '../exts/YB_05_card/list.js'
game.import('card',function(lib, game, ui, get, ai, _status){
	var ybslc={
		name:'ybslc',//卡包命名
		connect:true,//卡包是否可以联机
		init:true,
		
		card:card,//卡牌
		skill:skill,
		translate:translate,//卡牌翻译
		
		list:list,//牌堆添加
		
	}
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
	for(var i in ybslc.card){
		if(!ybslc.card[i].image&&!ybslc.card[i].modeimage) ybslc.card[i].image='ext:夜白神略/image/card/'+i+'.png'
	}
	lib.config.all.cards.push('ybslc');//包名翻译
	lib.translate['ybslc_card_config']='<span style=\'color:#ff00cc\'>夜白牌堆</span>';
	return ybslc;
	
});