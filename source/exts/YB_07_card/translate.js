import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {translate}

const translate = {
	//----------------------装备及其他

	yingbian_luLi_tag:'(勠力)',
	//应变触发时，横置所有目标
	
	ybsl_qingfengshan:'清风扇',
	ybsl_qingfengshan_info:'当你使用杀时，你可以令此【杀】附着风属性。',
	ybsl_zhongkai:'重铠',
	ybsl_zhongkai_info:'锁定技，风属性伤害和普通【杀】对你无效。',
	ybsl_zhongkai_1:'重铠',
	ybsl_zhongkai_2:'重铠',
	ybsl_frostnova:'冰霜新星',
	ybsl_frostnova_info:'出牌阶段，对所有其他角色使用。每名目标角色需打出一张【杀】，否则受到1点冰属性伤害。',
	ybsl_jinyinrukai:'金银褥铠',
	ybsl_jinyinrukai_info:'锁定技，风属性伤害和多目标伤害牌对你无效。',
	ybsl_jinyinrukai_1:'金银褥铠',
	ybsl_jinyinrukai_2:'金银褥铠',
	ybsl_jinyinrukai_ai:'金银褥铠',
	ybsl_jizhiguan:'集智冠',
	ybsl_jizhiguan_info:'你使用普通锦囊牌时，可以额外指定一名目标。',
	ybsl_feijingsanjian:'飞景三剑',//飞景，流彩，华锋
	ybsl_feijingsanjian_info:'锁定技，你对武将牌状态（横置或翻面状态）与你不同的角色造成的伤害+1。',
	ybsl_windstorm:'风卷残云',
	ybsl_windstorm_info:'出牌阶段，对所有其他角色使用。每名目标角色需打出一张【闪】，否则受到1点风属性伤害。',
	// ybsl_feijingsanjian_info:'若本回合没有角色进入过濒死状态，你使用牌指定唯一其他角色为目标后，你可以对你和该角色各造成一点伤害。',
	// ybsl_feijingsanjian_info:'出牌阶段开始时，你可以选择一项：<br>①翻面并对自己造成一点伤害，若如此做，本回合你使用牌时，令目标横置。<br>②弃置两张手牌，若如此做，本回合你造成伤害后，你与对方各摸一张牌。',

	ybsl_zhuanhuanka:'转换卡',
	ybsl_zhuanhuanka_info:'当你需要使用或打出牌时，你可以坍缩一张当前形态未坍缩的转换卡并使用或打出之。转换卡无法成为转化的目标牌。转换卡经使用或打出后转换。',//转换卡离开场上或因使用或打出而进入弃牌堆则转换

	ybsl_ji: '极',
	ybsl_ji_info: '转换卡，此牌视为：极：任意牌。',
	ybsl_yi: '仪',
	ybsl_yi_info: '转换卡，此牌视为：阳：任意牌；阴：任意牌。',
	ybsl_cai: '才',
	ybsl_cai_info: '转换卡，此牌视为：天：任意牌；地：任意牌；人：任意牌。',
	ybsl_xiang: '象',
	ybsl_xiang_info: '转换卡，此牌视为：春：任意牌；夏：任意牌；秋：任意牌；冬：任意牌。',
	ybsl_hua: '化',
	ybsl_hua_info: '转换卡，此牌视为：一：任意牌。此牌转换时，若此时为最后一项，使用者可以增加一项任意牌。（同一张化至多九项）',

}