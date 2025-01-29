import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { character }

const character = { //武将格式 : 
	//------------------------上古神话
	sgsh_huaxu:{
		sex: "female",
		group: "shen",
		groupInGuozhan: "qun",
		hp: 3,
		skills: ['sgsh_talei','sgsh_yunyuu'],
		names: "null|null",
		yb_rank:'rare',
	},
	// 'sgsh_huaxu':['female','shen',3,['sgsh_talei','sgsh_yunyuu'],['rare']],//华胥
	'sgsh_taizichangqin':['male','shen',3,['sgsh_yuefeng','sgsh_zhisheng'],['legend','name:null|null']],//太子长琴
	'sgsh_nvba':['female','shen',3,['sgsh_buyu','sgsh_hanshenx'],['epic','name:null|null']],//女魃
	'sgsh_luohou':['male','shen',4,['sgsh_yueshi'],['epic','name:null|null']],//罗睺
	'sgsh_dongwanggong':['male','shen',3,['sgsh_baigong','sgsh_cangling'],['legend','name:null|null']],//东王公
	'sgsh_yinglong':['male','shen',4,['sgsh_zongshui'],['epic','name:null|null']],//应龙
	'sgsh_xingtian':['male','shen',4,['sgsh_fuchou'],['epic','name:null|null']],//刑天
	'sgsh_xiwangmu':['female','shen',3,['sgsh_kunlun','sgsh_huasheng'],['legend','name:null|null']],//西王母
	'sgsh_yuqiang':['male','shen',4,['sgsh_zhihai','sgsh_xuanming'],['junk','name:null|null']],//禺强
	'sgsh_dayu':['male','shen',4,['sgsh_zhishui'],['epic','name:null|null']],//大禹
	//忆包新将
	// 'ybsl_107tushanshuili':['female','YB_dream',3,['yb107_xunhu','QQQ107_taye','QQQ107_yaoyi'],['epic','name:涂山|水璃']], //涂山水璃
	//群友共创
	ybsl_xuyou:['male','qun',3,['ybsl_zigong','ybsl_zicai'],['legend','name:许|攸','linkTo:xuyou']], //许攸
	//冷门民杀搬运
	ybslshen_zhenji:['female','shen',3,['ybsl_zjzilian','ybsl_zjsqiyuan','ybsl_zjsshixiang'],['wei','legend','name:甄|姬','linkTo:shen_zhenji']],
	//夜白杂设
	ybsl_hairi:['male','key',1,['hairi_shangshi','hairi_zheyi','hairi_zhongxia'],['epic','name:鹰原|羽依里']],
	sp_key_umi:['female','key',3,['caiyi','guili'],['epic','name:加藤|うみ','linkTo:key_umi']],
	//别群比赛
	ybsl_lvyi:['male','shu',3,['ybsl_jianyue','ybsl_tuntian','ybsl_quanfan'],['legend','name:吕|乂']], //吕乂
	ybsl_yinfan:['male','wei',3,['ybsl_quanbianx','zhaxiang'],['epic',"border:wu",'name:隐|蕃']], //隐蕃
	ybsl_shlizhaoyi:['female','shu',3,['ybsl_ranxin','ybsl_fuju'],['legend','name:李|昭仪']], //李昭仪
	ybsl_sunshaoo:['male','wu',3,['ybsl_rongjie','ybsl_xiangcha'],['legend','name:孙|韶']], //孙韶
	//宗族武将
	//吴郡陆氏
	ybslclan_luji:['male','wu',3,['ybsl_ljfumin','ybsl_ljguihang','ybsl_clanxingzu'],['epic','clan:吴郡陆氏','name:陆|绩','linkTo:luji']], //族陆绩
	ybslclan_luxun:['male','wu',3,['ybsl_lxtujing','ybsl_lxweiyu','ybsl_clanxingzu'],['epic','clan:吴郡陆氏','name:陆|逊','linkTo:luxun']], //族陆逊
	ybslclan_luyan:['male','wu',3,['ybsl_lyyaoe','tiandu','ybsl_lykangming','ybsl_clanxingzu'],['epic','clan:吴郡陆氏','name:陆|延']], //族陆延
	//一将成名
	ybslshen_pangtong:['male','shen',3,['ybsl_ptchiling','ybsl_ptqiwu'],['epic','name:庞|统','linkTo:shen_pangtong']],

	//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
}
