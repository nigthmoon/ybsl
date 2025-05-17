import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

const skill = {

	//---------------------------三国杀开局大宝直接秒杀
	//摸周泰
	sgskjdbzjms_tiequ:{
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:['damageBegin4','damageEnd'],
		},
		filter(event, player,name) {
			if(name=='damageBegin4')return event.hasNature();
			else return true;
		},
		content() {
			if(event.triggername=='damageBegin4'){
				trigger.num--;
			}
			else player.addMark('sgskjdbzjms_tiequ',1)
		},
		ai: {
			nofire: true,
			nothunder: true,
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, "natureDamage")) return "zeroplayertarget";
				},
			},
		},
		onremove:true,
		mark:true,
		marktext:'淬',
		intro:{
			name:'淬炼',
		}
	},
	sgskjdbzjms_xieren:{
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: "damageBegin3",
			source: "damageBegin1",
		},
		filter(event, player) {
			if (event.source == event.player) return false;
			if (event.player == player) {
				return event.source && event.source.isIn();
			}
			return true;
		},
		logTarget(event, player) {
			if (event.player == player) return event.source;
			return event.player;
		},
		cost(){
			var target=trigger.player==player?trigger.source:trigger.player;
			event.result = player.choosePlayerCard(target,'he')
			.set("ai", button => {
				let val = get.buttonValue(button);
				if (get.event("att") > 0) return - val;
				return val;
			})
			.set("att", get.attitude(player, target))
			.forResult();
		},
		content() {
			var target=trigger.player==player?trigger.source:trigger.player;
			target.discard(event.cards,player);
		},
		ai: {
			maixie: true,
			maixie_hp: true,
		},
	},
	sgskjdbzjms_cuiti:{
		derivation: "gzbuqu",
		audio: 'ext:夜白神略/audio/character:2',
		skillAnimation: true,
		animationColor: "wood",
		juexingji: true,
		unique: true,
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			return player.countMark('sgskjdbzjms_tiequ')>=3 && !player.storage.sgskjdbzjms_cuiti;
		},
		forced: true,
		//priority:3,
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			await player.gainMaxHp();
			await player.recover();
			await player.addSkill('gzbuqu');
		},
		ai: {
			maixie: true,
			combo: "sgskjdbzjms_tiequ",
		},
	},
	//魂神诸葛亮
	sgskjdbzjms_zhongwu:{
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:'phaseDrawBegin',
		},
		filter(event,player){
			return true
		},
		content(){
			trigger.num++;
		},
		mod: {
			cardUsable(card, player, num) {
				if (card.name == "sha") return num + 1;
			},
			maxHandcard(player,num){
				return num+2;
			}
		},

	},
	sgskjdbzjms_kuangfeng:{
		unique: true,
		audio: 2,
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		filter(event, player) {
			return player.getExpansions("qixing").length;
		},
		content() {
			"step 0";
			var num = Math.min(game.countPlayer(), player.getExpansions("qixing").length);
			player.chooseTarget(get.prompt("sgskjdbzjms_kuangfeng"), "令至多" + get.cnNumber(num) + "名角色获得“狂风”标记" ,[1, num]).ai = function (target) {
				return -1;
			};
			"step 1";
			if (result.bool) {
				var targets = result.targets.sortBySeat();
				player.logSkill("sgskjdbzjms_kuangfeng", targets, "fire");
				var length = targets.length;
				targets.forEach(target => {
					target.addAdditionalSkill(`kuangfeng_${player.playerid}`, "kuangfeng2");
					target.markAuto("kuangfeng2", [player]);
				});
				player.addTempSkill("kuangfeng3", { player: "phaseBeginStart" });
				player.chooseCardButton("选择弃置" + get.cnNumber(length) + "张“星”", length, player.getExpansions("qixing"), true);
			} else {
				event.finish();
			}
			"step 2";
			player.loseToDiscardpile(result.links);
		},
		ai: {
			combo: "qixing",
		},
	},
	sgskjdbzjms_tianshi:{
		derivation: "sgskjdbzjms_boxing",
		audio: 'ext:夜白神略/audio/character:2',
		skillAnimation: true,
		animationColor: "wood",
		juexingji: true,
		unique: true,
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			// return !player.getExpansions("qixing").length;
			return true;
		},
		async cost(event, trigger, player){
			event.result = {bool:false}
			if(!player.getExpansions("qixing").length)event.result = {bool:true}
			else {
				event.result = await player.chooseBool('是否主动舍弃所有的“星”，然后觉醒？').set('ai',function(){
					return false;
				}).forResult();
			}
		},
		// forced: true,
		locked:true,
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			if(player.getExpansions("qixing").length)await player.discard(player.getExpansions("qixing"));
			await player.loseMaxHp();
			await player.addSkill('sgskjdbzjms_boxing');
		},
		ai: {
			maixie: true,
		},
	},
	sgskjdbzjms_boxing:{
		audio: 'ext:夜白神略/audio/character:2',
		enable:['chooseToUse','chooseToRespond'],
		filter(event, player) {
			if (!player.countCards("hse") ) return false;
			for (var i of lib.inpile) {
				var type = get.type2(i);
				if ((type == "basic" || type == "trick") && event.filterCard(get.autoViewAs({ name: i }, "unsure"), player, event)) return true;
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				for (var i = 0; i < lib.inpile.length; i++) {
					var name = lib.inpile[i];
					if (name == "sha") {
						if (event.filterCard(get.autoViewAs({ name }, "unsure"), player, event)) list.push(["基本", "", "sha"]);
						for (var nature of get.YB_natureList()) {
							if (event.filterCard(get.autoViewAs({ name, nature }, "unsure"), player, event)) list.push(["基本", "", "sha", nature]);
						}
					} else if (get.type2(name) == "trick" && event.filterCard(get.autoViewAs({ name }, "unsure"), player, event)) list.push(["锦囊", "", name]);
					else if (get.type(name) == "basic" && event.filterCard(get.autoViewAs({ name }, "unsure"), player, event)) list.push(["基本", "", name]);
				}
				return ui.create.dialog("薄幸", [list, "vcard"]);
			},
			check(button) {
				if (_status.event.getParent().type != "phase") return 1;
				var player = _status.event.player;
				if (['ybsl_qisihuisheng',"wugu", "zhulu_card", "yiyi", "lulitongxin", "lianjunshengyan", "diaohulishan"].includes(button.link[2])) return 0;
				return player.getUseValue({
					name: button.link[2],
					nature: button.link[3],
				});
			},
			backup(links, player) {
				return {
					filterCard: true,
					audio: "sgskjdbzjms_boxing",
					popname: true,
					check(card) {
						return 8 - get.value(card);
					},
					position: "hse",
					viewAs: { name: links[0][2], nature: links[0][3] },
					precontent() {
						if(!player.hasMark('sgskjdbzjms_boxing_2'))player.YB_temp("sgskjdbzjms_boxing_2");
						else lib.skill.sgskjdbzjms_boxing.callbackx(player);
					},
				};
			},
			prompt(links, player) {
				return "将一张牌当做" + (get.translation(links[0][3]) || "") + get.translation(links[0][2]) + "使用";
			},
		},
		hiddenCard(player, name) {
			if (!lib.inpile.includes(name)) return false;
			var type = get.type2(name);
			return (type == "basic" || type == "trick") && player.countCards("she") > 0;
		},
		callbackx(player,str){
			var next = game.createEvent('sgskjdbzjms_boxing_2', false);
			next.player = player;
			next.str = str||'薄幸';
			next.setContent(async function(event, trigger, player) {
				const control = await player
					.chooseControl("baonue_hp", "baonue_maxHp", function (event, player) {
						if (player.hp == player.maxHp) return "baonue_hp";
						if (player.hp < player.maxHp - 1 || player.hp <= 2) return "baonue_maxHp";
						return "baonue_hp";
					})
					.set("prompt", str+"：失去1点体力或减1点体力上限")
					.forResultControl();
				if (control == "baonue_hp") await player.loseHp();
				else await player.loseMaxHp(true);
			});
		},
		ai: {
			fireAttack: true,
			respondSha: true,
			respondShan: true,
			skillTagFilter(player) {
				if ( !player.countCards("hse")) return false;
			},
			order: 1,
			result: {
				player(player) {
					if (_status.event.dying) return get.attitude(player, _status.event.dying);
					return 1;
				},
			},
		},
	},
	//雷震子
	sgskjdbzjms_leishen:{
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			// player:['useCard']
			source:['damageBegin1','damageBegin2'],
		},
		filter(event,player,name){
			if(name=='damageBegin1'){
				return true;
			}
			else {
				return event.card&&(event.card.hasNature('fire')||event.card.hasNature('thunder'));
			}
		},
		content(){
			if(event.triggername=='damageBegin1'){
				game.YB_addNature(trigger, "thunder");
			}
			else{
				if(trigger.card.hasNature('thunder'))trigger.num++;
				if(trigger.card.hasNature('fire')){
					player.discardPlayerCard("h", trigger.player);
				}
			}
		}
	},
	sgskjdbzjms_jiangxing:{
		audio: 'ext:夜白神略/audio/character:2',
		trigger: { player: "damageBegin4" },
		filter(event) {
			return event.hasNature("thunder");
		},
		forced: true,
		content() {
			trigger.cancel();
		},
		ai: {
			nothunder: true,
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, "thunderDamage")) return "zeroplayertarget";
				},
			},
		},
	},
	sgskjdbzjms_leifa:{
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:'phaseBegin',
		},
		filter(event){
			return true;
		},
		content(){
			// let targets = game.filterPlayer(current => current !== player).randomSort();
			let targets = game.filterPlayer(current => current.isEnemyOf(player)).randomSort();
			var target=targets[0];
			target.damage('thunder',player);
		},
	},
	sgskjdbzjms_fenglei:{
		audio: 'ext:夜白神略/audio/character:2',
		filter(event,player){
			if(!player.storage.sgskjdbzjms_fenglei)return player.countDiscardableCards(player, 'he')>=2;
			return true;
		},
		enable:'phaseUse',
		usable:1,
		selectCard:function(card,player,target){
			var player=_status.event.player;
			if(!player.storage.sgskjdbzjms_fenglei)return 2;
			return 0;
		},
		filterCard(card,player){
			if(!player.storage.sgskjdbzjms_fenglei)return player.getDiscardableCards(player,'he').includes(card);
			return false;
		},
		async content(event,trigger,player){
			if(player.storage.sgskjdbzjms_fenglei){
				player.draw(2);
				player.addTempSkill('sgskjdbzjms_fenglei_thunder')
			}
			else {
				player.addTempSkill('sgskjdbzjms_fenglei_wind',{player:'phaseBefore'})
			}
		},
		yongxuzhuanhuanji:true,
		zhuanhuanji:true,
		mark: true,
		marktext: '☯',
		// zhuanhuanji: 'number',
		zhuanhuanLimit: 2,
		intro: {
			markcount: (storage) => {
				if(storage)return '雷'
				return '风'
			},
			content(storage, player) {
				var str = '永续转换技';
				var str2 = '，出牌阶段限一次：'
				var strwind = '风，你弃置两张牌，直到你的下一回开始之前，你不在其他角色攻击范围内';
				var strthunder = '雷，你摸两张牌，当前回合使用牌无视距离';
				if(storage){
					if(player.hasSkill('sgskjdbzjms_fenglei_thunder'))return '<span class=yellowtext>'+str+'</span>' +str2+strwind+'；'+'<span class=yellowtext>'+strthunder+'</span>'+'。';
					return str+str2+strwind+'；'+'<span class=thundertext>'+strthunder+'</span>'+'。';
				}
				else{
					if(player.hasSkill('sgskjdbzjms_fenglei_wind'))return '<span class=yellowtext>'+str+'</span>' +str2+'<span class=yellowtext>'+strwind+'</span>'+'；'+strthunder+'。';
					return str+str2+'<span class=thundertext>'+strwind+'</span>'+'；'+strthunder+'。';
				}
			},
		},
		init(player,skill){
			player.storage[skill]=false;
		},
		subSkill:{
			wind:{
				audio:'sgskjdbzjms_fenglei',
				forced:true,
				mark: true,
				marktext:'风',
				mod:{
					inRangeOf(from, to) {
						if (from!=to) return false;
					},
				},
				onremove:function(player){
					if(lib.skill.sgskjdbzjms_fenglei.yongxuzhuanhuanji)player.changeZhuanhuanji('sgskjdbzjms_fenglei');
				}
			},
			thunder:{
				audio:'sgskjdbzjms_fenglei',
				forced:true,
				mark: true,
				marktext:'雷',
				mod: {
					targetInRange(card) {
						return true;
					},
				},
				onremove:function(player){
					if(lib.skill.sgskjdbzjms_fenglei.yongxuzhuanhuanji)player.changeZhuanhuanji('sgskjdbzjms_fenglei');
				}
			},
		}
	},
	//仙诸葛果
	sgskjdbzjms_qirang:{
		audio: 'qirang',
		usable:1,
		enable:'phaseUse',
		filter:()=>true,
		*content(event,map){
			const player = map.player;
			var result = yield player.judge();
			if(result.suit){
				switch(result.suit){
					case 'spade':
						yield player.chooseUseTarget(
							get.prompt('sgskjdbzjms_qirang'),
							'祈禳：你可以视为对一名角色使用一张杀。',
							{
								name:'sha',
								nature:null,
								isCard:false
							},
						).set('logSkill','sgskjdbzjms_qirang').set('addCount',false).set('selectTarget',function(){return 1});
						break;
					case 'heart':
						var relt = yield player.chooseTarget(
							'祈禳：令一名角色回复一点体力',
							function(card,player,target){ 
								return target.hp<target.maxHp;
							}
						).ai=function(target){ 
							return get.recoverEffect(target,player,_status.event.player); 
						};
						if(relt.bool){
							yield relt.targets[0].recover();
						}
						break;
					case 'club':
						var relt = yield player.chooseTarget(
							"弃置一名角色区域内的一张牌",
							(card, player, target) => {
								return target.countDiscardableCards(player, "hej");
							},
							true
						)
						.set("ai", target => {
							const player = get.player();
							let att = get.attitude(player, target);
							if (att < 0) {
								att = -Math.sqrt(-att);
							} else {
								att = Math.sqrt(att);
							}
							return att * lib.card.guohe.ai.result.target(player, target);
						});
						if(relt.bool){
							yield player.discardPlayerCard("he", relt.targets[0], true);
						}
						break;
					case 'diamond':
						var relt = yield player.chooseTarget("令一名角色摸两张牌")
						.set("ai", target => {
							const player = get.player();
							let att = get.attitude(player, target);
							return att;
						})
						if(relt.bool){
							yield relt.targets[0].draw(2);
						}
						break;
				}
			}
		},
	},
	sgskjdbzjms_cifu:{
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseBegin',
		},
		filter(event,player){
			return true;
			return player.countMark('sgskjdbzjms_cifu_mark')<3;
		},
		*content(event,map){
			let trigger=map.trigger,player=map.player;
			var num = 3-player.countMark('sgskjdbzjms_cifu_mark');
			if(num>0)yield player.addMark('sgskjdbzjms_cifu_mark',num);
			var result = yield player.chooseTarget([1,3],'是否赐福任意名其他角色').set('ai',function(target){
				var player=_status.event.player;
				var trigger = _status.event.getTrigger();
				if(player==trigger.player&&trigger.player.hp<2)return false;
				return get.attitude(player,target)>5;
			}).set('filterTarget',function(card,player,target){
				return player!=target;
			})
			if(result.targets&&result.targets.length){
				for(var i of result.targets){
					player.removeMark('sgskjdbzjms_cifu_mark');
					i.addMark('sgskjdbzjms_cifu_mark');
				}
			}
		},
		global:'sgskjdbzjms_cifu_mark',
		subSkill:{
			mark:{
				mark:true,
				marktext:'福',
				intro:{
					content:function(storage,player){
						if(player.hasSkill('sgskjdbzjms_cifu'))return '若你有三个“福”，当你受到属性伤害时，防止之。';
						return '摸牌阶段额外摸两张牌，然后移去“福”。'
					},
				},
				trigger:{
					player:['phaseDrawBegin','damageBegin4'],
				},
				filter(event,player,name){
					if(name=='damageBegin4')return player.countMark('sgskjdbzjms_cifu_mark')>=3&&player.hasSkill('sgskjdbzjms_cifu');
					return true;
				},
				content(){
					if(event.triggername=='damageBegin4')trigger.cancel();
					else {
						player.removeMark('sgskjdbzjms_cifu_mark',player.countMark('sgskjdbzjms_cifu_mark'));
						trigger.num+=2;
					}
				},
				ai: {
					nofire: true,
					nothunder: true,
					effect: {
						target(card, player, target, current) {
							if (get.tag(card, "natureDamage")) return "zeroplayertarget";
						},
					},
					skillTagFilter(player, tag, arg) {
						if(player.countMark('sgskjdbzjms_cifu_mark')>=3&&player.hasSkill('sgskjdbzjms_cifu'))return true;
						return false;
					},
				},
			}
		},
	},
	sgskjdbzjms_yuhua:{
		audio: 'yuhua',
		skillAnimation:true,
		animationColor:'shen',
		unique:true,
		juexingji:true,
		derivation:['sgskjdbzjms_tianxian'],
		trigger:{
			player:'dying',
		},
		forced:true,
		filter:function (event,player){
			return !player.storage.sgskjdbzjms_yuhua;
		},
		content:function (){
			'step 0'
			player.storage.sgskjdbzjms_yuhua=true;
			player.awakenSkill('sgskjdbzjms_yuhua');
			'step 1'
			var num = 1-player.hp;
			if(num>=1)player.recover(num);
			'step 2'
			player.loseMaxHp();
			lib.skill.chenliuwushi.change(player, 1);
			'step 3'
			player.addSkill('sgskjdbzjms_tianxian');
		},
		// subSkill:{
		// 	hand:{
		// 		mark:true,
		// 		charlotte:true,
		// 		markimage: "image/card/handcard.png",
		// 		intro: {
		// 			content(num, player) {
		// 				return '<li>手牌上限+1。'
		// 			},
		// 		},
		// 		mod: {
		// 			maxHandcard(player, num) {
		// 				return num + 1;
		// 			},
		// 		},
				
		// 	}
		// },
	},
	sgskjdbzjms_tianxian:{
		audio: 'yuhua',
		mod: {
			ignoredHandcard(card, player) {
				if (card.type=='trick'||card.type=='delay'||card.name=='tao') {
					return true;
				}
			},
			cardDiscardable(card, player, name) {
				if (name == "phaseDiscard" && (card.type=='trick'||card.type=='delay'||card.name=='tao')) {
					return false;
				}
			},
		},
		forced:true,
		trigger:{
			player:'phaseBegin',
		},
		filter(event,player){
			var card = get.cardPile(function (card) {
				return get.type(card, "trick") == "trick";
			});
			if (card)return true;
		},
		content(){
			var card = get.cardPile(function (card) {
				return get.type(card, "trick") == "trick";
			});
			if (card) {
				player.gain(card, "gain2");
			}
		},
	},
	//真张飞
	sgskjdbzjms_paoxiao:{
		audio: 'olpaoxiao',
		mod: {
			cardUsable(card, player, num) {
				if (card.name == "sha") return Infinity;
			},
			targetInRange(card, player) {
				if (card.name == "sha") return true;
			},
		},
		trigger: { player: "useCard1" },
		forced: true,
		filter(event, player) {
			return !event.audioed && event.card.name == "sha" && player.countUsed("sha", true) > 1 && event.getParent().type == "phase";
		},
		async content(event, trigger, player) {
			trigger.audioed = true;
		},
	},
	sgskjdbzjms_kuangbao:{
		audio: 'tishen',
		mod: {
			cardEnabled(card, player) {
				if ((get.color(card) == "black"&&(get.type2(card)=='trick'||get.subtype(card)=='equip1') )) {
					var hs = player.getCards("h"),
						cards = [card];
					if (Array.isArray(card.cards)) cards.addArray(card.cards);
					for (var i of cards) {
						if (hs.includes(i)) return false;
					}
				}
			},
			cardRespondable(card, player) {
				if ((get.color(card) == "black"&&(get.type2(card)=='trick'||get.subtype(card)=='equip1') )) {
					var hs = player.getCards("h"),
						cards = [card];
					if (Array.isArray(card.cards)) cards.addArray(card.cards);
					for (var i of cards) {
						if (hs.includes(i)) return false;
					}
				}
			},
			cardSavable(card, player) {
				if ((get.color(card) == "black"&&(get.type2(card)=='trick'||get.subtype(card)=='equip1') )) {
					var hs = player.getCards("h"),
						cards = [card];
					if (Array.isArray(card.cards)) cards.addArray(card.cards);
					for (var i of cards) {
						if (hs.includes(i)) return false;
					}
				}
			},
			// cardSavable: function (card) {
			// 	if ((get.color(card) == "black"&&(get.type2(card)=='trick'||get.subtype(card)=='equip1') ) && ((card.isCard && card.cardid) || get.itemtype(card) == "card")) return false;
			// },
		},
		enable: ["chooseToUse"/*, "chooseToRespond"*/],
		filterCard: function(card){
			return (get.color(card) == "black"&&
				(get.type2(card)=='trick'||get.subtype(card)=='equip1')
			 )
		},
		viewAs: {
			name: "sha",
			isCard: true,
		},
		viewAsFilter: function (player) {
			if (!player.countCards("h",function(card){
				return (get.color(card) == "black"&&
					(get.type2(card)=='trick'||get.subtype(card)=='equip1')
				 )
			})) return false;
		},
		position: "h",
		prompt: "将一张黑色锦囊牌或黑色武器牌当杀使用或打出",
		check: function () {
			return 1;
		},
		ai: {
			respondSha: true,
			skillTagFilter: function (player) {
				if (!player.countCards("h",function(card){
					return ((get.color(card) == "black"&&
						(get.type2(card)=='trick'||get.subtype(card)=='equip1')
					 ) && (
						(card.isCard && card.cardid) ||
							 get.itemtype(card) == "card"
						)
					)
				})) return false;
			},
			order: function () {
				return get.order({ name: "sha" }) - 0.1;
			},
		},
		group:['sgskjdbzjms_kuangbao_damage'],
		subSkill:{
			damage:{
				audio: 'sgskjdbzjms_kuangbao',
				trigger:{
					source:'damageBegin1',
				},
				forced:true,
				filter(event,player){
					var evt = event.getParent(2);
					return evt.skill&&evt.skill=='sgskjdbzjms_kuangbao'&&event.player!=player;
				},
				async content(event,trigger,player){
					trigger.num++;
					await player.chooseToDiscard('h',true,get.prompt2('sgskjdbzjms_kuangbao'));
				}
			}
		}
	},
	sgskjdbzjms_yinhen:{
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		ai: {
			threaten: 0.5,
			neg: true,
		},
		trigger: {
			source: ['dieAfter'],
		},
		content(){
			player.loseHp();
		}
	},
	//真关羽
	sgskjdbzjms_wusheng:{
		audio: 'dcwuyou',
		mod: {
			targetInRange(card) {
				if (get.suit(card) == "diamond" && card.name == "sha") return true;
			},
		},
		locked: false,
		// audio: "wusheng",
		enable: ["chooseToRespond", "chooseToUse"],
		filterCard(card, player) {
			if (get.zhu(player, "shouyue")) return true;
			return get.color(card) == "red";
		},
		position: "hes",
		viewAs: {
			name: "sha",
		},
		viewAsFilter(player) {
			if (get.zhu(player, "shouyue")) {
				if (!player.countCards("hes")) return false;
			} else {
				if (!player.countCards("hes", { color: "red" })) return false;
			}
		},
		prompt: "将一张红色牌当杀使用或打出",
		check(card) {
			var val = get.value(card);
			if (_status.event.name == "chooseToRespond") return 1 / Math.max(0.1, val);
			return 5 - val;
		},
		ai: {
			respondSha: true,
			skillTagFilter(player) {
				if (get.zhu(player, "shouyue")) {
					if (!player.countCards("hes")) return false;
				} else {
					if (!player.countCards("hes", { color: "red" })) return false;
				}
			},
		},
		locked: false,
		forced: true,
		trigger:{
			player:'shaBegin',
		},
		filter(event,player,name){
			if(name=='shaBegin'){
				if(event.card&&get.suit(event.card)=='heart')return true;
				return false;
			}
			else return true;
		},
		content(){
			trigger.baseDamage++
		}
	},
	// wusheng_jsp_guanyu:{
	// 	audio:2,
	// },
	sgskjdbzjms_danji:{
		audio: 'dcyixian',
		usable:1,
		trigger:{
			player:'loseAfter',
			global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
		},
		frequent:true,
		filter:function(event,player){
			if(player.countCards('h')) return false;
			var evt=event.getl(player);
			return evt&&evt.player==player&&evt.hs&&evt.hs.length>0;
		},
		content:function(){
			player.draw(Math.min(player.maxHp,20));
		},
		ai:{
			threaten:0.8,//嘲讽值
			effect:{
				target:function(card){
					if(card.name=='guohe'||card.name=='liuxinghuoyu') return 0.5;
				}
			},
			noh:true,
			skillTagFilter:function(player,tag){
				if(tag=='noh'){
					if(player.countCards('h')!=1) return false;
				}
			}
		}
	},
	sgskjdbzjms_fujun:{
		audio:'dcjuewu',
		unique: true,
		limited: true,
		enable: "phaseUse",
		filterTarget(card, player, target) {
			return true;
		},
		selectTarget:-1,
		complexCard: true,
		complexSelect: true,
		line: "thunder",
		forceDie: true,
		animationColor: "fire",
		skillAnimation: "legend",
		contentBefore() {
			player.awakenSkill("sgskjdbzjms_fujun");
		},
		async content(event,trigger,player) {
			var result = await event.target.chooseToDiscard(2,'①弃置两张牌，②令'+get.translation(player)+'摸三张牌；').set('ai',function(card){
				var att = get.attitude(_status.event.player,player);
				if(att>0)return false;
				if (card.name == "tao") return -10;
				if (card.name == "jiu" && _status.event.player.hp == 1) return -10;
				return get.unuseful(card) + 2.5 * (5 - get.owner(card).hp);
			}).forResult();
			if(!result.bool)await player.draw(3);
		},
		contentAfter(){
			player.gainMaxHp();
			player.recover();
		},
		ai: {
			order:10,
			result:{
				player:10,
			}
		},
	},
	//魂神刘备
	sgskjdbzjms_zhaolie:{
		forced:true,
		mod: {
			maxHandcardBase(player, num) {
				return player.maxHp;
			},
		},
	},
	sgskjdbzjms_rende:{
		audio: "rerende",
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return player.countCards("h") > 0;
		},
		content(){
			'step 0'
			var listx = player.YB_liangying(
				player.getCards('h'),
				get.prompt2('sgskjdbzjms_rende'),
				function(card,player,target){
					return player!=target
				}
			)
			event.listx = listx;
			'step 1'
			var num = event.listx.resultx.length;
			player.draw(Math.floor(num/2)+1);
		},
	},
	sgskjdbzjms_taoyuan:{
		derivation:['sgskjdbzjms_juguo','sgskjdbzjms_qingfu'],
		audio: 'ext:夜白神略/audio/character:2',
		skillAnimation: true,
		animationColor: "fire",
		juexingji: true,
		unique: true,
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			return player.hp==3 && !player.storage.sgskjdbzjms_taoyuan;
		},
		forced: true,
		//priority:3,
		content() {
			'step 0'
			player.awakenSkill(event.name);
			'step 1'
			player.chooseTarget(
				'桃园：你可以选择至多三名角色，使其回复一点体力',
				function(card,player,target){ 
					return target.hp<target.maxHp;
				},[1,3]
			).ai=function(target){ 
				return get.recoverEffect(target,player,_status.event.player); 
			};
			'step 2'
			if(result.bool){
				for(var i of result.targets){
					i.recover();
				}
			}
			'step 3'
			player.draw(Math.min(player.maxHp-player.countCards('h'),20));
			'step 4'
			player.gainMaxHp(3);
			'step 5'
			player.recover(3);
			'step 6'
			player.draw(3);
			'step 7'
			player.addSkills(['sgskjdbzjms_juguo','sgskjdbzjms_qingfu']);
		},
	},
	sgskjdbzjms_juguo:{
		audio: 'ext:夜白神略/audio/character:2',
		usable:1,
		enable:'phaseUse',
		position:'h',
		selectCard:3,
		selectTarget:-1,
		filterCard:()=>true,
		filterTarget:()=>true,
		async content(event,trigger,player) {
			await event.target.loseHp();
			await event.target.chooseToDiscard('h');
		},
		ai:{
			result:{
				player:-3,
				target:-1,
			}
		}
	},
	sgskjdbzjms_qingfu:{
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{
			player:'sgskjdbzjms_juguoAfter',
		},
		forced:true,
		filter(){return true},
		content(){
			lib.skill.sgskjdbzjms_boxing.callbackx(player,'倾覆');
		},
	},
	//真马超
	sgskjdbzjms_mashu:{
		mod: {
			globalFrom(from, to, distance) {
				return distance - 1;
			},
			globalTo(from,to,distance){
				if(from.countCards('h')<to.countCards('h'))return distance+1;
				else return distance;
			},
		},
	},
	sgskjdbzjms_shenweitianjiangjun:{
		audio: 'hengwu',
		forced:true,
		trigger:{
			source:'damageSource',
		},
		filter(event,player){
			return event.player.isAlive();
		},
		async content(event,trigger,player) {
			var result = await trigger.player.chooseToDiscard(2,'h','①弃置两张手牌，②令'+get.translation(player)+'摸两张牌；').set('ai',function(card){
				var att = get.attitude(_status.event.player,player);
				if(att>0)return false;
				if (card.name == "tao") return -10;
				if (card.name == "jiu" && _status.event.player.hp == 1) return -10;
				return get.unuseful(card) + 2.5 * (5 - get.owner(card).hp);
			}).forResult();
			if(!result.bool)await player.draw(2);
		},
	},
	//真刘备
	sgskjdbzjms_jieying:{
		audio:'nzry_jieying',
		// inherit:'nzry_jieying',
		// global:[],
		locked: true,
		ai: {
			effect: {
				target(card) {
					if (card.name == "tiesuo") return "zeroplayertarget";
				},
			},
		},
		group: ["sgskjdbzjms_jieying_1", "sgskjdbzjms_jieying_2"],
		subSkill: {
			1: {
				audio: "sgskjdbzjms_jieying",
				trigger: {
					player: ["linkBefore", "enterGame"],
					global: "phaseBefore",
				},
				forced: true,
				filter(event, player) {
					if (event.name == "link") return player.isLinked();
					return (event.name != "phase" || game.phaseNumber == 0) && !player.isLinked();
				},
				content() {
					if (trigger.name != "link") player.link(true);
					else trigger.cancel();
				},
				ai: {
					noLink: true,
				},
			},
			2: {
				audio: "sgskjdbzjms_jieying",
				trigger: {
					player: "phaseJieshuBegin",
				},
				direct: true,
				filter(event, player) {
					return game.hasPlayer(function (current) {
						return current != player && !current.isLinked();
					});
				},
				content() {
					"step 0";
					player.chooseTarget(true, "请选择【结营】的目标", function (card, player, target) {
						return target != player && !target.isLinked();
					}).ai = function (target) {
						return 1 + Math.random();
					};
					"step 1";
					if (result.bool) {
						player.line(result.targets);
						player.logSkill("sgskjdbzjms_jieying");
						result.targets[0].link(true);
					} else {
						event.finish();
					}
				},
			},
		},
	},
	sgskjdbzjms_tuogu:{
		audio: 'ext:夜白神略/audio/character:2',
		trigger:{player:'dying'},
		filter(event,player){
			return game.countPlayer(function(c){return c!=player})>0;
		},
		cost(){
			event.result = player.chooseTarget([1,2],get.prompt2('sgskjdbzjms_tuogu'))
				.set('filterTarget',function(card,player,target){
					return player!=target;
				})
				.set('ai',function(){
					return get.attitude(player,target)
				}).forResult();
		},
		async content(event,trigger,player){
			for(var i of event.targets){
				await i.chooseDrawRecover(3,true);

			}
		}
	},
	
	//----------------------------全民三国杀我开局神郭嘉
	//界戏志才
	qmsgswkjsgj_xianfu:{
		audio:'xianfu',
		trigger: {
			global: ["phaseBefore",'die'],
			player: "enterGame",
		},
		locked: true,
		filter(event, player,name) {
			event.xianfu_bool=false;
			if(name=='die')return player.storage.xianfu2&&player.storage.xianfu2.includes(event.player)&&game.hasPlayer(current => current != player&&current!=event.player);
			if(name=='phaseBefore'&&event.player==player)return game.hasPlayer(current => current != player);
			event.xianfu_bool=true;
			return game.hasPlayer(current => current != player) && (event.name != "phase" || game.phaseNumber == 0);
		},
		async cost(event, trigger, player) {
			var bool=trigger.xianfu_bool;
			const result = await player
				.chooseTarget("请"+(player.storage.xianfu2?'重新':'')+"选择【先辅】的目标", lib.translate.xianfu_info, bool, function (card, player, target) {
					return target != player /*&& (!player.storage.xianfu2 || !player.storage.xianfu2.includes(target))*/;
				})
				.set("ai", function (target) {
					let att = get.attitude(_status.event.player, target);
					if (att > 0) return att + 1;
					if (att == 0) return Math.random();
					return att;
				})
				.set("animate", false)
				.forResult();
			if(result.bool)event.result = {
				bool: true,
				cost_data: result.targets[0],
			};
		},
		logAudio: () => 2,
		async content(event, trigger, player) {
			let target = event.cost_data;
			let targetold=[];
			if(player.storage.xianfu2&&player.storage.xianfu2.length){
				targetold=player.storage.xianfu2;
			}
			if (!player.storage.xianfu2||player.storage.xianfu2.length) player.storage.xianfu2 = [];
			player.storage.xianfu2.push(target);
			player.addSkill("xianfu2");

			const func = (player, target,targetold) => {
				if(targetold?.length)for(var i of targetold){
					if(i.storage.xianfu_mark&&i.storage.xianfu_mark.includes(player)){
						i.storage.xianfu_mark.remove(player);
						if(i.storage.xianfu_mark.length==0){
							delete i.storage.xianfu_mark;
							i.unmarkSkill('xianfu_mark')
							i.removeSkill('xianfu_mark')
						}
					}
				}
				if (!target.storage.xianfu_mark) target.storage.xianfu_mark = [];
				target.storage.xianfu_mark.add(player);
				target.storage.xianfu_mark.sortBySeat();
				target.markSkill("xianfu_mark", null, null, true);
			};
			if (event.isMine()) func(player, target,targetold);
			else if (player.isOnline2()) player.send(func, player, target,targetold);
		},
		// group:['qmsgswkjsgj_xianfu_change'],
		// subSkill:{
		// 	change:{
		// 		audio:'xianfu',
		// 		logAudio: () => 2,
		// 		trigger: {
		// 			player: "phaseBefore",
		// 			global:'die',
		// 		},
		// 		filter(event,player,name){
		// 			if(name=='die')return event.player&&game.hasPlayer(current => current != player);
		// 		}
		// 	}
		// }
	},
	tiandu_xizhicai:{
		audio:2,
	},
	qmsgswkjsgj_chouce:{
		audio: 'chouce',
		trigger: { player: "damageEnd" },
		getIndex: event => event.num,
		filter(event) {
			return event.num > 0;
		},
		content() {
			'step 0'
			player.judge();
			'step 1'
			event.color = result.color;
			if (event.color == 'black') {
				var list=[];
				if(player.canMoveCard())list.push('移牌');
				if(game.countPlayer(c=>c!=player&&c.countCards('h')>0))list.push('偷牌');
				list.push('cancel2');
				player.chooseControl(list).set('prompt','你可以移动场上一张牌或获得一名其他角色的一张手牌').set('ai',function(){
					var player2=_status.event.player;
					if(player.canMoveCard()&&get.YB_movevalue(player2))return '移牌';
					if(get.YB_tuxi2value(player,1))return '偷牌';
					return 'cancel2';
				});
			}
			else {
				var next = player.chooseTarget('令一名角色摸一张牌');
				if (player.storage.xianfu2 && player.storage.xianfu2.length) {
					next.set('prompt2', '（若目标为' + get.translation(player.storage.xianfu2) + '则改为摸两张牌）');
				}
				next.set('ai', function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target) / Math.sqrt(1 + target.countCards('h'));
					if (target.hasSkillTag('nogain')) att /= 10;
					if (player.storage.xianfu2 && player.storage.xianfu2.includes(target)) return att * 2;
					return att;
				})
			}
			'step 2'
			if(event.color=='black'){
				if(result.control=='cancel2')
					event.goto(4);
				else if(result.control=='移牌'){
					player.moveCard();
					event.goto(4)
				}
				else{
					player.chooseTarget('获得一名其他角色的一张手牌', function (card, player, target) {
						return target.countCards('h');
					}).set('ai', function (target) {
						var player = _status.event.player;
						var att = get.attitude(player, target);
						if (att < 0) att = -Math.sqrt(-att);
						else att = Math.sqrt(att);
						return att * lib.card.shunshou.ai.result.target(player, target);
					});

				}

			}
			'step 3'
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, 'green');
				if (event.color == 'black') player.gainPlayerCard(target, 'h', true);
				else {
					if (player.storage.xianfu2 && player.storage.xianfu2.includes(target)) {
						if (!target.storage.xianfu_mark) target.storage.xianfu_mark = [];
						target.storage.xianfu_mark.add(player);
						target.storage.xianfu_mark.sortBySeat();
						target.markSkill('xianfu_mark');
						target.draw(2);
					}
					else target.draw();
				}
			}
			'step 4'
			player.chooseCardTarget({
				filterTarget(card, player, target) {
					return player != target;
				},
				selectCard: 1,
				position: "h",
				filterCard(){return true},
				filterTarget: (card, player, target) => {
					return player!=target;
				},
				ai1(card) {
					if (!ui.selected.cards.length && card.name == "du") return 20;
					return 10 - get.value(card);
				},
				ai2(target) {
					if (ui.selected.cards.length && ui.selected.cards[0].name == "du") {
						return target.hasSkillTag("nodu") ? 0 : -10;
					}
					if (target.hasJudge("lebu")) return 0;
					const nh = target.countCards("h");
					const np = player.countCards("h");
					if (nh >= np - 1 && np <= player.hp && !target.hasSkill("haoshi")) return 0;
					return Math.max(1, 5 - nh);
				},
				prompt: '筹策：是否将一张手牌交给任意角色？',
			})
			'step 5'
			if(result.cards){
				player.give(result.cards, result.targets[0]);
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (get.tag(card, "damage")) {
						if (player.hasSkillTag("jueqing", false, target)) return [1, -2];
						if (!target.hasFriend()) return;
						if (target.hp >= 4) return [1, get.tag(card, "damage") * 1.5];
						if (target.hp == 3) return [1, get.tag(card, "damage") * 1];
						if (target.hp == 2) return [1, get.tag(card, "damage") * 0.5];
					}
				},
			},
		},
	},
	//界刘协
	qmsgswkjsgj_tianming:{
		audio:'tianming',
		trigger: { target: "useCardToTargeted" },
		check(event, player) {
			return true;
		},
		filter(event, player) {
			return event.card.name == "sha";
		},
		content() {
			player.draw(2);
		},
		ai: {
			effect: {
				target_use(card, player, target, current) {
					if (card.name == "sha") return [1, 0.5];
				},
			},
		},
	},
	qmsgswkjsgj_mizhao:{
		audio:'mizhao',
		enable: "phaseUse",
		usable: 1,
		audio: 2,
		filter(event, player) {
			return player.countCards("h") > 0;
		},
		filterCard: true,
		selectCard: -1,
		filterTarget(card, player, target) {
			return player != target;
		},
		discard: false,
		lose: false,
		delay: false,
		ai: {
			order: 1,
			result: {
				player: 0,
				target(player, target) {
					if (target.hasSkillTag("nogain")) return 0;
					if (player.countCards("h") > 1) {
						return 1;
					}
					var players = game.filterPlayer();
					for (var i = 0; i < players.length; i++) {
						if (players[i].countCards("h") && players[i] != target && players[i] != player && get.attitude(player, players[i]) < 0) {
							break;
						}
					}
					if (i == players.length) {
						return 1;
					}
					return -2 / (target.countCards("h") + 1);
				},
			},
		},
		content() {
			"step 0";
			event.target1 = targets[0];
			player.give(cards, targets[0], false);
			"step 1";
			if (!targets[0].countCards("h")) {
				event.finish();
				return;
			}
			var players = game.filterPlayer();
			for (var i = 0; i < players.length; i++) {
				if (players[i] != event.target1 && players[i] != player && event.target1.canCompare(players[i])) {
					break;
				}
			}
			if (i == players.length) {
				event.finish();
			}
			"step 2";
			player
				.chooseTarget(true, "选择拼点目标", function (card, player, target) {
					return _status.event.target1.canCompare(target) && target != player;
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					var eff = get.effect(target, { name: "sha" }, _status.event.target1, player);
					var att = get.attitude(player, target);
					if (att > 0) {
						return eff - 10;
					}
					return eff;
				})
				.set("target1", event.target1)
				.set("forceDie", true);
			"step 3";
			if (result.targets.length) {
				event.target2 = result.targets[0];
				event.target1.line(event.target2);
				event.target1.chooseToCompare(event.target2);
			} else {
				event.finish();
			}
			"step 4";
			if (!result.tie) {
				if (result.bool) {
					event.shaSource=event.target1;
					event.shaTarget=event.target
					
				} else {
					event.shaSource=event.target2;
					event.shaTarget=event.target1;
				}
			}
			else event.finish();
			'step 5'
			if (event.shaSource.canUse({ name: "sha", isCard: true }, event.shaTarget, false)) {
				var list = [];
				list.push(['基本','','sha',null])
				// for(var i of get.YB_natureList()){

				// }
				list.push(['基本','','sha','fire'])
				list.push(['基本','','sha','thunder'])
				event.shaSource.chooseButton(['密诏：选择要对'+get.translation(event.shaTarget)+'使用的牌',[list,'vcard']],true).set('ai',function(button){
					// var player = _status.event.player;
					var eff = get.effect(event.shaTarget, { name:button.link[2],nature:button.link[3], isCard: true}, event.shaSource, player);
					return eff;
				}).set('filterButton',function(button){
					return event.shaSource.canUse({ name:button.link[2],nature:button.link[3], isCard: true}, event.shaTarget, false);
				});
			}
			'step 6'
			if(result.buttons){
				event.shaSource.useCard({ name: "sha",nature:result.buttons[0].link[3], isCard: true }, event.shaTarget);
			}

		},
	},
	//缝神赵云
	qmsgswkjsgj_juejing:{
		audio:'xinjuejing',
		mod: {
			maxHandcard(player, num) {
				return 2 + num;
			},
			aiOrder(player, card, num) {
				if (num <= 0 || !player.isPhaseUsing() || !get.tag(card, "recover")) return num;
				if (player.needsToDiscard() > 1) return num;
				return 0;
			},
		},
		trigger: { player: ["dying", "dyingAfter"] },
		forced: true,
		content() {
			player.draw();
		},
		group:'qmsgswkjsgj_juejing_draw',
		subSkill:{
			draw:{
				audio:'qmsgswkjsgj_juejing',
				trigger: { player: "phaseDrawBegin2" },
				//priority:-5,
				filter(event, player) {
					return !event.numFixed && player.hp < player.maxHp;
				},
				forced: true,
				content() {
					trigger.num += player.getDamagedHp();
				},
				
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (target.getHp() > 1) return;
					if (get.tag(card, "damage") || get.tag(card, "losehp")) return [1, 1];
				},
			},
		},
	},
	//鬼赐福
	//鬼许攸
	qmsgswkjsgj_baolian: {
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		content: function () {
			player.draw(2);
		},
	},
	qmsgswkjsgj_taiping: {
		trigger: { player: "phaseDrawBegin" },
		forced: true,
		content: function () {
			trigger.num += 2;
		},
	},
}