import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
import { ybslb_update } from '../update.js'
export { YBSL_update }
/**
 * 掌管更新公告相关数据
 */
const YBSL_update = function(){
	//抄来的更新公告格式，暂未动笔
	// lib.translate['mode_extension_夜白神略_character_config'] = "夜白神略注意事项"
	// lib.extensionPack['夜白神略'].version = '5.7.0-1.8';
	// var str = "<br><li>注意事项";
	// str += "<br><li>本扩展修改了本体的get.characterIntro()函数和get.nodeintro()函数，<br>如果发生冲突或介意的话请关掉本扩展";
	// game.showExtensionChangeLog(str, '夜白神略');
	// 替换为你的文件 Raw URL
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
	// 询问用户是否联网获取公告
	// const userConfirmed = confirm("是否联网获取夜白神略公告？");
	// if (userConfirmed) 
	// 	{//云端公告
	// 		const fileUrl = 'https://raw.githubusercontent.com/nigthmoon/ybsl_dialog/refs/heads/main/ybsl_dialog.js';
		
	// 		fetch(fileUrl)
	// 		.then(response => {
	// 			if (!response.ok) {
	// 			throw new Error('Network response was not ok');
	// 			}
	// 			return response.text();
	// 		})
	// 		.then(data => {
	// 			// console.log('公告内容：', data);
	// 			eval(data)
	// 			window.ybdia()
	// 			console.log('window.ybdia():', window.ybdia());
	// 			var ybdata= window.ybdia();
		
	// 			// 在这里你可以将公告内容显示在页面上
	// 			// lib.translate['mode_extension_夜白神略_character_config'] = "夜白神略注意事项"
	// 			var udversion=ybslb_update.version;
	// 			// console.log('本地版本号:', udversion);
	// 			var uplog = ybdata[udversion].changeLog;
	// 			if(uplog.length&&uplog.length&&uplog.length>0){
	// 				var str = "<br><li>注意事项";
	// 				for(var k = 0;k<uplog.length;k++){
	// 					str += '<br><li>';
	// 					str += uplog[k];
	// 				}
	// 				console.log('str:', str);
	// 				// 创建一个弹窗函数// 创建一个弹窗函数
	// 				function showModal(str) {
	// 					// 创建弹窗的背景层
	// 					const modalOverlay = document.createElement('div');
	// 					modalOverlay.style.position = 'fixed';
	// 					modalOverlay.style.top = '0';
	// 					modalOverlay.style.left = '0';
	// 					modalOverlay.style.width = '100%';
	// 					modalOverlay.style.height = '100%';
	// 					modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
	// 					modalOverlay.style.display = 'flex';
	// 					modalOverlay.style.justifyContent = 'center';
	// 					modalOverlay.style.alignItems = 'center';
	// 					modalOverlay.style.zIndex = '1000';
					
	// 					// 创建弹窗内容容器
	// 					const modalContent = document.createElement('div');
	// 					modalContent.style.backgroundColor = '#ff0';
	// 					modalContent.style.padding = '20px';
	// 					modalContent.style.borderRadius = '8px';
	// 					modalContent.style.boxShadow = '0 4px 8px rgba(255, 0, 0, 0.2)';
	// 					modalContent.style.maxWidth = '500px';
	// 					modalContent.style.width = '90%';
	// 					modalContent.style.position = 'relative';
					
	// 					// 创建关闭按钮
	// 					const closeButton = document.createElement('button');
	// 					closeButton.innerText = '关闭';
	// 					closeButton.style.position = 'absolute';
	// 					closeButton.style.top = '10px';
	// 					closeButton.style.right = '10px';
	// 					closeButton.style.padding = '8px 16px';
	// 					closeButton.style.backgroundColor = '#007BFF';
	// 					closeButton.style.color = '#fff';
	// 					closeButton.style.border = 'none';
	// 					closeButton.style.borderRadius = '4px';
	// 					closeButton.style.cursor = 'pointer';
	// 					closeButton.style.fontSize = '16px';
	// 					closeButton.onclick = function () {
	// 						document.body.removeChild(modalOverlay); // 关闭弹窗
	// 					};
					
	// 					// 创建弹窗内容
	// 					const modalBody = document.createElement('div');
	// 					modalBody.innerHTML = str;
	// 					modalBody.style.marginTop = '30px'; // 为关闭按钮留出空间
					
	// 					// 将内容和关闭按钮添加到弹窗容器
	// 					modalContent.appendChild(closeButton);
	// 					modalContent.appendChild(modalBody);
					
	// 					// 将弹窗容器添加到背景层
	// 					modalOverlay.appendChild(modalContent);
					
	// 					// 将背景层添加到页面
	// 					document.body.appendChild(modalOverlay);
					
	// 					modalContent.style.backgroundColor = '#f0f0f0'; // 修改弹窗背景颜色
	// 					modalBody.style.color = '#ff0'; // 修改弹窗文字颜色
	// 				}
	
	
	// 				showModal(str);
		
	// 			}
	// 		})
	// 		.catch(error => {
	// 			console.error('获取公告时出错:', error);
	// 		});
	// 	} else {
	// 	// 用户选择“否”，不执行后续逻辑
	// 	console.log("用户取消联网获取公告。");
	// }
}