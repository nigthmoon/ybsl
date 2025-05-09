import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {card};
const card = {
	rewrite_goujiangdesidai: {
		type: 'equip',
		subtype: 'equip1',
		distance: {
			attackFrom: -6
		},
		skills: ['rewrite_goujiangdesidai_skill'],
		modeimage: 'boss',
		ai: {
			basic: {
				equipValue: 8.5,
			},
		},
		fullskin: true,
	},
	ybsl_qingfengshan:{
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -3 },
		ai: {
			basic: {
				equipValue: 2,
			},
		},
		skills: ["ybsl_qingfengshan"],
	},
	ybsl_zhongkai:{
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		ai: {
			basic: {
				equipValue: 2,
			},
		},
		skills: ["ybsl_zhongkai_1","ybsl_zhongkai_2"],
	},
	ybsl_jinyinrukai:{
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		ai: {
			basic: {
				equipValue: 2,
			},
		},
		skills: ["ybsl_jinyinrukai"],
	},
	ybsl_jizhiguan:{
		fullskin: true,
		type: "equip",
		subtype: "equip5",
		ai: {
			basic: {
				equipValue: 2,
			},
		},
		skills: ["ybsl_jizhiguan"],
	},
	ybsl_feijingsanjian:{
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		ai: {
			basic: {
				equipValue: 2,
			},
		},
		skills: ["ybsl_feijingsanjian"],
	},
	ybsl_frostnova:{
		audio: true,
		fullskin: true,
		type: "trick",
		enable: true,
		selectTarget: -1,
		defaultYingbianEffect: "remove",
		filterTarget(card, player, target) {
			return target != player;
		},
		reverseOrder: true,
		content() {
			"step 0";
			if (typeof event.shaRequired != "number" || !event.shaRequired || event.shaRequired < 0) event.shaRequired = 1;
			if (typeof event.baseDamage != "number") event.baseDamage = 1;
			"step 1";
			if (event.directHit) event._result = { bool: false };
			else {
				var next = target.chooseToRespond();
				next.set("filterCard", function (card, player) {
					if (get.name(card) != "sha") return false;
					return lib.filter.cardRespondable(card, player);
				});
				if (event.shaRequired > 1) {
					next.set("prompt2", "共需打出" + event.shaRequired + "张杀");
				}
				next.set("ai", function (card) {
					var evt = _status.event.getParent();
					if (get.damageEffect(evt.target, evt.player, evt.target,"ice") >= 0) return 0;
					if (evt.player.hasSkillTag("notricksource")) return 0;
					if (evt.target.hasSkillTag("notrick")) return 0;
					return get.order(card);
				});
				next.set("respondTo", [player, card]);
				next.autochoose = lib.filter.autoRespondSha;
			}
			"step 2";
			if (result.bool == false) {
				target.damage('ice');
			} else {
				event.shaRequired--;
				if (event.shaRequired > 0) event.goto(1);
			}
		},
		ai: {
			wuxie(target, card, player, viewer, status) {
				let att = get.attitude(viewer, target),
					eff = get.effect(target, card, player, target);
				if (Math.abs(att) < 1 || status * eff * att >= 0) return 0;
				let evt = _status.event.getParent("useCard"),
					pri = 1,
					bonus = player.hasSkillTag("damageBonus", true, {
						target: target,
						card: card,
					}),
					damage = 1,
					isZhu = function (tar) {
						return tar.isZhu || tar === game.boss || tar === game.trueZhu || tar === game.falseZhu;
					},
					canSha = function (tar, blur) {
						let known = tar.getKnownCards(viewer);
						if (!blur)
							return known.some(card => {
								let name = get.name(card, tar);
								return (name === "sha" || name === "hufu" || name === "yuchanqian") && lib.filter.cardRespondable(card, tar);
							});
						if (tar.countCards("hs", i => !known.includes(i)) > 4.67 - (2 * tar.hp) / tar.maxHp) return true;
						if (!tar.hasSkillTag("respondSha", true, "respond", true)) return false;
						if (tar.hp <= damage) return false;
						if (tar.hp <= damage + 1) return isZhu(tar);
						return true;
					},
					self = false;
				if (canSha(target)) return 0;
				if (
					bonus &&
					!viewer.hasSkillTag("filterDamage", null, {
						player: player,
						card: card,
					})
				)
					damage = 2;
				if ((viewer.hp <= damage || (viewer.hp <= damage + 1 && isZhu(viewer))) && !canSha(viewer)) {
					if (viewer === target) return status;
					let fv = true;
					if (evt && evt.targets)
						for (let i of evt.targets) {
							if (fv) {
								if (target === i) fv = false;
								continue;
							}
							if (viewer == i) {
								if (isZhu(viewer)) return 0;
								self = true;
								break;
							}
						}
				}
				let maySha = canSha(target, true);
				if (
					bonus &&
					!target.hasSkillTag("filterDamage", null, {
						player: player,
						card: card,
					})
				)
					damage = 2;
				else damage = 1;
				if (isZhu(target)) {
					if (eff < 0) {
						if (target.hp <= damage + 1 || (!maySha && target.hp <= damage + 2)) return 1;
						if (maySha && target.hp > damage + 2) return 0;
						else if (maySha || target.hp > damage + 2) pri = 3;
						else pri = 4;
					} else if (target.hp > damage + 1) pri = 2;
					else return 0;
				} else if (self) return 0;
				else if (eff < 0) {
					if (!maySha && target.hp <= damage) pri = 5;
					else if (maySha) return 0;
					else if (target.hp > damage + 1) pri = 2;
					else if (target.hp === damage + 1) pri = 3;
					else pri = 4;
				} else if (target.hp <= damage) return 0;
				let find = false;
				if (evt && evt.targets)
					for (let i = 0; i < evt.targets.length; i++) {
						if (!find) {
							if (evt.targets[i] === target) find = true;
							continue;
						}
						let att1 = get.attitude(viewer, evt.targets[i]),
							eff1 = get.effect(evt.targets[i], card, player, evt.targets[i]),
							temp = 1;
						if (Math.abs(att1) < 1 || att1 * eff1 >= 0 || canSha(evt.targets[i])) continue;
						maySha = canSha(evt.targets[i], true);
						if (
							bonus &&
							!evt.targets[i].hasSkillTag("filterDamage", null, {
								player: player,
								card: card,
							})
						)
							damage = 2;
						else damage = 1;
						if (isZhu(evt.targets[i])) {
							if (eff1 < 0) {
								if (evt.targets[i].hp <= damage + 1 || (!maySha && evt.targets[i].hp <= damage + 2)) return 0;
								if (maySha && evt.targets[i].hp > damage + 2) continue;
								if (maySha || evt.targets[i].hp > damage + 2) temp = 3;
								else temp = 4;
							} else if (evt.targets[i].hp > damage + 1) temp = 2;
							else continue;
						} else if (eff1 < 0) {
							if (!maySha && evt.targets[i].hp <= damage) temp = 5;
							else if (maySha) continue;
							else if (evt.targets[i].hp > damage + 1) temp = 2;
							else if (evt.targets[i].hp === damage + 1) temp = 3;
							else temp = 4;
						} else if (evt.targets[i].hp > damage + 1) temp = 2;
						if (temp > pri) return 0;
					}
				return 1;
			},
			basic: {
				order: 7.2,
				useful: [5, 1],
				value: 5,
			},
			result: {
				player(player, target) {
					if (player._nanman_temp || player.hasSkillTag("jueqing", false, target)) return 0;
					if (target.hp > 2 || (target.hp > 1 && !target.isZhu && target != game.boss && target != game.trueZhu && target != game.falseZhu)) return 0;
					player._nanman_temp = true;
					let eff = get.effect(target, new lib.element.VCard({ name: "nanman" }), player, target);
					delete player._nanman_temp;
					if (eff >= 0) return 0;
					if (target.hp > 1 && target.hasSkillTag("respondSha", true, "respond", true)) return 0;
					let known = target.getKnownCards(player);
					if (
						known.some(card => {
							let name = get.name(card, target);
							if (name === "sha" || name === "hufu" || name === "yuchanqian") return lib.filter.cardRespondable(card, target);
							if (name === "wuxie") return lib.filter.cardEnabled(card, target, "forceEnable");
						})
					)
						return 0;
					if (target.hp > 1 || target.countCards("hs", i => !known.includes(i)) > 4.67 - (2 * target.hp) / target.maxHp) return 0;
					let res = 0,
						att = get.sgnAttitude(player, target);
					res -= att * (0.8 * target.countCards("hs") + 0.6 * target.countCards("e") + 3.6);
					if (get.mode() === "identity" && target.identity === "fan") res += 2.4;
					if ((get.mode() === "guozhan" && player.identity !== "ye" && player.identity === target.identity) || (get.mode() === "identity" && player.identity === "zhu" && (target.identity === "zhong" || target.identity === "mingzhong"))) res -= 0.8 * player.countCards("he");
					return res;
				},
				target(player, target) {
					let zhu = (get.mode() === "identity" && target.isZhu) || target.identity === "zhu";
					if (!lib.filter.cardRespondable({ name: "sha" }, target)) {
						if (zhu) {
							if (target.hp < 2) return -99;
							if (target.hp === 2) return -3.6;
						}
						return -2;
					}
					let known = target.getKnownCards(player);
					if (
						known.some(card => {
							let name = get.name(card, target);
							if (name === "sha" || name === "hufu" || name === "yuchanqian") return lib.filter.cardRespondable(card, target);
							if (name === "wuxie") return lib.filter.cardEnabled(card, target, "forceEnable");
						})
					)
						return -1.2;
					let nh = target.countCards("hs", i => !known.includes(i));
					if (zhu && target.hp <= 1) {
						if (nh === 0) return -99;
						if (nh === 1) return -60;
						if (nh === 2) return -36;
						if (nh === 3) return -12;
						if (nh === 4) return -8;
						return -5;
					}
					if (target.hasSkillTag("respondSha", true, "respond", true)) return -1.35;
					if (!nh) return -2;
					if (nh === 1) return -1.8;
					return -1.5;
				},
			},
			tag: {
				respond: 1,
				respondSha: 1,
				damage: 1,
				natureDamage: 1,
				iceDamage: 1,
				multitarget: 1,
				multineg: 1,
			},
		},
	},
	ybsl_windstorm: {
		audio: true,
		fullskin: true,
		type: "trick",
		enable: true,
		selectTarget: -1,
		reverseOrder: true,
		defaultYingbianEffect: "remove",
		filterTarget(card, player, target) {
			return target != player;
		},
		content() {
			"step 0";
			if (typeof event.shanRequired != "number" || !event.shanRequired || event.shanRequired < 0) event.shanRequired = 1;
			if (typeof event.baseDamage != "number") event.baseDamage = 1;
			"step 1";
			if (event.directHit) event._result = { bool: false };
			else {
				var next = target.chooseToRespond();
				next.set("filterCard", function (card, player) {
					if (get.name(card) != "shan") return false;
					return lib.filter.cardRespondable(card, player);
				});
				if (event.shanRequired > 1) {
					next.set("prompt2", "共需打出" + event.shanRequired + "张闪");
				}
				next.set("ai", function (card) {
					var evt = _status.event.getParent();
					if (get.damageEffect(evt.target, evt.player, evt.target,'YB_wind') >= 0) return 0;
					if (evt.player.hasSkillTag("notricksource")) return 0;
					if (evt.target.hasSkillTag("notrick")) return 0;
					if (evt.target.hasSkillTag("noShan")) {
						return -1;
					}
					return get.order(card);
				});
				next.set("respondTo", [player, card]);
				next.autochoose = lib.filter.autoRespondShan;
			}
			"step 2";
			if (result.bool == false) {
				target.damage('YB_wind');
			} else {
				event.shanRequired--;
				if (event.shanRequired > 0) event.goto(1);
			}
		},
		ai: {
			wuxie(target, card, player, viewer, status) {
				let att = get.attitude(viewer, target),
					eff = get.effect(target, card, player, target);
				if (Math.abs(att) < 1 || status * eff * att >= 0) return 0;
				let evt = _status.event.getParent("useCard"),
					pri = 1,
					bonus = player.hasSkillTag("damageBonus", true, {
						target: target,
						card: card,
					}),
					damage = 1,
					isZhu = function (tar) {
						return tar.isZhu || tar === game.boss || tar === game.trueZhu || tar === game.falseZhu;
					},
					canShan = function (tar, blur) {
						let known = tar.getKnownCards(viewer);
						if (!blur)
							return known.some(card => {
								let name = get.name(card, tar);
								return (name === "shan" || name === "hufu") && lib.filter.cardRespondable(card, tar);
							});
						if (tar.countCards("hs", i => !known.includes(i)) > 3.67 - (2 * tar.hp) / tar.maxHp) return true;
						if (!tar.hasSkillTag("respondShan", true, "respond", true)) return false;
						if (tar.hp <= damage) return false;
						if (tar.hp <= damage + 1) return isZhu(tar);
						return true;
					},
					self = false;
				if (canShan(target)) return 0;
				if (
					bonus &&
					!viewer.hasSkillTag("filterDamage", null, {
						player: player,
						card: card,
					})
				)
					damage = 2;
				if ((viewer.hp <= damage || (viewer.hp <= damage + 1 && isZhu(viewer))) && !canShan(viewer)) {
					if (viewer === target) return status;
					let fv = true;
					if (evt && evt.targets)
						for (let i of evt.targets) {
							if (fv) {
								if (target === i) fv = false;
								continue;
							}
							if (viewer == i) {
								if (isZhu(viewer)) return 0;
								self = true;
								break;
							}
						}
				}
				let mayShan = canShan(target, true);
				if (
					bonus &&
					!target.hasSkillTag("filterDamage", null, {
						player: player,
						card: card,
					})
				)
					damage = 2;
				else damage = 1;
				if (isZhu(target)) {
					if (eff < 0) {
						if (target.hp <= damage + 1 || (!mayShan && target.hp <= damage + 2)) return 1;
						if (mayShan && target.hp > damage + 2) return 0;
						else if (mayShan || target.hp > damage + 2) pri = 3;
						else pri = 4;
					} else if (target.hp > damage + 1) pri = 2;
					else return 0;
				} else if (self) return 0;
				else if (eff < 0) {
					if (!mayShan && target.hp <= damage) pri = 5;
					else if (mayShan) return 0;
					else if (target.hp > damage + 1) pri = 2;
					else if (target.hp === damage + 1) pri = 3;
					else pri = 4;
				} else if (target.hp <= damage) return 0;
				let find = false;
				if (evt && evt.targets)
					for (let i = 0; i < evt.targets.length; i++) {
						if (!find) {
							if (evt.targets[i] === target) find = true;
							continue;
						}
						let att1 = get.attitude(viewer, evt.targets[i]),
							eff1 = get.effect(evt.targets[i], card, player, evt.targets[i]),
							temp = 1;
						if (Math.abs(att1) < 1 || att1 * eff1 >= 0 || canShan(evt.targets[i])) continue;
						mayShan = canShan(evt.targets[i], true);
						if (
							bonus &&
							!evt.targets[i].hasSkillTag("filterDamage", null, {
								player: player,
								card: card,
							})
						)
							damage = 2;
						else damage = 1;
						if (isZhu(evt.targets[i])) {
							if (eff1 < 0) {
								if (evt.targets[i].hp <= damage + 1 || (!mayShan && evt.targets[i].hp <= damage + 2)) return 0;
								if (mayShan && evt.targets[i].hp > damage + 2) continue;
								if (mayShan || evt.targets[i].hp > damage + 2) temp = 3;
								else temp = 4;
							} else if (evt.targets[i].hp > damage + 1) temp = 2;
							else continue;
						} else if (eff1 < 0) {
							if (!mayShan && evt.targets[i].hp <= damage) temp = 5;
							else if (mayShan) continue;
							else if (evt.targets[i].hp > damage + 1) temp = 2;
							else if (evt.targets[i].hp === damage + 1) temp = 3;
							else temp = 4;
						} else if (evt.targets[i].hp > damage + 1) temp = 2;
						if (temp > pri) return 0;
					}
				return 1;
			},
			basic: {
				order: 7.2,
				useful: 1,
				value: 5,
			},
			result: {
				player(player, target) {
					if (player._wanjian_temp || player.hasSkillTag("jueqing", false, target)) return 0;
					if (target.hp > 2 || (target.hp > 1 && !target.isZhu && target != game.boss && target != game.trueZhu && target != game.falseZhu)) return 0;
					player._wanjian_temp = true;
					let eff = get.effect(target, new lib.element.VCard({ name: "wanjian" }), player, target);
					delete player._wanjian_temp;
					if (eff >= 0) return 0;
					if (target.hp > 1 && target.hasSkillTag("respondShan", true, "respond", true)) return 0;
					let known = target.getKnownCards(player);
					if (
						known.some(card => {
							let name = get.name(card, target);
							if (name === "shan" || name === "hufu") return lib.filter.cardRespondable(card, target);
							if (name === "wuxie") return lib.filter.cardEnabled(card, target, "forceEnable");
						})
					)
						return 0;
					if (target.hp > 1 || target.countCards("hs", i => !known.includes(i)) > 3.67 - (2 * target.hp) / target.maxHp) return 0;
					let res = 0,
						att = get.sgnAttitude(player, target);
					res -= att * (0.8 * target.countCards("hs") + 0.6 * target.countCards("e") + 3.6);
					if (get.mode() === "identity" && target.identity === "fan") res += 2.4;
					if ((get.mode() === "guozhan" && player.identity !== "ye" && player.identity === target.identity) || (get.mode() === "identity" && player.identity === "zhu" && (target.identity === "zhong" || target.identity === "mingzhong"))) res -= 0.8 * player.countCards("he");
					return res;
				},
				target(player, target) {
					let zhu = (get.mode() === "identity" && target.isZhu) || target.identity === "zhu";
					if (!lib.filter.cardRespondable({ name: "shan" }, target)) {
						if (zhu) {
							if (target.hp < 2) return -99;
							if (target.hp === 2) return -3.6;
						}
						return -2;
					}
					let known = target.getKnownCards(player);
					if (
						known.some(card => {
							let name = get.name(card, target);
							if (name === "shan" || name === "hufu") return lib.filter.cardRespondable(card, target);
							if (name === "wuxie") return lib.filter.cardEnabled(card, target, "forceEnable");
						})
					)
						return -1.2;
					let nh = target.countCards("hs", i => !known.includes(i));
					if (zhu && target.hp <= 1) {
						if (nh === 0) return -99;
						if (nh === 1) return -60;
						if (nh === 2) return -36;
						if (nh === 3) return -8;
						return -5;
					}
					if (target.hasSkillTag("respondShan", true, "respond", true)) return -1.35;
					if (!nh) return -2;
					if (nh === 1) return -1.65;
					return -1.5;
				},
			},
			tag: {
				respond: 1,
				respondShan: 1,
				damage: 1,
				natureDamage: 1,
				YB_windDamage: 1,
				multitarget: 1,
				multineg: 1,
			},
		},
	},
}