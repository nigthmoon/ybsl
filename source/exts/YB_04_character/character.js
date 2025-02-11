import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { character }

const character = { //武将格式 : 
	//------------------------上古神话
	// sgsh_huaxu:{
	// 	sex: "female",
	// 	group: "shen",
	// 	groupInGuozhan: "qun",
	// 	hp: 3,
	// 	skills: ['sgsk_talei','sgsk_yunyuu'],
	// 	names: "null|null",
	// 	rankAdd:'rare',
	// },
	// // 'sgsh_huaxu':['female','shen',3,['sgsk_talei','sgsk_yunyuu'],['rankAdd:rare','name:null|null']],//华胥
	// 'sgsh_taizichangqin':['male','shen',3,['sgsk_yuefeng','sgsk_zhisheng'],['rankAdd:legend','name:null|null']],//太子长琴
	// 'sgsh_nvba':['female','shen',3,['sgsk_buyu','sgsk_hanshenx'],['rankAdd:epic','name:null|null']],//女魃
	// 'sgsh_luohou':['male','shen',4,['sgsk_yueshi'],['rankAdd:epic','name:null|null']],//罗睺
	// 'sgsh_dongwanggong':['male','shen',3,['sgsk_baigong','sgsk_cangling'],['rankAdd:legend','name:null|null']],//东王公
	// 'sgsh_yinglong':['male','shen',4,['sgsk_zongshui'],['rankAdd:epic','name:null|null']],//应龙
	// 'sgsh_xingtian':['male','shen',4,['sgsk_fuchou'],['rankAdd:epic','name:null|null']],//刑天
	// 'sgsh_xiwangmu':['female','shen',3,['sgsk_kunlun','sgsk_huasheng'],['rankAdd:legend','name:null|null']],//西王母
	// 'sgsh_yuqiang':['male','shen',4,['sgsk_zhihai','sgsk_xuanming'],['rankAdd:junk','name:null|null']],//禺强
	// 'sgsh_dayu':['male','shen',4,['sgsk_zhishui'],['rankAdd:epic','name:null|null']],//大禹

	// 'sgsh_limu':['male','shen',4,['sgsk_qianjun'],['rankAdd:rare','name:null|null']],//力牧
	// 'sgsh_chiyou':['male','shen',16,['sgsk_shizhan'],['rankAdd:legend','name:null|null']],//蚩尤
	// 'sgsh_jingwei':['female','shen',3,['sgsk_xianmu','sgsk_tianhai'],['rankAdd:legend','name:null|null']],//精卫
	
	sgsh_tiandi:['male','shen',4,['sgsk_zhizun'],['rankAdd:legend','name:null|null']],//天帝
	sgsh_shennong:['male','shen',3,['sgsk_wugu','sgsk_changcaox'],['rankAdd:legend','name:null|null']],//神农
	sgsh_xuanyuan:['male','shen',4,['sgsk_xiude','sgsk_wending'],['rankAdd:legend','name:null|null']],//轩辕
	sgsh_shaohao:['male','shen',4,['sgsk_qiongsang'],['rankAdd:legend','name:null|null']],//少昊
	sgsh_zhuanxu:['male','shen',4,['sgsk_chuangzhi'],['rankAdd:legend','name:null|null']],//颛顼
	sgsh_qinglong:['none','shen',4,['sgsk_longxiao'],['rankAdd:legend','name:null|null']],//青龙
	sgsh_baihu:['none','shen',4,['sgsk_huwei'],['rankAdd:legend','name:null|null']],//白虎
	sgsh_zhuque:['none','shen',4,['sgsk_zhiyan'],['rankAdd:legend','name:null|null']],//朱雀
	sgsh_xuanwu:['none','shen',4,['sgsk_xuanzhen'],['rankAdd:legend','name:null|null']],//玄武
	sgsh_qilin:['none','shen',4,['sgsk_decai'],['rankAdd:legend','name:null|null']],//麒麟

	'sgsh_dongwanggong':['male','shen',3,['sgsk_baigong','sgsk_cangling'],['rankAdd:legend','name:null|null']],//东王公√
	'sgsh_xiwangmu':['female','shen',3,['sgsk_kunlun','sgsk_huasheng'],['rankAdd:legend','name:null|null']],//西王母√
	'sgsh_huaxu':['female','shen',3,['sgsk_talei','sgsk_yunyuu'],['rankAdd:rare','name:null|null']],//华胥√
	sgsh_yaoji:['female','shen',3,['sgsk_yunyu','sgsk_mengzhen'],['rankAdd:legend','name:null|null']],//瑶姬
	sgsh_hongjunlaozu:['male','shen',3,['sgsk_pudu','sgsk_xiansheng'],['rankAdd:legend','name:null|null']],//鸿钧老祖
	sgsh_gonggong:['male','shen',4,['sgsk_taotian'],['rankAdd:legend','name:null|null']],//共工
	sgsh_zhurong:['male','shen',4,['sgsk_fentian'],['rankAdd:legend','name:null|null']],//祝融
	sgsh_goumang:['male','shen',3,['sgsk_fusang','sgsk_mangtong','sgsk_mushen'],['rankAdd:legend','name:null|null']],//句芒
	sgsh_houtu:['male','shen',3,['sgsk_yutu','sgsk_shengtu'],['rankAdd:legend','name:null|null']],//后土
	'sgsh_yuqiang':['male','shen',4,['sgsk_zhihai','sgsk_xuanming'],['rankAdd:junk','name:null|null']],//禺强√
	
	sgsh_fuxi:['male','shen',4,['sgsk_yuhan','sgsk_jiabian'],['rankAdd:legend','name:null|null']],//伏羲
	sgsh_xiangliu:['male','shen',4,['sgsk_jiushou'],['rankAdd:legend','name:null|null']],//相柳
	sgsh_houyi:['male','shen',4,['sgsk_sheri'],['rankAdd:legend','name:null|null']],//后羿
	'sgsh_dayu':['male','shen',4,['sgsk_zhishui'],['rankAdd:epic','name:null|null']],//大禹√
	sgsh_kuafu:['male','shen',4,['sgsk_zhuiri'],['rankAdd:legend','name:null|null']],//夸父
	sgsh_tubo:['male','shen',3,['sgsk_xuemu','sgsk_jiuqu'],['rankAdd:legend','name:null|null']],//土伯
	'sgsh_jingwei':['female','shen',3,['sgsk_xianmu','sgsk_tianhai'],['rankAdd:legend','name:null|null']],//精卫
	sgsh_qibo:['male','shen',3,['sgsk_suwen','sgsk_lingjiu'],['rankAdd:legend','name:null|null']],//岐伯
	'sgsh_taizichangqin':['male','shen',3,['sgsk_yuefeng','sgsk_zhisheng'],['rankAdd:legend','name:null|null']],//太子长琴√
	sgsh_yeming:['male','shen',3,['sgsk_cunyin','sgsk_sanqiu'],['rankAdd:legend','name:null|null']],//噎鸣
	
	'sgsh_yinglong':['male','shen',4,['sgsk_zongshui'],['rankAdd:epic','name:null|null']],//应龙√
	'sgsh_nvba':['female','shen',3,['sgsk_buyu','sgsk_hanshenx'],['rankAdd:epic','name:null|null']],//女魃√
	'sgsh_chiyou':['male','shen',16,['sgsk_shizhan'],['rankAdd:legend','name:null|null']],//蚩尤
	sgsh_fenghou:['female','shen',3,['sgsk_sinan','sgsk_shence'],['rankAdd:legend','name:null|null']],//风后
	sgsh_jiutianxuannv:['female','shen',3,['sgsk_taolue','sgsk_xuanji'],['rankAdd:legend','name:null|null']],//九天玄女
	sgsh_luozu:['female','shen',3,['sgsk_sangcan','sgsk_bianjuan'],['rankAdd:legend','name:null|null']],//螺祖
	sgsh_cangjie:['male','shen',3,['sgsk_zuoshu'],['rankAdd:legend','name:null|null']],//仓颉
	'sgsh_limu':['male','shen',4,['sgsk_qianjun'],['rankAdd:rare','name:null|null']],//力牧
	sgsh_changxian:['male','shen',4,['sgsk_zhangu','sgsk_sanggu'],['rankAdd:legend','name:null|null']],//常先
	sgsh_guiyuqu:['male','shen',3,['sgsk_zhanxing','sgsk_wuxing'],['rankAdd:legend','name:null|null']],//鬼臾区

	sgsh_shijiamouni:['male','shen',4,['sgsk_dianhua','sgsk_wuwo'],['rankAdd:legend','name:null|null']],//释迦牟尼
	'sgsh_luohou':['male','shen',4,['sgsk_yueshi'],['rankAdd:epic','name:null|null']],//罗睺√
	'sgsh_xingtian':['male','shen',4,['sgsk_fuchou'],['rankAdd:epic','name:null|null']],//刑天√



	//忆包新将
	// 'ybsl_107tushanshuili':['female','YB_dream',3,['yb107_xunhu','QQQ107_taye','QQQ107_yaoyi'],['rankAdd:epic','name:涂山|水璃']], //涂山水璃
	//群友共创
	ybsl_xuyou:['male','qun',3,['ybsl_zigong','ybsl_zicai'],['rankAdd:legend','name:许|攸','linkTo:xuyou']], //许攸
	//冷门民杀搬运
	ybslshen_zhenji:['female','shen',3,['ybsl_zjzilian','ybsl_zjsqiyuan','ybsl_zjsshixiang'],['wei','rankAdd:legend','name:甄|姬','linkTo:shen_zhenji']],
	//夜白杂设
	ybsl_hairi:['male','key',1,['hairi_shangshi','hairi_zheyi','hairi_zhongxia'],['rankAdd:epic','name:鹰原|羽依里']],
	sp_key_umi:['female','key',3,['caiyi','guili'],['rankAdd:epic','name:加藤|うみ','linkTo:key_umi']],
	ybsl_pujing:['male','qun',4,['ybsl_reshidao','ybsl_duhun'],['rankAdd:epic','linkTo:pujing']],
	//别群比赛
	ybsl_lvyi:['male','shu',3,['ybsl_jianyue','ybsl_tuntian','ybsl_quanfan'],['rankAdd:legend','name:吕|乂']], //吕乂
	ybsl_yinfan:['male','wei',3,['ybsl_quanbianx','zhaxiang'],['rankAdd:epic',"border:wu",'name:隐|蕃']], //隐蕃
	ybsl_shlizhaoyi:['female','shu',3,['ybsl_ranxinx','ybsl_fuju'],['rankAdd:legend','name:李|昭仪']], //李昭仪
	ybsl_sunshaoo:['male','wu',3,['ybsl_rongjie','ybsl_xiangcha'],['rankAdd:legend','name:孙|韶']], //孙韶
	//宗族武将
	//吴郡陆氏
	ybslclan_luji:['male','wu',3,['ybsl_ljfumin','ybsl_ljguihang','ybsl_clanxingzu'],['rankAdd:epic','clan:吴郡陆氏','name:陆|绩','linkTo:luji']], //族陆绩
	ybslclan_luxun:['male','wu',3,['ybsl_lxtujing','ybsl_lxweiyu','ybsl_clanxingzu'],['rankAdd:epic','clan:吴郡陆氏','name:陆|逊','linkTo:luxun']], //族陆逊
	ybslclan_luyan:['male','wu',3,['ybsl_lyyaoe','tiandu','ybsl_lykangming','ybsl_clanxingzu'],['rankAdd:epic','clan:吴郡陆氏','name:陆|延']], //族陆延
	//一将成名
	ybslshen_pangtong:['male','shen',3,['ybsl_ptchiling','ybsl_ptqiwu'],['rankAdd:epic','name:庞|统','linkTo:shen_pangtong']],

	//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
}
