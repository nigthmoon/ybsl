import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { character }

/** @type { importCharacterConfig['character'] } */
const character = { //武将格式 : 
	//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
	ybmjz_caocao:['male','wei',4,['ybmjz_jianxiong','ybmjz_zhishuo'],['rankAdd:epic','zhu','linkTo:caocao','YB_mjz:re_caocao','tempname:re_caocao']], 
	ybmjz_simayi:['male','wei',3,['ybmjz_fankuix','ybmjz_guicai'],['rankAdd:epic','linkTo:simayi','YB_mjz:re_simayi','tempname:re_simayi']], 
	ybmjz_xiahoudun:['male','wei',4,['ybmjz_gangliey','new_qingjian'],['rankAdd:epic','name:夏侯|惇','linkTo:xiahoudun','YB_mjz:re_xiahoudun','tempname:re_xiahoudun']], 
	ybmjz_zhangliao:['male','wei',4,['ybmjz_tuxi'],['rankAdd:epic','linkTo:zhangliao','YB_mjz:re_zhangliao','tempname:re_zhangliao']], 
	ybmjz_xuzhu:['male','wei',4,['ybmjz_luoyi'],['rankAdd:epic','linkTo:xuzhu','YB_mjz:re_xuzhu','tempname:re_xuzhu']], 
	ybmjz_guojia:['male','wei',3,['ybmjz_tiandu','new_reyiji'],['rankAdd:epic','linkTo:guojia','YB_mjz:re_guojia','tempname:re_guojia']], 
	ybmjz_zhenji:['female','wei',3,[],['name:甄|宓','linkTo:zhenji','YB_mjz:re_zhenji','tempname:re_zhenji']], 

	ybmjz_liubei:['male','shu',4,[],['zhu','linkTo:liubei','YB_mjz:re_liubei','tempname:re_liubei']], 
	ybmjz_guanyu:['male','shu',4,[],['linkTo:guanyu','YB_mjz:re_guanyu','tempname:re_guanyu']], 
	ybmjz_zhangfei:['male','shu',4,[],['linkTo:zhangfei','YB_mjz:re_zhangfei','tempname:re_zhangfei']], 
	ybmjz_zhugeliang:['male','shu',3,[],['name:诸葛|亮','linkTo:zhugeliang','YB_mjz:re_zhugeliang','tempname:re_zhugeliang']], 
	ybmjz_zhaoyun:['male','shu',4,[],['linkTo:zhaoyun','YB_mjz:re_zhaoyun','tempname:re_zhaoyun']], 
	ybmjz_machao:['male','shu',4,[],['linkTo:machao','YB_mjz:re_machao','tempname:re_machao']], 
	ybmjz_huangyueying:['female','shu',3,['ybmjz_jizhi','reqicai'],['rankAdd:legend','linkTo:huangyueying','YB_mjz:re_huangyueying','tempname:re_huangyueying']], 

	ybmjz_sunquan:['male','wu',4,[],['zhu','linkTo:sunquan','YB_mjz:re_sunquan','tempname:re_sunquan']], 
	ybmjz_ganning:['male','wu',4,[],['linkTo:ganning','YB_mjz:re_ganning','tempname:re_ganning']], 
	ybmjz_lvmeng:['male','wu',4,[],['linkTo:lvmeng','YB_mjz:re_lvmeng','tempname:re_lvmeng']], 
	ybmjz_huanggai:['male','wu',4,[],['linkTo:huanggai','YB_mjz:re_huanggai','tempname:re_huanggai']], 
	ybmjz_zhouyu:['male','wu',3,[],['linkTo:zhouyu','YB_mjz:re_zhouyu','tempname:re_zhouyu']], 
	ybmjz_daqiao:['female','wu',3,[],["name:桥|null",'linkTo:daqiao','YB_mjz:re_daqiao','tempname:re_daqiao']], 
	ybmjz_luxun:['male','wu',3,[],['linkTo:luxun','YB_mjz:re_luxun','tempname:re_luxun']], 
	ybmjz_sunshangxiang:['female','wu',3,[],['linkTo:sunshangxiang','YB_mjz:re_sunshangxiang','tempname:re_sunshangxiang']], 

	ybmjz_huatuo:['male','qun',3,[],['linkTo:huatuo','YB_mjz:re_huatuo','tempname:re_huatuo']], 
	ybmjz_lvbu:['male','qun',4,[],['linkTo:lvbu','YB_mjz:re_lvbu','tempname:re_lvbu']], 
	ybmjz_diaochan:['female','qun',3,[],['linkTo:diaochan','YB_mjz:re_diaochan','tempname:re_diaochan']], 

	ybmjz_liuyan:['male','qun',3,['xinfu_tushe','ybmjz_limu'],['rankAdd:legend','rankS:s','linkTo:liuyan','YB_mjz:liuyan','tempname:liuyan']],//刘焉
	ybmjz_zhangqiying:['female','qun',3,['xinfu_ybfalu','xinfu_ybzhenyi','xinfu_ybdianhua'],['rankAdd:legend','rankS:s','name:张|琪瑛','linkTo:zhangqiying','YB_mjz:zhangqiying','tempname:zhangqiying']],//张琪瑛
	ybmjz_majun:['male','wei',3,['xinfu_ybjingxie','qiaosi'],['rankAdd:epic','linkTo:majun','YB_mjz:majun','tempname:majun']],//马钧
	ybmjz_sunluyu:['female','wu',3,['ybmjz_meibu','ybmjz_mumuxx'],['rankAdd:legend','rankS:s','linkTo:sunluyu','YB_mjz:sunluyu','tempname:sunluyu']],

	ybmjz_shen_zhugeliang:['male','shen',3,['ybsl_qixing','ybsl_kuangfeng','dawu'],['rankAdd:epic','name:诸葛|亮','linkTo:shen_zhugeliang','YB_mjz:shen_zhugeliang','shu','tempname:shen_zhugeliang']],//神诸葛亮
	ybmjz_shen_guojia:['male','shen',3,['ybmjz_reshuishi','ybmjz_stianyi','resghuishi'],['rankAdd:legend','rankS:s','name:郭|嘉','linkTo:shen_guojia','YB_mjz:shen_guojia','wei','tempname:shen_guojia']],//神郭嘉
	ybmjz_shen_caopi:['male','shen',5,['chuyuan','ybmjz_dengji'],['rankAdd:legend','rankS:s','linkTo:shen_caopi','YB_mjz:shen_caopi','wei','tempname:shen_caopi']],//神曹丕
	ybmjz_shen_caopi_kui:['female','shen',3,['shenfu','qixian','dz014_yangkui','dz014_xianji'],['rankAdd:legend','rankS:s','linkTo:shen_zhenji','YB_mjz:shen_zhenji','wei','unseen','tempname:shen_zhenji']],//神曹丕的傀儡
	
	ybmjz_hina:['female','shen',3,['hina_ybshenshi','hina_xingzhi'],['doublegroup:key:shen','rankAdd:legend','rankS:s','name:佐藤|雏','linkTo:db_key_hina','YB_mjz:db_key_hina','tempname:db_key_hina']],//佐藤雏
	ybmjz_kotori:['female','key',3,['kotori_ybyumo','kotori_ybhuazhan'],['rankAdd:legend','rankS:s','name:神户|小鸟','linkTo:key_kotori','YB_mjz:key_kotori','tempname:key_kotori']],//神户小鸟
	ybmjz_kagari:["female","shen",3,["kagari_ybzongsi"],['rankAdd:legend','rankS:s','name:null|null','linkTo:key_kagari','YB_mjz:key_kagari','tempname:key_kagari']],//篝
	

	ybmjz_youta:['male','key',4,['ybmjz_fengshen','ybmjz_yingshen','ybmjz_huanshen'],['rankAdd:legend','rankS:s','linkTo:key_youta','YB_mjz:key_youta','tempname:key_youta']],
}
