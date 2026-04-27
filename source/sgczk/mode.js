import { lib, game, ui, get, ai, _status } from "../../../../noname.js";
export { sgczk }
// export const type = "mode";
// /**
//  * @type { () => importModeConfig }
//  */
// export default sgczk = () => {
//     return {
//         name: 'sgczk',
//         game:{

//         },
//     }
// }
var sgczk = function () {
	game.addMode(
		"sgczk",
		{
			name: "sgczk",
            start:function(){
                
            },
		},
		{
			translate: "三国策战卡",
			extension: "三国策战卡",
		}
	);
};
// export default sgczk;
