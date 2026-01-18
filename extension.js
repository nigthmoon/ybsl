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
		arenaReady: function() {
			// 初始化回调
		},
		config: config,
		help: help,
		package: Package,
		files: files
	}
	return extension
}