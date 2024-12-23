import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { list }

const list = [
	//-----------------------------------花----------------------------------//
	//---------------------黑桃
	['spade','1','sha','YB_snow'],//将军披风霸者披风
	['spade','2','ybsl_dafeng',null,['yingbian_zhuzhan','yingbian_add']],//达成
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
	['heart','1','jiejia'],//达成
	['heart','2','ybsl_mixianshenshu'],//鎏金冠集智冠
	// ['heart','3','tao'],//募兵
	['heart','3','ybsl_qiuxianruoke'],//募兵
	['heart','4','tao'],//兵临城下
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
	['club','2','sha','ice'],//青梅煮酒
	['club','3','sha','ice'],//青梅煮酒
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
	// ['diamond','3','sha','YB_blood'],//募兵
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
	// ['spade','1','du',null,['gifts']],//紫电剑
	['spade','1','ybsl_zidian'],//达成
	['spade','2','du',null,['gifts']],//宴安鸩毒
	['spade','3','sha','YB_snow',['yingbian_fujia','yingbian_add']],//达成
	['spade','4','sha','YB_snow',[]],//达成
	// ['spade','5','sha','YB_snow',[]],//青冥剑
	['spade','5','ybsl_qingming'],//达成
	['spade','6','ybsl_tututu'],//万钧神弩
	['spade','7','sha','YB_snow',['yingbian_fujia','yingbian_add']],//达成
	['spade','8','sha','YB_snow',['yingbian_fujia','yingbian_lianDa']],//达成
	['spade','9','sha','YB_snow',['yingbian_fujia','yingbian_lianDa']],//达成
	['spade','10','zhujinqiyuan',null,['yingbian_fujia','yingbian_all']],//宴安鸩毒
	['spade','11','sha','YB_snow',[]],//宴安鸩毒
	['spade','12','sha','YB_snow',[]],//观星
	['spade','13','ybsl_disarm','stab',['yingbian_fujia','yingbian_remove']],//铁骑兵锋
	//---------------------红桃[]
	['heart','1','ybsl_meteor','fire',['yingbian_fujia','yingbian_remove']],//流星火矢
	['heart','2','ybsl_mixianshenshu'],//八阵
	['heart','3','shan',null,['yingbian_fujia','yingbian_draw']],//达成
	['heart','4','tao'],//毒桃
	// ['heart','5','tao'],//白虹剑
	['heart','5','ybsl_baihong'],//达成
	['heart','6','yanxiao_card'],//言笑
	['heart','7','tao'],//达成
	['heart','8','tao'],//达成
	['heart','9','guaguliaodu',null,['gifts']],//达成
	['heart','10','guaguliaodu',null,['gifts']],//达成
	['heart','11','guaguliaodu',null,['gifts']],//达成
	['heart','12','du',null,['gifts']],//毒爆
	['heart','13','shan'],//达成
	//---------------------梅花
	// ['club','1','sha','ice'],//流星剑
	['club','1','ybsl_liuxing'],//达成
	['club','2','du'],//青囊
	['club','3','sha','fire',['yingbian_canqu','yingbian_add']],//达成
	['club','4','sha','fire',['yingbian_canqu','yingbian_add']],//达成
	// ['club','5','sha'],//辟邪剑
	['club','5','ybsl_bixie'],//达成
	['club','6','ybsl_luolei','thunder',['yingbian_zhuzhan','yingbian_add']],//达成
	['club','7','sha','YB_blood',['yingbian_canqu','yingbian_add']],//达成毒杀
	['club','8','caochuan',null,['gifts']],//达成
	['club','9','caochuan',null,['gifts']],//达成
	['club','10','ybsl_luolei','thunder',['yingbian_zhuzhan','yingbian_add']],//达成
	['club','11','sha','ice'],//雷霆万钧
	['club','12','ybsl_tianhuoduan','fire'],//达成看破
	['club','13','tiesuo',null,['gifts']],//铁索拦江
	//---------------------方块
	['diamond','1','juedou',null,['yingbian_fujia','yingbian_hit']],//生死决斗
	['diamond','2','huogong',null,['yingbian_kongchao','yingbian_draw']],//火计
	['diamond','3','tao'],//达成
	['diamond','4','shan',null,['yingbian_fujia','yingbian_draw']],//达成
	// ['diamond','5','sha','thunder',['yingbian_canqu','yingbian_damage']],//百里剑
	['diamond','5','ybsl_baili'],//达成
	['diamond','6','sha','thunder',['yingbian_canqu','yingbian_damage']],//半途而废
	['diamond','7','shan',null,['yingbian_fujia','yingbian_draw']],//达成
	['diamond','8','shan',null,['yingbian_fujia','yingbian_draw']],//达成
	['diamond','9','sha','YB_blood',['yingbian_zhuzhan','yingbian_lianDa']],//宴安鸩毒
	['diamond','10','ybsl_luolei','thunder',['yingbian_zhuzhan','yingbian_add']],//达成
	['diamond','11','ybsl_mixianshenshu'],//封神登极
	['diamond','12','ybsl_mixianshenshu'],//达成空城
	['diamond','13','sha','YB_blood',[]],//毒杀
	//---------------------EX
	['club','2','ybsl_yangtuo'],//神兽羊驼
	['diamond','12','ybsl_milu'],//圣诞麋鹿
	//-----------------------------------衡----------------------------------//
	//---------------------黑桃
	['spade','1','ybsl_nodouble'],//无双铠原雪杀
	['spade','2','ybsl_anduchencang',null,[]],//暗度陈仓
	['spade','3','jiu',null,['gifts']],//达成
	['spade','4','jiu',null,['gifts']],//达成
	['spade','5','ybsl_tianhuoduan','fire'],//锁龙偃月刀
	['spade','6','sha'],//达成
	['spade','7','sha'],//达成
	['spade','8','sha'],//达成
	['spade','9','sha'],//达成
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
	['heart','5','huogong',null,['yingbian_fujia','yingbian_add']],//烈焰赤兔
	['heart','6','huogong',null,['yingbian_zhuzhan','yingbian_lianDa']],//达成杀
	['heart','7','sadouchengbing'],//达成闪
	['heart','8','sadouchengbing'],//达成闪
	['heart','9','sadouchengbing'],//达成闪
	['heart','10','shan'],//达成
	['heart','11','sadouchengbing'],//达成桃
	['heart','12','ybsl_tongguiyujin',null,['yingbian_canqu','yingbian_add']],//达成
	['heart','13','tao'],//伏羲镇魂琴
	//---------------------梅花
	// ['club','1','sha','ice'],//百鸟朝凤枪
	['club','1','ybsl_bainiaochaofeng'],//百鸟朝凤枪
	// ['club','2','sha','ice'],//知己知彼
	['club','2','ybsl_zhijizhibi'],//
	['club','3','jiu'],//达成
	['club','4','jiu'],//达成
	['club','5','sha'],//达成
	['club','6','sha'],//达成
	['club','7','ybsl_tianhuoduan','fire'],//风神盾
	['club','8','sha'],//达成
	['club','9','sha','thunder'],//达成
	['club','10','sha'],//达成
	['club','11','sha','ice'],
	['club','12','yihuajiemu'],//达成
	['club','13','yihuajiemu'],//乌云踏雪
	//---------------------方块
	['diamond','1','ybsl_fuxizhenhunqin'],//北斗七星扇伏羲镇魂琴
	['diamond','2','wuxie'],//达成
	['diamond','3','ybsl_tianhuoduan','fire'],
	['diamond','4','ybsl_tianhuoduan','fire'],
	['diamond','5','sanlve'],//飞景三剑
	['diamond','6','sha','YB_blood',[]],
	['diamond','7','sha','YB_blood',[]],//金银褥铠
	['diamond','8','tao',null,['yingbian_fujia','yingbian_add']],//达成
	['diamond','9','tao',null,['yingbian_fujia','yingbian_add']],//达成
	['diamond','10','sha','fire'],//达成
	['diamond','11','sha'],//达成
	// ['diamond','12','sha','YB_blood',[]],//起死回生
	['diamond','12','ybsl_qisihuisheng'],
	['diamond','13','ybsl_yulanbailongju'],//达成
	//---------------------EX
	['spade','2','sha','YB_snow',[]],//七星龙渊剑
	['heart','12','ybsl_zhiziyugui'],//凤求凰之子于归
	//
	['club','2','zhaogujing'],
	['diamond','12','qicaishenlu'],
	//---------------------------------------------EX------------------------------------------------//
	['spade','2','ybsl_tianhuoduan','fire'],
	['heart','12','ybsl_tianhuoduan','fire'],
	['heart','2','ybsl_kaicangzhenliang'],
	['spade','2','ybsl_tianhuoduan','fire',['gifts']],
	['heart','12','ybsl_tianhuoduan','fire',['gifts']],
	['club','2','ybsl_tianhuoduan','fire',['gifts']],
	['diamond','12','ybsl_tianhuoduan','fire',['gifts']],
	['club','2','ybsl_tianhuoduan','fire'],
	['diamond','12','ybsl_tianhuoduan','fire'],
	['heart','1','llfx_shanfengdianhuo'],//煽风点火
	['heart','2','llfx_shanfengdianhuo'],
	['heart','13','ybsl_hsbwp'],
	['club','2','ybsl_duboom'],
	//---------收尾
]