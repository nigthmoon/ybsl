import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
import { config } from '../config.js';
export { YBSL_dialogx }

/**
 * 
 * 掌管游戏开始时的声明（挪到update文件里了）
 * 理论上这应该是将包禁用相关，但我没察觉出来有没有用
 */
const YBSL_dialogx = function(){
	// //抄来的更新公告格式，暂未动笔
	// lib.translate['mode_extension_夜白神略_character_config'] = "<img style=width:100px src="+lib.assetURL+"extension/夜白神略/title.png>"
	// lib.extensionPack['夜白神略'].version = '4.1.5';
	// var str = "<br><li>这是一条提示";
	// str += "<br><li>假如武将包和牌堆没有打开，请前往武将菜单，下滑找到夜白将包，开启，然后前往卡牌菜单，找到夜白牌堆和BOSS搬运，分别开启";
	// game.showExtensionChangeLog(str, '夜白神略');
	
	//-------------云端弹窗公告(已放弃)
	if(config.ybslb){
		for(var i in lib.characterPack['ybslb']){
			if(lib.character[i][4].indexOf("forbidai")<0)lib.character[i][4].push("forbidai");
		};
	};//选项触发内容，原因见config
}