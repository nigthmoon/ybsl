import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { dynamicTranslate }

const dynamicTranslate = {
	ybsl_benzhan:function(player){
        if (player.storage.ybsl_benzhan==true){
            return '转换技，<span class="bluetext">阳：你可以将一张【杀】当伤害锦囊牌使用，或将一张伤害锦囊牌当【杀】使用；</span>阴：你可以将一张【闪】当非伤害锦囊牌使用，或将一张非伤害锦囊牌当【闪】使用。每回合限X次，当你使用此技能时，此技能不转换，X为你已损体力值。';
        }
        return '转换技，阳：你可以将一张【杀】当伤害锦囊牌使用，或将一张伤害锦囊牌当【杀】使用；<span class="bluetext">阴：你可以将一张【闪】当非伤害锦囊牌使用，或将一张非伤害锦囊牌当【闪】使用。</span>每回合限X次，当你使用此技能时，此技能不转换，X为你已损体力值。';
	},
	zxunnamed_lingbo : (player, skill) => `转换技，出牌阶段，<span class=${player.storage[skill] ? '' : 'bluetext'}>阴：你可以将一名角色装备区内的牌当做【无中生有】对其使用</span><span class=${player.storage[skill] ? 'bluetext' : ''}>阳：你可以令一名角色将你装备区内的牌当做【杀】使用'</span>。`,

    ybsl_kanxiao(player){
        var num = player.getStorage("ybsl_kanxiao")-0+1;
        return '蓄力技（1/3）。每回合限'+get.cnNumber(num)+'次，①当你失去手牌后，你可以消耗1点蓄力值恢复一点体力；②当你受到伤害后或失去体力后，你可以消耗1点蓄力值摸两张牌。'
    },
    ybsl_shipin(player){
        var num = player.getStorage("ybsl_shipin")-0+1;
        return '锁定技，每回合限'+get.cnNumber(num)+'次，当你成为牌的目标时，或当你使用牌时若目标不包含你，若你手牌数与装备区牌数和不大于1，你展示手牌并获得1点蓄力值，若此牌不为锦囊牌，你弃置之并选择将【堪笑】或【示贫】改为每回合限两次。'
    },
    ybsl_shehao(player){
        if (player.storage.ybsl_shehao==true){
            return '转换技，当你使用非虚拟或转化的非装备牌后，你需选择是否：阴：将此牌置入装备区一个空栏；<span class="bluetext">阳：弃置装备区一张同类型的牌，然后摸X张牌或视为使用一张该牌名的虚拟牌（X为其中的牌与触发技能使用的牌[花色，点数，牌名字数]相同的项数）。</span><br>此技能选是不转，选否才转。'
        }
        else {
            return '转换技，当你使用非虚拟或转化的非装备牌后，你需选择是否：<span class="bluetext">阴：将此牌置入装备区一个空栏；</span>阳：弃置装备区一张同类型的牌，然后摸X张牌或视为使用一张该牌名的虚拟牌（X为其中的牌与触发技能使用的牌[花色，点数，牌名字数]相同的项数）。<br>此技能选是不转，选否才转。'
        }
    },
}
