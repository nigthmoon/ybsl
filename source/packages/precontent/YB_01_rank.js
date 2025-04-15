import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { YBSL_rank }
/**
 * 掌管第五格武将评级和异构加入的数据
 */
const YBSL_rank = function(){
    
	var packages = [
		"ybslj","ybxh","ybdd","ybgod","ybslc","ybart",'ybnew1','ybmjz','yhky'
		// 'YB_one'
	]
	{//修改函数以防止失灵
		// lib.arenaReady.push(function(){
		// 	get.characterIntro=characterIntro;
		// 	get.nodeintro=nodeintro;
		// })
	}
	{//武将第五格评级--------狂神著
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
		lib.arenaReady.push(function(){
			for(var pack of packages){
				for(var name in lib.characterPack[pack]){
					//['junk','common','rare','epic','legend']
					var infoy = lib.characterPack[pack][name][4];
					for(var infox of infoy){
						if(infox.startsWith('rankAdd:')){
							var rarity = infox.slice(8);
							if(lib.rank.rarity[rarity])lib.rank.rarity[rarity].add(name);
						}
						if(infox.startsWith('rankS:')){
							var infoz = infox.slice(6);
							if(lib.rank[infoz])lib.rank[infoz].add(name);
						}
					}
					if(lib.characterPack[pack][name]['rankAdd']){
						var rarity = lib.characterPack[pack][name]['rankAdd'];
						if(lib.rank.rarity[rarity])lib.rank.rarity[rarity].add(name);
						var rarityS = lib.characterPack[pack][name]['rankS'];
						if(lib.rank[rarityS])lib.rank[rarityS].add(name);
					}
				}
			}
		});
	}
	{//y异构加入
		// get.YB_linkTo =function(from,to){
		// 	var char2 = get.sourceCharacter(to);
		// 	if(!lib.characterReplace[char2])lib.characterReplace[char2]=[char2];
		// 	if(!lib.characterReplace[char2].includes(from))lib.characterReplace[char2].push(from);
		// 	return lib.characterReplace[char2];
		// }
		lib.arenaReady.push(function(){
			for(var pack of packages){
				for(var name in lib.characterPack[pack]){
					var infoy = lib.characterPack[pack][name][4];
					for(var infox of infoy){
						if(infox.startsWith('linkTo:')){
							var char = infox.slice(7);
							// get.YB_linkTo(name,char)
							var char2 = get.sourceCharacter(char);
							if(!lib.characterReplace[char2])lib.characterReplace[char2]=[char2];
							if(!lib.characterReplace[char2].includes(name))lib.characterReplace[char2].push(name);
						}
					}
					if(lib.characterPack[pack][name]['linkTo']){
						var linkTo = lib.characterPack[pack][name]['linkTo'];
						// get.YB_linkTo(name,linkTo)
						var char2 = get.sourceCharacter(linkTo);
						if(!lib.characterReplace[char2])lib.characterReplace[char2]=[char2];
						if(!lib.characterReplace[char2].includes(name))lib.characterReplace[char2].push(name);
					}
				}
			}
		})
	}{
		var YB_nodeIntro = get.nodeintro;
		get.nodeintro=function(node,simple,evt){
			var YB_intro = ui.create.dialog("hidden", "notouchscroll");
			if (node.classList.contains("player") && !node.name) {
				return uiintro;
			}
			if(node.classList.contains('player') && node.linkplayer){
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
			} else if (node.classList.contains("character")) {
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
		
							YB_intro.add('<div><div class="skill">' + translation + "</div><div>" + get.skillInfoTranslation(skills[i]) + "</div></div>");
		
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
					if (node.parentNode.classList.contains("menu-buttons")) {
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

			return YB_intro;
		};
		// lib.arenaReady.push(function(){
		// 	for(var pack of packages){
		// 		for(var name in lib.characterPack[pack]){
		// 			//['junk','common','rare','epic','legend']
		// 			var infoy = lib.characterPack[pack][name][4];
		// 			for(var infox of infoy){
		// 				if(infox.startsWith('rankAdd:')){
		// 					var rarity = infox.slice(8);
		// 					if(lib.rank.rarity[rarity])lib.rank.rarity[rarity].add(name);
		// 				}
		// 				if(infox.startsWith('rankS:')){
		// 					var infoz = infox.slice(6);
		// 					if(lib.rank[infoz])lib.rank[infoz].add(name);
		// 				}
		// 			}
		// 			if(lib.characterPack[pack][name]['rankAdd']){
		// 				var rarity = lib.characterPack[pack][name]['rankAdd'];
		// 				if(lib.rank.rarity[rarity])lib.rank.rarity[rarity].add(name);
		// 				var rarityS = lib.characterPack[pack][name]['rankS'];
		// 				if(lib.rank[rarityS])lib.rank[rarityS].add(name);
		// 			}
		// 		}
		// 	}
		// });
	}
}