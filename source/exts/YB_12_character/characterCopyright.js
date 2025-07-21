import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { characterCopyright }

const characterCopyright = {
		
	// ybmjz_caocao:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 



	sgskjdbzjms_mo_zhoutai:'<font color=cyan>三国杀，开具大宝直接秒杀（番茄小说）</font><br>❃技能设计：小糊涂笨蛋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgskjdbzjms_shen_zhugeliang:'<font color=cyan>三国杀，开具大宝直接秒杀（番茄小说）</font><br>❃技能设计：小糊涂笨蛋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgskjdbzjms_leizhenzi:'<font color=cyan>三国杀，开具大宝直接秒杀（番茄小说）</font><br>❃技能设计：小糊涂笨蛋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgskjdbzjms_xian_zhugeguo:'<font color=cyan>三国杀，开具大宝直接秒杀（番茄小说）</font><br>❃技能设计：小糊涂笨蛋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgskjdbzjms_zhen_zhangfei:'<font color=cyan>三国杀，开具大宝直接秒杀（番茄小说）</font><br>❃技能设计：小糊涂笨蛋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgskjdbzjms_zhen_guanyu:'<font color=cyan>三国杀，开具大宝直接秒杀（番茄小说）</font><br>❃技能设计：小糊涂笨蛋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgskjdbzjms_shen_liubei:'<font color=cyan>三国杀，开具大宝直接秒杀（番茄小说）</font><br>❃技能设计：小糊涂笨蛋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgskjdbzjms_zhen_machao:'<font color=cyan>三国杀，开具大宝直接秒杀（番茄小说）</font><br>❃技能设计：小糊涂笨蛋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgskjdbzjms_zhen_liubei:'<font color=cyan>三国杀，开具大宝直接秒杀（番茄小说）</font><br>❃技能设计：小糊涂笨蛋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',


	qmsgswkjsgj_re_xizhicai:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_re_liuxie:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_shen_zhaoyun:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_gui_xuyou:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_gui_zhaoyun:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_gui_sunquan:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_shen_guojia:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_re_sp_duyu:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_gui_liubei:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_shen_zhugeliang:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_gui_re_zhouyu:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_sb_huangzhong:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_re_yangbiao:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_re_luotong:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_re_liuyan:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_re_lusu:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_re_caorui:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	qmsgswkjsgj_re_caiwenji:'<font color=cyan>全民三国杀，我开局神郭嘉（番茄小说）</font><br>❃技能设计：天一笙水<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',





















	sgsxjxfzmnl_re_xusheng:'<font color=cyan>三国杀，仙界下凡怎么你了（番茄小说）</font><br>❃技能设计：作家时霜<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgsxjxfzmnl_sb_huangzhong:'<font color=cyan>三国杀，仙界下凡怎么你了（番茄小说）</font><br>❃技能设计：作家时霜<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgsxjxfzmnl_shen_sunce:'<font color=cyan>三国杀，仙界下凡怎么你了（番茄小说）</font><br>❃技能设计：作家时霜<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgsxjxfzmnl_sb_xiahoushi:'<font color=cyan>三国杀，仙界下凡怎么你了（番茄小说）</font><br>❃技能设计：作家时霜<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgsxjxfzmnl_mo_diaochan:'<font color=cyan>三国杀，仙界下凡怎么你了（番茄小说）</font><br>❃技能设计：作家时霜<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgsxjxfzmnl_wangyuanji:'<font color=cyan>三国杀，仙界下凡怎么你了（番茄小说）</font><br>❃技能设计：作家时霜<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgsxjxfzmnl_shen_guojia:'<font color=cyan>三国杀，仙界下凡怎么你了（番茄小说）</font><br>❃技能设计：作家时霜<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgsxjxfzmnl_wenyang:'<font color=cyan>三国杀，仙界下凡怎么你了（番茄小说）</font><br>❃技能设计：作家时霜<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgsxjxfzmnl_re_jushou:'<font color=cyan>三国杀，仙界下凡怎么你了（番茄小说）</font><br>❃技能设计：作家时霜<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	sgsxjxfzmnl_shen_ganning:'<font color=cyan>三国杀，仙界下凡怎么你了（番茄小说）</font><br>❃技能设计：作家时霜<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',


	zzrsqlkjygzz_shen_guanyu:'<font color=cyan>蒸蒸日上，全力氪金，言贵者斩（番茄小说）</font><br>❃技能设计：浅埋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	zzrsqlkjygzz_shen_zhangjiao:'<font color=cyan>蒸蒸日上，全力氪金，言贵者斩（番茄小说）</font><br>❃技能设计：浅埋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	zzrsqlkjygzz_shen_sunce:'<font color=cyan>蒸蒸日上，全力氪金，言贵者斩（番茄小说）</font><br>❃技能设计：浅埋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	zzrsqlkjygzz_re_zuoci:'<font color=cyan>蒸蒸日上，全力氪金，言贵者斩（番茄小说）</font><br>❃技能设计：浅埋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	zzrsqlkjygzz_yi_caocao:'<font color=cyan>蒸蒸日上，全力氪金，言贵者斩（番茄小说）</font><br>❃技能设计：浅埋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	zzrsqlkjygzz_yi_guanyu:'<font color=cyan>蒸蒸日上，全力氪金，言贵者斩（番茄小说）</font><br>❃技能设计：浅埋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	zzrsqlkjygzz_yi_zhangjiao:'<font color=cyan>蒸蒸日上，全力氪金，言贵者斩（番茄小说）</font><br>❃技能设计：浅埋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	zzrsqlkjygzz_yi2_zhangjiao:'<font color=cyan>蒸蒸日上，全力氪金，言贵者斩（番茄小说）</font><br>❃技能设计：浅埋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	zzrsqlkjygzz_yi3_zhangjiao:'<font color=cyan>蒸蒸日上，全力氪金，言贵者斩（番茄小说）</font><br>❃技能设计：浅埋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	zzrsqlkjygzz_yi_luxun:'<font color=cyan>蒸蒸日上，全力氪金，言贵者斩（番茄小说）</font><br>❃技能设计：浅埋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	zzrsqlkjygzz_yi_sunce:'<font color=cyan>蒸蒸日上，全力氪金，言贵者斩（番茄小说）</font><br>❃技能设计：浅埋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	zzrsqlkjygzz_yao_zhoutai:'<font color=cyan>蒸蒸日上，全力氪金，言贵者斩（番茄小说）</font><br>❃技能设计：浅埋<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',
	
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