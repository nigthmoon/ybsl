import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
import { YB_tujian } from '../../pile/ybtujian.js'
import { YBSL_characterIntro } from '../function.js'
export { YB_11_cardBrowser }
/**
 * 新模式光速撤销，看看搞一个新乱斗模式
 * 再次更改计划，用于新模式
 * 现计划用于rpg设计
 * 原用于卡包浏览
 */
const YB_11_cardBrowser = function () {
	{

		// game.addMode('YB_rpg',{
		// 	start:function(){
		// 		'step 0'
		// 	//	lib.init.css(lib.assetURL+'extension/夜白神略/source/packages/precontent/YB_rpg','style')
		// 		'step 1'

		// 	},
		// },{
		// 	translate: 'RPG游戏',
		// })
	}
	if (lib?.config?.extension_夜白神略_6attack == true) {
		game.addMode('YB_6attack', {
			start: function () {
				'step 0'
				var dialog = ui.create.div('.yb6attack');
				// this.parentNode.insertBefore(dialog, this.nextSibling);
				// dialog.innerHTML='12312';
				dialog.innerHTML = '<br><div class="yb6attack_title">夜白神略</div>';
				// dialog;
				ui.create.dialog(dialog)
				'step 1'
			},
			init: function () {
			},
		}, {
			translate: 'rpg模拟器'
		})
		// lib.brawl.YB_rpg = {
		// 	name: "rpg模拟器",
		// 	mode: "identity",
		// 	intro:['无介绍'],
		// 	init(){},
		// 	content:{
		// 		submode: "normal",

		// 	},
		// }
	}
	{

		// game.addMode('YB_mode',{
		// 	name: 'YB_mode',
		// 	start:function(){
		// 		'step 0'
		// 		game.loadMode("identity");
		// 		'step 1'

		// 	},
		// }, {
		// 	translate: '夜白',
		// 	config: {
		// 		yb_yuanfen_mode: {
		// 			name: '游戏模式',
		// 			init: 'normal',
		// 			item: {
		// 				normal: '经典',
		// 			},
		// 			restart: true,
		// 			frequent: true,
		// 			intro: '很可惜，只有我哟~'
		// 		},
		// 	},
		// 	onremove: function () {
		// 		game.clearModeConfig('YB_mode');
		// 	}
		// })
		// image: ['extension/夜白神略/YB_mode.jpg']
	}
	if (false) {
		var packages = [
			"ybslj", "ybxh", "ybdd", "ybgod", "ybslc", "ybart", 'ybnew1', 'ybmjz', 'yhky', 'sgstrxs', 'ybMagic'
		]
		for (var pack of packages) {
			for (var name in lib.characterPack[pack]) {
				YB_tujian[name] = {
					version: YBSL_characterIntro(name),
					players: [name],
					info: function () {
						var info = '';
						for (var j in lib.characterPack[pack][name][3]) {
							info += '<span class="bluetext">' + lib.translate[lib.characterPack[pack][name][3][j]] + '</span>：' + lib.translate[lib.characterPack[pack][name][3][j] + '_info'] + '<br>';
							if (lib.skill[j].derivation) {
								for (var k in lib.skill[j].derivation) {
									info += '<span class="bluetext">' + lib.translate[lib.skill[j].derivation[k]] + '</span>：' + lib.translate[lib.skill[j].derivation[k] + '_info'] + '<br>';
								}
							}
						}
						return info
					},
					cards: [],
					// name:lib.translate[name],
				}
			}
		}
		if (lib.config.YB_look == 1) {
			if (!lib.config.extension_文武英杰_enable) game.wwyj_showNewtujian = function () {
				var dialog = ui.create.dialog('hidden');
				dialog.style.height = 'calc(70%)';
				dialog.style.width = 'calc(70%)';
				dialog.style.left = '155px';
				dialog.style.top = '60px';
				dialog.classList.add('popped');
				dialog.classList.add('static');
				var list_newtujian = [];
				for (var i in YB_tujian) {
					list_newtujian.push({
						data: i,
						info: YB_tujian[i],
					});
				};
				var interval = setInterval(function () {
					var num = 20;
					if (num > list_newtujian.length) num = list_newtujian.length;
					for (var i = 0; i < num; i++) {
						var data = list_newtujian[0].data;
						var info = list_newtujian[0].info;
						var list = [];
						var list1 = [];
						if (info.players.length) {
							for (var j = 0; j < info.players.length; j++) {
								if (lib.character[info.players[j]] != undefined) list.push(info.players[j]);
							};
						};
						if (list.length) dialog.addSmall([list, 'character']);
						dialog.addText(data + '   (' + info.version + ')<br>', false);
						dialog.addText('<li>' + info.info, false);
						if (info.cards.length) {
							for (var j = 0; j < info.cards.length; j++) {
								if (lib.card[info.cards[j]] != undefined) list1.push(info.cards[j]);
							};
						};
						if (list1.length) dialog.addSmall([list1, 'vcard']);
						list_newtujian.remove(list_newtujian[0]);
						if (list_newtujian.length == 0) {
							clearInterval(interval);
						};
					};
				}, 100);
				ui.window.appendChild(dialog);
				var div = ui.create.div('.menubutton.round', '×', function () {
					clearInterval(interval);
					dialog.delete();
					ui.window.removeChild(this);
					game.playwwyj('wwyj_show');
				});
				div.style.top = '60px';
				div.style.left = 'calc(100% - 155px)';
				div.style.zIndex = 1000;
				ui.window.appendChild(div);
			};
			if (config.wwyj_newtujianicon) {
				lib.skill._wwyj_newtujianicon = {
					trigger: { global: 'gameStart' },
					forced: true,
					charlotte: true,
					_priority: 2020,
					content: function () {
						if (event.isMine()) {
							game.broadcastAll(function (player) {
								var Animation = ui.create.div();
								Animation.setBackgroundImage('extension/文武英杰/wwyj_newtujianicon.png');
								Animation.style.left = '62%';
								Animation.style.top = 'calc(80% - 90px)';
								Animation.style.width = '80px';//120
								Animation.style.height = '80px';//150            
								Animation.style.backgroundSize = 'cover';
								Animation.style['z-index'] = '2';
								ui.window.appendChild(Animation);
								ui.refresh(Animation);
								Animation.onclick = function () {
									// game.playwwyj('wwyj_dansha');
									//ui.click.configMenu();
									game.wwyj_showNewtujian();
									//game.wwyj_openCharacterPack();			     		     
								}
							});
						}
					},
				}
			}

		}
	}
}