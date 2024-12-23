"use strict";
import { characterSort } from '../exts/YB_09_character/characterSort.js'
import { character } from '../exts/YB_09_character/character.js'
import { characterIntro } from '../exts/YB_09_character/characterIntro.js'
import { perfectPair } from '../exts/YB_09_character/perfectPair.js'
import { characterTitle } from '../exts/YB_09_character/characterTitle.js'
import { skill } from '../exts/YB_09_character/skill.js'
import { card } from '../exts/YB_09_character/card.js'
import { translate } from '../exts/YB_09_character/translate.js'
import { dynamicTranslate } from '../exts/YB_09_character/dynamicTranslate.js'
game.import('character',function(lib, game, ui, get, ai, _status){ 
	var ybdd={ 
		name:'ybdd',//武将包命名（必填） 
		connect:true,//该武将包是否可以联机（必填） 
		connectBanned:[  ],
		characterSort:characterSort,
		character:character,//武将（必填） 
		characterIntro:characterIntro,//武将介绍（选填） 
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
		characterReplace:{//同名武将切换
			
		},//同名武将切换
		perfectPair:perfectPair,//珠联璧合武将（选填）
		characterFilter:{//禁用
			
			//傀夜白和傀儡在国战禁用
		},//武将使用条件
		characterTitle:characterTitle,//武将标题（用于写称号或注释）（选填） 
		skill:skill,//技能（必填） ……………………！…！！！【…？。！！？？？？…………
		card:card,
		translate:translate,//翻译（必填） 
		dynamicTranslate:dynamicTranslate,
	}; 
	for(var i in ybdd.character){
		if(ybdd.character[i][4])ybdd.character[i][4].push(`ext:夜白神略/image/ybsl009/${i}.jpg`);
		else ybdd.character[i].img=`extension/夜白神略/image/ybsl009/${i}.jpg`;
	} 
	for(var i in ybdd.character){
		if(ybdd.character[i][4])ybdd.character[i][4].push('die:夜白神略/audio/die/'+i+'.mp3');
	}
	for(var i in ybdd.card){
		if(!ybdd.card[i].image) ybdd.card[i].image='ext:夜白神略/image/card/'+i+'.png'
	}
	lib.config.all.characters.add('ybdd');
	lib.translate['ybdd_character_config'] = '<span style=\'color:#e1ff00\'>夜白接单</span>';
	
	return ybdd; 
}); 
