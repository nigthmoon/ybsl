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
	sgskjdbzjms_cuiti_info:`觉醒技，回合开始阶段，若你至少拥有三个“淬炼”标记，你增加1点体力上限，并回复1点体力，获得技能${get.poptip('gzbuqu')}。`,

	sgskjdbzjms_shen_zhugeliang:'魂神诸葛亮',
	sgskjdbzjms_shen_zhugeliang_prefix:'魂神',
	sgskjdbzjms_zhongwu:'忠武',
	sgskjdbzjms_zhongwu_info:'锁定技，摸牌阶段，你多摸一张牌；出牌阶段，你多出一张杀；手牌上限+2。',
	sgskjdbzjms_kuangfeng:'狂风',
	sgskjdbzjms_kuangfeng_info:'结束阶段，你可以弃置任意张“星”并指定等量名角色：直到你的下回合开始，这些角色受到火焰伤害时，此伤害+1。',
	sgskjdbzjms_tianshi:'天时',
	sgskjdbzjms_tianshi_info:`觉醒技，准备阶段，若你的“星”全部使用完，或者你主动舍弃所有的“星”，然后你减少1点体力上限，获得技能${get.poptip('sgskjdbzjms_boxing')}。`,
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
	sgskjdbzjms_taoyuan_info:`觉醒技，准备阶段，若你的体力值为3，你可以选择至多三名角色，使其回复1点体力，然后补充手牌至体力上限，然后你增加3点体力上限，回复3点体力，摸三张牌。然后你获得技能${get.poptip('sgskjdbzjms_juguo')}和${get.poptip('sgskjdbzjms_qingfu')}。`,
	sgskjdbzjms_juguo:'举国',
	sgskjdbzjms_juguo_info:'出牌阶段限一次，你可以弃置三张手牌，然后令所有其他角色失去1点体力并弃置一张手牌。',
	sgskjdbzjms_qingfu:'倾覆',
	sgskjdbzjms_qingfu_info:`锁定技，你每使用一次${get.poptip('sgskjdbzjms_juguo')}，你选择一项：①失去1点体力，②减少1点体力上限。`,

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




























	qmsgswkjsgj:'全民三国杀，我开局神郭嘉',
	qmsgswkjsgj_info:'全民三国杀，我开局神郭嘉<br>平台：番茄小说<br>作者：天一笙水',
	
	qmsgswkjsgj_zrlinan:'林安',













	qmsgswkjsgj_re_xizhicai:'星月界戏志才',
	qmsgswkjsgj_re_xizhicai_prefix:'星月界',
	qmsgswkjsgj_xianfu:'先辅',
	qmsgswkjsgj_xianfu_info:'锁定技，游戏开始时，你选择一名其他角色，当其受到伤害后，你受到等量的伤害，当其回复体力后，你回复等量的体力。当先辅角色阵亡时，或回合开始时，你可以改变先辅目标。',
	qmsgswkjsgj_xianfu_append:'据作者口胡，这个伤害能发动“悲歌”。',
	qmsgswkjsgj_xianfu2:'先辅',
	qmsgswkjsgj_xianfu3:'先辅',
	tiandu_xizhicai:'天妒',
	tiandu_xizhicai_info:'此技能仅提供一条语音。',
	qmsgswkjsgj_chouce:'筹策',
	qmsgswkjsgj_chouce_info:`当你受到1点伤害后，你可以判定，若结果为：黑色，你可以移动场上一张牌或获得一名其他角色的一张手牌；红色，你选择一名角色，其摸一张牌，若其是${get.poptip('qmsgswkjsgj_xianfu')}选择的角色，改为其摸两张牌。若如此做，你可以将一张手牌交给任意角色。`,

	qmsgswkjsgj_re_liuxie:'星月界刘协',
	qmsgswkjsgj_re_liuxie_prefix:'星月界',
	qmsgswkjsgj_tianming:'天命',
	qmsgswkjsgj_tianming_info:'当你成为【杀】的目标后，你可以摸两张牌。',
	qmsgswkjsgj_mizhao:'密诏',//【杀】或【火杀】或【雷杀】
	qmsgswkjsgj_mizhao_info:'出牌阶段限一次，你可以将所有手牌交给一名其他角色。若如此做，你令该角色与你指定的另一名有手牌的角色拼点，视为拼点赢的角色对没赢的角色使用一张雷/火/普通【杀】。',

	qmsgswkjsgj_shen_zhaoyun:'星月神赵云',
	qmsgswkjsgj_shen_zhaoyun_prefix:'星月神',
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
	// qmsgswkjsgj_taiping: "太平",
	// qmsgswkjsgj_taiping_info: "锁定技，摸牌阶段摸牌时，你的摸牌数量+2。",
	// qmsgswkjsgj_taiping_append: "黑无常赐福。",
	// qmsgswkjsgj_baolian:'暴敛',
	// qmsgswkjsgj_baolian_info: "锁定技，结束阶段，你摸两张牌。",
	// qmsgswkjsgj_baolian_append: "白无常赐福。",

	qmsgswkjsgj_shen_guojia:'星月神郭嘉',
	qmsgswkjsgj_shen_guojia_prefix:'星月神',
	qmsgswkjsgj_reshuishi:'慧识',
	qmsgswkjsgj_reshuishi_info: "出牌阶段限一次。若你的体力上限小于10，你可进行判定。若判定结果与本次发动技能时的其他判定结果的花色均不相同且你的体力上限小于10，则你加1点体力上限，且可以重复此流程。然后你将所有位于处理区的判定牌交给一名角色。若其手牌数为全场最多，则你减1点体力上限。（全民三国杀我开局神郭嘉的慧识。据作者剧情实战，天妒回收后不计入已判定）",

	qmsgswkjsgj_re_sp_duyu:'星月界杜预',
	qmsgswkjsgj_re_sp_duyu_prefix:'星月界',
	qmsgswkjsgj_spwuku: "武库",
	qmsgswkjsgj_spwuku_info: "锁定技，当有角色使用装备牌时，则你获得一个“武库”。",
	qmsgswkjsgj_spsanchen: "三陈",
	qmsgswkjsgj_spsanchen_info: `觉醒技，若你的“武库”数大于2，则你加1点体力上限并回复1点体力，然后获得${get.poptip('spmiewu')}。`,

	qmsgswkjsgj_gui_liubei:'黑无常赐福刘备',
	qmsgswkjsgj_gui_liubei_prefix:'黑无常赐福',

	qmsgswkjsgj_gui_re_zhouyu:'白无常赐福界周瑜',
	qmsgswkjsgj_gui_re_zhouyu_prefix:'白无常赐福',

	qmsgswkjsgj_shen_zhugeliang:'星月神诸葛亮',
	qmsgswkjsgj_shen_zhugeliang_prefix:'星月神',
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
	qmsgswkjsgj_guanxing_info:'准备阶段，你可以观看牌堆顶的七张牌，然后将其中一张扣置于你的武将牌上称为“星”，然后将其中任意数量的牌置于牌堆顶，将其余的牌置于牌堆底。',

	qmsgswkjsgj_sb_huangzhong:'星月谋黄忠',
	qmsgswkjsgj_sb_huangzhong_prefix:'星月谋',
	qmsgswkjsgj_sbliegong: "烈弓",
	qmsgswkjsgj_sbliegong_info:'①你使用【杀】可以选择你距离不大于此【杀】点数的角色为目标。②当你使用牌时，或成为其他角色使用牌的目标后，你记录此牌的花色。③当你使用【杀】或伤害锦囊指定唯一目标后，若你〖烈弓②〗的记录不为空，则你可亮出牌堆顶的X张牌（X为你〖烈弓②〗记录过的花色数-1），令此牌的伤害值基数+Y（Y为亮出牌中被〖烈弓②〗记录过花色的牌的数量），且目标角色不能使用〖烈弓②〗记录过花色的牌响应此牌。此牌使用结算结束后，你清除〖烈弓②〗的记录。',

	qmsgswkjsgj_re_yangbiao:'星月界杨彪',
	qmsgswkjsgj_re_yangbiao_prefix:'星月界',
	qmsgswkjsgj_zhaohan:'昭汉',
	qmsgswkjsgj_zhaohan_info:'锁定技，游戏开始后的前四个准备阶段，你加1点体力上限并回复1点体力。之后的三个准备阶段，你受到1点无来源伤害。',
	qmsgswkjsgj_rangjie:'让节',
	qmsgswkjsgj_rangjie_info:'当你受到1点伤害后，你可以选择一项并令一名角色摸一张牌：1.移动场上一张牌；2.从牌堆获得一张你指定类型的牌。',
	qmsgswkjsgj_yizheng:'义争',
	qmsgswkjsgj_yizheng_info:'出牌阶段限一次，你可以与一名角色拼点：若你赢，跳过其下个摸牌阶段；若你没赢，你受到其对你造成的1点伤害。',
	
	qmsgswkjsgj_re_luotong:'星月界骆统',
	qmsgswkjsgj_re_luotong_prefix:'星月界',
	qmsgswkjsgj_qinzheng:'勤政',
	qmsgswkjsgj_qinzheng_info:'锁定技，你每使用或打出：两张牌时，你随机从牌堆或弃牌堆获得一张【杀】或【闪】或【桃】或【酒】；五张牌时，你随机从牌堆或弃牌堆获得一张【决斗】或【过河拆桥】；八张牌时，你随机从牌堆或弃牌堆获得一张【无中生有】或【顺手牵羊】。',

	qmsgswkjsgj_re_liuyan:'星月界刘焉',
	qmsgswkjsgj_re_liuyan_prefix:'星月界',
	qmsgswkjsgj_tushe:'图射',
	qmsgswkjsgj_tushe_info:'当你使用牌指定目标后，若你没有基本牌，则你可以摸X张牌。（X为此牌指定的目标数）',
	qmsgswkjsgj_limu:'立牧',
	qmsgswkjsgj_limu_info:'出牌阶段，你可以将一张红牌当做【乐不思蜀】对自己使用，然后回复1点体力。若你的判定区内有牌，你对攻击范围内的其他角色使用牌便没有次数和距离限制，且可以将一种花色的所有手牌当普通杀使用，出牌阶段每种花色限一次。',
	// qmsgswkjsgj_limu_append:'暂定每回合每种花色限一次。看后面作者怎么解释吧。',
	qmsgswkjsgj_limu_sha:'立牧',
	qmsgswkjsgj_limu_sha_info:'将一种花色的所有手牌当普通【杀】使用，出牌阶段每种花色限一次',
	qmsgswkjsgj_pianan:'偏安',
	qmsgswkjsgj_pianan_info:'锁定技，当你受到伤害时，若你的判定区有牌，你弃置其中一张，防止此伤害。',

	qmsgswkjsgj_re_lusu:'星月界鲁肃',
	qmsgswkjsgj_re_lusu_prefix:'星月界',
	qmsgswkjsgj_haoshi:'好施',
	qmsgswkjsgj_haoshi_info:'摸牌阶段，你可以多摸两张牌，然后若你的手牌数大于5，则你可以将一半的手牌（向下取整）交给一名其他角色，然后直到你的回合开始，当你成为【杀】或普通锦囊牌的目标后，其可将一张手牌交给你。',

	qmsgswkjsgj_re_caiwenji:'星月界蔡文姬',
	qmsgswkjsgj_re_caiwenji_prefix:'星月界',
	qmsgswkjsgj_beige:'悲歌',
	qmsgswkjsgj_beige_info:'当有角色受到【杀】造成的伤害后，你可以弃一张牌，若此牌花色为：♥该角色回复X点体力(X为伤害点数)；♦︎该角色摸三张牌；♣伤害来源弃三张牌；♠伤害来源将其武将牌翻面。',

	qmsgswkjsgj_re_caorui:'星月界曹叡',
	qmsgswkjsgj_re_caorui_prefix:'星月界',
	qmsgswkjsgj_mingjian:'明鉴',
	qmsgswkjsgj_mingjian_info:'出牌阶段开始时，你可以将所有手牌交给一名其他角色，然后你结束此阶段，其执行一个额外的出牌阶段，本出牌阶段其可以多使用一张【杀】。若如此做，直到该角色下个回合结束，其手牌上限+1。',
	//作者描述原文一塌糊涂，正好现在的剧情，这个曹叡登场了，我看看剧情里是什么结算，然后好根据作者口胡调整描述

	qmsgswkjsgj_re_zhangxiu:'星月界张绣',
	qmsgswkjsgj_re_zhangxiu_prefix:'星月界',
	qmsgswkjsgj_xiongluan:'雄乱',
	qmsgswkjsgj_xiongluan_info:'限定技，出牌阶段，你可以废除你的判定区和装备区，然后指定一名其他角色。直到回合结束，你对其使用牌无距离和次数限制，其不能使用和打出手牌。你每废除一个装备栏，可以摸一张牌。',

	qmsgswkjsgj_re_fuhuanghou:'星月界伏皇后',
	qmsgswkjsgj_re_fuhuanghou_prefix:'星月界',
	qmsgswkjsgj_zhuikong:'惴恐',
	qmsgswkjsgj_zhuikong_info:'其他角色的回合开始时，若你已受伤，你可以与该角色拼点。若你赢，该角色跳过本回合的出牌阶段。若你没赢，你获得其的拼点牌，然后其视为对你使用一张【杀】。',

	qmsgswkjsgj_shen_ganning:'星月神甘宁',
	qmsgswkjsgj_shen_ganning_prefix:'星月神',
	qmsgswkjsgj_poxi:'魄袭',
	qmsgswkjsgj_poxi_info:'出牌阶段限一次，你可以观看一名其他角色的手牌，然后你可以弃置你与其手里共计四张牌。若如此做，根据此次弃置你的牌数量执行以下效果：零张，体力上限减1；一张，你本回合手牌上限-1；三张，你回复1点体力；四张，你摸五张牌。',
	qmsgswkjsgj_jieying:'劫营',
	qmsgswkjsgj_jieying_info:'回合开始时，若全场没有“营”，你获得一个“营”标记。结束阶段，你可以将“营”置于一名其他角色的武将牌旁；有“营”的角色摸牌阶段多摸一张牌、出牌阶段可多使用一张【杀】、手牌上限+1。有“营”的其他角色回合结束后，移去“营”，然后你获得其所有牌。',

	qmsgswkjsgj_re_sunhanhua:'星月界孙寒华',
	qmsgswkjsgj_re_sunhanhua_prefix:'星月界',
	qmsgswkjsgj_chongxu:'冲虚',
	qmsgswkjsgj_chongxu_info:'出牌阶段限一次，你可以随机演奏一首音乐，并根据完成度来获得相应的分数（至多五分）。然后你可修改〖妙剑〗或〖莲华〗（消耗2分），并使用剩余的分数进行摸牌（每张1分）。',
	qmsgswkjsgj_miaojian:'妙剑',
	qmsgswkjsgj_miaojian_info:'出牌阶段限一次，你可以将一张基本牌当作刺【杀】使用，该刺【杀】不计入次数限制。',
	qmsgswkjsgj_miaojian1:'妙剑·改',
	qmsgswkjsgj_miaojian1_info:'出牌阶段限一次，你可以视为使用一张刺【杀】，该刺【杀】不计入次数限制。',
	qmsgswkjsgj_miaojian2:'妙剑·极',
	qmsgswkjsgj_miaojian2_info:'出牌阶段限一次，你可以视为使用一张刺【杀】，该刺【杀】不计入次数限制且无距离限制。',
	qmsgswkjsgj_shhlianhua:'莲华',
	qmsgswkjsgj_shhlianhua_info:'你成为其他角色【杀】的目标后，你摸一张牌，然后进行一次判定，若结果为黑桃，则取消之。',
	qmsgswkjsgj_shhlianhua1:'莲华·改',
	qmsgswkjsgj_shhlianhua1_info:'你成为其他角色【杀】的目标后，你摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果为黑桃，则取消之。',
	qmsgswkjsgj_shhlianhua2:'莲华·极',
	qmsgswkjsgj_shhlianhua2_info:'你成为其他角色【杀】的目标后，你摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果为黑色，则取消之。',

	qmsgswkjsgj_yingtian_simayi:'星月应天神司马懿',
	qmsgswkjsgj_yingtian_simayi_prefix:'星月应天神',
	qmsgswkjsgj_jilin:'戢鳞',
	qmsgswkjsgj_jilin_info:'①游戏开始时，你将牌堆顶三张牌暗置于你的武将牌上，称为“志”。②当你成为其他角色使用牌的目标时，你可以明置一张暗置的“志”令此牌对你无效。③回合开始时，你可用任意张手牌替换等量暗置的“志”。',

	qmsgswkjsgj_re_shen_zhaoyun:'星月界神赵云',
	qmsgswkjsgj_re_shen_zhaoyun_prefix:'星月界神',
	qmsgswkjsgj_rejuejing:'绝境',
	qmsgswkjsgj_rejuejing_info:'锁定技，你的手牌上限+2。你进入或脱离濒死状态时，你摸两张牌。摸牌阶段，你令额定摸牌数+X（X为你已损失的体力值）。',

	qmsgswkjsgj_shen_lusu:'星月神鲁肃',
	qmsgswkjsgj_shen_lusu_prefix:'星月神',
	qmsgswkjsgj_tamo: "榻谟",
	qmsgswkjsgj_tamo_info: "游戏开始时，你可以重新分配所有角色的座次。",
	qmsgswkjsgj_tamo_faq: "FAQ",
	qmsgswkjsgj_tamo_faq_info: "<br><li>Q：在一号位不为主公的情况下，〖榻谟〗如何结算？</li><li>A：该角色可以正常进行座次交换。若受此技能影响导致一号位角色发生了变化，则以排列后的一号位角色为起始角色开始本局游戏。</li>",
	qmsgswkjsgj_dingzhou: "定州",
	qmsgswkjsgj_dingzhou_info: "出牌阶段限一次，玩家交给一名角色一张牌 ，然后玩家获得其场上的所有牌。",
	//也不知道作者抽啥风，不说你，说玩家
	qmsgswkjsgj_zhimeng: "智盟",
	qmsgswkjsgj_zhimeng_info: "玩家的回合结束后，玩家可以选择一名其他角色，玩家与其交换手牌。",
	
	qmsgswkjsgj_re_sunquan:'星月界孙权',
	qmsgswkjsgj_re_sunquan_prefix:'星月界',
	qmsgswkjsgj_rezhiheng: "制衡",
	qmsgswkjsgj_rezhiheng_info: "出牌阶段限一次，你可以摸X+1张牌，然后弃置X张牌。（X为你的牌数量。）",
	qmsgswkjsgj_rejiuyuan: "救援",
	qmsgswkjsgj_rejiuyuan_info: "主公技，当其他吴势力角色回复体力时，其可以改为令你回复1点体力，然后其摸一张牌。",
	
	qmsgswkjsgj_shen_zhouyu:'星月神周瑜',
	qmsgswkjsgj_shen_zhouyu_prefix:'星月神',
	qmsgswkjsgj_qinyin: "琴音",
	qmsgswkjsgj_qinyin_info: "弃牌阶段结束时，你可以选择一项：1.令你选择的任意名角色各回复1点体力；2.令你选择的任意角色各失去1点体力或对其各造成一点伤害。",
	qmsgswkjsgj_yeyan: "业炎",
	qmsgswkjsgj_yeyan_info: "出牌阶段限一次，你可以选择至多三名角色，对这些角色造成共计至多3点火焰伤害（若你将对一名角色分配2点或更多火焰伤害，你须先弃置四张花色各不相同的手牌）。",
	qmsgswkjsgj_refanjian:'反间',
	qmsgswkjsgj_refanjian_info:'出牌阶段限一次，你可以展示一张手牌并交给一名其他角色，令其展示所有手牌，然后你选择一项：1.弃置其与此牌花色相同的所有牌；2.令其失去1点体力或对其造成1点伤害。',
	qmsgswkjsgj_refanjian_card: "弃牌",
	qmsgswkjsgj_refanjian_hp: "失去体力",

	qmsgswkjsgj_shen_xunyu: "星月神荀彧",
	qmsgswkjsgj_shen_xunyu_prefix: "星月神",
	qmsgswkjsgj_tianzuo: "天佐",
	qmsgswkjsgj_tianzuo_info: `锁定技。①游戏开始时，你将十六张${get.poptip("qizhengxiangsheng")}加入牌堆。②${get.poptip("qizhengxiangsheng")}对你无效。③出牌阶段限一次，你可视为使用一张${get.poptip("qizhengxiangsheng")}。`,
	qmsgswkjsgj_lingce: "灵策",
	qmsgswkjsgj_lingce_info: `锁定技。当有${get.poptip("qizhengxiangsheng")}或智囊或〖定汉①〗记录过的锦囊牌被使用时，则你摸一张牌。你以此法摸的牌，不计入手牌上限。`,
	qmsgswkjsgj_dinghan: "定汉",
	qmsgswkjsgj_dinghan_info: "①当你成为未记录过的普通锦囊牌的目标时，或有未记录过的延时锦囊牌进入你的判定区时，你记录此牌名并取消之。②准备阶段或你受到一点伤害后，你可在〖定汉①〗的记录中添加或减少一种锦囊牌的牌名。",
	//这里作者把准备阶段写成了回合开始，我懒得多改代码，就帮他改过来了
	qmsgswkjsgj_shenquhu:'驱虎',
	qmsgswkjsgj_shenquhu_info:'出牌阶段限一次，你可以与一名角色拼点：若你赢，你令该角色对其攻击范围内的另一名角色造成1点伤害；若你没赢，其对你造成1点伤害。',

	qmsgswkjsgj_shenxing:'神性',
	qmsgswkjsgj_shenxing_info:`每轮游戏开始时，若你没有装备${get.poptip("mb_qingnangshu")}，你可将${get.poptip("mb_qingnangshu")}置入你的装备区。${get.poptip("mb_qingnangshu")}离开你的装备区时，立刻销毁。`,
	qmsgswkjsgj_shenxing2:'神性',
	qmsgswkjsgj_shenxing2_info:`每轮游戏开始时，若你没有装备${get.poptip("qmsgswkjsgj_chuanguoyuxi")}，你可将${get.poptip("mb_qingnangshu")}置入你的装备区。${get.poptip("mb_qingnangshu")}离开你的装备区时，立刻销毁。`,
	qmsgswkjsgj_shenxing3:'神性',
	qmsgswkjsgj_shenxing3_info:`每轮游戏开始时，若你没有装备${get.poptip("muniu")}，你可将${get.poptip("muniu")}置入你的装备区。${get.poptip("muniu")}离开你的装备区时，立刻销毁。`,
	//某一章开始，改为获得并使用，为了配合杜预叠标记
	qmsgswkjsgj_chuanguoyuxi:'传国玉玺',
	qmsgswkjsgj_chuanguoyuxi_info:'锁定技，弃牌阶段开始时，你摸一张牌且手牌上限永久+2。',
	qmsgswkjsgj_chuanguoyuxi_bg: "玺",
	// mb_chuanguoyuxi_info: "锁定技，弃牌阶段开始时，你摸一张牌且手牌上限永久+2，然后若你不为主公，你失去1点体力。",
	qmsgswkjsgj_chuanguoyuxi_append: '<span style="font-family: yuanli">受命于天，既寿永昌！</span>',
	qmsgswkjsgj_chuanguoyuxi_skill: "传国玉玺",
	qmsgswkjsgj_chuanguoyuxi_skill_info: "锁定技，弃牌阶段开始时，你摸一张牌且手牌上限永久+2。",
	
	qmsgswkjsgj_zhenshen:'真神',
	qmsgswkjsgj_zhenshen_info:'非神势力角色改变你横置或翻面状态时，取消之。',
	// qmsgswkjsgj_zhenshen_info:'非神武将无法影响你的神将状态，包括但不限于：技能失效，翻面，封锁手牌……',
	qmsgswkjsgj_zhenshen_append:'无语',
	//我可不什么都惯着这作者

	qmsgswkjsgj_shen_luxun:'星月神陆逊',
	qmsgswkjsgj_shen_luxun_prefix:'星月神',
	qmsgswkjsgj_resbqianxun:'谦逊',
	qmsgswkjsgj_resbqianxun_info:'当一张锦囊对你生效时，你可以将任意张手牌 扣置于武将牌上，若如此做，回合结束时，你获得武将牌上的所有牌。',
	qmsgswkjsgj_resblianying:'连营',
	qmsgswkjsgj_resblianying_info:'当你失去最后的手牌时，你可以摸一张牌。每回合结束时，你可观看牌堆顶的X张牌，然后将这些牌交给任意角色（X为你本回合失去的牌数，且至多为5）',
	qmsgswkjsgj_nzry_cuike: "摧克",
	qmsgswkjsgj_nzry_cuike_info: "出牌阶段，若“军略”标记的数量为奇数，你可以对一名角色造成1点伤害；若“军略”标记的数量为偶数，你可以横置一名角色并弃置其区域内的一张牌。然后，若“军略”标记的数量超过7个，你可以移去全部“军略”标记并对所有其他角色造成1点伤害。",
	qmsgswkjsgj_nzry_cuike_append: "一切以作者口胡（实战）为准",


	qmsgswkjsgj_shen_caocao:'星月神曹操',
	qmsgswkjsgj_shen_caocao_prefix:'星月神',
	qmsgswkjsgj_guixin:'归心',
	qmsgswkjsgj_guixin_info:'当你受到一点伤害后，你可以获得每名其他角色区域里的一张牌或摸一张牌。',
	qmsgswkjsgj_guixin_append:'拷打作者。描述不严谨。实际上应该说是：<br>当你受到一点伤害后，你可以获得每名其他角色区域里的一张牌，你可以放弃获得该角色的牌，然后摸一张牌。',
	qmsgswkjsgj_feiying:'飞影',
	qmsgswkjsgj_feiying_info:'锁定技，其他角色计算与你的距离+1，你计算与其他角色的距离-1。',

	qmsgswkjsgj_shen_lvbu:'星月神吕布',
	qmsgswkjsgj_shen_lvbu_prefix:'星月神',
	qmsgswkjsgj_shenfen:'神愤',
	qmsgswkjsgj_shenfen_info:'出牌阶段限一次，你可以弃置6枚“暴怒”标记，对任意其他角色各造成1点伤害。然后这些角色先各弃置其装备区里的牌，再各弃置六张手牌。',
	qmsgswkjsgj_baonu:'狂暴',
	qmsgswkjsgj_baonu_info: "锁定技，游戏开始时，你获得4枚“暴怒”标记；锁定技，当你造成/受到1点伤害后，你获得1枚“暴怒”标记。",
	qmsgswkjsgj_wumou: "无谋",
	qmsgswkjsgj_wumou_info: "锁定技，当你使用普通锦囊牌时，你选择一项：1.弃置1枚“暴怒”标记；2.失去1点体力。然后你摸一张牌。",
	qmsgswkjsgj_wuqian: "无前",
	qmsgswkjsgj_wuqian_info: `出牌阶段，你可以弃置2枚“暴怒”标记并选择一名本回合内未选择过的其他角色，然后直到回合结束，你对该角色使用牌没有次数限制，且令其防具无效。`,
	qmsgswkjsgj_wushuang:'无双',
	qmsgswkjsgj_wushuang_info:'锁定技。①你使用的【杀】需两张【闪】才能抵消；与你进行【决斗】的角色每次需要打出两张【杀】。②每回合限一次，当你使用【杀】或【决斗】造成伤害时，此伤害+1。',


	qmsgswkjsgj_re_caopi:'星月界曹丕',
	qmsgswkjsgj_re_caopi_prefix:'星月界',
	qmsgswkjsgj_rexingshang: "行殇",
	qmsgswkjsgj_rexingshang_info: "当其他角色死亡后，你可以获得其所有牌并回复一点体力。",
	qmsgswkjsgj_refangzhu: "放逐",
	qmsgswkjsgj_refangzhu_info: "当你受到1点伤害后，你可以选择令一名其他角色：摸X张牌并将武将牌翻面，或弃置X张牌并失去1点体力。（X为你已损失的体力值）",
	qmsgswkjsgj_songwei:'颂威',
	qmsgswkjsgj_songwei_info: "主公技，其他魏势力的角色的判定牌结果为黑色且生效后，你可以摸一张牌。",

	qmsgswkjsgj_re_shamoke:'星月界沙摩柯',
	qmsgswkjsgj_re_shamoke_prefix:'星月界',
	qmsgswkjsgj_gzjili: "蒺藜",
	qmsgswkjsgj_gzjili_info: "当你于一回合内使用或打出第X张牌时，你可以摸X张你指定类型的牌（X为你的攻击范围）。",

	qmsgswkjsgj_re_peixiu: "星月界裴秀",
	qmsgswkjsgj_re_peixiu_prefix: "星月界",
	qmsgswkjsgj_xingtu: "行图",
	qmsgswkjsgj_xingtu1: "倍数",
	qmsgswkjsgj_xingtu2: "约数",
	qmsgswkjsgj_xingtu_info: "锁定技。你失去牌时，若此牌的点数是X的约数或倍数，你摸一张牌且此牌无次数限制（X为你失去的上一张牌的点数）。",
	qmsgswkjsgj_xingtu_append:'作者说等以后需要的时候改改。',
	// qmsgswkjsgj_xingtu_append:'MD若制作者，谁教你这么突破的？',
	// qmsgswkjsgj_xingtu_info: "锁定技。你使用点数为X的倍数的牌无次数限制，你使用点数为X的约数的牌时摸一张牌（X为你本局游戏使用的上一张牌的点数）。",
	qmsgswkjsgj_juezhi: "爵制",
	qmsgswkjsgj_juezhi_info: "出牌阶段，你可以弃置至少两张牌，然后从牌堆中获得一张点数为Y的牌（Y为这些牌的点数和对13取余，余数为0时可以指定任意点数且额外获得一张）。",
	

	qmsgswkjsgj_re_shichangshi: "星月界十常侍",
	qmsgswkjsgj_re_shichangshi_prefix: "星月界",
	qmsgswkjsgj_mbdanggu: "党锢",
	qmsgswkjsgj_mbdanggu_info: "锁定技。①游戏开始时，你获得十张“常侍”牌，然后你进行一次结党。②当你修整结束后，你进行一次结党并摸两张牌。③若你有亮出的“常侍”牌，你视为拥有这些牌的技能。（全民三国杀我开局神郭嘉的十常侍专用）",
	qmsgswkjsgj_mbdanggu_faq: "关于结党",
	qmsgswkjsgj_mbdanggu_faq_info: "<br>系统随机选择一张未亮出过的“常侍”牌，然后选择四张未亮出过的“常侍”牌。你观看前者，然后从后者中选择一名认可前者的“常侍”牌。然后若此时不为双将模式，你将这两张武将牌作为你的武将牌（不移除原有技能）；否则你获得这两张武将牌上的技能。",
	qmsgswkjsgj_mbdanggu_faq2: "关于认可",
	qmsgswkjsgj_mbdanggu_faq2_info: "<br>双向不认可常侍为固定组合：<br><li>郭胜、段珪<br><li>韩悝、毕岚<br>单向不认可常侍为系统随机分配。<br>每次结党至多存在一张不认可主将的常侍牌，且若此次结党仅有一张常侍牌，则不会存在不认可情况。",
	//殁亡貌似没变化
	//谁说的没变化？检测的目标常侍牌都变了
	qmsgswkjsgj_mbmowang: "殁亡",
	qmsgswkjsgj_mbmowang_info: "锁定技。①当你死亡前，若你有未亮出的“常侍”牌且体力上限大于0，你将死亡改为修整至你的下个回合开始前，然后你复原武将牌，且不于此次死亡事件中进行展示身份牌、检测游戏胜利条件与执行奖惩的流程。②回合结束后，你死亡。（全民三国杀我开局神郭嘉的十常侍专用）",
	qmsgswkjsgj_mbmowang_faq: "关于修整",
	qmsgswkjsgj_mbmowang_faq_info: "<br>将武将牌移出游戏（视为你存活）。当该角色修整结束，其移回游戏。",
	qmsgswkjsgj_scs_zhangrang: "星月张让",
	qmsgswkjsgj_scs_zhangrang_prefix: "星月",
	qmsgswkjsgj_scstaoluan: "滔乱",
	qmsgswkjsgj_scstaoluan_info: "出牌阶段限一次。你可以视为使用任意一种基本牌或普通锦囊牌。",
	qmsgswkjsgj_scs_zhaozhong: "星月赵忠",
	qmsgswkjsgj_scs_zhaozhong_prefix: "星月",
	qmsgswkjsgj_scschiyan: "鸱咽",
	qmsgswkjsgj_scschiyan_info: "①当你使用【杀】指定目标后，你可以将其的两张牌置于其武将牌上，然后其于当前回合结束时获得这些牌。②当你因执行【杀】的效果对一名角色造成伤害时，若该角色的手牌数和装备区内的牌数均不大于你，此伤害+1。",
	qmsgswkjsgj_scs_sunzhang: "星月孙璋",
	qmsgswkjsgj_scs_sunzhang_prefix:"星月",
	qmsgswkjsgj_scszimou: "自谋",
	qmsgswkjsgj_scszimou_info: "锁定技。出牌阶段，当你使用第一/二/三张牌时，你从牌堆中获得一张【酒】/【杀】/【决斗】。",
	qmsgswkjsgj_scs_bilan: "星月毕岚",
	qmsgswkjsgj_scs_bilan_prefix: "星月",
	qmsgswkjsgj_scspicai: "庀材",
	qmsgswkjsgj_scspicai_info: "出牌阶段限一次。你可进行判定牌不置入弃牌堆的判定。若判定结果与本次发动技能时的其他判定结果的数字均不相同，则你可以重复此流程。然后你将所有位于处理区的判定牌交给一名角色。",
	qmsgswkjsgj_scs_xiayun: "星月夏恽",
	qmsgswkjsgj_scs_xiayun_prefix: "星月",
	qmsgswkjsgj_scsyaozhuo: "谣诼",
	qmsgswkjsgj_scsyaozhuo_info: "出牌阶段限一次。你可以与一名角色拼点，若你没输，其跳过下一个摸牌阶段。",
	//不知道赢和没输有啥区别
	qmsgswkjsgj_scs_hankui: "星月韩悝",
	qmsgswkjsgj_scs_hankui_prefix: "星月",
	qmsgswkjsgj_scsxiaolu: "宵赂",
	qmsgswkjsgj_scsxiaolu_info: "出牌阶段限一次。你可以摸四张牌，然后选择一项：1.弃置四张手牌；2.将四张手牌交给一名其他角色。",
	qmsgswkjsgj_scs_lisong: "星月栗嵩",
	qmsgswkjsgj_scs_lisong_prefix: "星月",
	qmsgswkjsgj_scskuiji: "窥机",
	qmsgswkjsgj_scskuiji_info: "出牌阶段限一次。你可以观看一名其他角色的手牌，然后弃置你与其的共计四张牌。",
	//花色去掉了，手也去掉了……
	qmsgswkjsgj_scs_duangui: "星月段珪",
	qmsgswkjsgj_scs_duangui_prefix: "星月",
	qmsgswkjsgj_scschihe: "叱吓",
	qmsgswkjsgj_scschihe_info: "当你使用【杀】指定唯一目标后，你可亮出牌堆顶的三张牌，令此【杀】的伤害值基数+X（X为亮出牌中花色与此【杀】相同的牌数），且目标角色不能使用亮出牌包含的花色的牌响应此【杀】。",
	qmsgswkjsgj_scs_guosheng: "星月郭胜",
	qmsgswkjsgj_scs_guosheng_prefix: "星月",
	qmsgswkjsgj_scsniqu: "逆取",
	qmsgswkjsgj_scsniqu_info: "出牌阶段限一次。你可以对一名角色造成2点火焰伤害。",
	qmsgswkjsgj_scs_gaowang: "星月高望",
	qmsgswkjsgj_scs_gaowang_prefix: "星月",
	///其实没变化哒
	// qmsgswkjsgj_scsanruo: "安弱",
	// qmsgswkjsgj_scsanruo_info: "你可以将一张♥牌当【桃】、♦牌当火【杀】、♣牌当【闪】、♠牌当【无懈可击】使用。当你以此法使用或打出【杀】或【闪】时，你可以获得对方的一张牌；当你以此法使用【桃】时，你可以获得一名其他角色的一张牌；当你以此法使用【无懈可击】时，你可以获得此牌响应的普通锦囊牌的使用者的一张牌。",
	// qmsgswkjsgj_scsmiaoyu: "妙语",
	// qmsgswkjsgj_scsmiaoyu_info: "你可以将至多两张相同花色的牌按照以下规则使用或打出：♦牌当作火【杀】，♥牌当作【桃】，♣牌当作【闪】，♠牌当作【无懈可击】。若你以此法使用了两张红色牌，则此牌回复值或伤害值+1。若你以此法使用了两张黑色牌，则你弃置当前回合角色一张牌。",

	qmsgswkjsgj_re_jushou:'星月界沮授',
	qmsgswkjsgj_re_jushou_prefix:'星月界',
	qmsgswkjsgj_rejianying:'渐营',
	qmsgswkjsgj_rejianying_info:'当你失去牌时，若此牌与你上一张失去的牌颜色或点数相同，泽尼可以摸一张牌。出牌阶段限一次，你可以将一张牌当做任意基本牌使用，且不计入次数限制。若你于此阶段内使用的上一张牌有花色，则此牌的花色视为上一张牌的花色。',
	// 矢北本质上是十周年矢北
	qmsgswkjsgj_shen_huatuo: "星月手杀神华佗",
	qmsgswkjsgj_shen_huatuo_prefix: "星月手杀神",
	qmsgswkjsgj_qingnang:'青囊',
	qmsgswkjsgj_qingnang_info:'出牌阶段限一次，你可以令一名角色回复一点体力。',
	qmsgswkjsgj_jijiu:'急救',
	qmsgswkjsgj_jijiu_info:'你于回合外可以将一张红色牌当【桃】使用，其他角色使用【桃】时，你摸一张牌。',


	qmsgswkjsgj_wuling_append:'最后一段的修改顺序我没写，懒',
	qmsgswkjsgj_wuling: "五灵",
	qmsgswkjsgj_wuling_info: `⓪你始终拥有“五灵”标记，并按照你指定的顺序获得“五禽戏”。①美轮游戏开始时限两次。你可以选择一名没有“${get.poptip({
		id: "qmsgswkjsgj_wl_wuqinxi",
		name: "五禽戏",
		type: "character",
		info: `“五禽戏”分为“虎、鹿、熊、猿、鹤”五个不同的效果：<span style='font-family: yuanli'>
				<br><li>虎：当你使用牌对目标角色造成伤害时，此伤害+1。
				<br><li>鹿：①当你获得此效果时，你回复2点体力并弃置判定区的所有牌。②你不能成为延时锦囊牌的目标。
				<br><li>熊：当你受到伤害时，此伤害-1。
				<br><li>猿：当你获得此效果时，你选择一名其他角色，获得其装备区里的牌。
				<br><li>鹤：当你获得此效果时，你摸五张牌。
			</span>`,
	})}”的角色，按照你选择的顺序向其传授“${get.poptip("qmsgswkjsgj_wl_wuqinxi")}”，且其获得如下效果：其获得你选择的第一种“${get.poptip("qmsgswkjsgj_wl_wuqinxi")}”的效果，并在其每个准备阶段移除当前“${get.poptip("qmsgswkjsgj_wl_wuqinxi")}”的效果并切换为下一种。`,
	//②出牌阶段，你可以重新调整拥有“五灵”标记角色后续未触发的“五禽戏”顺序。
	//当你死亡时，你令场上的角色失去你传授的“${get.poptip("qmsgswkjsgj_wl_wuqinxi")}”
	qmsgswkjsgj_wuling_wuqinxi: "五禽戏",
	get qmsgswkjsgj_wuling_wuqinxi_info() {
		return lib.poptip.getInfo("qmsgswkjsgj_wl_wuqinxi");
	},
	qmsgswkjsgj_youyi: "游医",
	qmsgswkjsgj_youyi_info: "①弃牌阶段结束时，你可以将所有于此阶段弃置的牌置入仁区。②出牌阶段限一次。你可以将仁区的所有牌置入弃牌堆，令所有角色各回复1点体力。",
	qmsgswkjsgj_wuqinxi_hu: "虎",
	qmsgswkjsgj_wuqinxi_hu_bg: "虎",
	qmsgswkjsgj_wuqinxi_hu_info: "当你使用牌对目标角色造成伤害时，此伤害+1。",
	qmsgswkjsgj_wuqinxi_hu_append: "作者原文是：你使用牌对目标角色造成伤害时，令此牌对其中一个目标造成的伤害值+1。",
	//我的【评价是：云玩家还想吃这碗饭
	qmsgswkjsgj_wuqinxi_lu: "鹿",
	qmsgswkjsgj_wuqinxi_lu_bg: "鹿",
	qmsgswkjsgj_wuqinxi_lu_info: "①当你获得此效果时，你回复2点体力并弃置判定区的所有牌。②你不能成为延时锦囊牌的目标。",
	qmsgswkjsgj_wuqinxi_xiong: "熊",
	qmsgswkjsgj_wuqinxi_xiong_bg: "熊",
	qmsgswkjsgj_wuqinxi_xiong_info: "当你受到伤害时，此伤害-1。",
	qmsgswkjsgj_wuqinxi_yuan: "猿",
	qmsgswkjsgj_wuqinxi_yuan_bg: "猿",
	qmsgswkjsgj_wuqinxi_yuan_info: "当你获得此效果时，你选择一名其他角色，获得其装备区里的牌。",
	qmsgswkjsgj_wuqinxi_he: "鹤",
	qmsgswkjsgj_wuqinxi_he_bg: "鹤",
	qmsgswkjsgj_wuqinxi_he_info: "当你获得此效果时，你摸五张牌。",

	qmsgswkjsgj_re_mb_caomao:'星月界曹髦',
	qmsgswkjsgj_re_mb_caomao_prefix:'星月界',
	qmsgswkjsgj_mbqianlong:'潜龙',
	qmsgswkjsgj_mbqianlong_info:`${get.poptip("rule_chihengji")}。①游戏开始时，你获得20枚“道心”标记。②当你得到牌后/受到1点伤害后/造成1点伤害后，你获得5/15/15枚“道心”（上限为99枚）。③若你的“道心”数不小于25/50/75/99，你视为拥有${get.poptip("qmsgswkjsgj_mbcmqingzheng")}/${get.poptip("qmsgswkjsgj_mbcmjiushi")}/${get.poptip("qmsgswkjsgj_mbcmfangzhu")}/${get.poptip("qmsgswkjsgj_mbjuejin")}。`,
	qmsgswkjsgj_mbcmqingzheng: "清正",
	qmsgswkjsgj_mbcmqingzheng_info: `${get.poptip("rule_chihengji")}。出牌阶段开始时，你可以弃置一种花色的所有手牌，并观看一名有手牌的其他角色的手牌，你弃置其中一种花色的所有牌。然后对其造成1点伤害。`,
	qmsgswkjsgj_mbcmjiushi: "酒诗",
	qmsgswkjsgj_mbcmjiushi_info: `${get.poptip("rule_chihengji")}。①当你需要使用【酒】时，若你的武将牌正面向上，你可以翻面，视为使用一张【酒】。②当你受到伤害后，若你武将牌背面朝上且未因此次伤害发动过〖酒诗〗，你可以翻面。③当你翻面后，你获得牌堆里的一张锦囊牌。`,
	qmsgswkjsgj_mbcmfangzhu: "放逐",
	qmsgswkjsgj_mbcmfangzhu_info: `${get.poptip("rule_chihengji")}。出牌阶段限一次，你可以选择一名其他角色，选择一项：⒈令其不能使用手牌中的一种类型牌直到其回合结束；⒉令其所有非Charlotte技能失效直到其回合结束。`,
	qmsgswkjsgj_mbjuejin: "决进",
	qmsgswkjsgj_mbjuejin_info: `${get.poptip("rule_chihengji")}，限定技。出牌阶段，你可以令所有角色依次将体力调整至1并获得X点护甲（X为一名角色以此法减少的体力值且你以此法获得的护甲数额外+2）。然后你将牌堆、弃牌堆、场上及所有角色手牌中的【闪】、【桃】和【酒】移出游戏且增加全局技能“${get.poptip({
		id: "juejin_xiangsicunwei",
		name: "向死存魏",
		type: "character",
		info: "当有牌进入弃牌堆后，系统将这些牌中的【闪】、【桃】和【酒】移出游戏。",
	})}”。（全民三国杀我开局神郭嘉的界曹髦）`,
	qmsgswkjsgj_mbweitong:'卫统',
	qmsgswkjsgj_mbweitong_info:`${get.poptip("rule_chihengji")}，主公技。游戏开始时，若你有${get.poptip("qmsgswkjsgj_mbqianlong")}，你改为获得60点道心值（全民三国杀我开局神郭嘉的界曹髦）。`,

	qmsgswkjsgj_mengpo_ab: "星月孟婆",
	qmsgswkjsgj_mengpo: "星月孟婆·孟姜女",
	qmsgswkjsgj_mengpo_prefix: "星月",

	// qmsgswkjsgj_shiyou: "拾忧",
	// qmsgswkjsgj_shiyou_info: "其他角色于弃牌阶段弃置的牌进入弃牌堆前，你可以选择其中任意张花色各不相同的牌获得之。",
	// qmsgswkjsgj_wanghun: "忘魂",
	// qmsgswkjsgj_wanghun_info: "锁定技，你死亡时，令随机两名敌方角色各随机失去一个技能（主公技除外），并在牌堆中加入2张回魂。(回魂只能在挑战模式出现)",
	// qmsgswkjsgj_wangshi: "往事",
	// qmsgswkjsgj_wangshi_info: "锁定技，你存活时，敌方角色的回合开始时，令其于本回合不能使用或打出随机一种类型的牌（基本、锦囊、装备）。",
	// qmsgswkjsgj_aotang:'熬汤',
	// qmsgswkjsgj_aotang_info:'孟婆回合开始时随机使一名敌方角色遗忘所有武将技能，持续至孟婆下回合开始。',
	qmsgswkjsgj_yunju:'云飓',
	qmsgswkjsgj_yunju_info:'锁定技，敌方角色的回合结束时随机弃置一张手牌。',

	qmsgswkjsgj_shen_sunce:'星月神孙策',
	qmsgswkjsgj_shen_sunce_prefix:'星月神',
	qmsgswkjsgj_yingba: "英霸",
	qmsgswkjsgj_yingba_info: "①出牌阶段限两次，你可令一名其他角色减少1点体力上限并获得“平定”标记，然后你减少1点体力上限。②你对拥有“平定”标记的角色使用牌没有距离限制和次数限制。",
	qmsgswkjsgj_scfuhai: "覆海",
	qmsgswkjsgj_scfuhai_info: "锁定技。①当你使用牌指定目标后，若目标角色有“平定”标记，则其不可响应此牌，然后你摸一张牌。此牌结算后，你可以移除其“平定”标记，并恢复X点体力上限。②拥有“平定”标记的角色死亡时，你增加X点体力上限并摸X张牌。（X为其拥有的“平定”标记数）。",
	qmsgswkjsgj_pinghe: "冯河",
	qmsgswkjsgj_pinghe_info: "锁定技。①你的手牌上限基数等于你已损失的体力值+3。②当你受到其他角色造成的伤害时，若你有牌且你的体力上限大于1，则你防止此伤害，减1点体力上限并可将一张手牌交给一名其他角色。然后若你拥有〖英霸〗，则伤害来源获得一个“平定”标记。",
	qmsgswkjsgj_shenhunzi:'魂姿',
	qmsgswkjsgj_shenhunzi_info:`锁定技，游戏开始时，你获得${get.poptip("qmsgswkjsgj_shenyingzi")}和${get.poptip("qmsgswkjsgj_shenyinghun")}`,
	qmsgswkjsgj_shenyingzi:'英姿',
	qmsgswkjsgj_shenyingzi_info:`锁定技，摸牌阶段，你多摸一张牌。`,
	qmsgswkjsgj_shenyinghun:'英魂',
	qmsgswkjsgj_shenyinghun_info:`准备阶段，若你已受伤，你可以选择一名其他角色并选择一项：1.令其摸Y张牌；2.令其弃置Y张牌。（Y为你已损失的体力值）`,
	qmsgswkjsgj_shenjiang:'激昂',

	qmsgswkjsgj_mb_sunluyu: "星月手杀界孙鲁育",
	qmsgswkjsgj_mb_sunluyu_prefix: "星月手杀界",
	qmsgswkjsgj_mbmumu: "穆穆",
	qmsgswkjsgj_mbmumu_info: "出牌阶段开始时，你可以选择一项：1.弃置一名其他角色的一张牌；2.获得场上的一张防具牌。",
	qmsgswkjsgj_mbmeibu: "魅步",
	qmsgswkjsgj_mbmeibu_info: `其他角色的出牌阶段开始时，你可以令该角色于本回合内获得${get.poptip("qmsgswkjsgj_mbzhixi")}，本回合其与你的距离视为1。`,
	qmsgswkjsgj_mbzhixi: "止息",
	qmsgswkjsgj_mbzhixi_info: "锁定技。出牌阶段，你使用牌时需弃置一张手牌，若你于此阶段使用过的牌数不小于X，你不能使用牌（X为你的体力值）；当你使用锦囊牌时，你结束此阶段；你使用装备牌后，本回合手牌上限-1。",

	qmsgswkjsgj_re_mb_zhangzhi:'星月界书张芝',
	qmsgswkjsgj_re_mb_zhangzhi_prefix:'星月界书',
	qmsgswkjsgj_mbshiju:'势举',
	qmsgswkjsgj_mbshiju_info:`锁定技，你使用牌结算结束后，若此牌与上一张被使用的牌：类别相同，你获得牌堆顶的一张牌；颜色相同，你获得牌堆底的一张牌；${get.poptip("rule_chengshi")}：若牌名也相同，你升级或刷新${get.poptip("mbkubai")}。`,

	qmsgswkjsgj_shen_taishici:'星月神太史慈',
	qmsgswkjsgj_shen_taishici_prefix:'星月神',
	qmsgswkjsgj_dulie: "笃烈",
	qmsgswkjsgj_dulie_info: "锁定技。当你成为【杀】的目标时，你进行判定。若结果为红色，则取消此目标。",
	qmsgswkjsgj_tspowei: "破围",
	qmsgswkjsgj_tspowei_info: `使命技。①游戏开始时，你令所有其他角色获得一个“围”，你对有“围”的角色使用【杀】没有距离限制。②一名角色受到伤害后，你可以移去其“围”。③回合开始时，你可重新分配场上的“围”标记。④一名其他角色的回合开始时，若其有“围”，则你可以选择一项：⒈对其造成1点伤害。⒉你获得其一张手牌。背水，你视为在其攻击范围内直到回合结束。⑤使命：回合开始时，若场上“围”标记数不大于X（X为你的体力上限），则你获得技能${get.poptip("qmsgswkjsgj_shenzhu")}。⑥失败：当你进入濒死状态时，你将体力值回复至上限。`,
	qmsgswkjsgj_shenzhu: "神著",
	qmsgswkjsgj_shenzhu_info: "锁定技，当你使用【杀】结算结束后，你选择一项：①摸一张牌，且本回合使用【杀】的次数上限+1。②摸X张牌，且本回合不能再使用【杀】（X为你的体力上限）。",
	// qmsgswkjsgj_dangmo: "荡魔",
	// qmsgswkjsgj_dangmo_info: "当你于出牌阶段内使用第一张【杀】选择目标后，你可以为此牌增加至多X个目标（X为你的体力上限）。",
	qmsgswkjsgj_shentianyi:'天义',
	qmsgswkjsgj_shentianyi2:'天义',
	qmsgswkjsgj_shentianyi_info:'出牌阶段限一次，你可以和一名其他角色拼点。若你赢，你获得以下技能效果直到回合结束：你使用【杀】没有距离限制；可额外使用一张【杀】；使用【杀】时可额外指定一个目标。',
	qmsgswkjsgj_shenhanzhan:'酣战',
	qmsgswkjsgj_shenhanzhan_info:'①当你发起拼点时，或成为拼点的目标时，你可以令对方选择拼点牌的方式改为随机选择一张手牌。②当你拼点结束后，你可以获得本次拼点的拼点牌中点数最大的牌。',

	qmsgswkjsgj_yanxiang: "星月界阎象",
	qmsgswkjsgj_yanxiang_prefix:'星月界',
	qmsgswkjsgj_kujian: "苦谏",
	qmsgswkjsgj_kujian_info: "出牌阶段限一次，你可以将任意张手牌称为“谏”并交给一名其他角色，然后你获得以下效果：其他角色失去“谏”后，若为因使用或打出而失去，你与其各摸两张牌。“谏”牌不计入手牌上限。",
	qmsgswkjsgj_ruilian: "睿敛",
	qmsgswkjsgj_ruilian_info: "每轮开始时，你可以选择一名角色。你与其回合结束时，你可以选择一种类别，你与其各从弃牌堆中获得一张此类别的牌。",











	qmsgswkjsgj_mb_luyusheng: "星月界势陆郁生",
	qmsgswkjsgj_mb_luyusheng_prefix: "星月界势",
	qmsgswkjsgj_mbrunwei: "润微",
	qmsgswkjsgj_mbrunwei_info: "出牌阶段限一次，你可以展示牌堆顶至多五张牌，令一名角色获得其中一种颜色的所有牌。若如此做，你失去X张牌后（X为其因此获得的牌数），该技能可以再次发动。",
	qmsgswkjsgj_mbshuanghuai: "霜怀",
	qmsgswkjsgj_mbshuanghuai_info: "每回合限一次，当与你距离1以内的角色受到伤害时，你可以选择一项：防止此伤害；令其从弃牌堆中获得一张【桃】。若该角色与你上一次发动时相同，你与其各摸一张牌。",

	qmsgswkjsgj_pot_weiyan: "星月界势魏延",
	qmsgswkjsgj_pot_weiyan_prefix: "星月界势",
	qmsgswkjsgj_potzhongao: "忠傲",
	qmsgswkjsgj_potzhongao_info: `使命技，①游戏开始时，你获得${get.poptip("qmsgswkjsgj_potkuanggu")}。②成功：你杀死一名角色后，升级〖狂骨〗，然后若你本阶段使用的牌数：小于因〖壮誓〗弃置的牌数，摸一张牌；小于因〖壮誓〗失去的体力值，回复1点体力（体力值已满则改为摸一张牌）。③失败：你进入濒死，或你未于出牌阶段开始时执行〖壮誓〗，失去〖壮誓〗并获得${get.poptip("kunfenx")}。（全民三国杀我开局神郭嘉）`,
	qmsgswkjsgj_potzhuangshi: "壮誓",
	qmsgswkjsgj_potzhuangshi_info: "出牌阶段开始时，你可以执行任意项：1.弃置任意张手牌，令你此阶段使用的前等量+1张牌无距离限制且不可被响应；2.失去任意点体力，令你此阶段使用的前等量+1张牌不计入次数限制。",
	qmsgswkjsgj_potzhuangshi_tag: "已选择弃置",
	qmsgswkjsgj_potyinzhan: "饮战",
	qmsgswkjsgj_potyinzhan_info: `锁定技，你对一名角色造成伤害时，若：1.你的体力值小于等于其，此伤害+1；2.你的牌数小于等于其，你于此牌结算结束后弃置其一张牌；${get.poptip("rule_chengshi")}：你回复1点体力，获得其弃置的牌。`,
	qmsgswkjsgj_potkuanggu: "狂骨",
	qmsgswkjsgj_potkuanggu_info: "你对一名角色造成1点伤害后，可以选择一项：1.回复1点体力；2.摸一张牌。",
	qmsgswkjsgj_potkuanggu_pot_weiyan_achieve: "狂骨·二级",
	qmsgswkjsgj_potkuanggu_pot_weiyan_achieve_info: `你对一名角色造成1点伤害后，可以选择一项：1.回复1点体力；2.摸一张牌；3.${get.poptip("rule_beishui")}：弃置一张牌并令你此阶段使用【杀】的次数+1。`,

	qmsgswkjsgj_pot_taishici: "星月界势太史慈",
	qmsgswkjsgj_pot_taishici_prefix: "星月界势",
	qmsgswkjsgj_pothanzhan: "酣战",
	qmsgswkjsgj_pothanzhan_info: "出牌阶段限一次，你可以选择一名其他角色，你将手牌数摸至X张（X为你的体力上限且至多摸5张），然后你视为对其使用一张【决斗】。",
	qmsgswkjsgj_potzhanlie: "战烈",
	qmsgswkjsgj_potzhanlie_info: "每名角色回合中的杀进入弃牌堆时，若此牌在弃牌堆内，你获得1个“烈”标记，你至多拥有6个“烈”标记。你的出牌阶段结束时，你可移除任意数量的“烈”标记，视为使用一张无次数限制的【杀】并选择以下选项中的至多X项（X为你本次移除的标记数）：1.此【杀】目标+1；2.此【杀】基础伤害值+1；3.此【杀】需额外弃置一张牌方可响应。4.此【杀】结算结束后你摸两张牌。",
	qmsgswkjsgj_potzhenfeng: "振锋",
	qmsgswkjsgj_potzhenfeng_info: "限定技，出牌阶段或当你进入濒死状态时，你可以选择一项：①回复2点体力；②膝盖战烈的你的出牌阶段结束时为每名角色出牌阶段结束时，直到你的下个回合开始。",
	qmsgswkjsgj_potzhenfeng_append: "本体战烈改不了。<br>其实也不是不能改，只是会显得我有大病",
	//②修改〖酣战〗和〖战烈〗描述中的“X”为当前体力值、已损失体力值、场上人数中的一项（拥有对应技能方可选择）

	qmsgswkjsgj_pot_yuji: "星月界势于吉",
	qmsgswkjsgj_pot_yuji_prefix: "星月界势",
	qmsgswkjsgj_potfuji: "符济",
	qmsgswkjsgj_potfuji_info: "出牌阶段限一次，你可以展示至多X张牌并交给任意角色，称为“符济”（X为场上角色数）。其角色使用“符济”牌时获得一张与“符济”牌花色相同的牌；然后若此牌为：【杀】，此牌造成的伤害+1；【闪】，结算完毕后其摸一张牌；【桃】，回复数值+1；【酒】，其可弃置场上一张牌。然后若你的手牌数为全场最低，则你摸一张牌，且你使用的下一张【杀】【闪】【桃】【酒】视为拥有对应效果直到你的下个回合开始（可叠加）。",
	qmsgswkjsgj_potdaozhuan: "道转",
	qmsgswkjsgj_potdaozhuan_info: "每回合每种牌名限一次限一次，你可以将你或者当前回合角色的一张牌置入弃牌堆，视为使用一张基本牌。若当前回合角色因此失去了牌，则本回合此技能失效。",







	//界新杀武将
	qmsgswkjsgj_re_zhangxuan:'星月界张嫙',
	qmsgswkjsgj_re_zhangxuan_prefix:'星月界',
	// tongli: "同礼",//小说提及，同礼没变化。
	// //tongli_info:'当你于出牌阶段内不因〖同礼〗而使用基本牌或普通锦囊牌指定第一个目标后，若你手牌中的花色数和你于本阶段内不因〖同礼〗而使用过的牌数相等，则你可以于此牌结算结束后依次视为对此牌的所有目标使用X张名称和属性相同的牌（X为你手牌中的花色数）。',
	// tongli_info: "当你于出牌阶段内使用基本牌或普通锦囊牌指定第一个目标后，若你手牌中的花色数和你于本阶段内使用过的牌数相等，则你可以令此牌额外结算X次（X为你手牌中的花色数）。",
	qmsgswkjsgj_re_shezang: "奢葬",
	qmsgswkjsgj_re_shezang_info: "当有角色进入濒死状态时，你可以从牌堆中获得每种花色的牌各一张。",

	qmsgswkjsgj_re_chenshi: "星月界陈式",
	qmsgswkjsgj_re_chenshi_prefix: "星月界",
	qmsgswkjsgj_re_qingbei: "擎北",
	qmsgswkjsgj_re_qingbei_info: "①每轮开始时，你可以选择任意种花色，你不能于本轮内使用这些花色的牌。②你使用牌结算结束后，你摸X张牌（X为你本轮〖擎北①〗选择的花色数+1）。",

	qmsgswkjsgj_re_dc_tengfanglan: "星月界滕芳兰",
	qmsgswkjsgj_re_dc_tengfanglan_prefix: "星月界",
	qmsgswkjsgj_re_dcluochong: "落宠",
	qmsgswkjsgj_re_dcluochong_info: "每轮开始时，你可以弃置任意名角色区域里的共计至多[4]张牌。（全民三国杀我开局神郭嘉）",
	qmsgswkjsgj_re_dcaichen: "哀尘",
	qmsgswkjsgj_re_dcaichen_info: "锁定技。当你每次发动〖落宠〗弃置你区域内的牌后，你摸两张牌；你跳过弃牌阶段。（全民三国杀我开局神郭嘉）",

	qmsgswkjsgj_re_zhenghun: "星月界郑浑",
	qmsgswkjsgj_re_zhenghun_prefix: "星月界",
	// qmsgswkjsgj_re_dcqiangzhi: "强峙",//原文提及，没变化
	// qmsgswkjsgj_re_dcqiangzhi_info: "出牌阶段限一次。你可以弃置你和一名其他角色的共计三张牌。然后若你与其之中有角色因此失去了三张牌，该角色对另一名角色造成1点伤害。",
	qmsgswkjsgj_re_dcpitian: "辟田",
	qmsgswkjsgj_re_dcpitian_info: "①当你的一张牌被弃置后，或当你受到一点伤害后，你的手牌上限+1。②结束阶段，若你的手牌数小于手牌上限，你可以摸至手牌上限。",

	qmsgswkjsgj_re_re_liuzan: "星月界留赞",
	qmsgswkjsgj_re_re_liuzan_prefix: "星月界",
	qmsgswkjsgj_re_refenyin: "奋音",
	qmsgswkjsgj_re_refenyin_info: "锁定技，你的回合内，当一张牌进入弃牌堆后，若本回合内没有过与此牌点数相同的卡牌进入过弃牌堆，则你摸一张牌。（全民三国杀我开局神郭嘉）",
	qmsgswkjsgj_re_liji: "力激",
	qmsgswkjsgj_re_liji_info: "出牌阶段限X+1次，你可以弃置一张牌并对一名其他角色造成1点伤害。（X为本回合内进入过弃牌堆的卡牌数除以3，向下取整）（全民三国杀我开局神郭嘉）",

	qmsgswkjsgj_re_wupu: "星月界吴普",
	qmsgswkjsgj_re_wupu_prefix: "星月界",
	qmsgswkjsgj_re_dcduanti: "锻体",
	qmsgswkjsgj_re_dcduanti_info: "锁定技。每失去三张牌后，你回复一点体力并增加一点体力上限（至多+10）。",
	qmsgswkjsgj_re_dcshicao: "识草",
	qmsgswkjsgj_re_dcshicao_info: "出牌阶段，你可以声明一种类型，然后选择从牌堆顶或牌堆底摸一张牌。若此牌类型与你声明的类型不同，你观看牌堆另一端的三张牌，此技能本回合失效。",

	qmsgswkjsgj_re_ruanyu: "星月界阮瑀",
	qmsgswkjsgj_re_ruanyu_prefix: "星月界",
	qmsgswkjsgj_re_xingzuo: "兴作",
	qmsgswkjsgj_re_xingzuo2: "兴作",
	qmsgswkjsgj_re_xingzuo_info: "出牌阶段限一次，你可观看牌堆底的五张牌并用任意张手牌替换其中等量的牌。若如此做，结束阶段，你可令一名角色用所有手牌替换牌堆底的五张牌。",
	qmsgswkjsgj_re_miaoxian: "妙弦",
	qmsgswkjsgj_re_miaoxian_info: "若你的手牌中仅有一张黑色牌，你可将此牌当作任意一张锦囊牌或基本牌使用；若你的手牌中仅有一张红色牌，你使用或打出此牌时摸一张牌，此牌无距离和次数限制且无法被响应。",

	qmsgswkjsgj_re_dc_duyu: "星月界杜预",
	qmsgswkjsgj_re_dc_duyu_prefix: "星月界",
	qmsgswkjsgj_re_dcjianguo: "谏国",
	qmsgswkjsgj_re_dcjianguo_info: "出牌阶段各限一次。你可以选择一名角色并选择一项：1.令其弃置一半的手牌，若其弃置的牌数量小于你的体力值，你对其造成一点伤害；2.令其摸等同于手牌数一半的牌，若其摸牌数量大于等于你的体力值，你回复一点体力。（均向上取整）",
	qmsgswkjsgj_re_dcdyqingshi: "倾势",
	qmsgswkjsgj_re_dcdyqingshi_info: "当你于回合内使用牌后，若此牌为你本回合使用的第X张牌，你可以对一名角色造成1点伤害（X为你的手牌数）。",
	
	qmsgswkjsgj_re_star_caoren: "星月界星曹仁",
	qmsgswkjsgj_re_star_caoren_prefix: "星月界星",
	qmsgswkjsgj_re_starsujun: "肃军",
	qmsgswkjsgj_re_starsujun_info: "游戏开始时或你手牌数变动后，若你手牌中的基本牌和非基本牌的牌数相等，你可以摸两张牌。",
	qmsgswkjsgj_re_starlifeng: "砺锋",
	qmsgswkjsgj_re_starlifeng_info: "你可以将一张本回合未有角色使用过的花色的手牌当做无次数限制且不计入次数的【杀】或【无懈可击】使用。",

	qmsgswkjsgj_re_dc_xiahouhui: "星月界新杀夏侯徽",
	qmsgswkjsgj_re_dc_xiahouhui_prefix: "星月界新杀",
	qmsgswkjsgj_re_dcdujun: "笃君",
	qmsgswkjsgj_re_dcdujun_info: "游戏开始时，你选择一名其他角色，你不能响应其使用的牌。每回合限X次，你与其造成或受到1点伤害后，你可摸两张牌，然后（可以</小说里按照十周年描述写的，没加可以，这里应当可以>）将两张牌交给其他角色（X为你的体力上限）。",
	qmsgswkjsgj_re_dcjikun: "济困",
	qmsgswkjsgj_re_dcjikun_info: "每当你累计失去五张牌后，你可令一名角色获得其他角色的一张牌。",

	qmsgswkjsgj_re_panghong: "星月界庞宏",
	qmsgswkjsgj_re_panghong_prefix: "星月界",
	qmsgswkjsgj_re_dcpingzhi: "评骘",
	qmsgswkjsgj_re_dcpingzhi_info: "转换技。出牌阶段限三次，你可观看一名角色的手牌并展示其中一张牌，阳：你弃置此牌，然后其视为对你使用一张【火攻】，若其未因此造成伤害则此技能视为未发动过；阴：然后你代替其使用此牌</据小说解释，本质上就算是那个人使用这张牌，这是盻睇吗>，若此牌造成伤害则此技能视为未发动过。",
	qmsgswkjsgj_re_dcgangjian: "刚简",
	qmsgswkjsgj_re_dcgangjian_info: "锁定技。每个回合结束时，你摸X张牌（X为本回合展示过的牌数至多为5）</作者又开始了，把展示牌堆的牌也计入其内了。云玩家写小说是这样的>。",

	
	qmsgswkjsgj_re_zhujianping: "星月界朱建平",
	qmsgswkjsgj_re_zhujianping_prefix: "星月界",
	qmsgswkjsgj_re_dcxiangmian: "相面",
	qmsgswkjsgj_re_dcxiangmian_info: "出牌阶段限两次。你可以令一名其他角色判定，其获得以下效果：当其使用结果的花色的牌后，或当其使用X张牌后（X为结果的点数），其失去等同于其体力值的体力。",
	qmsgswkjsgj_re_dctianji: "天机",
	qmsgswkjsgj_re_dctianji_info: "锁定技。当判定牌生效后，你从牌堆或弃牌堆随机获得分别与该牌类型、花色和点数相同的牌各一张。",


	qmsgswkjsgj_re_guotiying: "星月界郭缇萦",
	qmsgswkjsgj_re_guotiying_prefix: "星月界",
	qmsgswkjsgj_re_dckanyu: "堪舆",
	qmsgswkjsgj_re_dckanyu_info: "一名角色进行判定或当你受到1点伤害后，你可观看牌堆顶与牌堆底各两张牌，然后可获得其中任意张牌，并将剩余牌以任意顺序放回。若你以此法获得牌，【闪电】对你的生效范围增加你所获得牌的花色点数组合。",
	qmsgswkjsgj_re_dczhee: "谪厄",
	qmsgswkjsgj_re_dczhee_info: "锁定技，游戏开始时/每回合结束时，你将牌堆/弃牌堆中的一张【闪电】置入一号位/当前回合角色的下家判定区。",
	// tiandu_qmsgswkjsgj_re_guotiying:'天妒',
	// tiandu_qmsgswkjsgj_re_guotiying_info:'星月界郭缇萦的语音',

	qmsgswkjsgj_re_caofang: "星月界曹芳",
	qmsgswkjsgj_re_caofang_prefix: "星月界",
	qmsgswkjsgj_re_dczhimin: "置民",
	qmsgswkjsgj_re_dczhimin_tag: "民",
	qmsgswkjsgj_re_dczhimin_info: "锁定技。①每轮开始时或回合内限一次，你选择至多X名其他角色（X为你的体力上限），获得这些角色各自手牌中的随机一张点数最小的牌。②当你于你的回合外得到牌后，你将这些牌标记为“民”。③当你失去“民”后，你将手牌补至体力上限。",
	qmsgswkjsgj_re_dczhimin_append:'尚未实战，盲猜是每回合限一次，出牌阶段……',
	qmsgswkjsgj_re_dcjujian: "拒谏",
	qmsgswkjsgj_re_dcjujian_info: "主公技。出牌阶段每名角色限一次，你可以令一名其他魏势力角色1：摸一张牌；2：本轮内其使用的普通锦囊牌对你无效。",

	qmsgswkjsgj_re_guozhao: "星月界郭照",
	qmsgswkjsgj_re_guozhao_prefix: "星月界",
	qmsgswkjsgj_re_pianchong: "偏宠",
	qmsgswkjsgj_re_pianchong_info: "每轮开始时或摸牌阶段开始时选择一项：1.你每失去一张红色牌时摸一张黑色牌，2.你每失去一张黑色牌时摸一张红色牌。摸牌阶段，你可以改为从牌堆获得红牌和黑牌各一张。",
	qmsgswkjsgj_re_zunwei: "尊位",
	qmsgswkjsgj_re_zunwei_backup: "尊位",
	qmsgswkjsgj_re_zunwei_info: "出牌阶段限一次，你可选择一项：①若你已受伤，则你可以选择一名体力值大于你的其他角色，你将体力值回复至X（X为你的体力上限与其体力值中的较小值）②选择一名手牌数大于你的其他角色，你将手牌数摸至与其相同（至多摸五张）③选择一名装备区内牌数大于你的其他角色。你令X=1。若你装备区内的('equip'+X)栏为空，则你使用牌堆中的一张副类别为('equip'+X)，且能对自己使用的装备牌。你令X+1。若X不大于5，且你装备区内的牌数仍小于目标角色，则你重复此流程。",
	qmsgswkjsgj_re_zunwei_append:'实际描述是先选目标再选效果。不过距离效果大差不差，就这么地了',

	qmsgswkjsgj_re_caomao: "星月界曹髦",
	qmsgswkjsgj_re_caomao_prefix: "星月界",
	qmsgswkjsgj_re_qianlong: "潜龙",
	qmsgswkjsgj_re_qianlong_info: "当你受到伤害后，你可以亮出牌堆顶你的体力上限数张牌并获得其中的至多X张牌（X为你已损失的体力值）<小说主角特有的傲骨，不设下限>，然后将剩余的牌置于牌堆底。",
	// qmsgswkjsgj_re_fensi: "忿肆",
	// qmsgswkjsgj_re_fensi_info: "锁定技。准备阶段，你须选择一名体力值不小于你的角色并对其造成1点伤害，然后若你选择的角色不为你自己，则其视为对你使用一张【杀】。",
	qmsgswkjsgj_re_juetao: "决讨",
	qmsgswkjsgj_re_juetao_info: "出牌阶段开始时，若你的体力值为1，则你可以选择一名其他角色。你亮出牌堆底的一张牌，若此牌能被你使用，则你使用此牌并重复此流程直到出现不可使用的牌或其死亡（你与其以外的角色不是此牌的合法目标）。",
	qmsgswkjsgj_re_zhushi: "助势",
	qmsgswkjsgj_re_zhushi_info: "主公技。其他魏势力角色回复体力时，你可以摸一张牌。",






	//----------------神赐章节-----------------
	qmsgswkjsgj_shenci_wu_zhugeliang:'神赐武诸葛亮',
	qmsgswkjsgj_shenci_wu_zhugeliang_prefix:'神赐武',
	qmsgswkjsgj_shenci_dcjincui: "尽瘁",
	qmsgswkjsgj_shenci_dcjincui_info: "锁定技。①游戏开始时，你将手牌摸至七张。②准备阶段，你将体力值回复或失去至等同于牌堆和弃牌堆中点数为7的牌数（你的体力值最低因此调整至1）。然后你观看牌堆顶X张牌，将这些牌以任意顺序置于牌堆顶或牌堆底（X为你的体力值）。",
	qmsgswkjsgj_shenci_dcqingshi: "情势",
	qmsgswkjsgj_shenci_dcqingshi_info: "当你于出牌阶段使用牌时，若你手牌中有同名牌，你可以选择一项：1.令此牌对其中一个目标角色造成的伤害+1；2.令任意名角色各摸一张牌；3.摸X张牌，然后〖情势〗于本回合无效（X为你的体力值）。",
	qmsgswkjsgj_shenci_dczhizhe: "智哲",
	qmsgswkjsgj_shenci_dczhizhe_clear: "invisible",
	qmsgswkjsgj_shenci_dczhizhe_info: "限定技。出牌阶段，你可以选择一张手牌并复制之。此牌进入弃牌堆时，你获得之，然后你本回合不能再使用或打出此牌。",

	qmsgswkjsgj_shenci_re_duyu:'神赐界杜预',
	qmsgswkjsgj_shenci_re_duyu_prefix:'神赐界',
	qmsgswkjsgj_shenci_spwuku: "武库",
	qmsgswkjsgj_shenci_spwuku_info: "锁定技，当有角色使用装备牌时，则你获得一个“武库”。你使用装备时，额外获得一个“武库”。",
	qmsgswkjsgj_shenci_spsanchen: "三陈",
	qmsgswkjsgj_shenci_spsanchen_info: `觉醒技，若你的“武库”数大于2，则你加1点体力上限并回复1点体力，然后获得${get.poptip('qmsgswkjsgj_shenci_spmiewu')}。`,
	qmsgswkjsgj_shenci_spmiewu: "灭吴",
	qmsgswkjsgj_shenci_spmiewu_info: "你可弃置一枚“武库”并将一张牌当做任意基本牌或锦囊牌使用，然后摸一张牌。",

	qmsgswkjsgj_shenci_wu_luxun:'神赐武陆逊',
	qmsgswkjsgj_shenci_wu_luxun_prefix:'神赐武',
	qmsgswkjsgj_shenci_dcxiongmu: "雄幕",
	qmsgswkjsgj_shenci_dcxiongmu_tag: "雄幕",
	qmsgswkjsgj_shenci_dcxiongmu_info: "①每轮开始时，你可以摸体力上限数张牌，然后将任意张牌随机置入牌堆，从牌堆或弃牌堆中获得等量的点数为8的牌。玩家点数为8的牌不计入手牌上限。②玩家每回合受到第一次伤害时，免疫此伤害。。",
	qmsgswkjsgj_shenci_dczhangcai: "彰才",
	qmsgswkjsgj_shenci_dczhangcai_info: "当你失去一张点数为8的牌时，你可以摸X张牌（X为你手牌区里点数为8的牌数且至少为1）。",
	qmsgswkjsgj_shenci_dcruxian: "儒贤",
	qmsgswkjsgj_shenci_dcruxian_info: "限定技。出牌阶段，你可以令你〖彰才〗的点数限制取消，且摸牌数改为等同于你手牌区内与此牌点数相同的牌数且至少为1，直到你的下回合结束。",
	
	qmsgswkjsgj_shenci_sb_caopi:'神赐谋曹丕',
	qmsgswkjsgj_shenci_sb_caopi_prefix:'神赐谋',
	qmsgswkjsgj_shenci_sbxingshang: "行殇",
	qmsgswkjsgj_shenci_sbxingshang_info: "①当一名角色受到伤害后或死亡时，你获得2个“颂”标记。②出牌阶段限两次，你可以：选择一名角色，移去任意数量的“颂”令其执行对应的一个操作：1个，复原武将牌；2个，摸X张牌（X为本局已死亡角色数，至少为3）；3个，增加1点体力上限并回复一点体力，然后恢复被废除的装备栏（体力上限不大于12方可选择）；4个，追思一名未被追思过的已阵亡角色的武将牌上的技能，然后你失去“行殇”。",
	// sbxingshang_info: "①当一名角色受到伤害后或死亡时，你获得2个“颂”标记。②出牌阶段限两次，你可以：" + ["移去2个“颂”标记，令一名角色复原武将牌", "移去2个“颂”标记，令一名角色摸三张牌", "移去3个“颂”标记，令一名体力上限小于10的角色回复1点体力，增加1点体力上限，随机恢复一个已废除的装备栏", "移去4个“颂”标记，获得一名阵亡角色武将牌上的所有技能，然后你失去〖行殇〗〖放逐〗〖颂威〗"].map((str, index) => `${index + 1}.${str}`).join("；") + "。",
	qmsgswkjsgj_shenci_sbfangzhu: "放逐",
	qmsgswkjsgj_shenci_sbfangzhu_info:'出牌阶段限两次，你可以选择一名其他角色，移去任意数量的“颂”令其执行对应的一个操作：1个，你指定一种类型的牌，直到其下回合结束，其只能使用此类型的牌；2个，直到其下回合结束，其武将技能失效或不可响应另一名角色使用的牌；3个，其翻面。',
	// sbfangzhu_info: "出牌阶段限一次，你可以：" + ["移去2个“颂”标记，令一名其他角色于手牌中只能使用基本牌直到其回合结束", "移去6个“颂”标记，令一名其他角色于手牌中只能使用锦囊牌直到其回合结束", "移去8个“颂”标记，令一名其他角色于手牌中只能使用装备牌直到其回合结束", "移去6个“颂”标记，令一名其他角色的非Charlotte技能失效直到其回合结束", "移去4个“颂”标记，令一名其他角色不能响应另一名角色使用的牌直到其回合结束", "移去8个“颂”标记，令一名其他角色将武将牌翻面"].map((str, index) => `${index + 1}.${str}`).join("；") + "。",
	// sbfangzhu_info_doudizhu: "出牌阶段限一次，你可以：" + ["移去2个“颂”标记，令一名其他角色于手牌中只能使用基本牌直到其回合结束", "移去6个“颂”标记，令一名其他角色于手牌中只能使用锦囊牌直到其回合结束", "移去4个“颂”标记，令一名其他角色不能响应另一名角色使用的牌直到其回合结束"].map((str, index) => `${index + 1}.${str}`).join("；") + "。",
	qmsgswkjsgj_shenci_sbsongwei: "颂威",
	qmsgswkjsgj_shenci_sbsongwei_info: "主公技，出牌阶段开始时，你获得Y个“颂”标记（Y为本局游戏魏势力角色数的两倍）。每局游戏限一次，你可以于出牌阶段令一名其他魏势力角色失去其武将牌上的所有技能。",

	qmsgswkjsgj_shenci_re_sunhanhua:'神赐界孙寒华',
	qmsgswkjsgj_shenci_re_sunhanhua_prefix:'神赐界',
	qmsgswkjsgj_shenci_chongxu:'冲虚',
	qmsgswkjsgj_shenci_chongxu_info:'出牌阶段限一次，你可以集灵（至多七分），并根据分数：你可以修改〖妙剑〗或〖莲华〗（消耗2分），并使用剩余的分数进行摸牌（每张1分）。',
	qmsgswkjsgj_shenci_miaojian:'妙剑',
	qmsgswkjsgj_shenci_miaojian_info:'出牌阶段限一次，你可以视为使用一张刺【杀】，该刺【杀】不计入次数限制且无距离限制。',
	qmsgswkjsgj_shenci_miaojian1:'妙剑·改',
	qmsgswkjsgj_shenci_miaojian1_info:'出牌阶段限一次，你可以视为使用一张刺【杀】，该刺【杀】不计入次数限制且无距离限制。你的【杀】均可视为刺【杀】',
	qmsgswkjsgj_shenci_miaojian2:'妙剑·极',
	qmsgswkjsgj_shenci_miaojian2_info:'出牌阶段限一次，你可以视为使用一张刺【杀】，你的【杀】均可视为刺【杀】。刺【杀】无次数和距离限制。',
	qmsgswkjsgj_shenci_shhlianhua:'莲华',
	qmsgswkjsgj_shenci_shhlianhua_info:'你成为其他角色【杀】的目标后，你摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果为黑桃，则取消之。',
	qmsgswkjsgj_shenci_shhlianhua1:'莲华·改',
	qmsgswkjsgj_shenci_shhlianhua1_info:'你成为其他角色【杀】的目标后，你摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果为黑色，则取消之。',
	qmsgswkjsgj_shenci_shhlianhua2:'莲华·极',
	qmsgswkjsgj_shenci_shhlianhua2_info:'你成为其他角色牌的目标后，你可以摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果不为红桃，则取消之。',
	//由于剧情里，孙寒华在对局中被神赐，已升级的技能仍然延续神赐之前的等级，因此这里以及界孙寒华尽量也要和本体孙寒华互通

	qmsgswkjsgj_shenci_dc_zhouxuān: "神赐周宣",
	qmsgswkjsgj_shenci_dc_zhouxuān_prefix: "神赐",
	qmsgswkjsgj_shenci_dcwumei: "寤寐",
	qmsgswkjsgj_shenci_dcwumei_info: "每轮限一次。回合开始前，你可以令一名角色执行一个额外回合，此回合内，其造成的所有伤害+1。以此法进行的回合结束时，将场上所有角色的体力值改为此回合开始时的数值。",
	qmsgswkjsgj_shenci_dczhanmeng: "占梦",
	qmsgswkjsgj_shenci_dczhanmeng_info: "当你使用或打出牌时，你可以选择一项：1.上一回合内，若没有同名牌被使用过，你获得一张非伤害牌；2.下一回合内，当同名牌被使用后，你获得一张伤害牌；3.弃置一名其他角色两张牌，对其造成1点火焰伤害。",

	qmsgswkjsgj_shenci_caomao:'神赐曹髦',
	qmsgswkjsgj_shenci_caomao_prefix:'神赐',
	qmsgswkjsgj_shenci_mbqianlong:'潜龙',
	qmsgswkjsgj_shenci_mbqianlong_info:`${get.poptip("rule_chihengji")}。①游戏开始时，你获得30枚“道心”标记。②当你得到牌后/受到1点伤害后/造成1点伤害后，你获得10/20/20枚“道心”（上限为99枚）。③若你的“道心”数不小于20/40/60/80/99，你视为拥有${get.poptip("qmsgswkjsgj_shenci_mbcmqingzheng")}/${get.poptip("qmsgswkjsgj_shenci_mbcmjiushi")}/${get.poptip("qmsgswkjsgj_shenci_mbcmfangzhu")}/${get.poptip("qmsgswkjsgj_shenci_cmhuituo")}/${get.poptip("qmsgswkjsgj_shenci_mbjuejin")}。`,
	qmsgswkjsgj_shenci_mbcmqingzheng: "清正",
	qmsgswkjsgj_shenci_mbcmqingzheng_info: `${get.poptip("rule_chihengji")}。出牌阶段开始时，你可以弃置一张手牌，并观看一名有手牌的其他角色的手牌，你弃置其中一种花色的所有牌。然后对其造成1点伤害。`,
	qmsgswkjsgj_shenci_mbcmjiushi: "酒诗",
	qmsgswkjsgj_shenci_mbcmjiushi_info: `${get.poptip("rule_chihengji")}。①当你需要使用【酒】时，若你的武将牌正面向上，你可以翻面，视为使用一张【酒】。②当你受到伤害后，若你武将牌背面朝上且未因此次伤害发动过〖酒诗〗，你可以翻面。③当你翻面后，你获得牌堆或弃牌堆中的一张指定牌名的锦囊牌。`,
	qmsgswkjsgj_shenci_mbcmfangzhu: "放逐",
	qmsgswkjsgj_shenci_mbcmfangzhu_info: `${get.poptip("rule_chihengji")}。出牌阶段限两次，你可以选择一名其他角色，选择一项：⒈令其不能使用手牌中的一种类型牌直到其回合结束；⒉令其所有非Charlotte技能失效直到其回合结束；3.其翻面。`,
	qmsgswkjsgj_shenci_cmhuituo: "恢拓",
	qmsgswkjsgj_shenci_cmhuituo_info: `${get.poptip("rule_chihengji")}。当你受到1点伤害后，你可以令一名角色进行一次判定，若结果为红色，该角色回复X点体力；若结果为黑色，该角色摸X张牌。（X为此次伤害的伤害点数）`,
	qmsgswkjsgj_shenci_mbjuejin: "决进",
	qmsgswkjsgj_shenci_mbjuejin_info: `${get.poptip("rule_chihengji")}，限定技。出牌阶段，你可以令任意角色依次将体力调整至1并获得X点护甲（X为一名角色以此法减少的体力值且你以此法获得的护甲数额外+2）。然后你将牌堆、弃牌堆、场上及所有角色手牌中的【闪】、【桃】和【酒】移出游戏且增加全局技能“${get.poptip({
		id: "juejin_xiangsicunwei",
		name: "向死存魏",
		type: "character",
		info: "当有牌进入弃牌堆后，系统将这些牌中的【闪】、【桃】和【酒】移出游戏。",
	})}”，若你因此失去手牌，你可以摸等量的牌，并反转${get.poptip("qmsgswkjsgj_shenci_cmhuituo")}的判定效果。（全民三国杀我开局神郭嘉的神赐曹髦）`,
	qmsgswkjsgj_shenci_mbweitong:'卫统',
	qmsgswkjsgj_shenci_mbweitong_info:`${get.poptip("rule_chihengji")}，主公技。游戏开始时，若你有${get.poptip("qmsgswkjsgj_shenci_mbqianlong")}，你获得60点道心值；其他魏势力角色回复体力时，你可以摸一张牌（全民三国杀我开局神郭嘉的神赐曹髦）。`,


	qmsgswkjsgj_shenci_pot_yuji: "星月神赐界势于吉",
	qmsgswkjsgj_shenci_pot_yuji_prefix: "星月神赐界势",
	qmsgswkjsgj_shenci_potfuji: "符济",
	qmsgswkjsgj_shenci_potfuji_info: "每轮游戏开始时或出牌阶段限一次，你可以展示至多X张牌并交给任意角色，称为“符济”（X为场上角色数）。其角色使用“符济”牌时获得一张与“符济”牌花色相同的牌；然后若此牌为：【杀】，此牌造成的伤害+1；【闪】，结算完毕后其摸一张牌；【桃】，回复数值+1；【酒】，其可弃置场上一张牌。然后你摸一张牌，且直到下回合开始前，你使用的【杀】【闪】【桃】【酒】视为拥有对应效果（可叠加）。",
	qmsgswkjsgj_shenci_potdaozhuan: "道转",
	qmsgswkjsgj_shenci_potdaozhuan_info: "每回合限X次，你可以将你或者当前回合角色的一张牌置入弃牌堆，视为使用一张基本牌。若当前回合角色是你，则你摸一张牌。（X为你的体力上限）",



























	sgsxjxfzmnl:'三国杀，仙界下凡怎么你了',
	sgsxjxfzmnl_info:'三国杀，仙界下凡怎么你了<br>平台：番茄小说<br>作者：作家时霜<br>备注：因作者描述较为不规范，因此在这里我会先进行一番规范。',

	sgsxjxfzmnl_re_xusheng:'阴间界徐盛',
	sgsxjxfzmnl_re_xusheng_prefix:'阴间界',
	sgsxjxfzmnl_pojun:'破军',
	sgsxjxfzmnl_pojun2: "破军",
	sgsxjxfzmnl_pojun3: "破军",
	sgsxjxfzmnl_pojun_info:'当你使用杀或单目标伤害锦囊牌指定目标时，你可以令此牌伤害+1，然后将其的至多X张牌置于其武将牌上（X为其体力值），然后其于当前回合结束时获得这些牌。',

	sgsxjxfzmnl_sb_huangzhong:'阴间谋黄忠',
	sgsxjxfzmnl_sb_huangzhong_prefix:'阴间谋',
	sgsxjxfzmnl_sbliegong: "烈弓",
	sgsxjxfzmnl_sbliegong_info: "①若你的装备区内有武器牌，你攻击距离无限，且你的杀可以转化为任意属性。②当你使用牌时，或成为其他角色使用牌的目标后，你记录此牌的花色。③当你使用【杀】或伤害锦囊指定唯一目标后，若你〖烈弓②〗的记录不为空，则你可亮出牌堆顶的X张牌（X为你〖烈弓②〗记录过的花色数-1），令此牌的伤害值基数+Y（Y为亮出牌中被〖烈弓②〗记录过花色的牌的数量），且目标角色不能使用〖烈弓②〗记录过花色的牌响应此牌。此牌使用结算结束后，你清除〖烈弓②〗的记录。",

	sgsxjxfzmnl_shen_sunce:'阴间神孙策',
	sgsxjxfzmnl_shen_sunce_prefix:'阴间神',
	sgsxjxfzmnl_yingba: "英霸",
	sgsxjxfzmnl_yingba_info: "①出牌阶段每名角色限一次，你可令一名体力上限大于1的其他角色减少1点体力上限并获得“平定”标记，然后你减少1点体力上限。②你对拥有“平定”标记的角色使用牌没有距离限制和次数限制。",
	sgsxjxfzmnl_scfuhai: "覆海",
	sgsxjxfzmnl_scfuhai_info: "锁定技。①当你使用牌指定目标后，若目标角色有“平定”标记，则其不可响应此牌。若你本回合内以此法得到的牌数小于4，则你摸一张牌。②拥有“平定”标记的角色死亡时，你增加X点体力上限并摸X张牌。（X为其拥有的“平定”标记数）。",
	sgsxjxfzmnl_pinghe: "冯河", 
	sgsxjxfzmnl_pinghe_info: "锁定技。①你的手牌上限基数等于你已损失的体力值。②当你受到其他角色造成的伤害时，若你有牌且你的体力上限大于1，则你防止此伤害，减1点体力上限并将一张手牌交给一名其他角色。然后伤害来源获得一个“平定”标记。",
	
	sgsxjxfzmnl_sb_xiahoushi: "阴间谋夏侯氏",
	sgsxjxfzmnl_sb_xiahoushi_prefix: "阴间谋",
	sgsxjxfzmnl_sbqiaoshi: "樵拾",
	sgsxjxfzmnl_sbqiaoshi_info: "每回合限一次。当你受到其他角色造成的伤害后，你可以令你回复等同于此次伤害值的体力，然后你与其摸两张牌。",
	sgsxjxfzmnl_sbyanyu: "燕语",
	sgsxjxfzmnl_sbyanyu_info: "①出牌阶段限三次。你可以弃置一张【杀】，然后摸一张牌。②出牌阶段结束时，你可以令一名其他角色摸3X张牌（X为你于此阶段发动〖燕语①〗的次数）。",

	sgsxjxfzmnl_mo_diaochan:'魔貂蝉',
	sgsxjxfzmnl_mo_diaochan_prefix:'魔',//这强度称不上阴间
	sgsxjxfzmnl_meihuo:'魅惑',
	sgsxjxfzmnl_meihuo_info:'出牌阶段限两次，弃置一张牌，并选择两名其他角色，然后令两名角色互相使用一张【决斗】。',
	sgsxjxfzmnl_biyue:'闭月',
	sgsxjxfzmnl_biyue_info:'结束阶段，你可以摸两张牌。',

	sgsxjxfzmnl_miheng: "阴间手杀祢衡",
	sgsxjxfzmnl_miheng_prefix: "阴间手杀",
	sgsxjxfzmnl_kuangcai: "狂才",
	sgsxjxfzmnl_kuangcai_info: "出牌阶段开始时，你可以令你此阶段内的主动出牌时间变为<span class=firetext>X</span>秒。若如此做，你于此阶段内使用牌没距离和次数限制，且每当你于此阶段内使用牌时，你摸一张牌且主动出牌时间-1秒。若主动出牌时间减至0，则你结束出牌阶段。<span class=yellowtext>（X为5+你的武将星级）</span>",
	sgsxjxfzmnl_shejian: "舌剑",
	sgsxjxfzmnl_shejian_info: "弃牌阶段结束时，<span class=firetext>若你于此阶段弃置了牌，你可以弃置一名其他角色等量张牌</span>。",

	sgsxjxfzmnl_wangyuanji:'阴间王元姬',
	sgsxjxfzmnl_wangyuanji_prefix:'阴间',
	sgsxjxfzmnl_qianchong: "谦冲",
	sgsxjxfzmnl_qianchong_info: `锁定技，若你的装备区内有牌且：均为红色，则你视为拥有技能${get.poptip('mingzhe')}。均为黑色，则你视为拥有技能${get.poptip('weimu')}。若出牌阶段开始时，若你不满足上述条件，你本回合内使用牌没有次数和距离限制。`,
	sgsxjxfzmnl_shangjian: "尚俭",
	sgsxjxfzmnl_shangjian_info: "锁定技。一名角色的结束阶段开始时，若你于此回合内失去过牌，则你摸等同失去数量的牌。",

	sgsxjxfzmnl_shen_guojia:'阴间神郭嘉',
	sgsxjxfzmnl_shen_guojia_prefix:'阴间神',
	sgsxjxfzmnl_reshuishi:'慧识',
	sgsxjxfzmnl_reshuishi_info:'出牌阶段限两次，你可进行判定牌不置入弃牌堆的判定。若判定结果与本次发动技能时的其他判定结果的花色均不相同，则你加1点体力上限，且可以重复此流程。然后你将所有位于处理区的判定牌交给一名角色。',

	sgsxjxfzmnl_wenyang:'阴间文鸯',
	sgsxjxfzmnl_wenyang_prefix:'阴间',
	sgsxjxfzmnl_quedi:'却敌',
	sgsxjxfzmnl_quedi_info:'每回合限两次。当你使用【杀】或【决斗】指定唯一目标后，你可选择：①获得目标角色的一张手牌。②弃置一张基本牌，并令此牌的伤害值基数+1。③背水：减1点体力上限，然后依次执行上述所有选项。',
	sgsxjxfzmnl_chuifeng:'椎锋',
	sgsxjxfzmnl_chuifeng_info:'魏势力技。你可以失去1点体力并视为使用一张【决斗】（你死亡后仍然结算）。当你因此【决斗】而受到伤害时，你防止此伤害。',
	sgsxjxfzmnl_chongjian:'冲坚',
	sgsxjxfzmnl_chongjian_backup: "冲坚",
	sgsxjxfzmnl_chongjian_info:'吴势力技。你可以将一张装备牌当做一种【杀】（无距离限制无次数限制且无视防具）或【酒】使用。当你以此法使用【杀】造成伤害后，你获得目标角色装备区内的X张牌（X为伤害值）。',
	// sgsxjxfzmnl_choujue:'仇决',
	// sgsxjxfzmnl_choujue_info:'锁定技。当你杀死其他角色后，你加1点体力上限并摸两张牌，然后你本回合发动〖却敌〗的次数上限+1。',

	sgsxjxfzmnl_re_jushou:'阴间界沮授',
	sgsxjxfzmnl_re_jushou_prefix:'阴间界',
	sgsxjxfzmnl_rejianying:'渐营',
	sgsxjxfzmnl_rejianying_info:'①当你于出牌阶段内使用与此阶段你使用的上一张牌点数或花色相同的牌时，你可以摸一张牌。②出牌阶段限<span class=firetext>两</span>次，你可以将一张牌当做任意基本牌使用。若你于此阶段内使用的上一张牌有花色，则此牌的花色视为上一张牌的花色',
	sgsxjxfzmnl_reshibei:'矢北',
	sgsxjxfzmnl_reshibei_info:'锁定技，当你受到伤害后，若此是你本回合<span class=firetext>奇数次</span>受到伤害，你回复1点体力。',

	sgsxjxfzmnl_shen_ganning:'阴间神甘宁',
	sgsxjxfzmnl_shen_ganning_prefix:'阴间神',
	sgsxjxfzmnl_drltpoxi:'魄袭',
	sgsxjxfzmnl_drltpoxi_info:'出牌阶段，你可以观看一名其他角色的手牌，然后你可以弃置你与其手牌中的四张花色不同的牌。若如此做，根据此次弃置你的牌的数量执行以下效果：零张，<span class=firetext>增加</span>1点体力上限；一张，<span class=yellowtext>摸一张牌</span>；三张，你回复1点体力；四张，摸四张牌。若你没有因此弃置目标的牌，你本回合不能再选择其为此技能目标。',
	sgsxjxfzmnl_drltjieying:'劫营',
	sgsxjxfzmnl_drltjieying_info:'回合开始时，若场上没有拥有“营”标记的角色，你获得1个“营”标记；结束阶段，你可以将你的一个“营”标记交给一名角色；有“营”标记的角色摸牌阶段多摸一张牌，出牌阶段使用【杀】的次数上限+1，手牌上限+1，<span class=yellowtext>此数值对你翻倍</span>。有“营”的其他角色回合结束时，其移去“营”标记，然后你获得其所有手牌。',
	
	sgsxjxfzmnl_shichangshi: "阴间十常侍",
	sgsxjxfzmnl_shichangshi_prefix: "阴间",
	sgsxjxfzmnl_mbdanggu: "党锢",
	sgsxjxfzmnl_mbdanggu_info: "锁定技。①游戏开始时，你获得十张“常侍”牌，然后你进行一次结党。②当你修整结束后，你进行一次结党并摸两张牌。③若你有亮出的“常侍”牌，你视为拥有这些牌的技能。<span class=yellowtext>（这是仙界下凡怎么你了的十常侍专用的党锢）</span>",
	sgsxjxfzmnl_mbdanggu_faq: "关于结党",
	sgsxjxfzmnl_mbdanggu_faq_info: "<br>系统随机选择一张未亮出过的“常侍”牌，然后选择四张未亮出过的“常侍”牌。你观看前者，然后从后者中选择一名认可前者的“常侍”牌。然后若此时不为双将模式，你将这两张武将牌作为你的武将牌（不移除原有技能）；否则你获得这两张武将牌上的技能。",
	sgsxjxfzmnl_mbdanggu_faq2: "关于认可",
	sgsxjxfzmnl_mbdanggu_faq2_info:'这个版本十常侍没有不认可',
	// sgsxjxfzmnl_mbdanggu_faq2_info: "<br>双向不认可常侍为固定组合：<br><li>郭胜、段珪<br><li>韩悝、毕岚<br>单向不认可常侍为系统随机分配。<br>每次结党至多存在一张不认可主将的常侍牌，且若此次结党仅有一张常侍牌，则不会存在不认可情况。",
	sgsxjxfzmnl_mbmowang: "殁亡",
	sgsxjxfzmnl_mbmowang_info: "锁定技。①当你死亡前，若你有未亮出的“常侍”牌且体力上限大于0，你将死亡改为修整至你的下个回合开始前，然后你复原武将牌，且不于此次死亡事件中进行展示身份牌、检测游戏胜利条件与执行奖惩的流程。②回合结束后，你死亡。<span class=yellowtext>（这是仙界下凡怎么你了的十常侍专用的殁亡）</span>",
	sgsxjxfzmnl_mbmowang_faq: "关于修整",
	sgsxjxfzmnl_mbmowang_faq_info: "<br>将武将牌移出游戏（视为你存活）。当该角色修整结束，其移回游戏。",
	sgsxjxfzmnl_scs_zhangrang: "阴间张让",
	sgsxjxfzmnl_scs_zhangrang_prefix: "阴间",
	sgsxjxfzmnl_scstaoluan: "滔乱",
	sgsxjxfzmnl_scstaoluan_info: "出牌阶段限一次。你可以将一张牌当任意一种基本牌或普通锦囊牌或延时锦囊牌使用<span class=yellowtext>，然后摸一张牌</span>。",
	sgsxjxfzmnl_scs_zhaozhong: "阴间赵忠",
	sgsxjxfzmnl_scs_zhaozhong_prefix: "阴间",
	sgsxjxfzmnl_scschiyan: "鸱咽",
	sgsxjxfzmnl_scschiyan_info: "①当你使用【杀】指定目标后，你可以将其至多X张牌置于其武将牌上<span class=yellowtext>（X为其体力值）</span>，然后其于当前回合结束时获得这些牌。②当你因执行【杀】的效果对一名角色造成伤害时，<span style=\"text-decoration: line-through;\">若该角色的手牌数和装备区内的牌数均不大于你，</span>此伤害+1。",
	sgsxjxfzmnl_scs_sunzhang: "阴间孙璋",
	sgsxjxfzmnl_scs_sunzhang_prefix: "阴间",
	sgsxjxfzmnl_scszimou: "自谋",
	sgsxjxfzmnl_scszimou_info: "锁定技。出牌阶段，当你使用第二/四/六张牌时，你从牌堆中获得一张【杀】<span class=yellowtext>和【闪】</span>/【酒】<span class=yellowtext>和【桃】</span>/【决斗】<span class=yellowtext>和【无中生有】</span>。",
	sgsxjxfzmnl_scs_bilan: "阴间毕岚",
	sgsxjxfzmnl_scs_bilan_prefix: "阴间",
	sgsxjxfzmnl_scspicai: "庀材",
	sgsxjxfzmnl_scspicai_info: "出牌阶段限一次。你可进行判定牌不置入弃牌堆的判定。若判定结果的花色和点数在本次发动技能时的其他判定结果中均未出现，则你可以重复此流程。然后你将所有位于处理区的判定牌交给一名角色。",
	// sgsxjxfzmnl_scspicai_info: "出牌阶段限一次。你可进行判定牌不置入弃牌堆的判定。若判定结果与本次发动技能时的其他判定结果的花色均不相同，则你可以重复此流程。然后你将所有位于处理区的判定牌交给一名角色。",
	sgskjdbzjms_scspicai_append:'此技能原作者描述有问题，我试着嘟嘟看看有没有实战，有实战以实战为准<br>找了，没有实战，村了。',

	sgsxjxfzmnl_scs_xiayun: "阴间夏恽",
	sgsxjxfzmnl_scs_xiayun_prefix: "阴间",
	sgsxjxfzmnl_scsyaozhuo: "谣诼",
	sgsxjxfzmnl_scsyaozhuo_info: "出牌阶段限一次。你可以与一名角色拼点，若你赢，其跳过下一个摸牌阶段；若你没赢，你<span class=firetext>摸</span>一张牌。",
	sgsxjxfzmnl_scs_hankui: "阴间韩悝",
	sgsxjxfzmnl_scs_hankui_prefix: "阴间",
	sgsxjxfzmnl_scsxiaolu: "宵赂",
	sgsxjxfzmnl_scsxiaolu_info: "出牌阶段限一次。你可以摸<span class=firetext>五</span>张牌，然后选择一项：1.弃置<span class=firetext>五</span>张手牌；2.将<span class=firetext>五</span>张牌交给一名其他角色。",
	sgsxjxfzmnl_scs_lisong: "阴间栗嵩",
	sgsxjxfzmnl_scs_lisong_prefix: "阴间",
	sgsxjxfzmnl_scskuiji: "窥机",
	sgsxjxfzmnl_scskuiji_info: "出牌阶段限一次。你可以观看一名其他角色的手牌，然后弃置你与其的共计四张花色各不相同的手牌。",//没加强？！
	sgsxjxfzmnl_scs_duangui: "阴间段珪",
	sgsxjxfzmnl_scs_duangui_prefix: "阴间",
	sgsxjxfzmnl_scschihe: "叱吓",
	sgsxjxfzmnl_scschihe_info: "当你使用【杀】指定唯一目标后，你可亮出牌堆顶的<span class=firetext>四</span>张牌，令此【杀】的伤害值基数+X（X为亮出牌中花色与此【杀】相同的牌数），且目标角色不能使用亮出牌包含的花色的牌响应此【杀】。",
	sgsxjxfzmnl_scs_guosheng: "阴间郭胜",
	sgsxjxfzmnl_scs_guosheng_prefix: "阴间",
	sgsxjxfzmnl_scsniqu: "逆取",
	sgsxjxfzmnl_scsniqu_info: "出牌阶段限一次。你可以对<span class=firetext>至多两名</span>角色造成1点火焰伤害。",
	sgsxjxfzmnl_scs_gaowang: "阴间高望",
	sgsxjxfzmnl_scs_gaowang_prefix: "阴间",
	// sgsxjxfzmnl_scsanruo: "安弱",
	// sgsxjxfzmnl_scsanruo_info: "你可以将一张♥牌当【桃】、♦牌当火【杀】、♣牌当【闪】、♠牌当【无懈可击】使用。当你以此法使用或打出【杀】或【闪】时，你可以获得对方的一张牌；当你以此法使用【桃】时，你可以获得一名其他角色的一张牌；当你以此法使用【无懈可击】时，你可以获得此牌响应的普通锦囊牌的使用者的一张牌。",
	sgsxjxfzmnl_scsmiaoyu: "妙语",
	sgsxjxfzmnl_scsmiaoyu_info: "你可以将一张♥牌当【桃】、♦牌当火【杀】、♣牌当【闪】、♠牌当【无懈可击】使用<span class=firetext>（没写打出，但根据后文以及剧情，应该是有的）</span>。当你以此法使用或打出牌时，你获得一名任意角色牌<span class=firetext>（没说可，就当可吧）</span>",

	sgsxjxfzmnl_yue_caiwenji: "阴间乐蔡琰",
	sgsxjxfzmnl_yue_caiwenji_prefix: "阴间乐",
	sgsxjxfzmnl_dcshuangjia: "霜笳",
	// sgsxjxfzmnl_dcshuangjia_tag: "胡笳",//不必要
	sgsxjxfzmnl_dcshuangjia_info: '锁定技。①游戏开始，你将初始手牌标记为“胡笳”。②你的“胡笳”牌不计入手牌上限。③其他角色至你的距离+X（X为你的“胡笳”数且<span class=firetext>无上限</span>）④结束阶段，你可以将所有手牌标记为“胡笳”。',
	sgsxjxfzmnl_dcbeifen: "悲愤",
	sgsxjxfzmnl_dcbeifen_info: "锁定技。①当你失去牌后，若这些牌中有“胡笳”牌，你获得本次失去牌中“胡笳”牌花色均不同的每种花色的牌各一张。②若你手牌中有“胡笳”牌，你使用牌无距离和次数限制。",

	sgsxjxfzmnl_liuyan:'阴间刘焉',
	sgsxjxfzmnl_liuyan_prefix:'阴间',
	sgsxjxfzmnl_tushe:'图射',
	sgsxjxfzmnl_tushe_info:'当你使用牌指定目标后，若你没有基本牌，则你可以摸X张牌（X为此牌指定的目标数）',
	sgsxjxfzmnl_limu:'立牧',
	sgsxjxfzmnl_limu_info:'出牌阶段，你可以将一张牌当【乐不思蜀】对<span class=firetext>任意角色</span>使用，然后恢复一点体力；你判定区有牌时，你对其他角色使用牌没有次数和距离限制。',

	sgsxjxfzmnl_shen_xunyu: "阴间神荀彧",
	sgsxjxfzmnl_shen_xunyu_prefix: "阴间神",
	sgsxjxfzmnl_tianzuo: "天佐",//前述是描述原文，这是我的解释：在牌堆，弃牌堆，场上玩家手中的一张因此加入游戏的【奇正相生】
	sgsxjxfzmnl_tianzuo_info: "锁定技。①游戏开始时，你将八张【奇正相生】加入牌堆；<span class=yellowtext>摸牌阶段开始时，你获得一张【奇正相生】（如武继般）。</span>②【奇正相生】对你无效。",
	sgsxjxfzmnl_lingce: "灵策",
	sgsxjxfzmnl_lingce_info: "锁定技。当有【奇正相生】或智囊或〖定汉①〗记录过的锦囊牌被使用时，你摸一张牌。",
	sgsxjxfzmnl_dinghan: "定汉",
	sgsxjxfzmnl_dinghan_info: "①当你成为未记录过的普通锦囊牌的目标时，或有未记录过的延时锦囊牌进入你的判定区时，你取消之。②准备阶段，你可在〖定汉①〗的记录中添加或减少锦囊牌的牌名。",

	sgsxjxfzmnl_shen_zhangfei: "阴间神张飞",
	sgsxjxfzmnl_shen_zhangfei_prefix: "阴间神",
	sgsxjxfzmnl_shencai: "神裁",
	sgsxjxfzmnl_shencai_info: "出牌阶段限一次，你可以令一名其他角色进行判定。你获得此判定牌，然后若此判定牌：包含以下要素中的任意一个，则其失去已有的下列效果，并获得对应的效果：{⒈体力：当其受到伤害后，其失去等量的体力、⒉武器：<span class=yellowtext>其不能响应牌</span>、⒊打出：当其失去手牌后，其再随机弃置一张手牌（不嵌套触发）、⒋距离：其的结束阶段开始时，其翻面}；若均不包含，你获得其区域里的一张牌，其获得一枚“死”并获得如下效果：其的角色手牌上限减至0、其的回合结束时，若X大于场上存活人数，则其死亡（X为其“死”标记数）。",
	sgsxjxfzmnl_xunshi: "巡使",
	sgsxjxfzmnl_xunshi_info: "锁定技。①你的多目标锦囊牌均视为花色为none的普【杀】。②你使用颜色为none的牌无距离和次数限制且可以指定任意目标，然后<span class=yellowtext>令你的〖神裁〗的发动次数上限+Y（Y为巡使发动次数）</span>。",

	sgsxjxfzmnl_wu_zhugeliang: "阴间武诸葛亮",
	sgsxjxfzmnl_wu_zhugeliang_prefix: "阴间武",
	sgsxjxfzmnl_dcjincui: "尽瘁",
	sgsxjxfzmnl_dcjincui_info: "锁定技。①游戏开始时，你将手牌摸至七张。②准备阶段，你<span class=yellowtext>回满体力</span>。然后你观看牌堆顶X张牌，将这些牌以任意顺序置于牌堆顶或牌堆底（X为你的体力值）。",
	sgsxjxfzmnl_dcqingshi: "情势",
	sgsxjxfzmnl_dcqingshi_info: "当你于出牌阶段使用牌时，若你本回合未因此牌名的牌发动过该技能，你可以选择一项：1.令此牌对其中一个目标角色造成的<span class=yellowtext>伤害+X（X为其全场相同势力数）</span>；2.<span class=yellowtext>令任意名角色各摸Y张牌（Y为全场蜀势力数）</span>；3.<span class=yellowtext>摸七张牌</span>。",
	// sgsxjxfzmnl_dcqingshi_append:'（夜白哔哔：什么叫全场相同阵营？这是身份场能出现的吗？）（看了二项————原来这叫阵营……）',
	sgsxjxfzmnl_dczhizhe: "智哲",
	sgsxjxfzmnl_dczhizhe_clear: "invisible",
	sgsxjxfzmnl_dczhizhe_info: "限定技。出牌阶段，你可以选择一张手牌并复制之。当你使用或打出此复制牌结算结束后，你获得之，然后你本回合不能再使用或打出此牌。<span class=yellowtext>这张牌无法被弃置</span>",

	sgsxjxfzmnl_sb_caopi: "阴间谋曹丕",
	sgsxjxfzmnl_sb_caopi_prefix: "阴间谋",
	sgsxjxfzmnl_sbxingshang: "行殇",
	sgsxjxfzmnl_sbxingshang_info: "①当一名角色受到伤害后或死亡时，你获得2个“颂”标记。②出牌阶段，你可以：1.移去2个“颂”标记，令一名角色复原武将牌;2.移去2个“颂”标记，令一名角色摸X张牌（X为本场已死亡角色数，至少为2）；3.移去5个“颂”标记，令一名角色回复X点体力，增加X点体力上限，随机恢复一个已废除的装备栏（X为本场已死亡角色数）（原文没写至少为2，我就不加了）；4.移去5个“颂”标记，获得一名阵亡角色武将牌上的所有技能，然后你失去〖行殇〗〖放逐〗〖颂威〗。",
	sgsxjxfzmnl_sbfangzhu: "放逐",
	sgsxjxfzmnl_sbfangzhu_info: "出牌阶段，<span class=yellowtext>若你拥有〖行殇〗</span>，你可以：1.移去1个“颂”标记，令一名其他角色于手牌中不能使用基本牌以外的牌直到其回合结束；2.移去2个“颂”标记，令一名其他角色于手牌中不能使用锦囊牌以外的牌直到其回合结束。3.移去3个“颂”标记，令一名其他角色于手牌中不能使用装备牌以外的牌直到其回合结束；4.移去2个“颂”标记，令一名其他角色的非Charlotte技能失效直到其回合结束；5.移去2个“颂”标记，令一名其他角色不能响应除其以外的角色使用的牌直到其回合结束；6.移去3个“颂”标记，令一名其他角色将武将牌翻面；",
	sgsxjxfzmnl_sbfangzhu_append:'没有若为斗地主，若你拥有行殇是作者写的，作者咋描述我就咋写',
	// sgsxjxfzmnl_sbfangzhu_info_doudizhu: "出牌阶段限一次，你可以：1.移去6个“颂”标记，令一名其他角色于手牌中只能使用锦囊牌直到其回合结束。2.移去4个“颂”标记，令一名其他角色不能响应除其以外的角色使用的牌直到其回合结束；3.移去8个“颂”标记，令一名其他角色将武将牌翻面；",
	sgsxjxfzmnl_sbsongwei: "颂威",
	sgsxjxfzmnl_sbsongwei_info: "主公技，出牌阶段开始时，<span class=yellowtext>若你拥有〖行殇〗</span>，你获得Y个“颂”标记（Y为场上其他魏势力角色数的两倍）。每回合限一次，你可以于出牌阶段令一名其他魏势力角色失去所有武将技能。",
	sgsxjxfzmnl_sbsongwei_append:'若你拥有行殇是作者写的，作者咋描述我就咋写',

	sgsxjxfzmnl_boss_zhaoyun: "阴间高达",
	sgsxjxfzmnl_boss_zhaoyun_ab: "阴间神赵云",
	sgsxjxfzmnl_boss_zhaoyun_prefix: "阴间神",
	sgsxjxfzmnl_boss_juejing: "绝境",
	sgsxjxfzmnl_boss_juejing2: "绝境",
	sgsxjxfzmnl_boss_juejing_info: "持恒技，摸牌阶段开始前，你跳过此阶段。你的手牌数恒为4+X（X为你的武将星级）。",
	sgsxjxfzmnl_boss_juejing_append:'武将星级还未实装。',
	sgsxjxfzmnl_xinlonghun: "龙魂",
	sgsxjxfzmnl_xinlonghun_info: "你可以将同花色的一至两张牌按下列规则使用或打出：红桃当【桃】，方块当火【杀】，梅花当【闪】，黑桃当普【无懈可击】。若你以此法转化了两张：红色牌，则此牌回复值或伤害值+1；黑色牌，则你弃置当前回合角色一张牌。",
	sgsxjxfzmnl_zhanjiang: "斩将",
	sgsxjxfzmnl_zhanjiang_info: "你始终视为装备【青釭剑】。",

	sgsxjxfzmnl_nanhualaoxian: "阴间手杀南华老仙",
	sgsxjxfzmnl_nanhualaoxian_prefix: "阴间手杀",
	sgsxjxfzmnl_yufeng: "御风",
	sgsxjxfzmnl_yufeng2: "御风",
	sgsxjxfzmnl_yufeng_info: "出牌阶段，你可以令任意名其他角色获得“御风”效果，然后摸给出“御风”数张牌（准备阶段开始时，你进行判定。若结果为：红色，你跳过摸牌阶段；黑色，你跳过出牌阶段和弃牌阶段。）。",
	sgsxjxfzmnl_tianshu: "天书",
	sgsxjxfzmnl_tianshu_info: "出牌阶段开始时，若<span class=yellowtext>游戏内</span>上没有【太平要术】，则你可以弃置一张牌并选择一名角色。该角色获得并使用【太平要术】。",
	sgsxjxfzmnl_tianshu_append:'鬼知道作者为啥反向突破',
	sgsxjxfzmnl_taipingyaoshu: "太平要术",
	sgsxjxfzmnl_taipingyaoshu_info: "锁定技，防止你受到属性伤害；你的手牌上限+X（X为全场势力数）；当你失去装备区内的此牌后，摸两张牌，若你的体力值不满，回复一点体力。",

	sgsxjxfzmnl_mo_lvbu:'魔吕布',
	sgsxjxfzmnl_mo_lvbu_prefix:'魔',
	sgsxjxfzmnl_jielve:'劫掠',
	sgsxjxfzmnl_jielve_info:'每当你对攻击范围内的其他角色造成伤害，你可以获得其一张手牌。',
	sgsxjxfzmnl_zhenhuo:'枕惑',
	sgsxjxfzmnl_zhenhuo_info:'锁定技，女性角色对你使用的锦囊牌不可被【无懈可击】响应，女性角色读你造成的伤害+1。',
	sgsxjxfzmnl_wuqian: '无前',
	sgsxjxfzmnl_wuqian_info: '每回合限一次，你可以将所有手牌当一张【杀】使用或打出，此【杀】不计入次数限制，不可被响应且伤害+1，当此【杀】造成伤害后你失去一点体力。',

	sgsxjxfzmnl_zhangxuan:'阴间张嫙',
	sgsxjxfzmnl_zhangxuan_prefix:'阴间',
	sgsxjxfzmnl_tongli:'同礼',
	sgsxjxfzmnl_tongli_info:'<span class=yellowtext>出牌阶段限四次</span>，使用牌指定目标后，可令此牌效果额外执行X次。（X为本回合使用牌次数，且最多为4）',
	sgsxjxfzmnl_shezang:'奢葬',
	sgsxjxfzmnl_shezang_info:'你进入濒死或有人进入濒死，可获得不同花色的牌各1张。',

	sgsxjxfzmnl_caojinyu:'阴间曹金玉',
	sgsxjxfzmnl_caojinyu_prefix:'阴间',
	sgsxjxfzmnl_yuqi:'隅泣',
	sgsxjxfzmnl_yuqi_info:'锁定技，有角色受伤后，若你与其距离小于等于0，你可以观看牌堆顶3张牌，将其中至多1张交给受伤角色，至多1张自己获得，其余的牌放回牌堆顶。（三国杀仙界下凡怎么你了的曹金玉）',
	sgsxjxfzmnl_shanshen:'善身',
	sgsxjxfzmnl_shanshen_info:'有角色进入濒死时，你可令‘隅泣’中的一个数字+1；有角色死亡时，你可令‘隅泣’中的一个数字+2。（若你没有对死亡角色造成过伤害，你回复1点体力<span class=yellowtext>且‘隅泣’增加的数字X2</span>）（三国杀仙界下凡怎么你了的曹金玉）',
	sgsxjxfzmnl_xianjing:'娴静',
	sgsxjxfzmnl_xianjing_info:'准备阶段，你可令‘隅泣’中的一个数字+1。若你满体力，再令‘隅泣’中的一个数字+1。（三国杀仙界下凡怎么你了的曹金玉）',

	sgsxjxfzmnl_shen_machao:'阴间神马超',
	sgsxjxfzmnl_shen_machao_prefix:'阴间神',
	sgsxjxfzmnl_shouli:'狩骊',
	sgsxjxfzmnl_shouli_info:'<span class=yellowtext>每轮开始</span>，从下家开始所有角色随机使用场上一张坐骑牌。你可以将场上的进攻马当不限次数无法响应的[杀]、防御马当[闪]打出或使用。（以此法失去坐骑牌的其他角色本回合失去所有技能，你与其本回合受到的伤害+1且改为雷电伤害。）',
	sgsxjxfzmnl_hengwu:'横骛',
	sgsxjxfzmnl_hengwu_info:'你使用或打出牌时，若你没有该花色的手牌，可摸X张牌。（X为场上与此牌花色相同的装备数量）',

	sgsxjxfzmnl_sunhanhua:'阴间孙寒华',
	sgsxjxfzmnl_sunhanhua_prefix:'阴间',
	sgsxjxfzmnl_chongxu: "冲虚",
	sgsxjxfzmnl_chongxu_info: "出牌阶段限<span class=yellowtext>三</span>次，你可以进行一次‘集灵’来获得分数，然后你可以用分数来进行升级“妙剑”、升级“莲华”或摸牌。",
	sgsxjxfzmnl_chongxu_append: '无名杀没有集灵，只有齐秦太帅青春版。',
	sgsxjxfzmnl_chongxu_faq: "目前的曲库",
	sgsxjxfzmnl_chongxu_faq_info: "　<br>《鸟之诗》- 折户伸治<br>《竹取飛翔　～ Lunatic Princess》- ZUN<br>《ignotus》- ak+q<br>《Super Mario 3D World Theme》- 横田真人<br>《只因你太美》- SWIN-S<br>《Croatian Rhapsody》- Maksim<br>《罗刹海市》- 刀郎<br>《Pigstep (Stereo Mix)》- Lena Raine",
	sgsxjxfzmnl_miaojian: "妙剑",
	sgsxjxfzmnl_miaojian_info: "出牌阶段限一次，你可以使用[杀]当做一张不限次数的[刺杀]使用，或将一张锦囊牌当做[无中生有]使用。",
	sgsxjxfzmnl_miaojian1: "妙剑·改",
	sgsxjxfzmnl_miaojian1_info: "出牌阶段限两次，你可以将一张基本牌当做一张不限次数的[刺杀]使用，或将一张非基本牌当做[无中生有]使用。",
	sgsxjxfzmnl_miaojian2: "妙剑·极",
	sgsxjxfzmnl_miaojian2_info: "出牌阶段限三次，你可以视为使用一张不限次数的[刺杀]或视为使用一张[无中生有]。",
	sgsxjxfzmnl_shhlianhua: "莲华",
	sgsxjxfzmnl_shhlianhua_info: "你成为其他角色使用[杀]的目标时，你摸一张牌。",
	sgsxjxfzmnl_shhlianhua1: "莲华·改",
	sgsxjxfzmnl_shhlianhua1_info: "你成为其他角色使用[杀]的目标时，你摸一张牌，然后进行一次判定，若判定结果为黑色，则取消之。",
	sgsxjxfzmnl_shhlianhua2: "莲华·极",
	sgsxjxfzmnl_shhlianhua2_info: "你成为其他角色使用牌的目标时，你摸一张牌，然后随机弃该角色一张牌，若该角色没有牌则取消之，若该角色成功弃牌则进行判定，若判定结果为黑色，取消之。",

	sgsxjxfzmnl_xin_guozhao: "阴间手杀郭照",
	sgsxjxfzmnl_xin_guozhao_prefix: "阴间手杀",
	sgsxjxfzmnl_yichong: "易宠",
	sgsxjxfzmnl_yichong_info: "①准备阶段，你可以选择一名其他角色并选择一个<span class=yellowtext>颜色，然后你获得其所有此颜色的牌</span>，移除场上的所有“雀”标记，令其获得“雀”标记直到你的下个回合开始。②拥有“雀”标记的角色获得你最后一次发动〖易宠①〗选择的<span class=yellowtext>颜色</span>的牌后，你获得这些牌。",
	sgsxjxfzmnl_wufei: "诬诽",
	sgsxjxfzmnl_wufei_info: "若场上存在拥有“雀”标记的角色A，则：①当你使用【杀】或伤害类锦囊牌指定第一个目标后，你令A成为此牌伤害来源。②当你受到伤害后，若A的体力值大于<span class=yellowtext>你</span>，则你可以令A受到1点无来源伤害。",

	sgsxjxfzmnl_sb_guanyu: "阴间谋关羽",
	sgsxjxfzmnl_sb_guanyu_prefix: "阴间谋",
	sgsxjxfzmnl_sbwusheng: "武圣",
	sgsxjxfzmnl_sbwusheng_wusheng_backup: "武圣",
	sgsxjxfzmnl_sbwusheng_info: "你可以将一张手牌当作任意【杀】使用或打出。出牌阶段开始时，你可以选择一名其他角色，本阶段对其使用【杀】无距离和次数限制，使用【杀】指定其为目标后摸两张牌，对其使用X张【杀】后不能对其使用【杀】（X为<span class=yellowtext>目标体力值</span>）（<span class=yellowtext>经主角实战，X实为指定目标时的目标体力值</span>）。",
	sgsxjxfzmnl_sbyijue: "义绝",
	sgsxjxfzmnl_sbyijue_info: "锁定技，每名角色每局游戏限一次，<span class=firetext>一名其他角色受到你对其造成的伤害时并进入濒死状态时，若其脱离濒死状态</span>，则本回合你使用牌指定其为目标时，此牌对其无效。",

	sgsxjxfzmnl_sb_huanggai: "阴间谋黄盖",
	sgsxjxfzmnl_sb_huanggai_prefix: "阴间谋",
	sgsxjxfzmnl_sbkurou: "苦肉",
	sgsxjxfzmnl_sbkurou_info: "①出牌阶段开始时，你可以交给其他角色一张牌，若此牌于对方手牌区内为【桃】或【酒】，你失去2点体力，否则你失去1点体力。②当你失去1点体力后，你获得2点护甲。<span class=yellowtext>你的手牌上限+X（X为你护甲值）</span>",
	sgsxjxfzmnl_sbzhaxiang: "诈降",
	sgsxjxfzmnl_sbzhaxiang_info: "锁定技。①摸牌阶段，你多摸X张牌。②你于回合内使用的前X张牌无距离与次数限制且不能被响应（X为你已损失的体力值<span class=yellowtext>+护甲值</span>）。",

	sgsxjxfzmnl_dc_zhouxuān: "阴间周宣",
	sgsxjxfzmnl_dc_zhouxuān_prefix: "阴间",
	sgsxjxfzmnl_dcwumei: "寤寐",
	sgsxjxfzmnl_dcwumei_info: "每两回合一次。回合开始前，你可以令一名角色执行一个额外回合。以此法进行的回合结束时，<span class=firetext>所有此回合受伤的角色需选择一项：1.将两张手牌交给你；2.失去一点体力。</span>",
	sgsxjxfzmnl_dczhanmeng: "占梦",
	sgsxjxfzmnl_dczhanmeng_info: "<span class=yellowtext>每回合每种牌名限一次。</span>当你使用牌时，你可以选择一项：<span class=firetext>1.你摸一张非伤害牌；2.你摸一张伤害牌；3.对角色一名造成1点火焰伤害，并令其弃置两张牌。</span>",
	sgsxjxfzmnl_dczhanmeng_append:'其实根据剧情战斗，第三项是先弃牌再砸伤。',

	sgsxjxfzmnl_sunlingluan: "阴间孙翎鸾",
	sgsxjxfzmnl_sunlingluan_prefix: "阴间",
	sgsxjxfzmnl_dclingyue: "聆乐",
	sgsxjxfzmnl_dclingyue_info: "锁定技。一名角色于一轮内首次造成伤害后，你摸一张牌。若此时是该角色回合外，则改为摸X张牌（X为本回合全场造成的伤害值）。",
	sgsxjxfzmnl_dcpandi: "盻睇",
	sgsxjxfzmnl_dcpandi_info: "出牌阶段，你可以选择一名其他角色。你本阶段内使用的下一张牌改为以该角色为基准判断使用目标合法性，且使用者改为该角色。",

	sgsxjxfzmnl_xushao: "阴间许劭",
	sgsxjxfzmnl_xushao_prefix: "阴间",
	sgsxjxfzmnl_pingjian: "评荐",
	sgsxjxfzmnl_pingjian_use: "评荐",
	sgsxjxfzmnl_pingjian_info: "结束阶段开始时/当你受到伤害后/出牌阶段限<span class=yellowtext>X次（X为存活角色的势力数）</span>，你可以<span class=yellowtext>令系统从阴间将池中</span>随机检索出三张拥有发动时机为结束阶段开始时/当你受到伤害后/出牌阶段的技能的武将牌。然后你可以选择尝试发动其中一个技能。",

	sgsxjxfzmnl_sp_huaman: "阴间手杀花鬘",
	sgsxjxfzmnl_sp_huaman_prefix: "阴间手杀",
	sgsxjxfzmnl_spxiangzhen: "象阵",
	sgsxjxfzmnl_spxiangzhen_info: "锁定技。①【南蛮入侵】对你无效。②当有角色使用的【南蛮入侵】结算结束后，若有角色因此牌受到过伤害，你摸造成伤害数的牌，若此牌没有造成伤害，你获得此【南蛮入侵】。",
	sgsxjxfzmnl_spfangzong: "芳踪",
	sgsxjxfzmnl_spfangzong_info: "锁定技。①你不能于出牌阶段使用具有伤害标签的牌指定攻击范围内的角色为目标。②攻击范围内包含你的角色不能使用具有伤害标签的牌指定你为目标。③结束阶段，你将手牌摸至X张（X为场上存活人数）（他没写至多为8，希望别出事……）。",
	sgsxjxfzmnl_spxizhan: "嬉战",
	sgsxjxfzmnl_spxizhan_info: "其他角色的回合开始时，你须选择一项：①失去1点体力。②弃置一张牌并令〖芳踪〗于本回合失效，然后若此牌的花色为：♠，其视为使用X张【酒】；♥，你视为使用X张【无中生有】；♣，你视为对其使用【铁索连环】；♦：你视为对其使用X张火【杀】（无距离限制）。（X为场上阵亡角色数）",

	sgsxjxfzmnl_quyi: "阴间麴义",
	sgsxjxfzmnl_quyi_prefix: "阴间",
	sgsxjxfzmnl_fuqi: "伏骑",
	sgsxjxfzmnl_fuqi_info: "锁定技，其他角色不能响应你使用的牌。",
	sgsxjxfzmnl_jiaozi: "骄恣",
	sgsxjxfzmnl_jiaozi_info: "锁定技，你造成或受到伤害时，此伤害+1，<span class=yellowtext>若你的手牌数为全场唯一最多，则在此基础上伤害值*2</span>",
	//依旧是最快传说

	sgsxjxfzmnl_shen_jiangwei: "阴间神姜维",
	sgsxjxfzmnl_shen_jiangwei_prefix: "阴间神",
	sgsxjxfzmnl_tianren: "天任",
	sgsxjxfzmnl_tianren_info: "锁定技。①<span class=firetext>当有牌进入弃牌堆后</span>，你获得一枚“天任”标记。②当你获得“天任”标记或体力上限变化后，若你的“天任”数不小于X，则你移去X枚“天任”，加1点体力上限<span class=yellowtext>并回复一点体力</span>，然后摸两张牌（X为你的体力上限）。",
	sgsxjxfzmnl_jiufa: "九伐",
	sgsxjxfzmnl_jiufa_info: "当你声明使用牌后或打出牌时，你记录此牌的牌名。②当你使用或打出的牌结算结束后，若你的〖九伐〗记录中包含至少九种不同的牌名，则你可以亮出牌堆顶的九张牌，选择并获得其中任意张点数有重复的牌（每个点数限获得一张），清除所有的记录，将其余牌置入弃牌堆。<span class=yellowtext>你以此法获得的牌标记为“伐”，你使用“伐”无距离限制且无法被响应。</span>",
	sgsxjxfzmnl_jiufa_tag: '伐',
	sgsxjxfzmnl_pingxiang: "平襄",
	sgsxjxfzmnl_pingxiang_info: "限定技。出牌阶段，你可减9点体力上限，视为使用至多<span class=firetext>9+X</span>张无距离限制的火【杀】，并将手牌上限基数改为体力上限直到游戏结束。<span class=yellowtext>（X为场上魏势力角色数）</span>",
	//剧情中，平襄时作者给角色换了个皮肤

	sgsxjxfzmnl_dc_liuye: "阴间刘晔",
	sgsxjxfzmnl_dc_liuye_prefix: "阴间",
	sgsxjxfzmnl_dcpoyuan: "破垣",
	sgsxjxfzmnl_dcpoyuan_info: "<span class=firetext>游戏开始时</span>，将一张【阴间霹雳车】置入装备区；回合开始时，你可以弃置一名其他角色X张牌，X为其体力值。",
	sgsxjxfzmnl_dchuace: "画策",
	sgsxjxfzmnl_dchuace_info: "<span class=firetext>出牌阶段限Y次。（Y为场上势力数）</span>你可以将一张手牌当做任意基本牌或普通锦囊牌使用（不得是你本回合你以此法使用过的牌）<span class=yellowtext>，然后你摸一张牌</span>。",
	sgsxjxfzmnl_pilitoushiche: "阴间霹雳车",
	sgsxjxfzmnl_pilitoushiche_info: "锁定技。当你使用基本牌无距离限制，且牌面数值+1。②当你于回合外使用或打出基本牌时，你摸一张牌。<span class=yellowtext>③此宝物无法离开装备区。</span>",

	sgsxjxfzmnl_peixiu: "阴间手杀裴秀",
	sgsxjxfzmnl_peixiu_prefix: "阴间手杀",
	// sgsxjxfzmnl_xingtu: "行图",
	// sgsxjxfzmnl_xingtu1: "倍数",
	// sgsxjxfzmnl_xingtu2: "约数",
	// sgsxjxfzmnl_xingtu_info: "锁定技。你使用点数为X的倍数的牌无次数限制，你使用点数为X的约数的牌时摸一张牌（X为你本局游戏使用的上一张牌的点数）。",
	sgsxjxfzmnl_juezhi: "爵制",
	sgsxjxfzmnl_juezhi_info: "出牌阶段，你可以弃置至少两张牌，然后从牌堆中<span class=yellowtext>选择</span>获得一张点数为Y的牌（Y为这些牌的点数和对13取余，余数为0时Y取13）。",

	sgsxjxfzmnl_wu_luxun: "阴间武陆逊",
	sgsxjxfzmnl_wu_luxun_prefix: "阴间武",
	sgsxjxfzmnl_dcxiongmu: "雄幕",
	sgsxjxfzmnl_dcxiongmu_tag: "雄幕（阴间）",
	sgsxjxfzmnl_dcxiongmu_info: "①每轮开始时，你可以将手牌摸至体力上限（若手牌数不小于体力上限则跳过），然后将任意张牌随机置入牌堆，从牌堆或弃牌堆中获得等量的点数为8的牌，且这些牌不计入手牌上限。②当你于一回合首次受到伤害时，若你的手牌数不大于你的体力值，此伤害-1。",
	// sgsxjxfzmnl_dczhangcai: "彰才",
	// sgsxjxfzmnl_dczhangcai_info: "当你使用或打出点数为8的牌时，你可以摸X张牌（X为你手牌区里点数为8的牌数且至少为1）。",
	sgsxjxfzmnl_dcruxian: "儒贤",
	sgsxjxfzmnl_dcruxian_info: "限定技。出牌阶段，你可以令你〖彰才〗的点数限制取消，且摸牌数改为等同于你手牌区内与此牌点数相同的牌数且至少为1，直到你的下回合开始。<span class=yellowtext>你的回合结束后，若你在此回合内击杀过X名角色，则此技能视为未发动过。（X为全场吴势力数）</span>",

	sgsxjxfzmnl_mb_caomao: "阴间手杀曹髦",
	sgsxjxfzmnl_mb_caomao_prefix: "阴间手杀",
	sgsxjxfzmnl_mbqianlong: "潜龙",
	sgsxjxfzmnl_mbqianlong_info: `${get.poptip("rule_chihengji")}。①游戏开始时，你获得20枚“道心”标记。②当你得到牌后/受到1点伤害后/造成1点伤害后，你获得5/10/15枚“道心”（上限为<span class=firetext>100</span>枚）。③若你的“道心”数不小于0/25/50/75/99/100，你视为拥有${get.poptip("sgsxjxfzmnl_mbcmjianxiong")}/${get.poptip("sgsxjxfzmnl_mbcmqingzheng")}/${get.poptip("sgsxjxfzmnl_mbcmjiushi")}/${get.poptip("sgsxjxfzmnl_mbcmfangzhu")}/${get.poptip("sgsxjxfzmnl_mbjuejin")}/${get.poptip("sgsxjxfzmnl_mbcmguixin")}。（三国杀仙界下凡怎么你了）`,
	sgsxjxfzmnl_mbcmjianxiong:'奸雄',
	sgsxjxfzmnl_mbcmjianxiong_info:`${get.poptip("rule_chihengji")}。当你受到伤害后，你可以获得造成此伤害的牌。`,
	sgsxjxfzmnl_mbcmqingzheng: "清正",
	sgsxjxfzmnl_mbcmqingzheng_info: `${get.poptip("rule_chihengji")}。出牌阶段开始时，你可以弃置一种花色的所有手牌，并观看一名有手牌的其他角色的手牌，你弃置其中一种花色的所有牌。若其被弃置的牌数小于你以此法弃置的牌数，你对其造成1点<span class=yellowtext>火焰</span>伤害。`,
	sgsxjxfzmnl_mbcmjiushi: "酒诗",
	sgsxjxfzmnl_mbcmjiushi_info: `${get.poptip("rule_chihengji")}。①当你需要使用【酒】时，若你的武将牌正面向上，你可以翻面，视为使用一张【酒】。②当你受到伤害后，若你武将牌背面朝上且未因此次伤害发动过〖酒诗〗，你可以翻面。③当你翻面后，你随机获得一张锦囊牌。（原文没说是不是从牌堆，暂且按照从牌堆来算）`,
	sgsxjxfzmnl_mbcmfangzhu: "放逐",
	sgsxjxfzmnl_mbcmfangzhu_info: `${get.poptip("rule_chihengji")}。出牌阶段限一次，你可以选择一名其他角色，选择一项：⒈令其不能使用手牌中的非锦囊牌直到其回合结束；⒉令其所有非Charlotte技能失效直到其回合结束。`,
	sgsxjxfzmnl_mbjuejin: "决进",
	sgsxjxfzmnl_mbjuejin_info: `${get.poptip("rule_chihengji")}，限定技。出牌阶段，你可以令所有角色依次将体力调整至1并获得X点护甲（X为一名角色以此法减少的体力值且你以此法获得的护甲数额外+2）。然后你将牌堆、弃牌堆、场上及所有角色手牌中的【闪】、【桃】和【酒】移出游戏且增加全局技能“${get.poptip({
		id: "sgsxjxfzmnl_juejin_xiangsicunwei",
		name: "向死存魏",
		type: "character",
		info: "当有牌进入弃牌堆后，系统将这些牌中的【闪】、【桃】和【酒】移出游戏。",
	})}”。`,//貌似没变化//谁戟把说没变化？换原画还不是变化？
	sgsxjxfzmnl_mbcmguixin: "归心",
	sgsxjxfzmnl_mbcmguixin_info: `${get.poptip("rule_chihengji")}。当你受到1点伤害后，你可以获得每名其他角色区域里的一张牌。`,//貌似是初版可自选的版本，且无需翻面
	sgsxjxfzmnl_mbweitong: "卫统",
	sgsxjxfzmnl_mbweitong_info: `${get.poptip("rule_chihengji")}，主公技。游戏开始时，若你有〖潜龙〗且场上有其他魏势力角色，你因“潜龙”于游戏开始时获得的“道心”标记数修改为99枚。（三国杀仙界下凡怎么你了）`,
	
	sgsxjxfzmnl_puyuan: "阴间蒲元",
	sgsxjxfzmnl_puyuan_prefix: "阴间",
	sgsxjxfzmnl_pytianjiang:'天匠',
	sgsxjxfzmnl_pytianjiang_info: "游戏开始时，你随机获得<span class=firetext>四</span>张不同副类别的装备牌，并置入你的装备区。出牌阶段，你可以将装备区的牌移动至其他角色的装备区（可替换原装备）。若你以此法移动了〖铸刃〗的衍生装备，你摸<span class=firetext>每种花色各一张</span>牌。",
	sgsxjxfzmnl_pytianjiang_move: "天匠",
	sgsxjxfzmnl_pyzhuren: "铸刃",
	sgsxjxfzmnl_pyzhuren_info: "出牌阶段限一次，你可以弃置一张手牌。根据此牌的花色点数，你有一定概率打造成功并获得一张武器牌（若打造失败或武器已有则改为摸一张【杀】，花色决定武器名称，点数决定成功率）。此武器牌进入弃牌堆时，将其移出游戏。",
	sgsxjxfzmnl_pyzhuren_destroy: "铸刃",
	sgsxjxfzmnl_pyzhuren_heart: "魂缎枪",
	// sgsxjxfzmnl_pyzhuren_heart: "红缎枪",
	sgsxjxfzmnl_pyzhuren_heart_info: "当你使用【杀】造成伤害后，你可以进行判定，若结果为：红色，你回复1点体力；黑色：你摸两张牌。",
	sgsxjxfzmnl_pyzhuren_diamond: "炼狱刀",
	// sgsxjxfzmnl_pyzhuren_diamond: "烈淬刀",
	sgsxjxfzmnl_pyzhuren_diamond_info: "当你使用【杀】对目标角色造成伤害时，你可以<span style=\"text-decoration: line-through;\">弃置一张牌，</span>令此伤害+1。你使用【杀】的次数上限+1。",
	sgsxjxfzmnl_pyzhuren_club: "逝波剑",
	// sgsxjxfzmnl_pyzhuren_club: "水波剑",
	sgsxjxfzmnl_pyzhuren_club_info: "当你使用普通锦囊牌或【杀】时，你可以为此牌增加一个目标。当你失去装备区里的【逝波剑】后，你回复1点体力。",
	sgsxjxfzmnl_pyzhuren_spade: "黄泉弯匕",//9
	// sgsxjxfzmnl_pyzhuren_spade: "混毒弯匕",//9
	sgsxjxfzmnl_pyzhuren_spade_info: "当你使用【杀】指定目标后，你可令其失去X点体力（X为此技能本回合内发动过的次数）。",
	sgsxjxfzmnl_pyzhuren_shandian: "天罚刃",//9
	// sgsxjxfzmnl_pyzhuren_shandian: "天雷刃",
	sgsxjxfzmnl_pyzhuren_shandian_info: "当你使用【杀】指定目标后，可令其进行判定，若结果为：黑桃，其受到3点雷属性伤害；梅花，其受到1点雷属性伤害，你回复1点体力并摸一张牌。",

	sgsxjxfzmnl_dc_shen_huatuo: "阴间神华佗",
	sgsxjxfzmnl_dc_shen_huatuo_prefix: "阴间神",
	sgsxjxfzmnl_jingyu: "静域",
	sgsxjxfzmnl_jingyu_info: "锁定技。当一名角色发动不为〖静域〗的技能时，你摸一张牌。",
	sgsxjxfzmnl_lvxin: "滤心",
	sgsxjxfzmnl_lvxin_info: "出牌阶段限一次。你可以交给一名其他角色一张手牌并选择一项：⒈令其摸X张牌；⒉令其随机弃置X张手牌（<span class=firetext>X为本局势力数</span>）。然后若其以此法得到/弃置了与你交给其的牌牌名相同的牌，其于其下次发动技能时回复/失去1点体力。",
	sgsxjxfzmnl_huandao: "寰道",
	sgsxjxfzmnl_huandao_info: "限定技。出牌阶段，你可以选择一名其他角色。你令其复原武将牌，<span class=firetext>然后为其选择获得一名同名武将技能。若如此做，其失去原本技能</span>。",
	//等实战

	sgsxjxfzmnl_dc_xujing: "阴间许靖",
	sgsxjxfzmnl_dc_xujing_prefix: "阴间",
	// sgsxjxfzmnl_dcshangyu: "赏誉",//一点变化都没有？
	// sgsxjxfzmnl_dcshangyu_tag: "赏誉（阴间）",
	// sgsxjxfzmnl_dcshangyu_info: "锁定技。游戏开始时，你获得一张【杀】并记录之，并可以将此牌交给一名角色。然后你获得如下效果：1.当一名角色使用此牌造成伤害后，你与其各摸一张牌；2.当此牌进入弃牌堆后，你将此牌交给一名本回合未以此法得到过此牌的角色。",
	sgsxjxfzmnl_dccaixia: "才瑕",
	sgsxjxfzmnl_dccaixia_info: "当你造成或受到伤害后，你可以摸至多X张牌，然后你不能发动〖才暇〗直到你使用Y张牌（<span class=firetext>X为本局游戏人数且至多为5</span>，<span class=yellowtext>Y为本局游戏势力数</span>）。",

	sgsxjxfzmnl_shen_zhangjiao: "阴间神张角",
	sgsxjxfzmnl_shen_zhangjiao_prefix: "阴间神",
	sgsxjxfzmnl_yizhao: "异兆",
	sgsxjxfzmnl_yizhao_info: "锁定技。当你使用或打出牌时，你获得等同于此牌点数枚“黄”标记。然后若“黄”的十位数发生变化，你获得牌堆<span class=yellowtext>或弃牌堆</span>中一张点数为你“黄”的十位数的牌。",
	sgsxjxfzmnl_sijun: "肆军",
	sgsxjxfzmnl_sijun_info: "准备阶段，若“黄”数大于牌堆的牌数，你可以移去所有“黄”并洗牌，然后随机获得任意张点数之和为36的牌<span class=yellowtext>并洗牌</span>。",
	sgsxjxfzmnl_sanshou: "三首",
	sgsxjxfzmnl_sanshou_info: "当你受到伤害时，你可以亮出牌堆顶三张牌。若其中有本回合未被使用过的牌的<span class=firetext>牌名</span>，防止此伤害。",
	sgsxjxfzmnl_tianjie: "天劫",
	sgsxjxfzmnl_tianjie_info: "一名角色的回合结束时，若本回合牌堆洗过牌，你可以选择<span class=firetext>任意</span>名其他角色。你依次对每名目标角色造成X点雷电伤害（X为其手牌中【闪】的数量，至少为1）。",

	
	sgsxjxfzmnl_xizhicai:'阴间戏志才',
	sgsxjxfzmnl_xizhicai_prefix:'阴间',
	sgsxjxfzmnl_xianfu: "先辅",
	sgsxjxfzmnl_xianfu2: "先辅",
	sgsxjxfzmnl_xianfu2_bg: "辅",
	sgsxjxfzmnl_xianfu_info: "锁定技，游戏开始时，你选择一名其他角色，当其受到伤害后，你受到等量的伤害，当其回复体力后，你回复等量的体力。<span class=yellowtext>你对先辅目标使用的基本牌伤害和回复数值+1。</span>",
	// tiandu_xizhicai:'天妒',
	// tiandu_xizhicai_info:'此技能仅提供一条语音。',
	sgsxjxfzmnl_chouce: "筹策",
	sgsxjxfzmnl_chouce_info: "当你受到1点伤害后，你可以判定，若结果为：黑色，你弃置一名角色区域里的一张牌，<span class=yellowtext>并获得之</span>；红色，你选择一名角色，其摸一张牌，若其是〖先辅〗选择的角色，改为<span class=yellowtext>其回复一点体力并</span>摸两张牌。",

	sgsxjxfzmnl_sb_sp_zhugeliang: "阴间谋诸葛亮",
	sgsxjxfzmnl_sb_sp_zhugeliang_prefix: "阴间谋",
	sgsxjxfzmnl_sbhuoji: "火计",
	sgsxjxfzmnl_sbhuoji_info: `使命技。①使命：出牌阶段限一次。你可以对一名其他角色造成1点火焰伤害，然后你对所有与其势力相同的不为其的其他角色各造成1点火焰伤害。②成功：准备阶段，若你本局游戏已对其他角色造成的火焰伤害不小于本局游戏总角色数，则<span style=\"text-decoration: line-through;\">你失去〖火计〗和〖看破〗，然后</span>获得${get.poptip("sgsxjxfzmnl_sbguanxing")}和${get.poptip("sgsxjxfzmnl_sbkongcheng")}。③失败：使命成功前进入濒死状态。（三国杀仙界下凡怎么你了）`,
	sgsxjxfzmnl_sbkanpo: "看破",
	sgsxjxfzmnl_sbkanpo_info: "①每轮开始时，你清除〖看破①〗记录的牌名，然后你可以依次记录<span class=firetext>Y个牌名</span>（Y为本局存活人数且至少为4，对其他角色不可见<span style=\"text-decoration: line-through;\">，每局游戏至多记录2个牌名</span>）。②其他角色使用你〖看破①〗记录过的牌名的牌时，你可以移去一个〖看破①〗中的此牌名的记录令此牌无效，然后你摸一张牌。（三国杀仙界下凡怎么你了）",
	sgsxjxfzmnl_sbguanxing: "观星",
	sgsxjxfzmnl_sbguanxing_info: "①准备阶段，你将所有“星”置入弃牌堆，将牌堆顶的X张牌置于你的武将牌上，称为“星”（<span class=firetext>为本局存活人数且至少为4</span>）。然后你可以将任意张“星”置于牌堆顶。②结束阶段，<span style=\"text-decoration: line-through;\">若你未于本回合的准备阶段将“星”置于过牌堆顶，</span>你可以将任意张“星”置于牌堆顶。③你可以如手牌般使用或打出“星”。（三国杀仙界下凡怎么你了）",
	sgsxjxfzmnl_sbkongcheng: "空城",
	sgsxjxfzmnl_sbkongcheng_info: "锁定技。当你受到伤害时，若你拥有技能〖观星〗，且若你：有“星”，你<span class=yellowtext>可以进行一次</span>判定，若结果点数不大于你的“星”数，此伤害-1<span style=\"text-decoration: line-through;\">；没有“星”，此伤害+1</span>。（三国杀仙界下凡怎么你了）",

	sgsxjxfzmnl_dc_qinghegongzhu: "阴间新杀清河公主",
	sgsxjxfzmnl_dc_qinghegongzhu_prefix: "阴间新杀",
	sgsxjxfzmnl_dczhangji: "长姬",
	sgsxjxfzmnl_dczhangji_info: "锁定技，一名角色使用牌指定最后一个目标后，若此牌目标数大于1且你是此牌目标之一，则你先结算此牌的效果，然后你摸X张牌（X为此牌的目标数）。",
	sgsxjxfzmnl_dczengou: "谮构",
	sgsxjxfzmnl_dczengou_info: "出牌阶段限一次，你可以将至多体力上限张牌称为“谮构”交给一名其他角色并摸等量张牌。若如此做，<span class=yellowtext>其无法使用、打出、或弃置你交给其的手牌，并且</span>其下次体力值增加或使用牌结算完毕后，其展示所有手牌，然后失去Y点体力（Y为其手牌中的“谮构”牌数）。",

	sgsxjxfzmnl_bianxi: "阴间卞喜",
	sgsxjxfzmnl_bianxi_prefix: "阴间",
	sgsxjxfzmnl_dunxi: "钝袭",
	sgsxjxfzmnl_dunxi_info: "①当你使用牌时，你可以令一名角色获得一枚“钝”。②有“钝”的角色使用牌时。系统随机选择一名角色，并将此牌的目标改为该角色。<span class=firetext>若随机目标不为你，则其失去1点体力；若随机目标为你，则你摸一张牌。</span>若其正处于出牌阶段内，则结束此阶段。<span class=yellowtext>每次回合结束时移去1个“钝”。</span>",

	sgsxjxfzmnl_shen_sunquan: "阴间神孙权",
	sgsxjxfzmnl_shen_sunquan_prefix: "阴间神",
	sgsxjxfzmnl_junkyuheng: "驭衡",
	sgsxjxfzmnl_junkyuheng_info: '锁定技。①回合开始时，你须弃置任意张花色不同的牌，从<span class=firetext>X名吴势力武将中选择等量技能（X为全场存活人数）</span>。②回合结束时，你失去所有因〖驭衡①〗获得的技能，然后摸<span class=firetext>Y张</span>牌<span class=firetext>（Y为你以此法弃置牌的二倍）</span>。（三国杀仙界下凡怎么你了）',
	sgsxjxfzmnl_junkdili: "帝力",
	sgsxjxfzmnl_junkdili_info: `觉醒技。当你获得技能后，若你拥有的技能数大于<span class=firetext>场上势力数</span>，则你<span class=firetext>加</span>1点体力上限，<span style=\"text-decoration: line-through;\">选择失去任意个其他技能，</span>然后获得以下技能<span style=\"text-decoration: line-through;\">中的前等量个</span>：${get.poptip("sgsxjxfzmnl_junkshengzhi")}${get.poptip("sgsxjxfzmnl_junkquandao")}${get.poptip("sgsxjxfzmnl_junkchigang")}。（三国杀仙界下凡怎么你了）`,
	sgsxjxfzmnl_junkshengzhi: "圣质",
	sgsxjxfzmnl_junkshengzhi_info: "锁定技。当你发动非锁定技后，你令你本回合使用的牌无距离和次数限制。（三国杀仙界下凡怎么你了）",
	sgsxjxfzmnl_junkquandao: "权道",
	sgsxjxfzmnl_junkquandao_info: "锁定技。当你使用<span class=firetext>基本牌</span>或普通锦囊牌时，{若你手牌中的<span class=firetext>基本牌</span>或普通锦囊牌的数量之差X不为0，则你弃置X张数量较多的一种牌}，然后你摸一张牌。（三国杀仙界下凡怎么你了）",
	sgsxjxfzmnl_junkchigang: "持纲",
	sgsxjxfzmnl_junkchigang_info: "转换技，锁定技。判定阶段开始前，你取消此阶段。然后你获得一个额外的：阳，摸牌阶段；阴，出牌阶段。（三国杀仙界下凡怎么你了）",

	sgsxjxfzmnl_panshu: "阴间OL潘淑",
	sgsxjxfzmnl_panshu_prefix: "阴间OL",
	sgsxjxfzmnl_weiyi: "威仪",
	sgsxjxfzmnl_weiyi_info: "<span class=yellowtext>每回合</span>每名角色限一次。当有角色受到伤害后，你可选择：①若其体力值不小于你，则其失去1点体力。②若其体力值不大于你且其已受伤，则其回复1点体力。",
	sgsxjxfzmnl_jinzhi: "锦织",
	sgsxjxfzmnl_jinzhi_info: "当你需要使用或打出一张基本牌时，你可弃置X张颜色相同的牌并摸一张牌，然后视为你使用或打出了此牌。（X为你于本轮内发动此技能的次数）",

	sgsxjxfzmnl_haozhao: "阴间郝昭",
	sgsxjxfzmnl_haozhao_prefix: "阴间",
	sgsxjxfzmnl_drlt_zhengu: "镇骨",
	sgsxjxfzmnl_drlt_zhengu2: "镇骨",
	sgsxjxfzmnl_drlt_zhengu_info: "结束阶段，你可以选择一名其他角色，你的回合结束后和该角色的下个回合结束时，其将手牌摸至或弃至X张。<span class=firetext>（X为此时你的手牌数）</span>",

	//谯周？手杀，海外，新杀都有谯周。鉴于作者涉及的将池很广，暂且不做猜测
	//手杀？马钧
	//朱建平
	//新杀谋黄盖
	//魔曹丕
	sgsxjxfzmnl_mo_caopi:'魔曹丕',
	sgsxjxfzmnl_mo_caopi_prefix:'魔',
	// sgsxjxfzmnl_xingshang: "行殇",
	// sgsxjxfzmnl_xingshang_info: "当有角色死亡后，你可以获得该角色的所有牌。",
	// sgsxjxfzmnl_fangzhu: "放逐",//这个作者把翻面和摸牌的顺序写反了。并且剧情战里，也是先翻面，再摸牌
	// sgsxjxfzmnl_fangzhu_info: "当你受到伤害后，你可令一名其他角色将武将牌翻面，然后该角色摸X张牌（X为你已损失的体力值）。",
	// sgsxjxfzmnl_songwei: "颂威",
	// sgsxjxfzmnl_songwei2: "颂威",
	// sgsxjxfzmnl_songwei_info: "主公技，其他魏势力的角色的判定牌结果为黑色且生效后，其可以令你摸一张牌。",
	sgsxjxfzmnl_cpcuandi:'篡帝',
	sgsxjxfzmnl_cpcuandi_info:'主公技，当其他魏势力角色造成伤害后，你可摸一张牌（隐藏技能未亮出不生效）。',

	sgsxjxfzmnl_fuqian: "阴间傅佥",
	sgsxjxfzmnl_fuqian_prefix: "阴间",
	sgsxjxfzmnl_jueyong: "绝勇",
	sgsxjxfzmnl_jueyong_info: "锁定技。①当你不因〖绝勇〗成为唯一牌的目标时，若此牌不为转化牌且对应的实体牌牌数为1且不为【桃】或【酒】且你的“绝”数小于你的体力值，则你将此牌置于你的武将牌上，称为“绝”，且取消此牌的目标。②结束阶段开始时，若你有“绝”，则你令所有“绝”的原使用者依次对你使用所有“绝”，<span class=firetext>将无法使用的“绝”置入手牌区</span>。",
	sgsxjxfzmnl_jueyong_append:'其实原文写的是：若此牌使用者不在场，则将此牌置入手牌区。',
	sgsxjxfzmnl_poxiang: "破降",
	sgsxjxfzmnl_poxiang_info: "出牌阶段限一次。你可以将一张牌交给一名其他角色。你摸三张牌（不计入本回合的手牌上限），移去所有“绝”<span style=\"text-decoration: line-through;\">并失去1点体力</span>。",

	sgsxjxfzmnl_sb_caoren: "阴间谋曹仁",
	sgsxjxfzmnl_sb_caoren_prefix: "阴间谋",
	sgsxjxfzmnl_sbjushou: "据守",
	sgsxjxfzmnl_sbjushou_info: "①出牌阶段限一次。若你的武将牌正面朝上，你可以弃置<span class=firetext>任意张牌</span>，然后你翻面并获得等量护甲。②当你受到伤害后，若你的武将牌背面朝上，你选择一项：1.翻面；2.获得1点护甲。③当你翻面后，若你的武将牌正面朝上，你摸X张牌（X为你的护甲数）。",
	sgsxjxfzmnl_sbjiewei: "解围",
	sgsxjxfzmnl_sbjiewei_info: "出牌阶段<span class=yellowtext>每名角色</span>限一次。你可以失去1点护甲并选择一名其他角色。你观看其手牌并获得其中一张。",

	sgsxjxfzmnl_yue_miheng: "阴间乐祢衡",
	sgsxjxfzmnl_yue_miheng_prefix: "阴间乐",
	sgsxjxfzmnl_dcjigu: "激鼓",
	sgsxjxfzmnl_dcjigu_info: "锁定技。①游戏开始时，你将手牌标记为“激鼓”。②你的“激鼓”牌不计入手牌上限。③当你造成或受到伤害后，若你的“激鼓”<span class=yellowtext>装备</span>牌数等于你的装备区牌数，你摸X张牌（X为你的空缺装备栏数）。",
	sgsxjxfzmnl_dcsirui: "思锐",
	sgsxjxfzmnl_dcsirui_info: "出牌阶段限<span class=firetext>X</span>次，你可以将一张牌当作与其字数相同的一张无距离和次数限制的基本牌<span class=firetext>或普通锦囊牌</span></能看懂的都是高手></尼玛，原文实战是转化成牌局中的点数相同的牌……>使用。<span class=firetext>（X为你手中“激鼓”牌数量，至少为1）</span><wcnmsb，对局内主角在用过一次思锐转化牌的情况下，在手牌中仅剩一张激鼓牌的时候还几把能用一次……合着nmd出牌阶段限X次是出牌阶段开始时直接定死的？>",
	sgsxjxfzmnl_dcsirui_append:'原文实战：转化成牌局中的点数相同的牌，并且主角在用过一次思锐转化牌的情况下，在手牌中仅剩一张激鼓牌的时候还几把能用一次。我的评价是：该肘，不予理会',

	sgsxjxfzmnl_zhujianping: "阴间朱建平",
	sgsxjxfzmnl_zhujianping_prefix: "阴间",
	// olddcxiangmian: "相面",
	// olddcxiangmian_info: "其他角色的结束阶段，你可以判定。然后你不能再对其发动此技能，其获得以下效果：当其使用第X张结果的花色的牌后（X为结果的点数），其失去等同于其体力值的体力。",
	sgsxjxfzmnl_dcxiangmian: "相面",
	sgsxjxfzmnl_dcxiangmian_info: "出牌阶段限一次。你可以令一名其他角色判定，其获得以下效果：当其使用结果的<span class=firetext>颜色</span>的牌后，或当其使用X张牌后（X为结果的点数），其<font color=red>死亡</font>。",
	sgsxjxfzmnl_dctianji: "天机",
	sgsxjxfzmnl_dctianji_info: "锁定技。当判定牌<span class=firetext>生效后</span>，你从牌堆随机获得分别与该牌类型、花色和点数相同的牌各一张。",

	sgsxjxfzmnl_shen_huangzhong: "阴间神黄忠",
	sgsxjxfzmnl_shen_huangzhong_prefix: "阴间神",
	sgsxjxfzmnl_new_dclieqiong: "裂穹",
	sgsxjxfzmnl_new_dclieqiong_info: `当你对一名其他角色造成伤害后，你可以在任意部位中选择一个“${get.poptip({
		id: "sgsxjxfzmnl_dclieqiong_jishang",
		name: "击伤",
		type: "character",
		info: `
				<li><span style='font-family: yuanli'>力烽</span>：令其随机弃置一半手牌（向上取整）；<br>
				<li><span style='font-family: yuanli'>地机</span>：令其<span class=firetext>接下来</span>受到的伤害+1<span style=\"text-decoration: line-through;\">直到其下个回合结束</span>；<br>
				<li><span style='font-family: yuanli'>中枢</span>：令其<span class=firetext>每回合使用的第一张牌</span>无效<span style=\"text-decoration: line-through;\">直到其下个回合结束</span>；<br>
				<li><span style='font-family: yuanli'>气海</span>：令其不能使用或打出红桃牌<span style=\"text-decoration: line-through;\">直到其下个回合结束</span>；
			`,
	})}”；若你击伤了一名角色，则本回合再次击伤该角色时出现“${get.poptip({
		id: "sgsxjxfzmnl_dclieqiong_tianchong",
		name: "天冲",
		type: "character",
		info: "令其<font color=red>死亡</font>，你增加1点体力上限<span class=yellowtext>并回复一点体力</span>。",
	})}”选项。`,
	sgsxjxfzmnl_dclieqiong_place1: "天冲",
	sgsxjxfzmnl_dclieqiong_place1_info: "令其<font color=red>死亡</font>，你增加1点体力上限<span class=yellowtext>并回复一点体力</span>。",
	//"dclieqiong_place2": "肩部",
	//"dclieqiong_place2_info": "令其弃置装备区里的武器牌和坐骑牌",
	//"dclieqiong_place3": "手部",
	//"dclieqiong_place3_info": "令其手牌上限视为原来的一半（向下取整）直到其下个回合结束。",
	sgsxjxfzmnl_dclieqiong_place4: "力烽",
	sgsxjxfzmnl_dclieqiong_place4_info: "令其随机弃置一半手牌（向上取整）",
	sgsxjxfzmnl_dclieqiong_place5: "地机",
	sgsxjxfzmnl_dclieqiong_place5_info: "令其<span class=firetext>接下来</span>受到的伤害+1",
	sgsxjxfzmnl_dclieqiong_place6: "中枢",
	sgsxjxfzmnl_dclieqiong_place6_info: "令其<span class=firetext>每回合使用的第一张牌</span>无效",
	sgsxjxfzmnl_dclieqiong_place7: "气海",
	sgsxjxfzmnl_dclieqiong_place7_info: "令其不能使用或打出红桃牌",
	// dclieqiong_place8: "玉泉",
	// dclieqiong_place8_info: "令其将性别变为女性、将【女装】置入装备区且体力上限+1。",
	sgsxjxfzmnl_dczhanjue: "斩决",
	sgsxjxfzmnl_dczhanjue_info: "出牌阶段开始时，你可以选择一项：1.摸体力值张牌，此阶段使用的下一张<span class=firetext>伤害牌</span>无距离限制且不能被响应。2.摸已损失体力值张牌，此阶段造成伤害后，回复等量体力。",

	sgsxjxfzmnl_dc_tengfanglan: "阴间滕芳兰",
	sgsxjxfzmnl_dc_tengfanglan_prefix: "阴间",
	sgsxjxfzmnl_dcluochong: "落宠",
	sgsxjxfzmnl_dcluochong_info: "每轮开始时，你可以弃置<span class=firetext>至多4名角色区域里的任意张牌</span>。（三国杀仙界下凡怎么你了）",
	sgsxjxfzmnl_dcaichen: "哀尘",
	sgsxjxfzmnl_dcaichen_info: "锁定技。<span class=firetext>当你发动〖落宠〗弃置你区域内的牌后，你摸两张牌；你跳过弃牌阶段</span>。（三国杀仙界下凡怎么你了）",

	sgsxjxfzmnl_sb_diaochan: "阴间谋貂蝉",
	sgsxjxfzmnl_sb_diaochan_prefix: "阴间",
	sgsxjxfzmnl_sblijian: "离间",
	sgsxjxfzmnl_sblijian_info: "出牌阶段限一次。你可以选择至少两名其他角色并<span class=firetext>获得其一张手牌</span>。然后每名你选择的角色依次视为对这些角色中与其逆时针座次最近的另一名角色使用一张【决斗】。",
	sgsxjxfzmnl_sbbiyue: "闭月",
	sgsxjxfzmnl_sbbiyue_info: "锁定技。结束阶段，你摸Y张牌（Y为本回合包括已死亡角色在内受到过伤害的角色数+1）。",

	sgsxjxfzmnl_re_zuoci: "阴间界左慈",
	sgsxjxfzmnl_re_zuoci_prefix: "阴间界",
	sgsxjxfzmnl_rehuashen: "化身",
	sgsxjxfzmnl_rehuashen_info: "游戏开始时，你随机获得三张武将牌，选一张置于你面前并声明该武将牌的一项技能，你拥有该技能且同时将性别和势力属性变成与该武将相同直到该化身被替换。回合开始时或回合结束时，你可以选择一项：①弃置至多两张未展示的化身牌并重新获得等量化身牌；②更换所展示的化身牌或技能。<span style=\"text-decoration: line-through;\">（你不可声明限定技、觉醒技、隐匿技、使命技、主公技等特殊技能）</span>（至少没说不能获得）<span class=yellowtext>（此技能抽将范围为阴间将池）</span>。（三国杀仙界下凡怎么你了）",
	sgsxjxfzmnl_rexinsheng: "新生",
	sgsxjxfzmnl_rexinsheng_info: "当你受到1点伤害后，你可以获得一张新的化身牌。（三国杀仙界下凡怎么你了）",
	
	sgsxjxfzmnl_chengui: "阴间陈珪",
	sgsxjxfzmnl_chengui_prefix: "阴间",
	sgsxjxfzmnl_dcyingtu: "营图",
	sgsxjxfzmnl_dcyingtu_info: "当<span class=firetext>除你以外的角色</span>于摸牌阶段外得到牌后，你可以获得其一张牌，然后将一张牌交给<span class=firetext>另一名其他角色</span>。若你给出的牌为装备牌，则其使用之。",
	sgsxjxfzmnl_dccongshi: "从势",
	sgsxjxfzmnl_dccongshi_info: "锁定技。一名角色使用的装备牌结算结束后，你摸一张牌。",

	sgsxjxfzmnl_dc_sunru: "阴间孙茹",
	sgsxjxfzmnl_dc_sunru_prefix: "阴间",
	sgsxjxfzmnl_xiecui: "撷翠",
	sgsxjxfzmnl_xiecui_info: "当有角色于回合内因执行牌的效果而造成伤害时，你可以令此伤害+1。若其势力为吴，则该角色获得此伤害牌对应的实体牌，且其本回合的手牌上限+1<span class=yellowtext>，在其回合结束前你失去此技能</span>。",
	sgsxjxfzmnl_youxu: "忧恤",
	sgsxjxfzmnl_youxu_info: "一名角色A的回合结束时，若其手牌数大于体力值，则你可以展示A的一张手牌，然后将此牌交给另一名角色B，<span class=firetext>然后</span>B回复1点体力。",

	sgsxjxfzmnl_yue_xiaoqiao: "阴间乐小乔",
	sgsxjxfzmnl_yue_xiaoqiao_prefix: "阴间乐",
	sgsxjxfzmnl_dcqiqin: "绮琴",
	sgsxjxfzmnl_dcqiqin_tag: "琴",
	sgsxjxfzmnl_dcqiqin_info: "锁定技。①游戏开始时，你将手牌标记为“琴”。②你的“琴”牌不计入手牌上限。③准备阶段，你获得位于弃牌堆的所有“琴”。<span class=yellowtext>然后你可更改手牌中的“琴”标记，你的“琴”标记牌上限为X（X为你的体力值上线）</span>",//原文就写的上线，去殴打作者去，别怼咕我
	sgsxjxfzmnl_dcweiwan: "媦婉",
	sgsxjxfzmnl_dcweiwan_info: "出牌阶段限一次，你可以弃置一张“琴”并随机获得一名其他角色区域内花色与此牌不相同的牌，若你获得了：一张牌，其失去1点体力；两张牌，本回合你对其使用牌无距离和次数限制；三张牌，<span class=yellowtext>执行1，2项且</span><span class=firetext>你本回合对其造成的伤害+1</span>；<span class=yellowtext>四张牌或更多，执行3项且其本轮技能失效</span>。",

	sgsxjxfzmnl_dc_sb_simayi: "阴间新杀谋司马懿",
	sgsxjxfzmnl_dc_sb_simayi_prefix: "阴间新杀谋",
	sgsxjxfzmnl_dcsbquanmou: "权谋",
	sgsxjxfzmnl_dcsbquanmou_info: "转换技。①游戏开始时，你可以转换此技能状态；②出牌阶段每名角色限一次，你可以令一名<span style=\"text-decoration: line-through;\">攻击范围内的</span>其他角色交给你一张牌。阳：当你于本阶段内下次对其造成伤害时，取消之；阴：当你于本阶段内下次对其造成伤害后，你可以选择至多三名其他角色，对这些角色依次造成1点伤害。（三国杀仙界下凡怎么你了）",
	sgsxjxfzmnl_dcsbpingliao: "平辽",
	sgsxjxfzmnl_dcsbpingliao_info: "锁定技。当你声明使用【杀】时，你令此【杀】的目标对其他角色不可见，且你令攻击范围内的其他角色依次选择是否打出一张红色基本牌。所有角色选择完成后，此牌的目标角色中没有以此法打出牌的角色本回合内无法使用或打出手牌<span class=yellowtext>且受到的伤害+1</span>；若有不为此牌目标的角色以此法打出了牌，则<span class=yellowtext>每打出一张基本牌</span>你摸两张牌。<span class=firetext>你对拥有“权谋”标记的角色使用牌无距离和次数限制。</span>（三国杀仙界下凡怎么你了）（不支持其他版本的权谋）",

	sgsxjxfzmnl_mb_zhangfen: "阴间手杀张奋",
	sgsxjxfzmnl_mb_zhangfen_prefix: "阴间手杀",
	sgsxjxfzmnl_mbquchong: "渠冲",
	sgsxjxfzmnl_mbquchong_effect: "阴大攻车",
	sgsxjxfzmnl_mbquchong_info: `<span class=yellowtext>⓪摸牌阶段，你额外摸当前轮数的牌；</span>①出牌阶段，你可以重铸装备牌。③出牌阶段开始时，若场上：<span class=firetext>没有【阴大攻车】，则你可以从${get.poptip("sgsxjxfzmnl_dagongche_attack")}和${get.poptip("sgsxjxfzmnl_dagongche_defend")}中选择一个令一名角色获得（你任选此牌花色和点数）并令其使用此牌</span>；有【阴大攻车】，则你可以移动场上的一张【阴大攻车】（可替换原装备）（小说里描述：你可以任意移动大攻车。但是我觉得太傻比了）。`,
	sgsxjxfzmnl_mbxunjie: "逊节",
	sgsxjxfzmnl_mbxunjie_info: "锁定技，当你受到<span class=firetext>伤害时</span>，若场上没有【阴大攻车】，则你进行一次判定，若结果为红色，则此伤害<span class=firetext>防止之</span>。",
	sgsxjxfzmnl_dagongche_attack: "阴大攻车·攻",
	sgsxjxfzmnl_dagongche_attack_prefix: "阴间",
	sgsxjxfzmnl_dagongche_defend: "阴大攻车·守",
	sgsxjxfzmnl_dagongche_defend_prefix: "阴间",
	sgsxjxfzmnl_dagongche_attack_skill: "阴大攻车",
	sgsxjxfzmnl_dagongche_attack_skill_prefix: "阴间",
	sgsxjxfzmnl_dagongche_defend_skill: "阴大攻车",
	sgsxjxfzmnl_dagongche_defend_skill_prefix: "阴间",
	sgsxjxfzmnl_dagongche_attack_info: "①当此牌进入你的装备区时，弃置你装备区里的其他牌。②其他装备区进入你的装备区前，改为将这些牌置于弃牌堆。③当你对一名角色造成伤害时，你可令此伤害+X（<span class=firetext>X为游戏轮数</span>）。④当此牌不因〖渠冲〗离开装备区时，防止之。",
	sgsxjxfzmnl_dagongche_defend_info: "①当此牌进入你的装备区时，弃置你装备区里的其他牌。②其他装备区进入你的装备区前，改为将这些牌置于弃牌堆。③当你受到伤害时，令此伤害-X（<span class=firetext>X为游戏轮数</span>）。④当此牌不因〖渠冲〗离开装备区时，防止之。",

	sgsxjxfzmnl_liuzan: "阴间手杀留赞",
	sgsxjxfzmnl_liuzan_prefix: "阴间手杀",
	sgsxjxfzmnl_fenyin: "奋音",
	sgsxjxfzmnl_fenyin_info: "当你使用牌时，若此牌与你使用的上一张牌的<span class=firetext>花色</span>不同，则你<span style=\"text-decoration: line-through;傻逼作者没写可以:true;\"></span>摸一张牌。",


	sgsxjxfzmnl_xurong: "阴间徐荣",
	sgsxjxfzmnl_xurong_prefix: "阴间",
	sgsxjxfzmnl_xinfu_xionghuo: "凶镬",
	sgsxjxfzmnl_xinfu_xionghuo_info: "游戏开始时，你获得<span class=firetext>X</span>个“暴戾”标记<span class=yellowtext>（X为本局人数）</span>。出牌阶段，你可以交给一名其他角色一个“暴戾”标记。<span class=firetext>拥有“暴戾”标记的其他角色受到的伤害+1，且无法响应你使用牌</span>。有“暴戾”标记的其他角色的出牌阶段开始时，其移去<span class=firetext>一枚</span>“暴戾”标记并随机执行一项：1.受到1点火焰伤害且本回合不能<span class=firetext>使用牌</span>；2.失去1点体力且本回合手牌上限<span class=firetext>为0</span>；3.你随机获得其<span class=firetext>Y</span>张牌<span class=firetext>（Y为其体力值）</span>。",
	sgsxjxfzmnl_xinfu_shajue: "杀绝",
	sgsxjxfzmnl_xinfu_shajue_info: "锁定技，其他角色进入濒死状态时，你获得一个“暴戾”标记<span class=firetext>并</span>获得使其进入濒死状态的牌。",

	sgsxjxfzmnl_dc_sb_huanggai: "阴间新杀谋黄盖",
	sgsxjxfzmnl_dc_sb_huanggai_prefix: "阴间新杀谋",
	sgsxjxfzmnl_dcsblieji: "烈计",
	sgsxjxfzmnl_dcsblieji_info: "当你使用<span class=firetext>一张</span>牌后，你可以令手牌中所有伤害牌造成的伤害+1。",
	sgsxjxfzmnl_dcsbquzhou: "趋舟",
	sgsxjxfzmnl_dcsbquzhou_info: "出牌阶段限一次，<span class=firetext>你可以亮出牌堆顶X张牌，若其中有【杀】你使用之，并获得所有未使用的牌（X为本局游戏人数）</span>。",

	sgsxjxfzmnl_yuanyin: "阴间袁胤",
	sgsxjxfzmnl_yuanyin_prefix: "阴间",
	sgsxjxfzmnl_dcmoshou: "墨守",
	sgsxjxfzmnl_dcmoshou_info: "当你成为一名角色使用的黑色牌的目标后，你可以摸体力上限张牌，然后若你以此法摸的牌数：不为X，你令下次以此法摸的牌数-1；为X，将此技能摸牌数重置为你的体力上限。<span class=firetext>（X为本局游戏势力数）</span></傻缺作者特有的不设保底，卡死你就老实了>",
	sgsxjxfzmnl_dcyunjiu: "运柩",//没变化
	sgsxjxfzmnl_dcyunjiu_info: "一名角色死亡后，你可以将其此次弃置的一张牌交给一名其他角色。然后你加1点体力上限并回复1点体力。",//没变化

	sgsxjxfzmnl_v_zhangliao: "阴间威张辽",
	sgsxjxfzmnl_v_zhangliao_prefix: "阴间威",
	sgsxjxfzmnl_dcyuxi: "驭袭",
	sgsxjxfzmnl_dcyuxi_info: "当你造成或受到伤害时，你可以摸<span class=firetext>X</span>张牌<span class=firetext>（X为本次伤害值）</span>。你使用以此法获得的牌无<span class=yellowtext>距离</span>次数限制。",
	sgsxjxfzmnl_dcporong: "破戎",
	sgsxjxfzmnl_dcporong_info: "连招技（伤害牌 + 【杀】）。你可以获得目标角色与其<span class=firetext>距离Y内角色</span>的各一张手牌，且此牌额外结算一次。<span class=firetext>Y为你的攻击范围</span></傻逼作者特有的不设保底，被挂上折戟你就老实了>",

	sgsxjxfzmnl_ol_nanhualaoxian: "阴间OL南华老仙",
	sgsxjxfzmnl_ol_nanhualaoxian_prefix: "阴间OL",
	sgsxjxfzmnl_olhedao: "合道",
	sgsxjxfzmnl_olhedao_info: `锁定技。①游戏开始时，你可至多拥有<span class=firetext>三</span>册${get.poptip("sgsxjxfzmnl_olhedao_faq")}。②<span class=firetext>每当有人进入濒死状态，你的${get.poptip("sgsxjxfzmnl_olhedao_faq")}上限+1</span>。（三国杀仙界下凡怎么你了）`,
	sgsxjxfzmnl_olhedao_faq: "“天书”",
	sgsxjxfzmnl_olhedao_faq_info: "关于“天书”：<br>" + ["“天书”为随机三个时机和三个效果中各选择一个组成的技能，且时机等级越高，效果等级越高", "“天书”初始为未翻开状态，发动一次后翻开此“天书”（未翻开的“天书”技能对其他角色不可见）",  "一名角色可至多拥有一册“天书”"].map(str => `<li>${str}`).join("<br>"),
	sgsxjxfzmnl_olqingshu: "青书",
	sgsxjxfzmnl_olqingshu_info: `锁定技，游戏开始时/准备阶段/结束阶段，你书写一册${get.poptip("sgsxjxfzmnl_olhedao_faq")}。（三国杀仙界下凡怎么你了）`,
	sgsxjxfzmnl_olshoushu: "授术",
	sgsxjxfzmnl_olshoushu_info: `出牌阶段限一次，你可以将一册${get.poptip("sgsxjxfzmnl_olhedao_faq")}交给一名其他角色。（三国杀仙界下凡怎么你了）`,

	sgsxjxfzmnl_mo_guanyu:'魔关羽',//5
	sgsxjxfzmnl_mo_guanyu_prefix:'魔',
	//马术
	sgsxjxfzmnl_mo_yijue:'义绝',
	sgsxjxfzmnl_mo_yijue_info:'锁定技，一名其他角色受到你造成的伤害时，获得“绝”标记。若场上有“绝”标记，你仅能对拥有“绝”标记角色造成伤害。',
	sgsxjxfzmnl_mo_boming:'搏命',
	sgsxjxfzmnl_mo_boming_info:'当你受到伤害后，你可以从牌堆或弃牌堆中获得一张无距离限制的【杀】。',
	sgsxjxfzmnl_mo_fuchou:'复仇',
	sgsxjxfzmnl_mo_fuchou_info:'当你受到伤害后，你可以对造成伤害的角色使用一张无距离限制的【杀】。',
	//谁也挡不住我这复仇之火！
	//看我啖汝之肉！

	sgsxjxfzmnl_mo_re_diaochan:'魔貂蝉',
	sgsxjxfzmnl_mo_re_diaochan_prefix:'魔',
	// sgsxjxfzmnl_meihuo:'魅惑',
	// sgsxjxfzmnl_meihuo_info:'出牌阶段限两次，弃置一张牌，并选择两名其他角色，然后令两名角色互相使用一张【决斗】。',
	// sgsxjxfzmnl_biyue:'闭月',
	// sgsxjxfzmnl_biyue_info:'结束阶段，你可以摸两张牌。',
	sgsxjxfzmnl_yaoyan:'妖颜',
	sgsxjxfzmnl_yaoyan_info:'当你成为其他角色【杀】的目标时，你可以弃置一张手牌，将此【杀】转移给其攻击范围内的一名其他角色。',

	sgsxjxfzmnl_mo_zhangfei:'魔张飞',
	sgsxjxfzmnl_mo_zhangfei_prefix:'魔',
	sgsxjxfzmnl_new_repaoxiao: "咆哮",
	sgsxjxfzmnl_new_repaoxiao_info: "锁定技，出牌阶段，你使用【杀】没有数量限制。若你于此出牌阶段内使用过【杀】，则你本回合内使用【杀】没有距离限制。",
	sgsxjxfzmnl_liyong: "厉勇",
	// sgsxjxfzmnl_liyong2: "厉勇",
	sgsxjxfzmnl_liyong_info: "锁定技，你使用【杀】指定目标后</傻缺作者特有的分不清时机>，若此未造成伤害，你失去1点体力，并将此【杀】收回。若此【杀】造成伤害，则你失去一点体力，且令手中伤害牌造成的伤害+1。",

	sgsxjxfzmnl_dc_sb_zhouyu: "阴间新杀谋周瑜",
	sgsxjxfzmnl_dc_sb_zhouyu_prefix: "阴间新杀谋",
	sgsxjxfzmnl_dcsbronghuo: "融火",
	sgsxjxfzmnl_dcsbronghuo_info: "锁定技，<span class=firetext>你所造成的伤害均视为火焰伤害，你造成火焰伤害的伤害值改为X（X为全场势力数）</span>。",
	sgsxjxfzmnl_dcsbyingmou: "英谋",
	sgsxjxfzmnl_dcsbyingmou_info: "转换技。①游戏开始时，你可以转换此技能状态；②每回合限<span class=firetext>两</span>次，当你对其他角色使用牌后，你可以选择其中一名目标角色：阳，你将手牌数摸至与其体力上限相同（至多摸五张），然后视为对其使用一张【火攻】；阴，令一名手牌数为全场最大的角色对其使用手牌中所有的【杀】和伤害类锦囊牌。",


	sgsxjxfzmnl_dc_simashi: "阴间新杀谋司马师",
	sgsxjxfzmnl_dc_simashi_prefix: "阴间新杀谋",
	sgsxjxfzmnl_dcsanshi: "散士",
	sgsxjxfzmnl_dcsanshi_tag: "死士",
	sgsxjxfzmnl_dcsanshi_info: "锁定技。①游戏开始时，你令系统将牌堆中每个点数的随机一张牌永久标记为“死士”（“死士”对你可见）。②一名角色的回合结束时，若本回合有“死士”不因你使用或打出而进入弃牌堆，你于弃牌堆中获得这些牌。③你使用“死士”<span class=yellowtext>无距离次数限制且</span>不能被响应。",
	sgsxjxfzmnl_dczhenrao: "震扰",
	sgsxjxfzmnl_dczhenrao_info: "每回合每名角色限一次。当你使用牌指定第一个目标后，若目标角色包含其他角色，或当其他角色使用牌指定你为目标后，你可以选择其中一个目标或此牌的使用者，然后对其造成1点伤害。",
	sgsxjxfzmnl_dcchenlve: "沉略",
	sgsxjxfzmnl_dcchenlve_info: "限定技。出牌阶段，你可以将牌堆、弃牌堆、场上及其他角色的手牌区里的所有“死士”置入处理区，然后你获得这些牌。若如此做，你获得如下效果：<span class=firetext>此阶段结束时，你将这些牌移出游戏，并重新发动〖散士〗，标记“死士”牌",

	
	sgsxjxfzmnl_xuelingyun: "阴间薛灵芸",
	sgsxjxfzmnl_xuelingyun_prefix: "阴间",
	// sgsxjxfzmnl_dcxialei: "霞泪",//没变化！
	// sgsxjxfzmnl_dcxialei_info: "当你的红色牌进入弃牌堆后，你可以观看牌堆顶的三张牌，获得其中的一张牌，且可以将其余牌置于牌堆底。然后你本回合以此法观看的牌数-1。",
	sgsxjxfzmnl_dcanzhi: "暗织",
	sgsxjxfzmnl_dcanzhi_info: "出牌阶段或当你受到伤害后，你可以判定，若结果为红色，你重置〖霞泪〗的观看牌数<span class=yellowtext>并摸一张牌</span>；若结果为黑色，然后你可以令一名角色获得本回合进入弃牌堆的两张牌。<span class=firetext>当黑色判定次数达到X时，此技能本回合失效（X为本局游戏人数）</span>",


	sgsxjxfzmnl_yangbiao: "阴间手杀杨彪",
	sgsxjxfzmnl_yangbiao_prefix: "阴间手杀",
	sgsxjxfzmnl_zhaohan: "昭汉",
	sgsxjxfzmnl_zhaohan_info: "锁定技，<span class=firetext>准备阶段</span>，你加1点体力上限并回复1点体力。",
	// sgsxjxfzmnl_rangjie: "让节",//没变化？
	// sgsxjxfzmnl_rangjie_info: "当你受到1点伤害后，你可以选择一项并摸一张牌：获得牌堆或弃牌堆里你选择的类型的一张牌，或移动场上的一张牌。",
	sgsxjxfzmnl_yizheng: "义争",
	sgsxjxfzmnl_yizheng_info: "出牌阶段限一次，你可以和一名体力值不大于你的其他角色拼点。若你赢，<span class=firetext>你加1点体力上限并回复1点体力</span>。若你没赢，<span class=firetext>其跳过下个摸牌阶段</span>。",

	
	sgsxjxfzmnl_mb_simazhao: "阴间玄司马昭",
	sgsxjxfzmnl_mb_simazhao_ab: "司马昭",
	// sgsxjxfzmnl_mbqiantun: "谦吞",//没变化？
	// sgsxjxfzmnl_mbqiantun_tag: "invisible",
	// sgsxjxfzmnl_mbqiantun_info: "魏势力技。出牌阶段限一次，你可以令一名其他角色展示至少一张手牌，然后与其拼点，其本次拼点只能从展示牌中选择。若你赢，你获得其展示的手牌；若你没赢，你获得其未展示的手牌。然后你展示手牌。",
	sgsxjxfzmnl_mbxiezheng: "挟征",
	sgsxjxfzmnl_mbxiezheng_info: "结束阶段，你可以令<span class=firetext>任意名</span>角色将随机一张手牌置于牌堆顶，然后你视为<span class=yellowtext>对任意名角色依次</span>使用一张【兵临城下】。",
	sgsxjxfzmnl_mbzhaoxiong: "昭凶",
	sgsxjxfzmnl_mbzhaoxiong_info: `${get.poptip("rule_chihengji")}，限定技。准备阶段，若你已受伤，你可以变更势力为群，然后获得技能${get.poptip("sgsxjxfzmnl_mbdangyi")}。`,
	sgsxjxfzmnl_mbweisi: "威肆",
	sgsxjxfzmnl_mbweisi_info: "群势力技。出牌阶段限一次，你可以选择一名其他角色，令其将任意张手牌移出游戏直到回合结束，然后视为对其使用一张【决斗】；此牌对其造成伤害后，你获得其<span class=yellowtext>同势力角色的</span>所有手牌。",
	sgsxjxfzmnl_mbdangyi: "荡异",
	sgsxjxfzmnl_mbdangyi_info: `${get.poptip("rule_chihengji")}，主公技，。当你造成伤害时，你可以令此伤害+1。`,


	sgsxjxfzmnl_caoying: "阴间曹婴",
	sgsxjxfzmnl_caoying_prefix: "阴间",
	sgsxjxfzmnl_xinfu_lingren: "凌人",
	sgsxjxfzmnl_xinfu_lingren_info: "当你使用带有伤害类基本牌或普通锦囊牌指定目标后，你可以猜测其中的一个目标的手牌中是否有基本牌，锦囊牌或装备牌。若你猜中的项目数：≥1，此牌对该角色的伤害+1<span class=yellowtext>且不可被响应</span>；≥2，你摸两张牌；≥3，你获得技能〖奸雄〗和〖行殇〗直到你的下回合开始。",
	sgsxjxfzmnl_fujian: "伏间",
	sgsxjxfzmnl_fujian_info: "<span class=firetext>锁定技，准备阶段和结束阶段，你观看一名随机的其他角色的手牌。</span>",

	sgsxjxfzmnl_mo_jiaxu:'魔贾诩',
	sgsxjxfzmnl_mo_jiaxu_prefix:'魔',
	sgsxjxfzmnl_wansha: "完杀",//其实是处于
	sgsxjxfzmnl_wansha_info: "锁定技，<span class=firetext>当有角色进入濒死状态时，其他角色不能使用【桃】</span>。",
	// sgsxjxfzmnl_wansha_info: "锁定技，<span class=firetext>当有角色处于濒死状态时，</span>除你以外，不处于濒死状态的角色不能使用【桃】。",
	sgsxjxfzmnl_luanwu: "乱武",
	sgsxjxfzmnl_luanwu_info: "限定技，出牌阶段，你可令除你外的所有角色依次对与其距离最近的另一名角色使用一张【杀】，否则失去1点体力。<span class=yellowtext>每有一名角色因此失去体力时，你摸一张牌。</span>",
	sgsxjxfzmnl_weimu: "帷幕",
	sgsxjxfzmnl_weimu_info: "锁定技，当你成为黑色锦囊牌的目标时，取消之。",

	sgsxjxfzmnl_mo_guosi:'魔郭汜',
	sgsxjxfzmnl_mo_guosi_prefix:'魔',
	sgsxjxfzmnl_gzxiongsuan: "凶算",
	sgsxjxfzmnl_gzxiongsuan_info: "限定技，出牌阶段，你可以弃置一张手牌并选择与你势力相同的一名角色，对其造成1点伤害，然后你摸三张牌。若该角色有已发动的限定技，则你选择其中一个限定技，此回合结束后视为该限定技未发动过。",
	sgsxjxfzmnl_xinfu_sidao: "伺盗",
	sgsxjxfzmnl_xinfu_sidaox: "伺盗",
	sgsxjxfzmnl_xinfu_sidao_info: "出牌阶段<span class=firetext>内</span>，当你对一名其他角色连续使用两张牌后，你可以将一张手牌当做【顺手牵羊】对其使用。<span class=yellowtext>每回合每名角色限一次</span>",


	sgsxjxfzmnl_mo_zhangji: "魔张济",
	sgsxjxfzmnl_mo_zhangji_prefix: "魔",
	sgsxjxfzmnl_xinfu_lveming: "掠命",
	sgsxjxfzmnl_xinfu_lveming_info: "出牌阶段限一次，你可以选择一名装备区装备比你少的角色，令其选择一个点数，然后你进行判定：<br>若点数相同，你<span class=yellowtext>获得其装备区所有牌，</span>对其造成2点伤害；<br>若点数不同，则你随机获得其<span class=yellowtext>每</span>区域内的<span class=yellowtext>各</span>一张牌。",
	// sgsxjxfzmnl_xinfu_tunjun: "屯军",
	// sgsxjxfzmnl_xinfu_tunjun_info: "限定技，出牌阶段，你可以选择一名角色，令其随机使用牌堆中的X张装备牌。(X为你发动过“掠命”的次数)",




















	zzrsqlkjygzz:'蒸蒸日上，全力氪金，言贵者斩',
	zzrsqlkjygzz_info:'蒸蒸日上，全力氪金，言贵者斩<br>平台：番茄小说<br>作者：浅埋',
	
	zzrsqlkjygzz_re_zuoci:'氪界左慈',
	zzrsqlkjygzz_re_zuoci_prefix:'氪界',





	zzrsqlkjygzz_yi_caocao:'异曹操',//2/2
	zzrsqlkjygzz_yi_caocao_prefix:'异',
	zzrsqlkjygzz_Ejianxiong:'奸雄',
	zzrsqlkjygzz_Ejianxiong_info:'当你受到伤害后，你可以获得对你造成伤害的牌。受到伤害或流失体力后，未死亡则回复满体力。',

	zzrsqlkjygzz_yi_guanyu:'异关羽',//10/10
	zzrsqlkjygzz_yi_guanyu_prefix:'异',
	zzrsqlkjygzz_Ewusheng:'武圣',
	zzrsqlkjygzz_Ewusheng_info:'出牌阶段，可将一张牌当作伤害牌，每种牌名限一次；每次发动摸一张牌。出牌无距离和次数限制。',

	zzrsqlkjygzz_shen_guanyu:'氪神关羽',
	zzrsqlkjygzz_shen_guanyu_prefix:'氪神',
	zzrsqlkjygzz_wushen:'武神',
	zzrsqlkjygzz_wushen_info:'锁定技，你的红桃手牌视为【杀】；你使用红桃【杀】无距离和次数限制且不能被响应，且额外选择所有有“梦魇”的角色为目标，伤害+1。',
	zzrsqlkjygzz_wuhun:'武神',
	zzrsqlkjygzz_wuhun_info:'锁定技，受到1点伤害后，伤害来源获得1枚“梦魇”；当你对有“梦魇”的角色造成伤害后，其获得1枚“梦魇”；你脱离濒死状态或死亡时，可判定：若结果不为【桃】或【桃园结义】，选择至少一名有“梦魇”的角色，这些角色各失去“梦魇”标记数点体力，“梦魇”最多的角色死亡。',

	zzrsqlkjygzz_yi_zhangjiao:'异张角',
	zzrsqlkjygzz_yi_zhangjiao_prefix:'异',
	zzrsqlkjygzz_Eleiji:'雷击',
	zzrsqlkjygzz_Eleiji_info:'你使用牌指定或被指定为目标时，使1名其他角色流失1点体力，并使其获得1个“雷损”标记；每有一个“雷损”标记其受到〖雷击〗流失体力数+1。',
	zzrsqlkjygzz_Eguidao:'鬼道',
	zzrsqlkjygzz_Eguidao_info:`${get.poptip("rule_chihengji")}，受到伤害或流失体力时，可判定：不为红桃，防止之并选择一名角色进行〖雷击〗；你的判定牌不可被更改。`,

	zzrsqlkjygzz_yi2_zhangjiao:'异张角',
	zzrsqlkjygzz_yi2_zhangjiao_prefix:'异',
	zzrsqlkjygzz_Esanshou:'三首',
	zzrsqlkjygzz_Esanshou_info:'直接影响过异张角的技能对异张角·地无效。',

	zzrsqlkjygzz_yi3_zhangjiao:'异张角',
	zzrsqlkjygzz_yi3_zhangjiao_prefix:'异',
	
	zzrsqlkjygzz_shen_zhangjiao:'氪神张角',
	zzrsqlkjygzz_shen_zhangjiao_prefix:'氪神',
	zzrsqlkjygzz_tianjie:'天劫',
	zzrsqlkjygzz_tianjie_info:'每回合结束时，你可以对任意名其他角色各造成X点雷电伤害（X为其手牌中【闪】的数量且至少为1）。',

	zzrsqlkjygzz_yi_luxun:'异陆逊',
	zzrsqlkjygzz_yi_luxun_prefix:'异',
	zzrsqlkjygzz_Eqianxun:'谦逊',
	zzrsqlkjygzz_Eqianxun_info:'你不会受到任何效果影响（卡牌，技能，伤害），当牌堆洗牌时，你<font color=red>死亡</font>。',
	zzrsqlkjygzz_Elianying:'连营',
	zzrsqlkjygzz_Elianying_info:'当你在场时，其他角色始终保持铁索连环状态；只要有一人以上处于铁索连环状态，属性伤害将会反复传导。',

	zzrsqlkjygzz_shen_luxun:'氪神陆逊',
	zzrsqlkjygzz_shen_luxun_prefix:'氪神',

	zzrsqlkjygzz_yi_sunce:'异孙策',
	zzrsqlkjygzz_yi_sunce_prefix:'异',
	zzrsqlkjygzz_Ejiang:'激昂',
	zzrsqlkjygzz_Ejiang_info:'锁定技，本局游戏除【决斗】外的黑色牌无效，其他角色每失去一张黑色牌时，流失1点体力。',
	zzrsqlkjygzz_Ehunzi:'魂姿',
	zzrsqlkjygzz_Ehunzi_info:`${get.poptip("rule_chihengji")}，当你死亡后，你视为存在于场上直至游戏结束；当场上有于吉存在并死亡时，你失去所有技能并<font color=red>死亡</font>。`,

	zzrsqlkjygzz_shen_sunce:'氪神孙策',
	zzrsqlkjygzz_shen_sunce_prefix:'氪神',
	zzrsqlkjygzz_yingba:'英霸',
	zzrsqlkjygzz_yingba_info:'待填写',
	zzrsqlkjygzz_pinghe:'冯河',
	zzrsqlkjygzz_pinghe_info:'待填写',

	zzrsqlkjygzz_yao_zhoutai:'氪妖周泰',
	zzrsqlkjygzz_yao_zhoutai_prefix:'氪妖',
	zzrsqlkjygzz_Юbuqu:'不屈',
	zzrsqlkjygzz_Юbuqu_info:'待填写',
	


























}