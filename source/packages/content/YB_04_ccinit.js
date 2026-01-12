import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
import { config } from '../config.js';
export { YBSL_ccinit }
/**
 * 狂神加的首次导入自动开将包
 * 从福瑞拓展搬来的导入十周年素材
 * 千幻适配
 */
const YBSL_ccinit = function(){
	//--------------------万能的狂神-----------------//
	//------------------------自动开启武将包
	
	if(!lib.config.extension_夜白神略_init){
		game.saveConfig('extension_夜白神略_init',true);
		game.saveConfig('characters',lib.config.characters.concat('ybslj'));
		// game.saveConfig('characters',lib.config.characters.concat('ybgz'));
		game.saveConfig('characters',lib.config.characters.concat('ybxh'));
		game.saveConfig('characters',lib.config.characters.concat('ybsc'));
		game.saveConfig('characters',lib.config.characters.concat('yhky'));
		// game.saveConfig('characters',lib.config.characters.concat('ybart'));//六艺篇的六艺之前被人反馈说不喜欢，希望关掉，因此此包不设为自动开启
		game.saveConfig('cards',lib.config.cards.concat('ybslc'));
		game.saveConfig('cards',lib.config.cards.concat('ybgod'));
		
		game.saveConfig('characters',lib.config.characters.concat('ybnew1'));
		game.saveConfig('cards',lib.config.cards.concat('ybnew2'));
	};
	//------------------------更新素材-----------------//
	// if (config.夜白神略的自动更新素材开关&&game.getFileList){
	// 	if (lib.config.extensions && lib.config.extensions.includes('十周年UI') && lib.config['extension_十周年UI_enable']) {
	// 		game.getFileList('extension/十周年UI/image/decoration',(folders,files)=> {
	// 			var decoration=['name_YB_dream.png','name_YB_memory.png'];
	// 			decoration.forEach(function(image){ 
	// 				if(!files.includes(image)){
	// 					if(game.readFile&&game.writeFile){
	// 						game.readFile('extension/夜白神略/image/十周年势力/'+image,(data) => {
	// 							game.writeFile( data,'extension/十周年UI/image/decoration',image,()=>{});
	// 						});
	// 					}
	// 				}
	// 			});
	// 		});
			let lujing = 'extension/十周年UI/image/card-skins/caise'
			let lujing2 = 'extension/夜白神略/image/card-skins/caise'
			game.getFileList(lujing,(folders,files)=>{
				var YBtenpng = files;
				game.getFileList(lujing2,(folders,files)=> {
					
					var decoration = files;
					decoration.forEach(function(image){ 
						if(!YBtenpng.includes(image)){
							if(game.readFile&&game.writeFile){
								game.readFile(lujing2+'/'+image,(data) => {
									game.writeFile( data,lujing,image,()=>{});
								},(err)=>console.log(err));
							}
						}
					});
				});
			})
	// 	}
	// }
	//-----------------------千幻
	if (!lib.qhly_groupimage) {
		lib.qhly_groupimage = {};
	}
	if (!lib.qhly_groupcolor) {
		lib.qhly_groupcolor = {};
	}
	lib.qhly_groupimage['YB_memory'] = 'extension/夜白神略/image/千幻势力/name_YB_memory.webp';
	lib.qhly_groupimage['YB_dream'] = 'extension/夜白神略/image/千幻势力/name_YB_dream.webp';
	lib.qhly_groupcolor['YB_memory'] = "#28e3ce";
	lib.qhly_groupcolor['YB_dream'] = "#e328b7";
}