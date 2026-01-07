import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {card};
/** @type { importCharacterConfig['card'] } */
const card = {
    sgsxjxfzmnl_taipingyaoshu:{
        audio: true,
        fullskin: true,
        type: "equip",
        subtype: "equip2",
        cardcolor: "heart",
        nomod: true,
        nopower: true,
        unique: true,
        global: ["g_sgsxjxfzmnl_taipingyaoshu_ai"],
        skills: ["sgsxjxfzmnl_taipingyaoshu"],
        ai: {
            equipValue(card, player) {
                if (player.hasSkill("wendao")) {
                    return 9;
                }
                if (
                    game.hasPlayer(function (current) {
                        return current.hasSkill("wendao") && get.attitude(player, current) <= 0;
                    })
                ) {
                    return 1;
                }
                return 6;
            },
            basic: {
                equipValue: 6,
            },
        },
        filterLose(card, player) {
            if (player.hasSkillTag("unequip2")) {
                return false;
            }
            return true;
        },
        loseDelay: false,
        onLose() {
            player.addTempSkill("sgsxjxfzmnl_taipingyaoshu_lose");
        },

    },

	sgsxjxfzmnl_pilitoushiche: {
		fullskin: true,
		derivation: "sgsxjxfzmnl_dc_liuye",
		cardimage: "ly_piliche",
		cardcolor: "diamond",
		type: "equip",
		subtype: "equip5",
		skills: ["sgsxjxfzmnl_pilitoushiche"],
		destroy: true,
		ai: {
			basic: {
				equipValue: 3,
			},
		},
	},

	sgsxjxfzmnl_pyzhuren_heart: {
		cardimage: "pyzhuren_heart",
		fullskin: true,
		derivation: "puyuan",
		cardcolor: "heart",
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ["sgsxjxfzmnl_pyzhuren_heart"],
		onDestroy(card) {
			if (_status.sgsxjxfzmnl_pyzhuren && _status.sgsxjxfzmnl_pyzhuren[card.name]) {
				delete _status.sgsxjxfzmnl_pyzhuren[card.name];
			}
		},
		ai: { basic: { equipValue: 4 } },
		onLose() {
			if (player.storage.counttrigger?.sgsxjxfzmnl_pyzhuren_heart > 0) {
				delete player.storage.counttrigger.sgsxjxfzmnl_pyzhuren_heart;
			}
		},
	},
	sgsxjxfzmnl_pyzhuren_diamond: {
		cardimage: "pyzhuren_diamond",
		fullskin: true,
		derivation: "puyuan",
		cardcolor: "diamond",
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -1 },
		skills: ["sgsxjxfzmnl_pyzhuren_diamond"],
		onDestroy(card) {
			if (_status.sgsxjxfzmnl_pyzhuren && _status.sgsxjxfzmnl_pyzhuren[card.name]) {
				delete _status.sgsxjxfzmnl_pyzhuren[card.name];
			}
		},
		ai: { basic: { equipValue: 3 } },
	},
	sgsxjxfzmnl_pyzhuren_club: {
        cardimage: "pyzhuren_club",
		fullskin: true,
		derivation: "puyuan",
		cardcolor: "club",
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -1 },
		skills: ["sgsxjxfzmnl_pyzhuren_club"],
		onDestroy(card) {
			if (_status.sgsxjxfzmnl_pyzhuren && _status.sgsxjxfzmnl_pyzhuren[card.name]) {
				delete _status.sgsxjxfzmnl_pyzhuren[card.name];
			}
		},
		ai: { basic: { equipValue: 5 } },
		loseDelay: false,
		onLose() {
			// player.addTempSkill("sgsxjxfzmnl_pyzhuren_club_lose");
            player.recover();
		},
	},
	sgsxjxfzmnl_pyzhuren_spade: {
        cardimage: "pyzhuren_spade",
		fullskin: true,
		derivation: "puyuan",
		cardcolor: "spade",
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -8 },
		skills: ["sgsxjxfzmnl_pyzhuren_spade"],
		onDestroy(card) {
			if (_status.sgsxjxfzmnl_pyzhuren && _status.sgsxjxfzmnl_pyzhuren[card.name]) {
				delete _status.sgsxjxfzmnl_pyzhuren[card.name];
			}
		},
		ai: {
			basic: {
				equipValue: 3,
			},
		},
	},
	sgsxjxfzmnl_pyzhuren_shandian: {
        cardimage: "pyzhuren_shandian",
		fullskin: true,
		derivation: "puyuan",
		cardcolor: "spade",
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -8 },
		skills: ["sgsxjxfzmnl_pyzhuren_shandian"],
		onDestroy(card) {
			if (_status.sgsxjxfzmnl_pyzhuren && _status.sgsxjxfzmnl_pyzhuren[card.name]) {
				delete _status.sgsxjxfzmnl_pyzhuren[card.name];
			}
		},
		ai: {
			basic: {
				equipValue: 3,
			},
		},
	},

    qmsgswkjsgj_chuanguoyuxi:{
        audio: true,
        fullskin: true,
        type: "equip",
        subtype: "equip5",
        bingzhu: ["刘宏", "袁术", "司马炎"],
        skills: ["qmsgswkjsgj_chuanguoyuxi_skill"],
        ai: {
            equipValue: 9,
        },

    },
	//神肘不疑的五灵卡牌
	qmsgswkjsgj_wuqinxi_hu: {
		fullskin: true,
		noname: true,
        image:'image/card/wuqinxi_hu.png',
	},
	qmsgswkjsgj_wuqinxi_lu: {
		fullskin: true,
		noname: true,
        image:'image/card/wuqinxi_lu.png',
	},
	qmsgswkjsgj_wuqinxi_xiong: {
		fullskin: true,
		noname: true,
        image:'image/card/wuqinxi_xiong.png',
	},
	qmsgswkjsgj_wuqinxi_yuan: {
		fullskin: true,
		noname: true,
        image:'image/card/wuqinxi_yuan.png',
	},
	qmsgswkjsgj_wuqinxi_he: {
		fullskin: true,
		noname: true,
        image:'image/card/wuqinxi_he.png',
	},
    
};