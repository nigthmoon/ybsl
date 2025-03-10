import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { characterCopyright }

const characterCopyright = {
		
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
	// c:\Users\ADMINI~1\AppData\Local\Temp\SGPicFaceTpBq\8752\0091320B.png \␀ 好玩滴
	'ybsl_001sunlisong':'<font color=cyan>忆-001·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_002chenailin':'<font color=cyan>忆-002·凄愁哀婉</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_003yanshuang':'<font color=cyan>忆-003·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_004zhangyujie':'<font color=cyan>忆-004·似水流年</font><br>❁技能设计：夜白<br>❁代码撰写者：夜白<br>❁插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❁配音：暂无',
	'ybsl_005wangruobing':'<font color=cyan>忆-005·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_006wanghanzhen':'<font color=cyan>忆-006·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_007wugege':'<font color=cyan>忆-007·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>❀配音：暂无',
	'ybsl_008wuyuxin':'<font color=cyan>忆-008·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_009liyushan':'<font color=cyan>忆-009·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_010zhouyue':'<font color=cyan>忆-010·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>❀配音：暂无',
	'ybsl_011gaoyuhang':'<font color=cyan>忆-011·似水流年</font><br>❈技能设计：夜白<br>❈代码撰写者：夜白<br>❈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❈配音：暂无',
	'ybsl_012zhengjiayi':'<font color=cyan>忆-012·似水流年</font><br>❈技能设计：夜白<br>❈代码撰写者：夜白<br>❈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❈配音：暂无',
	'ybsl_013yinji':'<font color=cyan>忆-013·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_014liutianyu':'<font color=cyan>忆-014·似水流年</font><br>✿技能设计：夜白<br>✿代码撰写者：夜白<br>✿插图：暂无<br>✿配音：暂无<br/>故事仍在继续书写。',
	'ybsl_014ether':'<font color=cyan>忆-014·缘尽梦碎</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无<br/>待填写。',
	'ybsl_015wanghairu':'<font color=cyan>忆-015·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_016manchengqi':'<font color=cyan>忆-016·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_017xiaohong':'<font color=cyan>忆-017·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：涂山小红本尊',
	
	'ybsl_018zhangqing':'<font color=cyan>忆-018·晓月照怀</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_019shengyan':'<font color=cyan>忆-019·醋心少女</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_020jiayutong':'<font color=cyan>忆-020·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_021liuyufeng':'<font color=cyan>忆-021·似水流年</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：暂无<br>❃配音：暂无<br/>还望先生教我~',
	'ybsl_022salt':'<font color=cyan>忆-022·暂无称号</font><br>❈技能设计：夜白<br>❈代码撰写者：夜白<br>❈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❈配音：暂无',
	// 'ybsl_025shiqingyu':'<font color=cyan>忆-023·心灵守望</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◎配音：暂无',
	'ybsl_024yuetong':'<font color=cyan>忆-024·糖心少女</font><br>❁技能设计：夜白<br>❁代码撰写者：夜白<br>❁插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❁配音：暂无',
	'ybsl_025shiwang':'<font color=cyan>忆-025·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无<br/><span class=thundertext>王贺，高中朋友，史庆宇闺蜜。关系较好。</span>',
	'ybsl_025shiqingyu':'<font color=cyan>忆-025·心灵守望</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>分享的图片<br>◎配音：暂无',
	'ybsl_025wanghe':'<font color=cyan>忆-025·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◎配音：暂无',
	'ybsl_026can':'<font color=cyan>忆-026·巡梦回音</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无',
	'ybsl_027rain':'<font color=cyan>忆-027·巡梦鸣觉</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无',
	'ybsl_028crystal':'<font color=cyan>忆-028·巡梦回响</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无',
	'ybsl_029dawn':'<font color=cyan>忆-029·巡梦长息</font<br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无。',
	'ybsl_030book':'<font color=cyan>忆-030·巡梦道演</font><br>★技能设计：夜白<br>★代码撰写者：夜白<br>★插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>★配音：暂无',
	'ybsl_018huanqing':'<font color=cyan>忆-018·巡梦魅影</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>◈配音：暂无',
	'ybsl_032baiyichen':'<font color=cyan>忆-032·旅者</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_033xiaohui':'<font color=cyan>忆-033·断肠人在天涯</font><br>❅技能设计：夜白<br>❅代码撰写者：夜白<br>❅插图：QQ小世界AI绘图<br>❅配音：暂无',
	'ybsl_034zhoulianyuan':'<font color=cyan>忆-034·庄子的执剑人</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无',
	'ybsl_035stamp':'<font color=cyan>忆-035·龙裔象征</font><br>★技能设计：夜白<br>★代码撰写者：夜白<br>★插图：暂无<br>★配音：暂无',
	'ybsl_036bright':'<font color=cyan>忆-036·魔王的跑酷</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无',
	'ybsl_037diamondqueen':'<font color=cyan>忆-037·深海的通灵龟</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>成品图片<br>◈配音：暂无',
	'db_ybsl_038tengwu':'<font color=cyan>忆-038·缘尽梦碎</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>成品图片<br>◈配音：暂无',
	'ybsl_038bianqiuwen':'<font color=cyan>忆-038·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：灵境AI绘图<br>❀配音：暂无',
	'ybsl_039zhafu':'<font color=cyan>忆-039·制符新生</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无',
	
	'ybsl_041mmuqin':'<font color=cyan>忆-041·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_042pingzi':'<font color=cyan>忆-042·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_043fangjiayu':'<font color=cyan>忆-043·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_044huruihang':'<font color=cyan>忆-044·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_045gaocong':'<font color=cyan>忆-045·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_046jiangxuewu':'<font color=cyan>忆-046·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_047shan':'<font color=cyan>忆-047·游魂惊梦</font><br>❅技能设计：夜白<br>❅代码撰写者：夜白<br>❅插图：灵境AI绘图<br>❅配音：暂无',
	'ybsl_047zhangmi':'<font color=cyan>忆-047·痴惘之妒魂</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：灵境AI绘图<br>◈配音：暂无',
	
	'ybsl_048wushuang':'<font color=cyan>忆-048·似水流年</font><br>❁技能设计：夜白<br>❁代码撰写者：夜白<br>❁插图：派蒙AI绘图<br>❁配音：暂无',
	'ybsl_049waner':'<font color=cyan>忆-049·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◎配音：暂无',
	'ybsl_050zunjian':'<font color=cyan>忆-050·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◎配音：暂无',
	'ybsl_051fomalhaut':'<font color=cyan>忆-051·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无',
	'ybsl_052trees':'<font color=cyan>忆-052·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无',
	'ybsl_053qiuer':'<font color=cyan>忆-053·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>❀配音：暂无',
	'ybsl_054yueer':'<font color=cyan>忆-054·共轭之恋</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：派蒙AI绘图<br>❀配音：暂无',
	'ybsl_055zhengyan':'<font color=cyan>忆-055·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：AI绘画精灵AI绘图<br>◎配音：暂无',
	'ybsl_056dongjianchao':'<font color=cyan>忆-056·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无',
	'ybsl_057sunmeiqi':'<font color=cyan>忆-057·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无',
	'ybsl_058sunshibo':'<font color=cyan>忆-058·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无',
	'ybsl_059starsFall':'<font color=cyan>忆-059·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：暂无<br>❀配音：暂无',
	'ybsl_059starsFall1':'<font color=cyan>忆-059★·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',//'鞠熒',//本名忘了
	'ybsl_059starsFall2':'<font color=cyan>忆-059★·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',//'宋橤',//本名保密橤渁
	'ybsl_059starsFall3':'<font color=cyan>忆-059★·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',//'周靈',//本名保密
	'ybsl_059starsFall4':'<font color=cyan>忆-059★·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',//'李曉',//本名保密
	'ybsl_060liutianhang':'<font color=cyan>忆-060·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsl_061zheyu':'<font color=cyan>忆-061·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无',
	'ybsl_062yuhongyan':'<font color=cyan>忆-062·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无',
	'ybsl_063weimingli':'<font color=cyan>忆-063·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无',
	'ybsl_064lvmingyan':'<font color=cyan>忆-064·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无',
	'ybsl_065yanxiwen':'<font color=cyan>忆-065·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无',
	'ybsl_066wujun':'<font color=cyan>忆-066·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◎配音：暂无',
	'db_ybsl_067snake':'<font color=cyan>忆-067·旧梦循蹈</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白，潜水的火（缠情）<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无',
	'ybsl_068qingyue':'<font color=cyan>忆-068·似水流年</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无',
	'ybsl_069xiangzi':'<font color=cyan>忆-069·似水流年</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无',
	'ybsl_070lvyanqiu':'<font color=cyan>忆-070·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	
	
	
	
	'ybsl_075dogcard':'<font color=cyan>忆-075·再充十万</font><br>※技能设计：夜白<br>※代码撰写者：夜白<br>※插图：不知来源<br>※配音：暂无<br/>再充十万，你会更强。',
	'ybsl_076zhujun':'<font color=cyan>忆-076·似水流年</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>◈配音：暂无',
	'ybsl_077yangqixu':'<font color=cyan>忆-077·似水流年</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无<br/>待填写。',
	'ybsl_078zhuyahai':'<font color=cyan>忆-078·似水流年</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无<br/>待填写。',
	'ybsl_079xiaoxin':'<font color=cyan>忆-079·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◎配音：暂无',
	'ybsl_080phoenix':'<font color=cyan>忆-080·凤鸣九天</font><br>★技能设计：夜白<br>★代码撰写者：夜白<br>★插图：暂无<br>★配音：暂无<br/>待填写。',
	'ybsl_081chenli':'<font color=cyan>忆-081·巡梦迷失者</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无',
	'ybsl_081chensi':'<font color=cyan>忆-081·巡梦迷失者</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无',
	
	'ybsl_083xiaozhu':'<font color=cyan>忆-083·巡梦天合</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：灵境AI绘图<br>◈配音：暂无',
	//047 张汨原位置，新角色待定
	'ybsl_085DGY':'<font color=cyan>忆-085·雨漫孤城</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<',
	'ybsl_086GJ':'<font color=cyan>忆-086·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	// 'ybsl_087tianlu':['female','YB_memory',3,[],['epic']],//田璐
	// 'ybsl_088lijiaxin':['female','YB_memory',3,[],['epic']],//李嘉欣
	// 'ybsl_089lvjinling':['female','YB_memory',3,[],['epic']],//吕金玲
	// 'ybsl_090dengtingyue':['female','YB_memory',3,[],['epic']],//邓婷月
	// 'ybsl_086GJ':['female','YB_memory',3,[],['epic']],//王彩钰
	'ybsl_092handan':'<font color=cyan>忆-092·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
	// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
	// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
	// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
	// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
	// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
	// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
	'ybsl_107tushanshuili': '<font color=cyan>忆-107·巡梦归途</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白，潜水的火（踏野，妖异）<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	ybsl_121tujing:'<font color=cyan>忆-121·天妒娇女</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	//---------------------------------//忆包SP
	'db_ybsp_014liutianyu':'<font color=cyan>忆☆SP-001·暗流涌动</font><br>✿技能设计：夜白<br>✿代码撰写者：夜白<br>✿插图：QQ小世界AI绘图<br>✿配音：暂无',
	'ybsp_016manchengqi':'<font color=cyan>忆☆SP-002·清明节限定</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'db_ybsp_038tengwu':'<font color=cyan>忆☆SP-004·缘尽梦碎</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无',
	'ybsp_072sulingyi':'<font color=cyan>忆-072·不祥的命运</font><br>★技能设计：夜白<br>★代码撰写者：夜白<br>★插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>★配音：暂无',
	'ybsp_002chenailin':'<font color=cyan>忆☆SP-003·玉殒香消</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白，潜水的火（香陨）<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>❀配音：暂无',
	'ybsp_027rain':'<font color=cyan>忆☆SP-006·巡梦鸣觉</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>◈配音：暂无',
	'ybsp_001sunlisong':'<font color=cyan>忆☆SP-005·皓腕凝霜雪</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	
	//---------------------------------//界限突破（什么沙比玩意）
	'ybnb_034zhoulianyuan':'<font color=cyan>忆☆界-034·庄子的执剑人</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无',
	
	//---------------------------六艺篇
	'ybart_013yinji':'<font color=cyan>忆-013·似水流年</font>✿<span class=yellowtext>六艺篇</span><br>✿技能设计：夜白<br>✿代码撰写者：夜白<br>✿插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>✿配音：暂无',
	'ybart_014liutianyu':'<font color=cyan>忆-014·似水流年</font>❀<span class=yellowtext>六艺篇</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：暂无<br>❀配音：暂无',
	'ybart_016manchengqi':'<font color=cyan>忆-016·似水流年</font>❀<span class=yellowtext>六艺篇</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybart_017xiaohong':'<font color=cyan>忆-017·似水流年</font>❀<span class=yellowtext>六艺篇</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：涂山小红本尊',
	'ybart_041mmuqin':'<font color=cyan>忆-041·似水流年</font>❀<span class=yellowtext>六艺篇</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	//---------------------------------//忆包鬼神易
	'dzsl_013yinji':'<font color=cyan>忆-013·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：鬼神易￥<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'dzsl_014liutianyu':'<font color=cyan>忆-014·梦的缔造者</font><br>✿技能设计：夜白<br>✿代码撰写者：鬼神易￥<br>✿插图：暂无<br>✿配音：暂无',
	'dzsl_014xinzhikui':'<font color=cyan>忆-014☆·绝对忠臣</font><br>✿技能设计：夜白<br>✿代码撰写者：鬼神易￥<br>✿插图：暂无<br>✿配音：暂无。',
	'dzsl_015wanghairu':'<font color=cyan>忆-015·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：鬼神易￥<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'dzsl_016manchengqi':'<font color=cyan>忆-016·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：鬼神易￥<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'dzsl_017xiaohong':'<font color=cyan>忆-017·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：鬼神易￥<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：涂山小红本尊',
	//---------------------------------//忆包神将
	'ybslshen_014liutianyu':'<span class=yellowtext>神☆忆-001·天涯的窥梦人</span><br>✿技能设计：夜白<br>✿代码撰写者：夜白<br>✿插图：暂无<br>✿配音：神姜维',
	'ybslshen_017xiaohong':'<span class=yellowtext>神☆忆-002·儿童节限定</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybslshen_018zhangqing':'<span class=yellowtext>神☆忆-003·清明节限定</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybslshen_002chenailin':'<span class=yellowtext>神☆忆-004·初见与告别</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybslshen_071faraway':'<span class=yellowtext>神☆忆-005·银河启示者</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：派蒙AI绘图<br>❀配音：想去远方本尊<br/><span class=yellowtext>I want to go far away!</span>',
	'ybslshen_073Al':'<span class=yellowtext>神☆忆-006·天牢令</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：QQ小世界AI绘图<br>❀配音：暂无',
	'ybslshen_074piao':'<span class=yellowtext>神☆忆-007·掌中寰宇</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：花落隨風钦定网图<br>❀配音：暂无',
	'ybslshen_001sunlisong':'<span class=yellowtext>神☆忆-008·流年易逝</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：灵境AI绘图<br>❀配音：暂无',
	'ybslshen_100Cosette':'<span class=yellowtext>神☆忆-009·Cosette！</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：u佬钦定原画<br>❀配音：暂无',//珂赛特
	//---------------------------------//忆包废案
	'ybold_016manchengqi':'<font color=cyan>忆☆SP-002·清明节限定</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'yboldshen_002chenailin':'<span class=yellowtext>神☆忆-004·初见与告别</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>❀配音：暂无',
	'ybold_018zhangqing':'<font color=cyan>忆-018☆·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无',
	'ybsb_047zhangmi':'<font color=cyan>忆-047·痴惘之妒魂</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：灵境AI绘图<br>◈配音：暂无',
	'ybsb_077yangqixu':'<font color=cyan>忆-077·似水流年</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无',
	'ybsb_068qingyue':'<font color=cyan>忆-068·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无。',
	'ybsb_048wushuang':'<font color=cyan>忆-048·似水流年</font><br>❁技能设计：夜白<br>❁代码撰写者：夜白<br>❁插图：派蒙AI绘图<br>❁配音：暂无',
	
}