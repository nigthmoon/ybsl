import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { character }

/** @type { importCharacterConfig['character'] } */
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
	// 'sgsh_taizichangqin':['male','shen',3,['sgsk_yuefeng','sgsk_zhisheng'],['rankAdd:legend','rankS:s','name:null|null']],//太子长琴
	// 'sgsh_nvba':['female','shen',3,['sgsk_buyu','sgsk_hanshenx'],['rankAdd:epic','name:null|null']],//女魃
	// 'sgsh_luohou':['male','shen',4,['sgsk_yueshi'],['rankAdd:epic','name:null|null']],//罗睺
	// 'sgsh_dongwanggong':['male','shen',3,['sgsk_baigong','sgsk_cangling'],['rankAdd:legend','rankS:s','name:null|null']],//东王公
	// 'sgsh_yinglong':['male','shen',4,['sgsk_zongshui'],['rankAdd:epic','name:null|null']],//应龙
	// 'sgsh_xingtian':['male','shen',4,['sgsk_fuchou'],['rankAdd:epic','name:null|null']],//刑天
	// 'sgsh_xiwangmu':['female','shen',3,['sgsk_kunlun','sgsk_huasheng'],['rankAdd:legend','rankS:s','name:null|null']],//西王母
	// 'sgsh_yuqiang':['male','shen',4,['sgsk_zhihai','sgsk_xuanming'],['rankAdd:junk','name:null|null']],//禺强
	// 'sgsh_dayu':['male','shen',4,['sgsk_zhishui'],['rankAdd:epic','name:null|null']],//大禹

	// 'sgsh_limu':['male','shen',4,['sgsk_qianjun'],['rankAdd:rare','name:null|null']],//力牧
	// 'sgsh_chiyou':['male','shen',16,['sgsk_shizhan'],['rankAdd:legend','rankS:s','name:null|null']],//蚩尤
	// 'sgsh_jingwei':['female','shen',3,['sgsk_xianmu','sgsk_tianhai'],['rankAdd:legend','rankS:s','name:null|null']],//精卫
	
	sgsh_tiandi:['male','shen',4,['sgsk_zhizunx'],['rankAdd:legend','rankS:s','name:null|null']],//天帝
	sgsh_shennong:['male','shen',3,['sgsk_wugu','sgsk_changcaox'],['rankAdd:rare','name:null|null']],//神农
	sgsh_xuanyuan:['male','shen',4,['sgsk_xiudexy','sgsk_wending'],['rankAdd:legend','rankS:s','name:null|null']],//轩辕
	sgsh_shaohao:['male','shen',4,['sgsk_qiongsangy'],['rankAdd:legend','rankS:s','name:null|null']],//少昊
	sgsh_zhuanxu:['male','shen',4,['sgsk_chuangzhi'],['rankAdd:legend','rankS:s','name:null|null']],//颛顼
	sgsh_qinglong:['none','shen',4,['sgsk_longxiao'],['rankAdd:legend','rankS:s','name:null|null']],//青龙
	sgsh_baihu:['none','shen',4,['sgsk_huwei'],['rankAdd:legend','rankS:s','name:null|null']],//白虎
	sgsh_zhuque:['none','shen',4,['sgsk_zhiyany'],['rankAdd:legend','rankS:s','name:null|null']],//朱雀
	sgsh_xuanwu:['none','shen',4,['sgsk_xuanzhen'],['rankAdd:legend','rankS:s','name:null|null']],//玄武
	sgsh_qilin:['none','shen',4,['sgsk_decaix'],['rankAdd:legend','rankS:s','name:null|null']],//麒麟

	'sgsh_dongwanggong':['male','shen',3,['sgsk_baigong','sgsk_cangling'],['rankAdd:legend','rankS:s','name:null|null']],//东王公√
	'sgsh_xiwangmu':['female','shen',3,['sgsk_kunlun','sgsk_huasheng'],['rankAdd:legend','rankS:s','name:null|null']],//西王母√
	'sgsh_huaxu':['female','shen',3,['sgsk_talei','sgsk_yunyuu'],['rankAdd:rare','name:null|null']],//华胥√
	sgsh_yaoji:['female','shen',3,['sgsk_yunyu','sgsk_mengzhen'],['rankAdd:legend','rankS:s','name:null|null']],//瑶姬
	sgsh_hongjunlaozu:['male','shen',3,['sgsk_pudu','sgsk_xiansheng'],['rankAdd:legend','rankS:s','name:null|null']],//鸿钧老祖
	sgsh_gonggong:['male','shen',4,['sgsk_taotian'],['rankAdd:legend','rankS:s','name:null|null']],//共工
	sgsh_zhurong:['male','shen',4,['sgsk_fentian'],['rankAdd:legend','rankS:s','name:null|null']],//祝融
	sgsh_goumang:['male','shen',3,['sgsk_fusang','sgsk_mangtong','sgsk_mushen'],['rankAdd:legend','rankS:s','name:null|null']],//句芒
	sgsh_houtu:['male','shen',3,['sgsk_yutu','sgsk_shengtu'],['rankAdd:legend','rankS:s','name:null|null']],//后土
	'sgsh_yuqiang':['male','shen',4,['sgsk_zhihai','sgsk_xuanming'],['rankAdd:junk','name:null|null']],//禺强√
	
	sgsh_fuxi:['male','shen',4,['sgsk_yuhan','sgsk_jiabian'],['rankAdd:legend','rankS:s','name:null|null']],//伏羲
	sgsh_xiangliu:['male','shen',4,['sgsk_jiushou'],['rankAdd:legend','rankS:s','name:null|null']],//相柳
	sgsh_houyi:['male','shen',4,['sgsk_sheri'],['rankAdd:legend','rankS:s','name:null|null']],//后羿
	'sgsh_dayu':['male','shen',4,['sgsk_zhishui'],['rankAdd:epic','name:null|null']],//大禹√
	sgsh_kuafu:['male','shen',4,['sgsk_zhuirix'],['rankAdd:legend','rankS:s','name:null|null']],//夸父
	sgsh_tubo:['male','shen',3,['sgsk_xuemu','sgsk_jiuqu'],['rankAdd:legend','rankS:s','name:null|null']],//土伯
	'sgsh_jingwei':['female','shen',3,['sgsk_xianmu','sgsk_tianhai'],['rankAdd:legend','rankS:s','name:null|null']],//精卫
	sgsh_qibo:['male','shen',3,['sgsk_suwen','sgsk_lingjiu'],['rankAdd:legend','rankS:s','name:null|null']],//岐伯
	'sgsh_taizichangqin':['male','shen',3,['sgsk_yuefeng','sgsk_zhisheng'],['rankAdd:legend','rankS:s','name:null|null']],//太子长琴√
	sgsh_yeming:['male','shen',3,['sgsk_cunyin','sgsk_sanqiuy'],['rankAdd:legend','rankS:s','name:null|null']],//噎鸣
	
	'sgsh_yinglong':['male','shen',4,['sgsk_zongshui'],['rankAdd:epic','name:null|null']],//应龙√
	// 'sgsh_nvba':['female','shen',3,['sgsk_buyu','sgsk_hanshenx'],['rankAdd:epic','name:null|null']],//女魃√
	sgsh_nvba:{
		sex: "female",
		group: "shen",
		groupInGuozhan: "qun",
		hp: 3,
		skills: ['sgsk_buyu','sgsk_hanshenx'],
		names: "null|null",
		rankAdd:'epic',
		linkTo:'hanba',
	},
	'sgsh_chiyou':['male','shen',5,['sgsk_zhanshen'],['rankAdd:legend','rankS:s','name:null|null']],//蚩尤
	sgsh_fenghou:['female','shen',3,['sgsk_sinan','sgsk_shence'],['rankAdd:legend','rankS:s','name:null|null']],//风后
	sgsh_jiutianxuannv:['female','shen',3,['sgsk_taolue','sgsk_xuanjiy'],['rankAdd:legend','rankS:s','name:null|null']],//九天玄女
	sgsh_luozu:['female','shen',3,['sgsk_sangcan','sgsk_bianjuany'],['rankAdd:legend','rankS:s','name:null|null']],//螺祖
	sgsh_cangjie:['male','shen',3,['sgsk_zuoshu'],['rankAdd:legend','rankS:s','name:null|null']],//仓颉
	'sgsh_limu':['male','shen',4,['sgsk_qianjun'],['rankAdd:rare','name:null|null']],//力牧
	sgsh_changxian:['male','shen',4,['sgsk_zhangu','sgsk_sanggu'],['rankAdd:legend','rankS:s','name:null|null']],//常先
	sgsh_guiyuqu:['male','shen',3,['sgsk_zhanxing','sgsk_wuxing'],['rankAdd:legend','rankS:s','name:null|null']],//鬼臾区

	sgsh_shijiamouni:['male','shen',4,['sgsk_dianhua','sgsk_wuwo'],['rankAdd:legend','rankS:s','name:null|null']],//释迦牟尼
	'sgsh_luohou':['male','shen',4,['sgsk_yueshi'],['rankAdd:epic','name:null|null']],//罗睺√
	'sgsh_xingtian':['male','shen',4,['sgsk_fuchou'],['rankAdd:epic','name:null|null']],//刑天√



	//忆包新将
	// 'ybsl_107tushanshuili':['female','YB_dream',3,['yb107_xunhu','QQQ107_taye','QQQ107_yaoyi'],['rankAdd:epic','name:涂山|水璃']], //涂山水璃
	//群友共创
	ybsl_xuyou:['male','qun',3,['ybsl_zigong','ybsl_zicai'],['rankAdd:legend','rankS:s','name:许|攸','linkTo:xuyou']], //许攸
	niya_re_liuyan:['male','qun',3,['niya_limu','niya_tushe'],['rankAdd:legend','rankS:s','linkTo:liuyan','tempname:liuyan','YB_mjz:liuyan']], //刘焉
	niya_caowei:['female','qun','3/4',['niya_youbo','niya_anren','niya_xuantu'],['rankAdd:legend','rankS:s']], //曹微
	Fe2O3_duqiong:['male','shu',3,['Fe2O3_huishi','Fe2O3_xingchen'],['rankAdd:epic','rankS:a']],//杜琼
	zxunnamed_zhenji : {
		sex : 'female',
		group : 'wei',
		hp : 3,
		skills : ['zxunnamed_qinglan', 'zxunnamed_lingbo'],
	},//甄宓
	Fe2O3_zixu : {
		group : 'qun',
		sex : 'male',
		hp : 3,
		skills : ['Fe2O3_shuding', 'Fe2O3_titi'],
		names : 'null|null'
	},//紫虚
	Fe3O4_guanyu : {
		group : 'wei',
		sex : 'male',
		hp : 4,
		skills : ['Fe3O4_jinxiao', 'Fe3O4_danji']
	},//关羽
	Fe2O3_zhugeliang : {
		group : 'shu',
		sex : 'male',
		hp : 3,
		skills : ['Fe2O3_guanji', 'Fe2O3_weixuan'],
		names : '诸葛|亮'
	},//诸葛亮
	
	
	
	
	//key
	yb_key_hina:['female','shen',3,['hina_ybshenshi','hina_xingzhi'],['doublegroup:key:shen','rankAdd:legend','rankS:s','name:佐藤|雏','linkTo:db_key_hina','YB_mjz:db_key_hina','tempname:db_key_hina']],//佐藤雏
	yb_key_kotori:['female','key',3,['kotori_ybyumo','kotori_ybhuazhan'],['rankAdd:legend','rankS:s','name:神户|小鸟','linkTo:key_kotori','YB_mjz:key_kotori','tempname:key_kotori']],//神户小鸟
	yb_key_kagari:["female","shen",3,["kagari_ybzongsi"],['rankAdd:legend','rankS:s','name:null|null','linkTo:key_kagari','YB_mjz:key_kagari','tempname:key_kagari']],//篝
	
	ybsl_youta:['male','key',4,['youta_fengshen','youta_yingshen','youta_huanshen'],['rankAdd:legend','rankS:s','linkTo:key_youta','YB_mjz:key_youta','tempname:key_youta']],
	ybsl_kamome:["female","key",3,["kamome_ybyangfan",'kamome_huanmeng','kamome_jieban'],['rankAdd:legend','rankS:s','name:null|鸥','linkTo:key_kamome']],//鸥
	ybsl_hairi:['male','key',1,['hairi_shangshi','hairi_zheyi','hairi_zhongxia'],['rankAdd:epic','rankS:a','name:鹰原|羽依里']],
	
	sp_key_umi:['female','key',3,['caiyi','guili'],['rankAdd:epic','rankS:a','name:加藤|うみ','linkTo:key_umi']],
	

	//冷门民杀搬运
	ybslshen_zhenji:['female','shen',3,['ybsl_zjzilian','ybsl_zjsqiyuan','ybsl_zjsshixiang'],['wei','rankAdd:legend','rankS:s','name:甄|宓','linkTo:shen_zhenji']],
	//夜白杂设
	ybsl_pujing:['male','qun',4,['ybsl_reshidao','ybsl_duhun'],['rankAdd:epic','rankS:a','linkTo:pujing','name:null|null']],
	//别群比赛
	ybsl_lvyi:['male','shu',3,['ybsl_jianyue','ybsl_tuntian','ybsl_quanfan'],['rankAdd:legend','rankS:s','name:吕|乂']], //吕乂
	ybsl_yinfan:['male','wei',3,['ybsl_quanbianx','zhaxiang'],['rankAdd:epic',"border:wu",'name:隐|蕃']], //隐蕃
	ybsl_shlizhaoyi:['female','shu',3,['ybsl_ranxinx','ybsl_fuju'],['rankAdd:legend','rankS:s','name:李|昭仪']], //李昭仪
	ybsl_sunsháo:['male','wu',3,['ybsl_rongjie','ybsl_xiangcha'],['rankAdd:legend','rankS:s','name:孙|韶','YB_mjz:sunsháo','linkTo:sunsháo']], //孙韶
	ybsl_wangbi:['male','wei',4,['ybsl_xijian','ybsl_yedun'],['rankAdd:legend','rankS:s','name:王|必']], //王必
	ybnb_wangbi:['male','wei',4,['ybsl_xijian','ybsl_yedunx'],['rankAdd:legend','rankS:s','name:王|必','linkTo:ybsl_wangbi']], //王必]
	ybsl_jiangziwen:['male','wu',3,['ybsl_fengcix','ybsl_youxiangx'],['rankAdd:epic','name:蒋|歆']],//蒋歆
	ybsl_suojing:['male','jin',4,['ybsl_feimo','ybsl_benzhan'],['rankAdd:epic','name:索|靖','unseen']],//索靖
	ybsl_wangpou:['male','wei',3,['ybsl_zhelei','ybsl_xunxiao','ybsl_wanbie'],['rankAdd:rare',"border:jin"]],//王裒
	ybsl_yangxu:['male','qun',3,['ybsl_kanxiao','ybsl_shipin'],['rankAdd:epic']],//羊续
	ybsl_shichong:['male','jin',3,['ybsl_shehao','ybsl_jiegu','ybsl_daixin'],['rankAdd:legend']],//石崇
	//宗族武将
	//吴郡陆氏
	ybslclan_luji:['male','wu',3,['ybsl_ljfumin','ybsl_ljguihang','ybsl_clanxingzu'],['rankAdd:epic','clan:吴郡陆氏','name:陆|绩','linkTo:luji']], //族陆绩
	ybslclan_luxun:['male','wu',3,['ybsl_lxtujing','ybsl_lxweiyu','ybsl_clanxingzu'],['rankAdd:epic','clan:吴郡陆氏','name:陆|逊','linkTo:luxun']], //族陆逊
	ybslclan_luyan:['male','wu',3,['ybsl_lyyaoe','tiandu','ybsl_lykangming','ybsl_clanxingzu'],['rankAdd:epic','clan:吴郡陆氏','name:陆|延']], //族陆延
	//一将成名
	ybslshen_pangtong:['male','shen',3,['ybsl_ptchiling','ybsl_ptqiwu'],['rankAdd:epic','name:庞|统','linkTo:shen_pangtong']],

	//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
}
