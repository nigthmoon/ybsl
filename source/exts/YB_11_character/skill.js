import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

/** @type { importCharacterConfig['skill'] } */
const skill = {
	//李昭仪
	yhky_lzyjuekang:{
		audio: 'ext:夜白神略/audio/character:6',
		persevereSkill: true,
		trigger: {
			player: ["yhky_lzyjuekang_beginAfter", "yhky_lzyjuekang_addAfter", "yhky_lzyjuekangAfter"],
		},
		filter(event, player) {
			let skills = [];
			let current = player.additionalSkills?.yhky_lzyjuekang?.length ?? 0;
			let target = player.countMark("yhky_lzyjuekang") == lib.skill.yhky_lzyjuekang.maxMarkCount ? lib.skill.yhky_lzyjuekang.derivation.length : Math.floor(player.countMark("yhky_lzyjuekang") / 25);
			return target > current;
		},
		forced: true,
		popup: false,
		locked: false,
		beginMarkCount: 20,
		maxMarkCount: 99,
		derivation: ["yhky_lzyzhanjue", "yhky_lzyfengpo", "yhky_lzyfengjian", "yhky_lzyfenshen"],
		addMark(player, num) {
			num = Math.min(num, lib.skill.yhky_lzyjuekang.maxMarkCount - player.countMark("yhky_lzyjuekang"));
			player.addMark("yhky_lzyjuekang", num);
		},
		group: ["yhky_lzyjuekang_begin", "yhky_lzyjuekang_add", "yhky_lzyjuekang_die"],
		async content(event, trigger, player) {
			const derivation = lib.skill.yhky_lzyjuekang.derivation,
				skills = player.countMark("yhky_lzyjuekang") == lib.skill.yhky_lzyjuekang.maxMarkCount ? derivation : derivation.slice(0, Math.floor(player.countMark("yhky_lzyjuekang") / 25));
			player.addAdditionalSkill("yhky_lzyjuekang", skills);
		},
		marktext: "道",
		intro: {
			name: "道心(珏抗)",
			name2: "道心",
			content: "当前道心数为#",
		},
		subSkill: {
			begin: {
				audio: "yhky_lzyjuekang",
				persevereSkill: true,
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				filter(event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					const num = lib.skill.yhky_lzyjuekang.beginMarkCount;
					lib.skill.yhky_lzyjuekang.addMark(player, num);
				},
			},
			add: {
				audio: "yhky_lzyjuekang",
				persevereSkill: true,
				trigger: {
					player: ["gainAfter", "damageEnd"],
					source: "damageSource",
					global: "loseAsyncAfter",
				},
				filter(event, player) {
					if (player.countMark("yhky_lzyjuekang") >= lib.skill.yhky_lzyjuekang.maxMarkCount) return false;
					if (event.name === "damage") return event.num > 0;
					return event.getg(player).length > 0;
				},
				getIndex(event, player, triggername) {
					if (event.name === "damage") return event.num;
					return 1;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					let toAdd = 5 * (1 + (trigger.name === "damage") + (event.triggername === "damageSource"));
					lib.skill.yhky_lzyjuekang.addMark(player, toAdd);
				},
			},
			die: {
				trigger: {
					player: "dieBefore",
				},
				charlotte: true,
				firstDo: true,
				forced: true,
				popup: false,
				forceDie: true,
				async content(event, trigger, player) {
					//这里本该是阵亡换原画，但我没有素材
					// player.changeSkin({ characterName: "yhky_shlizhaoyi" }, "yhky_shlizhaoyi_dead");
				},
			},
		},
	},
	yhky_lzyzhanjue:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		enable: "phaseUse",
		filterCard(card) {
			return true;
		},
		selectCard: -1,
		position: "h",
		filter(event, player) {
			var stat = player.getStat().skill;
			if (stat.yhky_lzyzhanjue_draw && stat.yhky_lzyzhanjue_draw >= 3) return false;
			var hs = player.getCards("h", function (card) {
				return true;
			});
			if (!hs.length) return false;
			for (var i = 0; i < hs.length; i++) {
				var mod2 = game.checkMod(hs[i], player, "unchanged", "cardEnabled2", player);
				if (mod2 === false) return false;
			}
			return event.filterCard(get.autoViewAs({ name: "juedou" }, hs));
		},
		viewAs: { name: "juedou" },
		onuse(links, player) {
			player.addTempSkill("yhky_lzyzhanjue_effect", "phaseUseEnd");
		},
		ai: {
			order(item, player) {
				if (player.countCards("h") > 1) return 0.8;
				return 8;
			},
			tag: {
				respond: 2,
				respondSha: 2,
				damage: 1,
			},
			result: {
				player(player, target) {
					let td = get.damageEffect(target, player, target);
					if (!td) return 0;
					let hs = player.getCards("h"),
						val = hs.reduce((acc, i) => acc - get.value(i, player), 0) / 6 + 1;
					if (td > 0) return val;
					if (
						player.hasSkillTag("directHit_ai", true, {
							target: target,
							card: get.autoViewAs({ name: "juedou" }, hs),
						})
					)
						return val;
					let pd = get.damageEffect(player, target, player),
						att = get.attitude(player, target);
					if (att > 0 && get.damageEffect(target, player, player) > pd) return val;
					let ts = target.mayHaveSha(player, "respond", null, "count");
					if (ts < 1 && ts * 8 < Math.pow(player.hp, 2)) return val;
					let damage = pd / get.attitude(player, player),
						ps = player.mayHaveSha(player, "respond", hs, "count");
					if (att > 0) {
						if (ts < 1) return val;
						return val + damage + 1;
					}
					if (pd >= 0) return val + damage + 1;
					if (ts - ps + Math.exp(0.8 - player.hp) < 1) return val - ts;
					return val + damage + 1 - ts;
				},
				target(player, target) {
					let td = get.damageEffect(target, player, target) / get.attitude(target, target);
					if (!td) return 0;
					let hs = player.getCards("h");
					if (
						td > 0 ||
						player.hasSkillTag("directHit_ai", true, {
							target: target,
							card: get.autoViewAs({ name: "juedou" }, hs),
						})
					)
						return td + 1;
					let pd = get.damageEffect(player, target, player),
						att = get.attitude(player, target);
					if (att > 0) return td + 1;
					let ts = target.mayHaveSha(player, "respond", null, "count"),
						ps = player.mayHaveSha(player, "respond", hs, "count");
					if (ts < 1) return td + 1;
					if (pd >= 0) return 0;
					if (ts - ps < 1) return td + 1 - ts;
					return -ts;
				},
			},
			nokeep: true,
			skillTagFilter(player, tag, arg) {
				if (tag === "nokeep")
					return (
						(!arg || (arg.card && get.name(arg.card) === "tao")) &&
						player.isPhaseUsing() &&
						get.skillCount("yhky_lzyzhanjue_draw", player) < 3 &&
						player.hasCard(card => {
							return get.name(card) !== "tao";
						}, "h")
					);
			},
		},
		subSkill:{
			effect:{
				persevereSkill: true,
				audio: false,
				trigger: { player: "useCardAfter" },
				forced: true,
				popup: false,
				charlotte: true,
				sourceSkill: "yhky_lzyzhanjue",
				onremove(player) {
					delete player.getStat().skill.yhky_lzyzhanjue_draw;
				},
				filter(event, player) {
					return event.skill == "yhky_lzyzhanjue";
				},
				content() {
					"step 0";
					var stat = player.getStat().skill;
					if (!stat.yhky_lzyzhanjue_draw) stat.yhky_lzyzhanjue_draw = 0;
					stat.yhky_lzyzhanjue_draw++;
					player.draw("nodelay");
					var list = game.filterPlayer(function (current) {
						if (
							current.getHistory("damage", function (evt) {
								return evt.card == trigger.card;
							}).length > 0
						) {
							if (current == player) {
								stat.yhky_lzyzhanjue_draw++;
							}
							return true;
						}
						return false;
					});
					if (list.length) {
						list.sortBySeat();
						game.asyncDraw(list);
					}
					"step 1";
					game.delay();
				},
			}
		}
	},
	yhky_lzyyanyu:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		trigger: {
			global: "phaseUseBegin",
		},
		direct: true,
		filter(event, player) {
			return player.countCards("he") > 0;
		},
		content() {
			"step 0";
			var next = player.chooseToDiscard(get.prompt("yhky_lzyyanyu"), get.translation("yhky_lzyyanyu_info"), "he").set("logSkill", "yhky_lzyyanyu");
			if (player == trigger.player) {
				next.set(
					"goon",
					(function () {
						var map = {
							basic: 0,
							trick: 0.1,
						};
						var hs = trigger.player.getCards("h");
						var sha = false;
						var jiu = false;
						for (var i = 0; i < hs.length; i++) {
							if (trigger.player.hasValueTarget(hs[i])) {
								if (hs[i].name == "sha" && !sha) {
									sha = true;
									map.basic += 2;
								}
								if (hs[i].name == "tao") map.basic += 6;
								if (hs[i].name == "jiu") {
									jiu = true;
									map.basic += 2.5;
								}
								if (get.type(hs[i]) == "trick") map.trick += get.value(hs[i], player, "raw");
							}
						}
						return map;
					})()
				);
				next.set("ai", function (card) {
					var map = _status.event.goon;
					var type = get.type(card, "trick");
					if (!map[type]) return -1;
					return map[type] - get.value(card);
				});
			} else {
				next.set("ai", function (cardx) {
					var map = {
						basic: 0,
						trick: 0,
					};
					var hs = trigger.player.getCards("h");
					var sha = false;
					var jiu = false;
					for (var i = 0; i < hs.length; i++) {
						if (hs[i] != cardx && trigger.player.hasValueTarget(hs[i])) {
							if (hs[i].name == "sha" && !sha) {
								sha = true;
								map.basic += 2;
							}
							if (hs[i].name == "tao") map.basic += 6;
							if (hs[i].name == "jiu") {
								jiu = true;
								map.basic += 3;
							}
							if (get.type(hs[i]) == "trick") map.trick += player.getUseValue(hs[i]);
						}
					}
					var type = get.type(cardx, "trick");
					if (!map[type]) return -get.value(cardx);
					return map[type] - get.value(cardx);
				});
			}
			"step 1";
			if (result.bool) {
				player.storage.yhky_lzyyanyu = get.type(result.cards[0], "trick");
				player.addTempSkill("yhky_lzyyanyu_2", "phaseUseAfter");
			}
		},
		subSkill:{
			2: {
				init(player, skill) {
					player.storage[skill] = 0;
				},
				onremove(player, skill) {
					delete player.storage.yhky_lzyyanyu;
					delete player.storage.yhky_lzyyanyu_2;
				},
				trigger: {
					global: ["loseAfter", "cardsDiscardAfter", "loseAsyncAfter", "equipAfter"],
				},
				direct: true,
				sourceSkill: "yhky_lzyyanyu",
				filter(event, player) {
					if (player.storage.yhky_lzyyanyu_2 >= 3) return false;
					var type = player.storage.yhky_lzyyanyu,
						cards = event.getd();
					for (var i = 0; i < cards.length; i++) {
						if (get.type(cards[i], "trick") == type && get.position(cards[i], true) == "d") return true;
					}
					return false;
				},
				content() {
					"step 0";
					event.logged = false;
					event.cards = [];
					var type = player.storage.yhky_lzyyanyu;
					var cards = trigger.getd();
					for (var i = 0; i < cards.length; i++) {
						if (get.type(cards[i], "trick") == type && get.position(cards[i], true) == "d") event.cards.push(cards[i]);
					}
					"step 1";
					if (player.storage.yhky_lzyyanyu_2 >= 3) event.finish();
					else
						player.chooseCardButton(event.cards, "【燕语】：是否将其中的一张牌交给一名角色？").ai = function (card) {
							if (card.name == "du") return 10;
							return get.value(card);
						};
					"step 2";
					if (result.bool) {
						player.storage.yhky_lzyyanyu_2++;
						if (!event.logged) {
							player.logSkill("yhky_lzyyanyu");
							player.addExpose(0.25);
							event.logged = true;
						}
						event.togain = result.links[0];
						event.cards.remove(event.togain);
						player
							.chooseTarget(true, "请选择要获得" + get.translation(event.togain) + "的角色")
							.set("ai", function (target) {
								var att = get.attitude(_status.event.player, target);
								var card = _status.event.card;
								var val = get.value(card);
								if (player.storage.yhky_lzyyanyu_2 < 3 && target == _status.currentPhase && target.hasValueTarget(card, null, true)) att = att * 5;
								else if (target == player && !player.hasJudge("lebu") && get.type(card) == "trick") att = att * 3;
								if (target.hasSkillTag("nogain")) att /= 10;
								return att * val;
							})
							.set("card", event.togain);
					} else event.finish();
					"step 3";
					var target = result.targets[0];
					player.line(target, "green");
					target.gain(event.togain, "gain2");
					if (event.cards.length) event.goto(1);
				},
			},
			
		}
	},
	yhky_lzyzhaolie:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		trigger: { player: "phaseDrawBegin2" },
		filter(event, player) {
			return event.num > 0 && !event.numFixed && game.hasPlayer(current => player.inRange(current));
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill), (card, player, target) => {
					return player.inRange(target);
				})
				.set("ai", target => {
					const player = get.player();
					if (get.attitude(player, target) > 0) return 0;
					return get.damageEffect(target, player, player);
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
			} = event;
			trigger.num--;
			if (trigger.num <= 0) await game.delay();
			player
				.when({ player: "phaseDrawEnd" })
				.filter(evt => trigger == evt)
				.step(async () => {
					let cards = get.cards(3);
					await game.cardsGotoOrdering(cards);
					await player.showCards(cards);
					const cards2 = cards.filter(card => get.type(card) != "basic" || get.name(card) == "tao");
					const num = cards.filter(card => get.type(card) != "basic").length;
					if (cards2.length) {
						cards.removeArray(cards2);
						await game.cardsDiscard(cards2);
					}
					cards = cards.filter(card => get.type(card) == "basic");
					if (!target.isIn()) return;
					let result;
					if (!num) {
						if (!cards.length) return;
						result = await player
							.chooseTarget(
								(card, player, target) => {
									return get.event("list").includes(target);
								},
								`选择一个目标获得${get.translation(cards)}`,
								true
							)
							.set("ai", target => {
								const { player, cardsx } = get.event();
								return get.attitude(player, target) * get.value(cardsx, target);
							})
							.set("list", [player, target])
							.set("cardsx", cards)
							.forResult();
						if (result?.bool && result?.targets?.length) await result.targets[0].gain(cards, "gain2");
					} else {
						let str = `令${get.translation(target)}弃置${get.cnNumber(num)}张牌`;
						if (cards.length) str += `并获得${get.translation(cards)}`;
						str += `，或对${get.translation(target)}造成${num}点伤害`;
						if (cards.length) str += `并令其获得${get.translation(cards)}`;
						result =
							target.countCards("he") < num
								? { bool: false }
								: await player
										.chooseCardButton(num,target.getCards('he'), get.prompt("yhky_lzyzhaolie"), str)
										.set("ai", card => {
											const { goon } = get.event();
											return goon ? get.value(card) : 0;
										})
										.set("goon", (get.damageEffect(target, player, target) < 0 && target.getHp() <= 2 * num) || (num >= 2 && !target.countCards("hs", card => target.canSaveCard(card, target)) >= num))
										.forResult();
						if (result?.bool) {
							await target.discard(result.links);
							if (cards.length) await player.gain(cards, "gain2");
						} else {
							if (num) await target.damage(num);
							if (cards.length) {
								if (target.isIn()) await target.gain(cards, "gain2");
								else await game.cardsDiscard(cards);
							}
						}
					}
				});
		},
	},
	yhky_lzyfengpo:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		trigger: { player: "useCardToPlayered" },
		logTarget: "target",
		filter(event, player) {
			return (event.card.name == "sha" || event.card.name == "juedou") && event.targets.length == 1 && event.target.countCards("h") > 0;
		},
		onremove: true,
		content() {
			"step 0";
			event.target = trigger.target;
			player.viewHandcards(trigger.target);
			"step 1";
			var num = target.countCards("h", 
				// player.storage.yhky_lzyfengpo ? { color: "red" } : { suit: "diamond" }
				{ color: "red" }
			);
			if (!num) {
				event.finish();
				return;
			}
			event.num = num;
			player.chooseControl().set("choiceList", ["摸" + num + "张牌", "令" + get.translation(trigger.card) + "的伤害值基数+" + num]);
			"step 2";
			if (result.index == 0) player.draw(num);
			else trigger.getParent().baseDamage += num;
		},
		// group: "yhky_lzyfengpo_kill",
		// subSkill: {
		// 	kill: {
		// 		audio: "yhky_lzyfengpo",
		// 		trigger: { source: "die" },
		// 		forced: true,
		// 		filter: (event, player) => !player.storage.yhky_lzyfengpo,
		// 		skillAnimation: true,
		// 		animationColor: "fire",
		// 		content() {
		// 			player.storage.yhky_lzyfengpo = true;
		// 			player.popup("凤魄");
		// 			game.log(player, "升级了技能", "#g【凤魄】");
		// 		},
		// 	},
		// },
	},
	yhky_lzyfengjian:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		trigger: { source: "damageSource" },
		forced: true,
		locked: false,
		filter: function (event, player) {
			return event.player.isAlive();
		},
		logTarget: "player",
		content: function () {
			trigger.player.addTempSkill("yhky_lzyfengjian2", { player: "phaseAfter" });
			trigger.player.markAuto("yhky_lzyfengjian2", [player]);
		},
	},
	yhky_lzyfengjian2:{
		persevereSkill: true,
		onremove: true,
		intro: {
			content: "不能对$使用牌",
		},
		mod: {
			playerEnabled: function (card, player, target) {
				if (player.getStorage("yhky_lzyfengjian2").includes(target)) return false;
			},
		},
	},
	yhky_lzyfenshen:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		enable: "phaseUse",
		limited: true,
		skillAnimation: true,
		animationColor: "fire",
		filterCard: () => false,
		selectCard: [-1, -2],
		filterTarget: true,
		selectTarget: -1,
		multiline: true,
		async contentBefore(event, trigger, player) {
			// 目前并无换肤素材
			// player.changeSkin({ characterName: "yhky_shlizhaoyi" }, "yhky_shlizhaoyi_shadow");
			player.awakenSkill("yhky_lzyfenshen");
		},
		async content(event, trigger, player) {
			const target = event.target;
			const delt = target.getHp(true) - 1,
				num = Math.abs(delt);
			if (delt != 0) {
				if (delt > 0) {
					const next = target.changeHp(-delt);
					next._triggered = null;
					await next;
				} else await target.recover(num);
			}
			if (num > 0) await target.changeHujia(num + (player == target ? 2 : 0), null, true);
			else if (player == target) await target.changeHujia(2, null, true);

			// await player.addSkill()
		},
		async contentAfter(event, trigger, player) {
			game.addGlobalSkill("yhky_lzyfenshen_xiangsicunhan");
			player.$fullscreenpop("向死存汉！", "fire");
			const cards = ["cardPile", "discardPile"].map(pos => Array.from(ui[pos].childNodes)).flat();
			const filter = card => ["shan", "tao", "jiu"].includes(card.name);
			const cardx = cards.filter(filter);
			var cardChange=function(card){
				if(Array.isArray(card)){
					for(var i of card){
						cardChange(i);
					}
				}
				else {
					card.YB_init([card.suit, card.number, 'sha', 'fire', get.YB_tag(card)]);
				}
			}
			if (cardx.length) {
				game.log(cardx, "变成了火【杀】");
				await cardChange(cardx);
			}
			for (const target of game.filterPlayer()) {
				const sishis = target.getCards("hej", filter);
				if (sishis.length) {
					target.$throw(sishis);
					game.log(sishis, "变成了火【杀】");
					await cardChange(sishis);
				}
			}
		},
		ai: {
			order: 0.1,
			result: {
				player(player) {
					let eff = 1;
					game.countPlayer(current => {
						const att = get.attitude(player, current),
							num = Math.abs(current.getHp(true) - 1);
						const delt = Math.max(0, num + current.hujia - 5);
						eff -= att * delt;
					});
					return eff > 0 ? 1 : 0;
				},
			},
		},
		subSkill: {
			xiangsicunhan: {
				trigger: {
					global: ["loseAfter", "equipAfter", "loseAsyncAfter", "cardsDiscardAfter"],
				},
				forced: true,
				silent: true,
				firstDo: true,
				filter(event, player) {
					const nameList = ["shan", "tao", "jiu"];
					return event.getd().some(card => {
						return nameList.includes(get.name(card, false)) && get.position(card, true) === "d";
					});
				},
				async content(event, trigger, player) {
					const nameList = ["shan", "tao", "jiu"];
					const cards = trigger.getd().filter(card => {
						return nameList.includes(get.name(card, false)) && get.position(card, true) === "d";
					});
					var cardChange=function(card){
						if(Array.isArray(card)){
							for(var i of card){
								cardChange(i);
							}
						}
						else {
							card.YB_init([card.suit, card.number, 'sha', 'fire', get.YB_tag(card)]);
						}
					}
					game.log(cards, "变成了火【杀】");
					await cardChange(cards);
				},
			},
		},
	},
	yhky_lzyjuejing:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		trigger: { player: "phaseDrawBegin2" },
		filter(event, player) {
			return !event.numFixed && player.getHp() < player.maxHp;
		},
		forced: true,
		content() {
			trigger.num += player.getDamagedHp();
		},
		mod: {
			maxHandcard: (player, num) => num + 2,
			aiOrder(player, card, num) {
				if (num <= 0 || !player.isPhaseUsing() || !get.tag(card, "recover")) return num;
				if (player.needsToDiscard() > 1) return num;
				return 0;
			},
		},

	},
	//曹婴
	yhky_cylingwei:{
		audio: 'ext:夜白神略/audio/character:6',
		persevereSkill: true,
		trigger: {
			player: ["yhky_cylingwei_beginAfter", "yhky_cylingwei_addAfter", "yhky_cylingweiAfter"],
		},
		filter(event, player) {
			let skills = [];
			let current = player.additionalSkills?.yhky_cylingwei?.length ?? 0;
			let target = player.countMark("yhky_cylingwei") == lib.skill.yhky_cylingwei.maxMarkCount ? lib.skill.yhky_cylingwei.derivation.length : Math.floor(player.countMark("yhky_cylingwei") / 25);
			return target > current;
		},
		forced: true,
		popup: false,
		locked: false,
		beginMarkCount: 20,
		maxMarkCount: 99,
		derivation: ["yhky_cyluoyi", "yhky_cyjiuxian", "yhky_cyyinjun", "yhky_cyqinlong"],
		addMark(player, num) {
			num = Math.min(num, lib.skill.yhky_cylingwei.maxMarkCount - player.countMark("yhky_cylingwei"));
			player.addMark("yhky_cylingwei", num);
		},
		group: ["yhky_cylingwei_begin", "yhky_cylingwei_add", "yhky_cylingwei_die"],
		async content(event, trigger, player) {
			const derivation = lib.skill.yhky_cylingwei.derivation,
				skills = player.countMark("yhky_cylingwei") == lib.skill.yhky_cylingwei.maxMarkCount ? derivation : derivation.slice(0, Math.floor(player.countMark("yhky_cylingwei") / 25));
			player.addAdditionalSkill("yhky_cylingwei", skills);
		},
		marktext: "凌",
		intro: {
			name: "凌人值(凌威)",
			name2: "凌人",
			content: "当前凌人值为#",
		},
		subSkill: {
			begin: {
				audio: "yhky_cylingwei",
				persevereSkill: true,
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				filter(event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					const num = lib.skill.yhky_cylingwei.beginMarkCount;
					lib.skill.yhky_cylingwei.addMark(player, num);
				},
			},
			add: {
				audio: "yhky_cylingwei",
				persevereSkill: true,
				trigger: {
					// player: ["gainAfter", "damageEnd"],
					// source: "damageSource",
					// global: "loseAsyncAfter",
					global:'yhky_cylingren_right',
				},
				filter(event, player) {
					return event.num > 0&&event.caier == player;
				},
				forced: true,
				locked: false,
				firstDo:true,
				async content(event, trigger, player) {
					// let toAdd = 5 * (1 + (trigger.name === "damage") + (event.triggername === "damageSource"));
					let toAdd = 5 * (trigger.num);
					lib.skill.yhky_cylingwei.addMark(player, toAdd);
				},
			},
			die: {
				trigger: {
					player: "dieBefore",
				},
				charlotte: true,
				firstDo: true,
				forced: true,
				popup: false,
				forceDie: true,
				async content(event, trigger, player) {
					//这里本该是阵亡换原画，但我没有素材
					// player.changeSkin({ characterName: "yhky_shlizhaoyi" }, "yhky_shlizhaoyi_dead");
				},
			},
		},
	},
	yhky_cyluoyi:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		trigger:{
			player:'phaseUseBegin',
		},
		filter:function(event,player){
			return player.countCards('he')>0;
		},
		async cost(event, trigger, player){
			event.result=await player.chooseToDiscard('he').set('prompt2',get.prompt2('ybmjz_luoyi')).set("chooseonly", true).forResult();
		},
		*content(event,map){
			let player=map.player,trigger=map.trigger;
			yield player.discard(event.cards);
			var cardsx=[];
			cardsx.push(event.cards[0]);
			var relu = yield player.draw(2,"visible");
			for(var k of relu){
				cardsx.push(k);
			}
			if(cardsx.filter(card=>get.type2(card)=='basic').length>0){
				yield player.addTempSkill("yhky_cyluoyi_damage", { player: "phaseBefore" });
			}
			if(cardsx.filter(card=>get.type2(card)=='trick').length>0){
				yield player.addTempSkill("yhky_cyluoyi_use");
			}
			if(cardsx.filter(card=>get.type2(card)=='equip').length>0){
				yield player.addTempSkill("yhky_cyluoyi_tag");
			}
		},
		subSkill:{
			max:{
				mod:{
					cardEnabled: function (card) {
						if (card.name == "sha"||card.name=='juedou') return false;
					},
				},
				mark:true,
				intro:{
					content:'本回合【杀】和【决斗】不计入手牌上限。'
				}
			},
			use:{
				mod: {
					cardUsable: function (card, player, num) {
						if (card.name == "sha") return num + 1;
					},
				},
				mark:true,
				intro:{
					content:'本回合使用【杀】次数+1。'
				}
			},
			tag:{
				mod: {
					targetInRange: function (card, player, target, now) {
						if (card.name == "sha") return true;
					},
				},
				mark:true,
				intro:{
					content:'本回合使用【杀】无距离限制。'
				}
			},
			damage:{
				audio:'yhky_cyluoyi',
				trigger: { source: "damageBegin1" },
				sourceSkill: "yhky_cyluoyi",
				filter(event) {
					return event.card && (event.card.name == "sha" || event.card.name == "juedou") && event.notLink();
				},
				forced: true,
				charlotte: true,
				content() {
					trigger.num++;
				},
				ai: {
					damageBonus: true,
					skillTagFilter(player, tag, arg) {
						if (tag === "damageBonus") {
							return arg && arg.card && (arg.card.name === "sha" || arg.card.name === "juedou");
						}
					},
				},
				
			},
		}
	},
	yhky_cyjiuxian:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		enable: "phaseUse",
		usable: 1,
		filterCard: lib.filter.cardRecastable,
		selectCard() {
			return Math.ceil(_status.event.player.countCards("he") / 2);
		},
		check(card) {
			return 6.5 - get.value(card);
		},
		discard: false,
		lose: false,
		delay: false,
		content() {
			"step 0";
			player.recast(cards);
			// "step 1";
			// player.chooseButtonTarget({
			// 	createDialog: [
			// 		`###${get.prompt(event.skill)}###<div class="text center">视为对一名角色使用【杀】或【决斗】</div>`,
			// 		[
			// 			[
			// 				['基本','','sha'],
			// 				["锦囊",'','juedou'],
			// 			],
			// 			"vcard",
			// 		],
			// 	],
			// 	filterButton(button) {
			// 		return player.hasUseTarget({name:button.link[2]});
			// 	},
			// 	filterTarget(card, player, target) {
			// 		const link = ui.selected.buttons[0].link;
			// 		// return lib.filter.cardEnabled({name:link[2]},_status.event.player, target);
			// 		return player.canUse({name:link[2]},target);
			// 	},
			// 	selectTarget() {
			// 		return 1
			// 	},
			// 	filterOk() {
			// 		if (ui.selected.buttons.length&&ui.selected.targets.length) {
			// 			return true;
			// 		}
			// 		return false;
			// 	},
			// 	ai1(button) {
			// 		return player.getUseValue({name:button.link[2]},true,false);
			// 	},
			// 	ai2(target) {
			// 		var player=get.player();
			// 		return player.getUseValue({name:button.link[2]},true,false);
			// 	},
			// })
			// 'step 2'
			// if (result.bool) {
			// 	player.useCard(
			// 		{
			// 			name:result.buttons[0].link[2],
			// 			isCard: true,
			// 			storage: { yhky_cyjiuxian: true },
			// 		},
			// 		result.targets[0],
			// 	);
			// }
			'step 1'
			player.addTempSkill("yhky_cyjiuxian_help");
			player.chooseUseTarget(
				{
					name: "juedou",
					isCard: true,
					storage: { yhky_cyjiuxian: true },
				},
				true
			);
		},
		// group:['yhky_cyjiuxian_help'],
		ai: {
			order() {
				return 0.9 * get.order({ name: "juedou" });
			},
			tag: {
				respond: 2,
				respondSha: 2,
				damage: 1,
			},
			result: {
				player(player) {
					let target = null,
						maxval = 0;
					for (let i of game.players) {
						let jdeff = get.effect(
							i,
							{
								name: "juedou",
								isCard: true,
								cards: ui.selected.cards,
								storage: { yhky_cyjiuxian: true },
							},
							player,
							player
						);
						if (
							i === player ||
							!player.canUse(
								{
									name: "juedou",
									isCard: true,
									cards: ui.selected.cards,
									storage: { yhky_cyjiuxian: true },
								},
								i
							) ||
							jdeff < 0
						) {
							continue;
						}
						let receff = 0;
						game.filterPlayer(function (current) {
							if (player != current && i.inRange(current) && current.isDamaged()) {
								receff = Math.max(receff, get.recoverEffect(current, i, i));
							}
						});
						if (jdeff + receff / 5 > maxval) {
							target = i;
							maxval = jdeff + receff / 5;
						}
					}
					if (target) {
						return maxval / 80;
					}
					return 0;
				},
			},
		},
		subSkill: {
			help: {
				trigger: { global: "damageSource" },
				filter(event, player) {
					return (
						event.card &&
						event.card.storage &&
						event.card.storage.yhky_cyjiuxian &&
						event.player.isIn() &&
						event.getParent(2).targets.includes(event.player) &&
						game.hasPlayer(current => {
							return current == player || player.inRange(current);
						})
					);
				},
				direct: true,
				forced: true,
				charlotte: true,
				content() {
					"step 0";
					player
						.chooseTarget("救陷：令你或攻击范围内一名角色回复1点体力并摸2张牌？", (card, player, target) => {
							if (_status.event.player == target) {
								return true;
							}
							return _status.event.player.inRange(target);
						})
						// .set("targetx", player)
						.set("ai", target => get.recoverEffect(target, _status.event.player, _status.event.player));
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						player.logSkill("yhky_cyjiuxian_help", target);
						target.recover(player);
						target.draw(2,player);
					}
				},
			},
		},
	},
	yhky_cyyinjun:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		trigger: { player: "useCardAfter" },
		filter(event, player) {
			if (get.name(event.card, false) != "sha" && get.type2(event.card) != "trick") {
				return false;
			}
			if (event.targets.length != 1 || !event.targets[0].isIn()) {
				return false;
			}
			if (!player.canUse(new lib.element.VCard({ name: "sha" }), event.targets[0], false)) {
				return false;
			}
			return player.hasHistory("lose", evt => {
				if (evt.getParent() != event) {
					return false;
				}
				return event.cards.every(card => {
					return evt.hs.includes(card);
				});
			});
		},
		prompt2(event, player) {
			return `视为对${get.translation(event.targets)}使用一张无伤害来源的【杀】`;
		},
		check(event, player) {
			const sha = new lib.element.VCard({ name: "sha" });
			return Math.max(...[event.targets[0], player].map(source => get.effect(event.targets[0], sha, source, player))) > 0;
		},
		logTarget: "targets",
		// *cost(event,map){
		// 	const player = map.player,
		// 		trigger = map.trigger,
		// 		target = trigger.targets[0];
		// 	var result = yield player.chooseButton(
		// 		[
		// 			`###${get.prompt(event.skill)}###<div class="text center">视为对${target}使用【杀】或【决斗】</div>`,
		// 			[
		// 				['基本', '', 'sha'],
		// 				["锦囊", '', 'juedou'],
		// 			],
		// 			"vcard",
		// 		],
		// 	)
		// 	.set('filterButton', (button) => {
		// 		return _status.event.player.canUse({ name: button.link[2] }, target);
		// 	})
		// 	.set('ai', function (button) {
		// 		var trigger = _status.event;
		// 		return get.effect_use(trigger.targets[0], { name: button.link[2] }, trigger.player)
		// 		// return _status.event.player.getUseValue({name:button.link[2]},true,false);
		// 	}).forResult();
		// 	if(result.bool){
		// 		event._result = {
		// 			bool:true,
		// 			card:result.links[0]
		// 		}
		// 	}
		// },
		// *content(event, map) {
		// 	const player = map.player,
		// 		trigger = map.trigger,
		// 		target = trigger.targets[0],
		// 		card = event.card;
		// 	yield (player.useCard(new lib.element.VCard({ name: card[2] }), target, false).oncard = () => {
		// 		get.event().customArgs.default.customSource = {
		// 			isDead: () => true,
		// 		};
		// 	});
		// 	if (player.getHistory("useSkill", evt => evt.skill == "yhky_cyyinjun").length > player.getHp()) {
		// 		player.tempBanSkill("yhky_cyyinjun");
		// 	}
		// },
		*content(event, map) {
			const player = map.player,
				trigger = map.trigger,
				target = trigger.targets[0];
			yield (player.useCard(new lib.element.VCard({ name: "sha" }), target, false).oncard = () => {
				get.event().customArgs.default.customSource = {
					isDead: () => true,
				};
			});
			if (player.getHistory("useSkill", evt => evt.skill == "dcyinjun").length > player.getHp()) {
				player.tempBanSkill("dcyinjun");
			}
		},

	},
	yhky_cyqinlong:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		enable: "phaseUse",
		limited: true,
		skillAnimation: true,
		animationColor: "fire",
		filterCard: () => false,
		selectCard: [-1, -2],
		filterTarget: true,
		selectTarget: -1,
		multiline: true,
		async contentBefore(event, trigger, player) {
			// 目前并无换肤素材
			// player.changeSkin({ characterName: "yhky_caoying" }, "yhky_caoying_shadow");
			player.awakenSkill("yhky_cyqinlong");
		},
		async content(event, trigger, player) {
			const target = event.target;
			const delt = target.getHp(true) - 1,
				num = Math.abs(delt);
			if (delt != 0) {
				if (delt > 0) {
					const next = target.changeHp(-delt);
					next._triggered = null;
					await next;
				} else await target.recover(num);
			}
			if (num > 0) await target.changeHujia(num + (player == target ? 2 : 0), null, true);
			else if (player == target) await target.changeHujia(2, null, true);

			// await player.addSkill()
		},
		async contentAfter(event, trigger, player) {
			game.addGlobalSkill("yhky_cyqinlong_tanchengxiangdai");
			// player.$fullscreenpop("向死存汉！", "fire");
			// const cards = ["cardPile", "discardPile"].map(pos => Array.from(ui[pos].childNodes)).flat();
			// const filter = card => ["shan", "tao", "jiu"].includes(card.name);
			// const cardx = cards.filter(filter);
			// var cardChange=function(card){
			// 	if(Array.isArray(card)){
			// 		for(var i of card){
			// 			cardChange(i);
			// 		}
			// 	}
			// 	else {
			// 		card.YB_init([card.suit, card.number, 'sha', 'fire', get.YB_tag(card)]);
			// 	}
			// }
			// if (cardx.length) {
			// 	game.log(cardx, "变成了火【杀】");
			// 	await cardChange(cardx);
			// }
			// for (const target of game.filterPlayer()) {
			// 	const sishis = target.getCards("hej", filter);
			// 	if (sishis.length) {
			// 		target.$throw(sishis);
			// 		game.log(sishis, "变成了火【杀】");
			// 		await cardChange(sishis);
			// 	}
			// }
		},
		ai: {
			order: 10,
			result: {
				player(player) {
					return 1;
				},
			},
		},
		subSkill: {
			xiangsicunhan: {
				persevereSkill: true,
				ai: {
					viewHandcard: true,
					skillTagFilter(player, tag, arg) {
						if (player == arg) {
							return false;
						}
					},
				},
				// trigger: {
				// 	global: ["loseAfter", "equipAfter", "loseAsyncAfter", "cardsDiscardAfter"],
				// },
				forced: true,
				silent: true,
				// firstDo: true,
				// filter(event, player) {
				// 	const nameList = ["shan", "tao", "jiu"];
				// 	return event.getd().some(card => {
				// 		return nameList.includes(get.name(card, false)) && get.position(card, true) === "d";
				// 	});
				// },
				// async content(event, trigger, player) {
				// 	const nameList = ["shan", "tao", "jiu"];
				// 	const cards = trigger.getd().filter(card => {
				// 		return nameList.includes(get.name(card, false)) && get.position(card, true) === "d";
				// 	});
				// 	var cardChange=function(card){
				// 		if(Array.isArray(card)){
				// 			for(var i of card){
				// 				cardChange(i);
				// 			}
				// 		}
				// 		else {
				// 			card.YB_init([card.suit, card.number, 'sha', 'fire', get.YB_tag(card)]);
				// 		}
				// 	}
				// 	game.log(cards, "变成了火【杀】");
				// 	await cardChange(cards);
				// },
			},
		},
	},
	yhky_cylingren:{
		audio: 'xinfu_lingren',
		persevereSkill: true,
		derivation: ["yhky_cyjianxiong", "yhky_cyxingshang",'yhky_cyhuituo'],
		group: [/*"yhky_cylingren_use",'yhky_cylingren_tar',*/'yhky_cylingren_draw'],
		trigger: {
			player: "useCardToPlayered",
			target: "useCardToTargeted",
		},
		filter(event, player,name) {
			if(name=='useCardToTargeted'){
				if(event.player==player)return false;
				if(!event.player.isIn())return false;
			}
			else if (event.getParent().triggeredTargets3.length > 1) {
				return false;
			}
			if (!["basic", "trick"].includes(get.type(event.card))) {
				return false;
			}
			return get.tag(event.card, "damage");
		},
		usable: 2,
		async cost(event, trigger, player) {
			if(event.triggername=='useCardToTargeted'){
				event.result = await player.chooseBool(get.prompt('yhky_cylingren'),'猜测'+get.translation(trigger.player)+'的手牌构成？')
					.set("ai", target => {
						return 2 - get.attitude(get.player(), target);
					})
					.forResult();
				if(event.result.bool)event.result = {
					bool: true,
					target:trigger.player,
					targets:[trigger.player],
				};
			}
			else {
				event.result = await player
					.chooseTarget(get.prompt(event.name.slice(0, -5)), "选择一名目标角色并猜测其手牌构成", (card, player, target) => {
						return _status.event.targets.includes(target);
					})
					.set("ai", target => {
						return 2 - get.attitude(get.player(), target);
					})
					.set("targets", trigger.targets)
					.forResult();
			}
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
			} = event;
			const list = ["basic", "trick", "equip"].map(type => ["", "", "caoying_" + type]);
			const { result } = await player
				.chooseButton(["凌人：猜测其有哪些类别的手牌", [list, "vcard"]], [0, 3], true)
				.set("ai", button => {
					return get.event("choice").includes(button.link[2].slice(8));
				})
				.set(
					"choice",
					(() => {
						if (!target.countCards("h")) {
							return [];
						}
						let choice = [],
							known = target.getKnownCards(player),
							unknown = target.getCards("h", i => !known.includes(i));
						for (let i of known) {
							choice.add(get.type2(i, target));
						}
						if (!unknown.length || choice.length > 2) {
							return choice;
						}
						let rand = 0.05;
						if (!choice.includes("basic")) {
							if (unknown.some(i => get.type(i, null, target) === "basic")) {
								rand = 0.95;
							}
							if (Math.random() < rand) {
								choice.push("basic");
							}
						}
						if (!choice.includes("trick")) {
							if (unknown.some(i => get.type(i, "trick", target) === "trick")) {
								rand = 0.9;
							} else {
								rand = 0.1;
							}
							if (Math.random() < rand) {
								choice.push("trick");
							}
						}
						if (!choice.includes("equip")) {
							if (unknown.some(i => get.type(i, null, target) === "equip")) {
								rand = 0.75;
							} else {
								rand = 0.25;
							}
							if (Math.random() < rand) {
								choice.push("equip");
							}
						}
						return choice;
					})()
				);
			if (!result?.bool) {
				return;
			}
			const choices = result.links.map(i => i[2].slice(8));
			if (!event.isMine() && !event.isOnline()) {
				await game.delayx();
			}
			let num = 0;
			["basic", "trick", "equip"].forEach(type => {
				if (choices.includes(type) == target.hasCard(card => get.type2(card, target) === type, "h")) {
					num++;
				}
			});
			player.popup("猜对" + get.cnNumber(num) + "项");
			game.log(player, "猜对了" + get.cnNumber(num) + "项");
			if (num > 0) {
				trigger.trigger('yhky_cylingren_right');
				trigger.num = num;
				trigger.caier = player;
				if(event.triggername=='useCardToTargeted'){//成为目标的分支
					
				}
				else {//指定目标的分支
					const map = trigger.customArgs;
					const id = target.playerid;
					map[id] ??= {};
					if (typeof map[id].extraDamage != "number") {
						map[id].extraDamage = 0;
					}
					map[id].extraDamage++;
				}
			}
			if (num > 1) {
				if(event.triggername=='useCardToTargeted'){//成为目标的分支
					const map = trigger.customArgs;
					const id = player.playerid;
					map[id] ??= {};
					if (typeof map[id].extraDamage != "number") {
						map[id].extraDamage = 0;
					}
					map[id].extraDamage--
				}
				else {//指定目标的分支
					await trigger.getParent().directHit.add(target);
				}
			}
			if (num > 2) {
				if(event.triggername=='useCardToTargeted'){//成为目标的分支
					await player.discardPlayerCard('he', target, true, '弃置其至多两张牌',[1,2]).set("target", target).set("complexSelect", false).set("ai", lib.card.guohe.ai.button);
					// await player.gainMaxHp();
					// await player.recover(2);
				}
				else {//指定目标的分支
					let listx = get.info('yhky_cylingren').derivation;
					for(var i of listx){
						if(player.hasSkill(i))listx.remove(i);
					}
					const chooseSkill = await player.chooseControl(listx).set('prompt',"选择一项技能获得").forResult();
					if (chooseSkill.control) {
						await player.addSkill(chooseSkill.control);
					}
				}
			}
		},
		subSkill:{
			use:{
				audio: 'yhky_cylingren',
				trigger: { player: "useCardToPlayered" },
				filter(event, player) {
					if (event.getParent().triggeredTargets3.length > 1) {
						return false;
					}
					if (!["basic", "trick"].includes(get.type(event.card))) {
						return false;
					}
					return get.tag(event.card, "damage");
				},
				usable: 1,
				async cost(event, trigger, player) {
					event.result = await player
						.chooseTarget(get.prompt(event.name.slice(0, -5)), "选择一名目标角色并猜测其手牌构成", (card, player, target) => {
							return _status.event.targets.includes(target);
						})
						.set("ai", target => {
							return 2 - get.attitude(get.player(), target);
						})
						.set("targets", trigger.targets)
						.forResult();
				},
				async content(event, trigger, player) {
					const {
						targets: [target],
					} = event;
					const list = ["basic", "trick", "equip"].map(type => ["", "", "caoying_" + type]);
					const { result } = await player
						.chooseButton(["凌人：猜测其有哪些类别的手牌", [list, "vcard"]], [0, 3], true)
						.set("ai", button => {
							return get.event("choice").includes(button.link[2].slice(8));
						})
						.set(
							"choice",
							(() => {
								if (!target.countCards("h")) {
									return [];
								}
								let choice = [],
									known = target.getKnownCards(player),
									unknown = target.getCards("h", i => !known.includes(i));
								for (let i of known) {
									choice.add(get.type2(i, target));
								}
								if (!unknown.length || choice.length > 2) {
									return choice;
								}
								let rand = 0.05;
								if (!choice.includes("basic")) {
									if (unknown.some(i => get.type(i, null, target) === "basic")) {
										rand = 0.95;
									}
									if (Math.random() < rand) {
										choice.push("basic");
									}
								}
								if (!choice.includes("trick")) {
									if (unknown.some(i => get.type(i, "trick", target) === "trick")) {
										rand = 0.9;
									} else {
										rand = 0.1;
									}
									if (Math.random() < rand) {
										choice.push("trick");
									}
								}
								if (!choice.includes("equip")) {
									if (unknown.some(i => get.type(i, null, target) === "equip")) {
										rand = 0.75;
									} else {
										rand = 0.25;
									}
									if (Math.random() < rand) {
										choice.push("equip");
									}
								}
								return choice;
							})()
						);
					if (!result?.bool) {
						return;
					}
					const choices = result.links.map(i => i[2].slice(8));
					if (!event.isMine() && !event.isOnline()) {
						await game.delayx();
					}
					let num = 0;
					["basic", "trick", "equip"].forEach(type => {
						if (choices.includes(type) == target.hasCard(card => get.type2(card, target) === type, "h")) {
							num++;
						}
					});
					player.popup("猜对" + get.cnNumber(num) + "项");
					game.log(player, "猜对了" + get.cnNumber(num) + "项");
					if (num > 0) {
						trigger.trigger('yhky_cylingren_right');
						trigger.num = num;
						trigger.caier = player;
						const map = trigger.customArgs;
						const id = target.playerid;
						map[id] ??= {};
						if (typeof map[id].extraDamage != "number") {
							map[id].extraDamage = 0;
						}
						map[id].extraDamage++;
					}
					if (num > 1) {
						// await player.draw(2);
						await trigger.getParent().directHit.add(target);
					}
					if (num > 2) {
						let listx = get.info('yhky_cylingren').derivation;
						for(var i of listx){
							if(player.hasSkill(i))listx.remove(i);
						}
						const chooseSkill = await player.chooseControl(listx).set('prompt',"选择一项技能获得").forResult();
						if (chooseSkill.control) {
							await player.addSkill(chooseSkill.control);
						}
						// await player.addTempSkills(get.info(event.name).derivation, { player: "phaseBegin" });
					}
					// var right = trigger.trigger('yhky_cylingren_right');
					// right.num = num;
					// await right;
				},
			},
			tar:{
				audio: 'yhky_cylingren',
				trigger: { target: "useCardToPlayered" },
				filter(event, player) {
					// if (!["basic", "trick"].includes(get.type(event.card))) {
					// 	return false;
					// }
					return get.tag(event.card, "damage")&&player!=event.player;
				},
				usable: 1,
				// async cost(event, trigger, player) {
				// 	event.result = await player
				// 		.chooseTarget(get.prompt(event.name.slice(0, -5)), "选择一名目标角色并猜测其手牌构成", (card, player, target) => {
				// 			return _status.event.targets.includes(target);
				// 		})
				// 		.set("ai", target => {
				// 			return 2 - get.attitude(get.player(), target);
				// 		})
				// 		.set("targets", trigger.targets)
				// 		.forResult();
				// },
				async content(event, trigger, player) {
					var target = trigger.player;
					// const {
					// 	targets: [target],
					// } = event;
					const list = ["basic", "trick", "equip"].map(type => ["", "", "caoying_" + type]);
					const { result } = await player
						.chooseButton(["凌人：猜测其有哪些类别的手牌", [list, "vcard"]], [0, 3], true)
						.set("ai", button => {
							return get.event("choice").includes(button.link[2].slice(8));
						})
						.set(
							"choice",
							(() => {
								if (!target.countCards("h")) {
									return [];
								}
								let choice = [],
									known = target.getKnownCards(player),
									unknown = target.getCards("h", i => !known.includes(i));
								for (let i of known) {
									choice.add(get.type2(i, target));
								}
								if (!unknown.length || choice.length > 2) {
									return choice;
								}
								let rand = 0.05;
								if (!choice.includes("basic")) {
									if (unknown.some(i => get.type(i, null, target) === "basic")) {
										rand = 0.95;
									}
									if (Math.random() < rand) {
										choice.push("basic");
									}
								}
								if (!choice.includes("trick")) {
									if (unknown.some(i => get.type(i, "trick", target) === "trick")) {
										rand = 0.9;
									} else {
										rand = 0.1;
									}
									if (Math.random() < rand) {
										choice.push("trick");
									}
								}
								if (!choice.includes("equip")) {
									if (unknown.some(i => get.type(i, null, target) === "equip")) {
										rand = 0.75;
									} else {
										rand = 0.25;
									}
									if (Math.random() < rand) {
										choice.push("equip");
									}
								}
								return choice;
							})()
						);
					if (!result?.bool) {
						return;
					}
					const choices = result.links.map(i => i[2].slice(8));
					if (!event.isMine() && !event.isOnline()) {
						await game.delayx();
					}
					let num = 0;
					["basic", "trick", "equip"].forEach(type => {
						if (choices.includes(type) == target.hasCard(card => get.type2(card, target) === type, "h")) {
							num++;
						}
					});
					player.popup("猜对" + get.cnNumber(num) + "项");
					game.log(player, "猜对了" + get.cnNumber(num) + "项");
					if (num > 0) {
						trigger.trigger('yhky_cylingren_right');
						trigger.num = num;
						trigger.caier = player;
						const map = trigger.customArgs;
						const id = player.playerid;
						map[id] ??= {};
						if (typeof map[id].extraDamage != "number") {
							map[id].extraDamage = 0;
						}
						map[id].extraDamage--;
					}
					if (num > 1) {
						await player.discardPlayerCard('he', target, true, '弃置其至多两张牌',[1,2]).set("target", target).set("complexSelect", false).set("ai", lib.card.guohe.ai.button);
					}
					if (num > 2) {
						await player.gainMaxHp();
						await player.recover(2);
					}
				},
			},
			draw:{
				audio: "yhky_cylingwei",
				persevereSkill: true,
				trigger: {
					// player: ["gainAfter", "damageEnd"],
					// source: "damageSource",
					// global: "loseAsyncAfter",
					global:'yhky_cylingren_right',
				},
				filter(event, player) {
					// if (player.countMark("yhky_cylingwei") >= lib.skill.yhky_cylingwei.maxMarkCount) return false;
					// if (event.name === "damage") return event.num > 0;
					// return event.getg(player).length > 0;
					return event.num > 0&&event.caier == player;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					await player.draw(trigger.num);
				},

			},
		},
	},
	yhky_cyjianxiong:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		trigger: { player: "damageEnd" },
		content() {
			"step 0";
			if (get.itemtype(trigger.cards) == "cards" && get.position(trigger.cards[0], true) == "o") {
				player.gain(trigger.cards, "gain2");
			}
			player.draw("nodelay");
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (player.hasSkillTag("jueqing", false, target)) {
						return [1, -1];
					}
					if (get.tag(card, "damage") && player != target) {
						var cards = card.cards,
							evt = _status.event;
						if (evt.player == target && card.name == "damage" && evt.getParent().type == "card") {
							cards = evt.getParent().cards.filterInD();
						}
						if (target.hp <= 1) {
							return;
						}
						if (get.itemtype(cards) != "cards") {
							return;
						}
						for (var i of cards) {
							if (get.name(i, target) == "tao") {
								return [1, 4.5];
							}
						}
						if (get.value(cards, target) >= 7 + target.getDamagedHp()) {
							return [1, 2.5];
						}
						return [1, 0.6];
					}
				},
			},
		},
	},
	yhky_cyxingshang:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		trigger: { global: "die" },
		filter(event, player) {
			return player.isDamaged() || event.player.countCards("he") > 0;
		},
		direct: true,
		content() {
			"step 0";
			var choice = [];
			if (player.isDamaged()) {
				choice.push("回复体力");
			}
			if (trigger.player.countCards("he")) {
				choice.push("获得牌");
			}
			choice.push("cancel2");
			player
				.chooseControl(choice)
				.set("prompt", get.prompt2("yhky_cyxingshang"))
				.set("ai", function () {
					if (choice.length == 2) {
						return 0;
					}
					if (get.value(trigger.player.getCards("he")) > 8) {
						return 1;
					}
					return 0;
				});
			"step 1";
			if (result.control != "cancel2") {
				player.logSkill(event.name, trigger.player);
				if (result.control == "获得牌") {
					event.togain = trigger.player.getCards("he");
					player.gain(event.togain, trigger.player, "giveAuto", "bySelf");
				} else {
					player.recover();
				}
			}
		},
	},
	yhky_cyhuituo:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		trigger: { player: "damageEnd" },
		direct: true,
		content() {
			"step 0";
			var forced = event.forced === undefined ? false : event.forced;
			var info = get.skillInfoTranslation("yhky_cyhuituo", player);
			var str = `###${forced ? "恢拓：请选择一名角色" : get.prompt("yhky_cyhuituo")}###令一名角色判定。若结果为红色，其回复1点体力；若结果为黑色，其摸${get.cnNumber(trigger.num)}张牌`;
			player.chooseTarget(str, event.forced).set("ai", function (target) {
				var player = _status.event.player;
				if (get.attitude(player, target) > 0) {
					return get.recoverEffect(target, player, player) + 1;
				}
				return 0;
			});
			"step 1";
			if (result.bool) {
				player.logSkill("yhky_cyhuituo", result.targets);
				var target = result.targets[0];
				event.target = target;
				target.judge(function (card) {
					if (target.hp == target.maxHp) {
						if (get.color(card) == "red") {
							return -1;
						}
					}
					if (get.color(card) == "red") {
						return 1;
					}
					return 0;
				});
			} else {
				event.finish();
			}
			"step 2";
			switch (result.color) {
				case "red":
					if (event.target.hp < event.target.maxHp) {
						event.target.recover();
					}
					break;

				case "black":
					event.target.draw(trigger.num);
					break;

				default:
					break;
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
		},
	},
	yhky_cyzhanlong:{
		audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		usable:1,

	},






































}