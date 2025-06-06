window.cardPile=[
	//--------------原属标准A牌堆--------------//
	['spade',1,'juedou'],
	['spade',2,'cixiong'],
	['spade',3,'zhujinqiyuan'],//应变替换过河--------☆
	['spade',4,'guohe'],
	['spade',5,'qinglong'],
	['spade',6,'qinggang'],
	['spade',7,'nanman',null,['yingbian_fujia','yingbian_remove']],//应变新增应变
	['spade',8,'sha','ice'],//应变替换杀--------☆
	['spade',9,'sha',null,['yingbian_canqu','yingbian_add']],//应变新增应变
	['spade',10,'sha'],
	['spade',11,'wuxie'],
	['spade',12,'zhujinqiyuan',null,['yingbian_fujia','yingbian_hit']],//应变替换过河--------☆
	['spade',13,'nanman',null,['yingbian_fujia','yingbian_remove']],//应变新增应变

	['heart',1,'taoyuan',null,['yingbian_fujia','yingbian_remove']],//应变新增应变
	['heart',2,'shan',null,['yingbian_kongchao','yingbian_draw']],//应变新增应变
	['heart',3,'tao'],
	['heart',4,'tao'],
	['heart',5,'qilin'],
	['heart',6,'tao'],
	['heart',7,'tao'],
	['heart',8,'tao'],
	['heart',9,'tao'],
	['heart',10,'sha'],
	['heart',11,'sha'],
	['heart',12,'guohe'],
	['heart',13,'shan'],

	['club',1,'juedou'],
	['club',2,'sha',null,['yingbian_kongchao','yingbian_add']],//应变新增应变
	['club',3,'zhujinqiyuan',null,['yingbian_zhuzhan','yingbian_add']],//应变替换过河--------☆
	['club',4,'zhujinqiyuan',null,['yingbian_zhuzhan','yingbian_add']],//应变替换过河--------☆
	['club',5,'sha'],
	['club',6,'sha'],
	['club',7,'nanman',null,['yingbian_fujia','yingbian_remove']],//应变新增应变
	['club',8,'sha'],
	['club',9,'sha',['thunder','YB_wind']],//应变替换杀--------☆
	['club',10,'sha',['thunder','YB_wind']],//应变替换杀--------☆
	['club',11,'sha'],
	['club',12,'wuxie'],
	['club',13,'wuxie',null,['yingbian_canqu','yingbian_draw']],//应变新增应变

	['diamond',1,'juedou'],
	['diamond',2,'shan',null,['yingbian_kongchao','yingbian_draw']],//应变新增应变
	['diamond',3,'shan'],
	['diamond',4,'shan',null,['yingbian_canqu','yingbian_gain']],//应变新增应变
	['diamond',5,'guanshi'],
	['diamond',6,'sha'],
	['diamond',7,'sha'],
	['diamond',8,'sha',null,['yingbian_canqu','yingbian_hit']],//应变新增应变
	['diamond',9,'sha'],
	['diamond',10,'sha',['fire','YB_wind']],//应变替换杀--------☆
	['diamond',11,'shan'],
	['diamond',12,'tao'],
	['diamond',13,'sha'],

	["spade",2,'hanbing'],//---------☆
	['heart',12,'shandian'],
	//--------------原属标准B牌堆--------------//
	['spade',1,'taigongyinfu'],//应变替换闪电--------☆
	['spade',2,'bagua'],
	['spade',3,'shuiyanqijunx',null,['yingbian_zhuzhan','yingbian_add']],//应变替换顺手--------☆
	['spade',4,'shuiyanqijunx',null,['yingbian_zhuzhan','yingbian_add']],//应变替换顺手--------☆
	['spade',5,'jueying'],
	['spade',6,'lebu'],
	['spade',7,'sha','ice|YB_wind'],//应变替换杀--------☆
	['spade',8,'sha','ice|YB_wind'],//应变替换杀--------☆
	['spade',9,'sha',null,['yingbian_canqu','yingbian_add']],//应变新增应变
	['spade',10,'sha',null,['yingbian_zhuzhan','yingbian_add']],//应变新增应变
	['spade',11,'shunshou'],
	['spade',12,'zhangba'],
	['spade',13,'dawan'],
	
	['heart',1,'wanjian',null,['yingbian_fujia','yingbian_remove']],//应变新增应变
	['heart',2,'shan',null,['yingbian_kongchao','yingbian_draw']],//应变新增应变
	['heart',3,'wugu'],
	['heart',4,'wugu'],
	['heart',5,'chitu'],
	['heart',6,'lebu'],
	['heart',7,'dongzhuxianji'],//应变替换无中--------☆
	['heart',8,'dongzhuxianji'],//应变替换无中--------☆
	['heart',9,'dongzhuxianji'],//应变替换无中--------☆
	['heart',10,'sha','YB_wind'],
	['heart',11,'dongzhuxianji'],//应变替换无中--------☆
	['heart',12,'tao'],
	['heart',13,'zhuahuang'],
	
	['club',1,'zhuge'],
	['club',2,'heiguangkai'],//应变替换八卦--------☆
	['club',3,'sha',null,['yingbian_kongchao','yingbian_add']],//应变新增应变
	['club',4,'sha',null,['yingbian_kongchao','yingbian_add']],//应变新增应变
	['club',5,'dilu'],
	['club',6,'lebu'],
	['club',7,'sha'],
	['club',8,'sha'],
	['club',9,'sha','thunder|YB_wind'],//应变替换杀--------☆
	['club',10,'sha','thunder|YB_wind'],//应变替换杀--------☆
	['club',11,'sha',null,['yingbian_canqu','yingbian_add']],//应变新增应变
	['club',12,'tianjitu'],//应变替换借刀--------☆
	['club',13,'tongque'],//应变替换借刀--------☆
	
	['diamond',1,'zhuge'],
	['diamond',2,'shan',null,['yingbian_kongchao','yingbian_draw']],//应变新增应变
	['diamond',3,'shunshou'],
	['diamond',4,'shunshou'],
	['diamond',5,'shan'],
	['diamond',6,'shan'],
	['diamond',7,'shan'],
	['diamond',8,'shan'],
	['diamond',9,'shan'],
	['diamond',10,'shan'],
	['diamond',11,'shan'],
	['diamond',12,'wutiesuolian'],//应变替换画戟--------☆
	['diamond',13,'zixin'],

	['club',2,'renwang'],
	['diamond',12,'wuxie'],
	//-------------原属军争牌堆--------------//
	['spade',1,'guding'],
	['spade',2,'tengjia'],
	['spade',3,'jiu'],
	['spade',4,'sha','thunder'],
	['spade',5,'sha','thunder'],
	['spade',6,'sha','thunder'],
	['spade',7,'sha','ice|YB_wind'],//应变替换雷杀--------☆
	['spade',8,'sha','ice'],//应变替换雷杀--------☆
	['spade',9,'jiu'],
	['spade',10,'bingliang'],
	['spade',11,'tiesuo'],
	['spade',12,'tiesuo'],
	['spade',13,'wuxie',null,['yingbian_kongchao','yingbian_draw']],//应变新增应变

	['heart',1,'wuxie'],
	['heart',2,'guohe',null,['yingbian_zhuzhan','yingbian_add']],//应变替换火攻--------☆
	['heart',3,'guohe',null,['yingbian_zhuzhan','yingbian_add']],//应变替换火攻--------☆
	['heart',4,'sha','fire'],
	['heart',5,'tao'],
	['heart',6,'tao'],
	['heart',7,'sha','fire'],
	['heart',8,'shan'],
	['heart',9,'shan'],
	['heart',10,'sha','fire',['yingbian_kongchao','yingbian_damage']],//应变新增应变
	['heart',11,'shan'],
	['heart',12,'shan'],
	['heart',13,'wuxie',null,['yingbian_kongchao','yingbian_gain']],//应变新增应变

	['club',1,'huxinjing'],//应变替换狮子--------☆
	['club',2,'tengjia'],
	['club',3,'jiu'],
	['club',4,'bingliang'],
	['club',5,'sha','thunder'],
	['club',6,'sha','thunder'],
	['club',7,'sha','thunder'],
	['club',8,'sha','thunder|YB_wind'],
	['club',9,'jiu'],
	['club',10,'tiesuo'],
	['club',11,'tiesuo'],
	['club',12,'tiesuo'],
	['club',13,'tiesuo'],

	['diamond',1,'wuxinghelingshan'],//应变替换朱雀--------☆
	['diamond',2,'tao'],
	['diamond',3,'tao'],
	['diamond',4,'sha','fire|YB_wind',['yingbian_kongchao','yingbian_damage']],//应变新增应变
	['diamond',5,'sha','fire|YB_wind'],
	['diamond',6,'shan'],
	['diamond',7,'shan'],
	['diamond',8,'shan'],
	['diamond',9,'jiu'],
	['diamond',10,'shan'],
	['diamond',11,'shan'],
	['diamond',12,'chuqibuyi'],//应变替换火攻--------☆
	['diamond',13,'hualiu'],

	['spade',1,'xietianzi'],
	['diamond','12','wushuangfangtianji'],
	//-----------用间牌堆-----------------//
	['spade',1,'guaguliaodu'],
	['spade',2,'qixingbaodao',null,['gifts']],
	['spade',3,'shunshou',null,['gifts']],
	['spade',4,'du',null,['gifts']],
	['spade',5,'du',null,['gifts']],
	['spade',6,'sha','stab'],
	['spade',7,'sha','stab'],
	['spade',8,'sha','stab'],
	['spade',9,'du',null,['gifts']],
	['spade',10,'du',null,['gifts']],
	['spade',11,'wuxie'],
	['spade',12,'chenghuodajie'],
	['spade',13,'chenghuodajie'],
	
	['heart',1,'guaguliaodu'],
	['heart',2,'shan',null,['gifts']],
	['heart',3,'wugu',null,['gifts']],
	['heart',4,'xinge',null,['gifts']],
	['heart',5,'sha','YB_wind',['gifts']],
	['heart',6,'chenghuodajie'],
	['heart',7,'tao'],
	['heart',8,'tao'],
	['heart',9,'serafuku',null,['gifts']],
	['heart',10,'sha',null,['gifts']],
	['heart',11,'sha',null,['gifts']],
	['heart',12,'sha',null,['gifts']],
	['heart',13,'zhanxiang',null,['gifts']],
	
	['club',1,'duanjian',null,['gifts']],
	['club',2,'sha','stab'],
	['club',3,'yinfengyi',null,['gifts']],
	['club',4,'du'],
	['club',5,'yitianjian'],
	['club',6,'sha','stab'],
	['club',7,'sha','stab'],
	['club',8,'sha','stab'],
	['club',9,'sha','stab'],
	['club',10,'sha','stab'],
	['club',11,'wuxie'],
	['club',12,'wuxie'],
	['club',13,'yonglv',null,['gifts']],
	
	['diamond',1,'juedou',null,['gifts']],
	['diamond',2,'shan'],
	['diamond',3,'kaihua',null,['gifts']],
	['diamond',4,'kaihua',null,['gifts']],
	['diamond',5,'shan'],
	['diamond',6,'shan'],
	['diamond',7,'shan'],
	['diamond',8,'shan'],
	['diamond',9,'tuixinzhifu'],
	['diamond',10,'tuixinzhifu'],
	['diamond',11,'tao',null,['gifts']],
	['diamond',12,'shan'],
	['diamond',13,'sha','stab'],

	['spade','2','du',null,['gifts']],//原夜白神略毒包紫电剑格，现调剂至用间牌堆原黑桃A
	['heart',12,'youdishenru'],
	//-----------运筹牌堆---------------//
	//---------------------//
	//-----------------夜白牌堆------------------------//
	//-----------------------------------花----------------------------------//
	//---------------------黑桃
	['spade','1','sha','YB_snow'],//将军披风霸者披风
	['spade','2','hongmianbaihuapao'],
	['spade','3','ybsl_dafeng',null,['yingbian_zhuzhan','yingbian_add']],//达成
	['spade','4','ybsl_dafeng',null,['yingbian_zhuzhan','yingbian_add']],//达成
	// ['spade','5','sha','YB_snow'],//七星刀
	['spade','5','ybsl_qixingdao'],//七星刀
	['spade','6','ybsl_piaoxueruyi'],//随波逐流
	['spade','7','ybsl_zhuzi',null,['yingbian_zhuzhan','yingbian_add']],
	['spade','8','ybsl_zhuzi'],
	['spade','9','ybsl_zhuzi',null,['yingbian_canqu','yingbian_add']],
	['spade','10','ybsl_zhuzi'],
	['spade','11','ybsl_zhuzi',null,['yingbian_fujia','yingbian_add']],
	['spade','12','shuiyanqijunx','thunder',['yingbian_zhuzhan','yingbian_all']],//达成
	['spade','13','ybsl_wusun'],//达成
	//---------------------红桃
	['heart','1','goujiangdesidai'],
	['heart','2','ybsl_mixianshenshu'],//鎏金冠集智冠
	['heart','3','ybsl_qiuxianruoke'],//募兵
	['heart','4','ybsl_dafeng',null,['yingbian_zhuzhan','yingbian_add']],//达成原黑桃2
	// ['heart','5','tao'],//水镜袍
	['heart','5','ybsl_shuijingpao'],//水镜袍
	['heart','6','tao'],//画地为牢
	['heart','7','ybsl_juhua',null,['yingbian_zhuzhan','yingbian_add']],
	['heart','8','ybsl_juhua'],
	['heart','9','ybsl_juhua',null,['yingbian_canqu','yingbian_add']],
	['heart','10','ybsl_juhua'],
	['heart','11','ybsl_juhua',null,['yingbian_fujia','yingbian_add']],//达成
	['heart','12','wuxie',null,['gifts']],//达成
	['heart','13','ybsl_xiji'],//达成
	//---------------------梅花
	['club','1','sha','ice'],//白羽扇清风扇
	['club','2','hongmianbaihuapao'],
	['club',3,'guohe'],//---------☆
	['club','4','wangmeizhike',null,['gifts']],//达成
	['club','5','sha','ice'],//黄钺
	['club','6','wangmeizhike',null,['gifts']],//达成
	['club','7','ybsl_meihua',null,['yingbian_zhuzhan','yingbian_add']],//达成
	['club','8','ybsl_meihua'],//达成
	['club','9','ybsl_meihua',null,['yingbian_canqu','yingbian_add']],//达成
	['club','10','ybsl_meihua'],//达成
	['club','11','ybsl_meihua',null,['yingbian_fujia','yingbian_add']],//达成
	['club','12','wuxie',null,['gifts']],//达成
	['club','13','ybsl_wangzhui'],//达成
	//---------------------方块
	['diamond','1','ybsl_qinglinkui'],//青鳞盔
	['diamond','2','wuxie',null,['gifts']],//达成
	['diamond','3','ybsl_qiuxianruoke'],//募兵
	['diamond','4','du'],//锁子甲七星甲
	['diamond','5','yitianjian',null,['gifts']],//达成
	['diamond','6','sha','YB_blood'],//瘟疫
	['diamond','7','ybsl_lanhua',null,['yingbian_zhuzhan','yingbian_add']],//达成
	['diamond','8','ybsl_lanhua'],//达成
	['diamond','9','ybsl_lanhua',null,['yingbian_canqu','yingbian_add']],//达成
	['diamond','10','ybsl_lanhua'],//达成
	['diamond','11','ybsl_lanhua',null,['yingbian_fujia','yingbian_add']],//达成
	['diamond','12','sha','YB_blood'],//投石车
	['diamond','13','ybsl_benlei'],//达成
	//---------------------EX
	['spade','2','sha','YB_snow'],//之子于归
	['heart','12','ybsl_taoyao'],//桃之夭夭
	//-----------------------------------毒----------------------------------//
	//---------------------黑桃
	['spade','1','ybsl_zidian'],//达成
	['spade','2','linglongshimandai'],
	['spade','3','sha','YB_snow',['yingbian_fujia','yingbian_add']],//达成
	['spade','4','sha','YB_snow',[]],//达成
	['spade','5','ybsl_qingming'],//达成
	['spade','6','ybsl_tututu'],//万钧神弩
	['spade',7,'sha','thunder'],//---------☆
	['spade',8,'sha','thunder'],//---------☆
	['spade',9,'shuiyanqijun'],
	['spade','10','zhujinqiyuan',null,['yingbian_fujia','yingbian_all']],//宴安鸩毒
	['spade','11','sha','YB_snow',[]],//宴安鸩毒
	['spade','12','sha','YB_snow',[]],//观星
	['spade','13','ybsl_disarm','stab',['yingbian_fujia','yingbian_remove']],//铁骑兵锋
	//---------------------红桃[]
	['heart','1','ybsl_meteor','fire',['yingbian_fujia','yingbian_remove']],//流星火矢
	['heart','2','ybsl_mixianshenshu'],//八阵
	['heart',3,'sha','fire'],//---------原逐鹿红桃三火杀
	['heart','4','tao'],//毒桃
	['heart','5','ybsl_baihong'],//达成
	['heart',6,'wangmeizhike'],
	['heart','7','tao'],//达成
	['heart','8','tao'],//达成
	['heart',9,'yuanjiao'],//国战调剂
	['heart','10','guaguliaodu',null,['gifts']],//达成
	['heart',11,'yiyi'],//国战调剂
	['heart','12','du',null,['gifts']],//毒爆
	['heart','13','shan',null,['yingbian_fujia','yingbian_draw']],//达成//-----------原红桃3
	//---------------------梅花
	['club','1','ybsl_liuxing'],//达成
	['club','2','linglongshimandai'],
	['club','3','sha','fire',['yingbian_canqu','yingbian_add']],//达成
	['club','4','sha','fire',['yingbian_canqu','yingbian_add']],//达成
	['club','5','ybsl_bixie'],//达成
	['club','6','ybsl_luolei','thunder',['yingbian_zhuzhan','yingbian_add']],//达成
	['club','7','sha','ice'],//青梅煮酒//----原梅花3
	['club',8,'guohe'],
	['club','9','ybsl_tianhuoduan','fire',['gifts']],
	['club','10','ybsl_luolei','thunder',['yingbian_zhuzhan','yingbian_add']],//达成
	['club','11','sha','ice'],//雷霆万钧
	['club',12,'jiedao'],//---------☆
	['club',13,'jiedao'],//---------☆
	//---------------------方块
	['diamond','1','juedou',null,['yingbian_fujia','yingbian_hit']],//生死决斗
	['diamond','2','shan',null,['yingbian_fujia','yingbian_draw']],//达成----原方块4
	['diamond','3','tao'],//达成
	['diamond',4,'yiyi'],//-------------国战调剂
	['diamond','5','ybsl_baili'],//达成
	['diamond','6','sha','thunder',['yingbian_canqu','yingbian_damage']],//半途而废
	['diamond','7','sha','YB_blood'],//募兵----原方块3
	['diamond','8','shan',null,['yingbian_fujia','yingbian_draw']],//达成
	['diamond','9','sha','YB_blood',['yingbian_zhuzhan','yingbian_lianDa']],//宴安鸩毒
	['diamond','10','ybsl_luolei','thunder',['yingbian_zhuzhan','yingbian_add']],//达成
	['diamond','11','ybsl_mixianshenshu'],//封神登极
	['diamond',12,'sanjian'],
	['diamond','13','sha','thunder',['yingbian_canqu','yingbian_damage']],//百里剑----原方块5
	//---------------------EX
	['club','2','ybsl_yangtuo'],//神兽羊驼
	['diamond','12','ybsl_milu'],//圣诞麋鹿
	//-----------------------------------衡----------------------------------//
	//---------------------黑桃
	['spade','1','ybsl_nodouble'],//无双铠
	['spade','2','longfenghemingjian'],
	['spade',3,'huoshaolianying','fire'],
	['spade','4','jiu',null,['gifts']],//达成
	['spade','5','ybsl_tianhuoduan','fire'],//锁龙偃月刀
	['spade','6','ybsl_tianhuoduan','fire'],//赤血青锋遗址
	['spade','7','sha'],//达成
	['spade','8','sha','YB_snow',['yingbian_fujia','yingbian_lianDa']],//达成原黑桃8
	['spade','9','sha','YB_snow',['yingbian_fujia','yingbian_lianDa']],//达成原黑桃9雪杀
	['spade','10','sha'],//达成
	['spade','11','sha','thunder'],//达成
	['spade','12','ybsl_lvchenqiang'],//达成绿沉枪
	['spade','13','ybsl_zhaoyeyushi'],//达成
	//---------------------红桃
	// ['heart','1','guofengyupao'],//达成国士圣袍
	['heart','1','ybsl_guoshishengpao'],//达成国士圣袍
	['heart','2','tao',null,['yingbian_canqu','yingbian_damage']],//达成问策
	['heart','3','sha','fire',['yingbian_fujia','yingbian_damage']],//达成
	['heart','4','sha','fire',['yingbian_fujia','yingbian_damage']],//达成
	['heart','5','tao'],//原夜白神略毒包白虹剑格
	['heart',6,'huoshan','fire'],
	['heart','7','sadouchengbing'],//达成闪
	['heart','8','sadouchengbing'],//达成闪
	['heart','9','sadouchengbing'],//达成闪
	['heart','10','ybsl_anduchencang',null,[]],//暗度陈仓原黑桃2
	['heart','11','sadouchengbing'],//达成桃
	['heart','12','ybsl_tongguiyujin',null,['yingbian_canqu','yingbian_add']],//达成
	['heart','13','tao'],//伏羲镇魂琴
	//---------------------梅花
	['club','1','ybsl_bainiaochaofeng'],//百鸟朝凤枪
	['club','2','sha','ice'],//知己知彼
	['club',3,'chenhuodajie'],
	['club','4','jiu'],//达成
	['club','5','sha'],//达成
	['club','6','sha'],//达成
	['club',7,'hongshui'],
	['club','8','sha'],//达成
	['club',9,'sha'],//---------☆
	['club',10,'sha'],//---------☆
	['club','11','sha'],
	['club','12','yihuajiemu'],//达成
	['club','13','yihuajiemu'],//乌云踏雪
	//---------------------方块
	['diamond','1','ybsl_fuxizhenhunqin'],//北斗七星扇
	['diamond','2','wuxie'],//达成
	['diamond','3','ybsl_tianhuoduan','fire'],
	['diamond',4,'xietianzi'],//-------------国战调剂
	['diamond','5','sanlve'],//飞景三剑
	['diamond','6','sha','YB_blood',[]],
	['diamond','7','sha','YB_blood',[]],//金银褥铠
	['diamond','8','tao',null,['yingbian_fujia','yingbian_add']],//达成
	['diamond','9','tao',null,['yingbian_fujia','yingbian_add']],//达成
	['diamond','10','sha','fire'],//达成
	['diamond','11','sha'],//达成
	['diamond','12','ybsl_tianhuoduan','fire',['gifts']],
	['diamond','13','ybsl_yulanbailongju'],//达成
	//---------------------EX
	//
	['spade',2,'suijiyingbian'],//应变替换寒冰剑--------☆
	['heart','12','ybsl_zhiziyugui'],//凤求凰-----夜白神略
	//---------------------------------------------EX------------------------------------------------//
	
	//-----------逐鹿-----------//

	['spade',1,'shandian'],//---------☆
	["spade",2,'lanyinjia'],
	['spade',3,'caochuan'],
	['spade',4,'sha','thunder'],
	['spade',5,'wufengjian'],
	['spade',6,'caochuan'],
	['spade',7,'zengbin'],//
	['spade',8,'sha'],
	['spade',9,'shengdong'],
	['spade',10,'yexingyi'],
	['spade',11,'sha'],
	["spade",12,'guohe'],
	['spade',13,'guohe'],
	
	['heart',1,'lianjunshengyan_gai'],
	['heart',2,'huogong',null,['yingbian_zhuzhan','yingbian_lianDa']],//---------☆
	['heart',3,'huogong',null,['yingbian_kongchao','yingbian_draw']],//---------☆
	['heart',4,'shan'],
	['heart',5,'numa'],
	['heart',6,'tao'],
	['heart','7','ybsl_tianhuoduan','fire',['gifts']],//
	['heart',8,'shan'],
	['heart',9,'kaihua'],
	['heart',10,'nvzhuang'],
	['heart',11,'kaihua'],
	['heart',12,'shengdong'],
	['heart',13,'shuiyanqijunx'],//---------国战调剂
	
	['club',1,'baiyin'],//---------☆
	['club',2,'bagua'],//---------☆
	['club',3,'jiejia'],
	['club',4,'sha','thunder'],
	['club',5,'zheji'],
	['club',6,'jiu'],
	['club','7','sha','YB_blood',['yingbian_canqu','yingbian_add']],//达成毒杀
	['club',8,'jiu'],
	['club',9,'zhulu_card'],
	['club',10,'jinhe'],
	['club',11,'sha'],
	["club",12,'jinchan'],
	["club",13,'jinchan'],
	
	['diamond',1,'zhuque'],//---------☆
	['diamond','2','sha'],//火计
	['diamond',3,'jiejia'],
	['diamond',4,'shan'],
	['diamond',5,'yajiaoqiang'],
	['diamond',6,'sha'],
	['diamond','7','shan',null,['yingbian_fujia','yingbian_draw']],//达成
	['diamond',8,'shan'],
	['diamond',9,'kaihua'],
	['diamond',10,'yinfengjia'],
	['diamond',11,'sha'],
	['diamond',12,'huogong',null,['yingbian_fujia','yingbian_add']],//---------☆
	['diamond','13','sha','YB_blood',[]],//毒杀

	['club',12,'shuiyanqijunx'],//-----------国战调剂
	["diamond",3,'guohe'],
	//--------------多余牌堆的调度与整合-------------//
	//-----------------多余1----------------//
	['spade',1,'fudichouxin'],
	['spade',2,'diaobingqianjiang'],
	['spade',3,'shunshou'],//---------☆
	['spade',4,'shunshou'],//---------☆
	["spade",5,'zhungangshuo'],
	['spade',6,'geanguanhuo'],
	['spade',7,'caochuanjiejian'],
	['spade',8,'sha',],//---------☆
	['spade',9,'youdishenru'],
	['spade','10','ybsl_tianhuoduan','fire'],//达成看破原梅花Q
	["spade",11,'jinchan'],
	['spade',12,'guohe'],//---------☆
	['spade','13','shanrangzhaoshu'],

	['heart',1,'geanguanhuo'],
	['heart',2,'wuxie'],
	['heart',3,'jingfanma'],
	['heart',4,'shezhanqunru'],
	['heart','5','tao'],//募兵原红桃3
	['heart',6,'zengbin'],
	['heart',7,'wuzhong'],//---------☆
	['heart',8,'wuzhong'],//---------☆
	['heart',9,'wuzhong'],//---------☆

	['heart',11,'wuzhong'],//---------☆
	['heart',12,'huoshaolianying','fire'],
	['heart','13','shan'],//达成

	['club',1,'wangmeizhike'],
	['club',2,'youdishenru'],
	['club',3,'caochuanjiejian'],
	['club',4,'guohe'],//---------☆
	['club','5','sha'],//辟邪剑
	['club',6,'fudichouxin'],
	['club',7,'shuiyanqijun'],
	['club',8,'shuiyanqijun'],
	['club',9,'shengdong'],
	['club',10,'toulianghuanzhu'],
	['club',11,'huoshaolianying','fire'],
	['club','12','lingsheji'],
	['club',13,'suolianjia'],

	['diamond',1,'xietianzi'],
	['diamond','2','sha',null,['gifts']],//达成原梅花8草船
	// ['diamond','3','guofengyupao'],
	['diamond','3','ybsl_guoshishengpao'],//达成国士圣袍
	['diamond',4,'zengbin'],
	['diamond','5','sha'],
	['diamond',6,'chenhuodajie'],
	['diamond','7','sha'],//流星剑原梅花A冰杀
	['diamond','8','ybsl_mixianshenshu'],//达成空城原方块Q米线
	['diamond',9,'chenhuodajie'],
	['diamond',10,'sha'],//---------☆
	['diamond','11','ybsl_tianhuoduan','fire'],//原方块4天火煅
	['diamond',12,'yinyueqiang'],
	['diamond','13','niaobaidaowenha'],

	['club','2','zhaogujing'],
	['diamond','12','qicaishenlu'],
	//-----------------多余2----------------//
	["spade",1,'fulei'],
	['spade',2,'baiyin'],
	['spade',3,'guohe'],//---------☆
	["spade",4,'shunshou'],
	['spade','5','guilongzhanyuedao',],
	["spade",6,'qibaodao'],
	['spade',7,'sha'],//---------☆
	['spade',8,'sha'],//---------☆
	['spade',9,'sha'],
	['spade',10,'caomu'],//原黑桃A
	["spade",11,'wuxie'],
	['spade','12','sha','YB_snow',['yingbian_fujia','yingbian_add']],//达成原黑桃7雪杀
	['spade','13','shenzhixiunvfu'],

	['heart','1','lianjunshengyan_gai'],
	['heart','2','sha'],//达成杀原红桃6
	['heart','3','lianjunshengyan_gai'],
	['heart','4','lianjunshengyan_gai'],
	['heart','5','jinwuluorigong'],
	['heart','6','yanxiao_card'],//言笑原红桃6
	['heart','7','sha'],//达成原黑桃6
	['heart','8','shan'],//青梅煮酒原梅花2冰杀
	['heart',9,'toulianghuanzhu'],
	['heart','10','jiu',null,['gifts']],//达成原黑桃3
	['heart','11','jiu'],//达成原梅花3
	['heart','12','ybsl_qisihuisheng'],//原方块Q
	['heart','13','tao'],//兵临城下原红桃4

	['club','1','tiesuo',null,['gifts']],//铁索拦江原梅花K
	["club",2,'lanyinjia'],
	['club',3,'caomu'],
	['club','4','sha','YB_snow',[]],//青冥剑原黑桃5
	// ['club','5','gubuzifeng'],
	['club','5','sha'],
	['club','6','sha','YB_snow',[]],//七星龙渊剑原黑桃2
	['club','7','ybsl_tianhuoduan','fire'],//风神盾
	['club',8,'shezhanqunru'],
	['club',9,'sha'],//---------☆
	['club',10,'sha'],//---------☆
	['club','11','sha'],//达成原梅花10
	["club",12,'qijia'],
	["club",13,'qijia'],

	['diamond',1,'diaobingqianjiang'],
	['diamond','2','sha','fire'],//烈焰赤兔原红桃5
	['diamond','3','sha','thunder'],//达成原梅花9
	['diamond',4,'fudichouxin'],
	['diamond',5,'muniu'],
	['diamond','6','shufazijinguan'],//原方片5
	['diamond','7','sha'],
	// ['diamond','7','gubuzifeng'],
	['diamond','8','sha'],//达成原黑桃8
	['diamond','9','sha'],//达成原黑桃9
	['diamond',10,'wuxie'],
	['diamond','11','shan'],//达成原红桃10
	['diamond',12,'fangtian'],//---------☆
	['diamond','13','xuwangzhimian'],//-------原方块4


	['club',2,'jiu'],
	['diamond','12','xiuluolianyuji'],
	
	// ['club',1,'yuxi'],
	['club',3,'ybsl_zhijizhibi'],
	['club',4,'ybsl_zhijizhibi'],
	// ['diamond',6,'wuliu'],
	// ['club',3,'chiling'],
	// ['spade',12,'lulitongxin'],
	// ['club',10,'lulitongxin'],

	// ['spade',5,'xiaolicangdao'],
	// ['diamond',11,'xiaolicangdao'],

	['spade','2','du',null,['gifts']],//宴安鸩毒
	['spade','3','ybsl_duboom'],
	['spade','4','ybsl_duboom'],
	['spade','6','ybsl_tianhuoduan','fire'],
	['spade','8','ybsl_tianhuoduan','fire',['gifts']],

	['heart','1','llfx_shanfengdianhuo'],
	['heart','2','ybsl_kaicangzhenliang'],
	['heart','3','llfx_shanfengdianhuo'],
	['heart','7','ybsl_tianhuoduan','fire'],
	['heart','10','ybsl_hsbwp','fire',['yingbian_zhuzhan','yingbian_all']],
	['heart','11','ybsl_hsbwp','fire',['yingbian_zhuzhan','yingbian_all']],
	['heart','13','ybsl_hsbwp','fire',['yingbian_zhuzhan','yingbian_all']],

	['club','2','du'],//青囊
	['club','3','ybsl_duboom'],
	['club','4','ybsl_duboom'],
	['club','9','ybsl_tianhuoduan','fire'],

	['diamond','12','ybsl_tianhuoduan','fire'],

	['heart','10','ybsl_tang',null,['yingbian_zhuzhan','yingbian_add']],
	['heart','11','ybsl_tang',null,['yingbian_zhuzhan','yingbian_add']],
	['heart','13','ybsl_tang',null,['yingbian_zhuzhan','yingbian_add']],
	['diamond','1','ybsl_tang'],
	['diamond','2','ybsl_tang'],
	['diamond','3','ybsl_tang'],

	['spade','1','ybsl_cu'],
	['spade','2','ybsl_cu'],
	['spade','3','ybsl_cu'],
	['spade','4','ybsl_cu'],
	['spade','11','ybsl_cu'],
	['spade','13','ybsl_cu'],
	//ybsl_tang
	// ['heart','13','ybsl_hsbwp','fire',['yingbian_zhuzhan','yingbian_all']],
	// ['heart','13','ybsl_hsbwp','fire',['yingbian_zhuzhan','yingbian_all']],
	// ['heart','13','ybsl_hsbwp','fire',['yingbian_zhuzhan','yingbian_all']],
	// ['heart','13','ybsl_hsbwp','fire',['yingbian_zhuzhan','yingbian_all']],
	// ['heart','13','ybsl_hsbwp','fire',['yingbian_zhuzhan','yingbian_all']],
	// ['heart','13','ybsl_hsbwp','fire',['yingbian_fujia','yingbian_all']],
	// ['heart','13','ybsl_hsbwp','fire',['yingbian_fujia','yingbian_all']],
	// ['heart','13','ybsl_hsbwp','fire',['yingbian_fujia','yingbian_all']],
	// ['heart','13','ybsl_hsbwp','fire',['yingbian_fujia','yingbian_all']],
	// ['heart','13','ybsl_hsbwp','fire',['yingbian_fujia','yingbian_all']],

	//['spade','5','juechenjinge_gai'],

	// ['heart','12','sha','YB_blood',[]],//起死回生原方块Q
	// ['club',2,'huxinjing'],
	// ['diamond','3','qicaishenlu'],
	// ['club','13','yihuajiemu'],
	// ['club','12','yihuajiemu'],
	// ['heart','7','sadouchengbing'],
	// ['heart','8','sadouchengbing'],
	// ['heart','9','sadouchengbing'],
	// ['heart','11','sadouchengbing'],
	// ['heart','1','jiejia'],//达成
	// ['club','9','caochuan',null,['gifts']],//达成
	//-----------------------风包
	['spade', 1, 'ybsl_feijingsanjian'],
	['spade', 2, 'ybsl_zhongkai'],
	['spade', 3, 'sha','YB_wind|thunder'],
	['spade', 4, 'shunshou'],
	['spade', 5, 'shuiyanqijunx'],
	['spade', 6, 'sha','thunder|YB_wind'],
	['spade', 7, 'sha','thunder|YB_wind'],
	['spade', 8, 'sha','YB_wind|thunder',['yingbian_fujia','yingbian_add']],
	['spade', 9, 'sha','YB_wind|thunder',['yingbian_fujia','yingbian_add']],
	['spade', 10, 'tiesuo'],
	['spade', 11, 'wuxie'],
	['spade', 12, 'ybsl_frostnova','ice',['yingbian_fujia','yingbian_luLi']],
	['spade', 13, 'ybsl_frostnova','ice',['yingbian_fujia','yingbian_luLi']],

	['heart', 1, 'ybsl_windstorm','YB_wind',['yingbian_fujia','yingbian_luLi']],
	['heart', 2, 'sha','YB_wind'],
	['heart', 3, 'shan'],
	['heart', 4, 'shan'],
	['heart', 5, 'tao'],
	['heart', 6, 'sha','YB_wind'],
	['heart', 7, 'shan'],
	['heart', 8, 'shan'],
	['heart', 9, 'shan'],
	['heart', 10, 'sha','YB_wind'],
	['heart', 11, 'sha','YB_wind'],
	['heart', 12, 'tao'],
	['heart', 13, 'wuxie'],

	['club', 1, 'ybsl_qingfengshan'],
	['club', 2, 'ybsl_zhijizhibi'],
	['club', 3, 'ybsl_zhijizhibi'],
	['club', 4, 'jiu'],
	['club', 5, 'sha','YB_wind|ice'],
	['club', 6, 'tiesuo'],
	['club', 7, 'tiesuo'],
	['club', 8, 'sha','YB_wind|ice'],
	['club', 9, 'sha','YB_wind|ice',['yingbian_zhuzhan','yingbian_add']],
	['club', 10, 'jiu'],
	['club', 11, 'tiesuo'],
	['club', 12, 'tiesuo',null,['yingbian_fujia','yingbian_add']],
	['club', 13, 'tiesuo',null,['yingbian_fujia','yingbian_add']],

	['diamond', 1, 'ybsl_windstorm'],
	['diamond', 2, 'shan'],
	['diamond', 3, 'sha','YB_wind|fire',['yingbian_canqu','yingbian_add']],
	['diamond', 4, 'sha','fire|YB_wind'],
	['diamond', 5, 'ybsl_jinyinrukai'],
	['diamond', 6, 'sha','YB_wind|fire'],
	['diamond', 7, 'shan'],
	['diamond', 8, 'shan'],
	['diamond', 9, 'jiu'],
	['diamond', 10, 'tao'],
	['diamond', 11, 'shan'],
	['diamond', 12, 'sha','YB_wind|fire'],
	['diamond', 13, 'ybsl_jizhiguan'],
];