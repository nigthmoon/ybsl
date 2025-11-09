// "use strict";
import { lib, game, ui, get, ai, _status } from '../../../../noname.js'
import { characterSort } from '../exts/YB_12_character/characterSort.js'
import { character } from '../exts/YB_12_character/character.js'
import { characterIntro } from '../exts/YB_12_character/characterIntro.js'
import { perfectPair } from '../exts/YB_12_character/perfectPair.js'
import { characterTitle } from '../exts/YB_12_character/characterTitle.js'
import { characterCopyright } from '../exts/YB_12_character/characterCopyright.js';
import { characterCitetext } from '../exts/YB_12_character/characterCitetext.js'
import { characterUndertext ,accessoryPacket} from '../exts/YB_12_character/characterUndertext.js'
// import { accessoryPacket } from '../exts/YB_12_character/accessoryPacket.js'
import { skill } from '../exts/YB_12_character/skill.js'
import { card } from '../exts/YB_12_character/card.js'
import { translate } from '../exts/YB_12_character/translate.js'
import { dynamicTranslate } from '../exts/YB_12_character/dynamicTranslate.js'
import { typeimage } from '../packages/function.js'
game.import('character',function(lib, game, ui, get, ai, _status){ 
	/** @type { importCharacterConfig } */
	var sgstrxs={ 
		name:'sgstrxs',//武将包命名（必填） 
		connect:true,//该武将包是否可以联机（必填） 
		connectBanned:[],
		characterSort:characterSort,
		character:character,//武将（必填） 
		// characterIntro:YB_characterIntro(characterCopyright,characterCitetext,characterUndertext,characterIntro),//武将介绍（选填） 
		characterIntro:characterIntro,//武将介绍（选填） 
		characterCopyright:characterCopyright,
		characterCitetext:characterCitetext,
		characterUndertext:characterUndertext,
		accessoryPacket:accessoryPacket,//附属将包
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
		
		characterSubstitute: {
			sgsxjxfzmnl_shichangshi: [["sgsxjxfzmnl_shichangshi_dead", ['ext:夜白神略/image/ybsl012/sgsxjxfzmnl_shichangshi_dead.jpg',"die:shichangshi"]]],
			sgsxjxfzmnl_scs_zhangrang: [["sgsxjxfzmnl_scs_zhangrang_dead", ['ext:夜白神略/image/ybsl012/sgsxjxfzmnl_scs_zhangrang_dead.jpg',"die:shichangshi"]]],
			sgsxjxfzmnl_scs_zhaozhong: [["sgsxjxfzmnl_scs_zhaozhong_dead", ['ext:夜白神略/image/ybsl012/sgsxjxfzmnl_scs_zhaozhong_dead.jpg',"die:shichangshi"]]],
			sgsxjxfzmnl_scs_sunzhang: [["sgsxjxfzmnl_scs_sunzhang_dead", ['ext:夜白神略/image/ybsl012/sgsxjxfzmnl_scs_sunzhang_dead.jpg',"die:shichangshi"]]],
			sgsxjxfzmnl_scs_bilan: [["sgsxjxfzmnl_scs_bilan_dead", ['ext:夜白神略/image/ybsl012/sgsxjxfzmnl_scs_bilan_dead.jpg',"die:shichangshi"]]],
			sgsxjxfzmnl_scs_xiayun: [["sgsxjxfzmnl_scs_xiayun_dead", ['ext:夜白神略/image/ybsl012/sgsxjxfzmnl_scs_xiayun_dead.jpg',"die:shichangshi"]]],
			sgsxjxfzmnl_scs_hankui: [["sgsxjxfzmnl_scs_hankui_dead", ['ext:夜白神略/image/ybsl012/sgsxjxfzmnl_scs_hankui_dead.jpg',"die:shichangshi"]]],
			sgsxjxfzmnl_scs_lisong: [["sgsxjxfzmnl_scs_lisong_dead", ['ext:夜白神略/image/ybsl012/sgsxjxfzmnl_scs_lisong_dead.jpg',"die:shichangshi"]]],
			sgsxjxfzmnl_scs_duangui: [["sgsxjxfzmnl_scs_duangui_dead", ['ext:夜白神略/image/ybsl012/sgsxjxfzmnl_scs_duangui_dead.jpg',"die:shichangshi"]]],
			sgsxjxfzmnl_scs_guosheng: [["sgsxjxfzmnl_scs_guosheng_dead", ['ext:夜白神略/image/ybsl012/sgsxjxfzmnl_scs_guosheng_dead.jpg',"die:shichangshi"]]],
			sgsxjxfzmnl_scs_gaowang: [["sgsxjxfzmnl_scs_gaowang_dead", ['ext:夜白神略/image/ybsl012/sgsxjxfzmnl_scs_gaowang_dead.jpg',"die:shichangshi"]]],
		},
	}; 
	// for(var i in sgstrxs.character){
	// 	if(sgstrxs.character[i][4])sgstrxs.character[i][4].push(`ext:夜白神略/image/ybsl003/${i}.jpg`);
	// 	else sgstrxs.character[i].img=`extension/夜白神略/image/ybsl003/${i}.jpg`;
	// } 
	typeimage(sgstrxs,'ybsl012')
	// for(var k in sgstrxs.characterSubstitute){
	// 	for(var i in sgstrxs.characterSubstitute[k]){
	// 		sgstrxs.characterSubstitute[k][i][1].push(`ext:夜白神略/image/ybsl012/${sgstrxs.characterSubstitute[k][i][0]}.jpg`);
	// 	}
	// }
	for(var i in sgstrxs.card){
		if(!sgstrxs.card[i].image) sgstrxs.card[i].image='ext:夜白神略/image/card/'+i+'.png'
	}
	lib.config.all.characters.add('sgstrxs');
	lib.translate['sgstrxs_character_config'] = '<span style=\'color:#28e3ce\'>三国杀同人小说</span>';
	return sgstrxs; 
}); 
