import { lib, game, ui, get, ai, _status } from '../../../../../../noname.js';
export { translate };

const translate = {

	//-----------------------蒸蒸日上，全力氪金，言贵者斩

	zzrsqlkjygzz: '蒸蒸日上，全力氪金，言贵者斩',
	zzrsqlkjygzz_info: '蒸蒸日上，全力氪金，言贵者斩<br>平台：番茄小说<br>作者：浅埋',

	zzrsqlkjygzz_re_zuoci: '氪界左慈',
	zzrsqlkjygzz_re_zuoci_prefix: '氪界',

	zzrsqlkjygzz_yi_caocao: '异曹操', //2/2
	zzrsqlkjygzz_yi_caocao_prefix: '异',
	zzrsqlkjygzz_Ejianxiong: '奸雄',
	zzrsqlkjygzz_Ejianxiong_info: '当你受到伤害后，你可以获得对你造成伤害的牌。受到伤害或流失体力后，未死亡则回复满体力。',

	zzrsqlkjygzz_yi_guanyu: '异关羽', //10/10
	zzrsqlkjygzz_yi_guanyu_prefix: '异',
	zzrsqlkjygzz_Ewusheng: '武圣',
	zzrsqlkjygzz_Ewusheng_info: '出牌阶段，可将一张牌当作伤害牌，每种牌名限一次；每次发动摸一张牌。出牌无距离和次数限制。',

	zzrsqlkjygzz_shen_guanyu: '氪神关羽',
	zzrsqlkjygzz_shen_guanyu_prefix: '氪神',
	zzrsqlkjygzz_wushen: '武神',
	zzrsqlkjygzz_wushen_info: '锁定技，你的红桃手牌视为【杀】；你使用红桃【杀】无距离和次数限制且不能被响应，且额外选择所有有“梦魇”的角色为目标，伤害+1。',
	zzrsqlkjygzz_wuhun: '武神',
	zzrsqlkjygzz_wuhun_info: '锁定技，受到1点伤害后，伤害来源获得1枚“梦魇”；当你对有“梦魇”的角色造成伤害后，其获得1枚“梦魇”；你脱离濒死状态或死亡时，可判定：若结果不为【桃】或【桃园结义】，选择至少一名有“梦魇”的角色，这些角色各失去“梦魇”标记数点体力，“梦魇”最多的角色死亡。',

	zzrsqlkjygzz_yi_zhangjiao: '异张角',
	zzrsqlkjygzz_yi_zhangjiao_prefix: '异',
	zzrsqlkjygzz_Eleiji: '雷击',
	zzrsqlkjygzz_Eleiji_info: '你使用牌指定或被指定为目标时，使1名其他角色流失1点体力，并使其获得1个“雷损”标记；每有一个“雷损”标记其受到〖雷击〗流失体力数+1。',
	zzrsqlkjygzz_Eguidao: '鬼道',
	zzrsqlkjygzz_Eguidao_info: `${get.poptip('rule_chihengji')}，受到伤害或流失体力时，可判定：不为红桃，防止之并选择一名角色进行〖雷击〗；你的判定牌不可被更改。`,

	zzrsqlkjygzz_yi2_zhangjiao: '异张角',
	zzrsqlkjygzz_yi2_zhangjiao_prefix: '异',
	zzrsqlkjygzz_Esanshou: '三首',
	zzrsqlkjygzz_Esanshou_info: '直接影响过异张角的技能对异张角·地无效。',

	zzrsqlkjygzz_yi3_zhangjiao: '异张角',
	zzrsqlkjygzz_yi3_zhangjiao_prefix: '异',

	zzrsqlkjygzz_shen_zhangjiao: '氪神张角',
	zzrsqlkjygzz_shen_zhangjiao_prefix: '氪神',
	zzrsqlkjygzz_tianjie: '天劫',
	zzrsqlkjygzz_tianjie_info: '每回合结束时，你可以对任意名其他角色各造成X点雷电伤害（X为其手牌中【闪】的数量且至少为1）。',

	zzrsqlkjygzz_yi_luxun: '异陆逊',
	zzrsqlkjygzz_yi_luxun_prefix: '异',
	zzrsqlkjygzz_Eqianxun: '谦逊',
	zzrsqlkjygzz_Eqianxun_info: '你不会受到任何效果影响（卡牌，技能，伤害），当牌堆洗牌时，你<font color=red>死亡</font>。',
	zzrsqlkjygzz_Elianying: '连营',
	zzrsqlkjygzz_Elianying_info: '当你在场时，其他角色始终保持铁索连环状态；只要有一人以上处于铁索连环状态，属性伤害将会反复传导。',

	zzrsqlkjygzz_shen_luxun: '氪神陆逊',
	zzrsqlkjygzz_shen_luxun_prefix: '氪神',
	zzrsqlkjygzz_junlue: '军略',
	zzrsqlkjygzz_junlue_info: '锁定技，场上所有人体力值每减少1点，你获得1枚“军略”。',
	zzrsqlkjygzz_cuike: '摧克',
	zzrsqlkjygzz_cuike_info: '每个回合开始时，你可以横置1名角色并对1名角色造成1点火焰伤害。每个回合结束时，若“军略”数量超过5个，你可以弃全部“军略”并使本技能所有数字加一。',

	zzrsqlkjygzz_yi_sunce: '异孙策',
	zzrsqlkjygzz_yi_sunce_prefix: '异',
	zzrsqlkjygzz_Ejiang: '激昂',
	zzrsqlkjygzz_Ejiang_info: '锁定技，本局游戏除【决斗】外的黑色牌无效，其他角色每失去一张黑色牌时，流失1点体力。',
	zzrsqlkjygzz_Ehunzi: '魂姿',
	zzrsqlkjygzz_Ehunzi_info: `${get.poptip('rule_chihengji')}，当你死亡后，你视为存在于场上直至游戏结束；当场上有于吉存在并死亡时，你失去所有技能并<font color=red>死亡</font>。`,

	zzrsqlkjygzz_shen_sunce: '氪神孙策',
	zzrsqlkjygzz_shen_sunce_prefix: '氪神',
	zzrsqlkjygzz_yingba: '英霸',
	zzrsqlkjygzz_yingba_info: '每轮开始时，你可减1点体力上限。你对有“平定”的角色使用牌无距离限制。',
	zzrsqlkjygzz_pinghe: '冯河',
	zzrsqlkjygzz_pinghe_info: '锁定技，你的手牌上限等于体力上限。当你受到伤害或体力流失后，你减少等量体力上限并使体力值变为1点；每当你减少体力上限时，其他角色减1点体力上限且获得1没平定标记。',

	zzrsqlkjygzz_yao_zhoutai: '氪妖周泰',
	zzrsqlkjygzz_yao_zhoutai_prefix: '氪妖',
	zzrsqlkjygzz_Юbuqu: '不屈',
	zzrsqlkjygzz_Юbuqu_info: '锁定技，你不能成为【杀】的目标。当你处于濒死状态时，你将牌堆顶的一张牌至于你的武将牌上，称为“创”，若此牌的点数与已有的“创”点数均不同，则你将体力回复至1点，否则将其置入弃牌堆。当“创”的数量大于6时，你的“创”可以当手牌打出。',

	zzrsqlkjygzz_boss_lvbu: '氪虎牢神吕布',
	zzrsqlkjygzz_boss_lvbu_prefix: '氪虎牢神',
	zzrsqlkjygzz_jiwu: '极武',
	zzrsqlkjygzz_jiwu_info: `出牌阶段，你可以弃置一张牌，然后本回合获得下列技能中的一个：〖${get.poptip('minireqiangxi')}〗、〖${get.poptip('minisbtieji')}〗、〖${get.poptip('decadexuanfeng')}〗、〖${get.poptip('minirewansha')}〗。`,
	//对你没看错，是手牌。原文这么写的
	minireqiangxi: '强袭',
	minireqiangxi_info: '出牌阶段对每名其他角色限一次，你可以失去1点体力并摸一张牌，对你攻击范围内的一名其他角色造成1点伤害；其他角色受到伤害时，你可以弃置一张装备牌并令伤害值+1。',
	minisbtieji: '铁骑',
	minisbtieji_info: '①当你使用【杀】指定其他角色为目标后，你可以令目标角色不能响应此【杀】，且其所有非锁定技失效直到回合结束。然后你与其进行谋弈。若你赢，且你选择的选项为：“直取敌营”，则你获得其一张牌；“扰阵疲敌”，你摸两张牌。②当你谋弈成功后，你本回合使用【杀】的次数上限+1，然后你可以弃置一张牌并从牌堆或弃牌堆获得一张【杀】。',
	// zzrsqlkjygzz_xuanfeng:'旋风',
	// zzrsqlkjygzz_xuanfeng_info:'。',
	minirewansha: '完杀',
	minirewansha_info: '锁定技，你的回合内，只有你可以使用【桃】；出牌阶段开始时，你可令一名体力值大于1的其他角色失去1点体力，本阶段结束时，其回复1点体力。',

};
