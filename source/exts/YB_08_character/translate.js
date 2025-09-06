import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {translate}

const translate = {  
	ybmjz_standard:'标包名将',
	ybmjz_caocao:'名将曹操',
	ybmjz_caocao_prefix:'名将',
	'ybmjz_jianxiong':'奸雄',
	'ybmjz_jianxiong_info':`当你受到伤害后，你可以获得对你造成伤害的牌并摸X张牌（X为本次伤害值且至少为1）。每局游戏限一次，当你以此法获得牌时，你可以展示并记录这些牌点数（重复点数不记录），然后若已记录点数不少于9个，你依次执行：①增加1点体力上限；②获得你武将牌上未生效的主公技；③修改${get.poptip('ybmjz_jianxiong_gai')}。`,
	'ybmjz_jianxiong_gai':'奸雄·改',
	'ybmjz_jianxiong_gai_info':'当你受到伤害后，你可以获得对你造成伤害的牌并摸X张牌（X为已损体力值且至少为1）。',
	'ybmjz_zhishuo':'执槊',
	'ybmjz_zhishuo_info':'主公技，以魏势力角色为来源弃置的牌进入弃牌堆时，其可以将之置于你的武将牌上成为“短歌行”；当魏势力角色使用或打出牌时，若“短歌行”中有与此牌花色相同的牌，你可以将所有与之花色相同的“短歌行”当做无次数限制的【杀】使用，且你令此【杀】伤害基数为此【杀】的实体牌数，此【杀】造成伤害后，你可令其回复本次伤害值的体力值；当你获得此技能时，你装备【衠钢槊】。',
	'ybmjz_hujia':'护驾',
	'ybmjz_hujia_info':'主公技，以魏势力角色为来源弃置的牌进入弃牌堆时，其可以将之置于你的武将牌上成为“短歌行”；当魏势力角色使用或打出牌时，若“短歌行”中有与此牌花色相同的牌，你可以将一张与之花色相同的“短歌行”交给其并摸一张牌；当你需要使用或打出一张【闪】时，你可以令其他魏势力角色选择是否打出一张【闪】。若有角色响应，则你视为使用或打出了一张【闪】。',
	ybmjz_simayi:'名将司马懿', 
	ybmjz_simayi_prefix:'名将', 
	'ybmjz_fankuix':'反馈',
	'ybmjz_fankuix_info':'每当你受到伤害1点后，你可以获得一名其他角色的一张牌，然后若选择的不是伤害来源，你弃置一张牌。',
	'ybmjz_fankui':'反馈',
	'ybmjz_fankui_info':'当你受到1点伤害后，你可以获得伤害来源一张牌，然后若来源手牌数大于你，你可再获得其一张牌。',
	'ybmjz_guicai':'鬼才',
	'ybmjz_guicai_info':'在任意角色的判定牌生效前，你可以打出一张牌代替之；每回合限X+1次（X为你已损体力值），当你不因使用而失去牌后，你摸一张牌。',//，然后此次判定结果不能再被修改
	// 'ybmjz_guicai_info':'在任意角色的判定牌生效前，你可以打出一张牌代替之；每回合每种花色限一次，当你的手牌进入弃牌堆时，你可以摸一张牌。',//，然后此次判定结果不能再被修改
	ybmjz_xiahoudun:'名将夏侯惇', 
	ybmjz_xiahoudun_prefix:'名将', 
	'ybmjz_ganglie':'刚烈',
	'ybmjz_ganglie_info':'当你受到1点伤害后，你可进行判定，若结果为：红色，你对伤害来源造成1点伤害；黑色，你弃置伤害来源一张牌。然后你可以弃置一张与判定牌同颜色的牌再执行一次。',
	'ybmjz_gangliex':'刚烈',
	'ybmjz_gangliex_info':'当你受到1点伤害后，你可进行判定，若结果为：红色，你对伤害来源造成1点伤害；黑色，你弃置伤害来源一张牌。然后你可将判定牌置于其武将牌上。（当你弃置其牌后，若其武将牌上有红色“刚烈”牌，你弃置其中一张红色“刚烈”牌，对其造成1点伤害；当你对其造成伤害后，若其武将牌上有黑色“刚烈”牌，你弃置其中一张黑色“刚烈”牌，然后弃置其一张牌）。',
	'ybmjz_gangliey':'刚烈',
	'ybmjz_gangliey_info':'当你受到1点伤害后，你可进行判定，若结果为：红色，你对伤害来源造成1点伤害；黑色，你弃置伤害来源一张牌。然后你可将判定牌置于其武将牌上。然后若其武将牌上“刚烈”牌集齐黑红两种颜色，你获得其一黑一红两张“刚烈”牌对其造成2点伤害。每个回合结束时，你获得当前回合角色的“刚烈”牌，然后回复其中红色牌数的体力，摸其中黑色牌数的牌。',
	'ybmjz_qingjian':'清俭',
	'ybmjz_qingjian_info':'',
	ybmjz_zhangliao:'名将张辽', 
	ybmjz_zhangliao_prefix:'名将', 
	'ybmjz_tuxi':'突袭',
	'ybmjz_tuxi_info':'摸牌阶段即将摸牌时，你可以选择至多X名其他角色（X为本次摸牌数），同时弃置他们各一张牌，然后你可以获得其中任意张牌，然后本次摸牌数减少等量值。',
	// 'ybmjz_tuxi_info':'出牌阶段开始时，你可以弃置一张牌，并选择等量有手牌的其他角色，展示并获得他们各一张牌，若你弃置的牌花色包含此牌花色，你对其造成1点伤害。',
	ybmjz_xuzhu:'名将许褚', 
	ybmjz_xuzhu_prefix:'名将',
	'ybmjz_luoyi':'裸衣',
	'ybmjz_luoyi_info':'出牌阶段开始时，你可以弃置一张牌，然后摸两张牌并展示之，若你弃置的牌或摸到的牌包含：基本牌，直到下回合开始，你使用【杀】或【决斗】造成的伤害+1；锦囊牌：本回合使用【杀】次数+1；装备牌，本回合使用【杀】无距离限制。',
	ybmjz_guojia:'名将郭嘉', 
	ybmjz_guojia_prefix:'名将',
	ybmjz_tiandu:'天妒',
	ybmjz_tiandu_info:'锁定技，准备阶段，你进行一次判定，若结果为伤害牌，你受到1点该牌造成的伤害；当你的判定牌生效后，你获得之。',
	tiandu_re_guojia:'天妒',
	tiandu_re_guojia_info:'此技能仅提供一条语音',
	ybmjz_zhenji:'名将甄姬', 
	ybmjz_zhenji_prefix:'名将', 

	ybmjz_liubei:'名将刘备', 
	ybmjz_liubei_prefix:'名将', 
	'ybmjz_rende':'仁德',
	'ybmjz_rende_info':'出牌阶段限一次，你可以将任意张手牌置入仁库，同时指定至多等量其他角色，你令他们各摸两张牌；每回合限一次，你可以将一张仁库牌当一张基本牌使用；当仁库牌溢出时，你可将溢出牌分配给其他角色，然后获得牌的角色可以“拥戴”你（已拥戴改为可以令你恢复一点体力）；每局限一次，准备阶段，若存活的“拥戴”你的角色大于存活角色数三分之一，你加一点体力上限，回复一点体力，获得你未拥有的主公技。',
	// 'ybmjz_rende_info':'出牌阶段限一次，你可以将任意张手牌或仁库中的牌交给一名其他角色，然后声明一个基本或非延时锦囊牌，其可以展示一张手牌令此牌视为之。若如此做，你可以回复1点体力或视为使用你声明的牌。',
	'ybmjz_xiemin':'携民',
	'ybmjz_xiemin_info':`主公技，每回合每名角色限一次，其他角色使用有实体牌的【转化牌】或【杀】后，其可以将位于处理区的此牌置入仁库，然后若其不为蜀势力，你可令其改为蜀势力，否则你可以发动${get.poptip('ybmjz_rende')}的第一句。`,
	ybmjz_guanyu:'名将关羽',
	ybmjz_guanyu_prefix:'名将',
	ybmjz_zhangfei:'名将张飞',
	ybmjz_zhangfei_prefix:'名将',
	ybmjz_zhugeliang:'名将诸葛亮',
	ybmjz_zhugeliang_prefix:'名将',
	ybmjz_zhaoyun:'名将赵云',
	ybmjz_zhaoyun_prefix:'名将',
	ybmjz_machao:'名将马超',
	ybmjz_machao_prefix:'名将',
	ybmjz_huangyueying:'名将黄月英',
	ybmjz_huangyueying_prefix:'名将',
	"ybmjz_jizhi":"集智",
	"ybmjz_jizhi_info":'当你使用锦囊牌时，你可以摸一张牌。然后选择一项：本回合手牌上限+1，本回合出【杀】次数+1。',

	ybmjz_sunquan:'名将孙权',
	ybmjz_sunquan_prefix:'名将',
	ybmjz_ganning:'名将甘宁',
	ybmjz_ganning_prefix:'名将',
	ybmjz_lvmeng:'名将吕蒙',
	ybmjz_lvmeng_prefix:'名将',
	ybmjz_huanggai:'名将黄盖',
	ybmjz_huanggai_prefix:'名将',
	ybmjz_zhouyu:'名将周瑜',
	ybmjz_zhouyu_prefix:'名将',
	ybmjz_daqiao:'名将大乔',
	ybmjz_daqiao_prefix:'名将',
	ybmjz_luxun:'名将陆逊',
	ybmjz_luxun_prefix:'名将',
	ybmjz_sunshangxiang:'名将孙尚香',
	ybmjz_sunshangxiang_prefix:'名将',

	ybmjz_huatuo:'名将华佗',
	ybmjz_huatuo_prefix:'名将',
	ybmjz_lvbu:'名将吕布',
	ybmjz_lvbu_prefix:'名将',
	ybmjz_diaochan:'名将貂蝉',
	ybmjz_diaochan_prefix:'名将',
	//----------------------装备及其他

	ybmjz_sp:'名将sp',
	ybmjz_zhangqiying:'名将张琪瑛',
	ybmjz_zhangqiying_prefix:'名将',
	ybmjz_majun:'名将马钧',
	ybmjz_majun_prefix:'名将',
	ybmjz_liuyan:'名将刘焉',
	ybmjz_liuyan_prefix:'名将',
	ybmjz_limu:'立牧',
	ybmjz_limu_info:'出牌阶段，你可以将一张：黑桃牌当【闪电】，红桃牌当【火山】，梅花牌当【洪水】，方块牌当【随波逐流】 对自己使用。只要你的判定区内有牌，你对攻击范围内的其他角色使用牌便没有次数和距离限制。',

	ybmjz_sunluyu:'名将孙鲁育',
	ybmjz_sunluyu_prefix:'名将',
	ybmjz_meibu:'魅步',
	ybmjz_meibu_info:`其他角色出牌阶段开始时攻击范围有你或你受到其他角色造成的伤害时，你可摸一张牌，然后你可令其获得${get.poptip('ybmjz_zhixi')}直到回合结束。若此时场上存在〖止息〗目标，你以此法本回合摸牌数+1。`,
	ybmjz_zhixi: "止息",
	ybmjz_zhixi_info: "锁定技。出牌阶段，若你于此阶段使用过的牌数不小于X，你不能使用牌（X为你的体力值）；当你使用锦囊牌时，你结束此阶段。",
	ybmjz_mumu:'穆穆',
	ybmjz_mumu_info:'出牌阶段，你可弃置x张牌并发动对应项，然后删去此项直到回合结束。<br>1回复一名角色1点体力。<br>2.弃置一名角色一张装备牌，然后你摸一张牌。<br>3.令一名角色选择一张牌，然后展示剩余手牌，你从两者中获得一张牌。<br>x为此对应的第几项。',
	ybmjz_mumuxx:'穆穆',
	ybmjz_mumuxx_info:'出牌阶段，你可弃置x张牌并发动对应项，然后删去此项直到回合结束。<br>1回复一名角色1点体力。<br>2.令一名其他角色选择一张手牌，然后展示剩余手牌，你从两者中获得一张牌。<br>3.弃置至多x名角色的两张牌，然后你摸一张牌。<br>x为此对应的第几项。',


















	ybmjz_shen:'名将神',
	ybmjz_shen_zhugeliang:'名将神诸葛亮',
	ybmjz_shen_zhugeliang_prefix:'名将神',
	ybmjz_shen_caopi:'名将神曹丕',
	ybmjz_shen_caopi_prefix:'名将神',
	'ybmjz_chuyuan':'储元',
	'ybmjz_chuyuan_info':'一名角色受到伤害后，若你武将牌上「储」的数量小于体力上限，你可以令其摸一张牌。然后其将一张手牌置于你的武将牌上，称为「储」。',
	'ybmjz_dengji': "登极",
	'ybmjz_dengji_info': `觉醒技，准备阶段，若你武将牌上的「储」数不小于3，则你减1点体力上限并获得所有「储」，然后获得技能${get.poptip('ybmjz_tianxing')}和${get.poptip('new_rejianxiong')}。`,
	'ybmjz_tianxing': "天行",
	'ybmjz_tianxing_info': `觉醒技，准备阶段，若你武将牌上的「储」数不小于3，则你减1点体力上限并获得所有「储」，然后修改技能${get.poptip('ybmjz_chuyuan')}，选择获得以下技能中的一个：${get.poptip('rerende')}/${get.poptip('rezhiheng')}/${get.poptip('olluanji')}/${get.poptip('caopi_xingdong')}/${get.poptip('caopi_xinkui')}。`,
	ybmjz_shen_caopi_kui:'傀甄姬',
	ybmjz_shen_caopi_kui_prefix:'傀',
	'caopi_xinkui':'心傀',
	'caopi_xinkui_info':'锁定技，其他角色死亡后，若其不为“心之傀”，则你令其将武将牌替换为“傀甄姬”复活并由你操控。',
	ybmjz_shen_guojia:'名将神郭嘉',
	ybmjz_shen_guojia_prefix:'名将神',
	'ybmjz_reshuishi':'慧识',
	'ybmjz_reshuishi_info':'出牌阶段限一次。你可进行判定牌不置入弃牌堆的判定。若判定结果与本次发动技能时的其他判定结果的花色均不相同，{若你的体力上限小于10，则你加1点体力上限}，然后你可以重复此流程。然后你将所有位于处理区的判定牌交给一名角色。若其手牌数为全场最多，则你减1点体力上限。',
	'ybmjz_stianyi':'天翊',
	'ybmjz_stianyi_info':`觉醒技，准备阶段，若场上的所有存活角色均于本局游戏内受到过伤害，则你加2点体力上限并回复1点体力，然后令一名角色获得技能${get.poptip('ybmjz_zuoxing')}。`,
	'ybmjz_zuoxing':'佐幸',
	'ybmjz_zuoxing_info':'每回合限一次，若令你获得〖佐幸〗的角色存活且体力上限大于1，则你可以令其减1点体力上限，并视为使用一张普通锦囊牌。',
	
}