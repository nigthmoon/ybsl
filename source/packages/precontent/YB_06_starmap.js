import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { YBSL_starmap }
/**
 * 此处适配子虚流云的星图功能
 * 还没有全部加上，因为子虚也在鸽
 */
const YBSL_starmap = function(){
	{//流云乱入
		lib.arenaReady.push(function(){
			if(lib.zxlyrelationship)lib.zxlyrelationship.YB_memory = {
				ybsl_001sunlisong:{
					friendly : {
						ybsl_002chenailin : '闺蜜',
						ybsl_006wanghanzhen : '闺蜜',
					},
					hostile : {
					},
					neutral : {
					}
				},
				ybsl_002chenailin:{
					friendly : {
						ybsl_001sunlisong : '闺蜜',
						ybsl_006wanghanzhen : '闺蜜',
					},
					hostile : {
					},
					neutral : {
					}
				},
				ybsl_006wanghanzhen:{
					friendly : {
						ybsl_002chenailin : '闺蜜',
						ybsl_001sunlisong : '闺蜜',
					},
					hostile : {
					},
					neutral : {
					}
				},

			}
			// relationship
	// YB_memory:{
	// 	ybsl_001sunlisong:{
	// 		friendly : {
	// 			ybsl_002chenailin : '闺蜜',
	// 			ybsl_006wanghanzhen : '闺蜜',
	// 		},
	// 		hostile : {
	// 		},
	// 		neutral : {
	// 		}
	// 	},
	// 	ybsl_002chenailin:{
	// 		friendly : {
	// 			ybsl_001sunlisong : '闺蜜',
	// 			ybsl_006wanghanzhen : '闺蜜',
	// 		},
	// 		hostile : {
	// 		},
	// 		neutral : {
	// 		}
	// 	},
	// 	ybsl_006wanghanzhen:{
	// 		friendly : {
	// 			ybsl_002chenailin : '闺蜜',
	// 			ybsl_001sunlisong : '闺蜜',
	// 		},
	// 		hostile : {
	// 		},
	// 		neutral : {
	// 		}
	// 	},
	// }
		})
	}
}