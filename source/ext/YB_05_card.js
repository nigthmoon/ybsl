// "use strict";
import { lib, game, ui, get, ai, _status } from '../../../../noname.js'
import { card } from '../exts/YB_05_card/card.js'
import { skill } from '../exts/YB_05_card/skill.js'
import { translate } from '../exts/YB_05_card/translate.js'
import { list } from '../exts/YB_05_card/list.js'
game.import('card',function(lib, game, ui, get, ai, _status){
	/** @type { importCardConfig } */
	var ybslc={
		name:'ybslc',//卡包命名
		connect:true,//卡包是否可以联机
		// init:true,
		
		card:card,//卡牌
		skill:skill,
		translate:translate,//卡牌翻译
		
		list:list,//牌堆添加
		
	}
	for(var i in ybslc.card){
		if(!ybslc.card[i].image&&!ybslc.card[i].modeimage) ybslc.card[i].image='ext:夜白神略/image/card/'+i+'.png'
	}
	lib.config.all.cards.push('ybslc');//包名翻译
	lib.translate['ybslc_card_config']='<span style=\'color:#ff00cc\'>夜白牌堆</span>';
	return ybslc;
	
});