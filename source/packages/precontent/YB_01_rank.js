import { lib, game, ui, get, ai, _status } from '../../../../../noname.js';
export { YBSL_rank };
/**
 * 掌管第五格武将评级和异构加入的数据
 */
const YBSL_rank = function () {
	var packages = [
		'ybslj',
		'ybxh',
		'ybdd',
		'ybgod',
		'ybslc',
		'ybart',
		'ybnew1',
		'ybmjz',
		'yhky',
		'sgstrxs',
		'ybMagic',
		'ybnew3',
		'cyyydsgs',
		'jhjx',
		// 'YB_one'
	];
	{
		//修改函数以防止失灵
		// lib.arenaReady.push(function(){
		// 	get.characterIntro=characterIntro;
		// 	get.nodeintro=nodeintro;
		// })
	}
	{
		//武将第五格评级--------狂神著
		// lib.arenaReady.push(function(){
		// 	for(var pack of packages){
		// 		for(var name in lib.characterPack[pack]){
		// 			for(var rarity of ['junk','common','rare','epic','legend']){//废材，普通，精品，史诗，传说
		// 				if(lib.characterPack[pack][name][4]){
		// 					if(lib.characterPack[pack][name][4].includes(rarity)){
		// 						lib.rank.rarity[rarity].add(name);
		// 						break;
		// 					}
		// 				}
		// 			}
		// 			if(lib.characterPack[pack][name]['yb_rank']){
		// 				var rarity = lib.characterPack[pack][name]['yb_rank'];
		// 				lib.rank.rarity[rarity].add(name);
		// 			}
		// 		}
		// 	}
		// });
		lib.arenaReady.push(function () {
			for (var pack of packages) {
				for (var name in lib.characterPack[pack]) {
					//['junk','common','rare','epic','legend']
					var infoy = lib.characterPack[pack][name][4];
					for (var infox of infoy) {
						if (infox.startsWith('rankAdd:')) {
							var rarity = infox.slice(8);
							if (lib.rank.rarity[rarity]) lib.rank.rarity[rarity].add(name);
						}
						if (infox.startsWith('rankS:')) {
							var infoz = infox.slice(6);
							if (lib.rank[infoz]) lib.rank[infoz].add(name);
						}
					}
					if (lib.characterPack[pack][name]['rankAdd']) {
						var rarity = lib.characterPack[pack][name]['rankAdd'];
						if (lib.rank.rarity[rarity]) lib.rank.rarity[rarity].add(name);
						var rarityS = lib.characterPack[pack][name]['rankS'];
						if (lib.rank[rarityS]) lib.rank[rarityS].add(name);
					}
				}
			}
		});
	}
	{
		//y异构加入
		// get.YB_linkTo =function(from,to){
		// 	var char2 = get.sourceCharacter(to);
		// 	if(!lib.characterReplace[char2])lib.characterReplace[char2]=[char2];
		// 	if(!lib.characterReplace[char2].includes(from))lib.characterReplace[char2].push(from);
		// 	return lib.characterReplace[char2];
		// }
		lib.arenaReady.push(function () {
			for (var pack of packages) {
				for (var name in lib.characterPack[pack]) {
					var infoy = lib.characterPack[pack][name][4];
					for (var infox of infoy) {
						if (infox.startsWith('linkTo:')) {
							var char = infox.slice(7);
							// get.YB_linkTo(name,char)
							var char2 = get.sourceCharacter(char);
							if (!lib.characterReplace[char2]) lib.characterReplace[char2] = [char2];
							if (!lib.characterReplace[char2].includes(name)) lib.characterReplace[char2].push(name);
						}
					}
					if (lib.characterPack[pack][name]['linkTo']) {
						var linkTo = lib.characterPack[pack][name]['linkTo'];
						// get.YB_linkTo(name,linkTo)
						var char2 = get.sourceCharacter(linkTo);
						if (!lib.characterReplace[char2]) lib.characterReplace[char2] = [char2];
						if (!lib.characterReplace[char2].includes(name)) lib.characterReplace[char2].push(name);
					}
				}
			}
		});
	}
	{//同人小说
		//神鬼赐福
		var gxcfbool = lib.config.YB_guixiecifu;
		var booltext = gxcfbool ? '神鬼赐福现在开了' : '神鬼赐福现在关着';
		// 根据状态设置不同颜色
		var btnColor = gxcfbool ? '#4CAF50' : '#9e9e9e'; // 开=绿色，关=红色

		var sgstrxsstr = '三国杀同人小说也是一个丰富的diy宝库，里面不乏优秀或有趣的设计<br>本人在此立下宏愿：每看一本三国杀同人文，都要将其中可以复现的武将都复现出来！<br>提示：右键子将包或查看武将简介可查看作者'; //<br>点击下方按钮可以开启或关闭鬼神赐福系统（调整后需重置游戏方可生效）（暂时重做，按钮关闭）

		sgstrxsstr += `<br><br>小说里，主角的武将一般享有部分特权，不算做武将自身技能，但往往在小说内的强度偏和这些特权耦合，若没有特权，部分武将的强度将大打折扣。<span class="text center pointerdiv" style="color:#4CAF50;cursor:pointer;" onclick="lib.YB_openProtagonistPrivilegePanel()">点此打开主角特权面板进行设置（施工中，无实际作用）。</span>`;

		//----------主角特权面板（新版菜单样式，写法参考十周年UI的独立配置窗口）----------//
		//特权项定义：type 支持 toggle/select/input，与十周年UI的 definitions 写法一致
		//require 为所依赖项的 key（可为数组）：任一项未开启时，本项置灰且不可操作
		//首页逐本小说列出开关以统管；各小说子页用于配置该小说的详细主角特权
		//其他小说暂时没有主角特权，因此暂不收录
		lib.YB_protagonistPrivilegeConfigs = {
			qmsgswkjsgj: [
				{ isTitle: true, name: '全民三国杀，我开局神郭嘉' },
				{
					key: 'qmsgswkjsgj_enabled',
					name: '启用主角特权',
					intro: '开启后，启用《全民三国杀，我开局神郭嘉》的主角特权。',
					type: 'toggle',
					init: false,
				},
				{
					key: 'qmsgswkjsgj_all',
					name: '特权对全体武将生效',
					intro: '开启后，该主角特权对你选用的全体武将生效；关闭则仅当你选用该小说的武将时生效。',
					type: 'toggle',
					init: false,
					require: 'qmsgswkjsgj_enabled',
				},
				{ isTitle: true, name: '详细特权' },
				{
					key: 'qmsgswkjsgj_qingnangshu',
					name: '青囊书',
					intro: '开启后，每轮开始时若你没有装备【青囊书】，则获得并装备之。',
					type: 'toggle',
					init: false,
					require: 'qmsgswkjsgj_enabled',
				},
				{
					key: 'qmsgswkjsgj_muniuliuma',
					name: '木牛流马',
					intro: '开启后，每轮开始时若你没有装备【木牛流马】，则获得并装备之。',
					type: 'toggle',
					init: false,
					require: 'qmsgswkjsgj_enabled',
				},
				{
					key: 'qmsgswkjsgj_chuanguoyuxi',
					name: '传国玉玺',
					intro: '开启后，每轮开始时若你没有装备【传国玉玺】，则获得并装备之。',
					type: 'toggle',
					init: false,
					require: 'qmsgswkjsgj_enabled',
				},
				{
					key: 'qmsgswkjsgj_taipingyaoshu',
					name: '太平要术',
					intro: '开启后，每轮开始时若你没有装备【太平要术】，则获得并装备之。',
					type: 'toggle',
					init: false,
					require: 'qmsgswkjsgj_enabled',
				},
				{
					key: 'qmsgswkjsgj_hp',
					name: '体力上限增加',
					intro: '填写阿拉伯数字：开局时你的体力上限增加该数值（留空为不增加）。',
					type: 'input',
					numeric: true,
					init: '',
					require: 'qmsgswkjsgj_enabled',
				},
				{
					key: 'qmsgswkjsgj_mianyi',
					name: '免疫武将牌翻面和横置',
					intro: '开启后，你的武将牌不会被翻面，也不会被横置。',
					type: 'toggle',
					init: false,
					require: 'qmsgswkjsgj_enabled',
				},
				{
					key: 'qmsgswkjsgj_cifu',
					name: '游戏开始时，获得赐福技能',
					intro: '开启后，游戏开始时你获得下方勾选的赐福技能。点「展开子项」可勾选具体技能（可多选）。',
					type: 'toggle',
					init: false,
					require: 'qmsgswkjsgj_enabled',
					//TODO: 赐福技能库待扩充，按下面格式继续添加即可
					sub: [
						{
							key: 'qmsgswkjsgj_cifu_baolian',
							name: '暴敛', //白无常赐福
							intro: '锁定技，结束阶段，你摸两张牌。',
							init: false,
							require: 'qmsgswkjsgj_cifu',
						},
						{
							key: 'qmsgswkjsgj_cifu_taiping',
							name: '太平', //黑无常赐福
							intro: '锁定技，摸牌阶段摸牌时，你的摸牌数量+2。',
							init: false,
							require: 'qmsgswkjsgj_cifu',
						},
					],
				},
				//详细特权项只在本子页显示（首页只汇总 key 以 _enabled/_all 结尾的开关），新增项示例：
				// {
				// 	key: 'qmsgswkjsgj_huishi', //配置键自动补前缀：lib.config.YB_zhujuetequan_qmsgswkjsgj_huishi
				// 	name: '慧识·体力上限',
				// 	intro: '点名字可展开说明。',
				// 	type: 'select', //toggle 开关 / select 选项 / input 文本
				// 	item: { off: '关闭', low: '10', high: '15' }, //type 为 select 时的选项
				// 	init: 'off',
				// 	require: 'qmsgswkjsgj_enabled', //该小说的特权未开启时置灰不可操作（可为数组）
				// 	onclick: function (value) {}, //可选：自定义保存逻辑，不写则默认 game.saveConfig
				// 	update: function (value) {}, //可选：保存后的额外处理
				// },
			],
			sgsxjxfzmnl: [
				{ isTitle: true, name: '三国杀，仙界下凡怎么你了' },
				{
					key: 'sgsxjxfzmnl_enabled',
					name: '启用主角特权',
					intro: '开启后，启用《三国杀，仙界下凡怎么你了》的主角特权。',
					type: 'toggle',
					init: false,
				},
				{
					key: 'sgsxjxfzmnl_all',
					name: '特权对全体武将生效',
					intro: '开启后，该主角特权对你选用的全体武将生效；关闭则仅当你选用该小说的武将时生效。',
					type: 'toggle',
					init: false,
					require: 'sgsxjxfzmnl_enabled',
				},
				//TODO: 该小说的详细主角特权项待后续补充
			],
		};
		//pack 为该小说武将的前缀，供日后判断“玩家是否选用了该小说的武将”使用
		lib.YB_protagonistPrivilegeTabs = [
			{ id: 'home', name: '首页' },
			{ id: 'qmsgswkjsgj', name: '全民三国杀，我开局神郭嘉', pack: 'qmsgswkjsgj' },
			{ id: 'sgsxjxfzmnl', name: '三国杀，仙界下凡怎么你了', pack: 'sgsxjxfzmnl' },
		];
		//首页：按小说逐条列出「是否开启特权 / 是否对全体武将生效」，与各小说子页共用同一组配置键，两处始终同步
		lib.YB_protagonistPrivilegeConfigs.home = (function () {
			var home = [];
			lib.YB_protagonistPrivilegeTabs.forEach(function (tab) {
				if (!tab.pack) return;
				if (!home.length) home.push({ isHint: true, name: '请进入每本小说的子页面配置详细设置' });
				var list = lib.YB_protagonistPrivilegeConfigs[tab.id] || [];
				home.push({ isTitle: true, name: list[0] && list[0].isTitle ? list[0].name : tab.name, tab: tab.id });
				list.forEach(function (item) {
					//首页只放开关；各小说的详细特权项留在其子页内
					if (item.isTitle || !/_(enabled|all)$/.test(item.key)) return;
					home.push(item);
				});
			});
			return home;
		})();
		var YB_privilegeCssId = 'YB-privilege-panel-styles';
		//由面板打开时赋值：切换到指定页签（供首页的小说标题跳转使用）
		var YB_privilegeSelectTab = null;
		var YB_getPrivilegeKey = function (key) {
			return 'YB_zhujuetequan_' + key;
		};
		var YB_getPrivilegeItem = function (key) {
			var result = null;
			for (var tabId in lib.YB_protagonistPrivilegeConfigs) {
				lib.YB_protagonistPrivilegeConfigs[tabId].forEach(function (item) {
					if (item.key == key) result = item;
				});
			}
			return result;
		};
		var YB_getPrivilegeValue = function (key) {
			var configKey = YB_getPrivilegeKey(key);
			if (lib.config[configKey] !== undefined) return lib.config[configKey];
			var item = YB_getPrivilegeItem(key);
			return item ? item.init : undefined;
		};
		//返回未满足的前置项名称（无前置或已全部满足时为空数组）
		var YB_getPrivilegeLockedNames = function (item) {
			if (!item.require) return [];
			var requires = Array.isArray(item.require) ? item.require : [item.require];
			var names = [];
			requires.forEach(function (key) {
				if (YB_getPrivilegeValue(key)) return;
				var requireItem = YB_getPrivilegeItem(key);
				names.push(requireItem ? requireItem.name : key);
			});
			return names;
		};
		var YB_setPrivilegeValue = function (item, key, value) {
			if (item.onclick) item.onclick(value);
			else game.saveConfig(key, value);
			if (item.update) item.update(value);
		};
		var YB_renderPrivilegeContent = function (content, tabId, keepScroll) {
			var lastScrollTop = content.scrollTop;
			content.innerHTML = '';
			content.scrollTop = 0;
			var list = lib.YB_protagonistPrivilegeConfigs[tabId] || [];
			if (!list.length) {
				ui.create.div('.yb-config-empty', content).innerHTML = '（该分组暂无内容，待设计）';
				return;
			}
			list.forEach(function (item) {
				if (item.isHint) {
					ui.create.div('.yb-config-hint', content).innerHTML = item.name;
					return;
				}
				if (item.isTitle) {
					var title = ui.create.div('.yb-config-section-title', content);
					title.innerHTML = item.name;
					//首页的小说标题可直接跳进该小说的子页面
					if (item.tab) {
						title.classList.add('yb-config-link');
						title.innerHTML += '<span class="yb-config-linkmark">进入 »</span>';
						title.onclick = function () {
							if (typeof YB_privilegeSelectTab == 'function') YB_privilegeSelectTab(item.tab);
						};
					}
					return;
				}
				var key = YB_getPrivilegeKey(item.key);
				var value = lib.config[key] !== undefined ? lib.config[key] : item.init;
				//前置开关未开启时，本项置灰不可操作
				var lockedNames = YB_getPrivilegeLockedNames(item);
				var locked = lockedNames.length > 0;
				var node = ui.create.div('.yb-config-item', content);
				var table = document.createElement('table');
				table.className = 'yb-config-table';
				var tr = document.createElement('tr');
				var nameTd = document.createElement('td');
				nameTd.className = 'yb-config-name';
				nameTd.innerHTML = item.name;
				if (locked) {
					node.classList.add('yb-config-disabled');
					nameTd.innerHTML += '<span class="yb-config-lock">（需先开启「' + lockedNames.join('」「') + '」）</span>';
				}
				var intro = null;
				if (item.intro) {
					intro = document.createElement('div');
					intro.className = 'yb-config-intro';
					intro.innerHTML = item.intro;
					nameTd.onclick = function (e) {
						e.stopPropagation();
						intro.classList.toggle('show');
					};
				}
				var ctrlTd = document.createElement('td');
				ctrlTd.className = 'yb-config-control';
				if (locked) ctrlTd.classList.add('yb-config-locked');
				if (item.type == 'toggle') {
					var toggle = document.createElement('div');
					toggle.className = 'yb-config-toggle ' + (value ? 'on' : 'off');
					var slider = document.createElement('div');
					slider.className = 'yb-config-toggle-slider';
					toggle.appendChild(slider);
					toggle.onclick = function () {
						if (locked) return;
						var next = !(lib.config[key] !== undefined ? lib.config[key] : item.init);
						toggle.className = 'yb-config-toggle ' + (next ? 'on' : 'off');
						//有子选项时随主开关自动展开/收起
						if (item.sub) item.subOpen = next;
						YB_setPrivilegeValue(item, key, next);
						//开关可能影响依赖它的项，重新渲染本页（保留滚动位置）
						YB_renderPrivilegeContent(content, tabId, true);
					};
					ctrlTd.appendChild(toggle);
				} else if (item.type == 'select') {
					var options = document.createElement('div');
					options.className = 'yb-config-options';
					Object.keys(item.item).forEach(function (name) {
						var option = document.createElement('div');
						option.className = 'yb-config-option' + (name === value ? ' selected' : '');
						option.innerHTML = item.item[name];
						option.dataset.value = name;
						option.onclick = function () {
							if (locked) return;
							if (this.dataset.value === value) return;
							Array.from(options.children).forEach(function (child) {
								child.classList.remove('selected');
							});
							this.classList.add('selected');
							value = this.dataset.value;
							YB_setPrivilegeValue(item, key, value);
							YB_renderPrivilegeContent(content, tabId, true);
						};
						options.appendChild(option);
					});
					ctrlTd.appendChild(options);
				} else if (item.type == 'input') {
					var input = document.createElement('input');
					input.type = item.numeric ? 'number' : 'text';
					input.className = 'yb-config-input';
					input.value = value === undefined ? '' : value;
					input.disabled = !!locked;
					input.addEventListener('blur', function () {
						if (locked) return;
						var str = this.value.trim();
						//numeric 项只保留阿拉伯数字
						if (item.numeric) str = str.replace(/[^\d]/g, '');
						if (!str) return;
						YB_setPrivilegeValue(item, key, str);
						YB_renderPrivilegeContent(content, tabId, true);
					});
					input.addEventListener('keydown', function (e) {
						if (e.key == 'Enter') this.blur();
					});
					ctrlTd.appendChild(input);
				}
				tr.appendChild(nameTd);
				tr.appendChild(ctrlTd);
				table.appendChild(tr);
				if (intro) {
					var introTr = document.createElement('tr');
					var introTd = document.createElement('td');
					introTd.colSpan = 2;
					introTd.appendChild(intro);
					introTr.appendChild(introTd);
					table.appendChild(introTr);
				}
				node.appendChild(table);
				//含子选项的项：展开后可多选（每个子项各存一个配置）
				if (item.sub) {
					var subToggle = ui.create.div('.yb-config-subtoggle', node);
					subToggle.innerHTML = '展开子项 ▾';
					var subBox = ui.create.div('.yb-config-subbox', node);
					//默认跟随主开关：开启时自动展开，关闭时自动收起
					item.subOpen = item.subOpen !== undefined ? item.subOpen : !!value;
					subBox.style.display = item.subOpen ? 'block' : 'none';
					subToggle.innerHTML = item.subOpen ? '收起子项 ▴' : '展开子项 ▾';
					subToggle.onclick = function () {
						item.subOpen = subBox.style.display == 'none';
						subBox.style.display = item.subOpen ? 'block' : 'none';
						subToggle.innerHTML = item.subOpen ? '收起子项 ▴' : '展开子项 ▾';
					};
					item.sub.forEach(function (sub) {
						var subKey = YB_getPrivilegeKey(sub.key);
						var subValue = lib.config[subKey] !== undefined ? lib.config[subKey] : sub.init;
						var subLocked = false;
						var subRequires = sub.require ? (Array.isArray(sub.require) ? sub.require : [sub.require]) : [];
						subRequires.forEach(function (requireKey) {
							if (!YB_getPrivilegeValue(requireKey)) subLocked = true;
						});
						var subRow = ui.create.div('.yb-config-subitem' + (subLocked ? ' yb-config-disabled' : ''), subBox);
						var subName = ui.create.div('.yb-config-subname', subRow);
						subName.innerHTML = sub.name;
						var subSwitch = document.createElement('div');
						subSwitch.className = 'yb-config-toggle ' + (subValue ? 'on' : 'off');
						var subSlider = document.createElement('div');
						subSlider.className = 'yb-config-toggle-slider';
						subSwitch.appendChild(subSlider);
						if (subLocked) subSwitch.classList.add('yb-config-locked');
						subSwitch.onclick = function () {
							if (subLocked) return;
							subValue = !subValue;
							subSwitch.className = 'yb-config-toggle ' + (subValue ? 'on' : 'off');
							if (sub.onclick) sub.onclick(subValue);
							else game.saveConfig(subKey, subValue);
							if (sub.update) sub.update(subValue);
						};
						subRow.appendChild(subSwitch);
						if (sub.intro) {
							var subIntro = ui.create.div('.yb-config-intro', subRow);
							subIntro.innerHTML = sub.intro;
							subName.onclick = function (e) {
								e.stopPropagation();
								subIntro.classList.toggle('show');
							};
						}
					});
				}
			});
			//改动后的重渲染保留滚动位置（切换页签时不保留）
			if (keepScroll) content.scrollTop = lastScrollTop;
		};
		lib.YB_openProtagonistPrivilegePanel = function () {
			if (document.querySelector('.yb-config-overlay')) return;
			if (!document.getElementById(YB_privilegeCssId)) {
				var style = document.createElement('link');
				style.id = YB_privilegeCssId;
				style.rel = 'stylesheet';
				style.href = lib.assetURL + 'extension/夜白神略/source/css/ybconfig.css';
				document.head.appendChild(style);
			}
			var tabs = lib.YB_protagonistPrivilegeTabs;
			var current = lib.YB_protagonistPrivilegeTab || tabs[0].id;
			var overlay = ui.create.div('.yb-config-overlay');
			var close = function () {
				overlay.remove();
				YB_privilegeSelectTab = null;
			};
			var dialog = ui.create.div('.yb-config-dialog', overlay);
			ui.create.div('.yb-config-pattern', dialog);
			ui.create.div('.yb-config-title', dialog).innerHTML = '主角特权面板';
			var closeBtn = ui.create.div('.yb-config-close', dialog);
			closeBtn.innerHTML = '✕';
			closeBtn.onclick = close;
			var sidebar = ui.create.div('.yb-config-sidebar', dialog);
			var content = ui.create.div('.yb-config-content', dialog);
			var tabNodes = {};
			var selectTab = function (tabId) {
				current = tabId;
				lib.YB_protagonistPrivilegeTab = tabId;
				Array.from(sidebar.children).forEach(function (child) {
					child.classList.remove('active');
				});
				if (tabNodes[tabId]) tabNodes[tabId].classList.add('active');
				YB_renderPrivilegeContent(content, tabId);
			};
			YB_privilegeSelectTab = selectTab;
			tabs.forEach(function (tab) {
				var node = ui.create.div('.yb-config-tab', sidebar);
				tabNodes[tab.id] = node;
				node.innerHTML = tab.name;
				if (tab.id === current) node.classList.add('active');
				node.onclick = function () {
					if (current === tab.id) return;
					selectTab(tab.id);
				};
			});
			YB_renderPrivilegeContent(content, current);
			overlay.addEventListener('click', function (e) {
				if (e.target === overlay) close();
			});
			document.body.appendChild(overlay);
		};

		// // 初始化按钮状态（如果需要）
		// if (typeof lib !== 'undefined' && lib.config) {
		// 	lib.config.YB_guixiecifu = lib.config.YB_guixiecifu || false;
		// }
	}
	{//斗罗
		//斗罗大陆
		var whjxbool = lib.config.YB_wuhunjuexing;
		var booltext = whjxbool ? '武魂觉醒现在开了' : '武魂觉醒现在关着';
		// 根据状态设置不同颜色
		var btnColor = whjxbool ? '#4CAF50' : '#9e9e9e'; // 开=绿色，关=红色
		//优先检索牌堆或牌库中的，和角色技能字段高度相近的，或角色技能中包含的牌名
		//作废思路
		var whjxstr = `
			开局每名角色觉醒武魂（）
			<br>随游戏进行，获得魂力，达到瓶颈之后，准备阶段可以发动猎魂，选择想要觉醒的方向：转化，过牌，辅助，卖血等，然后用南华天书般的系统摇几个技能供玩家选择，可以放弃选择，下次再选。魂力达到瓶颈后不会升级，但会积累，最高积累到下次升级的瓶颈。
			<br>其他的有待设定
			<br>点击下方按钮可以开启或关闭武魂觉醒系统（调整后需重置游戏方可生效）
		`;

		whjxstr += `
			<div style="position:relative;display:inline-block;width:200px;">
				<button id="wuhunBtn"
						onclick="
							lib.config.YB_wuhunjuexing = !lib.config.YB_wuhunjuexing;
							var isOn = lib.config.YB_wuhunjuexing;
							this.textContent = isOn ? '武魂觉醒现在开了' : '武魂觉醒现在关着';
							this.style.background = isOn ? '#4CAF50' : '#9e9e9e';
							game.saveConfig('YB_wuhunjuexing',lib.config.YB_wuhunjuexing);
						"
						style="background:${btnColor};color:white;padding:10px;border:none;cursor:pointer;width:100%;text-align:left;">
					${booltext}
				</button>
			</div>
		`;

		// 初始化按钮状态（如果需要）
		if (typeof lib !== 'undefined' && lib.config) {
			lib.config.YB_wuhunjuexing = lib.config.YB_wuhunjuexing || false;
		}
	}
	{//符咒世界的咒文是否翻译为中文？默认翻译
		var magicConfigbool = lib.config.YB_magicConfig;
		var magicConfigbooltext = magicConfigbool ? '现在咒文音译为中文' : '现在咒文为日文原文';
		// 根据状态设置不同颜色
		var magicConfigbtnColor = magicConfigbool ? '#4CAF50' : '#9e9e9e'; // 开=绿色，关=红色
		var magicConfig = `
			<div style="position:relative;display:inline-block;width:200px;">
				<button id="magicConfigBtn"
						onclick="
							lib.config.YB_magicConfig = !lib.config.YB_magicConfig;
							var isOn = lib.config.YB_magicConfig;
							game.YB_magicTranslate(isOn);
							this.textContent = isOn ? '现在咒文音译为中文' : '现在咒文为日文原文';
							this.style.background = isOn ? '#4CAF50' : '#9e9e9e';
							game.saveConfig('YB_magicConfig',lib.config.YB_magicConfig);
						"
						style="background:${magicConfigbtnColor};color:white;padding:10px;border:none;cursor:pointer;width:100%;text-align:left;">
					${magicConfigbooltext}
				</button>
			</div>
		`
		// 初始化按钮状态（如果需要）
		if (typeof lib !== 'undefined' && lib.config) {
			lib.config.YB_magicConfig = lib.config.YB_magicConfig || true;
			game.YB_magicTranslate(lib.config.YB_magicConfig);
		}
	}
	/**
 * 开局根据初始列表设定重置列表

然后根据重置列表设定现存列表

现存列表每一项执行后移除，全部移除后根据重置列表刷新
 */
	lib.translate['ybslj' + '_charactersInfo'] = `
		夜白神略主体武将包<br>
		<li>重置技机制：<br>
		①，简单来说，每项各限一次，用完重置<br>
		②，复杂来说，重置技拥有<span class=firetext>初始列表</span>，<br>
		初始化根据<span class=firetext>初始列表</span>定义<span class=yellowtext>刷新列表</span><br>
		然后再根据<span class=yellowtext>刷新列表</span>设置<span class=thundertext>现存列表</span><br>
		<span class=thundertext>现存列表</span>每项限一次，全部执行后根据<span class=yellowtext>刷新列表</span>重置。
		<li>势极技机制；<br>
		势极技分为<span class=thundertext>势极技阴极</span>和<span class=firetext>势极技阳极</span><br>
		势极技阴极或阳极，在使用之后，会禁用其他同极势极技，并解锁异极势极技<br>
		每回合结束时，解除势极技的禁用。<br>
		在没有异极势极技的情况下，可以近似当作每回合限一次的技能。<br>
		<li>永续转换技机制；<br>
		同普通的转换技，一般为发动后获得一个永续效果，效果消失时才转换<br>
	`;
	lib.translate['ybart' + '_charactersInfo'] = '温馨提示：<br>开启本将包会一并开启“六艺”机制，详情请右键六艺篇查看，简单来说就是全场自带私人木牛流马。<br>因之前有群友反馈，说不喜欢这个机制，因此被我放在这里隔离，开启与否视个人喜好吧';
	lib.translate['ybxh' + '_charactersInfo'] = '校花的贴身高手，很多武将虚位以待，敬请投稿';
	lib.translate['ybdd' + '_charactersInfo'] = '本人接单制作的武将';
	lib.translate['ybnew3' + '_charactersInfo'] = '杂设，部分为闲暇之余的设计，部分为参与其他投稿的落榜之作';
	lib.translate['ybmjz' + '_charactersInfo'] = '夜白自己的界限突破……';
	lib.translate['ybMagic' + '_charactersInfo'] = '理论上应该有武将的，但没设计好呢，再等等<br>'+magicConfig;
	lib.translate['yhky' + '_charactersInfo'] = '永恒刻印，意为永恒的持恒技。不出意外的话，本包武将均为持恒技道心值武将';
	lib.translate['ybllyz' + '_charactersInfo'] = '连招宇宙，以夜白自己设计的连招技框架构成';
	lib.translate['sgstrxs' + '_charactersInfo'] = sgstrxsstr;
	lib.translate['YB_one' + '_charactersInfo'] = '本包本来是我接的单。因金主失联疑似逃单，因此将这组技能代码兼并至此，以期复用。';
	// lib.translate['ybwhjx'+'_charactersInfo']=whjxstr
	lib.translate['ybslc' + '_cardsInfo'] = `
		夜白神略主体卡牌包<br>
		<li>血属性机制：<br>
		造成伤害后，回复等同伤害值的体力值，仅存在血属性时不传导铁索<br>
		<li>雪属性机制：<br>
		造成伤害后，可以令对方翻面并摸X张牌，X为其体力值且至多为5<br>
		<li>新应变：连打<br>
		触发后，此牌额外结算一次<br>
		<li>新应变：寸止<br>
		触发后，此牌少结算一次<br>
		<li>天火煅介绍：<br>
		同马钧精械，使用后，可以选择手牌中可以升级的卡牌进行升级<br>
		除原版精械列表，新增以下公式：<br>
		※黑桃闪电及其替换牌=>阴勾玉，<br>
		※非黑桃闪电、火山、洪水=>阳勾玉，<br>
		※倚天剑=>七星龙渊剑，<br>
		※朱雀羽扇、五行鹤翎扇=>北斗七星扇，<br>
		※青龙偃月刀=>锁龙偃月刀，<br>
		※方天画戟、乌铁锁链=>方天锁链鞭，<br>
		※护心镜=>护心铠，<br>
	`;
	lib.translate['ybgod' + '_cardsInfo'] = 'boss模式卡牌搬运';
	lib.translate['ybnew2' + '_cardsInfo'] = `
		风花雪月<br>
		<li>风属性机制：<br>
		①，此属性可以和其他属性共存，也就是说你可以看到诸如风雷杀，风火属性伤害之类的牌或描述<br>
		②，即将造成风属性伤害的时候，先从伤害的属性中移除风属性，此时标记除受伤角色以外的所有横置角色（代码原理）<br>
		③，②的伤害结算结束后，晚于铁索的结算（避免先把铁索状态解除导致bug），然后对②中标记的角色造成伤害，伤害属性与触发此机制的伤害的属性一致（不过不包含风属性，因为已经通过机制移除了风属性）<br>
		<li>新应变：勠力<br>
		触发后，此牌所有目标进入横置状态。<br>
		<li><br>
		<li>转换卡机制：<br>
		当你需要使用或打出牌时，你可以坍缩一张当前形态未坍缩的转换卡并使用或打出之。转换卡无法成为转化的目标牌。转换卡经使用或打出后转换。<br>
		由于不能变属性，所以看似藤甲有绝对防御，但是朱雀羽扇和火攻也是无限供应……<br>
	`;
	// lib.translate['gujian'+'_charactersInfo']='古剑奇谭，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['hearth'+'_charactersInfo']='炉石传说，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['mtg'+'_'+'charactersInfo']='万智牌，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['ow'+'_charactersInfo']='守望先锋，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['swd'+'_charactersInfo']='轩辕剑，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['xianjian'+'_charactersInfo']='仙剑奇侠传，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['yxs'+'_charactersInfo']='英雄杀，原本体卡包，作者水乎，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'

	// lib.translate['gujian'+'_cardsInfo']='古剑奇谭，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['gwent'+'_cardsInfo']='昆特牌，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略<br>图片貌似不能正确引用，以后再修'
	// lib.translate['hearth'+'_cardsInfo']='炉石传说，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['huanlekapai'+'_cardsInfo']='欢乐卡牌，原本体卡包，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['mtg'+'_cardsInfo']='万智牌，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略<br>图片貌似不能正确引用，以后再修'
	// lib.translate['swd'+'_cardsInfo']='轩辕剑，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	lib.translate['yunchou' + '_cardsInfo'] = '运筹帷幄，原本体卡包，被本体拆了。为确保引用相关内容的稳定性，夜白把这些包放进了夜白神略';
	// lib.translate['yxs'+'_cardsInfo']='英雄杀，原本体卡包，作者水乎，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['zhenfa'+'_cardsInfo']='阵法牌，原本体卡包，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
};
