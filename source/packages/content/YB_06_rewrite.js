import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
import { config } from '../config.js'
export { YBSL_rewrite }
/**
 * 本体技能加强按钮
 * 没用了，已经套给了名将传
 */
const YBSL_rewrite = function(){
	//这里用来测试无名获得晖光不能用的bug
	/*
	lib.skill.dcchushan={
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		filter: function(event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		forced: true,
		content: async function(event, trigger, player) {
			if (!_status.characterlist) lib.skill.pingjian.initList();
			_status.characterlist.randomSort();
			let characters = _status.characterlist.randomGets(6);
			characters.push("ybsl_107tushanshuili");
			const first = characters.slice(0, 3),
				last = characters.slice(3, 7);
			const skills1 = [],
				skills2 = [];
			for (let i of first) skills1.push(get.character(i, 3).randomGet());
			for (let i of last) skills2.push(get.character(i, 3).randomGet());
			const result1 = await player
				.chooseControl(skills1)
				.set("dialog", ["无名：请选择姓氏", [first, "character"]])
				.forResult();
			const gains = [];
			let surname = first[skills1.indexOf(result1.control)];
			gains.add(result1.control);
			const result2 = await player
				.chooseControl(skills2)
				.set("dialog", ["无名：请选择名字", [last, "character"]])
				.forResult();
			let name = last[skills2.indexOf(result2.control)];
			gains.add(result2.control);
			let newname = get.characterSurname(surname).randomGet()[0] + get.characterSurname(name).randomGet()[1];
			if (newname === "某") {
				newname = "无名氏";
				player.chat("终究还是落得藉藉无名...");
			}
			game.broadcastAll(
				(player, name, list) => {
					if (player.name == "dc_noname" || player.name1 == "dc_noname") player.node.name.innerHTML = name;
					if (player.name2 == "dc_noname") player.node.name2.innerHTML = name;
					player.tempname.addArray(
						list.map(name => {
							while (get.character(name).tempname.length > 0) {
								name = get.character(name).tempname[0];
							}
							return name;
						})
					);
				},
				player,
				newname,
				[surname, name]
			);
			await player.addSkills(gains);
		},
		"_priority": 0,
	}
	*/

	//-----------------------------------//
	if(config.ybsl_skillstrengthen==true){
		//--------------------佐藤雏
		// lib.character['db_key_hina']=['female','key',3,['hina_ybshenshi','hina_xingzhi'],['doublegroup:key:shen']]

		//-------------神户小鸟
		// lib.character['key_kotori']=['female','key',3,['kotori_ybyumo','kotori_ybhuazhan'],[]]
		
		/*
		<span style=\'color:#28e3ce\'>忆</span>
		<span style=\'color:#e328b7\'>梦</span>
		*/
		//-------------------张琪瑛改
		// lib.character.zhangqiying=["female","qun",3,["xinfu_ybfalu","xinfu_ybdianhua","xinfu_ybzhenyi"],[]],
		//-------------------篝
		// lib.character.key_kagari=["female","shen",3,["kagari_ybzongsi"],[]],

		//-------------------马均
		{
			// lib.skill.xinfu_jingxie1={
			// 	firstDo:true,
			// 	group:['xinfu_jingxie2'/*,'ybsl_tianhuoduan_skill'*/],
			// 	position:'he',
			// 	audio:'xinfu_jingxie',
			// 	enable:'phaseUse',
			// 	filter:function(event,player){
			// 		var he=player.getCards('he');
			// 		var list=lib.skill.xinfu_ybjingxie.getJingxie();
			// 		for(var i=0;i<he.length;i++){
			// 			if(list.includes(he[i].name)) return true;
			// 		}
			// 		return false;
			// 	},
			// 	filterCard:function(card,player){
			// 		var list=lib.skill.xinfu_ybjingxie.getJingxie();
			// 		return list.includes(card.name);
			// 	},
			// 	discard:false,
			// 	lose:false,
			// 	delay:false,
			// 	check:function(){
			// 		return 1;
			// 	},
			// 	content:function(){
			// 		'step 0'
			// 		player.showCards(cards);
			// 		'step 1'
			// 		var card=cards[0];
			// 		var bool=(get.position(card)=='e');
			// 		// var tag=[];
			// 		// // if(get.cardtag(card,'gifts')){tag.push('gifts');}
			// 		// for(var i of _status.cardtag){
			// 		// 	if(get.cardtag(card,i)){tag.push(i);}
			// 		// }
			// 		if(bool) player.removeEquipTrigger(card);
			// 		game.addVideo('skill',player,['xinfu_jingxie',[bool,get.cardInfo(card)]])
			// 		game.broadcastAll(function(card){
			// 			if(card.name=='wuxinghelingshan'){card.name='zhuque'}
			// 			if(card.name=='chiyanzhenhunqin'){card.name='zhuque'}
			// 			if(card.name=='shandian'&&card.suit=='spade'){card.name='fulei'}
			// 			if(card.name=='taigongyinfu'){card.name='fulei'}
			// 			if(card.name=='hongshui'){card.name='shandian'}
			// 			if(card.name=='huoshan'){card.name='shandian'}
			// 			if(card.name=='wutiesuolian'){card.name='fangtian'}
			// 			card.init([card.suit,card.number,'rewrite_'+card.name,card.nature/*,tag*/]);
			// 		},card);
			// 		if(bool){
			// 			var info=get.info(card);
			// 			if(info.skills){
			// 				for(var i=0;i<info.skills.length;i++){
			// 					player.addSkillTrigger(info.skills[i]);
			// 				}
			// 			}
			// 		}
			// 	},
			// 	ai:{
			// 		basic:{
			// 			order:10,
			// 		},
			// 		result:{
			// 			player:1,
			// 		},
			// 	},
			// }
			// lib.translate.xinfu_jingxie1_info='出牌阶段，你可以展示一张未强化过的【诸葛连弩】或标准包/军争包/SP包中的防具牌，<span class=yellowtext>赤兔，王追，闪电及其变种牌，洪水，火山，朱雀扇及其变种牌，倚天剑，毒，青龙刀，铜雀，护心镜</span>，然后对其进行强化。当你处于濒死状态时，你可以重铸一张防具牌，然后将体力回复至1点。'
		}
		
		//----------------------曹金玉
		{
			// lib.skill.yuqi={
			// 	audio:2,
			// 	trigger:{global:'damageEnd'},
			// 	init:function(player){
			// 		if(!player.storage.yuqi) player.storage.yuqi=[0,3,1,1];
			// 	},
			// 	getInfo:function(player){
			// 		if(!player.storage.yuqi) player.storage.yuqi=[0,3,1,1];
			// 		return player.storage.yuqi;
			// 	},
			// 	onremove:true,
			// 	usable:3,
			// 	filter:function(event,player){
			// 		var list=lib.skill.yuqi.getInfo(player);
			// 		return event.player.isIn()&&get.distance(player,event.player)<=list[0];
			// 	},
			// 	logTarget:'player',
			// 	content:function(){
			// 		'step 0'
			// 		event.list=lib.skill.yuqi.getInfo(player);
			// 		var cards=get.cards(event.list[1]);
			// 		event.cards=cards;
			// 		game.cardsGotoOrdering(cards);
			// 		var next=player.chooseToMove(true,'隅泣（若对话框显示不完整，可下滑操作）');
			// 		next.set('list',[
			// 			['牌堆顶的牌',cards],
			// 			['交给'+get.translation(trigger.player)+'（至少一张'+(event.list[2]>1?('，至多'+get.cnNumber(event.list[2])+'张'):'')+'）'],
			// 			['交给自己（至多'+get.cnNumber(event.list[3])+'张）'],
			// 		]);
			// 		next.set('filterMove',function(from,to,moved){
			// 			var info=lib.skill.yuqi.getInfo(_status.event.player);
			// 			if(to==1) return moved[1].length<info[2];
			// 			if(to==2) return moved[2].length<info[3];
			// 			return true;
			// 		});
			// 		next.set('processAI',function(list){
			// 			var cards=list[0][1].slice(0).sort(function(a,b){
			// 				return get.value(b,'raw')-get.value(a,'raw');
			// 			}),player=_status.event.player,target=_status.event.getTrigger().player;
			// 			var info=lib.skill.yuqi.getInfo(_status.event.player);
			// 			var cards1=cards.splice(0,Math.min(info[3],cards.length-1));
			// 			var card2;
			// 			if(get.attitude(player,target)>0) card2=cards.shift();
			// 			else card2=cards.pop();
			// 			return [cards,[card2],cards1];
			// 		});
			// 		next.set('filterOk',function(moved){
			// 			return moved[1].length>0;
			// 		});
			// 		'step 1'
			// 		if(result.bool){
			// 			var moved=result.moved;
			// 			cards.removeArray(moved[1]);
			// 			cards.removeArray(moved[2]);
			// 			while(cards.length){
			// 				ui.cardPile.insertBefore(cards.pop().fix(),ui.cardPile.firstChild);
			// 			}
			// 			// trigger.player.gain(moved[1],'gain2');
			// 			// if(moved[2].length) player.gain(moved[2],'gain2');
			// 			var list=[[trigger.player,moved[1]]];
			// 			if(moved[2].length) list.push([player,moved[2]]);
			// 			game.loseAsync({
			// 				gain_list:list,
			// 				giver:player,
			// 				animate:'gain2',
			// 			}).setContent('gaincardMultiple');
			// 		}
					
			// 	},
			// 	mark:true,
			// 	intro:{
			// 		content:function(storage,player){
			// 			var info=lib.skill.yuqi.getInfo(player);
			// 			return '<div class="text center"><span class=thundertext>蓝色：'+info[0]+'</span>　<span class=firetext>红色：'+info[1]+'</span><br><span class=greentext>绿色：'+info[2]+'</span>　<span class=yellowtext>黄色：'+info[3]+'</span></div>'
			// 		},
			// 	},
			// 	ai:{
			// 		threaten:8.8,
			// 	},
			// }
			// lib.skill.shanshen={
			// 	audio:2,
			// 	trigger:{global:'die'},
			// 	direct:true,
			// 	content:function(){
			// 		'step 0'
			// 		event.goon=!player.hasAllHistory('sourceDamage',function(evt){
			// 			return evt.player==trigger.player;
			// 		});
			// 		var list=lib.skill.yuqi.getInfo(player);
			// 		player.chooseControl('<span class=thundertext>蓝色('+list[0]+')</span>',
			// 							'<span class=firetext>红色('+list[1]+')</span>',
			// 							'<span class=greentext>绿色('+list[2]+')</span>',
			// 							'<span class=yellowtext>黄色('+list[3]+')</span>',
			// 							'cancel2').set('prompt',get.prompt('shanshen')).set('prompt2',
			// 																				'令〖隅泣〗中的一个数字+2'+(event.goon?'并回复1点体力':'')).set(
			// 			'ai',function(){
			// 			var player=_status.event.player,info=lib.skill.yuqi.getInfo(player);
			// 			if(info[0]<info[3]&&game.countPlayer(function(current){
			// 				return get.distance(player,current)<=info[0];
			// 			})<Math.min(3,game.countPlayer())) return 0;
			// 				if(info[3]<info[1]-1) return 3;
			// 				if(info[1]<10) return 1;
			// 				if(info[0]<5&&game.hasPlayer(function(current){
			// 					return current!=player&&get.distance(player,current)>info[0];
			// 				})) return 0;
			// 				return 2;
			// 			});
			// 		'step 1'
			// 		if(result.control!='cancel2'){
			// 			if(result.index==1){var k=10}
			// 			else{var k=5}
			// 			player.logSkill('shanshen',trigger.player);
			// 			var list=lib.skill.yuqi.getInfo(player);
			// 			list[result.index]=Math.min(k,list[result.index]+2);
			// 			game.log(player,'将',result.control,'数字改为','#y'+list[result.index])
			// 			player.markSkill('yuqi');
			// 			if(event.goon) player.recover();
			// 		}
			// 	},
			// }
			// lib.skill.xianjing={
			// 	audio:2,
			// 	trigger:{player:'phaseZhunbeiBegin'},
			// 	direct:true,
			// 	content:function(){
			// 		'step 0'
			// 		var list=lib.skill.yuqi.getInfo(player);
			// 		player.chooseControl('<span class=thundertext>蓝色('+list[0]+')</span>',
			// 							'<span class=firetext>红色('+list[1]+')</span>',
			// 							'<span class=greentext>绿色('+list[2]+')</span>',
			// 							'<span class=yellowtext>黄色('+list[3]+')</span>','cancel2').set(
			// 			'prompt',get.prompt('xianjing')).set('prompt2','令〖隅泣〗中的一个数字+1').set('ai',
			// 																				function(){
			// 			var player=_status.event.player,info=lib.skill.yuqi.getInfo(player);
			// 			if(info[0]<info[3]&&game.countPlayer(function(current){
			// 				return get.distance(player,current)<=info[0];
			// 			})<Math.min(3,game.countPlayer())) return 0;
			// 			if(info[3]<info[1]-1) return 3;
			// 			if(info[1]<10) return 1;
			// 			if(info[0]<5&&game.hasPlayer(function(current){
			// 				return current!=player&&get.distance(player,current)>info[0];
			// 			})) return 0;
			// 			return 2;
			// 		});
			// 		'step 1'
			// 		if(result.control!='cancel2'){
			// 			if(result.index==1){var k=10}
			// 			else{var k=5}
			// 			player.logSkill('xianjing');
			// 			var list=lib.skill.yuqi.getInfo(player);
			// 			list[result.index]=Math.min(k,list[result.index]+1);
			// 			game.log(player,'将',result.control,'数字改为','#y'+list[result.index])
			// 			player.markSkill('yuqi');
			// 			if(player.isDamaged()) event.finish();
			// 		}
			// 		else event.finish();
			// 		'step 2'
			// 		var list=lib.skill.yuqi.getInfo(player);
			// 		player.chooseControl('<span class=thundertext>蓝色('+list[0]+')</span>',
			// 							'<span class=firetext>红色('+list[1]+')</span>',
			// 							'<span class=greentext>绿色('+list[2]+')</span>',
			// 							'<span class=yellowtext>黄色('+list[3]+')</span>','cancel2').set('prompt',
			// 																							'是否令〖隅泣〗中的一个数字+1？').set('ai',
			// 																													function(){
			// 			var player=_status.event.player,info=lib.skill.yuqi.getInfo(player);
			// 			if(info[0]<info[3]&&game.countPlayer(function(current){
			// 				return get.distance(player,current)<=info[0];
			// 			})<Math.min(3,game.countPlayer())) return 0;
			// 			if(info[3]<info[1]-1) return 3;
			// 			if(info[1]<10) return 1;
			// 			if(info[0]<5&&game.hasPlayer(function(current){
			// 				return current!=player&&get.distance(player,current)>info[0];
			// 			})) return 0;
			// 			return 2;
			// 		});
			// 		'step 3'
			// 		if(result.control!='cancel2'){
			// 			if(result.index==1){var k=10}
			// 			else{var k=5}
			// 			var list=lib.skill.yuqi.getInfo(player);
			// 			list[result.index]=Math.min(k,list[result.index]+1);
			// 			game.log(player,'将',result.control,'数字改为','#y'+list[result.index])
			// 			player.markSkill('yuqi');
			// 		}
			// 	},
			// }
			// lib.translate.yuqi_info='每回合限<span class=yellowtext>三</span>次。当有角色受到伤害后，若你至其的距离不大于<span class=thundertext>0</span>，则你可以观看牌堆顶的<span class=firetext>3</span>张牌。你将其中至多<span class=greentext>1</span>张牌交给受伤角色，然后可以获得剩余牌中的至多<span class=yellowtext>1</span>张牌，并将其余牌以原顺序放回牌堆顶。<span class=yellowtext>（红色的数字至多为10，其余的数字至多为5）</span>'				
			// lib.dynamicTranslate.yuqi=function(player){
			// 	var info=lib.skill.yuqi.getInfo(player);
			// 	return '每回合限<span class=yellowtext>三</span>次。当有角色受到伤害后，若你至其的距离不大于<span class=thundertext>'+info[0]+'</span>，则你可以观看牌堆顶的<span class=firetext>'+info[1]+'</span>张牌。你将其中至多<span class=greentext>'+info[2]+'</span>张牌交给受伤角色，然后可以获得剩余牌中的至多<span class=yellowtext>'+info[3]+'</span>张牌，并将其余牌以原顺序放回牌堆顶。<span class=yellowtext>（红色的数字至多为10，其余的数字至多为5）</span>';
			// }
		}
		//----------------------神诸葛
		// lib.character['shen_zhugeliang']=['male','shen',3,['ybsl_qixing','ybsl_kuangfeng','dawu'],['shu']]
		// lib.skill.qixing2={
		// 	trigger:{
		// 		player:'phaseDrawAfter'
		// 	},
		// 	prompt:'收回所有星，并将至多7张手牌充入星',
		// 	content:function(){
		// 		'step 0'
		// 		player.gain(player.getExpansions('qixing'),'gain2');
		// 		player.logSkill('qixing2');
		// 		'step 1'
		// 		player.chooseCard('h',[1,7],'将至多七张手牌置于武将牌上称为星').set('ai',function(card){
		// 			return 6-get.value(card);
		// 		});
		// 		'step 2'
		// 		game.log(player,'将',result.cards,'作为“星”置于武将牌上');
		// 		player.addToExpansion(result.cards,player,'giveAuto').gaintag.add('qixing');
		// 	},
		// }
		// lib.translate.qixing_info='游戏开始时，你将牌堆顶的七张牌置于你的武将牌上，称之为“星”。然后你可用任意数量的手牌等量交换这些“星”；<span class=yellowtext>摸牌阶段结束后，你可以获得武将牌上所有星，然后选择至多七张手牌置于武将牌上称为星。</span>'
		
		// lib.skill.kuangfeng={
		// 	unique:true,
		// 	audio:2,
		// 	enable:'phaseUse',
		// 	usable:1,
		// 	enable:'chooseToUse',
		// 	filter:function(event,player){
		// 		return player.getExpansions('qixing').length;
		// 	},
		// 	filterTarget:function (card,player,target){
		// 		return !target.hasSkill('kuangfeng2');
		// 	},
		// 	content:function(){
		// 		'step 0'
		// 		target.addSkill('kuangfeng2');
		// 		var length=targets.length;
		// 		player.chooseCardButton('弃置'+get.cnNumber(length)+'枚星',length,player.getExpansions('qixing'),true);
		// 		player.addSkill('dawu3');
		// 		'step 1'
		// 		player.loseToDiscardpile(result.links);
		// 	},
		// 	ai:{combo:'qixing'},
		// 	group:'kuangfeng_66',
		// 	subSkill:{
		// 		66:{
		// 			unique:true,
		// 			audio:2,
		// 			trigger:{player:'phaseJieshuBegin'},
		// 			direct:true,
		// 			filter:function(event,player){
		// 				return player.getExpansions('qixing').length;
		// 			},
		// 			content:function(){
		// 				'step 0'
		// 				player.chooseTarget(get.prompt('kuangfeng'),'令一名角色获得“狂风”标记',function(card,player,target){
		// 					return !target.hasSkill('kuangfeng2');
		// 				}).ai=function(target){
		// 					return -1;
		// 				}
		// 				'step 1'
		// 				if(result.bool){
		// 					var length=result.targets.length;
		// 					for(var i=0;i<length;i++){
		// 						result.targets[i].addSkill('kuangfeng2');
		// 					}
		// 					player.logSkill('kuangfeng',result.targets,'fire');
		// 					player.chooseCardButton('弃置'+get.cnNumber(length)+'枚星',length,player.getExpansions('qixing'),true);
		// 					player.addSkill('dawu3');
		// 				}
		// 				else{
		// 					event.finish();
		// 				}
		// 				'step 2'
		// 				player.loseToDiscardpile(result.links);
		// 			},
		// 		}
		// 	}
		// }
		// lib.translate.kuangfeng_info='<span class=yellowtext>出牌阶段限一次</span>/结束阶段，你可以弃置1张“星”并指定一名角色：直到你的下回合开始，该角色受到火焰伤害时，此伤害+1。'
		//-----------------------铜雀
		/*
		//因为原版铜雀被作者加入了天火煅升级公式因此移除
		lib.card.tongque={
			audio:true,
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			ai:{
				basic:{
					equipValue:7,
				}
			},
			skills:['tongque_skill']
		}
		lib.skill.tongque_skill={
			trigger:{player:'useCard1'},
			equipSkill:true,
			forced:true,
			filter:function(event,player){
				return !event.card.yingbian&&get.is.yingbian(event.card);
			},
			content:function(){
				trigger.card.yingbian=true;
				var info=get.info(trigger.card);
				if(info&&info.yingbian) info.yingbian(trigger);
				player.addTempSkill('yingbian_changeTarget');
			},
		}
		lib.translate.tongque_info='锁定技，你使用的带有【应变】效果的牌无视条件直接生效。'
		*/
		//-------------------------------卡牌修改
		
	}
}