import { lib, game, ui, get, ai, _status } from '../../noname.js'
import { precontent } from './source/packages/precontent.js'
import { content } from './source/packages/content.js'
import { Package } from './source/packages/package.js'
import { config, help, files } from './source/packages/config.js'
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