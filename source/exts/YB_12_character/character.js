import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { character }

/** @type { importCharacterConfig['character'] } */
const character = { //武将格式 : 
	//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 

	// sgskjdbzjms_zrshenmoyi:['male','qun',4,['sgskjdbzjms_smyhengcai'],['rankAdd:legend','rankS:s']],
	// sgskjdbzjms_zrzhenghao:['male','qun',4,[],['rankAdd:epic','rankS:a']],
	// sgskjdbzjms_zrzhaoyoubo:['male','qun',4,[],['rankAdd:epic','rankS:a']],
















	sgskjdbzjms_mo_zhoutai:['male','devil',4,['sgskjdbzjms_tiequ','sgskjdbzjms_xieren','sgskjdbzjms_cuiti'],['rankAdd:rare','rankS:b','linkTo:zhoutai','YB_mjz:zhoutai','tempname:zhoutai','wu',]],
	sgskjdbzjms_shen_zhugeliang:['male','shen',4,['sgskjdbzjms_zhongwu','qixing','sgskjdbzjms_kuangfeng','dawu','sgskjdbzjms_tianshi'],['rankAdd:legend','rankS:s','linkTo:shen_zhugeliang','YB_mjz:shen_zhugeliang','tempname:shen_zhugeliang','shu']],
	sgskjdbzjms_leizhenzi:['male','shen',3,['sgskjdbzjms_leishen','sgskjdbzjms_jiangxing','sgskjdbzjms_leifa','sgskjdbzjms_fenglei'],['rankAdd:legend','rankS:s','qun','name:null|null']],
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
	qmsgswkjsgj_shen_zhugeliang:['male','shen',3,["qixing", "qmsgswkjsgj_kuangfeng", "qmsgswkjsgj_dawu",'qmsgswkjsgj_guanxing'],['rankAdd:eqic','rankS:a','linkTo:shen_zhugeliang','YB_mjz:shen_zhugeliang','tempname:shen_zhugeliang','shu','name:诸葛|亮']],
	qmsgswkjsgj_sb_huangzhong:['male','shu',4,['qmsgswkjsgj_sbliegong'],['rankAdd:legend','rankS:s','linkTo:sb_huangzhong','YB_mjz:sb_huangzhong','tempname:sb_huangzhong']],
	qmsgswkjsgj_re_yangbiao:['male','qun',3,["qmsgswkjsgj_zhaohan", "qmsgswkjsgj_rangjie", "qmsgswkjsgj_yizheng"],['rankAdd:legend','rankS:s','linkTo:yangbiao','YB_mjz:yangbiao','tempname:yangbiao']],
	qmsgswkjsgj_re_luotong:['male','wu',4,['qmsgswkjsgj_qinzheng'],['rankAdd:legend','rankS:s','linkTo:luotong','YB_mjz:luotong','tempname:luotong']],
	qmsgswkjsgj_re_liuyan:['male','qun',3,['qmsgswkjsgj_tushe','qmsgswkjsgj_limu','qmsgswkjsgj_pianan'],['rankAdd:legend','rankS:s','linkTo:liuyan','YB_mjz:liuyan','tempname:liuyan']],
	qmsgswkjsgj_re_lusu:['male','wu',3,['qmsgswkjsgj_haoshi','dimeng'],['rankAdd:legend','rankS:s','linkTo:re_lusu','YB_mjz:re_lusu','tempname:re_lusu']],
	qmsgswkjsgj_re_caorui:['male','wei',3,['huituo','qmsgswkjsgj_mingjian','xingshuai'],['rankAdd:legend','rankS:s','linkTo:caorui','YB_mjz:caorui','tempname:caorui','zhu']],
	qmsgswkjsgj_re_caiwenji:['female','qun',3,['qmsgswkjsgj_beige','duanchang'],['rankAdd:legend','rankS:s','linkTo:re_caiwenji','YB_mjz:re_caiwenji','tempname:re_caiwenji','name:蔡|琰']],
	qmsgswkjsgj_re_zhangxiu:['male','qun',4,['qmsgswkjsgj_xiongluan','drlt_congjian'],['rankAdd:epic','rankS:b','linkTo:zhangxiu','YB_mjz:zhangxiu','tempname:zhangxiu']],
	qmsgswkjsgj_re_fuhuanghou:['female','qun',3,['qmsgswkjsgj_zhuikong','oldqiuyuan'],['rankAdd:legend','rankS:s','linkTo:fuhuanghou','YB_mjz:fuhuanghou','tempname:fuhuanghou']],
	qmsgswkjsgj_shen_ganning:['male','shen','3/6',["qmsgswkjsgj_poxi", "qmsgswkjsgj_jieying", "qixi"],['rankAdd:legend','rankS:s','linkTo:shen_ganning','YB_mjz:shen_ganning','tempname:shen_ganning','wu']],
	qmsgswkjsgj_re_sunhanhua:['female','wu',3,['qmsgswkjsgj_chongxu','qmsgswkjsgj_miaojian','qmsgswkjsgj_lianhua'],['rankAdd:legend','rankS:s','linkTo:sunhanhua','YB_mjz:sunhanhua','tempname:sunhanhua']],
	qmsgswkjsgj_yingtian_simayi:{
		sex: "male",
		group: "shen",
		hp: 4,
		skills: ["qmsgswkjsgj_jilin", "yingyou", "yingtian"],
		groupInGuozhan: "wei",
		names: "司马|懿",
		linkTo:'new_simayi',
		YB_mjz:'new_simayi',
	},
	qmsgswkjsgj_re_shen_zhaoyun:['male','shen',2,['qmsgswkjsgj_rejuejing','relonghun','longdan','new_yajiao'],['rankAdd:legend','rankS:s','linkTo:shen_zhaoyun','YB_mjz:shen_zhaoyun','tempname:shen_zhaoyun','shu']],











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
	sgsxjxfzmnl_shichangshi:{
		sex: "male",
		group: "qun",
		hp: 1,
		skills: ["sgsxjxfzmnl_mbdanggu", "sgsxjxfzmnl_mbmowang"],
		trashBin: ["sex:male_castrated"],
		names: "张|让-赵|忠-孙|璋-毕|岚-夏|恽-韩|悝-栗|嵩-段|珪-郭|胜-高|望",
		linkTo:'shichangshi',
		// YB_mjz:'shichangshi',
	},
	sgsxjxfzmnl_scs_zhangrang:['male','qun',0,['sgsxjxfzmnl_scstaoluan'],['unseen','sex:male_castrated','tempname:scs_zhangrang','linkTo:scs_zhangrang','name:张|让']],
	sgsxjxfzmnl_scs_zhaozhong:['male','qun',0,['sgsxjxfzmnl_scschiyan'],['unseen','sex:male_castrated','tempname:scs_zhaozhong','linkTo:scs_zhaozhong','name:赵|忠']],
	sgsxjxfzmnl_scs_sunzhang:['male','qun',0,['sgsxjxfzmnl_scszimou'],['unseen','sex:male_castrated','tempname:scs_sunzhang','linkTo:scs_sunzhang','name:孙|璋']],
	sgsxjxfzmnl_scs_bilan:['male','qun',0,['sgsxjxfzmnl_scspicai'],['unseen','sex:male_castrated','tempname:scs_bilan','linkTo:scs_bilan','name:毕|岚']],
	sgsxjxfzmnl_scs_xiayun:['male','qun',0,['sgsxjxfzmnl_scsyaozhuo'],['unseen','sex:male_castrated','tempname:scs_xiayun','linkTo:scs_xiayun','name:夏|恽']],
	sgsxjxfzmnl_scs_hankui:['male','qun',0,['sgsxjxfzmnl_scsxiaolu'],['unseen','sex:male_castrated','tempname:scs_hankui','linkTo:scs_hankui','name:韩|悝']],
	sgsxjxfzmnl_scs_lisong:['male','qun',0,['sgsxjxfzmnl_scskuiji'],['unseen','sex:male_castrated','tempname:scs_lisong','linkTo:scs_lisong','name:栗|嵩']],
	sgsxjxfzmnl_scs_duangui:['male','qun',0,['sgsxjxfzmnl_scschihe'],['unseen','sex:male_castrated','tempname:scs_duangui','linkTo:scs_duangui','name:段|珪']],
	sgsxjxfzmnl_scs_guosheng:['male','qun',0,['sgsxjxfzmnl_scsniqu'],['unseen','sex:male_castrated','tempname:scs_guosheng','linkTo:scs_guosheng','name:郭|胜']],
	sgsxjxfzmnl_scs_gaowang:['male','qun',0,['sgsxjxfzmnl_scsmiaoyu'],['unseen','sex:male_castrated','tempname:scs_gaowang','linkTo:scs_gaowang','name:高|望']],
	
	sgsxjxfzmnl_shichangshi_dead:{
		sex: "male",
		group: "qun",
		hp: 1,
		skills: ["sgsxjxfzmnl_mbdanggu", "sgsxjxfzmnl_mbmowang"],
		trashBin: ["sex:male_castrated"],
		names: "张|让-赵|忠-孙|璋-毕|岚-夏|恽-韩|悝-栗|嵩-段|珪-郭|胜-高|望",
		linkTo:'shichangshi',
		isUnseen:true,
	},
	sgsxjxfzmnl_scs_zhangrang_dead:['male','qun',0,['sgsxjxfzmnl_scstaoluan'],['unseen','sex:male_castrated','tempname:scs_zhangrang','linkTo:scs_zhangrang','name:张|让']],
	sgsxjxfzmnl_scs_zhaozhong_dead:['male','qun',0,['sgsxjxfzmnl_scschiyan'],['unseen','sex:male_castrated','tempname:scs_zhaozhong','linkTo:scs_zhaozhong','name:赵|忠']],
	sgsxjxfzmnl_scs_sunzhang_dead:['male','qun',0,['sgsxjxfzmnl_scszimou'],['unseen','sex:male_castrated','tempname:scs_sunzhang','linkTo:scs_sunzhang','name:孙|璋']],
	sgsxjxfzmnl_scs_bilan_dead:['male','qun',0,['sgsxjxfzmnl_scspicai'],['unseen','sex:male_castrated','tempname:scs_bilan','linkTo:scs_bilan','name:毕|岚']],
	sgsxjxfzmnl_scs_xiayun_dead:['male','qun',0,['sgsxjxfzmnl_scsyaozhuo'],['unseen','sex:male_castrated','tempname:scs_xiayun','linkTo:scs_xiayun','name:夏|恽']],
	sgsxjxfzmnl_scs_hankui_dead:['male','qun',0,['sgsxjxfzmnl_scsxiaolu'],['unseen','sex:male_castrated','tempname:scs_hankui','linkTo:scs_hankui','name:韩|悝']],
	sgsxjxfzmnl_scs_lisong_dead:['male','qun',0,['sgsxjxfzmnl_scskuiji'],['unseen','sex:male_castrated','tempname:scs_lisong','linkTo:scs_lisong','name:栗|嵩']],
	sgsxjxfzmnl_scs_duangui_dead:['male','qun',0,['sgsxjxfzmnl_scschihe'],['unseen','sex:male_castrated','tempname:scs_duangui','linkTo:scs_duangui','name:段|珪']],
	sgsxjxfzmnl_scs_guosheng_dead:['male','qun',0,['sgsxjxfzmnl_scsniqu'],['unseen','sex:male_castrated','tempname:scs_guosheng','linkTo:scs_guosheng','name:郭|胜']],
	sgsxjxfzmnl_scs_gaowang_dead:['male','qun',0,['sgsxjxfzmnl_scsmiaoyu'],['unseen','sex:male_castrated','tempname:scs_gaowang','linkTo:scs_gaowang','name:高|望']],

	sgsxjxfzmnl_yue_caiwenji:['female','qun',3,["sgsxjxfzmnl_dcshuangjia", "sgsxjxfzmnl_dcbeifen"],['rankAdd:legend','rankS:s','linkTo:yue_caiwenji','YB_mjz:yue_caiwenji','tempname:yue_caiwenji','name:蔡|琰']],
	sgsxjxfzmnl_liuyan:['male','qun',3,['sgsxjxfzmnl_tushe','sgsxjxfzmnl_limu'],['rankAdd:legend','rankS:s','linkTo:liuyan','YB_mjz:liuyan','tempname:liuyan']],
	sgsxjxfzmnl_shen_xunyu:['male','shen',3,["sgsxjxfzmnl_tianzuo", "sgsxjxfzmnl_lingce", "sgsxjxfzmnl_dinghan"],['rankAdd:legend','rankS:s','linkTo:shen_xunyu','YB_mjz:shen_xunyu','tempname:shen_xunyu','wei','clan:颍川荀氏']],
	sgsxjxfzmnl_shen_zhangfei:['male','shen',4,['sgsxjxfzmnl_shencai','sgsxjxfzmnl_xunshi'],['rankAdd:legend','rankS:s','linkTo:shen_zhangfei','YB_mjz:shen_zhangfei','tempname:shen_zhangfei','shu']],
	sgsxjxfzmnl_wu_zhugeliang:['male','shu',"4/7",["sgsxjxfzmnl_dcjincui", "sgsxjxfzmnl_dcqingshi", "sgsxjxfzmnl_dczhizhe"],['rankAdd:legend','rankS:s','linkTo:wu_zhugeliang','YB_mjz:wu_zhugeliang','tempname:wu_zhugeliang','name:诸葛|亮']],
	sgsxjxfzmnl_sb_caopi:['male','wei',3,["sgsxjxfzmnl_sbxingshang", "sgsxjxfzmnl_sbfangzhu", "sgsxjxfzmnl_sbsongwei"],['rankAdd:legend','rankS:s','linkTo:sb_caopi','YB_mjz:sb_caopi','tempname:sb_caopi','zhu']],
	sgsxjxfzmnl_boss_zhaoyun:['male','shen',1,["sgsxjxfzmnl_boss_juejing", "sgsxjxfzmnl_xinlonghun", "sgsxjxfzmnl_zhanjiang"],['rankAdd:legend','rankS:s','linkTo:boss_zhaoyun','YB_mjz:boss_zhaoyun','tempname:boss_zhaoyun','shu']],
	sgsxjxfzmnl_nanhualaoxian:['male','qun',3,["sgsxjxfzmnl_yufeng", "sgsxjxfzmnl_tianshu"],['rankAdd:legend','rankS:s','linkTo:nanhualaoxian','YB_mjz:nanhualaoxian','tempname:nanhualaoxian','name:庄|周']],
	sgsxjxfzmnl_mo_lvbu:['male','devil',6,['mashu','sgsxjxfzmnl_jielve','sgsxjxfzmnl_zhenhuo','sgsxjxfzmnl_wuqian','wushuang'],['rankAdd:rare','rankS:am','linkTo:lvbu','YB_mjz:lvbu','tempname:lvbu','qun']],
	sgsxjxfzmnl_zhangxuan:['female','wu',4,['sgsxjxfzmnl_tongli','sgsxjxfzmnl_shezang'],['rankAdd:legend','rankS:s','linkTo:zhangxuan','YB_mjz:zhangxuan','tempname:zhangxuan']],
	sgsxjxfzmnl_caojinyu:['female','wei',3,['sgsxjxfzmnl_yuqi','sgsxjxfzmnl_shanshen','sgsxjxfzmnl_xianjing'],['rankAdd:legend','rankS:s','linkTo:caojinyu','YB_mjz:caojinyu','tempname:caojinyu']],
	sgsxjxfzmnl_shen_machao:['male','shen',4,['sgsxjxfzmnl_shouli','sgsxjxfzmnl_hengwu'],['rankAdd:legend','rankS:s','linkTo:shen_machao','YB_mjz:shen_machao','tempname:shen_machao','shu']],
	sgsxjxfzmnl_sunhanhua:['female','wu',3,['sgsxjxfzmnl_chongxu','sgsxjxfzmnl_miaojian','sgsxjxfzmnl_shhlianhua'],['rankAdd:legend','rankS:s','linkTo:sunhanhua','YB_mjz:sunhanhua','tempname:sunhanhua']],



















	
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
