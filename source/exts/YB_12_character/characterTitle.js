import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { characterTitle }
var qmsgswkjsgj_span = 'cyber-neon-halo-flow';
// var qmsgswkjsgj_span = 'cyber-neon-text';
// var qmsgswkjsgj_shenci_span = 'champagne-gold-flow-text';
// var qmsgswkjsgj_shenci_span = 'molten-gold-flow-text';
// var qmsgswkjsgj_shenci_span = 'gold-flow-revamped-bright';
var qmsgswkjsgj_shenci_span = 'solid-gold-with-flow-halo';
// var sgsxjxfzmnl_span = 'sgsxjxfzmnl';
const characterTitle = {//称号
    
	sgskjdbzjms_mo_zhoutai:'<font color=cyan>坚毅的铁躯</font>',
	sgskjdbzjms_shen_zhugeliang:'<font color=cyan>五丈原的英魂</font>',
	sgskjdbzjms_leizhenzi:'<font color=cyan>风雷疾行</font>',
	sgskjdbzjms_xian_zhugeguo:'<font color=cyan>赐福的仙女</font>',
	sgskjdbzjms_zhen_zhangfei:'<font color=cyan>饮恨的嗔魂</font>',
	sgskjdbzjms_zhen_guanyu:'<font color=cyan>水淹七军</font>',
	sgskjdbzjms_shen_liubei:'<font color=cyan>真龙之怒</font>',
	sgskjdbzjms_zhen_machao:'<font color=cyan>狮盔银铠玉面郎</font>',
	sgskjdbzjms_zhen_liubei:'<font color=cyan>白帝托孤</font>',


	qmsgswkjsgj_re_xizhicai:'<span class = \''+qmsgswkjsgj_span+'\'>负俗的夭才</span>',
	qmsgswkjsgj_re_liuxie:'<span class = \''+qmsgswkjsgj_span+'\'>受困天子</span>',
	qmsgswkjsgj_shen_zhaoyun:'<span class = \''+qmsgswkjsgj_span+'\'>神威如龙</span>',
	// qmsgswkjsgj_gui_xuyou:'<span class = \''+qmsgswkjsgj_span+'\'></span>',
	// qmsgswkjsgj_gui_zhaoyun:'<span class = \''+qmsgswkjsgj_span+'\'></span>',
	// qmsgswkjsgj_gui_sunquan:'<span class = \''+qmsgswkjsgj_span+'\'></span>',
	qmsgswkjsgj_shen_guojia:'<span class = \''+qmsgswkjsgj_span+'\'>星月奇佐</span>',
	qmsgswkjsgj_re_sp_duyu:'<span class = \''+qmsgswkjsgj_span+'\'>文成武德</span>',
	// qmsgswkjsgj_gui_liubei:'<span class = \''+qmsgswkjsgj_span+'\'></span>',
	qmsgswkjsgj_shen_zhugeliang:'<span class = \''+qmsgswkjsgj_span+'\'>赤壁的妖术师</span>',
	// qmsgswkjsgj_gui_re_zhouyu:'<span class = \''+qmsgswkjsgj_span+'\'></span>',
	qmsgswkjsgj_sb_huangzhong:'<span class = \''+qmsgswkjsgj_span+'\'>没金铩羽</span>',
	qmsgswkjsgj_re_yangbiao:'<span class = \''+qmsgswkjsgj_span+'\'>德彰海内</span>',
	qmsgswkjsgj_re_luotong:'<span class = \''+qmsgswkjsgj_span+'\'>力政人臣</span>',
	qmsgswkjsgj_re_liuyan:'<span class = \''+qmsgswkjsgj_span+'\'>裂土之宗</span>',
	qmsgswkjsgj_re_lusu:'<span class = \''+qmsgswkjsgj_span+'\'>独断的外交家</span>',
	qmsgswkjsgj_re_caorui:'<span class = \''+qmsgswkjsgj_span+'\'>天资的明君</span>',
	qmsgswkjsgj_re_caiwenji:'<span class = \''+qmsgswkjsgj_span+'\'>异乡的孤女</span>',
	qmsgswkjsgj_re_zhangxiu:'<span class = \''+qmsgswkjsgj_span+'\'>北地枪王</span>',
	qmsgswkjsgj_re_fuhuanghou:'<span class = \''+qmsgswkjsgj_span+'\'>孤注一掷</span>',
	qmsgswkjsgj_shen_ganning:'<span class = \''+qmsgswkjsgj_span+'\'>江表之力牧</span>',
	qmsgswkjsgj_re_sunhanhua:'<span class = \''+qmsgswkjsgj_span+'\'>挣绽的青莲</span>',
	qmsgswkjsgj_yingtian_simayi:'<span class = \''+qmsgswkjsgj_span+'\'>三狼吞魏</span>',
	qmsgswkjsgj_re_shen_zhaoyun:'<span class = \''+qmsgswkjsgj_span+'\'>天龙乘云</span>',

	qmsgswkjsgj_shen_lusu:'<span class = \''+qmsgswkjsgj_span+'\'>兴吴之邓禹</span>',
	qmsgswkjsgj_re_sunquan:'<span class = \''+qmsgswkjsgj_span+'\'>东吴大帝</span>',
	qmsgswkjsgj_shen_zhouyu:'<span class = \''+qmsgswkjsgj_span+'\'>赤壁的火神</span>',
	qmsgswkjsgj_shen_xunyu:'<span class = \''+qmsgswkjsgj_span+'\'>洞心先识</span>',
	qmsgswkjsgj_mb_luyusheng:'<span class = \''+qmsgswkjsgj_span+'\'>义姑</span>',
	qmsgswkjsgj_shen_luxun:'<span class = \''+qmsgswkjsgj_span+'\'>红莲业火</span>',
	qmsgswkjsgj_shen_caocao:'<span class = \''+qmsgswkjsgj_span+'\'>超世之英杰</span>',
	qmsgswkjsgj_shen_lvbu:'<span class = \''+qmsgswkjsgj_span+'\'>修罗之道</span>',
	qmsgswkjsgj_pot_weiyan:'<span class = \''+qmsgswkjsgj_span+'\'>矜忠跨万山</span>',
	qmsgswkjsgj_pot_taishici:'<span class = \''+qmsgswkjsgj_span+'\'>志踏天阶</span>',
	qmsgswkjsgj_re_caopi:'<span class = \''+qmsgswkjsgj_span+'\'>霸业的继承者</span>',
	qmsgswkjsgj_re_shamoke:'<span class = \''+qmsgswkjsgj_span+'\'>五奚蛮夷</span>',
	qmsgswkjsgj_re_peixiu:'<span class = \''+qmsgswkjsgj_span+'\'>晋图开秘</span>',
	qmsgswkjsgj_re_shichangshi:'<span class = \''+qmsgswkjsgj_span+'\'>祸乱纲常</span>',
	qmsgswkjsgj_scs_zhangrang:'<span class = \''+qmsgswkjsgj_span+'\'>祸乱纲常</span>',
	qmsgswkjsgj_scs_zhaozhong:'<span class = \''+qmsgswkjsgj_span+'\'>祸乱纲常</span>',
	qmsgswkjsgj_scs_sunzhang:'<span class = \''+qmsgswkjsgj_span+'\'>祸乱纲常</span>',
	qmsgswkjsgj_scs_bilan:'<span class = \''+qmsgswkjsgj_span+'\'>祸乱纲常</span>',
	qmsgswkjsgj_scs_xiayun:'<span class = \''+qmsgswkjsgj_span+'\'>祸乱纲常</span>',
	qmsgswkjsgj_scs_hankui:'<span class = \''+qmsgswkjsgj_span+'\'>祸乱纲常</span>',
	qmsgswkjsgj_scs_lisong:'<span class = \''+qmsgswkjsgj_span+'\'>祸乱纲常</span>',
	qmsgswkjsgj_scs_duangui:'<span class = \''+qmsgswkjsgj_span+'\'>祸乱纲常</span>',
	qmsgswkjsgj_scs_guosheng:'<span class = \''+qmsgswkjsgj_span+'\'>祸乱纲常</span>',
	qmsgswkjsgj_scs_gaowang:'<span class = \''+qmsgswkjsgj_span+'\'>祸乱纲常</span>',
	qmsgswkjsgj_re_jushou:'<span class = \''+qmsgswkjsgj_span+'\'>监军谋国</span>',
	qmsgswkjsgj_shen_huatuo:'<span class = \''+qmsgswkjsgj_span+'\'>悬壶济世</span>',
	qmsgswkjsgj_pot_yuji:'<span class = \''+qmsgswkjsgj_span+'\'>夙仙望道</span>',
	qmsgswkjsgj_re_caomao:'<span class = \''+qmsgswkjsgj_span+'\'>向死存魏</span>',
	qmsgswkjsgj_mengpo: '<span class = \'' + qmsgswkjsgj_span + '\'>忘川难断</span>',
	qmsgswkjsgj_shen_sunce: '<span class = \'' + qmsgswkjsgj_span + '\'>踞江鬼雄</span>',
	
	qmsgswkjsgj_mb_sunluyu: '<span class = \'' + qmsgswkjsgj_span + '\'>舍身饲虎</span>',
	qmsgswkjsgj_re_mb_zhangzhi: '<span class = \'' + qmsgswkjsgj_span + '\'></span>',
	qmsgswkjsgj_shen_taishici: '<span class = \'' + qmsgswkjsgj_span + '\'>义信天武</span>',
	
	qmsgswkjsgj_re_zhangxuan: '<span class = \'' + qmsgswkjsgj_span + '\'>玉宇嫁蔷</span>',
	qmsgswkjsgj_re_chenshi: '<span class = \'' + qmsgswkjsgj_span + '\'>裨将可期</span>',
	qmsgswkjsgj_re_dc_tengfanglan: '<span class = \'' + qmsgswkjsgj_span + '\'>铃兰零落</span>',
	qmsgswkjsgj_re_zhenghun: '<span class = \'' + qmsgswkjsgj_span + '\'>民安寇灭</span>',
	qmsgswkjsgj_re_re_liuzan: '<span class = \'' + qmsgswkjsgj_span + '\'>啸天亢声</span>',
	qmsgswkjsgj_re_wupu: '<span class = \'' + qmsgswkjsgj_span + '\'>健体养魄</span>',
	qmsgswkjsgj_re_ruanyu: '<span class = \'' + qmsgswkjsgj_span + '\'>清谈高论</span>',
	qmsgswkjsgj_re_dc_duyu: '<span class = \'' + qmsgswkjsgj_span + '\'>文成武德</span>',
	qmsgswkjsgj_re_star_caoren: '<span class = \'' + qmsgswkjsgj_span + '\'>伏波四方</span>',
	qmsgswkjsgj_re_dc_xiahouhui: '<span class = \'' + qmsgswkjsgj_span + '\'>雅有识度</span>',
	qmsgswkjsgj_re_panghong: '<span class = \'' + qmsgswkjsgj_span + '\'>针砭时弊</span>',
	qmsgswkjsgj_re_zhujianping: '<span class = \'' + qmsgswkjsgj_span + '\'>识面知秋</span>',
	qmsgswkjsgj_re_guotiying: '<span class = \'' + qmsgswkjsgj_span + '\'>逆运定势</span>',





	qmsgswkjsgj_shenci_wu_zhugeliang:'<span class = \''+qmsgswkjsgj_shenci_span+'\'>忠武良弼</span>',
	qmsgswkjsgj_shenci_re_duyu:'<span class = \''+qmsgswkjsgj_shenci_span+'\'>文成武德</span>',
	qmsgswkjsgj_shenci_wu_luxun:'<span class = \''+qmsgswkjsgj_shenci_span+'\'>释武怀儒</span>',
	qmsgswkjsgj_shenci_sb_caopi:'<span class = \''+qmsgswkjsgj_shenci_span+'\'>魏文帝</span>',
	qmsgswkjsgj_shenci_re_sunhanhua:'<span class = \''+qmsgswkjsgj_shenci_span+'\'>威灵尽显</span>',
	qmsgswkjsgj_shenci_dc_zhouxuān:'<span class = \''+qmsgswkjsgj_shenci_span+'\'>夜华青乌</span>',
	qmsgswkjsgj_shenci_caomao:'<span class = \''+qmsgswkjsgj_shenci_span+'\'>霸业的终耀</span>',
	qmsgswkjsgj_shenci_pot_yuji:'<span class = \''+qmsgswkjsgj_shenci_span+'\'>夙仙望道</span>',



























	sgsxjxfzmnl_re_xusheng:'<span class="sgsxjxfzmnl">江东的铁壁</span>',
	sgsxjxfzmnl_sb_huangzhong:'<span class="sgsxjxfzmnl">没金铩羽</span>',
	sgsxjxfzmnl_shen_sunce:'<span class="sgsxjxfzmnl">踞江鬼雄</span>',
	sgsxjxfzmnl_sb_xiahoushi:'<span class="sgsxjxfzmnl">燕语呢喃</span>',
	sgsxjxfzmnl_wangyuanji:'<span class="sgsxjxfzmnl">清雅抑华</span>',
	sgsxjxfzmnl_shen_guojia:'<span class="sgsxjxfzmnl">星月奇佐</span>',
	sgsxjxfzmnl_wenyang:'<span class="sgsxjxfzmnl">独骑破军</span>',
	sgsxjxfzmnl_re_jushou:'<span class="sgsxjxfzmnl">监军谋国</span>',
	sgsxjxfzmnl_shen_ganning:'<span class="sgsxjxfzmnl">江表之力牧</span>',
	sgsxjxfzmnl_shichangshi:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_zhangrang:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_zhaozhong:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_sunzhang:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_bilan:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_xiayun:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_hankui:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_lisong:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_duangui:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_guosheng:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_gaowang:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_shichangshi_dead:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_zhangrang_dead:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_zhaozhong_dead:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_sunzhang_dead:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_bilan_dead:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_xiayun_dead:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_hankui_dead:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_lisong_dead:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_duangui_dead:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_guosheng_dead:'<span class="sgsxjxfzmnl">祸乱纲常</span>',
	sgsxjxfzmnl_scs_gaowang_dead:'<span class="sgsxjxfzmnl">祸乱纲常</span>',

	sgsxjxfzmnl_yue_caiwenji:'<span class="sgsxjxfzmnl">胡笳十八拍</span>',
	sgsxjxfzmnl_liuyan:'<span class="sgsxjxfzmnl">裂土之宗</span>',
	sgsxjxfzmnl_shen_xunyu:'<span class="sgsxjxfzmnl">洞心先识</span>',
	sgsxjxfzmnl_shen_zhangfei:'<span class="sgsxjxfzmnl">两界大巡环使</span>',
	sgsxjxfzmnl_wu_zhugeliang:'<span class="sgsxjxfzmnl">忠武良弼</span>',
	sgsxjxfzmnl_sb_caopi:'<span class="sgsxjxfzmnl">魏文帝</span>',
	sgsxjxfzmnl_boss_zhaoyun:'<span class="sgsxjxfzmnl">天龙乘云</span>',
	sgsxjxfzmnl_nanhualaoxian:'<span class="sgsxjxfzmnl">冯虚御风</span>',

	sgsxjxfzmnl_zhangxuan:'<span class="sgsxjxfzmnl">玉宇嫁蔷</span>',
	sgsxjxfzmnl_caojinyu:'<span class="sgsxjxfzmnl">金乡公主</span>',
	sgsxjxfzmnl_shen_machao:'<span class="sgsxjxfzmnl">神威天将军</span>',
	sgsxjxfzmnl_sunhanhua:'<span class="sgsxjxfzmnl">挣绽的青莲</span>',
	sgsxjxfzmnl_xin_guozhao: '<span class="sgsxjxfzmnl">文德皇后</span>',
	sgsxjxfzmnl_sb_guanyu: '<span class="sgsxjxfzmnl">关圣帝君</span>',

	'sgsxjxfzmnl_sb_huanggai': '<span class="sgsxjxfzmnl">轻身为国</span>',
	'sgsxjxfzmnl_dc_zhouxuān': '<span class="sgsxjxfzmnl">夜华青乌</span>',
	'sgsxjxfzmnl_sunlingluan': '<span class="sgsxjxfzmnl">弦凤栖梧</span>',
	'sgsxjxfzmnl_xushao': '<span class="sgsxjxfzmnl">识人读心</span>',
	'sgsxjxfzmnl_sp_huaman': '<span class="sgsxjxfzmnl">数泽清影</span>',
	'sgsxjxfzmnl_quyi': '<span class="sgsxjxfzmnl">名门的骁将</span>',
	'sgsxjxfzmnl_shen_jiangwei': '<span class="sgsxjxfzmnl">怒麟布武</span>',
	'sgsxjxfzmnl_dc_liuye': '<span class="sgsxjxfzmnl">佐世之才</span>',
	'sgsxjxfzmnl_peixiu': '<span class="sgsxjxfzmnl">晋图开秘</span>',
	'sgsxjxfzmnl_wu_luxun': '<span class="sgsxjxfzmnl">释武怀儒</span>', 

	sgsxjxfzmnl_mb_caomao: '<span class="sgsxjxfzmnl">向死存魏</span>',
	sgsxjxfzmnl_puyuan: '<span class="sgsxjxfzmnl">淬炼百兵</span>',
	sgsxjxfzmnl_dc_shen_huatuo: '<span class="sgsxjxfzmnl">灵魂的医者</span>',
	sgsxjxfzmnl_dc_xujing: '<span class="sgsxjxfzmnl">璞玉有瑕</span>',
	sgsxjxfzmnl_shen_zhangjiao: '<span class="sgsxjxfzmnl">末世的起首</span>',
	sgsxjxfzmnl_xizhicai: '<span class="sgsxjxfzmnl">负俗的夭才</span>',
	sgsxjxfzmnl_sb_sp_zhugeliang: '<span class="sgsxjxfzmnl">忠武侯</span>',
	sgsxjxfzmnl_dc_qinghegongzhu: '<span class="sgsxjxfzmnl">大魏长公主</span>',
	sgsxjxfzmnl_bianxi: '<span class="sgsxjxfzmnl">伏龛蛇影</span>',
	sgsxjxfzmnl_shen_sunquan: '<span class="sgsxjxfzmnl">坐断东南</span>',
	sgsxjxfzmnl_panshu: '<span class="sgsxjxfzmnl">江东神女</span>',
	sgsxjxfzmnl_haozhao: '<span class="sgsxjxfzmnl">扣弦的豪将</span>',
	sgsxjxfzmnl_fuqian: '<span class="sgsxjxfzmnl">危汉绝勇</span>',
	sgsxjxfzmnl_sb_caoren: '<span class="sgsxjxfzmnl">固若金汤</span>',
	sgsxjxfzmnl_yue_miheng: '<span class="sgsxjxfzmnl">鹗立鸷群</span>',
	sgsxjxfzmnl_zhujianping: '<span class="sgsxjxfzmnl">识面知秋</span>',
	sgsxjxfzmnl_shen_huangzhong: '<span class="sgsxjxfzmnl">战意破苍穹</span>',
	sgsxjxfzmnl_dc_tengfanglan: '<span class="sgsxjxfzmnl">铃兰零落</span>',
	sgsxjxfzmnl_sb_diaochan: '<span class="sgsxjxfzmnl">离间计</span>',
	sgsxjxfzmnl_re_zuoci: '<span class="sgsxjxfzmnl">羽化飞升</span>',
	sgsxjxfzmnl_chengui: '<span class="sgsxjxfzmnl">弄虎如婴</span>',
	sgsxjxfzmnl_dc_sunru: '<span class="sgsxjxfzmnl">呦呦鹿鸣</span>',
	sgsxjxfzmnl_yue_xiaoqiao: '<span class="sgsxjxfzmnl">绿绮嫒媛</span>',
	sgsxjxfzmnl_dc_sb_simayi: '<span class="sgsxjxfzmnl">韬谋韫势</span>',
	sgsxjxfzmnl_mb_zhangfen: '<span class="sgsxjxfzmnl">究械菁杰</span>',
	sgsxjxfzmnl_liuzan: '<span class="sgsxjxfzmnl">啸天亢声</span>',
	sgsxjxfzmnl_xurong: '<span class="sgsxjxfzmnl">玄菟战魔</span>',
	sgsxjxfzmnl_dc_sb_huanggai: '<span class="sgsxjxfzmnl">毁身纾难</span>',
	sgsxjxfzmnl_yuanyin: '<span class="sgsxjxfzmnl">载路素车</span>',
	sgsxjxfzmnl_v_zhangliao: '<span class="sgsxjxfzmnl">威锐镇西风</span>',
	sgsxjxfzmnl_ol_nanhualaoxian: '<span class="sgsxjxfzmnl">逍遥仙游</span>',
	sgsxjxfzmnl_dc_sb_zhouyu: '<span class="sgsxjxfzmnl">炽谋英隽</span>',
	sgsxjxfzmnl_dc_simashi: '<span class="sgsxjxfzmnl">唯几成务</span>',
	sgsxjxfzmnl_xuelingyun: '<span class="sgsxjxfzmnl">霓裳缀红泪</span>',
	sgsxjxfzmnl_yangbiao: '<span class="sgsxjxfzmnl">德彰海内</span>',
	sgsxjxfzmnl_simazhao: '<span class="sgsxjxfzmnl">堕节肇业</span>',
	sgsxjxfzmnl_caoying: '<span class="sgsxjxfzmnl">龙城凤鸣</span>',








	sgsxjxfzmnl_mo_diaochan:'<span class="sgsxjxfzmnl">乱世的舞姬</span>',
	sgsxjxfzmnl_mo_lvbu:'<span class="sgsxjxfzmnl">武的化身</span>',
	sgsxjxfzmnl_mo_caopi: '<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_mo_guanyu: '<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_mo_re_diaochan: '<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_mo_zhangfei: '<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_mo_jiaxu: '<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_mo_guosi: '<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_mo_zhangji: '<span class="sgsxjxfzmnl"></span>',























	zzrsqlkjygzz_shen_guanyu:'<font color=cyan></font>',
	zzrsqlkjygzz_shen_zhangjiao:'<font color=cyan></font>',
	zzrsqlkjygzz_shen_sunce:'<font color=cyan></font>',
	zzrsqlkjygzz_re_zuoci:'<font color=cyan></font>',
	zzrsqlkjygzz_yi_caocao:'<font color=cyan></font>',
	zzrsqlkjygzz_yi_guanyu:'<font color=cyan></font>',
	zzrsqlkjygzz_yi_zhangjiao:'<font color=cyan></font>',
	zzrsqlkjygzz_yi2_zhangjiao:'<font color=cyan></font>',
	zzrsqlkjygzz_yi3_zhangjiao:'<font color=cyan></font>',
	zzrsqlkjygzz_yi_luxun:'<font color=cyan></font>',
	zzrsqlkjygzz_yi_sunce:'<font color=cyan></font>',
	zzrsqlkjygzz_yao_zhoutai:'<font color=cyan></font>',
	
	//---------------------------------//名将改写
	// 'ybsl_zhouyuxiaoqiao':'详见本体龙凤。',//周瑜小乔
	//---------------------------------//忆包武将
		
	/*快捷复制：
	<span class=yellowtext>文字</span>暗亮双色
	<span class=thundertext>文字</span>
	<span class=thundertext></span>
	<font color=cyan>文字</font>自带单色
	<span style=\'color:#00c4ff\'>文字</span>自写颜色
	<br/>换行
	<li>点
	<span style="opacity:0.5;"></span>字体变淡
	<span style="font-family: yuanli">东吴命运线</span>
	<span style="text-decoration: line-through;">杀</span>字体划掉
	黑桃♠︎️ 红桃♥︎️ 梅花♣︎️ 方块♦︎ 虚无◈ 日○ 月☽ 星☆ 山△ 禁※
	空桃♤ 空心♡ 空梅♧ 空钻♢ 空无◎
	花❀ 毒❈ 衡❃ 雪❁ 血ღ 实日☀ 漆星★ 暗花✿ 细雪❅❉ 天牢§ 
	骰子 一⚀ 二⚁ 三⚂ 四⚃ 五⚄ 六⚅
	男♂ 女♀
	白羊♈ 金牛♉ 双子♊ 巨蟹♋ 双鱼♓ 狮子♌ 天秤♎ 射手♐ 摩羯♑ 室女♏ 水瓶♒ 天蝎♍
	八卦乾☰ 坤☷ 震☳ 巽☴ 坎☵ 离☲ 艮☶ 兑☱
	☣
	//花	<br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：暂无<br>❀配音：暂无
	//毒	<br>❈技能设计：夜白<br>❈代码撰写者：夜白<br>❈插图：暂无<br>❈配音：暂无
	//衡	<br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：暂无<br>❃配音：暂无
	//雪	<br>❁技能设计：夜白<br>❁代码撰写者：夜白<br>❁插图：暂无<br>❁配音：暂无
	//星	<br>☆技能设计：夜白<br>☆代码撰写者：夜白<br>☆插图：暂无<br>☆配音：暂无
	//漆星  <br>★技能设计：夜白<br>★代码撰写者：夜白<br>★插图：暂无<br>★配音：暂无
	//暗花  <br>✿技能设计：夜白<br>✿代码撰写者：夜白<br>✿插图：暂无<br>✿配音：暂无
	//黑桃  <br>♠︎️技能设计：夜白<br>♠︎️代码撰写者：夜白<br>♠︎️插图：暂无<br>♠︎️配音：暂无
	//红桃  <br>♥︎️技能设计：夜白<br>♥︎️代码撰写者：夜白<br>♥︎️插图：暂无<br>♥︎️配音：暂无
	//梅花  <br>♣︎️技能设计：夜白<br>♣︎️代码撰写者：夜白<br>♣︎️插图：暂无<br>♣︎️配音：暂无
	//方块  <br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：暂无<br>♦︎配音：暂无
	//虚无  <br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无
	//空无  <br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无
	//细雪  <br>❅技能设计：夜白<br>❅代码撰写者：夜白<br>❅插图：暂无<br>❅配音：暂无
	*/
}