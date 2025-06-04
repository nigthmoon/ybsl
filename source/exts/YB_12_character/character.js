import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { character }

/** @type { importCharacterConfig['character'] } */
const character = { //武将格式 : 
	//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 

	sgskjdbzjms_mo_zhoutai:['male','YB_demon',4,['sgskjdbzjms_tiequ','sgskjdbzjms_xieren','sgskjdbzjms_cuiti'],['rankAdd:rare','rankS:b','linkTo:zhoutai','YB_mjz:zhoutai','wu']],
	sgskjdbzjms_shen_zhugeliang:['male','shen',4,['sgskjdbzjms_zhongwu','qixing','sgskjdbzjms_kuangfeng','dawu','sgskjdbzjms_tianshi'],['rankAdd:legend','rankS:s','linkTo:shen_zhugeliang','YB_mjz:shen_zhugeliang','shu']],
	sgskjdbzjms_leizhenzi:['male','shen',3,['sgskjdbzjms_leishen','sgskjdbzjms_jiangxing','sgskjdbzjms_leifa','sgskjdbzjms_fenglei'],['rankAdd:legend','rankS:s','qun']],
	sgskjdbzjms_xian_zhugeguo:['female','shen',3,['sgskjdbzjms_qirang','sgskjdbzjms_cifu','sgskjdbzjms_yuhua'],['rankAdd:legend','rankS:s','linkTo:zhugeguo','YB_mjz:zhugeguo','shu']],
	sgskjdbzjms_zhen_zhangfei:['male','shu','4/6',['sgskjdbzjms_paoxiao','sgskjdbzjms_kuangbao','sgskjdbzjms_yinhen'],['rankAdd:junk','rankS:d','linkTo:re_zhangfei','YB_mjz:re_zhangfei']],
	sgskjdbzjms_zhen_guanyu:['male','shu',4,['sgskjdbzjms_wusheng','sgskjdbzjms_danji','sgskjdbzjms_fujun'],['rankAdd:legend','rankS:s','linkTo:re_guanyu','YB_mjz:wu_guanyu']],
	sgskjdbzjms_shen_liubei:['male','shen',4,['sgskjdbzjms_zhaolie','sgskjdbzjms_rende','sgskjdbzjms_taoyuan'],['rankAdd:epic','rankS:a','linkTo:shen_liubei','YB_mjz:shen_liubei','shu']],
	sgskjdbzjms_zhen_machao:['male','shu',4,['retieji','sgskjdbzjms_mashu','sgskjdbzjms_shenweitianjiangjun'],['rankAdd:legend','rankS:s','linkTo:re_machao','YB_mjz:shen_machao']],
	sgskjdbzjms_zhen_liubei:['male','shu',4,['sgskjdbzjms_rende','sgskjdbzjms_jieying','sgskjdbzjms_tuogu'],['rankAdd:epic','rankS:a','linkTo:re_liubei','YB_mjz:re_liubei']],


	qmsgswkjsgj_xizhicai:['male','wei',3,['qmsgswkjsgj_xianfu','tiandu','qmsgswkjsgj_chouce'],['rankAdd:legend','rankS:ap','linkTo:xizhicai','YB_mjz:xizhicai']],
	qmsgswkjsgj_liuxie:['male','qun',3,['qmsgswkjsgj_tianming','qmsgswkjsgj_mizhao','twzhuiting'],['rankAdd:epic','rankS:a','linkTo:liuxie','YB_mjz:liuxie']],
	qmsgswkjsgj_shen_zhaoyun:['male','shen',2,['qmsgswkjsgj_juejing','relonghun'],['rankAdd:legend','rankS:s','linkTo:shen_zhaoyun','YB_mjz:shen_zhaoyun','shu']],
	qmsgswkjsgj_gui_xuyou:['male','qun',4,['nzry_chenglve','nzry_shicai','nzry_cunmu','qmsgswkjsgj_baolian'],['rankAdd:legend','rankS:s','linkTo:xuyou','YB_mjz:xuyou']],
	qmsgswkjsgj_gui_zhaoyun:['male','YB_gui',4,['longdan','qmsgswkjsgj_baolian'],['rankAdd:rare','rankS:b','linkTo:zhaoyun','linkTo:zhaoyun','YB_mjz:zhaoyun']],
	qmsgswkjsgj_gui_sunquan:['male','YB_gui',4,['zhiheng','jiuyuan','qmsgswkjsgj_taiping'],['rankAdd:epic','rankS:a','linkTo:sunquan','YB_mjz:sunquan']],
	qmsgswkjsgj_shen_guojia:['male','shen',3,["qmsgswkjsgj_reshuishi", "stianyi", "resghuishi",'tiandu','yiji'],['rankAdd:legend','rankS:s','linkTo:shen_guojia','YB_mjz:shen_guojia','wei']],
	qmsgswkjsgj_sp_duyu:['male','qun',4,['qmsgswkjsgj_spwuku','qmsgswkjsgj_spsanchen'],['rankAdd:legend','rankS:ap','linkTo:sp_duyu','YB_mjz:sp_duyu']],

	sgsxjxfzmnl_re_xusheng:['male','wu',4,['sgsxjxfzmnl_pojun'],['rankAdd:legend','rankS:ap','linkTo:re_xusheng','YB_mjz:re_xusheng']],
	sgsxjxfzmnl_sb_huangzhong:['male','shu',4,['sgsxjxfzmnl_sbliegong'],['rankAdd:legend','rankS:s','linkTo:sb_huangzhong','YB_mjz:sb_huangzhong']],
	sgsxjxfzmnl_shen_sunce:['male','shen','1/6',['sgsxjxfzmnl_yingba','sgsxjxfzmnl_scfuhai','pinghe'],['rankAdd:legend','rankS:s','linkTo:shen_sunce','YB_mjz:shen_sunce','wu']],
	sgsxjxfzmnl_sb_xiahoushi:['female','shu',3,['sgsxjxfzmnl_sbyanyu','sgsxjxfzmnl_sbqiaoshi'],['rankAdd:legend','rankS:s','linkTo:sb_xiahoushi','YB_mjz:sb_xiahoushi']],
	sgsxjxfzmnl_mo_diaochan:['female','qun',3,['sgsxjxfzmnl_meihuo','sgsxjxfzmnl_biyue'],['rankAdd:rare','rankS:am','linkTo:diaochan','YB_mjz:diaochan']],
























}
