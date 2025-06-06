"use strict";
import { characterSort } from '../exts/YB_03_character/characterSort.js'
import { character } from '../exts/YB_03_character/character.js'
import { characterIntro } from '../exts/YB_03_character/characterIntro.js'
import { perfectPair } from '../exts/YB_03_character/perfectPair.js'
import { characterTitle } from '../exts/YB_03_character/characterTitle.js'
import { characterCopyright } from '../exts/YB_03_character/characterCopyright.js';
import { characterCitetext } from '../exts/YB_03_character/characterCitetext.js'
import { characterUndertext } from '../exts/YB_03_character/characterUndertext.js'
import { skill } from '../exts/YB_03_character/skill.js'
import { card } from '../exts/YB_03_character/card.js'
import { translate } from '../exts/YB_03_character/translate.js'
import { dynamicTranslate } from '../exts/YB_03_character/dynamicTranslate.js'
import { typeimage } from '../packages/function.js'
game.import('character',function(lib, game, ui, get, ai, _status){ 
	/** @type { importCharacterConfig } */
	var ybxh={ 
		name:'ybxh',//武将包命名（必填） 
		connect:true,//该武将包是否可以联机（必填） 
		connectBanned:[],
		characterSort:characterSort,
		character:character,//武将（必填） 
		// characterIntro:YB_characterIntro(characterCopyright,characterCitetext,characterUndertext,characterIntro),//武将介绍（选填） 
		characterIntro:characterIntro,//武将介绍（选填） 
		characterCopyright:characterCopyright,
		characterCitetext:characterCitetext,
		characterUndertext:characterUndertext,
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
	typeimage(ybxh,'ybsl003')
	for(var i in ybxh.card){
		if(!ybxh.card[i].image) ybxh.card[i].image='ext:夜白神略/image/card/'+i+'.png'
	}
	lib.config.all.characters.add('ybxh');
	lib.translate['ybxh_character_config'] = '<span style=\'color:#28e3ce\'>校花</span>';
	return ybxh; 
}); 
