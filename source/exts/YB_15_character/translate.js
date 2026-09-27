import { lib, game, ui, get, ai, _status } from '../../../../../noname.js';
export { translate };

const translate = {
	lianzhao_zhangliao: '张辽',
	lianzhao_zhangliao_ab: '威张辽',
	lianzhao_zhangliao_prefix: '威',
	lianzhao_lvbu: '吕布',
	lianzhao_lvbu_ab: '威吕布',
	lianzhao_lvbu_prefix: '威',
	
	zhangliao_yuxi: '驭袭',
	zhangliao_yuxi_info: '当你造成或受到伤害时，你可以摸一张牌。你使用以此法获得的牌无次数限制（且不计入次数）。',
	zhangliao_porong: '破戎',
	zhangliao_porong_info: '连招技（伤害牌 + 杀）。你可以获得目标角色及其相邻角色各一张手牌，且此牌额外结算一次。',
	lvbu_xiaowu:'骁武',
	lvbu_xiaowu_info:'出牌阶段限一次，你可从牌堆获得一张牌面信息中有【杀】字的牌(以此法获得的牌不计次数)。当你造成伤害后，此技能视为未发动过。',
	lvbu_baguan:'霸关',
	// lvbu_baguan_info:'连招技·强制(指定自己为目标的牌+武器牌)，你可将至多X张手牌当基础伤害为X的【杀】使用(X为你武器牌字数)。',
	// lvbu_baguan_info:'连招技·强制(指定自己为目标的牌+武器牌)，你可将至多X张手牌当基础伤害为Y的【杀】使用(此杀不计入次数无次数限制，X为你武器牌字数，Y为你武器牌攻击范围)。',
	lvbu_baguan_info:'连招技·强制(指定自己为目标的牌+武器牌)，你可将至多X张手牌当基础伤害为Y的【杀】使用(此杀不计入次数无次数限制，X为你武器牌字数，Y为以次法选择的牌数)。',
};
