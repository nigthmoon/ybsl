import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { characterTitle }

const characterTitle = {//称号
	//---------------------------------//上古神话
	'sgsh_huaxu':'',//华胥
	'sgsh_taizichangqin':'',//太子长琴
	'sgsh_nvba':'',//女魃
	'sgsh_luohou':'',//罗睺
	'sgsh_dongwanggong':'',//东王公
	//---------------------------------//名将改写
	'dzsl_luxun':'万钧神弩',//陆逊
	'ybsl_zhouyuxiaoqiao':'乔心瑾悦',//周瑜小乔
	//---------------------------------//忆包武将
	'ybsl_001sunlisong':'<font color=cyan>似水流年</font>',
	'ybsl_002chenailin':'<font color=cyan>凄愁哀婉</font>',
	'ybsl_003yanshuang':'<font color=cyan>似水流年</font>',
	'ybsl_004zhangyujie':'<font color=cyan>神女的仆从</font>',
	'ybsl_005wangruobing':'<font color=cyan>似水流年</font>',
	'ybsl_006wanghanzhen':'<font color=cyan>似水流年</font>',
	'ybsl_007wugege':'<font color=cyan>似水流年</font>',
	'ybsl_008wuyuxin':'<font color=cyan>似水流年</font>',
	'ybsl_009liyushan':'<font color=cyan>似水流年</font>',
	'ybsl_010zhouyue':'<font color=cyan>似水流年</font>',
	'ybsl_011gaoyuhang':'<font color=cyan>似水流年</font>',
	'ybsl_012zhengjiayi':'<font color=cyan>似水流年</font>',
	'ybsl_013yinji':'<font color=cyan>似水流年</font>',
	'ybsl_014liutianyu':'<font color=cyan>似水流年</font>',
	'ybsl_015wanghairu':'<font color=cyan>将心比心</font>',
	'ybsl_016manchengqi':'<font color=cyan>似水流年</font>',
	'ybsl_017xiaohong':'<font color=cyan>似水流年</font>',
	'ybsl_018zhangqing':'<font color=cyan>晓月照怀</font>',
	'ybsl_018huanqing':'<font color=cyan>巡梦魅影</font>',
	'ybsl_019shengyan':'<font color=cyan>醋心少女</font>',
	'ybsl_020jiayutong':'<font color=cyan>艳绝</font>',
	'ybsl_021liuyufeng':'<font color=cyan>似水流年</font>',
	'ybsl_022salt':'<font color=cyan>待填写</font>',
	//023
	'ybsl_024yuetong':'<font color=cyan>糖心少女</font>',
	'ybsl_025shiwang':'<font color=cyan>似水流年</font>',
	'ybsl_025shiqingyu': '<font color=cyan>心灵守望</font>',
	'ybsl_025wanghe': '<font color=cyan>似水流年</font>',
	'ybsl_026can':'<font color=cyan>巡梦回音</font>',
	'ybsl_027rain':'<font color=cyan>巡梦鸣觉</font>',
	'ybsl_028crystal':'<font color=cyan>巡梦回响</font>',
	'ybsl_029dawn':'<font color=cyan>巡梦长息</font>',
	'ybsl_030book':'<font color=cyan>巡梦道演</font>',
	
	'ybsl_032baiyichen':'<font color=cyan>旅者</font>',
	'ybsl_033xiaohui':'<font color=cyan>断肠人在天涯</font>',
	'ybsl_034zhoulianyuan':'<font color=cyan>庄子的执剑人</font>',
	'ybsl_035stamp':'<font color=cyan>龙裔象征</font>',
	'ybsl_036bright':'<font color=cyan>魔王的跑酷</font>',
	'ybsl_037diamondqueen':'<font color=cyan>深海的通灵龟</font>',
	'db_ybsl_038tengwu':'<font color=cyan>缘尽梦碎</font>',
	'ybsl_038bianqiuwen':'<font color=cyan>大花</font>',
	'ybsl_039zhafu':'<font color=cyan>制符新生</font>',
	'ybsl_014ether':'<font color=cyan>缘尽梦碎</font>',
	'ybsl_041mmuqin':'<font color=cyan>似水流年</font>',
	'ybsl_042pingzi':'<font color=cyan>灾厄已避散</font>',
	'ybsl_043fangjiayu':'<font color=cyan>霸道总裁爱上我</font>',
	'ybsl_044huruihang':'<font color=cyan>似水流年</font>',
	'ybsl_045gaocong':'<font color=cyan>似水流年</font>',
	'ybsl_046jiangxuewu':'<font color=cyan>似水流年</font>',
	'ybsl_047shan':'<font color=cyan>游魂惊梦</font>',
	'ybsl_047zhangmi':'<font color=cyan>痴惘之妒魂</font>',
	'ybsl_048wushuang':'<font color=cyan>长白山的神女</font>',
	'ybsl_049waner':'<font color=cyan>顾盼心归</font>',
	'ybsl_050zunjian':'<font color=cyan>似水流年</font>',
	'ybsl_051fomalhaut':'<font color=cyan>似水流年</font>',
	'ybsl_052trees':'<font color=cyan>似水流年</font>',
	'ybsl_053qiuer':'<font color=cyan>逆影逐光</font>',
	'ybsl_054yueer':'<font color=cyan>共轭之恋</font>',
	'ybsl_055zhengyan':'<font color=cyan>似水流年</font>',
	'ybsl_056dongjianchao':'<font color=cyan>似水流年</font>',
	'ybsl_057sunmeiqi':'<font color=cyan>似水流年</font>',
	'ybsl_058sunshibo':'<font color=cyan>似水流年</font>',
	'ybsl_059starsFall':'<font color=cyan>逝水流年</font>',
	'ybsl_059starsFall1':'<font color=cyan>逝水流年</font>',//'鞠熒',//本名保密
	'ybsl_059starsFall2':'<font color=cyan>逝水流年</font>',//'宋橤',//本名保密橤渁
	'ybsl_059starsFall3':'<font color=cyan>逝水流年</font>',//'周靈',//本名保密
	'ybsl_059starsFall4':'<font color=cyan>逝水流年</font>',//'李曉',//本名保密
	'ybsl_060liutianhang':'<font color=cyan>似水流年</font>',
	'ybsl_061zheyu':'<font color=cyan>似水流年</font>',
	'ybsl_062yuhongyan':'<font color=cyan>似水流年</font>',
	'ybsl_063weimingli':'<font color=cyan>似水流年</font>',
	'ybsl_064lvmingyan':'<font color=cyan>似水流年</font>',
	'ybsl_065yanxiwen':'<font color=cyan>似水流年</font>',
	'ybsl_066wujun':'<font color=cyan>似水流年</font>',
	'db_ybsl_067snake':'<font color=cyan>旧梦循蹈</font>',
	'ybsl_068qingyue':'<font color=cyan>似水流年</font>',
	'ybsl_069xiangzi':'<font color=cyan>似水流年</font>',
	'ybsl_070lvyanqiu':'<font color=cyan>似水流年</font>',




	'ybsl_075dogcard':'<font color=cyan>似水流年</font>',
	'ybsl_076zhujun':'<font color=cyan>似水流年</font>',
	'ybsl_077yangqixu':'<font color=cyan>似水流年</font>',
	'ybsl_078zhuyahai':'<font color=cyan>似水流年</font>',
	'ybsl_079xiaoxin':'<font color=cyan>似水流年</font>',
	'ybsl_080phoenix':'<font color=cyan>凤鸣九天</font>',
	'ybsl_081chenli':'<font color=cyan>巡梦迷失者</font>',
	'ybsl_081chensi':'<font color=cyan>巡梦迷失者</font>',
	
	'ybsl_083xiaozhu':'<font color=cyan>巡梦天合</font>',
	//047
	'ybsl_085DGY':'<font color=cyan>雨漫孤城</font>',
	'ybsl_086GJ':'<font color=cyan>幻想的奇缘</font>',
	'ybsl_092handan':'<font color=cyan>似水流年</font>',
	//---------------------------------//忆包SP
	'db_ybsp_014liutianyu':'<font color=cyan>暗流涌动</font>',
	'ybsp_016manchengqi':'<font color=cyan>强饰的丽影</font>',
	'db_ybsp_038tengwu':'<font color=cyan>缘尽梦碎</font>',
	'ybsp_072sulingyi':'<font color=cyan>不祥的命运</font>',
	'ybsp_001sunlisong':'<font color=cyan>皓腕凝霜雪</font>',
	'ybsp_002chenailin':'<font color=cyan>玉殒香消</font>',
	'ybsp_027rain':'<font color=cyan>巡梦鸣觉</font>',
	ybsp_033xiaohui:'<font color=cyan>悲泣断肠</font>',
	ybsp_006wanghanzhen:'<font color=cyan>似水流年</font>',
	ybsp_018zhangqing:'<font color=cyan>一万关的消消乐</font>',
	ybsp_079xiaoxin:'<font color=cyan>似水流年</font>',

	//---------------------------------//界限突破（什么沙比玩意）
	'ybnb_034zhoulianyuan':'<font color=cyan>庄子的执剑人</font>',
	//----------------------六艺篇

	'ybart_013yinji':'<font color=cyan>似水流年</font>',
	'ybart_014liutianyu':'<font color=cyan>似水流年</font>',
	'ybart_015wanghairu':'<font color=cyan>似水流年</font>',
	'ybart_016manchengqi':'<font color=cyan>似水流年</font>',
	'ybart_017xiaohong':'<font color=cyan>似水流年</font>',
	'ybart_041mmuqin':'<font color=cyan>似水流年</font>',
	//---------------------------------//鬼神易的足迹
	'dzsl_013yinji':'<font color=cyan>似水流年</font>',
	'dzsl_014liutianyu':'<font color=cyan>梦的缔造者</font>',
	'dzsl_014xinzhikui':'<font color=cyan>绝对忠臣</font>',
	'dzsl_015wanghairu':'<font color=cyan>似水流年</font>',
	'dzsl_016manchengqi':'<font color=cyan>似水流年</font>',
	'dzsl_017xiaohong':'<font color=cyan>似水流年</font>',
	//---------------------------------//忆包神将
	'ybslshen_014liutianyu':'<span class=yellowtext>天涯的窥梦人</span>',
	'ybslshen_017xiaohong':'<span class=yellowtext>儿童节限定</span>',
	'ybslshen_018zhangqing':'<span class=yellowtext>愚人节限定</span>',
	'ybslshen_002chenailin':'<span class=yellowtext>初见与告别</span>',
	'ybslshen_071faraway':'<span class=yellowtext>银河启示者</span>',
	'ybslshen_073Al':'<span class=yellowtext>天牢令</span>',
	'ybslshen_074piao':'<span class=yellowtext>掌中寰宇</span>',
	'ybslshen_001sunlisong':'<span class=yellowtext>流年易逝</span>',
	'ybslshen_100Cosette':'<span class=yellowtext>Cosette！</span>',//珂赛特
	//---------------------------------//忆包废稿
	'ybold_016manchengqi':'<font color=cyan>清明节限定</font>',
	'yboldshen_002chenailin':'<span class=yellowtext>初见与告别</span>',
	'ybold_018zhangqing':'<font color=cyan>似水流年</font>',
	'ybsb_047zhangmi':'<font color=cyan>痴惘之妒魂</font>',
	'ybsb_077yangqixu':'<font color=cyan>似水流年</font>',
	'ybsb_068qingyue':'<font color=cyan>似水流年</font>',
	'ybsb_048wushuang':'<font color=cyan>似水流年</font>',
}