import { lib, game, ui, get, ai, _status } from '../../noname.js'
if(!lib.characterCopyright)lib.characterCopyright={}
if(!lib.characterCitetext)lib.characterCitetext={}
if(!lib.characterLightext)lib.characterLightext={}
if(!lib.characterLightextParent)lib.characterLightextParent={}
if(!lib.characterUndertext)lib.characterUndertext={}
import { characterIntro , nodeintro } from './source/packages/function.js'
get.characterIntro = characterIntro;
// get.nodeintro = nodeintro;
//_nointro
import { Package } from './source/packages/package.js'
import { config, help, files } from './source/packages/config.js'
import { precontent } from './source/packages/precontent.js'
import { content } from './source/packages/content.js'
//此代码结构借鉴自裸睡天依（代码：狗妈）和温柔一刀（火）
export let type = 'extension'

export default async function () {
	let extension = {
		name: "夜白神略",
		editable: false,
		content: content,
		precontent: precontent,
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