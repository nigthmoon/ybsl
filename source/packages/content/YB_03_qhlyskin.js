import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { YBSL_qhlyskin }
/**
 * 掌管夜白从云将搬来的换肤
 * 但是我一直没机会参悟
 */
const YBSL_qhlyskin = function(){
	//------------------------此部分照搬自云将扩展
	game.yjGetQhlySkin=function(name){
		if(game.qhly_getSkin){
			return game.qhly_getSkin(name);
		}
		return null;
	};
	//-----------------------此段稍加修改以适配扩展
	// if(lib.config.extension_云将_yishifenghua=='on'&&player.name1=='yunsunshangxiang'&&!game.yjGetQhlySkin('yunsunshangxiang')){
	// player.node.avatar.setBackgroundImage('extension/云将/yunsunshangxianga.jpg');
	// }
	// if(lib.config.extension_云将_yishifenghua=='on'&&player.name1=='yunsunshangxiang'&&game.yjGetQhlySkin('yunsunshangxiang')=='yunsunshangxiang5.jpg'){
	// player.node.avatar.setBackgroundImage('extension/云将/yunsunshangxiang5a.jpg');
	// }
}