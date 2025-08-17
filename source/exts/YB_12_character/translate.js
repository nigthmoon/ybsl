import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {translate}

const translate = {
	
	sgskjdbzjms:'三国杀，开局大宝直接秒杀',
	sgskjdbzjms_info:'三国杀，开局大宝直接秒杀<br>平台：番茄小说<br>作者：糊涂小笨蛋',

	sgskjdbzjms_zrshenmoyi:'沈墨以',//界徐盛，神赵云，神诸葛亮，神郭嘉
	//界公孙瓒 公孙瓒 潘璋马忠
	sgskjdbzjms_smyhengcai:'横财',
	sgskjdbzjms_smyhengcai_info:'锁定技，游戏开始时，你可以随机招募四名史诗或传说武将充入自己将池（或令剧情四名初始神将加入将池）（第一个必定是界徐盛）（若招募到的是神将，则需要后续使用弥仙神术激活），然后你选择将池的一名武将替换自己的另一名武将；每轮开始时，你获得一枚随机宝珠（普通5权，精品3权，传说2权）。',
	sgskjdbzjms_smyjihun:'集魂',
	sgskjdbzjms_smyjihun_info:'回合开始时，你可以消耗宝珠进行招募，然后选择将池一名武将替换另一武将。',
	//沈妈 柳月梅
	//沈爸 
	sgskjdbzjms_zrzhenghao:'郑豪',//手杀界邓艾  界马超，界满宠  李傕
	sgskjdbzjms_zrzhaoyoubo:'赵有博',//

	sgskjdbzjms_zrmurongyan:'慕容岩',//魔周泰

	//哈哈哈，我是将军，我是大将军
	//我封你为骠骑将军，你是车骑将军。随我征战！
	sgskjdbzjms_zrsimapo:'司马珀',//司马昭 许褚
	sgskjdbzjms_zranmuxi:'安慕希',//代抽出手杀界钟会
	sgskjdbzjms_amxdaichou:'代抽',
	sgskjdbzjms_amxdaichou_info:'其他角色摸牌时，其可以改为令你摸等量张牌并交给其。',
	sgskjdbzjms_amxhaoyun:'好运',
	// sgskjdbzjms_amxhaoyun_info:'持恒技，当你摸牌时，你可以声明一个牌名（不能是以此法声明过的牌名），令本次摸的牌其中随机一张的牌名改为之。此牌进入弃牌堆则恢复原牌名。',
	sgskjdbzjms_amxhaoyun_info:'持恒技，当你摸牌时，你可以声明一个牌名，令本次摸的牌必然包含其（除非牌堆没有）。',


	sgskjdbzjms_zrganmeng:'甘檬',//神甘宁
	sgskjdbzjms_zryangxiong:'杨雄',//杨仪
	//刘左将军 手杀界华雄
	//林欣（张角）&许意（界刘备）
	//诸葛羽秋（界黄月英，仙诸葛果）&李若依















	sgskjdbzjms_mo_zhoutai:'魔周泰',
	sgskjdbzjms_mo_zhoutai_prefix:'魔',
	sgskjdbzjms_tiequ:'铁躯',
	sgskjdbzjms_tiequ_info:'锁定技，你受到的属性伤害-1；你每受到一次伤害，便获得一个“淬炼”标记。',
	sgskjdbzjms_xieren:'卸刃',
	sgskjdbzjms_xieren_info:'当你对其他角色造成伤害，或当你受到其他角色造成的伤害时，你可以弃置其一张牌。',
	sgskjdbzjms_cuiti:'淬体',
	sgskjdbzjms_cuiti_info:'觉醒技，回合开始阶段，若你至少拥有三个“淬炼”标记，你增加1点体力上限，并回复1点体力，获得技能〖不屈〗。',

	sgskjdbzjms_shen_zhugeliang:'魂神诸葛亮',
	sgskjdbzjms_shen_zhugeliang_prefix:'魂神',
	sgskjdbzjms_zhongwu:'忠武',
	sgskjdbzjms_zhongwu_info:'锁定技，摸牌阶段，你多摸一张牌；出牌阶段，你多出一张杀；手牌上限+2。',
	sgskjdbzjms_kuangfeng:'狂风',
	sgskjdbzjms_kuangfeng_info:'结束阶段，你可以弃置任意张“星”并指定等量名角色：直到你的下回合开始，这些角色受到火焰伤害时，此伤害+1。',
	sgskjdbzjms_tianshi:'天时',
	sgskjdbzjms_tianshi_info:'觉醒技，准备阶段，若你的“星”全部使用完，或者你主动舍弃所有的“星”，然后你减少1点体力上限，获得技能〖薄幸〗。',
	sgskjdbzjms_boxing:'薄幸',
	sgskjdbzjms_boxing_info:'你可以将一张牌当作任意一张基本牌，锦囊牌使用或打出，同一回合内，每多使用一次，你减少1点体力或体力上限。',

	sgskjdbzjms_leizhenzi:'雷震子',
	sgskjdbzjms_leishen:'雷神',//锁定技，你造成的所有伤害均为雷属性
	sgskjdbzjms_leishen_info:'锁定技，你造成的所有伤害均包含雷属性；当你使用雷【杀】造成伤害时，伤害+1；当你使用火【杀】造成伤害时，你可以弃置目标角色一张手牌。',
	sgskjdbzjms_jiangxing:'将星',//锁定技，你免疫一切雷电伤害。
	sgskjdbzjms_jiangxing_info:'锁定技，你免疫一切雷电伤害。',
	sgskjdbzjms_leifa:'雷罚',//锁定技，回合开始时，你随机对一名其他角色造成一点雷电伤害。
	sgskjdbzjms_leifa_info:'锁定技，回合开始时，你随机对一名敌方角色造成1点雷电伤害。',
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
	sgskjdbzjms_qirang_info:'出牌阶段限一次，你可以进行一次判定，若结果为：黑桃，你可以视为对一名角色使用一张杀；红桃，你可以让一名角色回复1点体力；方块，你可以让一名角色摸两张牌；梅花，你可以弃置一名角色的一张牌。',
	sgskjdbzjms_cifu:'赐福',
	sgskjdbzjms_cifu_info:'回合开始时，若你的“福”不足三个，你将“福”补至三个，然后你可以将任意“福”分配给其他角色，拥有“福”的其他角色摸牌阶段额外摸两张牌，然后移去“福”。若你有三个“福”，当你受到属性伤害时，防止之。',
	sgskjdbzjms_yuhua:'羽化',
	sgskjdbzjms_yuhua_info:'觉醒技，当你进入濒死状态时，你将体力回复至1点，然后减少1点体力上限，手牌上限+1，获得技能“天仙”。',
	sgskjdbzjms_tianxian:'天仙',
	sgskjdbzjms_tianxian_info:'锁定技，你的锦囊牌和【桃】不计入手牌上限；回合开始时，你获得一张锦囊牌。',
	
	sgskjdbzjms_zhen_zhangfei:'真张飞',
	sgskjdbzjms_zhen_zhangfei_prefix:'真',
	sgskjdbzjms_paoxiao:'咆哮',
	sgskjdbzjms_paoxiao_info:'锁定技，出牌阶段，你使用【杀】无次数、距离限制。',
	sgskjdbzjms_kuangbao:'狂暴',//锁定技，你的黑色锦囊牌和黑色武器牌均视为【杀】；当你以此法使用的杀对其他角色造成伤害时，此伤害+1，你弃置一张手牌。
	sgskjdbzjms_kuangbao_info:'锁定技，你的黑色锦囊牌和黑色武器牌只能当【杀】使用；当你以此法使用的杀对其他角色造成伤害时，此伤害+1，你弃置一张手牌。',
	sgskjdbzjms_yinhen:'引恨',
	sgskjdbzjms_yinhen_info:'锁定技，每当你于出牌阶段杀死一名其他角色，你失去1点体力。',

	sgskjdbzjms_zhen_guanyu:'真关羽',
	sgskjdbzjms_zhen_guanyu_prefix:'真',
	sgskjdbzjms_wusheng:'武圣',
	sgskjdbzjms_wusheng_info:'你可以将红色牌当【杀】使用或打出，你的红桃【杀】伤害+1，方块【杀】无距离限制。',
	sgskjdbzjms_danji:'单骑',//原文没有最大牌数
	sgskjdbzjms_danji_info:'每回合限一次，当你失去所有手牌时，你可以补充手牌至体力上限（至多摸二十）。',
	sgskjdbzjms_danji_append:'二十的上限是我加的，原文没有',
	sgskjdbzjms_fujun:'覆军',
	sgskjdbzjms_fujun_info:'限定技，出牌阶段，你可以令所有角色选择一项：①弃置两张牌，②令你摸三张牌；然后你增加1点体力上限，回复1点体力。',
	// wusheng_jsp_guanyu:'武圣',
	// wusheng_jsp_guanyu_info:'此技能仅提供一条语音',

	sgskjdbzjms_shen_liubei:'魂神刘备',
	sgskjdbzjms_shen_liubei_prefix:'魂神',
	sgskjdbzjms_zhaolie:'昭烈',
	sgskjdbzjms_zhaolie_info:'锁定技，你的手牌上限始终为体力上限。',
	sgskjdbzjms_rende:'仁德',//
	sgskjdbzjms_rende_info:'出牌阶段限一次，你可以将任意手牌交给任意其他角色，然后你可以摸X张牌（X为交出手牌数一半+1，向下取整）',
	sgskjdbzjms_taoyuan:'桃园',
	sgskjdbzjms_taoyuan_info:'觉醒技，准备阶段，若你的体力值为3，你可以选择至多三名角色，使其回复1点体力，然后补充手牌至体力上限，然后你增加3点体力上限，回复3点体力，摸三张牌。然后你获得技能〖举国〗和〖倾覆〗。',
	sgskjdbzjms_juguo:'举国',
	sgskjdbzjms_juguo_info:'出牌阶段限一次，你可以弃置三张手牌，然后令所有其他角色失去1点体力并弃置一张手牌。',
	sgskjdbzjms_qingfu:'倾覆',
	sgskjdbzjms_qingfu_info:'锁定技，你每使用一次〖举国〗，你选择一项：①失去1点体力，②失去1点体力上限。',

	sgskjdbzjms_zhen_machao:'真马超',
	sgskjdbzjms_zhen_machao_prefix:'真',
	// sgskjdbzjms_tieji:'铁骑',
	sgskjdbzjms_mashu:'马术',
	sgskjdbzjms_mashu_info:'锁定技，你计算与其他角色的距离时-1；其他角色计算与你的距离时，若其手牌数少于你，则+1。',
	sgskjdbzjms_shenweitianjiangjun:'神威',
	sgskjdbzjms_shenweitianjiangjun_info:'锁定技，当你造成伤害后，受伤角色选择一项：①弃置两张手牌，②令你摸两张牌。',

	sgskjdbzjms_zhen_liubei:'真刘备',
	sgskjdbzjms_zhen_liubei_prefix:'真',
	sgskjdbzjms_jieying:'连营',
	sgskjdbzjms_jieying_info:'锁定技，你始终处于横置状态；回合结束阶段，你可以横置一名其他角色。',
	sgskjdbzjms_tuogu:'托孤',
	sgskjdbzjms_tuogu_info:'当你进入濒死状态时，你可以选择至多两名其他角色，令他们选择一项：①摸三张牌，②，回复1点体力。',







	qmsgswkjsgj_zrlinan:'林安',





















	qmsgswkjsgj:'全民三国杀，我开局神郭嘉',
	qmsgswkjsgj_info:'全民三国杀，我开局神郭嘉<br>平台：番茄小说<br>作者：天一笙水',

	qmsgswkjsgj_re_xizhicai:'界戏志才',
	qmsgswkjsgj_re_xizhicai_prefix:'界',
	qmsgswkjsgj_xianfu:'先辅',
	qmsgswkjsgj_xianfu_info:'锁定技，游戏开始时，你选择一名其他角色，当其受到伤害后，你受到等量的伤害，当其回复体力后，你回复等量的体力。当先辅角色阵亡时，或回合开始时，你可以改变先辅目标。',
	qmsgswkjsgj_xianfu_append:'据作者口胡，这个伤害能发动“悲歌”。',
	qmsgswkjsgj_xianfu2:'先辅',
	qmsgswkjsgj_xianfu3:'先辅',
	tiandu_xizhicai:'天妒',
	tiandu_xizhicai_info:'此技能仅提供一条语音。',
	qmsgswkjsgj_chouce:'筹策',
	qmsgswkjsgj_chouce_info:'当你受到1点伤害后，你可以判定，若结果为：黑色，你可以移动场上一张牌或获得一名其他角色的一张手牌；红色，你选择一名角色，其摸一张牌，若其是〖先辅〗选择的角色，改为其摸两张牌。若如此做，你可以将一张手牌交给任意角色。',

	qmsgswkjsgj_re_liuxie:'界刘协',
	qmsgswkjsgj_re_liuxie_prefix:'界',
	qmsgswkjsgj_tianming:'天命',
	qmsgswkjsgj_tianming_info:'当你成为【杀】的目标后，你可以摸两张牌。',
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

	qmsgswkjsgj_re_sp_duyu:'界杜预',
	qmsgswkjsgj_re_sp_duyu_prefix:'界',
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
	qmsgswkjsgj_kuangfeng_info:'结束阶段，你可以弃置一张“星”并指定一名角色：直到你的下结束阶段开始时，该角色受到火焰伤害时，此伤害+1，且该角色收到的所有非属性伤害均视为火属性伤害。',
	qmsgswkjsgj_dawu:'大雾',
	qmsgswkjsgj_dawu2_bg: "雾",
	qmsgswkjsgj_dawu2: "大雾",
	qmsgswkjsgj_dawu3: "大雾",
	qmsgswkjsgj_dawu_info: "结束阶段，你可以弃置X张“星”并指定等量的角色：直到你的下结束阶段开始时，当这些角色受到非雷电伤害时，防止此伤害。",
	qmsgswkjsgj_guanxing:'观星',
	qmsgswkjsgj_guanxing_info:'准备阶段，你可以观看牌堆顶的7张牌，然后将其中一张扣置于你的武将牌上称为“星”，然后将其中任意数量的牌置于牌堆顶，将其余的牌置于牌堆底。',

	qmsgswkjsgj_sb_huangzhong:'旧谋黄忠',
	qmsgswkjsgj_sb_huangzhong_prefix:'旧谋',
	qmsgswkjsgj_sbliegong: "烈弓",
	qmsgswkjsgj_sbliegong_info:'①你使用【杀】可以选择你距离不大于此【杀】点数的角色为目标。②当你使用牌时，或成为其他角色使用牌的目标后，你记录此牌的花色。③当你使用【杀】或伤害锦囊指定唯一目标后，若你〖烈弓②〗的记录不为空，则你可亮出牌堆顶的X张牌（X为你〖烈弓②〗记录过的花色数-1），令此牌的伤害值基数+Y（Y为亮出牌中被〖烈弓②〗记录过花色的牌的数量），且目标角色不能使用〖烈弓②〗记录过花色的牌响应此牌。此牌使用结算结束后，你清除〖烈弓②〗的记录。',

	qmsgswkjsgj_re_yangbiao:'界杨彪',
	qmsgswkjsgj_re_yangbiao_prefix:'界',
	qmsgswkjsgj_zhaohan:'昭汉',
	qmsgswkjsgj_zhaohan_info:'锁定技，游戏开始后的前四个准备阶段，你加1点体力上限并回复1点体力。之后的三个准备阶段，你受到1点无来源伤害。',
	qmsgswkjsgj_rangjie:'让节',
	qmsgswkjsgj_rangjie_info:'当你受到1点伤害后，你可以选择一项并令一名角色摸一张牌：1.移动场上一张牌；2.从牌堆获得一张你指定类型的牌。',
	qmsgswkjsgj_yizheng:'义争',
	qmsgswkjsgj_yizheng_info:'出牌阶段限一次，你可以与一名角色拼点：若你赢，跳过其下个摸牌阶段；若你没赢，你受到其对你造成的1点伤害。',
	
	qmsgswkjsgj_re_luotong:'界骆统',
	qmsgswkjsgj_re_luotong_prefix:'界',
	qmsgswkjsgj_qinzheng:'勤政',
	qmsgswkjsgj_qinzheng_info:'锁定技，你每使用或打出：两张牌时，你随机从牌堆或弃牌堆获得一张【杀】或【闪】或【桃】或【酒】；五张牌时，你随机从牌堆或弃牌堆获得一张【决斗】或【过河拆桥】；八张牌时，你随机从牌堆或弃牌堆获得一张【无中生有】或【顺手牵羊】。',

	qmsgswkjsgj_re_liuyan:'界刘焉',
	qmsgswkjsgj_re_liuyan_prefix:'界',
	qmsgswkjsgj_tushe:'图射',
	qmsgswkjsgj_tushe_info:'当你使用牌指定目标后，若你没有基本牌，则你可以摸X张牌。（X为此牌指定的目标数）',
	qmsgswkjsgj_limu:'立牧',
	qmsgswkjsgj_limu_info:'出牌阶段，你可以将一张红牌当做【乐不思蜀】对自己使用，然后回复1点体力。若你的判定区内有牌，你对攻击范围内的其他角色使用牌便没有次数和距离限制，且可以将一种花色的所有手牌当普通杀使用，出牌阶段每种花色限一次。',
	// qmsgswkjsgj_limu_append:'暂定每回合每种花色限一次。看后面作者怎么解释吧。',
	qmsgswkjsgj_limu_sha:'立牧',
	qmsgswkjsgj_limu_sha_info:'将一种花色的所有手牌当普通【杀】使用，出牌阶段每种花色限一次',
	qmsgswkjsgj_pianan:'偏安',
	qmsgswkjsgj_pianan_info:'锁定技，当你受到伤害时，若你的判定区有牌，你弃置其中一张，防止此伤害。',

	qmsgswkjsgj_re_lusu:'界鲁肃',
	qmsgswkjsgj_re_lusu_prefix:'界',
	qmsgswkjsgj_haoshi:'好施',
	qmsgswkjsgj_haoshi_info:'摸牌阶段，你可以多摸两张牌，然后若你的手牌数大于5，则你可以将一半的手牌（向下取整）交给一名其他角色，然后直到你的回合开始，当你成为【杀】或普通锦囊牌的目标后，其可将一张手牌交给你。',

	qmsgswkjsgj_re_caiwenji:'界蔡文姬',
	qmsgswkjsgj_re_caiwenji_prefix:'界',
	qmsgswkjsgj_beige:'悲歌',
	qmsgswkjsgj_beige_info:'当有角色受到【杀】造成的伤害后，你可以弃一张牌，若此牌花色为：♥该角色回复X点体力(X为伤害点数)；♦︎该角色摸三张牌；♣伤害来源弃三张牌；♠伤害来源将其武将牌翻面。',

	qmsgswkjsgj_re_caorui:'界曹叡',
	qmsgswkjsgj_re_caorui_prefix:'界',
	qmsgswkjsgj_mingjian:'明鉴',
	qmsgswkjsgj_mingjian_info:'出牌阶段开始时，你可以将所有手牌交给一名其他角色，然后你结束此阶段，其执行一个额外的出牌阶段，本出牌阶段其可以多使用一张【杀】。若如此做，直到该角色下个回合结束，其手牌上限+1。',
	//作者描述原文一塌糊涂，正好现在的剧情，这个曹叡登场了，我看看剧情里是什么结算，然后好根据作者口胡调整描述

	qmsgswkjsgj_re_zhangxiu:'界张绣',
	qmsgswkjsgj_re_zhangxiu_prefix:'界',
	qmsgswkjsgj_xiongluan:'雄乱',
	qmsgswkjsgj_xiongluan_info:'限定技，出牌阶段，你可以废除你的判定区和装备区，然后指定一名其他角色。直到回合结束，你对其使用牌无距离和次数限制，其不能使用和打出手牌。你每废除一个装备栏，可以摸一张牌。',

	qmsgswkjsgj_re_fuhuanghou:'界伏皇后',
	qmsgswkjsgj_re_fuhuanghou_prefix:'界',
	qmsgswkjsgj_zhuikong:'惴恐',
	qmsgswkjsgj_zhuikong_info:'其他角色的回合开始时，若你已受伤，你可以与该角色拼点。若你赢，该角色跳过本回合的出牌阶段。若你没赢，你获得其的拼点牌，然后其视为对你使用一张【杀】。',

	qmsgswkjsgj_shen_ganning:'缝神甘宁',
	qmsgswkjsgj_shen_ganning_prefix:'缝神',
	qmsgswkjsgj_poxi:'魄袭',
	qmsgswkjsgj_poxi_info:'出牌阶段限一次，你可以观看一名其他角色的手牌，然后你可以弃置你与其手里共计四张牌。若如此做，根据此次弃置你的牌数量执行以下效果：零张，体力上限减1；一张，你本回合手牌上限-1；三张，你回复1点体力；四张，你摸五张牌。',
	qmsgswkjsgj_jieying:'劫营',
	qmsgswkjsgj_jieying_info:'回合开始时，若全场没有“营”，你获得一个“营”标记。结束阶段，你可以将“营”置于一名其他角色的武将牌旁；有“营”的角色摸牌阶段多摸一张牌、出牌阶段可多使用一张【杀】、手牌上限+1。有“营”的其他角色回合结束后，移去“营”，然后你获得其所有牌。',

	qmsgswkjsgj_re_sunhanhua:'界孙寒华',
	qmsgswkjsgj_re_sunhanhua_prefix:'界',
	qmsgswkjsgj_chongxu:'冲虚',
	qmsgswkjsgj_chongxu_info:'出牌阶段限一次，你可以随机演奏一首音乐，并根据完成度来获得相应的分数（至多五分）。然后你可修改〖妙剑〗或〖莲华〗（消耗2分），并使用剩余的分数进行摸牌（每张1分）。',
	qmsgswkjsgj_miaojian:'妙剑',
	qmsgswkjsgj_miaojian_info:'出牌阶段限一次，你可以将一张基本牌当作刺【杀】使用，该刺【杀】不计入次数限制。',
	qmsgswkjsgj_miaojian1:'妙剑·改',
	qmsgswkjsgj_miaojian1_info:'出牌阶段限一次，你可以视为使用一张刺【杀】，该刺【杀】不计入次数限制。',
	qmsgswkjsgj_miaojian2:'妙剑·极',
	qmsgswkjsgj_miaojian2_info:'出牌阶段限一次，你可以视为使用一张刺【杀】，该刺【杀】不计入次数限制且无距离限制。',
	qmsgswkjsgj_lianhua:'莲华',
	qmsgswkjsgj_lianhua_info:'你成为其他角色【杀】的目标后，你摸一张牌，然后进行一次判定，若结果为黑桃，则取消之。',
	qmsgswkjsgj_lianhua1:'莲华·改',
	qmsgswkjsgj_lianhua1_info:'你成为其他角色【杀】的目标后，你摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果为黑桃，则取消之。',
	qmsgswkjsgj_lianhua2:'莲华·极',
	qmsgswkjsgj_lianhua2_info:'你成为其他角色【杀】的目标后，你摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果为黑色，则取消之。',

























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

	sgsxjxfzmnl_wenyang:'仙界文鸯',
	sgsxjxfzmnl_wenyang_prefix:'仙界',
	sgsxjxfzmnl_quedi:'却敌',
	sgsxjxfzmnl_quedi_info:'每回合限两次。当你使用【杀】或【决斗】指定唯一目标后，你可选择：①获得目标角色的一张手牌。②弃置一张基本牌，并令此牌的伤害值基数+1。③背水：减1点体力上限，然后依次执行上述所有选项。',
	sgsxjxfzmnl_chuifeng:'椎锋',
	sgsxjxfzmnl_chuifeng_info:'魏势力技。你可以失去1点体力并视为使用一张【决斗】（你死亡后仍然结算）。当你因此【决斗】而受到伤害时，你防止此伤害。',
	sgsxjxfzmnl_chongjian:'冲坚',
	sgsxjxfzmnl_chongjian_backup: "冲坚",
	sgsxjxfzmnl_chongjian_info:'吴势力技。你可以将一张装备牌当做一种【杀】（无距离限制无次数限制且无视防具）或【酒】使用。当你以此法使用【杀】造成伤害后，你获得目标角色装备区内的X张牌（X为伤害值）。',
	// sgsxjxfzmnl_choujue:'仇决',
	// sgsxjxfzmnl_choujue_info:'锁定技。当你杀死其他角色后，你加1点体力上限并摸两张牌，然后你本回合发动〖却敌〗的次数上限+1。',

	sgsxjxfzmnl_re_jushou:'仙界界沮授',
	sgsxjxfzmnl_re_jushou_prefix:'仙界界',
	sgsxjxfzmnl_rejianying:'渐营',
	sgsxjxfzmnl_rejianying_info:'①当你于出牌阶段内使用与此阶段你使用的上一张牌点数或花色相同的牌时，你可以摸一张牌。②出牌阶段限两次，你可以将一张牌当做任意基本牌使用。若你于此阶段内使用的上一张牌有花色，则此牌的花色视为上一张牌的花色',
	sgsxjxfzmnl_reshibei:'矢北',
	sgsxjxfzmnl_reshibei_info:'锁定技，当你受到伤害后，若此是你本回合奇数次受到伤害，你回复1点体力。',

	sgsxjxfzmnl_shen_ganning:'仙界神甘宁',
	sgsxjxfzmnl_shen_ganning_prefix:'仙界神',
	sgsxjxfzmnl_drltpoxi:'魄袭',
	sgsxjxfzmnl_drltpoxi_info:'出牌阶段，你可以观看一名其他角色的手牌，然后你可以弃置你与其手牌中的四张花色不同的牌。若如此做，根据此次弃置你的牌的数量执行以下效果：零张，增加1点体力上限；一张，摸一张牌；三张，你回复1点体力；四张，摸四张牌。',
	sgsxjxfzmnl_drltjieying:'劫营',
	sgsxjxfzmnl_drltjieying_info:'回合开始时，若场上没有拥有“营”标记的角色，你获得1个“营”标记；结束阶段，你可以将你的一个“营”标记交给一名角色；有“营”标记的角色摸牌阶段多摸一张牌，出牌阶段使用【杀】的次数上限+1，手牌上限+1，此数值对你翻倍。有“营”的其他角色回合结束时，其移去“营”标记，然后你获得其所有手牌。',
	






	











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