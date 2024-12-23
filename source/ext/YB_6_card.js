"use strict";//此文件手动格式化太累了，有机会用电脑整整
import { card } from '../exts/YB_06_card/card.js'
import { skill } from '../exts/YB_06_card/skill.js'
import { translate } from '../exts/YB_06_card/translate.js'
import { list } from '../exts/YB_06_card/list.js'
game.import('card',function(lib, game, ui, get, ai, _status){
	var ybgod={
		name:'ybgod',//卡包命名
		connect:true,//卡包是否可以联机
		init:false,
		card:card,//卡牌
		skill:skill,//技能
		translate:translate,//卡牌翻译
		list:list,//牌堆添加		
	}
	lib.config.all.cards.push('ybgod');
	lib.translate['ybgod_card_config']='<span style=\'color:#e1ff00\'>BOSS搬运</span>';
	return ybgod;	
});