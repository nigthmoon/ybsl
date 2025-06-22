import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { character }

/** @type { importCharacterConfig['character'] } */
const character = { //武将格式 : 
	//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 

	sgskjdbzjms_mo_zhoutai:['male','devil',4,['sgskjdbzjms_tiequ','sgskjdbzjms_xieren','sgskjdbzjms_cuiti'],['rankAdd:rare','rankS:b','linkTo:zhoutai','YB_mjz:zhoutai','tempname:zhoutai','wu']],
	sgskjdbzjms_shen_zhugeliang:['male','shen',4,['sgskjdbzjms_zhongwu','qixing','sgskjdbzjms_kuangfeng','dawu','sgskjdbzjms_tianshi'],['rankAdd:legend','rankS:s','linkTo:shen_zhugeliang','YB_mjz:shen_zhugeliang','tempname:shen_zhugeliang','shu']],
	sgskjdbzjms_leizhenzi:['male','shen',3,['sgskjdbzjms_leishen','sgskjdbzjms_jiangxing','sgskjdbzjms_leifa','sgskjdbzjms_fenglei'],['rankAdd:legend','rankS:s','qun']],
	sgskjdbzjms_xian_zhugeguo:['female','shen',3,['sgskjdbzjms_qirang','sgskjdbzjms_cifu','sgskjdbzjms_yuhua'],['rankAdd:legend','rankS:s','linkTo:zhugeguo','YB_mjz:zhugeguo','shu']],
	sgskjdbzjms_zhen_zhangfei:['male','shu','4/6',['sgskjdbzjms_paoxiao','sgskjdbzjms_kuangbao','sgskjdbzjms_yinhen'],['rankAdd:junk','rankS:d','linkTo:re_zhangfei','YB_mjz:re_zhangfei']],
	sgskjdbzjms_zhen_guanyu:['male','shu',4,['sgskjdbzjms_wusheng','sgskjdbzjms_danji','sgskjdbzjms_fujun'],['rankAdd:legend','rankS:s','linkTo:re_guanyu','YB_mjz:wu_guanyu']],
	sgskjdbzjms_shen_liubei:['male','shen',4,['sgskjdbzjms_zhaolie','sgskjdbzjms_rende','sgskjdbzjms_taoyuan'],['rankAdd:epic','rankS:a','linkTo:shen_liubei','YB_mjz:shen_liubei','shu']],
	sgskjdbzjms_zhen_machao:['male','shu',4,['retieji','sgskjdbzjms_mashu','sgskjdbzjms_shenweitianjiangjun'],['rankAdd:legend','rankS:s','linkTo:re_machao','YB_mjz:shen_machao']],
	sgskjdbzjms_zhen_liubei:['male','shu',4,['sgskjdbzjms_rende','sgskjdbzjms_jieying','sgskjdbzjms_tuogu'],['rankAdd:epic','rankS:a','linkTo:re_liubei','YB_mjz:re_liubei']],


	qmsgswkjsgj_re_xizhicai:['male','wei',3,['qmsgswkjsgj_xianfu','tiandu','qmsgswkjsgj_chouce'],['rankAdd:legend','rankS:ap','linkTo:xizhicai','YB_mjz:xizhicai','tempname:xizhicai']],
	qmsgswkjsgj_re_liuxie:['male','qun',3,['qmsgswkjsgj_tianming','qmsgswkjsgj_mizhao','twzhuiting'],['rankAdd:epic','rankS:a','linkTo:liuxie','YB_mjz:liuxie','tempname:liuxie']],
	qmsgswkjsgj_shen_zhaoyun:['male','shen',2,['qmsgswkjsgj_juejing','relonghun'],['rankAdd:legend','rankS:s','linkTo:shen_zhaoyun','YB_mjz:shen_zhaoyun','tempname:shen_zhaoyun','shu']],
	qmsgswkjsgj_gui_xuyou:['male','YB_gui',4,['nzry_chenglve','nzry_shicai','nzry_cunmu','qmsgswkjsgj_baolian'],['rankAdd:legend','rankS:s','linkTo:xuyou','YB_mjz:xuyou','tempname:xuyou']],
	qmsgswkjsgj_gui_zhaoyun:['male','YB_gui',4,['longdan','qmsgswkjsgj_baolian'],['rankAdd:rare','rankS:b','linkTo:zhaoyun','YB_mjz:zhaoyun','tempname:zhaoyun']],
	qmsgswkjsgj_gui_sunquan:['male','YB_gui',4,['zhiheng','jiuyuan','qmsgswkjsgj_taiping'],['rankAdd:epic','rankS:a','linkTo:sunquan','YB_mjz:sunquan','tempname:sunquan']],
	qmsgswkjsgj_shen_guojia:['male','shen',3,["qmsgswkjsgj_reshuishi", "stianyi", "resghuishi",'tiandu','yiji'],['rankAdd:legend','rankS:s','linkTo:shen_guojia','YB_mjz:shen_guojia','tempname:shen_guojia','wei']],
	qmsgswkjsgj_re_sp_duyu:['male','qun',4,['qmsgswkjsgj_spwuku','qmsgswkjsgj_spsanchen'],['rankAdd:legend','rankS:ap','linkTo:sp_duyu','YB_mjz:sp_duyu','tempname:sp_duyu']],
	qmsgswkjsgj_gui_liubei:['male','YB_gui',4,['rende','jijiang','qmsgswkjsgj_taiping'],['rankAdd:rare','rankS:a','linkTo:liubei','YB_mjz:liubei','tempname:liubei']],
	qmsgswkjsgj_gui_re_zhouyu:['male','YB_gui',3,['reyingzi','refanjian','qmsgswkjsgj_baolian'],['rankAdd:rare','rankS:a','linkTo:re_zhouyu','YB_mjz:re_zhouyu','tempname:re_zhouyu']],
	qmsgswkjsgj_shen_zhugeliang:['male','shen',3,["qixing", "qmsgswkjsgj_kuangfeng", "dawu",'qmsgswkjsgj_guanxing'],['rankAdd:eqic','rankS:a','linkTo:shen_zhugeliang','YB_mjz:shen_zhugeliang','tempname:shen_zhugeliang','shu']],
	qmsgswkjsgj_sb_huangzhong:['male','shu',4,['qmsgswkjsgj_sbliegong'],['rankAdd:legend','rankS:s','linkTo:sb_huangzhong','YB_mjz:sb_huangzhong','tempname:sb_huangzhong']],
	qmsgswkjsgj_re_yangbiao:['male','qun',3,["qmsgswkjsgj_zhaohan", "qmsgswkjsgj_rangjie", "qmsgswkjsgj_yizheng"],['rankAdd:legend','rankS:s','linkTo:yangbiao','YB_mjz:yangbiao','tempname:yangbiao']],
	qmsgswkjsgj_re_luotong:['male','wu',4,['qmsgswkjsgj_qinzheng'],['rankAdd:legend','rankS:s','linkTo:luotong','YB_mjz:luotong','tempname:luotong']],

	sgsxjxfzmnl_re_xusheng:['male','wu',4,['sgsxjxfzmnl_pojun'],['rankAdd:legend','rankS:ap','linkTo:re_xusheng','YB_mjz:re_xusheng','tempname:re_xusheng']],
	sgsxjxfzmnl_sb_huangzhong:['male','shu',4,['sgsxjxfzmnl_sbliegong'],['rankAdd:legend','rankS:s','linkTo:sb_huangzhong','YB_mjz:sb_huangzhong','tempname:sb_huangzhong']],
	sgsxjxfzmnl_shen_sunce:['male','shen','1/6',['sgsxjxfzmnl_yingba','sgsxjxfzmnl_scfuhai','pinghe'],['rankAdd:legend','rankS:s','linkTo:shen_sunce','YB_mjz:shen_sunce','tempname:shen_sunce','wu']],
	sgsxjxfzmnl_sb_xiahoushi:['female','shu',3,['sgsxjxfzmnl_sbyanyu','sgsxjxfzmnl_sbqiaoshi'],['rankAdd:legend','rankS:s','linkTo:sb_xiahoushi','YB_mjz:sb_xiahoushi','tempname:sb_xiahoushi']],
	sgsxjxfzmnl_mo_diaochan:['female','devil',3,['sgsxjxfzmnl_meihuo','sgsxjxfzmnl_biyue'],['rankAdd:rare','rankS:am','linkTo:diaochan','YB_mjz:diaochan','tempname:diaochan','qun']],
	sgsxjxfzmnl_wangyuanji:['female','wei',3,['sgsxjxfzmnl_qianchong','sgsxjxfzmnl_shangjian'],['rankAdd:legend','rankS:s','linkTo:wangyuanji','YB_mjz:wangyuanji','tempname:wangyuanji']],
	sgsxjxfzmnl_shen_guojia:['male','shen',3,["sgsxjxfzmnl_reshuishi", "stianyi", "resghuishi"],['rankAdd:legend','rankS:s','linkTo:shen_guojia','YB_mjz:shen_guojia','tempname:shen_guojia','wei']],
	sgsxjxfzmnl_wenyang:['male','wei',4,['sgsxjxfzmnl_quedi','sgsxjxfzmnl_chuifeng','sgsxjxfzmnl_chongjian','dbchoujue'],['rankAdd:legend','rankS:s','linkTo:db_wenyang','YB_mjz:db_wenyang','tempname:db_wenyang','doublegroup:wei:wu']],
	sgsxjxfzmnl_re_jushou:['male','qun','2/3/3',['sgsxjxfzmnl_rejianying','sgsxjxfzmnl_reshibei'],['rankAdd:legend','rankS:s','linkTo:xin_jushou','YB_mjz:xin_jushou','tempname:xin_jushou']],
	sgsxjxfzmnl_shen_ganning:['male','shen','3/6',['sgsxjxfzmnl_drltpoxi','sgsxjxfzmnl_drltjieying'],['rankAdd:legend','rankS:s','linkTo:shen_ganning','YB_mjz:shen_ganning','tempname:shen_ganning','wu']],



















	
	// zzrsqlkjygzz_re_zuoci:['male','qun',3,['zzrsqlkjygzz_rehuashen','zzrsqlkjygzz_rexinsheng'],['rankAdd:legend','rankS:s','linkTo:re_zuoci','YB_mjz:re_zuoci']],

	// zzrsqlkjygzz_shen_guanyu:['male','shen',5,['zzrsqlkjygzz_wushen','zzrsqlkjygzz_wuhun'],['rankAdd:legend','rankS:s','linkTo:shen_guanyu','YB_mjz:shen_guanyu','shu']],
	// zzrsqlkjygzz_shen_zhangjiao:['male','shen',3,["yizhao", "sijun", "sanshou", "zzrsqlkjygzz_tianjie"],['rankAdd:legend','rankS:s','linkTo:shen_zhangjiao','YB_mjz:shen_zhangjiao','qun']],
	// zzrsqlkjygzz_shen_sunce:['male','shen','1/6',['zzrsqlkjygzz_yingba','fuhai','zzrsqlkjygzz_pinghe'],['rankAdd:legend','rankS:s','linkTo:shen_sunce','YB_mjz:shen_sunce','wu']],

	// zzrsqlkjygzz_yi_caocao:['male','wei',2,['zzrsqlkjygzz_Ejianxiong'],['rankAdd:legend','rankS:s','linkTo:caocao']],
	// zzrsqlkjygzz_yi_guanyu:['male','shu',10,['zzrsqlkjygzz_Ewusheng'/*,'dangxian' */],['rankAdd:legend','rankS:s','linkTo:guanyu']],
	// //原著中，敌方登场的异关羽带有当先……只不过等他宣泄完，就光速掉级了，最后被主角收录
	// zzrsqlkjygzz_yi_zhangjiao:['male','qun',3,['zzrsqlkjygzz_Eleiji','zzrsqlkjygzz_Eguidao'],['rankAdd:legend','rankS:s','linkTo:sb_zhangjiao']],
	// zzrsqlkjygzz_yi2_zhangjiao:['male','qun',3,['zzrsqlkjygzz_Eleiji','zzrsqlkjygzz_Eguidao','zzrsqlkjygzz_Esanshou'],['rankAdd:legend','rankS:s','linkTo:sb_zhangjiao','unseen']],
	// zzrsqlkjygzz_yi3_zhangjiao:['male','qun',3,['zzrsqlkjygzz_Eleiji','zzrsqlkjygzz_Eguidao','zzrsqlkjygzz_Esanshou'],['rankAdd:legend','rankS:s','linkTo:sb_zhangjiao','unseen']],
	// zzrsqlkjygzz_yi_luxun:['male','wu',3,['zzrsqlkjygzz_Eqianxun','zzrsqlkjygzz_Elianying'],['rankAdd:rare','rankS:a','linkTo:luxun']],
	// zzrsqlkjygzz_yi_sunce:['male','wu',4,['zzrsqlkjygzz_Ejiang','zzrsqlkjygzz_Ehunzi'],['rankAdd:rare','rankS:a','linkTo:sunce']],
	// zzrsqlkjygzz_yao_zhoutai:['male','wu',4,['zzrsqlkjygzz_Юbuqu'],['rankAdd:rare','rankS:b','linkTo:zhoutai']],

















}
