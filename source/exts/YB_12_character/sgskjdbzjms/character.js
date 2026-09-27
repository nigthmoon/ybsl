import { lib, game, ui, get, ai, _status } from '../../../../../../noname.js';
export { character };

/** @type { importCharacterConfig['character'] } */
const character = {
	// sgskjdbzjms_zrshenmoyi:['male','qun',4,['sgskjdbzjms_smyhengcai'],['rankAdd:legend','rankS:s']],
	// sgskjdbzjms_zrzhenghao:['male','qun',4,[],['rankAdd:epic','rankS:a']],
	// sgskjdbzjms_zrzhaoyoubo:['male','qun',4,[],['rankAdd:epic','rankS:a']],

	sgskjdbzjms_mo_zhoutai: ['male', 'devil', 4, ['sgskjdbzjms_tiequ', 'sgskjdbzjms_xieren', 'sgskjdbzjms_cuiti'], ['rankAdd:rare', 'rankS:b', 'linkTo:zhoutai', 'YB_mjz:zhoutai', 'tempname:zhoutai', 'wu']],
	sgskjdbzjms_shen_zhugeliang: ['male', 'shen', 4, ['sgskjdbzjms_zhongwu', 'qixing', 'sgskjdbzjms_kuangfeng', 'dawu', 'sgskjdbzjms_tianshi'], ['rankAdd:legend', 'rankS:s', 'linkTo:shen_zhugeliang', 'YB_mjz:shen_zhugeliang', 'tempname:shen_zhugeliang', 'shu']],
	sgskjdbzjms_leizhenzi: ['male', 'shen', 3, ['sgskjdbzjms_leishen', 'sgskjdbzjms_jiangxing', 'sgskjdbzjms_leifa', 'sgskjdbzjms_fenglei'], ['rankAdd:legend', 'rankS:s', 'qun', 'name:null|null']],
	sgskjdbzjms_xian_zhugeguo: ['female', 'shen', 3, ['sgskjdbzjms_qirang', 'sgskjdbzjms_cifu', 'sgskjdbzjms_yuhua'], ['rankAdd:legend', 'rankS:s', 'linkTo:zhugeguo', 'YB_mjz:zhugeguo', 'shu']],
	sgskjdbzjms_zhen_zhangfei: ['male', 'shu', '4/6', ['sgskjdbzjms_paoxiao', 'sgskjdbzjms_kuangbao', 'sgskjdbzjms_yinhen'], ['rankAdd:junk', 'rankS:d', 'linkTo:re_zhangfei', 'YB_mjz:re_zhangfei']],
	sgskjdbzjms_zhen_guanyu: ['male', 'shu', 4, ['sgskjdbzjms_wusheng', 'sgskjdbzjms_danji', 'sgskjdbzjms_fujun'], ['rankAdd:legend', 'rankS:s', 'linkTo:re_guanyu', 'YB_mjz:wu_guanyu']],
	sgskjdbzjms_shen_liubei: ['male', 'shen', 4, ['sgskjdbzjms_zhaolie', 'sgskjdbzjms_rende', 'sgskjdbzjms_taoyuan'], ['rankAdd:epic', 'rankS:a', 'linkTo:shen_liubei', 'YB_mjz:shen_liubei', 'shu']],
	sgskjdbzjms_zhen_machao: ['male', 'shu', 4, ['retieji', 'sgskjdbzjms_mashu', 'sgskjdbzjms_shenweitianjiangjun'], ['rankAdd:legend', 'rankS:s', 'linkTo:re_machao', 'YB_mjz:shen_machao']],
	sgskjdbzjms_zhen_liubei: ['male', 'shu', 4, ['sgskjdbzjms_rende', 'sgskjdbzjms_jieying', 'sgskjdbzjms_tuogu'], ['rankAdd:epic', 'rankS:a', 'linkTo:re_liubei', 'YB_mjz:re_liubei']],
};
