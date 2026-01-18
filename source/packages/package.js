import { lib, game, ui, get, ai, _status } from '../../../../noname.js'
import { ybslb_update } from './update.js'
var num = ybslb_update.version
var text = ybslb_update[num]['changeLog']
export const Package = {
	intro: (function () {
		var log = text
		//style="color:rgb(210,210,000); 
		// return '<p font-size:12px; line-height:14px; text-shadow: 0 0 2px black;">' + '当前版本：' + num + '<br>' + log.join('<br>') + '</p>';
		return '更新公告在下面折叠起来了'
	})(),
	author: "夜白",
	diskURL: "",
	forumURL: "",
	version: num,
}