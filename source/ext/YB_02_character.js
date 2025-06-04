"use strict";
import { characterSort } from '../exts/YB_02_character/characterSort.js'
import { character } from '../exts/YB_02_character/character.js'
import { characterIntro } from '../exts/YB_02_character/characterIntro.js'
import { perfectPair } from '../exts/YB_02_character/perfectPair.js'
import { characterTitle } from '../exts/YB_02_character/characterTitle.js'
import { characterCopyright } from '../exts/YB_02_character/characterCopyright.js';
import { characterCitetext } from '../exts/YB_02_character/characterCitetext.js'
import { characterUndertext } from '../exts/YB_02_character/characterUndertext.js'
import { skill } from '../exts/YB_02_character/skill.js'
import { card } from '../exts/YB_02_character/card.js'
import { translate } from '../exts/YB_02_character/translate.js'
import { dynamicTranslate } from '../exts/YB_02_character/dynamicTranslate.js'
import { typeimage } from '../packages/function.js'
game.import('character',function(lib, game, ui, get, ai, _status){ 
	/** @type { importCharacterConfig } */
	var ybart={ 
		name:'ybart',//武将包命名（必填） 
		connect:true,//该武将包是否可以联机（必填） 
		characterSort:characterSort,
		character:character,
		skill:skill,
		card:card,
		translate:translate,
		dynamicTranslate:dynamicTranslate,
		// characterIntro:YB_characterIntro(characterCopyright,characterCitetext,characterUndertext,characterIntro),//武将介绍（选填） 
		characterIntro:characterIntro,
		characterCopyright:characterCopyright,
		characterCitetext:characterCitetext,
		characterUndertext:characterUndertext,
		perfectPair:perfectPair,
		characterTitle:characterTitle,
	};
	typeimage(ybart,'ybsl001')
	for(var i in ybart.card){
		if(!ybart.card[i].image) ybart.card[i].image='ext:夜白神略/image/card/'+i+'.png'
	}
	lib.config.all.characters.add('ybart');
	lib.translate['ybart_character_config'] = '<span style=\'color:#28e3ce\'>六艺篇</span>';
	return ybart; 
});