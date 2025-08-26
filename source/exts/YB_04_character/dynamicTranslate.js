import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { dynamicTranslate }

const dynamicTranslate = {
	ybsl_benzhan:function(player){
        if (player.storage.yb016_shanbiao==true){
            return '锁定技，转换技，回合结束时或当你武将牌翻面时，阳：<span class="bluetext">你摸两张牌</span>；阴，你受到当前回合角色造成的1点伤害。<br><span class="bluetext">你阳状态下，受到的伤害-1</span>；<br>你阴状态下，造成的伤害-1。';
        }
        return '锁定技，转换技，回合结束时或当你武将牌翻面时，阳：你摸两张牌；阴，<span class="bluetext">你受到当前回合角色造成的1点伤害</span>。<br>你阳状态下，受到的伤害-1；<br><span class="bluetext">你阴状态下，造成的伤害-1</span>。';
	},
	zxunnamed_lingbo : (player, skill) => `转换技，出牌阶段，<span class=${player.storage[skill] ? '' : 'bluetext'}>阴：你可以将一名角色装备区内的牌当做【无中生有】对其使用</span><span class=${player.storage[skill] ? 'bluetext' : ''}>阳：你可以令一名角色将你装备区内的牌当做【杀】使用'</span>。`,

    ybsl_kanxiao(player){
        var num = player.getStorage("ybsl_kanxiao")-0+1;
        return '蓄力技（1/3）。每回合限'+get.cnNumber(num)+'次，①当你失去手牌后，你可以消耗1点蓄力值恢复一点体力；②当你受到伤害后或失去体力后，你可以消耗1点蓄力值摸两张牌。'
    },
    ybsl_shipin(player){
        var num = player.getStorage("ybsl_shipin")-0+1;
        return '锁定技，每回合限'+get.cnNumber(num)+'次，当你成为牌的目标时，或当你使用牌时若目标不包含你，若你手牌数与装备区牌数和不大于1，你展示手牌并获得1点蓄力值，若此牌不为锦囊牌，你弃置之并选择将【堪笑】或【示贫】改为每回合限两次。'
    }

}
