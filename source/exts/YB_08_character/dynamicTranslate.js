import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { dynamicTranslate }

const dynamicTranslate = {//动态翻译
	ybmjz_jianxiong:function(player){
		if(!player.storage.ybmjz_jianxiong_gai)return '当你受到伤害后，你可以获得对你造成伤害的牌并摸X张牌（X为本次伤害值且至少为一）。每局游戏限一次，当你以此法获得未记录的点数的牌时，你可以展示并记录该牌点数，然后若已记录点数不少于9个，你依次执行：①增加一点体力上限；②获得你武将牌上未生效的主公技；③修改【奸雄】。';
		return '当你受到伤害后，你可以获得对你造成伤害的牌并摸X张牌（X为已损体力值且至少为一）。';
	}
}