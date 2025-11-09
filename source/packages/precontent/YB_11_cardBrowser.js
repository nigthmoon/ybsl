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
			"ybslj", "ybxh", "ybdd", "ybgod", "ybslc", "ybart", 'ybnew1', 'ybmjz', 'yhky', 'sgstrxs', 'ybMagic','ybnew3'
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
	if (false) {
		if (lib.brawl) lib.brawl.YB_wuhunjuexing = {

			name: "武魂觉醒",
			mode: "identity",
			intro: ["杀死所有其他角色，成为最后的存活者", "所有角色改为四血白板，依靠对局行为获得魂力。魂力达到阈值可以增加属性以及获得魂技"],
			showcase: function (init) {
				if (init) {
					this.nodes = [];
				} else {
					while (this.nodes.length) {
						this.nodes.shift().remove();
					}
				}
				var lx = this.offsetWidth / 2 - 120;
				var ly = Math.min(lx, this.offsetHeight / 2 - 60);
				var setPos = function (node) {
					var i = node.index;
					var deg = (Math.PI / 4) * i;
					var dx = Math.round(lx * Math.cos(deg));
					var dy = Math.round(ly * Math.sin(deg));
					node.style.transform = "translate(" + dx + "px," + dy + "px)";
				};
				var characterz = ["guyong", "litong", "mazhong", "fuwan", "chengpu", "liaohua", "xinxianying", "liuyu"];
				for (var i = 0; i < 8; i++) {
					var node = ui.create.player(null, true);
					this.nodes.push(node);
					node.init(characterz[i]);
					node.classList.add("minskin");
					node.node.marks.remove();
					node.node.hp.remove();
					node.node.count.remove();
					node.style.left = "calc(50% - 60px)";
					node.style.top = "calc(50% - 60px)";
					node.index = i;
					node.style.borderRadius = "100%";
					node.node.avatar.style.borderRadius = "100%";
					node.node.name.remove();
					setPos(node);
					this.appendChild(node);
				}
				var nodes = this.nodes;
				this.showcaseinterval = setInterval(function () {
					for (var i = 0; i < nodes.length; i++) {
						nodes[i].index++;
						if (nodes[i].index > 7) {
							nodes[i].index = 0;
						}
						setPos(nodes[i]);
					}
				}, 1000);
			},
			init: function () {
				lib.element.player.YB_hunliLevel;
				lib.element.player.addHunli = function (num) {
					var player = this;
					var numb = player.YB_hunliLevel;
					if (player.countMark('_YB_hunli') >= player.YB_maxHunli(numb)) {
						var str = numb >= 9 ? '魂力达到了世间巅峰' : '魂力达到了上限，请吸收魂环';
						game.log(player, str);
					}
					else {
						if (player.YB_maxHunli(numb) - player.countMark('_YB_hunli') < num) {
							num = player.YB_maxHunli(numb) - player.countMark('_YB_hunli');
						}
						player.addMark(num);
					}
				}
				lib.element.player.YB_maxHunli = function (numb) {
					var player = this;
					var num = numb || player.YB_hunliLevel || 0;
					var list = [10, 30, 60, 100, 150, 210, 280, 360, 450, 550,];
					return list[num];
				}
				lib.element.player.YB_hunliLevelUp = function () {
					if (!player.YB_hunliLevel) player.YB_hunliLevel = 0;
					player.YB_hunliLevel++;
				}
				lib.skill._YB_hunli = {
					mark: true,
					marktext: '魂',
					intro: {
						name: '魂力',
						content(storage, player, skill) {
							var numb = player.YB_hunliLevel;
							return '<li>当前魂力<li>' + player.countMark('_YB_hunli') + '/' + player.YB_maxHunli(numb);
						},
					},
				}
			},
			content: {
				submode: "normal",
				chooseCharacterBefore: function () {
					game.identityVideoName = "武魂觉醒";
					var skills = [];
					var banned = [
						"xinfu_guhuo",
						"reguhuo",
						"jixi",
						"duanchang",
						"huashen",
						"xinsheng",
						"rehuashen",
						"rexinsheng",
						"jinqu",
						"nzry_binglve",
						"nzry_huaiju",
						"nzry_yili",
						"nzry_zhenglun",
						"nzry_mingren",
						"nzry_zhenliang",
						"drlt_qingce",
						"new_wuhun",
						"qixing",
						"kuangfeng",
						"dawu",
						"baonu",
						"wumou",
						"ol_wuqian",
						"ol_shenfen",
						"renjie",
						"jilue",
						"nzry_junlve",
						"nzry_dinghuo",
						"drlt_duorui",
						"chuanxin",
						"cunsi",
						"jueqing",
						"huilei",
						"paiyi",
						"fuhun",
						"zhuiyi",
						"olddanshou",
						"yanzhu",
						"juexiang",
						"jiexun",
						"bizhuan",
						"tongbo",
						"xinfu_zhanji",
						"xinfu_jijun",
						"xinfu_fangtong",
						"xinfu_qianchong",
						"pdgyinshi",
						"shuliang",
						"zongkui",
						"guju",
						"bmcanshi",
						"dingpan",
						"xinfu_lingren",
						"new_luoyan",
						"junwei",
						"gxlianhua",
						"qizhou",
						"fenyue",
						"dianhu",
						"linglong",
						"fenxin",
						"mouduan",
						"cuorui",
						"xinmanjuan",
						"xinfu_jianjie",
						"jianjie_faq",
						"new_meibu",
						"xinfu_xingzhao",
						"jici",
						"xianfu",
						"fenyong",
						"xuehen",
						"midao",
						"yishe",
						"yinbing",
						"juedi",
						"bushi",
						"xinfu_dianhua",
						"xinfu_falu",
						"xinfu_zhenyi",
						"lskuizhu",
						"pingjian",
						"xjshijian",
						"fentian",
						"zhiri",
						"xindan",
						"xinzhengnan",
						"xinfu_xiaode",
						"komari_xueshang",
						"qiaosi_map",
					];
					var characters = [];
					for (var name in lib.character) {
						if (!lib.character[name]) {
							continue;
						}
						if (lib.filter.characterDisabled(name)) {
							continue;
						}
						if (name.indexOf("old_") == 0) {
							continue;
						}
						var skillsx = lib.character[name][3].slice(0);
						lib.character[name].hp = 4;
						lib.character[name].maxHp = 4;
						lib.character[name].hujia = 0;
						lib.character[name].skills = [];
						lib.character[name].hasHiddenSkill = false;
						characters.push(name);
						var list = skillsx.slice(0);
						for (var j = 0; j < skillsx.length; j++) {
							var info = get.info(skillsx[j]);
							if (!info) {
								skillsx.splice(j, 1);
								list.splice(j--, 1);
								continue;
							}
							if (typeof info.derivation == "string") {
								list.push(info.derivation);
							} else if (Array.isArray(info.derivation)) {
								list.addArray(info.derivation);
							}
						}
						for (var j = 0; j < list.length; j++) {
							if (skills.includes(list[j]) || banned.includes(list[j])) {
								continue;
							}
							var info = get.info(list[j]);
							if (!info || info.zhuSkill || info.juexingji || info.charlotte || info.limited || info.hiddenSkill || info.dutySkill || info.groupSkill || (info.ai && info.ai.combo)) {
								continue;
							}
							skills.push(list[j]);
						}
					}
					_status.characterlist = characters;
					var pack = {
						skills: skills,
						pack: {
							card: {
								hhzz_toulianghuanzhu: {
									enable: true,
									cardimage: "toulianghuanzhu",
									recastable: true,
									type: "trick",
									filterTarget: function (card, player, target) {
										return target.skillH.length > 0;
									},
									content: function () {
										target.removeSkillH(target.skillH.randomGet());
										var skills = lib.huanhuazhizhan.skills;
										skills.randomSort();
										for (var i = 0; i < skills.length; i++) {
											if (!target.skillH.includes(skills[i])) {
												target.addSkillH(skills[i]);
												break;
											}
										}
									},
									ai: {
										order: 10,
										result: {
											target: function () {
												return 0.5 - Math.random();
											},
										},
									},
								},
								hhzz_fudichouxin: {
									enable: true,
									cardimage: "fudichouxin",
									type: "trick",
									filterTarget: function (card, player, target) {
										return target.skillH.length > 0;
									},
									content: function () {
										target.removeSkillH(target.skillH.randomGet());
									},
									ai: {
										order: 10,
										result: { target: -1 },
									},
								},
							},
							character: {
								hhzz_shiona: {
									sex: "female",
									group: "key",
									hp: 1,
									skills: ["hhzz_huilei"],
								},
								hhzz_kanade: {
									sex: "female",
									group: "key",
									hp: 2,
									skills: ["hhzz_youlian"],
								},
								hhzz_takaramono1: {
									sex: "male",
									group: "qun",
									hp: 5,
									skills: ["hhzz_jubao", "hhzz_huizhen"],
								},
								hhzz_takaramono2: {
									sex: "male",
									group: "qun",
									hp: 3,
									skills: ["hhzz_jubao", "hhzz_zhencang"],
								},
							},
							skill: {
								_lingli_damage: {
									trigger: { source: "damage" },
									forced: true,
									popup: false,
									filter: function (event, player) {
										return event.player == player._toKill;
									},
									content: function () {
										game.log(player, "对击杀目标造成了伤害");
										player.changeLingli(trigger.num);
									},
								},
								_lingli: {
									mark: true,
									marktext: "灵",
									popup: "聚灵",
									intro: {
										name: "灵力",
										content: "当前灵力点数：# / 5",
									},
									trigger: {
										player: "phaseBeginStart",
									},
									prompt: "是否消耗2点灵力获得一个技能？",
									filter: function (event, player) {
										return player.storage._lingli > 1;
									},
									check: function (event, player) {
										return player.skillH.length < 3;
									},
									content: function () {
										"step 0";
										player.changeLingli(-2);
										"step 1";
										event.skills = lib.huanhuazhizhan.skills;
										var skills = event.skills;
										skills.randomSort();
										var list = [];
										for (var i = 0; i < skills[i].length; i++) {
											if (!player.skillH.includes(skills[i])) {
												list.push(skills[i]);
											}
											if (list.length == 3) {
												break;
											}
										}
										if (!list.length) {
											event.finish();
											return;
										}
										if (player.storage._lingli > 0) {
											list.push("刷新");
										}
										event.list = list;
										var dialog = game.getSkillDialog(event.list, "选择获得一个技能");
										player.chooseControl(event.list).set("ai", function () {
											return 0;
										}).dialog = dialog;
										"step 2";
										if (result.control == "刷新") {
											player.changeLingli(-1);
											event.goto(1);
											return;
										}
										event.skill = result.control;
										if (player.skillH.length == 3) {
											event.lose = true;
											player.chooseControl(player.skillH).prompt = "选择失去1个已有技能";
										}
										"step 3";
										if (event.lose) {
											player.removeSkillH(result.control);
										}
										player.addSkillH(event.skill);
									},
								},
								_lingli_round: {
									trigger: { global: "roundStart" },
									forced: true,
									popup: false,
									filter: function (event, player) {
										return _status._aozhan != true && game.roundNumber > 1;
									},
									content: function () {
										player.changeLingli(1);
									},
								},
								_lingli_draw: {
									enable: "phaseUse",
									filter: function (event, player) {
										return player.storage._lingli > 0;
									},
									content: function () {
										player.changeLingli(-1);
										player.draw();
									},
									delay: 0,
									ai: {
										order: 10,
										result: {
											player: function (player) {
												return player.storage._lingli - 2 * (3 - player.skillH.length) > 0 ? 1 : 0;
											},
										},
									},
								},
								_lingli_save: {
									trigger: { target: "useCardToTargeted" },
									forced: true,
									popup: false,
									filter: function (event, player) {
										return event.card.name == "tao" && player == event.player._toSave;
									},
									content: function () {
										game.log(trigger.player, "帮助了保护目标");
										trigger.player.changeLingli(1);
									},
								},
								_hhzz_qiankunbagua: {
									trigger: { player: "phaseAfter" },
									forced: true,
									forceDie: true,
									popup: false,
									filter: function (event, player) {
										return (_status._aozhan && !player.getStat("damage") && player.isAlive()) || event._lastDead != undefined;
									},
									content: function () {
										"step 0";
										if (_status._aozhan && !player.getStat("damage")) {
											player.loseHp();
											player.changeLingli(1);
											game.log(player, "本回合内未造成伤害，触发死战模式惩罚");
										}
										if (trigger._lastDead == undefined) {
											event.goto(2);
										}
										"step 1";
										var type = get.rand(1, 8);
										event.type = type;
										trigger._lastDead.playerfocus(1200);
										player.$fullscreenpop("乾坤八卦·" + ["离", "坎", "乾", "震", "兑", "艮", "巽", "坤"][type - 1], get.groupnature(trigger._lastDead.group, "raw"));
										game.delay(1.5);
										"step 2";
										var type = event.type;
										switch (type) {
											case 1: {
												game.countPlayer(function (current) {
													current.loseHp();
												});
												break;
											}
											case 2: {
												game.countPlayer(function (current) {
													current.draw(2, "nodelay");
												});
												break;
											}
											case 3: {
												trigger._lastDead.revive(3);
												trigger._lastDead.draw(3);
												break;
											}
											case 4: {
												game.countPlayer(function (current) {
													var he = current.getCards("he");
													if (he.length) {
														current.discard(he.randomGet()).delay = false;
													}
												});
												break;
											}
											case 5: {
												game.countPlayer(function (current) {
													current.changeLingli(1);
												});
												break;
											}
											case 6: {
												var cards = [];
												game.countPlayer(function (current) {
													var card = get.cardPile(function (card) {
														return !cards.includes(card) && get.type(card) == "equip";
													});
													if (card) {
														cards.push(card);
														current.$gain(card, "gain2");
														current.gain(card);
													}
												});
												break;
											}
											case 7: {
												game.countPlayer(function (current) {
													if (current.skillH.length < 3) {
														var skills = lib.huanhuazhizhan.skills;
														skills.randomSort();
														for (var i = 0; i < skills.length; i++) {
															if (!current.skillH.includes(skills[i])) {
																current.addSkillH(skills[i]);
																break;
															}
														}
													}
												});
												break;
											}
											case 8: {
												trigger._lastDead.revive(null, false);
												trigger._lastDead.uninit();
												trigger._lastDead.init(["hhzz_shiona", "hhzz_kanade", "hhzz_takaramono1", "hhzz_takaramono2"].randomGet());
												trigger._lastDead.skillH = lib.character[trigger._lastDead.name][3].slice(0);
												trigger._lastDead.addSkill("hhzz_noCard");
												break;
											}
										}
										"step 3";
										if (game.playerx().length <= 4 && !_status._aozhan) {
											game.countPlayer2(function (current) {
												delete current._toKill;
												delete current._toSave;
											});
											ui.huanhuazhizhan.innerHTML = "死战模式";
											_status._aozhan = true;
											game.playBackgroundMusic();
											trigger._lastDead.$fullscreenpop("死战模式", get.groupnature(trigger._lastDead.group, "raw") || "fire");
										} else {
											game.randomMission();
										}
									},
								},
								hhzz_noCard: {
									mod: {
										cardEnabled: function () {
											return false;
										},
										cardSavable: function () {
											return false;
										},
										cardRespondable: function () {
											return false;
										},
									},
								},
								hhzz_huilei: {
									trigger: { player: "die" },
									forced: true,
									forceDie: true,
									skillAnimation: true,
									logTarget: "source",
									filter: function (event, player) {
										return event.source != undefined;
									},
									content: function () {
										var source = trigger.source;
										var cards = source.getCards("he");
										if (cards.length) {
											source.discard(cards);
										}
									},
									ai: {
										effect: {
											target: function (card, player, target) {
												if (get.tag(card, "damage")) {
													return [-5, 0];
												}
											},
										},
									},
								},
								hhzz_youlian: {
									trigger: { player: "die" },
									forced: true,
									forceDie: true,
									skillAnimation: true,
									logTarget: "source",
									filter: function (event, player) {
										return event.source != undefined;
									},
									content: function () {
										var source = trigger.source;
										var cards = source.getCards("he");
										if (cards.length) {
											source.discard(cards);
										}
										var skills = source.skillH;
										if (skills.length) {
											source.removeSkillH(skills.randomGet());
										}
									},
									ai: {
										effect: {
											target: function (card, player, target) {
												if (get.tag(card, "damage")) {
													return [-5, 0];
												}
											},
										},
									},
								},
								hhzz_zhencang: {
									trigger: { player: "die" },
									forced: true,
									filter: function (event, player) {
										return event.source != undefined;
									},
									forceDie: true,
									logTarget: "source",
									content: function () {
										var source = trigger.source;
										source.draw();
										if (source.skillH.length == 3) {
											source.removeSkillH(source.skillH.randomGet());
										}
										var skills = lib.huanhuazhizhan.skills;
										skills.randomSort();
										for (var i = 0; i < skills.length; i++) {
											if (!source.skillH.includes(skills[i])) {
												source.addSkillH(skills[i]);
												break;
											}
										}
									},
								},
								hhzz_huizhen: {
									trigger: { player: "die" },
									forced: true,
									forceDie: true,
									logTarget: "source",
									filter: function (event, player) {
										return event.source != undefined;
									},
									content: function () {
										var source = trigger.source;
										source.draw(3);
										if (source.skillH.length == 3) {
											source.removeSkillH(source.skillH.randomGet());
										}
										var skills = lib.huanhuazhizhan.skills;
										skills.randomSort();
										for (var i = 0; i < skills.length; i++) {
											if (!source.skillH.includes(skills[i])) {
												source.addSkillH(skills[i]);
												break;
											}
										}
									},
								},
								hhzz_jubao: {
									trigger: { player: "damage" },
									forced: true,
									logTarget: "source",
									filter: function (event, player) {
										return event.source != undefined && player.countCards("he") > 0;
									},
									content: function () {
										var cards = player.getCards("he");
										cards.randomSort();
										cards = cards.slice(0, trigger.num);
										trigger.source.gain("give", cards, player);
									},
									ai: {
										effect: {
											target: function (card, player, target) {
												if (get.tag(card, "damage")) {
													return [15, 0];
												}
											},
										},
									},
								},
							},
							translate: {
								_lingli: "聚灵",
								_lingli_bg: "灵",
								_lingli_draw: "聚灵",
								hhzz_huilei: "挥泪",
								hhzz_youlian: "犹怜",
								hhzz_zhencang: "珍藏",
								hhzz_huizhen: "汇珍",
								hhzz_jubao: "聚宝",
								hhzz_huilei_info: "锁定技，杀死你的角色弃置所有的牌。",
								hhzz_youlian_info: "锁定技，杀死你的角色弃置所有牌并随机失去一个技能。",
								hhzz_zhencang_info: "锁定技，杀死你的角色摸一张牌并随机获得一个技能(已满则先随机移除一个)。",
								hhzz_huizhen_info: "锁定技，杀死你的角色摸三张牌并随机获得一个技能(已满则先随机移除一个)。",
								hhzz_jubao_info: "锁定技，当你受到伤害的点数确定时，伤害来源随机获得你区域内的X张牌（X为伤害点数）。",
								hhzz_shiona: "汐奈",
								hhzz_kanade: "立华奏",
								hhzz_takaramono1: "坚实宝箱",
								hhzz_takaramono2: "普通宝箱",
								hhzz_toulianghuanzhu: "偷梁换柱",
								hhzz_fudichouxin: "釜底抽薪",
								hhzz_toulianghuanzhu_info: "出牌阶段，对一名角色使用，随机更换其一个技能。可重铸。",
								hhzz_fudichouxin_info: "出牌阶段，对一名角色使用，随机弃置其一个技能。",
								nei: " ",
								nei2: " ",
								刷新_info: "消耗1点灵力值，刷新上述技能。",
							},
						},
						get: {
							rawAttitude: function (from, to) {
								if (from == to || to == from._toSave) {
									return 10;
								}
								if (to == from._toKill) {
									return -30;
								}
								return -10;
							},
						},
						eltc: {
							gameDraw: function () {
								var end = player;
								var numx;
								var num = function (player) {
									return player._hSeat > 5 ? 5 : 4;
								};
								do {
									if (typeof num == "function") {
										numx = num(player);
									}
									if (player._hSeat > 6) {
										player.changeLingli(1);
									}
									let cards = get.cards(numx);
									player.directgain(cards);
									player._start_cards = cards;
									player = player.next;
								} while (player != end);
							},
						},
						eltp: {
							addSkillH: function (skill) {
								this.skillH.add(skill);
								this.addSkillLog.apply(this, arguments);
							},
							removeSkillH: function (skill) {
								this.skillH.remove(skill);
								game.log(this, "失去了技能", "#g【" + get.translation(skill) + "】");
								this.removeSkill(skill);
							},
							dieAfter: function () {
								var evt = _status.event.getParent("phase");
								if (evt) {
									evt._lastDead = this;
								}
								if (game.playerx().length == 1) {
									game.over(game.me.isAlive());
								}
							},
							$dieAfter: function () { },
							hasUnknown: function () {
								return false;
							},
							isUnknown: function () {
								return false;
							},
							getEnemies: function () {
								var list = game.playerx();
								list.remove(this);
								return list;
							},
							dieAfter2: function (source) {
								if (source && this.name.indexOf("hhzz_") != 0) {
									if (source._toKill == this) {
										game.log(source, "击杀目标成功");
									}
									source.draw(this == source._toKill ? 2 : 1);
									source.changeLingli(this == source._toKill ? 3 : 2);
								}
								if (!_status._aozhan) {
									var that = this;
									game.countPlayer(function (current) {
										if (current._toSave == that) {
											game.log(current, "保护失败");
											var cards = current.getCards("he");
											if (cards.length) {
												current.discard(cards.randomGets(4));
											}
										}
									});
								}
							},
							logAi: function () { },
							changeLingli: function (num) {
								if (typeof num != "number") {
									num = 1;
								}
								if (typeof this.storage._lingli != "number") {
									this.storage._lingli = 0;
								}
								if (num > 0) {
									num = Math.min(num, 5 - this.storage._lingli);
									if (num < 1) {
										return;
									}
									game.log(this, "获得了", "#y" + get.cnNumber(num) + "点", "灵力");
								} else {
									if (-num > this.storage._lingli) {
										num = -this.storage._lingli;
									}
									if (num == 0) {
										return;
									}
									game.log(this, "失去了", "#y" + get.cnNumber(-num) + "点", "灵力");
								}
								this.storage._lingli += num;
								this.markSkill("_lingli");
							},
						},
						game: {
							playerx: function () {
								return game.filterPlayer(function (current) {
									if (current.name.indexOf("hhzz_") == 0) {
										return;
									}
									return true;
								});
							},
							randomMission: function () {
								if (_status._aozhan) {
									return;
								}
								if (!ui.huanhuazhizhan) {
									ui.huanhuazhizhan = ui.create.div(".touchinfo.left", ui.window);
									if (ui.time3) {
										ui.time3.style.display = "none";
									}
								}
								var players = game.playerx();
								for (var i = 0; i < players.length; i++) {
									var player = players[i];
									var list = players.slice(0).randomSort();
									list.remove(player);
									player._toKill = list[0];
									player._toSave = list[1];
								}
								ui.huanhuazhizhan.innerHTML = "击杀" + get.translation(game.me._toKill) + "，保护" + get.translation(game.me._toSave);
							},
							getSkillDialog: function (skills, prompt) {
								var dialog = ui.create.dialog("hidden", "forcebutton");
								if (prompt) {
									dialog.addText(prompt);
								}
								for (var i = 0; i < skills.length; i++) {
									dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' + get.translation(skills[i]) + "】</div><div>" + lib.translate[skills[i] + "_info"] + "</div></div>");
								}
								dialog.addText(" <br> ");
								return dialog;
							},
							chooseCharacter: function () {
								var next = game.createEvent("chooseCharacter");
								next.showConfig = true;
								next.setContent(function () {
									"step 0";
									game.zhu = game.players.randomGet();
									var i = 1;
									var current = game.zhu;
									while (true) {
										current.skillH = [];
										current._hSeat = i;
										current.identity = "nei";
										current.setNickname(get.cnNumber(i, true) + "号位");
										for (var ii in lib.huanhuazhizhan.eltp) {
											current[ii] = lib.huanhuazhizhan.eltp[ii];
										}
										current = current.next;
										i++;
										if (current == game.zhu) {
											break;
										}
									}
									ui.arena.classList.add("choose-character");
									game.me.chooseButton(["请选择角色形象", [_status.characterlist.randomRemove(5), "character"]], true).onfree = true;
									"step 1";
									game.me.init(result.links[0]);
									var list = ["xiandeng", "shulv", "xisheng"];
									game.me.chooseControl(list).dialog = game.getSkillDialog(list, "选择要获得的初始技能");
									"step 2";
									var list = ["_lingli", "_lingli_round", "_lingli_draw", "_lingli_save", "_hhzz_qiankunbagua", "_lingli_damage"];
									for (var i = 0; i < list.length; i++) {
										game.addGlobalSkill(list[i]);
									}
									game.me.addSkillH(result.control);
									game.countPlayer(function (current) {
										if (!current.name) {
											current.init(_status.characterlist.randomRemove(1)[0]);
											current.addSkillH(["xiandeng", "shulv", "xisheng"].randomGet());
										}
										current.storage._lingli = 0;
										current.markSkill("_lingli");
									});
									game.showIdentity(true);
									"step 3";
									game.randomMission();
									var list = [game.createCard("hhzz_fudichouxin"), game.createCard("hhzz_toulianghuanzhu"), game.createCard("hhzz_toulianghuanzhu"), game.createCard("hhzz_toulianghuanzhu")];
									for (var i = 0; i < list.length; i++) {
										ui.cardPile.insertBefore(list[i], ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
									}
									game.updateRoundNumber();
									"step 4";
									setTimeout(function () {
										ui.arena.classList.remove("choose-character");
									}, 500);
									_status.videoInited = true;
									game.addVideo("arrangeLib", null, {
										skill: {
											_lingli_damage: {},
											_lingli: {
												mark: true,
												marktext: "灵",
												popup: "聚灵",
												intro: {
													name: "灵力",
													content: "当前灵力点数：# / 5",
												},
											},
											_lingli_round: {},
											_lingli_draw: {},
											_lingli_save: {},
											hhzz_noCard: {},
											hhzz_huilei: {
												skillAnimation: true,
											},
											hhzz_youlian: {
												skillAnimation: true,
											},
											hhzz_zhencang: {},
											hhzz_huizhen: {},
											hhzz_jubao: {},
										},
										card: {
											hhzz_toulianghuanzhu: {
												cardimage: "toulianghuanzhu",
											},
											hhzz_fudichouxin: {
												cardimage: "fudichouxin",
											},
										},
										character: {
											hhzz_shiona: {
												sex: "female",
												group: "key",
												hp: 1,
												skills: ["hhzz_huilei"],
											},
											hhzz_kanade: {
												sex: "female",
												group: "key",
												hp: 2,
												skills: ["hhzz_youlian"],
											},
											hhzz_takaramono1: {
												sex: "male",
												group: "qun",
												hp: 5,
												skills: ["hhzz_jubao", "hhzz_huizhen"],
											},
											hhzz_takaramono2: {
												sex: "male",
												group: "qun",
												hp: 3,
												skills: ["hhzz_jubao", "hhzz_zhencang"],
											},
										},
										translate: {
											_lingli: "聚灵",
											_lingli_bg: "灵",
											_lingli_draw: "聚灵",
											hhzz_huilei: "挥泪",
											hhzz_youlian: "犹怜",
											hhzz_zhencang: "珍藏",
											hhzz_huizhen: "汇珍",
											hhzz_jubao: "聚宝",
											hhzz_huilei_info: "锁定技，杀死你的角色弃置所有的牌。",
											hhzz_youlian_info: "锁定技，杀死你的角色弃置所有牌并随机失去一个技能。",
											hhzz_zhencang_info: "锁定技，杀死你的角色摸一张牌并随机获得一个技能(已满则先随机移除一个)。",
											hhzz_huizhen_info: "锁定技，杀死你的角色摸三张牌并随机获得一个技能(已满则先随机移除一个)。",
											hhzz_jubao_info: "锁定技，当你受到伤害的点数确定时，伤害来源随机获得你区域内的X张牌（X为伤害点数）。",
											nei: " ",
											nei2: " ",
											hhzz_shiona: "汐奈",
											hhzz_kanade: "立华奏",
											hhzz_takaramono1: "坚实宝箱",
											hhzz_takaramono2: "普通宝箱",
											hhzz_toulianghuanzhu: "偷梁换柱",
											hhzz_fudichouxin: "釜底抽薪",
											hhzz_toulianghuanzhu_info: "出牌阶段，对一名角色使用，随机更换其一个技能。可重铸。",
											hhzz_fudichouxin_info: "出牌阶段，对一名角色使用，随机弃置其一个技能。",
										},
									});
								});
							},
						},
					};
					var func = function (pack) {
						for (var i in pack.pack) {
							for (var j in pack.pack[i]) {
								lib[i][j] = pack.pack[i][j];
							}
						}
						for (var i in pack.eltc) {
							lib.element.content[i] = pack.eltc[i];
						}
						for (var i in pack.eltp) {
							lib.element.player[i] = pack.eltp[i];
						}
						for (var i in pack.game) {
							game[i] = pack.game[i];
						}
						for (var i in pack.get) {
							get[i] = pack.get[i];
						}
						lib.huanhuazhizhan = pack;
					};
					func(pack);
				},
			},

		}
	}
}