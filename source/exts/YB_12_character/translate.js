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
	qmsgswkjsgj_chouce_info:`当你受到1点伤害后，你可以判定，若结果为：黑色，你可以移动场上一张牌或获得一名其他角色的一张手牌；红色，你选择一名角色，其摸一张牌，若其是${get.poptip('qmsgswkjsgj_xianfu')}选择的角色，改为其摸两张牌。若如此做，你可以将一张手牌交给任意角色。`,

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
	qmsgswkjsgj_spsanchen_info: `觉醒技，若你的“武库”数大于2，则你加1点体力上限并回复1点体力，然后获得${get.poptip('spmiewu')}。`,

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
	qmsgswkjsgj_guanxing_info:'准备阶段，你可以观看牌堆顶的七张牌，然后将其中一张扣置于你的武将牌上称为“星”，然后将其中任意数量的牌置于牌堆顶，将其余的牌置于牌堆底。',

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
	qmsgswkjsgj_shhlianhua:'莲华',
	qmsgswkjsgj_shhlianhua_info:'你成为其他角色【杀】的目标后，你摸一张牌，然后进行一次判定，若结果为黑桃，则取消之。',
	qmsgswkjsgj_shhlianhua1:'莲华·改',
	qmsgswkjsgj_shhlianhua1_info:'你成为其他角色【杀】的目标后，你摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果为黑桃，则取消之。',
	qmsgswkjsgj_shhlianhua2:'莲华·极',
	qmsgswkjsgj_shhlianhua2_info:'你成为其他角色【杀】的目标后，你摸一张牌，除非该角色弃置一张牌，否则取消之，然后进行一次判定，若结果为黑色，则取消之。',

	qmsgswkjsgj_yingtian_simayi:'旧应天神司马懿',
	qmsgswkjsgj_yingtian_simayi_prefix:'旧应天神',
	qmsgswkjsgj_jilin:'戢鳞',
	qmsgswkjsgj_jilin_info:'①游戏开始时，你将牌堆顶三张牌暗置于你的武将牌上，称为“志”。②当你成为其他角色使用牌的目标时，你可以明置一张暗置的“志”令此牌对你无效。③回合开始时，你可用任意张手牌替换等量暗置的“志”。',

	qmsgswkjsgj_re_shen_zhaoyun:'界缝神赵云',
	qmsgswkjsgj_re_shen_zhaoyun_prefix:'界缝神',
	qmsgswkjsgj_rejuejing:'绝境',
	qmsgswkjsgj_rejuejing_info:'锁定技，你的手牌上限+2。你进入或脱离濒死状态时，你摸两张牌。摸牌阶段，你令额定摸牌数+X（X为你已损失的体力值）。',

	qmsgswkjsgj_shen_lusu:'缝神鲁肃',
	qmsgswkjsgj_shen_lusu_prefix:'缝神',
	qmsgswkjsgj_tamo: "榻谟",
	qmsgswkjsgj_tamo_info: "游戏开始时，你可以重新分配所有角色的座次。",
	qmsgswkjsgj_tamo_faq: "FAQ",
	qmsgswkjsgj_tamo_faq_info: "<br><li>Q：在一号位不为主公的情况下，〖榻谟〗如何结算？</li><li>A：该角色可以正常进行座次交换。若受此技能影响导致一号位角色发生了变化，则以排列后的一号位角色为起始角色开始本局游戏。</li>",
	qmsgswkjsgj_dingzhou: "定州",
	qmsgswkjsgj_dingzhou_info: "出牌阶段限一次，玩家交给一名角色一张牌 ，然后玩家获得其场上的所有牌。",
	//也不知道作者抽啥风，不说你，说玩家
	qmsgswkjsgj_zhimeng: "智盟",
	qmsgswkjsgj_zhimeng_info: "玩家的回合结束后，玩家可以选择一名其他角色，玩家与其交换手牌。",
	
	qmsgswkjsgj_re_sunquan:'界孙权',
	qmsgswkjsgj_re_sunquan_prefix:'界',
	qmsgswkjsgj_rezhiheng: "制衡",
	qmsgswkjsgj_rezhiheng_info: "出牌阶段限一次，你可以摸X+1张牌，然后弃置X张牌。（X为你的牌数量。）",
	qmsgswkjsgj_rejiuyuan: "救援",
	qmsgswkjsgj_rejiuyuan_info: "主公技，当其他吴势力角色回复体力时，其可以改为令你回复1点体力，然后其摸一张牌。",
	
	qmsgswkjsgj_shen_zhouyu:'缝神周瑜',
	qmsgswkjsgj_shen_zhouyu_prefix:'缝神',
	qmsgswkjsgj_qinyin: "琴音",
	qmsgswkjsgj_qinyin_info: "弃牌阶段结束时，你可以选择一项：1.令你选择的任意名角色各回复1点体力；2.令你选择的任意角色各失去1点体力或对其各造成一点伤害。",
	qmsgswkjsgj_yeyan: "业炎",
	qmsgswkjsgj_yeyan_info: "出牌阶段限一次，你可以选择至多三名角色，对这些角色造成共计至多3点火焰伤害（若你将对一名角色分配2点或更多火焰伤害，你须先弃置四张花色各不相同的手牌）。",
	qmsgswkjsgj_refanjian:'反间',
	qmsgswkjsgj_refanjian_info:'出牌阶段限一次，你可以展示一张手牌并交给一名其他角色，令其展示所有手牌，然后你选择一项：1.弃置其与此牌花色相同的所有牌；2.令其失去1点体力或对其造成1点伤害。',
	qmsgswkjsgj_refanjian_card: "弃牌",
	qmsgswkjsgj_refanjian_hp: "失去体力",

	qmsgswkjsgj_shen_xunyu: "缝神荀彧",
	qmsgswkjsgj_shen_xunyu_prefix: "缝神",
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

	qmsgswkjsgj_shen_luxun:'缝神陆逊',
	qmsgswkjsgj_shen_luxun_prefix:'缝神',
	qmsgswkjsgj_resbqianxun:'谦逊',
	qmsgswkjsgj_resbqianxun_info:'当一张锦囊对你生效时，你可以将任意张手牌 扣置于武将牌上，若如此做，回合结束时，你获得武将牌上的所有牌。',
	qmsgswkjsgj_resblianying:'连营',
	qmsgswkjsgj_resblianying_info:'当你失去最后的手牌时，你可以摸一张牌。每回合结束时，你可观看牌堆顶的X张牌，然后将这些牌交给任意角色（X为你本回合失去的牌数，且至多为5）',
	qmsgswkjsgj_nzry_cuike: "摧克",
	qmsgswkjsgj_nzry_cuike_info: "出牌阶段，若“军略”标记的数量为奇数，你可以对一名角色造成1点伤害；若“军略”标记的数量为偶数，你可以横置一名角色并弃置其区域内的一张牌。然后，若“军略”标记的数量超过7个，你可以移去全部“军略”标记并对所有其他角色造成1点伤害。",
	qmsgswkjsgj_nzry_cuike_append: "一切以作者口胡（实战）为准",


	qmsgswkjsgj_shen_caocao:'缝神曹操',
	qmsgswkjsgj_shen_caocao_prefix:'缝神',
	qmsgswkjsgj_guixin:'归心',
	qmsgswkjsgj_guixin_info:'当你受到一点伤害后，你可以获得每名其他角色区域里的一张牌或摸一张牌。',
	qmsgswkjsgj_guixin_append:'拷打作者。描述不严谨。实际上应该说是：<br>当你受到一点伤害后，你可以获得每名其他角色区域里的一张牌，你可以放弃获得该角色的牌，然后摸一张牌。',
	qmsgswkjsgj_feiying:'飞影',
	qmsgswkjsgj_feiying_info:'锁定技，其他角色计算与你的距离+1，你计算与其他角色的距离-1。',

	qmsgswkjsgj_shen_lvbu:'缝神吕布',
	qmsgswkjsgj_shen_lvbu_prefix:'缝神',
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


	qmsgswkjsgj_re_caopi:'界曹丕',
	qmsgswkjsgj_re_caopi_prefix:'界',
	qmsgswkjsgj_rexingshang: "行殇",
	qmsgswkjsgj_rexingshang_info: "当其他角色死亡后，你可以获得其所有牌并回复一点体力。",
	qmsgswkjsgj_refangzhu: "放逐",
	qmsgswkjsgj_refangzhu_info: "当你受到1点伤害后，你可以选择令一名其他角色：摸X张牌并将武将牌翻面，或弃置X张牌并失去1点体力。（X为你已损失的体力值）",
	qmsgswkjsgj_songwei:'颂威',
	qmsgswkjsgj_songwei_info: "主公技，其他魏势力的角色的判定牌结果为黑色且生效后，你可以摸一张牌。",

	qmsgswkjsgj_re_shamoke:'界沙摩柯',
	qmsgswkjsgj_re_shamoke_prefix:'界',
	qmsgswkjsgj_gzjili: "蒺藜",
	qmsgswkjsgj_gzjili_info: "当你于一回合内使用或打出第X张牌时，你可以摸X张你指定类型的牌（X为你的攻击范围）。",

	qmsgswkjsgj_re_peixiu: "界裴秀",
	qmsgswkjsgj_re_peixiu_prefix: "界",
	qmsgswkjsgj_xingtu: "行图",
	qmsgswkjsgj_xingtu1: "倍数",
	qmsgswkjsgj_xingtu2: "约数",
	qmsgswkjsgj_xingtu_info: "锁定技。你失去牌时，若此牌的点数是X的约数或倍数，你摸一张牌且此牌无次数限制（X为你失去的上一张牌的点数）。",
	qmsgswkjsgj_xingtu_append:'作者说等以后需要的时候改改。',
	// qmsgswkjsgj_xingtu_append:'MD若制作者，谁教你这么突破的？',
	// qmsgswkjsgj_xingtu_info: "锁定技。你使用点数为X的倍数的牌无次数限制，你使用点数为X的约数的牌时摸一张牌（X为你本局游戏使用的上一张牌的点数）。",
	qmsgswkjsgj_juezhi: "爵制",
	qmsgswkjsgj_juezhi_info: "出牌阶段，你可以弃置至少两张牌，然后从牌堆中获得一张点数为Y的牌（Y为这些牌的点数和对13取余，余数为0时可以指定任意点数且额外获得一张）。",
	

	qmsgswkjsgj_re_shichangshi: "界十常侍",
	qmsgswkjsgj_re_shichangshi_prefix: "界",
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
	qmsgswkjsgj_scs_zhangrang: "张让",
	qmsgswkjsgj_scstaoluan: "滔乱",
	qmsgswkjsgj_scstaoluan_info: "出牌阶段限一次。你可以视为使用任意一种基本牌或普通锦囊牌。",
	qmsgswkjsgj_scs_zhaozhong: "赵忠",
	qmsgswkjsgj_scschiyan: "鸱咽",
	qmsgswkjsgj_scschiyan_info: "①当你使用【杀】指定目标后，你可以将其的两张牌置于其武将牌上，然后其于当前回合结束时获得这些牌。②当你因执行【杀】的效果对一名角色造成伤害时，若该角色的手牌数和装备区内的牌数均不大于你，此伤害+1。",
	qmsgswkjsgj_scs_sunzhang: "孙璋",
	qmsgswkjsgj_scszimou: "自谋",
	qmsgswkjsgj_scszimou_info: "锁定技。出牌阶段，当你使用第一/二/三张牌时，你从牌堆中获得一张【酒】/【杀】/【决斗】。",
	qmsgswkjsgj_scs_bilan: "毕岚",
	qmsgswkjsgj_scspicai: "庀材",
	qmsgswkjsgj_scspicai_info: "出牌阶段限一次。你可进行判定牌不置入弃牌堆的判定。若判定结果与本次发动技能时的其他判定结果的数字均不相同，则你可以重复此流程。然后你将所有位于处理区的判定牌交给一名角色。",
	qmsgswkjsgj_scs_xiayun: "夏恽",
	qmsgswkjsgj_scsyaozhuo: "谣诼",
	qmsgswkjsgj_scsyaozhuo_info: "出牌阶段限一次。你可以与一名角色拼点，若你没输，其跳过下一个摸牌阶段。",
	//不知道赢和没输有啥区别
	qmsgswkjsgj_scs_hankui: "韩悝",
	qmsgswkjsgj_scsxiaolu: "宵赂",
	qmsgswkjsgj_scsxiaolu_info: "出牌阶段限一次。你可以摸四张牌，然后选择一项：1.弃置四张手牌；2.将四张手牌交给一名其他角色。",
	qmsgswkjsgj_scs_lisong: "栗嵩",
	qmsgswkjsgj_scskuiji: "窥机",
	qmsgswkjsgj_scskuiji_info: "出牌阶段限一次。你可以观看一名其他角色的手牌，然后弃置你与其的共计四张牌。",
	//花色去掉了，手也去掉了……
	qmsgswkjsgj_scs_duangui: "段珪",
	qmsgswkjsgj_scschihe: "叱吓",
	qmsgswkjsgj_scschihe_info: "当你使用【杀】指定唯一目标后，你可亮出牌堆顶的三张牌，令此【杀】的伤害值基数+X（X为亮出牌中花色与此【杀】相同的牌数），且目标角色不能使用亮出牌包含的花色的牌响应此【杀】。",
	qmsgswkjsgj_scs_guosheng: "郭胜",
	qmsgswkjsgj_scsniqu: "逆取",
	qmsgswkjsgj_scsniqu_info: "出牌阶段限一次。你可以对一名角色造成2点火焰伤害。",
	qmsgswkjsgj_scs_gaowang: "高望",
	///其实没变化哒
	// qmsgswkjsgj_scsanruo: "安弱",
	// qmsgswkjsgj_scsanruo_info: "你可以将一张♥牌当【桃】、♦牌当火【杀】、♣牌当【闪】、♠牌当【无懈可击】使用。当你以此法使用或打出【杀】或【闪】时，你可以获得对方的一张牌；当你以此法使用【桃】时，你可以获得一名其他角色的一张牌；当你以此法使用【无懈可击】时，你可以获得此牌响应的普通锦囊牌的使用者的一张牌。",
	// qmsgswkjsgj_scsmiaoyu: "妙语",
	// qmsgswkjsgj_scsmiaoyu_info: "你可以将至多两张相同花色的牌按照以下规则使用或打出：♦牌当作火【杀】，♥牌当作【桃】，♣牌当作【闪】，♠牌当作【无懈可击】。若你以此法使用了两张红色牌，则此牌回复值或伤害值+1。若你以此法使用了两张黑色牌，则你弃置当前回合角色一张牌。",

	qmsgswkjsgj_re_jushou:'界沮授',
	qmsgswkjsgj_re_jushou_prefix:'界',
	qmsgswkjsgj_rejianying:'渐营',
	qmsgswkjsgj_rejianying_info:'当你失去牌时，若此牌与你上一张失去的牌颜色或点数相同，泽尼可以摸一张牌。出牌阶段限一次，你可以将一张牌当做任意基本牌使用，且不计入次数限制。若你于此阶段内使用的上一张牌有花色，则此牌的花色视为上一张牌的花色。',
	// 矢北本质上是十周年矢北
	qmsgswkjsgj_shen_huatuo: "缝手杀神华佗",
	qmsgswkjsgj_shen_huatuo_prefix: "缝手杀神",
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



	qmsgswkjsgj_mb_luyusheng: "界势陆郁生",
	qmsgswkjsgj_mb_luyusheng_prefix: "界势",
	qmsgswkjsgj_mbrunwei: "润微",
	qmsgswkjsgj_mbrunwei_info: "出牌阶段限一次，你可以展示牌堆顶至多五张牌，令一名角色获得其中一种颜色的所有牌。若如此做，你失去X张牌后（X为其因此获得的牌数），该技能可以再次发动。",
	qmsgswkjsgj_mbshuanghuai: "霜怀",
	qmsgswkjsgj_mbshuanghuai_info: "每回合限一次，当与你距离1以内的角色受到伤害时，你可以选择一项：防止此伤害；令其从弃牌堆中获得一张【桃】。若该角色与你上一次发动时相同，你与其各摸一张牌。",

	qmsgswkjsgj_pot_weiyan: "界势魏延",
	qmsgswkjsgj_pot_weiyan_prefix: "界势",
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

	qmsgswkjsgj_pot_taishici: "界势太史慈",
	qmsgswkjsgj_pot_taishici_prefix: "界势",
	qmsgswkjsgj_pothanzhan: "酣战",
	qmsgswkjsgj_pothanzhan_info: "出牌阶段限一次，你可以选择一名其他角色，你将手牌数摸至X张（X为你的体力上限且至多摸5张），然后你视为对其使用一张【决斗】。",
	qmsgswkjsgj_potzhanlie: "战烈",
	qmsgswkjsgj_potzhanlie_info: "每名角色回合中的杀进入弃牌堆时，若此牌在弃牌堆内，你获得1个“烈”标记，你至多拥有6个“烈”标记。你的出牌阶段结束时，你可移除任意数量的“烈”标记，视为使用一张无次数限制的【杀】并选择以下选项中的至多X项（X为你本次移除的标记数）：1.此【杀】目标+1；2.此【杀】基础伤害值+1；3.此【杀】需额外弃置一张牌方可响应。4.此【杀】结算结束后你摸两张牌。",
	qmsgswkjsgj_potzhenfeng: "振锋",
	qmsgswkjsgj_potzhenfeng_info: "限定技，出牌阶段或当你进入濒死状态时，你可以选择一项：①回复2点体力；②膝盖战烈的你的出牌阶段结束时为每名角色出牌阶段结束时，直到你的下个回合开始。",
	qmsgswkjsgj_potzhenfeng_append: "本体战烈改不了。<br>其实也不是不能改，只是会显得我有大病",
	//②修改〖酣战〗和〖战烈〗描述中的“X”为当前体力值、已损失体力值、场上人数中的一项（拥有对应技能方可选择）

	qmsgswkjsgj_pot_yuji: "界势于吉",
	qmsgswkjsgj_pot_yuji_prefix: "界势",
	qmsgswkjsgj_potfuji: "符济",
	qmsgswkjsgj_potfuji_info: "出牌阶段限一次，你可以展示至多X张牌并交给任意角色，称为“符济”（X为场上角色数）。其角色使用“符济”牌时获得一张与“符济”牌花色相同的牌；然后若此牌为：【杀】，此牌造成的伤害+1；【闪】，结算完毕后其摸一张牌；【桃】，回复数值+1；【酒】，其可弃置场上一张牌。然后若你的手牌数为全场最低，则你摸一张牌，且你使用的下一张【杀】【闪】【桃】【酒】视为拥有对应效果直到你的下个回合开始（可叠加）。",
	qmsgswkjsgj_potdaozhuan: "道转",
	qmsgswkjsgj_potdaozhuan_info: "每回合每种牌名限一次限一次，你可以将你或者当前回合角色的一张牌置入弃牌堆，视为使用一张基本牌。若当前回合角色因此失去了牌，则本回合此技能失效。",






















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
	// sgsxjxfzmnl_pinghe: "冯河",
	// sgsxjxfzmnl_pinghe_info: "锁定技。①你的手牌上限基数等于你已损失的体力值。②当你受到其他角色造成的伤害时，若你有牌且你的体力上限大于1，则你防止此伤害，减1点体力上限并将一张手牌交给一名其他角色。然后若你拥有〖英霸〗，则伤害来源获得一个“平定”标记。",
	
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
	sgsxjxfzmnl_rejianying_info:'①当你于出牌阶段内使用与此阶段你使用的上一张牌点数或花色相同的牌时，你可以摸一张牌。②出牌阶段限两次，你可以将一张牌当做任意基本牌使用。若你于此阶段内使用的上一张牌有花色，则此牌的花色视为上一张牌的花色',
	sgsxjxfzmnl_reshibei:'矢北',
	sgsxjxfzmnl_reshibei_info:'锁定技，当你受到伤害后，若此是你本回合奇数次受到伤害，你回复1点体力。',

	sgsxjxfzmnl_shen_ganning:'阴间神甘宁',
	sgsxjxfzmnl_shen_ganning_prefix:'阴间神',
	sgsxjxfzmnl_drltpoxi:'魄袭',
	sgsxjxfzmnl_drltpoxi_info:'出牌阶段，你可以观看一名其他角色的手牌，然后你可以弃置你与其手牌中的四张花色不同的牌。若如此做，根据此次弃置你的牌的数量执行以下效果：零张，增加1点体力上限；一张，摸一张牌；三张，你回复1点体力；四张，摸四张牌。',
	sgsxjxfzmnl_drltjieying:'劫营',
	sgsxjxfzmnl_drltjieying_info:'回合开始时，若场上没有拥有“营”标记的角色，你获得1个“营”标记；结束阶段，你可以将你的一个“营”标记交给一名角色；有“营”标记的角色摸牌阶段多摸一张牌，出牌阶段使用【杀】的次数上限+1，手牌上限+1，此数值对你翻倍。有“营”的其他角色回合结束时，其移去“营”标记，然后你获得其所有手牌。',
	
	sgsxjxfzmnl_shichangshi: "阴间十常侍",
	sgsxjxfzmnl_shichangshi_prefix: "阴间",
	sgsxjxfzmnl_mbdanggu: "党锢",
	sgsxjxfzmnl_mbdanggu_info: "锁定技。①游戏开始时，你获得十张“常侍”牌，然后你进行一次结党。②当你修整结束后，你进行一次结党并摸两张牌。③若你有亮出的“常侍”牌，你视为拥有这些牌的技能。（这是仙界下凡怎么你了的十常侍专用的党锢）",
	sgsxjxfzmnl_mbdanggu_faq: "关于结党",
	sgsxjxfzmnl_mbdanggu_faq_info: "<br>系统随机选择一张未亮出过的“常侍”牌，然后选择四张未亮出过的“常侍”牌。你观看前者，然后从后者中选择一名认可前者的“常侍”牌。然后若此时不为双将模式，你将这两张武将牌作为你的武将牌（不移除原有技能）；否则你获得这两张武将牌上的技能。",
	sgsxjxfzmnl_mbdanggu_faq2: "关于认可",
	sgsxjxfzmnl_mbdanggu_faq2_info:'这个版本十常侍没有不认可',
	// sgsxjxfzmnl_mbdanggu_faq2_info: "<br>双向不认可常侍为固定组合：<br><li>郭胜、段珪<br><li>韩悝、毕岚<br>单向不认可常侍为系统随机分配。<br>每次结党至多存在一张不认可主将的常侍牌，且若此次结党仅有一张常侍牌，则不会存在不认可情况。",
	sgsxjxfzmnl_mbmowang: "殁亡",
	sgsxjxfzmnl_mbmowang_info: "锁定技。①当你死亡前，若你有未亮出的“常侍”牌且体力上限大于0，你将死亡改为修整至你的下个回合开始前，然后你复原武将牌，且不于此次死亡事件中进行展示身份牌、检测游戏胜利条件与执行奖惩的流程。②回合结束后，你死亡。（这是仙界下凡怎么你了的十常侍专用的殁亡）",
	sgsxjxfzmnl_mbmowang_faq: "关于修整",
	sgsxjxfzmnl_mbmowang_faq_info: "<br>将武将牌移出游戏（视为你存活）。当该角色修整结束，其移回游戏。",
	sgsxjxfzmnl_scs_zhangrang: "阴间张让",
	sgsxjxfzmnl_scs_zhangrang_prefix: "阴间",
	sgsxjxfzmnl_scstaoluan: "滔乱",
	sgsxjxfzmnl_scstaoluan_info: "出牌阶段限一次。你可以将一张牌当任意一种基本牌或普通锦囊牌或延时锦囊牌使用，然后摸一张牌。",
	sgsxjxfzmnl_scs_zhaozhong: "阴间赵忠",
	sgsxjxfzmnl_scs_zhaozhong_prefix: "阴间",
	sgsxjxfzmnl_scschiyan: "鸱咽",
	sgsxjxfzmnl_scschiyan_info: "①当你使用【杀】指定目标后，你可以将其至多X张牌置于其武将牌上（X为其体力值），然后其于当前回合结束时获得这些牌。②当你因执行【杀】的效果对一名角色造成伤害时，此伤害+1。",
	sgsxjxfzmnl_scs_sunzhang: "阴间孙璋",
	sgsxjxfzmnl_scs_sunzhang_prefix: "阴间",
	sgsxjxfzmnl_scszimou: "自谋",
	sgsxjxfzmnl_scszimou_info: "锁定技。出牌阶段，当你使用第二/四/六张牌时，你从牌堆中获得一张【杀】和【闪】/【酒】和【桃】/【决斗】和【无中生有】。",
	sgsxjxfzmnl_scs_bilan: "阴间毕岚",
	sgsxjxfzmnl_scs_bilan_prefix: "阴间",
	sgsxjxfzmnl_scspicai: "庀材",
	sgsxjxfzmnl_scspicai_info: "出牌阶段限一次。你可进行判定牌不置入弃牌堆的判定。若判定结果的花色和点数在本次发动技能时的其他判定结果中均未出现，则你可以重复此流程。然后你将所有位于处理区的判定牌交给一名角色。",
	// sgsxjxfzmnl_scspicai_info: "出牌阶段限一次。你可进行判定牌不置入弃牌堆的判定。若判定结果与本次发动技能时的其他判定结果的花色均不相同，则你可以重复此流程。然后你将所有位于处理区的判定牌交给一名角色。",
	sgskjdbzjms_scspicai_append:'此技能原作者描述有问题，我试着嘟嘟看看有没有实战，有实战以实战为准<br>找了，没有实战，村了。',

	sgsxjxfzmnl_scs_xiayun: "阴间夏恽",
	sgsxjxfzmnl_scs_xiayun_prefix: "阴间",
	sgsxjxfzmnl_scsyaozhuo: "谣诼",
	sgsxjxfzmnl_scsyaozhuo_info: "出牌阶段限一次。你可以与一名角色拼点，若你赢，其跳过下一个摸牌阶段；若你没赢，你摸一张牌。",
	sgsxjxfzmnl_scs_hankui: "阴间韩悝",
	sgsxjxfzmnl_scs_hankui_prefix: "阴间",
	sgsxjxfzmnl_scsxiaolu: "宵赂",
	sgsxjxfzmnl_scsxiaolu_info: "出牌阶段限一次。你可以摸五张牌，然后选择一项：1.弃置五张手牌；2.将五张牌交给一名其他角色。",
	sgsxjxfzmnl_scs_lisong: "阴间栗嵩",
	sgsxjxfzmnl_scs_lisong_prefix: "阴间",
	sgsxjxfzmnl_scskuiji: "窥机",
	sgsxjxfzmnl_scskuiji_info: "出牌阶段限一次。你可以观看一名其他角色的手牌，然后弃置你与其的共计四张花色各不相同的手牌。",//没加强？！
	sgsxjxfzmnl_scs_duangui: "阴间段珪",
	sgsxjxfzmnl_scs_duangui_prefix: "阴间",
	sgsxjxfzmnl_scschihe: "叱吓",
	sgsxjxfzmnl_scschihe_info: "当你使用【杀】指定唯一目标后，你可亮出牌堆顶的四张牌，令此【杀】的伤害值基数+X（X为亮出牌中花色与此【杀】相同的牌数），且目标角色不能使用亮出牌包含的花色的牌响应此【杀】。",
	sgsxjxfzmnl_scs_guosheng: "阴间郭胜",
	sgsxjxfzmnl_scs_guosheng_prefix: "阴间",
	sgsxjxfzmnl_scsniqu: "逆取",
	sgsxjxfzmnl_scsniqu_info: "出牌阶段限一次。你可以对至多两名角色造成1点火焰伤害。",
	sgsxjxfzmnl_scs_gaowang: "阴间高望",
	sgsxjxfzmnl_scs_gaowang_prefix: "阴间",
	// sgsxjxfzmnl_scsanruo: "安弱",
	// sgsxjxfzmnl_scsanruo_info: "你可以将一张♥牌当【桃】、♦牌当火【杀】、♣牌当【闪】、♠牌当【无懈可击】使用。当你以此法使用或打出【杀】或【闪】时，你可以获得对方的一张牌；当你以此法使用【桃】时，你可以获得一名其他角色的一张牌；当你以此法使用【无懈可击】时，你可以获得此牌响应的普通锦囊牌的使用者的一张牌。",
	sgsxjxfzmnl_scsmiaoyu: "妙语",
	sgsxjxfzmnl_scsmiaoyu_info: "你可以将一张♥牌当【桃】、♦牌当火【杀】、♣牌当【闪】、♠牌当【无懈可击】使用（没写打出，但根据后文以及剧情，应该是有的）。当你以此法使用或打出牌时，你获得一名任意角色牌（没说可，就当可吧）",

	sgsxjxfzmnl_yue_caiwenji: "阴间乐蔡琰",
	sgsxjxfzmnl_yue_caiwenji_prefix: "阴间乐",
	sgsxjxfzmnl_dcshuangjia: "霜笳",
	// sgsxjxfzmnl_dcshuangjia_tag: "胡笳",//不必要
	sgsxjxfzmnl_dcshuangjia_info: '锁定技。①游戏开始，你将初始手牌标记为“胡笳”。②你的“胡笳”牌不计入手牌上限。③其他角色至你的距离+X（X为你的“胡笳”数且<span style="text-decoration: line-through;">至多为5</span>无上限）④结束阶段，你可以将所有手牌标记为“胡笳”。',
	sgsxjxfzmnl_dcbeifen: "悲愤",
	sgsxjxfzmnl_dcbeifen_info: "锁定技。①当你失去牌后，若这些牌中有“胡笳”牌，你获得本次失去牌中“胡笳”牌花色均不同的每种花色的牌各一张。②若你手牌中有“胡笳”牌，你使用牌无距离和次数限制。",

	sgsxjxfzmnl_liuyan:'阴间刘焉',
	sgsxjxfzmnl_liuyan_prefix:'阴间',
	sgsxjxfzmnl_tushe:'图射',
	sgsxjxfzmnl_tushe_info:'当你使用牌指定目标后，若你没有基本牌，则你可以摸X张牌（X为此牌指定的目标数）',
	sgsxjxfzmnl_limu:'立牧',
	sgsxjxfzmnl_limu_info:'出牌阶段，你可以将一张牌当【乐不思蜀】对任意角色使用，然后恢复一点体力；你判定区有牌时，你对其他角色使用牌没有次数和距离限制。',

	sgsxjxfzmnl_shen_xunyu: "阴间神荀彧",
	sgsxjxfzmnl_shen_xunyu_prefix: "阴间神",
	sgsxjxfzmnl_tianzuo: "天佐",//前述是描述原文，这是我的解释：在牌堆，弃牌堆，场上玩家手中的一张因此加入游戏的【奇正相生】
	sgsxjxfzmnl_tianzuo_info: "锁定技。①游戏开始时，你将八张【奇正相生】加入牌堆；摸牌阶段开始时，你获得一张【奇正相生】（如武继般）。②【奇正相生】对你无效。",
	sgsxjxfzmnl_lingce: "灵策",
	sgsxjxfzmnl_lingce_info: "锁定技。当有【奇正相生】或智囊或〖定汉①〗记录过的锦囊牌被使用时，<span style=\"text-decoration: line-through;\">若此牌不为转化牌且对应实体牌数量为1，则</span>你摸一张牌。",
	sgsxjxfzmnl_dinghan: "定汉",
	sgsxjxfzmnl_dinghan_info: "①当你成为未记录过的普通锦囊牌的目标时，或有未记录过的延时锦囊牌进入你的判定区时，你<span style=\"text-decoration: line-through;\">记录此牌名并</span>取消之。②准备阶段，你可在〖定汉①〗的记录中添加或减少<span style=\"text-decoration: line-through;\">一种</span>锦囊牌的牌名。",

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
	sgsxjxfzmnl_dcqingshi_info: "当你于出牌阶段使用牌时，若你本回合未因此牌名的牌发动过该技能，你可以选择一项：1.令此牌对其中一个目标角色造成的<span class=yellowtext>伤害+X（X为其全场相同阵营数）</span>；2.<span class=yellowtext>令任意名角色各摸Y张牌（Y为全场蜀阵营数）</span>；3.<span class=yellowtext>摸七张牌</span><span style=\"text-decoration: line-through;\">，然后〖情势〗于本回合无效</span>。",
	sgsxjxfzmnl_dcqingshi_append:'（夜白哔哔：什么叫全场相同阵营？这是身份场能出现的吗？）（看了二项————原来这叫阵营……）',
	sgsxjxfzmnl_dczhizhe: "智哲",
	sgsxjxfzmnl_dczhizhe_clear: "invisible",
	sgsxjxfzmnl_dczhizhe_info: "限定技。出牌阶段，你可以选择一张手牌并复制之。当你使用或打出此复制牌结算结束后，你获得之，然后你本回合不能再使用或打出此牌。<span class=yellowtext>这张牌无法被弃置</span>",

	sgsxjxfzmnl_sb_caopi: "阴间谋曹丕",
	sgsxjxfzmnl_sb_caopi_prefix: "阴间谋",
	sgsxjxfzmnl_sbxingshang: "行殇",
	sgsxjxfzmnl_sbxingshang_info: "①当一名角色受到伤害后<span style=\"text-decoration: line-through;\">（每回合限一次）</span>或死亡时，你获得2个“颂”标记<span style=\"text-decoration: line-through;\">（你至多拥有9个“颂”标记）</span>。②出牌阶段<span style=\"text-decoration: line-through;\">限两次</span>，你可以：1.移去2个“颂”标记，令一名角色复原武将牌;2.移去2个“颂”标记，令一名角色摸X张牌（X为本场已死亡角色数，至少为2）；3.移去5个“颂”标记，令一名角色回复X点体力，增加X点体力上限，随机恢复一个已废除的装备栏（X为本场已死亡角色数）（原文没写至少为2，我就不加了）；4.移去5个“颂”标记，获得一名阵亡角色武将牌上的所有技能，然后你失去〖行殇〗〖放逐〗〖颂威〗。",
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
	sgsxjxfzmnl_tongli_info:'出牌阶段限四次，使用牌指定目标后，可令此牌效果额外执行X次。（X为本回合使用牌次数，且最多为4）',
	sgsxjxfzmnl_shezang:'奢葬',
	sgsxjxfzmnl_shezang_info:'你进入濒死或有人进入濒死，可获得不同花色的牌各1张。',

	sgsxjxfzmnl_caojinyu:'阴间曹金玉',
	sgsxjxfzmnl_caojinyu_prefix:'阴间',
	sgsxjxfzmnl_yuqi:'隅泣',
	sgsxjxfzmnl_yuqi_info:'锁定技，有角色受伤后，若你与其距离小于等于0，你可以观看牌堆顶3张牌，将其中至多1张交给受伤角色，至多1张自己获得，其余的牌放回牌堆顶。',
	sgsxjxfzmnl_shanshen:'善身',
	sgsxjxfzmnl_shanshen_info:'有角色进入濒死时，你可令‘隅泣’中的一个数字+1；有角色死亡时，你可令‘隅泣’中的一个数字+2。（若你没有对死亡角色造成过伤害，你回复1点体力且‘隅泣’增加的数字X2）',
	sgsxjxfzmnl_xianjing:'娴静',
	sgsxjxfzmnl_xianjing_info:'准备阶段，你可令‘隅泣’中的一个数字+1。若你满体力，再令‘隅泣’中的一个数字+1。',

	sgsxjxfzmnl_shen_machao:'阴间神马超',
	sgsxjxfzmnl_shen_machao_prefix:'阴间神',
	sgsxjxfzmnl_shouli:'狩骊',
	sgsxjxfzmnl_shouli_info:'每轮开始，从下家开始所有角色随机使用场上一张坐骑牌。你可以将场上的进攻马当不限次数无法响应的[杀]、防御马当[闪]打出或使用。（以此法失去坐骑牌的其他角色本回合失去所有技能，你与其本回合受到的伤害+1且改为雷电伤害。）',
	sgsxjxfzmnl_hengwu:'横骛',
	sgsxjxfzmnl_hengwu_info:'你使用或打出牌时，若你没有该花色的手牌，可摸X张牌。（X为场上与此牌花色相同的装备数量）',

	sgsxjxfzmnl_sunhanhua:'阴间孙寒华',
	sgsxjxfzmnl_sunhanhua_prefix:'阴间',
	sgsxjxfzmnl_chongxu: "冲虚",
	sgsxjxfzmnl_chongxu_info: "出牌阶段限三次，你可以进行一次‘集灵’来获得分数，然后你可以用分数来进行升级“妙剑”、升级“莲华”或摸牌。",
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