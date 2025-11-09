// "use strict";
import { lib, game, ui, get, ai, _status } from '../../../../noname.js'
import { card } from '../exts/YB_06_card/card.js'
import { skill } from '../exts/YB_06_card/skill.js'
import { translate } from '../exts/YB_06_card/translate.js'
import { list } from '../exts/YB_06_card/list.js'
game.import('card',function(lib, game, ui, get, ai, _status){
	/** @type { importCardConfig } */
	var ybgod={
		name:'ybgod',//卡包命名
		connect:true,//卡包是否可以联机
		// init:false,
		card:card,//卡牌
		skill:skill,//技能
		translate:translate,//卡牌翻译
		list:list,//牌堆添加		
	}
	lib.config.all.cards.push('ybgod');
	lib.translate['ybgod_card_config']='<span style=\'color:#e1ff00\'>BOSS搬运</span>';
	return ybgod;	
});