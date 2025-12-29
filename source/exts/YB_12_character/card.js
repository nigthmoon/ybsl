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