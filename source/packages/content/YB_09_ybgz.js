import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { YBSL_ybgz }
/**
 * 掌管添加至国战
 */
const YBSL_ybgz = function(){
	var packages = [
		"ybslj","ybxh","ybdd","ybgod","ybslc","ybart",'ybnew1','ybmjz','yhky','sgstrxs','ybMagic',
		'ybnew3',
		'cyyydsgs','jhjx',
		// 'YB_one'
	]
	if(!lib.characterGuozhanFilter){
		lib.characterGuozhanFilter =[]
	}
	// lib.characterGuozhanFilter.addArray(packages)
	for(var pack of packages){
		if(lib.characterPack[pack]){
			if(Object.keys(lib.characterPack[pack]).length>0){
				lib.characterGuozhanFilter.add(pack)
			}
		}
	}
}