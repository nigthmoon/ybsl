import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {translate}

const translate = {
	
	sgskjdbzjms:'三国杀，开局大宝直接秒杀',
	sgskjdbzjms_info:'三国杀，开局大宝直接秒杀<br>平台：番茄小说<br>作者：糊涂小笨蛋',

	sgskjdbzjms_mo_zhoutai:'魔周泰',
	sgskjdbzjms_mo_zhoutai_prefix:'魔',
	sgskjdbzjms_tiequ:'铁躯',
	sgskjdbzjms_tiequ_info:'锁定技，你受到的属性伤害-1；你每受到一次伤害，便获得一个“淬炼”标记。',
	sgskjdbzjms_xieren:'卸刃',
	sgskjdbzjms_xieren_info:'当你对其他角色造成伤害，或当你受到其他角色造成的伤害时，你可以弃置其一张牌。',
	sgskjdbzjms_cuiti:'淬体',
	sgskjdbzjms_cuiti_info:'觉醒技，回合开始阶段，若你至少拥有三个“淬炼”标记，你增加一点体力上限，并回复一点体力，获得技能“不屈”。',

	sgskjdbzjms_shen_zhugeliang:'魂神诸葛亮',
	sgskjdbzjms_shen_zhugeliang_prefix:'魂神',
	sgskjdbzjms_zhongwu:'忠武',
	sgskjdbzjms_zhongwu_info:'锁定技，摸牌阶段，你多摸一张牌；出牌阶段，你多出一张杀；手牌上限+2。',
	sgskjdbzjms_kuangfeng:'狂风',
	sgskjdbzjms_kuangfeng_info:'结束阶段，你可以弃置任意张“星”并指定等量名角色：直到你的下回合开始，这些角色受到火焰伤害时，此伤害+1。',
	sgskjdbzjms_tianshi:'天时',
	sgskjdbzjms_tianshi_info:'觉醒技，准备阶段，若你的“星”全部使用完，或者你主动舍弃所有的“星”，然后你减少一点体力上限，获得技能“薄幸”。',
	sgskjdbzjms_boxing:'薄幸',
	sgskjdbzjms_boxing_info:'你可以将一张牌当作任意一张基本牌，锦囊牌使用或打出，同一回合内，每多使用一次，你减少一点体力或体力上限。',

	sgskjdbzjms_leizhenzi:'雷震子',
	sgskjdbzjms_leishen:'雷神',//锁定技，你造成的所有伤害均为雷属性
	sgskjdbzjms_leishen_info:'锁定技，你造成的所有伤害均包含雷属性；当你使用【雷杀】造成伤害时，伤害+1；当你使用【火杀】造成伤害时，你可以弃置目标角色一张手牌。',
	sgskjdbzjms_jiangxing:'将星',//锁定技，你免疫一切雷电伤害。
	sgskjdbzjms_jiangxing_info:'锁定技，你免疫一切雷电伤害。',
	sgskjdbzjms_leifa:'雷罚',//锁定技，回合开始时，你随机对一名其他角色造成一点雷电伤害。
	sgskjdbzjms_leifa_info:'锁定技，回合开始时，你随机对一名敌方角色造成一点雷电伤害。',
	sgskjdbzjms_fenglei:'风雷',//转换技，风，出牌阶段，你弃置两张牌，直到你的下一回开始之前，你不在其他角色攻击范围内；雷，出牌阶段，你摸两张牌，当前回合使用牌无视距离。
	sgskjdbzjms_fenglei_info:'永续转换技，出牌阶段限一次，风，你弃置两张牌，直到你的下一回开始之前，你不在其他角色攻击范围内；雷，你摸两张牌，当前回合使用牌无视距离。',
	'#ext:夜白神略/audio/character/sgskjdbzjms_leishen1':'',//雷神台词
	'#ext:夜白神略/audio/character/sgskjdbzjms_leishen2':'',
	'#ext:夜白神略/audio/character/sgskjdbzjms_leifa1':'感受雷电的惩罚吧',//雷罚台词
	'#ext:夜白神略/audio/character/sgskjdbzjms_leifa2':'',
	'#ext:夜白神略/audio/character/sgskjdbzjms_fenglei1':'冯虚御风，雷行万里',//风雷台词
	'#ext:夜白神略/audio/character/sgskjdbzjms_fenglei2':'',
	'#ext:夜白神略/audio/character/sgskjdbzjms_jiangxing1':'哈哈哈，蠢，真是太蠢了！',//将星台词
	'#ext:夜白神略/audio/character/sgskjdbzjms_jiangxing2':'是将星，我的雷震子有技能将星，可以免疫一切雷电伤害。',
	'#ext:夜白神略/audio/die/sgskjdbzjms_leizhenzi':'可恶的神诸葛亮啊！',//阵亡台词

	sgskjdbzjms_xian_zhugeguo:'仙诸葛果',
	sgskjdbzjms_xian_zhugeguo_prefix:'仙',
	//出牌阶段限一次，你可以进行一次判定牌不进入弃牌堆的判定，若结果为：黑桃，你可以视为对一名角色使用一张杀；红桃，你可以让一名角色回复一点体力；方块，你可以让一名角色摸两张牌；梅花，你可以弃置一名角色的一张牌。然后若本次判定没有出现相同花色，你可以重复之。全部结算之后将这些牌置入弃牌堆。
	sgskjdbzjms_qirang:'祈禳',//出牌阶段，你可以进行一次判定，若结果为：黑桃，你可以让一名角色多出一张杀；红桃，你可以让一名角色回复一点体力；方块，你可以让一名角色摸两张牌；梅花，你可以弃置一名角色的一张牌。
	sgskjdbzjms_qirang_info:'出牌阶段限一次，你可以进行一次判定，若结果为：黑桃，你可以视为对一名角色使用一张杀；红桃，你可以让一名角色回复一点体力；方块，你可以让一名角色摸两张牌；梅花，你可以弃置一名角色的一张牌。',
	sgskjdbzjms_cifu:'赐福',
	sgskjdbzjms_cifu_info:'回合开始时，若你的“福”不足三个，你将“福”补至三个，然后你可以将任意“福”分配给其他角色，拥有“福”的其他角色摸牌阶段额外摸两张牌，然后移去“福”。若你有三个“福”，当你受到属性伤害时，防止之。',
	sgskjdbzjms_yuhua:'羽化',
	sgskjdbzjms_yuhua_info:'觉醒技，当你进入濒死状态时，你将体力回复至1点，然后减少一点体力上限，手牌上限+1，获得技能“天仙”。',
	sgskjdbzjms_tianxian:'天仙',
	sgskjdbzjms_tianxian_info:'锁定技，你的锦囊牌和桃不计入手牌上限；回合开始时，你获得一张锦囊牌。',
	
	sgskjdbzjms_zhen_zhangfei:'真张飞',
	sgskjdbzjms_zhen_zhangfei_prefix:'真',
	sgskjdbzjms_paoxiao:'咆哮',
	sgskjdbzjms_paoxiao_info:'锁定技，出牌阶段，你使用【杀】无次数、距离限制。',
	sgskjdbzjms_kuangbao:'狂暴',//锁定技，你的黑色锦囊牌和黑色武器牌均视为【杀】；当你以此法使用的杀对其他角色造成伤害时，此伤害+1，你弃置一张手牌。
	sgskjdbzjms_kuangbao_info:'锁定技，你的黑色锦囊牌和黑色武器牌只能当【杀】使用；当你以此法使用的杀对其他角色造成伤害时，此伤害+1，你弃置一张手牌。',
	sgskjdbzjms_yinhen:'引恨',
	sgskjdbzjms_yinhen_info:'锁定技，每当你于出牌阶段杀死一名其他角色，你失去一点体力。',

	sgskjdbzjms_zhen_guanyu:'真关羽',
	sgskjdbzjms_zhen_guanyu_prefix:'真',
	sgskjdbzjms_wusheng:'武圣',
	sgskjdbzjms_wusheng_info:'你可以将红色牌当【杀】使用或打出，你的红桃【杀】伤害+1，方块【杀】无距离限制。',
	sgskjdbzjms_danji:'单骑',//原文没有最大牌数
	sgskjdbzjms_danji_info:'每回合限一次，当你失去所有手牌时，你可以补充手牌至体力上限（至多摸二十）。',
	sgskjdbzjms_danji_append:'二十的上限是我加的，原文没有',
	sgskjdbzjms_fujun:'覆军',
	sgskjdbzjms_fujun_info:'限定技，出牌阶段，你可以令所有角色选择一项：①弃置两张牌，②令你摸三张牌；然后你增加一点体力上限，回复一点体力。',
	// wusheng_jsp_guanyu:'武圣',
	// wusheng_jsp_guanyu_info:'此技能仅提供一条语音',

	sgskjdbzjms_shen_liubei:'魂神刘备',
	sgskjdbzjms_shen_liubei_prefix:'魂神',
	sgskjdbzjms_zhaolie:'昭烈',
	sgskjdbzjms_zhaolie_info:'锁定技，你的手牌上限始终为体力上限。',
	sgskjdbzjms_rende:'仁德',//
	sgskjdbzjms_rende_info:'出牌阶段限一次，你可以将任意手牌交给任意其他角色，然后你可以摸X张牌（X为交出手牌数一半+1，向下取整）',
	sgskjdbzjms_taoyuan:'桃园',
	sgskjdbzjms_taoyuan_info:'觉醒技，准备阶段，若你的体力值为3，你可以选择至多三名角色，使其回复一点体力，然后补充手牌至体力上限，然后你增加3点体力上限，回复3点体力，摸三张牌。然后你获得技能“举国”和“倾覆”。',
	sgskjdbzjms_juguo:'举国',
	sgskjdbzjms_juguo_info:'出牌阶段限一次，你可以弃置三张手牌，然后令所有其他角色失去一点体力并弃置一张手牌。',
	sgskjdbzjms_qingfu:'倾覆',
	sgskjdbzjms_qingfu_info:'锁定技，你每使用一次“举国”，你选择一项：①失去一点体力，②失去一点体力上限。',

	sgskjdbzjms_zhen_machao:'真马超',
	sgskjdbzjms_zhen_machao_prefix:'真',
	// sgskjdbzjms_tieji:'铁骑',
	sgskjdbzjms_mashu:'马术',
	sgskjdbzjms_mashu_info:'锁定技，你计算与其他角色的距离时-1；其他角色计算与你的距离时，若其手牌数少于你，则+1。',
	sgskjdbzjms_shenweitianjiangjun:'神威',
	sgskjdbzjms_shenweitianjiangjun_info:'锁定技，当你造成伤害后，受伤角色选择一项：①弃置两张手牌，②领你摸两张牌。',

	sgskjdbzjms_zhen_liubei:'真刘备',
	sgskjdbzjms_zhen_liubei_prefix:'真',
	sgskjdbzjms_jieying:'连营',
	sgskjdbzjms_jieying_info:'锁定技，你始终处于横置状态；回合结束阶段，你可以横置一名其他角色。',
	sgskjdbzjms_tuogu:'托孤',
	sgskjdbzjms_tuogu_info:'当你进入濒死状态时，你可以选择至多两名其他角色，令他们选择一项：①摸三张牌，②，回复一点体力。',


	qmsgswkjsgj:'全民三国杀，我开局神郭嘉',
	qmsgswkjsgj_info:'全民三国杀，我开局神郭嘉<br>平台：番茄小说<br>作者：天一笙水',

	qmsgswkjsgj_xizhicai:'界戏志才',
	qmsgswkjsgj_xizhicai_prefix:'界',
	qmsgswkjsgj_xianfu:'先辅',
	qmsgswkjsgj_xianfu_info:'锁定技，游戏开始时，你选择一名其他角色，当其受到伤害后，你受到等量的伤害，当其回复体力后，你回复等量的体力。当先辅角色阵亡时，或回合开始时，你可以改变先辅目标。',
	// qmsgswkjsgj_xianfu_append:'随便换目标的戏志才是什么人渣？',
	tiandu_xizhicai:'天妒',
	tiandu_xizhicai_info:'此技能仅提供一条语音。',
	qmsgswkjsgj_chouce:'筹策',
	qmsgswkjsgj_chouce_info:'当你受到1点伤害后，你可以判定，若结果为：黑色，你可以移动场上一张牌或获得一名其他角色的一张手牌；红色，你选择一名角色，其摸一张牌，若其是〖先辅〗选择的角色，改为其摸两张牌。若如此做，你可以将一张手牌交给任意角色。',

	qmsgswkjsgj_liuxie:'界刘协',
	qmsgswkjsgj_liuxie_prefix:'界',
	qmsgswkjsgj_tianming:'天命',
	qmsgswkjsgj_tianming_info:'当你成为杀的目标后，你可以摸两张牌。',
	qmsgswkjsgj_mizhao:'密诏',//【杀】或【火杀】或【雷杀】
	qmsgswkjsgj_mizhao_info:'出牌阶段限一次，你可以将所有手牌交给一名其他角色。若如此做，你令该角色与你指定的另一名有手牌的角色拼点，视为拼点赢的角色对没赢的角色使用一张雷/火/普通【杀】。',

	qmsgswkjsgj_shen_zhaoyun:'缝神赵云',
	qmsgswkjsgj_shen_zhaoyun_prefix:'缝神',
	qmsgswkjsgj_juejing:'绝境',
	qmsgswkjsgj_juejing_info:'锁定技。①你的手牌上限+2。②当你进入或脱离濒死状态时，你摸一张牌。③摸牌阶段，你令额定摸牌数+X（X为你已损失的体力值）。',
	qmsgswkjsgj_juejing_append:'二代神赵云和三代神赵云取长补短的缝合品',
	qmsgswkjsgj_longhun:'龙魂',
	qmsgswkjsgj_longhun_info:'你可以将同花色的一至两张牌按下列规则使用或打出：红桃当【桃】，方块当火【杀】，梅花当【闪】，黑桃当普【无懈可击】。若你以此法转化了两张：红色牌，则此牌回复值或伤害值+1；黑色牌，则你弃置当前回合角色一张牌。',

	qmsgswkjsgj_gui_xuyou:'白无常赐福许攸',
	qmsgswkjsgj_gui_xuyou_prefix:'白无常赐福',

	qmsgswkjsgj_gui_zhaoyun:'白无常赐福赵云',
	qmsgswkjsgj_gui_zhaoyun_prefix:'白无常赐福',

	qmsgswkjsgj_gui_sunquan:'黑无常赐福孙权',
	qmsgswkjsgj_gui_sunquan_prefix:'黑无常赐福',
	//神鬼赐福
	qmsgswkjsgj_taiping: "太平",
	qmsgswkjsgj_taiping_info: "锁定技，摸牌阶段摸牌时，你的摸牌数量+2。",
	qmsgswkjsgj_taiping_append: "黑无常赐福。",
	qmsgswkjsgj_baolian:'暴敛',
	qmsgswkjsgj_baolian_info: "锁定技，结束阶段，你摸两张牌。",
	qmsgswkjsgj_baolian_append: "白无常赐福。",

	qmsgswkjsgj_shen_guojia:'缝神郭嘉',
	qmsgswkjsgj_shen_guojia_prefix:'缝神',
	qmsgswkjsgj_reshuishi:'慧识',
	qmsgswkjsgj_reshuishi_info: "出牌阶段限一次。若你的体力上限小于10，你可进行判定牌不置入弃牌堆的判定。若判定结果与本次发动技能时的其他判定结果的花色均不相同且你的体力上限小于10，则你加1点体力上限，且可以重复此流程。然后你将所有位于处理区的判定牌交给一名角色。若其手牌数为全场最多，则你减1点体力上限。",

	qmsgswkjsgj_sp_duyu:'界杜预',
	qmsgswkjsgj_sp_duyu_prefix:'界',
	qmsgswkjsgj_spwuku: "武库",
	qmsgswkjsgj_spwuku_info: "锁定技，当有角色使用装备牌时，则你获得一个“武库”。",
	qmsgswkjsgj_spsanchen: "三陈",
	qmsgswkjsgj_spsanchen_info: "觉醒技，若你的“武库”数大于2，则你加1点体力上限并回复1点体力，然后获得〖灭吴〗。",

	qmsgswkjsgj_gui_liubei:'黑无常赐福刘备',
	qmsgswkjsgj_gui_liubei_prefix:'黑无常赐福',

	qmsgswkjsgj_gui_re_zhouyu:'白无常赐福界周瑜',
	qmsgswkjsgj_gui_re_zhouyu_prefix:'白无常赐福',

	qmsgswkjsgj_shen_zhugeliang:'缝神诸葛亮',
	qmsgswkjsgj_shen_zhugeliang_prefix:'缝神',
	qmsgswkjsgj_kuangfeng:'狂风',
	qmsgswkjsgj_kuangfeng2:'狂风',
	qmsgswkjsgj_kuangfeng2_bg:'风',
	qmsgswkjsgj_kuangfeng3:'狂风',
	qmsgswkjsgj_kuangfeng_info:'结束阶段，你可以弃置一张“星”并指定一名角色：直到你的下回合开始，该角色受到火焰伤害时，此伤害+1，且该角色收到的所有非属性伤害均视为火属性伤害。',
	qmsgswkjsgj_guanxing:'观星',
	qmsgswkjsgj_guanxing_info:'准备阶段，你可以观看牌堆顶的7张牌，然后将其中一张扣置于你的武将牌上称为“星”，然后将其中任意数量的牌置于牌堆顶，将其余的牌置于牌堆底。',

	qmsgswkjsgj_sb_huangzhong:'旧谋黄忠',
	qmsgswkjsgj_sb_huangzhong_prefix:'旧谋',
	qmsgswkjsgj_sbliegong: "烈弓",
	qmsgswkjsgj_sbliegong_info:'①你使用【杀】可以选择你距离不大于此【杀】点数的角色为目标。②当你使用牌时，或成为其他角色使用牌的目标后，你记录此牌的花色。③当你使用【杀】或伤害锦囊指定唯一目标后，若你〖烈弓②〗的记录不为空，则你可亮出牌堆顶的X张牌（X为你〖烈弓②〗记录过的花色数-1），令此牌的伤害值基数+Y（Y为亮出牌中被〖烈弓②〗记录过花色的牌的数量），且目标角色不能使用〖烈弓②〗记录过花色的牌响应此牌。此牌使用结算结束后，你清除〖烈弓②〗的记录。',


















	sgsxjxfzmnl:'三国杀，仙界下凡怎么你了',
	sgsxjxfzmnl_info:'三国杀，仙界下凡怎么你了<br>平台：番茄小说<br>作者：作家时霜<br>备注：因作者描述较为不规范，因此在这里我会先进行一番规范。',

	sgsxjxfzmnl_re_xusheng:'仙界界徐盛',
	sgsxjxfzmnl_re_xusheng_prefix:'仙界界',
	sgsxjxfzmnl_pojun:'破军',
	sgsxjxfzmnl_pojun2: "破军",
	sgsxjxfzmnl_pojun3: "破军",
	sgsxjxfzmnl_pojun_info:'当你使用杀或单目标伤害锦囊牌指定目标时，你可以令此牌伤害+1，然后将其的至多X张牌置于其武将牌上（X为其体力值），然后其于当前回合结束时获得这些牌。',

	sgsxjxfzmnl_sb_huangzhong:'仙界谋黄忠',
	sgsxjxfzmnl_sb_huangzhong_prefix:'仙界谋',
	sgsxjxfzmnl_sbliegong: "烈弓",
	sgsxjxfzmnl_sbliegong_info: "①若你的装备区内有武器牌，你攻击距离无限，且你的杀可以转化为任意属性。②当你使用牌时，或成为其他角色使用牌的目标后，你记录此牌的花色。③当你使用【杀】或伤害锦囊指定唯一目标后，若你〖烈弓②〗的记录不为空，则你可亮出牌堆顶的X张牌（X为你〖烈弓②〗记录过的花色数-1），令此牌的伤害值基数+Y（Y为亮出牌中被〖烈弓②〗记录过花色的牌的数量），且目标角色不能使用〖烈弓②〗记录过花色的牌响应此牌。此牌使用结算结束后，你清除〖烈弓②〗的记录。",

	sgsxjxfzmnl_shen_sunce:'仙界神孙策',
	sgsxjxfzmnl_shen_sunce_prefix:'仙界神',
	sgsxjxfzmnl_yingba: "英霸",
	sgsxjxfzmnl_yingba_info: "①出牌阶段每名角色限一次，你可令一名体力上限大于1的其他角色减少1点体力上限并获得“平定”标记，然后你减少1点体力上限。②你对拥有“平定”标记的角色使用牌没有距离限制和次数限制。",
	sgsxjxfzmnl_scfuhai: "覆海",
	sgsxjxfzmnl_scfuhai_info: "锁定技。①当你使用牌指定目标后，若目标角色有“平定”标记，则其不可响应此牌。若你本回合内以此法得到的牌数小于4，则你摸一张牌。②拥有“平定”标记的角色死亡时，你增加X点体力上限并摸X张牌。（X为其拥有的“平定”标记数）。",
	// sgsxjxfzmnl_pinghe: "冯河",
	// sgsxjxfzmnl_pinghe_info: "锁定技。①你的手牌上限基数等于你已损失的体力值。②当你受到其他角色造成的伤害时，若你有牌且你的体力上限大于1，则你防止此伤害，减1点体力上限并将一张手牌交给一名其他角色。然后若你拥有〖英霸〗，则伤害来源获得一个“平定”标记。",
	
	sgsxjxfzmnl_sb_xiahoushi: "仙界谋夏侯氏",
	sgsxjxfzmnl_sb_xiahoushi_prefix: "仙界谋",
	sgsxjxfzmnl_sbqiaoshi: "樵拾",
	sgsxjxfzmnl_sbqiaoshi_info: "每回合限一次。当你受到其他角色造成的伤害后，你可以令你回复等同于此次伤害值的体力，然后你与其摸两张牌。",
	sgsxjxfzmnl_sbyanyu: "燕语",
	sgsxjxfzmnl_sbyanyu_info: "①出牌阶段限三次。你可以弃置一张【杀】，然后摸一张牌。②出牌阶段结束时，你可以令一名其他角色摸3X张牌（X为你于此阶段发动〖燕语①〗的次数）。",

	sgsxjxfzmnl_mo_diaochan:'魔貂蝉',
	sgsxjxfzmnl_mo_diaochan_prefix:'魔',//这强度称不上仙界
	sgsxjxfzmnl_meihuo:'魅惑',
	sgsxjxfzmnl_meihuo_info:'出牌阶段限两次，弃置一张牌，并选择两名其他角色，然后令两名角色互相使用一张【决斗】。',
	sgsxjxfzmnl_biyue:'闭月',
	sgsxjxfzmnl_biyue_info:'结束阶段，你可以摸两张牌。',

	sgsxjxfzmnl_wangyuanji:'仙界王元姬',
	sgsxjxfzmnl_wangyuanji_prefix:'仙界',
	sgsxjxfzmnl_qianchong: "谦冲",
	sgsxjxfzmnl_qianchong_info: "锁定技，若你的装备区内有牌且：均为红色，则你视为拥有技能〖明哲〗。均为黑色，则你视为拥有技能〖帷幕〗。若出牌阶段开始时，若你不满足上述条件，你本回合内使用牌没有次数和距离限制。",
	sgsxjxfzmnl_shangjian: "尚俭",
	sgsxjxfzmnl_shangjian_info: "锁定技。一名角色的结束阶段开始时，若你于此回合内失去过牌，则你摸等同失去数量的牌。",

	sgsxjxfzmnl_shen_guojia:'仙界神郭嘉',
	sgsxjxfzmnl_shen_guojia_prefix:'仙界神',
	sgsxjxfzmnl_reshuishi:'慧识',
	sgsxjxfzmnl_reshuishi_info:'出牌阶段限两次，你可进行判定牌不置入弃牌堆的判定。若判定结果与本次发动技能时的其他判定结果的花色均不相同，则你加1点体力上限，且可以重复此流程。然后你将所有位于处理区的判定牌交给一名角色。',












	











	zzrsqlkjygzz:'蒸蒸日上，全力氪金，言贵者斩',
	zzrsqlkjygzz_info:'蒸蒸日上，全力氪金，言贵者斩<br>平台：番茄小说<br>作者：浅埋',
	
	zzrsqlkjygzz_re_zuoci:'氪界左慈',
	zzrsqlkjygzz_re_zuoci_prefix:'氪界',

	zzrsqlkjygzz_shen_guanyu:'氪神关羽',
	zzrsqlkjygzz_shen_guanyu_prefix:'氪神',

	zzrsqlkjygzz_shen_zhangjiao:'氪神张角',
	zzrsqlkjygzz_shen_zhangjiao_prefix:'氪神',

	zzrsqlkjygzz_shen_sunce:'氪神孙策',
	zzrsqlkjygzz_shen_sunce_prefix:'氪神',

	zzrsqlkjygzz_yi_caocao:'异曹操',
	zzrsqlkjygzz_yi_caocao_prefix:'异',

	zzrsqlkjygzz_yi_guanyu:'异关羽',
	zzrsqlkjygzz_yi_guanyu_prefix:'异',

	zzrsqlkjygzz_yi_zhangjiao:'异张角',
	zzrsqlkjygzz_yi_zhangjiao_prefix:'异',

	zzrsqlkjygzz_yi2_zhangjiao:'异张角',
	zzrsqlkjygzz_yi2_zhangjiao_prefix:'异',

	zzrsqlkjygzz_yi3_zhangjiao:'异张角',
	zzrsqlkjygzz_yi3_zhangjiao_prefix:'异',

	zzrsqlkjygzz_yi_luxun:'异陆逊',
	zzrsqlkjygzz_yi_luxun_prefix:'异',

	zzrsqlkjygzz_yi_sunce:'异孙策',
	zzrsqlkjygzz_yi_sunce_prefix:'异',

	zzrsqlkjygzz_yao_zhoutai:'氪妖周泰',
	zzrsqlkjygzz_yao_zhoutai_prefix:'氪妖',



























}