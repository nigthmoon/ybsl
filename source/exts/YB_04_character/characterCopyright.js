import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { characterCopyright }

const characterCopyright = {
	//-----------------------上古神话专题---------------------------//
	sgsh_tiandi:'<font color=cyan>上古神话-001</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_shennong:'<font color=cyan>上古神话-002</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_xuanyuan:'<font color=cyan>上古神话-003</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_shaohao:'<font color=cyan>上古神话-004</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_zhuanxu:'<font color=cyan>上古神话-005</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_qinglong:'<font color=cyan>上古神话-006</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_baihu:'<font color=cyan>上古神话-007</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_zhuque:'<font color=cyan>上古神话-008</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_xuanwu:'<font color=cyan>上古神话-009</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_qilin:'<font color=cyan>上古神话-010</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	'sgsh_dongwanggong':'<font color=cyan>上古神话-011</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	'sgsh_xiwangmu':'<font color=cyan>上古神话-012</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	'sgsh_huaxu':'<font color=cyan>上古神话-013</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_yaoji:'<font color=cyan>上古神话-014</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_hongjunlaozu:'<font color=cyan>上古神话-015</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_gonggong:'<font color=cyan>上古神话-016</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_zhurong:'<font color=cyan>上古神话-017</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_goumang:'<font color=cyan>上古神话-018</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_houtu:'<font color=cyan>上古神话-019</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	'sgsh_yuqiang':'<font color=cyan>上古神话-020</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_fuxi:'<font color=cyan>上古神话-021</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_xiangliu:'<font color=cyan>上古神话-022</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_houyi:'<font color=cyan>上古神话-023</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	'sgsh_dayu':'<font color=cyan>上古神话-024</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_kuafu:'<font color=cyan>上古神话-025</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_tubo:'<font color=cyan>上古神话-026</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_jingwei:'<font color=cyan>上古神话-027</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_qibo:'<font color=cyan>上古神话-028</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	'sgsh_taizichangqin':'<font color=cyan>上古神话-029</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_yeming:'<font color=cyan>上古神话-030</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	'sgsh_yinglong':'<font color=cyan>上古神话-031</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	'sgsh_nvba':'<font color=cyan>上古神话-032</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_chiyou:'<font color=cyan>上古神话-033</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_fenghou:'<font color=cyan>上古神话-034</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_jiutianxuannv:'<font color=cyan>上古神话-035</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_luozu:'<font color=cyan>上古神话-036</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_cangjie:'<font color=cyan>上古神话-037</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_limu:'<font color=cyan>上古神话-038</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_changxian:'<font color=cyan>上古神话-039</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_limu:'<font color=cyan>上古神话-040</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	sgsh_shijiamouni:'<font color=cyan>上古神话-041</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	'sgsh_luohou':'<font color=cyan>上古神话-042</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	'sgsh_xingtian':'<font color=cyan>上古神话-043</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',
	// //---------------------------------//上古神话
	// 'sgsh_huaxu':'<font color=cyan>上古神话-001</font><br>♦︎技能设计：龙腾杀上古诸神<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//华胥
	// 'sgsh_taizichangqin':'<font color=cyan>上古神话-002</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//太子长琴
	// 'sgsh_nvba':'<font color=cyan>上古神话-003</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//女魃
	// 'sgsh_luohou':'<font color=cyan>上古神话-004</font><br>♦︎技能设计：龙腾杀上古诸神<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//罗睺
	// 'sgsh_dongwanggong':'<font color=cyan>上古神话-005</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//东王公
	// 'sgsh_yinglong':'<font color=cyan>上古神话-006</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//应龙
	// 'sgsh_xingtian':'<font color=cyan>上古神话-007</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//刑天
	// 'sgsh_xiwangmu':'<font color=cyan>上古神话-008</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//西王母
	// 'sgsh_yuqiang':'<font color=cyan>上古神话-009</font><br>♦︎技能设计：龙腾杀上古诸神<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//禺强
	// 'sgsh_dayu':'<font color=cyan>上古神话-010</font><br>♦︎技能设计：龙腾杀上古诸神<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//大禹
	// 'sgsh_limu':'<font color=cyan>上古神话-011</font><br>♦︎技能设计：龙腾杀上古诸神<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//力牧
	// 'sgsh_chiyou':'<font color=cyan>上古神话-012</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//蚩尤
	// 'sgsh_jingwei':'<font color=cyan>上古神话-013</font><br>♦︎技能设计：龙腾杀上古诸神（夜白改）（如有）<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无',//精卫

	//
	ybsl_xuyou:'<font color=cyan>群友共创-编号暂无</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：暂无<br>♦︎配音：官方许攸', //许攸
	//冷门民杀搬运
	ybslshen_zhenji:'<font color=cyan>冷门民杀搬运-编号暂无</font><br>✿技能设计：冷门民杀搬运<br>✿代码撰写者：夜白<br>✿插图：冷门民杀搬运<br>✿配音：暂无',
	//夜白杂设
	ybsl_kamome:'<font color=cyan>夜白杂设-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：Summer Pockets<br>❃配音：Summer Pockets（若有）',//久岛鸥
	ybsl_hairi:'<font color=cyan>夜白杂设-编号暂无</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：Summer Pockets<br>❀配音：Summer Pockets（若有）',
	sp_key_umi:'<font color=cyan>夜白杂设-编号暂无</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：Summer Pockets<br>❃配音：Summer Pockets（若有）',
	ybsl_pujing:'<font color=cyan>夜白杂设-编号暂无</font><br>♣︎️技能设计：夜白<br>♣︎️代码撰写者：夜白<br>♣︎️插图：三国杀官方（若有）<br>♣︎️配音：三国杀官方（若有）',











	
	//别群比赛
	ybsl_lvyi:'<font color=cyan>别群比赛-小白杯（落榜）-编号暂无</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：小白杯（若有）<br>♦︎配音：小白杯（若有）', //吕乂
	ybsl_yinfan:'<font color=cyan>别群比赛-小白杯（重在参与）-编号暂无</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：小白杯（若有）<br>♦︎配音：小白杯（若有）', //隐蕃
	ybsl_shlizhaoyi:'<font color=cyan>别群比赛-小白杯（重在参与）-编号暂无</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：小白杯（若有）<br>♦︎配音：小白杯（若有）', //李昭仪
	ybsl_sunshaoo:'<font color=cyan>别群比赛-小白杯（落榜）-编号暂无</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：小白杯（若有）<br>♦︎配音：小白杯（若有）', //孙韶
	ybsl_wangbi:'<font color=cyan>别群比赛-小白杯（落榜）-编号暂无</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：小白杯（若有）<br>♦︎配音：小白杯（若有）', //王必
	ybnb_wangbi:'<font color=cyan>别群比赛-小白杯（落榜）-编号暂无</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：小白杯（若有）<br>♦︎配音：小白杯（若有）', //王必
	ybsl_jiangziwen:'<font color=cyan>别群比赛-小白杯（落榜）-编号暂无</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：小白杯（若有）<br>♦︎配音：小白杯（若有）', //蒋子文
	ybsl_suojing:'<font color=cyan>别群比赛-鸿渐赛·笔走龙蛇（待评审）-编号暂无</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：鸿渐赛笔走龙蛇（若有）<br>♦︎配音：鸿渐赛笔走龙蛇（若有）',//索靖
	//宗族武将
	//吴郡陆氏
	ybslclan_luji:'<font color=green>夜白自设-吴郡陆氏-编号暂无</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无', //族陆绩
	ybslclan_luxun:'<font color=green>夜白自设-吴郡陆氏-编号暂无</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无', //族陆逊
	ybslclan_luyan:'<font color=green>夜白自设-吴郡陆氏-编号暂无</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无', //族陆延
	//一将成名
	ybslshen_pangtong:'<font color=cyan>三国杀十周年-重在参与-编号暂无</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：三国杀十周年<br>◈配音：暂无',

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