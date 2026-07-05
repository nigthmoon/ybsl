import { lib, game, ui, get, ai, _status } from '../../../../../noname.js';
export { YB_12_bamenjinsuo };
const YB_12_bamenjinsuo = function () {
	lib.element.player.zhenmen;
	lib.bamenjinsuozhen = ['休', '惊', '死', '景', '生', '杜', '伤', '开'];
	let zhenmenList = ['ybsl_gate_0', 'ybsl_gate_1', 'ybsl_gate_2', 'ybsl_gate_3', 'ybsl_gate_4', 'ybsl_gate_5', 'ybsl_gate_6', 'ybsl_gate_7'];

	lib.arenaReady.push(function () {
		_status.zhenmenList = [];
		zhenmenList.forEach((c) => {
			var card = game.createCard(c);
			_status.zhenmenList.push(card);
		});
	});
	get.adGates = function (player = _status.event.player) {
		var gate;
		if (player) {
			if (typeof player == 'string' && lib.bamenjinsuozhen.includes(player)) {
				gate = player;
			} else {
				if (player.zhenmen && lib.bamenjinsuozhen.includes(player.zhenmen)) {
					gate = player.zhenmen;
				}
			}
		}
		var index = lib.bamenjinsuozhen.indexOf(gate);
		if (index === -1) return [];
		var prev = lib.bamenjinsuozhen[(index - 1 + 8) % 8];
		var next = lib.bamenjinsuozhen[(index + 1) % 8];
		return [prev, next];
	};
	get.gateIndex = function (text) {
		if (typeof text == 'string' && lib.bamenjinsuozhen.includes(text)) {
			return lib.bamenjinsuozhen.indexOf(text);
		}
		if (typeof text == 'number' && text >= 0 && text < 8) {
			return text;
		}
		return -1;
	};

	get.gateMap = function (player = '休') {
		var gate;

		// 获取玩家的当前阵门
		if (typeof player == 'string' && lib.bamenjinsuozhen.includes(player)) {
			gate = player;
		} else {
			if (player.zhenmen && lib.bamenjinsuozhen.includes(player.zhenmen)) {
				gate = player.zhenmen;
			} else {
				// 如果玩家没有阵门，默认使用第一个阵门
				gate = lib.bamenjinsuozhen[0];
			}
		}

		var index = lib.bamenjinsuozhen.indexOf(gate);
		if (index === -1) {
			index = 0; // 默认索引
		}

		var map = {};

		// ✅ 修复：以玩家当前阵门为基准（正下方=90°），逆时针排列
		for (var i = 0; i < 8; i++) {
			var posIndex = (i - index + 8) % 8; // 相对于玩家阵门的位置

			// 正下方为90°，逆时针旋转，每45°一个阵门
			var angle = 180 - posIndex * 45;

			// 确保角度在合理范围内
			if (angle > 180) angle -= 360;
			if (angle < -180) angle += 360;

			// 确定方向标签
			var direction;
			if (posIndex === 0) direction = '下';
			else if (posIndex === 1) direction = '左下';
			else if (posIndex === 2) direction = '左';
			else if (posIndex === 3) direction = '左上';
			else if (posIndex === 4) direction = '上';
			else if (posIndex === 5) direction = '右上';
			else if (posIndex === 6) direction = '右';
			else if (posIndex === 7) direction = '右下';

			map[direction] = {
				card: _status.zhenmenList[i],
				angle: angle,
				gateName: lib.bamenjinsuozhen[i],
			};
		}

		return map;
	};

	get.gateMapDisplay = function (player) {
		var gateMap = get.gateMap(player);
		var currentGate;
		if (typeof player == 'string' && lib.bamenjinsuozhen.includes(player)) {
			currentGate = player;
		} else if (player.zhenmen && lib.bamenjinsuozhen.includes(player.zhenmen)) {
			currentGate = player.zhenmen;
		}
		var adGates = get.adGates(player);

		// 创建圆形阵盘的HTML
		var core = document.createElement('div');
		core.style.width = '0';
		core.style.height = '0';
		core.style.position = 'relative';

		var centerX = 0;
		var centerY = 0;
		var radius = 100;

		var directions = ['下', '左下', '左', '左上', '上', '右上', '右', '右下'];

		for (var i = 0; i < directions.length; i++) {
			var dir = directions[i];
			if (!gateMap[dir]) continue;

			var card = gateMap[dir].card;
			var gateName = lib.translate[card.name] || card.name;

			// 查找占据该阵门的玩家
			var occupant = null;
			for (var j = 0; j < game.players.length; j++) {
				if (game.players[j].zhenmen === gateName) {
					occupant = game.players[j];
					break;
				}
			}

			var colorType;
			if (dir === '下') {
				colorType = 'current';
			} else if (adGates.includes(gateName)) {
				colorType = 'adjacent';
			} else {
				colorType = 'other';
			}

			// 创建阵门节点
			var node = document.createElement('div');
			node.style.position = 'absolute';
			node.style.width = '60px';
			node.style.height = '80px';
			node.style.textAlign = 'center';
			node.style.cursor = 'pointer';

			// 计算位置（圆形布局）
			var angle = gateMap[dir].angle * (Math.PI / 180); // 转为弧度
			node.style.left = centerX + radius * Math.sin(angle) - 30 + 'px';
			node.style.top = centerY - radius * Math.cos(angle) - 40 + 'px';

			// 添加卡牌图片
			var cardDiv = document.createElement('div');
			cardDiv.style.width = '60px';
			cardDiv.style.height = '60px';
			cardDiv.style.backgroundImage = 'url(' + lib.card[card.name].image + ')';
			cardDiv.style.backgroundSize = 'cover';
			node.appendChild(cardDiv);

			// 添加阵门名称
			var nameDiv = document.createElement('div');
			nameDiv.innerText = gateName;
			if (colorType === 'current') {
				nameDiv.className = 'yellowtext';
			} else if (colorType === 'adjacent') {
				nameDiv.className = 'greentext';
			}
			node.appendChild(nameDiv);

			// 添加占据者信息
			if (occupant) {
				var occDiv = document.createElement('div');
				occDiv.innerText = '(' + (occupant.name || occupant._name || '未知') + ')';
				occDiv.style.fontSize = '10px';
				node.appendChild(occDiv);
			}

			// 添加点击事件（只有相邻的空阵门可点击）
			if (colorType === 'adjacent' && !occupant) {
				node.onclick = function () {
					// 触发选择该阵门
					player.chooseControl(gateName);
				};
			}

			core.appendChild(node);
		}

		return core;
	};

	lib.element.player.changeGate = function (gate) {
		var next = game.createEvent('changeGate', false);
		next.player = this;
		next.gate = gate;
		next.setContent('changeGate');
		return next;
	};
	lib.element.content.changeGate = function () {
		// let player = this;
		// let gate = event.gate;
		'step 0';
		if (player.zhenmen && player.hasSkill('ybsl_gate_' + get.gateIndex(player.zhenmen))) {
			player.removeSkill('ybsl_gate_' + get.gateIndex(player.zhenmen));
		}
		('step 1');
		if (event.gate && lib.bamenjinsuozhen.includes(event.gate)) {
			player.zhenmen = event.gate;
			player.addSkill('ybsl_gate_' + get.gateIndex(event.gate));
		} else player.zhenmen = null;
	};
	// 第123-159行，完整修改 _ybsl_yidongzhenmen 技能
	lib.skill._ybsl_yidongzhenmen = {
		usable: 1,
		enable: 'phaseUse',
		filter(event, player) {
			return (
				get.adGates(player).filter((g) => {
					return !game.players.some((c) => c.zhenmen == g);
				}).length > 0
			);
		},
		chooseButton: {
			dialog(event, player) {
				var dialog = ui.create.dialog('移动阵门');

				// 设置对话框内容样式
				dialog.content.style['overflow-x'] = 'visible';
				dialog.content.style['overflow-y'] = 'visible';
				dialog.content.style.width = '300px';
				dialog.content.style.height = '300px';
				dialog.content.style.position = 'relative';

				// 创建圆形阵盘核心容器
				var core = document.createElement('div');
				core.style.width = '0';
				core.style.height = '0';
				core.style.position = 'absolute';
				core.style.left = '38%';
				core.style.top = '55%';

				// 计算圆心和半径
				var centerX = 0;
				var centerY = 0;
				var radius = 100;

				// 获取阵门映射和相邻阵门
				var gateMap = get.gateMap(player);
				var adGates = get.adGates(player);
				var currentGate = player.zhenmen;

				// 方向列表（从正下方开始，逆时针）
				var directions = ['下', '左下', '左', '左上', '上', '右上', '右', '右下'];

				// 创建8个阵门节点
				for (var i = 0; i < directions.length; i++) {
					var dir = directions[i];
					if (!gateMap[dir]) continue;

					var card = gateMap[dir].card;
					var gateName = lib.translate[card.name] || card.name;
					var angle = gateMap[dir].angle;

					// 查找占据该阵门的玩家
					var occupant = null;
					// for (var j = 0; j < game.players.length; j++) {
					// 	if (game.players[j].zhenmen === gateName) {
					// 		occupant = game.players[j];
					// 		break;
					// 	}
					// }
					game.filterPlayer(function(current){
						if(current.zhenmen === gateName){
							occupant = current;
						}
					})

					// 判断阵门类型
					var colorType;
					if (gateName === currentGate) {
						colorType = 'current';
					} else if (adGates.includes(gateName)) {
						colorType = 'adjacent';
					} else {
						colorType = 'other';
					}

					// 创建阵门节点
					var node = document.createElement('div');
					node.style.position = 'absolute';
					node.style.width = '60px';
					node.style.height = '80px';
					node.style.textAlign = 'center';
					node.style.cursor = 'pointer';

					// 计算位置（圆形布局，角度转弧度）
					var radian = angle * (Math.PI / 180);
					node.style.left = centerX + radius * Math.sin(radian) - 30 + 'px';
					node.style.top = centerY - radius * Math.cos(radian) - 40 + 'px';

					// 添加卡牌背景
					var cardDiv = document.createElement('div');
					cardDiv.style.width = '60px';
					cardDiv.style.height = '60px';
					cardDiv.style.backgroundImage = 'url(' + lib.card[card.name].image + ')';
					cardDiv.style.backgroundSize = 'cover';
					cardDiv.style.border = '3px solid transparent';
					cardDiv.style.borderRadius = '5px';

					// 根据阵门类型设置边框颜色
					if (colorType === 'current') {
						cardDiv.style.borderColor = '#ffff00'; // 黄色
						cardDiv.style.boxShadow = '0 0 10px #ffff00';
					} else if (colorType === 'adjacent') {
						cardDiv.style.borderColor = '#00ff00'; // 绿色
						cardDiv.style.boxShadow = '0 0 10px #00ff00';
					} else {
						cardDiv.style.borderColor = '#888888'; // 灰色
					}

					node.appendChild(cardDiv);

					// 添加阵门名称
					var nameDiv = document.createElement('div');
					nameDiv.innerText = gateName;
					nameDiv.style.fontWeight = 'bold';
					nameDiv.style.fontSize = '15px';
					nameDiv.style.marginTop = '5px';
					nameDiv.style.marginLeft = '5px';
					if (colorType === 'current') {
						nameDiv.style.color = '#ffff00';
					} else if (colorType === 'adjacent') {
						nameDiv.style.color = '#00ff00';
					} else {
						nameDiv.style.color = '#ffffff';
					}
					node.appendChild(nameDiv);

					// ✅ 新增：如果有角色占据该阵门，添加角色头像
					if (occupant) {
						var occDiv = document.createElement('div');
						occDiv.innerText = get.translation(occupant.name || occupant._name)||'未知';

						occDiv.style.fontSize = '12px';
						occDiv.style.color = '#' + occupant.seat;
						// occDiv.style.marginTop = '2px';
						occDiv.style.marginTop = '5px';
						occDiv.style.marginLeft = '5px';
						occDiv.style.width = '100%';
						node.appendChild(occDiv);
					}

					// 添加点击事件（只有相邻的空阵门可点击）
					if (colorType === 'adjacent' && !occupant) {
						// node.onclick = (function (gateName, dialog) {
						// 	return function () {
						// 		// 关闭对话框
						// 		dialog.close();
						// 		// 直接调用 player.changeGate
						// 		player.changeGate(gateName);
						// 		game.log(player, '移动至', gateName);
						// 	};
						// })(gateName, dialog);

						// // 鼠标悬停效果
						// node.onmouseenter = function () {
						// 	this.style.transform = 'scale(1.1)';
						// };
						// node.onmouseleave = function () {
						// 	this.style.transform = 'scale(1.0)';
						// };
					} else {
						// 不可点击的阵门设置半透明
						node.style.opacity = '0.5';
						node.style.cursor = 'not-allowed';
					}

					core.appendChild(node);
				}

				// 将阵盘添加到对话框
				dialog.content.appendChild(core);

				return dialog;
			},
			chooseControl(event, player) {
				var list2 = [];
				get.adGates(player).forEach((g) => {
					if (!game.players.some((c) => c.zhenmen == g)) {
						list2.push(g);
					}
				});
				list2.push('cancel2');
				return list2;
			},
			backup(result, player) {
				return {
					markname: result.control,
					filterCard() {
						return false;
					},
					selectCard: -1,
					content() {
						var name = lib.skill._ybsl_yidongzhenmen_backup.markname;
						player.changeGate(name);
					},
				};
			},
		},
	};

	lib.translate._ybsl_yidongzhenmen = '移动阵门';
	lib.translate._ybsl_yidongzhenmen_backup = '移动阵门';
	lib.translate._ybsl_yidongzhenmen_info = '移动阵门至相邻阵门';
	lib.card.ybsl_gate_0 = {
		fullskin: true,
		// noname: true,
		image: 'wuxie',
	};
	lib.card.ybsl_gate_1 = {
		fullskin: true,
		// noname: true,
		image: 'juedou',
	};
	lib.card.ybsl_gate_2 = {
		fullskin: true,
		// noname: true,
		image: 'jiu',
	};
	lib.card.ybsl_gate_3 = {
		fullskin: true,
		// noname: true,
		image: 'bagua',
	};
	lib.card.ybsl_gate_4 = {
		fullskin: true,
		// noname: true,
		image: 'taoyuan',
	};
	lib.card.ybsl_gate_5 = {
		fullskin: true,
		// noname: true,
		image: 'sadouchengbing',
	};
	lib.card.ybsl_gate_6 = {
		fullskin: true,
		// noname: true,
		image: 'sha',
	};
	lib.card.ybsl_gate_7 = {
		fullskin: true,
		// noname: true,
		image: 'wuzhong',
	};
	lib.skill.ybsl_gate_0 = {
		superCharlotte: true,
		mark: true,
		marktext: '休',
		intro: {
			content: '锁定技，你的手牌上限+1，你不能成为【过河拆桥】和【兵粮寸断】的目标。',
		},
		mod: {
			maxHandcard: function (player, num) {
				return num + 1;
			},
			targetEnabled: function (card, player, target, now) {
				if (card.name == 'huohe' || card.name == 'bingliang') return false;
			},
		},
	};
	lib.skill.ybsl_gate_1 = {
		superCharlotte: true,
		mark: true,
		marktext: '惊',
		intro: {
			content: '出牌阶段限一次，你可以与一名手牌数不小于你的角色拼点，若你赢，视为你对该角色使用了一张【决斗】；若你没赢，直到回合结束，你不能使用锦囊牌。',
		},
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			if (player.countCards('h') == 0) {
				return false;
			}
			return game.hasPlayer(function (current) {
				return current.countCards('h') >= player.countCards('h') && player.canCompare(current);
			});
		},
		filterTarget(card, player, target) {
			return player.canCompare(target) && target.countCards('h') >= player.countCards('h');
		},
		async content(event, trigger, player) {
			const target = event.target;
			const { bool } = await player.chooseToCompare(target).forResult();
			if (!bool) {
				return void (await player.addTempSkill('ybsl_gate_1_silent'));
			} else {
				player.useCard({ name: 'juedou', isCard: true }, target, 'noai').animate = false;
			}
		},
		subSkill: {
			silent: {
				charlotte: true,
				mod: {
					cardEnabled(card) {
						if (get.type2(card) == 'trick') {
							return false;
						}
					},
				},
				mark: true,
				marktext: '惊',
				intro: {
					markcount: '-',
				},
			},
		},
	};
	lib.skill.ybsl_gate_2 = {
		superCharlotte: true,
		mark: true,
		marktext: '死',
		intro: {
			content: '锁定技，每当你对一名体力值大于你的角色使用一张杀，该角色受到的伤害+1。',
		},
		forced: true,
		trigger: { player: 'useCardToPlayered' },
		filter(event, player) {
			const { card, targets, target } = event;
			return card.name == 'sha' && target.hp > player.hp;
		},
		content() {
			trigger.getParent().baseDamage++;
		},
	};
	lib.skill.ybsl_gate_3 = {
		superCharlotte: true,
		mark: true,
		marktext: '景',
		intro: {
			content: '准备阶段开始时，你可以摸3张牌，然后将3张手牌以任意顺序放置于牌库顶或牌库底。',
		},
		trigger: {
			player: 'phaseZhunbeiBegin',
		},
		content() {
			'step 0';
			player.draw(3);
			('step 1');
			player
				.chooseCard(3, 'h', '请选择3张手牌', true)
				.set('complexCard', true)
				.set('ai', function (card) {
					if (ui.selected.cards.length > 0) {
						if (get.suit(ui.selected.cards[ui.selected.cards.length - 1]) == get.suit(card)) return 10;
					} else {
						return 6 - get.value(card);
					}
				});
			('step 2');
			if (result.cards) {
				var cards = result.cards;

				var next = player.chooseToMove();
				next.set('list', [['牌堆顶', cards], ['牌堆底']]);
				next.set('prompt', '点击或拖动将牌移动到牌堆顶或牌堆底');

				next.processAI =
					event.processAI ||
					function (list) {
						let cards = list[0][1],
							player = _status.event.player,
							target = _status.currentPhase || player,
							name = _status.event.getTrigger()?.name,
							countWuxie = (current) => {
								let num = current.getKnownCards(player, (card) => {
									return get.name(card, current) === 'wuxie';
								});
								if (num && current !== player) {
									return num;
								}
								let skills = current.getSkills('invisible').concat(lib.skill.global);
								game.expandSkills(skills);
								for (let i = 0; i < skills.length; i++) {
									let ifo = get.info(skills[i]);
									if (!ifo) {
										continue;
									}
									if (ifo.viewAs && typeof ifo.viewAs != 'function' && ifo.viewAs.name == 'wuxie') {
										if (!ifo.viewAsFilter || ifo.viewAsFilter(current)) {
											num++;
											break;
										}
									} else {
										let hiddenCard = ifo.hiddenCard;
										if (typeof hiddenCard == 'function' && hiddenCard(current, 'wuxie')) {
											num++;
											break;
										}
									}
								}
								return num;
							},
							top = [];
						switch (name) {
							case 'phaseJieshu':
								target = target.next;
							// [falls through]
							case 'phaseZhunbei': {
								let att = get.sgn(get.attitude(player, target)),
									judges = target.getCards('j'),
									needs = 0,
									wuxie = countWuxie(target);
								for (let i = Math.min(cards.length, judges.length) - 1; i >= 0; i--) {
									let j = judges[i],
										cardj = j.viewAs ? { name: j.viewAs, cards: j.cards || [j] } : j;
									if (wuxie > 0 && get.effect(target, j, target, target) < 0) {
										wuxie--;
										continue;
									}
									let judge = get.judge(j);
									cards.sort((a, b) => {
										return (judge(b) - judge(a)) * att;
									});
									if (judge(cards[0]) * att < 0) {
										needs++;
										continue;
									} else {
										top.unshift(cards.shift());
									}
								}
								if (needs > 0 && needs >= judges.length) {
									return [top, cards];
								}
								cards.sort((a, b) => {
									return (get.value(b, target) - get.value(a, target)) * att;
								});
								while (needs--) {
									top.unshift(cards.shift());
								}
								while (cards.length) {
									if (get.value(cards[0], target) > 6 == att > 0) {
										top.push(cards.shift());
									} else {
										break;
									}
								}
								return [top, cards];
							}
							default:
								cards.sort((a, b) => {
									return get.value(b, target) - get.value(a, target);
								});
								while (cards.length) {
									if (get.value(cards[0], target) > 6) {
										top.push(cards.shift());
									} else {
										break;
									}
								}
								return [top, cards];
						}
					};
			} else {
				event.finish();
			}
			('step 3');
			var top = result.moved[0];
			var bottom = result.moved[1];
			// var star = result.moved[2];
			top.reverse();
			for (var i = 0; i < top.length; i++) {
				ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
			}
			for (i = 0; i < bottom.length; i++) {
				ui.cardPile.appendChild(bottom[i]);
			}
			event.result = {
				bool: true,
				moved: [top, bottom],
			};
			game.addCardKnower(top, player);
			game.addCardKnower(bottom, player);
			player.popup(get.cnNumber(top.length) + '上' + get.cnNumber(bottom.length) + '下');
			game.log(player, '将' + get.cnNumber(top.length) + '张牌置于牌堆顶');
			game.updateRoundNumber();
			game.delayx();
		},
	};
	lib.skill.ybsl_gate_4 = {
		superCharlotte: true,
		mark: true,
		marktext: '生',
		intro: {
			content: '出牌阶段限一次，你可以弃置一张手牌，视为使用了一张【桃园结义】，若有其他角色以此法回复了体力，你摸一张牌。',
		},
		usable: 1,
		enable: 'phaseUse',
		selectCard: 1,
		filterCard: lib.filter.cardDiscardable,
		position: 'h',
		viewAs: function (cards, player) {
			var name = 'taoyuan';
			//返回判断结果
			if (name) return { name: name, cards: [] };
			return null;
		},
		discard: true,
		precontent() {
			player.addTempSkill('ybsl_gate_4_draw');
		},
		subSkill: {
			draw: {
				charlotte: true,
				trigger: { global: 'recoverAfter' },
				forced: true,
				popup: false,
				filter(event, player) {
					return event.getParent().skill == 'ybsl_gate_4' && event.player != player;
				},
				content() {
					player.draw();
				},
			},
		},
	};
	lib.skill.ybsl_gate_5 = {
		superCharlotte: true,
		mark: true,
		marktext: '杜',
		intro: {
			content: '准备阶段开始时，你可以声明一个颜色，然后展示牌库顶的牌，若与你声明的颜色相同，你获得之，并重复此流程；若不同，弃置此牌。',
		},
		trigger: { player: 'phaseZhunbeiBegin' },
		filter(event, player) {
			return true;
		},
		async content(event, trigger, player) {
			while (true) {
				const result = await player
					.chooseControl('红色', '黑色', '其他')
					.set('prompt', '杜门：猜测下一张牌的颜色')
					.set('ai', () => (get.event().getParent().num < 7 ? 0 : 1))
					.forResult();
				const choice = result.index == 0 ? 'red' : result.index == 1 ? 'black' : 'other';
				player.popup(choice, 'water');
				game.log(player, '猜测', '#y' + get.translation(choice));
				const card = get.cards()[0];
				await game.cardsGotoOrdering(card);
				// cards.push(card);
				// const num = get.number(card, false);
				await player.showCards(card, get.translation(player) + '发动了【杜门】');
				if (choice == get.color(card) || (choice == 'other' && !['red', 'black'].includes(get.color(card)))) {
					await player.gain(card, 'gain2');
				} else {
					await player.discard(card);
					break;
				}
			}
		},
	};
	lib.skill.ybsl_gate_6 = {
		superCharlotte: true,
		mark: true,
		marktext: '伤',
		intro: {
			content: '若你打出的【杀】没有被【闪】响应，你可以失去一点体力，令此杀伤害+1。',
		},
		trigger: { source: 'damageBegin1' },
		filter(event, player) {
			const target = event.player;
			const evtx = event.getParent(2);
			const card = event.card;
			const name = card?.name;
			if (!card || !['sha'].includes(name)) {
				return false;
			}
			if (name == 'sha') {
				return !target.hasHistory('useCard', (evt) => {
					return evt.card.name == 'shan' && evt.respondTo && evt.getParent(3) == evtx;
				});
			}
		},
		logTarget: 'player',
		content() {
			'step 0';
			player.loseHp();
			('step 1');
			trigger.num++;
		},
	};
	lib.skill.ybsl_gate_7 = {
		superCharlotte: true,
		mark: true,
		marktext: '开',
		intro: {
			content: '摸牌阶段，你可以额外摸一张牌，然后将一张手牌交给任意一名其他角色。',
		},
		trigger: {
			player: 'phaseDrawBegin',
		},
		filter(event, player) {
			return event.num > 0;
		},
		content: function () {
			trigger.num++;
			// player.addTempSkill('ybsl_gate_7_give');
			player
				.when('phaseDrawAfter')
				.then(function () {
					if (player.countCards('h') > 0) {
						player.chooseCardTarget({
							filterTarget(card, player, target) {
								return player != target;
							},
							selectCard: 1,
							position: 'h',
							forced: true,
							filterCard() {
								return true;
							},
							filterTarget: (card, player, target) => {
								return player != target;
							},
							ai1(card) {
								if (!ui.selected.cards.length && card.name == 'du') return 20;
								return 10 - get.value(card);
							},
							ai2(target) {
								if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
									return target.hasSkillTag('nodu') ? 0 : -10;
								}
								if (target.hasJudge('lebu')) return 0;
								const nh = target.countCards('h');
								const np = player.countCards('h');
								if (nh >= np - 1 && np <= player.hp && !target.hasSkill('haoshi')) return 0;
								return Math.max(1, 5 - nh);
							},
							prompt: '将一张手牌交给任意角色？',
						});
					}
				})
				.then(function () {
					if (result.cards) {
						player.give(result.cards, result.targets[0]);
					}
				});
		},
	};
	lib.translate.ybsl_gate_0 = '休';
	lib.translate.ybsl_gate_1 = '惊';
	lib.translate.ybsl_gate_2 = '死';
	lib.translate.ybsl_gate_3 = '景';
	lib.translate.ybsl_gate_4 = '生';
	lib.translate.ybsl_gate_5 = '杜';
	lib.translate.ybsl_gate_6 = '伤';
	lib.translate.ybsl_gate_7 = '开';
	lib.translate.ybsl_gate_0_info = '锁定技，你的手牌上限+1，你不能成为【过河拆桥】和【兵粮寸断】的目标。';
	lib.translate.ybsl_gate_1_info = '出牌阶段限一次，你可以与一名手牌数不小于你的角色拼点，若你赢，视为你对该角色使用了一张【决斗】；若你没赢，直到回合结束，你不能使用锦囊牌。';
	lib.translate.ybsl_gate_2_info = '锁定技，你对体力值多于你的角色使用的【杀】伤害+1。';
	lib.translate.ybsl_gate_3_info = '准备阶段开始时，你可以摸3张牌，然后将3张手牌以任意顺序放置于牌库顶或牌库底。';
	lib.translate.ybsl_gate_4_info = '出牌阶段限一次，你可以弃置一张手牌，视为使用了一张【桃园结义】，若有其他角色以此法回复了体力，你摸一张牌。';
	lib.translate.ybsl_gate_5_info = '准备阶段开始时，你可以声明一个颜色，然后展示牌库顶的牌，若与你声明的颜色相同，你获得之，并重复此流程；若不同，弃置此牌。';
	lib.translate.ybsl_gate_6_info = '若你打出的【杀】没有被【闪】响应，你可以失去一点体力，令此杀伤害+1。';
	lib.translate.ybsl_gate_7_info = '摸牌阶段，你可以额外摸一张牌，然后将一张手牌交给任意一名其他角色。';
	// lib.hook.player.die = function (player) {
	// 	if (player.zhenmen) {
	// 		player.zhenmen = null;
	// 	}
	// };
	const dieLeftGate = lib.element.player.die;
	lib.element.player.die = function (arr) {
		dieLeftGate.apply(this, arguments);
		if (this.zhenmen) {
			this.zhenmen = null;
		}
	};

	let costGates = ['休', '惊', '死', '景', '生', '杜', '伤', '开'];
	let startIndex = Math.floor(Math.random() * costGates.length);
	costGates = costGates.slice(startIndex).concat(costGates.slice(0, startIndex));
	const initLeftGate = lib.element.player.init;
	lib.element.player.init = function (arr) {
		initLeftGate.apply(this, arguments);
		this.changeGate(costGates.shift());
	};
	/*

			需游戏选将前选择开启或关闭，适用于八人及八人以下玩法。<br>
			以下为说明卡原文，实际代码可能有出入，按照实际结算为准<br>
			1、首先把八门金锁阵阵图摆在桌上，然后将代表着八门的8张卡洗混，每个人随机抽取一张，然后按照自己对应的门坐到相应的位置。<br>
			2、按照游戏传统规则开始游戏，胜利条件与标准身份相同。<br>
			3、若有玩家死亡或游戏人数不满8人导致有阵门闲置，此阵门即为空阵门。邻近玩家在自己的出牌阶段可以移动至此门，获得该阵门技能，失去原阵门技能。每个出牌阶段只能执行一次移动。<br>
			4、空阵门不计算距离，玩家之间相隔空阵门时距离依旧为1，不论是否移动过。<br>
			*只有和空阵门相邻玩家可以移动至此阵门，中间有玩家相隔时不可移动。（没说能否跨越阵门，就当不行了）<br>
			*移动阵门不影响该角色区域内的牌。<br>
			<b>阵门技能</b><br>
			生门：出牌阶段限一次，你可以弃置一张手牌，视为使用了一张【桃园结义】，若有其他角色以此法回复了体力，你摸一张牌。<br>
			景门：准备阶段开始时，你可以摸3张牌，然后将3张手牌以任意顺序放置于牌库顶或牌库底。<br>
			开门：摸牌阶段，你可以额外摸一张牌，然后将一张手牌交给任意一名其他角色。<br>
			休门：锁定技，你的手牌上限+1，你不能成为【过河拆桥】和【兵粮寸断】的目标。<br>
			伤门：若你打出的【杀】没有被【闪】响应，你可以失去一点体力，令此杀伤害+1。<br>
			惊门：出牌阶段限一次，你可以与一名手牌数不小于你的角色拼点，若你赢，视为你对该角色使用了一张【决斗】；若你没赢，直到回合结束，你不能使用锦囊牌。<br>
			杜门：准备阶段开始时，你可以声明一个颜色，然后展示牌库顶的牌，若与你声明的颜色相同，你获得之，并重复此流程；若不同，弃置此牌。<br>
			死门：锁定技，你对体力值多于你的角色使用的【杀】伤害+1。
	 */
};
