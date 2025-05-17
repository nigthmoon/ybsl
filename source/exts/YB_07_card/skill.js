import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

const skill = {
	//-------------------------
	ybsl_qingfengshan:{
		equipSkill: true,
		trigger: { player: "useCard1" },
		//priority:7,
		filter(event, player) {
			if (event.card.name == "sha" && !game.hasNature(event.card,'YB_wind')) return true;
		},
		audio: true,
		check(event, player) {
			let eff = 0,
				nature = event.card.nature;
			for (let i = 0; i < event.targets.length; i++) {
				// eff -= get.effect(event.targets[i], event.card, player, player);
				// event.card.nature = "YB_wind";
				var natures=nature;
				if (nature!=null) {
					// if(!Array.isArray(nature)){
					// 	if(nature.includes('|'))natures=natures.split('|').filter(item=>item!=='');
					// }
					if(Array.isArray(nature)){
						natures=natures.join('|');
					}
					// if(Array.isArray(natures)){
					// 	natures = natures.sort((a,b)=>lib.nature.get(a)-lib.nature.get(b));
					// }
					// natures = natures.join('_');
				}
				var target=event.targets[i];
				var eff1=get.damageEffect(target,player,player,nature);
				var eff2=get.damageEffect(target,player,player,(nature==null?'YB_wind':natures+'|YB_wind'));
				eff+=eff2;
				eff-=eff1;
				// eff += get.effect(event.targets[i], event.card, player, player);
				// if(nature!=null)event.card.nature = (nature+'|YB_wind');
				// event.card.nature = (nature+'|YB_wind');
			}
			return eff > 0;
		},
		prompt2(event, player) {
			return "将" + get.translation(event.card) + "增加风属性";
		},
		content() {
			var nature = trigger.card.nature;
			var natures=nature;
			if (nature!=null) {
				// if(!Array.isArray(nature)){
				// 	if(nature.includes('|'))natures=natures.split('|').filter(item=>item!=='');
				// }
				if(Array.isArray(nature)){
					natures=natures.join('|');
				}
			}
			game.setNature(trigger.card, (nature==null?'YB_wind':natures+'|YB_wind'));
			if (get.itemtype(trigger.card) == "card") {
				var next = game.createEvent("ybsl_qingfengshan_clear");
				next.card = trigger.card;
				event.next.remove(next);
				trigger.after.push(next);
				next.setContent(function () {
					game.setNature(trigger.card, []);
				});
			}
		},
	},
	ybsl_zhongkai_1:{
		equipSkill: true,
		// audio: "ybsl_zhongkai",
		trigger: { 
			target: "shaBefore" 
		},
		forced: true,
		filter(event, player) {
			if (player.hasSkillTag("unequip2")) return false;
			if (
				event.player.hasSkillTag("unequip", false, {
					name: event.card ? event.card.name : null,
					target: player,
					card: event.card,
				})
			)
				return false;
			if (event.card.name == "sha" && !game.hasNature(event.card)) return true;
			return false;
		},
		content() {
			trigger.cancel();
		},
		ai: {
			effect: {
				target(card, player, target, current) {
					if (target.hasSkillTag("unequip2")) return;
					if (
						player.hasSkillTag("unequip", false, {
							name: card ? card.name : null,
							target: target,
							card: card,
						}) ||
						player.hasSkillTag("unequip_ai", false, {
							name: card ? card.name : null,
							target: target,
							card: card,
						})
					)
						return;
					if (card.name == "sha") {
						if (!game.hasNature(card)) return "zeroplayertarget";
					}
				},
			},
		},
	},
	ybsl_zhongkai_2:{
		equipSkill: true,
		trigger: { player: "damageBegin3" },
		filter(event, player) {
			if (!event.hasNature("YB_wind")&&!event.windLinked2) return false;
			if (player.hasSkillTag("unequip2")) return false;
			if (
				event.source &&
				event.source.hasSkillTag("unequip", false, {
					name: event.card ? event.card.name : null,
					target: player,
					card: event.card,
				})
			)
				return false;
			return true;
		},
		audio: true,
		forced: true,
		content() {
			trigger.cancel();
		},
		ai: {
			effect: {
				target(card, player, target, current) {
					if (card.name == "sha") {
						if (game.hasNature(card, "YB_wind")) return 0;
					}
					if (get.tag(card, "YB_windDamage") && current < 0) return 0;
				},
			},
		},
	},
	ybsl_jinyinrukai_1:{
		trigger: { target: "useCardToTargeted" },
		forced: true,
		audio: true,
		filter(event, player) {
			if (event.targets.length < 2) return false;
			if (!get.tag(event.card,'damage')>0.5) return false;
			if (player.hasSkillTag("unequip2")) return false;
			if (
				event.player.hasSkillTag("unequip", false, {
					name: event.card ? event.card.name : null,
					target: player,
					card: event.card,
				})
			)
				return false;
			return true;
		},
		content() {
			trigger.excluded.add(player);
		},
		global: "ybsl_jinyinrukai_ai",
	},
	ybsl_jinyinrukai_2:{
		equipSkill: true,
		trigger: { player: "damageBegin3" },
		filter(event, player) {
			if (!event.hasNature("YB_wind")&&!event.windLinked2) return false;
			if (player.hasSkillTag("unequip2")) return false;
			if (
				event.source &&
				event.source.hasSkillTag("unequip", false, {
					name: event.card ? event.card.name : null,
					target: player,
					card: event.card,
				})
			)
				return false;
			return true;
		},
		audio: true,
		forced: true,
		content() {
			trigger.cancel();
		},
		ai: {
			effect: {
				target(card, player, target, current) {
					if (card.name == "sha") {
						if (game.hasNature(card, "YB_wind")) return 0;
					}
					if (get.tag(card, "YB_windDamage") && current < 0) return 0;
				},
			},
		},
	},
	ybsl_jizhiguan:{
		equipSkill: true,
		trigger: {
			player: "useCard2"
		},
		// forced:true,
		audio:'ext:夜白神略/audio/card:true',
		filter: (event, player, _name) => {
			if (!["trick"].includes(get.type(event.card))) return false;
			var info = get.info(event.card);
			if (info.allowMultiple == false) return false;
			if (event.targets && !info.multitarget) {
				if (
					game.hasPlayer(function (current) {
						return !event.targets.includes(current) && lib.filter.targetEnabled2(event.card, player, current) && lib.filter.targetInRange(event.card, player, current);
					})
				) {
					return true;
				}
			}
			return false;
		},
		direct:true,
		content () {
			"step 0";
			player
				.chooseTarget("是否为" + get.translation(trigger.card) + "增加一个目标？", function (card, player, target) {
					var trigger = _status.event.getTrigger();
					var card = trigger.card;
					return !trigger.targets.includes(target) && lib.filter.targetEnabled2(card, player, target) && lib.filter.targetInRange(card, player, target);
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					var card = _status.event.getTrigger().card;
					return get.effect(target, card, player, player);
				});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, "green");
				game.log(player, "发动集智冠，令", target, "也成为了", trigger.card, "的目标");
				trigger.targets.add(target);
			}
		},
		ai:{
			effect:{
				player:function(card,player,target){
					if(get.type(card)=='trick') return 2;
					return 1;
				}
				// player:function(card,player,target){
					 // if(player==target&&get.subtype(card)=='equip5'){
					// 	if(get.equipValue(card)<=8.5) return 0;
					// }
				// 	if(!target.hasEmptySlot(5)) return;
				// 	return lib.skill.ybsl_fengqiuhuang.ai.effect.player.apply(this,arguments);
				// 	-------凤求凰没有以上代码
				// }
			}
		}
	},
	ybsl_feijingsanjian:{
		equipSkill: true,
		trigger: {
			source: "damageBegin1",
		},
		forced: true,
		logTarget: "player",
		filter(event, player) {
			return event.source && (event.player.isTurnedOver() != event.source.isTurnedOver()||event.player.isLinked()!=event.source.isLinked());
		},
		content() {
			trigger.num++;
		},
	},
	heiguangkai_ai: {
		ai: {
			effect: {
				player(card, player, target) {
					if (typeof card !== "object" || !target || (get.name(card) !== "sha" && (get.type(card) !== "trick" || (get.color(card) !== "black" && !get.tag(card, "damage"))))) return;
					if (
						!target.hasSkill("ybsl_jinyinrukai_1") ||
						target.hasSkillTag("unequip2") ||
						player.hasSkillTag("unequip", false, {
							name: card ? card.name : null,
							target: target,
							card: card,
						}) ||
						player.hasSkillTag("unequip_ai", false, {
							name: card ? card.name : null,
							target: target,
							card: card,
						})
					)
						return;
					let targets = [],
						evt = _status.event.getParent("useCard");
					targets.addArray(ui.selected.targets);
					if (evt && evt.card == card) targets.addArray(evt.targets);
					if (targets.length) {
						if (targets.length > 1 || !targets.includes(target)) return "zeroplayertarget";
						return;
					}
					let info = get.info(card);
					if (!info || info.notarget || !info.filterTarget) return;
					let range,
						select = get.copy(info.selectTarget),
						filter;
					if (select === undefined) range = [1, 1];
					else if (typeof select === "number") range = [select, select];
					else if (get.itemtype(select) === "select") range = select;
					else if (typeof select === "function") range = select(card, player);
					if (info.singleCard) range = [1, 1];
					game.checkMod(card, player, range, "selectTarget", player);
					if (range[1] < -1) range = [1, 1];
					else if (range[0] < 0) {
						if (info.filterTarget === true) filter = game.players.length;
						else
							filter = game.countPlayer(current => {
								return info.filterTarget(card, player, current);
							});
						range = [filter, filter];
					}
					if (!range) return;
					if (range[0] > 1 && range[1] > 1) return "zeroplayertarget";
					return [1, 0, 0.7, 0];
				},
			},
		},
	},
}
