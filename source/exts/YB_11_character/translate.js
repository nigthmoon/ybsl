import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
import {skill}from './skill.js'
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
	yhky_lzyjuekang_info:`${get.poptip("rule_chihengji")}。①游戏开始时，你获得20枚“道心”标记。②当你得到牌后/受到1点伤害后/造成1点伤害后，你获得5/10/15枚“道心”（上限为99枚）。③若你的“道心”数不小于25/50/75/99，你视为拥有${get.poptip('yhky_lzyzhanjue')}/${get.poptip('yhky_lzyfengpo')}/${get.poptip('yhky_lzyfengjian')}/${get.poptip('yhky_lzyfenshen')}。`,
	yhky_lzyzhanjue:'战绝',//不具有“珏抗”标记的
	yhky_lzyzhanjue_info:get.poptip("rule_chihengji")+'。出牌阶段，若你本阶段内因〖战绝〗得到过的牌数小于3，则你可以将所有手牌当做【决斗】使用。此【决斗】使用结算结束后，你摸一张牌。然后所有因此【决斗】受到过伤害的角色也各摸一张牌。',
	yhky_lzyyanyu:'燕语',
	yhky_lzyyanyu_info:get.poptip("rule_chihengji")+'。一名角色的出牌阶段开始时，你可以弃置一张牌。若如此做，则该出牌阶段内限三次，当一张与你弃置的牌类别相同的其他牌进入弃牌堆后，你可令任意一名角色获得此牌。',
	yhky_lzyzhaolie:'昭烈',//并标记为“珏抗”
	yhky_lzyzhaolie_info:get.poptip("rule_chihengji")+'。摸牌阶段摸牌时，你可以少摸一张牌并指定攻击范围内的一名角色。你亮出牌堆顶的三张牌，将其中的非基本牌和【桃】置于弃牌堆，然后你选择一项：1.你对其造成X点伤害，然后其获得这些基本牌；2.弃置其X张牌，然后你获得这些基本牌。（X为其中非基本牌的数量）',
	yhky_lzyfengpo: "凤魄",
	yhky_lzyfengpo_info: get.poptip("rule_chihengji")+"。当你使用【杀】或【决斗】指定唯一目标后，你可观看目标角色的手牌并选择一项：⒈摸X张牌。⒉令此牌的伤害值基数+X（X为其手牌中的红色牌数）。",
	yhky_lzyfengjian: "封缄",
	yhky_lzyfengjian2:'封缄',
	yhky_lzyfengjian_info: get.poptip("rule_chihengji")+"。锁定技，受到你伤害的角色于其下个回合结束前，无法使用牌指定你为目标。",
	// yhky_lzyfengpo_info: "持恒技。①当你使用【杀】或【决斗】指定唯一目标后，你可观看目标角色的手牌并选择一项：⒈摸X张牌。⒉令此牌的伤害值基数+X（X为其手牌中的♦数）。②当你杀死一名角色后，你将〖凤魄①〗中的“♦数”改为“红色牌数”。",
	yhky_lzyfenshen:'焚身',
	yhky_lzyfenshen_info:get.poptip("rule_chihengji")+'。限定技。出牌阶段，你可以令所有角色依次将体力调整至1并获得X点护甲（X为一名角色以此法变化的体力值且你以此法获得的护甲数额外+2）。然后你将牌堆、弃牌堆、场上及所有角色手牌中的【闪】、【桃】和【酒】牌名改为火【杀】且增加如下“向死存汉”的全局技能：当有牌进入弃牌堆后，系统将这些牌中的【闪】、【桃】和【酒】改为火【杀】。',
	yhky_lzyjuejing:'绝境',
	yhky_lzyjuejing_info:get.poptip("rule_chihengji")+'。锁定技。①摸牌阶段，你令额定摸牌数+X（X为你已损失的体力值）。②你的手牌上限+2。',

	yhky_caoying:'恒曹婴',
	yhky_caoying_prefix:'恒',

	yhky_cylingwei:'凌威',
	yhky_cylingwei_info:`${get.poptip("rule_chihengji")}，①游戏开始时你获得20枚“凌人”值。②当你${get.poptip('yhky_cylingren')}猜对1/2/3时，你获得5/10/15点“凌人”值（上限为99）。③当你“凌人”值不小于25/50/75/99时获得${get.poptip('yhky_cyluoyi')}/${get.poptip('yhky_cyjiuxian')}/${get.poptip('yhky_cyyinjun')}/${get.poptip('yhky_cyqinlong')}。`,
	yhky_cyluoyi:'裸衣',
	yhky_cyluoyi_info:get.poptip("rule_chihengji")+'，出牌阶段开始时，你可弃置一张牌然后摸两张牌并展示之，若你弃置的牌或摸到的牌包含:基本牌，直到下回合开始，你使用【杀】或【决斗】造成的伤害+1；锦囊牌:本回合使用【杀】次数+1；装备牌，本回合使用【杀】无距离限制。',
	yhky_cyjiuxian:'救陷',
	yhky_cyjiuxian_info:get.poptip("rule_chihengji")+'，出牌阶段限一次，你可以重铸x张牌(x为手牌与装备区数量之和的一半向上取整)，然后视为对一名角色使用【决斗】，此法对目标造成伤害时，你可以令你或攻击范围内一名角色回复1点体力并摸两张牌。',
	yhky_cyyinjun:'寅君',
	yhky_cyyinjun_info:get.poptip("rule_chihengji")+'，当你使用对应实体牌均为你的手牌的【杀】或锦囊牌结算后，若目标为1，你可以视为对该目标使用一张无伤害来源的【杀】。本回合寅君次数大于体力上限时，该技能本回合失效。',
	yhky_cyqinlong:'擒龙',
	yhky_cyqinlong_info:get.poptip("rule_chihengji")+'，限定技，出牌阶段，你可以令所有角色调整体力值为1并获得x点护甲(x为以此法减少的体力，你额外获得2点)，令场上获得坦诚相待光环（可以看见其他角色的手牌）。',
	yhky_cylingren:'凌人',
	yhky_cylingren_info:`${get.poptip("rule_chihengji")}，每回合限两次，<br>当你使用带有伤害类基本牌或普通锦囊牌指定目标后，你可以猜测其中的一个目标的手牌中是否有基本牌，锦囊牌或装备牌。若你猜中的项目数：≥1，此牌对该角色的伤害+1；≥2，你令该目标不可响应此牌；≥3，你从${get.poptip('yhky_cyjianxiong')}，${get.poptip('yhky_cyxingshang')}，${get.poptip('yhky_cyhuituo')}选择一项获得。<br>当你成为其他角色伤害牌的目标时，你可猜测其是否含有基本、锦囊、装备，若你猜中的项目数：≥1，undefined；≥2，此牌对你伤害-1；≥3，弃置其至多两张牌。<br>以上以此法每猜对一项摸一张牌。`,
	// yhky_cylingren_info:'持恒技，每回合各项限一次，<br>当你使用带有伤害标签的基本牌或普通锦囊牌指定目标后，你可以猜测其中一个目标手牌中，是否含有基本、锦囊、装备。猜对至少一项，此牌伤害+1；两项，你令此牌对任意目标不可响应并可额外增加一个目标；三项，你从〖奸雄〗，〖行殇〗，〖恢拓〗选择一项获得。<br>当你成为其他角色伤害牌的目标时，你可猜测其是否含有基本、锦囊、装备，猜对至少1项，此伤害-1；2项，弃置其至多2张牌；三项你增加一点体力上限并回复2点体力。<br>以上以此法每猜对一项摸一张牌。',
	yhky_cyjianxiong:'奸雄',
	yhky_cyjianxiong_info:get.poptip("rule_chihengji")+'，当你受到伤害后，你可以获得对你造成伤害的牌并摸一张牌。',
	yhky_cyxingshang:'行殇',
	yhky_cyxingshang_info:get.poptip("rule_chihengji")+'，当其他角色死亡后，你可以选择一项：回复1点体力，或获得其所有牌。',
	yhky_cyhuituo:'恢拓',
	yhky_cyhuituo_info:get.poptip("rule_chihengji")+'，当你受到伤害后，你可以令一名角色进行一次判定，若结果为红色，该角色回复1点体力；若结果为黑色，该角色摸X张牌（X为此次伤害的伤害点数）。',
	yhky_cyzhanlong:'斩龙',
	yhky_cyzhanlong_info:get.poptip("rule_chihengji")+'，每回合限一次，你使用【杀】或【决斗】的结算中，你可令目标角色（【决斗】改为对方）非锁定技失效。',

	yhky_diaochan:'恒貂蝉',
	yhky_diaochan_prefix:'恒',
	yhky_dcyingwu:'盈舞',
	yhky_dcyingwu_info:`${get.poptip("rule_chihengji")}。①游戏开始时，你<span style="text-decoration: line-through;">念一句台词</span>获得20枚“魅力”标记。②当有一种花色的牌每回合首次进入弃牌堆时/你受到1点伤害后/造成1点伤害后，你获得5/10/15枚“魅力”（上限为99枚）。③若你的“魅力”数不小于20/40/60/80/99，你视为拥有${get.poptip('yhky_dclihun')}/${get.poptip('yhky_dclianji')}/${get.poptip('yhky_dcjiuchi')}/${get.poptip('yhky_dczuixiao')}/${get.poptip('yhky_dchuayan')}。`,
	yhky_dclihun:'离魂',
	yhky_dclihun_info:get.poptip("rule_chihengji")+'。出牌阶段限一次，你可以弃置一张牌，并选择一名其他男性角色，你观看其手牌，然后你可以令其视为对另一名男性角色使用一张【决斗】（不可被【无懈可击】响应）。',
	yhky_dclianji:'连计',
	yhky_dclianji_info:get.poptip("rule_chihengji")+'。出牌阶段限一次，你可令一名其他角色摸一张牌，然后令其视为使用一张你指定的伤害基本或锦囊牌。',
	yhky_dcmoucheng:'谋逞',
	yhky_dcmoucheng_info:get.poptip("rule_chihengji")+'。每回合限一次。你可以将一张黑色牌当【借刀杀人】使用。',
	yhky_dcjiuchi:'酒池',
	yhky_dcjiuchi_info:get.poptip("rule_chihengji")+'。你可以将一张♠牌当作【酒】使用。',
	yhky_dczuixiao:'醉霄',
	yhky_dczuixiao_info:get.poptip("rule_chihengji")+'。出牌阶段限一次，你可以视为对一名其他角色使用【酗酒】，然后其视为使用一张【酒】。',
	// yhky_dczuixiao_info:get.poptip("rule_chihengji")+'。当有角色于你的回合内受到伤害后，你可以令其本回合获得'+get.poptip("jiuchi")+'。本回合结束时，若其本回合没有使用过【酒】，你可令其失去一点体力。',
	// yhky_dczuixiao_info:get.poptip("rule_chihengji")+'。当有角色于你的回合内受到伤害后，你可以令其本回合获得'+get.poptip("jiuchi")+'。本回合结束时，若其本回合没有使用过【酒】，你可令其失去一点体力。',
	yhky_dchuayan:'化烟',
	//<br><li>${get.poptip("yhky_dclihun")}改为：${get.poptip("rule_chihengji")}。出牌阶段限一次，你可以弃置一张牌，并选择一名其他男性角色，你观看其手牌，然后可以依次选择其中一张令其使用之（至多为其体力值数且至多为5），然后你可以令其视为对另一名男性角色使用一张【决斗】（以此法使用的牌不可被【无懈可击】响应）。
	//<br><li>${get.poptip("yhky_dclianji")}改为：${get.poptip("rule_chihengji")}。出牌阶段限一次，你可令一名其他角色摸一张牌，然后令其视为使用一张你指定的基本或锦囊牌。
	//<br><li>${get.poptip("yhky_dcmoucheng")}改为：${get.poptip("rule_chihengji")}。每回合限一次。你可以将一张黑色牌当【借刀杀人】使用。
	//<br><li>${get.poptip("yhky_dczuixiao")}改为：${get.poptip("rule_chihengji")}。出牌阶段限一次，你可以令一名其他角色视为使用一张【酒】，然后可以视为对其使用一张【煽风点火】。
	//<br><li>${get.poptip("yhky_dcchanjuan")}改为：${get.poptip("rule_chihengji")}。当其他角色于你的回合内使用牌时，你移去6点魅力值，然后依次执行①摸一张牌；②令此牌基础伤害或恢复值+1；③使其本回合获得${get.poptip("wushuang")}。
	yhky_dchuayan_info:get.poptip("rule_chihengji")+'。限定技，出牌阶段，你可以进入“'+get.poptip({
		id: "yhky_dcjuewu",
		name: "绝舞",
		type: "character",
		info: `开启后，其他技能在此形态下均有变化：
			<br><li>${get.poptip("yhky_dclihun")}改为：${get.poptip("rule_chihengji")}。出牌阶段限一次，你可以弃置一张牌，并选择一名其他男性角色，你观看其手牌，然后可以依次选择其中一张令其对你指定的一名目标使用之（目标需合法，至多执行次数为其体力值数且至多为5），然后你可以令其视为对另一名男性角色使用一张【决斗】（以此法使用的牌不可被【无懈可击】响应）。
			<br><li>${get.poptip("yhky_dclianji")}改为：${get.poptip("rule_chihengji")}。出牌阶段限一次，你可令一名其他角色摸一张牌，然后令其视为使用一张你指定的基本或锦囊牌。
			<br><li>${get.poptip("yhky_dcjiuchi")}改为：${get.poptip("rule_chihengji")}。你可以将一张♠牌当作【酒】使用。你使用【酒】无次数限制。
			<br><li>${get.poptip("yhky_dczuixiao")}改为：${get.poptip("rule_chihengji")}。出牌阶段限一次，你可以视为对一名其他角色使用【酗酒】，然后其视为使用一张【酒】，然后可以视为对其使用一张【煽风点火】。
			<br><li>${get.poptip("yhky_dcchanjuan")}改为：${get.poptip("rule_chihengji")}。当其他角色于你的回合内使用牌时，你移去6点魅力值。然后依次执行①摸两张牌；②令此牌基础伤害或恢复值+1；③使其本回合获得${get.poptip("wushuang")}。
			
		`,
	})+'”状态，然后令全场所有角色获得一层“酒”状态。',
	
	// ${skill.yhky_dcyingwu.derivation.includes('yhky_dclihun')?`<br><li>${get.poptip("yhky_dclihun")}改为：${get.poptip("rule_chihengji")}。出牌阶段限一次，你可以弃置一张牌，并选择一名其他男性角色，你观看其手牌，然后可以依次选择其中一张令其使用之（至多为其体力值数且至多为5），然后你可以令其视为对另一名男性角色使用一张【决斗】（以此法使用的牌不可被【无懈可击】响应）。`:''}
			
	// ${skill.yhky_dcyingwu.derivation.includes('yhky_dclianji')?`<br><li>${get.poptip("yhky_dclianji")}改为：${get.poptip("rule_chihengji")}。出牌阶段限一次，你可令一名其他角色摸一张牌，然后令其视为使用一张你指定的基本或锦囊牌。`:''}
	
	// ${skill.yhky_dcyingwu.derivation.includes('yhky_dcmoucheng')?`<br><li>${get.poptip("yhky_dcmoucheng")}改为：${get.poptip("rule_chihengji")}。每回合限一次。你可以将一张牌当【借刀杀人】使用。`:''}
	
	// ${skill.yhky_dcyingwu.derivation.includes('yhky_dcjiuchi')?`<br><li>${get.poptip("yhky_dcjiuchi")}改为：${get.poptip("rule_chihengji")}。你可以将一张♠牌当作【酒】使用。你使用【酒】无次数限制。`:''}

	// ${skill.yhky_dcyingwu.derivation.includes('yhky_dczuixiao')?`<br><li>${get.poptip("yhky_dczuixiao")}改为：${get.poptip("rule_chihengji")}。出牌阶段限一次，你可以令一名其他角色视为使用一张【酒】，然后可以视为对其使用一张【煽风点火】。`:''}
	
	//无法增加“魅力”值直到状态结束，
	//，且场上角色的“酒”状态回合结束不移除
	yhky_dcchanjuan:'婵娟',
	yhky_dcchanjuan_info:get.poptip("rule_chihengji")+'。当其他角色于你的回合内使用牌时，你可以选择①摸一张牌；②令此牌基础伤害或恢复值+1；③使其本回合获得'+get.poptip("wushuang")+'；④'+get.poptip("rule_beishui")+'：移去6点魅力值。',//当有角色进入或脱离【酒】状态时，你可以摸一张牌（这句作废）。








	
}