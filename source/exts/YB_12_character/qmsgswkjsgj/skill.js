import { lib, game, ui, get, ai, _status } from '../../../../../../noname.js';
export { skill };

/** @type { importCharacterConfig['skill'] } */
const skill = {

	//----------------------------全民三国杀我开局神郭嘉
	//界戏志才
	qmsgswkjsgj_xianfu: {
		audio: 'xianfu',
		trigger: {
			global: ['phaseBefore', 'die'],
			player: 'enterGame',
		},
		locked: true,
		filter(event, player, name) {
			event.xianfu_bool = false;
			if (name == 'die') return player.storage.xianfu2 && player.storage.xianfu2.includes(event.player) && game.hasPlayer((current) => current != player && current != event.player);
			if (name == 'phaseBefore' && event.player == player) return game.hasPlayer((current) => current != player);
			event.xianfu_bool = true;
			return game.hasPlayer((current) => current != player) && (event.name != 'phase' || game.phaseNumber == 0);
		},
		async cost(event, trigger, player) {
			var bool = trigger.xianfu_bool;
			const result = await player
				.chooseTarget('请' + (player.storage.xianfu2 ? '重新' : '') + '选择【先辅】的目标', lib.translate.xianfu_info, bool, function (card, player, target) {
					return target != player /*&& (!player.storage.xianfu2 || !player.storage.xianfu2.includes(target))*/;
				})
				.set('ai', function (target) {
					let att = get.attitude(_status.event.player, target);
					if (att > 0) return att + 1;
					if (att == 0) return Math.random();
					return att;
				})
				.set('animate', false)
				.forResult();
			if (result.bool)
				event.result = {
					bool: true,
					cost_data: result.targets[0],
				};
		},
		logAudio: () => 2,
		async content(event, trigger, player) {
			let target = event.cost_data;
			let targetold = [];
			if (player.storage.xianfu2 && player.storage.xianfu2.length) {
				targetold = player.storage.xianfu2;
			}
			if (!player.storage.xianfu2 || player.storage.xianfu2.length) player.storage.xianfu2 = [];
			player.storage.xianfu2.push(target);
			player.addSkill('qmsgswkjsgj_xianfu2');

			const func = (player, target, targetold) => {
				if (targetold?.length)
					for (var i of targetold) {
						if (i.storage.xianfu_mark && i.storage.xianfu_mark.includes(player)) {
							i.storage.xianfu_mark.remove(player);
							if (i.storage.xianfu_mark.length == 0) {
								delete i.storage.xianfu_mark;
								i.unmarkSkill('xianfu_mark');
								i.removeSkill('xianfu_mark');
							}
						}
					}
				if (!target.storage.xianfu_mark) target.storage.xianfu_mark = [];
				target.storage.xianfu_mark.add(player);
				target.storage.xianfu_mark.sortBySeat();
				target.markSkill('xianfu_mark', null, null, true);
			};
			if (event.isMine()) func(player, target, targetold);
			else if (player.isOnline2()) player.send(func, player, target, targetold);
		},
		// group:['qmsgswkjsgj_xianfu_change'],
		// subSkill:{
		// 	change:{
		// 		audio:'xianfu',
		// 		logAudio: () => 2,
		// 		trigger: {
		// 			player: "phaseBefore",
		// 			global:'die',
		// 		},
		// 		filter(event,player,name){
		// 			if(name=='die')return event.player&&game.hasPlayer(current => current != player);
		// 		}
		// 	}
		// }
	},

	qmsgswkjsgj_xianfu2: {
		audio: 'xianfu',
		charlotte: true,
		trigger: { global: ['damageEnd', 'recoverEnd'] },
		forced: true,
		sourceSkill: 'qmsgswkjsgj_xianfu',
		filter(event, player) {
			if (event.player.isDead() || !player.storage.xianfu2 || !player.storage.xianfu2.includes(event.player) || event.num <= 0) {
				return false;
			}
			if (event.name == 'damage') {
				return true;
			}
			return player.isDamaged();
		},
		logAudio(event, player) {
			if (event.name == 'damage') {
				return ['xianfu5.mp3', 'xianfu6.mp3'];
			}
			return ['xianfu3.mp3', 'xianfu4.mp3'];
		},
		logTarget: 'player',
		content() {
			'step 0';
			var target = trigger.player;
			if (!target.storage.xianfu_mark) {
				target.storage.xianfu_mark = [];
			}
			target.storage.xianfu_mark.add(player);
			target.storage.xianfu_mark.sortBySeat();
			target.markSkill('xianfu_mark');
			game.delayx();
			('step 1');
			var card = trigger.card ? trigger.card : null;
			var source = trigger.source ? trigger.source : 'nosource';
			var nature = trigger.nature ? trigger.nature : null;
			player[trigger.name](trigger.num, card, source, nature);
		},
		onremove(player) {
			if (!player.storage.xianfu2) {
				return;
			}
			game.countPlayer(function (current) {
				if (player.storage.xianfu2.includes(current) && current.storage.xianfu_mark) {
					current.storage.xianfu_mark.remove(player);
					if (!current.storage.xianfu_mark.length) {
						current.unmarkSkill('xianfu_mark');
					} else {
						current.markSkill('xianfu_mark');
					}
				}
			});
			delete player.storage.xianfu2;
		},
		group: 'qmsgswkjsgj_xianfu3',
	},
	qmsgswkjsgj_xianfu3: {
		trigger: { global: 'dieBegin' },
		silent: true,
		sourceSkill: 'xianfu',
		filter(event, player) {
			return event.player == player || (player.storage.xianfu2 && player.storage.xianfu2.includes(player));
		},
		content() {
			if (player == trigger.player) {
				lib.skill.qmsgswkjsgj_xianfu2.onremove(player);
			} else {
				player.storage.xianfu2.remove(event.player);
			}
		},
	},
	tiandu_xizhicai: {
		audio: 2,
	},
	qmsgswkjsgj_chouce: {
		audio: 'chouce',
		trigger: { player: 'damageEnd' },
		getIndex: (event) => event.num,
		filter(event) {
			return event.num > 0;
		},
		content() {
			'step 0';
			player.judge();
			('step 1');
			event.color = result.color;
			if (event.color == 'black') {
				var list = [];
				if (player.canMoveCard()) list.push('移牌');
				if (game.countPlayer((c) => c != player && c.countCards('h') > 0)) list.push('偷牌');
				list.push('cancel2');
				player
					.chooseControl(list)
					.set('prompt', '你可以移动场上一张牌或获得一名其他角色的一张手牌')
					.set('ai', function () {
						var player2 = _status.event.player;
						if (player.canMoveCard() && get.YB_movevalue(player2)) return '移牌';
						if (get.YB_tuxi2value(player, 1)) return '偷牌';
						return 'cancel2';
					});
			} else {
				var next = player.chooseTarget('令一名角色摸一张牌');
				if (player.storage.xianfu2 && player.storage.xianfu2.length) {
					next.set('prompt2', '（若目标为' + get.translation(player.storage.xianfu2) + '则改为摸两张牌）');
				}
				next.set('ai', function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target) / Math.sqrt(1 + target.countCards('h'));
					if (target.hasSkillTag('nogain')) att /= 10;
					if (player.storage.xianfu2 && player.storage.xianfu2.includes(target)) return att * 2;
					return att;
				});
			}
			('step 2');
			if (event.color == 'black') {
				if (result.control == 'cancel2') event.goto(4);
				else if (result.control == '移牌') {
					player.moveCard();
					event.goto(4);
				} else {
					player
						.chooseTarget('获得一名其他角色的一张手牌', function (card, player, target) {
							return target.countCards('h');
						})
						.set('ai', function (target) {
							var player = _status.event.player;
							var att = get.attitude(player, target);
							if (att < 0) att = -Math.sqrt(-att);
							else att = Math.sqrt(att);
							return att * lib.card.shunshou.ai.result.target(player, target);
						});
				}
			}
			('step 3');
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, 'green');
				if (event.color == 'black') player.gainPlayerCard(target, 'h', true);
				else {
					if (player.storage.xianfu2 && player.storage.xianfu2.includes(target)) {
						if (!target.storage.xianfu_mark) target.storage.xianfu_mark = [];
						target.storage.xianfu_mark.add(player);
						target.storage.xianfu_mark.sortBySeat();
						target.markSkill('xianfu_mark');
						target.draw(2);
					} else target.draw();
				}
			}
			('step 4');
			player.chooseCardTarget({
				filterTarget(card, player, target) {
					return player != target;
				},
				selectCard: 1,
				position: 'h',
				filterCard() {
					return true;
				},
				filterTarget: (card, player, target) => {
					return player != target;
				},
				ai1(card) {
					if (!ui.selected.cards.length && card.name == 'du') return 20;
					return 10 - get.value(card);
				},
				ai2(target) {
					if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
						return target.hasSkillTag('nodu') ? 0 : -10;
					}
					if (target.hasJudge('lebu')) return 0;
					const nh = target.countCards('h');
					const np = player.countCards('h');
					if (nh >= np - 1 && np <= player.hp && !target.hasSkill('haoshi')) return 0;
					return Math.max(1, 5 - nh);
				},
				prompt: '筹策：是否将一张手牌交给任意角色？',
			});
			('step 5');
			if (result.cards) {
				player.give(result.cards, result.targets[0]);
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (get.tag(card, 'damage')) {
						if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
						if (!target.hasFriend()) return;
						if (target.hp >= 4) return [1, get.tag(card, 'damage') * 1.5];
						if (target.hp == 3) return [1, get.tag(card, 'damage') * 1];
						if (target.hp == 2) return [1, get.tag(card, 'damage') * 0.5];
					}
				},
			},
		},
	},
	//界刘协
	qmsgswkjsgj_tianming: {
		audio: 'tianming',
		trigger: { target: 'useCardToTargeted' },
		check(event, player) {
			return true;
		},
		filter(event, player) {
			return event.card.name == 'sha';
		},
		content() {
			player.draw(2);
		},
		ai: {
			effect: {
				target_use(card, player, target, current) {
					if (card.name == 'sha') return [1, 0.5];
				},
			},
		},
	},
	qmsgswkjsgj_mizhao: {
		audio: 'mizhao',
		enable: 'phaseUse',
		usable: 1,
		audio: 'mizhao',
		filter(event, player) {
			return player.countCards('h') > 0;
		},
		filterCard: true,
		selectCard: -1,
		filterTarget(card, player, target) {
			return player != target;
		},
		discard: false,
		lose: false,
		delay: false,
		ai: {
			order: 1,
			result: {
				player: 0,
				target(player, target) {
					if (target.hasSkillTag('nogain')) return 0;
					if (player.countCards('h') > 1) {
						return 1;
					}
					var players = game.filterPlayer();
					for (var i = 0; i < players.length; i++) {
						if (players[i].countCards('h') && players[i] != target && players[i] != player && get.attitude(player, players[i]) < 0) {
							break;
						}
					}
					if (i == players.length) {
						return 1;
					}
					return -2 / (target.countCards('h') + 1);
				},
			},
		},
		content() {
			'step 0';
			event.target1 = targets[0];
			player.give(cards, targets[0], false);
			('step 1');
			if (!targets[0].countCards('h')) {
				event.finish();
				return;
			}
			var players = game.filterPlayer();
			for (var i = 0; i < players.length; i++) {
				if (players[i] != event.target1 && players[i] != player && event.target1.canCompare(players[i])) {
					break;
				}
			}
			if (i == players.length) {
				event.finish();
			}
			('step 2');
			player
				.chooseTarget(true, '选择拼点目标', function (card, player, target) {
					return _status.event.target1.canCompare(target) && target != player;
				})
				.set('ai', function (target) {
					var player = _status.event.player;
					var eff = get.effect(target, { name: 'sha' }, _status.event.target1, player);
					var att = get.attitude(player, target);
					if (att > 0) {
						return eff - 10;
					}
					return eff;
				})
				.set('target1', event.target1)
				.set('forceDie', true);
			('step 3');
			if (result.targets.length) {
				event.target2 = result.targets[0];
				event.target1.line(event.target2);
				event.target1.chooseToCompare(event.target2);
			} else {
				event.finish();
			}
			('step 4');
			if (!result.tie) {
				if (result.bool) {
					event.shaSource = event.target1;
					event.shaTarget = event.target;
				} else {
					event.shaSource = event.target2;
					event.shaTarget = event.target1;
				}
			} else event.finish();
			('step 5');
			if (event.shaSource.canUse({ name: 'sha', isCard: true }, event.shaTarget, false)) {
				var list = [];
				list.push(['基本', '', 'sha', null]);
				// for(var i of get.YB_natureList()){

				// }
				list.push(['基本', '', 'sha', 'fire']);
				list.push(['基本', '', 'sha', 'thunder']);
				event.shaSource
					.chooseButton(['密诏：选择要对' + get.translation(event.shaTarget) + '使用的牌', [list, 'vcard']], true)
					.set('ai', function (button) {
						// var player = _status.event.player;
						var eff = get.effect(event.shaTarget, { name: button.link[2], nature: button.link[3], isCard: true }, event.shaSource, player);
						return eff;
					})
					.set('filterButton', function (button) {
						return event.shaSource.canUse({ name: button.link[2], nature: button.link[3], isCard: true }, event.shaTarget, false);
					});
			}
			('step 6');
			if (result.buttons) {
				event.shaSource.useCard({ name: 'sha', nature: result.buttons[0].link[3], isCard: true }, event.shaTarget);
			}
		},
	},
	//缝神赵云
	qmsgswkjsgj_juejing: {
		audio: 'xinjuejing',
		mod: {
			maxHandcard(player, num) {
				return 2 + num;
			},
			aiOrder(player, card, num) {
				if (num <= 0 || !player.isPhaseUsing() || !get.tag(card, 'recover')) return num;
				if (player.needsToDiscard() > 1) return num;
				return 0;
			},
		},
		trigger: { player: ['dying', 'dyingAfter'] },
		forced: true,
		content() {
			player.draw();
		},
		group: 'qmsgswkjsgj_juejing_draw',
		subSkill: {
			draw: {
				audio: 'qmsgswkjsgj_juejing',
				trigger: { player: 'phaseDrawBegin2' },
				//priority:-5,
				filter(event, player) {
					return !event.numFixed && player.hp < player.maxHp;
				},
				forced: true,
				content() {
					trigger.num += player.getDamagedHp();
				},
			},
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (target.getHp() > 1) return;
					if (get.tag(card, 'damage') || get.tag(card, 'losehp')) return [1, 1];
				},
			},
		},
	},
	//鬼赐福
	//鬼许攸
	qmsgswkjsgj_baolian: {
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		content: function () {
			player.draw(2);
		},
	},
	qmsgswkjsgj_taiping: {
		trigger: { player: "phaseDrawBegin" },
		forced: true,
		content: function () {
			trigger.num += 2;
		},
	},

	//缝神郭嘉
	qmsgswkjsgj_reshuishi: {
		audio: 'shuishi',
		enable: 'phaseUse',
		usable: 1,
		frequent: true,
		filter(event, player) {
			return player.maxHp < 10;
		},
		content: async function (event, trigger, player) {
			event.cards = [];
			var num = 1;
			while (num--) {
				if (event.cards.length) {
					event.cards = event.cards.filterInD('do');
				}
				var result = await player
					.judge(function (result) {
						var evt = _status.event.getParent('qmsgswkjsgj_reshuishi');
						if (evt && evt.cards) {
							var cardsx = evt.cards.filterInD('do');
							if (get.YB_suit(cardsx).includes(get.suit(result))) return 0;
						}
						return 1;
					})
					.set('judge2', function (result) {
						return result.bool ? true : false;
					})
					.forResult();
				if (!result.card) break;
				if (get.position(result.card, 'do')) {
					event.cards.push(result.card);
				}
				if (!result.bool) break;
				if (player.maxHp >= 10) break;
				if (event.cards.length > 1 && get.YB_suit(event.cards.slice(0, -1)).includes(get.suit(event.cards[event.cards.length - 1]))) {
					break;
				}
				await player.gainMaxHp();
				var again = await player.chooseBool('是否继续发动【慧识】？').set('frequentSkill', 'qmsgswkjsgj_reshuishi').forResult();

				if (again.bool) num++;
				else break;
			}
			var cards = event.cards.filterInD('do');
			if (cards.length) {
				var resultx = await player
					.chooseTarget('将' + get.translation(cards) + '交给一名角色', true)
					.set('ai', function (target) {
						var player = _status.event.player,
							att = get.attitude(player, target);
						if (att <= 0) return att;
						if (target.countCards('h') + _status.event.num >= _status.event.max) att /= 3;
						if (target.hasSkillTag('nogain')) att /= 10;
						return att;
					})
					.set('num', cards.length)
					.set(
						'max',
						game.filterPlayer().reduce((num, i) => Math.max(num, i.countCards('h')), 0),
					)
					.forResult();

				if (resultx.bool) {
					var target = resultx.targets[0];
					await player.line(target, 'green');
					await target.gain(cards, 'gain2', player);
					if (target.isMaxHandcard()) await player.loseMaxHp();
				}
			}
		},
		ai: {
			order: 9,
			result: {
				player: 1,
			},
		},
	},
	qmsgswkjsgj_reshuishiplus: {
		audio: 'shuishi',
		enable: 'phaseUse',
		usable: 1,
		frequent: true,
		filter(event, player) {
			return player.maxHp < 15;
		},
		content: async function (event, trigger, player) {
			event.cards = [];
			var num = 1;
			while (num--) {
				if (event.cards.length) {
					event.cards = event.cards.filterInD('do');
				}
				var result = await player
					.judge(function (result) {
						var evt = _status.event.getParent('qmsgswkjsgj_reshuishiplus');
						if (evt && evt.cards) {
							var cardsx = evt.cards.filterInD('do');
							if (get.YB_suit(cardsx, 'number').includes(get.number(result))) return 0;
						}
						return 1;
					})
					.set('judge2', function (result) {
						return result.bool ? true : false;
					})
					.forResult();
				if (!result.card) break;
				if (get.position(result.card, 'do')) {
					event.cards.push(result.card);
				}
				if (!result.bool) break;
				if (player.maxHp >= 15) break;
				if (event.cards.length > 1 && get.YB_suit(event.cards.slice(0, -1), 'number').includes(get.number(event.cards[event.cards.length - 1]))) {
					break;
				}
				await player.gainMaxHp();
				var again = await player.chooseBool('是否继续发动【慧识】？').set('frequentSkill', 'qmsgswkjsgj_reshuishiplus').forResult();

				if (again.bool) num++;
				else break;
			}
			var cards = event.cards.filterInD('do');
			if (cards.length) {
				var resultx = await player
					.chooseTarget('将' + get.translation(cards) + '交给一名角色', true)
					.set('ai', function (target) {
						var player = _status.event.player,
							att = get.attitude(player, target);
						if (att <= 0) return att;
						if (target.countCards('h') + _status.event.num >= _status.event.max) att /= 3;
						if (target.hasSkillTag('nogain')) att /= 10;
						return att;
					})
					.set('num', cards.length)
					.set(
						'max',
						game.filterPlayer().reduce((num, i) => Math.max(num, i.countCards('h')), 0),
					)
					.forResult();

				if (resultx.bool) {
					var target = resultx.targets[0];
					await player.line(target, 'green');
					await target.gain(cards, 'gain2', player);
					if (target.isMaxHandcard()) await player.loseMaxHp();
				}
			}
		},
		ai: {
			order: 9,
			result: {
				player: 1,
			},
		},
	},
	qmsgswkjsgj_stianyiplus: {
		audio:'stianyi',
		trigger: { player: "damage" },
		forced: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: "gray",
		filter(event,player){
			return true;
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			await player.gainMaxHp(2);
			await player.recover();

			const next = player.chooseTarget(true, "令一名角色获得技能〖佐幸〗");
			next.set("ai", target => get.attitude(_status.event.player, target));

			const result = await next.forResult();
			if (result.bool) {
				const target = result.targets[0];
				player.line(target, "green");
				target.storage.qmsgswkjsgj_zuoxingplus = player;
				await target.addSkills("qmsgswkjsgj_zuoxingplus");
			}
		},
		derivation: "qmsgswkjsgj_zuoxingplus",
	},
	qmsgswkjsgj_zuoxingplus: {
		audio: 'zuoxing',
		enable: "chooseToUse",
		usable: 1,
		filter(event, player) {
			var target = player.storage.qmsgswkjsgj_zuoxingplus;
			if (!target || !target.isIn() || target.maxHp < 2) {
				return false;
			}
			for (var i of lib.inpile) {
				if (get.type(i) == "trick" && event.filterCard({ name: i, isCard: true }, player, event)) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				for (var i of lib.inpile) {
					if (get.type(i) == "trick" && event.filterCard({ name: i, isCard: true }, player, event)) {
						list.push(["锦囊", "", i]);
					}
				}
				return ui.create.dialog("佐幸", [list, "vcard"]);
			},
			check(button) {
				return _status.event.player.getUseValue({ name: button.link[2], isCard: true });
			},
			backup(links, player) {
				return {
					viewAs: {
						name: links[0][2],
						isCard: true,
					},
					filterCard: () => false,
					selectCard: -1,
					popname: true,
					log: false,
					async precontent(event, trigger, player) {
						player.logSkill("qmsgswkjsgj_zuoxingplus");
						const target = player.storage.qmsgswkjsgj_zuoxingplus;
						await target.loseMaxHp();
					},
				};
			},
			prompt(links, player) {
				return "请选择" + get.translation(links[0][2]) + "的目标";
			},
		},
		hiddenCard(player, name) {
			if (get.type(name) == 'trick') return true;
		},
		ai: { order: 1, result: { player: 1 } },
	},
	qmsgswkjsgj_reshuishiplusplus: {
		audio: 'shuishi',
		enable: 'phaseUse',
		usable: 1,
		frequent: true,
		filter(event, player) {
			return player.maxHp < 18;
		},
		content: async function (event, trigger, player) {
			event.cards = [];
			var num = 1;
			while (num--) {
				if (event.cards.length) {
					event.cards = event.cards.filterInD('do');
				}
				var result = await player
					.judge(function (result) {
						var evt = _status.event.getParent('qmsgswkjsgj_reshuishiplusplus');
						if (evt && evt.cards) {
							var cardsx = evt.cards.filterInD('do');
							if (get.YB_suit(cardsx, 'number').includes(get.number(result))) return 0;
						}
						return 1;
					})
					.set('judge2', function (result) {
						return result.bool ? true : false;
					})
					.forResult();
				if (!result.card) break;
				if (get.position(result.card, 'do')) {
					event.cards.push(result.card);
				}
				if (!result.bool) break;
				if (player.maxHp >= 18) break;
				if (event.cards.length > 1 && get.YB_suit(event.cards.slice(0, -1), 'number').includes(get.number(event.cards[event.cards.length - 1]))) {
					break;
				}
				await player.gainMaxHp();
				var again = await player.chooseBool('是否继续发动【慧识】？').set('frequentSkill', 'qmsgswkjsgj_reshuishiplusplus').forResult();

				if (again.bool) num++;
				else break;
			}
			var cards = event.cards.filterInD('do');
			if (cards.length) {
				var resultx = await player
					.chooseTarget('将' + get.translation(cards) + '交给一名角色', true)
					.set('ai', function (target) {
						var player = _status.event.player,
							att = get.attitude(player, target);
						if (att <= 0) return att;
						if (target.countCards('h') + _status.event.num >= _status.event.max) att /= 3;
						if (target.hasSkillTag('nogain')) att /= 10;
						return att;
					})
					.set('num', cards.length)
					.set(
						'max',
						game.filterPlayer().reduce((num, i) => Math.max(num, i.countCards('h')), 0),
					)
					.forResult();

				if (resultx.bool) {
					var target = resultx.targets[0];
					await player.line(target, 'green');
					await target.gain(cards, 'gain2', player);
					if (target.isMaxHandcard()) await player.loseMaxHp();
				}
			}
		},
		ai: {
			order: 9,
			result: {
				player: 1,
			},
		},
	},
	qmsgswkjsgj_stianyiplusplus: {
		audio: 'stianyi',
		trigger: { player: "damage" },
		forced: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: "gray",
		filter(event,player){
			return true;
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			await player.gainMaxHp(2);
			await player.recover();

			const next = player.chooseTarget(true, "令一名角色获得技能〖佐幸〗");
			next.set("ai", target => get.attitude(_status.event.player, target));

			const result = await next.forResult();
			if (result.bool) {
				const target = result.targets[0];
				player.line(target, "green");
				target.storage.qmsgswkjsgj_zuoxingplusplus = player;
				await target.addSkills("qmsgswkjsgj_zuoxingplusplus");
			}
		},
		derivation: "qmsgswkjsgj_zuoxingplusplus",
	},
	qmsgswkjsgj_zuoxingplusplus: {
		audio: 'zuoxing',
		enable: "chooseToUse",
		filter(event, player) {
			var target = player.storage.qmsgswkjsgj_zuoxingplusplus;
			if (!target || !target.isIn() || target.maxHp < 2) {
				return false;
			}
			for (var i of lib.inpile) {
				if (get.type(i) == "trick" && event.filterCard({ name: i, isCard: true }, player, event)) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				for (var i of lib.inpile) {
					if (get.type(i) == "trick" && event.filterCard({ name: i, isCard: true }, player, event)) {
						list.push(["锦囊", "", i]);
					}
				}
				return ui.create.dialog("佐幸", [list, "vcard"]);
			},
			check(button) {
				return _status.event.player.getUseValue({ name: button.link[2], isCard: true });
			},
			backup(links, player) {
				return {
					viewAs: {
						name: links[0][2],
						isCard: true,
					},
					filterCard: () => false,
					selectCard: -1,
					popname: true,
					log: false,
					async precontent(event, trigger, player) {
						player.logSkill("qmsgswkjsgj_zuoxingplusplus");
						const target = player.storage.qmsgswkjsgj_zuoxingplusplus;
						await target.loseMaxHp();
					},
				};
			},
			prompt(links, player) {
				return "请选择" + get.translation(links[0][2]) + "的目标";
			},
		},
		hiddenCard(player, name) {
			if (get.type(name) == 'trick') return true;
		},
		ai: { order: 1, result: { player: 1 } },
	},
	qmsgswkjsgj_resghuishiplusplus: {
		onChooseToUse(event) {
			event.targetprompt2.add(target => {
				if (event.skill !== "qmsgswkjsgj_resghuishiplusplus" || !target.classList.contains("selectable")) {
					return;
				}
				if (
					target.getSkills(null, false, false).some(skill => {
						const info = get.info(skill);
						return info?.juexingji && !target.awakenedSkills.includes(skill);
					})
				) {
					return "觉醒";
				} else {
					return "摸牌";
				}
			});
		},
		audio: 'resghuishi',
		enable: "phaseUse",
		usable: 1,
		skillAnimation: true,
		animationColor: "water",
		filterTarget: true,
		async content(event, trigger, player) {
			const { target } = event;
			const list = target.getSkills(null, false, false).filter(skill => {
				const info = get.info(skill);
				return info?.juexingji && !target.awakenedSkills.includes(skill);
			});
			if (list.length) {
				target.addMark(event.name, 1, false);
				for (const skill of list) {
					const info = get.info(skill);
					if (info.filter && !info.charlotte && !info.qmsgswkjsgj_resghuishiplusplus_filter) {
						info.qmsgswkjsgj_resghuishiplusplus_filter = info.filter;
						info.filter = function (event, player) {
							if (player.hasMark("qmsgswkjsgj_resghuishiplusplus")) {
								return true;
							}
							return this.qmsgswkjsgj_resghuishiplusplus_filter.apply(this, arguments);
						};
						await target.useSkill(skill)
					}
				}
			} else {
				await target.draw(4);
				await target.gainMaxHp(2);
			}
			await player.loseMaxHp(2);
		},
		intro: { content: "发动非Charlotte觉醒技时无视条件" },
		ai: {
			order: 0.1,
			expose: 0.2,
			result: {
				target(player, target) {
					if (player.hasUnknown() || player.maxHp < 5) {
						return 0;
					}
					var list = target.getSkills(null, false, false).filter(function (skill) {
						var info = lib.skill[skill];
						return info && info.juexingji;
					});
					if (list.length || target.hasJudge("lebu") || target.hasSkillTag("nogain")) {
						return 0;
					}
					return 4;
				},
			},
		},
	},
	//界杜预
	qmsgswkjsgj_spwuku: {
		audio: 'spwuku',
		trigger: { global: 'useCard' },
		forced: true,
		preHidden: true,
		filter(event, player) {
			if (get.type(event.card) != 'equip') return false;
			return true;
		},
		content() {
			'step 0';
			player.addMark('spwuku', 1);
			// trigger.trigger("spwukuAfter");
			('step 1');
			trigger.trigger('spwukuAfter');
		},
		contentAfter() {
			trigger.trigger('spwukuAfter');
		},
		marktext: '库',
		intro: {
			content: 'mark',
		},
		ai: {
			combo: 'spmiewu',
			threaten: 3.6,
		},
	},
	qmsgswkjsgj_spsanchen: {
		audio: 'spsanchen',
		trigger: { player: ['spwukuAfter'] },
		forced: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: 'gray',
		filter(event, player) {
			return player.countMark('spwuku') > 2;
		},
		content() {
			player.awakenSkill(event.name);
			player.gainMaxHp();
			player.recover();
			player.addSkills('spmiewu');
		},
		ai: {
			combo: 'spwuku',
		},
		derivation: 'spmiewu',
	},
	//缝神诸葛亮
	qmsgswkjsgj_kuangfeng: {
		audio: 'kuangfeng',
		trigger: { player: 'phaseJieshuBegin' },
		filter(event, player) {
			return player.getExpansions('qixing').length;
		},
		async cost(event, trigger, player) {
			const {
				result: { bool, targets, links: cost_data },
			} = await player.chooseButtonTarget({
				createDialog: [get.prompt2(event.skill), player.getExpansions('qixing')],
				selectButton: 1,
				filterTarget: true,
				ai1(button) {
					if (
						game.hasPlayer((target) => {
							return get.attitude(get.player(), target) < 0;
						})
					) {
						return 1;
					}
					return 0;
				},
				ai2(target) {
					return -get.attitude(get.player(), target);
				},
			}).forResult();
			event.result = {
				bool: bool,
				targets: targets?.sortBySeat(),
				cost_data: cost_data,
			};
		},
		async content(event, trigger, player) {
			const { targets, cost_data: cards } = event;
			targets.forEach((target) => {
				target.addAdditionalSkill(`qmsgswkjsgj_kuangfeng_${player.playerid}`, 'qmsgswkjsgj_kuangfeng2');
				target.markAuto('qmsgswkjsgj_kuangfeng2', [player]);
			});
			player.addTempSkill('qmsgswkjsgj_kuangfeng3', { player: 'phaseJieshuBefore' });
			player.addTempSkill('qmsgswkjsgj_kuangfeng4', { player: 'phaseJieshuBefore' });
			await player.loseToDiscardpile(cards);
		},
		ai: {
			combo: 'qixing',
		},
	},
	qmsgswkjsgj_kuangfeng2: {
		charlotte: true,
		intro: {
			content(storage) {
				return `共有${storage.length}枚标记`;
			},
		},
		ai: {
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, 'fireDamage') && current < 0) {
						return 1.5;
					}
				},
			},
		},
	},
	qmsgswkjsgj_kuangfeng3: {
		trigger: { global: 'damageBegin3' },
		sourceSkill: 'qmsgswkjsgj_kuangfeng',
		filter(event, player) {
			return event.hasNature('fire') && event.player.getStorage('qmsgswkjsgj_kuangfeng2').includes(player);
		},
		charlotte: true,
		forced: true,
		logTarget: 'player',
		content() {
			trigger.num++;
		},
		onremove(player) {
			game.countPlayer2((current) => {
				if (current.getStorage('qmsgswkjsgj_kuangfeng2').includes(player)) {
					current.unmarkAuto('qmsgswkjsgj_kuangfeng2', player);
					current.removeAdditionalSkill(`qmsgswkjsgj_kuangfeng_${player.playerid}`);
				}
			}, true);
		},
	},
	qmsgswkjsgj_kuangfeng4: {
		trigger: { global: 'damageBegin3' },
		sourceSkill: 'qmsgswkjsgj_kuangfeng',
		filter(event, player) {
			return !event.hasNature() && event.player.getStorage('qmsgswkjsgj_kuangfeng2').includes(player);
		},
		charlotte: true,
		forced: true,
		logTarget: 'player',
		content() {
			game.YB_addNature(trigger, 'fire');
		},
		firstDo: true,
		onremove(player) {
			game.countPlayer2((current) => {
				if (current.getStorage('qmsgswkjsgj_kuangfeng2').includes(player)) {
					current.unmarkAuto('qmsgswkjsgj_kuangfeng2', player);
					current.removeAdditionalSkill(`qmsgswkjsgj_kuangfeng_${player.playerid}`);
				}
			}, true);
		},
	},
	qmsgswkjsgj_dawu: {
		trigger: { player: 'phaseJieshuBegin' },
		filter(event, player) {
			return player.getExpansions('qixing').length;
		},
		audio: 'dawu',
		async cost(event, trigger, player) {
			const {
				bool,
				targets,
				links: cost_data,
			} = await player
				.chooseButtonTarget({
					createDialog: [get.prompt2(event.skill), player.getExpansions('qixing')],
					selectButton: [1, game.countPlayer()],
					filterTarget: true,
					selectTarget() {
						return ui.selected.buttons.length;
					},
					complexSelect: true,
					ai1(button) {
						const { player, allUse } = get.event();
						const targets = game.filterPlayer((target) => {
							if (target.isMin() || target.hasSkill('biantian2') || target.hasSkill('qmsgswkjsgj_dawu2')) {
								return false;
							}
							let att = get.attitude(player, target);
							if (att >= 4) {
								if (target.hp > 2 && (target.isHealthy() || target.hasSkillTag('maixie'))) {
									return false;
								}
								if (allUse || target.hp == 1) {
									return true;
								}
								if (target.hp == 2 && target.countCards('he') <= 2) {
									return true;
								}
							}
							return false;
						});
						if (ui.selected.buttons.length < targets.length) {
							return 1;
						}
						return 0;
					},
					ai2(target) {
						const { player, allUse } = get.event();
						if (target.isMin() || target.hasSkill('biantian2') || target.hasSkill('qmsgswkjsgj_dawu2')) {
							return 0;
						}
						let att = get.attitude(player, target);
						if (att >= 4) {
							if (target.hp > 2 && (target.isHealthy() || target.hasSkillTag('maixie'))) {
								return 0;
							}
							if (allUse || target.hp == 1) {
								return att;
							}
							if (target.hp == 2 && target.countCards('he') <= 2) {
								return att * 0.7;
							}
							return 0;
						}
						return -1;
					},
				})
				.set('allUse', player.getExpansions('qixing').length >= game.countPlayer((current) => get.attitude(player, current) > 4) * 2)
				.forResult();
			event.result = {
				bool: bool,
				targets: targets?.sortBySeat(),
				cost_data: cost_data,
			};
		},
		async content(event, trigger, player) {
			const { targets, cost_data: cards } = event;
			targets.forEach((target) => {
				target.addAdditionalSkill(`qmsgswkjsgj_dawu_${player.playerid}`, 'qmsgswkjsgj_dawu2');
				target.markAuto('qmsgswkjsgj_dawu2', [player]);
			});
			player.addTempSkill('qmsgswkjsgj_dawu3', { player: 'phaseJieshuBefore' });
			await player.loseToDiscardpile(cards);
		},
		ai: {
			combo: 'qixing',
		},
	},
	qmsgswkjsgj_dawu2: {
		charlotte: true,
		ai: {
			nofire: true,
			nodamage: true,
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, 'damage') && !get.tag(card, 'thunderDamage')) {
						return 'zeroplayertarget';
					}
				},
			},
		},
		intro: {
			content(storage) {
				return `共有${storage.length}枚标记`;
			},
		},
	},
	qmsgswkjsgj_dawu3: {
		trigger: { global: 'damageBegin4' },
		sourceSkill: 'qmsgswkjsgj_dawu',
		filter(event, player) {
			return !event.hasNature('thunder') && event.player.getStorage('qmsgswkjsgj_dawu2').includes(player);
		},
		forced: true,
		charlotte: true,
		logTarget: 'player',
		content() {
			trigger.cancel();
		},
		onremove(player) {
			game.countPlayer2((current) => {
				if (current.getStorage('qmsgswkjsgj_dawu2').includes(player)) {
					current.unmarkAuto('qmsgswkjsgj_dawu2', [player]);
					current.removeAdditionalSkill(`qmsgswkjsgj_dawu_${player.playerid}`);
				}
			}, true);
		},
	},
	qmsgswkjsgj_guanxing: {
		audio: 'guanxing',
		trigger: { player: ['phaseZhunbeiBegin'] },
		frequent: true,
		filter(event, player, name) {
			return true;
		},
		content() {
			var num = 7;
			('step 0');
			var cards = get.cards(num);
			event.cards = cards;
			game.cardsGotoOrdering(event.cards);
			if (player.hasSkill('qixing')) player.chooseCardButton(event.cards, 1);
			('step 1');
			if (result.links) {
				event.cards.remove(result.links[0]);
				player.addToExpansion(result.links, 'draw').gaintag.add('qixing');
			}
			('step 2');
			var cards = event.cards;
			var next = player.chooseToMove();
			next.set('list', [['牌堆顶', cards], ['牌堆底']]);
			next.set('prompt', event.prompt || '点击或拖动将牌移动到牌堆顶或牌堆底');
			// next.set('filterOk', function (moved) {
			// 	return moved[2].length == 1
			// 	//设置OK按钮触发条件 总数组的第0项数组数量为0
			// });
			next.processAI =
				event.processAI ||
				function (list) {
					let cards = list[0][1],
						player = _status.event.player,
						target = _status.currentPhase || player,
						name = _status.event.getTrigger()?.name,
						countWuxie = (current) => {
							let num = current.getKnownCards(player, (card) => {
								return get.name(card, current) === 'wuxie';
							});
							if (num && current !== player) {
								return num;
							}
							let skills = current.getSkills('invisible').concat(lib.skill.global);
							game.expandSkills(skills);
							for (let i = 0; i < skills.length; i++) {
								let ifo = get.info(skills[i]);
								if (!ifo) {
									continue;
								}
								if (ifo.viewAs && typeof ifo.viewAs != 'function' && ifo.viewAs.name == 'wuxie') {
									if (!ifo.viewAsFilter || ifo.viewAsFilter(current)) {
										num++;
										break;
									}
								} else {
									let hiddenCard = ifo.hiddenCard;
									if (typeof hiddenCard == 'function' && hiddenCard(current, 'wuxie')) {
										num++;
										break;
									}
								}
							}
							return num;
						},
						top = [];
					switch (name) {
						case 'phaseJieshu':
							target = target.next;
						// [falls through]
						case 'phaseZhunbei': {
							let att = get.sgn(get.attitude(player, target)),
								judges = target.getCards('j'),
								needs = 0,
								wuxie = countWuxie(target);
							for (let i = Math.min(cards.length, judges.length) - 1; i >= 0; i--) {
								let j = judges[i],
									cardj = j.viewAs ? { name: j.viewAs, cards: j.cards || [j] } : j;
								if (wuxie > 0 && get.effect(target, j, target, target) < 0) {
									wuxie--;
									continue;
								}
								let judge = get.judge(j);
								cards.sort((a, b) => {
									return (judge(b) - judge(a)) * att;
								});
								if (judge(cards[0]) * att < 0) {
									needs++;
									continue;
								} else {
									top.unshift(cards.shift());
								}
							}
							if (needs > 0 && needs >= judges.length) {
								return [top, cards];
							}
							cards.sort((a, b) => {
								return (get.value(b, target) - get.value(a, target)) * att;
							});
							while (needs--) {
								top.unshift(cards.shift());
							}
							while (cards.length) {
								if (get.value(cards[0], target) > 6 == att > 0) {
									top.push(cards.shift());
								} else {
									break;
								}
							}
							return [top, cards];
						}
						default:
							cards.sort((a, b) => {
								return get.value(b, target) - get.value(a, target);
							});
							while (cards.length) {
								if (get.value(cards[0], target) > 6) {
									top.push(cards.shift());
								} else {
									break;
								}
							}
							return [top, cards];
					}
				};
			('step 3');
			var top = result.moved[0];
			var bottom = result.moved[1];
			// var star = result.moved[2];
			top.reverse();
			for (var i = 0; i < top.length; i++) {
				ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
			}
			for (i = 0; i < bottom.length; i++) {
				ui.cardPile.appendChild(bottom[i]);
			}
			event.result = {
				bool: true,
				moved: [top, bottom],
			};
			game.addCardKnower(top, player);
			game.addCardKnower(bottom, player);
			player.popup(get.cnNumber(top.length) + '上' + get.cnNumber(bottom.length) + '下');
			game.log(player, '将' + get.cnNumber(top.length) + '张牌置于牌堆顶');
			game.updateRoundNumber();
			game.delayx();
		},
		subSkill: {
			on: { charlotte: true },
		},
		ai: {
			guanxing: true,
		},
	},
	//旧谋黄忠
	qmsgswkjsgj_sbliegong: {
		audio: 'sbliegong',
		mod: {
			aiOrder(player, card, num) {
				if (num > 0 && (card.name === 'sha' || get.tag(card, 'draw'))) {
					return num + 6;
				}
			},
			targetInRange(card, player, target) {
				if (card.name == 'sha' && typeof get.number(card) == 'number') {
					if (get.distance(player, target) <= get.number(card)) {
						return true;
					}
				}
			},
			// cardnature(card, player) {
			// 	if (!player.getVEquip(1) && get.name(card, player) == "sha") return false;
			// },

			// attackRangeBase(player) {
			// 	if(player.getVEquip(1))return Infinity;
			// },
		},
		trigger: { player: 'useCardToPlayered' },
		filter(event, player) {
			return !event.getParent()._qmsgswkjsgj_sbliegong_player && event.targets.length == 1 && (event.card.name == 'sha' || (get.type(event.card) == 'trick' && get.tag(event.card, 'damage'))) && player.getStorage('qmsgswkjsgj_sbliegong').length > 0;
		},
		prompt2(event, player) {
			let str = '',
				storage = player.getStorage('qmsgswkjsgj_sbliegong');
			if (storage.length > 1) {
				str += '亮出牌堆顶的' + get.cnNumber(storage.length - 1) + '张牌并增加伤害；且';
			}
			str += '令' + get.translation(event.target) + '不能使用花色为';
			for (let i = 0; i < storage.length; i++) {
				str += get.translation(storage[i]);
			}
			str += '的牌响应' + get.translation(event.card);
			return str;
		},
		logTarget: 'target',
		locked: false,
		check(event, player) {
			const target = event.target;
			if (get.attitude(player, target) > 0) return false;
			if (
				target.hasSkillTag('filterDamage', null, {
					player: player,
					card: event.card,
				})
			)
				return false;
			const storage = player.getStorage('qmsgswkjsgj_sbliegong');
			if (storage.length >= 4) return true;
			if (storage.length < 3) return false;
			if (target.hasShan()) return storage.includes('heart') && storage.includes('diamond');
			return true;
		},
		async content(event, trigger, player) {
			const storage = player.getStorage('qmsgswkjsgj_sbliegong').slice(0);
			const num = storage.length - 1;
			const evt = trigger.getParent();
			if (num > 0) {
				if (typeof evt.baseDamage != 'number') evt.baseDamage = 1;
				const cards = get.cards(num);
				await game.cardsGotoOrdering(cards);
				await player.showCards(cards.slice(0), get.translation(player) + '发动了【烈弓】');
				while (cards.length > 0) {
					const card = cards.pop();
					if (storage.includes(get.suit(card, false))) evt.baseDamage++;
					//ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
				}
				//game.updateRoundNumber();
			}
			evt._qmsgswkjsgj_sbliegong_player = player;
			player.addTempSkill('qmsgswkjsgj_sbliegong_clear');
			const target = trigger.target;
			target.addTempSkill('qmsgswkjsgj_sbliegong_block');
			if (!target.storage.qmsgswkjsgj_sbliegong_block) target.storage.qmsgswkjsgj_sbliegong_block = [];
			target.storage.qmsgswkjsgj_sbliegong_block.push([evt.card, storage]);
			lib.skill.qmsgswkjsgj_sbliegong.updateBlocker(target);
		},
		updateBlocker(player) {
			const list = [],
				storage = player.storage.qmsgswkjsgj_sbliegong_block;
			if (storage?.length) {
				for (const i of storage) list.addArray(i[1]);
			}
			player.storage.qmsgswkjsgj_sbliegong_blocker = list;
		},
		ai: {
			threaten: 3.5,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (arg?.card?.name == 'sha') {
					const storage = player.getStorage('qmsgswkjsgj_sbliegong');
					if (storage.length < 3 || !storage.includes('heart') || !storage.includes('diamond')) return false;
					const target = arg.target;
					if (target.hasSkill('bagua_skill') || target.hasSkill('bazhen') || target.hasSkill('rw_bagua_skill')) return false;
					return true;
				}
				return false;
			},
		},
		intro: {
			content: '已记录花色：$',
			onunmark: true,
		},
		group: ['qmsgswkjsgj_sbliegong_count'],
		subSkill: {
			clear: {
				trigger: { player: 'useCardAfter' },
				forced: true,
				charlotte: true,
				popup: false,
				filter(event, player) {
					return event._qmsgswkjsgj_sbliegong_player == player;
				},
				content() {
					player.unmarkSkill('qmsgswkjsgj_sbliegong');
					player.removeTip('qmsgswkjsgj_sbliegong');
				},
			},
			block: {
				mod: {
					cardEnabled(card, player) {
						if (!player.storage.qmsgswkjsgj_sbliegong_blocker) return;
						const suit = get.suit(card);
						if (suit == 'none') return;
						let evt = _status.event;
						if (evt.name != 'chooseToUse') evt = evt.getParent('chooseToUse');
						if (!evt || !evt.respondTo || evt.respondTo[1].name != 'sha') return;
						if (player.storage.qmsgswkjsgj_sbliegong_blocker.includes(suit)) return false;
					},
				},
				trigger: {
					player: ['damageBefore', 'damageCancelled', 'damageZero'],
					target: ['shaMiss', 'useCardToExcluded', 'useCardToEnd'],
					global: ['useCardEnd'],
				},
				forced: true,
				firstDo: true,
				charlotte: true,
				popup: false,
				onremove(player) {
					delete player.storage.qmsgswkjsgj_sbliegong_block;
					delete player.storage.qmsgswkjsgj_sbliegong_blocker;
				},
				filter(event, player) {
					const evt = event.getParent('useCard', true, true);
					if (evt && evt.effectedCount < evt.effectCount) return false;
					if (!event.card || !player.storage.qmsgswkjsgj_sbliegong_block) return false;
					return player.storage.qmsgswkjsgj_sbliegong_block.some((i) => i[0] == event.card);
				},
				content() {
					const storage = player.storage.qmsgswkjsgj_sbliegong_block;
					for (let i = 0; i < storage.length; i++) {
						if (storage[i][0] == trigger.card) {
							storage.splice(i--, 1);
						}
					}
					if (!storage.length) player.removeSkill(event.name);
					else lib.skill.qmsgswkjsgj_sbliegong.updateBlocker(player);
				},
			},
			count: {
				trigger: {
					player: 'useCard',
					target: 'useCardToTargeted',
				},
				forced: true,
				locked: false,
				popup: false,
				filter(event, player, name) {
					if (name != 'useCard' && player == event.player) return false;
					const suit = get.suit(event.card);
					if (!lib.suit.includes(suit)) return false;
					if (player.storage.qmsgswkjsgj_sbliegong?.includes(suit)) return false;
					return true;
				},
				content() {
					player.markAuto('qmsgswkjsgj_sbliegong', [get.suit(trigger.card)]);
					player.storage.qmsgswkjsgj_sbliegong.sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a));
					player.addTip('qmsgswkjsgj_sbliegong', get.translation('qmsgswkjsgj_sbliegong') + player.getStorage('qmsgswkjsgj_sbliegong').reduce((str, suit) => str + get.translation(suit), ''));
				},
			},
			wuxing: {
				trigger: { player: 'useCard1' },
				filter(event, player) {
					return player.getVEquip(1) && event.card.name == 'sha' && lib.linked.some((n) => n != 'kami');
				},
				audio: true,
				direct: true,
				content() {
					'step 0';
					var list = lib.linked.slice(0);
					list.remove('kami');
					list.removeArray(get.natureList(trigger.card));
					list.push('cancel2');
					player
						.chooseControl(list)
						.set('prompt', get.prompt('qmsgswkjsgj_sbliegong'))
						.set('prompt2', '将' + get.translation(trigger.card) + '转换为以下属性之一');
					('step 1');
					if (result.control != 'cancel2') {
						player.logSkill('qmsgswkjsgj_sbliegong');
						player.popup(get.translation(result.control) + '杀', result.control);
						game.log(trigger.card, '被转为了', '#y' + get.translation(result.control), '属性');
						game.setNature(trigger.card, result.control);
					}
				},
			},
		},
	},

	//界杨彪
	qmsgswkjsgj_zhaohan: {
		audio: 'zhaohan',
		trigger: { player: 'phaseZhunbeiBegin' },
		// forced: true,
		locked: true,
		// filter(event, player) {
		// 	return player.phaseNumber < 8;
		// },
		// check(event, player) {
		// 	return player.phaseNumber < 3;
		// },
		cost() {
			'step 0';
			player.addMark('qmsgswkjsgj_zhaohan', 1, false);
			('step 1');
			if (player.countMark('qmsgswkjsgj_zhaohan') < 8) {
				event.result = { bool: true };
			}
		},
		content() {
			if (player.countMark('qmsgswkjsgj_zhaohan') < 5) {
				player.gainMaxHp();
				player.recover();
			} else {
				player.damage();
			}
		},
		onremove: true,
	},
	qmsgswkjsgj_rangjie: {
		audio: 'rangjie',
		trigger: { player: 'damageEnd' },
		getIndex(event) {
			return event.num;
		},
		async cost(event, trigger, player) {
			let choiceList = ['获得一张指定类型的牌'];
			if (player.canMoveCard()) {
				choiceList.push('移动场上的一张牌');
			}
			const result = await player
				.chooseControl('cancel2')
				.set('choiceList', choiceList)
				.set('prompt', get.prompt(event.skill))
				.set('ai', function () {
					var player = _status.event.player;
					if (player.canMoveCard(true)) {
						return 1;
					}
					return 0;
				})
				.forResult();
			event.result = {
				bool: result.control != 'cancel2',
				cost_data: result.index,
			};
		},
		async content(event, trigger, player) {
			if (event.cost_data) {
				player.moveCard(true);
			} else {
				const result = await player
					.chooseControl('basic', 'trick', 'equip')
					.set('prompt', '选择获得一种类型的牌')
					.set('ai', function () {
						var player = _status.event.player;
						if (player.hp <= 3 && !player.countCards('h', { name: ['shan', 'tao'] })) {
							return 'basic';
						}
						if (player.countCards('he', { type: 'equip' }) < 2) {
							return 'equip';
						}
						return 'trick';
					})
					.forResult();
				const card = get.cardPile(function (card) {
					return get.type(card, 'trick') == result.control;
				});
				if (card) {
					await player.gain(card, 'gain2', 'log');
				}
			}
			{
				var choosedraw = await player
					.chooseTarget('选择一名角色，令其摸一张牌。', true, function (card, player, target) {
						return get.attitude(_status.event.player, target);
					})
					.forResult();
				if (choosedraw.bool) {
					await choosedraw.targets[0].draw();
				}
			}
			// await player.draw();
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (get.tag(card, 'damage')) {
						if (player.hasSkillTag('jueqing', false, target)) {
							return [1, -2];
						}
						if (!target.hasFriend()) {
							return;
						}
						var num = 1;
						if (get.attitude(player, target) > 0) {
							if (player.needsToDiscard()) {
								num = 0.7;
							} else {
								num = 0.5;
							}
						}
						if (target.hp >= 4) {
							return [1, num * 2];
						}
						if (target.hp == 3) {
							return [1, num * 1.5];
						}
						if (target.hp == 2) {
							return [1, num * 0.5];
						}
					}
				},
			},
		},
	},
	qmsgswkjsgj_yizheng: {
		audio: 'yizheng',
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			return game.hasPlayer((current) => get.info('qmsgswkjsgj_yizheng').filterTarget(null, player, current));
		},
		filterTarget(card, player, current) {
			return player.canCompare(current);
		},
		async content(event, trigger, player) {
			const { target } = event;
			const result = await player.chooseToCompare(target).forResult();
			if (result?.bool) {
				target.skip('phaseDraw');
				target.addTempSkill(event.name + '_mark', { player: 'phaseDrawSkipped' });
			} else {
				await player.damage(target);
			}
		},
		ai: {
			order: 1,
			result: {
				player: (player, target) => {
					let hs = player.getCards('h').sort(function (a, b) {
						return get.number(b) - get.number(a);
					});
					if (!hs.length) {
						return 0;
					}
					if (player.hp <= 2) {
						return 0;
					}
					let a = get.number(hs[0]),
						b = 4;
					if (player.getDamagedHp()) {
						b = 2;
					}
					return -b * (1 - Math.pow((a - 1) / 13, target.countCards('h')));
				},
				target: (player, target) => {
					if (target.skipList.includes('phaseDraw') || target.hasSkill('pingkou') || target.hasSkill('xinpingkou')) {
						return 0;
					}
					let hs = player.getCards('h').sort(function (a, b) {
						return get.number(b) - get.number(a);
					});
					if (!hs.length) {
						return 0;
					}
					return -Math.pow((get.number(hs[0]) - 1) / 13, target.countCards('h')) * 2;
				},
			},
		},
		subSkill: {
			mark: {
				charlotte: true,
				mark: true,
				intro: { content: '跳过下回合的摸牌阶段' },
			},
		},
	},
	qmsgswkjsgj_yizhengplus: {
		audio: 'yizheng',
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			return game.hasPlayer((current) => get.info('qmsgswkjsgj_yizhengplus').filterTarget(null, player, current));
		},
		filterTarget(card, player, current) {
			return player.canCompare(current);
		},
		async content(event, trigger, player) {
			const { target } = event;
			const result = await player.chooseToCompare(target).forResult();
			if (result?.bool||result?.tie) {
				target.skip('phaseDraw');
				target.addTempSkill(event.name + '_mark', { player: 'phaseDrawSkipped' });
				// player.YB_zhongliuSkills([event.name])
			} else {
				await player.damage(target);
			}
		},
		async contentAfter(event, trigger, player){
			const history = player.getAllHistory('damage', (evt) => evt.skill == 'qmsgswkjsgj_yizhengplus' && evt==event);
			if(history&&history.length){
				await player.YB_zhongliuSkills(['qmsgswkjsgj_yizhengplus'])
			}
		},
		ai: {
			order: 1,
			result: {
				player: (player, target) => {
					let hs = player.getCards('h').sort(function (a, b) {
						return get.number(b) - get.number(a);
					});
					if (!hs.length) {
						return 0;
					}
					if (player.hp <= 2) {
						return 0;
					}
					let a = get.number(hs[0]),
						b = 4;
					if (player.getDamagedHp()) {
						b = 2;
					}
					return -b * (1 - Math.pow((a - 1) / 13, target.countCards('h')));
				},
				target: (player, target) => {
					if (target.skipList.includes('phaseDraw') || target.hasSkill('pingkou') || target.hasSkill('xinpingkou')) {
						return 0;
					}
					let hs = player.getCards('h').sort(function (a, b) {
						return get.number(b) - get.number(a);
					});
					if (!hs.length) {
						return 0;
					}
					return -Math.pow((get.number(hs[0]) - 1) / 13, target.countCards('h')) * 2;
				},
			},
		},
		subSkill: {
			mark: {
				charlotte: true,
				mark: true,
				intro: { content: '跳过下回合的摸牌阶段' },
			},
		},
	},
	//界骆统
	qmsgswkjsgj_qinzheng: {
		audio: 'qinzheng',
		trigger: { player: ['useCard', 'respond'] },
		forced: true,
		filter(event, player) {
			var num = player.getAllHistory('useCard').length + player.getAllHistory('respond').length;
			return num % 2 == 0 || num % 5 == 0 || num % 8 == 0;
		},
		//258团
		content() {
			var num = player.getAllHistory('useCard').length + player.getAllHistory('respond').length;
			var cards = [];
			if (num % 2 == 0) {
				var card = get.cardPile(function (card) {
					return ['sha', 'shan', 'tao', 'jiu', 'zong', 'xionghuangjiu'].includes(card.name);
				});
				if (card) {
					cards.push(card);
				}
			}
			if (num % 5 == 0) {
				var card = get.cardPile(function (card) {
					return ['juedou', 'guohe'].includes(card.name);
				});
				if (card) {
					cards.push(card);
				}
			}
			if (num % 8 == 0) {
				var card = get.cardPile(function (card) {
					return ['shunshou', 'wuzhong', 'zengbin', 'sadouchengbing', 'dongzhuxianji', 'tongzhougongji'].includes(card.name);
				});
				if (card) {
					cards.push(card);
				}
			}
			if (cards.length) {
				player.gain(cards, 'gain2');
			}
		},
		group: 'qmsgswkjsgj_qinzheng_count',
		intro: {
			content(num) {
				var str = '<li>总次数：';
				str += num;
				str += '<br><li>杀/闪/桃/酒：';
				str += num % 2;
				str += '/2<br><li>决斗/过河拆桥：';
				str += num % 5;
				str += '/5<br><li>顺手牵羊/无中生有：';
				str += num % 8;
				str += '/8';
				return str;
			},
		},
	},
	qmsgswkjsgj_qinzheng_count: {
		trigger: { player: ['useCard1', 'respond'] },
		silent: true,
		firstDo: true,
		noHidden: true,
		sourceSkill: 'qmsgswkjsgj_qinzheng',
		content() {
			player.storage.qmsgswkjsgj_qinzheng = player.getAllHistory('useCard').length + player.getAllHistory('respond').length;
			player.markSkill('qmsgswkjsgj_qinzheng');
		},
	},
	//界刘焉
	qmsgswkjsgj_tushe: {
		audio: 'xinfu_tushe',
		mod: {
			aiOrder(player, card, num) {
				if (get.tag(card, 'multitarget')) {
					if (player.countCards('h', { type: 'basic' })) {
						return num / 10;
					}
					return num * 10;
				}
				if (get.type(card) === 'basic') {
					return num + 10;
				}
			},
			aiValue(player, card, num) {
				if (card.name === 'zhangba') {
					return 114514;
				}
				if (['shan', 'tao', 'jiu'].includes(card.name)) {
					if (player.getEquip('zhangba') && player.countCards('hs') > 1) {
						return 0.01;
					}
					return num / 2;
				}
				if (get.tag(card, 'multitarget')) {
					return num + game.players.length;
				}
			},
			aiUseful(player, card, num) {
				if (card.name === 'zhangba') {
					return 114514;
				}
				if (get.name(card, player) === 'shan') {
					if (
						player.countCards('hs', (i) => {
							if (card === i || (card.cards && card.cards.includes(i))) {
								return false;
							}
							return get.name(i, player) === 'shan';
						})
					) {
						return -1;
					}
					return num / Math.pow(Math.max(1, player.hp), 2);
				}
			},
		},
		trigger: {
			player: 'useCardToPlayered',
		},
		locked: false,
		frequent: true,
		filter(event, player) {
			// if (get.type(event.card) == "equip") {
			// 	return false;
			// }
			if (event.getParent().triggeredTargets3.length > 1) {
				return false;
			}
			return event.targets.length > 0 && !player.countCards('h', { type: 'basic' });
		},
		content() {
			player.draw(trigger.targets.length);
		},
		ai: {
			presha: true,
			pretao: true,
			threaten: 1.8,
			effect: {
				player_use(card, player, target) {
					if (
						typeof card === 'object' &&
						card.name !== 'shan' &&
						get.type(card) !== 'equip' &&
						!player.countCards('h', (i) => {
							if (card === i || (card.cards && card.cards.includes(i))) {
								return false;
							}
							return get.type(i) === 'basic';
						})
					) {
						let targets = [],
							evt = _status.event.getParent('useCard');
						targets.addArray(ui.selected.targets);
						if (evt && evt.card == card) {
							targets.addArray(evt.targets);
						}
						if (targets.length) {
							return [1, targets.length];
						}
						if (get.tag(card, 'multitarget')) {
							return [1, game.players.length - 1];
						}
						return [1, 1];
					}
				},
			},
		},
	},
	qmsgswkjsgj_limu: {
		mod: {
			targetInRange(card, player, target) {
				if (player.countCards('j') && player.inRange(target)) {
					return true;
				}
			},
			cardUsableTarget(card, player, target) {
				if (player.countCards('j') && player.inRange(target)) {
					return true;
				}
			},
			aiOrder(player, card, num) {
				if (get.type(card, null, player) == 'trick' && player.canUse(card, player) && player.canAddJudge(card)) {
					return 15;
				}
			},
		},
		locked: false,
		audio: 'xinfu_limu',
		enable: 'phaseUse',
		discard: false,
		filter(event, player) {
			if (player.hasJudge('lebu')) {
				return false;
			}
			return player.countCards('hes', { color: 'red' }) > 0;
		},
		viewAs: { name: 'lebu' },
		//prepare:"throw",
		position: 'hes',
		filterCard(card, player, event) {
			return get.color(card) == 'red' && player.canAddJudge({ name: 'lebu', cards: [card] });
		},
		selectTarget: -1,
		filterTarget(card, player, target) {
			return player == target;
		},
		check(card) {
			var player = _status.event.player;
			if (!player.getEquip('zhangba')) {
				let damaged = player.maxHp - player.hp - 1;
				if (
					player.countCards('h', function (cardx) {
						if (cardx == card) {
							return false;
						}
						if (cardx.name == 'tao') {
							if (damaged < 1) {
								return true;
							}
							damaged--;
						}
						return ['shan', 'jiu'].includes(cardx.name);
					}) > 0
				) {
					return 0;
				}
			}
			if (card.name == 'shan') {
				return 15;
			}
			if (card.name == 'tao' || card.name == 'jiu') {
				return 10;
			}
			return 9 - get.value(card);
		},
		onuse(links, player) {
			var next = game.createEvent('limu_recover', false, _status.event.getParent());
			next.player = player;
			next.setContent(function () {
				player.recover();
			});
		},
		ai: {
			result: {
				target(player, target) {
					if (player.countCards('hes', 'zhangba')) {
						return player.countCards('h', { type: 'basic' });
					}
					let res = lib.card.lebu.ai.result.target(player, target);
					if (player.countCards('hs', 'sha') >= player.hp) {
						res++;
					}
					if (target.isDamaged()) {
						return res + 2 * Math.abs(get.recoverEffect(target, player, target));
					}
					return res;
				},
				ignoreStatus: true,
			},
			order(item, player) {
				if (player.hp > 1 && player.countCards('j')) {
					return 0;
				}
				return 12;
			},
			effect: {
				target(card, player, target) {
					if (target.isPhaseUsing() && typeof card === 'object' && get.type(card, null, target) === 'delay' && !target.countCards('j')) {
						let shas =
							target.getCards('hs', (i) => {
								if (card === i || (card.cards && card.cards.includes(i))) {
									return false;
								}
								return get.name(i, target) === 'sha' && target.getUseValue(i) > 0;
							}) - target.getCardUsable('sha');
						if (shas > 0) {
							return [1, 1.5 * shas];
						}
					}
				},
			},
		},
		group: ['qmsgswkjsgj_limu_sha'],
		subSkill: {
			sha: {
				name: '立牧杀',
				audio: 'qmsgswkjsgj_limu',
				enable: 'phaseUse',
				viewAs: {
					name: 'sha',
				},
				filterCard(card, player) {
					if (ui.selected.cards.length) {
						return get.suit(card) === get.suit(ui.selected.cards[0]);
					}
					return !player.storage.qmsgswkjsgj_limu_ban || !player.storage.qmsgswkjsgj_limu_ban.includes(get.suit(card));
				},
				prompt() {
					return get.translation('qmsgswkjsgj_limu_sha');
				},
				selectCard() {
					if (ui.selected.cards.length) {
						return -1;
					}
					return 1;
				},
				precontent() {
					var suit = event.result.cards[0].suit;
					if (!player.hasSkill('qmsgswkjsgj_limu_ban')) {
						player.addTempSkill('qmsgswkjsgj_limu_ban', 'phaseUseAfter');
					}
					if (!player.storage.qmsgswkjsgj_limu_ban) {
						player.storage.qmsgswkjsgj_limu_ban = [];
					}
					player.storage.qmsgswkjsgj_limu_ban.push(suit);
				},
				ai: {
					respondSha: true,
					skillTagFilter(player, tag, arg) {
						return arg !== 'respond' && player.countCards('hs');
					},
				},
			},
			ban: {
				onremove: true,
				mark: true,
				marktext: '牧',
				intro: {
					name: '立牧',
					content: '本回合已使用$转化成杀。',
				},
			},
		},
	},
	qmsgswkjsgj_pianan: {
		audio: 'ext:夜白神略/audio/character:2',
		forced: true,
		trigger: {
			player: 'damageBegin3',
		},
		filter(event, player) {
			return player.countCards('j') > 0;
		},
		content() {
			player.discardPlayerCard(player, 'j', true);
			trigger.cancel();
		},
	},
	//界鲁肃
	qmsgswkjsgj_haoshi: {
		audio: 'haoshi',
		trigger: { player: 'phaseDrawBegin2' },
		filter(event, player) {
			return !event.numFixed;
		},
		check(event, player) {
			// return (
			// 	player.countCards("h") + 2 + event.num <= 5 ||
			// 	game.hasPlayer(function (target) {
			// 		return (
			// 			player !== target &&
			// 			!game.hasPlayer(function (current) {
			// 				return current !== player && current !== target && current.countCards("h") < target.countCards("h");
			// 			}) &&
			// 			get.attitude(player, target) > 0
			// 		);
			// 	})
			// );
			return true;
		},
		content() {
			trigger.num += 2;
			player.addTempSkill('qmsgswkjsgj_haoshi_give', 'phaseDrawAfter');
		},
		subSkill: {
			give: {
				trigger: { player: 'phaseDrawEnd' },
				forced: true,
				charlotte: true,
				popup: false,
				filter(event, player) {
					return player.countCards('h') > 5;
				},
				content() {
					'step 0';
					var targets = game.filterPlayer(function (target) {
							return target != player;
						}),
						num = Math.floor(player.countCards('h') / 2);
					player.chooseCardTarget({
						position: 'h',
						filterCard: true,
						filterTarget(card, player, target) {
							return _status.event.targets.includes(target);
						},
						targets: targets,
						selectTarget: targets.length == 1 ? -1 : 1,
						selectCard: num,
						prompt: '将' + get.cnNumber(num) + '张手牌交给一名手牌数最少的其他角色',
						// forced: true,
						ai1(card) {
							var goon = false,
								player = _status.event.player;
							for (var i of _status.event.targets) {
								if (get.attitude(i, player) > 0 && get.attitude(player, i) > 0) {
									goon = true;
								}
								break;
							}
							if (goon) {
								if (
									!player.hasValueTarget(card) ||
									(card.name == 'sha' &&
										player.countCards('h', function (cardx) {
											return cardx.name == 'sha' && !ui.selected.cards.includes(cardx);
										}) > player.getCardUsable('sha'))
								) {
									return 2;
								}
								return Math.max(2, get.value(card) / 4);
							}
							return 1 / Math.max(1, get.value(card));
						},
						ai2(target) {
							return get.attitude(_status.event.player, target);
						},
					});
					('step 1');
					if (result.bool) {
						var target = result.targets[0];
						player.line(target, 'green');
						player.give(result.cards, target);
						player.markAuto('qmsgswkjsgj_haoshi_help', [target]);
						player.addTempSkill('qmsgswkjsgj_haoshi_help', { player: 'phaseBeginStart' });
					}
				},
			},
			help: {
				trigger: { target: 'useCardToTargeted' },
				direct: true,
				charlotte: true,
				onremove: true,
				filter(event, player) {
					if (!player.storage.qmsgswkjsgj_haoshi_help || !player.storage.qmsgswkjsgj_haoshi_help.length) {
						return false;
					}
					if (event.card.name != 'sha' && get.type(event.card) != 'trick') {
						return false;
					}
					for (var i of player.storage.qmsgswkjsgj_haoshi_help) {
						if (i.countCards('h') > 0) {
							return true;
						}
					}
					return false;
				},
				content() {
					'step 0';
					if (!event.targets) {
						event.targets = player.storage.qmsgswkjsgj_haoshi_help.slice(0).sortBySeat();
					}
					event.target = event.targets.shift();
					event.target
						.chooseCard('h', '好施：是否将一张手牌交给' + get.translation(player) + '？')
						.set('ai', function (card) {
							var player = _status.event.player,
								target = _status.event.getTrigger().player;
							if (!_status.event.goon) {
								if (get.value(card, player) < 0 || get.value(card, target) < 0) {
									return 1;
								}
								return 0;
							}
							var cardx = _status.event.getTrigger().card;
							if (card.name == 'shan' && get.tag(cardx, 'respondShan') && target.countCards('h', 'shan') < player.countCards('h', 'shan')) {
								return 2;
							}
							if (card.name == 'sha' && (cardx.name == 'juedou' || (get.tag(card, 'respondSha') && target.countCards('h', 'sha') < player.countCards('h', 'sha')))) {
								return 2;
							}
							if (get.value(card, target) > get.value(card, player) || target.getUseValue(card) > player.getUseValue(card)) {
								return 1;
							}
							if (player.hasSkillTag('noh')) {
								return 0.5 / Math.max(1, get.value(card, player));
							}
							return 0;
						})
						.set('goon', get.attitude(event.target, player) > 0);
					('step 1');
					if (result.bool) {
						target.logSkill('qmsgswkjsgj_haoshi_help', player);
						target.give(result.cards, player);
					}
					if (targets.length) {
						event.goto(0);
					}
				},
			},
		},
	},
	//界曹叡
	qmsgswkjsgj_mingjian: {
		audio: 'mingjian',
		trigger: { player: 'phaseUseBegin' },
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt(event.skill), '跳过出牌阶段并将所有手牌交给一名其他角色，你结束此回合，然后其于此回合后获得一个额外的出牌阶段，本出牌阶段其可以多使用一张【杀】。若如此做，直到该角色下个回合结束，其手牌上限+1。', lib.filter.notMe)
				.set('ai', (target) => {
					var player = _status.event.player,
						att = get.attitude(player, target);
					if (target.hasSkillTag('nogain')) {
						return 0.01 * att;
					}
					if (player.countCards('h') == player.countCards('h', 'du')) {
						return -att;
					}
					if (target.hasJudge('lebu')) {
						att *= 1.25;
					}
					if (get.attitude(player, target) > 3) {
						var basis = get.threaten(target) * att;
						if (
							player == get.zhu(player) &&
							player.hp <= 2 &&
							player.countCards('h', 'shan') &&
							!game.hasPlayer(function (current) {
								return get.attitude(current, player) > 3 && current.countCards('h', 'tao') > 0;
							})
						) {
							return 0;
						}
						if (target.countCards('h') + player.countCards('h') > target.hp + 2) {
							return basis * 0.8;
						}
						return basis;
					}
					return 0;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			await player.give(player.getCards('h'), target);
			trigger.cancel();
			const evt = trigger.getParent('phase', true);
			if (evt) {
				game.log(player, '结束了回合');
				evt.num = evt.phaseList.length;
				evt.goto(11);
			}
			// const next = target.insertPhase();
			// next._noTurnOver = true;
			// next.phaseList = ["phaseUse"];
			target.addTempSkill('qmsgswkjsgj_mingjian_sha', { player: ['phaseUseAfter'] });
			if (!target.storage.qmsgswkjsgj_mingjian_sha) {
				target.storage.qmsgswkjsgj_mingjian_sha = [];
			}
			target.storage.qmsgswkjsgj_mingjian_sha.push(player);
			target.markSkill('qmsgswkjsgj_mingjian_sha');
			target.addTempSkill('qmsgswkjsgj_mingjian_max', { player: ['phaseAfter'] });
			if (!target.storage.qmsgswkjsgj_mingjian_max) {
				target.storage.qmsgswkjsgj_mingjian_max = [];
			}
			target.storage.qmsgswkjsgj_mingjian_max.push(player);
			target.markSkill('qmsgswkjsgj_mingjian_max');
			var next = game.createEvent('qmsgswkjsgj_mingjian');
			next.player = target;
			next.setContent(lib.skill.qmsgswkjsgj_mingjian.phase);
		},
		phase() {
			'step 0';
			player.phaseUse();
			('step 1');
			game.broadcastAll(function () {
				if (ui.tempnowuxie) {
					ui.tempnowuxie.close();
					delete ui.tempnowuxie;
				}
			});
		},
		subSkill: {
			sha: {
				charlotte: true,
				onremove: true,
				mark: true,
				marktext: '鉴',
				intro: {
					markcount() {
						return '杀';
					},
					content: (storage, player) => {
						const num = storage.length;
						return `<li>被${get.translaiotn(storage.toUniqued())}鉴识<li>出杀次数+${num}`;
					},
				},
				mod: {
					cardUsable(card, player, num) {
						if (card.name == 'sha') {
							return num + player.getStorage('qmsgswkjsgj_mingjian_sha').length;
						}
					},
				},
			},
			max: {
				charlotte: true,
				onremove: true,
				mark: true,
				marktext: '鉴',
				intro: {
					markcount() {
						return '限';
					},
					content: (storage, player) => {
						const num = storage.length;
						return `<li>被${get.translaiotn(storage.toUniqued())}鉴识<li>手牌上限+${num}`;
					},
				},
				mod: {
					maxHandcard(player, num) {
						return num + player.getStorage('qmsgswkjsgj_mingjian_max').length;
					},
				},
			},
		},
	},
	//界蔡文姬
	qmsgswkjsgj_beige: {
		audio: 'beige',
		audioname: ['re_caiwenji'],
		trigger: { global: 'damageEnd' },
		filter(event, player) {
			return event.card && event.card.name == 'sha' && event.source && event.player.classList.contains('dead') == false && player.countCards('he');
		},
		// direct: true,
		checkx(event, player) {
			var att1 = get.attitude(player, event.player);
			var att2 = get.attitude(player, event.source);
			return [att1, att2];
		},
		cost() {
			var next = player.chooseToDiscard('he', get.prompt2('qmsgswkjsgj_beige', trigger.player));
			var check = lib.skill.qmsgswkjsgj_beige.checkx(trigger, player);
			next.set('ai', function (card) {
				var num = Math.max(8 - get.value(card), 1);
				if (_status.event.goon) {
					var list = _status.event.goon;
					if (get.suit(card) == 'spade') {
						num *= -list[1];
						if (trigger.source && trigger.source.isTurnedOver()) {
							num *= -1;
						}
					}
					if (get.suit(card) == 'heart') {
						num *= list[0];
						num *= trigger.num;
					}
					if (get.suit(card) == 'club') {
						num *= -list[1];
						if (trigger.source && trigger.source.countCards('he') == 0) {
							num *= 0;
						}
					}
					if (get.suit(card) == 'diamond') {
						num *= list[0];
					}
					return num;
				}
				return 0;
			});
			// next.set("logSkill", "qmsgswkjsgj_beige");
			next.set('goon', check);
			next.set('chooseonly', true);
			event.result = next.forResult();
		},
		content() {
			'step 0';
			player.discard(event.cards);
			//get.suit(event.card)
			('step 1');
			if (event.cards[0].suit) {
				switch (event.cards[0].suit) {
					case 'heart':
						trigger.player.recover(trigger.num);
						break;
					case 'diamond':
						trigger.player.draw(3);
						break;
					case 'club':
						trigger.source.chooseToDiscard('he', 3, true);
						break;
					case 'spade':
						trigger.source.turnOver();
						break;
				}
			}
		},
		ai: {
			expose: 0.3,
		},
	},
	//界张绣
	qmsgswkjsgj_xiongluan: {
		audio: 'drlt_xiongluan',
		mod: {
			aiOrder(player, card, num) {
				if (num <= 0 || !player.isPhaseUsing() || player.needsToDiscard() || !get.tag(card, 'damage')) {
					return;
				}
				return 0;
			},
			aiUseful(player, card, num) {
				if (num <= 0 || !get.tag(card, 'damage')) {
					return;
				}
				return num * player.getHp();
			},
		},
		locked: false,
		enable: 'phaseUse',
		skillAnimation: true,
		animationColor: 'gray',
		limited: true,
		filter(event, player) {
			return !player.isDisabledJudge() || player.hasEnabledSlot();
		},
		filterTarget(card, player, target) {
			return target != player;
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			const disables = [];
			for (let i = 1; i <= 5; i++) {
				for (let j = 0; j < player.countEnabledSlot(i); j++) {
					disables.push(i);
				}
			}
			if (disables.length > 0) {
				await player.disableEquip(disables);
				await player.draw(disables.length);
			}
			await player.disableJudge();
			const { target } = event;
			player.addTempSkill(event.name + '_effect');
			player.markAuto(event.name + '_effect', [target]);
			target.addTempSkill(event.name + '_ban');
		},
		ai: {
			order: 13,
			result: {
				target: (player, target) => {
					let hs = player.countCards('h', (card) => {
							if (!get.tag(card, 'damage') || get.effect(target, card, player, player) <= 0) {
								return 0;
							}
							if (get.name(card, player) === 'sha') {
								if (target.getEquip('bagua')) {
									return 0.5;
								}
								if (target.getEquip('rewrite_bagua')) {
									return 0.25;
								}
							}
							return 1;
						}),
						ts =
							target.hp +
							target.hujia +
							game.countPlayer((current) => {
								if (get.attitude(current, target) > 0) {
									return current.countCards('hs') / 8;
								}
								return 0;
							});
					if (hs >= ts) {
						return -hs;
					}
					return 0;
				},
			},
		},
		subSkill: {
			effect: {
				charlotte: true,
				onremove: true,
				mod: {
					targetInRange(card, player, target) {
						if (player.getStorage('qmsgswkjsgj_xiongluan_effect').includes(target)) {
							return true;
						}
					},
					cardUsableTarget(card, player, target) {
						if (player.getStorage('qmsgswkjsgj_xiongluan_effect').includes(target)) {
							return true;
						}
					},
				},
				intro: { content: '本回合对$使用牌无距离和次数限制且其不能使用和打出手牌' },
			},
			ban: {
				charlotte: true,
				mark: true,
				mod: {
					cardEnabled2(card, player) {
						if (get.position(card) == 'h') {
							return false;
						}
					},
				},
				intro: { content: '本回合不能使用或打出手牌' },
				ai: {
					effect: {
						target(card, player, target) {
							if (!target._qmsgswkjsgj_xiongluan2_effect && get.tag(card, 'damage')) {
								target._qmsgswkjsgj_xiongluan2_effect = true;
								const eff = get.effect(target, card, player, target);
								delete target._qmsgswkjsgj_xiongluan2_effect;
								if (eff > 0) {
									return [1, -999999];
								}
								if (eff < 0) {
									return 114514;
								}
							}
						},
					},
				},
			},
		},
	},
	qmsgswkjsgj_xiongluanplus: {
		audio: 'drlt_xiongluan',
		mod: {
			aiOrder(player, card, num) {
				if (num <= 0 || !player.isPhaseUsing() || player.needsToDiscard() || !get.tag(card, 'damage')) {
					return;
				}
				return 0;
			},
			aiUseful(player, card, num) {
				if (num <= 0 || !get.tag(card, 'damage')) {
					return;
				}
				return num * player.getHp();
			},
		},
		locked: false,
		enable: 'phaseUse',
		skillAnimation: true,
		animationColor: 'gray',
		limited: true,
		filter(event, player) {
			return !player.isDisabledJudge() || player.hasEnabledSlot();
		},
		filterTarget(card, player, target) {
			return target != player;
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			const disables = [];
			for (let i = 1; i <= 5; i++) {
				for (let j = 0; j < player.countEnabledSlot(i); j++) {
					disables.push(i);
				}
			}
			if (disables.length > 0) {
				await player.disableEquip(disables);
				await player.draw(disables.length);
			}
			await player.disableJudge();
			const { target } = event;
			player.addTempSkill(event.name + '_effect');
			player.markAuto(event.name + '_effect', [target]);
			target.addTempSkill(event.name + '_ban');
			target.addTempSkill('fengyin');
		},
		ai: {
			order: 13,
			result: {
				target: (player, target) => {
					let hs = player.countCards('h', (card) => {
							if (!get.tag(card, 'damage') || get.effect(target, card, player, player) <= 0) {
								return 0;
							}
							if (get.name(card, player) === 'sha') {
								if (target.getEquip('bagua')) {
									return 0.5;
								}
								if (target.getEquip('rewrite_bagua')) {
									return 0.25;
								}
							}
							return 1;
						}),
						ts =
							target.hp +
							target.hujia +
							game.countPlayer((current) => {
								if (get.attitude(current, target) > 0) {
									return current.countCards('hs') / 8;
								}
								return 0;
							});
					if (hs >= ts) {
						return -hs;
					}
					return 0;
				},
			},
		},
		subSkill: {
			effect: {
				charlotte: true,
				onremove: true,
				mod: {
					targetInRange(card, player, target) {
						if (player.getStorage('qmsgswkjsgj_xiongluanplus_effect').includes(target)) {
							return true;
						}
					},
					cardUsableTarget(card, player, target) {
						if (player.getStorage('qmsgswkjsgj_xiongluanplus_effect').includes(target)) {
							return true;
						}
					},
				},
				intro: { content: '本回合对$使用牌无距离和次数限制且其不能使用和打出手牌且非锁定技失效' },
			},
			ban: {
				charlotte: true,
				mark: true,
				mod: {
					cardEnabled2(card, player) {
						if (get.position(card) == 'h') {
							return false;
						}
					},
				},
				intro: { content: '本回合不能使用或打出手牌' },
				ai: {
					effect: {
						target(card, player, target) {
							if (!target._qmsgswkjsgj_xiongluanplus2_effect && get.tag(card, 'damage')) {
								target._qmsgswkjsgj_xiongluanplus2_effect = true;
								const eff = get.effect(target, card, player, target);
								delete target._qmsgswkjsgj_xiongluanplus2_effect;
								if (eff > 0) {
									return [1, -999999];
								}
								if (eff < 0) {
									return 114514;
								}
							}
						},
					},
				},
			},
		},
	},
	//界伏皇后
	qmsgswkjsgj_zhuikong: {
		audio: 'zhuikong',
		trigger: { global: 'phaseBegin' },
		check(event, player) {
			if (get.attitude(player, event.player) < -2) {
				var cards = player.getCards('h');
				if (cards.length > player.hp) {
					return true;
				}
				for (var i = 0; i < cards.length; i++) {
					var useful = get.useful(cards[i]);
					if (useful < 5) {
						return true;
					}
					if (get.number(cards[i]) > 9 && useful < 7) {
						return true;
					}
				}
			}
			return false;
		},
		logTarget: 'player',
		filter(event, player) {
			return player.hp < player.maxHp && player.canCompare(event.player);
		},
		content() {
			'step 0';
			player.chooseToCompare(trigger.player);
			('step 1');
			if (result.bool) {
				trigger.player.skip('phaseUse');
			} else {
				player.gain(result.target, 'gain2', 'log');
				trigger.player.useCard({ name: 'sha' }, player, false);
			}
		},
	},
	//缝神甘宁
	qmsgswkjsgj_poxi: {
		audio: 'drlt_poxi',
		enable: 'phaseUse',
		usable: 1,
		filterTarget(card, player, target) {
			return target != player && target.countCards('h') > 0;
			//return target!=player;
		},
		content() {
			'step 0';
			event.list1 = [];
			event.list2 = [];
			if (player.countCards('h') > 0) {
				var chooseButton = player.chooseButton(4, ['你的手牌', player.getCards('h'), get.translation(target.name) + '的手牌', target.getCards('h')]);
			} else {
				var chooseButton = player.chooseButton(4, [get.translation(target.name) + '的手牌', target.getCards('h')]);
			}
			chooseButton.set('target', target);
			chooseButton.set('ai', function (button) {
				var player = _status.event.player;
				var target = _status.event.target;
				var ps = [];
				var ts = [];
				for (var i = 0; i < ui.selected.buttons.length; i++) {
					var card = ui.selected.buttons[i].link;
					if (target.getCards('h').includes(card)) {
						ts.push(card);
					} else {
						ps.push(card);
					}
				}
				var card = button.link;
				var owner = get.owner(card);
				var val = get.value(card) || 1;
				if (owner == target) {
					if (ts.length > 1) {
						return 0;
					}
					if (ts.length == 0 || player.hp > 3) {
						return val;
					}
					return 2 * val;
				}
				return 7 - val;
			});
			chooseButton.set('filterButton', (button) => lib.filter.canBeDiscarded(button.link, get.player(), get.owner(button.link)));
			('step 1');
			if (result.bool) {
				var list = result.links;
				for (var i = 0; i < list.length; i++) {
					if (get.owner(list[i]) == player) {
						event.list1.push(list[i]);
					} else {
						event.list2.push(list[i]);
					}
				}
				if (event.list1.length && event.list2.length) {
					game.loseAsync({
						lose_list: [
							[player, event.list1],
							[target, event.list2],
						],
						discarder: player,
					}).setContent('discardMultiple');
				} else if (event.list2.length) {
					target.discard(event.list2);
				} else {
					player.discard(event.list1);
				}
			}
			('step 2');
			if (event.list1.length + event.list2.length == 4) {
				if (event.list1.length == 0) {
					player.loseMaxHp();
				}
				if (event.list1.length == 1) {
					// var evt = _status.event;
					// for (var i = 0; i < 10; i++) {
					// 	if (evt && evt.getParent) {
					// 		evt = evt.getParent();
					// 	}
					// 	if (evt.name == "phaseUse") {
					// 		evt.skipped = true;
					// 		break;
					// 	}
					// }
					player.addTempSkill('qmsgswkjsgj_poxi1', { player: 'phaseAfter' });
				}
				if (event.list1.length == 3) {
					player.recover();
				}
				if (event.list1.length == 4) {
					player.draw(5);
				}
			}
		},
		ai: {
			order: 13,
			result: {
				target(target, player) {
					return -1;
				},
			},
		},
	},
	qmsgswkjsgj_poxi1: {
		mod: {
			maxHandcard(player, num) {
				return num - 1;
			},
		},
	},
	qmsgswkjsgj_jieying: {
		audio: 'drlt_jieying',
		trigger: { global: 'phaseDrawBegin2' },
		filter(event, player) {
			return !event.numFixed && event.player.hasMark('qmsgswkjsgj_jieying_mark');
		},
		forced: true,
		locked: false,
		logTarget: 'player',
		content() {
			trigger.num++;
		},
		global: 'qmsgswkjsgj_jieying_mark',
		group: ['qmsgswkjsgj_jieying_1', 'qmsgswkjsgj_jieying_2', 'qmsgswkjsgj_jieying_3'],
		subSkill: {
			1: {
				audio: 'qmsgswkjsgj_jieying',
				trigger: { player: 'phaseBegin' },
				filter(event, player) {
					return !game.hasPlayer((current) => current.hasMark('qmsgswkjsgj_jieying_mark'));
				},
				forced: true,
				content() {
					player.addMark('qmsgswkjsgj_jieying_mark', 1);
				},
			},
			2: {
				audio: 'qmsgswkjsgj_jieying',
				trigger: { player: 'phaseJieshuBegin' },
				filter(event, player) {
					return (
						player.hasMark('qmsgswkjsgj_jieying_mark') &&
						game.hasPlayer((target) => {
							return target != player && !target.hasMark('qmsgswkjsgj_jieying_mark');
						})
					);
				},
				direct: true,
				content() {
					'step 0';
					player.chooseTarget(get.prompt('qmsgswkjsgj_jieying'), '将“营”交给一名角色；其摸牌阶段多摸一张牌，出牌阶段使用【杀】的次数上限+1且手牌上限+1。该角色回合结束后，其移去“营”标记，然后你获得其所有手牌。', function (card, player, target) {
						return target != player && !target.hasMark('qmsgswkjsgj_jieying_mark');
					}).ai = function (target) {
						let th = target.countCards('h'),
							att = get.attitude(_status.event.player, target);
						for (let i in target.skills) {
							let info = get.info(i);
							if (!info || info.shaRelated === false) {
								continue;
							}
							if (info.shaRelated || get.skillInfoTranslation(i, target).includes('【杀】')) {
								return Math.abs(att);
							}
						}
						if (att > 0) {
							if (th > 3 && target.hp > 2) {
								return 0.6 * th;
							}
						}
						if (att < 1) {
							if (target.countCards('j', { name: 'lebu' })) {
								return 1 + Math.min((1.5 + th) * 0.8, target.getHandcardLimit() * 0.7);
							}
							if (!th || target.getEquip('zhangba') || target.getEquip('guanshi')) {
								return 0;
							}
							if (!target.inRange(player) || player.countCards('hs', { name: 'shan' }) > 1) {
								return Math.min((1 + th) * 0.3, target.getHandcardLimit() * 0.2);
							}
						}
						return 0;
					};
					('step 1');
					if (result.bool) {
						var target = result.targets[0];
						player.line(target);
						player.logSkill('qmsgswkjsgj_jieying', target);
						var mark = player.countMark('qmsgswkjsgj_jieying_mark');
						player.removeMark('qmsgswkjsgj_jieying_mark', mark);
						target.addMark('qmsgswkjsgj_jieying_mark', mark);
					}
				},
				ai: {
					effect: {
						player(card, player, target) {
							if (get.name(card) === 'lebu' && get.attitude(player, target) < 0) {
								return 1 + Math.min((target.countCards('h') + 1.5) * 0.8, target.getHandcardLimit() * 0.7);
							}
						},
					},
				},
			},
			3: {
				audio: 'qmsgswkjsgj_jieying',
				trigger: { global: 'phaseEnd' },
				filter(event, player) {
					return player != event.player && event.player.hasMark('qmsgswkjsgj_jieying_mark') && event.player.isIn();
				},
				forced: true,
				logTarget: 'player',
				content() {
					if (trigger.player.countCards('he') > 0) {
						trigger.player.give(trigger.player.getCards('he'), player);
					}
					trigger.player.clearMark('qmsgswkjsgj_jieying_mark');
				},
			},
			mark: {
				marktext: '营',
				intro: {
					name2: '营',
					content: 'mark',
				},
				mod: {
					cardUsable(card, player, num) {
						if (player.hasMark('qmsgswkjsgj_jieying_mark') && card.name == 'sha') {
							return (
								num +
								game.countPlayer(function (current) {
									return current.hasSkill('qmsgswkjsgj_jieying');
								})
							);
						}
					},
					maxHandcard(player, num) {
						if (player.hasMark('qmsgswkjsgj_jieying_mark')) {
							return (
								num +
								game.countPlayer(function (current) {
									return current.hasSkill('qmsgswkjsgj_jieying');
								})
							);
						}
					},
					aiOrder(player, card, num) {
						if (
							player.hasMark('qmsgswkjsgj_jieying_mark') &&
							game.hasPlayer((current) => {
								return current.hasSkill('qmsgswkjsgj_jieying') && get.attitude(player, current) <= 0;
							})
						) {
							return Math.max(num, 0) + 1;
						}
					},
				},
				ai: {
					nokeep: true,
					skillTagFilter(player) {
						return (
							player.hasMark('qmsgswkjsgj_jieying_mark') &&
							game.hasPlayer((current) => {
								return current.hasSkill('qmsgswkjsgj_jieying') && get.attitude(player, current) <= 0;
							})
						);
					},
				},
			},
		},
	},
	//界孙寒华
	qmsgswkjsgj_chongxu: {
		audio: 'chongxu',
		enable: 'phaseUse',
		usable: 1,

		async content(event, trigger, player) {
			let relu = await player.chooseToPlayBeatmap(lib.skill.yb016_shenzou.beatmaps.randomGet()).forResult();
			var score = Math.floor(Math.min(5, relu.accuracy / 17));
			game.log(player, '的演奏评级为', '#y' + relu.rank[0], '，获得积分点数', '#y' + score, '分');
			if (score && score > 0) {
				const func = () => {
					const event = get.event();
					const controls = [
						(link) => {
							const evt = get.event();
							if (evt.dialog && evt.dialog.buttons) {
								for (let i = 0; i < evt.dialog.buttons.length; i++) {
									const button = evt.dialog.buttons[i];
									button.classList.remove('selectable');
									button.classList.remove('selected');
									const counterNode = button.querySelector('.caption');
									if (counterNode) counterNode.childNodes[0].innerHTML = ``;
								}
								ui.selected.buttons.length = 0;
								game.check();
							}
							return;
						},
					];
					event.controls = [ui.create.control(controls.concat(['清除选择', 'stayleft']))];
				};
				if (event.isMine()) func();
				else if (event.isOnline()) event.player.send(func);
				const result = await player
					.chooseButton(
						[
							'###' + get.translation(event.name) + '###<div class="text center">可用' + score + '分，请选择你要执行的项目</div>',
							[
								[
									['qmsgswkjsgj_shenci_miaojian', '使用2积分升级【' + get.translation('qmsgswkjsgj_shenci_miaojian') + '】'],
									['qmsgswkjsgj_shhlianhua', '使用2积分升级【' + get.translation('qmsgswkjsgj_shhlianhua') + '】'],
									['draw', '使用1积分摸一张牌'],
								],
								'textbutton',
							],
						],
						[1, Infinity],
					)
					.set('filterButton', (button) => {
						const player = get.player(),
							choice = ui.selected.buttons.map((i) => i.link);
						if (button.link !== 'draw' && (!player.hasSkill(button.link, null, null, false) || choice.filter((i) => i === button.link).length + player.countMark(button.link) > 1)) return false;
						return [...choice, button.link].reduce((sum, i) => sum + (i === 'draw' ? 1 : 2), 0) <= score;
					})
					.set('custom', {
						add: {
							confirm(bool) {
								if (bool !== true) return;
								const event = get.event().parent;
								if (Array.isArray(event.controls)) event.controls.forEach((i) => i.close());
								if (ui.confirm) ui.confirm.close();
								game.uncheck();
							},
							button() {
								if (ui.selected.buttons.length) return;
								const event = get.event();
								if (event.dialog && event.dialog.buttons) {
									for (let i = 0; i < event.dialog.buttons.length; i++) {
										const button = event.dialog.buttons[i];
										const counterNode = button.querySelector('.caption');
										if (counterNode) counterNode.childNodes[0].innerHTML = ``;
									}
								}
								if (!ui.selected.buttons.length) event.parent?.controls?.[0]?.classList.add('disabled');
							},
						},
						replace: {
							button(button) {
								const event = get.event();
								if (!event.isMine() || !event.filterButton(button) || button.classList.contains('selectable') == false) return;
								button.classList.add('selected');
								ui.selected.buttons.push(button);
								let counterNode = button.querySelector('.caption');
								const count = ui.selected.buttons.filter((i) => i == button).length;
								counterNode
									? ((counterNode) => {
											counterNode = counterNode.childNodes[0];
											counterNode.innerHTML = `×${count}`;
										})(counterNode)
									: (counterNode = ui.create.caption(`<span style="font-family:xinwei; text-shadow:#FFF 0 0 4px, #FFF 0 0 4px, rgba(74,29,1,1) 0 0 3px;">×${count}</span>`, button));
								event.parent?.controls?.[0]?.classList.remove('disabled');
								game.check();
							},
						},
					})
					.forResult();
				if (result?.bool && result.links?.length) {
					const qmsgswkjsgj_miaojian = result.links.filter((i) => i === 'qmsgswkjsgj_miaojian').length;
					if (qmsgswkjsgj_miaojian > 0) {
						player.addMark('qmsgswkjsgj_miaojian', qmsgswkjsgj_miaojian, false);
						player.popup('qmsgswkjsgj_miaojian');
						game.log(player, '升级了技能', '#g【' + get.translation('qmsgswkjsgj_miaojian') + '】');
					}
					const qmsgswkjsgj_shhlianhua = result.links.filter((i) => i === 'qmsgswkjsgj_shhlianhua').length;
					if (qmsgswkjsgj_shhlianhua > 0) {
						player.addMark('qmsgswkjsgj_shhlianhua', qmsgswkjsgj_shhlianhua, false);
						player.popup('qmsgswkjsgj_shhlianhua');
						game.log(player, '升级了技能', '#g【' + get.translation('qmsgswkjsgj_shhlianhua') + '】');
					}
					const draw = result.links.filter((i) => i === 'draw').length;
					if (draw > 0) await player.draw(draw);
				}
			}
		},
		ai: {
			order: 10,
			result: {
				player: 1,
			},
		},
		derivation: 'yb016_shenzou_faq',
	},
	qmsgswkjsgj_miaojian: {
		audio: 'miaojian',
		enable: 'phaseUse',
		usable: 1,
		mod: {
			// cardUsable:function(card,player){
			// 	if (_status.event.skill == "qmsgswkjsgj_miaojian") {
			// 		return Infinity;
			// 	}
			// 	// if(card.name=='sha'&&card.storage&&card.storage.qmsgswkjsgj_miaojian) return Infinity;
			// },
			targetInRange(card, player, target) {
				var level = player.countMark('qmsgswkjsgj_miaojian');
				if (level == 2) {
					if (_status.event.skill == 'qmsgswkjsgj_miaojian') {
						return true;
					}
				}
			},
		},
		viewAs: function (card, player) {
			var next = { name: 'sha', nature: 'stab', storage: { qmsgswkjsgj_miaojian: true } };
			var level = player.countMark('qmsgswkjsgj_miaojian');
			if (level != 0) next.isCard = true;
			return next;
		},
		filterCard: function (card, player) {
			var level = player.countMark('qmsgswkjsgj_miaojian');
			if (level == 0) return get.type2(card) == 'basic';
			return false;
		},
		selectCard: () => {
			var player = get.player();
			var level = player.countMark('qmsgswkjsgj_miaojian');
			if (level == 0) return 1;
			return -1;
		},
		precontent() {
			event.getParent().addCount = false;
		},
		check(card) {
			if (card) {
				return 6.5 - get.value(card);
			}
			return 1;
		},
		position: 'hes',
		derivation: ['qmsgswkjsgj_miaojian1', 'qmsgswkjsgj_miaojian2'],
		subSkill: { backup: { audio: 'qmsgswkjsgj_miaojian' } },
		ai: {
			order: 7,
			result: { player: 1 },
		},
	},
	qmsgswkjsgj_shhlianhua: {
		audio: 'shhlianhua',
		derivation: ['qmsgswkjsgj_shhlianhua1', 'qmsgswkjsgj_shhlianhua2'],
		trigger: { target: 'useCardToTargeted' },
		forced: true,
		locked: false,
		filter: (event) => event.card.name == 'sha',
		content() {
			'step 0';
			player.draw();
			var level = player.countMark('qmsgswkjsgj_shhlianhua');
			event.level = level;
			if (level == 0) {
				event.goto(3);
			}
			('step 1');
			var eff = get.effect(player, trigger.card, trigger.player, trigger.player);
			trigger.player
				.chooseToDiscard('he', '弃置一张牌，或令' + get.translation(trigger.card) + '对' + get.translation(player) + '无效')
				.set('ai', function (card) {
					if (_status.event.eff > 0) {
						return 10 - get.value(card);
					}
					return 0;
				})
				.set('eff', eff);
			('step 2');
			if (result.bool == false) {
				trigger.getParent().excluded.add(player);
				event.finish();
			}
			('step 3');
			player
				.judge(function (result) {
					if (event.level == 2) return get.color(result) == 'black' ? 1 : -1;
					return get.suit(result) == 'spade' ? 1 : -1;
				})
				.set('judge2', (result) => result.bool);
			('step 4');
			if (result.bool) {
				trigger.excluded.add(player);
			}
		},
		ai: {
			effect: {
				target_use(card, player, target, current) {
					if (card.name == 'sha' && current < 0) {
						return 0.7;
					}
				},
			},
		},
	},
	//神司马懿
	qmsgswkjsgj_jilin: {
		audio: 'jilin',
		trigger: {
			global: 'phaseBefore',
			player: 'enterGame',
		},
		filter(event, player) {
			return event.name != 'phase' || game.phaseNumber == 0;
		},
		forced: true,
		locked: false,
		logAudio: () => 1,
		async content(event, trigger, player) {
			const cards = get.cards(3);
			const next = player.addToExpansion(cards, 'draw');
			next.gaintag.add('qmsgswkjsgj_jilin');
			await next;
		},
		marktext: '志',
		intro: {
			markcount: 'expansion',
			mark(dialog, content, player) {
				const cards = player.getExpansions('jilin'),
					mingzhi = cards.filter((card) => card.storage.jilin),
					hidden = cards.removeArray(mingzhi);
				if (mingzhi.length) {
					dialog.addText('已明之志');
					dialog.addSmall(mingzhi);
				}
				if (hidden.length) {
					if (player == game.me || player.isUnderControl()) {
						dialog.addText('未明之志');
						dialog.addSmall(hidden);
					} else {
						return '共有' + get.cnNumber(hidden.length) + '张暗“志”';
					}
				}
			},
			content(content, player) {
				const cards = player.getExpansions('jilin'),
					mingzhi = cards.filter((card) => card.storage.jilin),
					hidden = cards.removeArray(mingzhi);
				if (mingzhi.length) {
					dialog.addText('已明之志');
					dialog.addSmall(mingzhi);
				}
				if (hidden.length) {
					if (player == game.me || player.isUnderControl()) {
						dialog.addText('未明之志');
						dialog.addSmall(hidden);
					} else {
						return '共有' + get.cnNumber(hidden.length) + '张暗“志”';
					}
				}
			},
		},
		group: ['jilin_kanpo', 'jilin_change'],
		subSkill: {
			// kanpo: {
			// 	audio: ["jilin2.mp3", "jilin3.mp3"],
			// 	trigger: {
			// 		target: "useCardToTarget",
			// 	},
			// 	filter(event, player) {
			// 		return event.player != player && player.getExpansions("jilin").some(card => !card.storage.jilin);
			// 	},
			// 	async cost(event, trigger, player) {
			// 		const hidden = player.getExpansions("jilin").filter(card => !card.storage.jilin);
			// 		const goon = get.effect(player, trigger.card, trigger.player, player) < 0;
			// 		const suits = player
			// 			.getExpansions("jilin")
			// 			.filter(card => card.storage.jilin)
			// 			.map(card => get.suit(card))
			// 			.toUniqued();
			// 		if (hidden.length == 1) {
			// 			const { bool } = await player
			// 				.chooseBool("戢鳞：明置一张“志”", `令${get.translation(trigger.card)}对你无效`)
			// 				.set("choice", goon)
			// 				.forResult();
			// 			event.result = {
			// 				bool: bool,
			// 				cost_data: hidden,
			// 			};
			// 		} else {
			// 			const { bool, links } = await player
			// 				.chooseButton(["戢鳞：明置一张“志”", hidden])
			// 				.set("ai", button => {
			// 					const player = get.player(),
			// 						card = button.link,
			// 						suits = get.event().suits;
			// 					if (!get.event().goon) {
			// 						return 0;
			// 					}
			// 					if (!suits.includes(get.suit(card))) {
			// 						return 10;
			// 					}
			// 					return 6 - get.value(card);
			// 				})
			// 				.set("suits", suits)
			// 				.set("goon", goon)
			// 				.forResult();
			// 			event.result = {
			// 				bool: bool,
			// 				cost_data: links,
			// 			};
			// 		}
			// 	},
			// 	async content(event, trigger, player) {
			// 		await player.showCards(event.cost_data, get.translation(player) + "发动了【戢鳞】");
			// 		event.cost_data[0].storage.jilin = true;
			// 		trigger.getParent().excluded.add(player);
			// 	},
			// },
			// change: {
			// 	audio: ["jilin4.mp3", "jilin5.mp3"],
			// 	trigger: {
			// 		player: "phaseBegin",
			// 	},
			// 	filter(event, player) {
			// 		return player.countCards("h") && player.getExpansions("jilin").some(card => !card.storage.jilin);
			// 	},
			// 	async cost(event, trigger, player) {
			// 		const hidden = player.getExpansions("jilin").filter(card => !card.storage.jilin);
			// 		const next = player.chooseToMove("戢鳞：是否交换“志”和手牌？");
			// 		next.set("list", [
			// 			[get.translation(player) + "（你）的未明之“志”", hidden],
			// 			["手牌区", player.getCards("h")],
			// 		]);
			// 		next.set("filterMove", (from, to) => {
			// 			return typeof to != "number";
			// 		});
			// 		next.set("processAI", list => {
			// 			let player = get.player(),
			// 				cards = list[0][1].concat(list[1][1]).sort(function (a, b) {
			// 					return get.useful(a) - get.useful(b);
			// 				}),
			// 				cards2 = cards.splice(0, player.getExpansions("jilin").length);
			// 			return [cards2, cards];
			// 		});
			// 		const { bool, moved } = await next.forResult();
			// 		event.result = {
			// 			bool: bool,
			// 			cost_data: moved,
			// 		};
			// 	},
			// 	async content(event, trigger, player) {
			// 		const moved = event.cost_data;
			// 		const pushs = moved[0],
			// 			gains = moved[1];
			// 		pushs.removeArray(player.getExpansions("jilin"));
			// 		gains.removeArray(player.getCards("h"));
			// 		if (!pushs.length || pushs.length != gains.length) {
			// 			return;
			// 		}
			// 		const next = player.addToExpansion(pushs);
			// 		next.gaintag.add("jilin");
			// 		await next;
			// 		await player.gain(gains, "draw");
			// 	},
			// },
		},
	},
	//界缝神赵云
	qmsgswkjsgj_rejuejing: {
		audio: 'xinjuejing',
		mod: {
			maxHandcard(player, num) {
				return 2 + num;
			},
			aiOrder(player, card, num) {
				if (num <= 0 || !player.isPhaseUsing() || !get.tag(card, 'recover')) return num;
				if (player.needsToDiscard() > 1) return num;
				return 0;
			},
		},
		trigger: { player: ['dying', 'dyingAfter'] },
		forced: true,
		content() {
			player.draw(2);
		},
		group: 'qmsgswkjsgj_rejuejing_draw',
		subSkill: {
			draw: {
				audio: 'qmsgswkjsgj_rejuejing',
				trigger: { player: 'phaseDrawBegin2' },
				//priority:-5,
				filter(event, player) {
					return !event.numFixed && player.hp < player.maxHp;
				},
				forced: true,
				content() {
					trigger.num += player.getDamagedHp();
				},
			},
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (target.getHp() > 1) return;
					if (get.tag(card, 'damage') || get.tag(card, 'losehp')) return [1, 1];
				},
			},
		},
	},
	//缝神鲁肃
	qmsgswkjsgj_tamo: {
		available(mode) {
			// 走另外的phaseLoop的模式/子模式/设置
			if (['boss', 'stone', 'tafang'].includes(mode) || ['jiange', 'standard', 'three', 'leader'].includes(_status.mode) || get.config('seat_order') === '指定') {
				return false;
			}
		},
		getTargets() {
			return game.filterPlayer((current) => {
				// return !current.isZhu2();
				return true;
			});
		},
		audio: 'tamo',
		trigger: {
			global: 'phaseBefore',
			player: 'enterGame',
		},
		filter(event, player) {
			return (event.name != 'phase' || game.phaseNumber == 0) && get.info('qmsgswkjsgj_tamo').getTargets().length > 1;
		},
		seatRelated: 'changeSeat',
		derivation: 'qmsgswkjsgj_tamo_faq',
		async cost(event, trigger, player) {
			const toSortPlayers = get.info(event.skill).getTargets();
			toSortPlayers.sortBySeat(game.findPlayer2((current) => current.getSeatNum() == 1, true));
			const next = player.chooseToMove('榻谟：是否分配所有角色的座次？');
			next.set('list', [['（以下排列的顺序即为发动技能后角色的座次顺序）', [toSortPlayers.map((i) => `${i.getSeatNum()}|${i.name}`), lib.skill.qmsgswkjsgj_tamo.$createButton]]]);
			next.set('toSortPlayers', toSortPlayers.slice(0));
			next.set('processAI', () => {
				const players = get.event().toSortPlayers,
					player = get.player();
				players.randomSort().sort((a, b) => get.attitude(player, b) - get.attitude(player, a));
				return [players.map((i) => `${i.getSeatNum()}|${i.name}`)];
			});
			const result = await next.forResult();
			event.result = {
				bool: result?.bool,
				cost_data: [toSortPlayers, result?.moved],
			};
		},
		async content(event, trigger, player) {
			const [toSortPlayers, moved] = event.cost_data;
			const resultList = moved[0].map((info) => {
				return parseInt(info.split('|')[0]);
			});
			const toSwapList = [];
			const cmp = (a, b) => {
				return resultList.indexOf(a) - resultList.indexOf(b);
			};
			for (let i = 0; i < toSortPlayers.length; i++) {
				for (let j = 0; j < toSortPlayers.length; j++) {
					if (cmp(toSortPlayers[i].getSeatNum(), toSortPlayers[j].getSeatNum()) < 0) {
						toSwapList.push([toSortPlayers[i], toSortPlayers[j]]);
						[toSortPlayers[i], toSortPlayers[j]] = [toSortPlayers[j], toSortPlayers[i]];
					}
				}
			}
			game.broadcastAll((toSwapList) => {
				for (const list of toSwapList) {
					game.swapSeat(list[0], list[1], false);
				}
			}, toSwapList);
			if (trigger.name === 'phase' && /*!trigger.player.isZhu2() && */ trigger.player !== toSortPlayers[0] && !trigger._finished) {
				trigger.finish();
				trigger._triggered = 5;
				const evt = toSortPlayers[0].insertPhase();
				delete evt.skill;
				const evt2 = trigger.getParent();
				if (evt2.name == 'phaseLoop' && evt2._isStandardLoop) {
					evt2.player = toSortPlayers[0];
				}
				//跳过新回合的phaseBefore
				evt.pushHandler('onPhase', (event, option) => {
					if (event.step === 0 && option.state === 'begin') {
						event.step = 1;
					}
				});
			}
			await game.delay();
		},
		$createButton(item, type, position, noclick, node) {
			const info = item.split('|'),
				_item = item;
			const seat = parseInt(info[0]);
			item = info[1];
			if (node) {
				node.classList.add('button');
				node.classList.add('character');
				node.style.display = '';
			} else {
				node = ui.create.div('.button.character', position);
			}
			node._link = item;
			node.link = item;

			const func = function (node, item) {
				const currentPlayer = game.findPlayer((current) => current.getSeatNum() == seat);
				if (currentPlayer.classList.contains('unseen_show')) {
					node.setBackground('hidden_image', 'character');
				} else if (item != 'unknown') {
					node.setBackground(item, 'character');
				}
				if (node.node) {
					node.node.name.remove();
					node.node.hp.remove();
					node.node.group.remove();
					node.node.intro.remove();
					if (node.node.replaceButton) {
						node.node.replaceButton.remove();
					}
				}
				node.node = {
					name: ui.create.div('.name', node),
					group: ui.create.div('.identity', node),
					intro: ui.create.div('.intro', node),
				};
				const infoitem = [currentPlayer.sex, currentPlayer.group, `${currentPlayer.hp}/${currentPlayer.maxHp}/${currentPlayer.hujia}`];
				node.node.name.innerHTML = get.slimName(item);
				if (lib.config.buttoncharacter_style == 'default' || lib.config.buttoncharacter_style == 'simple') {
					if (lib.config.buttoncharacter_style == 'simple') {
						node.node.group.style.display = 'none';
					}
					node.classList.add('newstyle');
					node.node.name.dataset.nature = get.groupnature(get.bordergroup(infoitem));
					node.node.group.dataset.nature = get.groupnature(get.bordergroup(infoitem), 'raw');
				}
				node.node.name.style.top = '8px';
				if (node.node.name.querySelectorAll('br').length >= 4) {
					node.node.name.classList.add('long');
					if (lib.config.buttoncharacter_style == 'old') {
						node.addEventListener('mouseenter', ui.click.buttonnameenter);
						node.addEventListener('mouseleave', ui.click.buttonnameleave);
					}
				}
				node.node.intro.innerHTML = lib.config.intro;
				if (!noclick) {
					lib.setIntro(node);
				}
				node.node.group.innerHTML = `<div>${get.cnNumber(seat, true)}号</div>`;
				node.node.group.style.backgroundColor = get.translation(`${get.bordergroup(infoitem)}Color`);
			};
			node.refresh = func;
			node.refresh(node, item);

			node.link = _item;
			node.seatNumber = seat;
			node._customintro = (uiintro) => {
				uiintro.add(`${get.translation(node._link)}(原${get.cnNumber(node.seatNumber, true)}号位)`);
			};
			return node;
		},
	},
	qmsgswkjsgj_dingzhou: {
		audio: 'dingzhou',
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			const num = player.countCards('he');
			return game.hasPlayer((current) => {
				if (current == player) {
					return false;
				}
				const total = current.countCards('ej');
				return total > 0 && num >= total;
			});
		},
		filterCard: true,
		selectCard() {
			// return [1, Math.max(...game.filterPlayer(i => i != get.player()).map(i => i.countCards("ej")))];
			return 1;
		},
		check(card) {
			return 7 - get.value(card);
		},
		filterTarget(card, player, target) {
			const num = target.countCards('ej');
			if (!num) {
				return false;
			}
			return /*ui.selected.cards.length == num &&*/ player != target;
		},
		// filterOk() {
		// 	return ui.selected.cards.length == ui.selected.targets[0].countCards("ej");
		// },
		position: 'he',
		lose: false,
		discard: false,
		delay: false,
		async content(event, trigger, player) {
			const target = event.targets[0];
			await player.give(event.cards, target);
			const cards = target.getGainableCards(player, 'ej');
			if (cards.length) {
				player.gain(cards, 'give', target);
			}
		},
		ai: {
			order: 9,
			result: {
				target(player, target) {
					let eff = 0;
					if (ui.selected.cards.length) {
						eff = ui.selected.cards.map((card) => get.value(card)).reduce((p, c) => p + c, 0);
					}
					if (player.hasSkill('qmsgswkjsgj_zhimeng') && (get.mode() == 'identity' || player.countCards('h') - target.countCards('h') > 2 * ui.selected.cards.length)) {
						eff *= 1 + get.sgnAttitude(player, target) * 0.15;
					}
					const es = target.getCards('e'),
						js = target.getCards('j');
					es.forEach((card) => {
						eff -= get.value(card, target);
					});
					js.forEach((card) => {
						eff -= get.effect(
							target,
							{
								name: card.viewAs || card.name,
								cards: [card],
							},
							target,
							target,
						);
					});
					return eff;
				},
			},
		},
	},
	//什么均贫卡
	qmsgswkjsgj_zhimeng: {
		audio: 'zhimeng',
		trigger: { player: 'phaseAfter' },
		filter(event, player) {
			return game.hasPlayer((target) => {
				if (target == player || target.countCards('h') + player.countCards('h') == 0) {
					return false;
				}
				return true;
			});
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt(event.skill), '与一名其他角色交换手牌', (card, player, target) => {
					if (target == player || target.countCards('h') + player.countCards('h') == 0) {
						return false;
					}
					return true;
				})
				.set('ai', (target) => {
					const player = get.player();
					const pvalue = -player
						.getCards('h')
						.map((card) => get.value(card, player))
						.reduce((p, c) => p + c, 0);
					const tvalue =
						-target
							.getCards('h')
							.map((card) => get.value(card, target))
							.reduce((p, c) => p + c, 0) * get.sgnAttitude(player, target);
					return (pvalue + tvalue) / 2;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			player.swapHandcards(target);
		},
		ai: { threaten: 4 },
	},

	//界孙权
	qmsgswkjsgj_rezhiheng: {
		audio: 'rezhiheng',
		enable: 'phaseUse',
		usable: 1,
		check(card) {
			return true;
		},
		content() {
			'step 0';
			event.num = player.countCards('he');
			('step 1');
			player.draw(event.num + 1);
			('step 2');
			player.chooseToDiscard(true, event.num);
		},
		ai: {
			order: 10,
			result: {
				player: function (player) {
					return player.countCards('h') + 1;
				},
			},
		},
	},
	qmsgswkjsgj_rejiuyuan: {
		audio: 'rejiuyuan',
		zhuSkill: true,
		trigger: { global: 'recoverBefore' },
		direct: true,
		filter(event, player) {
			return player != event.player && event.player.group == 'wu' && event.getParent().name != 'qmsgswkjsgj_rejiuyuan' && player.hasZhuSkill('qmsgswkjsgj_rejiuyuan', event.player);
		},
		content() {
			'step 0';
			trigger.player.chooseBool('是否对' + get.translation(player) + '发动【救援】？', '改为令其回复1点体力，然后你摸一张牌').set('ai', function () {
				var evt = _status.event;
				return get.attitude(evt.player, evt.getParent().player) > 0;
			});
			('step 1');
			if (result.bool) {
				player.logSkill('qmsgswkjsgj_rejiuyuan');
				trigger.player.line(player, 'green');
				trigger.cancel();
				player.recover(trigger.player);
				trigger.player.draw();
			}
		},
	},
	//缝神周瑜
	qmsgswkjsgj_qinyin: {
		audio: 'qinyin',
		trigger: { player: 'phaseDiscardEnd' },
		filter(event, player) {
			return true;
		},
		cost() {
			'step 0';
			var list = [];
			if (!event.listx) event.listx = [];
			if (game.countPlayer((current) => current.isDamaged())) {
				list.push('回复');
			}
			list.push('流失');
			list.push('伤害');
			list.push('cancel2');
			player
				.chooseControl(list)
				.set('prompt', get.prompt(event.skill))
				.set('ai', function (control) {
					var num1 = game.filterPlayer((current) => current.isDamaged() && get.recoverEffect(current, player, player)).length * 2;
					var num2 = game.filterPlayer((current) => get.damageEffect(current, player, player) > 0).length;
					var num3 = game.filterPlayer((current) => get.attitude(player, current) < 0).length;
					if ((num1 > num2 || num1 > num3) && !event.listx.includes('回复')) {
						return '回复';
					} else if (num2 > num3 && !event.listx.includes('伤害')) {
						return '伤害';
					} else if (num3 > 0 && !event.listx.includes('流失')) {
						return '流失';
					} else {
						return 'cancel2';
					}
				});
			('step 1');
			if (result.control == 'cancel2') {
				event.finish();
			} else {
				event.listx.push(result.control);
				event.control = result.control;
				player
					.chooseTarget([1, Infinity], '令任意名角色' + result.control + '一点体力', function (card, player, target) {
						if (result.control == '回复') {
							return target.isDamaged();
						} else return true;
					})
					.set('ai', function (target) {
						if (result.control == '回复') {
							return get.recoverEffect(target, player, player);
						} else if (result.control == '伤害') {
							return get.damageEffect(target, player, player);
						} else if (result.control == '流失') {
							return get.attitude(player, target) < 0;
						}
					});
			}
			('step 2');
			if (result.bool) {
				event.result = {
					bool: true,
					cost_data: event.control,
					targets: result.targets,
				};
			} else {
				event.goto(0);
			}
		},
		async content(event, trigger, player) {
			var control = event.cost_data;
			var targets = event.targets;
			targets.sortBySeat(player);
			for (var i = 0; i < targets.length; i++) {
				if (control == '回复') {
					await targets[i].recover();
				} else if (control == '伤害') {
					await targets[i].damage();
				} else if (control == '流失') {
					await targets[i].loseHp();
				}
			}
		},
	},
	qmsgswkjsgj_yeyan: {
		// limited: true,
		usable: 1,
		audio: 'yeyan',
		enable: 'phaseUse',
		filterCard(card, player) {
			return !ui.selected.cards.some((cardx) => get.suit(cardx, player) == get.suit(card, player));
		},
		selectCard: [0, 4],
		filterTarget(card, player, target) {
			var length = ui.selected.cards.length;
			return length == 0 || length == 4;
		},
		selectTarget() {
			if (ui.selected.cards.length == 4) {
				return [1, 2];
			}
			if (ui.selected.cards.length == 0) {
				return [1, 3];
			}
			game.uncheck('target');
			return [1, 3];
		},
		complexCard: true,
		complexSelect: true,
		line: 'fire',
		forceDie: true,
		animationColor: 'metal',
		skillAnimation: 'legend',
		// check(card) {
		// 	// if (!lib.skill.qmsgswkjsgj_yeyan.getBigFire(get.event().player)) {
		// 	// 	return -1;
		// 	// }
		// 	// return 1 / (get.value(card) || 0.5);
		// 	return 1;
		// },
		check(card) {
			return false;
		},
		multitarget: true,
		multiline: true,
		// contentBefore() {
		// 	player.awakenSkill(event.skill);
		// },
		content() {
			'step 0';
			event.num = 0;
			targets.sortBySeat();
			('step 1');
			if (cards.length == 4) {
				event.goto(2);
			} else {
				if (event.num < targets.length) {
					targets[event.num].damage('fire', 1, 'nocard');
					event.num++;
				}
				if (event.num == targets.length) {
					event.finish();
				} else {
					event.redo();
				}
			}
			('step 2');
			// player.loseHp(3);
			if (targets.length == 1) {
				event.goto(4);
			} else {
				player
					.chooseTarget('请选择受到2点伤害的角色', true, function (card, player, target) {
						return _status.event.targets.includes(target);
					})
					.set('ai', function (target) {
						return 1;
					})
					.set('forceDie', true)
					.set('targets', targets);
			}
			('step 3');
			if (event.num < targets.length) {
				var dnum = 1;
				if (result.bool && result.targets && targets[event.num] == result.targets[0]) {
					dnum = 2;
				}
				targets[event.num].damage('fire', dnum, 'nocard');
				event.num++;
			}
			if (event.num == targets.length) {
				event.finish();
			} else {
				event.redo();
			}
			('step 4');
			player
				.chooseControl('2点', '3点')
				.set('prompt', '请选择伤害点数')
				.set('ai', function () {
					return '3点';
				})
				.set('forceDie', true);
			('step 5');
			targets[0].damage('fire', result.control == '2点' ? 2 : 3, 'nocard');
		},
		ai: {
			order(item, player) {
				// return lib.skill.qmsgswkjsgj_yeyan.getBigFire(player) ? 10 : 1;
				return 10;
			},
			fireAttack: true,
			result: {
				player(player, target) {
					return get.damageEffect(target, player, player, 'fire');
				},
				target(player, target) {
					return get.damageEffect(target, player, target, 'fire');
				},
			},
		},
		// getBigFire(player) {
		// 	if (player.getDiscardableCards(player, "h").reduce((list, card) => list.add(get.suit(card, player)), []).length < 4) {
		// 		return false;
		// 	}
		// 	const targets = game.filterPlayer(target => get.damageEffect(target, player, player, "fire") && target.hp <= 3 && !target.hasSkillTag("filterDamage", null, { player: player }));
		// 	if (!targets.length) {
		// 		return false;
		// 	}
		// 	if (targets.length == 1 || targets.some(target => get.attitude(player, target) < 0 && target.identity && target.identity.indexOf("zhu") != -1)) {
		// 		let suits = player.getDiscardableCards(player, "h").reduce((map, card) => {
		// 				const suit = get.suit(card, player);
		// 				if (!map[suit]) {
		// 					map[suit] = [];
		// 				}
		// 				return map;
		// 			}, {}),
		// 			cards = [];
		// 		Object.keys(suits).forEach(i => {
		// 			suits[i].addArray(player.getDiscardableCards(player, "h").filter(card => get.suit(card) == i));
		// 			cards.add(suits[i].sort((a, b) => get.value(a) - get.value(b))[0]);
		// 		});
		// 		return player.countCards("h", card => !cards.includes(card) ) > 0;
		// 	}
		// 	return false;
		// },
	},
	qmsgswkjsgj_refanjian: {
		audio: 'refanjian',
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			return player.countCards('h') > 0;
		},
		filterTarget(card, player, target) {
			return player != target;
		},
		filterCard: true,
		check(card) {
			return 8 - get.value(card);
		},
		discard: false,
		lose: false,
		delay: false,
		content() {
			'step 0';
			target.storage.qmsgswkjsgj_refanjian = cards[0];
			player.give(cards[0], target);
			('step 1');
			target.showHandcards();
			var suit = get.suit(target.storage.qmsgswkjsgj_refanjian);
			if (!target.countCards('h')) {
				event._result = { control: 'qmsgswkjsgj_refanjian_hp' };
			} else {
				player.chooseControl('qmsgswkjsgj_refanjian_card', 'qmsgswkjsgj_refanjian_hp').ai = function (event, player) {
					var cards = target.getCards('he', { suit: get.suit(target.storage.qmsgswkjsgj_refanjian) });
					if (cards.length == 1) {
						return 1;
					}
					if (cards.length >= 2) {
						for (var i = 0; i < cards.length; i++) {
							if (get.tag(cards[i], 'save')) {
								return 0;
							}
						}
					}
					if (target.hp == 1) {
						return 1;
					}
					for (var i = 0; i < cards.length; i++) {
						if (get.value(cards[i]) >= 8) {
							return 0;
						}
					}
					if (cards.length > 2 && player.hp > 2) {
						return 0;
					}
					if (cards.length > 3) {
						return 0;
					}
					return 1;
				};
			}
			('step 2');
			if (result.control == 'qmsgswkjsgj_refanjian_card') {
				// target.showHandcards();
			} else {
				target.loseHp();
				event.finish();
			}
			('step 3');
			var suit = get.suit(target.storage.qmsgswkjsgj_refanjian);
			target.discard(
				target.getCards('he', function (i) {
					return get.suit(i) == suit && lib.filter.cardDiscardable(i, target, 'qmsgswkjsgj_refanjian');
				}),
			);
			delete target.storage.qmsgswkjsgj_refanjian;
		},
		ai: {
			order: 9,
			result: {
				target(player, target) {
					return -target.countCards('he') - (player.countCards('h', 'du') ? 1 : 0);
				},
			},
			threaten: 2,
		},
	},
	//缝神荀彧
	qmsgswkjsgj_tianzuo: {
		audio: 'tianzuo',
		trigger: {
			global: 'phaseBefore',
			player: 'enterGame',
		},
		forced: true,
		filter(event, player) {
			return (event.name != 'phase' || game.phaseNumber == 0) && !lib.inpile.includes('qizhengxiangsheng');
		},
		content() {
			game.addGlobalSkill('qmsgswkjsgj_tianzuo_global');
			var cards = [];
			for (var i = 2; i < 10; i++) {
				cards.push(game.createCard2('qizhengxiangsheng', i % 2 ? 'club' : 'spade', i));
				cards.push(game.createCard2('qizhengxiangsheng', i % 2 ? 'club' : 'spade', i));
			}
			game.broadcastAll(function () {
				lib.inpile.add('qizhengxiangsheng');
			});
			game.cardsGotoPile(cards, () => {
				return ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)];
			});
		},
		group: ['qmsgswkjsgj_tianzuo_remove', 'qmsgswkjsgj_tianzuo_use'],
		subSkill: {
			remove: {
				audio: 'qmsgswkjsgj_tianzuo',
				trigger: { target: 'useCardToBefore' },
				forced: true,
				priority: 15,
				filter(event, player) {
					return event.card && event.card.name == 'qizhengxiangsheng';
				},
				content() {
					trigger.cancel();
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (card && card.name == 'qizhengxiangsheng') {
								return 'zeroplayertarget';
							}
						},
					},
				},
			},
			global: {
				trigger: { player: 'useCardToPlayered' },
				forced: true,
				popup: false,
				filter(event, player) {
					return event.card.name == 'qizhengxiangsheng';
				},
				content() {
					'step 0';
					var target = trigger.target;
					event.target = target;
					player
						.chooseControl('奇兵', '正兵')
						.set('prompt', '请选择' + get.translation(target) + '的标记')
						.set(
							'choice',
							(function () {
								var e1 = 1.5 * get.sgn(get.damageEffect(target, player, target));
								var e2 = 0;
								if (target.countGainableCards(player, 'h') > 0 && !target.hasSkillTag('noh')) {
									e2 = -1;
								}
								var es = target.getGainableCards(player, 'e');
								if (es.length) {
									e2 = Math.min(
										e2,
										(function () {
											var max = 0;
											for (var i of es) {
												max = Math.max(max, get.value(i, target));
											}
											return -max / 4;
										})(),
									);
								}
								if (Math.abs(e1 - e2) <= 0.3) {
									return Math.random() < 0.5 ? '奇兵' : '正兵';
								}
								if (e1 < e2) {
									return '奇兵';
								}
								return '正兵';
							})(),
						)
						.set('ai', function () {
							return _status.event.choice;
						});
					('step 1');
					var map = trigger.getParent().customArgs,
						id = target.playerid;
					if (!map[id]) {
						map[id] = {};
					}
					map[id].qizheng_name = result.control;
				},
			},
			rewrite: {
				audio: 'qmsgswkjsgj_tianzuo',
				trigger: { global: 'useCardToTargeted' },
				filter(event, player) {
					return event.card.name == 'qizhengxiangsheng';
				},
				logTarget: 'target',
				prompt2: '观看其手牌并修改“奇正相生”标记',
				content() {
					'step 0';
					var target = trigger.target;
					event.target = target;
					if (player != target && target.countCards('h') > 0) {
						player.viewHandcards(target);
					}
					player
						.chooseControl('奇兵', '正兵')
						.set('prompt', '请选择' + get.translation(target) + '的标记')
						.set(
							'choice',
							(function () {
								var shas = target.getCards('h', 'sha'),
									shans = target.getCards('h', 'shan');
								var e1 = 1.5 * get.sgn(get.damageEffect(target, player, target));
								var e2 = 0;
								if (target.countGainableCards(player, 'h') > 0 && !target.hasSkillTag('noh')) {
									e2 = -1;
								}
								var es = target.getGainableCards(player, 'e');
								if (es.length) {
									e2 = Math.min(
										e2,
										(function () {
											var max = 0;
											for (var i of es) {
												max = Math.max(max, get.value(i, target));
											}
											return -max / 4;
										})(),
									);
								}
								if (get.attitude(player, target) > 0) {
									if (shas.length >= Math.max(1, shans.length)) {
										return '奇兵';
									}
									if (shans.length > shas.length) {
										return '正兵';
									}
									return e1 > e2 ? '奇兵' : '正兵';
								}
								if (shas.length) {
									e1 = -0.5;
								}
								if (shans.length) {
									e2 = -0.7;
								}
								if (Math.abs(e1 - e2) <= 0.3) {
									return Math.random() < 0.5 ? '奇兵' : '正兵';
								}
								var rand = Math.random();
								if (e1 < e2) {
									return rand < 0.1 ? '奇兵' : '正兵';
								}
								return rand < 0.1 ? '正兵' : '奇兵';
							})(),
						)
						.set('ai', () => _status.event.choice);
					('step 1');
					var map = trigger.getParent().customArgs,
						id = target.playerid;
					if (!map[id]) {
						map[id] = {};
					}
					map[id].qizheng_name = result.control;
					map[id].qizheng_aibuff = get.attitude(player, target) > 0;
				},
			},
			use: {
				audio: 'qmsgswkjsgj_tianzuo',
				enable: 'phaseUse',
				usable: 1,
				viewAs: { name: 'qizhengxiangsheng', isCard: true },
				filterCard: function () {
					return false;
				},
				selectCard: -1,
				prompt: '视为使用一张【奇正相生】',
			},
		},
	},
	qmsgswkjsgj_lingce: {
		audio: 'lingce',
		init: (player) => {
			game.addGlobalSkill('lingce_global');
		},
		trigger: { global: 'useCard' },
		forced: true,
		filter(event, player) {
			// if (!event.card.isCard || !event.cards || event.cards.length !== 1) {
			// 	return false;
			// }
			return event.card.name == 'qizhengxiangsheng' || get.zhinangs().includes(event.card.name) || player.getStorage('dinghan').includes(event.card.name);
		},
		content() {
			player.addSkill('qmsgswkjsgj_lingce_add');
			player.draw().gaintag.add('qmsgswkjsgj_lingce');
		},
		subSkill: {
			global: {
				ai: {
					effect: {
						player_use(card, player, target) {
							if (typeof card !== 'object') {
								return;
							}
							let num = 0,
								nohave = true;
							game.countPlayer((i) => {
								if (i.hasSkill('qmsgswkjsgj_lingce', null, null, false)) {
									nohave = false;
									if (
										i.isIn() &&
										lib.skill.lingce.filter(
											{
												card: card,
												cards: card.cards ? card.cards : [card],
											},
											i,
										)
									) {
										num += get.sgnAttitude(player, i);
									}
								}
							}, true);
							if (nohave) {
								game.removeGlobalSkill('qmsgswkjsgj_lingce_global');
							} else {
								return [1, 0.8 * num];
							}
						},
					},
				},
			},
			add: {
				mod: {
					ignoredHandcard(card, player) {
						if (card.hasGaintag('qmsgswkjsgj_lingce')) {
							return true;
						}
					},
					cardDiscardable(card, player, name) {
						if (name == 'phaseDiscard' && card.hasGaintag('qmsgswkjsgj_lingce')) {
							return false;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_dinghan: {
		audio: 'dinghan',
		trigger: {
			target: 'useCardToTarget',
			player: 'addJudgeBefore',
		},
		forced: true,
		locked: false,
		filter(event, player) {
			if (event.name == 'useCardToTarget' && get.type(event.card, null, false) != 'trick') {
				return false;
			}
			return !player.getStorage('dinghan').includes(event.card.name);
		},
		async content(event, trigger, player) {
			player.markAuto('dinghan', [trigger.card.name]);
			if (trigger.name == 'addJudge') {
				trigger.cancel();
				if (trigger.card?.cards?.length) {
					const map = new Map(),
						targets = [];
					for (const card of trigger.card.cards) {
						const owner = get.owner(card);
						if (owner) {
							targets.add(owner);
							map.set(owner, (map.get(owner) ?? []).concat([card]));
						}
					}
					if (targets.length) {
						await game
							.loseAsync({
								map: map,
								targets: targets,
								cards: trigger.card.cards,
							})
							.setContent(async (event, trigger, player) => {
								const { map, targets, cards } = event;
								for (const target of targets) {
									const lose = map.get(target);
									const next = target.lose(lose, ui.discardPile);
									next.getlx = false;
									await next;
								}
								game.log(cards, '进入了弃牌堆');
							});
					}
				}
			} else {
				trigger.targets.remove(player);
				trigger.getParent().triggeredTargets2.remove(player);
				trigger.untrigger();
			}
		},
		onremove: true,
		intro: {
			content: function (storage, player) {
				return '已记录' + player.getStorage('dinghan');
			},
		},
		group: 'qmsgswkjsgj_dinghan_add',
		subSkill: {
			add: {
				trigger: { player: ['phaseBegin', 'damageAfter'] },
				audio: 'qmsgswkjsgj_dinghan',
				// direct: true,

				// content() {
				// 	"step 0";
				// 	var dialog = [get.prompt("dinghan")];
				// 	(list1 = player.getStorage("dinghan")),
				// 		(list2 = lib.inpile.filter(function (i) {
				// 			return get.type2(i, false) == "trick" && !list1.includes(i);
				// 		}));
				// 	if (list1.length) {
				// 		dialog.push('<div class="text center">已记录</div>');
				// 		dialog.push([list1, "vcard"]);
				// 	}
				// 	if (list2.length) {
				// 		dialog.push('<div class="text center">未记录</div>');
				// 		dialog.push([list2, "vcard"]);
				// 	}
				// 	player.chooseButton(dialog).set("ai", function (button) {
				// 		var player = _status.event.player,
				// 			name = button.link[2];
				// 		if (player.getStorage("dinghan").includes(name)) {
				// 			return -get.effect(player, { name: name }, player, player);
				// 		} else {
				// 			return get.effect(player, { name: name }, player, player) * (1 + player.countCards("hs", name));
				// 		}
				// 	});
				// 	"step 1";
				// 	if (result.bool) {
				// 		player.logSkill("qmsgswkjsgj_dinghan");
				// 		var name = result.links[0][2];
				// 		if (player.getStorage("dinghan").includes(name)) {
				// 			player.unmarkAuto("dinghan", [name]);
				// 			game.log(player, "从定汉记录中移除了", "#y" + get.translation(name));
				// 		} else {
				// 			player.markAuto("dinghan", [name]);
				// 			game.log(player, "向定汉记录中添加了", "#y" + get.translation(name));
				// 		}
				// 		game.delayx();
				// 	}
				// },
				getIndex(event, player, name) {
					if (name == 'damageAfter' && event.num) return event.num;
					else return 1;
				},
				cost() {
					'step 0';
					var dialog = [get.prompt('dinghan')];
					((list1 = player.getStorage('dinghan')),
						(list2 = lib.inpile.filter(function (i) {
							return get.type2(i, false) == 'trick' && !list1.includes(i);
						})));
					if (list1.length) {
						dialog.push('<div class="text center">已记录</div>');
						dialog.push([list1, 'vcard']);
					}
					if (list2.length) {
						dialog.push('<div class="text center">未记录</div>');
						dialog.push([list2, 'vcard']);
					}
					player.chooseButton(dialog).set('ai', function (button) {
						var player = _status.event.player,
							name = button.link[2];
						if (player.getStorage('dinghan').includes(name)) {
							return -get.effect(player, { name: name }, player, player);
						} else {
							return get.effect(player, { name: name }, player, player) * (1 + player.countCards('hs', name));
						}
					});
					('step 1');
					if (result.bool) {
						event.result = {
							bool: true,
							cost_data: result.links,
						};
					}
				},
				content() {
					var links = event.cost_data;
					var name = links[0][2];
					if (player.getStorage('dinghan').includes(name)) {
						player.unmarkAuto('dinghan', [name]);
						game.log(player, '从定汉记录中移除了', '#y' + get.translation(name));
					} else {
						player.markAuto('dinghan', [name]);
						game.log(player, '向定汉记录中添加了', '#y' + get.translation(name));
					}
					game.delayx();
				},
			},
		},
	},
	qmsgswkjsgj_shenquhu: {
		audio: 'quhu',

		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			if (player.countCards('h') == 0) {
				return false;
			}
			return game.hasPlayer(function (current) {
				return player.canCompare(current);
			});
		},
		filterTarget(card, player, target) {
			return player.canCompare(target);
		},
		async content(event, trigger, player) {
			const target = event.target;
			const { bool } = await player.chooseToCompare(target).forResult();
			if (!bool) {
				return void (await player.damage(target));
			}
			if (
				!game.hasPlayer(function (player) {
					return player != target && target.inRange(player);
				})
			) {
				return;
			}
			const result = await player
				.chooseTarget(function (card, player, target) {
					const source = _status.event.source;
					return target != source && source.inRange(target);
				}, true)
				.set('ai', function (target) {
					return get.damageEffect(target, _status.event.source, player);
				})
				.set('source', target)
				.forResult();
			if (!result.bool || !result.targets || !result.targets.length) {
				return;
			}
			target.line(result.targets[0], 'green');
			await result.targets[0].damage(target);
		},
		ai: {
			order: 0.5,
			result: {
				target(player, target) {
					const att = get.attitude(player, target);
					const oc = target.countCards('h') == 1;
					if (att > 0 && oc) {
						return 0;
					}
					const players = game.filterPlayer();
					for (let i = 0; i < players.length; i++) {
						if (players[i] != target && players[i] != player && target.inRange(players[i])) {
							if (get.damageEffect(players[i], target, player) > 0) {
								return att > 0 ? att / 2 : att - (oc ? 5 : 0);
							}
						}
					}
					return 0;
				},
				player(player, target) {
					if (target.hasSkillTag('jueqing', false, target)) {
						return -10;
					}
					const hs = player.getCards('h');
					let mn = 1;
					for (let i = 0; i < hs.length; i++) {
						mn = Math.max(mn, get.number(hs[i]));
					}
					if (mn <= 11 && player.hp < 2) {
						return -20;
					}
					let max = player.maxHp - hs.length;
					const players = game.filterPlayer();
					for (let i = 0; i < players.length; i++) {
						if (get.attitude(player, players[i]) > 2) {
							max = Math.max(Math.min(5, players[i].hp) - players[i].countCards('h'), max);
						}
					}
					switch (max) {
						case 0:
							return mn == 13 ? 0 : -20;
						case 1:
							return mn >= 12 ? 0 : -15;
						case 2:
							return 0;
						case 3:
							return 1;
						default:
							return max;
					}
				},
			},
			expose: 0.2,
		},
	},
	qmsgswkjsgj_jiemingplus: {
		audio: 'rejieming',
		trigger: { player: 'damageEnd' },
		filter(event, player) {
			return event.num > 0;
		},
		getIndex: event => event.num,
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill))
				.set('ai', target => {
					const att = get.attitude(get.player(), target);
					if (att > 2) {
						if (target.maxHp - target.countCards('h') > 2) {
							return 2 * att;
						}
						return att;
					}
					return att / 3;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const { targets: [target] } = event;
			player.line(target, 'thunder');
			await target.draw(Math.min(5, target.maxHp));
			await player.draw();
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, 'damage') && target.hp > 1) {
						if (player.hasSkillTag('jueqing', false, target)) {
							return [1, -2];
						}
						var max = 0;
						var players = game.filterPlayer();
						for (var i = 0; i < players.length; i++) {
							if (get.attitude(target, players[i]) > 0) {
								max = Math.max(Math.min(5, players[i].maxHp) - players[i].countCards('h'), max);
							}
						}
						switch (max) {
							case 0: return 2;
							case 1: return 1.5;
							case 2: return [1, 2];
							default: return [0, max];
						}
					}
					if ((card.name == 'tao' || card.name == 'caoyao') && target.hp > 1 && target.countCards('h') <= target.hp) {
						return [0, 0];
					}
				},
			},
		},
	},
	qmsgswkjsgj_tianzuoplus: {
		audio: 'tianzuo',
		trigger: {
			global: 'phaseBefore',
			player: 'enterGame',
		},
		forced: true,
		filter(event, player) {
			return (event.name != 'phase' || game.phaseNumber == 0) && !lib.inpile.includes('qizhengxiangsheng');
		},
		content() {
			game.addGlobalSkill('qmsgswkjsgj_tianzuoplus_global');
			var cards = [];
			for (var i = 1; i <= 12; i++) {
				cards.push(game.createCard2('qizhengxiangsheng', i % 2 ? 'club' : 'spade', i));
				cards.push(game.createCard2('qizhengxiangsheng', i % 2 ? 'club' : 'spade', i));
			}
			game.broadcastAll(function () {
				lib.inpile.add('qizhengxiangsheng');
			});
			game.cardsGotoPile(cards, () => {
				return ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)];
			});
		},
		group: ['qmsgswkjsgj_tianzuoplus_remove', 'qmsgswkjsgj_tianzuoplus_use'],
		subSkill: {
			remove: {
				audio: 'qmsgswkjsgj_tianzuo',
				trigger: { target: 'useCardToBefore' },
				forced: true,
				priority: 15,
				filter(event, player) {
					return event.card && event.card.name == 'qizhengxiangsheng';
				},
				content() {
					trigger.cancel();
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (card && card.name == 'qizhengxiangsheng') {
								return 'zeroplayertarget';
							}
						},
					},
				},
			},
			global: {
				trigger: { player: 'useCardToPlayered' },
				forced: true,
				popup: false,
				filter(event, player) {
					return event.card.name == 'qizhengxiangsheng';
				},
				content() {
					'step 0';
					var target = trigger.target;
					event.target = target;
					player
						.chooseControl('奇兵', '正兵')
						.set('prompt', '请选择' + get.translation(target) + '的标记')
						.set(
							'choice',
							(function () {
								var e1 = 1.5 * get.sgn(get.damageEffect(target, player, target));
								var e2 = 0;
								if (target.countGainableCards(player, 'h') > 0 && !target.hasSkillTag('noh')) {
									e2 = -1;
								}
								var es = target.getGainableCards(player, 'e');
								if (es.length) {
									e2 = Math.min(
										e2,
										(function () {
											var max = 0;
											for (var i of es) {
												max = Math.max(max, get.value(i, target));
											}
											return -max / 4;
										})(),
									);
								}
								if (Math.abs(e1 - e2) <= 0.3) {
									return Math.random() < 0.5 ? '奇兵' : '正兵';
								}
								if (e1 < e2) {
									return '奇兵';
								}
								return '正兵';
							})(),
						)
						.set('ai', function () {
							return _status.event.choice;
						});
					('step 1');
					var map = trigger.getParent().customArgs,
						id = target.playerid;
					if (!map[id]) {
						map[id] = {};
					}
					map[id].qizheng_name = result.control;
				},
			},
			rewrite: {
				audio: 'qmsgswkjsgj_tianzuo',
				trigger: { global: 'useCardToTargeted' },
				filter(event, player) {
					return event.card.name == 'qizhengxiangsheng';
				},
				logTarget: 'target',
				prompt2: '观看其手牌并修改“奇正相生”标记',
				content() {
					'step 0';
					var target = trigger.target;
					event.target = target;
					if (player != target && target.countCards('h') > 0) {
						player.viewHandcards(target);
					}
					player
						.chooseControl('奇兵', '正兵')
						.set('prompt', '请选择' + get.translation(target) + '的标记')
						.set(
							'choice',
							(function () {
								var shas = target.getCards('h', 'sha'),
									shans = target.getCards('h', 'shan');
								var e1 = 1.5 * get.sgn(get.damageEffect(target, player, target));
								var e2 = 0;
								if (target.countGainableCards(player, 'h') > 0 && !target.hasSkillTag('noh')) {
									e2 = -1;
								}
								var es = target.getGainableCards(player, 'e');
								if (es.length) {
									e2 = Math.min(
										e2,
										(function () {
											var max = 0;
											for (var i of es) {
												max = Math.max(max, get.value(i, target));
											}
											return -max / 4;
										})(),
									);
								}
								if (get.attitude(player, target) > 0) {
									if (shas.length >= Math.max(1, shans.length)) {
										return '奇兵';
									}
									if (shans.length > shas.length) {
										return '正兵';
									}
									return e1 > e2 ? '奇兵' : '正兵';
								}
								if (shas.length) {
									e1 = -0.5;
								}
								if (shans.length) {
									e2 = -0.7;
								}
								if (Math.abs(e1 - e2) <= 0.3) {
									return Math.random() < 0.5 ? '奇兵' : '正兵';
								}
								var rand = Math.random();
								if (e1 < e2) {
									return rand < 0.1 ? '奇兵' : '正兵';
								}
								return rand < 0.1 ? '正兵' : '奇兵';
							})(),
						)
						.set('ai', () => _status.event.choice);
					('step 1');
					var map = trigger.getParent().customArgs,
						id = target.playerid;
					if (!map[id]) {
						map[id] = {};
					}
					map[id].qizheng_name = result.control;
					map[id].qizheng_aibuff = get.attitude(player, target) > 0;
				},
			},
			use: {
				audio: 'qmsgswkjsgj_tianzuo',
				enable: 'phaseUse',
				usable: 1,
				viewAs: { name: 'qizhengxiangsheng', isCard: true },
				filterCard: function () {
					return false;
				},
				selectCard: -1,
				prompt: '视为使用一张【奇正相生】',
			},
		},
	},
	qmsgswkjsgj_rejiemingplus: {
		audio: 'rejieming',
		trigger: { player: 'damageEnd' },
		filter(event, player) {
			return event.num > 0;
		},
		getIndex: event => event.num,
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill))
				.set('ai', target => {
					const att = get.attitude(get.player(), target);
					if (att > 2) {
						if (target.maxHp - target.countCards('h') > 2) {
							return 2 * att;
						}
						return att;
					}
					return att / 3;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const { targets: [target] } = event;
			player.line(target, 'thunder');
			await target.draw(2);
			if (target.countCards('h') < target.maxHp) {
				await player.draw();
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, 'damage') && target.hp > 1) {
						if (player.hasSkillTag('jueqing', false, target)) {
							return [1, -2];
						}
						var max = 0;
						var players = game.filterPlayer();
						for (var i = 0; i < players.length; i++) {
							if (get.attitude(target, players[i]) > 0) {
								max = Math.max(Math.min(5, players[i].hp) - players[i].countCards('h'), max);
							}
						}
						switch (max) {
							case 0: return 2;
							case 1: return 1.5;
							case 2: return [1, 2];
							default: return [0, max];
						}
					}
					if ((card.name == 'tao' || card.name == 'caoyao') && target.hp > 1 && target.countCards('h') <= target.hp) {
						return [0, 0];
					}
				},
			},
		},
	},

	//缝神陆逊
	qmsgswkjsgj_nzry_cuike: {
		audio: 'nzry_cuike',
		enable: 'phaseUse',
		filter(event, player) {
			return !player.hasSkill('qmsgswkjsgj_nzry_cuike_lock');
		},
		filterTarget(card, player, target) {
			var num = player.countMark('nzry_junlve');
			return target.isIn();
		},
		selectTarget: 1,
		content() {
			'step 0';
			player.addTempSkill('qmsgswkjsgj_nzry_cuike_lock', { player: ['nzry_junlveAfter', 'phaseUseAfter'] });
			('step 1');
			if (player.countMark('nzry_junlve') % 2 == 1) {
				target.damage();
			} else {
				target.link(true);
				player.discardPlayerCard(target, 1, 'hej', true);
			}
		},
		ai: {
			notemp: true,
		},
		subSkill: {
			lock: {
				mark: true,
				marktext: '<span style="text-decoration: line-through;">摧</span>',
				intro: {
					content: '下次“军略”变化前，本阶段此技能不能使用',
				},
			},
		},
	},
	qmsgswkjsgj_resbqianxun: {
		audio: 'sbqianxun',
		trigger: {
			target: 'useCardToBegin',
			player: 'judgeBefore',
		},
		// filter(event, player) {
		// 	if (!event.card) {
		// 		return false;
		// 	}
		// 	if (event.getParent().name == "phaseJudge") {
		// 		return true;
		// 	}
		// 	if (event.name == "judge") {
		// 		return false;
		// 	}
		// 	if (get.type(event.card) == "trick" && event.player != player) {
		// 		return true;
		// 	}
		// },
		filter(event, player) {
			if (player.countCards('h') == 0) {
				return false;
			}
			if (event.getParent().name == 'phaseJudge') {
				return true;
			}
			if (event.name == 'judge') {
				return false;
			}
			if (event.targets && event.targets.length > 1) {
				return false;
			}
			if (event.card && get.type(event.card) == 'trick' && event.player != player) {
				return true;
			}
		},
		cost() {
			event.result = player
				.chooseCard('h', [1, Infinity], get.prompt2(event.skill))
				.set('ai', function (card) {
					return 4 - get.value(card);
				})
				.forResult();
		},
		content() {
			var cards = event.cards;
			player.addToExpansion(cards, 'giveAuto', player).gaintag.add('qmsgswkjsgj_resbqianxun_gain');
			player.addSkill('qmsgswkjsgj_resbqianxun_gain');
		},
		subSkill: {
			gain: {
				trigger: {
					global: 'phaseEnd',
				},
				forced: true,
				charlotte: true,
				async content(event, trigger, player) {
					var cards = player.getExpansions('qmsgswkjsgj_resbqianxun_gain');
					if (cards.length) {
						await player.gain(cards, 'draw');
					}
					player.removeSkill('qmsgswkjsgj_resbqianxun_gain');
				},
				intro: {
					mark(dialog, storage, player) {
						var cards = player.getExpansions('qmsgswkjsgj_resbqianxun_gain');
						if (player.isUnderControl(true)) {
							dialog.addAuto(cards);
						} else {
							return '共有' + get.cnNumber(cards.length) + '张牌';
						}
					},
					markcount: 'expansion',
				},
			},
		},
	},
	qmsgswkjsgj_resblianying: {
		audio: 'sblianying',
		trigger: {
			player: 'loseAfter',
			global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter', 'phaseEnd'],
		},
		frequent: true,
		filter(event, player, name) {
			if (name == 'phaseEnd') {
				let num = 0;
				player.getHistory('lose', (evt) => {
					if (evt.cards2) {
						num += evt.cards2.length;
					}
				});
				return num > 0;
			}
			if (player.countCards('h')) {
				return false;
			}
			const evt = event.getl(player);
			return evt && evt.player == player && evt.hs && evt.hs.length > 0;
		},
		async content(event, trigger, player) {
			if (event.triggername == 'phaseEnd') {
				let num = 0;
				player.getHistory('lose', (evt) => {
					if (evt.cards2) {
						num += evt.cards2.length;
					}
				});
				num = Math.min(5, num);
				const { cards } = await game.cardsGotoOrdering(get.cards(num));
				if (!cards.length) {
					return;
				}
				do {
					const result =
						cards.length > 1
							? await player
									.chooseButtonTarget({
										createDialog: [`连营：请选择要分配的牌和目标`, cards],
										forced: true,
										selectButton: [1, Infinity],
										cardsx: cards,
										ai1(button) {
											return get.value(button.link);
										},
										ai2(target) {
											const player = get.player();
											const card = ui.selected.buttons[0].link;
											if (card) {
												return get.value(card, target) * get.attitude(player, target);
											}
											return 1;
										},
									})
									.forResult()
							: await player
									.chooseTarget('选择一名角色获得' + get.translation(cards), true)
									.set('ai', (target) => {
										const att = get.attitude(_status.event.player, target);
										if (_status.event.enemy) {
											return -att;
										} else if (att > 0) {
											return att / (1 + target.countCards('h'));
										} else {
											return att / 100;
										}
									})
									.set('enemy', get.value(cards[0], player, 'raw') < 0)
									.forResult();
					if (result.bool) {
						if (!result.links?.length) {
							result.links = cards.slice(0);
						}
						cards.removeArray(result.links);
						player.line(result.targets, 'green');
						const gainEvent = result.targets[0].gain(result.links, 'draw');
						gainEvent.giver = player;
						await gainEvent;
					}
				} while (cards.length > 0);
			} else {
				player.draw();
			}
		},
		ai: {
			threaten: 0.8,
			effect: {
				player_use(card, player, target) {
					if (player.countCards('h') === 1) {
						return [1, 0.8];
					}
				},
				target(card, player, target) {
					if (get.tag(card, 'loseCard') && target.countCards('h') === 1) {
						return 0.5;
					}
				},
			},
			noh: true,
			freeSha: true,
			freeShan: true,
			skillTagFilter(player, tag) {
				if (player.countCards('h') !== 1) {
					return false;
				}
			},
		},
	},
	//缝神曹操
	qmsgswkjsgj_guixin: {
		audio: 'guixin',
		trigger: { player: 'damageEnd' },
		filter(event, player) {
			return game.hasPlayer((cur) => {
				return cur !== player && cur.countCards('hej') > 0;
			});
		},
		check(event, player) {
			if (player.isTurnedOver() || event.num > 1) {
				return true;
			}
			var num = game.countPlayer(function (current) {
				if (current.countCards('he') && current != player && get.attitude(player, current) <= 0) {
					return true;
				}
				if (current.countCards('j') && current != player && get.attitude(player, current) > 0) {
					return true;
				}
			});
			return num >= 2;
		},
		getIndex(event, player) {
			return event.num;
		},
		async content(event, trigger, player) {
			let targets = game.filterPlayer((current) => current != player).sortBySeat();
			player.line(targets, 'green');
			// await player.gainMultiple(targets, "hej");
			for (let target of targets) {
				var result = { bool: false };
				result = await player.gainPlayerCard(target, 'hej').forResult();
				if (!result.bool) {
					await player.draw();
				}
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			threaten(player, target) {
				if (target.hp == 1) {
					return 2.5;
				}
				return 0.5;
			},
			effect: {
				target(card, player, target) {
					if (
						!target._qmsgswkjsgj_guixin_eff &&
						get.tag(card, 'damage') &&
						target.hp >
							(player.hasSkillTag('damageBonus', true, {
								card: card,
								target: target,
							})
								? 2
								: 1)
					) {
						if (player.hasSkillTag('jueqing', false, target)) {
							return [1, -2];
						}
						target._qmsgswkjsgj_guixin_eff = true;
						let gain = game.countPlayer(function (current) {
							if (target == current) {
								return 0;
							}
							if (get.attitude(target, current) > 0) {
								if (current.hasCard((cardx) => lib.filter.canBeGained(cardx, target, current, 'qmsgswkjsgj_guixin') && get.effect(current, cardx, current, current) < 0, 'ej')) {
									return 1.3;
								}
								return 1;
							}
							if (current.hasCard((cardx) => lib.filter.canBeGained(cardx, target, current, 'qmsgswkjsgj_guixin') && get.effect(current, cardx, current, current) > 0, 'ej')) {
								return 1.1;
							}
							if (current.hasCard((cardx) => lib.filter.canBeGained(cardx, target, current, 'qmsgswkjsgj_guixin'), 'h')) {
								return 0.9;
							}
							return 1;
						});
						// if (target.isTurnedOver()) {
						gain += 2.3;
						// } else {
						// 	gain -= 2.3;
						// }
						delete target._guixin_eff;
						return [1, Math.max(0, gain)];
					}
				},
			},
		},
	},
	qmsgswkjsgj_feiying: {
		mod: {
			globalFrom(from, to, distance) {
				return distance - 1;
			},
			globalTo(from, to, distance) {
				return distance + 1;
			},
		},
	},
	//缝神吕布
	qmsgswkjsgj_baonu: {
		audio: 'baonu',
		marktext: '暴',
		trigger: {
			source: 'damageSource',
			player: ['damageEnd', 'enterGame'],
			global: 'phaseBefore',
		},
		forced: true,
		filter(event) {
			return (event.name != 'damage' && (event.name != 'phase' || game.phaseNumber == 0)) || event.num > 0;
		},
		content() {
			player.addMark('baonu', trigger.name == 'damage' ? trigger.num : 2);
		},
		intro: {
			name: '暴怒',
			content: 'mark',
		},
		ai: {
			combo: 'ol_shenfen',
			maixie: true,
			maixie_hp: true,
		},
	},
	qmsgswkjsgj_wumou: {
		audio: 'wumou',
		trigger: { player: 'useCard' },
		forced: true,
		filter(event) {
			return get.type(event.card) == 'trick';
		},
		content() {
			'step 0';
			if (player.hasMark('baonu')) {
				player.chooseControlList(['移去一枚【暴怒】标记', '失去1点体力'], true).set('ai', function (event, player) {
					if (get.effect(player, { name: 'losehp' }, player, player) >= 0) {
						return 1;
					}
					if (player.storage.baonu > 6) {
						return 0;
					}
					if (player.hp + player.countCards('h', 'tao') > 3) {
						return 1;
					}
					return 0;
				});
			} else {
				player.loseHp();
				event.goto(2);
			}
			('step 1');
			if (result.index == 0) {
				player.removeMark('baonu', 1);
			} else {
				player.loseHp();
			}
			('step 2');
			player.draw();
		},
		ai: {
			effect: {
				player_use(card, player) {
					if (get.type(card) == 'trick' && get.value(card) < 6) {
						return [0, -2];
					}
				},
			},
			neg: true,
		},
	},
	qmsgswkjsgj_wuqian: {
		audio: 'wuqian',
		enable: 'phaseUse',
		filter(event, player) {
			return player.countMark('baonu') >= 2 && game.hasPlayer((target) => lib.skill.ol_wuqian.filterTarget(null, player, target));
		},
		filterTarget(card, player, target) {
			return target != player && !target.hasSkill('ol_wuqian_targeted');
		},
		content() {
			player.removeMark('baonu', 2);
			// player.addTempSkills("wushuang");
			// player.popup("无双");
			// game.log(player,'获得了技能','#g【无双】');
			target.addTempSkill('qmsgswkjsgj_wuqian_targeted');
		},
		ai: {
			order: 9,
			result: {
				target(player, target) {
					if (
						player.countCards('hs', (card) => {
							if (!player.getCardUsable({ name: card.name })) {
								return false;
							}
							if (!player.canUse(card, target)) {
								return false;
							}
							var eff1 = get.effect(target, card, player, player);
							_status.baonuCheck = true;
							var eff2 = get.effect(target, card, player, player);
							delete _status.baonuCheck;
							return eff2 > Math.max(0, eff1);
						})
					) {
						return -1;
					}
					return 0;
				},
			},
			combo: 'baonu',
		},
		global: 'qmsgswkjsgj_wuqian_ai',
		subSkill: {
			targeted: {
				charlotte: true,
				ai: { unequip2: true },
			},
			ai: {
				ai: {
					unequip2: true,
					skillTagFilter(player) {
						if (!_status.baonuCheck) {
							return false;
						}
					},
				},
				mod: {
					cardUsableTarget(card, player, target) {
						if (target.hasSkill('qmsgswkjsgj_wuqian_targeted')) {
							return true;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_shenfen: {
		audio: 'shenfen',
		enable: 'phaseUse',
		filter(event, player) {
			return player.countMark('baonu') >= 6;
		},
		usable: 1,
		skillAnimation: true,
		animationColor: 'metal',
		multiline: true,
		multitarget: true,
		selectTarget: [1, Infinity],
		filterTarget: true,
		content() {
			'step 0';
			event.delay = false;
			player.removeMark('baonu', 6);
			// event.targets = game.filterPlayer();
			// event.targets.remove(player);
			event.targets.sort(lib.sort.seat);
			player.line(event.targets, 'green');
			event.targets2 = event.targets.slice(0);
			event.targets3 = event.targets.slice(0);
			('step 1');
			if (event.targets2.length) {
				event.targets2.shift().damage('nocard');
				event.redo();
			}
			('step 2');
			if (event.targets.length) {
				event.current = event.targets.shift();
				if (event.current.countCards('e')) {
					event.delay = true;
				}
				event.current.discard(event.current.getCards('e')).delay = false;
			}
			('step 3');
			if (event.delay) {
				game.delay(0.5);
			}
			event.delay = false;
			if (event.targets.length) {
				event.goto(2);
			}
			('step 4');
			if (event.targets3.length) {
				var target = event.targets3.shift();
				target.chooseToDiscard(4, 'h', true).delay = false;
				if (target.countCards('h')) {
					event.delay = true;
				}
			}
			('step 5');
			if (event.delay) {
				game.delay(0.5);
			}
			event.delay = false;
			if (event.targets3.length) {
				event.goto(4);
			}
			('step 6');
		},
		ai: {
			combo: 'baonu',
			order: 10,
			result: {
				// player(player) {
				// 	return game.countPlayer(function (current) {
				// 		if (current != player) {
				// 			return get.sgn(get.damageEffect(current, player, player));
				// 		}
				// 	});
				// },
				player(player, target) {
					return get.damageEffect(target, player, player) + 5;
				},
				target(player, target) {
					return get.damageEffect(target, player, target) - 5;
				},
			},
		},
	},
	qmsgswkjsgj_wushuang: {
		audio: 'sbwushuang',
		trigger: { source: 'damageBegin1' },
		filter(event, player) {
			const target = event.player;
			const evtx = event.getParent(2);
			const card = event.card;
			const name = card?.name;
			if (!card || !['sha', 'juedou'].includes(name)) {
				return false;
			}
			return true;
			// if (name == "sha") {
			// 	return !target.hasHistory("useCard", evt => {
			// 		return evt.card.name == "shan" && evt.respondTo && evt.getParent(3) == evtx;
			// 	});
			// }
			// return !target.hasHistory("respond", evt => {
			// 	return evt.card.name == "sha" && evt.respondTo && evt.getParent(3) == evtx;
			// });
		},
		forced: true,
		logTarget: 'player',
		usable: 1,
		logAudio: () => ['sbwushuang4.mp3', 'sbwushuang5.mp3'],
		content() {
			trigger.num++;
		},
		group: ['qmsgswkjsgj_wushuang_1', 'qmsgswkjsgj_wushuang_2'],
		preHidden: ['qmsgswkjsgj_wushuang_1', 'qmsgswkjsgj_wushuang_2'],
		subSkill: {
			1: {
				audio: 'sbwushuang',
				sourceSkill: 'sbwushuang',
				logAudio: () => ['sbwushuang1.mp3', 'sbwushuang6.mp3'],
				inherit: 'wushuang1',
				audioname: [],
				audioname2: {},
			},
			2: {
				audio: 'sbwushuang',
				sourceSkill: 'sbwushuang',
				logAudio: () => ['sbwushuang1.mp3', 'sbwushuang6.mp3'],
				inherit: 'wushuang2',
				audioname: [],
				audioname2: {},
			},
		},
	},
	//界曹丕
	qmsgswkjsgj_rexingshang: {
		audio: 'rexingshang',
		audioname2: { caoying: 'lingren_xingshang' },
		trigger: { global: 'die' },
		filter(event, player) {
			return player.isDamaged() || event.player.countCards('he') > 0;
		},
		// direct: true,
		content() {
			'step 0';
			player.gain(trigger.player.getCards('he'), trigger.player, 'giveAuto', 'bySelf');
			('step 1');
			player.recover();
		},
	},
	qmsgswkjsgj_refangzhu: {
		audio: 'refangzhu',
		trigger: {
			player: 'damageEnd',
		},
		direct: true,
		content() {
			'step 0';
			player.chooseTarget(get.prompt2('qmsgswkjsgj_refangzhu'), function (card, player, target) {
				return player != target;
			}).ai = function (target) {
				if (target.hasSkillTag('noturn')) {
					return 0;
				}
				var player = _status.event.player;
				if (get.attitude(_status.event.player, target) == 0) {
					return 0;
				}
				if (get.attitude(_status.event.player, target) > 0) {
					if (target.classList.contains('turnedover')) {
						return 1000 - target.countCards('h');
					}
					if (player.getDamagedHp() < 3) {
						return -1;
					}
					return 100 - target.countCards('h');
				} else {
					// if (target.classList.contains("turnedover")) {
					// 	return -1;
					// }
					// if (player.getDamagedHp() >= 3) {
					// 	return -1;
					// }
					return 1 + target.countCards('h');
				}
			};
			('step 1');
			if (result.bool) {
				player.logSkill('refangzhu', result.targets);
				event.target = result.targets[0];
				player
					.chooseControl(['弃牌掉血', '摸牌翻面', 'cancel2'])
					.set('prompt', '令' + get.translation(event.target) + '弃置' + get.cnNumber(player.getDamagedHp()) + '张牌并失去1点体力；<br>或令' + get.translation(event.target) + '将武将牌翻面并摸' + get.cnNumber(player.getDamagedHp()) + '张牌。')
					.set('ai', function (control) {
						var player = _status.event.player;
						var target = event.target;
						var num = player.getDamagedHp();
						var att = get.attitude(player, target);
						if (att > 0) {
							return '摸牌翻面';
						} else {
							if (target.classList.contains('turnedover')) {
								return '弃牌掉血';
							} else if (num > 2) {
								if (target.hasSkillTag('noturn')) {
									return '弃牌掉血';
								}
							} else {
								return '摸牌翻面';
							}
						}
					});
			} else {
				event.finish();
			}
			('step 2');
			if (result.control) {
				if (result.control == '弃牌掉血') {
					event.target
						.chooseToDiscard('he', player.getDamagedHp(), true)
						.set('ai', function (card) {
							var player = _status.event.player;
							// if (player.isTurnedOver() || _status.event.getTrigger().player.getDamagedHp() > 2) {
							// 	return -1;
							// }
							return player.hp * player.hp - get.value(card);
						})
						.set('prompt', '弃置' + get.cnNumber(player.getDamagedHp()) + '张牌并失去1点体力。');

					event.goto(3);
				} else {
					if (player.isDamaged()) {
						event.target.draw(player.getDamagedHp());
					}
					event.target.turnOver();
					event.finish();
				}
				// else {
				// 	event._result = { bool: false };
				// }
				// if (player.isHealthy()) {
				// 	event._result = { bool: false };
				// } else {
				// 	event.target
				// 		.chooseToDiscard("he", player.getDamagedHp())
				// 		.set("ai", function (card) {
				// 			var player = _status.event.player;
				// 			if (player.isTurnedOver() || _status.event.getTrigger().player.getDamagedHp() > 2) {
				// 				return -1;
				// 			}
				// 			return player.hp * player.hp - get.value(card);
				// 		})
				// 		.set("prompt", "弃置" + get.cnNumber(player.getDamagedHp()) + "张牌并失去1点体力；或选择不弃置，将武将牌翻面并摸" + get.cnNumber(player.getDamagedHp()) + "张牌。");
				// }
			} else {
				event.finish();
			}
			('step 2');
			// if (result.bool) {
			event.target.loseHp();
			// } else {
			// }
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (get.tag(card, 'damage')) {
						if (player.hasSkillTag('jueqing', false, target)) {
							return [1, -1.5];
						}
						if (target.hp <= 1) {
							return;
						}
						if (!target.hasFriend()) {
							return;
						}
						var hastarget = false;
						var turnfriend = false;
						var players = game.filterPlayer();
						for (var i = 0; i < players.length; i++) {
							if (get.attitude(target, players[i]) < 0 && !players[i].isTurnedOver()) {
								hastarget = true;
							}
							if (get.attitude(target, players[i]) > 0 && players[i].isTurnedOver()) {
								hastarget = true;
								turnfriend = true;
							}
						}
						if (get.attitude(player, target) > 0 && !hastarget) {
							return;
						}
						if (turnfriend || target.hp == target.maxHp) {
							return [0.5, 1];
						}
						if (target.hp > 1) {
							return [1, 0.5];
						}
					}
				},
			},
		},
	},
	qmsgswkjsgj_songwei: {
		audio: 'songwei',
		zhuSkill: true,
		trigger: { global: 'judgeEnd' },
		filter(event, player) {
			if (event.player == player || event.player.group != 'wei') {
				return false;
			}
			if (event.result.color != 'black') {
				return false;
			}
			return player.hasZhuSkill('qmsgswkjsgj_songwei', event.player);
		},
		async content(event, trigger, player) {
			player.line(trigger.player, 'green');
			player.draw();
		},
	},
	//界沙摩柯
	qmsgswkjsgj_gzjili: {
		mod: {
			aiOrder(player, card, num) {
				if (player.isPhaseUsing() && get.subtype(card) == 'equip1' && !get.cardtag(card, 'gifts')) {
					var range0 = player.getAttackRange();
					var range = 0;
					var info = get.info(card);
					if (info && info.distance && info.distance.attackFrom) {
						range -= info.distance.attackFrom;
					}
					if (player.getEquip(1)) {
						var num = 0;
						var info = get.info(player.getEquip(1));
						if (info && info.distance && info.distance.attackFrom) {
							num -= info.distance.attackFrom;
						}
						range0 -= num;
					}
					range0 += range;
					if (
						range0 == player.getHistory('useCard').length + player.getHistory('respond').length + 2 &&
						player.countCards('h', function (cardx) {
							return get.subtype(cardx) != 'equip1' && player.getUseValue(cardx) > 0;
						})
					) {
						return num + 10;
					}
				}
			},
		},
		trigger: { player: ['useCard', 'respond'] },
		frequent: true,
		locked: false,
		preHidden: true,
		onremove(player) {
			player.removeTip('gzjili');
		},
		filter(event, player) {
			let count = player.getHistory('useCard').length + player.getHistory('respond').length;
			player.addTip('gzjili', '蒺藜 ' + count, true);
			return count == player.getAttackRange();
		},
		audio: 'gzjili',
		cost() {
			// var type={}
			// for(var i of lib.inpile){
			// 	if(!type[get.type2(i)]||type[get.type2(i)]==undefined)type[get.type2(i)]=get.translation(get.type2(i));
			// };
			'step 0';
			var type = [];
			for (var i of lib.inpile) {
				if (get.type2(i) && !type.includes(get.type2(i))) {
					type.push(get.type2(i));
				}
			}
			// type.push('cancel2')
			player.YB_control(type).set('prompt', '选择一张牌类型');
			('step 1');
			if (result.control != 'cancel2') {
				event.result = {
					bool: true,
					cost_data: result.control,
				};
			}
		},
		content() {
			var type = event.cost_data;
			var num = player.getHistory('useCard').length + player.getHistory('respond').length;
			player.YB_drawCard(num, { type2: type });
		},
		ai: {
			threaten: 1.8,
			effect: {
				target_use(card, player, target, current) {
					let used = target.getHistory('useCard').length + target.getHistory('respond').length;
					if (get.subtype(card) == 'equip1' && !get.cardtag(card, 'gifts')) {
						if (player != target || !player.isPhaseUsing()) {
							return;
						}
						let range0 = player.getAttackRange();
						let range = 0;
						let info = get.info(card);
						if (info && info.distance && info.distance.attackFrom) {
							range -= info.distance.attackFrom;
						}
						if (player.getEquip(1)) {
							let num = 0;
							let info = get.info(player.getEquip(1));
							if (info && info.distance && info.distance.attackFrom) {
								num -= info.distance.attackFrom;
							}
							range0 -= num;
						}
						range0 += range;
						let delta = range0 - used;
						if (delta < 0) {
							return;
						}
						let num = player.countCards('h', function (card) {
							return (get.cardtag(card, 'gifts') || get.subtype(card) != 'equip1') && player.getUseValue(card) > 0;
						});
						if (delta == 2 && num > 0) {
							return [1, 3];
						}
						if (num >= delta) {
							return 'zeroplayertarget';
						}
					} else if (get.tag(card, 'respondShan') > 0) {
						if (current < 0 && used == target.getAttackRange() - 1) {
							if (card.name === 'sha') {
								if (!target.mayHaveShan(player, 'use')) {
									return;
								}
							} else if (!target.mayHaveShan(player)) {
								return 0.9;
							}
							return [1, (used + 1) / 2];
						}
					} else if (get.tag(card, 'respondSha') > 0) {
						if (current < 0 && used == target.getAttackRange() - 1 && target.mayHaveSha(player)) {
							return [1, (used + 1) / 2];
						}
					}
				},
			},
		},
	},
	//界裴秀
	//十常侍

	//十常侍
	qmsgswkjsgj_mbdanggu: {
		audio: 'mbdanggu',
		trigger: {
			player: 'enterGame',
			global: 'phaseBefore',
		},
		filter(event, player) {
			return event.name != 'phase' || game.phaseNumber == 0;
		},
		derivation: ['qmsgswkjsgj_mbdanggu_faq', 'qmsgswkjsgj_mbdanggu_faq2', 'qmsgswkjsgj_scstaoluan', 'qmsgswkjsgj_scschiyan', 'qmsgswkjsgj_scszimou', 'qmsgswkjsgj_scspicai', 'qmsgswkjsgj_scsyaozhuo', 'qmsgswkjsgj_scsxiaolu', 'qmsgswkjsgj_scskuiji', 'qmsgswkjsgj_scschihe', 'qmsgswkjsgj_scsniqu', 'scsanruo'],
		forced: true,
		unique: true,
		onremove(player) {
			delete player.storage.qmsgswkjsgj_mbdanggu;
			delete player.storage.qmsgswkjsgj_mbdanggu_current;
			if (lib.skill.qmsgswkjsgj_mbdanggu.isSingleShichangshi(player)) {
				game.broadcastAll(function (player) {
					player.name1 = player.name;
					player.skin.name = player.name;
					player.smoothAvatar(false);
					player.node.avatar.setBackground(player.name, 'character');
					player.node.name.innerHTML = get.slimName(player.name);
					delete player.name2;
					delete player.skin.name2;
					player.classList.remove('fullskin2');
					player.node.avatar2.classList.add('hidden');
					player.node.name2.innerHTML = '';
					if (player == game.me && ui.fakeme) {
						ui.fakeme.style.backgroundImage = player.node.avatar.style.backgroundImage;
					}
				}, player);
			}
		},
		changshi: [
			['qmsgswkjsgj_scs_zhangrang', 'qmsgswkjsgj_scstaoluan'],
			['qmsgswkjsgj_scs_zhaozhong', 'qmsgswkjsgj_scschiyan'],
			['qmsgswkjsgj_scs_sunzhang', 'qmsgswkjsgj_scszimou'],
			['qmsgswkjsgj_scs_bilan', 'qmsgswkjsgj_scspicai'],
			['qmsgswkjsgj_scs_xiayun', 'qmsgswkjsgj_scsyaozhuo'],
			['qmsgswkjsgj_scs_hankui', 'qmsgswkjsgj_scsxiaolu'],
			['qmsgswkjsgj_scs_lisong', 'qmsgswkjsgj_scskuiji'],
			['qmsgswkjsgj_scs_duangui', 'qmsgswkjsgj_scschihe'],
			['qmsgswkjsgj_scs_guosheng', 'qmsgswkjsgj_scsniqu'],
			['qmsgswkjsgj_scs_gaowang', 'scsanruo'],
		],
		conflictMap(player) {
			if (!_status.qmsgswkjsgj_changshiMap) {
				_status.qmsgswkjsgj_changshiMap = {
					qmsgswkjsgj_scs_zhangrang: [],
					qmsgswkjsgj_scs_zhaozhong: [],
					qmsgswkjsgj_scs_sunzhang: [],
					qmsgswkjsgj_scs_bilan: ['qmsgswkjsgj_scs_hankui'],
					qmsgswkjsgj_scs_xiayun: [],
					qmsgswkjsgj_scs_hankui: ['qmsgswkjsgj_scs_bilan'],
					qmsgswkjsgj_scs_lisong: [],
					qmsgswkjsgj_scs_duangui: ['qmsgswkjsgj_scs_guosheng'],
					qmsgswkjsgj_scs_guosheng: ['qmsgswkjsgj_scs_duangui'],
					qmsgswkjsgj_scs_gaowang: [],
				};
				if (!get.isLuckyStar(player)) {
					var list = lib.skill.qmsgswkjsgj_mbdanggu.changshi.map((i) => i[0]);
					for (var i of list) {
						var select = list.filter((scs) => scs != i && !_status.qmsgswkjsgj_changshiMap[i].includes(i));
						_status.qmsgswkjsgj_changshiMap[i].addArray(select.randomGets(get.rand(0, select.length)));
					}
				}
			}
			return _status.qmsgswkjsgj_changshiMap;
		},
		async content(event, trigger, player) {
			const list = lib.skill.qmsgswkjsgj_mbdanggu.changshi.map((i) => i[0]);
			player.markAuto('qmsgswkjsgj_mbdanggu', list);
			game.broadcastAll(
				function (player, list) {
					const cards = [];
					for (let i = 0; i < list.length; i++) {
						const cardname = 'huashen_card_' + list[i];
						lib.card[cardname] = {
							fullimage: true,
							image: 'character/' + list[i],
						};
						lib.translate[cardname] = get.rawName2(list[i]);
						cards.push(game.createCard(cardname, '', ''));
					}
					player.$draw(cards, 'nobroadcast');
				},
				player,
				list,
			);
			const next = game.createEvent('qmsgswkjsgj_mbdanggu_clique');
			next.player = player;
			next.setContent(lib.skill.qmsgswkjsgj_mbdanggu.contentx);
			await next;
		},
		async contentx(event, trigger, player) {
			let list = player.getStorage('qmsgswkjsgj_mbdanggu').slice();
			const first = list.randomRemove();
			const others = list.randomGets(4);
			let result;
			if (others.length == 1) {
				result = { bool: true, links: others };
			} else {
				const map = {
						qmsgswkjsgj_scs_bilan: 'qmsgswkjsgj_scs_hankui',
						qmsgswkjsgj_scs_hankui: 'qmsgswkjsgj_scs_bilan',
						qmsgswkjsgj_scs_duangui: 'qmsgswkjsgj_scs_guosheng',
						qmsgswkjsgj_scs_guosheng: 'qmsgswkjsgj_scs_duangui',
						// 这个版本:'没有不认可',
					},
					map2 = lib.skill.qmsgswkjsgj_mbdanggu.conflictMap(player);
				const conflictList = others.filter((changshi) => {
					if (map[first] && others.some((changshi2) => map[first] == changshi2)) {
						return map[first] == changshi;
					} else {
						return map2[first].includes(changshi);
					}
				});
				list = others.slice();
				if (conflictList.length) {
					const conflict = conflictList.randomGet();
					list.remove(conflict);
					game.broadcastAll(
						function (changshi, player) {
							if (lib.config.background_speak) {
								if (player.isUnderControl(true)) {
									game.playAudio('skill', changshi + '_enter');
								}
							}
						},
						conflict,
						player,
					);
				}
				result = await player
					.chooseButton(['党锢：请选择结党对象', [[first], 'character'], '<div class="text center">可选常侍</div>', [others, 'character']], true)
					.set('filterButton', (button) => {
						return _status.event.canChoose.includes(button.link);
					})
					.set('canChoose', list)
					.set('ai', (button) => Math.random() * 10)
					.forResult();
			}
			if (result?.bool) {
				const chosen = result.links[0];
				const skills = [];
				list = lib.skill.qmsgswkjsgj_mbdanggu.changshi;
				const changshis = [first, chosen];
				player.unmarkAuto('qmsgswkjsgj_mbdanggu', changshis);
				player.storage.qmsgswkjsgj_mbdanggu_current = changshis;
				for (const changshi of changshis) {
					for (const cs of list) {
						if (changshi == cs[0]) {
							skills.push(cs[1]);
						}
					}
				}
				if (lib.skill.qmsgswkjsgj_mbdanggu.isSingleShichangshi(player)) {
					game.broadcastAll(
						function (player, first, chosen) {
							player.name1 = first;
							player.node.avatar.setBackground(first, 'character');
							player.node.name.innerHTML = get.slimName(first);
							player.name2 = chosen;
							player.skin.name = first;
							player.skin.name2 = chosen;
							player.classList.add('fullskin2');
							player.node.avatar2.classList.remove('hidden');
							player.node.avatar2.setBackground(chosen, 'character');
							player.node.name2.innerHTML = get.slimName(chosen);
							if (player == game.me && ui.fakeme) {
								ui.fakeme.style.backgroundImage = player.node.avatar.style.backgroundImage;
							}
						},
						player,
						first,
						chosen,
					);
				}
				game.log(player, '选择了常侍', '#y' + get.translation(changshis));
				if (skills.length) {
					player.addAdditionalSkill('qmsgswkjsgj_mbdanggu', skills);
					let str = '';
					for (const i of skills) {
						str += '【' + get.translation(i) + '】、';
						player.popup(i);
					}
					str = str.slice(0, -1);
					game.log(player, '获得了技能', '#g' + str);
				}
			}
		},
		isSingleShichangshi(player) {
			var map = lib.skill.qmsgswkjsgj_mbdanggu.conflictMap(player);
			return player.name == 'qmsgswkjsgj_re_shichangshi' && ((map[player.name1] && map[player.name2]) || (map[player.name1] && !player.name2) || (!player.name1 && !player.name2) || (player.name == player.name1 && !player.name2));
		},
		mod: {
			aiValue(player, card, num) {
				if (['shan', 'tao', 'wuxie', 'caochuan'].includes(card.name)) {
					return num / 10;
				}
			},
			aiUseful() {
				return lib.skill.mbdanggu.mod.aiValue.apply(this, arguments);
			},
		},
		ai: {
			combo: 'mbmowang',
			nokeep: true,
		},
		intro: {
			mark(dialog, storage, player) {
				dialog.addText('剩余常侍');
				dialog.addSmall([storage, 'character']);
				if (player.storage.qmsgswkjsgj_mbdanggu_current && player.isIn()) {
					dialog.addText('当前常侍');
					dialog.addSmall([player.storage.qmsgswkjsgj_mbdanggu_current, 'character']);
				}
			},
		},
	},
	qmsgswkjsgj_mbmowang: {
		audio: 'mbmowang',
		trigger: {
			player: ['dieBefore', 'rest', 'dieAfter'],
		},
		filter(event, player, name) {
			if (name == 'rest') {
				return true;
			}
			if (name == 'dieAfter') {
				return event.reserveOut;
			}
			return event.getParent().name != 'giveup' && player.maxHp > 0;
		},
		derivation: 'qmsgswkjsgj_mbmowang_faq',
		forced: true,
		forceDie: true,
		forceOut: true,
		direct: true,
		priority: 15,
		group: ['qmsgswkjsgj_mbmowang_die', 'qmsgswkjsgj_mbmowang_return'],
		async content(event, trigger, player) {
			if (event.triggername == 'rest') {
				game.broadcastAll(
					function (player, list) {
						//player.classList.add("out");
						if (list.includes(player.name1) || player.name1 == 'qmsgswkjsgj_re_shichangshi') {
							player.smoothAvatar(false);
							var name1 = get.YB_mjz(player.name1) || player.name1;
							player.skin.name = name1 + '_dead';
							player.node.avatar.setBackground(name1 + '_dead', 'character');
						}
						if (list.includes(player.name2) || player.name2 == 'qmsgswkjsgj_re_shichangshi') {
							player.smoothAvatar(true);
							var name2 = get.YB_mjz(player.name2) || player.name2;
							player.skin.name2 = name2 + '_dead';
							player.node.avatar2.setBackground(name2 + '_dead', 'character');
						}
					},
					player,
					lib.skill.qmsgswkjsgj_mbdanggu.changshi.map((i) => i[0]),
				);
				return;
			} else if (event.triggername == 'dieAfter') {
				if (player.getStorage('qmsgswkjsgj_mbdanggu').length) {
					game.broadcastAll(function () {
						if (lib.config.background_speak) {
							game.playAudio('die', 'shichangshiRest');
						}
					});
					await player.rest({ type: 'round', count: 1 }); //, audio: "shichangshiRest"
				}
			} else {
				if (player.isRest()) {
					trigger.cancel();
				} else if (player.getStorage('qmsgswkjsgj_mbdanggu').length) {
					player.logSkill('qmsgswkjsgj_mbmowang');
					/*game.broadcastAll(function () {
						if (lib.config.background_speak) {
							game.playAudio("die", "shichangshiRest");
						}
					});*/
					//煞笔十常侍
					// trigger.restMap = {
					// 	type: "round",
					// 	count: 1,
					// 	audio: "shichangshiRest",
					// };
					trigger.excludeMark.add('qmsgswkjsgj_mbdanggu');
					trigger.noDieAudio = true;
					//trigger.includeOut = true;
					trigger.reserveOut = true;
				} else {
					player.changeSkin('qmsgswkjsgj_mbmowang', 'qmsgswkjsgj_re_shichangshi_dead');
				}
			}
		},
		ai: {
			combo: 'qmsgswkjsgj_mbdanggu',
			neg: true,
		},
		subSkill: {
			die: {
				audio: 'mbmowang',
				trigger: { player: 'phaseAfter' },
				forced: true,
				forceDie: true,
				async content(event, trigger, player) {
					if (lib.skill.qmsgswkjsgj_mbdanggu.isSingleShichangshi(player)) {
						if (!player.getStorage('qmsgswkjsgj_mbdanggu').length) {
							game.broadcastAll(function (player) {
								player.name1 = player.name;
								player.skin.name = player.name + '_dead';
								player.smoothAvatar(false);
								player.node.avatar.setBackground(player.name + '_dead', 'character');
								player.node.name.innerHTML = get.slimName(player.name);
								delete player.name2;
								delete player.skin.name2;
								player.classList.remove('fullskin2');
								player.node.avatar2.classList.add('hidden');
								player.node.name2.innerHTML = '';
								if (player == game.me && ui.fakeme) {
									ui.fakeme.style.backgroundImage = player.node.avatar.style.backgroundImage;
								}
							}, player);
						}
					}
					if (!player.getStorage('qmsgswkjsgj_mbdanggu').length) {
						await game.delay();
					}
					await player.die();
				},
			},
			return: {
				trigger: { player: 'restEnd' },
				forced: true,
				charlotte: true,
				silent: true,
				forceDie: true,
				forceOut: true,
				filter(event, player) {
					return event.player == player && player.hasSkill('qmsgswkjsgj_mbdanggu', null, null, false);
				},
				async content(event, trigger, player) {
					game.broadcastAll(function (player) {
						if (player.name1 == 'qmsgswkjsgj_re_shichangshi') {
							player.smoothAvatar(false);
							player.node.avatar.setBackground(player.name1, 'character');
							if (!lib.skill.qmsgswkjsgj_mbdanggu.isSingleShichangshi(player)) {
								player.skin.name = player.name1;
							}
						}
						if (player.name2 == 'qmsgswkjsgj_re_shichangshi') {
							player.smoothAvatar(true);
							player.node.avatar2.setBackground(player.name2, 'character');
							if (!lib.skill.qmsgswkjsgj_mbdanggu.isSingleShichangshi(player)) {
								player.skin.name2 = player.name2;
							}
						}
					}, player);
					delete player.storage.qmsgswkjsgj_mbdanggu_current;
					if (lib.skill.qmsgswkjsgj_mbdanggu.isSingleShichangshi(player)) {
						game.broadcastAll(function (player) {
							player.name1 = player.name;
							player.skin.name = player.name;
							player.smoothAvatar(false);
							player.node.avatar.setBackground(player.name, 'character');
							player.node.name.innerHTML = get.slimName(player.name);
							delete player.name2;
							delete player.skin.name2;
							player.classList.remove('fullskin2');
							player.node.avatar2.classList.add('hidden');
							player.node.name2.innerHTML = '';
							if (player == game.me && ui.fakeme) {
								ui.fakeme.style.backgroundImage = player.node.avatar.style.backgroundImage;
							}
						}, player);
					}
					const next = game.createEvent('qmsgswkjsgj_mbdanggu_clique');
					next.player = player;
					next.setContent(lib.skill.qmsgswkjsgj_mbdanggu.contentx);
					await next;
					await player.draw(2);
				},
			},
		},
	},
	//张让
	qmsgswkjsgj_scstaoluan: {
		audio: 'scstaoluan',
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			return player.countCards('hes') > 0;
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				for (var i = 0; i < lib.inpile.length; i++) {
					var name = lib.inpile[i];
					if (name == 'sha') {
						list.push(['基本', '', 'sha']);
						for (var j of lib.inpile_nature) {
							list.push(['基本', '', 'sha', j]);
						}
					} else if (get.type(name) == 'trick') {
						list.push(['锦囊', '', name]);
					} else if (get.type(name) == 'basic') {
						list.push(['基本', '', name]);
					} else if (get.type(name) == 'delay') {
						list.push(['延时', '', name]);
					}
				}
				return ui.create.dialog('滔乱', [list, 'vcard']);
			},
			filter(button, player) {
				return _status.event.getParent().filterCard({ name: button.link[2] }, player, _status.event.getParent());
			},
			check(button) {
				var player = _status.event.player;
				if (player.countCards('hs', button.link[2]) > 0) {
					return 0;
				}
				if (button.link[2] == 'wugu') {
					return;
				}
				var effect = player.getUseValue(button.link[2]);
				if (effect > 0) {
					return effect;
				}
				return 0;
			},
			backup(links, player) {
				return {
					filterCard: false,
					audio: 'scstaoluan',
					selectCard: -1,
					popname: true,
					check(card) {
						return 6 - get.value(card);
					},
					position: 'hes',
					viewAs: { name: links[0][2], nature: links[0][3] },
				};
			},
			prompt(links, player) {
				return '视为使用' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '？';
			},
		},
		ai: {
			order: 4,
			result: {
				player: 1,
			},
			threaten: 1.9,
		},
		// group:'qmsgswkjsgj_scstaoluan_after',
		subSkill: {
			after: {
				trigger: { player: 'useCardAfter' },
				audio: 'scstaoluan',
				filter: function (event, player) {
					return event.skill && event.skill == 'qmsgswkjsgj_scstaoluan_backup';
				},
				// direct:true,
				forced: true,
				content: function () {
					// player.logSkill('yb007_chenwang')
					player.draw();
				},
			},
			backup: {},
		},
	},
	//赵忠
	qmsgswkjsgj_scschiyan: {
		audio: 'scschiyan',
		trigger: { player: 'useCardToPlayered' },
		direct: true,
		filter(event, player) {
			return event.card.name == 'sha' && event.target.hp > 0 && event.target.countCards('he') > 0;
		},
		content() {
			'step 0';
			var next = player.choosePlayerCard(trigger.target, 'he', Math.min(2, trigger.target.countCards('he')), get.prompt('scschiyan', trigger.target));
			next.set('ai', function (button) {
				if (!_status.event.goon) {
					return 0;
				}
				var val = get.value(button.link);
				if (button.link == _status.event.target.getEquip(2)) {
					return 2 * (val + 3);
				}
				return val;
			});
			next.set('goon', get.attitude(player, trigger.target) <= 0);
			next.set('forceAuto', true);
			('step 1');
			if (result.bool) {
				var target = trigger.target;
				player.logSkill('qmsgswkjsgj_scschiyan', target);
				target.addSkill('qmsgswkjsgj_scschiyan_get');
				target.addToExpansion('giveAuto', result.cards, target).gaintag.add('qmsgswkjsgj_scschiyan_get');
			}
		},
		ai: {
			unequip_ai: true,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (get.attitude(player, arg.target) > 0) {
					return false;
				}
				if (tag == 'directHit_ai') {
					return arg.target.hp >= Math.max(1, arg.target.countCards('h') - 1);
				}
				if (arg && arg.name == 'sha' && arg.target.getEquip(2)) {
					return true;
				}
				return false;
			},
		},
		group: 'qmsgswkjsgj_scschiyan_damage',
		subSkill: {
			get: {
				trigger: { global: 'phaseEnd' },
				forced: true,
				popup: false,
				charlotte: true,
				filter(event, player) {
					return player.getExpansions('qmsgswkjsgj_scschiyan_get').length > 0;
				},
				content() {
					'step 0';
					var cards = player.getExpansions('qmsgswkjsgj_scschiyan_get');
					player.gain(cards, 'draw');
					game.log(player, '收回了' + get.cnNumber(cards.length) + '张“鸱咽”牌');
					('step 1');
					player.removeSkill('qmsgswkjsgj_scschiyan_get');
				},
				intro: {
					markcount: 'expansion',
					mark(dialog, storage, player) {
						var cards = player.getExpansions('qmsgswkjsgj_scschiyan_get');
						if (player.isUnderControl(true)) {
							dialog.addAuto(cards);
						} else {
							return '共有' + get.cnNumber(cards.length) + '张牌';
						}
					},
				},
			},
			damage: {
				audio: 'qmsgswkjsgj_scschiyan',
				trigger: { source: 'damageBegin1' },
				forced: true,
				locked: false,
				logTarget: 'player',
				filter(event, player) {
					var target = event.player;
					return event.getParent().name == 'sha' && player.countCards('h') >= target.countCards('h') && player.countCards('e') >= target.countCards('e');
				},
				content() {
					trigger.num++;
				},
			},
		},
	},
	//孙璋
	qmsgswkjsgj_scszimou: {
		audio: 'scszimou',
		trigger: { player: 'useCard' },
		forced: true,
		filter(event, player) {
			var evt = event.getParent('phaseUse');
			if (!evt || evt.player != player) {
				return false;
			}
			var num = player.getHistory('useCard', (evtx) => evtx.getParent('phaseUse') == evt).length;
			return num == 1 || num == 2 || num == 3;
		},
		content() {
			var evt = trigger.getParent('phaseUse');
			var num = player.getHistory('useCard', (evtx) => evtx.getParent('phaseUse') == evt).length;
			var cards = [];
			if (num == 1) {
				var card = get.cardPile2((card) => {
					return ['jiu', 'xionghuangjiu'].includes(card.name);
				});
				if (card) {
					cards.push(card);
				}
				// var card = get.cardPile2(card => {
				// 	return card.name == "shan";
				// });
				// if (card) {
				// 	cards.push(card);
				// }
			} else if (num == 2) {
				var card = get.cardPile2((card) => {
					return card.name == 'sha';
				});
				if (card) {
					cards.push(card);
				}
				// var card = get.cardPile2(card => {
				// 	return ["tao", "zong"].includes(card.name);
				// });
				// if (card) {
				// 	cards.push(card);
				// }
			} else if (num == 3) {
				var card = get.cardPile2((card) => {
					return card.name == 'juedou';
				});
				if (card) {
					cards.push(card);
				}
				// var card = get.cardPile2(card => {
				// 	return ["wuzhong", "sadouchengbing","dongzhuxianji"].includes(card.name);
				// });
				// if (card) {
				// 	cards.push(card);
				// }
			}
			if (cards.length) {
				player.gain(cards, 'gain2');
			}
		},
	},
	//毕岚
	qmsgswkjsgj_scspicai: {
		audio: 'scspicai',
		enable: 'phaseUse',
		usable: 1,
		frequent: true,
		content() {
			'step 0';
			event.cards = [];
			event.suits = [];
			event.numbers = [];
			('step 1');
			player
				.judge(function (result) {
					var evt = _status.event.getParent('qmsgswkjsgj_scspicai');
					if (
						evt &&
						// evt.suits && evt.suits.includes(get.suit(result))&&
						evt.numbers &&
						evt.numbers.includes(get.number(result))
					) {
						return 0;
					}
					return 1;
				})
				.set('callback', lib.skill.qmsgswkjsgj_scspicai.callback).judge2 = function (result) {
				return result.bool ? true : false;
			};
			('step 2');
			var cards = cards.filterInD();
			if (cards.length) {
				player.chooseTarget('将' + get.translation(cards) + '交给一名角色', true).set('ai', function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target) / Math.sqrt(1 + target.countCards('h'));
					if (target.hasSkillTag('nogain')) {
						att /= 10;
					}
					return att;
				});
			} else {
				event.finish();
			}
			('step 3');
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.line(target, 'green');
				target.gain(cards, 'gain2').giver = player;
			} else {
				event.finish();
			}
		},
		callback() {
			'step 0';
			var evt = event.getParent(2);
			event.getParent().orderingCards.remove(event.judgeResult.card);
			evt.cards.push(event.judgeResult.card);
			if (event.getParent().result.bool) {
				// evt.suits.push(event.getParent().result.suit);
				evt.numbers.push(event.getParent().result.number);
				player.chooseBool('是否继续发动【庀材】？').set('frequentSkill', 'qmsgswkjsgj_scspicai');
			} else {
				event._result = { bool: false };
			}
			('step 1');
			if (result.bool) {
				event.getParent(2).redo();
			}
		},
		ai: {
			order: 9,
			result: {
				player: 1,
			},
		},
	},
	//夏恽
	qmsgswkjsgj_scsyaozhuo: {
		audio: 'scsyaozhuo',
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			return game.hasPlayer(function (current) {
				return player.canCompare(current);
			});
		},
		filterTarget(card, player, current) {
			return player.canCompare(current);
		},
		content() {
			'step 0';
			player.chooseToCompare(target);
			('step 1');
			if (result.bool||result.tie) {
				target.skip('phaseDraw');
				target.addTempSkill('qmsgswkjsgj_scsyaozhuo_skip', { player: 'phaseDrawSkipped' });
			} else {
				// player.chooseToDiscard(2, true, "he");
				// player.draw();
			}
		},
		subSkill: {
			skip: {
				mark: true,
				intro: { content: '跳过下一个摸牌阶段' },
			},
		},
		ai: {
			order: 1,
			result: {
				target(player, target) {
					if (target.skipList.includes('phaseDraw') || target.hasSkill('pingkou')) {
						return 0;
					}
					var hs = player.getCards('h').sort(function (a, b) {
						return b.number - a.number;
					});
					var ts = target.getCards('h').sort(function (a, b) {
						return b.number - a.number;
					});
					if (!hs.length || !ts.length) {
						return 0;
					}
					if (hs[0].number > ts[0].number - 2 && hs[0].number > 5) {
						return -1;
					}
					return 0;
				},
			},
		},
	},
	//韩悝
	qmsgswkjsgj_scsxiaolu: {
		audio: 'scsxiaolu',
		enable: 'phaseUse',
		usable: 1,
		content() {
			'step 0';
			player.draw(4);
			('step 1');
			var num = player.countCards('h');
			if (!num) {
				event.finish();
			} else if (num < 4) {
				event._result = { index: 1 };
			} else {
				player
					.chooseControl()
					.set('choiceList', ['将四张牌交给一名其他角色', '弃置四张手牌'])
					.set('ai', function () {
						if (
							game.hasPlayer(function (current) {
								return current != player && get.attitude(player, current) > 0;
							})
						) {
							return 0;
						}
						return 1;
					});
			}
			('step 2');
			if (result.index == 0) {
				player.chooseCardTarget({
					position: 'he',
					filterCard: true,
					selectCard: 4,
					filterTarget(card, player, target) {
						return player != target;
					},
					ai1(card) {
						return get.unuseful(card);
					},
					ai2(target) {
						var att = get.attitude(_status.event.player, target);
						if (target.hasSkillTag('nogain')) {
							att /= 10;
						}
						if (target.hasJudge('lebu')) {
							att /= 5;
						}
						return att;
					},
					prompt: '选择四张手牌，交给一名其他角色',
					forced: true,
				});
			} else {
				player.chooseToDiscard(4, true, 'h');
				event.finish();
			}
			('step 3');
			if (result.bool) {
				var target = result.targets[0];
				player.give(result.cards, target);
			}
		},
		ai: {
			order: 9,
			result: { player: 2 },
		},
	},
	//栗嵩
	qmsgswkjsgj_scskuiji: {
		audio: 'scskuiji',
		enable: 'phaseUse',
		usable: 1,
		filterTarget(card, player, target) {
			return target != player && target.countCards('h') > 0;
		},
		content() {
			'step 0';
			event.list1 = [];
			event.list2 = [];
			if (player.countCards('h') > 0) {
				var chooseButton = player.chooseButton(4, ['你的手牌', player.getCards('h'), get.translation(target.name) + '的手牌', target.getCards('h')]);
			} else {
				var chooseButton = player.chooseButton(4, [get.translation(target.name) + '的手牌', target.getCards('h')]);
			}
			chooseButton.set('target', target);
			chooseButton.set('ai', function (button) {
				var player = _status.event.player;
				var target = _status.event.target;
				var ps = [];
				var ts = [];
				for (var i = 0; i < ui.selected.buttons.length; i++) {
					var card = ui.selected.buttons[i].link;
					if (target.getCards('h').includes(card)) {
						ts.push(card);
					} else {
						ps.push(card);
					}
				}
				var card = button.link;
				var owner = get.owner(card);
				var val = get.value(card) || 1;
				if (owner == target) {
					return 2 * val;
				}
				return 7 - val;
			});
			chooseButton.set('filterButton', function (button) {
				if (!lib.filter.canBeDiscarded(button.link, get.player(), get.owner(button.link))) return false;
				// for (var i = 0; i < ui.selected.buttons.length; i++) {
				// 	if (get.suit(button.link) == get.suit(ui.selected.buttons[i].link)) {
				// 		return false;
				// 	}
				// }
				return true;
			});
			('step 1');
			if (result.bool) {
				var list = result.links;
				for (var i = 0; i < list.length; i++) {
					if (get.owner(list[i]) == player) {
						event.list1.push(list[i]);
					} else {
						event.list2.push(list[i]);
					}
				}
				if (event.list1.length && event.list2.length) {
					game.loseAsync({
						lose_list: [
							[player, event.list1],
							[target, event.list2],
						],
						discarder: player,
					}).setContent('discardMultiple');
				} else if (event.list2.length) {
					target.discard(event.list2);
				} else {
					player.discard(event.list1);
				}
			}
		},
		ai: {
			order: 13,
			result: {
				target: -1,
			},
		},
	},
	//段珪
	qmsgswkjsgj_scschihe: {
		audio: 1,
		trigger: { player: 'useCardToPlayered' },
		filter(event, player) {
			return event.targets.length == 1 && event.card.name == 'sha';
		},
		prompt2(event, player) {
			var str = '亮出牌堆顶的三张牌并增加伤害；且';
			str += '令' + get.translation(event.target) + '不能使用';
			str += '这三张牌所包含的花色';
			str += '的牌响应' + get.translation(event.card);
			return str;
		},
		logTarget: 'target',
		locked: false,
		check(event, player) {
			var target = event.target;
			if (get.attitude(player, target) > 0) {
				return false;
			}
			return true;
		},
		content() {
			var num = 3;
			var evt = trigger.getParent();
			var suit = get.suit(trigger.card);
			var suits = [];
			if (num > 0) {
				if (typeof evt.baseDamage != 'number') {
					evt.baseDamage = 1;
				}
				var cards = get.cards(num);
				player.showCards(cards.slice(0), get.translation(player) + '发动了【叱吓】');
				while (cards.length > 0) {
					var card = cards.pop();
					var suitx = get.suit(card, false);
					suits.add(suitx);
					if (suit == suitx) {
						evt.baseDamage++;
					}
				}
				game.updateRoundNumber();
			}
			evt._scschihe_player = player;
			var target = trigger.target;
			target.addTempSkill('qmsgswkjsgj_scschihe_block');
			if (!target.storage.qmsgswkjsgj_scschihe_block) {
				target.storage.qmsgswkjsgj_scschihe_block = [];
			}
			target.storage.qmsgswkjsgj_scschihe_block.push([evt.card, suits]);
			lib.skill.qmsgswkjsgj_scschihe.updateBlocker(target);
		},
		updateBlocker(player) {
			var list = [],
				storage = player.storage.qmsgswkjsgj_scschihe_block;
			if (storage && storage.length) {
				for (var i of storage) {
					list.addArray(i[1]);
				}
			}
			player.storage.qmsgswkjsgj_scschihe_blocker = list;
		},
		ai: {
			threaten: 2.5,
		},
		subSkill: {
			block: {
				mod: {
					cardEnabled(card, player) {
						if (!player.storage.qmsgswkjsgj_scschihe_blocker) {
							return;
						}
						var suit = get.suit(card);
						if (suit == 'none' || suit == 'unsure') {
							return;
						}
						var evt = _status.event;
						if (evt.name != 'chooseToUse') {
							evt = evt.getParent('chooseToUse');
						}
						if (!evt || !evt.respondTo || evt.respondTo[1].name != 'sha') {
							return;
						}
						if (player.storage.qmsgswkjsgj_scschihe_blocker.includes(suit)) {
							return false;
						}
					},
				},
				trigger: {
					player: ['damageBefore', 'damageCancelled', 'damageZero'],
					target: ['shaMiss', 'useCardToExcluded', 'useCardToEnd'],
					global: ['useCardEnd'],
				},
				forced: true,
				firstDo: true,
				charlotte: true,
				popup: false,
				onremove(player) {
					delete player.storage.qmsgswkjsgj_scschihe_block;
					delete player.storage.qmsgswkjsgj_scschihe_blocker;
				},
				filter(event, player) {
					const evt = event.getParent('useCard', true, true);
					if (evt && evt.effectedCount < evt.effectCount) {
						return false;
					}
					if (!event.card || !player.storage.qmsgswkjsgj_scschihe_block) {
						return false;
					}
					for (var i of player.storage.qmsgswkjsgj_scschihe_block) {
						if (i[0] == event.card) {
							return true;
						}
					}
					return false;
				},
				content() {
					var storage = player.storage.qmsgswkjsgj_scschihe_block;
					for (var i = 0; i < storage.length; i++) {
						if (storage[i][0] == trigger.card) {
							storage.splice(i--, 1);
						}
					}
					if (!storage.length) {
						player.removeSkill('qmsgswkjsgj_scschihe_block');
					} else {
						lib.skill.scschihe.updateBlocker(target);
					}
				},
			},
		},
	},
	//郭胜
	qmsgswkjsgj_scsniqu: {
		audio: 'scsniqu',
		enable: 'phaseUse',
		usable: 1,
		filterTarget: true,
		selectTarget: 1,
		content() {
			target.damage('fire', 2);
		},
		ai: {
			expose: 0.2,
			order: 5,
			result: {
				target(player, target) {
					return get.damageEffect(target, player, target, 'fire') / 10;
				},
			},
		},
	},
	//高望

	//界沮授

	//缝手杀神华佗
	qmsgswkjsgj_qingnang: {
		audio: 'qingnang',
		enable: 'phaseUse',
		filterCard: false,
		selectCard: -1,
		usable: 1,
		check(card) {
			return 9 - get.value(card);
		},
		filterTarget(card, player, target) {
			if (target.hp >= target.maxHp) {
				return false;
			}
			return true;
		},
		async content(event, trigger, player) {
			event.target.recover();
		},
		ai: {
			order: 9,
			result: {
				target(player, target) {
					if (target.hp == 1) {
						return 5;
					}
					if (player == target && player.countCards('h') > player.hp) {
						return 5;
					}
					return 2;
				},
			},
			threaten: 2,
		},
	},
	qmsgswkjsgj_jijiu: {
		mod: {
			aiValue(player, card, num) {
				if (get.name(card) != 'tao' && get.color(card) != 'red') {
					return;
				}
				const cards = player.getCards('hs', (card) => get.name(card) == 'tao' || get.color(card) == 'red');
				cards.sort((a, b) => (get.name(a) == 'tao' ? 1 : 2) - (get.name(b) == 'tao' ? 1 : 2));
				var geti = () => {
					if (cards.includes(card)) {
						cards.indexOf(card);
					}
					return cards.length;
				};
				return Math.max(num, [6.5, 4, 3, 2][Math.min(geti(), 2)]);
			},
			aiUseful() {
				return lib.skill.kanpo.mod.aiValue.apply(this, arguments);
			},
		},
		locked: false,
		audio: 'jijiu',
		// audioname: ["re_huatuo"],
		// audioname2: { old_huatuo: "jijiu_re_huatuo" },
		enable: 'chooseToUse',
		viewAsFilter(player) {
			return player != _status.currentPhase && player.countCards('hes', { color: 'red' }) > 0;
		},
		filterCard(card) {
			return get.color(card) == 'red';
		},
		position: 'hes',
		viewAs: { name: 'tao' },
		prompt: '将一张红色牌当桃使用',
		check(card) {
			return 15 - get.value(card);
		},
		ai: {
			threaten: 1.5,
		},
		group: 'qmsgswkjsgj_jijiu_tao',
		subSkill: {
			tao: {
				audio: 'qmsgswkjsgj_jijiu',
				trigger: {
					global: 'useCard',
				},
				filter(event, player) {
					return event.card && event.card.name == 'tao' && event.player != player;
				},
				// prompt2:'是否摸一张牌',
				content() {
					player.draw();
				},
			},
		},
	},
	//神华佗
	qmsgswkjsgj_wuling: {
		audio: 'wuling',
		// enable: "phaseUse",
		filter(event, player) {
			return game.hasPlayer((target) => lib.skill.qmsgswkjsgj_wuling.filterTarget(null, player, target));
		},
		getIndex(event, player) {
			return 2;
		},
		trigger: {
			global: 'roundStart',
		},
		cost() {
			event.result = player
				.chooseTarget(`选择一名角色，向其传授“五禽戏”`, 1)
				.set('filterTarget', lib.skill.qmsgswkjsgj_wuling.filterTarget)
				.set('ai', function (target) {
					return get.attitude(player, target);
				})
				.forResult();
		},
		filterTarget(card, player, target) {
			return !target.hasSkill('qmsgswkjsgj_wuling_wuqinxi');
		},
		init(player) {
			var next = game.createEvent('qmsgswkjsgj_wuling_init', false);
			next.player = player;
			next.target = player;
			next.setContent(lib.skill.qmsgswkjsgj_wuling.content);
		},
		// usable: 2,
		prompt: '选择一名角色，向其传授“五禽戏”',
		group: 'qmsgswkjsgj_wuling_die',
		content() {
			var target = target || event.targets[0];
			('step 0');
			target.addAdditionalSkill(`qmsgswkjsgj_wuling_${player.playerid}`, 'qmsgswkjsgj_wuling_wuqinxi');
			var next = player.chooseToMove(`五灵：调整向${get.translation(target)}传授的“五禽戏”顺序`);
			next.set('list', [
				[
					'',
					[
						lib.skill.qmsgswkjsgj_wuling.wuqinxi,
						(item, type, position, noclick, node) => {
							node = ui.create.buttonPresets.vcard(lib.skill.qmsgswkjsgj_wuling.wuqinxiMap2[item][0], type, position, noclick);
							node.node.range.innerHTML = lib.skill.qmsgswkjsgj_wuling.wuqinxiMap2[item][1];
							node.node.range.style.bottom = '2.5px';
							node.node.range.style.width = '100%';
							node.node.range.style.right = '0%';
							node.node.range.style.textAlign = 'center';
							node._link = node.link = [null, null, item];
							node._customintro = [(node) => `五禽戏：${node.link[2]}`, (node) => lib.skill.qmsgswkjsgj_wuling.wuqinxiMap[lib.skill.qmsgswkjsgj_wuling.wuqinxi.indexOf(node.link[2])].slice(2)];
							return node;
						},
					],
				],
			]);
			next.set('processAI', () => {
				const event = get.event().getParent(),
					player = event.player,
					target = event.target;
				const spirits = [];
				let nextPlayer = player;
				do {
					nextPlayer = nextPlayer.getNext();
					if (get.attitude(player, nextPlayer) < 0) {
						spirits.add('熊');
						break;
					}
				} while (nextPlayer != target);
				if (!spirits.length) {
					spirits.add('猿');
				}
				if (
					get.recoverEffect(target, player, player) > 0 ||
					target.hasCard((card) => {
						return (
							get.effect(
								target,
								{
									name: card.viewAs || card.name,
									cards: [card],
								},
								target,
								target,
							) < -1
						);
					}, 'j')
				) {
					spirits.add('鹿');
				}
				const others = lib.skill.qmsgswkjsgj_wuling.wuqinxi.slice().removeArray(spirits);
				do {
					others.randomSort();
				} while (others.length > 1 && others[0] == '鹿');
				return [spirits.concat(others).map((i) => ['', '', i])];
			});
			('step 1');
			var sortedWuqinxi = result.moved[0].map((i) => i[2]);
			game.log(target, '习得的五禽戏顺序为', '#g' + sortedWuqinxi.join('、'));
			sortedWuqinxi.unshift(sortedWuqinxi[0]);
			target.storage.qmsgswkjsgj_wuling_wuqinxi = sortedWuqinxi;
			lib.skill.qmsgswkjsgj_wuling.updateMark(target);
		},
		wuqinxi: ['虎', '鹿', '熊', '猿', '鹤'],
		wuqinxiMap: ['虎：当你使用牌对目标角色造成伤害时，此伤害+1。', '鹿：①当你获得此效果时，你回复2点体力并弃置判定区的所有牌。②你不能成为延时锦囊牌的目标。', '熊：当你受到伤害时，此伤害-1。', '猿：当你获得此效果时，你选择一名其他角色，获得其装备区里的所有牌。', '鹤：当你获得此效果时，你摸五张牌。'],
		wuqinxiMap2: {
			虎: ['qmsgswkjsgj_wuqinxi_hu', '用牌加伤'],
			鹿: ['qmsgswkjsgj_wuqinxi_lu', '弃判定回血'],
			熊: ['qmsgswkjsgj_wuqinxi_xiong', '减伤'],
			猿: ['qmsgswkjsgj_wuqinxi_yuan', '偷装备牌'],
			鹤: ['qmsgswkjsgj_wuqinxi_he', '摸五张牌'],
		},
		updateMark(player) {
			var wuqinxi = player.storage.qmsgswkjsgj_wuling_wuqinxi;
			if (!wuqinxi) {
				return;
			}
			var prevMark = wuqinxi.shift();
			// wuqinxi.push(prevMark);
			var curMark = wuqinxi[0];
			if (!curMark) {
				for (var skill in player.additionalSkills) {
					if (!skill.startsWith('qmsgswkjsgj_wuling_')) {
						continue;
					}
					player.removeAdditionalSkill(skill);
				}
				game.log(player, '完成了五禽戏的操练');
				if (player.hasSkill('qmsgswkjsgj_wuling')) {
					lib.skill.qmsgswkjsgj_wuling.init(player);
				}
				return;
			}
			game.log(player, '获得了', '#g【' + curMark + '】', '标记');
			player.markSkill('qmsgswkjsgj_wuling_wuqinxi');
			game.broadcastAll(
				function (player, curMark) {
					if (player.marks.qmsgswkjsgj_wuling_wuqinxi) {
						player.marks.qmsgswkjsgj_wuling_wuqinxi.firstChild.innerHTML = curMark;
					}
				},
				player,
				curMark,
			);
			var next = game.createEvent('qmsgswkjsgj_wuling_change');
			next.player = player;
			next.setContent('emptyEvent');
		},
		ai: {
			order: 7,
			threaten: 5,
			result: { target: 1 },
		},
		derivation: 'qmsgswkjsgj_wuling_wuqinxi',
		// group:['qmsgswkjsgj_wuling_change'],
		//这玩意没写出来，别加！
		subSkill: {
			wuqinxi: {
				nopop: true,
				charlotte: true,
				intro: {
					markcount: () => 0,
					mark(dialog, storage) {
						const wuqinxiMap = lib.skill.qmsgswkjsgj_wuling.wuqinxiMap;
						const str = `<li>当前效果：${storage[0]}<br><li>${wuqinxiMap.find((str) => storage[0] == str[0]).slice(2)}<br>`;
						dialog.addText(str, false);
						const str2 = '<div class="text center">“五禽戏”顺序：<br>' + storage.join(' ') + '</div>';
						dialog.addText(str2);
						if (storage.length > 1) {
							const str3 = `<div class="text" style="font-size:10px; ">[下一效果] ${wuqinxiMap.find((str) => storage[1] == str[0])}<br></div>`;
							dialog.add(str3);
						}
					},
				},
				mod: {
					targetEnabled(card, player, target) {
						if (get.type(card) == 'delay' && target.storage.qmsgswkjsgj_wuling_wuqinxi && target.storage.qmsgswkjsgj_wuling_wuqinxi[0] == '鹿') {
							return false;
						}
					},
				},
				trigger: {
					source: 'damageBegin1',
					player: ['phaseZhunbeiBegin', 'damageBegin4', 'qmsgswkjsgj_wuling_change'],
				},
				filter(event, player, name) {
					const wuqinxi = player.storage.qmsgswkjsgj_wuling_wuqinxi && player.storage.qmsgswkjsgj_wuling_wuqinxi[0];
					if (!wuqinxi) {
						return false;
					}
					if (event.name == 'phaseZhunbei') {
						return true;
					}
					switch (name) {
						case 'damageBegin1':
							if (wuqinxi != '虎' || !event.card) {
								return false;
							}
							var evt = event.getParent('useCard');
							return evt.targets && /*evt.targets.length == 1 &&*/ evt.targets.includes(event.player);
						case 'damageBegin4':
							return wuqinxi == '熊'; //&& !player.hasSkill("qmsgswkjsgj_wuling_xiong");
						default:
							switch (wuqinxi) {
								case '鹿':
									return player.isDamaged() || player.countCards('j');
								case '鹤':
									return true;
								case '猿':
									return game.hasPlayer((target) => target != player && target.countGainableCards(player, 'e'));
								default:
									return false;
							}
					}
				},
				forced: true,
				onremove: true,
				content() {
					'step 0';
					var wuqinxi = player.storage.qmsgswkjsgj_wuling_wuqinxi[0];
					if (trigger.name == 'phaseZhunbei') {
						lib.skill.qmsgswkjsgj_wuling.updateMark(player);
						event.finish();
					} else {
						var name = event.triggername;
						switch (name) {
							case 'damageBegin1':
								player.line(trigger.player);
								trigger.num++;
								event.finish();
								break;
							case 'damageBegin4':
								// player.addTempSkill("qmsgswkjsgj_wuling_xiong");
								trigger.num--;
								event.finish();
								break;
							default:
								switch (wuqinxi) {
									case '鹿':
										player.recover(2);
										player.discard(player.getCards('j')).discarder = player;
										event.finish();
										break;
									case '鹤':
										player.draw(5);
										event.finish();
										break;
									case '猿':
										player
											.chooseTarget('五禽戏：获得一名其他角色装备区里的所有装备牌', function (card, player, target) {
												return target != player && target.countGainableCards(player, 'e');
											})
											.set('ai', function (target) {
												var player = _status.event.player;
												var att = get.attitude(player, target),
													eff = 0;
												target.getCards('e', function (card) {
													var val = get.value(card, target);
													eff = Math.max(eff, -val * att);
												});
												return eff;
											});
										break;
								}
								break;
						}
					}
					('step 1');
					if (result.bool) {
						var target = result.targets[0];
						player.line(target, 'green');
						player.gainPlayerCard(target, 'e', target.countCards('e'), true);
					}
				},
				ai: {
					effect: {
						target(card, player, target) {
							const wuqinxi = target.storage.qmsgswkjsgj_wuling_wuqinxi;
							if (!wuqinxi || !wuqinxi.length) {
								return;
							}
							const curWuqinxi = wuqinxi[0];
							const nextWuqinxi = wuqinxi[1];
							if (nextWuqinxi == '鹿' && get.type(card) == 'delay') {
								return 'zerotarget';
							}
							if (curWuqinxi != '熊' || player.hasSkill('qmsgswkjsgj_wuling_xiong')) {
								return;
							}
							if (player.hasSkillTag('jueqing', false, target)) {
								return;
							}
							var num = get.tag(card, 'damage');
							if (num) {
								if (num > 1) {
									return 0.5;
								}
								return 0;
							}
						},
					},
				},
			},
			xiong: { charlotte: true },
			die: {
				trigger: { player: 'die' },
				filter(event, player) {
					return game.hasPlayer((current) => current.additionalSkills[`qmsgswkjsgj_wuling_${player.playerid}`]);
				},
				forced: true,
				locked: false,
				forceDie: true,
				content() {
					var targets = game.filterPlayer((current) => {
						return current.additionalSkills[`qmsgswkjsgj_wuling_${player.playerid}`];
					});
					player.line(targets);
					targets.forEach((current) => current.removeAdditionalSkill(`qmsgswkjsgj_wuling_${player.playerid}`));
				},
			},
			//这玩意没写出来，别加！
			change: {
				audio: 'qmsgswkjsgj_wuling',
				enable: 'phaseUse',
				filter(event, player) {
					return true;
				},
				filterTarget(card, player, target) {
					return target.storage.qmsgswkjsgj_wuling_wuqinxi && target.storage.qmsgswkjsgj_wuling_wuqinxi.length > 1;
				},
			},
		},
	},
	//孟婆
	// qmsgswkjsgj_aotang:{
	// 	audio: 'ext:夜白神略/audio/character:1',
	// 	// master:['boss_mengpo','qmsgswkjsgj_mengpo'],
	// 	master:['孟婆'],
	// 	trigger:{
	// 		player:'phaseBegin',
	// 	},
	// 	filter(event,player){
	// 		var namex = lib.skill.qmsgswkjsgj_aotang.master;
	// 		const names = get
	// 				.characterSurname(player.name)
	// 				.map(info => info.join(""))
	// 				.concat([get.rawName(player.name)]);
	// 		if(!names)return false;
	// 		return game.countPlayer(current=>player.getEnemies().includes(current))>0
	// 	},
	// 	forced:true,
	// 	locked:false,
	// 	content(){
	// 		var list = game.filterPlayer(function (current) {
	// 			return current != player&&player.getEnemies().includes(current);
	// 		});
	// 		if (list.length) {
	// 			var target = list.randomGet();
	// 			player.line(target);
	// 			var skills = game.filterSkills(
	// 				target.getStockSkills(true, true).filter(skill => {
	// 					const info = get.info(skill);
	// 					return !info.persevereSkill || !info.charlotte;
	// 				}),
	// 				target
	// 			);
	// 			target.disableSkill("qmsgswkjsgj_aotang", skills);
	// 			target.addTempSkill("qmsgswkjsgj_aotang_restore");

	// 		}
	// 	},
	// },
	qmsgswkjsgj_yunju: {
		audio: 'boss_yunjv',
		trigger: {
			global: 'phaseEnd',
		},
		forced: true,
		filter(event, player) {
			return player.getEnemies().includes(event.player) && event.player.countCards('he') > 0 && event.player != player;
		},
		logTarget: 'player',
		content() {
			if (trigger.player.countCards('h') > 0) {
				var card1 = trigger.player.getCards('h').randomGet();
				trigger.player.discard(card1);
			}
		},
		ai: {
			expose: 0.2,
		},
	},
	//神孙笨
	qmsgswkjsgj_yingba: {
		audio: 'yingba',
		mod: {
			aiOrder(player, card, num) {
				if (num > 0 && _status.event && _status.event.type == 'phase' && get.tag(card, 'recover')) {
					if (player.needsToDiscard()) {
						return num / 3;
					}
					return 0;
				}
			},
			targetInRange(card, player, target) {
				if (target.hasMark('yingba_mark')) {
					return true;
				}
			},
			cardUsableTarget(card, player, target) {
				if (target.hasMark('yingba_mark')) {
					return true;
				}
			},
		},
		enable: 'phaseUse',
		usable: 2,
		filter: (event, player) => game.hasPlayer((current) => current != player),
		filterTarget: (card, player, target) => target != player,
		content() {
			'step 0';
			target.loseMaxHp();
			('step 1');
			if (target.isIn()) {
				target.addMark('yingba_mark', 1);
			}
			player.loseMaxHp();
		},
		locked: false,
		//global:'yingba_mark',
		ai: {
			threaten(player, target) {
				if (player === target || player.isDamaged() || get.attitude(player, target) > 0) {
					return 1;
				}
				return 8 / player.maxHp;
			},
			order: 11,
			result: {
				player(player, target) {
					if (player.maxHp == 1) {
						return -2.5;
					}
					return -0.25;
				},
				target(player, target) {
					if (target.isHealthy()) {
						return -2;
					}
					if (!target.hasMark('yingba_mark')) {
						return -1;
					}
					return -0.2;
				},
			},
		},
		subSkill: {
			mark: {
				marktext: '定',
				intro: {
					name: '平定',
					content: 'mark',
					onunmark: true,
				},
				mod: {
					maxHandcard(player, numx) {
						var num = player.countMark('yingba_mark');
						if (num) {
							return (
								numx +
								num *
									game.countPlayer(function (current) {
										return current.hasSkill('qmsgswkjsgj_yingba');
									})
							);
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_scfuhai: {
		audio: 'scfuhai',
		trigger: { player: 'useCardToPlayered' },
		forced: true,
		filter(event, player) {
			return event.target && event.target.hasMark('yingba_mark');
		},
		logTarget: 'target',
		content() {
			trigger.directHit.add(trigger.target);
			player.draw();
		},
		group: ['qmsgswkjsgj_scfuhai_die', 'qmsgswkjsgj_scfuhai_usea'],
		ai: {
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				return arg && arg.target && arg.target.hasMark('yingba_mark');
			},
			combo: 'qmsgswkjsgj_yingba',
		},
		subSkill: {
			usea: {
				audio: 'qmsgswkjsgj_scfuhai',
				trigger: { player: 'useCardAfter' },
				// forced: true,
				prompt: '是否移除其“平定”标记，并恢复X点体力上限',
				filter(event, player) {
					return lib.skill.qmsgswkjsgj_scfuhai_usea.logTarget(event, player).length > 0;
				},
				logTarget(event, player) {
					return event.targets.filter(function (i) {
						return i.hasMark('yingba_mark');
					});
				},
				content() {
					var num = 0;
					for (var i of trigger.targets) {
						var numx = i.countMark('yingba_mark');
						if (numx) {
							num += numx;
							i.removeMark('yingba_mark', numx);
						}
					}
					if (num) {
						player.gainMaxHp(num);
					}
				},
			},
			die: {
				audio: 'qmsgswkjsgj_scfuhai',
				trigger: { global: 'die' },
				forced: true,
				filter(event, player) {
					return event.player.countMark('yingba_mark') > 0;
				},
				content() {
					player.gainMaxHp(trigger.player.countMark('yingba_mark'));
					player.draw(trigger.player.countMark('yingba_mark'));
				},
			},
		},
	},
	qmsgswkjsgj_pinghe: {
		audio: 'pinghe',
		mod: {
			maxHandcardBase(player) {
				return player.getDamagedHp() + 3;
			},
		},
		trigger: { player: 'damageBegin2' },
		forced: true,
		filter(event, player) {
			return event.source && event.source != player && player.maxHp > 1 && player.countCards('h') > 0;
		},
		content() {
			'step 0';
			trigger.cancel();
			player.loseMaxHp();
			('step 1');
			player.chooseCardTarget({
				prompt: '请选择【冯河】的牌和目标',
				prompt2: '将一张手牌交给一名其他角色并防止伤害' + (player.hasSkill('qmsgswkjsgj_yingba') ? '，然后令伤害来源获得一个“平定”标记' : ''),
				filterCard: true,
				// forced: true,
				filterTarget: lib.filter.notMe,
				ai1(card) {
					if (
						get.tag(card, 'recover') &&
						!game.hasPlayer(function (current) {
							return get.attitude(current, player) > 0 && !current.hasSkillTag('nogain');
						})
					) {
						return 0;
					}
					return 1 / Math.max(0.1, get.value(card));
				},
				ai2(target) {
					var player = _status.event.player,
						att = get.attitude(player, target);
					if (target.hasSkillTag('nogain')) {
						att /= 9;
					}
					return 4 + att;
				},
			});
			('step 2');
			if (result.bool) {
				var target = result.targets[0];
				//player.logSkill('qmsgswkjsgj_pinghe',target);
				player.line(target, 'green');
				player.give(result.cards, target);
			}
			('step 3');
			if (player.hasSkill('qmsgswkjsgj_yingba')) {
				trigger.source.addMark('yingba_mark', 1);
			}
		},
		ai: {
			maixie_defend: true,
			effect: {
				target(card, player, target) {
					if (player !== target && target.maxHp > 1 && target.countCards('h') > 0) {
						if (get.tag(card, 'damage') && target.hasSkill('qmsgswkjsgj_yingba')) {
							let damage = 1.6;
							if (target.isHealthy()) {
								damage += 1.6;
							}
							if (
								game.hasPlayer((cur) => {
									return cur !== target && get.attitude(target, cur) > 0;
								})
							) {
								damage -= 0.9;
							}
							return [0, -damage, 0, -0.4];
						}
						if (card.name === 'tiesuo') {
							return 0.4;
						}
					}
					if (get.tag(card, 'recover') && _status.event.type == 'phase' && !player.needsToDiscard()) {
						return 0;
					}
				},
			},
		},
	},
	// qmsgswkjsgj_shenjiang_audio:{
	// 	audio:'jiang_re_sunben',
	// },
	qmsgswkjsgj_shenhunzi: {
		audio: 'rehunzi',
		// trigger: { player: "phaseBegin" },
		// filter(event, player) {
		// 	return player.countCards("h") > 0;
		// },
		trigger: {
			global: 'phaseBefore',
			player: 'enterGame',
		},
		forced: true,
		filter(event, player) {
			return event.name != 'phase' || game.phaseNumber == 0;
		},
		content() {
			player.addSkills(['qmsgswkjsgj_shenyingzi', 'qmsgswkjsgj_shenyinghun']);
		},
		derivation: ['qmsgswkjsgj_shenyingzi', 'qmsgswkjsgj_shenyinghun'],
		ai: {
			threaten: 1.5,
			expose: 0.2,
		},
		// subSkill:{
		// 	audio:{
		// 		audio:'reyingzi_re_sunben',
		// 	}
		// },
	},
	qmsgswkjsgj_shenyingzi: {
		audio: 'reyingzi',
		trigger: { player: 'phaseDrawBegin2' },
		forced: true,
		preHidden: true,
		filter(event, player) {
			return !event.numFixed;
		},
		content() {
			trigger.num++;
		},
		ai: {
			threaten: 1.5,
		},
	},
	qmsgswkjsgj_shenyinghun: {
		audio: 'yinghun',
		mod: {
			aiOrder(player, card, num) {
				if (num > 0 && _status.event && _status.event.type == 'phase' && get.tag(card, 'recover')) {
					if (player.needsToDiscard()) {
						return num / 3;
					}
					return 0;
				}
			},
		},
		locked: false,
		trigger: { player: 'phaseZhunbeiBegin' },
		preHidden: true,
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill), function (card, player, target) {
					return player != target;
				})
				.set('ai', function (target) {
					const player = _status.event.player;
					// if (player.getDamagedHp() == 1 && target.countCards("he") == 0) {
					// 	return 0;
					// }
					if (get.attitude(_status.event.player, target) > 0) {
						return 10 + get.attitude(_status.event.player, target);
					}
					// if (player.getDamagedHp() == 1) {
					// 	return -1;
					// }
					return 1;
				})
				.setHiddenSkill(event.name.slice(0, -5))
				.forResult();
		},
		async content(event, trigger, player) {
			const num = player.getDamagedHp();
			const [target] = event.targets;
			let directcontrol = num == 1;
			if (!directcontrol) {
				const str1 = '摸' + get.cnNumber(num, true);
				const str2 = '弃' + get.cnNumber(num, true);
				directcontrol =
					str1 ==
					(
						await player
							.chooseControl(str1, str2, function (event, player) {
								if (player.isHealthy()) {
									return 1 - _status.event.choice;
								}
								return _status.event.choice;
							})
							.set('choice', get.attitude(player, target) > 0 ? 0 : 1)
							.forResult()
					).control;
			}
			if (directcontrol) {
				if (num > 0) {
					await target.draw(num);
				}
				// await target.chooseToDiscard(true, "he");
			} else {
				// await target.draw();
				if (num > 0) {
					await target.chooseToDiscard(num, true, 'he', 'allowChooseAll');
				}
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (
						get.tag(card, 'damage') &&
						get.itemtype(player) === 'player' &&
						target.hp >
							(player.hasSkillTag('damageBonus', true, {
								target: target,
								card: card,
							})
								? 2
								: 1)
					) {
						return [1, 0.5];
					}
				},
			},
			threaten(player, target) {
				return Math.max(0.5, target.getDamagedHp() / 2);
			},
			maixie: true,
		},
	},

	//界势陆郁生
	qmsgswkjsgj_mbrunwei: {
		audio: 'mbrunwei',
		logAudio: (index) => (typeof index === 'number' ? 'mbrunwei' + index + '.mp3' : 2),
		enable: 'phaseUse',
		usable: 1,
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog(get.prompt2('qmsgswkjsgj_mbrunwei'));
			},
			chooseControl(event, player) {
				return [1, 2, 3, 4, 5, 'cancel2'];
			},
			check() {
				return 4;
			},
			backup(result, player) {
				return {
					num: result.control,
					log: false,
					delay: false,
					async content(event, trigger, player) {
						const num = lib.skill.qmsgswkjsgj_mbrunwei_backup.num,
							skill = 'qmsgswkjsgj_mbrunwei';
						const cards = get.cards(num, true);
						player.logSkill('qmsgswkjsgj_mbrunwei', null, null, null, [get.rand(1, 2)]);
						await player.showCards(cards, `${get.translation(player)}发动了〖${get.translation(skill)}〗`);
						const used = player.hasSkill(skill + '_twice');
						// if (
						// 	used &&
						// 	!game.hasPlayer(target => {
						// 		return !target.hasHistory("gain", evt => evt.cards?.length);
						// 	})
						// ) {
						// 	return;
						// }
						const red = cards.filter((card) => get.color(card, false) == 'red'),
							black = cards.filter((card) => get.color(card, false) == 'black');
						const list = get.addNewRowList(cards, 'color');
						const result = await player
							.chooseButtonTarget({
								createDialog: [[[[`润微：选择一名角色令其获得其中一种颜色的牌`], 'addNewRow'], list.map((item) => [Array.isArray(item) ? item : [item], 'addNewRow'])]],
								css: {
									position: 'absolute',
									top: get.is.phoneLayout() ? '35%' : '45%',
								},
								forced: true,
								used: used,
								targetsx: game.filterPlayer((target) => !target.hasHistory('gain', (evt) => evt.cards?.length)),
								filterButton(button) {
									return button.links.length;
								},
								filterTarget(card, player, target) {
									// if (get.event().used) {
									// 	return get.event().targetsx?.includes(target);
									// }
									return true;
								},
								ai1(button) {
									return button.links.length;
								},
								ai2(target) {
									const player = get.player();
									if (!get.event().used && player == target) {
										return 114514;
									}
									return get.attitude(player, target);
								},
							})
							.forResult();
						if (result?.links && result?.targets) {
							const target = result.targets[0],
								gain = result.links[0] == 'black' ? black : red;
							player.line(target);
							if (!player.hasSkill(skill + '_twice')) {
								player.addTempSkill(skill + '_twice', 'phaseChange');
							}
							player.addMark(skill + '_twice', gain.length, false);
							player.addTip(skill + '_twice', `润微  ${gain.length}`);
							let gaintag = [];
							if (player == target) {
								gaintag = ['qmsgswkjsgj_mbrunwei'];
								player
									.when({ player: 'phaseUseEnd' })
									.filter((evt) => event.getParent('phaseUse') == evt)
									.then(() => {
										// const cards = player.getCards("h", card => card.hasGaintag("qmsgswkjsgj_mbrunwei"));
										// if (cards.length) {
										player.logSkill('qmsgswkjsgj_mbrunwei', null, null, null, [4]);
										// 	player.modedDiscard(cards).set("discarder", player);
										// }
									});
							}
							const next = target.gain(gain, 'gain2');
							next.gaintag.addArray(gaintag);
							await next;
						}
					},
				};
			},
		},
		ai: {
			order: 10,
			result: {
				player(player) {
					// const used = player.hasSkill("qmsgswkjsgj_mbrunwei_twice");
					// if (!used) {
					// 	return 1;
					// } else if (
					// 	game.hasPlayer(target => {
					// 		return !target.hasHistory("gain", evt => evt.cards.length) && get.attitude(player, target) > 0;
					// 	})
					// ) {
					// 	return 1;
					// }
					// return 0;
					return 1;
				},
			},
		},
		subSkill: {
			twice: {
				onremove(player, skill) {
					delete player.storage[skill];
					player.removeTip(skill);
				},
				intro: {
					markcount: 'mark',
					content: '再失去#张牌重置技能',
				},
				trigger: {
					player: 'loseAfter',
					global: ['loseAsyncAfter', 'equipAfter', 'gainAfter', 'addToExpansionAfter', 'addJudgeAfter'],
				},
				filter(event, player) {
					return event.getl(player)?.cards2?.length && player.hasMark('qmsgswkjsgj_mbrunwei_twice');
				},
				silent: true,
				content() {
					const num = trigger.getl(player)?.cards2?.length;
					if (num >= player.countMark(event.name)) {
						player.logSkill('qmsgswkjsgj_mbrunwei', null, null, null, [3]);
						get.info(event.name).onremove(player, event.name);
						player.unmarkSkill(event.name);
						delete player.getStat().skill.qmsgswkjsgj_mbrunwei;
						game.log(player, '重置了', `#g【${get.translation(event.name)}】`);
					} else {
						player.removeMark(event.name, num, false);
						player.addTip(event.name, `润微  ${player.countMark(event.name)}`);
					}
				},
			},
		},
	},
	qmsgswkjsgj_mbshuanghuai: {
		audio: 'mbshuanghuai',
		logAudio: (index) => (typeof index === 'number' ? 'mbshuanghuai' + index + '.mp3' : 3),
		init(player, skill) {
			const history = player.getAllHistory('useSkill', (evt) => evt.skill == skill && evt.targets);
			if (history.length) {
				const target = history[history.length - 1].targets[0];
				if (target) {
					player.storage[skill] = target;
					player.markSkill(skill);
					player.addTip(skill, `霜怀 ${get.translation(target)}`);
				}
			}
		},
		onremove(player, skill) {
			delete player.storage[skill];
			player.removeTip(skill);
		},
		trigger: { global: 'damageBegin4' },
		usable: 1,
		filter(event, player) {
			return get.distance(player, event.player) <= 1;
		},
		popup: false,
		logTarget: 'player',
		async cost(event, trigger, player) {
			const result = await player
				.chooseButton([
					get.prompt2(event.skill, trigger.player),
					[
						[
							['cancel', `防止此伤害`],
							['tao', `令其从弃牌堆获得一张【桃】`],
						],
						'textbutton',
					],
				])
				.set('filterButton', (button) => {
					return get.event().links.includes(button.link);
				})
				.set(
					'links',
					['cancel', 'tao'].filter((link) => {
						if (link == 'tao') {
							const card = get.discardPile((cardx) => cardx.name == 'tao');
							if (!card) {
								return false;
							}
						}
						return true;
					}),
				)
				.set('ai', (button) => {
					const trigger = get.event().getTrigger(),
						eff = get.damageEffect(trigger.player, trigger.source, get.player());
					if (eff > 0) {
						return 0;
					}
					if (trigger.player.hasSkillTag('maixie') && trigger.num === 1 && button.link == 'tao') {
						return 1 + Math.random();
					}
					return Math.random();
				})
				.forResult();
			if (result.bool) {
				event.result = {
					bool: true,
					cost_data: result.links[0],
				};
			}
		},
		async content(event, trigger, player) {
			const link = event.cost_data,
				target = trigger.player,
				last = player.storage[event.name];
			player.logSkill('qmsgswkjsgj_mbshuanghuai', target, null, null, [link == 'cancel' ? 1 : 2]);
			if (link == 'cancel') {
				trigger.cancel();
			} else {
				const card = get.discardPile('tao');
				if (card) {
					await target.gain(card, 'gain2');
				}
			}
			if (last && last == target) {
				await game.asyncDraw([player, target]);
				return;
			}
			// if (last && last != target) {
			// 	player.logSkill("qmsgswkjsgj_mbshuanghuai", null, null, null, [3]);
			// 	await player.loseHp();
			// }
			player.storage[event.name] = target;
			player.markSkill(event.name);
			player.addTip(event.name, `霜怀 ${get.translation(target)}`);
		},
		intro: {
			content: 'player',
			markcount: () => 0,
		},
	},
	qmsgswkjsgj_mbshuanghuaiplus: {
		audio: 'mbshuanghuai',
		logAudio: (index) => (typeof index === 'number' ? 'mbshuanghuai' + index + '.mp3' : 3),
		init(player, skill) {
			const history = player.getAllHistory('useSkill', (evt) => evt.skill == skill && evt.targets);
			if (history.length) {
				const target = history[history.length - 1].targets[0];
				if (target) {
					player.storage[skill] = target;
					player.markSkill(skill);
					player.addTip(skill, `霜怀 ${get.translation(target)}`);
				}
			}
		},
		onremove(player, skill) {
			delete player.storage[skill];
			player.removeTip(skill);
		},
		trigger: { global: 'damageBegin4' },
		usable: 1,
		filter(event, player) {
			// return get.distance(player, event.player) <= 1;
			return true;
		},
		popup: false,
		logTarget: 'player',
		async cost(event, trigger, player) {
			const result = await player
				.chooseButton([
					get.prompt2(event.skill, trigger.player),
					[
						[
							['cancel', `防止此伤害`],
							['tao', `令其从弃牌堆获得一张【桃】`],
						],
						'textbutton',
					],
				])
				.set('filterButton', (button) => {
					return get.event().links.includes(button.link);
				})
				.set(
					'links',
					['cancel', 'tao'].filter((link) => {
						if (link == 'tao') {
							const card = get.discardPile((cardx) => cardx.name == 'tao');
							if (!card) {
								return false;
							}
						}
						return true;
					}),
				)
				.set('ai', (button) => {
					const trigger = get.event().getTrigger(),
						eff = get.damageEffect(trigger.player, trigger.source, get.player());
					if (eff > 0) {
						return 0;
					}
					if (trigger.player.hasSkillTag('maixie') && trigger.num === 1 && button.link == 'tao') {
						return 1 + Math.random();
					}
					return Math.random();
				})
				.forResult();
			if (result.bool) {
				event.result = {
					bool: true,
					cost_data: result.links[0],
				};
			}
		},
		async content(event, trigger, player) {
			const link = event.cost_data,
				target = trigger.player,
				last = player.storage[event.name];
			player.logSkill('qmsgswkjsgj_mbshuanghuaiplus', target, null, null, [link == 'cancel' ? 1 : 2]);
			if (link == 'cancel') {
				trigger.cancel();
			} else {
				const card = get.discardPile('tao');
				if (card) {
					await target.gain(card, 'gain2');
				}
			}
			if (last && last == target) {
				await game.asyncDraw([player, target]);
				return;
			}
			// if (last && last != target) {
			// 	player.logSkill("qmsgswkjsgj_mbshuanghuaiplus", null, null, null, [3]);
			// 	await player.loseHp();
			// }
			player.storage[event.name] = target;
			player.markSkill(event.name);
			player.addTip(event.name, `霜怀 ${get.translation(target)}`);
		},
		intro: {
			content: 'player',
			markcount: () => 0,
		},
	},
	//势魏延
	qmsgswkjsgj_potzhongao: {
		audio: 'potzhongao',
		dutySkill: true,
		derivation: ['qmsgswkjsgj_potkuanggu', 'qmsgswkjsgj_potkuanggu_pot_weiyan_achieve', 'kunfenx'],
		group: ['qmsgswkjsgj_potzhongao_start', 'qmsgswkjsgj_potzhongao_achieve', 'qmsgswkjsgj_potzhongao_fail'],
		subSkill: {
			start: {
				audio: 'potzhongao1.mp3',
				trigger: {
					global: 'phaseBefore',
					player: 'enterGame',
				},
				filter(event, player) {
					return event.name != 'phase' || game.phaseNumber == 0;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					await player.addSkills('qmsgswkjsgj_potkuanggu');
				},
			},
			achieve: {
				audio: ['potzhongao2.mp3', 'potzhongao3.mp3'],
				trigger: {
					source: 'dieAfter',
				},
				forced: true,
				locked: false,
				skillAnimation: true,
				animationColor: 'fire',
				async content(event, trigger, player) {
					await player.awakenSkill(event.name.slice(0, -8));
					game.log(player, '成功完成使命');
					// await player.changeSkin({ characterName: "qmsgswkjsgj_pot_weiyan" }, "qmsgswkjsgj_pot_weiyan_achieve");
					player.changeSkin('qmsgswkjsgj_potzhongao', 'qmsgswkjsgj_pot_weiyan_achieve');
					game.broadcastAll(() => {
						_status.tempMusic = 'effect_yinzhanBGM';
						game.playBackgroundMusic();
					});
					await player.setStorage('potkuanggu', 1);
					const num1 = player.countMark('qmsgswkjsgj_potzhuangshi_limit'),
						num2 = player.countMark('qmsgswkjsgj_potzhuangshi_directHit');
					if (num1 > 0) {
						await player.draw();
					}
					if (num2 > 0) {
						if (!player.isDamaged()) {
							await player.draw();
						} else {
							await player.recover();
						}
					}
				},
			},
			fail: {
				audio: ['potzhongao4.mp3', 'potzhongao5.mp3'],
				trigger: {
					player: ['dying', 'phaseUseBegin'],
				},
				filter(event, player) {
					return event.name == 'dying' || !event.usedZhuangshi;
				},
				lastDo: true,
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					player.awakenSkill(event.name.slice(0, -5));
					game.log(player, '使命失败');
					// player.changeSkin({ characterName: "qmsgswkjsgj_pot_weiyan" }, "qmsgswkjsgj_pot_weiyan_fail");
					player.changeSkin('qmsgswkjsgj_potzhongao', 'qmsgswkjsgj_pot_weiyan_fail');
					game.broadcastAll(() => {
						_status.tempMusic = 'effect_tuishouBGM';
						game.playBackgroundMusic();
					});
					player.storage.kunfen = true;
					await player.changeSkills(['kunfen'], ['qmsgswkjsgj_potzhuangshi']);
				},
			},
		},
	},
	qmsgswkjsgj_potzhuangshi: {
		audio: 'potzhuangshi',
		audioname: ['pot_weiyan_achieve'],
		trigger: {
			player: 'phaseUseBegin',
		},
		async cost(event, trigger, player) {
			const { bool: bool1, cards } = await player
				.chooseToDiscard(get.prompt(event.skill), [0, Infinity], 'h', 'allowChooseAll')
				.set('prompt2', '弃置任意张手牌，令你此阶段使用的前等量+1张牌无距离限制且不可被响应')
				.set('ai', (card) => {
					const player = get.player();
					let num = Math.floor(player.countCards('h') / 2);
					if (!game.hasPlayer((current) => get.attitude(player, current) < 0)) {
						num = 1;
					}
					if (ui.selected.cards.length < num && card.name != 'du') {
						if (get.tag(card, 'damage')) {
							return 0.1 - ui.selected.cards.length;
						}
						return 7 - get.value(card);
					}
					return 0;
				})
				.set('chooseonly', true)
				.forResult();
			if (bool1 && cards.length) {
				game.broadcastAll((cards) => {
					cards.forEach((card) => card.addGaintag('qmsgswkjsgj_potzhuangshi_tag'));
				}, cards);
			}
			const { bool: bool2, numbers } = await player
				.chooseNumbers(get.prompt(event.skill), [
					{
						prompt: '失去任意点体力值，令你此阶段使用的前等量+1张牌不计入次数限制',
						min: 0,
						max: player.getHp(),
					},
				])
				.set('processAI', () => {
					const player = get.player();
					if (player.hp < 2 || !game.hasPlayer((current) => get.attitude(player, current) < 0)) {
						return false;
					}
					let num = Math.min(Math.floor(player.countCards('h') / 2), player.hp - 1);
					return [num];
				})
				.forResult();
			event.result = {
				bool: bool1 || bool2,
				cards: cards,
				cost_data: numbers,
			};
			player.removeGaintag('qmsgswkjsgj_potzhuangshi_tag');
		},
		async content(event, trigger, player) {
			trigger.set('usedZhuangshi', true);
			const { cards, cost_data: numbers } = event;
			if (cards) {
				const number = cards.length + 1;
				player.addTempSkill('qmsgswkjsgj_potzhuangshi_directHit', 'phaseChange');
				player.addMark('qmsgswkjsgj_potzhuangshi_directHit', number, false);
				player.addTip('qmsgswkjsgj_potzhuangshi_directHit', `不可响应 ${number}`);
			}
			if (numbers) {
				const number = numbers[0] + 1;
				player.addTempSkill('qmsgswkjsgj_potzhuangshi_limit', 'phaseChange');
				player.addMark('qmsgswkjsgj_potzhuangshi_limit', number, false);
				player.addTip('qmsgswkjsgj_potzhuangshi_limit', `不计次数 ${number}`);
			}
			if (cards && cards.length) {
				await player.modedDiscard(cards);
			}
			if (numbers && numbers[0] >= 0) {
				const number = numbers[0];
				await player.loseHp(number);
			}
		},
		onremove(player) {
			player.removeSkill('qmsgswkjsgj_potzhuangshi_directHit');
			player.removeSkill('qmsgswkjsgj_potzhuangshi_limit');
		},
		subSkill: {
			limit: {
				trigger: {
					player: 'useCard0',
				},
				charlotte: true,
				filter(event, player) {
					return player.hasMark('qmsgswkjsgj_potzhuangshi_limit');
				},
				forced: true,
				popup: false,
				firstDo: true,
				async content(event, trigger, player) {
					if (trigger.addCount !== false) {
						trigger.addCount = false;
						const stat = player.getStat().card,
							name = trigger.card.name;
						if (typeof stat[name] == 'number') {
							stat[name]--;
						}
					}
					player.removeMark('qmsgswkjsgj_potzhuangshi_limit', 1, false);
					const num = player.countMark('qmsgswkjsgj_potzhuangshi_limit');
					if (num > 0) {
						player.addTip('qmsgswkjsgj_potzhuangshi_limit', `不计次数 ${num}`);
					} else {
						player.removeTip('qmsgswkjsgj_potzhuangshi_limit');
					}
				},
				onremove(player, skill) {
					player.clearMark(skill, false);
					player.removeTip(skill);
				},
				ai: {
					presha: true,
					skillTagFilter(player, tag, arg) {
						if (!player.hasMark('qmsgswkjsgj_potzhuangshi_limit')) {
							return false;
						}
					},
				},
			},
			directHit: {
				trigger: {
					player: 'useCard0',
				},
				charlotte: true,
				filter(event, player) {
					return player.hasMark('qmsgswkjsgj_potzhuangshi_directHit');
				},
				forced: true,
				popup: false,
				firstDo: true,
				async content(event, trigger, player) {
					trigger.directHit.addArray(game.players);
					player.removeMark('qmsgswkjsgj_potzhuangshi_directHit', 1, false);
					const num = player.countMark('qmsgswkjsgj_potzhuangshi_directHit');
					if (num > 0) {
						player.addTip('qmsgswkjsgj_potzhuangshi_directHit', `不可响应 ${num}`);
					} else {
						player.removeTip('qmsgswkjsgj_potzhuangshi_directHit');
					}
				},
				onremove(player, skill) {
					player.clearMark(skill, false);
					player.removeTip(skill);
				},
				mod: {
					targetInRange(card, player) {
						if (player.hasMark('qmsgswkjsgj_potzhuangshi_directHit')) {
							return true;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_potyinzhan: {
		audio: 'potyinzhan',
		audioname: ['pot_weiyan_achieve', 'pot_weiyan_fail'],
		trigger: {
			source: 'damageBegin1',
		},
		forced: true,
		filter(event, player) {
			// if (event.card?.name != "sha") {
			// 	return false;
			// }
			const target = event.player;
			if (player.hp <= target.hp || player.countCards('he') <= target.countCards('he')) {
				return true;
			}
			return false;
		},
		logTarget: 'player',
		popup: false,
		logAudio: (player, indexedData) => 'potyinzhan' + (lib.skill.qmsgswkjsgj_potyinzhan.audioname.includes('qmsgswkjsgj_' + player.skin.name) ? '_' + player.skin.name : '') + (indexedData ? indexedData : get.rand(1, 2)) + '.mp3',
		async content(event, trigger, player) {
			const target = trigger.player,
				bool1 = target.hp >= player.hp,
				bool2 = target.countCards('he') >= player.countCards('he');
			player.logSkill('qmsgswkjsgj_potyinzhan', null, null, null, [player, bool1 && bool2 ? 3 : get.rand(1, 2)]);
			if (bool1) {
				trigger.num++;
			}
			if (bool2) {
				if (bool1) {
					player.popup('乘势', 'fire');
				}
				player
					.when('useCardAfter')
					.filter((evt) => evt == trigger.getParent(2))
					.step(async (event, trigger, player) => {
						let result;
						if (target.isIn() && target.countDiscardableCards(player, 'he')) {
							result = await player.discardPlayerCard(target, 'he', true).forResult();
						}
						if (bool1) {
							await player.recover();
							if (result?.cards?.length) {
								await player.gain(result.cards.filterInD('od'), 'gain2');
							}
						}
					});
			}
		},
	},
	qmsgswkjsgj_potkuanggu: {
		audio: 'potkuanggu',
		audioname: ['pot_weiyan_fail'],
		audioname2: {
			pot_weiyan_achieve: 'potkuanggu_pot_weiyan_achieve',
		},
		trigger: {
			source: 'damageSource',
		},
		filter(event, player) {
			return event.num > 0;
		},
		getIndex(event, player) {
			return event.num;
		},
		frequent: true,
		popup: false,
		logAudio: (player, indexedData) => 'potkuanggu' + (lib.skill.potkuanggu.audioname.includes(player.skin.name) ? '_' + player.skin.name : '') + (indexedData ? indexedData : get.rand(1, 2)) + '.mp3',
		logAudio2: {
			pot_weiyan_achieve: (player, indexedData) => 'potkuanggu_pot_weiyan_achieve' + (indexedData ? indexedData : get.rand(1, 2)) + '.mp3',
		},
		async cost(event, trigger, player) {
			let choice,
				list = ['draw_card'],
				choiceList = ['选项一：回复1点体力', '选项二：摸一张牌'];
			if (player.getStorage('potkuanggu', 0) && player.countCards('he')) {
				list.push('背水！');
				choiceList.push('背水：弃置一张牌并令你本阶段使用【杀】的次数+1');
			}
			if (player.isDamaged()) {
				list.unshift('recover_hp');
			} else {
				choiceList[0] = `<span class = 'transparent'>${choiceList[0]}</span>`;
			}
			if (list.length == 1) {
				event.result = await player.chooseBool(get.prompt('potkuanggu'), '摸一张牌').set('frequentSkill', 'potkuanggu').forResult();
				event.result.cost_data = 'draw_card';
			} else {
				list.push('cancel2');
				if (
					player.isDamaged() &&
					get.recoverEffect(player) > 0 &&
					player.countCards('hs', function (card) {
						return card.name == 'sha' && player.hasValueTarget(card);
					}) >= player.getCardUsable('sha')
				) {
					if (player.countCards('he') > 1 && list.includes('背水！')) {
						choice = '背水！';
					} else {
						choice = 'recover_hp';
					}
				} else {
					choice = 'draw_card';
				}
				const { control } = await player
					.chooseControl(list)
					.set('prompt', get.prompt('potkuanggu'))
					.set('choiceList', choiceList)
					.set('displayIndex', false)
					.set('choice', choice)
					.set('ai', () => {
						return get.event().choice;
					})
					.forResult();
				event.result = {
					bool: control != 'cancel2',
					cost_data: control,
				};
			}
		},
		async content(event, trigger, player) {
			const result = event.cost_data;
			if (result == '背水！' && player.skin.name === 'pot_weiyan_achieve') {
				player.logSkill('qmsgswkjsgj_potkuanggu', null, null, null, [player, get.rand(3, 4)]);
			} else {
				player.logSkill('qmsgswkjsgj_potkuanggu', null, null, null, [player]);
			}
			if (result == 'recover_hp' || result == '背水！') {
				await player.recover();
			}
			if (result == 'draw_card' || result == '背水！') {
				await player.draw();
			}
			if (result == '背水！' && player.countCards('he')) {
				await player.chooseToDiscard('he', true);
				player.addTempSkill('potkuanggu_effect', 'phaseChange');
				player.addMark('potkuanggu_effect', 1, false);
			}
		},
		subSkill: {
			pot_weiyan_achieve: {
				audio: 'potkuanggu_pot_weiyan_achieve',
			},
			effect: {
				charlotte: true,
				onremove: true,
				mod: {
					cardUsable(card, player, num) {
						if (player.countMark('potkuanggu_effect') && card.name == 'sha') {
							return num + player.countMark('potkuanggu_effect');
						}
					},
				},
			},
		},
	},
	kunfen_qmsgswkjsgj_pot_weiyan: { audio: 'kunfen_pot_weiyan' },
	//势太史慈 ---
	qmsgswkjsgj_potzhanlie: {
		audio: 'potzhanlie',
		trigger: { global: 'phaseBegin' },
		forced: true,
		locked: false,
		logAudio: () => 2,
		content() {
			// const effectMap = new Map([
			// 	["hp", player.getHp()],
			// 	["damagedHp", player.getDamagedHp()],
			// 	["countplayer", game.countPlayer()],
			// ]);
			// const num = effectMap.get(player.storage.potzhanlie) || player.getAttackRange();
			player.addTempSkill('qmsgswkjsgj_potzhanlie_addMark');
			//保留原本的时机听语音
			// if (num > 0) {
			// 	player.addMark("addMark", num, false);
			// }
		},
		get limit() {
			return 6;
		},
		group: 'qmsgswkjsgj_potzhanlie_lie',
		subSkill: {
			addMark: {
				charlotte: true,
				onremove: true,
				audio: 'potzhanlie3.mp3',
				trigger: { global: ['loseAfter', 'loseAsyncAfter', 'cardsDiscardAfter'] },
				getIndex(event, player) {
					console.log(event.getd().filter((i) => i.name === 'sha').length);
					return Math.min(
						event.getd().filter((i) => i.name === 'sha').length,
						get.info('qmsgswkjsgj_potzhanlie').limit - player.countMark('qmsgswkjsgj_potzhanlie_lie'),
						// Math.max(
						// 	player.countMark("potzhanlie_addMark") -
						// 	game
						// 		.getGlobalHistory(
						// 			"everything",
						// 			evt => {
						// 				if (evt === event) {
						// 					return false;
						// 				}
						// 				return ["lose", "loseAsync", "cardsDiscard"].includes(evt.name) && evt.getd().some(i => i.name === "sha");
						// 			},
						// 			event
						// 		)
						// 		.reduce((sum, evt) => sum + evt.getd().filter(i => i.name === "sha").length, 0),
						// 	0
						// )
					);
					// return event.getd().filter(i => i.name === "sha").length;
				},
				forced: true,
				content() {
					player.addMark('qmsgswkjsgj_potzhanlie_lie', 1);
				},
				intro: { content: '本回合前#张【杀】进入弃牌堆后，获得等量“烈”标记' },
			},
			lie: {
				trigger: { global: 'phaseUseEnd' },
				filter: (event, player) => {
					if (player.hasUseTarget(new lib.element.VCard({ name: 'sha', isCard: true }), false)) {
						if (player.hasSkill('qmsgswkjsgj_potzhanlie_plus')) return true;
						else {
							event.player == player;
						}
					}
					// player.hasUseTarget(new lib.element.VCard({ name: "sha", isCard: true }), false)
				},
				cost() {
					'step 0';
					var result = player.chooseNumbers(get.prompt(event.skill), [
						{
							prompt: '移除任意枚“烈”，视为使用一张无次数限制的杀',
							min: 0,
							max: player.hasMark('qmsgswkjsgj_potzhanlie_lie'),
						},
					]);
					('step 1');
					if (result.bool)
						event.result = {
							bool: true,
							cost_data: result.numbers[0],
						};
				},
				// direct: true,
				content() {
					var num = event.cost_data;

					const effectMap = new Map([
						['hp', player.getHp()],
						['damagedHp', player.getDamagedHp()],
						['countplayer', game.countPlayer()],
					]);
					const numx = effectMap.get(player.storage.potzhanlie) || num;
					const str = player.hasMark('qmsgswkjsgj_potzhanlie_lie') ? '移去所有“烈”，' : '';
					player.chooseUseTarget('###' + get.prompt('qmsgswkjsgj_potzhanlie') + '###<div class="text center">' + str + '视为使用一张无次数限制的【杀】</div>', new lib.element.VCard({ name: 'sha', isCard: true }), false).set('oncard', () => {
						const event = get.event(),
							{ player } = event;
						// num = player.countMark("qmsgswkjsgj_potzhanlie_lie");
						player.addTempSkill('qmsgswkjsgj_potzhanlie_buff');
						player.removeMark('qmsgswkjsgj_potzhanlie_lie', num);
						event.set('qmsgswkjsgj_potzhanlie', numx);
					}); //.logSkill = "qmsgswkjsgj_potzhanlie";
				},
				marktext: '烈',
				intro: {
					name: '烈',
					content: 'mark',
				},
			},
			buff: {
				charlotte: true,
				trigger: { player: 'useCard1' },
				filter: (event) => event?.qmsgswkjsgj_potzhanlie,
				forced: true,
				locked: false,
				popup: false,
				async content(event, trigger, player) {
					const num = trigger.qmsgswkjsgj_potzhanlie,
						str = get.translation(trigger.card);
					const result = await player
						.chooseButton([
							'战烈：是否选择至多' + get.cnNumber(num) + '项执行？',
							[
								[
									['目标+1', '令' + str + '可以额外指定一个目标'],
									['伤害+1', '令' + str + '基础伤害值+1'],
									['弃牌响应', '令' + str + '需额外弃置一张牌方可响应'],
									['摸牌', str + '结算完毕后，你摸三张牌'],
								],
								'textbutton',
							],
						])
						.set('selectButton', [1, num])
						.set('ai', (button) => {
							const player = get.player(),
								trigger = get.event().getTrigger(),
								choice = button.link;
							switch (choice) {
								case '目标+1':
									return Math.max(
										...game
											.filterPlayer((target) => {
												return !trigger.targets?.includes(target) && lib.filter.targetEnabled2(trigger.card, player, target) && lib.filter.targetInRange(trigger.card, player, target);
											})
											.map((target) => get.effect(target, trigger.card, player, player)),
									);
								case '伤害+1':
									return (trigger.targets || []).reduce((sum, target) => {
										const effect = get.damageEffect(target, player, player);
										return (
											sum +
											effect *
												(target.hasSkillTag('filterDamage', null, {
													player: player,
													card: trigger.card,
												})
													? 1
													: 1 + (trigger.baseDamage || 1) + (trigger.extraDamage || 0))
										);
									}, 0);
								case '弃牌响应':
									return (trigger.targets || []).reduce((sum, target) => {
										const card = get.copy(trigger.card);
										game.setNature(card, 'stab');
										return sum + get.effect(target, card, player, player);
									}, 0);
								case '摸牌':
									return get.effect(player, { name: 'draw' }, player, player) * 3;
							}
						})
						.forResult();
					if (result.bool) {
						const choices = result.links;
						game.log(player, '选择了', '#g【战烈】', '的', '#y' + choices);
						for (const choice of choices) {
							player.popup(choice);
							switch (choice) {
								case '目标+1':
									player
										.when('useCard2')
										.filter((evt) => evt === trigger)
										.then(() => {
											player
												.chooseTarget('是否为' + get.translation(trigger.card) + '增加一个目标？', (card, player, target) => {
													const evt = get.event().getTrigger();
													return !evt.targets.includes(target) && lib.filter.targetEnabled2(evt.card, player, target) && lib.filter.targetInRange(evt.card, player, target);
												})
												.set('ai', (target) => {
													const player = get.player(),
														evt = get.event().getTrigger();
													return get.effect(target, evt.card, player);
												});
										})
										.then(() => {
											if (result?.bool && result.targets?.length) {
												const [target] = result.targets;
												player.line(target, trigger.card.nature);
												trigger.targets.add(target);
												game.log(target, '成为了', trigger.card, '的额外目标');
											}
										});
									break;
								case '伤害+1':
									trigger.baseDamage++;
									game.log(trigger.card, '造成的伤害', '#y+1');
									break;
								case '弃牌响应':
									player.addTempSkill('qmsgswkjsgj_potzhanlie_guanshi');
									player.markAuto('qmsgswkjsgj_potzhanlie_guanshi', [trigger.card]);
									break;
								case '摸牌':
									player
										.when('useCardAfter')
										.filter((evt) => evt === trigger)
										.then(() => player.draw(3));
									break;
							}
						}
					}
				},
			},
			guanshi: {
				charlotte: true,
				onremove: true,
				audio: 'potzhanlie',
				trigger: { player: 'useCardToBegin' },
				filter(event, player) {
					if (!event.target?.isIn()) {
						return false;
					}
					return !event.getParent().directHit.includes(event.target) && player.getStorage('qmsgswkjsgj_potzhanlie_guanshi').includes(event.card);
				},
				forced: true,
				logTarget: 'target',
				async content(event, trigger, player) {
					const { target } = trigger;
					const result = await target
						.chooseToDiscard('战烈：弃置一张牌，否则不可响应' + get.translation(trigger.card))
						.set('ai', (card) => {
							const player = get.player(),
								trigger = get.event().getTrigger();
							if (get.effect(player, trigger.card, trigger.player, player) >= 0) {
								return 0;
							}
							const num = player.countCards('hs', { name: 'shan' });
							if (num === 0) {
								return 0;
							}
							if (card.name === 'shan' && num <= 1) {
								return 0;
							}
							return 8 - get.value(card);
						})
						.forResult();
					if (!result?.bool) {
						trigger.set('directHit', true);
						game.log(target, '不可响应', trigger.card);
					}
				},
			},
			plus: {
				charlotte: true,
				onremove: function (player) {
					player.changeSkin({ characterName: 'qmsgswkjsgj_pot_taishici' }, 'qmsgswkjsgj_pot_taishici');
				},
			},
		},
	},
	qmsgswkjsgj_pothanzhan: {
		audio: 'pothanzhan',
		enable: 'phaseUse',
		usable: 1,
		filterTarget: lib.filter.notMe,
		async content(event, trigger, player) {
			const target = event.targets[0];
			for (const drawer of [player, target]) {
				const num = (() => {
					return (
						({
							hp: drawer.getHp(),
							damagedHp: drawer.getDamagedHp(),
							countplayer: game.countPlayer(),
						}[player.storage.pothanzhan] ?? drawer.maxHp) - drawer.countCards('h')
					);
				})();
				if (num > 0 && drawer == player) {
					await drawer.draw(Math.min(num, 5));
				}
			}
			const juedou = new lib.element.VCard({ name: 'juedou', isCard: true });
			if (player.canUse(juedou, target)) {
				await player.useCard(juedou, target, false);
			}
		},
		ai: {
			order(item, player) {
				if ((player.countCards('h', { name: 'sha' }) || player.maxHp - player.countCards('h')) > 1) {
					return 10;
				}
				return 1;
			},
			result: {
				target(player, target) {
					return get.effect(target, new lib.element.VCard({ name: 'juedou', isCard: true }), player, player);
				},
			},
		},
	},
	qmsgswkjsgj_potzhenfeng: {
		limited: true,
		audio: 'potzhenfeng',
		enable: ['chooseToUse'],
		filter(event, player) {
			if (event.type == 'dying') {
				if (player != event.dying) {
					return false;
				}
				return true;
			} else if (event.getParent().name == 'phaseUse') {
				return player.isDamaged() || ['qmsgswkjsgj_potzhanlie'].some((skill) => player.hasSkill(skill, null, null, false));
			}
			return false;
		},
		skillAnimation: true,
		animationColor: 'metal',
		logAudio: (index) => (typeof index === 'number' ? 'potzhenfeng' + index + '.mp3' : 2),
		chooseButton: {
			dialog(event, player) {
				const dialog = ui.create.dialog('振锋：你可以选择一项', 'hidden');
				dialog.add([
					[
						['recover', '回复2点体力'],
						['cover', '膝盖战烈的出牌阶段结束时为每名角色出牌阶段结束时，直到你的下个回合开始'],
					],
					'textbutton',
				]);
				return dialog;
			},
			filter(button, player) {
				switch (button.link) {
					case 'recover':
						return player.isDamaged();
					case 'cover':
						return ['qmsgswkjsgj_potzhanlie'].some((skill) => player.hasSkill(skill, null, null, false));
				}
			},
			check(button) {
				const player = get.player();
				if (button.link == 'recover') {
					return player.getHp() + player.countCards('h', { name: 'tao' }) < 2;
				}
				if (button.link == 'cover') {
					// let numbers = [player.getHp(), player.getDamagedHp(), game.countPlayer()];
					// if (numbers.some(c => c > player.getAttackRange())) {
					// 	return Math.max(...numbers) * 2;
					// }
					return 0;
				}
				return 0.1;
			},
			backup(links) {
				return {
					item: links[0],
					skillAnimation: true,
					animationColor: 'metal',
					log: false,
					async content(event, trigger, player) {
						player.awakenSkill('qmsgswkjsgj_potzhenfeng');
						if (get.info(event.name).item === 'recover') {
							player.logSkill('qmsgswkjsgj_potzhenfeng', null, null, null, [null]);
							player.changeSkin({ characterName: 'qmsgswkjsgj_pot_taishici' }, 'qmsgswkjsgj_pot_taishici_shadow1');
							await player.recover(2);
						} else {
							// let dialog = [],
							// 	skills = ["pothanzhan", "potzhanlie"].filter(skill => player.hasSkill(skill, null, null, false)),
							// 	list = [
							// 		["hp", "当前体力值"],
							// 		["damagedHp", "当前已损失体力值"],
							// 		["countplayer", "场上存活角色数"],
							// 	];
							// dialog.push("振锋：修改" + skills.map(skill => "〖" + get.translation(skill) + "〗").join("和") + "描述中的“X”为...");
							// for (const skill of skills) {
							// 	dialog.push('<div class="text center">' + get.translation(skill) + "</div>");
							// 	dialog.push([list.map(item => [item[0] + "|" + skill, item[1]]), "tdnodes"]);
							// }
							// const result = await player
							// 	.chooseButton(dialog, [1, Math.min(2, skills.length)], true)
							// 	.set("filterButton", button => {
							// 		return !ui.selected.buttons.some(but => but.link.split("|")[1] === button.link.split("|")[1]);
							// 	})
							// 	.set("ai", button => {
							// 		const player = get.player();
							// 		switch (button.link.split("|")[0]) {
							// 			case "hp":
							// 				return player.getHp();
							// 			case "damagedHp":
							// 				return player.getDamagedHp();
							// 			case "countplayer":
							// 				return game.countPlayer();
							// 		}
							// 	})
							// 	.forResult();
							// if (result?.bool && result.links?.length) {
							// 	player.logSkill("potzhenfeng", null, null, null, [get.rand(3, 4)]);
							// 	let changeList = [];
							// 	for (const link of result.links) {
							// 		const [change, skill] = link.split("|");
							// 		if (skill == "pothanzhan") {
							// 			changeList.push(change);
							// 		}
							// 		player.storage[skill] = change;
							// 		player.popup(skill);
							// 		game.log(player, "修改", "#g【" + get.translation(skill) + "】", "的", "#yX", "为", "#g" + list.find(item => item[0] === change)[1]);
							// 	}
							// 	if (changeList[0]) {
							// 		switch (changeList[0]) {
							// 			case "hp":
							// 				player.changeSkin({ characterName: "pot_taishici" }, "pot_taishici_shadow3");
							// 				break;
							// 			case "damagedHp":
							// 				player.changeSkin({ characterName: "pot_taishici" }, "pot_taishici_shadow2");
							// 				break;
							// 			case "countplayer":
							// 				player.changeSkin({ characterName: "pot_taishici" }, "pot_taishici_shadow4");
							// 		}
							// 	} else {
							// 		player.changeSkin({ characterName: "pot_taishici" }, "pot_taishici_shadow1");
							// 	}
							// }
							player.changeSkin({ characterName: 'qmsgswkjsgj_pot_taishici' }, 'qmsgswkjsgj_pot_taishici_shadow4');
							player.addTempSkill('qmsgswkjsgj_potzhanlie_plus', { player: 'phaseBegin' });
						}
					},
				};
			},
			prompt(links) {
				return `点击“确定”，${links[0] === 'recover' ? '回复2点体力' : '膝盖战烈的出牌阶段结束时为每名角色出牌阶段结束时，直到你的下个回合开始'}`;
			},
		},
		subSkill: {
			backup: {},
		},
		ai: {
			order: 15,
			threaten: 2,
			result: {
				player(player) {
					if ([player.getHp(), player.getDamagedHp(), game.countPlayer()].some((c) => c > player.getAttackRange())) {
						return 10;
					}
					return get.recoverEffect(player, player, player);
				},
			},
		},
	},

	//势于吉
	qmsgswkjsgj_potfuji: {
		audio: 'potfuji',
		enable: 'phaseUse',
		logAudio: () => 2,
		filter(event, player) {
			return player.countCards('he') > 0 && game.countPlayer();
		},
		filterCard: true,
		position: 'he',
		selectCard: () => [1, game.countPlayer()],
		check(card) {
			const player = get.player();
			// if (
			// 	ui.selected.cards.length >=
			// 	game.countPlayer(current => {
			// 		return get.attitude(player, current) > 0;
			// 	})
			// ) {
			// 	return 0;
			// }
			return get.value(card);
		},
		usable: 1,
		lose: false,
		discard: false,
		delay: false,
		async content(event, trigger, player) {
			const { cards: links } = event;
			await player.showCards(links, get.translation(player) + '发动了【' + get.translation(event.name) + '】');
			var cards = game.cardsGotoOrdering(links);
			console.log(cards);
			var relu = await player
				.YB_yiji(
					cards,
					links.length,
					function () {
						return true;
					},
					'符济',
					'tag:qmsgswkjsgj_potfuji',
				)
				.forResult();
			if (relu) {
				var gain_list = relu;
				for (const list of gain_list) {
					list[0].addSkill('qmsgswkjsgj_potfuji_effect');
				}
				if (player.isMinHandcard()) {
					player.logSkill('qmsgswkjsgj_potfuji', null, null, null, [3]);
					player.changeSkin({ characterName: 'qmsgswkjsgj_pot_yuji' }, 'qmsgswkjsgj_pot_yuji_shadow');
					await player.draw(1);
					player.addTempSkill(['qmsgswkjsgj_potfuji_sha', 'qmsgswkjsgj_potfuji_shan', 'qmsgswkjsgj_potfuji_tao', 'qmsgswkjsgj_potfuji_jiu'], { player: 'phaseBegin' });
				}
				player
					.when({ player: ['phaseBegin'] })
					.assign({
						lastDo: true,
					})
					.then(() => {
						player.changeSkin({ characterName: 'qmsgswkjsgj_pot_yuji' }, 'qmsgswkjsgj_pot_yuji');
					});
			}
		},
		ai: {
			order: 10,
			result: {
				// target(player, target) {
				// 	var card = ui.selected.cards[ui.selected.targets.length];
				// 	if (!card) {
				// 		return 0;
				// 	}
				// 	if (get.value(card) < 0) {
				// 		return -1;
				// 	}
				// 	return Math.sqrt(5 - Math.min(4, target.countCards("h")));
				// },
				player(player) {
					return 1;
				},
			},
		},
		subSkill: {
			effect: {
				charlotte: true,
				trigger: {
					player: ['useCard', 'useCardAfter'],
					source: ['damageBegin1', 'recoverBegin'],
				},
				mark: true,
				marktext: '符',
				intro: {
					mark(dialog, content, player) {
						const cards = player.getCards('h', (card) => card.hasGaintag('qmsgswkjsgj_potfuji'));
						if (cards?.length) {
							dialog.addAuto(cards);
						} else {
							dialog.addText('无符济牌');
						}
					},
				},
				filter(event, player, name) {
					const ori_event = event.name === 'damage' || event.name == 'recover' ? event.getParent('useCard') : event;
					if (
						!ori_event ||
						ori_event.name !== 'useCard' ||
						!player.hasHistory('lose', (evt) => {
							const evtx = evt.relatedEvent || evt.getParent();
							if (evtx !== ori_event) {
								return false;
							}
							return Object.values(evt.gaintag_map).flat().includes('qmsgswkjsgj_potfuji');
						})
					) {
						return false;
					}
					if (name === 'useCard') {
						return true;
					} else {
						if (event.name === 'damage') {
							return ori_event.card.name === 'sha';
						} else if (event.name === 'recover') {
							return ori_event.card.name === 'tao';
						} else {
							['shan', 'jiu'].includes(ori_event.card.name);
						}
					}
					// return name === "useCard" ||
					// 	ori_event.card.name === (event.name==='damage'?'sha':(event.name==='recover'?'tao':'jiu'))
					// ['sha','shan','tao','jiu'].includes(ori_event.card.name)
					/* === (event.name === "damage" ? "sha" : "shan");*/
				},
				forced: true,
				logTarget: 'player',
				popup: false,
				async content(event, trigger, player) {
					if (trigger.name === 'damage' || event.triggername === 'useCardAfter') {
						player.logSkill('qmsgswkjsgj_potfuji', null, null, null, [trigger.name === 'damage' || trigger.card.name === 'jiu' ? 4 : 5]);
					}
					if (trigger.name === 'damage' || trigger.name === 'recover') {
						trigger.num++;
					} else if (event.triggername === 'useCardAfter') {
						if (trigger.card.name === 'jiu') {
							var relu = await player
								.chooseTarget(1, '弃置场上一张牌')
								.set('filterTarget', function (card, player, target) {
									return target.hasCard((card) => lib.filter.canBeDiscarded(card, player, target), 'ej');
								})
								.set('ai', function (target) {
									lib.card.guohe_copy.ai.result.target(player, target, { name: 'guohe_copy', position: 'ej' }) + 1;
								})
								.forResult();
							if (relu.bool) {
								await player.discardPlayerCard(relu.targets[0], 'ej', true);
							}
						} else {
							await player.draw();
						}
					} else {
						const history = player.getHistory('lose', (evt) => {
								if ((evt.relatedEvent || evt.getParent()) !== trigger) {
									return false;
								}
								return Object.values(evt.gaintag_map).flat().includes('qmsgswkjsgj_potfuji');
							})[0],
							cards = history.getl(player).cards2.filter((card) => history.gaintag_map[card.cardid]?.includes('qmsgswkjsgj_potfuji'));
						let gains = [];
						for (const card of cards) {
							const gain = get.cardPile2((gain) => !gains.includes(gain) && get.suit(gain) === get.suit(card, false));
							if (gain) {
								gains.push(gain);
							}
						}
						if (gains.length) {
							await player.gain(gains, 'gain2');
						}
					}
				},
			},
			sha: {
				charlotte: true,
				mark: true,
				marktext: '杀',
				intro: {
					name: '符济 - 杀',
					content: '使用【杀】造成的伤害+1',
				},
				audio: 'potfuji4.mp3',
				trigger: { player: 'useCard' },
				filter(event, player) {
					return event.card.name === 'sha';
				},
				forced: true,
				logTarget: 'player',
				content() {
					const gain = get.cardPile2((gain) => get.suit(gain) === get.suit(trigger.card, false));
					if (gain) {
						player.gain(gain, 'gain2');
					}
					trigger.baseDamage++;
					player
						.when({
							player: 'useCardAfter',
						})
						.filter((evt) => evt === trigger)
						.then(() => {
							player.removeSkill('qmsgswkjsgj_potfuji_sha');
						});
				},
			},
			shan: {
				charlotte: true,
				mark: true,
				marktext: '闪',
				intro: {
					name: '符济 - 闪',
					content: '使用【闪】结算完毕后摸一张牌',
				},
				audio: 'potfuji5.mp3',
				trigger: { player: 'useCard' },
				filter(event, player) {
					return event.card.name === 'shan';
				},
				forced: true,
				content() {
					const gain = get.cardPile2((gain) => get.suit(gain) === get.suit(trigger.card, false));
					if (gain) {
						player.gain(gain, 'gain2');
					}
					player
						.when('useCardAfter')
						.filter((evt) => evt === trigger)
						.then(() => {
							player.removeSkill('qmsgswkjsgj_potfuji_shan');
							player.draw();
						});
				},
			},
			tao: {
				charlotte: true,
				mark: true,
				marktext: '桃',
				intro: {
					name: '符济 - 桃',
					content: '使用【桃】回复值+1',
				},
				audio: 'potfuji5.mp3',
				trigger: { player: 'useCard' },
				filter(event, player) {
					return event.card.name === 'tao';
				},
				forced: true,
				content() {
					const gain = get.cardPile2((gain) => get.suit(gain) === get.suit(trigger.card, false));
					if (gain) {
						player.gain(gain, 'gain2');
					}
					trigger.baseDamage++;
					player
						.when('useCardAfter')
						.filter((evt) => evt === trigger)
						.then(() => {
							player.removeSkill('qmsgswkjsgj_potfuji_tao');
						});
				},
			},
			jiu: {
				charlotte: true,
				mark: true,
				marktext: '酒',
				intro: {
					name: '符济 - 酒',
					content: '使用【酒】结算完毕后可以弃置场上一张牌',
				},
				audio: 'potfuji4.mp3',
				trigger: { player: 'useCard' },
				filter(event, player) {
					return event.card.name === 'jiu';
				},
				forced: true,
				content() {
					const gain = get.cardPile2((gain) => get.suit(gain) === get.suit(trigger.card, false));
					if (gain) {
						player.gain(gain, 'gain2');
					}
					player
						.when('useCardAfter')
						.filter((evt) => evt === trigger)
						.then(() => {
							player.removeSkill('qmsgswkjsgj_potfuji_shan');
							// player.draw();
							player
								.chooseTarget(1, '弃置场上一张牌')
								.set('filterTarget', function (card, player, target) {
									return target.hasCard((card) => lib.filter.canBeDiscarded(card, player, target), 'ej');
								})
								.set('ai', function (target) {
									lib.card.guohe_copy.ai.result.target(player, target, { name: 'guohe_copy', position: 'ej' }) + 1;
								});
						})
						.then(function () {
							if (result.bool) {
								player.discardPlayerCard(result.targets[0], 'ej', true);
							}
						});
				},
			},
		},
	},
	qmsgswkjsgj_potdaozhuan: {
		audio: 'potdaozhuan',
		enable: 'chooseToUse',
		logAudio: (index) => (typeof index === 'number' ? 'potdaozhuan' + index + '.mp3' : 2),
		filter(event, player) {
			if (event.qmsgswkjsgj_potdaozhuan) {
				return false;
			}
			let num = player.countCards('he');
			if (_status.currentPhase?.isIn() && _status.currentPhase !== player) {
				num += _status.currentPhase.countCards('he');
			}
			if (num <= 0) {
				return false;
			}
			return get
				.inpileVCardList((info) => {
					const name = info[2];
					if (get.type(name) !== 'basic') {
						return false;
					}
					return !player.getStorage('qmsgswkjsgj_potdaozhuan_used').includes(name);
				})
				.some((card) => event.filterCard(new lib.element.VCard({ name: card[2], nature: card[3], isCard: true }), player, event));
		},
		// usable: 1,
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog('道转', [get.inpileVCardList((info) => get.type(info[2]) === 'basic'), 'vcard']);
			},
			filter(button, player) {
				const event = get.event().getParent();
				if (player.getStorage('qmsgswkjsgj_potdaozhuan_used').includes(button.link[2])) {
					return false;
				}
				return event.filterCard(new lib.element.VCard({ name: button.link[2], nature: button.link[3], isCard: true }), player, event);
			},
			check(button) {
				const event = get.event().getParent();
				if (event.type !== 'phase') {
					return 1;
				}
				return get.player().getUseValue(new lib.element.VCard({ name: button.link[2], nature: button.link[3], isCard: true }));
			},
			prompt(links, player) {
				let prompt = '将你';
				if (_status.currentPhase?.isIn() && _status.currentPhase !== player) {
					prompt += '与' + get.translation(_status.currentPhase);
				}
				prompt += '的一张牌置入弃牌堆，';
				return '###道转###<div class="text center">' + prompt + '视为使用' + (get.translation(links[0][3]) || '') + '【' + get.translation(links[0][2]) + '】</div>';
			},
			backup(links) {
				return {
					filterCard: () => false,
					selectCard: -1,
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						isCard: true,
					},
					log: false,
					async precontent(event, trigger, player) {
						const goon = _status.currentPhase?.isIn() && _status.currentPhase !== player;
						let prompt = '将你';
						if (goon) {
							prompt += '与' + get.translation(_status.currentPhase);
						}
						prompt += '的一张牌置入弃牌堆';
						let dialog = ['道转：' + prompt];
						if (player.countCards('h')) {
							dialog.push('<div class="text center">你的手牌</div>');
							dialog.push(player.getCards('h'));
						}
						if (player.countCards('e')) {
							dialog.push('<div class="text center">你的装备牌</div>');
							dialog.push(player.getCards('e'));
						}
						if (goon) {
							const target = _status.currentPhase;
							if (target.countCards('h')) {
								const cards = target.getCards('h');
								dialog.push('<div class="text center">' + get.translation(target) + '的手牌</div>');
								if (player.hasSkillTag('viewHandcard', null, target, true)) {
									dialog.push(cards);
								} else {
									dialog.push([cards.slice().randomSort(), 'blank']);
								}
							}
							if (target.countCards('e')) {
								dialog.push('<div class="text center">' + get.translation(target) + '的装备牌</div>');
								dialog.push(target.getCards('e'));
							}
						}
						const result = await player
							.chooseButton(dialog)
							.set('filterButton', (button) => {
								const card = button.link,
									{ player, useCard, targets } = get.event();
								if (!targets?.length) {
									return true;
								}
								ui.selected.cards.add(card);
								const bool = targets.some((target) => {
									if (!lib.filter.cardEnabled(useCard, player, 'forceEnable')) {
										return false;
									}
									return lib.filter.targetEnabled2(useCard, player, target) && lib.filter.targetInRange(useCard, player, target);
								});
								ui.selected.cards.remove(card);
								return bool;
							})
							.set('useCard', event.result.card)
							.set('targets', event.result.targets)
							.set('ai', (button) => {
								const player = get.player(),
									source = get.owner(button.link);
								return get.value(button.link, get.owner(source)) * Math.sign(-get.attitude(player, source));
							})
							.forResult();
						if (result?.bool) {
							player.logSkill('qmsgswkjsgj_potdaozhuan', null, null, null, [get.rand(1, 2)]);
							player.addTempSkill('qmsgswkjsgj_potdaozhuan_used');
							player.markAuto('qmsgswkjsgj_potdaozhuan_used', [event.result.card.name]);
							if (result.links?.length) {
								const target = _status.currentPhase;
								const owners = result.links.map((i) => get.owner(i)).unique();
								await owners[0].loseToDiscardpile(result.links);
								if (owners[0] === target) {
									player.tempBanSkill('qmsgswkjsgj_potdaozhuan');
									player.logSkill('qmsgswkjsgj_potdaozhuan', null, null, null, [get.rand(3, 4)]);
								}
							}
							return;
						}
						const evt = event.getParent();
						evt.set('qmsgswkjsgj_potdaozhuan', true);
						evt.goto(0);
					},
				};
			},
		},
		hiddenCard(player, name) {
			if (player.isTempBanned('qmsgswkjsgj_potdaozhuan')) {
				return false;
			}
			return get.type(name) === 'basic' && !player.getStorage('qmsgswkjsgj_potdaozhuan_used').includes(name);
		},
		ai: {
			fireAttack: true,
			respondSha: true,
			respondShan: true,
			skillTagFilter(player, tag, arg) {
				if (arg === 'respond') {
					return false;
				}
				return get.info('qmsgswkjsgj_potdaozhuan').hiddenCard(
					player,
					(() => {
						switch (tag) {
							case 'fireAttack':
								return 'sha';
							default:
								return tag.slice('respond'.length).toLowerCase();
						}
					})(),
				);
			},
			order(item, player) {
				if (player && _status.event.type === 'phase') {
					let max = 0,
						names = get.inpileVCardList((info) => {
							const name = info[2];
							if (get.type(name) !== 'basic') {
								return false;
							}
							return !player.getStorage('qmsgswkjsgj_potdaozhuan_used').includes(name);
						});
					names = names.map((namex) => new lib.element.VCard({ name: namex[2], nature: namex[3] }));
					names.forEach((card) => {
						if (player.getUseValue(card) > 0) {
							let temp = get.order(card);
							if (temp > max) {
								max = temp;
							}
						}
					});
					return max + (max > 0 ? 0.2 : 0);
				}
				return 10;
			},
			result: {
				player(player) {
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					return 1;
				},
			},
		},
		subSkill: {
			backup: {},
			used: {
				charlotte: true,
				onremove: true,
				intro: { content: '本轮已使用牌名：$' },
			},
		},
	},

	//曹髦
	qmsgswkjsgj_mbqianlong: {
		audio: 'mbqianlong',
		persevereSkill: true,
		trigger: {
			player: ['qmsgswkjsgj_mbqianlong_beginAfter', 'qmsgswkjsgj_mbqianlong_addAfter' /*, "qmsgswkjsgj_mbweitongAfter"*/],
		},
		filter(event, player) {
			let skills = [];
			let current = player.additionalSkills?.qmsgswkjsgj_mbqianlong?.length ?? 0;
			let target = player.countMark('qmsgswkjsgj_mbqianlong') == lib.skill.qmsgswkjsgj_mbqianlong.maxMarkCount ? lib.skill.qmsgswkjsgj_mbqianlong.derivation.length : Math.floor(player.countMark('qmsgswkjsgj_mbqianlong') / 25);
			return target > current;
		},
		forced: true,
		popup: false,
		locked: false,
		beginMarkCount: 20,
		maxMarkCount: 99,
		derivation: ['qmsgswkjsgj_mbcmqingzheng', 'qmsgswkjsgj_mbcmjiushi', 'qmsgswkjsgj_mbcmfangzhu', 'qmsgswkjsgj_mbjuejin'],
		addMark(player, num) {
			num = Math.min(num, lib.skill.qmsgswkjsgj_mbqianlong.maxMarkCount - player.countMark('qmsgswkjsgj_mbqianlong'));
			player.addMark('qmsgswkjsgj_mbqianlong', num);
		},
		group: ['qmsgswkjsgj_mbqianlong_begin', 'qmsgswkjsgj_mbqianlong_add', 'qmsgswkjsgj_mbqianlong_die'],
		async content(event, trigger, player) {
			const derivation = lib.skill.qmsgswkjsgj_mbqianlong.derivation,
				skills = player.countMark('qmsgswkjsgj_mbqianlong') == lib.skill.qmsgswkjsgj_mbqianlong.maxMarkCount ? derivation : derivation.slice(0, Math.floor(player.countMark('qmsgswkjsgj_mbqianlong') / 25));
			player.addAdditionalSkill('qmsgswkjsgj_mbqianlong', skills);
		},
		marktext: '道',
		intro: {
			name: '道心(潜龙)',
			name2: '道心',
			content: '当前道心数为#',
		},
		subSkill: {
			begin: {
				audio: 'qmsgswkjsgj_mbqianlong',
				persevereSkill: true,
				trigger: {
					global: 'phaseBefore',
					player: 'enterGame',
				},
				filter(event, player) {
					return event.name != 'phase' || game.phaseNumber == 0;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					const num = game.hasPlayer((current) => {
						return current !== player && current.group === 'wei' && player.hasZhuSkill('qmsgswkjsgj_mbweitong', current);
					})
						? 60
						: lib.skill.qmsgswkjsgj_mbqianlong.beginMarkCount;
					// const num = lib.skill.qmsgswkjsgj_mbqianlong.beginMarkCount;
					lib.skill.qmsgswkjsgj_mbqianlong.addMark(player, num);
				},
			},
			add: {
				audio: 'qmsgswkjsgj_mbqianlong',
				persevereSkill: true,
				trigger: {
					player: ['gainAfter', 'damageEnd'],
					source: 'damageSource',
					global: 'loseAsyncAfter',
				},
				filter(event, player) {
					if (player.countMark('qmsgswkjsgj_mbqianlong') >= lib.skill.qmsgswkjsgj_mbqianlong.maxMarkCount) {
						return false;
					}
					if (event.name === 'damage') {
						return event.num > 0;
					}
					return event.getg(player).length > 0;
				},
				getIndex(event, player, triggername) {
					if (event.name === 'damage') {
						return event.num;
					}
					return 1;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					let toAdd = 5 * (1 + (trigger.name === 'damage') * 2);
					lib.skill.qmsgswkjsgj_mbqianlong.addMark(player, toAdd);
				},
			},
			die: {
				trigger: {
					player: 'dieBefore',
				},
				charlotte: true,
				firstDo: true,
				forced: true,
				popup: false,
				forceDie: true,
				async content(event, trigger, player) {
					player.changeSkin({ characterName: 'qmsgswkjsgj_re_mb_caomao' }, 'qmsgswkjsgj_re_mb_caomao_dead');
				},
			},
		},
	},
	qmsgswkjsgj_mbweitong: {
		audio: 'mbweitong',
		persevereSkill: true,
		zhuSkill: true,
		// trigger: {
		// 	player: "mbqianlong_beginBegin",
		// },
		// forced: true,
		// locked: false,
		// content() {

		// },
		trigger: {
			global: 'phaseBefore',
			player: 'enterGame',
		},
		filter(event, player) {
			return event.name != 'phase' || game.phaseNumber == 0;
		},
		forced: true,
		locked: false,
		async content(event, trigger, player) {
			// const num = game.countPlayer(current => {
			// 	return current !== player && current.group === "wei" && player.hasZhuSkill("qmsgswkjsgj_mbweitong", current);
			// });
			// lib.skill.qmsgswkjsgj_mbqianlong.addMark(player, num);
		},
		ai: {
			combo: 'qmsgswkjsgj_mbqianlong',
		},
	},
	qmsgswkjsgj_mbcmqingzheng: {
		audio: 'mbcmqingzheng',
		persevereSkill: true,
		trigger: { player: 'phaseUseBegin' },
		filter(event, player) {
			return player.countCards('h') > 0 && game.hasPlayer((current) => player != current && current.countCards('h') > 0);
		},
		/**
		 * player选择target的一种花色的牌
		 * @param {Player} player
		 * @param {Player} target
		 */
		chooseOneSuitCard(player, target, force = false, limit, str = '请选择一个花色的牌', ai = { bool: false }) {
			const { promise, resolve } = Promise.withResolvers();
			const event = _status.event;
			event.selectedCards = [];
			event.selectedButtons = [];
			//对手牌按花色分类
			let suitCards = Object.groupBy(target.getCards('h'), (c) => get.suit(c, target));
			suitCards.heart ??= [];
			suitCards.diamond ??= [];
			suitCards.spade ??= [];
			suitCards.club ??= [];
			let dialog = (event.dialog = ui.create.dialog());
			dialog.classList.add('fullheight');
			event.control_ok = ui.create.control('ok', (link) => {
				_status.imchoosing = false;
				event.dialog.close();
				event.control_ok?.close();
				event.control_cancel?.close();
				event._result = {
					bool: true,
					cards: event.selectedCards,
				};
				resolve(event._result);
				game.resume();
			});
			event.control_ok.classList.add('disabled');
			//如果是非强制的，才创建取消按钮
			if (!force) {
				event.control_cancel = ui.create.control('cancel', (link) => {
					_status.imchoosing = false;
					event.dialog.close();
					event.control_ok?.close();
					event.control_cancel?.close();
					event._result = {
						bool: false,
					};
					resolve(event._result);
					game.resume();
				});
			}
			event.switchToAuto = function () {
				_status.imchoosing = false;
				event.dialog?.close();
				event.control_ok?.close();
				event.control_cancel?.close();
				event._result = ai();
				resolve(event._result);
				game.resume();
			};
			dialog.addNewRow(str);
			let keys = Object.keys(suitCards).sort((a, b) => {
				let arr = ['spade', 'heart', 'club', 'diamond', 'none'];
				return arr.indexOf(a) - arr.indexOf(b);
			});
			//添加框
			while (keys.length) {
				let key1 = keys.shift();
				let cards1 = suitCards[key1];
				let key2 = keys.shift();
				let cards2 = suitCards[key2];
				//点击容器的回调
				/**@type {Row_Item_Option['clickItemContainer']} */
				const clickItemContainer = function (container, item, allContainer) {
					if (!item?.length || item.some((card) => !lib.filter.cardDiscardable(card, player, event.name))) {
						return;
					}
					if (event.selectedButtons.includes(container)) {
						container.classList.remove('selected');
						event.selectedButtons.remove(container);
						event.selectedCards.removeArray(item);
					} else {
						if (event.selectedButtons.length >= limit) {
							let precontainer = event.selectedButtons[0];
							precontainer.classList.remove('selected');
							event.selectedButtons.remove(precontainer);
							let suit = get.suit(event.selectedCards[0], target),
								cards = target.getCards('h', { suit: suit });
							event.selectedCards.removeArray(cards);
						}
						container.classList.add('selected');
						event.selectedButtons.add(container);
						event.selectedCards.addArray(item);
					}
					event.control_ok.classList[event.selectedButtons.length === limit ? 'remove' : 'add']('disabled');
				};
				//给框加封条，显示xxx牌多少张
				function createCustom(suit, count) {
					return function (itemContainer) {
						function formatStr(str) {
							return str.replace(/(?:♥︎|♦︎)/g, '<span style="color: red; ">$&</span>');
						}
						let div = ui.create.div(itemContainer);
						if (count) {
							div.innerHTML = formatStr(`${get.translation(suit)}牌${count}张`);
						} else {
							div.innerHTML = formatStr(`没有${get.translation(suit)}牌`);
						}
						div.css({
							position: 'absolute',
							width: '100%',
							bottom: '1%',
							height: '35%',
							background: '#352929bf',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							fontSize: '1.2em',
							zIndex: '2',
						});
					};
				}
				//框的样式，不要太宽，高度最小也要100px，防止空框没有高度
				/**@type {Row_Item_Option['itemContainerCss']} */
				let itemContainerCss = {
					border: 'solid #c6b3b3 2px',
					minHeight: '100px',
				};
				if (key2) {
					dialog.addNewRow(
						{
							item: cards1,
							ItemNoclick: true, //卡牌不需要被点击
							clickItemContainer,
							custom: createCustom(key1, cards1.length), //添加封条
							itemContainerCss,
						},
						{
							item: cards2,
							ItemNoclick: true, //卡牌不需要被点击
							clickItemContainer,
							custom: createCustom(key2, cards2.length),
							itemContainerCss,
						},
					);
				} else {
					dialog.addNewRow({
						item: cards1,
						ItemNoclick: true, //卡牌不需要被点击
						clickItemContainer,
						custom: createCustom(key1, cards1.length),
						itemContainerCss,
					});
				}
			}
			game.pause();
			dialog.open();
			_status.imchoosing = true;
			return promise;
		},
		async cost(event, trigger, player) {
			const list = get.addNewRowList(player.getCards('h'), 'suit', player);
			let limit = event.skill === 'sbqingzheng' ? 3 - player.countMark('sbjianxiong') : 1;
			const result = await player
				.chooseButtonTarget({
					createDialog: [
						[
							[[`${get.prompt(event.skill)}<div class="text center">${get.translation(event.skill, 'info')}</div>`], 'addNewRow'],
							[
								(dialog) => {
									dialog.classList.add('fullheight');
									// 不添加scroll1和scroll2的类名
									dialog.forcebutton = false;
									dialog._scrollset = false;
								},
								'handle',
							],
							list.map((item) => [Array.isArray(item) ? item : [item], 'addNewRow']),
						],
					],
					filterButton(button) {
						const player = get.player();
						if (!button.links.length || button.links.some((card) => !lib.filter.cardDiscardable(card, player, get.event().getParent().skill))) {
							return false;
						}
						return true;
					},
					selectButton: limit,
					limit,
					filterTarget(card, player, target) {
						return target != player && target.countCards('h');
					},
					ai1(button) {
						const player = get.player();
						if (!game.hasPlayer((current) => player != current && current.countDiscardableCards(player, 'h') > 0 && get.attitude(player, current) < 0)) {
							return 0;
						}
						let values = button.links.map((i) => get.value(i)).reduce((p, c) => p + c, 0) / button.links.length;
						if (button.links.length > 4 || values > 6) {
							return 0;
						}
						return (13 - button.links.length) / values;
					},
					ai2(target) {
						const player = get.player(),
							att = get.attitude(player, target);
						if (att >= 0) {
							return 0;
						}
						return 1 - att / 2 + Math.sqrt(target.countCards('h'));
					},
				})
				.forResult();
			event.result = {
				bool: result?.bool,
				cost_data: result?.links,
				targets: result?.targets,
			};
			if (event.result.bool && result?.links?.length) {
				event.result.cards = player.getCards('h').filter((card) => result.links.includes(get.suit(card, player)));
			}
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
				cards: cards1,
			} = event;
			await player.discard(cards1);
			if (
				!target.countCards('h') ||
				lib.suits
					.slice()
					.filter((suit) => target.hasCard((card, playerx) => get.suit(card, playerx) === suit, 'h'))
					.every((suit) => target.hasCard((card, playerx) => get.suit(card, playerx) === suit && !lib.filter.cardDiscardable(card, player), 'h'))
			) {
				if (target.countCards('h')) {
					const content = [`###清正###<div class="text center">${get.translation(target)}的手牌</div>`, target.getCards('h')];
					await player.chooseControl('ok').set('dialog', content);
				}
				return;
			}
			const list = get.addNewRowList(target.getCards('h'), 'suit', target);
			let result = await player
				.chooseButton(
					[
						[
							[[`清正：弃置${get.translation(target)}一种花色的所有牌`], 'addNewRow'],
							[
								(dialog) => {
									dialog.classList.add('fullheight');
									dialog.forcebutton = false;
									dialog._scrollset = false;
								},
								'handle',
							],
							list.map((item) => [Array.isArray(item) ? item : [item], 'addNewRow']),
						],
					],
					true,
				)
				.set('filterButton', (button) => {
					const player = get.player();
					if (!button.links.length || button.links.some((card) => !lib.filter.cardDiscardable(card, player, get.event().getParent().name))) {
						return false;
					}
					return true;
				})
				.set('ai', (button) => {
					const player = get.player();
					return button.links.length;
				})
				.forResult();
			if (!result?.links?.length) {
				return;
			}
			const cards2 = target.getDiscardableCards(player, 'h').filter((card) => result.links.includes(get.suit(card, target)));
			if (cards2.length) {
				await target.discard(cards2, 'notBySelf').set('discarder', player);
			}
			// if (cards1.length > cards2.length) {
			await target.damage(player);
			// }
			if (event.name !== 'sbqingzheng' || player.countMark('sbjianxiong') >= 2) {
				return;
			}
			if (['sbjianxiong', 'jdjianxiong'].some((skill) => player.hasSkill(skill, null, null, false))) {
				result = await player
					.chooseBool('是否获得1枚“治世”？')
					.set('choice', Math.random() >= 0.5)
					.forResult();
				if (result?.bool) {
					player.addMark('sbjianxiong', 1);
				}
			}
		},
	},
	qmsgswkjsgj_mbcmjiushi: {
		audio: 'mbcmjiushi',
		inherit: 'rejiushi',
		persevereSkill: true,
		group: ['qmsgswkjsgj_mbcmjiushi_use', 'qmsgswkjsgj_mbcmjiushi_turnback', 'qmsgswkjsgj_mbcmjiushi_gain'],
		subSkill: {
			use: {
				hiddenCard(player, name) {
					if (name == 'jiu') {
						return !player.isTurnedOver();
					}
					return false;
				},
				audio: 'qmsgswkjsgj_mbcmjiushi',
				enable: 'chooseToUse',
				filter(event, player) {
					if (player.classList.contains('turnedover')) {
						return false;
					}
					return event.filterCard({ name: 'jiu', isCard: true }, player, event);
				},
				async content(event, trigger, player) {
					if (_status.event.getParent(2).type == 'dying') {
						event.dying = player;
						event.type = 'dying';
					}
					await player.turnOver();
					await player.useCard({ name: 'jiu', isCard: true }, player);
				},
				ai: {
					save: true,
					skillTagFilter(player, tag, arg) {
						return !player.isTurnedOver() && _status.event?.dying == player;
					},
					order: 5,
					result: {
						player(player) {
							if (_status.event.parent.name == 'phaseUse') {
								if (player.countCards('h', 'jiu') > 0) {
									return 0;
								}
								if (player.getEquip('zhuge') && player.countCards('h', 'sha') > 1) {
									return 0;
								}
								if (!player.countCards('h', 'sha')) {
									return 0;
								}
								var targets = [];
								var target;
								var players = game.filterPlayer();
								for (var i = 0; i < players.length; i++) {
									if (get.attitude(player, players[i]) < 0) {
										if (player.canUse('sha', players[i], true, true)) {
											targets.push(players[i]);
										}
									}
								}
								if (targets.length) {
									target = targets[0];
								} else {
									return 0;
								}
								var num = get.effect(target, { name: 'sha' }, player, player);
								for (var i = 1; i < targets.length; i++) {
									var num2 = get.effect(targets[i], { name: 'sha' }, player, player);
									if (num2 > num) {
										target = targets[i];
										num = num2;
									}
								}
								if (num <= 0) {
									return 0;
								}
								var e2 = target.getEquip(2);
								if (e2) {
									if (e2.name == 'tengjia') {
										if (!player.countCards('h', { name: 'sha', nature: 'fire' }) && !player.getEquip('zhuque')) {
											return 0;
										}
									}
									if (e2.name == 'renwang') {
										if (!player.countCards('h', { name: 'sha', color: 'red' })) {
											return 0;
										}
									}
									if (e2.name == 'baiyin') {
										return 0;
									}
								}
								if (player.getEquip('guanshi') && player.countCards('he') > 2) {
									return 1;
								}
								return target.countCards('h') > 3 ? 0 : 1;
							}
							if (player == _status.event.dying || player.isTurnedOver()) {
								return 3;
							}
						},
					},
					effect: {
						target(card, player, target) {
							if (target.isTurnedOver()) {
								if (get.tag(card, 'damage')) {
									if (player.hasSkillTag('jueqing', false, target)) {
										return [1, -2];
									}
									if (target.hp == 1) {
										return;
									}
									return [1, target.countCards('h') / 2];
								}
							}
						},
					},
				},
			},
			turnback: {
				audio: 'qmsgswkjsgj_mbcmjiushi',
				persevereSkill: true,
				trigger: { player: 'damageEnd' },
				check(event, player) {
					return player.isTurnedOver();
				},
				filter(event, player) {
					if (
						player.hasHistory('useCard', (evt) => {
							if (evt.card.name != 'jiu' || evt.getParent().name != 'qmsgswkjsgj_mbcmjiushi_use') {
								return false;
							}
							return evt.getParent('damage', true) == event;
						})
					) {
						return false;
					}
					return player.isTurnedOver();
				},
				prompt(event, player) {
					return '是否发动【酒诗】，将武将牌翻面？';
				},
				content() {
					player.turnOver();
				},
			},
			gain: {
				audio: 'qmsgswkjsgj_mbcmjiushi',
				persevereSkill: true,
				trigger: { player: 'turnOverAfter' },
				frequent: true,
				prompt: '是否发动【酒诗】，获得牌堆中的一张锦囊牌？',
				content() {
					var card = get.cardPile2(function (card) {
						return get.type2(card) == 'trick';
					});
					if (card) {
						player.gain(card, 'draw');
					}
				},
			},
		},
	},
	qmsgswkjsgj_mbcmfangzhu: {
		audio: 'mbcmfangzhu',
		persevereSkill: true,
		inherit: 'qmsgswkjsgj_shenci_sbfangzhu',
		filter(event, player) {
			// const target = player.storage.mbcmfangzhu;
			return game.hasPlayer((current) => current !== player);
		},
		usable: 1,
		chooseButton: {
			dialog() {
				const dialog = ui.create.dialog('放逐：令一名其他角色...', 'hidden');
				dialog.add([
					[
						[1, '只能使用一种类型牌直到其回合结束'],
						[2, '非Charlotte技能失效直到其回合结束'],
					],
					'textbutton',
				]);
				return dialog;
			},
			check(button) {
				const player = get.player();
				if (button.link === 2) {
					if (
						game.hasPlayer((target) => {
							if (target.hasSkill('qmsgswkjsgj_mbcmfangzhu_ban') || target.hasSkill('fengyin') || target.hasSkill('baiban')) {
								return false;
							}
							return (
								get.attitude(player, target) < 0 &&
								['name', 'name1', 'name2']
									.map((sum, name) => {
										if (target[name] && (name != 'name1' || target.name != target.name1)) {
											if (get.character(target[name])) {
												return get.rank(target[name], true);
											}
										}
										return 0;
									})
									.reduce((p, c) => {
										return p + c;
									}, 0) > 5
							);
						})
					) {
						return 6;
					}
				}
				return button.link === 1 ? 1 : 0;
			},
			backup(links, player) {
				return {
					num: links[0],
					audio: 'qmsgswkjsgj_mbcmfangzhu',
					filterCard: () => false,
					selectCard: -1,
					filterTarget(card, player, target) {
						if (target == player) {
							return false;
						}
						const num = lib.skill.mbcmfangzhu_backup.num,
							storage = target.getStorage('qmsgswkjsgj_mbcmfangzhu_ban');
						return num != 1 || !storage.length;
					},
					async content(event, trigger, player) {
						const target = event.target;
						const num = lib.skill.qmsgswkjsgj_mbcmfangzhu_backup.num;
						switch (num) {
							case 1:
								var type = [];
								for (var i of lib.inpile) {
									if (get.type2(i) && !type.includes(get.type2(i))) {
										type.push(get.type2(i));
									}
								}
								// type.push('cancel2')
								var relu = await player.chooseControl(type).set('prompt', '选择一个类型').forResult();
								if (relu != 'cancel2') {
									target.addTempSkill('qmsgswkjsgj_mbcmfangzhu_ban', { player: 'phaseEnd' });
									target.markAuto('qmsgswkjsgj_mbcmfangzhu_ban', [relu.control]);
									lib.skill.qmsgswkjsgj_mbcmfangzhu_ban.init(target, 'qmsgswkjsgj_mbcmfangzhu_ban');
								}
								break;
							case 2:
								target.addTempSkill('qmsgswkjsgj_mbcmfangzhu_baiban', { player: 'phaseEnd' });
								break;
						}
					},
					ai: {
						result: {
							target(player, target) {
								switch (lib.skill.mbcmfangzhu_backup.num) {
									case 1:
										return -target.countCards('h', (card) => get.type(card) != 'trick') - 1;
									case 2:
										return -target.getSkills(null, null, false).reduce((sum, skill) => {
											return sum + Math.max(get.skillRank(skill, 'out'), get.skillRank(skill, 'in'));
										}, 0);
								}
							},
						},
					},
				};
			},
			prompt(links, player) {
				const str = '###放逐###';
				switch (links[0]) {
					case 1:
						return str + '令一名其他角色于手牌中只能使用一种类型牌直到其回合结束';
					case 2:
						return str + '令一名其他角色的非Charlotte技能失效直到其回合结束';
				}
			},
		},
		ai: {
			order: 10,
			result: {
				player(player) {
					return game.hasPlayer((current) => get.attitude(player, current) < 0) ? 1 : 0;
				},
			},
		},
		subSkill: {
			backup: {},
			baiban: {
				init(player, skill) {
					player.addSkillBlocker(skill);
					player.addTip(skill, '放逐 技能失效');
				},
				onremove(player, skill) {
					player.removeSkillBlocker(skill);
					player.removeTip(skill);
				},
				inherit: 'baiban',
				marktext: '逐',
			},
			ban: {
				init(player, skill) {
					let storage = player.getStorage(skill);
					if (storage.length) {
						player.addTip(skill, '放逐 限' + (storage.length === 1 ? get.translation(storage[0])[0] : '手牌'));
					}
				},
				onremove(player, skill) {
					player.removeTip(skill);
					delete player.storage[skill];
				},
				charlotte: true,
				mark: true,
				marktext: '禁',
				intro: {
					markcount: () => 0,
					content(storage) {
						if (storage.length > 1) {
							return '不能使用手牌';
						}
						return '不能使用手牌中的非' + get.translation(storage[0]) + '牌';
					},
				},
				mod: {
					cardEnabled(card, player) {
						const storage = player.getStorage('qmsgswkjsgj_mbcmfangzhu_ban');
						const hs = player.getCards('h'),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && !storage.includes(get.type2(card))) {
							return false;
						}
					},
					cardSavable(card, player) {
						const storage = player.getStorage('qmsgswkjsgj_mbcmfangzhu_ban');
						const hs = player.getCards('h'),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && !storage.includes(get.type2(card))) {
							return false;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_mbjuejin: {
		audio: 'mbjuejin',
		persevereSkill: true,
		enable: 'phaseUse',
		limited: true,
		skillAnimation: true,
		animationColor: 'thunder',
		filterCard: () => false,
		selectCard: [-1, -2],
		filterTarget: true,
		selectTarget: -1,
		multiline: true,
		async contentBefore(event, trigger, player) {
			game.broadcastAll(() => {
				_status.tempMusic = 'effect_caomaoBJM';
				game.playBackgroundMusic();
			});
			player.changeSkin({ characterName: 'qmsgswkjsgj_re_mb_caomao' }, 'qmsgswkjsgj_re_mb_caomao_shadow');
			player.awakenSkill(event.skill);
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
				} else {
					await target.recover(num);
				}
			}
			if (delt > 0) {
				await target.changeHujia(num + (player == target ? 2 : 0), null, true);
			} else if (player == target) {
				await target.changeHujia(2, null, true);
			}
		},
		async contentAfter(event, trigger, player) {
			game.addGlobalSkill('mbjuejin_xiangsicunwei');
			player.$fullscreenpop('向死存魏！', 'thunder');
			const cards = ['cardPile', 'discardPile'].map((pos) => Array.from(ui[pos].childNodes)).flat();
			const filter = (card) => ['shan', 'tao', 'jiu'].includes(card.name);
			const cardx = cards.filter(filter);
			if (cardx.length) {
				await game.cardsGotoSpecial(cardx);
				game.log(cardx, '被移出了游戏');
			}
			for (const target of game.filterPlayer()) {
				const sishis = target.getCards('hej', filter);
				if (sishis.length) {
					target.$throw(sishis);
					game.log(sishis, '被移出了游戏');
					await target.lose(sishis, ui.special);
				}
			}
		},
		ai: {
			order: 0.1,
			result: {
				player(player) {
					let eff = 1;
					game.countPlayer((current) => {
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
			xiangsicunwei: {
				trigger: {
					global: ['loseAfter', 'equipAfter', 'loseAsyncAfter', 'cardsDiscardAfter'],
				},
				forced: true,
				silent: true,
				firstDo: true,
				filter(event, player) {
					const nameList = ['shan', 'tao', 'jiu'];
					return event.getd().some((card) => {
						return nameList.includes(get.name(card, false)) && get.position(card, true) === 'd';
					});
				},
				async content(event, trigger, player) {
					const nameList = ['shan', 'tao', 'jiu'];
					const cards = trigger.getd().filter((card) => {
						return nameList.includes(get.name(card, false)) && get.position(card, true) === 'd';
					});
					await game.cardsGotoSpecial(cards);
					game.log(cards, '被移出了游戏');
				},
			},
		},
	},

	//手杀差异化孙鲁育
	qmsgswkjsgj_mbmeibu: {
		audio: 'meibu',
		trigger: {
			global: 'phaseUseBegin',
		},
		filter(event, player) {
			return event.player != player && event.player.isIn();
		},
		// direct: true,
		derivation: ['qmsgswkjsgj_mbzhixi'],
		check(event, player) {
			if (get.attitude(player, event.player) >= 0) {
				return false;
			}
			var e2 = player.getEquip(2);
			if (e2) {
				if (e2.name == 'tengjia' || e2.name == 'rewrite_tengjia') {
					return true;
				}
				if (e2.name == 'bagua' || e2.name == 'rewrite_bagua') {
					return true;
				}
			}
			return event.player.countCards('h') > event.player.hp;
		},
		content() {
			var target = trigger.player;
			player.line(target, 'green');
			target.addTempSkills('qmsgswkjsgj_mbzhixi', 'phaseUseAfter');
			target.addTempSkill('qmsgswkjsgj_mbmeibu_range', 'phaseUseAfter');
			target.markAuto('qmsgswkjsgj_mbmeibu_range', player);
			target.markSkillCharacter('qmsgswkjsgj_mbmeibu', player, '魅步', '锁定技。出牌阶段，你使用牌时需弃置一张手牌，若你于此阶段使用过的牌数不小于X，你不能使用牌（X为你的体力值）；当你使用锦囊牌时，你结束此阶段；你使用装备牌后，本回合手牌上限-1。');
		},
		ai: {
			expose: 0.2,
		},
		subSkill: {
			range: {
				onremove: true,
				charlotte: true,
				mod: {
					globalFrom(from, to, num) {
						if (from.getStorage('qmsgswkjsgj_mbmeibu_range').includes(to)) {
							return -Infinity;
						}
					},
				},
				sub: true,
			},
		},
	},
	qmsgswkjsgj_mbmumu: {
		audio: 'mumu',
		trigger: {
			player: 'phaseUseBegin',
		},
		filter(event, player) {
			return game.hasPlayer((current) => {
				if (current == player) {
					return current.getEquips(2).length > 0;
				}
				return current.countCards('hje') > 0;
			});
		},
		direct: true,
		content() {
			'step 0';
			player
				.chooseTarget(get.prompt('qmsgswkjsgj_mbmumu'), '弃置一名其他角色区域内的一张牌，或者获得一名角色装备区内的防具牌', function (card, player, target) {
					if (target == player) {
						return target.getEquips(2).length > 0;
					}
					return target.countCards('hje') > 0;
				})
				.set('ai', function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target);
					if (target.getEquip(2) && player.hasEmptySlot(2)) {
						return -2 * att;
					}
					return -att;
				});
			('step 1');
			if (result.bool && result.targets && result.targets.length) {
				event.target = result.targets[0];
				player.logSkill('qmsgswkjsgj_mbmumu', event.target);
				player.line(event.target, 'green');
				var e = event.target.getEquips(2);
				event.e = e;
				if (target == player) {
					event.choice = '获得一张防具牌';
				} else if (e.length > 0) {
					player.chooseControl('弃置一张牌', '获得一张防具牌').set('ai', function () {
						if (_status.event.player.getEquips(2).length > 0) {
							return '弃置一张牌';
						}
						return '获得一张防具牌';
					});
				} else {
					event.choice = '弃置一张牌';
				}
			} else {
				event.finish();
			}
			('step 2');
			var choice = event.choice || result.control;
			if (choice == '弃置一张牌') {
				player.discardPlayerCard(event.target, 'hje', true);
			} else {
				if (event.e) {
					player.gain(event.e, event.target, 'give', 'bySelf');
					// player.addTempSkill("new_mumu_notsha");
				}
			}
		},
		subSkill: {
			notsha: {
				mark: true,
				intro: {
					content: '不能使用【杀】',
				},
				charlotte: true,
				mod: {
					cardEnabled(card) {
						if (card.name == 'sha') {
							return false;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_mbzhixi: {
		mod: {
			cardEnabled(card, player) {
				if (player.countMark('qmsgswkjsgj_mbzhixi') >= player.hp) {
					return false;
				}
			},
			cardUsable(card, player) {
				if (player.countMark('qmsgswkjsgj_mbzhixi') >= player.hp) {
					return false;
				}
			},
			cardSavable(card, player) {
				if (player.countMark('qmsgswkjsgj_mbzhixi') >= player.hp) {
					return false;
				}
			},
		},
		trigger: {
			player: 'useCard1',
		},
		forced: true,
		popup: false,
		firstDo: true,
		init(player, skill) {
			player.storage[skill] = 0;
			var evt = _status.event.getParent('phaseUse');
			if (evt && evt.player == player) {
				player.getHistory('useCard', function (evtx) {
					if (evtx.getParent('phaseUse') == evt) {
						player.storage[skill]++;
					}
				});
			}
		},
		onremove(player) {
			player.unmarkSkill('qmsgswkjsgj_mbmeibu');
			delete player.storage.qmsgswkjsgj_mbzhixi;
		},
		content() {
			player.addMark('qmsgswkjsgj_mbzhixi', 1, false);
			player.addTempSkill('qmsgswkjsgj_mbzhixi_clear', 'phaseChange');
			if (get.type2(trigger.card) == 'trick') {
				var evt = trigger.getParent('phaseUse');
				if (evt && evt.player == player) {
					evt.skipped = true;
					game.log(player, '结束了出牌阶段');
				}
			}
		},
		group: ['qmsgswkjsgj_mbzhixi_discard', 'qmsgswkjsgj_mbzhixi_maxHand'],
		subSkill: {
			clear: {
				charlotte: true,
				onremove(player) {
					player.clearMark('qmsgswkjsgj_mbzhixi', false);
				},
			},
			discard: {
				trigger: {
					player: 'useCard',
				},
				forced: true,
				filter(event, player) {
					return true;
				},
				content() {
					player.chooseToDiscard('h', true);
				},
				ai: {
					neg: true,
					nokeep: true,
				},
			},
			maxHand: {
				trigger: {
					player: 'useCardAfter',
				},
				forced: true,
				filter(event, player) {
					return get.type(event.card) == 'equip';
				},
				content() {
					player.addMark('qmsgswkjsgj_mbzhixi_maxHand', 1, false);
				},
				mark: true,
				intro: {
					markcount: '-$',
					content: '手牌上限减$',
				},
				onremove(player) {
					player.clearMark('qmsgswkjsgj_mbzhixi_maxHand');
				},
			},
		},
		ai: {
			presha: true,
			pretao: true,
			neg: true,
			nokeep: true,
		},
	},

	//在本体张芝改动至和手杀实战一致之前，我不会再动这个武将一笔
	//书张芝
	// qmsgswkjsgj_mbshiju: {
	// 	audio: 'mbshiju',
	// 	trigger: {
	// 		player: "useCardAfter",
	// 	},
	// 	filter(event, player) {
	// 		const history = game.getAllGlobalHistory("useCard"),
	// 			index = history.indexOf(event);
	// 		if (index <= 0) {
	// 			return false;
	// 		}
	// 		const evt = history[index - 1];
	// 		return get.type2(evt.card) == get.type2(event.card) || get.suit(evt.card) == get.suit(event.card);
	// 	},
	// 	forced: true,
	// 	async content(event, trigger, player) {
	// 		const history = game.getAllGlobalHistory("useCard"),
	// 			index = history.indexOf(trigger);
	// 		if (index <= 0) {
	// 			return;
	// 		}
	// 		const evt = history[index - 1];
	// 		const bool1 = get.type2(evt.card) == get.type2(trigger.card),
	// 			bool2 = get.suit(evt.card) == get.suit(trigger.card),
	// 			bool3 = get.name(evt.card) == get.name(trigger.card);
	// 		if (bool1) {
	// 			await player.gain(get.cards(1, true), "gain2", false);
	// 		}
	// 		if (bool2) {
	// 			await player.gain(get.bottomCards(1, true), "gain2", false);
	// 		}
	// 		if (bool1 && bool2) {
	// 			player.popup("乘势", "fire");
	// 			if (bool3) {
	// 				if (!player.hasSkill("mbkubai", null, null, false)) {
	// 					await player.addSkills("mbkubai");
	// 				} else if (player.countMark("mbkubai") < 2) {
	// 					game.log(player, "升级了", "#g【枯白】");
	// 					player.addMark("mbkubai", 1, false);
	// 					get.info("mbkubai").init(player, "mbkubai");
	// 				}
	// 			}
	// 		}
	// 	},
	// 	init(player, skill) {
	// 		player.addSkill(`${skill}_record`);
	// 	},
	// 	onremove(player, skill) {
	// 		player.removeSkill(`${skill}_record`);
	// 	},
	// 	mod: {
	// 		aiOrder(player, card, num) {
	// 			if (typeof card == "object") {
	// 				const evts = game.getAllGlobalHistory("useCard");
	// 				if (evts.length) {
	// 					let evt = evts[evts.length - 1];
	// 					const bool1 = get.type2(evt.card) == get.type2(card),
	// 						bool2 = get.suit(evt.card) == get.suit(card),
	// 						bool3 = get.name(evt.card) == get.name(card);
	// 					if (bool1) {
	// 						num += 10;
	// 					}
	// 					if (bool2) {
	// 						num += 10;
	// 					}
	// 					if (bool1 && bool2 && bool3) {
	// 						num += 30;
	// 					}
	// 				}
	// 				return num;
	// 			}
	// 		},
	// 	},
	// 	derivation: ["mbkubai"],
	// 	subSkill: {
	// 		record: {
	// 			charlotte: true,
	// 			trigger: {
	// 				global: "useCard1",
	// 			},
	// 			async cost(event, trigger, player) {
	// 				get.info(event.skill).init(player, event.skill);
	// 			},
	// 			intro: {
	// 				markcount() {
	// 					const history = game.getAllGlobalHistory("useCard");
	// 					if (history.length) {
	// 						const evt = history.at(-1);
	// 						if (evt) {
	// 							return get.translation(get.suit(evt.card));
	// 						}
	// 					}
	// 					return 0;
	// 				},
	// 				content() {
	// 					const history = game.getAllGlobalHistory("useCard");
	// 					if (history.length) {
	// 						const evt = history.at(-1);
	// 						if (evt) {
	// 							return `
	// 								上一张被使用的牌：${get.translation(evt.card.name)}<br>
	// 								花色：${get.translation(get.suit(evt.card))}<br>
	// 								类型：${get.translation(get.type2(evt.card))}
	// 							`;
	// 						}
	// 					}
	// 					return "无效果";
	// 				},
	// 			},
	// 			init(player, skill) {
	// 				const history = game.getAllGlobalHistory("useCard");
	// 				if (history.length) {
	// 					const evt = history.at(-1);
	// 					if (!evt) {
	// 						return;
	// 					}
	// 					player.addTip(skill, `势举 ${get.translation(evt.card.name)}${get.translation(get.suit(evt.card))}`);
	// 					player.markSkill(skill);
	// 					game.broadcastAll(
	// 						(evt, player) => {
	// 							const mark = player.marks.mbshiju_record;
	// 							if (mark) {
	// 								mark.firstChild.innerHTML = get.translation(get.type2(evt.card));
	// 							}
	// 						},
	// 						evt,
	// 						player
	// 					);
	// 				}
	// 			},
	// 			onremove(player, skill) {
	// 				player.removeTip(skill);
	// 			},
	// 		},
	// 	},
	// },
	//神太史慈
	qmsgswkjsgj_dulie: {
		audio: 'dulie',
		trigger: { target: 'useCardToTarget' },
		forced: true,
		logTarget: 'player',
		filter(event, player) {
			return event.card.name == 'sha';
		},
		content() {
			'step 0';
			player.judge(function (result) {
				if (get.color(result) == 'red') {
					return 2;
				}
				return -1;
			}).judge2 = function (result) {
				return result.bool;
			};
			('step 1');
			if (result.bool) {
				trigger.targets.remove(player);
				trigger.getParent().triggeredTargets2.remove(player);
				trigger.untrigger();
			}
		},
		ai: {
			effect: {
				target_use(card, player, target, current, isLink) {
					if (card.name == 'sha' && !isLink && player.hp > target.hp) {
						return 0.5;
					}
				},
			},
		},
		marktext: '围',
		intro: {
			name: '破围(围)',
			name2: '围',
			content: 'mark',
		},
	},
	qmsgswkjsgj_tspowei: {
		audio: 'tspowei',
		dutySkill: true,
		derivation: 'shenzhu',
		mod: {
			targetInRange(card, player, target) {
				if (target.hasMark('dulie') && card.name == 'sha') {
					return true;
				}
			},
		},
		group: ['qmsgswkjsgj_tspowei_init', 'qmsgswkjsgj_tspowei_move', 'qmsgswkjsgj_tspowei_achieve', 'qmsgswkjsgj_tspowei_fail', 'qmsgswkjsgj_tspowei_use', 'qmsgswkjsgj_tspowei_remove'],
		subSkill: {
			remove: {
				audio: 'tspowei3.mp3',
				trigger: { global: 'damageEnd' },
				filter(event, player) {
					return event.player && event.player.isIn() && event.player.hasMark('dulie');
				},
				// forced: true,
				logTarget: 'player',
				// cost(){
				// 	event.result =
				// },
				prompt: function (event, player) {
					var player = player || _status.event.player;
					var target = event.player;
					return '是否移除' + get.translation(target) + '的【围】标记？';
				},
				content() {
					trigger.player.removeMark('dulie', trigger.player.countMark('dulie'));
				},
			},
			use: {
				audio: 'tspowei3.mp3',
				trigger: { global: 'phaseBegin' },
				direct: true,
				filter(event, player) {
					return event.player != player && event.player.hasMark('dulie') && (player.countCards('h') > 0 || (player.hp >= event.player.hp && event.player.countCards('h') > 0));
				},
				content() {
					'step 0';
					var list = [],
						target = trigger.player,
						choiceList = ['对其造成1点伤害', '获得其一张手牌'];
					event.target = target;
					if (true) {
						list.push('选项一');
					} else {
						choiceList[0] = '<span style="opacity:0.5">' + choiceList[0] + '</span>';
					}
					if (player.hp >= target.hp && target.countCards('h') > 0) {
						list.push('选项二');
					} else {
						choiceList[1] = '<span style="opacity:0.5">' + choiceList[1] + '</span>';
					}
					if (list.length > 0) {
						list.push('背水！');
					}
					player
						.chooseControl(list, 'cancel2')
						.set('prompt', get.prompt('qmsgswkjsgj_tspowei', target))
						.set('choiceList', choiceList)
						.set('ai', function () {
							var a = false,
								b = false;
							var evt = _status.event.getParent();
							if (
								// evt.player.hasCard(function (card) {
								// 	return lib.filter.cardDiscardable(card, evt.player, "tspowei_use") && get.value(card, evt.player) < 7;
								// }, "h") &&
								get.damageEffect(evt.target, evt.player, evt.player) > 0
							) {
								a = true;
							}
							if (evt.player.hp >= evt.target.hp && evt.target.countCards('h') > 0 && get.attitude(evt.player, evt.target) <= 0 && !evt.target.hasSkillTag('noh')) {
								b = true;
							}
							if (a && b) {
								return '背水！';
							} else if (a) {
								return '选项一';
							} else if (b) {
								return '选项二';
							}
							return 'cancel2';
						});
					('step 1');
					if (result.control != 'cancel2') {
						if (result.control == '选项二' || result.control == '背水！') {
							player.logSkill('tspowei_use', target);
							player.gainPlayerCard(target, 'h', true);
							if (result.control != '背水！') event.goto(3);
						}
					} else {
						event.finish();
					}
					('step 2');
					// player.chooseToDiscard("h", true).logSkill = ["tspowei_use", target];
					// if (get.mode() != "identity" || player.identity != "nei") {
					// 	player.addExpose(0.2);
					// }
					player.logSkill('qmsgswkjsgj_tspowei_use', target);
					target.damage();
					('step 3');
					player.addTempSkill('qmsgswkjsgj_tspowei_inRange');
				},
				ai: { expose: 0.2 },
			},
			inRange: {
				charlotte: true,
				mod: {
					inRangeOf(from, to) {
						if (from == _status.currentPhase) {
							return true;
						}
					},
				},
			},
			init: {
				audio: 'tspowei3.mp3',
				trigger: {
					global: 'phaseBefore',
					player: 'enterGame',
				},
				forced: true,
				filter(event, player) {
					return event.name != 'phase' || game.phaseNumber == 0;
				},
				logTarget(event, player) {
					return game.filterPlayer((current) => current != player && !current.hasMark('dulie'));
				},
				content() {
					var list = game.filterPlayer((current) => current != player && !current.hasMark('dulie')).sortBySeat();
					for (var i of list) {
						i.addMark('dulie', 1, false);
					}
				},
			},
			move: {
				audio: 'tspowei3.mp3',
				trigger: { player: 'phaseBegin' },
				forced: true,
				filter(event, player) {
					return game.hasPlayer((current) => current != player && current.hasMark('dulie'));
				},
				content() {
					'step 0';
					var list = game.filterPlayer((current) => current != player && current.hasMark('dulie')).sortBySeat();
					// var map = {};
					for (var i of list) {
						var num = i.countMark('dulie');
						i.removeMark('dulie', num);
						// map[i.playerid] = num;
					}
					// for (var i of list) {
					// 	var next = i.next;
					// 	if (next == player) {
					// 		next = next.next;
					// 	}
					// 	next.addMark("dulie", map[i.playerid]);
					// }
					player.chooseTarget(list.length, true, '请重新分配其他角色的“围”标记');
					('strp 1');
					if (result.bool) {
						var targets = result.targets;
						targets.sortBySeat();
						for (var i = 0; i < targets.length; i++) {
							targets[i].addMark('dulie');
						}
					}
				},
			},
			achieve: {
				audio: 'tspowei1.mp3',
				trigger: { player: 'phaseBegin' },
				forced: true,
				skillAnimation: true,
				animationColor: 'metal',
				filter(event, player) {
					return (
						game.countPlayer(function (current) {
							return current.hasMark('dulie');
						}) <= player.maxHp
					);
				},
				content() {
					game.log(player, '成功完成使命');
					player.awakenSkill('qmsgswkjsgj_tspowei');
					player.addSkills('qmsgswkjsgj_shenzhu');
				},
			},
			fail: {
				audio: 'tspowei2.mp3',
				trigger: { player: 'dying' },
				forced: true,
				content() {
					'step 0';
					game.log(player, '使命失败');
					player.awakenSkill('qmsgswkjsgj_tspowei');
					if (player.hp < player.maxHp) {
						player.recover(player.maxHp - player.hp);
					}
					// "step 1";
					// var num = player.countCards("e");
					// if (num > 0) {
					// 	player.chooseToDiscard("e", true, num);
					// }
				},
			},
		},
	},
	qmsgswkjsgj_shenzhu: {
		audio: 'shenzhu',
		trigger: { player: 'useCardAfter' },
		forced: true,
		filter(event, player) {
			return event.card.name == 'sha' && event.card.isCard && event.cards.length == 1;
		},
		content() {
			'step 0';
			player
				.chooseControl()
				.set('choiceList', ['摸一张牌，且本回合使用【杀】的次数上限+1', '摸体力上限张牌，且本回合不能再使用【杀】'])
				.set('ai', () => (_status.event.player.hasSha() ? 0 : 1));
			('step 1');
			if (result.index == 0) {
				player.draw();
				player.addTempSkill('qmsgswkjsgj_shenzhu_more');
				player.addMark('qmsgswkjsgj_shenzhu_more', 1, false);
			} else {
				player.draw(player.maxHp);
				player.addTempSkill('qmsgswkjsgj_shenzhu_less');
			}
		},
		subSkill: {
			more: {
				charlotte: true,
				onremove: true,
				mod: {
					cardUsable(card, player, num) {
						if (card.name == 'sha') {
							return num + player.countMark('qmsgswkjsgj_shenzhu_more');
						}
					},
				},
			},
			less: {
				charlotte: true,
				mod: {
					cardEnabled(card) {
						if (card.name == 'sha') {
							return false;
						}
					},
				},
			},
		},
	},

	qmsgswkjsgj_shentianyi: {
		audio: 'tianyi',
		audioname: ['re_taishici'],
		enable: 'phaseUse',
		usable: 1,
		filterTarget(card, player, target) {
			return player.canCompare(target);
		},
		filter(event, player) {
			return player.countCards('h') > 0;
		},
		async content(event, trigger, player) {
			const { bool } = await player.chooseToCompare(event.target).forResult();
			if (bool) {
				player.addTempSkill('qmsgswkjsgj_shentianyi2');
			}
		},
		ai: {
			order(name, player) {
				const cards = player.getCards('h');
				if (player.countCards('h', 'sha') == 0) {
					return 1;
				}
				for (let i = 0; i < cards.length; i++) {
					if (cards[i].name != 'sha' && get.number(cards[i]) > 11 && get.value(cards[i]) < 7) {
						return 9;
					}
				}
				return get.order({ name: 'sha' }) - 1;
			},
			result: {
				player(player) {
					if (player.countCards('h', 'sha') > 0) {
						return 0.6;
					}
					const num = player.countCards('h');
					if (num > player.hp) {
						return 0;
					}
					if (num == 1) {
						return -2;
					}
					if (num == 2) {
						return -1;
					}
					return -0.7;
				},
				target(player, target) {
					const num = target.countCards('h');
					if (num == 1) {
						return -1;
					}
					if (num == 2) {
						return -0.7;
					}
					return -0.5;
				},
			},
			threaten: 1.3,
		},
	},
	qmsgswkjsgj_shentianyi2: {
		mod: {
			targetInRange(card, player, target, now) {
				if (card.name == 'sha') {
					return true;
				}
			},
			selectTarget(card, player, range) {
				if (card.name == 'sha' && range[1] != -1) {
					range[1]++;
				}
			},
			cardUsable(card, player, num) {
				if (card.name == 'sha') {
					return num + 1;
				}
			},
		},
		charlotte: true,
	},

	qmsgswkjsgj_shenhanzhan: {
		audio: 'hanzhan',
		trigger: {
			global: 'chooseToCompareBegin',
		},
		filter(event, player) {
			if (player == event.player) {
				return true;
			}
			if (event.targets) {
				return event.targets.includes(player);
			}
			return player == event.target;
		},
		logTarget(event, player) {
			if (player != event.player) {
				return event.player;
			}
			return event.targets || event.target;
		},
		prompt2(event, player) {
			return '令其改为使用随机的手牌进行拼点';
		},
		check(trigger, player) {
			var num = 0;
			var targets = player == trigger.player ? (trigger.targets ? trigger.targets.slice(0) : [trigger.target]) : [trigger.player];
			while (targets.length) {
				var target = targets.shift();
				if (target.getCards('h').length > 1) {
					num -= get.attitude(player, target);
				}
			}
			return num > 0;
		},
		content() {
			var targets = player == trigger.player ? (trigger.targets ? trigger.targets.slice(0) : [trigger.target]) : [trigger.player];
			if (!trigger.fixedResult) {
				trigger.fixedResult = {};
			}
			while (targets.length) {
				var target = targets.shift();
				var hs = target.getCards('h');
				if (hs.length) {
					trigger.fixedResult[target.playerid] = hs.randomGet();
				}
			}
		},
		group: 'qmsgswkjsgj_shenhanzhan_gain',
		subfrequent: ['gain'],
	},
	qmsgswkjsgj_shenhanzhan_gain: {
		trigger: {
			global: 'chooseToCompareAfter',
		},
		audio: 'hanzhan',
		sourceSkill: 'qmsgswkjsgj_shenhanzhan',
		filter(event, player) {
			if (event.preserve) {
				return false;
			}
			if (player != event.player && player != event.target && (!event.targets || !event.targets.includes(player))) {
				return false;
			}
			for (var i of event.lose_list) {
				if (Array.isArray(i[1])) {
					for (var j of i[1]) {
						if (get.position(j, true) == 'o') {
							return true;
						}
					}
				} else {
					var j = i[1];
					if (get.position(j, true) == 'o') {
						return true;
					}
				}
			}
			return false;
		},
		frequent: true,
		prompt2(event, player) {
			var cards = [],
				max = 0;
			for (var i of event.lose_list) {
				if (Array.isArray(i[1])) {
					for (var j of i[1]) {
						if (get.position(j, true) == 'o') {
							var num = get.number(j, i[0]);
							if (num > max) {
								cards = [];
								max = num;
							}
							if (num == max) {
								cards.push(j);
							}
						}
					}
				} else {
					var j = i[1];
					if (get.position(j, true) == 'o') {
						var num = get.number(j, i[0]);
						if (num > max) {
							cards = [];
							max = num;
						}
						if (num == max) {
							cards.push(j);
						}
					}
				}
			}
			return '获得' + get.translation(cards);
		},
		content() {
			var cards = [],
				max = 0;
			for (var i of trigger.lose_list) {
				if (Array.isArray(i[1])) {
					for (var j of i[1]) {
						if (get.position(j, true) == 'o') {
							var num = get.number(j, i[0]);
							if (num > max) {
								cards = [];
								max = num;
							}
							if (num == max) {
								cards.push(j);
							}
						}
					}
				} else {
					var j = i[1];
					if (get.position(j, true) == 'o') {
						var num = get.number(j, i[0]);
						if (num > max) {
							cards = [];
							max = num;
						}
						if (num == max) {
							cards.push(j);
						}
					}
				}
			}
			player.gain(cards, 'gain2');
		},
	},

	qmsgswkjsgj_kujian: {
		enable: 'phaseUse',
		filterCard: true,
		selectCard: [1, Infinity],
		usable: 1,
		discard: false,
		lose: false,
		delay: false,
		filterTarget: lib.filter.notMe,
		global: 'qmsgswkjsgj_kujian_ai',
		/**
		 * @param {Card} card
		 */
		check(card) {
			if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
				return 0;
			}
			if (!ui.selected.cards.length && card.name == 'du') {
				return 20;
			}
			var player = get.owner(card);
			if (ui.selected.cards.length >= Math.max(2, player.countCards('h') - player.hp)) {
				return 0;
			}
			if (player.hp == player.maxHp || player.storage.jsprende < 0 || player.countCards('h') <= 1) {
				// @ts-expect-error 可选参文档注释里不加可选这一块
				var players = game.filterPlayer();
				for (var i = 0; i < players.length; i++) {
					if (players[i].hasSkill('haoshi') && !players[i].isTurnedOver() && !players[i].hasJudge('lebu') && get.attitude(player, players[i]) >= 3 && get.attitude(players[i], player) >= 3) {
						return 11 - get.value(card);
					}
				}
				if (player.countCards('h') > player.hp) {
					return 10 - get.value(card);
				}
				if (player.countCards('h') > 2) {
					return 6 - get.value(card);
				}
				return -1;
			}
			return 10 - get.value(card);
		},
		content() {
			// @ts-expect-error
			player.give(cards, target).gaintag.add('qmsgswkjsgj_kujian');
			// @ts-expect-error
			player.addSkill('qmsgswkjsgj_kujian_draw');
			// @ts-expect-error
			target.addSkill('qmsgswkjsgj_kujian_maxHand');
		},
		ai: {
			expose: 0.2,
			order: 7,
			result: {
				target(player, target) {
					if (target.hasSkillTag('nogain')) {
						return 0;
					}
					if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
						if (target.hasSkillTag('nodu')) {
							return 0;
						}
						return -10;
					}
					if (target.hasJudge('lebu')) {
						return 0;
					}
					var nh = target.countCards('h');
					var np = player.countCards('h');
					if (player.hp == player.maxHp || player.storage.jsprende < 0 || player.countCards('h') <= 1) {
						if (nh >= np - 1 && np <= player.hp && !target.hasSkill('haoshi')) {
							return 0;
						}
					}
					return Math.max(1, 5 - nh);
				},
			},
			effect: {
				/**
				 *
				 * @param {Card} card
				 * @param {Player} player
				 * @param {Player} target
				 * @returns
				 */
				// @ts-ignore ...我不想说话了
				target_use(card, player, target) {
					if (player == target && get.type(card) == 'equip') {
						if (
							player.countCards('e', {
								subtype: get.subtype(card),
							})
						) {
							if (
								game.hasPlayer(function (current) {
									return current != player && get.attitude(player, current) > 0;
								})
							) {
								return 0;
							}
						}
					}
				},
			},
		},
		subSkill: {
			draw: {
				trigger: { global: ['useCardAfter', 'respondAfter'] },
				forced: true,
				logTarget: 'player',
				charlotte: true,
				filter(event, player) {
					return player !== event.player;
				},
				getIndex(event) {
					let num = 0;
					event.player.getHistory(
						'lose',
						/**
						 * @param {GameEvent & { relatedEvent: GameEvent; gaintag_map: { [x: string]: string[] } } } evt
						 * 我没啥想说的,真的
						 */
						(evt) => {
							const evtx = evt.relatedEvent || evt.getParent();
							if (event != evtx) {
								return false;
							}
							for (let i in evt.gaintag_map) {
								if (evt.gaintag_map[i].includes('qmsgswkjsgj_kujian')) {
									num++;
								}
							}
						},
					);
					return num;
				},
				async content(_event, trigger, player) {
					await game.asyncDraw([player, trigger.player], 2);
					await game.delayx();
				},
			},
			maxHand: {
				charlotte: true,
				mod: {
					ignoredHandcard(card) {
						if (card.hasGaintag('qmsgswkjsgj_kujian')) return true;
					},
					cardDiscardable(card, _player, name) {
						if (name == 'phaseDiscard' && card.hasGaintag('qmsgswkjsgj_kujian')) return false;
					},
				},
			},
			ai: {
				charlotte: true,
				ai: {
					effect: {
						/**
						 * @param {VCard} card
						 * @param {Player} player
						 */
						// @ts-expect-error 你知道的,我不喜欢说话
						player_use(card, player) {
							if (
								card.cards &&
								card.cards.some((i) => i.hasGaintag('qmsgswkjsgj_kujian')) &&
								game.hasPlayer((current) => {
									return get.attitude(player, current) > 0;
								})
							) {
								return [1, 1];
							}
						},
					},
				},
				mod: {
					aiOrder(player, card, num) {
						if (
							get.itemtype(card) == 'card' &&
							card.hasGaintag('qmsgswkjsgj_kujian') &&
							game.hasPlayer((current) => {
								return get.attitude(player, current) > 0;
							})
						) {
							return num + 0.5;
						}
					},
					aiValue(player, card, num) {
						if (
							get.itemtype(card) == 'card' &&
							card.hasGaintag('qmsgswkjsgj_kujian') &&
							game.hasPlayer((current) => {
								return get.attitude(player, current) > 0;
							})
						) {
							return num + 0.5;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_ruilian: {
		audio: 'twruilian',
		trigger: { global: 'roundStart' },
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill))
				.set('ai', (target) => {
					let player = _status.event.player,
						att = get.attitude(player, target),
						eff = att / (player == target ? 2 : 1) + 1;
					if (att >= 0) {
						if (target.hasSkill('yongsi')) {
							return eff * 5;
						}
						if (target.hasSkill('zhiheng') || target.hasSkill('rezhiheng')) {
							return eff * 4;
						}
						if (target.hasSkill('rekurou')) {
							return eff * 3;
						}
						if (target.hasSkill('xinlianji') || target.hasSkill('dclianji')) {
							return eff * 2;
						}
						if (target.needsToDiscard()) {
							return eff * 1.5;
						}
						return eff;
					}
					return 0;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			player.addSkill('qmsgswkjsgj_ruilian_target');
			player.markAuto('qmsgswkjsgj_ruilian_target', [target]);
		},
		subSkill: {
			target: {
				onremove: true,
				intro: { content: '已选择$' },
				trigger: { global: 'phaseEnd' },
				filter(event, player) {
					return player.getStorage('qmsgswkjsgj_ruilian_target').includes(event.player) || player == event.player;
				},
				direct: true,
				charlotte: true,
				async content(event, trigger, player) {
					// const target = trigger.player;
					var targets = player.getStorage('qmsgswkjsgj_ruilian_target');
					let cards = [];
					// player.removeSkill("qmsgswkjsgj_ruilian_target");
					// target.getHistory("lose", evt => {
					// 	if (evt.type == "discard") {
					// 		cards.addArray(evt.cards2);
					// 	}
					// });
					// if (!cards.length) {
					// 	return;
					// }
					let list = [];
					for (let type of ['basic', 'trick', 'equip']) {
						for (let card of cards) {
							if (get.type2(card) == type) {
								list.push(type);
								break;
							}
						}
					}
					list.push('cancel2');
					const result = await player
						.chooseControl(list)
						.set('prompt', '睿敛：是否与' + get.translation(targets) + '各获得一种类型的牌？')
						.set('ai', function () {
							let player = _status.event.player,
								list = _status.event.controls;
							if (player.hp <= 3 && !player.countCards('h', { name: ['shan', 'tao'] }) && list.includes('basic')) {
								return 'basic';
							}
							if (player.countCards('he', { type: 'equip' }) < 2 && list.includes('equip')) {
								return 'equip';
							}
							if (list.includes('trick')) {
								return 'trick';
							}
							return list.remove('cancel2').randomGet();
						})
						.forResult();
					if (result.control != 'cancel2') {
						player.logSkill('qmsgswkjsgj_ruilian_target', targets);
						let type = result.control;
						list = game.filterPlayer((c) => targets.includes(c) || c == player).sortBySeat(_status.currentPhase);
						cards = [];
						for (let current of list) {
							let card = get.discardPile(function (card) {
								return get.type2(card) == type && !cards.includes(card);
							});
							if (card) {
								cards.push(card);
								await current.gain(card, 'gain2');
							}
						}
					}
				},
			},
		},
	},

	//界张嫙
	qmsgswkjsgj_re_shezang: {
		audio: 'shezang',
		// round: 1,
		trigger: { global: 'dying' },
		frequent: true,
		filter(event, player) {
			// return event.player == player || player == _status.currentPhase;
			return true;
		},
		content() {
			var cards = [];
			for (var i of lib.suit) {
				var card = get.cardPile2(function (card) {
					return get.suit(card, false) == i;
				});
				if (card) {
					cards.push(card);
				}
			}
			if (cards.length) {
				player.gain(cards, 'gain2');
			}
		},
	},
	//界陈式
	qmsgswkjsgj_re_qingbei: {
		audio: 'qingbei',
		trigger: {
			global: 'roundStart',
			player: 'useCardAfter',
		},
		filter(event, player) {
			if (event.name != 'useCard') {
				return true;
			}
			if (!player.getStorage('qmsgswkjsgj_re_qingbei_effect').length) {
				return false;
			}
			const suit = get.suit(event.card);
			if (!suit) {
				return false;
			}
			return suit !== 'none';
		},
		async cost(event, trigger, player) {
			if (trigger.name == 'useCard') {
				event.result = {
					bool: true,
				};
				return;
			}
			const result = await player
				.chooseButton([`###${get.prompt(event.skill)}###<div class='text center'>选择任意个花色，令你本轮不能使用这些花色的牌</div>`, [lib.suit.map((i) => ['', '', 'lukai_' + i]), 'vcard']], [1, 4])
				.set('ai', (button) => {
					const player = get.player(),
						suit = button.link[2].slice(6),
						val = player
							.getCards('hs', { suit: suit })
							.map((card) => {
								return get.value(card) + player.getUseValue(card) / 3;
							})
							.reduce((sum, value) => {
								return sum + value;
							}, 0);
					if (val > 10 && ui.selected.buttons.length > 0) {
						return -1;
					}
					if (val > 6 && ui.selected.buttons.length == 2) {
						return -1;
					}
					if (ui.selected.buttons.length == 3) {
						return -1;
					}
					return 1 + 1 / val;
				})
				.forResult();
			if (result?.bool && result.links?.length) {
				event.result = {
					bool: true,
					cost_data: result.links,
				};
			}
		},
		async content(event, trigger, player) {
			if (trigger.name == 'useCard') {
				await player.draw(player.getStorage('qmsgswkjsgj_re_qingbei_effect').length + 1, 'nodelay');
				return;
			}
			const { name, cost_data: links } = event;
			const suits = links.map((i) => i[2].slice(6)).sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a));
			const skill = `${name}_effect`;
			player.addTempSkill(skill, 'roundStart');
			player.setStorage(skill, suits, true);
			player.addTip(skill, `${get.translation(skill)}${suits.map((i) => get.translation(i)).join('')}`);
		},
		ai: {
			threaten: 2.3,
		},
		subSkill: {
			effect: {
				charlotte: true,
				onremove(player, skill) {
					delete player.storage[skill];
					player.removeTip(skill);
				},
				mark: true,
				intro: {
					content: `本轮内不能使用$花色的牌`,
				},
				mod: {
					cardEnabled(card, player) {
						if (player.getStorage('qmsgswkjsgj_re_qingbei_effect').includes(get.suit(card))) {
							return false;
						}
					},
					cardSavable(card, player) {
						if (player.getStorage('qmsgswkjsgj_re_qingbei_effect').includes(get.suit(card))) {
							return false;
						}
					},
				},
			},
		},
	},

	//滕芳兰
	qmsgswkjsgj_re_dcluochong: {
		audio: 'dcluochong',
		trigger: { global: 'roundStart' },
		filter(event, player) {
			return game.hasPlayer((current) => current.countDiscardableCards(player, 'hej') > 0);
		},
		direct: true,
		async content(event, trigger, player) {
			if (_status.connectMode) {
				game.broadcastAll(function () {
					_status.noclearcountdown = true;
				});
			}
			const lose_list = [];
			let num = 4 - player.countMark('qmsgswkjsgj_re_dcluochong');
			let log = false;
			while (num > 0) {
				const result = await player
					.chooseTarget(get.prompt('qmsgswkjsgj_re_dcluochong'), `弃置任意名角色区域内的累计至多${num}张牌`, (card, player, target) => {
						return target.hasCard((card) => {
							return lib.filter.canBeDiscarded(card, player, target, 'dcluochong');
						}, 'hej');
					})
					.set('ai', (target) => {
						const player = _status.event.player,
							discarded = _status.event.lose_list.find((item) => item[0] == target);
						if (discarded) {
							if (target == player) {
								return 0;
							}
							const num = discarded[1].length;
							if (num > 1 && player.hp + player.hujia > 2) {
								return 0;
							}
						}
						if (target == player) {
							if (ui.cardPile.childNodes.length > 80 && player.hasCard((card) => get.value(card) < 8)) {
								return 20;
							}
							return 0;
						}
						return get.effect(target, { name: 'guohe_copy2' }, player, player);
					})
					.set('lose_list', lose_list)
					.forResult();
				if (result.bool) {
					if (!log) {
						player.logSkill('qmsgswkjsgj_re_dcluochong');
						log = true;
					}
					const target = result.targets[0];
					const { cards } = await player
						.choosePlayerCard(target, true, 'hej', [1, num], `选择弃置${get.translation(target)}区域内的牌`, 'allowChooseAll')
						.set('filterButton', (button) => {
							const card = button.link,
								target = _status.event.target,
								player = get.player();
							return lib.filter.canBeDiscarded(card, player, target, 'qmsgswkjsgj_re_dcluochong');
						})
						.set('lose_list', lose_list)
						.set('ai', (button) => {
							if (ui.selected.buttons.length > 0) {
								return false;
							}
							var val = get.buttonValue(button);
							if (get.attitude(_status.event.player, _status.event.target) > 0) {
								return -val;
							}
							return val;
						})
						.forResult();
					num -= cards.length;
					const index = lose_list.find((item) => item[0] == target);
					if (!index) {
						lose_list.push([target, cards]);
					} else {
						index[1].addArray(cards);
					}
					await target.discard(cards, 'notBySelf').set('discarder', player);
				} else {
					break;
				}
			}
			if (_status.connectMode) {
				game.broadcastAll(function () {
					delete _status.noclearcountdown;
					game.stopCountChoose();
				});
			}
			// if (lose_list.length > 0 && lose_list.some(i => i[1].length > 2)) {
			// 	game.log(player, "可弃置牌数", "#g-1");
			// 	player.addMark("dcluochong", 1, false);
			// }
		},
		ai: {
			threaten: 2.5,
			effect: {
				target(card, player, target, current) {
					if (get.type(card) == 'delay' && current < 0) {
						var current2 = _status.currentPhase;
						if (current2 && current2.getSeatNum() > target.getSeatNum()) {
							return 0.1;
						}
					}
				},
			},
		},
		group: ['qmsgswkjsgj_re_dcluochong_change'],
		subSkill: {
			change: {
				firstDo: true,
				charlotte: true,
				direct: true,
				locked: true,
				trigger: {
					global: ['loseAfter'],
				},
				filter(event, player, name) {
					const evt = event.getParent(2);
					if (evt.name == 'qmsgswkjsgj_re_dcluochong') {
						return true;
					}
				},
				content() {
					var evt = trigger.getParent(2);
					evt.name = 'dcluochong';
				},
			},
		},
	},
	qmsgswkjsgj_re_dcaichen: {
		audio: 'dcaichen',
		// init(player) {
		// 	game.addGlobalSkill("qmsgswkjsgj_re_dcaichen_hit");
		// },
		// onremove(player) {
		// 	if (!game.hasPlayer(current => current.hasSkill("qmsgswkjsgj_re_dcaichen", null, null, false), true)) {
		// 		game.removeGlobalSkill("qmsgswkjsgj_re_dcaichen_hit");
		// 	}
		// },
		trigger: {
			player: ['loseAfter', 'phaseDiscardBefore'],
			// target: "useCardToTargeted",
		},
		filter(event, player, name) {
			if (event.name == 'phaseDiscard') {
				// return ui.cardPile.childNodes.length > 40;
				return true;
			}
			// if (name == "useCardToTargeted") {
			// 	return ui.cardPile.childNodes.length < 40 && get.suit(event.card) == "spade";
			// }
			const evt = event.getParent(2);
			if (evt.name != 'dcluochong' || evt.player != player) {
				return false;
			}
			if (!event.getl(player).cards.length) {
				return false;
			}
			// return ui.cardPile.childNodes.length > 80;
			return true;
		},
		forced: true,
		getIndex(event, player) {
			if (event.name == 'phaseDiscard') return 1;
			return event.getl(player).cards.length;
		},
		content() {
			if (trigger.name.indexOf('lose') == 0) {
				player.draw(2);
			} else if (trigger.name == 'phaseDiscard') {
				trigger.cancel();
				game.log(player, '跳过了弃牌阶段');
			} else {
				player.say('我是怎么进入这条分支的？');
				// trigger.directHit.add(player);
				// game.log(player, "不可响应", trigger.card);
			}
		},
		// subSkill: {
		// 	hit: {
		// 		trigger: { player: "dieAfter" },
		// 		filter(event, player) {
		// 			return !game.hasPlayer(current => current.hasSkill("qmsgswkjsgj_re_dcaichen", null, null, false), true);
		// 		},
		// 		silent: true,
		// 		forceDie: true,
		// 		content() {
		// 			game.removeGlobalSkill("qmsgswkjsgj_re_dcaichen_hit");
		// 		},
		// 		ai: {
		// 			directHit_ai: true,
		// 			skillTagFilter(player, tag, arg) {
		// 				return arg && arg.card && arg.target && arg.target.hasSkill("qmsgswkjsgj_re_dcaichen") && ui.cardPile.childNodes.length < 40 && get.suit(arg.card) === "spade";
		// 			},
		// 		},
		// 	},
		// },
	},
	qmsgswkjsgj_re_dcluochongplus: {
		audio: 'dcluochong',
		trigger: { global: 'roundStart' },
		filter(event, player) {
			return game.hasPlayer((current) => current.countDiscardableCards(player, 'hej') > 0);
		},
		direct: true,
		async content(event, trigger, player) {
			if (_status.connectMode) {
				game.broadcastAll(function () {
					_status.noclearcountdown = true;
				});
			}
			const lose_list = [];
			let num = 5 - player.countMark('qmsgswkjsgj_re_dcluochongplus');
			let log = false;
			while (num > 0) {
				const result = await player
					.chooseTarget(get.prompt('qmsgswkjsgj_re_dcluochongplus'), `弃置任意名角色区域内的累计至多${num}张牌`, (card, player, target) => {
						return target.hasCard((card) => {
							return lib.filter.canBeDiscarded(card, player, target, 'dcluochong');
						}, 'hej');
					})
					.set('ai', (target) => {
						const player = _status.event.player,
							discarded = _status.event.lose_list.find((item) => item[0] == target);
						if (discarded) {
							if (target == player) {
								return 0;
							}
							const num = discarded[1].length;
							if (num > 1 && player.hp + player.hujia > 2) {
								return 0;
							}
						}
						if (target == player) {
							if (ui.cardPile.childNodes.length > 80 && player.hasCard((card) => get.value(card) < 8)) {
								return 20;
							}
							return 0;
						}
						return get.effect(target, { name: 'guohe_copy2' }, player, player);
					})
					.set('lose_list', lose_list)
					.forResult();
				if (result.bool) {
					if (!log) {
						player.logSkill('qmsgswkjsgj_re_dcluochongplus');
						log = true;
					}
					const target = result.targets[0];
					const { cards } = await player
						.choosePlayerCard(target, true, 'hej', [1, num], `选择弃置${get.translation(target)}区域内的牌`, 'allowChooseAll')
						.set('filterButton', (button) => {
							const card = button.link,
								target = _status.event.target,
								player = get.player();
							return lib.filter.canBeDiscarded(card, player, target, 'qmsgswkjsgj_re_dcluochong');
						})
						.set('lose_list', lose_list)
						.set('ai', (button) => {
							if (ui.selected.buttons.length > 0) {
								return false;
							}
							var val = get.buttonValue(button);
							if (get.attitude(_status.event.player, _status.event.target) > 0) {
								return -val;
							}
							return val;
						})
						.forResult();
					num -= cards.length;
					const index = lose_list.find((item) => item[0] == target);
					if (!index) {
						lose_list.push([target, cards]);
					} else {
						index[1].addArray(cards);
					}
					await target.discard(cards, 'notBySelf').set('discarder', player);
				} else {
					break;
				}
			}
			if (_status.connectMode) {
				game.broadcastAll(function () {
					delete _status.noclearcountdown;
					game.stopCountChoose();
				});
			}
			// if (lose_list.length > 0 && lose_list.some(i => i[1].length > 2)) {
			// 	game.log(player, "可弃置牌数", "#g-1");
			// 	player.addMark("dcluochong", 1, false);
			// }
		},
		ai: {
			threaten: 2.5,
			effect: {
				target(card, player, target, current) {
					if (get.type(card) == 'delay' && current < 0) {
						var current2 = _status.currentPhase;
						if (current2 && current2.getSeatNum() > target.getSeatNum()) {
							return 0.1;
						}
					}
				},
			},
		},
		group: ['qmsgswkjsgj_re_dcluochongplus_change'],
		subSkill: {
			change: {
				firstDo: true,
				charlotte: true,
				direct: true,
				locked: true,
				trigger: {
					global: ['loseAfter'],
				},
				filter(event, player, name) {
					const evt = event.getParent(2);
					if (evt.name == 'qmsgswkjsgj_re_dcluochongplus') {
						return true;
					}
				},
				content() {
					var evt = trigger.getParent(2);
					evt.name = 'dcluochong';
				},
			},
		},
	},
	qmsgswkjsgj_re_dcaichenplus: {
		audio: 'dcaichen',
		// init(player) {
		// 	game.addGlobalSkill("qmsgswkjsgj_re_dcaichen_hit");
		// },
		// onremove(player) {
		// 	if (!game.hasPlayer(current => current.hasSkill("qmsgswkjsgj_re_dcaichen", null, null, false), true)) {
		// 		game.removeGlobalSkill("qmsgswkjsgj_re_dcaichen_hit");
		// 	}
		// },
		trigger: {
			player: ['loseAfter', 'phaseDiscardBefore'],
			// target: "useCardToTargeted",
		},
		filter(event, player, name) {
			if (event.name == 'phaseDiscard') {
				// return ui.cardPile.childNodes.length > 40;
				return true;
			}
			// if (name == "useCardToTargeted") {
			// 	return ui.cardPile.childNodes.length < 40 && get.suit(event.card) == "spade";
			// }
			const evt = event.getParent(2);
			if (evt.name != 'dcluochong' || evt.player != player) {
				return false;
			}
			if (!event.getl(player).cards.length) {
				return false;
			}
			// return ui.cardPile.childNodes.length > 80;
			return true;
		},
		forced: true,
		getIndex(event, player) {
			if (event.name == 'phaseDiscard') return 1;
			return event.getl(player).cards.length;
		},
		content() {
			if (trigger.name.indexOf('lose') == 0) {
				player.draw(2);
			} else if (trigger.name == 'phaseDiscard') {
				trigger.cancel();
				game.log(player, '跳过了弃牌阶段');
			} else {
				player.say('我是怎么进入这条分支的？');
				// trigger.directHit.add(player);
				// game.log(player, "不可响应", trigger.card);
			}
		},
		// subSkill: {
		// 	hit: {
		// 		trigger: { player: "dieAfter" },
		// 		filter(event, player) {
		// 			return !game.hasPlayer(current => current.hasSkill("qmsgswkjsgj_re_dcaichen", null, null, false), true);
		// 		},
		// 		silent: true,
		// 		forceDie: true,
		// 		content() {
		// 			game.removeGlobalSkill("qmsgswkjsgj_re_dcaichen_hit");
		// 		},
		// 		ai: {
		// 			directHit_ai: true,
		// 			skillTagFilter(player, tag, arg) {
		// 				return arg && arg.card && arg.target && arg.target.hasSkill("qmsgswkjsgj_re_dcaichen") && ui.cardPile.childNodes.length < 40 && get.suit(arg.card) === "spade";
		// 			},
		// 		},
		// 	},
		// },
	},
	//郑浑
	qmsgswkjsgj_re_dcpitian: {
		audio: 'dcpitian',
		trigger: {
			player: ['loseAfter', 'damageEnd'],
			global: 'loseAsyncAfter',
		},
		forced: true,
		locked: false,
		group: 'qmsgswkjsgj_re_dcpitian_draw',
		filter(event, player) {
			if (event.name == 'damage') {
				return true;
			}
			return event.type == 'discard' && event.getl(player).cards2.length > 0;
		},
		getIndex(event, player) {
			if (event.name == 'damage') {
				return event.num;
			} else {
				if (event.type == 'discard' && event.getl(player).cards2.length > 0) {
					return event.getl(player).cards2.length;
				}
			}
		},
		content() {
			player.addMark('qmsgswkjsgj_re_dcpitian_handcard', 1, false);
			player.addSkill('qmsgswkjsgj_re_dcpitian_handcard');
			game.log(player, '的手牌上限', '#y+1');
		},
		subSkill: {
			draw: {
				audio: 'dcpitian',
				trigger: { player: 'phaseJieshuBegin' },
				filter(event, player) {
					return player.countCards('h') < player.getHandcardLimit();
				},
				prompt2(event, player) {
					return '摸' + get.cnNumber(player.getHandcardLimit() - player.countCards('h')) + '张牌，重置因〖辟田〗增加的手牌上限';
				},
				check(event, player) {
					return player.getHandcardLimit() - player.countCards('h') > Math.min(2, player.hp - 1);
				},
				content() {
					'step 0';
					var num = player.getHandcardLimit() - player.countCards('h');
					if (num > 0) {
						player.draw(num);
					}
					// "step 1";
					// player.removeMark("qmsgswkjsgj_re_dcpitian_handcard", player.countMark("dcpitian_handcard"), false);
					// game.log(player, "重置了", "#g【辟田】", "增加的手牌上限");
				},
			},
			handcard: {
				markimage: 'image/card/handcard.png',
				intro: {
					content(storage, player) {
						return '手牌上限+' + storage;
					},
				},
				charlotte: true,
				mod: {
					maxHandcard(player, num) {
						return num + player.countMark('qmsgswkjsgj_re_dcpitian_handcard');
					},
				},
			},
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (get.tag(card, 'discard')) {
						return 0.9;
					}
					if (get.tag(card, 'damage')) {
						return 0.95;
					}
				},
			},
		},
	},

	//新岩泽(划掉)留赞
	qmsgswkjsgj_re_refenyin: {
		audio: 'refenyin',
		audioname: ['wufan'],
		trigger: { global: ['loseAfter', 'cardsDiscardAfter', 'loseAsyncAfter', 'equipAfter'] },
		forced: true,
		filter(event, player) {
			if (player != _status.currentPhase) {
				return false;
			}
			var cards = event.getd();
			if (!cards.length) {
				return false;
			}
			var list = [];
			var num = cards.length;
			for (var i = 0; i < cards.length; i++) {
				var card = cards[i];
				list.add(get.number(card, false));
			}
			game.getGlobalHistory('cardMove', function (evt) {
				if (evt.name != 'lose' && evt.name != 'cardsDiscard') {
					return false;
				}
				if (evt.name == 'lose' && evt.position != ui.discardPile) {
					return false;
				}
				if (evt == event || evt.getParent() == event) {
					return false;
				}
				num += evt.cards.length;
				for (var i = 0; i < evt.cards.length; i++) {
					var card = evt.cards[i];
					list.remove(get.number(card, evt.cards2 && evt.cards2.includes(card) ? evt.player : false));
				}
			});
			player.storage.qmsgswkjsgj_re_refenyin_mark2 = num;
			return list.length > 0;
		},
		content() {
			var list = [];
			var list2 = [];
			var cards = trigger.getd();
			for (var i = 0; i < cards.length; i++) {
				var card = cards[i];
				var suit = get.number(card, false);
				list.add(suit);
				list2.add(suit);
			}
			game.getGlobalHistory('cardMove', function (evt) {
				if (evt.name != 'lose' && evt.name != 'cardsDiscard') {
					return false;
				}
				if (evt.name == 'lose' && evt.position != ui.discardPile) {
					return false;
				}
				if (evt == trigger || evt.getParent() == trigger) {
					return false;
				}
				for (var i = 0; i < evt.cards.length; i++) {
					var card = evt.cards[i];
					var suit = get.number(card, false);
					list.remove(suit);
					list2.add(suit);
				}
			});
			list2.sort();
			player.draw(list.length);
			player.storage.qmsgswkjsgj_re_refenyin_mark = list2;
			player.addTempSkill('qmsgswkjsgj_re_refenyin_mark');
			player.markSkill('qmsgswkjsgj_re_refenyin_mark');
		},
		subSkill: {
			mark: {
				charlotte: true,
				onremove(player) {
					delete player.storage.qmsgswkjsgj_re_refenyin_mark;
					delete player.storage.qmsgswkjsgj_re_refenyin_mark2;
				},
				intro: {
					content(s, p) {
						var str = '本回合已经进入过弃牌堆的卡牌的花色：';
						//保留这玩意你才知道原来抄的是奋音
						for (var i = 0; i < s.length; i++) {
							str += get.translation(s[i]);
						}
						str += '<br>本回合进入过弃牌堆的牌数：';
						str += p.storage.qmsgswkjsgj_re_refenyin_mark2;
						return str;
					},
				},
			},
		},
	},
	qmsgswkjsgj_re_liji: {
		enable: 'phaseUse',
		usable(skill, player) {
			return get.event().qmsgswkjsgj_re_liji_num + 1;
		},
		audio: 'liji',
		onChooseToUse(event) {
			if (game.online) {
				return;
			}
			var num = 0;
			var evt2 = event.getParent();
			if (!evt2.qmsgswkjsgj_re_liji_all) {
				evt2.qmsgswkjsgj_re_liji_all = 3;
			}
			game.getGlobalHistory('cardMove', function (evt) {
				if (evt.name == 'cardsDiscard' || (evt.name == 'lose' && evt.position == ui.discardPile)) {
					num += evt.cards.length;
				}
			});
			event.set('qmsgswkjsgj_re_liji_num', Math.floor(num / evt2.qmsgswkjsgj_re_liji_all));
		},
		filterCard: true,
		position: 'he',
		check(card) {
			var val = get.value(card);
			if (!_status.event.player.getStorage('qmsgswkjsgj_re_refenyin_mark').includes(get.suit(card))) {
				return 12 - val;
			}
			return 8 - val;
		},
		filterTarget: lib.filter.notMe,
		content() {
			target.damage('nocard');
		},
		ai: {
			order: 1,
			result: {
				target: -1.5,
			},
			tag: {
				damage: 1,
			},
		},
	},
	//吴普
	qmsgswkjsgj_re_dcduanti: {
		audio: 'dcduanti',
		// trigger: {
		// 	player: ["useCardAfter", "respondAfter"],
		// },
		trigger: {
			// global:['loseAsyncAfter'],
			// player:['loseAfter'],
			player: 'qmsgswkjsgj_re_dcduanti',
		},
		forced: true,
		locked: true,
		filter(event, player) {
			// return event._copqmsgswkjsgj_re_dcduanti;
			return true;
		},
		// getIndex(event,player){
		// 	var num = event.getl('player').length;
		// 	return num;
		// },
		// cost(){

		// },
		onremove: ['qmsgswkjsgj_re_dcduanti', 'qmsgswkjsgj_re_dcduanti_counter'],
		group: 'qmsgswkjsgj_re_dcduanti_counter',
		async content(event, trigger, player) {
			await player.recover();
			if (player.countMark('qmsgswkjsgj_re_dcduanti') >= 10) {
				return;
			}
			player.addMark('qmsgswkjsgj_re_dcduanti', 1, false);
			await player.gainMaxHp();
		},
		subSkill: {
			counter: {
				trigger: {
					global: ['loseAsyncAfter'],
					player: ['loseAfter'],
				},
				forced: true,
				charlotte: true,
				popup: false,
				firstDo: true,
				getIndex(event, player) {
					var evt = event.getl(player);
					console.log(evt);
					return evt.cards.length;
				},
				async content(event, trigger, player) {
					// var num = event.getl('player')
					// if (num) {
					// 	player.addMark("qmsgswkjsgj_re_dcduanti_counter", num, false);
					// }
					player.addMark('qmsgswkjsgj_re_dcduanti_counter', 1, false);
					if (player.countMark('qmsgswkjsgj_re_dcduanti_counter') % 3 === 0) {
						// trigger._copqmsgswkjsgj_re_dcduanti = true;
						trigger.trigger('qmsgswkjsgj_re_dcduanti', player);
					}
					player.markSkill('qmsgswkjsgj_re_dcduanti');
				},
			},
		},
		intro: {
			markcount(storage, player) {
				return player.countMark('qmsgswkjsgj_re_dcduanti_counter');
			},
			content(storage, player) {
				return `<li>已失去过${get.cnNumber(player.countMark('qmsgswkjsgj_re_dcduanti_counter'))}张牌<br><li>已以此法增加${player.countMark('qmsgswkjsgj_re_dcduanti')}点体力上限`;
			},
		},
	},
	qmsgswkjsgj_re_dcshicao: {
		audio: 'dcshicao',
		enable: 'phaseUse',
		onremove: ['qmsgswkjsgj_re_dcshicao_aiRecord'],
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog('###识草###选择一种类型与要摸牌的来源', [['caoying_basic', 'caoying_trick', 'caoying_equip'], 'vcard'], [['牌堆顶', '牌堆底'], 'tdnodes']);
			},
			check(button) {
				const player = get.player();
				const bottom = player.storage.qmsgswkjsgj_re_dcshicao_bottom,
					aiStorage = player.getStorage('qmsgswkjsgj_re_dcshicao_aiRecord');
				if (bottom && aiStorage.length > 0 && ui.cardPile.lastChild && get.name(ui.cardPile.lastChild, false) === get.name(aiStorage.lastItem, false)) {
					if (button.link === '牌堆底' || button.link[2].slice(8) === get.type2(aiStorage.lastItem, false)) {
						return 20;
					}
				}
				if (button.link === '牌堆顶' || button.link[2].slice(8) === 'basic') {
					return 10;
				}
				return 5 + Math.random();
			},
			filter(button, player) {
				if (!ui.selected.buttons.length) {
					return true;
				}
				return ui.selected.buttons[0].parentNode != button.parentNode;
			},
			select: 2,
			backup(links, player) {
				if (links[0].includes('牌堆')) {
					links.reverse();
				}
				return {
					audio: 'dcshicao',
					type: links[0][2].slice(8),
					pos: links[1],
					filterCard: () => false,
					selectCard: -1,
					async content(event, trigger, player) {
						let { type, pos } = lib.skill.qmsgswkjsgj_re_dcshicao_backup;
						game.log(player, '声明了', `#y${get.translation(type)}牌`);
						const next = player.draw();
						const bottom = pos === '牌堆底';
						if (bottom) {
							next.set('bottom', true);
							if (player.getStorage('qmsgswkjsgj_re_dcshicao_aiRecord').length > 0) {
								player.storage.qmsgswkjsgj_re_dcshicao_aiRecord.pop();
							}
						}
						const drawnCards = await next.forResult();
						if (get.type2(drawnCards[0], player) === type) {
							return;
						}
						let cards;
						if (!bottom) {
							cards = get.bottomCards(3);
							cards.reverse();
						} else {
							cards = get.cards(3);
						}
						await game.cardsGotoOrdering(cards);
						await player.viewCards(`${bottom ? '牌堆顶' : '牌堆底'}的两张牌(靠左的在牌堆更靠上)`, cards);
						player.storage.qmsgswkjsgj_re_dcshicao_record = cards.slice();
						player.storage.qmsgswkjsgj_re_dcshicao_aiRecord = cards.slice();
						player.storage.qmsgswkjsgj_re_dcshicao_bottom = !bottom;
						const skill = 'qmsgswkjsgj_re_dcshicao';
						player.localMarkSkill(skill, player, event);
						if (bottom) {
							cards.reverse();
						}
						await game.cardsGotoPile(cards, bottom ? 'insert' : null);
						player.tempBanSkill(skill);
					},
					ai: {
						result: { player: 1 },
					},
				};
			},
			prompt(links, player) {
				return `点击“确定”，从${links[1]}摸一张牌`;
			},
		},
		intro: {
			mark(dialog, content, player) {
				var cards = player.getStorage('dcshicao_record');
				if (cards && cards.length) {
					if (player.isUnderControl(true)) {
						dialog.addText(`上一次观看的${player.storage.dcshicao_bottom ? '牌堆底' : '牌堆顶'}的牌：`);
						dialog.addAuto(cards);
						dialog.addText('（牌堆顶——牌堆底）');
					} else {
						return '不给看';
					}
				}
			},
		},
		subSkill: {
			backup: {},
		},
		ai: {
			order: 8,
			result: {
				player: 1,
			},
		},
	},

	//阮瑀
	qmsgswkjsgj_re_xingzuo: {
		audio: 'xingzuo',
		// trigger: { player: "phaseUseBegin" },
		// frequent: true,
		enable: 'phaseUse',
		usable: 1,
		content() {
			'step 0';
			player.addTempSkill('qmsgswkjsgj_re_xingzuo2');
			var cards = get.bottomCards(5);
			event.cards2 = cards;
			game.cardsGotoOrdering(cards);
			var next = player.chooseToMove('兴作：将五张牌置于牌堆底');
			var list = [['牌堆底', cards]],
				hs = player.getCards('h');
			if (hs.length) {
				list.push(['手牌', hs]);
				next.set('filterMove', function (from, to) {
					return typeof to != 'number';
				});
			}
			next.set('list', list);
			next.set('processAI', function (list) {
				var allcards = list[0][1].slice(0),
					cards = [];
				if (list.length > 1) {
					allcards = allcards.concat(list[1][1]);
				}
				var canchoose = allcards.slice(0);
				var player = _status.event.player;
				var getv = function (button) {
					if (
						button.name == 'sha' &&
						allcards.filter(function (card) {
							return (
								card.name == 'sha' &&
								!cards.filter(function () {
									return button == card;
								}).length
							);
						}).length > player.getCardUsable({ name: 'sha' })
					) {
						return 10;
					}
					return -player.getUseValue(button, player);
				};
				while (cards.length < 5) {
					canchoose.sort(function (a, b) {
						return getv(b) - getv(a);
					});
					cards.push(canchoose.shift());
				}
				return [cards, canchoose];
			});
			('step 1');
			if (result.bool) {
				event.forceDie = true;
				var cards = result.moved[0];
				event.cards = cards;
				player.storage.qmsgswkjsgj_re_xingzuo2 = cards;
				var hs = player.getCards('h');
				var lose = [],
					gain = event.cards2;
				for (var i of cards) {
					if (hs.includes(i)) {
						lose.push(i);
					} else {
						gain.remove(i);
					}
				}
				if (lose.length) {
					player.lose(lose, ui.cardPile);
				}
				if (gain.length) {
					player.gain(gain, 'draw');
				}
			} else {
				event.finish();
			}
			('step 2');
			for (var i of cards) {
				if (!'hejsdx'.includes(get.position(i, true))) {
					i.fix();
					ui.cardPile.appendChild(i);
				}
			}
			game.updateRoundNumber();
		},
	},
	qmsgswkjsgj_re_xingzuo2: {
		trigger: { player: 'phaseJieshuBegin' },
		direct: true,
		charlotte: true,
		onremove: true,
		sourceSkill: 'qmsgswkjsgj_re_xingzuo',
		filter(event, player) {
			return game.hasPlayer(function (target) {
				return target.countCards('h') > 0;
			});
		},
		content() {
			'step 0';
			player
				.chooseTarget(function (card, player, target) {
					return target.countCards('h') > 0;
				}, '兴作：是否令一名角色将其手牌与牌堆底的五张牌替换？')
				.set('ai', function (target) {
					var player = _status.event.player,
						att = get.attitude(player, target),
						hs = target.getCards('h'),
						num = hs.length;
					var getv = function (list, target) {
							var num = 0;
							for (var i of list) {
								num += get.value(i, target);
							}
							return num;
						},
						val = getv(hs, target) - getv(player.storage.xingzuo2, target);
					if (num < 5) {
						return att * Math.sqrt(Math.max(0, -val)) * 1.5;
					}
					if (num == 5) {
						return -att * Math.sqrt(Math.max(0, val));
					}
					// if (player.hp < (num > 5 ? 3 : 2)) {
					// 	return 0;
					// }
					return -att * Math.sqrt(Math.max(0, val));
				});
			('step 1');
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill('qmsgswkjsgj_re_xingzuo', target);
				var cards = get.bottomCards(5);
				game.cardsGotoOrdering(cards);
				var hs = target.getCards('h');
				target.lose(hs, ui.cardPile);
				target.gain(cards, 'draw');
				// if (hs.length > 3) {
				// 	player.loseHp();
				// }
			} else {
				event.finish();
			}
			('step 2');
			game.updateRoundNumber();
		},
	},
	qmsgswkjsgj_re_miaoxian: {
		hiddenCard(player, name) {
			return ['trick', 'basic'].includes(get.type2(name)) && player.countCards('h', { color: 'black' }) == 1;
		},
		audio: 'miaoxian',
		enable: 'chooseToUse',
		filter(event, player) {
			// if (player.hasSkill("qmsgswkjsgj_re_miaoxian_used")) {
			// 	return false;
			// }
			var cards = player.getCards('h', { color: 'black' });
			if (cards.length != 1) {
				return false;
			}
			var mod2 = game.checkMod(cards[0], player, 'unchanged', 'cardEnabled2', player);
			if (mod2 === false) {
				return false;
			}
			for (var i of lib.inpile) {
				if (
					['trick', 'basic'].includes(get.type2(i)) &&
					event.filterCard(
						{
							name: i,
							cards: cards,
						},
						player,
						event,
					)
				) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				var cards = player.getCards('h', { color: 'black' });
				var list = [];
				for (var i of lib.inpile) {
					if (
						['trick', 'basic'].includes(get.type2(i)) &&
						event.filterCard(
							{
								name: i,
								cards: cards,
							},
							player,
							event,
						)
					) {
						list.push([get.type2(i), '', i]);
						if (i == 'sha') {
							for (var k of get.YB_natureList()) {
								list.push(['基本', '', i, k]);
							}
							// list.push(['基本', '', i, 'kami']);
						}
					}
				}
				return ui.create.dialog('妙弦', [list, 'vcard'], 'hidden');
			},
			check(button) {
				var player = _status.event.player;
				return player.getUseValue({ name: button.link[2] }) + 1;
			},
			backup(links, player) {
				return {
					audio: 'miaoxian',
					popname: true,
					filterCard: { color: 'black' },
					selectCard: -1,
					position: 'h',
					viewAs: {
						name: links[0][2],
					},
					// onuse(links, player) {
					// 	player.addTempSkill("miaoxian_used");
					// },
				};
			},
			prompt(links, player) {
				return '将' + get.translation(player.getCards('h', { color: 'black' })[0]) + '当做' + (links[0][3] ? get.translation(links[0][3]) : '') + get.translation(links[0][2]) + '使用';
			},
		},
		group: 'qmsgswkjsgj_re_miaoxian_use',
		subfrequent: ['use'],
		subSkill: {
			use: {
				audio: 'miaoxian',
				trigger: { player: 'loseAfter' },
				frequent: true,
				prompt: '是否发动【妙弦】摸一张牌？',
				filter(event, player) {
					var evt = event.getParent();
					if (evt.name != 'useCard' && evt.name != 'respond') {
						return false;
					}
					return event.hs && event.hs.length == 1 && event.cards && event.cards.length == 1 && get.color(event.hs[0], player) == 'red' && !player.countCards('h', { color: 'red' });
				},
				content() {
					player.draw();
					var evt = trigger.getParent();
					if (evt.name == 'useCard') {
						evt.directHit.addArray(game.players);
					}
				},
				mod: {
					cardUsable: function (card, player, num) {
						var cards = player.getCards('h', function (x) {
							return get.color(x, player) == 'red';
						});
						if (cards.length == 1) {
							if (get.color(card) == 'red') return Infinity;
						}
					},
					cardEnabled: function (card, player) {
						var cards = player.getCards('h', function (x) {
							return get.color(x, player) == 'red';
						});
						if (cards.length == 1) {
							if (get.color(card) == 'red') return true;
						}
					},
					targetInRange(card, player, target) {
						var cards = player.getCards('h', function (x) {
							return get.color(x, player) == 'red';
						});
						if (cards.length == 1) {
							if (get.color(card) == 'red') return true;
						}
					},
				},
			},
			backup: { audio: 'miaoxian' },
			used: { charlotte: true },
		},
		ai: {
			order: 12,
			result: { player: 1 },
		},
	},

	//杜预
	qmsgswkjsgj_re_dcjianguo: {
		audio: 'dcjianguo',
		enable: 'phaseUse',
		filter(event, player) {
			return ['discard', 'draw'].some((i) => !player.getStorage('qmsgswkjsgj_re_dcjianguo_used').includes(i));
		},
		chooseButton: {
			dialog(event, player) {
				var dialog = ui.create.dialog('谏国：请选择一项', 'hidden');
				dialog.add([
					[
						['discard', '令一名角色弃置一半手牌，若其弃置的牌数量小于你的体力值，你对其造成一点伤害'],
						['draw', '令一名角色摸等同于手牌数一半的牌，若其摸牌数量大于等于你的体力值，你回复一点体力'],
					],
					'textbutton',
				]);
				return dialog;
			},
			filter(button, player) {
				return !player.getStorage('qmsgswkjsgj_re_dcjianguo_used').includes(button.link);
			},
			check(button) {
				var player = _status.event.player;
				if (button.link == 'discard') {
					var discard = Math.max.apply(
						Math,
						game
							.filterPlayer((current) => {
								return lib.skill.qmsgswkjsgj_re_dcjianguo_discard.filterTarget(null, player, current);
							})
							.map((current) => {
								return get.effect(current, 'qmsgswkjsgj_re_dcjianguo_discard', player, player);
							}),
					);
					return discard;
				}
				if (button.link == 'draw') {
					var draw = Math.max.apply(
						Math,
						game
							.filterPlayer((current) => {
								return lib.skill.qmsgswkjsgj_re_dcjianguo_draw.filterTarget(null, player, current);
							})
							.map((current) => {
								return get.effect(current, 'qmsgswkjsgj_re_dcjianguo_draw', player, player);
							}),
					);
					return draw;
				}
				return 0;
			},
			backup(links) {
				return get.copy(lib.skill['qmsgswkjsgj_re_dcjianguo_' + links[0]]);
			},
			prompt(links) {
				if (links[0] == 'discard') {
					return '令一名角色弃置一半手牌，若其弃置的牌数量小于你的体力值，你对其造成一点伤害';
				}
				return '令一名角色摸等同于手牌数一半的牌，若其摸牌数量大于等于你的体力值，你回复一点体力';
			},
		},
		ai: {
			order: 10,
			threaten: 2.8,
			result: {
				//想让杜预两个技能自我联动写起来太累了，开摆
				player: 1,
			},
		},
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
			},
			backup: { audio: 'dcjianguo' },
			discard: {
				audio: 'dcjianguo',
				filterTarget: () => true,
				filterCard: () => false,
				selectCard: -1,
				content() {
					'step 0';
					player.addTempSkill('qmsgswkjsgj_re_dcjianguo_used', 'phaseUseAfter');
					player.markAuto('qmsgswkjsgj_re_dcjianguo_used', ['discard']);
					// target.draw();
					game.delayex();
					('step 1');
					var num = Math.ceil(target.countCards('h') / 2);
					if (num > 0) {
						event._result = target.chooseToDiscard(num, true, '谏国：请弃置' + get.cnNumber(num) + '张手牌');
						// console.log(event._result)
					}
					('step 2');
					// console.log(result)
					if (result) {
						if (result.cards && result.cards.length < player.hp) {
							target.damage();
						}
					}
				},
				ai: {
					result: {
						target(player, target) {
							return 1.1 - Math.floor(target.countCards('h') / 2);
						},
					},
					tag: {
						gain: 1,
						loseCard: 2,
					},
				},
			},
			draw: {
				audio: 'dcjianguo',
				filterTarget(card, player, target) {
					return target.countCards('he');
				},
				filterCard: () => false,
				selectCard: -1,
				content() {
					'step 0';
					player.addTempSkill('qmsgswkjsgj_re_dcjianguo_used', 'phaseUseAfter');
					player.markAuto('qmsgswkjsgj_re_dcjianguo_used', ['draw']);
					// target.chooseToDiscard("he", true, "谏国：请弃置一张牌");
					('step 1');
					var num = Math.ceil(target.countCards('h') / 2);
					if (num > 0) {
						event._result = target.draw(num);
						// console.log(event._result)
					}
					('step 2');
					if (result) {
						if (result && result.length >= player.hp) {
							player.recover();
						}
					}
				},
				ai: {
					result: {
						target(player, target) {
							var fix = 0;
							var num = target.countCards('h');
							if (player == target && num % 2 == 1 && num >= 5) {
								fix += 1;
							}
							return Math.ceil(num / 2 - 0.5) + fix;
						},
					},
					tag: {
						loseCard: 1,
						gain: 2,
					},
				},
			},
		},
	},
	qmsgswkjsgj_re_dcdyqingshi: {
		audio: 'dcdyqingshi',
		trigger: {
			player: 'useCard',
		},
		filter(event, player) {
			if (player != _status.currentPhase) {
				return false;
			}
			// if (!event.isFirstTarget) {
			// 	return false;
			// }
			// if (event.card.name != "sha" && get.type(event.card, null, false) != "trick") {
			// 	return false;
			// }
			if (player.countCards('h') != player.getHistory('useCard').indexOf(event) + 1) {
				return false;
			}
			// return event.targets.some(target => {
			// 	return target != player && target.isIn();
			// });
			return true;
		},
		direct: true,
		locked: false,
		content() {
			'step 0';
			var targets = trigger.targets.filter((target) => {
				return target != player && target.isIn();
			});
			player
				.chooseTarget(get.prompt('qmsgswkjsgj_re_dcdyqingshi'), '对一名角色造成1点伤害', (card, player, target) => {
					return true;
				})
				.set('ai', (target) => {
					var player = _status.event.player;
					return get.damageEffect(target, player, player);
				})
				.set('targets', targets);
			('step 1');
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill('qmsgswkjsgj_re_dcdyqingshi', target);
				target.damage();
			}
		},
		mod: {
			aiOrder(player, card, num) {
				if (_status.currentPhase != player) {
					return;
				}
				var cardsh = [];
				if (Array.isArray(card.cards)) {
					cardsh.addArray(
						card.cards.filter((card) => {
							return get.position(card) == 'h';
						}),
					);
				}
				var del = player.countCards('h') - cardsh.length - player.getHistory('useCard').length - 1;
				if (del < 0) {
					return;
				}
				if (del > 0) {
					if (card.name == 'sha' || get.type(card, null, player) != 'trick') {
						return num / 3;
					}
					return num + 1;
				}
				return num + 15;
			},
		},
	},

	//星曹仁
	qmsgswkjsgj_re_starsujun: {
		audio: 'starsujun',
		trigger: {
			player: ['loseAfter', 'enterGame'],
			global: ['phaseBefore', 'equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
		},
		filter(event, player, name) {
			if (player.countCards('h', { type: 'basic' }) * 2 != player.countCards('h')) {
				var num1 = player.countCards('h', { type: 'basic' });
				var num2 = player.countCards('h', function (c) {
					return get.type(c) != 'basic';
				});
				if (num1 > num2) {
					player.addTip('qmsgswkjsgj_re_starsujun', '肃军：基本多' + (num1 - num2));
				} else {
					player.addTip('qmsgswkjsgj_re_starsujun', '肃军：非基多' + (num2 - num1));
				}
				return false;
			}
			// player.removeTip('qmsgswkjsgj_re_starsujun')
			player.addTip('qmsgswkjsgj_re_starsujun', '肃军：相等');
			if (name == 'enterGame') return true;
			else if (name == 'phaseBefore') return game.phaseNumber == 0;
			else {
				if (event.name == 'gain' && event.player == player) {
					return true;
				}

				var evt = event.getl(player);
				if (!evt || !evt.hs || evt.hs.length == 0) {
					return false;
				}
				return true;
			}
		},
		frequent: true,
		locked: false,
		content() {
			player.draw(2);
		},
		mod: {
			aiOrder(player, card, num) {
				var num = player.countCards('h') - 2 * player.countCards('h', { type: 'basic' });
				if (Math.abs(num) != 1) {
					return;
				}
				if (num == 1 && get.type(card) != 'basic') {
					return num + 10;
				}
				if (num == -1 && get.type(card) == 'basic') {
					return num + 10;
				}
			},
		},
	},
	qmsgswkjsgj_re_starlifeng: {
		audio: 'starlifeng',
		enable: 'chooseToUse',
		filter(event, player) {
			if (!event.filterCard(get.autoViewAs({ name: 'sha', storage: { qmsgswkjsgj_re_starlifeng: true } }, 'unsure'), player, event) && !event.filterCard(get.autoViewAs({ name: 'wuxie', storage: { qmsgswkjsgj_re_starlifeng: true } }, 'unsure'), player, event)) {
				return false;
			}
			return player.hasCard((card) => {
				return !player.getStorage('qmsgswkjsgj_re_starlifeng_count').includes(get.suit(card, player));
			}, 'hs');
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				if (event.filterCard(get.autoViewAs({ name: 'sha', storage: { qmsgswkjsgj_re_starlifeng: true } }, 'unsure'), player, event)) {
					list.push(['基本', '', 'sha']);
				}
				if (event.filterCard(get.autoViewAs({ name: 'wuxie', storage: { qmsgswkjsgj_re_starlifeng: true } }, 'unsure'), player, event)) {
					list.push(['锦囊', '', 'wuxie']);
				}
				const dialog = ui.create.dialog('砺锋', [list, 'vcard']);
				dialog.direct = true;
				return dialog;
			},
			check(button) {
				var player = _status.event.player;
				return _status.event.getParent().type == 'phase' ? player.getUseValue({ name: button.link[2] }) : 1;
			},
			backup(links, player) {
				return {
					filterCard(card, player) {
						return !player.getStorage('qmsgswkjsgj_re_starlifeng_count').includes(get.suit(card, player));
					},
					precontent() {
						player.logSkill('qmsgswkjsgj_re_starlifeng');
						event.getParent().addCount = false;
					},
					log: false,
					popname: true,
					viewAs: {
						name: links[0][2],
						storage: {
							qmsgswkjsgj_re_starlifeng: true,
						},
					},
					ai1(card) {
						var player = _status.event.player;
						var num = player.countCards('h') - 2 * player.countCards('h', { type: 'basic' });
						if (player.hasSkill('qmsgswkjsgj_re_starsujun') && Math.abs(num) == 1) {
							if (num == 1 && get.type(card) != 'basic') {
								return 15 - get.value(card);
							}
							if (num == -1 && get.type(card) == 'basic') {
								return 15 - get.value(card);
							}
						}
						return 7 - get.value(card);
					},
				};
			},
			prompt(links) {
				return '将一张本回合未使用过的花色的手牌当做【' + get.translation(links[0][2]) + '】使用';
			},
		},
		hiddenCard(player, name) {
			if (name == 'wuxie') {
				return player.countCards('hs', (card) => {
					return !player.getStorage('qmsgswkjsgj_re_starlifeng_count').includes(get.suit(card, player)) || _status.connectMode;
				});
			}
		},
		ai: {
			respondSha: true,
			skillTagFilter(player, tag, arg) {
				if (arg == 'respond') {
					return false;
				}
				if (
					!player.countCards('hs', (card) => {
						return !player.getStorage('qmsgswkjsgj_re_starlifeng_count').includes(get.suit(card, player)) || _status.connectMode;
					})
				) {
					return false;
				}
			},
			order: 10,
			result: { player: 1 },
		},
		locked: false,
		mod: {
			cardUsable(card, player) {
				if (card?.storage?.qmsgswkjsgj_re_starlifeng) {
					return Infinity;
				}
			},
		},
		group: 'qmsgswkjsgj_re_starlifeng_mark',
		subSkill: {
			mark: {
				charlotte: true,
				trigger: { global: 'useCard1' },
				filter(event, player) {
					return !player.getStorage('qmsgswkjsgj_re_starlifeng_count').includes(get.suit(event.card));
				},
				forced: true,
				popup: false,
				firstDo: true,
				content() {
					player.addTempSkill('qmsgswkjsgj_re_starlifeng_count');
					player.markAuto('qmsgswkjsgj_re_starlifeng_count', [get.suit(trigger.card)]);
				},
			},
			count: {
				charlotte: true,
				onremove: true,
			},
		},
	},

	//夏侯徽
	qmsgswkjsgj_re_dcdujun: {
		audio: 'dcdujun',
		trigger: {
			global: ['damageSource', 'damageEnd'],
		},
		filter(event, player, name) {
			const key = name == 'damageSource' ? 'sourceDamage' : 'damage',
				targets = [player, player.storage?.dcdujun],
				target = name == 'damageSource' ? event.source : event.player;
			if (targets.includes(target)) {
				return true;
			}
		},
		usable(skill, player) {
			return player.maxHp;
		},
		prompt2: function (event, player) {
			return '摸' + event.num + '张牌，然后可以将等量张牌交给一名其他角色';
		},
		check: () => true,
		//frequent:true,
		async content(event, trigger, player) {
			var num = trigger.num * 2;
			await player.draw(num);
			const result = await player
				.chooseCardTarget({
					selectCard: num,
					filterCard: (card) => get.owner(card) == player,
					position: 'he',
					filterTarget: (target) => target != player,
					selectTarget: 1,
					ai1: function (card) {
						return 6 - get.value(card, player);
					},
					prompt: '是否将等量张牌交给一名其他角色？',
					ai2: (target) => {
						var cards = ui.selected.cards;
						if (!cards.length) return false;
						const att = get.sgnAttitude(get.player(), target);
						return att * cards.reduce((sum, card) => sum + get.value(card, target), 0);
					},
				})
				.forResult();
			if (result?.targets?.length && result?.cards?.length) {
				const target = result.targets[0];
				const cards = result.cards;
				player.line(target);
				await player.give(cards, target);
			}
		},
		intro: {
			content: 'player',
		},
		group: ['qmsgswkjsgj_re_dcdujun_init'],
		subSkill: {
			effect: {
				audio: 'dcdujun',
				charlotte: true,
				onremove: true,
				intro: {
					markcount: () => 0,
					content: 'players',
				},
				trigger: {
					global: 'useCard1',
				},
				forced: true,
				filter(event, player) {
					return player.getStorage('dcdujun_effect').includes(event.player);
				},
				async content(event, trigger, player) {
					game.log(player, '不能响应', trigger.card);
					trigger.directHit.add(player);
				},
			},
			init: {
				audio: 'dcdujun',
				trigger: {
					player: 'enterGame',
					global: 'phaseBefore',
				},
				filter(event, player) {
					return (event.name != 'phase' || game.phaseNumber == 0) && game.hasPlayer((target) => target != player);
				},
				async cost(event, trigger, player) {
					event.result = await player
						.chooseTarget(`笃君：请选择一名其他角色作为你的“夫君”`, true, lib.filter.notMe)
						.set('ai', (target) => get.attitude(get.player(), target))
						.forResult();
				},
				async content(event, trigger, player) {
					const target = event.targets[0],
						skill = 'dcdujun_effect';
					player.setStorage('dcdujun', target);
					player.addSkill(skill);
					player.markAuto(skill, target);
				},
			},
		},
	},
	qmsgswkjsgj_re_dcjikun: {
		audio: 'dcjikun',
		trigger: {
			player: 'loseAfter',
			global: ['addToExpansionAfter', 'gainAfter', 'addJudgeAfter', 'loseAsyncAfter', 'equipAfter'],
		},
		filter(event, player) {
			return event.qmsgswkjsgj_re_dcjikun_count > 0;
		},
		getIndex(event, player) {
			return event.qmsgswkjsgj_re_dcjikun_count;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill))
				.set('ai', (target) => {
					const selected = ui.selected?.targets;
					if (!selected?.length) {
						return get.attitude(get.player(), target);
					}
					return get.effect(target, { name: 'shunshou_copy2' }, selected[0], get.player());
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const gainer = event.targets[0],
				targets = game.filterPlayer((current) => current != gainer && current.countGainableCards('he', gainer));
			if (targets.length)
				var result = await gainer
					.chooseTarget(1, true)
					.set('filterTarget', function (card, player, target) {
						// return targets.includes(target);
						// var player = get.player();
						return target != player && target.countGainableCards('he', player);
					})
					.set('ai', function (target) {
						var player = get.player();
						return lib.card.shunshou_copy2.ai.result.target(player, target) > 0;
					})
					.forResult();
			if (result.targets.length) {
				const target = result.targets[0];
				gainer.line(target);
				if (target.countGainableCards(gainer, 'he')) {
					await gainer.gainPlayerCard('he', target, true).set('target', target).set('complexSelect', false).set('ai', lib.card.shunshou.ai.button);
				}
			}
			// gainer.line(targets);
			// for (const gainee of targets) {
			// 	const card = gainee.getGainableCards(gainer, "he").randomGet();
			// 	await gainer.gain(card, gainee, "giveAuto", "bySelf");
			// }
		},
		init(player, skill) {
			player.addSkill(skill + '_mark');
		},
		onremove(player, skill) {
			player.removeSkill(skill + '_mark');
		},
		subSkill: {
			mark: {
				charlotte: true,
				onremove: true,
				silent: true,
				trigger: {
					player: 'loseEnd',
					global: ['addToExpansionEnd', 'gainEnd', 'addJudgeEnd', 'loseAsyncEnd', 'equipEnd'],
				},
				content() {
					const evt = trigger.getl(player);
					if (!evt?.cards2?.length) {
						return;
					}
					const prev = player.countMark(event.name);
					player.addMark(event.name, evt.cards.length, false);
					const now = player.countMark(event.name);
					const num = Math.floor(now / 5) - Math.floor(prev / 5);
					trigger.set('qmsgswkjsgj_re_dcjikun_count', num);
				},
				intro: {
					markcount: (storage) => storage % 5,
					content: (storage, player) => `<li>已失去${storage}张牌<br><li>当前充能：${storage % 5}/5`,
				},
			},
		},
	},

	//庞宏
	qmsgswkjsgj_re_dcpingzhi: {
		audio: 'dcpingzhi',
		mark: true,
		zhuanhuanji: true,
		marktext: '☯',
		usable: 3,
		enable: 'phaseUse',
		filterTarget(card, player, target) {
			return target.countCards('h');
		},
		intro: {
			content(storage) {
				return '转换技，出牌阶段限三次，你可观看一名角色的手牌并展示其中一张牌，' + (storage ? '然后你代替其使用此牌，若此牌造成伤害' : '你弃置此牌，然后其视为对你使用一张【火攻】，若其未因此造成伤害') + '则此技能视为未发动过。';
			},
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			player.changeZhuanhuanji(event.name);
			const result = await player
				.choosePlayerCard(target, true, `请选择${get.translation(target)}一张手牌展示`, 'visible', 'h')
				.set('ai', (button) => {
					const { player, target } = get.event(),
						{ link } = button;
					const att = get.attitude(player, target),
						storage = player.storage.qmsgswkjsgj_re_dcpingzhi,
						huogong = get.autoViewAs({ name: 'huogong', isCard: true });
					if (att > 0) {
						return storage ? 6 - get.value(link) : player.getUseValue(link);
					}
					return storage ? (get.value(link) + get.effect(player, huogong, target, player) < 0 && !player.hasCard((card) => get.suit(card) == get.suit(link)) ? 2 : 0) : -target.getUseValue(link);
				})
				.forResult();
			if (!result?.cards?.length) {
				return;
			}
			const { cards } = result;
			player.addTempSkill(event.name + '_check', 'phaseUseAfter');
			await player.showCards(cards, `${get.translation(player)}对${get.translation(target)}发动了【评骘】`);
			if (player.storage[event.name]) {
				await target.modedDiscard(cards, player);
				const huogong = get.autoViewAs({ name: 'huogong', isCard: true });
				if (target.canUse(huogong, player, false)) {
					await target.useCard(huogong, player, false);
				} else if (player.getStat('skill')[event.name]) {
					delete player.getStat('skill')[event.name];
					game.log(player, '重置了', '#g【评骘】');
				}
			} else if (target.hasUseTarget(cards[0])) {
				// await target.chooseUseTarget(cards[0], true, false);
				player
					.when({ player: 'useCardBefore' })
					.filter(function (event, player) {
						var source = event.card.qmsgswkjsgj_re_dcpingzhi_source;
						return get.itemtype(source) == 'player' && source.isIn();
					})
					.then(function () {
						trigger.player = trigger.card.qmsgswkjsgj_re_dcpingzhi_source;
						trigger.noai = true;
						game.delay(0.5);
					});
				await player.addTempSkill('qmsgswkjsgj_re_dcpingzhi_source');
				cards[0].qmsgswkjsgj_re_dcpingzhi_source = target;
				await player.chooseUseTarget(cards[0], true, false);
				// next.set('selectTarget',function(card, player, range){
				// 	var source = target;
				// 	if (!source.isIn() || get.itemtype(source) != "player" || get.itemtype(source.storage.sgsxjxfzmnl_dcpandi_effect) == "player") {
				// 		return;
				// 	}
				// 	var range,
				// 		info = get.info(card);
				// 	var select = get.copy(info.selectTarget);
				// 	if (select == undefined) {
				// 		if (info.filterTarget == undefined) {
				// 			return [0, 0];
				// 		}
				// 		range = [1, 1];
				// 	} else if (typeof select == "number") {
				// 		range = [select, select];
				// 	} else if (get.itemtype(select) == "select") {
				// 		range = select;
				// 	} else if (typeof select == "function") {
				// 		range = select(card, source);
				// 		if (typeof range == "number") {
				// 			range = [range, range];
				// 		}
				// 	}
				// 	game.checkMod(card, source, range, "selectTarget", source);
				// })
			}
		},
		ai: {
			order(item, player) {
				const storage = player.storage.qmsgswkjsgj_re_dcpingzhi;
				if (!storage) {
					return game.hasPlayer((current) => get.effect(current, { name: 'guohe_copy2' }, player, player) + get.effect(player, { name: 'huogong' }, current, player) > 0) ? 10 : 1;
				}
				return game.hasPlayer((current) => get.effect(current, { name: 'guohe_copy2' }, player, player) > 0 || (current.hasCard((card) => current.hasValueTarget(card) > 0, 'h') && get.attitude(player, current) > 0)) ? 10 : 1;
			},
			result: {
				target(player, target) {
					const storage = player.storage.qmsgswkjsgj_re_dcpingzhi;
					if (!storage) {
						return !player.countCards('h') || get.effect(target, { name: 'guohe_copy2' }, player, player) + get.effect(player, { name: 'huogong' }, target, player) > 0 ? -1 : 0;
					}
					return get.attitude(player, target) > 0 && target.hasCard((card) => target.hasValueTarget(card) > 0, 'h') ? 1 : get.effect(target, { name: 'guohe_copy2' }, player, player);
				},
			},
		},
		subSkill: {
			check: {
				trigger: { global: 'useCardAfter' },
				filter(event, player) {
					if (!player.getStat().skill.qmsgswkjsgj_re_dcpingzhi) {
						return false;
					}
					if (player.storage.qmsgswkjsgj_re_dcpingzhi) {
						return event.getParent().name == 'qmsgswkjsgj_re_dcpingzhi' && !game.hasPlayer2((current) => current.hasHistory('damage', (evtx) => evtx.card === event.card));
					} else {
						return event.getParent(2).name == 'qmsgswkjsgj_re_dcpingzhi' && game.hasPlayer2((current) => current.hasHistory('damage', (evtx) => evtx.card === event.card));
					}
				},
				charlotte: true,
				silent: true,
				async content(event, trigger, player) {
					delete player.getStat('skill').qmsgswkjsgj_re_dcpingzhi;
					game.log(player, '重置了', '#g【评骘】');
				},
			},
			source: {
				trigger: { player: 'useCardBefore' },
				forced: true,
				filter(event, player) {
					var source = event.cards[0].qmsgswkjsgj_re_dcpingzhi_source;
					return get.itemtype(source) == 'player' && source.isIn();
				},
				logTarget: (event, player) => event.card.qmsgswkjsgj_re_dcpingzhi_source,
				content() {
					trigger.player = trigger.cards[0].qmsgswkjsgj_re_dcpingzhi_source;
					trigger.noai = true;
					game.delay(0.5);
				},
				mod: {
					selectTarget(card, player, range) {
						var source = card.qmsgswkjsgj_re_dcpingzhi_source;
						if (!source || !source.isIn() || get.itemtype(source) != 'player' || get.itemtype(source.storage.sgsxjxfzmnl_dcpandi_effect) == 'player') {
							return;
						}
						var range,
							info = get.info(card);
						var select = get.copy(info.selectTarget);
						if (select == undefined) {
							if (info.filterTarget == undefined) {
								return [0, 0];
							}
							range = [1, 1];
						} else if (typeof select == 'number') {
							range = [select, select];
						} else if (get.itemtype(select) == 'select') {
							range = select;
						} else if (typeof select == 'function') {
							range = select(card, source);
							if (typeof range == 'number') {
								range = [range, range];
							}
						}
						game.checkMod(card, source, range, 'selectTarget', source);
					},
					cardEnabled2(card, player, event) {
						var source = card.qmsgswkjsgj_re_dcpingzhi_source;
						if (!source || !source.isIn() || get.itemtype(source) != 'player' || get.itemtype(source.storage.sgsxjxfzmnl_dcpandi_effect) == 'player') {
							return;
						}
						var check = game.checkMod(card, source, event, 'unchanged', 'cardEnabled2', source);
						return check;
					},
					cardEnabled(card, player, event) {
						var source = card?.cards[0]?.qmsgswkjsgj_re_dcpingzhi_source || undefined;
						if (!source || !source.isIn() || get.itemtype(source) != 'player' || get.itemtype(source.storage.sgsxjxfzmnl_dcpandi_effect) == 'player') {
							return;
						}
						if (event === 'forceEnable') {
							var mod = game.checkMod(card, source, event, 'unchanged', 'cardEnabled', source);
							if (mod != 'unchanged') {
								return mod;
							}
							return true;
						} else {
							var filter = get.info(card).enable;
							if (!filter) {
								return;
							}
							var mod = game.checkMod(card, player, source, 'unchanged', 'cardEnabled', source);
							if (mod != 'unchanged') {
								return mod;
							}
							if (typeof filter == 'boolean') {
								return filter;
							}
							if (typeof filter == 'function') {
								return filter(card, source, event);
							}
						}
					},
					cardUsable(card, player, num) {
						var source = card.qmsgswkjsgj_re_dcpingzhi_source;
						if (!source || !source.isIn() || get.itemtype(source) != 'player' || get.itemtype(source.storage.sgsxjxfzmnl_dcpandi_effect) == 'player') {
							return;
						}
						var event = _status.event;
						if (event.type == 'chooseToUse_button') {
							event = event.getParent();
						}
						if (source != _status.event.player) {
							return true;
						}
						if (info.updateUsable == 'phaseUse') {
							if (event.getParent().name != 'phaseUse') {
								return true;
							}
							if (event.getParent().player != source) {
								return true;
							}
						}
						event.addCount_extra = true;
						var num = info.usable;
						if (typeof num == 'function') {
							num = num(card, source);
						}
						num = game.checkMod(card, source, num, event, 'cardUsable', source);
						if (typeof num != 'number') {
							return true;
						}
						if (source.countUsed(card) < num) {
							return true;
						}
						if (
							game.hasPlayer(function (current) {
								return game.checkMod(card, source, current, false, 'cardUsableTarget', source);
							})
						) {
							return true;
						}
						return false;
					},
					// playerEnabled(card, player, target) {
					// 	console.log('playerEnabled',card)
					// 	var source = card.qmsgswkjsgj_re_dcpingzhi_source;
					// 	console.log('playerEnabled.source',source)
					// 	if (!source.isIn() || get.itemtype(source) != "player" || get.itemtype(source.storage.sgsxjxfzmnl_dcpandi_effect) == "player") {
					// 		return;
					// 	}
					// 	return lib.filter.targetEnabledx(card, source, target);
					// },
					targetInRange(card, player, target) {
						var source = card.qmsgswkjsgj_re_dcpingzhi_source;
						if (!source || !source.isIn() || get.itemtype(source) != 'player' || get.itemtype(source.storage.sgsxjxfzmnl_dcpandi_effect) == 'player') {
							return;
						}
						return lib.filter.targetInRange(card, source, target);
					},
				},
			},
		},
	},
	qmsgswkjsgj_re_dcgangjian: {
		audio: 'dcgangjian',
		trigger: {
			global: 'phaseAfter',
		},
		forced: true,
		filter(event, player) {
			let num = 0;
			game.getGlobalHistory('everything', (evt) => {
				return evt.name == 'showCards' && evt.cards.length;
			}).forEach((evt) => {
				num += evt.cards.length;
			});
			return num > 0;
		},
		async content(event, trigger, player) {
			let num = 0;
			game.getGlobalHistory('everything', (evt) => {
				return evt.name == 'showCards' && evt.cards.length;
			}).forEach((evt) => {
				num += evt.cards.length;
			});
			await player.draw(Math.min(num, 5));
		},
	},
	//朱建平
	qmsgswkjsgj_re_dcxiangmian: {
		audio: 'dcxiangmian',
		enable: 'phaseUse',
		usable: 2,
		filter(event, player) {
			return game.hasPlayer((current) => lib.skill.qmsgswkjsgj_re_dcxiangmian.filterTarget(null, player, current));
		},
		filterTarget(card, player, target) {
			return !target.hasSkill('qmsgswkjsgj_re_dcxiangmian_countdown') && player != target;
		},
		content() {
			'step 0';
			target.judge((card) => -2 / Math.sqrt(get.number(card, false))).set('judge2', (result) => (result.bool === false ? true : false));
			('step 1');
			player.markAuto('qmsgswkjsgj_re_dcxiangmian', [target]);
			target.addSkill('qmsgswkjsgj_re_dcxiangmian_countdown');
			if (!target.storage['qmsgswkjsgj_re_dcxiangmian_countdown']) {
				target.storage['qmsgswkjsgj_re_dcxiangmian_countdown'] = [];
			}
			[player.playerid, result.suit, result.number].forEach((i) => target.storage['qmsgswkjsgj_re_dcxiangmian_countdown'].push(i));
			target.markSkill('qmsgswkjsgj_re_dcxiangmian_countdown');
		},
		// intro: { content: "已对$发动过技能" },
		ai: {
			expose: 0.3,
			order: 10,
			result: { target: -5 },
		},
		subSkill: {
			countdown: {
				trigger: { player: 'useCardAfter' },
				mark: true,
				marktext: '💀',
				silent: true,
				forced: true,
				charlotte: true,
				intro: {
					markcount(storage) {
						if (storage) {
							var list = storage.filter((_, i) => i % 3 == 2);
							return Math.min.apply(null, list);
						}
					},
					content(storage, player) {
						if (!storage) {
							return;
						}
						var str = '使用';
						str +=
							get.cnNumber(
								Math.min.apply(
									null,
									storage.filter((_, i) => i % 3 == 2),
								),
							) + '张牌后，或使用一张';
						for (var i = 0; i < storage.length / 3; i++) {
							str += get.translation(storage[i * 3 + 1]) + '、';
						}
						str = str.slice(0, -1);
						str += '后，失去等同于体力值的体力';
						return str;
					},
				},
				filter(event, player) {
					if (!player.getStorage('qmsgswkjsgj_re_dcxiangmian_countdown').length) {
						return false;
					}
					//return (player.getStorage('qmsgswkjsgj_re_dcxiangmian_countdown').filter((_,i)=>i%3==1)).includes(get.suit(event.card,player));
					return true;
				},
				content() {
					'step 0';
					var storage = player.getStorage('qmsgswkjsgj_re_dcxiangmian_countdown');
					for (var i = 0; i < storage.length / 3; i++) {
						if (storage[i * 3 + 1] == get.suit(trigger.card, player)) {
							storage[i * 3 + 2] = 0;
						} else {
							storage[i * 3 + 2]--;
						}
					}
					player.markSkill('qmsgswkjsgj_re_dcxiangmian_countdown');
					('step 1');
					var storage = player.getStorage('qmsgswkjsgj_re_dcxiangmian_countdown');
					for (var i = 0; i < storage.length / 3; i++) {
						if (storage[i * 3 + 2] <= 0) {
							if (!event.isMine() && !event.isOnline()) {
								game.delayx();
							}
							player.logSkill('qmsgswkjsgj_re_dcxiangmian_countdown');
							player.storage['qmsgswkjsgj_re_dcxiangmian_countdown'].splice(i * 3, 3);
							if (!player.getStorage('qmsgswkjsgj_re_dcxiangmian_countdown').length) {
								player.removeSkill('qmsgswkjsgj_re_dcxiangmian_countdown');
							}
							if (player.hp > 0) {
								player.loseHp(player.hp);
							}
							i--;
						}
					}
				},
				ai: {
					effect: {
						player_use(card, player, target) {
							if (typeof card != 'object') {
								return;
							}
							var storage = player.getStorage('qmsgswkjsgj_re_dcxiangmian_countdown');
							for (var i = 0; i < storage.length / 3; i++) {
								if (storage[i * 3 + 2] == 1 || get.suit(card, player) == storage[i * 3 + 1]) {
									if (!player.canSave(player) && !get.tag(card, 'save')) {
										return [0, -100, 0, 0];
									}
									return [1, -2 * player.hp, 1, 0];
								}
							}
						},
					},
				},
			},
		},
	},
	qmsgswkjsgj_re_dctianji: {
		audio: 'dctianji',
		trigger: { global: 'cardsDiscardAfter' },
		forced: true,
		filter(event, player) {
			var evt = event.getParent().relatedEvent;
			return evt && evt.name == 'judge';
		},
		content() {
			var card = trigger.cards[0],
				cards = [],
				func = ['type2', 'suit', 'number'];
			for (var fn of func) {
				var cardx = get.cardPile((cardxx) => {
					if (get[fn](card, player) == get[fn](cardxx, player) && !cards.includes(cardxx)) {
						return true;
					}
				}, 'random');
				if (cardx) {
					cards.push(cardx);
				}
			}
			/*if(cards.length&&!player.isMaxHandcard(true)) player.draw();
			else*/ if (cards.length) {
				player.gain(cards, 'gain2');
			}
		},
	},
	qmsgswkjsgj_re_dcxiangmianplus: {
		audio: 'dcxiangmian',
		enable: 'phaseUse',
		usable: 2,
		filter(event, player) {
			return game.hasPlayer((current) => lib.skill.qmsgswkjsgj_re_dcxiangmianplus.filterTarget(null, player, current));
		},
		filterTarget(card, player, target) {
			return !target.hasSkill('qmsgswkjsgj_re_dcxiangmianplus_countdown') && player != target;
		},
		content() {
			'step 0';
			target.judge((card) => -2 / Math.sqrt(get.number(card, false))).set('judge2', (result) => (result.bool === false ? true : false));
			('step 1');
			player.markAuto('qmsgswkjsgj_re_dcxiangmianplus', [target]);
			target.addSkill('qmsgswkjsgj_re_dcxiangmianplus_countdown');
			if (!target.storage['qmsgswkjsgj_re_dcxiangmianplus_countdown']) {
				target.storage['qmsgswkjsgj_re_dcxiangmianplus_countdown'] = [];
			}
			[player.playerid, result.suit, result.number].forEach((i) => target.storage['qmsgswkjsgj_re_dcxiangmianplus_countdown'].push(i));
			target.markSkill('qmsgswkjsgj_re_dcxiangmianplus_countdown');
		},
		// intro: { content: "已对$发动过技能" },
		ai: {
			expose: 0.3,
			order: 10,
			result: { target: -5 },
		},
		subSkill: {
			countdown: {
				// trigger: { player: 'useCardAfter' },
				trigger:{
					player:'loseAfter'
				},
				mark: true,
				marktext: '💀',
				silent: true,
				forced: true,
				charlotte: true,
				intro: {
					markcount(storage) {
						if (storage) {
							var list = storage.filter((_, i) => i % 3 == 2);
							return Math.min.apply(null, list);
						}
					},
					content(storage, player) {
						if (!storage) {
							return;
						}
						var str = '失去';
						str +=
							get.cnNumber(
								Math.min.apply(
									null,
									storage.filter((_, i) => i % 3 == 2),
								),
							) + '张牌后，或失去一张';
						for (var i = 0; i < storage.length / 3; i++) {
							str += get.translation(storage[i * 3 + 1]) + '、';
						}
						str = str.slice(0, -1);
						str += '后，失去等同于体力值的体力';
						return str;
					},
				},
				filter(event, player) {
					if (!player.getStorage('qmsgswkjsgj_re_dcxiangmianplus_countdown').length) {
						return false;
					}
					if (!event.getl(player).cards.length) {
						return false;
					}
					return true;
				},
				content() {
					'step 0';
					var cards = trigger.getl(player).cards;
					var storage = player.getStorage('qmsgswkjsgj_re_dcxiangmianplus_countdown');
					for (var i = 0; i < storage.length / 3; i++) {
						if (get.YB_suit(cards).includes(storage[i * 3 + 1])) {
							storage[i * 3 + 2] = 0;
						} else {
							storage[i * 3 + 2]-=cards.length;
						}
					}
					player.markSkill('qmsgswkjsgj_re_dcxiangmianplus_countdown');
					('step 1');
					var storage = player.getStorage('qmsgswkjsgj_re_dcxiangmianplus_countdown');
					for (var i = 0; i < storage.length / 3; i++) {
						if (storage[i * 3 + 2] <= 0) {
							if (!event.isMine() && !event.isOnline()) {
								game.delayx();
							}
							player.logSkill('qmsgswkjsgj_re_dcxiangmianplus_countdown');
							player.storage['qmsgswkjsgj_re_dcxiangmianplus_countdown'].splice(i * 3, 3);
							if (!player.getStorage('qmsgswkjsgj_re_dcxiangmianplus_countdown').length) {
								player.removeSkill('qmsgswkjsgj_re_dcxiangmianplus_countdown');
							}
							if (player.hp > 0) {
								player.loseHp(player.hp);
							}
							i--;
						}
					}
				},
				ai: {
					effect: {
						player_use(card, player, target) {
							if (typeof card != 'object') {
								return;
							}
							var storage = player.getStorage('qmsgswkjsgj_re_dcxiangmianplus_countdown');
							for (var i = 0; i < storage.length / 3; i++) {
								if (storage[i * 3 + 2] == 1 || get.suit(card, player) == storage[i * 3 + 1]) {
									if (!player.canSave(player) && !get.tag(card, 'save')) {
										return [0, -100, 0, 0];
									}
									return [1, -2 * player.hp, 1, 0];
								}
							}
						},
					},
				},
			},
		},
	},
	qmsgswkjsgj_re_dcxiangmianplusplus: {
		audio: 'dcxiangmian',
		enable: 'phaseUse',
		usable: 2,
		filter(event, player) {
			return game.hasPlayer((current) => lib.skill.qmsgswkjsgj_re_dcxiangmianplusplus.filterTarget(null, player, current));
		},
		filterTarget(card, player, target) {
			return !target.hasSkill('qmsgswkjsgj_re_dcxiangmianplusplus_countdown') && player != target;
		},
		content() {
			'step 0';
			target.judge((card) => -2 / Math.sqrt(get.number(card, false))).set('judge2', (result) => (result.bool === false ? true : false));
			('step 1');
			player.markAuto('qmsgswkjsgj_re_dcxiangmianplusplus', [target]);
			target.addSkill('qmsgswkjsgj_re_dcxiangmianplusplus_countdown');
			if (!target.storage['qmsgswkjsgj_re_dcxiangmianplusplus_countdown']) {
				target.storage['qmsgswkjsgj_re_dcxiangmianplusplus_countdown'] = [];
			}
			[player.playerid, result.suit, result.number].forEach((i) => target.storage['qmsgswkjsgj_re_dcxiangmianplusplus_countdown'].push(i));
			target.markSkill('qmsgswkjsgj_re_dcxiangmianplusplus_countdown');
		},
		// intro: { content: "已对$发动过技能" },
		ai: {
			expose: 0.3,
			order: 10,
			result: { target: -5 },
		},
		subSkill: {
			countdown: {
				// trigger: { player: 'useCardAfter' },
				trigger:{
					player:'loseAfter'
				},
				mark: true,
				marktext: '💀',
				silent: true,
				forced: true,
				charlotte: true,
				intro: {
					markcount(storage) {
						if (storage) {
							var list = storage.filter((_, i) => i % 3 == 2);
							return Math.min.apply(null, list);
						}
					},
					content(storage, player) {
						if (!storage) {
							return;
						}
						var str = '失去点数不大于';
						str +=
							get.cnNumber(
								Math.min.apply(
									null,
									storage.filter((_, i) => i % 3 == 2),
								),
							) + '的牌后，或失去一张';
						for (var i = 0; i < storage.length / 3; i++) {
							str += get.translation(storage[i * 3 + 1]) + '、';
						}
						str = str.slice(0, -1);
						str += '后，失去等同于体力值的体力';
						return str;
					},
				},
				filter(event, player) {
					if (!player.getStorage('qmsgswkjsgj_re_dcxiangmianplusplus_countdown').length) {
						return false;
					}
					if (!event.getl(player).cards.length) {
						return false;
					}
					// return true;
					var cards = event.getl(player).cards;
					var storage = player.getStorage('qmsgswkjsgj_re_dcxiangmianplusplus_countdown');
					for(var i of cards){
						for(var k = 0;k<storage.length/3;k++){
							if(get.num(i)<=storage[k * 3 + 2])return true;
							if(get.suit(i)==storage[k * 3 + 1])return true;
						}
					}
					return false;
				},
				content() {
					'step 0';
					var cards = trigger.getl(player).cards;
					var storage = player.getStorage('qmsgswkjsgj_re_dcxiangmianplusplus_countdown');
					for(var k of cards){
						for (var i = 0; i < storage.length / 3; i++) {
							if(get.num(k)<=storage[i * 3 + 2])storage[i * 3 + 2] = 0;
							if(get.suit(k)==storage[i * 3 + 1])storage[i * 3 + 2] = 0;
						}
					}
					player.markSkill('qmsgswkjsgj_re_dcxiangmianplusplus_countdown');
					('step 1');
					var storage = player.getStorage('qmsgswkjsgj_re_dcxiangmianplusplus_countdown');
					for (var i = 0; i < storage.length / 3; i++) {
						if (storage[i * 3 + 2] <= 0) {
							if (!event.isMine() && !event.isOnline()) {
								game.delayx();
							}
							player.logSkill('qmsgswkjsgj_re_dcxiangmianplusplus_countdown');
							player.storage['qmsgswkjsgj_re_dcxiangmianplusplus_countdown'].splice(i * 3, 3);
							if (!player.getStorage('qmsgswkjsgj_re_dcxiangmianplusplus_countdown').length) {
								player.removeSkill('qmsgswkjsgj_re_dcxiangmianplusplus_countdown');
							}
							if (player.hp > 0) {
								player.loseHp(player.hp);
							}
							i--;
						}
					}
				},
				ai: {
					effect: {
						player_use(card, player, target) {
							if (typeof card != 'object') {
								return;
							}
							var storage = player.getStorage('qmsgswkjsgj_re_dcxiangmianplusplus_countdown');
							for (var i = 0; i < storage.length / 3; i++) {
								if (storage[i * 3 + 2] == 1 || get.suit(card, player) == storage[i * 3 + 1]) {
									if (!player.canSave(player) && !get.tag(card, 'save')) {
										return [0, -100, 0, 0];
									}
									return [1, -2 * player.hp, 1, 0];
								}
							}
						},
					},
				},
			},
		},
	},

	//郭缇萦
	qmsgswkjsgj_re_dckanyu: {
		audio: 'dckanyu',
		trigger: {
			player: 'damageEnd',
			global: 'judgeBegin',
		},
		frequent: true,
		getIndex(event, player) {
			if (event.name == 'judge') {
				return 1;
			}
			return event.num;
		},
		async content(event, trigger, player) {
			// 获取牌堆顶和牌堆底的牌各两张
			const pileTop = Array.from(ui.cardPile.childNodes).slice(0, 2);
			const pileBottom = Array.from(ui.cardPile.childNodes).slice(-2).reverse();
			const { cards } = await game.cardsGotoOrdering([...pileTop, ...pileBottom]);
			const [top1, top2, bottom1, bottom2] = cards;
			const top = [top1, top2].filter((c) => c);
			const bottom = [bottom1, bottom2].filter((c) => c);
			const next = player.chooseToMove_new(get.translation(event.name), true);
			next.set('list', [
				['获得', []],
				[
					['牌堆顶', top],
					['牌堆底', bottom],
				],
			]);
			next.set('processAI', (list) => {
				let player = get.player(),
					trigger = get.event().getTrigger(),
					cards = list[1].map((i) => i[1]).flat();
				//只要贪不死就往死里贪
				if (!trigger?.judge || !trigger.player) {
					return [cards, [], []];
				}
				let att = get.sgnAttitude(player, trigger.player);
				cards.sort((a, b) => {
					return (trigger.judge(b) - trigger.judge(a)) * att;
				});
				if (trigger.judge(cards[0]) > 0) {
					return [cards.slice(1), cards.slice(0, 1), []];
				}
				return [cards, [], []];
			});
			const result = await next.forResult();
			if (!result?.bool) {
				return;
			}
			const [gains, tops, bottoms] = result.moved;
			if (gains.length) {
				await player.gain(gains, 'gain2');
				const name = `${event.name}_tiandu`,
					map = player.getStorage(name, new Map());
				gains.forEach((card) => {
					const suit = get.suit(card, false),
						number = get.number(card, false);
					const numbers = map.has(suit) ? map.get(suit) : [];
					map.set(suit, numbers.concat([number]));
				});
				player.setStorage(name, map, true);
				player.addSkill(name);
			}
			if (tops.length) {
				tops.reverse();
				for (let i = 0; i < tops.length; i++) {
					ui.cardPile.insertBefore(tops[i], ui.cardPile.firstChild);
				}
			}
			if (bottoms.length) {
				for (let i = 0; i < bottoms.length; i++) {
					ui.cardPile.appendChild(bottoms[i]);
				}
			}
			game.updateRoundNumber();
			await game.delay();
		},
		subSkill: {
			tiandu: {
				charlotte: true,
				onremove: true,
				marktext: '舆',
				intro: {
					content: '雷公助我！',
					mark(dialog, storage, player) {
						const addNewRow = lib.element.dialog.addNewRow.bind(dialog);
						dialog.css({ width: '50%' });
						if (get.is.phoneLayout()) {
							dialog.classList.add('fullheight');
						}
						const records = player.getStorage('qmsgswkjsgj_re_dckanyu_tiandu', new Map());
						let suits = lib.suit.slice(),
							numbers = Array.from(Array(13)).map((value, index) => index + 1);
						addNewRow(
							...[' '].concat(numbers.map((number) => get.strNumber(number))).map((number) => {
								return { item: number, ratio: number == ' ' ? 1 : 2 };
							}),
						);
						for (const suit of suits) {
							let list = [{ item: get.translation(suit), ratio: 1 }];
							for (const number of numbers) {
								list.add({
									item: ((suit, number, records) => {
										if (suit == 'spade' && number >= 2 && number <= 9) {
											return '⚡';
										}
										if (records.has(suit) && records.get(suit).includes(number)) {
											return '⚡';
										}
										return "<span class='greentext'>●</span>";
									})(suit, number, records),
									ratio: 2,
								});
							}
							addNewRow(...list);
						}
					},
				},
				trigger: {
					player: 'judgeBefore',
				},
				filter(event, player) {
					return event.card?.name == 'shandian';
				},
				firstDo: true,
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					trigger.judgeFromKanyu = trigger.judge;
					trigger.judge = function (card) {
						const { player, judgeFromKanyu } = this;
						const suit = get.suit(card, false),
							number = get.number(card, false),
							map = player.getStorage('dckanyu_tiandu', new Map());
						if (map.has(suit) && map.get(suit).includes(number)) {
							return -5;
						}
						return judgeFromKanyu(card);
					};
				},
			},
		},
	},
	qmsgswkjsgj_re_dczhee: {
		audio: 'dczhee',
		trigger: {
			player: 'enterGame',
			global: ['phaseBefore', 'phaseEnd'],
		},
		filter(event, player, name) {
			if (name == 'phaseBefore' && game.phaseNumber !== 0) {
				return false;
			}
			const pos = name == 'phaseEnd' ? 'discardPile' : 'cardPile';
			return Array.from(ui[pos].childNodes).some((card) => card.name == 'shandian' && player.canAddJudge(card));
		},
		forced: true,
		async content(event, trigger, player) {
			const name = event.triggername;
			const card = get[name == 'phaseEnd' ? 'discardPile' : 'cardPile2']((card) => {
				return card.name == 'shandian' && player.canAddJudge(card);
			});
			// var zhu = ;
			const target = name == 'phaseEnd' ? _status.currentPhase.next : game.filterPlayer((current) => current.getSeatNum() == 1)[0];
			if (card && target.canAddJudge(card)) {
				await target.addJudge(card);
			}
		},
	},
	tiandu_qmsgswkjsgj_re_guotiying: {
		audio: 'dczhee',
	},

	//曹芳
	qmsgswkjsgj_re_dczhimin: {
		audio: 'dczhimin',
		trigger: { global: 'roundStart' },
		filter(event, player) {
			return game.hasPlayer((current) => current != player && current.countCards('h')) && player.getHp() > 0;
		},
		forced: true,
		group: ['qmsgswkjsgj_re_dczhimin_mark', 'qmsgswkjsgj_re_dczhimin_draw', 'qmsgswkjsgj_re_dczhimin_phaseUse'],
		async content(event, trigger, player) {
			const result = await player
				.chooseTarget(
					`置民：请选择至多${get.cnNumber(player.maxHp)}名其他角色`,
					'你获得这些角色各自手牌中的随机一张点数最小的牌',
					(card, player, target) => {
						return target !== player && target.countCards('h');
					},
					[1, player.maxHp],
					true,
				)
				.set('ai', (target) => {
					const player = get.player();
					return get.effect(target, { name: 'shunshou_copy', position: 'h' }, player, player) + 0.1;
				})
				.forResult();
			if (!result?.targets?.length) {
				return;
			}
			const targets = result.targets.sortBySeat();
			player.line(targets, 'thunder');
			const toGain = [];
			for (const target of targets) {
				const cards = target.getCards('h'),
					minNumber = cards.map((card) => get.number(card)).sort((a, b) => a - b)[0];
				const gainableCards = cards
					.filter((card) => {
						return get.number(card) === minNumber && lib.filter.canBeGained(card, player, target);
					})
					.randomSort();
				toGain.push(gainableCards[0]);
			}
			if (toGain.length) {
				await player.gain(toGain, 'giveAuto');
			}
			await game.delayx();
		},
		ai: { threaten: 5.8 },
		mod: {
			aiOrder(player, card, num) {
				if (
					num > 0 &&
					get.itemtype(card) === 'card' &&
					card.hasGaintag('dczhimin_tag') &&
					player.countCards('h', (cardx) => {
						return cardx.hasGaintag('dczhimin_tag') && cardx !== card;
					}) < player.maxHp
				) {
					return num / 10;
				}
			},
		},
		subSkill: {
			phaseUse: {
				audio: 'dczhimin',
				enable: 'phaseUse',
				filter(event, player) {
					return !player.hasSkill('qmsgswkjsgj_re_dczhimin_markx');
				},
				selectTarget() {
					return [1, get.player().maxHp];
				},
				filterTarget(card, player, target) {
					return target !== player && target.countCards('h');
				},
				prompt() {
					var player = _status.event.player;
					return `置民：请选择至多${get.cnNumber(player.maxHp)}名其他角色`;
				},
				prompt2() {
					'你获得这些角色各自手牌中的随机一张点数最小的牌';
				},
				multiline: true,
				multitarget: true,
				async content(event, trigger, player) {
					await player.YB_tempx('qmsgswkjsgj_re_dczhimin_markx');
					const toGain = [];
					for (const target of event.targets) {
						const cards = target.getCards('h'),
							minNumber = cards.map((card) => get.number(card)).sort((a, b) => a - b)[0];
						const gainableCards = cards
							.filter((card) => {
								return get.number(card) === minNumber && lib.filter.canBeGained(card, player, target);
							})
							.randomSort();
						toGain.push(gainableCards[0]);
					}
					if (toGain.length) {
						await player.gain(toGain, 'giveAuto');
					}
					await game.delayx();
				},
				ai: {
					order: 10,
					threaten: 1.5,
					result: {
						player: function (player, target) {
							return get.effect(target, { name: 'shunshou_copy', position: 'h' }, player, player) + 0.1;
						},
						target: function (player, target) {
							return get.effect(target, { name: 'shunshou_copy', position: 'h' }, player, target) + 0.1;
						},
					},
				},
			},
			mark: {
				audio: 'dczhimin',
				trigger: {
					player: 'gainAfter',
					global: 'loseAsyncAfter',
				},
				forced: true,
				filter(event, player) {
					if (_status.currentPhase === player || !event.getg(player).some((card) => get.position(card) === 'h' && get.owner(card) === player)) {
						return false;
					}
					return true;
				},
				async content(event, trigger, player) {
					player.addGaintag(
						trigger.getg(player).filter((card) => get.position(card) === 'h' && get.owner(card) === player),
						'qmsgswkjsgj_re_dczhimin_tag',
					);
				},
			},
			draw: {
				audio: 'dczhimin',
				trigger: {
					player: 'loseAfter',
					global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
				},
				forced: true,
				filter(event, player) {
					const evt = event.getl(player);
					if (!evt.hs.length || player.maxHp <= player.countCards('h')) {
						return false;
					}
					return Object.values(evt.gaintag_map).flat().includes('qmsgswkjsgj_re_dczhimin_tag');
				},
				async content(event, trigger, player) {
					await player.drawTo(player.maxHp);
				},
			},
		},
	},
	qmsgswkjsgj_re_dcjujian: {
		audio: 'dcjujian',
		enable: 'phaseUse',
		// usable: 1,
		zhuSkill: true,
		filter(event, player) {
			return game.hasPlayer((current) => {
				return player.hasZhuSkill('qmsgswkjsgj_re_dcjujian', current) && current.group === 'wei' && current !== player && !player.getStorage('qmsgswkjsgj_re_dcjujian_mark').includes(current);
			});
		},
		filterTarget(_, player, target) {
			return player.hasZhuSkill('qmsgswkjsgj_re_dcjujian', target) && target.group === 'wei' && target !== player && !player.getStorage('qmsgswkjsgj_re_dcjujian_mark').includes(target);
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			await player.YB_tempz('qmsgswkjsgj_re_dcjujian_mark', target);
			const result = await player.chooseControl('令其摸牌', '令其使用锦囊牌对你无效').set('ai', function () {
				var player = _status.event.player;
				if (get.attitude(player, target) < 0) return '令其使用锦囊牌对你无效';
				return '令其摸牌';
			}).forResult();
			if (result.control) {
				if (result.control == '令其摸牌') {
					await target.draw();
				} else {
					target.addTempSkill('qmsgswkjsgj_re_dcjujian_forbid', 'roundStart');
					target.markAuto('qmsgswkjsgj_re_dcjujian_forbid', player);
				}
			}
		},
		ai: {
			result: {
				target(player, target) {
					const num = target.countCards('hs', (card) => {
							return get.type(card) == 'trick' && target.canUse(card, player) && get.effect(player, card, target, player) < -2;
						}),
						att = get.attitude(player, target);
					if (att < 0) {
						return -0.74 * num;
					}
					return 1.5;
				},
			},
		},
		subSkill: {
			forbid: {
				audio: 'dcjujian',
				trigger: {
					player: 'useCardToBefore',
				},
				filter(event, player) {
					if (get.type(event.card) !== 'trick') {
						return false;
					}
					return player.getStorage('qmsgswkjsgj_re_dcjujian_forbid').includes(event.target);
				},
				forced: true,
				charlotte: true,
				onremove: true,
				direct: true,
				async content(event, trigger, player) {
					await trigger.target.logSkill('qmsgswkjsgj_re_dcjujian_forbid', player);
					trigger.cancel();
				},
				intro: {
					content: '使用普通锦囊牌对$无效',
				},
				ai: {
					effect: {
						player(card, player, target, current) {
							if (get.type(card) == 'trick' && player.getStorage('dcjujian_forbid').includes(target)) {
								return 'zeroplayertarget';
							}
						},
					},
				},
			},
		},
	},

	//郭照
	qmsgswkjsgj_re_pianchong: {
		audio: 'pianchong',
		trigger: {
			player: ['phaseDrawBegin1', 'roundStart', 'phaseDrawBegin2'],
		},
		filter(event, player, name) {
			if (name == 'phaseDrawBegin2') return !event.numFixed;
			return true;
		},
		check(event, player, name) {
			if (name == 'phaseDrawBegin2') return event.num <= 2;
			return true;
		},
		async content(event, trigger, player) {
			if (event.triggername == 'phaseDrawBegin2') {
				trigger.changeToZero();
				const cards = [];
				const card1 = get.cardPile2((card) => get.color(card, false) == 'red');
				if (card1) {
					cards.push(card1);
				}
				const card2 = get.cardPile2((card) => get.color(card, false) == 'black');
				if (card2) {
					cards.push(card2);
				}
				if (cards.length) {
					await player.gain(cards, 'gain2');
				}
			} else {
				const effect = event.name + '_effect';
				const { control } = await player
					.chooseControl('red', 'black')
					.set('prompt', '偏宠：1.你每失去一张红色牌时摸一张黑色牌，2.你每失去一张黑色牌时摸一张红色牌。')
					.set('ai', () => {
						const { player, effect, controls } = get.event();
						if (!effect.length) {
							let red = 0,
								black = 0;
							const cards = player.getCards('he');
							for (const i of cards) {
								let add = 1;
								const color = get.color(i, player);
								if (get.position(i) == 'e') {
									add = 0.5;
								} else if (get.name(i, player) != 'sha' && player.hasValueTarget(i)) {
									add = 1.5;
								}
								if (color == 'red') {
									red += add;
								} else {
									black += add;
								}
							}
							if (black > red) {
								return 'black';
							}
							return 'red';
						} else if (effect.length == 1) {
							return controls.remove(effect[0])[0];
						} else {
							return controls.randomGet();
						}
					})
					.set('effect', player.getStorage(effect))
					.forResult();
				if (!['red', 'black'].includes(control)) {
					return;
				}
				// player.markAuto(effect, control);
				// player.addTempSkill(effect, { player: "phaseBeginStart" });
				player.addSkill(effect);
				if (!player.storage[effect]) player.storage[effect] = [];
				player.storage[effect].push(control);
				player.popup(control, control == 'red' ? 'fire' : 'thunder');
				game.log(player, '声明了', '#y' + get.translation(control));
			}
		},
		subSkill: {
			effect: {
				audio: 'pianchong',
				trigger: {
					player: 'loseAfter',
					global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
				},
				forced: true,
				charlotte: true,
				onremove: true,
				filter(event, player) {
					const evt = event.getl(player);
					return evt?.cards2?.some((card) => player.getStorage('qmsgswkjsgj_re_pianchong_effect').includes(get.color(card, player)));
				},
				async content(event, trigger, player) {
					let cardsx = trigger
						.getl(player)
						.cards2.filter((card) => player.getStorage(event.name).includes(get.color(card, player)))
						.slice(0);
					let cards = [];
					var num1 = player.getStorage(event.name).filter((item) => item === 'red').length || 0;
					var num2 = player.getStorage(event.name).filter((item) => item === 'black').length || 0;
					// var num1 = (player.getStorage(event.name).filter(item => item === 'red').length || 0)*cardsx.filter(cardx=>get.color(cardx,player)=='red').length;
					// var num2 = (player.getStorage(event.name).filter(item => item === 'black').length || 0)*cardsx.filter(cardx=>get.color(cardx,player)=='black').length;
					while (cardsx.length) {
						let precard = cardsx.shift();
						if (get.color(precard, false) == 'red') {
							for (var k = 0; k < num1; k++) {
								const card = get.cardPile2((card) => !cards.includes(card) && get.color(card, false) == 'black');
								if (card) {
									cards.push(card);
								} else {
									break;
								}
							}
							break;
						}
						if (get.color(precard, false) == 'black') {
							for (var k = 0; k < num1; k++) {
								const card = get.cardPile2((card) => !cards.includes(card) && get.color(card, false) == 'red');
								if (card) {
									cards.push(card);
								} else {
									break;
								}
							}
							break;
						}
					}

					// while(num1--){
					// 	for(var i of ui.cardPile.childNodes){
					// 		if (get.color(i, false) == 'black') {
					// 			cards.push(i);
					// 			break;
					// 		}
					// 	}
					// 	break;
					// }
					// while(num2--){
					// 	for(var i of ui.cardPile.childNodes){
					// 		if(get.color(i,false)=='red'){
					// 			cards.push(i);
					// 			break;
					// 		}
					// 	}
					// 	break;
					// }
					// for(var i of ui.cardPile.childNodes){
					// 	if(num1>0&&get.color(i,false)=='black'){
					// 		cards.push(i);
					// 		num1--;
					// 	}
					// 	if(num2>0&&get.color(i,false)=='red'){
					// 		cards.push(i);
					// 		num2--;
					// 	}
					// }
					if (cards.length) {
						// await player.gain(cards, "gain2", false);
						var func = (function (cards) {
							return function () {
								return cards;
							};
						})(cards);
						// (function(){return cards})(cards)
						await player.YB_drawCard(cards.length, func);
					}
				},
				mark: true,
				intro: {
					content: function (storage, player) {
						// var str = ''
						var str = [];
						var num1 = storage?.filter((item) => item === 'red').length || 0;
						var num2 = storage?.filter((item) => item === 'black').length || 0;
						if (num1 > 0) {
							str.push(`你每失去一张红色牌时摸${num1}张黑色牌`);
						}
						if (num2 > 0) {
							str.push(`你每失去一张黑色牌时摸${num2}张红色牌`);
						}
						if (str.length == 0) return '';
						else return str.join('<br>');
					},
				},
			},
		},
		ai: { threaten: 4.8 },
	},
	qmsgswkjsgj_re_zunwei: {
		audio: 'zunwei',
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			let storage = player.getStorage('zunwei');
			return (
				storage.length < 3 &&
				game.hasPlayer((current) => {
					return (player.isDamaged() && current.getHp() > player.getHp() && !storage.includes(0)) || (current.countCards('h') > player.countCards('h') && !storage.includes(1)) || (current.countCards('e') > player.countCards('e') && !storage.includes(2));
				})
			);
		},
		chooseButton: {
			dialog(event, player) {
				var list = ['选择体力值大于你的一名角色', '选择手牌数大于你的一名角色', '选择装备数大于你的一名角色'];
				var choiceList = ui.create.dialog('尊位：请选择一项', 'forcebutton', 'hidden');
				choiceList.add([
					list.map((item, i) => {
						// if (player.getStorage("qmsgswkjsgj_re_zunwei").includes(i)) {
						// 	item = `<span style="text-decoration: line-through;">${item}</span>`;
						// }
						return [i, item];
					}),
					'textbutton',
				]);
				return choiceList;
			},
			filter(button) {
				const player = get.player();
				if (player.getStorage('qmsgswkjsgj_re_zunwei').includes(button.link)) {
					return false;
				}
				if (button.link == 0) {
					if (!player.isDamaged()) {
						return false;
					}
					return game.hasPlayer((current) => {
						return current.getHp() > player.getHp();
					});
				}
				if (button.link == 1) {
					return game.hasPlayer((current) => {
						return current.countCards('h') > player.countCards('h');
					});
				}
				if (button.link == 2) {
					return game.hasPlayer((current) => {
						return current.countCards('e') > player.countCards('e');
					});
				}
			},
			backup(links) {
				var next = get.copy(lib.skill.qmsgswkjsgj_re_zunwei.backups[links[0]]);
				next.audio = 'zunwei';
				next.filterCard = function () {
					return false;
				};
				next.selectCard = -1;
				return next;
			},
			check(button) {
				var player = _status.event.player;
				switch (button.link) {
					case 0: {
						var target = game.findPlayer(function (current) {
							return current.isMaxHp();
						});
						return (Math.min(target.hp, player.maxHp) - player.hp) * 2;
					}
					case 1: {
						var target = game.findPlayer(function (current) {
							return current.isMaxHandcard();
						});
						return Math.min(5, target.countCards('h') - player.countCards('h')) * 0.8;
					}
					case 2: {
						var target = game.findPlayer(function (current) {
							return current.isMaxEquip();
						});
						return (target.countCards('e') - player.countCards('e')) * 1.4;
					}
				}
			},
			prompt(links) {
				return ['选择一名体力值大于你的其他角色，将体力值回复至与其相同', '选择一名手牌数大于你的其他角色，将手牌数摸至与其相同', '选择一名装备区内牌数大于你的其他角色，依次使用牌堆中的装备牌，直到装备数与其相同'][links[0]];
			},
		},
		backups: [
			{
				filterTarget(card, player, target) {
					if (player.isHealthy()) {
						return false;
					}
					return target.hp > player.hp;
				},
				content() {
					player.recover(target.hp - player.hp);
					if (!player.storage.qmsgswkjsgj_re_zunwei) {
						player.storage.qmsgswkjsgj_re_zunwei = [];
					}
					player.storage.qmsgswkjsgj_re_zunwei.add(0);
				},
				ai: {
					order: 10,
					result: {
						player(player, target) {
							return Math.min(target.hp, player.maxHp) - player.hp;
						},
					},
				},
			},
			{
				filterTarget(card, player, target) {
					return target.countCards('h') > player.countCards('h');
				},
				content() {
					player.draw(Math.min(5, target.countCards('h') - player.countCards('h')));
					if (!player.storage.qmsgswkjsgj_re_zunwei) {
						player.storage.qmsgswkjsgj_re_zunwei = [];
					}
					player.storage.qmsgswkjsgj_re_zunwei.add(1);
				},
				ai: {
					order: 10,
					result: {
						player(player, target) {
							return Math.min(5, target.countCards('h') - player.countCards('h'));
						},
					},
				},
			},
			{
				filterTarget(card, player, target) {
					return target.countCards('e') > player.countCards('e');
				},
				content() {
					'step 0';
					if (!player.storage.qmsgswkjsgj_re_zunwei) {
						player.storage.qmsgswkjsgj_re_zunwei = [];
					}
					player.storage.qmsgswkjsgj_re_zunwei.add(2);
					event.num = 1;
					('step 1');
					var type = 'equip' + num;
					if (!player.hasEmptySlot(type)) {
						return;
					}
					var card = get.cardPile2(function (card) {
						return get.subtype(card, false) == type && player.canUse(card, player);
					});
					if (card) {
						player.chooseUseTarget(card, true).nopopup = true;
					}
					('step 2');
					event.num++;
					if (event.num <= 5 && target.isIn() && player.countCards('e') < target.countCards('e')) {
						event.goto(1);
					}
				},
				ai: {
					order: 10,
					result: {
						player(player, target) {
							return target.countCards('e') - player.countCards('e');
						},
					},
				},
			},
		],
		ai: {
			order: 10,
			result: {
				player: 1,
			},
		},
	},

	//曹髦
	qmsgswkjsgj_re_qianlong: {
		audio: 'qianlong',
		trigger: { player: 'damageEnd' },
		frequent: true,
		filter(event, player) {
			return player.maxHp > 0;
		},
		content() {
			'step 0';
			var num = player.maxHp;
			var cards = get.cards(num);
			event.cards = cards;
			game.cardsGotoOrdering(cards);
			//展示牌
			game.log(player, '展示了', event.cards);
			event.videoId = lib.status.videoId++;
			game.broadcastAll(
				function (player, id, cards) {
					if (player == game.me || player.isUnderControl()) {
						return;
					}
					var str = get.translation(player) + '发动了【潜龙】';
					var dialog = ui.create.dialog(str, cards);
					dialog.videoId = id;
				},
				player,
				event.videoId,
				event.cards,
			);
			game.addVideo('showCards', player, [get.translation(player) + '发动了【潜龙】', get.cardsInfo(event.cards)]);
			if (player != game.me && !player.isUnderControl() && !player.isOnline()) {
				game.delay(2);
			}
			//选牌
			var next = player.chooseToMove('潜龙：获得至多' + get.cnNumber(Math.min(3, player.getDamagedHp())) + '张牌并将其余牌置于牌堆底');
			next.set('list', [['置于牌堆底', cards], ['自己获得']]);
			next.set('filterMove', function (from, to, moved) {
				if (moved[0].includes(from.link)) {
					if (typeof to == 'number') {
						if (to == 1) {
							if (moved[1].length >= _status.event.player.getDamagedHp()) {
								return false;
							}
						}
						return true;
					}
				}
				return true;
			});
			next.set('processAI', function (list) {
				let cards = list[0][1].slice(0),
					player = _status.event.player;
				cards.sort((a, b) => {
					return get.value(b, player) - get.value(a, player);
				});
				if (!player.storage.juetao && player.hasSkill('juetao') && player.hasSha()) {
					let gain,
						bottom,
						pai = cards.filter((card) => card.name !== 'sha');
					pai.sort((a, b) => {
						return get.value(b, player) - get.value(a, player);
					});
					gain = pai.splice(0, player.getDamagedHp());
					bottom = cards.slice(0);
					bottom.removeArray(gain);
					return [bottom, gain];
				}
				return [cards, cards.splice(0, player.getDamagedHp())];
			});
			('step 1');
			game.broadcastAll('closeDialog', event.videoId);
			game.addVideo('cardDialog', null, event.videoId);
			var moved = result.moved;
			if (moved[0].length > 0) {
				for (var i of moved[0]) {
					i.fix();
					ui.cardPile.appendChild(i);
				}
			}
			if (moved[1].length > 0) {
				player.gain(moved[1], 'gain2');
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (get.tag(card, 'damage')) {
						if (player.hasSkillTag('jueqing', false, target)) {
							return;
						}
						if (!target.hasFriend()) {
							return;
						}
						var num = 1;
						if (!player.needsToDiscard() && target.isDamaged()) {
							num = 0.7;
						} else {
							num = 0.5;
						}
						if (target.hp >= 4) {
							return [1, num * 2];
						}
						if (target.hp == 3) {
							return [1, num * 1.5];
						}
						if (target.hp == 2) {
							return [1, num * 0.5];
						}
					}
				},
			},
		},
	},
	qmsgswkjsgj_re_juetao: {
		audio: 'juetao',
		trigger: { player: 'phaseUseBegin' },
		direct: true,
		// limited: true,
		// skillAnimation: true,
		// animationColor: "thunder",
		filter(event, player) {
			return player.hp == 1;
		},
		content() {
			'step 0';
			player.chooseTarget(get.prompt2('qmsgswkjsgj_re_juetao'), lib.filter.notMe).set('ai', function (target) {
				let att = -get.attitude(_status.event.player, target);
				if (att <= 0) {
					return att;
				}
				if (
					target.hasSkillTag('nodamage', null, {
						source: player,
					}) ||
					target.getEquip('qimenbagua')
				) {
					return 0.01 * att;
				}
				if (target.getEquip('tengjia') || target.getEquip('renwang')) {
					return 0.3 * att;
				}
				if (target.getEquip('rewrite_tengjia') || target.getEquip('rewrite_renwang')) {
					return 0.2 * att;
				}
				if (
					target.hasSkillTag(
						'freeShan',
						false,
						{
							player: _status.event.player,
							type: 'use',
						},
						true,
					)
				) {
					return 0.3 * att;
				}
				if (target.getEquip(2)) {
					return att / 2;
				}
				return 1.2 * att;
			});
			('step 1');
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.logSkill('qmsgswkjsgj_re_juetao', target);
				// player.awakenSkill(event.name);
			} else {
				event.finish();
			}
			('step 2');
			var card = get.bottomCards()[0];
			game.cardsGotoOrdering(card);
			player.showCards(card);
			player
				.chooseUseTarget(card, true, false, 'nodistance')
				.set('filterTarget', function (card, player, target) {
					var evt = _status.event;
					if (_status.event.name == 'chooseTarget') {
						evt = evt.getParent();
					}
					if (target != player && target != evt.qmsgswkjsgj_re_juetao_target) {
						return false;
					}
					return lib.filter.targetEnabledx(card, player, target);
				})
				.set('qmsgswkjsgj_re_juetao_target', target);
			('step 3');
			if (result.bool && target.isIn()) {
				event.goto(2);
			}
		},
	},
	qmsgswkjsgj_re_zhushi: {
		audio: 'zhushi',
		// usable: 1,
		trigger: { global: 'recoverEnd' },
		zhuSkill: true,
		filter(event, player) {
			return player != event.player && event.player.group == 'wei' && player.hasZhuSkill('zhushi', event.player);
		},
		// async cost(event, trigger, player) {
		// 	const str = get.translation(player);
		// 	event.result = await trigger.player
		// 		.chooseBool(`是否响应${str}的主公技【助势】？`, `令${str}摸一张牌`)
		// 		.set("goon", get.attitude(trigger.player, player) > 0)
		// 		.set("ai", () => _status.event.goon)
		// 		.forResult();
		// },
		async content(event, trigger, player) {
			// trigger.player.line(player, "thunder");
			player.line(trigger.player, 'thunder');
			await player.draw();
		},
	},
	//神庞统
	qmsgswkjsgj_kunyu: {
		audio: 'kunyu',
		trigger: { player: "dieBegin" },
		filter(event, player) {
			if (!(event.getParent().name !== "giveup" && player.maxHp > 0)) {
				return false;
			}
			return get.cardPile2(c => get.tag(c, "fireDamage"));
		},
		forced: true,
		async content(event, trigger, player) {
			const card = get.cardPile2(c => get.tag(c, "fireDamage"));
			if (!card) {
				return;
			}
			await game.cardsGotoSpecial(card);
			game.log(player, "将", card, "移出游戏");
			await player.recoverTo(1);
			if (player.getHp() > 0) {
				trigger.cancel();
			}
		},
		// group: "qmsgswkjsgj_kunyu_debuff",
		// subSkill: {
		// 	debuff: {
		// 		audio: "qmsgswkjsgj_kunyu",
		// 		trigger: {
		// 			global: "phaseBefore",
		// 			player: ["gainMaxHpBegin", "loseMaxHpBegin", "enterGame"],
		// 		},
		// 		forced: true,
		// 		filter(event, player) {
		// 			let bool = player.maxHp !== 1;
		// 			if (event.name === "phase") {
		// 				return bool && game.phaseNumber === 0;
		// 			}
		// 			return true;
		// 		},
		// 		async content(event, trigger, player) {
		// 			if (["gainMaxHp", "loseMaxHp"].includes(trigger.name)) {
		// 				trigger.cancel();
		// 			} else {
		// 				player.maxHp = 1;
		// 				player.update();
		// 			}
		// 		},
		// 	},
		// },
	},
	//乐蔡文姬

	qmsgswkjsgj_re_dcshuangjia: {
		audio: 'dcshuangjia',
		trigger: {
			// global: 'phaseBefore',
			// player: 'enterGame',
			player:'roundBefore',
		},
		forced: true,
		filter(event, player) {
			// return event.name != 'phase' || game.phaseNumber == 0;
			return true;
		},
		content() {
			'step 0';
			var cards = player.getCards('h');
			player.addGaintag(cards, 'dcshuangjia_tag');
		},
		mod: {
			// ignoredHandcard(card, player) {
			// 	if (card.hasGaintag('dcshuangjia_tag')) {
			// 		return true;
			// 	}
			// },
			// cardDiscardable(card, player, name) {
			// 	if (name == 'phaseDiscard' && card.hasGaintag('dcshuangjia_tag')) {
			// 		return false;
			// 	}
			// },
			globalTo(from, to, distance) {
				return (
					distance + to.countCards('h', (card) => card.hasGaintag('dcshuangjia_tag'))
					// Math.min(
					// 	5,
					// 	to.countCards("h", card => card.hasGaintag("dcshuangjia_tag"))
					// )
				);
			},
		},
		group: ['qmsgswkjsgj_re_dcshuangjia_after'],
		subSkill: {
			after: {
				audio: 'qmsgswkjsgj_re_dcshuangjia',
				trigger: { player: 'phaseAfter' },
				prompt: '是否将所有手牌标记为“胡笳”？',
				content: function () {
					'step 0';
					var cards = player.getCards('h');
					player.addGaintag(cards, 'dcshuangjia_tag');
				},
			},
		},
	},
	qmsgswkjsgj_re_dcbeifen: {
		audio: 'dcbeifen',
		trigger: {
			player: ["loseAfter"],
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		// filter(event, player) {
		// 	var evt = event.getl(player);
		// 	if (!evt || !evt.hs || !evt.hs.length) {
		// 		return false;
		// 	}
		// 	if (event.name == "lose") {
		// 		for (var i in event.gaintag_map) {
		// 			if (event.gaintag_map[i].includes("dcshuangjia_tag")) {
		// 				return true;
		// 			}
		// 		}
		// 		return false;
		// 	}
		// 	return player.hasHistory("lose", evt => {
		// 		if (event != evt.getParent()) {
		// 			return false;
		// 		}
		// 		for (var i in evt.gaintag_map) {
		// 			if (evt.gaintag_map[i].includes("dcshuangjia_tag")) {
		// 				return true;
		// 			}
		// 		}
		// 		return false;
		// 	});
		// },
		filter(event, player) {
			var evt = event.getl(player);
			if (!evt || !evt.hs || !evt.hs.length) {
				return false;
			}
			var list = [];
			if (event.name == "lose") {
				for (var i in event.gaintag_map) {
					if (event.gaintag_map[i].includes("dcshuangjia_tag")) {
						// return true;
						event.cards.forEach((c) => {
							if ((c.cardid = i)) {
								list.push(c)
							}
						});
					}
				}
				return false;
			}
			player.hasHistory("lose", evt => {
				if (event != evt.getParent()) {
					return false;
				}
				for (var i in evt.gaintag_map) {
					if (evt.gaintag_map[i].includes("dcshuangjia_tag")) {
						evt.cards.forEach((c) => {
							if ((c.cardid = i)) {
								list.push(c)
							}
						});
					}
				}
				return false;
			});
			return event.cardsx=list;
		},
		forced: true,
		content() {
			// var evt = trigger.getl(player);
			var suits = lib.suit.slice();
			// var cardsx=evt.hs;
			var cardsx = trigger.cardsx;
			var cards = [];
			while (cardsx.length){
				var cardxx=cardsx.shift();
				var suits = lib.suit.slice();
				suits.remove(get.suit(cardxx,false));
				while (suits.length) {
					var suit = suits.shift();
					var card = get.cardPile(cardx => {
						return get.suit(cardx, false) == suit;
					});
					if (card) {
						cards.push(card);
					}
				}
			}
			if (cards.length) {
				player.gain(cards, "gain2");
			}
		},
		mod: {
			cardUsable(card, player) {
				var len = player.countCards("h");
				var cnt = player.countCards("h", card => card.hasGaintag("dcshuangjia_tag"));
				if (2 * cnt < len) {
					return Infinity;
				}
			},
			targetInRange(card, player) {
				var len = player.countCards("h");
				var cnt = player.countCards("h", card => card.hasGaintag("dcshuangjia_tag"));
				if (2 * cnt < len) {
					return true;
				}
			},
			aiOrder(player, card, num) {
				if (get.itemtype(card) == "card" && card.hasGaintag("dcshuangjia_tag")) {
					var suits = lib.suit.slice();
					player.countCards("h", cardx => {
						if (!cardx.hasGaintag("dcshuangjia_tag")) {
							return false;
						}
						if (card == cardx) {
							return false;
						}
						suits.remove(get.suit(cardx));
					});
					if (suits.length) {
						return num + suits.length * 2.5;
					}
				}
			},
		},
	},
	//刘巴
	qmsgswkjsgj_re_dczhubi: {
		audio: 'dczhubi',
		trigger: {
			global: ["loseAfter", "loseAsyncAfter"],
		},
		filter(event, player) {
			if (event.type != "discard" || event.getlx === false) {
				return false;
			}
			for (var i of event.cards) {
				if (get.suit(i, event.player) == "diamond") {
					return true;
				}
			}
			return false;
		},
		prompt2: "检索一张【无中生有】并令一名角色获得之，然后其可置于牌堆顶",
		async cost(event, trigger, player){
			event.result = await player.chooseTarget(1,get.prompt2('qmsgswkjsgj_re_dczhubi')).set('ai',function(target){
				return get.attitude(player,target)>0
			}).forResult();
		},
		async content(event, trigger, player) {
			const card = get.cardPile(function (card) {
				return card.name == "wuzhong" && get.suit(card) != "diamond";
			});
			if (card) {
				game.log(event.target, "获得了", card);
				await event.target.gain(card,'gain2');
				var rexx = await event.target.chooseBool('是否将此牌置于牌堆顶').set('ai',function(){return false}).forResult();
				if(rexx.bool){
					game.log(event.target, "将", card, "置于牌堆顶");
					await game.cardsGotoPile(card, "insert");
					await game.delayx();
				}
			}
		},
	},
	qmsgswkjsgj_re_dcliuzhuan: {
		audio: 'dcliuzhuan',
		group: ["qmsgswkjsgj_re_dcliuzhuan_mark", "qmsgswkjsgj_re_dcliuzhuan_gain"],
		mod: {
			targetEnabled(card) {
				if (card.cards) {
					for (var i of card.cards) {
						if (i.hasGaintag("qmsgswkjsgj_re_dcliuzhuan_tag")) {
							return false;
						}
					}
				} else if (get.itemtype(card) == "card") {
					if (card.hasGaintag("qmsgswkjsgj_re_dcliuzhuan_tag")) {
						return false;
					}
				}
			},
		},
		subSkill: {
			gain: {
				audio: "dcliuzhuan",
				trigger: { global: ["loseAfter", "loseAsyncAfter", "cardsDiscardAfter"] },
				forced: true,
				logTarget: () => _status.currentPhase,
				filter(event, player) {
					var current = _status.currentPhase;
					if (!current) {
						return false;
					}
					if (event.name == "cardsDiscard") {
						var evtx = event.getParent();
						if (evtx.name != "orderingDiscard") {
							return false;
						}
						var evtx2 = evtx.relatedEvent || evtx.getParent();
						return current.hasHistory("lose", function (evtx3) {
							var evtx4 = evtx3.relatedEvent || evtx3.getParent();
							if (evtx2 != evtx4) {
								return false;
							}
							for (var i in evtx3.gaintag_map) {
								if (evtx3.gaintag_map[i].includes("qmsgswkjsgj_re_dcliuzhuan_tag")) {
									return true;
								}
							}
						});
						//return false;
					} else if (event.name == "lose") {
						if (event.player != current || event.position != ui.discardPile) {
							return false;
						}
						for (var i in event.gaintag_map) {
							if (event.gaintag_map[i].includes("qmsgswkjsgj_re_dcliuzhuan_tag")) {
								return true;
							}
						}
						return false;
					}
					return current.hasHistory("lose", function (evt) {
						if (evt.getParent() != event || evt.position != ui.discardPile) {
							return false;
						}
						for (var i in evt.gaintag_map) {
							if (evt.gaintag_map[i].includes("qmsgswkjsgj_re_dcliuzhuan_tag")) {
								return true;
							}
						}
					});
				},
				async content(event, trigger, player) {
					let cards;
					const current = _status.currentPhase;
					if (trigger.name == "lose") {
						cards = trigger.hs.filter(function (i) {
							return (
								trigger.gaintag_map[i.cardid] &&
								trigger.gaintag_map[i.cardid].includes("qmsgswkjsgj_re_dcliuzhuan_tag") &&
								get.position(i, true) == "d"
							);
						});
					} else if (trigger.name == "cardsDiscard") {
						const evtx = trigger.getParent();
						const evtx2 = evtx.relatedEvent || evtx.getParent();
						let bool = false;
						const history = current.getHistory("lose", function (evtx3) {
							const evtx4 = evtx3.relatedEvent || evtx3.getParent();
							if (evtx2 != evtx4) {
								return false;
							}
							for (const i in evtx3.gaintag_map) {
								if (evtx3.gaintag_map[i].includes("qmsgswkjsgj_re_dcliuzhuan_tag")) {
									return true;
								}
							}
						});
						cards = trigger.cards.filter(function (i) {
							for (const evt of history) {
								if (
									evt.gaintag_map[i.cardid] &&
									evt.gaintag_map[i.cardid].includes("qmsgswkjsgj_re_dcliuzhuan_tag") &&
									get.position(i, true) == "d"
								) {
									return true;
								}
							}
							return false;
						});
					} else {
						cards = [];
						current.getHistory("lose", function (evt) {
							if (evt.getParent() != trigger || evt.position != ui.discardPile) {
								return false;
							}
							for (const card of evt.hs) {
								if (get.position(card, true) != "d") {
									continue;
								}
								const i = card.cardid;
								if (evt.gaintag_map[i] && evt.gaintag_map[i].includes("qmsgswkjsgj_re_dcliuzhuan_tag")) {
									cards.push(card);
								}
							}
						});
					}
					if (cards && cards.length > 0) {
						await player.gain(cards, "gain2");
					}
				},
			},
			mark: {
				trigger: { global: "gainBegin" },
				forced: true,
				popup: false,
				silent: true,
				lastDo: true,
				filter(event, player) {
					if (player == event.player || event.player != _status.currentPhase) {
						return false;
					}
					// var evt = event.getParent("phaseDraw");
					// if (evt && evt.name == "phaseDraw") {
					// 	return false;
					// }
					return true;
				},
				async content(event, trigger, player) {
					trigger.gaintag.add("qmsgswkjsgj_re_dcliuzhuan_tag");
					trigger.player.addTempSkill("qmsgswkjsgj_re_dcliuzhuan_tag");
				},
			},
			tag: {
				charlotte: true,
				onremove: (player, skill) => player.removeGaintag(skill),
			},
		},
	},
	//诸葛瑾
	qmsgswkjsgj_re_hongyuan: {
		trigger: { player: "phaseDrawBegin2" },
		direct: true,
		audio: 'hongyuan',
		filter(event, player) {
			return !event.numFixed && event.num > 0;
		},
		content() {
			"step 0";
			var check;
			if (player.countCards("h") == 0) {
				check = false;
			} else {
				check =
					game.countPlayer(function (current) {
						return player != current && get.attitude(player, current) > 1;
					}) >= 2;
			}
			if (get.is.versus()) {
				event.versus = true;
				player.chooseBool(get.prompt2("qmsgswkjsgj_re_hongyuan")).ai = function () {
					return (
						game.countPlayer(function (current) {
							return player.side == current.side;
						}) > 2
					);
				};
			} else {
				player
					.chooseTarget(
						get.prompt2("qmsgswkjsgj_re_hongyuan"),
						[1, 2],
						function (card, player, target) {
							return player != target;
						},
						function (target) {
							if (!_status.event.check) {
								return 0;
							}
							return get.attitude(_status.event.player, target);
						}
					)
					.set("check", check);
			}
			"step 1";
			if (result.bool) {
				var targets;
				if (event.versus) {
					targets = game.filterPlayer(function (current) {
						return current != player && current.side == player.side;
					});
				} else {
					targets = result.targets;
				}
				player.logSkill("qmsgswkjsgj_re_hongyuan", targets);
				game.asyncDraw(targets,2);
				trigger.num--;
			}
		},
	},
	qmsgswkjsgj_re_huanshi: {
		audio: 'huanshi',
		trigger: { global: "judge" },
		filter(event, player) {
			return player.countCards("he") > 0;
		},
		logTarget: "player",
		check(event, player) {
			if (get.attitude(player, event.player) <= 0) {
				return false;
			}
			var cards = player.getCards("he");
			var judge = event.judge(event.player.judging[0]);
			for (var i = 0; i < cards.length; i++) {
				var judge2 = event.judge(cards[i]);
				if (judge2 > judge) {
					return true;
				}
				if (_status.currentPhase != player && judge2 == judge && get.color(cards[i]) == "red" && get.useful(cards[i]) < 5) {
					return true;
				}
			}
			return false;
		},
		content() {
			"step 0";
			var target = trigger.player;
			var judge = trigger.judge(target.judging[0]);
			var attitude = get.attitude(target, player);
			target.viewHandcards(player);
			'step 1'
			var target = trigger.player;
			var judge = trigger.judge(target.judging[0]);
			var attitude = get.attitude(target, player);
			player
				.chooseCard(`${get.translation(trigger.player)}的${trigger.judgestr || ""}判定为${get.translation(trigger.player.judging[0])}，${get.prompt(event.skill)}`, "hes", card => {
					const player = get.player();
					const mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player);
					if (mod2 != "unchanged") {
						return mod2;
					}
					const mod = game.checkMod(card, player, "unchanged", "cardRespondable", player);
					if (mod != "unchanged") {
						return mod;
					}
					return true;
				},true)
				.set("ai", card => {
					const trigger = get.event().getTrigger();
					const { player, judging } = get.event();
					const result = trigger.judge(card) - trigger.judge(judging);
					const attitude = get.attitude(player, trigger.player);
					let val = get.value(card);
					if (get.subtype(card) == "equip2") {
						val /= 2;
					} else {
						val /= 4;
					}
					if (attitude == 0 || result == 0) {
						return 0;
					}
					if (attitude > 0) {
						return result - val;
					}
					return -result - val;
				})
				.set("judging", trigger.player.judging[0])
				.setHiddenSkill(event.skill)
			"step 2";
			if (result.bool) {
				event.card = result.cards;
				player.respond(event.card, "highlight", "noOrdering").nopopup = true;
			} else {
				event.finish();
			}
			"step 3";
			if (result.bool) {
				if (trigger.player.judging[0].clone) {
					trigger.player.judging[0].clone.classList.remove("thrownhighlight");
					game.broadcast(function (card) {
						if (card.clone) {
							card.clone.classList.remove("thrownhighlight");
						}
					}, trigger.player.judging[0]);
					game.addVideo("deletenode", player, get.cardsInfo([trigger.player.judging[0].clone]));
				}
				game.cardsDiscard(trigger.player.judging[0]);
				trigger.player.judging[0] = event.card;
				trigger.orderingCards.add(event.card);
				game.log(trigger.player, "的判定牌改为", event.card);
				game.delay(2);
			}
		},
		ai: {
			rejudge: true,
			tag: {
				rejudge: 1,
			},
		},
	},
	qmsgswkjsgj_re_mingzhe: {
		audio: 'mingzhe',
		audioname2: { wangyuanji: "qc_mingzhe" },
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		// filter(event, player) {
		// 	if (player.isPhaseUsing()) {
		// 		return false;
		// 	}
		// 	var evt = event.getl(player);
		// 	for (var i of evt.cards2) {
		// 		if (get.color(i, player) == "red") {
		// 			return true;
		// 		}
		// 	}
		// 	return false;
		// },
		frequent: true,
		getIndex(event, player) {
			if (event.name.indexOf("lose") != 0) {
				return 1;
			}
			return event.getl?.(player)?.cards2?.filter(card => get.color(card, player) == "red").length;
		},
		filter(event, player) {
			if (player == _status.currentPhase) {
				return false;
			}
			var evt = event.getl(player);
			for (var i of evt.cards2) {
				if (get.color(i, player) == "red") {
					return true;
				}
			}
			return false;
		},
		content() {
			player.draw(2);
		},
		ai: { threaten: 0.7 },
	},
	//袁胤
	qmsgswkjsgj_re_dcmoshou: {
		audio: 'dcmoshou',
		trigger: { target: "useCardToTargeted" },
		filter(event, player) {
			return get.color(event.card) == "black" && player.maxHp > 0;
		},
		frequent: true,
		prompt2(event, player) {
			const num = player.maxHp;
			let info = "摸" + get.cnNumber(num) + "张牌";
			return info;
		},
		async content(event, trigger, player) {
			let num = player.maxHp;
			if (num > 0) {
				await player.draw(num);
			}
		},
		ai: {
			effect: {
				target_use(card, player, target) {
					if (typeof card === "object" && get.color(card) === "black") {
						const num = target.maxHp;
						return [1, 0.6 * num];
					}
				},
			},
		},
		onremove: true,
		mark: true,
		intro: {
			markcount: (storage, player) => player.maxHp,
			content: (storage, player) => `下次【墨守】摸牌数：${player.maxHp}`,
		},
	},
	qmsgswkjsgj_re_dcyunjiu: {
		audio: 'dcyunjiu',
		trigger: { global: "dieAfter" },
		getCards(event, player) {
			const cards = [];
			const evt = player.getHistory("lose", evtx => evtx.getParent(2) == event)[0];
			return evt ? cards.addArray(evt.hs).addArray(evt.es).filterInD("d") : [];
		},
		filter(event, player) {
			// return get.info("qmsgswkjsgj_re_dcyunjiu");
			return true;
		},
		async content(event, trigger, player) {
			await player.gainMaxHp();
			await player.recover();
			const { player: target } = trigger,
				cards = get.info(event.name).getCards(trigger, target),
			cards2 = game.cardsGotoOrdering(cards);
			await player
				.YB_yiji(cards2, cards.length, function (card, player, target) {
					return true;
				})
				.forResult();
		},
	},

	//SP甄宓
	qmsgswkjsgj_re_dcjijie: {
		audio: 'dcjijie',
		trigger: {
			global: ["gainAfter", "loseAsyncAfter", "recoverAfter"],
		},
		getIndex(event, player) {
			if (event.name !== "loseAsync") {
				return [[event.player]];
			}
			return [
				game
					.filterPlayer(current => {
						return current !== player && _status.currentPhase !== current && event.getg(current).length > 0;
					})
					.sortBySeat(),
			];
		},
		filter(event, player, triggername, targets) {
			if (player.getStorage("qmsgswkjsgj_re_dcjijie_used").filter((x)=>x==event.name == "recover" ? "recover" : "draw").length>player.maxHp) {
				return false;
			}
			if (event.name === "recover") {
				return targets[0] !== player && _status.currentPhase !== targets[0] && player.isDamaged();
			}
			return targets.some(current => {
				return current !== player && _status.currentPhase !== current && event.getg(current).length > 0;
			});
		},
		forced: true,
		logTarget(event, player, triggername, targets) {
			return targets;
		},
		async content(event, trigger, player) {
			player.addTempSkill("qmsgswkjsgj_re_dcjijie_used");
			if (trigger.name === "recover") {
				player.storage.qmsgswkjsgj_re_dcjijie_used.add('recover')
				await player.recover(trigger.num);
			} else {
				const count = game.countPlayer(current => {
					if (current === player || _status.currentPhase === current) {
						return 0;
					}
					return trigger.getg(current).length;
				});
				player.storage.qmsgswkjsgj_re_dcjijie_used.add('draw')
				await player.draw(count);
			}
		},
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
			},
		},
	},
	qmsgswkjsgj_re_dchuiji: {
		audio: 'dchuiji',
		enable: "phaseUse",
		usable: 1,
		filterTarget: true,
		chooseButton: {
			dialog(event, player) {
				const name = get.translation(event.result.targets[0]);
				const dialog = ui.create.dialog(
					`惠济：请选择要令${name}执行的选项`,
					[
						[
							["draw", "令其摸两张牌"],
							["equip", "令其从牌堆中使用一张你指定牌名的装备牌"],
						],
						"textbutton",
					],
					"hidden"
				);
				return dialog;
			},
			filter(button, player) {
				const target = get.event().getParent().result.targets[0];
				if (button.link === "equip" && target.isMin()) {
					return false;
				}
				return true;
			},
			check(button) {
				const player = get.player(),
					target = get.event().getParent().result.targets[0];
				const link = button.link;
				const att = Math.sign(get.attitude(player, target));
				const drawWugu = target.countCards("h") + 2 >= game.countPlayer();
				if (link === "draw") {
					return (drawWugu ? -1 : 2) * att;
				}
				return 1;
			},
			backup(links) {
				return {
					audio: "qmsgswkjsgj_re_dchuiji",
					target: get.event().result.targets[0],
					link: links[0],
					filterTarget(card, player, target) {
						return target === lib.skill.dchuiji_backup.target;
					},
					selectTarget: -1,
					async content(event, trigger, player) {
						const link = lib.skill.dchuiji_backup.link;
						const { target } = event;
						if (link === "draw") {
							await target.draw(2);
						} else {
							let cards = [];
							for (let i = 0; i < ui.cardPile.childNodes.length; i++) {
								let card = ui.cardPile.childNodes[i];
								if (get.type(card) !== "equip") {
									return false;
								}
								if (target.canUse(card, target)) {
									cards.push(card)
								}
							}
							if (cards) {
								// await target.chooseUseTarget(card, true).set("nopopup", true);

								var dialog=['请选择一个装备令其使用']
								if(cards){
									dialog.push('<div class="text center">牌堆</div>');
									dialog.push(cards);
								}
								var result = await player.chooseButton(dialog,1,true).set('ai',function(button){
									var att = get.attitude(player,target)
									if(att>0)return get.effect(target,button,target,target);
									else return -get.effect(target,button,target,target);
								}).forResult()
								if(result.links){
									await target.use(result.links[0])
								}
							} else {
								game.log("但是牌堆里没有", target, "的装备！");
								await game.delayx();
							}
						}
						if (target.countCards("h") >= game.countPlayer()) {
							target.addTempSkill("dchuiji_effect");
							target.markAuto("dchuiji_effect", [event]);
							const card = new lib.element.VCard({ name: "wugu", storage: { fixedShownCards: [] }, isCard: true });
							if (target.hasUseTarget(card)) {
								var relu = await player.chooseBool('是否视为使用一张【五谷丰登】，从其手牌中选牌').set('ai',function(){
									var att = get.attitude(player,target)
									return -att
								}).forResult();
								if(relu.bool)await target.chooseUseTarget(card, true, false);
							}
						}
					},
				};
			},
			prompt(links) {
				return "点击“确定”以执行效果";
			},
		},
		subSkill: {
			backup: {},
			effect: {
				charlotte: true,
				onremove: true,
				trigger: { player: "wuguContentBeforeBefore", global: "wuguRemained" },
				filter(event, player) {
					if (!player.getStorage("dchuiji_effect").includes(event.getParent(3))) {
						return false;
					}
					return event.name == "wuguContentBefore" || event.remained.someInD();
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					if (trigger.name == "wuguContentBefore") {
						trigger.card.storage ??= {};
						trigger.card.storage.fixedShownCards = player.getCards("h");
					} else {
						const remained = trigger.remained.filterInD();
						if (remained.length) {
							player.gain(remained, "gain2");
						}
					}
				},
			},
		},
		ai: {
			order(item, player) {
				if (!game.hasPlayer(current => current !== player && get.attitude(player, current) > 0) && game.hasPlayer(current => get.attitude(player, current) <= 0)) {
					return 10;
				}
				if (
					game.hasPlayer(current => {
						const del = player.countCards("h") - current.countCards("h"),
							toFind = [2, 4].find(num => Math.abs(del) === num);
						if (toFind === 4 && del < 0 && get.attitude(player, current) <= 0) {
							return true;
						}
						return false;
					})
				) {
					return 10;
				}
				return 1;
			},
			result: {
				target(player, target) {
					const att = get.attitude(player, target);
					const wugu = target.countCards("h") + 2 > game.countPlayer();
					if (wugu) {
						return Math.min(0, att) * Math.min(3, target.countCards("h"));
					}
					return Math.max(0, att) * Math.min(3, target.countCards("h"));
				},
			},
		},
	},
	//手杀神姜维
	qmsgswkjsgj_mbtiantao: {
		audio: 'mbtiantao',
		trigger: {
			player: "phaseJieshuBegin",
		},
		filter(event, player) {
			//return ["h", "e", "j"].some(pos => player.countDiscardableCards(player, pos));
			return true;
		},
		forced: true,
		async content(event, trigger, player) {
			const position = ["h", "e", "j"]; //.filter(pos => player.countDiscardableCards(player, pos)),
			const map = { h: "手牌区", e: "装备区", j: "判定区" };
			let list = position.map(i => map[i]);
			const result = await player
				.chooseControl({ controls: list })
				.set("prompt", `###${get.translation(event.name)}：选择一个区域并弃置其中所有牌###然后选择弃置任意名其他角色对应区域内的所有牌。`)
				.set("ai", (event, player) => {
					const targets = game.filterPlayer(current => current !== player);
					const { position, controls } = get.event();
					const list = {};
					for (const pos of position) {
						let info = targets
							.filter(target => target.countDiscardableCards(player, pos))
							.reduce((sum, target) => {
								const eff = get.effect(target, { name: "guohe_copy", position: pos }, player, player);
								return eff > 0 ? sum + eff : sum;
							}, 0);
						list[pos] = info - (pos === "j" ? -1 : 1) * get.value(player.getDiscardableCards(player, pos));
					}
					let choice = Object.entries(list).sort((a, b) => b[1] - a[1])[0];
					return { h: "手牌区", e: "装备区", j: "判定区" }[choice[0]];
				})
				.set("position", position)
				.forResult();
			if (!result?.control || result.control === "cancel2") {
				return;
			}
			const pos = { 手牌区: "h", 装备区: "e", 判定区: "j" }[result.control];
			let doneList = new Map();
			const result2 = await player.modedDiscard(player.getCards(pos)).forResult();
			if (result2?.cards?.length) {
				doneList.set(player, result2.cards);
			}
			while (true) {
				if (!game.hasPlayer(current => current !== player && !doneList.has(current) && current.countDiscardableCards(player, pos))) {
					break;
				}
				let result = await player
					.chooseTarget(`天涛：选择一名其他角色，弃置其${{ h: "手牌区", e: "装备区", j: "判定区" }[pos]}内的所有张牌`)
					.set("filterTarget", (_, player, target) => target !== player && !get.event().doneList.has(target) && target.countDiscardableCards(player, get.event().pos))
					.set("ai", target => {
						const { pos, player } = get.event();
						return get.effect(target, { name: "guohe_copy", position: pos }, player, player);
					})
					.set("doneList", doneList)
					.set("pos", pos)
					.forResult();
				if (!result?.bool || !result.targets?.length) {
					break;
				}
				const target = result.targets[0];
				player.line(target);
				result = await player.discardPlayerCard(target, Infinity, pos, true).forResult();
				if (result?.bool && result.links?.length) {
					doneList.set(target, result.links);
				}
			}
			if ([...doneList.keys()].length) {
				const targets = [...doneList.entries()].filter(([_, cards]) => !cards.some(card => get.name(card) === "sha")).map(([target]) => target);
				await game.doAsyncInOrder(targets, async target => target.loseHp());
			}
		},
	},
	qmsgswkjsgj_mbxinghun: {
		audio: 'mbxinghun',
		enable: "phaseUse",
		usable: 1,
		manualConfirm: true,
		async content(event, trigger, player) {
			const num = 9;
			const cards = get.cards(num, true);
			let result = await player
				.chooseToMove_new("星魂：选择任意张手牌进行交换", true)
				.set("list", [
					["牌堆顶的牌", cards],
					["你的手牌", player.getCards("h")],
				])
				.set("filterMove", (from, to, moved) => typeof to !== "number")
				.set("processAI", list => {
					const player = get.player();
					let cards = list
						.map(i => i[1])
						.flat()
						.sort((a, b) => get.value(b, player) - get.value(a, player));
					let sha = cards.filter(card => get.name(card, player) === "sha");
					cards.removeArray(sha);
					const hs = [];
					let num = Math.ceil(sha.length / 2);
					if (num <= player.countCards("h")) {
						hs.addArray(sha.slice(0, num));
						sha.removeArray(hs);
					}
					if (hs.length < player.countCards("h")) {
						hs.addArray(cards.slice(0, player.countCards("h") - hs.length));
						cards.removeArray(hs);
					}
					const top = sha.concat(cards);
					return [top, hs];
				})
				.forResult();
			if (result?.bool) {
				await game
					.loseAsync({
						player,
						cards: result.moved.flat(),
						moved: result.moved,
					})
					.setContent(async (event, trigger, player) => {
						const { cards, moved } = event;
						const hs = player.getCards("h");
						const gain = moved[1].filter(card => !hs.includes(card));
						const puts = moved[0].filter(card => hs.includes(card));
						const originPile = cards.slice().removeArray(hs);
						//将手牌中有变动的和牌堆顶的牌送入处理区
						if (puts.length) {
							player.$throw(puts.length, 1000);
							await player.lose(puts, ui.ordering).set("getlx", false);
						}
						await game.cardsGotoOrdering(originPile);
						//手牌部分
						if (gain.length) {
							await player.gain(gain, "draw").set("getlx", false);
							//调整手牌顺序
							/*player.getCards("h").forEach(i => i.goto(ui.special));
							player.directgain(moved[1].slice().reverse(), false);*/
						}
						//牌堆部分
						await game.cardsGotoPile(moved[0].slice().reverse(), ["insert_card", true]);
						//知情牌
						game.addCardKnower(moved[0], player);
					});
			}
			if (!game.hasPlayer(current => current !== player)) {
				return;
			}
			result = await player
				.chooseTarget(`星魂：选择一名其他角色，令其展示牌堆顶和你的手牌共计${get.cnNumber(num)}张牌`, true)
				.set("filterTarget", (_, player, target) => target !== player)
				.set("ai", target => {
					const { player } = get.event();
					return get.effect(target, { name: "sha" }, player, player);
				})
				.forResult();
			if (result?.bool && result.targets?.length) {
				const [target] = result.targets;
				player.line(target, "thunder");
				let showCards = [];
				const top = get.cards(num, true);
				if (player.countCards("h")) {
					const dialog = [];
					dialog.push(`星魂：请选择${get.cnNumber(num)}张牌`);
					dialog.add(`<div class="text center">${get.translation(player)}的手牌</div>`);
					if (target.hasSkillTag("viewHandcard", null, player, true)) {
						dialog.push(player.getCards("h"));
					} else {
						dialog.push([player.getCards("h"), "blank"]);
					}
					dialog.addArray([`<div class="text center">牌堆顶</div>`, [top, "blank"]]);
					const result = await target
						.chooseButton(num, true)
						.set("createDialog", dialog)
						.set("top", top)
						.set("target", player)
						.set("ai", () => Math.random())
						.forResult();
					showCards = result?.links || [];
				} else {
					showCards = top;
				}
				await target
					.showCards(showCards, `${get.translation(target)}因“${get.translation(event.name)}”展示`)
					.set("customButton", button => {
						if (get.event().top.includes(button.link)) {
							button.node.gaintag.innerHTML = "牌堆顶";
						}
					})
					.set("top", top)
					.set("delay_time", 5);
				if (showCards.some(card => get.name(card) === "sha")) {
					let sha = showCards.filter(card => get.name(card) === "sha");
					while (sha.length) {
						let card = sha.shift();
						if (player.canUse(card, target, false, false)) {
							if (top.includes(card)) {
								top.remove(card);
							}
							await player.useCard(card, target, false);
						}
					}
				}
			}
		},
		ai: {
			order(item, player) {
				if (player.countCards("hs", card => get.tag(card, "draw"))) {
					return 1;
				}
				return 20;
			},
			result: {
				player(player) {
					if (!game.hasPlayer(current => current !== player && get.effect(current, { name: "sha" }, player, player) > 0)) {
						return 0;
					}
					return 1;
				},
			},
		},
	},
	qmsgswkjsgj_mbshenpei: {
		audio: 'mbshenpei',
		limited: true,
		skillAnimation: true,
		animationColor: "metal",
		derivation: ["qmsgswkjsgj_mbhuitian"],
		trigger: {
			player: "dying",
		},
		check(event, player) {
			return !player.canSave(player) || player.countCards("hs", card => get.tag(card, "save")) <= -player.hp;
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			const num = game.getAllGlobalHistory("everything", evt => {
				if (evt.name !== "dying" || evt.player !== player) {
					return false;
				}
				return true;
			}).length;
			if (num > 0) {
				await player.recover(num);
				const result = await player
					.chooseTarget(`神霈：选择一名角色对其造成${num}点雷电伤害`, true)
					.set("ai", target => {
						const { player } = get.event();
						return get.damageEffect(target, player, player, "thunder");
					})
					.forResult();
				if (result?.bool && result.targets?.length) {
					player.line(result.targets, "thunder");
					await result.targets[0].damage(num, "thunder");
				}
			}
			await player.addSkills("qmsgswkjsgj_mbhuitian");
		},
	},
	qmsgswkjsgj_mbhuitian: {
		audio: 'mbhuitian',
		trigger: {
			global: ["roundStart", "turnStart"],
		},
		filter(event, player, name) {
			if (name === "roundStart") {
				return player.getHistory("useSkill", evt => evt.skill === "qmsgswkjsgj_mbhuitian").length > 9;
			}
			return true;
		},
		async cost(event, trigger, player) {
			if (event.triggername === "roundStart") {
				event.result = {
					bool: true,
					die: true,
				};
			} else {
				event.result = await player
					.chooseBool(get.prompt2(event.skill))
					.set(
						"choice",
						(() => {
							if (player.hasAllHistory("useSkill", evt => evt.skill === "qmsgswkjsgj_mbhuitian")) {
								return true;
							}
							let targets = game.filterPlayer(current => current !== player, undefined, true);
							if (!targets.length) {
								return false;
							}
							if (!trigger.player.getHistory().isRound) {
								return false;
							}
							return targets.every(current => {
								let att = get.attitude(player, current);
								return att < -1 || att > 1;
							});
						})()
					)
					.forResult();
			}
		},
		logAudio: (a, b, c, d, costResult) => (costResult.die ? ["mbhuitian3.mp3", "mbhuitian4.mp3"] : 2),
		async content(event, tigger, player) {
			if (event.triggername === "roundStart") {
				await player.die();
			} else {
				await player.draw(2);
				player.insertPhase(event.name);
			}
		},
	},
	qmsgswkjsgj_zhiji: {
		skillAnimation: true,
		animationColor: "fire",
		audio: 'zhiji',
		juexingji: true,
		//priority:-10,
		derivation: ["qmsgswkjsgj_jwguanxing",'kongcheng'],
		trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
		forced: true,
		filter(event, player) {
			return player.countCards("h") == 0;
		},
		content() {
			"step 0";
			player.awakenSkill(event.name);
			player.chooseDrawRecover(2, true);
			"step 1";
			player.loseMaxHp();
			player.addSkills(["qmsgswkjsgj_jwguanxing", "kongcheng"]);
		},
	},
	qmsgswkjsgj_jwguanxing: {
		audio: 'guanxing',
		audioname: ["jiangwei", "re_jiangwei", "re_zhugeliang", "ol_jiangwei"],
		trigger: { player: "phaseZhunbeiBegin" },
		frequent: true,
		preHidden: true,
		async content(event, trigger, player) {
			const num = 5;
			const result = await player.chooseToGuanxing(num).set("prompt", "观星：点击或拖动将牌移动到牌堆顶或牌堆底").forResult();
			if (!result.bool || !result.moved[0].length) {
				player.addTempSkill("guanxing_fail");
			}
		},
		ai: {
			threaten: 1.2,
			guanxing: true,
		},
	},
	//刘禅
	qmsgswkjsgj_re_xiangle:{
		audio:'xiangle',
		trigger: { target: "useCardToTargeted" },
		forced: true,
		preHidden: true,
		filter(event, player) {
			return event.card.name == "sha";
		},
		async content(event, trigger, player) {
			trigger.getParent().excluded.add(player);
		},
		mod: {
			cardEnabled2: function (card, player) {
				if (get.name(card) == 'sha') return false;
			},
			targetEnabled(card) {
				if (get.name(card) == 'sha') return false;
			},
		},
		ai: {
			effect: {
				target(card, player, target, current) {
					if (card.name == "sha") {
						return;
					}
				}
			}
		}
	},
	qmsgswkjsgj_re_fangquan: {
		audio: 'olfangquan',
		trigger: { player: "phaseUseBefore" },
		filter(event, player) {
			return player.countCards("h") > 0 && !player.hasSkill("qmsgswkjsgj_re_fangquan3");
		},
		direct: true,
		async content(event, trigger, player) {
			// step 0
			event.count = player.countMark(event.name);
			player.removeMark(event.name, event.count, false);
			while (event.count > 0) {
				// step 1
				event.count--;
				const result = await player
					.chooseToDiscard("是否弃置一张手牌并令一名其他角色进行一个额外回合？")
					.set("logSkill", "qmsgswkjsgj_re_fangquan")
					.set("ai", card => {
						return 20 - get.value(card);
					})
					.forResult();
				// step 2
				if (result.bool) {
					const result2 = await player
						.chooseTarget(true, "请选择进行额外回合的目标角色", lib.filter.notMe)
						.set("ai", target => {
							if (target.hasJudge("lebu")) {
								return -1;
							}
							if (get.attitude(player, target) > 4) {
								return get.threaten(target) / Math.sqrt(target.hp + 1) / Math.sqrt(target.countCards("h") + 1);
							}
							return -1;
						})
						.forResult();
					// step 3
					if (result2.bool) {
						var target = result2.targets[0];
						player.line(target, "fire");
						target.markSkillCharacter("qmsgswkjsgj_re_fangquan", player, "放权", "进行一个额外回合");
						target.insertPhase();
						target.addSkill("qmsgswkjsgj_re_fangquan3");
					}
				} else {
					break;
				}
			}
		},
	},
	qmsgswkjsgj_re_fangquan3: {
		trigger: { player: ["phaseAfter", "phaseCancelled"] },
		forced: true,
		popup: false,
		audio: false,
		sourceSkill: "qmsgswkjsgj_re_fangquan",
		async content(event, trigger, player) {
			player.unmarkSkill("qmsgswkjsgj_re_fangquan");
			player.removeSkill("qmsgswkjsgj_re_fangquan3");
		},
	},
	//曹金玉
	qmsgswkjsgj_re_yuqi: {
		audio: 'yuqi',
		trigger: { global: "damageEnd" },
		getInfo(player) {
			if (!player.storage.qmsgswkjsgj_re_yuqi) {
				player.storage.qmsgswkjsgj_re_yuqi = [2,0, 3, 0, 1];
			}
			return player.storage.qmsgswkjsgj_re_yuqi;
		},
		maxNum:function(player){
			return player.maxHp;
		},
		usable: function(skill,player){
			var list = lib.skill.qmsgswkjsgj_re_yuqi.getInfo(player);
			return list[0]
		},
		filter(event, player) {
			var list = lib.skill.qmsgswkjsgj_re_yuqi.getInfo(player);
			return event.player.isIn() && get.distance(player, event.player) <= list[1];
		},
		getIndex(event, player) {
			return event.num;
		},
		logTarget: "player",
		async content(event, trigger, player) {
			const list = lib.skill.qmsgswkjsgj_re_yuqi.getInfo(player);
			player.YB_yuqi(['隅泣', list[2], list[3], list[4]], trigger.player,false);
			// const {
			// 	targets: [target],
			// } = event;
			// const cards = get.cards(list[2], true);
			// await game.cardsGotoOrdering(cards);
			// const next = player.chooseToMove_new(true, "隅泣");
			// next.set("list", [
			// 	["牌堆顶的牌", cards],
			// 	[["交给" + get.translation(target) + '<div class="text center">至少零张' + (list[3] > 1 ? "<br>至多" + get.cnNumber(list[3]) + "张" : "") + "</div>"], ['交给自己<div class="text center">至多' + get.cnNumber(list[4]) + "张</div>"]],
			// ]);
			// next.set("filterMove", function (from, to, moved) {
			// 	var info = lib.skill.qmsgswkjsgj_re_yuqi.getInfo(_status.event.player);
			// 	if (to == 1) {
			// 		return moved[1].length < info[3];
			// 	}
			// 	if (to == 2) {
			// 		return moved[2].length < info[4];
			// 	}
			// 	return true;
			// });
			// next.set("processAI", function (list) {
			// 	var cards = list[0][1].slice(0).sort(function (a, b) {
			// 			return get.value(b, "raw") - get.value(a, "raw");
			// 		}),
			// 		player = _status.event.player,
			// 		target = _status.event.getTrigger().player;
			// 	var info = lib.skill.qmsgswkjsgj_re_yuqi.getInfo(_status.event.player);
			// 	var cards1 = cards.splice(0, Math.min(info[3], cards.length - 1));
			// 	var card2;
			// 	if (get.attitude(player, target) > 0) {
			// 		card2 = cards.shift();
			// 	} else {
			// 		card2 = cards.pop();
			// 	}
			// 	return [cards, [card2], cards1];
			// });
			// next.set("filterOk", function (moved) {
			// 	// return moved[1].length > 0;
			// 	return true;
			// });
			// const result = await next.forResult();
			// if (result.bool) {
			// 	const moved = result.moved;
			// 	cards.removeArray(moved[1]);
			// 	cards.removeArray(moved[2]);
			// 	if (cards.length) {
			// 		await game.cardsGotoPile(cards.slice().reverse(), "insert");
			// 	}
			// 	const list = [[target, moved[1]]];
			// 	if (moved[2].length) {
			// 		list.push([player, moved[2]]);
			// 	}
			// 	await game
			// 		.loseAsync({
			// 			gain_list: list,
			// 			giver: player,
			// 			animate: "draw",
			// 		})
			// 		.setContent("gaincardMultiple");
			// }
		},
		mark: true,
		intro: {
			content(storage, player) {
				var info = lib.skill.qmsgswkjsgj_re_yuqi.getInfo(player);
				return '<div class="text center"><span class=YB_snowtext>雪色：'+info[0]+'</span>　<span class=thundertext>蓝色：' + info[1] + "</span>　<span class=firetext>红色：" + info[2] + "</span><br><span class=greentext>绿色：" + info[3] + "</span>　<span class=yellowtext>黄色：" + info[4] + "</span></div>";
			},
		},
		ai: {
			threaten: 8.8,
		},
		init(player, skill) {
			const list = lib.skill.qmsgswkjsgj_re_yuqi.getInfo(player);
			player.addTip(skill, get.translation(skill) + " " + list.slice().join(" "));
		},
		onremove: (player, skill) => player.removeTip(skill),
	},
	qmsgswkjsgj_re_shanshen: {
		audio: 'shanshen',
		trigger: { global: "dying" },
		async cost(event, trigger, player) {
			const bool = trigger.player!=player&&trigger.source!=player;
			const list = get.info("qmsgswkjsgj_re_yuqi").getInfo(player);
			const result = await player
				.chooseControl("<span class=thundertext>雪色(" + list[0] + ")</span>", "<span class=thundertext>蓝色(" + list[1] + ")</span>", "<span class=firetext>红色(" + list[2] + ")</span>", "<span class=greentext>绿色(" + list[3] + ")</span>", "<span class=yellowtext>黄色(" + list[4] + ")</span>", "cancel2")
				.set("prompt", get.prompt(event.skill))
				.set("prompt2", "令〖隅泣〗中的一个数字+2" + (bool ? "并回复1点体力" : ""))
				.set("ai", function () {
					const player = _status.event.player,
						info = lib.skill.qmsgswkjsgj_re_yuqi.getInfo(player);
					const maxNum = lib.skill.qmsgswkjsgj_re_yuqi.maxNum(player);
					if (
						info[1] < info[3] &&
						game.countPlayer(function (current) {
							return get.distance(player, current) <= info[0];
						}) < Math.min(3, game.countPlayer())&&info[1]<maxNum
					) {
						return 1;
					}
					if (info[4] < info[2] - 1&&info[4]<maxNum) {
						return 4;
					}
					if (info[2] < 5&&info[2]<maxNum) {
						return 2;
					}
					if (
						info[1] < 5 &&
						game.hasPlayer(function (current) {
							return current != player && get.distance(player, current) > info[1];
						})&&info[1]<maxNum
					) {
						return 1;
					}
					if(info[0]<maxNum){
						return 0
					}
					if(info[3]<maxNum){
						return 3
					}
					return 2;
				})
				.forResult();
			if (result.control != "cancel2") {
				event.result = {
					bool: true,
					cost_data: [result.control, result.index],
				};
			}
		},
		logTarget: "player",
		async content(event, trigger, player) {
			const {
				targets,
				cost_data: [control, index],
			} = event;
			const name = "qmsgswkjsgj_re_yuqi";
			const list = get.info(name).getInfo(player);
			const maxNum=get.info(name).maxNum(player);
			list[index] = Math.min(maxNum, list[index] + 2);
			game.log(player, "将", control, "数字改为", "#y" + list[index]);
			player.markSkill(name);
			get.info(name).init(player, name);
			if (trigger.player!=player&&trigger.source!=player) {
				await player.recover();
			}
		},
		ai: {
			combo: "qmsgswkjsgj_re_yuqi",
		},
	},
	qmsgswkjsgj_re_xianjing: {
		audio: 'xianjing',
		trigger: { player: ["phaseZhunbeiBegin",'phaseJieshuBegin'] },
		async cost(event, trigger, player) {
			const list = get.info("qmsgswkjsgj_re_yuqi").getInfo(player);
			const result = await player
				.chooseControl("<span class=thundertext>雪色(" + list[0] + ")</span>", "<span class=thundertext>蓝色(" + list[1] + ")</span>", "<span class=firetext>红色(" + list[2] + ")</span>", "<span class=greentext>绿色(" + list[3] + ")</span>", "<span class=yellowtext>黄色(" + list[4] + ")</span>", "cancel2")
				.set("prompt", get.prompt(event.skill))
				.set("prompt2", "令〖隅泣〗中的一个数字+1")
				.set("ai", function () {
					const player = _status.event.player,
						info = lib.skill.qmsgswkjsgj_re_yuqi.getInfo(player);
					const maxNum = lib.skill.qmsgswkjsgj_re_yuqi.maxNum(player);
					if (
						info[1] < info[3] &&
						game.countPlayer(function (current) {
							return get.distance(player, current) <= info[0];
						}) < Math.min(3, game.countPlayer())&&info[1]<maxNum
					) {
						return 1;
					}
					if (info[4] < info[2] - 1&&info[4]<maxNum) {
						return 4;
					}
					if (info[2] < 5&&info[2]<maxNum) {
						return 2;
					}
					if (
						info[1] < 5 &&
						game.hasPlayer(function (current) {
							return current != player && get.distance(player, current) > info[1];
						})&&info[1]<maxNum
					) {
						return 1;
					}
					if(info[0]<maxNum){
						return 0
					}
					if(info[3]<maxNum){
						return 3
					}
					return 2;
				})
				.forResult();
			if (result.control != "cancel2") {
				event.result = {
					bool: true,
					cost_data: [result.control, result.index],
				};
			}
		},
		async content(event, trigger, player) {
			const {
				cost_data: [control, index],
			} = event;
			const name = "qmsgswkjsgj_re_yuqi";
			const list = get.info(name).getInfo(player);
			const maxNum=get.info(name).maxNum(player);
			list[index] = Math.min(maxNum, list[index] + 1);
			game.log(player, "将", control, "数字改为", "#y" + list[index]);
			player.markSkill(name);
			get.info(name).init(player, name);
			if (player.isDamaged()||event.triggername=='phaseJieshuBegin') {
				return;
			}
			const result = await player
				.chooseControl("<span class=thundertext>雪色(" + list[0] + ")</span>", "<span class=thundertext>蓝色(" + list[1] + ")</span>", "<span class=firetext>红色(" + list[2] + ")</span>", "<span class=greentext>绿色(" + list[3] + ")</span>", "<span class=yellowtext>黄色(" + list[4] + ")</span>", "cancel2")
				.set("prompt", get.prompt(event.skill))
				.set("prompt2", "令〖隅泣〗中的一个数字+1")
				.set("ai", function () {
					const player = _status.event.player,
						info = lib.skill.qmsgswkjsgj_re_yuqi.getInfo(player);
					const maxNum = lib.skill.qmsgswkjsgj_re_yuqi.maxNum(player);
					if (
						info[1] < info[3] &&
						game.countPlayer(function (current) {
							return get.distance(player, current) <= info[0];
						}) < Math.min(3, game.countPlayer())&&info[1]<maxNum
					) {
						return 1;
					}
					if (info[4] < info[2] - 1&&info[4]<maxNum) {
						return 4;
					}
					if (info[2] < 5&&info[2]<maxNum) {
						return 2;
					}
					if (
						info[1] < 5 &&
						game.hasPlayer(function (current) {
							return current != player && get.distance(player, current) > info[1];
						})&&info[1]<maxNum
					) {
						return 1;
					}
					if(info[0]<maxNum){
						return 0
					}
					if(info[3]<maxNum){
						return 3
					}
					return 2;
				})
				.forResult();
			if (result.control != "cancel2") {
				const { control, index } = result;
				const maxNum=get.info(name).maxNum(player);
				list[index] = Math.min(maxNum, list[index] + 1);
				game.log(player, "将", control, "数字改为", "#y" + list[index]);
				player.markSkill(name);
				get.info(name).init(player, name);
			}
		},
		ai: {
			combo: "yuqi",
		},
	},
	//乐周瑜
	qmsgswkjsgj_re_dcguyin: {
		audio: 'dcguyin',
		trigger: {
			global: ["loseAfter", "loseAsyncAfter", "gameDrawBegin",'roundStart'],
			player: 'damageBegin4',
		},
		filter(event, player,name) {
			if (event.name == 'damage') {
				return player.countCards('h') == 0;
			}
			if (name == 'gameDrawBegin' || name == 'roundStart') {
				return true;
			}
			// loseAfter / loseAsyncAfter 走这里
			var evt = event.getl && event.getl(event.player);
			if (evt && evt.gaintag_map) {
				for (var i in evt.gaintag_map) {
					if (evt.gaintag_map[i].includes('eternal_qmsgswkjsgj_re_dcguyin_tag')) {
						if (event.cards.some((card) => {
							return (get.position(card, true) == 'o' || get.position(card, true) == 'd') && card.cardid == i;
						})) {
							return true;
						}
					}
				}
			}
			return false;
		},

		forced: true,
		async content(event, trigger, player) {
			if (trigger.name == 'damage') {
				trigger.num--;
			} else if (event.triggername == 'gameDrawBegin') {
				const me = player;
				const numx = trigger.num;
				trigger.num = function (p) {
					return p == me ? 0 : 1 + (typeof numx == "function" ? numx(p) : numx);
				};
			} else if (event.triggername == 'roundStart') {
				game.filterPlayer(function (current) {
					current.addGaintag(current.getCards('h'), 'eternal_qmsgswkjsgj_re_dcguyin_tag');
				});
			} else {
				await player.draw();
			}
		},

	},
	qmsgswkjsgj_re_dcpinglu: {
		audio: 'dcpinglu',
		enable: "phaseUse",
		filter(event, player) {
			if (player.hasCard(card => card.hasGaintag("qmsgswkjsgj_re_dcpinglu_mark"), "h")) {
				return false;
			}
			return game.hasPlayer(current => get.info("qmsgswkjsgj_re_dcpinglu").filterTarget(null, player, current));
		},
		filterTarget(card, player, target) {
			return player.inRange(target) && target.countGainableCards(player, "h");
		},
		selectTarget: -1,
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			const gains = [];
			for (const target of event.targets.sortBySeat()) {
				// const cards = target.getCards("h", card => lib.filter.canBeGained(card, target, player));
				// if (cards.length) {
				// 	gains.push(cards.randomGet());
				// }
				// var result = { bool: false };
				// result = await player.gainPlayerCard(target, 'hej').forResult();
				// // if (!result.bool) {
				// // 	await player.draw();
				// // }
				var result = await player
					.choosePlayerCard('获得'+get.translation(target)+'的一张牌', true, target, 'hej')
					.set("ai", lib.card.shunshou.ai.button)
					// .set('att', get.attitude(player, target))
					.forResult();
				// if (result.cards) {
				// 	await player.gain(result.cards, target);
				// 	game.log(player, '获得了', target, '的一张牌');
				// 	if ((trigger.source && trigger.source != target) || !trigger.source) {
				// 		player.chooseToDiscard('he');
				// 	}
				// }
				if(result.cards){
					gains.push(result.cards[0]);
				}
			}
			if (!gains.length) {
				return;
			}
			player.addTempSkill(event.name + "_mark", "phaseUseAfter");
			const next = player.gain(gains, "giveAuto");
			next.gaintag.add(event.name + "_mark");
			await next;
			// let targets = game.filterPlayer((current) => current != player).sortBySeat();
			// player.line(targets, 'green');
			// // await player.gainMultiple(targets, "hej");
			// for (let target of targets) {
			// 	var result = { bool: false };
			// 	result = await player.gainPlayerCard(target, 'hej').forResult();
			// 	if (!result.bool) {
			// 		await player.draw();
			// 	}
			// }
		},
		ai: {
			order: 10,
			result: {
				player: 1,
			},
		},
		subSkill: {
			mark: {
				mod: {
					aiOrder(player, card, num) {
						if (
							get.itemtype(card) == "card" &&
							card.hasGaintag("qmsgswkjsgj_re_dcpinglu_mark") &&
							game.hasPlayer(current => {
								return player.inRange(current) && current.countGainableCards(player, "h") && get.attitude(player, current) < 0;
							})
						) {
							return num + 0.1;
						}
					},
				},
				charlotte: true,
				onremove: (player, skill) => player.removeGaintag(skill),
			},
		},
	},
	//柏灵筠
	qmsgswkjsgj_re_dclinghui: {
		audio: 'dclinghui',
		trigger: { global: "phaseJieshuBegin" },
		filter(event, player) {
			if (_status.currentPhase === player) {
				return true;
			}
			return game.getGlobalHistory("everything", evt => evt.name == "damage").length;
		},
		frequent: true,
		async content(event, trigger, player) {
			let num = player.maxHp;
			let cards = get.cards(num);
			await game.cardsGotoOrdering(cards);
			const { bool, links } = await player
				.chooseButton(["灵慧：是否使用其中的一张牌并获得其中一张剩余牌？", cards])
				.set("filterButton", button => {
					return get.player().hasUseTarget(button.link);
				})
				.set("ai", button => {
					return get.event().player.getUseValue(button.link);
				})
				.forResult();
			if (bool) {
				const card = links[0];
				cards.remove(card);
				player.$gain2(card, false);
				await game.delayx();
				await player.chooseUseTarget(true, card, false);
				cards = cards.filterInD();
				if (cards.length) {
					// const cardx = cards.randomRemove();
					const result2 = await player
						.chooseButton(["灵慧：获得其中一张剩余牌？", cards])
						.set("ai", button => {
							return get.value(button.link);
						})
						.forResult();
					if(result2.bool){
						const gained = result2.links[0];
						cards.remove(gained);
						await player.gain(gained, "gain2");
					}
					await game.delayx();
					cards = cards.filterInD();
				}
			}
			if (cards.length) {
				const next = player.chooseToMove_new(get.translation(event.name), true);

				const top = cards.filter((c) => c);
				next.set('list', [
					[
						['牌堆顶', top],
					],
				]);
				const result = await next.forResult();
				if (!result?.bool) {
					return;
				}
				const [tops] = result.moved;
				if (tops.length) {
					tops.reverse();
					for (let i = 0; i < tops.length; i++) {
						ui.cardPile.insertBefore(tops[i], ui.cardPile.firstChild);
					}
				}
				game.updateRoundNumber();
				await game.delay();
				// cards.reverse();
				// game.cardsGotoPile(cards.filterInD(), "insert");
				// game.log(player, "将", get.cnNumber(cards.length), "张牌置于了牌堆顶");
			}
		},
	},
	qmsgswkjsgj_re_dcxiace: {
		audio: 'dcxiace',
		trigger: {
			player: "damageEnd",
			source: "damageSource",
		},
		filter(event, player) {
			const bool1 = event.player == player &&game.hasPlayer(target => target != player && !target.hasSkill("fengyin"));
			const bool2 =
				event.source &&
				event.source == player &&
				player.isDamaged() &&
				player.countCards("he", card => {
					if (_status.connectMode && get.position(card) == "h") {
						return true;
					}
					return lib.filter.cardDiscardable(card, player);
				});
			return bool1 || bool2;
		},
		direct: true,
		async content(event, trigger, player) {
			if (trigger.player == player && game.hasPlayer(target => target != player && !target.hasSkill("fengyin"))) {
				const { bool, targets } = await player
					.chooseTarget((card, player, target) => {
						return target != player && !target.hasSkill("fengyin");
					})
					.set("prompt", get.prompt("qmsgswkjsgj_re_dcxiace"))
					.set("prompt2", "令一名其他角色的非锁定技于本回合失效")
					.set("ai", target => {
						const player = get.event().player;
						return (
							-get.sgn(get.attitude(player, target)) *
							(target.getSkills(null, false, false).filter(skill => {
								return !get.is.locked(skill);
							}).length +
								1) *
							(target === _status.currentPhase ? 10 : 1)
						);
					})
					.forResult();
				if (bool) {
					const target = targets[0];
					player.logSkill("qmsgswkjsgj_re_dcxiace", target);
					target.addTempSkill("fengyin");
				}
			}
			if (
				trigger.source &&
				trigger.source == player &&
				player.isDamaged() &&
				player.countCards("he", card => {
					if (_status.connectMode && get.position(card) == "h") {
						return true;
					}
					return lib.filter.cardDiscardable(card, player);
				}) &&
				player.hasSkill("qmsgswkjsgj_re_dcxiace")
			) {
				const { bool } = await player
					.chooseToDiscard("he", get.prompt("dcxiace"), "弃置一张牌并回复1点体力")
					.set("ai", card => {
						const player = get.event().player;
						if (get.recoverEffect(player, player, player) <= 0) {
							return 0;
						}
						return 7 - get.value(card);
					})
					.set("logSkill", "qmsgswkjsgj_re_dcxiace")
					.forResult();
				if (bool) {
					await player.recover();
				}
			}
		},
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
			},
		},
	},
	qmsgswkjsgj_re_dcyuxin: {
		limited: true,
		audio: 'dcyuxin',
		trigger: { global: "dying" },
		filter(event, player) {
			return event.player.hp < 3;
		},
		prompt2(event, player) {
			return "令其将体力值回复至3点";
		},
		check(event, player) {
			if (get.recoverEffect(event.player, player, player) <= 0) {
				return false;
			}
			return lib.skill.luanfeng.check(event, player);
		},
		logTarget: "player",
		skillAnimation: true,
		animationColor: "thunder",
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			trigger.player.recover(3 - trigger.player.hp);
		},
	},
	//威张辽
	qmsgswkjsgj_re_dcyuxi: {
		audio: 'dcyuxi',
		trigger: {
			source: "damageBegin3",
			player: "damageBegin4",
		},
		getIndex(event,player){
			return event.num||1;
		},
		frequent: true,
		async content(event, trigger, player) {
			player.addSkill(event.name + "_effect");
			await player.draw({ gaintag: [event.name] });
		},
		subSkill: {
			effect: {
				inherit: "nocount",
				filter(event, player) {
					return (
						event.addCount !== false &&
						player.hasHistory("lose", evt => {
							return (evt.relatedEvent || evt.getParent()) == event && evt.hs.length && Object.values(evt.gaintag_map).flat().includes("qmsgswkjsgj_re_dcyuxi");
						})
					);
				},
				mod: {
					cardUsable(card) {
						if (get.number(card) === "unsure" || card.cards?.some(card => card.hasGaintag("qmsgswkjsgj_re_dcyuxi"))) {
							return Infinity;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_re_dcporong: {
		audio: 'dcporong',
		// 自制连招：第一步非杀，第二步杀
		getLianzhao: function () {
			return [
				function (event, player) { return get.name(event.card) != 'sha'; },
				function (event, player) { return get.name(event.card) == 'sha'; }
			]
		},
		comboSkill: true,
		init(player) {
			player.storage.qmsgswkjsgj_re_dcporong = 0;
		},
		trigger: {
			player: 'YB_qmsgswkjsgj_re_dcporong',
		},
		check(event, player) {
			// 借鉴破戎：仅当相邻目标有可抢手牌时才发动，避免空结算
			const tg = (event.targets && event.targets.length) ? event.targets
				: (event.trigger && event.trigger.targets) ? event.trigger.targets
				: (event._triggered && event._triggered.targets) ? event._triggered.targets : [];
			for (const tar of tg) {
				if (!tar.isIn()) continue;
				const around = [tar, tar.getNext(), tar.getPrevious()].filter(current => current != player && current.countGainableCards(player, 'h'));
				if (around.length) return true;
			}
			return false;
		},
		filter() { return true; },
		mod: {
			aiOrder(player, card, num) {
				if (typeof card == 'object' && get.name(card, player) == 'sha' && (player.storage.qmsgswkjsgj_re_dcporong || 0) >= 1) {
					return num + 10;
				}
			},
		},
		ai: {
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (!arg || !arg.card || get.name(arg.card, player) !== 'sha') return;
				return (player.storage.qmsgswkjsgj_re_dcporong || 0) >= 1;
			},
		},
		async content(event, trigger, player) {
			// 连招“箭在弦上”：弹出“是否发动”询问，期间标记显示全蓝连招记录
			// let go = (await player.chooseBool(get.prompt(event.name) + '：是否发动连招？')
			// 	.set('ai', () => true)
			// 	.forResult()).bool;
			// if (!go) {
			// 	player.storage[event.name + '_lzasking'] = null;
			// 	return;
			// }
			player.storage[event.name + '_lzasking'] = null;
			trigger.effectCount++;
			let targets = trigger.targets.sortBySeat();
			for (let tar of targets) {
				if (tar.isIn()) {
					const targetsx = [tar, tar.getNext(), tar.getPrevious()]
						.filter(current => current != player && current.countGainableCards(player, "h"))
						.sortBySeat();
					if (targetsx.length) {
						await player.gainMultiple(targetsx);
					}
				}
			}
		},
		mark: true,
		intro: {
			content: function (storage, player) {
				var skill = 'qmsgswkjsgj_re_dcporong';
				var list = ['非杀', '杀'], str = '';
				if (player.storage[skill + '_lzasking']) {
					// 连招“箭在弦上”：询问是否发动时，连招记录全蓝
					for (var i = 0; i < list.length; i++) {
						if (i > 0) str += '、';
						str += `<span class=bluetext>${list[i]}</span>`;
					}
					str += '<br><span class=bluetext>连招就绪·箭在弦上</span>';
					return str;
				}
				var num = storage;
				for (var i = 0; i < list.length; i++) {
					if (i > 0) str += '、';
					if (num > i) str += `<span class=thundertext>${list[i]}</span>`;
					else str += list[i];
				}
				return str;
			},
		}
	},

	//谋司马懿
	qmsgswkjsgj_re_dcsbquanmou: {
		audio: 'dcsbquanmou',
		audioname: ["dc_sb_simayi_shadow"],
		zhuanhuanji(player, skill) {
			player.storage[skill] = !player.storage[skill];
			player.changeSkin({ characterName: "dc_sb_simayi" }, "dc_sb_simayi" + (player.storage[skill] ? "_shadow" : ""));
		},
		marktext: "☯",
		enable: "phaseUse",
		filter(event, player) {
			const selected = player.getStorage("qmsgswkjsgj_re_dcsbquanmou_selected");
			return game.hasPlayer(current => !selected.includes(current) && current.countCards("he") > 0);
		},
		filterTarget(card, player, target) {
			if (player === target) {
				return false;
			}
			const selected = player.getStorage("qmsgswkjsgj_re_dcsbquanmou_selected");
			return !selected.includes(target) && target.countCards("he") > 0;
		},
		prompt() {
			const player = get.player();
			if (player.storage.qmsgswkjsgj_re_dcsbquanmou) {
				return "转换技。①游戏开始时，你可以转换此技能状态；②出牌阶段每名角色限一次，你可以令一名其他角色交给你一张牌。当你于本阶段内下次对其造成伤害后，你可以选择至多X名其他角色，对这些角色依次造成1点伤害（X为你的体力上限）。";
			}
			return "转换技。①游戏开始时，你可以转换此技能状态；②出牌阶段每名角色限一次，你可以令一名其他角色交给你一张牌。当你于本阶段内下次对其造成伤害时，取消之。";
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			player.changeZhuanhuanji("qmsgswkjsgj_re_dcsbquanmou");
			player.markAuto("qmsgswkjsgj_re_dcsbquanmou_selected", [target]);
			const { cards } = await target.chooseCard("he", true, `选择交给${get.translation(player)}一张牌`).forResult();
			if (cards && cards.length) {
				await target.give(cards, player);
				const key = `qmsgswkjsgj_re_dcsbquanmou_${Boolean(!player.storage.qmsgswkjsgj_re_dcsbquanmou)}`;
				player.addTempSkill(key, { global: ["phaseUseBefore", "phaseChange"] });
				player.markAuto(key, [target]);
				target.addAdditionalSkill(`${key}_${player.playerid}`, `${key}_mark`);
			}
		},
		ai: {
			order: 9,
			result: {
				player(player, target) {
					if (player.storage.qmsgswkjsgj_re_dcsbquanmou) {
						return 1;
					}
					return 1 + game.countPlayer(i => player !== i && target !== i && !i.hasSkill("false_mark") && get.attitude(player, i) < 0);
				},
				target(player, target) {
					let res = target.hasSkillTag("noh") ? 0 : -1;
					if (player.storage.qmsgswkjsgj_re_dcsbquanmou) {
						return res + 0.6;
					}
					return res;
				},
			},
		},
		onremove: true,
		mark: true,
		intro: {
			content: storage => {
				if (storage) {
					return "转换技。①游戏开始时，你可以转换此技能状态；②出牌阶段每名角色限一次，你可以令一名其他角色交给你一张牌。当你于本阶段内下次对其造成伤害后，你可以选择至多X名其他角色，对这些角色依次造成1点伤害（X为你的体力上限）。";
				}
				return "转换技。①游戏开始时，你可以转换此技能状态；②出牌阶段每名角色限一次，你可以令一名其他角色交给你一张牌。当你于本阶段内下次对其造成伤害时，取消之。";
			},
		},
		group: "qmsgswkjsgj_re_dcsbquanmou_change",
		subSkill: {
			change: {
				audio: "qmsgswkjsgj_re_dcsbquanmou",
				audioname: ["dc_sb_simayi_shadow"],
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				filter(event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				prompt2(event, player) {
					return "切换【权谋】为状态" + (player.storage.qmsgswkjsgj_re_dcsbquanmou ? "阳" : "阴");
				},
				check: () => Math.random() > 0.5,
				content() {
					player.changeZhuanhuanji("qmsgswkjsgj_re_dcsbquanmou");
				},
			},
			true: {
				charlotte: true,
				audio: "qmsgswkjsgj_re_dcsbquanmou",
				audioname: ["dc_sb_simayi_shadow"],
				trigger: { source: "damageSource" },
				forced: true,
				popup: false,
				filter(event, player) {
					return player.getStorage("qmsgswkjsgj_re_dcsbquanmou_true").includes(event.player);
				},
				async content(event, trigger, player) {
					const target = trigger.player;
					player.getStorage("qmsgswkjsgj_re_dcsbquanmou_true").remove(target);
					target.removeAdditionalSkill(`qmsgswkjsgj_re_dcsbquanmou_true_${player.playerid}`);
					if (game.hasPlayer(current => current != player && current != target)) {
						const result = await player
							.chooseTarget([1, player.maxHp], `权谋：是否对${get.translation(target)}之外的至多${player.maxHp}名其他角色各造成1点伤害？`, (card, player, target) => {
								return target != player && target != get.event().getTrigger().player;
							})
							.set("ai", target => {
								const player = get.player();
								return get.damageEffect(target, player, player);
							})
							.forResult();
						if (result.bool) {
							await player.logSkill("qmsgswkjsgj_re_dcsbquanmou", result.targets);
							for (let i of result.targets) {
								if (i.isIn()) {
									await i.damage();
								}
							}
						}
					}
				},
				onremove(player, skill) {
					game.filterPlayer(current => {
						current.removeAdditionalSkill(`${skill}_${player.playerid}`);
					});
					delete player.storage[skill];
					delete player.storage.qmsgswkjsgj_re_dcsbquanmou_selected;
				},
			},
			true_mark: {
				charlotte: true,
				mark: true,
				marktext: "讨",
				intro: {
					name: "权谋 - 阴",
					content: () => {
						return `当你下次受到${get.translation(_status.currentPhase)}造成的伤害后，其可以对除你之外的至多X名其他角色各造成1点伤害（X为其体力上限）。`;
					},
				},
				ai: {
					threaten: 2.5,
					effect: {
						target(card, player, target) {
							if (get.tag(card, "damage") && player && player.hasSkill("qmsgswkjsgj_re_dcsbquanmou_true")) {
								let tars = game.countPlayer(i => player !== i && target !== i && get.attitude(player, target) < 0 && !target.hasSkill("qmsgswkjsgj_re_dcsbquanmou_false_mark"));
								return [1, 0, 1, (6 * Math.min(3, tars)) / (3 + Math.pow(target.countCards("h"), 2))];
							}
						},
					},
				},
			},
			false: {
				charlotte: true,
				audio: "qmsgswkjsgj_re_dcsbquanmou",
				audioname: ["dc_sb_simayi_shadow"],
				trigger: { source: "damageBegin2" },
				forced: true,
				filter(event, player) {
					return player.getStorage("qmsgswkjsgj_re_dcsbquanmou_false").includes(event.player);
				},
				async content(event, trigger, player) {
					const target = trigger.player;
					player.getStorage("qmsgswkjsgj_re_dcsbquanmou_false").remove(target);
					target.removeAdditionalSkill(`qmsgswkjsgj_re_dcsbquanmou_false_${player.playerid}`);
					trigger.cancel();
				},
				onremove(player, skill) {
					game.filterPlayer(current => {
						current.removeAdditionalSkill(`${skill}_${player.playerid}`);
					});
					delete player.storage[skill];
					delete player.storage.qmsgswkjsgj_re_dcsbquanmou_selected;
				},
			},
			false_mark: {
				charlotte: true,
				mark: true,
				marktext: "抚",
				intro: {
					name: "权谋 - 阳",
					content: () => {
						return `当你下次受到${get.translation(_status.currentPhase)}造成的伤害时，防止此伤害。`;
					},
				},
				ai: {
					nodamage: true,
					nofire: true,
					nothunder: true,
					skillTagFilter(player, tag, arg) {
						return arg && arg.player && arg.player.hasSkill("qmsgswkjsgj_re_dcsbquanmou_false");
					},
					effect: {
						target(card, player, target) {
							if (get.tag(card, "damage") && player && player.hasSkill("qmsgswkjsgj_re_dcsbquanmou_false")) {
								return "zeroplayertarget";
							}
						},
					},
				},
			},
		},
	},
	qmsgswkjsgj_re_dcsbpingliao: {
		audio: 'dcsbpingliao',
		audioname: ["dc_sb_simayi_shadow"],
		trigger: { player: "useCard" },
		forced: true,
		filter(event, player) {
			return event.card.name == "sha";
		},
		logTarget(event, player) {
			return game.filterPlayer(current => player.inRange(current));
		},
		async content(event, trigger, player) {
			const unrespondedTargets = [];
			const respondedTargets = [];
			let nonnonTargetResponded = false;
			const targets = game.filterPlayer().sortBySeat();
			const prompt = `###是否打出基本牌响应${get.translation(player)}？###${get.translation(player)}使用了一张不公开目标的${get.translation(trigger.card)}。若你选择响应且你不是此牌的隐藏目标，则其摸两张牌；若你选择不响应且你是此牌的隐藏目标，则你本回合内不能使用或打出手牌。`;
			for (let target of targets) {
				if (target.isIn() && player.inRange(target)) {
					const result = await target
						.chooseToRespond(prompt, (card, player) => {
							return get.type(card) === "basic";
						})
						.set("ai", card => {
							const player = get.player(),
								event = get.event();
							const source = event.getParent().player;
							if (get.attitude(player, source) > 0) {
								if (
									!event.respondedTargets.some(current => {
										return get.attitude(player, current) > 0 || get.attitude(source, current) >= 0;
									})
								) {
									return get.order(card);
								}
								return -1;
							} else {
								if (
									player.hp > 1 ||
									!player.hasCard("hs", i => {
										if (i == card || (card.cards && card.cards.includes(i))) {
											return false;
										}
										let name = get.name(i, player);
										return name == "shan" || name == "tao" || name == "jiu";
									})
								) {
									return 0;
								}
							}
							return event.getRand("qmsgswkjsgj_re_dcsbpingliao") > 1 / Math.max(1, player.hp) ? 0 : get.order(card);
						})
						.set("respondedTargets", respondedTargets)
						.forResult();
					if (result.bool) {
						respondedTargets.push(target);
						if (!trigger.targets.includes(target)) {
							nonnonTargetResponded = true;
						}
						await game.delay();
					} else if (trigger.targets.includes(target)) {
						unrespondedTargets.push(target);
					}
				}
			}
			unrespondedTargets.forEach(current => {
				current.addTempSkill("qmsgswkjsgj_re_dcsbpingliao_blocker");
				game.log(current, "本回合内无法使用或打出手牌");
			});
			if (nonnonTargetResponded) {
				player.draw(2);
				player.addTempSkill("qmsgswkjsgj_re_dcsbpingliao_buff", { global: "phaseChange" });
				player.addMark("qmsgswkjsgj_re_dcsbpingliao_buff", 1, false);
			}
		},
		ai: {
			ignoreLogAI: true,
			skillTagFilter(player, tag, args) {
				if (args) {
					return args.card && get.name(args.card) == "sha";
				}
			},
		},
		group: "qmsgswkjsgj_re_dcsbpingliao_hide",
		subSkill: {
			hide: {
				audio: "qmsgswkjsgj_re_dcsbpingliao",
				trigger: { player: "useCard0" },
				forced: true,
				filter(event, player) {
					return event.card.name == "sha";
				},
				async content(event, trigger, player) {
					trigger.hideTargets = true;
					game.log(player, "隐藏了", trigger.card, "的目标");
				},
			},
			buff: {
				onremove: true,
				charlotte: true,
				mod: {
					cardUsable(card, player, num) {
						if (card.name == "sha") {
							return num + player.countMark("qmsgswkjsgj_re_dcsbpingliao_buff");
						}
					},
				},
				mark: true,
				intro: {
					content: "本阶段内使用【杀】的次数上限+#",
				},
			},
			blocker: {
				charlotte: true,
				mod: {
					cardEnabled2(card, player) {
						if (player.getCards("h").includes(card)) {
							return false;
						}
					},
				},
				mark: true,
				marktext: "封",
				intro: {
					content: "本回合内不能使用或打出手牌",
				},
			},
		},
	},
	//管宁
	qmsgswkjsgj_re_dunshi: {
		audio: "dunshi",
		enable: ["chooseToUse", "chooseToRespond"],
		init(player, skill) {
			if (!player.storage[skill]) {
				player.storage[skill] = [["sha", "shan", "tao", "jiu"], 0];
			}
		},
		hiddenCard(player, name) {
			if (player.storage.qmsgswkjsgj_re_dunshi && player.storage.qmsgswkjsgj_re_dunshi[0].includes(name) && !player.getStat("skill").qmsgswkjsgj_re_dunshi) {
				return true;
			}
			return false;
		},
		marktext: "席",
		mark: true,
		intro: {
			markcount(storage) {
				return storage[1];
			},
			content(storage, player) {
				if (!storage) {
					return;
				}
				var str = "<li>";
				if (!storage[0].length) {
					str += "已无可用牌";
				} else {
					str += "剩余可用牌：";
					str += get.translation(storage[0]);
				}
				str += "<br><li>“席”标记数量：";
				str += storage[1];
				return str;
			}
		},
		filter(event, player) {
			if (event.type == "wuxie") {
				return false;
			}
			var storage = player.storage.qmsgswkjsgj_re_dunshi;
			if (!storage || !storage[0].length) {
				return false;
			}
			for (var i of storage[0]) {
				var card = { name: i, isCard: true };
				if (event.filterCard(card, player, event)) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				var storage = player.storage.qmsgswkjsgj_re_dunshi;
				for (var i of storage[0]) {
					list.push(["基本", "", i]);
				}
				return ui.create.dialog("遁世", [list, "vcard"], "hidden");
			},
			filter(button, player) {
				var evt = _status.event.getParent();
				return evt.filterCard({ name: button.link[2], isCard: true }, player, evt);
			},
			check(button) {
				var card = { name: button.link[2] }, player = _status.event.player;
				if (_status.event.getParent().type != "phase") {
					return 1;
				}
				if (card.name == "jiu") {
					return 0;
				}
				if (card.name == "sha" && player.hasSkill("jiu")) {
					return 0;
				}
				return player.getUseValue(card, null, true);
			},
			backup(links, player) {
				return {
					audio: "dunshi",
					filterCard() {
						return false;
					},
					popname: true,
					viewAs: {
						name: links[0][2],
						isCard: true
					},
					selectCard: -1,
					async precontent(event, trigger, player2) {
						var arr = player2.storage.qmsgswkjsgj_re_dunshi_damage;
						if (!arr) {
							arr = player2.storage.qmsgswkjsgj_re_dunshi_damage = [];
							player2.addTempSkill("qmsgswkjsgj_re_dunshi_damage");
						}
						arr.push({ name: event.result.card.name, source: _status.currentPhase });
						var storage = player2.storage.qmsgswkjsgj_re_dunshi;
						if (storage && storage[0]) {
							storage[0].remove(event.result.card.name);
							player2.markSkill("qmsgswkjsgj_re_dunshi");
						}
					}
				};
			},
			prompt(links, player) {
				return "选择【" + get.translation(links[0][2]) + "】的目标";
			}
		},
		ai: {
			respondSha: true,
			respondShan: true,
			skillTagFilter(player, tag, arg) {
				var storage = player.storage.qmsgswkjsgj_re_dunshi;
				if (!storage || !storage[0].length) {
					return false;
				}
				if (player.getStat("skill").qmsgswkjsgj_re_dunshi) {
					return false;
				}
				switch (tag) {
					case "respondSha":
						return (_status.event.type != "phase" || player == game.me || player.isUnderControl() || player.isOnline()) && storage[0].includes("sha");
					case "respondShan":
						return storage[0].includes("shan");
					case "save":
						if (arg == player && storage[0].includes("jiu")) {
							return true;
						}
						return storage[0].includes("tao");
				}
			},
			order: 2,
			result: {
				player(player) {
					if (_status.event.type == "dying") {
						return get.attitude(player, _status.event.dying);
					}
					return 1;
				}
			}
		},
		initList() {
			var list, skills2 = [], banned = [], bannedInfo = ["游戏开始时"];
			if (get.mode() == "guozhan") {
				list = [];
				for (var i in lib.characterPack.mode_guozhan) {
					list.push(i);
				}
			} else if (_status.connectMode) {
				list = get.charactersOL();
			} else {
				list = [];
				for (var i in lib.character) {
					if (lib.filter.characterDisabled2(i) || lib.filter.characterDisabled(i)) {
						continue;
					}
					list.push(i);
				}
			}
			for (var i of list) {
				if (i.indexOf("gz_jun") == 0) {
					continue;
				}
				for (var j of lib.character[i][3]) {
					var skill = lib.skill[j];
					if (!skill || skill.zhuSkill || banned.includes(j)) {
						continue;
					}
					if (skill.ai && (skill.ai.combo || skill.ai.neg)) {
						continue;
					}
					const infox = get.skillInfoTranslation(j);
					if (bannedInfo.some((item) => infox.includes(item))) {
						continue;
					}
					const info = get.plainText(get.translation(j));
					if ("仁/义/礼/智/信".split("/").some((item) => info.includes(item))) {
						skills2.add(j);
					}
				}
			}
			_status.qmsgswkjsgj_re_dunshi_list = skills2;
		},
		subSkill: {
			reset: {
				audio: "dunshi",
				trigger: { global: "phaseBegin" },
				forced: true,
				popup: false,
				filter(event, player) {
					return event.player == player;
				},
				content() {
					var storage = player.storage.qmsgswkjsgj_re_dunshi;
					if (storage) {
						storage[0] = ["sha", "shan", "tao", "jiu"];
						player.markSkill("qmsgswkjsgj_re_dunshi");
					}
					var queue = player.storage.qmsgswkjsgj_re_dunshi_damage;
					if (queue && queue.length) {
						player.removeSkill("qmsgswkjsgj_re_dunshi_damage");
						delete player.storage.qmsgswkjsgj_re_dunshi_damage;
					}
				}
			},
			backup: { audio: "dunshi" },
			damage: {
				audio: "dunshi",
				trigger: { global: "damageBegin2" },
				forced: true,
				charlotte: true,
				filter(event, player) {
					return event.source == _status.currentPhase;
				},
				onremove: true,
				logTarget: "source",
				getIndex(event,player){
					var queue = player.storage.qmsgswkjsgj_re_dunshi_damage;
					return queue.length||1;
				},
				async content(event, trigger, player) {
					var queue = player.storage.qmsgswkjsgj_re_dunshi_damage;
					if (!queue || !queue.length) {
						return;
					}
					var idx = queue.findIndex(function(e) {
						return e.source == trigger.source;
					});
					if (idx == -1) {
						return;
					}
					const cardname = queue.splice(idx, 1)[0].name;
					const target = trigger.source;
					const card = get.translation(trigger.source), card2 = get.translation(cardname), card3 = get.translation(trigger.player);
					const list = ["防止即将对" + card3 + "造成的伤害，并令" + card + "获得一个技能名中包含“仁/义/礼/智/信”的技能", "从〖遁世〗中删除【" + card2 + "】并获得一枚“席”", "减1点体力上限，然后摸等同于“席”数的牌"];
					const result = await player.chooseButton([
						"遁世：请选择两项",
						[
							list.map((item, i2) => {
								return [i2, item];
							}),
							"textbutton"
						]
					]).set("forced", true).set("selectButton", 2).set("ai", function(button) {
						var player2 = _status.event.player;
						switch (button.link) {
							case 0:
								if (get.attitude(player2, _status.currentPhase) > 0) {
									return 3;
								}
								return 0;
							case 1:
								return 1;
							case 2:
								var num = player2.storage.qmsgswkjsgj_re_dunshi[1];
								for (var i2 of ui.selected.buttons) {
									if (i2.link == 1) {
										num++;
									}
								}
								if (num > 0 && player2.isDamaged()) {
									return 2;
								}
								return 0;
						}
					}).forResult();
					const links = result.links.sort();
					for (var i of links) {
						game.log(player, "选择了", "#g【遁世】", "的", "#y选项" + get.cnNumber(i + 1, true));
					}
					if (links.includes(0)) {
						trigger.cancel();
						if (!_status.qmsgswkjsgj_re_dunshi_list) {
							lib.skill.qmsgswkjsgj_re_dunshi.initList();
						}
						var skills2 = _status.qmsgswkjsgj_re_dunshi_list.filter(function(i2) {
							return !target.hasSkill(i2, null, null, false);
						}).randomGets(3);
						if (skills2.length) {
							const videoId = lib.status.videoId++;
							var func = function(skills3, id, target2) {
								var dialog = ui.create.dialog("forcebutton");
								dialog.videoId = id;
								dialog.add("令" + get.translation(target2) + "获得一个技能");
								for (var i2 = 0; i2 < skills3.length; i2++) {
									dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' + get.translation(skills3[i2]) + "】</div><div>" + lib.translate[skills3[i2] + "_info"] + "</div></div>");
								}
								dialog.addText(" <br> ");
							};
							if (player.isOnline()) {
								player.send(func, skills2, videoId, target);
							} else if (player == game.me) {
								func(skills2, videoId, target);
							}
							const controlResult = await player.chooseControl(skills2).set("ai", function() {
								var controls = _status.event.controls;
								if (controls.includes("cslilu")) {
									return "cslilu";
								}
								if (controls.includes("zhichi")) {
									return "zhichi";
								}
								return controls[0];
							}).forResult();
							game.broadcastAll("closeDialog", videoId);
							target.addSkills(controlResult.control);
						}
					}
					var storage = player.storage.qmsgswkjsgj_re_dunshi;
					if (links.includes(1)) {
						storage[0].remove(cardname);
						storage[1]++;
						player.markSkill("qmsgswkjsgj_re_dunshi");
					}
					if (links.includes(2)) {
						player.loseMaxHp();
						if (storage[1] > 0) {
							await player.draw(storage[1]);
						}
					}
					if (!player.storage.qmsgswkjsgj_re_dunshi_damage.length) {
						player.removeSkill("qmsgswkjsgj_re_dunshi_damage");
						delete player.storage.qmsgswkjsgj_re_dunshi_damage;
					}
				}
			}
		}
	},
	//星月界庞凤衣
	qmsgswkjsgj_re_dcyitong: {
		audio: 'dcyitong',
		trigger: {
			global: ["phaseBefore", "cardsDiscardAfter"],
			player: "enterGame",
		},
		filter(event, player, name) {
			const suits = player.getStorage("qmsgswkjsgj_re_dcyitong");
			if (name === "phaseBefore" || name === "enterGame") {
				return suits.length < 4 && (event.name !== "phase" || game.phaseNumber === 0);
			}
			return suits.some(suit => {
				if (!event.getd?.().some(card => get.suit(card, false) === suit)) {
					return false;
				}
				return (
					game
						.getGlobalHistory("cardMove", evt => {
							if (evt.name !== "cardsDiscard") {
								return false;
							}
							const evtx = evt.getParent();
							if (evtx.name !== "orderingDiscard") {
								return false;
							}
							const evt2 = evtx.relatedEvent || evtx.getParent();
							if (evt2.name != "useCard") {
								return false;
							}
							return evt.getd?.()?.some(card => get.suit(card, false) === suit);
						})
						.indexOf(event) === 0
				);
			});
		},
		forced: true,
		async content(event, trigger, player) {
			const name = event.triggername,
				storage = player.getStorage("qmsgswkjsgj_re_dcyitong"),
				suits = lib.suit
					.filter(suit => {
						if (name === "phaseBefore" || name === "enterGame") {
							return !storage.includes(suit);
						}
						if (!storage.includes(suit) || !trigger.getd?.().some(card => get.suit(card, false) === suit)) {
							return false;
						}
						return (
							game
								.getGlobalHistory("everything", evt => {
									if (evt.name !== "cardsDiscard") {
										return false;
									}
									const evtx = evt.getParent();
									if (evtx.name !== "orderingDiscard") {
										return false;
									}
									const evt2 = evtx.relatedEvent || evtx.getParent();
									if (evt2.name != "useCard") {
										return false;
									}
									return evt.getd?.()?.some(card => get.suit(card, false) === suit);
								})
								.indexOf(trigger) === 0
						);
					})
					.reverse();
			if (name === "phaseBefore" || name === "enterGame") {
				const result =
					suits.length > 1
						? await player
							.chooseControl(suits)
							.set("ai", () => {
								return get.event().controls.randomGet();
							})
							.set("prompt", "异瞳：请记录一个花色")
							.forResult()
						: { control: suits[0] };
				const suit = result.control;
				if (suit) {
					player.markAuto("qmsgswkjsgj_re_dcyitong", [suit]);
					player.addTip("qmsgswkjsgj_re_dcyitong", get.translation("qmsgswkjsgj_re_dcyitong") + player.getStorage("qmsgswkjsgj_re_dcyitong").reduce((str, suit) => str + get.translation(suit), ""));
				}
			} else {
				let gains = [];
				for (const suitx of suits) {
					for (const suit of lib.suit.slice().reverse()) {
						if (suitx === suit) {
							continue;
						}
						const card = get.cardPile(card => get.suit(card) === suit && !gains.includes(card));
						if (card) {
							gains.push(card);
						}
					}
				}
				if (gains.length) {
					await player.gain(gains, "gain2");
				}
			}
		},
		onremove(player, skill) {
			delete player.storage[skill];
			player.removeTip(skill);
		},
		intro: { content: "已记录$花色" },
	},
	qmsgswkjsgj_re_dcpeiniang: {
		audio: 'dcpeiniang',
		mod: {
			cardUsable(card) {
				if (card?.storage?.qmsgswkjsgj_re_dcpeiniang) {
					return Infinity;
				}
			},
		},
		locked: false,
		enable: "chooseToUse",
		filterCard(card, player) {
			return player.getStorage("qmsgswkjsgj_re_dcyitong").includes(get.suit(card));
		},
		viewAs: {
			name: "jiu",
			storage: { qmsgswkjsgj_re_dcpeiniang: true },
		},
		prompt() {
			const player = get.player();
			return "将" + player.getStorage("qmsgswkjsgj_re_dcyitong").reduce((str, suit) => str + get.translation(suit), "") + "牌当作【酒】使用";
		},
		check(card, player) {
			return 0 + (lib.skill.oljiuchi?.check?.(card, player) ?? 0);
		},
		precontent() {
			event.getParent().addCount = false;
		},
		position: "hes",
		group: ["qmsgswkjsgj_re_dcpeiniang_dying"],
		subSkill: {
			dying: {
				trigger: {
					global: "dying",
				},
				filter(event, player) {
					return event.player != player;
				},
				direct: true,
				async content(event, trigger, player) {
					await player.chooseToUse({
						prompt: `醅酿：是否对${get.translation(trigger.player)}使用一张酒？`,
						prompt2: `当前体力：${trigger.player.hp}`,
						filterCard(card, player) {
							return get.name(card) == "jiu";
						},
						filterTarget(card, player, target) {
							if (target != _status.event.dying) {
								return false;
							}
							if (!card) {
								return false;
							}
							const info = get.info(card);
							if (!info.singleCard || ui.selected.targets.length == 0) {
								let mod = game.checkMod(card, player, target, "unchanged", "playerEnabled", player);
								if (mod == false) {
									return false;
								}
								mod = game.checkMod(card, player, target, "unchanged", "targetEnabled", target);
								if (mod !== "unchanged") {
									return mod ?? false;
								}
							}
							return true;
						},
						ai1(card) {
							if (typeof card == "string") {
								const info = get.info(card);
								if (info.ai && info.ai.order) {
									if (typeof info.ai.order == "number") {
										return info.ai.order;
									} else if (typeof info.ai.order == "function") {
										return info.ai.order();
									}
								}
							}
							return 1;
						},
						ai2(target) {
							const effect_use = get.effect_use(target);
							if (effect_use <= 0) {
								return effect_use;
							}
							return get.effect(target);
						},
						dying: trigger.player,
					});
				},
			},
		},
		ai: {
			combo: "qmsgswkjsgj_re_dcyitong",
		},
	},

	//界关羽补强
	qmsgswkjsgj_re_wusheng: {
		audio: 'wusheng',
		enable: ["chooseToRespond", "chooseToUse"],
		filterCard(card, player) {
			return get.color(card) == "red";
		},
		position: "hes",
		viewAs: { name: "sha" },
		viewAsFilter(player) {
			if (!player.countCards("hes", { color: "red" ,storage:{qmsgswkjsgj_re_wusheng:true}})) {
				return false;
			}
		},
		prompt: "将一张红色牌当无距离限制的杀使用或打出",
		check(card) {
			const val = get.value(card);
			if (_status.event.name == "chooseToRespond") {
				return 1 / Math.max(0.1, val);
			}
			return 5 - val;
		},
		mod: {
			targetInRange(card) {
				if (card.storage.qmsgswkjsgj_re_wusheng==true) {
					return true;
				}
			},
		},
		ai: {
			skillTagFilter(player) {
				if (!player.countCards("hes", { color: "red" })) {
					return false;
				}
			},
			respondSha: true,
		},
	},
	qmsgswkjsgj_re_yijue: {
		initSkill(skill) {
			if (!lib.skill[skill]) {
				lib.skill[skill] = {
					charlotte: true,
					onremove: true,
					mark: true,
					marktext: "绝",
					intro: {
						markcount: () => 0,
						content: storage => `本回合不能使用或打出手牌、非锁定技失效且受到${get.translation(storage[1])}红桃【杀】的伤害+1`,
					},
					group: "qmsgswkjsgj_re_yijue_ban",
				};
				lib.translate[skill] = "义绝";
				lib.translate[skill + "_bg"] = "绝";
			}
		},
		audio: "yijue",
		enable: "phaseUse",
		usable: 1,
		filterTarget(card, player, target) {
			return player != target && target.countCards("h");
		},
		// filterCard: lib.filter.cardDiscardable,
		// position: "he",
		// check(card) {
		// 	return 8 - get.value(card);
		// },
		async content(event, trigger, player) {
			const { target } = event;
			if (!target.countCards("he")) {
				return;
			}
			const result = await player
				.discardPlayerCard('he', target, true)
				.set("ai", card => {
					const player = get.player();
					if (get.color(card) == "black") {
						return 18 - get.event().black - get.value(card);
					}
					return 18 - get.value(card);
				})
				.set(
					"black",
					(() => {
						if (get.attitude(target, player) > 0) {
							return 18;
						}
						if (
							target.hasCard(card => {
								const name = get.name(card, target);
								return name === "shan" || name === "tao" || (name === "jiu" && target.hp < 3);
							})
						) {
							return 18 / target.hp;
						}
						if (target.hp < 3) {
							return 12 / target.hp;
						}
						return 0;
					})()
				)
				.forResult();
			if (result?.bool && result?.cards?.length) {
				const { cards } = result;
				await target.showCards(cards);
				const [card] = cards;
				if (get.color(card) == "black") {
					if (!target.hasSkill("fengyin")) {
						target.addTempSkill("fengyin");
					}
					const skill = "qmsgswkjsgj_re_yijue_" + player.playerid;
					game.broadcastAll(lib.skill.new_yijue.initSkill, skill);
					target.addTempSkill(skill);
					target.storage[skill] ??= [0, player];
					target.storage[skill][0]++;
					target.markSkill(skill);
					player.addTempSkill("qmsgswkjsgj_re_yijue_effect");
				} else if (get.color(card) == "red") {
					await player.gain(card, target, "give", "bySelf");
					if (target.isDamaged()) {
						const result = await player
							.chooseBool(`是否让${get.translation(target)}回复1点体力？`)
							.set("choice", get.recoverEffect(target, player, player) > 0)
							.forResult();
						if (result?.bool) {
							await target.recover();
						}
					}
				}
			}
		},
		ai: {
			result: {
				target(player, target) {
					var hs = player.getCards("h");
					if (hs.length < 3) {
						return 0;
					}
					if (target.countCards("h") > target.hp + 1 && get.recoverEffect(target) > 0) {
						return 1;
					}
					if (player.canUse("sha", target) && (player.countCards("h", "sha") || player.countCards("he", { color: "red" }))) {
						return -2;
					}
					return -0.5;
				},
			},
			order: 9,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (!arg?.target?.hasSkill("new_yijue_" + player.playerid)) {
					return false;
				}
			},
		},
		subSkill: {
			effect: {
				charlotte: true,
				trigger: { source: "damageBegin1" },
				filter(event, player) {
					return event.card?.name == "sha" && get.suit(event.card) == "heart" && event.notLink() && event.player.storage["new_yijue_" + player.playerid]?.[1] == player;
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					trigger.num += trigger.player.storage["new_yijue_" + player.playerid][0];
				},
			},
			ban: {
				charlotte: true,
				mod: {
					cardEnabled2(card) {
						if (get.position(card) == "h") {
							return false;
						}
					},
				},
			},
		},
	},
	//界马超补强
	qmsgswkjsgj_re_tieji: {
		audio: 'retieji',
		trigger: { player: "useCardToPlayered" },
		check(event, player) {
			return get.attitude(player, event.target) <= 0;
		},
		filter(event, player) {
			return event.card.name == "sha";
		},
		logTarget: "target",
		content() {
			"step 0";
			player.judge(function () {
				return 0;
			});
			if (!trigger.target.hasSkill("fengyin")) {
				trigger.target.addTempSkill("fengyin",{player:'phaseAfter'});
			}
			"step 1";
			var suit = result.suit;
			var target = trigger.target;
			var num = target.countCards("h", "shan");
			target
				.chooseToDiscard("请弃置一张" + get.translation(suit) + "牌，否则不能使用闪抵消此杀", "he", function (card) {
					return get.suit(card) == _status.event.suit;
				})
				.set("ai", function (card) {
					var num = _status.event.num;
					if (num == 0) {
						return 0;
					}
					if (card.name == "shan") {
						return num > 1 ? 2 : 0;
					}
					return 8 - get.value(card);
				})
				.set("num", num)
				.set("suit", suit);
			"step 2";
			if (!result.bool) {
				trigger.getParent().directHit.add(trigger.target);
			}
		},
		ai: {
			ignoreSkill: true,
			skillTagFilter(player, tag, arg) {
				if (tag == "directHit_ai") {
					return arg?.target && get.attitude(player, arg.target) <= 0;
				}
				if (!arg || arg.isLink || !arg.card || arg.card.name != "sha") {
					return false;
				}
				if (!arg.target || get.attitude(player, arg.target) >= 0) {
					return false;
				}
				if (!arg.skill || !lib.skill[arg.skill] || lib.skill[arg.skill].charlotte || lib.skill[arg.skill].persevereSkill || get.is.locked(arg.skill) || !arg.target.getSkills(true, false).includes(arg.skill)) {
					return false;
				}
			},
			directHit_ai: true,
		},
	},
	//界徐盛补强
	qmsgswkjsgj_re_pojun: {
		audio: 'repojun',
		trigger: { player: "useCardToPlayered" },
		direct: true,
		filter(event, player) {
			return event.card.name == "sha" && event.target.hp > 0 && event.target.countCards("he") > 0;
		},
		preHidden: true,
		content() {
			"step 0";
			var next = player.choosePlayerCard(trigger.target, "he", [1, Math.min(trigger.target.maxHp, trigger.target.countCards("he"))], get.prompt("qmsgswkjsgj_re_pojun", trigger.target), "allowChooseAll");
			next.set("ai", function (button) {
				if (!_status.event.goon) {
					return 0;
				}
				var val = get.value(button.link);
				if (button.link == _status.event.target.getEquip(2)) {
					return 2 * (val + 3);
				}
				return val;
			});
			next.set("goon", get.attitude(player, trigger.target) <= 0);
			next.set("forceAuto", true);
			next.setHiddenSkill(event.name);
			"step 1";
			if (result.bool) {
				var target = trigger.target;
				player.logSkill("qmsgswkjsgj_re_pojun", target);
				target.addSkill("qmsgswkjsgj_re_pojun2");
				target.addToExpansion("giveAuto", result.cards, target).gaintag.add("qmsgswkjsgj_re_pojun2");
			}
		},
		ai: {
			unequip_ai: true,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (get.attitude(player, arg.target) > 0) {
					return false;
				}
				if (tag == "directHit_ai") {
					return arg.target.hp >= Math.max(1, arg.target.countCards("h") - 1);
				}
				if (arg && arg.name == "sha" && arg.target.getEquip(2)) {
					return true;
				}
				return false;
			},
		},
		group: "qmsgswkjsgj_re_pojun3",
	},
	qmsgswkjsgj_re_pojun3: {
		audio: "repojun",
		trigger: { source: "damageBegin1" },
		sourceSkill: "qmsgswkjsgj_re_pojun",
		filter(event, player) {
			var target = event.player;
			return event.card && event.card.name == "sha" && player.countCards("h") >= target.countCards("h") && player.countCards("e") >= target.countCards("e");
		},
		forced: true,
		locked: false,
		logTarget: "player",
		preHidden: true,
		check(event, player) {
			return get.attitude(player, event.player) < 0;
		},
		content() {
			trigger.num++;
		},
	},
	qmsgswkjsgj_re_pojun2: {
		trigger: { global: "phaseEnd" },
		forced: true,
		popup: false,
		charlotte: true,
		sourceSkill: "qmsgswkjsgj_re_pojun",
		filter(event, player) {
			return player.getExpansions("qmsgswkjsgj_re_pojun2").length > 0;
		},
		content() {
			"step 0";
			var cards = player.getExpansions("qmsgswkjsgj_re_pojun2");
			player.gain(cards, "draw");
			game.log(player, "收回了" + get.cnNumber(cards.length) + "张“破军”牌");
			"step 1";
			player.removeSkill("qmsgswkjsgj_re_pojun2");
		},
		intro: {
			markcount: "expansion",
			mark(dialog, storage, player) {
				var cards = player.getExpansions("qmsgswkjsgj_re_pojun2");
				if (player.isUnderControl(true)) {
					dialog.addAuto(cards);
				} else {
					return "共有" + get.cnNumber(cards.length) + "张牌";
				}
			},
		},
	},
	//神张辽
	qmsgswkjsgj_drlt_tuxi: {
		audio: "retuxi",
		trigger: {
			player: "phaseDrawBegin2",
		},
		direct: true,
		preHidden: true,
		filter(event, player) {
			return (
				event.num > 0 &&
				!event.numFixed &&
				game.hasPlayer(function (target) {
					return target.countCards("he") > 0 && player != target;
				})
			);
		},
		content() {
			"step 0";
			var num = get.copy(trigger.num);
			if (get.mode() == "guozhan" && num > 2) {
				num = 2;
			}
			player
				.chooseTarget(
					get.prompt("qmsgswkjsgj_drlt_tuxi"),
					"获得至多" + get.translation(num) + "名角色的各一张牌，然后少摸等量的牌",
					[1, num],
					function (card, player, target) {
						return target.countCards("he") > 0 && player != target;
					},
					function (target) {
						var att = get.attitude(_status.event.player, target);
						if (target.hasSkill("tuntian")) {
							return att / 10;
						}
						return 1 - att;
					}
				)
				.setHiddenSkill("qmsgswkjsgj_drlt_tuxi");
			"step 1";
			if (result.bool) {
				result.targets.sortBySeat();
				player.logSkill("qmsgswkjsgj_drlt_tuxi", result.targets);
				player.gainMultiple(result.targets, "he");
				trigger.num -= result.targets.length;
			} else {
				event.finish();
			}
			"step 2";
			if (trigger.num <= 0) {
				game.delay();
			}
		},
		ai: {
			threaten: 1.6,
			expose: 0.2,
		},
	},
	qmsgswkjsgj_drlt_duorui: {
		audio: 'drlt_duorui',
		init(player2, skill) {
			if (!player2.storage.qmsgswkjsgj_drlt_duorui) {
				player2.storage.qmsgswkjsgj_drlt_duorui = [];
			}
		},
		trigger: {
			source: "damageSource",
		},
		filter(event, player2) {
			if (/*player2.storage.qmsgswkjsgj_drlt_duorui.length || */event.player === player2) {
				return false;
			}
			return event.player.isIn() && _status.currentPhase == player2 /*&& event.player.hasEnabledSlot()*/;
		},
		check(event, player2) {
			if (get.attitude(_status.event.player, event.player) >= 0) {
				return false;
			}
			return true;
		},
		bannedList: ["bifa", "buqu", "gzbuqu", "songci", "funan", "xinfu_guhuo", "reguhuo", "huashen", "rehuashen", "old_guhuo", "shouxi", "xinpojun", "taoluan", "xintaoluan", "xinfu_yingshi", "zhenwei", "zhengnan", "xinzhengnan"],
		logTarget: "player",
		async content(event, trigger, player2) {
			const skills2 = getFilteredSkills(trigger.player);
			event.skills = skills2;
			// 仅废除对方一个装备栏，由神张辽选择废除哪一个
			if (trigger.player.hasEnabledSlot()) {
				await trigger.player.chooseToDisable({ source: player2, selectButton: [1, 1] });
				game.log(player2, "废除了", get.translation(trigger.player), "的一个装备栏");
			}
			if (!skills2.length) {
				return;
			}
			const result = await player2.chooseButton(["请选择要获得的技能", [skills2, "skill"]], true).set("ai", () => Math.random()).forResult();
			player2.addTempSkills(result.links, { player: "dieAfter" });
			if(!player2.storage.qmsgswkjsgj_drlt_duorui)player2.storage.qmsgswkjsgj_drlt_duorui=[];
			player2.storage.qmsgswkjsgj_drlt_duorui.push(result.links);
			if(!trigger.player.storage.qmsgswkjsgj_drlt_duorui_ban)trigger.player.storage.qmsgswkjsgj_drlt_duorui_ban=[]
			trigger.player.storage.qmsgswkjsgj_drlt_duorui_ban.push(result.links);
			// 立即令对方被夺技能失效：duorui1为临时技，已拥有时addTempSkill会提前返回、init只跑一次，故此处每次夺取都直接废除
			if (result.links) trigger.player.disableSkill("qmsgswkjsgj_drlt_duorui1", result.links);
			trigger.player.addTempSkill("qmsgswkjsgj_drlt_duorui1", { player: "dieAfter" });
			return;
			function getFilteredSkills(player3) {
				const result2 = [];
				if (player3.name1 != null) {
					result2.push(...lib.character[player3.name1][3]);
				} else {
					result2.push(...lib.character[player3.name][3]);
				}
				if (player3.name2 != null) {
					result2.push(...lib.character[player3.name2][3]);
				}
				const banned = (player3.storage.qmsgswkjsgj_drlt_duorui_ban || []).flat();
				return result2.filter((skill) => {
					const info = get.info(skill);
					return info && !lib.skill.qmsgswkjsgj_drlt_duorui.bannedList.includes(skill) && !banned.includes(skill);
				});
			}
		},
	},
	qmsgswkjsgj_drlt_duorui1: {
		init(player2, skill) {
			if(player2.storage.qmsgswkjsgj_drlt_duorui_ban.length){
				for(var i of player2.storage.qmsgswkjsgj_drlt_duorui_ban){
					player2.disableSkill(skill, i);
				}
			}
		},
		onremove(player2, skill) {
			var banned = (player2.storage.qmsgswkjsgj_drlt_duorui_ban || []).flat();
			for (var i = 0; i < banned.length; i++) {
				player2.enableSkill(banned[i]);
			}
		},
		locked: true,
		mark: true,
		charlotte: true,
		intro: {
			content(storage, player2, skill) {
				var list = [];
				for (var i in player2.disabledSkills) {
					if (player2.disabledSkills[i].includes(skill)) {
						list.push(i);
					}
				}
				if (list.length) {
					var str = "失效技能：";
					for (var i = 0; i < list.length; i++) {
						if (lib.translate[list[i] + "_info"]) {
							str += get.translation(list[i]) + "、";
						}
					}
					return str.slice(0, str.length - 1);
				}
			}
		}
	},
	qmsgswkjsgj_drlt_zhiti: {
		audio: 'drlt_zhiti',
		// ① 摸牌阶段多摸X张（X=场上所有被废除的装备栏数）
		trigger: { player: "phaseDrawBegin2" },
		direct: true,
		filter(event, player) {
			if (event.numFixed) {
				return false;
			}
			return getDisabledEquipCount() > 0;
			function getDisabledEquipCount() {
				var n = 0;
				game.players.forEach(function (p) {
					for (var i = 1; i <= 5; i++) {
						if (p.hasDisabledSlot(i)) {
							n++;
						}
					}
				});
				return n;
			}
		},
		content() {
			var x = 0;
			game.players.forEach(function (p) {
				for (var i = 1; i <= 5; i++) {
					if (p.hasDisabledSlot(i)) {
						x++;
					}
				}
			});
			if (x > 0) {
				trigger.num += x;
				player.logSkill("qmsgswkjsgj_drlt_zhiti");
				game.log(player, "因〖止啼〗多摸了" + get.cnNumber(x) + "张牌");
			}
		},
		group: ["qmsgswkjsgj_drlt_zhiti_discard",'qmsgswkjsgj_drlt_zhiti_hit'],
		subSkill:{
			hit:{
				// ③ 有被废除装备栏的角色不可响应你使用的牌
				audio: 'qmsgswkjsgj_drlt_zhiti',
				forced: true,
				trigger: {
					player: "useCard",
				},
				filter(event, player) {
					return (
						event.card &&
						game.hasPlayer(function (current) {
							return current != player && current.hasDisabledSlot();
						})
					);
				},
				content() {
					trigger.directHit.addArray(
						game.filterPlayer(function (current) {
							return current != player && current.hasDisabledSlot();
						})
					);
				},
				ai: {
					directHit_ai: true,
					skillTagFilter(player, tag, arg) {
						return get.distance(arg.target, player) <= 1;
					},
				},
				targetprompt2: target => {
					const player = get.player(),
						card = get.card();
					if (target !== player && target.hasDisabledSlot()) {
						return "不可响应";
					}
				},
				onChooseToUse(event) {
					event.targetprompt2.add(lib.skill.qmsgswkjsgj_drlt_zhiti_hit.targetprompt2);
				},
				onChooseTarget(event) {
					event.targetprompt2.add(lib.skill.qmsgswkjsgj_drlt_zhiti_hit.targetprompt2);
				},
			},
			discard: {
				audio: 'qmsgswkjsgj_drlt_zhiti',
				// ② 其他角色弃牌阶段结束时，若其有被废除的装备栏，你可弃置其等量张牌
				trigger: { global: "phaseDiscardEnd" },
				filter(event, player) {
					if (event.player == player) {
						return false;
					}
					var count = 0;
					for (var i = 1; i <= 5; i++) {
						if (event.player.hasDisabledSlot(i)) {
							count++;
						}
					}
					return count > 0 && event.player.countCards("he") > 0;
				},
				async content(event, trigger, player) {
					var count = 0;
					for (var i = 1; i <= 5; i++) {
						if (trigger.player.hasDisabledSlot(i)) {
							count++;
						}
					}
					if (count <= 0 || trigger.player.countCards("he") <= 0) {
						return;
					}
					var next = player.discardPlayerCard(trigger.player, "he", [1, count], "弃置" + get.translation(trigger.player) + "的" + get.cnNumber(count) + "张牌");
					next.set("goon", get.attitude(player, trigger.player) <= 0);
					next.setHiddenSkill("qmsgswkjsgj_drlt_zhiti");
					var result = await next.forResult();
					// if (result.bool) {
					// 	game.cardsDiscard(result.cards, "qmsgswkjsgj_drlt_zhiti", player);
					// }
				},
			},

		},
	},

	//星月神刘备
	qmsgswkjsgj_nzry_rende: {
		audio: 'rerende',
		enable: 'phaseUse',
		filter(event, player) {
			return player.countCards('h') > 0 && game.hasPlayer(current => current != player);
		},
		filterTarget(card, player, target) {
			return target != player;
		},
		filterCard: true,
		selectCard: [1, Infinity],
		allowChooseAll: true,
		discard: false,
		lose: false,
		delay: false,
		async content(event, trigger, player) {
			const { target, cards } = event;
			await player.give(cards, target);
			const list = get.inpileVCardList(info => {
				return info[0] == 'basic' && player.hasUseTarget(new lib.element.VCard({ name: info[2], nature: info[3], isCard: true }), null, true);
			});
			if (!list.length) {
				return;
			}
			const result = await player
				.chooseButton(['是否视为使用一张基本牌？', [list, 'vcard']])
				.set('ai', button => {
					return get.player().getUseValue({ name: button.link[2], nature: button.link[3], isCard: true });
				})
				.forResult();
			if (!result?.links?.length) {
				return;
			}
			const vcard = get.autoViewAs({ name: result.links[0][2], nature: result.links[0][3], isCard: true });
			await player.chooseUseTarget({
				card: vcard,
				nodistance: true,
				addCount: false,
				prompt: '仁德：视为使用一张基本牌',
			});
		},
		ai: {
			order: 4,
			result: {
				target(player, target) {
					return Math.max(1, 5 - target.countCards('h'));
				},
			},
			threaten: 0.8,
		},
	},
	qmsgswkjsgj_nzry_longnu: {
		audio: 'nzry_longnu',
		mark: true,
		zhuanhuanji: true,
		marktext: '☯',
		intro: {
			content(storage, player, skill) {
				if (player.storage[skill] == true) {
					return '阴：本回合你的锦囊牌均视为雷【杀】且无距离和次数限制；以此法造成伤害后，可增加等量体力上限并摸等量张牌';
				}
				return '阳：本回合你的红色手牌均视为火【杀】且无距离和次数限制；以此法造成伤害后，可回复等量体力并摸等量张牌';
			},
		},
		enable: 'phaseUse',
		async content(event, trigger, player) {
			player.changeZhuanhuanji(event.name);
			const isYin = player.storage[event.name] == true;
			if (!isYin) {
				await player.loseHp();
			} else {
				await player.loseMaxHp();
			}
			await player.draw(2);
			if (!isYin) {
				player.addTempSkill(event.name + '_1', 'phaseUseAfter');
			} else {
				player.addTempSkill(event.name + '_2', 'phaseUseAfter');
			}
		},
		subSkill: {
			1: {
				mod: {
					cardname(card, player) {
						if (get.color(card) == 'red') {
							return 'sha';
						}
					},
					cardnature(card, player) {
						if (get.color(card) == 'red') {
							return 'fire';
						}
					},
					targetInRange(card) {
						if (get.color(card) == 'red') {
							return true;
						}
					},
				},
				trigger: { global: 'damage' },
				filter(event, player) {
					return event.source == player && event.card && get.color(event.card) == 'red';
				},
				check(event, player) {
					return true;
				},
				prompt2(event, player) {
					return '龙怒：是否回复' + event.num + '点体力并摸' + event.num + '张牌？';
				},
				async content(event, trigger, player) {
					await player.recover(trigger.num);
					await player.draw(trigger.num);
				},
				ai: {
					effect: {
						target(card, player, target, current) {
							if (get.tag(card, 'respondSha') && current < 0) {
								return 0.6;
							}
						},
					},
					respondSha: true,
				},
			},
			2: {
				mod: {
					cardname(card, player) {
						if (['trick', 'delay'].includes(lib.card[card.name].type)) {
							return 'sha';
						}
					},
					cardnature(card, player) {
						if (['trick', 'delay'].includes(lib.card[card.name].type)) {
							return 'thunder';
						}
					},
					targetInRange(card) {
						if (['trick', 'delay'].includes(lib.card[card.name].type)) {
							return true;
						}
					},
					cardUsable(card, player) {
						if (card.name == 'sha' && game.hasNature(card, 'thunder')) {
							return Infinity;
						}
					},
				},
				trigger: { global: 'damage' },
				filter(event, player) {
					return event.source == player && event.card && lib.card[event.card.name] && ['trick', 'delay'].includes(lib.card[event.card.name].type);
				},
				check(event, player) {
					return true;
				},
				prompt2(event, player) {
					return '龙怒：是否增加' + event.num + '点体力上限并摸' + event.num + '张牌？';
				},
				async content(event, trigger, player) {
					await player.gainMaxHp(trigger.num);
					await player.draw(trigger.num);
				},
				ai: {
					effect: {
						target(card, player, target, current) {
							if (get.tag(card, 'respondSha') && current < 0) {
								return 0.6;
							}
						},
					},
					respondSha: true,
				},
			},
		},
		ai: {
			fireAttack: true,
			halfneg: true,
			threaten: 1.05,
		},
	},
	qmsgswkjsgj_nzry_jieying: {
		audio: 'nzry_jieying',
		locked: true,
		mod: {
			maxHandcard(player, num) {
				if (player.hasSkill('qmsgswkjsgj_nzry_jieying')) {
					return num + 4;
				}
			},
		},
		group: ['qmsgswkjsgj_nzry_jieying_1', 'qmsgswkjsgj_nzry_jieying_2'],
		subSkill: {
			1: {
				audio: 'nzry_jieying',
				trigger: {
					player: ['linkBefore', 'enterGame'],
					global: 'phaseBefore',
				},
				forced: true,
				filter(event, player) {
					if (event.name == 'link') {
						return player.isLinked();
					}
					return (event.name != 'phase' || game.phaseNumber == 0) && !player.isLinked();
				},
				async content(event, trigger, player) {
					if (trigger.name != 'link') {
						await player.link(true);
					} else {
						trigger.cancel();
					}
				},
				ai: {
					noLink: true,
				},
			},
			2: {
				audio: 'nzry_jieying',
				trigger: {
					player: ['phaseZhunbeiBegin', 'phaseJieshuBegin'],
				},
				filter(event, player) {
					return game.hasPlayer(function (current) {
						return current != player && !current.isLinked();
					});
				},
				async cost(event, trigger, player) {
					const next = player.chooseTarget('请选择【结营】要横置的其他角色（可多选）');
					next.set('forced', false);
					next.set('selectTarget', [0,Infinity]);
					next.set('filterTarget', (card, player, target) => target != player && !target.isLinked());
					next.set('ai', () => 1 + Math.random());
					event.result = await next.forResult();
				},
				async content(event, trigger, player) {
					const { targets } = event;
					if (!targets || !targets.length) {
						return;
					}
					for (const target of targets) {
						await target.link(true);
					}
				},
			},
		},
		ai: {
			effect: {
				target(card) {
					if (card.name == 'tiesuo') {
						return 'zeroplayertarget';
					}
				},
			},
		},
	},
	//星月神关羽
	qmsgswkjsgj_shen_wusheng: {
		mod: {
			targetInRange(card) {
				if (get.suit(card) == 'diamond' && card.name == 'sha') {
					return true;
				}
			},
		},
		audio: 'wusheng',
		enable: ['chooseToRespond', 'chooseToUse'],
		filterCard(card, player) {
			return true;
		},
		position: 'hes',
		viewAs: { name: 'sha' },
		viewAsFilter(player) {
			return player.countCards('hes') > 0;
		},
		prompt: '将一张牌当杀使用或打出',
		ai: {
			respondSha: true,
		},
	},
	qmsgswkjsgj_wushen: {
		mod: {
			cardname(card, player, name) {
				if (get.suit(card) == 'heart') {
					return 'sha';
				}
			},
			targetInRange(card) {
				if (card.name === 'sha') {
					const suit = get.suit(card);
					if (suit === 'heart' || suit === 'unsure') {
						return true;
					}
				}
			},
			cardUsable(card) {
				if (card.name === 'sha') {
					const suit = get.suit(card);
					if (suit === 'heart' || suit === 'unsure') {
						return Infinity;
					}
				}
			},
		},
		audio: 'wushen',
		locked: true,
		trigger: { player: 'useCard2' },
		forced: true,
		filter(event, player) {
			return event.card.name == "sha" && (get.suit(event.card) == "heart" || !player.hasSkill("qmsgswkjsgj_wushen_phase", null, null, false));
		},
		logTarget(event, player) {
			if (get.suit(event.card) == "heart") {
				var targets = game.filterPlayer(function (current) {
					return !event.targets.includes(current) && current.hasMark("qmsgswkjsgj_wuhun") && lib.filter.targetEnabled(event.card, player, current);
				});
				if (targets.length) {
					return targets.sortBySeat();
				}
			}
			return null;
		},
		async content(event, trigger, player) {
			if (!player.hasSkill("qmsgswkjsgj_wushen_phase", null, null, false)) {
				trigger.directHit.addArray(game.players);
				player.addTempSkill("qmsgswkjsgj_wushen_phase", [
					"phaseZhunbeiAfter",
					"phaseJudgeAfter",
					"phaseDrawAfter",
					"phaseUseAfter",
					"phaseDiscardAfter",
					"phaseJieshuAfter",
				]);
			}
			if (get.suit(trigger.card) == "heart") {
				if (trigger.addCount !== false) {
					trigger.addCount = false;
					if (player.stat[player.stat.length - 1].card.sha > 0) {
						player.stat[player.stat.length - 1].card.sha--;
					}
				}
				const targets = game.filterPlayer(current => {
					return (
						!trigger.targets.includes(current) &&
						current.hasMark("qmsgswkjsgj_wuhun") &&
						(lib.filter.targetEnabled(trigger.card, player, current) ?? false)
					);
				});
				if (targets.length) {
					trigger.targets.addArray(targets.sortBySeat());
					game.log(targets, "也成为了", trigger.card, "的目标");
				}
			}
		},
		ai: {
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				return arg.card.name == 'sha' && !player.hasSkill('qmsgswkjsgj_wushen_phase', null, null, false);
			},
		},
		subSkill: {
			phase: {
				charlotte: true
			},
		},
	},
	qmsgswkjsgj_wuhun: {
		audio: 'wuhun',
		trigger: { player: 'die' },
		forceDie: true,
		skillAnimation: true,
		animationColor: 'soil',
		locked: true,
		check(event, player) {
			return game.hasPlayer(function (current) {
				return current != player && current.hasMark('qmsgswkjsgj_wuhun') && get.attitude(player, current) < 0;
			});
		},
		async content(event, trigger, player) {
			const judge = player.judge(card => {
				const name = get.name(card, false);
				return name === 'tao' || name === 'taoyuan' ? -25 : 15;
			});
			judge.set('forceDie', true);
			judge.set('judge2', result => result.bool);

			const judgeResult = await judge.forResult();
			if (!judgeResult.bool) {
				return;
			}

			const num = game.countPlayer(current => current !== player && current.hasMark('qmsgswkjsgj_wuhun'));
			if (num === 0) {
				return;
			}

			const prompt = '请选择【武魂】的目标';
			const prompt2 = '选择至少一名拥有“梦魇”标记的角色。令这些角色各自失去X点体力（X为其“梦魇”标记数）';
			const next = player.chooseTarget(prompt, prompt2, [1, num], true);
			next.set('filterTarget', (card, _player, target) => target !== player && target.hasMark('qmsgswkjsgj_wuhun'));
			next.set('forceDie', true);
			next.set('ai', target => -get.attitude(get.player(), target));

			const result = await next.forResult();
			if (!result.targets?.length) {
				return;
			}

			const targets = result.targets.sortBySeat();
			player.line(targets);

			for (const target of targets) {
				const mNum = target.countMark('qmsgswkjsgj_wuhun');
				if (mNum > 0) {
					await target.loseHp(mNum);
				}
			}
		},
		marktext: '魇',
		intro: {
			name: '梦魇',
			content: 'mark',
			onunmark: true,
		},
		group: ['qmsgswkjsgj_wuhun_gain', 'qmsgswkjsgj_wuhun_recover', 'qmsgswkjsgj_wuhun_draw'],
		global: ['qmsgswkjsgj_wuhun_mengyan'],
		subSkill: {
			gain: {
				audio: 'wuhun',
				trigger: {
					player: 'damageEnd',
					source: 'damageSource',
				},
				forced: true,
				filter(event, player, name) {
					if (event.player == event.source) {
						return false;
					}
					var target = lib.skill.qmsgswkjsgj_wuhun_gain.logTarget(event, player);
					if (!target || !target.isIn()) {
						return false;
					}
					// 神吕蒙造成伤害（source: damageSource）与受到伤害（player: damageEnd）都要结算
					return name == 'damageEnd' || name == 'damageSource';
				},
				logTarget(event, player) {
					if (player == event.player) {
						return event.source;
					}
					return event.player;
				},
				async content(event, trigger, player) {
					const target = lib.skill.qmsgswkjsgj_wuhun_gain.logTarget(trigger, player);
					target.addMark('qmsgswkjsgj_wuhun', player == trigger.source ? 1 : trigger.num);
					// if (target.countMark('qmsgswkjsgj_wuhun') > 0 && !target.hasSkill('qmsgswkjsgj_wuhun_mengyan', null, null, false)) {
					// 	target.addSkill('qmsgswkjsgj_wuhun_mengyan');
					// }
					await game.delayx();
				},
			},
			// 梦魇附带效果：按标记数令持有者技能失效（1/3在神关羽回合内，5/7任意回合）
			mengyan: {
				init(player, skill) {
					player.addSkillBlocker(skill);
					player.addTip(skill, '梦魇');
				},
				onremove(player, skill) {
					player.removeSkillBlocker(skill);
					player.removeTip(skill);
				},
				charlotte: true,
				locked: true,
				skillBlocker(skill, player) {
					if (skill == 'qmsgswkjsgj_wuhun_mengyan') {
						return false;
					}
					const num = player.countMark('qmsgswkjsgj_wuhun');
					if (num < 1 || !lib.skill[skill]) {
						return false;
					}
					const gy = game.filterPlayer(p => p.hasSkill('qmsgswkjsgj_wuhun'))[0];
					const gyTurn = gy && _status.currentPhase == gy;
					if (gyTurn) {
						if (num >= 3) {
							return true;
						}
						if (num >= 1) {
							return !lib.skill[skill].locked;
						}
					} else {
						if (num >= 7) {
							return true;
						}
						if (num >= 5) {
							return !lib.skill[skill].locked;
						}
					}
					return false;
				},
			},
			// 回复体力时移动一枚“梦魇”标记
			recover: {
				trigger: { player: 'recoverAfter' },
				filter(event, player) {
					return game.hasPlayer(p => p != player && p.countMark('qmsgswkjsgj_wuhun') > 0);
				},
				async content(event, trigger, player) {
					const next = player.chooseTarget('【武魂】选择一名拥有“梦魇”标记的角色，移出其一枚标记（可取消）', null, [1, 1], false);
					next.set('filterTarget', (card, p, target) => target != p && target.countMark('qmsgswkjsgj_wuhun') > 0);
					next.set('ai', () => 1 + Math.random());
					const r1 = await next.forResult();
					if (!r1.targets?.length) {
						return;
					}
					const src = r1.targets[0];
					const next2 = player.chooseTarget('【武魂】选择获得该“梦魇”标记的另一名角色（可取消）', null, [1, 1], false);
					next2.set('filterTarget', (card, p, target) => target != src && target != p);
					next2.set('ai', () => 1 + Math.random());
					const r2 = await next2.forResult();
					if (!r2.targets?.length) {
						return;
					}
					const dst = r2.targets[0];
					src.removeMark('qmsgswkjsgj_wuhun', 1);
					dst.addMark('qmsgswkjsgj_wuhun', 1);
					if (dst.countMark('qmsgswkjsgj_wuhun') > 0 && !dst.hasSkill('qmsgswkjsgj_wuhun_mengyan', null, null, false)) {
						dst.addSkill('qmsgswkjsgj_wuhun_mengyan');
					}
					if (src.countMark('qmsgswkjsgj_wuhun') == 0 && src.hasSkill('qmsgswkjsgj_wuhun_mengyan', null, null, false)) {
						src.removeSkill('qmsgswkjsgj_wuhun_mengyan');
					}
				},
			},
			// 梦魇附带效果：对拥有“梦魇”标记的其他角色造成伤害后，摸等量的牌
			draw: {
				audio: 'wuhun',
				trigger: {
					source: 'damageSource',
				},
				forced: true,
				filter(event, player) {
					// 对其他拥有“梦魇”标记且在场的角色造成伤害
					return event.player != player && event.player.isIn() && event.player.hasMark('qmsgswkjsgj_wuhun');
				},
				async content(event, trigger, player) {
					await player.draw(trigger.num);
				},
			},
		},
	},
	//星月神吕蒙
	qmsgswkjsgj_shen_keji: {
		audio: 'keji',
		audioname: ['shen_lvmeng'],
		trigger: { player: 'phaseDiscardBefore' },
		forced: true,
		// frequent: true,
		locked:false,
		async content(event, trigger, player) {
			trigger.cancel();
		},
	},
	qmsgswkjsgj_shelie: {
		audio: 'shelie',
		trigger: { player: ['phaseZhunbeiBegin', 'phaseJieshuBegin'] },
		// frequent: true,
		filter(event, player) {
			return true;
		},
		async content(event, trigger, player) {
			// 涉准备阶段和结束阶段：亮出牌堆顶的五张牌，获得其中每种花色各一张
			await player.YB_shelie(5,'涉猎',true)
		},
		group: ['qmsgswkjsgj_shelie_extra'],
		subSkill: {
			// 每回合结束时，若此回合内置入弃牌堆的牌包含四种花色，可获得一个额外回合
			extra: {
				audio: 'shelie',
				trigger: { global: 'phaseAfter' },
				check(event, player) {
					return true;
				},
				filter(event, player) {
					const suits = new Set();
					for (const card of get.discarded()) {
						const s = get.suit(card);
						if (s) suits.add(s);
					}
					return suits.size >= 4;
				},
				prompt(event, player) {
					return '涉猎：' + get.translation(event.player) + '的回合内弃牌堆含四种花色，是否获得一个额外回合？';
				},
				async content(event, trigger, player) {
					player.insertPhase();
				},
			},
		},
	},
	qmsgswkjsgj_gongxin: {
		audio: 'gongxin',
		trigger: { global: 'phaseUseBegin' },
		frequent: true,
		async cost(event, trigger, player) {
			const current = trigger.player || _status.currentPhase;
			if (current == player) {
				// 自己回合：先选择一名其他角色为目标，即默认发动，不再二次确认
				const next = player.chooseTarget('攻心：观看一名其他角色的手牌', [1, 1], true);
				next.set('filterTarget', (card, p, t) => t != player && t.countCards('h') > 0);
				next.set('ai', () => 1 + Math.random());
				event.result = await next.forResult();
			} else {
				// 他人回合：目标即该角色，需确认是否观看其手牌
				const target = current;
				if (target.countCards('h') == 0) return;
				const nb = player.chooseBool('攻心：是否观看' + get.translation(target) + '的手牌并进行操作？');
				nb.set('ai', () => true);
				event.result = await nb.forResult();
			}
		},
		async content(event, trigger, player) {
			// 数据由 cost 经 event.result 传出，引擎脱壳后落到 event：target → event.target，bool → event.bool
			const target = event.target || (event.targets && event.targets[0]) || _status.currentPhase;
			// 第一步：选取其手牌中的一种花色（同时展示其手牌供查看）
			const handCards = target.getCards('h');
			const suitList = lib.suit.filter(s => target.countCards('h', { suit: s }) > 0);
			if (!suitList.length) return;
			const chooseSuit = player.chooseButton(
				['攻心：选择' + get.translation(target) + '手牌中的一种花色',
					[handCards, 'card'],
					[suitList.map(s => [s, get.translation(s)]), 'tdnodes']],
				1
			);
			// 手牌仅作展示不可选，只有花色按钮可选
			chooseSuit.set('filterButton', button => lib.suit.includes(button.link));
			chooseSuit.set('ai', (button) => {
				const s = button.link;
				return target.getCards('h', { suit: s }).reduce((sum, c) => sum + get.value(c, player), 0);
			});
			const suitResult = await chooseSuit.forResult();
			if (!suitResult.bool) return;
			const suit = suitResult.links[0];
			if (!suit) return;
			// 第二步：分配该花色所有牌的去向（获得 / 弃置 / 置于牌堆顶）
			const cards = target.getCards('h', { suit });
			if (!cards.length) return;
			const result = await player.chooseToMove_new('攻心·' + get.translation(suit) + '牌')
				.set('list', [
					[get.translation(target) + '的' + get.translation(suit) + '牌', cards],
					[['获得'], ['弃置'], ['置于牌堆顶']],
				])
				.set('filterOk', moved => moved[1].length + moved[2].length + moved[3].length >= 1)
				.set('processAI', function (list) {
					const hand = list[0][1].slice();
					if (!hand.length) return false;
					// AI：价值最高的牌归自己，其余弃置
					const sorted = hand.slice().sort((a, b) => get.value(b) - get.value(a));
					return [[], [sorted[0]], sorted.slice(1), []];
				})
				.forResult();
			if (result.bool) {
				if (result.moved[1].length) {
					await player.gain(result.moved[1], 'gain2');
				}
				if (result.moved[2].length) {
					await target.modedDiscard(result.moved[2]);
				}
				if (result.moved[3].length) {
					await player.showCards(result.moved[3], get.translation(player) + '对' + get.translation(target) + '发动了【攻心】');
					await target.lose(result.moved[3], ui.cardPile, 'visible', 'insert');
				}
				const shown = result.moved[1][0] || result.moved[2][0] || result.moved[3][0];
				if (shown) {
					const color = get.color(shown);
					if (color != 'unsure') {
						player.line(target);
						target.addTempSkill('qmsgswkjsgj_gongxin_color', 'phaseAfter');
						target.storage.qmsgswkjsgj_gongxin_color = [color];
						target.markSkill('qmsgswkjsgj_gongxin_color');
					}
				}
			}
		},
		subSkill: {
			color: {
				charlotte: true,
				onremove: true,
				intro: { content: '本回合内不能使用或打出$牌' },
				mod: {
					cardEnabled2(card, player) {
						const color = get.color(card);
						const list = player.getStorage('qmsgswkjsgj_gongxin_color');
						if (color != 'unsure' && list && list.includes(color)) {
							return false;
						}
					},
				},
			},
		},
	},

	//星月界势国渊
	qmsgswkjsgj_re_mbqingdao: {
		audio: 'mbqingdao',
		trigger: { global: 'useCardAfter' },
		filter(event, player) {
			return event.player != player && event.targets?.includes(player);
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseBool(get.prompt(event.skill))
				.set('ai', () => true)
				.forResult();
		},
		async content(event, trigger, player) {
			const damaged = player.hasHistory('damage', evt => evt.card && evt.getParent(2) == trigger);
			if (damaged) {
				const shan = get.cardPile(card => card.name == 'shan');
				if (shan) {
					await player.gain(shan, 'gain2');
				} else {
					player.chat('孩子们，一张闪都没有力');
				}
				const targets = game.filterPlayer(target => target.countDiscardableCards(player, 'hej'));
				if (targets.length) {
					const result = await player.chooseTarget('清蹈：弃置一名角色区域内的一张牌', targets).forResult();
					if (result.bool && result.targets.length) {
						await player.discardPlayerCard(result.targets[0], 'hej', true);
					}
				}
			} else {
				const sha = get.cardPile(card => card.name == 'sha');
				if (sha) {
					await player.gain(sha, 'gain2');
				} else {
					player.chat('孩子们，一张杀都没有力');
				}
				if (player.hasCard(card => player.hasUseTarget(card, false, false), 'hs')) {
					await player.chooseToUse({
						filterCard(card) {
							if (get.itemtype(card) != 'card' || !['h', 's'].includes(get.position(card))) {
								return false;
							}
							return lib.filter.filterCard.apply(this, arguments);
						},
						filterTarget(card, player, target) {
							return lib.filter.targetEnabled.apply(this, arguments);
						},
						prompt: '清蹈：使用一张手牌（无距离限制）',
						addCount: false,
						forced: true,
					});
				}
			}
		},
	},
	qmsgswkjsgj_re_mbxiugeng: {
		audio: 'mbxiugeng',
		trigger: { player: 'phaseZhunbeiBegin' },
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill), [1, player.maxHp])
				.set('ai', target => get.attitude(get.player(), target))
				.forResult();
		},
		async content(event, trigger, player) {
			player.line(event.targets);
			for (const target of event.targets.sortBySeat()) {
				target.removeSkill('qmsgswkjsgj_re_mbxiugeng_effect');
				target.setStorage('qmsgswkjsgj_re_mbxiugeng_effect', target.countCards('h'));
				target.addSkill('qmsgswkjsgj_re_mbxiugeng_effect');
			}
		},
		subSkill: {
			effect: {
				charlotte: true,
				forced: true,
				popup: false,
				init(player, skill) {
					const storage = player.storage[skill];
					if (storage >= 0) {
						player.addTip(skill, `${get.translation(skill)} ${storage}`);
					}
				},
				onremove(player, skill) {
					delete player.storage[skill];
					player.removeTip(skill);
				},
				mark: true,
				intro: {
					content: '当前记录值为：#',
				},
				trigger: { player: 'phaseDrawBegin' },
				content() {
					const record = player.storage[event.name];
					if (typeof record == 'number') {
						player.logSkill('qmsgswkjsgj_re_mbxiugeng', null, null, null, [player.countCards('h') >= record ? 4 : 3]);
						if (player.countCards('h') <= record) {
							player.draw(2);
						}
						if (player.countCards('h') >= record) {
							player.addSkill('qmsgswkjsgj_re_mbxiugeng_handcard');
							player.addMark('qmsgswkjsgj_re_mbxiugeng_handcard', 1, false);
						}
					}
					player.removeSkill(event.name);
				},
			},
			handcard: {
				markimage: 'image/card/handcard.png',
				charlotte: true,
				onremove: true,
				intro: {
					content: '手牌上限+#',
				},
				mark: true,
				mod: {
					maxHandcard(player, num) {
						return num + player.countMark('qmsgswkjsgj_re_mbxiugeng_handcard');
					},
				},
			},
		},
	},
	qmsgswkjsgj_re_mbchenshe: {
		audio: 'mbchenshe',
		trigger: { global: 'dying' },
		filter(event, player) {
			return event.player != player && lib.skill.qmsgswkjsgj_re_mbchenshe.logTarget(event, player).length;
		},
		logTarget(event, player) {
			return [event.player, event.source].filter(target => target?.isIn() && target?.countDiscardableCards(player, 'he'));
		},
		check(event, player) {
			const targets = lib.skill.qmsgswkjsgj_re_mbchenshe.logTarget(event, player);
			return (
				targets.reduce((sum, target) => {
					return sum + get.effect(target, { name: 'guohe_copy2' }, player, player);
				}, 0) > 0
			);
		},
		async content(event, trigger, player) {
			const targets = lib.skill.qmsgswkjsgj_re_mbchenshe.logTarget(trigger, player),
				cards = [];
			for (const target of targets) {
				if (!target.countDiscardableCards(player, 'he')) {
					continue;
				}
				const result = await player.discardPlayerCard(`陈赦：请弃置${get.translation(target)}一张牌`, target, 'he', true).forResult();
				if (result?.cards) {
					cards.addArray(result.cards);
				}
			}
			if (cards.length >= 2 && cards.map(card => get.color(card, false)).unique().length == 1) {
				player.logSkill('qmsgswkjsgj_re_mbchenshe', trigger.player, null, null, [3]);
				await trigger.player.recoverTo(trigger.player.maxHp);
			}
		},
	},
	//星月界势辛宪英
	qmsgswkjsgj_re_potjiejie: {
		global: 'qmsgswkjsgj_re_potjiejie_global',
		audio: 'potjiejie',
		subSkill: {
			global: {
				audio: 'qmsgswkjsgj_re_potjiejie',
				enable: 'phaseUse',
				filter(event, player) {
					if (player != _status.currentPhase) {
						return false;
					}
					if (!player.countCards('h') || player.hasSkill('qmsgswkjsgj_re_potjiejie_used')) {
						return false;
					}
					return game.hasPlayer(current => current.hasSkill('qmsgswkjsgj_re_potjiejie'));
				},
				filterTarget(card, player, target) {
					return target.hasSkill('qmsgswkjsgj_re_potjiejie');
				},
				selectTarget() {
					if (game.countPlayer(current => current.hasSkill('qmsgswkjsgj_re_potjiejie')) > 1) {
						return 1;
					}
					return -1;
				},
				prompt() {
					const player = get.player(),
						targets = game.filterPlayer(current => current.hasSkill('qmsgswkjsgj_re_potjiejie'));
					let list = get.translation(targets);
					if (targets.length > 1) {
						list += '中的一人';
					}
					if (targets.length == 1 && targets[0] == player) {
						return '观看自己手牌并选择花色执行对应效果';
					}
					return `令${list}观看你的手牌并选择花色执行效果`;
				},
				prepare(cards, player, targets) {
					targets[0].logSkill('qmsgswkjsgj_re_potjiejie', [player]);
				},
				log: false,
				manualConfirm: true,
				async content(event, trigger, player) {
					const xinxianying = event.target;
					const subject = player;
					await lib.skill.qmsgswkjsgj_re_potjiejie.jiejieEffect(xinxianying, subject);
				},
			},
			used: {
				charlotte: true,
			},
			effect: {
				charlotte: true,
				onremove(player, skill) {
					delete player.storage[skill];
					player.removeTip(skill);
				},
				mark: true,
				intro: {
					content: storage => `本回合使用${get.translation(storage)}牌无次数限制`,
				},
				mod: {
					cardUsable(card, player) {
						const list = player.getStorage('qmsgswkjsgj_re_potjiejie_effect');
						const suit = get.suit(card);
						if (suit === 'unsure' || list.includes(suit)) {
							return Infinity;
						}
					},
				},
			},
			roundstart: {
				trigger: { global: 'roundStart' },
				audio:'qmsgswkjsgj_re_potjiejie',
				filter(event, player) {
					return game.hasPlayer(current => current.hasSkill('qmsgswkjsgj_re_potjiejie'));
				},
				async cost(event, trigger, player) {
					const xinxianying = game.filterPlayer(current => current.hasSkill('qmsgswkjsgj_re_potjiejie'))[0];
					event.result = await xinxianying
						.chooseTarget('诫节：选择一名角色，其出牌阶段开始时你对其发动诫节')
						.set('ai', target => get.attitude(xinxianying, target))
						.forResult();
				},
				async content(event, trigger, player) {
					const xinxianying = game.filterPlayer(current => current.hasSkill('qmsgswkjsgj_re_potjiejie'))[0];
					xinxianying.line(event.targets);
					for (const target of event.targets) {
						target.removeSkill('qmsgswkjsgj_re_potjiejie_phaseuse');
						target.setStorage('qmsgswkjsgj_re_potjiejie_phaseuse', xinxianying.playerid);
						target.addSkill('qmsgswkjsgj_re_potjiejie_phaseuse');
					}
				},
			},
			phaseuse: {
				charlotte: true,
				audio:'qmsgswkjsgj_re_potjiejie',
				trigger: { player: 'phaseUseBegin' },
				forced: true,
				async content(event, trigger, player) {
					const ownerId = player.getStorage('qmsgswkjsgj_re_potjiejie_phaseuse');
					const owner = game.findPlayer(target => target.playerid === ownerId);
					player.removeSkill(event.name);
					if (!owner || !owner.hasSkill('qmsgswkjsgj_re_potjiejie')) {
						return;
					}
					await lib.skill.qmsgswkjsgj_re_potjiejie.jiejieEffect(owner, player);
				},
			},
		},
		async jiejieEffect(xinxianying, subject) {
			subject.addTempSkill('qmsgswkjsgj_re_potjiejie_used', 'phaseUseAfter');
			game.addCardKnower(subject.getCards('h'), xinxianying);
			subject.getHistory('custom').push({
				qmsgswkjsgj_re_potjiejie: true,
				suits: subject.getCards('h').map(card => get.suit(card, subject)).toUniqued(),
				target: xinxianying,
			});
			const list = get.addNewRowList(subject.getCards('h'), 'suit', subject);
			const result = await xinxianying
				.chooseButton([
					[
						[[`诫节：请选择一个花色<div class="text center">若${get.translation(subject)}手牌包含此花色，其本回合使用此花色的牌无次数限制，然后弃置其余花色的手牌，否则其获得此花色的一张牌</div>`], 'addNewRow'],
						[
							dialog => {
								dialog.classList.add('fullheight');
								dialog.forcebutton = false;
								dialog._scrollset = false;
							},
							'handle',
						],
						list.map(item => [Array.isArray(item) ? item : [item], 'addNewRow']),
					],
				])
				.set('ai', button => {
					const att = get.attitude(xinxianying, subject);
					const { links } = button;
					if (links.length) {
						return att > 0 ? 1.5 : 1;
					}
					return att > 0 ? 0.5 : 0;
				})
				.set('target', subject)
				.forResult();
			if (result?.links?.length) {
				const [choice] = result.links;
				game.log(xinxianying, '选择了' + get.translation(choice));
				xinxianying.popup(choice);
				if (subject.hasCard(card => get.suit(card, subject) == choice, 'h')) {
					const skill = 'qmsgswkjsgj_re_potjiejie_effect';
					subject.markAuto(skill, [choice]);
					subject.addTip(
						skill,
						`诫节${subject
							.getStorage(skill)
							.sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a))
							.map(suit => get.translation(suit))
							.join('')}`
					);
					subject.addTempSkill(skill);
					await subject.modedDiscard(subject.getCards('h', card => get.suit(card, subject) != choice));
				} else {
					const card = get.cardPile2(card => get.suit(card) == choice);
					if (card) {
						await subject.gain(card, 'gain2');
					}
				}
			}
			await xinxianying.useSkill('qmsgswkjsgj_re_potqingshi', [subject]);
		},
	},
	qmsgswkjsgj_re_potqingshi: {
		audio: 'qmsgswkjsgj_re_potqingshi',
		trigger: { player: 'damageEnd' },
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill))
				.set('ai', target => {
					const player = get.player();
					if (player.getFriends(true).includes(target)) {
						return get.effect(player, { name: 'draw' }, player, player) + get.effect(target, { name: 'draw' }, player, player) > 0;
					}
					return get.effect(target, { name: 'guohe_copy2' }, target, player) + get.effect(player, { name: 'guohe_copy2' }, player, player) > 0;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			if (player.getFriends(true).includes(target)) {
				await player.draw(2);
				await target.draw(2);
			} else {
				await player.discardPlayerCard(target, 'he', 3, true);
			}
		},
	},
	//星月界势董昭
	qmsgswkjsgj_re_mbmiaolue: {
		audio: 'twmiaolve',
		trigger: {
			global: 'roundStart',
			player: 'damageEnd',
		},
		filter(event, player) {
			if (event.name == 'damage') {
				return event.num > 0;
			}
			return game.hasPlayer(current => current.hasSkill('qmsgswkjsgj_re_mbmiaolue'));
		},
		async content(event, trigger, player) {
			const owner = game.filterPlayer(current => current.hasSkill('qmsgswkjsgj_re_mbmiaolue'))[0] || player;
			if (event.name == 'damage') {
				await owner.draw(2);
				const zhinang = get.cardPile2(card => get.zhinangs().includes(card.name));
				if (zhinang) {
					await owner.gain(zhinang, 'gain2');
				}
			} else {
				if (!lib.inpile.includes('dz_mantianguohai')) {
					lib.inpile.add('dz_mantianguohai');
				}
				if (!_status.dz_mantianguohai_suits) {
					_status.dz_mantianguohai_suits = lib.suit.slice(0);
				}
				const list = _status.dz_mantianguohai_suits.randomRemove(2).map(i => game.createCard2('dz_mantianguohai', i, 5));
				if (list.length) {
					await owner.gain(list, 'gain2', 'log');
				}
			}
		},
	},
	qmsgswkjsgj_re_mbyingjia: {
		audio: 'twyingjia',
		trigger: { global: 'phaseEnd' },
		filter(event, player) {
			let bool = false;
			const history = player.getHistory('useCard'),
				map = {};
			for (const evt of history) {
				if (get.type2(evt.card) == 'trick') {
					if (!map[evt.card.name]) {
						map[evt.card.name] = true;
					} else {
						bool = true;
						break;
					}
				}
			}
			return bool;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt(event.skill))
				.set('ai', target => {
					if (target.hasJudge('lebu')) {
						return -1;
					}
					if (get.attitude(player, target) > 4) {
						return get.threaten(target) / Math.sqrt(target.hp + 1) / Math.sqrt(target.countCards('h') + 1);
					}
					return -1;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			target.insertPhase(event.name);
			target.addSkill(event.name + '_draw');
		},
		subSkill: {
			draw: {
				charlotte: true,
				trigger: { player: 'phaseBegin' },
				filter(event, player) {
					return event.skill == 'qmsgswkjsgj_re_mbyingjia';
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					player.removeSkill(event.name);
					await player.draw(2);
				},
			},
		},
	},
	//星月界司马徽
	qmsgswkjsgj_re_jianjie: {
		group: ["qmsgswkjsgj_re_jianjie_use", "qmsgswkjsgj_re_jianjie_die"],
		derivation: ["jianjie_huoji", "jianjie_lianhuan", "jianjie_yeyan"],
		audio: "xinfu_jianjie",

		trigger: {
			global: "phaseBefore",
			player: ["enterGame"],
		},
		forced: true,
		locked: false,
		filter(event, player) {
			return (event.name != "phase" || game.phaseNumber == 0) && game.hasPlayer(current => current != player);
		},
		logAudio: () => ["xinfu_jianjie1.mp3", "xinfu_jianjie2.mp3"],
		content() {
			"step 0";
			player.chooseTarget("荐杰：选择一名其他角色获得“龙印”", lib.filter.notMe, true).set("ai", target => {
				return get.attitude(get.player(), target);
			});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, "fire");
				lib.skill.jianjie.addMark("huoji", player, target);
				event.target = target;
				game.delayx();
			} else {
				event.finish();
			}
			"step 2";
			if (
				game.hasPlayer(current => {
					return current != player && current != target;
				})
			) {
				player
					.chooseTarget(
						"荐杰：选择一名其他角色获得“凤印”",
						function (card, player, target) {
							return target != player && target != _status.event.getParent().target;
						},
						true
					)
					.set("ai", target => {
						return get.attitude(get.player(), target);
					});
			} else {
				event.finish();
			}
			"step 3";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, "thunder");
				lib.skill.jianjie.addMark("lianhuan", player, target);
				game.delayx();
			}
		},
		ai: {
			threaten: 3,
		},
		subSkill: {
			use: {
				audio: ["xinfu_jianjie1.mp3", "xinfu_jianjie2.mp3"],
				enable: "phaseUse",
				usable: 1,
				filter(event, player) {
					const skill = lib.skill.jianjie;
					return game.hasPlayer(function (current) {
						return skill.hasMark("huoji", player, current) || skill.hasMark("lianhuan", player, current);
					});
				},
				filterTarget(card, player, target) {
					if (ui.selected.targets.length == 0) {
						const skill = lib.skill.jianjie;
						return skill.hasMark("huoji", player, target) || skill.hasMark("lianhuan", player, target);
					}
					return true;
				},
				selectTarget: 2,
				complexSelect: true,
				complexTarget: true,
				multitarget: true,
				prompt: "移动场上的“龙印”或“凤印”",
				targetprompt: ["失去印", "获得印"],
				content() {
					"step 0";
					var skill = lib.skill.jianjie;
					var bool1 = skill.hasMark("huoji", player, targets[0]),
						bool2 = skill.hasMark("lianhuan", player, targets[0]);
					if (bool1 && bool2) {
						player.chooseControl("龙印", "凤印").set("prompt", "选择要移动的“印”");
					} else {
						event._result = { control: bool1 ? "龙印" : "凤印" };
					}
					"step 1";
					var skill = lib.skill.jianjie,
						mark = result.control == "龙印" ? "huoji" : "lianhuan";
					skill.removeMark(mark, player, targets[0]);
					skill.addMark(mark, player, targets[1]);
					if (skill.hasMark("huoji", player, targets[1]) && skill.hasMark("lianhuan", player, targets[1])) {
						game.broadcastAll(function () {
							if (lib.config.background_speak) {
								game.playAudio("skill", "xinfu_jianjie3");
							}
						});
					}
					game.delayx();
				},
				ai: {
					order: 8,
					result: {
						target(player, target) {
							if (ui.selected.targets.length == 0) {
								return get.attitude(player, target) < 0 ? -999 : -3;
							} else {
								return target.countCards("h") + 1;
							}
						},
					},
					expose: 0.4,
				},
			},
			die: {
				audio: "xinfu_jianjie",
				trigger: { global: "die" },
				filter(event, player) {
					const skill = lib.skill.jianjie;
					return skill.hasMark("huoji", player, event.player) || skill.hasMark("lianhuan", player, event.player);
				},
				forced: true,
				logTarget: "player",
				logAudio: () => ["xinfu_jianjie1.mp3", "xinfu_jianjie2.mp3"],
				content() {
					"step 0";
					if (lib.skill.jianjie.hasMark("huoji", player, trigger.player)) {
						player.chooseTarget("荐杰：选择一名角色获得“龙印”", true).set("ai", target => {
							return get.attitude(get.player(), target);
						});
					} else {
						event.goto(2);
					}
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						player.line(target, "fire");
						lib.skill.jianjie.addMark("huoji", player, target);
						if (lib.skill.jianjie.hasMark("huoji", player, target) && lib.skill.jianjie.hasMark("lianhuan", player, target)) {
							game.broadcastAll(function () {
								if (lib.config.background_speak) {
									game.playAudio("skill", "xinfu_jianjie3");
								}
							});
						}
						game.delayx();
					} else {
						event.finish();
					}
					"step 2";
					if (lib.skill.jianjie.hasMark("lianhuan", player, trigger.player)) {
						player.chooseTarget("荐杰：选择一名角色获得“凤印”", true).set("ai", target => {
							return get.attitude(get.player(), target);
						});
					} else {
						event.finish();
					}
					"step 3";
					if (result.bool) {
						var target = result.targets[0];
						player.line(target, "thunder");
						lib.skill.jianjie.addMark("lianhuan", player, target);
						if (lib.skill.jianjie.hasMark("huoji", player, target) && lib.skill.jianjie.hasMark("lianhuan", player, target)) {
							game.broadcastAll(function () {
								if (lib.config.background_speak) {
									game.playAudio("skill", "xinfu_jianjie3");
								}
							});
						}
						game.delayx();
					}
				},
			},
		},
	},
	//星月神周瑜补强
	qmsgswkjsgj_qinyinplus: {
		audio: 'qinyin',
		trigger: { player: ['phaseZhunbeiBegin', 'phaseEnd'] },
		filter(event, player) {
			return true;
		},
		content() {
			'step 0';
			player.chooseTarget([0, Infinity], '琴音：选择任意名角色各回复1点体力').set('ai', function (target) {
				return get.recoverEffect(target, player, player);
			});
			('step 1');
			var recovered = result.bool ? result.targets : [];
			recovered.sortBySeat(player);
			recovered.forEach(function (t) {
				t.recover();
			});
			event.recovered = recovered;
			('step 2');
			var recoveredx = event.recovered;
			player
				.chooseTarget([0, Infinity], '琴音：选择其他角色各失去1点体力或对其造成1点伤害', function (card, player, target) {
					return !recoveredx.includes(target);
				})
				.set('ai', function (target) {
					return get.attitude(player, target) < 0 ? 1 : -1;
				});
			('step 3');
			if (!result.bool || !result.targets.length) {
				event.finish();
			} else {
				event.targetsx = result.targets;
				event.targetsx.sortBySeat(player);
				player
					.chooseControl('qmsgswkjsgj_qinyinplus_hp', 'qmsgswkjsgj_qinyinplus_damage')
					.set('prompt', '令选中的角色失去1点体力或对其造成1点伤害')
					.set('ai', function () {
						return 'qmsgswkjsgj_qinyinplus_hp';
					});
			}
			('step 4');
			if (result.control == 'qmsgswkjsgj_qinyinplus_damage') {
				event.targetsx.forEach(function (t) {
					t.damage('fire', 1, 'nocard');
				});
			} else {
				event.targetsx.forEach(function (t) {
					t.loseHp();
				});
			}
		},
	},
	qmsgswkjsgj_yeyanplus: {
		audio: 'yeyan',
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			return game.hasPlayer(target => target != player);
		},
		filterTarget(card, player, target) {
			return target != player;
		},
		selectTarget: [1, 3],
		multitarget: true,
		line: 'fire',
		skillAnimation: 'legend',
		async content(event, trigger, player) {
			const { targets } = event;
			targets.sortBySeat();

			if (targets.length == 3) {
				for (const target of targets) {
					await target.damage('fire', 1, 'nocard');
				}
				return;
			}

			var points = ['1点'];
			if (targets.length < 3) points.push('2点');
			if (targets.length < 2) points.push('3点');
			const chooseResult = await player
				.chooseControl(...points)
				.set('prompt', '请选择火焰伤害点数')
				.set('ai', () => points[points.length - 1])
				.set('forceDie', true)
				.forResult();

			const num = chooseResult.control === '1点' ? 1 : chooseResult.control === '2点' ? 2 : 3;

			if (targets.length === 1) {
				await targets[0].damage('fire', num, 'nocard');
				return;
			}

			const result = await player
				.chooseTarget('请选择受到' + num + '点火焰伤害的角色', true, (card, player, target) => {
					return event.targets.includes(target);
				})
				.set('ai', () => 1)
				.set('forceDie', true)
				.set('targets', targets)
				.forResult();

			const concentrated = result.targets[0];
			for (const target of targets) {
				const dnum = target === concentrated ? num : 1;
				await target.damage('fire', dnum, 'nocard');
			}
		},
		ai: {
			order: 10,
			result: {
				target(player, target) {
					return get.damageEffect(target, player, player, 'fire');
				},
			},
			threaten: 2,
		},
	},
	qmsgswkjsgj_reyingziplus: {
		audio: 'reyingzi',
		trigger: { player: 'phaseDrawBegin2' },
		forced: true,
		preHidden: true,
		filter(event, player) {
			return !event.numFixed;
		},
		content() {
			trigger.num += player.maxHp;
		},
		ai: {
			threaten: 1.5,
		},
		mod: {
			maxHandcardBase(player, num) {
				return player.maxHp;
			},
		},
	},
	qmsgswkjsgj_refanjianplus: {
		audio: 'refanjian',
		enable: 'phaseUse',
		filter(event, player) {
			return game.hasPlayer(target => target != player && !(player.storage.qmsgswkjsgj_refanjianplus_used && player.storage.qmsgswkjsgj_refanjianplus_used.includes(target)) && player.countCards('h') > 0);
		},
		filterTarget(card, player, target) {
			return player != target && !(player.storage.qmsgswkjsgj_refanjianplus_used && player.storage.qmsgswkjsgj_refanjianplus_used.includes(target));
		},
		filterCard: true,
		check(card) {
			return 8 - get.value(card);
		},
		discard: false,
		lose: false,
		delay: false,
		content() {
			'step 0';
			target.storage.qmsgswkjsgj_refanjianplus = cards[0];
			player.give(cards[0], target);
			('step 1');
			target.showHandcards();
			var suit = get.suit(target.storage.qmsgswkjsgj_refanjianplus);
			target.discard(
				target.getCards('he', function (i) {
					return get.suit(i) == suit && lib.filter.cardDiscardable(i, target, 'qmsgswkjsgj_refanjianplus');
				}),
			);
			('step 2');
			player
				.chooseControl('qmsgswkjsgj_refanjianplus_hp', 'qmsgswkjsgj_refanjianplus_damage')
				.set('prompt', '令' + get.translation(target) + '失去1点体力或对其造成1点伤害')
				.set('ai', function () {
					return 'qmsgswkjsgj_refanjianplus_hp';
				});
			('step 3');
			if (result.control == 'qmsgswkjsgj_refanjianplus_damage') {
				target.damage('fire', 1, 'nocard');
			} else {
				target.loseHp();
			}
			delete target.storage.qmsgswkjsgj_refanjianplus;
			player.YB_tempz('qmsgswkjsgj_refanjianplus_used', target);
		},
		ai: {
			order: 9,
			result: {
				target(player, target) {
					return -target.countCards('he') - (player.countCards('h', 'du') ? 1 : 0);
				},
			},
			threaten: 2,
		},
	},
	//星月界缘孙权
	qmsgswkjsgj_mbshizhong: {
		audio: 'mbshizhong',
		logAudio: () => 2,
		trigger: { player: ['phaseJieshuBegin', 'phaseZhunbeiBegin'] },
		filter(event, player) {
			return event.name === 'phaseJieshu' || player.hasCard(card => card.hasGaintag('qmsgswkjsgj_mbshizhong'), 'h');
		},
		forced: true,
		async content(event, trigger, player) {
			if (trigger.name === 'phaseJieshu') {
				await player.draw();
				const hs = player.getCards('h');
				if (hs.length > 0) {
					player.addGaintag(hs, event.name);
					player.storage[event.name] = hs.length;
					player.markSkill(event.name);
					player.addTip(event.name, `${get.translation(event.name)} ${hs.length}张`);
					await player.showCards(hs, `${get.translation(player)}发动了【${get.translation(event.name)}】`);
				}
			} else {
				const num = player.countCards('h', card => card.hasGaintag(event.name));
				await player.draw(num);
				const last = player.storage[event.name];
				const goon = last === undefined || (typeof last === 'number' && num < last);
				player.unmarkSkill(event.name);
				if (goon) {
					player.addTempSkill('qmsgswkjsgj_mbshizhong_oht');
				}
				player.storage['qmsgswkjsgj_mbshizhong_x'] = num;
			}
		},
		intro: {
			content: '上一次因此展示了#张牌',
			onunmark(storage, player, skill) {
				lib.skill[skill].onremove(player, skill);
			},
		},
		onremove(player, skill) {
			player.removeTip(skill);
			delete player.storage[skill];
		},
		subSkill: {
			oht: {
				charlotte: true,
				mark: true,
				intro: { content: '十万！十万！十万！' },
				audio: 'qmsgswkjsgj_mbshizhong3.mp3',
				trigger: { source: 'damageBegin1' },
				forced: true,
				async content(event, trigger, player) {
					trigger.num = 114514;
				},
			},
		},
	},
	qmsgswkjsgj_mbcaowei: {
		audio: 'mbcaowei',
		trigger: { player: 'damageEnd' },
		filter(event, player) {
			const types = player
				.getCards('he')
				.map(i => get.type2(i))
				.unique();
			return types.some(type => {
				const cards = player.getCards('he', card => get.type2(card) === type);
				return cards.every(card => player.canRecast(card));
			});
		},
		forced: true,
		async content(event, trigger, player) {
			let types = player
				.getCards('he')
				.map(i => get.type2(i))
				.unique();
			types = types.filter(type => {
				const cards = player.getCards('he', card => get.type2(card) === type);
				return cards.every(card => player.canRecast(card));
			});
			const result =
				types.length > 1
					? await player
							.chooseButton([`###${get.translation(event.name)}###<div class="text center">选择重铸至少一个类别的所有牌</div>`, [types.map(type => [type, `${get.translation(type)}牌`]), 'tdnodes']], [1, types.length], true)
							.set('ai', button => {
								const player = get.player();
								return player.getCards('he', card => get.type2(card) === button.link).reduce((sum, card) => sum + lib.skill.zhiheng.check(card), 0);
							})
							.forResult()
					: { bool: true, links: types };
			if (result?.bool && result.links?.length) {
				await player.recast(player.getCards('he', card => result.links.includes(get.type2(card))));
				await player.draw(player.storage['qmsgswkjsgj_mbshizhong_x'] || 1);
			}
		},
	},
	//星月界合郭照
	qmsgswkjsgj_re_jsrgpianchong: {
		audio: 'pianchong',
		trigger: { global: 'phaseJieshuBegin' },
		filter(event, player) {
			return player.getHistory('lose').length;
		},
		frequent: true,
		async content(event, trigger, player) {
			const result = await player.judge().forResult();
			let num = 0;
			game.getGlobalHistory('cardMove', evt => {
				if (evt.name != 'cardsDiscard') {
					if (evt.name != 'lose' || evt.position != ui.discardPile) {
						return false;
					}
				}
				num += evt.cards.filter(i => get.color(i, false) == result.color).length;
			});
			if (num > 0) {
				player.draw(num);
			}
		},
	},
	qmsgswkjsgj_re_jsrgzunwei: {
		audio: 'zunwei',
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			const storage = player.getStorage('qmsgswkjsgj_re_jsrgzunwei');
			return (
				storage.length < 3 &&
				game.hasPlayer(current => {
					return (player.isDamaged() && current.getHp() > player.getHp() && !storage.includes(2)) || (current.countCards('h') > player.countCards('h') && !storage.includes(0)) || (current.countCards('e') > player.countCards('e') && !storage.includes(1));
				})
			);
		},
		chooseButton: {
			dialog(event, player) {
				const list = ['选择手牌数大于你的一名角色', '选择装备数大于你的一名角色', '选择体力值大于你的一名角色'];
				const choiceList = ui.create.dialog('尊位：请选择一项', 'forcebutton', 'hidden');
				choiceList.add([
					list.map((item, i) => {
						if (player.getStorage('qmsgswkjsgj_re_jsrgzunwei').includes(i)) {
							item = `<span style="text-decoration: line-through;">${item}</span>`;
						}
						return [i, item];
					}),
					'textbutton',
				]);
				return choiceList;
			},
			filter(button) {
				const player = get.player();
				if (player.getStorage('qmsgswkjsgj_re_jsrgzunwei').includes(button.link)) {
					return false;
				}
				if (button.link == 2) {
					if (!player.isDamaged()) {
						return false;
					}
					return game.hasPlayer(current => {
						return current.getHp() > player.getHp();
					});
				}
				if (button.link == 0) {
					return game.hasPlayer(current => {
						return current.countCards('h') > player.countCards('h');
					});
				}
				if (button.link == 1) {
					return game.hasPlayer(current => {
						return current.countCards('e') > player.countCards('e');
					});
				}
			},
			backup(links) {
				const next = get.copy(lib.skill.qmsgswkjsgj_re_jsrgzunwei.backups[links[0]]);
				next.audio = 'zunwei';
				next.filterCard = function () {
					return false;
				};
				next.selectCard = -1;
				return next;
			},
			check(button) {
				const player = get.player();
				switch (button.link) {
					case 2: {
						const target = game.findPlayer(function (current) {
							return current.isMaxHp();
						});
						return (Math.min(target.hp, player.maxHp) - player.hp) * 2;
					}
					case 0: {
						const target = game.findPlayer(function (current) {
							return current.isMaxHandcard();
						});
						return Math.min(5, target.countCards('h') - player.countCards('h')) * 0.8;
					}
					case 1: {
						const target = game.findPlayer(function (current) {
							return current.isMaxEquip();
						});
						return (target.countCards('e') - player.countCards('e')) * 1.4;
					}
				}
			},
			prompt(links) {
				return ['选择一名手牌数大于你的其他角色，将手牌数摸至与其相同（至多摸五张）', '选择一名装备区内牌数大于你的其他角色，将其装备区里的牌移至你的装备区，直到你装备数不小于其', '选择一名体力值大于你的其他角色，将体力值回复至与其相同'][links[0]];
			},
		},
		backups: [
			{
				filterTarget(card, player, target) {
					return target.countCards('h') > player.countCards('h');
				},
				async content(event, trigger, player) {
					player.draw(Math.min(5, event.target.countCards('h') - player.countCards('h')));
					if (!player.storage.qmsgswkjsgj_re_jsrgzunwei) {
						player.storage.qmsgswkjsgj_re_jsrgzunwei = [];
					}
					player.storage.qmsgswkjsgj_re_jsrgzunwei.add(0);
				},
				ai: {
					order: 10,
					result: {
						player(player, target) {
							return Math.min(5, target.countCards('h') - player.countCards('h'));
						},
					},
				},
			},
			{
				filterTarget(card, player, target) {
					return target.countCards('e') > player.countCards('e');
				},
				async content(event, trigger, player) {
					if (!player.storage.qmsgswkjsgj_re_jsrgzunwei) {
						player.storage.qmsgswkjsgj_re_jsrgzunwei = [];
					}
					player.storage.qmsgswkjsgj_re_jsrgzunwei.add(1);
					const target = event.target;
					do {
						if (
							!target.countCards('e', card => {
								return player.canEquip(card);
							})
						) {
							break;
						}
						const { bool, links } = await player
							.chooseButton([`尊位：将${get.translation(target)}的一张装备牌移至你的区域内`, target.getCards('e')], true)
							.set('filterButton', button => {
								return get.player().canEquip(button.link);
							})
							.set('ai', get.buttonValue)
							.forResult();
						if (bool) {
							target.$give(links[0], player, false);
							await player.equip(links[0]);
						}
					} while (player.countCards('e') < target.countCards('e'));
				},
				ai: {
					order: 10,
					result: {
						target(player, target) {
							return player.countCards('e') - target.countCards('e');
						},
					},
				},
			},
			{
				filterTarget(card, player, target) {
					if (player.isHealthy()) {
						return false;
					}
					return target.hp > player.hp;
				},
				async content(event, trigger, player) {
					player.recover(event.target.hp - player.hp);
					if (!player.storage.qmsgswkjsgj_re_jsrgzunwei) {
						player.storage.qmsgswkjsgj_re_jsrgzunwei = [];
					}
					player.storage.qmsgswkjsgj_re_jsrgzunwei.add(2);
				},
				ai: {
					order: 10,
					result: {
						player(player, target) {
							return Math.min(target.hp, player.maxHp) - player.hp;
						},
					},
				},
			},
		],
		ai: {
			order: 10,
			result: {
				player: 1,
			},
		},
		subSkill: {
			backup: {},
		},
	},
	//星月界渭南张郃
	qmsgswkjsgj_re_wn_qiaobian: {
		audio: 'sbqiaobian',
		trigger: {
			global: 'phaseZhunbeiBegin',
		},
		filter(event, player) {
			return player.countCards('he') && event.player != player;
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseCard(get.prompt2(event.skill, trigger.player), 'he')
				.set('ai', card => {
					const player = get.player(),
						event = get.event();
					if (get.attitude(player, event.getTrigger().player) > 0) {
						return 0;
					}
					return 7 - get.value(card);
				})
				.forResult();
		},
		logTarget: 'player',
		async content(event, trigger, player) {
			const {
				cards,
				targets: [target],
			} = event;
			const next = player.addToExpansion(cards, 'giveAuto', player);
			next.gaintag.add(event.name);
			await next;
			player.addTempSkill('qmsgswkjsgj_re_wn_qiaobian_effect');
			player.markAuto('qmsgswkjsgj_re_wn_qiaobian_effect', target);
		},
		onremove(player, skill) {
			let cards = player.getExpansions(skill);
			if (cards.length) {
				player.loseToDiscardpile(cards);
			}
		},
		marktext: '巧',
		intro: {
			name: '巧',
			mark(dialog, storage, player) {
				let cards = player.getExpansions('qmsgswkjsgj_re_wn_qiaobian');
				if (player.isUnderControl(true)) {
					dialog.addAuto(cards);
				} else {
					return '共有' + get.cnNumber(cards.length) + '张牌';
				}
			},
			markcount: 'expansion',
		},
		subSkill: {
			effect: {
				audio: 'sbqiaobian',
				onremove: true,
				charlotte: true,
				trigger: {
					global: 'useCard',
				},
				filter(event, player) {
					if (!player.getExpansions('qmsgswkjsgj_re_wn_qiaobian')?.length || event.player != _status.currentPhase) {
						return false;
					}
					return event.player?.isIn() && player.getStorage('qmsgswkjsgj_re_wn_qiaobian_effect').includes(event.player);
				},
				async cost(event, trigger, player) {
					const { bool, links } =
						player.getExpansions('qmsgswkjsgj_re_wn_qiaobian').length > 1
							? await player
									.chooseCardButton(player.getExpansions('qmsgswkjsgj_re_wn_qiaobian'), true, '巧变：展示一张“巧”')
									.set('ai', button => {
										const { cardType: type, player } = get.event(),
											trigger = get.event().getTrigger();
										const bool = get.type2(button.link) == type || get.suit(button.link) == get.suit(trigger.card) || get.point(button.link) == get.point(trigger.card),
											inphase = trigger.getParent('phaseUse', true)?.player == trigger.player,
											att = get.attitude(player, trigger.player);
										if (att > 0) {
											return bool ? (inphase ? -1 : 1) : 2;
										}
										return bool ? (inphase ? trigger.player.countCards('h') : -1) : 2;
									})
									.set('cardType', get.type2(trigger.card))
									.forResult()
							: {
									bool: true,
									links: player.getExpansions('qmsgswkjsgj_re_wn_qiaobian'),
								};
					event.result = {
						bool: bool,
						targets: [trigger.player],
						cost_data: links,
					};
				},
				async content(event, trigger, player) {
					const {
						cost_data: [card],
						targets: [target],
					} = event;
					await player.showCards(card);
					if (get.type2(card) == get.type2(trigger.card) || get.suit(card) == get.suit(trigger.card) || get.point(card) == get.point(trigger.card)) {
						await target.gain(card, 'give', player);
						const evt = trigger.getParent('phaseUse', true);
						if (evt?.player == target) {
							game.log(player, '令', target, '结束了出牌阶段');
							evt.skipped = true;
						}
					} else {
						await player.draw();
						player
							.when({
								global: 'phaseJieshuBegin',
							})
							.filter((evt, player) => evt.getParent('phase', true) == trigger.getParent('phase', true) && player.getExpansions('qmsgswkjsgj_re_wn_qiaobian').length)
							.step(async (event, trigger, player) => {
								const cards = player.getExpansions('qmsgswkjsgj_re_wn_qiaobian');
								await player.gain(cards, 'draw');
							});
					}
				},
			},
		},
	},

	//神赐
	//神赐武诸葛亮
	qmsgswkjsgj_shenci_dcjincui: {
		audio: 'dcjincui',
		trigger: { player: 'phaseZhunbeiBegin' },
		filter(event, player) {
			return true;
		},
		forced: true,
		group: 'qmsgswkjsgj_shenci_dcjincui_advent',
		async content(event, trigger, player) {
			let num = 0;
			for (let i = 0; i < ui.cardPile.childNodes.length; i++) {
				let card = ui.cardPile.childNodes[i];
				if (get.number(card) == 7) {
					num++;
					if (num >= player.maxHp) {
						break;
					}
				}
			}
			for (let i = 0; i < ui.discardPile.childNodes.length; i++) {
				let card = ui.discardPile.childNodes[i];
				if (get.number(card) == 7) {
					num++;
					if (num >= player.maxHp) {
						break;
					}
				}
			}
			if (num < 1) {
				num = 1;
			}
			if (num > player.hp) {
				await player.recover(num - player.hp);
			} else if (num < player.hp) {
				await player.loseHp(player.hp - num);
			}
			const result = await player
				.chooseToGuanxing(player.hp)
				.set('prompt', '尽瘁：点击或拖动将牌移动到牌堆顶或牌堆底')
				.set('processAI', (list) => {
					let cards = list[0][1],
						player = _status.event.player,
						target = _status.currentPhase || player,
						name = _status.event.getTrigger().name,
						countWuxie = (current) => {
							let num = current.getKnownCards(player, (card) => {
								return get.name(card, current) === 'wuxie';
							});
							if (num && current !== player) {
								return num;
							}
							let skills = current.getSkills('invisible').concat(lib.skill.global);
							game.expandSkills(skills);
							for (let i = 0; i < skills.length; i++) {
								let ifo = get.info(skills[i]);
								if (!ifo) {
									continue;
								}
								if (ifo.viewAs && typeof ifo.viewAs != 'function' && ifo.viewAs.name == 'wuxie') {
									if (!ifo.viewAsFilter || ifo.viewAsFilter(current)) {
										num++;
										break;
									}
								} else {
									let hiddenCard = ifo.hiddenCard;
									if (typeof hiddenCard == 'function' && hiddenCard(current, 'wuxie')) {
										num++;
										break;
									}
								}
							}
							return num;
						},
						top = [],
						bottom = [];
					for (let i = 0; i < cards.length; i++) {
						if (get.number(cards[i]) == 7) {
							bottom.addArray(cards.splice(i--, 1));
						}
					}
					switch (name) {
						case 'phaseJieshu':
							target = target.next;
						// [falls through]
						case 'phaseZhunbei': {
							let att = get.sgn(get.attitude(player, target)),
								judges = target.getCards('j'),
								needs = 0,
								wuxie = countWuxie(target);
							for (let i = Math.min(cards.length, judges.length) - 1; i >= 0; i--) {
								let j = judges[i],
									cardj = j.viewAs ? { name: j.viewAs, cards: j.cards || [j] } : j;
								if (wuxie > 0 && get.effect(target, j, target, target) < 0) {
									wuxie--;
									continue;
								}
								let judge = get.judge(j);
								cards.sort((a, b) => {
									return (judge(b) - judge(a)) * att;
								});
								if (judge(cards[0]) * att < 0) {
									needs++;
									continue;
								} else {
									top.unshift(cards.shift());
								}
							}
							if (needs > 0 && needs >= judges.length) {
								bottom.addArray(cards);
								return [top, bottom];
							}
							cards.sort((a, b) => {
								return (get.value(b, target) - get.value(a, target)) * att;
							});
							while (needs--) {
								top.unshift(cards.shift());
							}
							while (cards.length) {
								if (get.value(cards[0], target) > 6 == att > 0) {
									top.unshift(cards.shift());
								} else {
									break;
								}
							}
							bottom.addArray(cards);
							return [top, bottom];
						}
						default:
							cards.sort((a, b) => {
								return get.value(b, target) - get.value(a, target);
							});
							while (cards.length) {
								if (get.value(cards[0], target) > 6) {
									top.unshift(cards.shift());
								} else {
									break;
								}
							}
							bottom.addArray(cards);
							return [top, bottom];
					}
				})
				.forResult();
			if (!result.bool || !result.moved[0].length) {
				player.addTempSkill('guanxing_fail');
			}
		},
		ai: {
			guanxing: true,
			effect: {
				target(card, player, target) {
					if (!get.tag(card, 'damage')) {
						return;
					}
					var num = 0,
						bool = false;
					for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
						var card = ui.cardPile.childNodes[i];
						if (get.number(card) == 7) {
							num++;
							if (num >= target.hp) {
								bool = true;
								break;
							}
						}
					}
					if (bool) {
						return 0.2;
					}
				},
			},
			threaten: 0.6,
		},
		subSkill: {
			advent: {
				audio: 'dcjincui',
				trigger: { global: 'phaseBefore', player: 'enterGame' },
				forced: true,
				filter(event, player) {
					return (event.name != 'phase' || game.phaseNumber == 0) && player.countCards('h') < 7;
				},
				content() {
					player.drawTo(7);
				},
			},
		},
	},
	qmsgswkjsgj_shenci_dcqingshi: {
		audio: 'dcqingshi',
		trigger: { player: 'useCard' },
		filter(event, player) {
			if (!player.isPhaseUsing()) {
				return false;
			}
			// if (player.getStorage("dcqingshi_clear").includes(event.card.name)) {
			// 	return false;
			// }
			if (
				player.hasCard((card) => {
					return get.name(card) == event.card.name;
				})
			) {
				return true;
			}
			return false;
		},
		direct: true,
		content() {
			'step 0';
			var choices = [];
			var choiceList = ['令' + get.translation(trigger.card) + '对其中一个目标角色造成的伤害+1', '令任意名角色各摸一张牌', '摸X张牌，然后〖情势〗于本回合无效（X为你的体力值）'];
			if (trigger.targets && trigger.targets.length) {
				choices.push('选项一');
			} else {
				choiceList[0] = '<span style="opacity:0.5">' + choiceList[0] + '(无目标角色)</span>';
			}
			if (game.countPlayer()) {
				choices.push('选项二');
			} else {
				choiceList[1] = '<span style="opacity:0.5">' + choiceList[1] + '</span>';
			}
			choices.push('选项三');
			player
				.chooseControl(choices, 'cancel2')
				.set('choiceList', choiceList)
				.set('prompt', get.prompt('qmsgswkjsgj_shenci_dcqingshi'))
				.set('ai', () => {
					return _status.event.choice;
				})
				.set(
					'choice',
					(() => {
						var choicesx = choices.slice();
						var cards = player.getCards('hs');
						var bool1 =
								get.tag(trigger.card, 'damage') &&
								choicesx.includes('选项一') &&
								trigger.targets.some((current) => {
									return get.attitude(player, current) < 0;
								}),
							bool2 = choicesx.includes('选项二');
						if (bool2) {
							bool2 = game.countPlayer(function (current) {
								return get.attitude(player, current) > 0;
							});
						} else {
							bool2 = 0;
						}
						if (bool1 || bool2) {
							for (var i = 0; i < cards.length; i++) {
								var name = get.name(cards[i]);
								// if (player.getStorage("dcqingshi_clear").includes(name)) {
								// 	continue;
								// }
								for (var j = i + 1; j < cards.length; j++) {
									if (name === get.name(cards[j]) && get.position(cards[i]) + get.position(cards[j]) !== 'ss' && player.hasValueTarget(cards[i])) {
										choicesx.remove('选项三');
										break;
									}
								}
							}
						}
						if (bool2 > 2) {
							return '选项二';
						}
						if (choicesx.includes('选项三')) {
							return '选项三';
						}
						if (bool2 === 2) {
							return '选项二';
						}
						if (bool1) {
							return '选项一';
						}
						if (bool2) {
							return '选项二';
						}
						return 'cancel2';
					})(),
				);
			('step 1');
			if (result.control != 'cancel2') {
				player.logSkill('qmsgswkjsgj_shenci_dcqingshi');
				game.log(player, '选择了', '#y' + result.control);
				var index = ['选项一', '选项二', '选项三'].indexOf(result.control) + 1;
				// player.addTempSkill("dcqingshi_clear");
				// player.markAuto("dcqingshi_clear", [trigger.card.name]);
				var next = game.createEvent('qmsgswkjsgj_shenci_dcqingshi_after');
				next.player = player;
				next.card = trigger.card;
				next.setContent(lib.skill.qmsgswkjsgj_shenci_dcqingshi['content' + index]);
			}
		},
		content1() {
			'step 0';
			player
				.chooseTarget('令' + get.translation(card) + '对其中一个目标造成的伤害+1', true, (card, player, target) => {
					return _status.event.targets.includes(target);
				})
				.set('ai', (target) => {
					return 2 - get.attitude(_status.event.player, target);
				})
				.set('targets', event.getParent().getTrigger().targets);
			('step 1');
			if (result.bool) {
				var target = result.targets[0];
				player.line(target);
				player.addTempSkill('qmsgswkjsgj_shenci_dcqingshi_ex');
				if (!player.storage.qmsgswkjsgj_shenci_dcqingshi_ex) {
					player.storage.qmsgswkjsgj_shenci_dcqingshi_ex = [];
				}
				player.storage.qmsgswkjsgj_shenci_dcqingshi_ex.push([target, card]);
			}
		},
		content2() {
			'step 0';
			player.chooseTarget('令任意名角色各摸一张牌', [1, Infinity], true).set('ai', (target) => {
				return get.attitude(_status.event.player, target);
			});
			('step 1');
			if (result.bool) {
				var targets = result.targets;
				targets.sortBySeat();
				player.line(targets);
				game.asyncDraw(targets);
				game.delayex();
			}
		},
		content3() {
			'step 0';
			var num = player.hp;
			player.draw(num);
			player.tempBanSkill('qmsgswkjsgj_shenci_dcqingshi');
		},
		subSkill: {
			ex: {
				trigger: { source: 'damageBegin1' },
				filter(event, player) {
					return (
						player.storage.qmsgswkjsgj_shenci_dcqingshi_ex &&
						player.storage.qmsgswkjsgj_shenci_dcqingshi_ex.some((info) => {
							return info[0] == event.player && info[1] == event.card;
						})
					);
				},
				forced: true,
				charlotte: true,
				popup: false,
				onremove: true,
				content() {
					trigger.num++;
					for (var i = 0; i < player.storage.qmsgswkjsgj_shenci_dcqingshi_ex.length; i++) {
						if (player.storage.qmsgswkjsgj_shenci_dcqingshi_ex[i][1] == trigger.card) {
							player.storage.qmsgswkjsgj_shenci_dcqingshi_ex.splice(i--, 1);
						}
					}
				},
			},
			clear: {
				onremove: true,
				charlotte: true,
			},
		},
		ai: {
			threaten: 6,
		},
	},
	qmsgswkjsgj_shenci_dczhizhe: {
		audio: 'dczhizhe',
		enable: 'phaseUse',
		limited: true,
		filterCard: true,
		position: 'h',
		discard: false,
		lose: false,
		delay: false,
		skillAnimation: true,
		animationColor: 'metal',
		check(card) {
			if (get.type(card) != 'basic' && get.type(card) != 'trick') {
				return 0;
			}
			return get.value(card) - 7.5;
		},
		content() {
			'step 0';
			var card = cards[0];
			player.awakenSkill(event.name);
			var cardx = game.createCard2(card.name, card.suit, card.number, card.nature);
			player.gain(cardx).gaintag.add('qmsgswkjsgj_shenci_dczhizhe');
			player.addSkill('qmsgswkjsgj_shenci_dczhizhe_effect');
		},
		ai: {
			order: 15,
			result: {
				player: 1,
			},
		},
		subSkill: {
			effect: {
				mod: {
					aiOrder(player, card, num) {
						if (num > 0 && get.itemtype(card) === 'card' && card.hasGaintag('qmsgswkjsgj_shenci_dczhizhe')) {
							return num + 0.16;
						}
					},
					aiValue(player, card, num) {
						if (num > 0 && get.itemtype(card) === 'card' && card.hasGaintag('qmsgswkjsgj_shenci_dczhizhe')) {
							return 2 * num;
						}
					},
					aiUseful(player, card, num) {
						if (num > 0 && !player._dczhizhe_mod && get.itemtype(card) === 'card' && card.hasGaintag('qmsgswkjsgj_shenci_dczhizhe')) {
							if (player.canIgnoreHandcard(card)) {
								return Infinity;
							}
							player._dczhizhe_mod = true;
							if (
								player.hp < 3 &&
								player.needsToDiscard(0, (i, player) => {
									return !player.canIgnoreHandcard(i) && get.useful(i) > 6;
								})
							) {
								return num * 1.5;
							}
							return num * 10;
						}
					},
				},
				audio: 'dczhizhe',
				// trigger: { player: ["useCardAfter", "respondAfter"] },
				trigger: {
					player: 'loseAfter',
					global: ['loseAsyncAfter'],
				},
				charlotte: true,
				forced: true,
				filter(event, player) {
					var evt = event.getl(player);

					for (var i in evt.gaintag_map) {
						if (evt.gaintag_map[i].includes('qmsgswkjsgj_shenci_dczhizhe')) {
							if (
								event.cards.some((card) => {
									return (get.position(card, true) == 'o' || get.position(card, true) == 'd') && card.cardid == i;
								})
							) {
								return true;
							}
						}
					}
					// return player.hasHistory("lose", function (evt) {
					// 	if ((evt.relatedEvent || evt.getParent()) != event) {
					// 		return false;
					// 	}
					// 	for (var i in evt.gaintag_map) {
					// 		if (evt.gaintag_map[i].includes("qmsgswkjsgj_shenci_dczhizhe")) {
					// 			if (
					// 				event.cards.some(card => {
					// 					return get.position(card, true) == "o" && card.cardid == i;
					// 				})
					// 			) {
					// 				return true;
					// 			}
					// 		}
					// 	}
					// 	return false;
					// });
				},
				content() {
					'step 0';
					var cards = [];
					var evt = trigger.getl(player);

					for (var i in evt.gaintag_map) {
						if (evt.gaintag_map[i].includes('qmsgswkjsgj_shenci_dczhizhe')) {
							var cardsx = trigger.cards.filter((card) => {
								return (get.position(card, true) == 'o' || get.position(card, true) == 'd') && card.cardid == i;
							});
							if (cardsx.length) {
								cards.addArray(cardsx);
							}
						}
					}
					// player.getHistory("lose", function (evt) {
					// 	if ((evt.relatedEvent || evt.getParent()) != trigger) {
					// 		return false;
					// 	}
					// 	for (var i in evt.gaintag_map) {
					// 		if (evt.gaintag_map[i].includes("qmsgswkjsgj_shenci_dczhizhe")) {
					// 			var cardsx = trigger.cards.filter(card => {
					// 				return get.position(card, true) == "o" && card.cardid == i;
					// 			});
					// 			if (cardsx.length) {
					// 				cards.addArray(cardsx);
					// 			}
					// 		}
					// 	}
					// });
					if (cards.length) {
						player.gain(cards, 'gain2').gaintag.addArray(['qmsgswkjsgj_shenci_dczhizhe', 'qmsgswkjsgj_shenci_dczhizhe_clear']);
						player.addTempSkill('qmsgswkjsgj_shenci_dczhizhe_clear');
					}
				},
			},
			clear: {
				charlotte: true,
				onremove(player) {
					player.removeGaintag('qmsgswkjsgj_shenci_dczhizhe_clear');
				},
				mod: {
					cardEnabled2(card, player) {
						var cards = [];
						if (card.cards) {
							cards.addArray(cards);
						}
						if (get.itemtype(card) == 'card') {
							cards.push(card);
						}
						for (var cardx of cards) {
							if (cardx.hasGaintag('qmsgswkjsgj_shenci_dczhizhe_clear')) {
								return false;
							}
						}
					},
					cardRespondable(card, player) {
						var cards = [];
						if (card.cards) {
							cards.addArray(cards);
						}
						if (get.itemtype(card) == 'card') {
							cards.push(card);
						}
						for (var cardx of cards) {
							if (cardx.hasGaintag('qmsgswkjsgj_shenci_dczhizhe_clear')) {
								return false;
							}
						}
					},
					cardSavable(card, player) {
						var cards = [];
						if (card.cards) {
							cards.addArray(cards);
						}
						if (get.itemtype(card) == 'card') {
							cards.push(card);
						}
						for (var cardx of cards) {
							if (cardx.hasGaintag('qmsgswkjsgj_shenci_dczhizhe_clear')) {
								return false;
							}
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_shenci_redczhizhe:{
		audio: 'dczhizhe',
		enable: 'phaseUse',
		// limited: true,
		// usable:1,
		filterCard: true,
		position: 'h',
		discard: false,
		lose: false,
		delay: false,
		skillAnimation: true,
		animationColor: 'metal',
		filter(event,player){
			return !player.getCards('h',function(card){
				return card.hasGaintag('qmsgswkjsgj_shenci_redczhizhe')
			});
		},
		check(card) {
			if (get.type(card) != 'basic' && get.type(card) != 'trick') {
				return 0;
			}
			return get.value(card) - 7.5;
		},
		content() {
			'step 0';
			var card = cards[0];
			// player.awakenSkill(event.name);
			var cardx = game.createCard2(card.name, card.suit, card.number, card.nature);
			player.gain(cardx).gaintag.add('qmsgswkjsgj_shenci_redczhizhe');
			player.addSkill('qmsgswkjsgj_shenci_redczhizhe_effect');
		},
		ai: {
			order: 15,
			result: {
				player: 1,
			},
		},
		subSkill: {
			effect: {
				mod: {
					aiOrder(player, card, num) {
						if (num > 0 && get.itemtype(card) === 'card' && card.hasGaintag('qmsgswkjsgj_shenci_redczhizhe')) {
							return num + 0.16;
						}
					},
					aiValue(player, card, num) {
						if (num > 0 && get.itemtype(card) === 'card' && card.hasGaintag('qmsgswkjsgj_shenci_redczhizhe')) {
							return 2 * num;
						}
					},
					aiUseful(player, card, num) {
						if (num > 0 && !player._dczhizhe_mod && get.itemtype(card) === 'card' && card.hasGaintag('qmsgswkjsgj_shenci_redczhizhe')) {
							if (player.canIgnoreHandcard(card)) {
								return Infinity;
							}
							player._dczhizhe_mod = true;
							if (
								player.hp < 3 &&
								player.needsToDiscard(0, (i, player) => {
									return !player.canIgnoreHandcard(i) && get.useful(i) > 6;
								})
							) {
								return num * 1.5;
							}
							return num * 10;
						}
					},
				},
				audio: 'dczhizhe',
				// trigger: { player: ["useCardAfter", "respondAfter"] },
				trigger: {
					player: 'loseAfter',
					global: ['loseAsyncAfter'],
				},
				charlotte: true,
				forced: true,
				filter(event, player) {
					var evt = event.getl(player);

					for (var i in evt.gaintag_map) {
						if (evt.gaintag_map[i].includes('qmsgswkjsgj_shenci_redczhizhe')) {
							if (
								event.cards.some((card) => {
									return (get.position(card, true) == 'o' || get.position(card, true) == 'd') && card.cardid == i;
								})
							) {
								return true;
							}
						}
					}
				},
				content() {
					'step 0';
					var cards = [];
					var evt = trigger.getl(player);

					for (var i in evt.gaintag_map) {
						if (evt.gaintag_map[i].includes('qmsgswkjsgj_shenci_redczhizhe')) {
							var cardsx = trigger.cards.filter((card) => {
								return (get.position(card, true) == 'o' || get.position(card, true) == 'd') && card.cardid == i;
							});
							if (cardsx.length) {
								cards.addArray(cardsx);
							}
						}
					}
					if (cards.length) {
						player.gain(cards, 'gain2').gaintag.addArray(['qmsgswkjsgj_shenci_redczhizhe', 'qmsgswkjsgj_shenci_redczhizhe_clear']);
						player.addTempSkill('qmsgswkjsgj_shenci_redczhizhe_clear');
					}
				},
			},
			clear: {
				charlotte: true,
				onremove(player) {
					player.removeGaintag('qmsgswkjsgj_shenci_redczhizhe_clear');
				},
				mod: {
					cardEnabled2(card, player) {
						var cards = [];
						if (card.cards) {
							cards.addArray(cards);
						}
						if (get.itemtype(card) == 'card') {
							cards.push(card);
						}
						for (var cardx of cards) {
							if (cardx.hasGaintag('qmsgswkjsgj_shenci_redczhizhe_clear')) {
								return false;
							}
						}
					},
					cardRespondable(card, player) {
						var cards = [];
						if (card.cards) {
							cards.addArray(cards);
						}
						if (get.itemtype(card) == 'card') {
							cards.push(card);
						}
						for (var cardx of cards) {
							if (cardx.hasGaintag('qmsgswkjsgj_shenci_redczhizhe_clear')) {
								return false;
							}
						}
					},
					cardSavable(card, player) {
						var cards = [];
						if (card.cards) {
							cards.addArray(cards);
						}
						if (get.itemtype(card) == 'card') {
							cards.push(card);
						}
						for (var cardx of cards) {
							if (cardx.hasGaintag('qmsgswkjsgj_shenci_redczhizhe_clear')) {
								return false;
							}
						}
					},
				},
			},
		},
	},
	//神赐界杜预
	qmsgswkjsgj_shenci_spwuku: {
		audio: 'spwuku',
		trigger: { global: 'useCard' },
		forced: true,
		preHidden: true,
		filter(event, player) {
			if (get.type(event.card) != 'equip') return false;
			return true;
		},
		content() {
			'step 0';
			player.addMark('spwuku', trigger.player == player ? 2 : 1);
			// trigger.trigger("spwukuAfter");
			('step 1');
			trigger.trigger('spwukuAfter');
		},
		contentAfter() {
			trigger.trigger('spwukuAfter');
		},
		marktext: '库',
		intro: {
			content: 'mark',
		},
		ai: {
			combo: 'spmiewu',
			threaten: 3.6,
		},
	},
	qmsgswkjsgj_shenci_spwukuplus:{
		audio: 'spwuku',
		trigger: { global: 'useCard' },
		forced: true,
		preHidden: true,
		filter(event, player) {
			if (get.type(event.card) != 'equip') return false;
			return true;
		},
		content() {
			'step 0';
			player.addMark('spwuku', trigger.player == player ? 2 : 1);
			// trigger.trigger("spwukuAfter");
			('step 1');
			trigger.trigger('spwukuAfter');
		},
		contentAfter() {
			trigger.trigger('spwukuAfter');
		},
		marktext: '库',
		intro: {
			content: 'mark',
		},
		ai: {
			combo: 'spmiewu',
			threaten: 3.6,
		},
		group:'qmsgswkjsgj_shenci_spwukuplus_gain',
		subSkill:{
			gain:{
				forced:true,
				audio:'qmsgswkjsgj_shenci_spwukuplus',
				trigger:{
					player:'phaseZhunbeiBegin',
				},
				async content(event,trigger,player){
					let cards = [],cards2=[];
					for (let i = 0; i < ui.cardPile.childNodes.length; i++) {
						let card = ui.cardPile.childNodes[i];
						if (get.type2(card) == 'equip') {
							cards.push(card)
						}
					}
					for (let i = 0; i < ui.discardPile.childNodes.length; i++) {
						let card = ui.discardPile.childNodes[i];
						if(get.type2(card)=='equip'){
							cards2.push(card)
						}
					}
					if(!cards.length&&!cards2.length){
						event.finish();
					}
					var dialog=['请选择一个装备获得']
					if(cards){
						dialog.push('<div class="text center">牌堆</div>');
						dialog.push(cards);
					}
					if(cards2){
						dialog.push('<div class="text center">弃牌堆</div>');
						dialog.push(cards2);
					}
					var result = await player.chooseButton(dialog,1,true).forResult()
					if(result.links){
						await player.gain(result.links,'gain2')
					}
				}
			},
		},

	},
	qmsgswkjsgj_shenci_spsanchen: {
		audio: 'spsanchen',
		trigger: { player: ['spwukuAfter'] },
		forced: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: 'gray',
		filter(event, player) {
			return player.countMark('spwuku') > 2;
		},
		content() {
			player.awakenSkill(event.name);
			player.gainMaxHp();
			player.recover();
			player.addSkills('qmsgswkjsgj_shenci_spmiewu');
		},
		ai: {
			combo: 'qmsgswkjsgj_shenci_spwuku',
		},
		derivation: 'qmsgswkjsgj_shenci_spmiewu',
	},
	qmsgswkjsgj_shenci_spmiewu: {
		audio: 'spmiewu',
		enable: ['chooseToUse', 'chooseToRespond'],
		filter(event, player) {
			if (!player.countMark('spwuku') || !player.countCards('hse')) {
				return false;
			}
			for (var i of lib.inpile) {
				var type = get.type2(i);
				if ((type == 'basic' || type == 'trick') && event.filterCard(get.autoViewAs({ name: i }, 'unsure'), player, event)) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				for (var i = 0; i < lib.inpile.length; i++) {
					var name = lib.inpile[i];
					if (name == 'sha') {
						if (event.filterCard(get.autoViewAs({ name }, 'unsure'), player, event)) {
							list.push(['基本', '', 'sha']);
						}
						for (var nature of lib.inpile_nature) {
							if (event.filterCard(get.autoViewAs({ name, nature }, 'unsure'), player, event)) {
								list.push(['基本', '', 'sha', nature]);
							}
						}
					} else if (get.type2(name) == 'trick' && event.filterCard(get.autoViewAs({ name }, 'unsure'), player, event)) {
						list.push(['锦囊', '', name]);
					} else if (get.type(name) == 'basic' && event.filterCard(get.autoViewAs({ name }, 'unsure'), player, event)) {
						list.push(['基本', '', name]);
					}
				}
				return ui.create.dialog('灭吴', [list, 'vcard']);
			},
			check(button) {
				if (_status.event.getParent().type != 'phase') {
					return 1;
				}
				var player = _status.event.player;
				if (['wugu', 'zhulu_card', 'yiyi', 'lulitongxin', 'lianjunshengyan', 'diaohulishan'].includes(button.link[2])) {
					return 0;
				}
				return player.getUseValue({
					name: button.link[2],
					nature: button.link[3],
				});
			},
			backup(links, player) {
				return {
					filterCard: true,
					audio: 'qmsgswkjsgj_shenci_spmiewu',
					popname: true,
					check(card) {
						return 8 - get.value(card);
					},
					position: 'hse',
					viewAs: { name: links[0][2], nature: links[0][3] },
					precontent() {
						// player.addTempSkill("spmiewu2");
						player.removeMark('spwuku', 1);
					},
				};
			},
			prompt(links, player) {
				return '将一张牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用';
			},
		},
		hiddenCard(player, name) {
			if (!lib.inpile.includes(name)) {
				return false;
			}
			var type = get.type2(name);
			return (type == 'basic' || type == 'trick') && player.countMark('spwuku') > 0 && player.countCards('she') > 0 && !player.hasSkill('spmiewu2');
		},
		ai: {
			combo: 'spwuku',
			fireAttack: true,
			respondSha: true,
			respondShan: true,
			skillTagFilter(player) {
				if (!player.countMark('spwuku') || !player.countCards('hse') || player.hasSkill('spmiewu2')) {
					return false;
				}
			},
			order: 1,
			result: {
				player(player) {
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					return 1;
				},
			},
		},
		group: 'qmsgswkjsgj_shenci_spmiewu2',
	},
	qmsgswkjsgj_shenci_spmiewu2: {
		trigger: { player: ['useCardAfter', 'respondAfter'] },
		forced: true,
		charlotte: true,
		popup: false,
		sourceSkill: 'qmsgswkjsgj_shenci_spmiewu',
		filter(event, player) {
			return event.skill == 'qmsgswkjsgj_shenci_spmiewu_backup';
		},
		content() {
			player.draw();
		},
	},

	//神赐武陆逊
	qmsgswkjsgj_shenci_dcxiongmu: {
		audio: 'dcxiongmu',
		trigger: { global: 'roundStart' },
		group: ['qmsgswkjsgj_shenci_dcxiongmu_minus', 'qmsgswkjsgj_shenci_dcxiongmu_tag'],
		prompt2(event, player) {
			return '摸' + get.cnNumber(player.maxHp) + '张牌，然后' + '将任意张牌随机置入牌堆并从牌堆或弃牌堆中获得等量点数为8的牌。';
		},
		async content(event, trigger, player) {
			await player.draw(player.maxHp);
			var cards = player.getCards('he');
			if (!cards.length) {
				return;
			}
			var result;
			let selectedCards = null;
			let selectedCount = 0;
			if (cards.length == 1) {
				result = { bool: true, cards: cards };
			} else {
				result = await player
					.chooseCard('雄幕：将任意张牌置入牌堆的随机位置', 'he', [1, Infinity], true, 'allowChooseAll')
					.set('ai', (card) => {
						return 6 - get.value(card);
					})
					.forResult();
			}
			if (result.bool) {
				selectedCards = result.cards;
				selectedCount = selectedCards.length;
				game.log(player, `将${get.cnNumber(selectedCount)}张牌置入了牌堆`);
				var next = player.loseToDiscardpile(selectedCards, ui.cardPile, 'blank').set('log', false);
				next.insert_index = function () {
					return ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)];
				};
				await next;
			} else {
				return;
			}
			var list = [],
				shown = [];
			var piles = ['cardPile', 'discardPile'];
			for (var pile of piles) {
				for (var i = 0; i < ui[pile].childNodes.length; i++) {
					var card = ui[pile].childNodes[i];
					var number = get.number(card, false);
					if (!list.includes(card) && number == 8) {
						list.push(card);
						if (pile == 'discardPile') {
							shown.push(card);
						}
						if (list.length >= selectedCount) {
							break;
						}
					}
				}
				if (list.length >= selectedCount) {
					break;
				}
			}
			if (list.length) {
				var next = player.gain(list);
				next.shown_cards = shown;
				next.set('animate', function (event) {
					var player = event.player,
						cards = event.cards,
						shown = event.shown_cards;
					if (shown.length < cards.length) {
						var num = cards.length - shown.length;
						player.$draw(num);
						game.log(player, '从牌堆获得了', get.cnNumber(num), '张点数为8的牌');
					}
					if (shown.length > 0) {
						player.$gain2(shown, false);
						game.log(player, '从弃牌堆获得了', shown);
					}
					return 500;
				});
				next.gaintag.add('qmsgswkjsgj_shenci_dcxiongmu_tag');
				await next;
				// player.addTempSkill("qmsgswkjsgj_shenci_dcxiongmu_tag", "roundStart");
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (target.countCards('h') > target.getHp() || player.hasSkillTag('jueqing', false, target)) {
						return;
					}
					if (player._dcxiongmu_temp) {
						return;
					}
					if (_status.event.getParent('useCard', true) || _status.event.getParent('_wuxie', true)) {
						return;
					}
					if (get.tag(card, 'damage')) {
						if (target.getHistory('damage').length > 0) {
							return [1, -2];
						} else {
							if (get.attitude(player, target) > 0 && target.hp > 1) {
								return 'zeroplayertarget';
							}
							if (get.attitude(player, target) < 0 && !player.hasSkillTag('damageBonus')) {
								if (card.name == 'sha') {
									return;
								}
								var sha = false;
								player._dcxiongmu_temp = true;
								var num = player.countCards('h', function (card) {
									if (card.name == 'sha') {
										if (sha) {
											return false;
										} else {
											sha = true;
										}
									}
									return get.tag(card, 'damage') && player.canUse(card, target) && get.effect(target, card, player, player) > 0;
								});
								delete player._dcxiongmu_temp;
								if (player.hasSkillTag('damage')) {
									num++;
								}
								if (num < 2) {
									var enemies = player.getEnemies();
									if (enemies.length == 1 && enemies[0] == target && player.needsToDiscard()) {
										return;
									}
									return 'zeroplayertarget';
								}
							}
						}
					}
				},
			},
		},
		subSkill: {
			minus: {
				audio: 'dcxiongmu',
				trigger: { player: 'damageBegin4' },
				filter(event, player) {
					return (
						// player.countCards("h") <= player.getHp() &&
						game
							.getGlobalHistory(
								'everything',
								(evt) => {
									return evt.name == 'damage' && evt.player == player;
								},
								event,
							)
							.indexOf(event) == 0
					);
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					trigger.cancel();
				},
			},
			tag: {
				charlotte: true,
				// onremove(player) {
				// 	player.removeGaintag("dcxiongmu_tag");
				// },
				mod: {
					ignoredHandcard(card, player) {
						if (card.number == 8) {
							return true;
						}
					},
					cardDiscardable(card, player, name) {
						if (name == 'phaseDiscard' && card.number == 8) {
							return false;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_shenci_dczhangcai: {
		audio: 'dczhangcai',
		mod: {
			aiOrder: (player, card, num) => {
				if (num > 0 && get.tag(card, 'draw') && ui.cardPile.childNodes.length + ui.discardPile.childNodes.length < 20) {
					return 0;
				}
			},
			aiValue: (player, card, num) => {
				if (num > 0 && card.name === 'zhuge') {
					return 20;
				}
			},
			aiUseful: (player, card, num) => {
				if (num > 0 && card.name === 'zhuge') {
					return 10;
				}
			},
		},
		trigger: {
			player: 'loseEnd',
			global: 'loseAsyncAfter',
		},
		filter(event, player) {
			var evt = event.getl(player);
			if (player.hasSkill('qmsgswkjsgj_shenci_dczhangcai_all')) {
				return true;
			}
			return evt.cards.some((card) => get.number(card) == 8);
		},
		locked: false,
		cost() {
			'step 0';
			var evt = trigger.getl(player);
			var cards = player.hasSkill('qmsgswkjsgj_shenci_dczhangcai_all') ? evt.cards : evt.cards.filter((card) => get.number(card) == 8);
			player
				.chooseCardButton(cards, [1, Infinity], get.prompt2('qmsgswkjsgj_shenci_dczhangcai'))
				.set('ai', function (button) {
					var list = ui.selected.buttons;
					var num = 0;
					if (list.length) {
						for (var i = 0; i < list.length; i++) {
							num += get.ZC_playerCards(player, get.number(list[i].link));
						}
					}
					if (num <= ui.cardPile.childNodes.length + ui.discardPile.childNodes.length) {
						if (num + get.number(button.link) > ui.cardPile.childNodes.length + ui.discardPile.childNodes.length) return false;
						return true;
					} else return false;
				})
				.set('complex', true);
			('step 1');
			if (result.bool) {
				event.result = {
					bool: true,
					cost_data: result.links,
				};
			}
		},
		content() {
			var num = 0;
			event.cost_data.forEach((card) => (num += get.ZC_playerCards(player, get.number(card))));
			player.draw(num, 'nodelay');
		},
		ai: {
			threaten: 4,
			combo: 'qmsgswkjsgj_shenci_dcxiongmu',
		},
		subSkill: {
			all: {
				charlotte: true,
				mark: true,
				intro: {
					content: '当失去一张牌时，你可以摸X张牌（X为你手牌中与此牌点数相同的牌数且至少为1）',
				},
			},
		},
	},
	qmsgswkjsgj_shenci_dcruxian: {
		audio: 'dcruxian',
		enable: 'phaseUse',
		limited: true,
		skillAnimation: true,
		animationColor: 'wood',
		content() {
			'step 0';
			player.awakenSkill(event.name);
			player
				.when({ player: 'phaseBegin' })
				.filter(function (event, player) {
					return true;
				})
				.then(function () {
					if (player.hasSkill('qmsgswkjsgj_shenci_dczhangcai_all')) {
						player
							.when({ player: 'phaseEnd' })
							.filter(function (event, player) {
								return true;
							})
							.then(function () {
								if (player.hasSkill('qmsgswkjsgj_shenci_dczhangcai_all')) {
									player.removeSkill('qmsgswkjsgj_shenci_dczhangcai_all');
								}
							});
					}
				});
			player.addSkill('qmsgswkjsgj_shenci_dczhangcai_all');
		},
		ai: {
			combo: 'qmsgswkjsgj_shenci_dczhangcai',
			order: 15,
			result: {
				player(player) {
					if (!player.hasSkill('qmsgswkjsgj_shenci_dczhangcai')) {
						return 0;
					}
					if (player.countCards('hs', (card) => get.number(card) != 8 && player.hasValueTarget(card)) > 3 || player.hp == 1) {
						return 5;
					}
					return 0;
				},
			},
		},
	},

	//神赐谋曹丕
	qmsgswkjsgj_shenci_sbxingshang: {
		// getLimit: 9,
		getList: [
			{
				cost: 1,
				prompt: () => '令一名角色复原武将牌',
				filter: () => game.hasPlayer((target) => target.isLinked() || target.isTurnedOver()),
				filterTarget: (card, player, target) => target.isLinked() || target.isTurnedOver(),
				async content(player, target) {
					if (target.isLinked()) {
						await target.link(false);
					}
					if (target.isTurnedOver()) {
						await target.turnOver(false);
					}
				},
				ai: {
					result: {
						target(player, target) {
							let res = 0;
							if (target.isLinked()) {
								res = 0.3;
							}
							if (target.isTurnedOver()) {
								res += 3.5 * get.threaten(target, player);
							}
							return res;
						},
					},
				},
			},
			{
				cost: 2,
				prompt: () => '令一名角色摸X张牌（X为本场已死亡角色数，至少为3）',
				filter: () => true,
				filterTarget: true,
				async content(player, target) {
					var num = Math.max(game.dead.length, 3);
					await target.draw(num);
				},
				ai: {
					result: {
						player(player, target) {
							return get.effect(target, { name: 'draw' }, player, player) * 3;
						},
					},
				},
			},
			{
				cost: 3,
				prompt: () => '令一名角色增加1点体力上限，回复1点体力，随机恢复一个已废除的装备栏（体力上限不大于12方可选择）',
				filter: () => true,
				filterTarget: (card, player, target) => {
					return target.maxHp < 12;
				},
				async content(player, target) {
					// var num = game.dead.length;
					await target.gainMaxHp(1);
					await target.recover(1);
					let list = Array.from({ length: 13 }).map((_, i) => 'equip' + parseFloat(i + 1));
					list = list.filter((i) => target.hasDisabledSlot(i));
					if (list.length) {
						await target.enableEquip(list.randomGet());
					}
				},
				ai: {
					result: {
						target(player, target) {
							let res = 0.2;
							if (target.isHealthy()) {
								res += 0.4;
							}
							if (
								Array.from({ length: 5 })
									.map((_, i) => 'equip' + parseFloat(i + 1))
									.some((i) => target.hasDisabledSlot(i))
							) {
								res += 0.3;
							}
							return res + get.recoverEffect(target, target, target) / 16;
						},
					},
				},
			},
			{
				cost: 4,
				prompt: () => '获得一名已阵亡角色的武将牌上的所有技能，然后失去〖行殇〗',
				filter: () => game.dead.some((target) => target.getStockSkills(true, true).some((i) => get.info(i) && !get.info(i).charlotte)),
				filterTarget(card, player, target) {
					if (!target.isDead()) {
						return false;
					}
					return target.getStockSkills(true, true).some((i) => get.info(i) && !get.info(i).charlotte);
				},
				deadTarget: true,
				async content(player, target) {
					await player.changeSkills(
						target.getStockSkills(true, true).filter((skill) => get.info(skill) && !get.info(skill).charlotte),
						['qmsgswkjsgj_shenci_sbxingshang'],
					);
				},
				ai: {
					result: {
						player(player, target) {
							return ['name', 'name1', 'name2'].reduce((sum, name) => {
								if (!target[name] || !lib.character[target[name]] || (name == 'name1' && target.name1 == target.name)) {
									return sum;
								}
								return sum + get.rank(target[name], true);
							}, 0);
						},
					},
				},
			},
		],
		marktext: '颂',
		intro: {
			name: '颂',
			content: 'mark',
		},
		audio: 'sbxingshang',
		enable: 'phaseUse',
		filter(event, player) {
			return get.info('qmsgswkjsgj_shenci_sbxingshang').getList.some((effect) => {
				return player.countMark('qmsgswkjsgj_shenci_sbxingshang') >= effect.cost && effect.filter(player);
			});
		},
		usable: 2,
		chooseButton: {
			dialog() {
				let dialog = ui.create.dialog('行殇：请选择一项', 'hidden');
				const list = get.info('qmsgswkjsgj_shenci_sbxingshang').getList.slice();
				dialog.add([
					list.map((effect) => {
						return [effect, '移去' + effect.cost + '个“颂”标记，' + effect.prompt()];
					}),
					'textbutton',
				]);
				return dialog;
			},
			filter(button, player) {
				const effect = button.link;
				return player.countMark('qmsgswkjsgj_shenci_sbxingshang') >= effect.cost && effect.filter(player);
			},
			check(button) {
				const player = get.event().player,
					effect = button.link;
				return Math.max(
					...game
						.filterPlayer((target) => {
							const filterTarget = effect.filterTarget;
							if (!filterTarget) {
								return target == player;
							}
							if (typeof filterTarget == 'function') {
								return filterTarget(null, player, target);
							}
							return true;
						})
						.map((target) => {
							game.broadcastAll((effect) => (lib.skill['qmsgswkjsgj_shenci_sbxingshang_aiSkill'].ai = effect.ai), effect);
							return get.effect(target, 'qmsgswkjsgj_shenci_sbxingshang_aiSkill', player, player);
						}),
				);
			},
			backup(links, player) {
				const effect = links[0];
				return {
					effect: effect,
					audio: 'qmsgswkjsgj_shenci_sbxingshang',
					filterCard: () => false,
					selectCard: -1,
					filterTarget: effect.filterTarget,
					deadTarget: effect.deadTarget,
					async content(event, trigger, player) {
						const target = event.targets[0],
							effect = lib.skill.qmsgswkjsgj_shenci_sbxingshang_backup.effect;
						player.removeMark('qmsgswkjsgj_shenci_sbxingshang', effect.cost);
						await effect.content(player, target);
					},
					ai: effect.ai,
				};
			},
			prompt(links, player) {
				const effect = links[0],
					str = '###行殇###';
				return str + '<div class="text center">' + '移去' + effect.cost + '个“颂”标记，' + effect.prompt() + '</div>';
			},
		},
		ai: {
			order: 6.5,
			result: {
				player(player) {
					const list = get.info('qmsgswkjsgj_shenci_sbxingshang').getList.filter((effect) => {
						return player.countMark('qmsgswkjsgj_shenci_sbxingshang') >= effect.cost && effect.filter(player);
					});
					return Math.max(
						...list.map((effect) => {
							return Math.max(
								...game
									.filterPlayer((target) => {
										const filterTarget = effect.filterTarget;
										if (!filterTarget) {
											return target == player;
										}
										if (typeof filterTarget == 'function') {
											return filterTarget(null, player, target);
										}
										return true;
									})
									.map((target) => {
										game.broadcastAll((effect) => (lib.skill['qmsgswkjsgj_shenci_sbxingshang_aiSkill'].ai = effect.ai), effect);
										return get.effect(target, 'qmsgswkjsgj_shenci_sbxingshang_aiSkill', player, player);
									}),
							);
						}),
					);
				},
			},
		},
		group: 'qmsgswkjsgj_shenci_sbxingshang_gain',
		subSkill: {
			aiSkill: {},
			backup: {},
			gain: {
				audio: 'qmsgswkjsgj_shenci_sbxingshang',
				trigger: { global: ['die', 'damageEnd'] },
				filter(event, player) {
					return true;
					// if (player.countMark("sbxingshang") >= get.info("sbxingshang").getLimit) {
					// 	return false;
					// }
					// return event.name == "die" || !player.getHistory("custom", evt => evt.sbxingshang).length;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					player.addMark('qmsgswkjsgj_shenci_sbxingshang', 2);
					// if (trigger.name == "damage") {
					// 	player.getHistory("custom").push({ qmsgswkjsgj_shenci_sbxingshang: true });
					// }
				},
			},
		},
	},
	qmsgswkjsgj_shenci_sbfangzhu: {
		getList: [
			{
				cost: 1,
				prompt: () => '令一名其他角色于手牌中只能使用一种类型牌直到其回合结束',
				filter: (player) => game.hasPlayer((target) => target != player && !target.getStorage('qmsgswkjsgj_shenci_sbfangzhu_ban').includes('basic')),
				filterTarget: (card, player, target) => target != player && !target.getStorage('qmsgswkjsgj_shenci_sbfangzhu_ban').includes('basic'),
				async content(player, target) {
					var type = [];
					for (var i of lib.inpile) {
						if (get.type2(i) && !type.includes(get.type2(i))) {
							type.push(get.type2(i));
						}
					}
					// type.push('cancel2')
					var relu = await player.chooseControl(type).set('prompt', '选择一个类型').forResult();
					if (relu != 'cancel2') {
						target.addTempSkill('qmsgswkjsgj_shenci_sbfangzhu_ban', { player: 'phaseEnd' });
						target.markAuto('qmsgswkjsgj_shenci_sbfangzhu_ban', [relu.control]);
						lib.skill.qmsgswkjsgj_shenci_sbfangzhu_ban.init(target, 'qmsgswkjsgj_shenci_sbfangzhu_ban');
					}
				},
				ai: {
					result: {
						target(player, target) {
							return -(target.countCards('hs') + 2) / 3;
						},
					},
				},
			},
			{
				cost: 2,
				prompt: () => '令一名其他角色的非Charlotte技能失效直到其回合结束',
				filter: (player) => /*get.mode() != "doudizhu" && */ game.hasPlayer((target) => target != player),
				filterTarget: lib.filter.notMe,
				async content(player, target) {
					target.addTempSkill('qmsgswkjsgj_shenci_sbfangzhu_baiban', { player: 'phaseEnd' });
				},
				ai: {
					result: {
						target(player, target) {
							return -target.getSkills(null, false).filter((i) => get.info(i) && !get.info(i).charlotte).length * get.threaten(target, player);
						},
					},
				},
			},
			{
				cost: 2,
				prompt: () => '令一名其他角色不能响应另一名角色使用的牌直到其回合结束',
				filter(player) {
					return game.hasPlayer((target) => {
						if (target !== player) {
							return game.hasPlayer((current) => {
								if (current !== target) {
									return !current.getStorage('sbfangzhu_kill').includes(target);
								}
								return false;
							});
						}
						return false;
					});
				},
				filterTarget: {
					filterTarget(card, player, target) {
						return ui.selected.targets.length > 0 || target !== player;
					},
					selectTarget: 2,
					targetprompt: ['被响应', '响应源'],
					multitarget: true,
				},
				async content(player, target, source) {
					source.addTempSkill('qmsgswkjsgj_shenci_sbfangzhu_kill', { player: 'phaseEnd' });
					source.markAuto('qmsgswkjsgj_shenci_sbfangzhu_kill', [target]);
				},
			},
			{
				cost: 3,
				prompt: () => '令一名其他角色将武将牌翻面',
				filter: (player) => /*get.mode() != "doudizhu" && */ game.hasPlayer((target) => target != player),
				filterTarget: lib.filter.notMe,
				async content(player, target) {
					await target.turnOver();
				},
				ai: {
					result: {
						target(player, target) {
							return target.isTurnedOver() ? 3.5 : -3.5;
						},
					},
				},
			},
		],
		audio: 'sbfangzhu',
		enable: 'phaseUse',
		filter(event, player) {
			// if(!player.hasSkill('qmsgswkjsgj_shenci_sbxingshang'))return false;
			return get.info('qmsgswkjsgj_shenci_sbfangzhu').getList.some((effect) => {
				return player.countMark('qmsgswkjsgj_shenci_sbxingshang') >= effect.cost && effect.filter(player);
			});
		},
		usable: 2,
		chooseButton: {
			dialog() {
				let dialog = ui.create.dialog('放逐：请选择一项', 'hidden');
				const list = get.info('qmsgswkjsgj_shenci_sbfangzhu').getList.slice();
				dialog.add([
					list.map((effect) => {
						return [effect, '移去' + effect.cost + '个“颂”标记，' + effect.prompt()];
					}),
					'textbutton',
				]);
				return dialog;
			},
			filter(button, player) {
				const effect = button.link;
				return player.countMark('qmsgswkjsgj_shenci_sbxingshang') >= effect.cost && effect.filter(player);
			},
			check(button) {
				const player = get.event().player,
					effect = button.link;
				return Math.max(
					...game
						.filterPlayer((target) => {
							const filterTarget = effect.filterTarget;
							if (!filterTarget) {
								return target == player;
							}
							if (typeof filterTarget == 'function') {
								return filterTarget(null, player, target);
							}
							return true;
						})
						.map((target) => {
							game.broadcastAll((effect) => (lib.skill['qmsgswkjsgj_shenci_sbxingshang_aiSkill'].ai = effect.ai), effect);
							return get.effect(target, 'qmsgswkjsgj_shenci_sbxingshang_aiSkill', player, player);
						}),
				);
			},
			backup(links, player) {
				const effect = links[0];
				return {
					effect: effect,
					audio: 'qmsgswkjsgj_shenci_sbfangzhu',
					audioname: ['mb_caomao'],
					filterCard: () => false,
					selectCard: -1,
					filterTarget: effect.filterTarget,
					async content(event, trigger, player) {
						const target = event.targets[0],
							effect = lib.skill.qmsgswkjsgj_shenci_sbfangzhu_backup.effect;
						player.removeMark('qmsgswkjsgj_shenci_sbxingshang', effect.cost);
						await effect.content(player, target);
					},
					ai: effect.ai,
				};
			},
			prompt(links, player) {
				const effect = links[0],
					str = '###放逐###';
				return str + '<div class="text center">' + '移去' + effect.cost + '个“颂”标记，' + effect.prompt() + '</div>';
			},
		},
		ai: {
			combo: 'qmsgswkjsgj_shenci_sbxingshang',
			order: 7,
			result: {
				player(player) {
					const list = get.info('qmsgswkjsgj_shenci_sbfangzhu').getList.filter((effect) => {
						return player.countMark('qmsgswkjsgj_shenci_sbxingshang') >= effect.cost && effect.filter(player);
					});
					return Math.max(
						...list.map((effect) => {
							return Math.max(
								...game
									.filterPlayer((target) => {
										const filterTarget = effect.filterTarget;
										if (!filterTarget) {
											return target == player;
										}
										if (typeof filterTarget == 'function') {
											return filterTarget(null, player, target);
										}
										return true;
									})
									.map((target) => {
										game.broadcastAll((effect) => (lib.skill['qmsgswkjsgj_shenci_sbxingshang_aiSkill'].ai = effect.ai), effect);
										return get.effect(target, 'qmsgswkjsgj_shenci_sbxingshang_aiSkill', player, player);
									}),
							);
						}),
					);
				},
			},
		},
		subSkill: {
			backup: {},
			baiban: {
				init(player, skill) {
					player.addSkillBlocker(skill);
					player.addTip(skill, '放逐 技能失效');
				},
				onremove(player, skill) {
					player.removeSkillBlocker(skill);
					player.removeTip(skill);
				},
				inherit: 'baiban',
				marktext: '逐',
			},
			kill: {
				charlotte: true,
				mark: true,
				marktext: '禁',
				intro: { content: '不能响应其他角色使用的牌' },
				trigger: { global: 'useCard1' },
				filter(event, player) {
					return event.player != player;
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					trigger.directHit.add(player);
				},
				init(player, skill) {
					player.addTip(skill, '放逐 无法响应');
				},
				onremove(player, skill) {
					player.removeTip(skill);
				},
			},
			ban: {
				charlotte: true,
				mark: true,
				marktext: '禁',
				intro: {
					markcount: () => 0,
					content(storage) {
						if (storage.length > 1) {
							return '不能使用手牌';
						}
						return '于手牌中只能使用' + get.translation(storage[0]) + '牌';
					},
				},
				init(player, skill) {
					let storage = player.getStorage(skill);
					if (storage.length) {
						player.addTip(skill, '放逐 限' + (storage.length === 1 ? get.translation(storage[0])[0] : '手牌'));
					}
				},
				onremove(player, skill) {
					player.removeTip(skill);
					delete player.storage[skill];
				},
				mod: {
					cardEnabled(card, player) {
						const storage = player.getStorage('qmsgswkjsgj_shenci_sbfangzhu_ban');
						const hs = player.getCards('h'),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && (storage.length > 1 || !storage.includes(get.type2(card)))) {
							return false;
						}
					},
					cardSavable(card, player) {
						const storage = player.getStorage('qmsgswkjsgj_shenci_sbfangzhu_ban');
						const hs = player.getCards('h'),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && (storage.length > 1 || !storage.includes(get.type2(card)))) {
							return false;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_shenci_sbsongwei: {
		audio: 'sbsongwei',
		trigger: { player: 'phaseUseBegin' },
		filter(event, player) {
			// if(!player.hasSkill('qmsgswkjsgj_shenci_sbxingshang'))return false;
			// if (player.countMark("qmsgswkjsgj_shenci_sbxingshang") >= get.info("qmsgswkjsgj_shenci_sbxingshang").getLimit) {
			// 	return false;
			// }
			return game.hasPlayer((target) => target.group == 'wei' && target != player);
		},
		zhuSkill: true,
		forced: true,
		locked: false,
		async content(event, trigger, player) {
			player.addMark('qmsgswkjsgj_shenci_sbxingshang', 2 * game.countPlayer((target) => target.group == 'wei' && target != player));
		},
		group: 'qmsgswkjsgj_shenci_sbsongwei_delete',
		subSkill: {
			delete: {
				audio: 'sbsongwei',
				enable: 'phaseUse',
				filter(event, player) {
					if (player.hasSkill('qmsgswkjsgj_shenci_sbsongwei_xx')) {
						return false;
					}
					return game.hasPlayer((target) => lib.skill.qmsgswkjsgj_shenci_sbsongwei.subSkill.delete.filterTarget(null, player, target));
				},
				filterTarget(card, player, target) {
					return target != player && target.group == 'wei' && target.getStockSkills(false, true).length;
				},
				skillAnimation: true,
				animationColor: 'thunder',
				async content(event, trigger, player) {
					// player.storage.sbsongwei_delete = true;
					// player.awakenSkill(event.name);
					player.YB_temp('qmsgswkjsgj_shenci_sbsongwei_xx');
					event.target.removeSkills(event.target.getStockSkills(false, true));
				},
				ai: {
					order: 13,
					result: {
						target(player, target) {
							return -target.getStockSkills(false, true).length;
						},
					},
				},
			},
		},
	},

	//神赐界孙寒华
	qmsgswkjsgj_shenci_chongxu: {
		audio: 'chongxu',
		enable: 'phaseUse',
		usable: 1,

		async content(event, trigger, player) {
			let relu = await player.chooseToPlayBeatmap(lib.skill.yb016_shenzou.beatmaps.randomGet()).forResult();
			var score = Math.floor(Math.min(7, relu.accuracy / 12));
			game.log(player, '的演奏评级为', '#y' + relu.rank[0], '，获得积分点数', '#y' + score, '分');
			if (score && score > 0) {
				const func = () => {
					const event = get.event();
					const controls = [
						(link) => {
							const evt = get.event();
							if (evt.dialog && evt.dialog.buttons) {
								for (let i = 0; i < evt.dialog.buttons.length; i++) {
									const button = evt.dialog.buttons[i];
									button.classList.remove('selectable');
									button.classList.remove('selected');
									const counterNode = button.querySelector('.caption');
									if (counterNode) counterNode.childNodes[0].innerHTML = ``;
								}
								ui.selected.buttons.length = 0;
								game.check();
							}
							return;
						},
					];
					event.controls = [ui.create.control(controls.concat(['清除选择', 'stayleft']))];
				};
				if (event.isMine()) func();
				else if (event.isOnline()) event.player.send(func);
				const result = await player
					.chooseButton(
						[
							'###' + get.translation(event.name) + '###<div class="text center">可用' + score + '分，请选择你要执行的项目</div>',
							[
								[
									['qmsgswkjsgj_shenci_miaojian', '使用2积分升级【' + get.translation('qmsgswkjsgj_shenci_miaojian') + '】'],
									['qmsgswkjsgj_shenci_shhlianhua', '使用2积分升级【' + get.translation('qmsgswkjsgj_shenci_shhlianhua') + '】'],
									['draw', '使用1积分摸一张牌'],
								],
								'textbutton',
							],
						],
						[1, Infinity],
					)
					.set('filterButton', (button) => {
						const player = get.player(),
							choice = ui.selected.buttons.map((i) => i.link);
						if (button.link !== 'draw' && (!player.hasSkill(button.link, null, null, false) || choice.filter((i) => i === button.link).length + player.countMark(button.link) > 1)) return false;
						return [...choice, button.link].reduce((sum, i) => sum + (i === 'draw' ? 1 : 2), 0) <= score;
					})
					.set('custom', {
						add: {
							confirm(bool) {
								if (bool !== true) return;
								const event = get.event().parent;
								if (Array.isArray(event.controls)) event.controls.forEach((i) => i.close());
								if (ui.confirm) ui.confirm.close();
								game.uncheck();
							},
							button() {
								if (ui.selected.buttons.length) return;
								const event = get.event();
								if (event.dialog && event.dialog.buttons) {
									for (let i = 0; i < event.dialog.buttons.length; i++) {
										const button = event.dialog.buttons[i];
										const counterNode = button.querySelector('.caption');
										if (counterNode) counterNode.childNodes[0].innerHTML = ``;
									}
								}
								if (!ui.selected.buttons.length) event.parent?.controls?.[0]?.classList.add('disabled');
							},
						},
						replace: {
							button(button) {
								const event = get.event();
								if (!event.isMine() || !event.filterButton(button) || button.classList.contains('selectable') == false) return;
								button.classList.add('selected');
								ui.selected.buttons.push(button);
								let counterNode = button.querySelector('.caption');
								const count = ui.selected.buttons.filter((i) => i == button).length;
								counterNode
									? ((counterNode) => {
											counterNode = counterNode.childNodes[0];
											counterNode.innerHTML = `×${count}`;
										})(counterNode)
									: (counterNode = ui.create.caption(`<span style="font-family:xinwei; text-shadow:#FFF 0 0 4px, #FFF 0 0 4px, rgba(74,29,1,1) 0 0 3px;">×${count}</span>`, button));
								event.parent?.controls?.[0]?.classList.remove('disabled');
								game.check();
							},
						},
					})
					.forResult();
				if (result?.bool && result.links?.length) {
					const qmsgswkjsgj_shenci_miaojian = result.links.filter((i) => i === 'qmsgswkjsgj_shenci_miaojian').length;
					if (qmsgswkjsgj_shenci_miaojian > 0) {
						player.addMark('qmsgswkjsgj_shenci_miaojian', qmsgswkjsgj_shenci_miaojian, false);
						player.popup('qmsgswkjsgj_shenci_miaojian');
						if (!player.shhcisha) {
							player.shhcisha = true;
							player.zb_10202.style.setProperty('--zb_10202-grayscale', '0%');
							// player.zb_10202.removeClass('huimu')
							player.say('进入“刺杀”形态');
							// player.useSkill('qmsgswkjsgj_shenci_miaojian_viewAs4')
							// player.logSkill('qmsgswkjsgj_shenci_miaojian')
							player.update();
						}
						game.log(player, '升级了技能', '#g【' + get.translation('qmsgswkjsgj_shenci_miaojian') + '】');
					}
					const qmsgswkjsgj_shenci_shhlianhua = result.links.filter((i) => i === 'qmsgswkjsgj_shenci_shhlianhua').length;
					if (qmsgswkjsgj_shenci_shhlianhua > 0) {
						player.addMark('qmsgswkjsgj_shenci_shhlianhua', qmsgswkjsgj_shenci_shhlianhua, false);
						player.popup('qmsgswkjsgj_shenci_shhlianhua');
						game.log(player, '升级了技能', '#g【' + get.translation('qmsgswkjsgj_shenci_shhlianhua') + '】');
					}
					const draw = result.links.filter((i) => i === 'draw').length;
					if (draw > 0) await player.draw(draw);
				}
			}
		},
		ai: {
			order: 10,
			result: {
				player: 1,
			},
		},
		derivation: 'yb016_shenzou_faq',
	},
	qmsgswkjsgj_shenci_miaojian: {
		audio: 'miaojian',
		enable: 'phaseUse',
		usable: 1,
		mod: {
			cardUsable: function (card, player) {
				var level = player.countMark('qmsgswkjsgj_shenci_miaojian');
				if (level >= 2) {
					if (get.name(card) == 'sha' && get.natureList(card).includes('stab')) return Infinity;
				}
			},
			targetInRange(card, player, target) {
				var level = player.countMark('qmsgswkjsgj_shenci_miaojian');
				if (level < 2) {
					if (_status.event.skill == 'qmsgswkjsgj_shenci_miaojian') {
						return true;
					}
				} else {
					// var natures = get.natureList(Array.isArray(card) ? card[3] : card);
					if (get.name(card) == 'sha' && get.natureList(card).includes('stab')) return true;
				}
			},
			// cardnature(card,player){
			// 	var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
			// 	if(level>=2){
			// 		if(card.name=='sha')return 'stab';
			// 	}
			// },
		},
		viewAs: function (card, player) {
			var next = { name: 'sha', nature: 'stab', storage: { qmsgswkjsgj_shenci_miaojian: true } };
			var level = player.countMark('qmsgswkjsgj_shenci_miaojian');
			next.isCard = true;
			return next;
		},
		filterCard: function (card, player) {
			// var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
			// if(level==0)return get.type2(card) == "basic";
			return false;
		},
		selectCard: () => {
			// var player= get.player();
			// var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
			// if(level==0)return 1;
			return -1;
		},
		precontent() {
			var player = player || get.player();
			var level = player.countMark('qmsgswkjsgj_shenci_miaojian');
			if (level != 2) {
				event.getParent().addCount = false;
			}
		},
		// check(card) {
		// 	if (card) {
		// 		return 6.5 - get.value(card);
		// 	}
		// 	return 1;
		// },
		position: 'hes',
		group: ['qmsgswkjsgj_shenci_miaojian_viewAs3'],
		derivation: ['qmsgswkjsgj_shenci_miaojian1', 'qmsgswkjsgj_shenci_miaojian2'],
		subSkill: {
			backup: { audio: 'qmsgswkjsgj_shenci_miaojian' },
			viewAs: {
				audio: 'qmsgswkjsgj_shenci_miaojian',
				filter(event, player) {
					var level = player.countMark('qmsgswkjsgj_shenci_miaojian');
					if (level < 1) return false;
					return event.card.name == 'sha' && !event.card.hasNature('stab');
				},
				trigger: {
					player: 'useCard1',
				},
				check(event, player) {
					let eff = 0,
						nature = event.card.nature;
					for (let i = 0; i < event.targets.length; i++) {
						eff -= get.effect(event.targets[i], event.card, player, player);
						event.card.nature = 'stab';
						eff += get.effect(event.targets[i], event.card, player, player);
						event.card.nature = nature;
					}
					return eff > 0;
				},
				prompt2(event, player) {
					return '将' + get.translation(event.card) + '改为刺属性';
				},
				content() {
					game.setNature(trigger.card, 'stab');
					if (get.itemtype(trigger.card) == 'card') {
						var next = game.createEvent('qmsgswkjsgj_shenci_miaojian_viewAs');
						next.card = trigger.card;
						event.next.remove(next);
						trigger.after.push(next);
						next.setContent(function () {
							game.setNature(trigger.card, []);
						});
					}
				},
			},
			viewAs2: {
				audio: 'qmsgswkjsgj_shenci_miaojian',
				filter(event, player) {
					var level = player.countMark('qmsgswkjsgj_shenci_miaojian');
					if (level < 1) return false;
					return true;
					// return event.card.name=='sha'&&!event.card.hasNature('stab');
				},
				enable: ['chooseToUse'],
				filterCard(card, player) {
					return get.name(card) == 'sha';
				},
				position: 'hes',
				viewAs: {
					name: 'sha',
					nature: 'stab',
				},
				viewAsFilter(player) {
					if (!player.countCards('hes', { name: 'sha' })) {
						return false;
					}
				},
				prompt: '将一张杀当刺杀使用',
				check(card) {
					var val = get.value(card);
					if (_status.event.name == 'chooseToRespond') {
						return 1 / Math.max(0.1, val);
					}
					return 5 - val;
				},
				// trigger:{
				// 	player: "useCard1"
				// },
				// check(event, player) {
				// 	let eff = 0,
				// 		nature = event.card.nature;
				// 	for (let i = 0; i < event.targets.length; i++) {
				// 		eff -= get.effect(event.targets[i], event.card, player, player);
				// 		event.card.nature = "stab";
				// 		eff += get.effect(event.targets[i], event.card, player, player);
				// 		event.card.nature = nature;
				// 	}
				// 	return eff > 0;
				// },
				// prompt2(event, player) {
				// 	return "将" + get.translation(event.card) + "改为刺属性";
				// },
				// content() {
				// 	game.setNature(trigger.card, "stab");
				// 	if (get.itemtype(trigger.card) == "card") {
				// 		var next = game.createEvent("qmsgswkjsgj_shenci_miaojian_viewAs");
				// 		next.card = trigger.card;
				// 		event.next.remove(next);
				// 		trigger.after.push(next);
				// 		next.setContent(function () {
				// 			game.setNature(trigger.card, []);
				// 		});
				// 	}
				// },
			},
			viewAs3: {
				name: '刺杀',
				init(player) {
					var next = ui.create.div('.zb_10202', player);
					next.style.setProperty('--zb_10202-grayscale', '100%');
					next.addEventListener('click', function () {
						var level = player.countMark('qmsgswkjsgj_shenci_miaojian');
						if (game.me == player) {
							if (level < 1) {
								player.say('妙剑至少升级一次才能点击');
							} else {
								if (!player.shhcisha) {
									player.shhcisha = true;
									player.zb_10202.style.setProperty('--zb_10202-grayscale', '0%');
									player.say('进入“刺杀”形态');
									player.update();
									game.check();
								} else {
									player.shhcisha = false;
									player.zb_10202.style.setProperty('--zb_10202-grayscale', '100%');
									player.say('退出“刺杀”形态');
									player.update();
									game.check();
								}
							}
						} else {
							player.say('是你的妙剑吗就瞎几把点？');
						}
					});
					player.zb_10202 = next;
				},
				onremove(player) {
					if (player.zb_10202) delete player.zb_10202;
					if (player.shhcisha) delete player.shhcisha;
				},
				enable: ['chooseToUse', 'chooseToRespond', 'chooseCard'],
				filter(event, player) {
					var level = player.countMark('qmsgswkjsgj_shenci_miaojian');
					if (level < 1) {
						// player.say('妙剑至少升级一次才能点击')
						return false;
					} else return true;
				},
				popup: false,
				content() {
					var level = player.countMark('qmsgswkjsgj_shenci_miaojian');
					if (level < 1) {
						player.say('妙剑至少升级一次才能点击');
					} else {
						if (!player.shhcisha) {
							player.shhcisha = true;
							player.zb_10202.style.setProperty('--zb_10202-grayscale', '0%');
							player.say('进入“刺杀”形态');
							player.update();
							game.check();
						} else {
							player.shhcisha = false;
							player.zb_10202.style.setProperty('--zb_10202-grayscale', '100%');
							player.say('退出“刺杀”形态');
							player.update();
							game.check();
						}
					}
				},
				mod: {
					cardnature(card, player) {
						var level = player.countMark('qmsgswkjsgj_shenci_miaojian');
						if (level >= 2) {
							if (player.shhcisha) {
								if (get.name(card) == 'sha') return 'stab';
							}
						}
					},
				},
			},
			viewAs4: {
				content() {},
			},
		},
		ai: {
			order: 7,
			result: { player: 1 },
		},
	},
	qmsgswkjsgj_shenci_shhlianhua: {
		audio: 'shhlianhua',
		derivation: ['qmsgswkjsgj_shenci_shhlianhua1', 'qmsgswkjsgj_shenci_shhlianhua2'],
		trigger: { target: 'useCardToTargeted' },
		// forced: true,
		// locked: false,
		// filter: event => event.card.name == "sha",
		filter: function (event, player) {
			var level = player.countMark('qmsgswkjsgj_shenci_shhlianhua');
			if (level < 2) return event.card.name == 'sha';
			return event.player != player;
		},
		cost() {
			var eff = get.effect(player, trigger.card, trigger.player, trigger.player);
			var level = player.countMark('qmsgswkjsgj_shenci_shhlianhua');
			if (level < 2) {
				event.result = { bool: true };
			} else {
				event.result = player
					.chooseBool(get.prompt2('qmsgswkjsgj_shenci_shhlianhua'))
					.set('ai', function () {
						var num = _status.event.eff;
						return num < 0;
					})
					.set('eff', eff)
					.forResult();
			}
		},
		content() {
			'step 0';
			player.draw();
			var level = player.countMark('qmsgswkjsgj_shenci_shhlianhua');
			event.level = level;
			// if(level==0){
			// 	event.goto(3);
			// }
			('step 1');
			var eff = get.effect(player, trigger.card, trigger.player, trigger.player);
			trigger.player
				.chooseToDiscard('he', '弃置一张牌，或令' + get.translation(trigger.card) + '对' + get.translation(player) + '无效')
				.set('ai', function (card) {
					if (_status.event.eff > 0) {
						return 10 - get.value(card);
					}
					return 0;
				})
				.set('eff', eff);
			('step 2');
			if (result.bool == false) {
				trigger.getParent().excluded.add(player);
				event.finish();
			}
			('step 3');
			player
				.judge(function (result) {
					if (event.level == 2) return get.suit(result) != 'heart' ? 1 : -1;
					else if (event.level == 1) return get.color(result) == 'black' ? 1 : -1;
					else return get.suit(result) == 'spade' ? 1 : -1;
				})
				.set('judge2', (result) => result.bool);
			('step 4');
			if (result.bool) {
				trigger.excluded.add(player);
			}
		},
		ai: {
			effect: {
				target_use(card, player, target, current) {
					if (card.name == 'sha' && current < 0) {
						return 0.7;
					}
				},
			},
		},
	},

	//周宣
	qmsgswkjsgj_shenci_dcwumei: {
		audio: 'dcwumei',
		round: 1,
		trigger: { player: 'phaseBeforeEnd' },
		filter(event, player) {
			if (event.finished) {
				return false;
			}
			return !player.isTurnedOver() || event._noTurnOver; //笑点解析：回合开始前，但是翻面不能发动
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill))
				.set('ai', (target) => get.attitude(get.player(), target))
				.forResult();
		},
		onRound(event) {
			return !event.wumei_phase;
		},
		async content(event, trigger, player) {
			const [target] = event.targets;
			const next = target.insertPhase();
			target.addSkill('qmsgswkjsgj_shenci_dcwumei_wake');
			target.storage['qmsgswkjsgj_shenci_dcwumei_wake'][2].add(next);
			if (!trigger._finished) {
				trigger.finish();
				trigger._finished = true;
				trigger.untrigger(true);
				trigger._triggered = 5;
				if (!lib.onround.includes(lib.skill.qmsgswkjsgj_shenci_dcwumei.onRound)) {
					lib.onround.push(lib.skill.qmsgswkjsgj_shenci_dcwumei.onRound);
				}
				const evt = player.insertPhase();
				evt.wumei_phase = true;
				evt.phaseList = trigger.phaseList;
				evt.relatedEvent = trigger.relatedEvent || trigger.getParent(2);
				evt.skill = trigger.skill;
				evt._noTurnOver = true;
				evt.set('phaseList', trigger.phaseList);
				evt.pushHandler('qmsgswkjsgj_shenci_dcwumei_phase', (event, option) => {
					if (event.step === 0 && option.state === 'begin') {
						event.step = 4;
						_status.globalHistory.push({
							cardMove: [],
							custom: [],
							useCard: [],
							changeHp: [],
							everything: [],
						});
						var players = game.players.slice(0).concat(game.dead);
						for (var i = 0; i < players.length; i++) {
							var current = players[i];
							current.actionHistory.push({
								useCard: [],
								respond: [],
								skipped: [],
								lose: [],
								gain: [],
								sourceDamage: [],
								damage: [],
								custom: [],
								useSkill: [],
							});
							current.stat.push({ card: {}, skill: {} });
						}
					}
				});
			}
			const nexts = trigger.getParent()?.next;
			if (nexts?.length) {
				for (let evt of nexts.slice(0)) {
					if (evt.finished) {
						continue;
					}
					if (evt == next) {
						break;
					}
					nexts.remove(evt);
					nexts.push(evt);
				}
			}
		},
		subSkill: {
			wake: {
				init(player, skill) {
					if (!player.storage[skill]) {
						player.storage[skill] = [[], [], []];
					}
				},
				charlotte: true,
				onremove: true,
				trigger: {
					player: ['phaseBegin', 'phaseEnd'],
					source: 'damageBegin2',
				},
				filter(event, player) {
					if (event.name == 'damage') return true;
					return player.storage['qmsgswkjsgj_shenci_dcwumei_wake'][2].includes(event);
				},
				// forced: true,
				locked: true,
				cost() {
					if (event.triggername == 'damageBegin2') {
						event.result = player
							.chooseBool('是否令即将对' + get.translation(trigger.player) + '造成的伤害+1？<br>作者临时打了补丁，这个加伤加了可以。')
							.set('ai', function () {
								var att = get.attitude(player, trigger.player);
								if (att < 0) return true;
								else return false;
							})
							.forResult();
					} else {
						event.result = { bool: true };
					}
				},
				popup: false,
				async content(event, trigger, player) {
					const name = event.triggername;
					if (name == 'damageBegin2') {
						trigger.num++;
					} else if (name === 'phaseBegin') {
						for (const playerx of game.filterPlayer()) {
							player.storage[event.name][0].push(playerx);
							player.storage[event.name][1].push(playerx.hp);
						}
						player.markSkill(event.name);
					} else {
						const storage = player.getStorage(event.name);
						if (storage.length) {
							for (let i = 0; i < storage[0].length; i++) {
								const target = storage[0][i];
								if (target?.isIn?.()) {
									if (target.hp != storage[1][i]) {
										game.log(target, '将体力从', '#y' + target.hp, '改为', '#g' + storage[1][i]);
										const next = target.changeHp(storage[1][i] - target.hp);
										next._triggered = null;
										await next;
									}
								}
							}
						}
						player.storage[event.name][2].remove(trigger);
						player.storage[event.name][0] = player.storage[event.name][1] = [];
						player[player.storage[event.name][2].length ? 'unmarkSkill' : 'removeSkill'](event.name);
					}
				},
				marktext: '梦',
				intro: {
					markcount: (storage = [[]]) => storage[0].length,
					content(storage = [[]], player) {
						if (!storage.length) {
							return '无信息';
						}
						var str = '所有角色于回合开始时的体力值：<br>';
						for (var i = 0; i < storage[0].length; i++) {
							var str2 = get.translation(storage[0][i]) + '：' + storage[1][i];
							if (!storage[0][i].isIn()) {
								str2 = '<span style="opacity:0.5">' + str2 + '（已故）</span>';
							}
							str += '<li>' + str2;
						}
						return str;
					},
				},
				global: 'qmsgswkjsgj_shenci_dcwumei_all',
			},
			all: {
				mod: {
					aiOrder(player, card, num) {
						if (num <= 0 || !game.hasPlayer((t) => t.marks['qmsgswkjsgj_shenci_dcwumei_wake'])) {
							return;
						}
						if (get.tag(card, 'recover') && !_status.event.dying && player.hp > 0) {
							return 0;
						}
						if (get.tag(card, 'damage')) {
							if (
								card.name == 'sha' &&
								game.hasPlayer((cur) => {
									return cur.hp < 2 && player.canUse(card, cur, null, true) && get.effect(cur, card, player, player) > 0;
								})
							) {
								return num;
							}
							if (player.needsToDiscard()) {
								return num / 5;
							}
							return 0;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_shenci_dczhanmeng: {
		audio: 'dczhanmeng',
		trigger: { player: ['useCard', 'respond'] },
		filter(event, player) {
			return (
				!player.hasStorage('qmsgswkjsgj_shenci_dczhanmeng_choice', 1) ||
				!player.hasStorage('qmsgswkjsgj_shenci_dczhanmeng_choice', 2) ||
				(!player.hasStorage('qmsgswkjsgj_shenci_dczhanmeng_choice', 0) &&
					!game.hasPlayer2((current) => {
						const history = current.actionHistory;
						if (history.length < 2) {
							return false;
						}
						for (let i = history.length - 2; i >= 0; i--) {
							if (history[i].isSkipped) {
								continue;
							}
							const list = history[i].useCard.map((evt) => evt.card.name);
							return list.includes(event.card.name);
						}
						return false;
					}, true))
			);
			// return true;
		},
		async cost(event, trigger, player) {
			let list = [],
				choiceList = ['上回合若没有同名牌被使用过，你获得一张非伤害牌', '下回合当同名牌被使用后，你获得一张伤害牌', '弃置一名其他角色两张牌，对其造成1点火焰伤害'];
			let used = game.hasPlayer2((current) => {
				let history = current.actionHistory;
				if (history.length < 2) {
					return false;
				}
				for (let i = history.length - 2; i >= 0; i--) {
					if (history[i].isSkipped) {
						continue;
					}
					const list = history[i].useCard.map((evt) => evt.card.name);
					return list.includes(trigger.card.name);
				}
				return false;
			}, true);
			if (!player.hasStorage('qmsgswkjsgj_shenci_dczhanmeng_choice', 0) && !used) {
				list.push('选项一');
			} else {
				choiceList[0] = '<span style="opacity:0.5; ">' + choiceList[0] + (used ? '（同名牌被使用过）' : '（已选择）') + '</span>';
			}
			if (!player.hasStorage('qmsgswkjsgj_shenci_dczhanmeng_choice', 1)) {
				list.push('选项二');
			} else {
				choiceList[1] = '<span style="opacity:0.5">' + choiceList[1] + '（已选择）</span>';
			}
			let other = game.hasPlayer((current) => current != player);
			if (!player.hasStorage('qmsgswkjsgj_shenci_dczhanmeng_choice', 2) && other) {
				list.push('选项三');
			} else {
				choiceList[2] = '<span style="opacity:0.5">' + choiceList[2] + (!other ? '（没人啦）' : '（已选择）') + '</span>';
			}
			const result = await player
				.chooseControl(list, 'cancel2')
				.set('prompt', get.prompt('qmsgswkjsgj_shenci_dczhanmeng'))
				.set('ai', (event, player) => {
					const choices = _status.event.controls.slice().remove('cancel2'),
						evt = _status.event.getTrigger();
					if (choices.includes('选项三')) {
						if (
							game.hasPlayer((current) => {
								if (current == player || !current.countDiscardableCards(current, 'he')) {
									return false;
								}
								let eff1 = get.effect(current, { name: 'guohe_copy2' }, player, player) + 0.1,
									eff2 = get.damageEffect(current, player, player, 'fire') + 0.1;
								if (eff1 < 0 && eff2 < 0) {
									return false;
								}
								return eff1 * eff2 > 0;
							})
						) {
							return '选项三';
						}
						choices.remove('选项三');
					}
					if (choices.includes('选项二')) {
						if (evt.card.name == 'sha') {
							return '选项二';
						}
						if (get.type(evt.card, null, false) == 'equip') {
							choices.remove('选项二');
						}
					}
					if (!choices.length) {
						return 'cancel2';
					}
					return choices.randomGet();
				})
				.set('choiceList', choiceList)
				.forResult();
			event.result = {
				bool: result?.control ? result.control != 'cancel2' : false,
				cost_data: result?.control,
			};
		},
		popup: false,
		async content(event, trigger, player) {
			// player.markAuto("qmsgswkjsgj_shenci_dczhanmeng_choice", ["选项一", "选项二", "选项三"].indexOf(event.cost_data), true);
			// player.addTempSkill("qmsgswkjsgj_shenci_dczhanmeng_choice");
			if (event.cost_data != '选项三') {
				await player.logSkill(event.name);
				game.log(player, '选择了', '#y' + event.cost_data);
			}
			if (event.cost_data == '选项一') {
				let card = get.cardPile2((card) => {
					return !get.tag(card, 'damage');
				});
				if (card) {
					await player.gain(card, 'gain2');
				}
			} else if (event.cost_data == '选项二') {
				trigger['qmsgswkjsgj_shenci_dczhanmeng_' + player.playerid] = true;
				player.addSkill('qmsgswkjsgj_shenci_dczhanmeng_delay');
			} else {
				const result = await player
					.chooseTarget('占梦：弃置一名其他角色两张牌，对其造成1点火焰伤害', lib.filter.notMe, true)
					.set('ai', (target) => {
						let player = _status.event.player;
						let eff1 = get.effect(target, { name: 'guohe_copy2' }, player, player) + 0.1,
							eff2 = get.damageEffect(target, player, player, 'fire') + 0.1;
						if (eff1 < 0 && eff2 < 0) {
							return -eff1 * eff2;
						}
						return eff1 * eff2;
					})
					.forResult();
				if (result?.bool && result.targets?.length) {
					const target = result.targets[0];
					await player.logSkill(event.name, target);
					game.log(player, '选择了', '#y选项三');
					if (target.countDiscardableCards(player, 'he')) {
						await player.discardPlayerCard(2, target, 'he', true);
						// if (result2?.bool && result2.cards?.length) {
						// 	let num = result2.cards.reduce((sum, card) => sum + get.number(card, false), 0);
						// 	if (num > 10) {
						// 	}
						// }
					}
					player.line(target, 'fire');
					await target.damage('fire');
				}
			}
		},
		subSkill: {
			choice: {
				charlotte: true,
				onremove: true,
			},
			delay: {
				charlotte: true,
				trigger: { global: ['useCardAfter', 'phaseBeginStart'] },
				filter(event, player, name) {
					let history = player.actionHistory;
					if (history.length < 2) {
						return false;
					}
					let list = history[history.length - 2].useCard;
					if (name == 'phaseBeginStart') {
						return !list.some((evt) => evt['qmsgswkjsgj_shenci_dczhanmeng_' + player.playerid]);
					}
					for (let evt of list) {
						if (
							evt['qmsgswkjsgj_shenci_dczhanmeng_' + player.playerid] &&
							event.card.name == evt.card.name
							// &&
							// game
							// 	.getGlobalHistory("useCard", evtx => {
							// 		return evtx.card.name == event.card.name;
							// 	})
							// 	.indexOf(event) == 0
						) {
							return true;
						}
					}
					return false;
				},
				forced: true,
				popup: false,
				silent: true,
				async content(event, trigger, player) {
					if (event.triggername != 'phaseBeginStart') {
						await player.logSkill('qmsgswkjsgj_shenci_dczhanmeng');
						let card = get.cardPile2((card) => {
							return get.tag(card, 'damage');
						});
						if (card) {
							await player.gain(card, 'gain2');
						}
					} else {
						player.removeSkill(event.name);
					}
				},
			},
		},
		ai: { threaten: 8 },
	},

	//曹髦
	qmsgswkjsgj_shenci_mbqianlong: {
		audio: 'mbqianlong',
		persevereSkill: true,
		trigger: {
			player: ['qmsgswkjsgj_shenci_mbqianlong_beginAfter', 'qmsgswkjsgj_shenci_mbqianlong_addAfter' /*, "qmsgswkjsgj_shenci_mbweitongAfter"*/],
		},
		filter(event, player) {
			let skills = [];
			let current = player.additionalSkills?.qmsgswkjsgj_shenci_mbqianlong?.length ?? 0;
			let target = player.countMark('qmsgswkjsgj_shenci_mbqianlong') == lib.skill.qmsgswkjsgj_shenci_mbqianlong.maxMarkCount ? lib.skill.qmsgswkjsgj_shenci_mbqianlong.derivation.length : Math.floor(player.countMark('qmsgswkjsgj_shenci_mbqianlong') / 20);
			return target > current;
		},
		forced: true,
		popup: false,
		locked: false,
		beginMarkCount: 30,
		maxMarkCount: 99,
		derivation: ['qmsgswkjsgj_shenci_mbcmqingzheng', 'qmsgswkjsgj_shenci_mbcmjiushi', 'qmsgswkjsgj_shenci_mbcmfangzhu', 'qmsgswkjsgj_shenci_cmhuituo', 'qmsgswkjsgj_shenci_mbjuejin'],
		addMark(player, num) {
			num = Math.min(num, lib.skill.qmsgswkjsgj_shenci_mbqianlong.maxMarkCount - player.countMark('qmsgswkjsgj_shenci_mbqianlong'));
			player.addMark('qmsgswkjsgj_shenci_mbqianlong', num);
		},
		group: ['qmsgswkjsgj_shenci_mbqianlong_begin', 'qmsgswkjsgj_shenci_mbqianlong_add', 'qmsgswkjsgj_shenci_mbqianlong_die'],
		async content(event, trigger, player) {
			const derivation = lib.skill.qmsgswkjsgj_shenci_mbqianlong.derivation,
				skills = player.countMark('qmsgswkjsgj_shenci_mbqianlong') == lib.skill.qmsgswkjsgj_shenci_mbqianlong.maxMarkCount ? derivation : derivation.slice(0, Math.floor(player.countMark('qmsgswkjsgj_shenci_mbqianlong') / 20));
			player.addAdditionalSkill('qmsgswkjsgj_shenci_mbqianlong', skills);
		},
		marktext: '道',
		intro: {
			name: '道心(潜龙)',
			name2: '道心',
			content: '当前道心数为#',
		},
		subSkill: {
			begin: {
				audio: 'qmsgswkjsgj_shenci_mbqianlong',
				persevereSkill: true,
				trigger: {
					global: 'phaseBefore',
					player: 'enterGame',
				},
				filter(event, player) {
					return event.name != 'phase' || game.phaseNumber == 0;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					const num = lib.skill.qmsgswkjsgj_shenci_mbqianlong.beginMarkCount;
					lib.skill.qmsgswkjsgj_shenci_mbqianlong.addMark(player, num);
				},
			},
			add: {
				audio: 'qmsgswkjsgj_mbqianlong',
				persevereSkill: true,
				trigger: {
					player: ['gainAfter', 'damageEnd'],
					source: 'damageSource',
					global: 'loseAsyncAfter',
				},
				filter(event, player) {
					if (player.countMark('qmsgswkjsgj_shenci_mbqianlong') >= lib.skill.qmsgswkjsgj_shenci_mbqianlong.maxMarkCount) {
						return false;
					}
					if (event.name === 'damage') {
						return event.num > 0;
					}
					return event.getg(player).length > 0;
				},
				getIndex(event, player, triggername) {
					if (event.name === 'damage') {
						return event.num;
					}
					return 1;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					let toAdd = 10 * (1 + (trigger.name === 'damage'));
					lib.skill.qmsgswkjsgj_shenci_mbqianlong.addMark(player, toAdd);
				},
			},
			die: {
				trigger: {
					player: 'dieBefore',
				},
				charlotte: true,
				firstDo: true,
				forced: true,
				popup: false,
				forceDie: true,
				async content(event, trigger, player) {
					player.changeSkin({ characterName: 'qmsgswkjsgj_shenci_caomao' }, 'qmsgswkjsgj_shenci_caomao_dead');
				},
			},
		},
	},
	qmsgswkjsgj_shenci_mbweitong: {
		audio: 'mbweitong',
		persevereSkill: true,
		zhuSkill: true,
		trigger: {
			global: ['phaseBefore', 'recoverAfter'],
			player: 'enterGame',
		},
		filter(event, player) {
			if (event.name == 'recover') return event.player != player && event.player.group == 'wei' && player.hasZhuSkill('qmsgswkjsgj_shenci_mbweitong', event.player);
			return event.name != 'phase' || game.phaseNumber == 0;
		},
		// forced: true,
		cost() {
			if (event.triggername == 'recoverAfter') {
				event.result = player.chooseBool(get.prompt2('qmsgswkjsgj_shenci_mbweitong')).set('ai', true).forResult();
			} else {
				event.result = { bool: true };
			}
		},
		locked: false,
		async content(event, trigger, player) {
			// const num = game.countPlayer(current => {
			// 	return current !== player && current.group === "wei" && player.hasZhuSkill("qmsgswkjsgj_shenci_mbweitong", current);
			// });
			if (event.triggername == 'recoverAfter') {
				player.draw();
			}
			if (
				game.hasPlayer((current) => {
					return current !== player && current.group === 'wei' && player.hasZhuSkill('qmsgswkjsgj_shenci_mbweitong', current);
				})
			)
				lib.skill.qmsgswkjsgj_shenci_mbqianlong.addMark(player, 60);
		},
		ai: {
			combo: 'qmsgswkjsgj_shenci_mbqianlong',
		},
	},
	qmsgswkjsgj_shenci_mbcmqingzheng: {
		audio: 'mbcmqingzheng',
		persevereSkill: true,
		trigger: { player: 'phaseUseBegin' },
		filter(event, player) {
			return player.countCards('h') > 0 && game.hasPlayer((current) => player != current && current.countCards('h') > 0);
		},
		/**
		 * player选择target的一种花色的牌
		 * @param {Player} player
		 * @param {Player} target
		 */
		chooseOneSuitCard(player, target, force = false, limit, str = '请选择一个花色的牌', ai = { bool: false }) {
			const { promise, resolve } = Promise.withResolvers();
			const event = _status.event;
			event.selectedCards = [];
			event.selectedButtons = [];
			//对手牌按花色分类
			let suitCards = Object.groupBy(target.getCards('h'), (c) => get.suit(c, target));
			suitCards.heart ??= [];
			suitCards.diamond ??= [];
			suitCards.spade ??= [];
			suitCards.club ??= [];
			let dialog = (event.dialog = ui.create.dialog());
			dialog.classList.add('fullheight');
			event.control_ok = ui.create.control('ok', (link) => {
				_status.imchoosing = false;
				event.dialog.close();
				event.control_ok?.close();
				event.control_cancel?.close();
				event._result = {
					bool: true,
					cards: event.selectedCards,
				};
				resolve(event._result);
				game.resume();
			});
			event.control_ok.classList.add('disabled');
			//如果是非强制的，才创建取消按钮
			if (!force) {
				event.control_cancel = ui.create.control('cancel', (link) => {
					_status.imchoosing = false;
					event.dialog.close();
					event.control_ok?.close();
					event.control_cancel?.close();
					event._result = {
						bool: false,
					};
					resolve(event._result);
					game.resume();
				});
			}
			event.switchToAuto = function () {
				_status.imchoosing = false;
				event.dialog?.close();
				event.control_ok?.close();
				event.control_cancel?.close();
				event._result = ai();
				resolve(event._result);
				game.resume();
			};
			dialog.addNewRow(str);
			let keys = Object.keys(suitCards).sort((a, b) => {
				let arr = ['spade', 'heart', 'club', 'diamond', 'none'];
				return arr.indexOf(a) - arr.indexOf(b);
			});
			//添加框
			while (keys.length) {
				let key1 = keys.shift();
				let cards1 = suitCards[key1];
				let key2 = keys.shift();
				let cards2 = suitCards[key2];
				//点击容器的回调
				/**@type {Row_Item_Option['clickItemContainer']} */
				const clickItemContainer = function (container, item, allContainer) {
					if (!item?.length || item.some((card) => !lib.filter.cardDiscardable(card, player, event.name))) {
						return;
					}
					if (event.selectedButtons.includes(container)) {
						container.classList.remove('selected');
						event.selectedButtons.remove(container);
						event.selectedCards.removeArray(item);
					} else {
						if (event.selectedButtons.length >= limit) {
							let precontainer = event.selectedButtons[0];
							precontainer.classList.remove('selected');
							event.selectedButtons.remove(precontainer);
							let suit = get.suit(event.selectedCards[0], target),
								cards = target.getCards('h', { suit: suit });
							event.selectedCards.removeArray(cards);
						}
						container.classList.add('selected');
						event.selectedButtons.add(container);
						event.selectedCards.addArray(item);
					}
					event.control_ok.classList[event.selectedButtons.length === limit ? 'remove' : 'add']('disabled');
				};
				//给框加封条，显示xxx牌多少张
				function createCustom(suit, count) {
					return function (itemContainer) {
						function formatStr(str) {
							return str.replace(/(?:♥︎|♦︎)/g, '<span style="color: red; ">$&</span>');
						}
						let div = ui.create.div(itemContainer);
						if (count) {
							div.innerHTML = formatStr(`${get.translation(suit)}牌${count}张`);
						} else {
							div.innerHTML = formatStr(`没有${get.translation(suit)}牌`);
						}
						div.css({
							position: 'absolute',
							width: '100%',
							bottom: '1%',
							height: '35%',
							background: '#352929bf',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							fontSize: '1.2em',
							zIndex: '2',
						});
					};
				}
				//框的样式，不要太宽，高度最小也要100px，防止空框没有高度
				/**@type {Row_Item_Option['itemContainerCss']} */
				let itemContainerCss = {
					border: 'solid #c6b3b3 2px',
					minHeight: '100px',
				};
				if (key2) {
					dialog.addNewRow(
						{
							item: cards1,
							ItemNoclick: true, //卡牌不需要被点击
							clickItemContainer,
							custom: createCustom(key1, cards1.length), //添加封条
							itemContainerCss,
						},
						{
							item: cards2,
							ItemNoclick: true, //卡牌不需要被点击
							clickItemContainer,
							custom: createCustom(key2, cards2.length),
							itemContainerCss,
						},
					);
				} else {
					dialog.addNewRow({
						item: cards1,
						ItemNoclick: true, //卡牌不需要被点击
						clickItemContainer,
						custom: createCustom(key1, cards1.length),
						itemContainerCss,
					});
				}
			}
			game.pause();
			dialog.open();
			_status.imchoosing = true;
			return promise;
		},
		async cost(event, trigger, player) {
			const list = get.addNewRowList(player.getCards('h'), 'suit', player);
			let limit = event.skill === 'sbqingzheng' ? 3 - player.countMark('sbjianxiong') : 1;
			// const result = await player.chooseButtonTarget({
			// 	createDialog: [
			// 		[
			// 			[[`${get.prompt(event.skill)}<div class="text center">${get.translation(event.skill, "info")}</div>`], "addNewRow"],
			// 			[
			// 				dialog => {
			// 					dialog.classList.add("fullheight");
			// 					// 不添加scroll1和scroll2的类名
			// 					dialog.forcebutton = false;
			// 					dialog._scrollset = false;
			// 				},
			// 				"handle",
			// 			],
			// 			list.map(item => [Array.isArray(item) ? item : [item], "addNewRow"]),
			// 		],
			// 	],
			// 	filterButton(button) {
			// 		const player = get.player();
			// 		if (!button.links.length || button.links.some(card => !lib.filter.cardDiscardable(card, player, get.event().getParent().skill))) {
			// 			return false;
			// 		}
			// 		return true;
			// 	},
			// 	selectButton: limit,
			// 	limit,
			// 	filterTarget(card, player, target) {
			// 		return target != player && target.countCards("h");
			// 	},
			// 	ai1(button) {
			// 		const player = get.player();
			// 		if (!game.hasPlayer(current => player != current && current.countDiscardableCards(player, "h") > 0 && get.attitude(player, current) < 0)) {
			// 			return 0;
			// 		}
			// 		let values = button.links.map(i => get.value(i)).reduce((p, c) => p + c, 0) / button.links.length;
			// 		if (button.links.length > 4 || values > 6) {
			// 			return 0;
			// 		}
			// 		return (13 - button.links.length) / values;
			// 	},
			// 	ai2(target) {
			// 		const player = get.player(),
			// 			att = get.attitude(player, target);
			// 		if (att >= 0) {
			// 			return 0;
			// 		}
			// 		return 1 - att / 2 + Math.sqrt(target.countCards("h"));
			// 	},
			// }).forResult();
			const result = await player
				.chooseCardTarget({
					// prompt:'',
					prompt2: '弃置一张牌并选择一名其他角色，观看其手牌并弃置其中一种花色的所有牌。然后对其造成1点伤害',
					filterCard(card, player) {
						return lib.filter.cardDiscardable(card, player);
					},
					selectCard: 1,
					filterTarget(card, player, target) {
						return target != player && target.countCards('h');
					},
					ai1: function (card) {
						return 6 - get.value(card);
					},
					ai2(target) {
						const player = get.player(),
							att = get.attitude(player, target);
						if (att >= 0) {
							return 0;
						}
						return 1 - att / 2 + Math.sqrt(target.countCards('h'));
					},
				})
				.forResult();
			event.result = {
				bool: result?.bool,
				cost_data: result?.cards,
				targets: result?.targets,
			};
			// if (event.result.bool && result?.links?.length) {
			// 	event.result.cards = player.getCards("h").filter(card => result.links.includes(get.suit(card, player)));
			// }
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
				cost_data: cards1,
			} = event;
			await player.discard(cards1);
			if (
				!target.countCards('h') ||
				lib.suits
					.slice()
					.filter((suit) => target.hasCard((card, playerx) => get.suit(card, playerx) === suit, 'h'))
					.every((suit) => target.hasCard((card, playerx) => get.suit(card, playerx) === suit && !lib.filter.cardDiscardable(card, player), 'h'))
			) {
				if (target.countCards('h')) {
					const content = [`###清正###<div class="text center">${get.translation(target)}的手牌</div>`, target.getCards('h')];
					await player.chooseControl('ok').set('dialog', content);
				}
				return;
			}
			const list = get.addNewRowList(target.getCards('h'), 'suit', target);
			let result = await player
				.chooseButton(
					[
						[
							[[`清正：弃置${get.translation(target)}一种花色的所有牌`], 'addNewRow'],
							[
								(dialog) => {
									dialog.classList.add('fullheight');
									dialog.forcebutton = false;
									dialog._scrollset = false;
								},
								'handle',
							],
							list.map((item) => [Array.isArray(item) ? item : [item], 'addNewRow']),
						],
					],
					true,
				)
				.set('filterButton', (button) => {
					const player = get.player();
					if (!button.links.length || button.links.some((card) => !lib.filter.cardDiscardable(card, player, get.event().getParent().name))) {
						return false;
					}
					return true;
				})
				.set('ai', (button) => {
					const player = get.player();
					return button.links.length;
				})
				.forResult();
			if (!result?.links?.length) {
				return;
			}
			const cards2 = target.getDiscardableCards(player, 'h').filter((card) => result.links.includes(get.suit(card, target)));
			if (cards2.length) {
				await target.discard(cards2, 'notBySelf').set('discarder', player);
			}
			// if (cards1.length > cards2.length) {
			await target.damage(player);
			// }
			if (event.name !== 'sbqingzheng' || player.countMark('sbjianxiong') >= 2) {
				return;
			}
			if (['sbjianxiong', 'jdjianxiong'].some((skill) => player.hasSkill(skill, null, null, false))) {
				result = await player
					.chooseBool('是否获得1枚“治世”？')
					.set('choice', Math.random() >= 0.5)
					.forResult();
				if (result?.bool) {
					player.addMark('sbjianxiong', 1);
				}
			}
		},
	},
	qmsgswkjsgj_shenci_mbcmjiushi: {
		audio: 'mbcmjiushi',
		inherit: 'rejiushi',
		persevereSkill: true,
		subfrequent: null,
		group: ['qmsgswkjsgj_shenci_mbcmjiushi_use', 'qmsgswkjsgj_shenci_mbcmjiushi_turnback', 'qmsgswkjsgj_shenci_mbcmjiushi_gain2'],
		subSkill: {
			use: {
				hiddenCard(player, name) {
					if (name == 'jiu') {
						return !player.isTurnedOver();
					}
					return false;
				},
				audio: 'qmsgswkjsgj_shenci_mbcmjiushi',
				enable: 'chooseToUse',
				filter(event, player) {
					if (player.classList.contains('turnedover')) {
						return false;
					}
					return event.filterCard({ name: 'jiu', isCard: true }, player, event);
				},
				async content(event, trigger, player) {
					if (_status.event.getParent(2).type == 'dying') {
						event.dying = player;
						event.type = 'dying';
					}
					await player.turnOver();
					await player.useCard({ name: 'jiu', isCard: true }, player);
				},
				ai: {
					save: true,
					skillTagFilter(player, tag, arg) {
						return !player.isTurnedOver() && _status.event?.dying == player;
					},
					order: 5,
					result: {
						player(player) {
							if (_status.event.parent.name == 'phaseUse') {
								if (player.countCards('h', 'jiu') > 0) {
									return 0;
								}
								if (player.getEquip('zhuge') && player.countCards('h', 'sha') > 1) {
									return 0;
								}
								if (!player.countCards('h', 'sha')) {
									return 0;
								}
								var targets = [];
								var target;
								var players = game.filterPlayer();
								for (var i = 0; i < players.length; i++) {
									if (get.attitude(player, players[i]) < 0) {
										if (player.canUse('sha', players[i], true, true)) {
											targets.push(players[i]);
										}
									}
								}
								if (targets.length) {
									target = targets[0];
								} else {
									return 0;
								}
								var num = get.effect(target, { name: 'sha' }, player, player);
								for (var i = 1; i < targets.length; i++) {
									var num2 = get.effect(targets[i], { name: 'sha' }, player, player);
									if (num2 > num) {
										target = targets[i];
										num = num2;
									}
								}
								if (num <= 0) {
									return 0;
								}
								var e2 = target.getEquip(2);
								if (e2) {
									if (e2.name == 'tengjia') {
										if (!player.countCards('h', { name: 'sha', nature: 'fire' }) && !player.getEquip('zhuque')) {
											return 0;
										}
									}
									if (e2.name == 'renwang') {
										if (!player.countCards('h', { name: 'sha', color: 'red' })) {
											return 0;
										}
									}
									if (e2.name == 'baiyin') {
										return 0;
									}
								}
								if (player.getEquip('guanshi') && player.countCards('he') > 2) {
									return 1;
								}
								return target.countCards('h') > 3 ? 0 : 1;
							}
							if (player == _status.event.dying || player.isTurnedOver()) {
								return 3;
							}
						},
					},
					effect: {
						target(card, player, target) {
							if (target.isTurnedOver()) {
								if (get.tag(card, 'damage')) {
									if (player.hasSkillTag('jueqing', false, target)) {
										return [1, -2];
									}
									if (target.hp == 1) {
										return;
									}
									return [1, target.countCards('h') / 2];
								}
							}
						},
					},
				},
			},
			turnback: {
				audio: 'qmsgswkjsgj_shenci_mbcmjiushi',
				persevereSkill: true,
				trigger: { player: 'damageEnd' },
				check(event, player) {
					return player.isTurnedOver();
				},
				filter(event, player) {
					if (
						player.hasHistory('useCard', (evt) => {
							if (evt.card.name != 'jiu' || evt.getParent().name != 'qmsgswkjsgj_shenci_mbcmjiushi_use') {
								return false;
							}
							return evt.getParent('damage', true) == event;
						})
					) {
						return false;
					}
					return player.isTurnedOver();
				},
				prompt(event, player) {
					return '是否发动【酒诗】，将武将牌翻面？';
				},
				content() {
					player.turnOver();
				},
			},
			gain2: {
				audio: 'qmsgswkjsgj_shenci_mbcmjiushi',
				persevereSkill: true,
				trigger: { player: 'turnOverAfter' },
				// frequent: true,
				prompt: '是否发动【酒诗】，牌堆或弃牌堆中的一张指定牌名的锦囊牌？',
				async cost(event, trigger, player) {
					var cards = [];
					for (var i of lib.inpile) {
						if (get.type2(i) == 'trick') {
							// cards.push(i);
							cards.push(['锦囊', '', i]);
						}
					}
					var relu = await player
						.chooseButton([[cards, 'vcard']], 1)
						.set('prompt', get.prompt('qmsgswkjsgj_shenci_mbcmjiushi_gain'))
						.forResult();
					if (relu) {
						event.result = {
							bool: true,
							cost_data: {
								name: relu.links ? relu.links[0][2] : '',
							},
						};
					}
				},
				content() {
					var name = event.cost_data.name;
					var card = get.cardPile(function (card) {
						if (name == '') return get.type2(card) == 'trick';
						return card.name == name;
					});
					if (card) {
						player.gain(card, 'draw');
					} else {
						player.say('牌堆和弃牌堆翻遍了都没有我要的牌。');
					}
				},
			},
		},
	},
	qmsgswkjsgj_shenci_mbcmfangzhu: {
		audio: 'mbcmfangzhu',
		persevereSkill: true,
		inherit: 'qmsgswkjsgj_shenci_sbfangzhu',
		filter(event, player) {
			// const target = player.storage.mbcmfangzhu;
			return game.hasPlayer((current) => current !== player);
		},
		usable: 2,
		chooseButton: {
			dialog() {
				const dialog = ui.create.dialog('放逐：令一名其他角色...', 'hidden');
				dialog.add([
					[
						[1, '只能使用一种类型牌直到其回合结束'],
						[2, '非Charlotte技能失效直到其回合结束'],
						[3, '翻面'],
					],
					'textbutton',
				]);
				return dialog;
			},
			check(button) {
				const player = get.player();
				if (button.link === 2) {
					if (
						game.hasPlayer((target) => {
							if (target.hasSkill('qmsgswkjsgj_shenci_mbcmfangzhu_ban') || target.hasSkill('fengyin') || target.hasSkill('baiban')) {
								return false;
							}
							return (
								get.attitude(player, target) < 0 &&
								['name', 'name1', 'name2']
									.map((sum, name) => {
										if (target[name] && (name != 'name1' || target.name != target.name1)) {
											if (get.character(target[name])) {
												return get.rank(target[name], true);
											}
										}
										return 0;
									})
									.reduce((p, c) => {
										return p + c;
									}, 0) > 5
							);
						})
					) {
						return 6;
					}
				}
				return button.link === 1 ? 1 : 0;
			},
			backup(links, player) {
				return {
					num: links[0],
					audio: 'qmsgswkjsgj_shenci_mbcmfangzhu',
					filterCard: () => false,
					selectCard: -1,
					filterTarget(card, player, target) {
						if (target == player) {
							return false;
						}
						const num = lib.skill.mbcmfangzhu_backup.num,
							storage = target.getStorage('qmsgswkjsgj_shenci_mbcmfangzhu_ban');
						return num != 1 || !storage.length;
					},
					async content(event, trigger, player) {
						const target = event.target;
						const num = lib.skill.qmsgswkjsgj_shenci_mbcmfangzhu_backup.num;
						switch (num) {
							case 1:
								var type = [];
								for (var i of lib.inpile) {
									if (get.type2(i) && !type.includes(get.type2(i))) {
										type.push(get.type2(i));
									}
								}
								// type.push('cancel2')
								var relu = await player.chooseControl(type).set('prompt', '选择一个类型').forResult();
								if (relu != 'cancel2') {
									target.addTempSkill('qmsgswkjsgj_shenci_mbcmfangzhu_ban', { player: 'phaseEnd' });
									target.markAuto('qmsgswkjsgj_shenci_mbcmfangzhu_ban', [relu.control]);
									lib.skill.qmsgswkjsgj_mbcmfangzhu_ban.init(target, 'qmsgswkjsgj_shenci_mbcmfangzhu_ban');
								}
								break;
							case 2:
								target.addTempSkill('qmsgswkjsgj_mbcmfangzhu_baiban', { player: 'phaseEnd' });
								break;
							case 3:
								target.turnOver();
								break;
						}
					},
					ai: {
						result: {
							target(player, target) {
								switch (lib.skill.mbcmfangzhu_backup.num) {
									case 1:
										return -target.countCards('h', (card) => get.type(card) != 'trick') - 1;
									case 2:
										return -target.getSkills(null, null, false).reduce((sum, skill) => {
											return sum + Math.max(get.skillRank(skill, 'out'), get.skillRank(skill, 'in'));
										}, 0);
								}
							},
						},
					},
				};
			},
			prompt(links, player) {
				const str = '###放逐###';
				switch (links[0]) {
					case 1:
						return str + '令一名其他角色于手牌中只能使用一种类型牌直到其回合结束';
					case 2:
						return str + '令一名其他角色的非Charlotte技能失效直到其回合结束';
					case 3:
						return str + '令一名其他角色将武将牌翻面';
				}
			},
		},
		ai: {
			order: 10,
			result: {
				player(player) {
					return game.hasPlayer((current) => get.attitude(player, current) < 0) ? 1 : 0;
				},
			},
		},
		subSkill: {
			backup: {},
			baiban: {
				init(player, skill) {
					player.addSkillBlocker(skill);
					player.addTip(skill, '放逐 技能失效');
				},
				onremove(player, skill) {
					player.removeSkillBlocker(skill);
					player.removeTip(skill);
				},
				inherit: 'baiban',
				marktext: '逐',
			},
			ban: {
				init(player, skill) {
					let storage = player.getStorage(skill);
					if (storage.length) {
						player.addTip(skill, '放逐 限' + (storage.length === 1 ? get.translation(storage[0])[0] : '手牌'));
					}
				},
				onremove(player, skill) {
					player.removeTip(skill);
					delete player.storage[skill];
				},
				charlotte: true,
				mark: true,
				marktext: '禁',
				intro: {
					markcount: () => 0,
					content(storage) {
						if (storage.length > 1) {
							return '不能使用手牌';
						}
						return '不能使用手牌中的非' + get.translation(storage[0]) + '牌';
					},
				},
				mod: {
					cardEnabled(card, player) {
						const storage = player.getStorage('qmsgswkjsgj_shenci_mbcmfangzhu_ban');
						const hs = player.getCards('h'),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && !storage.includes(get.type2(card))) {
							return false;
						}
					},
					cardSavable(card, player) {
						const storage = player.getStorage('qmsgswkjsgj_shenci_mbcmfangzhu_ban');
						const hs = player.getCards('h'),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && !storage.includes(get.type2(card))) {
							return false;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_shenci_cmhuituo: {
		// audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		trigger: { player: 'damageEnd' },
		getIndex: (event) => event.num,
		async cost(event, trigger, player) {
			var list = ['该角色回复X点体力', '该角色摸X张牌'];
			var storage = player.countMark('qmsgswkjsgj_shenci_cmhuituo') % 2;
			var str = `${get.poptip('rule_chihengji')}。当你受到1点伤害后，你可以令一名角色进行一次判定，若结果为红色，${list[storage]}；若结果为黑色，${list[storage ? 0 : 1]}。（X为此次伤害的伤害点数）`;
			event.result = await player
				.chooseTarget(str)
				.set('ai', (target) => {
					const player = get.player();
					if (get.attitude(player, target) > 0) {
						return get.recoverEffect(target, player, player) + 1;
					}
					return 0;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			const num = trigger.num;
			var numx = player.countMark('qmsgswkjsgj_shenci_cmhuituo') % 2;
			var list = ['red', 'black'];
			const result = await target
				.judge((card) => {
					if (get.color(card) == list[numx]) {
						return target.isDamaged() ? 1 : -1;
					}
					return 0;
				})
				.forResult();
			if (result.color === list[numx]) {
				await target.recover(num);
			}
			if (result.color === list[numx ? 0 : 1]) {
				await target.draw(num);
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
		},
	},
	qmsgswkjsgj_shenci_mbjuejin: {
		audio: 'mbjuejin',
		persevereSkill: true,
		enable: 'phaseUse',
		limited: true,
		skillAnimation: true,
		animationColor: 'thunder',
		filterCard: () => false,
		selectCard: [-1, -2],
		filterTarget: true,
		selectTarget: [1, Infinity],
		multiline: true,
		async contentBefore(event, trigger, player) {
			game.broadcastAll(() => {
				_status.tempMusic = 'effect_caomaoBJM';
				game.playBackgroundMusic();
			});
			player.changeSkin({ characterName: 'qmsgswkjsgj_shenci_caomao' }, 'qmsgswkjsgj_shenci_caomao_shadow');
			player.awakenSkill(event.skill);
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
				} else {
					await target.recover(num);
				}
			}
			if (delt > 0) {
				await target.changeHujia(num + (player == target ? 2 : 0), null, true);
			} else if (player == target) {
				await target.changeHujia(2, null, true);
			}
		},
		async contentAfter(event, trigger, player) {
			game.addGlobalSkill('mbjuejin_xiangsicunwei');
			player.addSkill('qmsgswkjsgj_shenci_mbjuejin_draw');
			player.$fullscreenpop('向死存魏！', 'thunder');
			const cards = ['cardPile', 'discardPile'].map((pos) => Array.from(ui[pos].childNodes)).flat();
			const filter = (card) => ['shan', 'tao', 'jiu'].includes(card.name);
			const cardx = cards.filter(filter);
			if (cardx.length) {
				await game.cardsGotoSpecial(cardx);
				game.log(cardx, '被移出了游戏');
			}
			for (const target of game.filterPlayer()) {
				const sishis = target.getCards('hej', filter);
				if (sishis.length) {
					target.$throw(sishis);
					game.log(sishis, '被移出了游戏');
					await target.lose(sishis, ui.special);
					if (target == player) {
						await player.draw(sishis.length);
						await player.addMark('qmsgswkjsgj_shenci_cmhuituo', 1, false);
						game.log(player, '反转了' + get.translation('qmsgswkjsgj_shenci_cmhuituo') + '的判定效果。');
					}
				}
			}
		},
		ai: {
			order: 0.1,
			result: {
				player(player) {
					let eff = 1;
					game.countPlayer((current) => {
						const att = get.attitude(player, current),
							num = Math.abs(current.getHp(true) - 1);
						const delt = Math.max(0, num + current.hujia - 5);
						eff -= att * delt;
					});
					return eff > 0 ? 1 : 0;
				},
				target(player, target) {
					const att = get.attitude(player, target),
						num = Math.abs(target.getHp(true) - 1);
					const delt = Math.max(0, num + target.hujia - 5);
					if (target.hasSkill('shangshi')) return 1;
					else if (num + target.hujia - 5 <= 0) return -1;
					else return 0;
				},
			},
		},
		subSkill: {
			xiangsicunwei: {
				trigger: {
					global: ['loseAfter', 'equipAfter', 'loseAsyncAfter', 'cardsDiscardAfter'],
				},
				forced: true,
				silent: true,
				firstDo: true,
				filter(event, player) {
					const nameList = ['shan', 'tao', 'jiu'];
					return event.getd().some((card) => {
						return nameList.includes(get.name(card, false)) && get.position(card, true) === 'd';
					});
				},
				async content(event, trigger, player) {
					const nameList = ['shan', 'tao', 'jiu'];
					const cards = trigger.getd().filter((card) => {
						return nameList.includes(get.name(card, false)) && get.position(card, true) === 'd';
					});
					await game.cardsGotoSpecial(cards);
					game.log(cards, '被移出了游戏');
				},
			},
			draw: {
				persevereSkill: true,
				charlotte: true,
				audio: 'qmsgswkjsgj_shenci_mbjuejin',
				trigger: {
					player: 'loseAfter',
				},
				filter(event, player) {
					var evt = event.getParent(2);
					return evt && evt.skill && evt.skill == 'mbjuejin_xiangsicunwei';
				},
				forced: true,
				async content(event, trigger, player) {
					var num = trigger.cards.length;
					await player.draw(num);
					await player.addMark('qmsgswkjsgj_shenci_cmhuituo', 1, false);
					game.log(player, '反转了' + get.translation('qmsgswkjsgj_shenci_cmhuituo') + '的判定效果。');
				},
			},
		},
	},

	//势于吉
	qmsgswkjsgj_shenci_potfuji: {
		audio: 'potfuji',
		enable: 'phaseUse',
		logAudio: () => 2,
		filter(event, player) {
			return player.countCards('he') > 0 && game.countPlayer();
		},
		filterCard: true,
		position: 'he',
		selectCard: () => [1, game.countPlayer()],
		check(card) {
			const player = get.player();
			// if (
			// 	ui.selected.cards.length >=
			// 	game.countPlayer(current => {
			// 		return get.attitude(player, current) > 0;
			// 	})
			// ) {
			// 	return 0;
			// }
			return get.value(card);
		},
		usable: 1,
		lose: false,
		discard: false,
		delay: false,
		async content(event, trigger, player) {
			const { cards: links } = event;
			await player.showCards(links, get.translation(player) + '发动了【' + get.translation(event.name) + '】');
			var cards = game.cardsGotoOrdering(links);
			var relu = await player
				.YB_yiji(
					cards,
					links.length,
					function () {
						return true;
					},
					'神赐符济',
					'tag:qmsgswkjsgj_shenci_potfuji',
				)
				.forResult();
			if (relu) {
				var gain_list = relu;
				for (const list of gain_list) {
					list[0].addSkill('qmsgswkjsgj_shenci_potfuji_effect');
				}
				// if (player.isMinHandcard()) {
				player.logSkill('qmsgswkjsgj_shenci_potfuji', null, null, null, [3]);
				player.changeSkin({ characterName: 'qmsgswkjsgj_shenci_pot_yuji' }, 'qmsgswkjsgj_shenci_pot_yuji_shadow');
				await player.draw(1);
				player.addTempSkill(['qmsgswkjsgj_shenci_potfuji_sha', 'qmsgswkjsgj_shenci_potfuji_shan', 'qmsgswkjsgj_shenci_potfuji_tao', 'qmsgswkjsgj_shenci_potfuji_jiu'], { player: 'phaseBegin' });
				// }
				player
					.when({ player: ['phaseBegin'] })
					.assign({
						lastDo: true,
					})
					.then(() => {
						player.changeSkin({ characterName: 'qmsgswkjsgj_shenci_pot_yuji' }, 'qmsgswkjsgj_shenci_pot_yuji');
					});
			}
		},
		ai: {
			order: 10,
			result: {
				// target(player, target) {
				// 	var card = ui.selected.cards[ui.selected.targets.length];
				// 	if (!card) {
				// 		return 0;
				// 	}
				// 	if (get.value(card) < 0) {
				// 		return -1;
				// 	}
				// 	return Math.sqrt(5 - Math.min(4, target.countCards("h")));
				// },
				player(player) {
					return 1;
				},
			},
		},
		subSkill: {
			effect: {
				charlotte: true,
				trigger: {
					player: ['useCard', 'useCardAfter'],
					source: ['damageBegin1', 'recoverBegin'],
				},
				mark: true,
				marktext: '符',
				intro: {
					mark(dialog, content, player) {
						const cards = player.getCards('h', (card) => card.hasGaintag('qmsgswkjsgj_shenci_potfuji'));
						if (cards?.length) {
							dialog.addAuto(cards);
						} else {
							dialog.addText('无符济牌');
						}
					},
				},
				filter(event, player, name) {
					const ori_event = event.name === 'damage' || event.name == 'recover' ? event.getParent('useCard') : event;
					if (
						!ori_event ||
						ori_event.name !== 'useCard' ||
						!player.hasHistory('lose', (evt) => {
							const evtx = evt.relatedEvent || evt.getParent();
							if (evtx !== ori_event) {
								return false;
							}
							return Object.values(evt.gaintag_map).flat().includes('qmsgswkjsgj_shenci_potfuji');
						})
					) {
						return false;
					}
					if (name === 'useCard') {
						return true;
					} else {
						if (event.name === 'damage') {
							return ori_event.card.name === 'sha';
						} else if (event.name === 'recover') {
							return ori_event.card.name === 'tao';
						} else {
							['shan', 'jiu'].includes(ori_event.card.name);
						}
					}
					// return name === "useCard" ||
					// 	ori_event.card.name === (event.name==='damage'?'sha':(event.name==='recover'?'tao':'jiu'))
					// ['sha','shan','tao','jiu'].includes(ori_event.card.name)
					/* === (event.name === "damage" ? "sha" : "shan");*/
				},
				forced: true,
				logTarget: 'player',
				popup: false,
				async content(event, trigger, player) {
					if (trigger.name === 'damage' || event.triggername === 'useCardAfter') {
						player.logSkill('qmsgswkjsgj_potfuji', null, null, null, [trigger.name === 'damage' || trigger.card.name === 'jiu' ? 4 : 5]);
					}
					if (trigger.name === 'damage' || trigger.name === 'recover') {
						trigger.num++;
					} else if (event.triggername === 'useCardAfter') {
						if (trigger.card.name === 'jiu') {
							var relu = await player
								.chooseTarget(1, '弃置场上一张牌')
								.set('filterTarget', function (card, player, target) {
									return target.hasCard((card) => lib.filter.canBeDiscarded(card, player, target), 'ej');
								})
								.set('ai', function (target) {
									lib.card.guohe_copy.ai.result.target(player, target, { name: 'guohe_copy', position: 'ej' }) + 1;
								})
								.forResult();
							if (relu.bool) {
								await player.discardPlayerCard(relu.targets[0], 'ej', true);
							}
						} else {
							await player.draw();
						}
					} else {
						const history = player.getHistory('lose', (evt) => {
								if ((evt.relatedEvent || evt.getParent()) !== trigger) {
									return false;
								}
								return Object.values(evt.gaintag_map).flat().includes('qmsgswkjsgj_shenci_potfuji');
							})[0],
							cards = history.getl(player).cards2.filter((card) => history.gaintag_map[card.cardid]?.includes('qmsgswkjsgj_shenci_potfuji'));
						let gains = [];
						for (const card of cards) {
							const gain = get.cardPile2((gain) => !gains.includes(gain) && get.suit(gain) === get.suit(card, false));
							if (gain) {
								gains.push(gain);
							}
						}
						if (gains.length) {
							await player.gain(gains, 'gain2');
						}
					}
				},
				mod: {
					ignoredHandcard(card, player) {
						if (card.hasGaintag('qmsgswkjsgj_shenci_potfuji')) {
							return true;
						}
					},
					cardDiscardable(card, player, name) {
						if (name == 'phaseDiscard' && card.hasGaintag('qmsgswkjsgj_shenci_potfuji')) {
							return false;
						}
					},
				},
			},
			sha: {
				charlotte: true,
				mark: true,
				marktext: '杀',
				intro: {
					name: '符济 - 杀',
					content: '使用【杀】造成的伤害+1',
				},
				audio: 'potfuji4.mp3',
				trigger: { player: 'useCard' },
				filter(event, player) {
					return event.card.name === 'sha';
				},
				forced: true,
				logTarget: 'player',
				content() {
					const gain = get.cardPile2((gain) => get.suit(gain) === get.suit(trigger.card, false));
					if (gain) {
						player.gain(gain, 'gain2');
					}
					trigger.baseDamage++;
					player
						.when({
							player: 'useCardAfter',
						})
						.filter((evt) => evt === trigger)
						.then(() => {
							player.removeSkill('qmsgswkjsgj_potfuji_sha');
						});
				},
			},
			shan: {
				charlotte: true,
				mark: true,
				marktext: '闪',
				intro: {
					name: '符济 - 闪',
					content: '使用【闪】结算完毕后摸一张牌',
				},
				audio: 'potfuji5.mp3',
				trigger: { player: 'useCard' },
				filter(event, player) {
					return event.card.name === 'shan';
				},
				forced: true,
				content() {
					const gain = get.cardPile2((gain) => get.suit(gain) === get.suit(trigger.card, false));
					if (gain) {
						player.gain(gain, 'gain2');
					}
					player
						.when('useCardAfter')
						.filter((evt) => evt === trigger)
						.then(() => {
							player.removeSkill('qmsgswkjsgj_potfuji_shan');
							player.draw();
						});
				},
			},
			tao: {
				charlotte: true,
				mark: true,
				marktext: '桃',
				intro: {
					name: '符济 - 桃',
					content: '使用【桃】回复值+1',
				},
				audio: 'potfuji5.mp3',
				trigger: { player: 'useCard' },
				filter(event, player) {
					return event.card.name === 'tao';
				},
				forced: true,
				content() {
					const gain = get.cardPile2((gain) => get.suit(gain) === get.suit(trigger.card, false));
					if (gain) {
						player.gain(gain, 'gain2');
					}
					trigger.baseDamage++;
					player
						.when('useCardAfter')
						.filter((evt) => evt === trigger)
						.then(() => {
							player.removeSkill('qmsgswkjsgj_potfuji_tao');
						});
				},
			},
			jiu: {
				charlotte: true,
				mark: true,
				marktext: '酒',
				intro: {
					name: '符济 - 酒',
					content: '使用【酒】结算完毕后可以弃置场上一张牌',
				},
				audio: 'potfuji4.mp3',
				trigger: { player: 'useCard' },
				filter(event, player) {
					return event.card.name === 'jiu';
				},
				forced: true,
				content() {
					const gain = get.cardPile2((gain) => get.suit(gain) === get.suit(trigger.card, false));
					if (gain) {
						player.gain(gain, 'gain2');
					}
					player
						.when('useCardAfter')
						.filter((evt) => evt === trigger)
						.then(() => {
							player.removeSkill('qmsgswkjsgj_potfuji_shan');
							// player.draw();
							player
								.chooseTarget(1, '弃置场上一张牌')
								.set('filterTarget', function (card, player, target) {
									return target.hasCard((card) => lib.filter.canBeDiscarded(card, player, target), 'ej');
								})
								.set('ai', function (target) {
									lib.card.guohe_copy.ai.result.target(player, target, { name: 'guohe_copy', position: 'ej' }) + 1;
								});
						})
						.then(function () {
							if (result.bool) {
								player.discardPlayerCard(result.targets[0], 'ej', true);
							}
						});
				},
			},
		},
	},
	qmsgswkjsgj_shenci_potdaozhuan: {
		audio: 'potdaozhuan',
		enable: 'chooseToUse',
		usable(skill, player) {
			return player.maxHp;
		},
		logAudio: (index) => (typeof index === 'number' ? 'potdaozhuan' + index + '.mp3' : 2),
		filter(event, player) {
			if (event.qmsgswkjsgj_shenci_potdaozhuan) {
				return false;
			}
			let num = player.countCards('he');
			if (_status.currentPhase?.isIn() && _status.currentPhase !== player) {
				num += _status.currentPhase.countCards('he');
			}
			if (num <= 0) {
				return false;
			}
			return get
				.inpileVCardList((info) => {
					const name = info[2];
					if (get.type(name) !== 'basic') {
						return false;
					}
					// return !player.getStorage("qmsgswkjsgj_shenci_potdaozhuan_used").includes(name);
					return true;
				})
				.some((card) => event.filterCard(new lib.element.VCard({ name: card[2], nature: card[3], isCard: true }), player, event));
		},
		// usable: 1,
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog('道转', [get.inpileVCardList((info) => get.type(info[2]) === 'basic'), 'vcard']);
			},
			filter(button, player) {
				const event = get.event().getParent();
				// if (player.getStorage("qmsgswkjsgj_shenci_potdaozhuan_used").includes(button.link[2])) {
				// 	return false;
				// }
				return event.filterCard(new lib.element.VCard({ name: button.link[2], nature: button.link[3], isCard: true }), player, event);
			},
			check(button) {
				const event = get.event().getParent();
				if (event.type !== 'phase') {
					return 1;
				}
				return get.player().getUseValue(new lib.element.VCard({ name: button.link[2], nature: button.link[3], isCard: true }));
			},
			prompt(links, player) {
				let prompt = '将你';
				if (_status.currentPhase?.isIn() && _status.currentPhase !== player) {
					prompt += '与' + get.translation(_status.currentPhase);
				}
				prompt += '的一张牌置入弃牌堆，';
				return '###道转###<div class="text center">' + prompt + '视为使用' + (get.translation(links[0][3]) || '') + '【' + get.translation(links[0][2]) + '】</div>';
			},
			backup(links) {
				return {
					filterCard: () => false,
					selectCard: -1,
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						isCard: true,
					},
					log: false,
					async precontent(event, trigger, player) {
						const goon = _status.currentPhase?.isIn() && _status.currentPhase !== player;
						let prompt = '将你';
						if (goon) {
							prompt += '与' + get.translation(_status.currentPhase);
						}
						prompt += '的一张牌置入弃牌堆';
						let dialog = ['道转：' + prompt];
						if (player.countCards('h')) {
							dialog.push('<div class="text center">你的手牌</div>');
							dialog.push(player.getCards('h'));
						}
						if (player.countCards('e')) {
							dialog.push('<div class="text center">你的装备牌</div>');
							dialog.push(player.getCards('e'));
						}
						if (goon) {
							const target = _status.currentPhase;
							if (target.countCards('h')) {
								const cards = target.getCards('h');
								dialog.push('<div class="text center">' + get.translation(target) + '的手牌</div>');
								if (player.hasSkillTag('viewHandcard', null, target, true)) {
									dialog.push(cards);
								} else {
									dialog.push([cards.slice().randomSort(), 'blank']);
								}
							}
							if (target.countCards('e')) {
								dialog.push('<div class="text center">' + get.translation(target) + '的装备牌</div>');
								dialog.push(target.getCards('e'));
							}
						}
						const result = await player
							.chooseButton(dialog)
							.set('filterButton', (button) => {
								const card = button.link,
									{ player, useCard, targets } = get.event();
								if (!targets?.length) {
									return true;
								}
								ui.selected.cards.add(card);
								const bool = targets.some((target) => {
									if (!lib.filter.cardEnabled(useCard, player, 'forceEnable')) {
										return false;
									}
									return lib.filter.targetEnabled2(useCard, player, target) && lib.filter.targetInRange(useCard, player, target);
								});
								ui.selected.cards.remove(card);
								return bool;
							})
							.set('useCard', event.result.card)
							.set('targets', event.result.targets)
							.set('ai', (button) => {
								const player = get.player(),
									source = get.owner(button.link);
								return get.value(button.link, get.owner(source)) * Math.sign(-get.attitude(player, source));
							})
							.forResult();
						if (result?.bool) {
							player.logSkill('qmsgswkjsgj_shenci_potdaozhuan', null, null, null, [get.rand(1, 2)]);
							// player.addTempSkill("qmsgswkjsgj_shenci_potdaozhuan_used");
							// player.markAuto("qmsgswkjsgj_shenci_potdaozhuan_used", [event.result.card.name]);
							if (result.links?.length) {
								const target = _status.currentPhase;
								const owners = result.links.map((i) => get.owner(i)).unique();
								await owners[0].loseToDiscardpile(result.links);
								// if (owners[0] === target) {
								// 	player.tempBanSkill("qmsgswkjsgj_shenci_potdaozhuan");
								// 	player.logSkill("qmsgswkjsgj_shenci_potdaozhuan", null, null, null, [get.rand(3, 4)]);
								// }
								if (_status.currentPhase == player) {
									await player.draw();
									player.logSkill('qmsgswkjsgj_shenci_potdaozhuan', null, null, null, [get.rand(3, 4)]);
									// var next=await player.draw();
									// next.logSkill = 'qmsgswkjsgj_shenci_potdaozhuan';
									// next.
									// var next = await player.draw()
									// next.set('logSkill','').logSkill("qmsgswkjsgj_shenci_potdaozhuan", null, null, null, [get.rand(3, 4)]);
								}
							}
							return;
						}
						const evt = event.getParent();
						evt.set('qmsgswkjsgj_shenci_potdaozhuan', true);
						evt.goto(0);
					},
				};
			},
		},
		hiddenCard(player, name) {
			if (player.isTempBanned('qmsgswkjsgj_shenci_potdaozhuan')) {
				return false;
			}
			return get.type(name) === 'basic' /*&& !player.getStorage("qmsgswkjsgj_shenci_potdaozhuan_used").includes(name)*/;
		},
		ai: {
			fireAttack: true,
			respondSha: true,
			respondShan: true,
			skillTagFilter(player, tag, arg) {
				if (arg === 'respond') {
					return false;
				}
				return get.info('qmsgswkjsgj_potdaozhuan').hiddenCard(
					player,
					(() => {
						switch (tag) {
							case 'fireAttack':
								return 'sha';
							default:
								return tag.slice('respond'.length).toLowerCase();
						}
					})(),
				);
			},
			order(item, player) {
				if (player && _status.event.type === 'phase') {
					let max = 0,
						names = get.inpileVCardList((info) => {
							const name = info[2];
							if (get.type(name) !== 'basic') {
								return false;
							}
							// return !player.getStorage("qmsgswkjsgj_potdaozhuan_used").includes(name);
							return true;
						});
					names = names.map((namex) => new lib.element.VCard({ name: namex[2], nature: namex[3] }));
					names.forEach((card) => {
						if (player.getUseValue(card) > 0) {
							let temp = get.order(card);
							if (temp > max) {
								max = temp;
							}
						}
					});
					return max + (max > 0 ? 0.2 : 0);
				}
				return 10;
			},
			result: {
				player(player) {
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					return 1;
				},
			},
		},
		subSkill: {
			backup: {},
			used: {
				charlotte: true,
				onremove: true,
				intro: { content: '本轮已使用牌名：$' },
			},
		},
	},

	//星月神赐武皇甫嵩
	//星月神赐武关羽
	// 星月神赐界柏灵筠
	qmsgswkjsgj_shenci_dclinghui: {
		audio: 'dclinghui',
		trigger: { global: "phaseJieshuBegin" },
		async content(event, trigger, player) {
			const { bool: use } = await player
				.chooseBool(get.prompt("qmsgswkjsgj_shenci_dclinghui"), "观看牌堆顶的牌并可能使用或获得")
				.set("ai", () => 1)
				.forResult();
			if (!use) {
				return;
			}
			let num = player.maxHp;
			let cards = get.cards(num);
			await game.cardsGotoOrdering(cards);
			const result1 = await player
				.chooseCardButton("灵慧：选择要使用的牌（可多选）", false, cards, [0, cards.length])
				.set("filterButton", button => player.hasUseTarget(button.link))
				.set("ai", button => get.event().player.getUseValue(button.link))
				.forResult();
			const usedCards = result1.links || [];
			for (const card of usedCards) {
				cards.remove(card);
				player.$gain2(card, false);
				await game.delayx();
				await player.chooseUseTarget(true, card, false);
				cards = cards.filterInD();
			}
			cards = cards.filterInD();
			if (cards.length) {
				const result2 = await player
					.chooseCardButton("灵慧：选择要获得的牌（可多选）", false, cards, [0, cards.length])
					.set("ai", button => get.value(button.link))
					.forResult();
				const gainCards = result2.links || [];
				for (const card of gainCards) {
					cards.remove(card);
					await player.gain(card, "gain2");
				}
				await game.delayx();
				cards = cards.filterInD();
			}
			if (cards.length) {
				const next = player.chooseToMove_new(get.translation(event.name), true);
				const top = cards.filter(c => c);
				next.set('list', [
					[
						['牌堆顶', top],
					],
				]);
				const result = await next.forResult();
				if (!result?.bool) {
					return;
				}
				const [tops] = result.moved;
				if (tops.length) {
					tops.reverse();
					for (let i = 0; i < tops.length; i++) {
						ui.cardPile.insertBefore(tops[i], ui.cardPile.firstChild);
					}
				}
				game.updateRoundNumber();
				await game.delay();
			}
		},
	},
	qmsgswkjsgj_shenci_dcxiace: {
		audio: 'dcxiace',
		trigger: {
			player: "damageEnd",
			source: "damageSource",
		},
		filter(event, player) {
			if (event.num !== 1) {
				return false;
			}
			if (event.player === player) {
				return game.hasPlayer(t => t !== player && !t.hasSkill("qmsgswkjsgj_shenci_dcxiace_disabled"));
			}
			if (event.source === player) {
				return true;
			}
			return false;
		},
		direct: true,
		async content(event, trigger, player) {
			if (trigger.player === player) {
				const { bool, targets } = await player
					.chooseTarget((card, player, target) => target !== player)
					.set("prompt", get.prompt("qmsgswkjsgj_shenci_dcxiace"))
					.set("prompt2", "令一名其他角色的所有技能失效直到其下回合结束")
					.set("ai", target => -get.sgn(get.attitude(player, target)) * (target === _status.currentPhase ? 10 : 1))
					.forResult();
				if (bool) {
					const target = targets[0];
					player.logSkill("qmsgswkjsgj_shenci_dcxiace", target);
					target.addTempSkill("qmsgswkjsgj_shenci_dcxiace_disabled");
				}
			}
			if (trigger.source === player) {
				const { bool } = await player
					.chooseBool(get.prompt("qmsgswkjsgj_shenci_dcxiace"), "回复1点体力")
					.set("ai", () => get.recoverEffect(player, player, player) > 0 ? 1 : 0)
					.forResult();
				if (bool) {
					player.logSkill("qmsgswkjsgj_shenci_dcxiace");
					await player.recover();
				}
			}
		},
		subSkill: {
			disabled: {
				silent: true,
				init(player, skill) {
					player.addSkillBlocker(skill);
				},
				onremove(player, skill) {
					player.removeSkillBlocker(skill);
				},
				skillBlocker(skill, player) {
					if (skill === "qmsgswkjsgj_shenci_dcxiace_disabled") {
						return false;
					}
					var info = lib.skill[skill];
					if (info && (info.charlotte || info.persevereSkill)) {
						return false;
					}
					return true;
				},
				trigger: { player: "phaseJieshu" },
				forced: true,
				priority: 1,
				content(event, trigger, player) {
					player.removeSkill(event.name);
				},
			},
		},
	},
	qmsgswkjsgj_shenci_dcyuxin: {
		audio: 'dcyuxin',
		round: 1,
		trigger: { global: "dying" },
		prompt2(event, player) {
			return "令其将体力值回复至上限";
		},
		check(event, player) {
			if (get.recoverEffect(event.player, player, player) <= 0) {
				return false;
			}
			return lib.skill.luanfeng.check(event, player);
		},
		logTarget: "player",
		skillAnimation: true,
		animationColor: "thunder",
		async content(event, trigger, player) {
			player.logSkill(event.name, trigger.player);
			trigger.player.recover(trigger.player.maxHp - trigger.player.hp);
		},
	},
	//星月神赐司马徽
	//星月神赐欧陆凯撒
	qmsgswkjsgj_shenci_eu_ducai: {
		init(player, skill) {
			if (_status?.currentPhase !== player) {
				return;
			}
			const targets = game.filterPlayer(current => current !== player);
			for (const target of targets) {
				target.addTempSkill(skill + "_block");
			}
		},
		onremove(player, skill) {
			if (_status?.currentPhase !== player) {
				return;
			}
			const targets = game.filterPlayer(current => current !== player);
			for (const target of targets) {
				target.removeSkill(skill + "_block");
			}
		},
		trigger: {
			player: "phaseBeginStart",
		},
		persevereSkill: true,
		forced: true,
		firstDo: true,
		priority: Infinity,
		async content(event, trigger, player) {
			get.info(event.name).init(player, event.name);
		},
		mod: {
			targetInRange(card, player) {
				if (player == _status.currentPhase) {
					return true;
				}
			},
			cardUsable(card, player) {
				if (player == _status.currentPhase) {
					return Infinity;
				}
			},
		},
		subSkill: {
			block: {
				inherit: "baiban",
				intro: {
					content(storage, player, skill) {
						let str = "<li>不能使用牌";
						const list = player.getSkills(null, false, false).filter(function (i) {
							return lib.skill.baiban.skillBlocker(i, player);
						});
						if (list.length) {
							str += "<br><li>" + get.translation(list) + "失效";
						}
						return str;
					},
				},
				mod: {
					cardEnabled(card) {
						return false;
					},
					cardSavable(card) {
						return false;
					},
				},
			},
		},
	},
	qmsgswkjsgj_shenci_eu_zhitong: {
		mark: true,
		zhuanhuanji: true,
		marktext: "☯",
		intro: {
			content(storage, player, skill) {
				if (storage) {
					return "转换技，当你使用牌时，若目标包含其他角色，你依次获得这些角色装备区的所有牌或手牌区X张牌并对其造成1点伤害。";
				}
				return "转换技，当你使用牌时，若目标包含自己，摸X张牌且回复1点体力。";
			},
		},
		trigger: {
			player: "useCard",
		},
		filter(event, player) {
			if (!event?.targets?.length) {
				return false;
			}
			const bool = player.storage?.qmsgswkjsgj_shenci_eu_zhitong;
			return (bool && event.targets.some(current => current !== player)) || (!bool && event.targets.includes(player));
		},
		check(event, player) {
			if (!player.storage?.qmsgswkjsgj_shenci_eu_zhitong) {
				return true;
			}
			return event.targets.filter(target => target != player).reduce((eff, target) => eff + get.damageEffect(target, player, player), 0) > 0;
		},
		async content(event, trigger, player) {
			player.changeZhuanhuanji(event.name);
			if (player.storage?.qmsgswkjsgj_shenci_eu_zhitong) {
				await player.draw(player.maxHp);
				await player.recover();
			} else {
				const takeHand = async (target, hands) => {
					const X = player.maxHp;
					if (hands.length <= X) {
						return hands;
					}
					const result = await player
						.chooseCardButton("治统：选择获得" + get.translation(target) + "的至多" + X + "张手牌", false, hands, [1, X])
						.set("ai", card => get.value(card))
						.forResult();
					return result.bool ? result.links : hands.randomSort().slice(0, X);
				};
				const targets = trigger.targets.filter(current => current !== player).sortBySeat();
				for (const target of targets) {
					const equips = target.getGainableCards(player, "e");
					const hands = target.getCards("h");
					let gainCards = [];
					if (equips.length && hands.length) {
						const { control } = await player
							.chooseControl("获得装备区所有牌", "获得手牌区" + player.maxHp + "张牌")
							.set("prompt", "治统：选择获得" + get.translation(target) + "的牌")
							.set("forceDie", true)
							.forResult();
						gainCards = control.includes("装备") ? equips : await takeHand(target, hands);
					} else if (equips.length) {
						gainCards = equips;
					} else if (hands.length) {
						gainCards = await takeHand(target, hands);
					}
					if (gainCards.length) {
						await player.gain(gainCards, target, "give", "bySelf");
					}
					await target.damage();
				}
			}
		},
	},
	qmsgswkjsgj_shenci_eu_jiquan: {
		trigger: {
			global: "phaseBegin",
		},
		zhuSkill: true,
		forced: true,
		filter(event, player) {
			return event.player?.group === "western" && event.player?.isIn();
		},
		async content(event, trigger, player) {
			await player.recover();
			await player.draw();
		},
	},


	//以下内容搬运至太虚幻境了
	// qmsgswkjsgj_zhenshen:{
	// 	//我可不什么都惯着这作者
	// 	//顶破天给你一个免疫横置翻面等
	// 	charlotte:true,
	// 	forced:true,
	// 	trigger:{
	// 		player:['linkBefore','turnOverBefore']
	// 	},
	// 	filter(event,player,name){
	// 		console.log(name,':',event);
	// 	}
	// },
	// qmsgswkjsgj_shenxing:{
	// 	charlotte:true,
	// 	trigger:{
	// 		player:'roundStart',
	// 	},
	// 	filter(event,player){
	// 		if (!lib.inpile.includes("mb_qingnangshu")) {
	// 			return true;
	// 		}
	// 		return get.cardPile(card => card.name == "mb_qingnangshu");
	// 	},
	// 	content(event,player){
	// 		var card = game.YB_createCard('mb_qingnangshu',null,null);
	// 		player.storage.qmsgswkjsgj_shenxing_card = card;
	// 		player.when({player:'loseAfter',global:'loseAsyncAfter',}).filter(function(event,player){
	// 			const evt = event.getl(player);
	// 			if (evt && evt.player === player && evt.es) {
	// 				if(player.storage.qmsgswkjsgj_shenxing_card){
	// 					return evt.es.length&&evt.es.includes(player.storage.qmsgswkjsgj_shenxing_card);
	// 				}
	// 			}
	// 		}).then(function(){
	// 			let cardx = player.storage.qmsgswkjsgj_shenxing_card;
	// 			if(cardx){
	// 				cardx.fix();
	// 				cardx.remove();
	// 				cardx.destroyed = true;
	// 				game.log(cardx, "被销毁了");
	// 				delete player.storage.qmsgswkjsgj_shenxing_card;
	// 			}
	// 		})
	// 		player.gain(card,'gain2');
	// 		player.useCard(card,false,false);
	// 	},
	// 	init(player){
	// 		player.expandEquip(5);
	// 	},
	// 	onremove:function(player){
	// 		player.disableEquip(5);
	// 	},
	// },
	// qmsgswkjsgj_shenxing2:{
	// 	charlotte:true,
	// 	trigger:{
	// 		player:'roundStart',
	// 	},
	// 	filter(event,player){
	// 		if (!lib.inpile.includes("qmsgswkjsgj_chuanguoyuxi")) {
	// 			return true;
	// 		}
	// 		return get.cardPile(card => card.name == "qmsgswkjsgj_chuanguoyuxi");
	// 	},
	// 	content(event,player){
	// 		var card = game.YB_createCard('qmsgswkjsgj_chuanguoyuxi',null,null);
	// 		player.storage.qmsgswkjsgj_shenxing2_card = card;
	// 		player.when({player:'loseAfter',global:'loseAsyncAfter',}).filter(function(event,player){
	// 			const evt = event.getl(player);
	// 			if (evt && evt.player === player && evt.es) {
	// 				if(player.storage.qmsgswkjsgj_shenxing2_card){
	// 					return evt.es.length&&evt.es.includes(player.storage.qmsgswkjsgj_shenxing2_card);
	// 				}
	// 			}
	// 		}).then(function(){
	// 			let cardx = player.storage.qmsgswkjsgj_shenxing2_card;
	// 			if(cardx){
	// 				cardx.fix();
	// 				cardx.remove();
	// 				cardx.destroyed = true;
	// 				game.log(cardx, "被销毁了");
	// 				delete player.storage.qmsgswkjsgj_shenxing2_card;
	// 			}
	// 		})
	// 		player.gain(card,'gain2');
	// 		player.useCard(card,false,false);
	// 	},
	// 	init(player){
	// 		player.expandEquip(5);
	// 	},
	// 	onremove:function(player){
	// 		player.disableEquip(5);
	// 	},
	// },
	// qmsgswkjsgj_shenxing3:{
	// 	charlotte:true,
	// 	trigger:{
	// 		player:'roundStart',
	// 	},
	// 	filter(event,player){
	// 		if (!lib.inpile.includes("muniu")) {
	// 			return true;
	// 		}
	// 		return get.cardPile(card => card.name == "muniu");
	// 	},
	// 	content(event,player){
	// 		var card = game.YB_createCard('muniu',null,null);
	// 		player.storage.qmsgswkjsgj_shenxing3_card = card;
	// 		player.when({player:'loseAfter',global:'loseAsyncAfter',}).filter(function(event,player){
	// 			const evt = event.getl(player);
	// 			if (evt && evt.player === player && evt.es) {
	// 				if(player.storage.qmsgswkjsgj_shenxing3_card){
	// 					return evt.es.length&&evt.es.includes(player.storage.qmsgswkjsgj_shenxing3_card);
	// 				}
	// 			}
	// 		}).then(function(){
	// 			let cardx = player.storage.qmsgswkjsgj_shenxing3_card;
	// 			if(cardx){
	// 				cardx.fix();
	// 				cardx.remove();
	// 				cardx.destroyed = true;
	// 				game.log(cardx, "被销毁了");
	// 				delete player.storage.qmsgswkjsgj_shenxing3_card;
	// 			}
	// 		})
	// 		player.gain(card,'gain2');
	// 		player.useCard(card,false,false);
	// 	},
	// 	init(player){
	// 		player.expandEquip(5);
	// 	},
	// 	onremove:function(player){
	// 		player.disableEquip(5);
	// 	},
	// },
	// qmsgswkjsgj_chuanguoyuxi_skill:{
	// 	equipSkill: true,
	// 	audio: "weidi",
	// 	audioname2: {
	// 		shen_simayi: "lianpo1.mp3",
	// 		xin_simayi: "lianpo1.mp3",
	// 		new_simayi: "lianpo1.mp3",
	// 	},
	// 	trigger: { player: "phaseDiscardBegin" },
	// 	getIndex(event, player) {
	// 		const cards = player.getVCards("e", card => card.name == "qmsgswkjsgj_chuanguoyuxi_skill");
	// 		return cards.length ? cards : 1;
	// 	},
	// 	forced: true,
	// 	async content(event, trigger, player) {
	// 		/*player.flashAvatar(event.name, "yuanshu");*/
	// 		await player.draw();
	// 		player.addSkill(event.name + "_add");
	// 		player.addMark(event.name + "_add", 2, false);
	// 		game.log(player, "的手牌上限", "#y+2");
	// 		let str = "受命于天，既寿永昌！";
	// 		if (!player.isZhu2()) {
	// 			// await player.loseHp();
	// 			str = ["你们都得听我的号令！", "我才是皇帝！"].randomGet();
	// 		}
	// 		player.chat(str);
	// 	},
	// 	subSkill: {
	// 		add: {
	// 			charlotte: true,
	// 			onremove: true,
	// 			mark: true,
	// 			markimage: "image/card/handcard.png",
	// 			intro: {
	// 				content: "手牌上限+#",
	// 			},
	// 			mod: {
	// 				maxHandcard(player, num) {
	// 					return num + player.countMark("qmsgswkjsgj_chuanguoyuxi_skill_add");
	// 				},
	// 			},
	// 		},
	// 	},
	// },

};
