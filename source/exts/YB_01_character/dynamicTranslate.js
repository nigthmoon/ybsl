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
		if(player.storage.ybsl_luanming==true) return '转换技，每回合限一次，当你可以使用牌时，你可以弃置一黑一红共两张牌，然后：阳：视为使用其中的黑色牌并额外执行一次；<span class="bluetext">阴：视为使用其中的红色牌并额外执行一次。</span><br><span class=yellowtext>注意：此技能不能用于响应其他牌，更不能在别人濒死时用【桃】选择其为目标！</span>';
		return '转换技，每回合限一次，当你可以使用牌时，你可以弃置一黑一红共两张牌，然后：<span class="bluetext">阳：视为使用其中的黑色牌并额外执行一次；</span>阴：视为使用其中的红色牌并额外执行一次。<br><span class=yellowtext>注意：此技能不能用于响应其他牌，更不能在别人濒死时用【桃】选择其为目标！</span>';
	},
	yb001_minglun:function(player){
		var str='锁定技，回合开始时，你展示牌堆顶一张牌并放在武将牌上，至多放四张。根据“命轮”的花色，你视为拥有技能：<br>';
		var list={'spade':`黑桃：${get.poptip('yb001_minglun_spade')}`,'heart':`红桃：${get.poptip('yb001_minglun_heart')}`,'club':`<br>梅花：${get.poptip('yb001_minglun_club')}`,'diamond':`方块：${get.poptip('yb001_minglun_diamond')}`};
		for(var i in list){
			var cards=player.getExpansions('yb001_minglun');
			for(var k of cards){
				if(get.suit(k)==i)list[i]='<span class=YB_snowtext>'+list[i]+'</span>';
			}
			str+=list[i];
			str+='；';
		}
		str+='<br>结束阶段，若“命轮”包含相同花色或四种花色，则你需弃置所有“命轮”或失去1点体力。';
		return str;
	},
	yb004_tianqi:function(player){//天祈
		if(!player.storage.yb004_shangyuan){
			var str='锁定技，当你对其他角色造成伤害后，你进行判定：若伤害不大于1，且结果为红色，你回复1点体力或摸一张牌；若伤害大于1，且结果为黑色，你失去1点体力并摸一张牌。当你受到伤害后，你进行判定，若结果为黑色，你摸x+1张牌，否则你恢复x-1点体力（x为此次伤害值）';
			if(lib.skill.xinleiji_misa.disableReason.includes('天祈'))str+=`（此技能不可触发${get.poptip('releiji')}）`;
			return str;
		}
		else {
			return '准备阶段或结束阶段或当你受到伤害后，你可以进行一次判定，若结果为红色，则你回复1点体力或摸两张牌。';
		}
	},
	yb006_boxue:function(player){//博学
		if(player.storage.yb006_boxuex){
			return '锁定技，当你使用非装备牌或成为非装备牌的目标时，若你：<br>①没有对应的记录，则你记录该牌名，此技能结束。<br>②有对应的记录，则你移除对应的记录，然后摸一张牌（若此牌的使用者不为目标，则改为摸二），此技能结束。';
		}
		else{
			return'锁定技，当你使用非装备牌或成为非装备牌的目标时，若此牌没有被记录，则记录之，技能结束。'
		}
	},
	yb006_biaoshuai:function(player){//表率
		if(player.storage.yb006_biaoshuaix){
			return '主公技，每名其他忆势力角色每轮次各限一次。记录你回合内使用的第一张牌（覆盖上次记录）。其他忆势力角色使用或打出与之同名的牌时，<span class=yellowtext>你可以摸一张牌，然后你可以令其摸一张牌。</span>';
		}
		else{
			return '主公技，每名其他忆势力角色每轮次各限一次。记录你回合内使用的第一张牌（覆盖上次记录）。其他忆势力角色使用或打出与之同名的牌时，其可以令你摸一张牌，然后自己摸一张牌。'
		}
	},
	yb011_jueleng:function(player){//决冷
		if(player.storage.yb011_jueleng==true) return '转换技，阳：当场上角色受到伤害后，若伤害来源为其他角色，则你可以与伤害来源各摸一张牌或各弃一张牌；<span class="bluetext">阴：当场上角色受到伤害后，若</span><span class=yellowtext>受伤角色</span><span class="bluetext">为其他角色，则你可以与受伤角色各摸一张牌或各弃一张牌。</span>结束阶段或当你受到伤害时，你可以改变此技能状态。';
		return '转换技，<span class="bluetext">阳：当场上角色受到伤害后，若</span><span class=firetext>伤害来源</span><span class="bluetext">为其他角色，则你可以与伤害来源各摸一张牌或各弃一张牌；</span>阴：当场上角色受到伤害后，若受伤角色为其他角色，则你可以与受伤角色各摸一张牌或各弃一张牌。结束阶段或当你受到伤害时，你可以改变此技能状态。';
	},
	yb016_juli:function(player){
		var info=lib.skill.yb016_juli.getInfo(player);
		if(!player.storage.yb016_juli_add)return '当一名角色成为除其外的角色使用【杀】的目标时，若你至该角色的距离不大于'+info[1]+'，你可以重铸至多'+info[0]+'张牌，然后令此牌的使用者弃置'+ info[2] +'张牌，（该牌的类型须为你重铸的牌中包含的类型）否则此牌对你无效。';
		return '当一名角色成为除其外的角色使用【伤害牌】的目标时，若你至该角色的距离不大于'+info[1]+'，你可以重铸至多'+info[0]+'张牌，然后令此牌的使用者弃置'+ info[2] +'张牌，（该牌的类型须为你重铸的牌中包含的类型）否则此牌对你无效。';
	},
	yb016_shanbiao:function(player){
		var storage=player.storage.yb016_shanbiao;
		if(storage) return '锁定技，转换技，回合结束时或当你武将牌翻面时，阳：你摸两张牌；阴，<span class="bluetext">你受到当前回合角色造成的1点伤害</span>。<br>你阳状态下，受到的伤害-1；<br><span class="bluetext">你阴状态下，造成的伤害-1</span>。';
		return '锁定技，转换技，回合结束时或当你武将牌翻面时，阳：<span class="bluetext">你摸两张牌</span>；阴，你受到当前回合角色造成的1点伤害。<br><span class="bluetext">你阳状态下，受到的伤害-1</span>；<br>你阴状态下，造成的伤害-1。';
	},
	yb033_shuhui:function(player){//淑慧
		if(player.storage.yb033_shuhui==true){
			return `回合开始时，你可以弃置一张手牌，并令一名角色回复或失去1点体力。<span class=yellowtext>然后你展示牌堆顶一张牌，将${get.poptip('yb033_yuqi')}任意一个数字改为该数字，至多为当前最低的数字+2。</span>`;
		}
		else {
			return `回合开始时，你可以弃置一张手牌，并令一名角色回复或失去1点体力。（追加描述：然后你展示牌堆顶一张牌，将${get.poptip('yb033_yuqi')}任意一个数字改为该数字，至多为当前最低的数字+2）`
		}
	},
	yb033_yuqi:function(player){
		var info=lib.skill.yb033_yuqi.getInfo(player);
		return '每回合限三次。当有角色受到伤害后，若你至其的距离不大于<span class=thundertext>'+info[0]+'</span>，则你可以观看牌堆顶的<span class=firetext>'+info[1]+'</span>张牌。你将其中至多<span class=greentext>'+info[2]+'</span>张牌交给受伤角色，然后可以获得剩余牌中的至多<span class=yellowtext>'+info[3]+'</span>张牌，并将其余牌以原顺序放回牌堆顶。（理论上所有具有颜色的数字至多为13，因为点数最大也才13）';
	},
	yb033_qijue:function(player){
		var storage1=player.storage.yb033_qijue_lh;
		var storage2=player.storage.yb033_qijue_da;
		var storage3=player.storage.yb033_qijue_dc;
		if(storage1&&storage2&&storage3){
			return '锁定技，出牌阶段开始时，你选择一项：失去1点体力，受到1点伤害，弃置一张牌。'+'锁定技，<span class=firetext>当你失去体力后，'+storage1[0][0]+'，'+storage1[1][0]+'，然后'+storage1[2][0]+'</span>；<span class=yellowtext>当你受到伤害后，'+storage2[0][0]+'，'+storage2[1][0]+'，然后'+storage2[2][0]+'</span>；<span class=thundertext>当你弃置牌后，'+storage3[0][0]+'，'+storage3[1][0]+'，然后'+storage3[2][0]+'</span>。';
		}
		else return '锁定技，出牌阶段开始时，你选择一项：失去1点体力，受到1点伤害，弃置一张牌。锁定技，当你失去体力后，①你下次失去体力后，②恢复此数值*2点体力，然后③弃置一张手牌；当你受到伤害后，①你下次受到伤害后，②摸此数值*3张牌，然后③失去1点体力；当你弃置牌后，①你下次弃置牌后，②对所有其他角色各造成1点伤害，然后③令一个数字之后的效果向前错位。。';
	},
	yb037_kexie:function(player){//咳血
		var str='锁定技，每当你弃置一张';
		if(player.storage.yb037_kexie==0) str+='<span class=firetext>牌</span>';
		if(player.storage.yb037_kexie==1) str+='<span class=firetext>红色牌</span>';
		if(player.storage.yb037_kexie>=2) str+='<span class=firetext>红桃牌</span>';
		str+='时，你失去1点体力。';
		return str;
	},
	yb047_youhun:function(player){
		if(player.storage.yb047_youhun==true) return '转换技，阳：你可以将X+Y张牌当作任意一张锦囊牌使用；<span class="bluetext">阴：你可以将X+Y张牌当作任意一张基本牌使用。</span>当此牌造成伤害后，你增加1点体力上限，然后Y计数+1。（X为本轮此技能使用次数且至少为0，Y初始为0，最低为0）；每当你废除一个装备栏时，你令Y计数-1；';//；③你持有的此技能改名为【迸射】
		return '转换技，<span class="bluetext">阳：你可以将X+Y张牌当作任意一张锦囊牌使用；</span>阴：你可以将X+Y张牌当作任意一张基本牌使用。当此牌造成伤害后，你增加1点体力上限，然后Y计数+1。（X为本轮此技能使用次数且至少为0，Y初始为0，最低为0）；每当你废除一个装备栏时，你令Y计数-1；';//，然后将技能改名为【迸射】
	},
	yb053_yinren:function(player){
		// lib.translate.yb053_yinren=lib.skill.yb053_yinren.getname(player);
		// lib.translate.yb053_yinren_damage=lib.skill.yb053_yinren.getname(player);
		// lib.translate.yb053_yinren_after=lib.skill.yb053_yinren.getname(player);
		// lib.translate.yb053_yinren_die=lib.skill.yb053_yinren.getname(player);
		if(player.storage.yb053_yinren==true) return '锁定技，①当你受到伤害时，你需选择：弃置一张牌，或令此伤害+1；②每个回合结束时，你选择回复2点体力或摸X+1张牌（X为你已损体力值且至多为3）。';//；③你持有的此技能改名为【迸射】
		return '锁定技，①当你受到伤害时，你需选择：弃置一张牌，或令此伤害+1；然后获得如下效果直至当前回合结束：②每个回合结束时，你选择回复2点体力或摸X+1张牌（X为你已损体力值且至多为3）；③当你脱离濒死状态时，你令②效果变为常驻效果。';//，然后将技能改名为【迸射】
	},
	yb069_wenhuan:function(player){//温幻
		if(player.storage.yb069_wenhuan==true) return '转换技，阳，当有角色受到伤害后，你可以令其武将牌复位并令其摸一张牌。<span class="bluetext">阴，当有角色回复体力时，你可令其翻面，并令此次恢复效果+1。</span>';
		return '转换技，<span class="bluetext">阳，当有角色受到伤害后，你可以令其武将牌复位并令其摸一张牌。</span>阴，当有角色回复体力时，你可令其翻面，并令此次恢复效果+1。';
	},
	//071
	ybsl_cuixing_spade:function(player){//淬星*4
		if(!player.storage.ybsl_cuixing_spade)return lib.translate.ybsl_cuixing_spade_info;
		var str='你可以将一至两张黑桃牌当作';
		for(var i=0;i<player.storage.ybsl_cuixing_spade.length;i++){
			if(i>0){str+='、'};
			if(player.storage.ybsl_cuixing_ban_spade.includes(player.storage.ybsl_cuixing_spade[i])){str+='<span style="text-decoration: line-through;">【'+get.translation(player.storage.ybsl_cuixing_spade[i])+'】</span>'}
			else{str+='【'+get.translation(player.storage.ybsl_cuixing_spade[i])+'】';}
		}
		str+='使用或打出，属性为<span class=YB_snowtext>冰</span>。';
		return str;
	},
	ybsl_cuixing_heart:function(player){
		if(!player.storage.ybsl_cuixing_heart)return lib.translate.ybsl_cuixing_heart_info;
		var str='你可以将一至两张红桃牌当作';
		for(var i=0;i<player.storage.ybsl_cuixing_heart.length;i++){
			if(i>0){str+='、'};
			if(player.storage.ybsl_cuixing_ban_heart.includes(player.storage.ybsl_cuixing_heart[i])){str+='<span style="text-decoration: line-through;">【'+get.translation(player.storage.ybsl_cuixing_heart[i])+'】</span>'}
			else{str+='【'+get.translation(player.storage.ybsl_cuixing_heart[i])+'】';}
		}
		str+='使用或打出，属性为<span class=yellowtext>血</span>。';
		return str;
	},
	ybsl_cuixing_club:function(player){
		if(!player.storage.ybsl_cuixing_club)return lib.translate.ybsl_cuixing_club_info;
		var str='你可以将一至两张梅花牌当作';
		for(var i=0;i<player.storage.ybsl_cuixing_club.length;i++){
			if(i>0){str+='、'};
			if(player.storage.ybsl_cuixing_ban_club.includes(player.storage.ybsl_cuixing_club[i])){str+='<span style="text-decoration: line-through;">【'+get.translation(player.storage.ybsl_cuixing_club[i])+'】</span>'}
			else{str+='【'+get.translation(player.storage.ybsl_cuixing_club[i])+'】';}
		}
		str+='使用或打出，属性为<span class=YB_darktext>雷</span>。';
		return str;
	},
	ybsl_cuixing_diamond:function(player){
		if(!player.storage.ybsl_cuixing_diamond)return lib.translate.ybsl_cuixing_diamond_info;
		var str='你可以将一至两张方块牌当作';
		for(var i=0;i<player.storage.ybsl_cuixing_diamond.length;i++){
			if(i>0){str+='、'};
			if(player.storage.ybsl_cuixing_ban_diamond.includes(player.storage.ybsl_cuixing_diamond[i])){str+='<span style="text-decoration: line-through;">【'+get.translation(player.storage.ybsl_cuixing_diamond[i])+'】</span>'}
			else{str+='【'+get.translation(player.storage.ybsl_cuixing_diamond[i])+'】';}
		}
		str+='使用或打出，属性为<span class=firetext>火</span>。';
		return str;
	},
	yb100_lieshi:function(player){
		if(!player.storage.yb100_lieshi)return lib.translate.yb100_lieshi_info;
		var storage=get.YB_chongzhiList(player,'yb100_lieshi');//当前列表
		var list1=player.storage['yb100_lieshi'+'_chongzhijiList'];//刷新列表
		// var list1=get.YB_chongzhijiList(player,'yb100_lieshi');//刷新列表
		var str='重置技，刷新列表为：<br>';
		for(var i=0;i<list1.length;i++){
			if(storage.includes(list1[i]))str+='<span class=yellowtext>'+list1[i][0]+'</span><br>';
			else str+='<span style="opacity:0.5;">'+list1[i][0]+'</span><br>';
		}
		for(var i=0;i<storage.length;i++){
			if(!list1.includes(storage[i]))str+='<span class=thundertext>'+storage[i][0]+'</span><br>';
		}
		return str+'出牌阶段限一次，你可以选择一名其他角色，你令你们之一先选择列表其中一项执行，然后另一方执行列表中仍存的一项。（浅蓝色不在刷新列表中）。'
	},
	yb100_dianzhan:function(player){
		if(!player.storage.yb100_dianzhan)return lib.translate.yb100_dianzhan_info;
		var storage=get.YB_chongzhiList(player,'yb100_dianzhan');//当前列表
		var list1=player.storage['yb100_dianzhan'+'_chongzhijiList'];//刷新列表
		// var list1=get.YB_chongzhijiList(player,'yb100_dianzhan');//刷新列表
		var str='重置技，锁定技，刷新列表为：<br>';
		for(var i=0;i<list1.length;i++){
			if(storage.includes(list1[i]))str+='<span class=yellowtext>'+list1[i][0]+'</span><br>';
			else str+='<span style="opacity:0.5;">'+list1[i][0]+'</span><br>';
		}
		for(var i=0;i<storage.length;i++){
			if(!list1.includes(storage[i]))str+='<span class=thundertext>'+storage[i][0]+'</span><br>';
		}
		return str+'当你使用牌指定目标时，若此是你本回合首次指定其为目标，你横置自身并执行列表中的一项，然后若你不为目标，则令目标也执行此项。'
	},
}