import { lib, game, ui, get, ai, _status } from '../../noname.js'
if(!lib.characterCopyright)lib.characterCopyright={}
if(!lib.characterCitetext)lib.characterCitetext={}
if(!lib.characterLightext)lib.characterLightext={}
if(!lib.characterLightextParent)lib.characterLightextParent={}
if(!lib.characterUndertext)lib.characterUndertext={}
if(!lib.accessoryPacket)lib.accessoryPacket={}
// import { characterIntro , nodeintro } from './source/packages/function.js'
// get.characterIntro = characterIntro;
// get.nodeintro = nodeintro;
//_nointro
import { Package } from './source/packages/package.js'
import { config, help, files } from './source/packages/config.js'
import { precontent } from './source/packages/precontent.js'
import { content } from './source/packages/content.js'
//此代码结构借鉴自裸睡天依（代码：狗妈）和温柔一刀（火）
export let type = 'extension'

export default async function () {
	/**@type {importExtensionConfig} */
	let extension = {
		name: "夜白神略",
		editable: false,
		content: content,
		precontent: precontent,
		arenaReady:function(){
			if(false){
				
				var packages = [
					"ybslj","ybxh","ybdd","ybgod","ybslc","ybart",'ybnew1','ybmjz','yhky','sgstrxs','ybMagic'
					// 'YB_one'
				]
				for(var k of packages){
					var pagename = lib.characterPack[k];
					for(var i in pagename){
						if(pagename[i].YB_mjz&&pagename[i].YB_mjz!=undefined){
							var infoy = pagename[i].YB_mjz;
							var name = get.YB_characterImage(infoy);
							pagename[i].img = `${name}`;
						}

						else {
							var infoy = pagename[i][4];
							for(var infox of infoy){
								if(infox.startsWith('YB_mjz:')){
									// console.log(infox);
									var char = infox.slice(7);
									// console.log(char);
									var name = get.YB_characterImage(char);
									// console.log(name);
									pagename[i].img = `${name}`;
									// pagename[i][4].push(`ext:../../${name}`)
									
								}
							}

						}
					} 
					
				}
				// for(var i in pagename.character){
				// 	if(Array.isArray(pagename.character[i])){
				// 		var infoy = pagename.character[i][4];
				// 		for(var infox of infoy){
				// 			if(infox.startsWith('YB_mjz:')){
				// 				var char = infox.slice(7);
				// 				pagename.character[i][4].push(`img:image/character/${char}.jpg`);
				// 				// pagename.character[i][4].push(`die:../../audio/die/${char}.mp3`);
				// 			}
				// 		}
				// 	}
				// 	else {
				// 		if(pagename.character[i].YB_mjz){
				// 			var infoy = pagename.character[i].YB_mjz;
				// 			pagename.character[i].img = `img:image/character/${infoy}.jpg`;
				// 			// pagename.character[i].die = `ext:../../audio/die/${infoy}.mp3`;
				// 		}
				// 	}
				// } 
			}
		},
		config: config,
		help: help,
		package: Package,
		files: files
	}
	return extension
}
// game.addMode('YB_11_cardBrowser',{
// 	start:function(){
// 		lib.init.js(lib.assetURL+'extension/夜白神略/source/pile','ybslCardPile')
// 		var dialog = ui.create.dialog([['牌堆浏览'],'tdnodes']);
// 		var list =  Array.from(window.cardPile);
// 		dialog.addSmall([list,'vcard']);

// 	},
// },{
// 	translate: '牌堆浏览',
// })