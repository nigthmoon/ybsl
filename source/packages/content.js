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
	
	
}