import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {translate}

const translate = {  
	ssj_ybxh_ssj:'世俗界',
	'ssj_ybxh_ssj_info':'大坑待填',
	ssj_ybxh_linyi:'林逸',
	'xhly_yulong':'驭龙',
	'xhly_yulong_info':'锁定技，当你体力值变化后，若此是你本局游戏首次变为该数值，你从随机三个带有“龙”字的技能中选择一个获得。',
	'xhly_tiancan':'天蚕',
	'xhly_tiancan_info':'当其他角色使用牌时，若其手牌数不大于你，你可以观看其手牌。',
	'xhly_baihe':'白鹤',
	'xhly_baihe_info':'锁定技，当你获得此技能时，创建集合A{杀，闪，桃，酒}；当你使用或成为牌的目标时，若你有对应记录，你移除之，然后若你记录均已移除，你重置集合A、加一点体力上限并回复一点体力。',
	'xhly_wuji':'武技',
	'xhly_wuji_info':'每回合限一次，当场上角色使用非装备牌时，你可以记录此牌的牌名，并为此牌名添加一个花色（此花色根据此牌对应的首个实体牌的花色确定）。你可以于合适的时机将一种花色的真气牌当作与之关联的牌使用。 你于摸牌阶段获得的牌均标记为真气。',
	'xhly_wuji_use':'转化',
	'xhly_duotian':'夺天',
	'xhly_duotian_info':'当你失去牌时，你可以记录此次失去牌数（至多为5）并覆盖上次；锁定技，你的摸牌阶段，你额外摸此技能记录的牌数，并移除记录。',
	xhly_duotian_ey:'夺天',
	xhly_duotian_ey_info:'假如本次失去牌数大于标记就自动记录。',
	xhly_wuji_draw:'真气',
	xhly_wuji_draw_info:'你于摸牌阶段获得的牌均标记为真气',
	_ssj_ybxh_neijialiupai:'内家流派',
	_ssj_ybxh_neijialiupai_info:'拥有真气上限和初始真气，摸牌阶段结束时获得真气。',
	// _ssj_ybxh_neijialiupai_info:'内家流派起始手牌以及摸牌阶段获得的牌均标记为真气',
	ssj_ybxh_zhanglongliyao:'张龙李妖',
	'xhzlly_guihuo':'诡祸',
	'xhzlly_guihuo_info':'锁定技，当你对其他角色造成伤害时或受到其他角色造成的伤害时，此伤害+1，然后若双方均存活，你获得对方的一张牌；锁定技，杀死你的角色获得【诡祸】。',
	// 'xhzlly_guihuo_append':'至游戏结束。不加上怕被喷写的不明确，加上又不太简洁，只好这样了。',
	'xhzlly_guihuo_append':'就不写“至游戏结束”。反正意思已经表达到了。',
	ssj_ybxh_wangzhifeng:'王智峰',
	'xhwzf_cangyan':'藏艳',
	//；当你的“藏艳”牌被其他角色观看时，你需交给其两张非“藏艳”手牌（不足全给）
	//无名杀不存在这个时机，故此嘎掉
	'xhwzf_cangyan_info':'准备阶段，你可以获得一张女性武将牌置于手牌中；结束阶段，根据你手牌中的“藏艳”牌数，执行：不小于一张，摸两张牌；不小于两张，回复一点体力；不小于三张，增加一点体力上限，然后获得一张女武将。当你“藏艳”牌被弃置后，你失去一点体力。',
	ssj_ybxh_yukun:'雨坤',
	'xhyk_qietu':'窃图',
	'xhyk_qietu_info':'窃图',
	'xhyk_shagou':'杀狗',
	'xhyk_shagou_info':'杀狗',
	//----------------------装备及其他
}