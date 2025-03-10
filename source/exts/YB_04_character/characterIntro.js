import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { characterIntro }

const characterIntro = {
	//---------------------------------//上古神话
	sgsh_tiandi:'天帝是中国神话中的最高主宰，统治诸天万界的帝王，随着朝代不同最高神有时会发生变化，例如商周尊“昊天上帝”，秦襄公祭白帝，秦宣公祀青帝，灵公祭祀炎黄二帝，秦统一后祭祀以上四帝，西汉在四帝的基础上加入黑帝，称为五方上帝，东汉起则以泰一为至高神，凌驾于五方之上。唐代以昊天上帝作为天帝独祀或祭祀“六天”（昊天上帝与五方帝）。<br><br>--来自百度百科2025年2月11日搜集',
	// sgsh_tiandi:'帝俊：中国古代神话传说中的上古天帝，其原型就是帝喾（kù），姬姓，名俊（一作夋），五帝之一。出生于高辛，黄帝的曾孙，中国上古时期一位著名的部落联盟首领。15岁受封为辛侯，30岁受禅即位，号高辛氏。春秋战国后，被列为三皇五帝中的第三位帝王，帝喾前承炎黄，后启尧舜，奠定华夏根基，是华夏民族的共同人文始祖。被商族认为是其第一位先祖。<br><br>--来自AI智能回答',
	sgsh_shennong:'炎帝，是中国上古时期姜姓部落的首领尊称，号神农氏，又号魁隗氏、连山氏、列山氏，别号朱襄（尚有争议，也有说朱襄氏部落曾有三代首领尊号炎帝）。炎黄两帝是我们中华民族的人文始祖。炎帝与黄帝的父亲是“少典氏”，母亲是“有氏”。少典氏与有氏两个氏族都生活在以河洛为中心的广大地区。<br><br>传说姜姓部落的首领由于懂得用火而得到王位，所以称为炎帝。从神农起姜姓部落共有九代炎帝，神农生帝魁，魁生帝承，承生帝明，明生帝直，直生帝氂，氂生帝哀，哀生帝克，克生帝榆罔，传位五百三十年。<br><br>炎帝所处时代为新石器时代，炎帝故里目前有多地之争，分别是：洛阳孟津、陕西宝鸡、湖南会同县连山、湖南株洲炎陵县、湖北的随州、山西高平、河南柘城。炎帝部落的活动范围在黄河中下游，在姜水（一说是今宝鸡市渭滨区的清姜河，一说是今宝鸡市岐山县的岐水。）一带时部落开始兴盛，最初定都在陈地，后来又将都城迁移到曲阜。<br><br>相传炎帝牛首人身，他亲尝百草，发展用草药治病；他发明刀耕火种创造了两种翻土农具，教民垦荒种植粮食作物；他还领导部落人民制造出了饮食用的陶器和炊具。<br><br>传说炎帝部落后来和黄帝部落结盟，共同击败了蚩尤。<br><br>华人自称炎黄子孙，将炎帝与黄帝共同尊奉为中华民族人文初祖，成为中华民族团结、奋斗的精神动力。<br><br>炎帝被道教尊为神农大帝，也称五榖神农大帝。<br><br>--来自百度百科2025年2月11日搜集',
	// sgsh_shennong:'神农氏是传说中的炎帝，中国的太阳神，三皇五帝之一。又说他是农业之神，教民耕种，他还是医药之神，相传就是神农尝百草，创医学。传说神农死于试尝的毒草药。<br><br>--来自360百科',
	sgsh_xuanyuan:'黄帝，是中华民族的祖先，是中国古代的一位帝王，是华夏的第一位古帝，五帝之首。黄帝被尊祀为“人文初祖”。《尚书·吕刑》中“黄帝”乃皇天上帝。在《山海经》里“黄帝”只是诸帝之一，直到春秋战国时期才被定于一尊。据说他是少典与附宝之子，本姓公孙，后改姬姓，也有说巳姓。名轩辕，一说名轩。建都于有熊，亦称有熊氏。也有人称之为“帝鸿氏”。<br><br>史载黄帝因有土德之瑞，故号黄帝。黄帝在位期间，播百谷草木，大力发展生产，始制衣冠、建舟车、制音律、作《黄帝内经》等。<br><br>--来自百度百科2025年2月11日搜集',
	// sgsh_xuanyuan:'轩辕黄帝，(前2717年-前2599年)，是中国远古时代华夏民族的共主，三皇五帝之首，被尊为中华"人文初祖"。据说他是少典与附宝之子，本姓公孙，后改姬姓，故称姬轩辕。居轩辕之丘，号轩辕氏，建都于有熊(今河南郑州新郑市) ，亦称有熊氏。也有人称之为"帝鸿氏"。[2]史载黄帝以土德之瑞，故号黄帝。黄帝以统一华夏部落与征服东夷、九黎族而统一中华的伟绩载入史册。黄帝在位期间，播百谷草木，大力发展生产，始制衣冠、建舟车、制音律、创医学等。<br><br>--来自360百科',
	sgsh_shaohao:'少昊，华夏人文始祖，远古时期部落联盟首领称号，黄帝的长子，母为嫘祖（一说女节）。少昊，亦作“少暤”，名“挚”，又作“质”，号“金天氏”、“穷桑氏”或“朱宣氏”，生于穷桑，和太昊伏羲一样同为上古时期东夷族的祖先和首领，因修太昊之法，故称之为少昊，姬姓，一说为嬴姓，名玄嚣。<br><br>出生于江水（古代山东西部的一条大河）边。少年时，迎娶凤鸿氏女子为妻，成为凤鸿部落的首领，最终成为整个东夷部落的首领，号金天氏，一号青阳氏。少昊是东夷部族的首领。少昊部族内有20多个以鸟为名的部落，如凤鸟氏、玄鸟氏、伯赵氏、青鸟氏、丹鸟氏、祝鸿氏、鸤鸠氏、鹘鸠氏、爽鸠氏等等，其中有凤族8个，凤族在少昊集团中地位最为尊贵，掌管天文历法，指导部落农桑。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_zhuanxu:"颛顼（zhuān xū），姬姓，高阳氏，黄帝之孙，昌意之子。出生于若水（现四川省雅安市荥经县地区六合乡附近）。上古部落联盟首领，“五帝”之一，人文始祖之一。<br><br>颛顼辅佐少昊有功，封地在高阳（今河南省杞县高阳镇），故号高阳氏。少昊死后，打败争夺帝位的共工氏，成为部落联盟首领，号“高阳氏”。始都穷桑，后迁都商丘。<br><br>颛顼去世后，由黄帝曾孙帝喾继位。在流传下来的神话传说中，颛顼是主管北方的天帝。《史记·五帝本纪》记载颛顼：“静渊以有谋，疏通而知事”。<br><br>--来自百度百科2025年2月11日搜集",
	sgsh_qinglong:'青龙，又称苍龙、孟章，是中国古代神话传说中的形象，为“天之四灵”之一的东方之神，对应“四象”中的“东方七宿”。‘青龙’的由来与自然天象有关，主要源于上古时代人们对星辰运行的认识以及农耕文化。<br><br>中国二十八星宿中，古人将东方七宿角、亢、氐、房、心、尾、箕等星星的组合想象成龙的形象，按阴阳五行给五方配色之说，认为东方为木，属青色，故称其为“青龙”或“苍龙”。东方七宿的出没与降雨相互对应，古人认为是龙掌管着降雨，而降雨又决定着农耕收成，农耕的收成则决定着人们的生活水平，龙成了农耕社会最主要的“图腾”。<br><br>据《星经》记载，青龙形态生有羽翼。《文献通考》《丹铅总录笺证》《道园学古录》记载，青龙身体由二十八宿中的东边七星宿所组成，状似龙形，其中包括头长双角、身上披鳞，因五行中东属木而色青，且有颈部和颈根、肩膀和胁骨、心脏及尾巴。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_baihu:'白虎，中国古代神话中的天之四灵之一，西方之神，后为道教所信奉，同青龙、朱雀、玄武合称四方四神。<br><br>据《中兴征祥》记载，白虎全身如雪，无杂毛。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_zhuque:'朱雀，是中国古代神话中的天之四灵之一，源于远古星宿崇拜，是代表炎帝与南方七宿的南方之神，于八卦为离，于五行主火，象征四象中的老阳，四季中的夏季，同时也是天之南陆。<br><br>南方神兽朱雀就是鸟的外形。南方属火，朱雀等鸟的图腾在古代神话中往往属于太阳崇拜。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_xuanwu:'玄武，中国古代神话中的天之四灵之一，又名龟蛇，源于远古星宿崇拜，是指二十八宿按东南西北分为四象中的北方玄武七宿。<br><br>玄武是一种由龟和蛇组合成的一种灵物，四象在中国传统文化中指青龙、白虎、朱雀、玄武，分别代表东西南北四个方向。北方玄武于八卦为坎，于五行主水，象征四象中的老阴，四季中的冬季，同时也是天之北陆。<br><br>玄武的本意就是玄冥，武、冥古音是相通的。玄，是黑的意思；冥，就是阴的意思。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_qilin:'麒麟，是中国古代神话中的一种瑞兽，应龙生建马，建马生麒麟，与“龙”“凤”“龟”“貔貅”并称为五大瑞兽。<br><br>据《瑞应图》记载：麒麟长着羊头，狼的蹄子，头顶是圆的，身上是彩色的，高大概4米左右。《说文解字·十》记载：麒麟身体像麝鹿，尾巴似龙尾状，还长着龙鳞和一只角。<br><br>--来自百度百科2025年2月11日搜集',	
	'sgsh_dongwanggong':'东王公（别称扶桑大帝、青童君等），中国神话中的仙人，与西王母相对应，统率所有男仙。东王公为道教尊神，战国时期，楚地信仰的“东皇太一”神，为东王公之前身；《真灵位业图》将其排在上清左位，号曰“太微东霞扶桑丹林大帝上道君”。<br><br>郭沫若在《卜辞中的古代社会》一文中就说：“神话传说中人物，一人化为二人以上，一事化为二事以上，乃古今中外常有之事。”<br><br>--来自搜狗百科',//东王公
	'sgsh_xiwangmu':'道教创立以后，西王母被纳入神系，成为道教至高无上的女神。民间俗称“王母娘娘”。“西王母”的称谓，始见于《山海经》，因所居昆仑丘于汉中原为西，故称西王母。<br><br>--来自搜狗百科',//西王母
	'sgsh_huaxu':'华胥氏，简称华胥，最早见于《列子·黄帝》。相传是中国上古时期母系氏族部落的一位杰出女首领。是伏羲与女娲之母。她生在一个叫华阳的地方，有了华胥后改名(华胥国)，古往今来，上百种中华典籍中均记载着一个叫华胥氏的氏族女首领及其儿女伏羲、女娲的故事。中国建国初期的多位朴素主义学者相信，华胥氏的历史比黄帝还要长得多。华胥国的传统服饰为长袍，即国服、华服，后来发展成为具有长袍特点的汉服，也与华胥国有关。<br><br>神话所记录的是一个民族早期的唯心世界观，以纪念族群中做过特别重大贡献的部落群体和首领。越朴实的神话，还原的早期先民生活和思想就越可信。<br><br>--来自搜狗百科',//华胥
	sgsh_yaoji:'中国神话中的巫山神女。天帝之女或谓赤帝（炎帝）之女，名曰瑶姬，未嫁而死，葬于巫山之阳，精魂依草，实为灵芝。唐末被道教吸纳为西王母第二十三女。<br><br>战国·楚辞赋家宋玉《高唐赋》中说“先王”曾昼梦与女神相会，女神称“将抚君苗裔，藩乎江汉之间”、“妾在巫山之阳，高丘之阻，旦为朝云，暮为行雨”，后宋玉向襄王谏言：君王与神女相会可启发蒙昧，得治国之道，通畅九窍，延年益寿。其后，《神女赋》里楚襄王夜梦神女，但“骨法多奇，应君之相”的神女洁身自持，拒绝了楚襄王。<br><br>神女由楚国云梦巫山高禖神与《山海经》姑媱山帝女糅合而成。楚王实际上是去祭祀高禖神，以求楚国氏族女神，护佑国家政治清明及个人身心强健。 神女形象端庄典雅、美艳绝伦、情深意切而又贞亮洁清、不可亲附，实为贤士之象征，宋玉借以表达希望得君重用但又不事昏君的操守。巫山神女常用于比喻美女，而被艳情化传播的巫山云雨逐渐成为男女欢好之典。人们用“除却巫山不是云”喻指对爱情的忠诚，说明非伊莫属、爱不另与。<br><br>大禹治水时，神女瑶姬授以治水秘籍，并遣属神助之，三峡地区有巫山神女消灭十二恶龙、派神鸦为行船指点航路，为人间耕云播雨，为百姓治病育种灵芝等传说。瑶姬为民造福，日久天长，便化作长江三峡的神女峰。<br><br>瑶姬神话引出历代一系列诗赋词曲等文学作品，形成了描写、咏叹神女的韵文学长廊，对文学史影响深远。<br><br>注：古代传说中瑶姬不是二郎神/杨戬之母云花女，该讹传源于网文、电视剧。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_hongjunlaozu:'鸿钧，又称鸿钧道人、鸿钧老祖，是明代神魔小说《封神演义》中的人物，扮演着关键的教导和引导角色。鸿钧的初次登场在众仙眼中为“忽见正南上祥云万道，瑞气千条，异香袭袭，见一道者，手执竹杖而来。”鸿钧是老子（太上老君）、元始天尊和通天教主三位仙人的师父，他拥有诛戮陷绝四剑，后传于小弟子通天教主，修行地点是紫霄宫。<br><br>鸿钧指引三位弟子执行封神计划，旨在恢复神话秩序。元始天尊虽初负责，但姜子牙最终执行并完成此任。过程中，通天教主因门徒陨落，于临潼关设诛仙阵，局势紧张。老子现三清圣象与通天斗法，令其败逃，欲重建世界。鸿钧道人适时出现，责通天教主设阵之过，并召集三教主，直指通天未能约束门人，行恶致生灵涂炭。鸿钧命三人服玄功丹药以防异念内讧，后携通天离去。元始天尊与老子则命姜子牙完成封神大典，确保封神计划圆满成功。<br><br>鸿钧的衍生作品有动画《哪吒传奇》，动漫《封神演义》，游戏《诛仙世界》，电视剧《封神榜之武王伐纣》以及文学作品《神怪列国志》、《佛本是道》等。<br><br>鸿钧道人虽未在正统道教神谱中出现，但对道教思想体系的构建有深远影响。鸿钧的形象在后世的文化与宗教实践中得到广泛传播，尤其是在“洪荒流”小说等文学作品中，经常作为道教祖师的象征。除了文学创作外，鸿钧的故事也在民间信仰中广为流传，尤其在浙江慈北和陕南等地区，至今依旧保有相关传说和祭祀活动，继续维持其作为道教神祇的文化影响力。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_gonggong:'共工，又名共工氏、康回、孔壬，中国古代神话中的水神。炎帝的后裔，祝融的儿子。在早期的文献中，共工是尧的臣子，之后演变为古帝王、部落首领，后再转变为神话中怒撞不周山、破坏天体秩序的天神。共工所处的时代，往前可追溯至高辛氏、颛顼、黄帝、炎帝等时期，往后则流传至舜、禹时期。<br><br>郭璞注《山海经·大荒西经》引《归藏·启筮》写道，共工长着人脸蛇身，头发是红色。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_zhurong:'祝融，号赤帝，中国古代神话中的火神、南方神、南岳神、南海神、夏神、灶神，为五行神之一。历史文献中，祝融的相关记载纷繁复杂。在部分文献中，祝融指三皇时期的祝融氏；又有文献记载祝融为炎帝之后；另有文献记载祝融为黄帝之后；而祝融也指火正、夏官的官职名称。<br><br>据《山海经》记载，祝融长着兽身人面，架乘着两条龙，直接听命于天帝。据《史记》记载，祝融是楚人的祖先。据《广东新语》记载，农历二月十三为祝融生日。广东民间又称祝融为“洪圣王”，洪圣诞又称南海神诞、波罗诞，诞期是每年的农历二月十一至十三日，是广东民间为庆祝南海神祝融诞辰而举行的迎神赛会活动。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_goumang:'句芒（gōu máng），名重，少昊之子，是中国古代民间神话中的木神、春神、东方之神，主管树木的发芽生长，忠心耿耿地辅佐伏羲。太阳每天早上从扶桑上升起，神树扶桑归句芒管，太阳升起的那片地方也归句芒管。<br><br>句芒在古代非常重要，每年春祭都有份。传说它的本来面目是鸟，它鸟身人面，乘两龙。在祭祀仪式和年画中可以见到它，它变成了春天骑牛的牧童，头有双髻，手执柳鞭，亦称芒童。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_houtu:'后土，中国上古神话中的中央之神。道教神话中的“四御”/“六御”尊神之一。<br><br>早期在《左传》《礼记》《淮南子》中，大致称后土为共工氏之子，为中央之神，性别尚未明确。在东汉时期，王逸注解《楚辞》时又称后土为幽都之王。在汉代以后逐渐确立为女神，《宋史·礼志七》中记载，北宋政和六年宋徽宗封后土为“承天效法厚德光大后土皇地祇”，享受同玉皇大帝一样的仪礼规格。南宋吕元素《道门定制》卷2注：“后土即朝廷祀皇地祗於方止是也。王者所尊。合上帝为天父地母焉。”宋代以后，道教列为“四御”尊神之一，宣称后土神执掌阴阳生育、万物之美与大地山河之秀。至此，后土的女神身份确立了下来，民间又称之为“后土娘娘”。<br><br>道教将其尊为“四御/六御”中的天帝之一，她掌阴阳，育万物，因此被称为大地之母。其职责是掌管山岳土地变化及诸山神、地祇和三山五岳大帝等大神，并节制劫运之事。<br><br>--来自百度百科2025年2月11日搜集',
	'sgsh_yuqiang':'禺强为传说中的海神，也作“禺彊”、“禺京”，是黄帝之孙。海神禺强统治北海，身体像鱼，但是有人的手足，乘坐双头龙；禺强据说字“玄冥”，形象为人面鸟身、两耳各悬一条青蛇，脚踏两条青蛇，支配北方。<br><br>《庄子•大宗师篇•释文》和《列子•汤问篇》张湛注引《大荒经》曰：“北海之神，名曰禺强，灵龟为之使。”是说夏民族的远祖禺强即禺京，是灵龟的化身。<br><br>--来自百度百科2025年2月11日搜集',//禺强
	// 'sgsh_yuqiang':'禺强（yú qiáng）是传说中的风神、冬神，字玄冥。可以传播瘟疫，人面鸟身，用两条青蛇穿在耳朵上做装饰，踩着两条红色的蛇。<br><br>冬至之时，《史记》上记载，汉朝时要有七十个童男童女一起唱《玄冥》之歌，以此来祭祀冬神禺强。<br><br>--来自搜狗百科',//禺强
	sgsh_fuxi:'伏羲，华夏民族人文先始，三皇之一，即太昊，或称黄熊氏。神话中人类的始祖。相传为风姓，又名宓羲、庖牺、包牺、伏戏，亦称牺皇、皇羲，亦有青帝太昊伏羲（即东方上帝）一说。燧人氏之子，相传其母华胥在雷泽（今山东省菏泽市）踩了巨大的脚印而有孕，生伏羲于成纪（今甘肃省天水市），定都在陈（今河南淮阳）。<br><br>《易·系辞下》：“古者包牺氏之王天下也，仰则观象于天，俯则观法于地，观鸟兽之文，与地之宜。近取诸身，远取诸物，于是始作八卦。”又教民结绳，以作网罟，捕鱼猎兽，嫁娶以俪皮为礼，又创制琴瑟（《世本作篇》）。《帝王世纪》称：“伏羲尝百药而制九针”，我国医界千余年来尊奉为医药学、针灸学之始祖。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_xiangliu:'相繇，又称相柳，上古时代中国神话传说中的凶神，共工的臣属，出自《山海经·海外北经》：“蛇身九头，食人无数，所到之处，尽成泽国”。<br><br>传说它喷出来的水比洪水还厉害，又苦又辣，吃了就会送命。因此，这种水泽连禽兽也不能生活。禹见相柳如此猖獗，就运用神力杀了相柳，为民除害。相柳身上流出的血，一沾土地就五谷不生，把大片地方污染了。禹尝试用泥土陉塞，但三陉三陷，禹只好把这片土地劈为池子，各方天神在池畔筑起一座高台，镇压妖魔。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_houyi:'后羿，本称羿，是中国古代神话传说中的人物，擅于射箭，曾助尧帝射落九日，只留一日，因此在民间流传有“后羿射日”的典故。其为太阳神帝俊的臣子，嫦娥（姮娥）仙子的丈夫。为了成仙，从西王母之处得到不死灵药，却被其妻嫦娥偷吃而奔月。且曾为天下铲除了六害（猰貐、凿齿、九婴、大风、封豨、修蛇），并击败作乱一方的黄河水伯，救走宓妃（洛神）。最终被徒弟逢蒙（蠭门）用桃木棒暗算而亡，后被帝俊封为万鬼之王宗布神。<br><br>据《山海经》记载，后羿是一位手持红色神弓、白色羽箭的威武射官。有人神鬼三种形象，生前是半神半人的神人，死后成为半鬼半神的鬼王。一些汉画像将宗布神后羿的形态绘制成魁梧雄壮、外貌英伟的持弓猛汉。《淮南子》《上古神话演义》皆提到后羿左臂较长，因此射艺过人。《离骚图》中的配图将后羿的形象描绘成一名身穿长袍及豹裙的弓箭手。<br><br>其现实原型就是夏朝国君，历史上真正的羿因箭术超群、实力强大，而被人们尊为神话人物，即神话传说中的射日英雄，后来射日的羿逐渐被人们称作后羿，并载入史册中，由后羿庙供奉。<br><br>（注意：所谓“大羿”不过是网传说法，纯属是现代人捏造的谣言，“大羿”最早是神话专家“袁珂”自创的名称，任何古书中都没有出现“大羿”这个神名，古代记载里常以“羿”或“后羿”作为该神话人物的称呼，唯独没有“大羿”，“后羿”一名的设定远早于“大羿”，并且被现代普遍采用）<br><br>--来自百度百科2025年2月11日搜集',
	'sgsh_dayu':'大禹，姓姒，名文命，字（高）密，是黄帝的玄孙、颛顼的孙子（另一说为颛顼六世孙），其父名鲧，其母为有莘氏之女脩己，为夏后氏首领、夏朝开国君王，因治理滔天洪水而广受世人传颂。<br><br>相传，禹治理黄河有功[1]，受舜禅让而继承帝位，以阳城为都城（另有说都城是平阳或安邑或晋阳），国号夏，并分封丹朱于唐，分封商均于虞，又划定中国版图为九州。禹死后安葬于会稽山上（今浙江绍兴），现仍存禹庙、禹陵、禹祠。<br><br>--来自搜狗百科',//大禹
	sgsh_kuafu:'夸父是中国上古时期神话传说人物之一，又名博父、举父，夸父是幽冥神、地母后土（厚土娘娘）的孙儿。<br><br>据《山海经》记载，夸父形体巨大，右手操青蛇，左手操黄蛇，夸父存在兽、人、神三种形态。他不怕困难、英勇无畏，有着为民着想、为民造福的精神。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_tubo:'土伯，阴间幽都的看守。他虎头，牛身，长着三只眼睛，晃着一对利角，张开血污双手，驱逐着可怜的幽灵。其说始於先秦，达於近代。<br><br>--来自百度百科2025年2月11日搜集',
	'sgsh_jingwei':'精卫，古代神话中的鸟名，传说这种鸟是炎帝小女儿的化身，名叫女娃。女娃去东海游泳，被溺死了，再也没有回来，化为精卫鸟。口衔西山上的树枝和石块，用来填塞东海。《山海经·北山经》曰：“炎帝之少女名曰女娃。女娃游于东海，溺而不返，故为精卫，常衔西山之木石，以堙于东海。”晋代诗人陶渊明诗中说：“精卫衔微木，将以填沧海”。后世人们也常常以“精卫填海”比喻志士仁人所从事的艰巨卓越的事业。人们同情精卫，钦佩精卫，把它叫做“冤禽”、“誓鸟”、 “志鸟”、 “帝女雀”，并在东海边上立了个古迹，叫作“精卫誓水处”。<br><br>--来自360百科<br><br>精卫，中国古代神话中的一种鸟。上古神话传说里，女娃是炎帝最小的女儿，后溺水而亡，化作精卫鸟；另一说，女娃是上古的一个部落，由于气候变暖，海平面上升，女娃部落遭到灭顶之灾，后化作精卫。<br><br>据《山海经》记载：精卫婀娜多姿、长发飘逸、背生双翼，花头颅、白嘴壳、红脚爪，样子有点儿像乌鸦。<br><br>明代《律学新说》记载：精卫被民间尊为“三圣公主”。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_qibo:'岐伯，中国上古时期著名的医学家，精于医术脉理，名震一时，后世尊称为“华夏中医始祖”“医圣”。由于年代过于久远，关于他的籍贯说法不一。<br><br>今传《素问》基本上是黄帝询问，岐伯作答，以阐述医学理论，显示了岐伯高深的医学造诣。中国传统医学素称“岐黄”，或谓“岐黄之术”，岐伯当属首要地位。<br><br>--来自百度百科2025年2月11日搜集',
	'sgsh_taizichangqin':'太子长琴，《山海经》记载之神话人物。火神祝融的儿子，传说他出生的时候怀中抱着一把小琴，天地都因为他的出生而欢唱。<br><br>颛顼生老童，老童生祝融，祝融生太子长琴，传说太子长琴精于乐道，能使五色鸟舞于庭中。《左传》记载：“有五只彩鸟：一只叫皇鸟，一只叫鸾鸟，一只叫凤鸟，听见琴音就会翩翩起舞。”<br><br>--来自搜狗百科<br><br>太子长琴，男，《山海经》中出现的神话人物。出现于上古时代。<br><br>太子长琴，颛顼后代祝融的儿子，《山海经·大荒西经》云：“祝融生太子长琴，是处榣山，始作乐风。有五彩鸟三名，一曰皇鸟，一曰鸾鸟，一曰凤鸟。”<br><br>--来自百度百科2025年2月11日搜集',//太子长琴
	sgsh_yeming:'噎鸣是古代中国神话人物名。出自《山海经·海内经》: 共工生后土，后土生噎鸣。<br><br>噎鸣生岁十有二。 袁珂校注：《 大荒西经》云： ;黎（后土）下地是生噎，处于西极，以行日月星辰之行次。 即此噎鸣，盖时间之神也。 一说即为伯夷。<br><br>--来自百度百科2025年2月11日搜集',
	'sgsh_yinglong':'应龙，名叫庚辰，是古代中国神话传说中的创世神、造物神，作为一种有翼的龙出现于神话，同时也是真龙与龙族始祖，亦作黄龙、飞龙。传说鱼虾喝一口应龙的尿就能成为真龙。<br><br>先秦记载中，只存在一条应龙，名为庚辰，本居于天上世界，开辟了大地，生下了凤凰、麒麟。是助黄帝争帝而捕猎夔牛，独战虎、豹、熊、罴四兽，于南极杀蚩尤、斩夸父，最后与黄帝飞升；助大禹治水而再度下凡，以龙尾画地成江，开龙门、擒无支祁、捉拿相柳的无双战神，训练了中国第一支骑兵，撰写了十二生肖名表。直到商代都仍有帝王祭祀应龙。<br><br>传说应龙不死，是一尊曾于混沌划分阴阳、孵化创世神盘古的巨神，她的泪水形成了阴间黄泉，还有传说她化身成了天上的星座。<br><br>同时，应龙庚辰也是于五方主中央、五行司土的，云雨雷霆之神、沟渎河川之神、天龙之神，号曰顺天佑畿辅时应龙神的太一之妃，是活跃在先秦神话中的神明。<br><br>后世星经中，应龙更成为了司四季、司中岳、司中土、司黄河、长江、汉水、淮河、济水、司黄帝之子孙、司倮虫三百六十的天神。<br><br>--来自搜狗百科',//应龙
	'sgsh_nvba':'女魃是神话中的旱神，亦作“女妭”，她穿青衣，居住在赤水之北。<br><br>女魃在黄帝攻打蚩尤时有着巨大作用，蚩尤起兵攻打黄帝，黄帝令应龙进攻冀州，蚩尤请来风伯雨师，以狂风骤雨对付应龙部队，于是，黄帝令女魃助战，她阻止了大雨，最终助黄帝赢得战争。<br><br>--来自搜狗百科',//女魃
	'sgsh_chiyou':'蚩尤是中华民族三大人文始祖之一，是中国神话中的战神，是在上古时期东夷农耕部落的首领。<br><br>在中国神话体系中，我们看到的蚩尤形象异乎寻常——八手八脚，四眼六臂，头顶一对牛角。<br><br>先秦时期，《山海经•大荒北经》记载：“蚩尤作兵伐黄帝，黄帝乃令应龙攻之冀州之野。应龙蓄水，蚩尤请风伯、雨师纵大风雨。黄帝乃下天女曰魃，雨止，遂杀蚩尤。” 《孔子三朝记》记载：“黄帝杀蚩尤于中冀，蚩尤股体身首异处，而其血化为卤，则解之盐池也，因其尸解，故名其地为解。”<br><br>--来自360百科',
	sgsh_fenghou:'风后，伏羲后裔，风姓，上古时代中国神话传说中黄帝的宰相，黄帝臣三公之一。宰相、军事家、发明家，为黄帝统一中原做出了重要贡献。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_jiutianxuannv:'九天玄女，简称玄女，俗称玄牝氏、九天娘娘、九天玄女娘娘、九天玄母天尊、九天玄阳元女圣母大帝玄牝氏，中国古代神话中的传授过兵法的女神，后经道教奉为高阶女仙与术数神。 她在民俗信仰中的地位崇高显赫，乃是一位深谙军事韬略，法术神通的正义之神，形象经常出现于中国各类古典小说之中，成为扶助英雄铲恶除暴的应命女仙，故而她在道教神仙信仰中的地位重要，其信仰发源可追溯至先秦以前。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_luozu:'嫘祖，也写作傫祖、雷祖或累祖，是中国史前社会传说中的人物之一，为西陵氏之女，轩辕黄帝的元妃。嫘祖发明了养蚕，史称嫘祖始蚕。<br><br>嫘祖生玄嚣、昌意二子（一说玄嚣生母为方雷氏女节）。玄嚣之子蟜极，蟜极之子为五帝之一的帝喾；昌意娶蜀山氏女为妻，生高阳，继承天下，就是五帝之一的“颛顼帝”。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_cangjie:'仓颉，原姓侯冈，名颉，俗称仓颉先师 ，又史皇氏，又曰苍王、仓圣。《说文解字》、《世本》、《淮南子》皆记载仓颉是黄帝时期造字的左史官，见鸟兽的足迹受启发，分类别异，加以搜集、整理和使用，在汉字创造的过程中起了重要作用。<br><br>据《河图玉版》、《禅通记》记载，仓颉曾经自立为帝，号仓帝，是上古时期的一部落首领。仓颉在位期间曾经于洛汭之水拜受洛书。<br><br>仓颉也是道教中文字之神。据史书记载，仓颉有双瞳四个眼睛，天生睿德，观察星宿的运动趋势、鸟兽的足迹，依照其形象创文字，革除当时结绳记事之陋，开创文明之基，因而被尊奉为“文祖仓颉”。<br><br>--来自百度百科2025年2月11日搜集',
	'sgsh_limu':'力牧，中国古代神话中的人物，黄帝大臣，出自《帝王世纪辑存》<br><br>民间传说，远古时代有个畜牧氏族的首领，被黄帝请去做大将，并为他取了个名叫力牧。力牧就是牧姓的始祖。力牧不但善于牧羊，还善于射箭，力量大而能拉开强弓，所以又有传说，黄帝曾任命他为丞相。据说力牧的后代中，一部份人姓力，一部份人姓牧，这样的话，力姓和牧姓原本就是一家人了。<br><br>牧姓的先人还有如：牧仲春秋时期鲁国的名人，有的史书上称他牧中，他文化高，有智慧，活跃于上层社会，与许多名人相往来。牧相明朝文士，是当时的著名哲学家王阳明的同学，他们一起拜王华为师。牧相举为进士后，在朝中做官，敢于向皇上提意见。<br><br>--来自360百科',
	sgsh_changxian:'常先，为中国上古传说中的人物，同嫦娥、常仪等皆为具有神话色彩的上古先民。《史记·五帝本纪》有黄帝“举风后、力牧、常先、大鸿以治民”的记载。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_guiyuqu:'鬼臾区：又作鬼容区，号大鸿。上古医家，黄帝臣，曾佐黄帝发明五行，详论脉经，于难经究尽其义理，以为经论。<br><br>--来自百度百科2025年2月11日搜集',
	sgsh_shijiamouni:'释迦牟尼，佛教创始人。姓乔答摩（也译作乔达摩），名悉达多。“释迦牟尼”（Śākyamuni）是佛教徒对他的尊称。释迦，种族名，意为“能”；牟尼，亦译为“文”，是尊称，意为“仁”、“儒”、“忍”、“寂”。合为“能仁”、“能儒”、“能忍”、“能寂”等，意即释迦族的“圣人”。<br><br>--来自百度百科2025年2月11日搜集',
	'sgsh_luohou':'罗睺是印度神话中的阿修罗之一，是达耶提耶王毗婆罗吉提（Vipracitti）与辛悉迦（Simhika，达刹之女）的儿子。罗睺经常吞食日月，造成日蚀和月蚀，当日月在他敞开的喉头走出，蚀便完结。罗睺又被称为“行星、流星之王”，西南方的守护神；他长有四只手，下半身为蛇尾，好为非作歹。<br><br>--来自搜狗百科',//罗睺
	'sgsh_xingtian':'刑天是中国古代神话传说人物之一，是炎帝手下一员大将，与黄帝大战时，被砍掉脑袋，因此称为“刑天”，意为“形体夭残”。其记载于《山海经·海外西经》中，真实性学界一直有所争议，原本可能是华夏族无名神祇。<br><br>据甲骨文和金文记载，刑天为一人形符号，为氏族部落的象征图腾。在《山海经》的原本记载，称作“形天”，而“刑天”之得名，为陶渊明所改，其诗中“刑天舞干戚”一词，可能因传抄错误而有“刑天舞干戚”与“形夭无千岁”二说。<br><br>--来自搜狗百科',//刑天

	
	lvyi: '吕乂（？-251年），字季阳，荆州南阳（今河南省南阳市）。三国时期蜀汉官员。吕乂出身南阳吕氏，自幼丧父，喜好读书弹琴。初任典曹都尉，管理盐税，迁绵竹县令，政绩卓著，拜巴西太守。诸葛亮北伐中原，以为汉中太守，督促农事，供应兵员军需粮草。诸葛亮死后，累迁蜀郡太守。后来，入朝担任尚书，辅佐费祎，代董允为尚书令。吕乂任职内外，生活俭朴，谦虚少言，为政简明，执法严苛，以清明能干著称。延熙十四年（251年），去世。',
	luyan: '陆延，陆逊长子，陆抗长兄，母亲不明，可能是陆逊前妻之子，吴郡人。早夭，由他的弟弟陆抗继承爵位。在正史中对他没有评价，野史里也极少提到他。他的父亲以及弟弟都非常优秀，他未满二十岁就去世了。',
	yinfan: '隐蕃(209年-231年)，三国时魏官吏。青州(治今山东临淄)人。有口才，魏太和四年/吴黄龙二年(公元230年)，奉魏明帝命，诈叛归吴，任廷尉监。蕃交结豪杰，与众官交好。后谋叛，事觉伏诛。',
	shlizhaoyi: '李昭仪，三国时期蜀汉后主刘禅的昭仪。<br>景耀六年（263年），魏征西将军邓艾攻至成都，后主投降。魏国把蜀汉后宫宫女赏赐给没有妻子的诸位将军，李昭仪自杀身亡。',
	sunshaoo:'孙韶(188年-241年)，字公礼，吴郡富春(今浙江杭州富阳区)人，三国时期吴国宗室、将领。孙韶的伯父孙河，本姓俞，孙策很喜爱他，便赐姓孙，将他列名孙氏家族之中。<br>建安九年(204年)，孙河被杀，孙韶统帅孙河的军队，被孙权任命为承烈校尉。后任广陵太守、偏将军。黄初元年(220年)，孙权受封吴王，升任他为扬威将军，封建德侯。黄龙元年(229年)，孙权称帝，任命孙韶为镇北将军。孙权后加任孙韶兼任幽州牧，假节。赤乌四年(241年)，孙韶去世。',
}