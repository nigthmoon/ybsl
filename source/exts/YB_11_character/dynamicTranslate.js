import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { dynamicTranslate }

const dynamicTranslate = {
	// yhky_lzyfengpo(player) {
	// 	if (player.storage.yhky_lzyfengpo) return "当你使用【杀】或【决斗】指定唯一目标后，你可观看目标角色的手牌并选择一项：⒈摸X张牌。⒉令此牌的伤害值基数+X（X为其手牌中的红色牌数）。";
	// 	return "①当你使用【杀】或【决斗】指定唯一目标后，你可观看目标角色的手牌并选择一项：⒈摸X张牌。⒉令此牌的伤害值基数+X（X为其手牌中的♦数）。②当你杀死一名角色后，你将〖凤魄①〗中的“♦数”改为“红色牌数”。";
	// },
    
    // "YB_nobody_guiyin":function(player){
    //     var players=game.filterPlayer(function(current){
    //         return current!=player&&current.inRange(player);
    //     });
    //     if(players.length!=1)return '锁定技，若攻击范围内包含你的角色数量为1，则其获得牌时你摸等量的牌，<span class=thundertext>否则你使用基本牌或普通锦囊牌时结算两次且可以额外指定任意名角色为目标。</span>';
    //     else return '锁定技，若攻击范围内包含你的角色数量为1，<span class=thundertext>则其（'+get.translation(players[0])+'）获得牌时你摸等量的牌</span>，否则你使用基本牌或普通锦囊牌时结算两次且可以额外指定任意名角色为目标。';
    // },
}