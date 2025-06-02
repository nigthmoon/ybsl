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

}