import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

const skill = {
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
		derivation: ["yhky_lzyzhanjue", "yhky_lzyfengpo", "yhky_lzyzhaolie", "yhky_lzyfenshen"],
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
}