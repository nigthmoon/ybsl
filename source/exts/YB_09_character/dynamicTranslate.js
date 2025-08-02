import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { dynamicTranslate }

const dynamicTranslate = {
    North_smk_shangying:function(player){
        var str='锁定技。1.回合开始/结束时，若场上有武器牌，你选择1个获得之。2.当你于一回合内使用或打出第X张牌时，你摸X张牌。3.若X不小于1/2/3/4/5，你拥有';
        var list=['〖涯角〗（OL）','〖挑衅〗（OL界）','〖咆哮〗（OL界）','〖铁骑〗（OL界）','〖武圣〗（OL界）'];
        // if(player.getAttackRange()>=1)list[0]='<span class=yellowtext>'+list[0]+'</span>';
        // if(player.getAttackRange()>=2)list[1]='<span class=yellowtext>'+list[1]+'</span>';
        // if(player.getAttackRange()>=3)list[2]='<span class=yellowtext>'+list[2]+'</span>';
        // if(player.getAttackRange()>=4)list[3]='<span class=yellowtext>'+list[3]+'</span>';
        // if(player.getAttackRange()>=5)list[4]='<span class=yellowtext>'+list[4]+'</span>';
        for(var i=0;i<list.length;i++){
            if(i!=0)str+='/';
            if(player.getAttackRange()>i){str+='<span class=yellowtext>'+list[i]+'</span>';}
            else{str+=list[i];}
        }
        str+='。4.一名角色回合结束后，若你本回合失去的牌不小于X，你摸2张牌（X为你的攻击范围）。';
        return str;
    },
    North_bmh_huanchao:function(player){
        if(player.storage.North_bmh_huanchao_ben==true)return '限定技。转换技。出牌阶段，你可弃置三张不同类型的牌，并执行，<span class=thundertext>阳：令拥有“献”的角色依次回复X点体力</span>；阴：令拥有“率”的角色依次失去X点体力。执行结束后，相关角色弃置“巫治”标记（X为此技能发动次数）。'
        return '限定技。转换技。出牌阶段，你可弃置三张不同类型的牌，并执行，阳：令拥有“献”的角色依次回复X点体力；<span class=thundertext>阴：令拥有“率”的角色依次失去X点体力</span>。执行结束后，相关角色弃置“巫治”标记（X为此技能发动次数）。';
    },
    North_zx_ningao:function(player){
        var str='锁定技。当你的体力值变化时，你摸一张牌；当你已损失体力值不小于0/1/2/3/4时，你';
        var list=['可以将一张方块牌当作火【杀】使用或打出','使用牌不能被响应','回合外失去牌后可以使用一张【杀】','可以将1张红桃牌当作【桃】使用','手牌数恒为8。'];
        // if(player.getAttackRange()>=1)list[0]='<span class=yellowtext>'+list[0]+'</span>';
        // if(player.getAttackRange()>=2)list[1]='<span class=yellowtext>'+list[1]+'</span>';
        // if(player.getAttackRange()>=3)list[2]='<span class=yellowtext>'+list[2]+'</span>';
        // if(player.getAttackRange()>=4)list[3]='<span class=yellowtext>'+list[3]+'</span>';
        // if(player.getAttackRange()>=5)list[4]='<span class=yellowtext>'+list[4]+'</span>';
        for(var i=0;i<list.length;i++){
            if(i!=0)str+='/';
            if(player.maxHp-player.hp>=i){str+='<span class=yellowtext>'+list[i]+'</span>';}
            else{str+=list[i];}
        }
        return str;
    },
    
    "YB_nobody_guiyin":function(player){
        var players=game.filterPlayer(function(current){
            return current!=player&&current.inRange(player);
        });
        if(players.length!=1)return '锁定技，若攻击范围内包含你的角色数量为1，则其获得牌时你摸等量的牌，<span class=thundertext>否则你使用基本牌或普通锦囊牌时结算两次且可以额外指定任意名角色为目标。</span>';
        else return '锁定技，若攻击范围内包含你的角色数量为1，<span class=thundertext>则其（'+get.translation(players[0])+'）获得牌时你摸等量的牌</span>，否则你使用基本牌或普通锦囊牌时结算两次且可以额外指定任意名角色为目标。';
    },
}