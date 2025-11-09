import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { YBSL_rank }
/**
 * 掌管第五格武将评级和异构加入的数据
 */
const YBSL_rank = function(){
	
	var packages = [
		"ybslj","ybxh","ybdd","ybgod","ybslc","ybart",'ybnew1','ybmjz','yhky','sgstrxs','ybMagic',
		'ybnew3',
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

		var sgstrxsstr = '三国杀同人小说也是一个丰富的diy宝库，里面不乏优秀或有趣的设计<br>本人在此立下宏愿：每看一本三国杀同人文，都要将其中可以复现的武将都复现出来！<br>提示：右键子将包或查看武将简介可查看作者<br>点击下方按钮可以开启或关闭鬼神赐福系统（调整后需重置游戏方可生效）（暂时重做，按钮关闭）';

		// sgstrxsstr += `
		// 	<div style="position:relative;display:inline-block;width:200px;">
		// 		<button id="guixieBtn" 
		// 				onclick="
		// 					lib.config.YB_guixiecifu = !lib.config.YB_guixiecifu;
		// 					var isOn = lib.config.YB_guixiecifu;
		// 					this.textContent = isOn ? '神鬼赐福现在开了' : '神鬼赐福现在关着';
		// 					this.style.background = isOn ? '#4CAF50' : '#9e9e9e';
		// 					game.saveConfig('YB_guixiecifu',lib.config.YB_guixiecifu);
		// 				" 
		// 				style="background:${btnColor};color:white;padding:10px;border:none;cursor:pointer;width:100%;text-align:left;">
		// 			${booltext}
		// 		</button>
		// 	</div>
		// `;

		// // 初始化按钮状态（如果需要）
		// if (typeof lib !== 'undefined' && lib.config) {
		// 	lib.config.YB_guixiecifu = lib.config.YB_guixiecifu || false;
		// }
	}
	{//斗罗大陆
		var whjxbool = lib.config.YB_wuhunjuexing;
		var booltext = whjxbool ? '武魂觉醒现在开了' : '武魂觉醒现在关着';
		// 根据状态设置不同颜色
		var btnColor = whjxbool ? '#4CAF50' : '#9e9e9e'; // 开=绿色，关=红色
		//优先检索牌堆或牌库中的，和角色技能字段高度相近的，或角色技能中包含的牌名
		//作废思路
		var whjxstr = `
			开局每名角色觉醒武魂（）
			<br>随游戏进行，获得魂力，达到瓶颈之后，准备阶段可以发动猎魂，选择想要觉醒的方向：转化，过牌，辅助，卖血等，然后用南华天书般的系统摇几个技能供玩家选择，可以放弃选择，下次再选。魂力达到瓶颈后不会升级，但会积累，最高积累到下次升级的瓶颈。
			<br>其他的有待设定
			<br>点击下方按钮可以开启或关闭武魂觉醒系统（调整后需重置游戏方可生效）
		`;

		whjxstr += `
			<div style="position:relative;display:inline-block;width:200px;">
				<button id="wuhunBtn" 
						onclick="
							lib.config.YB_wuhunjuexing = !lib.config.YB_wuhunjuexing;
							var isOn = lib.config.YB_wuhunjuexing;
							this.textContent = isOn ? '武魂觉醒现在开了' : '武魂觉醒现在关着';
							this.style.background = isOn ? '#4CAF50' : '#9e9e9e';
							game.saveConfig('YB_wuhunjuexing',lib.config.YB_wuhunjuexing);
						" 
						style="background:${btnColor};color:white;padding:10px;border:none;cursor:pointer;width:100%;text-align:left;">
					${booltext}
				</button>
			</div>
		`;

		// 初始化按钮状态（如果需要）
		if (typeof lib !== 'undefined' && lib.config) {
			lib.config.YB_wuhunjuexing = lib.config.YB_wuhunjuexing || false;
		}
	}
/**
 * 开局根据初始列表设定重置列表

然后根据重置列表设定现存列表

现存列表每一项执行后移除，全部移除后根据重置列表刷新
 */
	lib.translate['ybslj'+'_charactersInfo']=`
		夜白神略主体武将包<br>
		<li>重置技机制：<br>
		①，简单来说，每项各限一次，用完重置<br>
		②，复杂来说，重置技拥有<span class=firetext>初始列表</span>，<br>
		初始化根据<span class=firetext>初始列表</span>定义<span class=yellowtext>刷新列表</span><br>
		然后再根据<span class=yellowtext>刷新列表</span>设置<span class=thundertext>现存列表</span><br>
		<span class=thundertext>现存列表</span>每项限一次，全部执行后根据<span class=yellowtext>刷新列表</span>重置。
		<li>势极技机制；<br>
		势极技分为<span class=thundertext>势极技阴极</span>和<span class=firetext>势极技阳极</span><br>
		势极技阴极或阳极，在使用之后，会禁用其他同极势极技，并解锁异极势极技<br>
		每回合结束时，解除势极技的禁用。<br>
		在没有异极势极技的情况下，可以近似当作每回合限一次的技能。<br>
		<li>永续转换技机制；<br>
		同普通的转换技，一般为发动后获得一个永续效果，效果消失时才转换<br>
	`
	lib.translate['ybart'+'_charactersInfo']='温馨提示：<br>开启本将包会一并开启“六艺”机制，详情请右键六艺篇查看，简单来说就是全场自带私人木牛流马。<br>因之前有群友反馈，说不喜欢这个机制，因此被我放在这里隔离，开启与否视个人喜好吧'
	lib.translate['ybxh'+'_charactersInfo']='校花的贴身高手，很多武将虚位以待，敬请投稿'
	lib.translate['ybdd'+'_charactersInfo']='本人接单制作的武将'
	lib.translate['ybnew3'+'_charactersInfo']='杂设，部分为闲暇之余的设计，部分为参与其他投稿的落榜之作'
	lib.translate['ybmjz'+'_charactersInfo']='夜白自己的界限突破……'
	lib.translate['ybMagic'+'_charactersInfo']='理论上应该有武将的，但没设计好呢，再等等'
	lib.translate['yhky'+'_charactersInfo']='永恒刻印，意为永恒的持恒技。不出意外的话，本包武将均为持恒技道心值武将'
	lib.translate['ybllyz'+'_charactersInfo']='连招宇宙，以夜白自己设计的连招技框架构成'
	lib.translate['sgstrxs'+'_charactersInfo']=sgstrxsstr
	// lib.translate['ybwhjx'+'_charactersInfo']=whjxstr
	lib.translate['ybslc'+'_cardsInfo']=`
		夜白神略主体卡牌包<br>
		<li>血属性机制：<br>
		造成伤害后，回复等同伤害值的体力值，仅存在血属性时不传导铁索<br>
		<li>雪属性机制：<br>
		造成伤害后，可以令对方翻面并摸X张牌，X为其体力值且至多为5<br>
		<li>新应变：连打<br>
		触发后，此牌额外结算一次<br>
		<li>新应变：寸止<br>
		触发后，此牌少结算一次<br>
		<li>天火煅介绍：<br>
		同马钧精械，使用后，可以选择手牌中可以升级的卡牌进行升级<br>
		除原版精械列表，新增以下公式：<br>
		※黑桃闪电及其替换牌=>阴勾玉，<br>
		※非黑桃闪电、火山、洪水=>阳勾玉，<br>
		※倚天剑=>七星龙渊剑，<br>
		※朱雀羽扇、五行鹤翎扇=>北斗七星扇，<br>
		※青龙偃月刀=>锁龙偃月刀，<br>
		※方天画戟、乌铁锁链=>方天锁链鞭，<br>
		※护心镜=>白虎镜，<br>
	`
	lib.translate['ybgod'+'_cardsInfo']='boss模式卡牌搬运'
	lib.translate['ybnew2'+'_cardsInfo']=`
		风花雪月<br>
		<li>风属性机制：<br>
		①，此属性可以和其他属性共存，也就是说你可以看到诸如风雷杀，风火属性伤害之类的牌或描述<br>
		②，即将造成风属性伤害的时候，先从伤害的属性中移除风属性，此时标记除受伤角色以外的所有横置角色（代码原理）<br>
		③，②的伤害结算结束后，晚于铁索的结算（避免先把铁索状态解除导致bug），然后对②中标记的角色造成伤害，伤害属性与触发此机制的伤害的属性一致（不过不包含风属性，因为已经通过机制移除了风属性）<br>
		<li>新应变：勠力<br>
		触发后，此牌所有目标进入横置状态。<br>
	`
	// lib.translate['gujian'+'_charactersInfo']='古剑奇谭，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['hearth'+'_charactersInfo']='炉石传说，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['mtg'+'_'+'charactersInfo']='万智牌，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['ow'+'_charactersInfo']='守望先锋，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['swd'+'_charactersInfo']='轩辕剑，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['xianjian'+'_charactersInfo']='仙剑奇侠传，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['yxs'+'_charactersInfo']='英雄杀，原本体卡包，作者水乎，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'

	// lib.translate['gujian'+'_cardsInfo']='古剑奇谭，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['gwent'+'_cardsInfo']='昆特牌，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略<br>图片貌似不能正确引用，以后再修'
	// lib.translate['hearth'+'_cardsInfo']='炉石传说，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['huanlekapai'+'_cardsInfo']='欢乐卡牌，原本体卡包，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['mtg'+'_cardsInfo']='万智牌，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略<br>图片貌似不能正确引用，以后再修'
	// lib.translate['swd'+'_cardsInfo']='轩辕剑，水乎扩展，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	lib.translate['yunchou'+'_cardsInfo']='运筹帷幄，原本体卡包，被本体拆了。为确保引用相关内容的稳定性，夜白把这些包放进了夜白神略'
	// lib.translate['yxs'+'_cardsInfo']='英雄杀，原本体卡包，作者水乎，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'
	// lib.translate['zhenfa'+'_cardsInfo']='阵法牌，原本体卡包，被本体拆了。为确保引用相关内容的稳定性，夜白这些包放进了夜白神略'














}