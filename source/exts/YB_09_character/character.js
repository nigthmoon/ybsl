import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { character }

/** @type { importCharacterConfig['character'] } */
const character = { //武将格式 : 
	North_yanghuiyu:['female','shen',3,['North_yhy_xuyin','North_yhy_cihua','North_yhy_minzeng'],['jin','boss','bossallowed','rankAdd:legend','rankS:s']],
	North_duyu:['male','shen',4,['North_dy_qingyu','North_dy_zhengwu','North_dy_kuangzou'],['jin','boss','bossallowed','rankAdd:legend','rankS:s']],
	North_sunshangxiang:['female','shen',3,['North_ssx_jibing','North_ssx_lieyuan'],['wu','boss','bossallowed','rankAdd:legend','rankS:s']],
	Northxx_sunshangxiang:['female','shen',3,['North_ssx_jibing','North_ssx_lieyuanxx'],['wu','boss','bossallowed','rankAdd:legend','rankS:s']],
	North_zhugeliang:['male','shen',3,['North_zgl_zhenhu','North_zgl_dongxu','North_zgl_qizhu','North_zgl_shiyan'],['shu','boss','bossallowed','rankAdd:legend','rankS:s']],
	Northxx_zhugeliang:['male','shen',3,['North_zgl_zhenhu','North_zgl_dongxu','North_zgl_qizhu','North_zgl_shiyanxx'],['shu','boss','bossallowed','rankAdd:legend','rankS:s']],
	North_lidian:['male','shen',3,['North_ld_chenxun','North_ld_minde'],['wei','boss','bossallowed','rankAdd:legend','rankS:s']],
	North_shamoke:['male','shen',4,['North_smk_shangying'],['shu','boss','bossallowed','rankAdd:legend','rankS:s']],
	North_diaochan:['female','shen',3,['North_dc_ruofu','North_dc_sulian','North_dc_qilu','North_dc_ziman'],['qun','boss','bossallowed','rankAdd:legend','rankS:s']],
	North_beimihu:['female','shen',3,['North_bmh_wuzhi','North_bmh_huanchao','North_bmh_chizhangt','North_bmh_lushou'],['qun','boss','bossallowed','rankAdd:legend','rankS:s']],
	North_bulianshi:['female','shen',3,['North_bls_qiangong','North_bls_yuanya'],['wu','boss','bossallowed','rankAdd:legend','rankS:s']],
	North_caojinyu:['female','shen',3,['North_cjy_bashu','North_cjy_duijing','North_cjy_lvzhi'],['wei','boss','bossallowed','rankAdd:legend','rankS:s']],
	North_huangyueying:['female','shen',3,['North_hyy_guishi','North_hyy_lancai','North_hyy_bingxue'],['qun','boss','bossallowed','rankAdd:legend','rankS:s']],
	// 'ten_caoyi':['female','wei',4,['caoyi_miyi','caoyi_yinjun'],['unseen']],//-------掐指一算，本体曹轶应该快上来了，我这个就收起来了
	// 'ten_zhangliao':['male','qun',4,['zhangliao_yuxi','zhangliao_porong'],[]],//-------掐指一算，本体曹轶应该快上来了，我这个就收起来了
	// ybsl_windmoon:['female','wei',4,['kagari_ybzongsi','xinfu_ybfalu','xinfu_ybzhenyi','xinfu_ybdianhua',/*'ybsl_kuwang','ybsl_guqu',*/'ybsl_aocai','ybsl_clanxingzu'],['clan:吴郡陆氏']],
	ybsl_mystery1:['female','wei',4,['North_haoling','North_zhenglue'],['unseen']],
	"North_pc":["male","qun",4,["North_PC_zigong","North_PC_qianshui"],['unseen']],
	North_caoxiancaohua:['female','shen',3,['North_cxch_lingxi','North_cxch_gongsheng','North_cxch_lianyu','North_cxch_xixuan'],['qun','boss','bossallowed','rankAdd:legend','rankS:s']],
	North_sunhanhua:['female','shen',3,['North_shh_yuniao','North_shh_qingsi','North_shh_xianyin'],['wu','boss','bossallowed','rankAdd:legend','rankS:s']],
	North_guozhao:['female','shen',3,['North_gz_gongshu','North_gz_shujian'],['wei','boss','bossallowed']],
	North_zhaoxiang:['female','shen',3,['North_zx_huashuang','North_zx_ningao'],['shu','boss','bossallowed']],
	North_liufeng:['male','shen',4,['North_lf_zhenzhi'],['shu','boss','bossallowed']],
	
	"YB_nobody_simayi":["male","wei",3,["YB_nobody_guiyin","YB_nobody_linglv"],["ext:夜白神略/image/ybsl009/YB_nobody_simayi.gif",'linkTo:simayi']],
	"YB_nobody_zhaoyun":["male","qun",4,["YB_nobody_longying","YB_nobody_fengguo"],["ext:夜白神略/image/ybsl009/YB_nobody_zhaoyun.gif",'linkTo:zhaoyun']],
	// North_zhangwenwen:['male','wu',3,['North_zww_yuguan','North_zww_ganyun'],[]],
	//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
}