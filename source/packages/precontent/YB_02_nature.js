import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { YBSL_nature }
/**
 * 掌管如下
 * 自建属性相关
 * 自建势力相关
 * 前缀收纳
 */
const YBSL_nature = function(){
    
	{//自建属性相关
		game.addNature('YB_snow','雪',{
			linked:true,
			order:55,
			lineColor:'YB_snow',
			color:'YB_snow',
		})
		game.addNature('YB_blood','血',{
			linked:false,
			order:35,
			lineColor:'YB_mystery',
			color:'YB_mystery',
		})
		{//此处为属性杀的专属翻译
			lib.translate.sha_nature_YB_snow_info='出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】，否则你对其造成1点雪属性伤害，此属性可传导（当你造成雪属性伤害时，你可以令目标摸X张牌，然后其武将牌翻面，X为目标当前体力值且至多为5。）'
			lib.translate.sha_nature_YB_blood_info='出牌阶段，对你攻击范围内的一名角色使用。其须使用一张【闪】，否则你对其造成1点血属性伤害，此属性不可传导（锁定技，造成血属性伤害时，恢复等同伤害值的体力值。）'
		}
		// 其实这段貌似没用了↓↓
		lib.translate.YB_snowsha_info='当你造成雪属性伤害时，你可以令目标摸X张牌，然后其武将牌翻面（X为目标当前体力值且至多为5）。';
		lib.translate.YB_bloodsha_info='锁定技，造成血属性伤害时，恢复等同伤害值的体力值。';
		// 其实这段貌似没用了↑↑
		lib.skill._YB_snowsha={//------雪杀
			trigger:{
				source:'damageSource',
			},
			equipSkill:false,
			ruleSkill:true,
			shaRelated:true,
			filter:function (event,player){
				return event.hasNature('YB_snow')&&event.num>0&&event.player.isAlive();
			},
			content:function (){
				'step 0'
				trigger.player.draw(Math.min(5,trigger.player.hp));
				'step 1'
				trigger.player.turnOver();
			},
			check:function (event,player){
				if(event.player.isTurnedOver()) return get.attitude(player,event.player)>0;
				if(event.player.hp<3){
					return get.attitude(player,event.player)<0;
				}
				return get.attitude(player,event.player)>0;
			},
		};
		lib.skill._YB_bloodsha={//--------血杀
			trigger:{
				source:'damageSource',
			},
			equipSkill:false,
			direct:true,
			forced:true,
			ruleSkill:true,
			shaRelated:true,
			filter:function (event,player){
				return event.hasNature('YB_blood')&&event.num>0;
			},
			content:function (){
				player.recover(trigger.num);
			},
		};
	}
	{//自建势力相关
		game.addGroup('YB_memory','忆','回忆',{
			// color: 'YB_snow',
			color:'#28e3ce',
			// image: 'ext:夜白神略/image/card/group_YB_memory.png',
		})
		game.addGroup('YB_dream','梦','梦境',{
			// color: 'YB_mystery',
			color:'#e328b7',
			// image: 'ext:夜白神略/image/card/group_YB_dream.png',
		})
	}
	{//此处收纳前缀
		lib.namePrefix.set('废案',{
			showName:'废',
			color:'#a4a4a4',
			nature:'black',
		})
		lib.namePrefix.set('废案神',{
			getSpan:(prefix,name)=>{
				return `${get.prefixSpan('废案')}${get.prefixSpan('神')}`
			},
		})
		lib.namePrefix.set('废案SP',{
			getSpan:(prefix,name)=>{
				return `${get.prefixSpan('废案')}${get.prefixSpan('SP')}`
			},
		})
		lib.namePrefix.set('旧版',{
			showName:'废',
			color:'#a4a4a4',
			nature:'black',
		})
		lib.namePrefix.set('通渠',{
			showName:'废',
			color:'#a4a4a4',
			nature:'black',
		})
		lib.namePrefix.set('六艺',{
			showName:'艺',
			color:'#2abcff',
			nature:'thunder',
		})

		// lib.namePrefix.set('名将',{
		// 	showName:'名',
		// 	color:'#ff7b00',
		// 	nature:'black',
		// })
		lib.namePrefix.set('名将',{
			showName:'名',
			color:'#28e3ce',
			nature:'black',
		})
		lib.namePrefix.set('名将神',{
			getSpan:(prefix,name)=>{
				return `${get.prefixSpan('名将')}${get.prefixSpan('神')}`
			},
		})
		// lib.namePrefix.set('名',{
		// 	showName:'名',
		// 	color:'#ff7b00',
		// 	nature:'black',
		// })
		lib.namePrefix.set('没写完',{
			showName:'坑',
			color:'#a4a4a4',
			nature:'black',
		})
		
	}
}