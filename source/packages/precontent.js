import { lib, game, ui, get, ai, _status } from '../../../../noname.js'
// import { YB_update } from './update.js'
import { YBSL_rank } from './precontent/YB_01_rank.js';
import { YBSL_nature } from './precontent/YB_02_nature.js';
import { YBSL_trigger } from './precontent/YB_03_trigger.js';
import { YBSL_special } from './precontent/YB_04_special.js';
import { YBSL_pinyin } from './precontent/YB_05_pinyin.js';
import { YBSL_starmap } from './precontent/YB_06_starmap.js';
import { YBSL_qianhuan } from './precontent/YB_07_qianhuan.js';
import { YBSL_ybslf } from './precontent/YB_08_ybslf.js';
import { YBSL_update }from './precontent/YB_09_update.js'
import { YBSL_destiny } from './precontent/YB_10_destiny.js'
// import { characterIntro,nodeintro } from './function.js';
export async function precontent() {
	const scriptPaths=[
		'ext/YB_1_character.js','ext/YB_2_character.js','ext/YB_3_character.js','ext/YB_4_character.js',
		'ext/YB_5_card.js','ext/YB_6_card.js','ext/YB_7_card.js','ext/YB_8_character.js','ext/YB_9_character.js',
		// 'ext/YB_01_character.js'
	];
	Promise.all(
		scriptPaths.map(path => import('../' + path))
	).then(modules => {
		
	}).catch(error => {
		alert('error '+error+'导入失败 !')
		console.error(error.message);
	});
	//window.list24
	{//css
		var nor=lib.assetURL+'extension/夜白神略/source/css';
		lib.init.css(nor,'ybcss')
		{
			// lib.init.css(nor,'dark')
			lib.init.css(nor,'light')
		}
	}
	{
		//导入数据
		YBSL_rank();
		YBSL_nature();
		YBSL_trigger();
		YBSL_special();
		YBSL_pinyin();
		YBSL_starmap();
		YBSL_qianhuan();
		YBSL_ybslf();
		YBSL_update();
		YBSL_destiny();

	}
	//嗨梨相关的整理完后挪到对应将包


}