import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

/** @type { importCharacterConfig['skill'] } */
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
			event.result = player.discardPlayerCard(target,'he').set('chooseonly', true).forResult()
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
			if(name=='die')return player.storage.qmsgswkjsgj_xianfu2&&player.storage.qmsgswkjsgj_xianfu2.includes(event.player)&&game.hasPlayer(current => current != player&&current!=event.player);
			if(name=='phaseBefore'&&event.player==player)return game.hasPlayer(current => current != player);
			event.xianfu_bool=true;
			return game.hasPlayer(current => current != player) && (event.name != "phase" || game.phaseNumber == 0);
		},
		async cost(event, trigger, player) {
			var bool=trigger.xianfu_bool;
			const result = await player
				.chooseTarget("请"+(player.storage.qmsgswkjsgj_xianfu2?'重新':'')+"选择【先辅】的目标", lib.translate.xianfu_info, bool, function (card, player, target) {
					return target != player /*&& (!player.storage.qmsgswkjsgj_xianfu2 || !player.storage.qmsgswkjsgj_xianfu2.includes(target))*/;
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
			if(player.storage.qmsgswkjsgj_xianfu2&&player.storage.qmsgswkjsgj_xianfu2.length){
				targetold=player.storage.qmsgswkjsgj_xianfu2;
			}
			if (!player.storage.qmsgswkjsgj_xianfu2||player.storage.qmsgswkjsgj_xianfu2.length) player.storage.qmsgswkjsgj_xianfu2 = [];
			player.storage.qmsgswkjsgj_xianfu2.push(target);
			player.addSkill("qmsgswkjsgj_xianfu2");

			const func = (player, target,targetold) => {
				if(targetold?.length)for(var i of targetold){
					if(i.storage.qmsgswkjsgj_xianfu_mark&&i.storage.qmsgswkjsgj_xianfu_mark.includes(player)){
						i.storage.qmsgswkjsgj_xianfu_mark.remove(player);
						if(i.storage.qmsgswkjsgj_xianfu_mark.length==0){
							delete i.storage.qmsgswkjsgj_xianfu_mark;
							i.unmarkSkill('qmsgswkjsgj_xianfu_mark')
							i.removeSkill('qmsgswkjsgj_xianfu_mark')
						}
					}
				}
				if (!target.storage.qmsgswkjsgj_xianfu_mark) target.storage.qmsgswkjsgj_xianfu_mark = [];
				target.storage.qmsgswkjsgj_xianfu_mark.add(player);
				target.storage.qmsgswkjsgj_xianfu_mark.sortBySeat();
				target.markSkill("qmsgswkjsgj_xianfu_mark", null, null, true);
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
	
	qmsgswkjsgj_xianfu2:{
		audio: "xianfu",
		charlotte: true,
		trigger: { global: ["damageEnd", "recoverEnd"] },
		forced: true,
		sourceSkill: "qmsgswkjsgj_xianfu",
		filter(event, player) {
			if (event.player.isDead() || !player.storage.qmsgswkjsgj_xianfu2 || !player.storage.qmsgswkjsgj_xianfu2.includes(event.player) || event.num <= 0) {
				return false;
			}
			if (event.name == "damage") {
				return true;
			}
			return player.isDamaged();
		},
		logAudio(event, player) {
			if (event.name == "damage") {
				return ["xianfu5.mp3", "xianfu6.mp3"];
			}
			return ["xianfu3.mp3", "xianfu4.mp3"];
		},
		logTarget: "player",
		content() {
			"step 0";
			var target = trigger.player;
			if (!target.storage.qmsgswkjsgj_xianfu_mark) {
				target.storage.qmsgswkjsgj_xianfu_mark = [];
			}
			target.storage.qmsgswkjsgj_xianfu_mark.add(player);
			target.storage.qmsgswkjsgj_xianfu_mark.sortBySeat();
			target.markSkill("qmsgswkjsgj_xianfu_mark");
			game.delayx();
			"step 1";
			var card = trigger.card?trigger.card:null;
			var source = trigger.source ? trigger.source : "nosource";
			var nature = trigger.nature ? trigger.nature : null;
			player[trigger.name](trigger.num,card,source,nature);
		},
		onremove(player) {
			if (!player.storage.qmsgswkjsgj_xianfu2) {
				return;
			}
			game.countPlayer(function (current) {
				if (player.storage.qmsgswkjsgj_xianfu2.includes(current) && current.storage.qmsgswkjsgj_xianfu_mark) {
					current.storage.qmsgswkjsgj_xianfu_mark.remove(player);
					if (!current.storage.qmsgswkjsgj_xianfu_mark.length) {
						current.unmarkSkill("qmsgswkjsgj_xianfu_mark");
					} else {
						current.markSkill("qmsgswkjsgj_xianfu_mark");
					}
				}
			});
			delete player.storage.qmsgswkjsgj_xianfu2;
		},
		group: "qmsgswkjsgj_xianfu3",
	},
	qmsgswkjsgj_xianfu3: {
		trigger: { global: "dieBegin" },
		silent: true,
		sourceSkill: "xianfu",
		filter(event, player) {
			return event.player == player || (player.storage.qmsgswkjsgj_xianfu2 && player.storage.qmsgswkjsgj_xianfu2.includes(player));
		},
		content() {
			if (player == trigger.player) {
				lib.skill.qmsgswkjsgj_xianfu2.onremove(player);
			} else {
				player.storage.qmsgswkjsgj_xianfu2.remove(event.player);
			}
		},
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
				if (player.storage.qmsgswkjsgj_xianfu2 && player.storage.qmsgswkjsgj_xianfu2.length) {
					next.set('prompt2', '（若目标为' + get.translation(player.storage.qmsgswkjsgj_xianfu2) + '则改为摸两张牌）');
				}
				next.set('ai', function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target) / Math.sqrt(1 + target.countCards('h'));
					if (target.hasSkillTag('nogain')) att /= 10;
					if (player.storage.qmsgswkjsgj_xianfu2 && player.storage.qmsgswkjsgj_xianfu2.includes(target)) return att * 2;
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
					if (player.storage.qmsgswkjsgj_xianfu2 && player.storage.qmsgswkjsgj_xianfu2.includes(target)) {
						if (!target.storage.qmsgswkjsgj_xianfu_mark) target.storage.qmsgswkjsgj_xianfu_mark = [];
						target.storage.qmsgswkjsgj_xianfu_mark.add(player);
						target.storage.qmsgswkjsgj_xianfu_mark.sortBySeat();
						target.markSkill('qmsgswkjsgj_xianfu_mark');
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


	//缝神郭嘉
	qmsgswkjsgj_reshuishi: {
		audio: "shuishi",
		enable: "phaseUse",
		usable: 1,
		frequent: true,
		filter(event, player) {
			return player.maxHp < 10;
		},
		content() {
			"step 0";
			event.cards = [];
			event.suits = [];
			"step 1";
			player
				.judge(function (result) {
					var evt = _status.event.getParent("qmsgswkjsgj_reshuishi");
					if (evt && evt.suits && evt.suits.includes(get.suit(result))&&get.position(result, true) == "o") return 0;
					return 1;
				})
				.set("callback", lib.skill.qmsgswkjsgj_reshuishi.callback).judge2 = function (result) {
				return result.bool ? true : false;
			};
			"step 2";
			var cards = cards.filterInD();
			if (cards.length)
				player
					.chooseTarget("将" + get.translation(cards) + "交给一名角色", true)
					.set("ai", function (target) {
						var player = _status.event.player,
							att = get.attitude(player, target);
						if (att <= 0) return att;
						if (target.countCards("h") + _status.event.num >= _status.event.max) att /= 3;
						if (target.hasSkillTag("nogain")) att /= 10;
						return att;
					})
					.set("num", cards.length)
					.set(
						"max",
						game.filterPlayer().reduce((num, i) => {
							return Math.max(num, i.countCards("h"));
						}, 0)
					);
			else event.finish();
			"step 3";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.line(target, "green");
				target.gain(cards, "gain2").giver = player;
			} else event.finish();
			"step 4";
			if (target.isMaxHandcard()) player.loseMaxHp();
		},
		callback() {
			"step 0";
			var evt = event.getParent(2);
			event.getParent().orderingCards.remove(event.judgeResult.card);
			evt.cards.push(event.judgeResult.card);
			if (event.getParent().result.bool && player.maxHp < 10) {
				evt.suits.push(event.getParent().result.suit);
				player.gainMaxHp();
				player.chooseBool("是否继续发动【慧识】？").set("frequentSkill", "qmsgswkjsgj_reshuishi");
			} else event._result = { bool: false };
			"step 1";
			if (result.bool) event.getParent(2).redo();
		},
		ai: {
			order: 9,
			result: {
				player: 1,
			},
		},
	},
	//界杜预
	qmsgswkjsgj_spwuku: {
		audio: 'spwuku',
		trigger: { global: "useCard" },
		forced: true,
		preHidden: true,
		filter(event, player) {
			if (get.type(event.card) != "equip") return false;
			return true;
		},
		content() {
			'step 0'
			player.addMark("spwuku", 1);
			// trigger.trigger("spwukuAfter");
			'step 1'
			trigger.trigger("spwukuAfter");
		},
		contentAfter(){
			trigger.trigger("spwukuAfter");
		},
		marktext: "库",
		intro: {
			content: "mark",
		},
		ai: {
			combo: "spmiewu",
			threaten: 3.6,
		},
	},
	qmsgswkjsgj_spsanchen: {
		audio: 'spsanchen',
		trigger: { player: ["spwukuAfter"] },
		forced: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: "gray",
		filter(event, player) {
			return player.countMark("spwuku") > 2;
		},
		content() {
			player.awakenSkill(event.name);
			player.gainMaxHp();
			player.recover();
			player.addSkills("spmiewu");
		},
		ai: {
			combo: "spwuku",
		},
		derivation: "spmiewu",
	},
	//缝神诸葛亮
	qmsgswkjsgj_kuangfeng:{
		audio: 'kuangfeng',
		trigger: { player: "phaseJieshuBegin" },
		filter(event, player) {
			return player.getExpansions("qixing").length;
		},
		async cost(event, trigger, player) {
			const {
				result: {
					bool,
					targets,
					links: cost_data,
				}
			} = await player
				.chooseButtonTarget({
					createDialog: [get.prompt2(event.skill), player.getExpansions("qixing")],
					selectButton: 1,
					filterTarget: true,
					ai1(button) {
						if (game.hasPlayer(target => {
							return get.attitude(get.player(), target) < 0;
						})) {
							return 1;
						}
						return 0;
					},
					ai2(target) {
						return -get.attitude(get.player(), target);
					},
				});
			event.result = {
				bool: bool,
				targets: targets?.sortBySeat(),
				cost_data: cost_data,
			}		
		},
		async content(event, trigger, player) {
			const { targets, cost_data: cards } = event;
			targets.forEach(target => {
				target.addAdditionalSkill(`qmsgswkjsgj_kuangfeng_${player.playerid}`, "qmsgswkjsgj_kuangfeng2");
				target.markAuto("qmsgswkjsgj_kuangfeng2", [player]);
			});
			player.addTempSkill("qmsgswkjsgj_kuangfeng3", { player: "phaseJieshuBefore" });
			player.addTempSkill("qmsgswkjsgj_kuangfeng4", { player: "phaseJieshuBefore" });
			await player.loseToDiscardpile(cards);
		},
		ai: {
			combo: "qixing",
		},

	},
	qmsgswkjsgj_kuangfeng2: {
		charlotte: true,
		intro: {
			content(storage) {
				return `共有${storage.length}枚标记`;
			},
		},
		ai: {
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, "fireDamage") && current < 0) {
						return 1.5;
					}
				},
			},
		},
	},
	qmsgswkjsgj_kuangfeng3: {
		trigger: { global: "damageBegin3" },
		sourceSkill: "qmsgswkjsgj_kuangfeng",
		filter(event, player) {
			return event.hasNature("fire") && event.player.getStorage("qmsgswkjsgj_kuangfeng2").includes(player);
		},
		charlotte: true,
		forced: true,
		logTarget: "player",
		content() {
			trigger.num++;
		},
		onremove(player) {
			game.countPlayer2(current => {
				if (current.getStorage("qmsgswkjsgj_kuangfeng2").includes(player)) {
					current.unmarkAuto("qmsgswkjsgj_kuangfeng2", player);
					current.removeAdditionalSkill(`qmsgswkjsgj_kuangfeng_${player.playerid}`);
				}
			}, true);
		},
	},
	qmsgswkjsgj_kuangfeng4: {
		trigger: { global: "damageBegin3" },
		sourceSkill: "qmsgswkjsgj_kuangfeng",
		filter(event, player) {
			return !event.hasNature() && event.player.getStorage("qmsgswkjsgj_kuangfeng2").includes(player);
		},
		charlotte: true,
		forced: true,
		logTarget: "player",
		content() {
			game.YB_addNature(trigger, "fire");
		},
		firstDo:true,
		onremove(player) {
			game.countPlayer2(current => {
				if (current.getStorage("qmsgswkjsgj_kuangfeng2").includes(player)) {
					current.unmarkAuto("qmsgswkjsgj_kuangfeng2", player);
					current.removeAdditionalSkill(`qmsgswkjsgj_kuangfeng_${player.playerid}`);
				}
			}, true);
		},
	},
	qmsgswkjsgj_dawu: {
		trigger: { player: "phaseJieshuBegin" },
		filter(event, player) {
			return player.getExpansions("qixing").length;
		},
		audio: 'dawu',
		async cost(event, trigger, player) {
			const {
				result: { bool, targets, links: cost_data },
			} = await player
				.chooseButtonTarget({
					createDialog: [get.prompt2(event.skill), player.getExpansions("qixing")],
					selectButton: [1, game.countPlayer()],
					filterTarget: true,
					selectTarget() {
						return ui.selected.buttons.length;
					},
					complexSelect: true,
					ai1(button) {
						const { player, allUse } = get.event();
						const targets = game.filterPlayer(target => {
							if (target.isMin() || target.hasSkill("biantian2") || target.hasSkill("qmsgswkjsgj_dawu2")) {
								return false;
							}
							let att = get.attitude(player, target);
							if (att >= 4) {
								if (target.hp > 2 && (target.isHealthy() || target.hasSkillTag("maixie"))) {
									return false;
								}
								if (allUse || target.hp == 1) {
									return true;
								}
								if (target.hp == 2 && target.countCards("he") <= 2) {
									return true;
								}
							}
							return false;
						});
						if (ui.selected.buttons.length < targets.length) {
							return 1;
						}
						return 0;
					},
					ai2(target) {
						const { player, allUse } = get.event();
						if (target.isMin() || target.hasSkill("biantian2") || target.hasSkill("qmsgswkjsgj_dawu2")) {
							return 0;
						}
						let att = get.attitude(player, target);
						if (att >= 4) {
							if (target.hp > 2 && (target.isHealthy() || target.hasSkillTag("maixie"))) {
								return 0;
							}
							if (allUse || target.hp == 1) {
								return att;
							}
							if (target.hp == 2 && target.countCards("he") <= 2) {
								return att * 0.7;
							}
							return 0;
						}
						return -1;
					},
				})
				.set("allUse", player.getExpansions("qixing").length >= game.countPlayer(current => get.attitude(player, current) > 4) * 2);
			event.result = {
				bool: bool,
				targets: targets?.sortBySeat(),
				cost_data: cost_data,
			};
		},
		async content(event, trigger, player) {
			const { targets, cost_data: cards } = event;
			targets.forEach(target => {
				target.addAdditionalSkill(`qmsgswkjsgj_dawu_${player.playerid}`, "qmsgswkjsgj_dawu2");
				target.markAuto("qmsgswkjsgj_dawu2", [player]);
			});
			player.addTempSkill("qmsgswkjsgj_dawu3", { player: "phaseJieshuBefore" });
			await player.loseToDiscardpile(cards);
		},
		ai: {
			combo: "qixing",
		},
	},
	qmsgswkjsgj_dawu2: {
		charlotte: true,
		ai: {
			nofire: true,
			nodamage: true,
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, "damage") && !get.tag(card, "thunderDamage")) {
						return "zeroplayertarget";
					}
				},
			},
		},
		intro: {
			content(storage) {
				return `共有${storage.length}枚标记`;
			},
		},
	},
	qmsgswkjsgj_dawu3: {
		trigger: { global: "damageBegin4" },
		sourceSkill: "qmsgswkjsgj_dawu",
		filter(event, player) {
			return !event.hasNature("thunder") && event.player.getStorage("qmsgswkjsgj_dawu2").includes(player);
		},
		forced: true,
		charlotte: true,
		logTarget: "player",
		content() {
			trigger.cancel();
		},
		onremove(player) {
			game.countPlayer2(current => {
				if (current.getStorage("qmsgswkjsgj_dawu2").includes(player)) {
					current.unmarkAuto("qmsgswkjsgj_dawu2", [player]);
					current.removeAdditionalSkill(`qmsgswkjsgj_dawu_${player.playerid}`);
				}
			}, true);
		},
	},
	qmsgswkjsgj_guanxing:{
		audio: "guanxing",
		trigger: { player: ["phaseZhunbeiBegin"] },
		frequent: true,
		filter(event, player, name) {
			return true;
		},
		content() {
			var num = 7;
			"step 0";
			var cards = get.cards(num);
			event.cards = cards;
			game.cardsGotoOrdering(event.cards);
			player.chooseCardButton(event.cards,1,true);
			'step 1'
			if(result.links){
				event.cards.remove(result.links[0]);
				player.addToExpansion(result.links, "draw").gaintag.add("qixing");
			}
			'step 2'
			var cards = event.cards;
			var next = player.chooseToMove();
			next.set("list", [["牌堆顶", cards], ["牌堆底"]]);
			next.set("prompt", event.prompt || "点击或拖动将牌移动到牌堆顶或牌堆底");
			// next.set('filterOk', function (moved) {
			// 	return moved[2].length == 1
			// 	//设置OK按钮触发条件 总数组的第0项数组数量为0
			// });
			next.processAI =
				event.processAI ||
				function (list) {
					let cards = list[0][1],
						player = _status.event.player,
						target = _status.currentPhase || player,
						name = _status.event.getTrigger()?.name,
						countWuxie = current => {
							let num = current.getKnownCards(player, card => {
								return get.name(card, current) === "wuxie";
							});
							if (num && current !== player) {
								return num;
							}
							let skills = current.getSkills("invisible").concat(lib.skill.global);
							game.expandSkills(skills);
							for (let i = 0; i < skills.length; i++) {
								let ifo = get.info(skills[i]);
								if (!ifo) {
									continue;
								}
								if (ifo.viewAs && typeof ifo.viewAs != "function" && ifo.viewAs.name == "wuxie") {
									if (!ifo.viewAsFilter || ifo.viewAsFilter(current)) {
										num++;
										break;
									}
								} else {
									let hiddenCard = ifo.hiddenCard;
									if (typeof hiddenCard == "function" && hiddenCard(current, "wuxie")) {
										num++;
										break;
									}
								}
							}
							return num;
						},
						top = [];
					switch (name) {
						case "phaseJieshu":
							target = target.next;
						// [falls through]
						case "phaseZhunbei": {
							let att = get.sgn(get.attitude(player, target)),
								judges = target.getCards("j"),
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
			"step 3";
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
			player.popup(get.cnNumber(top.length) + "上" + get.cnNumber(bottom.length) + "下");
			game.log(player, "将" + get.cnNumber(top.length) + "张牌置于牌堆顶");
			game.updateRoundNumber();
			game.delayx();
		},
		subSkill: {
			on: { charlotte: true },
		},
		ai: {
			guanxing: true,
		},
	},
	//旧谋黄忠
	qmsgswkjsgj_sbliegong:{
		audio: 'sbliegong',
		mod: {
			aiOrder(player, card, num) {
				if (num > 0 && (card.name === "sha" || get.tag(card, "draw"))) {
					return num + 6;
				}
			},
			targetInRange(card, player, target) {
				if (card.name == "sha" && typeof get.number(card) == "number") {
					if (get.distance(player, target) <= get.number(card)) {
						return true;
					}
				}
			},
			// cardnature(card, player) {
			// 	if (!player.getVEquip(1) && get.name(card, player) == "sha") return false;
			// },
			
			// attackRangeBase(player) {
			// 	if(player.getVEquip(1))return Infinity;
			// },
		},
		trigger: { player: "useCardToPlayered" },
		filter(event, player) {
			return !event.getParent()._qmsgswkjsgj_sbliegong_player && event.targets.length == 1 &&(event.card.name == "sha" ||(get.type(event.card)=='trick'&&get.tag(event.card,'damage'))) && player.getStorage("qmsgswkjsgj_sbliegong").length > 0;
		},
		prompt2(event, player) {
			let str = "",
				storage = player.getStorage("qmsgswkjsgj_sbliegong");
			if (storage.length > 1) {
				str += "亮出牌堆顶的" + get.cnNumber(storage.length - 1) + "张牌并增加伤害；且";
			}
			str += "令" + get.translation(event.target) + "不能使用花色为";
			for (let i = 0; i < storage.length; i++) {
				str += get.translation(storage[i]);
			}
			str += "的牌响应" + get.translation(event.card);
			return str;
		},
		logTarget: "target",
		locked: false,
		check(event, player) {
			const target = event.target;
			if (get.attitude(player, target) > 0) return false;
			if (
				target.hasSkillTag("filterDamage", null, {
					player: player,
					card: event.card,
				})
			)
				return false;
			const storage = player.getStorage("qmsgswkjsgj_sbliegong");
			if (storage.length >= 4) return true;
			if (storage.length < 3) return false;
			if (target.hasShan()) return storage.includes("heart") && storage.includes("diamond");
			return true;
		},
		async content(event, trigger, player) {
			const storage = player.getStorage("qmsgswkjsgj_sbliegong").slice(0);
			const num = storage.length - 1;
			const evt = trigger.getParent();
			if (num > 0) {
				if (typeof evt.baseDamage != "number") evt.baseDamage = 1;
				const cards = get.cards(num);
				await game.cardsGotoOrdering(cards);
				await player.showCards(cards.slice(0), get.translation(player) + "发动了【烈弓】");
				while (cards.length > 0) {
					const card = cards.pop();
					if (storage.includes(get.suit(card, false))) evt.baseDamage++;
					//ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
				}
				//game.updateRoundNumber();
			}
			evt._qmsgswkjsgj_sbliegong_player = player;
			player.addTempSkill("qmsgswkjsgj_sbliegong_clear");
			const target = trigger.target;
			target.addTempSkill("qmsgswkjsgj_sbliegong_block");
			if (!target.storage.qmsgswkjsgj_sbliegong_block) target.storage.qmsgswkjsgj_sbliegong_block = [];
			target.storage.qmsgswkjsgj_sbliegong_block.push([evt.card, storage]);
			lib.skill.qmsgswkjsgj_sbliegong.updateBlocker(target);
		},
		updateBlocker(player) {
			const list = [],
				storage = player.storage.qmsgswkjsgj_sbliegong_block;
			if (storage?.length) {
				for (const i of storage) list.addArray(i[1]);
			}
			player.storage.qmsgswkjsgj_sbliegong_blocker = list;
		},
		ai: {
			threaten: 3.5,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (arg?.card?.name == "sha") {
					const storage = player.getStorage("qmsgswkjsgj_sbliegong");
					if (storage.length < 3 || !storage.includes("heart") || !storage.includes("diamond")) return false;
					const target = arg.target;
					if (target.hasSkill("bagua_skill") || target.hasSkill("bazhen") || target.hasSkill("rw_bagua_skill")) return false;
					return true;
				}
				return false;
			},
		},
		intro: {
			content: "已记录花色：$",
			onunmark: true,
		},
		group: ["qmsgswkjsgj_sbliegong_count",],
		subSkill: {
			clear: {
				trigger: { player: "useCardAfter" },
				forced: true,
				charlotte: true,
				popup: false,
				filter(event, player) {
					return event._qmsgswkjsgj_sbliegong_player == player;
				},
				content() {
					player.unmarkSkill("qmsgswkjsgj_sbliegong");
					player.removeTip("qmsgswkjsgj_sbliegong");
				},
			},
			block: {
				mod: {
					cardEnabled(card, player) {
						if (!player.storage.qmsgswkjsgj_sbliegong_blocker) return;
						const suit = get.suit(card);
						if (suit == "none") return;
						let evt = _status.event;
						if (evt.name != "chooseToUse") evt = evt.getParent("chooseToUse");
						if (!evt || !evt.respondTo || evt.respondTo[1].name != "sha") return;
						if (player.storage.qmsgswkjsgj_sbliegong_blocker.includes(suit)) return false;
					},
				},
				trigger: {
					player: ["damageBefore", "damageCancelled", "damageZero"],
					target: ["shaMiss", "useCardToExcluded", "useCardToEnd"],
					global: ["useCardEnd"],
				},
				forced: true,
				firstDo: true,
				charlotte: true,
				popup: false,
				onremove(player) {
					delete player.storage.qmsgswkjsgj_sbliegong_block;
					delete player.storage.qmsgswkjsgj_sbliegong_blocker;
				},
				filter(event, player) {
					const evt = event.getParent("useCard", true, true);
					if (evt && evt.effectedCount < evt.effectCount) return false;
					if (!event.card || !player.storage.qmsgswkjsgj_sbliegong_block) return false;
					return player.storage.qmsgswkjsgj_sbliegong_block.some(i => i[0] == event.card);
				},
				content() {
					const storage = player.storage.qmsgswkjsgj_sbliegong_block;
					for (let i = 0; i < storage.length; i++) {
						if (storage[i][0] == trigger.card) {
							storage.splice(i--, 1);
						}
					}
					if (!storage.length) player.removeSkill(event.name);
					else lib.skill.qmsgswkjsgj_sbliegong.updateBlocker(player);
				},
			},
			count: {
				trigger: {
					player: "useCard",
					target: "useCardToTargeted",
				},
				forced: true,
				locked: false,
				popup: false,
				filter(event, player, name) {
					if (name != "useCard" && player == event.player) return false;
					const suit = get.suit(event.card);
					if (!lib.suit.includes(suit)) return false;
					if (player.storage.qmsgswkjsgj_sbliegong?.includes(suit)) return false;
					return true;
				},
				content() {
					player.markAuto("qmsgswkjsgj_sbliegong", [get.suit(trigger.card)]);
					player.storage.qmsgswkjsgj_sbliegong.sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a));
					player.addTip("qmsgswkjsgj_sbliegong", get.translation("qmsgswkjsgj_sbliegong") + player.getStorage("qmsgswkjsgj_sbliegong").reduce((str, suit) => str + get.translation(suit), ""));
				},
			},
			wuxing:{
				trigger: { player: "useCard1" },
				filter(event, player) {
					return player.getVEquip(1)&&event.card.name == "sha" && lib.linked.some(n => n != "kami" );
				},
				audio: true,
				direct: true,
				content() {
					"step 0";
					var list = lib.linked.slice(0);
					list.remove("kami");
					list.removeArray(get.natureList(trigger.card));
					list.push("cancel2");
					player
						.chooseControl(list)
						.set("prompt", get.prompt("qmsgswkjsgj_sbliegong"))
						.set("prompt2", "将" + get.translation(trigger.card) + "转换为以下属性之一");
					"step 1";
					if (result.control != "cancel2") {
						player.logSkill("qmsgswkjsgj_sbliegong");
						player.popup(get.translation(result.control) + "杀", result.control);
						game.log(trigger.card, "被转为了", "#y" + get.translation(result.control), "属性");
						game.setNature(trigger.card, result.control);
					}
				},
			},
		},

	},

	//界杨彪
	qmsgswkjsgj_zhaohan:{
		audio:'zhaohan',
		trigger: { player: "phaseZhunbeiBegin" },
		// forced: true,
		locked: true,
		// filter(event, player) {
		// 	return player.phaseNumber < 8;
		// },
		// check(event, player) {
		// 	return player.phaseNumber < 3;
		// },
		cost(){
			'step 0'
			player.addMark('qmsgswkjsgj_zhaohan',1,false);
			'step 1'
			if(player.countMark('qmsgswkjsgj_zhaohan')<8){
				event.result = {bool:true}
			}
		},
		content() {
			if (player.countMark('qmsgswkjsgj_zhaohan')< 5) {
				player.gainMaxHp();
				player.recover();
			} else {
				player.damage();
			}
		},
		onremove:true,
	},
	qmsgswkjsgj_rangjie:{
		audio: 'rangjie',
		trigger: { player: "damageEnd" },
		getIndex(event) {
			return event.num;
		},
		async cost(event, trigger, player) {
			let choiceList = ["获得一张指定类型的牌"];
			if (player.canMoveCard()) {
				choiceList.push("移动场上的一张牌");
			}
			const result = await player
				.chooseControl("cancel2")
				.set("choiceList", choiceList)
				.set("prompt", get.prompt(event.skill))
				.set("ai", function () {
					var player = _status.event.player;
					if (player.canMoveCard(true)) {
						return 1;
					}
					return 0;
				})
				.forResult();
			event.result = {
				bool: result.control != "cancel2",
				cost_data: result.index,
			};
		},
		async content(event, trigger, player) {
			if (event.cost_data) {
				player.moveCard(true);
			} else {
				const result = await player
					.chooseControl("basic", "trick", "equip")
					.set("prompt", "选择获得一种类型的牌")
					.set("ai", function () {
						var player = _status.event.player;
						if (player.hp <= 3 && !player.countCards("h", { name: ["shan", "tao"] })) {
							return "basic";
						}
						if (player.countCards("he", { type: "equip" }) < 2) {
							return "equip";
						}
						return "trick";
					})
					.forResult();
				const card = get.cardPile(function (card) {
					return get.type(card, "trick") == result.control;
				});
				if (card) {
					await player.gain(card, "gain2", "log");
				}
			}
			{
				var choosedraw = await player.chooseTarget("选择一名角色，令其摸一张牌。",true, function (card, player, target) {
					return get.attitude(_status.event.player, target)
				}).forResult();
				if(choosedraw.bool){
					await choosedraw.targets[0].draw();
				}
			}
			// await player.draw();
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (get.tag(card, "damage")) {
						if (player.hasSkillTag("jueqing", false, target)) {
							return [1, -2];
						}
						if (!target.hasFriend()) {
							return;
						}
						var num = 1;
						if (get.attitude(player, target) > 0) {
							if (player.needsToDiscard()) {
								num = 0.7;
							} else {
								num = 0.5;
							}
						}
						if (target.hp >= 4) {
							return [1, num * 2];
						}
						if (target.hp == 3) {
							return [1, num * 1.5];
						}
						if (target.hp == 2) {
							return [1, num * 0.5];
						}
					}
				},
			},
		},
	},
	qmsgswkjsgj_yizheng: {
		audio: 'yizheng',
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return game.hasPlayer(current => get.info("qmsgswkjsgj_yizheng").filterTarget(null, player, current));
		},
		filterTarget(card, player, current) {
			return player.canCompare(current);
		},
		async content(event, trigger, player) {
			const { target } = event;
			const { result } = await player.chooseToCompare(target);
			if (result?.bool) {
				target.skip("phaseDraw");
				target.addTempSkill(event.name + "_mark", { player: "phaseDrawSkipped" });
			} else {
				await player.damage(target);
			}
		},
		ai: {
			order: 1,
			result: {
				player: (player, target) => {
					let hs = player.getCards("h").sort(function (a, b) {
						return get.number(b) - get.number(a);
					});
					if (!hs.length) {
						return 0;
					}
					if(player.hp <= 2){
						return 0;
					}
					let a = get.number(hs[0]),
						b = 4;
					if (player.getDamagedHp()) {
						b = 2;
					}
					return -b * (1 - Math.pow((a - 1) / 13, target.countCards("h")));
				},
				target: (player, target) => {
					if (target.skipList.includes("phaseDraw") || target.hasSkill("pingkou") || target.hasSkill("xinpingkou")) {
						return 0;
					}
					let hs = player.getCards("h").sort(function (a, b) {
						return get.number(b) - get.number(a);
					});
					if (!hs.length) {
						return 0;
					}
					return -Math.pow((get.number(hs[0]) - 1) / 13, target.countCards("h")) * 2;
				},
			},
		},
		subSkill: {
			mark: {
				charlotte: true,
				mark: true,
				intro: { content: "跳过下回合的摸牌阶段" },
			},
		},
	},
	//界骆统
	qmsgswkjsgj_qinzheng:{
		audio: 'qinzheng',
		trigger: { player: ["useCard", "respond"] },
		forced: true,
		filter(event, player) {
			var num = player.getAllHistory("useCard").length + player.getAllHistory("respond").length;
			return num % 2 == 0 || num % 5 == 0 || num % 8 == 0;
		},
		//258团
		content() {
			var num = player.getAllHistory("useCard").length + player.getAllHistory("respond").length;
			var cards = [];
			if (num % 2 == 0) {
				var card = get.cardPile(function (card) {
					return ["sha","shan","tao", "jiu", "zong", "xionghuangjiu"].includes(card.name);
				});
				if (card) {
					cards.push(card);
				}
			}
			if (num % 5 == 0) {
				var card = get.cardPile(function (card) {
					return ["juedou",'huohe'].includes(card.name);
				});
				if (card) {
					cards.push(card);
				}
			}
			if (num % 8 == 0) {
				var card = get.cardPile(function (card) {
					return ["shunshou", "wuzhong", "zengbin", "sadouchengbing", "dongzhuxianji", "tongzhougongji"].includes(card.name);
				});
				if (card) {
					cards.push(card);
				}
			}
			if (cards.length) {
				player.gain(cards, "gain2");
			}
		},
		group: "qmsgswkjsgj_qinzheng_count",
		intro: {
			content(num) {
				var str = "<li>总次数：";
				str += num;
				str += "<br><li>杀/闪/桃/酒：";
				str += num % 2;
				str += "/2<br><li>决斗/过河拆桥：";
				str += num % 5;
				str += "/5<br><li>顺手牵羊/无中生有：";
				str += num % 8;
				str += "/8";
				return str;
			},
		},

	},
	qmsgswkjsgj_qinzheng_count: {
		trigger: { player: ["useCard1", "respond"] },
		silent: true,
		firstDo: true,
		noHidden: true,
		sourceSkill: "qmsgswkjsgj_qinzheng",
		content() {
			player.storage.qmsgswkjsgj_qinzheng = player.getAllHistory("useCard").length + player.getAllHistory("respond").length;
			player.markSkill("qmsgswkjsgj_qinzheng");
		},
	},
	//界刘焉
	qmsgswkjsgj_tushe:{
		audio:'xinfu_tushe',
		mod: {
			aiOrder(player, card, num) {
				if (get.tag(card, "multitarget")) {
					if (player.countCards("h", { type: "basic" })) {
						return num / 10;
					}
					return num * 10;
				}
				if (get.type(card) === "basic") {
					return num + 10;
				}
			},
			aiValue(player, card, num) {
				if (card.name === "zhangba") {
					return 114514;
				}
				if (["shan", "tao", "jiu"].includes(card.name)) {
					if (player.getEquip("zhangba") && player.countCards("hs") > 1) {
						return 0.01;
					}
					return num / 2;
				}
				if (get.tag(card, "multitarget")) {
					return num + game.players.length;
				}
			},
			aiUseful(player, card, num) {
				if (card.name === "zhangba") {
					return 114514;
				}
				if (get.name(card, player) === "shan") {
					if (
						player.countCards("hs", i => {
							if (card === i || (card.cards && card.cards.includes(i))) {
								return false;
							}
							return get.name(i, player) === "shan";
						})
					) {
						return -1;
					}
					return num / Math.pow(Math.max(1, player.hp), 2);
				}
			},
		},
		trigger: {
			player: "useCardToPlayered",
		},
		locked: false,
		frequent: true,
		filter(event, player) {
			// if (get.type(event.card) == "equip") {
			// 	return false;
			// }
			if (event.getParent().triggeredTargets3.length > 1) {
				return false;
			}
			return event.targets.length > 0 && !player.countCards("h", { type: "basic" });
		},
		content() {
			player.draw(trigger.targets.length);
		},
		ai: {
			presha: true,
			pretao: true,
			threaten: 1.8,
			effect: {
				player_use(card, player, target) {
					if (
						typeof card === "object" &&
						card.name !== "shan" &&
						get.type(card) !== "equip" &&
						!player.countCards("h", i => {
							if (card === i || (card.cards && card.cards.includes(i))) {
								return false;
							}
							return get.type(i) === "basic";
						})
					) {
						let targets = [],
							evt = _status.event.getParent("useCard");
						targets.addArray(ui.selected.targets);
						if (evt && evt.card == card) {
							targets.addArray(evt.targets);
						}
						if (targets.length) {
							return [1, targets.length];
						}
						if (get.tag(card, "multitarget")) {
							return [1, game.players.length - 1];
						}
						return [1, 1];
					}
				},
			},
		},
	},
	qmsgswkjsgj_limu:{
		mod: {
			targetInRange(card, player, target) {
				if (player.countCards("j") && player.inRange(target)) {
					return true;
				}
			},
			cardUsableTarget(card, player, target) {
				if (player.countCards("j") && player.inRange(target)) {
					return true;
				}
			},
			aiOrder(player, card, num) {
				if (get.type(card, null, player) == "trick" && player.canUse(card, player) && player.canAddJudge(card)) {
					return 15;
				}
			},
		},
		locked: false,
		audio: 'xinfu_limu',
		enable: "phaseUse",
		discard: false,
		filter(event, player) {
			if (player.hasJudge("lebu")) {
				return false;
			}
			return player.countCards("hes", { color: "red" }) > 0;
		},
		viewAs: { name: "lebu" },
		//prepare:"throw",
		position: "hes",
		filterCard(card, player, event) {
			return get.color(card) == "red" && player.canAddJudge({ name: "lebu", cards: [card] });
		},
		selectTarget: -1,
		filterTarget(card, player, target) {
			return player == target;
		},
		check(card) {
			var player = _status.event.player;
			if (!player.getEquip("zhangba")) {
				let damaged = player.maxHp - player.hp - 1;
				if (
					player.countCards("h", function (cardx) {
						if (cardx == card) {
							return false;
						}
						if (cardx.name == "tao") {
							if (damaged < 1) {
								return true;
							}
							damaged--;
						}
						return ["shan", "jiu"].includes(cardx.name);
					}) > 0
				) {
					return 0;
				}
			}
			if (card.name == "shan") {
				return 15;
			}
			if (card.name == "tao" || card.name == "jiu") {
				return 10;
			}
			return 9 - get.value(card);
		},
		onuse(links, player) {
			var next = game.createEvent("limu_recover", false, _status.event.getParent());
			next.player = player;
			next.setContent(function () {
				player.recover();
			});
		},
		ai: {
			result: {
				target(player, target) {
					if (player.countCards("hes", "zhangba")) {
						return player.countCards("h", { type: "basic" });
					}
					let res = lib.card.lebu.ai.result.target(player, target);
					if (player.countCards("hs", "sha") >= player.hp) {
						res++;
					}
					if (target.isDamaged()) {
						return res + 2 * Math.abs(get.recoverEffect(target, player, target));
					}
					return res;
				},
				ignoreStatus: true,
			},
			order(item, player) {
				if (player.hp > 1 && player.countCards("j")) {
					return 0;
				}
				return 12;
			},
			effect: {
				target(card, player, target) {
					if (target.isPhaseUsing() && typeof card === "object" && get.type(card, null, target) === "delay" && !target.countCards("j")) {
						let shas =
							target.getCards("hs", i => {
								if (card === i || (card.cards && card.cards.includes(i))) {
									return false;
								}
								return get.name(i, target) === "sha" && target.getUseValue(i) > 0;
							}) - target.getCardUsable("sha");
						if (shas > 0) {
							return [1, 1.5 * shas];
						}
					}
				},
			},
		},
		group:['qmsgswkjsgj_limu_sha'],
		subSkill:{
			sha:{
				name:'立牧杀',
				audio:'qmsgswkjsgj_limu',
				enable: "phaseUse",
				viewAs: {
					name: "sha",
				},
				filterCard(card,player) {
					if (ui.selected.cards.length) {
						return get.suit(card) === get.suit(ui.selected.cards[0]);
					}
					return !player.storage.qmsgswkjsgj_limu_ban||!player.storage.qmsgswkjsgj_limu_ban.includes(get.suit(card));
				},
				prompt() {
					return get.translation('qmsgswkjsgj_limu_sha');
				},
				selectCard() {
					if (ui.selected.cards.length) {
						return -1;
					}
					return 1;
				},
				precontent(){
					var suit=event.result.cards[0].suit;
					if(!player.hasSkill('qmsgswkjsgj_limu_ban')){
						player.addTempSkill('qmsgswkjsgj_limu_ban','phaseUseAfter');
					}
					if(!player.storage.qmsgswkjsgj_limu_ban){
						player.storage.qmsgswkjsgj_limu_ban=[];
					}
					player.storage.qmsgswkjsgj_limu_ban.push(suit);
				},
				ai: {
					respondSha: true,
					skillTagFilter(player, tag, arg) {
						return arg !== "respond" && player.countCards("hs");
					},
				},
			},
			ban:{
				onremove:true,
				mark:true,
				marktext:'牧',
				intro:{
					name:'立牧',
					content:'本回合已使用$转化成杀。'
				}
			}
		}
	},
	qmsgswkjsgj_pianan:{
		audio: 'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:'damageBegin3',
		},
		filter(event, player) {
			return player.countCards("j")>0;
		},
		content(){
			player.discardPlayerCard(player, "j", true);
			trigger.cancel();
		},
	},
	//界鲁肃
	qmsgswkjsgj_haoshi:{
		audio: 'haoshi',
		trigger: { player: "phaseDrawBegin2" },
		filter(event, player) {
			return !event.numFixed;
		},
		check(event, player) {
			// return (
			// 	player.countCards("h") + 2 + event.num <= 5 ||
			// 	game.hasPlayer(function (target) {
			// 		return (
			// 			player !== target &&
			// 			!game.hasPlayer(function (current) {
			// 				return current !== player && current !== target && current.countCards("h") < target.countCards("h");
			// 			}) &&
			// 			get.attitude(player, target) > 0
			// 		);
			// 	})
			// );
			return true;
		},
		content() {
			trigger.num += 2;
			player.addTempSkill("qmsgswkjsgj_haoshi_give", "phaseDrawAfter");
		},
		subSkill: {
			give: {
				trigger: { player: "phaseDrawEnd" },
				forced: true,
				charlotte: true,
				popup: false,
				filter(event, player) {
					return player.countCards("h") > 5;
				},
				content() {
					"step 0";
					var targets = game.filterPlayer(function (target) {
							return (
								target != player 
							);
						}),
						num = Math.floor(player.countCards("h") / 2);
					player.chooseCardTarget({
						position: "h",
						filterCard: true,
						filterTarget(card, player, target) {
							return _status.event.targets.includes(target);
						},
						targets: targets,
						selectTarget: targets.length == 1 ? -1 : 1,
						selectCard: num,
						prompt: "将" + get.cnNumber(num) + "张手牌交给一名手牌数最少的其他角色",
						// forced: true,
						ai1(card) {
							var goon = false,
								player = _status.event.player;
							for (var i of _status.event.targets) {
								if (get.attitude(i, player) > 0 && get.attitude(player, i) > 0) {
									goon = true;
								}
								break;
							}
							if (goon) {
								if (
									!player.hasValueTarget(card) ||
									(card.name == "sha" &&
										player.countCards("h", function (cardx) {
											return cardx.name == "sha" && !ui.selected.cards.includes(cardx);
										}) > player.getCardUsable("sha"))
								) {
									return 2;
								}
								return Math.max(2, get.value(card) / 4);
							}
							return 1 / Math.max(1, get.value(card));
						},
						ai2(target) {
							return get.attitude(_status.event.player, target);
						},
					});
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						player.line(target, "green");
						player.give(result.cards, target);
						player.markAuto("qmsgswkjsgj_haoshi_help", [target]);
						player.addTempSkill("qmsgswkjsgj_haoshi_help", { player: "phaseBeginStart" });
					}
				},
			},
			help: {
				trigger: { target: "useCardToTargeted" },
				direct: true,
				charlotte: true,
				onremove: true,
				filter(event, player) {
					if (!player.storage.qmsgswkjsgj_haoshi_help || !player.storage.qmsgswkjsgj_haoshi_help.length) {
						return false;
					}
					if (event.card.name != "sha" && get.type(event.card) != "trick") {
						return false;
					}
					for (var i of player.storage.qmsgswkjsgj_haoshi_help) {
						if (i.countCards("h") > 0) {
							return true;
						}
					}
					return false;
				},
				content() {
					"step 0";
					if (!event.targets) {
						event.targets = player.storage.qmsgswkjsgj_haoshi_help.slice(0).sortBySeat();
					}
					event.target = event.targets.shift();
					event.target
						.chooseCard("h", "好施：是否将一张手牌交给" + get.translation(player) + "？")
						.set("ai", function (card) {
							var player = _status.event.player,
								target = _status.event.getTrigger().player;
							if (!_status.event.goon) {
								if (get.value(card, player) < 0 || get.value(card, target) < 0) {
									return 1;
								}
								return 0;
							}
							var cardx = _status.event.getTrigger().card;
							if (card.name == "shan" && get.tag(cardx, "respondShan") && target.countCards("h", "shan") < player.countCards("h", "shan")) {
								return 2;
							}
							if (card.name == "sha" && (cardx.name == "juedou" || (get.tag(card, "respondSha") && target.countCards("h", "sha") < player.countCards("h", "sha")))) {
								return 2;
							}
							if (get.value(card, target) > get.value(card, player) || target.getUseValue(card) > player.getUseValue(card)) {
								return 1;
							}
							if (player.hasSkillTag("noh")) {
								return 0.5 / Math.max(1, get.value(card, player));
							}
							return 0;
						})
						.set("goon", get.attitude(event.target, player) > 0);
					"step 1";
					if (result.bool) {
						target.logSkill("qmsgswkjsgj_haoshi_help", player);
						target.give(result.cards, player);
					}
					if (targets.length) {
						event.goto(0);
					}
				},
			},
		},

	},
	//界曹叡
	qmsgswkjsgj_mingjian:{
		audio: 'mingjian',
		trigger: { player: "phaseUseBegin" },
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt(event.skill), "跳过出牌阶段并将所有手牌交给一名其他角色，你结束此回合，然后其于此回合后获得一个额外的出牌阶段，本出牌阶段其可以多使用一张【杀】。若如此做，直到该角色下个回合结束，其手牌上限+1。", lib.filter.notMe)
				.set("ai", target => {
					var player = _status.event.player,
						att = get.attitude(player, target);
					if (target.hasSkillTag("nogain")) {
						return 0.01 * att;
					}
					if (player.countCards("h") == player.countCards("h", "du")) {
						return -att;
					}
					if (target.hasJudge("lebu")) {
						att *= 1.25;
					}
					if (get.attitude(player, target) > 3) {
						var basis = get.threaten(target) * att;
						if (
							player == get.zhu(player) &&
							player.hp <= 2 &&
							player.countCards("h", "shan") &&
							!game.hasPlayer(function (current) {
								return get.attitude(current, player) > 3 && current.countCards("h", "tao") > 0;
							})
						) {
							return 0;
						}
						if (target.countCards("h") + player.countCards("h") > target.hp + 2) {
							return basis * 0.8;
						}
						return basis;
					}
					return 0;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			await player.give(player.getCards("h"), target);
			trigger.cancel();
			const evt = trigger.getParent("phase", true);
			if (evt) {
				game.log(player, "结束了回合");
				evt.num = evt.phaseList.length;
				evt.goto(11);
			}
			// const next = target.insertPhase();
			// next._noTurnOver = true;
			// next.phaseList = ["phaseUse"];
			target.addTempSkill("qmsgswkjsgj_mingjian_sha", { player: ['phaseUseAfter'] });
			if (!target.storage.qmsgswkjsgj_mingjian_sha) {
				target.storage.qmsgswkjsgj_mingjian_sha = [];
			}
			target.storage.qmsgswkjsgj_mingjian_sha.push(player);
			target.markSkill("qmsgswkjsgj_mingjian_sha");
			target.addTempSkill("qmsgswkjsgj_mingjian_max", { player: ["phaseAfter"] });
			if (!target.storage.qmsgswkjsgj_mingjian_max) {
				target.storage.qmsgswkjsgj_mingjian_max = [];
			}
			target.storage.qmsgswkjsgj_mingjian_max.push(player);
			target.markSkill("qmsgswkjsgj_mingjian_max");
			var next = game.createEvent('qmsgswkjsgj_mingjian');
			next.player = target;
			next.setContent(lib.skill.qmsgswkjsgj_mingjian.phase);
			
		},
		phase() {
			"step 0";
			player.phaseUse();
			"step 1";
			game.broadcastAll(function () {
				if (ui.tempnowuxie) {
					ui.tempnowuxie.close();
					delete ui.tempnowuxie;
				}
			});
		},
		subSkill:{
			sha: {
				charlotte: true,
				onremove: true,
				mark: true,
				marktext: "鉴",
				intro: {
					markcount(){return '杀'},
					content: (storage, player) => {
						const num = storage.length;
						return `<li>被${get.translaiotn(storage.toUniqued())}鉴识<li>出杀次数+${num}`;
					},
				},
				mod: {
					cardUsable(card, player, num) {
						if (card.name == "sha") {
							return num + player.getStorage("qmsgswkjsgj_mingjian_sha").length;
						}
					},
				},

			},
			max:{
				charlotte: true,
				onremove: true,
				mark: true,
				marktext: "鉴",
				intro: {
					markcount(){return '限'},
					content: (storage, player) => {
						const num = storage.length;
						return `<li>被${get.translaiotn(storage.toUniqued())}鉴识<li>手牌上限+${num}`;
					},
				},
				mod: {
					maxHandcard(player, num) {
						return num + player.getStorage("qmsgswkjsgj_mingjian_max").length;
					},
				},

			}
		}

	},
	//界蔡文姬
	qmsgswkjsgj_beige:{
		audio: "beige",
		audioname: ["re_caiwenji"],
		trigger: { global: "damageEnd" },
		filter(event, player) {
			return event.card && event.card.name == "sha" && event.source && event.player.classList.contains("dead") == false && player.countCards("he");
		},
		// direct: true,
		checkx(event, player) {
			var att1 = get.attitude(player, event.player);
			var att2 = get.attitude(player, event.source);
			return [att1,att2];
		},
		cost(){
			var next = player.chooseToDiscard("he", get.prompt2("qmsgswkjsgj_beige", trigger.player));
			var check = lib.skill.qmsgswkjsgj_beige.checkx(trigger, player);
			next.set("ai", function (card) {
				var num = Math.max(8-get.value(card),1);
				if (_status.event.goon) {
					var list = _status.event.goon;
					if(get.suit(card) == "spade"){
						num*=-list[1];
						if(trigger.source && trigger.source.isTurnedOver()){
							num*=-1;
						}
					}
					if(get.suit(card) == "heart"){
						num*=list[0];
						num*=trigger.num;
					}
					if(get.suit(card) == "club"){
						num*=-list[1];
						if(trigger.source && trigger.source.countCards("he")==0){
							num*=0;
						}
					}
					if(get.suit(card) == "diamond"){
						num*=list[0];
					}
					return num;
				}
				return 0;
			});
			// next.set("logSkill", "qmsgswkjsgj_beige");
			next.set("goon", check);
			next.set('chooseonly',true);
			event.result = next.forResult();
		},
		content() {
			'step 0'
			player.discard(event.cards);
			//get.suit(event.card)
			'step 1'
			if(event.cards[0].suit){
				switch (event.cards[0].suit) {
					case "heart":
						trigger.player.recover(trigger.num);
						break;
					case "diamond":
						trigger.player.draw(3);
						break;
					case "club":
						trigger.source.chooseToDiscard("he", 3, true);
						break;
					case "spade":
						trigger.source.turnOver();
						break;
				}

			}
		},
		ai: {
			expose: 0.3,
		},
	},
	//界张绣
	qmsgswkjsgj_xiongluan:{
		audio: "drlt_xiongluan",
		mod: {
			aiOrder(player, card, num) {
				if (num <= 0 || !player.isPhaseUsing() || player.needsToDiscard() || !get.tag(card, "damage")) {
					return;
				}
				return 0;
			},
			aiUseful(player, card, num) {
				if (num <= 0 || !get.tag(card, "damage")) {
					return;
				}
				return num * player.getHp();
			},
		},
		locked: false,
		enable: "phaseUse",
		skillAnimation: true,
		animationColor: "gray",
		limited: true,
		filter(event, player) {
			return !player.isDisabledJudge() || player.hasEnabledSlot();
		},
		filterTarget(card, player, target) {
			return target != player;
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			const disables = [];
			for (let i = 1; i <= 5; i++) {
				for (let j = 0; j < player.countEnabledSlot(i); j++) {
					disables.push(i);
				}
			}
			if (disables.length > 0) {
				await player.disableEquip(disables);
				await player.draw(disables.length);
			}
			await player.disableJudge();
			const { target } = event;
			player.addTempSkill(event.name + "_effect");
			player.markAuto(event.name + "_effect", [target]);
			target.addTempSkill(event.name + "_ban");
		},
		ai: {
			order: 13,
			result: {
				target: (player, target) => {
					let hs = player.countCards("h", card => {
							if (!get.tag(card, "damage") || get.effect(target, card, player, player) <= 0) {
								return 0;
							}
							if (get.name(card, player) === "sha") {
								if (target.getEquip("bagua")) {
									return 0.5;
								}
								if (target.getEquip("rewrite_bagua")) {
									return 0.25;
								}
							}
							return 1;
						}),
						ts =
							target.hp +
							target.hujia +
							game.countPlayer(current => {
								if (get.attitude(current, target) > 0) {
									return current.countCards("hs") / 8;
								}
								return 0;
							});
					if (hs >= ts) {
						return -hs;
					}
					return 0;
				},
			},
		},
		subSkill: {
			effect: {
				charlotte: true,
				onremove: true,
				mod: {
					targetInRange(card, player, target) {
						if (player.getStorage("qmsgswkjsgj_xiongluan_effect").includes(target)) {
							return true;
						}
					},
					cardUsableTarget(card, player, target) {
						if (player.getStorage("qmsgswkjsgj_xiongluan_effect").includes(target)) {
							return true;
						}
					},
				},
				intro: { content: "本回合对$使用牌无距离和次数限制且其不能使用和打出手牌" },
			},
			ban: {
				charlotte: true,
				mark: true,
				mod: {
					cardEnabled2(card, player) {
						if (get.position(card) == "h") {
							return false;
						}
					},
				},
				intro: { content: "本回合不能使用或打出手牌" },
				ai: {
					effect: {
						target(card, player, target) {
							if (!target._qmsgswkjsgj_xiongluan2_effect && get.tag(card, "damage")) {
								target._qmsgswkjsgj_xiongluan2_effect = true;
								const eff = get.effect(target, card, player, target);
								delete target._qmsgswkjsgj_xiongluan2_effect;
								if (eff > 0) {
									return [1, -999999];
								}
								if (eff < 0) {
									return 114514;
								}
							}
						},
					},
				},
			},
		},
	},
	//界伏皇后
	qmsgswkjsgj_zhuikong:{
		audio:'zhuikong',
		trigger: { global: "phaseBegin" },
		check(event, player) {
			if (get.attitude(player, event.player) < -2) {
				var cards = player.getCards("h");
				if (cards.length > player.hp) {
					return true;
				}
				for (var i = 0; i < cards.length; i++) {
					var useful = get.useful(cards[i]);
					if (useful < 5) {
						return true;
					}
					if (get.number(cards[i]) > 9 && useful < 7) {
						return true;
					}
				}
			}
			return false;
		},
		logTarget: "player",
		filter(event, player) {
			return player.hp < player.maxHp && player.canCompare(event.player);
		},
		content() {
			"step 0";
			player.chooseToCompare(trigger.player);
			"step 1";
			if (result.bool) {
				trigger.player.skip("phaseUse");
			} else {
				player.gain(result.target, "gain2", "log")
				trigger.player.useCard({name:'sha'},player,false);
			}
		},
	},
	//缝神甘宁
	qmsgswkjsgj_poxi:{
		audio:'drlt_poxi',
		enable: "phaseUse",
		usable: 1,
		filterTarget(card, player, target) {
			return target != player && target.countCards("h") > 0;
			//return target!=player;
		},
		content() {
			"step 0";
			event.list1 = [];
			event.list2 = [];
			if (player.countCards("h") > 0) {
				var chooseButton = player.chooseButton(4, ["你的手牌", player.getCards("h"), get.translation(target.name) + "的手牌", target.getCards("h")]);
			} else {
				var chooseButton = player.chooseButton(4, [get.translation(target.name) + "的手牌", target.getCards("h")]);
			}
			chooseButton.set("target", target);
			chooseButton.set("ai", function (button) {
				var player = _status.event.player;
				var target = _status.event.target;
				var ps = [];
				var ts = [];
				for (var i = 0; i < ui.selected.buttons.length; i++) {
					var card = ui.selected.buttons[i].link;
					if (target.getCards("h").includes(card)) {
						ts.push(card);
					} else {
						ps.push(card);
					}
				}
				var card = button.link;
				var owner = get.owner(card);
				var val = get.value(card) || 1;
				if (owner == target) {
					if (ts.length > 1) {
						return 0;
					}
					if (ts.length == 0 || player.hp > 3) {
						return val;
					}
					return 2 * val;
				}
				return 7 - val;
			});
			chooseButton.set("filterButton", button => lib.filter.canBeDiscarded(button.link, get.player(), get.owner(button.link)))
			"step 1";
			if (result.bool) {
				var list = result.links;
				for (var i = 0; i < list.length; i++) {
					if (get.owner(list[i]) == player) {
						event.list1.push(list[i]);
					} else {
						event.list2.push(list[i]);
					}
				}
				if (event.list1.length && event.list2.length) {
					game.loseAsync({
						lose_list: [
							[player, event.list1],
							[target, event.list2],
						],
						discarder: player,
					}).setContent("discardMultiple");
				} else if (event.list2.length) {
					target.discard(event.list2);
				} else {
					player.discard(event.list1);
				}
			}
			"step 2";
			if (event.list1.length + event.list2.length == 4) {
				if (event.list1.length == 0) {
					player.loseMaxHp();
				}
				if (event.list1.length == 1) {
					// var evt = _status.event;
					// for (var i = 0; i < 10; i++) {
					// 	if (evt && evt.getParent) {
					// 		evt = evt.getParent();
					// 	}
					// 	if (evt.name == "phaseUse") {
					// 		evt.skipped = true;
					// 		break;
					// 	}
					// }
					player.addTempSkill("qmsgswkjsgj_poxi1", { player: "phaseAfter" });
				}
				if (event.list1.length == 3) {
					player.recover();
				}
				if (event.list1.length == 4) {
					player.draw(5);
				}
			}
		},
		ai: {
			order: 13,
			result: {
				target(target, player) {
					return -1;
				},
			},
		},
	},
	qmsgswkjsgj_poxi1: {
		mod: {
			maxHandcard(player, num) {
				return num - 1;
			},
		},
	},
	qmsgswkjsgj_jieying:{
		audio:'drlt_jieying',
		trigger: { global: "phaseDrawBegin2" },
		filter(event, player) {
			return !event.numFixed && event.player.hasMark("qmsgswkjsgj_jieying_mark");
		},
		forced: true,
		locked: false,
		logTarget: "player",
		content() {
			trigger.num++;
		},
		global: "qmsgswkjsgj_jieying_mark",
		group: ["qmsgswkjsgj_jieying_1", "qmsgswkjsgj_jieying_2", "qmsgswkjsgj_jieying_3"],
		subSkill: {
			1: {
				audio: "qmsgswkjsgj_jieying",
				trigger: { player: "phaseBegin" },
				filter(event, player) {
					return !game.hasPlayer(current => current.hasMark("qmsgswkjsgj_jieying_mark"));
				},
				forced: true,
				content() {
					player.addMark("qmsgswkjsgj_jieying_mark", 1);
				},
			},
			2: {
				audio: "qmsgswkjsgj_jieying",
				trigger: { player: "phaseJieshuBegin" },
				filter(event, player) {
					return (
						player.hasMark("qmsgswkjsgj_jieying_mark") &&
						game.hasPlayer(target => {
							return target != player && !target.hasMark("qmsgswkjsgj_jieying_mark");
						})
					);
				},
				direct: true,
				content() {
					"step 0";
					player.chooseTarget(get.prompt("qmsgswkjsgj_jieying"), "将“营”交给一名角色；其摸牌阶段多摸一张牌，出牌阶段使用【杀】的次数上限+1且手牌上限+1。该角色回合结束后，其移去“营”标记，然后你获得其所有手牌。", function (card, player, target) {
						return target != player && !target.hasMark("qmsgswkjsgj_jieying_mark");
					}).ai = function (target) {
						let th = target.countCards("h"),
							att = get.attitude(_status.event.player, target);
						for (let i in target.skills) {
							let info = get.info(i);
							if (!info || info.shaRelated === false) {
								continue;
							}
							if (info.shaRelated || get.skillInfoTranslation(i, target).includes("【杀】")) {
								return Math.abs(att);
							}
						}
						if (att > 0) {
							if (th > 3 && target.hp > 2) {
								return 0.6 * th;
							}
						}
						if (att < 1) {
							if (target.countCards("j", { name: "lebu" })) {
								return 1 + Math.min((1.5 + th) * 0.8, target.getHandcardLimit() * 0.7);
							}
							if (!th || target.getEquip("zhangba") || target.getEquip("guanshi")) {
								return 0;
							}
							if (!target.inRange(player) || player.countCards("hs", { name: "shan" }) > 1) {
								return Math.min((1 + th) * 0.3, target.getHandcardLimit() * 0.2);
							}
						}
						return 0;
					};
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						player.line(target);
						player.logSkill("qmsgswkjsgj_jieying", target);
						var mark = player.countMark("qmsgswkjsgj_jieying_mark");
						player.removeMark("qmsgswkjsgj_jieying_mark", mark);
						target.addMark("qmsgswkjsgj_jieying_mark", mark);
					}
				},
				ai: {
					effect: {
						player(card, player, target) {
							if (get.name(card) === "lebu" && get.attitude(player, target) < 0) {
								return 1 + Math.min((target.countCards("h") + 1.5) * 0.8, target.getHandcardLimit() * 0.7);
							}
						},
					},
				},
			},
			3: {
				audio: "qmsgswkjsgj_jieying",
				trigger: { global: "phaseEnd" },
				filter(event, player) {
					return player != event.player && event.player.hasMark("qmsgswkjsgj_jieying_mark") && event.player.isIn();
				},
				forced: true,
				logTarget: "player",
				content() {
					if (trigger.player.countCards("he") > 0) {
						trigger.player.give(trigger.player.getCards("he"), player);
					}
					trigger.player.clearMark("qmsgswkjsgj_jieying_mark");
				},
			},
			mark: {
				marktext: "营",
				intro: {
					name2: "营",
					content: "mark",
				},
				mod: {
					cardUsable(card, player, num) {
						if (player.hasMark("qmsgswkjsgj_jieying_mark") && card.name == "sha") {
							return (
								num +
								game.countPlayer(function (current) {
									return current.hasSkill("qmsgswkjsgj_jieying");
								})
							);
						}
					},
					maxHandcard(player, num) {
						if (player.hasMark("qmsgswkjsgj_jieying_mark")) {
							return (
								num +
								game.countPlayer(function (current) {
									return current.hasSkill("qmsgswkjsgj_jieying");
								})
							);
						}
					},
					aiOrder(player, card, num) {
						if (
							player.hasMark("qmsgswkjsgj_jieying_mark") &&
							game.hasPlayer(current => {
								return current.hasSkill("qmsgswkjsgj_jieying") && get.attitude(player, current) <= 0;
							})
						) {
							return Math.max(num, 0) + 1;
						}
					},
				},
				ai: {
					nokeep: true,
					skillTagFilter(player) {
						return (
							player.hasMark("qmsgswkjsgj_jieying_mark") &&
							game.hasPlayer(current => {
								return current.hasSkill("qmsgswkjsgj_jieying") && get.attitude(player, current) <= 0;
							})
						);
					},
				},
			},
		},
	},
	//界孙寒华
	qmsgswkjsgj_chongxu:{
		audio: 'chongxu',
		enable: "phaseUse",
		usable: 1,
		
		async content(event, trigger, player) {
			let relu = await player.chooseToPlayBeatmap(lib.skill.yb016_shenzou.beatmaps.randomGet()).forResult();
			var score=Math.floor(Math.min(5,relu.accuracy/17));
			game.log(player,'的演奏评级为','#y'+relu.rank[0],'，获得积分点数','#y'+score,'分');
			if(score&&score>0){
				const func = () => {
					const event = get.event();
					const controls = [
						link => {
							const evt = get.event();
							if (evt.dialog && evt.dialog.buttons) {
								for (let i = 0; i < evt.dialog.buttons.length; i++) {
									const button = evt.dialog.buttons[i];
									button.classList.remove('selectable');
									button.classList.remove('selected');
									const counterNode = button.querySelector('.caption');
									if (counterNode) counterNode.childNodes[0].innerHTML = ``;
								}
								ui.selected.buttons.length = 0;
								game.check();
							}
							return;
						},
					];
					event.controls = [ui.create.control(controls.concat(['清除选择', 'stayleft']))];
				};
				if (event.isMine()) func();
				else if (event.isOnline()) event.player.send(func);
				const { result } = await player.chooseButton([
					'###' + get.translation(event.name) + '###<div class="text center">可用'+score+'分，请选择你要执行的项目</div>',
					[
						[
							['qmsgswkjsgj_miaojian', '使用2积分升级【' + get.translation('qmsgswkjsgj_miaojian') + '】'],
							['qmsgswkjsgj_lianhua', '使用2积分升级【' + get.translation('qmsgswkjsgj_lianhua') + '】'],
							['draw', '使用1积分摸一张牌'],
						],
						'textbutton',
					],
				], [1, Infinity]).set('filterButton', button => {
					const player = get.player(), choice = ui.selected.buttons.map(i => i.link);
					if (button.link !== 'draw' && (!player.hasSkill(button.link, null, null, false) || choice.filter(i => i === button.link).length + player.countMark(button.link) > 1)) return false;
					return [...choice, button.link].reduce((sum, i) => sum + (i === 'draw' ? 1 : 2), 0) <= score;
				}).set('custom', {
					add: {
						confirm(bool) {
							if (bool !== true) return;
							const event = get.event().parent;
							if (Array.isArray(event.controls)) event.controls.forEach(i => i.close());
							if (ui.confirm) ui.confirm.close();
							game.uncheck();
						},
						button() {
							if (ui.selected.buttons.length) return;
							const event = get.event();
							if (event.dialog && event.dialog.buttons) {
								for (let i = 0; i < event.dialog.buttons.length; i++) {
									const button = event.dialog.buttons[i];
									const counterNode = button.querySelector('.caption');
									if (counterNode) counterNode.childNodes[0].innerHTML = ``;
								}
							}
							if (!ui.selected.buttons.length) event.parent?.controls?.[0]?.classList.add('disabled');
						},
					},
					replace: {
						button(button) {
							const event = get.event();
							if (!event.isMine() || !event.filterButton(button) || button.classList.contains('selectable') == false) return;
							button.classList.add('selected');
							ui.selected.buttons.push(button);
							let counterNode = button.querySelector('.caption');
							const count = ui.selected.buttons.filter(i => i == button).length;
							counterNode ? (((counterNode) => {
								counterNode = counterNode.childNodes[0];
								counterNode.innerHTML = `×${count}`;
							})(counterNode)) : counterNode = ui.create.caption(`<span style="font-family:xinwei; text-shadow:#FFF 0 0 4px, #FFF 0 0 4px, rgba(74,29,1,1) 0 0 3px;">×${count}</span>`, button);
							event.parent?.controls?.[0]?.classList.add('disabled');
							game.check();
						},
					},
				});
				if (result?.bool && result.links?.length) {
					const qmsgswkjsgj_miaojian = result.links.filter(i => i === 'qmsgswkjsgj_miaojian').length;
					if (qmsgswkjsgj_miaojian > 0) {
						player.addMark('qmsgswkjsgj_miaojian', qmsgswkjsgj_miaojian, false);
						player.popup('qmsgswkjsgj_miaojian');
						game.log(player, '升级了技能', '#g【' + get.translation('qmsgswkjsgj_miaojian') + '】');
					}
					const qmsgswkjsgj_lianhua = result.links.filter(i => i === 'qmsgswkjsgj_lianhua').length;
					if (qmsgswkjsgj_lianhua > 0) {
						player.addMark('qmsgswkjsgj_lianhua', qmsgswkjsgj_lianhua, false);
						player.popup('qmsgswkjsgj_lianhua');
						game.log(player, '升级了技能', '#g【' + get.translation('qmsgswkjsgj_lianhua') + '】');
					}
					const draw = result.links.filter(i => i === 'draw').length;
					if (draw > 0) await player.draw(draw);
				}

			}
		},
		ai: {
			order: 10,
			result: {
				player: 1,
			},
		},
		derivation: "yb016_shenzou_faq",
	},
	qmsgswkjsgj_miaojian:{
		audio: 'miaojian',
		enable: "phaseUse",
		usable: 1,
		mod:{
			// cardUsable:function(card,player){
			// 	if (_status.event.skill == "qmsgswkjsgj_miaojian") {
			// 		return Infinity;
			// 	}
			// 	// if(card.name=='sha'&&card.storage&&card.storage.qmsgswkjsgj_miaojian) return Infinity;
			// },
			targetInRange(card,player,target) {
				var level = player.countMark("qmsgswkjsgj_miaojian");
				if(level==2){
					if (_status.event.skill == "qmsgswkjsgj_miaojian") {
						return true;
					}
				}
			},
		},
		viewAs:function(card,player){
			var next = {name:'sha',nature: "stab",storage:{qmsgswkjsgj_miaojian:true,}}
			var level = player.countMark("qmsgswkjsgj_miaojian");
			if(level!=0) next.isCard=true;
			return next;
		},
		filterCard:function(card,player){
			var level = player.countMark("qmsgswkjsgj_miaojian");
			if(level==0)return get.type2(card) == "basic";
			return false;
		},
		selectCard:()=>{
			var player= get.player();
			var level = player.countMark("qmsgswkjsgj_miaojian");
			if(level==0)return 1;
			return -1;
		},
		precontent() {
			event.getParent().addCount = false;
		},
		check(card) {
			if (card) {
				return 6.5 - get.value(card);
			}
			return 1;
		},
		position: "hes",
		derivation: ["qmsgswkjsgj_miaojian1", "qmsgswkjsgj_miaojian2"],
		subSkill: { backup: { audio: "qmsgswkjsgj_miaojian" } },
		ai: {
			order: 7,
			result: { player: 1 },
		},
	},
	qmsgswkjsgj_lianhua:{
		audio: 'shhlianhua',
		derivation: ["qmsgswkjsgj_lianhua1", "qmsgswkjsgj_lianhua2"],
		trigger: { target: "useCardToTargeted" },
		forced: true,
		locked: false,
		filter: event => event.card.name == "sha",
		content() {
			"step 0";
			player.draw();
			var level = player.countMark("qmsgswkjsgj_lianhua");
			event.level = level;
			if(level==0){
				event.goto(3);
			}
			"step 1";
			var eff = get.effect(player, trigger.card, trigger.player, trigger.player);
			trigger.player
				.chooseToDiscard("he", "弃置一张牌，或令" + get.translation(trigger.card) + "对" + get.translation(player) + "无效")
				.set("ai", function (card) {
					if (_status.event.eff > 0) {
						return 10 - get.value(card);
					}
					return 0;
				})
				.set("eff", eff);
			"step 2";
			if (result.bool == false) {
				trigger.getParent().excluded.add(player);
				event.finish();
			}
			"step 3";
			player
				.judge(function (result) {
					if(event.level==2)return get.color(result) == "black" ? 1 : -1;
					return get.suit(result) == "spade" ? 1 : -1;
				})
				.set("judge2", result => result.bool);
			'step 4';
			if (result.bool) {
				trigger.excluded.add(player);
			}
		},
		ai: {
			effect: {
				target_use(card, player, target, current) {
					if (card.name == "sha" && current < 0) {
						return 0.7;
					}
				},
			},
		},
	},
	//神司马懿
	qmsgswkjsgj_jilin: {
		audio: 'jilin',
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		filter(event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		forced: true,
		locked: false,
		logAudio: () => 1,
		async content(event, trigger, player) {
			const cards = get.cards(3);
			const next = player.addToExpansion(cards, "draw");
			next.gaintag.add('qmsgswkjsgj_jilin');
			await next;
		},
		marktext: "志",
		intro: {
			markcount: "expansion",
			mark(dialog, content, player) {
				const cards = player.getExpansions("jilin"),
					mingzhi = cards.filter(card => card.storage.jilin),
					hidden = cards.removeArray(mingzhi);
				if (mingzhi.length) {
					dialog.addText("已明之志");
					dialog.addSmall(mingzhi);
				}
				if (hidden.length) {
					if (player == game.me || player.isUnderControl()) {
						dialog.addText("未明之志");
						dialog.addSmall(hidden);
					} else {
						return "共有" + get.cnNumber(hidden.length) + "张暗“志”";
					}
				}
			},
			content(content, player) {
				const cards = player.getExpansions("jilin"),
					mingzhi = cards.filter(card => card.storage.jilin),
					hidden = cards.removeArray(mingzhi);
				if (mingzhi.length) {
					dialog.addText("已明之志");
					dialog.addSmall(mingzhi);
				}
				if (hidden.length) {
					if (player == game.me || player.isUnderControl()) {
						dialog.addText("未明之志");
						dialog.addSmall(hidden);
					} else {
						return "共有" + get.cnNumber(hidden.length) + "张暗“志”";
					}
				}
			},
		},
		group: ["jilin_kanpo", "jilin_change"],
		subSkill: {
			// kanpo: {
			// 	audio: ["jilin2.mp3", "jilin3.mp3"],
			// 	trigger: {
			// 		target: "useCardToTarget",
			// 	},
			// 	filter(event, player) {
			// 		return event.player != player && player.getExpansions("jilin").some(card => !card.storage.jilin);
			// 	},
			// 	async cost(event, trigger, player) {
			// 		const hidden = player.getExpansions("jilin").filter(card => !card.storage.jilin);
			// 		const goon = get.effect(player, trigger.card, trigger.player, player) < 0;
			// 		const suits = player
			// 			.getExpansions("jilin")
			// 			.filter(card => card.storage.jilin)
			// 			.map(card => get.suit(card))
			// 			.toUniqued();
			// 		if (hidden.length == 1) {
			// 			const bool = await player
			// 				.chooseBool("戢鳞：明置一张“志”", `令${get.translation(trigger.card)}对你无效`)
			// 				.set("choice", goon)
			// 				.forResultBool();
			// 			event.result = {
			// 				bool: bool,
			// 				cost_data: hidden,
			// 			};
			// 		} else {
			// 			const {
			// 				result: { bool, links },
			// 			} = await player
			// 				.chooseButton(["戢鳞：明置一张“志”", hidden])
			// 				.set("ai", button => {
			// 					const player = get.player(),
			// 						card = button.link,
			// 						suits = get.event("suits");
			// 					if (!get.event("goon")) {
			// 						return 0;
			// 					}
			// 					if (!suits.includes(get.suit(card))) {
			// 						return 10;
			// 					}
			// 					return 6 - get.value(card);
			// 				})
			// 				.set("suits", suits)
			// 				.set("goon", goon);
			// 			event.result = {
			// 				bool: bool,
			// 				cost_data: links,
			// 			};
			// 		}
			// 	},
			// 	async content(event, trigger, player) {
			// 		await player.showCards(event.cost_data, get.translation(player) + "发动了【戢鳞】");
			// 		event.cost_data[0].storage.jilin = true;
			// 		trigger.getParent().excluded.add(player);
			// 	},
			// },
			// change: {
			// 	audio: ["jilin4.mp3", "jilin5.mp3"],
			// 	trigger: {
			// 		player: "phaseBegin",
			// 	},
			// 	filter(event, player) {
			// 		return player.countCards("h") && player.getExpansions("jilin").some(card => !card.storage.jilin);
			// 	},
			// 	async cost(event, trigger, player) {
			// 		const hidden = player.getExpansions("jilin").filter(card => !card.storage.jilin);
			// 		const next = player.chooseToMove("戢鳞：是否交换“志”和手牌？");
			// 		next.set("list", [
			// 			[get.translation(player) + "（你）的未明之“志”", hidden],
			// 			["手牌区", player.getCards("h")],
			// 		]);
			// 		next.set("filterMove", (from, to) => {
			// 			return typeof to != "number";
			// 		});
			// 		next.set("processAI", list => {
			// 			let player = get.player(),
			// 				cards = list[0][1].concat(list[1][1]).sort(function (a, b) {
			// 					return get.useful(a) - get.useful(b);
			// 				}),
			// 				cards2 = cards.splice(0, player.getExpansions("jilin").length);
			// 			return [cards2, cards];
			// 		});
			// 		const {
			// 			result: { bool, moved },
			// 		} = await next;
			// 		event.result = {
			// 			bool: bool,
			// 			cost_data: moved,
			// 		};
			// 	},
			// 	async content(event, trigger, player) {
			// 		const moved = event.cost_data;
			// 		const pushs = moved[0],
			// 			gains = moved[1];
			// 		pushs.removeArray(player.getExpansions("jilin"));
			// 		gains.removeArray(player.getCards("h"));
			// 		if (!pushs.length || pushs.length != gains.length) {
			// 			return;
			// 		}
			// 		const next = player.addToExpansion(pushs);
			// 		next.gaintag.add("jilin");
			// 		await next;
			// 		await player.gain(gains, "draw");
			// 	},
			// },
		},
	},
	//界缝神赵云
	qmsgswkjsgj_rejuejing:{
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
			player.draw(2);
		},
		group:'qmsgswkjsgj_rejuejing_draw',
		subSkill:{
			draw:{
				audio:'qmsgswkjsgj_rejuejing',
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





















































































































































	//阴间界徐盛
	sgsxjxfzmnl_pojun:{
		audio: 'repojun',
		trigger: { player: "useCardToPlayered" },
		// direct: true,
		filter(event, player) {
			return (event.card.name == "sha" ||(get.type(event.card)=='trick'&&get.tag(event.card,'damage')&&event.targets.length==1));
		},
		preHidden: true,
		content() {
			"step 0";
			trigger.getParent().baseDamage++;
			if(trigger.target.hp>0&&trigger.target.countCards('he')>0){
				var next = player.choosePlayerCard(trigger.target, "he", [1, Math.min(trigger.target.hp, trigger.target.countCards("he"))], get.prompt("sgsxjxfzmnl_pojun", trigger.target));
				next.set("ai", function (button) {
					if (!_status.event.goon) return 0;
					var val = get.value(button.link);
					if (button.link == _status.event.target.getEquip(2)) return 2 * (val + 3);
					return val;
				});
				next.set("goon", get.attitude(player, trigger.target) <= 0);
				next.set("forceAuto", true);
				// next.setHiddenSkill(event.name);
			}
			"step 1";
			if (result.bool) {
				var target = trigger.target;
				// player.logSkill("sgsxjxfzmnl_pojun", target);
				target.addSkill("sgsxjxfzmnl_pojun2");
				target.addToExpansion("giveAuto", result.cards, target).gaintag.add("sgsxjxfzmnl_pojun2");
			}
		},
		ai: {
			unequip_ai: true,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (get.attitude(player, arg.target) > 0) return false;
				if (tag == "directHit_ai") return arg.target.hp >= Math.max(1, arg.target.countCards("h") - 1);
				if (arg && arg.name == "sha" && arg.target.getEquip(2)) return true;
				return false;
			},
		},
	},
	sgsxjxfzmnl_pojun2:{
		trigger: { global: "phaseEnd" },
		forced: true,
		popup: false,
		charlotte: true,
		sourceSkill: "sgsxjxfzmnl_pojun",
		filter(event, player) {
			return player.getExpansions("sgsxjxfzmnl_pojun2").length > 0;
		},
		content() {
			"step 0";
			var cards = player.getExpansions("sgsxjxfzmnl_pojun2");
			player.gain(cards, "draw");
			game.log(player, "收回了" + get.cnNumber(cards.length) + "张“破军”牌");
			"step 1";
			player.removeSkill("sgsxjxfzmnl_pojun2");
		},
		intro: {
			markcount: "expansion",
			mark(dialog, storage, player) {
				var cards = player.getExpansions("sgsxjxfzmnl_pojun2");
				if (player.isUnderControl(true)) dialog.addAuto(cards);
				else return "共有" + get.cnNumber(cards.length) + "张牌";
			},
		},
	},
	//阴间谋黄忠
	sgsxjxfzmnl_sbliegong: {
		audio: 'sbliegong',
		mod: {
			// cardnature(card, player) {
			// 	if (!player.getVEquip(1) && get.name(card, player) == "sha") return false;
			// },
			
			attackRangeBase(player) {
				if(player.getVEquip(1))return Infinity;
			},
		},
		trigger: { player: "useCardToPlayered" },
		filter(event, player) {
			return !event.getParent()._sgsxjxfzmnl_sbliegong_player && event.targets.length == 1 &&(event.card.name == "sha" ||(get.type(event.card)=='trick'&&get.tag(event.card,'damage'))) && player.getStorage("sgsxjxfzmnl_sbliegong").length > 0;
		},
		prompt2(event, player) {
			let str = "",
				storage = player.getStorage("sgsxjxfzmnl_sbliegong");
			if (storage.length > 1) {
				str += "亮出牌堆顶的" + get.cnNumber(storage.length - 1) + "张牌并增加伤害；且";
			}
			str += "令" + get.translation(event.target) + "不能使用花色为";
			for (let i = 0; i < storage.length; i++) {
				str += get.translation(storage[i]);
			}
			str += "的牌响应" + get.translation(event.card);
			return str;
		},
		logTarget: "target",
		locked: false,
		check(event, player) {
			const target = event.target;
			if (get.attitude(player, target) > 0) return false;
			if (
				target.hasSkillTag("filterDamage", null, {
					player: player,
					card: event.card,
				})
			)
				return false;
			const storage = player.getStorage("sgsxjxfzmnl_sbliegong");
			if (storage.length >= 4) return true;
			if (storage.length < 3) return false;
			if (target.hasShan()) return storage.includes("heart") && storage.includes("diamond");
			return true;
		},
		async content(event, trigger, player) {
			const storage = player.getStorage("sgsxjxfzmnl_sbliegong").slice(0);
			const num = storage.length - 1;
			const evt = trigger.getParent();
			if (num > 0) {
				if (typeof evt.baseDamage != "number") evt.baseDamage = 1;
				const cards = get.cards(num);
				await game.cardsGotoOrdering(cards);
				await player.showCards(cards.slice(0), get.translation(player) + "发动了【烈弓】");
				while (cards.length > 0) {
					const card = cards.pop();
					if (storage.includes(get.suit(card, false))) evt.baseDamage++;
					//ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
				}
				//game.updateRoundNumber();
			}
			evt._sgsxjxfzmnl_sbliegong_player = player;
			player.addTempSkill("sgsxjxfzmnl_sbliegong_clear");
			const target = trigger.target;
			target.addTempSkill("sgsxjxfzmnl_sbliegong_block");
			if (!target.storage.sgsxjxfzmnl_sbliegong_block) target.storage.sgsxjxfzmnl_sbliegong_block = [];
			target.storage.sgsxjxfzmnl_sbliegong_block.push([evt.card, storage]);
			lib.skill.sgsxjxfzmnl_sbliegong.updateBlocker(target);
		},
		updateBlocker(player) {
			const list = [],
				storage = player.storage.sgsxjxfzmnl_sbliegong_block;
			if (storage?.length) {
				for (const i of storage) list.addArray(i[1]);
			}
			player.storage.sgsxjxfzmnl_sbliegong_blocker = list;
		},
		ai: {
			threaten: 3.5,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (arg?.card?.name == "sha") {
					const storage = player.getStorage("sgsxjxfzmnl_sbliegong");
					if (storage.length < 3 || !storage.includes("heart") || !storage.includes("diamond")) return false;
					const target = arg.target;
					if (target.hasSkill("bagua_skill") || target.hasSkill("bazhen") || target.hasSkill("rw_bagua_skill")) return false;
					return true;
				}
				return false;
			},
		},
		intro: {
			content: "已记录花色：$",
			onunmark: true,
		},
		group: ["sgsxjxfzmnl_sbliegong_count",'sgsxjxfzmnl_sbliegong_wuxing',],
		subSkill: {
			clear: {
				trigger: { player: "useCardAfter" },
				forced: true,
				charlotte: true,
				popup: false,
				filter(event, player) {
					return event._sgsxjxfzmnl_sbliegong_player == player;
				},
				content() {
					player.unmarkSkill("sgsxjxfzmnl_sbliegong");
					player.removeTip("sgsxjxfzmnl_sbliegong");
				},
			},
			block: {
				mod: {
					cardEnabled(card, player) {
						if (!player.storage.sgsxjxfzmnl_sbliegong_blocker) return;
						const suit = get.suit(card);
						if (suit == "none") return;
						let evt = _status.event;
						if (evt.name != "chooseToUse") evt = evt.getParent("chooseToUse");
						if (!evt || !evt.respondTo || evt.respondTo[1].name != "sha") return;
						if (player.storage.sgsxjxfzmnl_sbliegong_blocker.includes(suit)) return false;
					},
				},
				trigger: {
					player: ["damageBefore", "damageCancelled", "damageZero"],
					target: ["shaMiss", "useCardToExcluded", "useCardToEnd"],
					global: ["useCardEnd"],
				},
				forced: true,
				firstDo: true,
				charlotte: true,
				popup: false,
				onremove(player) {
					delete player.storage.sgsxjxfzmnl_sbliegong_block;
					delete player.storage.sgsxjxfzmnl_sbliegong_blocker;
				},
				filter(event, player) {
					const evt = event.getParent("useCard", true, true);
					if (evt && evt.effectedCount < evt.effectCount) return false;
					if (!event.card || !player.storage.sgsxjxfzmnl_sbliegong_block) return false;
					return player.storage.sgsxjxfzmnl_sbliegong_block.some(i => i[0] == event.card);
				},
				content() {
					const storage = player.storage.sgsxjxfzmnl_sbliegong_block;
					for (let i = 0; i < storage.length; i++) {
						if (storage[i][0] == trigger.card) {
							storage.splice(i--, 1);
						}
					}
					if (!storage.length) player.removeSkill(event.name);
					else lib.skill.sgsxjxfzmnl_sbliegong.updateBlocker(player);
				},
			},
			count: {
				trigger: {
					player: "useCard",
					target: "useCardToTargeted",
				},
				forced: true,
				locked: false,
				popup: false,
				filter(event, player, name) {
					if (name != "useCard" && player == event.player) return false;
					const suit = get.suit(event.card);
					if (!lib.suit.includes(suit)) return false;
					if (player.storage.sgsxjxfzmnl_sbliegong?.includes(suit)) return false;
					return true;
				},
				content() {
					player.markAuto("sgsxjxfzmnl_sbliegong", [get.suit(trigger.card)]);
					player.storage.sgsxjxfzmnl_sbliegong.sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a));
					player.addTip("sgsxjxfzmnl_sbliegong", get.translation("sgsxjxfzmnl_sbliegong") + player.getStorage("sgsxjxfzmnl_sbliegong").reduce((str, suit) => str + get.translation(suit), ""));
				},
			},
			wuxing:{
				trigger: { player: "useCard1" },
				filter(event, player) {
					return player.getVEquip(1)&&event.card.name == "sha" && lib.linked.some(n => n != "kami" );
				},
				audio: true,
				direct: true,
				content() {
					"step 0";
					var list = lib.linked.slice(0);
					list.remove("kami");
					list.removeArray(get.natureList(trigger.card));
					list.push("cancel2");
					player
						.chooseControl(list)
						.set("prompt", get.prompt("sgsxjxfzmnl_sbliegong"))
						.set("prompt2", "将" + get.translation(trigger.card) + "转换为以下属性之一");
					"step 1";
					if (result.control != "cancel2") {
						player.logSkill("sgsxjxfzmnl_sbliegong");
						player.popup(get.translation(result.control) + "杀", result.control);
						game.log(trigger.card, "被转为了", "#y" + get.translation(result.control), "属性");
						game.setNature(trigger.card, result.control);
					}
				},
			},
		},
	},
	//阴间神孙策
	sgsxjxfzmnl_yingba:{
		audio: 'yingba',
		mod: {
			aiOrder(player, card, num) {
				if (num > 0 && _status.event && _status.event.type == "phase" && get.tag(card, "recover")) {
					if (player.needsToDiscard()) return num / 3;
					return 0;
				}
			},
			targetInRange(card, player, target) {
				if (target.hasMark("yingba_mark")) return true;
			},
			cardUsableTarget:function (card,player,target){
				if(target.hasMark("yingba_mark"))return true;
			},
		},
		enable: "phaseUse",
		// usable: 1,
		filter: (event, player) => game.hasPlayer(current => current != player && current.maxHp > 1),
		filterTarget: (card, player, target) => target != player && target.maxHp > 1&&(!player.storage.sgsxjxfzmnl_yingba_mark||!player.storage.sgsxjxfzmnl_yingba_mark.includes(target)),
		content() {
			"step 0";
			player.addTempSkill('sgsxjxfzmnl_yingba_mark');
			if(!player.storage.sgsxjxfzmnl_yingba_mark){
				player.storage.sgsxjxfzmnl_yingba_mark=[];
			}
			player.storage.sgsxjxfzmnl_yingba_mark.push(event.target);
			'step 1'
			target.loseMaxHp();
			"step 2";
			if (target.isIn()) target.addMark("yingba_mark", 1);
			player.loseMaxHp();
		},
		locked: false,
		//global:'yingba_mark',
		ai: {
			threaten(player, target) {
				if (player === target || player.isDamaged() || get.attitude(player, target) > 0) return 1;
				return 8 / player.maxHp;
			},
			order: 11,
			result: {
				player(player, target) {
					if (player.maxHp == 1) return -2.5;
					return -0.25;
				},
				target(player, target) {
					if (target.isHealthy()) return -2;
					if (!target.hasMark("yingba_mark")) return -1;
					return -0.2;
				},
			},
		},
		subSkill:{
			mark:{
				onremove:function(player){
					delete player.storage.sgsxjxfzmnl_yingba_mark;
				},
				charlotte: true,
			},
		},

	},
	sgsxjxfzmnl_scfuhai:{
		audio: 'scfuhai',
		trigger: { player: "useCardToPlayered" },
		forced: true,
		filter(event, player) {
			return event.target && event.target.hasMark("yingba_mark");
		},
		logTarget: "target",
		content() {
			trigger.directHit.add(trigger.target);
			if (
				player.getHistory("gain", function (evt) {
					return evt.getParent(2).name == "sgsxjxfzmnl_scfuhai";
				}).length < 4
			)
				player.draw();
		},
		group: ["sgsxjxfzmnl_scfuhai_die"],
		ai: {
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				return arg && arg.target && arg.target.hasMark("yingba_mark");
			},
			combo: "yingba",
		},
		subSkill: {
			usea: {
				audio: "scfuhai",
				trigger: { player: "useCardAfter" },
				forced: true,
				filter(event, player) {
					return lib.skill.scfuhai_usea.logTarget(event, player).length > 0;
				},
				logTarget(event, player) {
					return event.targets.filter(function (i) {
						return i.hasMark("yingba_mark");
					});
				},
				content() {
					var num = 0;
					for (var i of trigger.targets) {
						var numx = i.countMark("yingba_mark");
						if (numx) {
							num += numx;
							i.removeMark("yingba_mark", numx);
						}
					}
					if (num) player.gainMaxHp(num);
				},
			},
			die: {
				audio: "scfuhai",
				trigger: { global: "die" },
				forced: true,
				filter(event, player) {
					return event.player.countMark("yingba_mark") > 0;
				},
				content() {
					player.gainMaxHp(trigger.player.countMark("yingba_mark"));
					player.draw(trigger.player.countMark("yingba_mark"));
				},
			},
		},

	},
	//阴间谋夏侯氏
	sgsxjxfzmnl_sbqiaoshi: {
		audio: 'sbqiaoshi',
		trigger: { player: "damageEnd" },
		usable: 1,
		filter(event, player) {
			return event.source && event.source != player && event.source.isIn();
		},
		async cost(event, trigger, player) {
			const { source, num } = trigger;
			event.result = await player
				.chooseBool(`樵拾：是否令${get.translation(player)}回复${num}点体力，然后你与${get.translation(source)}摸两张牌？`)
				.set("ai", () => {
					return _status.event.bool;
				})
				.set("bool", get.recoverEffect(player, player, player) + 2 * get.effect(source, { name: "draw" }, source) > 5)
				.forResult();
		},
		async content(event, trigger, player) {
			const { source, num } = trigger;
			player.line(source, "green");
			await player.recover(num);
			await game.asyncDraw([player, source].sortBySeat(),2);
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (get.tag(card, "damage")) {
						if (get.attitude(target, player) <= 0 || target == player) return;
						if (target.storage.counttrigger?.sbqiaoshi) return;
						if (target.hp <= 1 && !player.canSave(target)) return;
						return [0, 0.5, 0, 0.5];
					}
				},
			},
		},
	},
	sgsxjxfzmnl_sbyanyu: {
		audio: 'sbyanyu',
		enable: "phaseUse",
		usable: 3,
		filterCard: { name: "sha" },
		selectCard: 1,
		group: "sgsxjxfzmnl_sbyanyu_draw",
		check: () => 1,
		content() {
			player.draw();
		},
		subSkill: {
			draw: {
				trigger: { player: "phaseUseEnd" },
				filter(event, player) {
					return player.getHistory("useSkill", evt => {
						if (evt.skill != "sgsxjxfzmnl_sbyanyu") return false;
						var evtx = evt.event.getParent("phaseUse");
						if (!evtx || evtx != _status.event.getParent("phaseUse")) return;
						return true;
					}).length;
				},
				direct: true,
				content() {
					"step 0";
					event.num =
						3 *
						player.getHistory("useSkill", evt => {
							if (evt.skill != "sgsxjxfzmnl_sbyanyu") return false;
							var evtx = evt.event.getParent("phaseUse");
							if (!evtx || evtx != _status.event.getParent("phaseUse")) return;
							return true;
						}).length;
					player.chooseTarget(get.prompt("sgsxjxfzmnl_sbyanyu"), "令一名其他角色摸" + get.cnNumber(event.num) + "张牌", lib.filter.notMe).set("ai", target => {
						var player = _status.event.player;
						return get.effect(target, { name: "draw" }, player, player);
					});
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						player.logSkill("sgsxjxfzmnl_sbyanyu_draw", target);
						target.draw(num);
					}
				},
			},
		},
		ai: {
			order(obj, player) {
				if (
					game.hasPlayer(current => current != player && get.attitude(player, current) > 0) &&
					player.getHistory("useSkill", evt => {
						if (evt.skill != "sbyanyu") return false;
						var evtx = evt.event.getParent("phaseUse");
						if (!evtx || evtx != _status.event.getParent("phaseUse")) return;
						return true;
					}).length < 2
				)
					return 9;
				return 2;
			},
			result: {
				player: 1,
			},
		},
	},
	//阴间魔貂蝉
	sgsxjxfzmnl_meihuo:{
		audio: 'lijian',
		enable: "phaseUse",
		usable: 2,
		filter(event, player) {
			return game.countPlayer(current => current != player) > 1;
		},
		filterCard: true,
		selectCard: 1,
		position: "he",
		filterTarget: lib.filter.notMe,
		selectTarget() {
			return 2;
		},
		// filterOk() {
		// 	return ui.selected.targets.length == ui.selected.cards.length + 1;
		// },
		check(card) {
			let player = get.owner(card),
				targets = lib.skill.sgsxjxfzmnl_meihuo.selectTargetAi(_status.event, player);
			if (ui.selected.cards.length < targets - 1) {
				if (player.hasSkill("sbbiyue")) return 4 * targets - get.value(card);
				return 6 + targets - get.value(card);
			}
			return 0;
		},
		selectTargetAi: (event, player) => {
			let cache = _status.event.getTempCache("sgsxjxfzmnl_meihuo", "targets");
			if (Array.isArray(cache)) return cache.length;
			let targets = [],
				cards = [0],
				sbbiyue = player.hasSkill("sbbiyue") ? Math.max(0, 3 - game.countPlayer2(current => current.hasHistory("damage"))) : 0,
				alter = [null, 1, 1],
				temp;
			for (let i of game.players) {
				if (player === i) continue;
				temp = get.effect(i, new lib.element.VCard({ name: "juedou", isCard: true }), i, i);
				if (temp) {
					let att = get.attitude(event.player, i);
					if ((!att && sbbiyue) || att * temp > 0) targets.push([i, temp, att]);
					else if (!alter[2]) continue;
					else if (!att || (att > 0 && temp > -15 && i.hp > 2) || (att < 0 && temp < 15)) alter = [i, temp, att];
				}
			}
			targets.sort((a, b) => {
				if (Boolean(a[2]) !== Boolean(b[2])) return Math.abs(b[2]) - Math.abs(a[2]);
				return Math.abs(b[1]) - Math.abs(a[1]);
			});
			if (targets.length < 2 && alter[0]) targets.push(alter);
			targets = targets.slice(
				0,
				1 +
					player.countCards("he", card => {
						if (lib.filter.cardDiscardable(card, player, "sgsxjxfzmnl_meihuo")) {
							cards.push(get.value(card));
							return true;
						}
						return false;
					})
			);
			cards.sort((a, b) => a - b);
			for (let i = 0; i < targets.length; i++) {
				if (Math.abs(targets[i][1]) < cards[i] / (1 + sbbiyue)) {
					targets.splice(i, targets.length - i);
					break;
				}
			}
			if (targets.length < 2) {
				event.putTempCache("sgsxjxfzmnl_meihuo", "targets", []);
				return 0;
			}
			event.putTempCache("sgsxjxfzmnl_meihuo", "targets", targets);
			return targets.length;
		},
		multiline: true,
		async content(event, trigger, player) {
			const { targets, target } = event;
			const targetx = targets.slice().sortBySeat(target)[1];
			const card = { name: "juedou", isCard: true };
			if (target.canUse(card, targetx)) await target.useCard(card, targetx);
		},
		ai: {
			threaten: 3,
			order: 7,
			result: {
				player(player, target) {
					let targets = _status.event.getTempCache("sgsxjxfzmnl_meihuo", "targets");
					if (Array.isArray(targets))
						for (let arr of targets) {
							if (target === arr[0] && !arr[2]) return 1;
						}
					return 0;
				},
				target(player, target) {
					let targets = _status.event.getTempCache("sgsxjxfzmnl_meihuo", "targets");
					if (Array.isArray(targets))
						for (let arr of targets) {
							if (target === arr[0]) {
								if (arr[1] * arr[2] < 0) return get.sgn(arr[2]);
								return arr[1];
							}
						}
					return 0;
				},
			},
		},

	},
	sgsxjxfzmnl_biyue:{
		audio:'biyue',
		trigger:{
			player:'phaseJieshuBegin',
		},
		frequent:true,
		content:function (){
			player.draw(2);
		},
	},
	//阴间王元姬
	sgsxjxfzmnl_qianchong:{
		audio:'xinfu_qianchong',
		init(player, skill) {
			const es = player.getCards("e");
			if (es.length) {
				if (es.every(card => get.color(card) == "red")) {
					player.addAdditionalSkill(skill, "mingzhe");
				} else if (es.every(card => get.color(card) == "black")) {
					player.addAdditionalSkill(skill, "weimu");
				} else {
					player.removeAdditionalSkill(skill);
				}
			} else {
				player.removeAdditionalSkill(skill);
			}
		},
		onremove(player, skill) {
			player.removeAdditionalSkill(skill);
		},
		trigger: { player: "phaseUseBegin" },
		filter(event, player) {
			return true;
		},
		forced: true,
		async content(event, trigger, player) {
			player.addTempSkill(event.name + "_effect");
			player.markAuto(event.name + "_effect");
			game.log(player, "本回合使用牌无距离和次数限制");
		},
		derivation: ["weimu", "mingzhe"],
		group: "sgsxjxfzmnl_qianchong_change",
		subSkill: {
			effect: {
				charlotte: true,
				onremove: true,
				intro: { content: "本回合内使用牌没有次数和距离限制" },
				mod: {
					cardUsable(card, player) {
						return Infinity;
					},
					targetInRange(card, player) {
						return true;
					},
				},
			},
			change: {
				trigger: {
					player: "loseAfter",
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				filter(event, player) {
					if (event.name == "equip" && event.player == player) {
						return true;
					}
					return event.getl?.(player)?.es?.length;
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					const skill = "sgsxjxfzmnl_qianchong";
					get.info(skill).init(player, skill);
				},
			},
		},

	},
	sgsxjxfzmnl_shangjian:{
		audio: 'xinfu_shangjian',
		getNum(player) {
			let num = 0;
			player.getHistory("lose", evt => {
				const evt2 = evt.getParent();
				if (evt.cards2?.length) {
					num += evt.cards2.length;
				}
			});
			return num;
		},
		trigger: { global: "phaseJieshuBegin" },
		filter(event, player) {
			const num = get.info("sgsxjxfzmnl_shangjian").getNum(player);
			return num > 0;
		},
		forced: true,
		async content(event, trigger, player) {
			const num = get.info(event.name).getNum(player);
			if (num > 0) {
				await player.draw(num);
			}
		},
		mark:true,
		marktext:'尚俭',
		intro:{
			markcount: (storage,player) => {
				const num = get.info("sgsxjxfzmnl_shangjian").getNum(player);
				return num;
			},
		}
	},
	//阴间神郭嘉
	sgsxjxfzmnl_reshuishi:{
		audio: "shuishi",
		enable: "phaseUse",
		usable: 2,
		frequent: true,
		filter(event, player) {
			return true;
		},
		content() {
			"step 0";
			event.cards = [];
			event.suits = [];
			"step 1";
			player
				.judge(function (result) {
					var evt = _status.event.getParent("sgsxjxfzmnl_reshuishi");
					if (evt && evt.suits && evt.suits.includes(get.suit(result))) {
						return 0;
					}
					return 1;
				})
				.set("callback", lib.skill.sgsxjxfzmnl_reshuishi.callback).judge2 = function (result) {
				return result.bool ? true : false;
			};
			"step 2";
			var cards = cards.filterInD();
			if (cards.length) {
				player
					.chooseTarget("将" + get.translation(cards) + "交给一名角色", true)
					.set("ai", function (target) {
						var player = _status.event.player,
							att = get.attitude(player, target);
						if (att <= 0) {
							return att;
						}
						if (target.countCards("h") + _status.event.num >= _status.event.max) {
							att /= 3;
						}
						if (target.hasSkillTag("nogain")) {
							att /= 10;
						}
						return att;
					})
					.set("num", cards.length)
					.set(
						"max",
						game.filterPlayer().reduce((num, i) => {
							return Math.max(num, i.countCards("h"));
						}, 0)
					);
			} else {
				event.finish();
			}
			"step 3";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.line(target, "green");
				target.gain(cards, "gain2").giver = player;
			} else {
				event.finish();
			}
			// "step 4";
			// if (target.isMaxHandcard()) {
			// 	player.loseMaxHp();
			// }
		},
		callback() {
			"step 0";
			var evt = event.getParent(2);
			event.getParent().orderingCards.remove(event.judgeResult.card);
			evt.cards.push(event.judgeResult.card);
			if (event.getParent().result.bool) {
				evt.suits.push(event.getParent().result.suit);
				player.gainMaxHp();
				player.chooseBool("是否继续发动【慧识】？").set("frequentSkill", "sgsxjxfzmnl_reshuishi");
			} else {
				event._result = { bool: false };
			}
			"step 1";
			if (result.bool) {
				event.getParent(2).redo();
			}
		},
		ai: {
			order: 9,
			result: {
				player: 1,
			},
		},

	},
	//阴间文鸯
	sgsxjxfzmnl_quedi:{
		audio: "dbquedi",
		trigger: { player: "useCardToPlayered" },
		usable(skill, player) {
			return 2 + player.countMark("dbchoujue_add");
		},
		filter(event, player) {
			const { card, targets, target } = event;
			return (
				["sha", "juedou"].includes(card.name) &&
				targets.length == 1 &&
				(target.countGainableCards(player, "h") > 0 ||
					player.hasCard(card => {
						return _status.connectMode || (get.type(card, null, player) == "basic" && lib.filter.cardDiscardable(card, player, "sgsxjxfzmnl_quedi"));
					}, "h"))
			);
		},
		async cost(event, trigger, player) {
			const { target } = trigger;
			const list = [];
			if (target.countGainableCards(player, "h") > 0) {
				list.push("选项一");
			}
			if (player.hasCard(card => get.type(card, null, player) == "basic" && lib.filter.cardDiscardable(card, player, "sgsxjxfzmnl_quedi"), "h")) {
				list.push("选项二");
			}
			list.push("背水！");
			list.push("cancel2");
			const control = await player
				.chooseControl(list)
				.set("choiceList", [`获得${get.translation(target)}的一张手牌`, `弃置一张基本牌并令${get.translation(trigger.card)}伤害+1`, "背水！减1点体力上限并执行所有选项"])
				.set("prompt", get.prompt(event.skill, target))
				.set("ai", () => {
					const evt = _status.event.getTrigger(),
						player = evt.player,
						target = evt.target,
						card = evt.card;
					if (get.attitude(player, target) > 0) {
						return "cancel2";
					}
					const bool1 = target.countGainableCards(player, "h") > 0;
					const bool2 =
						player.hasCard(cardx => {
							return get.type(cardx, null, player) == "basic" && lib.filter.cardDiscardable(cardx, player, "sgsxjxfzmnl_quedi") && get.value(card, player) < 5;
						}, "h") &&
						!target.hasSkillTag("filterDamage", null, {
							player: player,
							card: card,
						});
					if (bool1 && bool2 && (target.hp <= 2 || (player.isDamaged() && player.maxHp > 3))) {
						return "背水！";
					}
					if (bool1) {
						return "选项一";
					}
					if (bool2) {
						return "选项二";
					}
					return "cancel2";
				})
				.forResultControl();
			event.result = {
				bool: control != "cancel2",
				cost_data: control,
			};
		},
		logTarget: "target",
		async content(event, trigger, player) {
			const { cost_data: control } = event,
				{ target } = trigger;
			if (["选项一", "背水！"].includes(control) && target.countGainableCards(player, "h") > 0) {
				await player.gainPlayerCard(target, true, "h");
			}
			if (["选项二", "背水！"].includes(control) && player.hasCard(card => get.type(card, null, player) == "basic" && lib.filter.cardDiscardable(card, player, "sgsxjxfzmnl_quedi"), "h")) {
				const bool = await player.chooseToDiscard("h", "弃置一张基本牌", { type: "basic" }, true).forResultBool();
				if (bool) {
					trigger.getParent().baseDamage++;
				}
			}
			if (control == "背水！") {
				await player.loseMaxHp();
			}
		},
		ai: {
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (tag !== "directHit_ai" || !arg || !arg.card || !arg.target || (arg.card.name != "sha" && arg.card.name != "juedou")) {
					return false;
				}
				if (player.storage.counttrigger?.sgsxjxfzmnl_quedi > 0) {
					return false;
				}
				if (
					arg.target.countCards("h") == 1 &&
					(arg.card.name != "sha" ||
						!arg.target.hasSkillTag("freeShan", false, {
							player: player,
							card: arg.card,
						}) ||
						player.hasSkillTag("unequip", false, {
							name: arg.card ? arg.card.name : null,
							target: arg.target,
							card: arg.card,
						}) ||
						player.hasSkillTag("unequip_ai", false, {
							name: arg.card ? arg.card.name : null,
							target: arg.target,
							card: arg.card,
						}))
				) {
					return true;
				}
				return false;
			},
		},
	},
	sgsxjxfzmnl_chuifeng:{
		audio: "dbzhuifeng",
		groupSkill: "wei",
		enable: "chooseToUse",
		viewAsFilter(player) {
			return player.group == "wei" && player.hp > 0;
		},
		viewAs: { name: "juedou", isCard: true },
		filterCard: () => false,
		selectCard: -1,
		log: false,
		precontent() {
			"step 0";
			player.logSkill("sgsxjxfzmnl_chuifeng");
			player.loseHp();
			event.forceDie = true;
			"step 1";
			//特殊处理
			if (player.isDead()) {
				player.useResult(event.result, event.getParent()).forceDie = true;
			}
		},
		ai: {
			order() {
				return get.order({ name: "juedou" }) - 0.5;
			},
		},
		group: "sgsxjxfzmnl_chuifeng_self",
		subSkill: {
			self: {
				audio: "sgsxjxfzmnl_chuifeng",
				trigger: { player: "damageBegin2" },
				forced: true,
				filter(event, player) {
					var evt = event.getParent();
					return evt.skill == "sgsxjxfzmnl_chuifeng" && evt.player == player;
				},
				content() {
					trigger.cancel();
					// player.tempBanSkill("sgsxjxfzmnl_chuifeng", { player: "phaseUseEnd" });
				},
			},
		},
	},
	sgsxjxfzmnl_chongjian:{
		audio: "dbchongjian",
		groupSkill: "wu",
		hiddenCard(player, name) {
			if (
				player.group == "wu" &&
				(name == "sha" || name == "jiu") &&
				player.hasCard(function (card) {
					return get.type(card) == "equip";
				}, "hes")
			) {
				return true;
			}
			return false;
		},
		enable: "chooseToUse",
		filter(event, player) {
			return (
				player.group == "wu" &&
				player.hasCard(function (card) {
					return get.type(card) == "equip";
				}, "hes") &&
				(event.filterCard({ name: "sha",storage: { sgsxjxfzmnl_chongjian: true }, }, player, event) || event.filterCard({ name: "jiu" }, player, event))
			);
		},
		locked: false,
		mod: {
			targetInRange(card) {
				if (card.storage && card.storage.sgsxjxfzmnl_chongjian) {
					return true;
				}
			},
			cardUsable(card, player){
				if (card.name=='sha'&&card.storage && card.storage.sgsxjxfzmnl_chongjian) {
					return Infinity;
				}
			},
			// cardEnabled(card, player){
			// 	if (card.name=='sha'&&card.storage && card.storage.sgsxjxfzmnl_chongjian) {
			// 		return true;
			// 	}
			// },
		},
		chooseButton: {
			dialog() {
				var list = [];
				list.push(["基本", "", "sha"]);
				for (var i of lib.inpile_nature) {
					list.push(["基本", "", "sha", i]);
				}
				list.push(["基本", "", "jiu"]);
				return ui.create.dialog("冲坚", [list, "vcard"]);
			},
			filter(button, player) {
				var evt = _status.event.getParent();
				return evt.filterCard({ name: button.link[2], nature: button.link[3], isCard: true,storage: { sgsxjxfzmnl_chongjian: true }, }, player, evt);
			},
			check(button) {
				if (_status.event.getParent().type != "phase") {
					return 1;
				}
				var player = _status.event.player;
				if (
					button.link[2] == "jiu" &&
					(player.hasCard(function (card) {
						return get.name(card) == "sha";
					}, "hs") ||
						player.countCards("hes", function (card) {
							if (get.type(card) != "equip") {
								return false;
							}
							if (get.position(card) == "e") {
								if (player.hasSkillTag("noe")) {
									return 10 - get.value(card) > 0;
								}
								var sub = get.subtype(card);
								if (
									player.hasCard(function (card) {
										return get.subtype(card) == sub && player.canUse(card, player) && get.effect(player, card, player, player) > 0;
									}, "hs")
								) {
									return 10 - get.value(card) > 0;
								}
							}
							return 5 - get.value(card) > 0;
						}) > 1)
				) {
					return player.getUseValue({ name: "jiu" }) * 4;
				}
				return player.getUseValue({ name: button.link[2], nature: button.link[3] }, false);
			},
			backup(links, player) {
				return {
					audio: "sgsxjxfzmnl_chongjian",
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						//isCard:true,
						storage: { sgsxjxfzmnl_chongjian: true },
					},
					filterCard: { type: "equip" },
					position: "hes",
					popname: true,
					precontent() {
						player.addTempSkill("sgsxjxfzmnl_chongjian_effect");
					},
					check(card) {
						var player = _status.event.player;
						if (get.position(card) == "e") {
							if (player.hasSkillTag("noe")) {
								return 10 - get.value(card);
							}
							var sub = get.subtype(card);
							if (
								player.hasCard(function (card) {
									return get.subtype(card) == sub && player.canUse(card, player) && get.effect(player, card, player, player) > 0;
								}, "hs")
							) {
								return 10 - get.value(card);
							}
						}
						return 5 - get.value(card);
					},
				};
			},
			prompt(links) {
				return "将一张装备牌当做" + (links[0][3] ? get.translation(links[0][3]) : "") + "【" + get.translation(links[0][2]) + "】使用";
			},
		},
		ai: {
			unequip: true,
			respondSha: true,
			skillTagFilter(player, tag, arg) {
				if (tag == "unequip") {
					if (player.group != "wu" || !arg || !arg.card || !arg.card.storage || !arg.card.storage.sgsxjxfzmnl_chongjian) {
						return false;
					}
					return true;
				}
				if (arg === "respond") {
					return false;
				}
				return player.group == "wu" && player.hasCard({ type: "equip" }, "hes");
			},
			order(item, player) {
				if (_status.event.type != "phase") {
					return 1;
				}
				var player = _status.event.player;
				if (
					player.hasCard(function (card) {
						if (get.value(card, player) < 0) {
							return true;
						}
						var sub = get.subtype(card);
						return (
							player.hasCard(function (card) {
								return get.subtype(card) == sub && player.canUse(card, player) && get.effect(player, card, player, player) > 0;
							}, "hs") > 0
						);
					}, "e")
				) {
					return 10;
				}
				if (
					player.countCards("hs", "sha") ||
					player.countCards("he", function (card) {
						return get.type(card) == "equip" && get.value(card, player) < 5;
					}) > 1
				) {
					return get.order({ name: "jiu" }) - 0.1;
				}
				return get.order({ name: "sha" }) - 0.1;
			},
			result: { player: 1 },
		},
		subSkill: {
			effect: {
				audio: "sgsxjxfzmnl_chongjian",
				charlotte: true,
				mod: {
					targetInRange(card) {
						if (card.storage && card.storage.sgsxjxfzmnl_chongjian) {
							return true;
						}
					},
				},
				trigger: { source: "damageSource" },
				forced: true,
				logTarget: "player",
				filter(event, player) {
					return event.parent.skill == "sgsxjxfzmnl_chongjian_backup" && event.card.name == "sha" && event.getParent().name == "sha" && event.player.countGainableCards(player, "e") > 0;
				},
				content() {
					player.gainPlayerCard(trigger.player, "e", true, trigger.num);
				},
			},
		},
	},
	// sgsxjxfzmnl_choujue:{
	// 	audio: "dbchoujue",
	// 	trigger: { source: "dieAfter" },
	// 	forced: true,
	// 	async content(event, trigger, player) {
	// 		await player.gainMaxHp();
	// 		await player.draw(2);
	// 		player.addTempSkill(event.name + "_add");
	// 		player.addMark(event.name + "_add", 1, false);
	// 	},
	// 	subSkill: {
	// 		add: {
	// 			charlotte: true,
	// 			onremove: true,
	// 			mark: true,
	// 			intro: {
	// 				markcount: (storage, player) => storage || 0,
	// 				content: (storage, player) => "本回合〖却敌〗可发动次数+" + (storage || 0),
	// 			},
	// 		},
	// 	},
	// },
	//阴间界沮授
	sgsxjxfzmnl_rejianying:{
		audio: 'xinjianying',
		subfrequent: ["draw"],
		enable: "phaseUse",
		usable: 2,
		filter(event, player) {
			if (!player.countCards("he")) {
				return false;
			}
			for (var i of lib.inpile) {
				if (i != "du" && get.type(i, null, false) == "basic") {
					if (event.filterCard({ name: i }, player, event)) {
						return true;
					}
					if (i == "sha") {
						for (var j of lib.inpile_nature) {
							if (event.filterCard({ name: i, nature: j }, player, event)) {
								return true;
							}
						}
					}
				}
			}
			return false;
		},
		onChooseToUse(event) {
			if (event.type == "phase" && !game.online) {
				var last = event.player.getLastUsed();
				if (last && last.getParent("phaseUse") == event.getParent()) {
					var suit = get.suit(last.card, false);
					if (suit != "none") {
						event.set("sgsxjxfzmnl_rejianying_suit", suit);
					}
				}
			}
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				var suit = event.sgsxjxfzmnl_rejianying_suit || "",
					str = get.translation(suit);
				for (var i of lib.inpile) {
					if (i != "du" && get.type(i, null, false) == "basic") {
						if (event.filterCard({ name: i }, player, event)) {
							list.push(["基本", str, i]);
						}
						if (i == "sha") {
							for (var j of lib.inpile_nature) {
								if (event.filterCard({ name: i, nature: j }, player, event)) {
									list.push(["基本", str, i, j]);
								}
							}
						}
					}
				}
				return ui.create.dialog("渐营", [list, "vcard"]);
			},
			check(button) {
				if (button.link[2] == "jiu") {
					return 0;
				}
				return _status.event.player.getUseValue({
					name: button.link[2],
					nature: button.link[3],
				});
			},
			backup(links, player) {
				var next = {
					audio: "sgsxjxfzmnl_rejianying",
					filterCard: true,
					popname: true,
					position: "he",
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
					},
					ai1(card) {
						return 7 - _status.event.player.getUseValue(card, null, true);
					},
				};
				if (_status.event.sgsxjxfzmnl_rejianying_suit) {
					next.viewAs.suit = _status.event.sgsxjxfzmnl_rejianying_suit;
				}
				return next;
			},
			prompt(links) {
				return "将一张牌当做" + (get.translation(links[0][3]) || "") + get.translation(links[0][2]) + (_status.event.sgsxjxfzmnl_rejianying_suit ? "(" + get.translation(_status.event.sgsxjxfzmnl_rejianying_suit) + ")" : "") + "使用";
			},
		},
		ai: {
			order(item, player) {
				if (_status.event.sgsxjxfzmnl_rejianying_suit) {
					return 16;
				}
				return 3;
			},
			result: { player: 7 },
		},
		group: ["sgsxjxfzmnl_rejianying_draw", "jianying_mark"],
		init(player) {
			if (player.isPhaseUsing()) {
				var evt = _status.event.getParent("phaseUse");
				var history = player.getHistory("useCard", function (evt2) {
					return evt2.getParent("phaseUse") == evt;
				});
				if (history.length) {
					var trigger = history[history.length - 1];
					player.storage.jianying_mark = trigger.card;
					player.markSkill("jianying_mark");
					game.broadcastAll(
						function (player, suit) {
							if (player.marks.jianying_mark) {
								player.marks.jianying_mark.firstChild.innerHTML = get.translation(suit);
							}
						},
						player,
						get.suit(trigger.card, player)
					);
					player.when("phaseUseAfter").then(() => {
						player.unmarkSkill("jianying_mark");
						delete player.storage.jianying_mark;
					});
				}
			}
		},
		onremove(player) {
			player.unmarkSkill("jianying_mark");
			delete player.storage.jianying_mark;
		},
		subSkill: {
			draw: { inherit: "jianying", audio: "sgsxjxfzmnl_rejianying" },
		},
	},
	sgsxjxfzmnl_reshibei:{
		trigger: { player: "damageEnd" },
		forced: true,
		audio: 'shibei',
		filter(event, player) {
			var index = player.getHistory("damage").indexOf(event);
			return index %2== 0;
		},
		content() {
			player.recover();
		},
		ai: {
			maixie_defend: true,
			threaten: 0.9,
			effect: {
				target(card, player, target) {
					if (player.hasSkillTag("jueqing", false, target)) {
						return;
					}
					if (target.hujia) {
						return;
					}
					if (player._shibei_tmp) {
						return;
					}
					if (target.hasSkill("shibei_ai")) {
						return;
					}
					if (_status.event.getParent("useCard", true) || _status.event.getParent("_wuxie", true)) {
						return;
					}
					if (get.tag(card, "damage")) {
						if (target.getHistory("damage").length > 0) {
							return [1, -2];
						} else {
							if (get.attitude(player, target) > 0 && target.hp > 1) {
								return 0;
							}
							if (
								get.attitude(player, target) < 0 &&
								!player.hasSkillTag("damageBonus", "e", {
									target: target,
									card: card,
								})
							) {
								if (card.name == "sha") {
									return;
								}
								var sha = false;
								player._shibei_tmp = true;
								var num = player.countCards("h", function (card) {
									if (card.name == "sha") {
										if (sha) {
											return false;
										} else {
											sha = true;
										}
									}
									return get.tag(card, "damage") && player.canUse(card, target) && get.effect(target, card, player, player) > 0;
								});
								delete player._shibei_tmp;
								if (player.hasSkillTag("damage")) {
									num++;
								}
								if (num < 2) {
									var enemies = player.getEnemies();
									if (enemies.length == 1 && enemies[0] == target && player.needsToDiscard()) {
										return;
									}
									return 0;
								}
							}
						}
					}
				},
			},
		},
	},
	// 阴间神甘宁
	sgsxjxfzmnl_drltpoxi:{
		audio: 'drlt_poxi',
		enable: "phaseUse",
		// usable: 1,
		filterTarget(card, player, target) {
			// return target != player && target.countCards("h") > 0;
			// return target!=player;
			return target != player && (target.countCards("h") > 0||player.countCards("h") > 0);
		},
		content() {
			"step 0";
			event.list1 = [];
			event.list2 = [];
			if (player.countCards("h") > 0) {
				if(target.countCards("h") > 0){
					var chooseButton = player.chooseButton(4, ["你的手牌", player.getCards("h"), get.translation(target.name) + "的手牌", target.getCards("h")]);
				}
				else {
					var chooseButton = player.chooseButton(4, ["你的手牌", player.getCards("h")]);
				}
			} else {
				var chooseButton = player.chooseButton(4, [get.translation(target.name) + "的手牌", target.getCards("h")]);
			}
			chooseButton.set("target", target);
			chooseButton.set("ai", function (button) {
				var player = _status.event.player;
				var target = _status.event.target;
				var ps = [];
				var ts = [];
				for (var i = 0; i < ui.selected.buttons.length; i++) {
					var card = ui.selected.buttons[i].link;
					if (target.getCards("h").includes(card)) {
						ts.push(card);
					} else {
						ps.push(card);
					}
				}
				var card = button.link;
				var owner = get.owner(card);
				var val = get.value(card) || 1;
				if (owner == target) {
					if (ts.length > 1) {
						return 0;
					}
					if (ts.length == 0 || player.hp > 3) {
						return val;
					}
					return 2 * val;
				}
				return 7 - val;
			});
			chooseButton.set("filterButton", function (button) {
				if (!lib.filter.canBeDiscarded(button.link, get.player(), get.owner(button.link))) return false
				for (var i = 0; i < ui.selected.buttons.length; i++) {
					if (get.suit(button.link) == get.suit(ui.selected.buttons[i].link)) {
						return false;
					}
				}
				return true;
			});
			"step 1";
			if (result.bool) {
				var list = result.links;
				for (var i = 0; i < list.length; i++) {
					if (get.owner(list[i]) == player) {
						event.list1.push(list[i]);
					} else {
						event.list2.push(list[i]);
					}
				}
				if (event.list1.length && event.list2.length) {
					game.loseAsync({
						lose_list: [
							[player, event.list1],
							[target, event.list2],
						],
						discarder: player,
					}).setContent("discardMultiple");
				} else if (event.list2.length) {
					target.discard(event.list2);
				} else {
					player.discard(event.list1);
				}
			}
			"step 2";
			if (event.list1.length + event.list2.length == 4) {
				if (event.list1.length == 0) {
					player.gainMaxHp();
				}
				if (event.list1.length == 1) {
					player.draw();
				}
				if (event.list1.length == 3) {
					player.recover();
				}
				if (event.list1.length == 4) {
					player.draw(4);
				}
			}
		},
		ai: {
			order: 13,
			result: {
				target(target, player) {
					return -1;
				},
			},
		},
	},
	sgsxjxfzmnl_drltjieying:{
		audio: 'drlt_jieying',
		trigger: { global: "phaseDrawBegin2" },
		filter(event, player) {
			return !event.numFixed && event.player.hasMark("sgsxjxfzmnl_drltjieying_mark");
		},
		forced: true,
		locked: false,
		logTarget: "player",
		content() {
			var numx = 1;
			if(trigger.player==player)numx *=2;
			trigger.num+=numx;
		},
		global: "sgsxjxfzmnl_drltjieying_mark",
		group: ["sgsxjxfzmnl_drltjieying_1", "sgsxjxfzmnl_drltjieying_2", "sgsxjxfzmnl_drltjieying_3"],
		subSkill: {
			1: {
				audio: "sgsxjxfzmnl_drltjieying",
				trigger: { player: "phaseBegin" },
				filter(event, player) {
					return !game.hasPlayer(current => current.hasMark("sgsxjxfzmnl_drltjieying_mark"));
				},
				forced: true,
				content() {
					player.addMark("sgsxjxfzmnl_drltjieying_mark", 1);
				},
			},
			2: {
				audio: "sgsxjxfzmnl_drltjieying",
				trigger: { player: "phaseJieshuBegin" },
				filter(event, player) {
					return (
						player.hasMark("sgsxjxfzmnl_drltjieying_mark") &&
						game.hasPlayer(target => {
							return target != player && !target.hasMark("sgsxjxfzmnl_drltjieying_mark");
						})
					);
				},
				direct: true,
				content() {
					"step 0";
					player.chooseTarget(get.prompt("sgsxjxfzmnl_drltjieying"), "将“营”交给一名角色；其摸牌阶段多摸一张牌，出牌阶段使用【杀】的次数上限+1且手牌上限+1。该角色回合结束后，其移去“营”标记，然后你获得其所有手牌。", function (card, player, target) {
						return target != player && !target.hasMark("sgsxjxfzmnl_drltjieying_mark");
					}).ai = function (target) {
						let th = target.countCards("h"),
							att = get.attitude(_status.event.player, target);
						for (let i in target.skills) {
							let info = get.info(i);
							if (!info || info.shaRelated === false) {
								continue;
							}
							if (info.shaRelated || get.skillInfoTranslation(i, target).includes("【杀】")) {
								return Math.abs(att);
							}
						}
						if (att > 0) {
							if (th > 3 && target.hp > 2) {
								return 0.6 * th;
							}
						}
						if (att < 1) {
							if (target.countCards("j", { name: "lebu" })) {
								return 1 + Math.min((1.5 + th) * 0.8, target.getHandcardLimit() * 0.7);
							}
							if (!th || target.getEquip("zhangba") || target.getEquip("guanshi")) {
								return 0;
							}
							if (!target.inRange(player) || player.countCards("hs", { name: "shan" }) > 1) {
								return Math.min((1 + th) * 0.3, target.getHandcardLimit() * 0.2);
							}
						}
						return 0;
					};
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						player.line(target);
						player.logSkill("sgsxjxfzmnl_drltjieying", target);
						var mark = player.countMark("sgsxjxfzmnl_drltjieying_mark");
						player.removeMark("sgsxjxfzmnl_drltjieying_mark", mark);
						target.addMark("sgsxjxfzmnl_drltjieying_mark", mark);
					}
				},
				ai: {
					effect: {
						player(card, player, target) {
							if (get.name(card) === "lebu" && get.attitude(player, target) < 0) {
								return 1 + Math.min((target.countCards("h") + 1.5) * 0.8, target.getHandcardLimit() * 0.7);
							}
						},
					},
				},
			},
			3: {
				audio: "sgsxjxfzmnl_drltjieying",
				trigger: { global: "phaseEnd" },
				filter(event, player) {
					return player != event.player && event.player.hasMark("sgsxjxfzmnl_drltjieying_mark") && event.player.isIn();
				},
				forced: true,
				logTarget: "player",
				content() {
					if (trigger.player.countCards("h") > 0) {
						trigger.player.give(trigger.player.getCards("h"), player);
					}
					trigger.player.clearMark("sgsxjxfzmnl_drltjieying_mark");
				},
			},
			mark: {
				marktext: "营",
				intro: {
					name2: "营",
					content: "mark",
				},
				mod: {
					cardUsable(card, player, num) {
						if (player.hasMark("sgsxjxfzmnl_drltjieying_mark") && card.name == "sha") {
							var numx = game.countPlayer(function (current) {
								return current.hasSkill("sgsxjxfzmnl_drltjieying");
							});
							if(player.hasSkill("sgsxjxfzmnl_drltjieying"))numx *=2;
							return (
								num + numx
								
							);
						}
					},
					maxHandcard(player, num) {
						if (player.hasMark("sgsxjxfzmnl_drltjieying_mark")) {
							var numx = game.countPlayer(function (current) {
								return current.hasSkill("sgsxjxfzmnl_drltjieying");
							});
							if(player.hasSkill("sgsxjxfzmnl_drltjieying"))numx *=2;
							return (
								num + numx
								
							);
						}
					},
					aiOrder(player, card, num) {
						if (
							player.hasMark("sgsxjxfzmnl_drltjieying_mark") &&
							game.hasPlayer(current => {
								return current.hasSkill("sgsxjxfzmnl_drltjieying") && get.attitude(player, current) <= 0;
							})
						) {
							return Math.max(num, 0) + 1;
						}
					},
				},
				ai: {
					nokeep: true,
					skillTagFilter(player) {
						return (
							player.hasMark("sgsxjxfzmnl_drltjieying_mark") &&
							game.hasPlayer(current => {
								return current.hasSkill("sgsxjxfzmnl_drltjieying") && get.attitude(player, current) <= 0;
							})
						);
					},
				},
			},
		},
	
	},



	
	//十常侍
	sgsxjxfzmnl_mbdanggu: {
		audio:'mbdanggu',
		trigger: {
			player: "enterGame",
			global: "phaseBefore",
		},
		filter(event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		derivation: ["sgsxjxfzmnl_mbdanggu_faq", "sgsxjxfzmnl_mbdanggu_faq2", "sgsxjxfzmnl_scstaoluan", "sgsxjxfzmnl_scschiyan", "sgsxjxfzmnl_scszimou", "sgsxjxfzmnl_scspicai", "sgsxjxfzmnl_scsyaozhuo", "sgsxjxfzmnl_scsxiaolu", "sgsxjxfzmnl_scskuiji", "sgsxjxfzmnl_scschihe", "sgsxjxfzmnl_scsniqu", "sgsxjxfzmnl_scsmiaoyu"],
		forced: true,
		unique: true,
		onremove(player) {
			delete player.storage.sgsxjxfzmnl_mbdanggu;
			delete player.storage.sgsxjxfzmnl_mbdanggu_current;
			if (lib.skill.sgsxjxfzmnl_mbdanggu.isSingleShichangshi(player)) {
				game.broadcastAll(function (player) {
					player.name1 = player.name;
					player.skin.name = player.name;
					player.smoothAvatar(false);
					player.node.avatar.setBackground(player.name, "character");
					player.node.name.innerHTML = get.slimName(player.name);
					delete player.name2;
					delete player.skin.name2;
					player.classList.remove("fullskin2");
					player.node.avatar2.classList.add("hidden");
					player.node.name2.innerHTML = "";
					if (player == game.me && ui.fakeme) {
						ui.fakeme.style.backgroundImage = player.node.avatar.style.backgroundImage;
					}
				}, player);
			}
		},
		changshi: [
			["sgsxjxfzmnl_scs_zhangrang", "sgsxjxfzmnl_scstaoluan"],
			["sgsxjxfzmnl_scs_zhaozhong", "sgsxjxfzmnl_scschiyan"],
			["sgsxjxfzmnl_scs_sunzhang", "sgsxjxfzmnl_scszimou"],
			["sgsxjxfzmnl_scs_bilan", "sgsxjxfzmnl_scspicai"],
			["sgsxjxfzmnl_scs_xiayun", "sgsxjxfzmnl_scsyaozhuo"],
			["sgsxjxfzmnl_scs_hankui", "sgsxjxfzmnl_scsxiaolu"],
			["sgsxjxfzmnl_scs_lisong", "sgsxjxfzmnl_scskuiji"],
			["sgsxjxfzmnl_scs_duangui", "sgsxjxfzmnl_scschihe"],
			["sgsxjxfzmnl_scs_guosheng", "sgsxjxfzmnl_scsniqu"],
			["sgsxjxfzmnl_scs_gaowang", "sgsxjxfzmnl_scsmiaoyu"],
		],
		conflictMap(player) {
			if (!_status.sgsxjxfzmnl_changshiMap) {
				_status.sgsxjxfzmnl_changshiMap = {
					sgsxjxfzmnl_scs_zhangrang: [],
					sgsxjxfzmnl_scs_zhaozhong: [],
					sgsxjxfzmnl_scs_sunzhang: [],
					sgsxjxfzmnl_scs_bilan: [/*"scs_hankui"*/],
					sgsxjxfzmnl_scs_xiayun: [],
					sgsxjxfzmnl_scs_hankui: [/*"scs_bilan"*/],
					sgsxjxfzmnl_scs_lisong: [],
					sgsxjxfzmnl_scs_duangui: [/*"scs_guosheng"*/],
					sgsxjxfzmnl_scs_guosheng: [/*"scs_duangui"*/],
					sgsxjxfzmnl_scs_gaowang: [],
				};
				// if (!get.isLuckyStar(player)) {
				// 	var list = lib.skill.mbdanggu.changshi.map(i => i[0]);
				// 	for (var i of list) {
				// 		var select = list.filter(scs => scs != i && !_status.changshiMap[i].includes(i));
				// 		_status.changshiMap[i].addArray(select.randomGets(get.rand(0, select.length)));
				// 	}
				// }
			}
			return _status.sgsxjxfzmnl_changshiMap;
		},
		async content(event, trigger, player) {
			const list = lib.skill.sgsxjxfzmnl_mbdanggu.changshi.map(i => i[0]);
			player.markAuto("sgsxjxfzmnl_mbdanggu", list);
			game.broadcastAll(
				function (player, list) {
					const cards = [];
					for (let i = 0; i < list.length; i++) {
						const cardname = "huashen_card_" + list[i];
						lib.card[cardname] = {
							fullimage: true,
							image: "character/" + list[i],
						};
						lib.translate[cardname] = get.rawName2(list[i]);
						cards.push(game.createCard(cardname, "", ""));
					}
					player.$draw(cards, "nobroadcast");
				},
				player,
				list
			);
			const next = game.createEvent("sgsxjxfzmnl_mbdanggu_clique");
			next.player = player;
			next.setContent(lib.skill.sgsxjxfzmnl_mbdanggu.contentx);
			await next;
		},
		async contentx(event, trigger, player) {
			let list = player.getStorage("sgsxjxfzmnl_mbdanggu").slice();
			const first = list.randomRemove();
			const others = list.randomGets(4);
			let result;
			if (others.length == 1) {
				result = { bool: true, links: others };
			} else {
				const map = {
						// scs_bilan: "scs_hankui",
						// scs_hankui: "scs_bilan",
						// scs_duangui: "scs_guosheng",
						// scs_guosheng: "scs_duangui",
						这个版本:'没有不认可',
					},
					map2 = lib.skill.sgsxjxfzmnl_mbdanggu.conflictMap(player);
				const conflictList = others.filter(changshi => {
					if (map[first] && others.some(changshi2 => map[first] == changshi2)) {
						return map[first] == changshi;
					} else {
						return map2[first].includes(changshi);
					}
				});
				list = others.slice();
				if (conflictList.length) {
					const conflict = conflictList.randomGet();
					list.remove(conflict);
					game.broadcastAll(
						function (changshi, player) {
							if (lib.config.background_speak) {
								if (player.isUnderControl(true)) {
									game.playAudio("skill", changshi + "_enter");
								}
							}
						},
						conflict,
						player
					);
				}
				result = await player
					.chooseButton(["党锢：请选择结党对象", [[first], "character"], '<div class="text center">可选常侍</div>', [others, "character"]], true)
					.set("filterButton", button => {
						return _status.event.canChoose.includes(button.link);
					})
					.set("canChoose", list)
					.set("ai", button => Math.random() * 10)
					.forResult();
			}
			if (result?.bool) {
				const chosen = result.links[0];
				const skills = [];
				list = lib.skill.sgsxjxfzmnl_mbdanggu.changshi;
				const changshis = [first, chosen];
				player.unmarkAuto("sgsxjxfzmnl_mbdanggu", changshis);
				player.storage.sgsxjxfzmnl_mbdanggu_current = changshis;
				for (const changshi of changshis) {
					for (const cs of list) {
						if (changshi == cs[0]) {
							skills.push(cs[1]);
						}
					}
				}
				if (lib.skill.sgsxjxfzmnl_mbdanggu.isSingleShichangshi(player)) {
					game.broadcastAll(
						function (player, first, chosen) {
							player.name1 = first;
							player.node.avatar.setBackground(first, "character");
							player.node.name.innerHTML = get.slimName(first);
							player.name2 = chosen;
							player.skin.name = first;
							player.skin.name2 = chosen;
							player.classList.add("fullskin2");
							player.node.avatar2.classList.remove("hidden");
							player.node.avatar2.setBackground(chosen, "character");
							player.node.name2.innerHTML = get.slimName(chosen);
							if (player == game.me && ui.fakeme) {
								ui.fakeme.style.backgroundImage = player.node.avatar.style.backgroundImage;
							}
						},
						player,
						first,
						chosen
					);
				}
				game.log(player, "选择了常侍", "#y" + get.translation(changshis));
				if (skills.length) {
					player.addAdditionalSkill("sgsxjxfzmnl_mbdanggu", skills);
					let str = "";
					for (const i of skills) {
						str += "【" + get.translation(i) + "】、";
						player.popup(i);
					}
					str = str.slice(0, -1);
					game.log(player, "获得了技能", "#g" + str);
				}
			}
		},
		isSingleShichangshi(player) {
			var map = lib.skill.sgsxjxfzmnl_mbdanggu.conflictMap(player);
			return player.name == "sgsxjxfzmnl_shichangshi" && ((map[player.name1] && map[player.name2]) || (map[player.name1] && !player.name2) || (!player.name1 && !player.name2) || (player.name == player.name1 && !player.name2));
		},
		mod: {
			aiValue(player, card, num) {
				if (["shan", "tao", "wuxie", "caochuan"].includes(card.name)) {
					return num / 10;
				}
			},
			aiUseful() {
				return lib.skill.mbdanggu.mod.aiValue.apply(this, arguments);
			},
		},
		ai: {
			combo: "mbmowang",
			nokeep: true,
		},
		intro: {
			mark(dialog, storage, player) {
				dialog.addText("剩余常侍");
				dialog.addSmall([storage, "character"]);
				if (player.storage.sgsxjxfzmnl_mbdanggu_current && player.isIn()) {
					dialog.addText("当前常侍");
					dialog.addSmall([player.storage.sgsxjxfzmnl_mbdanggu_current, "character"]);
				}
			},
		},
	},
	sgsxjxfzmnl_mbmowang: {
		audio: 'mbmowang',
		trigger: {
			player: ["dieBefore", "rest"],
		},
		filter(event, player, name) {
			if (name == "rest") {
				return true;
			}
			return event.getParent().name != "giveup" && player.maxHp > 0;
		},
		derivation: "sgsxjxfzmnl_mbmowang_faq",
		forced: true,
		forceDie: true,
		forceOut: true,
		direct: true,
		priority: 15,
		group: ["sgsxjxfzmnl_mbmowang_die", "sgsxjxfzmnl_mbmowang_return"],
		async content(event, trigger, player) {
			if (event.triggername == "rest") {
				game.broadcastAll(
					function (player, list) {
						//player.classList.add("out");
						if (list.includes(player.name1) || player.name1 == "sgsxjxfzmnl_shichangshi") {
							player.smoothAvatar(false);
							player.skin.name = player.name1 + "_dead";
							player.node.avatar.setBackground(player.name1 + "_dead", "character");
						}
						if (list.includes(player.name2) || player.name2 == "sgsxjxfzmnl_shichangshi") {
							player.smoothAvatar(true);
							player.skin.name2 = player.name2 + "_dead";
							player.node.avatar2.setBackground(player.name2 + "_dead", "character");
						}
					},
					player,
					lib.skill.sgsxjxfzmnl_mbdanggu.changshi.map(i => i[0])
				);
				return;
			}
			if (_status._rest_return?.[player.playerid]) {
				trigger.cancel();
			} else {
				if (player.getStorage("sgsxjxfzmnl_mbdanggu").length) {
					player.logSkill("sgsxjxfzmnl_mbmowang");
					/*game.broadcastAll(function () {
						if (lib.config.background_speak) {
							game.playAudio("die", "shichangshiRest");
						}
					});*/
					//煞笔十常侍
					trigger.restMap = {
						type: "round",
						count: 1,
						audio: "shichangshiRest",
					};
					trigger.excludeMark.add("sgsxjxfzmnl_mbdanggu");
					//trigger.noDieAudio = true;
					trigger.includeOut = true;
				} else {
					player.changeSkin("sgsxjxfzmnl_mbmowang", "sgsxjxfzmnl_shichangshi_dead");
				}
			}
		},
		ai: {
			combo: "sgsxjxfzmnl_mbdanggu",
			neg: true,
		},
		subSkill: {
			die: {
				audio: "mbmowang",
				trigger: { player: "phaseAfter" },
				forced: true,
				forceDie: true,
				async content(event, trigger, player) {
					if (lib.skill.sgsxjxfzmnl_mbdanggu.isSingleShichangshi(player)) {
						if (!player.getStorage("sgsxjxfzmnl_mbdanggu").length) {
							game.broadcastAll(function (player) {
								player.name1 = player.name;
								player.skin.name = player.name + "_dead";
								player.smoothAvatar(false);
								player.node.avatar.setBackground(player.name + "_dead", "character");
								player.node.name.innerHTML = get.slimName(player.name);
								delete player.name2;
								delete player.skin.name2;
								player.classList.remove("fullskin2");
								player.node.avatar2.classList.add("hidden");
								player.node.name2.innerHTML = "";
								if (player == game.me && ui.fakeme) {
									ui.fakeme.style.backgroundImage = player.node.avatar.style.backgroundImage;
								}
							}, player);
						}
					}
					if (!player.getStorage("sgsxjxfzmnl_mbdanggu").length) {
						await game.delay();
					}
					await player.die();
				},
			},
			return: {
				trigger: { player: "restEnd" },
				forced: true,
				charlotte: true,
				silent: true,
				forceDie: true,
				forceOut: true,
				filter(event, player) {
					return event.player == player && player.hasSkill("sgsxjxfzmnl_mbdanggu", null, null, false);
				},
				async content(event, trigger, player) {
					game.broadcastAll(function (player) {
						if (player.name1 == "sgsxjxfzmnl_shichangshi") {
							player.smoothAvatar(false);
							player.node.avatar.setBackground(player.name1, "character");
							if (!lib.skill.sgsxjxfzmnl_mbdanggu.isSingleShichangshi(player)) {
								player.skin.name = player.name1;
							}
						}
						if (player.name2 == "sgsxjxfzmnl_shichangshi") {
							player.smoothAvatar(true);
							player.node.avatar2.setBackground(player.name2, "character");
							if (!lib.skill.sgsxjxfzmnl_mbdanggu.isSingleShichangshi(player)) {
								player.skin.name2 = player.name2;
							}
						}
					}, player);
					delete player.storage.sgsxjxfzmnl_mbdanggu_current;
					if (lib.skill.sgsxjxfzmnl_mbdanggu.isSingleShichangshi(player)) {
						game.broadcastAll(function (player) {
							player.name1 = player.name;
							player.skin.name = player.name;
							player.smoothAvatar(false);
							player.node.avatar.setBackground(player.name, "character");
							player.node.name.innerHTML = get.slimName(player.name);
							delete player.name2;
							delete player.skin.name2;
							player.classList.remove("fullskin2");
							player.node.avatar2.classList.add("hidden");
							player.node.name2.innerHTML = "";
							if (player == game.me && ui.fakeme) {
								ui.fakeme.style.backgroundImage = player.node.avatar.style.backgroundImage;
							}
						}, player);
					}
					const next = game.createEvent("sgsxjxfzmnl_mbdanggu_clique");
					next.player = player;
					next.setContent(lib.skill.sgsxjxfzmnl_mbdanggu.contentx);
					await next;
					await player.draw(2);
				},
			},
		},
	},
	//张让
	sgsxjxfzmnl_scstaoluan: {
		audio: 'scstaoluan',
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return player.countCards("hes") > 0;
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				for (var i = 0; i < lib.inpile.length; i++) {
					var name = lib.inpile[i];
					if (name == "sha") {
						list.push(["基本", "", "sha"]);
						for (var j of lib.inpile_nature) {
							list.push(["基本", "", "sha", j]);
						}
					} else if (get.type(name) == "trick") {
						list.push(["锦囊", "", name]);
					} else if (get.type(name) == "basic") {
						list.push(["基本", "", name]);
					} else if (get.type(name) == 'delay') {
						list.push(["延时", "", name]);
					}
				}
				return ui.create.dialog("滔乱", [list, "vcard"]);
			},
			filter(button, player) {
				return _status.event.getParent().filterCard({ name: button.link[2] }, player, _status.event.getParent());
			},
			check(button) {
				var player = _status.event.player;
				if (player.countCards("hs", button.link[2]) > 0) {
					return 0;
				}
				if (button.link[2] == "wugu") {
					return;
				}
				var effect = player.getUseValue(button.link[2]);
				if (effect > 0) {
					return effect;
				}
				return 0;
			},
			backup(links, player) {
				return {
					filterCard: true,
					audio: "scstaoluan",
					selectCard: 1,
					popname: true,
					check(card) {
						return 6 - get.value(card);
					},
					position: "hes",
					viewAs: { name: links[0][2], nature: links[0][3] },
				};
			},
			prompt(links, player) {
				return "将一张牌当做" + (get.translation(links[0][3]) || "") + get.translation(links[0][2]) + "使用";
			},
		},
		ai: {
			order: 4,
			result: {
				player: 1,
			},
			threaten: 1.9,
		},
		group:'sgsxjxfzmnl_scstaoluan_after',
		subSkill: { 
			after:{
				trigger:{player:'useCardAfter'},
				audio:'scstaoluan',
				filter:function(event,player){
					return event.skill&&event.skill=='sgsxjxfzmnl_scstaoluan_backup';
				},
				// direct:true,
				forced:true,
				content:function(){
					// player.logSkill('yb007_chenwang')
					player.draw();
				},
			},
			backup: {} 
		},
	},
	//赵忠
	sgsxjxfzmnl_scschiyan: {
		audio: 'scschiyan',
		trigger: { player: "useCardToPlayered" },
		direct: true,
		filter(event, player) {
			return event.card.name == "sha" && event.target.hp > 0 && event.target.countCards("he") > 0;
		},
		content() {
			"step 0";
			var next = player.choosePlayerCard(trigger.target, "he",[1, Math.min(trigger.target.hp, trigger.target.countCards("he"))], get.prompt("scschiyan", trigger.target));
			next.set("ai", function (button) {
				if (!_status.event.goon) {
					return 0;
				}
				var val = get.value(button.link);
				if (button.link == _status.event.target.getEquip(2)) {
					return 2 * (val + 3);
				}
				return val;
			});
			next.set("goon", get.attitude(player, trigger.target) <= 0);
			next.set("forceAuto", true);
			"step 1";
			if (result.bool) {
				var target = trigger.target;
				player.logSkill("sgsxjxfzmnl_scschiyan", target);
				target.addSkill("sgsxjxfzmnl_scschiyan_get");
				target.addToExpansion("giveAuto", result.cards, target).gaintag.add("sgsxjxfzmnl_scschiyan_get");
			}
		},
		ai: {
			unequip_ai: true,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (get.attitude(player, arg.target) > 0) {
					return false;
				}
				if (tag == "directHit_ai") {
					return arg.target.hp >= Math.max(1, arg.target.countCards("h") - 1);
				}
				if (arg && arg.name == "sha" && arg.target.getEquip(2)) {
					return true;
				}
				return false;
			},
		},
		group: "sgsxjxfzmnl_scschiyan_damage",
		subSkill: {
			get: {
				trigger: { global: "phaseEnd" },
				forced: true,
				popup: false,
				charlotte: true,
				filter(event, player) {
					return player.getExpansions("sgsxjxfzmnl_scschiyan_get").length > 0;
				},
				content() {
					"step 0";
					var cards = player.getExpansions("sgsxjxfzmnl_scschiyan_get");
					player.gain(cards, "draw");
					game.log(player, "收回了" + get.cnNumber(cards.length) + "张“鸱咽”牌");
					"step 1";
					player.removeSkill("sgsxjxfzmnl_scschiyan_get");
				},
				intro: {
					markcount: "expansion",
					mark(dialog, storage, player) {
						var cards = player.getExpansions("sgsxjxfzmnl_scschiyan_get");
						if (player.isUnderControl(true)) {
							dialog.addAuto(cards);
						} else {
							return "共有" + get.cnNumber(cards.length) + "张牌";
						}
					},
				},
			},
			damage: {
				audio: "sgsxjxfzmnl_scschiyan",
				trigger: { source: "damageBegin1" },
				forced: true,
				locked: false,
				logTarget: "player",
				filter(event, player) {
					var target = event.player;
					return event.getParent().name == "sha" && player.countCards("h") >= target.countCards("h") && player.countCards("e") >= target.countCards("e");
				},
				content() {
					trigger.num++;
				},
			},
		},
	},
	//孙璋
	sgsxjxfzmnl_scszimou: {
		audio: 'scszimou',
		trigger: { player: "useCard" },
		forced: true,
		filter(event, player) {
			var evt = event.getParent("phaseUse");
			if (!evt || evt.player != player) {
				return false;
			}
			var num = player.getHistory("useCard", evtx => evtx.getParent("phaseUse") == evt).length;
			return num == 2 || num == 4 || num == 6;
		},
		content() {
			var evt = trigger.getParent("phaseUse");
			var num = player.getHistory("useCard", evtx => evtx.getParent("phaseUse") == evt).length;
			var cards = [];
			if (num == 2) {
				var card = get.cardPile2(card => {
					return card.name == "sha";
				});
				if (card) {
					cards.push(card);
				}
				var card = get.cardPile2(card => {
					return card.name == "shan";
				});
				if (card) {
					cards.push(card);
				}
			} else if (num == 4) {
				var card = get.cardPile2(card => {
					return ["jiu", "xionghuangjiu"].includes(card.name);
				});
				if (card) {
					cards.push(card);
				}
				var card = get.cardPile2(card => {
					return ["tao", "zong"].includes(card.name);
				});
				if (card) {
					cards.push(card);
				}
			} else if (num == 6) {
				var card = get.cardPile2(card => {
					return card.name == "juedou";
				});
				if (card) {
					cards.push(card);
				}
				var card = get.cardPile2(card => {
					return ["wuzhong", "sadouchengbing","dongzhuxianji"].includes(card.name);
				});
				if (card) {
					cards.push(card);
				}
			}
			if (cards.length) {
				player.gain(cards, "gain2");
			}
		},
	},
	//毕岚
	sgsxjxfzmnl_scspicai: {
		audio: 'scspicai',
		enable: "phaseUse",
		usable: 1,
		frequent: true,
		content() {
			"step 0";
			event.cards = [];
			event.suits = [];
			event.numbers = [];
			"step 1";
			player
				.judge(function (result) {
					var evt = _status.event.getParent("sgsxjxfzmnl_scspicai");
					if (evt && evt.suits && evt.suits.includes(get.suit(result))&&evt.numbers&&evt.numbers.includes(get.number(result))) {
						return 0;
					}
					return 1;
				})
				.set("callback", lib.skill.sgsxjxfzmnl_scspicai.callback).judge2 = function (result) {
				return result.bool ? true : false;
			};
			"step 2";
			var cards = cards.filterInD();
			if (cards.length) {
				player.chooseTarget("将" + get.translation(cards) + "交给一名角色", true).set("ai", function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target) / Math.sqrt(1 + target.countCards("h"));
					if (target.hasSkillTag("nogain")) {
						att /= 10;
					}
					return att;
				});
			} else {
				event.finish();
			}
			"step 3";
			if (result.bool) {
				var target = result.targets[0];
				event.target = target;
				player.line(target, "green");
				target.gain(cards, "gain2").giver = player;
			} else {
				event.finish();
			}
		},
		callback() {
			"step 0";
			var evt = event.getParent(2);
			event.getParent().orderingCards.remove(event.judgeResult.card);
			evt.cards.push(event.judgeResult.card);
			if (event.getParent().result.bool) {
				evt.suits.push(event.getParent().result.suit);
				evt.numbers.push(event.getParent().result.number);
				player.chooseBool("是否继续发动【庀材】？").set("frequentSkill", "sgsxjxfzmnl_scspicai");
			} else {
				event._result = { bool: false };
			}
			"step 1";
			if (result.bool) {
				event.getParent(2).redo();
			}
		},
		ai: {
			order: 9,
			result: {
				player: 1,
			},
		},
	},
	//夏恽
	sgsxjxfzmnl_scsyaozhuo: {
		audio: 'scsyaozhuo',
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return game.hasPlayer(function (current) {
				return player.canCompare(current);
			});
		},
		filterTarget(card, player, current) {
			return player.canCompare(current);
		},
		content() {
			"step 0";
			player.chooseToCompare(target);
			"step 1";
			if (result.bool) {
				target.skip("phaseDraw");
				target.addTempSkill("sgsxjxfzmnl_scsyaozhuo_skip", { player: "phaseDrawSkipped" });
			} else {
				// player.chooseToDiscard(2, true, "he");
				player.draw();
			}
		},
		subSkill: {
			skip: {
				mark: true,
				intro: { content: "跳过下一个摸牌阶段" },
			},
		},
		ai: {
			order: 1,
			result: {
				target(player, target) {
					if (target.skipList.includes("phaseDraw") || target.hasSkill("pingkou")) {
						return 0;
					}
					var hs = player.getCards("h").sort(function (a, b) {
						return b.number - a.number;
					});
					var ts = target.getCards("h").sort(function (a, b) {
						return b.number - a.number;
					});
					if (!hs.length || !ts.length) {
						return 0;
					}
					if (hs[0].number > ts[0].number - 2 && hs[0].number > 5) {
						return -1;
					}
					return 0;
				},
			},
		},
	},
	//韩悝
	sgsxjxfzmnl_scsxiaolu: {
		audio: 'scsxiaolu',
		enable: "phaseUse",
		usable: 1,
		content() {
			"step 0";
			player.draw(5);
			"step 1";
			var num = player.countCards("h");
			if (!num) {
				event.finish();
			} else if (num < 5) {
				event._result = { index: 1 };
			} else {
				player
					.chooseControl()
					.set("choiceList", ["将五张牌交给一名其他角色", "弃置五张手牌"])
					.set("ai", function () {
						if (
							game.hasPlayer(function (current) {
								return current != player && get.attitude(player, current) > 0;
							})
						) {
							return 0;
						}
						return 1;
					});
			}
			"step 2";
			if (result.index == 0) {
				player.chooseCardTarget({
					position: "he",
					filterCard: true,
					selectCard: 5,
					filterTarget(card, player, target) {
						return player != target;
					},
					ai1(card) {
						return get.unuseful(card);
					},
					ai2(target) {
						var att = get.attitude(_status.event.player, target);
						if (target.hasSkillTag("nogain")) {
							att /= 10;
						}
						if (target.hasJudge("lebu")) {
							att /= 5;
						}
						return att;
					},
					prompt: "选择五张手牌，交给一名其他角色",
					forced: true,
				});
			} else {
				player.chooseToDiscard(5, true, "h");
				event.finish();
			}
			"step 3";
			if (result.bool) {
				var target = result.targets[0];
				player.give(result.cards, target);
			}
		},
		ai: {
			order: 9,
			result: { player: 2 },
		},
	},
	//栗嵩
	sgsxjxfzmnl_scskuiji: {//完全没有变化
		audio: 'scskuiji',
		enable: "phaseUse",
		usable: 1,
		filterTarget(card, player, target) {
			return target != player && target.countCards("h") > 0;
		},
		content() {
			"step 0";
			event.list1 = [];
			event.list2 = [];
			if (player.countCards("h") > 0) {
				var chooseButton = player.chooseButton(4, ["你的手牌", player.getCards("h"), get.translation(target.name) + "的手牌", target.getCards("h")]);
			} else {
				var chooseButton = player.chooseButton(4, [get.translation(target.name) + "的手牌", target.getCards("h")]);
			}
			chooseButton.set("target", target);
			chooseButton.set("ai", function (button) {
				var player = _status.event.player;
				var target = _status.event.target;
				var ps = [];
				var ts = [];
				for (var i = 0; i < ui.selected.buttons.length; i++) {
					var card = ui.selected.buttons[i].link;
					if (target.getCards("h").includes(card)) {
						ts.push(card);
					} else {
						ps.push(card);
					}
				}
				var card = button.link;
				var owner = get.owner(card);
				var val = get.value(card) || 1;
				if (owner == target) {
					return 2 * val;
				}
				return 7 - val;
			});
			chooseButton.set("filterButton", function (button) {
				if (!lib.filter.canBeDiscarded(button.link, get.player(), get.owner(button.link))) return false
				for (var i = 0; i < ui.selected.buttons.length; i++) {
					if (get.suit(button.link) == get.suit(ui.selected.buttons[i].link)) {
						return false;
					}
				}
				return true;
			});
			"step 1";
			if (result.bool) {
				var list = result.links;
				for (var i = 0; i < list.length; i++) {
					if (get.owner(list[i]) == player) {
						event.list1.push(list[i]);
					} else {
						event.list2.push(list[i]);
					}
				}
				if (event.list1.length && event.list2.length) {
					game.loseAsync({
						lose_list: [
							[player, event.list1],
							[target, event.list2],
						],
						discarder: player,
					}).setContent("discardMultiple");
				} else if (event.list2.length) {
					target.discard(event.list2);
				} else {
					player.discard(event.list1);
				}
			}
		},
		ai: {
			order: 13,
			result: {
				target: -1,
			},
		},
	},
	//段珪
	sgsxjxfzmnl_scschihe: {
		audio: 1,
		trigger: { player: "useCardToPlayered" },
		filter(event, player) {
			return event.targets.length == 1 && event.card.name == "sha";
		},
		prompt2(event, player) {
			var str = "亮出牌堆顶的四张牌并增加伤害；且";
			str += "令" + get.translation(event.target) + "不能使用";
			str += "这四张牌所包含的花色";
			str += "的牌响应" + get.translation(event.card);
			return str;
		},
		logTarget: "target",
		locked: false,
		check(event, player) {
			var target = event.target;
			if (get.attitude(player, target) > 0) {
				return false;
			}
			return true;
		},
		content() {
			var num = 4;
			var evt = trigger.getParent();
			var suit = get.suit(trigger.card);
			var suits = [];
			if (num > 0) {
				if (typeof evt.baseDamage != "number") {
					evt.baseDamage = 1;
				}
				var cards = get.cards(num);
				player.showCards(cards.slice(0), get.translation(player) + "发动了【叱吓】");
				while (cards.length > 0) {
					var card = cards.pop();
					var suitx = get.suit(card, false);
					suits.add(suitx);
					if (suit == suitx) {
						evt.baseDamage++;
					}
				}
				game.updateRoundNumber();
			}
			evt._scschihe_player = player;
			var target = trigger.target;
			target.addTempSkill("sgsxjxfzmnl_scschihe_block");
			if (!target.storage.sgsxjxfzmnl_scschihe_block) {
				target.storage.sgsxjxfzmnl_scschihe_block = [];
			}
			target.storage.sgsxjxfzmnl_scschihe_block.push([evt.card, suits]);
			lib.skill.sgsxjxfzmnl_scschihe.updateBlocker(target);
		},
		updateBlocker(player) {
			var list = [],
				storage = player.storage.sgsxjxfzmnl_scschihe_block;
			if (storage && storage.length) {
				for (var i of storage) {
					list.addArray(i[1]);
				}
			}
			player.storage.sgsxjxfzmnl_scschihe_blocker = list;
		},
		ai: {
			threaten: 2.5,
		},
		subSkill: {
			block: {
				mod: {
					cardEnabled(card, player) {
						if (!player.storage.sgsxjxfzmnl_scschihe_blocker) {
							return;
						}
						var suit = get.suit(card);
						if (suit == "none" || suit == "unsure") {
							return;
						}
						var evt = _status.event;
						if (evt.name != "chooseToUse") {
							evt = evt.getParent("chooseToUse");
						}
						if (!evt || !evt.respondTo || evt.respondTo[1].name != "sha") {
							return;
						}
						if (player.storage.sgsxjxfzmnl_scschihe_blocker.includes(suit)) {
							return false;
						}
					},
				},
				trigger: {
					player: ["damageBefore", "damageCancelled", "damageZero"],
					target: ["shaMiss", "useCardToExcluded", "useCardToEnd"],
					global: ["useCardEnd"],
				},
				forced: true,
				firstDo: true,
				charlotte: true,
				popup: false,
				onremove(player) {
					delete player.storage.sgsxjxfzmnl_scschihe_block;
					delete player.storage.sgsxjxfzmnl_scschihe_blocker;
				},
				filter(event, player) {
					const evt = event.getParent("useCard", true, true);
					if (evt && evt.effectedCount < evt.effectCount) {
						return false;
					}
					if (!event.card || !player.storage.sgsxjxfzmnl_scschihe_block) {
						return false;
					}
					for (var i of player.storage.sgsxjxfzmnl_scschihe_block) {
						if (i[0] == event.card) {
							return true;
						}
					}
					return false;
				},
				content() {
					var storage = player.storage.sgsxjxfzmnl_scschihe_block;
					for (var i = 0; i < storage.length; i++) {
						if (storage[i][0] == trigger.card) {
							storage.splice(i--, 1);
						}
					}
					if (!storage.length) {
						player.removeSkill("sgsxjxfzmnl_scschihe_block");
					} else {
						lib.skill.scschihe.updateBlocker(target);
					}
				},
			},
		},
	},
	//郭胜
	sgsxjxfzmnl_scsniqu: {
		audio: 'scsniqu',
		enable: "phaseUse",
		usable: 1,
		filterTarget: true,
		selectTarget: [1,2],
		content() {
			target.damage("fire");
		},
		ai: {
			expose: 0.2,
			order: 5,
			result: {
				target(player, target) {
					return get.damageEffect(target, player, target, "fire") / 10;
				},
			},
		},
	},
	//高望
	sgsxjxfzmnl_scsmiaoyu: {
		audio: 'scsmiaoyu',
		enable: ["chooseToUse", "chooseToRespond"],
		prompt: "将一张♥牌当做桃，♦牌当做火杀，♣牌当做闪，♠牌当做无懈可击使用或打出",
		viewAs(cards, player) {
			var name = false;
			var nature = null;
			switch (get.suit(cards[0], player)) {
				case "club":
					name = "shan";
					break;
				case "diamond":
					name = "sha";
					nature = "fire";
					break;
				case "spade":
					name = "wuxie";
					break;
				case "heart":
					name = "tao";
					break;
			}
			if (name) {
				return { name: name, nature: nature };
			}
			return null;
		},
		check(card) {
			var player = _status.event.player;
			if (_status.event.type == "phase") {
				var max = 0;
				var name2;
				var list = ["sha", "tao"];
				var map = { sha: "diamond", tao: "heart" };
				for (var i = 0; i < list.length; i++) {
					var name = list[i];
					if (
						player.countCards("hes", function (card) {
							return (name != "sha" || get.value(card) < 5) && get.suit(card, player) == map[name];
						}) > 0 &&
						player.getUseValue({ name: name, nature: name == "sha" ? "fire" : null }) > 0
					) {
						var temp = get.order({ name: name, nature: name == "sha" ? "fire" : null });
						if (temp > max) {
							max = temp;
							name2 = map[name];
						}
					}
				}
				if (name2 == get.suit(card, player)) {
					return name2 == "diamond" ? 5 - get.value(card) : 20 - get.value(card);
				}
				return 0;
			}
			return 1;
		},
		position: "hes",
		filterCard(card, player, event) {
			event = event || _status.event;
			var filter = event._backup.filterCard;
			var name = get.suit(card, player);
			if (name == "club" && filter({ name: "shan", cards: [card] }, player, event)) {
				return true;
			}
			if (name == "diamond" && filter({ name: "sha", cards: [card], nature: "fire" }, player, event)) {
				return true;
			}
			if (name == "spade" && filter({ name: "wuxie", cards: [card] }, player, event)) {
				return true;
			}
			if (name == "heart" && filter({ name: "tao", cards: [card] }, player, event)) {
				return true;
			}
			return false;
		},
		filter(event, player) {
			var filter = event.filterCard;
			if (filter(get.autoViewAs({ name: "sha", nature: "fire" }, "unsure"), player, event) && player.countCards("hes", { suit: "diamond" })) {
				return true;
			}
			if (filter(get.autoViewAs({ name: "shan" }, "unsure"), player, event) && player.countCards("hes", { suit: "club" })) {
				return true;
			}
			if (filter(get.autoViewAs({ name: "tao" }, "unsure"), player, event) && player.countCards("hes", { suit: "heart" })) {
				return true;
			}
			if (filter(get.autoViewAs({ name: "wuxie" }, "unsure"), player, event) && player.countCards("hes", { suit: "spade" })) {
				return true;
			}
			return false;
		},
		precontent() {
			"step 0";
			player.addTempSkill("sgsxjxfzmnl_scsmiaoyu_effect");
		},
		ai: {
			respondSha: true,
			respondShan: true,
			skillTagFilter(player, tag) {
				var name;
				switch (tag) {
					case "respondSha":
						name = "diamond";
						break;
					case "respondShan":
						name = "club";
						break;
					case "save":
						name = "heart";
						break;
				}
				if (!player.countCards("hes", { suit: name })) {
					return false;
				}
			},
			order(item, player) {
				if (player && _status.event.type == "phase") {
					var max = 0;
					var list = ["sha", "tao"];
					var map = { sha: "diamond", tao: "heart" };
					for (var i = 0; i < list.length; i++) {
						var name = list[i];
						if (
							player.countCards("hes", function (card) {
								return (name != "sha" || get.value(card) < 5) && get.suit(card, player) == map[name];
							}) > 0 &&
							player.getUseValue({
								name: name,
								nature: name == "sha" ? "fire" : null,
							}) > 0
						) {
							var temp = get.order({
								name: name,
								nature: name == "sha" ? "fire" : null,
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
		hiddenCard(player, name) {
			if (name == "wuxie" && _status.connectMode && player.countCards("hes") > 0) {
				return true;
			}
			if (name == "wuxie") {
				return player.countCards("hes", { suit: "spade" }) > 0;
			}
			if (name == "tao") {
				return player.countCards("hes", { suit: "heart" }) > 0;
			}
		},
		subSkill: {
			effect: {
				audio: "sgsxjxfzmnl_scsmiaoyu",
				trigger: {
					player: ["useCard", "respond"],
				},
				filter(event, player) {
					return event.skill == "sgsxjxfzmnl_scsmiaoyu";
				},
				direct: true,
				forced: true,
				charlotte: true,
				content() {
					"step 0";
					var next = game.createEvent("sgsxjxfzmnl_scsmiaoyu_tao");
					next.player = player;
					next.setContent(lib.skill.sgsxjxfzmnl_scsmiaoyu_effect['tao']);
				},
				tao() {
					"step 0";
					player
						.chooseTarget(get.prompt("sgsxjxfzmnl_scsmiaoyu"), "获得一名其他角色的一张牌", (card, player, target) => {
							return target.countGainableCards(player, "he") && target != player;
						})
						.set("ai", target => {
							return 1 - get.attitude(_status.event.player, target);
						});
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						player.logSkill("sgsxjxfzmnl_scsmiaoyu_effect", target);
						player.gainPlayerCard(target, "he", true);
					}
				},
			},
		},
	},
	
	//乐蔡文姬
	sgsxjxfzmnl_dcshuangjia: {
		audio: 'dcshuangjia',
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		forced: true,
		filter(event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		content() {
			"step 0";
			var cards = player.getCards("h");
			player.addGaintag(cards, "dcshuangjia_tag");
		},
		mod: {
			ignoredHandcard(card, player) {
				if (card.hasGaintag("dcshuangjia_tag")) {
					return true;
				}
			},
			cardDiscardable(card, player, name) {
				if (name == "phaseDiscard" && card.hasGaintag("dcshuangjia_tag")) {
					return false;
				}
			},
			globalTo(from, to, distance) {
				return (
					distance + to.countCards("h", card => card.hasGaintag("dcshuangjia_tag"))
					// Math.min(
					// 	5,
					// 	to.countCards("h", card => card.hasGaintag("dcshuangjia_tag"))
					// )
				);
			},
		},
		group:['sgsxjxfzmnl_dcshuangjia_after'],
		subSkill:{
			after:{
				audio:'sgsxjxfzmnl_dcshuangjia',
				trigger:{player:'phaseAfter'},
				prompt:'是否将所有手牌标记为“胡笳”？',
				content:function(){
					'step 0';
					var cards=player.getCards('h');
					player.addGaintag(cards,'dcshuangjia_tag');
				}
			}
		},
	},
	sgsxjxfzmnl_dcbeifen: {
		audio: 'dcbeifen',
		trigger: {
			player: ["loseAfter"],
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		filter(event, player) {
			var evt = event.getl(player);
			if (!evt || !evt.hs || !evt.hs.length) {
				return false;
			}
			if(!event.sgsxjxfzmnl_dcbeifen)event.sgsxjxfzmnl_dcbeifen=[];
			if (event.name == "lose") {
				for (var i in event.gaintag_map) {
					if (event.gaintag_map[i].includes("dcshuangjia_tag")) {
						event.cards.forEach(c=>{
							if(c.cardid = i){
								event.sgsxjxfzmnl_dcbeifen.push(c.suit);
							}
						})
					}
				}
				return event.sgsxjxfzmnl_dcbeifen.length>0;
			}
			if(player.hasHistory("lose", evt => {
				if (event != evt.getParent()) {
					return false;
				}
				for (var i in evt.gaintag_map) {
					if (evt.gaintag_map[i].includes("dcshuangjia_tag")) {
						// return true;
						evt.cards.forEach(c=>{
							if(c.cardid = i){
								event.sgsxjxfzmnl_dcbeifen.push(c.suit);
							}
						})
					}
				}
				return event.sgsxjxfzmnl_dcbeifen.length>0;
				// return false;
			}))return true;
		},
		forced: true,
		content() {
			var suits = lib.suit.slice();
			// player.countCards("h", card => {
			// 	if (!card.hasGaintag("dcshuangjia_tag")) {
			// 		return false;
			// 	}
			// 	suits.remove(get.suit(card));
			// });
			var evt=trigger.getl(player);
			if(trigger.sgsxjxfzmnl_dcbeifen?.length){
				trigger.sgsxjxfzmnl_dcbeifen.forEach(suit=>{
					suits.remove(suit);
				})
			}
			// game.log(evt)
			// console.log(evt)
			// if(trigger.name=='lose'){
			// 	for(var i in evt.hs){
			// 		if(evt.hs[i].hasGaintag('dcshuangjia_tag')){
			// 			suits.remove(get.suit(evt.hs[i]));
			// 		}
			// 	}
			// } else {
			// 	player.hasHistory("lose", evt => {
			// 		if (trigger != evt.getParent()) {
			// 			return false;
			// 		}
			// 		for (var i in evt.gaintag_map) {
			// 			if (evt.gaintag_map[i].includes("dcshuangjia_tag")) {
			// 				suits.remove(get.suit(evt.hs[i]));
			// 			}
			// 		}
			// 	});
			// }
			var cards = [];
			while (suits.length) {
				var suit = suits.shift();
				var card = get.cardPile(cardx => {
					return get.suit(cardx, false) == suit;
				});
				if (card) {
					cards.push(card);
				}
			}
			if (cards.length) {
				player.gain(cards, "gain2");
			}
		},
		mod: {
			cardUsable(card, player) {
				// var len = player.countCards("h");
				var cnt = player.countCards("h", card => card.hasGaintag("dcshuangjia_tag"));
				// if (2 * cnt < len) {
				// 	return Infinity;
				// }
				if(cnt>0){
					return Infinity;
				}
			},
			targetInRange(card, player) {
				// var len = player.countCards("h");
				var cnt = player.countCards("h", card => card.hasGaintag("dcshuangjia_tag"));
				// if (2 * cnt < len) {
				// 	return true;
				// }
				if(cnt>0){
					return true;
				}
			},
			aiOrder(player, card, num) {
				if (get.itemtype(card) == "card" && card.hasGaintag("dcshuangjia_tag")) {
					// var suits = lib.suit.slice();
					// player.countCards("h", cardx => {
					// 	if (!cardx.hasGaintag("dcshuangjia_tag")) {
					// 		return false;
					// 	}
					// 	if (card == cardx) {
					// 		return false;
					// 	}
					// 	// suits.remove(get.suit(cardx));
					// });
					// if (suits.length) {
					// 	return num + suits.length * 2.5;
					// }
					return num + 2.5;
				}
			},
		},
	},
	//刘焉
	sgsxjxfzmnl_tushe:{
		audio:'xinfu_tushe',
		mod: {
			aiOrder(player, card, num) {
				if (get.tag(card, "multitarget")) {
					if (player.countCards("h", { type: "basic" })) {
						return num / 10;
					}
					return num * 10;
				}
				if (get.type(card) === "basic") {
					return num + 10;
				}
			},
			aiValue(player, card, num) {
				if (card.name === "zhangba") {
					return 114514;
				}
				if (["shan", "tao", "jiu"].includes(card.name)) {
					if (player.getEquip("zhangba") && player.countCards("hs") > 1) {
						return 0.01;
					}
					return num / 2;
				}
				if (get.tag(card, "multitarget")) {
					return num + game.players.length;
				}
			},
			aiUseful(player, card, num) {
				if (card.name === "zhangba") {
					return 114514;
				}
				if (get.name(card, player) === "shan") {
					if (
						player.countCards("hs", i => {
							if (card === i || (card.cards && card.cards.includes(i))) {
								return false;
							}
							return get.name(i, player) === "shan";
						})
					) {
						return -1;
					}
					return num / Math.pow(Math.max(1, player.hp), 2);
				}
			},
		},
		trigger: {
			player: "useCardToPlayered",
		},
		locked: false,
		frequent: true,
		filter(event, player) {
			// if (get.type(event.card) == "equip") {
			// 	return false;
			// }
			if (event.getParent().triggeredTargets3.length > 1) {
				return false;
			}
			return event.targets.length > 0 && !player.countCards("h", { type: "basic" });
		},
		content() {
			player.draw(trigger.targets.length);
		},
		ai: {
			presha: true,
			pretao: true,
			threaten: 1.8,
			effect: {
				player_use(card, player, target) {
					if (
						typeof card === "object" &&
						card.name !== "shan" &&
						// get.type(card) !== "equip" &&
						!player.countCards("h", i => {
							if (card === i || (card.cards && card.cards.includes(i))) {
								return false;
							}
							return get.type(i) === "basic";
						})
					) {
						let targets = [],
							evt = _status.event.getParent("useCard");
						targets.addArray(ui.selected.targets);
						if (evt && evt.card == card) {
							targets.addArray(evt.targets);
						}
						if (targets.length) {
							return [1, targets.length];
						}
						if (get.tag(card, "multitarget")) {
							return [1, game.players.length - 1];
						}
						return [1, 1];
					}
				},
			},
		},
	
	},
	sgsxjxfzmnl_limu:{
		audioL:'xinfu_limu',
		mod: {
			targetInRange(card, player, target) {
				if (player.countCards("j") /*&& player.inRange(target)*/) {
					return true;
				}
			},
			cardUsableTarget(card, player, target) {
				if (player.countCards("j") /*&& player.inRange(target)*/) {
					return true;
				}
			},
			aiOrder(player, card, num) {
				if (get.type(card, null, player) == "trick" && player.canUse(card, player) && player.canAddJudge(card)) {
					return 15;
				}
			},
		},
		locked: false,
		enable: "phaseUse",
		discard: false,
		filter(event, player) {
			// if (player.hasJudge("lebu")) {
			// 	return false;
			// }
			return player.countCards("hes") > 0;
		},
		viewAs: { name: "lebu" },
		//prepare:"throw",
		position: "hes",
		filterCard(card, player, event) {
			return true;
			// return get.suit(card) == "diamond" && player.canAddJudge({ name: "lebu", cards: [card] });
		},
		selectTarget: 1,
		filterTarget(card, player, target) {
			return target.canAddJudge({ name: "lebu", cards: [card] });
		},
		check(card) {
			var player = _status.event.player;
			if (!player.getEquip("zhangba")) {
				let damaged = player.maxHp - player.hp - 1;
				if (
					player.countCards("h", function (cardx) {
						if (cardx == card) {
							return false;
						}
						if (cardx.name == "tao") {
							if (damaged < 1) {
								return true;
							}
							damaged--;
						}
						return ["shan", "jiu"].includes(cardx.name);
					}) > 0
				) {
					return 0;
				}
			}
			if (card.name == "shan") {
				return 15;
			}
			if (card.name == "tao" || card.name == "jiu") {
				return 10;
			}
			return 9 - get.value(card);
		},
		onuse(links, player) {
			var next = game.createEvent("limu_recover", false, _status.event.getParent());
			next.player = player;
			next.setContent(function () {
				player.recover();
			});
		},
		ai: {
			result: {
				target(player, target) {
					if (player.countCards("hes", "zhangba")) {
						return player.countCards("h", { type: "basic" });
					}
					let res = lib.card.lebu.ai.result.target(player, target);
					if (player.countCards("hs", "sha") >= player.hp) {
						res++;
					}
					if (target.isDamaged()) {
						return res + 2 * Math.abs(get.recoverEffect(target, player, target));
					}
					return res;
				},
				ignoreStatus: true,
			},
			order(item, player) {
				if (player.hp > 1 && player.countCards("j")) {
					return 0;
				}
				return 12;
			},
			effect: {
				target(card, player, target) {
					if (target.isPhaseUsing() && typeof card === "object" && get.type(card, null, target) === "delay" && !target.countCards("j")) {
						let shas =
							target.getCards("hs", i => {
								if (card === i || (card.cards && card.cards.includes(i))) {
									return false;
								}
								return get.name(i, target) === "sha" && target.getUseValue(i) > 0;
							}) - target.getCardUsable("sha");
						if (shas > 0) {
							return [1, 1.5 * shas];
						}
					}
				},
			},
		},
	
	},

	sgsxjxfzmnl_tianzuo: {
		audio: 'tianzuo',
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		forced: true,
		filter(event, player) {
			return (event.name != "phase" || game.phaseNumber == 0) && !lib.inpile.includes("qizhengxiangsheng");
		},
		content() {
			game.addGlobalSkill("tianzuo_global");
			var cards = [];
			for (var i = 2; i < 10; i++) {
				cards.push(game.createCard2("qizhengxiangsheng", i % 2 ? "club" : "spade", i));
			}
			game.broadcastAll(function () {
				lib.inpile.add("qizhengxiangsheng");
			});
			game.cardsGotoPile(cards, () => {
				return ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)];
			});
		},
		group: ["sgsxjxfzmnl_tianzuo_remove",'sgsxjxfzmnl_tianzuo_gain'],
		subSkill: {
			remove: {
				audio: "tianzuo",
				trigger: { target: "useCardToBefore" },
				forced: true,
				priority: 15,
				filter(event, player) {
					return event.card && event.card.name == "qizhengxiangsheng";
				},
				content() {
					trigger.cancel();
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (card && card.name == "qizhengxiangsheng") {
								return "zeroplayertarget";
							}
						},
					},
				},
			},
			global: {
				trigger: { player: "useCardToPlayered" },
				forced: true,
				popup: false,
				filter(event, player) {
					return event.card.name == "qizhengxiangsheng";
				},
				content() {
					"step 0";
					var target = trigger.target;
					event.target = target;
					player
						.chooseControl("奇兵", "正兵")
						.set("prompt", "请选择" + get.translation(target) + "的标记")
						.set(
							"choice",
							(function () {
								var e1 = 1.5 * get.sgn(get.damageEffect(target, player, target));
								var e2 = 0;
								if (target.countGainableCards(player, "h") > 0 && !target.hasSkillTag("noh")) {
									e2 = -1;
								}
								var es = target.getGainableCards(player, "e");
								if (es.length) {
									e2 = Math.min(
										e2,
										(function () {
											var max = 0;
											for (var i of es) {
												max = Math.max(max, get.value(i, target));
											}
											return -max / 4;
										})()
									);
								}
								if (Math.abs(e1 - e2) <= 0.3) {
									return Math.random() < 0.5 ? "奇兵" : "正兵";
								}
								if (e1 < e2) {
									return "奇兵";
								}
								return "正兵";
							})()
						)
						.set("ai", function () {
							return _status.event.choice;
						});
					"step 1";
					var map = trigger.getParent().customArgs,
						id = target.playerid;
					if (!map[id]) {
						map[id] = {};
					}
					map[id].qizheng_name = result.control;
				},
			},
			rewrite: {
				audio: "tianzuo",
				trigger: { global: "useCardToTargeted" },
				filter(event, player) {
					return event.card.name == "qizhengxiangsheng";
				},
				logTarget: "target",
				prompt2: "观看其手牌并修改“奇正相生”标记",
				content() {
					"step 0";
					var target = trigger.target;
					event.target = target;
					if (player != target && target.countCards("h") > 0) {
						player.viewHandcards(target);
					}
					player
						.chooseControl("奇兵", "正兵")
						.set("prompt", "请选择" + get.translation(target) + "的标记")
						.set(
							"choice",
							(function () {
								var shas = target.getCards("h", "sha"),
									shans = target.getCards("h", "shan");
								var e1 = 1.5 * get.sgn(get.damageEffect(target, player, target));
								var e2 = 0;
								if (target.countGainableCards(player, "h") > 0 && !target.hasSkillTag("noh")) {
									e2 = -1;
								}
								var es = target.getGainableCards(player, "e");
								if (es.length) {
									e2 = Math.min(
										e2,
										(function () {
											var max = 0;
											for (var i of es) {
												max = Math.max(max, get.value(i, target));
											}
											return -max / 4;
										})()
									);
								}
								if (get.attitude(player, target) > 0) {
									if (shas.length >= Math.max(1, shans.length)) {
										return "奇兵";
									}
									if (shans.length > shas.length) {
										return "正兵";
									}
									return e1 > e2 ? "奇兵" : "正兵";
								}
								if (shas.length) {
									e1 = -0.5;
								}
								if (shans.length) {
									e2 = -0.7;
								}
								if (Math.abs(e1 - e2) <= 0.3) {
									return Math.random() < 0.5 ? "奇兵" : "正兵";
								}
								var rand = Math.random();
								if (e1 < e2) {
									return rand < 0.1 ? "奇兵" : "正兵";
								}
								return rand < 0.1 ? "正兵" : "奇兵";
							})()
						)
						.set("ai", () => _status.event.choice);
					"step 1";
					var map = trigger.getParent().customArgs,
						id = target.playerid;
					if (!map[id]) {
						map[id] = {};
					}
					map[id].qizheng_name = result.control;
					map[id].qizheng_aibuff = get.attitude(player, target) > 0;
				},
			},
			gain:{
				audio: "tianzuo",
				trigger:{player:'phaseDrawBegin'},
				filter:function(event,player){
					var card = get.cardPile("qizhengxiangsheng", "field");
					if (card) {
						// player.gain(card, "gain2", "log");
						//摘自武继
						return true;
					}
				},
				forced:true,
				content:function(){

					player.gain(get.cardPile("qizhengxiangsheng", "field"), "gain2", "log");

				},
			},
		},
	},
	sgsxjxfzmnl_lingce: {
		audio: 'lingce',
		init: player => {
			game.addGlobalSkill("sgsxjxfzmnl_lingce_global");
		},
		trigger: { global: "useCard" },
		forced: true,
		filter(event, player) {
			// if (!event.card.isCard || !event.cards || event.cards.length !== 1) {
			// 	return false;
			// }
			return event.card.name == "qizhengxiangsheng" || get.zhinangs().includes(event.card.name) || player.getStorage("sgsxjxfzmnl_dinghan").includes(event.card.name);
		},
		content() {
			player.draw();
		},
		subSkill: {
			global: {
				ai: {
					effect: {
						player_use(card, player, target) {
							if (typeof card !== "object") {
								return;
							}
							let num = 0,
								nohave = true;
							game.countPlayer(i => {
								if (i.hasSkill("sgsxjxfzmnl_lingce", null, null, false)) {
									nohave = false;
									if (
										i.isIn() &&
										lib.skill.sgsxjxfzmnl_lingce.filter(
											{
												card: card,
												cards: card.cards ? card.cards : [card],
											},
											i
										)
									) {
										num += get.sgnAttitude(player, i);
									}
								}
							}, true);
							if (nohave) {
								game.removeGlobalSkill("sgsxjxfzmnl_lingce_global");
							} else {
								return [1, 0.8 * num];
							}
						},
					},
				},
			},
		},
	},
	sgsxjxfzmnl_dinghan: {
		audio: 'dinghan',
		trigger: {
			target: "useCardToTarget",
			player: "addJudgeBefore",
		},
		forced: true,
		locked: false,
		filter(event, player) {
			if (event.name == "useCardToTarget" && get.type(event.card, null, false) != "trick") {
				return false;
			}
			return !player.getStorage("sgsxjxfzmnl_dinghan").includes(event.card.name);
		},
		content() {
			// player.markAuto("dinghan", [trigger.card.name]);
			if (trigger.name == "addJudge") {
				trigger.cancel();
				var owner = get.owner(trigger.card);
				if (owner && owner.getCards("hej").includes(trigger.card)) {
					owner.lose(trigger.card, ui.discardPile);
				} else {
					game.cardsDiscard(trigger.card);
				}
				game.log(trigger.card, "进入了弃牌堆");
			} else {
				trigger.targets.remove(player);
				trigger.getParent().triggeredTargets2.remove(player);
				trigger.untrigger();
			}
		},
		onremove: true,
		intro: { content: "已记录牌名：$" },
		group: "sgsxjxfzmnl_dinghan_add",
		subSkill: {
			add: {
				trigger: { player: "phaseBegin" },
				direct: true,
				content() {
					'step 0'
					var dialog = [get.prompt('sgsxjxfzmnl_dinghan')];
					(list1 = player.getStorage("sgsxjxfzmnl_dinghan")),
						(list2 = lib.inpile.filter(function (i) {
							return get.type2(i, false) == "trick" && !list1.includes(i);
						}));
					if (list1.length) {
						dialog.push('<div class="text center">已记录</div>');
						dialog.push([list1, "vcard"]);
					}
					if (list2.length) {
						dialog.push('<div class="text center">未记录</div>');
						dialog.push([list2, "vcard"]);
					}
					player.chooseButton(dialog,[1,Infinity]).set("ai", function (button) {
						var player = _status.event.player,
							name = button.link[2];
						if (player.getStorage("sgsxjxfzmnl_dinghan").includes(name)) {
							return -get.effect(player, { name: name }, player, player);
						} else {
							return get.effect(player, { name: name }, player, player) * (1 + player.countCards("hs", name));
						}
					});
					'step 1'
					player.logSkill("sgsxjxfzmnl_dinghan");
					var listx=[],listy=[];
					for(var i of  result.links){
						var name = i[2];
						if (player.getStorage("sgsxjxfzmnl_dinghan").includes(name)) {
							listx.push([name])
							player.unmarkAuto("sgsxjxfzmnl_dinghan", [name]);
							// game.log(player, "从定汉记录中移除了", "#y" + get.translation(name));
						} else {
							listy.push([name])
							player.markAuto("sgsxjxfzmnl_dinghan", [name]);
							// game.log(player, "向定汉记录中添加了", "#y" + get.translation(name));
						}

					}
					
					if(listx.length){
						// player.unmarkAuto("sgsxjxfzmnl_dinghan", listx);
						game.log(player, "从定汉记录中移除了", "#y" + get.translation(listx));
					}
					if(listy.length){
						// player.markAuto("sgsxjxfzmnl_dinghan", listy);
						game.log(player, "向定汉记录中添加了", "#y" + get.translation(listy));
					}
					game.delayx();
				},
			},
		},
	},




















































	
}