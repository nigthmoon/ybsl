import { lib, game, ui, get, ai, _status } from '../../../../noname.js'
import { typeimage } from '../packages/function.js'
export async function cyyydsgs() {
	/**
	 * 
	 * @param {*} skill 
	 * @param {*} player 
	 * @returns 获取技能的等级
	 */
	get.YB_skill_lv = function(skill,player){
		if(!lib.skill[skill].cyyydsgs)return 0;
		if(!player.YB_skill_lv||!player.YB_skill_lv[skill])return 1;
		return player.YB_skill_lv[skill]-0;
	}
	// get.YB_source_character = function(target){
	//	 return target.name
	// }
	/**
	 * 
	 * @param {*} name 
	 * @returns 获取武将的等阶
	 */
	get.YB_character_lv = function(name){
		if(Array.isArray(lib.character[name])){
			var infoy = lib.character[name][4]
			for(var infox of infoy){
				if(infox.startsWith('YB_character_lv:')){
					var str = infox.slice(16);
					return str
				}
			}
		}
		else if(lib.character[name].YB_character_lv){
			return lib.character[name].YB_character_lv
		}
		else {
			var infoy = lib.character[name][4]
			for(var infox of infoy){
				if(infox.startsWith('YB_character_lv:')){
					var str = infox.slice(16);
					return str
				}
			}
		}
	}
	/**
	 * 
	 * @param {*} mark 
	 * @param {*} num 
	 * @returns 增加标记
	 */
	lib.element.player.YB_addMark = function(mark,num,type){
		if(!num)var num = 1;
		var next = game.createEvent('YB_addMark', false);
		next.player = this;
		next.mark = mark;
		next.number = num;
		if(!type)var type = null;
		next.YB_type = type;
		next.setContent('YB_addMark');
		// next.trigger('YB_addMark_'+mark)
		return next;
	}
	lib.element.content.YB_addMark = function(){
		if(num==0)return;
		if(!player.hasSkill(event.mark)){
			player.addSkill(event.mark);
		}
		player.addMark(event.mark,event.number);
		event.trigger('YB_addMark_'+event.mark);
		// next;
		// trigger.trigger('YB_addMark_'+event.mark);
	}
	/**
	 * 
	 * @param {*} mark 
	 * @param {*} num 
	 * @returns 失去标记
	 */
	lib.element.player.YB_removeMark = function(mark,num,type){
		if(!num)var num = 1;
		var next = game.createEvent('YB_removeMark', false);
		next.player = this;
		next.mark = mark;
		next.number = num;
		if(!type)var type = null;
		next.YB_type = type;
		next.setContent('YB_removeMark');
		// next.trigger('YB_removeMark_'+mark)
		return next;
	}
	lib.element.content.YB_removeMark = function(){
		if(num==0)return;
		player.removeMark(event.mark,event.number);
		event.trigger('YB_removeMark_'+event.mark);
		// next;
		if(player.countMark(event.mark)==0){
			player.removeSkill(event.mark);
		}
	}
	//创建岩属性
	{
		//（岩属性释义：非官方概念；受到岩属性伤害时，若受伤者装备区内没有牌，此伤害+1。)
		game.addNature('YB_rock',)
		game.addNature('YB_rock','岩',{
			linked:true,
			order:58,
			lineColor:'YB_windy',
			color:'YB_windy',
		})
		/**@type { importCharacterConfig[skill]} */
		lib.skill._YB_rock={
			trigger:{
				player:'damageBegin4',
			},
			equipSkill:false,
			ruleSkill:true,
			shaRelated:true,
			firstDo:true,
			filter:function (event,player){
				return event.hasNature('YB_rock')&&event.num>0&&!event.player.countCards('e');
			},
			content(){
				trigger.num++;
			},
		}
		lib.skill.YB_rockdamage={
			ai: {
				result: {
					target:function(player,target){
						if(!target.countCards('e'))return -3;
						return -1.5;
					},
				},
				tag: {
					damage: 1,
					YB_rockDamage: 1,
					natureDamage: 1,
				},
			},
		}
	}
	/**@type { importCharacterConfig[skill]} */
	lib.skill._YB_skill_lv_init={
		trigger:{
			player:'changeSkillsAfter'
		},
		forced : true,
		filter:function(event,player){
			return event.addSkill.some(function(skill){
				return lib.skill[skill].cyyydsgs
			})
		},
		silent:true,
		content(){
			console.log(trigger.addSkill)
			if(!player.YB_skill_lv)player.YB_skill_lv={}
			trigger.addSkill.some(function(skill){
				if(lib.skill[skill].cyyydsgs){
					if(!player.YB_skill_lv[skill])player.YB_skill_lv[skill] = 1
				}
			})
		},
	}
	/** @type { importCharacterConfig } */
	var cyyydsgs = {
		name: "cyyydsgs",
		connect:false,//该武将包是否可以联机（必填） 
		characterSort:{
			cyyydsgs:{
				miwusenlin:[
					'cyyydsgs_leimoying',
					'cyyydsgs_yanmoteng',
					'cyyydsgs_fengmolang',
				],
				miwusenlin_boss:[
					'cyyydsgs_leimoyingwang',
					'cyyydsgs_yanmohua',
					'cyyydsgs_fengmolangwang',
				],
			}
		},
		character:{
			cyyydsgs_leimoying:['none','qun',3,['cyyydsgs_leishan'],['YB_character_lv:5']],
			// lv1_cyyydsgs_leimoying:['none','qun',3,['cyyydsgs_leishan'],['YB_character_lv:1']],
			// lv2_cyyydsgs_leimoying:['none','qun',3,['cyyydsgs_leishan'],['YB_character_lv:2']],
			// lv3_cyyydsgs_leimoying:['none','qun',3,['cyyydsgs_leishan'],['YB_character_lv:3']],
			// lv4_cyyydsgs_leimoying:['none','qun',3,['cyyydsgs_leishan'],['YB_character_lv:4']],
			// lv5_cyyydsgs_leimoying:['none','qun',3,['cyyydsgs_leishan'],['YB_character_lv:5']],
			cyyydsgs_leimoyingwang:['none','qun',3,['cyyydsgs_leishan','cyyydsgs_jilei'],['YB_character_lv:5']],
			// lv1_cyyydsgs_leimoyingwang:['none','qun',3,['cyyydsgs_leishan','cyyydsgs_jilei'],['YB_character_lv:1']],
			// lv2_cyyydsgs_leimoyingwang:['none','qun',3,['cyyydsgs_leishan','cyyydsgs_jilei'],['YB_character_lv:2']],
			// lv3_cyyydsgs_leimoyingwang:['none','qun',3,['cyyydsgs_leishan','cyyydsgs_jilei'],['YB_character_lv:3']],
			// lv4_cyyydsgs_leimoyingwang:['none','qun',3,['cyyydsgs_leishan','cyyydsgs_jilei'],['YB_character_lv:4']],
			// lv5_cyyydsgs_leimoyingwang:['none','qun',3,['cyyydsgs_leishan','cyyydsgs_jilei'],['YB_character_lv:5']],
			// cyyydsgs_leimoying:{
			//	 sex: 'none',
			//	 group: "qun",
			//	 hp: 3,
			//	 skills: ["cyyydsgs_leishan"],
			//	 names:'null|null',
			// },
			cyyydsgs_yanmoteng:['none','qun',4,['cyyydsgs_shengzhang'],['YB_character_lv:5']],
			cyyydsgs_yanmohua:['none','qun',4,['cyyydsgs_shengzhang','cyyydsgs_huakai'],['YB_character_lv:5']],
			cyyydsgs_fengmolang:['none','qun',4,['cyyydsgs_fengxing'],['YB_character_lv:5']],
			cyyydsgs_fengmolangwang:['none','qun',4,['cyyydsgs_fengxing','cyyydsgs_xuanfeng'],['YB_character_lv:5']],
		},
		characterIntro:{},
		characterFilter:{},
		characterTitle:{},



		skill:{
			cyyydsgs_leishan:{
				cyyydsgs:true,
				audio:'ext:夜白神略/audio/character:1',
				usable(skill,player){
					if(player.YB_skill_lv[skill]<5)return 1;
					return 2;
				},
				enable:'phaseUse',
				filter(event,player){
					return player.countCards('he')>0;
				},
				position:'he',
				selectCard(){
					var player = _status.event.player;
					var num = get.YB_skill_lv('cyyydsgs_leishan',player)
					if(num<2)return 1;
					else if(num<4)return [1,2];
					else return [1,3];
				},
				filterCard: true,
				selectTarget(){
					var player = _status.event.player;
					var num = get.YB_skill_lv('cyyydsgs_leishan',player)
					if(num<3)return ui.selected.cards.length;
					else return [1,ui.selected.cards.length];
				},
				filterTarget(card,player,target){
					return target!=player;
				},
				filterOk(){
					return ui.selected.targets.length==ui.selected.cards.length||ui.selected.targets.length==1
				},
				content(){
					if(event.targets.length==1){
						event.target.damage('thunder',event.cards.length)
					}
					else {
						event.target.damage('thunder')
					}
				},
				ai:{
					order:2,
					result:{
						player:1,
						target:function(player,target){
							var num = ui.selected.cards.length;
							if(num==ui.selected.targets.length)return -2;
							return -num*2;
						}
					}
				},
			},
			cyyydsgs_jilei:{
				cyyydsgs:true,
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					source:'damageEnd',
					player:'damageBegin3',
				},
				filter(event,player,name){
					var num = get.YB_skill_lv('cyyydsgs_jilei',player)
					if(!event.hasNature('thunder'))return false;
					if(name=='damageBegin3')return num<5;
					else if(num<3)return player.isDamaged();
					return true;
				},
				getIndex(event,player,name){
					if(name=='damageBegin3')return 1;
					else {
						var num = get.YB_skill_lv('cyyydsgs_jilei',player)
						if(num<2)return 1;
						else return event.num;
					}
				},
				async cost(event,trigger,player){
					let num = trigger.num;
					event.result = {bool:false,cost_data:{draw_card:false,recover_hp:false}}
					if(event.triggername=='damageBegin3'){
						var next = await player.chooseBool().set('ai',function () {
							const player = get.player();
							// const { target, num1, num2 } = get.event().getParent();
							var target = player;
							const att = get.attitude(player, target);
							const choices = get.event().controls.slice();
							const eff1 = get.recoverEffect(target, player, player);
							const eff2 = get.effect(target, { name: "draw" }, player, player) * 2;
							if (eff1 > 0) {
								return true;
							}
							return false;
						}).set('prompt',get.prompt('cyyydsgs_jilei')).set('prompt2',get.YB_prompt2('cyyydsgs_jilei',null,player)).forResult()
						event.result.bool = next.bool;
					}
					else {
						if(get.YB_skill_lv('cyyydsgs_jilei',player)==3){
							const controls = ["draw_card"];
							if (target.isDamaged()) {
								event.num2 = Math.min(event.num2, target.getDamagedHp());
								controls.push("recover_hp");
							}
							controls.push("cancel2");
							if (controls.length == 1) {
								result = { control: controls[0] };
							}
							else {
								var next = player.chooseControl(controls)
								next.set(
									"ai",
									function () {
										const player = get.player();
										// const { target, num1, num2 } = get.event().getParent();
										var target = player;
										var num1 = 1;
										var num2 = 1;
										const att = get.attitude(player, target);
										const choices = get.event().controls.slice();
										const eff1 = get.recoverEffect(target, player, player);
										const eff2 = get.effect(target, { name: "draw" }, player, player) * 2;
										if (choices.includes("recover_hp") && eff1 > 0 && (target.hp == 1 || target.needsToDiscard() || target.hasSkillTag("maixie_hp") || num2 > num1 || (num2 == num1 && target.needsToDiscard(1)))) {
											return "recover_hp";
										}
										if (eff2 > 0) {
											return "draw_card";
										}
										if (choices.includes("cancel2") && att <= 0) {
											return "cancel2";
										}
										return choices.randomGet();
									}
								);
								next.set('prompt',get.prompt('cyyydsgs_jilei'))
								next.set('prompt2',get.YB_prompt2('cyyydsgs_jilei',null,player))
								result = await next.forResult();
							}
							
							if (result?.control != "cancel2") {
								event.result.bool=true;
								event.result.cost_data[result.control]=true;
							}
						}
						else {
							var result = await player.chooseBool().set('ai',function () {
								const player = get.player();
								const { target, num1, num2 } = get.event().getParent();
								const att = get.attitude(player, target);
								const choices = get.event().controls.slice();
								const eff1 = get.recoverEffect(target, player, player);
								const eff2 = get.effect(target, { name: "draw" }, player, player) * 2;
								// if (choices.includes("recover_hp") && eff1 > 0 && (target.hp == 1 || target.needsToDiscard() || target.hasSkillTag("maixie_hp") || num2 > num1 || (num2 == num1 && target.needsToDiscard(1)))) {
								//	 return "recover_hp";
								// }
								// if (eff2 > 0) {
								//	 return "draw_card";
								// }
								// if (choices.includes("cancel2") && att <= 0) {
								//	 return "cancel2";
								// }
								// return choices.randomGet();
								if(eff1+eff2>0)return true;
								return false;
							}).set('prompt',get.prompt('cyyydsgs_jilei')).set('prompt2',get.YB_prompt2('cyyydsgs_jilei',null,player)).forResult();
							if(result.bool){
								event.result.bool=true;
								event.result.cost_data.recover_hp=true;
								if(get.YB_skill_lv('cyyydsgs_jilei',player)>3){
									event.result.cost_data.draw_card=true;
								}
							}
						}
					}
				},
				async content(event,trigger,player){
					if(event.triggername=='damageBegin3'){
						let num = trigger.num;
						trigger.cancel();
						await player.draw(num);
					}
					else {
						if(event.cost_data.recover_hp)await player.recover();
						if(event.cost_data.draw_card)await player.draw();
					}
				},
			},
			cyyydsgs_shengzhang:{
				cyyydsgs:true,
				audio:'ext:夜白神略/audio/character:1',
				forced:true,
				trigger:{
					player:'phaseZhunbeiBegin',
					global:'phaseJieshuBegin',
				},
				filter(event,player,name){
					if(name=='phaseJieshuBegin'&&_status.currentPhase!=player)return get.YB_skill_lv('cyyydsgs_shengzhang',player)==5;
					return true;
				},
				async content(event,trigger,player){
					var num = get.YB_skill_lv('cyyydsgs_shengzhang',player)
					await player.recover();
					await player.draw(Math.ceil(Math.sqrt(num-1)));
				}
			},
			cyyydsgs_huakai:{
				cyyydsgs:true,
				audio:'ext:夜白神略/audio/character:1',
				usable:1,
				enable:'phaseUse',
				filter(event,player){
					return true;
				},
				selectTarget(){
					var player = get.player();
					var num = get.YB_skill_lv('cyyydsgs_huakai',player)
					if(num<=2)return 1;
					else if(num<=4)return [1,2];
					else return [1,3];
				},
				filterTarget(card,player,target){
					return target!=player&&target.isIn();
				},
				content(){
					target.YB_addMark('buff_cyyydsgs_huafen',1,'cyyydsgs_huakai_phaseUse');
				},
				ai:{
					order:10,
					result:{
						player:1,
						target:-2,
					}
				},
				group:['cyyydsgs_huakai_damage','cyyydsgs_huakai_lose','cyyydsgs_huakai_recover'],
				subSkill:{
					damage:{
						audio:'cyyydsgs_huakai',
						trigger:{
							source:'damageEnd',
						},
						filter(event,player){
							var num = get.YB_skill_lv('cyyydsgs_huakai',player)
							if(event.player==player||!event.player.isIn())return false;
							return num>=2;
						},
						prompt2:'当你对其他角色造成伤害时，你可以令其获得一枚“花粉”。',
						content(){
							player.line(trigger.player,'yellow')
							trigger.player.YB_addMark('buff_cyyydsgs_huafen',1,'cyyydsgs_huakai_damage');
						},
						check:function(event,player){
							return get.attitude(player,event.player)<0;
						},
					},
					lose:{
						audio:'cyyydsgs_huakai',
						trigger:{
							global:'YB_removeMark_buff_cyyydsgs_huafen',
						},
						filter(event,player){
							var num = get.YB_skill_lv('cyyydsgs_huakai',player)
							return num>3;
						},
						async cost(event, trigger, player) {
							var target = trigger.player;
							console.log(trigger)
							event.result = await player
								.choosePlayerCard('其他角色移除“花粉”时，你可以获得其一张牌', target, 'he')
								.set("ai", button => {
									let val = get.buttonValue(button);
									if (get.event("att") > 0) {
										return 1 - val;
									}
									return val;
								})
								.set("att", get.attitude(player, target))
								.forResult();
						},
						content(){
							var target = trigger.player;
							player.gain(event.cards, target, "giveAuto", "bySelf");
						}
					},
					recover:{
						audio:'cyyydsgs_huakai',
						trigger:{
							player:'recoverBegin',
						},
						filter(event,player){
							var players = game.countPlayer(function(c){
								return !c.countMark('buff_cyyydsgs_huafen')&&c.isIn()
							})
							if(players.length==0)return false;
							var num = get.YB_skill_lv('cyyydsgs_huakai',player)
							return num>=3;
						},
						async cost(event,trigger,player){
							event.result = await player.chooseTarget(1,'当你恢复体力时，你可以移除场上一枚“花粉”，令恢复值+1。').set('filterTarget',function(card,player,target){
								return target.countMark('buff_cyyydsgs_huafen')>0;
							}).set('ai',function(target){
								if(player.hp+trigger.num>=player.maxHp){
									return -get.attitude(player,target)&&target.countMark('buff_cyyydsgs_huafen')>1;
								}
								else if(get.attitude(player,target)){
									return true;
								}
								return -get.attitude(player,target)*target.countMark('buff_cyyydsgs_huafen')*(target.countCards('he')+1);
							}).forResult();
							// if(result.bool){
							// 	event.result = {bool:true,targets:result.targets}
							// }
						},
						content(){
							event.targets[0].YB_removeMark('buff_cyyydsgs_huafen',1,'cyyydsgs_huakai_recover');
							trigger.num++;
						}
					}
				},
			},
			buff_cyyydsgs_huafen:{
				mark:true,
				charlotte:true,
				marktext:'粉',
				intro:{
					content:'锁定技，准备阶段，移除一枚“花粉”，然后弃置一张牌或失去一点体力。',
				},
				trigger:{
					player:'phaseZhunbeiBegin',
				},
				filter(event,player){
					return player.countMark('buff_cyyydsgs_huafen')>0;
				},
				async content(event,trigger,player){
					player.YB_removeMark('buff_cyyydsgs_huafen',1,'buff_cyyydsgs_huafen');
					var result = await player.chooseToDiscard('he',get.prompt('cyyydsgs_huafen')).set("ai", function (card) {
						return 9 - get.value(card);
					}).forResult();
					if(!result.bool){
						await player.loseHp();
					}
				},
			},
			cyyydsgs_fengxing:{
				cyyydsgs:true,
				audio:'ext:夜白神略/audio/character:1',
				forced:true,
				trigger:{
					player:['phaseDrawBegin','loseAfter','YB_removeMark_buff_cyyydsgs_fengdun']
				},
				filter(event,player,name){
					var num = get.YB_skill_lv('cyyydsgs_fengxing',player);
					if(name=='phaseDrawBegin')return true;
					else if(name=='loseAfter'){
						if(event.type=='discard')return num>=3;
					}
					else {
						// var evt = event.getParent();
						// if(evt.skill =='buff_cyyydsgs_fengdun')return num==5;
						// console.log(event)
						// console.log(event.YB_type)
						// console.log(event.getParent())
						if(event.YB_type=='buff_cyyydsgs_water')return num==5;
					}
				},
				async content(event,trigger,player){
					var num = get.YB_skill_lv('cyyydsgs_fengxing',player);
					if(event.triggername=='phaseDrawBegin'){
						trigger.num+=Math.ceil((num+1)/2);
					}
					else if(event.triggername=='loseAfter'){
						await player.YB_addMark('buff_cyyydsgs_fengdun',1,'cyyydsgs_fengxing_discard');
					}
					else {
						await player.draw(2);
					}
				}
			},
			buff_cyyydsgs_fengdun:{
				mark:true,
				charlotte:true,
				marktext:'盾',
				intro:{
					content:'锁定技，受到火属性伤害时，移除一枚“风盾”并防止之；当你获得风盾后，若大于体力上限且大于1，则移除超出的“风盾”。',
				},
				trigger:{
					player:['damageBegin3','YB_addMark_buff_cyyydsgs_fengdun'],
				},
				filter(event,player,name){
					if(name=='damageBegin3')return event.hasNature('fire');
					else if(player.countMark('buff_cyyydsgs_fengdun')>Math.max(player.maxHp,1))return true;
				},
				forced:true,
				async content(event,trigger,player){
					if(event.triggername=='damageBegin3'){
						player.YB_removeMark('buff_cyyydsgs_fengdun',1,'buff_cyyydsgs_damage');
						trigger.cancel();
					}
					else {
						var numx = player.countMark('buff_cyyydsgs_fengdun')-Math.max(player.maxHp,1);
						player.YB_removeMark('buff_cyyydsgs_fengdun',numx,'buff_cyyydsgs_water');
					}
				},
				// subSkill:{

				// },
			},
			cyyydsgs_xuanfeng:{
				cyyydsgs:true,
				audio:'ext:夜白神略/audio/character:1',
				// trigger:{
				// 	player:['phaseUseEnd'],
				// },
				// filter(event,player){
				// 	return player.countCards('he')>=2;
				// },
				// getIndex(event,player){
				// 	var num = get.YB_skill_lv('cyyydsgs_xuanfeng',player);
				// 	if(num>=5)return 2
				// 	return 1
				// },
				// async cost(event,trigger,player){
				// 	var num = get.YB_skill_lv('cyyydsgs_xuanfeng',player);
				// 	event.result = await player.chooseToDiscard(2,get.prompt('cyyydsgs_xuanfeng'),'he').set('ai',function(card){
				// 		return 9-get.value(card);
				// 	}).set('chooseonly',true).forResult();
				// },
				// content(){
				// 	'step 0'

				// },
				// content(){
				// 	'step 0'
				// 	if(event.cards){
				// 		player.discard(event.cards);
				// 	}
				// 	'step 1'
				// 	player.chooseTarget(get.YB_prompt2('cyyydsgs_xuanfeng',null,player),true).set('filterTarget',function(card,player,target){
				// 		return target.countCards("he") > 0&&target!=player&&target.hasCard(card => lib.filter.canBeDiscarded(card, player, target), "he");
				// 	}).set('ai',function(target){
				// 		var att = get.attitude(_status.event.player, target);
				// 		if (target.hasSkill("tuntian")) {
				// 			return att / 10;
				// 		}
				// 		return 1 - att;
				// 	})
				// 	'step 2'
				// 	if(result.bool){
				// 		event.target1 = result.targets[0];
				// 		player.line(event.target1,'green');
				// 		player.discardPlayerCard('he', event.target1, true).set("target", target).set("complexSelect", false).set("ai", lib.card.guohe.ai.button);
				// 	}
				// 	else {
				// 		event.finish();
				// 	}
				// 	'step 3'
				// 	var num = get.YB_skill_lv('cyyydsgs_xuanfeng',player);
				// 	if(event.target1.isIn()&&num>=3){
				// 		var str = '是否对'+get.translation(event.target1)+'造成一点伤害？'
				// 		if(num==3)str+='然后放弃后续执行。'
				// 		if(num==4)str+='每次发动此技能限一次。'
				// 		player.chooseBool(str)
				// 	}
					
				// 	// event.result = await player.chooseTarget([1,2],get.YB_prompt2('cyyydsgs_xuanfeng',null,player),true).set('filterTarget',function(card,player,target){
				// 	// 	return target.countCards("he") > 0&&target!=player&&target.hasCard(card => lib.filter.canBeDiscarded(card, player, target), "he");
				// 	// }).set('ai',function(target){
				// 	// 	var att = get.attitude(_status.event.player, target);
				// 	// 	if (target.hasSkill("tuntian")) {
				// 	// 		return att / 10;
				// 	// 	}
				// 	// 	return 1 - att;
				// 	// })
				// }
				trigger:{
					player:['phaseDiscardAfter','YB_removeMark_buff_cyyydsgs_fengdun'],
				},
				filter(event,player,name){
					var num = get.YB_skill_lv('cyyydsgs_xuanfeng',player);
					if (event.name == "phaseDiscard") {
						var cards = [];
						player.getHistory("lose", function (evt) {
							if (evt && evt.type == "discard" && evt.getParent("phaseDiscard") == event && evt.hs) {
								cards.addArray(evt.hs);
							}
						});
						return cards.length > 0;
					}
					else {
						return num>=3&&event.YB_type=='buff_cyyydsgs_damage';
					}
					
				},
				async cost(event,trigger,player){
					var num = get.YB_skill_lv('cyyydsgs_xuanfeng',player);
					event.result = await player.chooseTarget([1,2],get.YB_prompt2('cyyydsgs_xuanfeng',null,player),true).set('filterTarget',function(card,player,target){
						return target!=player;
					}).set('ai',function(target){
						var player = _status.event.player;
						var att = get.attitude(player, target);
						var numx = get.damageEffect(target, player, player,'YB_wind');
						return numx>0;
					}).forResult();
				},
				async content(event,trigger,player){
					var targets = event.targets;
					let num = get.YB_skill_lv('cyyydsgs_xuanfeng',player);
					if(targets.length){
						for(var target of targets){
							if(target.isIn()){
								await target.damage('YB_wind');
								if(num>=2){
									var numx =Math.ceil((num-1)/2);
									if(numx>1)numx = [1,numx]
									await player.discardPlayerCard('he',target,numx)
								}
							}
						}
					}
				},
				//当你造成不包含风属性的非传导伤害或使用不包含风属性的伤害卡牌时，
				// 你可以移除一枚“风盾”，令此事件附着风属性。
				group:['cyyydsgs_xuanfeng_wind'],
				subSkill:{
					wind:{
						audio:'cyyydsgs_xuanfeng',
						trigger:{
							// player:['useCard1'],
							source:['damageBegin1'],
						},
						filter(event,player,name){
							var num = get.YB_skill_lv('cyyydsgs_xuanfeng',player);
							if(num<5)return false;
							if(player.countMark('buff_cyyydsgs_fengdun')<=0)return false;
							if(name=='useCard1'){
								return !game.hasNature(event.card,'YB_wind');
							}
							else {
								return event.num>0&&!event.hasNature('YB_wind')&&!event.windLinked2;
							}
						},
						prompt2(){

							return '移除一枚“风盾”，令此事件附着风属性';

						},
						content(){
							'step 0'
							player.YB_removeMark('buff_cyyydsgs_fengdun',1,'cyyydsgs_xuanfeng_nowind');
							'step 1'
							var natures=trigger.nature;
							if (nature!=null) {
								// if(!Array.isArray(nature)){
								// 	if(nature.includes('|'))natures=natures.split('|').filter(item=>item!=='');
								// }
								if(Array.isArray(nature)){
									natures=natures.join('|');
								}
							}
							game.setNature(trigger, (nature==null?'YB_wind':natures+'|YB_wind'));
							
							var next = game.createEvent("cyyydsgs_xuanfeng_nowind");
							event.next.remove(next);
							trigger.after.push(next);
							next.setContent(function () {
								game.setNature(trigger, []);
							});
						}
					},
				},
			},

			//磐石龟
			

		},
		card:{},
		translate:{
			//迷雾森林副本
			miwusenlin:'迷雾森林',
			miwusenlin_boss:'迷雾森林·BOSS',
			//雷魔鹰和雷魔鹰王
			cyyydsgs_leimoying:'雷魔鹰',
			lv1_cyyydsgs_leimoying:'一阶雷魔鹰',
			lv2_cyyydsgs_leimoying:'二阶雷魔鹰',
			lv3_cyyydsgs_leimoying:'三阶雷魔鹰',
			lv4_cyyydsgs_leimoying:'四阶雷魔鹰',
			lv5_cyyydsgs_leimoying:'五阶雷魔鹰',
			cyyydsgs_leimoyingwang:'雷魔鹰王',
			lv1_cyyydsgs_leimoyingwang:'一阶雷魔鹰王',
			lv2_cyyydsgs_leimoyingwang:'二阶雷魔鹰王',
			lv3_cyyydsgs_leimoyingwang:'三阶雷魔鹰王',
			lv4_cyyydsgs_leimoyingwang:'四阶雷魔鹰王',
			lv5_cyyydsgs_leimoyingwang:'五阶雷魔鹰王',

			cyyydsgs_leishan:'雷闪',
			cyyydsgs_leishan_info:'出牌阶段限一次，你可以弃置一张牌，对一名其他角色造成一点雷电伤害。',
			cyyydsgs_leishan_info_1:'出牌阶段限一次，你可以弃置一张牌，对一名其他角色造成一点雷电伤害。',
			cyyydsgs_leishan_info_2:'出牌阶段限一次，你可以弃置一至两张牌，对等量名其他角色造成一点雷电伤害。',
			cyyydsgs_leishan_info_3:'出牌阶段限一次，你可以弃置一至两张牌，对等量名其他角色造成一点雷电伤害，或对一名其他角色造成等量点雷电伤害。',
			cyyydsgs_leishan_info_4:'出牌阶段限一次，你可以弃置一至三张牌，对等量名其他角色造成一点雷电伤害，或对一名其他角色造成等量点雷电伤害。',
			cyyydsgs_leishan_info_5:'出牌阶段限两次，你可以弃置一至三张牌，对等量名其他角色造成一点雷电伤害，或对一名其他角色造成等量点雷电伤害。',

			cyyydsgs_jilei:'汲雷',
			cyyydsgs_jilei_info:'当你造成雷属性伤害后，你可以恢复一点体力。',
			cyyydsgs_jilei_info_1:'当你造成雷属性伤害后，你可以恢复一点体力。',
			cyyydsgs_jilei_info_2:'每当你造成一点雷属性伤害后，你可以恢复一点体力。',
			cyyydsgs_jilei_info_3:'每当你造成一点雷属性伤害后，你可以恢复一点体力或摸一张牌。',
			cyyydsgs_jilei_info_4:'每当你造成一点雷属性伤害后，你可以恢复一点体力并摸一张牌。',
			cyyydsgs_jilei_info_5:'每当你造成一点雷属性伤害后，你可以恢复一点体力并摸一张牌；当你受到雷属性伤害时，你可以防止之，改为摸等量张牌。',
			//魇魔藤和魇魔花
			cyyydsgs_yanmoteng:'魇魔藤',
			cyyydsgs_yanmohua:'魇魔花',

			cyyydsgs_shengzhang:'生长',
			cyyydsgs_shengzhang_info:'锁定技，准备阶段，你恢复一点体力。',
			cyyydsgs_shengzhang_info_1:'锁定技，准备阶段，你恢复一点体力。',
			cyyydsgs_shengzhang_info_2:'锁定技，准备阶段，你恢复一点体力并摸一张牌。',
			cyyydsgs_shengzhang_info_3:'锁定技，准备阶段，你恢复一点体力并摸两张牌。',
			cyyydsgs_shengzhang_info_4:'锁定技，准备阶段或结束阶段，你恢复一点体力并摸两张牌。',
			cyyydsgs_shengzhang_info_5:'锁定技，准备阶段或场上角色的结束阶段，你恢复一点体力并摸两张牌。',

			cyyydsgs_huakai:'花开',
			cyyydsgs_huakai_info:'出牌阶段限一次，你可以令一名其他角色获得一枚“花粉”（锁定技，准备阶段，移除一枚“花粉”，然后弃置一张牌或失去一点体力）。',
			cyyydsgs_huakai_info_1:'出牌阶段限一次，你可以令一名其他角色获得一枚“花粉”（锁定技，准备阶段，移除一枚“花粉”，然后弃置一张牌或失去一点体力）。',
			cyyydsgs_huakai_info_2:'出牌阶段限一次，你可以令一名其他角色获得一枚“花粉”（锁定技，准备阶段，移除一枚“花粉”，然后弃置一张牌或失去一点体力）；当你对其他角色造成伤害时，你可以令其获得一枚“花粉”。',
			cyyydsgs_huakai_info_3:'出牌阶段限一次，你可以令一至两名其他角色获得一枚“花粉”（锁定技，准备阶段，移除一枚“花粉”，然后弃置一张牌或失去一点体力）；当你对其他角色造成伤害时，你可以令其获得一枚“花粉”；当你恢复体力时，你可以移除场上一枚“花粉”，令恢复值+1。',
			cyyydsgs_huakai_info_4:'出牌阶段限一次，你可以令一至两名其他角色获得一枚“花粉”（锁定技，准备阶段，移除一枚“花粉”，然后弃置一张牌或失去一点体力）；当你对其他角色造成伤害时，你可以令其获得一枚“花粉”；其他角色移除“花粉”时，你可以获得其一张牌；当你恢复体力时，你可以移除场上一枚“花粉”，令恢复值+1。',
			cyyydsgs_huakai_info_5:'出牌阶段限一次，你可以令一至三名其他角色获得一枚“花粉”（锁定技，准备阶段，移除一枚“花粉”，然后弃置一张牌或失去一点体力）；当你对其他角色造成伤害时，你可以令其获得一枚“花粉”；其他角色移除“花粉”时，你可以获得其一张牌；当你恢复体力时，你可以移除场上一枚“花粉”，令恢复值+1。',
			
			buff_cyyydsgs_huafen:'花粉',
			buff_cyyydsgs_huafen_info:'锁定技，准备阶段，移除一枚“花粉”，然后弃置一张牌或失去一点体力。',
			
			//风魔狼和风魔狼王
			cyyydsgs_fengmolang:'风魔狼',
			cyyydsgs_fengmolangwang:'风魔狼王',
			cyyydsgs_fengxing:'风行',
			cyyydsgs_fengxing_info:'锁定技，摸牌阶段，你多摸一张牌。',
			cyyydsgs_fengxing_info_1:'锁定技，摸牌阶段，你多摸一张牌。',
			cyyydsgs_fengxing_info_2:'锁定技，摸牌阶段，你多摸两张牌。',
			cyyydsgs_fengxing_info_3:'锁定技，摸牌阶段，你多摸两张牌；当你弃置牌后，你获得一个“风盾”（锁定技，受到火属性伤害时，移除一枚“风盾”并防止之；当你获得风盾后，若大于体力上限且大于1，则移除超出的“风盾”）。',
			cyyydsgs_fengxing_info_4:'锁定技，摸牌阶段，你多摸三张牌；当你弃置牌后，你获得一个“风盾”（锁定技，受到火属性伤害时，移除一枚“风盾”并防止之；当你获得风盾后，若大于体力上限且大于1，则移除超出的“风盾”）。',
			cyyydsgs_fengxing_info_5:'锁定技，摸牌阶段，你多摸三张牌；当你弃置牌后，你获得一个“风盾”（锁定技，受到火属性伤害时，移除一枚“风盾”并防止之；当你获得风盾后，若大于体力上限且大于1，则移除超出的“风盾”）；当你因溢出而移除“风盾”时，你摸两张牌。',

			buff_cyyydsgs_fengdun:'风盾',
			buff_cyyydsgs_fengdun_info:'锁定技，受到火属性伤害时，移除一枚“风盾”并防止之；当你获得风盾后，若大于体力上限且大于1，则移除超出的“风盾”。',

			cyyydsgs_xuanfeng:'旋风',
			cyyydsgs_xuanfeng_info:'弃牌阶段结束时，若你本阶段弃置过牌，你可以对至多两名其他角色各造成一点风属性伤害。',
			cyyydsgs_xuanfeng_info_1:'弃牌阶段结束时，若你本阶段弃置过牌，你可以对至多两名其他角色各造成一点风属性伤害。',
			cyyydsgs_xuanfeng_info_2:'弃牌阶段结束时，若你本阶段弃置过牌，你可以对至多两名其他角色各造成一点风属性伤害，伤害之后，你可以弃置该目标一张牌。',
			cyyydsgs_xuanfeng_info_3:'弃牌阶段结束时，若你本阶段弃置过牌，或当你因抵消伤害移除“风盾”后，你可以对至多两名其他角色各造成一点风属性伤害，伤害之后，你可以弃置该目标一张牌。',
			cyyydsgs_xuanfeng_info_4:'弃牌阶段结束时，若你本阶段弃置过牌，或当你因抵消伤害移除“风盾”后，你可以对至多两名其他角色各造成一点风属性伤害，伤害之后，你可以弃置该目标至多两张牌。',
			cyyydsgs_xuanfeng_info_5:'弃牌阶段结束时，若你本阶段弃置过牌，或当你因抵消伤害移除“风盾”后，你可以对至多两名其他角色各造成一点风属性伤害，伤害之后，你可以弃置该目标至多两张牌；当你造成不包含风属性的非传导伤害，你可以移除一枚“风盾”，令此事件附着风属性。',
			//若因此弃置的牌花色达到4种，你获得一个“风盾”（锁定技，受到火属性伤害时，移除一枚“风盾”并防止之；当你获得风盾后，若大于体力上限且大于1，则移除超出的“风盾”）
			// cyyydsgs_xuanfeng_info:'出牌阶段结束时，你可以弃置两张牌，然后依次弃置至多两名角色各一张牌。',
			// cyyydsgs_xuanfeng_info_1:'出牌阶段结束时，你可以弃置两张牌，然后依次弃置至多两名角色各一张牌。',
			// cyyydsgs_xuanfeng_info_2:'出牌阶段结束时，你可以弃置两张牌，然后依次弃置至多两名角色共计至多两张牌。',
			// cyyydsgs_xuanfeng_info_3:'出牌阶段结束时，你可以弃置两张牌，然后依次弃置至多两名角色共计至多两张牌，每次执行时，你可以对该目标造成一点伤害，然后放弃后续执行。',
			// cyyydsgs_xuanfeng_info_4:'出牌阶段结束时，你可以弃置两张牌，然后依次弃置至多两名角色共计至多两张牌，每次执行时，你可以对该目标造成一点伤害，每次发动此技能限一次。',
			// cyyydsgs_xuanfeng_info_5:'出牌阶段结束时，你可以弃置两张牌，然后依次弃置至多两名角色共计至多两张牌，每次执行时，你可以对该目标造成一点伤害。',

			//乱石荒原副本
			//磐石龟
			cyyydsgs_panshigui:'磐石龟',

			cyyydsgs_jianshi:'坚石',
			cyyydsgs_jianshi_info:'锁定技，结束阶段，你获得一点护甲（至多为5）。',
			cyyydsgs_jianshi_info_1:'锁定技，结束阶段，你获得一点护甲（至多为5）。',
			cyyydsgs_jianshi_info_2:'锁定技，结束阶段，你获得一点护甲（至多为5）并摸一张牌。',
			cyyydsgs_jianshi_info_3:'锁定技，结束阶段，你获得一点护甲（至多为5）并摸一张牌；当你失去护甲后，你摸一张牌。',
			cyyydsgs_jianshi_info_4:'锁定技，结束阶段，你获得一点护甲（至多为5）并摸两张牌；当你失去护甲后，你摸一张牌。',
			cyyydsgs_jianshi_info_5:'锁定技，结束阶段，你获得两点护甲（至多为5）并摸两张牌；当你失去护甲后，你摸一张牌。',

			//岩刺蛇和岩刺蛇王
			cyyydsgs_yancishan:'岩刺蛇',
			cyyydsgs_yancishanwang:'岩刺蛇王',

			cyyydsgs_yanbeng:'岩崩',
			cyyydsgs_yanbeng_info:'出牌阶段限一次，你可以翻面，并对一名其他角色造成一点岩属性伤害（若你存在“蛇绞”对象，此技能不能发动）。',
			cyyydsgs_yanbeng_info_1:'出牌阶段限一次，你可以翻面，并对一名其他角色造成一点岩属性伤害（若你存在“蛇绞”对象，此技能不能发动）。',
			cyyydsgs_yanbeng_info_2:'出牌阶段限一次，你可以翻面，并对一至两名其他角色造成一点岩属性伤害（若包含多名角色，这些角色需体力值均小于你）（若你存在“蛇绞”对象，此技能不能发动）。',
			cyyydsgs_yanbeng_info_3:'出牌阶段限一次，你可以翻面，并对一至两名其他角色造成一点岩属性伤害（若包含多名角色，这些角色需体力值均小于你）（若你存在“蛇绞”对象，此技能只能对其发动；你对“蛇绞”目标发动〖岩崩〗时，不翻面改为解除“蛇绞”），然后若其被“蛇绞”，你弃置其一张牌。',
			cyyydsgs_yanbeng_info_4:'出牌阶段限一次，你可以翻面，并对一至三名其他角色造成一点岩属性伤害（若包含多名角色，这些角色需体力值均小于你）（若你存在“蛇绞”对象，此技能只能对其发动；你对“蛇绞”目标发动〖岩崩〗时，不翻面改为解除“蛇绞”），然后若其被“蛇绞”，你弃置其一张牌。',
			cyyydsgs_yanbeng_info_5:'出牌阶段限一次，你可以翻面，并对一至三名其他角色造成一点岩属性伤害（若包含多名角色，这些角色需体力值均小于你）（若你存在“蛇绞”对象，此技能只能对其发动；你对“蛇绞”目标发动〖岩崩〗时，不翻面改为解除“蛇绞”），然后你弃置其一张牌。',
			
			cyyydsgs_shejiao:'蛇绞',
			cyyydsgs_shejiao_info:'出牌阶段限一次，你可以指定一名体力值小于你的其他角色，令其被你“蛇绞”直到你下个出牌阶段开始（锁定技，若“蛇绞”你的角色存在，你不能使用手牌。）。',
			cyyydsgs_shejiao_info_1:'出牌阶段限一次，你可以指定一名体力值小于你的其他角色，令其被你“蛇绞”直到你下个出牌阶段开始（锁定技，若“蛇绞”你的角色存在，你不能使用手牌。）。',
			cyyydsgs_shejiao_info_2:'出牌阶段限一次，你可以指定一名体力值小于你的其他角色，令其被你“蛇绞”直到你下个出牌阶段开始（锁定技，若“蛇绞”你的角色存在，你不能使用手牌。）；被你“蛇绞”的角色结束阶段，你可弃置其一张牌。',
			cyyydsgs_shejiao_info_3:'出牌阶段限一次，你可以指定一名体力值小于你的其他角色，令其被你“蛇绞”直到你下个出牌阶段开始（锁定技，若“蛇绞”你的角色存在，你不能使用手牌。）；被你“蛇绞”的角色结束阶段，你可弃置其一张牌或令其失去一点体力。',
			cyyydsgs_shejiao_info_4:'出牌阶段限一次，你可以指定一名其他角色，令其被你“蛇绞”直到你下个出牌阶段开始（锁定技，若“蛇绞”你的角色存在，你不能使用手牌。）；被你“蛇绞”的角色受到的伤害均附加岩属性；被你“蛇绞”的角色结束阶段，你可弃置其一张牌或令其失去一点体力。',
			cyyydsgs_shejiao_info_5:'出牌阶段限一次，你可以指定一至三名其他角色（若包含多名角色，这些角色需体力值均小于你），令其被你“蛇绞”直到你下个出牌阶段开始（锁定技，若“蛇绞”你的角色存在，你不能使用手牌。）；被你“蛇绞”的角色受到的伤害均附加岩属性；被你“蛇绞”的角色结束阶段，你可弃置其一张牌或令其失去一点体力。',

			//风蚀鹫
			//一技能也是风行的说

		},
		dynamicTranslate:{
			// cyyydsgs_leishan:function(){},
		},


		perfectPair:{},
		//夜白自创的一些小功能）
		characterCitetext:{},
		characterUndertext:{},
		accessoryPacket:{},//附属将包
		characterLightextParent:{},
		characterLightext:{},

	}
	for(var i in cyyydsgs.skill){
		if(cyyydsgs.skill[i].cyyydsgs){
			cyyydsgs.translate[i+'_info'] = `
				<p><span class="clickable-text" onclick="
					var element = this;
					if (!element.dataset.num) {
						element.dataset.num = 1;
					} else {
						element.dataset.num = lib.translate['${i}' + '_info_' + (parseInt(element.dataset.num) + 1).toString()]?(parseInt(element.dataset.num) + 1).toString():'1';
						
					}
					var text = lib.translate['${i}' + '_info_' + element.dataset.num];
					element.textContent = get.cnNumber(element.dataset.num) + '阶：' + text;
				" oncontextmenu="
					var element = this;
					if (!element.dataset.num) {
						element.dataset.num = 1;
					} else {
						element.dataset.num = lib.translate['${i}' + '_info_' + (parseInt(element.dataset.num) + 1).toString()]?(parseInt(element.dataset.num) + 1).toString():'1';
						
					}
					var text = lib.translate['${i}' + '_info_' + element.dataset.num];
					element.textContent = get.cnNumber(element.dataset.num) + '阶：' + text;
				">点此预览全部描述</span></p>
			`
			cyyydsgs.dynamicTranslate[i] = function(iVal) { // 使用立即函数捕获i的当前值
				return function(player) {
					var num = get.YB_skill_lv(iVal, player);
					return '<span class = yellowtext>'+get.cnNumber(num)+'阶：</span>'+cyyydsgs.translate[iVal + '_info_' + num];
				};
			}(i);
			if(!cyyydsgs.skill[i].init){
				cyyydsgs.skill[i].init = function(iVal){
					return function(player,iVal){
						if(!player.YB_skill_lv)player.YB_skill_lv={}
						if(!get.YB_character_lv(player.name))player.YB_skill_lv[iVal] = 1
						else return player.YB_skill_lv[iVal]=get.YB_character_lv(player.name)
					}
				}(i)
			}
			if(!cyyydsgs.skill[i].mark){
				let node = cyyydsgs.skill[i];
				node.mark = cyyydsgs.translate[i].charAt(0);
				node.intro = {
					
				};
				node.intro.markcount = function(iVal){
					return function(storage,player,iVal){
						var num = get.YB_skill_lv(iVal, player);
						return num
					}
				}(i)
				node.intro.name = cyyydsgs.translate[i];
				node.intro.content = function(iVal){
					return function(storage,player,iVal){
						var num = get.YB_skill_lv(iVal, player);
						return '<span class = yellowtext>'+get.cnNumber(num)+'阶：</span>'+cyyydsgs.translate[iVal + '_info_' + num];
					}
				}(i);
			}
		}
	}
	// for (var i in cyyydsgs.skill) {
	//	 if (cyyydsgs.skill[i].cyyydsgs) {
	//	 }
	// }
	typeimage(cyyydsgs,'cyyydsgs')
	for(var i in cyyydsgs.card){
		if(!cyyydsgs.card[i].image) cyyydsgs.card[i].image='ext:夜白神略/image/card/'+i+'.png'
	}

	lib.config.all.characters.add('cyyydsgs');
	lib.translate['cyyydsgs_character_config'] = '<span class="yellowtext">武将觉醒</span>';
	game.import('character',cyyydsgs);
	
	// /**@type { () => importModeConfig } */
	// var YB_free = function(){
	// 	return {
	// 		start:function(){
	// 			'step 0'
	// 			var next = game.createEvent("gameStart");
	// 			next.content(function(){
	// 				ui.arena.classList.add("choose-character");

	// 			})
				
	// 		},
	// 		game:{
	// 			over(){},
	// 		},
	// 		element:{},
	// 		get:{},
	// 		skill:{},
	// 		card:{},
	// 		translate:{},
	// 		characterPack: {},
	// 		cardPack: {},
	// 		posmap: {},
	// 	}
	// }
	// game.addMode('YB_free',YB_free,{
	// 	translate:'自由',
	// 	config:{
	// 		// intro: {
    //         //     name: '自由',
    //         //     frequent: true,
    //         //     clear: true,
    //         // },
	// 	},
	// })
	// lib.mode.YB_free.splash = 'ext:夜白神略/YB_mode.jpg';
	
	if (false) {
		if (lib.brawl) lib.brawl.YB_wuhunjuexing = {

			name: "武魂觉醒",
			mode: "identity",
			intro: ["杀死所有其他角色，成为最后的存活者", "所有角色改为四血白板，依靠对局行为获得魂力。魂力达到阈值可以增加属性以及获得魂技"],
			showcase: function (init) {
				if (init) {
					this.nodes = [];
				} else {
					while (this.nodes.length) {
						this.nodes.shift().remove();
					}
				}
				var lx = this.offsetWidth / 2 - 120;
				var ly = Math.min(lx, this.offsetHeight / 2 - 60);
				var setPos = function (node) {
					var i = node.index;
					var deg = (Math.PI / 4) * i;
					var dx = Math.round(lx * Math.cos(deg));
					var dy = Math.round(ly * Math.sin(deg));
					node.style.transform = "translate(" + dx + "px," + dy + "px)";
				};
				var characterz = ["guyong", "litong", "mazhong", "fuwan", "chengpu", "liaohua", "xinxianying", "liuyu"];
				for (var i = 0; i < 8; i++) {
					var node = ui.create.player(null, true);
					this.nodes.push(node);
					node.init(characterz[i]);
					node.classList.add("minskin");
					node.node.marks.remove();
					node.node.hp.remove();
					node.node.count.remove();
					node.style.left = "calc(50% - 60px)";
					node.style.top = "calc(50% - 60px)";
					node.index = i;
					node.style.borderRadius = "100%";
					node.node.avatar.style.borderRadius = "100%";
					node.node.name.remove();
					setPos(node);
					this.appendChild(node);
				}
				var nodes = this.nodes;
				this.showcaseinterval = setInterval(function () {
					for (var i = 0; i < nodes.length; i++) {
						nodes[i].index++;
						if (nodes[i].index > 7) {
							nodes[i].index = 0;
						}
						setPos(nodes[i]);
					}
				}, 1000);
			},
			init: function () {
				lib.element.player.YB_hunliLevel;
				lib.element.player.addHunli = function (num) {
					var player = this;
					var numb = player.YB_hunliLevel;
					if (player.countMark('_YB_hunli') >= player.YB_maxHunli(numb)) {
						var str = numb >= 9 ? '魂力达到了世间巅峰' : '魂力达到了上限，请吸收魂环';
						game.log(player, str);
					}
					else {
						if (player.YB_maxHunli(numb) - player.countMark('_YB_hunli') < num) {
							num = player.YB_maxHunli(numb) - player.countMark('_YB_hunli');
						}
						player.addMark(num);
					}
				}
				lib.element.player.YB_maxHunli = function (numb) {
					var player = this;
					var num = numb || player.YB_hunliLevel || 0;
					var list = [10, 30, 60, 100, 150, 210, 280, 360, 450, 550,];
					return list[num];
				}
				lib.element.player.YB_hunliLevelUp = function () {
					if (!player.YB_hunliLevel) player.YB_hunliLevel = 0;
					player.YB_hunliLevel++;
				}
				lib.skill._YB_hunli = {
					mark: true,
					marktext: '魂',
					intro: {
						name: '魂力',
						content(storage, player, skill) {
							var numb = player.YB_hunliLevel;
							return '<li>当前魂力<li>' + player.countMark('_YB_hunli') + '/' + player.YB_maxHunli(numb);
						},
					},
				}
			},
			content: {
				submode: "normal",
				chooseCharacterBefore: function () {
					game.identityVideoName = "武魂觉醒";
					var skills = [];
					var banned = [
						"xinfu_guhuo",
						"reguhuo",
						"jixi",
						"duanchang",
						"huashen",
						"xinsheng",
						"rehuashen",
						"rexinsheng",
						"jinqu",
						"nzry_binglve",
						"nzry_huaiju",
						"nzry_yili",
						"nzry_zhenglun",
						"nzry_mingren",
						"nzry_zhenliang",
						"drlt_qingce",
						"new_wuhun",
						"qixing",
						"kuangfeng",
						"dawu",
						"baonu",
						"wumou",
						"ol_wuqian",
						"ol_shenfen",
						"renjie",
						"jilue",
						"nzry_junlve",
						"nzry_dinghuo",
						"drlt_duorui",
						"chuanxin",
						"cunsi",
						"jueqing",
						"huilei",
						"paiyi",
						"fuhun",
						"zhuiyi",
						"olddanshou",
						"yanzhu",
						"juexiang",
						"jiexun",
						"bizhuan",
						"tongbo",
						"xinfu_zhanji",
						"xinfu_jijun",
						"xinfu_fangtong",
						"xinfu_qianchong",
						"pdgyinshi",
						"shuliang",
						"zongkui",
						"guju",
						"bmcanshi",
						"dingpan",
						"xinfu_lingren",
						"new_luoyan",
						"junwei",
						"gxlianhua",
						"qizhou",
						"fenyue",
						"dianhu",
						"linglong",
						"fenxin",
						"mouduan",
						"cuorui",
						"xinmanjuan",
						"xinfu_jianjie",
						"jianjie_faq",
						"new_meibu",
						"xinfu_xingzhao",
						"jici",
						"xianfu",
						"fenyong",
						"xuehen",
						"midao",
						"yishe",
						"yinbing",
						"juedi",
						"bushi",
						"xinfu_dianhua",
						"xinfu_falu",
						"xinfu_zhenyi",
						"lskuizhu",
						"pingjian",
						"xjshijian",
						"fentian",
						"zhiri",
						"xindan",
						"xinzhengnan",
						"xinfu_xiaode",
						"komari_xueshang",
						"qiaosi_map",
					];
					var characters = [];
					for (var name in lib.character) {
						if (!lib.character[name]) {
							continue;
						}
						if (lib.filter.characterDisabled(name)) {
							continue;
						}
						if (name.indexOf("old_") == 0) {
							continue;
						}
						var skillsx = lib.character[name][3].slice(0);
						lib.character[name].hp = 4;
						lib.character[name].maxHp = 4;
						lib.character[name].hujia = 0;
						lib.character[name].skills = [];
						lib.character[name].hasHiddenSkill = false;
						characters.push(name);
						var list = skillsx.slice(0);
						for (var j = 0; j < skillsx.length; j++) {
							var info = get.info(skillsx[j]);
							if (!info) {
								skillsx.splice(j, 1);
								list.splice(j--, 1);
								continue;
							}
							if (typeof info.derivation == "string") {
								list.push(info.derivation);
							} else if (Array.isArray(info.derivation)) {
								list.addArray(info.derivation);
							}
						}
						for (var j = 0; j < list.length; j++) {
							if (skills.includes(list[j]) || banned.includes(list[j])) {
								continue;
							}
							var info = get.info(list[j]);
							if (!info || info.zhuSkill || info.juexingji || info.charlotte || info.limited || info.hiddenSkill || info.dutySkill || info.groupSkill || (info.ai && info.ai.combo)) {
								continue;
							}
							skills.push(list[j]);
						}
					}
					_status.characterlist = characters;
					var pack = {
						skills: skills,
						pack: {
							card: {
								hhzz_toulianghuanzhu: {
									enable: true,
									cardimage: "toulianghuanzhu",
									recastable: true,
									type: "trick",
									filterTarget: function (card, player, target) {
										return target.skillH.length > 0;
									},
									content: function () {
										target.removeSkillH(target.skillH.randomGet());
										var skills = lib.huanhuazhizhan.skills;
										skills.randomSort();
										for (var i = 0; i < skills.length; i++) {
											if (!target.skillH.includes(skills[i])) {
												target.addSkillH(skills[i]);
												break;
											}
										}
									},
									ai: {
										order: 10,
										result: {
											target: function () {
												return 0.5 - Math.random();
											},
										},
									},
								},
								hhzz_fudichouxin: {
									enable: true,
									cardimage: "fudichouxin",
									type: "trick",
									filterTarget: function (card, player, target) {
										return target.skillH.length > 0;
									},
									content: function () {
										target.removeSkillH(target.skillH.randomGet());
									},
									ai: {
										order: 10,
										result: { target: -1 },
									},
								},
							},
							character: {
								hhzz_shiona: {
									sex: "female",
									group: "key",
									hp: 1,
									skills: ["hhzz_huilei"],
								},
								hhzz_kanade: {
									sex: "female",
									group: "key",
									hp: 2,
									skills: ["hhzz_youlian"],
								},
								hhzz_takaramono1: {
									sex: "male",
									group: "qun",
									hp: 5,
									skills: ["hhzz_jubao", "hhzz_huizhen"],
								},
								hhzz_takaramono2: {
									sex: "male",
									group: "qun",
									hp: 3,
									skills: ["hhzz_jubao", "hhzz_zhencang"],
								},
							},
							skill: {
								_lingli_damage: {
									trigger: { source: "damage" },
									forced: true,
									popup: false,
									filter: function (event, player) {
										return event.player == player._toKill;
									},
									content: function () {
										game.log(player, "对击杀目标造成了伤害");
										player.changeLingli(trigger.num);
									},
								},
								_lingli: {
									mark: true,
									marktext: "灵",
									popup: "聚灵",
									intro: {
										name: "灵力",
										content: "当前灵力点数：# / 5",
									},
									trigger: {
										player: "phaseBeginStart",
									},
									prompt: "是否消耗2点灵力获得一个技能？",
									filter: function (event, player) {
										return player.storage._lingli > 1;
									},
									check: function (event, player) {
										return player.skillH.length < 3;
									},
									content: function () {
										"step 0";
										player.changeLingli(-2);
										"step 1";
										event.skills = lib.huanhuazhizhan.skills;
										var skills = event.skills;
										skills.randomSort();
										var list = [];
										for (var i = 0; i < skills[i].length; i++) {
											if (!player.skillH.includes(skills[i])) {
												list.push(skills[i]);
											}
											if (list.length == 3) {
												break;
											}
										}
										if (!list.length) {
											event.finish();
											return;
										}
										if (player.storage._lingli > 0) {
											list.push("刷新");
										}
										event.list = list;
										var dialog = game.getSkillDialog(event.list, "选择获得一个技能");
										player.chooseControl(event.list).set("ai", function () {
											return 0;
										}).dialog = dialog;
										"step 2";
										if (result.control == "刷新") {
											player.changeLingli(-1);
											event.goto(1);
											return;
										}
										event.skill = result.control;
										if (player.skillH.length == 3) {
											event.lose = true;
											player.chooseControl(player.skillH).prompt = "选择失去1个已有技能";
										}
										"step 3";
										if (event.lose) {
											player.removeSkillH(result.control);
										}
										player.addSkillH(event.skill);
									},
								},
								_lingli_round: {
									trigger: { global: "roundStart" },
									forced: true,
									popup: false,
									filter: function (event, player) {
										return _status._aozhan != true && game.roundNumber > 1;
									},
									content: function () {
										player.changeLingli(1);
									},
								},
								_lingli_draw: {
									enable: "phaseUse",
									filter: function (event, player) {
										return player.storage._lingli > 0;
									},
									content: function () {
										player.changeLingli(-1);
										player.draw();
									},
									delay: 0,
									ai: {
										order: 10,
										result: {
											player: function (player) {
												return player.storage._lingli - 2 * (3 - player.skillH.length) > 0 ? 1 : 0;
											},
										},
									},
								},
								_lingli_save: {
									trigger: { target: "useCardToTargeted" },
									forced: true,
									popup: false,
									filter: function (event, player) {
										return event.card.name == "tao" && player == event.player._toSave;
									},
									content: function () {
										game.log(trigger.player, "帮助了保护目标");
										trigger.player.changeLingli(1);
									},
								},
								_hhzz_qiankunbagua: {
									trigger: { player: "phaseAfter" },
									forced: true,
									forceDie: true,
									popup: false,
									filter: function (event, player) {
										return (_status._aozhan && !player.getStat("damage") && player.isAlive()) || event._lastDead != undefined;
									},
									content: function () {
										"step 0";
										if (_status._aozhan && !player.getStat("damage")) {
											player.loseHp();
											player.changeLingli(1);
											game.log(player, "本回合内未造成伤害，触发死战模式惩罚");
										}
										if (trigger._lastDead == undefined) {
											event.goto(2);
										}
										"step 1";
										var type = get.rand(1, 8);
										event.type = type;
										trigger._lastDead.playerfocus(1200);
										player.$fullscreenpop("乾坤八卦·" + ["离", "坎", "乾", "震", "兑", "艮", "巽", "坤"][type - 1], get.groupnature(trigger._lastDead.group, "raw"));
										game.delay(1.5);
										"step 2";
										var type = event.type;
										switch (type) {
											case 1: {
												game.countPlayer(function (current) {
													current.loseHp();
												});
												break;
											}
											case 2: {
												game.countPlayer(function (current) {
													current.draw(2, "nodelay");
												});
												break;
											}
											case 3: {
												trigger._lastDead.revive(3);
												trigger._lastDead.draw(3);
												break;
											}
											case 4: {
												game.countPlayer(function (current) {
													var he = current.getCards("he");
													if (he.length) {
														current.discard(he.randomGet()).delay = false;
													}
												});
												break;
											}
											case 5: {
												game.countPlayer(function (current) {
													current.changeLingli(1);
												});
												break;
											}
											case 6: {
												var cards = [];
												game.countPlayer(function (current) {
													var card = get.cardPile(function (card) {
														return !cards.includes(card) && get.type(card) == "equip";
													});
													if (card) {
														cards.push(card);
														current.$gain(card, "gain2");
														current.gain(card);
													}
												});
												break;
											}
											case 7: {
												game.countPlayer(function (current) {
													if (current.skillH.length < 3) {
														var skills = lib.huanhuazhizhan.skills;
														skills.randomSort();
														for (var i = 0; i < skills.length; i++) {
															if (!current.skillH.includes(skills[i])) {
																current.addSkillH(skills[i]);
																break;
															}
														}
													}
												});
												break;
											}
											case 8: {
												trigger._lastDead.revive(null, false);
												trigger._lastDead.uninit();
												trigger._lastDead.init(["hhzz_shiona", "hhzz_kanade", "hhzz_takaramono1", "hhzz_takaramono2"].randomGet());
												trigger._lastDead.skillH = lib.character[trigger._lastDead.name][3].slice(0);
												trigger._lastDead.addSkill("hhzz_noCard");
												break;
											}
										}
										"step 3";
										if (game.playerx().length <= 4 && !_status._aozhan) {
											game.countPlayer2(function (current) {
												delete current._toKill;
												delete current._toSave;
											});
											ui.huanhuazhizhan.innerHTML = "死战模式";
											_status._aozhan = true;
											game.playBackgroundMusic();
											trigger._lastDead.$fullscreenpop("死战模式", get.groupnature(trigger._lastDead.group, "raw") || "fire");
										} else {
											game.randomMission();
										}
									},
								},
								hhzz_noCard: {
									mod: {
										cardEnabled: function () {
											return false;
										},
										cardSavable: function () {
											return false;
										},
										cardRespondable: function () {
											return false;
										},
									},
								},
								hhzz_huilei: {
									trigger: { player: "die" },
									forced: true,
									forceDie: true,
									skillAnimation: true,
									logTarget: "source",
									filter: function (event, player) {
										return event.source != undefined;
									},
									content: function () {
										var source = trigger.source;
										var cards = source.getCards("he");
										if (cards.length) {
											source.discard(cards);
										}
									},
									ai: {
										effect: {
											target: function (card, player, target) {
												if (get.tag(card, "damage")) {
													return [-5, 0];
												}
											},
										},
									},
								},
								hhzz_youlian: {
									trigger: { player: "die" },
									forced: true,
									forceDie: true,
									skillAnimation: true,
									logTarget: "source",
									filter: function (event, player) {
										return event.source != undefined;
									},
									content: function () {
										var source = trigger.source;
										var cards = source.getCards("he");
										if (cards.length) {
											source.discard(cards);
										}
										var skills = source.skillH;
										if (skills.length) {
											source.removeSkillH(skills.randomGet());
										}
									},
									ai: {
										effect: {
											target: function (card, player, target) {
												if (get.tag(card, "damage")) {
													return [-5, 0];
												}
											},
										},
									},
								},
								hhzz_zhencang: {
									trigger: { player: "die" },
									forced: true,
									filter: function (event, player) {
										return event.source != undefined;
									},
									forceDie: true,
									logTarget: "source",
									content: function () {
										var source = trigger.source;
										source.draw();
										if (source.skillH.length == 3) {
											source.removeSkillH(source.skillH.randomGet());
										}
										var skills = lib.huanhuazhizhan.skills;
										skills.randomSort();
										for (var i = 0; i < skills.length; i++) {
											if (!source.skillH.includes(skills[i])) {
												source.addSkillH(skills[i]);
												break;
											}
										}
									},
								},
								hhzz_huizhen: {
									trigger: { player: "die" },
									forced: true,
									forceDie: true,
									logTarget: "source",
									filter: function (event, player) {
										return event.source != undefined;
									},
									content: function () {
										var source = trigger.source;
										source.draw(3);
										if (source.skillH.length == 3) {
											source.removeSkillH(source.skillH.randomGet());
										}
										var skills = lib.huanhuazhizhan.skills;
										skills.randomSort();
										for (var i = 0; i < skills.length; i++) {
											if (!source.skillH.includes(skills[i])) {
												source.addSkillH(skills[i]);
												break;
											}
										}
									},
								},
								hhzz_jubao: {
									trigger: { player: "damage" },
									forced: true,
									logTarget: "source",
									filter: function (event, player) {
										return event.source != undefined && player.countCards("he") > 0;
									},
									content: function () {
										var cards = player.getCards("he");
										cards.randomSort();
										cards = cards.slice(0, trigger.num);
										trigger.source.gain("give", cards, player);
									},
									ai: {
										effect: {
											target: function (card, player, target) {
												if (get.tag(card, "damage")) {
													return [15, 0];
												}
											},
										},
									},
								},
							},
							translate: {
								_lingli: "聚灵",
								_lingli_bg: "灵",
								_lingli_draw: "聚灵",
								hhzz_huilei: "挥泪",
								hhzz_youlian: "犹怜",
								hhzz_zhencang: "珍藏",
								hhzz_huizhen: "汇珍",
								hhzz_jubao: "聚宝",
								hhzz_huilei_info: "锁定技，杀死你的角色弃置所有的牌。",
								hhzz_youlian_info: "锁定技，杀死你的角色弃置所有牌并随机失去一个技能。",
								hhzz_zhencang_info: "锁定技，杀死你的角色摸一张牌并随机获得一个技能(已满则先随机移除一个)。",
								hhzz_huizhen_info: "锁定技，杀死你的角色摸三张牌并随机获得一个技能(已满则先随机移除一个)。",
								hhzz_jubao_info: "锁定技，当你受到伤害的点数确定时，伤害来源随机获得你区域内的X张牌（X为伤害点数）。",
								hhzz_shiona: "汐奈",
								hhzz_kanade: "立华奏",
								hhzz_takaramono1: "坚实宝箱",
								hhzz_takaramono2: "普通宝箱",
								hhzz_toulianghuanzhu: "偷梁换柱",
								hhzz_fudichouxin: "釜底抽薪",
								hhzz_toulianghuanzhu_info: "出牌阶段，对一名角色使用，随机更换其一个技能。可重铸。",
								hhzz_fudichouxin_info: "出牌阶段，对一名角色使用，随机弃置其一个技能。",
								nei: " ",
								nei2: " ",
								刷新_info: "消耗1点灵力值，刷新上述技能。",
							},
						},
						get: {
							rawAttitude: function (from, to) {
								if (from == to || to == from._toSave) {
									return 10;
								}
								if (to == from._toKill) {
									return -30;
								}
								return -10;
							},
						},
						eltc: {
							gameDraw: function () {
								var end = player;
								var numx;
								var num = function (player) {
									return player._hSeat > 5 ? 5 : 4;
								};
								do {
									if (typeof num == "function") {
										numx = num(player);
									}
									if (player._hSeat > 6) {
										player.changeLingli(1);
									}
									let cards = get.cards(numx);
									player.directgain(cards);
									player._start_cards = cards;
									player = player.next;
								} while (player != end);
							},
						},
						eltp: {
							addSkillH: function (skill) {
								this.skillH.add(skill);
								this.addSkillLog.apply(this, arguments);
							},
							removeSkillH: function (skill) {
								this.skillH.remove(skill);
								game.log(this, "失去了技能", "#g【" + get.translation(skill) + "】");
								this.removeSkill(skill);
							},
							dieAfter: function () {
								var evt = _status.event.getParent("phase");
								if (evt) {
									evt._lastDead = this;
								}
								if (game.playerx().length == 1) {
									game.over(game.me.isAlive());
								}
							},
							$dieAfter: function () { },
							hasUnknown: function () {
								return false;
							},
							isUnknown: function () {
								return false;
							},
							getEnemies: function () {
								var list = game.playerx();
								list.remove(this);
								return list;
							},
							dieAfter2: function (source) {
								if (source && this.name.indexOf("hhzz_") != 0) {
									if (source._toKill == this) {
										game.log(source, "击杀目标成功");
									}
									source.draw(this == source._toKill ? 2 : 1);
									source.changeLingli(this == source._toKill ? 3 : 2);
								}
								if (!_status._aozhan) {
									var that = this;
									game.countPlayer(function (current) {
										if (current._toSave == that) {
											game.log(current, "保护失败");
											var cards = current.getCards("he");
											if (cards.length) {
												current.discard(cards.randomGets(4));
											}
										}
									});
								}
							},
							logAi: function () { },
							changeLingli: function (num) {
								if (typeof num != "number") {
									num = 1;
								}
								if (typeof this.storage._lingli != "number") {
									this.storage._lingli = 0;
								}
								if (num > 0) {
									num = Math.min(num, 5 - this.storage._lingli);
									if (num < 1) {
										return;
									}
									game.log(this, "获得了", "#y" + get.cnNumber(num) + "点", "灵力");
								} else {
									if (-num > this.storage._lingli) {
										num = -this.storage._lingli;
									}
									if (num == 0) {
										return;
									}
									game.log(this, "失去了", "#y" + get.cnNumber(-num) + "点", "灵力");
								}
								this.storage._lingli += num;
								this.markSkill("_lingli");
							},
						},
						game: {
							playerx: function () {
								return game.filterPlayer(function (current) {
									if (current.name.indexOf("hhzz_") == 0) {
										return;
									}
									return true;
								});
							},
							randomMission: function () {
								if (_status._aozhan) {
									return;
								}
								if (!ui.huanhuazhizhan) {
									ui.huanhuazhizhan = ui.create.div(".touchinfo.left", ui.window);
									if (ui.time3) {
										ui.time3.style.display = "none";
									}
								}
								var players = game.playerx();
								for (var i = 0; i < players.length; i++) {
									var player = players[i];
									var list = players.slice(0).randomSort();
									list.remove(player);
									player._toKill = list[0];
									player._toSave = list[1];
								}
								ui.huanhuazhizhan.innerHTML = "击杀" + get.translation(game.me._toKill) + "，保护" + get.translation(game.me._toSave);
							},
							getSkillDialog: function (skills, prompt) {
								var dialog = ui.create.dialog("hidden", "forcebutton");
								if (prompt) {
									dialog.addText(prompt);
								}
								for (var i = 0; i < skills.length; i++) {
									dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' + get.translation(skills[i]) + "】</div><div>" + lib.translate[skills[i] + "_info"] + "</div></div>");
								}
								dialog.addText(" <br> ");
								return dialog;
							},
							chooseCharacter: function () {
								var next = game.createEvent("chooseCharacter");
								next.showConfig = true;
								next.setContent(function () {
									"step 0";
									game.zhu = game.players.randomGet();
									var i = 1;
									var current = game.zhu;
									while (true) {
										current.skillH = [];
										current._hSeat = i;
										current.identity = "nei";
										current.setNickname(get.cnNumber(i, true) + "号位");
										for (var ii in lib.huanhuazhizhan.eltp) {
											current[ii] = lib.huanhuazhizhan.eltp[ii];
										}
										current = current.next;
										i++;
										if (current == game.zhu) {
											break;
										}
									}
									ui.arena.classList.add("choose-character");
									game.me.chooseButton(["请选择角色形象", [_status.characterlist.randomRemove(5), "character"]], true).onfree = true;
									"step 1";
									game.me.init(result.links[0]);
									var list = ["xiandeng", "shulv", "xisheng"];
									game.me.chooseControl(list).dialog = game.getSkillDialog(list, "选择要获得的初始技能");
									"step 2";
									var list = ["_lingli", "_lingli_round", "_lingli_draw", "_lingli_save", "_hhzz_qiankunbagua", "_lingli_damage"];
									for (var i = 0; i < list.length; i++) {
										game.addGlobalSkill(list[i]);
									}
									game.me.addSkillH(result.control);
									game.countPlayer(function (current) {
										if (!current.name) {
											current.init(_status.characterlist.randomRemove(1)[0]);
											current.addSkillH(["xiandeng", "shulv", "xisheng"].randomGet());
										}
										current.storage._lingli = 0;
										current.markSkill("_lingli");
									});
									game.showIdentity(true);
									"step 3";
									game.randomMission();
									var list = [game.createCard("hhzz_fudichouxin"), game.createCard("hhzz_toulianghuanzhu"), game.createCard("hhzz_toulianghuanzhu"), game.createCard("hhzz_toulianghuanzhu")];
									for (var i = 0; i < list.length; i++) {
										ui.cardPile.insertBefore(list[i], ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
									}
									game.updateRoundNumber();
									"step 4";
									setTimeout(function () {
										ui.arena.classList.remove("choose-character");
									}, 500);
									_status.videoInited = true;
									game.addVideo("arrangeLib", null, {
										skill: {
											_lingli_damage: {},
											_lingli: {
												mark: true,
												marktext: "灵",
												popup: "聚灵",
												intro: {
													name: "灵力",
													content: "当前灵力点数：# / 5",
												},
											},
											_lingli_round: {},
											_lingli_draw: {},
											_lingli_save: {},
											hhzz_noCard: {},
											hhzz_huilei: {
												skillAnimation: true,
											},
											hhzz_youlian: {
												skillAnimation: true,
											},
											hhzz_zhencang: {},
											hhzz_huizhen: {},
											hhzz_jubao: {},
										},
										card: {
											hhzz_toulianghuanzhu: {
												cardimage: "toulianghuanzhu",
											},
											hhzz_fudichouxin: {
												cardimage: "fudichouxin",
											},
										},
										character: {
											hhzz_shiona: {
												sex: "female",
												group: "key",
												hp: 1,
												skills: ["hhzz_huilei"],
											},
											hhzz_kanade: {
												sex: "female",
												group: "key",
												hp: 2,
												skills: ["hhzz_youlian"],
											},
											hhzz_takaramono1: {
												sex: "male",
												group: "qun",
												hp: 5,
												skills: ["hhzz_jubao", "hhzz_huizhen"],
											},
											hhzz_takaramono2: {
												sex: "male",
												group: "qun",
												hp: 3,
												skills: ["hhzz_jubao", "hhzz_zhencang"],
											},
										},
										translate: {
											_lingli: "聚灵",
											_lingli_bg: "灵",
											_lingli_draw: "聚灵",
											hhzz_huilei: "挥泪",
											hhzz_youlian: "犹怜",
											hhzz_zhencang: "珍藏",
											hhzz_huizhen: "汇珍",
											hhzz_jubao: "聚宝",
											hhzz_huilei_info: "锁定技，杀死你的角色弃置所有的牌。",
											hhzz_youlian_info: "锁定技，杀死你的角色弃置所有牌并随机失去一个技能。",
											hhzz_zhencang_info: "锁定技，杀死你的角色摸一张牌并随机获得一个技能(已满则先随机移除一个)。",
											hhzz_huizhen_info: "锁定技，杀死你的角色摸三张牌并随机获得一个技能(已满则先随机移除一个)。",
											hhzz_jubao_info: "锁定技，当你受到伤害的点数确定时，伤害来源随机获得你区域内的X张牌（X为伤害点数）。",
											nei: " ",
											nei2: " ",
											hhzz_shiona: "汐奈",
											hhzz_kanade: "立华奏",
											hhzz_takaramono1: "坚实宝箱",
											hhzz_takaramono2: "普通宝箱",
											hhzz_toulianghuanzhu: "偷梁换柱",
											hhzz_fudichouxin: "釜底抽薪",
											hhzz_toulianghuanzhu_info: "出牌阶段，对一名角色使用，随机更换其一个技能。可重铸。",
											hhzz_fudichouxin_info: "出牌阶段，对一名角色使用，随机弃置其一个技能。",
										},
									});
								});
							},
						},
					};
					var func = function (pack) {
						for (var i in pack.pack) {
							for (var j in pack.pack[i]) {
								lib[i][j] = pack.pack[i][j];
							}
						}
						for (var i in pack.eltc) {
							lib.element.content[i] = pack.eltc[i];
						}
						for (var i in pack.eltp) {
							lib.element.player[i] = pack.eltp[i];
						}
						for (var i in pack.game) {
							game[i] = pack.game[i];
						}
						for (var i in pack.get) {
							get[i] = pack.get[i];
						}
						lib.huanhuazhizhan = pack;
					};
					func(pack);
				},
			},

		}
	}
}
export { cyyydsgs2 }
const cyyydsgs2=function(){
	if(lib.brawl){
		lib.brawl.cyyydsgs = {
			name:'生存模式',
			mode:'identity',
			intro:[
				'你将从微末开始，一步一步登上顶峰',
			],
			init:function(){
				game.YB_save = function(lib, game, ui, get, ai, _status){
				}
				game.YB_load = function(lib, game, ui, get, ai, _status){
				}
				game.YB_hasload = function(){
					return lib.config?.cyyydsgs?.characters?.length;
				}
				// if(!_status.yebailvcheng)_status.yebailvcheng={}
				game.cyyydsgs_home = function(){
					var next=game.createEvent('cyyydsgs_home',false);
					next.setContent(function(){
						'step 0'
					})
				}
				
				lib.element.player.dieAfter=function(){
					if(this==game.fellow) return;
					_status.characterlist.removeArray(_status.yebailvcheng.used);
					if(game.zhu==this||!_status.characterlist.length){
						var bool=false;
						if(_status.yebailvcheng.completeNumber>5) bool=true;
						game.over(bool);
					}
					else{
						var next=game.createEvent('yebailvcheng_replace',false);
						next.setContent(_status.yebailvcheng.replace_character);
					}
				};
				lib.element.player.dieAfter2=function(){
					_status.characterlist.removeArray(_status.yebailvcheng.used);
				};
				game.zhu.dieAfter=lib.element.player.dieAfter;
				game.fan.dieAfter=lib.element.player.dieAfter;
				game.zhu.dieAfter2=lib.element.player.dieAfter2;
				game.fan.dieAfter2=lib.element.player.dieAfter2;
				
				if(!_status.cyyydsgs){
					_status.cyyydsgs = {
						completeNumber:0,
						player_lv:1,
						game_loading:0,
						used:[],
					}
				}
				_status.cyyydsgs=get.config('cyyydsgs');
				// if(!lib.character.cyyydsgs_yexuan){
				// 	if(lib.config.yebailvcheng.cyyydsgs_yexuan){
				// 		lib.character.cyyydsgs_yexuan = lib.config.yebailvcheng.cyyydsgs_yexuan;
				// 		lib.translate.cyyydsgs_yexuan = lib.config.yebailvcheng.cyyydsgs_yexuan.name;
				// 	}
				// 	else {
				// 		lib.character.cyyydsgs_yexuan = {
				// 			sex: "male",
				// 			group: "qun",
				// 			hp: 4,
				// 			skills: [],
				// 			// /**
				// 			//  * 将魂
				// 			//  */
				// 			// souls: [],
				// 			rankAdd:'legend',
				// 			name:'叶轩',
				// 		}
				// 		lib.translate.cyyydsgs_yexuan = '叶轩'
				// 	}
				// }
			},
			content:{
				submode:'normal',
				chooseCharacterBefore:function(){
					game.identityVideoName='生存模式';
					// game.saveConfig('cyyydsgs',_status.cyyydsgs,'identity');
					game.chooseCharacter=function(){
						var next=game.createEvent('chooseCharacter',false);
						next.showConfig=true;
						next.setContent(function(){
							'step 0'
							// ui.arena.classList.add('choose-character');

							// game.me.identity='zhu';
							// game.zhu=game.me;
							// game.me.init('cyyydsgs_yexuan');
							// game.zhu.setIdentity();
							// game.zhu.identityShown=true;
							// game.zhu.node.identity.classList.remove('guessing');
							// game.her1=game.me.next;
							// game.her2=game.her1.next;
							// game.her3=game.her2.next;
							// game.her4=game.her3.next;
							// game.her5=game.her4.next;
							// game.her6=game.her5.next;
							var list = []
							if(game.YB_hasload())list.push('读取存档');
							list.push('新建游戏');
							game.me.chooseControl(list);
							'step 1'
							if(result=='读取存档'){
								//这里应该有选择存档，然后根据存档的武将初始化自身，以及加载其他npc的数据
								event.goto(4);
							}
							'step 2'
							ui.arena.classList.add("choose-character");

							game.me.identity = "zhu";
							game.zhu = game.me;
							game.fan1 = game.me.next;
							game.fan1.identity = "fan";
							game.zhu.setIdentity();
							game.zhu.identityShown = true;
							game.zhu.node.identity.classList.remove("guessing");
							game.fan1.setIdentity();
							game.fan1.identityShown = true;
							game.fan1.node.identity.classList.remove("guessing");

							event.list = [];
							for (var i in lib.character) {
								if (lib.filter.characterDisabled(i)) {
									continue;
								}
								event.list.push(i);
							}
							event.list.randomSort();
							_status.characterlist = event.list.slice(0);
							var list = event.list.slice(0, 7);
							if(lib.character['cyyydsgs_yexuan'])list.push('cyyydsgs_yexuan')
							delete event.swapnochoose;
							var dialog;
							if (event.swapnodialog) {
								dialog = ui.dialog;
								event.swapnodialog(dialog, list);
								delete event.swapnodialog;
							} else {
								var str = "选择角色";
								dialog = ui.create.dialog(str, "hidden", [list, "character"]);
							}
							ui.create.cheat = function () {
								_status.createControl = ui.cheat2;
								ui.cheat = ui.create.control("更换", function () {
									if (ui.cheat2 && ui.cheat2.dialog == _status.event.dialog) {
										return;
									}
									if (game.changeCoin) {
										game.changeCoin(-3);
									}

									event.list.randomSort();
									list = event.list.slice(0, 5);

									var buttons = ui.create.div(".buttons");
									var node = _status.event.dialog.buttons[0].parentNode;
									_status.event.dialog.buttons = ui.create.buttons(list, "character", buttons);
									_status.event.dialog.content.insertBefore(buttons, node);
									buttons.addTempClass("start");
									node.remove();
									game.uncheck();
									game.check();
								});
								delete _status.createControl;
							};
							if (lib.onfree) {
								lib.onfree.push(function () {
									event.dialogxx = ui.create.characterDialog("heightset");
									if (ui.cheat2) {
										ui.cheat2.addTempClass("controlpressdownx", 500);
										ui.cheat2.classList.remove("disabled");
									}
								});
							} else {
								event.dialogxx = ui.create.characterDialog("heightset");
							}

							ui.create.cheat2 = function () {
								ui.cheat2 = ui.create.control("自由选将", function () {
									if (this.dialog == _status.event.dialog) {
										if (game.changeCoin) {
											game.changeCoin(10);
										}
										this.dialog.close();
										_status.event.dialog = this.backup;
										this.backup.open();
										delete this.backup;
										game.uncheck();
										game.check();
										if (ui.cheat) {
											ui.cheat.addTempClass("controlpressdownx", 500);
											ui.cheat.classList.remove("disabled");
										}
									} else {
										if (game.changeCoin) {
											game.changeCoin(-10);
										}
										this.backup = _status.event.dialog;
										_status.event.dialog.close();
										_status.event.dialog = _status.event.parent.dialogxx;
										this.dialog = _status.event.dialog;
										this.dialog.open();
										game.uncheck();
										game.check();
										if (ui.cheat) {
											ui.cheat.classList.add("disabled");
										}
									}
								});
								if (lib.onfree) {
									ui.cheat2.classList.add("disabled");
								}
							};
							if (!_status.brawl || !_status.brawl.chooseCharacterFixed) {
								if (!ui.cheat && get.config("change_choice")) {
									ui.create.cheat();
								}
								if (!ui.cheat2 && get.config("free_choose")) {
									ui.create.cheat2();
								}
							}
							'step 3'
							if (ui.cheat) {
								ui.cheat.close();
								delete ui.cheat;
							}
							if (ui.cheat2) {
								ui.cheat2.close();
								delete ui.cheat2;
							}
							game.addRecentCharacter(result.buttons[0].link);
							game.me.init(result.buttons[0].link);
							_status.characterlist.remove(result.buttons[0].link);
							_status.cyyydsgs.used.add(result.buttons[0].link);
							'step 4'
							game.cyyydsgs_home();
							
						})
					}
				},
			},
		}
	}

}