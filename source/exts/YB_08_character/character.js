import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { character }

const character = { //武将格式 : 
	//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
	ybmjz_caocao:['male','wei',4,['ybmjz_jianxiong','ybmjz_zhishuo'],['zhu','linkTo:caocao','YB_mjz:re_caocao']], 
	ybmjz_simayi:['male','wei',3,['ybmjz_fankuix','ybmjz_guicai'],['linkTo:simayi','YB_mjz:re_simayi']], 
	ybmjz_xiahoudun:['male','wei',4,['ybmjz_gangliey','new_qingjian'],['name:夏侯|惇','linkTo:xiahoudun','YB_mjz:re_xiahoudun']], 
	ybmjz_zhangliao:['male','wei',4,['ybmjz_tuxi'],['linkTo:zhangliao','YB_mjz:re_zhangliao']], 
	ybmjz_xuzhu:['male','wei',4,['ybmjz_luoyi'],['linkTo:xuzhu','YB_mjz:re_xuzhu']], 
	ybmjz_guojia:['male','wei',3,[],['linkTo:guojia','YB_mjz:re_guojia']], 
	ybmjz_zhenji:['female','wei',3,[],['name:甄|宓','linkTo:zhenji','YB_mjz:re_zhenji']], 

	ybmjz_liubei:['male','shu',4,[],['zhu','linkTo:liubei','YB_mjz:re_liubei']], 
	ybmjz_guanyu:['male','shu',4,[],['linkTo:guanyu','YB_mjz:re_guanyu']], 
	ybmjz_zhangfei:['male','shu',4,[],['linkTo:zhangfei','YB_mjz:re_zhangfei']], 
	ybmjz_zhugeliang:['male','shu',3,[],['name:诸葛|亮','linkTo:zhugeliang','YB_mjz:re_zhugeliang']], 
	ybmjz_zhaoyun:['male','shu',4,[],['linkTo:zhaoyun','YB_mjz:re_zhaoyun']], 
	ybmjz_machao:['male','shu',4,[],['linkTo:machao','YB_mjz:re_machao']], 
	ybmjz_huangyueying:['female','shu',3,[],['linkTo:huangyueying','YB_mjz:re_huangyueying']], 

	ybmjz_sunquan:['male','wu',4,[],['zhu','linkTo:sunquan','YB_mjz:re_sunquan']], 
	ybmjz_ganning:['male','wu',4,[],['linkTo:ganning','YB_mjz:re_ganning']], 
	ybmjz_lvmeng:['male','wu',4,[],['linkTo:lvmeng','YB_mjz:re_lvmeng']], 
	ybmjz_huanggai:['male','wu',4,[],['linkTo:huanggai','YB_mjz:re_huanggai']], 
	ybmjz_zhouyu:['male','wu',3,[],['linkTo:zhouyu','YB_mjz:re_zhouyu']], 
	ybmjz_daqiao:['female','wu',3,[],["name:桥|null",'linkTo:daqiao','YB_mjz:re_daqiao']], 
	ybmjz_luxun:['male','wu',3,[],['linkTo:luxun','YB_mjz:re_luxun']], 
	ybmjz_sunshangxiang:['female','wu',3,[],['linkTo:sunshangxiang','YB_mjz:re_sunshangxiang']], 

	ybmjz_huatuo:['male','qun',3,[],['linkTo:huatuo','YB_mjz:re_huatuo']], 
	ybmjz_lvbu:['male','qun',4,[],['linkTo:lvbu','YB_mjz:re_lvbu']], 
	ybmjz_diaochan:['female','qun',3,[],['linkTo:diaochan','YB_mjz:re_diaochan']], 
}
