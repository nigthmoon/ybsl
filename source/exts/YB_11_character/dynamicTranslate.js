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
    yhky_dclijian(player){
        if(player.storage.yhky_dchuayan_dcjuewu)return get.poptip("rule_chihengji")+'。出牌阶段限一次，你可以弃置一张牌，并选择一名其他男性角色，你观看其手牌，然后可以依次选择其中一张令其对你指定的一名目标使用之（目标需合法，至多至多执行次数为其体力值数且至多为5），然后你可以令其视为对另一名男性角色使用一张【决斗】（以此法使用的牌不可被【无懈可击】响应）。'
        return get.poptip("rule_chihengji")+'。出牌阶段限一次，你可以弃置一张牌，并选择一名其他男性角色，你观看其手牌，然后你可以令其视为对另一名男性角色使用一张【决斗】（不可被【无懈可击】响应）。'
    },
	yhky_dclianji(player){
        if(player.storage.yhky_dchuayan_dcjuewu)return get.poptip("rule_chihengji")+'。出牌阶段限一次，你可令一名其他角色摸一张牌，然后令其视为使用一张你指定的基本或锦囊牌。'
        return get.poptip("rule_chihengji")+'。出牌阶段限一次，你可令一名其他角色摸一张牌，然后令其视为使用一张你指定的伤害基本或锦囊牌。'
    },
	yhky_dcmoucheng(player){
        if(player.storage.yhky_dchuayan_dcjuewu)return get.poptip("rule_chihengji")+'。每回合限一次。你可以将一张牌当【借刀杀人】使用。'
        return get.poptip("rule_chihengji")+'。每回合限一次。你可以将一张黑色牌当【借刀杀人】使用。'
    },
    yhky_dcjiuchi(player){
        if(player.storage.yhky_dchuayan_dcjuewu)return get.poptip("rule_chihengji")+'。你可以将一张♠牌当作【酒】使用。你使用【酒】无次数限制。'
        return get.poptip("rule_chihengji")+'。你可以将一张♠牌当作【酒】使用。'
    },
	yhky_dczuixiao(player){
        if(player.storage.yhky_dchuayan_dcjuewu)return get.poptip("rule_chihengji")+'。出牌阶段限一次，你可以视为对一名其他角色使用【酗酒】，然后其视为使用一张【酒】，然后可以视为对其使用一张【煽风点火】。'
        return get.poptip("rule_chihengji")+'。出牌阶段限一次，你可以视为对一名其他角色使用【酗酒】，然后其视为使用一张【酒】。'
    },
	yhky_dcchanjuan(player){
        if(player.storage.yhky_dchuayan_dcjuewu)return get.poptip("rule_chihengji")+'。当其他角色于你的回合内使用牌时，你移去6点魅力值。然后依次执行①摸两张牌；②令此牌基础伤害或恢复值+1；③使其本回合获得'+get.poptip("wushuang")+'。'//当有角色进入或脱离【酒】状态时，你可以摸一张牌（这句作废）。'
        return get.poptip("rule_chihengji")+'。当其他角色于你的回合内使用牌时，你可以选择①摸一张牌；②令此牌基础伤害或恢复值+1；③使其本回合获得'+get.poptip("wushuang")+'；④'+get.poptip("rule_beishui")+'：移去6点魅力值。'//当有角色进入或脱离【酒】状态时，你可以摸一张牌（这句作废）。'
    },

    
}