import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { dynamicTranslate }

const dynamicTranslate = {
	ybsl_benzhan:function(player){
        if (player.storage.yb016_shanbiao==true){
            return '锁定技，转换技，回合结束时或当你武将牌翻面时，阳：<span class="bluetext">你摸两张牌</span>；阴，你受到当前回合角色造成的1点伤害。<br><span class="bluetext">你阳状态下，受到的伤害-1</span>；<br>你阴状态下，造成的伤害-1。';
        }
        return '锁定技，转换技，回合结束时或当你武将牌翻面时，阳：你摸两张牌；阴，<span class="bluetext">你受到当前回合角色造成的1点伤害</span>。<br>你阳状态下，受到的伤害-1；<br><span class="bluetext">你阴状态下，造成的伤害-1</span>。';
	},
}
