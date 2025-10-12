"use strict";
// import { lib, game, ui, get, ai, _status } from '../../../../noname.js'
import { characterSort } from '../exts/YB_01_character/characterSort.js'
import { character } from '../exts/YB_01_character/character.js'
import { characterIntro } from '../exts/YB_01_character/characterIntro.js'
import { perfectPair } from '../exts/YB_01_character/perfectPair.js'
import { characterTitle } from '../exts/YB_01_character/characterTitle.js'
import { characterCopyright } from '../exts/YB_01_character/characterCopyright.js';
import { characterCitetext } from '../exts/YB_01_character/characterCitetext.js'
import { characterUndertext ,accessoryPacket} from '../exts/YB_01_character/characterUndertext.js'
import { characterLightext } from '../exts/YB_01_character/characterLightext.js';
import { characterLightextParent } from '../exts/YB_01_character/characterLightext.js';
import { skill } from '../exts/YB_01_character/skill.js'
import { card } from '../exts/YB_01_character/card.js'
import { translate } from '../exts/YB_01_character/translate.js'
import { dynamicTranslate } from '../exts/YB_01_character/dynamicTranslate.js'
// import { YB_characterIntro } from '../packages/function.js';
import { typeimage } from '../packages/function.js'
game.import('character',function(lib, game, ui, get, ai, _status){ 

	/** @type { importCharacterConfig } */
	var ybslj={ 
		name:'ybslj',//武将包命名（必填） 
		connect:true,//该武将包是否可以联机（必填） 
		connectBanned:['ybold_018zhangqing','yboldshen_002chenailin','ybsp_018zhangqing'],
		characterSort:characterSort,
		character:character,//武将（必填） 
		// characterIntro:YB_characterIntro(characterCopyright,characterCitetext,characterUndertext,characterIntro),//武将介绍（选填） 
		characterIntro:characterIntro,
		characterCopyright:characterCopyright,
		characterCitetext:characterCitetext,
		characterUndertext:characterUndertext,
		accessoryPacket:accessoryPacket,//附属将包
		characterLightextParent:characterLightextParent,
		characterLightext:characterLightext,
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
		// characterReplace:{//同名武将切换
		// 	dzsl_013yinji:['dzsl_013yinji','ybsl_013yinji'],//尹姬
		// 	dzsl_014liutianyu:['dzsl_014liutianyu','db_ybsp_014liutianyu','ybart_014liutianyu'],//夜白
		// 	dzsl_016manchengqi:['dzsl_016manchengqi','ybsl_016manchengqi','ybart_016manchengqi','ybold_016manchengqi'],//满城柒
		// 	dzsl_017xiaohong:['dzsl_017xiaohong','ybsl_017xiaohong','ybart_017xiaohong'],//涂山小红
		// 	ybsl_018zhangqing:['ybsl_018zhangqing','ybold_018zhangqing'],//张晴
		// 	db_ybsl_038tengwu:['db_ybsl_038tengwu','db_ybsp_038tengwu'],//滕武
		// 	ybslshen_002chenailin:['ybslshen_002chenailin','yboldshen_002chenailin'],//神陈爱琳
		// 	ybsl_002chenailin:['ybsl_002chenailin','ybsp_002chenailin'],//陈爱琳
		// 	ybsl_047zhangmi:['ybsb_047zhangmi','ybsl_047zhangmi','ybnb_047zhangmi'],//张汨
		// 	ybsl_034zhoulianyuan:['ybsl_034zhoulianyuan','ybnb_034zhoulianyuan'],//周怜渊
		// },//同名武将切换
		perfectPair:perfectPair,//珠联璧合武将（选填）
		characterFilter:{//禁用
			dzsl_014liutianyu:function(mode){
				return mode!='guozhan'&&!lib.config.extension_云中守望_enable;
			},
			dzsl_014xinzhikui:function(mode){
				return mode!='guozhan'&&!lib.config.extension_云中守望_enable;
			},
			//傀夜白和傀儡在国战禁用
		},//武将使用条件
		characterTitle:characterTitle,//武将标题（用于写称号或注释）（选填） 
		skill:skill,//技能（必填） ……………………！…！！！【…？。！！？？？？…………
		card:card,
		translate:translate,//翻译（必填） 
		dynamicTranslate:dynamicTranslate,
		
	};
	typeimage(ybslj,'ybsl001')
	for(var i in ybslj.card){
		if(!ybslj.card[i].image) ybslj.card[i].image='ext:夜白神略/image/card/'+i+'.png'
	}
	lib.config.all.characters.add('ybslj');
	lib.translate['ybslj_character_config'] = '<span style=\'color:#28e3ce\'>夜白将包</span>';
	return ybslj; 
}); 