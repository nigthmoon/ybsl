import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { characterTitle }

const characterTitle = {//称号
	//---------------------------------//上古神话
	
	//-----------------------上古神话专题---------------------------//
	
	sgsh_tiandi:'<span class=yellowtext>天庭主宰</span>',
	sgsh_shennong:'<span class=yellowtext>炎帝</span>',
	sgsh_xuanyuan:'<span class=yellowtext>黄帝</span>',
	sgsh_shaohao:'<span class=yellowtext>华夏首领</span>',
	sgsh_zhuanxu:'<span class=yellowtext>玄帝</span>',
	sgsh_qinglong:'<span class=yellowtext>神兽</span>',
	sgsh_baihu:'<span class=yellowtext>神兽</span>',
	sgsh_zhuque:'<span class=yellowtext>神兽</span>',
	sgsh_xuanwu:'<span class=yellowtext>神兽</span>',
	sgsh_qilin:'<span class=yellowtext>神兽</span>',
	sgsh_dongwanggong:'<span class=yellowtext>东华帝君</span>',
	sgsh_xiwangmu:'<span class=yellowtext>金母</span>',
	sgsh_huaxu:'<span class=yellowtext>伏羲之母</span>',
	sgsh_yaoji:'<span class=yellowtext>巫山神女</span>',
	sgsh_hongjunlaozu:'<span class=yellowtext>大道之显化</span>',
	sgsh_gonggong:'<span class=yellowtext>水神</span>',
	sgsh_zhurong:'<span class=yellowtext>火神</span>',
	sgsh_goumang:'<span class=yellowtext>木神</span>',
	sgsh_houtu:'<span class=yellowtext>土神</span>',
	sgsh_yuqiang:'<span class=yellowtext>海神</span>',
	sgsh_fuxi:'<span class=yellowtext>牺皇</span>',
	sgsh_xiangliu:'<span class=yellowtext>九首凶神</span>',
	sgsh_houyi:'<span class=yellowtext>弓神</span>',
	sgsh_dayu:'<span class=yellowtext>夏后氏首领</span>',
	sgsh_kuafu:'<span class=yellowtext>洪荒之力</span>',
	sgsh_tubo:'<span class=yellowtext>鬼帝</span>',
	sgsh_jingwei:'<span class=yellowtext>炎帝之少女</span>',
	sgsh_qibo:'<span class=yellowtext>古之神医</span>',
	sgsh_taizichangqin:'<span class=yellowtext>乐神</span>',
	sgsh_yeming:'<span class=yellowtext>时间之神</span>',
	sgsh_yinglong:'<span class=yellowtext>纵水龙将</span>',
	sgsh_nvba:'<span class=yellowtext>不雨旱神</span>',
	sgsh_chiyou:'<span class=yellowtext>九黎部首领</span>',
	sgsh_fenghou:'<span class=yellowtext>开辟丞相</span>',
	sgsh_jiutianxuannv:'<span class=yellowtext>九天娘娘</span>',
	sgsh_luozu:'<span class=yellowtext>黄帝之正妃</span>',
	sgsh_cangjie:'<span class=yellowtext>创字圣人</span>',
	sgsh_limu:'<span class=yellowtext>异力神将</span>',
	sgsh_changxian:'<span class=yellowtext>士气的掌控者</span>',
	sgsh_guiyuqu:'<span class=yellowtext>帝之占星师</span>',
	sgsh_shijiamouni:'<span class=yellowtext>阿弥陀佛</span>',
	sgsh_luohou:'<span class=yellowtext>流星之王</span>',
	sgsh_xingtian:'<span class=yellowtext>与天争辉</span>',
	
	
	
	//--------------群友共创---------------------//
	
	ybsl_xuyou: '夜白设计',
	ybsl_pujing: '夜白设计',
	
	niya_re_liuyan:'裂土之宗',
	niya_caowei:'',
	Fe2O3_duqiong:'蜀之球琳',
	zxunnamed_zhenji:'',
	Fe2O3_zixu:'',
	Fe3O4_guanyu:'',
	Fe2O3_zhugeliang:'',
	Fe2O3_zhaoyun:'',
	ddddssssbbbb_dengai:'',
	zxunnamed_gongsunyuan:'',
	FeO3_zhugeliang:'',
	Fe343_zhugeliang:'',
	
	
	
	//冷门民杀搬运
	ybslshen_zhenji:'',
	//夜白杂设

	ybsl_kamome:'',
	ybsl_hairi:'',
	sp_key_umi:'',

	yb_key_hina:'',
	ybsl_youta:'',
	yb_key_kotori:'',
	yb_key_kagari:'',


	//别群比赛
	ybsl_lvyi: '汉尚书令',
	ybsl_yinfan: '啼血的谍客',
	ybsl_shlizhaoyi: '抗拒火环',
	ybsl_sunsháo: '知而后动',
	ybsl_wangbi: '倾厦之梁',
	ybnb_wangbi: '倾厦之梁',
	ybsl_jiangziwen:'骨清为神',
	ybsl_suojing: '铜驼荆棘',
	ybsl_wangpou:'闻雷泣墓',
	ybsl_yangxu:'悬鱼太守',
	ybsl_shichong:'蜡炬作炊',
	
	//宗族武将
	//吴郡陆氏
	ybslclan_luji:'',
	ybslclan_luxun:'',
	ybslclan_luyan:'',
	//一将成名
	ybslshen_pangtong:'',

	
	bilibiliup_jiangali:'\u9ca4\u6210\u7891',//
	bilibiliup_guanyueliuli:'\u9c7cai\u55b5',//
	bilibiliup_sunyuyou:'\u5e7d\u732b\u5bce',//
	bilibiliup_shianshan:'\u6749Q',//
	bilibiliup_roubaozi:'\u9999\u8349\u5305	',//
	bilibiliup_baitaosuyu:'\u5fe7\u9c7c\u75c7',//
	bilibiliup_wanqinsin:'\u5c0f\u5a49\u5154',//
	bilibiliup_xiyeqianzhi:'\u679d\u58eb\u9f20',//
	bilibiliup_lulinxikoi:'\u9e23\u4e8e\u6708',//	//\u9e7f\u521d\u96ea
	bilibiliup_xilingna:'\u5e0c\u6b27\u6c17',//
	bilibiliup_jiligulu:'\u8d85\u7231\u9732',//
	bilibiliup_maomaobaobao:'\u949f\u610f\u732b',//
	bilibiliup_wenyuexu:'\u54b2\u5bb5\u591c',//
	bilibiliup_xueyuer:'\u9cd5\u55b5\u9c7c',//
	bilibiliup_qingxiaozhi:'\u7b71\u6674\u4eba',//
	bilibiliup_qinian:'S\u4e03\u5e74',//
	bilibiliup_menglingli:'\u7262\u9ca4\u6c0f',//
	bilibiliup_xueyunshang:'\u604b\u9713\u88f3',//
	bilibiliup_xingyao:'',
	bilibiliup_zhezhi:'\u8354\u5c0f\u5431',//	
	bilibiliup_xiazhisha:'\u7eb1\u7eb1\u4ec1',//
	bilibiliup_qiyuan:'\u82d1\u5927\u5934',//
	bilibiliup_xinglisisi:'\u5fc6\u4e1d\u4e1d',//
	bilibiliup_rongxiaoxuan:'\u65f6\u4e4b\u8431',//
	bilibiliup_shimizai:'\u65f6\u5f25\u5d3d',
	bilibiliup_linnannanya:'\u5583\u5c0f\u5b9d',//
	bilibiliup_wanyue:'\u9065\u633d\u73a5',//
	bilibiliup_taomoran:'',
	bilibiliup_xiaotaosheng:'\u6843\u7b19\u7b19',//
	bilibiliup_suilin:'\u4e09\u767e\u5c81',//	
	bilibiliup_baozai:'\u6c49\u9971\u9601',//
	bilibiliup_mixieer:'\u7c73MI\u56e2',//
	bilibiliup_shishi:'\u604b\u8671\u7656',//
	bilibiliup_qingling:'\u5c0f\u4ed9\u7fce',//
	bilibiliup_xiaoaijiang:'\u9171\u603b\u88c1',//
	bilibiliup_xinqi:'\u987e\u5c71\u6d77',//
	bilibiliup_lushi:'\u542f\u793a\u9e7f',//
	bilibiliup_tutu:'\u6ca1\u94b1\u837c',//
	bilibiliup_haitang:'\u68e0\u68e0\u54aa',//
	bilibiliup_shunhua:'\u6d41\u5149\u8bcd',//

}