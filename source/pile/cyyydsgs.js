import { lib, game, ui, get, ai, _status } from '../../../../noname.js'
import { typeimage } from '../packages/function.js'
export async function cyyydsgs() {
	{//穿越也要打三国杀 前置必要代码
		//技能等级的必要代码（后续可能没用了
		{//等级
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
		//一些全局代码
		{
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
		}
	}
	//导入穿越也要打三国杀
	{
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
										if (get.event().att > 0) {
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
						content:'锁定技，受到属性伤害时，移除一枚“风盾”并防止之；当你获得风盾后，若大于体力上限且大于1，则移除超出的“风盾”。',
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
				buff_cyyydsgs_fengdun_info:'锁定技，受到属性伤害时，移除一枚“风盾”并防止之；当你获得风盾后，若大于体力上限且大于1，则移除超出的“风盾”。',
	
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
		// game.import('character',cyyydsgs);
	}
	//导入 新版将魂觉醒
	{
		var buff_jhjx_huafen = get.poptip({
			id: "buff2_jhjx_huafen",
			name: "花粉",
			type: "character",
			info: `锁定技，准备阶段，移除一枚“花粉”，然后弃置一张牌或失去一点体力。`,
		})
		var buff_jhjx_fengdun=get.poptip({
			id: "buff2_jhjx_fengdun",
			name: "风盾",
			type: "character",
			info: `锁定技，受到属性伤害时，移除一枚“风盾”并防止之；当你获得风盾后，若大于体力上限且大于1，则移除超出的“风盾”。`,
		})
		/** @type { importCharacterConfig } */
		var jhjx = {
			name: "jhjx",
			connect:false,//该武将包是否可以联机（必填） 
			characterSort:{
				jhjx:{
					jhjx_miwusenlin:[
						'jhjx_leimoying','jhjx_yanmohua','jhjx_fengmolang',
					],
					jhjx_luanshihuangyuan:[
						'jhjx_panshigui','jhjx_yancishan','jhjx_fengshijiu',
					],
					jhjx_tianzaijiejing:[
						'jhjx_leizaimo','jhjx_hongzaimo','jhjx_rongzaimo',
						'jhjx_baozaimo','jhjx_dizaimo','jhjx_zaieshizhe',
					],
					jhjx_renhuojiejing:[

					],
				}
			},
			character:{
				jhjx_leimoying:['none','qun',3,['jhjx_leishan','jhjx_jilei'],['rankAdd:epic','rankS:a','name:null|null']],
				jhjx_yanmohua:['none','qun',4,['jhjx_shengzhang','jhjx_huakai'],['rankAdd:epic','rankS:a','name:null|null']],
				jhjx_fengmolang:['none','qun',3,['jhjx_fengxing','jhjx_xuanfeng'],['rankAdd:epic','rankS:a','name:null|null']],

				jhjx_panshigui:['none','qun',5,['jhjx_jianshi','jhjx_zhendang'],['rankAdd:epic','rankS:a','name:null|null']],
				jhjx_yancishan:['none','qun','2/3/1',['jhjx_yanbeng','jhjx_shejiao'],['rankAdd:legend','rankS:s','name:null|null']],
				jhjx_fengshijiu:['none','qun',3,['jhjx_fengxing','jhjx_yanhuì'],['rankAdd:epic','rankS:a','name:null|null']],

				jhjx_leizaimo:['none','qun',3,['jhjx_leizai'],['rankAdd:rare','rankS:b','name:null|null']],
				jhjx_hongzaimo:['none','qun',3,['jhjx_hongzai'],['rankAdd:rare','rankS:b','name:null|null']],
				jhjx_rongzaimo:['none','qun',3,['jhjx_rongzai'],['rankAdd:rare','rankS:b','name:null|null']],
				jhjx_baozaimo:['none','qun',3,['jhjx_baozai'],['rankAdd:rare','rankS:b','name:null|null']],
				jhjx_dizaimo:['none','qun',3,['jhjx_dizai'],['rankAdd:rare','rankS:b','name:null|null']],
				jhjx_zaieshizhe:['none','qun',3,['jhjx_zaiyuan','jhjx_huanmo'],['rankAdd:legend','rankS:s','name:null|null']],
			},
			characterIntro:{},
			characterFilter:{},
			characterTitle:{},
	
	
	
			skill:{
				//迷雾森林
				//雷魔鹰
				// 雷闪
				jhjx_leishan:{
					audio:'ext:夜白神略/audio/character:1',
					usable(skill,player){
						return 1
					},
					enable:'phaseUse',
					filter(event,player){
						return player.countCards('he')>0;
					},
					position:'he',
					selectCard(){
						return [1,2];
					},
					filterCard: true,
					selectTarget(){
						return [1,2];
					},
					check(card){
						return get.value(card)<=6;
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
						damage: true,
						natureDamage:true,
						thunderDamage:true,
						result:{
							player:function(player,target){
								var num = ui.selected.cards.length;
								var num2 = get.damageEffect(player, player, player,'thunder');
								if(num==ui.selected.targets.length)return num2;
								return num*num2;
							},
							target:function(player,target){
								var num = ui.selected.cards.length;
								var num2 = get.damageEffect(player, player, target,'thunder')
								if(num==ui.selected.targets.length)return num2;
								return num*num2;
							}
						}
					},
				},
				//汲雷
				jhjx_jilei:{
					audio:'ext:夜白神略/audio/character:1',
					trigger:{
						source:'damageEnd',
						// player:'damageBegin3',
					},
					filter(event,player,name){
						if(!event.hasNature('thunder'))return false;
						return true;
					},
					getIndex(event,player,name){
						return event.num;
					},
					async cost(event,trigger,player){
						// let num = trigger.num;
						event.result = {bool:false,cost_data:{draw_card:false,recover_hp:false}}
						var result = null;
						const controls = ["draw_card"];
						if (player.isDamaged()) {
							event.num2 = Math.min(event.num2, player.getDamagedHp());
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
							next.set('prompt',get.prompt('jhjx_jilei'))
							next.set('prompt2',get.YB_prompt2('jhjx_jilei',null,player))
							result = await next.forResult();
						}
						
						if (result?.control != "cancel2") {
							event.result.bool=true;
							event.result.cost_data[result.control]=true;
						}
					
					},
					async content(event,trigger,player){
						if(event.cost_data.recover_hp)await player.recover();
						if(event.cost_data.draw_card)await player.draw();
					},
				},
				//魇魔花
				//生长
				jhjx_shengzhang:{
					audio:'ext:夜白神略/audio/character:1',
					forced:true,
					trigger:{
						player:'phaseZhunbeiBegin',
					},
					filter(event,player,name){
						return true;
					},
					async content(event,trigger,player){
						await player.recover();
						await player.draw(2);
					}
				},
				//花开
				jhjx_huakai:{
					audio:'ext:夜白神略/audio/character:1',
					usable:1,
					enable:'phaseUse',
					filter(event,player){
						return true;
					},
					selectTarget(){
						return [1,2]
					},
					filterTarget(card,player,target){
						return target!=player&&target.isIn();
					},
					content(){
						target.YB_addMark('buff_jhjx_huafen',1,'jhjx_huakai_phaseUse');
					},
					ai:{
						order:10,
						result:{
							player:1,
							target:-2,
						}
					},
					group:['jhjx_huakai_damage','jhjx_huakai_lose','jhjx_huakai_recover'],
					subSkill:{
						damage:{
							audio:'jhjx_huakai',
							trigger:{
								source:'damageEnd',
							},
							filter(event,player){
								return true;
							},
							prompt2:'当你对其他角色造成伤害时，你可以令其获得一枚“花粉”。',
							content(){
								player.line(trigger.player,'yellow')
								trigger.player.YB_addMark('buff_jhjx_huafen',1,'jhjx_huakai_damage');
							},
							check:function(event,player){
								return get.attitude(player,event.player)<0;
							},
						},
						lose:{
							audio:'jhjx_huakai',
							trigger:{
								global:'YB_removeMark_buff_jhjx_huafen',
							},
							filter(event,player){
								return false;
							},
							async cost(event, trigger, player) {
								var target = trigger.player;
								console.log(trigger)
								event.result = await player
									.choosePlayerCard('其他角色移除“花粉”时，你可以获得其一张牌', target, 'he')
									.set("ai", button => {
										let val = get.buttonValue(button);
										if (get.event().att > 0) {
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
							audio:'jhjx_huakai',
							trigger:{
								player:'recoverBegin',
							},
							filter(event,player){
								var players = game.countPlayer(function(c){
									return !c.countMark('buff_jhjx_huafen')&&c.isIn()
								})
								if(players.length==0)return false;
								return true;
							},
							async cost(event,trigger,player){
								event.result = await player.chooseTarget(1,'当你恢复体力时，你可以移除场上一枚“花粉”，令恢复值+1。').set('filterTarget',function(card,player,target){
									return target.countMark('buff_jhjx_huafen')>0;
								}).set('ai',function(target){
									if(player.hp+trigger.num>=player.maxHp){
										return -get.attitude(player,target)&&target.countMark('buff_jhjx_huafen')>1;
									}
									else if(get.attitude(player,target)){
										return true;
									}
									return -get.attitude(player,target)*target.countMark('buff_jhjx_huafen')*(target.countCards('he')+1);
								}).forResult();
								// if(result.bool){
								// 	event.result = {bool:true,targets:result.targets}
								// }
							},
							content(){
								event.targets[0].YB_removeMark('buff_jhjx_huafen',1,'jhjx_huakai_recover');
								trigger.num++;
							}
						}
					},
					derivation:['buff_jhjx_huafen'],
				},
				//花粉
				buff_jhjx_huafen:{
					nobracket:true,
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
						return player.countMark('buff_jhjx_huafen')>0;
					},
					async content(event,trigger,player){
						player.YB_removeMark('buff_jhjx_huafen',1,'buff_jhjx_huafen');
						var result = await player.chooseToDiscard('he',get.prompt('jhjx_huafen')).set("ai", function (card) {
							return 9 - get.value(card);
						}).forResult();
						if(!result.bool){
							await player.loseHp();
						}
					},
				},
				//风魔狼
				//风行
				jhjx_fengxing:{
					cyyydsgs:true,
					audio:'ext:夜白神略/audio/character:1',
					forced:true,
					trigger:{
						player:['phaseDrawBegin','loseAfter'/*,'YB_removeMark_buff_jhjx_fengdun'*/],
						global:'loseAsyncAfter',
					},
					filter(event,player,name){
						// var num = get.YB_skill_lv('cyyydsgs_fengxing',player);
						if(name=='phaseDrawBegin')return true;
						else {
							if(event.type=='discard'&&event.getd(player))return true;
						}
						// else {
						// 	// var evt = event.getParent();
						// 	// if(evt.skill =='buff_cyyydsgs_fengdun')return num==5;
						// 	// console.log(event)
						// 	// console.log(event.YB_type)
						// 	// console.log(event.getParent())
						// 	if(event.YB_type=='buff_cyyydsgs_water')return num==5;
						// }
					},
					async content(event,trigger,player){
						if(event.triggername=='phaseDrawBegin'){
							trigger.num+=2;
						}
						else {
							await player.YB_addMark('buff_jhjx_fengdun',1,'cyyydsgs_jhjx_discard');
						}
						// else {
						// 	await player.draw(2);
						// }
					},
					derivation:['buff_jhjx_fengdun'],
				},
				//风盾
				buff_jhjx_fengdun:{
					nobracket:true,
					mark:true,
					charlotte:true,
					marktext:'盾',
					intro:{
						content:'锁定技，受到属性伤害时，移除一枚“风盾”并防止之；当你获得风盾后，若大于体力上限且大于1，则移除超出的“风盾”。',
					},
					trigger:{
						player:['damageBegin3','YB_addMark_buff_jhjx_fengdun'],
					},
					filter(event,player,name){
						if(name=='damageBegin3')return event.hasNature();
						else if(player.countMark('buff_jhjx_fengdun')>Math.max(player.maxHp,1))return true;
					},
					forced:true,
					async content(event,trigger,player){
						if(event.triggername=='damageBegin3'){
							player.YB_removeMark('buff_jhjx_fengdun',1,'buff_jhjx_damage');
							trigger.cancel();
						}
						else {
							var numx = player.countMark('buff_jhjx_fengdun')-Math.max(player.maxHp,1);
							player.YB_removeMark('buff_jhjx_fengdun',numx,'buff_jhjx_water');
						}
					},
				},
				//旋风
				jhjx_xuanfeng:{
					cyyydsgs:true,
					audio:'ext:夜白神略/audio/character:1',
					trigger:{
						player:['phaseDiscardAfter','YB_removeMark_buff_jhjx_fengdun'],
					},
					filter(event,player,name){
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
							return event.YB_type=='buff_jhjx_damage';
						}
						
					},
					async cost(event,trigger,player){
						event.result = await player.chooseTarget([1,2],get.YB_prompt2('jhjx_xuanfeng',null,player),true).set('filterTarget',function(card,player,target){
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
						let num = get.YB_skill_lv('jhjx_xuanfeng',player);
						if(targets.length){
							for(var target of targets){
								if(target.isIn()){
									await target.damage('YB_wind');
									await player.discardPlayerCard('he',target,'he',1)
								}
							}
						}
					},
					//当你造成不包含风属性的非传导伤害或使用不包含风属性的伤害卡牌时，
					// 你可以移除一枚“风盾”，令此事件附着风属性。
					// group:['jhjx_xuanfeng_wind'],
					subSkill:{
						wind:{
							audio:'jhjx_xuanfeng',
							trigger:{
								// player:['useCard1'],
								source:['damageBegin1'],
							},
							filter(event,player,name){
								if(player.countMark('buff_jhjx_fengdun')<=0)return false;
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
								player.YB_removeMark('buff_jhjx_fengdun',1,'jhjx_xuanfeng_nowind');
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
								
								var next = game.createEvent("jhjx_xuanfeng_nowind");
								event.next.remove(next);
								trigger.after.push(next);
								next.setContent(function () {
									game.setNature(trigger, []);
								});
							}
						},
					},
				},
				//乱石荒原
				//磐石龟
				jhjx_jianshi:{
					audio:'ext:夜白神略/audio/character:1',
					forced:true,
					trigger:{
						player:['phaseJieshuBegin','changeHujiaAfter'],
						// player:'changeHujiaAfter',
					},
					filter(event,player,name){
						if(name=='phaseJieshuBegin') return true;
						return event.num < 0;
					},
					async content(event,trigger,player){
						if(event.triggername=='phaseJieshuBegin'){
							await player.changeHujia(1,null,true);
							await player.draw(1);
						}
						else{
							await player.draw(1);
						}
					},
				},
				jhjx_zhendang:{
					audio:'ext:夜白神略/audio/character:1',
					enable:'phaseUse',
					usable:1,
					// filterCard:false,
					filterTarget(card,player,target){
						return target.hasCard(card => lib.filter.canBeDiscarded(card, player, target),"hej");
						// return target.countCards('hej');
					},
					// multitarget:false,

					selectTarget:[1,2],
					// async content(event,trigger,player){
					// 	await player.damage();
					// 	var targets = event.targets;
					// 	if(targets.length){
					// 		for(var target of targets){
					// 			if(target.isIn()){
					// 				await player.discardPlayerCard('hej',target,true,1)
					// 			}
					// 		}
					// 	}
					// },
					contentBefore:function(){
						player.damage();
					},
					content(){
						player.discardPlayerCard('hej',target,true,1)
					},
					ai:{
						order:8,
						result:{
							player:function(player,target){
								return get.damageEffect(player,player,player)+player.hp+player.hujia-2;
							},
							target:function(player,target){
								return lib.card.guohe.ai.result.target(player,target);
							},
						},
					}
				},
				//岩刺蛇
				jhjx_yanbeng:{
					audio:'ext:夜白神略/audio/character:1',
					usable(skill,player){
						return 1
					},
					enable:'phaseUse',
					filter(event,player){
						return player.countCards('he')>0;
					},
					position:'he',
					// selectCard(){
					// 	return [1,2];
					// },
					// filterCard: true,
					// selectTarget(){
					// 	return [1,2];
					// },
					selectTarget(){
						var player = _status.event.player;
						if(player.storage.jhjx_shejiao&&player.storage.jhjx_shejiao.length){
							return -1
						}
						else return [1,2];
					},
					filterTarget(card,player,target){
						var str = []
						if(player.storage.jhjx_shejiao&&player.storage.jhjx_shejiao.length){
							if(!player.storage.jhjx_shejiao.includes(target))return false;
							else str.push('蛇绞') 
							// else target.prompt('蛇绞');
						}
						else if(ui.selected.targets.length){
							if(ui.selected.targets[0].hp>=player)return false;
							else {
								if(target.hp>=player.hp)return false;
								else {
									str.push('可压制')
								}
							}
						}
						target.prompt(str.join('<br>'))
						return target!=player;
					},
					// filterOk(){
					// 	return ui.selected.targets.length==ui.selected.cards.length||ui.selected.targets.length==1
					// },
					contentBefore:async function(event,trigger,player){
						event.targets.sortBySeat(player);
						if(player.storage.jhjx_shejiao&&player.storage.jhjx_shejiao.length){
							// await player.YB_jiechushejiao();
							await lib.skill.jhjx_shejiao.YB_jiechushejiao(player);
							for(let target of event.targets){
								await player.discardPlayerCard('he',target,true,1)
							}
							// await event.YB_jiechushejiao==true;
						}
						else {
							await player.turnOver();
						}
					},
					async content(event,trigger,player){
						// if(event.YB_jiechushejiao==true)await player.discardPlayerCard('he',event.target,true,1)
						await event.target.damage('YB_rock')
					},
					ai:{
						order:2,
						natureDamage:true,
						YB_rockDamage:true,
						result:{
							player:function(player,target){
								if(player.storage.jhjx_shejiao&&player.storage.jhjx_shejiao.length){
									return get.damageEffect(player, player, player,'YB_rock');
								}
								else {
									return player.isTurnedOver();
								}
								// var num2 = get.damageEffect(player, player, player,'YB_rock');
								// return num2;
							},
							target:function(player,target){
								var num2 = get.damageEffect(player, player, target,'YB_rock')
								return num2;
							}
						}
					},

				},
				jhjx_shejiao:{
					audio:'ext:夜白神略/audio/character:1',
					usable:1,
					enable:'phaseUse',
					selectTarget:1,
					filterTarget(card,player,target){
						return target!=player&&target.hp<player.hp&&!target.hasSkill('jhjx_shejiao');
					},
					content(){
						player.addTempSkill("jhjx_shejiao_clear", { player: "phaseUseBefore" });
						lib.skill.jhjx_shejiao.YB_shejiao(player,target);
					},
					YB_shejiao(player,target){
						if(!player.storage.jhjx_shejiao)player.storage.jhjx_shejiao = [];
						player.storage.jhjx_shejiao.push(target);
						target.addAdditionalSkills("jhjx_shejiao",'jhjx_shejiao_mark', true);
						// target.addMark('jhjx_shejiao',1,true)
						// target.markSkill('jhjx_shejiao_mark');
						// target.markSkill('jhjx_shejiao_mark');
					},
					YB_jiechushejiao(player){
						if(player.storage.jhjx_shejiao){
							if(player.storage.jhjx_shejiao.length){
								for(let target of player.storage.jhjx_shejiao){
									// target.unmarkSkill('jhjx_shejiao_mark');
									target.removeAdditionalSkills("jhjx_shejiao",'jhjx_shejiao_mark', true);
								}
							}
							delete player.storage.jhjx_shejiao;
						}
					},
					onremove:function(player){
						lib.skill.jhjx_shejiao.YB_jiechushejiao(player);
					},
					ai:{
						order:8,
						result:{
							target:function(player,target){
								return -10;
							}
						},
					},
					subSkill:{
						clear:{
							onremove(player) {
								// game.countPlayer(function (current) {
								// 	current.removeAdditionalSkills("jinghe_" + player.playerid);
								// });
								lib.skill.jhjx_shejiao.YB_jiechushejiao(player);
							},
							audio:'jhjx_shejiao',
							trigger:{
								global:'phaseJieshu',
							},
							filter(event,player){
								return player.storage.jhjx_shejiao&&player.storage.jhjx_shejiao.includes(event.player)&&event.player.isIn();
							},
							prompt2:function(event,player){
								var str = '被你蛇绞的'+get.translation(event.player)+'的结束阶段，是否弃置其一张牌或令其失去一点体力。';
								return str;
							},
							async cost(event,trigger,player){
								var controls = ['弃置一张牌','失去一点体力','cancel2'];
								var target = trigger.player;
								if(!target.hasCard(card => lib.filter.canBeDiscarded(card, player, target), "he")){
									controls.remove('弃置一张牌');
								}
								var result = await player.chooseControl(controls).set('prompt',get.prompt2(event.skill)).forResult();
								if(result.control!='cancel2'){
									event.result = {
										bool:true,
										cost_data:result.control,
									}
								}
							},
							content(){
								var target = trigger.player;
								if(event.cost_data=='弃置一张牌'){
									player.discardPlayerCard('he',player,true,1)
								}
								else {
									player.loseHp()
								}
							},
						},
						mark:{
							mark:true,
							marktext:'绞',
							intro:{
								name:'蛇绞',
								content:function(storage,player){
									var source;
									game.countPlayer(function(current){
										if(current.storage.jhjx_shejiao&&current.storage.jhjx_shejiao.includes(player)){
											source = current;
										}
									})
									if(source){
										return '已被'+get.translation(source)+'蛇绞'
									}
								}
							},
							mod:{
								cardEnabled2(card,player) {
									var source;
									game.countPlayer(function(current){
										if(current.storage.jhjx_shejiao&&current.storage.jhjx_shejiao.includes(player)){
											source = current;
										}
									})
									if(source&&source==_status.currentPhase){
										if (get.position(card) == "h") {
											return false;
										}
									}
								},
							},
							charlotte:true,
							forced:true,
						}
					},
				},
				//风蚀鹫
				jhjx_yanhuì:{
					audio:'ext:夜白神略/audio/character:1',
					enable: ["chooseToRespond", "chooseToUse"],
					filterCard(card, player) {
						return get.color(card) == "red";
					},
					selectCard(){
						var player = _status.event.player;
						if(player.countMark('buff_jhjx_fengdun')>0)return [0,1]
						return 1;
					},
					position: "hes",
					viewAs: { name: "sha",nature:'YB_rock' },
					viewAsFilter(player) {
						if (!player.countCards("hes", { color: "red" })&&!player.countMark('buff_jhjx_fengdun')) {
							return false;
						}
					},
					// prompt: "将一张红色牌当杀使用或打出",
					check(card) {
						const val = get.value(card);
						if (_status.event.name == "chooseToRespond") {
							return 1 / Math.max(0.1, val);
						}
						return 5 - val;
					},
					precontent(){
						if(!event.result.cards||event.result.cards.length==0){
							player.removeMark('buff_jhjx_fengdun',1);
						}
					},
					ai: {
						skillTagFilter(player) {
							if (!player.countCards("hes", { color: "red" })&&!player.countMark('buff_jhjx_fengdun')) {
								return false;
							}
						},
						respondSha: true,
						order(item, player) {
							return get.order({ name: "sha" }) + 0.1;
						},
					},
				},
				//天灾劫境
				//雷灾魔
				jhjx_leizai:{
					preHidden: true,
					audio: 'ext:夜白神略/audio/character:1',
					trigger: {
						global: 'phaseZhunbeiBegin',
					},
					check: function (event, player) {
						return get.attitude(player, event.player) <= 0;
					},
					content: function () {
						trigger.player.executeDelayCardEffect('shandian');
					},
					ai: {
						expose: 1,//跳立场
						threaten: 0.5,//嘲讽值
					},
					derivation:['shandian'],
				},
				//洪灾魔
				jhjx_hongzai:{
					audio: 'ext:夜白神略/audio/character:1',
					trigger: {
						global: 'phaseZhunbeiBegin',
					},
					check: function (event, player) {
						return get.attitude(player, event.player) <= 0;
					},
					content: function () {
						trigger.player.executeDelayCardEffect('hongshui');
					},
					ai: {
						expose: 1,//跳立场
						threaten: 0.5,//嘲讽值
					},
					derivation:['hongshui'],
				},
				//熔灾魔
				jhjx_rongzai:{
					audio: 'ext:夜白神略/audio/character:1',
					trigger: {
						global: 'phaseZhunbeiBegin',
					},
					check: function (event, player) {
						return get.attitude(player, event.player) <= 0;
					},
					content: function () {
						trigger.player.executeDelayCardEffect('huoshan');
					},
					ai: {
						expose: 1,//跳立场
						threaten: 0.5,//嘲讽值
					},
					derivation:['huoshan'],

				},
				//雹灾魔
				jhjx_baozai:{
					audio: 'ext:夜白神略/audio/character:1',
					trigger: {
						global: 'phaseZhunbeiBegin',
					},
					check: function (event, player) {
						return get.attitude(player, event.player) <= 0;
					},
					content: function () {
						trigger.player.executeDelayCardEffect('jhjx_bingbao');
					},
					ai: {
						expose: 1,//跳立场
						threaten: 0.5,//嘲讽值
					},
					derivation:['jhjx_bingbao'],
				},
				//地灾魔
				jhjx_dizai:{
					audio: 'ext:夜白神略/audio/character:1',
					trigger: {
						global: 'phaseZhunbeiBegin',
					},
					check: function (event, player) {
						return get.attitude(player, event.player) <= 0;
					},
					content: function () {
						trigger.player.executeDelayCardEffect('jhjx_dizhen');
					},
					ai: {
						expose: 1,//跳立场
						threaten: 0.5,//嘲讽值
					},
					derivation:['jhjx_dizhen'],
				},
				//灾厄使者
				jhjx_zaiyuan:{
					audio:'ext:夜白神略/audio/character:1',
					trigger:{
						global:'damageBegin3'
					},
					filter(event,player){
						if(!event.source)return true;
					},
					forced:true,
					async content(event,trigger,player){
						trigger.source=player;
					},
				},
				jhjx_huanmo:{
					audio:'ext:夜白神略/audio/character:1',
					trigger: {
						global: "phaseBefore",
						player: "enterGame",
					},
					filter(event,player){
						return (event.name != "phase" || game.phaseNumber == 0)
					},
					forced:true,
					locked:false,
					async content(event,trigger,player){
						let list = ['jhjx_leizaimo','jhjx_hongzaimo','jhjx_rongzaimo','jhjx_baozaimo','jhjx_dizaimo'];
						var cards = [];
						// _status.characterlist.removeArray(list);
						for(let i=0;i<list.length;i++){
							var name = list[i];
							var card = {
								fullimage: true,
								image: "character:" + name,
								type: "equip",
								subtype: "equip0",
								enable: true,
								selectTarget: -1,
								filterTarget(card, player, target) {
									if (player != target) {
										return false;
									}
									return target.canEquip(card, true);
								},
								modTarget: true,
								allowMultiple: false,
								// content: lib.element.content.equipCard,
								content:function(){
									'step 0'
									if(cards.length&&get.position(cards[0],true)=='o'){
										event.list1 = ['武器', '防具', '防御马', '进攻马', '宝物', '双格马'];
										player.chooseControl(event.list1).set('prompt', '请选择将【'+get.translation(event.skill)+'】当做哪种装备');										
									}
									else event,finish();
									'step 1'
									if (result.control) {
										var num = result.index + 1;
										var name = 'ybsl_107xiaohu' + num;
										var tag = get.YB_tag(cards[0])
										cards[0].YB_init([cards[0].suit, cards[0].number, name, cards[0].nature ,tag]);
										player.equip(cards[0]);
									}
						
								},
								toself: true,
								ai: {},
								skills: [],
							}
							var info = lib.character[name];
							var maxHp = get.infoMaxHp(info[2]);
							if (maxHp != 1) {
								card.distance = { attackFrom: 1 - maxHp };
							}
							var skills = info[3];
							var str = "锁定技。";
							if (skills.length) {
								card.skills.addArray(skills);
								str += "你视为拥有技能";
								for (var skill of skills) {
									str += "〖" + get.translation(skill) + "〗";
									str += "、";
								}
								str = str.slice(0, str.length - 1);
								str += "；";
								card.ai.equipValue = function (card, player) {
									let val = maxHp;
									if (player.hasSkill("qiexie")) {
										val *= 0.4;
									} else {
										val *= 0.6;
									}
									return (val += skills.length);
								};
							}
							lib.translate["YB_characterToCard_" + name] = lib.translate[name];
							lib.translate["YB_characterToCard_" + name + "_info"] = str;
							var append = "";
							if (skills.length) {
								for (var skill of skills) {
									// console.log(skill)
									if (lib.skill[skill].nobracket) {
										append += '<div class="skilln">' + get.translation(skill) + '</div><div><span style="font-family: yuanli">' + get.skillInfoTranslation(skill) + "</span></div><br><br>";
									} else {
										var translation = lib.translate[skill + "_ab"] || get.translation(skill).slice(0, 2);
										append += '<div class="skill">【' + translation + '】</div><div><span style="font-family: yuanli">' + get.skillInfoTranslation(skill) + "</span></div><br><br>";
									}
								}
								str = str.slice(0, str.length - 8);
							}
							lib.translate["YB_characterToCard_" + name + "_append"] = append;
							lib.card["YB_characterToCard_" + name] = card;
							var cardx = game.YB_createCard('YB_characterToCard_'+name,null,null);
							cards.push(cardx);
						}
						for(var z=0;z<cards.length;z++){
							var type = 'equip'+(z+1);
							const cardv = get.autoViewAs(cards[z]);
							cardv.subtypes = [type];
							await player.equip(cardv);
						}
					},
				},
			},
			card:{
				vcard_buff_jhjx_huafen:{
					ai:{
						value:-1.5,
					},
				},
				vcard_buff_jhjx_fengdun:{
					ai:{
						value:4,
					},
				},
				jhjx_bingbao: {
					audio: true,
					fullskin: true,
					type: "delay",
					cardnature: "ice",
					modTarget(card, player, target) {
						return lib.filter.judge(card, player, target);
					},
					enable(card, player) {
						return player.canAddJudge(card);
					},
					filterTarget(card, player, target) {
						return lib.filter.judge(card, player, target) && player === target;
					},
					selectTarget: [-1, -1],
					toself: true,
					judge(card) {
						if (get.suit(card) === "spade" && get.number(card) > 1 && get.number(card) < 10) {
							return -5;
						}
						return 1;
					},
					judge2(result) {
						if (result.bool === false) {
							return true;
						}
						return false;
					},
					effect() {
						if (result.bool === false) {
							player.damage(3, "ice", "nosource");
						} else {
							player.addJudgeNext(card);
						}
					},
					cancel() {
						player.addJudgeNext(card);
					},
					ai: {
						basic: {
							order: 1,
							useful: 0,
							value: 0,
						},
						result: {
							target(player, target) {
								var num = game.countPlayer(function (current) {
									//var skills=current.getSkills();
									for (var j = 0; j < current.skills.length; j++) {
										var rejudge = get.tag(current.skills[j], "rejudge", current);
										if (rejudge !== undefined) {
											if (get.attitude(target, current) > 0 && get.attitude(current, target) > 0) {
												return rejudge;
											} else {
												return -rejudge;
											}
										}
									}
								});
								if (num > 0) {
									return num;
								}
								if (num === 0) {
									var mode = get.mode();
									if (mode === "identity") {
										if (target.identity === "nei") {
											return 1;
										}
										var situ = get.situation();
										if (target.identity === "fan") {
											if (situ > 1) {
												return 1;
											}
										} else {
											if (situ < -1) {
												return 1;
											}
										}
									} else if (mode === "guozhan") {
										if (target.identity === "ye") {
											return 1;
										}
										if (
											game.hasPlayer(function (current) {
												return current.identity === "unknown";
											})
										) {
											return -1;
										}
										if (get.population(target.identity) === 1) {
											if (target.maxHp > 2 && target.hp < 2) {
												return 1;
											}
											if (game.countPlayer() < 3) {
												return -1;
											}
											if (target.hp <= 2 && target.countCards("he") <= 3) {
												return 1;
											}
										}
									}
								}
								return -1;
							},
						},
						tag: {
							damage: 0.16,
							natureDamage: 0.16,
							iceDamage: 0.16,
						},
					},
				},
				jhjx_dizhen: {
					audio: true,
					fullskin: true,
					type: "delay",
					cardnature: "ice",
					modTarget(card, player, target) {
						return lib.filter.judge(card, player, target);
					},
					enable(card, player) {
						return player.canAddJudge(card);
					},
					filterTarget(card, player, target) {
						return lib.filter.judge(card, player, target) && player === target;
					},
					selectTarget: [-1, -1],
					toself: true,
					judge(card) {
						if (get.suit(card) === "diamond" && get.number(card) > 1 && get.number(card) < 10) {
							return -5;
						}
						return 1;
					},
					judge2(result) {
						if (result.bool === false) {
							return true;
						}
						return false;
					},
					effect() {
						if (result.bool === false) {
							player.damage(3, "YB_rock", "nosource");
						} else {
							player.addJudgeNext(card);
						}
					},
					cancel() {
						player.addJudgeNext(card);
					},
					ai: {
						basic: {
							order: 1,
							useful: 0,
							value: 0,
						},
						result: {
							target(player, target) {
								var num = game.countPlayer(function (current) {
									//var skills=current.getSkills();
									for (var j = 0; j < current.skills.length; j++) {
										var rejudge = get.tag(current.skills[j], "rejudge", current);
										if (rejudge !== undefined) {
											if (get.attitude(target, current) > 0 && get.attitude(current, target) > 0) {
												return rejudge;
											} else {
												return -rejudge;
											}
										}
									}
								});
								if (num > 0) {
									return num;
								}
								if (num === 0) {
									var mode = get.mode();
									if (mode === "identity") {
										if (target.identity === "nei") {
											return 1;
										}
										var situ = get.situation();
										if (target.identity === "fan") {
											if (situ > 1) {
												return 1;
											}
										} else {
											if (situ < -1) {
												return 1;
											}
										}
									} else if (mode === "guozhan") {
										if (target.identity === "ye") {
											return 1;
										}
										if (
											game.hasPlayer(function (current) {
												return current.identity === "unknown";
											})
										) {
											return -1;
										}
										if (get.population(target.identity) === 1) {
											if (target.maxHp > 2 && target.hp < 2) {
												return 1;
											}
											if (game.countPlayer() < 3) {
												return -1;
											}
											if (target.hp <= 2 && target.countCards("he") <= 3) {
												return 1;
											}
										}
									}
								}
								return -1;
							},
						},
						tag: {
							damage: 0.16,
							natureDamage: 0.16,
							YB_rockdamage: 0.16,
						},
					},
				},
			},
			translate:{
				//迷雾森林副本
				jhjx_miwusenlin:'迷雾森林',
				jhjx_miwusenlin_boss:'迷雾森林·BOSS',
				//雷魔鹰
				jhjx_leimoying:'雷魔鹰',
				jhjx_leishan:'雷闪',
				jhjx_leishan_info:'出牌阶段限一次，你可以弃置一至两张牌，对等量名其他角色造成一点雷电伤害，或对一名其他角色造成等量点雷电伤害。',
				jhjx_jilei:'汲雷',
				jhjx_jilei_info:'每当你造成一点雷属性伤害后，你可以恢复一点体力或摸一张牌。',
				//魇魔花
				jhjx_yanmohua:'魇魔花',
				jhjx_shengzhang:'生长',
				jhjx_shengzhang_info:'锁定技，准备阶段，你恢复一点体力并摸两张牌。',
				jhjx_huakai:'花开',
				jhjx_huakai_info:'出牌阶段限一次，你可以令一至两名其他角色获得一枚“'+buff_jhjx_huafen+'”；当你对其他角色造成伤害时，你可以令其获得一枚“'+buff_jhjx_huafen+'”；当你恢复体力时，你可以移除场上一枚“'+buff_jhjx_huafen+'”，令恢复值+1。',
				buff_jhjx_huafen:'花粉',
				buff_jhjx_huafen_info:'锁定技，准备阶段，移除一枚“花粉”，然后弃置一张牌或失去一点体力。',
				vcard_buff_jhjx_huafen:'花粉',
				vcard_buff_jhjx_huafen_info:'锁定技，准备阶段，移除一枚“花粉”，然后弃置一张牌或失去一点体力。',
				//风魔狼
				jhjx_fengmolang:'风魔狼',
				jhjx_fengxing:'风行',
				jhjx_fengxing_info:'锁定技，摸牌阶段，你多摸两张牌；当你弃置牌后，你获得一个“'+buff_jhjx_fengdun+'”。',
				buff_jhjx_fengdun:'风盾',
				buff_jhjx_fengdun_info:'锁定技，受到属性伤害时，移除一枚“风盾”并防止之；当你获得风盾后，若大于体力上限且大于1，则移除超出的“风盾”。',
				jhjx_xuanfeng:'旋风',
				jhjx_xuanfeng_info:'弃牌阶段结束时，若你本阶段弃置过牌，或当你因抵消伤害移除“'+buff_jhjx_fengdun+'”后，你可以对至多两名其他角色各造成一点风属性伤害，伤害之后，你可以弃置该目标一张牌。',
				//若因此弃置的牌花色达到4种，你获得一个“风盾”（锁定技，受到火属性伤害时，移除一枚“风盾”并防止之；当你获得风盾后，若大于体力上限且大于1，则移除超出的“风盾”）
				vcard_buff_jhjx_fengdun:'风盾',
				vcard_buff_jhjx_fengdun_info:'锁定技，受到属性伤害时，移除一枚“风盾”并防止之；当你获得风盾后，若大于体力上限且大于1，则移除超出的“风盾”。',
				//乱石荒原副本
				jhjx_luanshihuangyuan:'乱石荒原',
				//磐石龟
				jhjx_panshigui:'磐石龟',
	
				jhjx_jianshi:'坚石',
				jhjx_jianshi_info:'锁定技，结束阶段，你获得一点护甲（至多为5）并摸一张牌；当你失去护甲后，你摸一张牌。',
				jhjx_zhendang:'震荡',
				jhjx_zhendang_info:'出牌阶段限一次，你可以对自己造成一点伤害，并弃置至多两名角色区域内各一张牌。',
				//岩刺蛇
				jhjx_yancishan:'岩刺蛇',
	
				jhjx_yanbeng:'岩崩',
				jhjx_yanbeng_info:'出牌阶段限一次，你可以翻面，并对一至两名其他角色造成一点岩属性伤害（若包含多名角色，这些角色需体力值均小于你）（若你存在“蛇绞”对象，此技能只能对全体蛇绞对象发动；你对“蛇绞”目标发动〖岩崩〗时，不翻面改为解除“蛇绞”，然后你弃置其一张牌）。',
				
				jhjx_shejiao:'蛇绞',
				jhjx_shejiao_info:'出牌阶段限一次，你可以指定一名体力值小于你的其他角色，令其被你“蛇绞”直到你下个出牌阶段开始（锁定技，“蛇绞”你的角色的回合内，你不能使用或打出手牌。）；被你“蛇绞”的角色结束阶段，你可弃置其一张牌或令其失去一点体力。',
	
				//风蚀鹫
				jhjx_fengshijiu:'风蚀鹫',
				//一技能也是风行的说
				jhjx_yanhuì:'岩喙',
				jhjx_yanhuì_info:'你可以将一张红色牌或一枚“'+buff_jhjx_fengdun+'”当岩属性【杀】使用或打出。',
				//天灾劫境
				jhjx_tianzaijiejing:'天灾劫境',
				//雷灾魔
				jhjx_leizaimo:'雷灾魔',
				jhjx_leizai:'雷灾',
				jhjx_leizai_info:'场上角色的准备阶段，你可以令其进行【闪电】判定。',
				//洪灾魔
				jhjx_hongzaimo:'洪灾魔',
				jhjx_hongzai:'洪灾',
				jhjx_hongzai_info:'场上角色的准备阶段，你可以令其进行【洪水】判定。',
				//熔灾魔
				jhjx_rongzaimo:'熔灾魔',
				jhjx_rongzai:'熔灾',
				jhjx_rongzai_info:'场上角色的准备阶段，你可以令其进行【火山】判定。',
				//雹灾魔
				jhjx_baozaimo:'雹灾魔',
				jhjx_baozai:'雹灾',
				jhjx_baozai_info:'场上角色的准备阶段，你可以令其进行【冰雹】判定。',
				jhjx_bingbao:'冰雹',
				jhjx_bingbao_info:'出牌阶段，对自己使用。若判定结果为黑桃2~9，则目标角色受到3点冰冻伤害。若判定不为黑桃2~9，将之移动到下家的判定区里。',
				//地灾魔
				jhjx_dizaimo:'地灾魔',
				jhjx_dizai:'地灾',
				jhjx_dizai_info:'场上角色的准备阶段，你可以令其进行【地震】判定。',
				jhjx_dizhen:'地震',
				jhjx_dizhen_info:'出牌阶段，对自己使用。若判定结果为方块2~9，则目标角色受到3点岩属性伤害。若判定不为方片2~9，将之移动到下家的判定区里。',

				//灾厄使者
				jhjx_zaieshizhe:'灾厄使者',
				jhjx_zaiyuan:'灾源',
				jhjx_zaiyuan_info:'锁定技，场上有角色受到无来源伤害时，将来源改为你。',
				jhjx_huanmo:'唤魔',
				jhjx_huanmo_info:'游戏开始时，你将每种灾魔各一只置入你的装备区（当这些牌进入弃牌堆时，将其在当前回合角色的下家位置召唤，由你操控。）',
				//人祸劫境
				jhjx_renhuojiejing:'人祸劫境',
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
		typeimage(jhjx,'jhjx')
		for(var i in jhjx.card){
			if(!jhjx.card[i].image) jhjx.card[i].image='ext:夜白神略/image/card/'+i+'.png'
		}
		lib.translate['jhjx_character_config'] = '<span class="yellowtext">将魂觉醒</span>';
		game.import('character',jhjx);
	}

}