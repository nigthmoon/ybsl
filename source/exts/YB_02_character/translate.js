import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {translate}

const translate = {  
	'ybsl_sixp':'<font color=cyan>六艺篇</font>',
	'ybsl_sixp_info':'六艺：出牌阶段限一次，你可以将一张手牌置入你的六艺区（若你拥有其它六艺技，则改为至多三张）然后若六艺数大于二，则获得〖精艺〗直到下回合开始。你可以将你六艺区的牌如手牌般使用或打出。六艺区的牌数至多为六，无法溢出。<br>精艺：锁定技，当你六艺区失去一张牌时，你摸一张牌。<br>六艺包，连作者都懒得维护了……作者最大烂活',
	
	'ybart_013yinji':'六艺尹姬',//本名尹超跃
	'ybart_014liutianyu':'六艺夜白',//本名
	'ybart_016manchengqi':'六艺满城柒',//本名
	'ybart_017xiaohong':'六艺涂山小红',//本名
	'ybart_041mmuqin':'六艺慕琴',//本名崔妍
	'ybart_013yinji_prefix':'六艺',//本名尹超跃
	'ybart_014liutianyu_prefix':'六艺',//本名
	'ybart_016manchengqi_prefix':'六艺',//本名
	'ybart_017xiaohong_prefix':'六艺',//本名
	'ybart_041mmuqin_prefix':'六艺',//本名崔妍
	
	// 'ybart_013yinji_ab':'尹姬',//本名尹超跃
	// 'ybart_014liutianyu_ab':'夜白',//本名
	// 'ybart_016manchengqi_ab':'满城柒',//本名
	// 'ybart_017xiaohong_ab':'涂山小红',//本名
	// 'ybart_041mmuqin_ab':'慕琴',//本名崔妍
	//---------------------六艺篇
	'_ybsl_sixart':'六艺',
	'_ybsl_sixart_info':'出牌阶段限一次，你可以将一张手牌置入你的六艺区（若你拥有其它六艺技，则改为至多三张）然后若六艺数大于二，则获得〖精艺〗直到下回合开始。你可以将你六艺区的牌如手牌般使用或打出。六艺区的牌数至多为六，无法溢出。',
	'_ybsl_sixart2':'六艺',
	'ybsl_master':'精艺',
	'ybsl_master_info':'锁定技，当你六艺区失去一张牌时，你摸一张牌。',
	'yb013_shanwu':'善舞',
	'yb013_shanwu_info':'六艺技，你可以将六艺区的一张牌当作【杀】或【闪】使用或打出。',
	'yb016_shanwu':'善舞',
	'yb016_shanwu_info':'六艺技，你可以将六艺区的一张牌当作【杀】或【闪】使用或打出。',
	'yb017_shanwu':'善舞',
	'yb017_shanwu_info':'六艺技，你可以将六艺区的一张牌当作【杀】或【闪】使用或打出。',
	'yb041_sange':'散歌',
	'yb041_sange_info':'六艺技，结束阶段，你可以弃置六艺区所有牌，根据所弃牌数，依次执行前等量项：<br>1，摸一张牌，<br>2，回复一点体力，<br>3，增加一点体力上限，<br>4，指定至多三名其他角色，依次弃置其各一张牌，<br>5，无，<br>6，令一名其他角色获得所有以此法弃置的牌。（包括以此法弃置的六艺牌以及因第4项弃置的牌）',
	'yb041_juxin':'聚心',
	'yb041_juxin_info':'出牌阶段限一次，你可以弃置任意张手牌并选择等量其他角色，你将这些角色各一张牌充入六艺区，然后若六艺数大于二，则获得〖精艺〗直到下回合开始。。',
	'yb017_luming':'鹿鸣',
	'yb017_luming_info':'出牌阶段每种花色限一次，你可以将一张手牌当作【鹿鸣千转】使用。若你击杀了其他角色，则重置花色次数。',
	'yb017_zhengxiong':'征雄',
	'yb017_zhengxiong_info':'每回合对每名男性角色限一次，当你对其造成伤害后，你可以摸两张牌。若此时你六艺区有空位，你需将一张手牌置入六艺区。',
	'ybsl_shangie':'善歌',
	'ybsl_shangie_info':'六艺技，当你使用一张牌时，你可弃置一张六艺牌，若此时六艺区没有与此牌同花色的牌，你摸两张牌，否则你摸一张牌。',
	'ybsl_duilian':'对联',
	'ybsl_duilian_info':'六艺技，你可以将六艺区的一张牌当作任意智囊使用。',
	'ybsl_shisong':'识诵',
	'ybsl_shisong_info':'六艺技，锁定技，你使用的六艺牌视为拥有全部的应变效果。',
	'yb014_shifu':'诗赋',
	'yb014_shifu4':'诗赋',
	'yb014_shifu5':'诗赋',
	'yb014_shifu_backup':'诗赋',
	'yb014_shifu_info':'六艺技，每种牌名限一次，你可以将一张六艺牌当作任意普通锦囊牌使用。',
	'yb014_shifu2':'诗篇',
	'yb014_shifu2_info':'使用非虚拟及转化牌，经验+13，否则经验+7；受到伤害后，经验+11；回合开始时，经验+6。',
	'yb014_huanlei':'还酹',
	'yb014_huanlei_info':'限定技，出牌阶段，当你诗赋使用过的牌名大于3时可用，你可以令系统在[月之盈亏，蜃之万相，雷之灾覆，风之自在，火之无措]中进行次数为X的随机抽取，X为你诗赋用过的牌名数。你从抽取的列表中选择一个作为主流派，然后你可以再选择一个作为副流派（与主流派相同则加快主流派的升级速度）。<br>月之盈亏（抽取权重1）<br>①决堰（陆抗）<br>②伪伤（key宫泽谦吾）<br>③游凤（key凤千早）<br>④止啼（手杀神张辽）<br>⑤浮萍（夏侯令女）<br>⑥均步（key凤咲夜）/烈武（key凤千早）<br>⑦弥笃（胡昭）<br>⑧贤望（胡昭）/奋锐（霍峻）<br>蜃之万相（抽取权重2）<br>①武圣（界关羽）+倾国（界甄姬）<br>②龙胆（界赵云）<br>③善断+义烈（ol周处）<br>④急救（华佗）+连环（界庞统）<br>⑤火计+看破（手杀卧龙）<br>⑥矫诏+殚心（界郭皇后）<br>⑦龙魂（神赵云）<br>⑧双掣（key三枝二木）<br>雷之灾覆（抽取权重2）<br>①符咒（DIY张宁）<br>②鬼道（DIY张宁）<br>③太平（DIY张宁）<br>④筹策（戏志才）<br>⑤屯田（ol界邓艾）<br>⑥暴球（key枣铃）<br>⑦八阵（卧龙）<br>⑧吉境（王荣）<br>风之自在（抽取权重1）<br>①制衡（界孙权）<br>②法箓+真仪（张琪瑛）<br>③会输（全不会解）<br>④易输（全不会解）<br>⑤点化（张琪瑛）<br>⑥淑武（key七濑留美）<br>⑦苦肉（黄盖）/募兵（SP张辽已觉醒）<br>⑧敏思（王荣）/巧思（马均）<br>火之无措（抽取权重4）<br>①锋略（荀谌）<br>②天义（太史慈）+探虎（星SP吕蒙）<br>③烈刃（手杀祝融）<br>④专对（秦宓）<br>⑤明伐（手杀羊祜）+大喝（星SP张飞）<br>⑥酣战（界太史慈）/天辩（秦宓）<br>⑦咆哮（界张飞）/陷阵（界高顺）<br>⑧除害（周处）',
	'ybmyx_moon':'月之盈亏',
	'ybmyx_moon_info':'①决堰（陆抗）<br>②伪伤（key宫泽谦吾）<br>③游凤（key凤千早）<br>④止啼（手杀神张辽）<br>⑤浮萍（夏侯令女）<br>⑥均步（key凤咲夜）/烈武（key凤千早）<br>⑦弥笃（胡昭）<br>⑧贤望（胡昭）/奋锐（霍峻）',
	'ybmyx_moon_sec_info':'①决堰（陆抗）<br>②伪伤（key宫泽谦吾）<br>③游凤（key凤千早）<br>④止啼（手杀神张辽）<br>⑤浮萍（夏侯令女）',
	'ybmyx_clam':'蜃之万相',
	'ybmyx_clam_info':'①武圣（界关羽）+倾国（界甄姬）<br>②龙胆（界赵云）<br>③善断+义烈（ol周处）<br>④急救（华佗）+连环（界庞统）<br>⑤火计+看破（手杀卧龙）<br>⑥矫诏+殚心（界郭皇后）<br>⑦龙魂（神赵云）<br>⑧双掣（key三枝二木）',
	'ybmyx_clam_sec_info':'①武圣（界关羽）+倾国（界甄姬）<br>②龙胆（界赵云）<br>③善断+义烈（ol周处）<br>④急救（华佗）+连环（界庞统）<br>⑤火计+看破（手杀卧龙）',
	'ybmyx_lightning':'雷之灾覆',
	'ybmyx_lightning_info':'①符咒（DIY张宁）<br>②鬼道（DIY张宁）<br>③太平（DIY张宁）<br>④筹策（戏志才）<br>⑤屯田（ol界邓艾）<br>⑥暴球（key枣铃）<br>⑦八阵（卧龙）<br>⑧吉境（王荣）',
	'ybmyx_lightning_sec_info':'①符咒（DIY张宁）<br>②鬼道（DIY张宁）<br>③太平（DIY张宁）<br>④筹策（戏志才）<br>⑤屯田（ol界邓艾）',
	'ybmyx_wind':'风之自在',
	'ybmyx_wind_info':'①制衡（界孙权）<br>②法箓+真仪（张琪瑛）<br>③会输（全不会解）<br>④易输（全不会解）<br>⑤点化（张琪瑛）<br>⑥淑武（key七濑留美）<br>⑦苦肉（黄盖）/募兵（SP张辽已觉醒）<br>⑧敏思（王荣）/巧思（马均）',
	'ybmyx_wind_sec_info':'①制衡（界孙权）<br>②法箓+真仪（张琪瑛）<br>③会输（全不会解）<br>④易输（全不会解）<br>⑤点化（张琪瑛）',
	'ybmyx_flame':'火之无措',
	'ybmyx_flame_info':'①锋略（荀谌）<br>②天义（太史慈）+探虎（星SP吕蒙）<br>③烈刃（手杀祝融）<br>④专对（秦宓）<br>⑤明伐（手杀羊祜）+大喝（星SP张飞）<br>⑥酣战（界太史慈）/天辩（秦宓）<br>⑦咆哮（界张飞）/陷阵（界高顺）<br>⑧除害（周处）',
	'ybmyx_flame_sec_info':'①锋略（荀谌）<br>②天义（太史慈）+探虎（星SP吕蒙）<br>③烈刃（手杀祝融）<br>④专对（秦宓）<br>⑤明伐（手杀羊祜）+大喝（星SP张飞）',
	'ybsl_moon':'月相',
	'ybsl_clam':'蜃景',
	'ybsl_lightning':'雷罚',
	'ybsl_wind':'风移',
	'ybsl_flame':'焰毁',
}