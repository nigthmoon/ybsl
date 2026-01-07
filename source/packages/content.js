import { lib, game, ui, get, ai, _status } from '../../../../noname.js'
import { YBSL_dialogx } from './content/YB_01_dialog.js'
import { YBSL_cardpile } from './content/YB_02_cardpile.js'
import { YBSL_qhlyskin } from './content/YB_03_qhlyskin.js'
import { YBSL_ccinit } from './content/YB_04_ccinit.js'
import { YBSL_boom } from './content/YB_05_boom.js'
import { YBSL_rewrite } from './content/YB_06_rewrite.js'
import { YBSL_brawl } from './content/YB_07_brawl.js'
import { YBSL_ybtf } from './content/YB_08_ybtf.js'
import { YBSL_ybgz } from './content/YB_09_ybgz.js'

export async function content(config, pack) {
	
				// 强制返回 false，防止其他扩展手动开启兼容模式
				// Object.defineProperty(lib.config, 'compatiblemode', {
				// 	get() { return false },
				// 	set() { },
				// });//玛德，我看哪个扩展再给我手动开兼容

	// if(lib.config.extension_夜白神略_ybsl_wujinshilian=='lc'){
	// }
	{
		YBSL_dialogx();
		YBSL_cardpile();
		YBSL_qhlyskin();
		YBSL_ccinit();
		YBSL_boom();
		YBSL_rewrite();
		YBSL_brawl();
		YBSL_ybtf();
		YBSL_ybgz();
	}
	
	if(lib.config.extension_十周年UI_enable==true){
		let cards = [];
		game.getFileList('extension/夜白神略/image/card-skins/caise',(folders,files)=> {
			var decoration = files;
			decoration.forEach(function(image){ 
				cards.push(image.slice(0,image.length-5));
			});
		});
		// console.log(cards)
		window.registerDecadeCardSkin({
			extensionName:'夜白神略',
			skinKey:'caise',
			cardNames:cards,
			extension:'webp',
		})
	}
	
}