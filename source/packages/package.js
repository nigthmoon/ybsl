import { lib, game, ui, get, ai, _status } from '../../../../noname.js'
import {YB_update} from './update.js'
var num = YB_update.version
var text = YB_update[num]['changeLog']
export const Package = {
	intro: (function () {
		var log = text
		//style="color:rgb(210,210,000); 
		return '<p font-size:12px; line-height:14px; text-shadow: 0 0 2px black;">' + log.join('<br>') + '</p>';
	})(),
	author: "夜白&<span style=\"opacity:0.5;\">鬼神易</span>",
	diskURL: "",
	forumURL: "",
	version: num,
}