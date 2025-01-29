import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { characterCopyright }

const characterCopyright = {
		
	ybmjz_caocao:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_simayi:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_xiahoudun:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_zhangliao:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_xuzhu:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_guojia:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_zhenji:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 

	ybmjz_liubei:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_guanyu:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_zhangfei:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_zhugeliang:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_zhaoyun:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_machao:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_huangyueying:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 

	ybmjz_sunquan:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_ganning:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_lvmeng:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_huanggai:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_zhouyu:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_daqiao:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_luxun:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_sunshangxiang:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 

	ybmjz_huatuo:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_lvbu:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 
	ybmjz_diaochan:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方', 

	ybmjz_zhangqiying:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',//张琪瑛
	ybmjz_shen_zhugeliang:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',//诸葛亮
	ybmjz_hina:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：无名杀本体<br>❃配音：无名杀本体（若有）',//佐藤雏
	ybmjz_kotori:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：无名杀本体<br>❃配音：无名杀本体（若有）',//神户小鸟
	ybmjz_kagari:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：无名杀本体<br>❃配音：无名杀本体（若有）',//篝
	ybmjz_majun:'<font color=cyan>夜白名将传-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：三国杀官方<br>❃配音：三国杀官方',//马钧
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