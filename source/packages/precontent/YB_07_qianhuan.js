import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { YBSL_qianhuan }
/**
 * 此处控制千幻适配（目前因为我也没皮肤，就暂时停用了
 * 再想启用也要做适配，因为我代码结构也大变样
 */
const YBSL_qianhuan = function(){
	//（目前来说没啥用了，毕竟我也不放皮肤了）
	// //（先注释了，以后再说）
	{// 千幻换肤相关
		if(!lib.qhlypkg){
			lib.qhlypkg=[];
		}
		// var packages = [
		// 	"ybslj","ybxh","ybdd","ybgod","ybslc","ybart",'ybnew1','ybmjz','yhky','sgstrxs','ybMagic'
		// 	// 'YB_one'
		// ]
		// var packagesx = [
		// 	"ybslj","ybxh","ybdd","ybgod","ybslc","ybart",'ybnew1','ybmjz','yhky','sgstrxs','ybMagic'
		// 	// 'YB_one'
		// ]
		var packagesx = {
			'ybslj':'ybsl001',
			'ybart':'ybsl001',
			'ybxh':'ybsl003',
			'ybnew1':'ybsl004',
			'ybmjz':'ybsl008',
			'ybdd':'ybsl009',
			'ybMagic':'ybsl010',
			'yhky':'ybsl011',
			'sgstrxs':'ybsl012',
			'ybwhjx':'ybsl013',
			'cyyydsgs':'cyyydsgs',
			'jhjx':'jhjx',
		}
		// var listxxxxx= [];
		for(var i in packagesx){
			lib.qhlypkg.push({
				isExt:true,//是否是扩展，一般填true
				filterCharacter:function(name){
					// var qianzhui=[
					// 	'dzsl_','dzsp_','ybsl_','ybsp_','db_ybsl_','db_ybsp_',
					// 	'ybslshen_','sgsh_','ssj_ybxh_','North_','ybnb_','ybart_',
					// 	'ybmo_','ybhao_','ybdi_','ybhaoshen_','ybsc_',
					// ];
					// for(var i=0;i<qianzhui.length;i++){
					// 	if(name.indexOf(qianzhui[i])==0) return true;
					// }
					if(lib.characterPack[i][name])return true;
					//判断此ID的武将是否属于此皮肤包。推荐用前缀判断。
					//在这里不判断直接返回true是很没有武德的行为，可能覆盖别人的扩展配置。
				},
				prefix:`extension/夜白神略/image/${packagesx[i]}/`,//原皮前缀，标识原皮肤的位置。
				skin:{
					standard:'extension/夜白神略/skin/',//可切换普通皮肤的前缀
				},
				audioOrigin:'extension/夜白神略/audio/character/',//原技能配音位置
				audio:'extension/夜白神略/skin/audio/',//切换皮肤后的技能配音位置

			});
		}
		// lib.qhlypkg.push({
		// 	isExt:true,//是否是扩展，一般填true
		// 	filterCharacter:function(name){
		// 		// var qianzhui=[
		// 		// 	'dzsl_','dzsp_','ybsl_','ybsp_','db_ybsl_','db_ybsp_',
		// 		// 	'ybslshen_','sgsh_','ssj_ybxh_','North_','ybnb_','ybart_',
		// 		// 	'ybmo_','ybhao_','ybdi_','ybhaoshen_','ybsc_',
		// 		// ];
		// 		// for(var i=0;i<qianzhui.length;i++){
		// 		// 	if(name.indexOf(qianzhui[i])==0) return true;
		// 		// }
				
		// 		//判断此ID的武将是否属于此皮肤包。推荐用前缀判断。
		// 		//在这里不判断直接返回true是很没有武德的行为，可能覆盖别人的扩展配置。
		// 	},
		// 	// prefix:'extension/夜白神略/image/character/',//原皮前缀，标识原皮肤的位置。
		// 	skin:{
		// 		standard:'extension/夜白神略/skin/standard/',//可切换普通皮肤的前缀
		// 	},
		// 	audioOrigin:'extension/夜白神略/audio/character/',//原技能配音位置
		// 	audio:'extension/夜白神略/skin/audio/',//切换皮肤后的技能配音位置
		// });
	}
}