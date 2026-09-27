import { lib, game, ui, get, ai, _status } from '../../../../../../noname.js';
export { skill };

/** @type { importCharacterConfig['skill'] } */
const skill = {
	//---------------------------三国杀开局大宝直接秒杀
	//魔周泰
	sgskjdbzjms_tiequ: {
		audio: 'ext:夜白神略/audio/character:2',
		forced: true,
		trigger: {
			player: ['damageBegin4', 'damageEnd'],
		},
		filter(event, player, name) {
			if (name == 'damageBegin4') return event.hasNature();
			else return true;
		},
		content() {
			if (event.triggername == 'damageBegin4') {
				trigger.num--;
			} else player.addMark('sgskjdbzjms_tiequ', 1);
		},
		ai: {
			nofire: true,
			nothunder: true,
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, 'natureDamage')) return 'zeroplayertarget';
				},
			},
		},
		onremove: true,
		mark: true,
		marktext: '淬',
		intro: {
			name: '淬炼',
		},
	},
	sgskjdbzjms_xieren: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'damageBegin3',
			source: 'damageBegin1',
		},
		filter(event, player) {
			if (event.source == event.player) return false;
			if (event.player == player) {
				return event.source && event.source.isIn();
			}
			return true;
		},
		logTarget(event, player) {
			if (event.player == player) return event.source;
			return event.player;
		},
		cost() {
			var target = trigger.player == player ? trigger.source : trigger.player;
			event.result = player.discardPlayerCard(target, 'he').set('chooseonly', true).forResult();
		},
		content() {
			var target = trigger.player == player ? trigger.source : trigger.player;
			target.discard(event.cards, player);
		},
		ai: {
			maixie: true,
			maixie_hp: true,
		},
	},
	sgskjdbzjms_cuiti: {
		derivation: 'gzbuqu',
		audio: 'ext:夜白神略/audio/character:2',
		skillAnimation: true,
		animationColor: 'wood',
		juexingji: true,
		unique: true,
		trigger: { player: 'phaseZhunbeiBegin' },
		filter(event, player) {
			return player.countMark('sgskjdbzjms_tiequ') >= 3 && !player.storage.sgskjdbzjms_cuiti;
		},
		forced: true,
		//priority:3,
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			await player.gainMaxHp();
			await player.recover();
			await player.addSkill('gzbuqu');
		},
		ai: {
			maixie: true,
			combo: 'sgskjdbzjms_tiequ',
		},
	},
	//魂神诸葛亮
	sgskjdbzjms_zhongwu: {
		audio: 'ext:夜白神略/audio/character:2',
		forced: true,
		trigger: {
			player: 'phaseDrawBegin',
		},
		filter(event, player) {
			return true;
		},
		content() {
			trigger.num++;
		},
		mod: {
			cardUsable(card, player, num) {
				if (card.name == 'sha') return num + 1;
			},
			maxHandcard(player, num) {
				return num + 2;
			},
		},
	},
	sgskjdbzjms_kuangfeng: {
		unique: true,
		audio: 'kuangfeng',
		trigger: { player: 'phaseJieshuBegin' },
		direct: true,
		filter(event, player) {
			return player.getExpansions('qixing').length;
		},
		content() {
			'step 0';
			var num = Math.min(game.countPlayer(), player.getExpansions('qixing').length);
			player.chooseTarget(get.prompt('sgskjdbzjms_kuangfeng'), '令至多' + get.cnNumber(num) + '名角色获得“狂风”标记', [1, num]).ai = function (target) {
				return -1;
			};
			('step 1');
			if (result.bool) {
				var targets = result.targets.sortBySeat();
				player.logSkill('sgskjdbzjms_kuangfeng', targets, 'fire');
				var length = targets.length;
				targets.forEach((target) => {
					target.addAdditionalSkill(`kuangfeng_${player.playerid}`, 'kuangfeng2');
					target.markAuto('kuangfeng2', [player]);
				});
				player.addTempSkill('kuangfeng3', { player: 'phaseBeginStart' });
				player.chooseCardButton('选择弃置' + get.cnNumber(length) + '张“星”', length, player.getExpansions('qixing'), true);
			} else {
				event.finish();
			}
			('step 2');
			player.loseToDiscardpile(result.links);
		},
		ai: {
			combo: 'qixing',
		},
	},
	sgskjdbzjms_tianshi: {
		derivation: 'sgskjdbzjms_boxing',
		audio: 'ext:夜白神略/audio/character:2',
		skillAnimation: true,
		animationColor: 'wood',
		juexingji: true,
		unique: true,
		trigger: { player: 'phaseZhunbeiBegin' },
		filter(event, player) {
			// return !player.getExpansions("qixing").length;
			return true;
		},
		async cost(event, trigger, player) {
			event.result = { bool: false };
			if (!player.getExpansions('qixing').length) event.result = { bool: true };
			else {
				event.result = await player
					.chooseBool('是否主动舍弃所有的“星”，然后觉醒？')
					.set('ai', function () {
						return false;
					})
					.forResult();
			}
		},
		// forced: true,
		locked: true,
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			if (player.getExpansions('qixing').length) await player.discard(player.getExpansions('qixing'));
			await player.loseMaxHp();
			await player.addSkill('sgskjdbzjms_boxing');
		},
		ai: {
			maixie: true,
		},
	},
	sgskjdbzjms_boxing: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: ['chooseToUse', 'chooseToRespond'],
		filter(event, player) {
			if (!player.countCards('hse')) return false;
			for (var i of lib.inpile) {
				var type = get.type2(i);
				if ((type == 'basic' || type == 'trick') && event.filterCard(get.autoViewAs({ name: i }, 'unsure'), player, event)) return true;
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				for (var i = 0; i < lib.inpile.length; i++) {
					var name = lib.inpile[i];
					if (name == 'sha') {
						if (event.filterCard(get.autoViewAs({ name }, 'unsure'), player, event)) list.push(['基本', '', 'sha']);
						for (var nature of get.YB_natureList()) {
							if (event.filterCard(get.autoViewAs({ name, nature }, 'unsure'), player, event)) list.push(['基本', '', 'sha', nature]);
						}
					} else if (get.type2(name) == 'trick' && event.filterCard(get.autoViewAs({ name }, 'unsure'), player, event)) list.push(['锦囊', '', name]);
					else if (get.type(name) == 'basic' && event.filterCard(get.autoViewAs({ name }, 'unsure'), player, event)) list.push(['基本', '', name]);
				}
				return ui.create.dialog('薄幸', [list, 'vcard']);
			},
			check(button) {
				if (_status.event.getParent().type != 'phase') return 1;
				var player = _status.event.player;
				if (['ybsl_qisihuisheng', 'wugu', 'zhulu_card', 'yiyi', 'lulitongxin', 'lianjunshengyan', 'diaohulishan'].includes(button.link[2])) return 0;
				return player.getUseValue({
					name: button.link[2],
					nature: button.link[3],
				});
			},
			backup(links, player) {
				return {
					filterCard: true,
					audio: 'sgskjdbzjms_boxing',
					popname: true,
					check(card) {
						return 8 - get.value(card);
					},
					position: 'hse',
					viewAs: { name: links[0][2], nature: links[0][3] },
					precontent() {
						if (!player.hasMark('sgskjdbzjms_boxing_2')) player.YB_temp('sgskjdbzjms_boxing_2');
						else lib.skill.sgskjdbzjms_boxing.callbackx(player);
					},
				};
			},
			prompt(links, player) {
				return '将一张牌当做' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用';
			},
		},
		hiddenCard(player, name) {
			if (!lib.inpile.includes(name)) return false;
			var type = get.type2(name);
			return (type == 'basic' || type == 'trick') && player.countCards('she') > 0;
		},
		callbackx(player, str) {
			var next = game.createEvent('sgskjdbzjms_boxing_2', false);
			next.player = player;
			next.str = str || '薄幸';
			next.setContent(async function (event, trigger, player) {
				const { control } = await player
					.chooseControl('baonue_hp', 'baonue_maxHp', function (event, player) {
						if (player.hp == player.maxHp) return 'baonue_hp';
						if (player.hp < player.maxHp - 1 || player.hp <= 2) return 'baonue_maxHp';
						return 'baonue_hp';
					})
					.set('prompt', str + '：失去1点体力或减1点体力上限')
					.forResult();
				if (control == 'baonue_hp') await player.loseHp();
				else await player.loseMaxHp(true);
			});
		},
		ai: {
			fireAttack: true,
			respondSha: true,
			respondShan: true,
			skillTagFilter(player) {
				if (!player.countCards('hse')) return false;
			},
			order: 1,
			result: {
				player(player) {
					if (_status.event.dying) return get.attitude(player, _status.event.dying);
					return 1;
				},
			},
		},
	},
	//雷震子
	sgskjdbzjms_leishen: {
		audio: 'ext:夜白神略/audio/character:2',
		forced: true,
		trigger: {
			// player:['useCard']
			source: ['damageBegin1', 'damageBegin2'],
		},
		filter(event, player, name) {
			if (name == 'damageBegin1') {
				return true;
			} else {
				return event.card && (event.card.hasNature('fire') || event.card.hasNature('thunder'));
			}
		},
		content() {
			if (event.triggername == 'damageBegin1') {
				game.YB_addNature(trigger, 'thunder');
			} else {
				if (trigger.card.hasNature('thunder')) trigger.num++;
				if (trigger.card.hasNature('fire')) {
					player.discardPlayerCard('h', trigger.player);
				}
			}
		},
	},
	sgskjdbzjms_jiangxing: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: { player: 'damageBegin4' },
		filter(event) {
			return event.hasNature('thunder');
		},
		forced: true,
		content() {
			trigger.cancel();
		},
		ai: {
			nothunder: true,
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, 'thunderDamage')) return 'zeroplayertarget';
				},
			},
		},
	},
	sgskjdbzjms_leifa: {
		audio: 'ext:夜白神略/audio/character:2',
		forced: true,
		trigger: {
			player: 'phaseBegin',
		},
		filter(event) {
			return true;
		},
		content() {
			// let targets = game.filterPlayer(current => current !== player).randomSort();
			let targets = game.filterPlayer((current) => current.isEnemyOf(player)).randomSort();
			var target = targets[0];
			target.damage('thunder', player);
		},
	},
	sgskjdbzjms_fenglei: {
		audio: 'ext:夜白神略/audio/character:2',
		filter(event, player) {
			if (!player.storage.sgskjdbzjms_fenglei) return player.countDiscardableCards(player, 'he') >= 2;
			return true;
		},
		enable: 'phaseUse',
		usable: 1,
		selectCard: function (card, player, target) {
			var player = _status.event.player;
			if (!player.storage.sgskjdbzjms_fenglei) return 2;
			return 0;
		},
		filterCard(card, player) {
			if (!player.storage.sgskjdbzjms_fenglei) return player.getDiscardableCards(player, 'he').includes(card);
			return false;
		},
		async content(event, trigger, player) {
			if (player.storage.sgskjdbzjms_fenglei) {
				player.draw(2);
				player.addTempSkill('sgskjdbzjms_fenglei_thunder');
			} else {
				player.addTempSkill('sgskjdbzjms_fenglei_wind', { player: 'phaseBefore' });
			}
		},
		yongxuzhuanhuanji: true,
		zhuanhuanji: true,
		mark: true,
		marktext: '☯',
		// zhuanhuanji: 'number',
		zhuanhuanLimit: 2,
		intro: {
			markcount: (storage) => {
				if (storage) return '雷';
				return '风';
			},
			content(storage, player) {
				var str = '永续转换技';
				var str2 = '，出牌阶段限一次：';
				var strwind = '风，你弃置两张牌，直到你的下一回开始之前，你不在其他角色攻击范围内';
				var strthunder = '雷，你摸两张牌，当前回合使用牌无视距离';
				if (storage) {
					if (player.hasSkill('sgskjdbzjms_fenglei_thunder')) return '<span class=yellowtext>' + str + '</span>' + str2 + strwind + '；' + '<span class=yellowtext>' + strthunder + '</span>' + '。';
					return str + str2 + strwind + '；' + '<span class=thundertext>' + strthunder + '</span>' + '。';
				} else {
					if (player.hasSkill('sgskjdbzjms_fenglei_wind')) return '<span class=yellowtext>' + str + '</span>' + str2 + '<span class=yellowtext>' + strwind + '</span>' + '；' + strthunder + '。';
					return str + str2 + '<span class=thundertext>' + strwind + '</span>' + '；' + strthunder + '。';
				}
			},
		},
		init(player, skill) {
			player.storage[skill] = false;
		},
		subSkill: {
			wind: {
				audio: 'sgskjdbzjms_fenglei',
				forced: true,
				mark: true,
				marktext: '风',
				mod: {
					inRangeOf(from, to) {
						if (from != to) return false;
					},
				},
				onremove: function (player) {
					if (lib.skill.sgskjdbzjms_fenglei.yongxuzhuanhuanji) player.changeZhuanhuanji('sgskjdbzjms_fenglei');
				},
			},
			thunder: {
				audio: 'sgskjdbzjms_fenglei',
				forced: true,
				mark: true,
				marktext: '雷',
				mod: {
					targetInRange(card) {
						return true;
					},
				},
				onremove: function (player) {
					if (lib.skill.sgskjdbzjms_fenglei.yongxuzhuanhuanji) player.changeZhuanhuanji('sgskjdbzjms_fenglei');
				},
			},
		},
	},
	//仙诸葛果
	sgskjdbzjms_qirang: {
		audio: 'qirang',
		usable: 1,
		enable: 'phaseUse',
		filter: () => true,
		async content(event, trigger, player) {
			var result = await player.judge().forResult();
			if (result.suit) {
				switch (result.suit) {
					case 'spade':
						await player
							.chooseUseTarget(get.prompt('sgskjdbzjms_qirang'), '祈禳：你可以视为对一名角色使用一张杀。', {
								name: 'sha',
								nature: null,
								isCard: false,
							})
							.set('logSkill', 'sgskjdbzjms_qirang')
							.set('addCount', false)
							.set('selectTarget', function () {
								return 1;
							});
						break;
					case 'heart':
						var relt = await player
							.chooseTarget('祈禳：令一名角色回复一点体力', function (card, player, target) {
								return target.hp < target.maxHp;
							})
							.set('ai', function (target) {
								return get.recoverEffect(target, player, _status.event.player);
							})
							.forResult();
						if (relt.bool) {
							await relt.targets[0].recover();
						}
						break;
					case 'club':
						var relt = await player
							.chooseTarget(
								'弃置一名角色区域内的一张牌',
								(card, player, target) => {
									return target.countDiscardableCards(player, 'hej');
								},
								true,
							)
							.set('ai', (target) => {
								const player = get.player();
								let att = get.attitude(player, target);
								if (att < 0) {
									att = -Math.sqrt(-att);
								} else {
									att = Math.sqrt(att);
								}
								return att * lib.card.guohe.ai.result.target(player, target);
							})
							.forResult();
						if (relt.bool) {
							await player.discardPlayerCard('he', relt.targets[0], true);
						}
						break;
					case 'diamond':
						var relt = await player
							.chooseTarget('令一名角色摸两张牌')
							.set('ai', (target) => {
								const player = get.player();
								let att = get.attitude(player, target);
								return att;
							})
							.forResult();
						if (relt.bool) {
							await relt.targets[0].draw(2);
						}
						break;
				}
			}
		},
	},
	sgskjdbzjms_cifu: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'phaseBegin',
		},
		filter(event, player) {
			return true;
			return player.countMark('sgskjdbzjms_cifu_mark') < 3;
		},
		async content(event, trigger, player) {
			var num = 3 - player.countMark('sgskjdbzjms_cifu_mark');
			if (num > 0) await player.addMark('sgskjdbzjms_cifu_mark', num);
			var result = await player
				.chooseTarget([1, 3], '是否赐福任意名其他角色')
				.set('ai', function (target) {
					var player = _status.event.player;
					var trigger = _status.event.getTrigger();
					if (player == trigger.player && trigger.player.hp < 2) return false;
					return get.attitude(player, target) > 5;
				})
				.set('filterTarget', function (card, player, target) {
					return player != target;
				})
				.forResult();
			if (result.targets && result.targets.length) {
				for (var i of result.targets) {
					player.removeMark('sgskjdbzjms_cifu_mark');
					i.addMark('sgskjdbzjms_cifu_mark');
					i.addTempSkill('sgskjdbzjms_cifu_draw', { player: 'phaseDrawAfter' });
				}
			}
		},
		global: 'sgskjdbzjms_cifu_mark',
		subSkill: {
			mark: {
				mark: true,
				marktext: '福',
				intro: {
					content: function (storage, player) {
						var str = '';
						if (player.hasSkill('sgskjdbzjms_cifu')) str += '若你有三个“福”，当你受到属性伤害时，防止之。';
						if (player.hasSkill('sgskjdbzjms_cifu_draw')) str += '摸牌阶段额外摸两张牌，然后移去“福”。';
						return str;
					},
				},
				trigger: {
					player: ['phaseDrawBegin', 'damageBegin4'],
				},
				filter(event, player, name) {
					if (name == 'damageBegin4') return player.countMark('sgskjdbzjms_cifu_mark') >= 3 && player.hasSkill('sgskjdbzjms_cifu');
					return player.countMark('sgskjdbzjms_cifu_mark') && !player.hasSkill('sgskjdbzjms_cifu_draw');
				},
				content() {
					if (event.triggername == 'damageBegin4') trigger.cancel();
					else {
						player.removeMark('sgskjdbzjms_cifu_mark', player.countMark('sgskjdbzjms_cifu_mark'));
						trigger.num += 2;
					}
				},
				ai: {
					nofire: true,
					nothunder: true,
					effect: {
						target(card, player, target, current) {
							if (get.tag(card, 'natureDamage')) return 'zeroplayertarget';
						},
					},
					skillTagFilter(player, tag, arg) {
						if (player.countMark('sgskjdbzjms_cifu_mark') >= 3 && player.hasSkill('sgskjdbzjms_cifu')) return true;
						return false;
					},
				},
			},
			draw: {
				charlotte: true,
			},
		},
	},
	sgskjdbzjms_yuhua: {
		audio: 'yuhua',
		skillAnimation: true,
		animationColor: 'shen',
		unique: true,
		juexingji: true,
		derivation: ['sgskjdbzjms_tianxian'],
		trigger: {
			player: 'dying',
		},
		forced: true,
		filter: function (event, player) {
			return !player.storage.sgskjdbzjms_yuhua;
		},
		content: function () {
			'step 0';
			player.storage.sgskjdbzjms_yuhua = true;
			player.awakenSkill('sgskjdbzjms_yuhua');
			('step 1');
			var num = 1 - player.hp;
			if (num >= 1) player.recover(num);
			('step 2');
			player.loseMaxHp();
			lib.skill.chenliuwushi.change(player, 1);
			('step 3');
			player.addSkill('sgskjdbzjms_tianxian');
		},
		// subSkill:{
		// 	hand:{
		// 		mark:true,
		// 		charlotte:true,
		// 		markimage: "image/card/handcard.png",
		// 		intro: {
		// 			content(num, player) {
		// 				return '<li>手牌上限+1。'
		// 			},
		// 		},
		// 		mod: {
		// 			maxHandcard(player, num) {
		// 				return num + 1;
		// 			},
		// 		},

		// 	}
		// },
	},
	sgskjdbzjms_tianxian: {
		audio: 'yuhua',
		mod: {
			ignoredHandcard(card, player) {
				if (card.type == 'trick' || card.type == 'delay' || card.name == 'tao') {
					return true;
				}
			},
			cardDiscardable(card, player, name) {
				if (name == 'phaseDiscard' && (card.type == 'trick' || card.type == 'delay' || card.name == 'tao')) {
					return false;
				}
			},
		},
		forced: true,
		trigger: {
			player: 'phaseBegin',
		},
		filter(event, player) {
			var card = get.cardPile(function (card) {
				return get.type(card, 'trick') == 'trick';
			});
			if (card) return true;
		},
		content() {
			var card = get.cardPile(function (card) {
				return get.type(card, 'trick') == 'trick';
			});
			if (card) {
				player.gain(card, 'gain2');
			}
		},
	},
	//真张飞
	sgskjdbzjms_paoxiao: {
		audio: 'olpaoxiao',
		mod: {
			cardUsable(card, player, num) {
				if (card.name == 'sha') return Infinity;
			},
			targetInRange(card, player) {
				if (card.name == 'sha') return true;
			},
		},
		trigger: { player: 'useCard1' },
		forced: true,
		filter(event, player) {
			return !event.audioed && event.card.name == 'sha' && player.countUsed('sha', true) > 1 && event.getParent().type == 'phase';
		},
		async content(event, trigger, player) {
			trigger.audioed = true;
		},
	},
	sgskjdbzjms_kuangbao: {
		audio: 'tishen',
		mod: {
			cardEnabled(card, player) {
				if (get.color(card) == 'black' && (get.type2(card) == 'trick' || get.subtype(card) == 'equip1')) {
					var hs = player.getCards('h'),
						cards = [card];
					if (Array.isArray(card.cards)) cards.addArray(card.cards);
					for (var i of cards) {
						if (hs.includes(i)) return false;
					}
				}
			},
			cardRespondable(card, player) {
				if (get.color(card) == 'black' && (get.type2(card) == 'trick' || get.subtype(card) == 'equip1')) {
					var hs = player.getCards('h'),
						cards = [card];
					if (Array.isArray(card.cards)) cards.addArray(card.cards);
					for (var i of cards) {
						if (hs.includes(i)) return false;
					}
				}
			},
			cardSavable(card, player) {
				if (get.color(card) == 'black' && (get.type2(card) == 'trick' || get.subtype(card) == 'equip1')) {
					var hs = player.getCards('h'),
						cards = [card];
					if (Array.isArray(card.cards)) cards.addArray(card.cards);
					for (var i of cards) {
						if (hs.includes(i)) return false;
					}
				}
			},
			// cardSavable: function (card) {
			// 	if ((get.color(card) == "black"&&(get.type2(card)=='trick'||get.subtype(card)=='equip1') ) && ((card.isCard && card.cardid) || get.itemtype(card) == "card")) return false;
			// },
		},
		enable: ['chooseToUse' /*, "chooseToRespond"*/],
		filterCard: function (card) {
			return get.color(card) == 'black' && (get.type2(card) == 'trick' || get.subtype(card) == 'equip1');
		},
		viewAs: {
			name: 'sha',
			isCard: true,
		},
		viewAsFilter: function (player) {
			if (
				!player.countCards('h', function (card) {
					return get.color(card) == 'black' && (get.type2(card) == 'trick' || get.subtype(card) == 'equip1');
				})
			)
				return false;
		},
		position: 'h',
		prompt: '将一张黑色锦囊牌或黑色武器牌当杀使用或打出',
		check: function () {
			return 1;
		},
		ai: {
			respondSha: true,
			skillTagFilter: function (player) {
				if (
					!player.countCards('h', function (card) {
						return get.color(card) == 'black' && (get.type2(card) == 'trick' || get.subtype(card) == 'equip1') && ((card.isCard && card.cardid) || get.itemtype(card) == 'card');
					})
				)
					return false;
			},
			order: function () {
				return get.order({ name: 'sha' }) - 0.1;
			},
		},
		group: ['sgskjdbzjms_kuangbao_damage'],
		subSkill: {
			damage: {
				audio: 'sgskjdbzjms_kuangbao',
				trigger: {
					source: 'damageBegin1',
				},
				forced: true,
				filter(event, player) {
					var evt = event.getParent(2);
					return evt.skill && evt.skill == 'sgskjdbzjms_kuangbao' && event.player != player;
				},
				async content(event, trigger, player) {
					trigger.num++;
					await player.chooseToDiscard('h', true, get.prompt2('sgskjdbzjms_kuangbao'));
				},
			},
		},
	},
	sgskjdbzjms_yinhen: {
		audio: 'ext:夜白神略/audio/character:2',
		forced: true,
		ai: {
			threaten: 0.5,
			neg: true,
		},
		trigger: {
			source: ['dieAfter'],
		},
		content() {
			player.loseHp();
		},
	},
	//真关羽
	sgskjdbzjms_wusheng: {
		audio: 'dcwuyou',
		mod: {
			targetInRange(card) {
				if (get.suit(card) == 'diamond' && card.name == 'sha') return true;
			},
		},
		locked: false,
		// audio: "wusheng",
		enable: ['chooseToRespond', 'chooseToUse'],
		filterCard(card, player) {
			return get.color(card) == 'red';
		},
		position: 'hes',
		viewAs: {
			name: 'sha',
		},
		viewAsFilter(player) {
			// if (get.zhu(player, 'shouyue')) {
			// 	if (!player.countCards('hes')) return false;
			// } else {
				if (!player.countCards('hes', { color: 'red' })) return false;
			// }
		},
		prompt: '将一张红色牌当杀使用或打出',
		check(card) {
			var val = get.value(card);
			if (_status.event.name == 'chooseToRespond') return 1 / Math.max(0.1, val);
			return 5 - val;
		},
		ai: {
			respondSha: true,
			skillTagFilter(player) {
				// if (get.zhu(player, 'shouyue')) {
				// 	if (!player.countCards('hes')) return false;
				// } else {
					if (!player.countCards('hes', { color: 'red' })) return false;
				// }
			},
		},
		locked: false,
		forced: true,
		trigger: {
			player: 'shaBegin',
		},
		filter(event, player, name) {
			if (name == 'shaBegin') {
				if (event.card && get.suit(event.card) == 'heart') return true;
				return false;
			} else return true;
		},
		content() {
			trigger.baseDamage++;
		},
	},
	// wusheng_jsp_guanyu:{
	// 	audio:2,
	// },
	sgskjdbzjms_danji: {
		audio: 'dcyixian',
		usable: 1,
		trigger: {
			player: 'loseAfter',
			global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
		},
		frequent: true,
		filter: function (event, player) {
			if (player.countCards('h')) return false;
			var evt = event.getl(player);
			return evt && evt.player == player && evt.hs && evt.hs.length > 0;
		},
		content: function () {
			player.draw(Math.min(player.maxHp, 20));
		},
		ai: {
			threaten: 0.8, //嘲讽值
			effect: {
				target: function (card) {
					if (card.name == 'guohe' || card.name == 'liuxinghuoyu') return 0.5;
				},
			},
			noh: true,
			skillTagFilter: function (player, tag) {
				if (tag == 'noh') {
					if (player.countCards('h') != 1) return false;
				}
			},
		},
	},
	sgskjdbzjms_fujun: {
		audio: 'dcjuewu',
		unique: true,
		limited: true,
		enable: 'phaseUse',
		filterTarget(card, player, target) {
			return true;
		},
		selectTarget: -1,
		complexCard: true,
		complexSelect: true,
		line: 'thunder',
		forceDie: true,
		animationColor: 'fire',
		skillAnimation: 'legend',
		contentBefore() {
			player.awakenSkill('sgskjdbzjms_fujun');
		},
		async content(event, trigger, player) {
			var result = await event.target
				.chooseToDiscard(2, '①弃置两张牌，②令' + get.translation(player) + '摸三张牌；')
				.set('ai', function (card) {
					var att = get.attitude(_status.event.player, player);
					if (att > 0) return false;
					if (card.name == 'tao') return -10;
					if (card.name == 'jiu' && _status.event.player.hp == 1) return -10;
					return get.unuseful(card) + 2.5 * (5 - get.owner(card).hp);
				})
				.forResult();
			if (!result.bool) await player.draw(3);
		},
		contentAfter() {
			player.gainMaxHp();
			player.recover();
		},
		ai: {
			order: 10,
			result: {
				player: 10,
			},
		},
	},
	//魂神刘备
	sgskjdbzjms_zhaolie: {
		forced: true,
		mod: {
			maxHandcardBase(player, num) {
				return player.maxHp;
			},
		},
	},
	sgskjdbzjms_rende: {
		audio: 'rerende',
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			return player.countCards('h') > 0;
		},
		content() {
			'step 0';
			var listx = player.YB_liangying(player.getCards('h'), get.prompt2('sgskjdbzjms_rende'), function (card, player, target) {
				return player != target;
			});
			event.listx = listx;
			('step 1');
			var num = event.listx.resultx.length;
			player.draw(Math.floor(num / 2) + 1);
		},
	},
	sgskjdbzjms_taoyuan: {
		derivation: ['sgskjdbzjms_juguo', 'sgskjdbzjms_qingfu'],
		audio: 'ext:夜白神略/audio/character:2',
		skillAnimation: true,
		animationColor: 'fire',
		juexingji: true,
		unique: true,
		trigger: { player: 'phaseZhunbeiBegin' },
		filter(event, player) {
			return player.hp == 3 && !player.storage.sgskjdbzjms_taoyuan;
		},
		forced: true,
		//priority:3,
		content() {
			'step 0';
			player.awakenSkill(event.name);
			('step 1');
			player.chooseTarget(
				'桃园：你可以选择至多三名角色，使其回复一点体力',
				function (card, player, target) {
					return target.hp < target.maxHp;
				},
				[1, 3],
			).ai = function (target) {
				return get.recoverEffect(target, player, _status.event.player);
			};
			('step 2');
			if (result.bool) {
				for (var i of result.targets) {
					i.recover();
				}
			}
			('step 3');
			player.draw(Math.min(player.maxHp - player.countCards('h'), 20));
			('step 4');
			player.gainMaxHp(3);
			('step 5');
			player.recover(3);
			('step 6');
			player.draw(3);
			('step 7');
			player.addSkills(['sgskjdbzjms_juguo', 'sgskjdbzjms_qingfu']);
		},
	},
	sgskjdbzjms_juguo: {
		audio: 'ext:夜白神略/audio/character:2',
		usable: 1,
		enable: 'phaseUse',
		position: 'h',
		selectCard: 3,
		selectTarget: -1,
		filterCard: () => true,
		filterTarget: () => true,
		async content(event, trigger, player) {
			await event.target.loseHp();
			await event.target.chooseToDiscard('h');
		},
		ai: {
			result: {
				player: -3,
				target: -1,
			},
		},
	},
	sgskjdbzjms_qingfu: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'sgskjdbzjms_juguoAfter',
		},
		forced: true,
		filter() {
			return true;
		},
		content() {
			lib.skill.sgskjdbzjms_boxing.callbackx(player, '倾覆');
		},
	},
	//真马超
	sgskjdbzjms_mashu: {
		mod: {
			globalFrom(from, to, distance) {
				return distance - 1;
			},
			globalTo(from, to, distance) {
				if (from.countCards('h') < to.countCards('h')) return distance + 1;
				else return distance;
			},
		},
	},
	sgskjdbzjms_shenweitianjiangjun: {
		audio: 'hengwu',
		forced: true,
		trigger: {
			source: 'damageSource',
		},
		filter(event, player) {
			return event.player.isAlive();
		},
		async content(event, trigger, player) {
			var result = await trigger.player
				.chooseToDiscard(2, 'h', '①弃置两张手牌，②令' + get.translation(player) + '摸两张牌；')
				.set('ai', function (card) {
					var att = get.attitude(_status.event.player, player);
					if (att > 0) return false;
					if (card.name == 'tao') return -10;
					if (card.name == 'jiu' && _status.event.player.hp == 1) return -10;
					return get.unuseful(card) + 2.5 * (5 - get.owner(card).hp);
				})
				.forResult();
			if (!result.bool) await player.draw(2);
		},
	},
	//真刘备
	sgskjdbzjms_jieying: {
		audio: 'nzry_jieying',
		// inherit:'nzry_jieying',
		// global:[],
		locked: true,
		ai: {
			effect: {
				target(card) {
					if (card.name == 'tiesuo') return 'zeroplayertarget';
				},
			},
		},
		group: ['sgskjdbzjms_jieying_1', 'sgskjdbzjms_jieying_2'],
		subSkill: {
			1: {
				audio: 'sgskjdbzjms_jieying',
				trigger: {
					player: ['linkBefore', 'enterGame'],
					global: 'phaseBefore',
				},
				forced: true,
				filter(event, player) {
					if (event.name == 'link') return player.isLinked();
					return (event.name != 'phase' || game.phaseNumber == 0) && !player.isLinked();
				},
				content() {
					if (trigger.name != 'link') player.link(true);
					else trigger.cancel();
				},
				ai: {
					noLink: true,
				},
			},
			2: {
				audio: 'sgskjdbzjms_jieying',
				trigger: {
					player: 'phaseJieshuBegin',
				},
				direct: true,
				filter(event, player) {
					return game.hasPlayer(function (current) {
						return current != player && !current.isLinked();
					});
				},
				content() {
					'step 0';
					player.chooseTarget(true, '请选择【结营】的目标', function (card, player, target) {
						return target != player && !target.isLinked();
					}).ai = function (target) {
						return 1 + Math.random();
					};
					('step 1');
					if (result.bool) {
						player.line(result.targets);
						player.logSkill('sgskjdbzjms_jieying');
						result.targets[0].link(true);
					} else {
						event.finish();
					}
				},
			},
		},
	},
	sgskjdbzjms_tuogu: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: { player: 'dying' },
		filter(event, player) {
			return (
				game.countPlayer(function (c) {
					return c != player;
				}) > 0
			);
		},
		cost() {
			event.result = player
				.chooseTarget([1, 2], get.prompt2('sgskjdbzjms_tuogu'))
				.set('filterTarget', function (card, player, target) {
					return player != target;
				})
				.set('ai', function () {
					return get.attitude(player, target);
				})
				.forResult();
		},
		async content(event, trigger, player) {
			for (var i of event.targets) {
				await i.chooseDrawRecover(3, true);
			}
		},
	},

};
