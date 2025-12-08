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
// import { YBSL_destiny } from './precontent/YB_10_destiny.js'
import { YB_11_cardBrowser } from './precontent/YB_11_cardBrowser.js';
// import { characterIntro,nodeintro } from './function.js';
import { typeimage } from './function.js'
// import { sgstrxs } from '../sgstrxs.js';
// import { cyyydsgs } from '../pile/cyyydsgs.js'
export async function precontent() {
	game.getFileList('extension/夜白神略/source/ext', (folders,files) => {
		// let scriptPaths=[
		// 	'ext/YB_01_character.js','ext/YB_02_character.js','ext/YB_03_character.js','ext/YB_04_character.js',
		// 	'ext/YB_05_card.js','ext/YB_06_card.js','ext/YB_07_card.js','ext/YB_08_character.js','ext/YB_09_character.js',
		// 	'ext/YB_10_character.js','ext/YB_11_character.js','ext/YB_12_character.js','ext/YB_13_character.js',
		// 	// 'ext/YB_01_character.js'
		// ];
		let scriptPaths = files;
		Promise.all(
			scriptPaths.map(path => import('../ext/' + path))
		).then(modules => {
			
		}).catch(error => {
			alert('error '+error+'导入失败 !')
			console.error(error.message);
		});
	})
	// game.getFileList('extension/夜白神略/source/ontology/character', (folders,files) => {
	// 	let scriptPaths = files;
	// 	Promise.all(
	// 		scriptPaths.map(path => {
	// 			lib.init.js(lib.assetURL+'extension/夜白神略/source/ontology/character',path.slice(0,-3));
	// 		})
	// 	).then(modules => {
			
	// 	}).catch(error => {
	// 		alert('error '+error+'导入失败 !')
	// 		console.error(error.message);
	// 	});
	// })
	
	game.getFileList('extension/夜白神略/source/ontology/card', (folders,files) => {
		let scriptPaths = files;
		Promise.all(
			scriptPaths.map(path => {
				lib.init.js(lib.assetURL+'extension/夜白神略/source/ontology/card',path.slice(0,-3))
			})
		).then(modules => {
			
		}).catch(error => {
			alert('error '+error+'导入失败 !')
			console.error(error.message);
		});
	})
	//window.list24
	{
		// lib.translate['gujian_character_config']='古剑奇谭'
		// lib.translate['hearth_character_config']='炉石传说'
		// lib.translate['mtg_character_config']='万智牌'
		// lib.translate['ow_character_config']='守望先锋'
		// lib.translate['swd_character_config']='轩辕剑'
		// lib.translate['xianjian_character_config']='仙剑奇侠传'
		// lib.translate['yxs_character_config']='英雄杀'

		// lib.translate['gujian_card_config']='古剑奇谭'
		// lib.translate['gwent_card_config']='昆特牌'
		// lib.translate['hearth_card_config']='炉石传说'
		// lib.translate['huanlekapai_card_config']='欢乐卡牌'
		// lib.translate['mtg_card_config']='万智牌'
		// lib.translate['swd_card_config']='轩辕剑'
		lib.translate['yunchou_card_config']='运筹帷幄'
		// lib.translate['yxs_card_config']='英雄杀'
		// lib.translate['zhenfa_card_config']='阵法牌'

	}
	// lib.translate['sgstrxs_mode_config'] = '同人'
	// {
	// 	lib.init.js(lib.assetURL+'extension/夜白神略/source/sgstrxs',sgstrxs)
	// }
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
		// YBSL_qianhuan();
		YBSL_ybslf();
		YBSL_update();
		// YBSL_destiny();
		YB_11_cardBrowser();
	}
	lib.arenaReady.push(function(){
		//导入数据
		YBSL_rank();
		YBSL_nature();
		YBSL_trigger();
		YBSL_special();
		YBSL_pinyin();
		YBSL_starmap();
		// YBSL_qianhuan();
		YBSL_ybslf();
		YBSL_update();
		// YBSL_destiny();
		YB_11_cardBrowser();
		{//characterIntro重做
			//characterIntro重做
			/**
			 * 从字符串中提取第一个 HTML/XML 标签及其内容
			 * @param {string} str - 待处理的字符串，可能包含 HTML/XML 标签
			 * @returns {Object} 返回包含以下属性的对象：
			 *   - startTag: {string} 匹配到的开始标签（如 `<div class="test">`），未找到时返回空字符串
			 *   - endTag: {string} 匹配到的结束标签（如 `</div>`），未找到时返回空字符串
			 *   - content: {string} 去除开始标签和结束标签后的纯文本内容
			 * @example
			 * // 返回 { startTag: '<div>', endTag: '</div>', content: 'Hello' }
			 * get.extractFirstTag('<div>Hello</div>');
			 * @example
			 * // 返回 { startTag: '', endTag: '', content: 'No tags' }
			 * get.extractFirstTag('No tags');
			 */
			get.extractFirstTag = function(str) {
				// 匹配第一个开始标签（如 <div> 或 <span class="test">）
				const startTagRegex = /<[^>]+>/;
				const startTagMatch = str.match(startTagRegex);

				// 如果没有开始标签，直接返回原始字符串
				if (!startTagMatch) {
					return { startTag: "", endTag: "", content: str };
				}

				const startTag = startTagMatch[0];
				// 计算开始标签结束后的位置（用于查找结束标签）
				const endTagStart = str.indexOf(startTag) + startTag.length;

				// 在剩余字符串中匹配第一个结束标签（如 </div>）
				const endTagRegex = /<\/[^>]+>/;
				const endTagMatch = str.slice(endTagStart).match(endTagRegex);

				// 如果没有结束标签，返回开始标签和去除标签后的内容
				if (!endTagMatch) {
					return { startTag: startTag, endTag: "", content: str.replace(startTag, "") };
				}

				const endTag = endTagMatch[0];
				// 去除开始标签和结束标签，得到纯文本内容
				const content = str.replace(startTag, "").replace(endTag, "");

				return { startTag, endTag, content };
			}

			get.copyright = function(name,macg){
				if (lib.characterCopyright[name]) {//版权信息
					//判断是否为对象、字符串、数组
					var strx = lib.characterCopyright[name];
					if(macg)strx=macg;
					if (typeof strx == 'object'&&!Array.isArray(strx)) {
						var str = '';
						var list = {
							pack:'武将包',
							num:'武将编号',
							skill:'技能设计',
							code:'代码编写',
							image:'插图',
							voice:'配音',
							icon:'◈',
						}
						if(lib.characterTitle[name]){
							var { startTag, endTag, content } = get.extractFirstTag(lib.characterTitle[name]);
						}
						if(startTag)str+=startTag;
						if(strx['pack'])str+=strx['pack'];
						if(strx['pack']&&strx['num'])str+='-';
						if(strx['num'])str+=strx['num'];
						if(strx['num']&&lib.characterTitle[name])str+='-';
						if(content)str+=content;
						// if(lib.characterTitle[name])str+=lib.characterTitle[name];
						if(endTag)str+=endTag;
						str+='<br>';
						if(!strx['icon'])strx['icon']='◈';
						if(strx['skill']){
							str+=strx['icon']+list['skill']+'：'+strx['skill'];
							str+='<br>';
						}
						if(strx['code']){
							str+=strx['icon']+list['code']+'：'+strx['code'];
							str+='<br>';
						}
						if(strx['image']){
							str+=strx['icon']+list['image']+'：'+strx['image'];
							str+='<br>';
						}
						if(strx['voice']){
							str+=strx['icon']+list['voice']+'：'+strx['voice'];
							str+='<br>';
						}
						return str;
					}
					else if (typeof strx == 'string') {
						var str = '';
						strx = strx.replace(/\n/g, '<br>');
						str += strx;
						str += '<br>';
						return str;
					}
					else {
						var kkk = {
							pack:strx[0],
							num:strx[1],
							skill:strx[2],
							code:strx[3],
							image:strx[4],
							voice:strx[5],
							icon:strx[6],
						}
						return get.copyright(name,kkk);
					}
					// str += lib.characterCopyright[name];
				}
			}
			var YB_characterIntro = get.characterIntro;
			get.characterIntro=function(name){
				var str = '';
				if (lib.characterCopyright[name]) {//版权信息
					// str += lib.characterCopyright[name];
					var cpright = get.copyright(name);
					str += cpright;
					str += '<br>';
				}
				if (lib.characterCitetext[name]) {//上引文
					str += lib.characterCitetext[name];
					str += '<br>';
				}
				if (lib.characterUndertext[name]) {//下引文
					str += lib.characterUndertext[name];
					str += '<br>';
				}
				if (lib.characterLightext[name]&&lib.characterLightext[name](name)) {//缘分点亮
					str += lib.characterLightext[name](name)[lib.characterLightext[name](name).length-1];
					str += '<br>';
				}
				if(lib.accessoryPacket[name]&&lib.accessoryPacket[name].character){
					
					var buttonsx = ui.create.div('.buttons')
					buttonsx.classList.add("smallzoom");
					let buttons = ui.create.buttons(lib.accessoryPacket[name]['character'], "character",buttonsx, "character")
					
					
					const arr = []
					for (const i of buttons) {
						(_status.YB_582267 ??= {})[i.link] = i
						let strx = i.outerHTML
						strx = `${strx.slice(0, 5)}onclick='ui.click.charactercard("${i.link}", null, null, true, _status.YB_582267.${i.link}, "${i.link}")' ${strx.slice(5)}`
						strx = `${strx.slice(0, 5)}ondblclick='ui.click.intro.call(_status.YB_582267.${i.link}, {
							clientX: this.getBoundingClientRect().left + 18,
							clientY: this.getBoundingClientRect().top + 12
						})' ${strx.slice(5)}`
						strx = `${strx.slice(0, 5)}oncontextmenu='ui.click.intro.call(_status.YB_582267.${i.link}, {
							clientX: this.getBoundingClientRect().left + 18,
							clientY: this.getBoundingClientRect().top + 12
						})' ${strx.slice(5)}`
						arr.push(strx)
					}
					arr.reduce((a,b)=>a+b, '')
					str += arr
					str += '<br>';
				}
				return str += YB_characterIntro.apply(this,arguments);
			}
			
		}
		{//nodeintro修复
			var YB_nodeIntro = get.nodeintro;
			get.nodeintro=function(node,simple,evt){
				var YB_intro = ui.create.dialog("hidden", "notouchscroll");
				if (node.classList.contains("player") && !node.name) {
					return YB_intro;
				}
				var i, translation, intro, str;
				if (node._nointro) return;
				if(node.classList.contains('player')&&node.linkplayer&&(lib.characterTitle[node.name]||lib.characterCitetext[node.name]||(lib.characterLightext[node.name1]&&lib.characterLightext[node.name1](node))||lib.characterUndertext[node.name])){
					if (node.linkplayer) {
						node = node.link;
					}
					let capt = get.translation(node.name);
					const characterInfo = get.character(node.name),
						sex = node.sex || characterInfo[0];
					if (sex && sex != "unknown" && lib.config.show_sex) capt += `&nbsp;&nbsp;${sex == "none" ? "无" : get.translation(sex)}`;
					const group = node.group;
					if (group && group != "unknown" && lib.config.show_group) capt += `&nbsp;&nbsp;${get.translation(group)}`;
					YB_intro.add(capt);
			
					if (lib.characterTitle[node.name]) {
						YB_intro.addText(get.colorspan(lib.characterTitle[node.name]));
					}
					if (lib.characterAppend[node.name]) {
						YB_intro.addText(get.colorspan(lib.characterAppend[node.name]));
					}
					if (lib.characterCitetext[node.name]) {
						YB_intro.addText(get.colorspan(lib.characterCitetext[node.name]));
					}
					if (lib.characterLightext[node.name1]&&lib.characterLightext[node.name1](node)) {
						YB_intro.addText(get.colorspan(lib.characterLightext[node.name1](node)[lib.characterLightext[node.name1](node).length-1]));
					}
					// if (lib.characterLightext[node.name1]) {
					// 	YB_intro.addText(get.colorspan(lib.characterLightext[node.name1]()[lib.characterLightext[node.name1].length]));
					// }
					if (get.characterInitFilter(node.name)) {
						const initFilters = get.characterInitFilter(node.name).filter(tag => {
							if (!lib.characterInitFilter[node.name]) return true;
							return lib.characterInitFilter[node.name](tag) !== false;
						});
						if (initFilters.length) {
							const str = initFilters.reduce((strx, stry) => strx + lib.InitFilter[stry] + "<br>", "").slice(0, -4);
							YB_intro.addText(str);
						}
					}
			
					if (!node.noclick) {
						const allShown = node.isUnderControl() || (!game.observe && game.me && game.me.hasSkillTag("viewHandcard", null, node, true));
						const shownHs = node.getShownCards();
						if (shownHs.length) {
							YB_intro.add('<div class="text center">明置的手牌</div>');
							YB_intro.addSmall(shownHs);
							if (allShown) {
								var hs = node.getCards("h");
								hs.removeArray(shownHs);
								if (hs.length) {
									YB_intro.add('<div class="text center">其他手牌</div>');
									YB_intro.addSmall(hs);
								}
							}
						} else if (allShown) {
							var hs = node.getCards("h");
							if (hs.length) {
								YB_intro.add('<div class="text center">手牌</div>');
								YB_intro.addSmall(hs);
							}
						}
					}
			
					var skills = node.getSkills(null, false, false).slice(0);
					var skills2 = game.filterSkills(skills, node);
					if (node == game.me && node.hiddenSkills.length) {
						skills.addArray(node.hiddenSkills);
					}
					for (var i in node.disabledSkills) {
						if (node.disabledSkills[i].length == 1 && node.disabledSkills[i][0] == i + "_awake" && !node.hiddenSkills.includes(i)) {
							skills.add(i);
						}
					}
					for (i = 0; i < skills.length; i++) {
						if (lib.skill[skills[i]] && (lib.skill[skills[i]].nopop || lib.skill[skills[i]].equipSkill)) continue;
						if (lib.translate[skills[i] + "_info"]) {
							if (lib.translate[skills[i] + "_ab"]) translation = lib.translate[skills[i] + "_ab"];
							else {
								translation = get.translation(skills[i]);
								if (!lib.skill[skills[i]].nobracket) translation = `【${translation.slice(0, 2)}】`;
							}
			
							if (node.forbiddenSkills[skills[i]]) {
								var forbidstr = '<div style="opacity:0.5"><div class="skill">' + translation + "</div><div>";
								if (node.forbiddenSkills[skills[i]].length) {
									forbidstr += "（与" + get.translation(node.forbiddenSkills[skills[i]]) + "冲突）<br>";
								} else {
									forbidstr += "（双将禁用）<br>";
								}
								forbidstr += get.skillInfoTranslation(skills[i], node) + "</div></div>";
								YB_intro.add(forbidstr);
							} else if (!skills2.includes(skills[i])) {
								if (lib.skill[skills[i]].preHidden && get.mode() == "guozhan") {
									YB_intro.add('<div><div class="skill" style="opacity:0.5">' + translation + '</div><div><span style="opacity:0.5">' + get.skillInfoTranslation(skills[i], node) + '</span><br><div class="underlinenode on gray" style="position:relative;padding-left:0;padding-top:7px">预亮技能</div></div></div>');
									var underlinenode = YB_intro.content.lastChild.querySelector(".underlinenode");
									if (_status.prehidden_skills.includes(skills[i])) {
										underlinenode.classList.remove("on");
									}
									underlinenode.link = skills[i];
									underlinenode.listen(ui.click.hiddenskill);
								} else YB_intro.add('<div style="opacity:0.5"><div class="skill">' + translation + "</div><div>" + get.skillInfoTranslation(skills[i], node) + "</div></div>");
							} else if (lib.skill[skills[i]].temp || !node.skills.includes(skills[i]) || lib.skill[skills[i]].thundertext) {
								if (lib.skill[skills[i]].frequent || lib.skill[skills[i]].subfrequent) {
									YB_intro.add('<div><div class="skill thundertext thunderauto">' + translation + '</div><div class="thundertext thunderauto">' + get.skillInfoTranslation(skills[i], node) + '<br><div class="underlinenode on gray" style="position:relative;padding-left:0;padding-top:7px">自动发动</div></div></div>');
									var underlinenode = YB_intro.content.lastChild.querySelector(".underlinenode");
									if (lib.skill[skills[i]].frequent) {
										if (lib.config.autoskilllist.includes(skills[i])) {
											underlinenode.classList.remove("on");
										}
									}
									if (lib.skill[skills[i]].subfrequent) {
										for (var j = 0; j < lib.skill[skills[i]].subfrequent.length; j++) {
											if (lib.config.autoskilllist.includes(skills[i] + "_" + lib.skill[skills[i]].subfrequent[j])) {
												underlinenode.classList.remove("on");
											}
										}
									}
									if (lib.config.autoskilllist.includes(skills[i])) {
										underlinenode.classList.remove("on");
									}
									underlinenode.link = skills[i];
									underlinenode.listen(ui.click.autoskill2);
								} else {
									YB_intro.add('<div><div class="skill thundertext thunderauto">' + translation + '</div><div class="thundertext thunderauto">' + get.skillInfoTranslation(skills[i], node) + "</div></div>");
								}
							} else if (lib.skill[skills[i]].frequent || lib.skill[skills[i]].subfrequent) {
								YB_intro.add('<div><div class="skill">' + translation + "</div><div>" + get.skillInfoTranslation(skills[i], node) + '<br><div class="underlinenode on gray" style="position:relative;padding-left:0;padding-top:7px">自动发动</div></div></div>');
								var underlinenode = YB_intro.content.lastChild.querySelector(".underlinenode");
								if (lib.skill[skills[i]].frequent) {
									if (lib.config.autoskilllist.includes(skills[i])) {
										underlinenode.classList.remove("on");
									}
								}
								if (lib.skill[skills[i]].subfrequent) {
									for (var j = 0; j < lib.skill[skills[i]].subfrequent.length; j++) {
										if (lib.config.autoskilllist.includes(skills[i] + "_" + lib.skill[skills[i]].subfrequent[j])) {
											underlinenode.classList.remove("on");
										}
									}
								}
								if (lib.config.autoskilllist.includes(skills[i])) {
									underlinenode.classList.remove("on");
								}
								underlinenode.link = skills[i];
								underlinenode.listen(ui.click.autoskill2);
							} else if (lib.skill[skills[i]].clickable && node.isIn() && node.isUnderControl(true)) {
								var intronode = YB_intro.add('<div><div class="skill">' + translation + "</div><div>" + get.skillInfoTranslation(skills[i], node) + '<br><div class="menubutton skillbutton" style="position:relative;margin-top:5px">点击发动</div></div></div>').querySelector(".skillbutton");
								if (!_status.gameStarted || (lib.skill[skills[i]].clickableFilter && !lib.skill[skills[i]].clickableFilter(node))) {
									intronode.classList.add("disabled");
									intronode.style.opacity = 0.5;
								} else {
									intronode.link = node;
									intronode.func = lib.skill[skills[i]].clickable;
									intronode.classList.add("pointerdiv");
									intronode.listen(ui.click.skillbutton);
								}
							} else {
								YB_intro.add('<div><div class="skill">' + translation + "</div><div>" + get.skillInfoTranslation(skills[i], node) + "</div></div>");
							}
							if (lib.translate[skills[i] + "_append"]) {
								YB_intro._place_text = YB_intro.add('<div class="text">' + lib.translate[skills[i] + "_append"] + "</div>");
							}
						}
					}
					// if(get.is.phoneLayout()){
					// 	var storage=node.storage;
					// 	for(i in storage){
					// 		if(get.info(i)&&get.info(i).intro){
					// 			intro=get.info(i).intro;
					// 			if(node.getSkills().concat(lib.skill.global).includes(i)==false&&!intro.show) continue;
					// 			var name=intro.name?intro.name:get.translation(i);
					// 			if(typeof name=='function'){
					// 				name=name(storage[i],node);
					// 			}
					// 			translation='<div><div class="skill">『'+name.slice(0,2)+'』</div><div>';
					// 			var stint=get.storageintro(intro.content,storage[i],node,null,i);
					// 			if(stint){
					// 				translation+=stint+'</div></div>';
					// 				YB_intro.add(translation);
					// 			}
					// 		}
					// 	}
					// }
					if (lib.characterUndertext[node.name]) {
						YB_intro.addText(get.colorspan(lib.characterUndertext[node.name]));
					}
			
					if (lib.config.right_range && _status.gameStarted) {
						YB_intro.add(ui.create.div(".placeholder"));
						var table, tr, td;
						table = document.createElement("table");
						tr = document.createElement("tr");
						table.appendChild(tr);
						td = document.createElement("td");
						td.innerHTML = "距离";
						tr.appendChild(td);
						td = document.createElement("td");
						td.innerHTML = "手牌";
						tr.appendChild(td);
						td = document.createElement("td");
						td.innerHTML = "行动";
						tr.appendChild(td);
						td = document.createElement("td");
						td.innerHTML = "伤害";
						tr.appendChild(td);
			
						tr = document.createElement("tr");
						table.appendChild(tr);
						td = document.createElement("td");
						if (node == game.me || !game.me || !game.me.isIn()) {
							td.innerHTML = "-";
						} else {
							var dist1 = get.numStr(Math.max(1, game.me.distanceTo(node)));
							var dist2 = get.numStr(Math.max(1, node.distanceTo(game.me)));
							if (dist1 == dist2) {
								td.innerHTML = dist1;
							} else {
								td.innerHTML = dist1 + "/" + dist2;
							}
						}
						tr.appendChild(td);
						td = document.createElement("td");
						let handcardLimit = node.getHandcardLimit();
						td.innerHTML = `${node.countCards("h")}/${handcardLimit >= 114514 ? "∞" : handcardLimit}`;
						tr.appendChild(td);
						td = document.createElement("td");
						td.innerHTML = node.phaseNumber;
						tr.appendChild(td);
						td = document.createElement("td");
			
						(function () {
							num = 0;
							for (var j = 0; j < node.stat.length; j++) {
								if (typeof node.stat[j].damage == "number") num += node.stat[j].damage;
							}
							td.innerHTML = num;
						})();
						tr.appendChild(td);
						table.style.width = "calc(100% - 20px)";
						table.style.marginLeft = "10px";
			
						YB_intro.content.appendChild(table);
						if (!lib.config.show_favourite) {
							table.style.paddingBottom = "5px";
						}
					}
					if (!simple || get.is.phoneLayout()) {
						var es = node.getCards("e");
						for (var i = 0; i < es.length; i++) {
							const special = [es[i]].concat(es[i].cards || []).find(j => j.name == es[i].name && lib.card[j.name]?.cardPrompt);
							var str = special ? lib.card[special.name].cardPrompt(special) : lib.translate[es[i].name + "_info"];
							YB_intro.add('<div><div class="skill">' + es[i].outerHTML + "</div><div>" + str + "</div></div>");
							YB_intro.content.lastChild.querySelector(".skill>.card").style.transform = "";
			
							if (lib.translate[es[i].name + "_append"]) {
								YB_intro.add('<div class="text">' + lib.translate[es[i].name + "_append"] + "</div>");
							}
						}
						var js = node.getCards("j");
						for (var i = 0; i < js.length; i++) {
							if (js[i].viewAs && js[i].viewAs != js[i].name) {
								let html = js[i].outerHTML;
								let cardInfo = lib.card[js[i].viewAs],
									showCardIntro = true;
								if (cardInfo.blankCard) {
									var cardOwner = get.owner(js[i]);
									if (cardOwner && !cardOwner.isUnderControl(true)) showCardIntro = false;
								}
								if (!showCardIntro) {
									html = ui.create.button(js[i], "blank").outerHTML;
								}
								YB_intro.add('<div><div class="skill">' + html + "</div><div>" + lib.translate[js[i].viewAs] + "：" + lib.translate[js[i].viewAs + "_info"] + "</div></div>");
							} else {
								YB_intro.add('<div><div class="skill">' + js[i].outerHTML + "</div><div>" + lib.translate[js[i].name + "_info"] + "</div></div>");
							}
							YB_intro.content.lastChild.querySelector(".skill>.card").style.transform = "";
						}
						if (get.is.phoneLayout()) {
							var markCoutainer = ui.create.div(".mark-container.marks");
							for (var i in node.marks) {
								var nodemark = node.marks[i].cloneNode(true);
								nodemark.classList.add("pointerdiv");
								nodemark.link = node.marks[i];
								nodemark.style.transform = "";
								markCoutainer.appendChild(nodemark);
								nodemark.listen(function () {
									YB_intro.noresume = true;
									var rect = this.link.getBoundingClientRect();
									ui.click.intro.call(this.link, {
										clientX: rect.left + rect.width,
										clientY: rect.top + rect.height / 2,
									});
									if (lib.config.touchscreen) {
										YB_intro._close();
									}
								});
							}
							if (markCoutainer.childElementCount) {
								YB_intro.addText("标记");
								YB_intro.add(markCoutainer);
							}
						}
					}
					if (!game.observe && _status.gameStarted && game.me && node != game.me) {
						ui.throwEmotion = [];
						YB_intro.addText("发送交互表情");
						var click = function () {
							if (_status.dragged) return;
							if (_status.justdragged) return;
							if (_status.throwEmotionWait) return;
							var emotion = this.link;
							if (game.online) {
								game.send("throwEmotion", node, emotion);
							} else game.me.throwEmotion(node, emotion);
							YB_intro._close();
							_status.throwEmotionWait = true;
							setTimeout(
								function () {
									_status.throwEmotionWait = false;
									if (ui.throwEmotion) {
										for (var i of ui.throwEmotion) i.classList.remove("exclude");
									}
								},
								emotion == "flower" || emotion == "egg" ? 500 : 5000
							);
						};
						var td;
						var table = document.createElement("div");
						table.classList.add("add-setting");
						table.style.margin = "0";
						table.style.width = "100%";
						table.style.position = "relative";
						var listi = ["flower", "egg"];
						for (var i = 0; i < listi.length; i++) {
							td = ui.create.div(".menubutton.reduce_radius.pointerdiv.tdnode");
							ui.throwEmotion.add(td);
							if (_status.throwEmotionWait) td.classList.add("exclude");
							td.link = listi[i];
							table.appendChild(td);
							td.innerHTML = "<span>" + get.translation(listi[i]) + "</span>";
							td.addEventListener(lib.config.touchscreen ? "touchend" : "click", click);
						}
						YB_intro.content.appendChild(table);
						table = document.createElement("div");
						table.classList.add("add-setting");
						table.style.margin = "0";
						table.style.width = "100%";
						table.style.position = "relative";
						var listi = ["wine", "shoe"];
						if (game.me.storage.zhuSkill_shanli) listi = ["yuxisx", "jiasuo"];
						for (var i = 0; i < listi.length; i++) {
							td = ui.create.div(".menubutton.reduce_radius.pointerdiv.tdnode");
							ui.throwEmotion.add(td);
							if (_status.throwEmotionWait) td.classList.add("exclude");
							td.link = listi[i];
							table.appendChild(td);
							td.innerHTML = "<span>" + get.translation(listi[i]) + "</span>";
							td.addEventListener(lib.config.touchscreen ? "touchend" : "click", click);
						}
						YB_intro.content.appendChild(table);
					}
					var modepack = lib.characterPack["mode_" + get.mode()];
					if (lib.config.show_favourite && lib.character[node.name] && game.players.includes(node) && (!modepack || !modepack[node.name]) && (!simple || get.is.phoneLayout())) {
						var addFavourite = ui.create.div(".text.center.pointerdiv");
						addFavourite.link = node.name;
						if (lib.config.favouriteCharacter.includes(node.name)) {
							addFavourite.innerHTML = "移除收藏";
						} else {
							addFavourite.innerHTML = "添加收藏";
						}
						addFavourite.listen(ui.click.favouriteCharacter);
						YB_intro.add(addFavourite);
					}
					if (!simple || get.is.phoneLayout()) {
						if ((lib.config.change_skin || lib.skin) && !node.isUnseen()) {
							var num = 1;
							var introadded = false;
							var createButtons = function (num, avatar2) {
								if (!introadded) {
									introadded = true;
									YB_intro.add('<div class="text center">更改皮肤</div>');
								}
								var buttons = ui.create.div(".buttons.smallzoom.scrollbuttons");
								lib.setMousewheel(buttons);
								var nameskin = avatar2 ? node.name2 : node.name1;
								var nameskin2 = nameskin;
								var gzbool = false;
								if (nameskin.startsWith("gz_shibing")) {
									nameskin = nameskin.slice(3, 11);
								} else if (nameskin.startsWith("gz_")) {
									nameskin = nameskin.slice(3);
									gzbool = true;
								}
								for (var i = 0; i <= num; i++) {
									var button = ui.create.div(".button.character.pointerdiv", buttons, function () {
										if (this._link) {
											if (avatar2) {
												lib.config.skin[nameskin] = this._link;
												node.node.avatar2.style.backgroundImage = this.style.backgroundImage;
											} else {
												lib.config.skin[nameskin] = this._link;
												node.node.avatar.style.backgroundImage = this.style.backgroundImage;
											}
										} else {
											delete lib.config.skin[nameskin];
											if (avatar2) {
												if (gzbool && lib.character[nameskin2].hasSkinInGuozhan && lib.config.mode_config.guozhan.guozhanSkin) node.node.avatar2.setBackground(nameskin2, "character");
												else node.node.avatar2.setBackground(nameskin, "character");
											} else {
												if (gzbool && lib.character[nameskin2].hasSkinInGuozhan && lib.config.mode_config.guozhan.guozhanSkin) node.node.avatar.setBackground(nameskin2, "character");
												else node.node.avatar.setBackground(nameskin, "character");
											}
										}
										game.saveConfig("skin", lib.config.skin);
									});
									button._link = i;
									if (i) {
										button.setBackgroundImage("image/skin/" + nameskin + "/" + i + ".jpg");
									} else {
										if (gzbool && lib.character[nameskin2].hasSkinInGuozhan && lib.config.mode_config.guozhan.guozhanSkin) button.setBackground(nameskin2, "character", "noskin");
										else button.setBackground(nameskin, "character", "noskin");
									}
								}
								YB_intro.add(buttons);
							};
							var loadImage = function (avatar2) {
								var img = new Image();
								img.onload = function () {
									num++;
									loadImage(avatar2);
								};
								img.onerror = function () {
									num--;
									if (num) {
										createButtons(num, avatar2);
									}
									if (!avatar2) {
										if (!node.classList.contains("unseen2") && node.name2) {
											num = 1;
											loadImage(true);
										}
									}
								};
								var nameskin = avatar2 ? node.name2 : node.name1;
								var nameskin2 = nameskin;
								var gzbool = false;
								if (nameskin.startsWith("gz_shibing")) {
									nameskin = nameskin.slice(3, 11);
								} else if (nameskin.startsWith("gz_")) {
									nameskin = nameskin.slice(3);
									gzbool = true;
								}
								img.src = lib.assetURL + "image/skin/" + nameskin + "/" + num + ".jpg";
							};
							if (lib.config.change_skin) {
								if (!node.isUnseen(0)) {
									loadImage();
								} else if (node.name2) {
									loadImage(true);
								}
							} else {
								setTimeout(function () {
									var nameskin1 = node.name1;
									var nameskin2 = node.name2;
									if (nameskin1 && nameskin1.startsWith("gz_")) {
										nameskin1 = nameskin1.slice(3);
									}
									if (nameskin2 && nameskin2.startsWith("gz_")) {
										nameskin2 = nameskin2.slice(3);
									}
									if (!node.isUnseen(0) && lib.skin[nameskin1]) {
										createButtons(lib.skin[nameskin1]);
									}
									if (!node.isUnseen(1) && lib.skin[nameskin2]) {
										createButtons(lib.skin[nameskin2], true);
									}
								});
							}
						}
					}
			
					YB_intro.add(ui.create.div(".placeholder.slim"));
				} else if (node.classList.contains("character")&&(lib.characterTitle[node.link]||lib.characterCitetext[node.link]||(lib.characterLightext[node.link]&&lib.characterLightext[node.link](node.link))||lib.characterUndertext[node.link])) {
					const character = node.link,
						characterInfo = get.character(node.link);
					let capt = get.translation(character);
					if (characterInfo) {
						const infoSex = characterInfo[0];
						if (infoSex && lib.config.show_sex) capt += `&nbsp;&nbsp;${infoSex == "none" ? "无" : lib.translate[infoSex]}`;
						const infoGroup = characterInfo[1];
						if (infoGroup && lib.config.show_group) {
							const group = get.is.double(character, true);
							if (group) capt += `&nbsp;&nbsp;${group.map(value => get.translation(value)).join("/")}`;
							else capt += `&nbsp;&nbsp;${lib.translate[infoGroup]}`;
						}
					}
					YB_intro.add(capt);
			
					if (lib.characterTitle[node.link]) {
						YB_intro.addText(get.colorspan(lib.characterTitle[node.link]));
					}
					if (lib.characterAppend[node.link]) {
						YB_intro.addText(get.colorspan(lib.characterAppend[node.link]));
					}
					if (lib.characterCitetext[node.link]) {
						YB_intro.addText(get.colorspan(lib.characterCitetext[node.link]));
					}
					if (lib.characterLightext[node.link]&&lib.characterLightext[node.link](node.link)) {
						YB_intro.addText(get.colorspan(lib.characterLightext[node.link](node.link)[lib.characterLightext[node.link](node.link).length-1]));
					}
			
					if (get.characterInitFilter(node.link)) {
						const initFilters = get.characterInitFilter(node.link).filter(tag => {
							if (!lib.characterInitFilter[node.link]) return true;
							return lib.characterInitFilter[node.link](tag) !== false;
						});
						if (initFilters.length) {
							const str = initFilters.reduce((strx, stry) => strx + lib.InitFilter[stry] + "<br>", "").slice(0, -4);
							YB_intro.addText(str);
						}
					}
			
					if (node._banning) {
						var clickBanned = function () {
							var banned = lib.config[this.bannedname] || [];
							if (banned.includes(character)) {
								banned.remove(character);
							} else {
								banned.push(character);
							}
							game.saveConfig(this.bannedname, banned);
							this.classList.toggle("on");
							if (node.updateBanned) {
								node.updateBanned();
							}
						};
						var modeorder = lib.config.modeorder || [];
						for (var i in lib.mode) {
							modeorder.add(i);
						}
						var list = [];
						YB_intro.contentContainer.listen(function (e) {
							ui.click.touchpop();
							e.stopPropagation();
						});
						for (var i = 0; i < modeorder.length; i++) {
							if (node._banning == "online") {
								if (!lib.mode[modeorder[i]].connect) continue;
								if (!lib.config["connect_" + modeorder[i] + "_banned"]) {
									lib.config["connect_" + modeorder[i] + "_banned"] = [];
								}
							} else if (modeorder[i] == "connect" || modeorder[i] == "brawl") {
								continue;
							}
							if (lib.config.all.mode.includes(modeorder[i])) {
								list.push(modeorder[i]);
							}
						}
						var page = ui.create.div(".menu-buttons.configpopped", YB_intro.content);
						var banall = false;
						for (var i = 0; i < list.length; i++) {
							var cfg = ui.create.div(".config", lib.translate[list[i]] + "模式", page);
							cfg.classList.add("toggle");
							if (node._banning == "offline") {
								cfg.bannedname = list[i] + "_banned";
							} else {
								cfg.bannedname = "connect_" + list[i] + "_banned";
							}
							cfg.listen(clickBanned);
							ui.create.div(ui.create.div(cfg));
							var banned = lib.config[cfg.bannedname] || [];
							if (!banned.includes(character)) {
								cfg.classList.add("on");
								banall = true;
							}
						}
						if (node._banning == "offline") {
							var cfg = ui.create.div(".config", "随机选将可用", page);
							cfg.classList.add("toggle");
							cfg.listen(function () {
								this.classList.toggle("on");
								if (this.classList.contains("on")) {
									lib.config.forbidai_user.remove(character);
								} else {
									lib.config.forbidai_user.add(character);
								}
								game.saveConfig("forbidai_user", lib.config.forbidai_user);
							});
							ui.create.div(ui.create.div(cfg));
							if (!lib.config.forbidai_user.includes(character)) {
								cfg.classList.add("on");
							}
						}
						ui.create.div(".menubutton.pointerdiv", banall ? "全部禁用" : "全部启用", YB_intro.content, function () {
							if (this.innerHTML == "全部禁用") {
								for (var i = 0; i < page.childElementCount; i++) {
									if (page.childNodes[i].bannedname && page.childNodes[i].classList.contains("on")) {
										clickBanned.call(page.childNodes[i]);
									}
								}
								this.innerHTML = "全部启用";
							} else {
								for (var i = 0; i < page.childElementCount; i++) {
									if (page.childNodes[i].bannedname && !page.childNodes[i].classList.contains("on")) {
										clickBanned.call(page.childNodes[i]);
									}
								}
								this.innerHTML = "全部禁用";
							}
						}).style.marginTop = "-10px";
						ui.create.div(".placeholder.slim", YB_intro.content);
					} else {
						var skills = get.character(character, 3);
						for (i = 0; i < skills.length; i++) {
							if (lib.translate[skills[i] + "_info"]) {
								if (lib.translate[skills[i] + "_ab"]) translation = lib.translate[skills[i] + "_ab"];
								else {
									translation = get.translation(skills[i]);
									if (!lib.skill[skills[i]].nobracket) translation = `【${translation.slice(0, 2)}】`;
								}
			
								YB_intro.add('<div><div class="skill">' + translation + "</div><div>" + get.skillInfoTranslation(skills[i],null, false) + "</div></div>");
			
								if (lib.translate[skills[i] + "_append"]) {
									YB_intro._place_text = YB_intro.add('<div class="text">' + lib.translate[skills[i] + "_append"] + "</div>");
								}
							}
						}
						var modepack = lib.characterPack["mode_" + get.mode()];
						if (lib.config.show_favourite && lib.character[node.link] && (!modepack || !modepack[node.link]) && (!simple || get.is.phoneLayout())) {
							var addFavourite = ui.create.div(".text.center.pointerdiv");
							addFavourite.link = node.link;
							addFavourite.style.marginBottom = "15px";
							if (lib.config.favouriteCharacter.includes(node.link)) {
								addFavourite.innerHTML = "移除收藏";
							} else {
								addFavourite.innerHTML = "添加收藏";
							}
							addFavourite.listen(ui.click.favouriteCharacter);
							YB_intro.add(addFavourite);
						} else {
							YB_intro.add(ui.create.div(".placeholder.slim"));
						}
						var addskin = false;
						if (node.parentNode?.classList?.contains("menu-buttons")) {
							addskin = !lib.config.show_charactercard;
						} else {
							addskin = lib.config.change_skin || lib.skin;
						}
						if (addskin && (!simple || get.is.phoneLayout())) {
							var num = 1;
							var introadded = false;
							var nameskin = node.link;
							var nameskin2 = nameskin;
							var gzbool = false;
							if (nameskin.startsWith("gz_shibing")) {
								nameskin = nameskin.slice(3, 11);
							} else if (nameskin.startsWith("gz_")) {
								nameskin = nameskin.slice(3);
								gzbool = true;
							}
							var createButtons = function (num) {
								if (!num) return;
								if (!introadded) {
									introadded = true;
									YB_intro.add('<div class="text center">更改皮肤</div>');
								}
								var buttons = ui.create.div(".buttons.smallzoom.scrollbuttons");
								lib.setMousewheel(buttons);
								for (var i = 0; i <= num; i++) {
									var button = ui.create.div(".button.character.pointerdiv", buttons, function () {
										if (this._link) {
											lib.config.skin[nameskin] = this._link;
											node.style.backgroundImage = this.style.backgroundImage;
											game.saveConfig("skin", lib.config.skin);
										} else {
											delete lib.config.skin[nameskin];
											if (gzbool && lib.character[nameskin2].hasSkinInGuozhan && lib.config.mode_config.guozhan.guozhanSkin) node.setBackground(nameskin2, "character");
											else node.setBackground(nameskin, "character");
											game.saveConfig("skin", lib.config.skin);
										}
									});
									button._link = i;
									if (i) {
										button.setBackgroundImage("image/skin/" + nameskin + "/" + i + ".jpg");
									} else {
										if (gzbool && lib.character[nameskin2].hasSkinInGuozhan && lib.config.mode_config.guozhan.guozhanSkin) button.setBackground(nameskin2, "character", "noskin");
										else button.setBackground(nameskin, "character", "noskin");
									}
								}
								YB_intro.add(buttons);
							};
							var loadImage = function () {
								var img = new Image();
								img.onload = function () {
									num++;
									loadImage();
								};
								img.onerror = function () {
									num--;
									createButtons(num);
								};
								img.src = lib.assetURL + "image/skin/" + nameskin + "/" + num + ".jpg";
							};
							if (lib.config.change_skin) {
								loadImage();
							} else {
								setTimeout(function () {
									createButtons(lib.skin[nameskin]);
								});
							}
						}
					}
					if (lib.characterUndertext[node.link]) {
						YB_intro.addText(get.colorspan(lib.characterUndertext[node.link]));
					}
				}
				else {
					YB_intro = YB_nodeIntro.apply(this,arguments)
				}
				YB_intro.style.width = '358px'
				return YB_intro;
			};
		}
		{//YB_promot
			
			get.YB_prompt2=function (skill, target, player) {
				var str = get.prompt.apply(this, arguments);
				if (!lib.translate[skill + "_info"]&&!lib.translate[skill + "_info"]) {
					return str;
				}
				if(lib.dynamicTranslate[skill]&&lib.dynamicTranslate[skill]!=undefined)return "###" + str + "###" + '<br>'+lib.dynamicTranslate[skill](player);
				return "###" + str + "###" + '<br>'+lib.translate[skill + "_info"];
			}
		}
		{// 千幻换肤相关
			if(!lib.qhlypkg){
				lib.qhlypkg=[];
			}
			// var packages = [
			// 	"ybslj","ybxh","ybdd","ybgod","ybslc","ybart",'ybnew1','ybmjz','yhky','sgstrxs','ybMagic'
			// 	// 'YB_one'
			// ]
			// var packagesx = [
			// 	"ybslj","ybxh","ybdd","ybgod","ybslc","ybart",'ybnew1','ybmjz','yhky','sgstrxs','ybMagic'
			// 	// 'YB_one'
			// ]
			var packagesx = {
				'ybslj':'ybsl001',
				'ybart':'ybsl001',
				'ybxh':'ybsl003',
				'ybnew1':'ybsl004',
				'ybmjz':'ybsl008',
				'ybdd':'ybsl009',
				'ybMagic':'ybsl010',
				'yhky':'ybsl011',
				'sgstrxs':'ybsl012',
				'ybwhjx':'ybsl013',
				'ybnew3':'ybsl004',
			}
			// var listxxxxx= [];
			for(var i in packagesx){
				lib.qhlypkg.push({
					isExt:true,//是否是扩展，一般填true
					filterCharacter:function(name){
						// var qianzhui=[
						// 	'dzsl_','dzsp_','ybsl_','ybsp_','db_ybsl_','db_ybsp_',
						// 	'ybslshen_','sgsh_','ssj_ybxh_','North_','ybnb_','ybart_',
						// 	'ybmo_','ybhao_','ybdi_','ybhaoshen_','ybsc_',
						// ];
						// for(var i=0;i<qianzhui.length;i++){
						// 	if(name.indexOf(qianzhui[i])==0) return true;
						// }
						if(!lib.characterPack[i])return ;
						if(lib.characterPack[i][name])return true;
						//判断此ID的武将是否属于此皮肤包。推荐用前缀判断。
						//在这里不判断直接返回true是很没有武德的行为，可能覆盖别人的扩展配置。
					},
					prefix:`extension/夜白神略/image/${packagesx[i]}/`,//原皮前缀，标识原皮肤的位置。
					skin:{
						standard:'extension/夜白神略/skin/standard/',//可切换普通皮肤的前缀
					},
					audioOrigin:'extension/夜白神略/audio/character/',//原技能配音位置
					audio:'extension/夜白神略/skin/audio/',//切换皮肤后的技能配音位置
	
				});
			}
			// lib.qhlypkg.push({
			// 	isExt:true,//是否是扩展，一般填true
			// 	filterCharacter:function(name){
			// 		// var qianzhui=[
			// 		// 	'dzsl_','dzsp_','ybsl_','ybsp_','db_ybsl_','db_ybsp_',
			// 		// 	'ybslshen_','sgsh_','ssj_ybxh_','North_','ybnb_','ybart_',
			// 		// 	'ybmo_','ybhao_','ybdi_','ybhaoshen_','ybsc_',
			// 		// ];
			// 		// for(var i=0;i<qianzhui.length;i++){
			// 		// 	if(name.indexOf(qianzhui[i])==0) return true;
			// 		// }
					
			// 		//判断此ID的武将是否属于此皮肤包。推荐用前缀判断。
			// 		//在这里不判断直接返回true是很没有武德的行为，可能覆盖别人的扩展配置。
			// 	},
			// 	// prefix:'extension/夜白神略/image/character/',//原皮前缀，标识原皮肤的位置。
			// 	skin:{
			// 		standard:'extension/夜白神略/skin/standard/',//可切换普通皮肤的前缀
			// 	},
			// 	audioOrigin:'extension/夜白神略/audio/character/',//原技能配音位置
			// 	audio:'extension/夜白神略/skin/audio/',//切换皮肤后的技能配音位置
			// });
		}
	})
	//嗨梨相关的整理完后挪到对应将包
	//蓄力点改蓝条
	lib.arenaReady.push(function () {
		if(lib.config.extension_夜白神略_夜白神略的蓄力点改蓝条==true){
			/**
			 * 获得蓄力点
			 * @param { number } [num = 1] 获得蓄力点数
			 * @param { boolean } [log] false: 不进行广播
			 */
			lib.element.player.addCharge = function(num, log) {
				if (typeof num != "number" || !num) {
					num = 1;
				}
				let maxCharge = this.getMaxCharge();
				if (maxCharge == Infinity) {
					this.addMark("charge", num, log);
				} else {
					num = Math.min(num, maxCharge - this.countMark("charge"));
					if (num > 0) {
						this.addMark("charge", num, log);
					}
				}
				this.YB_updateCharge();
			}
			/**
			 * 移去蓄力点
			 * @param { number } [num = 1] 移去蓄力点数
			 * @param { boolean } [log] false: 不进行广播
			 */
			lib.element.player.removeCharge= function(num, log) {
				if (typeof num != "number" || !num) {
					num = 1;
				}
				num = Math.min(num, this.countMark("charge"));
				if (num > 0) {
					this.removeMark("charge", num, log);
				}
				this.YB_updateCharge();
			}
			/**
			 * 返回玩家的蓄力点数
			 * @param { boolean } [max] true: 返回当前蓄力点与上限之差
			 * @returns { number }
			 */
			lib.element.player.countCharge= function(max) {
				if (max) {
					if (this.getMaxCharge() == Infinity) {
						return Infinity;
					}
					return this.getMaxCharge() - this.countMark("charge");
				}
				return this.countMark("charge");
			}
			/**
			 * 获取蓄力点上限
			 */
			lib.element.player.getMaxCharge= function() {
				let skills = game.expandSkills(this.getSkills().concat(lib.skill.global));
				let max = 0;
				for (let skill of skills) {
					let info = get.info(skill);
					if (!info || !info.chargeSkill || typeof info.chargeSkill != "number") {
						continue;
					}
					if (info.chargeSkill == Infinity) {
						return Infinity;
					}
					max += info.chargeSkill;
				}
				max = game.checkMod(this, max, "maxCharge", this);
				return max;
			}
			// lib.skill._YB_updateCharge = {
			// 	ruleSkill:true,
			// 	direct:true,
			// 	trigger:{
			// 		player:['addChargeAfter','removeChargeAfter'],
			// 	},
			// 	content(){
			// 		player.YB_updateCharge();
			// 	}
			// }
			/**
			 * 更新蓄力条
			 */
			lib.element.player.YB_updateCharge = function(){
				const player = this;
				game.broadcastAll(
					function(player){
						if (!player.charge) {
							player.charge = ui.create.div('.mana_nengliangtiao', player);
							ui.create.div('.mana_jindutiao', player.charge);
						}
						const mana_jindutiao = player.charge.firstChild;
						const v = player.countMark('charge') / player.getMaxCharge();
						if (player.dataset.position == 0) {
							mana_jindutiao.style.width = `${100 * v}%`;
							mana_jindutiao.style.height = `100%`;
							mana_jindutiao.innerHTML = '<span style="font-size:19px;color: black;text-shadow:0px 0px 5px #ff0;">'+player.countMark('charge')+'/'+player.getMaxCharge()+'</span>';
						}
						else {
							mana_jindutiao.style.width = `100%`;
							mana_jindutiao.style.height = `${100 * v}%`;
							mana_jindutiao.innerHTML = '<span style="font-size:19px;color: black;text-shadow:0px 0px 5px #ff0;">'+player.getMaxCharge()+'<br>/<br>'+player.countMark('charge')+'</span>';
						}
						
					},
					player
				)
			}
			/**修改蓄力（没用上） */
			lib.skill.charge= {
				markimage: "image/card/charge.png",
				intro: {
					content(storage, player) {
						let max = player.getMaxCharge();
						if (max == Infinity) {
							max = "∞";
						}
						return `当前蓄力点数：${storage}/${max}`;
					},
				},
			}
			
		}
	})



	lib.arenaReady.push(function () {
		if (lib.config.extension_云中守望_enable==true) {
			lib.character['dzsl_014liutianyu'].isUnseen=true
			lib.character['ybmjz_shen_caopi'].isUnseen=true
		}
	})
	get.typeimage=typeimage;
	// HTMLDivElement.prototype.ybsl_setBackground = HTMLDivElement.prototype.setBackground;
    // HTMLDivElement.prototype.setBackground = function (name, type, ext, subfolder) {
    //   if(type == 'character'){
	// 	if(this.classList.contains('character') && this.classList.contains('button')){
	// 	  // @ts-ignore
	// 	  return this.ybsl_setBackground.apply(this, arguments);
	// 	}
    //   }
    // };
	// lib.arenaReady.push(function(){
	// 	var packages = [
	// 		"ybslj","ybxh","ybdd","ybgod","ybslc","ybart",'ybnew1','ybmjz','yhky','sgstrxs','ybMagic'
	// 		// 'YB_one'
	// 	]
	// 	for(var k of packages){
	// 		var pagename = lib.characterPack[k];
	// 		for(var i in pagename){
	// 			if(Array.isArray(pagename[i])){
	// 				var infoy = pagename[i][4];
	// 				for(var infox of infoy){
	// 					if(infox.startsWith('YB_mjz:')){
	// 						var char = infox.slice(7);
	// 						var name = get.YB_characterImage(char);
	// 						pagename[i].img = `img:${name}`;
	// 						// pagename.character[i][4].push(`die:../../audio/die/${char}.mp3`);
	// 					}
	// 				}
	// 			}
	// 			else {
	// 				if(pagename[i].YB_mjz){
	// 					var infoy = pagename[i].YB_mjz;
	// 					var name = get.YB_characterImage(infoy);
	// 					pagename[i].img = `img:${name}`;
	// 					// pagename.character[i].die = `ext:../../audio/die/${infoy}.mp3`;
	// 				}
	// 			}
	// 		} 
			
	// 	}
	// })
	// lib.arenaReady.push(function () {
	// 	if(lib.brawl){
	// 		lib.brawl.YB_lieguizhizhan = {
	// 			name:'猎鬼之战',
	// 			mode:'versus',

	// 		}
	// 	}	
	// })
	// cyyydsgs();
}