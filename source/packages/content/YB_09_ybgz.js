import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { YBSL_ybgz }
/**
 * 掌管更新公告相关数据
 */
const YBSL_ybgz = function(){
	if(lib.config.extension_夜白神略_ybsl_wujinshilian=='gz'){
		var list=lib.characterPack.ybslj;
		for(var i in list){
			lib.characterPack.mode_guozhan['gz_'+i]=[list[i][0],list[i][1],list[i][2],list[i][3],list[i][4]]
		}
		var list2=lib.characterPack.ybart;
		for(var k in list2){
			lib.characterPack.mode_guozhan['gz_'+k]=[list2[k][0],list2[k][1],list2[k][2],list2[k][3],list2[k][4]]
		}
	}
}