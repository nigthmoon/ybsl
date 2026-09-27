import { lib, game, ui, get, ai, _status } from '../../../../../../noname.js';
export { skill };

/** @type { importCharacterConfig['skill'] } */
const skill = {

	//三国杀：开局关羽，但新三国
	sgskjgydxsg_wusheng:{
		audio: 'ext:夜白神略/audio/character:3',
		logAudio(event, player, name) {
			console.log(event)
			if(event?.card?.name){
				if(event.card.name=='sha')return ['ext:夜白神略/audio/character/sgskjgydxsg_wusheng1']
				if(event.card.name=='jiu')return ['ext:夜白神略/audio/character/sgskjgydxsg_wusheng3'];
			}
		},
		mod: {
			aiOrder(player, card, num) {
				if (num <= 0 || !player.isPhaseUsing() || player.needsToDiscard() < 2) {
					return num;
				}
				let suit = get.suit(card, player);
				if (suit === "heart") {
					return num - 3.6;
				}
			},
			aiValue(player, card, num) {
				if (num <= 0) {
					return num;
				}
				let suit = get.suit(card, player);
				if (suit === "heart") {
					return num + 3.6;
				}
				if (suit === "club") {
					return num + 1;
				}
				if (suit === "spade") {
					return num + 1.8;
				}
			},
			aiUseful(player, card, num) {
				if (num <= 0) {
					return num;
				}
				let suit = get.suit(card, player);
				if (suit === "heart") {
					return num + 3;
				}
				if (suit === "club") {
					return num + 1;
				}
				if (suit === "spade") {
					return num + 1;
				}
			},
		},
		locked: false,
		//技能发动时机
		enable: ["chooseToUse", "chooseToRespond"],
		//发动时提示的技能描述
		prompt: "将红色牌当【杀】，黑色牌当【酒】使用或打出",
		//动态的viewAs
		viewAs(cards, player) {
			if (cards.length) {
				var name = false,
					nature = null;
				//根据选择的卡牌的花色 判断要转化出的卡牌是闪还是火杀还是无懈还是桃
				// switch (get.suit(cards[0], player)) {
				// 	case "club":
				// 		name = "shan";
				// 		break;
				// 	case "diamond":
				// 		name = "sha";
				// 		nature = "fire";
				// 		break;
				// 	case "spade":
				// 		name = "wuxie";
				// 		break;
				// 	case "heart":
				// 		name = "tao";
				// 		break;
				// }
				switch(get.color(cards[0],player)){
					case 'red':
						name = 'sha';
						break;
					case 'black':
						name = 'jiu';
						break;
				}
				//返回判断结果
				if (name) {
					return { name: name, nature: nature };
				}
			}
			return null;
		},
		//AI选牌思路
		check(card) {
			if (ui.selected.cards.length) {
				return 0;
			}
			var player = _status.event.player;
			if (_status.event.type == "phase") {
				var max = 0;
				var name2;
				var list = ["sha", "jiu"];
				var map = { sha: "red", jiu: "black" };
				for (var i = 0; i < list.length; i++) {
					var name = list[i];
					if (
						player.countCards("hes", function (card) {
							return (name != "sha" || get.value(card) < 5) && get.color(card, player) == map[name];
						}) > 0 &&
						player.getUseValue({ name: name, nature: null }) > 0
					) {
						var temp = get.order({ name: name, nature: null });
						if (temp > max) {
							max = temp;
							name2 = map[name];
						}
					}
				}
				if (name2 == get.color(card, player)) {
					return name2 == "red" ? 5 - get.value(card) : 20 - get.value(card);
				}
				return 0;
			}
			return 1;
		},
		//选牌数量
		selectCard: 1,
		//确保选择第一张牌后 重新检测第二张牌的合法性 避免选择两张花色不同的牌
		// complexCard: true,
		//选牌范围：手牌区和装备区和木马
		position: "hes",
		//选牌合法性判断
		filterCard(card, player, event) {
			//如果已经选了一张牌 那么第二张牌和第一张花色相同即可
			// if (ui.selected.cards.length) {
			// 	return get.suit(card, player) == get.suit(ui.selected.cards[0], player);
			// }
			event = event || _status.event;
			//获取当前时机的卡牌选择限制
			var filter = event._backup.filterCard;
			//获取卡牌花色
			var name = get.color(card, player);
			//如果这张牌是梅花并且当前时机能够使用/打出闪 那么这张牌可以选择
			if (name == "black" && filter(get.autoViewAs({ name: "jiu" }, "unsure"), player, event)) {
				return true;
			}
			//如果这张牌是方片并且当前时机能够使用/打出火杀 那么这张牌可以选择
			if (name == "red" && filter(get.autoViewAs({ name: "sha"}, "unsure"), player, event)) {
				return true;
			}
			//如果这张牌是黑桃并且当前时机能够使用/打出无懈 那么这张牌可以选择
			//如果这张牌是红桃并且当前时机能够使用/打出桃 那么这张牌可以选择
			//上述条件都不满足 那么就不能选择这张牌
			return false;
		},
		//判断当前时机能否发动技能
		filter(event, player) {
			//获取当前时机的卡牌选择限制
			var filter = event.filterCard;
			//如果当前时机能够使用/打出火杀并且角色有方片 那么可以发动技能
			if (filter(get.autoViewAs({ name: "sha" }, "unsure"), player, event) && player.countCards("hes", { color: "red" })) {
				return true;
			}
			//如果当前时机能够使用/打出闪并且角色有梅花 那么可以发动技能
			if (filter(get.autoViewAs({ name: "jiu" }, "unsure"), player, event) && player.countCards("hes", { color: "black" })) {
				return true;
			}
			//如果当前时机能够使用/打出桃并且角色有红桃 那么可以发动技能
			//如果当前时机能够使用/打出无懈可击并且角色有黑桃 那么可以发动技能
			return false;
		},
		ai: {
			respondSha: true,
			// respondShan: true,
			//让系统知道角色“有杀”“有闪”
			skillTagFilter(player, tag) {
				var name;
				switch (tag) {
					case "respondSha":
						name = "red";
						break;
					case "save":
						name = "black";
						break;
				}
				if (!player.countCards("hes", { color: name })) {
					return false;
				}
			},
			//AI牌序
			order(item, player) {
				if (player && _status.event.type == "phase") {
					var max = 0;
					var list = ["sha", "jiu"];
					var map = { sha: "red", jiu: "black" };
					for (var i = 0; i < list.length; i++) {
						var name = list[i];
						if (
							player.countCards("hes", function (card) {
								return (name != "sha" || get.value(card) < 5) && get.color(card, player) == map[name];
							}) > 0 &&
							player.getUseValue({
								name: name,
							}) > 0
						) {
							var temp = get.order({
								name: name,
							});
							if (temp > max) {
								max = temp;
							}
						}
					}
					max /= 1.1;
					return max;
				}
				return 2;
			},
		},
		//让系统知道玩家“有无懈”“有桃”
		hiddenCard(player, name) {
			if (name == "jiu") {
				return player.countCards("hes", { color: "black" }) > 0;
			}
		},
		group:['sgskjgydxsg_wusheng_jiu'],
		subSkill:{
			jiu:{
				audio:'sgskjgydxsg_wusheng',
				logAudio(event, player, name) {
					return ['ext:夜白神略/audio/character/sgskjgydxsg_wusheng3'];
				},
				trigger: { player: 'useCard1' },
				filter(event, player) {
					return get.name(event.card)=='jiu'&&event.card.cards&&event.card.isCard;
				},
				forced: true,
				popup: false,
				content() {
					trigger.addCount = false;
					const stat = player.getStat().card,
						name = trigger.card.name;
					if (typeof stat[name] == 'number') {
						stat[name]--;
					}
					game.log(trigger.card, '不计入次数');
				},
				mod:{
					cardUsable(card) {
						if (get.name(card) === 'jiu' && card.cards&&card.isCard) {
							return Infinity;
						}
					},
				}
			},
		},
	},
	sgskjgydxsg_guojiang:{
		audio: 'ext:夜白神略/audio/character:1',
		trigger:{
			global:'phaseAfter',
		},
		filter(event, player) {
			return event.player.getHistory('useSkill')
				.some(s => {
					const skillx = typeof s === 'string' ? s : s.skill;
					let skill = get.sourceSkillFor(skillx);
					return skill && !player.skills.includes(skill) && !skill.startsWith('_');//&&get.translation(skill)&&get.skillInfoTranslation(skill)
				});
		},
		async content(event, trigger, player) {

			var skills = trigger.player.getHistory('useSkill')
				.map(s => typeof s === 'string' ? s : s.skill)
				.map(skillx => get.sourceSkillFor(skillx))
				.filter(skill => skill && !player.skills.includes(skill) && !skill.startsWith('_'));
			// 按 source 技能去重, 输出到新变量
			var uniqueSkills = [...new Set(skills)];
			var buttons = [];
			for (var i of uniqueSkills) {
				let skill = get.sourceSkillFor(i);
				buttons.push([[
					[
						skill,
						(get.translation(skill) ? get.translation(skill) : '无名技能') + '：' + (get.skillInfoTranslation(skill) ? get.skillInfoTranslation(skill) : '暂无描述')
					]
				],"tdnodes"]);
			}
			var dialog = ui.create.dialog('获得一个技能', 'hidden');
			dialog.add(buttons);
			const result = await player.chooseButton(dialog).forResult();
			if (result.links) {
				// result.link 可能是 { skill, event } 对象或字符串, 取出技能名
				const linkSkill = result.links[0];
				if (linkSkill && !player.skills.includes(linkSkill) && !linkSkill.startsWith('_')) {
					await player.addSkill(linkSkill);
					game.YB_addAudio(
						// ['kamome_yangfan', { ybsl_kamome: 'kamome_ybyangfan' }],
						[linkSkill, { [player.name]: 'sgskjgydxsg_guojiang' }],
					);
				}
			}
		}


	},
};
