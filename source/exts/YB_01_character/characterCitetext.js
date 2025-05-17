import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { characterCitetext }

const characterCitetext = {
		
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
	'ybsl_001sunlisong':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_002chenailin':'留点什么吧，聊做分别之后的怀念。',
	'ybsl_003yanshuang':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_004zhangyujie':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_005wangruobing':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_006wanghanzhen':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_007wugege':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_008wuyuxin':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_009liyushan':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_010zhouyue':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_011gaoyuhang':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_012zhengjiayi':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_013yinji':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_014liutianyu':'故事仍在继续书写。',
	// 'ybsl_014ether':'引文待填写。',
	'ybsl_015wanghairu':'同是天涯沦落人，相逢何必曾相识。',
	'ybsl_016manchengqi':'若思悔不及，则万念俱成枯。趁你还年轻，他还未老。',
	'ybsl_017xiaohong':'在她的梦里，化作泡影的人重现。',
	
	'ybsl_018zhangqing':'她说她喜欢森林你的寂静与美好。',
	'ybsl_019shengyan':'在她的梦里，化作泡影的人重现。',
	'ybsl_020jiayutong':'引文待填写。',
	'ybsl_021liuyufeng':'还望先生教我~',
	// 'ybsl_022salt':'引文待填写。',
	// 'ybsl_025shiqingyu':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_024yuetong':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_025shiwang':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_025shiqingyu':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_025wanghe':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_026can':'你在我的梦里藏匿，笑靥如花。',
	'ybsl_027rain':'你在我的梦里藏匿，一尘不染。',
	'ybsl_028crystal':'你在我的梦里骄傲，殒身化晶。',
	'ybsl_029dawn':'你在我的梦里藏匿，扑朔迷离。',
	// 'ybsl_030book':'没有简介可以不写。',
	'ybsl_018huanqing':'你在我的梦里藏匿，柔情媚骨。',
	'ybsl_032baiyichen':'我们……继续携手同行吧。',
	'ybsl_033xiaohui':'你猜我在什么时候放弃了爱。',
	'ybsl_034zhoulianyuan':'梦中的人记不得模样，梦中的事记忆犹新。',
	'ybsl_035stamp':'见威而不伏，问诏而不朝，灭之。',
	'ybsl_036bright':'你在我的梦里逃逸，咫尺天涯。',
	'ybsl_037diamondqueen':'一名女子莫名失踪，她留下的线索只有一句，方首女王，在海中渡劫。<br/>她消失整一年后，某城市上空降落巨大球形闪电。',
	'db_ybsl_038tengwu':'黄泉路上的两名少女被复活后，会以身相许，还是许诺来世做牛马？',
	// 'ybsl_038bianqiuwen':'引文待填写。',
	// 'ybsl_039zhafu':'引文待填写。',
	
	'ybsl_041mmuqin':'首充一元就送！',
	'ybsl_042pingzi':'拼图虽好，可一旦缺失，便不再完美。',
	'ybsl_043fangjiayu':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_044huruihang':'回忆最为美好，它将你思念的对象不断美化。',
	// 'ybsl_045gaocong':'快步的来又快步的走，<br>假装不经意的路过，<br>却不知那一瞬间的顿足，<br>表露了最真诚的情愫。',
	'ybsl_046jiangxuewu':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_047shan':'游荡在城市里的鬼魂，专门捕食痴情人的美梦',
	'ybsl_047zhangmi':'凭什么你可以，我就不行？',
	
	'ybsl_048wushuang':'那年花开，晴空有你。惜无神雕，难成侠侣。',
	'ybsl_049waner':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_050zunjian':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_051fomalhaut':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_052trees':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_053qiuer':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_054yueer':'不如由我裁之，你我一人一半。',
	'ybsl_055zhengyan':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_056dongjianchao':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_057sunmeiqi':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_058sunshibo':'回忆最为美好，它将你思念的对象不断美化。',
	// 'ybsl_059starsFall':'我曾在那片球场看她们打球，偶尔也在那品读小说。<br>我沉浸于耳畔的欢声笑语，晚风催我快翻下一页。<br>我仰起头感受天空的雨意，一颗流星从我身后飞起，划过天际。<br>我奔过去将它捡起，回头迎上夕阳的快门。',
	'ybsl_059starsFall1':'回忆最为美好，它将你思念的对象不断美化。',//'鞠熒',//本名忘了
	'ybsl_059starsFall2':'回忆最为美好，它将你思念的对象不断美化。',//'宋橤',//本名保密橤渁
	'ybsl_059starsFall3':'回忆最为美好，它将你思念的对象不断美化。',//'周靈',//本名保密
	'ybsl_059starsFall4':'回忆最为美好，它将你思念的对象不断美化。',//'李曉',//本名保密
	'ybsl_060liutianhang':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_061zheyu':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_062yuhongyan':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_063weimingli':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_064lvmingyan':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_065yanxiwen':'回忆最为美好，它将你思念的对象不断美化。',
	'ybsl_066wujun':'回忆最为美好，它将你思念的对象不断美化。',
	'db_ybsl_067snake':'纯情的花，在梦里春心荡漾。站在盛夏的岔路口寻觅，你在何方？',
	'ybsl_068qingyue':'清月伴孤影，落红眷飞鸿。',
	// 'ybsl_069xiangzi':'引文待填写。',
	'ybsl_070lvyanqiu':'回忆最为美好，它将你思念的对象不断美化。',
	
	
	
	
	'ybsl_075dogcard':'再充十万，你会更强。',
	// 'ybsl_076zhujun':'引文待填写。',
	// 'ybsl_077yangqixu':'引文待填写。',
	// 'ybsl_078zhuyahai':'引文待填写。',
	// 'ybsl_079xiaoxin':'引文待填写。',
	// 'ybsl_080phoenix':'引文待填写。',
	// 'ybsl_081chenli':'>待填写。',
	// 'ybsl_081chensi':'引文待填写。',
	
	// 'ybsl_083xiaozhu':'引文待填写。',
	//047 张汨原位置，新角色待定
	'ybsl_085DGY':'你在我的心里，立了一块碑。我的心，从此荒芜。',
	// 'ybsl_086GJ':'引文待填写。',
	// 'ybsl_087tianlu':['female','YB_memory',3,[],['epic']],//田璐
	// 'ybsl_088lijiaxin':['female','YB_memory',3,[],['epic']],//李嘉欣
	// 'ybsl_089lvjinling':['female','YB_memory',3,[],['epic']],//吕金玲
	// 'ybsl_090dengtingyue':['female','YB_memory',3,[],['epic']],//邓婷月
	// 'ybsl_086GJ':['female','YB_memory',3,[],['epic']],//王彩钰
	// 'ybsl_092handan':'引文待填写。',
	// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
	// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
	// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
	// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
	// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
	// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
	// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
	// 'ybsl_107tushanshuili': '引文待填写。',
	//---------------------------------//忆包SP
	// 'db_ybsp_014liutianyu':'引文待填写。',
	'ybsp_016manchengqi':'若思悔不及，则万念俱成枯。趁你还年轻，他还未老。',
	'db_ybsp_038tengwu':'黄泉路上的两名少女被复活后，会以身相许，还是许诺来世做牛马？',
	// 'ybsp_072sulingyi':'引文待填写。',
	// 'ybsp_002chenailin':'引文待填写。',
	'ybsp_027rain':'你在我的梦里藏匿，一尘不染。',
	'ybsp_001sunlisong':'回忆最为美好，它将你思念的对象不断美化。',
	
	//---------------------------------//界限突破（什么沙比玩意）
	'ybnb_034zhoulianyuan':'梦中的人记不得模样，梦中的事记忆犹新。',
	
	//---------------------------六艺篇
	'ybart_013yinji':'回忆最为美好，它将你思念的对象不断美化。',
	'ybart_014liutianyu':'故事仍在继续书写。',
	'ybart_016manchengqi':'若思悔不及，则万念俱成枯。趁你还年轻，他还未老。',
	'ybart_017xiaohong':'在她的梦里，化作泡影的人重现。',
	'ybart_041mmuqin':'首充一元就送！',
	//---------------------------------//忆包鬼神易
	'dzsl_013yinji':'回忆最为美好，它将你思念的对象不断美化。',
	'dzsl_014liutianyu':'腐化的身躯，沉湎梦境的灵魂，念旧的心。',
	'dzsl_014xinzhikui':'平凡的傀儡不过纵丝翩舞罢了，而我的傀儡可不一样，它由我心操控，能知晓我的一切心意，代价则是至爱者的生命。',
	'dzsl_015wanghairu':'同是天涯沦落人，相逢何必曾相识。',
	'dzsl_016manchengqi':'若思悔不及，则万念俱成枯。趁你还年轻，他还未老。',
	'dzsl_017xiaohong':'在她的梦里，化作泡影的人重现。',
	//---------------------------------//忆包神将
	'ybslshen_014liutianyu':'<span class=yellowtext>作者本人，逼格满满，亮瞎你的眼。</span>',
	'ybslshen_017xiaohong':'<span class=yellowtext>什么小鹿女啊，一定是世界上最可爱的孩子吧。</span>',
	'ybslshen_018zhangqing':'<span class=yellowtext>你说可怜世间万物，没有六万五的妞，怎样了你兜儿里只剩八万出头。</span>',
	'ybslshen_002chenailin':'<span class=yellowtext>渡口边最后一面洒下了句点，与你若只如初见何须感伤离别。</span><br/><span class=yellowtext>——许嵩《如果当时》</span>',
	'ybslshen_071faraway':'<span class=yellowtext>I want to go far away!</span>',
	'ybslshen_073Al':'<span class=yellowtext>村花不会绝情，铝酸有点缺氢<span style="text-decoration: line-through;"><span style="opacity:0.2;">\uff08\u60c5\uff09</span></span>。</span>',
	// 'ybslshen_074piao':'引文待填写。',
	'ybslshen_001sunlisong':'回忆最为美好，它将你思念的对象不断美化。',
	'ybslshen_100Cosette':'<span class=yellowtext>Cosette！</span>',//珂赛特
	//---------------------------------//忆包废案
	// 'yboldshen_002chenailin':'废案',
	// 'ybold_018zhangqing':'废案',
	// 'ybsb_047zhangmi':'这是一个通渠的废案<br/>',
	// 'ybsb_077yangqixu':'这是一个旧版的废案。',
	'ybold_016manchengqi':'若思悔不及，则万念俱成枯。趁你还年轻，他还未老。',
	'ybsb_068qingyue':'清月伴孤影，落红眷飞鸿。',
	// 'ybsb_048wushuang':'这是一个旧版的废案，因为太离谱而改掉。',
	
}