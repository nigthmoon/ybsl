import { lib, game, ui, get, ai, _status } from '../../../../../../noname.js';
export { dynamicTranslate };

const dynamicTranslate = {
	qmsgswkjsgj_miaojian(player) {
		return ['出牌阶段限一次，你可以将一张基本牌当作刺【杀】使用，该刺【杀】不计入次数限制。', '出牌阶段限一次，你可以视为使用一张刺【杀】，该刺【杀】不计入次数限制。', '出牌阶段限一次，你可以视为使用一张刺【杀】，该刺【杀】不计入次数限制且无距离限制。'][player.countMark('qmsgswkjsgj_miaojian')];
	},
	qmsgswkjsgj_shhlianhua(player) {
		return ['你成为其他角色【杀】的目标后，你摸一张牌，然后进行一次判定，若结果为黑桃，则取消之。', '你成为其他角色【杀】的目标后，你摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果为黑桃，则取消之。', '你成为其他角色【杀】的目标后，你摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果为黑色，则取消之。'][player.countMark('qmsgswkjsgj_shhlianhua')];
	},

	qmsgswkjsgj_shenci_miaojian(player) {
		return ['出牌阶段限一次，你可以视为使用一张刺【杀】，该刺【杀】不计入次数限制且无距离限制。', '出牌阶段限一次，你可以视为使用一张刺【杀】，该刺【杀】不计入次数限制且无距离限制。你的【杀】均可视为刺【杀】', '出牌阶段限一次，你可以视为使用一张刺【杀】，你的【杀】均可视为刺【杀】。刺【杀】无次数和距离限制。'][player.countMark('qmsgswkjsgj_shenci_miaojian')];
	},
	qmsgswkjsgj_shenci_shhlianhua(player) {
		return ['你成为其他角色【杀】的目标后，你摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果为黑桃，则取消之。', '你成为其他角色【杀】的目标后，你摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果为黑色，则取消之。', '你成为其他角色牌的目标后，你可以摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果不为红桃，则取消之。'][player.countMark('qmsgswkjsgj_shenci_shhlianhua')];
	},

	qmsgswkjsgj_potkuanggu: function (player) {
		if (player.getStorage('potkuanggu', 0)) {
			return lib.translate['qmsgswkjsgj_potkuanggu_pot_weiyan_achieve_info'];
		}
		return lib.translate['qmsgswkjsgj_potkuanggu_info'];
	},
	qmsgswkjsgj_pothanzhan(player) {
		let str = lib.translate.qmsgswkjsgj_pothanzhan_info;
		if (!player.storage.pothanzhan) {
			return str;
		}
		return str.replace(
			'X为你的体力上限',
			'X为' +
				{
					hp: '你的体力值',
					damagedHp: '你的损失体力值',
					countplayer: '场上存活角色数',
				}[player.storage.pothanzhan],
		);
	},
	qmsgswkjsgj_potzhanlie(player) {
		let str = lib.translate.qmsgswkjsgj_potzhanlie_info;

		if (player?.storage?.potzhanlie) {
			str = str.replace(
				'X为你本次移除的标记数',
				'X为' +
					{
						hp: '你的体力值',
						damagedHp: '你的损失体力值',
						countplayer: '场上存活角色数',
					}[player.storage.potzhanlie],
			);
		}
		if (player?.hasSkill('qmsgswkjsgj_potzhanlie_plus')) {
			str = str.replace('你的出牌阶段结束时', '每名角色出牌阶段结束时');
		}
		return str;
	},

	qmsgswkjsgj_shenci_dczhangcai(player) {
		return '当你失去一张' + (player.hasSkill('qmsgswkjsgj_shenci_dczhangcai_all') ? '' : '点数为8的') + '牌时，你可以摸X张牌（X为你手牌区里' + (player.hasSkill('qmsgswkjsgj_shenci_dczhangcai_all') ? '与此牌点数相同' : '点数为8') + '的牌数且至少为1）。';
	},
	qmsgswkjsgj_shenci_cmhuituo(player) {
		var list = ['该角色回复X点体力', '该角色摸X张牌'];
		var storage = player.countMark('qmsgswkjsgj_shenci_cmhuituo') % 2;
		return `${get.poptip('rule_chihengji')}。当你受到1点伤害后，你可以令一名角色进行一次判定，若结果为红色，${list[storage]}；若结果为黑色，${list[storage ? 0 : 1]}。（X为此次伤害的伤害点数）`;
	},

	qmsgswkjsgj_re_dcpingzhi(player) {
		const bool = player.storage.qmsgswkjsgj_re_dcpingzhi;
		let yang = '你弃置此牌，然后其视为对你使用一张【火攻】，若其未因此造成伤害则此技能视为未发动过',
			yin = '然后你代替其使用此牌</据小说解释，本质上就算是那个人使用这张牌，这是盻睇吗>，若此牌造成伤害则此技能视为未发动过';
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = '转换技。出牌阶段限三次，你可观看一名角色的手牌并展示其中一张牌，',
			end = '。';
		return `${start}阳：${yang}；阴：${yin}${end}`;
	},

	qmsgswkjsgj_re_yuqi(player) {
		var info = lib.skill.qmsgswkjsgj_re_yuqi.getInfo(player);
		return '每回合限<span class=YB_snowtext>' + info[0] + '</span>次。当有角色受到1点伤害后，若你至其的距离不大于<span class=thundertext>' + info[1] + '</span>，则你可以观看牌堆顶的<span class=firetext>' + info[2] + '</span>张牌。你将其中至多<span class=greentext>' + info[3] + '</span>张牌交给受伤角色，然后可以获得剩余牌中的至多<span class=yellowtext>' + info[4] + '</span>张牌，并将其余牌以原顺序放回牌堆顶。（所有具有颜色的数字至多为体力上限）（全民三国杀我开局神郭嘉的界曹金玉）';
	},
};
