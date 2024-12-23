"use strict";
import { card } from '../exts/YB_07_card/card.js'
import { skill } from '../exts/YB_07_card/skill.js'
import { translate } from '../exts/YB_07_card/translate.js'
import { list } from '../exts/YB_07_card/list.js'
game.import('card', function(lib, game, ui, get, ai, _status) {
	var ybnew2 = {
		name: 'ybnew2', //武将包命名（必填） 
		connect: true, //该武将包是否可以联机（必填） 
		// connectBanned:['gz_ybsl_018zhangqing_feian','gz_ybslshen_002chenailin_feian','db_ybsp_038tengwu'],
		/*快捷复制：
		<span class=yellowtext>文字</span>暗亮双色
		<span class=thundertext>文字</span>
		<span class=thundertext></span>
		<font color=cyan>文字</font>自带单色
		<span style=\'color:#00c4ff\'>文字</span>自写颜色
		<br/>换行
		<li>点
		<span style="opacity:0.5;"></span>字体变淡
		<span style="font-family: yuanli">东吴命运线</span>
		<span style="text-decoration: line-through;">杀</span>字体划掉

		*/
		skill:skill , //技能（必填） ……………………！…！！！【…？。！！？？？？…………
		card: card,
		translate: translate, //翻译（必填） 
		list: list,
	};
	/*
	// if(!lib.characterPack.mode_guozhan)lib.characterPack.mode_guozhan;
	// 这是一个大饼，也是一个尝试
	*/
	if (lib.device || lib.node) {
		for (var i in ybnew2.character) {
			ybnew2.character[i][4].push('ext:夜白神略/image/character/' + i + '.jpg');
		}
	} else {
		for (var i in ybnew2.character) {
			ybnew2.character[i][4].push('db:extension-夜白神略:' + i + '.jpg');
		}
	} //由于以此法加入的武将包武将图片是用源文件的，所以要用此法改变路径 

	for (var i in ybnew2.card) {
		if (!ybnew2.card[i].image) ybnew2.card[i].image = 'ext:夜白神略/image/card/' + i + '.png'
	} //以此法批量添加卡牌贴图

	lib.config.all.cards.push('ybnew2');
	if (!lib.config.cards.includes('ybnew2')) lib.config.cards.remove('ybnew2');
	lib.translate['ybnew2_card_config'] = '<span style=\'color:#28e3ce\'>夜白新卡1</span>';

	return ybnew2;
});