import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { dynamicTranslate }

const dynamicTranslate = {//动态翻译
	// ybmjz_jianxiong:function(player){
	// 	if(!player.storage.ybmjz_jianxiong_gai)return '当你受到伤害后，你可以获得对你造成伤害的牌并摸X张牌（X为本次伤害值且至少为一）。每局游戏限一次，当你以此法获得未记录的点数的牌时，你可以展示并记录该牌点数，然后若已记录点数不少于9个，你依次执行：①增加一点体力上限；②获得你武将牌上未生效的主公技；③修改【奸雄】。';
	// 	return '当你受到伤害后，你可以获得对你造成伤害的牌并摸X张牌（X为已损体力值且至少为一）。';
	// }
	sgskjdbzjms_fenglei:function(player){
		var storage = player.storage.sgskjdbzjms_fenglei;
		var str = '永续转换技';
		var str2 = '，出牌阶段限一次：'
		var strwind = '风，你弃置两张牌，直到你的下一回开始之前，你不在其他角色攻击范围内';
		var strthunder = '雷，你摸两张牌，当前回合使用牌无视距离';
		if(storage){
			if(player.hasSkill('sgskjdbzjms_fenglei_thunder'))return '<span class=yellowtext>'+str+'</span>' +str2+strwind+'；'+'<span class=yellowtext>'+strthunder+'</span>'+'。';
			return str+str2+strwind+'；'+'<span class=thundertext>'+strthunder+'</span>'+'。';
		}
		else{
			if(player.hasSkill('sgskjdbzjms_fenglei_wind'))return '<span class=yellowtext>'+str+'</span>' +str2+'<span class=yellowtext>'+strwind+'</span>'+'；'+strthunder+'。';
			return str+str2+'<span class=thundertext>'+strwind+'</span>'+'；'+strthunder+'。';
		}
	},
	sgsxjxfzmnl_yuqi(player) {
		var info = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
		return "锁定技，有角色受伤后，若你与其距离小于等于<span class=thundertext>" + info[0] + "</span>，你可以观看牌堆顶<span class=firetext>" + info[1] + "</span>张牌，将其中至多<span class=greentext>" + info[2] + "</span>张交给受伤角色，至多<span class=yellowtext>" + info[3] + "</span>张自己获得，其余的牌放回牌堆顶。"
	},
	sgsxjxfzmnl_miaojian(player) {
		return [
			"出牌阶段限一次，你可以使用[杀]当做一张不限次数的[刺杀]使用，或将一张锦囊牌当做[无中生有]使用。",
			"出牌阶段限两次，你可以将一张基本牌当做一张不限次数的[刺杀]使用，或将一张非基本牌当做[无中生有]使用。",
			"出牌阶段限三次，你可以视为使用一张不限次数的[刺杀]或视为使用一张[无中生有]。"
		][player.countMark("sgsxjxfzmnl_miaojian")];
	},
	sgsxjxfzmnl_shhlianhua(player) {
		return [
			"你成为其他角色使用[杀]的目标时，你摸一张牌。",
			"你成为其他角色使用[杀]的目标时，你摸一张牌，然后进行一次判定，若判定结果为黑色，则取消之。",
			"你成为其他角色使用牌的目标时，你摸一张牌，然后随机弃该角色一张牌，若该角色没有牌则取消之，若该角色成功弃牌则进行判定，若判定结果为黑色，取消之。"
		][player.countMark("sgsxjxfzmnl_shhlianhua")];
	},

















	
	qmsgswkjsgj_miaojian(player) {
		return [
			"出牌阶段限一次，你可以将一张基本牌当作刺【杀】使用，该刺【杀】不计入次数限制。",
			"出牌阶段限一次，你可以视为使用一张刺【杀】，该刺【杀】不计入次数限制。",
			"出牌阶段限一次，你可以视为使用一张刺【杀】，该刺【杀】不计入次数限制且无距离限制。"
		][player.countMark("qmsgswkjsgj_miaojian")];
	},
	qmsgswkjsgj_lianhua(player) {
		return [
			"你成为其他角色【杀】的目标后，你摸一张牌，然后进行一次判定，若结果为黑桃，则取消之。",
			"你成为其他角色【杀】的目标后，你摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果为黑桃，则取消之。",
			"你成为其他角色【杀】的目标后，你摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果为黑色，则取消之。"
		][player.countMark("qmsgswkjsgj_lianhua")];
	},
}