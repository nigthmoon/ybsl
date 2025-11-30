import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { character }

/** @type { importCharacterConfig['character'] } */
const character = { //武将格式 : 
	//---------------------名将改写
	// 'dzsl_luxun':['male','wu',3,['dzsl_shenhuo','dzsl_buxi','dzsl_shennu'],['forbidai','rankAdd:junk','rankS:d','name:陆|逊']],//陆逊
	// 'ybsl_zhouyuxiaoqiao':['double','wu',4,['ybsl_xianyin','ybsl_luanming'],['rankAdd:epic','rankS:a','name:周|瑜-小|乔']],//周瑜小乔
	// 'ybnb_guanyinping':['female','shu',4,['ybsl_kuwangxx','ybsl_xueji'],['rankAdd:legend','rankS:s','name:关|银屏']],//关银屏
	//---------------------鬼神易的足迹
	'dzsl_013yinji':['female','YB_memory',3,['dz017_shanwu','dz013_qingling'],['rankAdd:legend','rankS:s','name:尹|null','linkTo:ybsl_013yinji']],//尹姬（鬼神易版
	'dzsl_014liutianyu':['male','YB_memory','3/6',['dz014_fuhua','dz014_xinsheng','dz014_xinkui','dz014_zaomeng'],['zhu','rankAdd:legend','rankS:s','name:夜|白','linkTo:ybsl_014liutianyu']],//夜白（鬼神易版
	'dzsl_014xinzhikui':['female','YB_memory',1,['dz017_shanwu','dz014_qingling','dz014_yangkui','dz014_xianji'],['forbidai','unseen','rankAdd:legend','rankS:s','name:null|null']],//心之傀
	'dzsl_015wanghairu':['female','YB_memory',4,['dz015_xianzhe','dz015_tianshu','dz015_shugu','dz015_enguang'],['zhu','rankAdd:epic','rankS:a','rankS:a','name:王|海茹','linkTo:ybsl_015wanghairu']],//王海茹（鬼神易版
	'dzsl_016manchengqi':['female','YB_memory',4,['dz016_zanxu','dz017_shanwu'],['rankAdd:epic','rankS:a','name:满城|柒','linkTo:ybsl_016manchengqi']],//满城柒（鬼神易版
	'dzsl_017xiaohong':['female','YB_memory',3,['dz017_zhushi','dz017_shanwu'],['rankAdd:legend','rankS:s','name:涂山|小红','linkTo:ybsl_017xiaohong']],//涂山小红（鬼神易版
	//----------------------忆包正式
	'ybsl_001sunlisong':['female','YB_memory',3,['yb001_fufeng','yb001_wanyue','yb001_beige'/*,'yb001_chuilian'*//*,'yb001_shenian'*/],['rankAdd:epic','rankS:a','name:孙|丽松']],//孙丽松
	'ybsl_002chenailin':['female','YB_memory','3/4',['yb002_ziren','yb002_shangyuan'],['rankAdd:epic','rankS:a','name:陈|爱琳']],//陈爱琳
	
	'ybsl_003yanshuang':['female','YB_memory',3,['yb009_wucai','yb003_yeyan','yb003_xiangyan'],['rankAdd:legend','rankS:s','name:闫|爽']],//闫爽
	'ybsl_004zhangyujie':['female','YB_memory',3,['yb004_wunv','yb004_tianqi','yb004_shangyuan'/*,'yb004_yujie'*/],['rankAdd:legend','rankS:s','name:张|玉洁']],//张玉洁
	//'ybsl_005wangruobing':['female','YB_memory',4,['yb005_bingqing','yb005_ruyu','yb005_jieshen'],['rankAdd:legend','rankS:s','name:王|若冰']],//王若冰//太抽象了…
	'ybsl_005wangruobing':['female','YB_memory',4,['yb005_bingqing','yb005_qianxun','yb005_jieshen'],['rankAdd:legend','rankS:s','name:王|若冰']],//王若冰
	'ybsl_006wanghanzhen':['female','YB_memory',4,['yb006_boxue','yb006_jufan','yb006_biaoshuai'],['zhu','rankAdd:epic','rankS:a','name:王|汉桢']],//王汉桢
	//'ybsl_007wugege':['female','YB_memory',4,['yb007_renqing','yb007_shigu','yb007_zhengling'],['zhu','rankAdd:epic','rankS:a','name:吴|格格']],//吴格格
	// 'ybsl_007wugege':['female','YB_memory',4,['yb007_chengyao'],['zhu','rankAdd:legend','rankS:s','name:吴|格格']],//吴格格
	'ybsl_007wugege':['female','YB_memory',4,['yb007_chenwang'],['rankAdd:epic','rankS:a','name:吴|格格']],//吴格格
	'ybsl_008wuyuxin':['female','YB_memory',3,['yb009_wucai','yb008_jianwu',/*'yb008_wanyue'*/'yb008_zhenxin'],['rankAdd:epic','rankS:a','name:吴|雨欣']],//吴雨欣
	'ybsl_009liyushan':['female','YB_memory','2/3/1',['yb009_wucai','yb009_tuling','yb009_tulinghuaqi'/*,'yb009_zhendian'*/],['rankAdd:epic','rankS:a','name:李|玉珊']],//李玉珊
	//'ybsl_010zhouyue':['female','YB_memory',3,['yb009_wucai','yb010_zheye','yb010_juxing'],['rankAdd:legend','rankS:s','name:周|玥']],//周玥第一版
	//'ybsl_010zhouyue':['female','YB_memory',3,['yb009_wucai','yb010_zheye','yb010_zhusui'/*,'yb010_xingxian'*/],['rankAdd:legend','rankS:s','name:周|玥']],//周玥第二版
	'ybsl_010zhouyue':['female','YB_memory',3,['yb010_yeyu','yb010_zheye','yb010_mingzhu'],['rankAdd:epic','rankS:a','name:周|玥']],//周玥第三版
	//'ybsl_011gaoyuhang':['female','YB_memory',3,['yb011_kongbai','yb011_chenxing'/*,'yb011_yinmeng','yb011_hen'*/],['rankAdd:legend','rankS:s','name:高|宇航']],//高宇航
	'ybsl_011gaoyuhang':['female','YB_memory',3,['yb011_lijian','yb011_jueleng'],['rankAdd:epic','rankS:a','name:高|宇航']],//高宇航二版
	'ybsl_012zhengjiayi':['female','YB_memory',3,['yb012_bianqian','yb012_xibei','yb012_suotu'],['rankAdd:epic','rankS:a','name:郑|佳怡']],//郑佳怡
	
	
	
	'ybsl_015wanghairu':['female','YB_memory',3,['yb015_liangquan','yb015_bixin'],['rankAdd:epic','rankS:a','name:王|海茹']],//王海茹
	'ybsl_016manchengqi':['female','YB_memory',4,['yb016_juli','yb016_shenzou'],['rankAdd:epic','rankS:a','name:满城|柒']],//满城柒（新版
	'ybsl_017xiaohong':['female','YB_memory',3,['yb017_chuanxinx','yb017_zuigui'],['rankAdd:legend','rankS:s','name:涂山|小红']],//涂山小红（新版
	'ybsl_018zhangqing':['female','YB_memory',3,['yb018_huaimeng','yb018_minxing','yb018_fanling'],['rankAdd:legend','rankS:s','name:张|晴']],//张晴
	'ybsl_018huanqing':['female','YB_dream',3,['yb018_lihun','yb018_wanyue','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:epic','rankS:a','name:张|晴']],//梦——幻晴
	'ybsl_019shengyan':['female','YB_memory',4,['yb019_cutan','yb019_zhiyu','yb019_chicu'],['rankAdd:rare','rankS:b','name:盛|妍']],//盛妍
	'ybsl_020jiayutong':['female','YB_memory',3,['yb043_zhishi','yb020_zhuangrong'],['rankAdd:epic','rankS:a','name:贾|雨桐']],//贾雨桐
	'ybsl_021liuyufeng':['male','YB_memory',3,['yb021_shusuan','yb021_qiujiao'],['rankAdd:epic','rankS:a','name:刘|域楓']],//刘域楓
	'ybsl_022salt':['female','YB_memory',3,['yb022_yiduan',/*'yb022_yaogong',*/'yb022_duanxiangxin'],['rankAdd:epic','rankS:a','name:null|盐']],//盐
	'ybsl_023sunlixin':['male','YB_memory',4,['oljiang','yb023_fenghou'],['rankAdd:legend','rankS:s','name:孙|立新']],//孙立新
	'ybsl_024yuetong':['female','YB_memory',4,[/*'技能'*/],['unseen','rankAdd:legend','rankS:s','name:岳|瞳']],//岳瞳
	'ybsl_025shiwang':['female','YB_memory',3,['yb025_choujiang','yb025_haodu','yb025_zanzhu'],['rankAdd:legend','rankS:s','name:史|庆宇-王|贺']],//史庆宇&王贺
	'ybsl_025shiqingyu':['female','YB_memory',16,['yb025_shiyuan','yb025_tuiqiao','yb025_chengyinx'],['rankAdd:epic','rankS:a','name:史|庆宇']],//史庆宇
	'ybsl_025wanghe':['female','YB_memory',3,[/*技能*/],['unseen','rankAdd:epic','rankS:a','name:王|贺']],//王贺
	'ybsl_026can':['female','YB_dream',3,['yb026_xiaoye','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:rare','rankS:b','name:null|蚕']],//梦——蚕
	'ybsl_027rain':['female','YB_dream',3,['yb027_jisi','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:epic','rankS:a','name:null|雨']],//梦——雨
	'ybsl_028crystal':['male','YB_dream','3/6',['yb028_jianzhen','yb028_sheshen','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:legend','rankS:s','name:null|晶']],//梦——晶
	'ybsl_029dawn':['female','YB_dream',3,['yb029_chonghui','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:rare','rankS:b','name:null|黎']],//梦——黎
	//'ybsl_030book':['female','YB_dream',4,['yb030_jiangdao','ybsl_sanmeng'/*,'yb030_lunyi'*/,'ybsl_rumeng'],['YB_memory','rankAdd:legend','rankS:s','name:null|书']],//梦——书
	//'ybsl_032baiyichen':['female','YB_memory',3,['yb032_tonglv','yb032_zhuiji','yb032_duanchang'],['rankAdd:epic','rankS:a','name:白|衣尘']],//白衣尘
	'ybsl_033xiaohui':['female','YB_memory',3,['yb033_huiyue'/*,'yb033_shuhui','yb033_yuqi','yb014_lvxin'*/],['rankAdd:legend','rankS:s','name:null|小慧']],//小慧
	'ybsl_034zhoulianyuan':['male','YB_dream',3,['yb034_bifa','yb034_jiandao','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:rare','rankS:b','name:周|怜渊']],//梦——周怜渊
	'ybsl_035stamp':['male','shen','2/3',['yb035_zhengzhao','yb035_jitian','yb035_liuwang'/*,'yb035_weiyan'*/],['YB_memory','rankAdd:legend','rankS:s','name:null|玺']],//梦——玺
	'ybsl_036bright':['female','YB_dream',3,['yb036_qianjin',/*'yb036_chongzheng','yb036_aoxiang',*/'ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:epic','rankS:a','name:null|熙']],//梦——熙
	'ybsl_037diamondqueen':['female','YB_dream',6,['yb037_yizhong','yb037_kexie','yb037_guiling','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:rare','rankS:b','name:null|Q']],//梦——方块Q
	'db_ybsl_038tengwu':['female','YB_dream','3/4',['yb038_quanlu','yb038_fushengxx','ybsl_sanmeng'],['doublegroup:YB_memory:YB_dream','rankAdd:legend','rankS:s','name:滕|叔颖-武|宁']],//梦——滕叔颖＆武宁
	'ybsl_038bianqiuwen':['female','YB_memory',3,['yb047_youhun','yb038_chameng'],['rankAdd:epic','rankS:a','name:卞|秋雯']],//卞秋雯
	'ybsl_039zhafu':['male','YB_dream',3,['yb039_zhifu','yb039_feiyan','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:epic','rankS:a','name:查|符']],//梦——查符
	'ybsl_014ether':['male','YB_dream',3,['reqicai','yb014_xuyuan','yb014_jumeng','ybsl_rumeng'],['YB_memory','rankAdd:legend','rankS:s','name:安|以']],//梦——安以
	//原慕琴在此
	'ybsl_042pingzi':['female','YB_memory',3,['yb042_sizhi','yb042_mingtui','yb042_lisheng'],['rankAdd:epic','rankS:a','name:李|蘋']],//蘋姉蘋姉蘋姉
	'ybsl_043fangjiayu':['female','YB_memory',3,['yb043_zhishi','yb043_shuhai'],['rankAdd:epic','rankS:a','name:房|佳谕']],//房佳谕
	'ybsl_044huruihang':['female','YB_memory',3,[/*'技能'*/],['unseen','rankAdd:epic','rankS:a','name:胡|瑞航']],//胡瑞航
	'ybsl_045gaocong':['female','YB_memory',3,[/*'技能'*/],['unseen','rankAdd:legend','rankS:s','name:高|聪']],//高聪
	'ybsl_046jiangxuewu':['female','YB_memory',3,['yb043_zhishi','yb046_qingxue','yb046_xuewu'],['rankAdd:legend','rankS:s','name:江|雪舞']],//江雪舞
	'ybsl_047shan':['female','YB_memory',3,['yb047_youhun','yb047_wanxin','yb047_shouqing'],['rankAdd:legend','rankS:s','name:null|彡']],//彡
	'ybsl_047zhangmi':['female','YB_dream',3,['yb047_xundu','yb047_efei','yb047_pomeng','ybsl_rumeng'],['YB_memory','rankAdd:legend','rankS:s','name:张|汨']],//张汨
	'ybsl_048wushuang':['female','YB_memory',3,['yb048_zhimeng','yb048_shennv','yb048_minzhen'],['rankAdd:legend','rankS:s','name:吴|爽']],//吴爽
	'ybsl_049waner':['female','YB_memory','3/4',['yb049_rongxiao','yb049_fuhun','clanzhongliu'/*'技能'*/],['rankAdd:legend','rankS:s','name:王|婉儿','clan:太原王氏']],//王婉儿
	'ybsl_050zunjian':['female','YB_memory',3,[/*'技能'*/],['unseen']],//鐏柬
	'ybsl_051fomalhaut':['male','YB_memory',3,[/*'技能'*/],['unseen']],//北落师门
	'ybsl_052trees':['male','YB_memory',5,['yb052_chongji'],['rankAdd:epic','rankS:a']],//姜森
	'ybsl_053qiuer':['female','YB_memory',3,['yb053_lvxin','yb053_yinren'],['rankAdd:legend','rankS:s','name:null|秋儿']],//秋儿
	'ybsl_054yueer':['female','YB_memory',3,['yb054_caijin','yb054_tongxin','yb054_qiangzhi'],['rankAdd:epic','rankS:a','name:null|悦儿']],//悦儿
	'ybsl_055zhengyan':['female','YB_memory',3,['yb055_zhuandu','yb055_zangxin'],['rankAdd:epic','rankS:a']],//郑琰
	//'ybsl_056dongjianchao':['male','YB_memory',3,[/*'技能'*/],[]],//董建超
	//'ybsl_057sunmeiqi':['female','YB_memory',3,[/*'技能'*/],[]],//孙美琪
	//'ybsl_058sunshibo':['male','YB_memory',3,[/*'技能'*/],[]],//孙世博
	'ybsl_059starsFall':['female','YB_memory',4,['yb059_huiguang','yb059_xingshi'],['rankAdd:legend','rankS:s','name:鞠|熒-宋|橤-周|靈-李|曉']],//星落四公主
	'ybsl_059starsFall1':['female','YB_memory',4,['yb059_guanhong'],['unseen','rankAdd:legend','rankS:s','name:鞠|熒']],//鞠熒
	'ybsl_059starsFall2':['female','YB_memory',4,['yb059_zhuotan'],['unseen','rankAdd:legend','rankS:s','name:宋|橤']],//宋橤
	'ybsl_059starsFall3':['female','YB_memory',4,['yb059_qingliu'],['unseen','rankAdd:legend','rankS:s','name:周|靈']],//周靈
	'ybsl_059starsFall4':['female','YB_memory',4,['yb059_pingyu'],['unseen','rankAdd:legend','rankS:s','name:李|曉']],//李曉
	//'ybsl_060liutianhang':['female','YB_memory',3,[/*'技能'*/],[]],//刘天杭
	//'ybsl_061zheyu':['male','YB_memory',3,[/*'技能'*/],[]],//哲宇
	//'ybsl_062yuhongyan':['male','YB_memory',3,[/*'技能'*/],[]],//于洪岩
	//'ybsl_063weimingli':['male','YB_memory',3,[/*'技能'*/],[]],//魏铭利
	//'ybsl_064lvmingyan':['male','YB_memory',3,[/*'技能'*/],[]],//吕明岩
	//'ybsl_065yanxiwen':['male','YB_memory',3,[/*'技能'*/],[]],//阎锡文
	//'ybsl_066wujun':['female','YB_memory',3,[/*'技能'*/],[]],//武筠
	'db_ybsl_067snake':['female','YB_dream',4,['yb067_chanqing','yb067_kuiyi','ybsl_sanmeng'],['doublegroup:YB_memory:YB_dream','rankAdd:legend','rankS:s','name:蛇|妃']],//蛇妃
	'ybsl_068qingyue':['female','YB_memory',3,['yb010_mingzhu','yb068_chenyu','yb068_yingxian'],['rankAdd:legend','rankS:s','name:null|清月']],//清月姑娘
	'ybsl_069xiangzi':['female','YB_dream',3,['yb069_yaomian','yb069_wenhuan','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:epic','rankS:a','name:null|香紫']],//香紫
	'ybsl_070lvyanqiu':['female','YB_memory',3,['yb070_queshi','yb070_meiying','yb070_fuyi'],['rankAdd:legend','rankS:s','name:吕|艳秋']],//吕艳秋
	//071想去远方
	//072苏令燚
	//073铝宝
	//074花落隨風
	'ybsl_075dogcard':['male','shu',3,['yb075_quanke','yb075_wuma','yb075_qianma'],['rankAdd:rare','rankS:b','name:苟|卡']],//苟卡
	'ybsl_076zhujun':['female','YB_dream',3,['yb076_suiyan','yb076_zhenlie','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:legend','rankS:s','name:朱|焌']],//朱焌
	// 'ybsl_077yangqixu':['male','YB_dream',3,['yb077_shensu','yb077_yingmu','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:rare','rankS:b','name:羊|祈絮']],//羊祈絮
	'ybsl_077yangqixu':['male','YB_dream',3,['yb077_shensu','yb077_jibu','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:epic','rankS:a','name:羊|祈絮']],//羊祈絮
	'ybsl_078zhuyahai':['male','YB_dream','3/4',['yb078_yaoyan','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:legend','rankS:s','name:朱|涯海']],//朱涯海
	// 'ybsl_079xiaoxin':['female','YB_memory',3,['yb079_qingnian','yb079_jinran'],['length','name:null|小新']],//小新
	// 'ybsl_079xiaoxin':['female','YB_memory',3,['yb079_qingnian','yb079_jinran'],['length','name:null|小新']],//小新
	'ybsl_080phoenix':['none','YB_memory',3,['yb080_huayu','yb080_niepan'],['rankAdd:legend','rankS:s','name:null|凤']],//凤
	// 'ybsl_081chenli':['female','YB_dream',3,['yb081_lvxin','yb081_shanhui','ybsl_rumeng',"dualside"],['YB_memory','rankAdd:legend','rankS:s','name:陈|丽',"dualside:ybsl_081chensi"]],//陈丽
	// 'ybsl_081chensi':['female','YB_dream',3,['yb081_sishi','yb081_yinmeng','ybsl_rumeng',"dualside"],['YB_memory','unseen','rankAdd:legend','rankS:s','name:陈|思']],//陈思
	
	// 'ybsl_083xiaozhu':['female','YB_dream',3,['yb083_shenshou','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:epic','rankS:a','unseen','name:null|小筑']],//小筑
	//047原张汨位置，现在张汨调整序号
	'ybsl_085DGY':['female','YB_memory',3,['yb085_muyuan','yb085_cibie'],['rankAdd:legend','rankS:s','name:独孤|雨']],//独孤雨
	'ybsl_086GJ':['female','YB_memory',3,['yb086_jieyin'],['rankAdd:epic','rankS:a']],//龚洁
	// 'ybsl_087tianlu':['female','YB_memory',3,['','yb087_qiujiao'],['rankAdd:epic','rankS:a']],//田璐
	// 'ybsl_088lijiaxin':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//李嘉欣
	// 'ybsl_089lvjinling':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//吕金玲
	// 'ybsl_090dengtingyue':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//邓婷月
	// 'ybsl_091wangcaiyu':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//王彩钰
	'ybsl_092handan':['female','YB_memory',3,['yb092_biyue','yb092_xiuhua','yb092_chenyu','yb092_luoyan'],['rankAdd:epic','rankS:a'/*,'hiddenSkill'*/,'name:玉|蝶心']],//玉蝶心
	// 'ybsl_093cat':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//猫猫
	// 'ybsl_094cat':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//
	// 'ybsl_095cat':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//
	// 'ybsl_096cat':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//
	// 'ybsl_097cat':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//
	// 'ybsl_093cat':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//
	// 'ybsl_099cat':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//
	// 100珂赛特
	// 'ybsl_101cat':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//
	// 'ybsl_102cat':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//
	// 'ybsl_103cat':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//
	// 'ybsl_104cat':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//
	// 'ybsl_105cat':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//
	// 'ybsl_106cat':['female','YB_memory',3,[],['rankAdd:epic','rankS:a']],//
	'ybsl_107tushanshuili':['female','YB_dream',3,['yb107_xunhu','QQQ107_taye','QQQ107_yaoyi','ybsl_rumeng'],['YB_memory','rankAdd:epic','rankS:a','name:涂山|水璃']], //涂山水璃
	ybsl_121tujing:['female','YB_dream',3,['yb121_yuanjie','yb121_tiandu','ybsl_rumeng'],['YB_memory','rankAdd:epic','rankS:a','name:涂|静']],//涂静
	ybsl_122wangbingyu:['female','YB_dream',4,['yb122_yinjinsp','yb122_buchen','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:epic','rankS:a']],//王冰雨
	ybsl_123xuelang:['female','YB_memory',4,['yb123_zouhe','yb015_bixin'],['rankAdd:epic','rankS:a']],//雪琅

	//----------------------夜白界限突破（能更新出这个系列离不开大家不离不弃的支持）
	'ybnb_034zhoulianyuan':['male','YB_dream',3,['yb034_rebifa','yb034_rejiandao','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:epic','rankS:a','name:周|怜渊','linkTo:ybsl_034zhoulianyuan']],//梦——界周怜渊
	//----------------------忆包SP（所谓SP，其实是一种创意的异构，难免参差不齐）
	'db_ybsp_014liutianyu':['male','shen','3/6',['yb014_yingbian','yb014_yazhi'],['doublegroup:YB_memory:shen','rankAdd:legend','rankS:s','name:夜|白','linkTo:ybsl_014liutianyu']],//SP夜白
	'ybsp_072sulingyi':['female','qun',3,['yb072_ezhao','yb072_toujiang'],['rankAdd:epic','rankS:a','name:苏|令燚']],//SP苏令燚
	'db_ybsp_038tengwu':['female','YB_dream','3/4',['yb038_quanlu','yb038_fusheng','ybsl_sanmeng'],['doublegroup:YB_memory:YB_dream','rankAdd:legend','rankS:s','name:滕|叔颖-武|宁','linkTo:db_ybsl_038tengwu']],//SP滕叔颖＆武宁（其实是旧案）
	'ybsp_002chenailin':['female','YB_memory','3/4',['yb002_touxin','yb002_zheye','QQQ002_xiangyun'],['rankAdd:epic','rankS:a','name:陈|爱琳','linkTo:ybsl_002chenailin']],//SP陈爱琳（其实是旧案）
	'ybsp_027rain':['female','YB_dream',3,['yb027_mili','ybsl_sanmeng','ybsl_rumeng'],['YB_memory','rankAdd:rare','rankS:b','name:null|雨','linkTo:ybsl_027rain']],//梦——雨
	'ybsp_001sunlisong':['female','YB_memory','3/4',['yb001_yongyue','yb001_haowan'],['rankAdd:epic','rankS:a','name:孙|丽松','linkTo:ybsl_001sunlisong']],//孙丽松
	'ybsp_016manchengqi':['female','YB_memory',3,['yb016_shanbiao','yb016_jiushi'],['rankAdd:epic','rankS:a','name:满城|柒','linkTo:ybsl_016manchengqi']],//孙丽松
	'ybsp_033xiaohui':['female','YB_memory',6,['yb033_beilei','yb033_qijue'],['rankAdd:legend','rankS:s','name:null|小慧','linkTo:ybsl_033xiaohui','unseen']],//小慧
	'ybsp_006wanghanzhen':['female','YB_memory',3,['yb006_xueyan'],['rankAdd:legend','rankS:s','name:王|汉桢','linkTo:ybsl_006wanghanzhen']],//王汉桢
	ybsp_018zhangqing:['female','YB_memory',3,['yb018_tongmou'],['rankAdd:legend','rankS:s','name:张|晴','linkTo:ybsl_018zhangqing','forbidai']],//张晴
	'ybsp_079xiaoxin':['female','YB_memory',6,['yb079_xiuxin','yb079_newyinyong'],['rankAdd:legend','rankS:s','name:null|小新']],//小新
	//----------------------忆包神将
	'ybslshen_014liutianyu':['male','shen','3/5',['yb014_shizhui','ybsl_xuxian'],['YB_memory','rankAdd:legend','rankS:s','name:夜|白']],//神夜白
	'ybslshen_017xiaohong':['female','shen',3,['yb017_mizhu','yb017_guangzhu','yb017_zhenshi','ybsl_xuxian'],['YB_memory','rankAdd:legend','rankS:s','name:涂山|小红']],//神涂山小红
	'ybslshen_018zhangqing':['female','shen',3,['yb018_newisi','yb018_chongmeng','yb018_yisi','ybsl_xuxian'],['YB_memory','rankAdd:legend','rankS:s','name:张|晴']],//神张晴
	'ybslshen_002chenailin':['female','shen','3/4',['yb002_yiqu','yb002_shangyuan','ybsl_xuxian'],['YB_memory','rankAdd:legend','rankS:s','name:陈|爱琳']],//神陈爱琳
	'ybslshen_071faraway':['male','shen','2/3',['ybsl_xinghen','ybsl_cuixing','ybsl_xinghui','ybsl_xingbian'],['YB_memory','rankAdd:legend','rankS:s','name:逆天|null']],//神远方
	'ybslshen_073Al':['female','shen','1/6',['ybsl_duanzui','ybsl_zhenhun','ybsl_kunyu'],['YB_memory','rankAdd:legend','rankS:s','name:null|铝']],//铝
	// 'ybslshen_074piao':['female','shen',4,['ybsl_guanxing','ybsl_tianwen'/*,'ybsl_guayao'*/],['YB_memory','rankAdd:legend','rankS:s','name:花落|隨風']],//花落隨風
	'ybslshen_001sunlisong':['female','shen',3,['yb001_minglun','yb001_haowan'],['YB_memory','rankAdd:legend','rankS:s','name:孙|丽松']],//孙丽松
	'ybslshen_100Cosette':['female','shen',3,['yb100_lieshi','yb100_dianzhan','yb100_huanyin'],['YB_memory','rankAdd:legend','rankS:s','clan:颍川荀氏','name:null|u']],//珂赛特
	//----------------------忆包废案
	'yboldshen_002chenailin':['female','shen','3/4',['yb002_yiqu','ybold_shangyuan','ybsl_xuxian'],['YB_memory','forbidai','rankAdd:legend','rankS:s','name:陈|爱琳','linkTo:ybslshen_002chenailin']],//废稿神陈爱琳
	'ybold_018zhangqing':['female','YB_memory',3,['yb018_huaimeng','yb018_yinsi'],['forbidai','rankAdd:epic','rankS:a','name:张|晴','linkTo:ybsl_018zhangqing']],//废稿张晴
	'ybsb_047zhangmi':['female','YB_dream',3,['yb047_xundu','yb047_efei','yb047_pomen'],['YB_memory','rankAdd:epic','rankS:a','name:张|汨','linkTo:ybsl_047zhangmi']],//通渠张汨
	'ybsb_077yangqixu':['male','YB_dream',3,['yb077_shensu','yb077_yingmu','ybsl_sanmeng'],['YB_memory','rankAdd:rare','rankS:b','name:羊|祈絮','linkTo:ybsl_077yangqixu']],//羊祈絮
	'ybsb_068qingyue':['female','YB_memory',3,['yb010_mingzhu','yb068_chenyu','yb068_jingyue'],['rankAdd:rare','rankS:b','forbidai','name:null|清月','linkTo:ybsl_068qingyue']],//清月姑娘
	'ybsb_048wushuang':['female','YB_memory',3,['yb048_ningyuan','yb048_wuling','yb048_huanjie'],['rankAdd:legend','rankS:s','name:吴|爽','linkTo:ybsl_048wushuang']],//吴爽
	'ybold_016manchengqi':['female','YB_memory',3,['yb016_xianyue','yb016_tianliao','yb016_qingjie','yb016_pojie'],['rankAdd:rare','rankS:b','name:满城|柒','linkTo:ybsl_016manchengqi']],//旧版SP满城柒（其实是清明节设计的，机制很清奇但貌似很弱）

	ybsl_windmoon:['female','wei',4,[
		// 'kagari_ybzongsi',
		'kagari_ybzongsix',
		'xinfu_ybfalu','xinfu_ybzhenyi','xinfu_ybdianhua',
		/*'ybsl_kuwang','ybsl_guqu',*/
		'ybsl_aocai',
		'ybsl_clanxingzu',
		'xinfu_ybjingxie',
		'ybsl_kegu',
		'ybsl_yiji','ybsl_liangying',
		'ybsl_clanqianlei',
		'ybmjz_mumu',
	],['clan:吴郡陆氏','name:null|null','forbidai']],
	ybsl_mystery:['female','wei',4,
		['yb011_kongbai','yb011_chenxing'],
		['forbidai']
	],
	//'ybsl_hejiezhe':['female','YB_memory',3,['ybsl_hejie'],['forbidai']],//
	//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
	
}
