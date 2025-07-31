import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { dynamicTranslate }

const dynamicTranslate = {//动态翻译
	ybmjz_jianxiong:function(player){
		if(!player.storage.ybmjz_jianxiong_gai)return '当你受到伤害后，你可以获得对你造成伤害的牌并摸X张牌（X为本次伤害值且至少为一）。每局游戏限一次，当你以此法获得未记录的点数的牌时，你可以展示并记录该牌点数，然后若已记录点数不少于9个，你依次执行：①增加一点体力上限；②获得你武将牌上未生效的主公技；③修改【奸雄】。';
		return '当你受到伤害后，你可以获得对你造成伤害的牌并摸X张牌（X为已损体力值且至少为一）。';
	},
	ybmjz_mumu:function(player){
		var str = '出牌阶段，你可弃置x张牌并发动对应项，然后删去此项直到回合结束。<br>';
		if(player.storage.ybmjz_mumu_list){
			let playerStorageList = player.storage.ybmjz_mumu_list.map((i, index) => {
				return (index + 1) + '. ' + i[0];
			}).join('<br>');
			str+=playerStorageList;
		}
		str+='<br>x为此对应的第几项。';
		return str;
	},
	ybmjz_mumuxx:function(player){
		var str = '出牌阶段，你可弃置x张牌并发动对应项，然后删去此项直到回合结束。<br>';
		if(player.storage.ybmjz_mumuxx_list){
			let playerStorageList = player.storage.ybmjz_mumuxx_list.map((i, index) => {
				return (index + 1) + '. ' + i[0];
			}).join('<br>');
			str+=playerStorageList;
		}
		str+='<br>x为此对应的第几项。';
		return str;
	}
}