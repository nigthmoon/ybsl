import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { dynamicTranslate }

const dynamicTranslate = {//动态翻译
    
	ybsl_xianyin:function(player){//弦音
		var str0=`转换技，（括号内的阴阳为${get.poptip('ybsl_luanming')}的形态）<br/>`;
		var str1='阳（阳）：当你因弃置而失去一张黑桃牌时，你可令一名角色下个摸牌阶段额外摸一张牌；';
		var str2='阳（阴）：当你因弃置而失去一张梅花牌时，你可令一名角色回复1点体力；';
		var str3='阳（阳）：当你因弃置而失去一张红桃牌时，你可令一名角色失去1点体力；';
		var str4='阴（阴）：当你因弃置而失去一张方块牌时，你可令一名角色下个摸牌阶段少摸一张牌。';
		var str5='<span class="bluetext">';//蓝色字符
		var str6='<span class=yellowtext>';//黄色字符
		var str7='<span class=firetext>';//红色字符
		var str8='</span>';
		var str9='（若你没有鸾鸣或鸾鸣已使用则改为黑色牌）<br/>';
		var str10='（若你没有鸾鸣或鸾鸣已使用则改为红色牌）<br/>';
		if(player.storage.ybsl_xianyin==true) {//弦音阳
			if(player.storage.ybsl_luanming==true){//鸾鸣阳
				if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
					var str=str0+str1+str9+str6+str2+str8+str9+str3+str10+str5+str4+str8+str10;//√
				}
				else{//--------------------------------无鸾鸣
					var str=str0+str1+str9+str6+str2+str9+str8+str3+str10+str5+str4+str10+str8;//√
				}
			}
			else{//-------------------------------------鸾鸣阴
				if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
					var str=str0+str6+str1+str8+str9+str2+str9+str5+str3+str8+str10+str4+str10;//√
				}
				else{//--------------------------------无鸾鸣
					var str=str0+str6+str1+str9+str8+str2+str9+str5+str3+str10+str8+str4+str10;//√
				}
			}
		}
		else{//---------------------------------弦音阴
			if(player.storage.ybsl_luanming==true){//鸾鸣阳
				if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
					var str=str0+str1+str9+str5+str2+str8+str9+str3+str10+str6+str4+str8+str10;
				}
				else{//------------------------------无鸾鸣
					var str=str0+str1+str9+str5+str2+str9+str8+str3+str10+str6+str4+str10+str8;
				}
			}
			else{//---------------------------------鸾鸣阴
				if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
					var str=str0+str5+str1+str8+str9+str2+str9+str6+str3+str8+str10+str4+str10;
				}
				else{//-------------------------------无鸾鸣
					var str=str0+str5+str1+str9+str8+str2+str9+str6+str3+str10+str8+str4+str10;
				}
			}
		}
		return str;
	},
	ybsl_luanming:function(player){//鸾鸣
		if(player.storage.ybsl_luanming==true) return '转换技，每回合限一次，你可以弃置一黑一红共两张牌：阳：视为使用其中的黑色牌并额外执行一次；<span class="bluetext">阴：视为使用其中的红色牌并额外执行一次</span>。';
		return '转换技，每回合限一次，你可以弃置一黑一红共两张牌：<span class="bluetext">阳：视为使用其中的黑色牌并额外执行一次；</span>阴：视为使用其中的红色牌并额外执行一次。';
	},
    
	ybsl_benzhan:function(player){
        if (player.storage.ybsl_benzhan==true){
            return '转换技，<span class="bluetext">阳：你可以将一张【杀】当伤害锦囊牌使用，或将一张伤害锦囊牌当【杀】使用；</span>阴：你可以将一张【闪】当非伤害锦囊牌使用，或将一张非伤害锦囊牌当【闪】使用。每回合限X次，当你使用此技能时，此技能不转换，X为你已损体力值。';
        }
        return '转换技，阳：你可以将一张【杀】当伤害锦囊牌使用，或将一张伤害锦囊牌当【杀】使用；<span class="bluetext">阴：你可以将一张【闪】当非伤害锦囊牌使用，或将一张非伤害锦囊牌当【闪】使用。</span>每回合限X次，当你使用此技能时，此技能不转换，X为你已损体力值。';
	},
	zxunnamed_lingbo : (player, skill) => `转换技，出牌阶段，<span class=${player.storage[skill] ? '' : 'bluetext'}>阳：你可以将一名角色装备区内的牌当做【无中生有】对其使用</span><span class=${player.storage[skill] ? 'bluetext' : ''}>阴：你可以令一名角色将你装备区内的牌当做【杀】使用</span>。`,
	ddddssssbbbb_chouxuan : (player, skill) => player.storage[skill].translate || lib.translate[skill + '_info'],

    ybsl_kanxiao(player){
        var num = player.getStorage("ybsl_kanxiao")-0+1;
        return '蓄力技（1/3）。每回合限'+get.cnNumber(num)+'次，①当你失去手牌后，你可以消耗1点蓄力值恢复一点体力；②当你受到伤害后或失去体力后，你可以消耗1点蓄力值摸两张牌。'
    },
    ybsl_shipin(player){
        var num = player.getStorage("ybsl_shipin")-0+1;
        return '锁定技，每回合限'+get.cnNumber(num)+'次，当你成为牌的目标时，或当你使用牌时若目标不包含你，若你手牌数与装备区牌数和不大于1，你展示手牌并获得1点蓄力值，若此牌不为锦囊牌，你弃置之并选择将〖堪笑〗或〖示贫〗改为每回合限两次。'
    },
    ybsl_shehao(player){
        if (player.storage.ybsl_shehao==true){
            return '转换技，当你使用非虚拟或转化的非装备牌后，你需选择是否：阳：将此牌置入装备区一个空栏；<span class="bluetext">阴：选择装备区一张同类型的牌，然后弃置之并摸X张牌或将之当作触发此技能的牌使用（X为弃置的牌与触发技能使用的牌[花色，点数，牌名字数]相同的项数），以此法使用的牌不计入次数且无次数限制。</span><br>此技能选是不转，选否才转。'
        }
        else {
            return '转换技，当你使用非虚拟或转化的非装备牌后，你需选择是否：<span class="bluetext">阳：将此牌置入装备区一个空栏；</span>阴：选择装备区一张同类型的牌，然后弃置之并摸X张牌或将之当作触发此技能的牌使用（X为弃置的牌与触发技能使用的牌[花色，点数，牌名字数]相同的项数），以此法使用的牌不计入次数且无次数限制。<br>此技能选是不转，选否才转。'
        }
    },
    zxunnamed_huaiyi(player, skill) {
		const storage = player.storage[skill]
		const items = player.storage.zxunnamed_huaiyi_items
		let str = `转换技，出牌阶段限一次，你可以<span class=${storage ? '' : 'bluetext'}>1.弃置两张牌并获得或重置${get.poptip('zxunnamed_shixian')}</span>`
		let list = [...get.skillInfoTranslation('zxunnamed_shixian', player).matchAll(/(?<=\d\.).*?(?=，\d\.|；)/g)]
		for (const i in items)
			str += `，<span class=${storage == Number(i) + 1 ? 'bluetext' : ''}>${Number(i) + 2}.${list[items[i]]}</span>`
		return str + '。'
	},
	Fe3O4_chichi : (player, skill) => `转换技，你可以以<span class=${player.storage[skill] ? '' : 'bluetext'}>阳：明置</span><span class=${player.storage[skill] ? 'bluetext' : ''}>阴：重铸</span>方式使用手牌。`,
}