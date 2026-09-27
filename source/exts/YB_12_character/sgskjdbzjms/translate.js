import { lib, game, ui, get, ai, _status } from '../../../../../../noname.js';
export { translate };

const translate = {
	//-----------------------三国杀，开局大宝直接秒杀


	sgskjdbzjms: '三国杀，开局大宝直接秒杀',
	sgskjdbzjms_info: '三国杀，开局大宝直接秒杀<br>平台：番茄小说<br>作者：糊涂小笨蛋',

	sgskjdbzjms_zrshenmoyi: '沈墨以', //界徐盛，神赵云，神诸葛亮，神郭嘉
	//界公孙瓒 公孙瓒 潘璋马忠
	sgskjdbzjms_smyhengcai: '横财',
	sgskjdbzjms_smyhengcai_info: '锁定技，游戏开始时，你可以随机招募四名史诗或传说武将充入自己将池（或令剧情四名初始神将加入将池）（第一个必定是界徐盛）（若招募到的是神将，则需要后续使用弥仙神术激活），然后你选择将池的一名武将替换自己的另一名武将；每轮开始时，你获得一枚随机宝珠（普通5权，精品3权，传说2权）。',
	sgskjdbzjms_smyjihun: '集魂',
	sgskjdbzjms_smyjihun_info: '回合开始时，你可以消耗宝珠进行招募，然后选择将池一名武将替换另一武将。',
	//沈妈 柳月梅
	//沈爸
	sgskjdbzjms_zrzhenghao: '郑豪', //手杀界邓艾  界马超，界满宠  李傕
	sgskjdbzjms_zrzhaoyoubo: '赵有博', //

	sgskjdbzjms_zrmurongyan: '慕容岩', //魔周泰

	//哈哈哈，我是将军，我是大将军
	//我封你为骠骑将军，你是车骑将军。随我征战！
	sgskjdbzjms_zrsimapo: '司马珀', //司马昭 许褚
	sgskjdbzjms_zranmuxi: '安慕希', //代抽出手杀界钟会
	sgskjdbzjms_amxdaichou: '代抽',
	sgskjdbzjms_amxdaichou_info: '其他角色摸牌时，其可以改为令你摸等量张牌并交给其。',
	sgskjdbzjms_amxhaoyun: '好运',
	// sgskjdbzjms_amxhaoyun_info:'持恒技，当你摸牌时，你可以声明一个牌名（不能是以此法声明过的牌名），令本次摸的牌其中随机一张的牌名改为之。此牌进入弃牌堆则恢复原牌名。',
	sgskjdbzjms_amxhaoyun_info: '持恒技，当你摸牌时，你可以声明一个牌名，令本次摸的牌必然包含其（除非牌堆没有）。',

	sgskjdbzjms_zrganmeng: '甘檬', //神甘宁
	sgskjdbzjms_zryangxiong: '杨雄', //杨仪
	//刘左将军 手杀界华雄
	//林欣（张角）&许意（界刘备）
	//诸葛羽秋（界黄月英，仙诸葛果）&李若依

	sgskjdbzjms_mo_zhoutai: '魔周泰',
	sgskjdbzjms_mo_zhoutai_prefix: '魔',
	sgskjdbzjms_tiequ: '铁躯',
	sgskjdbzjms_tiequ_info: '锁定技，你受到的属性伤害-1；你每受到一次伤害，便获得一个“淬炼”标记。',
	sgskjdbzjms_xieren: '卸刃',
	sgskjdbzjms_xieren_info: '当你对其他角色造成伤害，或当你受到其他角色造成的伤害时，你可以弃置其一张牌。',
	sgskjdbzjms_cuiti: '淬体',
	sgskjdbzjms_cuiti_info: `觉醒技，回合开始阶段，若你至少拥有三个“淬炼”标记，你增加1点体力上限，并回复1点体力，获得技能${get.poptip('gzbuqu')}。`,

	sgskjdbzjms_shen_zhugeliang: '魂神诸葛亮',
	sgskjdbzjms_shen_zhugeliang_prefix: '魂|神',
	sgskjdbzjms_zhongwu: '忠武',
	sgskjdbzjms_zhongwu_info: '锁定技，摸牌阶段，你多摸一张牌；出牌阶段，你多出一张杀；手牌上限+2。',
	sgskjdbzjms_kuangfeng: '狂风',
	sgskjdbzjms_kuangfeng_info: '结束阶段，你可以弃置任意张“星”并指定等量名角色：直到你的下回合开始，这些角色受到火焰伤害时，此伤害+1。',
	sgskjdbzjms_tianshi: '天时',
	sgskjdbzjms_tianshi_info: `觉醒技，准备阶段，若你的“星”全部使用完，或者你主动舍弃所有的“星”，然后你减少1点体力上限，获得技能${get.poptip('sgskjdbzjms_boxing')}。`,
	sgskjdbzjms_boxing: '薄幸',
	sgskjdbzjms_boxing_info: '你可以将一张牌当作任意一张基本牌，锦囊牌使用或打出，同一回合内，每多使用一次，你减少1点体力或体力上限。',

	sgskjdbzjms_leizhenzi: '雷震子',
	sgskjdbzjms_leishen: '雷神', //锁定技，你造成的所有伤害均为雷属性
	sgskjdbzjms_leishen_info: '锁定技，你造成的所有伤害均包含雷属性；当你使用雷【杀】造成伤害时，伤害+1；当你使用火【杀】造成伤害时，你可以弃置目标角色一张手牌。',
	sgskjdbzjms_jiangxing: '将星', //锁定技，你免疫一切雷电伤害。
	sgskjdbzjms_jiangxing_info: '锁定技，你免疫一切雷电伤害。',
	sgskjdbzjms_leifa: '雷罚', //锁定技，回合开始时，你随机对一名其他角色造成一点雷电伤害。
	sgskjdbzjms_leifa_info: '锁定技，回合开始时，你随机对一名敌方角色造成1点雷电伤害。',
	sgskjdbzjms_fenglei: '风雷', //转换技，风，出牌阶段，你弃置两张牌，直到你的下一回开始之前，你不在其他角色攻击范围内；雷，出牌阶段，你摸两张牌，当前回合使用牌无视距离。
	sgskjdbzjms_fenglei_info: '永续转换技，出牌阶段限一次，风，你弃置两张牌，直到你的下一回开始之前，你不在其他角色攻击范围内；雷，你摸两张牌，当前回合使用牌无视距离。',
	'#ext:夜白神略/audio/character/sgskjdbzjms_leishen1': '', //雷神台词
	'#ext:夜白神略/audio/character/sgskjdbzjms_leishen2': '',
	'#ext:夜白神略/audio/character/sgskjdbzjms_leifa1': '感受雷电的惩罚吧', //雷罚台词
	'#ext:夜白神略/audio/character/sgskjdbzjms_leifa2': '',
	'#ext:夜白神略/audio/character/sgskjdbzjms_fenglei1': '冯虚御风，雷行万里', //风雷台词
	'#ext:夜白神略/audio/character/sgskjdbzjms_fenglei2': '',
	'#ext:夜白神略/audio/character/sgskjdbzjms_jiangxing1': '哈哈哈，蠢，真是太蠢了！', //将星台词
	'#ext:夜白神略/audio/character/sgskjdbzjms_jiangxing2': '是将星，我的雷震子有技能将星，可以免疫一切雷电伤害。',
	'#ext:夜白神略/audio/die/sgskjdbzjms_leizhenzi': '可恶的神诸葛亮啊！', //阵亡台词

	sgskjdbzjms_xian_zhugeguo: '仙诸葛果',
	sgskjdbzjms_xian_zhugeguo_prefix: '仙',
	//出牌阶段限一次，你可以进行一次判定牌不进入弃牌堆的判定，若结果为：黑桃，你可以视为对一名角色使用一张杀；红桃，你可以让一名角色回复一点体力；方块，你可以让一名角色摸两张牌；梅花，你可以弃置一名角色的一张牌。然后若本次判定没有出现相同花色，你可以重复之。全部结算之后将这些牌置入弃牌堆。
	sgskjdbzjms_qirang: '祈禳', //出牌阶段，你可以进行一次判定，若结果为：黑桃，你可以让一名角色多出一张杀；红桃，你可以让一名角色回复一点体力；方块，你可以让一名角色摸两张牌；梅花，你可以弃置一名角色的一张牌。
	sgskjdbzjms_qirang_info: '出牌阶段限一次，你可以进行一次判定，若结果为：黑桃，你可以视为对一名角色使用一张杀；红桃，你可以让一名角色回复1点体力；方块，你可以让一名角色摸两张牌；梅花，你可以弃置一名角色的一张牌。',
	sgskjdbzjms_cifu: '赐福',
	sgskjdbzjms_cifu_info: '回合开始时，若你的“福”不足三个，你将“福”补至三个，然后你可以将任意“福”分配给其他角色，拥有“福”的其他角色摸牌阶段额外摸两张牌，然后移去“福”。若你有三个“福”，当你受到属性伤害时，防止之。',
	sgskjdbzjms_yuhua: '羽化',
	sgskjdbzjms_yuhua_info: '觉醒技，当你进入濒死状态时，你将体力回复至1点，然后减少1点体力上限，手牌上限+1，获得技能“天仙”。',
	sgskjdbzjms_tianxian: '天仙',
	sgskjdbzjms_tianxian_info: '锁定技，你的锦囊牌和【桃】不计入手牌上限；回合开始时，你获得一张锦囊牌。',

	sgskjdbzjms_zhen_zhangfei: '真张飞',
	sgskjdbzjms_zhen_zhangfei_prefix: '真',
	sgskjdbzjms_paoxiao: '咆哮',
	sgskjdbzjms_paoxiao_info: '锁定技，出牌阶段，你使用【杀】无次数、距离限制。',
	sgskjdbzjms_kuangbao: '狂暴', //锁定技，你的黑色锦囊牌和黑色武器牌均视为【杀】；当你以此法使用的杀对其他角色造成伤害时，此伤害+1，你弃置一张手牌。
	sgskjdbzjms_kuangbao_info: '锁定技，你的黑色锦囊牌和黑色武器牌只能当【杀】使用；当你以此法使用的杀对其他角色造成伤害时，此伤害+1，你弃置一张手牌。',
	sgskjdbzjms_yinhen: '引恨',
	sgskjdbzjms_yinhen_info: '锁定技，每当你于出牌阶段杀死一名其他角色，你失去1点体力。',

	sgskjdbzjms_zhen_guanyu: '真关羽',
	sgskjdbzjms_zhen_guanyu_prefix: '真',
	sgskjdbzjms_wusheng: '武圣',
	sgskjdbzjms_wusheng_info: '你可以将红色牌当【杀】使用或打出，你的红桃【杀】伤害+1，方块【杀】无距离限制。',
	sgskjdbzjms_danji: '单骑', //原文没有最大牌数
	sgskjdbzjms_danji_info: '每回合限一次，当你失去所有手牌时，你可以补充手牌至体力上限（至多摸二十）。',
	sgskjdbzjms_danji_append: '二十的上限是我加的，原文没有',
	sgskjdbzjms_fujun: '覆军',
	sgskjdbzjms_fujun_info: '限定技，出牌阶段，你可以令所有角色选择一项：①弃置两张牌，②令你摸三张牌；然后你增加1点体力上限，回复1点体力。',
	// wusheng_jsp_guanyu:'武圣',
	// wusheng_jsp_guanyu_info:'此技能仅提供一条语音',

	sgskjdbzjms_shen_liubei: '魂神刘备',
	sgskjdbzjms_shen_liubei_prefix: '魂|神',
	sgskjdbzjms_zhaolie: '昭烈',
	sgskjdbzjms_zhaolie_info: '锁定技，你的手牌上限始终为体力上限。',
	sgskjdbzjms_rende: '仁德', //
	sgskjdbzjms_rende_info: '出牌阶段限一次，你可以将任意手牌交给任意其他角色，然后你可以摸X张牌（X为交出手牌数一半+1，向下取整）',
	sgskjdbzjms_taoyuan: '桃园',
	sgskjdbzjms_taoyuan_info: `觉醒技，准备阶段，若你的体力值为3，你可以选择至多三名角色，使其回复1点体力，然后补充手牌至体力上限，然后你增加3点体力上限，回复3点体力，摸三张牌。然后你获得技能${get.poptip('sgskjdbzjms_juguo')}和${get.poptip('sgskjdbzjms_qingfu')}。`,
	sgskjdbzjms_juguo: '举国',
	sgskjdbzjms_juguo_info: '出牌阶段限一次，你可以弃置三张手牌，然后令所有其他角色失去1点体力并弃置一张手牌。',
	sgskjdbzjms_qingfu: '倾覆',
	sgskjdbzjms_qingfu_info: `锁定技，你每使用一次${get.poptip('sgskjdbzjms_juguo')}，你选择一项：①失去1点体力，②减少1点体力上限。`,

	sgskjdbzjms_zhen_machao: '真马超',
	sgskjdbzjms_zhen_machao_prefix: '真',
	// sgskjdbzjms_tieji:'铁骑',
	sgskjdbzjms_mashu: '马术',
	sgskjdbzjms_mashu_info: '锁定技，你计算与其他角色的距离时-1；其他角色计算与你的距离时，若其手牌数少于你，则+1。',
	sgskjdbzjms_shenweitianjiangjun: '神威',
	sgskjdbzjms_shenweitianjiangjun_info: '锁定技，当你造成伤害后，受伤角色选择一项：①弃置两张手牌，②令你摸两张牌。',

	sgskjdbzjms_zhen_liubei: '真刘备',
	sgskjdbzjms_zhen_liubei_prefix: '真',
	sgskjdbzjms_jieying: '连营',
	sgskjdbzjms_jieying_info: '锁定技，你始终处于横置状态；回合结束阶段，你可以横置一名其他角色。',
	sgskjdbzjms_tuogu: '托孤',
	sgskjdbzjms_tuogu_info: '当你进入濒死状态时，你可以选择至多两名其他角色，令他们选择一项：①摸三张牌，②，回复1点体力。',

};
