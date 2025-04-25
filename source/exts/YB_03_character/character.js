import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { character }

const character = { //武将格式 : 
	// //----------------------忆包废案
	//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
	'ssj_ybxh_linyi':['male','XHSS_linyi',4,['xhly_yulong','xhly_tiancan'],['xhlinggen:金木土水火雾冰','rankAdd:legend']],//林逸
	// 'ssj_ybxh_linyi':['male','XHSS_linyi','3/4',['xhly_tiancan','xhly_baihe','xhly_wuji','xhly_duotian'],['xhlinggen:金木土水火雾冰','rankAdd:legend']],//林逸
	'ssj_ybxh_zhanglongliyao':['male','XHSS_sanxiu',4,['xhzlly_guihuo'],['rankAdd:epic']],//张龙李妖
	'ssj_ybxh_wangzhifeng':['male','XHSS_sanxiu',4,['xhwzf_cangyan'],['rankAdd:epic']],//王智峰
	// 'ssj_ybxh_yukun':['male','XHSS_sanxiu',3,['xhyk_qietu','xhyk_shagou'],['xhclan:内家流派','rankAdd:legend']],//雨坤
	//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
}
