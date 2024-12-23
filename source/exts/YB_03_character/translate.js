import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {translate}

const translate = {  
	ybxh_ssj:'世俗界',
	'ybxh_ssj_info':'大坑待填',
	ybxh_linyi:'林逸',
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
	_ybxh_neijialiupai:'内家流派',
	_ybxh_neijialiupai_info:'内家流派起始手牌以及摸牌阶段获得的牌均标记为真气',
	ybxh_zhanglongliyao:'张龙李妖',
	'xhzlly_guihuo':'诡祸',
	'xhzlly_guihuo_info':'锁定技，当你对其他角色造成伤害时或受到其他角色造成的伤害时，此伤害+1，然后若双方均存活，你获得对方的一张牌；锁定技，杀死你的角色获得【诡祸】。',
	// 'xhzlly_guihuo_append':'至游戏结束。不加上怕被喷写的不明确，加上又不太简洁，只好这样了。',
	'xhzlly_guihuo_append':'就不写“至游戏结束”。反正意思已经表达到了。',
	ybxh_yukun:'雨坤',
	'xhyk_qietu':'窃图',
	'xhyk_qietu_info':'窃图',
	'xhyk_shagou':'杀狗',
	'xhyk_shagou_info':'杀狗',
	//----------------------装备及其他
}