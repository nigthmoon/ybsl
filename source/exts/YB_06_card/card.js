import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { card };
/** @type { importCardConfig['card'] } */
const card = {
	niaobaidaowenha: {
		type: 'equip',
		subtype: 'equip5',
		skills: ['niaobaidaowenha_skill'],
		modeimage: 'boss',
		ai: {
			basic: {
				equipValue: 7.5,
			},
		},
		fullskin: true,
	},
	goujiangdesidai: {
		type: 'equip',
		subtype: 'equip1',
		distance: { attackFrom: -6 },
		skills: ['goujiangdesidai_skill'],
		modeimage: 'boss',
		ai: {
			basic: {
				equipValue: 7.5,
			},
		},
		fullskin: true,
	},
	shenzhixiunvfu: {
		type: 'equip',
		subtype: 'equip2',
		modeimage: 'boss',
		fullskin: true,
	},
	gubuzifeng: {
		type: 'trick',
		fullskin: true,
		modeimage: 'boss',
		enable: true,
		filterTarget: function (card, player, target) {
			return target != player;
		},
		content: function () {
			target.addTempSkill('gubuzifeng_disable', { player: 'phaseAfter' });
			var skills = target.getSkills(null, false);
			for (var i = 0; i < skills.length; i++) {
				if (get.info(skills[i]).charlotte) skills.splice(i--, 1);
			}
			if (skills.length) {
				target.storage.gubuzifeng_disable.push(skills.randomGet());
				target.disableSkill('gubuzifeng_disable', target.storage.gubuzifeng_disable);
			}
		},
		ai: {
			order: 12,
			result: {
				target: function (player, target) {
					return -2;
				}
			}
		}
	},
	lingsheji: {
		type: 'equip',
		subtype: 'equip5',
		skills: ['lingsheji'],
		modeimage: 'boss',
		ai: {
			basic: {
				equipValue: 7.5,
			},
		},
		fullskin: true,
	},
	shanrangzhaoshu: {
		type: 'equip',
		subtype: 'equip5',
		skills: ['shanrangzhaoshu'],
		modeimage: 'boss',
		ai: {
			basic: {
				equipValue: 7.5,
			},
		},
		fullskin: true,
	},
	xingtianpojunfu: {
		type: 'equip',
		subtype: 'equip1',
		distance: { attackFrom: -3 },
		skills: ['noda_axe'],
		modeimage: 'boss',
		ai: {
			basic: {
				equipValue: 7.5,
			},
		},
		fullskin: true,
	},
	jinwuluorigong: {
		type: 'equip',
		subtype: 'equip1',
		skills: ['iwasawa_crowbow'],
		modeimage: 'boss',
		distance: { attackFrom: -8 },
		ai: {
			basic: {
				equipValue: 7.5,
			},
		},
		fullskin: true,
	},
	"boss_mengpohuihun": {
		mode: ['boss'],
		type: "trick",
		modeimage: "boss",
		fullskin: true,
		selectTarget: -1,
		enable: true,
		toself: true,
		multitarget: true,
		global: ['boss_mengpohuihun1'],
		modTarget: true,
		filterTarget: function (card, player, target) {
			return player == target;
		},
		content: function () {
			game.countPlayer2(function (current) {
				current.enableSkill('boss_wanghun');
			});
		},
		ai: {
			basic: {
				order: function () {
					return 11;
				},
				useful: [3, 1],
				value: 10
			},
			result: {
				player: function (player, target) {
					if (player == game.boss) {
						return -2;
					}
					else {
						return 5;
					}
				},
			},
		},
	},
	sadouchengbing: {
		fullskin: true,
		type: 'trick',
		enable: true,
		selectTarget: -1,
		cardcolor: 'red',
		toself: true,
		modeimage: 'boss',
		filterTarget: function (card, player, target) {
			return target == player;
		},
		modTarget: true,
		content: function () {
			var num = Math.min(5, target.maxHp);
			if (target.group == 'shen') {
				target.draw(num);
			}
			else {
				var nh = target.countCards('h');
				if (nh < num) {
					target.draw(num - nh);
				}
			}
		},
		ai: {
			basic: {
				order: 7.2,
				useful: 4.5,
				value: 9.2
			},
			result: {
				target: function (player, target) {
					var num = Math.min(5, target.maxHp);
					if (target.group == 'shen') {
						return Math.sqrt(num);
					}
					else {
						var nh = target.countCards('h');
						if (target == player && player.countCards('h', 'sadouchengbing')) {
							nh--;
						}
						if (nh < num) {
							return Math.sqrt(num - nh);
						}
					}
					return 0;
				},
			},
			tag: {
				draw: 2
			}
		}
	},
	yihuajiemu: {
		type: 'trick',
		fullskin: true,
		modeimage: 'boss',
		enable: true,
		filterTarget: function (card, player, target) {
			return target != player && target.countCards('he');
		},
		content: function () {
			'step 0'
			if (target.hasSha()) {
				target.chooseToUse(function (card, player, event) {
					return get.name(card) == 'sha' && lib.filter.filterCard.apply(this, arguments);
				}, '使用一张杀，或交给' + get.translation(player) + '两张牌');
			}
			else {
				event.directfalse = true;
			}
			'step 1'
			var nh = target.countCards('he');
			if ((event.directfalse || !result.bool) && nh) {
				if (nh <= 2) {
					event.directcards = true;
				}
				else {
					target.chooseCard('he', 2, true, '将两张牌交给' + get.translation(player));
				}
			}
			else {
				event.finish();
			}
			'step 2'
			if (event.directcards) {
				target.give(target.getCards('he'), player);
			}
			else if (result.bool && result.cards && result.cards.length) {
				target.give(result.cards, player);
			}
		},
		ai: {
			order: 7,
			result: {
				target: function (player, target) {
					if (target.hasSha() && _status.event.getRand() < 0.5) return 1;
					return -2;
				}
			}
		}
	},
	chiyanzhenhunqin: {
		type: 'equip',
		fullskin: true,
		subtype: 'equip1',
		modeimage: 'boss',
		distance: { attackFrom: -3 },
		skills: ['chiyanzhenhunqin'],
		nomod: true,
		nopower: true,
		unique: true,
		ai: {
			equipValue: 5
		}
	},
	// juechenjinge_gai: {
	// 	type: 'equip',
	// 	fullskin: true,
	// 	image: 'ext:夜白神略/image/card/juechenjinge_gai.png',
	// 	subtype: 'equip3',
	// 	distance: {
	// 		globalTo: 2,
	// 	},
	// 	skills: ['juechenjinge_gai'],
	// 	nomod: true,
	// 	nopower: true,
	// 	unique: true,
	// 	ai: {
	// 		equipValue: 9
	// 	}
	// },
	xiuluolianyuji: {
		type: 'equip',
		fullskin: true,
		subtype: 'equip1',
		modeimage: 'boss',
		distance: { attackFrom: -3 },
		skills: ['xiuluolianyuji'],
		nomod: true,
		nopower: true,
		unique: true,
		ai: {
			equipValue: 9
		}
	},
	longfenghemingjian: {
		type: 'equip',
		fullskin: true,
		modeimage: 'boss',
		subtype: 'equip1',
		distance: { attackFrom: -2 },
		skills: ['longfenghemingjian'],
		nomod: true,
		nopower: true,
		unique: true,
		ai: {
			equipValue: 9
		}
	},
	// qicaishenlu:{
	// fullskin:true,
	// modeimage:'boss',
	// type:'equip',
	// subtype:'equip4',
	// distance:{globalFrom:-1},
	// skills:['qicaishenlu'],
	// nomod:true,
	// nopower:true,
	// unique:true,
	// ai:{
	// equipValue:9
	// }
	// },
	honghuangzhili: {
		type: 'trick',
		enable: true,
		fullskin: true,
		filterTarget: true,
		modeimage: 'boss',
		content: function () {
			if (target.group == 'shen') {
				target.addSkill('honghuangzhili');
				if (target.countCards('he')) {
					player.gainPlayerCard(target, 'he', true);
				}
			}
			else {
				target.turnOver();
			}
		},
		ai: {
			order: 4,
			value: 10,
			result: {
				target: function (player, target) {
					if (target.group == 'shen') {
						if (target.countCards('he')) return -2;
						return 0;
					}
					else {
						if (target.isTurnedOver()) return 4;
						return -3;
					}
				}
			}
		}
	},
	lianjunshengyan_gai: {
		fullskin: true,
		audio: true,
		type: 'trick',
		enable: function (card, player) {
			if (get.mode() == 'guozhan') return !player.isUnseen();
			return true;
		},
		image: 'ext:夜白神略/image/card/lianjunshengyan_gai.png',
		filterTarget: function (card, player, target) {
			if (get.mode() == 'guozhan') return target != player && target.identity != 'unknown' && !target.isFriendOf(player);
			return true;
		},
		selectTarget: function () {
			return get.mode() == 'guozhan' ? 1 : -1;
		},
		changeTarget: function (player, targets) {
			if (get.mode() == 'guozhan') {
				var target = targets[0];
				targets.push(player);
				if (target.identity != 'ye') {
					game.filterPlayer(function (current) {
						return target != current && target.isFriendOf(current) && !current.hasSkill('diaohulishan');
					}, targets);
				}
			}
		},/*
	   contentBefore:function(){
		   if(get.mode()=='guozhan'){
			   var evt=event.getParent();
			   if(evt&&evt.targets&&evt.targets.includes(player)){
				   evt.fixedSeat=true;
				   evt.targets.sortBySeat();
				   evt.targets.remove(player);
				   evt.targets.push(player);
			   }
		   }
	   },*/
		content: function () {
			'step 0'
			if (get.mode() != 'guozhan') {
				if (player == target) target.draw(game.filterPlayer().length);
				else target.chooseDrawRecover(true);
				event.finish();
			}
			else {
				if (target == player) {
					var num = targets.length - 1;
					event.num = num;
					var damaged = target.maxHp - target.hp;
					if (damaged == 0) {
						target.draw(num);
						event.finish();
					}
					else {
						var list = [];
						for (var i = Math.min(num, damaged); i >= 0; i--) {
							list.push('摸' + (num - i) + '回' + i);
						}
						target.chooseControl(list).set('prompt', '请分配自己的摸牌数和回复量').ai = function () {
							if (player.hasSkill('diaohulishan')) return 0;
							if (_status._aozhan) return list.length - 1;
							return list.randomGet();
						};
					}
				}
				else {
					target.draw();
				}
			}
			'step 1'
			if (target != player) target.link(false);
			else if (typeof result.control == 'string') {
				var index = result.control.indexOf('回');
				var draw = parseInt(result.control.slice(1, index));
				var recover = parseInt(result.control.slice(index + 1));
				if (draw) target.draw(draw);
				if (recover) target.recover(recover);
			}
		},
		ai: {
			order: 3,
			value: 4,
			useful: 2,
			result: {
				target: function (player, target) {
					if (player == target) return 2;
					return 1;
				},
			},
		},
	},






	
	tunliang: {
		audio: true,
		fullskin: true,
		type: "trick",
		enable: true,
		selectTarget: [1, 3],
		filterTarget: true,
		content: function () {
			target.draw();
		},
		ai: {
			basic: {
				order: 7.2,
				useful: 4.5,
				value: 9.2,
			},
			result: {
				target: 1,
			},
			tag: {
				draw: 1,
			},
		},
	},
	yuanjun: {
		fullskin: true,
		type: "trick",
		selectTarget: [1, 2],
		enable: true,
		filterTarget: function (card, player, target) {
			return target != player && target.hp < target.maxHp;
		},
		content: function () {
			target.recover();
		},
		ai: {
			basic: {
				order: function (card, player) {
					if (player.hasSkillTag("pretao")) {
						return 5;
					}
					return 2;
				},
				useful: [6, 4],
				value: [6, 4],
			},
			result: {
				target: function (player, target) {
					return 2;
				},
			},
			tag: {
				recover: 1,
			},
		},
	},
	xujiu: {
		audio: "jiu",
		cardimage: "jiu",
		fullskin: true,
		type: "basic",
		enable: true,
		filterTarget: function (card, player, target) {
			return target.isEnemyOf(player);
		},
		selectTarget: 1,
		content: function () {
			target.addTempSkill("xujiu2");
			target.addMark("xujiu2", event.baseDamage || 1, false);
		},
		ai: {
			basic: {
				order: (item, player) => {
					var cards = player.getCards("hs", card => get.tag(card, "damage") && player.hasValueTarget(card));
					if (!cards.length) {
						return 0;
					}
					var cardx = cards.filter(card => get.name(card) == "sha");
					cardx.sort((a, b) => player.getUseValue(b) - player.getUseValue(a));
					cardx = cardx.slice(Math.min(cardx.length, player.getCardUsable("sha")), cardx.length);
					cards.removeArray(cardx);
					return get.order(cards.sort((a, b) => get.order(b, player) - get.order(a, player))[0]) + 0.3;
				},
				useful: 5,
				value: 3,
			},
			result: {
				target: (player, target) => {
					if (target.hasSkill("gangzhi") || get.attitude(player, target) >= 0) {
						return 0;
					}
					var cards = player.getCards("hs", card => get.tag(card, "damage") && player.canUse(card, target) && get.effect(target, card, player, player) > 0);
					if (!cards.length) {
						return 0;
					}
					var cardx = cards.filter(card => get.name(card) == "sha");
					cardx.sort((a, b) => get.effect(target, b, player, player) - get.effect(target, a, player, player));
					cardx = cardx.slice(Math.min(cardx.length, player.getCardUsable("sha")), cardx.length);
					cards.removeArray(cardx);
					return -cards.reduce((sum, card) => sum + get.effect(target, card, player, player), 0);
				},
			},
		},
	},
	zong: {
		fullskin: true,
		type: "basic",
		cardcolor: "red",
		enable: function (card, player) {
			return player.hp < player.maxHp;
		},
		savable: function (card, player, dying) {
			return dying.side == player.side;
		},
		selectTarget: -1,
		filterTarget: function (card, player, target) {
			return target == player && target.hp < target.maxHp;
		},
		modTarget: function (card, player, target) {
			return target.hp < target.maxHp;
		},
		content: function () {
			target.recover();
		},
		ai: {
			basic: {
				order: function (card, player) {
					if (player.hasSkillTag("pretao")) {
						return 5;
					}
					return 2;
				},
				useful: [8, 6.5, 5, 4],
				value: [8, 6.5, 5, 4],
			},
			result: {
				target: function (player, target) {
					if (target.hp <= 0) {
						return 2;
					}
					var nd = player.needsToDiscard();
					var keep = false;
					if (nd <= 0) {
						keep = true;
					} else if (nd == 1 && target.hp >= 2 && target.countCards("h", "tao") <= 1) {
						keep = true;
					}
					var mode = get.mode();
					if (target.hp >= 2 && keep && target.hasFriend()) {
						if (target.hp > 2 || nd == 0) {
							return 0;
						}
						if (target.hp == 2) {
							if (
								game.hasPlayer(function (current) {
									if (target != current && get.attitude(target, current) >= 3) {
										if (current.hp <= 1) {
											return true;
										}
									}
								})
							) {
								return 0;
							}
						}
					}
					return 2;
				},
			},
			tag: {
				recover: 1,
				save: 1,
			},
		},
	},
	xionghuangjiu: {
		fullskin: true,
		type: "basic",
		enable: function (event, player) {
			return !player.hasSkill("jiu") && !player.hasSkill("xionghuangjiu");
		},
		lianheng: true,
		logv: false,
		savable: function (card, player, dying) {
			return dying == player;
		},
		usable: 1,
		selectTarget: -1,
		modTarget: true,
		filterTarget: function (card, player, target) {
			return target == player;
		},
		content: function () {
			if (target.isDying()) {
				target.recover();
				if (_status.currentPhase == target) {
					target.getStat().card.jiu--;
				}
			} else {
				if (cards && cards.length) {
					card = cards[0];
				}
				game.broadcastAll(
					function (target, card, gain2) {
						if (get.population(target.side) == 1) {
							target.addSkill("xionghuangjiu");
						} else {
							if (!target.storage.jiu) {
								target.storage.jiu = 0;
							}
							target.storage.jiu++;
							target.addSkill("jiu");
						}
						game.addVideo("jiuNode", target, true);
						if (!target.node.jiu && lib.config.jiu_effect) {
							target.node.jiu = ui.create.div(".playerjiu", target.node.avatar);
							target.node.jiu2 = ui.create.div(".playerjiu", target.node.avatar2);
						}
						if (gain2 && card.clone && (card.clone.parentNode == target.parentNode || card.clone.parentNode == ui.arena)) {
							card.clone.moveDelete(target);
						}
					},
					target,
					card,
					target == targets[0]
				);
				if (target == targets[0]) {
					if (card.clone && (card.clone.parentNode == target.parentNode || card.clone.parentNode == ui.arena)) {
						game.addVideo("gain2", target, get.cardsInfo([card]));
					}
				}
			}
		},
		ai: {
			basic: {
				useful: function (card, i) {
					if (_status.event.player.hp > 1) {
						if (i == 0) {
							return 5;
						}
						return 1;
					}
					if (i == 0) {
						return 7.3;
					}
					return 3;
				},
				value: function (card, player, i) {
					if (player.hp > 1) {
						if (i == 0) {
							return 5;
						}
						return 1;
					}
					if (i == 0) {
						return 7.3;
					}
					return 3;
				},
			},
			order: function () {
				return get.order({ name: "sha" }) + 0.2;
			},
			result: {
				target: function (player, target) {
					if (target && target.isDying()) {
						return 2;
					}
					if (lib.config.mode == "stone" && !player.isMin()) {
						if (player.getActCount() + 1 >= player.actcount) {
							return 0;
						}
					}
					var shas = player.getCards("h", "sha");
					if (shas.length > 1 && player.getCardUsable("sha") > 1) {
						return 0;
					}
					var card;
					if (shas.length) {
						for (var i = 0; i < shas.length; i++) {
							if (lib.filter.filterCard(shas[i], target)) {
								card = shas[i];
								break;
							}
						}
					} else if (player.hasSha() && player.needsToDiscard()) {
						if (player.countCards("h", "hufu") != 1) {
							card = { name: "sha" };
						}
					}
					if (card) {
						if (
							game.hasPlayer(function (current) {
								return get.attitude(target, current) < 0 && target.canUse(card, current, true, true) && !current.getEquip("baiyin") && get.effect(current, card, target) > 0;
							})
						) {
							return 1;
						}
					}
					return 0;
				},
			},
			tag: {
				save: 1,
			},
		},
	},
	tongzhougongji: {
		fullskin: true,
		cardimage: "lulitongxin",
		notarget: true,
		enable: true,
		type: "trick",
		content: function () {
			"step 0";
			var num = 0;
			for (var i = 0; i < game.players.length; i++) {
				if (game.players[i].side == player.side) {
					if (game.players[i] != player) {
						event.friend = game.players[i];
					}
					num += game.players[i].storage.longchuanzhibao;
				}
			}
			player
				.chooseControl(function () {
					if (num > 2) {
						return 0;
					}
					if (num == 2 && get.population(player.side) == 1) {
						return 0;
					}
					return 1;
				})
				.set("choiceList", ["摸" + get.cnNumber(num) + "张牌", "你和队友各摸一张牌"]);
			event.num = num;
			"step 1";
			if (result.index == 0) {
				if (event.num) {
					player.draw(event.num);
				}
			} else {
				if (event.friend) {
					player.line(event.friend);
					game.asyncDraw([player, event.friend]);
				} else {
					player.draw();
				}
			}
		},
		ai: {
			basic: {
				order: 7.2,
				useful: 4,
				value: 9.2,
			},
			result: {
				target: 2,
			},
			tag: {
				draw: 1,
			},
		},
	},
	lizhengshangyou: {
		fullskin: true,
		cardimage: "lianjunshengyan",
		type: "trick",
		enable: true,
		selectTarget: -1,
		reverseOrder: true,
		filterTarget: function (card, player, target) {
			for (var i = 0; i < game.players.length; i++) {
				if (game.players[i].side == target.side && game.players[i].storage.longchuanzhibao) {
					return target.isDamaged();
				}
			}
			return target.countCards("he");
		},
		content: function () {
			for (var i = 0; i < game.players.length; i++) {
				if (game.players[i].side == target.side && game.players[i].storage.longchuanzhibao) {
					target.recover();
					return;
				}
			}
			target.chooseToDiscard("he", true);
		},
		ai: {
			basic: {
				order: 9,
				useful: [3, 1],
				value: 0,
			},
			result: {
				target: function (player, target) {
					for (var i = 0; i < game.players.length; i++) {
						if (game.players[i].side == target.side && game.players[i].storage.longchuanzhibao) {
							return 1.5;
						}
					}
					return -1;
				},
			},
			tag: {
				recover: 0.5,
				multitarget: 1,
			},
		},
	},
}