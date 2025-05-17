import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {translate}

const translate = {
	//将包分类
	ybsl_yjcm:'<span class=yellowtext>一将成名</span>',
	ybsl_yjcm_info:'夜白在三国杀十周年服投的稿。',
	ybslshen_pangtong:'神庞统',
	ybslshen_pangtong_prefix:'神',
	ybsl_ptchiling:'炽翎',
	ybsl_ptchiling_info:'锁定技，游戏开始时（发牌前），你令牌堆所有牌附着火焰标记（下文简称点燃）。当场上有附着火焰的牌进入弃牌堆时，你可以移除此牌火焰，并获得等量火焰（下文简称吸收此牌的火焰）。你可以：出牌阶段限一次，你可以移除2/5/10枚火焰，对一名其他角色造成1/2/3点火焰伤害；出牌阶段限一次，你可以移除20枚火焰，将弃牌堆点燃；出牌阶段限一次，你可以移除40枚火焰，然后令场上角色依次展示手牌，然后弃置其中的附着火焰的牌并受到等量火属性伤害。',
	ybsl_ptqiwu:'栖梧',
	ybsl_ptqiwu_info:'出牌阶段，你可以展示附着火焰的手牌并吸收其火焰；当你受到火属性伤害时，你可以获得双倍火焰；每回合限一次，你可以移除2/5/10枚火焰，然后视为使用恢复数值为+0/+1/+2的桃；每轮限一次，当你进入濒死状态时，你可以移除40枚火焰，回复体力至上限并摸三张牌。',

	ybsl_ptchiling_1_backup:'炽翎·火伤',
	ybsl_ptqiwu_1_backup:'栖梧·吃桃',

	ybsl_ptchiling_eat:'炽翎·吸收',
	ybsl_ptchiling_eat_info:'当场上有附着火焰的牌进入弃牌堆时，你可以吸收此牌的火焰',
	ybsl_ptqiwu_eat:'栖梧·吸收',
	ybsl_ptqiwu_eat_info:'当你受到火属性伤害时，你可以获得双倍火焰',

	ybsl_ptchiling1:'炽翎一',
	ybsl_ptchiling1_info:'出牌阶段限一次，你可以移除2枚火焰，对一名其他角色造成1点火焰伤害',
	ybsl_ptchiling2:'炽翎二',
	ybsl_ptchiling2_info:'出牌阶段限一次，你可以移除5枚火焰，对一名其他角色造成2点火焰伤害',
	ybsl_ptchiling3:'炽翎三',
	ybsl_ptchiling3_info:'出牌阶段限一次，你可以移除10枚火焰，对一名其他角色造成3点火焰伤害',

	ybsl_ptqiwu1:'栖梧一',
	ybsl_ptqiwu1_info:'每回合限一次，你可以移除2枚火焰，然后视为使用恢复数值为+0的桃',
	ybsl_ptqiwu2:'栖梧二',
	ybsl_ptqiwu2_info:'每回合限一次，你可以移除5枚火焰，然后视为使用恢复数值为+1的桃',
	ybsl_ptqiwu3:'栖梧三',
	ybsl_ptqiwu3_info:'每回合限一次，你可以移除10枚火焰，然后视为使用恢复数值为+2的桃',



	ybsl_qygc: '<span class=yellowtext>群友共创第一期</span>',
	ybsl_qygc_info:'但只有夜白一个人的设计。',
	ybsl_xuyou: '许攸',
	ybsl_zhaosanmusi: '朝三暮四',
	ybsl_zhaosanmusi_info: '出牌阶段，对自己使用。目标角色选择：摸三张牌，然后弃置四张手牌，或弃置三张手牌，然后摸四张牌。',
	ybsl_zigong: '自功',
	ybsl_zigong_info: '当你不因此技能获得牌后，你可以弃置这些牌，然后摸等量牌（至多摸5张）',
	ybsl_zicai: '自才',
	ybsl_zicai_info: '当你弃置牌后，根据本次弃牌数，你可以将本次弃置的牌按照以下规则转化：1，火杀，2，调兵遣将，3，以逸待劳，4，增兵减灶，5及以上，朝三暮四。',

	ybsl_clanwjls: '<span class=greentext>吴郡陆氏</span>',
	ybsl_clanwjls_info: '夜白自设的宗族角色，目前只有吴郡陆氏',

	ybsl_clanxingzu: '兴族',
	ybsl_clanxingzu_info: '宗族技，当你每回合首次使用一种类型的牌后，若你本回合未造成伤害，你可以令一名同族角色发动一个出牌阶段限一次的技能（不计入次数）。', //可能些微调整
	//宗族技，当你每回合首次使用一种类型的牌后，若你本回合未造成伤害，你可以令一名同族角色发动一个出牌阶段限一次的技能（不计入次数），或令一名无宗族角色加入你的宗族。
	ybsl_clanqianlei:'谦累',
	ybsl_clanqianlei_info:'宗族技，锁定技，你的阶段被跳过时，你失去一点体力，并选择一名同族角色，然后结束此回合并令该角色执行一个额外回合。',
	// ybsl_clanqianlei_info:'宗族技，锁定技，你的阶段被跳过时，结束此回合并令一名同族角色执行一个额外回合；当你于一个你执行的阶段中使用的前X张牌被抵消后（X为同族角色数），你结束此阶段并执行一个相同的阶段。',
	// 锁定技，你的阶段被跳过时，结束此回合并执行一个额外回合；当你于一个你执行的阶段中使用的首张牌被抵消后，你结束此阶段并执行一个相同的阶段。
	ybslclan_luxun: '族陆逊',
	ybslclan_luxun_prefix: '族',
	ybsl_lxtujing: '图荆',
	ybsl_lxtujing_info: '出牌阶段限一次，你可以选择一名手牌数不为最少或之一的其他角色，然后从你开始，每名手牌数小于其的角色可以依次将一张牌当〖杀〗对其使用（以发动此技能时，场上角色的手牌数为准）。', //可能有待调整
	// ybsl_lxtujing_info:'转换技，出牌阶段限一次，你可以将一张手牌交给一名其他角色：阳，视为对其使用一张【逐近弃远】；阴，视为对其使用一张【杀】。',//可能有待调整
	//思路1万钧神弩
	//思路2偷梁换柱
	ybsl_lxweiyu: '伪誉',
	ybsl_lxweiyu_info: '出牌阶段限一次，你可令一名角色摸两张牌并展示之。若如此做，其本回合不能使用不因此获得的牌。', //可能有待调整
	// ybsl_lxzhiyu:'智誉',
	// ybsl_lxzhiyu_info:'锁定技，当其他角色获得你的牌时，其本回合展示手牌，并令其本回合无法使用数量最多的颜色的牌。',//可能有待调整


	ybslclan_luyan: '族陆延',
	ybslclan_luyan_prefix: '族',
	ybsl_lyyaoe: '夭厄',
	ybsl_lyyaoe_info: '锁定技，当你于回合内使用牌时，若此牌目标包含其他角色，你对自己和目标造成一点伤害。',
	// ybsl_lyyaoe_info: '锁定技，当你于回合内使用牌时，若此牌目标包含其他角色，你对自己造成一点伤害。',
	// 锁定技，当你于回合内使用牌时，若此牌目标包含其他角色，你对自己造成一点伤害；锁定技，每种类型牌你每回合限用一次。
	//ybsl_lyyaoe_info:'锁定技，每种类型牌你每回合限用一次；锁定技，当你每回合首次使用某个类型的牌指定目标后，若目标为其他角色，你对自己和目标各造成x点伤害（x为你本回合使用的类型数，从1开始算，至多为3）。',
	ybsl_lytiandu: '天妒',
	ybsl_lytiandu_info: '你猜天妒啥效果。不出意外的话，此技能仅提供一条语音。',
	ybsl_lykangming: '抗命',
	ybsl_lykangming_info: '出牌阶段限一次，你可以进行一次判定。然后你可以弃置一张花色与判定结果相同的牌。若如此做，本回合夭厄失效。若弃置牌点数也与之相同，则你减一点体力上限。',
	//出牌阶段限一次，你可以进行一次判定。然后你可以弃置一张花色或点数与判定结果相同的牌。若弃置牌与判定结果：花色相同，本回合夭厄一效果失效；点数相同，本回合夭厄二效果失效；花色和点数均相同，本回合夭厄两效果均失效，然后你减一点体力上限。
	
	ybslclan_luji:'族陆绩',
	ybslclan_luji_prefix:'族',
	ybsl_ljfumin:'福民',
	ybsl_ljfumin_info:'出牌阶段限一次，你可将一张手牌交给其他角色，然后若你与对方手牌数相同，此技能视为未发动过，否则手牌数较少的一方摸两张牌。',
	ybsl_ljguihang:'归航',
	ybsl_ljguihang_info:'使命技，锁定技，当你失去手牌后，若你手牌数小于体力上限，你获得【影】补充至体力上限；成功：准备阶段，若你手牌中均为【影】，你弃置所有手牌，获得等量“橘”，并获得技能【怀橘】，然后摸等量手牌（至多5张），然后增加一点体力上限并回复一点体力。',
	// 修改后的方案：

// 姓名：陆绩
// 体力：3
// 势力：吴
// 称号：窥古问天
// 性别：男
// 技能：
// 福民：出牌阶段限一次，你可将一张手牌交给其他角色，然后若你与对方手牌数相同，此技能视为未发动过，否则手牌数较少的一方摸两张牌。
// 归航 ： 使命技 ，锁定技 ，当你失去手牌后 ，若你手牌数小于体力上限 ，你获得 【 影 】 补充至体力上限 ；成功 ：准备阶段 ，若你手牌中均为 【 影 】 ，你弃置所有手牌 ，并摸等量手牌（ 至多 5 张 ）， 然后增加一点体力上限并回复一点体力 。
// 兴族：
// 宗族技，当你每回合首次使用一种类型的牌后，若你本回合未造成伤害，你可以令一名同族角色发动一个出牌阶段限一次的技能（不计入次数）。
	/*
	
	*/

	ybsl_bqbs: '<span class=firetext>别群比赛</span>',
	ybsl_bqbs_info: '夜白在别群比赛中的投稿',

	ybsl_lvyi: '吕乂', //本人在其他群设计大赛的练手作品。落榜作品是另一个，现在看来太二了，就不放了
	//推心置腹杯落榜设
	ybsl_jianyue: '俭约',
	ybsl_jianyue_info: '当你的判定牌进入弃牌堆时，你可以使用之。',
	ybsl_tuntian: '屯田',
	ybsl_tuntian_info: '当你于回合外失去一张牌时，你可以进行一次判定，若结果不为红桃，你可以将其置于武将牌上称为“田”；你计算与其他角色的距离-X，X为你的“田”数。',
	ybsl_quanfan: '劝范',
	ybsl_quanfan_backup: '劝范',
	ybsl_quanfan_info: '出牌阶段限一次，你可以弃置一张牌或一张“田”，进行一次判定，然后展示一名其他角色的至多Y张手牌（Y为其体力值且至多为5），弃置其中与判定花色相同的牌。',//颜色
	ybsl_xrquanfan: '劝范',
	ybsl_xrquanfan_info: '出牌阶段限一次，你可以弃置一张牌或一张“田”，进行一次判定，然后展示一名其他角色的至多Y张手牌（Y为其体力值且至多为5），弃置其中与判定颜色相同的牌。若其未因此弃牌，其摸展示数张牌。', //懒得写了

	ybsl_yinfan: '隐蕃', //第11届小白杯 突围赛第3轮  重在参与的设计
	ybsl_quanbian: '权辩',
	ybsl_quanbian_info: '出牌阶段，当你使用牌后，若此花色为你本阶段首次使用，你可以摸一张牌。否则你需失去一点体力，且攻击范围+1。',
	ybsl_quanbianx: '权辩',
	ybsl_quanbianx_info: '出牌阶段，当你使用牌后，你可以摸一张牌，每种花色每阶段限一次。若如此做，本阶段你再次使用该花色牌后，你需失去一点体力，且攻击范围+1。',
	ybsl_zhaxiang: '诈降',
	ybsl_zhaxiang_info: '此技能仅提供一条语音。',

	ybsl_shlizhaoyi: '李昭仪', //第11届小白杯 突围赛第4轮  重在参与的设计
	ybsl_ranxiny: '燃心',
	ybsl_ranxiny_info: '每个回合结束时，若本回合有阶段被跳过或当前回合角色弃置过牌，你可令当前回合角色回复1点体力或摸两张牌（若两项均满足则本次追加第三项：令当前回合角色回复1点体力，然后摸两张牌），然后视为对其使用一张伤害+1的火【杀】。',
	ybsl_ranxinx: '燃心',
	ybsl_ranxinx_info: '每个回合结束时，若为你的回合，或本回合有阶段被跳过或有伤害被防止或有牌被取消过目标，你可令当前回合角色回复1点体力或摸两张牌，然后视为对其使用一张伤害+1的火【杀】。',
	ybsl_ranxin: '燃心',
	ybsl_ranxin_info: '每个回合结束时，若为你的回合，或本回合有阶段被跳过或有伤害被防止，你可令当前回合角色回复1点体力或摸两张牌，然后视为对其使用一张伤害+1的火【杀】。',
	// ybsl_ranxin_info: '有阶段被跳过或有伤害被防止的回合结束时，你可令当前回合角色回复1点体力或摸两张牌，然后视为对其使用一张伤害+1的火【杀】。',
	// ybsl_ranxin_info:'有阶段被跳过或有伤害被防止的回合结束时，你可令当前回合角色回复1点体力，然后视为对其使用一张伤害+1的火【杀】。',
	ybsl_fuju: '付炬',
	ybsl_fuju_info: '锁定技，其他角色获得你的牌/对你造成伤害时，你改为弃置之/失去1点体力。然后你依次执行：①若其体力值大于你，你对其造成1点伤害；②若其手牌数大于你，你弃置其一张牌。',
	
	ybsl_sunshaoo:'孙韶',//第12届小白杯 预赛第二轮落榜作品
	ybsl_rongjie:'戎戒',
	ybsl_rongjie_info:'每回合限一次，当你使用伤害牌指定其他角色为唯一目标或成为其他角色使用伤害牌的目标时，你可以令你和对方依次选择发动一个出牌阶段限一次的主动技能（不计入发动次数），不如此做（或无法如此做）者令对方获得自己一张手牌。若双方均如此做，此牌对目标无效。',
	ybsl_xiangcha:'详查',
	ybsl_xiangcha_info:'转换技，出牌阶段限一次，阳：你可以将一张红色牌当【洞烛先机】使用；阴，你可以将一张黑色牌当【知己知彼】使用。若因此观看到了与本次使用牌相同颜色的牌，你可以展示之，令你本回合下次造成的伤害+X(X为本次展示的牌数)。',

	ybsl_wangbi:'王必',//第13届小白杯预选赛第一轮落榜设计（改）
	ybnb_wangbi:'界王必',
	ybnb_wangbi_prefix:'界',
	ybsl_xijian:'悉谏',
	ybsl_xijian_info:'限定技，当有角色脱离濒死状态时，你可令该角色失去全部体力。',
	// ybsl_xijianx:'悉谏',
	// ybsl_xijianx_info:'限定技，当有角色脱离濒死状态时，你可令当前回合角色选择一项：摸X张牌，或令该角色失去全部体力（X为该角色体力值且至多为5）。',
	ybsl_yedun:'夜遁',
	ybsl_yedun_info:'锁定技，当你每回合首次受到伤害后，你需选择一名其他角色（不能是本局游戏以此法选择过的角色），其需选择：①令你摸3张牌，然后你本回合不能成为黑色牌目标；②令你失去1点体力，然后你本局游戏获得【失路】。',
	ybsl_yedunx:'夜遁',
	ybsl_yedunx_info:'锁定技，当你每回合首次受到伤害后，你需选择一名其他角色（不能是本局游戏以此法选择过的角色），其需选择：①令你摸3张牌，然后你本回合不能成为黑色牌目标；②令你失去1点体力，然后你本局游戏获得【失路】（可以获得多个）。',
	ybsl_shilu:'失路',
	ybsl_shilu_info:'锁定技。当你受到伤害后，你摸X张牌（X为你的体力值且至多为5）。然后你展示攻击范围内一名角色的一张手牌并令此牌视为无属性【杀】。',
	ybsl_qingguo:'倾国',
	ybsl_qingguo_info:'你可以将一张黑色牌当做【闪】使用或打出。',

	ybsl_suojing:'索靖',
	ybsl_feimo:'飞墨',
	ybsl_feimo_info:'当你使用草花牌后，你可以摸一张牌。',
	ybsl_benzhan:'奔战',
	ybsl_benzhan_info:'转换技，阳：你可以将一张【杀】当伤害锦囊牌使用，或将一张伤害锦囊牌当【杀】使用；阴：你可以将一张【闪】当非伤害锦囊牌使用，或将一张非伤害锦囊牌当【闪】使用。每回合限X次，当你使用此技能时，此技能不转换，X为你已损体力值。',
	// ybsl_benzhan_info:'转换技，阳：你可以将一张【杀】当伤害锦囊牌使用，或将一张【闪】当非伤害锦囊牌使用；阴：你可以将一张伤害锦囊牌当【杀】使用，或将一张非伤害锦囊牌当【闪】使用。每回合限X次，当你使用此技能时，此技能不转换，X为你已损体力值。',
	ybsl_benzhan_append:'奔战没写呢。我不管你是怎么调出来的这个将，别用！！',

	ybsl_ybzs:'<font color=cyan>夜白杂设</font>',

	ybsl_hairi:'鹰原羽依里',
	hairi_shangshi:'伤逝',
	hairi_shangshi_info:'锁定技，当你的手牌数小于X时，你需将手牌摸至X张（X为你已损失的体力值）。',

	hairi_zheyi:'折翼',
	hairi_zheyi_info:'锁定技，游戏开始时，你废除所有装备栏。',
	hairi_zheyi_info_guozhan:'锁定技，当你明置此武将牌时，你废除所有装备栏。',
	hairi_zhongxia:'终夏',
	hairi_zhongxia_info:'使命技，当你需要使用一张基本牌时，你可以弃置所有手牌（至少一张），若你以此法弃置的牌花色各不相同，你视为使用之，若你以此法弃置的牌数等于你已损体力值或体力上限，你加一点体力上限（若未成功使用目标牌，此技能本回合不能再用）<br>成功：准备阶段，若你的体力上限不小于5，你选择一项：①获得技能“炒饭”，并恢复所有已废除装备栏。②将体力上限调整为1，并重置[终夏]。<br>失败：当你死亡时，你令一名其他角色获得[终夏]。',

	ybsl_youta:'成神阳太',

	ybsl_pujing:'普净',

	ybsl_reshidao:'示刀',
	ybsl_reshidao_info:'场上角色出牌阶段开始时，你可以展示一张手牌或指示装备区内一张牌，令其选择：①其本阶段使用此颜色牌无次数限制，②其本阶段可以将此颜色牌当杀使用且不可被闪避。若你选择的牌是装备牌，则其本阶段视为拥有此装备的技能。',
	ybsl_shidao:'示刀',
	ybsl_shidao_info:'其他角色出牌阶段开始时，你可以展示一张手牌或指示装备区内一张牌，令其选择：①其本阶段使用此颜色牌无次数限制，②其本阶段可以将此颜色牌当杀使用且不可被闪避。若你选择的牌是装备牌，则其本阶段视为拥有此装备的技能。',
	ybsl_duhun:'渡魂',
	ybsl_duhun_info:'当其他角色阵亡时，你可令其选择一名非击杀其的角色，令其选择的角色回复一点体力并摸三张牌。',
	// 普净
	// 群
	// 4
	// 示刀
	// 其他角色出牌阶段开始时，你可以展示一张手牌或指示装备区内一张牌，令其选择：①其本阶段使用此颜色牌无次数限制，②其本阶段可以将此颜色牌当杀使用且不可被闪避。若你选择的牌是装备牌，则其本阶段视为拥有此装备的技能。
	
	// 渡魂
	// 当其他角色阵亡时，你可令其选择一名非击杀其的角色，令其选择的角色回复一点体力并摸三张牌。
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


	//------------界篝
	kagari_ybzongsi:'纵丝',
	kagari_ybzongsi_info:'出牌阶段限一次，你可以选择一张不在游戏外的牌，然后将其置于牌堆/弃牌堆的顶部/底部或一名角色的对应区域内，<span class=yellowtext>并赋予该牌合理的视为牌名直到此牌离开该区域。</span>',

	kagari_ybzongsix:'纵丝',
	kagari_ybzongsix_info:'出牌阶段限一次，你可以选择一张不在游戏外的牌，然后将其置于牌堆/弃牌堆的顶部/底部或一名角色的对应区域内，<span class=yellowtext>并赋予该牌合理的视为牌名直到此牌离开该区域。</span>',

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
	xinfu_ybjingxie_info:'出牌阶段，你可以展示一张未强化过的【诸葛连弩】或标准包/军争包/SP包中的防具牌，<span class=yellowtext>赤兔，王追，闪电及其变种牌，洪水，火山，朱雀扇及其变种牌，倚天剑，青龙刀，铜雀，护心镜</span>，然后对其进行强化。当你处于濒死状态时，你可以重铸一张防具牌，然后将体力回复至1点。',
	// xinfu_ybjingxie_info:'出牌阶段，你可以展示一张未强化过的【诸葛连弩】或标准包/军争包/SP包中的防具牌，<span class=yellowtext>赤兔，王追，闪电及其变种牌，洪水，火山，朱雀扇及其变种牌，倚天剑，毒，青龙刀，铜雀，护心镜</span>，然后对其进行强化。当你处于濒死状态时，你可以重铸一张防具牌，然后将体力回复至1点。',]
	ybsl_kegu:'刻骨',
	ybsl_kegu_info:'每回合限一次，当你需要使用一张牌时，你可以仅展示之，视为使用此牌。',

	//----------------------装备及其他】

	ybsl_lmms:'<span style=\'color:#e7ff00\'>冷门民杀搬运</span>',
	'ybsl_sgsh':'<span class=yellowtext>上古神将</span>',
	//-----------------------上古神话专题---------------------------//
	sgsh_tiandi:'天帝',
	sgsh_shennong:'神农',
	sgsh_xuanyuan:'轩辕',
	sgsh_shaohao:'少昊',
	sgsh_zhuanxu:"没写完颛顼",
	sgsh_qinglong:'青龙',
	sgsh_baihu:'白虎',
	sgsh_zhuque:'朱雀',
	sgsh_xuanwu:'玄武',
	sgsh_qilin:'麒麟',
	'sgsh_dongwanggong':'东王公',
	'sgsh_xiwangmu':'西王母',
	'sgsh_huaxu':'华胥',
	sgsh_yaoji:'瑶姬',
	sgsh_hongjunlaozu:'鸿钧老祖',
	sgsh_gonggong:'共工',
	sgsh_zhurong:'祝融',
	sgsh_goumang:'句芒',
	sgsh_houtu:'后土',
	'sgsh_yuqiang':'禺强',
	sgsh_fuxi:'伏羲',
	sgsh_xiangliu:'相柳',
	sgsh_houyi:'后羿',
	'sgsh_dayu':'大禹',
	sgsh_kuafu:'夸父',
	sgsh_tubo:'土伯',
	sgsh_jingwei:'精卫',
	sgsh_qibo:'岐伯',
	'sgsh_taizichangqin':'太子长琴',
	sgsh_yeming:'噎鸣',
	'sgsh_yinglong':'应龙',
	'sgsh_nvba':'女魃',
	sgsh_chiyou:'蚩尤',
	sgsh_fenghou:'没写完风后',
	sgsh_jiutianxuannv:'没写完九天玄女',
	sgsh_luozu:'没写完螺祖',
	sgsh_cangjie:'没写完仓颉',
	sgsh_limu:'没写完力牧',
	sgsh_changxian:'没写完常先',
	sgsh_guiyuqu:'没写完鬼臾区',
	sgsh_shijiamouni:'没写完释迦牟尼',
	'sgsh_luohou':'罗睺',
	'sgsh_xingtian':'刑天',

	sgsh_zhuanxu_prefix:"没写完",
	sgsh_fuxi_prefix:"没写完",
	sgsh_xiangliu_prefix:"没写完",
	sgsh_houyi_prefix:"没写完",
	sgsh_kuafu_prefix:"没写完",
	sgsh_tubo_prefix:"没写完",
	sgsh_jingwei_prefix:"没写完",
	sgsh_qibo_prefix:"没写完",
	sgsh_yeming_prefix:"没写完",
	sgsh_chiyou_prefix:"没写完",
	sgsh_fenghou_prefix:"没写完",
	sgsh_jiutianxuannv_prefix:"没写完",
	sgsh_luozu_prefix:"没写完",
	sgsh_cangjie_prefix:"没写完",
	sgsh_limu_prefix:"没写完",
	sgsh_changxian_prefix:"没写完",
	sgsh_guiyuqu_prefix:"没写完",
	sgsh_shijiamouni_prefix:"没写完",

	// 'sgsh_tiandi','sgsh_shennong','sgsh_xuanyuan','sgsh_shaohao','sgsh_zhuanxu',
	// 'sgsh_qinglong','sgsh_baihu','sgsh_zhuque','sgsh_xuanwu','sgsh_qilin',
	// 'sgsh_dongwanggong','sgsh_xiwangmu','sgsh_huaxu','sgsh_yaoji','sgsh_hongjunlaozu',
	// 'sgsh_gonggong','sgsh_zhurong','sgsh_goumang','sgsh_houtu','sgsh_yuqiang',
	// 'sgsh_fuxi','sgsh_xiangliu','sgsh_houyi','sgsh_dayu','sgsh_kuafu',
	// 'sgsh_tubo','sgsh_jingwei','sgsh_qibo','sgsh_taizichangqin','sgsh_yeming',
	// 'sgsh_yinglong','sgsh_nvba','sgsh_chiyou','sgsh_fenghou','sgsh_jiutianxuannv',
	// 'sgsh_luozu','sgsh_cangjie','sgsh_limu','sgsh_changxian','sgsh_guiyuqu',
	// 'sgsh_shijiamouni','sgsh_luohou','sgsh_xingtian',
	//--------------------天帝
	sgsk_zhizun:'至尊',
	'sgsk_zhizun_info':'此技能仅提供一条语音。',
	'sgsk_zhizun_append':'技能原文：锁定技，当弃牌堆顶牌的点数为5或9时，你获得免疫；你使用点数为5或9的牌后，你摸一张牌。（免疫：无法成为技能或牌的目标）',
	sgsk_zhizunx:'至尊',
	'sgsk_zhizunx_info':'锁定技，当弃牌堆顶牌的点数为5或9时：防止你受到的伤害；你不能成为牌的目标。你使用点数为5或9的牌后，你摸一张牌。',
	//--------------------神农
	sgsk_wugu:'五谷',
	'sgsk_wugu_info':'出牌阶段限一次，你可以展示你的手牌，若如此做，其他角色依次选择一张获得之，若你以此法失去了所有手牌，你回复一点体力。',
	sgsk_changcao:'尝草',
	'sgsk_changcao_info':'出牌阶段，你可展示牌堆顶的一张牌并获得之，若为黑桃，你失去一点体力。',
	sgsk_changcaox:'尝草',
	'sgsk_changcaox_info':'出牌阶段限X次，X为你体力值且至多为5，你可展示牌堆顶的一张牌并获得之，若为黑桃，你失去一点体力。',
	//--------------------轩辕
	sgsk_xiude:'修德',
	'sgsk_xiude_info':'当你使用或打出一张基本牌后，你可进行一次判定，若结果为基本牌，你可以令一名角色摸一张牌。',
	sgsk_xiudex:'修德',
	'sgsk_xiudex_info':'当你使用或打出一张基本牌后，你可进行一次判定，若结果为基本牌，你可以与一名角色各摸一张牌。',
	sgsk_xiudey:'修德',
	'sgsk_xiudey_info':'当你使用或打出一张牌后，你可进行一次判定，若结果与本次使用的牌类型相同，你可以令一名角色摸一张牌。',
	sgsk_xiudexy:'修德',
	'sgsk_xiudexy_info':'当你使用或打出一张牌后，你可进行一次判定，若结果与本次使用的牌类型相同，你可以与一名角色各摸一张牌。',
	sgsk_wending:'问鼎',
	'sgsk_wending_info':'锁定技，若你的装备区放置了所有装备且有至少四种花色，你所在的阵营获得游戏胜利。',
	//--------------------少昊
	sgsk_qiongsang:'穷桑',
	'sgsk_qiongsang_info':'出牌阶段结束时，若你手牌数为0且至少使用了一张手牌，结束阶段开始时，你可以摸三张牌并回复一点体力。',
	// 'sgsk_qiongsang_info':'若你的出牌阶段使用完所有手牌，结束阶段开始时，你摸三张牌并回复一点体力',
	sgsk_qiongsangx:'穷桑',
	'sgsk_qiongsangx_info':'若你于出牌阶段内失去了最后一张手牌，结束阶段开始时，你可以摸三张牌并回复一点体力。',
	sgsk_qiongsangy:'穷桑',
	'sgsk_qiongsangy_info':'出牌阶段结束时，若你没有手牌，结束阶段开始时，你可以摸三张牌并回复一点体力。',
	//--------------------颛顼
	sgsk_chuangzhi:'创制',
	'sgsk_chuangzhi_info':'此技能仅提供一条语音。',
	// 'sgsk_chuangzhi_info':'若你装备了武器牌，你发动武器特效时，可以声明一个武器的特效；若你装备了防具牌，你发动防具特效时，可以声明一个防具的特效。',
	//--------------------青龙
	sgsk_longxiao:'龙啸',
	'sgsk_longxiao_info':'你可以将一张基本牌当任意基本牌使用或打出。',
	// 'sgsk_longxiao_info':'你可以将你的基本牌互换使用或打出。',
	//--------------------白虎
	sgsk_huwei:'虎威',
	'sgsk_huwei_info':'锁定技，你使用黑桃牌造成的伤害+1，你使用梅花牌的目标+1。',
	//--------------------朱雀
	sgsk_zhiyan:'炙炎',
	'sgsk_zhiyan_info':'原文已无从考证，此技能仅提供一条语音。',
	sgsk_zhiyanx:'炙炎',
	'sgsk_zhiyanx_info':'锁定技，你手牌中的【杀】均视为火【杀】，你手牌中的伤害锦囊牌均视为【火攻】（【万箭齐发】视为【流星火矢】），免疫你受到的火焰伤害，当你造成火焰伤害后，你摸一张牌。结束阶段，若你本回合未造成伤害，视为使用一张【流星火矢】。',
	sgsk_zhiyany:'炙炎',
	'sgsk_zhiyany_info':'锁定技，你手牌中的【杀】均视为火【杀】，你使用的锦囊牌对目标的结算改为【流星火矢】，免疫你受到的火焰伤害，当你造成火焰伤害后，你摸一张牌。',
	//--------------------玄武
	sgsk_xuanzhen:'玄震',
	'sgsk_xuanzhen_info':'准备阶段开始时，你可以弃置一个区域的所有牌，然后摸等量的牌。',
	//--------------------麒麟
	sgsk_decai:'德才',
	'sgsk_decai_info':'出牌阶段开始时，你可以令一名体力值少于你的角色回复一点体力或令一名手牌数少于你的角色摸一张牌。',
	sgsk_decaix:'德才',
	'sgsk_decaix_info':'出牌阶段开始时，你可以选组一名其他角色，若其体力值少于你，其回复一点体力；若其手牌数少于你，其摸一张牌。',
	//--------------------东王公
	sgsk_baigong:'拜公',
	'sgsk_baigong_info':'锁定技，你始终跳过摸牌阶段；其他角色的摸牌阶段结束时，你获得其一张牌（若触发技能前场上角色数不大于4人且对方牌数比你多，你再获得其一张牌。）。',
	sgsk_cangling:'苍灵',
	'sgsk_cangling_info':'出牌阶段结束时，若你未于本出牌阶段内使用牌指定过其他角色为目标，则你可以令一名任意角色增加一点体力上限，然后你回复一点体力。',
	//--------------------西王母
	sgsk_kunlun:'昆仑',
	'sgsk_kunlun_info':'锁定技，当你成为黑桃牌的目标时，你摸两张牌，然后若你未受伤，你弃两张牌。',
	sgsk_huasheng:'化生',
	'sgsk_huasheng_info':'出牌阶段结束时，你可以展示一张基本牌或普通锦囊牌，并视为使用。',//若你未于本出牌阶段内使用牌指定过其他角色为目标，
	//--------------------踏雷
	sgsk_talei:'踏雷',
	//'sgsk_talei_info':'一名角色的回合开始时，你可令其进行一次判定，若结果为黑桃2~9，则该角色受到3点无来源雷电伤害。',
	'sgsk_talei_info':'一名角色的回合开始时，你可令其进行一次闪电的判定。',
	sgsk_yunyuu:'孕育',
	'sgsk_yunyuu_info':'一名角色的红桃判定牌生效后，你可以摸一张牌。',
	//--------------------瑶姬
	sgsk_yunyu:'云雨',
	'sgsk_yunyu_info':'当你受到伤害后，你可以令一名男性角色回复一点体力；当一名男性角色受到伤害后，其可以令你回复一点体力。',
	// sgsk_yunyux:'云雨',
	// 'sgsk_yunyux_info':'当你受到伤害后，你可以令一名异性角色回复一点体力；当一名异性角色受到伤害后，其可以令你回复一点体力。',
	sgsk_mengzhen:'梦枕',
	'sgsk_mengzhen_info':'结束阶段开始时，你可以将武将牌翻面，然后摸X张牌，X为场上存活的角色数。',
	//--------------------鸿钧老祖
	sgsk_pudu:'普度',
	'sgsk_pudu_info':'你可以跳过摸牌阶段，令所有角色依次摸一张牌。',
	sgsk_xiansheng:'显圣',
	'sgsk_xiansheng_info':'出牌阶段限一次，你可以从手牌数最多的角色处获得任意张手牌直到其不为手牌数最多。',
	sgsk_xianshengx:'显圣',
	'sgsk_xianshengx_info':'出牌阶段限一次，你可以从手牌数最多的角色处依次获得手牌直到其不为手牌数最多或本次此效果执行了不少于5次。',
	//--------------------共工
	sgsk_taotian:'滔天',
	'sgsk_taotian_info':'出牌阶段限一次，你可以打出一张牌，若如此做，其他角色须依次打出一张不同花色的牌，否则你摸一张牌。',
	//--------------------祝融
	sgsk_fentian:'焚天',
	'sgsk_fentian_info':'出牌阶段限一次，你可以展示手牌，若均为红色，你可以对至多X名角色各造成1点火焰伤害，X为你的手牌数。',
	// 'sgsk_fentian_info':'出牌阶段限一次，你可以展示手牌，若均为红色，你可以分配X点火焰伤害，X为你的手牌数。',
	//--------------------句芒
	sgsk_fusang:'扶桑',
	'sgsk_fusang_info':'出牌阶段开始时，你可以将手牌补至场上手牌数最多。',
	sgsk_mangtong:'芒童',
	'sgsk_mangtong_info':'锁定技，每当你体力值增加时，你摸等量牌；每当你体力值减少时，你弃置等量牌。',
	sgsk_mangtongx:'芒童',
	'sgsk_mangtongx_info':'锁定技，每当你体力值变化时，你摸等量牌。',
	sgsk_mushen:'木神',
	'sgsk_mushen_info':'限定技，当你进入濒死状态时，你可以弃置所有牌，回复体力至X，并重置武将牌，X为其中梅花牌数。',
	sgsk_mushenx:'木神',
	'sgsk_mushenx_info':'限定技，当你进入濒死状态时，你可以弃置所有牌，回复体力至X，并重置武将牌，X为其中梅花牌数，若回复值溢出，则增加溢出值的体力上限。',
	//--------------------后土
	sgsk_yutu:'御土',
	'sgsk_yutu_info':'每当你受到一次伤害后，你可以摸X张牌，X为你空置区域的数量，至少为1。',
	// 'sgsk_yutu_info':'每当你受到一次伤害后，原文失考。',
	sgsk_yutux:'御土',
	'sgsk_yutux_info':'每当你受到一次伤害后，你可以将场上一张装备牌移入自己装备区，若替换原装备，你摸两张牌。',
	sgsk_shengtu:'生土',
	'sgsk_shengtu_info':'你可以将装备牌当【无中生有】使用。',
	//--------------------禺强
	sgsk_zhihai:'治海',
	'sgsk_zhihai_info':'一名其他角色的回合开始时，你可以将弃牌堆与牌堆交换。',
	sgsk_xuanming:'玄冥',
	'sgsk_xuanming_info':'每当一名角色的回合结束后，你可以将此回合进入弃牌堆的牌任意顺序放置在弃牌堆顶或弃牌堆底。',
	//--------------------伏羲
	sgsk_yuhan:'御寒',
	'sgsk_yuhan_info':'每当你受到一次伤害后，你可以弃置一张牌回复一点体力。',
	sgsk_jiabian:'驾辩',
	'sgsk_jiabian_info':'当你的判定牌最终生效前，你可以指定该判定牌的点数和花色。',
	//--------------------相柳
	sgsk_jiushou:'九首',
	'sgsk_jiushou_info':'锁定技，你濒死时，减一点体力上限，并回复体力至上限。',
	//--------------------后羿
	sgsk_sheri:'射日',
	'sgsk_sheri_info':'锁定技，你使用【杀】无视距离，若目标在你攻击范围内，此【杀】伤害+1，若目标在i攻击范围外，此【杀】不可被闪避。',
	//--------------------大禹
	sgsk_zhishui:'治水',
	'sgsk_zhishui_info':'出牌阶段限一次，你可以令至多X名角色弃置所有牌并摸等量的牌，X为你当前体力值。',
	//--------------------夸父
	sgsk_zhuiri:'追日',
	'sgsk_zhuiri_info':'锁定技，出牌阶段，你每使用一张牌，你与其他角色的距离-1直到回合结束，结束阶段开始时，若你与其他角色距离均为1，你所在的阵营获得游戏胜利。',
	sgsk_zhuirix:'追日',
	'sgsk_zhuirix_info':'锁定技，出牌阶段，你每使用一张牌，你与其他角色的距离-1直到回合结束，结束阶段开始时，若你与其他角色距离均为1，你摸X张牌，X为存活角色数。',
	//--------------------土伯
	sgsk_xuemu:'血拇',
	'sgsk_xuemu_info':'每当你受到一点伤害后，你可以弃置任意数量的红色牌，摸双倍的牌。',
	sgsk_jiuqu:'九屈',
	'sgsk_jiuqu_info':'锁定技，你的手牌上限为9。',
	//--------------------精卫
	sgsk_xianmu:'衔木',
	'sgsk_xianmu_info':'其他角色弃置牌后，你可以选择其中一张，获得之或置入装备区任意栏。出牌阶段开始时，你可以选择弃牌堆一张牌置入获得或置入任意装备栏。',
	sgsk_tianhai:'填海',//，否则你失去一点体力
	'sgsk_tianhai_info':'每回合限X次，你可以视为使用一张装备区内的一张非装备牌，X为你装备区内非装备牌数。',
	// 'sgsk_tianhai_info':'出牌阶段限一次，你可以弃置四张花色各不相同的牌，然后选择至多四名角色，同时弃置这些角色各一张牌。然后若选择了自己，你回复一点体力。',
	sgsk_xianmux:'衔木',
	'sgsk_xianmux_info':'当你失去一张装备区内的牌后，你可以移动场上一张牌。',
	sgsk_tianhaix:'填海',
	'sgsk_tianhaix_info':'锁定技，游戏开始时，你将每个空置装备栏随机装备一张装备牌。',
	//--------------------岐伯
	sgsk_suwen:'素问',
	'sgsk_suwen_info':'锁定技，你使用【桃】的效果改为回复体力至上限。',
	sgsk_lingjiu:'灵柩',
	'sgsk_lingjiu_info':'你可以将你的装备牌当【桃】使用。',
	//--------------------太子长琴
	sgsk_yuefeng:'乐风',
	'sgsk_yuefeng_info':'结束阶段开始时，你可以展示牌堆顶三张牌，然后选择获得每种花色的牌各一张。',
	sgsk_zhisheng:'止声',
	'sgsk_zhisheng_info':'其他角色于其出牌阶段内使用第X张牌后，你可以弃置一张牌令此阶段立即结束，X为你当前体力值。',
	//--------------------噎鸣
	sgsk_cunyin:'寸阴',
	'sgsk_cunyin_info':'每当你发动一次“三秋”后，你的攻击范围永久+1。',
	sgsk_sanqiu:'三秋',
	'sgsk_sanqiu_info':'若你于出牌阶段使用了基本牌，锦囊牌，装备牌各一张牌，原文失考',
	// 'sgsk_sanqiu_info':'若你于出牌阶段使用了基本牌，锦囊牌，装备牌各一张牌，你可以结束此阶段，然后摸三张牌并进行新的出牌阶段。',
	sgsk_sanqiux:'三秋',
	'sgsk_sanqiux_info':'若你于出牌阶段使用了基本牌，锦囊牌，装备牌各一张牌，你可于当前回合结束后摸三张牌，并进行一个额外的回合。',
	sgsk_sanqiuy:'三秋',
	'sgsk_sanqiuy_info':'当你于出牌阶段使用牌后，若你本阶段使用过了[基本牌，锦囊牌，装备牌]，你可以结束此阶段，然后摸三张牌并进行新的出牌阶段。',
	// 'sgsk_sanqiuy_info':'若你于出牌阶段使用了基本牌，锦囊牌，装备牌各一张牌，你可以结束此阶段，然后摸三张牌并进行新的出牌阶段。',
	//--------------------应龙
	sgsk_zongshui:'纵水',
	// 'sgsk_zongshui_info':'出牌阶段开始时，你可以弃置一张牌，令所有其他角色各自选择一项，弃置一张与此牌同花色的牌，或本回合不能响应你使用的牌。',
	'sgsk_zongshui_info':'出牌阶段限一次，你可以弃置任意张花色各不相同的牌，并选择任意名其他角色，弃置其一张牌。若你弃置的牌花色包含目标所弃花色，则本回合该角色不能使用或打出牌。',
	sgsk_zongshuit:'纵水',
	'sgsk_zongshuit_info':'出牌阶段开始时，你可以弃置一张牌，若如此做，其他角色于此回合不能使用或打出此颜色的牌，若如此做，结束阶段开始时，你摸X张牌，X为你本回合内造成的伤害值。',
	//--------------------女魃
	sgsk_buyu:'不雨',
	'sgsk_buyu_info':'其他角色的准备阶段，你可以与该角色拼点。若你赢，其跳过下个出牌阶段。',
	sgsk_hanshen:'旱神',
	'sgsk_hanshen_info':'锁定技，当一名场上角色失去最后的手牌时，你摸一张牌。',
	sgsk_hanshenx:'旱神',
	'sgsk_hanshenx_info':'锁定技，场上角色的阶段结束时，若其手牌数为零，你摸一张牌。',
	sgsk_buyu2:'不雨',
	'sgsk_buyu2_info':'受到旱神的诅咒，本回合跳过摸排阶段。',
	//--------------------蚩尤
	sgsk_zhanshen:'战神',
	'sgsk_zhanshen_info':'锁定技，出牌阶段，每当你使用一张牌后，你须分配一点伤害；回合结束时，若你未于此回合杀死至少一名角色，你失去一点体力。',
	sgsk_shizhan:'嗜战',
	'sgsk_shizhan_info':'锁定技，当你于出牌阶段使用牌时，若此牌点数为你本阶段使用牌的唯一最大/最小点数，你对一名体力值大于等于你/小于等于你的角色造成一点伤害；回合结束时，若你本回合没有杀死过角色，所有本回合受到过你伤害的其他角色依次对你造成一点伤害。',
	//--------------------风后
	sgsk_sinan:'司南',
	'sgsk_sinan_info':'锁定技，你的红桃判定牌生效后，你回复一点体力。',
	sgsk_shence:'神策',
	'sgsk_shence_info':'每当你造成或受到一次伤害后，你可以进行一次判定，若结果为锦囊牌，你令一名角色翻面并摸两张牌。',
	// 'sgsk_shence_info':'每当你造成或受到一次伤害后，你可以进行一次判定，若结果为锦囊牌，你可以使用之。',
	sgsk_shencex:'神策',
	'sgsk_shencex_info':'每当你造成或受到一次伤害后，你可以进行一次判定，若结果为锦囊牌，你可以获得或使用之（立即使用无距离限制）。',
	//--------------------九天玄女
	sgsk_taolue:'韬略',//，若为黑桃，其失去一点体力
	'sgsk_taolue_info':'结束阶段开始时，你可以令一名角色摸一张牌并展示之，若为红桃，其回复一点体力。',
	sgsk_xuanji:'玄机',
	'sgsk_xuanji_info':'你出牌阶段使用一张牌后，可以将此牌置于牌堆顶或牌堆底。',
	sgsk_xuanjix:'玄机',
	'sgsk_xuanjix_info':'你出牌阶段使用一张牌后，可以将此牌置于牌堆顶或牌堆底，每回合每种牌名限一次。',
	sgsk_xuanjiy:'玄机',
	'sgsk_xuanjiy_info':'每回合限一次，你使用一张牌后，可以将此牌置于牌堆顶或牌堆底。',
	sgsk_xuanjiz:'玄机',
	'sgsk_xuanjiz_info':'转换技，重置技，刷新列表为：[牌堆顶,牌堆底]，阳：你使用一张牌后，可以将此牌置于[从本技能列表中选一项]；阴，当你需要使用牌时，你可以声明该牌名，然后展示[从本技能列表中选一项]一张牌，若为你声明的牌名，视为你使用之，否则你获得之，且此技能本回合不能再用。每个回合开始时，此技能初始化。',
	//--------------------螺祖
	sgsk_sangcan:'桑蚕',
	'sgsk_sangcan_info':'每当你于弃牌阶段失去牌后，你摸一张牌。',
	sgsk_bianjuan:'编绢',
	'sgsk_bianjuan_info':'出牌阶段限一次，你可以弃置场上一张装备牌，原文不可考。',
	sgsk_bianjuanx:'编绢',
	'sgsk_bianjuanx_info':'出牌阶段限一次，你可以弃置场上一张装备牌，然后与失去装备的角色各摸一张牌。',
	//--------------------仓颉
	sgsk_zuoshu:'作书',
	'sgsk_zuoshu_info':'每名角色的回合限一次，你可以将一张黑色非基本牌当作当前回合未使用过的一张牌使用。',
	sgsk_zuoshux:'作书',
	'sgsk_zuoshux_info':'每名角色的回合限一次，你可以将一张黑色牌当作当前回合未使用过的一张牌使用。',
	//--------------------力牧
	sgsk_qianjun:'千钧',
	'sgsk_qianjun_info':'锁定技，你的红色【杀】伤害+1，黑色【杀】不可被闪避。',
	//--------------------常先
	sgsk_zhangu:'战鼓',
	'sgsk_zhangu_info':'任意角色的回合开始阶段，你可以弃掉一张红色牌，使该角色在此回合出牌阶段使用的【杀】或【决斗】造成的伤害+1。',
	sgsk_sanggu:'丧鼓',
	'sgsk_sanggu_info':'任意角色的回合开始阶段，你可以弃掉一张黑色牌，使该角色在此回合出牌阶段使用的【杀】或【决斗】造成的伤害-1。',
	//--------------------鬼臾区
	sgsk_zhanxing:'占星',
	'sgsk_zhanxing_info':'此技能仅提供一条语音。',
	// 'sgsk_zhanxing_info':'游戏开始时，你可以分发起始手牌。',
	// 'sgsk_zhanxing_info':'游戏开始时，你可以任意排序牌堆。',
	sgsk_wuxing:'五行',
	'sgsk_wuxing_info':'每当你使用或被使用一张牌时，你可以弃置两张点数和或差为5的牌令此牌不可被抵消或无效。若如此做，你摸五张牌且于此牌结算后令当前回合立即结束。',
	//--------------------释迦牟尼
	sgsk_dianhua:'点化',
	'sgsk_dianhua_info':'出牌阶段限一次，你可以将所有手牌交给一名其他角色，然后其选择一项：令一名角色回复一点体力或对一名角色造成一点伤害。',
	sgsk_wuwo:'无我',
	'sgsk_wuwo_info':'锁定技，若你没有手牌，你不能成为锦囊牌的目标。',
	//--------------------罗睺
	sgsk_yueshi:'月蚀',
	'sgsk_yueshi_info':'每当你使用一张牌后，你可以重铸一张牌。',
	//--------------------刑天
	sgsk_fuchou:'复仇',
	'sgsk_fuchou_info':'一名角色的回合结束后，若你此回合受到过其造成的伤害，你可以摸一张牌并视为对其使用一张【杀】。',

	
}