import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {translate}

const translate = {
	North_icedamage:'冰冻',//8
	North_icedamage_info:'锁定技，你所有杀视为冰杀，你造成的伤害均视为冰冻伤害，免疫冰冻伤害。',
	North_huimiex:'毁灭',//10
	North_huimiex_info:'每回合限一次，当你使用【杀】或【决斗】指定一个目标后，你可令【杀】或【决斗】伤害加一，并摸两张牌；当你杀死一名角色后，你可再发动一次技能［毁灭］。',
	
	ybsl_windmoon:'风灵月影',

	order_xzhq:'沧海遗珠',
	North_yanghuiyu:'神羊徽瑜',//50
	North_yanghuiyu_prefix:'神',
	North_duyu:'神杜预',//50
	North_duyu_prefix:'神',
	North_sunshangxiang:'神孙尚香',//15
	North_sunshangxiang_prefix:'神',
	Northxx_sunshangxiang:'神孙尚香',//免
	Northxx_sunshangxiang_prefix:'神',
	North_zhugeliang:'神诸葛亮',//60
	North_zhugeliang_prefix:'神',
	Northxx_zhugeliang:'神诸葛亮',//免
	Northxx_zhugeliang_prefix:'神',
	North_lidian:'神李典',//30
	North_lidian_prefix:'神',
	North_diaochan:'凤仪貂蝉',
	North_diaochan_ab:'神貂蝉',
	North_diaochan_prefix:'神',
	North_beimihu:'神卑弥呼',
	North_beimihu_prefix:'神',
	North_bulianshi:'神步练师',
	North_bulianshi_prefix:'神',
	North_caojinyu:'金乡公主',
	North_caojinyu_ab:'神曹金玉',
	North_caojinyu_prefix:'神',
	North_huangyueying:'神黄月英',
	North_huangyueying_prefix:'神',
	North_caoxiancaohua:'神曹宪&曹华',//40
	North_caoxiancaohua_prefix:'神',
	North_sunhanhua:'神孙寒华',
	North_sunhanhua_prefix:'神',
	North_guozhao:'神郭照',//20
	North_guozhao_prefix:'神',
	North_zhaoxiang:'神赵襄',//20
	North_zhaoxiang_prefix:'神',
	North_liufeng:'神刘封',//20
	North_liufeng_prefix:'神',
	
	order_ntr:'金主二号',
	North_shamoke:'神沙摩柯',//ntr
	North_shamoke_prefix:'神',

	order_shw:'金主三号',
	ybsl_mystery1:'神秘武將一',//30

	order_JJ:'金主四号',
	'North_zhangwenwen':'张雯雯',//疑似被人抢单。然后技能描述我也没备注。毁灭吧

	order_wlyz:'金主五号',//卧龙宇宙

	//他全部武将都是写在自己扩展里的，于是不在此搬运……
	//（其实是我弄丢了他的包，等他下次找我时顺便备份吧，希望他本人别魔改太多
	//全是诸葛亮，于是我称其为卧龙宇宙
	//除了我之外，其余武将均为dz打头，标志性的顶格代码

	order_ljg:'金主六号',//
	//晋司马懿，15
	
	order_ei:'金主七号',//
	//PC，10

	order_nobody:'金主八号',
	"YB_nobody_simayi":"司马懿",//20
	"YB_nobody_zhaoyun":"赵云",//17

	North_yhy_xuyin:'绪隐',
	North_yhy_xuyin_info:'锁定技。1.当你因「桃」或者「桃园结义」回复体力时，「桃」或者「桃园结义」的使用者获得一张「惠」标记，拥有“惠”标记的角色出牌阶段开始前，其可摸x张牌（x为该角色拥有的「惠」标记数）。当你受到伤害时，伤害来源获得一张「狭」标记，拥有「狭」标记的角色的出牌阶段开始前，其须弃置y张牌（若牌数不足则全弃，y为该角色拥有的「狭」标记)。2.每当场上有角色出现体力值或手牌数变为0、武将牌翻至背面正面、武将牌横置重置这几种时机之一时，你摸1张牌。',
	North_yhy_xuyin1:'绪隐',
	North_yhy_xuyin2:'绪隐',
	North_yhy_xuyin3:'绪隐',
	North_yhy_xuyin4:'绪隐',
	North_yhy_xuyin5:'绪隐',
	North_yhy_xuyin6:'绪隐',
	North_yhy_xuyin1_info:'绪隐',
	North_yhy_xuyin2_info:'绪隐',
	North_yhy_xuyin3_info:'绪隐',
	North_yhy_xuyin4_info:'绪隐',
	North_yhy_xuyin5_info:'绪隐',
	North_yhy_xuyin6_info:'绪隐',
	North_yhy_cihua:'慈化',
	North_yhy_cihua_info:'1.当你受到伤害或回复体力后，你可以先弃置三张手牌，然后选择弃置场上一张「惠」标记或一张「狭」标记，令一名角色翻面，然后可以选择与另一角色各弃置任意张牌，再摸等量的牌。 2.其他角色于其回合内使用第z张牌时，若此牌为基本牌或普通锦囊牌，你可将此牌收入手牌，并令此牌无效。（z为你当前体力）。',
	North_yhy_minzeng:'悯憎',
	North_yhy_minzeng_info:'游戏开始时，你可获得一张「悯」标记与一张「憎」标记，「悯」标记置于你的武将牌上，并选择一名角色获得「憎」标记，你的回合结束时，可将「悯」「憎」分别移至另一名角色的武将牌上，拥有「悯」的角色下一回合结束或阵亡后，「悯」须移回你的武将牌上，拥有「憎」的角色阵亡后，你可选择将「憎」移至另一名角色上，若此时你放弃移动「憎」，「憎」消失移出游戏，你回复2点体力并选择是否获得其一个技能（觉醒技、限定技、主公技除外）。拥有「悯」的角色，回合开始前回复1点体力，摸1张牌，回合结束后摸2张牌，回合手牌上限＋2。拥有「憎」的角色，回合开始前流失1点体力，手牌上限-2。',
	North_yhy_minzeng_min:'悯憎·憎',
	North_yhy_minzeng_minzeng:'悯憎·收益',
	North_yhy_minzeng_minyi:'悯憎·悯移',
	North_yhy_minzeng_zengyi:'悯憎·憎移',
	North_yhy_minzeng_zengyi_info:'是否获得其一个技能（觉醒技、限定技、主公技除外）（因借鉴代码，这里使命技也排除掉了）。',
	North_yhy_minzeng_init:'悯憎·初始',
	North_dy_qingyu:'请谕',
	North_dy_qingyu_info:'1.游戏开始前，你将所有的基本牌、锦囊牌牌名记录在“武库”当中。2.出牌阶段，你可重铸一张基本牌，若此时“武库”中有未点亮的牌名，则你可点亮“武库”中的一种牌名，每回合至多重铸x次（x为你的体力值)。然后若你点亮的牌名不小于6种，则你立即获得技能［破势］。3.当你回合内使用一张非转化的锦囊牌或回合外使用、打出的一张非转化的基本牌时，若此牌名在“武库”中已被点亮，你可以摸一张牌。',
	North_dy_qingyu_light:'请谕·点亮',
	North_dy_qingyu_light_info:'点亮“武库”中的一种牌名，若你点亮的牌名不小于6种，则你立即获得技能［破势］。',
	North_dy_zhengwu:'整武',
	North_dy_zhengwu_info:'1.每当你回合开始前或回合外受到一点伤害后，你可令至多3名角色依次摸3张牌并弃1张牌，再令至多3名角色进入横置状态。2.每回合限一次，你可将一张牌当作“武库”中已点亮的牌使用（一种牌名每回合限一次）。',
	// North_dy_zhengwu2:'整武次数',
	North_dy_kuangzou:'匡奏',
	North_dy_kuangzou_info:'觉醒技，出牌阶段开始前，若你本场游戏使用［整武］技能不少于6次，则你减一点体力上限，将［整武］中“每回合限一次”改为“每回合限三次”。',
	North_dy_poshi:'破势',
	North_dy_poshi_info:'锁定技。1.每回合结束后，你随机从牌堆中使用两张装备牌，然后随机对一名横置状态的角色造成一点火焰伤害（若没有横置角色则不触发伤害)。2.当你成为杀的目标时，你摸两张牌。当你对其他角色使用杀时，该角色须弃置两张牌（若牌不足则全弃）。',
	North_ssx_jibing:'戎装',
	North_ssx_jibing_info:'锁定技，当你失去装备区里的一张牌后，你展示牌堆顶3张牌，并加入队列，然后依次使用队列中所有装备牌，最后获得其余牌；你的回合开始前/结束后，你随机从牌堆里使用1张装备牌；游戏开始时，随机装备两件装备。',
	North_ssx_lieyuan:'烈缘',
	North_ssx_lieyuan_info:'当你受到伤害后或出牌阶段开始前，你可将你区域里的一张牌移动至一名角色区域里相应位置。若如此做，你回复1点体力，再选择是否令该角色回复1点体力并摸2张牌。',
	North_ssx_lieyuanxx:'烈缘',
	North_ssx_lieyuanxx_info:'当你受到伤害后或出牌阶段开始前/结束后，你可选择一名其他角色。你弃置一张手牌或将一张装备牌置入其装备区。若如此做，你回复1点体力，再选择是否令该角色回复1点体力并摸2张牌。',
	North_zgl_zhenhu:'阵护',
	North_zgl_zhenhu_info:'当你受到伤害时，你可发动一次判定并获得判定牌。若判定结果为红色，则此伤害无效；若判定结果为黑色，你可移动场上1张牌。',
	North_zgl_dongxu:'洞虚',
	North_zgl_dongxu_info:'1.回合外，你可以将一张黑色牌当【无懈可击】使用，若如此，你可再选择令1名角色摸1张牌。2.其他角色回合结束后，你可选择x名角色。或令其依次回复1点体力并恢复武将牌，或令其进入横置状态（x为本回合你失去的黑色牌数)。',
	North_zgl_qizhu:'祈祝',
	North_zgl_qizhu_info:'锁定技。1.准备阶段和结束阶段，你观看牌堆顶的7张牌，然后你可以将其中任意数量的牌置于牌堆顶，将其余的牌置于牌堆底。2.出牌阶段开始时，你摸1张牌，再选择将1张手牌置于武将牌上称为“风”。',
	North_zgl_shiyan:'势焰',
	North_zgl_shiyan_info:'1.出牌阶段限4次，当你使用的牌花色与“风”中有的牌相同，则你可摸1张牌并选择对1名角色造成y点火焰伤害。2.出牌阶段结束时，若你武将牌上的“风”花色不少于4种或牌数不少于4张，你须弃置所有“风”。若如此做，你可选择对至多y名角色依次造成y点火焰伤害。(y为“风”标记中牌的花色种类)。',
	North_zgl_shiyanxx:'势焰',
	North_zgl_shiyanxx_info:'1.出牌阶段限y次，当你使用的牌花色与“风”中有的牌相同，则你可摸1张牌并选择依次对y名角色造成1点火焰伤害。2.出牌阶段结束时，若你武将牌上的“风”花色不少于4种或牌数不少于4张，你须弃置所有“风”。若如此做，你可选择对y名角色依次造成2点火焰伤害。(y为“风”标记中牌的花色种类)。',
	North_ld_chenxun:'忱恂',
	North_ld_chenxun_info:' 锁定技。1.摸牌阶段，你放弃摸牌，改为观看牌堆顶的2＋X张牌，你选择获得其中2张牌，其余牌置于「令你获得忱恂的角色」的武将牌上。(X为「令你获得忱恂的角色」武将牌上的技能数)。2.回合结束时，你将因〖忱恂〗置于「令你获得忱恂的角色」武将牌上的牌交给1名角色并令其执行1次额外的摸牌阶段和出牌阶段，若其未拥有技能〖忱恂〗，则你回复所有体力并将手牌补至体力上限，令其获得〖忱恂〗直到本次额外的摸牌阶段和出牌阶段结束。',
	North_ld_minde:'愍德',
	North_ld_minde_info:'1.当你对其他角色造成1点伤害后，或受到其他角色造成的1点伤害后，你可以摸2张牌，再交给其任意张牌（至少1张)，若你以此法给出的牌不少于2，则你可以获得其武将牌上的1个技能直到你的下个回合结束。2.若你拥有的技能数不大于4，则将“你可以摸2张牌”改为“你可以摸3张牌”。',
	North_smk_shangying:'赏应',
	North_smk_shangying_info:'锁定技。1.回合开始/结束时，若场上有武器牌，你选择1个获得之。2.当你于一回合内使用或打出第X张牌时，你摸X张牌。3.若X不小于1/2/3/4/5，你拥有【OL涯角】/【OL 界挑衅】/【OL 界咆哮】/【OL 界铁骑】/【OL界武圣】。4.一名角色回合结束后，若你本回合失去的牌不小于X，你摸2张牌（X为你的攻击范围）。',
	'North_smk_shangying_eq_info':'锁定技，回合开始/结束时，若场上有武器牌，你选择1个获得之。',
	'North_smk_shangying_qz1':'涯角',
	'North_smk_shangying_qz2':'挑衅',
	'North_smk_shangying_qz3':'咆哮',
	'North_smk_shangying_qz4':'铁骑',
	'North_smk_shangying_qz5':'武圣',
	'North_smk_shangying_dc_info':'锁定技，一名角色回合结束后，若你本回合失去的牌不小于X，你摸2张牌（X为你的攻击范围）。',

	North_bmh_wuzhi:'巫治',//台词：纵傀
	North_bmh_wuzhi_info:'当场上有角色受到非属性伤害/武将牌翻面，你可令1名没有“巫治”标记的角色获得标记“献”；当场上有角色受到属性伤害/武将牌翻回正面，你可令1名没有“巫治”标记的角色获得标记“率”。',
	North_bmh_huanchao:'唤潮',//台词：拜假
	North_bmh_huanchao_info:'限定技。转换技。出牌阶段，你可弃置3张不同类型的牌，并执行，阳：令拥有“献”的角色依次回复X点体力；阴：令拥有“率”的角色依次流失X点体力。执行结束后，相关角色弃置“巫治”标记（X为此技能发动次数）。',
	North_bmh_chizhang:'持杖',//台词：骨疽
	North_bmh_chizhang_info:'回合结束时，若你本回合造成的伤害不低于你的体力值上限，则你可恢复1名角色一个已发动过的限定技。',
	North_bmh_chizhangd:'持杖',//第二版//台词：骨疽
	North_bmh_chizhangd_info:'回合结束时，若你本回合造成的伤害不低于你的体力值上限和手牌上限之和，则你可恢复1名角色一个已发动过的限定技。',
	North_bmh_chizhangt:'持杖',//第三版//台词：骨疽
	North_bmh_chizhangt_info:'回合结束时，若你本回合使用的牌不低于你的体力值上限和手牌上限之和，则你可恢复1名角色一个已发动过的限定技。',
	North_bmh_chizhangq:'持杖',//第四版//台词：骨疽
	North_bmh_chizhangq_info:'回合结束时，若你本回合使用的牌或弃牌阶段弃置的牌不低于你的体力值上限和手牌上限之和，则你可恢复1名角色一个已发动过的限定技。',
	North_bmh_chizhangp:'持杖',//第五版//台词：骨疽
	North_bmh_chizhangp_info:'一名角色回合结束时，若场上有发动过的限定技且你本回合失去的牌不少于该角色失去的牌，你可选择令一个限定技恢复。',
	North_bmh_lushou:'录受',//台词：蚕食
	North_bmh_lushou_info:'锁定技。1.每当场上有角色获得“献”/“率”标记，你摸2/3张牌。2.若你有已发动过的限定技，则你摸牌阶段摸牌数和手牌上限＋3。3.每当你发动技能〖持杖〗，你和拥有“献”的角色各摸3张牌。',

	North_dc_ruofu:'若芙',//台词：闭月
	North_dc_ruofu_info:'回合结束时，若场上有未拥有“若芙”标记的角色，你可从牌堆顶摸1张牌，再将1张牌置于1名没有“若芙”标记的其他角色武将牌上，视为标记“若芙”。你可重复此流程至多3次。',
	North_dc_sulian:'愫怜',//台词：惑心
	North_dc_sulian_info:'锁定技。1.拥有“若芙”标记的角色回合开始时流失1点体力。2.一名拥有“若芙”的角色受到另一名拥有“若芙”角色造成的伤害后，该角色“若芙”标记进入弃牌堆，你摸1张牌，若此伤害为〖杀〗的伤害，你额外多摸1张牌且回复1点体力。',
	North_dc_qilu:'泣露',//台词：魅魂
	North_dc_qilu_info:'锁定技。当其他角色将你作为使用牌的唯一目标时，你摸1张牌。若其拥有“若芙”标记，其须流失1点体力并弃置4-X张牌（X为你的体力值，若不足则全弃)。',
	North_dc_ziman:'姿曼',//台词：离间（控制回合台词：离魂)
	North_dc_ziman_info:'锁定技。1.回合开始时，若场上有“若芙”标记的角色，你分别将“若芙”标记收入手牌。当你收入第1/2/3张“若芙”标记时，你回复1点体力/令本次选择的角色流失1点体力/你与本次选择的角色互换位置且其下个回合改为由你操控。2.若你以此法获得了3张“若芙”标记，则你可令之前拥有标记的3名角色按照座位轮次依次对后面一位“若芙”角色视为使用1张〖决斗〗。',

	North_bls_qiangong:'虔恭',
	North_bls_qiangong_info:'1.每回合每个角色限一次。每回合每种花色限展示一次。2.出牌阶段，你可选择展示1张未展示过的花色的牌并指定1名角色，令其展示所有牌，你将该角色的牌中与你展示花色相同的牌交给你指定的另外1名角色。3.若你以此法移交的牌不大于2，你摸1张牌并重置此花色的展示次数；大于5，你本回合不能再发动此技能。',
	North_bls_yuanya:'缘雅',
	North_bls_yuanya_info:'1.每名角色每项限一次。回合开始时，你可以指定1名角色回复1点体力和摸3张牌并选择令其①弃牌阶段开始前获得一个额外摸牌阶段②弃牌阶段结束后额外获得1个出牌阶段③废除判定区。2.若你一个回合内〖虔恭〗移交牌的花色数为4，则你回合结束时也可以发动此技能。',

	North_cjy_bashu:'罢梳',//台词：隅泣
	North_cjy_bashu_info:'回合开始前，你可弃置任意张装备区的牌并摸相同数量的牌，将本回合以下前X个阶段改为出牌阶段：①判定阶段②摸牌阶段③弃牌阶段（X为你弃置的装备区的牌数且大于3的部分不生效）。',
	North_cjy_duijing:'对镜',//台词：娴静
	North_cjy_duijing_info:'1.出牌阶段开始时，你可以摸1张牌，若该出牌阶段为你的第Y次出牌阶段（Y为4的倍数)，则可以额外摸4张牌。2.其他角色出牌阶段结束时，若此出牌阶段其对距离范围为2以内的角色使用过牌，你可选择移动其区域里的1张牌或弃置其1张手牌。',
	North_cjy_lvzhi:'虑至',//台词：善身
	North_cjy_lvzhi_info:'其他角色回合结束后，若其本回合使用牌的目标数不小于3或进入弃牌堆的牌数不小于3，你可弃置1张装备牌并摸1张牌，获得1次额外的出牌阶段。弃置的此装备牌计入下一次发动〖罢梳〗弃置的牌数。',

	North_hyy_guishi:'闺识',//台词：机巧
	North_hyy_guishi_info:'1.游戏开始时，你额外摸4张牌，并将4张牌置于你的武将牌上，称为“闺识”。2.摸牌阶段/出牌阶段结束时，你可以用任意张手牌替换等量的“闺识”。3.每当场上有判定生效，且“闺识”牌数量少于7，你可将牌堆顶上的1张牌置于“闺识”牌中。4.每个回合限一次，你可视为使用1张“闺识”牌中的非延时锦囊的同名牌。',
	North_hyy_lancai:'兰才',//台词：玲珑
	North_hyy_lancai_info:' 1.回合开始前，你可观看牌堆顶X张牌，然后将其中任意数量的牌置于牌堆顶，将其余的牌置于牌堆底（X为“闺识”牌数量)。2.出牌阶段限一次，你观看一名其他角色的手牌，可将其中1张手牌与“闺识”牌中的1张交换，你可弃置其手牌中3张花色相同的牌。',
	North_hyy_bingxue:'冰雪',//台词：集智
	North_hyy_bingxue_info:'锁定技。1.若你装备区没有防具牌，你视为装备【八卦阵】；若“闺识”的花色数为4，你不能成为延时锦囊牌的目标且受到伤害-1。2.当你使用锦囊牌时，你可展示牌堆顶3张牌并获得其中的非基本牌，基本牌进入弃牌堆。你使用锦囊牌无距离限制且你的手牌上限＋Y（Y为本回合进入弃牌堆的基本牌数)。3.回合结束时，若你的“闺识”牌大于4，则你将“闺识”牌弃置至4张，并移动X场上的牌，X为以此法弃置的牌。',

	North_cxch_lingxi:'灵犀',//化木
	North_cxch_lingxi_info:'当你使用牌后，若本回合你没有使用过与此牌花色相同的牌，你可摸1张牌，然后将牌堆底的1张牌明置于武将牌上，称为“玉娉”。若“玉娉”与使用的牌颜色相同，你可将牌堆顶1张牌明置于武将牌上，称为“婷袅”。',
	North_cxch_gongsheng:'共笙',//前盟
	North_cxch_gongsheng_info:'锁定技。当“玉娉”的类别数或“婷袅”的花色数发生变化时，你摸1张牌。若“玉娉”的类别数达到3，你须将所有的“玉娉”交给1名角色。',
	North_cxch_lianyu:'敛语',//良缘
	North_cxch_lianyu_info:'当你或其他没有手牌的角色成为一张非装备牌的唯一目标/受到伤害时，你可弃置3张花色各不相同的“婷袅”，令此牌/此伤害无效。',
	North_cxch_xixuan:'系璇',//羁肆
	North_cxch_xixuan_info:'你可将“玉娉”全部置入“婷袅”，视为使用1张非延时锦囊牌；你可弃置所有的“婷袅”，视为使用1张基本牌。',

	North_shh_yuniao:'余袅',//冲虚
	North_shh_yuniao_info:'回合结束时，阳：你可获得1名角色1张牌，然后对该角色造成1点火属性伤害；阴：你可交给1名角色1张牌，然后对该角色造成1点伤害。',
	North_shh_qingsi:'青丝',//妙剑
	North_shh_qingsi_info:'每当你使用或打出红色牌，你可弃置1张牌，视为对1名其它角色使用1张【雷杀】。',
	North_shh_xianyin:'仙音',//莲华
	North_shh_xianyin_info:'锁定技。若你造成的伤害类型（卡牌、非卡牌）或属性与你上一次造成的伤害不同，则此伤害＋1。若相同，你摸1张牌并可选择发动〖余袅〗。每个回合结束后，你摸X张牌（X为你本回合非摸牌阶段获得的牌数）。',
	//郭照
	North_gz_gongshu:'恭恕',//zunwei
	North_gz_gongshu_info:'锁定技。每当有角色弃置牌时，你摸X-1张牌（X为其弃置的牌数）。若你弃置的牌字数之和与本回合你上一次弃置的牌字数之和相同，你摸2张牌且本回合视为未发动过〖束俭〗。',//原先摸2
	North_gz_shujian:'束俭',//pianchong
	North_gz_shujian_info:'出牌阶段限三次。你可弃置至少Y张牌，然后你可使用其中1张牌（Y为你本回合发动〖束俭〗的次数+1）。',
	//赵襄
	North_zx_huashuang:'化霜',//fanghun
	North_zx_huashuang_info:'锁定技。当你于一个回合内第X次造成伤害时，此伤害＋Y （X为你的体力值，Y为你与受到伤害角色体力值的差）；当你第一次造成了不少于4点的伤害时，你增加1点体力上限。',
	North_zx_ningao:'凝傲',//fuhan
	North_zx_ningao_info:'锁定技。当你的体力值变化时，你摸1张牌；当你已损失体力值不小于0/1/2/3/4时，你可以将1张方块牌当作【火杀】使用或打出/使用牌不能被响应/回合外失去牌后可以使用1张【杀】/可以将1张红桃牌当作【桃】使用/手牌数恒为8。',
	North_zx_ningao_long_info:'回合外失去牌后可以使用1张【杀】',
	//刘封
	//刘封
	North_lf_zhenzhi:'阵峙',
	North_lf_zhenzhi_info:'准备阶段/结束阶段，你可获得/弃置X/至多6-X名角色各1张牌，被获得/弃置牌的角色须弃置2张牌/流失2点体力，然后你摸6-X/X张牌。直到你的下个回合开始。本回合〖阵峙〗角色回复体力后/进入濒死状态时，你回复1点体力/摸1张牌（X为你准备阶段选择获得牌的角色数且不大于6）。',
	
	
	"North_PC_zigong":"自攻",
	"North_PC_zigong_info":"锁定技，当你受到伤害或翻面后，你视为对自己使用一张【火攻】。",
	"North_PC_qianshui":"潜水",
	"North_PC_qianshui_info":"锁定技，第一轮游戏开始时，你展示一张手牌；当你失去一张展示过的牌后，你摸两张牌并翻面。",
	'North_PC_qianshui_tag':'冒泡',

	ten_caoyi:'曹轶',
	caoyi_miyi:'蜜饴',
	caoyi_miyi_info:'准备阶段，你可以选择一项：<br>1.回复一点体力 <br>2.受到一点你造成的伤害<br>然后令任意名角色依次执行该项。<br>若如此做，结束阶段这些角色执行另一项。',
	caoyi_yinjun:'寅君',
	caoyi_yinjun_info:'当你对其他角色使用手牌中唯一目标的【杀】或锦囊牌结算后，可以视为对其使用一张【杀】(此杀造成的伤害无来源)。若你此技能本回合发动次数大于你当前体力值，此技能本回合失效。',

	// ten_zhangliao:'威张辽',
	// ten_zhangliao_prefix:'威',
	// zhangliao_yuxi:'驭袭',
	// zhangliao_yuxi_info:'当你造成或受到伤害时，你可以摸一张牌。你使用以此法获得的牌无次数限制。',
	// zhangliao_porong:'破戎',
	// zhangliao_porong_info:'连招技（伤害牌 + 杀）。你可以获得目标角色的相邻角色各一张手牌，且此牌额外结算一次。',

	"North_haoling":"号令",
	"North_haoling_info":"限定技，出牌阶段，你可以移动场上的两张牌，然后你令场上其他角色依次选择：交给你一张牌或者受到一点伤害。",
	"North_zhenglue":"政略",
	"North_zhenglue_info":"出牌阶段，你可以流失一点体力并获得一点护甲，然后令一名角色摸一张牌。每局游戏限一次，结束阶段，若你发动【政略】累计达到三次，增加一点体力上限，恢复一点体力获得技能【谋划】。",
	"North_mouhua":"谋划",
	"North_mouhua_info":"每轮限三次，每回合限一次，你选择将一张牌当做任意基本牌或任意锦囊牌使用或打出（选择范围包括标准，军争，应变，用间），然后你摸一张牌。",

	"YB_nobody_guiyin":"癸隐",
	'#ext:夜白神略/audio/character/YB_nobody_guiyin1':'哼，我怎么会空手而归？',
	'#ext:夜白神略/audio/character/YB_nobody_guiyin2':'天机难测，却尽在我掌中。',
	"YB_nobody_guiyin_info":"锁定技，若攻击范围内包含你的角色数量为1，则其获得牌时你摸等量的牌，否则你使用基本牌或普通锦囊牌时结算两次且可以额外指定任意名角色为目标。",
	"YB_nobody_linglv":"灵虑",
	'#ext:夜白神略/audio/character/YB_nobody_linglv1':'早知今日，何必当初。',
	'#ext:夜白神略/audio/character/YB_nobody_linglv2':'司马氏，乃天命之所加也。',
	"YB_nobody_linglv_info":"锁定技，当场上有角色的体力值发生变化后，若其体力值不大于你，则你本轮防御距离与摸牌阶段摸牌数+1，否则你获得相邻角色的一张牌并重铸三张牌。",
	"YB_nobody_longying":"龙缨",
	'#ext:夜白神略/audio/character/YB_nobody_longying1':'无知小儿，先站稳阵脚再来吧。',
	'#ext:夜白神略/audio/character/YB_nobody_longying2':'骁将，岂能无胆！',
	"YB_nobody_longying_info":"当有角色使用牌结算完毕后，你可以弃置X张牌并弃置其等量的牌，若你弃置的牌数不少于2，则你对其造成一点伤害。（X为其本回合使用过的牌数）",
	"YB_nobody_fengguo":"锋虢",
	'#ext:夜白神略/audio/character/YB_nobody_fengguo1':'白马银枪，纵横万军之中，游刃有余。',
	'#ext:夜白神略/audio/character/YB_nobody_fengguo2':'策马冲阵，义贯金石之坚。',
	"YB_nobody_fengguo_info":"一名角色的准备阶段，若起手牌数不大于你，则你可以令其选择一项：1.你与其各摸两张牌。2.本局游戏对因“龙缨”受到过伤害的角色造成的伤害+1（每名角色限选一次）。",
	//----------------------装备及其他
}