import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {translate}

const translate = {
	yhky_wei:'魏武纵略',
	yhky_shu:'蜀汉昭义',
	yhky_wu:'江东铁壁',
	yhky_qun:'群雄逐鹿',
	yhky_jin:'三分一统',
	yhky_shen:'神人无功',

	yhky_shlizhaoyi:'恒李昭仪',
	yhky_shlizhaoyi_prefix:'恒',

	yhky_lzyjuekang:'珏抗',
	yhky_lzyjuekang_info:`持恒技。①游戏开始时，你获得20枚“道心”标记。②当你得到牌后/受到1点伤害后/造成1点伤害后，你获得5/10/15枚“道心”（上限为99枚）。③若你的“道心”数不小于25/50/75/99，你视为拥有${get.poptip('yhky_lzyzhanjue')}/${get.poptip('yhky_lzyfengfo')}/${get.poptip('yhky_lzyfengjian')}/${get.poptip('yhky_lzyfenshen')}。`,
	yhky_lzyzhanjue:'战绝',//不具有“珏抗”标记的
	yhky_lzyzhanjue_info:'持恒技。出牌阶段，若你本阶段内因〖战绝〗得到过的牌数小于3，则你可以将所有手牌当做【决斗】使用。此【决斗】使用结算结束后，你摸一张牌。然后所有因此【决斗】受到过伤害的角色也各摸一张牌。',
	yhky_lzyyanyu:'燕语',
	yhky_lzyyanyu_info:'持恒技。一名角色的出牌阶段开始时，你可以弃置一张牌。若如此做，则该出牌阶段内限三次，当一张与你弃置的牌类别相同的其他牌进入弃牌堆后，你可令任意一名角色获得此牌。',
	yhky_lzyzhaolie:'昭烈',//并标记为“珏抗”
	yhky_lzyzhaolie_info:'持恒技。摸牌阶段摸牌时，你可以少摸一张牌并指定攻击范围内的一名角色。你亮出牌堆顶的三张牌，将其中的非基本牌和【桃】置于弃牌堆，然后你选择一项：1.你对其造成X点伤害，然后其获得这些基本牌；2.弃置其X张牌，然后你获得这些基本牌。（X为其中非基本牌的数量）',
	yhky_lzyfengpo: "凤魄",
	yhky_lzyfengpo_info: "持恒技。当你使用【杀】或【决斗】指定唯一目标后，你可观看目标角色的手牌并选择一项：⒈摸X张牌。⒉令此牌的伤害值基数+X（X为其手牌中的红色牌数）。",
	yhky_lzyfengjian: "封缄",
	yhky_lzyfengjian2:'封缄',
	yhky_lzyfengjian_info: "持恒技。锁定技，受到你伤害的角色于其下个回合结束前，无法使用牌指定你为目标。",
	// yhky_lzyfengpo_info: "持恒技。①当你使用【杀】或【决斗】指定唯一目标后，你可观看目标角色的手牌并选择一项：⒈摸X张牌。⒉令此牌的伤害值基数+X（X为其手牌中的♦数）。②当你杀死一名角色后，你将〖凤魄①〗中的“♦数”改为“红色牌数”。",
	yhky_lzyfenshen:'焚身',
	yhky_lzyfenshen_info:'持恒技。限定技。出牌阶段，你可以令所有角色依次将体力调整至1并获得X点护甲（X为一名角色以此法变化的体力值且你以此法获得的护甲数额外+2）。然后你将牌堆、弃牌堆、场上及所有角色手牌中的【闪】、【桃】和【酒】牌名改为火【杀】且增加如下“向死存汉”的全局技能：当有牌进入弃牌堆后，系统将这些牌中的【闪】、【桃】和【酒】改为火【杀】。',
	yhky_lzyjuejing:'绝境',
	yhky_lzyjuejing_info:'持恒技。锁定技。①摸牌阶段，你令额定摸牌数+X（X为你已损失的体力值）。②你的手牌上限+2。',

	yhky_caoying:'恒曹婴',
	yhky_caoying_prefix:'恒',

	yhky_cylingwei:'凌威',
	yhky_cylingwei_info:`持恒技，①游戏开始时你获得20枚“凌人”值。②当你${get.poptip('yhky_cylingren')}猜对1/2/3时，你获得5/10/15点“凌人”值（上限为99）。③当你“凌人”值不小于25/50/75/99时获得${get.poptip('yhky_cyluoyi')}/${get.poptip('yhky_cyjiuxian')}/${get.poptip('yhky_cyyinjun')}/${get.poptip('yhky_cyqinlong')}。`,
	yhky_cyluoyi:'裸衣',
	yhky_cyluoyi_info:'持恒技，出牌阶段开始时，你可弃置1张牌然后摸2张牌并展示之，若你弃置的牌或摸到的牌包含:基本牌，直到下回合开始，你使用【杀】或【决斗】造成的伤害+1；锦囊牌:本回合使用【杀】次数+1；装备牌，本回合使用【杀】无距离限制。',
	yhky_cyjiuxian:'救陷',
	yhky_cyjiuxian_info:'持恒技，出牌阶段限一次，你可以重铸x张牌(x为手牌与装备区数量之和的一半向上取整)，然后视为对一名角色使用【决斗】，此法对目标造成伤害时，你可以令你或攻击范围内一名角色回复1点体力并摸2张牌。',
	yhky_cyyinjun:'寅君',
	yhky_cyyinjun_info:'持恒技，当你使用对应实体牌均为你的手牌的【杀】或锦囊牌结算后，若目标为1，你可以视为对该目标使用一张无伤害来源的【杀】。本回合寅君次数大于体力上限时，该技能本回合失效。',
	yhky_cyqinlong:'擒龙',
	yhky_cyqinlong_info:'持恒技，限定技，出牌阶段，你可以令所有角色调整体力值为1并获得x点护甲(x为以此法减少的体力，你额外获得2点)，令场上获得坦诚相待光环（可以看见其他角色的手牌）。',
	yhky_cylingren:'凌人',
	yhky_cylingren_info:`持恒技，每回合限两次，<br>当你使用带有伤害类基本牌或普通锦囊牌指定目标后，你可以猜测其中的一个目标的手牌中是否有基本牌，锦囊牌或装备牌。若你猜中的项目数：≥1，此牌对该角色的伤害+1；≥2，你令该目标不可响应此牌；≥3，你从${get.poptip('yhky_cyjianxiong')}，${get.poptip('yhky_cyxingshang')}，${get.poptip('yhky_cyhuituo')}选择一项获得。<br>当你成为其他角色伤害牌的目标时，你可猜测其是否含有基本、锦囊、装备，若你猜中的项目数：≥1，undefined；≥2，此牌对你伤害-1；≥3，弃置其至多2张牌。<br>以上以此法每猜对一项摸一张牌。`,
	// yhky_cylingren_info:'持恒技，每回合各项限一次，<br>当你使用带有伤害标签的基本牌或普通锦囊牌指定目标后，你可以猜测其中一个目标手牌中，是否含有基本、锦囊、装备。猜对至少一项，此牌伤害+1；两项，你令此牌对任意目标不可响应并可额外增加一个目标；三项，你从〖奸雄〗，〖行殇〗，〖恢拓〗选择一项获得。<br>当你成为其他角色伤害牌的目标时，你可猜测其是否含有基本、锦囊、装备，猜对至少1项，此伤害-1；2项，弃置其至多2张牌；三项你增加一点体力上限并回复2点体力。<br>以上以此法每猜对一项摸一张牌。',
	yhky_cyjianxiong:'奸雄',
	yhky_cyjianxiong_info:'持恒技，当你受到伤害后，你可以获得对你造成伤害的牌并摸一张牌。',
	yhky_cyxingshang:'行殇',
	yhky_cyxingshang_info:'持恒技，当其他角色死亡后，你可以选择一项：回复1点体力，或获得其所有牌。',
	yhky_cyhuituo:'恢拓',
	yhky_cyhuituo_info:'持恒技，当你受到伤害后，你可以令一名角色进行一次判定，若结果为红色，该角色回复1点体力；若结果为黑色，该角色摸X张牌（X为此次伤害的伤害点数）。',
	yhky_cyzhanlong:'斩龙',
	yhky_cyzhanlong_info:'持恒技，每回合限一次，你使用【杀】或【决斗】的结算中，你可令目标角色（【决斗】改为对方）非锁定技失效。',







}