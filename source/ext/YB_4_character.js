"use strict";
import { characterSort } from '../exts/YB_04_character/characterSort.js'
import { character } from '../exts/YB_04_character/character.js'
import { characterIntro } from '../exts/YB_04_character/characterIntro.js'
import { perfectPair } from '../exts/YB_04_character/perfectPair.js'
import { characterTitle } from '../exts/YB_04_character/characterTitle.js'
import { skill } from '../exts/YB_04_character/skill.js'
import { card } from '../exts/YB_04_character/card.js'
import { translate } from '../exts/YB_04_character/translate.js'
import { dynamicTranslate } from '../exts/YB_04_character/dynamicTranslate.js'
game.import('character', function(lib, game, ui, get, ai, _status) {
	var ybnew1 = {
		name: 'ybnew1', //武将包命名（必填） 
		connect: true, //该武将包是否可以联机（必填） 
		connectBanned:[],
		characterSort:characterSort,
		character:character , //武将（必填） 
		characterIntro: characterIntro, //武将介绍（选填） 
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
		characterReplace: { //同名武将切换

		}, //同名武将切换
		perfectPair:perfectPair, //珠联璧合武将（选填）
		characterFilter: { //禁用

			//傀夜白和傀儡在国战禁用
		}, //武将使用条件
		characterTitle:characterTitle , //武将标题（用于写称号或注释）（选填） 
		skill: skill, //技能（必填） ……………………！…！！！【…？。！！？？？？…………
		card: card,
		translate: translate, //翻译（必填） 
		dynamicTranslate: dynamicTranslate,
	};
	/*
	// if(!lib.characterPack.mode_guozhan)lib.characterPack.mode_guozhan;
	// 这是一个大饼，也是一个尝试
	*/
	
	for(var i in ybnew1.character){
		if(ybnew1.character[i][4])ybnew1.character[i][4].push(`ext:夜白神略/image/ybsl004/${i}.jpg`);
		else ybnew1.character[i].img=`extension/夜白神略/image/ybsl004/${i}.jpg`;
	} 
	// }//由于以此法加入的武将包武将图片是用源文件的，所以要用此法改变路径 
	for(var i in ybnew1.character){
		if(ybnew1.character[i][4])ybnew1.character[i][4].push('die:夜白神略/audio/die/'+i+'.mp3');
	}
	for(var i in ybnew1.card){
		if(!ybnew1.card[i].image) ybnew1.card[i].image='ext:夜白神略/image/card/'+i+'.png'
	}
	lib.config.all.characters.push('ybnew1');
	if (!lib.config.characters.includes('ybnew1')) lib.config.characters.remove('ybnew1');
	lib.translate['ybnew1_character_config'] = '<span style=\'color:#28e3ce\'>其他武将</span>';
	return ybnew1;
});