import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { characterCopyright }

const characterCopyright = {
	//---------------------------------//上古神话
	// 'sgsh_huaxu':'<font color=cyan>上古神话-001</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//华胥
	// 'sgsh_taizichangqin':'<font color=cyan>上古神话-002</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//太子长琴
	// 'sgsh_nvba':'<font color=cyan>上古神话-003</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//女魃
	// 'sgsh_luohou':'<font color=cyan>上古神话-004</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//罗睺
	// 'sgsh_dongwanggong':'<font color=cyan>上古神话-005</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//东王公
	// 'sgsh_yinglong':'<font color=cyan>上古神话-006</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//应龙
	// 'sgsh_xingtian':'<font color=cyan>上古神话-007</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//刑天
	// 'sgsh_xiwangmu':'<font color=cyan>上古神话-008</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//西王母
	// 'sgsh_yuqiang':'<font color=cyan>上古神话-009</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//禺强
	// 'sgsh_dayu':'<font color=cyan>上古神话-010</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//大禹
		
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