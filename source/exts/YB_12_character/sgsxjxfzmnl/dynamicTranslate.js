import { lib, game, ui, get, ai, _status } from '../../../../../../noname.js';
export { dynamicTranslate };

const dynamicTranslate = {
	sgsxjxfzmnl_yuqi(player) {
		var info = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
		return '锁定技，有角色受伤后，若你与其距离小于等于<span class=thundertext>' + info[0] + '</span>，你可以观看牌堆顶<span class=firetext>' + info[1] + '</span>张牌，将其中至多<span class=greentext>' + info[2] + '</span>张交给受伤角色，至多<span class=yellowtext>' + info[3] + '</span>张自己获得，其余的牌放回牌堆顶。（三国杀仙界下凡怎么你了的曹金玉）';
	},
	sgsxjxfzmnl_miaojian(player) {
		return ['出牌阶段限一次，你可以使用[杀]当做一张不限次数的[刺杀]使用，或将一张锦囊牌当做[无中生有]使用。', '出牌阶段限两次，你可以将一张基本牌当做一张不限次数的[刺杀]使用，或将一张非基本牌当做[无中生有]使用。', '出牌阶段限三次，你可以视为使用一张不限次数的[刺杀]或视为使用一张[无中生有]。'][player.countMark('sgsxjxfzmnl_miaojian')];
	},
	sgsxjxfzmnl_shhlianhua(player) {
		return ['你成为其他角色使用[杀]的目标时，你摸一张牌。', '你成为其他角色使用[杀]的目标时，你摸一张牌，然后进行一次判定，若判定结果为黑色，则取消之。', '你成为其他角色使用牌的目标时，你摸一张牌，然后随机弃该角色一张牌，若该角色没有牌则取消之，若该角色成功弃牌则进行判定，若判定结果为黑色，取消之。'][player.countMark('sgsxjxfzmnl_shhlianhua')];
	},

	sgsxjxfzmnl_junkchigang(player) {
		if (player.storage.junkchigang) {
			return '转换技，锁定技。判定阶段开始前，你取消此阶段。然后你获得一个额外的：阳，摸牌阶段；<span class="bluetext">阴，出牌阶段。</span>';
		}
		return '转换技，锁定技。判定阶段开始前，你取消此阶段。然后你获得一个额外的：<span class="bluetext">阳，摸牌阶段</span>；阴，出牌阶段。';
	},

	sgsxjxfzmnl_dcsbquanmou(player) {
		const bool = player.storage.sgsxjxfzmnl_dcsbquanmou;
		let yang = '当你于本阶段内下次对其造成伤害时，取消之',
			yin = '当你于本阶段内下次对其造成伤害后，你可以选择至多三名其他角色，对这些角色依次造成1点伤害';
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = '转换技。①游戏开始时，你可以转换此技能状态；②出牌阶段每名角色限一次，你可以令一名其他角色交给你一张牌。',
			end = '。';
		return `${start}阳：${yang}；阴：${yin}${end}`;
	},
};
