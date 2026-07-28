import { lib, game, ui, get, ai, _status } from '../../../../../noname.js';
import { config } from '../config.js';
export { YBSL_ccinit };
/**
 * 狂神加的首次导入自动开将包
 * 从福瑞拓展搬来的导入十周年素材
 * 千幻适配
 */
const YBSL_ccinit = function () {
	//--------------------万能的狂神-----------------//
	//------------------------自动开启武将包

	if (!lib.config.extension_夜白神略_init) {
		game.saveConfig('extension_夜白神略_init', true);
		game.saveConfig('characters', lib.config.characters.concat('ybslj'));
		// game.saveConfig('characters',lib.config.characters.concat('ybgz'));
		game.saveConfig('characters', lib.config.characters.concat('ybxh'));
		game.saveConfig('characters', lib.config.characters.concat('ybsc'));
		game.saveConfig('characters', lib.config.characters.concat('yhky'));
		// game.saveConfig('characters',lib.config.characters.concat('ybart'));//六艺篇的六艺之前被人反馈说不喜欢，希望关掉，因此此包不设为自动开启
		game.saveConfig('cards', lib.config.cards.concat('ybslc'));
		game.saveConfig('cards', lib.config.cards.concat('ybgod'));

		game.saveConfig('characters', lib.config.characters.concat('ybnew1'));
		game.saveConfig('cards', lib.config.cards.concat('ybnew2'));
	}
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
	let lujing = 'extension/十周年UI/image/card-skins/caise';
	let lujing2 = 'extension/夜白神略/image/card-skins/caise';
	// 仅在「自动导入素材」开关开启且十周年UI扩展已安装并启用时，才向其目录同步卡牌美化素材；
	// 否则该目录不存在，getFileList 在 node 下未传 failure 回调会同步抛出 ENOENT 导致崩溃
	if (lib.config.夜白神略的自动更新素材开关 !== false && lib.config.extensions && lib.config.extensions.includes('十周年UI')) {
		var ccFail = function (err) {
			// 目录不存在(ENOENT)等情况静默忽略，不影响正常游玩
			if (err && err.code !== 'ENOENT') console.warn('[夜白神略] 读取十周年UI素材目录失败：', err);
		};
		game.getFileList(lujing, function (folders, files) {
			var YBtenpng = files;
			game.getFileList(lujing2, function (folders, files) {
				var decoration = files;
				decoration.forEach(function (image) {
					if (!YBtenpng.includes(image)) {
						if (game.readFile && game.writeFile) {
							game.readFile(
								lujing2 + '/' + image,
								(data) => {
									game.writeFile(data, lujing, image, () => {});
								},
								(err) => console.log(err),
							);
						}
					}
				});
			}, ccFail);
		}, ccFail);
	}
	game.shoudongdaorusucai = function (item) {
		let lujing = 'extension/十周年UI/image/card-skins/caise';
		let lujing2 = item == 'old' ? 'extension/夜白神略/image/card-oldskins/caise' : 'extension/夜白神略/image/card-skins/caise';
		// 未安装/未启用十周年UI时无法导入，给出提示并直接返回
		if (!(lib.config.extensions && lib.config.extensions.includes('十周年UI'))) {
			console.warn('[夜白神略] 未检测到十周年UI扩展，无法导入卡牌素材');
			return;
		}
		var ccFail = function (err) {
			if (err && err.code !== 'ENOENT') console.warn('[夜白神略] 读取十周年UI素材目录失败：', err);
		};
		game.getFileList(lujing, function (folders, files) {
			var YBtenpng = files;
			game.getFileList(lujing2, function (folders, files) {
				var decoration = files;
				decoration.forEach(function (image) {
					if (game.readFile && game.writeFile) {
						game.readFile(
							lujing2 + '/' + image,
							(data) => {
								game.writeFile(data, lujing, image, () => {});
							},
							(err) => console.log(err),
						);
					}
				});
			}, ccFail);
		}, ccFail);
	};
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
	lib.qhly_groupcolor['YB_memory'] = '#28e3ce';
	lib.qhly_groupcolor['YB_dream'] = '#e328b7';
};
