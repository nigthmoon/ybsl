import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { YBSL_rank }
/**
 * 掌管第五格武将评级和异构加入的数据
 */
const YBSL_rank = function(){
    
	var packages = [
		"ybslj","ybxh","ybdd","ybgod","ybslc","ybart",'ybnew1','ybmjz',
		// 'YB_one'
	]
	{//修改函数以防止失灵
		// lib.arenaReady.push(function(){
		// 	get.characterIntro=characterIntro;
		// 	get.nodeintro=nodeintro;
		// })
	}
	{//武将第五格评级--------狂神著
		lib.arenaReady.push(function(){
			for(var pack of packages){
				for(var name in lib.characterPack[pack]){
					for(var rarity of ['junk','common','rare','epic','legend']){//废材，普通，精品，史诗，传说
						if(lib.characterPack[pack][name][4]){
							if(lib.characterPack[pack][name][4].includes(rarity)){
								lib.rank.rarity[rarity].add(name);
								break;
							}
						}
					}
					if(lib.characterPack[pack][name]['yb_rank']){
						var rarity = lib.characterPack[pack][name]['yb_rank'];
						lib.rank.rarity[rarity].add(name);
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
					if(lib.characterPack[pack][name]['yb_linkTo']){
						var linkTo = lib.characterPack[pack][name]['yb_linkTo'];
						// get.YB_linkTo(name,linkTo)
						var char2 = get.sourceCharacter(linkTo);
						if(!lib.characterReplace[char2])lib.characterReplace[char2]=[char2];
						if(!lib.characterReplace[char2].includes(name))lib.characterReplace[char2].push(name);
					}
				}
			}
		})
	}
}