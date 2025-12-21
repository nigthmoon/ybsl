import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {translate}

const translate = {
	rewrite_goujiangdesidai: '篝酱的执念',
	rewrite_goujiangdesidai_info: '锁定技，若你未拥有技能〖纵丝〗（界），则你视为拥有技能〖纵丝〗（界）；若你拥有技能〖纵丝〗（界），则你将此技能改为「出牌阶段限两次」',
	rewrite_goujiangdesidai_skill: '纵丝',
	//---------------------技能翻译
	yingbian_lianDa_tag:'(连打)',
	yingbian_cunZhi_tag:'(寸止)',
	_yingbian_doubleBlow:'连打',
	_ybsl_yingbian:'连打',
	'ybsl_tianhuoduan_skill':'煅',
	'ybsl_tianhuoduan_skill_info':'煅',
	
	ybsl_lvchenqiang1_skill:'绿沉枪',
	ybsl_lvchenqiang1_skill_info:'若你有手牌，你可以把所有手牌当【杀】使用或打出。',
	ybsl_lvchenqiang2_skill:'绿沉枪',
	ybsl_lvchenqiang2_skill_info:'若你没有手牌，你可以摸一张牌，视为使用或打出了一张【闪】。',
	
	'rewrite_qinglong_skill':'锁龙·追杀',//3
	'rewrite_qinglong_skill_info':'当你使用的【杀】被目标角色使用的【闪】抵消时，你摸一张牌，然后可以对其使用一张【杀】（无距离限制）。',
	'rewrite_qinglong_fengyin':'锁龙·封印',//3
	'rewrite_qinglong_fengyin_info':'当你使用【杀】指定目标后，你可令其本回合非锁定技失效。',
	'rewrite_fulei_skill':'阴勾玉',
	'rewrite_fulei_skill_info':'出牌阶段结束时，你可以重铸一张手牌。若此牌为红色且你的体力值小于手牌数，你回复1点体力；若此牌不为红色且你手牌数小于体力值，你摸一张牌。',
	'rewrite_shandian_skill':'阳勾玉',
	'rewrite_shandian_skill_info':'结束阶段开始时，你可以进行一次判定，若结果为黑色，你令一名其他角色进入横置状态，并对其造成1点雷电伤害',
	'ybsl_tianleiyubi_skin':'勾玉之力',
	'ybsl_tianleiyubi_skin_info':'出牌阶段开始时，你可以令一名角色横置或解除横置。',
	'ybsl_tianleiyubi_skill':'天雷玉璧',
	'ybsl_tianleiyubi_skill_info':'场上角色准备阶段开始时，你可以令其进入横置状态并令其判定，若结果为黑桃2~9，则其受到3点无来源雷电伤害。',
	'rewrite_ybsl_tianleiyubi_skill':'天雷玉璧·觉醒',
	'rewrite_ybsl_tianleiyubi_skill_info':'每当你造成1点雷电伤害后，你可以回复1点体力或摸一张牌。',
	
	//--------------------------移植
	'sadouchengbing':'撒豆成兵',
	'sadouchengbing_info':'出牌阶段对自己使用，若你的势力为“神”，摸X张牌；否则将你手牌补至X；（X为你的体力上限且至多为5）',
	'yihuajiemu':'移花接木',
	'yihuajiemu_info':'出牌阶段对一名有牌的其他角色使用，令其使用一张【杀】，或交给你两张牌',
	'chiyanzhenhunqin':'赤焰镇魂琴',
	'chiyanzhenhunqin_info':'锁定技，你造成的伤害均视为具有火属性',
	'qicaishenlu':'七彩神鹿',
	'qicaishenlu_info':'锁定技，你计算与其他角色的距离时-1，当你造成属性伤害时，你令此伤害+1。',
	//--------------------------标签
	//'ybsl_flower_tag':'<span style=\'color:#edff00\'>花包</span>',
	//'ybsl_poison_tag':'<span style=\'color:#33ff00\'>毒包</span>',
	//'ybsl_balance_tag':'<span style=\'color:#2dff00\'>衡包</span>',
	//'ybsl_xue_tag':'<span style=\'color:#28e3ce\'>雪杀</span>',
	//'ybsl_xie_tag':'<span style=\'color:#e328b7\'>血杀</span>',
	//'ybsl_flower_tag':'花包',
	//'ybsl_poison_tag':'毒包',
	//'ybsl_balance_tag':'衡包',
	//'ybsl_xue_tag':'雪杀',
	//'ybsl_xie_tag':'血杀',//陈旧的过去式
	'YB_snowsha':'雪杀',
	'YB_bloodsha':'血杀',
	'_YB_snowsha':'雪杀',
	'_YB_snowsha_info':'当你造成雪属性伤害时，你可以令目标摸X张牌，然后其武将牌翻面（X为目标当前体力值且至多为5）。',
	'_YB_bloodsha':'血杀',
	'_YB_bloodsha_info':'锁定技，造成血属性伤害时，回复等同伤害值的体力值。',
	ybsl_flower:'花朵',
	//--------------------------基本
	'ybsl_meihua':'梅',
	'ybsl_meihua_info':'出牌阶段，对至多两名角色使用，目标重置武将牌。',
	'ybsl_meihua_append':'梅花的梅。有毒慎食！',
	'ybsl_lanhua':'兰',
	'ybsl_lanhua_info':'出牌阶段，对至多两名角色使用，目标增加1点体力上限。',
	'ybsl_lanhua_append':'兰花的兰。有毒慎食！',
	'ybsl_zhuzi':'竹',
	'ybsl_zhuzi_info':'出牌阶段，对至多两名角色使用，目标获得1点护甲。',
	'ybsl_zhuzi_append':'竹花的竹（好像哪里不对）。有毒慎食！',
	'ybsl_juhua':'菊',
	'ybsl_juhua_info':'出牌阶段，对至多两名角色使用，目标回复1点体力。',
	'ybsl_juhua_append':'菊华的菊。有毒慎食！',
	'rewrite_du':'毒箭',
	'rewrite_du_info':'出牌阶段，对一名其他角色使用，其须使用一张闪响应，否则你对其造成1点伤害，然后令其获得一张【毒】。',
	'ybsl_tianhuoduan':'煅',
	// 'ybsl_tianhuoduan_bg':'煅',
	'ybsl_tianhuoduan_info':'出牌阶段，你可以升级手中或装备区内的可升级装备。可重铸。',
	//'ybsl_tianhuoduan_append':'目前可强化的有八卦阵，白银狮子，诸葛连弩，藤甲，烂银甲，仁王盾，赤兔，王追等。',
	//--------------------------锦囊
	'ybsl_dafeng':'大风',
	'ybsl_dafeng_bg':'风',
	'ybsl_dafeng_info':'出牌阶段，对一名其他角色使用，其需弃置一张基本牌，否则受到你造成的1点伤害。',
	'ybsl_luolei':'落雷',
	'ybsl_luolei_bg':'雷',
	'ybsl_luolei_info':'出牌阶段，对一名其他角色使用，其需弃置一张装备牌，否则受到你造成的1点雷属性伤害。',
	'ybsl_duboom':'毒爆',
	'ybsl_duboom_info':'出牌阶段，对一名有手牌的其他角色使用，其展示手牌，若有【毒】则弃置所有【毒】，否则弃置一张任意手牌。可重铸。',
	'ybsl_wenben':'问策',
	'ybsl_wenben_info':'待定',
	ybsl_hsbwp:'火烧博望坡',
	ybsl_hsbwp_info:'出牌阶段，对一名其他角色使用，其需使用一张与此牌同花色的手牌，否则(若为应变双项，则改为然后)受到你造成的1点火焰伤害。',
	'ybsl_meteor':'流星火矢',//万箭齐发的进阶版
	'ybsl_meteor_bg':'星',
	'ybsl_meteor_info':'出牌阶段，对所有其他角色使用。每名目标角色需打出一张【闪】，否则受到1点火属性伤害。',
	'ybsl_disarm':'铁骑兵锋',//南蛮入侵的进阶版
	'ybsl_disarm_bg':'锋',
	'ybsl_disarm_info':'出牌阶段，对所有其他角色使用。每名目标角色需打出一张【杀】，然后弃置一张手牌（无牌不弃），否则受到1点伤害。',
	'ybsl_chains':'铁索拦江',//铁索连环的进阶版
	'ybsl_chains_bg':'拦',
	'ybsl_chains_info':'出牌阶段，将此牌视为【铁索连环】使用，然后令所有未处于横置状态的角色使用牌只能指定自己和已横置角色为目标，直到场上所有角色均解除横置状态。可重铸。',

	'ybsl_diedpk':'生死决斗',//决斗的进阶版
	'ybsl_diedpk_bg':'珏',
	'ybsl_diedpk_info':'出牌阶段，将此牌视为【决斗】使用，此【决斗】造成伤害时，伤害值+X（X为双方因此打出的【杀】的总数，且至多为8）。',
	// ybsl_diedpk_skill:'生死决斗',
	// ybsl_diedpk_skill_info:'出牌阶段，将此牌视为【决斗】使用，此【决斗】造成伤害时，伤害值+X（X为双方因此打出的【杀】的总数，且至多为8）。',
	'ybsl_yananzhendu':'宴安鸩毒',
	'ybsl_yananzhendu_info':'出牌阶段，对所有角色使用，目标需弃置一张【桃】，否则获得一张【毒】。可重铸',
	'ybsl_qingmeizhujiu':'青梅煮酒',
	'ybsl_qingmeizhujiu_bg':'煮',
	'ybsl_qingmeizhujiu_info':'待定',
	'ybsl_anduchencang':'暗度陈仓',
	'ybsl_anduchencang_bg':'度',
	'ybsl_anduchencang_info':'其他角色的回合开始时，你可以使用之。你摸两张牌，然后你执行一个额外的出牌阶段。',
	ybsl_anduchencang_skill:'暗度陈仓',
	ybsl_anduchencang_skill2:'暗度陈仓',
	'ybsl_zhijizhibi':'知己知彼',
	'ybsl_zhijizhibi_info_identity':'出牌阶段对一名其他角色使用，观看其手牌或身份，可重铸。',
	'ybsl_zhijizhibi_info_guozhan':'出牌阶段对一名其他角色使用，观看其手牌或暗置武将，可重铸。',
	'ybsl_zhijizhibi_info':'出牌阶段对一名其他角色使用，观看其手牌，可重铸。',
	'ybsl_qisihuisheng':'起死回生',
	'ybsl_qisihuisheng_bg':'复',
	'ybsl_qisihuisheng_info':'出牌阶段对自己使用或，当一名角色进入濒死时你可以对其使用：令其回复体力至3点，然后摸3-X张牌（X为回复的体力值）。',
	ybsl_qisihuisheng_append:'源自霸天投稿。',
	llfx_shanfengdianhuo:'煽风点火',
	llfx_shanfengdianhuo_info:'出牌阶段，对一名其他角色使用，视为该角色对其攻击范围内所有角色使用一张火【杀】<br>注：开启自动确认时，可以拖拽卡牌至目标查看被火【杀】对象',
	llfx_shanfengdianhuo_append:'“倒不是怕有人煽风点火。”<br><span style=\'text-align: right;\'>——沙汀</span>',
	'ybsl_tututu':'万钧神弩',
	'ybsl_tututu_bg':'钧',
	'ybsl_tututu_info':'出牌阶段，对一名其他角色使用，你展示牌堆顶X张牌，依次对其使用其中所有的【杀】，然后将剩余的牌置入弃牌堆。（X为存活角色数且至少为4，至多为10）。',
	'ybsl_qiuxianruoke':'求贤若渴',
	'ybsl_qiuxianruoke_bg':'募',
	'ybsl_qiuxianruoke_info':'出牌阶段，对自己使用，你声明一个花色及类别，然后亮出牌堆顶三张牌，你获得与你声明相符的牌。若有两项皆满足的牌，你回复1点体力。',
	'ybsl_qiuxianruoke_append':'山不厌高，海不厌深，周公吐哺，天下归心。<br>——曹操《短歌行》，',
	'ybsl_mixianshenshu':'弥仙神术',//达成
	'ybsl_mixianshenshu_info':'出牌阶段，对一名任意角色使用，改变目标的势力。可重铸。',
	// 'ybsl_mixianshenshu_info':'出牌阶段，对一名任意角色使用，改变目标的势力并令其摸一张牌。可重铸。',
	'ybsl_tongguiyujin':'同归于尽',//达成
	'ybsl_tongguiyujin_bg':'尽',//达成
	'ybsl_tongguiyujin_info':'出牌阶段，对一名其他角色使用，（若你的体力值大于1，则先失去1点体力）对目标造成X点伤害，X为你已损体力值且至少为一。',
	'ybsl_kaicangzhenliang':'开仓赈粮',//达成
	'ybsl_kaicangzhenliang_bg':'赈',//达成
	'ybsl_kaicangzhenliang_info':'出牌阶段，对所有角色使用。（选择目标后）你从牌堆顶亮出等同于目标数量的牌，你为每名目标角色分发这些牌中（剩余的）的任意一张。',
	'ybsl_youfuwoxiang':'有福我享',//未达成
	'ybsl_youfuwoxiang_bg':'享',//未达成
	'ybsl_youfuwoxiang_info':'出牌阶段，对所有角色使用。（选择目标后）你从牌堆顶亮出等同于目标数量的牌，并用任意手牌替换之。然后每名目标角色依次选择这些牌中（剩余的）的任意一张。',
	//------------------------延时锦囊
	'ybsl_wenii':'瘟疫',
	'ybsl_wenii_bg':'疫',
	'ybsl_wenii_info':'出牌阶段，对任意角色使用。判定时，若不为方块，则获得一张【毒】，然后移给下家，若为方块，则移给下家。',
	'ybsl_huadiweilao':'画地为牢',
	'ybsl_huadiweilao_bg':'牢',
	'ybsl_huadiweilao_info':'出牌阶段，对一名其他角色使用。判定时，若结果为黑色，则该角色本回合使用牌不能指定其他角色为目标。',
	//------------------------装备武器
	'ybsl_baihong':'白虹剑',//2（吴六剑之一）
	'ybsl_baihong_info':'锁定技，出牌阶段，若你的手牌数不大于体力值，则你使用牌无次数限制。',
	ybsl_baihong_append:'据说，曾有人同时拿着六把兵器。',
	'ybsl_zidian':'紫电剑',//2（吴六剑之一）
	'ybsl_zidian_info':'当你使用一张普通【杀】时，你可以将其转化为雷【杀】；出牌阶段，你可以重铸一张【杀】，若如此做，本回合你使用的下一张【杀】伤害+1（可叠加）。',
	ybsl_zidian_append:'据说，曾有人同时拿着六把兵器。',
	ybsl_zidian1:'紫电剑',
	ybsl_zidian1_info:'当你声明使用一张普通【杀】时，你可以将其转化为雷【杀】',
	ybsl_zidian2:'紫电剑',
	ybsl_zidian2_info:'出牌阶段，你可以重铸一张【杀】，若如此做，本回合你使用的下一张【杀】伤害+1（可叠加）',
	'ybsl_bixie':'辟邪剑',//2（吴六剑之一）
	'ybsl_bixie_info':'当你使用【杀】指定目标后，你可以弃置其一张牌。',
	ybsl_bixie_append:'据说，曾有人同时拿着六把兵器。',
	'ybsl_liuxing':'流星剑',//2（吴六剑之一）
	'ybsl_liuxing_info':'锁定技，摸牌阶段你额外摸一张牌，出牌阶段用【杀】次数+1，手牌上限+1。',
	ybsl_liuxing_append:'据说，曾有人同时拿着六把兵器。',
	'ybsl_qingming':'青冥剑',//3（吴六剑之一）
	'ybsl_qingming_info':'当你于出牌阶段内一次性失去了两张及以上的手牌后，你可以弃置一名其他角色等量的牌，或对一名其他角色造成X点伤害（X为本次弃牌中的花色数）。',
	ybsl_qingming_append:'据说，曾有人同时拿着六把兵器。',
	'ybsl_baili':'百里剑',//2（吴六剑之一）
	'ybsl_baili_info':'出牌阶段限一次，你可以将一张手牌交给其他角色；在你的回合，当一名其他角色获得你的牌时，你可以对其造成1点伤害。',
	ybsl_baili_append:'据说，曾有人同时拿着六把兵器。',
	ybsl_baili_give:'百里剑',
	ybsl_baili_give_info:'出牌阶段限一次，你可以将一张手牌交给其他角色',
	ybsl_baili_skill:'百里剑',
	ybsl_baili_skill_info:'在你的回合，当一名其他角色获得你的牌时，你可以对其造成1点伤害。',
	
	'ybsl_qixingdao':'七星刀',//2
	'ybsl_qixingdao_info':'锁定技，①当你使用普通【杀】造成伤害时②当你对体力值大于你的角色造成伤害时，以上每满足一条，此伤害便+1。',
	'ybsl_piaoxueruyi':'飘雪神符',//达成
	'ybsl_piaoxueruyi_bg':'雪',
	'ybsl_piaoxueruyi_info':'当你使用【杀】造成伤害时，你可以令目标摸X张牌，然后其武将牌翻面（X为目标当前体力值且至多为5）。',
	'rewrite_qinglong':'锁龙偃月刀',//3
	'rewrite_qinglong_info':'当你使用【杀】指定目标后，你可令其本回合非锁定技失效；当你使用的【杀】被目标角色使用的【闪】抵消时，你摸一张牌，然后可以对其使用一张【杀】（无距离限制）。',
	'rewrite_qinglong_info_guozhan':'当你使用【杀】指定目标后，你可令其本回合非锁定技失效；锁定技，当你使用【杀】指定目标后，所有目标角色不能明置武将牌直到此【杀】结算完毕为止。',
	'rewrite_zhuque':'北斗七星扇',//4
	'rewrite_zhuque_bg':'斗',
	'rewrite_zhuque_info':'当你使用伤害类基本牌或普通锦囊牌时，你可以为其重新指定花色和伤害属性（神属性除外）。',
	rewrite_fangtian:'方天锁链鞭',//4
	rewrite_fangtian_bg:'鞭',
	rewrite_fangtian_info:'锁定技，当你使用【杀】指定目标后，若其未横置，则其横置，否则你观看其手牌。你使用的【杀】若是你最后的手牌，你可以额外选择至多两个目标。',
	rewrite_fangtian_info_guozhan:'锁定技，当你使用【杀】指定目标后，若其未横置，则其横置，否则你观看其手牌。你使用【杀】可以指定任意名角色为目标（不能包含势力相同的角色），若任意一名目标角色使用【闪】抵消了此【杀】，则此【杀】对剩余的目标角色无效。',
	rewrite_fangtian_append:'什么J8缝合怪',
	'ybsl_lvchenqiang':'绿沉枪',//3
	'ybsl_lvchenqiang_info':'若你有手牌，你可以把所有手牌当【杀】使用或打出；若你没有手牌，你可以摸一张牌，视为使用或打出了一张【闪】。',
	'ybsl_fuxizhenhunqin':'伏羲镇魂琴',//4
	'ybsl_fuxizhenhunqin_bg':'琴',//4
	'ybsl_fuxizhenhunqin_info':'当你因弃置而失去手牌时，你可以选择至多等量名角色，视为你对这些角色依次造成由这些牌造成的伤害。',//再改版
	// 'ybsl_fuxizhenhunqin_info':'当你因弃置而失去手牌时，你为这些牌分配火焰伤害给其他角色，视为由分配的牌对其造成伤害。',//改版
	// 'ybsl_fuxizhenhunqin_info':'当你使用杀时，你可以为此杀附着所有属性。',//依托于本体新版本的设定
	// 'ybsl_fuxizhenhunqin_info':'锁定技，当你造成属性伤害后，你弃置受伤角色的一张手牌，若此牌为基本牌，则你将此牌当做火杀对其攻击范围内所有角色使用。',
	// 'ybsl_fuxizhenhunqin_info':'当你因弃置而失去牌时，你可以将这些牌当做火杀对当前回合角色使用。',
	// 'ybsl_fuxizhenhunqin_info':'每回合限一次，当你的手牌因弃置而置入弃牌堆时，你可以将这些牌当作火杀使用（不计入次数且无次数限制）',
	'rewrite_yitianjian':'七星龙渊剑',//3
	'rewrite_yitianjian_bg':'渊',
	'rewrite_yitianjian_info':'当你造成伤害后，你可以弃置一张手牌，然后回复1点体力',
	// 'ybsl_feijingsanjian':'飞景三剑',//2
	// 'ybsl_feijingsanjian_bg':'景',
	// 'ybsl_feijingsanjian_info':'略',
	'ybsl_bainiaochaofeng':'百鸟朝凤枪',//3
	'ybsl_bainiaochaofeng_bg':'凤',//3
	'ybsl_bainiaochaofeng_info':'当你使用牌指定其他角色为目标后时，你可令目标不能使用实体牌包含与此牌同颜色的牌直到此牌结算完成。',
	// 'ybsl_bainiaochaofeng_info':'当你使用牌时，你可令此牌不能被相同颜色牌响应。没写好，别私自加！',
	ybsl_bainiaochaofeng_append:'源自霸天投稿，夜白稍加修改。',
	// ybsl_bainiaochaofeng_append:'没写好，别私自加！',
	//--------------------------防具
	rewrite_huxinjing:'白虎镜',
	rewrite_huxinjing2:'白虎镜',
	rewrite_huxinjing_bg:'虎',
	rewrite_huxinjing_info:'此牌可对其他角色使用。当你受到伤害时，若此伤害大于1或不小于你当前体力值，你可以防止此伤害，然后：①你下次造成的伤害+1；②若你下次受到伤害时处于①状态下，则移除①效果，并将此牌置入弃牌堆。',
	rewrite_huxinjing_info_guozhan:'当你受到伤害时，若伤害值大于等于你的体力值，你可以防止此伤害，然后：①你下次造成的伤害+1；②若你下次受到伤害时处于①状态下，则移除①效果，并将此牌置入弃牌堆。',
	'ybsl_qinglinkui':'青鳞盔',
	'ybsl_qinglinkui_bg':'鳞',
	'ybsl_qinglinkui_info':'锁定技，你的回合外，当你受到伤害时，若对方在你攻击范围外，则此伤害-1。',
	'ybsl_shuijingpao':'水镜袍',
	'ybsl_shuijingpao_bg':'镜',
	'ybsl_shuijingpao_info':'锁定技，当你成为锦囊牌的目标时，你摸X张牌（X为此锦囊的目标数）。',
	'ybsl_nodouble':'无双铠',
	'ybsl_nodouble_bg':'双',
	'ybsl_nodouble_info':'每当你成为【杀】或【决斗】的目标时，你可以摸一张牌；若你拥有〖无双〗，则你使用【杀】或【决斗】时也可以摸牌。',
	'ybsl_guoshishengpao':'国士圣袍',
	'ybsl_guoshishengpao_bg':'白',
	'ybsl_guoshishengpao_info':'锁定技，红桃【杀】对你无效，手牌上限+2。',
	// 'ybsl_jinyin':'金银褥铠',
	// 'ybsl_jinyin_bg':'褥',
	// 'ybsl_jinyin_info':'待定。',
	// 'ybsl_fengshem':'风神盾',
	// 'ybsl_fengshen_info':'待定。',
	//--------------------------坐骑
	'ybsl_wusun':'乌孙',//达成
	'ybsl_wusun_info':'锁定技，其他角色计算与你的距离+1。',
	'ybsl_xiji':'西极',//达成
	'ybsl_xiji_info':'锁定技，你计算与其他角色的距离-1。',
	'ybsl_wangzhui':'王追',//达成
	'ybsl_wangzhui_bg':'骓',
	'ybsl_wangzhui_info':'锁定技，其他角色计算与你的距离+1。',
	'ybsl_wangzhui_append':'据说是张飞的座驾，也许有什么潜力有待开发。',
	'ybsl_benlei':'奔雷',//达成
	'ybsl_benlei_info':'锁定技，你计算与其他角色的距离-1。',
	'ybsl_zhaoyeyushi':'照夜玉狮',
	'ybsl_zhaoyeyushi_info':'锁定技，其他角色计算与你的距离+2。',
	'ybsl_yulanbailongju':'玉兰白龙驹',
	'ybsl_yulanbailongju_bg':'驹',
	'ybsl_yulanbailongju_info':'锁定技，你计算与其他角色的距离-2。',
	'chitu_append':'三国著名坐骑，也许有一天会变得激昂。',
	'rewrite_chitu':'烈焰赤兔',
	'rewrite_chitu_bg':'焰',
	'rewrite_chitu_append':'锻造马匹真的生草。',
	'rewrite_chitu_info':'锁定技，你计算与其他角色的距离-2，其他角色计算与你的距离+1。<br>每当你使用（指定目标后）或被使用（成为目标后）一张【决斗】或红色的【杀】时，你可以摸一张牌。',
	'rewrite_ybsl_wangzhui':'乌云踏雪',
	'rewrite_ybsl_wangzhui_bg':'云',
	'rewrite_ybsl_wangzhui_append':'锻造马匹真的生草。',
	'rewrite_ybsl_wangzhui_info':'锁定技，你计算与其他角色的距离-1，其他角色计算与你的距离+2。<br>每回合限一次，当你使用【杀】或成为【杀】的目标时，若此【杀】存在对应的实体牌，你可以获得之。',
	'ybsl_milu':'圣诞麋鹿',
	'ybsl_milu_bg':'麋',
	// 'ybsl_milu_info':'锁定技，你计算与其他角色的距离-1。锁定技，当你即将失去装备区的牌时，改为收回手牌。',//没写成
	'ybsl_milu_info':'锁定技，你计算与其他角色的距离-1。出牌阶段限一次，你可交给一名其他角色一张手牌，然后该角色选择回复1点体力或摸一张牌',
	'ybsl_yangtuo':'神兽羊驼',
	'ybsl_yangtuo_bg':'羊',
	'ybsl_yangtuo_info':'锁定技，其他角色计算与你的距离+1。当你成为【杀】的目标并结算完后，你可以将一张与该【杀】颜色不同的牌当【杀】对【杀】的使用者使用。',
	//--------------------------宝物
	'ybsl_fengqiuhuang':'凤求凰',
	'ybsl_fengqiuhuang_bg':'凰',
	'ybsl_fengqiuhuang_info':'锁定技，当你使用锦囊牌或基本牌后，令此牌额外结算一次。',
	'ybsl_taoyao':'桃之夭夭',
	'ybsl_taoyao_info':'你可以将一张红桃牌当【桃】使用。',
	'ybsl_zhiziyugui':'之子于归',
	'ybsl_zhiziyugui_bg':'归',
	// 'ybsl_zhiziyugui_info':'出牌阶段限一次，你可以选择一名异性角色，然后你弃置一张牌或将一张装备牌置入目标角色装备区，然后你选择①你们中一人回复1点体力，另一人摸一张牌；②再弃一张牌，令其中一方执行未执行的一项；③再弃一张牌，令另一方执行未执行的一项',
	'ybsl_zhiziyugui_info':'当此牌进入你装备区时，你回复1点体力；当此牌离开你装备区时，你摸两张牌。',
	'ybsl_toushiche':'投石车',
	'ybsl_toushiche_bg':'石',
	'ybsl_toushiche_info':'出牌阶段限一次，你可以将一张手牌放在【车】下称为“石”；每有一张“石”，攻击范围便+1；你可以将“石”当做不计入次数的【杀】使用或打出。',
	'rewrite_fulei':'阴勾玉',
	'rewrite_fulei_info':'出牌阶段开始时，你可以令一名角色横置或解除横置。<br>出牌阶段结束时，你可以重铸一张手牌。若此牌为红色且你的体力值小于手牌数，你回复1点体力；若此牌不为红色且你手牌数小于体力值，你摸一张牌。',
	'rewrite_shandian':'阳勾玉',
	'rewrite_shandian_info':'出牌阶段开始时，你可以令一名角色横置或解除横置。<br>结束阶段开始时，你可以进行一次判定，若结果为黑色，你令一名其他角色进入横置状态，并对其造成1点雷电伤害。',
	'ybsl_tianleiyubi':'天雷玉璧',
	'ybsl_tianleiyubi_bg':'雷',
	'ybsl_tianleiyubi_info':'出牌阶段开始时，你可以令一名角色横置或解除横置。<br>出牌阶段结束时，你可以重铸一张手牌。若此牌为红色且你的体力值小于手牌数，你回复1点体力；若此牌不为红色且你手牌数小于体力值，你摸一张牌。<br>结束阶段开始时，你可以进行一次判定，若结果为黑色，你令一名其他角色进入横置状态，并对其造成1点雷电伤害。<br>场上角色准备阶段开始时，你可以令其令其进入横置状态并令其判定，若结果为黑桃2~9，则其受到3点无来源雷电伤害。',
	'rewrite_ybsl_tianleiyubi':'神雷玉璧',
	'rewrite_ybsl_tianleiyubi_bg':'雷',
	'rewrite_ybsl_tianleiyubi_info':'出牌阶段开始时，你可以令一名角色横置或解除横置。<br>出牌阶段结束时，你可以重铸一张手牌。若此牌为红色且你的体力值小于手牌数，你回复1点体力；若此牌不为红色且你手牌数小于体力值，你摸一张牌。<br>结束阶段开始时，你可以进行一次判定，若结果为黑色，你令一名其他角色进入横置状态，并对其造成1点雷电伤害。<br>场上角色准备阶段开始时，你可以令其令其进入横置状态并令其判定，若结果为黑桃2~9，则其受到3点无来源雷电伤害。<br>每当你造成1点雷电伤害后，你可以回复1点体力或摸一张牌。',
	rewrite_tongque:'界铜雀',
	rewrite_tongque_info:'锁定技，你使用的带有【应变】效果的牌无视条件直接生效。',
	//-----------------------可进化装备
	// 'ybsl_baiyushan':'白羽扇',
	// 'ybsl_baiyushan_bg':'羽',
	// 'ybsl_baiyushan_info':'锁定技，你使用本回合的第一张【杀】不计入次数限制，然后你获得每个目标各一张牌。锁定技，当你使用【杀】时，若目标与你的距离大于1，每超过1，此伤害便-1.',
	// 'rewrite_ybsl_baiyushan':'清风扇',
	// 'rewrite_ybsl_baiyushan_info':'锁定技，当你使用本回合第一张【杀】不计入次数限制，然后你你获得每个目标各一张牌。',
	// 'ybsl_jiangjunpifeng':'将军披风',
	// 'ybsl_jiangjunpifeng_info':'锁定技，当你受到伤害时，取消该次伤害，然后进行一次判定，若为黑色，则弃置此牌。',
	// 'rewrite_ybsl_jiangjunpifeng':'霸者披风',
	// 'rewrite_ybsl_jiangjunpifeng_info':'锁定技，当你受到伤害时，取消该次伤害，然后进行一次判定，若为黑桃，则弃置此牌。',
	// 'ybsl_liujinguan':'鎏金冠',
	// 'ybsl_liujinguan_info':'锁定技，每当你使用一张锦囊牌结算完成时，本回合你的手牌上限便+1。',
	// 'rewrite_ybsl_liujinguan':'集智冠',
	// 'rewrite_ybsl_liujinguan_bg':'智',
	// 'rewrite_ybsl_liujinguan_info':'锁定技，每当你使用一张锦囊牌结算完成时，本回合你的手牌上限便+1；你的回合外，若你的手牌数大于体力值，此装备牌无法被其他角色获得或弃置。',
	//--------------------------衍生
	// 'ybsl_cu':'醋',//达成
	// 'ybsl_cu_info':'出牌阶段，对区域里有牌的一名其他角色使用。你弃置其区域里的一张牌。',
	// 'ybsl_lumingqianzhuan':'鹿鸣千转',//达成
	// 'ybsl_lumingqianzhuan_bg':'鸣',
	// 'ybsl_lumingqianzhuan_info':'出牌阶段，对一名其他角色使用。你将目标角色标记为“喜啼”或“悲鸣”（对其他角色不可见）。然后目标角色可以打出一张【杀】或【闪】。若其是“喜啼”且未打出【杀】，则你对其造成1点伤害；若其是“悲鸣”且未打出【闪】，则你获得其一张牌。',
}