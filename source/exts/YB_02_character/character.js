import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { character }

const character = { //武将格式 : 
	'ybart_013yinji':['female','YB_memory',3,['yb017_shanwu','dz013_qingling'],['rankAdd:epic','name:尹|姬','linkTo:ybsl_013yinji']],//尹姬
	'ybart_014liutianyu':['male','YB_memory',4,['yb014_shifu','yb014_huanlei'],['rankAdd:legend','name:夜|白','linkTo:ybsl_014liutianyu']],//夜白
	'ybart_016manchengqi':['female','YB_memory',4,['dz016_zanxu','yb017_shanwu'],['rankAdd:epic','name:满城|柒','linkTo:ybsl_016manchengqi']],//满城柒
	'ybart_017xiaohong':['female','YB_memory',3,['yb017_luming','yb017_zhengxiong','yb017_shanwu'],['rankAdd:legend','name:涂山|小红','linkTo:ybsl_017xiaohong']],//涂山小红
	'ybart_041mmuqin':['female','YB_memory',3,['yb041_juxin','yb041_sange'],['rankAdd:epic','name:慕|琴'/*,'name:崔|妍'*/,'linkTo:ybsl_041mmuqin']],//慕琴
	//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
}
