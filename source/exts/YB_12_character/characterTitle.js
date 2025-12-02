import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { characterTitle }

const characterTitle = {//称号
    
	sgskjdbzjms_mo_zhoutai:'<font color=cyan>坚毅的铁躯</font>',
	sgskjdbzjms_shen_zhugeliang:'<font color=cyan></font>',
	sgskjdbzjms_leizhenzi:'<font color=cyan></font>',
	sgskjdbzjms_xian_zhugeguo:'<font color=cyan></font>',
	sgskjdbzjms_zhen_zhangfei:'<font color=cyan></font>',
	sgskjdbzjms_zhen_guanyu:'<font color=cyan></font>',
	sgskjdbzjms_shen_liubei:'<font color=cyan></font>',
	sgskjdbzjms_zhen_machao:'<font color=cyan></font>',
	sgskjdbzjms_zhen_liubei:'<font color=cyan></font>',


	qmsgswkjsgj_re_xizhicai:'<font color=cyan></font>',
	qmsgswkjsgj_re_liuxie:'<font color=cyan></font>',
	qmsgswkjsgj_shen_zhaoyun:'<font color=cyan></font>',
	qmsgswkjsgj_gui_xuyou:'<font color=cyan></font>',
	qmsgswkjsgj_gui_zhaoyun:'<font color=cyan></font>',
	qmsgswkjsgj_gui_sunquan:'<font color=cyan></font>',
	qmsgswkjsgj_shen_guojia:'<font color=cyan></font>',
	qmsgswkjsgj_re_sp_duyu:'<font color=cyan></font>',
	qmsgswkjsgj_gui_liubei:'<font color=cyan></font>',
	qmsgswkjsgj_shen_zhugeliang:'<font color=cyan></font>',
	qmsgswkjsgj_gui_re_zhouyu:'<font color=cyan></font>',
	qmsgswkjsgj_sb_huangzhong:'<font color=cyan></font>',
	qmsgswkjsgj_re_yangbiao:'<font color=cyan></font>',
	qmsgswkjsgj_re_luotong:'<font color=cyan></font>',
	qmsgswkjsgj_re_liuyan:'<font color=cyan></font>',
	qmsgswkjsgj_re_lusu:'<font color=cyan></font>',
	qmsgswkjsgj_re_caorui:'<font color=cyan></font>',
	qmsgswkjsgj_re_caiwenji:'<font color=cyan></font>',
	qmsgswkjsgj_re_zhangxiu:'<font color=cyan></font>',
	qmsgswkjsgj_re_fuhuanghou:'<font color=cyan></font>',
	qmsgswkjsgj_shen_ganning:'<font color=cyan></font>',
	qmsgswkjsgj_re_sunhanhua:'<font color=cyan></font>',
	qmsgswkjsgj_shen_lusu:'<font color=cyan></font>',
	qmsgswkjsgj_re_sunquan:'<font color=cyan></font>',
	qmsgswkjsgj_shen_zhouyu:'<font color=cyan></font>',
	qmsgswkjsgj_shen_xunyu:'<font color=cyan></font>',
	qmsgswkjsgj_mb_luyusheng:'<font color=cyan></font>',
	qmsgswkjsgj_shen_luxun:'<font color=cyan></font>',
	qmsgswkjsgj_shen_caocao:'<font color=cyan></font>',
	qmsgswkjsgj_shen_lvbu:'<font color=cyan></font>',
	qmsgswkjsgj_pot_weiyan:'<font color=cyan></font>',
	qmsgswkjsgj_pot_taishici:'<font color=cyan></font>',
	qmsgswkjsgj_re_caopi:'<font color=cyan></font>',
	qmsgswkjsgj_re_shamoke:'<font color=cyan></font>',
	qmsgswkjsgj_re_peixiu:'<font color=cyan></font>',
	qmsgswkjsgj_re_shichangshi:'<font color=cyan></font>',
	qmsgswkjsgj_scs_zhangrang:'<font color=cyan></font>',
	qmsgswkjsgj_scs_zhaozhong:'<font color=cyan></font>',
	qmsgswkjsgj_scs_sunzhang:'<font color=cyan></font>',
	qmsgswkjsgj_scs_bilan:'<font color=cyan></font>',
	qmsgswkjsgj_scs_xiayun:'<font color=cyan></font>',
	qmsgswkjsgj_scs_hankui:'<font color=cyan></font>',
	qmsgswkjsgj_scs_lisong:'<font color=cyan></font>',
	qmsgswkjsgj_scs_duangui:'<font color=cyan></font>',
	qmsgswkjsgj_scs_guosheng:'<font color=cyan></font>',
	qmsgswkjsgj_scs_gaowang:'<font color=cyan></font>',
	qmsgswkjsgj_re_jushou:'<font color=cyan></font>',
	qmsgswkjsgj_shen_huatuo:'<font color=cyan></font>',
	qmsgswkjsgj_pot_yuji:'<font color=cyan></font>',

	qmsgswkjsgj_shenci_wu_zhugeliang:'<font color=yellow></font>',
	qmsgswkjsgj_shenci_re_duyu:'<font color=yellow></font>',
	qmsgswkjsgj_shenci_wu_luxun:'<font color=yellow></font>',
	qmsgswkjsgj_shenci_sb_caopi:'<font color=yellow></font>',
	qmsgswkjsgj_shenci_re_sunhanhua:'<font color=yellow></font>',
	qmsgswkjsgj_shenci_dc_zhouxuān:'<font color=yellow></font>',




























	sgsxjxfzmnl_re_xusheng:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_sb_huangzhong:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_shen_sunce:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_sb_xiahoushi:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_mo_diaochan:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_wangyuanji:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_shen_guojia:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_wenyang:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_re_jushou:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_shen_ganning:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_shichangshi:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_zhangrang:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_zhaozhong:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_sunzhang:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_bilan:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_xiayun:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_hankui:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_lisong:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_duangui:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_guosheng:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_gaowang:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_shichangshi_dead:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_zhangrang_dead:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_zhaozhong_dead:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_sunzhang_dead:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_bilan_dead:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_xiayun_dead:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_hankui_dead:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_lisong_dead:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_duangui_dead:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_guosheng_dead:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_scs_gaowang_dead:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_yue_caiwenji:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_liuyan:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_shen_xunyu:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_shen_zhangfei:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_wu_zhugeliang:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_sb_caopi:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_boss_zhaoyun:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_nanhualaoxian:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_mo_lvbu:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_zhangxuan:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_caojinyu:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_shen_machao:'<span class="sgsxjxfzmnl"></span>',
	sgsxjxfzmnl_sunhanhua:'<span class="sgsxjxfzmnl"></span>',
























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