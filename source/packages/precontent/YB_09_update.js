import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
import { ybslb_update } from '../update.js'
export { YBSL_update }
/**
 * 掌管更新公告相关数据
 */
const YBSL_update = function(){
	//抄来的更新公告格式，暂未动笔
	lib.translate['mode_extension_夜白神略_character_config'] = "夜白神略注意事项"
	lib.extensionPack['夜白神略'].version = '5.7.0-1.8';
	var str = "<br><li>注意事项";
	str += "<br><li>本扩展修改了本体的get.characterIntro()函数和get.nodeintro()函数，<br>如果发生冲突或介意的话请关掉本扩展";
	game.showExtensionChangeLog(str, '夜白神略');
	{//更新公告
		//---------------------------------------------------------*/
		/********************更新公告********************/
		//此处岔开
		get.ybslb_gengxin = function() {
			var cfg = 'extension_夜白神略_changelog';
			// delete window.ybslb_update;
			// var update = window.ybslb_update;
			var update = ybslb_update;
			if(!update) return false;
			lib.extensionPack['夜白神略'].version = update.version;
			var gengxing = update[update.version];
			if(!gengxing) return false;
			if (lib.extensionPack['夜白神略'] && lib.extensionPack['夜白神略'].version != lib.config[cfg]) {
				game.saveConfig(cfg, lib.extensionPack['夜白神略'].version);
			} else {
				return false;
			};
			var ul = document.createElement('ul');
			ul.style.textAlign = 'left';
			var caption;
			var version = update.version;
			var players = gengxing.players || [];
			var cards = gengxing.cards || [];
			var changeLog = gengxing.changeLog || [];
			caption = '夜白神略更新';
			
			for (var i of changeLog) {
				var li = document.createElement('li');
				li.innerHTML = i;
				ul.appendChild(li);
			};
			var dialog = ui.create.dialog(caption, 'hidden');
			dialog.add(version);
			dialog.forcebutton = true;
			dialog.classList.add('forcebutton');
			var lic = ui.create.div(dialog.content);
			lic.style.display = 'block';
			ul.style.display = 'inline-block';
			ul.style.marginLeft = '-40px';
			lic.appendChild(ul);
			if (players.length) {
				for (var i = 0; i < players.length; i++) {
					if (!lib.character[players[i]]) {
						var result = get.character(players[i]);
						if (result) {
							if (!result[4]) {
								result[4] = [];
							};
							lib.character[players[i]] = result;
						};
					};
					if (!lib.character[players[i]]) {
						players.splice(i--, 1);
					};
				};
				if (players.length) {
					dialog.addText('武将更新');
					dialog.add([players, 'character']);
					//dialog.addSmall([players,'character']);				
				};
			};
			if (cards.length) {
				for (var i = 0; i < cards.length; i++) {
					if (!lib.card[cards[i]]) {
						cards.splice(i--, 1);
					};
				};
				if (cards.length) {
					for (var i = 0; i < cards.length; i++) {
						cards[i] = [get.translation(get.type(cards[i])), '', cards[i]];
					};
					dialog.addText('卡牌更新');
					dialog.add([cards, 'vcard']);
					//dialog.addSmall([cards,'vcard']);									
				}
			}
			dialog.addText('-----------------------------------------');
			dialog.addText('-----------------------------------------');
			dialog.addText('-------------------END-------------------');
			dialog.addText('-----------------------------------------');
			dialog.addText('-----------------------------------------');
			dialog.open();
			var hidden = false;
			if (!ui.auto.classList.contains('hidden')) {
				ui.auto.hide();
				hidden = true;
			};
			game.pause();
			var control = ui.create.control('确定', function() {
				dialog.close();
				control.close();
				if (hidden) ui.auto.show();
				game.resume();
			});
			lib.init.onfree();
		};
		var _showChangeLog = game.showChangeLog;
		game.showChangeLog = function() {
			_showChangeLog();
			var next = game.createEvent('ybslb_gengxin', false);
			next.setContent(function() {
				get.ybslb_gengxin();
			});
		};
	}
}