"use strict";
import { characterSort } from '../exts/YB_08_character/characterSort.js'
import { character } from '../exts/YB_08_character/character.js'
import { characterIntro } from '../exts/YB_08_character/characterIntro.js'
import { perfectPair } from '../exts/YB_08_character/perfectPair.js'
import { characterTitle } from '../exts/YB_08_character/characterTitle.js'
import { skill } from '../exts/YB_08_character/skill.js'
import { card } from '../exts/YB_08_character/card.js'
import { translate } from '../exts/YB_08_character/translate.js'
import { dynamicTranslate } from '../exts/YB_08_character/dynamicTranslate.js'
game.import('character',function(lib, game, ui, get, ai, _status){ 
	var ybmjz={ 
		name:'ybmjz',//武将包命名（必填） 
		connect:true,//该武将包是否可以联机（必填） 
		connectBanned:[],
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
	// for(var i in ybmjz.character){
	// 	if(ybmjz.character[i][4])ybmjz.character[i][4].push(`ext:夜白神略/image/ybsl003/${i}.jpg`);
	// 	else ybmjz.character[i].img=`extension/夜白神略/image/ybsl003/${i}.jpg`;
	// } 
	for(var i in ybmjz.character){
		if(ybmjz.character[i][4]){
			var infoy = ybmjz.character[i][4];
			for(var infox of infoy){
				if(infox.startsWith('YB_mjz:')){
					var char = infox.slice(7);
					ybmjz.character[i][4].push(`ext:../../image/character/${char}.jpg`);
					ybmjz.character[i][4].push(`die:../../audio/die/${char}.mp3`);
				}
			}
		}
		else {
			if(ybmjz.character[i].YB_mjz){
				var infoy = ybmjz.character[i].YB_mjz;
				ybmjz.character[i].img = `ext:../../image/character/${infoy}.jpg`;
				ybmjz.character[i].die = `ext:../../audio/die/${infoy}.mp3`;
			}
		}
	} 
	for(var i in ybmjz.card){
		if(!ybmjz.card[i].image) ybmjz.card[i].image='ext:夜白神略/image/card/'+i+'.png'
	}
	lib.config.all.characters.add('ybmjz');
	lib.translate['ybmjz_character_config'] = '<span style=\'color:#28e3ce\'>名将传</span>';
	return ybmjz; 
}); 
