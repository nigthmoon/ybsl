"use strict";
game.import('character',function(lib, game, ui, get, ai, _status){ 
	var ybslj={ 
		name:'ybslj',//武将包命名（必填） 
		connect:true,//该武将包是否可以联机（必填） 
		connectBanned:['ybsl_018zhangqing_feian','ybslshen_002chenailin_feian'],
		characterSort:{
			ybslj:{
				'ybsl_ssln':[
					'ybsl_001sunlisong','ybsl_002chenailin','ybsl_003yanshuang','ybsl_004zhangyujie','ybsl_005wangruobing',
					'ybsl_006wanghanzhen','ybsl_007wugege','ybsl_008wuyuxin','ybsl_009liyushan','ybsl_010zhouyue',
					'ybsl_011gaoyuhang','ybsl_012zhengjiayi','ybsl_014liutianyu','ybsl_015wanghairu',
					'ybsl_016manchengqi','ybsl_017xiaohong','ybsl_018zhangqing','ybsl_019shengyan','ybsl_020jiayutong',
					'ybsl_021liuyufeng','ybsl_022salt','ybsl_024yuetong','ybsl_025shiwang','ybsl_025shiqingyu',
					'ybsl_025wanghe','ybsl_032baiyichen','ybsl_033xiaohui',/*'ybsl_023shiqingyu',*/
					'ybsl_042pingzi','ybsl_043fangjiayu','ybsl_044huruihang','ybsl_045gaocong',
					'ybsl_046jiangxuewu','ybsl_047shan','ybsl_048wushuang','ybsl_049waner','ybsl_050zunjian',
					'ybsl_051fomalhaut','ybsl_052trees','ybsl_053qiuer','ybsl_054yueer','ybsl_055zhengyan',
					'ybsl_056dongjianchao','ybsl_057sunmeiqi','ybsl_058sunshibo','ybsl_059starsFall','ybsl_060liutianhang',
					'ybsl_061zheyu','ybsl_062yuhongyan','ybsl_063weimingli','ybsl_064lvmingyan','ybsl_065yanxiwen',
					'ybsl_066wujun','ybsl_068qingyue','ybsl_070lvyanqiu',
					'ybsl_079xiaoxin','ybsl_082bianqiuwen','ybsl_085DGY','ybsl_086GJ','ybsl_087tianlu',
					'ybsl_088lijiaxin','ybsl_089lvjinling','ybsl_090dengtingyue','ybsl_091wangcaiyu','ybsl_092handan'
				],
				'ybsl_mztz':[
					'ybsl_026can','ybsl_027rain','ybsl_028crystal','ybsl_029dawn','ybsl_030book',
					'ybsl_031huanqing','ybsl_034zhoulianyuan','ybsl_035stamp',
					'ybsl_036bright','ybsl_037diamondqueen','db_ybsl_038tengwu','ybsl_039zhafu','ybsl_040ether',
					'db_ybsl_067snake','ybsl_069xiangzi','ybsl_076zhujun','ybsl_077yangqixu','ybsl_078zhuyahai',
					'ybsl_081chenli','ybsl_081chensi','ybsl_083xiaozhu','ybsl_084zhangmi'
				],
				//'ybsl_sixp':[],
				'ybsl_dzsl':[
					'dzsl_013yinji','dzsl_014liutianyu'/*,'dzsl_014xinzhikui'*/,'dzsl_015wanghairu',
					'dzsl_016manchengqi','dzsl_017xiaohong'
				],
				'ybsl_spsp':[
					'db_ybsp_014liutianyu','ybsp_016manchengqi','ybsp_072sulingyi','db_ybsp_038tengwu','ybsp_001sunlisong','ybsp_002chenailin','ybsp_027rain'
				],
				'ybsl_sjfk':[
					'ybslshen_014liutianyu','ybslshen_018zhangqing','ybslshen_017xiaohong','ybslshen_002chenailin','ybslshen_071faraway',
					'ybslshen_073Al','ybslshen_074piao','ybsl_075dogcard','ybsl_080phoenix','ybslshen_001sunlisong','ybsl_hairi',
					'ybslshen_100Cosette','sp_key_umi'
				],
				ybsl_jxtp:[
					'ybnb_034zhoulianyuan'
				],
				'ybsl_sgsh':[
					'sgsh_huaxu','sgsh_taizichangqin','sgsh_nvba','sgsh_luohou','sgsh_dongwanggong',
					'sgsh_yinglong','sgsh_xingtian','sgsh_xiwangmu','sgsh_yuqiang','sgsh_dayu',
				],
				'ybsl_mjgx':[
					'dzsl_luxun','ybsl_machao','ybsl_zhouyuxiaoqiao','ybsl_zhanghe','ybslshen_zhenji',
					'ybnb_guanyinping',
				],
				'ybsl_laji':[
					'ybsl_018zhangqing_feian','ybslshen_002chenailin_feian','ybsb_084zhangmi','ybsb_077yangqixu','ybsb_068qingyue','ybsb_048wushuang','ybold_019shengyan',
				],
			},
		},
		character:{ //武将格式 : 
		//------------------------上古神话
			'sgsh_huaxu':['female','shen',3,['sgsh_talei','sgsh_yunyuu'],['rare']],//华胥
			'sgsh_taizichangqin':['male','shen',3,['sgsh_yuefeng','sgsh_zhisheng'],['legend']],//太子长琴
			'sgsh_nvba':['female','shen',3,['sgsh_buyu','sgsh_hanshen'],['epic']],//女魃
			'sgsh_luohou':['male','shen',4,['sgsh_yueshi'],['epic']],//罗睺
			'sgsh_dongwanggong':['male','shen',3,['sgsh_baigong','sgsh_cangling'],['legend']],//东王公
			'sgsh_yinglong':['male','shen',4,['sgsh_zongshui'],['epic']],//应龙
			'sgsh_xingtian':['male','shen',4,['sgsh_fuchou'],['epic']],//刑天
			'sgsh_xiwangmu':['female','shen',3,['sgsh_kunlun','sgsh_huasheng'],['legend']],//西王母
			'sgsh_yuqiang':['male','shen',4,['sgsh_zhihai','sgsh_xuanming'],['junk']],//禺强
			'sgsh_dayu':['male','shen',4,['sgsh_zhishui'],['epic']],//大禹
			//---------------------名将改写
			// 'dzsl_luxun':['male','wu',3,['dzsl_shenhuo','dzsl_buxi','dzsl_shennu'],['forbidai','junk']],//陆逊
			// 'ybsl_zhouyuxiaoqiao':['double','wu',4,['ybsl_xianyin','ybsl_luanming'],['epic']],//周瑜小乔
			// 'ybnb_guanyinping':['female','shu',4,['ybsl_kuwangxx','ybsl_xueji'],['legend']],//关银屏
			//---------------------鬼神易的足迹
			'dzsl_013yinji':['female','YB_memory',3,['dz017_shanwu','dz013_qingling'],['legend']],//尹姬（鬼神易版
			'dzsl_014liutianyu':['male','YB_memory','3/6',['dz014_fuhua','dz014_xinsheng','dz014_xinkui','dz014_zaomeng'],['zhu','legend']],//夜白（鬼神易版
			'dzsl_014xinzhikui':['female','YB_memory',1,['dz017_shanwu','dz014_qingling','dz014_yangkui','dz014_xianji'],['forbidai','unseen','legend']],//心之傀
			'dzsl_015wanghairu':['female','YB_memory',4,['dz015_xianzhe','dz015_tianshu','dz015_shugu','dz015_enguang'],['zhu','epic']],//王海茹（鬼神易版
			'dzsl_016manchengqi':['female','YB_memory',4,['dz016_zanxu','dz017_shanwu'],['epic']],//满城柒（鬼神易版
			'dzsl_017xiaohong':['female','YB_memory',3,['dz017_zhushi','dz017_shanwu'],['legend']],//小红（鬼神易版
			//----------------------忆包正式
			'ybsl_001sunlisong':['female','YB_memory',3,['yb001_fufeng','yb001_wanyue','yb001_beige'/*,'yb001_chuilian'*//*,'yb001_shenian'*/],['epic']],//孙丽松
			'ybsl_002chenailin':['female','YB_memory','3/4',['yb002_ziren','yb002_shangyuan'],['epic']],//陈爱琳
			
			//'ybsl_003yanshuang':['female','YB_memory',3,['yb009_wucai','yb003_toushi','yb003_fenxaing'],[]],//闫爽
			'ybsl_004zhangyujie':['female','YB_memory',3,['yb004_wunv','yb004_tianqi','yb004_shangyuan'/*,'yb004_yujie'*/],['legend']],//张玉洁
			//'ybsl_005wangruobing':['female','YB_memory',4,['yb005_bingqing','yb005_ruyu','yb005_jieshen'],[]],//王若冰//太抽象了…
			'ybsl_005wangruobing':['female','YB_memory',4,['yb005_bingqing','yb005_qianxun','yb005_jieshen'],['legend']],//王若冰
			'ybsl_006wanghanzhen':['female','YB_memory',4,['yb006_boxue','yb006_jufan','yb006_biaoshuai'],['zhu','epic']],//王汉桢
			//'ybsl_007wugege':['female','YB_memory',4,['yb007_renqing','yb007_shigu','yb007_zhengling'],['zhu']],//吴格格
			// 'ybsl_007wugege':['female','YB_memory',4,['yb007_chengyao'],['zhu']],//吴格格
			'ybsl_007wugege':['female','YB_memory',4,['yb007_chenwang'],['epic']],//吴格格
			'ybsl_008wuyuxin':['female','YB_memory',3,['yb009_wucai','yb008_jianwu',/*'yb008_wanyue'*/'yb008_zhenxin'],['epic']],//吴雨欣
			'ybsl_009liyushan':['female','YB_memory','2/3/1',['yb009_wucai','yb009_tuling','yb009_tulinghuaqi'/*,'yb009_zhendian'*/],['epic']],//李玉珊
			//'ybsl_010zhouyue':['female','YB_memory',3,['yb009_wucai','yb010_zheye','yb010_juxing'],[]],//周玥第一版
			//'ybsl_010zhouyue':['female','YB_memory',3,['yb009_wucai','yb010_zheye','yb010_zhusui'/*,'yb010_xingxian'*/],[]],//周玥第二版
			'ybsl_010zhouyue':['female','YB_memory',3,['yb010_yeyu','yb010_zheye','yb010_mingzhu'],['epic']],//周玥第三版
			//'ybsl_011gaoyuhang':['female','YB_memory',3,['yb011_kongbai','yb011_chenxing'/*,'yb011_yinmeng','yb011_hen'*/],[]],//高宇航
			'ybsl_011gaoyuhang':['female','YB_memory',3,['yb011_lijian','yb011_jueleng'],['epic']],//高宇航二版
			'ybsl_012zhengjiayi':['female','YB_memory',3,['yb012_bianqian','yb012_xibei','yb012_suotu'],['epic']],//郑佳怡
			
			
			
			//'ybsl_015wanghairu':['female','YB_memory',4,[/*'技能'*/],[]],//王海茹
			'ybsl_016manchengqi':['female','YB_memory',4,['yb016_juli','yb016_shenzou'],['epic']],//满城柒（新版
			'ybsl_017xiaohong':['female','YB_memory',3,['yb017_chuanxin','yb017_zuigui'],['legend']],//小红（新版
			'ybsl_018zhangqing':['female','YB_memory',3,['yb018_huaimeng','yb018_minxing','yb018_fanling'],['legend']],//张晴
			'ybsl_019shengyan':['female','YB_memory',4,['yb019_cutan','yb019_misan','yb019_renxing','yb019_chicu'],['rare']],//盛妍
			//'ybsl_020jiayutong':['female','YB_memory',3,['yb020_shange','yb020_wanyue','yb020_yuyun'],[]],//贾雨桐
			'ybsl_021liuyufeng':['male','YB_memory',3,['yb021_shusuan','yb021_qiujiao'],['epic']],//刘域楓
			'ybsl_022salt':['female','YB_memory',3,['yb022_yiduan',/*'yb022_yaogong',*/'yb022_duanxiangxin'],['epic']],//盐
			//'ybsl_023shiqingyu':['female','YB_memory',12,[/*'技能'*/],[]],//史庆宇
			//'ybsl_024yuetong':['female','YB_memory',4,[/*'技能'*/],[]],//岳瞳
			//'ybsl_025shiwang':['female','YB_memory',3,['yb025_mojiang','yb025_zanzhu'],[]],//史庆宇&王贺
			//'ybsl_025shiqingyu':['female','YB_memory',12,[/*'技能'*/],[]],//史庆宇
			//'ybsl_025wanghe':['female','YB_memory',3,[/*技能*/],[]],//王贺
			'ybsl_026can':['female','YB_dream',3,['yb026_xiaoye','ybsl_sanmeng'],['rare']],//梦——蚕
			'ybsl_027rain':['female','YB_dream',3,['yb027_jisi','ybsl_sanmeng'],['epic']],//梦——雨
			'ybsl_028crystal':['male','YB_dream','3/6',['yb028_jianzhen','yb028_sheshen','ybsl_sanmeng'],['legend']],//梦——晶
			'ybsl_029dawn':['female','YB_dream',3,['yb029_chonghui','ybsl_sanmeng'],['rare']],//梦——黎
			//'ybsl_030book':['female','YB_dream',4,['yb030_jiangdao','ybsl_sanmeng'/*,'yb030_lunyi'*/],[]],//梦——书
			'ybsl_031huanqing':['female','YB_dream',3,['yb031_lihun','yb031_wanyue','ybsl_sanmeng'],['epic']],//梦——幻晴
			//'ybsl_032baiyichen':['female','YB_memory',3,['yb032_tonglv','yb032_zhuiji','yb032_duanchang'],[]],//白衣尘
			'ybsl_033xiaohui':['female','YB_memory',3,['yb033_huiyue'/*,'yb033_shuhui','yb033_yuqi','yb014_lvxin'*/],['legend']],//小慧
			'ybsl_034zhoulianyuan':['male','YB_dream',3,['yb034_bifa','yb034_jiandao','ybsl_sanmeng'],['rare']],//梦——周怜渊
			//'ybsl_035stamp':['male','YB_dream','2/3',['yb035_zhengzhao','yb035_jitian','yb035_liuwang'/*,'yb035_weiyan'*/],[]],//梦——玺
			//'ybsl_036bright':['female','YB_dream',3,['yb036_qianjin','yb036_chongzheng','yb036_aoxiang','ybsl_sanmeng'],[]],//梦——熙
			'ybsl_037diamondqueen':['female','YB_dream',6,['yb037_yizhong','yb037_kexie','yb037_guiling','ybsl_sanmeng'],['rare']],//梦——方块Q
			'db_ybsl_038tengwu':['female','YB_dream','3/4',['yb038_quanlu','ybtq_fusheng','ybsl_sanmeng'],['doublegroup:YB_memory:YB_dream','legend']],//梦——滕叔颖＆武宁
			'ybsl_039zhafu':['male','YB_dream',3,['yb039_zhifu','yb039_feiyan','ybsl_sanmeng'],['epic']],//梦——查符
			'ybsl_040ether':['male','YB_dream',3,['reqicai','yb040_xuyuan','yb040_jumeng'],['legend']],//梦——安以
			//原慕琴在此
			'ybsl_042pingzi':['female','YB_memory',3,['yb042_sizhi','yb042_mingtui','yb042_lisheng'],['epic']],//蘋姉蘋姉蘋姉
			//'ybsl_043fangjiayu':['female','YB_memory',3,[/*'技能'*/],[]],//房佳瑜
			//'ybsl_044huruihang':['female','YB_memory',3,[/*'技能'*/],[]],//胡瑞航
			//'ybsl_045gaocong':['female','YB_memory',3,[/*'技能'*/],[]],//高聪
			//'ybsl_046jiangxuewu':['female','YB_memory',3,[/*'技能'*/],[]],//江雪舞
			'ybsl_047shan':['female','YB_memory',3,['yb047_youhun','yb047_wanxin','yb047_shouqing'],['legend']],//彡
			'ybsl_048wushuang':['female','YB_memory',3,['yb048_zhimeng','yb048_shennv','yb048_minzhen'],['legend']],//吴爽
			//'ybsl_049waner':['female','YB_memory',3,[/*'技能'*/],[]],//王婉儿
			//'ybsl_050zunjian':['female','YB_memory',3,[/*'技能'*/],[]],//鐏柬
			//'ybsl_051fomalhaut':['male','YB_memory',3,[/*'技能'*/],[]],//北落师门
			//'ybsl_052trees':['male','YB_memory',3,[/*'技能'*/],[]],//姜森
			'ybsl_053qiuer':['female','YB_memory',3,['yb053_lvxin','yb053_yinren'],['legend']],//秋儿
			'ybsl_054yueer':['female','YB_memory',3,['yb054_caijin','yb054_tongxin','yb054_zhishang'],['epic']],//悦儿
			//'ybsl_055zhengyan':['female','YB_memory',3,[/*'技能'*/],[]],//郑琰
			//'ybsl_056dongjianchao':['male','YB_memory',3,[/*'技能'*/],[]],//董建超
			//'ybsl_057sunmeiqi':['female','YB_memory',3,[/*'技能'*/],[]],//孙美琪
			//'ybsl_058sunshibo':['male','YB_memory',3,[/*'技能'*/],[]],//孙世博
			'ybsl_059starsFall':['female','YB_memory',4,['yb059_huiguang','yb059_xingshi'],['legend']],//星落四公主
			'ybsl_059starsFall1':['female','YB_memory',4,['yb059_guanhong'],['unseen','legend']],//鞠熒
			'ybsl_059starsFall2':['female','YB_memory',4,['yb059_zhuotan'],['unseen','legend']],//宋橤
			'ybsl_059starsFall3':['female','YB_memory',4,['yb059_qingliu'],['unseen','legend']],//周靈
			'ybsl_059starsFall4':['female','YB_memory',4,['yb059_pingyu'],['unseen','legend']],//李曉
			//'ybsl_060liutianhang':['female','YB_memory',3,[/*'技能'*/],[]],//刘天杭
			//'ybsl_061zheyu':['male','YB_memory',3,[/*'技能'*/],[]],//哲宇
			//'ybsl_062yuhongyan':['male','YB_memory',3,[/*'技能'*/],[]],//于洪岩
			//'ybsl_063weimingli':['male','YB_memory',3,[/*'技能'*/],[]],//魏铭利
			//'ybsl_064lvmingyan':['male','YB_memory',3,[/*'技能'*/],[]],//吕明岩
			//'ybsl_065yanxiwen':['male','YB_memory',3,[/*'技能'*/],[]],//阎锡文
			//'ybsl_066wujun':['female','YB_memory',3,[/*'技能'*/],[]],//武筠
			'db_ybsl_067snake':['female','YB_dream',4,['yb067_chanqing','yb067_kuiyi','ybsl_sanmeng'],['doublegroup:YB_memory:YB_dream','legend']],//蛇妃
			'ybsl_068qingyue':['female','YB_memory',3,['yb010_mingzhu','yb068_chenyu','yb068_yingxian'],['legend']],//清月姑娘
			'ybsl_069xiangzi':['female','YB_dream',3,['yb069_yaomian','yb069_wenhuan','ybsl_sanmeng'],['epic']],//香紫
			'ybsl_070lvyanqiu':['female','YB_memory',3,['yb070_queshi','yb070_meiying','yb070_fuyi'],['legend']],//吕艳秋
			//071想去远方
			//072苏令燚
			//073铝宝
			//074花落隨風
			'ybsl_075dogcard':['male','shu',3,['yb075_quanke','yb075_wuma','yb075_qianma'],['rare']],//苟卡
			'ybsl_076zhujun':['female','YB_dream',3,['yb076_suiyan','yb076_zhenlie','ybsl_sanmeng'],['legend']],//朱焌
			// 'ybsl_077yangqixu':['male','YB_dream',3,['yb077_shensu','yb077_yingmu','ybsl_sanmeng'],['rare']],//羊祈絮
			'ybsl_077yangqixu':['male','YB_dream',3,['yb077_shensu','yb077_jibu','ybsl_sanmeng'],['epic']],//羊祈絮
			'ybsl_078zhuyahai':['male','YB_dream','3/4',['yb078_yaoyan','ybsl_sanmeng'],['legend']],//朱涯海
			// 'ybsl_079xiaoxin':['female','YB_memory',3,['yb079_qingnian','yb079_jinran'],['length']],//小新
			'ybsl_080phoenix':['none','YB_memory',3,['yb080_huayu','yb080_niepan'],['legend']],//凤
			// 'ybsl_081chenli':['female','YB_dream',3,['yb081_lvxin','yb081_shanhui'],[]],//陈丽
			// 'ybsl_081chensi':['female','YB_dream',3,['yb081_sishi','yb081_yinmeng'],[]],//陈思
			'ybsl_082bianqiuwen':['female','YB_memory',3,['yb047_youhun','yb082_chameng'],['epic']],//卞秋雯
			// 'ybsl_083xiaozhu':['female','YB_dream',3,['yb083_shenshou','ybsl_sanmeng'],['epic','unseen']],//小筑
			'ybsl_084zhangmi':['female','YB_dream',3,['yb084_xundu','yb084_efei','yb084_pomeng'],['legend']],//张汨
			'ybsl_085DGY':['female','YB_memory',3,['yb085_muyuan','yb085_cibie'],['legend']],//独孤雨
			// 'ybsl_086GJ':['female','YB_memory',3,[],['epic']],//龚洁
			// 'ybsl_087tianlu':['female','YB_memory',3,[],['epic']],//田璐
			// 'ybsl_088lijiaxin':['female','YB_memory',3,[],['epic']],//李嘉欣
			// 'ybsl_089lvjinling':['female','YB_memory',3,[],['epic']],//吕金玲
			// 'ybsl_090dengtingyue':['female','YB_memory',3,[],['epic']],//邓婷月
			// 'ybsl_091wangcaiyu':['female','YB_memory',3,[],['epic']],//王彩钰
			// 'ybsl_092handan':['female','YB_memory',3,[],['epic','hiddenSkill']],//韩丹
			// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
			// 'ybsl_094cat':['female','YB_memory',3,[],['epic']],//猫猫
			// 'ybsl_095cat':['female','YB_memory',3,[],['epic']],//猫猫
			// 'ybsl_096cat':['female','YB_memory',3,[],['epic']],//猫猫
			// 'ybsl_097cat':['female','YB_memory',3,[],['epic']],//猫猫
			// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
			// 'ybsl_099cat':['female','YB_memory',3,[],['epic']],//猫猫
			// 100珂赛特
			
			//----------------------夜白界限突破（能更新出这个系列离不开大家不离不弃的支持）
			'ybnb_034zhoulianyuan':['male','YB_dream',3,['yb034_rebifa','yb034_rejiandao','ybsl_sanmeng'],['epic']],//梦——界周怜渊
			//----------------------忆包SP（所谓SP，其实是一种创意的异构，难免参差不齐）
			'db_ybsp_014liutianyu':['male','shen','3/6',['yb014_yingbian','yb014_yazhi'],['doublegroup:YB_memory:shen','legend']],//SP夜白
			'ybsp_016manchengqi':['female','YB_memory',3,['yb016_xianyue','yb016_tianliao','yb016_qingjie','yb016_pojie'],['epic']],//SP满城柒（其实是清明节设计的，机制很清奇但貌似很弱）
			'ybsp_072sulingyi':['female','qun',3,['yb072_ezhao','yb072_toujiang'],['epic']],//SP苏令燚
			'db_ybsp_038tengwu':['female','YB_dream','3/4',['yb038_quanlu','yb038_fusheng','ybsl_sanmeng'],['doublegroup:YB_memory:YB_dream','legend']],//SP滕叔颖＆武宁（其实是旧案）
			'ybsp_002chenailin':['female','YB_memory','3/4',['yb002_touxin','yb002_zheye','yb002_yishui'],['epic']],//SP陈爱琳（其实是旧案）
			'ybsp_027rain':['female','YB_dream',3,['yb027_mili','ybsl_sanmeng'],['rare']],//梦——雨
			'ybsp_001sunlisong':['female','YB_memory','3/4',['yb001_yongyue','yb001_haowan'],['epic']],//孙丽松
			//----------------------忆包神将
			'ybslshen_014liutianyu':['male','shen','3/5',['yb014_shizhui','ybsl_xuxian'],['YB_memory','legend']],//神夜白
			'ybslshen_017xiaohong':['female','shen',3,['yb017_mizhu','yb017_guangzhu','yb017_zhenshi','ybsl_xuxian'],['YB_memory','legend']],//神小红
			'ybslshen_018zhangqing':['female','shen',3,['yb018_newisi','yb018_chongmeng','yb018_yisi','ybsl_xuxian'],['YB_memory','legend']],//神张晴
			'ybslshen_002chenailin':['female','shen','3/4',['yb002_yiqu','yb002_shangyuan','ybsl_xuxian'],['YB_memory','legend']],//神陈爱琳
			'ybslshen_071faraway':['male','shen','2/3',['ybsl_xinghen','ybsl_cuixing','ybsl_xinghui','ybsl_xingbian'],['YB_memory','legend']],//神远方
			'ybslshen_073Al':['female','shen','1/6',['ybsl_duanzui','ybsl_zhenhun','ybsl_kunyu'],['YB_memory','legend']],//铝
			// 'ybslshen_074piao':['female','shen',4,['ybsl_guanxing','ybsl_tianwen'/*,'ybsl_guayao'*/],['YB_memory','legend']],//花落隨風
			'ybslshen_001sunlisong':['female','shen',3,['yb001_minglun','yb001_haowan'],['YB_memory','legend']],//孙丽松
			'ybslshen_100Cosette':['female','shen',3,['yb100_lieshi','yb100_dianzhan','yb100_huanyin'],['YB_memory','legend','clan:颍川荀氏']],//珂赛特
			ybslshen_zhenji:['female','shen',3,['ybsl_zjzilian','ybsl_zjsqiyuan','ybsl_zjsshixiang'],['wei','legend']],
			ybsl_hairi:['male','key',1,['hairi_shangshi','hairi_zheyi','hairi_zhongxia'],['epic']],
			sp_key_umi:['female','key',3,['caiyi','guili'],['epic']],
			//----------------------忆包废案
			'ybslshen_002chenailin_feian':['female','shen','3/4',['yb002_yiqu','ybold_shangyuan','ybsl_xuxian'],['YB_memory','forbidai','legend']],//废稿神陈爱琳
			'ybsl_018zhangqing_feian':['female','YB_memory',3,['yb018_huaimeng','yb018_yinsi'],['forbidai','epic']],//废稿张晴
			'ybsb_084zhangmi':['female','YB_dream',3,['yb084_xundu','yb084_efei','yb084_pomen'],['epic']],//通渠张汨
			'ybsb_077yangqixu':['male','YB_dream',3,['yb077_shensu','yb077_yingmu','ybsl_sanmeng'],['rare']],//羊祈絮
			'ybsb_068qingyue':['female','YB_memory',3,['yb010_mingzhu','yb068_chenyu','yb068_jingyue'],['rare','forbidai']],//清月姑娘
			'ybsb_048wushuang':['female','YB_memory',3,['yb048_ningyuan','yb048_wuling','yb048_huanjie'],['legend']],//吴爽
			//'ybsl_hejiezhe':['female','YB_memory',3,['ybsl_hejie'],['forbidai']],//
			//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
		},//武将（必填） 
		characterIntro:{
			//---------------------------------//上古神话
			'sgsh_huaxu':'<font color=cyan>上古神话-001</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无<br>&nbsp;&nbsp;华胥氏，简称华胥，最早见于《列子·黄帝》。相传是中国上古时期母系氏族部落的一位杰出女首领。是伏羲与女娲之母。她生在一个叫华阳的地方，有了华胥后改名(华胥国)，古往今来，上百种中华典籍中均记载着一个叫华胥氏的氏族女首领及其儿女伏羲、女娲的故事。中国建国初期的多位朴素主义学者相信，华胥氏的历史比黄帝还要长得多。华胥国的传统服饰为长袍，即国服、华服，后来发展成为具有长袍特点的汉服，也与华胥国有关。<br><br>&nbsp;&nbsp;神话所记录的是一个民族早期的唯心世界观，以纪念族群中做过特别重大贡献的部落群体和首领。越朴实的神话，还原的早期先民生活和思想就越可信。<br><br>&nbsp;&nbsp;--来自搜狗百科',//华胥
			'sgsh_taizichangqin':'<font color=cyan>上古神话-002</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无<br>&nbsp;&nbsp;太子长琴，《山海经》记载之神话人物。火神祝融的儿子，传说他出生的时候怀中抱着一把小琴，天地都因为他的出生而欢唱。<br><br>&nbsp;&nbsp;颛顼生老童，老童生祝融，祝融生太子长琴，传说太子长琴精于乐道，能使五色鸟舞于庭中。《左传》记载：“有五只彩鸟：一只叫皇鸟，一只叫鸾鸟，一只叫凤鸟，听见琴音就会翩翩起舞。<br><br>&nbsp;&nbsp;--来自搜狗百科”',//太子长琴
			'sgsh_nvba':'<font color=cyan>上古神话-003</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无<br>&nbsp;&nbsp;女魃是神话中的旱神，亦作“女妭”，她穿青衣，居住在赤水之北。<br><br>&nbsp;&nbsp;女魃在黄帝攻打蚩尤时有着巨大作用，蚩尤起兵攻打黄帝，黄帝令应龙进攻冀州，蚩尤请来风伯雨师，以狂风骤雨对付应龙部队，于是，黄帝令女魃助战，她阻止了大雨，最终助黄帝赢得战争。<br><br>&nbsp;&nbsp;--来自搜狗百科',//女魃
			'sgsh_luohou':'<font color=cyan>上古神话-004</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无<br>&nbsp;&nbsp;罗睺是印度神话中的阿修罗之一，是达耶提耶王毗婆罗吉提（Vipracitti）与辛悉迦（Simhika，达刹之女）的儿子。罗睺经常吞食日月，造成日蚀和月蚀，当日月在他敞开的喉头走出，蚀便完结。罗睺又被称为“行星、流星之王”，西南方的守护神；他长有四只手，下半身为蛇尾，好为非作歹。<br><br>&nbsp;&nbsp;--来自搜狗百科',//罗睺
			'sgsh_dongwanggong':'<font color=cyan>上古神话-005</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无<br>&nbsp;&nbsp;东王公（别称扶桑大帝、青童君等），中国神话中的仙人，与西王母相对应，统率所有男仙。东王公为道教尊神，战国时期，楚地信仰的“东皇太一”神，为东王公之前身；《真灵位业图》将其排在上清左位，号曰“太微东霞扶桑丹林大帝上道君”。<br><br>&nbsp;&nbsp;郭沫若在《卜辞中的古代社会》一文中就说：“神话传说中人物，一人化为二人以上，一事化为二事以上，乃古今中外常有之事。”<br><br>&nbsp;&nbsp;--来自搜狗百科',//东王公
			'sgsh_yinglong':'<font color=cyan>上古神话-006</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无<br>&nbsp;&nbsp;应龙，名叫庚辰，是古代中国神话传说中的创世神、造物神，作为一种有翼的龙出现于神话，同时也是真龙与龙族始祖，亦作黄龙、飞龙。传说鱼虾喝一口应龙的尿就能成为真龙。<br><br>&nbsp;&nbsp;先秦记载中，只存在一条应龙，名为庚辰，本居于天上世界，开辟了大地，生下了凤凰、麒麟。是助黄帝争帝而捕猎夔牛，独战虎、豹、熊、罴四兽，于南极杀蚩尤、斩夸父，最后与黄帝飞升；助大禹治水而再度下凡，以龙尾画地成江，开龙门、擒无支祁、捉拿相柳的无双战神，训练了中国第一支骑兵，撰写了十二生肖名表。直到商代都仍有帝王祭祀应龙。<br><br>&nbsp;&nbsp;传说应龙不死，是一尊曾于混沌划分阴阳、孵化创世神盘古的巨神，她的泪水形成了阴间黄泉，还有传说她化身成了天上的星座。<br><br>&nbsp;&nbsp;同时，应龙庚辰也是于五方主中央、五行司土的，云雨雷霆之神、沟渎河川之神、天龙之神，号曰顺天佑畿辅时应龙神的太一之妃，是活跃在先秦神话中的神明。<br><br>&nbsp;&nbsp;后世星经中，应龙更成为了司四季、司中岳、司中土、司黄河、长江、汉水、淮河、济水、司黄帝之子孙、司倮虫三百六十的天神。<br><br>&nbsp;&nbsp;--来自搜狗百科',//应龙
			'sgsh_xingtian':'<font color=cyan>上古神话-007</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无<br>&nbsp;&nbsp;刑天是中国古代神话传说人物之一，是炎帝手下一员大将，与黄帝大战时，被砍掉脑袋，因此称为“刑天”，意为“形体夭残”。其记载于《山海经·海外西经》中，真实性学界一直有所争议，原本可能是华夏族无名神祇。<br><br>&nbsp;&nbsp;据甲骨文和金文记载，刑天为一人形符号，为氏族部落的象征图腾。在《山海经》的原本记载，称作“形天”，而“刑天”之得名，为陶渊明所改，其诗中“刑天舞干戚”一词，可能因传抄错误而有“刑天舞干戚”与“形夭无千岁”二说。<br><br>&nbsp;&nbsp;--来自搜狗百科',//刑天
			'sgsh_xiwangmu':'<font color=cyan>上古神话-008</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无<br>&nbsp;&nbsp;道教创立以后，西王母被纳入神系，成为道教至高无上的女神。民间俗称“王母娘娘”。“西王母”的称谓，始见于《山海经》，因所居昆仑丘于汉中原为西，故称西王母。<br><br>&nbsp;&nbsp;--来自搜狗百科',//西王母
			'sgsh_yuqiang':'<font color=cyan>上古神话-009</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无<br>&nbsp;&nbsp;禺强（yú qiáng）是传说中的风神、冬神，字玄冥。可以传播瘟疫，人面鸟身，用两条青蛇穿在耳朵上做装饰，踩着两条红色的蛇。<br><br>&nbsp;&nbsp;冬至之时，《史记》上记载，汉朝时要有七十个童男童女一起唱《玄冥》之歌，以此来祭祀冬神禺强。<br><br>&nbsp;&nbsp;--来自搜狗百科',//禺强
			'sgsh_dayu':'<font color=cyan>上古神话-010</font><br>♦︎技能设计：夜白<br>♦︎代码撰写者：夜白<br>♦︎插图：网图<br>♦︎配音：暂无<br>&nbsp;&nbsp;大禹，姓姒，名文命，字（高）密，是黄帝的玄孙、颛顼的孙子（另一说为颛顼六世孙），其父名鲧，其母为有莘氏之女脩己，为夏后氏首领、夏朝开国君王，因治理滔天洪水而广受世人传颂。<br><br>&nbsp;&nbsp;相传，禹治理黄河有功[1]，受舜禅让而继承帝位，以阳城为都城（另有说都城是平阳或安邑或晋阳），国号夏，并分封丹朱于唐，分封商均于虞，又划定中国版图为九州。禹死后安葬于会稽山上（今浙江绍兴），现仍存禹庙、禹陵、禹祠。<br><br>&nbsp;&nbsp;--来自搜狗百科',//大禹

			//---------------------------------//名将改写
			'ybsl_zhouyuxiaoqiao':'详见本体龙凤。',//周瑜小乔
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
			'ybsl_001sunlisong':'<font color=cyan>忆-001·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>孙丽松，原型为同名本人，陈爱琳和王汉桢的闺蜜，六中三班的一员。不算太熟，但隐约记得关系还不错，言行举止令人如沐春风。</span>',
			'ybsl_002chenailin':'<font color=cyan>忆-002·凄愁哀婉</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>留点什么吧，聊做分别之后的怀念。<br/><span class=thundertext>陈爱琳，原型为同名本人，六中三班的一员，作者（以下称我）对那段时光最美好的回忆。以下文段为忆陈爱琳文。文本几经修改，终成定稿。对话原话不太记得了，因此用意义相同或相近的文言说法。</span><br><span class=firetext>注：文段受岁月滤镜影响，存在某处虚写。事实无论，吾言即是。</span><br><span class=yellowtext>久别不见，故作文怀之。<br>陈氏女，名爱琳，不知生年，癸巳年入初中，与之遇。孙氏女，名丽松，王氏女，名汉桢，皆为陈友。吾与之事实繁，然皆不记忆，依稀几数，至今铭心。<br>一日，学政治，谈男女往来，毕，吾谓陈曰：“男女具，身心益。”，<span style="opacity:0.1;">（男生女生在一起，有益健康）这是我记得的为数不多的原话。请允许我把这句话藏起来，毕竟现在想想太羞耻了，抓紧忘了吧我天。</span><br>三女具嗤，道：“淫嬷嬷”，乃去。<br>初识，吾与陈并列第三，师谓曰：“汝二人，定分高下。”及试，座临。考历史，陈密索一字。吾以此挟，索屈原事迹，附：吾二人，定分高下。出榜，陈三吾七，陈笑，顾二女曰：“才道，定分高下。”余赤面而去。<br>一日，学语文，讲柳宗元之小石潭记，校音，及“壹”，吾和曰：仅旧版钱有之。满堂皆笑。师曰：“汝视之。”余惑，遂取钱视之，乃悟，遂羞而掩面。</span><span class=firetext>注：岁月的滤镜下，吾总觉陈之笑最甚。事实无论，吾言即是。</span><br><span class=yellowtext>彼时，偶见之以美工刀划臂。便私书之：“书曰：珍己，勿伤。”陈惶，书，顾左右而传之。启之，曰：“无宣，令师知也。”余内笑，回曰：“莫如此也。”对曰：“善。”此事揭过。<br>一日，与人冲突，因果皆不记忆。其人名姜玉恒。冲吾，使吾跌。余奋极，恰右有棍，遂操棍挺身抡之，中头，棍折，余怒尚在，幸观者分之，而姜步罗圈，道：没事。待定，回味此棍，复操之以试击，仿佛为要害也，及顾而问陈：“如此，是耶？”陈惊，颔而应之。吾才省，知此事惧之也。师知，谓皆有过，遂不提。<br>一日，学英语，点我名。有灯垂于梁。余起欲答，忽身失衡，刹那而仰，见灯如柳摇曳，方知地动。当是时，警铃鸣，楼摇轰，脚踏声，一时齐发，不可辩也。余乃惊，携冠欲潜桌下，师曰：“不坚！”遂随流而下。及远，乃检冠中钱，未损。乃假七日。<br>稍定，一日语文课，有联曰：殷殷舔犊情。无人能对。余上而书：情情抚挚颊。盖断错句、解错意也。乃顾陈，以示炫耀。师不可解，曰：“上联言亲情，下联言爱情，稍欠。”余亦觉欠，然无益者。<br>某晚，尚余一刻钟。余沉思，师曰：“复地动乎？”余闻轰，以为移案。师曰：“莫不是窗动？不详。”言讫，始觉轰声愈响，坐不稳，忽闻铃震，皆慌而走。始静，复检冠中钱。顾陈，亦无恙。乃假一月。<br>某日，吾二人独处于室，随心而谈，曰：“汝敛袖，吾欲检之。”乃奋袖出臂。余观之，无痕。其肤白而美，余难耐而抚之，遂怦然心动。陈忽道：“你多久没剪指甲？”吾曰：“四月。”陈默。良久，乃曰：“今周五，周六周日你洗澡剪指甲，周一我检查。则赐一车饼干。”乃信之。然懒惰成性，终未成，此为后话。当晚归家，母曰：“汝父欲使汝北还续学，何如？”余道：“安乐与此，何故北还？”母曰：“汝藉在北。若留需迁藉易姓。”余决然道：“大丈夫，岂能易姓？吾当北还。”乃定甲午秋北还续学。复无相见，甚念之矣。<br>丁酉，业毕。余南下归故校，觅旧师，叹往昔。问及诸友，则曰：“王汉桢入三中，孙丽松入实验……”独不见陈爱琳。问之，则叹曰：“汝去，即堕。吾见其与众男厮，恐其安危，遂告教导主任，岂料教导主任因其男女关系不当，记其大过。爱琳恨我。顷之辍学，不复见也。”<br>余闻之，甚悲。实意料之外，又情理之中。倘吾异姓而拒北，迁藉而居南，定有挽澜之机。虽吾今有知，然知者何如？不知者何如？知深而乐衰，视广而情短，悲哉！<br>念君，恬静，不知。<br>殷殷舔犊情，浅浅执手意。<br>安否？佳祺。</span><br><span class=thundertext>谨以此文，祭年少无知。<br>我不会主动去寻觅失散的人，也不会去追问她们后来怎样。她们在我印象中留下的美丽的足迹，对我而言已经是宝贵的财富。这份回忆足以温暖我一生。</span>',
			'ybsl_003yanshuang':'<font color=cyan>忆-003·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>闫爽，原型为同名本人，民主小学小饭桌的学妹。那天白天我们买了大量零食，但都存放在小饭桌的冰柜上。当天晚上，我们一行人因为床位不够而临时混入一屋。闲来无聊，便派出一人前去偷偷地拿来零食（遗憾的是，那天晚上的人除了闫爽，其他人都不记得名字了），我们一同享用着。他们吃完就休息了。<br>而我却有些悲催，居然不知吃错啥了，居然吐了起来。为了掩人耳目，我吐在了两床空隙靠墙的地方，遗迹三天后开始有味，又过了好久才被发现。</span>',
			'ybsl_004zhangyujie':'<font color=cyan>忆-004·似水流年</font><br>❁技能设计：夜白<br>❁代码撰写者：夜白<br>❁插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❁配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>张玉洁，原型为同名本人，童年时期吴爽的跟班，和吴爽一同织造了个幻想的世界哄我玩。后来不知去向。</span>',
			'ybsl_005wangruobing':'<font color=cyan>忆-005·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>王若冰，原型为同名本人，民主小学时期的舍友，兼六中一班的一员。事迹不详，但隐约记得关系还不错。</span>',
			'ybsl_006wanghanzhen':'<font color=cyan>忆-006·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>王汉桢，原型为同名本人，六中三班一员，经选举任职班长。陈爱琳和孙丽松的闺蜜。成绩也是名副其实的第一。不算太熟，但隐约记得关系还不错。</span>',
			'ybsl_007wugege':'<font color=cyan>忆-007·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>吴格格，原型为同名本人，民主小学时期的同班同学，同时也是六中三班的同学。事迹不详，但隐约记得关系还不错。任职为语文课代表。曾在一次收作业时以老同学的名义宽限了我几分钟。</span>',
			'ybsl_008wuyuxin':'<font color=cyan>忆-008·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>吴雨欣，原型为同名本人，民主小学时期同学。常穿桃粉色衣服。关系不错，与高宇航，李玉珊一起被我称为高无理（后来加入了周玥，变成了毫无厘头的高无理周）。几人常与我玩耍（其实就是几个人轮班拉扯我。不知为何很快乐，现在想想也很快乐。）。升入初中后分别，不知去向。</span>',
			'ybsl_009liyushan':'<font color=cyan>忆-009·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>李玉珊，原型为同名本人，民主小学时期同学。常衣服的颜色现已忘记。关系不错，与高宇航，吴雨欣一起被我称为高无理（后来加入了周玥，变成了毫无厘头的高无理周）。几人常与我玩耍（其实就是几个人轮班拉扯我。不知为何很快乐，现在想想也很快乐。）。升入初中后分别，不知去向。</span>',
			'ybsl_010zhouyue':'<font color=cyan>忆-010·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>周玥，原型为同名本人，民主小学时期同学，常穿蓝色衣服。因为我看见“玥”就莫名想起“钥”字，故而被我取外号为“钥匙”。后来加入了高无理，一同与我玩耍（其实就是几个人轮班拉扯我。不知为何很快乐，现在想想也很快乐。）。升入初中后分别，不知去向。</span>',
			'ybsl_011gaoyuhang':'<font color=cyan>忆-011·似水流年</font><br>❈技能设计：夜白<br>❈代码撰写者：夜白<br>❈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❈配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>高宇航，原型为同名本人，民主小学时期同学，兼六中三班一员。常穿青苹果色衣服。关系不错，与吴雨欣，李玉珊一起被我称为高无理（后来加入了周玥，变成了毫无厘头的高无理周）。几人常与我玩耍（其实就是几个人轮班拉扯我。不知为何很快乐，现在想想也很快乐。）。升入初中后曾离间我和小张鑫，后来关系渐淡。</span><br><span class=yellowtext>（所以，时刻见到老同学相比于彻底成为回忆而言，真的是好事吗？）</span>',
			'ybsl_012zhengjiayi':'<font color=cyan>忆-012·似水流年</font><br>❈技能设计：夜白<br>❈代码撰写者：夜白<br>❈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❈配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>郑佳怡，原型为同名本人，民主小学时期同桌，兼六中一班的一员。曾在小学时期的一次考试中欲要作弊，被我阻止。关系不错，但升入初中后关系渐淡。</span>',
			'ybsl_013yinji':'<font color=cyan>忆-013·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>尹姬，原型为尹超跃，六中三班一员，体操领操员。曾与我一同领操表演节目。曾一次失手用书夹划伤我手臂，伤疤至今依旧留在我手臂。其余事迹不详。</span>',
			'ybsl_014liutianyu':'<font color=cyan>忆-014·似水流年</font><br>✿技能设计：夜白<br>✿代码撰写者：夜白<br>✿插图：暂无<br>✿配音：暂无<br/>故事仍在继续书写。<br/><span class=thundertext>夜白，原型为作者本人，2019年春自号北地诗仙，2020年春夏自取别名夜白。故事仍在继续书写，也许永无尽头。</span>',
			'ybsl_015wanghairu':'<font color=cyan>忆-015·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>同是天涯沦落人，相逢何必曾相识。<br/><span class=thundertext>王海茹，原型为同名本人，转学后三中的同学，后任职为班长。为人德高望重，所有人都很尊敬她。一部分人尊称其为大姑，原因不详。成绩优异。曾在某次跳远时伤到腰部，其后由郭慧欣背其行动。几乎所有人皆因此而热情帮助她。曾劝解单相思的我，使我迷途得返。至今偶有微信联系。</span>',
			'ybsl_016manchengqi':'<font color=cyan>忆-016·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>若思悔不及，则万念俱成枯。趁你还年轻，他还未老。<br/><span class=thundertext>满城柒，原型保密，转学后三中的同学。曾为我单相思的对象。后来时常打扰她。高中毕业后我彻底醒悟。善于唱歌，常听我诉说。喜欢夸赞别人。</span><br><span class=yellowtext>她只是个倾听者，动歪心思的是我。</span><br><font color=cyan><span style="opacity:0.1;">\u4e5f\u8bb8\u5979\u4e5f\u786e\u5b9e\u8ba4\u771f\u5730\u559c\u6b22\u8fc7\u6211\uff0c\u6bd5\u7adf\u5f53\u65f6\u6211\u8868\u73b0\u51fa\u5bf9\u4e09\u56fd\u6740\u7684\u5174\u8da3\uff0c\u5979\u5c31\u5047\u88c5\u4e5f\u559c\u6b22\u4e09\u56fd\u6740\uff0c\u521b\u9020\u4e0e\u6211\u7684\u5171\u540c\u8bdd\u9898\u3002\u5979\u53ea\u662f\u4e34\u573a\u6076\u8865\u4e00\u756a\u4e09\u56fd\u6740\u77e5\u8bc6\u800c\u5df2\uff0c\u56de\u60f3\u8d77\u90a3\u6bb5\u7ecf\u5386\uff0c\u6211\u53ef\u4ee5\u4e07\u5206\u80af\u5b9a\u3002\u90a3\u4e9b\u5f80\u4e8b\uff0c\u90a3\u4e9b\u7ec6\u8282\uff0c\u90fd\u662f\u90a3\u4e48\u7684\u6295\u6211\u6240\u597d\u3002\u5979\u5728\u90a3\u5e74\u590f\u5929\u4e3a\u6211\u5531\u7684\u6b4c\uff0c\u4ee4\u6211\u6f78\u7136\u6cea\u4e0b\u3002\u4e5f\u8bb8\u662f\u6211\u5e74\u5c11\uff0c\u4e0d\u61c2\u5f97\u8fdb\u9000\u5206\u5bf8\u5427\u3002</span></font><br><span class=yellowtext><br>妙园风雪途·作于2018、12、06<br>妙园风雪会今年，今年风雪会妙园。<br>妙园狭路逢故友，故友踌躇未敢言。<br>日光斜照方寸暖，驻足良久方开口。<br>问我伊人在何方，天自苍寥地自荒。<br>初时故人不自解，解时故人已去远。<br>朔风凛冽寒蝉翼，霜日摇曳嘲晚叶。<br>蝴蝶翩翩绕枝头，蜂虫依依戏牵牛。<br>葵花有意向金乌，松叶不愿轻易哭。<br>伊人有酒未曾吐，诗人佯醉却倾心。<br>染纸相思表赤血，清袖无丝碎真心。<br>诗人歌罢回看酒，酒陈杯新人已累。<br>推杯起身心方醒，人生何处无滋味。<br>醒时已是暮春时，回首才觉伊人醉。<br>诗人已书新赋草，伊人还读旧辞酹。<br>诗人佯醉已走脱，伊人持酒仍痴醉。<br>一曲歌罢梦回醒，诗人伊人皆有泪。<br>此间穿肠千种愧，诗人有愧方觉恨。<br>泪悔前头应有源，犹见孟德与公台。<br>妙园风雪别今年，今年风雪别妙园。<br>妙园宽径独徘徊，故人相见未敢认。</span>',
			'ybsl_017xiaohong':'<font color=cyan>忆-017·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：小红本尊<br/>在她的梦里，化作泡影的人重现。<br/><span class=thundertext>小红，原型保密，转学后三中的同学，为满城柒闺蜜。曾为单相思的我传递书信。为人天真活泼。<span style="text-decoration: line-through;">\u6027\u683c\u548c\u4f5c\u4e3a\u795e\u4f3c\u524d\u671f\u7684\u897f\u56ed\u5bfa\u4e16\u754c\u3002</span>至今关系依旧友好。</span>',
			
			'ybsl_018zhangqing':'<font color=cyan>忆-018·晓月照怀</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>她说她喜欢森林你的寂静与美好。<br/><span class=thundertext>张晴，原型为同名本人，转学后三中的同学。与我关系甚好，高中时常短信沟通。曾取得其QQ号和密码以玩王者，后来其注销了。关系还算不错。</span>',
			'ybsl_019shengyan':'<font color=cyan>忆-019·醋心少女</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>在她的梦里，化作泡影的人重现。<br/><span class=thundertext>盛妍，原型为同名本人，高中时期小红的同学，常因我和小红交谈甚欢而不高兴，我称其为吃醋。如今在为电商引流的路上越走越远。<span style="opacity:0.5;">挣钱嘛，不磕碜。</span></span>',
			'ybsl_020jiayutong':'<font color=cyan>忆-020·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>雨下整夜，我的爱溢出就像雨水，<br/>院子落叶，跟我的思念厚厚一叠，<br/>几句是非，也无法将我的热情冷却，<br/>你出现在我诗的每一页。<br/>——周杰伦《七里香》<br/><span class=thundertext>贾雨桐，原型为同名本人，高中时期同学，喜欢唱歌，<span style="text-decoration: line-through;">&#20307;&#32982;&#65292;</span>天真活泼，经常与我讨论数学题，房某的好朋友（房姓某人还未做出，打算和贾拼个双将）。</span>',
			'ybsl_021liuyufeng':'<font color=cyan>忆-021·似水流年</font><br>❃技能设计：夜白<br>❃代码撰写者：夜白<br>❃插图：暂无<br>❃配音：暂无<br/>还望先生教我~<br/><span class=thundertext>刘域枫，原型为同名本人，转学后三中的同学，一度为我同桌，三国杀同好，喜欢向我讨教数学问题。升入高中后偶有联系，如今渐无联系。</span>',
			'ybsl_022salt':'<font color=cyan>忆-022·暂无称号</font><br>❈技能设计：夜白<br>❈代码撰写者：夜白<br>❈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❈配音：暂无<br/>待填写。<br/><span class=thundertext><span style="opacity:0.3;">盐，原型为六中教导主任，<span style="text-decoration: line-through;">&#23545;&#38738;&#24180;&#30007;&#22899;&#30340;&#20146;&#23494;&#20851;&#31995;&#25104;&#35265;&#26497;&#22823;</span>。那年圣诞节中午，我饭后买了点糖在路上嚼。在校门口二十步的地方，突然想起，早上说过，今天禁止给对象送糖，否则取消本月文明班的评选。我想着省得带进去引起误会，就在原地奋力的吃。就在这时，天杀的教导主任从背后出现，看我拿着糖就火了，不管三七二十一就给我记了。我：？？？回到学校，我果然被通报了。我上去和老师解释了一番，老师也没骂我，<span style="text-decoration: line-through;">&#21453;&#20498;&#21644;&#25105;&#19968;&#21516;&#21457;&#36215;&#20102;&#29282;&#39578;</span>此事就此揭过。后来她还办了一件令人气愤的事，详见陈爱琳简介。</span></span>',
			'ybsl_023shiqingyu':'<font color=cyan>忆-023·心灵守望</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>史庆宇，高中同班同学，关系甚好。</span>',
			'ybsl_024yuetong':'<font color=cyan>忆-024·糖心少女</font><br>❁技能设计：夜白<br>❁代码撰写者：夜白<br>❁插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❁配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>岳瞳，高中朋友，小迷妹一枚。具体事迹不详。上次交流是她拉我进一个赚钱组织。</span>',
			'ybsl_025shiwang':'<font color=cyan>忆-025·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>王贺，高中朋友，史庆宇闺蜜。关系较好。</span>',
			'ybsl_025shiqingyu':'<font color=cyan>忆-025·心灵守望</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>史庆宇，高中同班同学，关系甚好。</span>',
			'ybsl_025wanghe':'<font color=cyan>忆-025·心灵守望</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>王贺，史庆宇闺蜜。</span>',
			'ybsl_026can':'<font color=cyan>忆-026·巡梦回音</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无<br/>你在我的梦里藏匿，笑靥如花。<br/><span class=thundertext>蚕，记2022年6月29日之30日的一场梦。<br>正常人走路直立正着走，梦中的我不一样，后空翻走。并且翻着翻着就飞了。越过一片森林，落在一个三层楼高的草垛上，没刹住车又飞了出去，轨迹未知，落点是一条陌生的街道。回过头接着翻着走，不小心踢到一个丫头脸上。我对其表示歉意，她表示没事，并莞尔一笑。随后她邀我前往她家，是一家面馆。随后不知为何醒了。为了纪念这一场梦，我为其取名为“蚕”，并撰写此武将。</span>',
			'ybsl_027rain':'<font color=cyan>忆-027·巡梦鸣觉</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无<br/>你在我的梦里藏匿，一尘不染。<br/><span class=thundertext>雨，记2022年7月17日之18日的一场梦。<br>这次载入的梦境是一个仿若童年的村落，我遇见了另一个我，但另一个我是女的。我们一起玩耍，其余不记得了。为了纪念这一场梦，我为其取名为“雨”，并撰写此武将。</span>',
			'ybsl_028crystal':'<font color=cyan>忆-028·巡梦回响</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无<br/>你在我的梦里骄傲，殒身化晶。<br/><span class=thundertext>晶，记2022年7月19日之20日的一场梦。<br>这次载入的梦境是一个动物部落，一个象族。族长为了保护族群，变为人形并大施法力，最终成功。但是最后副作用发动，他整个身躯化为水晶。为了纪念这一场梦，我为其取名为“晶”，并撰写此武将。</span>',
			'ybsl_029dawn':'<font color=cyan>忆-029·巡梦长息</font<br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无><br/>你在我的梦里藏匿，扑朔迷离。<br/><span class=thundertext>黎，记2022年7月27日之28日的一场梦。<br>这次载入的梦境具体不详，<span style="text-decoration: line-through;">&#21482&#35760&#24471&#36825&#20011&#22836&#34987&#25105&#22264&#20102</span>只记得仿佛是一场春梦。为了纪念这一场梦，我为其取名为“黎”，并撰写此武将。</span>',
			'ybsl_030book':'<font color=cyan>忆-030·巡梦道演</font><br>★技能设计：夜白<br>★代码撰写者：夜白<br>★插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>★配音：暂无<br/>没有简介可以不写。<br/><span class=thundertext>书，严格来说，她并非我梦到的角色。只是一时心血来潮，就设计了个角色。</span>',
			'ybsl_031huanqing':'<font color=cyan>忆-031·巡梦魅影</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>◈配音：暂无<br/>你在我的梦里藏匿，柔情媚骨。<br/><span class=thundertext>幻晴，记2022年8月11日之12日的一场梦。<br>样貌取自张晴，但性情多了几分妩媚。具体事迹不详。依稀记得也是一场春梦。为了纪念这一场梦，我为其取名为“幻晴”，并撰写此武将。</span>',
			'ybsl_032baiyichen':'<font color=cyan>忆-032·旅者</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>我们……继续携手同行吧。<br/><span class=thundertext>白衣尘，原型为某个萌妹学姐，姓名不详。比我早一年从高中毕业。上学期间常在屯子车上遇见。自2019年夏，其毕业后再未见面。2022年8月13日，我为了返校去街里，偶然见到，但匆匆错过，相貌和以前没啥变化。</span>',
			'ybsl_033xiaohui':'<font color=cyan>忆-033·断肠人在天涯</font><br>❅技能设计：夜白<br>❅代码撰写者：夜白<br>❅插图：QQ小世界AI绘图<br>❅配音：暂无<br/>你猜我在什么时候放弃了爱。<br/><span class=thundertext>小慧，原型为郭慧欣，转学后三中的同学，一度做过我同桌。曾为情所伤，及其敬仰王海茹。高中后联系渐淡。不知某天悄然删双好友。2022年9月21日凌晨，后知后觉的我意识到这一点，便撰写此武将。</span>',
			'ybsl_034zhoulianyuan':'<font color=cyan>忆-034·庄子的执剑人</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无<br/>梦中的人记不得模样，梦中的事记忆犹新。<br/><span class=thundertext>周怜渊，记2022年9月15日之16日的一场梦。<br>这次载入的梦境大致是一个作文考试，我叙写了一篇文章，讲述了一个言辞锋利的监察者，具体事迹不详，只记得名字叫周怜渊。为了纪念这一场梦，并撰写此武将。</span>',
			'ybsl_035stamp':'<font color=cyan>忆-035·龙裔象征</font><br>★技能设计：夜白<br>★代码撰写者：夜白<br>★插图：暂无<br>★配音：暂无<br/>见威而不伏，问诏而不朝，灭之。<br/><span class=thundertext>玺，严格来说，她并非我梦到的角色。一次心血来潮，网上搜了一下玉玺。对于玉玺流失在历史长河中深感惋惜，于是做此武将。</span>',
			'ybsl_036bright':'<font color=cyan>忆-036·魔王的跑酷</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无<br/>你在我的梦里逃逸，咫尺天涯。<br/><span class=thundertext>熙，记2022年9月29日之30日的一场梦。<br>这次载入的梦境是，我是一个不断奔跑的人，在杂糅了各种见过的没见过的地形中不断地跑。跑着跑着还飞了起来。最终怅然醒来。为了纪念这一场梦，我为其取名为“熙”，并撰写此武将。</span>',
			'ybsl_037diamondqueen':'<font color=cyan>忆-037·深海的通灵龟</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>成品图片<br>◈配音：暂无<br/>一名女子莫名失踪，她留下的线索只有一句，方首女王，在海中渡劫。<br/>她消失整一年后，某城市上空降落巨大球形闪电。<br/><span class=thundertext>方块Q，记2022年9月29日之30日的一场梦。<br></span>',
			'db_ybsl_038tengwu':'<font color=cyan>忆-038·缘尽梦碎</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>成品图片<br>◈配音：暂无<br/>黄泉路上的两名少女被复活后，会以身相许，还是许诺来世做牛马？<br/><span class=thundertext>滕叔颖＆武宁，原型为高中两个同学，姓名不详，同时在我2022年10月17日之18日的梦境登场。<br>以下是我当天晚上写的手记。<br>幻之大地分两层，上层为梦境，下层为现实，梦境的世界映照现实的人的内心，即便他已经死去。而在梦境世界死去的人会被捕捉进魔王的狭间世界。这是勇者斗恶龙6的设定。<br>我梦见我生活在幻之大地上层，在一个魔法学院上学，舍友会制符。我用他赠的一张符杀了一个仇家。<br>下一个场景，我梦见我从大地上的窟窿掉了下去，到了下一层大陆依旧在下坠，这时神龙出现，他托起了我，说我是命中注定的人，于是把我载了回去，我问去了下面会怎么样，他没说话，示意我看，我看见一大片虚空，样子甚是恐怖。他又问我有什么愿望，我表示有两个红颜知己，如今在上层大陆死了，可能在冥界，委托他帮我找回来。神龙答应了。</span><span class=yellowtext>这个两个红颜知己被我命名为滕叔颖和武宁。</span><span class=thundertext><br>然后下一个场景，我在一个私人豪宅，看见外面有个电话亭，突然电话响了，并且他们两个一脸飒爽的从电话亭里走出。我很开心，但我没有说出是我让他们复活的事情。她们说假如知道谁让她们活了过来，一定要以身相许。我正要说些什么，突然感觉意识有着清晰，我一愣，正要再看一眼她们，我醒了。<br>听说当一个好久不见的人突然出现在你的梦里，说明这个人正在遗忘你。仔细想想，她们不过是两个与我有过一点交集的人。其中一个表现暧昧，另外一个敬而远之。如今的梦正说明，我渴望被她们关注。我很享受被暗恋的感觉，可一旦挑明了，就难以品味了。<br>像她们这样的姑娘，我也遇过许多。但我并没有明确表示过什么。因为我很清楚，我只适合作为她们的白月光。我也很乐得享受这种感觉。她们也乐得享受。主要是，我认为，白月光给人一种极为特殊的意义，他是你内心深处的一根精神支柱，他的意义无可言喻，但是在你遇到问题时，一定会下意识想要是有他在多好，可惜并不能。或者睡梦中，甚至失恋时，也会作为意淫的对象，幻想他躺在你身边。在你孤独时，他会幻现在你脑海里，或者幻现在你身边。你以为你会拥抱着他入睡，可睁开眼，却是你抱着自己的大腿。至于梦中的人啊，你要怎么才能出现，从我的梦境里，脑海里出现在我身边，想我想的那样，陪伴我，拥抱我，关怀我。我多么希望幻之大地的设定在这里可以实现。<br>在游戏里，梦之世界主角初始村的山下有一个集市叫玛尔谢，但是在对应的真实世界，这里只有一个孤独的木屋，和一个孤独的老人。老人的愿望是将来这里能发展成一个大集市。我想，这个梦应该把我的内心所想都具现了。<br>凌晨一点了。睡了。</span>',
			'ybsl_039zhafu':'<font color=cyan>忆-039·制符新生</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无<br/>待填写。<br/><span class=thundertext>查符，在我2022年10月17日之18日的梦境登场。<br>以下是我当天晚上写的手记。<br>幻之大地分两层，上层为梦境，下层为现实，梦境的世界映照现实的人的内心，即便他已经死去。而在梦境世界死去的人会被捕捉进魔王的狭间世界。这是勇者斗恶龙6的设定。<br>我梦见我生活在幻之大地上层，在一个魔法学院上学，舍友会制符。我用他赠的一张符杀了一个仇家。</span><span class=yellowtext>这个舍友被我命名为查符。</span><span class=thundertext><br>下一个场景，我梦见我从大地上的窟窿掉了下去，到了下一层大陆依旧在下坠，这时神龙出现，他托起了我，说我是命中注定的人，于是把我载了回去，我问去了下面会怎么样，他没说话，示意我看，我看见一大片虚空，样子甚是恐怖。他又问我有什么愿望，我表示有两个红颜知己，如今在上层大陆死了，可能在冥界，委托他帮我找回来。神龙答应了。<br>然后下一个场景，我在一个私人豪宅，看见外面有个电话亭，突然电话响了，并且他们两个一脸飒爽的从电话亭里走出。我很开心，但我没有说出是我让他们复活的事情。她们说假如知道谁让她们活了过来，一定要以身相许。我正要说些什么，突然感觉意识有着清晰，我一愣，正要再看一眼她们，我醒了。<br>听说当一个好久不见的人突然出现在你的梦里，说明这个人正在遗忘你。仔细想想，她们不过是两个与我有过一点交集的人。其中一个表现暧昧，另外一个敬而远之。如今的梦正说明，我渴望被她们关注。我很享受被暗恋的感觉，可一旦挑明了，就难以品味了。<br>像她们这样的姑娘，我也遇过许多。但我并没有明确表示过什么。因为我很清楚，我只适合作为她们的白月光。我也很乐得享受这种感觉。她们也乐得享受。主要是，我认为，白月光给人一种极为特殊的意义，他是你内心深处的一根精神支柱，他的意义无可言喻，但是在你遇到问题时，一定会下意识想要是有他在多好，可惜并不能。或者睡梦中，甚至失恋时，也会作为意淫的对象，幻想他躺在你身边。在你孤独时，他会幻现在你脑海里，或者幻现在你身边。你以为你会拥抱着他入睡，可睁开眼，却是你抱着自己的大腿。至于梦中的人啊，你要怎么才能出现，从我的梦境里，脑海里出现在我身边，想我想的那样，陪伴我，拥抱我，关怀我。我多么希望幻之大地的设定在这里可以实现。<br>在游戏里，梦之世界主角初始村的山下有一个集市叫玛尔谢，但是在对应的真实世界，这里只有一个孤独的木屋，和一个孤独的老人。老人的愿望是将来这里能发展成一个大集市。我想，这个梦应该把我的内心所想都具现了。<br>凌晨一点了。睡了。</span>',
			'ybsl_040ether':'<font color=cyan>忆-040·缘尽梦碎</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无<br/>待填写。<br/><span class=thundertext>安以，我2022年10月17日之18日的梦境中扮演的角色。<br>以下是我当天晚上写的手记。<br>幻之大地分两层，上层为梦境，下层为现实，梦境的世界映照现实的人的内心，即便他已经死去。而在梦境世界死去的人会被捕捉进魔王的狭间世界。这是勇者斗恶龙6的设定。<br>我梦见我生活在幻之大地上层，在一个魔法学院上学，舍友会制符。我用他赠的一张符杀了一个仇家。</span><span class=yellowtext>我在这个梦里名叫安以。</span><span class=thundertext><br>下一个场景，我梦见我从大地上的窟窿掉了下去，到了下一层大陆依旧在下坠，这时神龙出现，他托起了我，说我是命中注定的人，于是把我载了回去，我问去了下面会怎么样，他没说话，示意我看，我看见一大片虚空，样子甚是恐怖。他又问我有什么愿望，我表示有两个红颜知己，如今在上层大陆死了，可能在冥界，委托他帮我找回来。神龙答应了。<br>然后下一个场景，我在一个私人豪宅，看见外面有个电话亭，突然电话响了，并且他们两个一脸飒爽的从电话亭里走出。我很开心，但我没有说出是我让他们复活的事情。她们说假如知道谁让她们活了过来，一定要以身相许。我正要说些什么，突然感觉意识有着清晰，我一愣，正要再看一眼她们，我醒了。<br>听说当一个好久不见的人突然出现在你的梦里，说明这个人正在遗忘你。仔细想想，她们不过是两个与我有过一点交集的人。其中一个表现暧昧，另外一个敬而远之。如今的梦正说明，我渴望被她们关注。我很享受被暗恋的感觉，可一旦挑明了，就难以品味了。<br>像她们这样的姑娘，我也遇过许多。但我并没有明确表示过什么。因为我很清楚，我只适合作为她们的白月光。我也很乐得享受这种感觉。她们也乐得享受。主要是，我认为，白月光给人一种极为特殊的意义，他是你内心深处的一根精神支柱，他的意义无可言喻，但是在你遇到问题时，一定会下意识想要是有他在多好，可惜并不能。或者睡梦中，甚至失恋时，也会作为意淫的对象，幻想他躺在你身边。在你孤独时，他会幻现在你脑海里，或者幻现在你身边。你以为你会拥抱着他入睡，可睁开眼，却是你抱着自己的大腿。至于梦中的人啊，你要怎么才能出现，从我的梦境里，脑海里出现在我身边，想我想的那样，陪伴我，拥抱我，关怀我。我多么希望幻之大地的设定在这里可以实现。<br>在游戏里，梦之世界主角初始村的山下有一个集市叫玛尔谢，但是在对应的真实世界，这里只有一个孤独的木屋，和一个孤独的老人。老人的愿望是将来这里能发展成一个大集市。我想，这个梦应该把我的内心所想都具现了。<br>凌晨一点了。睡了。</span>',
			'ybsl_041mmuqin':'<font color=cyan>忆-041·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>首充一元就送！<br/><span class=thundertext>慕琴，原型为崔妍，高中同学。主要事迹为，某天在一楼大厅里席地而坐，我给她投喂了一块钱，并戏称买了。后来她把一块钱还了回来，但1块钱卖身这个梗我能记一辈子。</span>',
			'ybsl_042pingzi':'<font color=cyan>忆-042·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>拼图虽好，可一旦缺失，便不再完美。<br/><span class=thundertext>蘋姉，原型保密，高中同学。<br>她向来聪慧，生性活泼，招人怜爱。<br>有一次，我买了两个拼图，晚自习时，包括她在内的其他同学借我拼图去拼。拼完之后，因为拼图容易散花，于是用纸板承接着向我传递，小心翼翼传到我手里时，老师来了……毫不意外的，我上了通报板。估计我在老师心里也留下了一点顶风作案的形象。<br>大约一个月后的某一天，老师跟我们闲聊，逮住一个机会，就在大家面前对我指蘋说：她就比你聪明。我顿时心领神会。想必老师回头也仔细查了监控，知道了那个“顶风作案”的同学并非是我，然后趁此机会解开误会。我便用“飞不起来”的手势指着蘋华强一笑。明退技能便由此而来，意指她立于危墙之下，却又全身而退，反倒是我平白上了一次电视。</span>',
			'ybsl_043fangjiayu':'<font color=cyan>忆-043·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>房佳瑜，原型为同名本人，高中同学。</span>',
			'ybsl_044huruihang':'<font color=cyan>忆-044·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>胡瑞航，原型为同名本人，六中同学。印象中存在感极低。事迹不详。</span>',
			'ybsl_045gaocong':'<font color=cyan>忆-045·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>快步的来又快步的走，<br>假装不经意的路过，<br>却不知那一瞬间的顿足，<br>表露了最真诚的情愫。<br/><span class=thundertext>高聪，原型为同名本人，事迹暂无。</span>',
			'ybsl_046jiangxuewu':'<font color=cyan>忆-046·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>江雪舞，原型保密，事迹暂无。</span>',
			'ybsl_047shan':'<font color=cyan>忆-047·游魂惊梦</font><br>❅技能设计：夜白<br>❅代码撰写者：夜白<br>❅插图：灵境AI绘图<br>❅配音：暂无<br/>游荡在城市里的鬼魂，专门捕食痴情人的美梦<br><span class=yellowtext>人生若只如初见，何事秋风悲画扇。<br>等闲变却故人心，却道故人心易变。<br>骊山语罢清宵半，泪雨霖铃终不怨。<br>何如薄幸锦衣郎，比翼连枝当日愿。</span><br>————清代·纳兰性德<br>木兰花·拟古决绝词柬友<br/><span class=thundertext>彡，原型保密，事迹保密。同时登场于本人2023年4月14之15日梦。<br>这次载入的梦境，是在一个学校的宿舍里，有一个疯狂追人的异服者，头戴面罩，没有图案。我沿着二至三楼楼梯一路向东攀逃，但每次回头总能在看见他从上一个楼梯口上行。最后不知过了多少了楼梯口，我一跃跳下了楼梯，这里正是一个街区。<br>我再次遇见了彡。我们之间仿佛没有了那个罅隙，一路畅所欲言。走着走着，她过了一道奇怪的门禁就进去了。那个门禁相当奇怪，就像用两个变压器外壳做的，看起来很小但摸起来有点烫。这是我才注意起身边的环境，她进入的场所四周被电网包围，向右手边看去，有两个同学正操控着门禁阻挡我。我受阻于门禁，于是只得离开。同时一直回想着方才的聊天。不知不觉间就清醒了，但聊天内容却都忘记了。</span>',
			'ybsl_048wushuang':'<font color=cyan>忆-048·似水流年</font><br>❁技能设计：夜白<br>❁代码撰写者：夜白<br>❁插图：派蒙AI绘图<br>❁配音：暂无<br/>那年花开，晴空有你。惜无神雕，难成侠侣。<br/><span class=thundertext>吴爽，原型为同名本人。童年玩伴。一直为我创造乐趣。后来张玉洁也加入，她俩一起为我创造乐趣。曾画过一些地图，但遍布陷阱。<br>可惜当初它她本人画的地图已经轶失，于是我秉承着遍布陷阱这一核心，仿制了个新的地图。<br/><div style="border:2px solid gray"><span><img style=width:500px src=\'+lib.assetURL+\'extension/夜白神略/image/其它/遍布陷阱的宫殿.png></span></span>',
			'ybsl_049waner':'<font color=cyan>忆-049·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>王婉儿，原型保密，事迹暂无。</span>',
			'ybsl_050zunjian':'<font color=cyan>忆-050·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>鐏柬，原型保密，事迹暂无。</span>',
			'ybsl_051fomalhaut':'<font color=cyan>忆-051·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>北落师门，原型保密，事迹暂无。</span>',
			'ybsl_052trees':'<font color=cyan>忆-052·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>姜森，原型保密，事迹暂无。</span>',
			'ybsl_053qiuer':'<font color=cyan>忆-053·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>秋儿，原型保密，事迹暂无。</span>',
			'ybsl_054yueer':'<font color=cyan>忆-054·共轭之恋</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：派蒙AI绘图<br>❀配音：暂无<br/>不如由我裁之，你我一人一半。<br/><span class=thundertext>悦儿，原型保密，事迹暂无。</span>',
			'ybsl_055zhengyan':'<font color=cyan>忆-055·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：AI绘画精灵AI绘图<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>郑琰，原型保密，事迹暂无。</span>',
			'ybsl_056dongjianchao':'<font color=cyan>忆-056·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>董建超，原型保密，事迹暂无。</span>',
			'ybsl_057sunmeiqi':'<font color=cyan>忆-057·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>孙美琪，原型保密，事迹暂无。</span>',
			'ybsl_058sunshibo':'<font color=cyan>忆-058·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>孙世博，原型保密，事迹暂无。</span>',
			'ybsl_059starsFall':'<font color=cyan>忆-059·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：暂无<br>❀配音：暂无<br/>我曾在那片球场看她们打球，偶尔也在那品读小说。<br>我沉浸于耳畔的欢声笑语，晚风催我快翻下一页。<br>我仰起头感受天空的雨意，一颗流星从我身后飞起，划过天际。<br>我奔过去将它捡起，回头迎上夕阳的快门。<br/><span class=thundertext>星落四公主，原型为高中时的四名女同学，姓名不知。经常在球场打排球，我也常过去看她们玩，顺便帮她们捡球。</span>',
			'ybsl_059starsFall1':'<font color=cyan>忆-059★·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>鞠熒，原型不知姓名，只记得姓鞠。某天，她带了一块手表，别人开玩笑说这表50块（还是50万忘了）。第二天我一如既往坐旁边观看，注意到她没带那个表，于是我开口问，你那50块的表呢。然后恰好她接球，于是那个球直挺挺的被她打向了我，看起来是不小心的，幸好我眼疾手快抬手挡住了。<br>贯虹第一段效果，即进行判定并记录判定牌的效果，寓意她前一天展示手表，之后别人用同花色牌可以视为对其用杀，寓意她听到我再次提起手表时，飞向我那个球。</span>',//'鞠熒',//本名忘了
			'ybsl_059starsFall2':'<font color=cyan>忆-059★·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>宋橤，原型宋某，身材挺胖。其他不太记得了，只记得某次雨后打球，她不小心滑倒了，坐进了水泡。<br>技能名就是对这个事件的描述，濯，释义为洗，委婉形容她跌坐的事情，潭就是那个水泡。表现为技能则是，为了应对猝不及防的进攻而不得不调整手牌数。<br>选择灵梦作她的原画其实我是拒绝的，但是没有其他躺在水坑的图了，so~</span>',//'宋橤',//本名保密橤渁
			'ybsl_059starsFall3':'<font color=cyan>忆-059★·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>周靈，原型不知姓名。事迹暂无，但是有她才够人数打球。属于是为了凑齐四个人强行设计的。<br>一开始的技能内容是只有前半段的“伪中流”，表达了她的特性，她要在这个组合里才能发挥效果。后来加了个“伪英姿”，意在让她可以在先手登场时不至于白板。<br><span style="opacity:0.5;">其实我是一直念叨着要在自己扩展里加个中流，中流直接给了她算是先种树后挖坑</span></span>',//'周靈',//本名保密
			'ybsl_059starsFall4':'<font color=cyan>忆-059★·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>李暁，原型不知姓名。某天正在打球时，一阵雨快速来快速走，我问她们说，你们是学文科的，说说这是什么雨吧，她回应这是冷锋过境…（后面不记得了）。<br>技能名直截了当，评雨。一开始的技能效果是：场上判定后，你可以弃置每当场上有判定牌生效后，你可以弃置进行判定的角色一张牌，若弃置牌和判定结果花色相同，其摸两张牌，否则你可以弃置自己的一张与判定结果花色相同的牌，然后摸两张牌。之后觉得会导致和古河渚同时登场时出现无限嵌套，便把第一段删了。变成：每当场上有判定牌生效后，你可以弃置自己的一张与判定结果花色相同的牌，然后摸两张牌。再之后仍然感觉有所不妥，于是就改成改判技能了…<br>以上几版技能都有“场上角色的判定阶段开始时，若其判定区没有牌，你可令其进行一次【灵雨】判定。”这句。<br>其实还有一版是：转换技，当场上有牌进入弃牌堆时，你可展示手牌，若你手牌中没有与之同花色的牌，则：阳，你获得此牌；阴，你摸X张牌，X为4-你手牌的花色数。忘记因为什么感觉不妥了，好像是嫌弱…</span>',//'李曉',//本名保密
			'ybsl_060liutianhang':'<font color=cyan>忆-060·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>刘天杭，原型保密，事迹暂无。</span>',
			'ybsl_061zheyu':'<font color=cyan>忆-061·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>哲宇，原型保密，事迹暂无。</span>',
			'ybsl_062yuhongyan':'<font color=cyan>忆-062·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>于洪岩，原型保密，事迹暂无。</span>',
			'ybsl_063weimingli':'<font color=cyan>忆-063·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>魏铭利，原型保密，事迹暂无。</span>',
			'ybsl_064lvmingyan':'<font color=cyan>忆-064·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>吕明岩，原型保密，事迹暂无。</span>',
			'ybsl_065yanxiwen':'<font color=cyan>忆-065·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：暂无<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>阎锡文，原型保密，事迹暂无。</span>',
			'ybsl_066wujun':'<font color=cyan>忆-066·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◎配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>武筠，原型保密，事迹暂无。</span>',
			'db_ybsl_067snake':'<font color=cyan>忆-067·旧梦循蹈</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无<br/>纯情的花，在梦里春心荡漾。站在盛夏的岔路口寻觅，你在何方？<br/><span class=thundertext>蛇妃，原型为某不记得名字的高中认识的同学，同时在我2022年12月23之24日的一场梦中登场。<br>具体事迹不详，梦境梗概写在了人物独白中，具体梦境已经忘了。</span>',
			'ybsl_068qingyue':'<font color=cyan>忆-068·似水流年</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无<br/>清月伴孤影，落红眷飞鸿。<br/><span class=thundertext>清月姑娘，原型为某一次坐客车遇见的姑娘，大约十岁左右，毫无戒备的倚在我身上睡着了，之后长久难忘。</span>',
			'ybsl_069xiangzi':'<font color=cyan>忆-069·似水流年</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无<br/>待填写。<br/><span class=thundertext>香紫姑娘，原型为某一次梦中的角色，事迹已忘。</span>',
			'ybsl_070lvyanqiu':'<font color=cyan>忆-070·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>吕艳秋，原型保密，事迹暂无。</span>',
			
			
			
			
			'ybsl_075dogcard':'<font color=cyan>忆-075·再充十万</font><br>※技能设计：夜白<br>※代码撰写者：夜白<br>※插图：不知来源<br>※配音：暂无<br/>再充十万，你会更强。<br/><span class=thundertext>苟卡，不必过多介绍。</span>',
			'ybsl_076zhujun':'<font color=cyan>忆-076·似水流年</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>◈配音：暂无<br/>待填写。<br/><span class=thundertext>朱焌，记2023年3月5日之6日梦见的第一个场景。这次载入的梦境是，我在一个食堂里，在和卖麻辣烫的姑娘交谈。她替我做主选择了食物，然后自己也做了一份，与我一同进餐。只是她都吃完了，我却依旧没胃口。</span><span class=yellowtext>这个姑娘被我命名为朱焌。</span></span>',
			'ybsl_077yangqixu':'<font color=cyan>忆-077·似水流年</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无<br/>待填写。<br/><span class=thundertext>羊祈絮，记2023年3月5日之6日梦见的第二个场景。这次载入的梦境是，我在一间教室里参加宴会，同时还有若干人，不过仅剩下的印象只有两人，一个跑的飞快，另一个是宴会的举办者。都不知道名。</span><span class=yellowtext>跑的飞快的被我命名为羊祈絮。</span><span class=thundertext>羊祈絮不知为何被人追捕，随后一溜烟跑没了。</span>',
			'ybsl_078zhuyahai':'<font color=cyan>忆-078·似水流年</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无<br/>待填写。<br/><span class=thundertext>朱涯海，记2023年3月5日之6日梦见的第二个场景。这次载入的梦境是，我在一间教室里参加宴会，同时还有若干人，不过仅剩下的印象只有两人，一个跑的飞快，另一个是宴会的举办者。都不知道名。</span><span class=yellowtext>举办者被我命名为朱涯海。</span><span class=thundertext>朱涯海给我一种深藏不露的感觉，却莫名深得人们的信任。</span>',
			'ybsl_079xiaoxin':'<font color=cyan>忆-079·似水流年</font><br>◎技能设计：夜白<br>◎代码撰写者：夜白<br>◎插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◎配音：暂无<br/>待填写<br/><span class=thundertext>小新，原型保密，事迹暂无。</span>',
			'ybsl_080phoenix':'<font color=cyan>忆-080·凤鸣九天</font><br>★技能设计：夜白<br>★代码撰写者：夜白<br>★插图：暂无<br>★配音：暂无<br/>待填写。<br/><span class=thundertext>凤，原型为作者高二那年在路边看到的一只野鸡。当时我就在幻想，要是我把它捡回来养着，以后能不能变凤凰。</span>',
			'ybsl_081chenli':'<font color=cyan>忆-081·巡梦迷失者</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无<br/>待填写。<br/><span class=thundertext>陈丽，。</span>',
			'ybsl_081chensi':'<font color=cyan>忆-081·巡梦迷失者</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无<br/>待填写。<br/><span class=thundertext>陈思，。</span>',
			'ybsl_082bianqiuwen':'<font color=cyan>忆-082·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：灵境AI绘图<br>❀配音：暂无<br/>待填写。<br/><span class=thundertext>卞秋雯，原型保密，事迹暂无。</span>',
			'ybsl_083xiaozhu':'<font color=cyan>忆-083·巡梦天合</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：灵境AI绘图<br>◈配音：暂无<br/>待填写。<br/><span class=thundertext>小筑，记2023年5月30日之31日梦。由于未能及时记录导致梦境遗忘较多，只记得这个姑娘擅长搭建建筑，但被风一吹就散架恢复原样。</span>',
			'ybsl_084zhangmi':'<font color=cyan>忆-084·痴惘之妒魂</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：灵境AI绘图<br>◈配音：暂无<br/>凭什么你可以，我就不行？<br/><span class=thundertext>张汨，记2023年6月7日之8日梦。梦见彡，还有另一个丫头<span style="text-decoration: line-through;">&#20993&#22919</span>，我为其命名为张汨。我们一同进入陌生的大学。我和彡一直在腻歪，张汨就一直辱骂彡，我就一直抱着彡安抚她。然后我气不过，准备回骂，但由于情绪过于激动，导致梦醒。</span>',
			'ybsl_085DGY':'<font color=cyan>忆-085·雨漫孤城</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>你在我的心里，立了一块碑。我的心，从此荒芜。<br/><span class=thundertext>独孤雨，原名保密，某天打王者认识的，后来逐渐熟络，也交换了姓名。性格跳脱。然后我半年没玩，跟她打了会匹配，她借口我辅助不跟她，给我删了。后来加了回来，说来姨妈了，心情不好。我：……注意身体。</span>',
			'ybsl_086GJ':'<font color=cyan>忆-086·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>……<br/><span class=thundertext>龚洁，。</span>',
			// 'ybsl_087tianlu':['female','YB_memory',3,[],['epic']],//田璐
			// 'ybsl_088lijiaxin':['female','YB_memory',3,[],['epic']],//李嘉欣
			// 'ybsl_089lvjinling':['female','YB_memory',3,[],['epic']],//吕金玲
			// 'ybsl_090dengtingyue':['female','YB_memory',3,[],['epic']],//邓婷月
			// 'ybsl_086GJ':['female','YB_memory',3,[],['epic']],//王彩钰
			// 'ybsl_092handan':['female','YB_memory',3,[],['epic','hiddenSkill']],//韩丹
			// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
			// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
			// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
			// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
			// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
			// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
			// 'ybsl_093cat':['female','YB_memory',3,[],['epic']],//猫猫
			//---------------------------------//忆包SP
			'db_ybsp_014liutianyu':'<font color=cyan>忆☆SP-001·暗流涌动</font><br>✿技能设计：夜白<br>✿代码撰写者：夜白<br>✿插图：QQ小世界AI绘图<br>✿配音：暂无<br/>待填写。<br/><span class=thundertext>夜白，原型为作者本人，2019年春自号北地诗仙，2020年春夏自取别名夜白。故事仍在继续书写，也许永无尽头。</span>',
			'ybsp_016manchengqi':'<font color=cyan>忆☆SP-002·清明节限定</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>若思悔不及，则万念俱成枯。趁你还年轻，他还未老。<br/><span class=thundertext>满城柒，原型保密，转学后三中的同学。曾为我单相思的对象。后来时常打扰她。高中毕业后我彻底醒悟。善于唱歌，常听我诉说。喜欢夸赞别人。</span><br><span class=yellowtext>她只是个倾听者，动歪心思的是我。</span><font color=cyan><br><span style="opacity:0.1;">\u4e5f\u8bb8\u5979\u4e5f\u786e\u5b9e\u8ba4\u771f\u5730\u559c\u6b22\u8fc7\u6211\uff0c\u6bd5\u7adf\u5f53\u65f6\u6211\u8868\u73b0\u51fa\u5bf9\u4e09\u56fd\u6740\u7684\u5174\u8da3\uff0c\u5979\u5c31\u5047\u88c5\u4e5f\u559c\u6b22\u4e09\u56fd\u6740\uff0c\u521b\u9020\u4e0e\u6211\u7684\u5171\u540c\u8bdd\u9898\u3002\u5979\u53ea\u662f\u4e34\u573a\u6076\u8865\u4e00\u756a\u4e09\u56fd\u6740\u77e5\u8bc6\u800c\u5df2\uff0c\u56de\u60f3\u8d77\u90a3\u6bb5\u7ecf\u5386\uff0c\u6211\u53ef\u4ee5\u4e07\u5206\u80af\u5b9a\u3002\u90a3\u4e9b\u5f80\u4e8b\uff0c\u90a3\u4e9b\u7ec6\u8282\uff0c\u90fd\u662f\u90a3\u4e48\u7684\u6295\u6211\u6240\u597d\u3002\u5979\u5728\u90a3\u5e74\u590f\u5929\u4e3a\u6211\u5531\u7684\u6b4c\uff0c\u4ee4\u6211\u6f78\u7136\u6cea\u4e0b\u3002\u4e5f\u8bb8\u662f\u6211\u5e74\u5c11\uff0c\u4e0d\u61c2\u5f97\u8fdb\u9000\u5206\u5bf8\u5427\u3002</span></font><br><span class=yellowtext><br>妙园风雪途·作于2018、12、06<br>妙园风雪会今年，今年风雪会妙园。<br>妙园狭路逢故友，故友踌躇未敢言。<br>日光斜照方寸暖，驻足良久方开口。<br>问我伊人在何方，天自苍寥地自荒。<br>初时故人不自解，解时故人已去远。<br>朔风凛冽寒蝉翼，霜日摇曳嘲晚叶。<br>蝴蝶翩翩绕枝头，蜂虫依依戏牵牛。<br>葵花有意向金乌，松叶不愿轻易哭。<br>伊人有酒未曾吐，诗人佯醉却倾心。<br>染纸相思表赤血，清袖无丝碎真心。<br>诗人歌罢回看酒，酒陈杯新人已累。<br>推杯起身心方醒，人生何处无滋味。<br>醒时已是暮春时，回首才觉伊人醉。<br>诗人已书新赋草，伊人还读旧辞酹。<br>诗人佯醉已走脱，伊人持酒仍痴醉。<br>一曲歌罢梦回醒，诗人伊人皆有泪。<br>此间穿肠千种愧，诗人有愧方觉恨。<br>泪悔前头应有源，犹见孟德与公台。<br>妙园风雪别今年，今年风雪别妙园。<br>妙园宽径独徘徊，故人相见未敢认。</span>',
			'db_ybsp_038tengwu':'<font color=cyan>忆☆SP-004·缘尽梦碎</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>◈配音：暂无<br/>黄泉路上的两名少女被复活后，会以身相许，还是许诺来世做牛马？<br/><span class=thundertext>滕叔颖＆武宁，原型为高中两个同学，姓名不详，同时在我2022年10月17日之18日的梦境登场。<br>以下是我当天晚上写的手记。<br>幻之大地分两层，上层为梦境，下层为现实，梦境的世界映照现实的人的内心，即便他已经死去。而在梦境世界死去的人会被捕捉进魔王的狭间世界。这是勇者斗恶龙6的设定。<br>我梦见我生活在幻之大地上层，在一个魔法学院上学，舍友会制符。我用他赠的一张符杀了一个仇家。<br>下一个场景，我梦见我从大地上的窟窿掉了下去，到了下一层大陆依旧在下坠，这时神龙出现，他托起了我，说我是命中注定的人，于是把我载了回去，我问去了下面会怎么样，他没说话，示意我看，我看见一大片虚空，样子甚是恐怖。他又问我有什么愿望，我表示有两个红颜知己，如今在上层大陆死了，可能在冥界，委托他帮我找回来。神龙答应了。</span><span class=yellowtext>这个两个红颜知己被我命名为滕叔颖和武宁。</span><span class=thundertext><br>然后下一个场景，我在一个私人豪宅，看见外面有个电话亭，突然电话响了，并且他们两个一脸飒爽的从电话亭里走出。我很开心，但我没有说出是我让他们复活的事情。她们说假如知道谁让她们活了过来，一定要以身相许。我正要说些什么，突然感觉意识有着清晰，我一愣，正要再看一眼她们，我醒了。<br>听说当一个好久不见的人突然出现在你的梦里，说明这个人正在遗忘你。仔细想想，她们不过是两个与我有过一点交集的人。其中一个表现暧昧，另外一个敬而远之。如今的梦正说明，我渴望被她们关注。我很享受被暗恋的感觉，可一旦挑明了，就难以品味了。<br>像她们这样的姑娘，我也遇过许多。但我并没有明确表示过什么。因为我很清楚，我只适合作为她们的白月光。我也很乐得享受这种感觉。她们也乐得享受。主要是，我认为，白月光给人一种极为特殊的意义，他是你内心深处的一根精神支柱，他的意义无可言喻，但是在你遇到问题时，一定会下意识想要是有他在多好，可惜并不能。或者睡梦中，甚至失恋时，也会作为意淫的对象，幻想他躺在你身边。在你孤独时，他会幻现在你脑海里，或者幻现在你身边。你以为你会拥抱着他入睡，可睁开眼，却是你抱着自己的大腿。至于梦中的人啊，你要怎么才能出现，从我的梦境里，脑海里出现在我身边，想我想的那样，陪伴我，拥抱我，关怀我。我多么希望幻之大地的设定在这里可以实现。<br>在游戏里，梦之世界主角初始村的山下有一个集市叫玛尔谢，但是在对应的真实世界，这里只有一个孤独的木屋，和一个孤独的老人。老人的愿望是将来这里能发展成一个大集市。我想，这个梦应该把我的内心所想都具现了。<br>凌晨一点了。睡了。</span>',
			'ybsp_072sulingyi':'<font color=cyan>忆-072·不祥的命运</font><br>★技能设计：夜白<br>★代码撰写者：夜白<br>★插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>★配音：暂无<br>预言<br>你五行缺火，于是母亲在你出生不久便取了“苏令燚”这个名字。四个火，女神和火种的意思。<br>我叫苏令燚，长在彭湾村。彭湾是个有山有水的地方，一年四季，温度适中，这是个未被商业浸染的村庄，有着最淳朴的民风和最纯粹的风景。<br>围绕着彭湾村的，是湾河，碧绿的，像一条带子，水会随着风飞舞，叶会在湾河中小憩，<br>然而彭湾的村民也是极保守和传统的，他们似乎未从旧社会中走出来的，彭湾的男丁极少到外面谋生，多部分固守着自己的田，男耕女织，日出而作，日暮而息。<br>所以，用另一种话说，彭湾似乎是与外界隔绝的，有点像“桃花源”。<br>下雨，是最喜欢的天气，接连下一天的雨，倘或夏季，水便会涨的很高，有从外面冒冒失失游进的鱼——草鱼、鲤鱼、鲫鱼……多不盛数。<br>那个时候，彭湾里的男丁便会手持大大的网兜，到河里捕鱼，，小孩子也会到水沟里捉鱼，一人一头，一点点的往中间堵住鱼。湾河的水清澈，沁人，似乎能喝，又似乎不能喝。这样的水。是被冠以神圣的寓意的。村里最老的长者说，自他太爷爷那代，就有湾河了，湾河是历史的见证。湾河在，人在，湾河亡，人亡。<br>我是不相信那些话的，彼时，我是一个十一岁的快乐少女，周一至周五在村口的小学堂上读书，教书先生教我们识字、算术。<br>至于最早的教书先生的知识是是从哪儿来的，是外界的闯入？还是先生的外出求知识？这似乎一直以来就是一个谜。<br>“小火，你父亲呢？”伙伴淼问我。<br>“不知道，自出生开始，就没见过他。”我没有表情的回答。<br>俞淼，是我那时候最好的朋友，他五行缺水，他父亲便让算命先生帮他取了这个名字。<br>淼对我很好，总摘给我他家种的桃子，极大极甜，那时候我总会满足地跟在淼后面，使劲的拍马屁。<br>淼捕鱼很厉害，他每次总是一放学，便去捕鱼，他回家扔下书包，拎着网兜，光着脚丫，沿着湾河一直跑，微波粼粼，倒印了他的身影，我遥望他的眼神，也变的一晃一晃，一直晃到我心里。<br>初秋，我们就去“偷”王老大家的番薯，选几个，用铲子小心的挖出番薯，一人两个，要小些的，那样烤着才香。<br>那时候，淼去找稻草，我便一人用砖头搭了灶烧火， 升腾起一圈圈浓重的烟雾 ，熏得有了细微的泪，可是依旧快乐。<br>烤出来的番薯是极香极甜的，但是很烫，撕开外面烧焦的皮，便可下肚了。吃的，并不是番薯吧，而是两个人在一起的快乐时光。<br>放暑假了，一群孩子像疯了一般，急着冲到自己家。那时候的娱乐方式就是一起玩捉迷藏，打弹珠，或者帮家长种的地浇些水。<br>可是我却快乐不起来。<br>淼像看出了什么，一起回家，他终于问我：“怎么了，小火？”<br>我该怎么告诉他，近日来我总是重复着一个梦，一个有关湾河，有关我的梦。梦里总有算命先生的身影，重复着说：“她五行缺火，四个火，会像她爸一样，客死湾河的。”也总是听见那种不真切的声音“淹死她！淹死她！”然后醒来，是一身虚汗。<br>拧开瓶盖吞了口水，还是没有告诉他。<br>傍晚，我心不在焉的帮母亲绕毛线，这时一个算命先生不请自来，我打了个冷颤。在劫难逃的，是要来了么？<br>我躲在房间里，贴着门，偷听他们的谈话。<br>“自打她出生，就让你扔掉她的，你怎么留到现在？你想让她和她父亲一样？”<br>“……”母亲无语，接着便是隐隐的哭泣，悠远的像来自另一个时空。<br>“早些把她送到外面吧。”算命先生丢下这句话，便走了。<br>我倚在门上的身躯，开始瘫软下去。<br>彭湾忽然没有井水了，村民们取不到水，只能去湾河盛水。然而有一部分老者反对，说干了湾河，人也就死了。<br>好几天没有下雨了，我舔舔嘴唇，干渴的难受，倚在门框上，望着外面的烈日灼灼，这种天气，在彭湾是极少有的。<br>有村民说，报应了啦，报应来啦，他的幽魂附在她女儿身上啦……十二年前的报应啊……<br>我不知道十二年前发生了什么，但隐隐觉得，它与我，有着莫大的关系。<br>母亲这几日，异常的憔悴、焦躁，没有水，她的衣服也有好几日没洗了。<br>我问母亲：“十二年前，究竟发生了什么？”她先是死活不肯说，后来终于开口：“你父亲苏燚，是被他们沉河沉死的。”一向坚强的母亲，这是却流泪了，是隐隐的，笔直的一行泪，滴落在门槛上。<br>当时的父母，一个缺水，一个缺火，不顾村民的反对，毅然的结婚了，可是结婚后，湾河莫名其妙的断流了。必要淹死一个，便可使湾河获水。<br>于是父亲被他们沉河，庸俗的湾河村民，居然觉得那是个绝妙的方法。<br>而一向善水的父亲，为了保住母亲，和她肚中的我，生生的，没有憋气，淹死了。<br>村民们很是高兴。<br>算命先生在我母亲耳边说：“你肚里的孩子出生后，必要丢到外面，不然会像她父亲一样，没有好下场。”这是一个预言，预言的开始，是死亡与丢弃。<br>这一天终于还是到了，村民们要淹死我的念头日益加重，我被一帮人抬到了湾河边，村长，算命先生，也在其中。<br>“苏令燚，你父亲十二年前为了挽救湾河，所以不惜牺牲自己的性命，我相信你也是个好孩子，会为湾河付出什么的，对吧？”<br>我想说不对，可是话未出口，就生生的被沉了下去。',
			'ybsp_002chenailin':'<font color=cyan>忆☆SP-003·玉殒香消</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>❀配音：暂无<br/>留点什么吧，聊做分别之后的怀念。<br/><span class=thundertext>陈爱琳，原型为同名本人，六中三班的一员，作者（以下称我）对那段时光最美好的回忆。以下文段为忆陈爱琳文。文本几经修改，终成定稿。对话原话不太记得了，因此用意义相同或相近的文言说法。</span><br><span class=firetext>注：文段受岁月滤镜影响，存在某处虚写。事实无论，吾言即是。</span><br><span class=yellowtext>久别不见，故作文怀之。<br>陈氏女，名爱琳，不知生年，癸巳年入初中，与之遇。孙氏女，名丽松，王氏女，名汉桢，皆为陈友。吾与之事实繁，然皆不记忆，依稀几数，至今铭心。<br>一日，学政治，谈男女往来，毕，吾谓陈曰：“男女具，身心益。”，<span style="opacity:0.1;">（男生女生在一起，有益健康）这是我记得的为数不多的原话。请允许我把这句话藏起来，毕竟现在想想太羞耻了，抓紧忘了吧我天。</span><br>三女具嗤，道：“淫嬷嬷”，乃去。<br>初识，吾与陈并列第三，师谓曰：“汝二人，定分高下。”及试，座临。考历史，陈密索一字。吾以此挟，索屈原事迹，附：吾二人，定分高下。出榜，陈三吾七，陈笑，顾二女曰：“才道，定分高下。”余赤面而去。<br>一日，学语文，讲柳宗元之小石潭记，校音，及“壹”，吾和曰：仅旧版钱有之。满堂皆笑。师曰：“汝视之。”余惑，遂取钱视之，乃悟，遂羞而掩面。</span><span class=firetext>注：岁月的滤镜下，吾总觉陈之笑最甚。事实无论，吾言即是。</span><br><span class=yellowtext>彼时，偶见之以美工刀划臂。便私书之：“书曰：珍己，勿伤。”陈惶，书，顾左右而传之。启之，曰：“无宣，令师知也。”余内笑，回曰：“莫如此也。”对曰：“善。”此事揭过。<br>一日，与人冲突，因果皆不记忆。其人名姜玉恒。冲吾，使吾跌。余奋极，恰右有棍，遂操棍挺身抡之，中头，棍折，余怒尚在，幸观者分之，而姜步罗圈，道：没事。待定，回味此棍，复操之以试击，仿佛为要害也，及顾而问陈：“如此，是耶？”陈惊，颔而应之。吾才省，知此事惧之也。师知，谓皆有过，遂不提。<br>一日，学英语，点我名。有灯垂于梁。余起欲答，忽身失衡，刹那而仰，见灯如柳摇曳，方知地动。当是时，警铃鸣，楼摇轰，脚踏声，一时齐发，不可辩也。余乃惊，携冠欲潜桌下，师曰：“不坚！”遂随流而下。及远，乃检冠中钱，未损。乃假七日。<br>稍定，一日语文课，有联曰：殷殷舔犊情。无人能对。余上而书：情情抚挚颊。盖断错句、解错意也。乃顾陈，以示炫耀。师不可解，曰：“上联言亲情，下联言爱情，稍欠。”余亦觉欠，然无益者。<br>某晚，尚余一刻钟。余沉思，师曰：“复地动乎？”余闻轰，以为移案。师曰：“莫不是窗动？不详。”言讫，始觉轰声愈响，坐不稳，忽闻铃震，皆慌而走。始静，复检冠中钱。顾陈，亦无恙。乃假一月。<br>某日，吾二人独处于室，随心而谈，曰：“汝敛袖，吾欲检之。”乃奋袖出臂。余观之，无痕。其肤白而美，余难耐而抚之，遂怦然心动。陈忽道：“你多久没剪指甲？”吾曰：“四月。”陈默。良久，乃曰：“今周五，周六周日你洗澡剪指甲，周一我检查。则赐一车饼干。”乃信之。然懒惰成性，终未成，此为后话。当晚归家，母曰：“汝父欲使汝北还续学，何如？”余道：“安乐与此，何故北还？”母曰：“汝藉在北。若留需迁藉易姓。”余决然道：“大丈夫，岂能易姓？吾当北还。”乃定甲午秋北还续学。复无相见，甚念之矣。<br>丁酉，业毕。余南下归故校，觅旧师，叹往昔。问及诸友，则曰：“王汉桢入三中，孙丽松入实验……”独不见陈爱琳。问之，则叹曰：“汝去，即堕。吾见其与众男厮，恐其安危，遂告教导主任，岂料教导主任因其男女关系不当，记其大过。爱琳恨我。顷之辍学，不复见也。”<br>余闻之，甚悲。实意料之外，又情理之中。倘吾异姓而拒北，迁藉而居南，定有挽澜之机。虽吾今有知，然知者何如？不知者何如？知深而乐衰，视广而情短，悲哉！<br>念君，恬静，不知。<br>殷殷舔犊情，浅浅执手意。<br>安否？佳祺。</span><br><span class=thundertext>谨以此文，祭年少无知。<br>我不会主动去寻觅失散的人，也不会去追问她们后来怎样。她们在我印象中留下的美丽的足迹，对我而言已经是宝贵的财富。这份回忆足以温暖我一生。</span>',
			'ybsp_027rain':'<font color=cyan>忆☆SP-006·巡梦鸣觉</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>◈配音：暂无<br/>你在我的梦里藏匿，一尘不染。<br/><span class=thundertext>雨，记2022年7月17日之18日的一场梦。<br>这次载入的梦境是一个仿若童年的村落，我遇见了另一个我，但另一个我是女的。我们一起玩耍，其余不记得了。为了纪念这一场梦，我为其取名为“雨”，并撰写此武将。</span>',
			'ybsp_001sunlisong':'<font color=cyan>忆☆SP-005·皓腕凝霜雪</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>孙丽松，原型为同名本人，陈爱琳和王汉桢的闺蜜，六中三班的一员。不算太熟，但隐约记得关系还不错，言行举止令人如沐春风。</span>',
			
			//---------------------------------//界限突破（什么沙比玩意）
			'ybnb_034zhoulianyuan':'<font color=cyan>忆☆界-034·庄子的执剑人</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无<br/>梦中的人记不得模样，梦中的事记忆犹新。<br/><span class=thundertext>周怜渊，记2022年9月15日之16日的一场梦。<br>这次载入的梦境大致是一个作文考试，我叙写了一篇文章，讲述了一个言辞锋利的监察者，具体事迹不详，只记得名字叫周怜渊。为了纪念这一场梦，并撰写此武将。</span>',
			
			//---------------------------六艺篇
			'ybart_013yinji':'<font color=cyan>忆-013·似水流年</font>✿<span class=yellowtext>六艺篇</span><br>✿技能设计：夜白<br>✿代码撰写者：夜白<br>✿插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>✿配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>尹姬，原型为尹超跃，六中三班一员，体操领操员。曾与我一同领操表演节目。曾一次失手用书夹划伤我手臂，伤疤至今依旧留在我手臂。其余事迹不详。</span>',
			'ybart_014liutianyu':'<font color=cyan>忆-014·似水流年</font>❀<span class=yellowtext>六艺篇</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：暂无<br>❀配音：暂无<br/>故事仍在继续书写。<br/><span class=thundertext>夜白，原型为作者本人，2019年春自号北地诗仙，2020年春夏自取别名夜白。故事仍在继续书写，也许永无尽头。</span>',
			'ybart_016manchengqi':'<font color=cyan>忆-016·似水流年</font>❀<span class=yellowtext>六艺篇</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>若思悔不及，则万念俱成枯。趁你还年轻，他还未老。<br/><span class=thundertext>满城柒，原型保密，转学后三中的同学。曾为我单相思的对象。后来时常打扰她。高中毕业后我彻底醒悟。善于唱歌，常听我诉说。喜欢夸赞别人。</span><br><span class=yellowtext>她只是个倾听者，动歪心思的是我。</span><br><font color=cyan><span style="opacity:0.1;">\u4e5f\u8bb8\u5979\u4e5f\u786e\u5b9e\u8ba4\u771f\u5730\u559c\u6b22\u8fc7\u6211\uff0c\u6bd5\u7adf\u5f53\u65f6\u6211\u8868\u73b0\u51fa\u5bf9\u4e09\u56fd\u6740\u7684\u5174\u8da3\uff0c\u5979\u5c31\u5047\u88c5\u4e5f\u559c\u6b22\u4e09\u56fd\u6740\uff0c\u521b\u9020\u4e0e\u6211\u7684\u5171\u540c\u8bdd\u9898\u3002\u5979\u53ea\u662f\u4e34\u573a\u6076\u8865\u4e00\u756a\u4e09\u56fd\u6740\u77e5\u8bc6\u800c\u5df2\uff0c\u56de\u60f3\u8d77\u90a3\u6bb5\u7ecf\u5386\uff0c\u6211\u53ef\u4ee5\u4e07\u5206\u80af\u5b9a\u3002\u90a3\u4e9b\u5f80\u4e8b\uff0c\u90a3\u4e9b\u7ec6\u8282\uff0c\u90fd\u662f\u90a3\u4e48\u7684\u6295\u6211\u6240\u597d\u3002\u5979\u5728\u90a3\u5e74\u590f\u5929\u4e3a\u6211\u5531\u7684\u6b4c\uff0c\u4ee4\u6211\u6f78\u7136\u6cea\u4e0b\u3002\u4e5f\u8bb8\u662f\u6211\u5e74\u5c11\uff0c\u4e0d\u61c2\u5f97\u8fdb\u9000\u5206\u5bf8\u5427\u3002</span></font><br><span class=yellowtext><br>妙园风雪途·作于2018、12、06<br>妙园风雪会今年，今年风雪会妙园。<br>妙园狭路逢故友，故友踌躇未敢言。<br>日光斜照方寸暖，驻足良久方开口。<br>问我伊人在何方，天自苍寥地自荒。<br>初时故人不自解，解时故人已去远。<br>朔风凛冽寒蝉翼，霜日摇曳嘲晚叶。<br>蝴蝶翩翩绕枝头，蜂虫依依戏牵牛。<br>葵花有意向金乌，松叶不愿轻易哭。<br>伊人有酒未曾吐，诗人佯醉却倾心。<br>染纸相思表赤血，清袖无丝碎真心。<br>诗人歌罢回看酒，酒陈杯新人已累。<br>推杯起身心方醒，人生何处无滋味。<br>醒时已是暮春时，回首才觉伊人醉。<br>诗人已书新赋草，伊人还读旧辞酹。<br>诗人佯醉已走脱，伊人持酒仍痴醉。<br>一曲歌罢梦回醒，诗人伊人皆有泪。<br>此间穿肠千种愧，诗人有愧方觉恨。<br>泪悔前头应有源，犹见孟德与公台。<br>妙园风雪别今年，今年风雪别妙园。<br>妙园宽径独徘徊，故人相见未敢认。</span>',
			'ybart_017xiaohong':'<font color=cyan>忆-017·似水流年</font>❀<span class=yellowtext>六艺篇</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：小红本尊<br/>在她的梦里，化作泡影的人重现。<br/><span class=thundertext>小红，原型保密，转学后三中的同学，为满城柒闺蜜。曾为单相思的我传递书信。为人天真活泼。<span style="text-decoration: line-through;">\u6027\u683c\u548c\u4f5c\u4e3a\u795e\u4f3c\u524d\u671f\u7684\u897f\u56ed\u5bfa\u4e16\u754c\u3002</span>至今关系依旧友好。</span>',
			'ybart_041mmuqin':'<font color=cyan>忆-041·似水流年</font>❀<span class=yellowtext>六艺篇</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>首充一元就送！<br/><span class=thundertext>慕琴，原型为崔妍，高中同学。主要事迹为，某天在一楼大厅里席地而坐，我给她投喂了一块钱，并戏称买了。后来她把一块钱还了回来，但1块钱卖身这个梗我能记一辈子。</span>',
			//---------------------------------//忆包鬼神易
			'dzsl_013yinji':'<font color=cyan>忆-013·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：鬼神易￥<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>尹姬，原型为尹超跃，六中三班一员，体操领操员。曾与我一同领操表演节目。曾一次失手用书夹划伤我手臂，伤疤至今依旧留在我手臂。其余事迹不详。</span>',
			'dzsl_014liutianyu':'<font color=cyan>忆-014·梦的缔造者</font><br>✿技能设计：夜白<br>✿代码撰写者：鬼神易￥<br>✿插图：暂无<br>✿配音：暂无<br/>腐化的身躯，沉湎梦境的灵魂，念旧的心。<br/><span class=thundertext>夜白，原型为作者本人，2019年春自号北地诗仙，2020年春夏自取别名夜白。故事仍在继续书写，也许永无尽头。</span>',
			'dzsl_014xinzhikui':'<font color=cyan>忆-014☆·绝对忠臣</font><br>✿技能设计：夜白<br>✿代码撰写者：鬼神易￥<br>✿插图：暂无<br>✿配音：暂无<br/>平凡的傀儡不过纵丝翩舞罢了，而我的傀儡可不一样，它由我心操控，能知晓我的一切心意，代价则是至爱者的生命。<br/><span class=thundertext></span>',
			'dzsl_015wanghairu':'<font color=cyan>忆-015·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：鬼神易￥<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>同是天涯沦落人，相逢何必曾相识。<br/><span class=thundertext>王海茹，原型为同名本人，转学后三中的同学，后任职为班长。为人德高望重，所有人都很尊敬她。一部分人尊称其为大姑，原因不详。成绩优异。曾在某次跳远时伤到腰部，其后由郭慧欣背其行动。几乎所有人皆因此而热情帮助她。曾劝解单相思的我，使我迷途得返。至今偶有微信联系。</span>',
			'dzsl_016manchengqi':'<font color=cyan>忆-016·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：鬼神易￥<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>若思悔不及，则万念俱成枯。趁你还年轻，他还未老。<br/><span class=thundertext>满城柒，原型保密，转学后三中的同学。曾为我单相思的对象。后来时常打扰她。高中毕业后我彻底醒悟。善于唱歌，常听我诉说。喜欢夸赞别人。</span><br><span class=yellowtext>她只是个倾听者，动歪心思的是我。</span><font color=cyan><br><span style="opacity:0.1;">\u4e5f\u8bb8\u5979\u4e5f\u786e\u5b9e\u8ba4\u771f\u5730\u559c\u6b22\u8fc7\u6211\uff0c\u6bd5\u7adf\u5f53\u65f6\u6211\u8868\u73b0\u51fa\u5bf9\u4e09\u56fd\u6740\u7684\u5174\u8da3\uff0c\u5979\u5c31\u5047\u88c5\u4e5f\u559c\u6b22\u4e09\u56fd\u6740\uff0c\u521b\u9020\u4e0e\u6211\u7684\u5171\u540c\u8bdd\u9898\u3002\u5979\u53ea\u662f\u4e34\u573a\u6076\u8865\u4e00\u756a\u4e09\u56fd\u6740\u77e5\u8bc6\u800c\u5df2\uff0c\u56de\u60f3\u8d77\u90a3\u6bb5\u7ecf\u5386\uff0c\u6211\u53ef\u4ee5\u4e07\u5206\u80af\u5b9a\u3002\u90a3\u4e9b\u5f80\u4e8b\uff0c\u90a3\u4e9b\u7ec6\u8282\uff0c\u90fd\u662f\u90a3\u4e48\u7684\u6295\u6211\u6240\u597d\u3002\u5979\u5728\u90a3\u5e74\u590f\u5929\u4e3a\u6211\u5531\u7684\u6b4c\uff0c\u4ee4\u6211\u6f78\u7136\u6cea\u4e0b\u3002\u4e5f\u8bb8\u662f\u6211\u5e74\u5c11\uff0c\u4e0d\u61c2\u5f97\u8fdb\u9000\u5206\u5bf8\u5427\u3002</span></font><br><span class=yellowtext><br>妙园风雪途·作于2018、12、06<br>妙园风雪会今年，今年风雪会妙园。<br>妙园狭路逢故友，故友踌躇未敢言。<br>日光斜照方寸暖，驻足良久方开口。<br>问我伊人在何方，天自苍寥地自荒。<br>初时故人不自解，解时故人已去远。<br>朔风凛冽寒蝉翼，霜日摇曳嘲晚叶。<br>蝴蝶翩翩绕枝头，蜂虫依依戏牵牛。<br>葵花有意向金乌，松叶不愿轻易哭。<br>伊人有酒未曾吐，诗人佯醉却倾心。<br>染纸相思表赤血，清袖无丝碎真心。<br>诗人歌罢回看酒，酒陈杯新人已累。<br>推杯起身心方醒，人生何处无滋味。<br>醒时已是暮春时，回首才觉伊人醉。<br>诗人已书新赋草，伊人还读旧辞酹。<br>诗人佯醉已走脱，伊人持酒仍痴醉。<br>一曲歌罢梦回醒，诗人伊人皆有泪。<br>此间穿肠千种愧，诗人有愧方觉恨。<br>泪悔前头应有源，犹见孟德与公台。<br>妙园风雪别今年，今年风雪别妙园。<br>妙园宽径独徘徊，故人相见未敢认。</span>',
			'dzsl_017xiaohong':'<font color=cyan>忆-017·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：鬼神易￥<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：小红本尊<br/>在她的梦里，化作泡影的人重现。<br/><span class=thundertext>小红，原型保密，转学后三中的同学，为满城柒闺蜜。曾为单相思的我传递书信。为人天真活泼。<span style="text-decoration: line-through;">\u6027\u683c\u548c\u4f5c\u4e3a\u795e\u4f3c\u524d\u671f\u7684\u897f\u56ed\u5bfa\u4e16\u754c\u3002</span>至今关系依旧友好。</span>',
			//---------------------------------//忆包神将
			'ybslshen_014liutianyu':'<span class=yellowtext>神☆忆-001·天涯的窥梦人</span><br>✿技能设计：夜白<br>✿代码撰写者：夜白<br>✿插图：暂无<br>✿配音：神姜维<br/><span class=yellowtext>作者本人，逼格满满，亮瞎你的眼。</span><br/><font color=cyan>夜白，原型为作者本人，2019年春自号北地诗仙，2020年春夏自取别名夜白。故事仍在继续书写，也许永无尽头。</font>',
			'ybslshen_017xiaohong':'<span class=yellowtext>神☆忆-002·儿童节限定</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/><span class=yellowtext>什么小鹿女啊，一定是世界上最可爱的孩子吧。</span><br/><font color=cyan>小红，原型保密，转学后三中的同学，为满城柒闺蜜。曾为单相思的我传递书信。为人天真活泼。<span style="text-decoration: line-through;">\u6027\u683c\u548c\u4f5c\u4e3a\u795e\u4f3c\u524d\u671f\u7684\u897f\u56ed\u5bfa\u4e16\u754c\u3002</span>至今关系依旧友好。</font>',
			'ybslshen_018zhangqing':'<span class=yellowtext>神☆忆-003·清明节限定</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/><span class=yellowtext>你说可怜世间万物，没有六万五的妞，怎样了你兜儿里只剩八万出头。</span><br/><font color=cyan>张晴，原型为同名本人，转学后三中的同学。与我关系甚好，高中时常短信沟通。曾取得其QQ号和密码以玩王者，后来其注销了。关系还算不错。</font>',
			'ybslshen_002chenailin':'<span class=yellowtext>神☆忆-004·初见与告别</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/><span class=yellowtext>渡口边最后一面洒下了句点，与你若只如初见何须感伤离别。</span><br/><span class=yellowtext>——许嵩《如果当时》</span><br/><span class=thundertext>陈爱琳，原型为同名本人，六中三班的一员，作者（以下称我）对那段时光最美好的回忆。以下文段为忆陈爱琳文。文本几经修改，终成定稿。对话原话不太记得了，因此用意义相同或相近的文言说法。</span><br><span class=firetext>注：文段受岁月滤镜影响，存在某处虚写。事实无论，吾言即是。</span><br><span class=yellowtext>久别不见，故作文怀之。<br>陈氏女，名爱琳，不知生年，癸巳年入初中，与之遇。孙氏女，名丽松，王氏女，名汉桢，皆为陈友。吾与之事实繁，然皆不记忆，依稀几数，至今铭心。<br>一日，学政治，谈男女往来，毕，吾谓陈曰：“男女具，身心益。”，<span style="opacity:0.1;">（男生女生在一起，有益健康）这是我记得的为数不多的原话。请允许我把这句话藏起来，毕竟现在想想太羞耻了，抓紧忘了吧我天。</span><br>三女具嗤，道：“淫嬷嬷”，乃去。<br>初识，吾与陈并列第三，师谓曰：“汝二人，定分高下。”及试，座临。考历史，陈密索一字。吾以此挟，索屈原事迹，附：吾二人，定分高下。出榜，陈三吾七，陈笑，顾二女曰：“才道，定分高下。”余赤面而去。<br>一日，学语文，讲柳宗元之小石潭记，校音，及“壹”，吾和曰：仅旧版钱有之。满堂皆笑。师曰：“汝视之。”余惑，遂取钱视之，乃悟，遂羞而掩面。</span><span class=firetext>注：岁月的滤镜下，吾总觉陈之笑最甚。事实无论，吾言即是。</span><br><span class=yellowtext>彼时，偶见之以美工刀划臂。便私书之：“书曰：珍己，勿伤。”陈惶，书，顾左右而传之。启之，曰：“无宣，令师知也。”余内笑，回曰：“莫如此也。”对曰：“善。”此事揭过。<br>一日，与人冲突，因果皆不记忆。其人名姜玉恒。冲吾，使吾跌。余奋极，恰右有棍，遂操棍挺身抡之，中头，棍折，余怒尚在，幸观者分之，而姜步罗圈，道：没事。待定，回味此棍，复操之以试击，仿佛为要害也，及顾而问陈：“如此，是耶？”陈惊，颔而应之。吾才省，知此事惧之也。师知，谓皆有过，遂不提。<br>一日，学英语，点我名。有灯垂于梁。余起欲答，忽身失衡，刹那而仰，见灯如柳摇曳，方知地动。当是时，警铃鸣，楼摇轰，脚踏声，一时齐发，不可辩也。余乃惊，携冠欲潜桌下，师曰：“不坚！”遂随流而下。及远，乃检冠中钱，未损。乃假七日。<br>稍定，一日语文课，有联曰：殷殷舔犊情。无人能对。余上而书：情情抚挚颊。盖断错句、解错意也。乃顾陈，以示炫耀。师不可解，曰：“上联言亲情，下联言爱情，稍欠。”余亦觉欠，然无益者。<br>某晚，尚余一刻钟。余沉思，师曰：“复地动乎？”余闻轰，以为移案。师曰：“莫不是窗动？不详。”言讫，始觉轰声愈响，坐不稳，忽闻铃震，皆慌而走。始静，复检冠中钱。顾陈，亦无恙。乃假一月。<br>某日，吾二人独处于室，随心而谈，曰：“汝敛袖，吾欲检之。”乃奋袖出臂。余观之，无痕。其肤白而美，余难耐而抚之，遂怦然心动。陈忽道：“你多久没剪指甲？”吾曰：“四月。”陈默。良久，乃曰：“今周五，周六周日你洗澡剪指甲，周一我检查。则赐一车饼干。”乃信之。然懒惰成性，终未成，此为后话。当晚归家，母曰：“汝父欲使汝北还续学，何如？”余道：“安乐与此，何故北还？”母曰：“汝藉在北。若留需迁藉易姓。”余决然道：“大丈夫，岂能易姓？吾当北还。”乃定甲午秋北还续学。复无相见，甚念之矣。<br>丁酉，业毕。余南下归故校，觅旧师，叹往昔。问及诸友，则曰：“王汉桢入三中，孙丽松入实验……”独不见陈爱琳。问之，则叹曰：“汝去，即堕。吾见其与众男厮，恐其安危，遂告教导主任，岂料教导主任因其男女关系不当，记其大过。爱琳恨我。顷之辍学，不复见也。”<br>余闻之，甚悲。实意料之外，又情理之中。倘吾异姓而拒北，迁藉而居南，定有挽澜之机。虽吾今有知，然知者何如？不知者何如？知深而乐衰，视广而情短，悲哉！<br>念君，恬静，不知。<br>殷殷舔犊情，浅浅执手意。<br>安否？佳祺。</span><br><span class=thundertext>谨以此文，祭年少无知。<br>我不会主动去寻觅失散的人，也不会去追问她们后来怎样。她们在我印象中留下的美丽的足迹，对我而言已经是宝贵的财富。这份回忆足以温暖我一生。</span>',
			'ybslshen_071faraway':'<span class=yellowtext>神☆忆-005·银河启示者</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：派蒙AI绘图<br>❀配音：想去远方本尊<br/><span class=yellowtext>I want to go far away!</span><br/><font color=cyan>想去远方，原型为本扩展最早的游玩者之一，真名不详，事迹暂无。</font>',
			'ybslshen_073Al':'<span class=yellowtext>神☆忆-006·天牢令</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：QQ小世界AI绘图<br>❀配音：暂无<br/><span class=yellowtext>村花不会绝情，铝酸有点缺氢<span style="text-decoration: line-through;"><span style="opacity:0.2;">\uff08\u60c5\uff09</span></span>。</span><br/><font color=cyan>铝，原型为本扩展最早的游玩者之一，真名不详，事迹暂无。</font>',
			'ybslshen_074piao':'<span class=yellowtext>神☆忆-007·掌中寰宇</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：花落隨風钦定网图<br>❀配音：暂无<br/>待填写。<br/><span class=thundertext>花落隨風，原型为本扩展最早的游玩者之一，真名不详，事迹暂无。</span>',
			'ybslshen_001sunlisong':'<span class=yellowtext>神☆忆-008·流年易逝</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：灵境AI绘图<br>❀配音：暂无<br/>回忆最为美好，它将你思念的对象不断美化。<br/><span class=thundertext>孙丽松，原型为同名本人，陈爱琳和王汉桢的闺蜜，六中三班的一员。不算太熟，但隐约记得关系还不错，言行举止令人如沐春风。</span>',
			'ybslshen_100Cosette':'<span class=yellowtext>神☆忆-009·Cosette！</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：u佬钦定原画<br>❀配音：暂无<br/><span class=yellowtext>Cosette！</span><br/><font color=cyan>珂赛特，为u佬定制武将，原型为u佬，真名不详，事迹暂无。</font>',//珂赛特
			//---------------------------------//忆包废案
			'ybslshen_002chenailin_feian':'<span class=yellowtext>神☆忆-004·初见与告别</span><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>B站成品图片<br>❀配音：暂无<br/><span class=yellowtext>废案</span>',
			'ybsl_018zhangqing_feian':'<font color=cyan>忆-018☆·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>废案。',
			'ybsb_084zhangmi':'<font color=cyan>忆-084·痴惘之妒魂</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：灵境AI绘图<br>◈配音：暂无<br/>这是一个通渠的废案<br/>',
			'ybsb_077yangqixu':'<font color=cyan>忆-077·似水流年</font><br>◈技能设计：夜白<br>◈代码撰写者：夜白<br>◈插图：暂无<br>◈配音：暂无<br/>这是一个旧版的废案。',
			'ybsb_068qingyue':'<font color=cyan>忆-068·似水流年</font><br>❀技能设计：夜白<br>❀代码撰写者：夜白<br>❀插图：<style type="text/css">#shiroha_bilibili:link, #shiroha_bilibili:visited {color:white;}</style><a id="shiroha_bilibili" href="https://space.bilibili.com/2170177" target="_blank"><span class="YB_http">哔哩哔哩up主鸣濑白羽酱</span></a>群内半成品图片<br>❀配音：暂无<br/>清月伴孤影，落红眷飞鸿。<br/>这是一个旧版的废案。',
			'ybsb_048wushuang':'<font color=cyan>忆-048·似水流年</font><br>❁技能设计：夜白<br>❁代码撰写者：夜白<br>❁插图：派蒙AI绘图<br>❁配音：暂无<br/>这是一个旧版的废案，因为太离谱而改掉。',
			
		},//武将介绍（选填） 
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

		*/
		characterReplace:{//同名武将切换
			dzsl_013yinji:['dzsl_013yinji','ybsl_013yinji'],//尹姬
			dzsl_014liutianyu:['dzsl_014liutianyu','db_ybsp_014liutianyu','ybart_014liutianyu'],//夜白
			dzsl_016manchengqi:['dzsl_016manchengqi','ybsl_016manchengqi','ybart_016manchengqi','ybsp_016manchengqi'],//满城柒
			dzsl_017xiaohong:['dzsl_017xiaohong','ybsl_017xiaohong','ybart_017xiaohong'],//小红
			ybsl_018zhangqing:['ybsl_018zhangqing','ybsl_018zhangqing_feian'],//张晴
			db_ybsl_038tengwu:['db_ybsl_038tengwu','db_ybsp_038tengwu'],//滕武
			ybslshen_002chenailin:['ybslshen_002chenailin','ybslshen_002chenailin_feian'],//神陈爱琳
			ybsl_002chenailin:['ybsl_002chenailin','ybsp_002chenailin'],//陈爱琳
			ybsl_084zhangmi:['ybsb_084zhangmi','ybsl_084zhangmi','ybnb_084zhangmi'],//张汨
			ybsl_034zhoulianyuan:['ybsl_034zhoulianyuan','ybnb_034zhoulianyuan'],//周怜渊
		},//同名武将切换
		perfectPair:{//珠联璧合
			'db_ybsp_014liutianyu':[
				'ybsl_002chenailin','ybsl_009liyushan','ybsl_010zhouyue','dzsl_015wanghairu',
				'ybsl_008wuyuxin','ybart_016manchengqi','dzsl_016manchengqi','ybsp_016manchengqi','ybsl_016manchengqi',
				'ybart_017xiaohong','dzsl_017xiaohong','ybslshen_017xiaohong','ybsl_017xiaohong',
				'ybsl_018zhangqing','ybslshen_018zhangqing','ybsl_018zhangqing_feian',
				'ybsl_023shiqingyu','db_ybsl_038tengwu','db_ybsp_038tengwu',
				'db_ybsl_067snake','ybsp_002chenailin','ybsl_027rain','ybsp_027rain',
				'ybsl_047shan',
			],
			'ybslshen_014liutianyu':[
				'ybsl_002chenailin','ybsl_009liyushan','ybsl_010zhouyue','dzsl_015wanghairu',
				'ybsl_008wuyuxin','ybart_016manchengqi','dzsl_016manchengqi','ybsp_016manchengqi','ybsl_016manchengqi',
				'ybart_017xiaohong','dzsl_017xiaohong','ybslshen_017xiaohong','ybsl_017xiaohong',
				'ybsl_018zhangqing','ybslshen_018zhangqing','ybsl_018zhangqing_feian',
				'ybsl_023shiqingyu','db_ybsl_038tengwu','db_ybsp_038tengwu',
				'db_ybsl_067snake','ybsp_002chenailin','ybsl_027rain','ybsp_027rain',
				'ybsl_047shan',
			],
			'dzsl_017xiaohong':[
				'dzsl_016manchengqi','ybart_016manchengqi','ybsp_016manchengqi','ybsl_016manchengqi',
				'ybsl_019shengyan','dzsl_015wanghairu','ybsl_015wanghairu',
				'ybsl_018zhangqing','ybsl_018zhangqing_feian','ybslshen_018zhangqing',
			],
			'ybart_017xiaohong':[
				'dzsl_016manchengqi','ybart_016manchengqi','ybsp_016manchengqi','ybsl_016manchengqi',
				'ybsl_019shengyan','dzsl_015wanghairu','ybsl_015wanghairu',
				'ybsl_018zhangqing','ybsl_018zhangqing_feian','ybslshen_018zhangqing',
			],
			'ybslshen_017xiaohong':[
				'dzsl_016manchengqi','ybart_016manchengqi','ybsp_016manchengqi','ybsl_016manchengqi',
				'ybsl_019shengyan','dzsl_015wanghairu','ybsl_015wanghairu',
				'ybsl_018zhangqing','ybsl_018zhangqing_feian','ybslshen_018zhangqing',
			],
			'ybsl_017xiaohong':[
				'dzsl_016manchengqi','ybart_016manchengqi','ybsp_016manchengqi','ybsl_016manchengqi',
				'ybsl_019shengyan','dzsl_015wanghairu','ybsl_015wanghairu',
				'ybsl_018zhangqing','ybsl_018zhangqing_feian','ybslshen_018zhangqing',
			],
			'dzsl_015wanghairu':[
				'ybart_016manchengqi','dzsl_016manchengqi','ybsp_016manchengqi','ybsl_016manchengqi',
				'ybsl_018zhangqing','ybsl_018zhangqing_feian','ybslshen_018zhangqing',
			],
			'ybsl_015wanghairu':[
				'ybart_016manchengqi','dzsl_016manchengqi','ybsp_016manchengqi','ybsl_016manchengqi',
				'ybsl_018zhangqing','ybsl_018zhangqing_feian','ybslshen_018zhangqing',
			],
			'ybsl_001sunlisong':[
				'ybsl_002chenailin','ybslshen_002chenailin','ybslshen_002chenailin_feian',
				'ybsp_002chenailin',
			],
			'ybsp_001sunlisong':[
				'ybsl_002chenailin','ybslshen_002chenailin','ybslshen_002chenailin_feian',
				'ybsp_002chenailin',
			],
			'ybslshen_001sunlisong':[
				'ybsl_002chenailin','ybslshen_002chenailin','ybslshen_002chenailin_feian',
				'ybsp_002chenailin',
			],
			'ybsl_018zhangqing':[
				'ybsl_031huanqing',
			],
			'ybslshen_018zhangqing':[
				'ybsl_031huanqing',
			],
			'ybsl_018zhangqing_feian':[
				'ybsl_031huanqing',
			],
			'ybsl_056dongjianchao':[
				'ybsl_057sunmeiqi',
			],
			'ybslshen_018zhangqing':[
				'ybsl_031huanqing',
			],
			'ybsl_010zhouyue':[
				'ybsl_009liyushan','ybsl_008wuyuxin','ybsl_011gaoyuhang',
			],
			'ybsl_008wuyuxin':[
				'ybsl_009liyushan','ybsl_011gaoyuhang',
			],
			'ybsl_009liyushan':[
				'ybsl_011gaoyuhang',
			],
			'ybsl_004zhangyujie':[
				'ybsl_048wushuang',
			],
			'ybsl_084zhangmi':[
				'ybsl_047shan',
			],
			'ybsb_084zhangmi':[
				'ybsl_047shan',
			],
			'ybsl_047shan':[
				'db_ybsl_038tengwu','db_ybsp_038tengwu','ybsl_082bianqiuwen','ybsl_025shiwang','ybsl_023shiqingyu',
			],
			'sgsh_yinglong':[
				'sgsh_nvba',
			],
		},//珠联璧合武将（选填）
		characterFilter:{//禁用
			dzsl_014liutianyu:function(mode){
				return mode!='guozhan';
			},
			dzsl_014xinzhikui:function(mode){
				return mode!='guozhan';
			},
			//傀夜白和傀儡在国战禁用
		},//武将使用条件
		characterTitle:{//称号
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
			'ybsl_015wanghairu':'<font color=cyan>似水流年</font>',
			'ybsl_016manchengqi':'<font color=cyan>似水流年</font>',
			'ybsl_017xiaohong':'<font color=cyan>似水流年</font>',
			'ybsl_018zhangqing':'<font color=cyan>晓月照怀</font>',
			'ybsl_019shengyan':'<font color=cyan>醋心少女</font>',
			'ybsl_020jiayutong':'<font color=cyan>似水流年</font>',
			'ybsl_021liuyufeng':'<font color=cyan>似水流年</font>',
			'ybsl_022salt':'<font color=cyan>待填写</font>',
			'ybsl_023shiqingyu':'<font color=cyan>心灵守望</font>',
			'ybsl_024yuetong':'<font color=cyan>糖心少女</font>',
			'ybsl_025shiwang':'<font color=cyan>似水流年</font>',
			'ybsl_026can':'<font color=cyan>巡梦回音</font>',
			'ybsl_027rain':'<font color=cyan>巡梦鸣觉</font>',
			'ybsl_028crystal':'<font color=cyan>巡梦回响</font>',
			'ybsl_029dawn':'<font color=cyan>巡梦长息</font>',
			'ybsl_030book':'<font color=cyan>巡梦道演</font>',
			'ybsl_031huanqing':'<font color=cyan>巡梦魅影</font>',
			'ybsl_032baiyichen':'<font color=cyan>旅者</font>',
			'ybsl_033xiaohui':'<font color=cyan>断肠人在天涯</font>',
			'ybsl_034zhoulianyuan':'<font color=cyan>庄子的执剑人</font>',
			'ybsl_035stamp':'<font color=cyan>龙裔象征</font>',
			'ybsl_036bright':'<font color=cyan>魔王的跑酷</font>',
			'ybsl_037diamondqueen':'<font color=cyan>深海的通灵龟</font>',
			'db_ybsl_038tengwu':'<font color=cyan>缘尽梦碎</font>',
			'ybsl_039zhafu':'<font color=cyan>制符新生</font>',
			'ybsl_040ether':'<font color=cyan>缘尽梦碎</font>',
			'ybsl_041mmuqin':'<font color=cyan>似水流年</font>',
			'ybsl_042pingzi':'<font color=cyan>似水流年</font>',
			'ybsl_043fangjiayu':'<font color=cyan>似水流年</font>',
			'ybsl_044huruihang':'<font color=cyan>似水流年</font>',
			'ybsl_045gaocong':'<font color=cyan>似水流年</font>',
			'ybsl_046jiangxuewu':'<font color=cyan>似水流年</font>',
			'ybsl_047shan':'<font color=cyan>游魂惊梦</font>',
			'ybsl_048wushuang':'<font color=cyan>长白山的神女</font>',
			'ybsl_049waner':'<font color=cyan>似水流年</font>',
			'ybsl_050zunjian':'<font color=cyan>似水流年</font>',
			'ybsl_051fomalhaut':'<font color=cyan>似水流年</font>',
			'ybsl_052trees':'<font color=cyan>似水流年</font>',
			'ybsl_053qiuer':'<font color=cyan>似水流年</font>',
			'ybsl_054yueer':'<font color=cyan>共轭之恋</font>',
			'ybsl_055zhengyan':'<font color=cyan>似水流年</font>',
			'ybsl_056dongjianchao':'<font color=cyan>似水流年</font>',
			'ybsl_057sunmeiqi':'<font color=cyan>似水流年</font>',
			'ybsl_058sunshibo':'<font color=cyan>似水流年</font>',
			'ybsl_059starsFall':'<font color=cyan>似水流年</font>',
			'ybsl_059starsFall1':'<font color=cyan>似水流年</font>',//'鞠熒',//本名保密
			'ybsl_059starsFall2':'<font color=cyan>似水流年</font>',//'宋橤',//本名保密橤渁
			'ybsl_059starsFall3':'<font color=cyan>似水流年</font>',//'周靈',//本名保密
			'ybsl_059starsFall4':'<font color=cyan>似水流年</font>',//'李曉',//本名保密
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
			'ybsl_082bianqiuwen':'<font color=cyan>似水流年</font>',
			'ybsl_083xiaozhu':'<font color=cyan>巡梦天合</font>,',
			'ybsl_084zhangmi':'<font color=cyan>痴惘之妒魂</font>',
			'ybsl_085DGY':'<font color=cyan>雨漫孤城</font>,',
			'ybsl_086GJ':'<font color=cyan>似水流年</font>',
			//---------------------------------//忆包SP
			'db_ybsp_014liutianyu':'<font color=cyan>暗流涌动</font>',
			'ybsp_016manchengqi':'<font color=cyan>清明节限定</font>',
			'db_ybsp_038tengwu':'<font color=cyan>缘尽梦碎</font>',
			'ybsp_072sulingyi':'<font color=cyan>不祥的命运</font>',
			'ybsp_001sunlisong':'<font color=cyan>皓腕凝霜雪</font>',
			'ybsp_002chenailin':'<font color=cyan>玉殒香消</font>',
			'ybsp_027rain':'<font color=cyan>巡梦鸣觉</font>',
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
			'ybslshen_002chenailin_feian':'<span class=yellowtext>初见与告别</span>',
			'ybsl_018zhangqing_feian':'<font color=cyan>似水流年</font>',
			'ybsb_084zhangmi':'<font color=cyan>痴惘之妒魂</font>',
			'ybsb_077yangqixu':'<font color=cyan>似水流年</font>',
			'ybsb_068qingyue':'<font color=cyan>似水流年</font>',
			'ybsb_048wushuang':'<font color=cyan>似水流年</font>',
		},//武将标题（用于写称号或注释）（选填） 
		skill:{
			//-------------------------华胥
			'sgsh_talei':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'phaseZhunbeiBegin',
				},
				check:function (event,player){
					return get.attitude(player,event.player)<=0;
				},
				content:function (){
					// 'step 0'
					// event.judgestr="闪电";
					// trigger.player.judge(event.judgestr,function(card){
						// if(get.suit(card)=='spade'&&get.number(card)>1&&get.number(card)<10)return -5;
						// return 1;
					// });
					// 'step 1'
					// if(result.bool==false){
						// trigger.player.damage(3,'thunder','nosource');
					// }
					// else{
						// event.finish();
					// }
					trigger.player.executeDelayCardEffect('shandian');
				},
				ai:{
					expose:1,//跳立场
					threaten:0.5,//嘲讽值
				},
			},
			'sgsh_yunyuu':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'judgeEnd',
				},
				preHidden:true,
				frequent:true,
				filter:function (event,player){
					return get.suit(event.result.card)=='heart'
				},
				content:function (){
					player.draw(1);
				},
			},
			//-----------------------------太子长琴
			'sgsh_yuefeng':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'phaseJieshuBefore',
				},
				filter:function (event,player){
					return !event.numFixed;
				},
				frequent:true,
				content:function (){
					player.YB_shelie(3,'乐风');
				},
				ai:{
					threaten:1.2,//嘲讽值
				},
			},
			'sgsh_zhisheng':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'useCardAfter',
				},
				filter:function (event,player){
					if(player.countCards('hes')==0)return false;
					if(event.player!=player&&event.card.isCard&&event.player.isPhaseUsing()){
						return event.player.getHistory('useCard').indexOf(event)==player.hp-1;
					}
				},
				check:function (event,player){
					return get.attitude(player,event.player)<0;
				},
				nopop:true,
				content:function (){
					'step 0'
					player.chooseToDiscard('he');
					'step 1'
					if(result.bool){
						player.logSkill('sgsh_zhisheng')
						var evt=_status.event.getParent('phaseUse');
						if(evt&&evt.name=='phaseUse'){
							evt.skipped=true;
							event.finish();
						}
					}
				},
				ai:{
					result:{
						player:-0.5,
						target:function (target){
							return -0.5*(Math.pow(target.countCards('h')-target.maxHandcard))
						},
					},
					threaten:3,//嘲讽值
					expose:1,//跳立场
				},
			},
			//-----------------------女魃
			'sgsh_buyu':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'phaseZhunbeiBegin',
				},
				check:function (event,player){
					if(get.attitude(player,event.player)<-2){
						var cards=player.getCards('h');
						if(cards.length>player.hp) return true;
						for(var i=0;i<cards.length;i++){
							var useful=get.useful(cards[i]);
							if(useful<5) return true;
							if(cards[i].number>9&&useful<7) return true;
						}
					}
					return false;
				},
				logTarget:'player',
				filter:function (event,player){
					return player.canCompare(event.player);
				},
				content:function (){
					'step 0'
					player.chooseToCompare(trigger.player);
					'step 1'
					if(result.bool){
						trigger.player.addTempSkill('sgsh_buyu2')
					}
				},
				ai:{
					threaten:3,//嘲讽值
					expose:1,//跳立场
				},
			},
			'sgsh_hanshen':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:['equipAfter','addJudgeAfter','loseAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				},
				forced:true,
				filter:function (event,player){
					return game.hasPlayer(function(current){
						var evt=event.getl(current);
						return evt&&evt.hs&&evt.hs.length&&current.countCards('h')==0;
					});
				},
				content:function (){
					player.draw();
				},
				ai:{
					threaten:1.3,//嘲讽值
					noh:true,
				},
			},
			'sgsh_buyu2':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'phaseDrawBefore',
				},
				forced:true,
				content:function (){
					trigger.cancel();
				},
			},
			//-----------------------罗睺
			'sgsh_yueshi':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'useCardAfter',
				},
				direct:true,
				popup:false,
				filter:function (event,player){
					return player.countCards('he')!=0;
				},
				content:function (){
					'step 0'
					player.choosePlayerCard(player,'he');
					'step 1'
					if(result.bool){
						player.logSkill('sgsh_yueshi',player);
						player.recast(result.cards)
					}
				},
			},
			//------------------------东王公
			'sgsh_baigong':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'phaseDrawBefore',
					global:'phaseDrawAfter',
				},
				forced:true,
				content:function (){
					if(trigger.player!=player){
						player.gainPlayerCard('he',trigger.player,true);
						if(game.countPlayer()<=4&&trigger.player.countCards('he')>player.countCards('he')){
							player.gainPlayerCard('he',trigger.player,true);
						}
					}
					else{
						trigger.cancel();
					}
				},
			},
			'sgsh_cangling':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'phaseUseAfter',
				},
				filter:function (event,player){
					//if(player.getHistory('skipped').contains('phaseUse')) return false;
					return player.getHistory('useCard',function(evt){
						if(evt.targets&&evt.targets.length&&evt.isPhaseUsing()){
							var targets=evt.targets.slice(0);
							while(targets.contains(player)) targets.remove(player);
							return targets.length>0;
						}
						return false;
					}).length==0;
				},
				content:function (){
					'step 0'
					player.chooseTarget('请选择一名角色令其增加一点体力上限，然后你回复一点体力',true);
					'step 1'
					var target=result.targets[0];
					target.gainMaxHp();
					player.recover();
				},
			},
			//---------------------------应龙
			'sgsh_zongshui':{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				animationColor:'thunder',
				skillAnimation:true,
				filterCard:function(card){
					var suit=get.suit(card);
					for(var i=0;i<ui.selected.cards.length;i++){
						if(get.suit(ui.selected.cards[i])==suit) return false;
					}
					return true;
				},
				selectCard:[1,Infinity],
				complexCard:true,
				filterTarget:function(card,player,target){
					return player!=target&&target.countDiscardableCards(player,get.is.single()?'he':'hej');
				},
				selectTarget:[1,Infinity],
				content:function(){
					'step 0'
					player.discardPlayerCard(target,'he',1,true);
					'step 1'
					event.card=result.cards[0];
					event.cards=cards;
					for (var i of event.cards){
						var t=get.suit(i,false);
						if(get.suit(event.card)==t){
							target.addTempSkill('sgsh_zongshui_mo');
						}
					}
				},
				check:function(card){
					return 6-get.value(card);
				},
				position:'he',
				ai:{
					threaten:1.5,//嘲讽值
					damage:true,
					expose:1,//跳立场
					order:8,//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
					result:{//主动技的收益
						player:function(player,target){
							return 1;
						},
						target:function(player,target){
							return get.damageEffect(target,player);
						},
					},
				},
				subSkill:{
					mo:{
						mark:true,
						mod:{
							cardEnabled:function(){
								return false;
							},
							cardRespondable:function(){
								return false;
							},
							cardSavable:function(){
								return false;
							}
						},
						intro:{
							content:'不能使用或打出卡牌'
						}
					}
				}
			},
			///-------------刑天
			sgsh_fuchou:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{global:'phaseAfter'},
				filter:function(event,player){
					var target=event.player;
					return target.getHistory('sourceDamage',function(evt){
						return evt.player==player;
					}).length>0;
				},
				check:function(event,player){
					var target=event.player;
					if(get.effect(target,{name:'sha'},target,player)>0)return true;
					return false;
				},
				content:function(){
					'step 0'
					player.draw();
					player.useCard({name:'sha',isCard:false},trigger.player,'sgsh_fuchou');
				},
			},
			//--------------西王母
			sgsh_kunlun:{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				trigger:{
					target:'useCardToTargeted',
				},
				filter:function(event,player){
					// if(!player.isDamaged())return false;
					return get.suit(event.card)=='spade';
				},
				content:function(){
					'step 0'
					player.draw(2);
					'step 1'
					if(!player.isDamaged())player.chooseToDiscard('he',2,true);
				},
			},
			sgsh_huasheng:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'phaseUseAfter',
				},
				filter:function (event,player){
					//if(player.getHistory('skipped').contains('phaseUse')) return false;
					// return player.getHistory('useCard',function(evt){
					// 	if(evt.targets&&evt.targets.length&&evt.isPhaseUsing()){
					// 		var targets=evt.targets.slice(0);
					// 		while(targets.contains(player)) targets.remove(player);
					// 		return targets.length>0;
					// 	}
					// 	return false;
					// }).length==0;
					return true;
				},
				// filter:function(event,player){
				// 	var target=event.player;
				// 	return target.getHistory('useCard',function(evt){
				// 		return evt.isPhaseUsing();
				// 	}).length==0;
				// },
				direct:true,
				content:function(){
					'step 0'
					player.chooseCard('h',get.prompt('sgsh_huasheng'),'展示并视为使用一张基本牌或普通锦囊牌',function(card,player){
						var type=get.type(card,player);
						return type=='basic'||type=='trick';
					}).set('ai',function(card){
						var player=_status.event.player,name=get.name(card,player);
						if(name=='jiu') return 0;
						return player.getUseValue({
							name:name,
							nature:get.nature(card,player),
							isCard:true,
						})
					});
					'step 1'
					if(result.bool){
						player.logSkill('sgsh_huasheng');
						player.showCards(result.cards,get.translation(player)+'发动了【化生】');
						var card={
							name:get.name(result.cards[0],player),
							nature:get.nature(result.cards[0],player),
							isCard:true,
						}
						player.chooseUseTarget(card,true,false);
					}
				},
			},
			//---------禺强
			sgsh_zhihai:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{global:'phaseBegin'},
				filter:function(event,player){
					var tar=event.player;
					if(player==tar) return false;
					return true;
				},
				content:function(){
					'step 0'
					player.storage.sgsh_zhihai_list=ui.cardPile;
					player.storage.sgsh_zhihai_list2=ui.discardPile;
					'step 1'
					ui.cardPile=player.storage.sgsh_zhihai_list2;
					ui.discardPile=player.storage.sgsh_zhihai_list;
				},
			},
			sgsh_xuanming:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{global:'phaseAfter'},
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					var discarded=get.discarded();
					if(discarded.length){
						var next=player.chooseToMove();
						next.set('list',[
							['弃牌堆顶（翻过来后就是牌堆底）',discarded],
							['弃牌堆底（翻过来后就是牌堆顶）'],
						]);
						next.set('prompt', '玄冥：选择任意张牌，以任意顺序置于弃牌堆底（翻过来之后就成了牌堆顶）').set('processAI', function (list) {
							var player = _status.event.player, cards = list[0][1].sort(function (a, b) {
								return get.useful(a) - get.useful(b);
							}), cards2 = cards.splice(0, Math.ceil(discarded.length / 2));
							return [cards2, cards];
						});
						// player.chooseCardButton('选择任意张牌，以任意顺序置于弃牌堆底（翻过来之后就成了牌堆顶）',[0,Infinity],discarded).set('ai',function(button){
						// 	return 6-get.value(button.link);
						// });
					}
					else{
						event.finish();
					}
					'step 1'
					// console.log(result);
					if (result.moved) {
						var top = result.moved[1];
						var bottom = result.moved[0];
						top.reverse();
						for (var i = 0; i < top.length; i++) {
							ui.discardPile.insertBefore(top[i], ui.discardPile.firstChild);
						}
						for (i = 0; i < bottom.length; i++) {
							ui.discardPile.appendChild(bottom[i]);
						}
						player.popup(get.cnNumber(top.length) + '上' + get.cnNumber(bottom.length) + '下');
						game.log(player, '将' + get.cnNumber(top.length) + '张牌置于牌堆顶');
						game.updateRoundNumber();
						game.delayx();
					}//QQQ
				},
			},
			//---------------大禹
			sgsh_zhishui:{
				audio:'ext:夜白神略/audio/character:2',
				usable:1,
				enable:'phaseUse',
				selectTarget:function(event,player){
					var num=player.hp;
					return [1,num];
				},
				content:function(){
					'step 0'
					var cards=target.getCards('he');
					event.num=cards.length;
					target.discard(cards);
					'step 1'
					target.draw(event.num); 
				}
			},
			/*
			sgsh_kunlun:'昆仑',
			'sgsh_kunlun_info':'锁定技，当你成为黑桃牌的目标时，若你已受伤，你摸两张牌。',
			sgsh_huasheng:'化生',
			'sgsh_huasheng_info':'若你出牌阶段未使用任何牌，结束阶段开始时，你可以将一张手牌当任意基本牌或非延时锦囊牌使用。',
			sgsh_zhihai:'治海',
			'sgsh_zhihai_info':'一名其他角色的出牌阶段开始时，你可以将弃牌堆与牌堆交换。',
			sgsh_xuanming:'玄冥',
			'sgsh_xuanming_info':'每当一名角色的回合结束后，你可以将此回合进入弃牌堆的牌任意顺序放置在弃牌堆顶或弃牌堆底。',
			sgsh_zhishui:'治水',
			'sgsh_zhishui_info':'出牌阶段限一次，你可以令至多X名角色弃置所有牌并摸等量的牌，X为你当前体力值。',
			*/
			//--------------界纵丝
			kagari_ybzongsi:{
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					var controls=[];
					if(ui.cardPile.hasChildNodes()) controls.push('选择牌堆中的一张牌');
					if(ui.discardPile.hasChildNodes()) controls.push('选择弃牌堆中的一张牌');
					if(game.hasPlayer(function(current){
						return current.countCards('hej')>0;
					})) controls.push('选择一名角色区域内的一张牌');
					if(!controls.length){event.finish();return;}
					event.controls=controls;
					var next=player.chooseControl();
					next.set('choiceList',controls)
					next.set('prompt','请选择要移动的卡牌的来源');
					next.ai=function(){return 0};
					'step 1'
					result.control=event.controls[result.index];
					var list=['弃牌堆','牌堆','角色'];
					for(var i=0;i<list.length;i++){
						if(result.control.indexOf(list[i])!=-1){event.index=i;break;}
					}
					if(event.index==2){
						player.chooseTarget('请选择要移动的卡牌的来源',true,function(card,kagari,target){
							return target.countCards('hej')>0;
						});
					}
					else{
						var source=ui[event.index==0?'discardPile':'cardPile'].childNodes;
						var list=[];
						for(var i=0;i<source.length;i++) list.push(source[i]);
						player.chooseButton(['请选择要移动的卡牌',list],true).ai=get.buttonValue;
					}
					'step 2'
					if(event.index==2){
						player.line(result.targets[0]);
						event.target1=result.targets[0];
						player.choosePlayerCard(result.targets[0],true,'hej').set('visible',true);
					}
					else{
						event.card=result.links[0];
					}
					'step 3'
					if(event.index==2) event.card=result.cards[0];
					var controls=[
						'将这张牌移动到牌堆的顶部或者底部',
						'将这张牌移动到弃牌堆的顶部或者底部',
						'将这张牌移动到一名角色对应的区域里',
					];
					event.controls=controls;
					var next=player.chooseControl();
					next.set('prompt','要对'+get.translation(event.card)+'做什么呢？');
					next.set('choiceList',controls);
					next.ai=function(){return 2};
					'step 4'
					result.control=event.controls[result.index];
					var list=['弃牌堆','牌堆','角色'];
					for(var i=0;i<list.length;i++){
						if(result.control.indexOf(list[i])!=-1){event.index2=i;break;}
					}
					if(event.index2==2){
						player.chooseTarget('要将'+get.translation(card)+'移动到哪一名角色的对应区域呢',true).ai=function(target){
							return target==_status.event.player?1:0;
						};
					}
					else{
						player.chooseControl('顶部','底部').set('prompt','把'+get.translation(card)+'移动到'+(event.index2==0?'弃':'')+'牌堆的...');
					}
					'step 5'
					if(event.index2!=2){
						//if(event.target1) event.target1.lose(card,ui.special);
						//else card.goto(ui.special);
						event.way=result.control;
					}
					else{
						event.target2=result.targets[0];
						var list=['手牌区'];
						if(lib.card[card.name].type=='equip'&&event.target2.canEquip(card)) list.push('装备区');
						if(!event.target2.isDisabledJudge()) list.push('判定区');
						if(list.length==1) event._result={control:list[0]};
						else{
							player.chooseControl(list).set('prompt','把'+get.translation(card)+'移动到'+get.translation(event.target2)+'的...').ai=function(){return 0};
						}
					}
					'step 6'
					if(event.index2!=2){
						var node=ui[event.index==0?'discardPile':'cardPile'];
						if(event.target1){
							var next=event.target1.lose(card,event.position);
							if(event.way=='顶部') next.insert_card=true;
						}
						else{
							if(event.way=='底部') node.appendChild(card);
							else node.insertBefore(card,node.firstChild);
						}
						game.updateRoundNumber();
						event.finish();
					}
					else{
						if(result.control=='手牌区'){
							var next=event.target2.gain(card);
							if(event.target1){
								next.source=event.target1;
								next.animate='giveAuto';
							}
							else next.animate='draw';
							event.goto(8);
						}
						else if(result.control=='装备区'){
							if(event.target1) event.target1.$give(card,event.target2);
							event.target2.equip(card);
						}
						else{
							event.goto(10);
						}
					}
					'step 7'
					game.updateRoundNumber();
					event.finish();
					'step 8'
					
					//-----------此处设置此牌的视为牌名
					var list55=[];
					for(var yb of lib.inpile){
					// for(var yb in lib.card){
						// if(lib.card[yb].mode&&lib.card[yb].mode.contains(lib.config.mode)==false) continue;
						// if(lib.card[yb].forbid&&lib.card[yb].forbid.contains(lib.config.mode)) continue;
						// if(!lib.card[yb].type||['db_atk','db_def','pss','hstuteng'].contains(lib.card[yb].type)) continue;
						if(lib.card[yb].type!='equip'){
							if(yb=='sha'){
								for(var kkk of lib.inpile_nature){
									switch(kkk){
										case 'fire':list55.add([get.type2(yb),'','sha','fire']);break;
										case 'thunder':list55.add([get.type2(yb),'','sha','thunder']);break;
										case 'kami':list55.add([get.type2(yb),'','sha','kami']);break;
										case 'ice':list55.add([get.type2(yb),'','sha','ice']);break;
										case 'stab':list55.add([get.type2(yb),'','sha','stab']);break;
										default:list55.add([get.type2(yb),'','sha',kkk]);break;
									}
								}
							}
							else{
								list55.add([get.type2(yb),'',yb]);
							}
						}
					};
					player.chooseButton(['纵丝','令'+('<span class=yellowtext>'+get.translation(card)+'</span>')+'视为什（shén）么？<br>（知道有多音字，所以特意标上了读音[机智]）',[list55,'vcard']]).set('prompt2','将此牌转化为什（shén）么？<br>（知道有多音字，所以特意标上了读音[机智]）').set('ai',function(button){
						var player=_status.event.player,name=button.link[2];
						return player.getUseValue({name:name});
					});
					event.goto(9);
					'step 9'
					if(result.links){
						var name=result.links[0][2];
						var nature=result.links[0][3];
						//主代码页有_kagari_ybzongsi_card全局技能
						card.addGaintag('_kagari_ybzongsi_card');
						_status.kagari_ybzongsi[card.cardid]=name;
						_status.kagari_ybzongsi_nature[card.cardid]=nature;
						
					}
					game.updateRoundNumber();
					event.finish();
					'step 10'
					var list66=[];
					for(var yb of lib.inpile){
					// for(var yb in lib.card){
						// if(lib.card[yb].mode&&lib.card[yb].mode.contains(lib.config.mode)==false) continue;
						// if(lib.card[yb].forbid&&lib.card[yb].forbid.contains(lib.config.mode)) continue;
						// if(!lib.card[yb].type||lib.card[yb].type.contains(['db_atk','db_def'    ])) continue;
						if(lib.card[yb].type=='delay')list66.add([get.type2(yb),'',yb]);
						if(lib.card[yb].type=='special_delay')list66.add([get.type2(yb),'',yb]);
					};
					player.chooseButton(['纵丝','令'+('<span class=yellowtext>'+get.translation(card)+'</span>')+'视为什（shén）么？选择原牌名则不会转化<br>（知道有多音字，所以特意标上了读音[机智]）',[list66,'vcard']]/*,true*/).set('prompt2','将此牌转化为什（shén）么？选择原牌名则不会转化，取消则蓄谋<br>（知道有多音字，所以特意标上了读音[机智]）');
					'step 11'
					if(event.target1) event.target1.line(event.target2,'water');
					if(!result.links) event.target2.addJudge({name:'xumou_jsrg'},[card]);
					else if(result.links[0][2]==get.name(card)) event.target2.addJudge(card);
					else event.target2.addJudge({name:result.links[0][2]},[card]);
					game.updateRoundNumber();
					event.finish();
				},
				ai:{
					order:10,
					result:{player:1},
				},
			},
			//--------------张琪瑛改（界了法箓点化真仪）
			xinfu_ybfalu:{
				forced:true,
				audio:'xinfu_falu',
				trigger:{
					player:['loseAfter','enterGame'],
					global:'phaseBefore',
				},
				filter:function (event,player){
					if(event.name!='lose') return (event.name!='phase'||game.phaseNumber==0);
					if(event.type!='discard') return false;
					for(var i=0;i<event.cards2.length;i++){
						if(!player.hasMark('xinfu_falu_'+get.suit(event.cards2[i]))||
							player.countMark('xinfu_falu_'+get.suit(event.cards2[i]))<3) return true;
						else if(player.countMark('xinfu_falu_'+get.suit(event.cards2[i]))>=3&&player.countMark('xinfu_falu_none')<3){
							return true;
						}
					}
					return false;
				},
				content:function (){
					if(trigger.name!='lose'){
						var list66=['spade','heart','club','diamond','none'];
						for(var i=0;i<list66.length;i++){
							if(!player.hasMark('xinfu_falu_'+list66[i])) player.addMark('xinfu_falu_'+list66[i]);
						}
						return;
					}
					for(var i=0;i<trigger.cards2.length;i++){
						var suit=get.suit(trigger.cards2[i]);
						if(!player.hasMark('xinfu_falu_'+suit)||player.countMark('xinfu_falu_'+suit)<3) {
							player.addMark('xinfu_falu_'+suit);
						}
						else if(player.countMark('xinfu_falu_'+suit)>=3&&player.countMark('xinfu_falu_none')<3){
							player.addMark('xinfu_falu_none');
						}
					}
				},
				ai:{threaten:1.4},
			},
			xinfu_falu_none:{
				marktext:'◈',
				intro:{
					name:'虚无',
					content:'mark',
				},
			},
			"xinfu_ybzhenyi":{
				group:["xinfu_ybzhenyi_spade","xinfu_ybzhenyi_club","xinfu_ybzhenyi_heart"],
				trigger:{
					player:"damageEnd",
				},
				audio:'xinfu_zhenyi',
				filter:function (event,player){
					//if(!event.hasNature()) return false;
					return (player.hasMark('xinfu_falu_diamond')||player.hasMark('xinfu_falu_none'));
				},
				prompt2:'弃置「勾陈♦」标记，从牌堆中获得每种类型的牌各一张。',
				content:function (){
					'step 0'
					if(player.hasMark('xinfu_falu_diamond'))player.removeMark('xinfu_falu_diamond');
					else player.removeMark('xinfu_falu_none');
					event.num=0;
					event.togain=[];
					'step 1'
					var card=get.cardPile(function(card){
						for(var i=0;i<event.togain.length;i++){
							if(get.type(card,'trick')==get.type(event.togain[i],'trick')) return false;
						}
						return true;
					});
					if(card){
						event.togain.push(card);
						event.num++;
						if(event.num<3) event.redo();
					}
					'step 2'
					if(event.togain.length){
						player.gain(event.togain,'gain2');
					}
				},
				subSkill:{
					spade:{
						trigger:{
							global:"judge",
						},
						direct:true,
						filter:function(event,player){
							return (player.hasMark('xinfu_falu_spade')||player.hasMark('xinfu_falu_none'));
						},
						content:function(){
							"step 0"
							var str=get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
							get.translation(trigger.player.judging[0])+'，是否发动【真仪】，弃置「紫薇♠」标记并修改判定结果？';
							player.chooseControl('spade','heart','diamond','club','cancel2').set('prompt',str).set('ai',function(){
								//return '取消';
								var judging=_status.event.judging;
								var trigger=_status.event.getTrigger();
								var res1=trigger.judge(judging);
								var list=lib.suit.slice(0);
								var attitude=get.attitude(player,trigger.player);
								if(attitude==0) return 0;
								var getj=function(suit){
									return trigger.judge({
										name:get.name(judging),
										nature:get.nature(judging),
										suit:suit,
										number:5,
									})
								};
								list.sort(function(a,b){
									return (getj(b)-getj(a))*get.sgn(attitude);
								});
								if((getj(list[0])-res1)*attitude>0) return list[0];
								return 'cancel2';
							}).set('judging',trigger.player.judging[0]);
							"step 1"
							if(result.control!='cancel2'){
								player.addExpose(0.25);
								if(player.hasMark('xinfu_falu_spade'))player.removeMark('xinfu_falu_spade');
								else player.removeMark('xinfu_falu_none');
								player.logSkill('xinfu_ybzhenyi',trigger.player);
								//player.line(trigger.player);
								player.popup(result.control);
								game.log(player,'将判定结果改为了','#y'+get.translation(result.control+2)+5);
								trigger.fixedResult={
									suit:result.control,
									color:get.color({suit:result.control}),
									number:5,
								};
							}
						},
						ai:{
							rejudge:true,
							tag:{
								rejudge:1,
							},
							expose:0.5,
						},
					},
					club:{
						audio:'xinfu_zhenyi',
						enable:"chooseToUse",
						viewAsFilter:function(player){
							if(player==_status.currentPhase) return false;
							return (player.hasMark('xinfu_falu_club')||player.hasMark('xinfu_falu_none'))&&player.countCards('hs')>0;
						},
						filterCard:true,
						position:"hs",
						viewAs:{
							name:"tao",
						},
						prompt:"弃置「后土♣」标记，将一张手牌当桃使用",
						check:function(card){return 15-get.value(card)},
						precontent:function(){
							if(player.hasMark('xinfu_falu_club'))player.removeMark('xinfu_falu_club');
							else player.removeMark('xinfu_falu_none');
						},
					},
					heart:{
						trigger:{
							source:"damageBegin1",
						},
						audio:'xinfu_zhenyi',
						filter:function (event,player){
							return (player.hasMark('xinfu_falu_heart')||player.hasMark('xinfu_falu_none'));
						},
						check:function (event,player){
							if(get.attitude(player,event.player)>=0) return false;
							if(event.player.hasSkillTag('filterDamage',null,{
								player:player,
								card:event.card,
							})) return false;
							return true;
							//return player.hasMark('xinfu_falu_spade')||get.color(ui.cardPile.firstChild)=='black';
						},
						prompt2:function(event){
							return '弃置「玉清♥」标记，令对'+get.translation(event.player)+'即将造成的伤害+1。';
						},
						logTarget:"player",
						content:function(){
							if(player.hasMark('xinfu_falu_heart'))player.removeMark('xinfu_falu_heart');
							else player.removeMark('xinfu_falu_none');
							trigger.num++;
						},
					},
				}
			},
			"xinfu_ybdianhua":{
				trigger:{
					player:["phaseZhunbeiBegin","phaseJieshuBegin"],
				},
				frequent:true,
				audio:'xinfu_dianhua',
				filter:function (event,player){
					var list=['spade','heart','club','diamond','none'];
					for(var i=0;i<list.length;i++){
						if(player.hasMark('xinfu_falu_'+list[i])) return true;
					}
					return false;
				},
				content:function (){
					'step 0'
					var num=0;
					var list66=['spade','heart','club','diamond','none'];
					for(var i=0;i<list66.length;i++){
						if(player.hasMark('xinfu_falu_'+list66[i])) num+=(player.countMark('xinfu_falu_'+list66[i]));
					}
					var cards=get.cards(num);
					game.cardsGotoOrdering(cards);
					var next=player.chooseToMove();
					next.set('list',[
						['牌堆顶',cards],
						['牌堆底'],
					]);
					next.set('prompt','点化：点击将牌移动到牌堆顶或牌堆底');
					next.processAI=function(list){
						var cards=list[0][1],player=_status.event.player;
						var target=(_status.event.getTrigger().name=='phaseZhunbei')?player:player.next;
						var att=get.sgn(get.attitude(player,target));
						var top=[];
						var judges=target.getCards('j');
						var stopped=false;
						if(player!=target||!target.hasWuxie()){
							for(var i=0;i<judges.length;i++){
								var judge=get.judge(judges[i]);
								cards.sort(function(a,b){
									return (judge(b)-judge(a))*att;
								});
								if(judge(cards[0])*att<0){
									stopped=true;break;
								}
								else{
									top.unshift(cards.shift());
								}
							}
						}
						var bottom;
						if(!stopped){
							cards.sort(function(a,b){
								return (get.value(b,player)-get.value(a,player))*att;
							});
							while(cards.length){
								if((get.value(cards[0],player)<=5)==(att>0)) break;
								top.unshift(cards.shift());
							}
						}
						bottom=cards;
						return [top,bottom];
					}
					"step 1"
					var top=result.moved[0];
					var bottom=result.moved[1];
					top.reverse();
					for(var i=0;i<top.length;i++){
						ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
					}
					for(i=0;i<bottom.length;i++){
						ui.cardPile.appendChild(bottom[i]);
					}
					player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(bottom.length)+'下');
					game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
					game.updateRoundNumber();
					game.delayx();
				},
				ai:{
					threaten:2.2
				},
			},
			//----------------界神诸葛亮
			ybsl_qixing:{
				audio:'qixing',
				unique:true,
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				locked:false,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0);
				},
				content:function(){
					"step 0"
					player.addToExpansion(get.cards(7),'draw').gaintag.add('qixing');
					"step 1"
					var cards=player.getExpansions('qixing');
					if(!cards.length||!player.countCards('h')){
						event.finish();
						return;
					}
					var next=player.chooseToMove('七星：是否交换“星”和手牌？');
					next.set('list',[
						[get.translation(player)+'（你）的星',cards],
						['手牌区',player.getCards('h')],
					]);
					next.set('filterMove',function(from,to){
						return typeof to!='number';
					});
					next.set('processAI',function(list){
						var player=_status.event.player,cards=list[0][1].concat(list[1][1]).sort(function(a,b){
							return get.useful(a)-get.useful(b);
						}),cards2=cards.splice(0,player.getExpansions('qixing').length);
						return [cards2,cards];
					});
					"step 2"
					if(result.bool){
						var pushs=result.moved[0],gains=result.moved[1];
						pushs.removeArray(player.getExpansions('qixing'));
						gains.removeArray(player.getCards('h'));
						if(!pushs.length||pushs.length!=gains.length) return;
						player.addToExpansion(pushs,player,'giveAuto').gaintag.add('qixing');
						//game.log(player,'将',pushs,'作为“星”置于武将牌上');
						player.gain(gains,'draw');
					}
				},
				intro:{
					markcount:function(storage,player){
						var content=player.getExpansions('qixing');
						return content.length;
					},
					mark:function(dialog,content,player){
						var content=player.getExpansions('qixing');
						if(content&&content.length){
							if(player==game.me||player.isUnderControl()){
								dialog.addAuto(content);
							}
							else{
								return '共有'+get.cnNumber(content.length)+'张星';
							}
						}
					},
					content:function(content,player){
						var content=player.getExpansions('qixing');
						if(content&&content.length){
							if(player==game.me||player.isUnderControl()){
								return get.translation(content);
							}
							return '共有'+get.cnNumber(content.length)+'张星';
						}
					}
				},
				group:['ybsl_qixing_2'],
				ai:{combo:'dawu'},
				subSkill:{
					2:{
						trigger:{
							player:'phaseDrawAfter'
						},
						prompt:'收回所有星，并将至多7张手牌充入星',
						content:function(){
							'step 0'
							player.gain(player.getExpansions('qixing'),'gain2');
							player.logSkill('qixing2');
							'step 1'
							player.chooseCard('h',[1,7],'将至多七张手牌置于武将牌上称为星').set('ai',function(card){
								return 6-get.value(card);
							});
							'step 2'
							game.log(player,'将',result.cards,'作为“星”置于武将牌上');
							player.addToExpansion(result.cards,player,'giveAuto').gaintag.add('qixing');
						},
					}
				}
			},
			ybsl_kuangfeng:{
				unique:true,
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.getExpansions('qixing').length;
				},
				filterTarget:function (card,player,target){
					return !target.hasSkill('kuangfeng2');
				},
				selectTarget:1,
				content:function(){
					'step 0'
					target.addAdditionalSkill(`kuangfeng_${player.playerid}`,'kuangfeng2');
					target.markAuto('kuangfeng2',[player]);
					player.addTempSkill('kuangfeng3',{player:'phaseBeginStart'})
					player.chooseCardButton('选择弃置'+get.cnNumber(1)+'张“星”',1,player.getExpansions('qixing'),true);
					'step 1'
					player.loseToDiscardpile(result.links);
				},
				ai:{combo:'ybsl_qixing'},
				group:'ybsl_kuangfeng_66',
				subSkill:{
					66:{
						unique:true,
						audio:2,
						trigger:{player:'phaseJieshuBegin'},
						direct:true,
						filter:function(event,player){
							return player.getExpansions('qixing').length;
						},
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt('kuangfeng'),'令一名角色获得“狂风”标记',function(card,player,target){
								return !target.hasSkill('kuangfeng2');
							}).ai=function(target){
								return -1;
							}
							'step 1'
							if(result.bool){
								var targets=result.targets.sortBySeat();
								player.logSkill('kuangfeng',targets,'fire');
								var length=targets.length;
								targets.forEach(target=>{
									target.addAdditionalSkill(`kuangfeng_${player.playerid}`,'kuangfeng2');
									target.markAuto('kuangfeng2',[player]);
								});
								player.addTempSkill('kuangfeng3',{player:'phaseBeginStart'})
								player.chooseCardButton('选择弃置'+get.cnNumber(length)+'张“星”',length,player.getExpansions('qixing'),true);
							}
							else{
								event.finish();
							}
							'step 2'
							player.loseToDiscardpile(result.links);
						},
					}
				}
			},
			//------------界佐藤雏（神视）
			hina_ybshenshi:{
				firstDo:true,
				groupSkill:true,
				trigger:{player:['phaseUseBegin','phaseUseEnd']},
				frequent:true,
				filter:function(event,player){
					return player.group=='shen';
				},
				content:function(){
					'step 0'
					player.draw(2).gaintag=['hina_shenshi'];
					player.addSkill('hina_shenshi_yingbian');
					'step 1'
					var cards=player.getCards('h',function(card){
						return card.hasGaintag('hina_shenshi');
					});
					if(!cards.length) event.finish();
					else if(cards.length==1) event._result={bool:true,cards:cards};
					else player.chooseCard('h',true,'将一张牌置于牌堆顶');
					'step 2'
					if(result.bool){
						game.log(player,'将一张牌置于了牌堆顶');
						player.lose(result.cards,ui.cardPile,'insert');
						player.$throw(1,1000);
					}
					else event.finish();
					'step 3'
					game.delayx();
				},
				onremove:function(player){
					player.removeGaintag('hina_shenshi');
				},
				mod:{
					ignoredHandcard:function(card,player){
						if(card.hasGaintag('hina_shenshi')) return true;
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&card.hasGaintag('hina_shenshi')) return false;
					},
				},
				group:'hina_shenshi_yingbian',
			},
			//------------界神户小鸟
			kotori_ybyumo:{
				trigger:{
					global:['phaseBefore','die'],
					player:'enterGame',
				},
				forced:true,
				charlotte:true,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0||event.name=='die');
				},
				content:function(){
					var list=['wei','shu','wu','qun','jin','key','YB_memory','YB_dream'];
					for(var i of list){
						if(player.countMark('kotori_yumo_'+i)<3){
							player.addMark('kotori_yumo_'+i,1,false);
							game.log(player,'获得了一个',lib.translate['kotori_yumo_'+i].replace(/魔物/g,'【魔物】'));
						}
					}
				},
				group:['kotori_ybyumo_damage','kotori_ybyumo_gain'],
				subSkill:{
					damage:{
						trigger:{global:'damageEnd',player:'phaseBegin'},
						forced:true,
						filter:function(event,player){
							var name='kotori_yumo_'+event.player.group;
							return (lib.skill[name]&&player.countMark(name)<3)||event.player.group=='shen';
						},
						popup:false,
						content:function(){
							'step 0'
							game.log(player,'对',trigger.player,'发动了','#g【驭魔】');
							if(trigger.player.group=='shen'){
								event.num=0;
								event.goto(1);
							}
							else{
								var group=trigger.player.group;
								player.popup('驭魔',get.groupnature(group));
								player.addMark('kotori_yumo_'+group,1,false);
								game.log(player,'获得了一个',lib.translate['kotori_yumo_'+group].replace(/魔物/g,'【魔物】'));
								event.finish();
							}
							'step 1'
							event.num++;
							event.list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
							event.list2=[];
							for(var i of event.list){
								if(player.countMark('kotori_yumo_'+i)<3){
									event.list2.push(i);
								}
							}
							'step 2'
							if(event.list2.length>0){
								var group=event.list2.randomGets(1);
								player.popup('驭魔',get.groupnature(group[0]));
								player.addMark('kotori_yumo_'+group[0],1,false);
								game.log(player,'获得了一个',lib.translate['kotori_yumo_'+group[0]].replace(/魔物/g,'【魔物】'));
							}
							else{event.goto(3);}
							'step 3'
							if(event.num&&event.num<2){
								event.goto(1);
							}
							else{
								event.finish();
							}
						},
					},
					gain:{
						trigger:{player:'phaseBegin'},
						direct:true,
						filter:function(event,player){
							var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
							for(var i in list){
								if(player.hasMark('kotori_yumo_'+list[i]))	return true;
							}
							return false;
						},
						content:function(){
							'step 0'
							event.list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
							event.list2=[];
							for(var i of event.list){
								if(player.hasMark('kotori_yumo_'+i))	event.list2.push('kotori_skill_'+i);
							}
							event.list2.push('cancel2');
							'step 1'
							player.chooseControl(event.list2).set('prompt','###是否发动【驭魔】？###弃置对应的标记并获得下列技能中的一个，或点取消，不获得技能').set('choice',function(){
								if(event.list2.contains('kotori_skill_shu')&&player.countCards('h',function(card){
									return get.name(card,player)=='sha'&&player.getUseValue(card)>0;
								})>1) return 'kotori_skill_shu';
								if(event.list2.contains('kotori_skill_key')&&player.hp>1) return 'kotori_skill_key';
								if(event.list2.contains('kotori_skill_qun')&&player.isDamaged()&&player.needsToDiscard()>1) return 'kotori_skill_qun';
								return 'cancel2';
							}()).set('ai',function(){
								return _status.event.choice;
							});
							'step 2'
							if(result.control!='cancel2'){
								player.logSkill('kotori_yumo');
								var name='kotori_yumo_'+result.control.slice(13);
								player.removeMark(name,1,false);game.log(player,'移去了一个',lib.translate[name].replace(/魔物/g,'【魔物】'));
								player.addTempSkill(result.control);
								game.log(player,'获得了技能',lib.translate[name].replace(/魔物/g,'【'+get.translation(result.control)+'】'));
								event.list2.remove(result.control);
								event.goto(1)
							}
						},
					},
				},
			},
			kotori_yumo_YB_memory:{
				marktext:'<span style=\'color:#28e3ce\'>魔</span>',
				intro:{name:'<span style=\'color:#28e3ce\'>魔物</span>',content:'mark'},
			},
			kotori_yumo_YB_dream:{
				marktext:'<span style=\'color:#e328b7\'>魔</span>',
				intro:{name:'<span style=\'color:#e328b7\'>魔物</span>',content:'mark'},
			},
			kotori_skill_YB_memory:{
				trigger:{
					player:'phaseEnd',
				},
				direct:true,
				content:function (){
					'step 0'
					var discarded=get.discarded();
					if(discarded.length){
						player.chooseCardButton('选择一张获得之',discarded).set('ai',function(button){
							return get.value(button.link);
						});
					}
					else{
						event.finish();
					}
					'step 1'
					if(result.bool&&result.links&&result.links.length){
						player.gain(result.links,'gain2');
					}
					event.finish();
				},
			},
			kotori_skill_YB_dream:{
				audio:'ext:夜白神略/image/audio:2',
				trigger:{
					player:'phaseZhunbeiBegin',
				},
				groupSkill:true,
				direct:true,
				content:function (){
					'step 0'
					player.chooseControl('是','cancel2').set('prompt','是否摸两张牌，令本回合手牌上限-1').set('ai',function(){
						if(player.hasJudge('lubu')){
							return 'cancel2';
						}
						return '是';
					});
					'step 1'						
					if(result.control=='cancel2'){
						event.finish();return;
					}
					player.logSkill('kotori_skill_YB_dream');
					player.draw(2);
					player.addTempSkill('kotori_skill_YB_dream_buff');
				},
				subSkill:{
					buff:{
						mark:true,
						marktext:'散',
						trigger:{
							player:'phaseDiscardBefore',
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseToDiscard(2,'he').set('prompt','是否弃置两张牌，取消此次手牌上限减一？'
																).set('ai',function(card){
								return player.countCards('h')>player.getHandcardLimit();
							});
							'step 1'
							if(result.bool){
								player.removeSkill('kotori_skill_YB_dream_buff');
							}
						},
						intro:{
							content:'本回合手牌上限-1',
						},
						mod:{
							maxHandcard:function (player,num){
								return num-1;
							},
						},
						sub:true,
					},
				},
			},
			kotori_ybhuazhan:{
				charlotte:true,
				enable:'chooseToUse',
				filter:function(event,player){
					var bool=false;
					var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
					for(var i of list){
						if(player.hasMark('kotori_yumo_'+i)&&!player.getStorage('kotori_huazhan2').contains('kotori_yumo_'+i)){
							bool=true;break;
						}
					}
					return	bool&&event.filterCard({name:'kaihua',isCard:true},player,event);
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('###花绽###'+lib.translate.kotori_huazhan_info);
					},
					chooseControl:function(event,player){
						var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
						var list2=[];
						for(var i of list){
							if(player.hasMark('kotori_yumo_'+i)&&
								!player.getStorage('kotori_huazhan2').contains('kotori_yumo_'+i))
								list2.push('kotori_yumo_'+i);
						}
						list2.push('cancel2');
						return list2;
					},
					check:function(){
						var player=_status.event.player;
						var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
						var list2=[];
						for(var i of list){
							if(player.hasMark('kotori_yumo_'+i)&&
								!player.getStorage('kotori_huazhan2').contains('kotori_yumo_'+i))
								list2.push('kotori_yumo_'+i);
						}
						if(list2.contains('kotori_yumo_wei')) return 'kotori_yumo_wei';
						if(list2.contains('kotori_yumo_wu')) return 'kotori_yumo_wu';
						if(list2.contains('kotori_yumo_qun')) return 'kotori_yumo_qun';
						if(list2.contains('kotori_yumo_key')) return 'kotori_yumo_key';
						if(list2.contains('kotori_yumo_YB_memory')) return 'kotori_yumo_YB_memory';
						if(list2.contains('kotori_yumo_YB_dream')) return 'kotori_yumo_YB_dream';
						if(list2.contains('kotori_yumo_shu')&&game.hasPlayer(function(current){
							return current.group=='shu';
						})) return 'kotori_yumo_shu';
						return 'cancel2';
					},
					backup:function(result,player){
						return {
							markname:result.control,
							viewAs:{name:'kaihua',isCard:true},
							filterCard:function(){return false},
							selectCard:-1,
							precontent:function(){
								delete event.result.skill;
								var name=lib.skill.kotori_huazhan_backup.markname;
								if(!player.storage.kotori_huazhan2) player.storage.kotori_huazhan2=[];
								player.storage.kotori_huazhan2.push(name);
								player.addTempSkill('kotori_huazhan2');
								player.popup('花绽',get.groupnature(name.slice(12)));
								game.log(player,'发动了技能',lib.translate[name].replace(/魔物/g,'【花绽】'));
								player.removeMark(name,1,false);
								;game.log(player,'移去了一个',lib.translate[name].replace(/魔物/g,'【魔物】'));
							},
						}
					}
				},
				ai:{
					order:1,
					result:{
						player:function(player){
							if(player.countCards('he',function(card){
								if(get.type(card,player)=='equip') return get.value(card)<6;
								return get.value(card)<5;
							})<2) return 0;
							return player.getUseValue({name:'kaihua'});
						},
					},
				},
				group:['kotori_ybhuazhan_fly','kotori_ybhuazhan_recover'],
				subSkill:{
					fly:{
						name:'花飞',
						charlotte:true,
						enable:'chooseToUse',
						filter:function(event,player){
							var bool=false;
							var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
							for(var i of list){
								if(player.hasMark('kotori_yumo_'+i)&&!player.getStorage('kotori_huazhan3').contains('kotori_yumo_'+i)){
								bool=true;break;
								}
							}
							return	bool&&event.filterCard({name:'kaihua',isCard:true},player,event);
						},
						chooseButton:{
							dialog:function(event,player){
								return ui.create.dialog('###花绽###'+lib.translate.kotori_huazhan_info);
							},
							chooseControl:function(event,player){
								var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
								var list2=[];
								for(var i of list){
									if(player.hasMark('kotori_yumo_'+i)&&!player.getStorage('kotori_huazhan3').contains('kotori_yumo_'+i))
										list2.push('kotori_yumo_'+i);
								}
								list2.push('cancel2');
								return list2;
							},
							check:function(){
								var player=_status.event.player;
								var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
								var list2=[];
								for(var i of list){
									if(player.hasMark('kotori_yumo_'+i)&&
										!player.getStorage('kotori_huazhan3').contains('kotori_yumo_'+i))
										list2.push('kotori_yumo_'+i);
								}
								if(list2.contains('kotori_yumo_wei')) return 'kotori_yumo_wei';
								if(list2.contains('kotori_yumo_wu')) return 'kotori_yumo_wu';
								if(list2.contains('kotori_yumo_qun')) return 'kotori_yumo_qun';
								if(list2.contains('kotori_yumo_key')) return 'kotori_yumo_key';
								if(list2.contains('kotori_yumo_YB_memory')) return 'kotori_yumo_YB_memory';
								if(list2.contains('kotori_yumo_YB_dream')) return 'kotori_yumo_YB_dream';
								if(list2.contains('kotori_yumo_shu')&&game.hasPlayer(function(current){
									return current.group=='shu';
								})) return 'kotori_yumo_shu';
								return 'cancel2';
							},
							backup:function(result,player){
								return {
									markname:result.control,
									viewAs:{name:'yihuajiemu',isCard:true},
									filterCard:function(){return false},
									selectCard:-1,
									precontent:function(){
										delete event.result.skill;
										var name=lib.skill.kotori_huazhan_fly_backup.markname;
										if(!player.storage.kotori_huazhan3) player.storage.kotori_huazhan3=[];
										player.storage.kotori_huazhan3.push(name);
										player.addTempSkill('kotori_huazhan3');
										player.popup('花绽',get.groupnature(name.slice(12)));
										game.log(player,'发动了技能',lib.translate[name].replace(/魔物/g,'【花绽】'));
										player.removeMark(name,1,false);
										;game.log(player,'移去了一个',lib.translate[name].replace(/魔物/g,'【魔物】'));
									},
								}
							}
						},
						ai:{
							order:7,
							result:{
								target:function(player,target){
									return player.getUseValue({name:'yihuajiemu'});
								}
							}
						}
					},
					recover:{
						name:'愈伤',
						charlotte:true,
						enable:'chooseToUse',
						filter:function(event,player){
							var bool=false;
							var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
							for(var i of list){
								if(player.hasMark('kotori_yumo_'+i)&&!player.getStorage('kotori_huazhan4').contains('kotori_yumo_'+i)){
									bool=true;break;
								}
							}
							return	bool&&event.filterCard({name:'kaihua',isCard:true},player,event);
						},
						chooseButton:{
							dialog:function(event,player){
								return ui.create.dialog('###花绽###'+lib.translate.kotori_huazhan_info);
							},
							chooseControl:function(event,player){
								var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
								var list2=[];
								for(var i of list){
									if(player.hasMark('kotori_yumo_'+i)&&
										!player.getStorage('kotori_huazhan4').contains('kotori_yumo_'+i))
										list2.push('kotori_yumo_'+i);
								}
								list2.push('cancel2');
								return list2;
							},
							check:function(){
								var player=_status.event.player;
								var list=['wei','shu','wu','qun','key','jin','YB_memory','YB_dream'];
								var list2=[];
								for(var i of list){
									if(player.hasMark('kotori_yumo_'+i)&&
										!player.getStorage('kotori_huazhan4').contains('kotori_yumo_'+i))	list2.push('kotori_yumo_'+i);
								}
								if(list2.contains('kotori_yumo_wei')) return 'kotori_yumo_wei';
								if(list2.contains('kotori_yumo_wu')) return 'kotori_yumo_wu';
								if(list2.contains('kotori_yumo_qun')) return 'kotori_yumo_qun';
								if(list2.contains('kotori_yumo_key')) return 'kotori_yumo_key';
								if(list2.contains('kotori_yumo_YB_memory')) return 'kotori_yumo_YB_memory';
								if(list2.contains('kotori_yumo_YB_dream')) return 'kotori_yumo_YB_dream';
								if(list2.contains('kotori_yumo_shu')&&game.hasPlayer(function(current){
									return current.group=='shu';
								})) return 'kotori_yumo_shu';
								return 'cancel2';
							},
							backup:function(result,player){
								return {
									markname:result.control,
									viewAs:{name:'guaguliaodu',isCard:true},
									filterCard:function(){return false},
									selectCard:-1,
									precontent:function(){
										delete event.result.skill;
										var name=lib.skill.kotori_huazhan_recover_backup.markname;
										if(!player.storage.kotori_huazhan4) player.storage.kotori_huazhan4=[];
										player.storage.kotori_huazhan4.push(name);
										player.addTempSkill('kotori_huazhan4');
										player.popup('花绽',get.groupnature(name.slice(12)));
										game.log(player,'发动了技能',lib.translate[name].replace(/魔物/g,'【花绽】'));
										player.removeMark(name,1,false);
										;game.log(player,'移去了一个',lib.translate[name].replace(/魔物/g,'【魔物】'));
									},
								}
							}
						},
						ai:{
							order:2,
							tag:{
								recover:1,
							},
							result:{
								target:function(player,target){
									return player.getUseValue({name:'guaguliaodu'});
								}
							}
						},
					},
				},
			},
			kotori_huazhan3:{onremove:true,},
			kotori_huazhan4:{onremove:true,},
			//--------------sp乌米酱
			//------------界马钧
			xinfu_ybjingxie:{
				getJingxie:function(){
					return [
						'bagua','baiyin','lanyinjia','renwang','tengjia','zhuge',
						'ybsl_wangzhui','chitu','zhuque','wuxinghelingshan','yitianjian',
						'shandian','fulei','taigongyinfu','ybsl_tianleiyubi','hongshui',
						'huoshan','du','chiyanzhenhunqin','tongque','qinglong',
						'fangtian','wutiesuolian','huxinjing','goujiangdesidai'
					];
				},
				firstDo:true,
				group:['xinfu_jingxie2'/*,'ybsl_tianhuoduan_skill'*/],
				position:'he',
				audio:'xinfu_jingxie',
				enable:'phaseUse',
				filter:function(event,player){
					var he=player.getCards('he');
					var list=lib.skill.xinfu_ybjingxie.getJingxie();
					for(var i=0;i<he.length;i++){
						if(list.contains(he[i].name)) return true;
					}
					return false;
				},
				filterCard:function(card,player){
					var list=lib.skill.xinfu_ybjingxie.getJingxie();
					return list.contains(card.name);
				},
				discard:false,
				lose:false,
				delay:false,
				check:function(){
					return 1;
				},
				content:function(){
					'step 0'
					player.showCards(cards);
					'step 1'
					var card=cards[0];
					var bool=(get.position(card)=='e');
					// var tag=[];
					// // if(get.cardtag(card,'gifts')){tag.push('gifts');}
					// for(var i of _status.cardtag){
					// 	if(get.cardtag(card,i)){tag.push(i);}
					// }
					if(bool) player.removeEquipTrigger(card);
					game.addVideo('skill',player,['xinfu_jingxie',[bool,get.cardInfo(card)]])
					game.broadcastAll(function(card){
						if(card.name=='wuxinghelingshan'){card.name='zhuque'}
						if(card.name=='chiyanzhenhunqin'){card.name='zhuque'}
						if(card.name=='shandian'&&card.suit=='spade'){card.name='fulei'}
						if(card.name=='taigongyinfu'){card.name='fulei'}
						if(card.name=='hongshui'){card.name='shandian'}
						if(card.name=='huoshan'){card.name='shandian'}
						if(card.name=='wutiesuolian'){card.name='fangtian'}
						card.init([card.suit,card.number,'rewrite_'+card.name,card.nature/*,tag*/]);
					},card);
					if(bool){
						var info=get.info(card);
						if(info.skills){
							for(var i=0;i<info.skills.length;i++){
								player.addSkillTrigger(info.skills[i]);
							}
						}
					}
				},
				ai:{
					basic:{
						order:10,
					},
					result:{
						player:1,
					},
				},
			},
			//---------------------------鬼神易的足迹
			//---------------------------尹姬
			'dz013_qingling':{
				inherit:'dz014_qingling',
				audio:'ext:夜白神略/audio/character:1',
			},
			'dz013_shanwu':{
				inherit:'dz017_shanwu',
				audio:'ext:夜白神略/audio/character:1',
			},
			//---------------------------本人（鬼神易）
			'dz014_xianji':{
				audio:'ext:夜白神略/audio/character:1',
				enable:'chooseToUse',
				filter:function (event,player){
					if(!player.storage.dz014_xinkui) return false;
					if(event.type=='dying'){
						if(player.storage.dz014_xinkui!=event.dying) return false;
						return true;
					}
					else if(event.getParent().name=='phaseUse'){
						return true;
					}
					return false;
				},
				logTarget:function (event,trigger){
					return player.storage.dz014_xinkui;
				},
				content:function (){
					'step 0'
					var target=player.storage.dz014_xinkui;
					event.target=target;
					event.num=_status.event.getParent(2).type=='dying'?1-_status.event.getParent(2).dying.hp:player.hp;
					'step 1'
					target.gainMaxHp(player.maxHp);
					if(event.num>0) target.recover(event.num);
					'step 2'
					var next=player.die();
					if(_status.event.getParent(2).type=='dying'){
						event.next.remove(next);
						_status.event.getParent(2).after.push(next);
					};
				},
				ai:{
					order:0.5,
					skillTagFilter:function (player,tag,target){
						if(player.storage.dz014_xinkui!=target) return false;
					},
					save:true,
					result:{
						player:10,
					},
				},
			},
			'dz014_yangkui':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					global:'loseMaxHpBegin',
				},
				filter:function (event,player){
					return player.storage.dz014_xinkui&&player.storage.dz014_xinkui==event.player;
				},
				forced:true,
				content:function (){
					player.gainMaxHp(trigger.num);
				},
				group:'dz014_yangkui_die',
				subSkill:{
					die:{
						audio:'ext:夜白神略/audio/character:1',
						trigger:{
							player:'phaseJieshuBegin',
						},
						filter:function (event,player){
							return player.storage.dz014_xinkui&&!player.storage.dz014_xinkui.isAlive();
						},
						forced:true,
						content:function (){
							player.die();
						},
						sub:true,
					},
				},
			},
			'dz014_shanwu':{
				inherit:'dz017_shanwu',
				audio:'ext:夜白神略/audio/character:1',
			},
			'dz014_qingling':{//------------轻灵
				preHidden:true,
				audio:'ext:夜白神略/audio/character:1',
				forced:true,
				trigger:{
					player:'damageBegin4',
				},
				filter:function (event,player){
					return event.num>1;
				},
				content:function (){
					trigger.cancel();
					player.loseHp();
				},
				ai:{
					filterDamage:true,
				},
				mod:{
					maxHandcard:function (player,num){
						return num+1;
					},
				},
			},
			'dz014_fuhua':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					player:['useCard','phaseBegin'],
				},
				forced:true,
				filter:function (event,player){
					if(event.name=='phase') return true;
					if(get.color(event.card)=='none') return false;
					return get.color(event.card)=='black'||player.hasMark('dz014_fuhua');
				},
				content:function (){
					if(trigger.name=='phase'||get.color(trigger.card)=='black'){
						player.addMark('dz014_fuhua');
					}else player.removeMark('dz014_fuhua');
				},
				marktext:'腐',
				intro:{
					name:'腐',
					content:'mark',
				},
				mod:{
					maxHandcard:function (player,num){
						return num+player.countMark('dz014_fuhua');
					},
				},
			},
			'dz014_xinsheng':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					player:['phaseJieshuBegin','dying'],
				},
				forced:true,
				filter:function (event,player){
					var num=player.countMark('dz014_fuhua');
					return num>player.maxHp&&num>=3;
				},
				content:function (){
					'step 0'
					var num=player.countMark('dz014_fuhua');
					player.removeMark('dz014_fuhua',num);
					player.draw(num);
					player.loseMaxHp();
					'step 1'
					var num=player.maxHp-player.hp;
					if(num>0) player.recover(num);
				},
			},
			'dz014_xinkui':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					global:'dieAfter',
				},
				forced:true,
				filter:function (event,player){
					if(!player.side) player.side=player.playerid;
					return !event.player.isAlive()&&(!event.player.side||event.player.side!=player.side);
				},
				available:function (mode){
					if(['versus','boss','chess'].contains(mode)) return false;
				},
				logTarget:'player',
				content:function (){
					game.addGlobalSkill('autoswap');
					var fun=function(self,me){
						me=(me||game.me);
						var that=this._trueMe||this;
						if(that.isMad()||game.notMe) return false;
						if(this===me){
							if(self) return true;
							return false;
						}
						if(that===me||this==me._trueMe) return true;
						if(_status.connectMode) return false;
						if(lib.config.mode=='versus'){
							if(_status.mode=='three') return this.side==me.side;
							if(_status.mode=='standard') return lib.storage.single_control&&this.side==me.side;
							if(_status.mode=='four') return get.config('four_phaseswap')&&this.side==me.side;
							if(_status.mode=='two') return get.config('two_phaseswap')&&this.side==me.side;
							return false;
						}
						else if(lib.config.mode=='boss'){
							if(me.side) return false;
							return this.side==me.side&&get.config('single_control');
						}
						else if(game.chess){
							if(lib.config.mode=='chess'){
								if(_status.mode=='combat'&&!get.config('single_control')) return false;
							}
							return this.side==me.side;
						};
						if(this.side&&this.side==me.side) return true;
						return false;
					};
					lib.element.player.isUnderControl=fun;
					for(var i of game.players){
						i.isUnderControl=fun;
					};
					if(!player.side) player.side=player.playerid;
					trigger.player.side=player.side;
					trigger.player._trueMe=player;
					if(trigger.player==game.me){
						game.notMe=true;
						if(!_status.auto) ui.click.auto();
					}
					trigger.player.init('dzsl_014xinzhikui');
					trigger.player.storage.dz014_xinkui=player;
					trigger.player.revive(1,false);
					trigger.player.draw(2);
				},
			},
			'dz014_zaomeng':{//--------------造梦
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					global:'useCard',
				},
				filter:function (event,player){
					if(get.color(event.card)=='none') return false;
					return player.hasZhuSkill('dz014_zaomeng')&&event.player!=player&&(get.color(event.card)=='black'||player.hasMark('dz014_fuhua'))&&event.player.group=='YB_memory';
				},
				direct:true,
				zhuSkill:true,
				content:function (){
					'step 0'
					var bool=get.color(trigger.card)=='black';
					var str='令'+get.translation(player);
					str+=bool?'获得':'移除';
					str+='一枚“腐”标记？'
					event.bool=bool;
					trigger.player.chooseBool(get.prompt('dz014_zaomeng',player),str).set('ai',function(){
						var att=get.attitude(_status.event.player,_status.event.getParent().player);
						var bool=_status.event.bool;
						if(att>0) return bool;
						else return !bool;
					}).set('bool',bool);
					'step 1'
					if(result.bool){
						trigger.player.logSkill('dz014_zaomeng',player);
						if(event.bool) player.addMark('dz014_fuhua');
						else player.removeMark('dz014_fuhua');
					};
				},
			},
			//---------------------------王海茹（鬼神易）
			'dz015_enguang':{
				audio:'ext:夜白神略/audio/character:1',
				zhuSkill:true,
				global:'dz015_enguang_2',
				subSkill:{
					'2':{
						audio:'ext:夜白神略/audio/character:1',
						trigger:{
							global:'damageBegin4',
						},
						filter:function (event,player){
							return player.group=='YB_memory'&&event.player!=player&&event.player.hasZhuSkill('dz015_enguang')&&(!event.player.storage.dz015_enguang||!event.player.storage.dz015_enguang.contains(player))
						},
						check:function (event,player){
							var num=player.countCards('h','tao')+player.countCards('h','jiu')+player.hp;
							if(get.attitude(player,event.player)<4) return false;
							if(event.player==game.zhu) return true;
							return event.num<=num;
						},
						logTarget:'player',
						content:function (){
							if(!trigger.player.storage.dz015_enguang) trigger.player.storage.dz015_enguang=[];
							trigger.player.storage.dz015_enguang.add(player);
							trigger.cancel();
							player.damage(trigger.num,'nosource');
						},
						sub:true,
					},
				},
			},
			'dz015_shugu':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					global:'damageBegin1',
				},
				filter:function (event,player){
					return event.source&&event.player==player&&player.isEmpty(2)&&!event.source.isEmpty(1)&&event.source!=player&&event.card&&event.card.name=='sha'&&event.getParent().name=='sha';
				},
				forced:true,
				content:function (){
					trigger.num++;
				},
			},
			'dz015_tianshu':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					target:'useCardToTargeted',
				},
				filter:function (event,player){
					if(get.type(event.card)!='trick'||_status.currentPhase==player||event.player==player) return false;
					return !player.storage.dz015_tianshu||player.storage.dz015_tianshu!=event.card.name;
				},
				content:function (){
					player.storage.dz015_tianshu=trigger.card.name;
					player.markSkill('dz015_tianshu');
				},
				intro:{
					content:'当前记录牌名：$',
				},
				group:'dz015_tianshu_use',
				subSkill:{
					use:{
						audio:'ext:夜白神略/audio/character:1',
						trigger:{
							player:'phaseUseBegin',
						},
						direct:true,
						filter:function (event,player){
							return player.storage.dz015_tianshu&&player.hasUseTarget(player.storage.dz015_tianshu);
						},
						check:function (event,player){
							var card=player.storage.dz015_tianshu;
							return game.hasPlayer(function(current){
								return player.canUse(card,current)&&get.effect(current,{name:card},player,player)>0;
							});
						},
						content:function (){
							player.chooseUseTarget(get.prompt('dz015_tianshu'),'视为使用一张'+get.translation(player.storage.dz015_tianshu),player.storage.dz015_tianshu).set('logSkill','dz015_tianshu');
						},
						sub:true,
						'=':{
							
						},
					},
				},
			},
			'dz015_xianzhe':{
				audio:'ext:夜白神略/audio/character:1',
				enable:'chooseToUse',
				filter:function (event,player){
					if(player.countCards('h')<2||player.hasSkill('dz015_xianzhe_2')) return false;
					var evt=lib.filter.filterCard;
					if(event.filterCard) evt=event.filterCard;
					for(var i of lib.inpile){
						var type=get.type(i);
						if(type=='trick'&&evt({name:i},player,event)) return true;
					};
					return false;
				},
				chooseButton:{
					dialog:function (player){
						var list=[];
						for(var i=0;i<lib.inpile.length;i++){
							if(get.type(lib.inpile[i])=='trick') list.push(['锦囊','',lib.inpile[i]]);
						}
						return ui.create.dialog('贤者',[list,'vcard']);
					},
					filter:function (button,player){
						return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
					},
					check:function (button){
						if(_status.event.getParent().type!='phase') return 1;
						var player=_status.event.player;
						if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan_gai','lianjunshengyan','diaohulishan'].contains(button.link[2])) return 0;
						return player.getUseValue({
							name:button.link[2],
							nature:button.link[3],
						});
					},
					backup:function (links,player){
						return {
							filterCard:true,
							selectCard:2,
							complexCard:true,
							position:'h',
							audio:2,
							popname:true,
							viewAs:{name:links[0][2]},
							precontent:function(){
								player.addTempSkill('dz015_xianzhe_2');
							},
						};
					},
					prompt:function (links,player){
						return '将两张手牌当作'+get.translation(links[0][2])+'使用';
					},
				},
				hiddenCard:function (player,name){
					var type=get.type(name);
					return type=='trick'&&player.countCards('h')>=2&&!player.hasSkill('dz015_xianzhe_2');
				},
				ai:{
					fireAttack:true,
					respondSha:true,
					respondShan:true,
					skillTagFilter:function (player){
						if(player.hasSkill('dz015_xianzhe_2')||player.countCards('h')<2) return false;
					},
					threaten:1.2,//嘲讽值
					order:1,
					result:{
						player:function (player){
							if(_status.event.dying) return get.attitude(player,_status.event.dying);
							return 1;
						},
					},
				},
				subSkill:{
					'2':{
						trigger:{
							player:['useCardAfter'],
						},
						forced:true,
						charlotte:true,
						popup:false,
						filter:function (event,player){
							return event.skill=='dz015_xianzhe_backup';
						},
						content:function (){
							player.draw();
						},
						sub:true,
					},
					backup:{
						sub:true,
					},
				},
			},
			//----------------------满城柒（鬼神易）
			'dz016_zanxu':{//赞许
				audio:'ext:夜白神略/audio/character:1',
				enable:'phaseUse',
				usable:1,
				filter:function (event,player){
					return player.countCards('h',{suit:'heart'})>0;
				},
				filterTarget:function (card,player,target){
					return player!=target;
				},
				filterCard:function (card){
					return get.suit(card)=='heart';
				},
				check:function (card){
					return 8-get.value(card);
				},
				discard:false,
				lose:false,
				delay:false,
				content:function (){
					'step 0'
					target.gain(cards[0],player,'give');
					'step 1'
					var id=target.playerid;
					if(!player.storage.dz016_zanxu_buff) player.storage.dz016_zanxu_buff={};
					if(typeof player.storage.dz016_zanxu_buff[id]!='number') player.storage.dz016_zanxu_buff[id]=0;
					player.storage.dz016_zanxu_buff[id]++
					player.addSkill('dz016_zanxu_buff');
				},
				ai:{
					order:9,
					result:{
						player:1,
						target:2,
					},
					threaten:2,//嘲讽值
				},
				subSkill:{
					buff:{
						audio:'ext:夜白神略/audio/character:1',
						trigger:{
							global:['recoverBegin','phaseAfter'],
						},
						charlotte:true,
						mark:true,
						direct:true,
						onremove:true,
						filter:function (event,player){
							return player.storage.dz016_zanxu_buff&&typeof player.storage.dz016_zanxu_buff[event.player.playerid]=='number'&&_status.currentPhase==event.player;
						},
						content:function (){
							if(trigger.name=='recover'){
								player.logSkill('dz016_zanxu',trigger.player);
								player.draw(player.storage.dz016_zanxu_buff[trigger.player.playerid]*2);
							};
							delete player.storage.dz016_zanxu_buff[trigger.player.playerid];
							if(!game.hasPlayer(function(c){
								return typeof player.storage.dz016_zanxu_buff[c.playerid]=='number';
							})) player.removeSkill('dz016_zanxu_buff');
						},
						intro:{
							markcount:function (storage){
								var num=0;
								if(storage){
									for(var i in storage) num++;
								};
								return num;
							},
							mark:function (dialog,storage,player){
								if(storage){
									var targets=game.filterPlayer().sortBySeat();
									for(var i of targets){
										var id=i.playerid;
										if(storage[id]){
											dialog.addText('当'+get.translation(i)+'于其回合内第一次回复体力时你摸'+get.cnNumber(storage[id]*2)+'张牌');
										};
									};
								}else{
									dialog.addText('暂无内容');
								};
							},
						},
						sub:true,
					},
				},
			},
			'dz016_shanwu':{
				inherit:'dz017_shanwu',
				audio:'ext:夜白神略/audio/character:1',
			},
			//--------------------------小红（鬼神易）
			'dz017_zhushi':{//注视
				preHidden:true,
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					player:'phaseEnd',
				},
				direct:true,
				content:function (){
					'step 0'
					player.chooseTarget(get.prompt2('dz017_zhushi'),function(card,player,target){
						return target!=player;
					}).set('ai',function(target){
						return -get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('dz017_zhushi');
						if(!player.storage.dz017_zhushi_buff) player.storage.dz017_zhushi_buff=[];
						player.storage.dz017_zhushi_buff.add(target);
						player.addTempSkill('dz017_zhushi_buff',{player:'phaseBeginStart'});
						player.addTempSkill('dz017_zhushi_shibai',{player:'phaseBeginStart'});
					};
				},
				derivation:['dz017_zhushi_buff','dz017_zhushi_shibai'],
				subSkill:{
					buff:{
						audio:'ext:夜白神略/audio/character:1',
						trigger:{
							global:['useCardToPlayered','phaseJieshuBegin'],
						},
						filter:function (event,player){
							if(event.name=='phaseJieshu') return player.storage.dz017_zhushi_buff&&
								player.storage.dz017_zhushi_buff.contains(event.player)&&
								event.player.countGainableCards(player,'he')&&event.player.getHistory('useCard',function(evt){
								return evt.targets&&evt.targets.contains(player);
							}).length==0;
							else return player.storage.dz017_zhushi_buff&&
								player.storage.dz017_zhushi_buff.contains(event.player)&&
								event.player.isPhaseUsing()&&event.target==player;
						},
						content:function (){
							player.markSkill('dz017_zhushi_buff');
							if(trigger.name=='phaseJieshu'){
								player.gainPlayerCard(trigger.player,'he',true);
								player.loseHp();
								game.trySkillAudio('dz017_zhushi_shibai',player);
							}else{
								var evtx=trigger.getParent('phaseUse');
								var num=trigger.player.getHistory('useCard',function(evt){
									return evt.getParent('phaseUse')==evtx;
								}).length;
								if(num>5){
									num=5;
								};
								player.draw(num);
								player.logSkill('dz017_zhushi_buff');
							};
						},
						charlotte:true,
						direct:true,
						onremove:true,
						intro:{
							content:'正在注视着$',
						},
						sub:true,
					},
					shibai:{
						audio:'ext:夜白神略/audio/character:1',
						sub:true,
					},
				},
			},
			//-------------------------陆逊（鬼神易）
			'dzsl_shenhuo':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					player:'damageBegin4',
				},
				filter:function (event,player){
					return event.num>0;
				},
				forced:true,
				content:function (){
					'step 0'
					event.count=trigger.num;
					'step 1'
					event.count--;
					if(!player.storage.dzsl_shennu_map) player.storage.dzsl_shennu_map=[0,0];
					var info=player.storage.dzsl_shennu_map;
					if(info[0]>=4&&info[1]>=2&&player.storage.dzsl_shennu_discard){
						player.draw();
						event.finish();
					}else{
						player.chooseControl('升级','摸牌').set('prompt','神火：升级神弩或摸一张牌');
					};
					'step 2'
					if(result.control=='升级') lib.skill.dzsl_buxi.up(player);
					else player.draw();
					'step 3'
					if(event.count) event.goto(1);
				},
			},
			'dzsl_buxi':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					source:'die',
					player:'dyingAfter',
				},
				forced:true,
				filter:function (event,player){
					return event.name=='dying'||event.getParent(5)&&event.getParent(5).name=='dzsl_shennu'||'card';
				},
				up:function (player){
					var next=game.createEvent('dzsl_shennu_up',false);
					next.player=player;
					next.setContent(lib.skill.dzsl_buxi.upc);
				},
				upc:function (){
					'step 0'
					if(!player.storage.dzsl_shennu_map) player.storage.dzsl_shennu_map=[0,0];
					var info=player.storage.dzsl_shennu_map;
					var list=[];
					if(info[0]<4) list.add('X');
					if(info[1]<2) list.add('Y');
					if(list.length>1){
						player.chooseControl(list).set('prompt','升级：选择要升级的数值');
					}else{
						if(list.length==1) event._result={control:list[0]};
						else event.goto(2);
					};
					'step 1'
					if(result.control=='X'){
						player.storage.dzsl_shennu_map[0]++;
						game.log(player,'升级了','#g【神弩】','描述中的','#gX');
					}else{
						player.storage.dzsl_shennu_map[1]++;
						game.log(player,'升级了','#g【神弩】','描述中的','#gY');
					};
					event.finish();
					'step 2'
					if(!player.storage.dzsl_shennu_discard){
						player.storage.dzsl_shennu_discard=true;
						game.log(player,'升级了【神弩】的技能效果');
					};
				},
				content:function (){
					'step 0'
					player.restoreSkill('dzsl_shennu');
					if(!player.storage.dzsl_shennu_map) player.storage.dzsl_shennu_map=[0,0];
					var info=player.storage.dzsl_shennu_map;
					if(info[0]>=4&&info[1]>=2&&player.storage.dzsl_shennu_discard){
						player.draw();
						event.finish();
					}else{
						player.chooseControl('升级','摸牌').set('prompt','不息：升级神弩或摸一张牌');
					};
					'step 1'
					if(result.control=='升级') lib.skill.dzsl_buxi.up(player);
					else player.draw();
				},
			},
			'dzsl_shennu':{
				audio:'ext:夜白神略/audio/character:1',
				enable:'phaseUse',
				limited:true,
				skillAnimation:true,
				animationColor:'fire',
				filterTarget:function (card,player,target){
					return player.canUse('sha',target,false);
				},
				derivation:'dzsl_shennu_up',
				content:function (){
					'step 0'
					player.awakenSkill('dzsl_shennu');
					player.storage.dzsl_shennu_buff=[event,target];
					player.addTempSkill('dzsl_shennu_buff');
					var hs=player.getCards('h');
					if(hs.length){
						event.discard=hs.length;
						player.discard(hs);
					};
					'step 1'
					if(!player.storage.dzsl_shennu_map) player.storage.dzsl_shennu_map=[0,0];
					var info=player.storage.dzsl_shennu_map;
					event.X=Math.max(1+info[0],player.getDamagedHp());
					//if(event.X>5) event.X=5;
					event.Y=Math.max(3+info[1],game.countPlayer());
					//if(event.Y>5) event.Y=5;
					event.count=event.X+event.Y;
					'step 2'
					event.count--;
					var card=get.cards()[0];
					var cardx=card;
					player.showCards(card);
					if(player.storage.dzsl_shennu_discard&&get.name(card)!='sha'&&event.discard>0){
						event.discard--;
						card={
							name:'sha',
							nature:'fire',
							cards:[cardx],
							suit:get.suit(cardx),
							number:get.number(cardx),
						};
					};
					if(target.isAlive()&&get.name(card)=='sha'&&player.canUse(card,target,false)){
						player.useCard(card,[cardx],target,false);
					}else game.cardsDiscard(card);
					'step 3'
					if(event.count>0){
						if(target.isAlive()) event.goto(2);
					};
				},
				subSkill:{
					buff:{
						trigger:{
							global:['dying','dyingAfter'],
						},
						charlotte:true,
						forced:true,
						onremove:true,
						direct:true,
						filter:function (event,player,name){
							if(!player.storage.dzsl_shennu_buff) return false;
							if(event.player!=player.storage.dzsl_shennu_buff[1]) return false;
							if(name=='dying') return player.storage.dzsl_shennu_buff[0].count!=0;
							else return event.player.isAlive();
						},
						content:function (){
							if(event.triggername=='dying'){
								player.storage.dzsl_shennu_buff[0].count=0;
							}else{
								if(!player.storage.dzsl_shennu_buff2) player.storage.dzsl_shennu_buff2=[];
								player.storage.dzsl_shennu_buff2.add(trigger.player);
								player.addTempSkill('dzsl_shennu_buff2');
							};
						},
						sub:true,
					},
					'buff2':{
						forced:true,
						onremove:true,
						charlotte:true,
						mark:true,
						intro:{
							content:'本回合不能对$使用牌',
						},
						mod:{
							playerEnabled:function (card,player,target){
								if(player.storage.dzsl_shennu_buff2.contains(target)) return false;
							},
							cardSavable:function (card,player,target){
								if(player.storage.dzsl_shennu_buff2.contains(target)) return false;
							},
						},
						sub:true,
					},
				},
				mark:true,
				intro:{
					content:'limited',
				},
				init:function (player,skill){
					player.storage[skill]=false;
				},
			},
			'dzsl_shennu_up':{
			},
			//------------------------善舞（鬼神易）
			'dz017_shanwu':{
				audio:'ext:夜白神略/audio/character:1',
				// audioname:['ybsl_013yinji','dzsl_013yinji','dzsl_014xinzhikui','ybart_016manchengqi','dzsl_016manchengqi','ybsl_018zhangqing_feian'],
				audioname2:{
					ybsl_013yinji:'yb013_shanwu',
					dzsl_013yinji:'dz013_shanwu',
					dzsl_014xinzhikui:'dz014_shanwu',
					ybart_016manchengqi:'yb016_shanwu',
					dzsl_016manchengqi:'dz016_shanwu',
					ybsl_018zhangqing_feian:'yb018_shanwu',
				},
				enable:'phaseUse',
				usable:1,
				position:'he',
				filterCard:true,
				selectCard:[1,Infinity],
				check:function (card){
					var player=_status.event.player;
					if(ui.selected.cards&&ui.selected.cards.length>0) return 6-get.value(card)&&get.type2(card)==get.type2(ui.selected.cards[0]);
					var eff=6-get.value(card);
					if(player.hp<=2&&player.maxHp>2&&get.type2(card)=='basic') eff+=5;
					if(get.type2(card)=='trick'&&eff>0) eff+=2;
					if(get.type2(card)=='equip'&&eff>0&&player.countCards('he')>=5) eff+=3;
					return eff;
				},
				content:function (){
					'step 0'
					player.draw(cards.length);
					'step 1'
					var bool=true;
					for(var i of cards){
						if(get.type2(i)!=get.type2(cards[0])){
							bool=false;
							break;
						};
					};
					if(bool){
						switch(get.type2(cards[0])){
							case 'basic':player.recover();break;
							case 'trick':player.draw(2);break;
							case 'equip':player.addTempSkill('dz017_shanwu_buff');break;
						};
					};
				},
				ai:{
					order:11,
					result:{
						player:1,
					},
					threaten:1.5,//嘲讽值
				},
				subSkill:{
					buff:{
						audio:'ext:夜白神略/audio/character:1',
						audioname:['ybsl_013yinji','dzsl_013yinji','dzsl_014xinzhikui','ybart_016manchengqi','dzsl_016manchengqi','ybsl_018zhangqing_feian'],
						trigger:{
							source:'damageBegin1',
						},
						mark:true,
						intro:{
							content:'造成的伤害+1',
						},
						forced:true,
						charlotte:true,
						content:function (){
							trigger.num++;
						},
						sub:true,
					},
				},
			},
			//----------------和解（用途待定）
			'ybsl_hejie':{
				preHidden:true,
				trigger:{
					global:'damageBefore',
				},
				filter:function (event,player){
					return event.target!=event.source&&!player.hasSkill('ybsl_hejie_mark');
				},
				content:function (){
					'step 0'
					trigger.cancel();
					'step 1'
					player.addTempSkill('ybsl_hejie_mark');
					trigger.source.draw(1);
					trigger.player.draw(1);
				},
				subSkill:{
					mark:{
						mark:true,
						intro:{
							content:'本回合已发动',
						},
						sub:true,
					},
				},
			},
			//---------------------周瑜小乔
			'ybsl_xianyin':{
				audio:'ext:夜白神略/audio/character:2',
				zhuanhuanji:true,
				mark:true,
				intro:{
					content:function(storage,player){
						var str0='（括号内的阴阳为鸾鸣的形态）<br/>';
				var str1='阴（阴）：当你因弃置而失去一张黑桃牌时，你可令一名角色下个摸牌阶段额外摸一张牌；';
				var str2='阴（阳）：当你因弃置而失去一张梅花牌时，你可令一名角色回复一点体力；';
				var str3='阳（阴）：当你因弃置而失去一张红桃牌时，你可令一名角色失去一点体力；';
				var str4='阳（阳）：当你因弃置而失去一张方块牌时，你可令一名角色下个摸牌阶段少摸一张牌。';
				var str5='<span class="bluetext">';//蓝色字符
				var str6='<span class=yellowtext>';//黄色字符
				var str7='<span class=firetext>';//红色字符
				var str8='</span>';
				var str9='（若你没有鸾鸣或鸾鸣已使用则改为黑色牌）<br>';
				var str10='（若你没有鸾鸣或鸾鸣已使用则改为红色牌）<br>';
				if(player.storage.ybsl_xianyin==true) {//弦音阳
					if(player.storage.ybsl_luanming==true){//鸾鸣阳
						if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
							var str=str5+str4+str8+str10+str0;//√
						}
						else{//--------------------------------无鸾鸣
							var str=str5+str4+str8+str6+str10+str8+str0;//√
						}
					}
					else{//-------------------------------------鸾鸣阴
						if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
							var str=str5+str3+str8+str10+str0;//√
						}
						else{//--------------------------------无鸾鸣
							var str=str5+str3+str8+str6+str10+str8+str0;//√
						}
					}
				}
				else{//---------------------------------弦音阴
					if(player.storage.ybsl_luanming==true){//鸾鸣阳
						if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
							var str=str5+str2+str8+str9+str0;//√
						}
						else{//------------------------------无鸾鸣
							var str=str5+str2+str8+str6+str9+str8+str0;//√
						}
					}
					else{//---------------------------------鸾鸣阴
						if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
							var str=str5+str1+str8+str9+str0;//√
						}
						else{//-------------------------------无鸾鸣
							var str=str5+str1+str8+str6+str9+str8+str0;//√
						}
					}
				}
				return str;
					},
				},
				init:function(player){
					player.storage.ybsl_xianyin=false;
					// player.storage.ybsl_xianyin=true;
					// player.changeZhuanhuanji('ybsl_xianyin');
				},
				marktext:'☯',
				trigger:{player:'loseAfter'},
				filter:function(event,player){
					if(event.type!='discard') return false;
					if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){
						if(player.storage.ybsl_xianyin==true){
							if(player.storage.ybsl_luanming==true){var suit='diamond';}
							else{var suit='heart';}
						}
						else{
							if(player.storage.ybsl_luanming==true){var suit='club';}
							else{var suit='spade';}
						}
						for(var i of event.cards){
							if(get.suit(i)==suit)return true;
						}
					}
					else{
						if(player.storage.ybsl_xianyin==true){var color='red';}
						else{var color='black';}
						for(var i of event.cards){
							if(get.color(i)==color)return true;
						}
					}
					return false;
				},
				direct:true,
				content:function(){
					'step 0'
					if(player.storage.ybsl_xianyin==true){
						if(player.storage.ybsl_luanming==true){event.tt=-1;}
						else{event.tt=-2;}
					}
					else{
						if(player.storage.ybsl_luanming==true){event.tt=2;}
						else{event.tt=1;}
					}
					'step 1'
					switch(event.tt){
						case -2:var str='失去一点体力';break;
						case -1:var str='下个摸牌阶段少摸一张牌';break;
						case 1:var str='下个摸牌阶段额外摸一张牌';break;
						case 2:var str='回复一点体力';break;
					}
					player.chooseTarget().set('prompt2','请选择一名角色，令其'+str).set('ai',function(target){
						if(event.tt>0){return get.attitude(player,target)>0;}
						else{return get.attitude(player,target)<=0;}
					});
					'step 2'
					if(result.targets){
						var tar=result.targets[0];
						switch(event.tt){
							case -2:
								tar.loseHp();
								break;
							case -1:
								if(!tar.hasSkill('ybsl_xianyin_draw')) tar.addTempSkill('ybsl_xianyin_draw',{player:'phaseDrawAfter'});
								if(!tar.storage.ybsl_xianyin_draw) tar.storage.ybsl_xianyin_draw=0;
								tar.storage.ybsl_xianyin_draw--;
								break;
							case 1:
								if(!tar.hasSkill('ybsl_xianyin_draw')) tar.addTempSkill('ybsl_xianyin_draw',{player:'phaseDrawAfter'});
								if(!tar.storage.ybsl_xianyin_draw) tar.storage.ybsl_xianyin_draw=0;
								tar.storage.ybsl_xianyin_draw++;
								break;
							case 2:
								tar.recover();
								break;
						}
						player.changeZhuanhuanji('ybsl_xianyin');
					}
				},
				subSkill:{
					draw:{
						mark:true,
						marktext:'弦',
						intro:{
							content:function(storage,player){
								var str='下个摸牌阶段';
								if(!player.storage.ybsl_xianyin_draw){player.storage.ybsl_xianyin_draw=0}
								if(player.storage.ybsl_xianyin_draw>=0){str+='额外摸';}
								else{str+='少摸';}
								str+=Math.abs(player.storage.ybsl_xianyin_draw)+'张牌';
								return str;
							},
						},
						trigger:{player:'phaseDrawBegin',},
						direct:true,
						content:function(){
							if(!player.storage.ybsl_xianyin_draw||player.storage.ybsl_xianyin_draw==0){event.finish();}
							else{
								if(player.storage.ybsl_xianyin_draw>0){trigger.num+=player.storage.ybsl_xianyin_draw;}
								else {trigger.num-=Math.abs(player.storage.ybsl_xianyin_draw);}
								player.logSkill('ybsl_xianyin_draw',player);
							}
						},
						onremove:true,
					}
				},
				ai:{
					threaten:1.1,//嘲讽值
					expose:1,//跳立场
				},
			},
			'ybsl_luanming':{
				viewAs:function(cards,player){
					var name=false;
					var nature=null;
					if(player.storage.ybsl_luanming==true){var colorx='red';}//阳，红色
					else{var colorx='black';}//阴，黑色
					for(var i of cards){
						if(get.color(i)==colorx){
							var name=i.name;
							var nature=i.nature;
							var card=i;
						}
					}
					if(name) return {name:name,nature:nature,isCard:false,card:card,};
					return null;
				},
				lose:true,
				audio:'ext:夜白神略/audio/character:2',
				zhuanhuanji:true,
				mark:true,
				intro:{
					content:function(storage,player){//<br><span class="yellowtext">注意：此技能不能用于响应其他牌，更不能在别人濒死时用桃选择其为目标！</span>
						if(player.storage.ybsl_luanming==true) return '转换技，每回合限一次，当你可以使用牌时，你可以弃置一黑一红共两张牌，然后：阴：视为使用其中的黑色牌并额外执行一次；<span class="bluetext">阳：视为使用其中的红色牌并额外执行一次。</span>';
						return '转换技，每回合限一次，当你可以使用牌时，你可以弃置一黑一红共两张牌，然后：<span class="bluetext">阴：视为使用其中的黑色牌并额外执行一次；</span>阳：视为使用其中的红色牌并额外执行一次。';
					},
				},
				init:function(player){
					player.storage.ybsl_luanming=false;
					// player.storage.ybsl_luanming=true;
					// player.changeZhuanhuanji('ybsl_luanming');
				},
				marktext:'☯',
				usable:1,
				enable:'chooseToUse',
				position:'hs',
				filterCard:function(card){
					var color=get.color(card);
					for(var i=0;i<ui.selected.cards.length;i++){
						if(get.color(ui.selected.cards[i])==color) return false;
					}
					return get.color(card)!='none';
					// return true;
				},
				selectCard:2,
				complexCard:true,
				discard:true,
				ignoreMod:true,
				precontent:function(){
					'step 0'
					player.discard(event.result.cards)
					player.changeZhuanhuanji('ybsl_luanming')
					// event.card.effectCount++;
				// 	if(player.storage.ybsl_luanming==true){event.color='red';}//阳，红色
				// 	else{event.color='black';}//阴，黑色
				// 	for(var i of cards){
				// 		if(get.color(i)==event.color){
				// 			event.card=i;
				// 		}
				// 	}
				// 	'step 1'
				// 	player.changeZhuanhuanji('ybsl_luanming')
				// 	if(event.card&&player.hasUseTarget(event.card)){
				// 		player.chooseUseTarget(event.card,'视为使用一张'+get.translation(event.card),true);
				// 	}
				},
				// prompt:'<span class="yellowtext">注意：此技能不能用于响应其他牌，更不能在别人濒死时用桃选择其为目标！</span>',
				// content:function(){
				// 	'step 0'
				// 	if(player.storage.ybsl_luanming==true){event.color='red';}//阳，红色
				// 	else{event.color='black';}//阴，黑色
				// 	for(var i of cards){
				// 		if(get.color(i)==event.color){
				// 			event.card=i;
				// 		}
				// 	}
				// 	'step 1'
				// 	player.changeZhuanhuanji('ybsl_luanming')
				// 	if(event.card&&player.hasUseTarget(event.card)){
				// 		player.chooseUseTarget(event.card,'视为使用一张'+get.translation(event.card),true);
				// 	}
				// },
				group:'ybsl_luanming_use',
				subSkill:{
					use:{
						trigger:{player:'useCard',},
						direct:true,
						charlotte:true,
						filter:function(event,player){
							// game.log('event.skill:',event.skill)
							// game.log('event.getParent():',event.getParent())
							// game.log('event.getParent().skill:',event.getParent().skill)
							// game.log('event.getParent(0):',event.getParent(0))
							// game.log('event.getParent(1):',event.getParent(1))
							// game.log('event.getParent(2):',event.getParent(2))//
							// game.log('event.getParent(3):',event.getParent(3))
							// game.log('event.getParent(3).skill:',event.getParent(3).skill)//√
							// game.log('event.getParent(4):',event.getParent(4))
							// game.log('event.getParent(5):',event.getParent(5))
							// return event.getParent().skill=='ybsl_luanming';
							return event.skill=='ybsl_luanming'
						},
						content:function(){
							trigger.effectCount++;
							// player.addTempSkill('ybsl_luanming_buff','phaseUseAfter');
							// trigger.ybsl_luanming_buff=player;
						}
					},
					/*
					buff:{
						trigger:{player:'useCardToTargeted'},
						forced:true,
						charlotte:true,
						popup:false,
						lastDo:true,
						filter:function(event,player){
							return (event.parent.ybsl_luanming_buff==player&&event.targets.length==event.parent.triggeredTargets4.length);
						},
						content:function(){
							trigger.getParent().targets=trigger.getParent().targets.concat(trigger.targets);
							trigger.getParent().triggeredTargets4=trigger.getParent().triggeredTargets4.concat(trigger.targets);
						},
						onremove:true,
						// onremove:function(player){
						// 	delete player.storage.counttrigger.ybsl_luanming_buff;
						// },
					},
					*/
				},
			},
			//----------------神甄姬
			ybsl_zjzilian:{
				frequent:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					target:'useCardToBegin',
				},
				filter:function(event,player){
					if(event.card&&get.type(event.card)=='trick') return true;
				},
				content:()=>{
					player.draw();
				}
			},
			ybsl_zjsqiyuan:{
				audio:'ext:夜白神略/audio/character:2',
				// usable:1,
				subSkill:{
					block:{
						onremove:true,
						direct:true,
						trigger:{
							player:'phaseUseAfter',
						},
						content:function(){
							player.removeSkill('ybsl_zjsqiyuan_block');
						}
					},
				},
				enable:'phaseUse',
				filter:function(event,player){
					return !player.hasMark('ybsl_zjsqiyuan_block');
				},
				content:function(){
					'step 0'
					player.addTempSkill('ybsl_zjsqiyuan_block');
					player.addMark('ybsl_zjsqiyuan_block');
					player.judge('祈愿',function(card){
						var i,num=0,players=game.filterPlayer();
						for(i=0;i<players.length;i++){
							if(player!=players[i]){
								var att=get.attitude(player,players[i]);
								if(att>0){
									num++;
								}
							}
						}
						if(get.color(card)=='red'){
							if(num>0) return 2;
							return -2;
						}
						return 2;//这里return 的数字别私自改
					});
					'step 1'
					if(result.color=='black'){
						player.draw();
						player.removeMark('ybsl_zjsqiyuan_block');
						event.finish();
					}
					else{
						player.chooseTarget(true,function(card,player,target){
							return target!=player;
						}).set('prompt','请选择一名其他角色，令其摸两张牌');
					}
					'step 2'
					if(result.targets[0])result.targets[0].draw(2);
				}
			},
			ybsl_zjsshixiang:{
				audio:'ext:夜白神略/audio/character:2',
				limited:true,
				skillAnimation:true,
				animationColor:'water',
				trigger:{
					player:'phaseBegin',
				},
				check:function (event,player){
					if(player.countCards('h')==3)return true;
					if(player.hp<=2&&player.countCards('h','tao')<1)return true;
					if(player.countCards('j','lebu')>0) return true;
					return false;
				},
				content:function(){
					'step 0'
					player.awakenSkill('ybsl_zjsshixiang');
					event.num=player.countCards('h');//准备工作，记录相关数据
					event.cards=player.getCards('h');
					player.discard(event.cards);
					'step 1'
					player.draw(Math.min(event.num*3,9));
					player.skip('phaseDiscard');
				}
			},
			//---------------------复刻的悲歌
			'ybsl_beige':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'damageEnd',
				},
				filter:function (event,player){
					return (event.card&&event.card.name=='sha'&&event.source&&
							event.player.classList.contains('dead')==false&&player.countCards('he'));
				},
				direct:true,
				checkx:function (event,player){
					var att1=get.attitude(player,event.player);
					var att2=get.attitude(player,event.source);
					return att1>0&&att2<=0;
				},
				preHidden:true,
				content:function (){
					'step 0'
					var next=player.chooseToDiscard('he',get.prompt2('ybsl_beige',trigger.player));
					var check=lib.skill.ybsl_beige.checkx(trigger,player);
					next.set('ai',function(card){
						if(_status.event.goon) return 8-get.value(card);
						return 0;
					});
					next.set('logSkill','ybsl_beige');
					next.set('goon',check);
					next.setHiddenSkill('ybsl_beige');
					'step 1'
					if(result.bool){
						trigger.player.judge();
					}
					else{
						event.finish();
					}
					'step 2'
					switch(result.suit){
						case 'heart':trigger.player.recover();break;
						case 'diamond':trigger.player.draw(2);break;
						case 'club':trigger.source.chooseToDiscard('he',2,true);break;
						case 'spade':trigger.source.turnOver();break;
					}
				},
				ai:{
					expose:0.3,//跳立场
				},
			},

			//---------------栩仙
			'ybsl_xuxian':{
				audio:'ybsl_xuxian1',
				group:['ybsl_xuxian1','ybsl_xuxian2'],
				derivation:['ybsl_mixianshenshu'],
			},
			'ybsl_xuxian1':{
				audio:'ext:夜白神略/audio/character:2',
				enable:'chooseToUse',
				filter:function (event,player){
					return player.countCards('hs',{suit:'diamond'})>0;
				},
				position:'hs',
				filterCard:function (card){
					return get.suit(card)=='diamond';
				},
				viewAs:{
					name:'ybsl_mixianshenshu',
				},
				prompt:'将一张方块牌当弥仙神术使用',
				check:function (card){return 4.5-get.value(card)},
				ai:{
					order:2,
					useful:0,
					value:function(card,player,index,method){//不知道哪个参数有用，全写了
						if(player.countGroup!='shen'){
							return 7;
						}
						else {return 0}
					},
					result:{
						player:function(player,target){//发动这个技能对你的收益
							if(player.countGroup!='shen'){
								return 7;
							}
							else {return 0}
						},
						target:0,
					},
				},
			},
			'ybsl_xuxian2':{
				audio:'ext:夜白神略/audio/character:2',
				popup:'ybsl_xuxian',
				enable:'phaseUse',
				filter:function (event,player){
					return player.countCards('h',{suit:'diamond'})>0;
				},
				filterCard:function (card){
					return get.suit(card)=='diamond';
				},
				check:function (card){
					return 5-get.useful(card);
				},
				content:function (){
					player.draw();
				},
				discard:false,
				visible:true,
				loseTo:'discardPile',
				prompt:'献祭一次成仙化凡的机会并换取神明的补偿',
				delay:0.5,
				prepare:function (cards,player){
					player.$throw(cards,1000);
					game.log(player,'将',cards,'献祭了');
				},
				ai:{
					basic:{
						order:1.5,
					},
					result:{
						player:2,
					},
				},
			},
			//群里抄的双持
			ybsl_doubleEquip: {
				silent: true,
				locked: true,
				trigger: {
					player: 'equipBegin',
				},
				filter: function (event, player) {
					var subtype = get.subtype(event.card);
					if (subtype != 'equip1') return false;//判定装备的类型
					return player.countCards('e', {subtype: 'equip1'});
				},
				content: function () {
					// game.log('event.name',event.name)
					trigger.setContent(lib.skill[event.name].equip);
				},
				equip: function () {
					'step 0'
					var owner = get.owner(card);
					if (owner) owner.lose(card, ui.special, 'visible').set('type', 'equip');
					'step 1'
					if (event.cancelled) {
						event.finish();
						return;
					}
					if (card.destroyed) {
						if (player.hasSkill(card.destroyed)) {
							delete card.destroyed;
						} else {
							event.finish();
							return;
						}
					}
					if (event.draw) {
						game.delay(0, 300);
						player.$draw(card);
					}
					'step 2'
					if (card.clone) {
						game.broadcast(function (card, player) {
							if (card.clone) {
								card.clone.moveDelete(player);
							}
						}, card, player);
						card.clone.moveDelete(player);
						game.addVideo('gain2', player, get.cardsInfo([card.clone]));
					}
					player.equiping = true;
					'step 3'
					var cards = player.getCards('e', {subtype: get.subtype(card)});
					if (cards.length > 1) {//这里的数字是武器栏上限-1
						player.chooseCardButton(cards, true, '选择要替换的装备');
					} else event.goto(5);
					'step 4'
					player.lose(result.links, false, 'visible').set('type', 'equip').set('getlx', false).swapEquip = true;
					if (get.info(card, false).loseThrow) {
						player.$throw(result.links);
					}
					event.swapped = true;
					'step 5'
					if (player.isMin()) {
						event.finish();
						game.cardsDiscard(card);
						delete player.equiping;
						return;
					}
					if (lib.config.background_audio) {
						game.playAudio('effect', get.subtype(card));
					}
					game.broadcast(function (type) {
						if (lib.config.background_audio) {
							game.playAudio('effect', type);
						}
					}, get.subtype(card));
					player.$equip(card);
					game.addVideo('equip', player, get.cardInfo(card));
					game.log(player, '装备了', card);
					'step 6'
					var info = get.info(card, false);
					if (info.onEquip && (!info.filterEquip || info.filterEquip(card, player))) {
						if (Array.isArray(info.onEquip)) {
							for (var i = 0; i < info.onEquip.length; i++) {
								var next = game.createEvent('equip_' + card.name);
								next.setContent(info.onEquip[i]);
								next.player = player;
								next.card = card;
							}
						} else {
							var next = game.createEvent('equip_' + card.name);
							next.setContent(info.onEquip);
							next.player = player;
							next.card = card;
						}
						if (info.equipDelay != 'false') game.delayx();
					}
					delete player.equiping;
					if (event.delay) {
						game.delayx();
					}
				},
			},
			///吴六剑同时穿戴依托于这个
			ybsl_infEquip: {
				silent: true,
				locked: true,
				trigger: {
					player: 'equipBegin',
				},
				filter: function (event, player) {
					// var subtype = get.subtype(event.card);
					// if (subtype != 'equip1') return false;//判定装备的类型
					// return player.countCards('e', {subtype: 'equip1'});
					return true;
				},
				content: function () {
					// game.log('event.name',event.name)
					trigger.setContent(lib.skill[event.name].equip);
				},
				equip: function () {
					'step 0'
					var owner = get.owner(card);
					if (owner) owner.lose(card, ui.special, 'visible').set('type', 'equip');
					'step 1'
					if (event.cancelled) {
						event.finish();
						return;
					}
					if (card.destroyed) {
						if (player.hasSkill(card.destroyed)) {
							delete card.destroyed;
						} else {
							event.finish();
							return;
						}
					}
					if (event.draw) {
						game.delay(0, 300);
						player.$draw(card);
					}
					'step 2'
					if (card.clone) {
						game.broadcast(function (card, player) {
							if (card.clone) {
								card.clone.moveDelete(player);
							}
						}, card, player);
						card.clone.moveDelete(player);
						game.addVideo('gain2', player, get.cardsInfo([card.clone]));
					}
					player.equiping = true;
					'step 3'
					var cards = player.getCards('e', {subtype: get.subtype(card)});
					if (cards.length > 114514) {//这里的数字是武器栏上限-1
						player.chooseCardButton(cards, true, '选择要替换的装备');
					} else event.goto(5);
					'step 4'
					player.lose(result.links, false, 'visible').set('type', 'equip').set('getlx', false).swapEquip = true;
					if (get.info(card, false).loseThrow) {
						player.$throw(result.links);
					}
					event.swapped = true;
					'step 5'
					if (player.isMin()) {
						event.finish();
						game.cardsDiscard(card);
						delete player.equiping;
						return;
					}
					if (lib.config.background_audio) {
						game.playAudio('effect', get.subtype(card));
					}
					game.broadcast(function (type) {
						if (lib.config.background_audio) {
							game.playAudio('effect', type);
						}
					}, get.subtype(card));
					player.$equip(card);
					game.addVideo('equip', player, get.cardInfo(card));
					game.log(player, '装备了', card);
					'step 6'
					var info = get.info(card, false);
					if (info.onEquip && (!info.filterEquip || info.filterEquip(card, player))) {
						if (Array.isArray(info.onEquip)) {
							for (var i = 0; i < info.onEquip.length; i++) {
								var next = game.createEvent('equip_' + card.name);
								next.setContent(info.onEquip[i]);
								next.player = player;
								next.card = card;
							}
						} else {
							var next = game.createEvent('equip_' + card.name);
							next.setContent(info.onEquip);
							next.player = player;
							next.card = card;
						}
						if (info.equipDelay != 'false') game.delayx();
					}
					delete player.equiping;
					if (event.delay) {
						game.delayx();
					}
				},
			},
			//-------------------孙丽松
			'yb001_fufeng':{
				audio:'ext:夜白神略/audio/character:1',//听吧，这是风的呼吸
				audioname2:{
					'ybslshen_014liutianyu':'yb014_fufeng',
				},
				trigger:{
					player:'phaseUseBefore',
				},
				filter:function(event,player){
					return player.maxHp-player.hp>0;
				},
				frequent:true,
				content:function (){
					var num=player.maxHp-player.hp;
					if(num>3)num=3;
					player.draw(num);
				},
			},
			'yb001_wanyue':{
				trigger:{
					player:'phaseJieshuBegin',
				},
				frequent:true,
				audio:'ext:夜白神略/audio/character:2',
				content:function (){
					'step 0'
					var suits=[];
					var hs=player.getCards('h');
					for(var i=0;i<hs.length;i++){
						suits.add(get.suit(hs[i]));
					}
					player.removeAdditionalSkill('yb001_wanyue');
					var num=4-suits.length;
					if(num<1){
						num=1;
					}
					player.draw(num);
				},
			},
			'yb001_beige':{
				inherit:'ybsl_beige',
				audio:'ext:夜白神略/audio/character:2',
			},
			'yb001_yishui':{
				trigger:{
					player:'phaseEnd',
				},
				frequent:true,
				audio:'ext:夜白神略/audio/character:2',
				content:function (){
					'step 0'
					var discarded=get.discarded();
					if(discarded.length){
						player.chooseCardButton('选择一张获得之',discarded).set('ai',function(button){
							return get.value(button.link);
						});
					}
					else{
						event.finish();
					}
					'step 1'
					if(result.bool&&result.links&&result.links.length){
						player.gain(result.links,'gain2');
					}
					event.finish();
				},
			},
			// yb001_yongyue:{//没写完呢，别着急咏月
			// 	audio:'ext:夜白神略/audio/character:2',
			// 	forced:true,
			// 	trigger:{player:'phaseBegin',},
			// 	filter:(event,player)=>{
			// 		return player.getDamagedHp()>0;
			// 	},
			// 	content:function(){
			// 		'step 0'
			// 		var list=[];
			// 		var type=[];
			// 		for(var i of lib.inpile){
			// 			if(!type.contains(get.type2(i)))type.push(get.type2(i));
			// 		};
			// 		// if(player.getDamagedHp()>=1)
			// 	},
			// },//这个作废
			yb001_yongyue:{
				audio:'ext:夜白神略/audio/character:2',
				audioname2:{
					'ybslshen_014liutianyu':'yb014_yongyue',
				},
				forced:true,
				trigger:{player:['phaseJudgeBegin','damageBegin3']},
				filter:(event,player,name)=>{
					// if(name=='loseAfter')return player.getDamagedHp()==0;
					return player.getDamagedHp()>0;
				},
				content:function(){
					'step 0'
					var num=player.getDamagedHp();
					// if(num==0){player.gainMaxHp();}
					// else{}
					trigger.cancel();
					player.loseMaxHp(num);player.draw(num);
				},
				group:'yb001_yongyue_lose',
				subSkill:{
					lose:{
						trigger:{player:['loseAfter']},
						audio:'yb001_yongyue',
						audioname2:{
							'ybslshen_014liutianyu':'yb014_yongyue',//世间悲欢离合，但无两全策
						},
						forced:true,
						filter:(event,player)=>{
							if(player.getDamagedHp()<1)return true;
							return false;
						},
						content:function(){
							player.gainMaxHp();
						}
					},
				}
			},
			/*
			yb001_yongyue:'咏月',
			yb001_yongyue_info:'锁定技，判定阶段开始时/当你受到伤害时，若你存在已损体力值，你跳过之，改为失去空血条，然后摸等量牌；当你失去牌后，若你的已损体力值不大于3，你增加一点体力上限。',
			'yb001_minglun_info':'锁定技，回合开始时，根据你已损体力值：<br/>不小于1：你可选择一个牌的类型，本回合使用此类型的牌时，摸一张牌；<br/>不小于2：你可获得一张随机装备；<br/>不小于3：你可摸3张牌。<br/>结束阶段，你回复X点体力或摸2X张牌（记X为回合开始时你可选的选项，但你没选，且当前阶段不满足的选项数）',
			锁定技，回合开始时，你展示牌堆顶一张牌并放在武将牌上，至多放四张。根据“命轮”的花色，你视为拥有技能：
			<br>黑桃：栖月；红桃，旅心；<br>梅花，折叶；方块：忆水。
			结束阶段，若“命轮”包含相同花色或四种花色，则你需弃置所有“命轮”或失去一点体力。
			*/
			yb001_haowan:{
				audio:'ext:夜白神略/audio/character:2',//垆边人似月，皓腕凝霜雪
				forced:true,
				usable:1,
				trigger:{player:'damageBegin3',},
				filter:(event,player)=>{
					if(!event.cards)return false;
					if(!get.itemtype(event.cards)=='cards') return false;
					if(event.cards.length!=1)return false;
					var suits=[],es=player.getCards('e');
					for(var i of es) suits.add(get.suit(i,player));
					return suits.contains(get.suit(event.cards[0]));
				},
				content:()=>{trigger.cancel();},
			},
			yb001_minglun:{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				trigger:{
					player:['phaseBegin','phaseAfter'],
				},
				mark:true,
				intro:{
					markcount:'expansion',
					mark:function(dialog,content,player){
						var content=player.getExpansions('yb001_minglun');
						if(content&&content.length){
							dialog.addAuto(content);
						}
					},
					content:function(content,player){
						var content=player.getExpansions('yb001_minglun');
						if(content&&content.length){
							return get.translation(content);
						}
					}
				},
				filter:function(event,player,name){
					if(name=='phaseAfter') {
						var cards=player.getExpansions('yb001_minglun');
						var list=[];
						for(var i of cards){
							if(list.contains(get.suit(i))){return true;}
							else{list.push(get.suit(i));}
						}
						return player.getExpansions('yb001_minglun')&&player.getExpansions('yb001_minglun').length>=4;
					} 
					else return !player.getExpansions('yb001_minglun')||player.getExpansions('yb001_minglun').length<4;
				},
				content:function(){
					'step 0'
					if(event.triggername=='phaseAfter'){
						player.chooseControl(['掉血','弃掉']).set('prompt','请选择一项：弃掉所有“命轮”牌，或失去一点体力').set('ai',function(control){
							var cards=player.getExpansions('yb001_minglun');
							var list=[];
							for(var i of cards){
								list.push(get.suit(i));
							}
							if(player.hp<=2)return '弃掉';
							else if(list.length<3) return '掉血';
							return '弃掉';
						});
					}
					else{
						event.goto(2);
					}
					'step 1'
					if(result.control=='掉血'){
						player.loseHp();
					}
					else{
						player.discard(player.getExpansions('yb001_minglun'));
					}
					event.finish();
					'step 2'
					var card=get.cards()[0];
					player.showCards(card);
					player.addToExpansion(card,'gain2').gaintag.add('yb001_minglun');
				},
				derivation:['yb001_minglun_spade','yb001_minglun_heart','yb001_minglun_club','yb001_minglun_diamond'],
				group:['yb001_minglun_spade','yb001_minglun_heart','yb001_minglun_club','yb001_minglun_diamond'],
				subSkill:{
					spade:{
						nobracket:true,
						inherit:'yb018_qiyue',
						audio:'ext:夜白神略/audio/character:2',
						filter:function(event,player){
							// if(!lib.skill.yb018_qiyue.filter(event,player)) return false;
							var cards=player.getExpansions('yb001_minglun');
							for(var i of cards){
								if(get.suit(i)=='spade'){return true;}
							}
							return false;
						}
					},
					heart:{
						nobracket:true,
						inherit:'yb014_lvxin',
						audio:'ext:夜白神略/audio/character:2',
						filter:function(event,player){
							if(!lib.skill.yb014_lvxin.filter(event,player)) return false;
							var cards=player.getExpansions('yb001_minglun');
							for(var i of cards){
								if(get.suit(i)=='heart'){return true;}
							}
							return false;
						}
					},
					club:{
						nobracket:true,
						inherit:'yb018_zheye',
						audio:'ext:夜白神略/audio/character:2',
						filter:function(event,player){
							// if(!lib.skill.yb018_zheye.filter(event,player)) return false;
							var cards=player.getExpansions('yb001_minglun');
							for(var i of cards){
								if(get.suit(i)=='club'){return true;}
							}
							return false;
						}
					},
					diamond:{
						nobracket:true,
						inherit:'yb001_yishui',
						audio:'ext:夜白神略/audio/character:2',
						filter:function(event,player){
							// if(!lib.skill.yb001_yishui.filter(event,player)) return false;
							var cards=player.getExpansions('yb001_minglun');
							for(var i of cards){
								if(get.suit(i)=='diamond'){return true;}
							}
							return false;
						}
					},
				},
			},
			//-----------------陈爱琳
			'yb002_ziren':{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.storage.yb002_ziren!=true;
				},
				ai:{
					order:11,//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
					result:{//主动技的收益
						player:function(player,target){//注意，和effect里的参数不一样
							return player.hp-1.1;//血越多收益越高,1血不发动
						},
					},
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseControl('无','火','雷','cancel2');
					'step 1'
					if(result.control=='cancel2'){
						player.storage.counttrigger.yb002_ziren--;
						event.finish;
					}
					else{
						if(result.control=='无'){
							player.damage('nocard',player);
						}
						if(result.control=='火'){
							player.damage('fire','nocard',player);
						}
						if(result.control=='雷'){
							player.damage('thunder','nocard',player);
						}
						game.log('yb002_ziren');
						// player.storage.yb002_ziren=true;
					}
				},
			},
			//------------------------SP陈爱琳（旧版）
			'yb002_touxin':{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',//此技能代码截自蒋干盗书
				filterTarget:function(c,p,t){
					return t!=p&&t.countGainableCards(p,'hej')>0;
				},
				content:function(){
					'step 0'
					player.loseHp();
					'step 1'
					player.gainPlayerCard(target,true,'hej','visibleMove');
				},
				ai:{
					order:1,
					result:{
						player:function(player){
							if(player.countCards('h')>=player.hp-1) return -1;
							if(player.hp<3) return -1;
							return 1;
						},
						target:-1,
					},
					threaten:2,//嘲讽值
					expose:1,//跳立场
				},
			},
			'yb002_zheye':{
				inherit:'yb018_zheye',
				audio:'ext:夜白神略/audio/character:2',
			},
			/*
			'yb002_xiangyun':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:['loseAfter','useCard','respond','loseAsyncAfter','cardsDiscardAfter']
				},
				forced:true,
				filter:function(event,player){
					if(get.type(event.cards)!='equip'&&get.type(event.cards)!='delay')return true;
					return false;
				},
				content:function(){
					if(get.type(trigger.cards)!='equip'&&get.type(trigger.cards)!='delay')player.addToExpansion(trigger.cards,player,'giveAuto').gaintag.add('yb002_xiangyun');
				},
				marktext:'香',
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
			},
			*/
			'yb002_xiangyun':{//太复杂，鸽了
				audio:'ext:夜白神略/audio/character:2',
				group:['yb002_xiangyun_1','yb002_xiangyun_2'],
				subSkill:{
					1:{
						audio:'yb002_xiangyun',
					},
					2:{
						audio:'yb002_xiangyun',
					},
				},
			},
			'yb002_yishui':{
				inherit:'yb001_yishui',
				audio:'ext:夜白神略/audio/character:2',
			},
			//-------------------------神陈爱琳
			'yb002_yiqu':{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				//usable:1,
				filter:function (event,player){
					if(player.hasSkill('yb002_shangyuan')&&player.countMark('yb002_shangyuan')>(game.countPlayer()*2-1))return false;
					// return player.storage.yb002_yiqu==true;
					return !player.hasSkill('yb002_yiqu_block');
					// return true;
				},
				content:function (){
					'step 0'
					var controls=[];
					if(ui.cardPile.hasChildNodes()) controls.push('选择牌堆中的一张牌');
					if(ui.discardPile.hasChildNodes()) controls.push('选择弃牌堆中的一张牌');
					if(game.hasPlayer(function(current){
						return current.countCards('hej')>0;
					})) controls.push('选择一名角色区域内的一张牌');
					if(!controls.length){event.finish();return;}
					event.controls=controls;
					var next=player.chooseControl();
					next.set('choiceList',controls)
					next.set('prompt','请选择要移动的卡牌的来源');
					next.ai=function(){return 0};
					'step 1'
					result.control=event.controls[result.index];
					var list=['弃牌堆','牌堆','角色'];
					for(var i=0;i<list.length;i++){
						if(result.control.indexOf(list[i])!=-1){event.index=i;break;}
					}
					if(event.index==2){
						player.chooseTarget('请选择要移动的卡牌的来源',true,function(card,kagari,target){
							return target.countCards('hej')>0;
						});
					}
					else{
						var source=ui[event.index==0?'discardPile':'cardPile'].childNodes;
						var list=[];
						for(var i=0;i<source.length;i++) list.push(source[i]);
						player.chooseButton(['请选择要移动的卡牌',list],true).ai=get.buttonValue;
					}
					'step 2'
					if(event.index==2){
						player.line(result.targets[0]);
						event.target1=result.targets[0];
						player.choosePlayerCard(result.targets[0],true,'hej').set('visible',true);
					}
					else{
						event.card=result.links[0];
					}
					'step 3'
					if(event.index==2) event.card=result.cards[0];
					var controls=[
						'将这张牌移动到牌堆的顶部或者底部',
						'将这张牌移动到弃牌堆的顶部或者底部',
						'将这张牌移动到一名角色对应的区域里',
					];
					event.controls=controls;
					var next=player.chooseControl();
					next.set('prompt','要对'+get.translation(event.card)+'做什么呢？');
					next.set('choiceList',controls);
					next.ai=function(){return 2};
					'step 4'
					result.control=event.controls[result.index];
					var list=['弃牌堆','牌堆','角色'];
					for(var i=0;i<list.length;i++){
						if(result.control.indexOf(list[i])!=-1){event.index2=i;break;}
					}
					if(event.index2==2){
						player.chooseTarget('要将'+get.translation(card)+'移动到哪一名角色的对应区域呢',true).ai=function(target){
							return target==_status.event.player?1:0;
						};
					}
					else{
						player.chooseControl('顶部','底部').set(
							'prompt','把'+get.translation(card)+'移动到'+(event.index2==0?'弃':'')+'牌堆的...'
						);
					}
					'step 5'
					if(event.index2!=2){
						//if(event.target1) event.target1.lose(card,ui.special);
						//else card.goto(ui.special);
						event.way=result.control;
					}
					else{
						event.target2=result.targets[0];
						var list=['手牌区'];
						if(lib.card[card.name].type=='equip'&&event.target2.isEmpty(lib.card[card.name].subtype)) list.push('装备区');
						if(lib.card[card.name].type=='delay'&&!event.target2.storage._disableJudge&&!event.target2.hasJudge(card.name))
							list.push('判定区');
						if(list.length==1) event._result={control:list[0]};
						else{
							player.chooseControl(list).set(
								'prompt','把'+get.translation(card)+'移动到'+get.translation(event.target2)+'的...'
							).ai=function(){return 0};
						}
					}
					'step 6'
					if(event.index2!=2){
						var node=ui[event.index==0?'discardPile':'cardPile'];
						if(event.target1){
							var next=event.target1.lose(card,event.position);
							if(event.way=='顶部') next.insert_card=true;
						}
						else{
							if(event.way=='底部') node.appendChild(card);
							else node.insertBefore(card,node.firstChild);
						}
						player.addTempSkill('yb002_yiqu_block');
						game.updateRoundNumber();
						// player.storage.yb002_yiqu=false;
						event.finish();
					}
					else{
						if(result.control=='手牌区'){
							var next=event.target2.gain(card);
							if(event.target1){
								next.source=event.target1;
								next.animate='giveAuto';
							}
							else next.animate='draw';
						}
						else if(result.control=='装备区'){
							if(event.target1) event.target1.$give(card,event.target2);
							event.target2.equip(card);
						}
						else{
							if(event.target1) event.target1.$give(card,event.target2);
							event.target2.addJudge(card);
						}
					}
					'step 7'
					player.addTempSkill('yb002_yiqu_block');
					game.updateRoundNumber();
					// player.storage.yb002_yiqu=false;
				},
				ai:{
					order:10,
					result:{
						player:1,
					},
				},
				subSkill:{
					block:{
						forced:true,
						direct:true,
						charlotte:true,
						sub:true,
					},
				},
			},
			'ybold_shangyuan':{
				enable:'phaseUse',
				filter:function (event,player){
					if(player.hasSkill('yb002_yiqu_block')&&player.countMark('ybold_shangyuan')<(player.maxHp-player.hp))return true;
				},
				content:function (){
					player.removeSkill('yb002_yiqu_block');
					player.addMark('ybold_shangyuan');
				},
				mark:true,
				marktext:'怨',
				intro:{
					content:function (storage,player){
						var str='本回合已使用';
						var max=player.maxHp-player.hp;
						if(max<0)max=0;
						str+=get.translation(player.storage.ybold_shangyuan);
						str+='/';
						str+=get.translation(max);
						str+='次';
						return str;
					},
				},
				ai:{
					combo:'yb002_yiqu',
				},
			},
			'yb002_shangyuan':{
				audio:'ybold_shangyuan',
				trigger:{
					player:'damageEnd',
				},
				direct:true,
				content:function (){
					'step 0'
					player.chooseTarget('请选择一个目标').set('ai',function(target){//ai选目标的限制条件
						return target.getDamagedHp();//选已损体力最大的
					});
					'step 1'
					if(result.targets){
						event.tar=result.targets[0];
						event.num=event.tar.maxHp-event.tar.hp;
						if(event.num>5)event.num=5;
						if(event.num<1)event.num=1;
					}
					else {
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.chooseControl('摸牌','弃牌').set('prompt','令'+get.translation(result.targets[0])+'摸或弃'+event.num+'张牌?').set('ai',function(target){
							var player=get.player();//定义变量player为选目标的发起者(不懂可以先不写)
							var target=result.targets[0];
							return get.attitude(player,target)>0?'摸牌':'弃牌';
						})
					}
					else{
						event.goto(5);
					}
					'step 3'
					if(result.control=='摸牌'){
						event.tar.draw(event.num);
						event.xuan='摸';
					}
					else{
						event.tar.chooseToDiscard(event.num,'he',true);
						event.xuan='弃';
					}
					'step 4'
					player.logSkill('yb002_shangyuan');
					game.log(player,'令',event.tar,event.xuan,'了',get.cnNumber(event.num),'张牌');
					player.addMark('yb002_shangyuan',event.num);
					'step 5'
					event.finish();
				},
				mark:true,
				marktext:'殇',
				intro:{
					content:'mark',
				},
				ai:{
					maixie:true,
					threaten:0.6,//嘲讽值
					expose:1,//跳立场
				},
				group:['yb002_shangyuan_buff'],
				subSkill:{
					buff:{
						trigger:{
							player:'phaseEnd',
						},
						forced:true,
						content:function (){
							player.removeMark('yb002_shangyuan',player.storage.yb002_shangyuan);
						},
						sub:true,
					},
				},
			},
			//----------------闫爽003
			'yb003_wucai':{
				inherit:'yb009_wucai',
				audio:'ext:夜白神略/audio/character:1',
			},
			'yb003_toushi':{
				audio:'ext:夜白神略/audio/character:2',
			},
			'yb003_fenxiang':{
				audio:'ext:夜白神略/audio/character:2',
			},
			//----------------张玉洁004
			'yb004_wunv':{
				audio:'ext:夜白神略/audio/character:2',
				// audioname:['ybsl_048wushuang'],
				audioname2:{
					'ybsl_048wushuang':'yb048_wuling',
				},
				trigger:{player:'useCard',source:'damageBegin1'},
				forced:true,
				filter:function(event,player){
					if(event.name=='useCard') return get.type(event.card)=='trick';
					return player!=event.player&&player.countCards('h')>=event.player.countCards('h');
				},
				content:function(){
					if(event.triggername=='useCard')trigger.nowuxie=true;
					else trigger.num++;
				},
			},
			'yb004_tianqi':{
				audio:'ext:夜白神略/audio/character:2',
				locked:function(skill,player){
					if(!player||!player.storage.yb004_shangyuan) return true;
					return false;
				},
				trigger:{
					player:['phaseZhunbeiBegin','phaseJieshuBegin','damageEnd'],
					source:'damageAfter',
				},
				levelUpFilter:function(player){
					if(!player.storage.yb004_shangyuan)return true;
					return false;
				},
				levelUp:function(player){
					player.storage.yb004_shangyuan=true;
				},
				direct:true,
				filter:function(event,player,name){
					if(name=='damageAfter'){
						if(event.player==player) return false;
					}
					if(!player.storage.yb004_shangyuan) return event.name=='damage'&&event.num>0;
					return name!='damageAfter';
				},
				content:function(){
					'step 0'
					var str='';
					if(event.triggername=='phaseZhunbeiBegin')str+='<span style=\'color:#e1ff00\'>准备阶段</span>或结束阶段或当你受到伤害后';
					if(event.triggername=='phaseJieshuBegin')str+='准备阶段或<span style=\'color:#e1ff00\'>结束阶段</span>或当你受到伤害后';
					if(event.triggername=='damageEnd')str+='准备阶段或结束阶段或<span style=\'color:#e1ff00\'>当你受到伤害后</span>';
					str+='，你可以进行一次判定，若结果为红色，则你回复一点体力或摸两张牌。';
					if(player.storage.yb004_shangyuan){
						player.chooseBool(get.prompt('yb004_tianqi',trigger.player),str);
					}
					else event._result={bool:true};
					'step 1'
					if(result.bool){
						player.judge('天祈',function(card){
							if(player.storage.yb004_shangyuan){
								if(get.color(card)=='red')return 2;
								return 0;
							}//这里return 的数字别私自改
							else{
								if(event.triggername=='damageAfter'){
									if(trigger.num<=1){
										if(get.color(card)=='red')return 1.8;
										return 0;
									}
									else{
										if(get.color(card)=='black')return -2;
										return 0;
									}
								}
								else{
									if(get.color(card)=='black')return 3;
									return 2.5;
								}
							}
						});
					}
					'step 2'
					switch(result.judge){
						case 3:player.draw(trigger.num+1);break;
						case 2.5:player.recover(Math.max(trigger.num-1,0));break;
						case 2:player.chooseDrawRecover(2,true);break;
						case 1.8:player.chooseDrawRecover(1,true);break;
						case -2:player.loseHp();player.draw();break;
						case 0:event.finish();break;
					}
				},
				init:function(player,skill){
					lib.skill.xinleiji_misa.disableReason.push('天祈')
				},
			},
			'yb004_shangyuan':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					source:['die'],
				},
				filter:function(event,player){
					// if(event.num)game.log('event.num：',event.num);
					// if(event.getParent())game.log('event.getParent()：',event.getParent());
					// if(event.getParent(0))game.log('event.getParent(0)：',event.getParent(0));
					// if(event.getParent(1))game.log('event.getParent(1)：',event.getParent(1));//父事件为dying
					// if(event.getParent(2))game.log('event.getParent(2)：',event.getParent(2));//父事件为伤害
					// if(event.getParent(2).num)game.log('event.getParent(2).num：',event.getParent(2).num);
					// if(event.getParent(3))game.log('event.getParent(3)：',event.getParent(3));//父事件为技能
					// if(event.getParent(4))game.log('event.getParent(4)：',event.getParent(4));
					return event.getParent(2).num>1;
				},
				forced:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'YB_snow',
				derivation:['yb004_tianqi_rewrite','yb004_yujie'],
				// onremove:true,
				content:function(){
					'step 0'
					player.awakenSkill('yb004_shangyuan');
					player.removeSkill('yb004_wunv');
					player.storage.yb004_shangyuan=true;
					// player.YB_levelUp(['yb004_tianqi']);
					lib.skill.xinleiji_misa.disableReason.remove('天祈')
					player.chooseDrawRecover(2,true);
					player.addSkill('yb004_yujie');
				},
			},
			'yb004_yujie':{
				audio:'ext:夜白神略/audio/character:1',
				audioname2:{
					ybsl_005wangruobing:'yb005_yujie',
				},
				forced:true,
				trigger:{player:['judgeBefore']},
				content:function(){
					'step 0'
					trigger.noJudgeTrigger=true;
					'step 1'
					var card=get.cards()[0];
					game.cardsGotoOrdering(card);
					event.card=card;
					game.broadcast(function(card){
						ui.arena.classList.add('thrownhighlight');
						card.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
					},event.card);
					event.node=event.card.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
					ui.arena.classList.add('thrownhighlight');
					game.addVideo('thrownhighlight1');
					game.addVideo('centernode',null,get.cardInfo(event.card));
					player.chooseBool('是否弃置'+get.translation(event.card)+'？');
					'step 2'
					if(!result.bool){
						game.log(player,'观看并放回了',event.card);
						ui.cardPile.insertBefore(event.card,ui.cardPile.firstChild);
					}
					else{
						game.log(player,'展示并弃掉了',event.card);
						event.card.discard();
					}
					game.addVideo('deletenode',player,[get.cardInfo(event.node)]);
					event.node.delete();
					game.broadcast(function(card){
						ui.arena.classList.remove('thrownhighlight');
						if(card.clone){
							card.clone.delete();
						}
					},event.card);
				},
			},
			/*
			巫女：锁定技玉洁
			1.当有角色即将进行判定时，你观看牌堆顶一张牌并可选择是否弃置。
			2.你的判定结果不能被更改。

			天祈：
			当你造成或受到伤害后，
			1.若本回合没有判定牌进入弃牌堆，则你可以进行一次判定
			红色：你获得判定牌并随机获得场上一张同颜色的牌
			黑色：若目标或来源手牌数不大于你则令此伤害-1或+1

			殇怨：觉醒技
			当你对其他角色造成＞1的伤害而令其陷入濒死状态时，你修改 天祈 
			获得技能：玉洁

			玉洁：同调
			锁定技，当有判定牌进入弃牌堆后，你本回合使用与此牌颜色相同的锦囊牌不能被响应。

			天祈•改：
			删除本回合没有判定牌进入弃牌堆的条件。
			*/
			//----------------王若冰005
			'yb005_bingqing':{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				trigger:{
					target:'useCardToBegin',
				},
				filter:function(event,player){
					return event.card.name=='sha'&&(event.card.nature=='ice'||event.card.nature=='YB_snow'||event.player.getEquip('hanbing')||event.player.getEquip('ybsl_piaoxueruyi'));
				},
				content:()=>{trigger.cancel();},
				mod:{
					cardnature:function(card,player){
						if(get.name(card)=='sha') return 'ice';
					},
				},
				ai:{
					threaten:3,
					effect:{
						target:function(card,player,target){
							if(card.name=='sha'&&(get.nature(card)=='ice'||get.nature(card)=='YB_snow'||player.getEquip('hanbing')||player.getEquip('ybsl_piaoxueruyi'))) return 'zerotarget';
						}
					}
				},
				/*
				*/
			},
			'yb005_ruyu':{
				audio:'ext:夜白神略/audio/character:2',
			},
			yb005_qianxun:{
				mod:{
					targetEnabled:function(card,player,target,now){
						if(card.name=='shunshou'||card.name=='lebu') return false;
					}
				},
				audio:'ext:夜白神略/audio/character:2',
			},
			'yb005_jieshen':{
				audio:'ext:夜白神略/audio/character:2',
				// limited:true,
				skillAnimation:true,
				animationColor:'YB_snow',
				// enable:'phaseUse',
				trigger:{player:'phaseZhunbeiBegin',},
				check:function (event,player){
					if(player.maxHp>3)return true;
					if(player.maxHp<=2)return false;
					if(player.getDamagedHp()>1)return true;
				},
				derivation:['yb009_wucai','yb018_zheye','yb004_yujie'],
				content:function(){
					'step 0'
					// player.awakenSkill('yb005_jieshen');
					player.loseMaxHp();
					var list=[];
					if(!player.hasSkill('yb009_wucai'))list.push('yb009_wucai');
					if(!player.hasSkill('yb018_zheye'))list.push('yb018_zheye');
					if(!player.hasSkill('yb004_yujie'))list.push('yb004_yujie');
					if(list.length>0){player.chooseControl(list);}
					'step 1'
					if(result.control){player.addSkill(result.control);}
					player.draw(3);
				},
			},
			'yb005_wucai':{
				inherit:'yb009_wucai',
				audio:'ext:夜白神略/audio/character:1',
			},
			'yb005_zheye':{
				inherit:'yb018_zheye',
				audio:'ext:夜白神略/audio/character:2',
			},
			'yb005_yujie':{
				inherit:'yb004_yujie',
				audio:'ext:夜白神略/audio/character:2',
			},
			//----------------王汉桢006
			'yb006_boxue':{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				trigger:{
					player:['useCard'],
					target:['useCardToTargeted'],
				},
				forced:true,
				init:function(player){
					player.storage.yb006_boxue=[];
				},
				levelUpFilter:function(player){
					if(!player.storage.yb006_boxuex)return true;
					return false;
				},
				levelUp:function(player){
					player.storage.yb006_boxuex=true;
				},
				filter:(event,player)=>{
					if(get.type(event.card)=='equip')return false;
					if(!player.storage.yb006_boxue.contains(event.card.name)) return true;
					return player.storage.yb006_boxuex;
				},
				content:function(){
					'step 0'
					if(!player.storage.yb006_boxue.contains(trigger.card.name)){
						player.storage.yb006_boxue.push(trigger.card.name);
						game.log(player,'记录了',get.translation(trigger.card.name))
					}
					else{
						player.storage.yb006_boxue.remove(trigger.card.name);
						game.log(player,'移除了',get.translation(trigger.card.name))
						var num=(!trigger.targets||!trigger.targets.contains(trigger.player))?2:1;
						player.draw(num);
					}
				},
				mark:true,
				intro:{
					content:function(event,player,storage,name,skill){
						var str='已记录了';
						str+=get.translation(player.storage.yb006_boxue);
						return str;
					}
				}
			},
			'yb006_jufan':{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				unique:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'YB_snow',
				trigger:{
					player:['phaseZhunbeiBegin','phaseJieshuBegin'],
				},
				derivation:['yb006_boxue_rewrite','yb006_biaoshuai_rewrite'],
				// onremove:true,
				filter:function(event,player){
					if(player.storage.yb006_boxue.length>=3)return true;
					return false;
				},
				init: function (player) {
					player.storage.yb006_boxue = [];
				},//QQQ
				content:function(){
					'step 0'
					player.awakenSkill('yb006_jufan');
					// player.YB_levelUp(['yb006_boxue','yb006_biaoshuai']);
					player.storage.yb006_boxuex=true;
					player.storage.yb006_biaoshuaix=true;
					game.log(player,'的【博学】和【表率】改变了。')
				},
			},
			'yb006_biaoshuai':{
				audio:'ext:夜白神略/audio/character:2',
				zhuSkill:true,
				// global:'yb006_biaoshuai_2',
				trigger:{
					player:'useCard',
				},
				usable:1,
				direct:true,
				filter:(event,player)=>{
					if(_status.currentPhase!=player) return false;
					return true;
				},
				content:function(){
					// player.addTempSkill('yb006_biaoshuai_1');
					player.storage.yb006_biaoshuai=trigger.card.name;
					player.markSkill('yb006_biaoshuai');
				},
				intro:{
					content:function(event,player,storage,name,skill){
						return '本回合第一次用的牌是'+get.translation(player.storage.yb006_biaoshuai)+'。';
					}
				},
				levelUpFilter:function(player){
					if(!player.storage.yb006_biaoshuaix)return true;
					return false;
				},
				levelUp:function(player){
					player.storage.yb006_biaoshuaix=true;
				},
				group:'yb006_biaoshuai_3',
				subSkill:{
					// 1:{
					// 	direct:true,
					// 	trigger:{player:'phaseBefore'},
					// 	filter:(event,player)=>{
					// 		if(!player.storage.yb006_biaoshuai) return false;
					// 		return true;
					// 	},
					// 	content:function(){
					// 		delete player.storage.yb006_biaoshuai;
					// 		player.unmarkSkill('yb006_biaoshuai');
					// 	},
					// 	//这段并没什么卵用，本人作废的片段罢了
					// },
					// 2:{
					// 	trigger:{player:['useCard','respond'],},
					// 	round:1,
					// 	filter:(event,player)=>{
					// 		var name=event.card.name;
					// 		return game.countPlayer(function(current){
					// 			if(current==player)return false;
					// 			if(current.storage.yb006_biaoshuai==name) return true;
					// 		}).length>0;
					// 	},
					// 	//这段仍然没什么卵用，本人作废的片段罢了
					// },
					3:{
						trigger:{global:['useCard','respond'],},
						filter:function(event,player){
							if(event.player.group!='YB_memory') return false;
							if(event.player.hasSkill('yb006_biaoshuai_4')) return false;
							var name=event.card.name;
							return player.hasZhuSkill('yb006_biaoshuai')&&event.player!=player&&name==player.storage.yb006_biaoshuai;
						},
						direct:true,
						content:function(){
							'step 0'
							if(player.storage.yb006_biaoshuaix){
								event.goto(3);
							}
							else{
								event.goto(1);
							}
							'step 1'
							var list=['是','cancel2'],str='是否令';
							str+=get.translation(player);
							str+='摸一张牌，然后你摸一张牌。'
							trigger.player.chooseControl(list).set('prompt','表率').set('prompt2',str).set('ai',function(control) {
								var att=get.attitude(_status.event.player,player);
								if(att>0) return '是';
								else return 'cancel2';
							});
							'step 2'
							if(result.control=='是'){
								trigger.player.addTempSkill('yb006_biaoshuai_4','roundStart');
								player.draw();
								trigger.player.draw();
							}
							event.finish();
							'step 3'
							var list=['是','cancel2'],str='是否摸一张牌';
							player.chooseControl(list).set('prompt','表率').set('prompt2',str).set('ai',function(control) {
								return '是';
							});
							'step 4'
							if(result.control=='是'){
								trigger.player.addTempSkill('yb006_biaoshuai_4','roundStart');
								player.draw();
								// trigger.player.draw();
							}
							else{
								event.finish();
							}
							'step 5'
							var list=['是','cancel2'],str='是否令';
							str+=get.translation(trigger.player);
							str+='摸一张牌。'
							player.chooseControl(list).set('prompt','表率').set('prompt2',str).set('ai',function(control) {
								var att=get.attitude(_status.event.player,trigger.player);
								if(att>0) return '是';
								else return 'cancel2';
							});
							'step 6'
							if(result.control=='是'){
								trigger.player.draw();
							}
						},
					},
					4:{onremove:true,},
				}
			},

			//----------------吴格格007
			// 'yb007_renqing':{
				// audio:'ext:夜白神略/audio/character:2',
			// },
			// 'yb007_shigu':{
				// audio:'ext:夜白神略/audio/character:2',
			// },
			// 'yb007_zhengling':{
				// audio:'ext:夜白神略/audio/character:2',
			// },
			yb007_chenwang:{
				audio:'ext:夜白神略/audio/character:2',
				//看在以往的情面，这次再宽限你一会
				//歪歪，你不会一点都没动吧
				enable:['chooseToUse'],
				usable:1,
				filter:function(event,player){
					if(player.countCards('hes')<=0)return false;
					var history=player.getAllHistory('useCard');
					if(history.length<1) return false;
					var evt=history[history.length-1];
					if(get.type(evt.card)=='equip')return false;
					if(event.filterCard({name:evt.card.name,isCard:true},player,event)) return true;
				},
				filterCard:function(card){
					return true;
				},
				check:function(card){
					return 7-get.value(card);
				},
				position:'hes',
				hiddenCard:function(player,name){
					var history=player.getAllHistory('useCard');
					if(history.length<1) return false;
					var evt=history[history.length-1];
					// game.log(evt.card.name,name)
					return name==evt.card.name;
				},
				viewAs:function(cards,player){
					var history=player.getAllHistory('useCard');
					if(history.length<1) return false;
					var evt=history[history.length-1];
					return {name:evt.card.name}
				},
				getLastUse:function(player){
					var history=player.getAllHistory('useCard');
					if(history.length<1) return false;
					var evt=history[history.length-1];
					return evt.card.name;
				},
				prompt:function(event,player){
					return '是否将一张牌当做'+get.translation(lib.skill.yb007_chenwang.getLastUse(_status.event.player))+'使用，然后摸一张牌'
				},
				selectCard:1,
				group:'yb007_chenwang_2',
				subSkill:{
					2:{
						trigger:{player:'useCardAfter'},
						audio:'yb007_chenwang',
						filter:function(event,player){
							return event.skill&&event.skill=='yb007_chenwang';
						},
						direct:true,
						content:function(){
							player.logSkill('yb007_chenwang')
							player.draw();
						},
					},
				},
				ai:{
					order:function(item,player){
						if(!player)var player=_status.event.player;
						var history=player.getAllHistory('useCard');
						if(history.length<1) return false;
						var evt=history[history.length-1];
						if(evt&&evt.card&&get.type(evt.card)!='equip'){
							var card=evt.card;
							var num=player.getUseValue({name:evt.card.name,nature:evt.card.nature})
							return num*2;
						}
						return 1;
					},//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
					result:{//主动技的收益
						player:function(player,target){
							return 1;
						},
					},
				},
			},
			//----------------吴雨欣
			'yb008_wucai':{
				inherit:'yb009_wucai',
				audio:'ext:夜白神略/audio/character:1',
			},
			'yb008_jianwu':{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				animationColor:'YB_snow',
				skillAnimation:true,
				filterCard:function(card){
					var suit=get.suit(card);
					for(var i=0;i<ui.selected.cards.length;i++){
						if(get.suit(ui.selected.cards[i])==suit) return false;
					}
					return true;
				},
				selectCard:[1,64],
				complexCard:true,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				selectTarget:function(){
					if(ui.selected.targets.length>ui.selected.cards.length){
						game.uncheck('target');
					}
					return ui.selected.cards.length;
				},
				content:function(){
					target.damage('nocard');
				},
				check:function(card){
					return 5-get.value(card);
				},
				position:'he',
				ai:{
					threaten:1.5,//嘲讽值
					damage:true,
					expose:1,//跳立场
					order:8,//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
					result:{//主动技的收益
						player:function(player,target){
							return 1;
						},
						target:function(player,target){
							return get.damageEffect(target,player);
						},
					},
				},
			},
			'yb008_zhenxin':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{player:'phaseJieshuBegin'},
				frequent:true,
				preHidden:true,
				content:function(){
					'step 0'
					event.num=1;
					'step 1'
					var suits=[];
					var history=game.getGlobalHistory('cardMove',function(evt){
						if(evt.player==player){
							if(evt.name=='lose'){
								for(var i of evt.cards) suits.add(get.suit(i,false));
							}
							else{
								if(evt.name=='cardsDiscard'){
									for(var i of evt.cards) suits.add(get.suit(i,false));
								}
							}
						}
					});
					event.num+=suits.length>2?2:suits.length;
					'step 2'
					player.draw(event.num);
				},
				ai:{
					threaten:1.1,//嘲讽值
				},
			},
			'yb008_wanyue':{
				inherit:'yb001_wanyue',
				audio:'ext:夜白神略/audio/character:2',
			},
			//-----------------李玉珊
			'yb009_wucai':{
				audio:'ext:夜白神略/audio/character:1',
				audioname2:{
					ybsl_003yanshuang:'yb003_wucai',
					ybsl_005wangruobing:'yb005_wucai',
					ybsl_008wuyuxin:'yb008_wucai',
					ybsl_010zhouyue:'yb010_wucai',
				},
				trigger:{
					player:'phaseDrawBegin2',
				},
				forced:true,
				preHidden:true,
				filter:function (event,player){
					return !event.numFixed;
				},
				content:function (){
					trigger.num++;
				},
				ai:{
					threaten:1.5,//嘲讽值
				},
				group:'yb009_wucai_luv',
				subSkill:{
					luv:{
						audio:'yb009_wucai',
						trigger:{
							player:'damageBegin4',
						},
						audioname2:{
							ybsl_003yanshuang:'yb003_wucai',
							ybsl_005wangruobing:'yb005_wucai',
							ybsl_008wuyuxin:'yb008_wucai',
							ybsl_010zhouyue:'yb010_wucai',
						},
						forced:true,
						filter:function (event,player){
							return player.hp>1;
						},
						content:function (){
							trigger.cancel();
							trigger.player.loseHp(trigger.num);
						},
						sub:true,
					},
				},
			},
			'yb009_tuling':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'loseHpEnd',
				},
				forced:true,
				preHidden:true,
				content:function (){
					'step 0'
					event.num=trigger.num*2;
					'step 1'
					player.changeHujia(event.num);
				},
				ai:{
					maihp:true,
				},
				mod:{
					maxHandcard:function (player,num){
						return num+player.hujia;
					},
				},
			},
			'yb009_tulinghuaqi':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:['phaseJudgeBegin','phaseDrawBegin','phaseUseBegin','phaseDiscardBegin'],
				},
				check:function (event,player){
					if(player.hp<=1)return false;
					if(player.hp==2&&!player.hasSkill('yb009_tuling'))return false;
					return true;
				},
				preHidden:true,
				content:function (){
					'step 0'
					player.loseHp(1);
					'step 1' 
					player.draw(2);
					game.log(player,'：后土所鉴，贞心一片！');
				},
				'prompt2':function(event,player){
					var str='现在是';
					if(event.name=='phaseJudge')str+='<span style=\'color:#e1ff00\'>判定</span>';
					if(event.name=='phaseDraw')str+='<span style=\'color:#e1ff00\'>摸牌</span>';
					if(event.name=='phaseUse')str+='<span style=\'color:#e1ff00\'>出牌</span>';
					if(event.name=='phaseDiscard')str+='<span style=\'color:#e1ff00\'>弃牌</span>';
					str+='阶段开始时，是否失去一点体力并摸两张牌？';
					return str;
				},
				init:function (player){
					player.addSkill('yb009_tulinghuaqi_add');
				},
				subSkill:{
					add:{
						audio:'ext:夜白神略/audio/character:2',
						trigger:{
							source:'damageBefore',
						},
						filter:function (event,player){
							return player.hujia;
						},
						check:function (event,player){
							var nm=player.hp+player.hujia;
							if(nm<=3)return false;
							return true;
						},
						content:function (){
							'step 0'
							player.changeHujia(-1);
							'step 1'
							trigger.num++;
							game.log(player,'：大地赐予我力量！');
						},
						sub:true,
						ai:{
							threaten:2,//嘲讽值
							effect:{//牌的影响
								player:function(card,player,target){//你使用牌时对你的影响
									if(card.name=="tao"){//如果使用的牌是桃
										return 1.1;//影响比一般人大点
									}
								},
								target:function(card,player,target){//你成为牌的目标时对你的影响
									if(get.tag(card,"damage")){//如果牌能造成伤害
										return 1.1;//影响比一般人大点
									}
								},
							},
						},
					},
				},
			},
			//----------------周玥
			'yb010_wucai':{
				inherit:'yb009_wucai',
				audio:'ext:夜白神略/audio/character:1',
			},
			'yb010_yeyu':{//夜语
				// preHidden:true,
				usable:1,
				audio:'ext:夜白神略/audio/character:2',
				// direct:true,
				trigger:{
					player:'damageAfter',
					source:'damageSource',
				},
				filter:function(event,player){
					if(event.player==player){var target=event.source;}
					else{var target=event.player;}
					return (event.source&&event.player&&player!=target&&target.isAlive()&&event.num>0);
				},
				content:function(){
					'step 0'
					if(trigger.player==player){event.target=trigger.source;}
					else{event.target=trigger.player;}
					'step 1'
					player.gainPlayerCard('h',2,event.target,true);
					'step 2'
					if(event.target.countCards('h')==0)event.target.draw(2);
				},
				ai:{
					expose:0.6,//跳立场
					maixie:true,
					maixie_hp:true,
					/*
					maixie_defend:function{
						
					},
					*/
					result:{
						player:function(player){
							return 2;
						},
					},
				},
			},
			'yb010_zheye':{
				inherit:'yb018_zheye',
				audio:'ext:夜白神略/audio/character:2',
			},
			'yb010_mingzhu':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:"damageBegin3",
				},
				audioname2:{
					ybsl_068qingyue:'yb068_mingzhu',
					ybsb_068qingyue:'yb068_mingzhu',
				},
				forced:true,
				filter:function(event,player){
					if(!player.isEmpty(5)) return false;
					if(event.hasNature()) return true;
					// if(event.nature) return true;
				},
				content:function (){
					trigger.cancel();
				},
				ai:{
					nofire:true,
					nothunder:true,
					effect:{
						target:function (card,player,target,current){
							if(player==target&&get.subtype(card)=='equip5'){
								if(get.equipValue(card)<=8) return 0;
							}
							if(!target.isEmpty(5)) return;
							if(get.tag(card,'natureDamage')) return 'zerotarget';
						},
					},
				},
			},
			//----------------高宇航
			'yb011_lijian':{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.countPlayer(function(current){
						return current!=player&&current.hasSex('male');
					})>1;
				},
				check:function(card){return 10-get.value(card)},
				filterCard:true,
				position:'he',
				filterTarget:function(card,player,target){
					if(player==target) return false;
					if(!target.hasSex('male')) return false;
					if(ui.selected.targets.length==1){
						return target.canUse({name:'juedou'},ui.selected.targets[0]);
					}
					return true;
				},
				targetprompt:['先出杀','后出杀'],
				selectTarget:2,
				multitarget:true,
				content:function(){
					targets[1].useCard({name:'juedou',isCard:true},'nowuxie',targets[0],'noai').animate=false;
					game.delay(0.5);
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(ui.selected.targets.length==0){
								return -3;
							}
							else{
								return get.effect(target,{name:'juedou'},ui.selected.targets[0],target);
							}
						}
					},
					expose:0.4,//跳立场
					threaten:3,//嘲讽值
				}
			},
			'yb011_jueleng':{
				preHidden:true,
				mark:true,
				audio:'yb011_jueleng_1',
				locked:false,
				zhuanhuanji:true,
				marktext:'☯',
				intro:{
					content:function(storage,player,skill){
						if(player.storage.yb011_jueleng==true) return '当场上角色受到伤害后，若<span class=yellowtext>受伤角色</span>为其他角色，则你可以与受伤角色各摸一张牌或各弃一张牌。';
						return '当场上角色受到伤害后，若<span class=firetext>伤害来源</span>为其他角色，则你可以与伤害来源各摸一张牌或各弃一张牌。';
					},
				},
				group:['yb011_jueleng_1','yb011_jueleng_3'],
				subSkill:{
					1:{
						audio:'ext:夜白神略/audio/character:2',
						trigger:{
							global:'damageEnd'
						},
						prompt2:function(event,player){
							var str='';
							str+='与其各摸一张牌或各弃一张牌？';
							return str;
						},
						filter:function(event,player){
							if(!player.storage.yb011_jueleng){var tar=event.source}
							else{var tar=event.player}
							if(tar)return tar!=player&&tar.isAlive();
						},
						logTarget:function (event,player){
							if(!player.storage.yb011_jueleng){var tar=event.source}
							else{var tar=event.player}
							if(tar)return tar;
						},
						content:function(){
							'step 0'
							if(!player.storage.yb011_jueleng){var tar=trigger.source,str='造成'}
							else{var tar=trigger.player,str='受到'}
							event.tar=tar;
							event.str=str;
							'step 1'
							var list=['各摸一张牌','各弃一张牌'];
							player.chooseControl(list).set('prompt',get.translation(event.tar)+event.str+'了伤害，请选择');
							'step 2'
							if(result.control=='各摸一张牌'){
								player.draw();
								event.tar.draw();
							}
							else{
								player.chooseToDiscard(true,'he');
								event.tar.chooseToDiscard(true,'he');
							}
							player.changeZhuanhuanji('yb011_jueleng');
							'step 3'
							game.delayx();
						},
					},
					3:{
						audio:'yb011_jueleng_1',
						trigger:{
							player:['damageBegin3','phaseJieshuBegin'],
						},
						content:function(){
							player.changeZhuanhuanji('yb011_jueleng');
						},
						check:function (event,player){
							if(!player.storage.yb011_jueleng)return false;
							return true;
						},
						prompt2:'结束阶段或当你受到伤害时，你可以改变此技能状态。',
					},
				},
			},
			//---------------郑佳怡
			yb012_bianqian:{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				selectCard:1,
				filterCard:true,
				position:'h',
				discard:false,
				loseCard:false,
				content:function(){
					player.addToExpansion(cards,player,'giveAuto').gaintag.add('yb012_bianqian');
				},
				intro:{
					markcount:"expansion",
					mark:function(dialog,content,player){
						var content=player.getExpansions('yb012_bianqian');
						if(content&&content.length){
							if(player==game.me||player.isUnderControl()){
								dialog.addAuto(content);
							}
							else{
								return '共有'+get.cnNumber(content.length)+'张小抄';
							}
						}
					},
					content:function(content,player){
						var content=player.getExpansions('yb012_bianqian');
						if(content&&content.length){
							if(player==game.me||player.isUnderControl()){
								return get.translation(content);
							}
							return '共有'+get.cnNumber(content.length)+'张小抄';
						}
					},
				},
				group:['yb012_bianqian_taoluan','yb012_bianqian_longhun'],
				subSkill:{
					taoluan:{
						audio:'yb012_bianqian',
						enable:'chooseToUse',
						name:'小抄',
						filter:function (event,player){
							var evt=lib.filter.filterCard;
							if(event.filterCard) evt=event.filterCard;
							for(var i of player.getExpansions('yb012_bianqian')){
								if(evt({name:i.name},player,event)) return true;
							};
							return false;
						},
						chooseButton:{
							dialog:function(event,player){
								var cards=player.getExpansions('yb012_bianqian');
								return ui.create.dialog('小抄',cards,'hidden');
							},
							filter:function (button,player){
								var card=button.link;
								return _status.event.getParent().filterCard({name:card.name},player,_status.event.getParent());
							},
							check:function (button){
								return _status.event.player.getUseValue({name:button.link[2],isCard:true});
							},
							backup:function(links,player){
								var skill=_status.event.buttoned;
								return {
									audio:'yb012_bianqian',
									// filterCard:function(){return false},
									viewAs:{
										name:links[0].name,
										nature:links[0].nature,
										// suit:links[0].suit,
										// number:links[0].number,
									},
									filterCard:()=>true,
									YBcard:links[0],
									selectCard:[0,1],
									position:'h',
									// check:function(event,player,card){
										// var cards=player.getExpansions('yb012_bianqian');
										// if(cards.length==1)return 0;
										// else return 10-get.value(card);
									// },
									card:()=>card?card:links[0],
									precontent:function(){
										if(event.result.cards&&event.result.cards[0]){
											player.discard(lib.skill.yb012_bianqian_taoluan_backup.YBcard)
										}
										else{
											var cardv=lib.skill.yb012_bianqian_taoluan_backup.YBcard;
											event.result.cards=cardv;
										}
									}
								}
							},
							prompt:function(links,player){
								return '小抄：选择 '+get.translation(links[0])+'的目标';
							}
						},
						hiddenCard:function (player,name){
							// var list=player.getExpansions('yb012_bianqian');
							// return list.contains(name);
							return true;
						},
						ai:{
							order:1,
							result:{
								player:function (player){
									if(_status.event.dying) return get.attitude(player,_status.event.dying);
									return 1;
								},
							},
							tag:{
								save:true,
							}
						},
					},
					longhun:{
						trigger:{player:'useCard'},
						forced:true,
						popup:false,
						filter:function(event){
							var evt=event;
							// return evt.skill=='yb012_bianqian_taoluan_backup'&&!event.cards.length;
							return evt.skill=='yb012_bianqian_taoluan_backup'&&event.cards[0]==lib.skill.yb012_bianqian_taoluan_backup.YBcard;
						},
						content:function(){
							player.discard(player.getExpansions('yb012_bianqian'))
						}
					},
				},
			},
			yb012_xibei:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'useCardAfter',
				},
				filter:function(event,player){
					if(event.player==player)return false;
					if(event.card.isCard&&event.cards.length==1){
						return get.position(event.cards[0],true)=='o';
					}
				},
				check:function(){return true},
				content:function*(event,map){
					let trigger=map.trigger,player=map.player;
					yield player.addToExpansion(trigger.cards,player,'giveAuto').gaintag.add('yb012_bianqian');
				},
				prompt2:function(event,player){
					return get.translation(event.player)+'使用了一张'+get.translation(event.card)+'，是否收录为小抄？';
				},
			},
			yb012_suotu:{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filterTarget: function (card, player, target) {
					return target != player && target.countCards("h") > 0;
				},
				content: function () {
					"step 0"
					if (!target.countCards("h") || !player.isIn()) event.finish();
					else player.choosePlayerCard(target, "h", true);
					"step 1"
					if (result.bool) {
						event.show_card = result.cards[0];
						var str = get.translation(player);
						player.showCards(event.show_card);
						target
							.chooseControl()
							.set("choiceList", [
								`令${str}获得${get.translation(event.show_card)}`,
								`受到${str}造成的1点伤害`,
							])
							.set("ai", function () {
								var evt = _status.event.getParent(),
									player = evt.target,
									source = evt.player,
									card = evt.show_card;
								if (get.damageEffect(player, source, player) > 0) return 1;
								if (get.attitude(player, source) * get.value(card, source) >= 0) return 0;
								if (card.name == "tao") return 1;
								return get.value(card, player) >
									6 + (Math.max(player.maxHp, 3) - player.hp) * 1.5
									? 1
									: 0;
							});
					} else event.finish();
					"step 2";
					if (result.index == 0) target.give(event.show_card, player);
					else target.damage();
				},
				ai: {
					order: 6,
					tag: {
						damage: 1,
						loseCard: 1,
						gain: 1,
					},
					result: {
						player: 0.1,
						target: -1.2,
					},
				},
			},
			// 'yb012_bianqian':'便签',
			// 'yb012_bianqian_info':'出牌阶段限一次，你可以将一张手牌盖在武将牌上称为“小抄”；
			// 你可以在合适的时机选择一张“小抄”，然后①使用此“小抄”，并弃置其余小抄②弃置此“小抄”，并将一张手牌当此”小抄”使用。',
			// 'yb012_xibei':'习备',
			// 'yb012_xibei_info':'场上其他角色使用非转化即时牌后，若此牌存在于弃牌堆中，你可以将之充入“小抄”。',
			// 'yb012_suotu':'索图',
			// 'yb012_suotu_info':'出牌阶段限一次，你可以选择一名有手牌的其他角色，你展示其一张手牌，令其选择：①令你获得此牌，②受到你造成的一点伤害。',
			//---------------尹姬
			yb013_shanwu:{
				audio:'ext:夜白神略/audio/character:1',
			},
			yb013_qingling:{
				audio:'ext:夜白神略/audio/character:1',
			},
			//神夜白的特定技能语音
			yb014_sanmeng:{
				audio:'ext:夜白神略/audio/character:1',
				inherit:'ybsl_sanmeng',
			},
			yb014_fufeng:{
				audio:'ext:夜白神略/audio/character:1',
			},
			yb014_yongyue:{
				audio:'ext:夜白神略/audio/character:2',
			},
			//----------------旅心
			'yb014_lvxin':{//---------旅心
				locked:false,
				mod:{
					aiOrder:function (player,card,num){
						if(typeof card=='object'&&player==_status.currentPhase){
							var evt=player.getLastUsed();
							if(evt&&evt.card&&get.type(evt.card)!='none'&&get.type(card)!='none'&&get.type(evt.card)!=get.type(card)){
								return num+10;
							}
						}
					},
				},
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'useCard',
				},
				audioname2:{
					'ybsl_033xiaohui':'yb033_lvxin',
					'ybsl_053qiuer':'yb053_lvxin',
					'ybsl_081chenli':'yb081_lvxin',
				},
				frequent:true,
				filter:function (event,player){
					var evt=player.getLastUsed(1);
					if(!evt) return false;
					var type1=get.type(evt.card);
					var type2=get.type(event.card);
					return type1&&type2&&type1!='none'&&type2!='none'&&type1!=type2;
				},
				content:function (){
					var evt=player.getLastUsed(1);
					if(!evt) return false;
					// if(!evet) return false;
					var type1=get.type(evt.card);
					var type2=get.type(trigger.card);
					if(type1&&type2&&
					  type1!='none'&&type2!='none'&&
					  type1!=type2
					){
						player.draw(num);
					}
				},
				ai:{
					threaten:2.5,//嘲讽值
				},
			},
			//----------------------SP本人
			'yb014_yingbian':{
				preHidden:true,
				groupSkill:true,
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				trigger:{
					player:'useCardAfter',
				},
				filter:function(event,player){
					return (event.card&&event.card.isCard&&(event.skill!='yb014_yingbian_1')&&(player.group=='YB_memory'||player.group=='ye'));
				},
				content:function(){
					var type=get.type(trigger.card);
					if(type=='basic'||type=='trick'){
						player.storage.suijiyingbian=trigger.card.name;
						player.storage.suijiyingbian_nature=trigger.card.nature;
					}
					player.storage.yb014_yingbian=get.type2(trigger.card);
					player.addTempSkill('yb014_yingbian_1',{player:'useCardBegin'});
				},
				subSkill:{
					1:{
						mod:{
							cardname:function(card,player){
								if(get.type2(card,false)==player.storage.yb014_yingbian&&player.storage.suijiyingbian) return player.storage.suijiyingbian;
							},
							cardnature:function(card,player){
								if(get.type2(card,false)==player.storage.yb014_yingbian&&player.storage.suijiyingbian_nature) return player.storage.suijiyingbian_nature;
							},
						},
						sub:true,
					},
				},
			},
			'yb014_yazhi':{
				preHidden:true,
				groupSkill:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{source:'damageBegin1'},
				forced:true,
				filter:function(event,player){
					return (player.group=='shen'||player.group=='ye');
				},
				content:function(){
					trigger.num++;
				},
				ai:{presha:true},
				group:['yb014_yazhi_1','yb014_yazhi_2'],
				subSkill:{
					1:{
						groupSkill:true,
						audio:'yb014_yazhi',
						trigger:{
							global:['dying'],
						},
						charlotte:true,
						forced:true,
						onremove:true,
						filter:function (event,player,name){
							return event.player.hp<1&&event.reason&&event.reason.name=='damage'&&event.source==player&&(player.group=='shen'||player.group=='ye');
						},
						content:function(){
							if(player.hp<player.maxHp){
								player.loseMaxHp();
							}
							else{
								player.loseHp();
							}
						},
					},
					2:{
						groupSkill:true,
						audio:'yb014_yazhi',
						trigger:{
							source:['die'],
						},
						filter:function(event,player){
							return (player.group=='shen'||player.group=='ye');
						},
						charlotte:true,
						forced:true,
						onremove:true,
						content:function(){
							player.chooseDrawRecover(2,true);
						},
					},
				},
				ai:{
					threaten:3,//嘲讽值
				},
			},
			//-------------------------神本人（逼格满满）----------------------------//
			'yb014_shizhui':{
				audio:'ext:夜白神略/audio/character:18',
				// audio:[/*'shiki_omusubi'*/'tianren'],
				trigger:{
					global:'roundStart',
				},
				mark:true,
				direct:true,
				content:function (){
					var kkk=[];
					if(lib.character[player.name]&&lib.character[player.name][3].contains('yb014_shizhui')) kkk.add([player.name]);
					if(lib.character[player.name1]&&lib.character[player.name1][3].contains('yb014_shizhui')) kkk.add([player.name1]);
					if(lib.character[player.name2]&&lib.character[player.name2][3].contains('yb014_shizhui')) kkk.add([player.name2]);
					if(!kkk.length)kkk.add([player.name]);
					if(!kkk.length)kkk.add([player.name1]);
					'step 0'
					player.chooseTarget(lib.filter.notMe).set(
						'prompt','<span class=yellowtext>游戏开始时或一轮游戏开始时，你可以减1点体力上限，然后将一名其他角色武将牌上的技能加入到你的武将牌上。</span>'
					).set('ai',function(target){
						var player=_status.event.player;
						if(player.isHealthy()) return 0;
						if(player.hp<3&&player.getDamagedHp()<2) return 0;
						var list=[];
						if(lib.character[target.name]) list.addArray(lib.character[target.name][3]);
						if(lib.character[target.name1]) list.addArray(lib.character[target.name1][3]);
						if(lib.character[target.name2]) list.addArray(lib.character[target.name2][3]);
						list=list.filter(function(i){
							return !player.hasSkill(i);
						});
						if(!list.length) return 0;
						return 1+Math.random();
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('yb014_shizhui',target);
						player.loseMaxHp();
						var list=[],liat=[];
						if(lib.character[target.name]){
							list.addArray(lib.character[target.name][3]);
							liat.add(target.name);
						}
						if(lib.character[target.name1]){
							list.addArray(lib.character[target.name1][3]);
							liat.add(target.name1);
						}
						if(lib.character[target.name2]){
							list.addArray(lib.character[target.name2][3]);
							liat.add(target.name2);
						}
						if(!player.storage.yb014_shizhui_character)player.storage.yb014_shizhui_character=[];
						player.storage.yb014_shizhui_character.addArray(liat)
						for(var j=0;j<list.length;j++){
							if(!player.hasSkill(list[j])){
								player.storage.yb014_shizhui_list.push(list[j]);
								player.addSkill(list[j]);
							}
						}
						game.broadcastAll(function(list){
							lib.character[kkk[0]][3].addArray(list);
							game.expandSkills(list);
							for(var i of list){
								var info=lib.skill[i];
								if(!info) continue;
								if(!info.audioname2) info.audioname2={};
								if(!info.audioname2[kkk[0]])info.audioname2[kkk[0]]='yb014_shizhui';
							}
						},list);
					}
				},
				init:function(player){
					player.storage.yb014_shizhui_list=[];
					player.storage.yb014_shizhui_delete=true;
					player.storage.yb014_shizhui_character=[];
				},
				group:[
					'yb014_shizhui_delete','yb014_shizhui_ent'
					//,'yb014_shizhui_reset'
				],
				subSkill:{
					delete:{
						audio:'yb014_shizhui',
						enable:'phaseUse',
						filter:function(event,player){
							//return player.storage.yb014_shizhui_reset!=true;
							return true;
						},
						// ai:{
						// 	order:3,
						// 	result:{//主动技的收益
						// 		player:function(player,target){
						// 			if(player.countCards('h')<4) return 4-player.countCards('h');
						// 			return 2-player.hp;
						// 		},
						// 	},
						// },
						direct:true,
						// check:function(event,player){
						// 	// var player=_status.event.player;
						// 	if(player.hp<2)return true;
						// 	if(player.countCards('h')<=1) return true;
						// 	return false;
						// },
						zhuanhuanSkill:true,
						content:function(){
							'step 0'
							var list=player.storage.yb014_shizhui_list;
							var num=8;
							var str='<span class=yellowtext>出牌阶段，你可以删除一个以此法获得的技能，然后摸三张牌，并</span>'
							if(player.storage.yb014_shizhui_delete==true){str+='<span class=yellowtext>回复一点体力。</span>';}
							else{str+='<span class=yellowtext>增加一点体力上限。</span>';}
							player.YB_control(list,num,str);
							'step 1'
							if(result.control=='cancel2'){
								event.finish();
							}
							else{
								player.removeSkill(result.control);
								player.storage.yb014_shizhui_list.remove(result.control);
								player.logSkill('yb014_shizhui');
								game.log(player,'删除了',result.control);
								//player.storage.yb014_shizhui_reset=true;
								player.draw(3);
								event.yy=true;
							}
							'step 2'
							if(event.yy==true){
								if(player.storage.yb014_shizhui_delete==true){
									player.storage.yb014_shizhui_delete=false;
									player.recover();
								}
								else{
									player.storage.yb014_shizhui_delete=true;
									player.gainMaxHp();
								}
							}
						},
					},
					ent:{
						trigger:{
							global:['phaseBefore','enterGame'],
							player:'enterGame',
						},
						filter:function (event,player){
							return (event.name!='phase'||game.phaseNumber==0);
						},
						direct:true,
						content:()=>{player.useSkill('yb014_shizhui');},
					}
					/*reset:{
						direct:true,
						forced:true,
						trigger:{
							player:['phaseUseBefore','phaseUseAfter'],
						},
						content:function(){
							player.storage.yb014_shizhui_reset=false;
						}
					},*/
				},
				intro:{
					name:'诗追',
					// content:function(event,player,storage,name,skill){
						// var str='已学习了';
						// str+=get.translation(player.storage.yb014_shizhui_list);
						// if(player.storage.yb014_shizhui_delete==true){
							// str+='<br>本次删除技能回复一点体力';
						// }
						// else{
							// str+='<br>本次删除技能增加一点体力上限';
						// }
						// return str;
					// },
					mark:function(dialog,storage,player){
						if(player.storage.yb014_shizhui_character){
							var list=player.storage.yb014_shizhui_character;
							dialog.addText('学习过了这些角色');
							dialog.addSmall([list,'character']);
						}
						var str='已学习了';
						str+=get.translation(player.storage.yb014_shizhui_list);
						if(player.storage.yb014_shizhui_delete==true){
							str+='<br>本次删除技能回复一点体力';
						}
						else{
							str+='<br>本次删除技能增加一点体力上限';
						}
						dialog.addText(str);
					}
				},
				ai:{
					threaten:2.2,//嘲讽值
				}
			},
			//----------------新满城柒
			'yb016_shenzou':{
				audio:'ext:夜白神略/audio/character:2',
				enable:"phaseUse",
				usable:1,
				content:function(){
					'step 0'
					player.chooseToPlayBeatmap(lib.skill.yb016_shenzou.beatmaps.randomGet());
					'step 1'
					var score=Math.floor(Math.min(5,result.accuracy/17));
					event.score=score;
					game.log(player,'的演奏评级为','#y'+result.rank[0],'，获得积分点数','#y'+score,'分');
					var list2=lib.skill.yb016_juli.getInfo(player);
					var num=Math.min(list2[0],list2[1],2)
					if(score<num){
						event.finish();
						return;
					}
					'step 2'
					var list=[];
					var list2=lib.skill.yb016_juli.getInfo(player);
					if(event.score>=list2[0])list.push('增加最大重铸数['+list2[0]+']');
					if(event.score>=list2[1])list.push('增加技能囊括范围['+list2[1]+']');//暂时的限制方法为禁止加点这项
					if(event.score>=5&&!player.storage.yb016_juli_add)list.push('将【杀】改为伤害牌');
					if(event.score>=2)list.push('全部摸牌');
					event.list4=list;
					if(list.length){
						var str='神奏：还剩'+event.score+'分，';
						for(var i=0;i<list.length;i++){
							str+=list[i];
							if(i<list.length-1)str+='，还是'
						}
						player.chooseControl(list).set('prompt',str);
					}
					else event._result={control:'全部摸牌'};
					'step 3'
					var score=event.score;
					var list6=lib.skill.yb016_juli.getInfo(player);
					if(result.control=='全部摸牌'){
						if(score>1) player.draw(Math.floor(score/2));
						event.finish();
					}
					else if(result.control=='将【杀】改为伤害牌'){
						// if(score>1) player.draw(Math.floor(score/2));
						player.storage.yb016_juli_add=true;
						event.finish();
					}
					else {
						if(result.control=='增加最大重铸数['+list6[0]+']'){
							event.score-=list6[0];
							player.storage.yb016_juli[0]++;
							if(event.score>0){
								event.goto(2);
							}
							else event.finish();
						}else if(result.control=='增加技能囊括范围['+list6[1]+']'){
							event.score-=list6[1];
							player.storage.yb016_juli[1]++;
							if(event.score>0){
								event.goto(2);
							}
							else event.finish();
						}
					}
				},
				ai:{
					order:10,
					result:{
						player:1,
					},
				},
				beatmaps:[
					{
						//歌曲名称
						name:'鳥の詩',
						//歌曲文件名（默认在audio/effect文件夹下 若要重定向到扩展 请写为'ext:扩展名称'的格式 并将文件名重命名为和上面的歌曲名称相同）
						filename:'tori_no_uta',
						//每个音符的开始时间点（毫秒，相对未偏移的开始播放时间）
						timeleap:[1047,3012,4978,5469,5961,6452,6698,7435,8909,10875,12840],
						//开始播放时间的偏移量（毫秒）
						current:-110,
						//判定栏高度（相对整个对话框高度比例）
						judgebar_height:0.16,
						//Good/Great/Prefect的位置判定范围（百分比，相对于整个对话框。以滑条的底部作为判定基准）
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						//滑条每相对于整个对话框下落1%所需的时间（毫秒）
						speed:25,
					},
					{
						name:'竹取飛翔　～ Lunatic Princess',
						filename:'taketori_hishou',
						timeleap:[1021,1490,1959,2896,3834,4537,4771,5709,6646,7585,8039,8494,9403,10291,11180,11832,12049,12920,13345,13771,14196],
						current:-110,
						judgebar_height:0.16,
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						speed:25,
						node_color:'linear-gradient(rgba(250, 170, 190, 1), rgba(240, 160, 180, 1))',
						judgebar_color:'linear-gradient(rgba(240, 120, 243, 1), rgba(245, 106, 230, 1))',
					},
					{
						name:'ignotus',
						filename:'ignotus',
						//Number of tracks
						//轨道数量
						number_of_tracks:4,
						//Customize the track to generate for every note (0 is the first track)
						//自定义每个音符生成的轨道（0是第一个轨道）
						mapping:[0,2,3,1,1,0,3,0,0,3,0,0,2,1,2],
						//Convert from beats (0 is the first beat) to timeleap
						//将节拍（0是第一拍）转换为开始时间点
						timeleap:game.generateBeatmapTimeleap(170,[0,4,8,12,14,16,16.5,23.5,24,31,32,40,45,46,47]),
						current:-110,
						judgebar_height:0.16,
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						speed:25,
						node_color:'linear-gradient(rgba(240, 250, 240, 1), rgba(230, 240, 230, 1))',
						judgebar_color:'linear-gradient(rgba(161, 59, 150, 1), rgba(58, 43, 74, 1))',
					},
					{
						name:'Super Mario 3D World Theme',
						filename:'sm3dw_overworld',
						//Random (Randomly choose tracks to generate notes each play)
						//随机（每次演奏时音符会随机选择轨道生成）
						mapping:'random',
						timeleap:[0,1071,1518,2054,4018,4286,5357,6429,7500,8571,9643,10714,11786,12321,12589,12857,13929,15000,16071,17143,18214,18482,18750,19018,19286,20357],
						current:-110,
						judgebar_height:0.16,
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						speed:25,
						node_color:'linear-gradient(rgba(120, 130, 240, 1), rgba(100, 100, 230, 1))',
						judgebar_color:'linear-gradient(rgba(230, 40, 30, 1), rgba(220, 30, 10, 1))',
					},
					{
						name:'只因你太美',
						filename:'chicken_you_are_so_beautiful',
						number_of_tracks:7,
						mapping:[3,6,4,5,6,2,3,2,1,2,0,4,3,6,5,4,3,6,3,2,3,1,0,1,2,3,4,5,6],
						timeleap:game.generateBeatmapTimeleap(107,[2,3.5,4.5,5.5,6.5,8.5,10,11.5,12.5,13.5,14.5,15.5,18,19.5,20.5,21.5,22.5,24.5,26,27.5,28.5,29.5,30.5,31,31.5,32,32.5,33,33.5]),
						//Hitsound file name (By default in the audio/effect folder. To redirect to the extension, please write in the format of 'ext:extension_name')
						//打击音文件名（默认在audio/effect文件夹下 若要重定向到扩展 请写为'ext:扩展名称'的格式）
						hitsound:'chickun.wav',
						current:-110,
						judgebar_height:0.16,
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						speed:25,
						node_color:'linear-gradient(#99f, #66c)',
						judgebar_color:'linear-gradient(#ccf, #99c)',
					},
					{
						name:'Croatian Rhapsody',
						filename:'croatian_rhapsody',
						mapping:[4,1,2,1,0,0,4,5,1,3,2,1,0,0],
						timeleap:game.generateBeatmapTimeleap(96,[4,6,8,9,10,11,12,13.5,14,15.5,16,17,18,19]),
						current:-110,
						judgebar_height:0.16,
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						speed:25,
						node_color:'linear-gradient(#fff, #ccc)',
						judgebar_color:'linear-gradient(#fff, #ccc)',
					},
					{
						name:'罗刹海市',
						filename:'rakshasa_sea_city',
						number_of_tracks:7,
						mapping:'random',
						timeleap:game.generateBeatmapTimeleap(150,[0,2,4,6,7,9,11,13,14,16,18,20,21,23,25,27]),
						current:-110,
						judgebar_height:0.16,
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						speed:25,
						node_color:'linear-gradient(#333, #000)',
						judgebar_color:'linear-gradient(#c66, #933)',
					},
					{
						name:'Pigstep (Stereo Mix)',
						filename:'pigstep',
						number_of_tracks:16,
						timeleap:game.generateBeatmapTimeleap(170,[3,4,6,6.5,7.5,11,12,14,14.5,15.5,19,20,22,22.5,23.5,27,28,30,30.5,31.5,35,36,38,38.5,39.5,43,44,46,46.5,47.5,51,52,54,54.5,55.5,59,60,62,62.5]),
						current:-110,
						judgebar_height:0.16,
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						speed:25,
						node_color:'linear-gradient(#066, #033)',
						judgebar_color:'linear-gradient(#633, #300)',
					},
				],
				derivation:"chongxu_faq",
			},
			'yb016_juli':{
				audio:'ext:夜白神略/audio/character:2',
				init:function(player){
					if(!player.storage.yb016_juli) player.storage.yb016_juli=[1,1];
				},
				getInfo:function(player){
					if(!player.storage.yb016_juli) player.storage.yb016_juli=[1,1];
					return player.storage.yb016_juli;
				},
				direct:true,
				trigger:{
					target:'useCardToTargeted',
				},
				filter:function(event,player){
					if(event.player==event.target)return false;
					var list=lib.skill.yb016_juli.getInfo(player);
					// if(event.player.hasMark('yb033_shuhui_mark')) return true;
					if(!event.player.isIn()||get.distance(player,event.target)>list[1])return false;
					if(player.storage.yb016_juli_add==true){
						return get.tag(event.card,'damage');
					}
					else return event.card.name=='sha';
				},
				content:function(){
					'step 0'
					event.list=lib.skill.yb016_juli.getInfo(player);
					if(trigger.target==player){
						event._result={bool:true};
					}
					else{
						player.chooseBool('是否令'+get.translation(trigger.target)+'选择是否重铸牌，以此令'+get.translation(trigger.card)+'有几率对其无效？').set('ai',function(){
							var att=get.attitude(_status.event.player,trigger.target);
							var bool=_status.event.bool;
							if(att>0) return bool;
							else return !bool;
						}).set('bool',bool);
					}
					'step 1'
					if(result.bool){
						player.chooseCard('he',[1,event.list[0]]).set('prompt',get.prompt2('yb016_juli')).set('ai',function(card){
							return 6-get.value(card);
						});
					}
					else event.finish();
					'step 2'
					if(result.cards){
						event.cards=result.cards;
						player.recast(event.cards);
					}
					else event.finish();
					'step 3'
					event.list2=[];
					for(var i of event.cards){
						var type=get.type2(i);
						if(!event.list2.contains(type)) event.list2.push(type);
					}
					var eff=get.effect(player,trigger.card,trigger.player,trigger.player);
					var list3=get.YB_tobo(event.list2);
					trigger.player.chooseToDiscard(1,'he',function(card){
						return event.list2.contains(get.type2(card));
					}).set('prompt','请弃置一张牌，且牌的类型必须在【'+list3+'】之中。').set('ai',function(card){
						if(_status.event.eff>0){
							return 10-get.value(card);
						}
						return 0;
					}).set('eff',eff);
					'step 4'
					if(!result.cards){
						trigger.getParent().excluded.add(player);
					}
				}
			},
			//----------------------SP满城柒
			'yb016_xianyue':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'recoverAfter',
				},
				direct:true,
				preHidden:true,
				check:function (player,cards){
					if(player.countCards('he')>2) return true;
				},
				content:function (){
					'step 0'
					player.chooseToDiscard('he',get.prompt2('yb016_xianyue',trigger.player)).set('ai',function(card){
						return 8-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.judge();
					}
					else{
						event.finish();
					}
					'step 2'
					event.suit=result.suit;
					if(event.suit=='heart'){
						player.recover()
					};
					if(event.suit=='diamond'){
						player.draw(2)
					};
					if(event.suit=='spade'){
						player.chooseTarget(get.prompt('yb016_xianyue'),'令一名角色流失一点体力').set('ai',function(target){
							var player=_status.event.player;
							var att=get.attitude(player,target);
							if(att<0){
								att=-Math.sqrt(-att);
							}
							else{
								att=Math.sqrt(att);
							}
							return att*lib.card.guohe.ai.result.target(player,target);
						})
					};
					if(event.suit=='club'){
						player.chooseTarget('弃置一名角色两张牌',function(card,player,target){
							return target.countCards('he');
						}).set('ai',function(target){
							var player=_status.event.player;
							var att=get.attitude(player,target);
							if(att<0){
								att=-Math.sqrt(-att);
							}
							else{
								att=Math.sqrt(att);
							}
							return att*lib.card.guohe.ai.result.target(player,target);
						})
					};
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						if(event.suit=='spade'){
							player.logSkill('yb016_xianyue',target);
							target.loseHp();
						}
						if(event.suit=='club'){
							player.discardPlayerCard(target,'he',2,true);
						};
					}
				},
				ai:{
					result:{
						player:2,
					},
				},
			},
			'yb016_tianliao':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'recoverBefore',
				},
				direct:true,
				preHidden:true,
				check:function (event,player,cards){
					var ys=player.maxHp-player.hp;
					if(event.num==ys-1)return false;
					if(player.countCards('he')>2) return true;
				},
				content:function (){
					'step 0'
					player.chooseToDiscard('he',get.prompt2('yb016_tianliao',trigger.player)).set('ai',function(card){
						return 8-get.value(card);
					});
					'step 1'
					if(result.bool){
						trigger.num++;
						player.logSkill('yb016_tianliao')
					}
					else{
						event.finish();
					}
				},
				ai:{
					result:{
						player:3,
					},
					effect:{
						player:function (card,player,target){//你使用牌时对你的影响
							if(card.name=='tao'){//如果使用的牌是桃
								return 1.3;//影响比一般人大点
							}
						},
						target:function (card,player,target){//你成为牌的目标时对你的影响
							if(get.tag(card,'damage')){//如果牌能造成伤害
								if(player.hasSkillTag('jueqing',false,target))return [1,-1];
								return 0.7;//影响比一般人大点
							}
						},
					},
				},
			},
			'yb016_qingjie':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'damageEnd',
				},
				forced:true,
				content:function (){
					'step 0'
					event.num=trigger.num;
					player.recover(event.num);
					'step 1'
					player.loseHp(event.num);
				},
				ai:{
					maixie:true,
					'maixie_hp':true,
				},
			},
			'yb016_pojie':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'recoverBegin',
				},
				forced:true,
				filter:function (event,player){
					event.ys=player.maxHp-player.hp;
					event.zl=event.num;
					if(event.ys<event.zl)
						return event.yc=event.zl-event.ys;
				},
				content:function (){
					'step 0'
					trigger.num-=trigger.yc;
					'step 1'
					player.gainMaxHp(trigger.yc);
					player.draw(trigger.yc);
				},
			},
			//--------------新小红
			'yb017_chuanxin':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:"phaseJieshuBegin",
				},
				forced:true,
				filter:function(event,player){
					return event.player.getHistory('useCard',function(card){
						// return get.type(card.card)!='equip'&&get.type(card.card)!='delay';
						return true;
					}).length>0;
				},
				content:function(){
					'step 0'
					var list=[];
					var list1=[];
					trigger.player.getHistory('useCard',function(evt){
						if(get.type(evt.card)=='equip'||get.type(evt.card)=='delay') return;
						var name=evt.card.name;
						var nature=evt.card.nature;
						var name2;
						if(name=='sha'){
							if(nature){
								switch(nature){
									case 'fire':name2='huosha';break;
									case 'thunder':name2='leisha';break;
									case 'kami':name2='kamisha';break;
									case 'ice':name2='icesha';break;
									case 'stab':name2='cisha';break;
									default :name2=(nature+'sha');break;
								}
							}
						}
						var name3=(name2||name);
						if(!list1.contains(name3)){
							list.add(['传信','',name,nature]);
							list1.add(name3);
						}
					});
					player.chooseButton(['传信：选择要使用的牌，或点取消摸一张牌',[list,'vcard']],function(button){
						return _status.event.player.getUseValue({name:button.link[2],nature:button.link[3]});
					},function(button){
						return _status.event.player.hasUseTarget({name:button.link[2],nature:button.link[3]});
					});
					// trigger.player.getHistory('useCard',function(evt){
					// 	if(get.type(evt.card)=='equip'||get.type(evt.card)=='delay') return;
					// 	var name=evt.card.name;
					// 	if(name=='sha'){
					// 		var nature=evt.card.nature;
					// 		switch(nature){
					// 			case 'fire':name='huosha';break;
					// 			case 'thunder':name='leisha';break;
					// 			case 'kami':name='kamisha';break;
					// 			case 'ice':name='icesha';break;
					// 			case 'stab':name='cisha';break;
					// 			case 'YB_snow':name='YB_snowsha';break;
					// 			case 'YB_blood':name='YB_bloodsha';break;
					// 		}
					// 	}
					// 	list.add(name);
					// });
					// player.chooseButton(['传信：选择要使用的牌，或点取消摸一张牌',[list.map(function(name){
					// 	return ['传信','',name];
					// }),'vcard']],function(button){
					// 	return _status.event.player.getUseValue({name:button.link[2],nature:button.link[3]});
					// },function(button){
					// 	return _status.event.player.hasUseTarget({name:button.link[2],nature:button.link[3]});
					// });
					'step 1'
					if(!result.bool) player.draw();
					else player.chooseUseTarget({name:result.links[0][2],isCard:true,nature:result.links[0][3]},false);
				},
			},
			'yb017_zuigui':{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				trigger:{
					player:'phaseDiscardBegin',
				},
				content:function(){
					player.chooseUseTarget({name:'jiu',isCard:true},true,false);
				},
				group:['yb017_zuigui_jiu','yb017_zuigui_jiu2','yb017_zuigui_jiu3'],
				subSkill:{
					jiu:{
						trigger:{player:'jiuBegin'},
						forced:true,
						filter:function(event,player){
							return event.getParent().name=='useCard';
						},
						content:function(){
							trigger.setContent(lib.skill.yb017_zuigui_jiu.jiuContent);
						},
						jiuContent:function(){
							if(typeof event.baseDamage!='number') event.baseDamage=1;
							// if(target.isDamaged()){
								target.recover(event.baseDamage);
								// if(_status.currentPhase==target){
									target.getStat().card.jiu--;
								// }
							// }
							game.addVideo('jiuNode',target,true);
							if(cards&&cards.length){
								card=cards[0];
							}
							if(!target.storage.jiu) target.storage.jiu=0;
							target.storage.jiu+=event.baseDamage;
							game.broadcastAll(function(target,card,gain2){
								target.addSkill('jiu');
								if(!target.node.jiu&&lib.config.jiu_effect){
									target.node.jiu=ui.create.div('.playerjiu',target.node.avatar);
									target.node.jiu2=ui.create.div('.playerjiu',target.node.avatar2);
								}
								if(gain2&&card.clone&&(card.clone.parentNode==target.parentNode||card.clone.parentNode==ui.arena)){
									card.clone.moveDelete(target);
								}
							},target,card,target==targets[0]&&cards.length==1);
							if(target==targets[0]&&cards.length==1){
								if(card.clone&&(card.clone.parentNode==target.parentNode||card.clone.parentNode==ui.arena)){
									game.addVideo('gain2',target,get.cardsInfo([card]));
								}
							}
						},
					},
					jiu3:{
						trigger:{player:'useCard1'},
						filter:function(event,player){
							if(!player.hasSkill('jiu'))return false;
							return event.card&&event.card.name!='sha'&&get.tag(event.card,'damage')>0;
						},
						forced:true,
						charlotte:true,
						firstDo:true,
						content:function(){
							if(!trigger.baseDamage) trigger.baseDamage=1;
							trigger.baseDamage+=player.storage.jiu;
							trigger.jiu=true;
							trigger.jiu_add=player.storage.jiu;
							game.addVideo('jiuNode',player,false);
							game.broadcastAll(function(player){
								player.removeSkill('jiu');
							},player);
						},
						temp:true,
						vanish:true,
						silent:true,
						popup:false,
						nopop:true,
						onremove:function(player){
							if(player.node.jiu){
								player.node.jiu.delete();
								player.node.jiu2.delete();
								delete player.node.jiu;
								delete player.node.jiu2;
							}
							delete player.storage.jiu;
						},
						ai:{
							damageBonus:true
						},
					},
					jiu2:{
						trigger:{player:'useCardAfter',global:'phaseAfter'},
						priority:2,
						firstDo:true,
						charlotte:true,
						filter:function(event,player){
							if(!player.hasSkill('jiu'))return false;
							if(player.hasSkillTag('jiuSustain',null,event.name)) return false;
							if(event.name=='useCard') return (event.card&&event.card.name!='sha'&&(get.tag(event.card,'damage')>0));
							return true;
						},
						forced:true,
						popup:false,
						audio:false,
						content:function(){
							game.broadcastAll(function(player){
								player.removeSkill('jiu');
							},player);
							game.addVideo('jiuNode',player,false);
						},
					},
				}
			},
			//-----------------神小红
			'yb017_mizhu':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				locked:false,
				filter:function (event,player){
					return (event.name!='phase'||game.phaseNumber==0)&&!lib.inpile.contains('ybsl_lumingqianzhuan');
				},
				content:function (){
					game.addGlobalSkill('yb017_mizhu_global');
					for(var i=2;i<10;i++){
						var card=game.createCard2('ybsl_lumingqianzhuan',i%2?'club':'spade',i);
						ui.cardPile.insertBefore(card,ui.cardPile.childNodes[get.rand(0,ui.cardPile.childNodes.length)]);
					}
					game.broadcastAll(function(){lib.inpile.add('ybsl_lumingqianzhuan')});
					game.updateRoundNumber();
				},
				group:['yb017_mizhu_remove','yb017_mizhu_rewrite'],
				derivation:'ybsl_lumingqianzhuan',
				subSkill:{
					remove:{
						audio:2,
						trigger:{
							target:'useCardToBefore',
						},
						forced:true,
						priority:15,
						filter:function (event,player){
							return event.card&&event.card.name=='ybsl_lumingqianzhuan';
						},
						content:function (){
							trigger.cancel();
						},
						ai:{
							target:function (card,player,target){
								if(card&&card.name=='ybsl_lumingqianzhuan') return 'zerotarget';
							},
						},
						sub:true,
					},
					global:{
						trigger:{
							player:'useCardToPlayered',
						},
						forced:true,
						popup:false,
						filter:function (event,player){
							return event.card.name=='ybsl_lumingqianzhuan';
						},
						content:function (){
							'step 0'
							var target=trigger.target;
							event.target=target;
							player.chooseControl('喜啼','悲鸣').set('prompt','请选择'+get.translation(target)+'的标记').set('choice',function(){
								var e1=1.5*get.sgn(get.damageEffect(target,player,target));
								var e2=0;
								if(target.countGainableCards(player,'h')>0&&!target.hasSkillTag('noh')) e2=-1;
								var es=target.getGainableCards(player,'e');
								if(es.length) e2=Math.min(e2,function(){
									var max=0;
									for(var i of es) max=Math.max(max,get.value(i,target))
									return -max/4;
								}());
								if(Math.abs(e1-e2)<=0.3) return Math.random()<0.5?'喜啼':'悲鸣';
								if(e1<e2) return '喜啼';
								return '悲鸣';
							}()).set('ai',function(){
								return _status.event.choice;
							});
							'step 1'
							var map=trigger.getParent().customArgs,id=target.playerid;
							if(!map[id]) map[id]={};
							map[id].ybsl_luming_name=result.control;
						},
						sub:true,
					},
					rewrite:{
						audio:'yb017_mizhu',
						trigger:{
							global:'useCardToTargeted',
						},
						filter:function (event,player){
							return event.card.name=='ybsl_lumingqianzhuan';
						},
						logTarget:'target',
						'prompt2':'观看其手牌并修改“鹿鸣千转”标记',
						content:function (){
							'step 0'
							var target=trigger.target;
							event.target=target;
							if(player!=target&&target.countCards('h')>0) player.viewHandcards(target);
							player.chooseControl('喜啼','悲鸣').set('prompt','请选择'+get.translation(target)+'的标记').set('choice',function(){
								var shas=target.getCards('h','sha'),shans=target.getCards('h','shan');
								var e1=1.5*get.sgn(get.damageEffect(target,player,target));
								var e2=0;
								if(target.countGainableCards(player,'h')>0&&!target.hasSkillTag('noh')) e2=-1;
								var es=target.getGainableCards(player,'e');
								if(es.length) e2=Math.min(e2,function(){
									var max=0;
									for(var i of es) max=Math.max(max,get.value(i,target))
									return -max/4;
								}());
								if(get.attitude(player,target)>0){
									if(shas.length>=Math.max(1,shans.length)) return '喜啼';
									if(shans.length>shas.length) return '悲鸣';
									return e1>e2?'喜啼':'悲鸣';
								}
								if(shas.length) e1=-0.5;
								if(shans.length) e2=-0.7;
								if(Math.abs(e1-e2)<=0.3) return Math.random()<0.5?'喜啼':'悲鸣';
								var rand=Math.random();
								if(e1<e2) return rand<0.1?'喜啼':'悲鸣';
								return rand<0.1?'悲鸣':'喜啼';
							}()).set('ai',()=>(_status.event.choice));
							'step 1'
							var map=trigger.getParent().customArgs,id=target.playerid;
							if(!map[id]) map[id]={};
							map[id].ybsl_luming_name=result.control;
							map[id].ybsl_luming_aibuff=get.attitude(player,target)>0;
						},
						sub:true,
						'audioname2':{
							
						},
					},
				},
			},
			'yb017_guangzhu':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'useCard',
				},
				forced:true,
				filter:function (event,player){		
					return (event.card.name=='ybsl_lumingqianzhuan'||get.zhinangs().contains(event.card.name)||player.getStorage('yb017_zhenshi').contains(event.card.name))&&event.card.isCard&&event.cards.length==1;
				},
				content:function (){player.draw()},
			},
			'yb017_zhenshi':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					target:'useCardToTarget',
				},
				forced:true,
				filter:function (event,player){
					return get.type2(event.card)=='trick'&&!player.getStorage('yb017_zhenshi').contains(event.card.name);
				},
				content:function (){
					player.markAuto('yb017_zhenshi',[trigger.card.name]);
					trigger.targets.remove(player);
					trigger.getParent().triggeredTargets2.remove(player);
					trigger.untrigger();
				},
				onremove:true,
				intro:{
					content:'已记录牌名：$',
				},
				group:'yb017_zhenshi_add',
				subSkill:{
					add:{
						trigger:{
							player:'phaseBegin',
						},
						direct:true,
						content:function (){
							'step 0'
							var dialog=
							[get.prompt('yb017_zhenshi')];list1=player.getStorage('yb017_zhenshi'),list2=lib.inpile.filter(function(i){
								return get.type2(i,false)=='trick'&&!list1.contains(i);
							});
							if(list1.length){
								dialog.push('<div class="text center">已记录</div>');
								dialog.push([list1,'vcard']);
							}
							if(list2.length){
								dialog.push('<div class="text center">未记录</div>');
								dialog.push([list2,'vcard']);
							}
							player.chooseButton(dialog).set('ai',function(button){
								var player=_status.event.player,name=button.link[2];
								if(player.getStorage('yb017_zhenshi').contains(name)){
									return -get.effect(player,{name:name},player,player);
								}
								else{
									return get.effect(player,{name:name},player,player)*(1+player.countCards('hs',name));
								}
							});
							'step 1'
							if(result.bool){
								player.logSkill('yb017_zhenshi');
								var name=result.links[0][2];
								if(player.getStorage('yb017_zhenshi').contains(name)){
									player.unmarkAuto('yb017_zhenshi',[name]);
									game.log(player,'从贞侍记录中移除了','#y'+get.translation(name));
								}
								else{
									player.markAuto('yb017_zhenshi',[name]);
									game.log(player,'向贞侍记录中添加了','#y'+get.translation(name));
								}
								game.delayx();
							}
						},
						sub:true,
						'audioname2':{
							
						},
					},
				},
			},
			//-----------------------张晴
			'yb018_huaimeng':{
				audio:'ext:夜白神略/audio/character:2',
				marktext:'梦',
				unique:true,
				trigger:{
					global:'roundStart',
				},
				forced:true,
				content:function (){
					'step 0'
					player.chooseControl(lib.suit).set('prompt','怀梦：请选择一种花色，接下来这轮因此花色获得的梦改为三枚').set('ai',function(event){
						switch(Math.floor(Math.random()*8)){
							case 0:case 6:case 3:return 'heart';
							case 1:case 4:case 5:return 'diamond';
							case 2:return 'club';
							case 7:return 'spade';
						}
					});
					'step 1'
					player.storage.YB_memorysuit=result.control;
					player.popup(player.storage.YB_memorysuit+2);
					game.log(player,'铭记了',player.storage.YB_memorysuit+2);
				},
				init:function (player,skill){
					player.addMark('yb018_huaimeng',5);
				},
				intro:{
					name:'梦',
					content:function (storage,player){
						var str='<li>纪念着';
						str+=get.translation(player.countMark('yb018_huaimeng'));
						str+='段过往<br><li>印象最深刻的是';
						str+=get.translation(player.storage.YB_memorysuit);
						str+='<br><li>这次已梦见';
						str+=get.translation(player.storage.losesuit);
						return str;
					},
				},
				group:['yb018_huaimeng_2','yb018_huaimeng_3'],
				subSkill:{
					2:{
						direct:true,
						forced:true,
						trigger:{
							global:'phaseBefore',
						},
						content:function(){
							'step 0'
							player.storage.losesuit=[];
						},
					},
					3:{
						direct:true,
						forced:true,
						trigger:{
							player:['useCardBegin','respondBegin'],
						},
						filter:function(event,player,card){
							if (!player.storage.losesuit) player.storage.losesuit = [];//QQQ
							return !player.storage.losesuit.contains(get.suit(event.card));
						},
						content:function(){
							'step 0'
							event.suit=get.suit(trigger.card);
							if(event.suit==player.storage.YB_memorysuit){
								player.addMark('yb018_huaimeng',3);
								game.log(player,'再逢故人，觅得三载光阴。');
							}
							else {
								player.addMark('yb018_huaimeng');
								game.log(player,'重拾旧物，忆起一段过往。');
							};
							'step 1'
							player.storage.losesuit.add(event.suit);
						},
					}
				}
			},
			'yb018_minxing':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:['phaseZhunbeiBegin','phaseJieshuAfter'],
				},
				filter:function(event,player){ 
					if(player.hasSkill('yb018_minxing_buff'))return player.countMark('yb018_huaimeng')>=2;
					return true;
				},
				content:function (){
					'step 0'
					// if(player.hasSkill('yb018_minxing_add')){
						player.removeMark('yb018_huaimeng',2);
					// }
					'step 1'
					var list=[];
					if(player.hasMark('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=2) list.push('两枚');
					if(player.hasMark('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=1) list.push('一枚');
					list.push('不移除');
					player.chooseControl(list).set('choiceList',['移除两枚梦，然后摸五放五','移除一枚梦，然后摸四放四','不移除梦，然后摸三放三']).set('prompt','请选择');					
					'step 2'
					if(result.control=='两枚'){
						var nuk=2;
					}
					if(result.control=='一枚'){
						var nuk=1;
					}
					if(result.control=='不移除'){
						var nuk=0;
					};
					var nur=3+nuk;
					event.numb=nur;
					player.removeMark('yb018_huaimeng',nuk);
					player.draw(nur);
					player.chooseCard(nur,'h','请选择'+nur+'张手牌',true).set('complexCard', true).set('ai', function (card) {
						if(ui.selected.cards.length>0){
							if(get.suit(ui.selected.cards[ui.selected.cards.length-1])==get.suit(card)) return 10
						}
						else{
							return 6 - get.value(card);
						}
					})
					result.cards;
						'step 3'
					event.cards=result.cards;
					//player.chooseCardButton(event.cards,true,'按顺序将牌置于牌堆顶，先选的在上',event.cards.length);
					/*player.chooseCardButton(event.cards,true,'按顺序将牌置于牌堆顶，先选的在上',event.cards.length).set('ai', function (button) {
						var player = _status.event.player;
						if(player.countMark('yb018_huaimeng')>=2){
							var num=[]
							for(var i in suit){
								num.add(suit[i])
							}
							for(var i in suit){
								if(suit[i]==Math.max(num)){
									return get.type(button.link)==suit[i]
								}
							}
						}
						else{
							return 10 - get.value(card)
						}
					})*/
					var next = player.chooseToMove('将牌按照顺序置于牌堆顶', true);
					var list = [['待选择牌', event.cards]]
					list.push(['牌堆顶', []]);
					next.set('list', list); // 设置需要选择牌的数组
					next.set('selectButton', function (buttons) {
						// 设置选择的按钮，即只能选择一张牌
						return buttons.slice(0, 1);
					});
					next.set('filterOk', function (moved) {
						return moved[0].length == 0
						//设置OK按钮触发条件 总数组的第0项数组数量为0
					});
					next.set('processAI',  (list) =>{
						var cards = list[0][1], cards1 = list[1][1]
						//cards为待定选择牌 cards1为牌堆顶的牌
						var player = _status.event.player;
						if(player.countMark('yb018_huaimeng')>=2){
							var number={
								"club":0,
								"spade":0, 
								"diamond":0, 
								"heart":0,
							}
							//定义一个花色对象
							for(var i of cards){
								number[get.suit(i)]++
							}
							//索捡花色数量
							var num=[]
							for(var i in number) num.push(number[i])
							var	maxnum=Math.max(...num)
							//获取最多的数量
							for(var i in number){
								if(number[i]==maxnum){
									//索捡出数量最多的花色
									for(var o of cards){
										if(get.suit(o)==i) cards1.add(o)
										//将该花色的加入cards1数组
									}
									for(var o of cards1){
										cards.remove(o)
										//从cards中移除cards1中已有牌
									}
								}
							}
							//用于给cards1数组增加花色最多的卡牌
						}
						cards.sort(function(a,b){
							return get.value(b,player)-get.value(a,player);
						});
						//为cards排序，价值最大的在最前面
						for(var o of cards){
							cards1.add(o)
						}
						//将cards数组中的牌加入cards1数组
						return [[], cards1];
					})
					game.log(player,'将'+event.numb+'张牌盖在了牌堆顶')
					'step 4'
					var list=result.moved[1].slice(0);
					while(list.length){
						ui.cardPile.insertBefore(list.pop(),ui.cardPile.firstChild);
					}

					'step 5'
					var lista=['是','cancel'];
					// if(player.hasSkill('yb018_minxing_buff'))lista.remove('是');
					player.chooseControl(lista).set('prompt','是否展示牌堆顶三张牌，并根据花色数获得收益');
					'step 6'
					if(result.control=='是'){
						var cards=get.cards(3);
						event.cards=cards;
						//------此模块检测独苗卡牌与花色数
						var suit=[];
						for (var t=0;t<3;t++){
							var huase=get.suit(cards[t],false);
							if(!suit.contains(huase)){
								suit.push(huase);
							}
						}
						if(get.suit(cards[0])==get.suit(cards[1]))event.y=cards[2];
						if(get.suit(cards[0])==get.suit(cards[2]))event.y=cards[1];
						if(get.suit(cards[2])==get.suit(cards[1]))event.y=cards[0];
						// event.y=y;//独苗卡牌对象
						event.u=suit.length;//花色数
						game.cardsGotoOrdering(event.cards);
						player.showCards(event.cards,get.translation(player)+'展示了牌堆顶的三张牌');
						player.$throw(event.cards,1000);
						player.loseToDiscardpile(event.cards);
						// player.addTempSkill('yb018_minxing_buff');
					}
					else{
						event.goto(9);
					}
					'step 7'
					var listb=[];
					if(event.u==1){
						listb.push('选项一');
						if(player.hp<player.maxHp)listb.push('选项二');
						if(player.hp<player.maxHp&&player.hasSkill('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=2)listb.push('背水！');
					}
					if(event.u==2){
						listb.push('选项四');
						listb.push('选项五');
						if(player.hasSkill('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=1)listb.push('背水');
					}
					player.chooseControl(listb).set('choiceList',[
						'<span class=yellowtext>摸两张牌</span>',
						'<span class=yellowtext>回复一点体力</span>',
						'背水！消耗<span class=yellowtext>两</span>枚梦',
						'<span class=yellowtext>摸一张牌</span>',
						'<span class=yellowtext>获得仅有一张的花色的牌</span>',
						'背水：消耗<span class=yellowtext>一</span>枚梦'
					]).set('prompt','<span class=yellowtext>请选择</span>').set('ai',function(){
						var player=_status.event.player;
						return listb.length-1
					});
					'step 8'
					if(result.control=='选项一'){
						player.draw(2);
					}
					if(result.control=='选项二'){
						player.recover();
					}
					if(result.control=='背水！'){
						player.removeMark('yb018_huaimeng',2);
						player.draw(2);
						player.recover();
					}
					if(result.control=='选项四'){
						player.draw();
					}
					if(result.control=='选项五'){
						player.gain(event.y,'gain2');
					}
					if(result.control=='背水'){
						player.removeMark('yb018_huaimeng');
						player.draw();
						player.gain(event.y,'gain2');
					}
					// 'step 9'
					// 	player.addTempSkill('yb018_minxing_add');					
				},
				subSkill:{
					add:{
						charlotte:true,
						forced:true,
						mark:true,
						marktext:'悯',
						intro:{
							content:'本回合已发动过悯星，再次发动需要两枚梦。'
						}
					},
					buff:{
						charlotte:true,
						forced:true,
						mark:true,
						marktext:'追',
						intro:{
							content:'本回合已发动过悯星的追加效果，故而无法再次发动。'
						}
					},
				},
				ai:{
					threaten:1.3,//嘲讽值
				}
			},
			'yb018_fanling':{
				mark:true,
				locked:true,
				marktext:'灵',
				charlotte:true,
				intro:{
					content:function (storage,player,skill){
						if(player.storage.yb018_fanling==true) return '当前为栖月形态';
						return '当前为折叶形态';
					},
				},
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'roundStart',
				},
				forced:true,
				filter:function (event,player){
					if(game.roundNumber>1)return false;
					return true;
				},
				content:function (){
					'step 0'
					player.chooseControl('栖月','折叶').set('prompt','请选择起始状态');
					'step 1'
					if(result.control=='栖月'){
						player.storage.yb018_fanling=true;
						player.addTempSkill('yb018_qiyue','roundStart');
						player.addSkill('yb018_fanling1');
					}
					if(result.control=='折叶'){
						player.storage.yb018_fanling=false;
						player.addTempSkill('yb018_zheye','roundStart');
						player.addSkill('yb018_fanling1');
					}
				},
				init:function (player){
					player.storage.yb018_fanling=true;
				},
				derivation:['yb018_zheye','yb018_qiyue'],
				group:['yb018_fanling_1'],
				subSkill:{
					1:{
						audio:'eyb018_fanling',
						trigger:{
							global:'roundStart',
						},
						forced:true,
						filter:function (event,player){
							if(game.roundNumber==1)return false;
							if(!player.countMark('yb018_huaimeng')>=1) return false;
							return true;
						},
						content:function (){
							'step 0'
							player.removeMark('yb018_huaimeng');
							'step 1'
							if(player.storage.yb018_fanling==true){
								player.storage.yb018_fanling=false;
								player.addTempSkill('yb018_zheye','roundStart');
							}
							else{
								player.storage.yb018_fanling=true;
								player.addTempSkill('yb018_qiyue','roundStart');
							}
						},
					}
				}
			},
			'yb018_zheye':{
				audio:'ext:夜白神略/audio/character:2',
				audioname2:{
					'ybsp_002chenailin':'yb002_zheye',//
					'ybsl_005wangruobing':'yb005_zheye',//
					'ybsl_010zhouyue':'yb010_zheye',//
				},
				trigger:{
					player:['changeHp'],
				},
				forced:true,
				content:function (){
					event.num=Math.abs(trigger.num);
					player.draw(event.num);
				},
			},
			'yb018_qiyue':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:['phaseZhunbeiBegin','phaseJieshuAfter'],
				},
				forced:true,
				content:function (){
					'step 0'
					if(event.triggername=='phaseJieshuAfter'){
						player.draw(2);
						event.finish();
					}
					'step 1'
					if(player.hasMark('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=1)
						return player.chooseControl('打牌','弃梦').set('prompt','请选择打出一张牌或移除一枚“梦”。').set('ai',function(){
							if(player.countMark('yb018_huaimeng')>3) return '弃梦';
							return '打牌';
						})
						else return player.chooseControl('打牌').set('prompt','你没有梦，请点击打牌。');
					'step 2'
					if(result.control=='弃梦'){
						player.removeMark('yb018_huaimeng',1);
					}
					if(result.control=='打牌'){
						if(player.countCards('he')>0){
							player.chooseToRespond('he',true).set('ai',function(card){
								if(player.storage.YB_memorysuit&&get.suit(card)==player.storage.YB_memorysuit)return 3;
								return 1;
							});
						}
					};
				},
			},
			//------------------神张晴
			'yb018_isi':{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filter:function (event,player){
					return player.maxHp<10;
				},
				content:function (){
					'step 0'
					event.cards=[];
					event.suits=[];
					'step 1'
					player.judge(function(result){
						var evt=_status.event.getParent('yb018_isi');
						if(evt&&evt.suits&&evt.suits.contains(get.suit(result))) return 0;
						return 1;
					}).set('callback',function(){
						event.getParent().orderingCards.remove(event.judgeResult.card);
					}).judge2=function(result){
						return result.bool?true:false;
					};
					'step 2'
					event.cards.push(result.card);
					if(result.bool&&player.maxHp<10){
						event.suits.push(result.suit);
						player.gainMaxHp();
						event.goto(1);
					}
					else{
						cards=cards.filterInD();
						if(cards.length) player.chooseTarget('将'+get.translation(cards)+'交给一名角色',true).set('ai',function(target){
							var player=_status.event.player;
							var att=get.attitude(player,target)/Math.sqrt(1+target.countCards('h'));
							if(target.hasSkillTag('nogain')) att/=10;
							return att;
						});
						else event.finish();
					}
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.line(target,'green');
						target.gain(cards,'gain2');
					}
					'step 4'
					if(target.isMaxHandcard()) player.loseMaxHp();
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
					threaten:2,//嘲讽值
				},
			},
			yb018_newisi:{
				audio: "yb018_isi",
				enable: "phaseUse",
				usable: 1,
				frequent: true,
				filter(event, player) {
					return player.maxHp < 10;
				},
				content() {
					"step 0";
					event.cards = [];
					event.suits = [];
					"step 1";
					player
						.judge(function (result) {
							var evt = _status.event.getParent("yb018_newisi");
							if (evt && evt.suits && evt.suits.includes(get.suit(result))) return 0;
							return 1;
						})
						.set("callback", lib.skill.yb018_newisi.callback).judge2 = function (result) {
							return result.bool ? true : false;
						};
					"step 2";
					var cards = cards.filterInD();
					if (cards.length)
						player
							.chooseTarget("将" + get.translation(cards) + "交给一名角色", true)
							.set("ai", function (target) {
								var player = _status.event.player,
									att = get.attitude(player, target);
								if (att <= 0) return att;
								if (target.countCards("h") + _status.event.num >= _status.event.max) att /= 3;
								if (target.hasSkillTag("nogain")) att /= 10;
								return att;
							})
							.set("num", cards.length)
							.set(
								"max",
								game.filterPlayer().reduce((num, i) => {
									return Math.max(num, i.countCards("h"));
								}, 0)
							);
					else event.finish();
					"step 3";
					if (result.bool) {
						var target = result.targets[0];
						event.target = target;
						player.line(target, "green");
						target.gain(cards, "gain2").giver = player;
					} else event.finish();
					"step 4";
					if (target.isMaxHandcard()) player.loseMaxHp();
				},
				callback() {
					"step 0";
					var evt = event.getParent(2);
					event.getParent().orderingCards.remove(event.judgeResult.card);
					evt.cards.push(event.judgeResult.card);
					if (event.getParent().result.bool && player.maxHp < 10) {
						evt.suits.push(event.getParent().result.suit);
						player.gainMaxHp();
						player.chooseBool("是否继续发动【懿思】？").set("frequentSkill", "reshuishi");
					} else event._result = { bool: false };
					"step 1";
					if (result.bool) event.getParent(2).redo();
				},
				ai: {
					order: 9,
					result: {
						player: 1,
					},
				},
			},
			'yb018_chongmeng':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'phaseZhunbeiBegin',
				},
				forced:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'YB_snow',
				filter:function (event,player){
					if(player.storage.yb018_yisi) return true;
					return this.yb018_guajian_filter.apply(this,arguments);
				},
				content:function (){
					'step 0'
					player.awakenSkill('yb018_chongmeng');
					player.gainMaxHp(2);
					player.recover();
					'step 1'
					player.chooseTarget(true,'令一名角色获得技能〖释罔〗').set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						target.storage.yb018_shiwang=player;
						target.addSkill('yb018_shiwang');
					}
				},
				derivation:'yb018_shiwang',
				'yb018_guajian_filter':function (event,player){
					return !game.hasPlayer(function(current){
						return current.getAllHistory('damage').length==0;
					});
				},
			},
			'yb018_yisi':{
				audio:'ext:夜白神略:1',
				inherit:'yb018_yisi',
				filterTarget:true,
				content:function (){
					'step 0'
					player.awakenSkill('yb018_yisi');
					var list=target.getSkills(null,false,false).filter(function(skill){
						var info=lib.skill[skill];
						return info&&info.juexingji&&!target.awakenedSkills.contains(skill);
					});
					if(player.maxHp>=game.players.length&&list.length>0){
						if(list.length==1) event._result={control:list[0]};
						else player.chooseControl(list).set('prompt','选择一个觉醒技，令'+get.translation(target)+'可无视条件发动该技能');
					}
					else{
						target.draw(4);
						event.goto(2);
					}
					'step 1'
					target.storage.yb018_yisi=result.control;
					target.markSkill('yb018_yisi');
					var info=lib.skill[result.control];
					if(info.filter&&!info.charlotte&&!info.yb018_guajian_filter){
						info.yb018_guajian_filter=info.filter;
						info.filter=function(event,player){
							if(player.storage.yb018_yisi) return true;
							return this.yb018_guajian_filter.apply(this,arguments);
						}
					}
					'step 2'
					player.loseMaxHp(2);
				},
				intro:{
					content:'发动【$】时无视条件',
				},
				ai:{
					order:0.1,
					expose:0.2,//跳立场
					result:{
						target:function (player,target){
							if(target!=player&&player.hasUnknown()||player.maxHp<(player.getDamagedHp()>1?5:6)) return 0;
							if(target==player&&player.hasSkill('yb018_yisi')&&game.hasPlayer(function(current){
								return current.getAllHistory('damage').length==0;
							})) return 4;
							var list=target.getSkills(null,false,false).filter(function(skill){
								var info=lib.skill[skill];
								return info&&info.juexingji&&!target.awakenedSkills.contains(skill);
							});
							if(list.length||target.hasJudge('lebu')||target.hasSkillTag('nogain')) return 0;
							return 4;
						},
					},
				},
				enable:'phaseUse',
				limited:true,
				skillAnimation:true,
				animationColor:'YB_snow',
				mark:true,
				init:function (player,skill){
					player.storage[skill]=false;
				},
			},
			'yb018_guajian':{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				limited:true,
				skillAnimation:true,
				animationColor:'YB_snow',
				filterTarget:function (card,player,target){
					return player!=target;
				},
				content:function (){
					'step 0'
					player.awakenSkill('yb018_guajian');
					var list=target.getSkills(null,false,false).filter(function(skill){
						var info=lib.skill[skill];
						return info&&info.juexingji;
					});
					if(list.length){
						target.addMark('yb018_guajian',1,false);
						for(var i of list){
							var info=lib.skill[i];
							if(info.filter&&!info.charlotte&&!info.yb018_guajian_filter){
								info.yb018_guajian_filter=info.filter;
								info.filter=function(event,player){
									if(player.hasMark('yb018_guajian')) return true;
									return this.yb018_guajian_filter.apply(this,arguments);
								}
							}
						}
					}
					else target.draw(4);
					player.loseMaxHp(2);
				},
				intro:{
					content:'发动非Charlotte觉醒技时无视条件',
				},
				ai:{
					order:0.1,
					expose:0.2,//跳立场
					result:{
						target:function (player,target){
							if(player.hasUnknown()||player.maxHp<5) return 0;
							var list=target.getSkills(null,false,false).filter(function(skill){
								var info=lib.skill[skill];
								return info&&info.juexingji;
							});
							if(list.length||target.hasJudge('lebu')||target.hasSkillTag('nogain')) return 0;
							return 4;
						},
					},
				},
				mark:true,
				init:function (player,skill){
					player.storage[skill]=false;
				},
			},
			'yb018_shiwang':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'phaseZhunbeiBegin',
				},
				filter:function (event,player){
					var target=player.storage.yb018_shiwang;
					return target&&target.isAlive()&&target.maxHp>1;
				},
				logTarget:function (event,player){
					return player.storage.yb018_shiwang;
				},
				check:function (event,player){
					var target=player.storage.yb018_shiwang;
					if(get.attitude(player,target)<=0) return true;
					return target.maxHp>3&&!player.hasJudge('lebu');
				},
				content:function (){
					player.storage.yb018_shiwang.loseMaxHp();
					player.addTempSkill('yb018_shiwang2');
				},
			},
			'yb018_shiwang2':{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filter:function (event,player){
					for(var i of lib.inpile){
						if(get.type(i)=='trick'&&event.filterCard({name:i,isCard:true},player,event)) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function (event,player){
						var list=[];
						for(var i of lib.inpile){
							if(get.type(i)=='trick'&&event.filterCard({name:i,isCard:true},player,event)) list.push(['锦囊','',i]);
						}
						return ui.create.dialog('释罔',[list,'vcard']);
					},
					check:function (button){
						return _status.event.player.getUseValue({name:button.link[2],isCard:true});
					},
					backup:function (links,player){
						return {
							viewAs:{
								name:links[0][2],
								isCard:true,
							},
							filterCard:()=>false,
							selectCard:-1,
							popname:true,
							precontent:function(){
								player.logSkill('yb018_shiwang');
								//delete event.result.skill;
							},
						}
					},
					prompt:function (links,player){
						return '请选择'+get.translation(links[0][2])+'的目标';
					},
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
				},
			},
			//---------------废案张晴
			'yb018_yinsi':{
				// trigger:{
					// global:'gameDrawBefore',
				// },
				// direct:true,
				derivation:['dz017_shanwu','dz014_qingling','dz017_zhushi'],
				// content:function (){
				// 	player.addSkill('yb018_yinsia');
				// 	player.addSkill('yb018_yinsib');
				// 	player.addSkill('yb018_yinsic');
				// 	player.addSkill('yb018_yinsid');
				// },
				// init:function (player){
				// 	player.addSkill('yb018_yinsia');
				// 	player.addSkill('yb018_yinsib');
				// 	player.addSkill('yb018_yinsic');
				// 	player.addSkill('yb018_yinsid');
				// },
				group:['yb018_yinsia','yb018_yinsib','yb018_yinsic','yb018_yinsid']
			},
			'yb018_yinsia':{
				audio:'ext:夜白神略:1',
				trigger:{
					player:'phaseZhunbeiBegin',
				},
				filter:function (event,player){
					if(player.hasMark('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=2) return true;
					return false;
				},
				content:function (){
					'step 0'
					player.chooseControl('是','否').set('prompt','是否移除两枚”梦“，然后卜算3？');
					'step 1'
					var jg=result.control;
					if(jg=='是'){
						player.removeMark('yb018_huaimeng',2);
						player.chooseToGuanxing(3);
					}
					else event.finish();
				},
			},
			'yb018_yinsib':{
				audio:'ext:夜白神略:1',
				trigger:{
					player:'phaseDrawBefore',
				},
				filter:function (event,player){
					if(player.hasMark('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=1) return true;
					return false;
				},
				content:function (){
					'step 0'
					player.chooseControl('是','否').set('prompt','是否移除一枚”梦“，然后多摸一张牌？');
					'step 1'
					var jg=result.control;
					if(jg=='是'){
						player.removeMark('yb018_huaimeng',1);
						trigger.num++;
						game.log(player,'多摸了一张牌');
					}
					else event.finish;
				},
			},
			'yb018_yinsic':{
				audio:'ext:夜白神略:1',
				trigger:{
					player:'phaseUseBegin',
				},
				filter:function (event,player){
					if(player.hasMark('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=2) return true;
					return false;
				},
				content:function (){
					'step 0'
					player.chooseControl('是','否').set('prompt','是否移除两枚”梦“，然后本回合获得【善舞】？');
					'step 1'
					var jg=result.control;
					if(jg=='是'){
						player.removeMark('yb018_huaimeng',2);
						player.addTempSkill('dz017_shanwu');
						game.log(player,'：当初我跳舞时，那小子看我直勾勾的');
					}
					else event.finish();
				},
			},
			'dz018_shanwu':{
				inherit:'dz017_shanwu',
				audio:'ext:夜白神略/audio/character:1',
			},
			'yb018_yinsid':{
				audio:'ext:夜白神略:1',
				trigger:{
					player:'phaseJieshuBefore',
				},
				filter:function (event,player){
					if(player.hasMark('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=2) return true;
					return false;
				},
				content:function (){
					'step 0'
					player.chooseControl('是','否').set('prompt','是否移除两枚”梦“，然后获得【注视】和【轻灵】直到下回合开始？');
					'step 1'
					var jg=result.control;
					if(jg=='是'){
						player.removeMark('yb018_huaimeng',2);
						player.addTempSkill('dz018_zhushi',{player:'phaseZhunbeiBefore'});
						player.addTempSkill('dz018_qingling',{player:'phaseZhunbeiBefore'});
					}
					else event.finish();
				},
			},
			'dz018_qingling':{
				inherit:'dz014_qingling',
				audio:'ext:夜白神略/audio/character:1',
			},
			'dz018_zhushi':{
				inherit:'dz017_zhushi',
				audio:'ext:夜白神略/audio/character:1',
			},
			//-------------------------盛妍
			'yb019_lincu':{
				init:function (player,skill){
					player.addSkillBlocker(skill);
				},
				onremove:function (player,skill){
					player.removeSkillBlocker(skill);
				},
				charlotte:true,
				skillBlocker:function (skill,player){
					return !lib.skill[skill].charlotte&&!get.is.locked(skill,player);
				},
				group:'yb019_lincu_jia',
				mark:true,
				intro:{
					content:function (storage,player,skill){
						var list=player.getSkills(null,false,false).filter(function(i){
							return lib.skill.fengyin.skillBlocker(i,player);
						});
						if(list.length) return '失效技能：'+get.translation(list);
						return '无失效技能';
					},
				},
				subSkill:{
					jia:{
						trigger:{
							player:'damageBegin3',
						},
						direct:true,
						content:function (){
							trigger.num++;
						},
						sub:true,
					},
				},
			},
			'yb019_chicu':{
				audio:'ext:夜白神略/audio/character:2',
				direct:true,
				trigger:{
					global:'loseAfter',
				},
				filter:function (event,player,card){
					if(event.type!='discard'||_status.currentPhase!=player||event.player==player){return false;}
					for(var i=0;i<event.cards2.length;i++){
						if(get.name(event.cards2[i],null,event.hs.contains(event.cards2[i])?event.player:false)=='ybsl_cu'){
							return true;
						}
					}
					return false;
				},
				content:function (){
					var target=trigger.player;
					target.addTempSkill('yb019_lincu');
				},
			},
			'yb019_renxing':{
				shaRelated:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'useCardToTargeted',
				},
				filter:function (event,player){
					if(event.target.countCards('h')==0)return false;
					return (event.card.name=='sha'||(get.type2(event.card,false)=='trick'&&get.tag(event.card,'damage')>0))&&
						!event.target.hasSkill('yb019_renxingbiaoji');
				},
				// 'prompt2':function(event,player,target){
					// var str='是否对';
					// var tar=get.translation(event.target);
					// str+=tar;
					// str+='发动任性';
					// return str;
				// },
				logTarget:'target',
				content:function (){
					'step 0'
					var target=trigger.target;
					event.target=target;
					//if(player!=target&&target.countCards('h')>0) player.viewHandcards(target);
					//player.chooseToDiscard(1)
					event.videoId=lib.status.videoId++;
					var cards=target.getCards('h');
					if(player.isOnline2()){
						player.send(function(cards,id){
							ui.create.dialog('任性',cards).videoId=id;
						},cards,event.videoId);
					}
					event.dialog=ui.create.dialog('任性',cards);
					event.dialog.videoId=event.videoId;
					if(!event.isMine()){
						event.dialog.style.display='none';
					}
					player.chooseButton().set('filterButton',function(button){
						return get.type(button.link)=='basic';
					}).set('dialog',event.videoId);
					'step 1'
					if(result.bool){
						event.card=result.links[0];
						var func=function(card,id){
							var dialog=get.idDialog(id);
							if(dialog){
								for(var i=0;i<dialog.buttons.length;i++){
									if(dialog.buttons[i].link==card){
										dialog.buttons[i].classList.add('selectedx');
									}
									else{
										dialog.buttons[i].classList.add('unselectable');
									}
								}
							}
						}
						if(player.isOnline2()){
							player.send(func,event.card,event.videoId);
						}
						else if(event.isMine()){
							func(event.card,event.videoId);
						}
						player.chooseControl(['弃置','重选','cancel2']);
					}
					else{
						if(player.isOnline2()){
							player.send('closeDialog',event.videoId);
						}
						event.dialog.close();
						event.finish();
						target.addTempSkill('yb019_renxingbiaoji');
					}
					'step 2'
					if(player.isOnline2()){
						player.send('closeDialog',event.videoId);
						event.dialog.close();
						var card=event.card;
						target.discard(card);
						target.addTempSkill('yb019_renxingbiaoji');
					}
					else if(result.control=='弃置'){
						event.dialog.close();
						var card=event.card;
						target.discard(card);
						target.addTempSkill('yb019_renxingbiaoji');
					}
					else if(result.control=='重选'){
						event.dialog.close();
						event.goto(0);
					}
					else target.addTempSkill('yb019_renxingbiaoji');
					//史山别学！
				},
				ai:{
					threaten:1.5,//嘲讽值
					result:{
						target:function (player,target){
							return -target.countCards('h');
						},
					},
					expose:0.4,//跳立场
				},
				subSkill:{
					biaoji:{
						locked:true,
						charlotte:true,
						forced:true,
					},
				},
			},
			'yb019_renxingbiaoji':{
				mark:true,
				marktext:'任性',
				intro:{
					content:'已被任性过'
				},
				locked:true,
				charlotte:true,
				forced:true,
			},
			'yb019_misan':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'useCardAfter',
				},
				direct:true,
				filter:function (event,player){
					if(player.getHistory('custom',function(evt){
						return evt.yb019_misan_name==event.card.name;
					}).length>0) return false;
					if(get.type(event.card)!='basic') return false;
					return event.cards.filterInD().length>0
				},
				content:function (){
					'step 0'
					player.chooseTarget(get.prompt('yb019_misan'),'将'+get.translation(trigger.cards)+'交给一名其他角色',function(card,player,target){
						return target!=player;
					}).set('ai',function(target){
						if(target.hasJudge('lebu')) return 0;
						var att=get.attitude(_status.event.player,target);
						if(att<3) return 0;
						if(target.hasSkillTag('nogain')) att/=10;
						if(target.hasSha()&&_status.event.sha){
							att/=5;
						}
						return att/(1+get.distance(player,target,'absolute'));
					}).set('sha',trigger.cards[0].name=='sha');
					'step 1'
					if(result.bool){
						player.logSkill('yb019_misan',result.targets[0]);
						result.targets[0].gain(trigger.cards.filterInD(),'gain2');
						player.getHistory('custom').push({yb019_misan_name:trigger.card.name});
					}
				},
			},
			'yb019_cutan':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:['phaseZhunbeiBegin','damageEnd'],
				},
				frequent:true,
				content:function (){//触发的效果，具体填在下面
					player.gain(game.createCard('ybsl_cu'),'gain2');
				},
				derivation:['ybsl_cu'],
				init:function(player,skill){
					game.broadcastAll(function(){lib.inpile.add('ybsl_cu')});
				},
			},
			// 'yb019_zhiyu':'掷郁',
			// 'yb019_zhiyu_info':'每回合每种牌名（限实体牌名）限一次。出牌阶段，你可以展示一张手牌并交给一名其他角色，然后视为你对其使用此牌（不计入次数，不受距离限制）。',还没开写呢，懒
			// yb019_zhiyu:{
				
			// },
			//--------------贾雨桐
			'yb020_shange':{
				audio:'ext:夜白神略/audio/character:2',
			},
			'yb020_wanyue':{
				inherit:'yb001_wanyue',
				audio:'ext:夜白神略/audio/character:2',
			},
			'yb020_yuyun':{
				audio:'ext:夜白神略/audio/character:2',
			},
			//--------------刘域枫
			yb021_shusuan:{
				audio:'ext:夜白神略/audio/character:2',
				usable:1,
				enable:'phaseUse',
				init:function(player){
					if(!player.storage.yb021_shusuan) player.storage.yb021_shusuan=4;
				},
				getInfo:function(player){
					if(!player.storage.yb021_shusuan) player.storage.yb021_shusuan=4;
					return player.storage.yb021_shusuan;
				},
				mark:true,
				intro:{
					content:function(storage,player){
						var str='下次数算展示<span class=yellowtext>';
						str+=get.cnNumber(lib.skill.yb021_shusuan.getInfo(player));
						str+='</span>张牌。';
						return str;
					}
				},
				content:function(){
					'step 0'
					event.num=lib.skill.yb021_shusuan.getInfo(player);
					event.str='牌堆顶';
					event.cards=get.cards(event.num);
					event.str2='手牌';
					event.cards2=player.getCards('h');
					game.cardsGotoOrdering(event.cards);
					'step 1'
					delete player.storage.yb021_shusuan;

					var dialog=ui.create.dialog('请选择共计四张牌进行24点计算（即使出现无限小数也不要紧，一样可以计算）');
					dialog.add('牌堆顶');
					dialog.add(event.cards);
					dialog.add('手牌');
					dialog.add(event.cards2);
					player.chooseButton(dialog,4,true);
					'step 2'
					event.list66=result.links;
					//将没选的牌放回牌堆顶
					var list=[];
					for(var i=0;i<event.cards.length;i++){
						if(!event.list66.contains(event.cards[i])) list.push(event.cards[i]);
					}
					game.log('!',list);
					list.reverse();
					for(var i=0;i<list.length;i++){
						ui.cardPile.insertBefore(list[i],ui.cardPile.firstChild);
					}

					player.showCards(event.list66);
					player.FY_24(event.list66,'数算');
					'step 3'
					if(result.FY_24=='victoey'){
						player.draw(event.num);
					}
					player.$throw(event.list66);
					player.chooseControl('交出','弃置').set('ai',function(control){
						if(game.hasPlayer(function(current){
							return current!=player&&get.attitude(player,current)>2;
						})) return 0;
						return 1;
					}).set('prompt','将用于计算的牌交给一名其他角色还是弃置？');
					'step 4'
					if(result.index==0){
						player.chooseTarget(function(card,player,target){
							return target!=player;
						}).set('ai',function(current){
							return current!=player&&get.attitude(player,current)>2;
						});
					}
					else{
						player.discard(event.list66,true);
						event.finish();
					}
					'step 5'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'water');
						target.gain(event.list66,'gain2');
					}
				},
				ai:{
					order:11,
					result:{
						player:1,
					},
					threaten:1.5,//嘲讽值
				},
			},
			yb021_qiujiao:{
				audio:'ext:夜白神略/audio/character:2',
				usable:1,
				enable:'phaseUse',
				group:'yb021_qiujiao_damage',
				content:function(){
					var next=game.createEvent('yb021_qiujiao');
					next.player=player;
					next.setContent(lib.skill.yb021_qiujiao.num);
				},
				subSkill:{
					damage:{
						audio:'yb021_qiujiao',
						trigger:{player:'damageEnd'},
						content:function(){
							var next=game.createEvent('yb021_qiujiao');
							next.player=player;
							next.setContent(lib.skill.yb021_qiujiao.num);
						}
					}
				},
				num:function(){
					'step 0'
					if(game.hasPlayer(function(current){
						return current!=player&&current.countCards('he');
					})){
						player.chooseTarget(get.prompt2('yb021_qiujiao'),function(card,player,target){
							return target!=player&&target.countCards('he')>0;
						}).set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(att>0) return Math.sqrt(att)/10;
							return 5-att;
						});
					}
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						target.chooseCard('he',true,'求教：将一张牌交给'+get.translation(player));
					}
					'step 2'
					event.target.give(result.cards,player,true);
					'step 3'
					var list=lib.skill.yb021_shusuan.getInfo(player);
					list=(list+1);
					player.storage.yb021_shusuan=list;
					player.markSkill('yb021_shusuan');
				}
			},
			//------------------------盐
			yb022_yiduan:{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target&&target.countCards('h')>0;
				},
				content:function(){
					'step 0'
					event.type=[];
					event.list={};
					var listk=[];
					var listn=[];
					for(var i of lib.inpile){
						if(event[get.type2(i)]!=true){
							event.type.add(get.translation(get.type2(i)));
							var n=get.type2(i);
							event.list[n]=get.type2(i);
							listn.add(n);
							listk.add([n,get.translation(get.type2(i))]);
							event[n]=true;
						}
					};
					var dialog=ui.create.dialog('<font size=6><b>臆断</b></font>','forcebutton','hidden');
					dialog.add('选择若干个类型，令其交给你一张符合其中一种类型的手牌，若不执行则受到等量伤害。');
					dialog.add([listk,'tdnodes']);
					var chooseButton=player.chooseButton(dialog,[1,Infinity],true);
					chooseButton.set('ai',function(button){
						if(button.link=='ybsl_flower')return true;
						return false;
					}).set('filterButton',function(button){
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(!listn.contains(ui.selected.buttons[i].link)||!listn.contains(button.link)) return false;
						}
						return true;
					});
					
					'step 1'
					if(result.links){
						event.lists=result.links;
						game.log(player,'选择了',event.lists)
						event.types=get.YB_map(event.lists,event.list);
						target.chooseCard('h',function(card){
							if(!event.types.contains(get.type(card))) return false;
							return true;
						}).set('ai',function(card){
							return true;
						})
					}
					else{event.finish();}
					'step 2'
					if(result.cards){
						target.give(result.cards,player);
					}
					else{
						target.damage(event.types.length,player);
					}
				},
				ai:{
					order:5,
					result:{
						player:1,
						target:-1,
					},
					threaten:1.5,//嘲讽值
				},
			},
			yb022_duanxiang:{
				audio:'ext:夜白神略/audio/character:2',
				usable:1,
				trigger:{global:'damageEnd'},
				check:function(event,player){
					var att=get.attitude(_status.event.player,event.player);
					if(att<0) return true;
					return false;
				},
				content:function(){
					'step 0'
					var num=trigger.num;
					if(trigger.player.countCards('he')>=num*2){
						trigger.player.discardPlayerCard('he',trigger.player,num*2).set('prompt','断想').set('prompt2','请选择'+get.cnNumber(num*2)+'张牌弃置，然后回复'+get.cnNumber(num)+'点体力，<br>否则失去'+get.cnNumber(num)+'点体力上限并摸等量牌。').set('ai',function(button){
							return 100-get.value(button.link);
						});
					}
					'step 1'
					if(result.bool){
						trigger.player.recover(trigger.num);
					}
					else {
						trigger.player.loseMaxHp(trigger.num);
						trigger.player.draw(trigger.num);
					}
				},
			},
			yb022_duanxiangxin:{
				audio:'yb022_duanxiang',
				// usable:1,
				trigger:{global:'damageEnd'},
				filter:(event,player)=>{
					if(player.hasSkill('yb022_duanxiangxin_mark'))return false;
					if(!event.source||!event.source.isAlive()||!event.player.isAlive())return false;
					var source=event.source,target=event.player;
					var num1=source.countCards('h')-target.hp;
					var num2=target.countCards('h')-source.hp;
					if(num1!=0||num2!=0)return true;
					return false;
				},
				direct:true,
				content:function(){
					'step 0'
					var list=[];
					event.source=trigger.source;
					event.target=trigger.player;
					var source=event.source,target=event.target;
					var num1=source.countCards('h')-target.hp;
					var num2=target.countCards('h')-source.hp;
					if(num1!=0){
						if(num1<0) {
							var numx=-num1;
							list.push([1,'令'+get.translation(source)+'将手牌摸'+numx+'张']);
						}
						if(num1>0) {
							// var numx=-num1;
							list.push([2,'令'+get.translation(source)+'将手牌弃'+num1+'张']);
						}
					}
					if(num2!=0){
						if(num2<0) {
							var numy=-num2;
							list.push([3,'令'+get.translation(target)+'将手牌摸'+numy+'张']);
						}
						if(num2>0) {
							// var numy=-num1;
							list.push([4,'令'+get.translation(target)+'将手牌弃'+num2+'张']);
						}
					}
					var dialog=ui.create.dialog('<font size=6><b>断想</b></font>','forcebutton','hidden');
					dialog.add('是否选择一项');
					dialog.add([list,'tdnodes']);
					var chooseButton=player.chooseButton(dialog,[0,1]);
					chooseButton.set('ai',function(button){
						var player=_status.event.player;
						var att1=get.attitude(player,event.source),att2=get.attitude(player,event.target);
						if(att1>0&&num1<0){
							if(button.link==1)return true;
						};
						if(att1<0&&num1>0){
							if(button.link==2)return true;
						};
						if(att2>0&&num2<0){
							if(button.link==3)return true;
						};
						if(att2<0&&num2>0){
							if(button.link==4)return true;
						};
						return false;
					}).set('filterButton',function(button){
						return true;
					});
					event.numo=(numx||num1);
					event.nump=(numy||num2);
					'step 1'
					if(result.links){
						player.addTempSkill('yb022_duanxiangxin_mark');
						player.logSkill('yb022_duanxiangxin');
						switch(result.links[0]){
							case 1:event.source.draw(event.numo);break;
							case 2:event.source.discardPlayerCard('h',event.source,event.numo,true);break;
							case 3:event.target.draw(event.nump);break;
							case 4:event.target.discardPlayerCard('h',event.target,event.nump,true);break;
						}
					}
				},
				subSkill:{
					mark:{
						onremove:true,
					}
				}
			},
			/*
			'yb022_duanxiangxin':'断想',
			'yb022_duanxiangxin_info':'每回合限一次，当有角色受到伤害后，<br>①若伤害来源的手牌数不等于受伤角色的体力值，你可令伤害来源将手牌调整至受伤角色的体力值；<br>②若受伤角色的手牌数不等于伤害来源的体力值，你可令受伤角色将手牌调整至伤害来源的体力值。',
			*/
			//---------------散梦系武将
			//----------------------入梦者通用技能
			'ybsl_sanmeng':{//----------散梦
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'phaseZhunbeiBegin',
				},
				groupSkill:true,
				direct:true,
				filter:function(event,player){
					return player.group=='YB_dream';
				},
				audioname2:{
					'ybslshen_014liutianyu':'yb014_sanmeng',
					'ybsl_026can':'yb026_sanmeng',
					'ybsl_027rain':'yb027_sanmeng',
					'ybsp_027rain':'yb027_sanmeng',
					'ybsl_029dawn':'yb029_sanmeng',
					'ybsl_031huanqing':'yb031_sanmeng',
					'ybsl_034zhoulianyuan':'yb034_sanmeng',
					'ybnb_034zhoulianyuan':'yb034_sanmeng',
					'ybsl_036bright':'yb036_sanmeng',
					'ybsl_037diamondqueen':'yb037_sanmeng',
					'db_ybsl_038tengwu':'yb038_sanmeng',
					'db_ybsp_038tengwu':'yb038_sanmeng',
					'ybsl_039zhafu':'yb039_sanmeng',
					'db_ybsl_067snake':'yb067_sanmeng',
					'ybsl_069xiangzi':'yb069_sanmeng',
					'ybsl_076zhujun':'yb076_sanmeng',
					'ybsl_077yangqixu':'yb077_sanmeng',
					'ybsb_077yangqixu':'yb077_sanmeng',
					'ybsl_078zhuyahai':'yb078_sanmeng',
					'ybsl_083xiaozhu':'yb083_sanmeng',
				},
				content:function (){
					'step 0'
					player.chooseControl('是','cancel2').set('prompt','是否摸两张牌，令本回合手牌上限-1').set('ai',function(){
						if(player.hasJudge('lubu')){
							return 'cancel2';
						}
						return '是';
					});
					'step 1'
					if(result.control=='cancel2'){
						event.finish();return;
					}
					player.logSkill('ybsl_sanmeng');
					player.draw(2);
					player.addTempSkill('ybsl_sanmeng_buff');
				},
				group:'ybsl_sanmeng_add',
				subSkill:{
					buff:{
						mark:true,
						marktext:'散',
						intro:{
							content:'本回合手牌上限-1',
						},
						mod:{
							maxHandcard:function (player,num){
								return num-1;
							},
						},
						sub:true,
					},
					add:{
						trigger:{
							player:'phaseDiscardBefore',
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseToDiscard(2,'he').set('prompt','是否弃置两张牌，令手牌上限+1？'
							).set('ai',function(card){
								return player.countCards('h')-2>player.getHandcardLimit();
							});
							'step 1'
							if(result.bool){
								// player.removeSkill('ybsl_sanmeng_buff');
								lib.skill.chenliuwushi.change(player,1);
							}
						},
					},
				
				},
			},
			//-------------------蚕
			'yb026_xiaoye':{
				audio:'ext:夜白神略/audio/character:2',
				direct:true,
				trigger:{
					target:'useCardToTargeted',
				},
				filter:function (event,player){
					return (event.card.name=='sha');
				},
				content:function (){
					'step 0'
					player.chooseControl('摸一张牌','弃一张牌','cancel2').set('prompt',get.prompt2('yb026_xiaoye')).set('ai',function(){
						return '摸一张牌';
					});
					'step 1'
					game.log(trigger.player,trigger.target);
					if(result.control!='cancel2'){
						player.logSkill('yb026_xiaoye');
						if(result.control=='摸一张牌'){
							player.draw();
							event.goto(2);
						}
						else if(result.control=='弃一张牌'){
							player.chooseToDiscard(true,'he');
							event.goto(3);
						}
					}
					'step 2'
					if(!player.hasSkill('yb026_xiaoye_dr')&&player.countCards('h')<trigger.player.countCards('h')){
						player.addTempSkill('yb026_xiaoye_dr');
						trigger.getParent().excluded.add(player);
						event.finish();
					}
					else{
						event.finish();
					}
					'step 3'
					if(!player.hasSkill('yb026_xiaoye_di')&&player.countCards('h')<trigger.player.countCards('h')){
						player.addTempSkill('yb026_xiaoye_di');
						trigger.getParent().excluded.add(player);
						event.finish();
					}
					else{
						event.finish();
					}
				},
				subSkill:{
					dr:{
						mark:true,
						marktext:'摸',
						charlotte:true,
						onremove:true,
						sub:true,
					},
					di:{
						mark:true,
						marktext:'弃',
						charlotte:true,
						onremove:true,
						sub:true,
					},
				},
			},
			'yb026_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			//---------------------雨027
			'yb027_jisi':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'phaseDrawAfter',
				},
				// direct:true,
				check:function(event,player){
					if(get.attitude(player,event.player)>0) return false;
					return true;
				},
				filter:function(event,player){
					if(event.player==player)return false;
					if(event.player.countCards('h')<=player.countCards('h'))return false;
					return true;
				},
				content:function(){
					'step 0'
					player.gainPlayerCard('he',trigger.player,true);
					'step 1'
					if(trigger.player.countCards('h')>player.countCards('h')){
						player.chooseControl('继续','cancel2').set('prompt','是否继续发动汲丝？').set('prompt2','获得'+get.translation(trigger.player)+'的一张手牌。');
					}
					// else{event.finish();}
					'step 2'
					if(result.control=='继续'){event.goto(0);}
					else{event.finish();}
				},
			},
			'yb027_mili':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					target:'useCardToTargeted',
				},
				filter:function(event,player){
					if(event.player!=player)return true;
				},
				content:function(){
					trigger.player.addMark('yb027_mili_mark');
				},
				forced:true,
				group:['yb027_mili_mili'],
				subSkill:{
					mark:{
						mark:true,
						marktext:'迷',
						charlotte:true,
						intro:{
							name:'迷离',
							content:"mark",
						},
					},
					mili:{
						trigger:{
							global:'phaseAfter',
						},
						forced:true,
						filter:function(event,player){
							if(event.player==player)return false;
							if(event.player.countMark('yb027_mili_mark')<=0)return false;
							return true;
						},
						content:function(){
							var num=trigger.player.countMark('yb027_mili_mark');
							trigger.player.removeMark('yb027_mili_mark',num);
							player.draw(num);
							// player.addTempSkill('diaohulishan');
						},
					},
				},
			},
			// yb027_milixx:{//没写完呢，别私自加
				// audio:'ext:夜白神略/audio/character:2',
				// trigger:{
					// global:['useCard'],
					// // player:['useCard'],
					// // target:['useCardToTargeted'],
				// },
				// forced:true,
				// init:function(player){
					// player.storage.yb027_milixx=[];
				// },
				// filter:(event,player,name)=>{
					// if(get.type(event.card)!='basic'||get.type(event.card)!='trick')return false;
					// if(event.player==player&&event.targets.contains(player))
					// // if(name=='useCardToTargeted'&&event.source==player)return false;
					// if(player.storage.yb027_milixx.contains(event.card.name)) return false;
					// // return !event.YB_mili;
				// },
				// content:function(){
					// 'step 0'
					// player.storage.yb006_boxue.push(trigger.card.name);
					// game.log(player,'记录了',get.translation(trigger.card.name))
				// },
				// mark:true,
				// intro:{
					// content:function(event,player,storage,name,skill){
						// var str='已记录了';
						// str+=get.translation(player.storage.yb027_milixx);
						// return str;
					// }
				// }
			// },
			// 'yb027_milixx_info':'锁定技，当你使用基本或普通锦囊牌时，或当你被其他角色使用基本或普通锦囊指定为目标时，若此牌未被记录，你记录之。每回合限一次，当你使用基本或普通锦囊时，或成为其他角色使用基本或普通锦囊的目标时，若已有记录，你可以令此牌的效果改为你记录的另一张牌的效果（同时移除此记录），本次使用牌不会被主技能记录。',
			'yb027_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			//---------------------晶028
			'yb028_jianzhen':{
				audio:'ext:夜白神略/audio/character:2',
				superCharlotte:true,
				charlotte:true,
				group:'yb028_jianzhen_use',
				subSkill:{
					use:{
						enable:'phaseUse',
						usable:1,
						audio:'yb028_jianzhen',
						superCharlotte:true,
						charlotte:true,
						content:()=>{
							player.draw();
							var next=game.createEvent('yb028_jianzhen',false);
							next.player=player;
							next.setContent(lib.skill.yb028_jianzhen.sword);
							// trigger.setContent(lib.skill.yb028_jianzhen.sword);
						},
					}
				},
				trigger:{player:'damageEnd'},
				content:()=>{
					player.draw();
					var next=game.createEvent('yb028_jianzhen',false);
					next.player=player;
					next.setContent(lib.skill.yb028_jianzhen.sword);
				},
				sword:function(){
					'step 0'
					var list=['jin','tu','huo','shui','mu'];
					var list3=['金剑元（武器栏）','土剑元（防具栏）','火剑元（进攻马）','水剑元（防御马）','木剑元（宝物栏）'];
					var list2=[];
					for(var i=0;i<list.length;i++){
						if(!player.hasSkill('yb_jianyuan_'+list[i])){
							list2.add(['yb_jianyuan_'+list[i],list3[i]]);
						}
					}
					if(list2.length<1){event.finish();}
					else{
						var cards=player.getCards('h');
						player.chooseButton(2,[
							'剑阵',
							cards,
							[list2,'tdnodes'],
						]).set('filterButton',function(button){
							var type=typeof button.link;
							if(ui.selected.buttons.length&&type==typeof ui.selected.buttons[0].link) return false;
							return true;
						}).set('ai',function(button){
							var type=typeof button.link;
							if(type=='object') return 6-get.value(button.link);
						});
					}
					'step 1'
					if(result.bool){
						if(typeof result.links[0]!='string') result.links.reverse();
						var card=result.links[1],choice=result.links[0];
						player.addToExpansion(card,'gain2').gaintag.add(choice);
						if(choice){
							if(choice=='yb_jianyuan_jin'&&!player.isDisabled(1))player.disableEquip('equip1');
							if(choice=='yb_jianyuan_tu'&&!player.isDisabled(2))player.disableEquip('equip2');
							if(choice=='yb_jianyuan_shui'&&!player.isDisabled(3))player.disableEquip('equip3');
							if(choice=='yb_jianyuan_huo'&&!player.isDisabled(4))player.disableEquip('equip4');
							if(choice=='yb_jianyuan_mu'&&!player.isDisabled(5))player.disableEquip('equip5');
						}
						player.addSkill(choice);
					}
				},
			},
			/*
			yb_jianyuan_jin_info:'锁定技，你的攻击范围加2；当你使用杀时，你无视对方防具。当你造成伤害时，你可以移除金剑元，令伤害+1。',
			yb_jianyuan_mu_info:'当你失去最后的手牌时，你可以摸一张牌，然后你可以移除木剑元并摸等同体力上限的牌数。',
			yb_jianyuan_shui_info:'当你成为其他角色使用【杀】的目标时，你可以依次选择是否①弃置一张牌，将此杀【流离】出去；②移除水剑元，然后与一名可成为【流离】目标的其它角色互换座位。',
			yb_jianyuan_huo_info:'出牌阶段限一次，你可以将所有手牌当任意锦囊使用。当你使用牌指定目标后，你可以移除火剑元，弃置此牌目标各一张牌。',
			yb_jianyuan_tu_info:'你可以将一张装备牌当【无中生有】使用。当你受到伤害时，你可以移除土剑元，令伤害-1。',
			*/
			yb_jianyuan_jin:{
				forced:true,
				mod:{
					attackRange:function(player,num){
						return num+2;
					},
				},
				mark:true,
				marktext:'金',
				intro:{
					name:'金剑元',
					content:'expansion',
					markcount:'expansion',
					mark:function(dialog,storage,player){
						if(player.getExpansions('yb_jianyuan_jin')){
							var content=player.getExpansions('yb_jianyuan_jin');
							dialog.addAuto(content);
							dialog.addText('锁定技，你的攻击范围加2；当你使用杀时，你无视对方防具。<span class=yellowtext>当你造成伤害时，你可以移除金剑元，令伤害+1。</span>');
						}
						else{dialog.addText('你现在并没有金剑元');}
					},
				},
				nobracket:true,
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
					player.unmarkSkill(skill);
				},
				inherit:'qinggang_skill',
				group:'yb_jianyuan_jin_remove',
				subSkill:{
					remove:{
						trigger:{
							source:'damageBegin1',
						},
						prompt:'是否移除金剑元，令此伤害+1',
						content:function(){
							player.removeSkill('yb_jianyuan_jin');
							trigger.num++;
						},
					}
				}
			},
			yb_jianyuan_mu:{
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				},
				zhuijia:['是否移除木剑元，然后摸等同体力上限数量的牌'],
				frequent:true,
				filter:function(event,player){
					if(player.countCards('h')) return false;
					var evt=event.getl(player);
					return evt&&evt.player==player&&evt.hs&&evt.hs.length>0;
				},
				mark:true,
				marktext:'木',
				intro:{
					name:'木剑元',
					content:'expansion',
					markcount:'expansion',
					mark:function(dialog,storage,player){
						if(player.getExpansions('yb_jianyuan_jin')){
							var content=player.getExpansions('yb_jianyuan_mu');
							dialog.addAuto(content);
							dialog.addText('当你失去最后的手牌时，你可以摸一张牌，<span class=yellowtext>然后你可以移除木剑元并摸等同体力上限的牌数。</span>');
						}
						else{dialog.addText('你现在并没有木剑元');}
					},
				},
				nobracket:true,
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
					player.unmarkSkill(skill);
				},
				content:function(){
					'step 0'
					player.draw();
					player.chooseBool(get.prompt('yb_jianyuan_mu',player),lib.skill.yb_jianyuan_mu.zhuijia);
					'step 1'
					if(result.bool){
						player.removeSkill('yb_jianyuan_mu');
						player.draw(player.maxHp);
					}
				},
				ai:{
					threaten:0.8,//嘲讽值
					effect:{
						target:function(card){
							if(card.name=='guohe'||card.name=='liuxinghuoyu') return 0.5;
						}
					},
					noh:true,
					skillTagFilter:function(player,tag){
						if(tag=='noh'){
							if(player.countCards('h')!=1) return false;
						}
					}
				}
			},
			yb_jianyuan_tu:{
				mark:true,
				marktext:'土',
				intro:{
					name:'土剑元',
					content:'expansion',
					markcount:'expansion',
					mark:function(dialog,storage,player){
						if(player.getExpansions('yb_jianyuan_jin')){
							var content=player.getExpansions('yb_jianyuan_tu');
							dialog.addAuto(content);
							dialog.addText('你可以将一张装备牌当【无中生有】使用。<span class=yellowtext>当你受到伤害时，你可以移除土剑元，令伤害-1。</span>');
						}
						else{dialog.addText('你现在并没有土剑元');}
					},
				},
				nobracket:true,
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
					player.unmarkSkill(skill);
				},
				enable:['chooseToUse'],
				filterCard:function(card,player){
					return get.type(card)=='equip';
				},
				position:'hes',
				viewAs:{name:'wuzhong'},
				viewAsFilter:function(player){
					if(!player.countCards('hes',{type:'equip'})) return false;
				},
				prompt:'将一张装备牌当无中生有使用',
				check:function(card){
					var val=get.value(card);
					if(_status.event.name=='chooseToRespond') return 1/Math.max(0.1,val);
					return 5-val;
				},
				group:'yb_jianyuan_tu_remove',
				subSkill:{
					remove:{
						trigger:{
							player:'damageBegin3',
						},
						prompt:'是否移除土剑元，令此伤害-1',
						content:function(){
							player.removeSkill('yb_jianyuan_tu');
							trigger.num--;
						},
					}
				}
			},
			yb_jianyuan_huo:{
				mark:true,
				marktext:'火',
				intro:{
					name:'火剑元',
					content:'expansion',
					markcount:'expansion',
					mark:function(dialog,storage,player){
						if(player.getExpansions('yb_jianyuan_jin')){
							var content=player.getExpansions('yb_jianyuan_huo');
							dialog.addAuto(content);
							dialog.addText('出牌阶段限一次，你可以将所有手牌当任意锦囊使用。<span class=yellowtext>当你使用牌指定目标后，你可以移除火剑元，弃置此牌目标各一张牌。</span>');
						}
						else{dialog.addText('你现在并没有火剑元');}
					},
				},
				nobracket:true,
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
					player.unmarkSkill(skill);
				},
				inherit:'qice',
				audio:false,
				group:'yb_jianyuan_huo_remove',
				subSkill:{
					remove:{
						trigger:{
							player:'useCard',
						},
						prompt:'是否移除火剑元，弃置此牌目标各一张牌',
						filter:function(event,player){
							if(!event.targets||event.targets.length<1)return false;
							return true;
						},
						content:function(){
							'step 0'
							player.removeSkill('yb_jianyuan_huo');
							var targets=trigger.targets;
							for (var i of targets){
								player.discardPlayerCard(i,'he',1,true);
							}
						}
					}
				}
			},
			yb_jianyuan_shui:{
				mark:true,
				marktext:'水',
				intro:{
					name:'水剑元',
					content:'expansion',
					markcount:'expansion',
					mark:function(dialog,storage,player){
						if(player.getExpansions('yb_jianyuan_jin')){
							var content=player.getExpansions('yb_jianyuan_shui');
							dialog.addAuto(content);
							dialog.addText('当你成为其他角色使用【杀】的目标时，你可以依次选择是否①弃置一张牌，将此杀【流离】出去；<span class=yellowtext>②移除水剑元，然后与一名可成为【流离】目标的其它角色互换座位。</span>');
						}
						else{dialog.addText('你现在并没有水剑元');}
					},
				},
				nobracket:true,
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
					player.unmarkSkill(skill);
				},
				trigger:{target:'useCardToTarget'},
				direct:true,
				preHidden:true,
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					return game.hasPlayer(function(current){
						return player.inRange(current)&&current!=event.player&&
							current!=player&&lib.filter.targetEnabled(event.card,event.player,current);
					});
				},
				content:function(){
					"step 0"
					var next=player.chooseCardTarget({
						position:'he',
						filterCard:lib.filter.cardDiscardable,
						filterTarget:function(card,player,target){
							var trigger=_status.event;
							if(player.inRange(target)&&target!=trigger.source){
								if(lib.filter.targetEnabled(trigger.card,trigger.source,target)) return true;
							}
							return false;
						},
						ai1:function(card){
							return get.unuseful(card)+9;
						},
						ai2:function(target){
							if(_status.event.player.countCards('h','shan')){
								return -get.attitude(_status.event.player,target);
							}
							if(get.attitude(_status.event.player,target)<5){
								return 6-get.attitude(_status.event.player,target);
							}
							if(_status.event.player.hp==1&&player.countCards('h','shan')==0){
								return 10-get.attitude(_status.event.player,target);
							}
							if(_status.event.player.hp==2&&player.countCards('h','shan')==0){
								return 8-get.attitude(_status.event.player,target);
							}
							return -1;
						},
						prompt:get.prompt('yb_jianyuan_shui'),
						prompt2:'弃置一张牌，将此【杀】转移给攻击范围内的一名其他角色',
						source:trigger.player,
						card:trigger.card,
					}).setHiddenSkill(event.name);
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						player.logSkill(event.name,target);
						player.discard(result.cards);
						var evt=trigger.getParent();
						evt.triggeredTargets2.remove(player);
						evt.targets.remove(player);
						evt.targets.push(target);
					}
					"step 2"
					var next=player.chooseTarget('是否移除水剑元，与一名能成为流离目标的玩家交换座位？现在由于作者菜，这个没写出来……',function(card,player,target){
						var trigger=_status.event;
						if(player.inRange(target)&&target!=trigger.source){
							if(lib.filter.targetEnabled(trigger.card,trigger.source,target)) return true;
						}
						return false;
						// return target!=player;
					}
					/*{
						// filterCard:()=>false,
						filterTarget:function(card,player,target){
							var trigger=_status.event;
							if(player.inRange(target)&&target!=trigger.source){
								if(lib.filter.targetEnabled(trigger.card,trigger.source,target)) return true;
							}
							return false;
						},
						// selectCard:false,
						ai:function(target){
							return -1;
						},
						prompt:get.prompt('yb_jianyuan_shui'),
						prompt2:'是否移除水剑元，与一名能成为流离目标的玩家交换座位？',
						source:trigger.player,
						card:trigger.card,
					}
					*/
					).setHiddenSkill(event.name);
					"step 3"
					if(result.bool){
						var target=result.targets[0];
						player.logSkill(event.name,target);
						game.broadcastAll(function(target1,target2){
							game.swapSeat(target1,target2);
						},player,target)
					}
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(target.countCards('he')==0) return;
							if(card.name!='sha') return;
							var min=1;
							var friend=get.attitude(player,target)>0;
							var vcard={name:'shacopy',nature:card.nature,suit:card.suit};
							var players=game.filterPlayer();
							for(var i=0;i<players.length;i++){
								if(player!=players[i]&&
									get.attitude(target,players[i])<0&&
									target.canUse(card,players[i])){
									if(!friend) return 0;
									if(get.effect(players[i],vcard,player,player)>0){
										if(!player.canUse(card,players[0])){
											return [0,0.1];
										}
										min=0;
									}
								}
							}
							return min;
						}
					}
				},
				audio:false,
			},
			/*
			'yb028_jianzhen_info':
			'（初稿待定）苏婆夏洛特，出牌阶段限一次或当你受到伤害（伤害至少为一）后，你可以摸一张牌，
					然后将一张手牌置于武将牌上称为“剑元”，同时为此“剑元”绑定一个装备栏
					（被绑定的装备栏若未被废除，则在绑定时废除）<br>根据剑元对应的装备栏获得如下技能。
			<br>武器栏：金剑元，锁定技，你的攻击范围加2；当你使用杀时，你无视对方防具。当你造成伤害时，你可以移除金剑元，令伤害+1。
			<br>防具栏：土剑元，你可以将一张装备牌当【无中生有】使用。当你受到伤害时，你可以移除土剑元，令伤害-1。
			<br>进攻马：火剑元，出牌阶段限一次，你可以将所有手牌当任意锦囊使用。当你使用牌指定目标后，你可以移除火剑元，令此牌所有目标各弃一张牌。
			<br>防御马：水剑元，当你成为其他角色使用【杀】的目标时，你可以选择至多两项①弃置一张牌，将此杀【流离】出去；
									②移除水剑元，然后与一名可成为【流离】目标的其它角色互换座位。
			<br>宝物栏：木剑元，当你失去最后的手牌时，你可以摸一张牌，然后你可以移除木剑元并摸等同体力上限的牌数。',
			
			*/
			'yb028_sheshen':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{player:'disableEquipAfter'},
				forced:true,
				content:function(){
					'step 0'
					player.chooseTarget(true).set('prompt','请选择一名角色，令其摸两张牌并回复一点体力').set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target)/Math.sqrt(1+target.countCards('h'));
						return att;
					});
					'step 1'
					if(result.bool){
						var tar=result.targets[0];
						tar.draw(2);
						tar.recover();
						player.loseMaxHp();
					}
				},
				group:['yb028_sheshen_max'],
				subSkill:{
					max:{
						mod:{
							maxHandcard:function (player,num){
								var numb=player.countDisabled();
								return num+numb;
							},
						},
						trigger:{
							player:'loseMaxHpBegin',
						},
						forced:true,
						filter:(event,player)=>(player.maxHp<=1),
						content:()=>{trigger.cancel();},
					}
				}
			},
			/*
			'yb028_sheshen_info':
			'（初稿待定）锁定技，当你装备栏被废除时，你令一名角色摸两张牌并回复一点体力，然后你减一点体力上限；
			你的手牌上限额外增加被废除装备栏的数量；
			当你体力上限不大于1时，你无法扣减体力上限。',
			
			*/
			'yb028_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			//---------------------黎
			'yb029_chonghui':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:['useCard','respond'],
				},
				filter:function(event,player){
					return (!player.getStorage('yb029_chonghui2').contains(event.card.name)&&!event.card.isCard);
				},
				frequent:true,
				content:function(){
					'step 0'
					game.delay(0.5);
					player.draw();
					'step 1'
					if(!player.storage.yb029_chonghui2) player.storage.yb029_chonghui2=[];
					player.storage.yb029_chonghui2.push(trigger.card.name);
					player.addTempSkill('yb029_chonghui2');
				},
				group:['yb029_chonghui_juedou','yb029_chonghui_youdishenru'],
				subSkill:{
					youdishenru:{
						audio:'yb029_chonghui',
						usable:1,
						enable:['chooseToUse'],
						filterCard:1,
						viewAs:{name:'youdishenru'},
						prompt:'将一张手牌当作诱敌深入使用',
						check:function(event,player,card){
							if(event.card=='shan')return 0.5;
							return 1.5;
						},
						position:'hs',
						viewAsFilter:function(player){
							if(!player.countCards('hs')) return false;
						},
						ai:{
							skillTagFilter:function(player){
								if(!player.countCards('hs')) return false;
							},
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'respondShan')&&current<0) return 0.6
								}
							},
							order:4,
							useful:-1,
							value:-1
						}
					},
					juedou:{
						audio:'yb029_chonghui',
						usable:1,
						enable:['chooseToUse'],
						filterCard:1,
						viewAs:{name:'juedou'},
						prompt:'将一张手牌当作决斗使用',
						check:function(event,player,card){
							if(event.card=='sha')return 0.5;
							return 1.5;
						},
						position:'hs',
						viewAsFilter:function(player){
							if(!player.countCards('hs')) return false;
						},
						ai:{
							skillTagFilter:function(player){
								if(!player.countCards('hs')) return false;
							},
							order:4,
							useful:-1,
							value:-1
						}
					},
				},
			},
			'yb029_chonghui2':{onremove:true},
			'yb029_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			//--------------------书
			yb030_jiangdao:{
				audio:'yb030_rejiangdao',
				group:['yb030_rejiangdao_1','yb030_rejiangdao_2'],
			},
			yb030_rejiangdao:{
				audio:'ext:夜白神略/audio/character:2',
				group:['yb030_rejiangdao_1','yb030_rejiangdao_2','yb030_rejiangdao_3'],
				subSkill:{
					1:{},
					2:{},
					3:{},
				},
			},
			/*
			'yb030_jiangdao':'讲道',
			'yb030_jiangdao_info':'出牌阶段限一次，你可以视为使用一张五谷丰登；
			当你成为五谷丰登的目标时，你可以将任意手牌与展示的牌进行替换。',
			'yb030_lunyi':'论义',
			'yb030_lunyi_info':'每回合限一次，当你受到其他角色造成的伤害时，你可以展示一张手牌，
			若伤害来源不弃置与之同花色或点数的牌，则此伤害无效，若其弃置了一张同点数的牌，则此伤害加一。',
			*/
			//--------------------------幻晴
			'yb031_lihun':{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				filterCard:true,
				position:'he',
				content:function(){
					player.gainPlayerCard(target,true,'h',target.countCards('h'));
					player.addSkill('yb031_lihun2');
					player.storage.yb031_lihun=target;
					player.markSkill('yb031_lihun2');
				},
				check:function(card){return 8-get.value(card)},
				ai:{
					order:10,
					result:{
						player:function(player){
							if(player.classList.contains('turnedover')) return 10;
							return 0;
						},
						target:function(player,target){
							if(target.countCards('h')>target.hp) return target.hp-target.countCards('h');
							return 0;
						}
					},
					threaten:1.5,//嘲讽值
					effect:{
						target:function(card){
							if(card.name=='guiyoujie') return [0,2];
						}
					}
				},
				group:['yb031_lihun_2'],
				subSkill:{
					2:{
						trigger:{player:'phaseUseBefore'},
						direct:true,
						filter:function(event,player){
							if(!player.hasSkill('yb031_lihun2')) return false;
							return true;
						},
						content:()=>{player.removeSkill('yb031_lihun2')},
					},
				},
			},
			'yb031_lihun2':{
				trigger:{player:'phaseUseEnd'},
				forced:true,
				popup:false,
				audio:false,
				mod:{
					globalFrom:function (from,to){
						if(from.storage.yb031_lihun&&from.storage.yb031_lihun.contains(to))return -Infinity;
					},
				},
				intro:{
					content:function(content,player){
						return '至'+get.translation(player.storage.yb031_lihun)+'的距离视为1';
					},
				},
				content:function(){
					"step 0"
					var cards=player.getCards('he');
					player.removeSkill('yb031_lihun2');
					if(player.storage.yb031_lihun.classList.contains('dead')||player.storage.yb031_lihun.hp<=0||cards.length==0){
						event.finish();
					}
					else{
						if(cards.length<player.storage.yb031_lihun.hp) event._result={bool:true,cards:cards};
						else player.chooseCard('he',true,player.storage.yb031_lihun.hp,'离魂：选择要交给'+get.translation(player.storage.yb031_lihun)+'的牌');
						player.turnOver();
					}
					"step 1"
					player.storage.yb031_lihun.gain(result.cards,player);
					player.$give(result.cards.length,player.storage.yb031_lihun);
				}
			},
			'yb031_wanyue':{
				inherit:'yb001_wanyue',
				audio:'ext:夜白神略/audio/character:2',
			},
			'yb031_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			//----------------------白衣尘
			'yb032_tonglv':{
				audio:'ext:夜白神略/audio/character:2',
			},
			'yb032_zhuiji':{
				audio:'ext:夜白神略/audio/character:2',
			},
			'yb032_duanchang':{
				audio:'ext:夜白神略/audio/character:2',
			},
			//---------------------小慧
			'yb033_huiyue':{
				audio:'ext:夜白神略/audio/character:2',
				skillAnimation:true,
				animationColor:'YB_snow',
				forced:true,
				trigger:{player:'phaseBegin'},
				filter:(event,player)=>{
					var num=(player.maxHp*2)/3;
					return player.hp>num&&!player.hasSkill('yb033_shuhui');
				},
				content:function(){
					player.addSkill('yb033_shuhui');
				},
				derivation:['yb033_shuhui','yb033_yuqi','yb014_lvxin'],
				group:['yb033_huiyue_yuqi','yb033_huiyue_lvxin','yb033_huiyue_botu'],
				subSkill:{
					yuqi:{
						audio:'yb033_huiyue',
						forced:true,
						skillAnimation:true,
						animationColor:'YB_snow',
						trigger:{player:'damageBegin4'},
						filter:(event,player)=>{
							if(player.hasSkill('yb033_yuqi')) return player.hasSkill('yb033_shuhui')&&!player.storage.yb033_shuhui;
							return true;
						},
						content:()=>{
							if(!player.hasSkill('yb033_yuqi')) player.addSkill('yb033_yuqi');
							if(player.hasSkill('yb033_shuhui')) {
								player.storage.yb033_shuhui=true;
								game.log(player,'修改了','#b淑慧');
							}
						},
					},
					lvxin:{
						audio:'yb033_huiyue',
						forced:true,
						skillAnimation:true,
						animationColor:'YB_snow',
						trigger:{player:'phaseJieshuBegin'},
						filter:(event,player)=>{
							if(player.hasSkill('yb014_lvxin'))return false;
							var history=player.getHistory('useCard',function(evt){
								return evt.isPhaseUsing();
							});
							var suits=[];
							for(var i=0;i<history.length;i++){
								var suit=get.type2(history[i].card);
								if(suit) suits.add(suit);
							}
							return suits.length>=2;
						},
						content:()=>{
							player.addSkill('yb014_lvxin');
						},
					},
					botu:{
						audio:'yb033_huiyue',
						forced:true,
						round:1,
						trigger:{player:'phaseJieshuBegin'},
						filter:(event,player)=>{
							var history=player.getHistory('useCard',function(evt){
								return evt.isPhaseUsing();
							});
							var suits=[];
							for(var i=0;i<history.length;i++){
								var suit=get.type2(history[i].card);
								if(suit) suits.add(suit);
							}
							return suits.length>=3;
						},
						content:()=>{
							player.insertPhase();
						},
					},
				},
			},
			'yb033_shuhui':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'phaseBegin',
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseCardTarget({
						position:'h',
						selectCard:1,
						selectTarget:1,
						filterCard:lib.filter.cardDiscardable,
						filterTarget:function(card,player,target){
							// var att=get.attitude(_status.event.player,target);
							// return false;
							return ui.selected.cards.length==1;
						},
						ai1:function(card){
							return get.unuseful(card)+9;
						},
						ai2:function(target){
							var att=get.attitude(_status.event.player,target);
							// return false;
							if(target.isDamaged()&&att>0){
								return Math.min(2,5-target.hp);
							}
							if(att<0){
								return Math.min(1,4-target.hp);
							}
							return -1;
						},
						prompt:'请选择一名角色和一张手牌，令其掉血或回血。'
					});
					'step 1'
					if(result.bool){
						event.card=result.cards[0];
						event.target=result.targets[0];
						var list=[];
						if(event.target.isDamaged())list.push('回血');
						list.push('掉血');
						if(list.length==1)event._result={control:list[0],};
						else player.chooseControl(list).set('prompt','请选择令'+get.translation(event.target)+'回血还是掉血');
					}
					'step 2'
					switch(result.control){
						case '回血':player.discard(event.card);event.target.recover();delete result.control;break;
						case '掉血':player.discard(event.card);event.target.loseHp();delete result.control;break;
					}
					'step 3'
					if(player.storage.yb033_shuhui==true){
						var card=get.cards(1);
						event.numb=get.number(card[0]);
						event.card=card;
						// event.numa=numa+2;
					}
					else{event.finish();}
					'step 4'
					player.showCards(event.card);
					var list=lib.skill.yb033_yuqi.getInfo(player);
					let min = list[0], index = 0;
					for (let i = 1; i < list.length; ++i) {
						if (list[i] < min) { 
							min = list[i];
							index = i;
						}
					}
					event.numa=min;
					event.numc=Math.min(event.numa+2,event.numb);
					player.chooseControl('<span class=thundertext>蓝色('+list[0]+')</span>','<span class=firetext>红色('+list[1]+')</span>','<span class=greentext>绿色('+list[2]+')</span>','<span class=yellowtext>黄色('+list[3]+')</span>','cancel2').set('prompt',get.prompt('yb033_shuhui')).set('prompt2','令〖隅泣〗中的一个数字改为'+(event.numc)+'，新数字不会小于原数字').set('ai',function(){
						// for(var i=0;i<list.length;i++){
						// 	if(Math.min(list)==list[i]) return i;
						// }
						// return i;//夜白专用邪修写法
						let min = list[0], index = 0;
						for (let i = 1; i < list.length; ++i) {
							if (list[i] < min) { 
								min = list[i];
								index = i;
							}
						}
						return index;//R佬的指点迷津
					});
					'step 5'
					if(result.control&&result.control!='cancel2'){
						// player.logSkill('shanshen',trigger.player);
						var list=lib.skill.yb033_yuqi.getInfo(player);
						list[result.index]=Math.max(event.numc,list[result.index]);
						game.log(player,'将',result.control,'数字改为','#y'+list[result.index])
						player.markSkill('yb033_yuqi');
						// if(event.goon) player.recover();
					}
				}
			},
			'yb033_yuqi':{
				audio:'ext:夜白神略/audio/character:2',
				usable:3,
				trigger:{global:'damageEnd'},
				init:function(player){
					if(!player.storage.yb033_yuqi) player.storage.yb033_yuqi=[2,3,2,2];
				},
				getInfo:function(player){
					if(!player.storage.yb033_yuqi) player.storage.yb033_yuqi=[2,3,2,2];
					return player.storage.yb033_yuqi;
				},
				filter:function(event,player){
					var list=lib.skill.yb033_yuqi.getInfo(player);
					// if(event.player.hasMark('yb033_shuhui_mark')) return true;
					return event.player.isIn()&&get.distance(player,event.player)<=list[0];
				},
				logTarget:'player',
				content:function(){
					'step 0'
					event.list=lib.skill.yb033_yuqi.getInfo(player);
					player.YB_yuqi(['隅泣',event.list[1],event.list[2],event.list[3]],trigger.player);
					// 'step 1'
					// if(trigger.player.hasMark('yb033_shuhui_mark')){
					// 	player.chooseControl(['ok2','cancel2']).set('prompt','是否移除其“诉”标记？').set('prompt2','然后其回复一点体力。').set('ai',function(control){
					// 		var att=get.attitude(_status.event.player,trigger.player);
					// 		if(att>0)return 'ok2';
					// 		return 'cancel2';
					// 	})
					// }
					// else{event.finish();}
					// 'step 2'
					// if(result.control=='ok2'){
					// 	trigger.player.removeMark('yb033_shuhui_mark');
					// 	trigger.player.recover();
					// }
				},
				mark:true,
				intro:{
					content:function(storage,player){
						var info=lib.skill.yb033_yuqi.getInfo(player);
						return '<div class="text center"><span class=thundertext>蓝色：'+info[0]+'</span>　<span class=firetext>红色：'+info[1]+'</span><br><span class=greentext>绿色：'+info[2]+'</span>　<span class=yellowtext>黄色：'+info[3]+'</span></div>'
					},
				},
			},
			'yb033_lvxin':{
				// inherit:'yb014_lvxin',
				audio:'ext:夜白神略/audio/character:2',
			},
			//---------------------周怜渊
			yb034_bifa:{
				// usable:1,
				enable:'phaseUse',
				audio:'ext:夜白神略/audio/character:2',
				// init:function(player){
				// 	player.storage.yb034_bifa=[];
				// },
				filter:function(event,player){
					if(player.countCards('h')<=0) return false;
					return game.countPlayer(function(current){
						return current.hasSkill('yb034_bifa_card');
					})<=0;
				},
				filterTarget:function(card,player,target){
					return player!=target;
				},
				filterCard:true,
				check:function(card){
					return 8-get.value(card);
				},
				discard:false,
				lose:false,
				delay:false,
				position:'h',
				content:function(){
					'step 0'
					player.give(cards[0],target);
					target.storage.yb034_bifa_card=cards[0];
					target.addTempSkill('yb034_bifa_card','YB_anyAfter');
				},
				check:function(card){return 8-get.value(card)},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							return -target.countCards('he')-(player.countCards('h','du')?1:0);
						}
					},
					threaten:2,//嘲讽值
				},
				subSkill:{
					card:{
						trigger:{player:'die'},
						direct:true,
						onremove:true,
						forceDie:true,
						filter:function(event,player){
							return game.countPlayer(function(current){
								return current.hasSkill('yb034_bifa');
							})>0;
						},
						content:()=>{
							var list=game.filterPlayer(function(current){
								return current.hasSkill('yb034_bifa');
							});
							for (var i of list){
								i.logSkill('yb034_bifa',i);
								i.draw();
							}
						},
						mod:{
							cardEnabled2:function(card,player){
								if(!player.storage.yb034_bifa_card){
									if(get.position(card)=='h') return false;
								}
								else if(get.position(card)=='h'&&get.color(card)==get.color(player.storage.yb034_bifa_card)) return false;
							},
						},
						mark:true,
						marktext:'禁',
						intro:{
							name:'笔伐',
							content:function(storage,player){
								var str='不能使用或打出';
								if(player.storage.yb034_bifa_card)str+=get.translation(get.color(player.storage.yb034_bifa_card));
								str+='手牌。'
								return str;
							},
						},
					},
				},
			},
			yb034_rebifa:{
				// usable:1,
				enable:'phaseUse',
				audio:'ext:夜白神略/audio/character:2',
				filter:function(event,player){
					if(player.countCards('h')<=0) return false;
					return game.countPlayer(function(current){
						return current.hasSkill('yb034_bifa_card');
					})<=0;
				},
				filterTarget:function(card,player,target){
					return player!=target;
				},
				filterCard:true,
				check:function(card){
					return 8-get.value(card);
				},
				discard:false,
				lose:false,
				delay:false,
				position:'h',
				content:function(){
					'step 0'
					player.give(cards[0],target);
					if(target.storage.yb034_bifa_card)delete target.storage.yb034_bifa_card;
					target.addTempSkill('yb034_bifa_card','YB_anyAfter');
				},
				check:function(card){return 8-get.value(card)},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							return -target.countCards('he')-(player.countCards('h','du')?1:0);
						}
					},
					threaten:2,//嘲讽值
				},
			},
			yb034_jiandao:{
				inherit:'yb034_rejiandao',
				filter:function(event,player){
					return player.getEquip(1);
				},
			},
			yb034_rejiandao:{
				mod:{
					maxHandcard:function (player,num){
						return num+1;
					},
					cardUsable:function(card,player){
						if(card.name=='sha'&&card.storage&&card.storage.xxx) return Infinity;
					},
				},
				audio:'ext:夜白神略/audio/character:2',
				usable:1,
				enable:'phaseUse',
				viewAs:{name:'sha',isCard:true,storage:{xxx:true,},xxx:true},
				filterCard:function(){return false},
				selectCard:-1,
				prompt:'视为使用一张杀（无次数限制）',
			},
			'yb034_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			ybceshijineng1:{
				mod:{
					targetInRange:function(card,player,target,now){
						if(card.name=='sha'&&card.storage&&card.storage.xx) return true;
					},
				},
				usable:2,
				enable:'phaseUse',
				viewAs:{name:'sha',nature:'thunder',storage:{xx:true,}},
				filterCard:function(){return false},
				selectCard:-1,
				prompt:'视为使用一张雷杀（无距离限制）',
				precontent:function(){
					player.link(true);
					var next=game.createEvent('afterEffect',null,{next:[]});
					next.player=player;
					next.setContent(function(){
						var history=player.getHistory('useCard',evt=>evt.parent==event.parent);
						if(history.length){
							for(var target of history.map(value=>value.targets).flat()){
								target.link(true);
							}
						}
					});
					event.parent.after.unshift(next);
				}
			},
			/*
			'yb034_rebifa':'笔伐',
			'yb034_rebifa_info':'出牌阶段，若场上没有被此技能选择的角色，你可以展示一张手牌并交给一名其他角色，然后该角色不能使用或打出手牌直到此阶段结束。若被此技能选择的目标于此阶段阵亡，你摸一张牌。',
			'yb034_bifa':'笔伐',
			'yb034_bifa_info':'出牌阶段，若场上没有被此技能选择的角色，你可以展示一张手牌并交给一名其他角色，然后该角色不能使用或打出与此牌同颜色的手牌直到此阶段结束。若被此技能选择的目标于此阶段阵亡，你摸一张牌。',
			'yb034_rejiandao':'剑道',
			'yb034_rejiandao_info':'锁定技，你的手牌上限加一，且获得如下效果：出牌阶段限一次，你可以视为使用一张【杀】（无次数限制）。',
			'yb034_jiandao':'剑道',
			'yb034_jiandao_info':'锁定技，若你已装备武器牌，你的手牌上限加一，且获得如下效果：出牌阶段限一次，你可以视为使用一张【杀】。',
			*/
			//---------------------玺
			//---------------------熙
			'yb036_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			//----------------------方块Q
			'yb037_yizhong':{
				trigger:{target:'shaBefore'},
				forced:true,
				audio:'ext:夜白神略/audio/character:2',
				filter:function(event,player){
					if(player.getEquip(2)) return false;
					return (event.card.name=='sha'&&get.color(event.card)=='black')
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(player==target&&get.subtype(card)=='equip2'){
								if(get.equipValue(card)<=8) return 0;
							}
							if(target.getEquip(2)) return;
							if(card.name=='sha'&&get.color(card)=='black') return 'zerotarget';
						}
					}
				}
			},
			'yb037_kexie':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{player:'loseAfter'},
				forced:true,
				marktext:'咳',
				mark:true,
				intro:{
					name:'咳血',
					content:"mark",
				},
				filter:function(event,player){
					if(event.type!='discard') return false;
					return true;
				},
				content:function(){
					'step 0'
					event.count=0;
					var evt=trigger.getl(player);
					if(player.countMark('yb037_kexie')==0){
						event.count=trigger.num;
						event.goto(1);
					};
					if(player.countMark('yb037_kexie')==1){
						for(var i=0;i<evt.cards2.length;i++){
							if(get.color(evt.cards2[i],player)=='red') event.count++;
						}
						event.goto(1)
					};
					if(player.countMark('yb037_kexie')>=2){
						for(var i=0;i<evt.cards2.length;i++){
							if(get.suit(evt.cards2[i],player)=='heart') event.count++;
						}
						event.goto(1)
					};
					'step 1'
					player.loseHp(event.count);
				},
				
			},
			'yb037_guiling':{
				trigger:{player:'damageBegin4'},
				forced:true,
				audio:'ext:夜白神略/audio/character:2',
				filter:function(event,player){
					if(player.getEquip(2)) return false;
					if(event.num<=1) return false;
					if(player.hasSkillTag('unequip2')) return false;
					if(event.source&&event.source.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return true;
				},
				content:function(){
					trigger.num=1;
				},
				group:['yb037_guiling_1','yb037_guiling_2'],
				subSkill:{
					1:{
						audio:'ext:夜白神略/audio/character:2',
						trigger:{player:['dyingAfter']},
						forced:true,
						filter:function(event,player){
							if(!player.hasSkill('yb037_kexie')) return false;
							return true;
						},
						content:function(){
							if(player.countMark('yb037_kexie')<2){
								player.addMark('yb037_kexie');
							}
							else{
								player.removeSkill('yb037_kexie');
							}
						},
						sub:true,
					},
					2:{
						audio:'ext:夜白神略/audio/character:2',
						trigger:{player:['dying']},
						filter:function (event,player){
							return event.getParent(2)&&event.getParent(2).name=='yb037_kexie';
						},
						forced:true,
						content:function(){
							if(player.maxHp>3)player.loseMaxHp();
							if(player.hp<1) player.recover(player.maxHp-player.hp);
						},
						sub:true,
					},
				},
				ai:{
					filterDamage:true,
					skillTagFilter:function(player,tag,arg){
						if(player.hasSkillTag('unequip2')) return false;
						if(arg&&arg.player){
							if(arg.player.hasSkillTag('unequip',false,{
								name:arg.card?arg.card.name:null,
								target:player,
								card:arg.card,
							})) return false;
							if(arg.player.hasSkillTag('unequip_ai',false,{
								name:arg.card?arg.card.name:null,
								target:player,
								card:arg.card,
							})) return false;
							if(arg.player.hasSkillTag('jueqing',false,player)) return false;
						}
					},
					effect:{
						target:function(card,player,target){
							if(player==target&&get.subtype(card)=='equip2'){
								if(get.equipValue(card)<=8) return 0;
							}
							if(target.getEquip(2)) return;
							
						}
					}
				},
			},
			'yb037_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			//----------------------------------滕叔颖＆武宁
			'yb038_quanlu':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'useCard',
				},
				mark:true,
				marktext:'泉',
				intro:{
					name:'泉路',
					content:function(storage,player,skill){
						var str='本技能累积次数<li>';
						str+=player.storage.yb038_quanlu;
						str+='<br/>因此技能流失体力<li>';
						str+=get.translation(player.storage.ybsl_quan);
						str+='<br/>因此技能失去上限<li>';
						str+=get.translation(player.storage.ybsl_lu);
						return str;
					},
				},
				init:function(player,skill){
					player.storage.ybsl_quan=0;
					player.storage.ybsl_lu=0;
				},
				// onremove:true,
				forced:true,
				content:function (){
					'step 0'
					player.chooseToDiscard(1,'h',true).set('prompt','请选择弃置一张手牌');
					'step 1'
					if(player.countCards('h')==0){
						var list=['掉血','掉上限'];
						if(player.maxHp==player.hp){
							list.remove('掉上限');
						}
						player.chooseControl(list).set(
							'prompt2','请选择失去一点体力<span class=yellowtext>或</span>体力上限'
						).set('ai',function(player){
							if(player.hp>2||player.hp==player.maxHp)return '掉血';
							return '掉上限';
						});
					}
					'step 2'
					if(result.control=='掉血'){
						player.loseHp(1);
						event.kk=true;
						player.storage.ybsl_quan++;
					}
					else if(result.control=='掉上限'){
						player.loseMaxHp(1);
						event.kk=true;
						player.storage.ybsl_lu++;
					}
					'step 3'
					if(event.kk==true){
						var n=player.maxHp;
						if(n>5)n=5;
						player.draw(n);
						if(player.hasSkill('yb038_quanlu'))player.addMark('yb038_quanlu');
					}
				},
			},
			'yb038_wangyuan':{
				audio:'yb038_shenglu',
				trigger:{
					player:'phaseJieshuAfter',
				},
				forced:true,
				filter:function(event,player){
					return player.storage.ybsl_quan>0||player.storage.ybsl_lu>0;
				},
				content:function(){
					'step 0'
					var quan=player.storage.ybsl_quan;
					var lu=player.storage.ybsl_lu;
					player.recover(player.storage.ybsl_quan);
					player.gainMaxHp(player.storage.ybsl_lu);
					'step 1'
					player.storage.ybsl_quan=0;
					player.storage.ybsl_lu=0;
					game.log(player,'归还了',quan,'点体力和',lu,'点体力上限');
					'step 2'
					if(player.countMark('yb038_quanlu')>=3){
						player.removeMark('yb038_quanlu',3);
						player.gainMaxHp();
					}
				}
			},
			'yb038_shenglu':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'useCard',
				},
				locked:true,
				direct:true,
				content:function (){
					'step 0'
					player.chooseToDiscard(1,'he').set('prompt2','生路：是否弃置一张牌').set('ai',function(card){
						return 2-get.value(card);
					})
					'step 1'
					if(player.countCards('h')==0){
						var list=['掉血加上限','掉上限回血'];
						if(player.maxHp==player.hp){
							list.remove('掉上限回血');
						}
						player.chooseControl(list).set(
							'prompt2','请选择失去一点体力并增加一点体力上限<span class=yellowtext>或</span>失去一点体力上限并恢复一点体力'
						).set('ai',function(player){
							if(player.hp>2||player.hp==player.maxHp)return '掉血加上限';
							return '掉上限回血';
						});
					};
					'step 2'
					if(result.control=='掉血加上限'){
						player.loseHp();
						player.gainMaxHp();
						event.kk=true;
					}
					else if(result.control=='掉上限回血'){
						player.loseMaxHp();
						player.recover();
						event.kk=true;
					}
					'step 3'
					if(event.kk==true){
						var n=player.maxHp;
						if(n>5)n=5;
						player.draw(n);
					}
				},
			},
			'yb038_fusheng':{
				skillAnimation:true,
				animationColor:'YB_snow',
				unique:true,
				juexingji:true,
				audio:'ext:夜白神略/audio/character:2',
				derivation:['yb038_shenglu','yb038_enxu'],
				trigger:{
					player:'dying',
				},
				forced:true,
				filter:function (event,player){
					return !player.storage.yb038_fusheng;
				},
				content:function (){
					'step 0'
					var k=Math.abs(player.countMark('yb038_quanlu')-2);
					if(player.countMark('yb038_quanlu')>=3){player.gainMaxHp(k+1);}
					else{player.loseMaxHp(k);}
					event.k=player.countMark('yb038_quanlu')-2;
					if(event.k<1)event.k=1;
					'step 1'
					player.recover(event.k);
					'step 2'
					player.removeSkill('yb038_quanlu');
					player.addSkill('yb038_shenglu');
					player.addSkill('yb038_enxu');
					player.storage.yb038_fusheng=true;
					player.awakenSkill('yb038_fusheng');
				},
			},
			'ybtq_fusheng':{
				skillAnimation:true,
				animationColor:'YB_snow',
				unique:true,
				juexingji:true,
				audio:'ext:夜白神略/audio/character:2',
				derivation:['yb038_wangyuan','yb038_enxu'],
				trigger:{
					player:'dying',
				},
				forced:true,
				filter:function (event,player){
					return !player.storage.ybtq_fusheng;
				},
				content:function (){
					'step 0'
					var quan=player.storage.ybsl_quan;
					var lu=player.storage.ybsl_lu;
					player.gainMaxHp(player.storage.ybsl_lu);
					player.recover(player.storage.ybsl_quan);
					game.log(player,'归还了',quan,'点体力和',lu,'点体力上限');
					'step 1'
					player.storage.ybsl_quan=0;
					player.storage.ybsl_lu=0;
					player.gainMaxHp(2);
					'step 2'
					player.addSkill('yb038_wangyuan');
					player.addSkill('yb038_enxu');
					player.storage.ybtq_fusheng=true;
					player.awakenSkill('yb038_fusheng');
					player.removeMark('yb038_quanlu',player.storage.yb038_quanlu);
				},
			},
			'yb038_enxu':{
				groupSkill:true,
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				filterCard:true,
				usable:1,
				selectCard:0,
				filter:function(event,player){
					return player.group=='YB_memory';
				},
				filterTarget:function (card,player,target){
					if(!target.hasSex('male')) return false;
					if(target==player) return false;
					return true;
				},
				content:function (){
					'step 0'
					var n=player.maxHp;
					if(n>6)n=6;
					player.loseMaxHp(2);
					target.draw(n);
					'step 1'
					var c=Math.abs(player.hp-target.hp);
					if(c>0){
						player.hp>target.hp?target.recover(c):player.recover(c);
					};
				},
				ai:{
					order:3.5,
					result:{
						player:function (player){
							if(player.maxHp>=6) return 4;
							return -1;
						},
						target:4,
					},
					threaten:1.7,//嘲讽值
					expose:0.4,//跳立场
				},
			},
			'yb038_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			//--------------------查符039
			'yb039_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			yb039_zhifu:{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filterCard:function(card){
					var suit=get.suit(card);
					for(var i=0;i<ui.selected.cards.length;i++){
						if(get.suit(ui.selected.cards[i])==suit) return false;
					}
					return true;
				},
				selectCard:1,
				check:function(card){
					if(get.suit(card)=='heart') return 8-get.value(card);
					if(get.suit(card)=='diamond') return 8-get.value(card);
					return 6-get.value(card);
				},
				content:function(){
					'step 0'
					event.list=[get.suit(cards[0]),get.type2(cards[0]),get.number(cards[0])]
					'step 1'
					var nature,num,select;
					switch(event.list[0]){
						case 'spade':nature='thunder';break;
						case 'heart':nature='recover';break;
						case 'club':nature='ice';break;
						case 'diamond':nature='fire';break;
						default:nature='kami';break;
					}
					var numb=(Math.floor(Math.random()*13))<=event.list[2]?[2,3]:[1,1];
					if(get.isLuckyStar(player)) numb=[2,3];
					switch(event.list[1]){
						case 'basic':num=1;select=[1,1];break;
						case 'trick':num=1;select=[1,numb[1]];break;
						default:num=numb[0];select=[1,1];break;
					}
					if(player.hasSkill('yb039_feiyan')&&nature=='fire'){
						(Math.random()*2)>1?num++:select[1]++;
					}
					var cardx='ybsl_magic_'+nature+'_'+num+'_'+select[1];
					event.cardx=cardx;
					if(!lib.card[cardx]){
						lib.card[cardx]={
							audio:true,
							fullskin:true,
							type:'ybsl_magicbook',
							enable:true,
							selectTarget:select,
							damagenum:num,
							damagenature:nature,
							content:function(){
								'step 0'
								var num=(lib.card[get.name(event.card)].damagenum||1)
								event.baseDamage=num;
								var nature=(lib.card[get.name(event.card)].damagenature||'recover')
								event.nature=nature;
								'step 1'
								if(event.nature=='recover'){
									target.recover(event.baseDamage);
								}
								else{
									target.damage(event.baseDamage,event.nature);
								}
							},
							ai:{
								basic:{
									order:function(){
										return 11;
									},
									useful:[5,1],
									value:5,
								},
							},
						}
						if(lib.card[cardx].damagenature=='recover'){
							lib.card[cardx].filterTarget=function(card,player,target){
								return true;
							}
							lib.card[cardx].ai.result={
								target:function(player,target){
									return (target.hp<target.maxHp)?2:0;
								},
								tag:{
									recover:num,
									save:num,
								}
							}
						}
						else{
							lib.card[cardx].filterTarget=function(card,player,target){
								return player!=target;
							}
							lib.card[cardx].ai.result={
								target:function(player,target){
									return -2;
								},
								tag:{
									damage:function(card){
										return 1;
									},
									natureDamage:function(card){
										if(lib.card[card].damagenature) return 1;
									},
									fireDamage:function(card,nature){
										if(lib.card[card].damagenature=='fire') return 1;
									},
									thunderDamage:function(card,nature){
										if(lib.card[card].damagenature=='thunder') return 1;
									},
									iceDamage:function(card,nature){
										if(lib.card[card].damagenature=='ice') return 1;
									},
								}
							}
						}
						lib.translate[cardx+'_info']='出牌阶段，对'+(select[1]==1?'一':'至多'+get.cnNumber(select[1]))+'名'+(nature=='recover'?'':'其他')+'角色使用，目标'+
							(nature=='recover'?'回复':'受到')+get.cnNumber(num)+'点'+
							(nature=='fire'?'火属性伤害':'')+(nature=='thunder'?'雷属性伤害':'')+(nature=='ice'?'冰属性伤害':'')+(nature=='kami'?'神属性伤害':'')+'。';
						lib.translate.recover='愈';
						lib.translate.recover2='治愈';
						event.str=get.translation(nature)+get.cnNumber(select[1],true)+get.cnNumber(num,true);
						event.goto(2);
					}
					else{
						event.goto(4);
					}
					'step 2'
					player.FY_chooseText().set('prompt','请为这张牌命名<br>'+lib.translate[event.cardx+'_info']).set('ai', function () {
						return event.str;
					});
					'step 3'
					lib.translate[event.cardx]=result.text;
					'step 4'
					var cardxx=game.createCard(event.cardx,null,null,null);
					player.showCards(cardxx);
					player.gain(cardxx,'gain2');
				},
				ai:{
					order:8,
					result:{
						player:1,
					},
					// threaten:0.7,//嘲讽值
				},
			},
			yb039_feiyan:{
				audio:'ext:夜白神略/audio/character:2',
				charlotte:true,
				forced:true,
			},
			//--------------------安以040
			yb040_xuyuan:{
				audio:'ext:夜白神略/audio/character:2',
				usable:3,
				chongzhiji:true,
				chongzhiList:[
					'yihuajiemu',
					'ybsl_lumingqianzhuan',
					'ybsl_qisihuisheng'
				],
				init:function(player,skill){
					player.storage[skill+'_chongzhijiList']=lib.skill[skill].chongzhiList;
				},
				// getChongzhiList:function(player,skill){
				// 	if(!player.storage[skill]||player.storage.yb040_xuyuan.length==0){
				// 		player.storage.yb040_xuyuan=[];
				// 		for(var i = 0;i<lib.skill.yb040_xuyuan.chongzhiList.length;i++){
				// 			player.storage.yb040_xuyuan.add(lib.skill.yb040_xuyuan.chongzhiList[i]);
				// 		}
				// 	} 
				// 	return player.storage.yb040_xuyuan;
				// },
				mark:true,
				intro:{ // 标记描述
					content:function(storage,player){
						var storage=get.YB_chongzhiList(player,'yb040_xuyuan');//当前列表
						if(!storage) return '无';
						var list1=player.storage['yb040_xuyuan'+'_chongzhijiList'];//刷新列表
						// var list1=get.YB_chongzhijiList(player,'yb040_xuyuan');//刷新列表
						var str='<br>';
						for(var i=0;i<list1.length;i++){
							if(storage.contains(list1[i]))str+='<span class=yellowtext>'+get.translation(list1[i])+'</span><br>';
							else str+='<span style="opacity:0.5;">'+get.translation(list1[i])+'</span><br>';
						}
						for(var i=0;i<storage.length;i++){
							if(!list1.contains(storage[i]))str+='<span class=thundertext>'+get.translation(storage[i])+'</span><br>';
						}
						return '当前列表如下：'+str;
					},
					// markcount:"Infinity"// 标记数量为无限大，即不会因为没有技能使用次数而消失
				},
				enable:'chooseToUse',
				filter:function (event,player){
					var evt=lib.filter.filterCard;
					if(event.filterCard) evt=event.filterCard;
					var list=get.YB_chongzhiList(player,'yb040_xuyuan');
					for(var i=0;i<list.length;i++){
						if(evt({name:list[i]},player,event)) return true;
					};
					return false;
				},
				chooseButton:{
					dialog:function (event,player){
						var list=[];
						var list2=get.YB_chongzhiList(player,'yb040_xuyuan');
						for(var i=0;i<list2.length;i++){
							list.push(['<span style=\'color:#e328b7\'>许愿</span>','',list2[i]]);
						}
						return ui.create.dialog('<span style=\'color:#e328b7\'>许愿</span>',[list,'vcard']);
					},
					filter:function (button,player){
						return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
					},
					check:function (button){
						if(_status.event.getParent().type!='phase') return 1;
						var player=_status.event.player;
						return player.getUseValue({
							name:button.link[2],
							nature:button.link[3],
						});
					},
					backup:function (links,player){
						return {
							filterCard:function(card,player){
								var suit=get.suit(card);
								return true;
							},
							selectCard:[1,2],
							complexCard:true,
							position:'hs',
							audio:'yb040_xuyuan',
							popname:true,
							viewAs:{name:links[0][2],},
							precontent:function(){
								'step 0'
								player.logSkill('yb040_xuyuan');
								'step 1'
								var name=event.result.card.name;
								get.YB_chongzhiList(player,'yb040_xuyuan').remove(name);
							},
						};
					},
					prompt:function (links,player){
						return '将一手牌当作'+get.translation(links[0][2])+'使用';
					},
				},
				hiddenCard:function (player,name){
					var list=get.YB_chongzhiList(player,'yb040_xuyuan');
					return list.contains(name)&&player.countCards('hs')>=1;
				},
			},
			yb040_jumeng:{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'phaseZhunbei',
				},
				filter:function (event,player){
					return !event.numFixed;
				},
				frequent:true,
				content:function (){
					player.YB_shelie(3,'聚梦');
				},
				ai:{
					threaten:1.2,//嘲讽值
				},
			},
			/*
			'yb040_xuyuan':'许愿',
			'yb040_xuyuan_info':'重置技，每回合限三次，你可以将一张手牌当作以下锦囊之一使用：移花接木，鹿鸣千转，起死回生。',
			'yb040_jumeng':'聚梦',
			'yb040_jumeng_info':'准备阶段，你可以展示牌堆顶三张牌，获得其中每种花色的牌各一张。',
			*/
			//--------------------蘋姉042
			'yb042_sizhi':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'shizuku_sizhi',
			},
			'yb042_mingtui':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					target:'useCardToTargeted',
				},
				filter:function(event,player){
					if(event.card.number)return true;
				},
				check:function(event,player){
					var num=4;
					if(event.getParent().excluded.contains(player)) num/=2;
					if(get.attitude(player,event.player)>0){
						num*=0;
					}
					num-=get.effect(player,{name:event.card.name},event.player,player);
					return num>0;
				},
				content:function(){
					'step 0'
					var numa=trigger.card.number+1;
					player.chooseToDiscard([1,Infinity],'he').set('ai',function(card){
						var player=_status.event.player;
						var numa=_status.event.numa;
						//if(card.name!='tengjia'&&get.position(card)=='e'&&get.equipValue(card,player)<=0) return 14;
						var num=0;
						for(var i of ui.selected.cards){
							num+=i.number;
						}
						if(num>=numa) return 0;
						if(card.number+num>=numa) return 15-get.value(card);
						if(!ui.selected.cards.length){
							var min=_status.event.min;
							if(card.number<min&&!player.countCards('h',function(xcard){
								return xcard!=card&&card.number+xcard.number>min;
							})) return 0;
							return card.number;
						}
						return Math.max(5-get.value(card),card.number);
					}).set('prompt','请选择要弃置的牌').set('numa',numa).set('min',trigger.card.number+1).set('prompt2','选择的牌点数之和至少为'+(trigger.card.number+1)+'方能抵挡');
					var func=function(id){
						var dialog=get.idDialog(id);
						if(dialog) dialog.content.firstChild.innerHTML='请选择要弃置的牌';
					};
					if(player==game.me) func(event.videoId);
					else if(player.isOnline()) player.send(func,event.videoId);
					'step 1'
					if(result.cards){
						var numx=0;
						for(var i of result.cards){
							numx+=get.number(i);
						}
						event.numx=numx;
						if(event.numx>trigger.card.number){
							trigger.getParent().excluded.add(player);
						}
					}
				},
				/*
				mod:{
					aiValue:function(player,card,num){
						var numb=get.num(card);
						var numc=numb/6;
						return num+numb;
					},
					aiUseful:function(){
						return lib.skill.yb042_mingtui.mod.aiValue.apply(this,arguments);
					},
				},
				*/
			},
			'yb042_lisheng':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{global:'die'},
				forceDie:true,
				skillAnimation:true,
				animationColor:'thunder',
				frequent:true,
				filter:function(event,player){
					if(player.isAlive())return true;
					else{return event.player==player}
				},
				content:function(){
					'step 0'
					if(trigger.player!=player){
						event.player=player;
					}
					else{
						player.chooseTarget(get.prompt2('yb042_lisheng'),lib.filter.notMe).set('ai',function(target){
							return get.attitude(_status.event.player,target);
						});
					}
					'step 1'
					if(event.player.isAlive()){
						var tar=event.player;
					}
					else{var tar=result.targets[0];}
					var cards=[];
					for(var i of lib.suit){
						var card=get.cardPile2(function(card){
							return get.suit(card,false)==i;
						});
						if(card) cards.push(card);
					}
					if(tar){
						if(cards.length) tar.gain(cards,'gain2');
						tar.recover();
					}
				},
			},
			//--------------------房佳瑜043
			//--------------------胡瑞航044
			//--------------------高聪045
			//--------------------江雪舞046
			//--------------------彡047
			yb047_youhun:{
				audio:'ext:夜白神略/audio/character:2',
				enable:'chooseToUse',
				zhuanhuanji:true,
				mark:true,
				intro:{
					content:function(storage,player){
						var str=storage?'你可以将X+Y张牌当作任意一张基本使用。':'你可以将X+Y张牌当作任意一张普通锦囊牌使用。';
						str+='<br>（X为本轮此技能使用次数且至少为0，Y为本局游戏内以此法增加的体力上限数，且至少为0）';
						return str;
					},
				},
				marktext:'☯',
				init:function(player){
					player.storage.yb047_youhun=false;
				},
				hiddenCard:function(player,name){
					if(player.storage.yb047_youhun&&player.countDisabled()>=5) return false;
					var type=get.type(name);
					if(player.storage.yb047_youhun) return type=='basic';
					return type=='trick';
				},
				filter:function(event,player){
					if(player.storage.yb047_youhun&&player.countDisabled()>=5) return false;
					var type=player.storage.yb047_youhun?'basic':'trick';
					for(var name of lib.inpile){
						if(get.type(name)!=type) continue;
						if(event.filterCard({name:name,isCard:true},player,event)) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var dialog=ui.create.dialog('游魂','hidden');
						var type=player.storage.yb047_youhun?'basic':'trick';
						var list=[];
						for(var name of lib.inpile){
							if(get.type(name)!=type) continue;
							if(event.filterCard({name:name,isCard:true},player,event)){
								list.push([type,'',name]);
								if(name=='sha'){
									for(var j of lib.inpile_nature) list.push([type,'',name,j]);
								}
							}
						}
						dialog.add([list,'vcard']);
						return dialog;
					},
					filter:function(button){
						if(ui.selected.buttons.length&&typeof button.link==typeof ui.selected.buttons[0].link) return false;
						return true;
					},
					select:function(){
						return 1;
					},
					check:function(button){
						var player=_status.event.player;
						if(typeof button.link=='number'){
							var card=player.getEquip(button.link);
							if(card){
								var val=get.value(card);
								if(val>0) return 0;
								return 5-val;
							}
							switch(button.link){
								case 3:return 4.5;break;
								case 4:return 4.4;break;
								case 5:return 4.3;break;
								case 2:return (3-player.hp)*1.5;break;
								case 1:{
									if(game.hasPlayer(function(current){
										return (get.realAttitude||get.attitude)(player,current)<0&&get.distance(player,current)>1;
									})) return 0;
									return 3.2;
								}
							}
						}
						var name=button.link[2];
						var evt=_status.event.getParent();
						if(get.type(name)=='basic'){
							if(name=='shan') return 2;
							if(evt.type=='dying'){
								if(get.attitude(player,evt.dying)<2) return false;
								if(name=='jiu') return 2.1;
								return 1.9;
							}
							if(evt.type=='phase') return player.getUseValue({name:name,nature:button.link[3],isCard:true});
							return 1;
						}
						if(!['chuqibuyi','shuiyanqijunx','juedou','nanman','wanjian','shunshou','zhujinqiyuan'].contains(name)) return 0;
						var card={name:name,isCard:true};
						if(['shunshou','zhujinqiyuan'].contains(card.name)){
							if(!game.hasPlayer(function(current){
								return get.attitude(player,current)!=0&&get.distance(player,current)<=1&&player.canUse(card,current)&&get.effect(current,card,player,player)>0;
							})) return 0;
							return player.getUseValue(card)-7;
						}
						return player.getUseValue(card)-4;
					},
					backup:function(links,player){
						return {
							filterCard:function(){
								return true;
							},
							selectCard:function(){
								var numa=0;
								if(player.countMark('yb047_youhun_round')>0)numa=player.countMark('yb047_youhun_round');
								var numb=0;
								if(player.countMark('yb047_youhun_maxHp')>0)numb=player.countMark('yb047_youhun_maxHp');
								return numa+numb;
							},
							viewAs:{
								name:links[0][2],
								nature:links[0][3],
								isCard:true,
							},
							position:'hes',
							popname:true,
							precontent:function(){
								player.logSkill('yb047_youhun');
								player.addTempSkill('yb047_youhun_round','roundStart');
								player.addMark('yb047_youhun_round');
								player.changeZhuanhuanji('yb047_youhun');
								player.markSkill('yb047_youhun_maxHp')
							},
						}
					},
					prompt:function(links,player){
						var name=links[0][2];
						var nature=links[0][3];
						var str='视为使用一张'+(get.translation(links[0][3])||'')+get.translation(links[0][2]);
						var numa=0;
						if(player.countMark('yb047_youhun_round')>0)numa=player.countMark('yb047_youhun_round');
						var numb=0;
						if(player.countMark('yb047_youhun_maxHp')>0)numb=player.countMark('yb047_youhun_maxHp');
						if((numa+numb)>0)var str='将'+get.cnNumber(numa+numb)+'张牌当作'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'使用。';
						return str;
					},
				},
				ai:{
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player,tag,arg){
						if(arg=='respond') return false;
						if(!player.storage.yb047_youhun||player.hasSkill('yb047_youhun_true')) return false;
					},
					order:1,
					result:{
						player:1,
					},
				},
				group:['yb047_youhun_damage','yb047_youhun_maxHp'],
				subSkill:{
					round:{
						charlotte:true,
						onremove:true,
					},
					maxHp:{
						charlotte:true,
						onremove:true,
						mark:true,
						marktext:'魂',
						intro:{
							content:function (storage,player){
								var str='当前X值为';
								var numa=0;
								if(player.countMark('yb047_youhun_round')>0)numa=player.countMark('yb047_youhun_round');
								str+=numa;
								str+='，Y值为';
								var numb=0;
								if(player.countMark('yb047_youhun_maxHp')>0)numb=player.countMark('yb047_youhun_maxHp');
								str+=numb;
								str+='。';
								return str;
							},
						},
						direct:true,
						locked:true,
						trigger:{
							player:'disableEquipAfter'
						},
						content:function(){
							if(player.countMark('yb047_youhun_maxHp')>0){
								player.removeMark('yb047_youhun_maxHp');
								game.log(player,'令','#y'+'游魂','的Y计数-1。');
							}
						},
					},
					damage:{
						charlotte:true,
						trigger:{source:'damageSource'},
						direct:true,
						locked:true,
						filter:function(event,player){
							return event.getParent().skill=='yb047_youhun_backup';
						},
						content:()=>{
							player.gainMaxHp();
							player.addMark('yb047_youhun_maxHp');
							game.log(player,'令','#y'+'游魂','的Y计数+1。');
						},
					},
				}
			},
			yb047_wanxin:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{global:'phaseEnd'},
				hasHistory:function(player){
					return player.getHistory('damage').length>0;
				},
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return lib.skill.yb047_wanxin.hasHistory(current);
					});
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('yb047_wanxin'),function(card,player,target){
						return _status.event.yuus.contains(target);
					}).set('yuus',game.filterPlayer(function(current){
						return lib.skill.yb047_wanxin.hasHistory(current);
					})).set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('yb047_wanxin',target);
						target.draw(2);
					}
					else event.finish();
					'step 2'
					player.turnOver(false);
					'step 3'
					player.link(false);
					if(target==player) event.finish();
					'step 4'
					target.turnOver(false);
					'step 5'
					target.link(false);
				},
			},
			yb047_shouqing:{
				audio:'ext:夜白神略/audio/character:2',
				global:'yb047_shouqing2',
			},
			yb047_shouqing2:{
				enable:'phaseUse',
				viewAs:function(){
					return {name:'tao'}
				},
				filterCard:{name:'tao'},
				ignoreMod:true,
				filterTarget:function(card,player,target){
					return target!=player&&target.isDamaged()&&target.hasSkill('yb047_shouqing');
				},
				selectTarget:function(){
					return game.countPlayer(function(current){
						return lib.skill.yb047_shouqing2.filterTarget(null,_status.event.player,current);
					})>1?1:-1;
				},
				filter:function(event,player){
					return player.countCards('hs','tao')&&game.hasPlayer(function(current){
						return lib.skill.yb047_shouqing2.filterTarget(null,player,current)
					});
				},
				position:'hs',
				onuse:function(links,player){
					player.addSkill('yb047_shouqing3');
					player.addMark('yb047_shouqing3',1,false);
				},
				prompt:function(){
					var list=game.filterPlayer(function(current){
						return lib.skill.yb047_shouqing2.filterTarget(null,_status.event.player,current);
					});
					var str='对'+get.translation(list);
					if(list.length>1) str+='中的一名角色';
					str+='使用一张【桃】';
					return str;
				},
			},
			yb047_shouqing3:{
				intro:{
					content:'手牌上限+#',
				},
				mod:{
					maxHandcard:function(player,num){
						return num+player.countMark('yb047_shouqing3');
					},
				},
				trigger:{player:'useCardAfter'},
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.skill=='yb047_shouqing2';
				},
				content:function(){
					player.draw();
				},
			},
			//--------------------吴爽048
			yb048_ningyuan:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{player:'phaseDiscardBegin'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',get.prompt('yb048_ningyuan'),[1,5],'将至多五张手牌置于武将牌上作为“元”').set('ai',function(card){
						if(ui.selected.cards.length>=player.needsToDiscard()) return 6-get.value(card);
						return 100-get.useful(card);
					});
					'step 1'
					if(result.bool){
						var cards=result.cards;
						player.logSkill('yb048_ningyuan');
						player.addToExpansion(cards,player,'give').gaintag.add('yb048_ningyuan');
					}
				},
				marktext:'元',
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
				group:['yb048_ningyuan_use','yb048_ningyuan_discard'],
				subSkill:{
					use:{
						audio:'yb048_ningyuan',
						trigger:{player:'useCard'},
						forced:true,
						locked:false,
						filter:function(event,player){
							return player.getExpansions('yb048_ningyuan').length>0;
						},
						content:function(){
							'step 0'
							var num=Math.min(5,player.isMaxHandcard(true)?1:player.getExpansions('yb048_ningyuan').length);
							if(num>0) player.draw(num);
							'step 1'
							var cards=player.getExpansions('yb048_ningyuan');
							if(cards.length) player.chooseButton(['选择移去一张“旋”',cards],true);
							else event.finish();
							'step 2'
							if(result.bool) player.loseToDiscardpile(result.links);
						},
					},
					discard:{
						// trigger:{player:'phaseUseEnd'},
						// forced:true,
						// locked:false,
						// filter:function(event,player){
						// 	return player.getExpansions('yb048_ningyuan').length>0;
						// },
						// content:function(){
						// 	player.loseToDiscardpile(player.getExpansions('yb048_ningyuan'));
						// },
					},
				},
			},
			yb048_wuling:{
				audio:'ext:夜白神略/audio/character:2',
				group:'yb004_wunv',
				derivation:['yb004_wunv'],
				enable:'phaseUse',
				usable:1,
				locked:true,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterCard:true,
				selectCard:function(){
					if(ui.selected.targets.length) return [1,ui.selected.targets[0].countCards('he')];
					return [1,Infinity];
				},
				filterTarget:function(event,player,target){
					return target!=player&&target.countCards('he')>=Math.max(1,ui.selected.cards.length);
				},
				check:function(card){
					if(!game.hasPlayer(function(current){
						return current!=_status.event.player&&get.attitude(_status.event.player,current)<0&&current.countCards('he')>ui.selected.cards.length;
					})) return 0;
					return 6-get.value(card);
				},
				content:function(){
					'step 0'
					event.cardsx=cards.slice(0);
					var num=get.cnNumber(cards.length);
					var trans=get.translation(player);
					var prompt=('弃置'+num+'张牌，然后'+trans+'摸一张牌');
					if(cards.length>1) prompt+=('；或弃置一张牌，然后'+trans+'摸'+num+'张牌');
					var next=target.chooseToDiscard(prompt,'he',true);
					next.numx=cards.length;
					next.selectCard=function(){
						if(ui.selected.cards.length>1) return _status.event.numx;
						return [1,_status.event.numx];
					};
					next.complexCard=true;
					next.ai=function(card){
						if(ui.selected.cards.length==0||(_status.event.player.countCards('he',function(cardxq){
							return get.value(cardxq)<7;
						})>=_status.event.numx)) return 7-get.value(card);
						return -1;
					};
					'step 1'
					if(result.bool){
						if(result.cards.length==cards.length) player.draw();
						else player.draw(cards.length);
						event.cardsx.addArray(result.cards);
						for(var i=0;i<event.cardsx.length;i++){
							if(get.position(event.cardsx[i])!='d') event.cardsx.splice(i--,1);
						}
					}
					else event.finish();
					'step 2'
					if(event.cardsx.length){
						player.chooseButton(['请按顺序将卡牌置于牌堆顶（先选择的在上）',event.cardsx],true,event.cardsx.length);
					}
					else event.finish();
					'step 3'
					if(result.bool){
						event.cardsxx=result.links;
						if(player.hasSkill('yb048_ningyuan')){
							player.chooseControl('是','cancel2').set('prompt','是否将这些牌置于武将牌上充入凝元？');
						}
						else event.goto(6);
					}
					'step 4'
					if(result.control!='是'){
						event.goto(6);
					}
					'step 5'
					delete event.cardxx;
					var cards=event.cardsxx;
					player.addToExpansion(cards,player,'give').gaintag.add('yb048_ningyuan');
					event.finish();
					'step 6'
					if(event.cardsxx){
						while(event.cardsxx.length){
							var card=event.cardsxx.pop();
							card.fix();
							ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						}
					}
					event.finish();
				},
				ai:{
					threaten:3,//嘲讽值
					expose:1,//跳立场
					order:10,
					result:{
						target:-1,
					},
				},
			},
			yb048_huanjie:{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'key_huanjie',
			},
			yb048_zhimeng:{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				trigger:{
					global:'judgeEnd',
					player:'phaseDrawBegin2',
				},
				preHidden:true,
				filter:function(event,player,name){
					if(name=='phaseDrawBegin2')return player.getExpansions('yb048_zhimeng');
					else return get.position(event.result.card,true)=='o';
				},
				content:function(){
					if(event.triggername=='phaseDrawBegin2'){
						var cards=player.getExpansions('yb048_zhimeng');
						var list=[];
						for(var i of cards){
							list.add(get.suit(i));
						}
						trigger.num+=list.length;
					}
					else {
						player.addToExpansion(trigger.result.card,'gain2').gaintag.add('yb048_zhimeng');
					}
				},
				mark:true,
				intro:{
					markcount:'expansion',
					mark:function(dialog,content,player){
						var content=player.getExpansions('yb048_zhimeng');
						if(content&&content.length){
							dialog.addAuto(content);
						}
					},
					content:function(content,player){
						var content=player.getExpansions('yb048_zhimeng');
						if(content&&content.length){
							return get.translation(content);
						}
					}
				},
				mod:{
					maxHandcard:function (player,num){
						var cards=player.getExpansions('yb048_zhimeng');
						var list=[];
						for(var i of cards){
							list.add(get.suit(i));
						}
						return num+list.length;
					},
				}
			},
			yb048_shennv:{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				trigger:{player:'useCard'},
				content:function(){
					'step 0'
					player.judge('神女',function(card){;
						if(get.suit(card)==get.suit(trigger.card)){
							if(!get.tag(trigger.card,'norepeat'))return 2;
							return -1;
						}
						return 0;//这里return 的数字别私自改
					});
					'step 1'
					if(result.judge!=0){
						trigger.effectCount++;
					}
				}
			},
			yb048_minzhen:{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				trigger:{
					global:'phaseBegin',
				},
				filter:function(event,player){
					if(!player.getExpansions('yb048_zhimeng'))return false;
					var cards=player.getExpansions('yb048_zhimeng');
					if(cards.length>=event.player.maxHp)return true;
					return false;
				},
				content:function(){
					'step 0'
					event.cards=player.getExpansions('yb048_zhimeng');
					event.num=trigger.player.maxHp;
					'step 1'
					player.chooseButton(event.num,[
						'罠阵：请选择'+event.num+'张牌',
						event.cards,
					],true);
					'step 2'
					if(result.bool){
						event.cardsx=result.links;
					}
					'step 3'
					if(event.cardsx.length){
						player.chooseButton(['罠阵：请按顺序将卡牌置于牌堆顶（先选择的在上）',event.cardsx],true,event.cardsx.length);
					}
					else event.finish();
					'step 4'
					if(result.bool){
						var cardsx=result.links;
						while(cardsx.length){
							var card=cardsx.pop();
							card.fix();
							ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						}
						game.updateRoundNumber();
					}
				}
			},
			//--------------------王婉儿049
			//--------------------鐏柬050
			//--------------------北落师门051
			//--------------------姜森052
			//--------------------秋儿053
			yb053_lvxin:{
				subSkill:{
					// list:{
					// 	// onremove:true,
					// 	charlotte:true,
					// },
					hand:{
						// onremove:true,
						charlotte:true,
						trigger:{global:'phaseAfter'},
						silent:true,
						content:function(){
							player.storage.yb053_lvxin=0;
							player.storage.yb053_lvxin_list=[];
							player.unmarkSkill('yb053_lvxin');
						}
					},
				},
				audio:'ext:夜白神略/audio/character:2',
				group:['yb014_lvxin','yb053_lvxin_hand'],
				trigger:{
					player:'gainEnd',
				},
				filter:function(event,player){
					// game.log('event.skill：',event.skill)
					// game.log('event.getParent(1)：',event.getParent(1))
					// game.log('event.getParent(2)：',event.getParent(2))
					// game.log('event.getParent(2).name：',event.getParent(2).name)
					// game.log('event.getParent(2).skill：',event.getParent(2).skill)
					// game.log('event.getParent(3)：',event.getParent(3))
					// game.log('event.getParent(4)：',event.getParent(4))
					// game.log('event.getParent(5)：',event.getParent(5))
					if(event.getParent(2)&&event.getParent(2).name&&event.getParent(2).name=='yb014_lvxin')return true;
					return false;
				},
				check:function(event,player){
					if(player.storage.yb053_lvxin_list) return player.getDamagedHp()>0&&!player.storage.yb053_lvxin_list.contains(get.type(event.card));
					return player.getDamagedHp()>0;
				},
				derivation:['yb014_lvxin'],
				content:function(){
					'step 0'
					var list=[];
					if(player.getDamagedHp()>0){
						if(player.storage.yb053_lvxin_list){
							if(!player.storage.yb053_lvxin_list.contains(get.type(trigger.cards[0]))){
								list.push('回血');
							}
						}
						else list.push('回血')
					}
					list.push('加上限');
					list.push('cancel2');
					player.chooseControl(list).set('prompt','是否弃置本次旅心摸的牌，然后回复一点体力或本回合手牌上限+1？');
					'step 1'
					if(result.control=='回血'){
						player.discard(trigger.cards[0]);
						player.storage.yb053_lvxin_list.push(get.type(trigger.cards[0]));
						player.recover();
					}
					else if(result.control=='加上限'){
						// player.addTempSkill('yb053_lvxin_hand');
						player.discard(trigger.cards[0]);
						player.storage.yb053_lvxin++;
						player.markSkill('yb053_lvxin');
					}
					else event.finish();
				},
				init:function(player){
					player.storage.yb053_lvxin=0;
					player.storage.yb053_lvxin_list=[];
				},
				intro:{
					content:'本回合手牌上限+#'
				},
				mod:{
					maxHandcard:function(player,num){
						return num+player.storage.yb053_lvxin;
					}
				},
				ai:{
					threaten:2,//嘲讽值
				}
			},
			yb053_yinren:{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				getname:function(player){
					if(player.storage.yb053_yinren==true)return '迸射';
					return '隐忍';
				},
				levelUpFilter:function(player){
					if(!player.storage.yb053_yinren)return true;
					return false;
				},
				levelUp:function(player){
					player.storage.yb053_yinren=true;
					player.addSkill('yb053_yinren_after');
				},
				group:['yb053_yinren_damage','yb053_yinren_die'],
				subSkill:{
					damage:{
						forced:true,
						trigger:{
							player:'damageBegin4',
						},
						content:function(){
							'step 0'
							player.chooseToDiscard('h',1);
							'step 1'
							if(!result.bool){
								trigger.num++;
							}
							player.addTempSkill('yb053_yinren_after');
						}
					},
					after:{
						trigger:{
							global:'phaseEnd',
						},
						forced:true,
						content:function(){
							'step 0'
							var list=[];
							event.num=1;
							if(player.getDamagedHp()>0) event.num+=(Math.min(player.getDamagedHp(),3))
							if(player.getDamagedHp()>0) list.push('回血');
							list.push('摸'+get.cnNumber(event.num)+'张牌');
							if(list.length==1){
								event._result={control:list[0]}
							}
							else{
								player.chooseControl(list,true).set('prompt','请选择回复两点体力或摸'+get.cnNumber(event.num)+'张牌。');
							}
							'step 1'
							if(result.control=='回血'){
								player.recover(2);
							}
							else{
								player.draw(event.num);
							}
						}
					},
					die:{
						trigger:{
							player:'dyingAfter',
						},
						skillAnimation:true,
						animationColor:"YB_snow",
						sub:true,
						forced:true,
						filter:function(event,player){
							// return lib.skill.yb053_yinren.levelUpFilter(player)==true;
							if(!player.storage.yb053_yinren)return true;
							return false;
						},
						content:function(){
							// player.YB_levelUp(['yb053_yinren']);
							player.storage.yb053_yinren=true;
							player.addSkill('yb053_yinren_after');
							// if(player.hasSkill('yb053_yinren_after'))player.removeSkill('yb053_yinren_after')
							// player.addSkill('yb053_yinren_after');
							// player.storage.yb053_yinren=true;
							// lib.translate.yb053_yinren_ab='隐忍';
							// lib.translate.yb053_yinren=lib.skill.yb053_yinren.getname(player);
							// lib.translate.yb053_yinren_damage=lib.skill.yb053_yinren.getname(player);
							// lib.translate.yb053_yinren_after=lib.skill.yb053_yinren.getname(player);
							// lib.translate.yb053_yinren_die=lib.skill.yb053_yinren.getname(player);
						}
					},
				},
			},
			//--------------------悦儿
			'yb054_caijin':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'useCard',
				},
				filter:function(event,player){
					return get.type(event.card)=='equip'&&get.number(event.card)>1&&event.player!=player;
				},
				content:function(){
					'step 0'
					var cards=trigger.cards[0];
					var card=get.copy(cards);
					var tag=[];
					if(get.cardtag(card,'gifts'))var tag=['gifts'];
					cards.init([card.suit,card.number-1,card.name,card.nature,tag]);
					// if(card.cardtag)cards.cardtag=card.cardtag;
					event.card=game.YB_createCard(trigger.card.name,trigger.card.suit,1,trigger.card.nature,tag)
					// game.me.gain(game.YB_createCard('YB_shashan','none',1,'fire'),'gain2')
					// game.YB_createCard(trigger.card.name,trigger.card.suit,1,trigger.card.nature,tag)
					// YB_shashan
					// event.card.cardtag=tag;
					// if(card.cardtag)event.card.cardtag=card.cardtag;
					// event.card.number=1;
					// 'step 1'
					event.card.storage._yb054_caijin=cards;
					player.gain(event.card,'gain2');
					player.chooseUseTarget(event.card);
					// 'step 1'
					
				},
			},
			//失去牌的效果被我放主文件里了，防止出现特殊情况，引用了主技能而没开本将包导致无法触发效果
			//其他角色使用点数大于1的装备牌时，你可以令此牌点数-1，然后你获得一张点数为1的同名牌并可立即使用。当复制牌进入弃牌堆时，自动销毁，并令此牌的原型点数+1，若此牌的原型仍在场上，则区域内有该牌的角色回复一点体力。
			'yb054_xiezhi':{
				audio:'ext:夜白神略/audio/character:2',
			},
			yb054_chouqi:{
				audio:'ext:夜白神略/audio/character:2',
			},
			yb054_zhishang:{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				trigger:{player:'damageAfter'},
				content:function(){
					'step 0'
					player.draw(3);
					'step 1'
					if(player.storage.yb054_zhishang&&player.storage.yb054_zhishang==trigger){
						delete player.storage.yb054_zhishang;
						player.loseMaxHp();
					}
				},
				group:'yb054_zhishang_2',
				subSkill:{
					2:{
						trigger:{player:'damageBegin3'},
						direct:true,
						filter:function(event,player){
							return !player.isLinked()&&event.hasNature();//event.nature
						},
						content:function(){
							player.storage.yb054_zhishang=trigger;
						}
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
							if(get.tag(card,'natureDamage')) return [1,-2];
							return 0.8;
							// if(get.tag(card,'damage')&&get.damageEffect(target,player,player)>0) return [1,0,0,-1.5];
						}
					}
				}
			},
			yb054_tongxin:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'damageBegin4',
				},
				direct:true,
				filter:function(event,player){
					if(event.player==player)return false;
					if(!event.source) return false;
					if(event.num<=1) return false;
					return true;
				},
				content:function(){
					'step 0'
					var list=[];
					list.push('是');
					list.push('cancel2');
					event.tar=trigger.player;
					player.chooseControl(list).set('prompt',get.translation(trigger.player)+'即将受到'+get.cnNumber(trigger.num)+'点'+get.translation(trigger.nature)+'伤害，是否令此伤害-1，然后自己受到一点无来源伤害？').set('ai',function(){
						var attitude=get.attitude(player,trigger.player);
						if(attitude>=0) return 0;
						if(attitude<0){
							if(player.hp>2)return 2;
							return 1;
						}
					});
					'step 1'
					if(result.control=='是'){
						player.logSkill(event.name,event.tar);
						trigger.num--;
						player.storage.yb054_tongxin=trigger;
					}
					else{
						event.finish();
					}
				},
				ai:{
					expose:0.3,//跳立场
				},
				group:'yb054_tongxin_2',
				subSkill:{
					2:{
						trigger:{global:'damageEnd'},
						audio:'yb054_tongxin',
						forced:true,
						filter:(e,p)=>{
							return p.storage.yb054_tongxin&&p.storage.yb054_tongxin==e;
						},
						content:()=>{
							// var nature=trigger.hasNature();
							var nature=trigger.nature;
							player.damage(1,'nosource',nature);
							delete player.storage.yb054_tongxin;
						}
					}
				}
			},
			/*
			'yb054_caijin':'裁巾',
			'yb054_caijin_info':'限定技，出牌阶段，你选择一张在游戏内且点数大于1的装备牌，你将此牌移出游戏，
			然后创建两张与此牌同牌名的牌，且两张牌的点数之和等于原来的那张牌，花色与原来的牌相同。
			然后你选择一名其他角色，你与其各获得一张，且可立即使用之。然后标记该角色为“裁巾”。',
			'yb054_xiezhi':'血指',
			'yb054_xiezhi_info':'①锁定技，当你受到伤害后，你展示手牌，若其中红色手牌数不大于你体力值，你摸三张牌；
			<br>②当你进入濒死状态时，你可以展示手牌并弃置所有红色手牌，然后回复体力至所弃红色牌的数量。
			若如此做，此伤害结算完成后，1和2效果于本回合失效。<br>③当“裁巾”角色造成伤害时，你可选择①或②其中一项内容执行。',
			yb054_chouqi:'愁泣',
			yb054_chouqi_info:'转换技，当你受到伤害后，
			你可以展示手牌，并制衡任意张（阴，黑色手牌；阳，红色手牌），
			若你以此法制衡了该颜色所有牌，你额外摸一张牌。',
			yb054_zhishang:'炙伤',
			yb054_zhishang_info:'锁定技，每当你受到一次伤害后，你摸三张牌，
			然后若此伤害为属性伤害且你受伤时未处于横置（叠置）状态，
			你减一点体力上限。',
			yb054_tongxin:'同心',
			yb054_tongxin_info:'当其他角色受到大于1点且来源不为自己的伤害时，
			你可令此伤害-1，然后受到1点无来源伤害。',
			*/
			//--------------------郑琰055
			//--------------------董建超056
			//--------------------孙美琪057
			//--------------------孙世博058
			//--------------------星落四公主059
			// yb059_huiguang:'晖光',
			// yb059_huiguang_info:'锁定技，游戏开始时，你选择一名星落四公主之一，将武将牌替换为其。当你即将阵亡时，若你仍有存活公主，则取消之，改为减少一点体力上限（至多减至1）并将武将牌替换为一名未阵亡的公主，并将你武将牌上的技能添加至新公主武将牌上，然后回复体力至上限。',
			// yb059_xingshi:'星逝',
			// yb059_xingshi_info:'锁定技，每回合限一次，当你使用牌指定其他角色为唯一目标后，或成为其他角色使用牌的唯一目标后，你依次弃置你和对方的所有手牌，此牌结算完成后，你和对方各自摸等同自身当前体力值的牌数。',
			// yb059_guanhong:'贯虹',
			// yb059_guanhong_info:'出牌阶段限一次，你可以进行一次判定并获得判定牌。你记录你持有此技能时判定牌的花色，并覆盖上一次记录。
			// 当场上有角色使用该花色牌时，你可视为对该角色使用一张杀（不计入次数）',
			// yb059_zhuotan:'濯潭',
			// yb059_zhuotan_info:'重置技，刷新列表为[酒，桃，闪，杀]。你可以将手牌数调整至X，视为使用一张列表里的牌，X为你本次选择的选项所处的序号。',
			// yb059_qingliu:'擎流',
			// yb059_qingliu_info:'锁定技，当你使用牌时，若此牌不为你的手牌，则你重置武将牌上的技能；你摸牌阶段额外摸6-你武将牌上技能数张牌',
			// yb059_pingyu:'评雨',
			// yb059_pingyu_info:'场上角色的判定阶段开始时，若其判定区没有牌，你可令其进行一次【灵雨】判定。每当场上有判定牌即将生效时，你可以打出一张牌替换之，然后若此牌与原判定牌的花色相同，你摸一张牌。',
			yb059_huiguang:{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				mark:true,
				intro:{
					mark:function(dialog,storage,player){
						var list=lib.skill.yb059_huiguang.ybsl_059starsFall(player);
						dialog.addText('剩余公主');
						dialog.addSmall([list,'character']);
					}
				},
				trigger:{
					player:'enterGame',
					global:'phaseBefore',
				},
				filter:function(event,player){
					var list=[];
					if(lib.character[player.name]) list.add([player.name]);
					if(lib.character[player.name1]) list.add([player.name1]);
					if(lib.character[player.name2]) list.add([player.name2]);
					for(var i=1;i<=4;i++){
						if(list.contains('ybsl_059starsFall'+i))return false;
					}
					return event.name!='phase'||game.phaseNumber==0;
				},
				ybsl_059starsFall:function(player){
					if(!player.storage.yb059_huiguang)player.storage.yb059_huiguang=['ybsl_059starsFall1','ybsl_059starsFall2','ybsl_059starsFall3','ybsl_059starsFall4'];
					return player.storage.yb059_huiguang;
				},
				content:function(){
					var kkk=[];
					if(lib.character[player.name]&&lib.character[player.name][3].contains('yb059_huiguang')) kkk.add([player.name]);
					if(lib.character[player.name1]&&lib.character[player.name1][3].contains('yb059_huiguang')) kkk.add([player.name1]);
					if(lib.character[player.name2]&&lib.character[player.name2][3].contains('yb059_huiguang')) kkk.add([player.name2]);
					'step 0'
					var list=lib.skill.yb059_huiguang.ybsl_059starsFall(player);
					if(!list.length||!kkk.length)event.finish();
					else{
						player.chooseButton(true).set('ai',function(button){
							// return get.rank(button.link,true)-lib.character[button.link][2];
							return true;//让ai无脑选第一名成员
						}).set('createDialog',['将'+get.translation(kkk[0])+'替换为一名角色',[list,'character']]);
					}
					// game.me.reinit(game.me.name2,'ybslshen_018zhangqing',false)
					'step 1'
					player.reinit(kkk[0],result.links[0],false);
					lib.skill.yb059_huiguang.ybsl_059starsFall(player).remove(result.links[0]);
					var list=[];
					if(lib.character[kkk[0]]) list.addArray(lib.character[kkk[0]][3]);
					player.addSkill(list);
					game.broadcastAll(function(list){
						lib.character[result.links[0]][3].addArray(list);
						game.expandSkills(list);
						// for(var i of list){
						// 	var info=lib.skill[i];
						// 	if(!info) continue;
						// 	if(!info.audioname2) info.audioname2={};
						// 	info.audioname2.key_shiki='shiki_omusubi';
						// }
					},list);
					// player.recover(player.maxHp-player.hp);
				},
				group:['yb059_huiguang_die'],
				subSkill:{
					die:{
						audio:'yb059_huiguang',
						trigger:{player:'dieBefore'},
						filter:function(event,player){
							var kkk=[];
							if(lib.character[player.name]&&lib.character[player.name][3].contains('yb059_huiguang')) kkk.add([player.name]);
							if(lib.character[player.name1]&&lib.character[player.name1][3].contains('yb059_huiguang')) kkk.add([player.name1]);
							if(lib.character[player.name2]&&lib.character[player.name2][3].contains('yb059_huiguang')) kkk.add([player.name2]);
							if(!kkk)return false;
							return lib.skill.yb059_huiguang.ybsl_059starsFall(player).length&&event.getParent().name!='giveup'&&player.maxHp>0;
						},
						forced:true,
						content:function(){
							'step 0'
							trigger.cancel();
							if(player.maxHp>1)player.loseMaxHp();
							'step 1'
							player.useSkill('yb059_huiguang');
							'step 2'
							player.recover(player.maxHp-player.hp);
						},
					}
				},
			},
			yb059_xingshi:{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				usable:1,
				trigger:{
					player:'useCardToPlayered',
					target:'useCardToTargeted',
					// global:'useCard',
				},
				filter:function(event,player,name){
					if(event.targets.length!=1)return false;
					if(event.player!=player&&player!=event.targets[0])return false;
					if(event.player==player&&player==event.targets[0])return false;
					return true;
				},
				ai:{
					effect:{
						player:function(card,player,target){
							if(!player.storage.counttrigger||!player.storage.counttrigger.yb059_xingshi||player.storage.counttrigger.yb059_xingshi<=0){
								if(player!=target&&ui.selected.targets.length==1){
									var num1=player.hp+Math.min(player.hp,5)-player.countCards('h');
									var num2=target.hp+Math.min(target.hp,5)-target.countCards('h');
									return [1,-num2,1,-num1]
								}
							}
							return 1;
						},
						target:function(card,player,target){
							if(!player.storage.counttrigger||!player.storage.counttrigger.yb059_xingshi||player.storage.counttrigger.yb059_xingshi<=0){
								if(player!=target&&ui.selected.targets.length==1){
									var num1=player.hp+Math.min(player.hp,5)-player.countCards('h');
									var num2=target.hp+Math.min(target.hp,5)-target.countCards('h');
									return [1,-num2,1,-num1]
								}
							}
							return 1;
						},
					}
				},
				content:function(){
					if(trigger.player==player)var tar=trigger.targets[0];
					else var tar=trigger.player;
					trigger.card.yb059_xingshi=[player,tar];
					if(!_status.yb059_xingshi)_status.yb059_xingshi={};
					_status.yb059_xingshi[trigger.card]=[player,tar];
					player.discard(player.getCards('h'));
					var next=tar.discard(tar.getCards('h'));
					next.notBySelf=true;
					next.discarder=player;
				},
				group:['yb059_xingshi_use'],
				subSkill:{
					use:{
						trigger:{global:'useCardAfter'},
						forced:true,
						filter:function(event,player){
							if(!_status.yb059_xingshi)return false;
							if(!_status.yb059_xingshi[event.card])return false;
							return true;
						},
						content:function(){
							'step 0'
							event.num=0;
							event.list=_status.yb059_xingshi[trigger.card];
							'step 1'
							delete _status.yb059_xingshi[trigger.card];
							'step 2'
							if(event.list[event.num].isIn())event.list[event.num].draw(Math.min(event.list[event.num].hp,5));
							'step 3'
							if(event.num<1){
								event.num++
								event.goto(2);
							}
						}
					}
				}
			},
			yb059_guanhong:{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				content:function(){
					"step 0"
					player.judge();
					"step 1"
					player.gain(result.card,'gain2');
				},
				ai:{
					result:{
						player:1
					},
					order:11
				},
				group:['yb059_guanhong_judge','yb059_guanhong_sha'],
				subSkill:{
					judge:{
						audio:'yb059_guanhong',
						direct:true,
						mark:true,
						marktext:'虹',
						intro:{
							content:function(storage,player){
								if(storage)return '记录的花色是'+get.translation(storage);
								return '无';
							}
						},
						trigger:{player:'judgeEnd'},
						content:function(){
							player.markSkill('yb059_guanhong_judge');
							player.storage.yb059_guanhong_judge=get.suit(trigger.result.card)
						}
					},
					sha:{
						audio:'yb059_guanhong',
						trigger:{global:'useCard'},
						filter:function(event,player){
							if(!player.storage.yb059_guanhong_judge)return false;
							if(player.storage.yb059_guanhong_judge!=get.suit(event.card))return false;
							if(player.canUse('sha',event.player,false))return true;
							return false;
						},
						logTarget:function(event,player){
							return event.player;
						},
						prompt:function(event,player){
							return '是否视为对'+get.translation(event.player)+'使用一张杀';//'+get.logTarget('yb059_guanhong_sha')+'
						},
						check:function(event,player){
							var eff=get.effect(event.player,{name:'sha'},player,_status.event.player);
							var att=get.attitude(_status.event.player,event.player);
							return eff>0;
						},
						content:function(){
							player.useCard({name:'sha',isCard:false},trigger.player,false);
						}
					},
				}
			},
			yb059_zhuotan:{
				audio:'ext:夜白神略/audio/character:2',
				chongzhiji:true,
				chongzhiList:[
					'jiu',
					'tao',
					'shan',
					'sha',
				],
				init:function(player,skill){
					player.storage[skill+'_chongzhijiList']=lib.skill[skill].chongzhiList;
				},
				// getChongzhiList:function(player,skill){
				// 	if(!player.storage[skill]||player.storage.yb040_xuyuan.length==0){
				// 		player.storage.yb040_xuyuan=[];
				// 		for(var i = 0;i<lib.skill.yb040_xuyuan.chongzhiList.length;i++){
				// 			player.storage.yb040_xuyuan.add(lib.skill.yb040_xuyuan.chongzhiList[i]);
				// 		}
				// 	} 
				// 	return player.storage.yb040_xuyuan;
				// },
				mark:true,
				intro:{ // 标记描述
					content:function(storage,player){
						var storage=get.YB_chongzhiList(player,'yb059_zhuotan');//当前列表
						if(!storage) return '无';
						var list1=player.storage['yb059_zhuotan'+'_chongzhijiList'];//刷新列表
						// var list1=get.YB_chongzhijiList(player,'yb059_zhuotan');//刷新列表
						var str='<br>';
						for(var i=0;i<list1.length;i++){
							if(storage.contains(list1[i]))str+='<span class=yellowtext>'+get.translation(list1[i])+'</span><br>';
							else str+='<span style="opacity:0.5;">'+get.translation(list1[i])+'</span><br>';
						}
						for(var i=0;i<storage.length;i++){
							if(!list1.contains(storage[i]))str+='<span class=thundertext>'+get.translation(storage[i])+'</span><br>';
						}
						return '当前列表如下：'+str;
					},
					// markcount:"Infinity"// 标记数量为无限大，即不会因为没有技能使用次数而消失
				},
				enable:'chooseToUse',
				filter:function (event,player){
					var evt=lib.filter.filterCard;
					if(event.filterCard) evt=event.filterCard;
					var list=get.YB_chongzhiList(player,'yb059_zhuotan');
					for(var i=0;i<list.length;i++){
						if(evt({name:list[i]},player,event)) return true;
					};
					return false;
				},
				chooseButton:{
					dialog:function (event,player){
						var list=[];
						var list2=get.YB_chongzhiList(player,'yb059_zhuotan');
						for(var i=0;i<list2.length;i++){
							list.push(['濯潭','',list2[i]]);
						}
						return ui.create.dialog('濯潭',[list,'vcard']);
					},
					filter:function (button,player){
						return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
					},
					check:function (button){
						if(_status.event.getParent().type!='phase') return 1;
						var player=_status.event.player;
						return player.getUseValue({
							name:button.link[2],
							nature:button.link[3],
						});
					},
					backup:function (links,player){
						return {
							filterCard:function(card,player){
								// var suit=get.suit(card);
								// return true;
								return false
							},
							selectCard:-1,
							// complexCard:true,
							// position:'hs',
							audio:'yb059_zhuotan',
							popname:true,
							viewAs:{name:links[0][2],},
							precontent:function(){
								'step 0'
								player.logSkill('yb059_zhuotan');
								var name=event.result.card.name;
								var list=get.YB_chongzhiList(player,'yb059_zhuotan');
								var num=1;
								for(var i=0;i<list.length;i++){
									if(name==list[i])num+=i;
								}
								player.YB_changeHandCard(num);
								'step 1'
								var name=event.result.card.name;
								get.YB_chongzhiList(player,'yb059_zhuotan').remove(name);
							},
						};
					},
					prompt:function (links,player){
						var name=links[0][2];
						var list=get.YB_chongzhiList(player,'yb059_zhuotan');
						var num=1;
						for(var i=0;i<list.length;i++){
							if(name==list[i])num+=i;
						}
						return '将手牌调整至'+num+'张，视为使用一张'+get.translation(links[0][2])+'';
					},
				},
				hiddenCard:function (player,name){
					var list=get.YB_chongzhiList(player,'yb059_zhuotan');
					return list.contains(name);
				},
				ai:{
					respondSha:true,
					respondShan:true,
					order:function(item,player){
						if(!player)var player=_status.event.player;
						if(get.YB_chongzhiList(player,'yb059_zhuotan')&&get.YB_chongzhiList(player,'yb059_zhuotan').length==1)return get.order(get.YB_chongzhiList(player,'yb059_zhuotan')[0])+5;//假如列表仅剩一个，则使用收益顺序排在最高
						return 5;
					},//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
					result:{
						player:function(player){
							if(_status.event.type=='dying'){
								return get.attitude(player,_status.event.dying);
							}
							// else if(get.YB_chongzhiList(player,'yb059_zhuotan').length==1)return get.effect(target,get.YB_chongzhiList(player,'yb059_zhuotan')[0],player,_status.event.player)+10;
							return 5;//假如列表仅剩一个，则使用收益拔高
						},
					},
				}
			},
			yb059_qingliu:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{player:'useCard'},
				forced:true,
				clanSkill:true,
				filter:function(event,player){
					if(!event.cards.length) return true;
					return !game.hasPlayer2(current=>{
						if(current!=player) return false;
						return current.hasHistory('lose',evt=>{
							return evt.getParent()==event&&evt.hs.length>0;
						});
					});
				},
				content:function(){
					player.YB_zhongliu();
				},
				group:['yb059_qingliu_draw'],
				subSkill:{
					draw:{
						audio:'yb059_qingliu',
						trigger:{
							player:'phaseDrawBegin2',
						},
						forced:true,
						preHidden:true,
						filter:function(event,player){
							var num=6-player.getStockSkills(true,true).length;
							if(num<=0)return false;
							return !event.numFixed;
						},
						content:function(){
							var num=6-player.getStockSkills(true,true).length;
							if(num>0)trigger.num+=num;
						},
					}
				}
			},
			yb059_pingyu:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{global:'judge'},
				filter:function(event,player){
					return player.countCards('hes',function(card){
						return true;
					})>0;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('yb059_pingyu'),'hes',function(card,player){
						var player=_status.event.player;
						var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
						if(mod2!='unchanged') return mod2;
						var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
						if(mod!='unchanged') return mod;
						return true;
					}).set('ai',function(card){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(card)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0;
						if(attitude>0){
							return result;
						}
						else{
							return -result;
						}
					}).set('judging',trigger.player.judging[0]);
					"step 1"
					if(result.bool){
						player.respond(result.cards,'highlight','yb059_pingyu','noOrdering');
						if(get.suit(trigger.player.judging[0])==get.suit(result.cards[0])){
							event.YB_draw=true;
						}
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						player.$gain2(trigger.player.judging[0]);
						player.gain(trigger.player.judging[0]);
						trigger.player.judging[0]=result.cards[0];
						trigger.orderingCards.addArray(result.cards);
						game.log(trigger.player,'的判定牌改为',result.cards[0]);
					}
					"step 3"
					if(event.YB_draw){
						player.draw();
					}
					"step 4"
					game.delay(2);
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:1
					}
				},
				group:['yb059_pingyu_lingyu'],
				subSkill:{
					lingyu:{
						audio:'yb059_pingyu',
						trigger:{
							global:'phaseJudgeBegin',
						},
						check:function (event,player){
							return get.attitude(player,event.player)<=0;
						},
						filter:function(event,player){
							return event.player.countCards('j')==0;
						},
						content:function (){
							trigger.player.executeDelayCardEffect('ybsl_lingyu');
						},
						ai:{
							expose:1,//跳立场
							threaten:0.5,//嘲讽值
						},
					}
				},
				derivation:['ybsl_lingyu'],
			},
			//--------------------刘天杭060
			//--------------------哲宇061
			//--------------------于洪岩062
			//--------------------魏铭利063
			//--------------------吕明岩064
			//--------------------阎锡文065
			//--------------------武筠066
			//-----------------------------------蛇妃
			'yb067_chanqing':{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				intro:{
					content:function(content,player){
						return '上次缠情是和'+get.translation(player.storage.yb067_chanqing)+'进行的';
					},
				},
				filterCard:false,
				// init:function(player,skill){
					// player.addSkill('yb067_chanqing1');
				// },
				async content(event, trigger, player) {
					player.storage.yb067_chanqing1.push(event.target);
					if (event.target == player.storage.yb067_chanqing) {
						player.changeGroup('YB_memory');
						player.recover();
					}
					else {
						player.changeGroup('YB_dream');
						player.draw(2);
					}
					player.storage.yb067_chanqing = event.target;
					player.markSkill('yb067_chanqing');//用mark记录本次缠情的角色
					event.num = 0;
					while (event.num < event.target.hp && event.num < 5) {
						event.num++;
						await player.chooseToDiscard('h', true);
						if (event.target.countCards('h') <= event.target.maxHp) await event.target.draw();
						const result = await player.gainPlayerCard('h', event.target, true).forResult();
						if (result.bool) {
							await player.chooseUseTarget(result.cards[0], true, false);
							game.log(result.cards[0], event.num);
						}
					}
					const result1 = await player.chooseButton(['选择任意项执行', [['令自己摸' + event.num + '张牌', '令' + get.translation(event.target) + '摸' + event.num + '张牌'], 'textbutton']], [0, 2])
						.set('ai', (button) => {
							var player = _status.event.player;
							switch (button.link) {
								case '令自己摸' + event.num + '张牌': return event.num;
								case '令' + get.translation(event.target) + '摸' + event.num + '张牌': return event.target.isFriendsOf(player);
							}
						}).forResult();
					console.log(result1);
					if (result1.bool && result1.links.length) {
						if (result1.links.includes('令自己摸' + event.num + '张牌')) player.draw(event.num);
						if (result1.links.includes('令' + get.translation(event.target) + '摸' + event.num + '张牌')) event.target.draw(event.num);
					}
					//QQQ
				},
				/*
				content:function(){
					'step 0'
					//用yb067_chanqing1记录本回合缠情过的角色
					player.storage.yb067_chanqing1.push(target);
					event.num=1;
					'step 1'
					if(target&&player.storage.yb067_chanqing&&target==player.storage.yb067_chanqing){
						delete player.storage.yb067_chanqing;//根据上次记录触发效果，并清除上次记录
						player.changeGroup('YB_memory');
						player.recover();
					}
					else if(target&&player.storage.yb067_chanqing&&target!=player.storage.yb067_chanqing){
						delete player.storage.yb067_chanqing;
						player.changeGroup('YB_dream');
						player.draw(2);
					}
					'step 2'
					if(player.countCards('h')>0)player.chooseToDiscard('h',true);
					if(target.countCards('h')<=target.maxHp)target.draw();
					player.storage.yb067_chanqing=target;
					player.markSkill('yb067_chanqing');//用mark记录本次缠情的角色
					'step 3'
					player.gainPlayerCard('h',target,true);
					'step 4'
					var next=player.chooseUseTarget(result.cards[0]);
					game.log(result.cards[0],event.num);
					if(get.info(result.cards[0]).updateUsable=='phaseUse') next.addCount=false;
					'step 5'
					if(event.num<target.hp&&event.num<5) {
						event.num+=1;
						event.goto(2);
					}
					else{
						event.goto(6);
					}
					'step 6'
					//---------------------此处为对话框
					event.videoId=lib.status.videoId++;
					game.log('event.videoId');
					var func=function(player,id){
						var list=[
							'令你自己摸'+get.cnNumber(event.num)+'张牌',
							'令'+get.translation(target)+'摸'+get.cnNumber(event.num)+'张牌'
						];
						var choiceList=ui.create.dialog('缠情：请选择零至两项');choiceList.videoId=id;
						for(var i=0;i<list.length;i++){
							var str='<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
							str+=list[i];
							str+='</div>';
							var next=choiceList.add(str);
							next.firstChild.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
							next.firstChild.link=i;
							for(var j in lib.element.button){
								next[j]=lib.element.button[j];
							}
							choiceList.buttons.add(next.firstChild);
						}
					return choiceList;
					}
					if(player.isOnline2()){
						player.send(func,player,event.videoId);
					}
						event.dialog=func(player,event.videoId);
						if(player!=game.me||_status.auto){
						event.dialog.style.display='none';
					}
					var next=player.chooseButton([0,2]);//
					next.set('dialog',event.videoId);//读取对话框
					next.set('forced',true);//此处作用未知
					next.set('ai',function(button){//ai选按钮思维
						// var player=_status.event.player;
						// var target=target;
						switch(button.link){
							case 0:
								return get.attitude(_status.event.player,player);
								break;
							case 1:
								return get.attitude(_status.event.player,target);
								break;
						}
					});
					next.set('selectButton',[0,2]);//
					'step 7'
					if(player.isOnline2()){
						player.send('closeDialog',event.videoId);
					}
					event.dialog.close();
					result.links.sort();
					event.links=result.links;
					'step 8'
					if(result.links.contains(0)) player.draw(event.num);
					if(result.links.contains(1)) target.draw(event.num);
				},
				*/
				group:['yb067_chanqing_last','yb067_chanqing1'],
				subSkill:{
					last:{
						audio:false,
						trigger:{
							player:'phaseUseEnd',
						},
						forced:true,
						direct:true,
						filter:function(event,player){
							return !player.hasHistory('useSkill',function(evt){
								if(evt.skill!='yb067_chanqing')return false;
								return evt.event.getParent('phaseUse')==event;
							})
						},
						content:function(){
							delete player.storage.yb067_chanqing;
						},
					},
				},
				ai:{
					order:5.5,//主动技使用的先后，杀是3，酒是3.2。
					result:{//主动技的收益
						player:function(player,target){//注意，和effect里的参数不一样
							return target.hp-1.1;//血越多收益越高,1血不发动
						},
						target:function(player,target){//注意，和effect里的参数不一样
							return 1;//血越多收益越高,1血不发动
						},
					},					
					threaten:2.4,//嘲讽值
				},
			},
			'yb067_chanqing1':{
				audio:false,
				trigger:{
					player:'phaseAfter',
				},
				forced:true,
				direct:true,
				unseen:true,
				mark:true,
				init:function (player,skill){
					player.storage.yb067_chanqing1=[];
				},
				intro:{
					content:function(content,player){
						return '本回合已和'+get.translation(player.storage.yb067_chanqing1)+'缠过情';
					},
				},
				filter:function(event,player){
					return player.storage.yb067_chanqing1;
				},
				content:function(){
					for(var i=0;i<player.storage.yb067_chanqing1.length;i++){
						player.storage.yb067_chanqing1.remove(player.storage.yb067_chanqing1[0])
					}
					player.removeMark('yb067_chanqing1',player.countMark('yb067_chanqing1'))
				},
			},
			'yb067_kuiyi':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:'phaseJieshuBegin',
				},
				groupSkill:true,
				prompt:'是否弃置所有手牌？',
				//check:true,//为了让ai无脑用，我不会写具体分类
				filter:function(event,player){
					return (player.countCards('h')>0&&player.group=='YB_memory');
				},
				content:function(){
					'step 0'
					event.num=player.countCards('h');//准备工作，记录相关数据
					event.cards=player.getCards('h');
					var suits=[];
					for(var i=0;i<event.cards.length;i++){
						suits.add(get.suit(event.cards[i]));
					}
					event.suits=suits.length;
					event.numb=1;
					event.list=[];
					event.list2=[];
					event.map={};
					'step 1'
					player.discard(event.cards);//弃牌
					'step 2'
					var str='目标角色将';
					switch(event.numb){
						case 1:str+='摸一张牌';break;
						case 2:str+='回复一点体力';break;
						case 3:str+='增加一点体力上限';break;
						case 4:str+='摸三张牌';break;
					}
					event.str=str;
					if(event.numb>=4)event.num=1;
					'step 3'
					if(event.suits>=1)player.chooseTarget([1,event.num],true,'请选择一'+(event.num>1?('至'+get.cnNumber(event.num)):'')+'名角色').set('prompt2',event.str).set('ai',function(target){
						var player=_status.event.player,att=get.attitude(player,target);
						if(att>=0) return event.numb;
						if(att<0) return -event.numb;
						if(att>=0&&player.storage.yb067_chanqing1.contains(target)) return event.numb*2;
						if(target==player) return event.numb;
					});
					'step 4'
					event.targets=result.targets;
					'step 5'
					switch(event.numb){
						case 1:event.targets[0].draw();break;
						case 2:event.targets[0].recover();break;
						case 3:event.targets[0].gainMaxHp();break;
						case 4:event.targets[0].draw(3);break;
					}
					'step 6'
					if(player.storage.yb067_chanqing1.contains(event.targets[0])){
						//二维数组方案
						if(!event.list.contains(event.targets[0])){
							event.list.push(event.targets[0]);
							event.list2.push(event.numb);
						}
						else{
							for(var i=0;i<event.list.length;i++){
								if(event.list[i]==event.targets[0]){
									event.list2[i]=event.numb;
								}
							}
						}
					}
					'step 7'
					event.targets.remove(event.targets[0]);
					'step 8'
					if(event.targets.length>0){event.goto(5)}
					else{
						if(event.numb>=event.suits){event.goto(9);}
						else{
							event.numb++;
							event.goto(2);
						}
					}
					'step 9'
					if(event.list.length>0){
						for(var i=0;i<event.list.length;i++){
							var tar=event.list[i];
							var num=event.list2[i];
							switch(num){
								case 1:tar.draw();break;
								case 2:tar.recover();break;
								case 3:tar.gainMaxHp();break;
								case 4:tar.draw(3);break;
							}
						}
					}
				},
				ai:{
					threaten:1.1,//嘲讽值为1.1，稍微注意点
				},
			},
			'yb067_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			//-------------------清月
			'yb068_mingzhu':{
				inherit:'yb010_mingzhu',
				audio:'ext:夜白神略/audio/character:2',
			},
			'yb068_chenyu':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{player:'phaseJieshuBegin'},
				frequent:true,
				preHidden:true,
				content:function(){
					var x=player.getDamagedHp();
					if(x>3)x=3;
					player.draw(x+1);
				},
			},
			'yb068_jingyue':{
				audio:'ext:夜白神略/audio/character:2',
				usable:1,
				enable:'chooseToUse',
				onChooseToUse:function(event){
					if(game.online||event.type!='phase') return;
					var list=[];
					event.player.getHistory('useCard',function(evt){
						var name=evt.card.name;
						var type=get.type(name);
						if(type!='basic'&&type!='trick'&&type!='ybsl_flower') return;
						if(name=='sha'){
							var nature=evt.card.nature;
							switch(nature){
								case 'fire':name='huosha';break;
								case 'thunder':name='leisha';break;
								case 'kami':name='kamisha';break;
								case 'ice':name='icesha';break;
								case 'stab':name='cisha';break;
								case 'YB_snow':name='YB_snowsha';break;
								case 'YB_blood':name='YB_bloodsha';break;
							}
						}
						list.add(type+'咕咕'+name);
					});
					event.set('yb068_jingyue_list',list);
				},
				filter:function(event,player){
					return event.yb068_jingyue_list&&event.yb068_jingyue_list.length>0;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('镜月',[event.yb068_jingyue_list.map(function(i){
							return i.split('咕');
						}),'vcard']);
					},
					filter:function(button,player){
						return lib.filter.cardEnabled({
							name:button.link[2],
							nature:button.link[3],
						},player);
					},
					check:function(button){
						return _status.event.player.getUseValue({
							name:button.link[2],
							nature:button.link[3],
						},false);
					},
					backup:function(links,player){
						return {
							popname:true,
							filterCard:false,
							selectCard:0,
							audio:'yb068_jingyue',
							viewAs:{
								name:links[0][2],
								nature:links[0][3],
							},
							onuse:function(links,player){
								if(player.hp>1)player.loseHp();
								player.logSkill('yb068_jingyue');
							},
						}
					},
					prompt:function (links,player){
						var str=player.hp>1?'失去一点体力并':'';
						return str+'视为使用一张'+get.translation(links[0][2]);
					},
				},
			},
			'yb068_jingyue2':{onremove:true,},
			yb068_yingxian:{
				audio:'ext:夜白神略/audio/character:2',
				usable:1,
				enable:'phaseUse',
				filter:(event,player)=>{
					var num=player.getExpansions('yb068_yingxian');
					if(num&&num.length>0) return true;
					return false;
				},
				check:function(event,player){
					var num=player.getExpansions('yb068_yingxian');
					if(num&&num.length>3) return true;
					return false;
				},
				content:function(){
					'step 0'
					player.loseHp();
					// event.count=player.getExpansions('yb068_yingxian').length;
					'step 1'
					// event.count--;
					'step 2'
					var list=player.getExpansions('yb068_yingxian');
					var card=list[list.length-1];
					var next=player.chooseUseTarget(card);
					if(get.info(card).updateUsable=='phaseUse') next.addCount=false;
					'step 3'
					if(player.getExpansions('yb068_yingxian').length){
						event.goto(1);
					}
				},
				group:['yb068_yingxian_use','yb068_yingxian_delete'],
				mark:true,
				intro:{
					content:'expansion',
					markcount:'expansion',
					// mark:function(dialog,storage,player){
						// dialog.addSmall([player.storage.yb068_yingxian,'card']);
					// },
					mark:'expansion',
				},
				subSkill:{
					use:{
						trigger:{player:'useCardAfter'},
						filter:(event,player)=>{
							if(!player.isPhaseUsing)return false;
							// game.log('event.getParent(1)：',event.getParent(1))
							// game.log('event.getParent(2)：',event.getParent(2))
							// game.log('event.getParent(3)：',event.getParent(3))
							// game.log('event.getParent(4)：',event.getParent(4))
							// game.log('event.getParent(5)：',event.getParent(5))
							if(event.getParent(2).name&&event.getParent(2).name=='yb068_yingxian')return false;
							if(!event.card)return false;
							if(!event.card.isCard)return false;
							return get.position(event.cards[0],true)=='o';
						},
						direct:true,
						popup:true,
						content:()=>{
							player.addToExpansion(trigger.cards[0],player,'giveAuto').gaintag.add('yb068_yingxian');
						},
					},
					delete:{
						trigger:{player:'phaseUseAfter'},
						filter:(event,player)=>{
							var num=player.getExpansions('yb068_yingxian');
							if(num&&num.length>0) return true;
							return false;
						},
						direct:true,
						popup:true,
						content:()=>{
							player.discard(player.getExpansions('yb068_yingxian'));
						},
					},
				}
			},
			//-------------------香紫
			'yb069_yaomian':{
				audio:'ext:夜白神略/audio/character:2',
				usable:1,
				enable:'phaseUse',
				filterTarget:function(card,player,target){
					return player!=target;
				},
				filterCard:false,
				content:function(){
					if(target.countCards('he')>0&&target.hasSex('male'))player.gainPlayerCard(target,true,'he',1);
					player.turnOver();
					target.turnOver();
				},
				ai:{
					order:6,
					result:{
						player:function(player,target){
							var num=0;
							if(player.classList.contains('turnedover')) num+=10;
							if(target.hasSex('male')) num+=1;
							return num;
						},
						target:function(player,target){
							var num=0;
							if(!target.classList.contains('turnedover')) num-=6;
							if(target.classList.contains('turnedover')) num+=10;
							if(target.hasSex('male')) num-=1;
							return num;
						}
					},
					threaten:1.5,//嘲讽值
					effect:{
						target:function(card){
							if(card.name=='guiyoujie') return [0,2];
						}
					}
				},
			},
			'yb069_wenhuan':{
				preHidden:true,
				mark:true,
				audio:'ext:夜白神略/audio/character:2',
				locked:false,
				zhuanhuanji:true,
				marktext:'☯',
				intro:{
					content:function(storage,player,skill){
						if(player.storage.yb069_wenhuan==true) return '当场上角色回复体力时，你可以令其翻面，并令此次恢复效果+1。';
						return '当场上角色受到伤害后，你可令其武将牌复位，然后摸一张牌。';
					},
				},
				group:['yb069_wenhuan_1'],
				subSkill:{
					1:{
						audio:'yb069_wenhuan',
						trigger:{
							global:['damageEnd','recoverBegin'],
						},
						prompt2:function(event,player){
							var str='';
							str+=(player.storage.yb069_wenhuan==true)?'是否令其翻面，并令此次恢复效果+1':'是否令其武将牌复位，然后其摸一张牌';
							return str;
						},
						check:function (event,player){
							var tar=event.player;
							var att=get.attitude(player,tar);//好感度
							if(!player.storage.yb069_wenhuan){
								if(att<=0)return false;
								return true;
							}//阴
							else{
								if(att<0){
									if(tar.getDamagedHp()<event.num&&!tar.isTurnedOver())return true;
									return false;
								}
								else{
									if(tar.isTurnedOver())return true;
									return (tar.getDamagedHp()<event.num||tar.hp<=0);
								}
							}//阳
						},
						filter:function(event,player){
							if(!player.storage.yb069_wenhuan){return event.name=='damage'&&event.player.isAlive()}//阴
							else{return event.name=='recover'&&event.player.isAlive()}//阳
						},
						logTarget:function (event,player){
							return event.player;
						},
						content:function(){
							'step 0'
							player.changeZhuanhuanji('yb069_wenhuan');
							if(trigger.name=='recover'){
								trigger.num++;
								trigger.player.turnOver();
								event.goto(2);
							}else{
								trigger.player.turnOver(false);
							}
							//这里直接复制了单推狗妈的代码，感谢帮我节省的时间
							'step 1'
							trigger.player.link(false);
							trigger.player.draw();
							'step 2'
							game.delayx();
						},
					},
				}
			},
			'yb069_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			//--------------070吕艳秋
			yb070_queshi:{
				audio:'ext:夜白神略/audio/character:2',
				init:function(player){
					player.equip(game.createCard('ybsl_zhezhiqiang',null,null));
				},
				trigger:{
					player:'loseAfter',
				},
				filter:(event,player)=>{
					if(event.getParent(1).name=='equip') return false;
					if(!player.isEmpty(1)) return false;
					return true;
				},
				charlotte:true,
				forced:true,
				content:function(){
					var num=Math.ceil(Math.random()*100);
					if(num>=1&&num<=24)var suit='spade';
					if(num>=25&&num<=48)var suit='heart';
					if(num>=49&&num<=52)var suit='none';
					if(num>=53&&num<=76)var suit='club';
					if(num>=77&&num<=100)var suit='diamond';
					player.equip(game.createCard('ybsl_zhezhiqiang',suit,null));
				}
			},
			yb070_meiying:{
				audio:'ext:夜白神略/audio/character:2',
				// mark:true,
				// intro:{
				// 	content:function(storage,player){
				// 		var str='当前有';
				// 		// str+=get.cnNumber(player.countMark('yb070_meiying'));
				// 		str+=player.countMark('yb070_meiying');
				// 		str+='/4枚梅影标记<br>';
				// 		// var suit=['spade','heart','club','diamond','none'];
				// 		// for(var i=0;i<suit.length;i++){
				// 		// 	str+='<br>';
				// 		// 	str+=get.translation(suit[i]);
				// 		// 	str+='记录了';
				// 		// 	var list=player.storage[yb070_meiying_+suit[i]];
				// 		// 	for(var j=0;j<list.length;j++){
				// 		// 		if(j!=0)str+='、';
				// 		// 		str+=get.translation(list[j]);
				// 		// 	}
				// 		// }
				// 		return str;
				// 	},
				// },
				group:[/*'yb070_meiying_use',*/'yb070_meiying_num','yb070_meiying_discard'],
				subSkill:{
					use:{
						audio:'yb070_meiying',
						trigger: {
							player: ['damageBegin3'],
							source: ['damageBegin1'],
						},
						direct: true,
						filter: (event, player) => {
							if (player.countMark('yb070_meiying') >= 4) return false;
							return event.card && lib.card[event.card.name];
						},
						content:()=>{
							player.logSkill('yb070_meiying')
							player.addMark('yb070_meiying');
						},
					},
					num:{
						trigger:{player:'useCard'},
						forced:true,
						popup:false,
						filter:function(event){
							var evt=event;
							return ['sha','tao'].contains(evt.card.name)&&evt.skill=='yb070_meiying'&&evt.cards&&evt.cards.length==2;
						},
						content:function(){
							trigger.baseDamage++;
						}
					},
					discard:{
						trigger:{player:['useCardAfter','respondAfter']},
						forced:true,
						popup:false,
						logTarget:function(){
							return _status.currentPhase;
						},
						autodelay:function(event){
							return event.name=='respond'?0.5:false;
						},
						filter:function(evt,player){
							return ['shan','wuxie'].contains(evt.card.name)&&evt.skill=='yb070_meiying'&&
								evt.cards&&evt.cards.length==2&&_status.currentPhase&&_status.currentPhase!=player&&_status.currentPhase.countDiscardableCards(player,'he');
						},
						content:function(){
							player.line(_status.currentPhase,'green');
							player.discardPlayerCard(_status.currentPhase,'he',true);
						}
					}
					// list:{
					// 	init:function(player,skill){
					// 		player.storage.yb070_meiying_list=[];
					// 		player.storage.yb070_meiying_none=[];
					// 		player.storage.yb070_meiying_spade=[];
					// 		player.storage.yb070_meiying_heart=[];
					// 		player.storage.yb070_meiying_club=[];
					// 		player.storage.yb070_meiying_diamond=[];
					// 	},
					// 	charlotte:true,
					// 	direct:true,
					// }
				},//技能发动时机
				enable:['chooseToUse','chooseToRespond'],
				//发动时提示的技能描述
				prompt:'将♦牌当做雷杀，♥牌当做桃，♣牌当做闪，♠牌当做无懈可击使用或打出',
				//动态的viewAs
				viewAs:function(cards,player){
					var name=false;
					var nature=null;
					var suit=get.suit(cards[0],player);
					//根据选择的卡牌的花色 判断要转化出的卡牌是闪还是火杀还是无懈还是桃
					switch(suit){
						case 'club':name='shan';break;
						case 'diamond':name='sha';nature='thunder';break;
						case 'spade':name='wuxie';break;
						case 'heart':name='tao';break;
					}
					//返回判断结果
					if(name) return {name:name,suit:suit,nature:nature};
					return null;
				},
				//-------------代价
				// precontent:function(){
				// 	player.removeMark('yb070_meiying');
				// 	player.logSkill('yb070_meiying');
				// },
				//AI选牌思路
				check:function(card){
					if(ui.selected.cards.length) return 0;
					var player=_status.event.player;
					if(_status.event.type=='phase'){
						var max=0;
						var name2;
						var list=['sha','tao'];
						var map={sha:'diamond',tao:'heart'}
						for(var i=0;i<list.length;i++){
							var name=list[i];
							if(player.countCards('hes',function(card){
								return (name!='sha'||get.value(card)<5)&&get.suit(card,player)==map[name];
							})>0&&player.getUseValue({name:name,nature:name=='sha'?'fire':null})>0){
								var temp=get.order({name:name,nature:name=='sha'?'fire':null});
								if(temp>max){
									max=temp;
									name2=map[name];
								}
							}
						}
						if(name2==get.suit(card,player)) return (name2=='diamond'?(5-get.value(card)):20-get.value(card));
						return 0;
					}
					return 1;
				},
				//选牌数量
				selectCard:[1,2],
				//确保选择第一张牌后 重新检测第二张牌的合法性 避免选择两张花色不同的牌
				complexCard:true,
				//选牌范围：手牌区和装备区和木马
				position:'hes',
				//选牌合法性判断
				filterCard:function(card,player,event){
					//如果已经选了一张牌 那么第二张牌和第一张花色相同即可
					if(ui.selected.cards.length) return get.suit(card,player)==get.suit(ui.selected.cards[0],player);
					event=event||_status.event;
					//获取当前时机的卡牌选择限制
					var filter=event._backup.filterCard;
					//获取卡牌花色
					var name=get.suit(card,player);
					//如果这张牌是梅花并且当前时机能够使用/打出闪 那么这张牌可以选择
					if(name=='club'&&filter({name:'shan',cards:[card]},player,event)) return true;
					//如果这张牌是方片并且当前时机能够使用/打出雷杀 那么这张牌可以选择
					if(name=='diamond'&&filter({name:'sha',cards:[card],nature:'thunder'},player,event)) return true;
					//如果这张牌是黑桃并且当前时机能够使用/打出无懈 那么这张牌可以选择
					if(name=='spade'&&filter({name:'wuxie',cards:[card]},player,event)) return true;
					//如果这张牌是红桃并且当前时机能够使用/打出桃 那么这张牌可以选择
					if(name=='heart'&&filter({name:'tao',cards:[card]},player,event)) return true;
					//上述条件都不满足 那么就不能选择这张牌
					return false;
				},
				//判断当前时机能否发动技能
				filter:function(event,player){
					// if(player.countMark('yb070_meiying')<1) return false;
					//获取当前时机的卡牌选择限制
					var filter=event.filterCard;
					//如果当前时机能够使用/打出火杀并且角色有方片 那么可以发动技能
					if(filter({name:'sha',nature:'thunder'},player,event)&&player.countCards('hes',{suit:'diamond'})) return true;
					//如果当前时机能够使用/打出闪并且角色有梅花 那么可以发动技能
					if(filter({name:'shan'},player,event)&&player.countCards('hes',{suit:'club'})) return true;
					//如果当前时机能够使用/打出桃并且角色有红桃 那么可以发动技能
					if(filter({name:'tao'},player,event)&&player.countCards('hes',{suit:'heart'})) return true;
					//如果当前时机能够使用/打出无懈可击并且角色有黑桃 那么可以发动技能
					if(filter({name:'wuxie'},player,event)&&player.countCards('hes',{suit:'spade'})) return true;
					return false;
				},
				ai:{
					respondSha:true,
					respondShan:true,
					//让系统知道角色“有杀”“有闪”
					skillTagFilter:function(player,tag){
						var name;
						switch(tag){
							case 'respondSha':name='diamond';break;
							case 'respondShan':name='club';break;
							case 'save':name='heart';break;
						}
						if(player.countMark('yb070_meiying')<1) return false;
						if(!player.countCards('hes',{suit:name})) return false;
					},
					//AI牌序
					order:function(item,player){
						if(player&&_status.event.type=='phase'){
							var max=0;
							var list=['sha','tao'];
							var map={sha:'diamond',tao:'heart'}
							for(var i=0;i<list.length;i++){
								var name=list[i];
								if(player.countCards('hes',function(card){
									return (name!='sha'||get.value(card)<5)&&get.suit(card,player)==map[name];
								})>0&&player.getUseValue({name:name,nature:name=='sha'?'thunder':null})>0){
									var temp=get.order({name:name,nature:name=='sha'?'thunder':null});
									if(temp>max) max=temp;
								}
							}
							max/=1.1;
							return max;
						}
						return 2;
					},
				},
				//让系统知道玩家“有无懈”“有桃”
				hiddenCard:function(player,name){
					// if(player.countMark('yb070_meiying')<1) return false;
					if(name=='wuxie'&&_status.connectMode&&player.countCards('hs')>0) return true;
					if(name=='wuxie') return player.countCards('hes',{suit:'spade'})>0;
					if(name=='tao') return player.countCards('hes',{suit:'heart'})>0;
				},
			},
			yb070_fuyi:{
				audio:'ext:夜白神略/audio/character:2',
				group:['yb070_fuyi_use','yb070_fuyi_die'],
				subSkill:{
					use:{
						enable:'phaseUse',
						audio:'yb070_fuyi',
						usable:1,
						superCharlotte:true,
						charlotte:true,
						content:()=>{
							var skill=player.getSkills()[0];
							player.removeSkill(skill);
							game.log(player,'失去了',get.translation(skill))
							var next=game.createEvent('yb070_fuyi',false);
							next.player=player;
							next.setContent(lib.skill.yb070_fuyi.sword);
						},
					},
					die:{
						trigger:{player:['dying','phaseZhunbei'],},
						audio:'yb070_fuyi',
						// usable:1,
						superCharlotte:true,
						charlotte:true,
						content:()=>{
							var skill=player.getSkills()[0];
							player.removeSkill(skill);
							game.log(player,'失去了',get.translation(skill))
							var next=game.createEvent('yb070_fuyi',false);
							next.player=player;
							next.setContent(lib.skill.yb070_fuyi.sword);
						},
					}
				},
				sword:function(){
					'step 0'
					var list1=['shen','YB_dream','YB_memory'];
					var numa=Math.max(4,game.countPlayer());
					var numb=get.translation('yb070_fuyi');
					var band=['ybslshen_014liutianyu','shen_jiaxu','ps_shen_machao'];
					player.YB_fuhan([list1,numa,numb,band,'all',],'tw');
					if(player.isMinHp()) player.recover();
				},
			},
			ybsl_zhezhiqiang:{
				charlotte:true,
				equipSkill:true,
				usable:1,
				enable:['chooseToUse'],
				// filter:function(event,player){
					// return true;
				// },
				filter:function (event,player){
					var evt=lib.filter.filterCard;
					if(event.filterCard) evt=event.filterCard;
					var name='ybsl_nohua';
					if(player.getCards('e',function(card){
						return get.name(card)=='ybsl_zhezhiqiang';
					})){
						var card=player.getCards('e',function(card){
							return get.name(card)=='ybsl_zhezhiqiang';
						});
					}
					//根据装备区折枝枪的花色 判断要转化出的卡牌是闪还是火杀还是无懈还是桃
					if(card){
						switch(get.suit(card)){
							case 'club':name='ybsl_meihua';break;
							case 'diamond':name='ybsl_lanhua';break;
							case 'spade':name='ybsl_zhuzi';break;
							case 'heart':name='ybsl_juhua';break;
							case 'none':name='ybsl_nohua';break;
						}
					}
					//返回判断结果
					if(name) return evt({name:name},player,event);
				},
				audio:'zhangba_skill',
				viewAs:function(cards,player){
					var name='ybsl_nohua';
					// var nature=null;
					if(player.getCards('e',function(card){
						return get.name(card)=='ybsl_zhezhiqiang';
					})){
						var card=player.getCards('e',function(card){
							return get.name(card)=='ybsl_zhezhiqiang';
						});
					}
					//根据选择的卡牌的花色 判断要转化出的卡牌是闪还是火杀还是无懈还是桃
					if(card){
						switch(get.suit(card)){
							case 'club':name='ybsl_meihua';break;
							case 'diamond':name='ybsl_lanhua';break;
							case 'spade':name='ybsl_zhuzi';break;
							case 'heart':name='ybsl_juhua';break;
							case 'none':name='ybsl_nohua';break;
						}
					}
					//返回判断结果
					if(name) return {name:name};
					return null;
				},
				viewAsFilter:function(player){
					// return player.countCards('h')>0;
					return true;
				},
				prompt:function(event,card){
					var str='视为使用一张';
					var name='ybsl_nohua';
					if(_status.event.player.getCards('e',function(card){
						return get.name(card)=='ybsl_zhezhiqiang';
					})){
						var card=_status.event.player.getCards('e',function(card){
							return get.name(card)=='ybsl_zhezhiqiang';
						});
					}
					if(card){
						switch(get.suit(card)){
							case 'club':name='ybsl_meihua';break;
							case 'diamond':name='ybsl_lanhua';break;
							case 'spade':name='ybsl_zhuzi';break;
							case 'heart':name='ybsl_juhua';break;
							case 'none':name='ybsl_nohua';break;
						}
					}
					str+=get.translation(name);
					return str;
				},
				// prompt:function(){
				// 	return '根据装备区内折枝枪的花色，视为使用一张：<br><span class=yellowtext>梅花：梅花；方块：兰花；<br>黑桃：竹子；红桃：菊花。</span><br><span style="opacity:0.05;">无花：无花</span>';
				// },
				position:'h',
				filterCard:()=>false,
				selectCard:-1,
				hiddenCard:function(player,name){
					if(name=='ybsl_juhua') return true;
					if(name=='ybsl_wuhua') return true;
				},
			},
			_ybsl_zhezhiqiang_lose:{
				trigger:{global:['loseEnd','cardsDiscardEnd']},
				forced:true,
				charlotte:true,
				filter:function(event,player){
					var cs=event.cards;
					for(var i=0;i<cs.length;i++){
						if(get.name(cs[i])=='ybsl_zhezhiqiang'&&get.position(cs[i],true)=='d') return true;
					}
					return false;
				},
				forceDie:true,
				content:function(){
					// var list=[];
					var cs=trigger.cards;
					for(var i=0;i<cs.length;i++){
				// 	card.fix();
				// 	// card.remove();
				// 	// card.destroyed=true;
						var suit=cs[i].suit,num=cs[i].number,nature=cs[i].nature;
						switch(suit){
							case 'club':var name='ybsl_meihua';break;
							case 'diamond':var name='ybsl_lanhua';break;
							case 'spade':var name='ybsl_zhuzi';break;
							case 'heart':var name='ybsl_juhua';break;
							case 'none':var name='ybsl_nohua';break;
						}
						if(get.name(cs[i])=='ybsl_zhezhiqiang'&&get.position(cs[i],true)=='d'){
							cs[i].init([suit,num,name,nature]);
							game.log('折枝枪变成了花朵。');
						}
					}
					// game.log(list,'已被移出游戏');
					// game.cardsGotoSpecial(list);
				},
			},
			//---------------071想去远方
			'ybsl_xinghen':{
				mod:{
					maxHandcard:function(player,num){
						var i=player.storage.ybsl_xinghen;
						if(i>5)i=5;
						return i+num;
					}
				},
				intro:{
					content:'mark',
				},
				audio:'ext:夜白神略/audio/character:2',
				trigger:{player:'phaseDrawBegin2'},
				//priority:-5,
				filter:function(event,player){
					return !event.numFixed&&player.countMark('ybsl_xinghen')>0;
				},
				mark:true,
				marktext:'痕',
				forced:true,
				content:function(){
					var k=player.storage.ybsl_xinghen;
					if(k>3)k=3;
					trigger.num+=k;
				},
				init:function (player){
					player.storage.ybsl_xinghen=0;
				},
				group:['ybsl_xinghen_juejing','ybsl_xinghen_suilie','ybsl_xinghen_baiai'],
				subSkill:{
					juejing:{
						audio:'ybsl_xinghen',
						trigger:{player:['dying','dyingAfter']},
						forced:true,
						content:function(){
							var num=Math.floor(Math.random()*3)+1;
							if(get.isLuckyStar(player)) num=3;
							player.draw(num);
						}
					},
					suilie:{
						audio:'ybsl_xinghen',
						trigger:{
							player:['changeHp'],
						},
						forced:true,
						content:function (){
							event.num=Math.abs(trigger.num);
							player.addMark('ybsl_xinghen',event.num);
						},
					},
					baiai:{
						audio:'ybsl_xinghen',
						trigger:{
							player:['phaseJieshuBegin'],
						},
						forced:true,
						filter:function(event,player){
							var numb=player.countCards('h')+player.hp;
							if(player.storage.ybsl_xinghen<numb)return false;
							return true;
						},
						content:function (){
							'step 0'
							player.discard(player.getCards('h'));//弃牌
							'step 1'
							player.removeMark('ybsl_xinghen',player.countMark('ybsl_xinghen'));
							player.gainMaxHp();
							'step 2'
							var numc=player.maxHp;
							var carde=player.countCards('h');
							player.draw(numc-carde);
						},
					},
				},
			},
			'ybsl_cuixing':{
				audio:'ext:夜白神略/audio/character:1',
				mark:true,
				intro:{
					content:function(storage,player){
						var str='';
						var suit=['spade','heart','club','diamond'];
						for(var i=0;i<suit.length;i++){
							str+='<br>';
							str+=get.translation(suit[i]);
							str+='可以转化成';
							switch(i){
								case 0:var list=player.storage.ybsl_cuixing_spade,list2=player.storage.ybsl_cuixing_ban_spade;break;
								case 1:var list=player.storage.ybsl_cuixing_heart,list2=player.storage.ybsl_cuixing_ban_heart;break;
								case 2:var list=player.storage.ybsl_cuixing_club,list2=player.storage.ybsl_cuixing_ban_club;break;
								case 3:var list=player.storage.ybsl_cuixing_diamond,list2=player.storage.ybsl_cuixing_ban_diamond;break;
							}
							for(var j=0;j<list.length;j++){
								if(j!=0)str+='、';
								if(list2.contains(list[j])){str+='<span style="text-decoration: line-through;">'+get.translation(list[j])+'</span>'}
								else{str+=get.translation(list[j]);}
							}
						}
						return str;
					}
				},
				group:['ybsl_cuixing_spade','ybsl_cuixing_heart','ybsl_cuixing_club','ybsl_cuixing_diamond'],
				derivation:['ybsl_cuixing_spade','ybsl_cuixing_heart','ybsl_cuixing_club','ybsl_cuixing_diamond'],
				init:function(player){
					player.storage.ybsl_cuixing_spade=['wuxie'];
					player.storage.ybsl_cuixing_heart=['tao'];
					player.storage.ybsl_cuixing_club=['shan'];
					player.storage.ybsl_cuixing_diamond=['sha'];
					player.storage.ybsl_cuixing_ban_spade=[];
					player.storage.ybsl_cuixing_ban_heart=[];
					player.storage.ybsl_cuixing_ban_club=[];
					player.storage.ybsl_cuixing_ban_diamond=[];
					player.storage.ybsl_cuixing_list=[];
				},
				getCuixing:function(player){
					return ['faraway_spade','faraway_heart','faraway_club','faraway_diamond'];
				},
				levelUpFilter:function(player){
					return true;
				},
				levelUp:function(player){
					var next=game.createEvent('ybsl_cuixing_change',false);
					next.player=player;
					next.setContent(lib.skill.ybsl_cuixing.upc);
				},
				// up:function(player){
				// 	var next=game.createEvent('ybsl_cuixing_change',false);
				// 	next.player=player;
				// 	next.setContent(lib.skill.ybsl_cuixing.upc);
				// },
				upc:function(){
					'step 0'
					var list=lib.skill.ybsl_cuixing.getCuixing(player);
					var list66=[];
					for(var i of lib.inpile){
						var type=get.type(i);
						if((['trick','basic','ybsl_flower'].contains(type))&&!player.storage.ybsl_cuixing_list.contains(i)) list66.push(i);
					};
					/*颜色快速提取
					'ybsl_cuixing_spade':'<span style=\'color:#28e3ce\'>淬星</span>',
					'ybsl_cuixing_heart':'<span style=\'color:#fff600\'>淬星</span>',
					'ybsl_cuixing_club':'<span style=\'color:#a900ff\'>淬星</span>',
					'ybsl_cuixing_diamond':'<span style=\'color:#ff0000\'>淬星</span>',
					*/
					var next=player.chooseToMove('淬星：请选择要新增的牌名。');
					next.set('list',[
						['黑桃/红桃/梅花/方块',[list,'vcard'],function(list){
							var list2=list.map(function(i){
								return get.translation(i[2]);
							});
						return '<span class=YB_snowtext>黑桃新增'+list2[0]+'可转化；</span><span class=yellowtext>红桃新增'+list2[1]+'可转化；</span><br><span class=YB_darktext>梅花新增'+list2[2]+'可转化；</span><span class=firetext>方块新增'+list2[3]+'可转化。</span><br>请不要为黑桃赋予无懈，为红桃赋予桃，为梅花赋予闪，为方块赋予杀，不仅是无事发生，而是会出大问题。';
						}],
						['操作方法：从下方选择你想要的目标牌，然后替换你要赋予的花色。操作结算时，会根据你选择的牌名对该花色进行添加。<br>此操作本质上是读取此格内牌名的序列，按照黑桃，红桃，梅花，方块的顺序依次读取，故而想要不为这个花色赋予时，可以把自带的花色图案放在那里卡位，那玩意不会被读取。<br><span style=\'color:#fff600\'>请勿在此界面托管，否则ai不会进行任何操作，并直接确认</span><br>——感谢Angel大佬撰写的ai框架，并顺手让这个框只能替换而不能移动',[list66,'vcard']
						
						]
					]);
					next.set('filterMove',function(from,to){
						return typeof to!='number';
					});
					next.processAI=function(list){
						var suits=list[0][1][0],player=_status.event.player,names=list[1][1][0]
						var suit=suits
						var name=names
						//给个例子，suit花色的第一个设置设置为桃，如果没有桃则随机 只有第一个，剩下的自己看着加吧
						if(name.contains('tao')){//黑桃
							var i = name.length;
							while (i--) {
								if (name[i] === 'tao') {
									var num= i;
								}
							}
							name[num]=suit[0]
							suit[0]='tao'
						}
						else if(name.contains('ybsl_juhua')){
							var i = name.length;
							while (i--) {
								if (name[i] === 'ybsl_juhua') {
									var num= i;
								}
							}
							name[num]=suit[0]
							suit[0]='ybsl_juhua'
						}
						else {
							var i = name.length;
							var	cardname=name.randomGets(1)
							while (i--) {
								if (name[i] === cardname[0]) {
									var num= i;
								}
							}
							name[num]=suit[0]
							suit[0]=cardname[0]
						}
						if(name.contains('wuxie')){//红桃
							var i = name.length;
							while (i--) {
								if (name[i] === 'wuxie') {
									var num= i;
								}
							}
							name[num]=suit[1]
							suit[1]='wuxie'
						}
						else if(name.contains('zhujinqiyuan')){
							var i = name.length;
							while (i--) {
								if (name[i] === 'zhujinqiyuan') {
									var num= i;
								}
							}
							name[num]=suit[1]
							suit[1]='zhujinqiyuan'
						}
						else {
							var i = name.length;
							var	cardname=name.randomGets(1)
							while (i--) {
								if (name[i] === cardname[0]) {
									var num= i;
								}
							}
							name[num]=suit[1]
							suit[1]=cardname[0]
						}
						if(name.contains('ybsl_lanhua')){//梅花
							var i = name.length;
							while (i--) {
								if (name[i] === 'ybsl_lanhua') {
									var num= i;
								}
							}
							name[num]=suit[2]
							suit[2]='ybsl_lanhua'
						}
						else if(name.contains('zengbingjianzao')){
							var i = name.length;
							while (i--) {
								if (name[i] === 'zengbingjianzao') {
									var num= i;
								}
							}
							name[num]=suit[2]
							suit[2]='zengbingjianzao'
						}
						else {
							var i = name.length;
							var	cardname=name.randomGets(1)
							while (i--) {
								if (name[i] === cardname[0]) {
									var num= i;
								}
							}
							name[num]=suit[2]
							suit[2]=cardname[0]
						}
						if(name.contains('sadouchengbing')){//方块
							var i = name.length;
							while (i--) {
								if (name[i] === 'sadouchengbing') {
									var num= i;
								}
							}
							name[num]=suit[3]
							suit[3]='sadouchengbing'
						}
						else if(name.contains('dongzhuxianji')){
							var i = name.length;
							while (i--) {
								if (name[i] === 'dongzhuxianji') {
									var num= i;
								}
							}
							name[num]=suit[3]
							suit[3]='dongzhuxianji'
						}
						else if(name.contains('wuzhong')){
							var i = name.length;
							while (i--) {
								if (name[i] === 'wuzhong') {
									var num= i;
								}
							}
							name[num]=suit[3]
							suit[3]='wuzhong'
						}
						else {
							var i = name.length;
							var	cardname=name.randomGets(1)
							while (i--) {
								if (name[i] === cardname[0]) {
									var num= i;
								}
							}
							name[num]=suit[3]
							suit[3]=cardname[0]
						}
						//这段代码别被鸽子看见，我怕他打死我…理论上可以写的简短一点，不过不知为何到我手上就这么繁冗………
						//以上的suit[0]代表suit数组的第一项，[1]为第二项，顺便提醒一下suit为带有花色的那个数组，name是牌名的数组
						var suit=suit.map((Angel)=>['','',Angel])
						var name=name.map((Angel)=>['','',Angel])
						return [suit,name]
						//这是最后的结果
					}
					/*
					
					*/
					event.list=list;
					event.list2=list2;
					'step 1'
					if(result.bool){
						var list=['faraway_spade','faraway_heart','faraway_club','faraway_diamond'],list2=result.moved[0].map(function(i){
							return i[2];
						});
						for(var i=0;i<4;i++){
							if(!list.contains(list2[i])){
								switch(i){
									case 0:player.storage.ybsl_cuixing_spade.push(list2[i]);break;
									case 1:player.storage.ybsl_cuixing_heart.push(list2[i]);break;
									case 2:player.storage.ybsl_cuixing_club.push(list2[i]);break;
									case 3:player.storage.ybsl_cuixing_diamond.push(list2[i]);break;
								}
								player.storage.ybsl_cuixing_list.push(list2[i]);
							}
						}
						var str='#g';
						for(var j=0;j<4;j++){
							str+=get.translation(list2[j]);
							if(j!=3) str+='/';
						}
						game.log(player,'#g【淬星】','各花色依次新增',str);
						
					}
				},
				subSkill:{
					spade:{
						audio:'ext:夜白神略/audio/character:1',
						enable:['chooseToUse','chooseToRespond'],
						filter:function (event,player){
							if(player.countCards('hes',{suit:'spade'})<1) return false;
							var evt=lib.filter.filterCard;
							if(event.filterCard) evt=event.filterCard;
							var list1=[];
							for(var i of player.storage.ybsl_cuixing_spade){
								if(!player.storage.ybsl_cuixing_ban_spade.contains(i)){list1.push(i);}
							};
							for(var k of list1){
								if(evt({name:k},player,event)) return true;
							};
							return false;
						},
						chooseButton:{
							dialog:function (event,player){
								var list=[];
								var list2=player.storage.ybsl_cuixing_spade;
								for(var i=0;i<list2.length;i++){
									if(!player.storage.ybsl_cuixing_ban_spade.contains(list2[i])) list.push(['淬星','',list2[i],'ice']);
								}
								return ui.create.dialog('淬星黑桃',[list,'vcard']);
							},
							filter:function (button,player){
								return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
							},
							check:function (button){
								if(_status.event.getParent().type!='phase') return 1;
								var player=_status.event.player;
								if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan','diaohulishan'].contains(button.link[2])) return 0;
								return player.getUseValue({
									name:button.link[2],
									nature:button.link[3],
								});
							},
							backup:function (links,player){
								return {
									filterCard:function(card,player){
										var suit=get.suit(card);
										if(suit!='spade')return false;
										return true;
									},
									selectCard:[1,2],
									complexCard:true,
									position:'hes',
									audio:'ybsl_cuixing_spade',
									popname:true,
									viewAs:{name:links[0][2],nature:links[0][3],suit:'spade'},
									precontent:function(){
										'step 0'
										player.logSkill('ybsl_cuixing');
										'step 1'
										var name=event.result.card.name;
										player.addTempSkill('ybsl_cuixing_ban');
										if(name!='wuxie')player.storage.ybsl_cuixing_ban_spade.push(name);
									},
								};
							},
							prompt:function (links,player){
								return '将一至两张黑桃牌当作冰属性'+get.translation(links[0][2])+'使用';
							},
						},
						hiddenCard:function (player,name){
							return player.storage.ybsl_cuixing_spade.contains(name)&&player.countCards('hes')>=1;
						},
						ai:{
							fireAttack:true,
							respondSha:true,
							respondShan:true,
							skillTagFilter:function (player){
								if(player.countCards('hes')<1) return false;
							},
							order:1,
							result:{
								player:function (player){
									if(_status.event.dying) return get.attitude(player,_status.event.dying);
									return 1;
								},
							},
						},
					},
					heart:{
						audio:'ext:夜白神略/audio/character:1',
						enable:['chooseToUse','chooseToRespond'],
						filter:function (event,player){
							if(player.countCards('hes',{suit:'heart'})<1) return false;
							var evt=lib.filter.filterCard;
							if(event.filterCard) evt=event.filterCard;
							var list1=[];
							for(var i of player.storage.ybsl_cuixing_heart){
								if(!player.storage.ybsl_cuixing_ban_heart.contains(i)){list1.push(i);}
							};
							for(var k of list1){
								if(evt({name:k},player,event)) return true;
							};
							return false;
						},
						chooseButton:{
							dialog:function (event,player){
								var list=[];
								var list2=player.storage.ybsl_cuixing_heart;
								for(var i=0;i<list2.length;i++){
									if(!player.storage.ybsl_cuixing_ban_heart.contains(list2[i])) list.push(['淬星','',list2[i],'YB_blood']);
								}
								return ui.create.dialog('淬星红桃',[list,'vcard']);
							},
							filter:function (button,player){
								return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
							},
							check:function (button){
								if(_status.event.getParent().type!='phase') return 1;
								var player=_status.event.player;
								if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan','diaohulishan'].contains(button.link[2])) return 0;
								return player.getUseValue({
									name:button.link[2],
									nature:button.link[3],
								});
							},
							backup:function (links,player){
								return {
									filterCard:function(card,player){
										var suit=get.suit(card);
										if(suit!='heart')return false;
										return true;
									},
									selectCard:[1,2],
									complexCard:true,
									position:'hes',
									audio:'ybsl_cuixing_heart',
									popname:true,
									viewAs:{name:links[0][2],nature:links[0][3],suit:'heart'},
									precontent:function(){
										'step 0'
										player.logSkill('ybsl_cuixing');
										'step 1'
										var name=event.result.card.name;
										player.addTempSkill('ybsl_cuixing_ban');
										if(name!='tao')player.storage.ybsl_cuixing_ban_heart.push(name);
									},
								};
							},
							prompt:function (links,player){
								return '将一至两张红桃牌当作血属性'+get.translation(links[0][2])+'使用';
							},
						},
						hiddenCard:function (player,name){
							return player.storage.ybsl_cuixing_heart.contains(name)&&player.countCards('hes')>=1;
						},
						ai:{
							fireAttack:true,
							respondSha:true,
							respondShan:true,
							skillTagFilter:function (player){
								if(player.countCards('hes')<1) return false;
							},
							order:1,
							result:{
								player:function (player){
									if(_status.event.dying) return get.attitude(player,_status.event.dying);
									return 1;
								},
							},
						},
					},
					club:{
						audio:'ext:夜白神略/audio/character:1',
						enable:['chooseToUse','chooseToRespond'],
						filter:function (event,player){
							if(player.countCards('hes',{suit:'club'})<1) return false;
							var evt=lib.filter.filterCard;
							if(event.filterCard) evt=event.filterCard;
							var list1=[];
							for(var i of player.storage.ybsl_cuixing_club){
								if(!player.storage.ybsl_cuixing_ban_club.contains(i)){list1.push(i);}
							};
							for(var k of list1){
								if(evt({name:k},player,event)) return true;
							};
							return false;
						},
						chooseButton:{
							dialog:function (event,player){
								var list=[];
								var list2=player.storage.ybsl_cuixing_club;
								for(var i=0;i<list2.length;i++){
									if(!player.storage.ybsl_cuixing_ban_club.contains(list2[i])) list.push(['淬星','',list2[i],'thunder']);
								}
								return ui.create.dialog('淬星梅花',[list,'vcard']);
							},
							filter:function (button,player){
								return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
							},
							check:function (button){
								if(_status.event.getParent().type!='phase') return 1;
								var player=_status.event.player;
								if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan','diaohulishan'].contains(button.link[2])) return 0;
								return player.getUseValue({
									name:button.link[2],
									nature:button.link[3],
								});
							},
							backup:function (links,player){
								return {
									filterCard:function(card,player){
										var suit=get.suit(card);
										if(suit!='club')return false;
										return true;
									},
									selectCard:[1,2],
									complexCard:true,
									position:'hes',
									audio:'ybsl_cuixing_club',
									popname:true,
									viewAs:{name:links[0][2],nature:links[0][3],suit:'club'},
									precontent:function(){
										'step 0'
										player.logSkill('ybsl_cuixing');
										'step 1'
										var name=event.result.card.name;
										player.addTempSkill('ybsl_cuixing_ban');
										if(name!='shan')player.storage.ybsl_cuixing_ban_club.push(name);
									},
								};
							},
							prompt:function (links,player){
								return '将一至两张梅花牌当作雷属性'+get.translation(links[0][2])+'使用';
							},
						},
						hiddenCard:function (player,name){
							return player.storage.ybsl_cuixing_club.contains(name)&&player.countCards('hes')>=1;
						},
						ai:{
							fireAttack:true,
							respondSha:true,
							respondShan:true,
							skillTagFilter:function (player){
								if(player.countCards('hes')<1) return false;
							},
							order:1,
							result:{
								player:function (player){
									if(_status.event.dying) return get.attitude(player,_status.event.dying);
									return 1;
								},
							},
						},
					},
					diamond:{
						audio:'ext:夜白神略/audio/character:1',
						enable:['chooseToUse','chooseToRespond'],
						filter:function (event,player){
							if(player.countCards('hes',{suit:'diamond'})<1) return false;
							var evt=lib.filter.filterCard;
							if(event.filterCard) evt=event.filterCard;
							var list1=[];
							for(var i of player.storage.ybsl_cuixing_diamond){
								if(!player.storage.ybsl_cuixing_ban_diamond.contains(i)){list1.push(i);}
							};
							for(var k of list1){
								if(evt({name:k},player,event)) return true;
							};
							return false;
						},
						chooseButton:{
							dialog:function (event,player){
								var list=[];
								var list2=player.storage.ybsl_cuixing_diamond;
								for(var i=0;i<list2.length;i++){
									if(!player.storage.ybsl_cuixing_ban_diamond.contains(list2[i]))list.push(['淬星','',list2[i],'fire']);
								}
								return ui.create.dialog('淬星方块',[list,'vcard']);
							},
							filter:function (button,player){
								return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
							},
							check:function (button){
								if(_status.event.getParent().type!='phase') return 1;
								var player=_status.event.player;
								if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan','diaohulishan'].contains(button.link[2])) return 0;
								return player.getUseValue({
									name:button.link[2],
									nature:button.link[3],
								});
							},
							backup:function (links,player){
								return {
									filterCard:function(card,player){
										var suit=get.suit(card);
										if(suit!='diamond')return false;
										return true;
									},
									selectCard:[1,2],
									complexCard:true,
									position:'hes',
									audio:'ybsl_cuixing_diamond',
									popname:true,
									viewAs:{name:links[0][2],nature:links[0][3],suit:'diamond'},
									precontent:function(){
										'step 0'
										player.logSkill('ybsl_cuixing');
										'step 1'
										var name=event.result.card.name;
										player.addTempSkill('ybsl_cuixing_ban');
										if(name!='sha')player.storage.ybsl_cuixing_ban_diamond.push(name);
									},
								};
							},
							prompt:function (links,player){
								return '将一至两张方块牌当作火属性'+get.translation(links[0][2])+'使用';
							},
						},
						hiddenCard:function (player,name){
							return player.storage.ybsl_cuixing_diamond.contains(name)&&player.countCards('hes')>=1;
						},
						ai:{
							fireAttack:true,
							respondSha:true,
							respondShan:true,
							skillTagFilter:function (player){
								if(player.countCards('hes')<1) return false;
							},
							order:1,
							result:{
								player:function (player){
									if(_status.event.dying) return get.attitude(player,_status.event.dying);
									return 1;
								},
							},
						},
					},
					change:{},
					ban:{
						// trigger:{player:'phaseAfter'},
						direct:true,
						content:()=>{
							player.storage.ybsl_cuixing_ban_spade=[];
							player.storage.ybsl_cuixing_ban_heart=[];
							player.storage.ybsl_cuixing_ban_club=[];
							player.storage.ybsl_cuixing_ban_diamond=[];
						},
						onremove:(player)=>{
							// player.useSkill('ybsl_cuixing_ban');
							player.storage.ybsl_cuixing_ban_spade=[];
							player.storage.ybsl_cuixing_ban_heart=[];
							player.storage.ybsl_cuixing_ban_club=[];
							player.storage.ybsl_cuixing_ban_diamond=[];
						},
					}
				}
			},
			'ybsl_xinghui':{
				audio:'ext:夜白神略/audio/character:1',
				trigger:{player:['useCard1','respond']},
				direct:true,
				popup:false,
				filter:function(event){
					var evt=event;
					return evt.cards&&evt.cards.length>=2;
				},
				content:function(){
					'step 0'
					event.list=[];
					// if(!trigger.card.yingbian&&(Array.isArray(get.info(trigger.card).yingbian_tags))&&event.triggername=='useCard1'){
						if(player.storage.ybsl_xinghui2){
							if(!player.storage.ybsl_xinghui2.contains(trigger.card.name)){
								event.list.push('应变');
							}
						}
						else {event.list.push('应变');}
					// }
					event.list.push('摸一');
					event.list.push('cancel2');
					'step 1'
					player.chooseControl(event.list);
					'step 2'
					if(result.control!='cancel2'){
						player.logSkill('ybsl_xinghui');
						if(result.control=='应变'){
							if(!Array.isArray(trigger.temporaryYingbian)) trigger.temporaryYingbian=[];
							trigger.temporaryYingbian.add('force');
							trigger.temporaryYingbian.addArray(get.yingbianEffects());
							// if(!trigger.card.yingbian){
							// 	trigger.card.yingbian=true;
							// 	var info=get.info(trigger.card);
							// 	trigger.card.cardtags=info.yingbian_tags.map(function(i){
							// 		return 'yingbian_'+i;
							// 	});
							// 	if(info&&info.yingbian) info.yingbian(trigger);
								player.addTempSkill('yingbian_changeTarget');
								player.addTempSkill('ybsl_xinghui2');
								if(!player.storage.ybsl_xinghui2) player.storage.ybsl_xinghui2=[];
								player.storage.ybsl_xinghui2.push(trigger.card.name);
							// }
						};
						if(result.control=='摸一'){player.draw()};
					}
					
				}
			},
			'ybsl_xinghui2':{onremove:true,},
			'ybsl_xingbian':{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				trigger:{
					player:'gainBegin',
				},
				filter:function(event,player){
					var num1=player.hp+player.maxHp;
					var num2=player.countCards('h')*2
					return num1>num2&&!player.storage.ybsl_xingbian;
				},
				init: function (player) {
					player.storage.ybsl_cuixing_spade = ['wuxie'];
					player.storage.ybsl_cuixing_heart = ['tao'];
					player.storage.ybsl_cuixing_club = ['shan'];
					player.storage.ybsl_cuixing_diamond = ['sha'];
					player.storage.ybsl_cuixing_ban_spade = [];
					player.storage.ybsl_cuixing_ban_heart = [];
					player.storage.ybsl_cuixing_ban_club = [];
					player.storage.ybsl_cuixing_ban_diamond = [];
					player.storage.ybsl_cuixing_list = [];//QQQ
					lib.onwash.push(function () {
						delete player.storage.ybsl_xingbian;
					});
				},
				skillAnimation:true,
				content:function(){
					'step 0'
					player.storage.ybsl_xingbian=true;
					if(player.maxHp>1)player.loseMaxHp();
					'step 1'
					// player.YB_levelUp(['ybsl_cuixing']);
					var next=game.createEvent('ybsl_cuixing_change',false);
					next.player=player;
					next.setContent(lib.skill.ybsl_cuixing.upc);
				},
				derivation:'ybsl_cuixing_change',
				
			},
			//-------------------苏令燚
			'yb072_ezhao':{
				preHidden:true,
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'phaseBegin',
				},
				forced:true,
				filter:function (event,player){
					if(event.player==player)return false;
					return true;
				},
				marktext:'呪',
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
				content:function (){
					'step 0'
					trigger.player.judge();
					'step 1'
					event.card=result.card;
					if(trigger.player.getExpansions('yb072_ezhao_mark').length>0){
						var suit=get.suit(event.card,false);
						var list=trigger.player.getExpansions('yb072_ezhao_mark');
						game.log(suit,list);
						for(var i=0;i<list.length;i++){
							if(suit==get.suit(list[i],false)){
								var gogo=true;
							}
							else if(i==list.length-1&&gogo!=true){
								trigger.player.addToExpansion(event.card,'gain2').gaintag.add('yb072_ezhao_mark');
								event.finish();
							}
							else if(i==list.length-1&&gogo==true){
								game.log('成');
								event.goto(2);
							}
						}
					}
					else{
						trigger.player.addToExpansion(event.card,'gain2').gaintag.add('yb072_ezhao_mark');
						event.finish();
					}
					'step 2'
					trigger.player.chooseControl('是','否').set('prompt','是否对其发起投江').set('ai',function(){
						var att=get.attitude(_status.event.player,player);
						if(att<0)return '是';
						return '否';
					});
					'step 3'
					if(result.control=='否'){
						event.finish();
					}
					else{
						game.log('因作者水平受限，这里临时改成视为对'+get.translation(player)+'使用一张杀');
						trigger.player.useCard(
							{
								name:'sha',
								isCard:false,
							},player,false
						);
						//lib.skill.yb072_toujiang.up(trigger.player);
					}
				},
				group:['yb072_ezhao_mark','yb072_ezhao_jie'],
				subSkill:{
					mark:{
						forced:true,
						onremove:true,
						charlotte:true,
						marktext:'呪',
						intro:{
							content:'expansion',
							markcount:'expansion',
						},
					},
					jie:{
						direct:true,
						trigger:{
							global:'useCard',
						},
						audio:'yb072_ezhao',
						filter:function(event,player){
							if(event.player.getExpansions('yb072_ezhao_mark').length==0)return false;
							return true;
						},
						content:function(){
							'step 0'
							event.goto(1);
							//为以后有可能的无理要求留个空位
							'step 1'
							var suit=get.suit(trigger.cards[0]);
							var list=trigger.player.getExpansions('yb072_ezhao_mark');
							for(var i=0;i<list.length;i++){
								if(suit==get.suit(list[i])){
									game.delay(0.5);
									event.goto(3);
								}
							}
							'step 2'
							event.finish();
							'step 3'
							var list2=['无效','令其摸一','cancel2'];
							player.chooseControl(list2).set(
								'prompt',
								get.translation(trigger.player)+'对'+get.translation(trigger.targets)+'使用了'+get.translation(trigger.cards)+'，<br>是否令此牌无效'
							).set('ai',function(){
								var att=get.attitude(_status.event.player,trigger.player);
								if(att<0){return '无效';}
								else if(att>0){return '令其摸一';}
								else if(att=0){return 'cancel2';}
							});
							'step 4'
							if(result.control=='cancel2'){
								event.finish();
							}
							else if(result.control=='无效'){
								player.logSkill('yb072_ezhao',trigger.player);
								game.delay(0.5);
								trigger.cancel();
							}
							else if(result.control=='令其摸一'){
								player.logSkill('yb072_ezhao',trigger.player);
								game.delay(0.5);
								trigger.player.draw();
							}
						},
						ai:{
							expose:1,//跳立场
							threaten:2,//嘲讽值
						},
					},
				},
			},
			'yb072_toujiang':{
				// popup:false,
				up:function(){
					'step 0'
					player.chooseTarget().set('prompt','要把谁投进河里').set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						if(att<0){
							att=-Math.sqrt(-att);
						}
						else{
							att=Math.sqrt(att);
						}
						return att*lib.card.guohe.ai.result.target(player,target);
					})
					'step 1'
					if(result.bool){
						//此处接入投票系统
					}
					else{
						event.finish();
					}
				},
			},
			//----------------铝笨073（意为铝和神孙策的结合体）
			'ybsl_duanzui':{//断罪
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:(event,player)=>(game.hasPlayer((current)=>(current!=player))),
				filterTarget:(card,player,target)=>(target!=player),
				content:function(){
					'step 0'
					if(target.isIn()){
						if(target.countCards('he')>0){
							player.choosePlayerCard(target,'he',true);
						}
						else{
							result.cards=get.cards(1);
						}
					}
					'step 1'
					player.showCards(result.cards);
					event.card=result.cards;
					'step 2'
					target.addToExpansion(event.card,'gain2').gaintag.add('ybsl_duanzui_mark');
					'step 3'
					if(target.maxHp>1){target.loseMaxHp();}
					else{event.finish();}
					'step 4'
					player.loseMaxHp();
				},
				locked:false,
				//global:'ybsl_duanzui_mark',
				mod:{
					targetInRange:function(card,player,target){
						if(target.hasMark('ybsl_duanzui_mark')) return true;
					},
				},
				ai:{
					combo:'ybsl_zhenhun',
					threaten:3,//嘲讽值
					expose:1,//跳立场
					order:2,
					result:{
						target:function(player,target){
							if(target.isHealthy()) return -2;
							return -1;
						},
					},
				},
				subSkill:{
					mark:{
						marktext:'§',
						intro:{
							name:'§',
							content:'expansion',
							markcount:'expansion',
							onunmark:true,
						},
						mod:{
							maxHandcard:function(player,num){
								var numx=player.countMark('ybsl_duanzui_mark');
								if(numx) return num+numx*game.countPlayer(function(current){
									return current.hasSkill('ybsl_duanzui');
								});
							},
						},
					},
				},
			},
			'ybsl_zhenhun':{//镇魂
				audio:2,
				trigger:{player:'useCardToPlayered'},
				forced:true,
				filter:function(event,player){
					if(event.target.getExpansions('ybsl_duanzui_mark').length==0)return false;
					return true;
				},
				logTarget:'target',
				content:function(){
					trigger.directHit.add(trigger.target);
					if(player.getHistory('gain',function(evt){
						return evt.getParent(2).name=='ybsl_zhenhun';
					}).length<2) player.draw();
				},
				group:['ybsl_zhenhun_usea','ybsl_zhenhun_die'],
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						return arg&&arg.target&&arg.target.hasMark('ybsl_duanzui_mark')
					},
				},
				subSkill:{
					usea:{
						trigger:{source:'damageSource'},
						// forced:true,
						usable:1,
						filter:function(event,player){
							if(event.player.getExpansions('ybsl_duanzui_mark').length==0)return false;
							return true;
						},
						prompt:'是否获得其一张"§"标记？',
						prompt2:'然后你加一点体力上限并摸一张牌。',
						content:function(){
							'step 0'
							event.cards=trigger.player.getExpansions('ybsl_duanzui_mark');
							'step 1'
							player.chooseCardButton(event.cards,true,'镇魂：获得其一张“§”牌').set('ai',function(button){
								return get.useful(button.link);
							});
							'step 2'
							player.gain(result.links,'gain2');
							player.gainMaxHp();
							player.draw();
						},
					},
					die:{
						trigger:{global:'die'},
						forced:true,
						filter:function(event,player){
							if(event.player.getExpansions('ybsl_duanzui_mark').length==0)return false;
							return true;
						},
						// filter:function(event,player){
							// return event.player.countMark('ybsl_duanzui_mark')>0;
						// },
						content:function(){
							player.gainMaxHp(trigger.player.getExpansions('ybsl_duanzui_mark').length);
							player.draw(trigger.player.getExpansions('ybsl_duanzui_mark').length);
						},
					},
				},
			},
			'ybsl_kunyu':{//困圄
				audio:2,
				mod:{
					maxHandcardBase:function(player){
						return player.getDamagedHp();
					},
				},
				trigger:{player:'damageBegin2'},
				forced:true,
				filter:function(event,player){
					return event.source&&event.source!=player&&player.maxHp>1&&player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						prompt:'请选择【困圄】的牌和目标',
						prompt2:'将一张手牌交给一名其他角色并防止伤害'+(player.hasSkill('ybsl_duanzui')?'，然后将伤害来源的一张牌置于其武将牌上称为“§”（若其无牌则改为牌堆顶一张牌）':''),
						filterCard:true,
						forced:true,
						filterTarget:lib.filter.notMe,
						ai1:function(card){
							if(get.tag(card,'recover')&&!game.hasPlayer(function(current){
								return get.attitude(current,player)>0&&!current.hasSkillTag('nogain');
							})) return 0;
							return 1/Math.max(0.1,get.value(card));
						},
						ai2:function(target){
							var player=_status.event.player,att=get.attitude(player,target);
							if(target.hasSkillTag('nogain')) att/=9;
							return 4+att;
						},
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						//player.logSkill('ybsl_kunyu',target);
						player.line(target,'green');
						player.give(result.cards,target);
						trigger.cancel();
						player.loseMaxHp();
						if(player.hasSkill('ybsl_duanzui')){
							event.target=trigger.source;
							event.goto(2);
							// trigger.source.addMark('ybsl_duanzui_mark',1);
						}
						else{event.finish();}
					}
					'step 2'
					if(event.target.isIn()){
						if(event.target.countCards('he')>0){
							player.choosePlayerCard(event.target,'he',true);
						}
						else{
							result.cards=get.cards(1);
						}
					}
					'step 3'
					player.showCards(result.cards);
					event.card=result.cards;
					'step 4'
					event.target.addToExpansion(event.card,'gain2').gaintag.add('ybsl_duanzui_mark');
				},
			},
			//-------------074花落隨風
			ybsl_guanxing:{
				audio:'ext:夜白神略/audio/character:2',
			},
			ybsl_tianwen:{
				audio:'ext:夜白神略/audio/character:2',
			},
			ybsl_guayao:{
				audio:'ext:夜白神略/audio/character:2',
			},
			//-------------------苟卡
			'yb075_quanke':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'phaseUseBefore',
				},
				filter:function(event,player){
					return event.player!=player&&event.player.countCards('he')>1;
				},
				check:function (event,player){
					var tar=event.player;
					var att=get.attitude(player,tar);//好感度
					if(att<=0){
						return tar.countCards('h')<5;
					}
					else{
						return tar.countCards('h')>3
					}
				},
				content:function(){
					'step 0'
					// player.chooseControl('一张','两张');
					trigger.player.chooseCard('he',true,'劝氪：将一张牌交给'+get.translation(player));
					'step 1'
					if(result.bool){
						// event.card=result.cards;
						// game.log('1',result.cards);
						trigger.player.showCards(result.cards);
						trigger.player.give(result.cards,player,true);
						trigger.player.storage.yb075_quanke_buff=get.type2(result.cards[0]);
						trigger.player.addTempSkill('yb075_quanke_buff',{player:'phaseUseAfter'});
					}
					else{event.finish();}
				},
			},
			'yb075_quanke_buff':{
				trigger:{
					player:'useCard',
				},
				forced:true,
				filter:function(event,player,card){
					return get.type2(event.card)==player.storage.yb075_quanke_buff;
				},
				content:function(){
					player.draw();
				},
				charlotte:true,
				mark:true,
				marktext:'氪',
				intro:{
					name:'氪金',
					content:function (storage,player){
						var str='本阶段使用';
						str+=get.translation(player.storage.yb075_quanke_buff);
						str+='类型牌时摸一张牌。';
						return str;
					},
				},
				onremove:true,
			},
			'yb075_wuma':{
				audio:'ext:夜白神略/audio/character:2',
				init:function (player,skill){
					player.disableEquip('equip3');
					player.disableEquip('equip4');
				},
			},
			'yb075_qianma':{
				audio:'ext:夜白神略/audio/character:2',
				enable:'chooseToUse',
				filterCard:function(card){
					return get.subtype(card)=='equip3'||get.subtype(card)=='equip4'||get.subtype(card)=='equip6';
				},
				position:'hes',
				viewAs:{name:'wuzhong'},
				viewAsFilter:function(player){
					if(!player.countCards('hes',function(card){
						return get.subtype(card)=='equip3'||get.subtype(card)=='equip4'||get.subtype(card)=='equip6';
					})) return false;
				},
				prompt:'将一张坐骑牌当无中生有使用',
				check:function(card){return 4-get.value(card)}
			},
			//-------------------朱焌
			'yb076_suiyan':{
				audio:'ext:夜白神略/audio/character:2',
				preHidden:true,
				trigger:{
					global:'phaseUseBefore',
				},
				filter:function (event,player){
					return player!=event.player&&!player.hasSkill('yb076_suiyan_mark');
				},
				content:function (){
					'step 0'
					trigger.player.draw(2);
					player.addTempSkill('yb076_suiyan_mark','roundStart');
					'step 1'
					player.addTempSkill('yb076_suiyan_use'/*,{global:'phaseUseAfter'}*/);
					player.storage.yb076_suiyan_use=trigger.player;
				},
				subSkill:{
					use:{
						onremove:true,
						audio:'yb076_suiyan',
						mark:true,
						intro:{
							content:'本回合$使用非{装备或延时锦囊}后，你可以视为使用一张同样的牌',
						},
						trigger:{
							global:'useCardAfter',
						},
						filter:(event,player)=>{
							if(!player.storage.yb076_suiyan_use||event.player!=player.storage.yb076_suiyan_use)return false;
							if(get.type(event.card)=='equip'||get.type(event.card)=='delay')return false;
							return player.hasUseTarget(event.card);
						},
						content:function (){
							var name=(trigger.card.viewAs||trigger.card.name);
							player.chooseUseTarget(
								get.prompt('yb076_suiyan'),
								'视为使用一张'+get.translation(trigger.card),
								{
									name:name,
									nature:trigger.card.nature,
									isCard:false
								}
							).set('logSkill','yb076_suiyan');
						},
						sub:true,
					},
					mark:{
						mark:true,
						intro:{
							content:'本轮已发动',
						},
						sub:true,
					},
				},
			},
			'yb076_zhenlie':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'zhenlie',
			},
			'yb076_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			//-------------------羊祈絮
			'yb077_shensu':{
				audio:'yb077_shensu1',
				group:['yb077_shensu1','yb077_shensu2','yb077_shensu4']
			},
			yb077_shensu1:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{player:'phaseJudgeBefore'},
				direct:true,
				content:function(){
					"step 0"
					var check= player.countCards('h')>2;
					player.chooseTarget(get.prompt("yb077_shensu"),"跳过判定阶段和摸牌阶段，视为对一名其他角色使用一张【杀】",function(card,player,target){
						if(player==target) return false;
						return player.canUse({name:'sha'},target,false);
					}).set('check',check).set('ai',function(target){
						if(!_status.event.check) return 0;
						return get.effect(target,{name:'sha'},_status.event.player);
					}).setHiddenSkill('yb077_shensu1');
					"step 1"
					if(result.bool){
						player.logSkill('yb077_shensu1',result.targets);
						player.useCard({name:'sha',isCard:true},result.targets[0],false);
						trigger.cancel();
						player.skip('phaseDraw');
					}
				}
			},
			yb077_shensu2:{
				audio:'yb077_shensu1',
				trigger:{player:'phaseUseBefore'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he',function(card){
						if(_status.connectMode) return true;
						return get.type(card)=='equip';
					})>0;
				},
				content:function(){
					"step 0"
					var check=player.needsToDiscard();
					player.chooseCardTarget({
						prompt:get.prompt('yb077_shensu'),
						prompt2:"弃置一张装备牌并跳过出牌阶段，视为对一名其他角色使用一张【杀】",
						filterCard:function(card,player){
							return get.type(card)=='equip'&&lib.filter.cardDiscardable(card,player)
						},
						position:'he',
						filterTarget:function(card,player,target){
							if(player==target) return false;
							return player.canUse({name:'sha'},target,false);
						},
						ai1:function(card){
							if(_status.event.check) return 0;
							return 6-get.value(card);
						},
						ai2:function(target){
							if(_status.event.check) return 0;
							return get.effect(target,{name:'sha'},_status.event.player);
						},
						check:check
					}).setHiddenSkill('yb077_shensu2');
					"step 1"
					if(result.bool){
						player.logSkill('yb077_shensu2',result.targets);
						player.discard(result.cards[0]);
						player.useCard({name:'sha',isCard:true},result.targets[0],false);
						trigger.cancel();
					}
				}
			},
			yb077_shensu4:{
				audio:'yb077_shensu1',
				trigger:{player:'phaseDiscardBefore'},
				direct:true,
				content:function(){
					"step 0"
					var check=player.needsToDiscard()||player.isTurnedOver()||(player.hasSkill('shebian')&&player.canMoveCard(true,true));
					player.chooseTarget(get.prompt('yb077_shensu'),"跳过弃牌阶段并将武将牌翻面，视为对一名其他角色使用一张【杀】",function(card,player,target){
						if(player==target) return false;
						return player.canUse({name:'sha'},target,false);
					}).set('check',check).set('ai',function(target){
						if(!_status.event.check) return 0;
						return get.effect(target,{name:'sha'},_status.event.player,_status.event.player);
					});
					"step 1"
					if(result.bool){
						player.logSkill('yb077_shensu4',result.targets);
						player.turnOver();
						player.useCard({name:'sha',isCard:true},result.targets[0],false);
						trigger.cancel();
					}
				}
			},
			'yb077_yingmu':{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{global:'useCard1'},
				audio:2,
				forced:true,
				firstDo:true,
				filter:function(event,player){
					if(!player.isTurnedOver()) return false;
					return event,player!=player;
				},
				content:function(){},
				mod:{
					targetEnabled:function(card,player,target){
						if(target.isTurnedOver()&&player!=target) return false;
					}
				}
			},
			'yb077_jibu':{
				audio:'ext:夜白神略/audio/character:2',
				usable:3,
				trigger:{player:'useCardAfter'},
				filter:function(event,player){
					//event.cards.filterInD().length>0&&//此牌在弃牌堆
					return !player.getHistory('sourceDamage',function(evt){
						return evt.card==event.card;
					}).length;
				},
				check:function(){return true;},
				frequent:true,
				content:()=>{player.draw();},
			},
			'yb077_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			//-------------------朱涯海
			'yb078_yaoyan':{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					if(player==target) return false;
					return target.hasCard(card=>lib.filter.canBeGained(card,target,player),'he');
				},
				selectTarget:[1,Infinity],
				content:function(){
					if(target.countGainableCards(player,'he')){
						player.gainPlayerCard('he',target,true);
						target.addTempSkill('yb078_yaoyan_add');
					}
				},
				ai:{
					threaten:1.1,//嘲讽值
					expose:1,
					order:8,//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
					result:{//主动技的收益
						player:function(player,target){
							if(ui.selected.targets.length) return ui.selected.targets.length;
							return 1;
						},
						target:function(player,target){
							return 0;
						},
					},
				},
				subSkill:{
					add:{
						forced:true,
						charlotte:true,
						onremove:function(player){
							player.draw();
						},
					}
				}
			},
			'yb078_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			//-----------小新
			// yb079_qingnian:'情念',
			// yb079_qingnian_info:'锁定技，每轮开始时，若场上没有你指定的“情念”角色，你需指定一名其他的未折棒的男性角色，标记为“情念”。当“情念”角色于摸牌时，若你有手牌，则你{可以}弃置一张手牌，令其本次摸牌数+2。当你于一回合内第二次询问此技能时，你将前文中的{可以}删掉，然后失去【浸染】，获得【吟咏】。',//当你不因此技能而获得牌时，若其有手牌，其需交给你一张手牌。
			// yb079_jinran:'浸染',
			// yb079_jinran_info:'其他角色弃牌阶段结束时，你可以获得一张本阶段其弃置的牌，然后若你手牌数不大于体力上限，你可再执行一次。当你再一次执行时，若场上有你指定的“情念”角色，且当前弃牌的角色{不为“情念”角色，不为折棒角色，不为女性角色}，则视为当前弃牌的角色对“情念”角色使用一张决斗，因此决斗受伤的角色可以选择折棒，防止此伤害。当“情念”角色折棒时，你取消对其的“情念”。',
			// yb079_yinyong:'吟咏',
			// yb079_yinyong_info:'每回合限一次，当你因弃置而失去一张手牌时，你可以视为使用之。此技能在“情念”角色的回合改为限两次。',
			yb079_qingnian:{
				audio:'ext:夜白神略/audio/character:2',
				derivation:'yb079_yinyong',
			},
			yb079_jinran:{
				audio:'ext:夜白神略/audio/character:2',
			},
			yb079_yinyong:{
				audio:'ext:夜白神略/audio/character:2',
			},
			//-----------凤
			yb080_huayu:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{player:'die'},
				forced:true,
				forceDie:true,
				skillAnimation:true,
				animationColor:'fire',
				filter:function(event){
					return true;
				},
				content:function(){
					'step 0'
					// var card=get.cardPile('ybsl_fengqiuhuang','field');
					event.card=(get.cardPile('ybsl_fengqiuhuang','field')||game.createCard('ybsl_fengqiuhuang',null,null,null))
					player.chooseTarget(get.prompt2('yb080_huayu'),lib.filter.notMe).set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					// ui.discardPile.appendChild(event.card);
					'step 1'
					var tar=result.targets[0];
					if(tar){
						tar.equip(event.card);
					}
					else{
						ui.discardPile.appendChild(event.card);
					}
				},
				derivation:'ybsl_fengqiuhuang',
				group:'yb080_huayu_3',
				locked:true,
				subSkill:{
					2:{
						audio:'yb080_huayu',
						name:'华羽',
						equipSkill:true,
						noHidden:true,
						inherit:'ybsl_fengqiuhuang',
						filter:function(event,player){
							if(!lib.skill.ybsl_fengqiuhuang.filter(event,player)) return false;
							if(player.storage.yb080_niepan) return false;
							if(!player.hasEmptySlot(5)) return false;
							return true;
						},
						ai:{
							effect:{
								player:function(card,player,target){
								 	if(player==target&&get.subtype(card)=='equip5'){
										if(get.equipValue(card)<=8.5) return 0;
									}
									if(!target.hasEmptySlot(5)) return;
									return lib.skill.ybsl_fengqiuhuang.ai.effect.player.apply(this,arguments);
								}
							}
						}
					},
					3:{
						trigger:{
							global:"phaseBefore",
							player:"enterGame",
						},
						forced:true,
						locked:false,
						filter:function(event,player){
							return (event.name!='phase'||game.phaseNumber==0);
						},
						content:function(){
							event.card=game.createCard('ybsl_fengqiuhuang',null,null,null);
							player.equip(event.card);
						},
					},
				}
			},
			yb080_niepan:{
				audio:'ext:夜白神略/audio/character:2',
				unique:true,
				enable:'chooseToUse',
				mark:true,
				skillAnimation:true,
				limited:true,
				animationColor:'orange',
				init:function(player){
					player.storage.yb080_niepan=false;
				},
				filter:function(event,player){
					if(player.storage.yb080_niepan) return false;
					if(event.type=='dying'){
						if(player!=event.dying) return false;
						return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					player.awakenSkill('yb080_niepan');
					player.storage.yb080_niepan=true;
					'step 1'
					player.link(false);
					'step 2'
					player.turnOver(false);
					'step 3'
					if(player.hp<3){
						player.recover(3-player.hp);
					}
					'step 4'
					player.draw(3);
					'step 5'
					player.addSkill('yb080_fengming');
				},
				ai:{
					order:1,
					skillTagFilter:function(player,arg,target){
						if(player!=target||player.storage.yb080_niepan) return false;
					},
					save:true,
					result:{
						player:function(player){
							if(player.hp<=0) return 10;
							if(player.hp<=2&&player.countCards('he')<=1) return 10;
							return 0;
						}
					},
					threaten:function(player,target){
						if(!target.storage.yb080_niepan) return 0.6;
					}
				},
				derivation:'yb080_fengming',
				intro:{
					content:'limited'
				}
			},
			yb080_fengming:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					player:['phaseUseSkipped','phaseUseCancelled','phaseUseAfter'],
				},
				filter:function(event,player,name){
					if(name=='phaseUseAfter') return  player.getHistory('useCard').length<=0;
					return true;
				},
				direct:true,
				content:function(){
					'step 0'
					var list=['选项一','选项二','cancel2'];
					var str='选项一：本回合手牌上限+3；选项二：视为使用一张〖凤鸣九霄〗。';
					player.chooseControl(list).set('prompt',str).set('ai',function(control){
						var player=_status.event.player;
						if(game.countPlayer(function(current){
							return current!=player&&(ai.get.attitude(player,current)<0);
						})>0){
							return '选项二';
						}
						return '选项一';
					})
					'step 1'
					if(result.control=='选项一'){
						player.logSkill('yb080_fengming');
						player.addTempSkill('yb080_fengming_2');
						player.addMark('yb080_fengming_2');
					}
					else if(result.control=='选项二'){
						player.logSkill('yb080_fengming');
						player.chooseUseTarget({name:'ybsl_fengmingjiuxiao',isCard:false},true,false);
					}
				},
				derivation:'ybsl_fengmingjiuxiao',
				subSkill:{
					2:{
						onremove:true,
						mark:true,
						mod:{
							maxHandcard:function(player,num){
								var numb=(player.storage.yb080_fengming_2||0);
								var numa=(3*numb);
								return num+numa;
							}
						}
					}
				},
			},
			/*
			yb080_huayu:'华羽',
			yb080_huayu_info:'锁定技，①若你涅槃未发动且宝物栏为空且未被废除，则视为你装备着〖凤求凰〗②当你阵亡时，将一张〖凤求凰〗置入弃牌堆。',
			yb080_niepan:'涅槃',
			yb080_niepanv_info:'限定技，当你进入濒死状态时，你可以回复体力至3，然后摸三张牌，然后获得技能【凤鸣】。',
			yb080_fengming:'凤鸣',
			yb080_fengming_info:'出牌阶段结束后若你于本阶段未使用过牌，或出牌阶段被跳过，你可以选择一项①本回合手牌上限+3；②视为使用一张〖凤鸣九霄〗。',
			*/
			//------------陈丽陈思
			yb081_lvxin:{
				audio:'ext:夜白神略/audio/character:2',
			},
			yb081_shanhui:{
				audio:'ext:夜白神略/audio/character:2',
			},
			yb081_sishi:{
				audio:'ext:夜白神略/audio/character:2',
			},
			yb081_yinmeng:{
				audio:'ext:夜白神略/audio/character:2',
			},
			//------------卞秋雯
			yb082_youhun:{
				audio:'ext:夜白神略/audio/character:2',
				// inherit:'yb047_youhun',
			},
			yb082_chameng:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:['loseAfter','gainAfter'],
				},
				filter:function(event,player,name){
					if(!event.player||!event.player.isAlive())return false;
					if(name=='loseAfter'){
						var evt=event.getParent('phaseDiscard');
	  					if(evt&&evt.name=='phaseDiscard') return false;
						if(event.type=='discard')return true;
						return false;
					}
					else{
						var evt=event.getParent('phaseDraw');
	  					if(evt&&evt.name=='phaseDraw') return false;
						if(event.getParent().name=='draw')return true;
						return false;
					}
					return false;
				},
				usable:1,
				check:function(event,player){
					var numa=(event.name=='lose')?-1:1;
					var numb=get.attitude(player,event.player);
					return numa*numb>0;
				},
				prompt2:function(event,player){
					var str=get.translation(event.player);
					var numb=(event.num||event.cards.length);
					if(event.name=='lose'){
						str+='刚才弃了';
						var str2=(event.player.isTurnedOver())?('再弃'+get.cnNumber(numb)+'张牌？'):('翻面？');
					}
					if(event.name=='gain'){
						str+='刚才摸了';
						var str2=(!event.player.isTurnedOver())?('再摸'+get.cnNumber(numb)+'张牌？'):('翻回？');
					}
					str+=(get.cnNumber(numb)+'张牌，是否令其'+str2);
					return str;
				},
				content:function(){
					if(event.triggername=='loseAfter'){
						if(trigger.player.isTurnedOver()){
							trigger.player.chooseToDiscard('he',trigger.num,true);
						}
						else{trigger.player.turnOver(true);}
					}
					else{
						if(trigger.player.isTurnedOver()){
							trigger.player.turnOver(false);
						}
						else{
							trigger.player.draw(trigger.cards.length);
						}
					}
				}
			},
			//------------小筑
			yb083_shenshou:{
				audio:'ext:夜白神略/audio/character:2',
			},
			'yb083_sanmeng':{
				audio:'ext:夜白神略/audio/character:2',
				inherit:'ybsl_sanmeng',
			},
			//------------张汨
			yb084_xundu:{
				audio:'ext:夜白神略/audio/character:2',
				usable:1,
				trigger:{global:'gainBegin'},
				filter:function(event,player){
					if(player.storage.yb084_xundu&&player.storage.yb084_xundu.includes(event.player))return false;
					return event.player!=player&&!(event.getParent().name=='draw'&&event.getParent(2).name=='phaseDraw');
				},
				init:function(player){
					player.storage.yb084_xundu=[];
				},
				check:function (event,player){
					if(get.attitude(player,event.player)>0) return false;
					return true;
				},
				// forced:true,
				// logTarget:'player',
				content:function(){
					'step 0'
					if(!player.storage.yb084_xundu)player.storage.yb084_xundu=[];
					player.storage.yb084_xundu.push(trigger.player);
					event.h=trigger.cards;//即将被获得的牌
					event.cards=player.getCards('h');//自己手牌
					player.showCards(event.h);
					player.$throw(event.h,1000);
					'step 1'
					player.showCards(event.cards);
					player.$throw(event.cards,1000);
					event.north=[];
					if(event.cards.length>0){
						for(var i of event.cards){
							var na=get.name(i);
							for(var t of event.h){
								var nb=get.name(t);
								if(na==nb){
									event.north.add(i);
								}
							}
						}
					}
					'step 2'
					if(event.north.length>0){
						player.chooseControl('是','cancel2').set('prompt','是否弃置【'+get.YB_tobo(event.north)+'】，并将选择权交给自己？');
					}
					'step 3'
					if(result.control=='是'){
						player.discard(event.north);
						var tar=player;
						var str='对';
						str+=get.translation(trigger.player);
						str+='造成一点伤害还是获得这些牌';
					}
					else{
						var tar=trigger.player;
						var str='受到';
						str+=get.translation(player);
						str+='造成的一点伤害还是改为其获得这些牌';
					}
					tar.chooseControl('伤害','交牌').set('prompt',str).set('ai',function(control){
						if(_status.event.player==trigger.player){
							if(get.attitude(_status.event.player,player)>0){
								return '交牌';
							}
							else if(_status.event.player.hp>1){
								return '伤害';
							}
							else{return '交牌';}
						}
						else{
							if(get.attitude(_status.event.player,trigger.player)>0){
								return '交牌';
							}
							else if(trigger.player.hp<=2){
								return '伤害';
							}
							else{return '交牌';}
						}
					});
					'step 4'
					if(result.control=='交牌'){
						trigger.cancel();
						player.gain(event.h,'gain2');
					}
					else{
						trigger.player.damage(1,'nocard',player);
					}
				},
				ai:{
					threaten:3,//嘲讽值
					expose:1,//跳立场
				},
			},
			yb084_efei:{
				audio:'ext:夜白神略/audio/character:2',
				trigger: {
					global: ['useCard', 'damageEnd'],
				},
				usable: 1,
				filter: (event, player, name) => {
					if (name == 'useCard') return event.player != player;
					return event.player != player && event.player.isAlive() && event.card && lib.card[event.card.name];
				},
				direct:true,
				content:function(){
					'step 0'
					var str='是否弃置一张同名牌，令此牌';
					if(event.triggername=='useCard'){str+='无效？';}
					else{str+='追加一次伤害？'}
					player.chooseCard('he',function(card){
						if(get.name(card)!=get.name(trigger.card)) return false;
						return true;
					}).set('ai',function(card){
						if(get.attitude(_status.event.player,trigger.player)>0) return false;
						return true;
					}).set('prompt',str);
					'step 1'
					if(result.bool){
						player.discard(result.cards);
						player.logSkill('yb084_efei');
					}
					else{
						player.storage.counttrigger.yb084_efei--;
						event.finish();
					}
					'step 2'
					if(event.triggername=='useCard'){trigger.cancel();}
					else{trigger.player.damage(1,trigger.card,trigger.source);}
				},
				ai:{
					threaten:3,//嘲讽值
					expose:1,//跳立场
				},
			},
			yb084_pomen:{
				audio:'yb084_pomeng',
				trigger:{
					global:'loseAfter',
				},
				direct:true,
				filter:(event,player)=>{
					if(event.type!='discard') return false;
					if(event.player==player) return false;
					return event.player.isAlive();
				},
				usable:1,
				content:function(){
					'step 0'
					player.chooseCardButton('选择一张令其收回，视为其对自己造成一点由此牌造成的伤害',trigger.cards.filter(i=>get.position(i,true)=='d')).set('ai',function(card){
						if(get.attitude(_status.event.player,trigger.player)>0) return false;
						return 6 - get.value(card);
					});
					'step 1'
					if(result.bool&&result.links&&result.links.length){
						player.storage.yb084_pomen_card.add(result.links[0]);
						trigger.player.gain(result.links[0],'gain2');
						trigger.player.damage(1,result.links[0],trigger.player);
					}
					else{
						player.storage.counttrigger.yb084_pomen--;
					}
				},
				init:function(player){
					if(!player.storage.yb084_pomen_card)player.storage.yb084_pomen_card=[];
				},
				ai:{
					threaten:2,//嘲讽值
					expose:1,//跳立场
				},
				mark:true,
				intro:{
					mark:function(dialog,storage,player){
						dialog.addText('当以下牌致人死亡时，你获得之');
						dialog.addSmall([player.storage.yb084_pomen_card,'card']);
					},
				},
				group:'yb084_pomen_die',
				subSkill:{
					die:{
						trigger:{
							global:'die',
						},
						audio:'yb084_pomeng',
						filter:(event,player)=>{
							// game.log('event.card：',event.card)
							// game.log('event.getParent(0)：',event.getParent(0))
							// game.log('event.getParent(0).source：',event.getParent(0).source)
							// game.log('event.getParent(0).card：',event.getParent(0).card)
							// game.log('event.getParent(1)：',event.getParent(1))
							// game.log('event.getParent(2)：',event.getParent(2))
							// game.log('event.getParent(2).card：',event.getParent(2).card)//√√
							// game.log('event.getParent(3)：',event.getParent(3))
							// game.log('event.getParent(3).card：',event.getParent(3).card)
							// game.log('event.getParent(4)：',event.getParent(4))
							// game.log('event.getParent(5)：',event.getParent(5))
							// game.log('event.getParent(6)：',event.getParent(6))
							// game.log('event.getParent(7)：',event.getParent(7))
							// game.log('event.getParent(8)：',event.getParent(8))
							// game.log('event.getParent(9)：',event.getParent(9))
							if(!event.getParent(2).card) return false;
							if(player.storage.yb084_pomen_card.contains(event.getParent(2).card)) return true;
							return false;
						},
						direct:true,
						content:function(){
							player.logSkill('yb084_pomen');
							player.gain(trigger.getParent(2).card,'gain2');
						},
					}
				}
			},
			yb084_pomeng:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'loseAfter',
				},
				direct:true,
				filter:(event,player)=>{
					if(event.type!='discard') return false;
					if(event.player==player) return false;
					return event.player.isAlive();
				},
				content:function(){
					'step 0'
					player.chooseCardButton('选择一张令其收回，视为其对自己造成一点由此牌造成的伤害',trigger.cards.filter(i=>get.position(i,true)=='d')).set('ai',function(card){
						if(get.attitude(_status.event.player,trigger.player)>0) return false;
						return 6 - get.value(card);
					});
					'step 1'
					if(result.bool&&result.links&&result.links.length){
						player.storage.yb084_pomen_card.add(result.links[0]);
						trigger.player.gain(result.links[0],'gain2');
						trigger.player.damage(1,result.links[0],trigger.player);
					}
				},
				init:function(player){
					if(!player.storage.yb084_pomen_card)player.storage.yb084_pomen_card=[];
				},
				mark:true,
				intro:{
					mark:function(dialog,storage,player){
						dialog.addText('当以下牌致人死亡时，你获得之');
						dialog.addSmall([player.storage.yb084_pomen_card,'card']);
					},
				},
				group:'yb084_pomen_die',
				ai:{
					threaten:4,//嘲讽值
					expose:1,//跳立场
				},
			},
			//------------------独孤雨
			yb085_muyuan:{
				trigger: {
					player: ["useCardToTarget"],
				},
				audio:'ext:夜白神略/audio/character:2',
				check:function (event,player){
					return get.attitude(player,event.targets[0])<=0;
				},
				filter: function (event, player) {
					if(event.targets.length!=1)return false;
					if(get.type(event.card)=='equip')return false;
					return event.player==player&&player!=event.targets[0];
				},
				content: function () {
					'step 0'
					player.gainPlayerCard(trigger.targets[0], "he", true);
					'step 1'
					trigger.targets[0].draw();
					game.delay();
				},
			},
			yb085_cibie:{
				audio:'ext:夜白神略/audio/character:2',
				subSkill: {
					count: {
						trigger: {
							player: "recoverBegin",
						},
						forced: true,
						silent: true,
						popup: false,
						filter: function (event, player) {
							if (!event.source) return false;
							if (!player.isDying()) return false;
							return true;
						},
						content: function () {
							trigger.yb085_cibie = true;
						},
						sub: true,
					},
					cibie:{
						mark: true,
						intro: {
							content: "limited",
						},
						init: function (player) {
							player.storage.yb085_cibie_cibie = false;
						},
						skillAnimation:true,
						animationColor:'YB_snow',
						enable: "phaseUse",
						filter: function (event, player) {
							return player.hp>0&&!player.storage.yb085_cibie_cibie;
						},
						filterTarget:function(card,player,target){
							return target!=player;
						},
						content:function*(event,map){
							let trigger = map.trigger,
								player = map.player,
								target = event.target;
							player.awakenSkill('yb085_cibie_cibie');
							let numb=player.hp;
							yield player.loseHp(numb);
							var result = yield target.chooseToDiscard('h',numb,(card, player) => {
								return lib.filter.cardDiscardable(card, player);
							}).set('ai',function(card){return -get.value(card)});
							if(!result.bool)yield target.damage(numb,player);
						},
						ai:{
							result:{
								player:function(player,target){
									return game.hasPlayer(function (current) {
										return get.attitude(player, current) > 4 && current.countCards("h", "tao");
									})
								},
								target:function(player,target){
									return -player.hp;
								}
							},
						},
						sub:true,
					}
				},
				group: ["yb085_cibie_count",'yb085_cibie_cibie'],
				trigger: {
					player: "recoverAfter",
				},
				// limited: true,
				filter: function (event, player) {
					if (player.isDying()) return false;
					return event.yb085_cibie == true;
				},
				direct: true,
				content: function () {
					"step 0";
					player.chooseBool("【辞别】：令其获得技能【慕愿】？").set("ai", function () {
						return get.attitude(player,trigger.source);
					});
					"step 1";
					if (result.bool) {
						player.logSkill("yb085_cibie", trigger.source);
						trigger.source.addSkill('yb085_muyuan');
					} else event.finish();
				},
			},
			// 'yb085_muyuan':'慕愿',
			// 'yb085_muyuan_info':'当你使用非装备牌指定唯一其他角色为目标后，你可获得其一张牌，然后其摸一张牌。',
			// 'yb085_cibie':'辞别',
			// 'yb085_cibie_info':'你可以让使你脱离濒死状态的角色获得技能【慕愿】。限定技，出牌阶段，你可以失去全部体力，并令一名其他角色选择：弃置等量手牌（牌数不够不可选），或受到等量伤害。',
			//------------------珂赛特
			yb100_lieshi:{
				audio:'ext:夜白神略/audio/character:2',
				chongzhiji:true,
				chongzhiList:[
					['·受到你造成的一点火焰伤害，然后废除一个随机装备栏',{
						content:function(player,target){
							'step 0'
							target.damage(1,'fire',player);
							'step 1'
							var list=[];
							for(var i=1;i<5;i++){
								if(target.hasEnabledSlot(i)) list.add(i);
							}
							var num=list.randomGet();
							target.disableEquip(num);
						},
						ai:function(player,target){
							var eff1=get.damageEffect(target,player,player,'fire');
							var eff2=get.damageEffect(target,player,target,'fire');
							return [eff2,-1,eff1,0];
						},
					}],
					['·受到你造成的两点火焰伤害',{
						content:function(player,target){
							'step 0'
							target.damage(2,'fire',player);
						},
						ai:function(player,target){
							var eff1=get.damageEffect(target,player,player,'fire');
							var eff2=get.damageEffect(target,player,target,'fire');
							return [eff2*2,0,eff1*2,0];
						},
					}],
					['·受到你造成的三点火焰伤害，然后摸三张牌',{
						content:function(player,target){
							'step 0'
							target.damage(3,'fire',player);
							'step 1'
							target.draw(3);
						},
						ai:function(player,target){
							var eff1=get.damageEffect(target,player,player,'fire');
							var eff2=get.damageEffect(target,player,target,'fire');
							return [eff2*3,1.5,eff1*3,0];
						},
					}],
				],
				init:function(player,skill){
					player.storage[skill+'_chongzhijiList']=lib.skill[skill].chongzhiList;
				},
				mark:true,
				marktext:'誓',
				intro:{ // 标记描述
					content:function(storage,player){
						var storage=get.YB_chongzhiList(player,'yb100_lieshi');//当前列表
						if(!storage) return '无';
						var list1=player.storage['yb100_lieshi'+'_chongzhijiList'];//刷新列表
						// var list1=get.YB_chongzhijiList(player,'yb100_lieshi');//刷新列表
						var str='<br>';
						for(var i=0;i<list1.length;i++){
							if(storage.contains(list1[i]))str+='<span class=yellowtext>'+list1[i][0]+'</span><br>';
							else str+='<span style="opacity:0.5;">'+list1[i][0]+'</span><br>';
						}
						for(var i=0;i<storage.length;i++){
							if(!list1.contains(storage[i]))str+='<span class=thundertext>'+storage[i][0]+'</span><br>';
						}
						return '当前列表如下：'+str;
					},
				},
				usable:1,
				enable:'phaseUse',
				selectTarget:1,
				filterTarget:lib.filter.notMe,
				filter:function(event,player){
					var storage=get.YB_chongzhiList(player,'yb100_lieshi');//当前列表
					if(!storage||storage.length==0) return false;
					return true;
				},
				subSkill:{
					block:{onremove:true,},
				},
				prompt:function(event,player){
					var player=player||_status.event.player;
					var storage=get.YB_chongzhiList(player,'yb100_lieshi');//当前列表
					if(!storage) return '无';
					var list1=player.storage['yb100_lieshi'+'_chongzhijiList'];//刷新列表
					// var list1=get.YB_chongzhijiList(player,'yb100_lieshi');//刷新列表
					var str='<br>';
					for(var i=0;i<list1.length;i++){
						if(storage.contains(list1[i]))str+='<span class=yellowtext>'+list1[i][0]+'</span><br>';
						else str+='<span style="opacity:0.5;">'+list1[i][0]+'</span><br>';
					}
					for(var i=0;i<storage.length;i++){
						if(!list1.contains(storage[i]))str+='<span class=thundertext>'+storage[i][0]+'</span><br>';
					}
					return '当前列表如下：'+str+lib.skill['yb100_lieshi'].prompt2;
				},
				prompt2:'出牌阶段限一次，你可以选择一名其他角色，你令你们之一先选择列表其中一项执行，然后另一方执行列表中其未选择的一项。',
				content:function(){
					'step 0'
					event.storage=get.YB_chongzhiList(player,'yb100_lieshi');//当前列表
					var list1=player.storage['yb100_lieshi'+'_chongzhijiList'];//刷新列表
					// var list1=get.YB_chongzhijiList(player,'yb100_lieshi');//刷新列表
					var str='<br>';
					for(var i=0;i<list1.length;i++){
						if(event.storage.contains(list1[i]))str+='<span class=yellowtext>'+list1[i][0]+'</span><br>';
						else str+='<span style="opacity:0.5;">'+list1[i][0]+'</span><br>';
					}
					for(var i=0;i<event.storage.length;i++){
						if(!list1.contains(event.storage[i]))str+='<span class=thundertext>'+event.storage[i][0]+'</span><br>';
					}
					player.chooseControl('你先选','对方先选').set('prompt','你先选还是对方先选？'+str).set('ai',function(control){
						if(event.storage.length>1)return '你先选';
						else return '对方先选';
						//简单粗暴一些，多个选项自己先选，一个选项对方别无可选
					});
					'step 1'
					event.YBlist=(result.index==0?[player,target]:[target,player]);
					event.count=0;
					'step 2'
					if(!event.YBlist[event.count]||!event.YBlist[event.count].isIn())event.finish();
					else {
						event.tar=event.YBlist[event.count];
						var list2=get.YB_chongzhiList(player,'yb100_lieshi');//当前列表
						event.list3=[];
						event.list4=[];
						for(var i=0;i<list2.length;i++){
							event.list3.push(list2[i][0]);
							event.list4.push(list2[i][1]);
						}
						if(event.list3.length==1){event._result={links:[event.list3[0]]}}
						else if(event.list3.length>1){
							event.tar.chooseButton([[event.list3,'tdnodes']]).set('ai',function(link){
								for(var i=0;i<event.list3.length;i++){
									if(event.list3[i]==link)var num2=i+1;
								}
								if(num2){
									var list66=event.list4[num2-1]['ai'](player,event.tar);//提取此项对目标的收益值
									var att=get.attitude(player,event.tar);
									var num3=list66[0]*att+list66[1];
									return num3;
								}
							});
						}
						else event.finish();
					}
					'step 3'
					if(result.links){
						for(var i=0;i<event.list3.length;i++){
							if(event.list3[i]==result.links[0])event.num1=i+1;
						}
						if(event.num1){
							get.YB_chongzhiList(player,'yb100_lieshi').remove(get.YB_chongzhiList(player,'yb100_lieshi')[event.num1-1]);//删去此项
							event.list4[event.num1-1]['content'](player,event.tar);//执行此项
						}
					}
					'step 4'
					event.count++;
					event.goto(2);
				},
				ai:{
					damage:true,
					fireAttack:true,
					order:8,
					result:{
						player:function(player,target){
							if(player.hp<=2) return -10;
							if(player.hp>=target.hp) return 0.9;
							return -2;
						},
						target:function(player,target){
							return get.damageEffect(target,player,player,'fire');
						}
					},
					//ai的考虑有些困难，等以后找人写。
					threaten:1.3,
				},
			},
			// yb100_lieshi:'烈誓',
			// yb100_lieshi_info:'重置技，刷新列表为：["受到你造成的一点火焰伤害，然后废除一个随机装备栏","受到你造成的两点火焰伤害","受到你造成的三点火焰伤害，然后摸三张牌"]。
			// 出牌阶段限一次，你可以选择一名其他角色，你令你们之一先选择列表其中一项执行，然后另一方执行列表中仍存的一项。',

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

			*/
			
			yb100_dianzhan:{
				audio:'ext:夜白神略/audio/character:2',
				chongzhiji:true,
				chongzhiList:[
					['·横置自身然后展示手牌并重铸一种花色所有手牌',{
						content:function(player,target){
							'step 0'
							target.link(true);
							var next=game.createEvent('YB_chooseToChongzhu',false);
							next.player=target;
							next.setContent('YB_chooseToChongzhu');
							return next;
						},
						ai:function(player,target){
							return [1,1,1,0];
						},
					}],
					['·调整手牌至4张',{
						content:function(player,target){
							target.YB_changeHandCard(4);
						},
						ai:function(player,target){
							var num=4-target.countCards('h');
							return [1,num,1,0];
						},
					}],
					['·展示手牌并弃置每种类型手牌各一张',{
						content:function(player,target){
							'step 0'
							var cards=target.getCards('h');
							var suits=get.YB_suit(cards,'type2');
							target.showCards(cards);
							target.chooseToDiscard('h',suits.length,true,function(card){
								var suit2=get.YB_suit(ui.selected.cards,'type2');
								return !suit2.contains(get.type(card));
							}).set('complexCard', true);
						},
						ai:function(player,target){
							var num=-Math.min(target.countCards('h')/2,3);
							return [1,num,1,0];
						},
					}],
				],
				init:function(player,skill){
					player.storage[skill+'_chongzhijiList']=lib.skill[skill].chongzhiList;
					player.storage[skill+'_mark']=[];
				},
				//去夜白神略启动代码里找get.YB_chongzhiList
				mark:true,
				marktext:'盏',
				intro:{ // 标记描述
					content:function(storage,player){
						var storage=get.YB_chongzhiList(player,'yb100_dianzhan');//当前列表
						if(!storage) return '无';
						// var list1=get.YB_chongzhijiList(player,'yb100_dianzhan');//刷新列表
						var list1=player.storage['yb100_dianzhan'+'_chongzhijiList'];
						var str='<br>';
						for(var i=0;i<list1.length;i++){
							if(storage.contains(list1[i]))str+='<span class=yellowtext>'+list1[i][0]+'</span><br>';
							else str+='<span style="opacity:0.5;">'+list1[i][0]+'</span><br>';
						}
						for(var i=0;i<storage.length;i++){
							if(!list1.contains(storage[i]))str+='<span class=thundertext>'+storage[i][0]+'</span><br>';
						}
						return '当前列表如下：'+str;
					},
				},
				prompt:function(event,player){
					var player=player||_status.event.player;
					var storage=get.YB_chongzhiList(player,'yb100_dianzhan');//当前列表
					if(!storage) return '无';
					// var list1=get.YB_chongzhijiList(player,'yb100_dianzhan');//刷新列表
					var list1=player.storage['yb100_dianzhan'+'_chongzhijiList'];
					var str='<br>';
					for(var i=0;i<list1.length;i++){
						if(storage.contains(list1[i]))str+='<span class=yellowtext>'+list1[i][0]+'</span><br>';
						else str+='<span style="opacity:0.5;">'+list1[i][0]+'</span><br>';
					}
					for(var i=0;i<storage.length;i++){
						if(!list1.contains(storage[i]))str+='<span class=thundertext>'+storage[i][0]+'</span><br>';
					}
					return '当前列表如下：'+str+lib.skill['yb100_dianzhan'].prompt2;
				},
				prompt2:'当你使用牌指定目标时，若此是你本回合首次指定其为目标，你横置自身并执行列表中的一项，然后令目标也执行此项。',
				subSkill:{
					mark:{
						onremove:function(player,skill){
							player.storage[skill]=[];
						},
					}
				},
				trigger:{player:'useCardToTarget'},
				filter:function(event,player){
					var storage=get.YB_chongzhiList(player,'yb100_dianzhan');//当前列表
					if(!storage||storage.length==0) return false;
					if(!player.storage.yb100_dianzhan_mark)return true;
					else if(player.storage.yb100_dianzhan_mark.contains(event.target))return false;
					return true;
				},
				forced:true,
				logTarget:'target',
				content:function(){
					'step 0'
					player.addTempSkill('yb100_dianzhan_mark');
					if(!player.storage.yb100_dianzhan_mark)player.storage.yb100_dianzhan_mark=[];
					player.storage.yb100_dianzhan_mark.push(trigger.target);
					event.tar=trigger.target;
					'step 1'
					player.link(true);
					var list2=get.YB_chongzhiList(player,'yb100_dianzhan');//当前列表
					event.list3=[];
					event.list4=[];
					for(var i=0;i<list2.length;i++){
						event.list3.push(list2[i][0]);
						event.list4.push(list2[i][1]);
					}
					if(event.list3.length==1){event._result={links:[event.list3[0]]}}
					else if(event.list3.length>1){
						player.chooseButton([lib.skill['yb100_dianzhan'].prompt2,[event.list3,'tdnodes']],true).set('ai',function(link){
							for(var i=0;i<event.list3.length;i++){
								if(event.list3[i]==link)var num2=i+1;
							}
							if(num2){
								var list66=event.list4[num2-1]['ai'](player,player);//提取此项对目标的收益值
								var list77=event.list4[num2-1]['ai'](player,event.tar);//提取此项对目标的收益值
								var att1=get.attitude(player,player);
								var att2=get.attitude(player,event.tar);
								var num3=list77[0]*att2+list77[1];
								var num4=list66[0]*att1+list66[1];
								return num4-num3;
							}
						});
					}
					else{event.finish();}
					'step 2'
					if(result.links){
						for(var i=0;i<event.list3.length;i++){
							if(event.list3[i]==result.links[0])event.num1=i+1;
						}
						if(event.num1){
							get.YB_chongzhiList(player,'yb100_dianzhan').remove(get.YB_chongzhiList(player,'yb100_dianzhan')[event.num1-1]);//删去此项
							event.sss=event.list4[event.num1-1]['content'];
						}
					}
					'step 3'
					event.sss(player,player);//执行此项
					'step 4'
					if(player!=trigger.target)event.sss(player,trigger.target);//执行此项
				},
			},
			// yb100_dianzhan:'点盏',
			// yb100_dianzhan_info:'重置技，锁定技，刷新列表为：["横置自身然后展示手牌并重铸一种花色所有手牌","调整手牌至4张","展示手牌并弃置每种类型手牌各一张"]。
			// 当你使用有目标的牌时，若此是你本回合首次指定其为目标，你横置自身并执行列表中的一项，然后若你不为目标，则令目标也执行此项。',
			yb100_huanyin:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{player:'dying',},
				forced:true,
				changeCards:function(player,link){//转移之后摸牌数
					var list1=get.YB_chongzhiList(player,'yb100_lieshi');//【烈誓】当前列表
					// var list2=get.YB_chongzhijiList(player,'yb100_lieshi');//【烈誓】刷新列表
					var list2=player.storage['yb100_lieshi'+'_chongzhijiList'];//刷新列表
					var list3=get.YB_chongzhiList(player,'yb100_dianzhan');//【点盏】当前列表
					// var list4=get.YB_chongzhijiList(player,'yb100_dianzhan');//【点盏】刷新列表
					var list4=player.storage['yb100_dianzhan'+'_chongzhijiList'];//刷新列表
					var lista=[],listb=[],listc=[],listd=[],liste=[],listf=[];
					var listj=[],listk=[];
					for(var i of list2){
						listb.add(i);
						if(list1.contains(i)){
							listj.add(i);
						}
					}
					for(var k of list4){
						listd.add(k);
						if(list3.contains(k)){
							listk.add(k);
						}
					}
					var num=1;
					num+=list2.length;
					num+=list4.length;
					num-=listj.length;
					num-=listk.length;
					if(!link)return num;
					else{
						if(listb.contains(link)){
							listb.remove(link);
							listd.add(link);
						}
						else {
							listd.remove(link);
							listb.add(link);
						}
						//  listb==list2 listd==list4
						for(var i of listb){
							if(list1.contains(i)){
								liste.add(i);
							}
						}
						for(var k of listd){
							if(list3.contains(k)){
								listf.add(k);
							}
						}
						var num2=1;
						num2+=listb.length;
						num2+=listd.length;
						num2-=liste.length;
						num2-=listf.length;
						return num2;
					}
				},
				content:function(){
					'step 0'
					var list1=get.YB_chongzhiList(player,'yb100_lieshi');//【烈誓】当前列表
					var list2=player.storage['yb100_lieshi'+'_chongzhijiList'];//刷新列表
					var list3=get.YB_chongzhiList(player,'yb100_dianzhan');//【点盏】当前列表
					var list4=player.storage['yb100_dianzhan'+'_chongzhijiList'];//刷新列表
					var listj=[],listk=[],listq=[];
					for(var i of list2){
						listq.add(i);
						if(list1.contains(i))listj.add(i[0]);//,lib.skill.yb100_huanyin.changeCards(player,i)
					}
					for(var k of list4){
						listq.add(k);
						if(list3.contains(k))listk.add(k[0]);//,lib.skill.yb100_huanyin.changeCards(player,k)
					}
					var dialog=ui.create.dialog('<font size=6><b>还阴</b></font>','forcebutton','hidden');
					dialog.add('请选择移至另一刷新列表的选项');
					if(listj.length){
						dialog.add('烈誓列表');
						dialog.add([listj,'textbutton']);
					}
					if(listk.length){
						dialog.add('点盏列表');
						dialog.add([listk,'textbutton']);
					}
					if(listj.length+listk.length>0){
						player.chooseButton(dialog,1,true);
					}
					event.list2=list2;
					event.list4=list4;
					'step 1'
					for(var m=0;m<event.list2.length;m++){
						if(event.list2[m][0]==result.links[0]){
							game.log('从【烈誓】调整了'+result.links[0]+'·至【点盏】')
							event.hhhhh=m;
						}
					}
					for(var n=0;n<event.list4.length;n++){
						if(event.list4[n][0]==result.links[0]){
							game.log('从【点盏】调整了'+result.links[0]+'·至【烈誓】')
							event.zzzzz=n;
						}
					}
					'step 2'
					if(event.hhhhh){
						player.storage['yb100_dianzhan'+'_chongzhijiList'].add(event.list2[event.hhhhh]);
						player.storage['yb100_lieshi'+'_chongzhijiList'].remove(event.list2[event.hhhhh]);
					}
					else if(event.zzzzz){
						player.storage['yb100_lieshi'+'_chongzhijiList'].add(event.list4[event.zzzzz]);
						player.storage['yb100_dianzhan'+'_chongzhijiList'].remove(event.list4[event.zzzzz]);
					}
					'step 3'
					var num666=lib.skill.yb100_huanyin.changeCards(player);
					game.log('当前已使用选项数为',num666-1)
					player.YB_changeHandCard(num666-1);
					'step 4'
					player.showCards(player.getCards('h'));
					if(player.countCards('h')==0||get.YB_suit(player.getCards('h')).length==player.getCards('h').length){
						if(player.hp<1){
							player.recover(1-player.hp);
						}
					}
				},
				// content:function*(event,map){
				// 	let player=map.player;
				// 	var list1=get.YB_chongzhiList(player,'yb100_lieshi');//【烈誓】当前列表
				// 	// var list2=get.YB_chongzhijiList(player,'yb100_lieshi');//【烈誓】刷新列表
				// 	var list2=player.storage['yb100_lieshi'+'_chongzhijiList'];//刷新列表
				// 	var list3=get.YB_chongzhiList(player,'yb100_dianzhan');//【点盏】当前列表
				// 	// var list4=get.YB_chongzhijiList(player,'yb100_dianzhan');//【点盏】刷新列表
				// 	var list4=player.storage['yb100_dianzhan'+'_chongzhijiList'];//刷新列表
				// 	var listj=[],listk=[],listq=[];
				// 	for(var i of list2){
				// 		listq.add(i);
				// 		if(list1.contains(i))listj.add(i[0]);//,lib.skill.yb100_huanyin.changeCards(player,i)
				// 	}
				// 	for(var k of list4){
				// 		listq.add(k);
				// 		if(list3.contains(k))listk.add(k[0]);//,lib.skill.yb100_huanyin.changeCards(player,k)
				// 	}
				// 	var dialog=ui.create.dialog('<font size=6><b>还阴</b></font>','forcebutton','hidden');
				// 	dialog.add('请选择移至另一刷新列表的选项');
				// 	// dialog.add(function(){//失败，被人看见还可能被笑
				// 	// 	if(ui.selected.buttons)return '摸牌数：'+(lib.skill.yb100_huanyin.changeCards(player,ui.selected.buttons[0])-1);
				// 	// 	return '摸牌数：想看的话就关闭自动确认再看'
				// 	// });
				// 	if(listj.length){
				// 		dialog.add('烈誓列表');
				// 		dialog.add([listj,'textbutton']);
				// 	}
				// 	if(listk.length){
				// 		dialog.add('点盏列表');
				// 		dialog.add([listk,'textbutton']);
				// 	}
				// 	if(listj.length+listk.length>0){
				// 		var result=yield player.chooseButton(dialog,[1,1],true);
				// 		for(var m=0;m<list2.length;m++){
				// 			if(list2[m][0]==result.links[0]){
				// 				yield player.storage['yb100_dianzhan'+'_chongzhijiList'].add(list2[m]);
				// 				player.storage['yb100_lieshi'+'_chongzhijiList'].remove(list2[m]);
				// 				// yield get.YB_chongzhijiList(player,'yb100_lieshi').remove(list2[m]);
				// 				// yield get.YB_chongzhijiList(player,'yb100_dianzhan').add(list2[m]);
				// 				var num666=lib.skill.yb100_huanyin.changeCards(player);
				// 				game.log('调整了'+result.links[0]+'，当前已使用选项数为',num666-1)
				// 				yield player.YB_changeHandCard(num666-1);
				// 				yield player.showCards(player.getCards('h'));
				// 				if(get.YB_suit(player.getCards('h')).length==player.getCards('h').length){
				// 					if(player.hp<1){
				// 						yield player.recover(1-player.hp);
				// 					}
				// 				}
				// 				event.finish();
				// 			}
				// 		}
				// 		for(var n=0;n<list4.length;n++){
				// 			if(list4[n][0]==result.links[0]){
				// 				yield player.storage['yb100_lieshi'+'_chongzhijiList'].add(list2[n]);
				// 				player.storage['yb100_dianzhan'+'_chongzhijiList'].remove(list2[n]);
				// 				var num666=lib.skill.yb100_huanyin.changeCards(player);
				// 				game.log('调整了'+result.links[0]+'，当前已使用选项数为',num666-1)
				// 				yield player.YB_changeHandCard(num666-1);
				// 				yield player.showCards(player.getCards('h'));
				// 				if(get.YB_suit(player.getCards('h')).length==player.getCards('h').length){
				// 					if(player.hp<1){
				// 						yield player.recover(1-player.hp);
				// 					}
				// 				}
				// 				event.finish();
				// 			}
				// 		}
				// 	}
				// 	var num666=lib.skill.yb100_huanyin.changeCards(player);
				// 	game.log('当前已使用选项数为',num666-1)
				// 	yield player.showCards(player.getCards('h'));
				// 	yield player.YB_changeHandCard(num666-1);
				// 	if(get.YB_suit(player.getCards('h')).length==player.getCards('h').length){
				// 		if(player.hp<1){
				// 			yield player.recover(1-player.hp);
				// 		}
				// 	}
				// 	event.finish();
				// },
			},
			// yb100_huanyin:'还阴',
			// yb100_huanyin_info:'锁定技，当你进入濒死状态时，
			// 你将技能二列表未执行且刷新列表存在的一项中移至技能一刷新列表，或将技能一列表未执行且刷新列表存在的一项中移至技能二刷新列表，
			// 然后将手牌调整至与已发动选项数相同，然后你展示手牌，若花色各不相同，你回复体力至1。（已发动选项数，即刷新列表存在，但现存列表没有的选项）',
			//-------夜白示范的傲才
			ybsl_aocai:{
				audio:2,
				enable:['chooseToUse','chooseToRespond'],
				hiddenCard:function(player,name){
					if(name!='wuxie'&&lib.inpile.contains(name)) return true;
					return false;
				},
				filter:function(event,player){
					if(event.responded||event.ybsl_aocai) return false;
					for(var i of lib.inpile){
						if(i!='wuxie'&&event.filterCard({name:i},player,event)) return true;
					}
					return false;
				},
				delay:false,
				content:function(){
					'step 0'
					var evt=event.getParent(2);
					evt.set('ybsl_aocai',true);
					var cards=get.cards((player.countCards('h')==0)?4:2);
					for(var i=cards.length-1;i>=0;i--){
						ui.cardPile.insertBefore(cards[i].fix(),ui.cardPile.firstChild);
					}
					var aozhan=player.hasSkill('aozhan');
					player.chooseButton(['傲才：选择要'+(evt.name=='chooseToUse'?'使用':'打出')+'的牌',cards]).set('filterButton',function(button){
						return _status.event.cards.contains(button.link);
					}).set('cards',cards.filter(function(card){
						if(aozhan&&card.name=='tao'){
							return evt.filterCard({
								name:'sha',isCard:true,cards:[card],
							},evt.player,evt)||evt.filterCard({
								name:'shan',isCard:true,cards:[card],
							},evt.player,evt);
						}
						return evt.filterCard(card,evt.player,evt);
					})).set('ai',function(button){
						var evt=_status.event.getParent(3);
						if(evt&&evt.ai){
							var tmp=_status.event;
							_status.event=evt;
							var result=(evt.ai||event.ai1)(button.link,_status.event.player,evt);
							_status.event=tmp;
							return result;
						}
						return 1;
					});
					'step 1'
					var evt=event.getParent(2);
					if(result.bool&&result.links&&result.links.length){
						var name=result.links[0].name,aozhan=(player.hasSkill('aozhan')&&name=='tao');
						if(aozhan){
							name=evt.filterCard({
								name:'sha',isCard:true,cards:[card],
							},evt.player,evt)?'sha':'shan';
						}
						if(evt.name=='chooseToUse'){
							game.broadcastAll(function(result,name){
								lib.skill.ybsl_aocai_backup.viewAs={name:name,cards:[result],isCard:true};
								lib.skill.ybsl_aocai_backup.prompt='选择'+get.translation(result)+'的目标';
							},result.links[0],name);
							evt.set('_backupevent','ybsl_aocai_backup');
							evt.backup('ybsl_aocai_backup');
						}
						else{
							delete evt.result.skill;
							delete evt.result.used;
							evt.result.card=get.autoViewAs(result.links[0]);
							if(aozhan) evt.result.card.name=name;
							evt.result.cards=[result.links[0]];
							evt.redo();
							return;
						}
					}
					evt.goto(0);
				},
				ai:{
					effect:{
						target:function(card,player,target,effect){
							if(get.tag(card,'respondShan')) return 0.7;
							if(get.tag(card,'respondSha')) return 0.7;
						}
					},
					order:11,
					respondShan:true,
					respondSha:true,
					result:{
						player:function(player){
							if(_status.event.dying) return get.attitude(player,_status.event.dying);
							return 1;
						}
					}
				}
			},
			ybsl_aocai_backup:{
				sourceSkill:'ybsl_aocai',
				precontent:function(){
					delete event.result.skill;
					var name=event.result.card.name;
					event.result.cards=event.result.card.cards;
					event.result.card=get.autoViewAs(event.result.cards[0]);
					event.result.card.name=name;
				},
				filterCard:function(){return false},
				selectCard:-1,
			},
			//---------------------属性杀遗址
		},//技能（必填） ……………………！…！！！【…？。！！？？？？…………
		card:{
			ybsl_fengmingjiuxiao:{
				audio:true,
				fullskin:true,
				type:'trick',
				enable:true,
				selectTarget:[1,3],
				filterTarget:function(card,player,target){
					return target!=player;
				},
				derivation:'ybsl_080phoenix',
				content:function(){
					"step 0"
					if(typeof event.baseDamage!='number') event.baseDamage=1;
					if(event.directHit) event._result={bool:false};
					else{
						var next=target.chooseToRespond({name:'shan'});
						next.set('ai',function(card){
							var evt=_status.event.getParent();
							if(get.damageEffect(evt.target,evt.player,evt.target)>=0) return 0;
							if(evt.player.hasSkillTag('notricksource')) return 0;
							if(evt.target.hasSkillTag('notrick')) return 0;
							if(evt.target.hasSkillTag('noShan')){
								return -1;
							}
						return get.order(card);
						});
						next.autochoose=lib.filter.autoRespondShan;
					}
					"step 1"
					if(result.bool==false){
						target.damage(event.baseDamage,'fire');
					}
				},
				ai:{
					wuxie:function(target,card,player,viewer){
						if(get.attitude(viewer,target)>0&&target.countCards('h','shan')){
							if(!target.countCards('h')||target.hp==1||Math.random()<0.7) return 0;
						}
					},
					basic:{
						order:9,
						useful:1,
						value:5
					},
					result:{
						target:function(player,target,card,isLink){
							var eff=function(){
								return -1.5;
							}();
							if(!isLink&&target.mayHaveShan()&&!player.hasSkillTag('directHit_ai',true,{
								target:target,
								card:card,
							},true)) return eff/1.2;
							return eff;
						},
					},
					tag:{
						respond:1,
						respondShan:1,
						damage:1,
						multitarget:1,
						multineg:1,
						fireDamage:function(card,nature){
							return 1;
						},
					}
				}
			},
			//-----------------------弥仙神术
			'ybsl_mixianshenshu':{
				audio:true,
				fullskin:true,
				enable:true,
				type:'trick',
				filterTarget:true,
				content:function (){
					'step 0'
					player.chooseControl(lib.group.filter(function(group){
						return['wei','shu','wu','qun','jin','shen','YB_memory','key']
					})).set('ai',function(target){
						return 'shen';
					});
					'step 1'
					target.changeGroup(result.control);
					target.draw(1);
				},
				chongzhu:true,
				ai:{
					order:2,
					useful:0,
					value:function(card,player,index,method){//不知道哪个参数有用，全写了
						if(player.countGroup!='shen'){
							return 7;
						}
						else {return 0}
					},
					result:{
						player:0,
						target:0,
					},
				},
				selectTarget:1,
			},
			//-----------------------鹿鸣千转
			'ybsl_lumingqianzhuan':{
				enable:true,
				type:'trick',
				fullskin:true,
				derivation:'ybslshen_017xiaohong',
				filterTarget:function (card,player,target){
					return player!=target;
				},
				content:function (){
					'step 0'
					if(!event.ybsl_luming_name){
						if(player.isAlive()) player.chooseControl('喜啼','悲鸣').set('prompt','请选择'+get.translation(target)+'的标记').set('choice',function(){
							var e1=1.5*get.sgn(get.damageEffect(target,player,target));
							var e2=0;
							if(target.countGainableCards(player,'h')>0&&!target.hasSkillTag('noh')) e2=-1;
							var es=target.getGainableCards(player,'e');
							if(es.length) e2=Math.min(e2,function(){
								var max=0;
								for(var i of es) max=Math.max(max,get.value(i,target))
								return -max/4;
							}());
							if(Math.abs(e1-e2)<=0.3) return Math.random()<0.5?'喜啼':'悲鸣';
							if(e1<e2) return '喜啼';
							return '悲鸣';
						}()).set('ai',function(){
							return _status.event.choice;
						});
						else event.finish();
					}
					'step 1'
					if(!event.ybsl_luming_name&&result&&result.control) event.ybsl_luming_name=result.control;
					if(event.directHit) event._result={bool:false};
					else target.chooseToRespond('请打出一张杀或闪响应鹿鸣千转',function(card,player){
						var name=get.name(card);
						return name=='sha'||name=='shan';
					}).set('ai',function(card){
						if(_status.event.choice=='all'){
							var rand=get.rand('ybsl_lumingqianzhuan');
							if(rand>0.5) return 0;
							return 1+Math.random();
						}
						if(get.name(card)==_status.event.choice) return get.order(card);
						return 0;
					}).set('choice',function(){
						if(target.hasSkillTag('useShan')) return 'shan';
						if(typeof event.ybsl_luming_aibuff=='boolean'){
							var shas=target.getCards('h','sha'),shans=target.getCards('h','shan');
							if(event.ybsl_luming_aibuff){
								if(shas.length>=Math.max(1,shans.length)) return 'shan';
								if(shans.length>shas.length) return 'sha';
								return false;
							}
							if(!shas.length||!shans.length) return false;
						}
						var e1=1.5*get.sgn(get.damageEffect(target,player,target));
						var e2=0;
						if(target.countGainableCards(player,'h')>0&&!target.hasSkillTag('noh')) e2=-1;
						var es=target.getGainableCards(player,'e');
						if(es.length) e2=Math.min(e2,function(){
							var max=0;
							for(var i of es) max=Math.max(max,get.value(i,target))
							return -max/4;
						}());
						if(e1-e2>=0.3) return 'shan';
						if(e2-e1>=0.3) return 'sha';
						return 'all';
					}());
					'step 2'
					var name=result.bool?result.card.name:null,require=event.ybsl_luming_name;
					if(require=='喜啼'&&name!='sha') target.damage();
					else if(require=='悲鸣'&&name!='shan'&&target.countGainableCards(player,'he')>0) player.gainPlayerCard(target,true,'he');
				},
				ai:{
					order:5,
					tag:{
						damage:0.5,
						gain:0.5,
						loseCard:1,
						respondShan:1,
						respondSha:1,
					},
					result:{
						target:function (player,target){
							var e1=1.5*get.sgn(get.damageEffect(target,player,target));
							var e2=0;
							if(target.countGainableCards(player,'h')>0&&!target.hasSkillTag('noh')) e2=-1;
							var es=target.getGainableCards(player,'e');
							if(es.length) e2=Math.min(e2,function(){
								var max=0;
								for(var i of es) max=Math.max(max,get.value(i,target))
								return -max/4;
							}());
							if(game.hasPlayer(function(current){
								return current.hasSkill('yb017_mizhu')&&get.attitude(current,player)<=0;
							})) return Math.max(e1,e2);
							return Math.min(e1,e2);
						},
					},
				},
			},
			ybsl_zhezhiqiang:{
				type:'equip',
				subtype:'equip1',
				fullskin:true,
				epic:true,
				distance:{attackFrom:-2},
				skills:['ybsl_zhezhiqiang'/*,'ybsl_zhezhiqiang_lose'*/],
				ai:{
					equipValue:4.2,
					basic:{
						equipValue:4.2,
					},
				},
				enable:true,
				selectTarget:-1,
				filterTarget:function (card,player,target){
					return target==player;
				},
				modTarget:true,
				allowMultiple:false,
				content:function (){
					if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
				},
				toself:true,
			},
			'ybsl_nohua':{
				audio:'ext:夜白神略/audio/card:true',
				fullskin:true,
				type:'ybsl_flower',
				enable:true,
				savable:true,
				defaultYingbianEffect:"all",
				filterTarget:function(card,player,target){
					if(get.is.versus()){
						return player.side==target.side;
					}
					else{
						return true;
					}
				},
				selectTarget:[1,2],
				content:function(){
					'step 0'
					if(!event.card.yingbian_all){
						event.goto(2);
					}
					'step 1'
					target.draw(event.baseDamage||1);
					target.gainMaxHp(event.baseDamage||1);
					target.changeHujia(event.baseDamage||1);
					target.recover(event.baseDamage||1);
					event.finish();
					'step 2'
					var i=target.hp!=target.maxHp?0.75:1;
					switch(Math.floor(Math.random()*4*i)){
						case 0:return target.draw(event.baseDamage||1);break;
						case 1:return target.gainMaxHp(event.baseDamage||1);break;
						case 2:return target.changeHujia(event.baseDamage||1);break;
						case 3:return target.recover(event.baseDamage||1);break;
					}
				},
				ai:{
					basic:{
						useful:9,
						value:9,
						order:4
					},
					result:{
						target:function(player,target){
							var hs=target.getCards('h');
							if(hs.length<=1){
								return 0.3;
							}
							return Math.sqrt(target.countCards('he'));
						},
					},					
					tag:{
						recover:1,
						save:1,
					}
				},
			},
			ybsl_lingyu:{
				audio:true,
				fullskin:true,
				type:'delay',
				// judge:function(card){
				// 	return 0;
				// },
				// effect:function(){},
				// ai:{
				// 	basic:{
				// 		order:1,
				// 		useful:1,
				// 		value:8,
				// 	},
				// 	result:{
				// 		target:0
				// 	},
				// },
				filterTarget:function(card,player,target){
					return lib.filter.judge(card,player,target);
				},
				judge:function(card){
					if(!get.suit(card)) return 1;
					return -2;
				},
				judge2:function(result){
					if(result.bool==false) return true;
					return false;
				},
				effect:function(){
					'step 0'
					var jud=true;
					if(player.storage.ybsl_lingyu){
						jud=false;
					}
					event.suit=result.suit;
					if(result.bool==false){
						if(player.countDiscardableCards(player,'h'))player.chooseToDiscard('h',jud).set('prompt','请弃置一张手牌，若此牌花色为'+get.translation(result.suit)+'你回复一点体力，否则失去一点体力。').set('ai',function(card){
							if(get.suit(card)==result.suit)return 16-get.value(card);
							return 6-get.value(card);
						});
					}
					else event.finish();
					'step 1'
					if(result.cards||player.storage.ybsl_lingyu){
						if(event.suit==get.suit(result.cards[0])||player.storage.ybsl_lingyu){
							player.recover();
							event.finish();
						}
					}
					'step 2'
					player.loseHp();
				},
			},
			// ybsl_lingyu_info:'出牌阶段，对一名场上角色使用。判定后，该角色需弃置一张手牌，若弃置了牌且此牌与判定结果花色相同，该角色回复一点体力，否则该角色失去一点体力。',
			//-----------------------醋
			'ybsl_cu':{//直接复制的过河
				audio:true,
				fullskin:true,
				type:'basic',
				derivation:'ybsl_019shengyan',
				enable:true,
				selectTarget:1,
				postAi:function (targets){
					return targets.length==1&&targets[0].countCards('j');
				},
				// filterTarget:function (card,player,target){
					// if(player==target) return false;
					// return target.countDiscardableCards(player,get.is.single()?'he':'hej');
				// },
				defaultYingbianEffect:"add",
				content:function (){
					'step 0'
					target.recover();
					'step 1'
					if(target.countDiscardableCards(player,'hej')){
						player.discardPlayerCard('hej',target,true);
						event.finish();
					}
				},
				ai:{
					basic:{
						order:9,
						useful:5,
						value:5,
					},
					yingbian:function (card,player,targets,viewer){
						if(get.attitude(viewer,player)<=0) return 0;
						if(game.hasPlayer(function(current){
							return !targets.contains(current)&&lib.filter.targetEnabled2(card,player,current)&&get.effect(current,card,player,player)>0;
						})) return 6;
						return 0;
					},
					result:{
						target:function (player,target){
							var att=get.attitude(player,target);
							var nh=target.countCards('h');
							if(att>0){
								if(target.countCards('j',function(card){
									var cardj=card.viewAs?{name:card.viewAs}:card;
									return get.effect(target,cardj,target,player)<0;
								})>0) return 3;
								if(target.getEquip('baiyin')&&target.isDamaged()&&
									  get.recoverEffect(target,player,player)>0){
									if(target.hp==1&&!target.hujia) return 1.6;
								}
								if(target.countCards('e',function(card){
									if(get.position(card)=='e') return get.value(card,target)<0;
								})>0) return 1;
							}
							var es=target.getCards('e');
							var noe=(es.length==0||target.hasSkillTag('noe'));
							var noe2=(es.filter(function(esx){
								return get.value(esx,target)>0;
							}).length==0);
							var noh=(nh==0||target.hasSkillTag('noh'));
							if(noh&&(noe||noe2)) return 0;
							if(att<=0&&!target.countCards('he')) return 1.5;
							return -1.5;
						},
					},
					tag:{
						loseCard:1,
						discard:1,
					},
				},
			},
			'faraway_spade':{
				fullskin:true,
			},
			'faraway_heart':{
				fullskin:true,
			},
			'faraway_club':{
				fullskin:true,
			},
			'faraway_diamond':{
				fullskin:true,
			},
			group_YB_dream:{fullskin:true},
			group_YB_memory:{fullskin:true},
			
		},
		translate:{  
			group_YB_memory:'忆势力',
			group_YB_dream:'梦势力',
			group_YB_memory_ab:'忆',
			group_YB_dream_ab:'梦',
			'ybsl_ssln':'<font color=cyan>似水流年</font>',
			'ybsl_mztz':'<span style=\'color:#00c4ff\'>梦中陶醉</span>',
			'ybsl_sjfk':'<span class=firetext>整了个活</span>',
			'ybsl_mjgx':'<span class=firetext>名将改写</span>',
			'ybsl_dzsl':'<span class=yellowtext>鬼神易制</span>',
			'ybsl_spsp':'<span class=yellowtext>sp系列</span>',
			'ybsl_jxtp':'<span class=YB_darktext>界限突破</span>',
			'ybsl_sgsh':'<span class=yellowtext>上古神将</span>',
			'ybsl_laji':'<span style=\'color:#e7ff00\'>垃圾桶</span>',

			'ybsl_ssln_info':'来自作者回忆里的角色，这种角色统一为忆势力，少数是忆梦双势力。',
			'ybsl_mztz_info':'作者本人梦见过的角色，这种角色统一为梦势力，少数是忆梦双势力。大部分都没有名字，我为了记忆和记录，就为她们取了名字。',
			'ybsl_sjfk_info':'原名神将复刻，因为这个将包都是神势力，且技能为基本都是复刻本体。后来加入了“苟卡”让这个包显得另类，于是改了名……',
			'ybsl_mjgx_info':'就是想写崭新的设计……</span>',
			'ybsl_dzsl_info':'当初我能力不足，这几个将是找鬼神易写的……',
			'ybsl_spsp_info':'主要是存放和标准版不一样的技能，有些合理的废案也被我摆着这里。',
			'ybsl_jxtp_info':'纯纯烂活，属于是新设计没地方放了',
			'ybsl_sgsh_info':'其中的武将技能均来自于某个名不见经传的民间包，有些技能为了适应环境而有所增删',
			'ybsl_laji_info':'作废的武将放在这里',

			'dzsl_luxun':'陆逊',//√
			'ybsl_zhouyuxiaoqiao':'周瑜小乔',//√
			'ybslshen_zhenji':'神甄姬',//√
			'ybslshen_zhenji_prefix':'神',//√
			ybnb_guanyinping:'关银屏',
			'dzsl_013yinji':'尹姬',//√
			'dzsl_014liutianyu':'夜白',//√
			'dzsl_014xinzhikui':'心之傀',//√
			'dzsl_015wanghairu':'王海茹',//√
			'dzsl_016manchengqi':'满城柒',//√
			'dzsl_017xiaohong':'小红',//√
			//---------------------序号---------------------//
			'ybsl_001sunlisong':'孙丽松',//√
			'ybsl_002chenailin':'陈爱琳',//√
			'ybsl_003yanshuang':'闫爽',
			'ybsl_004zhangyujie':'张玉洁',//√
			'ybsl_005wangruobing':'王若冰',//√
			'ybsl_006wanghanzhen':'王汉桢',//√
			'ybsl_007wugege':'吴格格',
			'ybsl_008wuyuxin':'吴雨欣',//√
			'ybsl_009liyushan':'李玉珊',//√
			'ybsl_010zhouyue':'周玥',//√
			'ybsl_011gaoyuhang':'高宇航',//√
			'ybsl_012zhengjiayi':'郑佳怡',
			'ybsl_014liutianyu':'夜白',//√//本人
			'ybsl_015wanghairu':'王海茹',
			'ybsl_016manchengqi':'满城柒',//本名
			'ybsl_017xiaohong':'小红',//本名
			'ybsl_018zhangqing':'张晴',//√
			'ybsl_019shengyan':'盛妍',//√
			'ybsl_020jiayutong':'贾雨桐',
			'ybsl_021liuyufeng':'刘域枫',
			'ybsl_022salt':'盐',//不知名字的某人
			'ybsl_023shiqingyu':'史庆宇',
			'ybsl_024yuetong':'岳瞳',
			'ybsl_025shiwang':'史庆宇&王贺',//--------娃娃机小游戏
			'ybsl_025shiwang_ab':'史&王',
			'ybsl_026can':'蚕',//√
			'ybsl_027rain':'雨',//✓
			'ybsl_028crystal':'晶',//√
			'ybsl_029dawn':'黎',//√
			'ybsl_030book':'书',
			'ybsl_031huanqing':'幻晴',//√
			'ybsl_032baiyichen':'白衣尘',//不知名字的某个学长
			'ybsl_033xiaohui':'小慧',//本名郭慧欣
			'ybsl_034zhoulianyuan':'周怜渊',//√
			'ybsl_035stamp':'玺',
			'ybsl_036bright':'熙',//-------------跑酷小游戏
			'ybsl_037diamondqueen':'方块Q',//√
			'db_ybsl_038tengwu_ab':'滕&武',//√
			'db_ybsl_038tengwu':'滕叔颖＆武宁',//√//不知名字的曾经的仰慕者
			'ybsl_039zhafu':'符',
			'ybsl_040ether':'安以',
			'ybsl_042pingzi':'蘋姉',//✓//本名保密
			'ybsl_043fangjiayu':'房佳瑜',
			'ybsl_044huruihang':'胡瑞航',
			'ybsl_045gaocong':'高聪',
			'ybsl_046jiangxuewu':'江雪舞',//本名保密
			'ybsl_047shan':'彡',//本名保密
			'ybsl_048wushuang':'吴爽',//√//本名保密
			'ybsl_049waner':'王婉儿',//本名保密
			'ybsl_050zunjian':'鐏柬',//本名保密
			'ybsl_051fomalhaut':'北落师门',//本名保密
			'ybsl_052trees':'姜森',//本名保密
			'ybsl_053qiuer':'秋儿',//本名保密
			'ybsl_054yueer':'悦儿',////本名保密
			'ybsl_055zhengyan':'郑琰',//本名保密
			'ybsl_056dongjianchao':'董建超',//本名保密
			'ybsl_057sunmeiqi':'孙美琪',//本名保密
			'ybsl_058sunshibo':'孙世博',//本名保密
			'ybsl_059starsFall':'星落四公主',//本名保密
			'ybsl_059starsFall1':'鞠熒',//本名保密
			'ybsl_059starsFall2':'宋橤',//本名保密橤渁
			'ybsl_059starsFall3':'周靈',//本名保密
			'ybsl_059starsFall4':'李曉',//本名保密
			'ybsl_060liutianhang':'刘天杭',//本名保密
			'ybsl_061zheyu':'哲宇',//本名保密
			'ybsl_062yuhongyan':'于洪岩',//本名保密
			'ybsl_063weimingli':'魏铭利',//本名保密
			'ybsl_064lvmingyan':'吕明岩',//本名保密
			'ybsl_065yanxiwen':'阎锡文',//本名保密
			'ybsl_066wujun':'武筠',//本名保密
			'db_ybsl_067snake':'蛇妃',//√//本名保密
			'ybsl_068qingyue':'清月姑娘',//√
			'ybsl_069xiangzi':'香紫姑娘',//√
			'ybsl_070lvyanqiu':'吕艳秋',//√




			'ybsl_075dogcard':'苟卡',//√
			'ybsl_076zhujun':'朱焌',//√
			'ybsl_077yangqixu':'羊祈絮',//√
			'ybsl_078zhuyahai':'朱涯海',
			'ybsl_079xiaoxin':'小新',
			'ybsl_080phoenix':'凤',
			'ybsl_081chenli':'陈丽',
			'ybsl_081chensi':'陈思',
			'ybsl_082bianqiuwen':'卞秋雯',
			'ybsl_083xiaozhu':'小筑',
			'ybsl_084zhangmi':'张汨',//√
			'ybsl_085DGY':'独孤雨',
			'ybsl_086GJ':'龚洁',


			// 'ybnb_034zhoulianyuan_ab':'周怜渊',//√
			'ybnb_034zhoulianyuan':'界周怜渊',
			'ybnb_034zhoulianyuan_prefix':'界',

			'ybslshen_014liutianyu':'神夜白',
			'ybslshen_017xiaohong':'神小红',
			'ybslshen_018zhangqing':'神张晴',
			'ybslshen_002chenailin':'神陈爱琳',
			'ybslshen_071faraway':'想去远方',
			'ybslshen_073Al':'铝',
			'ybslshen_074piao':'花落隨風',
			'ybslshen_001sunlisong':'神孙丽松',
			'ybslshen_100Cosette_ab':'珂赛特',
			'ybslshen_100Cosette':'u',

			'ybslshen_014liutianyu_prefix':'神',
			'ybslshen_017xiaohong_prefix':'神',
			'ybslshen_018zhangqing_prefix':'神',
			'ybslshen_002chenailin_prefix':'神',
			'ybslshen_071faraway_prefix':'神',
			'ybslshen_073Al_prefix':'神',
			'ybslshen_074piao_prefix':'神',
			'ybslshen_001sunlisong_prefix':'神',
			'ybslshen_100Cosette_prefix':'神',

			// 'db_ybsp_014liutianyu_ab':'夜白',
			'db_ybsp_014liutianyu':'SP夜白',
			'db_ybsp_014liutianyu_prefix':'SP',
			// 'ybsp_016manchengqi_ab':'满城柒',
			'ybsp_016manchengqi':'SP满城柒',
			'ybsp_016manchengqi_prefix':'SP',
			// 'ybsp_072sulingyi_ab':'苏令燚',
			'ybsp_072sulingyi':'SP苏令燚',
			'ybsp_072sulingyi_prefix':'SP',
			'db_ybsp_038tengwu_ab':'SP滕&武',
			'db_ybsp_038tengwu':'SP滕叔颖＆武宁',
			'db_ybsp_038tengwu_prefix':'SP',
			// 'ybsp_002chenailin_ab':'陈爱琳',
			'ybsp_002chenailin':'SP陈爱琳',
			'ybsp_002chenailin_prefix':'SP',
			// 'ybsp_027rain_ab':'雨',
			'ybsp_027rain':'SP雨',
			'ybsp_027rain_prefix':'SP',
			// 'ybsp_001sunlisong_ab':'孙丽松',
			'ybsp_001sunlisong':'SP孙丽松',
			'ybsp_001sunlisong_prefix':'SP',


			// 'ybart_014liutianyu':'夜白',//√//本人
			// 'ybart_015wanghairu':'王海茹',
			// 'ybart_016manchengqi':'满城柒',//本名
			// 'ybart_017xiaohong':'小红',//本名

			// 'ybsl_018zhangqing_feian_ab':'张晴',
			'ybsl_018zhangqing_feian':'废案张晴',
			'ybsl_018zhangqing_feian_prefix':'废案',
			'ybold_019shengyan':'废案盛妍',
			'ybold_019shengyan_prefix':'废案',
			// 'ybsb_084zhangmi_ab':'张汨',
			'ybsb_084zhangmi':'通渠张汨',
			'ybsb_084zhangmi_prefix':'通渠',
			// 'ybslshen_002chenailin_feian_ab':'神陈爱琳',
			'ybslshen_002chenailin_feian':'废案神陈爱琳',
			'ybslshen_002chenailin_feian_prefix':'废案神',
			// 'ybsb_077yangqixu_ab':'羊祈絮',//√
			'ybsb_077yangqixu':'旧版羊祈絮',//√
			'ybsb_077yangqixu_prefix':'旧版',//√
			// 'ybsb_068qingyue_ab':'清月姑娘',//√
			'ybsb_068qingyue':'旧版清月姑娘',//√
			'ybsb_068qingyue_prefix':'旧版',//√
			// ybsb_048wushuang_ab:'吴爽',//√
			ybsb_048wushuang:'旧版吴爽',//√
			ybsb_048wushuang_prefix:'旧版',//√
			'ybsl_hejiezhe':'和解者',//最初是实验技能用的，
			'ybsl_leishang':'雷伤',
			'ybsl_leishang_info':'造成伤害改为雷伤，受到雷伤回复体力',
			//----------------------装备及其他
			'ybsl_mixianshenshu':'弥仙神术',//达成
			'ybsl_mixianshenshu_info':'出牌阶段，对一名任意角色使用，改变目标的势力并令其摸一张牌。可重铸。',
			'ybsl_cu':'醋',//达成
			// 'ybsl_cu_info':'出牌阶段，对区域里有牌的一名其他角色使用。你弃置其区域里的一张牌。',
			// 'ybsl_cu_info':'出牌阶段，对一名其他角色使用，或当你进入濒死状态时，你可以对自己使用，令目标回复一点体力（虚拟和转化的醋不执行此效果）（都没实体牌，喝了个寂寞），然后弃置其一张牌。当此牌因弃置而离开某人手牌区时，该角色需弃置一张牌。',
			'ybsl_cu_info':'出牌阶段，对一名其他角色使用，或当你进入濒死状态时，你可以对自己使用，令目标回复一点体力，然后弃置其一张牌。',
			'ybsl_lumingqianzhuan':'鹿鸣千转',//达成
			'ybsl_lumingqianzhuan_bg':'鸣',
			'ybsl_lumingqianzhuan_info':'出牌阶段，对一名其他角色使用。你将目标角色标记为“喜啼”或“悲鸣”（对其他角色不可见）。然后目标角色可以打出一张【杀】或【闪】。若其是“喜啼”且未打出【杀】，则你对其造成1点伤害；若其是“悲鸣”且未打出【闪】，则你获得其一张牌。',
			'faraway_spade':'♠',
			'faraway_spade_bg':'♠️',
			'faraway_heart':'♥',
			'faraway_heart_bg':'♥️',
			'faraway_club':'♣',
			'faraway_club_bg':'♣',
			'faraway_diamond':'♦',
			'faraway_diamond_bg':'♦️️',
			ybsl_fengmingjiuxiao:'凤鸣九霄',
			ybsl_fengmingjiuxiao_bg:'彻',
			ybsl_fengmingjiuxiao_info:'出牌阶段，对至多三名其他角色使用，目标需打出一张闪，否则受到一点火焰伤害。',
			ybsl_zhezhiqiang:'折枝枪',
			ybsl_zhezhiqiang_bg:'枝',
			ybsl_zhezhiqiang_info:'每回合限一次，你可以根据此牌花色在适当的时机使用此牌对应的花朵；当此牌进入弃牌堆时，根据此牌花色和点数将此牌改为对应的花朵。<br>梅花：梅花；方块：兰花；<br>黑桃：竹子；红桃：菊花。<br><span style="opacity:0.05;">无花：无花</span>',
			ybsl_zhezhiqiang_append:'随手采折一根树枝就能当武器。',
			// ybsl_zhezhiqiang_append:'落红不是无情物，化作春泥更护花。',
			ybsl_nohua:'无花',
			ybsl_nohua_info:'出牌阶段，对至多两名角色使用，随机执行一种花的效果，但不触发追加效果。',
			ybsl_nohua_append:'这都被你发现了。',
			ybsl_lingyu:'灵雨',
			ybsl_lingyu_info:'出牌阶段，对一名场上角色使用。判定后，该角色需弃置一张手牌，若弃置了牌且此牌与判定结果花色相同，该角色回复一点体力，否则该角色失去一点体力。',
			// ybsl_lingyu_info:'出牌阶段，对一名场上角色使用。若判定结果为黑色，则其将手牌数与体力值中较少的一项调整至与另一项相等（溢出的恢复值以破碎勾玉展示）（数值至多调整至8）。',
			// ybsl_lingyu_info:'出牌阶段，对一名场上角色使用。若判定结果为黑色，其将手牌调整至体力值，然后回复一点体力；否则其将体力值调整至手牌数，然后摸两张牌。',
			//---------------------技能（鬼神易）
			'dzsl_shennu':'神弩',
			'dzsl_shennu_info':'限定技，出牌阶段，你可以弃置所有手牌并指定一名其他角色，你翻开牌堆顶的一张牌，若为杀，则视为你立即对其使用，不为杀则弃置。若此时已翻开的牌数少于X加Y（X为你已损失体力值且至少为1，Y为场上存活角色数且至少为3），则你重复此流程直到该角色进入濒死状态或已翻开牌数满足条件。若目标进入濒死被救回，你不能再对其使用牌直到回合结束。',
			'dzsl_buxi':'不息',
			'dzsl_buxi_info':'锁定技，当你脱离濒死状态后或你因发动【神弩】或卡牌而击杀一名角色后，你重置【神弩】并可以升级【神弩】或摸一张牌。',
			'dzsl_shenhuo':'神火',
			'dzsl_shenhuo_info':'锁定技，当你受到一点伤害时你选择一项；1.升级【神弩】；2.摸一张牌',
			'dzsl_shennu_up':'神弩升级',
			'dzsl_shennu_up_info':'1.将描述中的X或Y的最低值+1(单项最低值至多为5)；2.若描述中的X与Y最低值均已达到上限则此次升级改为你每因【神弩】弃置一张牌则此次结算流程中展示了不是【杀】的牌时将弃置改为将此牌当做火【杀】对目标使用。',
			'dz017_zhushi':'注视',
			'#dz017_zhushi1':'我在看着你哦~',
			'#dz017_zhushi_buff1':'呵呵~，你也注意到我了。',
			'#dz017_zhushi_shibai1':'哼，你看都不看我。',
			'dz017_zhushi_info':'回合结束时，你可以记录一名其他角色(效果触发前不可见)，然后该角色于其出牌阶段内使用牌指定你为目标后你摸X张牌(X为其本阶段使用的牌数且至多为5)；该角色的结束阶段开始时，若其本回合没有使用牌指定你为目标，则你获得其一张牌，然后你失去一点体力。',
			'dz017_shanwu':'善舞',
			'#dz017_shanwu1':'起舞翩然落仙宫，或举银月，或送长风。',
			'dz017_shanwu_info':'出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌。然后若你本次弃置的牌均为：基本牌，你回复一点体力；锦囊牌，你摸两张牌；装备牌，本回合接下来造成的伤害+1。',
			'dz016_zanxu':'赞许',
			'dz016_zanxu_info':'出牌阶段限一次，你可以将一张红桃牌正面朝上交给一名其他角色。若如此做，则该角色于其下一个回合内第一次回复体力时，你摸两张牌。',
			'dz016_shanwu':'善舞',
			'dz016_shanwu_info':'出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌。然后若你本次弃置的牌均为：基本牌，你回复一点体力；锦囊牌，你摸两张牌；装备牌，本回合接下来造成的伤害+1。',
			'dz015_xianzhe':'贤者',
			'dz015_xianzhe_info':'每回合限一次，你可以将两张手牌当做任意一张普通锦囊牌使用，若如此做，该牌结算完毕后你摸一张牌。',
			'dz015_tianshu':'天书',
			'dz015_tianshu_info':'当你于回合外成为其他角色使用普通锦囊的目标后，你可以记录此牌名(覆盖上一次的记录)；出牌阶段开始时，你可以视为使用你记录牌名的牌。',
			'dz015_shugu':'疏骨',
			'dz015_shugu_info':'锁定技，当你受到【杀】直接造成的伤害时，若你没有装备防具且伤害来源装备了武器，则此伤害+1。',
			'dz015_enguang':'恩广',
			'dz015_enguang_info':'主公技，每名其他忆势力角色限一次，当你受到伤害时，其可以防止此伤害，然后其受到等量的无来源伤害。',
			'dz014_shanwu':'善舞',
			'dz014_shanwu_info':'出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌。然后若你本次弃置的牌均为：基本牌，你回复一点体力；锦囊牌，你摸两张牌；装备牌，本回合接下来造成的伤害+1。',
			'dz014_fuhua':'腐化',
			'dz014_fuhua_info':'锁定技，你的回合开始时或你使用黑色牌时，你获得一枚“腐”；你使用红色牌时移去一枚“腐”；你的手牌上限+X(X为你的“腐”标记数)。',
			'dz014_xinsheng':'新生',
			'dz014_xinsheng_info':'锁定技，结束阶段开始时或你进入濒死状态时，若你拥有至少三个“腐”标记且标记数大于你的体力上限，则你移去所有“腐”，摸等量的牌，并扣减一点体力上限，然后你将体力回复至体力上限。',
			'dz014_xinkui':'心傀',
			'dz014_xinkui_info':'锁定技，其他角色死亡后，若其不为“心之傀”，则你令其将武将牌替换为“心之傀”复活并由你操控。',
			'dz014_zaomeng':'造梦',
			'dz014_zaomeng_info':'主公技，其他忆势力角色使用黑色牌时可以令你获得一个“腐”标记；使用红色牌时可以令你移去一个“腐”标记。',
			'dz014_qingling':'轻灵',
			'dz014_qingling_info':'锁定技，你的手牌上限+1；当你受到大于一点的伤害时防止之，然后流失一点体力。',
			'dz014_yangkui':'养傀',
			'dz014_yangkui_info':'锁定技，你的召唤者扣减体力上限时你增加等量的体力上限；结束阶段若你的召唤者已死亡则你死亡。',
			'dz014_xianji':'献祭',
			'dz014_xianji_info':'出牌阶段或你的召唤者濒死向你求桃时，你可以令其增加Y点体力上限并回复X点体力(Y为你的体力上限，X为你的体力值，若因濒死而触发则改为令其回复至一点体力)',
			'dz013_qingling':'轻灵',
			'dz013_qingling_info':'锁定技，你的手牌上限+1；当你受到大于一点的伤害时防止之，然后流失一点体力。',
			'dz013_shanwu':'善舞',
			'dz013_shanwu_info':'出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌。然后若你本次弃置的牌均为：基本牌，你回复一点体力；锦囊牌，你摸两张牌；装备牌，本回合接下来造成的伤害+1。',
			
			//-------------------------------周瑜小乔
			'ybsl_xianyin':'弦音',
			'ybsl_xianyin_info':'转换技，（括号内的阴阳为鸾鸣的形态）<br/>阴（阴）：当你因弃置而失去一张黑桃牌时，你可令一名角色下个摸牌阶段额外摸一张牌；（若你没有鸾鸣或鸾鸣已使用则改为黑色牌）<br/>阴（阳）：当你因弃置而失去一张梅花牌时，你可令一名角色回复一点体力；（若你没有鸾鸣或鸾鸣已使用则改为黑色牌）<br/>阳（阴）：当你因弃置而失去一张红桃牌时，你可令一名角色失去一点体力；（若你没有鸾鸣或鸾鸣已使用则改为红色牌）<br/>阳（阳）：当你因弃置而失去一张方块牌时，你可令一名角色下个摸牌阶段少摸一张牌。（若你没有鸾鸣或鸾鸣已使用则改为红色牌）',
			'ybsl_luanming':'鸾鸣',
			'ybsl_luanming_info':'转换技，每回合限一次，当你可以使用牌时，你可以弃置一黑一红共两张牌，然后：阴：视为使用其中的黑色牌并额外执行一次；阳：视为使用其中的红色牌并额外执行一次。<br><span class=yellowtext>注意：此技能不能用于响应其他牌，更不能在别人濒死时用桃选择其为目标！</span>',
			'ybsl_luanming_append':'注意：此技能不能用于响应其他牌，更不能在别人濒死时用桃选择其为目标！',

			//-------------------------------神甄姬
			ybsl_zjzilian:'自怜',
			ybsl_zjzilian_info:'当你成为锦囊牌的目标时，你可以摸一张牌。',
			ybsl_zjsqiyuan:'祈愿',
			ybsl_zjsqiyuan_info:'出牌阶段限一次，你可以进行一次判定，若结果为黑色，你摸一张牌，并重置此技能，否则你需令一名其他角色摸两张牌。',
			ybsl_zjsshixiang:'诗想',
			ybsl_zjsshixiang_info:'限定技，回合开始时，你可以弃置所有手牌，然后摸三倍数量的牌（至多9张），并且跳过本回合弃牌阶段。',

			'ybsl_hejie':'和解',
			'ybsl_hejie_info':'每回合限一次，当有角色受到其他角色的伤害时，你可以取消此伤害，令双方各摸一张牌。',
			
			'ybsl_beige':'悲歌',
			'ybsl_beige_info':'当有角色受到【杀】造成的伤害后，你可以弃一张牌，并令其进行一次判定，若判定结果为：♥该角色回复1点体力；♦︎该角色摸两张牌；♣伤害来源弃两张牌；♠伤害来源将其武将牌翻面',
			
			'ybsl_xuxian':'栩仙',
			'ybsl_xuxian_info':'出牌阶段，你可以将一张方块手牌当做【弥仙神术】使用或重铸。',
			'ybsl_xuxian1':'栩仙',
			'ybsl_xuxian1_info':'',
			'ybsl_xuxian2':'铸仙',
			'ybsl_xuxian2_info':'',
			ybsl_doubleEquip:'双持',
			ybsl_doubleEquip_info:'你可以同时装备两件武器。',
			
			ybsl_infEquip:'合体',
			ybsl_infEquip_info:'神装加身，铠甲合体，所有装备牌不受数量限制',

			//------------界篝
			kagari_ybzongsi:'纵丝',
			kagari_ybzongsi_info:'出牌阶段限一次，你可以选择一张不在游戏外的牌，然后将其置于牌堆/弃牌堆的顶部/底部或一名角色的对应区域内，<span class=yellowtext>并赋予该牌合理的视为牌名直到此牌离开该区域。</span>',

			//------------界张琪瑛
			xinfu_ybfalu:'法箓',
			xinfu_ybfalu_info:'锁定技，游戏开始时，你获得「紫薇」「后土」「玉清」「勾陈」<span class=yellowtext>「虚无」</span>标记各一个。当你的牌因弃置而进入弃牌堆后，根据这些牌的花色，你获得对应的标记：黑桃，你获得1枚「紫薇」；梅花，你获得1枚「后土」；红桃，你获得1枚「玉清」；方块，你获得1枚「勾陈」；<span class=yellowtext>无花，你获得1枚「虚无」。（每种标记至多拥有3个）<br>当除「虚无」外其他标记溢出时，若「虚无」尚未溢出，则改为获得「虚无」</span>',
			xinfu_ybzhenyi:'真仪',
			xinfu_ybzhenyi_info:'你可以在以下时机弃置相应的标记来发动以下效果：一名角色的判定牌生效前，你可以弃置一枚「紫薇」，然后将判定结果改为任意花色且点数为5；你的回合外，你可以弃置一枚「后土」，然后将你的一张手牌当【桃】使用；当你造成伤害时，你可以弃置一枚「玉清」，然后令此伤害+1；当你受到伤害后，你可以弃置一张「勾陈」，然后你从牌堆中随机获得三种类型的牌各一张。<span class=yellowtext>当你没有对应标记时，若你有「虚无」，你可改为弃置一张「虚无」</span>',
			xinfu_ybdianhua:'点化',
			xinfu_ybdianhua_info:'准备阶段或结束阶段，你可以观看牌堆顶的X张牌（X为你的「紫薇」「后土」「玉清」「勾陈」<span class=yellowtext>「虚无」</span>标记数的总和）。若如此做，你将这些牌以任意顺序放回牌堆顶或牌堆底。',

			//------------界神诸葛亮
			ybsl_qixing:"七星",
			ybsl_qixing_info:'游戏开始时，你将牌堆顶的七张牌置于你的武将牌上，称之为“星”。然后你可用任意数量的手牌等量交换这些“星”；<span class=yellowtext>摸牌阶段结束后，你可以获得武将牌上所有星，然后选择至多七张手牌置于武将牌上称为星。</span>',
			ybsl_kuangfeng:'狂风',
			ybsl_kuangfeng_info:'<span class=yellowtext>出牌阶段限一次</span>/结束阶段，你可以弃置1张“星”并指定一名角色：直到你的下回合开始，该角色受到火焰伤害时，此伤害+1。',

			//------------界佐藤雏
			hina_ybshenshi:'神视',
			hina_ybshenshi_info:'神势力技。出牌阶段开始时/结束时，你可摸两张牌，<span class=yellowtext>然后将一张手牌置于牌堆顶</span>。你以此法获得的牌视为拥有全部应变效果，<span class=yellowtext>且可以无条件发动，且不计入手牌上限</span>。',
			//------------界神户小鸟
			kotori_ybyumo:'驭魔',
			kotori_ybyumo_info:'锁定技，游戏开始时，<span class=yellowtext>或场上有角色阵亡时</span>，你获得蓝色、红色、绿色、黄色、灰色、<span class=yellowtext>紫色、雪色、粉色</span>魔物各一个。当有角色受到伤害后，或你的回合开始时，<span class=yellowtext>若你对应的标记小于三个</span>，你根据其势力获得一个对应魔物：魏：蓝、蜀：红、吴：绿、群：黄、灰：晋、键：紫、<span class=yellowtext>忆：雪、梦：粉、神：随机获得两个任意魔物</span>。<span class=yellowtext>回合开始时，你可以反复弃置多个不同的魔物并获得对应技能直到回合结束：蓝：魏业、红：蜀义、绿：吴耀、黄：群心、灰：晋势、紫：键魂、雪：忆水、粉：散梦。</span>',
			kotori_skill_YB_memory:'忆水',
			kotori_skill_YB_memory_info:'回合结束后，你可以获得一张本回合进入弃牌堆的牌。',
			kotori_skill_YB_dream:'散梦',
			kotori_skill_YB_dream_info:'回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1，且你可以于弃牌阶段开始时弃置两张牌，取消此次手牌上限-1。',
			kotori_yumo_YB_memory:'<span style=\'color:#28e3ce\'>魔物</span>',
			kotori_yumo_YB_dream:'<span style=\'color:#e328b7\'>魔物</span>',
			kotori_ybhuazhan:'花绽',
			kotori_ybhuazhan_info:'每回合每种魔物对每种牌各限一次，你可将一个蓝色/红色/绿色/黄色/紫色/灰色魔物当做【树上开花】<span class=yellowtext>或【移花接木】或【刮骨疗毒】</span>使用。',
			//-----------umi
			sp_key_umi:'SP加藤うみ',
			sp_key_umi_prefix:'SP',
			// umi_caiyi:'彩翼',
			// umi_caiyi_info:'彩翼',
			// umi_guili:'归离',
			// umi_guili_info:'归离',
			//------------界马钧
			xinfu_ybjingxie:'精械',
			xinfu_ybjingxie_info:'出牌阶段，你可以展示一张未强化过的【诸葛连弩】或标准包/军争包/SP包中的防具牌，<span class=yellowtext>赤兔，王追，闪电及其变种牌，洪水，火山，朱雀扇及其变种牌，倚天剑，毒，青龙刀，铜雀，护心镜</span>，然后对其进行强化。当你处于濒死状态时，你可以重铸一张防具牌，然后将体力回复至1点。',
			//----------------------孙丽松
			'yb001_fufeng':'扶风',
			'yb001_fufeng_info':'出牌阶段开始时，你可以摸X张牌（X为你已损体力值且至多为3）。',
			'yb001_wanyue':'挽月',
			'yb001_wanyue_info':'结束阶段，你可以摸4-Y张牌 （至少为1），Y为你当前手牌中的花色数。',
			'yb001_beige':'悲歌',
			'yb001_beige_info':'当有角色受到【杀】造成的伤害后，你可以弃一张牌，并令其进行一次判定，若判定结果为：♥该角色回复1点体力；♦︎该角色摸两张牌；♣伤害来源弃两张牌；♠伤害来源将其武将牌翻面',
			//---------------以下均为废案孙丽松（主要是不好写）
			'ybold_shenian':'设念',
			'ybold_shenian_info':'限定技，非主公技，出牌阶段，你可以指定一名其他角色获得标记“念”。当你死亡后，你可令该角色回复一点体力并将你因死亡而置入弃牌堆的牌都交给该角色，然后该角色获得〖挽月〗。当对方死亡后，你可以与其互换座位，并舍弃你原本身份，视为你继承该角色身份继续游戏（你胜利即为该角色胜利），然后若场上没有与你身份相同的角色，你摸三张牌。',
			// 'yb001_yishui_ab':'挽月',
			'yb001_yishui':'忆水',
			'yb001_yishui_info':'回合结束时，你可以获得一张本回合进入弃牌堆的牌。',
			'yb001_shenian':'新设念',
			'yb001_shenian_ab':'设念',
			'yb001_shenian_info':'游戏开始时或准备阶段，若场上没有被你标记为“念”的角色，你可以标记一名角色为“念”（此过程不记录且触发效果前其他人不可见）。每回合限一次，当你或其回复体力/受到伤害后，若其体力值不等于你，你可以交换双方体力上限，然后令其失去或回复体力至Y，并令你回复或失去体力至X（X为触发技能时其的体力值，Y为触发技能时你的体力值。）。',
			'yb001_chuilian':'垂怜',
			'yb001_chuilian_info':'出牌阶段，你可以展示至多两张同花色的牌并交给一名其他角色，令其回复一点体力，并令其获得一枚“恩”。拥有“恩”的角色摸牌阶段开始时，其可放弃摸牌并移除一枚“恩”，并令你摸两张牌（若其“恩”的数量不小于三，则此效果强制执行。）。',
			'yb001_minglun':'命轮',
			// 'yb001_minglun_info':'锁定技，回合开始时，根据你已损体力值：<br/>不小于1：你可选择一个牌的类型，本回合使用此类型的牌时，摸一张牌；<br/>不小于2：你可获得一张随机装备；<br/>不小于3：你可摸3张牌。<br/>结束阶段，你回复X点体力或摸2X张牌（记X为回合开始时你可选的选项，但你没选，且当前阶段不满足的选项数）',
			'yb001_minglun_info':'锁定技，回合开始时，你展示牌堆顶一张牌并放在武将牌上，至多放四张。根据“命轮”的花色，你视为拥有技能：<br>黑桃：栖月；红桃：旅心；<br>梅花：折叶；方块：忆水。<br>结束阶段，若“命轮”包含相同花色或四种花色，则你需弃置所有“命轮”或失去一点体力。',
			'yb001_minglun_spade':'命轮：栖月',
			'yb001_minglun_spade_info':'锁定技，任意角色回合开始时，你打出一张牌或移去一枚“梦”；任意角色回合结束时，你摸两张牌。<span class=firetext>这是作者因为菜所以写的版本。</span>',
			'yb001_minglun_heart':'命轮：旅心',
			'yb001_minglun_heart_info':'你使用牌时，若此牌当与你于此回合内使用的上一张牌的类别不同，则你可以摸一张牌；',
			'yb001_minglun_club':'命轮：折叶',
			'yb001_minglun_club_info':'锁定技，每当你的体力值变动一点时，你摸一张牌。',
			'yb001_minglun_diamond':'命轮：忆水',
			'yb001_minglun_diamond_info':'回合结束时，你可以获得一张本回合进入弃牌堆的牌。',
			'yb001_haowan':'皓腕',
			'yb001_haowan_info':'锁定技，每回合限一次，当你受到伤害时，若你装备区有与造成伤害的牌花色相同的牌，则防止此伤害。',
			'#yb001_haowan1':'垆边人似月，皓腕凝霜雪。',
			yb001_yongyue:'咏月',
			yb001_yongyue_info:'锁定技，判定阶段开始时/当你受到伤害时，若你存在已损体力值，你跳过之，改为失去空血条，然后摸等量牌；当你失去牌后，若你的已损体力值小于1，你增加一点体力上限。',
			'#yb001_yongyue1':'世间悲欢离合，但无两全策。',
			'#yb001_yongyue2':'人有悲欢离合，月有阴晴圆缺，此事古难全。',
			//--------------------------陈爱琳
			'yb002_ziren':'自刃',
			'yb002_ziren_info':'出牌阶段限一次，你可以对自己造成一点伤害，属性从（无，火，雷）中自选',
			'yb002_shangyuan_ab':'殇怨',
			'yb002_shangyuan':'新殇怨',
			'yb002_shangyuan_info':'当你受到伤害后，你可以令一名角色摸X张牌或弃X张牌（X为目标角色的已损体力值，且X取值于[1,5]，然后计数+X。你回合结束时，重置计数。',
			//-----------------------神陈爱琳
			'yb002_yiqu':'易取',
			'yb002_yiqu_info':'出牌阶段限一次，你可以选择一张不在游戏外的牌，然后将其置于牌堆/弃牌堆的顶部/底部或一名角色的对应区域内。若你拥有〖新殇怨〗，则当殇怨计数大于Y时，此技能不能发动。（Y为存活角色数*2-1）',
			'ybold_shangyuan':'殇怨',
			'ybold_shangyuan_info':'出牌阶段限X次，若你〖易取〗已发动，你可以重置〖易取〗。（X为你已损体力值）',
			//-----------------------旧版陈爱琳（主要是不好写）（改版并用于SP）
			'yb002_touxin':'偷心',
			// 'yb002_touxin_info':'每回合对每名角色限一次。出牌阶段，你可以选择一名其他角色，然后声明一个花色，然后获得其一张手牌并展示，若花色与你声明的相同，你可回复一点体力并摸一（若你有‘香’，则此处数值改为‘香’的数量）张牌，然后你可以将一张牌交给该角色；若花色与你声明的不同，你失去一点体力。',
			'yb002_touxin_info':'出牌阶段，你可以失去一点体力，然后获得一名其他角色hej区域的一张牌。',
			'yb002_zheye':'折叶',
			'yb002_zheye_info':'锁定技，每当你的体力值变动一点时，你摸一张牌。',
			'yb002_xiangyun':'香陨',
			// 'yb002_xiangyun_info':'（若你体力值不大于2，则此处增加“场上角色的”）准备阶段（若你未受伤，则此处增加“或结束阶段”），你可以展示牌堆顶一张牌，并将之放在你的武将牌上称为“香”，若有“香”中有其它与本次展示的牌同花色的牌，你需弃置一张与本次展示牌同花色手牌，否则失去一点体力。<br>场上角色出牌阶段开始时，其可以弃置一张手牌，获得你的一张同花色的“香”。<br>当你进入濒死状态时，你可以获得所有“香”并恢复一点体力，然后定格〖偷心〗并失去〖香陨〗',
			// 'yb002_xiangyun_info':'锁定技，你的手牌、装备区的牌、判定区的牌进入弃牌堆时，你将之放在武将牌上称为“香”。当你进入濒死状态时，你可以移除4张花色各不相同的“香”，然后回复体力至1。',
			'yb002_xiangyun_info':'使命技，游戏开始时，你将牌堆顶X张牌置于武将牌上称为“香”，X为场上角色数一半向下取整。<br>①每轮开始时，你需将至少一张花色各不相同的牌（二或更多周目则没有花色限制）置入“香”，然后摸 等量（二或更多周目则改为双倍）的牌。<br>②场上角色的出牌阶段开始时，若其为你或手牌数小于体力值，其可以获得你的一张“香”，<br>③成功：准备阶段，若你的“香”包含三种花色（二或更多周目则改为四种），则你获得所有“香”，并回复一点体力，然后在本轮结束时重新激活并令周目数+1。<br>④失败：准备阶段，若你没有“香”，你失去一点体力并重铸所有手牌，然后在本轮结束时重新激活（不过不增加周目数）。',
			'yb002_yishui':'忆水',
			'yb002_yishui_info':'回合结束时，你可以获得一张本回合进入弃牌堆的牌。',
			'yb002_yishui_append':'香陨太难写了，先鸽了',
			//-----------------------闫爽
			'yb003_wucai':'无猜',
			'yb003_wucai_info':'锁定技，摸牌阶段摸牌时，你额外摸一张牌；当你受到伤害时，若你体力值不小于一，则视为体力流失。',
			'yb003_toushi':'偷食',
			// 'yb003_toushi_info':'出牌阶段限一次，你可以观看一名其他角色的手牌并获得其中一张【桃】或【酒】（没有【桃】或【酒】则改为任意一张），然后其可以对你使用一张【杀】。',
			'yb003_toushi_info':'出牌阶段，你可以观看一名其他角色的手牌并获得其中一张带有回复属性的牌，然后其可以对你使用一张【杀】。（若你空手而归或被对方成功抓包，则此技能本阶段失效）',
			'yb003_fenxaing':'分享',
			'yb003_fenxaing_info':'当你使用【桃】或【酒】时，可以额外选择一名角色为目标；<br>其他角色使用【桃】或【酒】时，其可以令你成为额外目标。',
			//-----------------------张玉洁
			'yb004_wunv':'巫女',
			'yb004_wunv_info':'锁定技，你使用的普通锦囊牌不能被无懈可击响应；当你对手牌数不大于你的其他角色造成伤害时，此伤害+1。',
			'yb004_tianqi':'天祈',
			'yb004_tianqi_info':'锁定技，当你对其他角色造成伤害后，你进行判定：若伤害不大于1，且结果为红色，你回复一点体力或摸一张牌；若伤害大于1，且结果为黑色，你失去一点体力并摸一张牌。当你受到伤害后，你进行判定，若结果为黑色，你摸x+1张牌，否则你恢复x-1点体力（x为此次伤害值）（此技能不可触发界雷击）',
			'yb004_shangyuan':'殇怨',
			'yb004_shangyuan_info':'觉醒技，当你造成伤害致人死亡后，若伤害大于1，则你失去〖巫女〗，修改〖天祈〗（修改后的技能可以触发界雷击），然后选择恢复一点体力或摸两张牌，最后获得〖玉洁〗。',
			yb004_tianqi_rewrite:'天祈·改',
			yb004_tianqi_rewrite_info:'准备阶段或结束阶段或当你受到伤害后，你可以进行一次判定，若结果为红色，则你回复一点体力或摸两张牌。',
			'yb004_yujie':'玉洁',
			'yb004_yujie_info':'锁定技，当你即将进行判定时，你翻开牌堆顶一张牌，并选择是否弃置；你的判定牌和判定结果无法被修改。',
			//-----------------------王若冰
			'yb005_bingqing':'冰清',
			'yb005_bingqing_info':'锁定技，你的【杀】均视为【冰杀】，其他角色使用的【冰杀】，【雪杀】或装备【寒冰剑】，【飘雪如意】（4.1.7版本更名为飘雪神符）后使用的【杀】对你无效。',
			'yb005_ruyu':'如玉',
			// 'yb005_ruyu_info':'当你即将造成冰属性伤害时，你可以弃置任意张牌，令等量其他角色进入横置状态，然后你摸X张牌，X为当前场上处于横置状态的角色。',//即将造成冰属性伤害这个概念太抽象了……
			'yb005_ruyu_info':'锁定技，当你受到伤害时，你摸xʸ张牌，x为本次伤害值，y为你体力值，最终摸牌数不大于10。',
			yb005_qianxun:'谦逊',
			yb005_qianxun_info:'锁定技，你不能成为【顺手牵羊】和【乐不思蜀】的目标。',
			'yb005_jieshen':'洁身',
			'yb005_jieshen_info':'准备阶段，你可以失去一点体力上限，然后获得以下技能之一：〖无猜〗，〖折叶〗，〖玉洁〗。然后你摸三张牌。',
			'yb005_wucai':'无猜',
			'yb005_wucai_info':'锁定技，摸牌阶段摸牌时，你额外摸一张牌；当你受到伤害时，若你体力值不小于一，则视为体力流失。',
			'yb005_zheye':'折叶',
			'yb005_zheye_info':'锁定技，每当你的体力值变动一点时，你摸一张牌。',
			'yb005_yujie':'玉洁',
			'yb005_yujie_info':'锁定技，当你即将进行判定时，你观看牌堆顶一张牌，并选择是否弃置；你的判定牌和判定结果无法被修改。',
			//-----------------------王汉桢
			'yb006_boxue':'博学',
			'yb006_boxue_info':'锁定技，当你使用非装备牌或成为非装备牌的目标时，若此牌没有被记录，则记录之，技能结束。',
			'yb006_boxue_rewrite':'博学·改',
			'yb006_boxue_rewrite_info':'锁定技，当你使用非装备牌或成为非装备牌的目标时，若你：<br>①没有对应的记录，则你记录该牌名，此技能结束。<br>②有对应的记录，则你移除对应的记录，然后摸一张牌（若此牌的使用者不为目标，则改为摸二），此技能结束。',
			'yb006_jufan':'举反',
			'yb006_jufan_info':'觉醒技，准备阶段或结束阶段开始时，若你博学已记录的牌名不小于3，则你修改〖博学〗和〖表率〗。',
			'yb006_biaoshuai':'表率',
			'yb006_biaoshuai_info':'主公技，每名其他忆势力角色每轮次各限一次。记录你回合内使用的第一张牌（覆盖上次记录）。其他忆势力角色使用或打出与之同名的牌时，其可以令你摸一张牌，然后自己摸一张牌。',
			'yb006_biaoshuai_rewrite':'表率·改',
			'yb006_biaoshuai_rewrite_info':'主公技，每名其他忆势力角色每轮次各限一次。记录你回合内使用的第一张牌（覆盖上次记录）。其他忆势力角色使用或打出与之同名的牌时，<span class=yellowtext>你可以摸一张牌，然后你可以令其摸一张牌。</span>',
			//---------------------作↓废--------------------//
			/*
			'ybold_boxue':'旧博学',
			'ybold_boxue_ab':'博学',
			'ybold_boxue_info':'（已被新版完全覆盖，故此作废。）锁定技，当你使用锦囊牌或成为其他角色使用锦囊牌的目标时，①若你没有对应的“练”，你获得一枚“练”并记录该牌的牌名，此技能结束。②若你有对应的“练”，你移除对应的“练”并摸一张牌，此技能结束。',
			'ybold_jufan':'旧举反',
			'ybold_jufan_ab':'举反',
			'ybold_jufan_info':'（已被新版完全覆盖，故此作废。）（本来是博学②效果，但只有使用时才触发）',
			'ybold_tonglian':'通练',
			'ybold_tonglian_info':'（已被新版完全覆盖，故此作废。）觉醒技，任意角色的准备阶段，若你的“练”不小于3，则你减少一点体力上限，然后修改〖博学〗。（本来是②效果被指定目标也可触发）',
			'ybold_kulian':'苦练',
			'ybold_kulian_info':'（已被新版完全覆盖，故此作废。）觉醒技，任意角色的准备阶段，若你累积移除的“练”不小于3，则你减少一点体力上限，然后修改〖博学〗。（手牌上限+2）',
			*/
			//---------------------作↑废-----------------------//
			//-----------------------吴格格
			// 'yb007_renqing':'人情',
			// 'yb007_renqing_info':'其他角色出牌阶段限一次，其可令你摸一张牌。若如此做，重置〖世故〗对其的次数。',
			// 'yb007_shigu':'世故',
			// 'yb007_shigu_info':'对每名其他角色限一次，当你对其造成伤害时，你可以防止之，然后令其摸等同伤害值数的牌。',
			// 'yb007_zhengling':'征令',
			// 'yb007_zhengling_info':'主公技，其他忆势力角色出牌阶段开始时，你可令其交给你一张牌，若如此做，其摸一张牌。',
			'yb007_chenwang':'陈往',
			'yb007_chenwang_info':'每回合限一次，你可以将一张牌当做你使用的上一张牌使用，然后摸一张牌。',
			//-----------------------吴雨欣
			'yb008_wucai':'无猜',
			'yb008_wucai_info':'锁定技，摸牌阶段摸牌时，你额外摸一张牌；当你受到伤害时，若你体力值不小于一，则视为体力流失。',
			'yb008_jianwu':'剑舞',
			'yb008_jianwu_info':'出牌阶段限一次，你可以弃置任意张花色各不相同的牌，对等量其他角色各造成一点伤害。',
			'yb008_zhenxin':'珍心',
			'yb008_zhenxin_info':'结束阶段，你可以摸X+1张牌。X为你本回合累积失去的花色数且至多为2。',
			'yb008_wanyue':'挽月',
			'yb008_wanyue_info':'结束阶段，你可以摸4-Y张牌 （至少为1），Y为你当前手牌中的花色数。',
			//-----------------------李玉珊
			'yb009_wucai':'无猜',
			'yb009_wucai_info':'锁定技，摸牌阶段摸牌时，你额外摸一张牌；当你受到伤害时，若你体力值不小于一，则视为体力流失。',
			'yb009_tuling':'土灵',
			'yb009_tuling_info':'锁定技，当你流失体力时，你获得双倍护盾。你的手牌上限额外增加护盾值的数目。',
			'yb009_tulinghuaqi':'化气',
			'yb009_tulinghuaqi_info':'你的判定阶段、摸牌阶段、出牌阶段、弃牌阶段开始时，你可以失去一点体力，然后摸两张牌；当你即将造成伤害时，若你有护盾，你可以移去一枚护盾，令伤害加一。',
			//-----------------------周玥
			'yb010_wucai':'无猜',
			'yb010_wucai_info':'锁定技，摸牌阶段摸牌时，你额外摸一张牌；当你受到伤害时，若你体力值不小于一，则视为体力流失。',
			'yb010_juxing':'聚星',
			'yb010_juxing_info':'（此技能已作废，有机会再改）出牌阶段限一次，你可以指定一名其他角色A，然后弃置一张牌，然后号召其他非A角色依次选择是否弃置一张牌，然后你可以弃置其等同你们弃置牌数的牌。然后若A因此失去所有手牌时，A可以获得你们弃置的牌，否则包括A在内的所有其他角色均摸一张牌。',
			'yb010_zhusui':'珠碎',
			'yb010_zhusui_info':'觉醒技，当你进去濒死状态时，你增加一点体力上限，回复一点体力，失去〖无猜〗，获得〖星显〗',
			'yb010_xingxian':'星显',
			'yb010_xingxian_info':'准备阶段或结束阶段开始时，你可以弃置一张牌，展示牌堆顶三张牌，获得其中所有与你弃置牌花色不同的牌。若你以此法获得的牌数大于一，你失去一点体力，否则你回复一点体力。',
			//-----------------------周玥定稿（主要是好写）
			'yb010_yeyu':'夜语',
			'yb010_yeyu_info':'每回合限一次。当你造成或受到伤害后，你可以获得对方两张手牌，若其因此失去所有手牌，其摸两张牌。',
			'yb010_zheye':'折叶',
			'yb010_zheye_info':'锁定技，每当你的体力值变动一点时，你摸一张牌。',
			'yb010_mingzhu':'明珠',
			'yb010_mingzhu_info':'锁定技，若你未装备宝物，你不会受到属性伤害。',
			//-----------------------高宇航（此版本难写，欲要作废）
			'yb011_kongbai':'空白',
			'yb011_kongbai_info':'锁定技，当你使用装备牌时，你将该装备牌移出游戏，然后获得该装备的技能，最后废除该装备栏；当你受到卡牌造成的伤害时，若你未拥有对应的“痕”，你记录该牌名为“痕”。',
			'yb011_chenxing':'尘醒',
			'yb011_chenxing_info':'使命技，准备阶段①成功：若你已废除装备栏不小于三个（原文是全部，此处降低难度），你增加一点体力上限，回复一点体力，然后获得技能〖姻梦〗；②失败：若你已废除装备栏小于三个，且你的“痕”不小于3，则你失去一点体力上限，失去〖空白〗，获得〖恨〗。',
			'yb011_yinmeng':'姻梦',
			'yb011_yinmeng_info':'当你即将造成卡牌伤害时，若你有此牌对应的“痕”，你可以防止此伤害并移除对应的“痕”，然后你与当前回合角色各摸一张牌，否则你可以记录对应的“痕”。',
			'yb011_hen':'恨',
			'yb011_hen_info':'锁定技，当你获得此技能时，将你的胜利条件修改为“杀死除你以外所有角色”；所有被“痕”记录的牌名无法对你造成伤害；你摸牌阶段额外摸“痕”的数量；你手牌上限增加“痕”的数量；你使用“痕”记录的牌名造成伤害时，此伤害+1；回合结束时，若你本回合未击杀其他角色，你失去一点体力。',
			//----------------------新版高宇航（主要是好写）
			'yb011_lijian':'离间',
			'yb011_lijian_info':'出牌阶段限一次，你可以弃置一张牌，视为一名男性角色对另一名男性角色使用一张【决斗】（不可被【无懈可击】响应）。',
			'yb011_jueleng':'决冷',
			'yb011_jueleng_info':'转换技，阴：当场上角色受到伤害后，若伤害来源为其他角色，则你可以与伤害来源各摸一张牌或各弃一张牌；阳：当场上角色受到伤害后，若受伤角色为其他角色，则你可以与受伤角色各摸一张牌或各弃一张牌。结束阶段或当你受到伤害时，你可以改变此技能状态。',
			//-----------------------郑佳怡
			// 'yb012_bianqian':'便签',
			// 'yb012_bianqian_info':'当你上家或下家（是否改为场上所有其他角色有待商榷）使用锦囊结算完成后，你可以获得一枚“小抄”并记录该牌名。',
			// 'yb012_xiaochao':'小抄',
			// 'yb012_xiaochao_info':'在合理的时机，你可以移除一枚“小抄”，并将一张手牌当作该“小抄”记录的牌名使用。',
			// 'yb012_buxing':'不行',
			// 'yb012_buxing_info':'当你发动〖作弊〗时，若你的上家或下家为男性，则其可以交给你一张牌，然后你选择：①视为其对你造成一点伤害，②此次〖作弊〗使用的牌无效。',
			//------------上为废稿
			'yb012_bianqian':'便签',
			'yb012_bianqian_info':'出牌阶段限一次，你可以将一张手牌盖在武将牌上称为“小抄”；你可以在合适的时机选择一张“小抄”，然后①使用此“小抄”，并弃置其余“小抄”②弃置此“小抄”，并将一张手牌当此”小抄”使用。',
			// 'yb012_bianqian_info':'出牌阶段限一次，你可以将一张手牌盖在武将牌上称为“小抄”；你可以在合适的时机选择一张“小抄”，然后①弃置所有“小抄”，并使用此“小抄”。②弃置此“小抄”，并将一张手牌当此”小抄”使用。',
			// 'yb012_bianqian_info':'出牌阶段限一次，你可以将一张手牌盖在武将牌上称为“小抄”；你可以在合适的时机选择一张“小抄”，然后①弃置所有“小抄”，视为使用此牌。②弃置此“小抄”，并将一张手牌当此”小抄”使用。',
			'yb012_xibei':'习备',
			// 'yb012_xibei_info':'每当场上有牌不因使用或打出而进入弃牌堆时，你可摸等量牌（至多摸至体力上限）。',
			'yb012_xibei_info':'场上其他角色使用非转化牌后，若此牌存在于弃牌堆中，你可以将之充入“小抄”。',
			'yb012_suotu':'索图',
			'yb012_suotu_info':'出牌阶段限一次，你可以选择一名有手牌的其他角色，你展示其一张手牌，令其选择：①令你获得此牌，②受到你造成的一点伤害。',
			//-----------------------此处应为尹姬，因转移至六艺篇而不在此
			//-----------------------废稿夜白
			'yb014_lvxin':'旅心',
			'yb014_lvxin_info':'你使用牌时，若此牌与你于此回合内使用的上一张牌的类别不同，则你可以摸一张牌；',
			//（后面没写出来）每回合限两次，当你使用牌时，若此牌与你前两次使用牌的类别各不相同，你可以令本次触发技能的摸牌数+1。
			'yb014_shihua':'诗华',
			'yb014_shihua_info':'觉醒技，准备阶段或结束阶段，若你手牌数小于体力值，则你摸等同体力上限的牌数，然后失去一点体力上限，获得〖窥梦〗',
			'yb014_kuimeng':'窥梦',
			'yb014_kuimeng_info':'每回合限一次，当你使用牌指定其他角色为目标时，若此牌目标的手牌数大于你，你可以观看此牌目标的手牌并获得其中一张。',
			//-----------------------SP夜白
			'yb014_yingbian':'应变',
			'yb014_yingbian_info':'忆或野势力技，锁定技，当你使用牌后，若此牌不是（转化牌，虚拟牌），则你手牌中所有与此牌同类型的牌均视为你上一张使用过的基本牌或非延时锦囊牌。',
			'yb014_yazhi':'崖止',
			'yb014_yazhi_info':'神或野势力技，锁定技，你造成的伤害+1；当你造成伤害致人濒死后，若你未受伤，你失去一点体力，否则失去一点体力上限；当你击杀其他角色后，你回复一点体力或摸两张牌。',
			//-----------------------神夜白
			'yb014_shizhui':'诗追',
			'yb014_shizhui_info':'<span class=yellowtext>游戏开局时或一轮游戏开始时，你可以减1点体力上限，然后将一名其他角色武将牌上的技能加入到你的武将牌上。出牌阶段，你可以删除一个以此法获得的技能，然后摸三张牌，并回复一点体力/增加一点体力上限。</span>',
			'#yb014_shizhui1':'春江花月连海平，海上明月共潮生。',
			'#yb014_shizhui2':'滟滟随波千万里，何处春江无月明。',
			'#yb014_shizhui3':'江流宛转绕芳甸，月照花林皆似霰。',
			'#yb014_shizhui4':'空里流霜不觉飞，汀上白沙看不见。',
			'#yb014_shizhui5':'江天一色无纤尘，皎皎空中孤月轮。',
			'#yb014_shizhui6':'江畔何人初见月，江月何年初照人。',
			'#yb014_shizhui7':'人生代代无穷已，江月年年只相似。',
			'#yb014_shizhui8':'不知江月待何人，但见长江送流水。',
			'#yb014_shizhui9':'白云一片去悠悠，青枫浦上不胜愁。',
			'#yb014_shizhui10':'谁家今夜扁舟子，何处相思明月楼。',
			'#yb014_shizhui11':'可怜楼上月徘徊，应照离人妆镜台。',
			'#yb014_shizhui12':'玉户帘中卷不去，捣衣砧上拂还来。',
			'#yb014_shizhui13':'此时相见不相闻，愿逐月华流照君。',
			'#yb014_shizhui14':'鸿雁长飞光不度，鱼龙潜跃水成文。',
			'#yb014_shizhui15':'昨夜闲潭梦落花，可怜春半不还家。',
			'#yb014_shizhui16':'江水流春去欲尽，江潭落月复西斜。',
			'#yb014_shizhui17':'斜月沉沉藏海雾，碣石潇湘无限路，',
			'#yb014_shizhui18':'不知乘月几人归，落月摇情满江树。',
			'#yb014_shanwu1':'起舞翩然落仙宫，或举银月，或送长风。',
			'#yb014_yongyue1':'世间悲欢离合，但无两全策。',
			'#yb014_yongyue2':'人有悲欢离合，月有阴晴圆缺，此事古难全。',
			//------此处应为王海茹，满城柒，小红，前者并无异构，后两者在六艺篇
			//-----------------六艺篇已被独立
			//---------------------新满城柒
			'yb016_juli':'拒礼',
			'yb016_juli_info':'当一名角色成为除其外的角色使用【杀】的目标时，若你至该角色的距离不大于1，你可以重铸至多1张牌，然后令此牌的使用者弃置一张牌，（该牌的类型须为你重铸的牌中包含的类型）否则此牌对你无效。',
			'yb016_shenzou':'神奏',
			'yb016_shenzou_info':'出牌阶段限一次，你可以随机演奏一首音乐，并根据完成度来获得相应的分数（至多五分）。然后你可令【拒礼】中的一个阿拉伯数字+1（消耗分数为该选项当前数字）或将【杀】改为伤害性牌（消耗5分），并使用剩余的分数进行摸牌（每张2分）。',
			// 'yb016_shenzou_append':'目前的削弱手段为，禁止其加点第二个数字，后续调整有待斟酌',
			//-----------------------SP满城柒
			'yb016_xianyue':'仙乐',
			'yb016_xianyue_info':'当你恢复体力后，你可以弃置一张牌并进行一次判定，若结果为：红桃，你回复一点体力；方块，你摸两张牌；梅花，你弃置一名角色的两张牌；黑桃，你令一名角色流失一点体力。',
			'yb016_tianliao':'天疗',
			'yb016_tianliao_info':'当你恢复体力时，你可以弃置一张牌，令此恢复值加一。',
			'yb016_qingjie':'清节',
			'yb016_qingjie_info':'锁定技，当你受到伤害后，你 恢复X点体力，然后流失X点体力。（X为本次伤害值）',
			'yb016_pojie':'破界',
			'yb016_pojie_info':'锁定技，当你恢复体力时，若恢复值溢出，则取消溢出的恢复值，改为增加等量体力上限，并摸等量牌。',
			//-----------------------满城柒重制版废稿
			'yb016_melody':'歌律',
			'yb016_melody_info':'锁定技，当你使用牌指定其他角色为目标后或成为其他角色使用牌的目标后，若没有角色处于濒死状态，记录此牌花色。当记录花色数达到5时，立即终止当前所有结算，然后根据记录情况，执行效果：<br/> <i>第一位决定句式<br/>黑桃：令B执行D，或令C执行E；<br/>红桃：令B依次执行DE，否则C执行DE；<br/>梅花：令B执行D，然后令C执行E；<br/>方块：令B执行D或E中你选择的一项，然后C执行相同的一项；<br/>无色：令B执行DE中0之2项，然后令C执行DE中0之2项；<br/>第二/三位决定B/C：<br/>黑桃：任意一名角色；<br/>红桃：指定一名角色，与指定角色性别不同的<b>角色</b>；<br/>梅花：所有角色；<br/>方块：所有其他角色；<br/>无色：至少一名任意角色；<br/>第四/五位决定效果：<br/>黑桃：失去一点体力或翻面；<br/>红桃：回复一点体力或摸一张牌；<br/>梅花：受到一点无属性伤害或弃两张牌；<br/>方块：摸一张牌或摸一张牌或摸一张牌；<br/>无色：任选一个花色执行，并将或改为并</i>',
			//---------------新小红
			'yb017_chuanxin':'传信',
			'yb017_chuanxin_info':'锁定技，一名角色的结束阶段开始时，若当前角色本回合内使用过牌，你选择一项：①摸一张牌，②视为使用一张其本回合使用过的一张非【装备及延时】牌。',
			'yb017_zuigui':'醉归',
			'yb017_zuigui_info':'锁定技，弃牌阶段开始时，你视为使用一张酒；你的酒buff会赋给任何伤害牌；你使用的酒不计入次数，且效果改为：回复一点体力，然后令目标本回合下一张杀伤害+1。',
			//-----------------------神小红
			'yb017_mizhu':'秘助',
			'yb017_mizhu_info':'锁定技，游戏开始的时候，把八张【鹿鸣千转】加入牌堆。【鹿鸣千转】对你无效。当有一名角色成为【鹿鸣千转】的目标时，你可以查看其手牌，然后为其重新指定“喜啼”或“悲鸣”。',
			'yb017_guangzhu':'广智',
			'yb017_guangzhu_info':'锁定技，当一名角色使用非虚拟且非转化的锦囊牌时，若此牌的牌名属于智囊牌名、“贞侍”已记录的牌名或【鹿鸣千转】，你摸一张牌。',
			'yb017_zhenshi':'贞侍',
			'yb017_zhenshi_info':'锁定技，当你成为锦囊牌的目标时，若此牌名未被记录，则记录此牌名，然后取消之。回合开始时，你可以在“贞侍”记录中增加或移除一种锦囊牌牌名。',
			//-----------------------张晴
			'yb018_huaimeng':'怀梦',
			'yb018_huaimeng_info':'锁定技，游戏开始时，你获得五枚“梦”；当你于每个回合首次使用或打出一种花色的牌时，你获得一枚“梦”标记；每轮开始时，你需指定一个花色，本轮你因该花色获得的“梦”改为三枚。',
			'yb018_minxing':'悯星',
			'yb018_minxing_info':'回合开始或结束阶段，你可以移除两枚“梦”标记，并摸<span class=thundertext>3</span>张牌，然后将<span class=thundertext>3</span>张手牌以任意顺序盖在牌堆顶（你可以移除至多两枚“梦”，令蓝色字体增加等量值）然后你可以展示牌堆顶三张牌并置入弃牌堆，然后：①若出现两张同花色的牌，你摸一张牌或获得花色与其他不同的牌（背水：移除一枚”梦”标记）；②若出现三张同花色的牌，你摸两张牌或回复一点体力（背水：移除两枚“梦”标记）。',
			'yb018_fanling':'凡灵',
			'yb018_fanling_info':'伪转换技，锁定技，游戏首轮开始时，你需指定一个状态作为起始状态。从第二轮开始时，你每轮需移除一枚“梦”标记，然后转换一次形态。（没有梦标记则无法发动。）①你视为拥有技能〖栖月〗直至本轮结束；②你视为拥有技能〖折叶〗直至本轮结束。',
			'yb018_fanling1':'凡灵',
			'yb018_fanling1_info':'',
			'yb018_zheye':'折叶',
			'yb018_zheye_info':'锁定技，每当你的体力值变动一点时，你摸一张牌。',
			//<span class=firetext>以下懒得钻研，没写</span>（当你因体力值减少而触发该技能时，你可以移除一枚“梦”多摸一张牌；当你因体力值增加而触发该技能时，你可以放弃摸牌，改为获得一枚“梦”）。
			'yb018_qiyue':'栖月',
			'yb018_qiyue_info':'锁定技，任意角色回合开始时，你打出一张牌或移去一枚“梦”；任意角色回合结束时，你摸两张牌。<span class=firetext>这是作者因为菜所以写的版本。</span>',
			//-----------------------废案张晴
			'yb018_yinsi':'吟思',
			'yb018_yinsi_info':'回合开始时，你可以移去两枚“梦”，然后卜算3；摸牌阶段开始时，你可以移去一枚“梦”，然后多摸一张牌；出牌阶段开始时，你可以移去两枚“梦”，然后获得【善舞】直到回合结束；回合结束时，你可以移去两枚“梦”，然后获得技能【注视】、【轻灵】直到下回合开始。',
			'yb018_yinsia':'吟思',
			'yb018_yinsia_info':'',
			'yb018_yinsib':'吟思',
			'yb018_yinsib_info':'',
			'yb018_yinsic':'吟思',
			'yb018_yinsic_info':'',
			'yb018_yinsid':'吟思',
			'yb018_yinsid_info':'',
			'dz018_shanwu':'善舞',
			'dz018_shanwu_info':'出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌。然后若你本次弃置的牌均为：基本牌，你回复一点体力；锦囊牌，你摸两张牌；装备牌，本回合接下来造成的伤害+1。',
			'dz018_zhushi':'注视',
			'dz018_zhushi_info':'回合结束时，你可以记录一名其他角色(效果触发前不可见)，然后该角色于其出牌阶段内使用牌指定你为目标后你摸X张牌(X为其本阶段使用的牌数且至多为5)；该角色的结束阶段开始时，若其本回合没有使用牌指定你为目标，则你获得其一张牌，然后你失去一点体力。',
			'dz018_qingling':'轻灵',
			'dz018_qingling_info':'锁定技，你的手牌上限+1；当你受到大于一点的伤害时防止之，然后流失一点体力。',
			//-----------------------神张晴
			'yb018_isi':'懿思',
			'yb018_isi_info':'出牌阶段限一次，若你的体力上限小于10，你可进行判定牌不置入弃牌堆的判定。若判定结果与本次发动技能时的其他判定结果的花色均不相同且你的体力上限小于10，则你加1点体力上限并重复此流程。然后你将所有位于处理区的判定牌交给一名角色。若其手牌数为全场最多，则你减1点体力上限。',
			yb018_newisi:'懿思',
			yb018_newisi_info:'出牌阶段限一次。若你的体力上限小于10，你可进行判定牌不置入弃牌堆的判定。若判定结果与本次发动技能时的其他判定结果的花色均不相同且你的体力上限小于10，则你加1点体力上限，且可以重复此流程。然后你将所有位于处理区的判定牌交给一名角色。若其手牌数为全场最多，则你减1点体力上限。',
			'yb018_chongmeng':'宠梦',
			'yb018_chongmeng_info':'觉醒技，准备阶段，若场上的所有存活角色均于本局游戏内受到过伤害，则你加2点体力上限并回复1点体力，然后令一名角色获得技能〖释罔〗。',
			'yb018_yisi':'仪祀',
			'yb018_yisi_info':'限定技，出牌阶段，你可选择一名角色。若你的体力上限不小于存活人数且其有未发动的觉醒技，则你令其中一个技能无视发动条件；否则其摸四张牌。然后你减2点体力上限。',
			'yb018_guajian':'挂件',
			'yb018_guajian_info':'因为怕出bug，故而添加此挂件。。。',
			'yb018_shiwang':'释罔',
			'yb018_shiwang_info':'准备阶段，若令你获得〖释罔〗的角色存活且体力上限大于1，则你可以令其减1点体力上限，然后你获得如下效果：出牌阶段限一次，你可以视为使用一张普通锦囊牌。',
			'yb018_shiwang2':'释罔',
			'yb018_shiwang2_info':'视为使用一张锦囊牌。',
			//-----------------------盛妍
			'yb019_cutan':'醋坛',
			'yb019_cutan_info':'准备阶段开始时或当你受到一次伤害后，你可以印制并获得一张【醋】。',
			'yb019_zhiyu':'掷郁',
			'yb019_zhiyu_info':'每回合每种牌名（限实体牌名）限一次。出牌阶段，你可以展示一张手牌并交给一名其他角色，然后视为你对其使用此牌（不计入次数，不受距离限制）。',
			'yb019_misan':'弥散',
			'yb019_misan_info':'当你使用基本牌时，你可以将其交给一名其他角色。每回合每种牌名限一次。',
			'yb019_renxing':'任性',
			'yb019_renxing_info':'每回合对每名角色限一次，当你使用【杀】或伤害类锦囊指定目标后，你可以观看其手牌，然后弃置其一张基本牌。',
			'yb019_renxingbiaoji':'任性标记',
			'yb019_renxingbiaoji_info':'',
			'yb019_chicu':'吃醋',
			'yb019_chicu_info':'锁定技，当其他角色于你的回合内失去正面朝上的【醋】时，其非锁定技失效且受到的伤害加一直到回合结束。',
			'yb019_lincu':'淋醋',
			'yb019_lincu_info':'非锁定技失效且受到的伤害加一。',
			//-----------------------贾雨桐（待写）
			'yb020_shange':'善歌',
			'yb020_shange_info':'出牌阶段，你可以弃置至多五张同颜色的牌，然后翻开牌堆顶双倍的牌，获得其中与你弃置的牌颜色不同的牌，若你获得的牌数小于你弃置的牌数，你可以回复一点体力或令一名其他角色失去一点体力。每个出牌阶段对每个颜色限一次。',
			'yb020_wanyue':'挽月',
			'yb020_wanyue_info':'结束阶段，你可以摸4-Y张牌 （至少为1），Y为你当前手牌中的花色数。',
			'yb020_yuyun':'余韵',
			'yb020_yuyun_info':'锁定技，你每使用一张黑色牌，获得一枚“仄”标记；你每使用一张红色牌，获得一枚“平”标记；你每使用一张无色牌时，你获得一对“平仄”标记；当你获得一枚“仄/平”时，若你已拥有“平/仄”，你移去一对“平仄”，然后回复一点体力或摸一张牌。',
			//-----------------------刘域楓（待写）
			'yb021_shusuan':'数算',
			'yb021_shusuan_info':'出牌阶段限一次，你可以观看牌堆顶4+X张牌，然后选择自己的手牌与牌堆顶的牌共计四张展示，然后用这四张牌的点数计算24点，若成功，则你摸4+X张牌。计算结束后，你需将用于计算的牌交给一名其他角色或弃置。',
			'yb021_qiujiao':'求教',
			'yb021_qiujiao_info':'出牌阶段限一次或当你受到一次伤害后，你可以令一名其他角色交给你一张牌，并令你下一次〖数算〗的X值加一。',
			//-----------------------盐（待写）
			'yb022_yiduan':'臆断',
			// 'yb022_yiduan_info':'当你需要使用一张不是“装备牌或延时性锦囊”的牌时，若此牌未被〖臆断〗记录，你可以声明该牌名，然后将牌堆顶第一张牌视为这张牌使用之。若该牌本体与你声明的牌名不一致，则你记录该牌名，然后令〖臆断〗本回合无法使用。',
			// 'yb022_yiduan_info':'出牌阶段限一次，你可以指定一名其他角色，并猜测其手牌包含的类型，若猜对至少一项，你摸两张牌，若猜对至少两项，其下次受到伤害+1，若猜对至少三项，你获得其所有手牌。',
			'yb022_yiduan_info':'出牌阶段限一次，你可以指定一名有手牌的其他角色，并选择若干类型，令其选择：①交给你一张类型符合你描述的手牌，②，受到X点伤害（X为你本次选择的类型数）。',
			'yb022_yaogong':'邀功',
			// 'yb022_yaogong_info':'每当场上有角色受到一次伤害后，若没有进行过濒死结算，你可以解除一个〖臆断〗记录的牌名。若你没有〖臆断〗或没有被〖臆断〗记录的牌名，则改为你可以摸一张牌。',
			'yb022_duanxiang':'断想',
			'yb022_duanxiang_info':'每回合限一次，当有角色受到伤害后，你可以令受伤角色选择一项：①，弃置2X张牌（牌数不够则不能选），然后恢复X点体力；②，失去X点体力上限，然后摸X张牌。（X为其已损体力值。）',
			'yb022_duanxiangxin':'断想',
			'yb022_duanxiangxin_info':'每回合限一次，当有角色受到伤害后，<br>①若伤害来源的手牌数不等于受伤角色的体力值，你可令伤害来源将手牌调整至受伤角色的体力值；<br>②若受伤角色的手牌数不等于伤害来源的体力值，你可令受伤角色将手牌调整至伤害来源的体力值。',
			//下面是废弃的描述
			//'yb022_duanxiang_info':'锁定技，出牌阶段，当你使用第X/Y/Z/M张牌时，你需进行一次判定，若结果为黑桃/红桃/梅花/方块，则于此牌结算完成后结束此回合。<br/>（X为你当前体力值且至少为3，至多为5，<br/>Y为你体力上限且至少为X+1，至多为X+2，<br/>Z为场上存活角色的体力总数且至少为Y+3，至多为Y+5，<br/>M为场上存活角色的手牌总数且至少为Z+5，至多为Z+8，<br/>以上YZM的取值取决于本回合前一位代数的取值，每项数值触发后于当前回合锁定。）',
			'yb022_duanxiangxx':'旧断想',
			'yb022_duanxiangxx_ab':'断想',
			'yb022_duanxiangxx_info':'觉醒技，当你进入濒死状态时，若你〖臆断〗记录的牌名大于X（X为场上玩家数且最小为4），你失去〖臆断〗，然后增加一点体力上限，回复一点体力。',
			//-----------------------史庆宇（待写）
			//-----------------------岳瞳（待写）
			//-----------------------史庆宇王贺（待写）
			'yb025_mojiang':'摸奖',
			'yb025_mojiang_info':'（机制不成熟，先用水转百戏图将就一下）出牌阶段限一次，你可以表演一次抓娃娃，然后判定娃娃的品质并摸等量张牌，然后将等量张牌交给一名其他角色或弃置。｛娃娃机初始刷新一个4品质娃娃，两个3品质娃娃，五个2品质娃娃，八个1品质娃娃，娃娃机每轮开始时（不包括第一轮），自然刷新一个4品质，两个3品质，三个2品质，四个1品质娃娃；娃娃总数不得超过20只；娃娃机每次限时30秒｝',
			'yb025_zanzhu':'赞助',
			'yb025_zanzhu_info':'出牌阶段开始时，你可以请求一名其他角色交给你一张牌，若该角色执行，则其摸一张牌。',
			//-------------------散梦--------------//
			'ybsl_sanmeng':'散梦',
			'ybsl_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			//-------------------梦蚕--------------//
			'yb026_sanmeng':'散梦',
			'yb026_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb026_xiaoye':'笑靥',
			'yb026_xiaoye_info':'当你成为其他角色使用杀的目标时，你可以摸一张牌或弃一张牌，然后若你的手牌数小于杀的使用者，则此杀对你无效。每回合每个选项触发的令杀无效各限一次。',
			//-------------------梦雨--------------//
			'yb027_sanmeng':'散梦',
			'yb027_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb027_jisi':'汲丝',
			'yb027_jisi_info':'其他角色摸牌阶段结束时，若其手牌数大于你，你可以获得其一张手牌。若其手牌数仍然大于你，你可以重复此流程。',
			//----------------梦雨（2版）--------------//
			'yb027_sanmeng':'散梦',
			'yb027_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb027_milixx':'迷离',
			// 'yb027_milixx_info':'锁定技，当你使用基本或普通锦囊牌时，或当你被其他角色使用基本或普通锦囊指定为目标时，若此牌未被记录，你记录之。每回合限一次，当你使用基本或普通锦囊时，或成为其他角色使用基本或普通锦囊的目标时，若这张牌的类型已被记录，你可以令此牌的效果改为你记录的另一张同类型牌的效果，并在此牌结算完成后移除所有与该牌同类型的记录。',
			
			// 'yb027_milixx_info':'锁定技，当你使用基本或普通锦囊牌时，或当你被其他角色使用基本或普通锦囊指定为目标时，若此牌未被记录，你记录之。每回合限一次，当你使用基本或普通锦囊时，或成为其他角色使用基本或普通锦囊的目标时，若已有记录，你可以令此牌的效果改为你记录的另一张牌的效果（同时移除此记录），本次使用牌不会被主技能记录。',
			'yb027_mili':'迷离',
			'yb027_mili_info':'锁定技，当一名其他角色对你使用牌时，其获得一枚“迷”；其他角色回合结束后，若其有“迷”，则你令其移除所有“迷”，然后你摸等量牌。',
			
			//-------------------梦晶--------------//
			'yb028_sanmeng':'散梦',
			'yb028_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb028_jianzhen':'剑阵',
			'yb028_jianzhen_info':'苏婆夏洛特，出牌阶段限一次或当你受到伤害（伤害至少为一）后，你可以摸一张牌，然后选择一张手牌置于武将牌上称为剑元<br>根据剑元废除对应的装备栏并获得如下技能。<br>武器栏：金剑元，锁定技，你的攻击范围加2；当你使用杀时，你无视对方防具。当你造成伤害时，你可以移除金剑元，令伤害+1。<br>防具栏：土剑元，你可以将一张装备牌当【无中生有】使用。当你受到伤害时，你可以移除土剑元，令伤害-1。<br>进攻马：火剑元，出牌阶段限一次，你可以将所有手牌当任意锦囊使用。当你使用牌指定目标后，你可以移除火剑元，弃置此牌目标各一张牌。<br>防御马：水剑元，当你成为其他角色使用【杀】的目标时，你可以依次选择是否①弃置一张牌，将此杀【流离】出去；②移除水剑元，然后与一名可成为【流离】目标的其它角色互换座位。<br>宝物栏：木剑元，当你失去最后的手牌时，你可以摸一张牌，然后你可以移除木剑元并摸等同体力上限的牌数。',
			yb_jianyuan_jin:'金剑元',
			yb_jianyuan_mu:'木剑元',
			yb_jianyuan_shui:'水剑元',
			yb_jianyuan_huo:'火剑元',
			yb_jianyuan_tu:'土剑元',
			// yb_jianyuan_jin_info:'锁定技，你的攻击范围加2；当你使用杀时，你无视对方防具。当你造成伤害时，你可以移除金剑元，令伤害+1。',
			// yb_jianyuan_mu_info:'当你失去最后的手牌时，你可以摸一张牌，然后你可以移除木剑元并摸等同体力上限的牌数。',
			// yb_jianyuan_shui_info:'当你成为其他角色使用【杀】的目标时，你可以依次选择是否①弃置一张牌，将此杀【流离】出去；②移除水剑元，然后与一名可成为【流离】目标的其它角色互换座位。',
			// yb_jianyuan_huo_info:'出牌阶段限一次，你可以将所有手牌当任意锦囊使用。当你使用牌指定目标后，你可以移除火剑元，弃置此牌目标各一张牌。',
			// yb_jianyuan_tu_info:'你可以将一张装备牌当【无中生有】使用。当你受到伤害时，你可以移除土剑元，令伤害-1。',
			'yb028_sheshen':'舍身',
			'yb028_sheshen_info':'锁定技，当你装备栏被废除时，你令一名角色摸两张牌并回复一点体力，然后你减一点体力上限；你的手牌上限额外增加被废除装备栏的数量；当你体力上限不大于1时，你无法扣减体力上限。',
			//-------------------梦黎--------------//
			'yb029_sanmeng':'散梦',
			'yb029_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb029_chonghui':'冲慧',
			'yb029_chonghui_info':'每当你使用或打出虚拟或转化牌时，你可以摸一张牌，每回合每张牌（指转化的目标牌）限一次；<br>你可以将一张手牌当作【诱敌深入】或【决斗】使用，每回合每张牌（指转化的目标牌）限一次。',
			//-------------------书--------------//
			'yb030_jiangdao':'讲道',
			// 'yb030_jiangdao_info':'（机制过于复杂，风评极其不佳，有功夫改改）出牌阶段限一次，你可以摸等同其他角色数的牌数，然后展示等量牌，令所有其他角色依次选择一项：<br>①获得你展示的其中一张牌；<br/>②对你使用一张杀，然后获得一枚“逆”标记，*拥有“逆”标记的角色无法选择①选项；<br/>③受到你造成的X点伤害，X为该角色的“逆”标记数，然后移除其所有“逆”标记。',
			'yb030_jiangdao_info':'出牌阶段限一次，你可以视为使用一张五谷丰登；当你成为五谷丰登的目标时，你可以将任意手牌与展示的牌进行替换。',
			'yb030_rejiangdao':'讲道',
			'yb030_rejiangdao_info':'出牌阶段限一次，你可以视为使用一张五谷丰登；当你成为五谷丰登的目标时，你可以将任意手牌与展示的牌进行替换；当你使用五谷丰登时，改为由你依次为全场发牌。',
			'yb030_lunyi':'论义',
			'yb030_lunyi_info':'每回合限一次，当你受到其他角色造成的伤害时，你可以展示一张手牌，若伤害来源不弃置与之同花色或点数的牌，则此伤害无效，若其弃置了一张同点数的牌，则此伤害加一。',
			//-------------------梦幻晴--------------//
			'yb031_sanmeng':'散梦',
			'yb031_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb031_lihun':'离魂',
			'yb031_lihun2':'离魂',
			'yb031_lihun_info':'出牌阶段限一次，你可以弃置一张牌，并选择一名其他角色，你获得其所有手牌且你与其距离视为1直到此阶段结束。若此阶段结束时，目标角色没有阵亡，则你需交给其X张牌，并翻面。（X为其体力值）',
			'yb031_wanyue':'挽月',
			'yb031_wanyue_info':'结束阶段，你可以摸4-Y张牌 （至少为1），Y为你当前手牌中的花色数。',
			//-------------------白衣尘--------------//
			'yb032_tonglv':'同旅',
			'yb032_tonglv_info':'锁定技，游戏开始时，你选择一名其他角色称为“伴”，直到你或对方死亡，或游戏轮次达到存活角色数+1时。当你或对方使用非转化非装备牌结算完成后，对方可以将一张手牌当作此牌使用（以此法使用的牌无距离和次数限制）。',
			'yb032_zhuiji':'追迹',
			'yb032_zhuiji_info':'当场上有角色使用非装备牌结算完成后，若场上没有“伴”，则你可以使用一张同名的牌（此牌无距离和次数限制）。',
			'yb032_duanchang':'断肠',
			'yb032_duanchang_info':'锁定技，杀死你的角色失去当前的所有技能',
			//-------------------小慧--------------//
			'yb033_huiyue':'慧月',
			'yb033_huiyue_info':'锁定技，回合开始时，若你体力值为绿色（总血量2/3以上），你获得技能〖淑慧〗；<br/>当你受到伤害时，你获得技能〖隅泣〗，若此时你已获得〖淑慧〗，你令〖淑慧〗添加追加效果”；<br/>回合结束阶段，若你本回合使用的牌的类别不小于2，你获得技能〖旅心〗；<br/>每轮限一次，回合结束阶段，若你本回合使用的牌类别不小于3，你额外执行一个回合。',
			'yb033_shuhui':'淑慧',
			// 'yb033_shuhui_info':'回合开始时，你可以弃置一张手牌，令一名角色回复一点体力。（追加描述：否则你令至多X名其他角色各失去一点体力，X为你本次弃牌数。）然后你将被此技能选中的其他角色记录为“诉”。',
			'yb033_shuhui_info':'回合开始时，你可以弃置一张手牌，并令一名角色回复或失去一点体力。（追加描述：然后你展示牌堆顶一张牌，将隅泣任意一个数字改为该数字，不会低于原数字且至多为当前最低的数字+2）。',
			'yb033_yuqi':'隅泣',
			'yb033_yuqi_info':'每回合限三次。当有角色受到伤害后，若你至其的距离不大于<span class=thundertext>2</span>，则你可以观看牌堆顶的<span class=firetext>3</span>张牌。你将其中至多<span class=greentext>2</span>张牌交给受伤角色，然后可以获得剩余牌中的至多<span class=yellowtext>2</span>张牌，并将其余牌以原顺序放回牌堆顶。',
			'yb033_lvxin':'旅心',
			'yb033_lvxin_info':'你使用牌时，若此牌与你于此回合内使用的上一张牌的类别不同，则你可以摸一张牌；',
			//（后面没写出来）每回合限两次，当你使用牌时，若此牌与你前两次使用牌的类别各不相同，你可以令本次触发技能的摸牌数+1。
			//-------------------梦周怜渊--------------//
			'yb034_sanmeng':'散梦',
			'yb034_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb034_rebifa':'笔伐',
			'yb034_rebifa_info':'出牌阶段，若场上没有被夜白笔伐选择的角色，你可以展示一张手牌并交给一名其他角色，然后该角色不能使用或打出手牌直到此阶段结束。若被夜白笔伐选择的目标于此阶段阵亡，你摸一张牌。',
			'yb034_bifa':'笔伐',
			'yb034_bifa_info':'出牌阶段，若场上没有被夜白笔伐选择的角色，你可以展示一张手牌并交给一名其他角色，然后该角色不能使用或打出与此牌同颜色的手牌直到此阶段结束。若被夜白笔伐选择的目标于此阶段阵亡，你摸一张牌。',
			'yb034_rejiandao':'剑道',
			'yb034_rejiandao_info':'锁定技，你的手牌上限加一，且获得如下效果：出牌阶段限一次，你可以视为使用一张【杀】（无次数限制）。',
			'yb034_jiandao':'剑道',
			'yb034_jiandao_info':'锁定技，若你已装备武器牌，你的手牌上限加一，且获得如下效果：出牌阶段限一次，你可以视为使用一张【杀】（无次数限制）。',
			//-------------------玺--------------//
			'yb035_zhengzhao':'征召',
			'yb035_zhengzhao_info':'锁定技，其他角色回合开始阶段，若其体力上限不小于你，其须选择一项：①交给你一张手牌，②减少一点体力上限。',
			'yb035_jitian':'祭天',
			'yb035_jitian_info':'回合开始阶段，你可以选择①减少一点体力上限并回复一点体力②增加一点体力上限并失去一点体力。若如此做，你摸两张牌。',
			'yb035_liuwang':'流亡',
			'yb035_liuwang_info':'限定技，当你进入濒死状态向自己求【桃】时，你可以回复体力至1，然后从游戏外抽取四张主公武将并选择其一，获得其武将牌上所有技能，然后将性别，势力调整至与其相同，然后获得技能〖威严〗。',
			'yb035_weiyan':'威严',
			'yb035_weiyan_info':'锁定技，当你使用牌指定体力值小于你的其他角色为目标时，若其体力值大于1，你令其失去一点体力。',
			//-------------------熙--------------//
			'yb036_sanmeng':'散梦',
			'yb036_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb036_qianjin':'前进',
			'yb036_qianjin_info':'使命技，每当你使用一张牌时，获得一枚“进”标记；回合结束阶段或当你受到一次伤害时，你失去一枚“进”标记。成功：当你“进”标记数变化时，若标记数不小于5，则你摸两张牌并获得技能〖翱翔〗。失败：当你结束阶段时或受到伤害时，若你没有触发失去“进”标记，你获得并重置技能〖重整〗。',
			'yb036_chongzheng':'重整',
			'yb036_chongzheng_info':'限定技，准备阶段或结束阶段或濒死求桃时，你可以回复一点体力，然后摸两张牌，并重置〖前进〗。',
			'yb036_aoxiang':'翱翔',
			'yb036_aoxiang_info':'你可以红牌当杀，黑牌当闪使用或打出。锁定技：当你使用牌时，你需移除一枚“进”，然后摸一张牌；当“进”清零时，重置〖前进〗，并可令成功所需的标记数+1或-1（至多加至8，至少减至3）。',
			//-------------------梦方块Q--------------//
			'yb037_sanmeng':'散梦',
			'yb037_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb037_yizhong':'毅重',
			'yb037_yizhong_info':'锁定技，若你未装备防具，黑色的【杀】对你无效。',
			'yb037_kexie':'咳血',
			'yb037_kexie_info':'锁定技，每当你弃置一张牌（红色牌/红桃牌）时，你失去一点体力。',
			'yb037_guiling':'龟灵',
			'yb037_guiling_info':'锁定技，若你未装备防具，则当你受到大于1的伤害时，该伤害减为1；当你脱离濒死状态时，若你拥有〖咳血〗，则修改〖咳血〗（已修改到红桃则改为删除）；若你因〖咳血〗而进入濒死状态，则减一点体力上限并回复体力至上限。（体力上限若不大于三则不减）',
			//-------------------梦忆滕叔颖武宁--------------//
			'yb038_sanmeng':'散梦',
			'yb038_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb038_quanlu':'泉路',
			'yb038_quanlu_info':'锁定技，当你使用牌时，你需弃置一张手牌（无牌不弃），然后若你的手牌数为0，则你选择失去一点体力或体力上限，然后摸X张牌（X为你的体力上限且至多为5），然后计数。',
			'yb038_shenglu':'生路',
			'yb038_shenglu_info':'锁定技，当你使用牌时，你可以弃置一张牌，然后若你的手牌数为0，则你选择失去一点体力并增加一点体力上限<span class=firetext>或</span>失去一点体力上限并回复一点体力，然后摸X张牌（X为你当前体力上限且至多为5）。',
			'yb038_fusheng':'复生',
			'yb038_fusheng_info':'觉醒技，当你进入濒死状态时，若你泉路计数小于3次，你减Y点体力上限，否则你增加(Y+1)点体力上限（Y为泉路计数-2的绝对值）。然后回复Z点体力（Z为泉路计数-2且至少为1），失去〖泉路〗，获得〖生路〗和〖恩许〗。',
			'ybtq_fusheng':'复生',
			'ybtq_fusheng_info':'觉醒技，当你进入濒死状态时，立即归还因〖泉路〗而失去的体力值和体力上限。然后增加两点体力上限，并获得〖往愿〗和〖恩许〗，最后清除泉路计数。',
			'yb038_wangyuan':'往愿',
			'yb038_wangyuan_info':'锁定技，回合结束后，你归还因〖泉路〗而失去的体力值和体力上限，然后若你泉路计数为3及以上，你移去3点计数，然后增加一点体力上限。',
			'yb038_enxu':'恩许',
			'yb038_enxu_info':'忆势力技，出牌阶段限一次，你可以失去两点体力上限，令一名其他男性角色摸X张牌（X为你发动技能时的体力上限且至多为6），然后你与其体力较低的一方回复体力至与对方相等。',
			//-------------------梦查符--------------//
			'yb039_sanmeng':'散梦',
			'yb039_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb039_zhifu':'制符',
			'yb039_zhifu_info':'出牌阶段限一次，你可以弃置一张牌，根据此牌花色，点数和类型创造刻印牌。<br>黑桃：雷属性；红桃：治疗类；<br>梅花：冰属性；方块：火属性。<br>基本：基础型；锦囊：群体型；其它：巨伤型。<br>成功率与点数正相关，失败则生成该属性基础刻印牌。',
			'yb039_feiyan':'飞炎',
			'yb039_feiyan_info':'超级锁定技，你对于火属性刻印的制作非常有心得，必定能令伤害数值或最大目标数之一+1。',
			//-------------------梦安以--------------//
			'yb040_xuyuan':'许愿',
			'yb040_xuyuan_info':'重置技，每回合限三次，你可以将一张手牌当作以下锦囊之一使用：移花接木，鹿鸣千转，起死回生。',
			'yb040_jumeng':'聚梦',
			'yb040_jumeng_info':'准备阶段，你可以展示牌堆顶三张牌，获得其中每种花色的牌各一张。',
			// 'yb040_jumeng_info':'准备阶段，你可以摸至多三张牌；结束阶段，你弃置手牌中以此法摸的牌。',
			//----------------------慕琴--------------//
			//--------------原慕琴在此
			//----------------------蘋姉--------------//
			'yb042_sizhi':'思智',
			'yb042_sizhi_info':'出牌阶段限一次，你可以弃置任意张点数之和为13的牌，然后摸两倍数量的牌。以此法获得的牌中，黑色牌本回合无距离和次数限制，红色牌本回合不计入手牌上限。',
			'yb042_mingtui':'明退',
			'yb042_mingtui_info':'当你成为牌的目标时，若此牌有点数，你可以弃置任意张点数和大于此牌的牌，然后跳过此牌对你的结算。',
			'yb042_lisheng':'离笙',
			'yb042_lisheng_info':'当<b>你阵亡时/场上其他角色阵亡时</b>，你可以令<b>一名其他角色/自己</b>从牌堆中获得每种花色的牌各一张，然后回复一点体力。',
			//--------------------房佳瑜--------------//
			//--------------------胡瑞航--------------//
			//--------------------高聪----------------//
			//--------------------江雪舞--------------//
			'yb046_xuewu':'雪舞',
			'yb046_xuewu_info':'',
			//--------------------彡------------------//
			'yb047_youhun':'游魂',
			'yb047_youhun_info':'转换技，阴：你可以将X+Y张牌当作任意一张锦囊牌使用；阳：你可以将X+Y张牌当作任意一张基本牌使用。当此牌造成伤害后，你增加一点体力上限，然后Y计数+1。（X为本轮此技能使用次数且至少为0，Y初始为0，最低为0）；每当你废除一个装备栏时，你令Y计数-1；',
			'yb047_wanxin':'挽心',
			'yb047_wanxin_info':'一名角色的回合结束时，你可以令一名本回合内受到过伤害的角色摸两张牌，然后你与其将武将牌重置。',
			'yb047_shouqing':'守情',
			'yb047_shouqing_info':'其他角色的出牌阶段内可以对你使用【桃】。若如此做，其摸一张牌且本局游戏内的手牌上限+1。',
			yb047_shouqing2:'守情',
			yb047_shouqing3:'守情',
			//--------------------吴爽----------------//
			'yb048_ningyuan':'凝元',
			'yb048_ningyuan_info':'①弃牌阶段开始时，你可将至多五张置于武将牌上，称为“元”。②当你使用牌时，你摸一张牌并将一张“元”置入弃牌堆（若你的手牌数不为全场唯一最多则改为摸X张牌，X为“元”数）。',
			'yb048_ningyuan_append':'详勘细察，洞若观火。',
			'yb048_wuling':'巫灵',
			// 'yb048_wuling_info':'锁定技，你使用的普通锦囊牌不能被无懈可击响应；当你对手牌数不大于你的其他角色造成伤害时，此伤害+1。',
			'yb048_wuling_info':'锁定技，若你没有〖巫女〗，你视为拥有〖巫女〗。你可以使用以下技能：<br><span class=yellowtext>出牌阶段限一次，你可以弃置任意张手牌并选择一名其他角色（不能超过该角色的牌数），然后令其选择一项：弃置一张牌并令你摸X张牌，或弃置X张牌并令你摸一张牌。然后你将你与其弃置的且位于弃牌堆中的牌以任意顺序置于牌堆顶，若你有凝元，你可改为将这些牌放在武将牌上称为“元”。</span>',
			'yb048_huanjie':'幻界',
			'yb048_huanjie_info':'锁定技，当你进行判定或摸牌时，你改为从牌堆的另一端获取相应的牌。',
			yb048_zhimeng:'织梦',
			yb048_zhimeng_info:'锁定技，场上的判定牌生效后，若其即将进入弃牌堆，你将之放在武将牌上称为“织梦”；锁定技，你的摸牌阶段额外摸X张，手牌上限+X（X为“织梦”的花色数）。',
			yb048_shennv:'神女',
			yb048_shennv_info:'锁定技，当你使用牌时，你进行判定，若结果与你使用的牌花色相同，则此牌额外结算一次。',
			yb048_minzhen:'罠阵',
			yb048_minzhen_info:'锁定技，场上角色回合开始时，若你的“织梦”数不小于其体力上限，则你选择其体力上限数的“织梦”，以任意顺序置于牌堆顶。',
			yb048_minzhen_append:'<i>罠，汉字，中文读音为mín，罗马音【wana】假名【わな】。释义为钓鱼绳，捕捉走兽的网。汉语鲜有用到。在日语中有“圈套，陷阱”的意思，游戏王中陷阱卡的标识就是“罠”。</i>',
			//--------------------王婉儿--------------//
			//--------------------鐏柬----------------//
			//--------------------北落师门------------//
			//--------------------姜森----------------//
			//--------------------秋儿----------------//
			'yb053_lvxin':'孤旅',
			'yb053_lvxin_info':'锁定技，若你未拥有旅心，则视为你拥有旅心；<br>当你发动旅心摸牌时，你可以弃置之，改为回复一点体力（每种类型每回合限一次）或令你本回合手牌上限+1。',
			'yb053_yinren':'隐忍',
			'yb053_yinren_info':'锁定技，①当你受到伤害时，你需选择：弃置一张牌，或令此伤害+1；然后获得如下效果直至当前回合结束：②每个回合结束时，你选择回复两点体力或摸X+1张牌（X为你已损体力值且至多为3）；③当你脱离濒死状态时，你升级此技能（令②效果变为常驻效果。）',//，然后将技能改名为【迸射】
			//--------------------悦儿----------------//
			'yb054_caijin':'裁巾',
			'yb054_caijin_info':'其他角色使用点数大于1的装备牌时，你可以令此牌点数-1，然后你获得一张点数为1的同名牌并可立即使用。当复制牌进入弃牌堆时，自动销毁，并令此牌的原型点数+1，若此牌的原型仍在场上，则区域内有该牌的角色回复一点体力。',
			// 'yb054_caijin_info':'限定技，出牌阶段，你选择一张在游戏内且点数大于1的装备牌，你将此牌移出游戏，然后创建两张与此牌同牌名的牌，且两张牌的点数之和等于原来的那张牌，花色与原来的牌相同。然后你选择一名其他角色，你与其各获得一张，且可立即使用之。然后标记该角色为“裁巾”。',
			'yb054_xiezhi':'血指',
			'yb054_xiezhi_info':'①锁定技，当你受到伤害后，你展示手牌，若其中红色手牌数不大于你体力值，你摸三张牌；<br>②当你进入濒死状态时，你可以展示手牌并弃置所有红色手牌，然后回复体力至所弃红色牌的数量。若如此做，此伤害结算完成后，1和2效果于本回合失效。<br>③当“裁巾”角色造成伤害时，你可选择①或②其中一项内容执行。（大饼待写）',
			yb054_chouqi:'愁泣',
			yb054_chouqi_info:'转换技，当你受到伤害后，你可以展示手牌，并制衡任意张（阴，黑色手牌；阳，红色手牌），若你以此法制衡了该颜色所有牌，你额外摸一张牌。（大饼待写）',
			yb054_zhishang:'炙伤',
			yb054_zhishang_info:'锁定技，每当你受到一次伤害后，你摸三张牌，然后若此伤害为属性伤害且你受伤时未处于横置状态，你减一点体力上限。',
			yb054_tongxin:'同心',
			yb054_tongxin_info:'当其他角色受到大于1点且有来源的伤害时，你可令此伤害-1，然后受到1点同属性无来源伤害。',
			//--------------------郑琰----------------//
			//--------------------董建超--------------//
			//--------------------孙美琪--------------//
			//--------------------孙世博--------------//
			//--------------------星落四公主----------//
			// yb059_liuxing:'流星',
			// yb059_liuxing_info:'',
			yb059_huiguang:'晖光',
			yb059_huiguang_info:'锁定技，游戏开始时，你选择一名星落四公主之一，将武将牌替换为其。当你即将阵亡时，若你仍有存活公主，则取消之，改为减少一点体力上限（至多减至1）并将武将牌替换为一名未阵亡的公主，并将你武将牌上的技能添加至新公主武将牌上，然后回复体力至上限。',//你视为拥有星落四公主全体成员武将牌上的所有技能。
			yb059_xingshi:'星逝',
			yb059_xingshi_info:'锁定技，每回合限一次，当你使用牌指定其他角色为唯一目标后，或成为其他角色使用牌的唯一目标后，你依次弃置你和对方的所有手牌，此牌结算完成后，你和对方各自摸等同自身当前体力值的牌数。',
			yb059_guanhong:'贯虹',
			yb059_guanhong_info:'出牌阶段限一次，你可以进行一次判定并获得判定牌。你记录你持有此技能时判定牌的花色，并覆盖上一次记录。当场上有角色使用该花色牌时，你可视为对该角色使用一张杀（不计入次数）',
			yb059_zhuotan:'濯潭',
			yb059_zhuotan_info:'重置技，刷新列表为[酒，桃，闪，杀]。你可以将手牌数调整至X，视为使用一张列表里的牌，X为你本次选择的选项所处的序号。',
			yb059_qingliu:'擎流',
			yb059_qingliu_info:'锁定技，当你使用牌时，若此牌不为你的手牌，则你重置武将牌上的技能；你摸牌阶段额外摸6-你武将牌上技能数张牌。',
			yb059_pingyu:'评雨',
			yb059_pingyu_info:'场上角色的判定阶段开始时，若其判定区没有牌，你可令其进行一次【灵雨】判定。一名角色的判定牌生效前，你可以打出一张牌替换之，然后若此牌与原判定牌的花色相同，你摸一张牌。',
			// yb059_pingyu_info:'场上角色的判定阶段开始时，若其判定区没有牌，你可令其进行一次【灵雨】判定。每当场上有判定牌生效后，你可以弃置自己的一张与判定结果花色相同的牌，然后摸两张牌。',
			// yb059_pingyu_info:'场上角色的判定阶段开始时，若其判定区没有牌，你可令其进行一次【灵雨】判定。每当场上有判定牌生效后，你可以弃置进行判定的角色一张牌，若弃置牌和判定结果花色相同，其摸两张牌，否则你可以弃置自己的一张与判定结果花色相同的牌，然后摸两张牌。',
			// yb059_xuanfeng:'旋风',
			// yb059_xuanfeng_info:'',
			// yb059_pingyu:'评雨',
			// yb059_pingyu_info:'转换技，当场上有牌进入弃牌堆时，你可展示手牌，若你手牌中没有与之同花色的牌，则：阳，你获得此牌；阴，你摸X张牌，X为4-你手牌的花色数。',
			//--------------------刘天杭--------------//
			//--------------------哲宇----------------//
			//--------------------于洪岩--------------//
			//--------------------魏铭利--------------//
			//--------------------吕明岩--------------//
			//--------------------阎锡文--------------//
			//--------------------武筠----------------//
			//--------------------梦忆蛇妃--------------//
			'yb067_sanmeng':'散梦',
			'yb067_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb067_chanqing':'缠情',
			'yb067_chanqing1':'缠情',
			'yb067_chanqing_info':'出牌阶段限一次，你可以指定一名其他角色，{你弃置一张手牌，并令其摸一张牌（若其手牌数大于体力上限则不摸），然后获得其一张手牌，若此牌可以主动使用，你可以使用之}，然后重复此流程，直到此流程执行X次，X为其体力值且至多为5。）流程结束后你可以令双方各摸Y张牌，Y为此技能实际执行次数。<i>当你使用〖缠情〗指定目标时，若目标与你上次〖缠情〗的目标：相同，你将势力改为忆并回复一点体力；不同，你将势力改为梦并摸两张牌。出牌阶段结束时，若你本阶段没有发动此技能，则移除上次目标的记录。</i>',
			'yb067_kuiyi':'溃忆',
			'yb067_kuiyi_info':'忆势力技，结束阶段，你可以弃置所有手牌，定义X为所弃牌数，然后根据所弃花色依次执行：<br/>1，令至多X名角色各摸一张牌；<br/>2，令至多X名角色各回复一点体力；<br/>3，令至多X名角色增加一点体力上限；<br/>4，令一名任意角色摸3张牌；<br/><i>若你本回合发动过〖缠情〗，则此技能指定本回合〖缠情〗角色为目标时，其在此技能流程结束时，额外执行一次被分配到的最后一项。</i>',
			//--------------------清月----------------//
			'yb068_mingzhu':'明珠',
			'yb068_mingzhu_info':'锁定技，若你未装备宝物，你不会受到属性伤害。',
			'yb068_chenyu':'沉鱼',
			'yb068_chenyu_info':'结束阶段，你可以摸X+1张牌，X为你已损体力值且至多为3。',
			'yb068_jingyue':'镜月',
			'yb068_jingyue_info':'每回合限一次，你可以失去一点体力（血量不大于一则跳过），视为使用一张本回合你使用过的可以主动使用的锦囊、基本或花朵牌。',
			'yb068_jingyue_append':'有些不符合本意，但是能写出能玩的技能就应当感激上苍赐予的灵感了。正所谓，阳春召我以烟景，大块假我以文章。',
			yb068_yingxian:'映现',
			yb068_yingxian_info:'当你使用牌后，若此为你的出牌阶段，且不是转化牌，并且此牌有对应的实体牌在弃牌堆中，你将其置于武将牌上成为“镜”；出牌阶段结束后，你弃置所有“镜”；出牌阶段限一次，你可以失去一点体力，依次使用所有“镜”。',
			//--------------------香紫----------------//
			'yb069_sanmeng':'散梦',
			'yb069_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb069_yaomian':'邀眠',
			'yb069_yaomian_info':'出牌阶段限一次，你可以指定一名其它角色，若{其为男性角色且有牌，你获得其一张牌}，然后你与其各自翻面。',
			'yb069_wenhuan':'温幻',
			'yb069_wenhuan_info':'转换技，阴，当有角色受到伤害后，你可以令其武将牌复位并令其摸一张牌。阳，当有角色回复体力时，你可令其翻面，并令此次恢复效果+1。',
			//--------------------吕艳秋----------------//
			yb070_queshi:'折枝',
			yb070_queshi_info:'夏洛特，锁定技，初始化或{失去牌后，若不是因使用装备，并且你武器栏为空且未废除}，你创造一张【折枝枪】并装备之。',
			yb070_meiying:'梅影',
			yb070_meiying_info:'你可以将同花色的一至两张牌按下列规则使用或打出：红桃当【桃】，方块当雷【杀】，梅花当【闪】，黑桃当普【无懈可击】。若你以此法使用了两张红色牌，则此牌回复值或伤害值+1。若你以此法使用了两张黑色牌，则你弃置当前回合角色一张牌。。',
			// yb070_meiying_info:'每当你造成或受到卡牌伤害时，你获得一枚【梅影】标记（上限为4）。你可以移去一枚梅影，并发动一次雷电界龙魂。',
			yb070_fuyi:'傲寒',
			yb070_fuyi_info:'出牌阶段限一次或准备阶段或当你进入濒死状态时，你可以移去你列表中第一个技能，然后进行一次TW扶汉，势力范围为神，忆，梦，抽取数量为场上存活角色数且至少为4，{将池排除掉神夜白，神贾诩，线下神马超}，然后若你体力值为全场最低，则顺便回复一点体力。',
			//-------------------071faraway
			'ybsl_xinghen':'星痕',
			'#ybsl_xinghen1':'难道我就到此为止了吗？',
			'#ybsl_xinghen2':'在灰烬之中创造希望，在毁灭之中孕育新生。',
			'ybsl_xinghen_info':'锁定技，定义X为你“痕”标记数；你的手牌上限+X且至多+5，你摸牌阶段额外摸X张牌且至多额外摸3；当你体力值变动时，你获得等量“痕”；当你进入或脱离濒死时，你随机摸一至三张牌；结束阶段，若你的“痕”数大于手牌数加体力上限，你需弃置所有手牌，然后移除所有“痕”并加一点体力上限，然后将手牌摸至体力上限。',
			'ybsl_cuixing':'淬星',
			'ybsl_cuixing_info':'你可以将一至两张同花色牌按照规则使用或打出。',
			'ybsl_cuixing_spade':'<span class=YB_snowtext>淬星</span>',
			'#ybsl_cuixing_spade1':'这是多么伟大的力量，才能将亘古不变的虚空扭曲。',
			'ybsl_cuixing_heart':'<span class=yellowtext>淬星</span>',
			'#ybsl_cuixing_heart1':'天命昭昭，余生遥遥。',
			'ybsl_cuixing_club':'<span class=YB_darktext>淬星</span>',
			'#ybsl_cuixing_club1':'你的胜利是侥幸的，我的出现，你连这一丝侥幸的机会都没有。',
			'ybsl_cuixing_diamond':'<span class=firetext>淬星</span>',
			'#ybsl_cuixing_diamond1':'不懂得珍惜为何物的人，不配得到神的祝福。',
			'ybsl_cuixing_spade_info':'你可以将一至两张黑桃牌当作【无懈】使用或打出，属性为<span class=YB_snowtext>冰</span>。',
			'ybsl_cuixing_heart_info':'你可以将一至两张红桃牌当作【桃】使用或打出，属性为<span class=yellowtext>血</span>。',
			'ybsl_cuixing_club_info':'你可以将一至两张梅花牌当作【闪】使用或打出，属性为<span class=YB_darktext>雷</span>。',
			'ybsl_cuixing_diamond_info':'你可以将一至两张方块牌当作【杀】使用或打出，属性为<span class=firetext>火</span>。',
			'ybsl_xinghui':'星辉',
			'#ybsl_xinghui1':'你所谓的黎明将永远不会到来。',
			'ybsl_xinghui_info':'当你单次使用了大于一张的牌时，则你可以摸一张牌或为此牌附加全部应变效果（前提是此牌可以应变，并且每个牌名每回合限以此法应变一次）。',
			'ybsl_xingbian':'星变',
			'#ybsl_xingbian1':'这是我为了生存，最后的挣扎！',
			'#ybsl_xingbian2':'万法归一，与天同高，普天之间，还有谁能与我一战！？',
			//（本来想把“我”改成“吾”，不过这个技能单独存在<无意>义，就不改了，并且要改也得让远方重新配音）
			'ybsl_xingbian_info':'锁定技，当你获得牌时，若你体力上限加体力值大于手牌数乘2，你减一点体力上限（体力上限不大于1则不减），然后升级〖淬星〗，然后此技能在洗牌之前无法使用。',
			'ybsl_cuixing_change':'淬星升级',
			'ybsl_cuixing_change_info':'为每种花色分配一种额外的转化目标牌，每种目标牌限添加一次。因此法添加的牌每回合限用一次。',
			//----------------------苏令燚
			'yb072_ezhao':'恶兆',
			'yb072_ezhao_info':'锁定技，场上其他角色回合开始时，你令其判定，若此结果与其所有“呪”花色不同，你将此牌置于其武将牌上称为“呪”，否则（置入弃牌堆，然后该角色可以对你发起〖投江〗）。<br/>有“呪”的角色使用牌时，若其有“呪”与此牌花色相同，你可以令此牌无效或令其摸一张牌。',
			'yb072_toujiang':'投江',
			'yb072_toujiang_info':'所有其他角色对你进行“是否”投票，若“是”大于“否”，则你神圣死亡。其他角色对你投票时，其票数增加X，X为其“呪”数。',
			//-------------------073Al
			'ybsl_duanzui':'断罪',
			'ybsl_duanzui_info':'①出牌阶段限一次，你可指定一名其他角色，将其区域内一张牌置于武将牌上称为“§”(若其无牌则改为牌堆顶一张牌)，然后若其体力上限大于1，你令其减少1点体力上限，然后你减少1点体力上限。<br>②你对拥有“§”标记的角色使用牌没有距离限制。<br>③拥有“§”标记的角色手牌上限加X，X为其“§”标记数。',
			'ybsl_zhenhun':'镇魂',
			'ybsl_zhenhun_info':'锁定技。①当你使用牌指定目标后，若目标有“§”标记，则其不可响应此牌。若你本回合内以此法获得的牌数小于2，则你摸一张牌。<br>②每回合限一次，当你造成伤害后，你可以选择获得受伤角色的一张“§”，然后你增加一点体力上限并摸一张牌。<br>③每当场上有“§”的角色阵亡时，你增加Y点体力上限并摸Y张牌。（Y为其“§”标记数。）',
			'ybsl_kunyu':'困圄',
			'ybsl_kunyu_info':'锁定技。①你的手牌上限基数等于你已损失的体力值。<br>②当你受到其他角色造成的伤害时，若你的体力上限大于1.则你防止此伤害，减一点体力上限并将一张手牌交给一名其他角色。然后若你拥有【断罪】，则你将伤害来源的一张牌置于其武将牌上作为“§”(若其无牌，则改为牌堆顶一张牌)。',//§
			//----------------074花落隨風----------------//
			ybsl_guanxing:'观星',
			ybsl_guanxing_info:'观星',
			ybsl_tianwen:'天问',
			ybsl_tianwen_info:'天问',
			ybsl_guayao:'卦爻',
			ybsl_guayao_info:'卦爻',
			//--------------------狗卡----------------//
			'yb075_quanke':'劝氪',
			'yb075_quanke_info':'其他角色出牌阶段开始时，你可以令其展示并交给你一张牌。若如此做，本阶段该角色使用与此牌同类型牌时，摸一张牌。',
			'yb075_quanke_buff':'劝氪',
			'yb075_quanke_append':'有没有感觉好像很熟悉。',
			'yb075_wuma':'无马',
			'yb075_wuma_info':'锁定技，游戏开始时或你获得此技能时，你废除坐骑栏。',
			'yb075_wuma_append':'麒麟弓对苟卡无效。',
			'yb075_qianma':'钳马',
			'yb075_qianma_info':'你可以将一张坐骑牌当作【无中生有】使用。',
			'yb075_qianma_append':'为了钳（钱），我从来都不要马。',
			//-------------------梦朱焌--------------//
			'yb076_sanmeng':'散梦',
			'yb076_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb076_suiyan':'随宴',
			'yb076_suiyan_info':'每轮限一次，其他角色出牌阶段开始时，你可以令其摸两张牌，若如此做，当其于本阶段使用非装备或非延时牌后，你可以视为使用一张同样的牌。',
			'yb076_zhenlie':'贞烈',
			'yb076_zhenlie_info':'当你成为其他角色使用【杀】或普通锦囊牌的目标后，你可以失去一点体力并令此牌对你无效，然后弃置对方一张牌。',
			//-------------------梦羊祈絮--------------//
			'yb077_sanmeng':'散梦',
			'yb077_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb077_shensu':'神速',
			'yb077_shensu_info':'你可以选择一至三项：1. 跳过判定阶段和摸牌阶段；2. 跳过出牌阶段并弃置一张装备牌；3. 跳过弃牌阶段并将你的武将牌翻面。你每选择一项，视为你对一名其他角色使用一张没有距离限制的【杀】',
			'yb077_yingmu':'影幕',
			'yb077_yingmu_info':'锁定技，若你武将牌背面朝上，你不能成为其他角色使用牌的目标。',
			yb077_jibu:'疾步',
			yb077_jibu_info:'每回合限三次，当你使用牌后，若此牌未造成伤害，你可以摸一张牌。',
			//-------------------梦朱涯海--------------//
			'yb078_sanmeng':'散梦',
			'yb078_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			'yb078_yaoyan':'邀宴',
			'yb078_yaoyan_info':'出牌阶段限一次，你可以选择任意名其他角色，你依次获得目标角色一张牌，本回合结束后这些角色各摸一张牌。',
			
			//-------------------小新--------------//
			yb079_qingnian:'情念',
			yb079_qingnian_info:'锁定技，每轮开始时，若场上没有你指定的“情念”角色，你需指定一名其他的未折棒的男性角色，标记为“情念”。当“情念”角色于摸牌时，若你有手牌，则你{可以}弃置一张手牌，令其本次摸牌数+2。当你于一回合内第二次询问此技能时，你将前文中的{可以}删掉，然后失去【浸染】，获得【吟咏】。',//当你不因此技能而获得牌时，若其有手牌，其需交给你一张手牌。
			yb079_jinran:'浸染',
			yb079_jinran_info:'其他角色弃牌阶段结束时，你可以获得一张本阶段其弃置的牌，然后若你手牌数不大于体力上限，你可再执行一次。当你再一次执行时，若场上有你指定的“情念”角色，且当前弃牌的角色{不为“情念”角色，不为折棒角色，不为女性角色}，则视为当前弃牌的角色对“情念”角色使用一张决斗，因此决斗受伤的角色可以选择折棒，防止此伤害。当“情念”角色折棒时，你取消对其的“情念”。',
			yb079_yinyong:'吟咏',
			yb079_yinyong_info:'每回合限一次，当你因弃置而失去一张手牌时，你可以视为使用之。此技能在“情念”角色的回合改为限两次。',
			//-------------------凤--------------//
			yb080_huayu:'华羽',
			yb080_huayu_info:'锁定技，①游戏开始时，你创造并装备一张【凤求凰】②当你阵亡时，将游戏中的〖凤求凰〗置入其他角色装备区或弃牌堆（若游戏中没有则尝尝创造一张）。',
			yb080_niepan:'涅槃',
			yb080_niepan_info:'限定技，当你处于濒死状态时，你可以复原你的武将牌，然后将体力回复至3点并摸三张牌，最后获得技能【凤鸣】。',
			yb080_fengming:'凤鸣',
			yb080_fengming_info:'出牌阶段结束后若你于本阶段未使用过牌，或出牌阶段被跳过，你可以选择一项①本回合手牌上限+3；②视为使用一张〖凤鸣九霄〗。',
			//-------------------陈丽陈思--------------//
			yb081_lvxin:'旅心',
			yb081_lvxin_info:'旅心介绍',
			yb081_shanhui:'闪回',
			yb081_shanhui_info:'闪回介绍',
			yb081_sishi:'肆时',
			yb081_sishi_info:'肆时介绍',
			yb081_yinmeng:'引梦',
			yb081_yinmeng_info:'引梦介绍',
			//-------------------卞秋雯----------------//
			yb082_youhun:'游魂',
			yb082_youhun_info:'单纯提供一句语音',
			// yb082_youhun_info:'转换技，阴：你可以将X+Y张牌当作任意一张锦囊牌使用；阳：你可以将X+Y张牌当作任意一张基本牌使用。当此牌造成伤害后，你增加一点体力上限，然后Y计数+1。（X为本轮此技能使用次数且至少为0，Y初始为0，最低为0）；每当你废除一个装备栏时，你令Y计数-1；',
			yb082_chameng:'诧梦',
			yb082_chameng_info:'每回合限一次，①当有角色于其弃牌阶段外弃牌后，若其正面朝上，你可令其翻至背面，否则你可令其再弃置等量牌。②当有角色于其摸牌阶段外摸牌后，若其背面朝上，你可令其翻至正面，否则你可令其再摸等量牌。',
			//-------------------小筑----------------//
			'yb083_sanmeng':'散梦',
			'yb083_sanmeng_info':'梦势力技，回合开始时，你可以摸两张牌，若如此做，本回合手牌上限-1。弃牌阶段开始时，你可以弃置两张牌，令手牌上限+1。',
			yb083_shenshou:'神手',
			yb083_shenshou_info:'神手介绍',
			//-------------------张汨----------------//
			yb084_xundu:'寻妒',
			yb084_xundu_info:'每回合限一次，对每名角色限一次，当有其他角色于摸牌阶段外获得牌时，你可以展示之，然后展示手牌，若其中没有与你手牌同名的牌，你令该角色选择一项<br/>①受到你造成的一点伤害②将这些牌改为你获得之。<br/>若有同名牌，你可以弃置手牌中所有同名的牌，然后本次选项由你选择。',
			yb084_efei:'恶诽',
			yb084_efei_info:'每回合限一次，①当其他角色使用牌时，你可以弃置一张同名牌，令此牌无效；②当其他角色受到卡牌伤害后，你可以弃置一张与造成伤害的牌牌名相同的牌，然后你令此牌追加造成一点伤害。',
			yb084_pomen:'破梦',
			yb084_pomen_info:'每回合限一次，当其他角色弃置牌时，你可以令其收回此牌（多张牌则由你选择一张令其收回），视为其对自己造成一点由此牌造成的伤害；当以此法选择的牌致人死亡时，你获得此牌。',
			yb084_pomeng:'破梦',
			yb084_pomeng_info:'当其他角色弃置牌时，你可以令其收回此牌（多张牌则由你选择一张令其收回），视为其对自己造成一点由此牌造成的伤害；当以此法选择的牌致人死亡时，你获得此牌。',
			//--------------------独孤雨-------------//
			'yb085_muyuan':'慕愿',
			'yb085_muyuan_info':'当你使用非装备牌指定唯一其他角色为目标后，你可获得其一张牌，然后其摸一张牌。',
			'yb085_cibie':'辞别',
			'yb085_cibie_info':'你可以让使你脱离濒死状态的角色获得技能【慕愿】。限定技，出牌阶段，你可以失去全部体力，并令一名其他角色选择：弃置等量手牌（牌数不够不可选），或受到等量伤害。',
			//--------------------龚洁------------------//
			//-------------------田璐
			//-------------------
			//-------------------
			//-------------------
			//-------------------
			//-------------------珂赛特
			yb100_lieshi:'烈誓',
			yb100_lieshi_info:'重置技，刷新列表为：["受到你造成的一点火焰伤害，然后废除一个随机装备栏","受到你造成的两点火焰伤害","受到你造成的三点火焰伤害，然后摸三张牌"]。出牌阶段限一次，你可以选择一名其他角色，你令你们之一先选择列表其中一项执行，然后另一方执行列表中仍存的一项。',
			yb100_dianzhan:'点盏',
			yb100_dianzhan_info:'重置技，锁定技，刷新列表为：["横置自身然后展示手牌并重铸一种花色所有手牌","调整手牌至4张","展示手牌并弃置每种类型手牌各一张"]。当你使用牌指定目标时，若此是你本回合首次指定其为目标，你横置自身并执行列表中的一项，然后若你不为目标，则令目标也执行此项。',
			yb100_huanyin:'还阴',
			yb100_huanyin_info:'锁定技，当你进入濒死状态时，你将【烈誓/点盏】刷新列表存在且现存列表中未仍存在的一项移至另一刷新列表，然后将手牌调整至与已发动选项数相同，然后你展示手牌，若花色各不相同，你回复体力至1。（已发动选项数，即刷新列表存在，但现存列表没有的选项）',


			ybsl_aocai:'傲才',
			ybsl_aocai2:'傲才',
			ybsl_aocai2_backup:'傲才',
			ybsl_aocai3:'傲才',
			ybsl_aocai_info:'当你于回合外需要使用或打出一张基本牌时，你可以观看牌堆顶的两张牌（若你没有手牌则改为四张）。若你观看的牌中有此牌，你可以使用打出之。',
			//-----------------------上古神话专题---------------------------//
			'sgsh_huaxu':'华胥',
			'sgsh_taizichangqin':'太子长琴',
			'sgsh_nvba':'女魃',
			'sgsh_luohou':'罗睺',
			'sgsh_dongwanggong':'东王公',
			'sgsh_yinglong':'应龙',
			'sgsh_xingtian':'刑天',
			'sgsh_yuqiang':'禺强',
			'sgsh_xiwangmu':'西王母',
			'sgsh_dayu':'大禹',

			'sgsh_talei':'踏雷',
			//'sgsh_talei_info':'一名角色的回合开始时，你可令其进行一次判定，若结果为黑桃2~9，则该角色受到3点无来源雷电伤害。',
			'sgsh_talei_info':'一名角色的回合开始时，你可令其进行一次闪电的判定。',
			'sgsh_yunyuu':'孕育',
			'sgsh_yunyuu_info':'一名角色的红桃判定牌生效后，你可以摸一张牌。',
			'sgsh_yuefeng':'乐风',
			'sgsh_yuefeng_info':'结束阶段开始时，你可以展示牌堆顶三张牌，然后选择获得每种花色的牌各一张。',
			'sgsh_zhisheng':'止声',
			'sgsh_zhisheng_info':'其他角色于其出牌阶段内使用第X张牌后，你可以弃置一张牌令此阶段立即结束，X为你当前体力值。',
			'sgsh_buyu':'不雨',
			'sgsh_buyu_info':'其他角色的准备阶段，你可以与该角色拼点。若你赢，其跳过下个出牌阶段。',
			'sgsh_hanshen':'旱神',
			'sgsh_hanshen_info':'锁定技，当一名场上角色失去最后的手牌时，你摸一张牌。',
			'sgsh_buyu2':'不雨',
			'sgsh_buyu2_info':'受到旱神的诅咒，本回合跳过摸排阶段。',
			'sgsh_yueshi':'月蚀',
			'sgsh_yueshi_info':'每当你使用一张牌后，你可以重铸一张牌。',
			'sgsh_baigong':'拜公',
			'sgsh_baigong_info':'锁定技，你始终跳过摸牌阶段；其他角色的摸牌阶段结束时，你获得其一张牌（若触发技能前场上角色数不大于4人且对方牌数比你多，你再获得其一张牌。）。',
			'sgsh_cangling':'苍灵',
			'sgsh_cangling_info':'出牌阶段结束时，若你未于本出牌阶段内使用牌指定过其他角色为目标，则你可以令一名任意角色增加一点体力上限，然后你回复一点体力。',
			'sgsh_zongshui':'纵水',
			// 'sgsh_zongshui_info':'出牌阶段开始时，你可以弃置一张牌，令所有其他角色各自选择一项，弃置一张与此牌同花色的牌，或本回合不能响应你使用的牌。',
			'sgsh_zongshui_info':'出牌阶段限一次，你可以弃置任意张花色各不相同的牌，并选择任意名其他角色，弃置其一张牌。若你弃置的牌花色包含目标所弃花色，则本回合该角色不能使用或打出牌。',
			sgsh_fuchou:'复仇',
			'sgsh_fuchou_info':'一名角色的回合结束后，若你此回合受到过其造成的伤害，你可以摸一张牌并视为对其使用一张【杀】。',
			sgsh_kunlun:'昆仑',
			'sgsh_kunlun_info':'锁定技，当你成为黑桃牌的目标时，你摸两张牌，然后若你未受伤，你弃两张牌。',
			sgsh_huasheng:'化生',
			'sgsh_huasheng_info':'出牌阶段结束时，你可以展示一张基本牌或普通锦囊牌，并视为使用。',//若你未于本出牌阶段内使用牌指定过其他角色为目标，
			sgsh_zhihai:'治海',
			'sgsh_zhihai_info':'一名其他角色的回合开始时，你可以将弃牌堆与牌堆交换。',
			sgsh_xuanming:'玄冥',
			'sgsh_xuanming_info':'每当一名角色的回合结束后，你可以将此回合进入弃牌堆的牌任意顺序放置在弃牌堆顶或弃牌堆底。',
			sgsh_zhishui:'治水',
			'sgsh_zhishui_info':'出牌阶段限一次，你可以令至多X名角色弃置所有牌并摸等量的牌，X为你当前体力值。',
		},//翻译（必填） 
		dynamicTranslate:{//动态翻译
			ybsl_xianyin:function(player){//弦音
				var str0='转换技，（括号内的阴阳为鸾鸣的形态）<br/>';
				var str1='阴（阴）：当你因弃置而失去一张黑桃牌时，你可令一名角色下个摸牌阶段额外摸一张牌；';
				var str2='阴（阳）：当你因弃置而失去一张梅花牌时，你可令一名角色回复一点体力；';
				var str3='阳（阴）：当你因弃置而失去一张红桃牌时，你可令一名角色失去一点体力；';
				var str4='阳（阳）：当你因弃置而失去一张方块牌时，你可令一名角色下个摸牌阶段少摸一张牌。';
				var str5='<span class="bluetext">';//蓝色字符
				var str6='<span class=yellowtext>';//黄色字符
				var str7='<span class=firetext>';//红色字符
				var str8='</span>';
				var str9='（若你没有鸾鸣或鸾鸣已使用则改为黑色牌）<br/>';
				var str10='（若你没有鸾鸣或鸾鸣已使用则改为红色牌）<br/>';
				if(player.storage.ybsl_xianyin==true) {//弦音阳
					if(player.storage.ybsl_luanming==true){//鸾鸣阳
						if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
							var str=str0+str1+str9+str6+str2+str8+str9+str3+str10+str5+str4+str8+str10;//√
						}
						else{//--------------------------------无鸾鸣
							var str=str0+str1+str9+str6+str2+str9+str8+str3+str10+str5+str4+str10+str8;//√
						}
					}
					else{//-------------------------------------鸾鸣阴
						if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
							var str=str0+str6+str1+str8+str9+str2+str9+str5+str3+str8+str10+str4+str10;//√
						}
						else{//--------------------------------无鸾鸣
							var str=str0+str6+str1+str9+str8+str2+str9+str5+str3+str10+str8+str4+str10;//√
						}
					}
				}
				else{//---------------------------------弦音阴
					if(player.storage.ybsl_luanming==true){//鸾鸣阳
						if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
							var str=str0+str1+str9+str5+str2+str8+str9+str3+str10+str6+str4+str8+str10;
						}
						else{//------------------------------无鸾鸣
							var str=str0+str1+str9+str5+str2+str9+str8+str3+str10+str6+str4+str10+str8;
						}
					}
					else{//---------------------------------鸾鸣阴
						if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
							var str=str0+str5+str1+str8+str9+str2+str9+str6+str3+str8+str10+str4+str10;
						}
						else{//-------------------------------无鸾鸣
							var str=str0+str5+str1+str9+str8+str2+str9+str6+str3+str10+str8+str4+str10;
						}
					}
				}
				return str;
			},
			ybsl_luanming:function(player){//鸾鸣
				if(player.storage.ybsl_luanming==true) return '转换技，每回合限一次，当你可以使用牌时，你可以弃置一黑一红共两张牌，然后：阴：视为使用其中的黑色牌并额外执行一次；<span class="bluetext">阳：视为使用其中的红色牌并额外执行一次。</span><br><span class=yellowtext>注意：此技能不能用于响应其他牌，更不能在别人濒死时用桃选择其为目标！</span>';
				return '转换技，每回合限一次，当你可以使用牌时，你可以弃置一黑一红共两张牌，然后：<span class="bluetext">阴：视为使用其中的黑色牌并额外执行一次；</span>阳：视为使用其中的红色牌并额外执行一次。<br><span class=yellowtext>注意：此技能不能用于响应其他牌，更不能在别人濒死时用桃选择其为目标！</span>';
			},
			yb001_minglun:function(player){
				var str='锁定技，回合开始时，你展示牌堆顶一张牌并放在武将牌上，至多放四张。根据“命轮”的花色，你视为拥有技能：<br>';
				var list={'spade':'黑桃：栖月','heart':'红桃：旅心','club':'<br>梅花：折叶','diamond':'方块：忆水'};
				for(var i in list){
					var cards=player.getExpansions('yb001_minglun');
					for(var k of cards){
						if(get.suit(k)==i)list[i]='<span class=YB_snowtext>'+list[i]+'</span>';
					}
					str+=list[i];
					str+='；';
				}
				str+='<br>结束阶段，若“命轮”包含相同花色或四种花色，则你需弃置所有“命轮”或失去一点体力。';
				return str;
			},
			yb004_tianqi:function(player){//天祈
				if(!player.storage.yb004_shangyuan){
					var str='锁定技，当你对其他角色造成伤害后，你进行判定：若伤害不大于1，且结果为红色，你回复一点体力或摸一张牌；若伤害大于1，且结果为黑色，你失去一点体力并摸一张牌。当你受到伤害后，你进行判定，若结果为黑色，你摸x+1张牌，否则你恢复x-1点体力（x为此次伤害值）';
					if(lib.skill.xinleiji_misa.disableReason.contains('天祈'))str+='（此技能不可触发界雷击）';
					return str;
				}
				else {
					return '准备阶段或结束阶段或当你受到伤害后，你可以进行一次判定，若结果为红色，则你回复一点体力或摸两张牌。';
				}
			},
			yb006_boxue:function(player){//博学
				if(player.storage.yb006_boxuex){
					return '锁定技，当你使用非装备牌或成为非装备牌的目标时，若你：<br>①没有对应的记录，则你记录该牌名，此技能结束。<br>②有对应的记录，则你移除对应的记录，然后摸一张牌（若此牌的使用者不为目标，则改为摸二），此技能结束。';
				}
				else{
					return'锁定技，当你使用非装备牌或成为非装备牌的目标时，若此牌没有被记录，则记录之，技能结束。'
				}
			},
			yb006_biaoshuai:function(player){//表率
				if(player.storage.yb006_biaoshuaix){
					return '主公技，每名其他忆势力角色每轮次各限一次。记录你回合内使用的第一张牌（覆盖上次记录）。其他忆势力角色使用或打出与之同名的牌时，<span class=yellowtext>你可以摸一张牌，然后你可以令其摸一张牌。</span>';
				}
				else{
					return '主公技，每名其他忆势力角色每轮次各限一次。记录你回合内使用的第一张牌（覆盖上次记录）。其他忆势力角色使用或打出与之同名的牌时，其可以令你摸一张牌，然后自己摸一张牌。'
				}
			},
			yb011_jueleng:function(player){//决冷
				if(player.storage.yb011_jueleng==true) return '转换技，阴：当场上角色受到伤害后，若伤害来源为其他角色，则你可以与伤害来源各摸一张牌或各弃一张牌；<span class="bluetext">阳：当场上角色受到伤害后，若</span><span class=yellowtext>受伤角色</span><span class="bluetext">为其他角色，则你可以与受伤角色各摸一张牌或各弃一张牌。</span>结束阶段或当你受到伤害时，你可以改变此技能状态。';
				return '转换技，<span class="bluetext">阴：当场上角色受到伤害后，若</span><span class=firetext>伤害来源</span><span class="bluetext">为其他角色，则你可以与伤害来源各摸一张牌或各弃一张牌；</span>阳：当场上角色受到伤害后，若受伤角色为其他角色，则你可以与受伤角色各摸一张牌或各弃一张牌。结束阶段或当你受到伤害时，你可以改变此技能状态。';
			},
			yb016_juli:function(player){
				var info=lib.skill.yb016_juli.getInfo(player);
				if(!player.storage.yb016_juli_add)return '当一名角色成为除其外的角色使用【杀】的目标时，若你至该角色的距离不大于'+info[1]+'，你可以重铸至多'+info[0]+'张牌，然后令此牌的使用者弃置一张牌，（该牌的类型须为你重铸的牌中包含的类型）否则此牌对你无效。';
				return '当一名角色成为除其外的角色使用【伤害牌】的目标时，若你至该角色的距离不大于'+info[1]+'，你可以重铸至多'+info[0]+'张牌，然后令此牌的使用者弃置一张牌，（该牌的类型须为你重铸的牌中包含的类型）否则此牌对你无效。';
			},
			yb033_shuhui:function(player){//淑慧
				if(player.storage.yb033_shuhui==true){
					return '回合开始时，你可以弃置一张手牌，并令一名角色回复或失去一点体力。<span class=yellowtext>然后你展示牌堆顶一张牌，将隅泣任意一个数字改为该数字，至多为当前最低的数字+2。</span>';
				}
				else {
					return '回合开始时，你可以弃置一张手牌，并令一名角色回复或失去一点体力。（追加描述：然后你展示牌堆顶一张牌，将隅泣任意一个数字改为该数字，至多为当前最低的数字+2）'
				}
			},
			yb033_yuqi:function(player){
				var info=lib.skill.yb033_yuqi.getInfo(player);
				return '每回合限三次。当有角色受到伤害后，若你至其的距离不大于<span class=thundertext>'+info[0]+'</span>，则你可以观看牌堆顶的<span class=firetext>'+info[1]+'</span>张牌。你将其中至多<span class=greentext>'+info[2]+'</span>张牌交给受伤角色，然后可以获得剩余牌中的至多<span class=yellowtext>'+info[3]+'</span>张牌，并将其余牌以原顺序放回牌堆顶。（理论上所有具有颜色的数字至多为13，因为点数最大也才13）';
			},
			yb037_kexie:function(player){//咳血
				var str='锁定技，每当你弃置一张';
				if(player.storage.yb037_kexie==0) str+='<span class=firetext>牌</span>';
				if(player.storage.yb037_kexie==1) str+='<span class=firetext>红色牌</span>';
				if(player.storage.yb037_kexie>=2) str+='<span class=firetext>红桃牌</span>';
				str+='时，你失去一点体力。';
				return str;
			},
			yb047_youhun:function(player){
				if(player.storage.yb047_youhun==true) return '转换技，阴：你可以将X+Y张牌当作任意一张锦囊牌使用；<span class="bluetext">阳：你可以将X+Y张牌当作任意一张基本牌使用。</span>当此牌造成伤害后，你增加一点体力上限，然后Y计数+1。（X为本轮此技能使用次数且至少为0，Y初始为0，最低为0）；每当你废除一个装备栏时，你令Y计数-1；';//；③你持有的此技能改名为【迸射】
				return '转换技，<span class="bluetext">阴：你可以将X+Y张牌当作任意一张锦囊牌使用；</span>阳：你可以将X+Y张牌当作任意一张基本牌使用。当此牌造成伤害后，你增加一点体力上限，然后Y计数+1。（X为本轮此技能使用次数且至少为0，Y初始为0，最低为0）；每当你废除一个装备栏时，你令Y计数-1；';//，然后将技能改名为【迸射】
			},
			yb053_yinren:function(player){
				// lib.translate.yb053_yinren=lib.skill.yb053_yinren.getname(player);
				// lib.translate.yb053_yinren_damage=lib.skill.yb053_yinren.getname(player);
				// lib.translate.yb053_yinren_after=lib.skill.yb053_yinren.getname(player);
				// lib.translate.yb053_yinren_die=lib.skill.yb053_yinren.getname(player);
				if(player.storage.yb053_yinren==true) return '锁定技，①当你受到伤害时，你需选择：弃置一张牌，或令此伤害+1；②每个回合结束时，你选择回复两点体力或摸X+1张牌（X为你已损体力值且至多为3）。';//；③你持有的此技能改名为【迸射】
				return '锁定技，①当你受到伤害时，你需选择：弃置一张牌，或令此伤害+1；然后获得如下效果直至当前回合结束：②每个回合结束时，你选择回复两点体力或摸X+1张牌（X为你已损体力值且至多为3）；③当你脱离濒死状态时，你令②效果变为常驻效果。';//，然后将技能改名为【迸射】
			},
			yb069_wenhuan:function(player){//温幻
				if(player.storage.yb069_wenhuan==true) return '转换技，阴，当有角色受到伤害后，你可以令其武将牌复位并令其摸一张牌。<span class="bluetext">阳，当有角色回复体力时，你可令其翻面，并令此次恢复效果+1。</span>';
				return '转换技，<span class="bluetext">阴，当有角色受到伤害后，你可以令其武将牌复位并令其摸一张牌。</span>阳，当有角色回复体力时，你可令其翻面，并令此次恢复效果+1。';
			},
			//071
			ybsl_cuixing_spade:function(player){//淬星*4
				var str='你可以将一至两张黑桃牌当作';
				for(var i=0;i<player.storage.ybsl_cuixing_spade.length;i++){
					if(i>0){str+='、'};
					if(player.storage.ybsl_cuixing_ban_spade.contains(player.storage.ybsl_cuixing_spade[i])){str+='<span style="text-decoration: line-through;">【'+get.translation(player.storage.ybsl_cuixing_spade[i])+'】</span>'}
					else{str+='【'+get.translation(player.storage.ybsl_cuixing_spade[i])+'】';}
				}
				str+='使用或打出，属性为<span class=YB_snowtext>冰</span>。';
				return str;
			},
			ybsl_cuixing_heart:function(player){
				var str='你可以将一至两张红桃牌当作';
				for(var i=0;i<player.storage.ybsl_cuixing_heart.length;i++){
					if(i>0){str+='、'};
					if(player.storage.ybsl_cuixing_ban_heart.contains(player.storage.ybsl_cuixing_heart[i])){str+='<span style="text-decoration: line-through;">【'+get.translation(player.storage.ybsl_cuixing_heart[i])+'】</span>'}
					else{str+='【'+get.translation(player.storage.ybsl_cuixing_heart[i])+'】';}
				}
				str+='使用或打出，属性为<span class=yellowtext>血</span>。';
				return str;
			},
			ybsl_cuixing_club:function(player){
				var str='你可以将一至两张梅花牌当作';
				for(var i=0;i<player.storage.ybsl_cuixing_club.length;i++){
					if(i>0){str+='、'};
					if(player.storage.ybsl_cuixing_ban_club.contains(player.storage.ybsl_cuixing_club[i])){str+='<span style="text-decoration: line-through;">【'+get.translation(player.storage.ybsl_cuixing_club[i])+'】</span>'}
					else{str+='【'+get.translation(player.storage.ybsl_cuixing_club[i])+'】';}
				}
				str+='使用或打出，属性为<span class=YB_darktext>雷</span>。';
				return str;
			},
			ybsl_cuixing_diamond:function(player){
				var str='你可以将一至两张方块牌当作';
				for(var i=0;i<player.storage.ybsl_cuixing_diamond.length;i++){
					if(i>0){str+='、'};
					if(player.storage.ybsl_cuixing_ban_diamond.contains(player.storage.ybsl_cuixing_diamond[i])){str+='<span style="text-decoration: line-through;">【'+get.translation(player.storage.ybsl_cuixing_diamond[i])+'】</span>'}
					else{str+='【'+get.translation(player.storage.ybsl_cuixing_diamond[i])+'】';}
				}
				str+='使用或打出，属性为<span class=firetext>火</span>。';
				return str;
			},
			yb100_lieshi:function(player){
				var storage=get.YB_chongzhiList(player,'yb100_lieshi');//当前列表
				var list1=player.storage['yb100_lieshi'+'_chongzhijiList'];//刷新列表
				// var list1=get.YB_chongzhijiList(player,'yb100_lieshi');//刷新列表
				var str='重置技，刷新列表为：<br>';
				for(var i=0;i<list1.length;i++){
					if(storage.contains(list1[i]))str+='<span class=yellowtext>'+list1[i][0]+'</span><br>';
					else str+='<span style="opacity:0.5;">'+list1[i][0]+'</span><br>';
				}
				for(var i=0;i<storage.length;i++){
					if(!list1.contains(storage[i]))str+='<span class=thundertext>'+storage[i][0]+'</span><br>';
				}
				return str+'出牌阶段限一次，你可以选择一名其他角色，你令你们之一先选择列表其中一项执行，然后另一方执行列表中仍存的一项。（浅蓝色不在刷新列表中）。'
			},
			yb100_dianzhan:function(player){
				var storage=get.YB_chongzhiList(player,'yb100_dianzhan');//当前列表
				var list1=player.storage['yb100_dianzhan'+'_chongzhijiList'];//刷新列表
				// var list1=get.YB_chongzhijiList(player,'yb100_dianzhan');//刷新列表
				var str='重置技，锁定技，刷新列表为：<br>';
				for(var i=0;i<list1.length;i++){
					if(storage.contains(list1[i]))str+='<span class=yellowtext>'+list1[i][0]+'</span><br>';
					else str+='<span style="opacity:0.5;">'+list1[i][0]+'</span><br>';
				}
				for(var i=0;i<storage.length;i++){
					if(!list1.contains(storage[i]))str+='<span class=thundertext>'+storage[i][0]+'</span><br>';
				}
				return str+'当你使用牌指定目标时，若此是你本回合首次指定其为目标，你横置自身并执行列表中的一项，然后若你不为目标，则令目标也执行此项。'
			},
			// yb100_lieshi:'烈誓',
			// yb100_lieshi_info:'重置技，刷新列表为：["受到你造成的一点火焰伤害，然后废除一个随机装备栏","受到你造成的两点火焰伤害","受到你造成的三点火焰伤害，然后摸三张牌"]。出牌阶段限一次，你可以选择一名其他角色，你令你们之一先选择列表其中一项执行，然后另一方执行列表中仍存的一项。',
			// yb100_dianzhan:'点盏',
			// yb100_dianzhan_info:'重置技，锁定技，刷新列表为：["横置自身然后展示手牌并重铸一种花色所有手牌","调整手牌至4张","展示手牌并弃置每种类型手牌各一张"]。当你使用牌指定目标时，若此是你本回合首次指定其为目标，你横置自身并执行列表中的一项，然后令目标也执行此项。',
			// yb082_youhun:function(player){//单纯提供一句语音
			// 	if(player.storage.yb082_youhun==true) return '转换技，阴：你可以将X+Y张牌当作任意一张锦囊牌使用；<span class="bluetext">阳：你可以将X+Y张牌当作任意一张基本牌使用。</span>当此牌造成伤害后，你增加一点体力上限，然后Y计数+1。（X为本轮此技能使用次数且至少为0，Y初始为0，最低为0）；每当你废除一个装备栏时，你令Y计数-1；';//；③你持有的此技能改名为【迸射】
			// 	return '转换技，<span class="bluetext">阴：你可以将X+Y张牌当作任意一张锦囊牌使用；</span>阳：你可以将X+Y张牌当作任意一张基本牌使用。当此牌造成伤害后，你增加一点体力上限，然后Y计数+1。（X为本轮此技能使用次数且至少为0，Y初始为0，最低为0）；每当你废除一个装备栏时，你令Y计数-1；';//，然后将技能改名为【迸射】
			// },
		},
		
	}; 
	// lib.config.ybsl_ssln.intro
	

			// ybsl_machao:['ybsl_machao','machao'],//马超
			// dzsl_luxun:['dzsl_luxun','luxun'],//陆逊
			// ybsl_zhanghe:['ybsl_zhanghe','zhanghe'],//陆逊
			// ybslshen_zhenji:['ybslshen_zhenji','shen_zhenji'],//神甄姬
	// if(lib.characterReplace.luxun){lib.characterReplace.luxun.add('dzsl_luxun');}
	// else{lib.characterReplace.luxun = ["re_luxun", "luxun","dzsl_luxun"];}
	// if(lib.characterReplace.machao){lib.characterReplace.machao.add('ybsl_machao');}
	// else{lib.characterReplace.sp_machao = ["sp_machao","ybsl_machao"];}
	// if(lib.characterReplace.zhanghe){lib.characterReplace.zhanghe.add('ybsl_zhanghe');}
	// else{lib.characterReplace.zhanghe = ["re_zhanghe", "zhanghe","ybsl_zhanghe"];}
	// if(lib.characterReplace.shen_zhenji){lib.characterReplace.shen_zhenji.add('ybslshen_zhenji');}
	// else{lib.characterReplace.shen_zhenji=['shen_zhenji','ybslshen_zhenji'];}

	// if(!lib.characterPack.mode_guozhan)lib.characterPack.mode_guozhan={};
	// var list=lib.characterPack.ybslj;
	// for(var i in list){
	// 	lib.characterPack.mode_guozhan['gz_'+i]=[list[i][0],list[i][1],list[i][2],list[i][3],list[i][4]]
	// }
	
	if(lib.device||lib.node){ 
		for(var i in ybslj.character){
			ybslj.character[i][4].push('ext:夜白神略/image/character/'+i+'.jpg');
			
		} 
	}else{ 
		for(var i in ybslj.character){
			ybslj.character[i][4].push('db:extension-夜白神略:'+i+'.jpg');
			// ybslj.character[i][4].push('ext:夜白神略/audio/die/'+i+'.mp3');
		} 
	}//由于以此法加入的武将包武将图片是用源文件的，所以要用此法改变路径 
	for(var i in ybslj.character){
		ybslj.character[i][4].push('die:夜白神略/audio/die/'+i+'.mp3');
	}
	for(var i in ybslj.card){
		if(!ybslj.card[i].image) ybslj.card[i].image='ext:夜白神略/image/card/'+i+'.png'
	}
	return ybslj; 
}); 
//evt.isPhaseUsing(player)
