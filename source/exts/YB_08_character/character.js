import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { character }

const character = { //武将格式 : 
	//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
	ybmjz_caocao:['male','wei',4,['ybmjz_jianxiong','ybmjz_zhishuo'],['rankAdd:epic','zhu','linkTo:caocao','YB_mjz:re_caocao']], 
	ybmjz_simayi:['male','wei',3,['ybmjz_fankuix','ybmjz_guicai'],['rankAdd:epic','linkTo:simayi','YB_mjz:re_simayi']], 
	ybmjz_xiahoudun:['male','wei',4,['ybmjz_gangliey','new_qingjian'],['rankAdd:epic','name:夏侯|惇','linkTo:xiahoudun','YB_mjz:re_xiahoudun']], 
	ybmjz_zhangliao:['male','wei',4,['ybmjz_tuxi'],['rankAdd:epic','linkTo:zhangliao','YB_mjz:re_zhangliao']], 
	ybmjz_xuzhu:['male','wei',4,['ybmjz_luoyi'],['rankAdd:epic','linkTo:xuzhu','YB_mjz:re_xuzhu']], 
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

	ybmjz_zhangqiying:['female','qun',3,['xinfu_ybfalu','xinfu_ybzhenyi','xinfu_ybdianhua'],['rankAdd:legend','name:张|琪瑛','linkTo:zhangqiying','YB_mjz:zhangqiying']],//张琪瑛
	ybmjz_majun:['male','wei',3,['xinfu_ybjingxie','qiaosi'],['rankAdd:epic','linkTo:majun','YB_mjz:majun']],//马钧

	ybmjz_shen_zhugeliang:['male','shen',3,['ybsl_qixing','ybsl_kuangfeng','dawu'],['rankAdd:eqic','name:诸葛|亮','linkTo:shen_zhugeliang','YB_mjz:shen_zhugeliang','shu']],//诸葛亮
	ybmjz_shen_guojia:['male','shen',3,['ybmjz_reshuishi','ybmjz_stianyi','resghuishi'],['rankAdd:legend','name:郭|嘉','linkTo:shen_guojia','YB_mjz:shen_guojia','wei']],//郭嘉
	
	ybmjz_hina:['female','shen',3,['hina_ybshenshi','hina_xingzhi'],['doublegroup:key:shen','rankAdd:legend','name:佐藤|雏','linkTo:db_key_hina','YB_mjz:db_key_hina']],//佐藤雏
	ybmjz_kotori:['female','key',3,['kotori_ybyumo','kotori_ybhuazhan'],['rankAdd:legend','name:神户|小鸟','linkTo:key_kotori','YB_mjz:key_kotori']],//神户小鸟
	ybmjz_kagari:["female","shen",3,["kagari_ybzongsi"],['rankAdd:legend','name:null|null','linkTo:key_kagari','YB_mjz:key_kagari']],//篝

	ybmjz_youta:['male','key',4,['ybmjz_fengshen','ybmjz_yingshen','ybmjz_huanshen'],['rankAdd:legend','linkTo:key_youta','YB_mjz:key_youta','forbidai']],
}
