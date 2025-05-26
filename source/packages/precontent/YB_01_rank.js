import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { YBSL_rank }
/**
 * 掌管第五格武将评级和异构加入的数据
 */
const YBSL_rank = function(){
	
	var packages = [
		"ybslj","ybxh","ybdd","ybgod","ybslc","ybart",'ybnew1','ybmjz','yhky','sgstrxs','ybMagic'
		// 'YB_one'
	]
	{//修改函数以防止失灵
		// lib.arenaReady.push(function(){
		// 	get.characterIntro=characterIntro;
		// 	get.nodeintro=nodeintro;
		// })
	}
	{//武将第五格评级--------狂神著
		// lib.arenaReady.push(function(){
		// 	for(var pack of packages){
		// 		for(var name in lib.characterPack[pack]){
		// 			for(var rarity of ['junk','common','rare','epic','legend']){//废材，普通，精品，史诗，传说
		// 				if(lib.characterPack[pack][name][4]){
		// 					if(lib.characterPack[pack][name][4].includes(rarity)){
		// 						lib.rank.rarity[rarity].add(name);
		// 						break;
		// 					}
		// 				}
		// 			}
		// 			if(lib.characterPack[pack][name]['yb_rank']){
		// 				var rarity = lib.characterPack[pack][name]['yb_rank'];
		// 				lib.rank.rarity[rarity].add(name);
		// 			}
		// 		}
		// 	}
		// });
		lib.arenaReady.push(function(){
			for(var pack of packages){
				for(var name in lib.characterPack[pack]){
					//['junk','common','rare','epic','legend']
					var infoy = lib.characterPack[pack][name][4];
					for(var infox of infoy){
						if(infox.startsWith('rankAdd:')){
							var rarity = infox.slice(8);
							if(lib.rank.rarity[rarity])lib.rank.rarity[rarity].add(name);
						}
						if(infox.startsWith('rankS:')){
							var infoz = infox.slice(6);
							if(lib.rank[infoz])lib.rank[infoz].add(name);
						}
					}
					if(lib.characterPack[pack][name]['rankAdd']){
						var rarity = lib.characterPack[pack][name]['rankAdd'];
						if(lib.rank.rarity[rarity])lib.rank.rarity[rarity].add(name);
						var rarityS = lib.characterPack[pack][name]['rankS'];
						if(lib.rank[rarityS])lib.rank[rarityS].add(name);
					}
				}
			}
		});
	}
	{//y异构加入
		// get.YB_linkTo =function(from,to){
		// 	var char2 = get.sourceCharacter(to);
		// 	if(!lib.characterReplace[char2])lib.characterReplace[char2]=[char2];
		// 	if(!lib.characterReplace[char2].includes(from))lib.characterReplace[char2].push(from);
		// 	return lib.characterReplace[char2];
		// }
		lib.arenaReady.push(function(){
			for(var pack of packages){
				for(var name in lib.characterPack[pack]){
					var infoy = lib.characterPack[pack][name][4];
					for(var infox of infoy){
						if(infox.startsWith('linkTo:')){
							var char = infox.slice(7);
							// get.YB_linkTo(name,char)
							var char2 = get.sourceCharacter(char);
							if(!lib.characterReplace[char2])lib.characterReplace[char2]=[char2];
							if(!lib.characterReplace[char2].includes(name))lib.characterReplace[char2].push(name);
						}
					}
					if(lib.characterPack[pack][name]['linkTo']){
						var linkTo = lib.characterPack[pack][name]['linkTo'];
						// get.YB_linkTo(name,linkTo)
						var char2 = get.sourceCharacter(linkTo);
						if(!lib.characterReplace[char2])lib.characterReplace[char2]=[char2];
						if(!lib.characterReplace[char2].includes(name))lib.characterReplace[char2].push(name);
					}
				}
			}
		})
	}
	{//神鬼赐福
		var gxcfbool = lib.config.YB_guixiecifu;
		var booltext = gxcfbool ? '神鬼赐福现在开了' : '神鬼赐福现在关着';
		// 根据状态设置不同颜色
		var btnColor = gxcfbool ? '#4CAF50' : '#9e9e9e'; // 开=绿色，关=红色

		var sgstrxsstr = '三国杀同人小说也是一个丰富的diy宝库，里面不乏优秀或有趣的设计<br>本人在此立下宏愿：每看一本三国杀同人文，都要将其中可以复现的武将都复现出来！<br>提示：右键子将包或查看武将简介可查看作者<br>点击下方按钮可以开启或关闭鬼神赐福系统（调整后需重置游戏方可生效）';

		sgstrxsstr += `
			<div style="position:relative;display:inline-block;width:200px;">
				<button id="guixieBtn" 
						onclick="
							lib.config.YB_guixiecifu = !lib.config.YB_guixiecifu;
							var isOn = lib.config.YB_guixiecifu;
							this.textContent = isOn ? '神鬼赐福现在开了' : '神鬼赐福现在关着';
							this.style.background = isOn ? '#4CAF50' : '#9e9e9e';
							game.saveConfig('YB_guixiecifu',lib.config.YB_guixiecifu);
						" 
						style="background:${btnColor};color:white;padding:10px;border:none;cursor:pointer;width:100%;text-align:left;">
					${booltext}
				</button>
			</div>
		`;

		// 初始化按钮状态（如果需要）
		if (typeof lib !== 'undefined' && lib.config) {
			lib.config.YB_guixiecifu = lib.config.YB_guixiecifu || false;
		}
	}

	lib.translate['ybslj'+'_info']='夜白神略主体武将包'
	lib.translate['ybart'+'_info']='温馨提示：<br>开启本将包会一并开启“六艺”机制，详情请右键六艺篇查看，简单来说就是全场自带私人木牛流马。<br>因之前有群友反馈，说不喜欢这个机制，因此被我放在这里隔离，开启与否视个人喜好吧'
	lib.translate['ybxh'+'_info']='校花的贴身高手，很多武将虚位以待，敬请投稿'
	lib.translate['ybdd'+'_info']='本人接单制作的武将'
	lib.translate['ybnew1'+'_info']='杂设，部分为闲暇之余的设计，部分为参与其他投稿的落榜之作'
	lib.translate['ybmjz'+'_info']='夜白自己的界限突破……'
	lib.translate['ybMagic'+'_info']='理论上应该有武将的，但没设计好呢，再等等'
	lib.translate['yhky'+'_info']='永恒刻印，意为永恒的持恒技。不出意外的话，本包武将均为持恒技道心值武将'
	lib.translate['ybllyz'+'_info']='连招宇宙，以夜白自己设计的连招技框架构成'
	lib.translate['sgstrxs'+'_info']=sgstrxsstr
	lib.translate['ybslc'+'_info']='夜白神略主体卡牌包'
	lib.translate['ybgod'+'_info']='boss模式卡牌搬运'
	lib.translate['ybnew2'+'_info']=`
		风花雪月<br>
		风属性机制：<br>
		①，此属性可以和其他属性共存，也就是说你可以看到诸如风雷杀，风火属性伤害之类的牌或描述<br>
		②，即将造成风属性伤害的时候，先从伤害的属性中移除风属性，此时标记除受伤角色以外的所有横置角色（代码原理）<br>
		③，②的伤害结算结束后，晚于铁索的结算（避免先把铁索状态解除导致bug），然后对②中标记的角色造成伤害，伤害属性与触发此机制的伤害的属性一致（不过不包含风属性，因为已经通过机制移除了风属性）
	`
}