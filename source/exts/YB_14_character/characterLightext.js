import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { characterLightext ,characterLightextParent}
const characterLightextParent = {
}
const characterLightext={}
// const characterLightext = {
// 	ybsl_020jiayutong:function(player){
// 		var list=[['副将搭配房佳瑜，手牌上限+1',{
// 			forced:true,
// 			YB_filterOk:function(player){
// 				return player.name=='ybsl_020jiayutong'&&player.name2&&player.name2=='ybsl_043fangjiayu';
// 			},
// 			mod:{
// 				maxHandcard:function(player,num){
// 					if(player.name2&&player.name2=='ybsl_043fangjiayu')
// 						return num+1;
// 					else return num;
// 				}
// 			}
// 		}]];
// 		return get.characterLightext(list,player);
// 	},
// 	ybsl_043fangjiayu:function(player){
// 		var list=[['副将搭配贾雨桐，摸牌阶段额外摸一张牌',{
// 			forced:true,
// 			trigger:{
// 				player:'phaseDrawBegin',
// 			},
// 			YB_filterOk:function(player){
// 				return player.name=='ybsl_043fangjiayu'&&player.name2&&player.name2=='ybsl_020jiayutong';
// 			},
// 			filter:function(event,player){
// 				return player.name2&&player.name2=='ybsl_020jiayutong';
// 				// return true;
// 			},
// 			content:function(){
// 				trigger.num++;
// 			},
// 		}]];
// 		return get.characterLightext(list,player);
// 	},
// }