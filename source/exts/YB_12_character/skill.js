import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

/** @type { importCharacterConfig['skill'] } */
const skill = {

	//---------------------------三国杀开局大宝直接秒杀
	//魔周泰
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
		audio: 'kuangfeng',
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
					i.addTempSkill('sgskjdbzjms_cifu_draw',{player:'phaseDrawAfter'})
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
						var str='';
						if(player.hasSkill('sgskjdbzjms_cifu'))str+= '若你有三个“福”，当你受到属性伤害时，防止之。';
						if(player.hasSkill('sgskjdbzjms_cifu_draw'))str+= '摸牌阶段额外摸两张牌，然后移去“福”。'
						return str;
					},
				},
				trigger:{
					player:['phaseDrawBegin','damageBegin4'],
				},
				filter(event,player,name){
					if(name=='damageBegin4')return player.countMark('sgskjdbzjms_cifu_mark')>=3&&player.hasSkill('sgskjdbzjms_cifu');
					return player.countMark('sgskjdbzjms_cifu_mark')&&!player.hasSkill('sgskjdbzjms_cifu_draw');
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
			},
			draw:{
				charlotte:true,
			},
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
			player.addSkill("qmsgswkjsgj_xianfu2");

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
	
	qmsgswkjsgj_xianfu2:{
		audio: "xianfu",
		charlotte: true,
		trigger: { global: ["damageEnd", "recoverEnd"] },
		forced: true,
		sourceSkill: "qmsgswkjsgj_xianfu",
		filter(event, player) {
			if (event.player.isDead() || !player.storage.xianfu2 || !player.storage.xianfu2.includes(event.player) || event.num <= 0) {
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
			if (!target.storage.xianfu_mark) {
				target.storage.xianfu_mark = [];
			}
			target.storage.xianfu_mark.add(player);
			target.storage.xianfu_mark.sortBySeat();
			target.markSkill("xianfu_mark");
			game.delayx();
			"step 1";
			var card = trigger.card?trigger.card:null;
			var source = trigger.source ? trigger.source : "nosource";
			var nature = trigger.nature ? trigger.nature : null;
			player[trigger.name](trigger.num,card,source,nature);
		},
		onremove(player) {
			if (!player.storage.xianfu2) {
				return;
			}
			game.countPlayer(function (current) {
				if (player.storage.xianfu2.includes(current) && current.storage.xianfu_mark) {
					current.storage.xianfu_mark.remove(player);
					if (!current.storage.xianfu_mark.length) {
						current.unmarkSkill("xianfu_mark");
					} else {
						current.markSkill("xianfu_mark");
					}
				}
			});
			delete player.storage.xianfu2;
		},
		group: "qmsgswkjsgj_xianfu3",
	},
	qmsgswkjsgj_xianfu3: {
		trigger: { global: "dieBegin" },
		silent: true,
		sourceSkill: "xianfu",
		filter(event, player) {
			return event.player == player || (player.storage.xianfu2 && player.storage.xianfu2.includes(player));
		},
		content() {
			if (player == trigger.player) {
				lib.skill.qmsgswkjsgj_xianfu2.onremove(player);
			} else {
				player.storage.xianfu2.remove(event.player);
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
		audio: 'mizhao',
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
	// qmsgswkjsgj_baolian: {
	// 	trigger: { player: "phaseJieshuBegin" },
	// 	forced: true,
	// 	content: function () {
	// 		player.draw(2);
	// 	},
	// },
	// qmsgswkjsgj_taiping: {
	// 	trigger: { player: "phaseDrawBegin" },
	// 	forced: true,
	// 	content: function () {
	// 		trigger.num += 2;
	// 	},
	// },


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
			if(player.hasSkill('qixing'))player.chooseCardButton(event.cards,1);
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
					return ["juedou",'guohe'].includes(card.name);
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
							["qmsgswkjsgj_shenci_miaojian", '使用2积分升级【' + get.translation('qmsgswkjsgj_shenci_miaojian') + '】'],
							["qmsgswkjsgj_shhlianhua", '使用2积分升级【' + get.translation('qmsgswkjsgj_shhlianhua') + '】'],
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
							event.parent?.controls?.[0]?.classList.remove('disabled');
							game.check();
						},
					},
				});
				if (result?.bool && result.links?.length) {
					const qmsgswkjsgj_miaojian = result.links.filter(i => i === 'qmsgswkjsgj_miaojian').length;
					if (qmsgswkjsgj_miaojian > 0) {
						player.addMark("qmsgswkjsgj_miaojian", qmsgswkjsgj_miaojian, false);
						player.popup('qmsgswkjsgj_miaojian');
						game.log(player, '升级了技能', '#g【' + get.translation('qmsgswkjsgj_miaojian') + '】');
					}
					const qmsgswkjsgj_shhlianhua = result.links.filter(i => i === "qmsgswkjsgj_shhlianhua").length;
					if (qmsgswkjsgj_shhlianhua > 0) {
						player.addMark("qmsgswkjsgj_shhlianhua", qmsgswkjsgj_shhlianhua, false);
						player.popup('qmsgswkjsgj_shhlianhua');
						game.log(player, '升级了技能', '#g【' + get.translation('qmsgswkjsgj_shhlianhua') + '】');
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
	qmsgswkjsgj_shhlianhua:{
		audio: "shhlianhua",
		derivation: ["qmsgswkjsgj_shhlianhua1", "qmsgswkjsgj_shhlianhua2"],
		trigger: { target: "useCardToTargeted" },
		forced: true,
		locked: false,
		filter: event => event.card.name == "sha",
		content() {
			"step 0";
			player.draw();
			var level = player.countMark("qmsgswkjsgj_shhlianhua");
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
			// 						suits = get.event().suits;
			// 					if (!get.event().goon) {
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
	//缝神鲁肃
	qmsgswkjsgj_tamo: {
		available(mode) {
			// 走另外的phaseLoop的模式/子模式/设置
			if (["boss", "stone", "tafang"].includes(mode) || ["jiange", "standard", "three", "leader"].includes(_status.mode) || get.config("seat_order") === "指定") {
				return false;
			}
		},
		getTargets() {
			return game.filterPlayer(current => {
				// return !current.isZhu2();
				return true;
			});
		},
		audio: 'tamo',
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		filter(event, player) {
			return (event.name != "phase" || game.phaseNumber == 0) && get.info("qmsgswkjsgj_tamo").getTargets().length > 1;
		},
		seatRelated: "changeSeat",
		derivation: "qmsgswkjsgj_tamo_faq",
		async cost(event, trigger, player) {
			const toSortPlayers = get.info(event.skill).getTargets();
			toSortPlayers.sortBySeat(game.findPlayer2(current => current.getSeatNum() == 1, true));
			const next = player.chooseToMove("榻谟：是否分配所有角色的座次？");
			next.set("list", [["（以下排列的顺序即为发动技能后角色的座次顺序）", [toSortPlayers.map(i => `${i.getSeatNum()}|${i.name}`), lib.skill.qmsgswkjsgj_tamo.$createButton]]]);
			next.set("toSortPlayers", toSortPlayers.slice(0));
			next.set("processAI", () => {
				const players = get.event().toSortPlayers,
					player = get.player();
				players.randomSort().sort((a, b) => get.attitude(player, b) - get.attitude(player, a));
				return [players.map(i => `${i.getSeatNum()}|${i.name}`)];
			});
			const { result } = await next;
			event.result = {
				bool: result?.bool,
				cost_data: [toSortPlayers, result?.moved],
			};
		},
		async content(event, trigger, player) {
			const [toSortPlayers, moved] = event.cost_data;
			const resultList = moved[0].map(info => {
				return parseInt(info.split("|")[0]);
			});
			const toSwapList = [];
			const cmp = (a, b) => {
				return resultList.indexOf(a) - resultList.indexOf(b);
			};
			for (let i = 0; i < toSortPlayers.length; i++) {
				for (let j = 0; j < toSortPlayers.length; j++) {
					if (cmp(toSortPlayers[i].getSeatNum(), toSortPlayers[j].getSeatNum()) < 0) {
						toSwapList.push([toSortPlayers[i], toSortPlayers[j]]);
						[toSortPlayers[i], toSortPlayers[j]] = [toSortPlayers[j], toSortPlayers[i]];
					}
				}
			}
			game.broadcastAll(toSwapList => {
				for (const list of toSwapList) {
					game.swapSeat(list[0], list[1], false);
				}
			}, toSwapList);
			if (trigger.name === "phase" && /*!trigger.player.isZhu2() && */trigger.player !== toSortPlayers[0] && !trigger._finished) {
				trigger.finish();
				trigger._triggered = 5;
				const evt = toSortPlayers[0].insertPhase();
				delete evt.skill;
				const evt2 = trigger.getParent();
				if (evt2.name == "phaseLoop" && evt2._isStandardLoop) {
					evt2.player = toSortPlayers[0];
				}
				//跳过新回合的phaseBefore
				evt.pushHandler("onPhase", (event, option) => {
					if (event.step === 0 && option.state === "begin") {
						event.step = 1;
					}
				});
			}
			await game.delay();
		},
		$createButton(item, type, position, noclick, node) {
			const info = item.split("|"),
				_item = item;
			const seat = parseInt(info[0]);
			item = info[1];
			if (node) {
				node.classList.add("button");
				node.classList.add("character");
				node.style.display = "";
			} else {
				node = ui.create.div(".button.character", position);
			}
			node._link = item;
			node.link = item;

			const func = function (node, item) {
				const currentPlayer = game.findPlayer(current => current.getSeatNum() == seat);
				if (currentPlayer.classList.contains("unseen_show")) {
					node.setBackground("hidden_image", "character");
				} else if (item != "unknown") {
					node.setBackground(item, "character");
				}
				if (node.node) {
					node.node.name.remove();
					node.node.hp.remove();
					node.node.group.remove();
					node.node.intro.remove();
					if (node.node.replaceButton) {
						node.node.replaceButton.remove();
					}
				}
				node.node = {
					name: ui.create.div(".name", node),
					group: ui.create.div(".identity", node),
					intro: ui.create.div(".intro", node),
				};
				const infoitem = [currentPlayer.sex, currentPlayer.group, `${currentPlayer.hp}/${currentPlayer.maxHp}/${currentPlayer.hujia}`];
				node.node.name.innerHTML = get.slimName(item);
				if (lib.config.buttoncharacter_style == "default" || lib.config.buttoncharacter_style == "simple") {
					if (lib.config.buttoncharacter_style == "simple") {
						node.node.group.style.display = "none";
					}
					node.classList.add("newstyle");
					node.node.name.dataset.nature = get.groupnature(get.bordergroup(infoitem));
					node.node.group.dataset.nature = get.groupnature(get.bordergroup(infoitem), "raw");
				}
				node.node.name.style.top = "8px";
				if (node.node.name.querySelectorAll("br").length >= 4) {
					node.node.name.classList.add("long");
					if (lib.config.buttoncharacter_style == "old") {
						node.addEventListener("mouseenter", ui.click.buttonnameenter);
						node.addEventListener("mouseleave", ui.click.buttonnameleave);
					}
				}
				node.node.intro.innerHTML = lib.config.intro;
				if (!noclick) {
					lib.setIntro(node);
				}
				node.node.group.innerHTML = `<div>${get.cnNumber(seat, true)}号</div>`;
				node.node.group.style.backgroundColor = get.translation(`${get.bordergroup(infoitem)}Color`);
			};
			node.refresh = func;
			node.refresh(node, item);

			node.link = _item;
			node.seatNumber = seat;
			node._customintro = uiintro => {
				uiintro.add(`${get.translation(node._link)}(原${get.cnNumber(node.seatNumber, true)}号位)`);
			};
			return node;
		},
	},
	qmsgswkjsgj_dingzhou: {
		audio: 'dingzhou',
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			const num = player.countCards("he");
			return game.hasPlayer(current => {
				if (current == player) {
					return false;
				}
				const total = current.countCards("ej");
				return total > 0 && num >= total;
			});
		},
		filterCard: true,
		selectCard() {
			// return [1, Math.max(...game.filterPlayer(i => i != get.player()).map(i => i.countCards("ej")))];
			return 1;
		},
		check(card) {
			return 7 - get.value(card);
		},
		filterTarget(card, player, target) {
			const num = target.countCards("ej");
			if (!num) {
				return false;
			}
			return /*ui.selected.cards.length == num &&*/ player != target;
		},
		// filterOk() {
		// 	return ui.selected.cards.length == ui.selected.targets[0].countCards("ej");
		// },
		position: "he",
		lose: false,
		discard: false,
		delay: false,
		async content(event, trigger, player) {
			const target = event.targets[0];
			await player.give(event.cards, target);
			const cards = target.getGainableCards(player, "ej");
			if (cards.length) {
				player.gain(cards, "give", target);
			}
		},
		ai: {
			order: 9,
			result: {
				target(player, target) {
					let eff = 0;
					if (ui.selected.cards.length) {
						eff = ui.selected.cards.map(card => get.value(card)).reduce((p, c) => p + c, 0);
					}
					if (player.hasSkill("qmsgswkjsgj_zhimeng") && (get.mode() == "identity" || player.countCards("h") - target.countCards("h") > 2 * ui.selected.cards.length)) {
						eff *= 1 + get.sgnAttitude(player, target) * 0.15;
					}
					const es = target.getCards("e"),
						js = target.getCards("j");
					es.forEach(card => {
						eff -= get.value(card, target);
					});
					js.forEach(card => {
						eff -= get.effect(
							target,
							{
								name: card.viewAs || card.name,
								cards: [card],
							},
							target,
							target
						);
					});
					return eff;
				},
			},
		},
	},
	//什么均贫卡
	qmsgswkjsgj_zhimeng: {
		audio: 'zhimeng',
		trigger: { player: "phaseAfter" },
		filter(event, player) {
			return game.hasPlayer(target => {
				if (target == player || target.countCards("h") + player.countCards("h") == 0) {
					return false;
				}
				return true;
			});
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt(event.skill), "与一名其他角色交换手牌", (card, player, target) => {
					if (target == player || target.countCards("h") + player.countCards("h") == 0) {
						return false;
					}
					return true;
				})
				.set("ai", target => {
					const player = get.player();
					const pvalue = -player
						.getCards("h")
						.map(card => get.value(card, player))
						.reduce((p, c) => p + c, 0);
					const tvalue =
						-target
							.getCards("h")
							.map(card => get.value(card, target))
							.reduce((p, c) => p + c, 0) * get.sgnAttitude(player, target);
					return (pvalue + tvalue) / 2;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			player.swapHandcards(target);
		},
		ai: { threaten: 4 },
	},

	//界孙权
	qmsgswkjsgj_rezhiheng:{
		audio:'rezhiheng',
		enable: "phaseUse",
		usable: 1,
		check(card) {
			return true;
		},
		content(){
			'step 0'
			event.num = player.countCards('he');
			'step 1'
			player.draw(event.num+1);
			'step 2'
			player.chooseToDiscard(true,event.num);
		},
		ai:{
			order:10,
			result:{
				player:function(player){
					return player.countCards('h')+1;
				}
			}
		}
	},
	qmsgswkjsgj_rejiuyuan:{
		audio:'rejiuyuan',
		zhuSkill: true,
		trigger: { global: "recoverBefore" },
		direct: true,
		filter(event, player) {
			return player != event.player && event.player.group == "wu"  && event.getParent().name != "qmsgswkjsgj_rejiuyuan" && player.hasZhuSkill("qmsgswkjsgj_rejiuyuan", event.player);
		},
		content() {
			"step 0";
			trigger.player.chooseBool("是否对" + get.translation(player) + "发动【救援】？", "改为令其回复1点体力，然后你摸一张牌").set("ai", function () {
				var evt = _status.event;
				return get.attitude(evt.player, evt.getParent().player) > 0;
			});
			"step 1";
			if (result.bool) {
				player.logSkill("qmsgswkjsgj_rejiuyuan");
				trigger.player.line(player, "green");
				trigger.cancel();
				player.recover(trigger.player);
				trigger.player.draw();
			}
		},

	},
	//缝神周瑜
	qmsgswkjsgj_qinyin:{
		audio:'qinyin',
		trigger:{player:'phaseDiscardEnd'},
		filter(event,player){
			return true;
		},
		cost(){
			'step 0'
			var list = [];
			if(!event.listx) event.listx = [];
			if(game.countPlayer(current=>current.isDamaged())){
				list.push('回复')
			}
			list.push('流失')
			list.push('伤害')
			list.push('cancel2')
			player.chooseControl(list).set('prompt',get.prompt(event.skill)).set('ai',function(control){
				var num1 = game.filterPlayer(current=>current.isDamaged()&&get.recoverEffect(current,player,player)).length*2;
				var num2 = game.filterPlayer(current=>get.damageEffect(current,player,player)>0).length;
				var num3 = game.filterPlayer(current=>get.attitude(player,current)<0).length;
				if((num1>num2||num1>num3)&&!event.listx.includes('回复')){
					return '回复'
				}
				else if(num2>num3&&!event.listx.includes('伤害')){
					return '伤害'
				}
				else if(num3>0&&!event.listx.includes('流失')){
					return '流失'
				}
				else{
					return 'cancel2'
				}
			})
			'step 1'
			if(result.control=='cancel2'){
				event.finish();
			}
			else{
				event.listx.push(result.control)
				event.control = result.control;
				player.chooseTarget([1,Infinity],'令任意名角色'+result.control+'一点体力',function(card,player,target){
					if(result.control=='回复'){
						return target.isDamaged()
					}
					else return true;
				}).set('ai',function(target){
					if(result.control=='回复'){
						return get.recoverEffect(target,player,player)
					}
					else if(result.control=='伤害'){
						return get.damageEffect(target,player,player)
					}
					else if(result.control=='流失'){
						return get.attitude(player,target)<0
					}
				})
			}
			'step 2'
			if(result.bool){
				event.result = {
					bool:true,
					cost_data:event.control,
					targets:result.targets,
				}
			}
			else {
				event.goto(0);
			}
		},
		async content(event,trigger,player){
			var control = event.cost_data;
			var targets = event.targets;
			targets.sortBySeat(player)
			for(var i=0;i<targets.length;i++){
				if(control=='回复'){
					await targets[i].recover();
				}
				else if(control=='伤害'){
					await targets[i].damage();
				}
				else if(control=='流失'){
					await targets[i].loseHp();
				}
			}
		},
	},
	qmsgswkjsgj_yeyan: {
		// limited: true,
		usable: 1,
		audio: 'yeyan',
		enable: "phaseUse",
		filterCard(card, player) {
			return !ui.selected.cards.some(cardx => get.suit(cardx, player) == get.suit(card, player));
		},
		selectCard: [0, 4],
		filterTarget(card, player, target) {
			var length = ui.selected.cards.length;
			return length == 0 || length == 4;
		},
		selectTarget() {
			if (ui.selected.cards.length == 4) {
				return [1, 2];
			}
			if (ui.selected.cards.length == 0) {
				return [1, 3];
			}
			game.uncheck("target");
			return [1, 3];
		},
		complexCard: true,
		complexSelect: true,
		line: "fire",
		forceDie: true,
		animationColor: "metal",
		skillAnimation: "legend",
		// check(card) {
		// 	// if (!lib.skill.qmsgswkjsgj_yeyan.getBigFire(get.event().player)) {
		// 	// 	return -1;
		// 	// }
		// 	// return 1 / (get.value(card) || 0.5);
		// 	return 1;
		// },
		check(card){
			return false;
		},
		multitarget: true,
		multiline: true,
		// contentBefore() {
		// 	player.awakenSkill(event.skill);
		// },
		content() {
			"step 0";
			event.num = 0;
			targets.sortBySeat();
			"step 1";
			if (cards.length == 4) {
				event.goto(2);
			} else {
				if (event.num < targets.length) {
					targets[event.num].damage("fire", 1, "nocard");
					event.num++;
				}
				if (event.num == targets.length) {
					event.finish();
				} else {
					event.redo();
				}
			}
			"step 2";
			// player.loseHp(3);
			if (targets.length == 1) {
				event.goto(4);
			} else {
				player
					.chooseTarget("请选择受到2点伤害的角色", true, function (card, player, target) {
						return _status.event.targets.includes(target);
					})
					.set("ai", function (target) {
						return 1;
					})
					.set("forceDie", true)
					.set("targets", targets);
			}
			"step 3";
			if (event.num < targets.length) {
				var dnum = 1;
				if (result.bool && result.targets && targets[event.num] == result.targets[0]) {
					dnum = 2;
				}
				targets[event.num].damage("fire", dnum, "nocard");
				event.num++;
			}
			if (event.num == targets.length) {
				event.finish();
			} else {
				event.redo();
			}
			"step 4";
			player
				.chooseControl("2点", "3点")
				.set("prompt", "请选择伤害点数")
				.set("ai", function () {
					return "3点";
				})
				.set("forceDie", true);
			"step 5";
			targets[0].damage("fire", result.control == "2点" ? 2 : 3, "nocard");
		},
		ai: {
			order(item, player) {
				// return lib.skill.qmsgswkjsgj_yeyan.getBigFire(player) ? 10 : 1;
				return 10;
			},
			fireAttack: true,
			result: {
				player(player, target) {
					return get.damageEffect(target, player, player, "fire");
				},
				target(player, target) {
					return get.damageEffect(target, player, target, "fire");
				},
			},
		},
		// getBigFire(player) {
		// 	if (player.getDiscardableCards(player, "h").reduce((list, card) => list.add(get.suit(card, player)), []).length < 4) {
		// 		return false;
		// 	}
		// 	const targets = game.filterPlayer(target => get.damageEffect(target, player, player, "fire") && target.hp <= 3 && !target.hasSkillTag("filterDamage", null, { player: player }));
		// 	if (!targets.length) {
		// 		return false;
		// 	}
		// 	if (targets.length == 1 || targets.some(target => get.attitude(player, target) < 0 && target.identity && target.identity.indexOf("zhu") != -1)) {
		// 		let suits = player.getDiscardableCards(player, "h").reduce((map, card) => {
		// 				const suit = get.suit(card, player);
		// 				if (!map[suit]) {
		// 					map[suit] = [];
		// 				}
		// 				return map;
		// 			}, {}),
		// 			cards = [];
		// 		Object.keys(suits).forEach(i => {
		// 			suits[i].addArray(player.getDiscardableCards(player, "h").filter(card => get.suit(card) == i));
		// 			cards.add(suits[i].sort((a, b) => get.value(a) - get.value(b))[0]);
		// 		});
		// 		return player.countCards("h", card => !cards.includes(card) ) > 0;
		// 	}
		// 	return false;
		// },
	},
	qmsgswkjsgj_refanjian:{
		audio:'refanjian',
		enable:'phaseUse',
		usable:1,
		filter(event, player) {
			return player.countCards("h") > 0;
		},
		filterTarget(card, player, target) {
			return player != target;
		},
		filterCard: true,
		check(card) {
			return 8 - get.value(card);
		},
		discard: false,
		lose: false,
		delay: false,
		content() {
			"step 0";
			target.storage.qmsgswkjsgj_refanjian = cards[0];
			player.give(cards[0], target);
			"step 1";
			target.showHandcards();
			var suit = get.suit(target.storage.qmsgswkjsgj_refanjian);
			if (!target.countCards("h")) {
				event._result = { control: "qmsgswkjsgj_refanjian_hp" };
			} else {
				player.chooseControl("qmsgswkjsgj_refanjian_card", "qmsgswkjsgj_refanjian_hp").ai = function (event, player) {
					var cards = target.getCards("he", { suit: get.suit(target.storage.qmsgswkjsgj_refanjian) });
					if (cards.length == 1) {
						return 1;
					}
					if (cards.length >= 2) {
						for (var i = 0; i < cards.length; i++) {
							if (get.tag(cards[i], "save")) {
								return 0;
							}
						}
					}
					if (target.hp == 1) {
						return 1;
					}
					for (var i = 0; i < cards.length; i++) {
						if (get.value(cards[i]) >= 8) {
							return 0;
						}
					}
					if (cards.length > 2 && player.hp > 2) {
						return 0;
					}
					if (cards.length > 3) {
						return 0;
					}
					return 1;
				};
			}
			"step 2";
			if (result.control == "qmsgswkjsgj_refanjian_card") {
				// target.showHandcards();
			} else {
				target.loseHp();
				event.finish();
			}
			"step 3";
			var suit = get.suit(target.storage.qmsgswkjsgj_refanjian);
			target.discard(
				target.getCards("he", function (i) {
					return get.suit(i) == suit && lib.filter.cardDiscardable(i, target, "qmsgswkjsgj_refanjian");
				})
			);
			delete target.storage.qmsgswkjsgj_refanjian;
		},
		ai: {
			order: 9,
			result: {
				target(player, target) {
					return -target.countCards("he") - (player.countCards("h", "du") ? 1 : 0);
				},
			},
			threaten: 2,
		},
	},
	//缝神荀彧
	qmsgswkjsgj_tianzuo: {
		audio: "tianzuo",
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		forced: true,
		filter(event, player) {
			return (event.name != "phase" || game.phaseNumber == 0) && !lib.inpile.includes("qizhengxiangsheng");
		},
		content() {
			game.addGlobalSkill("qmsgswkjsgj_tianzuo_global");
			var cards = [];
			for (var i = 2; i < 10; i++) {
				cards.push(game.createCard2("qizhengxiangsheng", i % 2 ? "club" : "spade", i));
				cards.push(game.createCard2("qizhengxiangsheng", i % 2 ? "club" : "spade", i));
			}
			game.broadcastAll(function () {
				lib.inpile.add("qizhengxiangsheng");
			});
			game.cardsGotoPile(cards, () => {
				return ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)];
			});
		},
		group: ["qmsgswkjsgj_tianzuo_remove",'qmsgswkjsgj_tianzuo_use'],
		subSkill: {
			remove: {
				audio: "qmsgswkjsgj_tianzuo",
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
				audio: "qmsgswkjsgj_tianzuo",
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
			use:{
				audio: "qmsgswkjsgj_tianzuo",
				enable:'phaseUse',
				usable:1,
				viewAs:{name:'qizhengxiangsheng',isCard:true},
				filterCard:function(){return false},
				selectCard:-1,
				prompt:'视为使用一张【奇正相生】',
			},
		},
	},
	qmsgswkjsgj_lingce: {
		audio: 'lingce',
		init: player => {
			game.addGlobalSkill("lingce_global");
		},
		trigger: { global: "useCard" },
		forced: true,
		filter(event, player) {
			// if (!event.card.isCard || !event.cards || event.cards.length !== 1) {
			// 	return false;
			// }
			return event.card.name == "qizhengxiangsheng" || get.zhinangs().includes(event.card.name) || player.getStorage("dinghan").includes(event.card.name);
		},
		content() {
			player.addSkill('qmsgswkjsgj_lingce_add');
			player.draw().gaintag.add('qmsgswkjsgj_lingce');
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
								if (i.hasSkill("qmsgswkjsgj_lingce", null, null, false)) {
									nohave = false;
									if (
										i.isIn() &&
										lib.skill.lingce.filter(
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
								game.removeGlobalSkill("qmsgswkjsgj_lingce_global");
							} else {
								return [1, 0.8 * num];
							}
						},
					},
				},
			},
			add:{
				mod:{
					ignoredHandcard(card, player) {
						if (card.hasGaintag("qmsgswkjsgj_lingce")) {
							return true;
						}
					},
					cardDiscardable(card, player, name) {
						if (name == "phaseDiscard" && card.hasGaintag("qmsgswkjsgj_lingce")) {
							return false;
						}
					},
				},
			}
		},
	},
	qmsgswkjsgj_dinghan: {
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
			return !player.getStorage("dinghan").includes(event.card.name);
		},
		async content(event, trigger, player) {
			player.markAuto("dinghan", [trigger.card.name]);
			if (trigger.name == "addJudge") {
				trigger.cancel();
				if (trigger.card?.cards?.length) {
					const map = new Map(),
						targets = [];
					for (const card of trigger.card.cards) {
						const owner = get.owner(card);
						if (owner) {
							targets.add(owner);
							map.set(owner, (map.get(owner) ?? []).concat([card]));
						}
					}
					if (targets.length) {
						await game
							.loseAsync({
								map: map,
								targets: targets,
								cards: trigger.card.cards,
							})
							.setContent(async (event, trigger, player) => {
								const { map, targets, cards } = event;
								for (const target of targets) {
									const lose = map.get(target);
									const next = target.lose(lose, ui.discardPile);
									next.getlx = false;
									await next;
								}
								game.log(cards, "进入了弃牌堆");
							});
					}
				}
			} else {
				trigger.targets.remove(player);
				trigger.getParent().triggeredTargets2.remove(player);
				trigger.untrigger();
			}
		},
		onremove: true,
		intro: { content: function (storage,player) {
			return '已记录'+player.getStorage("dinghan")
		}},
		group: "qmsgswkjsgj_dinghan_add",
		subSkill: {
			add: {
				trigger: { player: ["phaseBegin",'damageAfter'] },
				audio:'qmsgswkjsgj_dinghan',
				// direct: true,

				// content() {
				// 	"step 0";
				// 	var dialog = [get.prompt("dinghan")];
				// 	(list1 = player.getStorage("dinghan")),
				// 		(list2 = lib.inpile.filter(function (i) {
				// 			return get.type2(i, false) == "trick" && !list1.includes(i);
				// 		}));
				// 	if (list1.length) {
				// 		dialog.push('<div class="text center">已记录</div>');
				// 		dialog.push([list1, "vcard"]);
				// 	}
				// 	if (list2.length) {
				// 		dialog.push('<div class="text center">未记录</div>');
				// 		dialog.push([list2, "vcard"]);
				// 	}
				// 	player.chooseButton(dialog).set("ai", function (button) {
				// 		var player = _status.event.player,
				// 			name = button.link[2];
				// 		if (player.getStorage("dinghan").includes(name)) {
				// 			return -get.effect(player, { name: name }, player, player);
				// 		} else {
				// 			return get.effect(player, { name: name }, player, player) * (1 + player.countCards("hs", name));
				// 		}
				// 	});
				// 	"step 1";
				// 	if (result.bool) {
				// 		player.logSkill("qmsgswkjsgj_dinghan");
				// 		var name = result.links[0][2];
				// 		if (player.getStorage("dinghan").includes(name)) {
				// 			player.unmarkAuto("dinghan", [name]);
				// 			game.log(player, "从定汉记录中移除了", "#y" + get.translation(name));
				// 		} else {
				// 			player.markAuto("dinghan", [name]);
				// 			game.log(player, "向定汉记录中添加了", "#y" + get.translation(name));
				// 		}
				// 		game.delayx();
				// 	}
				// },
				getIndex(event,player,name){
					if(name=='damageAfter'&&event.num)return event.num;
					else return 1;
				},
				cost(){
					'step 0'
					var dialog = [get.prompt("dinghan")];
					(list1 = player.getStorage("dinghan")),
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
					player.chooseButton(dialog).set("ai", function (button) {
						var player = _status.event.player,
							name = button.link[2];
						if (player.getStorage("dinghan").includes(name)) {
							return -get.effect(player, { name: name }, player, player);
						} else {
							return get.effect(player, { name: name }, player, player) * (1 + player.countCards("hs", name));
						}
					});
					'step 1'
					if(result.bool){
						event.result = {
							bool: true,
							cost_data:result.links,
						};
					}
				},
				content(){
					var links=event.cost_data;
					var name = links[0][2];
					if (player.getStorage("dinghan").includes(name)) {
						player.unmarkAuto("dinghan", [name]);
						game.log(player, "从定汉记录中移除了", "#y" + get.translation(name));
					} else {
						player.markAuto("dinghan", [name]);
						game.log(player, "向定汉记录中添加了", "#y" + get.translation(name));
					}
					game.delayx();

				},
			},
		},
	},
	qmsgswkjsgj_shenquhu:{
		audio: 'quhu',
		
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			if (player.countCards("h") == 0) {
				return false;
			}
			return game.hasPlayer(function (current) {
				return player.canCompare(current);
			});
		},
		filterTarget(card, player, target) {
			return player.canCompare(target);
		},
		async content(event, trigger, player) {
			const target = event.target;
			const bool = await player.chooseToCompare(target).forResultBool();
			if (!bool) {
				return void (await player.damage(target));
			}
			if (
				!game.hasPlayer(function (player) {
					return player != target && target.inRange(player);
				})
			) {
				return;
			}
			const { result } = await player
				.chooseTarget(function (card, player, target) {
					const source = _status.event.source;
					return target != source && source.inRange(target);
				}, true)
				.set("ai", function (target) {
					return get.damageEffect(target, _status.event.source, player);
				})
				.set("source", target);
			if (!result.bool || !result.targets || !result.targets.length) {
				return;
			}
			target.line(result.targets[0], "green");
			await result.targets[0].damage(target);
		},
		ai: {
			order: 0.5,
			result: {
				target(player, target) {
					const att = get.attitude(player, target);
					const oc = target.countCards("h") == 1;
					if (att > 0 && oc) {
						return 0;
					}
					const players = game.filterPlayer();
					for (let i = 0; i < players.length; i++) {
						if (players[i] != target && players[i] != player && target.inRange(players[i])) {
							if (get.damageEffect(players[i], target, player) > 0) {
								return att > 0 ? att / 2 : att - (oc ? 5 : 0);
							}
						}
					}
					return 0;
				},
				player(player, target) {
					if (target.hasSkillTag("jueqing", false, target)) {
						return -10;
					}
					const hs = player.getCards("h");
					let mn = 1;
					for (let i = 0; i < hs.length; i++) {
						mn = Math.max(mn, get.number(hs[i]));
					}
					if (mn <= 11 && player.hp < 2) {
						return -20;
					}
					let max = player.maxHp - hs.length;
					const players = game.filterPlayer();
					for (let i = 0; i < players.length; i++) {
						if (get.attitude(player, players[i]) > 2) {
							max = Math.max(Math.min(5, players[i].hp) - players[i].countCards("h"), max);
						}
					}
					switch (max) {
						case 0:
							return mn == 13 ? 0 : -20;
						case 1:
							return mn >= 12 ? 0 : -15;
						case 2:
							return 0;
						case 3:
							return 1;
						default:
							return max;
					}
				},
			},
			expose: 0.2,
		},
	},

	//缝神陆逊
	qmsgswkjsgj_nzry_cuike:{
		audio: 'nzry_cuike',
		enable:'phaseUse',
		filter(event,player){
			return !player.hasSkill('qmsgswkjsgj_nzry_cuike_lock');
		},
		filterTarget(card,player,target){
			var num = player.countMark('nzry_junlve')
			return target.isIn();
		},
		selectTarget:1,
		content(){
			'step 0'
			player.addTempSkill('qmsgswkjsgj_nzry_cuike_lock',{player:['nzry_junlveAfter','phaseUseAfter']});
			'step 1'
			if (player.countMark("nzry_junlve") % 2 == 1) {
				target.damage();
			} else {
				target.link(true);
				player.discardPlayerCard(target, 1, "hej", true);
			}
		},
		ai: {
			notemp: true,
		},
		subSkill:{
			lock:{
				mark:true,
				marktext:'<span style="text-decoration: line-through;">摧</span>',
				intro:{
					content:'下次“军略”变化前，本阶段此技能不能使用'
				},
			},
		},
	},
	qmsgswkjsgj_resbqianxun:{
		audio:'sbqianxun',
		trigger: {
			target: "useCardToBegin",
			player: "judgeBefore",
		},
		// filter(event, player) {
		// 	if (!event.card) {
		// 		return false;
		// 	}
		// 	if (event.getParent().name == "phaseJudge") {
		// 		return true;
		// 	}
		// 	if (event.name == "judge") {
		// 		return false;
		// 	}
		// 	if (get.type(event.card) == "trick" && event.player != player) {
		// 		return true;
		// 	}
		// },
		filter(event, player) {
			if (player.countCards("h") == 0) {
				return false;
			}
			if (event.getParent().name == "phaseJudge") {
				return true;
			}
			if (event.name == "judge") {
				return false;
			}
			if (event.targets && event.targets.length > 1) {
				return false;
			}
			if (event.card && get.type(event.card) == "trick" && event.player != player) {
				return true;
			}
		},
		cost(){
			event.result = player.chooseCard('h',[1,Infinity],get.prompt2(event.skill)).set("ai", function (card) {
				return 4 - get.value(card);
			}).forResult();
		},
		content() {
			var cards = event.cards;
			player.addToExpansion(cards, "giveAuto", player).gaintag.add("qmsgswkjsgj_resbqianxun_gain");
			player.addSkill("qmsgswkjsgj_resbqianxun_gain");
		},
		subSkill:{
			gain: {
				trigger: {
					global: "phaseEnd",
				},
				forced: true,
				charlotte: true,
				async content(event, trigger, player) {
					var cards = player.getExpansions("qmsgswkjsgj_resbqianxun_gain");
					if (cards.length) {
						await player.gain(cards, "draw");
					}
					player.removeSkill("qmsgswkjsgj_resbqianxun_gain");
				},
				intro: {
					mark(dialog, storage, player) {
						var cards = player.getExpansions("qmsgswkjsgj_resbqianxun_gain");
						if (player.isUnderControl(true)) {
							dialog.addAuto(cards);
						} else {
							return "共有" + get.cnNumber(cards.length) + "张牌";
						}
					},
					markcount: "expansion",
				},
			},
		},
	},
	qmsgswkjsgj_resblianying:{
		audio:'sblianying',
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter",'phaseEnd'],
		},
		frequent: true,
		filter(event, player,name) {
			if(name == 'phaseEnd'){
				let num = 0;
				player.getHistory("lose", evt => {
					if (evt.cards2) {
						num += evt.cards2.length;
					}
				});
				return num>0;
			}
			if (player.countCards("h")) {
				return false;
			}
			const evt = event.getl(player);
			return evt && evt.player == player && evt.hs && evt.hs.length > 0;
		},
		async content(event, trigger, player) {
			if(event.triggername == 'phaseEnd'){
				let num = 0;
				player.getHistory("lose", evt => {
					if (evt.cards2) {
						num += evt.cards2.length;
					}
				});
				num = Math.min(5, num);
				const { cards } = await game.cardsGotoOrdering(get.cards(num));
				if (!cards.length) {
					return;
				}
				do {
					const { result } =
						cards.length > 1
							? await player.chooseButtonTarget({
									createDialog: [`连营：请选择要分配的牌和目标`, cards],
									forced: true,
									selectButton: [1, Infinity],
									cardsx: cards,
									ai1(button) {
										return get.value(button.link);
									},
									ai2(target) {
										const player = get.player();
										const card = ui.selected.buttons[0].link;
										if (card) {
											return get.value(card, target) * get.attitude(player, target);
										}
										return 1;
									},
							  })
							: await player
									.chooseTarget("选择一名角色获得" + get.translation(cards), true)
									.set("ai", target => {
										const att = get.attitude(_status.event.player, target);
										if (_status.event.enemy) {
											return -att;
										} else if (att > 0) {
											return att / (1 + target.countCards("h"));
										} else {
											return att / 100;
										}
									})
									.set("enemy", get.value(cards[0], player, "raw") < 0);
					if (result.bool) {
						if (!result.links?.length) {
							result.links = cards.slice(0);
						}
						cards.removeArray(result.links);
						player.line(result.targets, "green");
						const gainEvent = result.targets[0].gain(result.links, "draw");
						gainEvent.giver = player;
						await gainEvent;
					}
				} while (cards.length > 0);
			}
			else {
				player.draw();
			}
		},
		ai: {
			threaten: 0.8,
			effect: {
				player_use(card, player, target) {
					if (player.countCards("h") === 1) {
						return [1, 0.8];
					}
				},
				target(card, player, target) {
					if (get.tag(card, "loseCard") && target.countCards("h") === 1) {
						return 0.5;
					}
				},
			},
			noh: true,
			freeSha: true,
			freeShan: true,
			skillTagFilter(player, tag) {
				if (player.countCards("h") !== 1) {
					return false;
				}
			},
		},
	},
	//缝神曹操
	qmsgswkjsgj_guixin:{
		audio: 'guixin',
		trigger: { player: "damageEnd" },
		filter(event, player) {
			return game.hasPlayer(cur => {
				return cur !== player && cur.countCards("hej") > 0;
			});
		},
		check(event, player) {
			if (player.isTurnedOver() || event.num > 1) {
				return true;
			}
			var num = game.countPlayer(function (current) {
				if (current.countCards("he") && current != player && get.attitude(player, current) <= 0) {
					return true;
				}
				if (current.countCards("j") && current != player && get.attitude(player, current) > 0) {
					return true;
				}
			});
			return num >= 2;
		},
		getIndex(event, player) {
			return event.num;
		},
		async content(event, trigger, player) {
			let targets = game.filterPlayer(current => current != player).sortBySeat();
			player.line(targets, "green");
			// await player.gainMultiple(targets, "hej");
			for(let target of targets){
				var result = {bool:false}
				result = await player
					.gainPlayerCard(target,'hej').forResult();
				if(!result.bool){
					await player.draw();
				}
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			threaten(player, target) {
				if (target.hp == 1) {
					return 2.5;
				}
				return 0.5;
			},
			effect: {
				target(card, player, target) {
					if (
						!target._qmsgswkjsgj_guixin_eff &&
						get.tag(card, "damage") &&
						target.hp >
							(player.hasSkillTag("damageBonus", true, {
								card: card,
								target: target,
							})
								? 2
								: 1)
					) {
						if (player.hasSkillTag("jueqing", false, target)) {
							return [1, -2];
						}
						target._qmsgswkjsgj_guixin_eff = true;
						let gain = game.countPlayer(function (current) {
							if (target == current) {
								return 0;
							}
							if (get.attitude(target, current) > 0) {
								if (current.hasCard(cardx => lib.filter.canBeGained(cardx, target, current, "qmsgswkjsgj_guixin") && get.effect(current, cardx, current, current) < 0, "ej")) {
									return 1.3;
								}
								return 1;
							}
							if (current.hasCard(cardx => lib.filter.canBeGained(cardx, target, current, "qmsgswkjsgj_guixin") && get.effect(current, cardx, current, current) > 0, "ej")) {
								return 1.1;
							}
							if (current.hasCard(cardx => lib.filter.canBeGained(cardx, target, current, "qmsgswkjsgj_guixin"), "h")) {
								return 0.9;
							}
							return 1;
						});
						// if (target.isTurnedOver()) {
							gain += 2.3;
						// } else {
						// 	gain -= 2.3;
						// }
						delete target._guixin_eff;
						return [1, Math.max(0, gain)];
					}
				},
			},
		},
	},
	qmsgswkjsgj_feiying:{
		mod: {
			globalFrom(from, to, distance) {
				return distance - 1;
			},
			globalTo(from, to, distance) {
				return distance + 1;
			},
		},
	},
	//缝神吕布
	qmsgswkjsgj_baonu: {
		audio: 'baonu',
		marktext: "暴",
		trigger: {
			source: "damageSource",
			player: ["damageEnd", "enterGame"],
			global: "phaseBefore",
		},
		forced: true,
		filter(event) {
			return (event.name != "damage" && (event.name != "phase" || game.phaseNumber == 0)) || event.num > 0;
		},
		content() {
			player.addMark("baonu", trigger.name == "damage" ? trigger.num : 2);
		},
		intro: {
			name: "暴怒",
			content: "mark",
		},
		ai: {
			combo: "ol_shenfen",
			maixie: true,
			maixie_hp: true,
		},
	},
	qmsgswkjsgj_wumou: {
		audio: 'wumou',
		trigger: { player: "useCard" },
		forced: true,
		filter(event) {
			return get.type(event.card) == "trick";
		},
		content() {
			"step 0";
			if (player.hasMark("baonu")) {
				player.chooseControlList(["移去一枚【暴怒】标记", "失去1点体力"], true).set("ai", function (event, player) {
					if (get.effect(player, { name: "losehp" }, player, player) >= 0) {
						return 1;
					}
					if (player.storage.baonu > 6) {
						return 0;
					}
					if (player.hp + player.num("h", "tao") > 3) {
						return 1;
					}
					return 0;
				});
			} else {
				player.loseHp();
				event.goto(2);
			}
			"step 1";
			if (result.index == 0) {
				player.removeMark("baonu", 1);
			} else {
				player.loseHp();
			}
			'step 2'
			player.draw();
		},
		ai: {
			effect: {
				player_use(card, player) {
					if (get.type(card) == "trick" && get.value(card) < 6) {
						return [0, -2];
					}
				},
			},
			neg: true,
		},
	},
	qmsgswkjsgj_wuqian: {
		audio: 'wuqian',
		enable: "phaseUse",
		filter(event, player) {
			return player.countMark("baonu") >= 2 && game.hasPlayer(target => lib.skill.ol_wuqian.filterTarget(null, player, target));
		},
		filterTarget(card, player, target) {
			return target != player && !target.hasSkill("ol_wuqian_targeted");
		},
		content() {
			player.removeMark("baonu", 2);
			// player.addTempSkills("wushuang");
			// player.popup("无双");
			// game.log(player,'获得了技能','#g【无双】');
			target.addTempSkill("qmsgswkjsgj_wuqian_targeted");
		},
		ai: {
			order: 9,
			result: {
				target(player, target) {
					if (
						player.countCards("hs", card => {
							if (!player.getCardUsable({ name: card.name })) {
								return false;
							}
							if (!player.canUse(card, target)) {
								return false;
							}
							var eff1 = get.effect(target, card, player, player);
							_status.baonuCheck = true;
							var eff2 = get.effect(target, card, player, player);
							delete _status.baonuCheck;
							return eff2 > Math.max(0, eff1);
						})
					) {
						return -1;
					}
					return 0;
				},
			},
			combo: "baonu",
		},
		global: "qmsgswkjsgj_wuqian_ai",
		subSkill: {
			targeted: {
				charlotte: true,
				ai: { unequip2: true },
			},
			ai: {
				ai: {
					unequip2: true,
					skillTagFilter(player) {
						if (!_status.baonuCheck) {
							return false;
						}
					},
				},
				mod:{
					cardUsableTarget(card, player, target) {
						if(target.hasSkill("qmsgswkjsgj_wuqian_targeted")){
							return true;
						}
					},
				}
			},
		},
	},
	qmsgswkjsgj_shenfen: {
		audio: 'shenfen',
		enable: "phaseUse",
		filter(event, player) {
			return player.countMark("baonu") >= 6;
		},
		usable: 1,
		skillAnimation: true,
		animationColor: "metal",
		multiline:true,
		multitarget:true,
		selectTarget:[1,Infinity],
		filterTarget:true,
		content() {
			"step 0";
			event.delay = false;
			player.removeMark("baonu", 6);
			// event.targets = game.filterPlayer();
			// event.targets.remove(player);
			event.targets.sort(lib.sort.seat);
			player.line(event.targets, "green");
			event.targets2 = event.targets.slice(0);
			event.targets3 = event.targets.slice(0);
			"step 1";
			if (event.targets2.length) {
				event.targets2.shift().damage("nocard");
				event.redo();
			}
			"step 2";
			if (event.targets.length) {
				event.current = event.targets.shift();
				if (event.current.countCards("e")) {
					event.delay = true;
				}
				event.current.discard(event.current.getCards("e")).delay = false;
			}
			"step 3";
			if (event.delay) {
				game.delay(0.5);
			}
			event.delay = false;
			if (event.targets.length) {
				event.goto(2);
			}
			"step 4";
			if (event.targets3.length) {
				var target = event.targets3.shift();
				target.chooseToDiscard(4, "h", true).delay = false;
				if (target.countCards("h")) {
					event.delay = true;
				}
			}
			"step 5";
			if (event.delay) {
				game.delay(0.5);
			}
			event.delay = false;
			if (event.targets3.length) {
				event.goto(4);
			}
			"step 6";
		},
		ai: {
			combo: "baonu",
			order: 10,
			result: {
				// player(player) {
				// 	return game.countPlayer(function (current) {
				// 		if (current != player) {
				// 			return get.sgn(get.damageEffect(current, player, player));
				// 		}
				// 	});
				// },
				player(player,target){
					return get.damageEffect(target,player,player)+5;
				},
				target(player,target){
					return get.damageEffect(target,player,target)-5;
				},
			},
		},
	},
	qmsgswkjsgj_wushuang: {
		audio: 'sbwushuang',
		trigger: { source: "damageBegin1" },
		filter(event, player) {
			const target = event.player;
			const evtx = event.getParent(2);
			const card = event.card;
			const name = card?.name;
			if (!card || !["sha", "juedou"].includes(name)) {
				return false;
			}
			return true;
			// if (name == "sha") {
			// 	return !target.hasHistory("useCard", evt => {
			// 		return evt.card.name == "shan" && evt.respondTo && evt.getParent(3) == evtx;
			// 	});
			// }
			// return !target.hasHistory("respond", evt => {
			// 	return evt.card.name == "sha" && evt.respondTo && evt.getParent(3) == evtx;
			// });
		},
		forced: true,
		logTarget: "player",
		usable: 1,
		logAudio: () => ["sbwushuang4.mp3", "sbwushuang5.mp3"],
		content() {
			trigger.num++;
		},
		group: ["qmsgswkjsgj_sbwushuang_1", "qmsgswkjsgj_sbwushuang_2"],
		preHidden: ["qmsgswkjsgj_sbwushuang_1", "qmsgswkjsgj_sbwushuang_2"],
		subSkill: {
			1: {
				audio: "sbwushuang",
				sourceSkill: "sbwushuang",
				logAudio: () => ["sbwushuang1.mp3", "sbwushuang6.mp3"],
				inherit: "wushuang1",
				audioname: [],
				audioname2: {},
			},
			2: {
				audio: "sbwushuang",
				sourceSkill: "sbwushuang",
				logAudio: () => ["sbwushuang1.mp3", "sbwushuang6.mp3"],
				inherit: "wushuang2",
				audioname: [],
				audioname2: {},
			},
		},
	},
	//界曹丕
	qmsgswkjsgj_rexingshang: {
		audio: 'rexingshang',
		audioname2: { caoying: "lingren_xingshang" },
		trigger: { global: "die" },
		filter(event, player) {
			return player.isDamaged() || event.player.countCards("he") > 0;
		},
		// direct: true,
		content() {
			"step 0";
			player.gain(trigger.player.getCards("he"), trigger.player, "giveAuto", "bySelf");
			'step 1'
			player.recover();
		},
	},
	qmsgswkjsgj_refangzhu: {
		audio: 'refangzhu',
		trigger: {
			player: "damageEnd",
		},
		direct: true,
		content() {
			"step 0";
			player.chooseTarget(get.prompt2("qmsgswkjsgj_refangzhu"), function (card, player, target) {
				return player != target;
			}).ai = function (target) {
				if (target.hasSkillTag("noturn")) {
					return 0;
				}
				var player = _status.event.player;
				if (get.attitude(_status.event.player, target) == 0) {
					return 0;
				}
				if (get.attitude(_status.event.player, target) > 0) {
					if (target.classList.contains("turnedover")) {
						return 1000 - target.countCards("h");
					}
					if (player.getDamagedHp() < 3) {
						return -1;
					}
					return 100 - target.countCards("h");
				} else {
					// if (target.classList.contains("turnedover")) {
					// 	return -1;
					// }
					// if (player.getDamagedHp() >= 3) {
					// 	return -1;
					// }
					return 1 + target.countCards("h");
				}
			};
			"step 1";
			if (result.bool) {
				player.logSkill("refangzhu", result.targets);
				event.target = result.targets[0];
				player.chooseControl(['弃牌掉血','摸牌翻面','cancel2'])
				.set("prompt", "令"+get.translation(event.target)+"弃置" + get.cnNumber(player.getDamagedHp()) + "张牌并失去1点体力；<br>或令"+get.translation(event.target)+"将武将牌翻面并摸" + get.cnNumber(player.getDamagedHp()) + "张牌。")
				.set("ai",function(control){
					var player = _status.event.player;
					var target = event.target;
					var num = player.getDamagedHp();
					var att = get.attitude(player,target);
					if(att>0){
						return '摸牌翻面';
					}
					else{
						if(target.classList.contains("turnedover")){
							return '弃牌掉血';
						}
						else if(num>2){
							if(target.hasSkillTag("noturn")){
								return '弃牌掉血';
							}
						}
						else {
							return '摸牌翻面';
						}
					}
				});
			}
			else {
				event.finish();
			}
			'step 2'
			if (result.control) {
				if(result.control == '弃牌掉血'){
					event.target
						.chooseToDiscard("he", player.getDamagedHp(),true)
						.set("ai", function (card) {
							var player = _status.event.player;
							// if (player.isTurnedOver() || _status.event.getTrigger().player.getDamagedHp() > 2) {
							// 	return -1;
							// }
							return player.hp * player.hp - get.value(card);
						})
						.set("prompt", "弃置" + get.cnNumber(player.getDamagedHp()) + "张牌并失去1点体力。");

					event.goto(3)
				}
				else {
					if (player.isDamaged()) {
						event.target.draw(player.getDamagedHp());
					}
					event.target.turnOver();
					event.finish();
				}
				// else {
				// 	event._result = { bool: false };
				// }
				// if (player.isHealthy()) {
				// 	event._result = { bool: false };
				// } else {
				// 	event.target
				// 		.chooseToDiscard("he", player.getDamagedHp())
				// 		.set("ai", function (card) {
				// 			var player = _status.event.player;
				// 			if (player.isTurnedOver() || _status.event.getTrigger().player.getDamagedHp() > 2) {
				// 				return -1;
				// 			}
				// 			return player.hp * player.hp - get.value(card);
				// 		})
				// 		.set("prompt", "弃置" + get.cnNumber(player.getDamagedHp()) + "张牌并失去1点体力；或选择不弃置，将武将牌翻面并摸" + get.cnNumber(player.getDamagedHp()) + "张牌。");
				// }
			} else {
				event.finish();
			}
			"step 2";
			// if (result.bool) {
				event.target.loseHp();
			// } else {
			// }
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (get.tag(card, "damage")) {
						if (player.hasSkillTag("jueqing", false, target)) {
							return [1, -1.5];
						}
						if (target.hp <= 1) {
							return;
						}
						if (!target.hasFriend()) {
							return;
						}
						var hastarget = false;
						var turnfriend = false;
						var players = game.filterPlayer();
						for (var i = 0; i < players.length; i++) {
							if (get.attitude(target, players[i]) < 0 && !players[i].isTurnedOver()) {
								hastarget = true;
							}
							if (get.attitude(target, players[i]) > 0 && players[i].isTurnedOver()) {
								hastarget = true;
								turnfriend = true;
							}
						}
						if (get.attitude(player, target) > 0 && !hastarget) {
							return;
						}
						if (turnfriend || target.hp == target.maxHp) {
							return [0.5, 1];
						}
						if (target.hp > 1) {
							return [1, 0.5];
						}
					}
				},
			},
		},
	},
	qmsgswkjsgj_songwei:{
		audio: 'songwei',
		zhuSkill: true,
		trigger: { global: "judgeEnd" },
		filter(event, player) {
			if (event.player == player || event.player.group != "wei") {
				return false;
			}
			if (event.result.color != "black") {
				return false;
			}
			return player.hasZhuSkill("qmsgswkjsgj_songwei", event.player);
		},
		async content(event, trigger, player) {
			player.line(trigger.player, "green");
			player.draw();
		},

	},
	//界沙摩柯
	qmsgswkjsgj_gzjili:{
		mod: {
			aiOrder(player, card, num) {
				if (player.isPhaseUsing() && get.subtype(card) == "equip1" && !get.cardtag(card, "gifts")) {
					var range0 = player.getAttackRange();
					var range = 0;
					var info = get.info(card);
					if (info && info.distance && info.distance.attackFrom) {
						range -= info.distance.attackFrom;
					}
					if (player.getEquip(1)) {
						var num = 0;
						var info = get.info(player.getEquip(1));
						if (info && info.distance && info.distance.attackFrom) {
							num -= info.distance.attackFrom;
						}
						range0 -= num;
					}
					range0 += range;
					if (
						range0 == player.getHistory("useCard").length + player.getHistory("respond").length + 2 &&
						player.countCards("h", function (cardx) {
							return get.subtype(cardx) != "equip1" && player.getUseValue(cardx) > 0;
						})
					) {
						return num + 10;
					}
				}
			},
		},
		trigger: { player: ["useCard", "respond"] },
		frequent: true,
		locked: false,
		preHidden: true,
		onremove(player) {
			player.removeTip("gzjili");
		},
		filter(event, player) {
			let count = player.getHistory("useCard").length + player.getHistory("respond").length;
			player.addTip("gzjili", "蒺藜 " + count, true);
			return count == player.getAttackRange();
		},
		audio: 'gzjili',
		cost(){
			// var type={}
			// for(var i of lib.inpile){
			// 	if(!type[get.type2(i)]||type[get.type2(i)]==undefined)type[get.type2(i)]=get.translation(get.type2(i));
			// };
			'step 0'
			var type=[];
			for(var i of lib.inpile){
				if(get.type2(i)&&!type.includes(get.type2(i))){
					type.push(get.type2(i));
				}
			}
			// type.push('cancel2')
			player.YB_control(type).set('prompt','选择一张牌类型');
			'step 1'
			if(result.control!='cancel2'){
				event.result = {
					bool:true,
					cost_data:result.control,
				}
			}
		},
		content() {
			var type=event.cost_data;
			var num = player.getHistory("useCard").length + player.getHistory("respond").length;
			player.YB_drawCard(num,{type2:type})
		},
		ai: {
			threaten: 1.8,
			effect: {
				target_use(card, player, target, current) {
					let used = target.getHistory("useCard").length + target.getHistory("respond").length;
					if (get.subtype(card) == "equip1" && !get.cardtag(card, "gifts")) {
						if (player != target || !player.isPhaseUsing()) {
							return;
						}
						let range0 = player.getAttackRange();
						let range = 0;
						let info = get.info(card);
						if (info && info.distance && info.distance.attackFrom) {
							range -= info.distance.attackFrom;
						}
						if (player.getEquip(1)) {
							let num = 0;
							let info = get.info(player.getEquip(1));
							if (info && info.distance && info.distance.attackFrom) {
								num -= info.distance.attackFrom;
							}
							range0 -= num;
						}
						range0 += range;
						let delta = range0 - used;
						if (delta < 0) {
							return;
						}
						let num = player.countCards("h", function (card) {
							return (get.cardtag(card, "gifts") || get.subtype(card) != "equip1") && player.getUseValue(card) > 0;
						});
						if (delta == 2 && num > 0) {
							return [1, 3];
						}
						if (num >= delta) {
							return "zeroplayertarget";
						}
					} else if (get.tag(card, "respondShan") > 0) {
						if (current < 0 && used == target.getAttackRange() - 1) {
							if (card.name === "sha") {
								if (!target.mayHaveShan(player, "use")) {
									return;
								}
							} else if (!target.mayHaveShan(player)) {
								return 0.9;
							}
							return [1, (used + 1) / 2];
						}
					} else if (get.tag(card, "respondSha") > 0) {
						if (current < 0 && used == target.getAttackRange() - 1 && target.mayHaveSha(player)) {
							return [1, (used + 1) / 2];
						}
					}
				},
			},
		},

	},
	//界裴秀
	//十常侍
	
	//十常侍
	qmsgswkjsgj_mbdanggu: {
		audio:'mbdanggu',
		trigger: {
			player: "enterGame",
			global: "phaseBefore",
		},
		filter(event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		derivation: ["qmsgswkjsgj_mbdanggu_faq", "qmsgswkjsgj_mbdanggu_faq2", "qmsgswkjsgj_scstaoluan", "qmsgswkjsgj_scschiyan", "qmsgswkjsgj_scszimou", "qmsgswkjsgj_scspicai", "qmsgswkjsgj_scsyaozhuo", "qmsgswkjsgj_scsxiaolu", "qmsgswkjsgj_scskuiji", "qmsgswkjsgj_scschihe", "qmsgswkjsgj_scsniqu", "scsanruo"],
		forced: true,
		unique: true,
		onremove(player) {
			delete player.storage.qmsgswkjsgj_mbdanggu;
			delete player.storage.qmsgswkjsgj_mbdanggu_current;
			if (lib.skill.qmsgswkjsgj_mbdanggu.isSingleShichangshi(player)) {
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
			["qmsgswkjsgj_scs_zhangrang", "qmsgswkjsgj_scstaoluan"],
			["qmsgswkjsgj_scs_zhaozhong", "qmsgswkjsgj_scschiyan"],
			["qmsgswkjsgj_scs_sunzhang", "qmsgswkjsgj_scszimou"],
			["qmsgswkjsgj_scs_bilan", "qmsgswkjsgj_scspicai"],
			["qmsgswkjsgj_scs_xiayun", "qmsgswkjsgj_scsyaozhuo"],
			["qmsgswkjsgj_scs_hankui", "qmsgswkjsgj_scsxiaolu"],
			["qmsgswkjsgj_scs_lisong", "qmsgswkjsgj_scskuiji"],
			["qmsgswkjsgj_scs_duangui", "qmsgswkjsgj_scschihe"],
			["qmsgswkjsgj_scs_guosheng", "qmsgswkjsgj_scsniqu"],
			["qmsgswkjsgj_scs_gaowang", "qmsgswkjsgj_scsmiaoyu"],
		],
		conflictMap(player) {
			if (!_status.qmsgswkjsgj_changshiMap) {
				_status.qmsgswkjsgj_changshiMap = {
					qmsgswkjsgj_scs_zhangrang: [],
					qmsgswkjsgj_scs_zhaozhong: [],
					qmsgswkjsgj_scs_sunzhang: [],
					qmsgswkjsgj_scs_bilan: ["qmsgswkjsgj_scs_hankui"],
					qmsgswkjsgj_scs_xiayun: [],
					qmsgswkjsgj_scs_hankui: ["qmsgswkjsgj_scs_bilan"],
					qmsgswkjsgj_scs_lisong: [],
					qmsgswkjsgj_scs_duangui: ["qmsgswkjsgj_scs_guosheng"],
					qmsgswkjsgj_scs_guosheng: ["qmsgswkjsgj_scs_duangui"],
					qmsgswkjsgj_scs_gaowang: [],
				};
				if (!get.isLuckyStar(player)) {
					var list = lib.skill.qmsgswkjsgj_mbdanggu.changshi.map(i => i[0]);
					for (var i of list) {
						var select = list.filter(scs => scs != i && !_status.qmsgswkjsgj_changshiMap[i].includes(i));
						_status.qmsgswkjsgj_changshiMap[i].addArray(select.randomGets(get.rand(0, select.length)));
					}
				}
			}
			return _status.qmsgswkjsgj_changshiMap;
		},
		async content(event, trigger, player) {
			const list = lib.skill.qmsgswkjsgj_mbdanggu.changshi.map(i => i[0]);
			player.markAuto("qmsgswkjsgj_mbdanggu", list);
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
			const next = game.createEvent("qmsgswkjsgj_mbdanggu_clique");
			next.player = player;
			next.setContent(lib.skill.qmsgswkjsgj_mbdanggu.contentx);
			await next;
		},
		async contentx(event, trigger, player) {
			let list = player.getStorage("qmsgswkjsgj_mbdanggu").slice();
			const first = list.randomRemove();
			const others = list.randomGets(4);
			let result;
			if (others.length == 1) {
				result = { bool: true, links: others };
			} else {
				const map = {
					qmsgswkjsgj_scs_bilan: "qmsgswkjsgj_scs_hankui",
					qmsgswkjsgj_scs_hankui: "qmsgswkjsgj_scs_bilan",
					qmsgswkjsgj_scs_duangui: "qmsgswkjsgj_scs_guosheng",
					qmsgswkjsgj_scs_guosheng: "qmsgswkjsgj_scs_duangui",
						// 这个版本:'没有不认可',
					},
					map2 = lib.skill.qmsgswkjsgj_mbdanggu.conflictMap(player);
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
				list = lib.skill.qmsgswkjsgj_mbdanggu.changshi;
				const changshis = [first, chosen];
				player.unmarkAuto("qmsgswkjsgj_mbdanggu", changshis);
				player.storage.qmsgswkjsgj_mbdanggu_current = changshis;
				for (const changshi of changshis) {
					for (const cs of list) {
						if (changshi == cs[0]) {
							skills.push(cs[1]);
						}
					}
				}
				if (lib.skill.qmsgswkjsgj_mbdanggu.isSingleShichangshi(player)) {
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
					player.addAdditionalSkill("qmsgswkjsgj_mbdanggu", skills);
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
			var map = lib.skill.qmsgswkjsgj_mbdanggu.conflictMap(player);
			return player.name == "qmsgswkjsgj_re_shichangshi" && ((map[player.name1] && map[player.name2]) || (map[player.name1] && !player.name2) || (!player.name1 && !player.name2) || (player.name == player.name1 && !player.name2));
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
				if (player.storage.qmsgswkjsgj_mbdanggu_current && player.isIn()) {
					dialog.addText("当前常侍");
					dialog.addSmall([player.storage.qmsgswkjsgj_mbdanggu_current, "character"]);
				}
			},
		},
	},
	qmsgswkjsgj_mbmowang: {
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
		derivation: "qmsgswkjsgj_mbmowang_faq",
		forced: true,
		forceDie: true,
		forceOut: true,
		direct: true,
		priority: 15,
		group: ["qmsgswkjsgj_mbmowang_die", "qmsgswkjsgj_mbmowang_return"],
		async content(event, trigger, player) {
			if (event.triggername == "rest") {
				game.broadcastAll(
					function (player, list) {
						//player.classList.add("out");
						if (list.includes(player.name1) || player.name1 == "qmsgswkjsgj_re_shichangshi") {
							player.smoothAvatar(false);
							player.skin.name = player.name1 + "_dead";
							player.node.avatar.setBackground(player.name1 + "_dead", "character");
						}
						if (list.includes(player.name2) || player.name2 == "qmsgswkjsgj_re_shichangshi") {
							player.smoothAvatar(true);
							player.skin.name2 = player.name2 + "_dead";
							player.node.avatar2.setBackground(player.name2 + "_dead", "character");
						}
					},
					player,
					lib.skill.qmsgswkjsgj_mbdanggu.changshi.map(i => i[0])
				);
				return;
			}
			if (_status._rest_return?.[player.playerid]) {
				trigger.cancel();
			} else {
				if (player.getStorage("qmsgswkjsgj_mbdanggu").length) {
					player.logSkill("qmsgswkjsgj_mbmowang");
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
					trigger.excludeMark.add("qmsgswkjsgj_mbdanggu");
					//trigger.noDieAudio = true;
					trigger.includeOut = true;
				} else {
					player.changeSkin("qmsgswkjsgj_mbmowang", "qmsgswkjsgj_re_shichangshi_dead");
				}
			}
		},
		ai: {
			combo: "qmsgswkjsgj_mbdanggu",
			neg: true,
		},
		subSkill: {
			die: {
				audio: "mbmowang",
				trigger: { player: "phaseAfter" },
				forced: true,
				forceDie: true,
				async content(event, trigger, player) {
					if (lib.skill.qmsgswkjsgj_mbdanggu.isSingleShichangshi(player)) {
						if (!player.getStorage("qmsgswkjsgj_mbdanggu").length) {
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
					if (!player.getStorage("qmsgswkjsgj_mbdanggu").length) {
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
					return event.player == player && player.hasSkill("qmsgswkjsgj_mbdanggu", null, null, false);
				},
				async content(event, trigger, player) {
					game.broadcastAll(function (player) {
						if (player.name1 == "qmsgswkjsgj_re_shichangshi") {
							player.smoothAvatar(false);
							player.node.avatar.setBackground(player.name1, "character");
							if (!lib.skill.qmsgswkjsgj_mbdanggu.isSingleShichangshi(player)) {
								player.skin.name = player.name1;
							}
						}
						if (player.name2 == "qmsgswkjsgj_re_shichangshi") {
							player.smoothAvatar(true);
							player.node.avatar2.setBackground(player.name2, "character");
							if (!lib.skill.qmsgswkjsgj_mbdanggu.isSingleShichangshi(player)) {
								player.skin.name2 = player.name2;
							}
						}
					}, player);
					delete player.storage.qmsgswkjsgj_mbdanggu_current;
					if (lib.skill.qmsgswkjsgj_mbdanggu.isSingleShichangshi(player)) {
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
					const next = game.createEvent("qmsgswkjsgj_mbdanggu_clique");
					next.player = player;
					next.setContent(lib.skill.qmsgswkjsgj_mbdanggu.contentx);
					await next;
					await player.draw(2);
				},
			},
		},
	},
	//张让
	qmsgswkjsgj_scstaoluan: {
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
					filterCard: false,
					audio: "scstaoluan",
					selectCard: -1,
					popname: true,
					check(card) {
						return 6 - get.value(card);
					},
					position: "hes",
					viewAs: { name: links[0][2], nature: links[0][3] },
				};
			},
			prompt(links, player) {
				return "视为使用" + (get.translation(links[0][3]) || "") + get.translation(links[0][2]) + "？";
			},
		},
		ai: {
			order: 4,
			result: {
				player: 1,
			},
			threaten: 1.9,
		},
		// group:'qmsgswkjsgj_scstaoluan_after',
		subSkill: { 
			after:{
				trigger:{player:'useCardAfter'},
				audio:'scstaoluan',
				filter:function(event,player){
					return event.skill&&event.skill=='qmsgswkjsgj_scstaoluan_backup';
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
	qmsgswkjsgj_scschiyan: {
		audio: 'scschiyan',
		trigger: { player: "useCardToPlayered" },
		direct: true,
		filter(event, player) {
			return event.card.name == "sha" && event.target.hp > 0 && event.target.countCards("he") > 0;
		},
		content() {
			"step 0";
			var next = player.choosePlayerCard(trigger.target, "he",Math.min(2, trigger.target.countCards("he")), get.prompt("scschiyan", trigger.target));
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
				player.logSkill("qmsgswkjsgj_scschiyan", target);
				target.addSkill("qmsgswkjsgj_scschiyan_get");
				target.addToExpansion("giveAuto", result.cards, target).gaintag.add("qmsgswkjsgj_scschiyan_get");
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
		group: "qmsgswkjsgj_scschiyan_damage",
		subSkill: {
			get: {
				trigger: { global: "phaseEnd" },
				forced: true,
				popup: false,
				charlotte: true,
				filter(event, player) {
					return player.getExpansions("qmsgswkjsgj_scschiyan_get").length > 0;
				},
				content() {
					"step 0";
					var cards = player.getExpansions("qmsgswkjsgj_scschiyan_get");
					player.gain(cards, "draw");
					game.log(player, "收回了" + get.cnNumber(cards.length) + "张“鸱咽”牌");
					"step 1";
					player.removeSkill("qmsgswkjsgj_scschiyan_get");
				},
				intro: {
					markcount: "expansion",
					mark(dialog, storage, player) {
						var cards = player.getExpansions("qmsgswkjsgj_scschiyan_get");
						if (player.isUnderControl(true)) {
							dialog.addAuto(cards);
						} else {
							return "共有" + get.cnNumber(cards.length) + "张牌";
						}
					},
				},
			},
			damage: {
				audio: "qmsgswkjsgj_scschiyan",
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
	qmsgswkjsgj_scszimou: {
		audio: 'scszimou',
		trigger: { player: "useCard" },
		forced: true,
		filter(event, player) {
			var evt = event.getParent("phaseUse");
			if (!evt || evt.player != player) {
				return false;
			}
			var num = player.getHistory("useCard", evtx => evtx.getParent("phaseUse") == evt).length;
			return num == 1 || num == 2 || num == 3;
		},
		content() {
			var evt = trigger.getParent("phaseUse");
			var num = player.getHistory("useCard", evtx => evtx.getParent("phaseUse") == evt).length;
			var cards = [];
			if (num == 1) {
				var card = get.cardPile2(card => {
					return ["jiu", "xionghuangjiu"].includes(card.name);
				});
				if (card) {
					cards.push(card);
				}
				// var card = get.cardPile2(card => {
				// 	return card.name == "shan";
				// });
				// if (card) {
				// 	cards.push(card);
				// }
			} else if (num == 2) {
				var card = get.cardPile2(card => {
					return card.name == "sha";
				});
				if (card) {
					cards.push(card);
				}
				// var card = get.cardPile2(card => {
				// 	return ["tao", "zong"].includes(card.name);
				// });
				// if (card) {
				// 	cards.push(card);
				// }
			} else if (num == 3) {
				var card = get.cardPile2(card => {
					return card.name == "juedou";
				});
				if (card) {
					cards.push(card);
				}
				// var card = get.cardPile2(card => {
				// 	return ["wuzhong", "sadouchengbing","dongzhuxianji"].includes(card.name);
				// });
				// if (card) {
				// 	cards.push(card);
				// }
			}
			if (cards.length) {
				player.gain(cards, "gain2");
			}
		},
	},
	//毕岚
	qmsgswkjsgj_scspicai: {
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
					var evt = _status.event.getParent("qmsgswkjsgj_scspicai");
					if (evt && 
						// evt.suits && evt.suits.includes(get.suit(result))&&
						evt.numbers&&evt.numbers.includes(get.number(result))) {
						return 0;
					}
					return 1;
				})
				.set("callback", lib.skill.qmsgswkjsgj_scspicai.callback).judge2 = function (result) {
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
				// evt.suits.push(event.getParent().result.suit);
				evt.numbers.push(event.getParent().result.number);
				player.chooseBool("是否继续发动【庀材】？").set("frequentSkill", "qmsgswkjsgj_scspicai");
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
	qmsgswkjsgj_scsyaozhuo: {
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
				target.addTempSkill("qmsgswkjsgj_scsyaozhuo_skip", { player: "phaseDrawSkipped" });
			} else {
				// player.chooseToDiscard(2, true, "he");
				// player.draw();
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
	qmsgswkjsgj_scsxiaolu: {
		audio: 'scsxiaolu',
		enable: "phaseUse",
		usable: 1,
		content() {
			"step 0";
			player.draw(4);
			"step 1";
			var num = player.countCards("h");
			if (!num) {
				event.finish();
			} else if (num < 4) {
				event._result = { index: 1 };
			} else {
				player
					.chooseControl()
					.set("choiceList", ["将四张牌交给一名其他角色", "弃置四张手牌"])
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
					selectCard: 4,
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
					prompt: "选择四张手牌，交给一名其他角色",
					forced: true,
				});
			} else {
				player.chooseToDiscard(4, true, "h");
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
	qmsgswkjsgj_scskuiji: {
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
				// for (var i = 0; i < ui.selected.buttons.length; i++) {
				// 	if (get.suit(button.link) == get.suit(ui.selected.buttons[i].link)) {
				// 		return false;
				// 	}
				// }
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
	qmsgswkjsgj_scschihe: {
		audio: 1,
		trigger: { player: "useCardToPlayered" },
		filter(event, player) {
			return event.targets.length == 1 && event.card.name == "sha";
		},
		prompt2(event, player) {
			var str = "亮出牌堆顶的三张牌并增加伤害；且";
			str += "令" + get.translation(event.target) + "不能使用";
			str += "这三张牌所包含的花色";
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
			var num = 3;
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
			target.addTempSkill("qmsgswkjsgj_scschihe_block");
			if (!target.storage.qmsgswkjsgj_scschihe_block) {
				target.storage.qmsgswkjsgj_scschihe_block = [];
			}
			target.storage.qmsgswkjsgj_scschihe_block.push([evt.card, suits]);
			lib.skill.qmsgswkjsgj_scschihe.updateBlocker(target);
		},
		updateBlocker(player) {
			var list = [],
				storage = player.storage.qmsgswkjsgj_scschihe_block;
			if (storage && storage.length) {
				for (var i of storage) {
					list.addArray(i[1]);
				}
			}
			player.storage.qmsgswkjsgj_scschihe_blocker = list;
		},
		ai: {
			threaten: 2.5,
		},
		subSkill: {
			block: {
				mod: {
					cardEnabled(card, player) {
						if (!player.storage.qmsgswkjsgj_scschihe_blocker) {
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
						if (player.storage.qmsgswkjsgj_scschihe_blocker.includes(suit)) {
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
					delete player.storage.qmsgswkjsgj_scschihe_block;
					delete player.storage.qmsgswkjsgj_scschihe_blocker;
				},
				filter(event, player) {
					const evt = event.getParent("useCard", true, true);
					if (evt && evt.effectedCount < evt.effectCount) {
						return false;
					}
					if (!event.card || !player.storage.qmsgswkjsgj_scschihe_block) {
						return false;
					}
					for (var i of player.storage.qmsgswkjsgj_scschihe_block) {
						if (i[0] == event.card) {
							return true;
						}
					}
					return false;
				},
				content() {
					var storage = player.storage.qmsgswkjsgj_scschihe_block;
					for (var i = 0; i < storage.length; i++) {
						if (storage[i][0] == trigger.card) {
							storage.splice(i--, 1);
						}
					}
					if (!storage.length) {
						player.removeSkill("qmsgswkjsgj_scschihe_block");
					} else {
						lib.skill.scschihe.updateBlocker(target);
					}
				},
			},
		},
	},
	//郭胜
	qmsgswkjsgj_scsniqu: {
		audio: 'scsniqu',
		enable: "phaseUse",
		usable: 1,
		filterTarget: true,
		selectTarget: 1,
		content() {
			target.damage("fire",2);
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

	//界沮授

	//缝手杀神华佗
	qmsgswkjsgj_qingnang: {
		audio: 'qingnang',
		enable: "phaseUse",
		filterCard: false,
		selectCard:-1,
		usable: 1,
		check(card) {
			return 9 - get.value(card);
		},
		filterTarget(card, player, target) {
			if (target.hp >= target.maxHp) {
				return false;
			}
			return true;
		},
		async content(event, trigger, player) {
			event.target.recover();
		},
		ai: {
			order: 9,
			result: {
				target(player, target) {
					if (target.hp == 1) {
						return 5;
					}
					if (player == target && player.countCards("h") > player.hp) {
						return 5;
					}
					return 2;
				},
			},
			threaten: 2,
		},
	},
	qmsgswkjsgj_jijiu: {
		mod: {
			aiValue(player, card, num) {
				if (get.name(card) != "tao" && get.color(card) != "red") {
					return;
				}
				const cards = player.getCards("hs", card => get.name(card) == "tao" || get.color(card) == "red");
				cards.sort((a, b) => (get.name(a) == "tao" ? 1 : 2) - (get.name(b) == "tao" ? 1 : 2));
				var geti = () => {
					if (cards.includes(card)) {
						cards.indexOf(card);
					}
					return cards.length;
				};
				return Math.max(num, [6.5, 4, 3, 2][Math.min(geti(), 2)]);
			},
			aiUseful() {
				return lib.skill.kanpo.mod.aiValue.apply(this, arguments);
			},
		},
		locked: false,
		audio: 'jijiu',
		// audioname: ["re_huatuo"],
		// audioname2: { old_huatuo: "jijiu_re_huatuo" },
		enable: "chooseToUse",
		viewAsFilter(player) {
			return player != _status.currentPhase && player.countCards("hes", { color: "red" }) > 0;
		},
		filterCard(card) {
			return get.color(card) == "red";
		},
		position: "hes",
		viewAs: { name: "tao" },
		prompt: "将一张红色牌当桃使用",
		check(card) {
			return 15 - get.value(card);
		},
		ai: {
			threaten: 1.5,
		},
		group:'qmsgswkjsgj_jijiu_tao',
		subSkill:{
			tao:{
				audio:'qmsgswkjsgj_jijiu',
				trigger:{
					global:'useCard',
				},
				filter(event,player){
					return event.card && event.card.name == 'tao' && event.player != player;
				},
				// prompt2:'是否摸一张牌',
				content(){
					player.draw();
				}
			}
		},
	},
	//神华佗
	qmsgswkjsgj_wuling: {
		audio: 'wuling',
		// enable: "phaseUse",
		filter(event, player) {
			return game.hasPlayer(target => lib.skill.qmsgswkjsgj_wuling.filterTarget(null, player, target));
		},
		getIndex(event,player){
			return 2;
		},
		trigger:{
			global:'roundStart',
		},
		cost(){
			event.result = player.chooseTarget(`选择一名角色，向其传授“五禽戏”`,1).set("filterTarget",lib.skill.qmsgswkjsgj_wuling.filterTarget).set('ai',function(target){
				return get.attitude(player,target);
			}).forResult();
		},
		filterTarget(card, player, target) {
			return !target.hasSkill("qmsgswkjsgj_wuling_wuqinxi");
		},
		init(player){
			var next = game.createEvent('qmsgswkjsgj_wuling_init',false);
			next.player = player;
			next.target = player;
			next.setContent(lib.skill.qmsgswkjsgj_wuling.content);
		},
		// usable: 2,
		prompt: "选择一名角色，向其传授“五禽戏”",
		group: "qmsgswkjsgj_wuling_die",
		content() {
			"step 0";
			target.addAdditionalSkill(`qmsgswkjsgj_wuling_${player.playerid}`, "qmsgswkjsgj_wuling_wuqinxi");
			var next = player.chooseToMove(`五灵：调整向${get.translation(target)}传授的“五禽戏”顺序`);
			next.set("list", [
				[
					"",
					[
						lib.skill.qmsgswkjsgj_wuling.wuqinxi,
						(item, type, position, noclick, node) => {
							node = ui.create.buttonPresets.vcard(lib.skill.qmsgswkjsgj_wuling.wuqinxiMap2[item][0], type, position, noclick);
							node.node.range.innerHTML = lib.skill.qmsgswkjsgj_wuling.wuqinxiMap2[item][1];
							node.node.range.style.bottom = "2.5px";
							node.node.range.style.width = "100%";
							node.node.range.style.right = "0%";
							node.node.range.style.textAlign = "center";
							node._link = node.link = [null, null, item];
							node._customintro = [node => `五禽戏：${node.link[2]}`, node => lib.skill.qmsgswkjsgj_wuling.wuqinxiMap[lib.skill.qmsgswkjsgj_wuling.wuqinxi.indexOf(node.link[2])].slice(2)];
							return node;
						},
					],
				],
			]);
			next.set("processAI", () => {
				const event = get.event().getParent(),
					player = event.player,
					target = event.target;
				const spirits = [];
				let nextPlayer = player;
				do {
					nextPlayer = nextPlayer.getNext();
					if (get.attitude(player, nextPlayer) < 0) {
						spirits.add("熊");
						break;
					}
				} while (nextPlayer != target);
				if (!spirits.length) {
					spirits.add("猿");
				}
				if (
					get.recoverEffect(target, player, player) > 0 ||
					target.hasCard(card => {
						return (
							get.effect(
								target,
								{
									name: card.viewAs || card.name,
									cards: [card],
								},
								target,
								target
							) < -1
						);
					}, "j")
				) {
					spirits.add("鹿");
				}
				const others = lib.skill.qmsgswkjsgj_wuling.wuqinxi.slice().removeArray(spirits);
				do {
					others.randomSort();
				} while (others.length > 1 && others[0] == "鹿");
				return [spirits.concat(others).map(i => ["", "", i])];
			});
			"step 1";
			var sortedWuqinxi = result.moved[0].map(i => i[2]);
			game.log(target, "习得的五禽戏顺序为", "#g" + sortedWuqinxi.join("、"));
			sortedWuqinxi.unshift(sortedWuqinxi[0]);
			target.storage.qmsgswkjsgj_wuling_wuqinxi = sortedWuqinxi;
			lib.skill.qmsgswkjsgj_wuling.updateMark(target);
		},
		wuqinxi: ["虎", "鹿", "熊", "猿", "鹤"],
		wuqinxiMap: [
			"虎：当你使用牌对目标角色造成伤害时，此伤害+1。", 
			"鹿：①当你获得此效果时，你回复2点体力并弃置判定区的所有牌。②你不能成为延时锦囊牌的目标。", 
			"熊：当你受到伤害时，此伤害-1。", 
			"猿：当你获得此效果时，你选择一名其他角色，获得其装备区里的所有牌。", 
			"鹤：当你获得此效果时，你摸五张牌。"
		],
		wuqinxiMap2: {
			虎: ["qmsgswkjsgj_wuqinxi_hu", "用牌加伤"],
			鹿: ["qmsgswkjsgj_wuqinxi_lu", "弃判定回血"],
			熊: ["qmsgswkjsgj_wuqinxi_xiong", "减伤"],
			猿: ["qmsgswkjsgj_wuqinxi_yuan", "偷装备牌"],
			鹤: ["qmsgswkjsgj_wuqinxi_he", "摸五张牌"],
		},
		updateMark(player) {
			var wuqinxi = player.storage.qmsgswkjsgj_wuling_wuqinxi;
			if (!wuqinxi) {
				return;
			}
			var prevMark = wuqinxi.shift();
			// wuqinxi.push(prevMark);
			var curMark = wuqinxi[0];
			if (!curMark) {
				for (var skill in player.additionalSkills) {
					if (!skill.startsWith("qmsgswkjsgj_wuling_")) {
						continue;
					}
					player.removeAdditionalSkill(skill);
				}
				game.log(player, "完成了五禽戏的操练");
				if(player.hasSkill('qmsgswkjsgj_wuling')){
					lib.skill.qmsgswkjsgj_wuling.init(player);
				}
				return;
			}
			game.log(player, "获得了", "#g【" + curMark + "】", "标记");
			player.markSkill("qmsgswkjsgj_wuling_wuqinxi");
			game.broadcastAll(
				function (player, curMark) {
					if (player.marks.qmsgswkjsgj_wuling_wuqinxi) {
						player.marks.qmsgswkjsgj_wuling_wuqinxi.firstChild.innerHTML = curMark;
					}
				},
				player,
				curMark
			);
			var next = game.createEvent("qmsgswkjsgj_wuling_change");
			next.player = player;
			next.setContent("emptyEvent");
		},
		ai: {
			order: 7,
			threaten: 5,
			result: { target: 1 },
		},
		derivation: "qmsgswkjsgj_wuling_wuqinxi",
		// group:['qmsgswkjsgj_wuling_change'],
		//这玩意没写出来，别加！
		subSkill: {
			wuqinxi: {
				nopop: true,
				charlotte: true,
				intro: {
					markcount: () => 0,
					mark(dialog, storage) {
						const wuqinxiMap = lib.skill.qmsgswkjsgj_wuling.wuqinxiMap;
						const str = `<li>当前效果：${storage[0]}<br><li>${wuqinxiMap.find(str => storage[0] == str[0]).slice(2)}<br>`;
						dialog.addText(str, false);
						const str2 = '<div class="text center">“五禽戏”顺序：<br>' + storage.join(" ") + "</div>";
						dialog.addText(str2);
						if (storage.length > 1) {
							const str3 = `<div class="text" style="font-size:10px; ">[下一效果] ${wuqinxiMap.find(str => storage[1] == str[0])}<br></div>`;
							dialog.add(str3);
						}
					},
				},
				mod: {
					targetEnabled(card, player, target) {
						if (get.type(card) == "delay" && target.storage.qmsgswkjsgj_wuling_wuqinxi && target.storage.qmsgswkjsgj_wuling_wuqinxi[0] == "鹿") {
							return false;
						}
					},
				},
				trigger: {
					source: "damageBegin1",
					player: ["phaseZhunbeiBegin", "damageBegin4", "qmsgswkjsgj_wuling_change"],
				},
				filter(event, player, name) {
					const wuqinxi = player.storage.qmsgswkjsgj_wuling_wuqinxi && player.storage.qmsgswkjsgj_wuling_wuqinxi[0];
					if (!wuqinxi) {
						return false;
					}
					if (event.name == "phaseZhunbei") {
						return true;
					}
					switch (name) {
						case "damageBegin1":
							if (wuqinxi != "虎" || !event.card) {
								return false;
							}
							var evt = event.getParent("useCard");
							return evt.targets && /*evt.targets.length == 1 &&*/ evt.targets.includes(event.player);
						case "damageBegin4":
							return wuqinxi == "熊" //&& !player.hasSkill("qmsgswkjsgj_wuling_xiong");
						default:
							switch (wuqinxi) {
								case "鹿":
									return player.isDamaged() || player.countCards("j");
								case "鹤":
									return true;
								case "猿":
									return game.hasPlayer(target => target != player && target.countGainableCards(player, "e"));
								default:
									return false;
							}
					}
				},
				forced: true,
				onremove: true,
				content() {
					"step 0";
					var wuqinxi = player.storage.qmsgswkjsgj_wuling_wuqinxi[0];
					if (trigger.name == "phaseZhunbei") {
						lib.skill.qmsgswkjsgj_wuling.updateMark(player);
						event.finish();
					} else {
						var name = event.triggername;
						switch (name) {
							case "damageBegin1":
								player.line(trigger.player);
								trigger.num++;
								event.finish();
								break;
							case "damageBegin4":
								// player.addTempSkill("qmsgswkjsgj_wuling_xiong");
								trigger.num--;
								event.finish();
								break;
							default:
								switch (wuqinxi) {
									case "鹿":
										player.recover(2);
										player.discard(player.getCards("j")).discarder = player;
										event.finish();
										break;
									case "鹤":
										player.draw(5);
										event.finish();
										break;
									case "猿":
										player
											.chooseTarget("五禽戏：获得一名其他角色装备区里的所有装备牌", function (card, player, target) {
												return target != player && target.countGainableCards(player, "e");
											})
											.set("ai", function (target) {
												var player = _status.event.player;
												var att = get.attitude(player, target),
													eff = 0;
												target.getCards("e", function (card) {
													var val = get.value(card, target);
													eff = Math.max(eff, -val * att);
												});
												return eff;
											});
										break;
								}
								break;
						}
					}
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						player.line(target, "green");
						player.gainPlayerCard(target, "e",target.countCards('e'), true);
					}
				},
				ai: {
					effect: {
						target(card, player, target) {
							const wuqinxi = target.storage.qmsgswkjsgj_wuling_wuqinxi;
							if (!wuqinxi || !wuqinxi.length) {
								return;
							}
							const curWuqinxi = wuqinxi[0];
							const nextWuqinxi = wuqinxi[1];
							if (nextWuqinxi == "鹿" && get.type(card) == "delay") {
								return "zerotarget";
							}
							if (curWuqinxi != "熊" || player.hasSkill("qmsgswkjsgj_wuling_xiong")) {
								return;
							}
							if (player.hasSkillTag("jueqing", false, target)) {
								return;
							}
							var num = get.tag(card, "damage");
							if (num) {
								if (num > 1) {
									return 0.5;
								}
								return 0;
							}
						},
					},
				},
			},
			xiong: { charlotte: true },
			die: {
				trigger: { player: "die" },
				filter(event, player) {
					return game.hasPlayer(current => current.additionalSkills[`qmsgswkjsgj_wuling_${player.playerid}`]);
				},
				forced: true,
				locked: false,
				forceDie: true,
				content() {
					var targets = game.filterPlayer(current => {
						return current.additionalSkills[`qmsgswkjsgj_wuling_${player.playerid}`];
					});
					player.line(targets);
					targets.forEach(current => current.removeAdditionalSkill(`qmsgswkjsgj_wuling_${player.playerid}`));
				},
			},
			//这玩意没写出来，别加！
			change:{
				audio:'qmsgswkjsgj_wuling',
				enable:'phaseUse',
				filter(event,player){
					return true;
				},
				filterTarget(card,player,target){
					return target.storage.qmsgswkjsgj_wuling_wuqinxi && target.storage.qmsgswkjsgj_wuling_wuqinxi.length>1;
				},
			},
		},
	},
	//孟婆
	// qmsgswkjsgj_aotang:{
	// 	audio: 'ext:夜白神略/audio/character:1',
	// 	// master:['boss_mengpo','qmsgswkjsgj_mengpo'],
	// 	master:['孟婆'],
	// 	trigger:{
	// 		player:'phaseBegin',
	// 	},
	// 	filter(event,player){
	// 		var namex = lib.skill.qmsgswkjsgj_aotang.master;
	// 		const names = get
	// 				.characterSurname(player.name)
	// 				.map(info => info.join(""))
	// 				.concat([get.rawName(player.name)]);
	// 		if(!names)return false;
	// 		return game.countPlayer(current=>player.getEnemies().includes(current))>0
	// 	},
	// 	forced:true,
	// 	locked:false,
	// 	content(){
	// 		var list = game.filterPlayer(function (current) {
	// 			return current != player&&player.getEnemies().includes(current);
	// 		});
	// 		if (list.length) {
	// 			var target = list.randomGet();
	// 			player.line(target);
	// 			var skills = game.filterSkills(
	// 				target.getStockSkills(true, true).filter(skill => {
	// 					const info = get.info(skill);
	// 					return !info.persevereSkill || !info.charlotte;
	// 				}),
	// 				target
	// 			);
	// 			target.disableSkill("qmsgswkjsgj_aotang", skills);
	// 			target.addTempSkill("qmsgswkjsgj_aotang_restore");
				
	// 		}
	// 	},
	// },
	qmsgswkjsgj_yunju:{
		audio: 'boss_yunjv',
		trigger: {
			global: 'phaseEnd',
		},
		forced: true,
		filter(event, player) {
			return player.getEnemies().includes(event.player) && event.player.countCards('he') > 0 && event.player != player;
		},
		logTarget: 'player',
		content() {
			if (trigger.player.countCards('h') > 0) {
				var card1 = trigger.player.getCards('h').randomGet();
				trigger.player.discard(card1);
			}
		},
		ai: {
			expose: 0.2,
		},

	},
	//神孙笨
	qmsgswkjsgj_yingba: {
		audio: 'yingba',
		mod: {
			aiOrder(player, card, num) {
				if (num > 0 && _status.event && _status.event.type == "phase" && get.tag(card, "recover")) {
					if (player.needsToDiscard()) {
						return num / 3;
					}
					return 0;
				}
			},
			targetInRange(card, player, target) {
				if (target.hasMark("yingba_mark")) {
					return true;
				}
			},
			cardUsableTarget(card,player,target){
				if(target.hasMark("yingba_mark")){
					return true;
				}
			}
		},
		enable: "phaseUse",
		usable: 2,
		filter: (event, player) => game.hasPlayer(current => current != player),
		filterTarget: (card, player, target) => target != player ,
		content() {
			"step 0";
			target.loseMaxHp();
			"step 1";
			if (target.isIn()) {
				target.addMark("yingba_mark", 1);
			}
			player.loseMaxHp();
		},
		locked: false,
		//global:'yingba_mark',
		ai: {
			threaten(player, target) {
				if (player === target || player.isDamaged() || get.attitude(player, target) > 0) {
					return 1;
				}
				return 8 / player.maxHp;
			},
			order: 11,
			result: {
				player(player, target) {
					if (player.maxHp == 1) {
						return -2.5;
					}
					return -0.25;
				},
				target(player, target) {
					if (target.isHealthy()) {
						return -2;
					}
					if (!target.hasMark("yingba_mark")) {
						return -1;
					}
					return -0.2;
				},
			},
		},
		subSkill: {
			mark: {
				marktext: "定",
				intro: {
					name: "平定",
					content: "mark",
					onunmark: true,
				},
				mod: {
					maxHandcard(player, numx) {
						var num = player.countMark("yingba_mark");
						if (num) {
							return (
								numx +
								num *
									game.countPlayer(function (current) {
										return current.hasSkill("qmsgswkjsgj_yingba");
									})
							);
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_scfuhai: {
		audio: 'scfuhai',
		trigger: { player: "useCardToPlayered" },
		forced: true,
		filter(event, player) {
			return event.target && event.target.hasMark("yingba_mark");
		},
		logTarget: "target",
		content() {
			trigger.directHit.add(trigger.target);
			player.draw();
		},
		group: ["qmsgswkjsgj_scfuhai_die",'qmsgswkjsgj_scfuhai_usea'],
		ai: {
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				return arg && arg.target && arg.target.hasMark("yingba_mark");
			},
			combo: "qmsgswkjsgj_yingba",
		},
		subSkill: {
			usea: {
				audio: "qmsgswkjsgj_scfuhai",
				trigger: { player: "useCardAfter" },
				// forced: true,
				prompt: "是否移除其“平定”标记，并恢复X点体力上限",
				filter(event, player) {
					return lib.skill.qmsgswkjsgj_scfuhai_usea.logTarget(event, player).length > 0;
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
					if (num) {
						player.gainMaxHp(num);
					}
				},
			},
			die: {
				audio: "qmsgswkjsgj_scfuhai",
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
	qmsgswkjsgj_pinghe: {
		audio: 'pinghe',
		mod: {
			maxHandcardBase(player) {
				return player.getDamagedHp()+3;
			},
		},
		trigger: { player: "damageBegin2" },
		forced: true,
		filter(event, player) {
			return event.source && event.source != player && player.maxHp > 1 && player.countCards("h") > 0;
		},
		content() {
			"step 0";
			trigger.cancel();
			player.loseMaxHp();
			"step 1";
			player.chooseCardTarget({
				prompt: "请选择【冯河】的牌和目标",
				prompt2: "将一张手牌交给一名其他角色并防止伤害" + (player.hasSkill("qmsgswkjsgj_yingba") ? "，然后令伤害来源获得一个“平定”标记" : ""),
				filterCard: true,
				// forced: true,
				filterTarget: lib.filter.notMe,
				ai1(card) {
					if (
						get.tag(card, "recover") &&
						!game.hasPlayer(function (current) {
							return get.attitude(current, player) > 0 && !current.hasSkillTag("nogain");
						})
					) {
						return 0;
					}
					return 1 / Math.max(0.1, get.value(card));
				},
				ai2(target) {
					var player = _status.event.player,
						att = get.attitude(player, target);
					if (target.hasSkillTag("nogain")) {
						att /= 9;
					}
					return 4 + att;
				},
			});
			"step 2";
			if (result.bool) {
				var target = result.targets[0];
				//player.logSkill('qmsgswkjsgj_pinghe',target);
				player.line(target, "green");
				player.give(result.cards, target);
			}
			'step 3'
			if (player.hasSkill("qmsgswkjsgj_yingba")) {
				trigger.source.addMark("yingba_mark", 1);
			}
		},
		ai: {
			maixie_defend: true,
			effect: {
				target(card, player, target) {
					if (player !== target && target.maxHp > 1 && target.countCards("h") > 0) {
						if (get.tag(card, "damage") && target.hasSkill("qmsgswkjsgj_yingba")) {
							let damage = 1.6;
							if (target.isHealthy()) {
								damage += 1.6;
							}
							if (
								game.hasPlayer(cur => {
									return cur !== target && get.attitude(target, cur) > 0;
								})
							) {
								damage -= 0.9;
							}
							return [0, -damage, 0, -0.4];
						}
						if (card.name === "tiesuo") {
							return 0.4;
						}
					}
					if (get.tag(card, "recover") && _status.event.type == "phase" && !player.needsToDiscard()) {
						return 0;
					}
				},
			},
		},
	},
	// qmsgswkjsgj_shenjiang_audio:{
	// 	audio:'jiang_re_sunben',
	// },
	qmsgswkjsgj_shenhunzi:{
		audio: 'rehunzi',
		// trigger: { player: "phaseBegin" },
		// filter(event, player) {
		// 	return player.countCards("h") > 0;
		// },
		trigger:{
			global:'phaseBefore',
			player:'enterGame',
		},
		forced:true,
		filter(event,player){
			return (event.name!='phase'||game.phaseNumber==0)
		},
		content() {
			player.addSkills(['qmsgswkjsgj_shenyingzi','qmsgswkjsgj_shenyinghun'])
		},
		derivation:['qmsgswkjsgj_shenyingzi','qmsgswkjsgj_shenyinghun'],
		ai: {
			threaten: 1.5,
			expose: 0.2,
		},
		// subSkill:{
		// 	audio:{
		// 		audio:'reyingzi_re_sunben',
		// 	}
		// },
	},
	qmsgswkjsgj_shenyingzi:{
		audio:'reyingzi',
		trigger: { player: "phaseDrawBegin2" },
		forced: true,
		preHidden: true,
		filter(event, player) {
			return !event.numFixed;
		},
		content() {
			trigger.num++;
		},
		ai: {
			threaten: 1.5,
		},
	},
	qmsgswkjsgj_shenyinghun:{
		audio:'yinghun',
		mod: {
			aiOrder(player, card, num) {
				if (num > 0 && _status.event && _status.event.type == "phase" && get.tag(card, "recover")) {
					if (player.needsToDiscard()) {
						return num / 3;
					}
					return 0;
				}
			},
		},
		locked: false,
		trigger: { player: "phaseZhunbeiBegin" },
		preHidden: true,
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill), function (card, player, target) {
					return player != target;
				})
				.set("ai", function (target) {
					const player = _status.event.player;
					// if (player.getDamagedHp() == 1 && target.countCards("he") == 0) {
					// 	return 0;
					// }
					if (get.attitude(_status.event.player, target) > 0) {
						return 10 + get.attitude(_status.event.player, target);
					}
					// if (player.getDamagedHp() == 1) {
					// 	return -1;
					// }
					return 1;
				})
				.setHiddenSkill(event.name.slice(0, -5))
				.forResult();
		},
		async content(event, trigger, player) {
			const num = player.getDamagedHp();
			const [target] = event.targets;
			let directcontrol = num == 1;
			if (!directcontrol) {
				const str1 = "摸" + get.cnNumber(num, true) ;
				const str2 = "弃" + get.cnNumber(num, true);
				directcontrol =
					str1 ==
					(await player
						.chooseControl(str1, str2, function (event, player) {
							if (player.isHealthy()) {
								return 1 - _status.event.choice;
							}
							return _status.event.choice;
						})
						.set("choice", get.attitude(player, target) > 0 ? 0 : 1)
						.forResultControl());
			}
			if (directcontrol) {
				if (num > 0) {
					await target.draw(num);
				}
				// await target.chooseToDiscard(true, "he");
			} else {
				// await target.draw();
				if (num > 0) {
					await target.chooseToDiscard(num, true, "he", "allowChooseAll");
				}
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (
						get.tag(card, "damage") &&
						get.itemtype(player) === "player" &&
						target.hp >
							(player.hasSkillTag("damageBonus", true, {
								target: target,
								card: card,
							})
								? 2
								: 1)
					) {
						return [1, 0.5];
					}
				},
			},
			threaten(player, target) {
				return Math.max(0.5, target.getDamagedHp() / 2);
			},
			maixie: true,
		},
	},










	
	//界势陆郁生
	qmsgswkjsgj_mbrunwei: {
		audio: 'mbrunwei',
		logAudio: index => (typeof index === "number" ? "mbrunwei" + index + ".mp3" : 2),
		enable: "phaseUse",
		usable: 1,
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog(get.prompt2("qmsgswkjsgj_mbrunwei"));
			},
			chooseControl(event, player) {
				return [1, 2, 3, 4, 5, "cancel2"];
			},
			check() {
				return 4;
			},
			backup(result, player) {
				return {
					num: result.control,
					log: false,
					delay: false,
					async content(event, trigger, player) {
						const num = lib.skill.qmsgswkjsgj_mbrunwei_backup.num,
							skill = "qmsgswkjsgj_mbrunwei";
						const cards = get.cards(num, true);
						player.logSkill("qmsgswkjsgj_mbrunwei", null, null, null, [get.rand(1, 2)]);
						await player.showCards(cards, `${get.translation(player)}发动了〖${get.translation(skill)}〗`);
						const used = player.hasSkill(skill + "_twice");
						// if (
						// 	used &&
						// 	!game.hasPlayer(target => {
						// 		return !target.hasHistory("gain", evt => evt.cards?.length);
						// 	})
						// ) {
						// 	return;
						// }
						const red = cards.filter(card => get.color(card, false) == "red"),
							black = cards.filter(card => get.color(card, false) == "black");
						const list = get.addNewRowList(cards, "color");
						const result = await player
							.chooseButtonTarget({
								createDialog: [[[[`润微：选择一名角色令其获得其中一种颜色的牌`], "addNewRow"], list.map(item => [Array.isArray(item) ? item : [item], "addNewRow"])]],
								css: {
									position: "absolute",
									top: get.is.phoneLayout() ? "35%" : "45%",
								},
								forced: true,
								used: used,
								targetsx: game.filterPlayer(target => !target.hasHistory("gain", evt => evt.cards?.length)),
								filterButton(button) {
									return button.links.length;
								},
								filterTarget(card, player, target) {
									// if (get.event().used) {
									// 	return get.event().targetsx?.includes(target);
									// }
									return true;
								},
								ai1(button) {
									return button.links.length;
								},
								ai2(target) {
									const player = get.player();
									if (!get.event().used && player == target) {
										return 114514;
									}
									return get.attitude(player, target);
								},
							})
							.forResult();
						if (result?.links && result?.targets) {
							const target = result.targets[0],
								gain = result.links[0] == "black" ? black : red;
							player.line(target);
							if (!player.hasSkill(skill + "_twice")) {
								player.addTempSkill(skill + "_twice", "phaseChange");
							}
							player.addMark(skill + "_twice", gain.length, false);
							player.addTip(skill + "_twice", `润微  ${gain.length}`);
							let gaintag = [];
							if (player == target) {
								gaintag = ["qmsgswkjsgj_mbrunwei"];
								player
									.when({ player: "phaseUseEnd" })
									.filter(evt => event.getParent("phaseUse") == evt)
									.then(() => {
										// const cards = player.getCards("h", card => card.hasGaintag("qmsgswkjsgj_mbrunwei"));
										// if (cards.length) {
											player.logSkill("qmsgswkjsgj_mbrunwei", null, null, null, [4]);
										// 	player.modedDiscard(cards).set("discarder", player);
										// }
									});
							}
							const next = target.gain(gain, "gain2");
							next.gaintag.addArray(gaintag);
							await next;
						}
					},
				};
			},
		},
		ai: {
			order: 10,
			result: {
				player(player) {
					// const used = player.hasSkill("qmsgswkjsgj_mbrunwei_twice");
					// if (!used) {
					// 	return 1;
					// } else if (
					// 	game.hasPlayer(target => {
					// 		return !target.hasHistory("gain", evt => evt.cards.length) && get.attitude(player, target) > 0;
					// 	})
					// ) {
					// 	return 1;
					// }
					// return 0;
					return 1
				},
			},
		},
		subSkill: {
			twice: {
				onremove(player, skill) {
					delete player.storage[skill];
					player.removeTip(skill);
				},
				intro: {
					markcount: "mark",
					content: "再失去#张牌重置技能",
				},
				trigger: {
					player: "loseAfter",
					global: ["loseAsyncAfter", "equipAfter", "gainAfter", "addToExpansionAfter", "addJudgeAfter"],
				},
				filter(event, player) {
					return event.getl(player)?.cards2?.length && player.hasMark("qmsgswkjsgj_mbrunwei_twice");
				},
				silent: true,
				content() {
					const num = trigger.getl(player)?.cards2?.length;
					if (num >= player.countMark(event.name)) {
						player.logSkill("qmsgswkjsgj_mbrunwei", null, null, null, [3]);
						get.info(event.name).onremove(player, event.name);
						player.unmarkSkill(event.name);
						delete player.getStat().skill.qmsgswkjsgj_mbrunwei;
						game.log(player, "重置了", `#g【${get.translation(event.name)}】`);
					} else {
						player.removeMark(event.name, num, false);
						player.addTip(event.name, `润微  ${player.countMark(event.name)}`);
					}
				},
			},
		},
	},
	qmsgswkjsgj_mbshuanghuai: {
		audio: 'mbshuanghuai',
		logAudio: index => (typeof index === "number" ? "mbshuanghuai" + index + ".mp3" : 3),
		init(player, skill) {
			const history = player.getAllHistory("useSkill", evt => evt.skill == skill && evt.targets);
			if (history.length) {
				const target = history[history.length - 1].targets[0];
				if (target) {
					player.storage[skill] = target;
					player.markSkill(skill);
					player.addTip(skill, `霜怀 ${get.translation(target)}`);
				}
			}
		},
		onremove(player, skill) {
			delete player.storage[skill];
			player.removeTip(skill);
		},
		trigger: { global: "damageBegin4" },
		usable: 1,
		filter(event, player) {
			return get.distance(player, event.player) <= 1 ;
		},
		popup: false,
		logTarget: "player",
		async cost(event, trigger, player) {
			const result = await player
				.chooseButton([
					get.prompt2(event.skill, trigger.player),
					[
						[
							["cancel", `防止此伤害`],
							["tao", `令其从弃牌堆获得一张【桃】`],
						],
						"textbutton",
					],
				])
				.set("filterButton", button => {
					return get.event().links.includes(button.link);
				})
				.set(
					"links",
					["cancel", "tao"].filter(link => {
						if (link == "tao") {
							const card = get.discardPile(cardx => cardx.name == "tao");
							if (!card) {
								return false;
							}
						}
						return true;
					})
				)
				.set("ai", button => {
					const trigger = get.event().getTrigger(),
						eff = get.damageEffect(trigger.player, trigger.source, get.player());
					if (eff > 0) {
						return 0;
					}
					if (trigger.player.hasSkillTag("maixie") && trigger.num === 1 && button.link == "tao") {
						return 1 + Math.random();
					}
					return Math.random();
				})
				.forResult();
			if (result.bool) {
				event.result = {
					bool: true,
					cost_data: result.links[0],
				};
			}
		},
		async content(event, trigger, player) {
			const link = event.cost_data,
				target = trigger.player,
				last = player.storage[event.name];
			player.logSkill("qmsgswkjsgj_mbshuanghuai", target, null, null, [link == "cancel" ? 1 : 2]);
			if (link == "cancel") {
				trigger.cancel();
			} else {
				const card = get.discardPile("tao");
				if (card) {
					await target.gain(card, "gain2");
				}
			}
			if (last && last == target) {
				await game.asyncDraw([player, target]);
				return;
			}
			// if (last && last != target) {
			// 	player.logSkill("qmsgswkjsgj_mbshuanghuai", null, null, null, [3]);
			// 	await player.loseHp();
			// }
			player.storage[event.name] = target;
			player.markSkill(event.name);
			player.addTip(event.name, `霜怀 ${get.translation(target)}`);
		},
		intro: {
			content: "player",
			markcount: () => 0,
		},
	},
	//势魏延
	qmsgswkjsgj_potzhongao: {
		audio: 'potzhongao',
		dutySkill: true,
		derivation: ["qmsgswkjsgj_potkuanggu", "qmsgswkjsgj_potkuanggu_pot_weiyan_achieve", "kunfenx"],
		group: ["qmsgswkjsgj_potzhongao_start", "qmsgswkjsgj_potzhongao_achieve", "qmsgswkjsgj_potzhongao_fail"],
		subSkill: {
			start: {
				audio: "potzhongao1.mp3",
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				filter(event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					await player.addSkills("qmsgswkjsgj_potkuanggu");
				},
			},
			achieve: {
				audio: ["potzhongao2.mp3", "potzhongao3.mp3"],
				trigger: {
					source: "dieAfter",
				},
				forced: true,
				locked: false,
				skillAnimation: true,
				animationColor: "fire",
				async content(event, trigger, player) {
					await player.awakenSkill(event.name.slice(0, -8));
					game.log(player, "成功完成使命");
					// await player.changeSkin({ characterName: "qmsgswkjsgj_pot_weiyan" }, "qmsgswkjsgj_pot_weiyan_achieve");
					player.changeSkin("qmsgswkjsgj_potzhongao", "qmsgswkjsgj_pot_weiyan_achieve");
					game.broadcastAll(() => {
						_status.tempMusic = "effect_yinzhanBGM";
						game.playBackgroundMusic();
					});
					await player.setStorage("potkuanggu", 1);
					const num1 = player.countMark("qmsgswkjsgj_potzhuangshi_limit"),
						num2 = player.countMark("qmsgswkjsgj_potzhuangshi_directHit");
					if (num1 > 0) {
						await player.draw();
					}
					if (num2 > 0) {
						if (!player.isDamaged()) {
							await player.draw();
						} else {
							await player.recover();
						}
					}
				},
			},
			fail: {
				audio: ["potzhongao4.mp3", "potzhongao5.mp3"],
				trigger: {
					player: ["dying", "phaseUseBegin"],
				},
				filter(event, player) {
					return event.name == "dying" || !event.usedZhuangshi;
				},
				lastDo: true,
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					player.awakenSkill(event.name.slice(0, -5));
					game.log(player, "使命失败");
					// player.changeSkin({ characterName: "qmsgswkjsgj_pot_weiyan" }, "qmsgswkjsgj_pot_weiyan_fail");
					player.changeSkin("qmsgswkjsgj_potzhongao", "qmsgswkjsgj_pot_weiyan_fail");
					game.broadcastAll(() => {
						_status.tempMusic = "effect_tuishouBGM";
						game.playBackgroundMusic();
					});
					player.storage.kunfen = true;
					await player.changeSkills(["kunfen"], ["qmsgswkjsgj_potzhuangshi"]);
				},
			},
		},
	},
	qmsgswkjsgj_potzhuangshi: {
		audio: 'potzhuangshi',
		audioname: ["pot_weiyan_achieve"],
		trigger: {
			player: "phaseUseBegin",
		},
		async cost(event, trigger, player) {
			const { bool: bool1, cards } = await player
				.chooseToDiscard(get.prompt(event.skill), [0, Infinity], "h", "allowChooseAll")
				.set("prompt2", "弃置任意张手牌，令你此阶段使用的前等量+1张牌无距离限制且不可被响应")
				.set("ai", card => {
					const player = get.player();
					let num = Math.floor(player.countCards("h") / 2);
					if (!game.hasPlayer(current => get.attitude(player, current) < 0)) {
						num = 1;
					}
					if (ui.selected.cards.length < num && card.name != "du") {
						if (get.tag(card, "damage")) {
							return 0.1 - ui.selected.cards.length;
						}
						return 7 - get.value(card);
					}
					return 0;
				})
				.set("chooseonly", true)
				.forResult();
			if (bool1 && cards.length) {
				game.broadcastAll(cards => {
					cards.forEach(card => card.addGaintag("qmsgswkjsgj_potzhuangshi_tag"));
				}, cards);
			}
			const { bool: bool2, numbers } = await player
				.chooseNumbers(get.prompt(event.skill), [
					{
						prompt: "失去任意点体力值，令你此阶段使用的前等量+1张牌不计入次数限制",
						min: 0,
						max: player.getHp(),
					},
				])
				.set("processAI", () => {
					const player = get.player();
					if (player.hp < 2 || !game.hasPlayer(current => get.attitude(player, current) < 0)) {
						return false;
					}
					let num = Math.min(Math.floor(player.countCards("h") / 2), player.hp - 1);
					return [num];
				})
				.forResult();
			event.result = {
				bool: bool1 || bool2,
				cards: cards,
				cost_data: numbers,
			};
			player.removeGaintag("qmsgswkjsgj_potzhuangshi_tag");
		},
		async content(event, trigger, player) {
			trigger.set("usedZhuangshi", true);
			const { cards, cost_data: numbers } = event;
			if (cards) {
				const number = cards.length+1;
				player.addTempSkill("qmsgswkjsgj_potzhuangshi_directHit", "phaseChange");
				player.addMark("qmsgswkjsgj_potzhuangshi_directHit", number, false);
				player.addTip("qmsgswkjsgj_potzhuangshi_directHit", `不可响应 ${number}`);
			}
			if (numbers) {
				const number = numbers[0]+1;
				player.addTempSkill("qmsgswkjsgj_potzhuangshi_limit", "phaseChange");
				player.addMark("qmsgswkjsgj_potzhuangshi_limit", number, false);
				player.addTip("qmsgswkjsgj_potzhuangshi_limit", `不计次数 ${number}`);
			}
			if (cards&&cards.length) {
				await player.modedDiscard(cards);
			}
			if (numbers&&numbers[0]>=0) {
				const number = numbers[0];
				await player.loseHp(number);
			}
		},
		onremove(player) {
			player.removeSkill("qmsgswkjsgj_potzhuangshi_directHit");
			player.removeSkill("qmsgswkjsgj_potzhuangshi_limit");
		},
		subSkill: {
			limit: {
				trigger: {
					player: "useCard0",
				},
				charlotte: true,
				filter(event, player) {
					return player.hasMark("qmsgswkjsgj_potzhuangshi_limit");
				},
				forced: true,
				popup: false,
				firstDo: true,
				async content(event, trigger, player) {
					if (trigger.addCount !== false) {
						trigger.addCount = false;
						const stat = player.getStat().card,
							name = trigger.card.name;
						if (typeof stat[name] == "number") {
							stat[name]--;
						}
					}
					player.removeMark("qmsgswkjsgj_potzhuangshi_limit", 1, false);
					const num = player.countMark("qmsgswkjsgj_potzhuangshi_limit");
					if (num > 0) {
						player.addTip("qmsgswkjsgj_potzhuangshi_limit", `不计次数 ${num}`);
					} else {
						player.removeTip("qmsgswkjsgj_potzhuangshi_limit");
					}
				},
				onremove(player, skill) {
					player.clearMark(skill, false);
					player.removeTip(skill);
				},
				ai: {
					presha: true,
					skillTagFilter(player, tag, arg) {
						if (!player.hasMark("qmsgswkjsgj_potzhuangshi_limit")) {
							return false;
						}
					},
				},
			},
			directHit: {
				trigger: {
					player: "useCard0",
				},
				charlotte: true,
				filter(event, player) {
					return player.hasMark("qmsgswkjsgj_potzhuangshi_directHit");
				},
				forced: true,
				popup: false,
				firstDo: true,
				async content(event, trigger, player) {
					trigger.directHit.addArray(game.players);
					player.removeMark("qmsgswkjsgj_potzhuangshi_directHit", 1, false);
					const num = player.countMark("qmsgswkjsgj_potzhuangshi_directHit");
					if (num > 0) {
						player.addTip("qmsgswkjsgj_potzhuangshi_directHit", `不可响应 ${num}`);
					} else {
						player.removeTip("qmsgswkjsgj_potzhuangshi_directHit");
					}
				},
				onremove(player, skill) {
					player.clearMark(skill, false);
					player.removeTip(skill);
				},
				mod: {
					targetInRange(card, player) {
						if (player.hasMark("qmsgswkjsgj_potzhuangshi_directHit")) {
							return true;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_potyinzhan: {
		audio: 'potyinzhan',
		audioname: ["pot_weiyan_achieve", "pot_weiyan_fail"],
		trigger: {
			source: "damageBegin1",
		},
		forced: true,
		filter(event, player) {
			// if (event.card?.name != "sha") {
			// 	return false;
			// }
			const target = event.player;
			if (player.hp <= target.hp || player.countCards("he") <= target.countCards("he")) {
				return true;
			}
			return false;
		},
		logTarget: "player",
		popup: false,
		logAudio: (player, indexedData) => "potyinzhan" + (lib.skill.qmsgswkjsgj_potyinzhan.audioname.includes('qmsgswkjsgj_'+player.skin.name) ? "_" + player.skin.name : "") + (indexedData ? indexedData : get.rand(1, 2)) + ".mp3",
		async content(event, trigger, player) {
			const target = trigger.player,
				bool1 = target.hp >= player.hp,
				bool2 = target.countCards("he") >= player.countCards("he");
			player.logSkill("qmsgswkjsgj_potyinzhan", null, null, null, [player, bool1 && bool2 ? 3 : get.rand(1, 2)]);
			if (bool1) {
				trigger.num++;
			}
			if (bool2) {
				if (bool1) {
					player.popup("乘势", "fire");
				}
				player
					.when("useCardAfter")
					.filter(evt => evt == trigger.getParent(2))
					.step(async (event, trigger, player) => {
						let result;
						if (target.isIn() && target.countDiscardableCards(player, "he")) {
							result = await player.discardPlayerCard(target, "he", true).forResult();
						}
						if (bool1) {
							await player.recover();
							if (result?.cards?.length) {
								await player.gain(result.cards.filterInD("od"), "gain2");
							}
						}
					});
			}
		},
	},
	qmsgswkjsgj_potkuanggu: {
		audio: 'potkuanggu',
		audioname: ["pot_weiyan_fail"],
		audioname2: {
			pot_weiyan_achieve: "potkuanggu_pot_weiyan_achieve",
		},
		trigger: {
			source: "damageSource",
		},
		filter(event, player) {
			return event.num > 0;
		},
		getIndex(event,player){
			return event.num;
		},
		frequent: true,
		popup: false,
		logAudio: (player, indexedData) => "potkuanggu" + (lib.skill.potkuanggu.audioname.includes(player.skin.name) ? "_" + player.skin.name : "") + (indexedData ? indexedData : get.rand(1, 2)) + ".mp3",
		logAudio2: {
			pot_weiyan_achieve: (player, indexedData) => "potkuanggu_pot_weiyan_achieve" + (indexedData ? indexedData : get.rand(1, 2)) + ".mp3",
		},
		async cost(event, trigger, player) {
			let choice,
				list = ["draw_card"],
				choiceList = ["选项一：回复1点体力", "选项二：摸一张牌"];
			if (player.getStorage('potkuanggu', 0) && player.countCards("he")) {
				list.push("背水！");
				choiceList.push("背水：弃置一张牌并令你本阶段使用【杀】的次数+1");
			}
			if (player.isDamaged()) {
				list.unshift("recover_hp");
			} else {
				choiceList[0] = `<span class = 'transparent'>${choiceList[0]}</span>`;
			}
			if (list.length == 1) {
				event.result = await player.chooseBool(get.prompt('potkuanggu'), "摸一张牌").set("frequentSkill", 'potkuanggu').forResult();
				event.result.cost_data = "draw_card";
			} else {
				list.push("cancel2");
				if (
					player.isDamaged() &&
					get.recoverEffect(player) > 0 &&
					player.countCards("hs", function (card) {
						return card.name == "sha" && player.hasValueTarget(card);
					}) >= player.getCardUsable("sha")
				) {
					if (player.countCards("he") > 1 && list.includes("背水！")) {
						choice = "背水！";
					} else {
						choice = "recover_hp";
					}
				} else {
					choice = "draw_card";
				}
				const control = await player
					.chooseControl(list)
					.set("prompt", get.prompt('potkuanggu'))
					.set("choiceList", choiceList)
					.set("displayIndex", false)
					.set("choice", choice)
					.set("ai", () => {
						return get.event().choice;
					})
					.forResultControl();
				event.result = {
					bool: control != "cancel2",
					cost_data: control,
				};
			}
		},
		async content(event, trigger, player) {
			const result = event.cost_data;
			if (result == "背水！" && player.skin.name === "pot_weiyan_achieve") {
				player.logSkill("qmsgswkjsgj_potkuanggu", null, null, null, [player, get.rand(3, 4)]);
			} else {
				player.logSkill("qmsgswkjsgj_potkuanggu", null, null, null, [player]);
			}
			if (result == "recover_hp" || result == "背水！") {
				await player.recover();
			}
			if (result == "draw_card" || result == "背水！") {
				await player.draw();
			}
			if (result == "背水！" && player.countCards("he")) {
				await player.chooseToDiscard("he", true);
				player.addTempSkill("potkuanggu_effect", "phaseChange");
				player.addMark("potkuanggu_effect", 1, false);
			}
		},
		subSkill: {
			pot_weiyan_achieve: {
				audio: 'potkuanggu_pot_weiyan_achieve',
			},
			effect: {
				charlotte: true,
				onremove: true,
				mod: {
					cardUsable(card, player, num) {
						if (player.countMark("potkuanggu_effect") && card.name == "sha") {
							return num + player.countMark("potkuanggu_effect");
						}
					},
				},
			},
		},
	},
	kunfen_qmsgswkjsgj_pot_weiyan: { audio: 'kunfen_pot_weiyan' },
	//势太史慈 ---
	qmsgswkjsgj_potzhanlie: {
		audio: 'potzhanlie',
		trigger: { global: "phaseBegin" },
		forced: true,
		locked: false,
		logAudio: () => 2,
		content() {
			// const effectMap = new Map([
			// 	["hp", player.getHp()],
			// 	["damagedHp", player.getDamagedHp()],
			// 	["countplayer", game.countPlayer()],
			// ]);
			// const num = effectMap.get(player.storage.potzhanlie) || player.getAttackRange();
			player.addTempSkill("qmsgswkjsgj_potzhanlie_addMark");
			//保留原本的时机听语音
			// if (num > 0) {
			// 	player.addMark("addMark", num, false);
			// }
		},
		get limit() {
			return 6;
		},
		group: "qmsgswkjsgj_potzhanlie_lie",
		subSkill: {
			addMark: {
				charlotte: true,
				onremove: true,
				audio: "potzhanlie3.mp3",
				trigger: { global: ["loseAfter", "loseAsyncAfter", "cardsDiscardAfter"] },
				getIndex(event, player) {
					console.log(event.getd().filter(i => i.name === "sha").length)
					return Math.min(
						event.getd().filter(i => i.name === "sha").length,
						get.info("qmsgswkjsgj_potzhanlie").limit - player.countMark("qmsgswkjsgj_potzhanlie_lie"),
						// Math.max(
						// 	player.countMark("potzhanlie_addMark") -
						// 	game
						// 		.getGlobalHistory(
						// 			"everything",
						// 			evt => {
						// 				if (evt === event) {
						// 					return false;
						// 				}
						// 				return ["lose", "loseAsync", "cardsDiscard"].includes(evt.name) && evt.getd().some(i => i.name === "sha");
						// 			},
						// 			event
						// 		)
						// 		.reduce((sum, evt) => sum + evt.getd().filter(i => i.name === "sha").length, 0),
						// 	0
						// )
					);
					// return event.getd().filter(i => i.name === "sha").length;
				},
				forced: true,
				content() {
					player.addMark("qmsgswkjsgj_potzhanlie_lie", 1);
				},
				intro: { content: "本回合前#张【杀】进入弃牌堆后，获得等量“烈”标记" },
			},
			lie: {
				trigger: { global: "phaseUseEnd" },
				filter: (event, player) => {
					if(player.hasUseTarget(new lib.element.VCard({ name: "sha", isCard: true }), false)){
						if(player.hasSkill('qmsgswkjsgj_potzhanlie_plus'))return true;
						else {
							event.player==player;
						}
					}
					// player.hasUseTarget(new lib.element.VCard({ name: "sha", isCard: true }), false)
				},
				cost(){
					'step 0'
					var result = player.chooseNumbers(get.prompt(event.skill), [
						{
							prompt: "移除任意枚“烈”，视为使用一张无次数限制的杀",
							min: 0,
							max: player.hasMark("qmsgswkjsgj_potzhanlie_lie"),
						},
					])
					'step 1'
					if(result.bool)event.result = {
						bool:true,
						cost_data:result.numbers[0],
					}
				},
				// direct: true,
				content() {
					var num = event.cost_data;
					
					const effectMap = new Map([
						["hp", player.getHp()],
						["damagedHp", player.getDamagedHp()],
						["countplayer", game.countPlayer()],
					]);
					const numx = effectMap.get(player.storage.potzhanlie) || num;
					const str = player.hasMark("qmsgswkjsgj_potzhanlie_lie") ? "移去所有“烈”，" : "";
					player.chooseUseTarget("###" + get.prompt("qmsgswkjsgj_potzhanlie") + '###<div class="text center">' + str + "视为使用一张无次数限制的【杀】</div>", new lib.element.VCard({ name: "sha", isCard: true }), false).set("oncard", () => {
						const event = get.event(),
							{ player } = event;
							// num = player.countMark("qmsgswkjsgj_potzhanlie_lie");
						player.addTempSkill("qmsgswkjsgj_potzhanlie_buff");
						player.removeMark("qmsgswkjsgj_potzhanlie_lie",num);
						event.set("qmsgswkjsgj_potzhanlie", numx);
					})//.logSkill = "qmsgswkjsgj_potzhanlie";
				},
				marktext: "烈",
				intro: {
					name: "烈",
					content: "mark",
				},
			},
			buff: {
				charlotte: true,
				trigger: { player: "useCard1" },
				filter: event => event?.qmsgswkjsgj_potzhanlie,
				forced: true,
				locked: false,
				popup: false,
				async content(event, trigger, player) {
					const num = trigger.qmsgswkjsgj_potzhanlie,
						str = get.translation(trigger.card);
					const result = await player
						.chooseButton([
							"战烈：是否选择至多" + get.cnNumber(num) + "项执行？",
							[
								[
									["目标+1", "令" + str + "可以额外指定一个目标"],
									["伤害+1", "令" + str + "基础伤害值+1"],
									["弃牌响应", "令" + str + "需额外弃置一张牌方可响应"],
									["摸牌", str + "结算完毕后，你摸三张牌"],
								],
								"textbutton",
							],
						])
						.set("selectButton", [1, num])
						.set("ai", button => {
							const player = get.player(),
								trigger = get.event().getTrigger(),
								choice = button.link;
							switch (choice) {
								case "目标+1":
									return Math.max(
										...game
											.filterPlayer(target => {
												return !trigger.targets?.includes(target) && lib.filter.targetEnabled2(trigger.card, player, target) && lib.filter.targetInRange(trigger.card, player, target);
											})
											.map(target => get.effect(target, trigger.card, player, player))
									);
								case "伤害+1":
									return (trigger.targets || []).reduce((sum, target) => {
										const effect = get.damageEffect(target, player, player);
										return (
											sum +
											effect *
											(target.hasSkillTag("filterDamage", null, {
												player: player,
												card: trigger.card,
											})
												? 1
												: 1 + (trigger.baseDamage || 1) + (trigger.extraDamage || 0))
										);
									}, 0);
								case "弃牌响应":
									return (trigger.targets || []).reduce((sum, target) => {
										const card = get.copy(trigger.card);
										game.setNature(card, "stab");
										return sum + get.effect(target, card, player, player);
									}, 0);
								case "摸牌":
									return get.effect(player, { name: "draw" }, player, player) * 3;
							}
						})
						.forResult();
					if (result.bool) {
						const choices = result.links;
						game.log(player, "选择了", "#g【战烈】", "的", "#y" + choices);
						for (const choice of choices) {
							player.popup(choice);
							switch (choice) {
								case "目标+1":
									player
										.when("useCard2")
										.filter(evt => evt === trigger)
										.then(() => {
											player
												.chooseTarget("是否为" + get.translation(trigger.card) + "增加一个目标？", (card, player, target) => {
													const evt = get.event().getTrigger();
													return !evt.targets.includes(target) && lib.filter.targetEnabled2(evt.card, player, target) && lib.filter.targetInRange(evt.card, player, target);
												})
												.set("ai", target => {
													const player = get.player(),
														evt = get.event().getTrigger();
													return get.effect(target, evt.card, player);
												});
										})
										.then(() => {
											if (result?.bool && result.targets?.length) {
												const [target] = result.targets;
												player.line(target, trigger.card.nature);
												trigger.targets.add(target);
												game.log(target, "成为了", trigger.card, "的额外目标");
											}
										});
									break;
								case "伤害+1":
									trigger.baseDamage++;
									game.log(trigger.card, "造成的伤害", "#y+1");
									break;
								case "弃牌响应":
									player.addTempSkill("qmsgswkjsgj_potzhanlie_guanshi");
									player.markAuto("qmsgswkjsgj_potzhanlie_guanshi", [trigger.card]);
									break;
								case "摸牌":
									player
										.when("useCardAfter")
										.filter(evt => evt === trigger)
										.then(() => player.draw(3));
									break;
							}
						}
					}
				},
			},
			guanshi: {
				charlotte: true,
				onremove: true,
				audio: "potzhanlie",
				trigger: { player: "useCardToBegin" },
				filter(event, player) {
					if (!event.target?.isIn()) {
						return false;
					}
					return !event.getParent().directHit.includes(event.target) && player.getStorage("qmsgswkjsgj_potzhanlie_guanshi").includes(event.card);
				},
				forced: true,
				logTarget: "target",
				async content(event, trigger, player) {
					const { target } = trigger;
					const { result } = await target.chooseToDiscard("战烈：弃置一张牌，否则不可响应" + get.translation(trigger.card)).set("ai", card => {
						const player = get.player(),
							trigger = get.event().getTrigger();
						if (get.effect(player, trigger.card, trigger.player, player) >= 0) {
							return 0;
						}
						const num = player.countCards("hs", { name: "shan" });
						if (num === 0) {
							return 0;
						}
						if (card.name === "shan" && num <= 1) {
							return 0;
						}
						return 8 - get.value(card);
					});
					if (!result?.bool) {
						trigger.set("directHit", true);
						game.log(target, "不可响应", trigger.card);
					}
				},
			},
			plus:{
				charlotte: true,
				onremove:function(player){
					player.changeSkin({ characterName: "qmsgswkjsgj_pot_taishici" }, "qmsgswkjsgj_pot_taishici");
				}
			},
		},
	},
	qmsgswkjsgj_pothanzhan: {
		audio: 'pothanzhan',
		enable: "phaseUse",
		usable: 1,
		filterTarget: lib.filter.notMe,
		async content(event, trigger, player) {
			const target = event.targets[0];
			for (const drawer of [player, target]) {
				const num = (() => {
					return (
						({
							hp: drawer.getHp(),
							damagedHp: drawer.getDamagedHp(),
							countplayer: game.countPlayer(),
						}[player.storage.pothanzhan] ?? drawer.maxHp) - drawer.countCards("h")
					);
				})();
				if (num > 0&&drawer==player) {
					await drawer.draw(Math.min(num, 5));
				}
			}
			const juedou = new lib.element.VCard({ name: "juedou", isCard: true });
			if (player.canUse(juedou, target)) {
				await player.useCard(juedou, target, false);
			}
		},
		ai: {
			order(item, player) {
				if ((player.countCards("h", { name: "sha" }) || player.maxHp - player.countCards("h")) > 1) {
					return 10;
				}
				return 1;
			},
			result: {
				target(player, target) {
					return (
						get.effect(target, new lib.element.VCard({ name: "juedou", isCard: true }), player, player)
					);
				},
			},
		},
	},
	qmsgswkjsgj_potzhenfeng: {
		limited: true,
		audio: 'potzhenfeng',
		enable: ['chooseToUse'],
		filter(event, player) {
			if (event.type == "dying") {
				if (player != event.dying) {
					return false;
				}
				return true;
			} else if (event.getParent().name == "phaseUse") {
				return player.isDamaged()|| ["qmsgswkjsgj_potzhanlie"].some(skill => player.hasSkill(skill, null, null, false));
			}
			return false;
		},
		skillAnimation: true,
		animationColor: "metal",
		logAudio: index => (typeof index === "number" ? "potzhenfeng" + index + ".mp3" : 2),
		chooseButton: {
			dialog(event, player) {
				const dialog = ui.create.dialog("振锋：你可以选择一项", "hidden");
				dialog.add([
					[
						["recover", "回复2点体力"],
						["cover", "膝盖战烈的出牌阶段结束时为每名角色出牌阶段结束时，直到你的下个回合开始"],
					],
					"textbutton",
				]);
				return dialog;
			},
			filter(button, player) {
				switch (button.link) {
					case "recover":
						return player.isDamaged();
					case "cover":
						return ["qmsgswkjsgj_potzhanlie"].some(skill => player.hasSkill(skill, null, null, false));
				}
			},
			check(button) {
				const player = get.player();
				if (button.link == "recover") {
					return player.getHp() + player.countCards("h", { name: "tao" }) < 2;
				}
				if (button.link == "cover") {
					// let numbers = [player.getHp(), player.getDamagedHp(), game.countPlayer()];
					// if (numbers.some(c => c > player.getAttackRange())) {
					// 	return Math.max(...numbers) * 2;
					// }
					return 0
				}
				return 0.1;
			},
			backup(links) {
				return {
					item: links[0],
					skillAnimation: true,
					animationColor: "metal",
					log: false,
					async content(event, trigger, player) {
						player.awakenSkill("qmsgswkjsgj_potzhenfeng");
						if (get.info(event.name).item === "recover") {
							player.logSkill("qmsgswkjsgj_potzhenfeng", null, null, null, [null]);
							player.changeSkin({ characterName: "qmsgswkjsgj_pot_taishici" }, "qmsgswkjsgj_pot_taishici_shadow1");
							await player.recover(2);
						} else {
							// let dialog = [],
							// 	skills = ["pothanzhan", "potzhanlie"].filter(skill => player.hasSkill(skill, null, null, false)),
							// 	list = [
							// 		["hp", "当前体力值"],
							// 		["damagedHp", "当前已损失体力值"],
							// 		["countplayer", "场上存活角色数"],
							// 	];
							// dialog.push("振锋：修改" + skills.map(skill => "〖" + get.translation(skill) + "〗").join("和") + "描述中的“X”为...");
							// for (const skill of skills) {
							// 	dialog.push('<div class="text center">' + get.translation(skill) + "</div>");
							// 	dialog.push([list.map(item => [item[0] + "|" + skill, item[1]]), "tdnodes"]);
							// }
							// const result = await player
							// 	.chooseButton(dialog, [1, Math.min(2, skills.length)], true)
							// 	.set("filterButton", button => {
							// 		return !ui.selected.buttons.some(but => but.link.split("|")[1] === button.link.split("|")[1]);
							// 	})
							// 	.set("ai", button => {
							// 		const player = get.player();
							// 		switch (button.link.split("|")[0]) {
							// 			case "hp":
							// 				return player.getHp();
							// 			case "damagedHp":
							// 				return player.getDamagedHp();
							// 			case "countplayer":
							// 				return game.countPlayer();
							// 		}
							// 	})
							// 	.forResult();
							// if (result?.bool && result.links?.length) {
							// 	player.logSkill("potzhenfeng", null, null, null, [get.rand(3, 4)]);
							// 	let changeList = [];
							// 	for (const link of result.links) {
							// 		const [change, skill] = link.split("|");
							// 		if (skill == "pothanzhan") {
							// 			changeList.push(change);
							// 		}
							// 		player.storage[skill] = change;
							// 		player.popup(skill);
							// 		game.log(player, "修改", "#g【" + get.translation(skill) + "】", "的", "#yX", "为", "#g" + list.find(item => item[0] === change)[1]);
							// 	}
							// 	if (changeList[0]) {
							// 		switch (changeList[0]) {
							// 			case "hp":
							// 				player.changeSkin({ characterName: "pot_taishici" }, "pot_taishici_shadow3");
							// 				break;
							// 			case "damagedHp":
							// 				player.changeSkin({ characterName: "pot_taishici" }, "pot_taishici_shadow2");
							// 				break;
							// 			case "countplayer":
							// 				player.changeSkin({ characterName: "pot_taishici" }, "pot_taishici_shadow4");
							// 		}
							// 	} else {
							// 		player.changeSkin({ characterName: "pot_taishici" }, "pot_taishici_shadow1");
							// 	}
							// }
							player.changeSkin({ characterName: "qmsgswkjsgj_pot_taishici" }, "qmsgswkjsgj_pot_taishici_shadow4");
							player.addTempSkill('qmsgswkjsgj_potzhanlie_plus',{player:'phaseBegin'})
						}
					},
				};
			},
			prompt(links) {
				return `点击“确定”，${links[0] === "recover" ? "回复2点体力" : "膝盖战烈的出牌阶段结束时为每名角色出牌阶段结束时，直到你的下个回合开始"}`;
			},
		},
		subSkill: {
			backup: {},
		},
		ai: {
			order: 15,
			threaten: 2,
			result: {
				player(player) {
					if ([player.getHp(), player.getDamagedHp(), game.countPlayer()].some(c => c > player.getAttackRange())) {
						return 10;
					}
					return get.recoverEffect(player, player, player);
				},
			},
		},
	},

	//势于吉
	qmsgswkjsgj_potfuji: {
		audio: 'potfuji',
		enable: "phaseUse",
		logAudio: () => 2,
		filter(event, player) {
			return player.countCards("he") > 0 && game.countPlayer();
		},
		filterCard: true,
		position: "he",
		selectCard: () => [1, game.countPlayer()],
		check(card) {
			const player = get.player();
			if (
				ui.selected.cards.length >=
				game.countPlayer(current => {
					return get.attitude(player, current) > 0;
				})
			) {
				return 0;
			}
			return 6 - get.value(card);
		},
		usable: 1,
		lose: false,
		discard: false,
		delay: false,
		async content(event, trigger, player) {
			const { cards: links } = event;
			await player.showCards(links, get.translation(player) + "发动了【" + get.translation(event.name) + "】");
			var cards = game.cardsGotoOrdering(links);
			console.log(cards)
			var relu = await player.YB_yiji(cards,links.length,function(){return true},'符济','tag:qmsgswkjsgj_potfuji').forResult();
			if(relu){
				var gain_list = relu;
				for (const list of gain_list) {
					list[0].addSkill("qmsgswkjsgj_potfuji_effect");
				}
				if (player.isMinHandcard()) {
					player.logSkill("qmsgswkjsgj_potfuji", null, null, null, [3]);
					player.changeSkin({ characterName: "qmsgswkjsgj_pot_yuji" }, "qmsgswkjsgj_pot_yuji_shadow");
					await player.draw(1);
					player.addTempSkill(["qmsgswkjsgj_potfuji_sha", "qmsgswkjsgj_potfuji_shan","qmsgswkjsgj_potfuji_tao","qmsgswkjsgj_potfuji_jiu"], { player: "phaseBegin" });
				}
				player
					.when({ player: ["phaseBegin"] })
					.assign({
						lastDo: true,
					})
					.then(() => {
						player.changeSkin({ characterName: "qmsgswkjsgj_pot_yuji" }, "qmsgswkjsgj_pot_yuji");
					});
			}
		},
		ai: {
			order: 10,
			result: {
				target(player, target) {
					var card = ui.selected.cards[ui.selected.targets.length];
					if (!card) {
						return 0;
					}
					if (get.value(card) < 0) {
						return -1;
					}
					return Math.sqrt(5 - Math.min(4, target.countCards("h")));
				},
			},
		},
		subSkill: {
			effect: {
				charlotte: true,
				trigger: {
					player: ["useCard", "useCardAfter"],
					source: ["damageBegin1",'recoverBegin'],
				},
				mark: true,
				marktext: "符",
				intro: {
					mark(dialog, content, player) {
						const cards = player.getCards("h", card => card.hasGaintag("qmsgswkjsgj_potfuji"));
						if (cards?.length) {
							dialog.addAuto(cards);
						} else {
							dialog.addText("无符济牌");
						}
					},
				},
				filter(event, player, name) {
					const ori_event = (event.name === "damage"||event.name=='recover') ? event.getParent("useCard") : event;
					if (
						!ori_event ||
						ori_event.name !== "useCard" ||
						!player.hasHistory("lose", evt => {
							const evtx = evt.relatedEvent || evt.getParent();
							if (evtx !== ori_event) {
								return false;
							}
							return Object.values(evt.gaintag_map).flat().includes("qmsgswkjsgj_potfuji");
						})
					) {
						return false;
					}
					if(name === "useCard"){
						return true;
					}
					else {
						if(event.name === "damage"){
							return ori_event.card.name==='sha'
						}
						else if(event.name === "recover"){
							return ori_event.card.name==='tao'
						}
						else {
							['shan','jiu'].includes(ori_event.card.name)
						}
					}
					// return name === "useCard" || 
					// 	ori_event.card.name === (event.name==='damage'?'sha':(event.name==='recover'?'tao':'jiu'))
						// ['sha','shan','tao','jiu'].includes(ori_event.card.name)
						/* === (event.name === "damage" ? "sha" : "shan");*/
				},
				forced: true,
				logTarget: "player",
				popup: false,
				async content(event, trigger, player) {
					if (trigger.name === "damage" || event.triggername === "useCardAfter") {
						player.logSkill("qmsgswkjsgj_potfuji", null, null, null, [(trigger.name === "damage"||trigger.card.name==='jiu') ? 4 : 5]);
					}
					if (trigger.name === "damage"||trigger.name ==="recover") {
						trigger.num++;
					} else if (event.triggername === "useCardAfter") {
						if(trigger.card.name==='jiu'){
							var relu = await player.chooseTarget(1,'弃置场上一张牌').set('filterTarget',function(card, player, target){
								return target.hasCard(card => lib.filter.canBeDiscarded(card, player, target), 'ej')
							}).set('ai',function(target){
								lib.card.guohe_copy.ai.result.target(player, target, { name: 'guohe_copy', position: 'ej' }) + 1
							}).forResult();
							if(relu.bool){
								await player.discardPlayerCard(relu.targets[0], 'ej', true)
							}
						}
						else {
							await player.draw(); 
						}
					} else {
						const history = player.getHistory("lose", evt => {
								if ((evt.relatedEvent || evt.getParent()) !== trigger) {
									return false;
								}
								return Object.values(evt.gaintag_map).flat().includes("qmsgswkjsgj_potfuji");
							})[0],
							cards = history.getl(player).cards2.filter(card => history.gaintag_map[card.cardid]?.includes("qmsgswkjsgj_potfuji"));
						let gains = [];
						for (const card of cards) {
							const gain = get.cardPile2(gain => !gains.includes(gain) && get.suit(gain) === get.suit(card, false));
							if (gain) {
								gains.push(gain);
							}
						}
						if (gains.length) {
							await player.gain(gains, "gain2");
						}
					}
				},
			},
			sha: {
				charlotte: true,
				mark: true,
				marktext: "杀",
				intro: {
					name: "符济 - 杀",
					content: "使用【杀】造成的伤害+1",
				},
				audio: "potfuji4.mp3",
				trigger: { player: "useCard" },
				filter(event, player) {
					return event.card.name === "sha";
				},
				forced: true,
				logTarget: "player",
				content() {
					const gain = get.cardPile2(gain => get.suit(gain) === get.suit(trigger.card, false));
					if (gain) {
						player.gain(gain, "gain2");
					}
					trigger.baseDamage++;
					player
						.when({
							player: "useCardAfter",
						})
						.filter(evt => evt === trigger)
						.then(() => {
							player.removeSkill("qmsgswkjsgj_potfuji_sha");
						});
				},
			},
			shan: {
				charlotte: true,
				mark: true,
				marktext: "闪",
				intro: {
					name: "符济 - 闪",
					content: "使用【闪】结算完毕后摸一张牌",
				},
				audio: "potfuji5.mp3",
				trigger: { player: "useCard" },
				filter(event, player) {
					return event.card.name === "shan";
				},
				forced: true,
				content() {
					const gain = get.cardPile2(gain => get.suit(gain) === get.suit(trigger.card, false));
					if (gain) {
						player.gain(gain, "gain2");
					}
					player
						.when("useCardAfter")
						.filter(evt => evt === trigger)
						.then(() => {
							player.removeSkill("qmsgswkjsgj_potfuji_shan");
							player.draw();
						});
				},
			},
			tao: {
				charlotte: true,
				mark: true,
				marktext: "桃",
				intro: {
					name: "符济 - 桃",
					content: "使用【桃】回复值+1",
				},
				audio: "potfuji5.mp3",
				trigger: { player: "useCard" },
				filter(event, player) {
					return event.card.name === "tao";
				},
				forced: true,
				content() {
					const gain = get.cardPile2(gain => get.suit(gain) === get.suit(trigger.card, false));
					if (gain) {
						player.gain(gain, "gain2");
					}
					trigger.baseDamage++;
					player
						.when("useCardAfter")
						.filter(evt => evt === trigger)
						.then(() => {
							player.removeSkill("qmsgswkjsgj_potfuji_tao");
						});
				},
			},
			jiu: {
				charlotte: true,
				mark: true,
				marktext: "酒",
				intro: {
					name: "符济 - 酒",
					content: "使用【酒】结算完毕后可以弃置场上一张牌",
				},
				audio: "potfuji4.mp3",
				trigger: { player: "useCard" },
				filter(event, player) {
					return event.card.name === "jiu";
				},
				forced: true,
				content() {
					const gain = get.cardPile2(gain => get.suit(gain) === get.suit(trigger.card, false));
					if (gain) {
						player.gain(gain, "gain2");
					}
					player
						.when("useCardAfter")
						.filter(evt => evt === trigger)
						.then(() => {
							player.removeSkill("qmsgswkjsgj_potfuji_shan");
							// player.draw();
							player.chooseTarget(1,'弃置场上一张牌').set('filterTarget',function(card, player, target){
								return target.hasCard(card => lib.filter.canBeDiscarded(card, player, target), 'ej')
							}).set('ai',function(target){
								lib.card.guohe_copy.ai.result.target(player, target, { name: 'guohe_copy', position: 'ej' }) + 1
							})
						})
						.then(function(){
							if(result.bool){
								player.discardPlayerCard(result.targets[0], 'ej', true)
							}
						})
				},
			},
		},
	},
	qmsgswkjsgj_potdaozhuan: {
		audio: 'potdaozhuan',
		enable: "chooseToUse",
		logAudio: index => (typeof index === "number" ? "potdaozhuan" + index + ".mp3" : 2),
		filter(event, player) {
			if (event.qmsgswkjsgj_potdaozhuan) {
				return false;
			}
			let num = player.countCards("he");
			if (_status.currentPhase?.isIn() && _status.currentPhase !== player) {
				num += _status.currentPhase.countCards("he");
			}
			if (num <= 0) {
				return false;
			}
			return get
				.inpileVCardList(info => {
					const name = info[2];
					if (get.type(name) !== "basic") {
						return false;
					}
					return !player.getStorage("qmsgswkjsgj_potdaozhuan_used").includes(name);
				})
				.some(card => event.filterCard(new lib.element.VCard({ name: card[2], nature: card[3], isCard: true }), player, event));
		},
		// usable: 1,
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog("道转", [get.inpileVCardList(info => get.type(info[2]) === "basic"), "vcard"]);
			},
			filter(button, player) {
				const event = get.event().getParent();
				if (player.getStorage("qmsgswkjsgj_potdaozhuan_used").includes(button.link[2])) {
					return false;
				}
				return event.filterCard(new lib.element.VCard({ name: button.link[2], nature: button.link[3], isCard: true }), player, event);
			},
			check(button) {
				const event = get.event().getParent();
				if (event.type !== "phase") {
					return 1;
				}
				return get.player().getUseValue(new lib.element.VCard({ name: button.link[2], nature: button.link[3], isCard: true }));
			},
			prompt(links, player) {
				let prompt = "将你";
				if (_status.currentPhase?.isIn() && _status.currentPhase !== player) {
					prompt += "与" + get.translation(_status.currentPhase);
				}
				prompt += "的一张牌置入弃牌堆，";
				return '###道转###<div class="text center">' + prompt + "视为使用" + (get.translation(links[0][3]) || "") + "【" + get.translation(links[0][2]) + "】</div>";
			},
			backup(links) {
				return {
					filterCard: () => false,
					selectCard: -1,
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						isCard: true,
					},
					log: false,
					async precontent(event, trigger, player) {
						const goon = _status.currentPhase?.isIn() && _status.currentPhase !== player;
						let prompt = "将你";
						if (goon) {
							prompt += "与" + get.translation(_status.currentPhase);
						}
						prompt += "的一张牌置入弃牌堆";
						let dialog = ["道转：" + prompt];
						if (player.countCards("h")) {
							dialog.push('<div class="text center">你的手牌</div>');
							dialog.push(player.getCards("h"));
						}
						if (player.countCards("e")) {
							dialog.push('<div class="text center">你的装备牌</div>');
							dialog.push(player.getCards("e"));
						}
						if (goon) {
							const target = _status.currentPhase;
							if (target.countCards("h")) {
								const cards = target.getCards("h");
								dialog.push('<div class="text center">' + get.translation(target) + "的手牌</div>");
								if (player.hasSkillTag("viewHandcard", null, target, true)) {
									dialog.push(cards);
								} else {
									dialog.push([cards.slice().randomSort(), "blank"]);
								}
							}
							if (target.countCards("e")) {
								dialog.push('<div class="text center">' + get.translation(target) + "的装备牌</div>");
								dialog.push(target.getCards("e"));
							}
						}
						const result = await player
							.chooseButton(dialog)
							.set("filterButton", button => {
								const card = button.link,
									{ player, useCard, targets } = get.event();
								if (!targets?.length) {
									return true;
								}
								ui.selected.cards.add(card);
								const bool = targets.some(target => {
									if (!lib.filter.cardEnabled(useCard, player, "forceEnable")) {
										return false;
									}
									return lib.filter.targetEnabled2(useCard, player, target) && lib.filter.targetInRange(useCard, player, target);
								});
								ui.selected.cards.remove(card);
								return bool;
							})
							.set("useCard", event.result.card)
							.set("targets", event.result.targets)
							.set("ai", button => {
								const player = get.player(),
									source = get.owner(button.link);
								return get.value(button.link, get.owner(source)) * Math.sign(-get.attitude(player, source));
							})
							.forResult();
						if (result?.bool) {
							player.logSkill("qmsgswkjsgj_potdaozhuan", null, null, null, [get.rand(1, 2)]);
							player.addTempSkill("qmsgswkjsgj_potdaozhuan_used");
							player.markAuto("qmsgswkjsgj_potdaozhuan_used", [event.result.card.name]);
							if (result.links?.length) {
								const target = _status.currentPhase;
								const owners = result.links.map(i => get.owner(i)).unique();
								await owners[0].loseToDiscardpile(result.links);
								if (owners[0] === target) {
									player.tempBanSkill("qmsgswkjsgj_potdaozhuan");
									player.logSkill("qmsgswkjsgj_potdaozhuan", null, null, null, [get.rand(3, 4)]);
								}
							}
							return;
						}
						const evt = event.getParent();
						evt.set("qmsgswkjsgj_potdaozhuan", true);
						evt.goto(0);
					},
				};
			},
		},
		hiddenCard(player, name) {
			if (player.isTempBanned("qmsgswkjsgj_potdaozhuan")) {
				return false;
			}
			return get.type(name) === "basic" && !player.getStorage("qmsgswkjsgj_potdaozhuan_used").includes(name);
		},
		ai: {
			fireAttack: true,
			respondSha: true,
			respondShan: true,
			skillTagFilter(player, tag, arg) {
				if (arg === "respond") {
					return false;
				}
				return get.info("qmsgswkjsgj_potdaozhuan").hiddenCard(
					player,
					(() => {
						switch (tag) {
							case "fireAttack":
								return "sha";
							default:
								return tag.slice("respond".length).toLowerCase();
						}
					})()
				);
			},
			order(item, player) {
				if (player && _status.event.type === "phase") {
					let max = 0,
						names = get.inpileVCardList(info => {
							const name = info[2];
							if (get.type(name) !== "basic") {
								return false;
							}
							return !player.getStorage("qmsgswkjsgj_potdaozhuan_used").includes(name);
						});
					names = names.map(namex => new lib.element.VCard({ name: namex[2], nature: namex[3] }));
					names.forEach(card => {
						if (player.getUseValue(card) > 0) {
							let temp = get.order(card);
							if (temp > max) {
								max = temp;
							}
						}
					});
					return max + (max > 0 ? 0.2 : 0);
				}
				return 10;
			},
			result: {
				player(player) {
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					return 1;
				},
			},
		},
		subSkill: {
			backup: {},
			used: {
				charlotte: true,
				onremove: true,
				intro: { content: "本轮已使用牌名：$" },
			},
		},
	},

	//曹髦
	qmsgswkjsgj_mbqianlong: {
		audio: 'mbqianlong',
		persevereSkill: true,
		trigger: {
			player: ["qmsgswkjsgj_mbqianlong_beginAfter", "qmsgswkjsgj_mbqianlong_addAfter"/*, "qmsgswkjsgj_mbweitongAfter"*/],
		},
		filter(event, player) {
			let skills = [];
			let current = player.additionalSkills?.qmsgswkjsgj_mbqianlong?.length ?? 0;
			let target = player.countMark("qmsgswkjsgj_mbqianlong") == lib.skill.qmsgswkjsgj_mbqianlong.maxMarkCount ? lib.skill.qmsgswkjsgj_mbqianlong.derivation.length : Math.floor(player.countMark("qmsgswkjsgj_mbqianlong") / 25);
			return target > current;
		},
		forced: true,
		popup: false,
		locked: false,
		beginMarkCount: 20,
		maxMarkCount: 99,
		derivation: ["qmsgswkjsgj_mbcmqingzheng", "qmsgswkjsgj_mbcmjiushi", "qmsgswkjsgj_mbcmfangzhu", "qmsgswkjsgj_mbjuejin"],
		addMark(player, num) {
			num = Math.min(num, lib.skill.qmsgswkjsgj_mbqianlong.maxMarkCount - player.countMark("qmsgswkjsgj_mbqianlong"));
			player.addMark("qmsgswkjsgj_mbqianlong", num);
		},
		group: ["qmsgswkjsgj_mbqianlong_begin", "qmsgswkjsgj_mbqianlong_add", "qmsgswkjsgj_mbqianlong_die"],
		async content(event, trigger, player) {
			const derivation = lib.skill.qmsgswkjsgj_mbqianlong.derivation,
				skills = player.countMark("qmsgswkjsgj_mbqianlong") == lib.skill.qmsgswkjsgj_mbqianlong.maxMarkCount ? derivation : derivation.slice(0, Math.floor(player.countMark("qmsgswkjsgj_mbqianlong") / 25));
			player.addAdditionalSkill("qmsgswkjsgj_mbqianlong", skills);
		},
		marktext: "道",
		intro: {
			name: "道心(潜龙)",
			name2: "道心",
			content: "当前道心数为#",
		},
		subSkill: {
			begin: {
				audio: "qmsgswkjsgj_mbqianlong",
				persevereSkill: true,
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				filter(event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					const num = game.hasPlayer(current => {
						return current !== player && current.group === "wei" && player.hasZhuSkill("qmsgswkjsgj_mbweitong", current);
					})
						? 60
						: lib.skill.qmsgswkjsgj_mbqianlong.beginMarkCount;
					// const num = lib.skill.qmsgswkjsgj_mbqianlong.beginMarkCount;
					lib.skill.qmsgswkjsgj_mbqianlong.addMark(player, num);
				},
			},
			add: {
				audio: "qmsgswkjsgj_mbqianlong",
				persevereSkill: true,
				trigger: {
					player: ["gainAfter", "damageEnd"],
					source: "damageSource",
					global: "loseAsyncAfter",
				},
				filter(event, player) {
					if (player.countMark("qmsgswkjsgj_mbqianlong") >= lib.skill.qmsgswkjsgj_mbqianlong.maxMarkCount) {
						return false;
					}
					if (event.name === "damage") {
						return event.num > 0;
					}
					return event.getg(player).length > 0;
				},
				getIndex(event, player, triggername) {
					if (event.name === "damage") {
						return event.num;
					}
					return 1;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					let toAdd = 5 * (1 + (trigger.name === "damage")*2);
					lib.skill.qmsgswkjsgj_mbqianlong.addMark(player, toAdd);
				},
			},
			die: {
				trigger: {
					player: "dieBefore",
				},
				charlotte: true,
				firstDo: true,
				forced: true,
				popup: false,
				forceDie: true,
				async content(event, trigger, player) {
					player.changeSkin({ characterName: "qmsgswkjsgj_re_caomao" }, "qmsgswkjsgj_re_caomao_dead");
				},
			},
		},
	},
	qmsgswkjsgj_mbweitong: {
		audio: 'mbweitong',
		persevereSkill: true,
		zhuSkill: true,
		// trigger: {
		// 	player: "mbqianlong_beginBegin",
		// },
		// forced: true,
		// locked: false,
		// content() {
			
		// },
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		filter(event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		forced: true,
		locked: false,
		async content(event, trigger, player) {
			// const num = game.countPlayer(current => {
			// 	return current !== player && current.group === "wei" && player.hasZhuSkill("qmsgswkjsgj_mbweitong", current);
			// });
			// lib.skill.qmsgswkjsgj_mbqianlong.addMark(player, num);
		},
		ai: {
			combo: "qmsgswkjsgj_mbqianlong",
		},
	},
	qmsgswkjsgj_mbcmqingzheng: {
		audio: 'mbcmqingzheng',
		persevereSkill: true,
		trigger: { player: "phaseUseBegin" },
		filter(event, player) {
			return player.countCards("h") > 0 && game.hasPlayer(current => player != current && current.countCards("h") > 0);
		},
		/**
		 * player选择target的一种花色的牌
		 * @param {Player} player
		 * @param {Player} target
		 */
		chooseOneSuitCard(player, target, force = false, limit, str = "请选择一个花色的牌", ai = { bool: false }) {
			const { promise, resolve } = Promise.withResolvers();
			const event = _status.event;
			event.selectedCards = [];
			event.selectedButtons = [];
			//对手牌按花色分类
			let suitCards = Object.groupBy(target.getCards("h"), c => get.suit(c, target));
			suitCards.heart ??= [];
			suitCards.diamond ??= [];
			suitCards.spade ??= [];
			suitCards.club ??= [];
			let dialog = (event.dialog = ui.create.dialog());
			dialog.classList.add("fullheight");
			event.control_ok = ui.create.control("ok", link => {
				_status.imchoosing = false;
				event.dialog.close();
				event.control_ok?.close();
				event.control_cancel?.close();
				event._result = {
					bool: true,
					cards: event.selectedCards,
				};
				resolve(event._result);
				game.resume();
			});
			event.control_ok.classList.add("disabled");
			//如果是非强制的，才创建取消按钮
			if (!force) {
				event.control_cancel = ui.create.control("cancel", link => {
					_status.imchoosing = false;
					event.dialog.close();
					event.control_ok?.close();
					event.control_cancel?.close();
					event._result = {
						bool: false,
					};
					resolve(event._result);
					game.resume();
				});
			}
			event.switchToAuto = function () {
				_status.imchoosing = false;
				event.dialog?.close();
				event.control_ok?.close();
				event.control_cancel?.close();
				event._result = ai();
				resolve(event._result);
				game.resume();
			};
			dialog.addNewRow(str);
			let keys = Object.keys(suitCards).sort((a, b) => {
				let arr = ["spade", "heart", "club", "diamond", "none"];
				return arr.indexOf(a) - arr.indexOf(b);
			});
			//添加框
			while (keys.length) {
				let key1 = keys.shift();
				let cards1 = suitCards[key1];
				let key2 = keys.shift();
				let cards2 = suitCards[key2];
				//点击容器的回调
				/**@type {Row_Item_Option['clickItemContainer']} */
				const clickItemContainer = function (container, item, allContainer) {
					if (!item?.length || item.some(card => !lib.filter.cardDiscardable(card, player, event.name))) {
						return;
					}
					if (event.selectedButtons.includes(container)) {
						container.classList.remove("selected");
						event.selectedButtons.remove(container);
						event.selectedCards.removeArray(item);
					} else {
						if (event.selectedButtons.length >= limit) {
							let precontainer = event.selectedButtons[0];
							precontainer.classList.remove("selected");
							event.selectedButtons.remove(precontainer);
							let suit = get.suit(event.selectedCards[0], target),
								cards = target.getCards("h", { suit: suit });
							event.selectedCards.removeArray(cards);
						}
						container.classList.add("selected");
						event.selectedButtons.add(container);
						event.selectedCards.addArray(item);
					}
					event.control_ok.classList[event.selectedButtons.length === limit ? "remove" : "add"]("disabled");
				};
				//给框加封条，显示xxx牌多少张
				function createCustom(suit, count) {
					return function (itemContainer) {
						function formatStr(str) {
							return str.replace(/(?:♥︎|♦︎)/g, '<span style="color: red; ">$&</span>');
						}
						let div = ui.create.div(itemContainer);
						if (count) {
							div.innerHTML = formatStr(`${get.translation(suit)}牌${count}张`);
						} else {
							div.innerHTML = formatStr(`没有${get.translation(suit)}牌`);
						}
						div.css({
							position: "absolute",
							width: "100%",
							bottom: "1%",
							height: "35%",
							background: "#352929bf",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							fontSize: "1.2em",
							zIndex: "2",
						});
					};
				}
				//框的样式，不要太宽，高度最小也要100px，防止空框没有高度
				/**@type {Row_Item_Option['itemContainerCss']} */
				let itemContainerCss = {
					border: "solid #c6b3b3 2px",
					minHeight: "100px",
				};
				if (key2) {
					dialog.addNewRow(
						{
							item: cards1,
							ItemNoclick: true, //卡牌不需要被点击
							clickItemContainer,
							custom: createCustom(key1, cards1.length), //添加封条
							itemContainerCss,
						},
						{
							item: cards2,
							ItemNoclick: true, //卡牌不需要被点击
							clickItemContainer,
							custom: createCustom(key2, cards2.length),
							itemContainerCss,
						}
					);
				} else {
					dialog.addNewRow({
						item: cards1,
						ItemNoclick: true, //卡牌不需要被点击
						clickItemContainer,
						custom: createCustom(key1, cards1.length),
						itemContainerCss,
					});
				}
			}
			game.pause();
			dialog.open();
			_status.imchoosing = true;
			return promise;
		},
		async cost(event, trigger, player) {
			const list = get.addNewRowList(player.getCards("h"), "suit", player);
			let limit = event.skill === "sbqingzheng" ? 3 - player.countMark("sbjianxiong") : 1;
			const { result } = await player.chooseButtonTarget({
				createDialog: [
					[
						[[`${get.prompt(event.skill)}<div class="text center">${get.translation(event.skill, "info")}</div>`], "addNewRow"],
						[
							dialog => {
								dialog.classList.add("fullheight");
								// 不添加scroll1和scroll2的类名
								dialog.forcebutton = false;
								dialog._scrollset = false;
							},
							"handle",
						],
						list.map(item => [Array.isArray(item) ? item : [item], "addNewRow"]),
					],
				],
				filterButton(button) {
					const player = get.player();
					if (!button.links.length || button.links.some(card => !lib.filter.cardDiscardable(card, player, get.event().getParent().skill))) {
						return false;
					}
					return true;
				},
				selectButton: limit,
				limit,
				filterTarget(card, player, target) {
					return target != player && target.countCards("h");
				},
				ai1(button) {
					const player = get.player();
					if (!game.hasPlayer(current => player != current && current.countDiscardableCards(player, "h") > 0 && get.attitude(player, current) < 0)) {
						return 0;
					}
					let values = button.links.map(i => get.value(i)).reduce((p, c) => p + c, 0) / button.links.length;
					if (button.links.length > 4 || values > 6) {
						return 0;
					}
					return (13 - button.links.length) / values;
				},
				ai2(target) {
					const player = get.player(),
						att = get.attitude(player, target);
					if (att >= 0) {
						return 0;
					}
					return 1 - att / 2 + Math.sqrt(target.countCards("h"));
				},
			});
			event.result = {
				bool: result?.bool,
				cost_data: result?.links,
				targets: result?.targets,
			};
			if (event.result.bool && result?.links?.length) {
				event.result.cards = player.getCards("h").filter(card => result.links.includes(get.suit(card, player)));
			}
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
				cards: cards1,
			} = event;
			await player.discard(cards1);
			if (
				!target.countCards("h") ||
				lib.suits
					.slice()
					.filter(suit => target.hasCard((card, playerx) => get.suit(card, playerx) === suit, "h"))
					.every(suit => target.hasCard((card, playerx) => get.suit(card, playerx) === suit && !lib.filter.cardDiscardable(card, player), "h"))
			) {
				if (target.countCards("h")) {
					const content = [`###清正###<div class="text center">${get.translation(target)}的手牌</div>`, target.getCards("h")];
					await player.chooseControl("ok").set("dialog", content);
				}
				return;
			}
			const list = get.addNewRowList(target.getCards("h"), "suit", target);
			let { result } = await player
				.chooseButton(
					[
						[
							[[`清正：弃置${get.translation(target)}一种花色的所有牌`], "addNewRow"],
							[
								dialog => {
									dialog.classList.add("fullheight");
									dialog.forcebutton = false;
									dialog._scrollset = false;
								},
								"handle",
							],
							list.map(item => [Array.isArray(item) ? item : [item], "addNewRow"]),
						],
					],
					true
				)
				.set("filterButton", button => {
					const player = get.player();
					if (!button.links.length || button.links.some(card => !lib.filter.cardDiscardable(card, player, get.event().getParent().name))) {
						return false;
					}
					return true;
				})
				.set("ai", button => {
					const player = get.player();
					return button.links.length;
				});
			if (!result?.links?.length) {
				return;
			}
			const cards2 = target.getDiscardableCards(player, "h").filter(card => result.links.includes(get.suit(card, target)));
			if (cards2.length) {
				await target.discard(cards2, "notBySelf").set("discarder", player);
			}
			// if (cards1.length > cards2.length) {
				await target.damage(player);
			// }
			if (event.name !== "sbqingzheng" || player.countMark("sbjianxiong") >= 2) {
				return;
			}
			if (["sbjianxiong", "jdjianxiong"].some(skill => player.hasSkill(skill, null, null, false))) {
				result = await player
					.chooseBool("是否获得1枚“治世”？")
					.set("choice", Math.random() >= 0.5)
					.forResult();
				if (result?.bool) {
					player.addMark("sbjianxiong", 1);
				}
			}
		},
	},
	qmsgswkjsgj_mbcmjiushi: {
		audio: 'mbcmjiushi',
		inherit: "rejiushi",
		persevereSkill: true,
		group: ["qmsgswkjsgj_mbcmjiushi_use", "qmsgswkjsgj_mbcmjiushi_turnback", "qmsgswkjsgj_mbcmjiushi_gain"],
		subSkill: {
			use: {
				hiddenCard(player, name) {
					if (name == "jiu") {
						return !player.isTurnedOver();
					}
					return false;
				},
				audio: "qmsgswkjsgj_mbcmjiushi",
				enable: "chooseToUse",
				filter(event, player) {
					if (player.classList.contains("turnedover")) {
						return false;
					}
					return event.filterCard({ name: "jiu", isCard: true }, player, event);
				},
				async content(event, trigger, player) {
					if (_status.event.getParent(2).type == "dying") {
						event.dying = player;
						event.type = "dying";
					}
					await player.turnOver();
					await player.useCard({ name: "jiu", isCard: true }, player);
				},
				ai: {
					save: true,
					skillTagFilter(player, tag, arg) {
						return !player.isTurnedOver() && _status.event?.dying == player;
					},
					order: 5,
					result: {
						player(player) {
							if (_status.event.parent.name == "phaseUse") {
								if (player.countCards("h", "jiu") > 0) {
									return 0;
								}
								if (player.getEquip("zhuge") && player.countCards("h", "sha") > 1) {
									return 0;
								}
								if (!player.countCards("h", "sha")) {
									return 0;
								}
								var targets = [];
								var target;
								var players = game.filterPlayer();
								for (var i = 0; i < players.length; i++) {
									if (get.attitude(player, players[i]) < 0) {
										if (player.canUse("sha", players[i], true, true)) {
											targets.push(players[i]);
										}
									}
								}
								if (targets.length) {
									target = targets[0];
								} else {
									return 0;
								}
								var num = get.effect(target, { name: "sha" }, player, player);
								for (var i = 1; i < targets.length; i++) {
									var num2 = get.effect(targets[i], { name: "sha" }, player, player);
									if (num2 > num) {
										target = targets[i];
										num = num2;
									}
								}
								if (num <= 0) {
									return 0;
								}
								var e2 = target.getEquip(2);
								if (e2) {
									if (e2.name == "tengjia") {
										if (!player.countCards("h", { name: "sha", nature: "fire" }) && !player.getEquip("zhuque")) {
											return 0;
										}
									}
									if (e2.name == "renwang") {
										if (!player.countCards("h", { name: "sha", color: "red" })) {
											return 0;
										}
									}
									if (e2.name == "baiyin") {
										return 0;
									}
								}
								if (player.getEquip("guanshi") && player.countCards("he") > 2) {
									return 1;
								}
								return target.countCards("h") > 3 ? 0 : 1;
							}
							if (player == _status.event.dying || player.isTurnedOver()) {
								return 3;
							}
						},
					},
					effect: {
						target(card, player, target) {
							if (target.isTurnedOver()) {
								if (get.tag(card, "damage")) {
									if (player.hasSkillTag("jueqing", false, target)) {
										return [1, -2];
									}
									if (target.hp == 1) {
										return;
									}
									return [1, target.countCards("h") / 2];
								}
							}
						},
					},
				},
			},
			turnback: {
				audio: "qmsgswkjsgj_mbcmjiushi",
				persevereSkill: true,
				trigger: { player: "damageEnd" },
				check(event, player) {
					return player.isTurnedOver();
				},
				filter(event, player) {
					if (
						player.hasHistory("useCard", evt => {
							if (evt.card.name != "jiu" || evt.getParent().name != "qmsgswkjsgj_mbcmjiushi_use") {
								return false;
							}
							return evt.getParent("damage", true) == event;
						})
					) {
						return false;
					}
					return player.isTurnedOver();
				},
				prompt(event, player) {
					return "是否发动【酒诗】，将武将牌翻面？";
				},
				content() {
					player.turnOver();
				},
			},
			gain: {
				audio: "qmsgswkjsgj_mbcmjiushi",
				persevereSkill: true,
				trigger: { player: "turnOverAfter" },
				frequent: true,
				prompt: "是否发动【酒诗】，获得牌堆中的一张锦囊牌？",
				content() {
					var card = get.cardPile2(function (card) {
						return get.type2(card) == "trick";
					});
					if (card) {
						player.gain(card, "draw");
					}
				},
			},
		},
	},
	qmsgswkjsgj_mbcmfangzhu: {
		audio: 'mbcmfangzhu',
		persevereSkill: true,
		inherit: "qmsgswkjsgj_shenci_sbfangzhu",
		filter(event, player) {
			// const target = player.storage.mbcmfangzhu;
			return game.hasPlayer(current => current !== player);
		},
		usable: 1,
		chooseButton: {
			dialog() {
				const dialog = ui.create.dialog("放逐：令一名其他角色...", "hidden");
				dialog.add([
					[
						[1, "只能使用一种类型牌直到其回合结束"],
						[2, "非Charlotte技能失效直到其回合结束"],
					],
					"textbutton",
				]);
				return dialog;
			},
			check(button) {
				const player = get.player();
				if (button.link === 2) {
					if (
						game.hasPlayer(target => {
							if (target.hasSkill("qmsgswkjsgj_mbcmfangzhu_ban") || target.hasSkill("fengyin") || target.hasSkill("baiban")) {
								return false;
							}
							return (
								get.attitude(player, target) < 0 &&
								["name", "name1", "name2"]
									.map((sum, name) => {
										if (target[name] && (name != "name1" || target.name != target.name1)) {
											if (get.character(target[name])) {
												return get.rank(target[name], true);
											}
										}
										return 0;
									})
									.reduce((p, c) => {
										return p + c;
									}, 0) > 5
							);
						})
					) {
						return 6;
					}
				}
				return button.link === 1 ? 1 : 0;
			},
			backup(links, player) {
				return {
					num: links[0],
					audio: "qmsgswkjsgj_mbcmfangzhu",
					filterCard: () => false,
					selectCard: -1,
					filterTarget(card, player, target) {
						if (target == player) {
							return false;
						}
						const num = lib.skill.mbcmfangzhu_backup.num,
							storage = target.getStorage("qmsgswkjsgj_mbcmfangzhu_ban");
						return num != 1 || !storage.length;
					},
					async content(event, trigger, player) {
						const target = event.target;
						const num = lib.skill.qmsgswkjsgj_mbcmfangzhu_backup.num;
						switch (num) {
							case 1:
								var type=[];
								for(var i of lib.inpile){
									if(get.type2(i)&&!type.includes(get.type2(i))){
										type.push(get.type2(i));
									}
								}
								// type.push('cancel2')
								var relu = await player.chooseControl(type).set('prompt','选择一个类型').forResult();
								if(relu!='cancel2'){
									target.addTempSkill("qmsgswkjsgj_mbcmfangzhu_ban", { player: "phaseEnd" });
									target.markAuto("qmsgswkjsgj_mbcmfangzhu_ban", [relu.control]);
									lib.skill.qmsgswkjsgj_mbcmfangzhu_ban.init(target, "qmsgswkjsgj_mbcmfangzhu_ban");
								}
								break;
							case 2:
								target.addTempSkill("qmsgswkjsgj_mbcmfangzhu_baiban", { player: "phaseEnd" });
								break;
						}
					},
					ai: {
						result: {
							target(player, target) {
								switch (lib.skill.mbcmfangzhu_backup.num) {
									case 1:
										return -target.countCards("h", card => get.type(card) != "trick") - 1;
									case 2:
										return -target.getSkills(null, null, false).reduce((sum, skill) => {
											return sum + Math.max(get.skillRank(skill, "out"), get.skillRank(skill, "in"));
										}, 0);
								}
							},
						},
					},
				};
			},
			prompt(links, player) {
				const str = "###放逐###";
				switch (links[0]) {
					case 1:
						return str + "令一名其他角色于手牌中只能使用一种类型牌直到其回合结束";
					case 2:
						return str + "令一名其他角色的非Charlotte技能失效直到其回合结束";
				}
			},
		},
		ai: {
			order: 10,
			result: {
				player(player) {
					return game.hasPlayer(current => get.attitude(player, current) < 0) ? 1 : 0;
				},
			},
		},
		subSkill: {
			backup: {},
			baiban: {
				init(player, skill) {
					player.addSkillBlocker(skill);
					player.addTip(skill, "放逐 技能失效");
				},
				onremove(player, skill) {
					player.removeSkillBlocker(skill);
					player.removeTip(skill);
				},
				inherit: "baiban",
				marktext: "逐",
			},
			ban: {
				init(player, skill) {
					let storage = player.getStorage(skill);
					if (storage.length) {
						player.addTip(skill, "放逐 限" + (storage.length === 1 ? get.translation(storage[0])[0] : "手牌"));
					}
				},
				onremove(player, skill) {
					player.removeTip(skill);
					delete player.storage[skill];
				},
				charlotte: true,
				mark: true,
				marktext: "禁",
				intro: {
					markcount: () => 0,
					content(storage) {
						if (storage.length > 1) {
							return "不能使用手牌";
						}
						return "不能使用手牌中的非" + get.translation(storage[0]) + "牌";
					},
				},
				mod: {
					cardEnabled(card, player) {
						const storage = player.getStorage("qmsgswkjsgj_mbcmfangzhu_ban");
						const hs = player.getCards("h"),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && !storage.includes(get.type2(card))) {
							return false;
						}
					},
					cardSavable(card, player) {
						const storage = player.getStorage("qmsgswkjsgj_mbcmfangzhu_ban");
						const hs = player.getCards("h"),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && !storage.includes(get.type2(card))) {
							return false;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_mbjuejin: {
		audio: 'mbjuejin',
		persevereSkill: true,
		enable: "phaseUse",
		limited: true,
		skillAnimation: true,
		animationColor: "thunder",
		filterCard: () => false,
		selectCard: [-1, -2],
		filterTarget: true,
		selectTarget: -1,
		multiline: true,
		async contentBefore(event, trigger, player) {
			game.broadcastAll(() => {
				_status.tempMusic = "effect_caomaoBJM";
				game.playBackgroundMusic();
			});
			player.changeSkin({ characterName: "qmsgswkjsgj_re_caomao" }, "qmsgswkjsgj_re_caomao_shadow");
			player.awakenSkill(event.skill);
		},
		async content(event, trigger, player) {
			const target = event.target;
			const delt = target.getHp(true) - 1,
				num = Math.abs(delt);
			if (delt != 0) {
				if (delt > 0) {
					const next = target.changeHp(-delt);
					next._triggered = null;
					await next;
				} else {
					await target.recover(num);
				}
			}
			if (delt > 0) {
				await target.changeHujia(num + (player == target ? 2 : 0), null, true);
			} else if (player == target) {
				await target.changeHujia(2, null, true);
			}
		},
		async contentAfter(event, trigger, player) {
			game.addGlobalSkill("mbjuejin_xiangsicunwei");
			player.$fullscreenpop("向死存魏！", "thunder");
			const cards = ["cardPile", "discardPile"].map(pos => Array.from(ui[pos].childNodes)).flat();
			const filter = card => ["shan", "tao", "jiu"].includes(card.name);
			const cardx = cards.filter(filter);
			if (cardx.length) {
				await game.cardsGotoSpecial(cardx);
				game.log(cardx, "被移出了游戏");
			}
			for (const target of game.filterPlayer()) {
				const sishis = target.getCards("hej", filter);
				if (sishis.length) {
					target.$throw(sishis);
					game.log(sishis, "被移出了游戏");
					await target.lose(sishis, ui.special);
				}
			}
		},
		ai: {
			order: 0.1,
			result: {
				player(player) {
					let eff = 1;
					game.countPlayer(current => {
						const att = get.attitude(player, current),
							num = Math.abs(current.getHp(true) - 1);
						const delt = Math.max(0, num + current.hujia - 5);
						eff -= att * delt;
					});
					return eff > 0 ? 1 : 0;
				},
			},
		},
		subSkill: {
			xiangsicunwei: {
				trigger: {
					global: ["loseAfter", "equipAfter", "loseAsyncAfter", "cardsDiscardAfter"],
				},
				forced: true,
				silent: true,
				firstDo: true,
				filter(event, player) {
					const nameList = ["shan", "tao", "jiu"];
					return event.getd().some(card => {
						return nameList.includes(get.name(card, false)) && get.position(card, true) === "d";
					});
				},
				async content(event, trigger, player) {
					const nameList = ["shan", "tao", "jiu"];
					const cards = trigger.getd().filter(card => {
						return nameList.includes(get.name(card, false)) && get.position(card, true) === "d";
					});
					await game.cardsGotoSpecial(cards);
					game.log(cards, "被移出了游戏");
				},
			},
		},
	},

	//手杀差异化孙鲁育
	qmsgswkjsgj_mbmeibu: {
		audio: "meibu",
		trigger: {
			global: "phaseUseBegin",
		},
		filter(event, player) {
			return event.player != player && event.player.isIn() ;
		},
		direct: true,
		derivation: ["qmsgswkjsgj_mbzhixi"],
		checkx(event, player) {
			if (get.attitude(player, event.player) >= 0) {
				return false;
			}
			var e2 = player.getEquip(2);
			if (e2) {
				if (e2.name == "tengjia" || e2.name == "rewrite_tengjia") {
					return true;
				}
				if (e2.name == "bagua" || e2.name == "rewrite_bagua") {
					return true;
				}
			}
			return event.player.countCards("h") > event.player.hp;
		},
		content() {
			"step 0";
			var check = lib.skill.qmsgswkjsgj_mbmeibu.checkx(trigger, player);
			player.chooseBool(get.prompt2("qmsgswkjsgj_mbmeibu", trigger.player)).set('ai',check).set("logSkill", ["qmsgswkjsgj_mbmeibu", trigger.player]);
			// player
			// 	.chooseToDiscard(get.prompt2("qmsgswkjsgj_mbmeibu", trigger.player), "he")
			// 	.set("ai", function (card) {
			// 		if (_status.event.check) {
			// 			return 6 - get.value(card);
			// 		}
			// 		return 0;
			// 	})
			// 	.set("check", check)
			// 	.set("logSkill", ["qmsgswkjsgj_mbmeibu", trigger.player]);
			"step 1";
			if (result.bool) {
				var target = trigger.player;
				var card = result.cards[0];
				player.line(target, "green");
				target.addTempSkills("qmsgswkjsgj_mbzhixi", "phaseUseAfter");
				target.addTempSkill("qmsgswkjsgj_mbmeibu_range", "phaseUseAfter");
				target.markAuto("qmsgswkjsgj_mbmeibu_range", player);
				target.markSkillCharacter("qmsgswkjsgj_mbmeibu", player, "魅步", "锁定技。出牌阶段，你使用牌时需弃置一张手牌，若你于此阶段使用过的牌数不小于X，你不能使用牌（X为你的体力值）；当你使用锦囊牌时，你结束此阶段；你使用装备牌后，本回合手牌上限-1。");
			}
		},
		ai: {
			expose: 0.2,
		},
		subSkill: {
			range: {
				onremove: true,
				charlotte: true,
				mod: {
					globalFrom(from, to, num) {
						if (from.getStorage("qmsgswkjsgj_mbmeibu_range").includes(to)) {
							return -Infinity;
						}
					},
				},
				sub: true,
			},
		},
	},
	qmsgswkjsgj_mbmumu: {
		audio: "mumu",
		trigger: {
			player: "phaseUseBegin",
		},
		filter(event, player) {
			return game.hasPlayer(current => {
				if (current == player) {
					return current.getEquips(2).length > 0;
				}
				return current.countCards("hje") > 0;
			});
		},
		direct: true,
		content() {
			"step 0";
			player
				.chooseTarget(get.prompt("qmsgswkjsgj_mbmumu"), "弃置一名其他角色区域内的一张牌，或者获得一名角色装备区内的防具牌", function (card, player, target) {
					if (target == player) {
						return target.getEquips(2).length > 0;
					}
					return target.countCards("hje") > 0;
				})
				.set("ai", function (target) {
					var player = _status.event.player;
					var att = get.attitude(player, target);
					if (target.getEquip(2) && player.hasEmptySlot(2)) {
						return -2 * att;
					}
					return -att;
				});
			"step 1";
			if (result.bool && result.targets && result.targets.length) {
				event.target = result.targets[0];
				player.logSkill("qmsgswkjsgj_mbmumu", event.target);
				player.line(event.target, "green");
				var e = event.target.getEquips(2);
				event.e = e;
				if (target == player) {
					event.choice = "获得一张防具牌";
				} else if (e.length > 0) {
					player.chooseControl("弃置一张牌", "获得一张防具牌").set("ai", function () {
						if (_status.event.player.getEquips(2).length > 0) {
							return "弃置一张牌";
						}
						return "获得一张防具牌";
					});
				} else {
					event.choice = "弃置一张牌";
				}
			} else {
				event.finish();
			}
			"step 2";
			var choice = event.choice || result.control;
			if (choice == "弃置一张牌") {
				player.discardPlayerCard(event.target, "hje", true);
			} else {
				if (event.e) {
					player.gain(event.e, event.target, "give", "bySelf");
					// player.addTempSkill("new_mumu_notsha");
				}
			}
		},
		subSkill: {
			notsha: {
				mark: true,
				intro: {
					content: "不能使用【杀】",
				},
				charlotte: true,
				mod: {
					cardEnabled(card) {
						if (card.name == "sha") {
							return false;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_mbzhixi: {
		mod: {
			cardEnabled(card, player) {
				if (player.countMark("qmsgswkjsgj_mbzhixi") >= player.hp) {
					return false;
				}
			},
			cardUsable(card, player) {
				if (player.countMark("qmsgswkjsgj_mbzhixi") >= player.hp) {
					return false;
				}
			},
			cardSavable(card, player) {
				if (player.countMark("qmsgswkjsgj_mbzhixi") >= player.hp) {
					return false;
				}
			},
		},
		trigger: {
			player: "useCard1",
		},
		forced: true,
		popup: false,
		firstDo: true,
		init(player, skill) {
			player.storage[skill] = 0;
			var evt = _status.event.getParent("phaseUse");
			if (evt && evt.player == player) {
				player.getHistory("useCard", function (evtx) {
					if (evtx.getParent("phaseUse") == evt) {
						player.storage[skill]++;
					}
				});
			}
		},
		onremove(player) {
			player.unmarkSkill("qmsgswkjsgj_mbmeibu");
			delete player.storage.qmsgswkjsgj_mbzhixi;
		},
		content() {
			player.addMark("qmsgswkjsgj_mbzhixi", 1, false);
			player.addTempSkill("qmsgswkjsgj_mbzhixi_clear", "phaseChange");
			if (get.type2(trigger.card) == "trick") {
				var evt = trigger.getParent("phaseUse");
				if (evt && evt.player == player) {
					evt.skipped = true;
					game.log(player, "结束了出牌阶段");
				}
			}
		},
		group:['qmsgswkjsgj_mbzhixi_discard','qmsgswkjsgj_mbzhixi_maxHand'],
		subSkill: {
			clear: {
				charlotte: true,
				onremove(player) {
					player.clearMark("qmsgswkjsgj_mbzhixi", false);
				},
			},
			discard:{
				trigger: {
					player: "useCard",
				},
				forced: true,
				filter(event, player) {
					return true;
				},
				content() {
					player.chooseToDiscard("h", true);
				},
				ai: {
					neg: true,
					nokeep: true,
				},
			},
			maxHand:{
				trigger: {
					player: "useCardAfter",
				},
				forced: true,
				filter(event, player) {
					return get.type(event.card)=='equip';
				},
				content() {
					player.addMark('qmsgswkjsgj_mbzhixi_maxHand',1,false);
				},
				mark:true,
				intro:{
					markcount:'-$',
					content:'手牌上限减$',
				},
				onremove(player) {
					player.clearMark('qmsgswkjsgj_mbzhixi_maxHand');
				},
			},
		},
		ai: {
			presha: true,
			pretao: true,
			neg: true,
			nokeep: true,
		},
	},

	//在本体张芝改动至和手杀实战一致之前，我不会再动这个武将一笔
	//书张芝
	// qmsgswkjsgj_mbshiju: {
	// 	audio: 'mbshiju',
	// 	trigger: {
	// 		player: "useCardAfter",
	// 	},
	// 	filter(event, player) {
	// 		const history = game.getAllGlobalHistory("useCard"),
	// 			index = history.indexOf(event);
	// 		if (index <= 0) {
	// 			return false;
	// 		}
	// 		const evt = history[index - 1];
	// 		return get.type2(evt.card) == get.type2(event.card) || get.suit(evt.card) == get.suit(event.card);
	// 	},
	// 	forced: true,
	// 	async content(event, trigger, player) {
	// 		const history = game.getAllGlobalHistory("useCard"),
	// 			index = history.indexOf(trigger);
	// 		if (index <= 0) {
	// 			return;
	// 		}
	// 		const evt = history[index - 1];
	// 		const bool1 = get.type2(evt.card) == get.type2(trigger.card),
	// 			bool2 = get.suit(evt.card) == get.suit(trigger.card),
	// 			bool3 = get.name(evt.card) == get.name(trigger.card);
	// 		if (bool1) {
	// 			await player.gain(get.cards(1, true), "gain2", false);
	// 		}
	// 		if (bool2) {
	// 			await player.gain(get.bottomCards(1, true), "gain2", false);
	// 		}
	// 		if (bool1 && bool2) {
	// 			player.popup("乘势", "fire");
	// 			if (bool3) {
	// 				if (!player.hasSkill("mbkubai", null, null, false)) {
	// 					await player.addSkills("mbkubai");
	// 				} else if (player.countMark("mbkubai") < 2) {
	// 					game.log(player, "升级了", "#g【枯白】");
	// 					player.addMark("mbkubai", 1, false);
	// 					get.info("mbkubai").init(player, "mbkubai");
	// 				}
	// 			}
	// 		}
	// 	},
	// 	init(player, skill) {
	// 		player.addSkill(`${skill}_record`);
	// 	},
	// 	onremove(player, skill) {
	// 		player.removeSkill(`${skill}_record`);
	// 	},
	// 	mod: {
	// 		aiOrder(player, card, num) {
	// 			if (typeof card == "object") {
	// 				const evts = game.getAllGlobalHistory("useCard");
	// 				if (evts.length) {
	// 					let evt = evts[evts.length - 1];
	// 					const bool1 = get.type2(evt.card) == get.type2(card),
	// 						bool2 = get.suit(evt.card) == get.suit(card),
	// 						bool3 = get.name(evt.card) == get.name(card);
	// 					if (bool1) {
	// 						num += 10;
	// 					}
	// 					if (bool2) {
	// 						num += 10;
	// 					}
	// 					if (bool1 && bool2 && bool3) {
	// 						num += 30;
	// 					}
	// 				}
	// 				return num;
	// 			}
	// 		},
	// 	},
	// 	derivation: ["mbkubai"],
	// 	subSkill: {
	// 		record: {
	// 			charlotte: true,
	// 			trigger: {
	// 				global: "useCard1",
	// 			},
	// 			async cost(event, trigger, player) {
	// 				get.info(event.skill).init(player, event.skill);
	// 			},
	// 			intro: {
	// 				markcount() {
	// 					const history = game.getAllGlobalHistory("useCard");
	// 					if (history.length) {
	// 						const evt = history.at(-1);
	// 						if (evt) {
	// 							return get.translation(get.suit(evt.card));
	// 						}
	// 					}
	// 					return 0;
	// 				},
	// 				content() {
	// 					const history = game.getAllGlobalHistory("useCard");
	// 					if (history.length) {
	// 						const evt = history.at(-1);
	// 						if (evt) {
	// 							return `
	// 								上一张被使用的牌：${get.translation(evt.card.name)}<br>
	// 								花色：${get.translation(get.suit(evt.card))}<br>
	// 								类型：${get.translation(get.type2(evt.card))}
	// 							`;
	// 						}
	// 					}
	// 					return "无效果";
	// 				},
	// 			},
	// 			init(player, skill) {
	// 				const history = game.getAllGlobalHistory("useCard");
	// 				if (history.length) {
	// 					const evt = history.at(-1);
	// 					if (!evt) {
	// 						return;
	// 					}
	// 					player.addTip(skill, `势举 ${get.translation(evt.card.name)}${get.translation(get.suit(evt.card))}`);
	// 					player.markSkill(skill);
	// 					game.broadcastAll(
	// 						(evt, player) => {
	// 							const mark = player.marks.mbshiju_record;
	// 							if (mark) {
	// 								mark.firstChild.innerHTML = get.translation(get.type2(evt.card));
	// 							}
	// 						},
	// 						evt,
	// 						player
	// 					);
	// 				}
	// 			},
	// 			onremove(player, skill) {
	// 				player.removeTip(skill);
	// 			},
	// 		},
	// 	},
	// },
	//神太史慈
	qmsgswkjsgj_dulie: {
		audio: 'dulie',
		trigger: { target: "useCardToTarget" },
		forced: true,
		logTarget: "player",
		filter(event, player) {
			return event.card.name == "sha" ;
		},
		content() {
			"step 0";
			player.judge(function (result) {
				if (get.color(result) == "red") {
					return 2;
				}
				return -1;
			}).judge2 = function (result) {
				return result.bool;
			};
			"step 1";
			if (result.bool) {
				trigger.targets.remove(player);
				trigger.getParent().triggeredTargets2.remove(player);
				trigger.untrigger();
			}
		},
		ai: {
			effect: {
				target_use(card, player, target, current, isLink) {
					if (card.name == "sha" && !isLink && player.hp > target.hp) {
						return 0.5;
					}
				},
			},
		},
		marktext: "围",
		intro: {
			name: "破围(围)",
			name2: "围",
			content: "mark",
		},
	},
	qmsgswkjsgj_tspowei: {
		audio: 'tspowei',
		dutySkill: true,
		derivation: "shenzhu",
		mod:{
			targetInRange(card, player, target) {
				if (target.hasMark("dulie")&&card.name=="sha") {
					return true;
				}
			},
		},
		group: ["qmsgswkjsgj_tspowei_init", "qmsgswkjsgj_tspowei_move", "qmsgswkjsgj_tspowei_achieve", "qmsgswkjsgj_tspowei_fail", "qmsgswkjsgj_tspowei_use", "qmsgswkjsgj_tspowei_remove"],
		subSkill: {
			remove: {
				audio: "tspowei3.mp3",
				trigger: { global: "damageEnd" },
				filter(event, player) {
					return event.player && event.player.isIn() && event.player.hasMark("dulie");
				},
				// forced: true,
				logTarget: "player",
				// cost(){
				// 	event.result = 
				// },
				prompt: function(event,player){
					var player = player||_status.event.player;
					var target = event.player;
					return '是否移除'+get.translation(target)+'的【围】标记？';
				},
				content() {
					trigger.player.removeMark("dulie", trigger.player.countMark("dulie"));
				},
			},
			use: {
				audio: "tspowei3.mp3",
				trigger: { global: "phaseBegin" },
				direct: true,
				filter(event, player) {
					return event.player != player && event.player.hasMark("dulie") && (player.countCards("h") > 0 || (player.hp >= event.player.hp && event.player.countCards("h") > 0));
				},
				content() {
					"step 0";
					var list = [],
						target = trigger.player,
						choiceList = ["对其造成1点伤害", "获得其一张手牌"];
					event.target = target;
					if (
						true
					) {
						list.push("选项一");
					} else {
						choiceList[0] = '<span style="opacity:0.5">' + choiceList[0] + "</span>";
					}
					if (player.hp >= target.hp && target.countCards("h") > 0) {
						list.push("选项二");
					} else {
						choiceList[1] = '<span style="opacity:0.5">' + choiceList[1] + "</span>";
					}
					if (list.length>0) {
						list.push('背水！');
					}
					player
						.chooseControl(list, "cancel2")
						.set("prompt", get.prompt("qmsgswkjsgj_tspowei", target))
						.set("choiceList", choiceList)
						.set("ai", function () {
							var a=false,b=false;
							var evt = _status.event.getParent();
							if (
								// evt.player.hasCard(function (card) {
								// 	return lib.filter.cardDiscardable(card, evt.player, "tspowei_use") && get.value(card, evt.player) < 7;
								// }, "h") &&
								get.damageEffect(evt.target, evt.player, evt.player) > 0
							) {
								a=true;
							}
							if (evt.player.hp >= evt.target.hp && evt.target.countCards("h") > 0 && get.attitude(evt.player, evt.target) <= 0 && !evt.target.hasSkillTag("noh")) {
								b=true;
							}
							if(a&&b){return '背水！'}
							else if(a){return '选项一'}
							else if(b){return '选项二'}
							return "cancel2";
						});
					"step 1";
					if (result.control != "cancel2") {
						if (result.control == "选项二"||result.control=="背水！") {
							player.logSkill("tspowei_use", target);
							player.gainPlayerCard(target, "h", true);
							if(result.control!="背水！")event.goto(3);
						}
					} else {
						event.finish();
					}
					"step 2";
					// player.chooseToDiscard("h", true).logSkill = ["tspowei_use", target];
					// if (get.mode() != "identity" || player.identity != "nei") {
					// 	player.addExpose(0.2);
					// }
					player.logSkill('qmsgswkjsgj_tspowei_use',target)
					target.damage();
					"step 3";
					player.addTempSkill("qmsgswkjsgj_tspowei_inRange");
				},
				ai: { expose: 0.2 },
			},
			inRange: {
				charlotte: true,
				mod: {
					inRangeOf(from, to) {
						if (from == _status.currentPhase) {
							return true;
						}
					},
				},
			},
			init: {
				audio: "tspowei3.mp3",
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				forced: true,
				filter(event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				logTarget(event, player) {
					return game.filterPlayer(current => current != player && !current.hasMark("dulie"));
				},
				content() {
					var list = game.filterPlayer(current => current != player && !current.hasMark("dulie")).sortBySeat();
					for (var i of list) {
						i.addMark("dulie", 1, false);
					}
				},
			},
			move: {
				audio: "tspowei3.mp3",
				trigger: { player: "phaseBegin" },
				forced: true,
				filter(event, player) {
					return game.hasPlayer(current => current != player && current.hasMark("dulie"));
				},
				content() {
					'step 0'
					var list = game.filterPlayer(current => current != player && current.hasMark("dulie")).sortBySeat();
					// var map = {};
					for (var i of list) {
						var num = i.countMark("dulie");
						i.removeMark("dulie", num);
						// map[i.playerid] = num;
					}
					// for (var i of list) {
					// 	var next = i.next;
					// 	if (next == player) {
					// 		next = next.next;
					// 	}
					// 	next.addMark("dulie", map[i.playerid]);
					// }
					player.chooseTarget(list.length,true,'请重新分配其他角色的“围”标记');
					'strp 1'
					if(result.bool){
						var targets=result.targets;
						targets.sortBySeat();
						for(var i=0;i<targets.length;i++){
							targets[i].addMark("dulie");
						}
					}
				},
			},
			achieve: {
				audio: "tspowei1.mp3",
				trigger: { player: "phaseBegin" },
				forced: true,
				skillAnimation: true,
				animationColor: "metal",
				filter(event, player) {
					return game.countPlayer(function (current) {
						return current.hasMark("dulie");
					})<=player.maxHp;
				},
				content() {
					game.log(player, "成功完成使命");
					player.awakenSkill("qmsgswkjsgj_tspowei");
					player.addSkills("qmsgswkjsgj_shenzhu");
				},
			},
			fail: {
				audio: "tspowei2.mp3",
				trigger: { player: "dying" },
				forced: true,
				content() {
					"step 0";
					game.log(player, "使命失败");
					player.awakenSkill("qmsgswkjsgj_tspowei");
					if (player.hp < player.maxHp) {
						player.recover(player.maxHp - player.hp);
					}
					// "step 1";
					// var num = player.countCards("e");
					// if (num > 0) {
					// 	player.chooseToDiscard("e", true, num);
					// }
				},
			},
		},
	},
	qmsgswkjsgj_shenzhu: {
		audio: 'shenzhu',
		trigger: { player: "useCardAfter" },
		forced: true,
		filter(event, player) {
			return event.card.name == "sha" && event.card.isCard && event.cards.length == 1;
		},
		content() {
			"step 0";
			player
				.chooseControl()
				.set("choiceList", ["摸一张牌，且本回合使用【杀】的次数上限+1", "摸体力上限张牌，且本回合不能再使用【杀】"])
				.set("ai", () => (_status.event.player.hasSha() ? 0 : 1));
			"step 1";
			if (result.index == 0) {
				player.draw();
				player.addTempSkill("qmsgswkjsgj_shenzhu_more");
				player.addMark("qmsgswkjsgj_shenzhu_more", 1, false);
			} else {
				player.draw(player.maxHp);
				player.addTempSkill("qmsgswkjsgj_shenzhu_less");
			}
		},
		subSkill: {
			more: {
				charlotte: true,
				onremove: true,
				mod: {
					cardUsable(card, player, num) {
						if (card.name == "sha") {
							return num + player.countMark("qmsgswkjsgj_shenzhu_more");
						}
					},
				},
			},
			less: {
				charlotte: true,
				mod: {
					cardEnabled(card) {
						if (card.name == "sha") {
							return false;
						}
					},
				},
			},
		},
	},

	qmsgswkjsgj_shentianyi: {
		audio: 'tianyi',
		audioname: ["re_taishici"],
		enable: "phaseUse",
		usable: 1,
		filterTarget(card, player, target) {
			return player.canCompare(target);
		},
		filter(event, player) {
			return player.countCards("h") > 0;
		},
		async content(event, trigger, player) {
			const { bool } = await player.chooseToCompare(event.target).forResult();
			if (bool) {
				player.addTempSkill("qmsgswkjsgj_shentianyi2");
			}
		},
		ai: {
			order(name, player) {
				const cards = player.getCards("h");
				if (player.countCards("h", "sha") == 0) {
					return 1;
				}
				for (let i = 0; i < cards.length; i++) {
					if (cards[i].name != "sha" && get.number(cards[i]) > 11 && get.value(cards[i]) < 7) {
						return 9;
					}
				}
				return get.order({ name: "sha" }) - 1;
			},
			result: {
				player(player) {
					if (player.countCards("h", "sha") > 0) {
						return 0.6;
					}
					const num = player.countCards("h");
					if (num > player.hp) {
						return 0;
					}
					if (num == 1) {
						return -2;
					}
					if (num == 2) {
						return -1;
					}
					return -0.7;
				},
				target(player, target) {
					const num = target.countCards("h");
					if (num == 1) {
						return -1;
					}
					if (num == 2) {
						return -0.7;
					}
					return -0.5;
				},
			},
			threaten: 1.3,
		},
	},
	qmsgswkjsgj_shentianyi2: {
		mod: {
			targetInRange(card, player, target, now) {
				if (card.name == "sha") {
					return true;
				}
			},
			selectTarget(card, player, range) {
				if (card.name == "sha" && range[1] != -1) {
					range[1]++;
				}
			},
			cardUsable(card, player, num) {
				if (card.name == "sha") {
					return num + 1;
				}
			},
		},
		charlotte: true,
	},

	qmsgswkjsgj_shenhanzhan: {
		audio: 'hanzhan',
		trigger: {
			global: "chooseToCompareBegin",
		},
		filter(event, player) {
			if (player == event.player) {
				return true;
			}
			if (event.targets) {
				return event.targets.includes(player);
			}
			return player == event.target;
		},
		logTarget(event, player) {
			if (player != event.player) {
				return event.player;
			}
			return event.targets || event.target;
		},
		prompt2(event, player) {
			return "令其改为使用随机的手牌进行拼点";
		},
		check(trigger, player) {
			var num = 0;
			var targets = player == trigger.player ? (trigger.targets ? trigger.targets.slice(0) : [trigger.target]) : [trigger.player];
			while (targets.length) {
				var target = targets.shift();
				if (target.getCards("h").length > 1) {
					num -= get.attitude(player, target);
				}
			}
			return num > 0;
		},
		content() {
			var targets = player == trigger.player ? (trigger.targets ? trigger.targets.slice(0) : [trigger.target]) : [trigger.player];
			if (!trigger.fixedResult) {
				trigger.fixedResult = {};
			}
			while (targets.length) {
				var target = targets.shift();
				var hs = target.getCards("h");
				if (hs.length) {
					trigger.fixedResult[target.playerid] = hs.randomGet();
				}
			}
		},
		group: "qmsgswkjsgj_shenhanzhan_gain",
		subfrequent: ["gain"],
	},
	qmsgswkjsgj_shenhanzhan_gain: {
		trigger: {
			global: "chooseToCompareAfter",
		},
		audio: "hanzhan",
		sourceSkill: "qmsgswkjsgj_shenhanzhan",
		filter(event, player) {
			if (event.preserve) {
				return false;
			}
			if (player != event.player && player != event.target && (!event.targets || !event.targets.includes(player))) {
				return false;
			}
			for (var i of event.lose_list) {
				if (Array.isArray(i[1])) {
					for (var j of i[1]) {
						if (get.position(j, true) == "o") {
							return true;
						}
					}
				} else {
					var j = i[1];
					if (get.position(j, true) == "o") {
						return true;
					}
				}
			}
			return false;
		},
		frequent: true,
		prompt2(event, player) {
			var cards = [],
				max = 0;
			for (var i of event.lose_list) {
				if (Array.isArray(i[1])) {
					for (var j of i[1]) {
						if (get.position(j, true) == "o") {
							var num = get.number(j, i[0]);
							if (num > max) {
								cards = [];
								max = num;
							}
							if (num == max) {
								cards.push(j);
							}
						}
					}
				} else {
					var j = i[1];
					if (get.position(j, true) == "o") {
						var num = get.number(j, i[0]);
						if (num > max) {
							cards = [];
							max = num;
						}
						if (num == max) {
							cards.push(j);
						}
					}
				}
			}
			return "获得" + get.translation(cards);
		},
		content() {
			var cards = [],
				max = 0;
			for (var i of trigger.lose_list) {
				if (Array.isArray(i[1])) {
					for (var j of i[1]) {
						if (get.position(j, true) == "o") {
							var num = get.number(j, i[0]);
							if (num > max) {
								cards = [];
								max = num;
							}
							if (num == max) {
								cards.push(j);
							}
						}
					}
				} else {
					var j = i[1];
					if (get.position(j, true) == "o") {
						var num = get.number(j, i[0]);
						if (num > max) {
							cards = [];
							max = num;
						}
						if (num == max) {
							cards.push(j);
						}
					}
				}
			}
			player.gain(cards, "gain2");
		},
	},

	//界张嫙
	qmsgswkjsgj_re_shezang: {
		audio: 'shezang',
		// round: 1,
		trigger: { global: "dying" },
		frequent: true,
		filter(event, player) {
			// return event.player == player || player == _status.currentPhase;
			return true;
		},
		content() {
			var cards = [];
			for (var i of lib.suit) {
				var card = get.cardPile2(function (card) {
					return get.suit(card, false) == i;
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
	//界陈式
	qmsgswkjsgj_re_qingbei: {
		audio: 'qingbei',
		trigger: {
			global: "roundStart",
			player: "useCardAfter",
		},
		filter(event, player) {
			if (event.name != "useCard") {
				return true;
			}
			if (!player.getStorage("qmsgswkjsgj_re_qingbei_effect").length) {
				return false;
			}
			const suit = get.suit(event.card);
			if (!suit) {
				return false;
			}
			return suit !== "none";
		},
		async cost(event, trigger, player) {
			if (trigger.name == "useCard") {
				event.result = {
					bool: true,
				};
				return;
			}
			const result = await player
				.chooseButton([
					`###${get.prompt(event.skill)}###<div class='text center'>选择任意个花色，令你本轮不能使用这些花色的牌</div>`, 
					[lib.suit.map(i => ["", "", "lukai_" + i]), "vcard"],
				], [1, 4])
				.set("ai", button => {
					const player = get.player(),
						suit = button.link[2].slice(6),
						val = player
							.getCards("hs", { suit: suit })
							.map(card => {
								return get.value(card) + player.getUseValue(card) / 3;
							})
							.reduce((sum, value) => {
								return sum + value;
							}, 0);
					if (val > 10 && ui.selected.buttons.length > 0) {
						return -1;
					}
					if (val > 6 && ui.selected.buttons.length == 2) {
						return -1;
					}
					if (ui.selected.buttons.length == 3) {
						return -1;
					}
					return 1 + 1 / val;
				})
				.forResult();
			if (result?.bool && result.links?.length) {
				event.result = {
					bool: true,
					cost_data: result.links,
				}
			}
		},
		async content(event, trigger, player) {
			if (trigger.name == "useCard") {
				await player.draw(player.getStorage("qmsgswkjsgj_re_qingbei_effect").length+1, "nodelay");
				return;
			}
			const { name, cost_data: links } = event;
			const suits = links.map(i => i[2].slice(6)).sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a));
			const skill = `${name}_effect`;
			player.addTempSkill(skill, "roundStart");
			player.setStorage(skill, suits, true);
			player.addTip(skill, `${get.translation(skill)}${suits.map(i => get.translation(i)).join("")}`);
		},
		ai: {
			threaten: 2.3,
		},
		subSkill: {
			effect: {
				charlotte: true,
				onremove(player, skill) {
					delete player.storage[skill];
					player.removeTip(skill);
				},
				mark: true,
				intro: {
					content: `本轮内不能使用$花色的牌`,
				},
				mod: {
					cardEnabled(card, player) {
						if (player.getStorage("qmsgswkjsgj_re_qingbei_effect").includes(get.suit(card))) {
							return false;
						}
					},
					cardSavable(card, player) {
						if (player.getStorage("qmsgswkjsgj_re_qingbei_effect").includes(get.suit(card))) {
							return false;
						}
					},
				},
			},
		},
	},

	//滕芳兰
	qmsgswkjsgj_re_dcluochong: {
		audio: 'dcluochong',
		trigger: { global: "roundStart" },
		filter(event, player) {
			return game.hasPlayer(current => current.countDiscardableCards(player, "hej") > 0);
		},
		direct: true,
		async content(event, trigger, player) {
			if (_status.connectMode) {
				game.broadcastAll(function () {
					_status.noclearcountdown = true;
				});
			}
			const lose_list = [];
			let num = 4 - player.countMark("qmsgswkjsgj_re_dcluochong");
			let log = false;
			while (num > 0) {
				const result = await player
					.chooseTarget(get.prompt("qmsgswkjsgj_re_dcluochong"), `弃置任意名角色区域内的累计至多${num}张牌`, (card, player, target) => {
						return target.hasCard(card => {
							return lib.filter.canBeDiscarded(card, player, target, "dcluochong");
						}, "hej");
					})
					.set("ai", target => {
						const player = _status.event.player,
							discarded = _status.event.lose_list.find(item => item[0] == target);
						if (discarded) {
							if (target == player) {
								return 0;
							}
							const num = discarded[1].length;
							if (num > 1 && player.hp + player.hujia > 2) {
								return 0;
							}
						}
						if (target == player) {
							if (ui.cardPile.childNodes.length > 80 && player.hasCard(card => get.value(card) < 8)) {
								return 20;
							}
							return 0;
						}
						return get.effect(target, { name: "guohe_copy2" }, player, player);
					})
					.set("lose_list", lose_list)
					.forResult();
				if (result.bool) {
					if (!log) {
						player.logSkill("qmsgswkjsgj_re_dcluochong");
						log = true;
					}
					const target = result.targets[0];
					const { cards } = await player
						.choosePlayerCard(target, true, "hej", [1, num], `选择弃置${get.translation(target)}区域内的牌`, "allowChooseAll")
						.set("filterButton", button => {
							const card = button.link,
								target = _status.event.target,
								player = get.player();
							return lib.filter.canBeDiscarded(card, player, target, "qmsgswkjsgj_re_dcluochong");
						})
						.set("lose_list", lose_list)
						.set("ai", button => {
							if (ui.selected.buttons.length > 0) {
								return false;
							}
							var val = get.buttonValue(button);
							if (get.attitude(_status.event.player, _status.event.target) > 0) {
								return -val;
							}
							return val;
						})
						.forResult();
					num -= cards.length;
					const index = lose_list.find(item => item[0] == target);
					if (!index) {
						lose_list.push([target, cards]);
					} else {
						index[1].addArray(cards);
					}
					await target.discard(cards, "notBySelf").set("discarder", player);
				} else {
					break;
				}
			}
			if (_status.connectMode) {
				game.broadcastAll(function () {
					delete _status.noclearcountdown;
					game.stopCountChoose();
				});
			}
			// if (lose_list.length > 0 && lose_list.some(i => i[1].length > 2)) {
			// 	game.log(player, "可弃置牌数", "#g-1");
			// 	player.addMark("dcluochong", 1, false);
			// }
		},
		ai: {
			threaten: 2.5,
			effect: {
				target(card, player, target, current) {
					if (get.type(card) == "delay" && current < 0) {
						var current2 = _status.currentPhase;
						if (current2 && current2.getSeatNum() > target.getSeatNum()) {
							return 0.1;
						}
					}
				},
			},
		},
		group:['qmsgswkjsgj_re_dcluochong_change'],
		subSkill:{
			change:{
				firstDo:true,
				charlotte:true,
				direct:true,
				locked:true,
				trigger: {
					global: ["loseAfter"],
				},
				filter(event, player, name) {
					const evt = event.getParent(2);
					if (evt.name == "qmsgswkjsgj_re_dcluochong") {
						return true;
					}
				},
				content(){
					var evt = trigger.getParent(2);
					evt.name='dcluochong'
				}
			},
		},
	},
	qmsgswkjsgj_re_dcaichen: {
		audio: 'dcaichen',
		// init(player) {
		// 	game.addGlobalSkill("qmsgswkjsgj_re_dcaichen_hit");
		// },
		// onremove(player) {
		// 	if (!game.hasPlayer(current => current.hasSkill("qmsgswkjsgj_re_dcaichen", null, null, false), true)) {
		// 		game.removeGlobalSkill("qmsgswkjsgj_re_dcaichen_hit");
		// 	}
		// },
		trigger: {
			player: ["loseAfter", "phaseDiscardBefore"],
			// target: "useCardToTargeted",
		},
		filter(event, player, name) {
			if (event.name == "phaseDiscard") {
				// return ui.cardPile.childNodes.length > 40;
				return true;
			}
			// if (name == "useCardToTargeted") {
			// 	return ui.cardPile.childNodes.length < 40 && get.suit(event.card) == "spade";
			// }
			const evt = event.getParent(2);
			if (evt.name != "dcluochong" || evt.player != player ) {
				return false;
			}
			if (!event.getl(player).cards.length) {
				return false;
			}
			// return ui.cardPile.childNodes.length > 80;
			return true;
		},
		forced: true,
		getIndex(event,player){
			if(event.name=='phaseDiscard')return 1;
			return event.getl(player).cards.length;
		},
		content() {
			if (trigger.name.indexOf("lose") == 0) {
				player.draw(2);
			} else if (trigger.name == "phaseDiscard") {
				trigger.cancel();
				game.log(player, "跳过了弃牌阶段");
			} else {
				player.say('我是怎么进入这条分支的？')
				// trigger.directHit.add(player);
				// game.log(player, "不可响应", trigger.card);
			}
		},
		// subSkill: {
		// 	hit: {
		// 		trigger: { player: "dieAfter" },
		// 		filter(event, player) {
		// 			return !game.hasPlayer(current => current.hasSkill("qmsgswkjsgj_re_dcaichen", null, null, false), true);
		// 		},
		// 		silent: true,
		// 		forceDie: true,
		// 		content() {
		// 			game.removeGlobalSkill("qmsgswkjsgj_re_dcaichen_hit");
		// 		},
		// 		ai: {
		// 			directHit_ai: true,
		// 			skillTagFilter(player, tag, arg) {
		// 				return arg && arg.card && arg.target && arg.target.hasSkill("qmsgswkjsgj_re_dcaichen") && ui.cardPile.childNodes.length < 40 && get.suit(arg.card) === "spade";
		// 			},
		// 		},
		// 	},
		// },
	},
	//郑浑
	qmsgswkjsgj_re_dcpitian: {
		audio: 'dcpitian',
		trigger: {
			player: ["loseAfter", "damageEnd"],
			global: "loseAsyncAfter",
		},
		forced: true,
		locked: false,
		group: "qmsgswkjsgj_re_dcpitian_draw",
		filter(event, player) {
			if (event.name == "damage") {
				return true;
			}
			return event.type == "discard" && event.getl(player).cards2.length > 0;
		},
		getIndex(event, player){
			if(event.name=="damage"){
				return event.num;
			}
			else {
				if(event.type == "discard"&&event.getl(player).cards2.length>0){
					return event.getl(player).cards2.length;
				}
			}
		},
		content() {
			player.addMark("qmsgswkjsgj_re_dcpitian_handcard", 1, false);
			player.addSkill("qmsgswkjsgj_re_dcpitian_handcard");
			game.log(player, "的手牌上限", "#y+1");
		},
		subSkill: {
			draw: {
				audio: "dcpitian",
				trigger: { player: "phaseJieshuBegin" },
				filter(event, player) {
					return player.countCards("h") < player.getHandcardLimit();
				},
				prompt2(event, player) {
					return "摸" + get.cnNumber(player.getHandcardLimit() - player.countCards("h")) + "张牌，重置因〖辟田〗增加的手牌上限";
				},
				check(event, player) {
					return player.getHandcardLimit() - player.countCards("h") > Math.min(2, player.hp - 1);
				},
				content() {
					"step 0";
					var num = player.getHandcardLimit() - player.countCards("h");
					if (num > 0) {
						player.draw(num);
					}
					// "step 1";
					// player.removeMark("qmsgswkjsgj_re_dcpitian_handcard", player.countMark("dcpitian_handcard"), false);
					// game.log(player, "重置了", "#g【辟田】", "增加的手牌上限");
				},
			},
			handcard: {
				markimage: "image/card/handcard.png",
				intro: {
					content(storage, player) {
						return "手牌上限+" + storage;
					},
				},
				charlotte: true,
				mod: {
					maxHandcard(player, num) {
						return num + player.countMark("qmsgswkjsgj_re_dcpitian_handcard");
					},
				},
			},
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (get.tag(card, "discard")) {
						return 0.9;
					}
					if (get.tag(card, "damage")) {
						return 0.95;
					}
				},
			},
		},
	},

	//新岩泽(划掉)留赞
	qmsgswkjsgj_re_refenyin: {
		audio: 'refenyin',
		audioname: ["wufan"],
		trigger: { global: ["loseAfter", "cardsDiscardAfter", "loseAsyncAfter", "equipAfter"] },
		forced: true,
		filter(event, player) {
			if (player != _status.currentPhase) {
				return false;
			}
			var cards = event.getd();
			if (!cards.length) {
				return false;
			}
			var list = [];
			var num = cards.length;
			for (var i = 0; i < cards.length; i++) {
				var card = cards[i];
				list.add(get.number(card, false));
			}
			game.getGlobalHistory("cardMove", function (evt) {
				if (evt.name != "lose" && evt.name != "cardsDiscard") {
					return false;
				}
				if (evt.name == "lose" && evt.position != ui.discardPile) {
					return false;
				}
				if (evt == event || evt.getParent() == event) {
					return false;
				}
				num += evt.cards.length;
				for (var i = 0; i < evt.cards.length; i++) {
					var card = evt.cards[i];
					list.remove(get.number(card, evt.cards2 && evt.cards2.includes(card) ? evt.player : false));
				}
			});
			player.storage.qmsgswkjsgj_re_refenyin_mark2 = num;
			return list.length > 0;
		},
		content() {
			var list = [];
			var list2 = [];
			var cards = trigger.getd();
			for (var i = 0; i < cards.length; i++) {
				var card = cards[i];
				var suit = get.number(card, false);
				list.add(suit);
				list2.add(suit);
			}
			game.getGlobalHistory("cardMove", function (evt) {
				if (evt.name != "lose" && evt.name != "cardsDiscard") {
					return false;
				}
				if (evt.name == "lose" && evt.position != ui.discardPile) {
					return false;
				}
				if (evt == trigger || evt.getParent() == trigger) {
					return false;
				}
				for (var i = 0; i < evt.cards.length; i++) {
					var card = evt.cards[i];
					var suit = get.number(card, false);
					list.remove(suit);
					list2.add(suit);
				}
			});
			list2.sort();
			player.draw(list.length);
			player.storage.qmsgswkjsgj_re_refenyin_mark = list2;
			player.addTempSkill("qmsgswkjsgj_re_refenyin_mark");
			player.markSkill("qmsgswkjsgj_re_refenyin_mark");
		},
		subSkill: {
			mark: {
				charlotte: true,
				onremove(player) {
					delete player.storage.qmsgswkjsgj_re_refenyin_mark;
					delete player.storage.qmsgswkjsgj_re_refenyin_mark2;
				},
				intro: {
					content(s, p) {
						var str = "本回合已经进入过弃牌堆的卡牌的花色：";
						//保留这玩意你才知道原来抄的是奋音
						for (var i = 0; i < s.length; i++) {
							str += get.translation(s[i]);
						}
						str += "<br>本回合进入过弃牌堆的牌数：";
						str += p.storage.qmsgswkjsgj_re_refenyin_mark2;
						return str;
					},
				},
			},
		},
	},
	qmsgswkjsgj_re_liji: {
		enable: "phaseUse",
		usable(skill, player) {
			return get.event().qmsgswkjsgj_re_liji_num+1;
		},
		audio: 'liji',
		onChooseToUse(event) {
			if (game.online) {
				return;
			}
			var num = 0;
			var evt2 = event.getParent();
			if (!evt2.qmsgswkjsgj_re_liji_all) {
				evt2.qmsgswkjsgj_re_liji_all = 3;
			}
			game.getGlobalHistory("cardMove", function (evt) {
				if (evt.name == "cardsDiscard" || (evt.name == "lose" && evt.position == ui.discardPile)) {
					num += evt.cards.length;
				}
			});
			event.set("qmsgswkjsgj_re_liji_num", Math.floor(num / evt2.qmsgswkjsgj_re_liji_all));
		},
		filterCard: true,
		position: "he",
		check(card) {
			var val = get.value(card);
			if (!_status.event.player.getStorage("qmsgswkjsgj_re_refenyin_mark").includes(get.suit(card))) {
				return 12 - val;
			}
			return 8 - val;
		},
		filterTarget: lib.filter.notMe,
		content() {
			target.damage("nocard");
		},
		ai: {
			order: 1,
			result: {
				target: -1.5,
			},
			tag: {
				damage: 1,
			},
		},
	},
	//吴普
	qmsgswkjsgj_re_dcduanti: {
		audio: 'dcduanti',
		// trigger: {
		// 	player: ["useCardAfter", "respondAfter"],
		// },
		trigger:{
			// global:['loseAsyncAfter'],
			// player:['loseAfter'],
			player:'qmsgswkjsgj_re_dcduanti',
		},
		forced: true,
		locked:true,
		filter(event, player) {
			// return event._copqmsgswkjsgj_re_dcduanti;
			return true;
		},
		// getIndex(event,player){
		// 	var num = event.getl('player').length;
		// 	return num;
		// },
		// cost(){

		// },
		onremove: ["qmsgswkjsgj_re_dcduanti", "qmsgswkjsgj_re_dcduanti_counter"],
		group: "qmsgswkjsgj_re_dcduanti_counter",
		async content(event, trigger, player) {
			await player.recover();
			if (player.countMark("qmsgswkjsgj_re_dcduanti") >= 10) {
				return;
			}
			player.addMark("qmsgswkjsgj_re_dcduanti", 1, false);
			await player.gainMaxHp();
		},
		subSkill: {
			counter: {
				trigger:{
					global:['loseAsyncAfter'],
					player:['loseAfter'],
				},
				forced: true,
				charlotte: true,
				popup: false,
				firstDo: true,
				getIndex(event,player){
					var evt = event.getl(player);
					console.log(evt)
					return evt.cards.length;
				},
				async content(event, trigger, player) {
					// var num = event.getl('player')
					// if (num) {
					// 	player.addMark("qmsgswkjsgj_re_dcduanti_counter", num, false);
					// }
					player.addMark("qmsgswkjsgj_re_dcduanti_counter", 1, false);
					if (player.countMark("qmsgswkjsgj_re_dcduanti_counter") % 3 === 0) {
						// trigger._copqmsgswkjsgj_re_dcduanti = true;
						trigger.trigger('qmsgswkjsgj_re_dcduanti',player)
					}
					player.markSkill("qmsgswkjsgj_re_dcduanti");
				},
			},
		},
		intro: {
			markcount(storage, player) {
				return player.countMark("qmsgswkjsgj_re_dcduanti_counter");
			},
			content(storage, player) {
				return `<li>已失去过${get.cnNumber(player.countMark("qmsgswkjsgj_re_dcduanti_counter"))}张牌<br><li>已以此法增加${player.countMark("qmsgswkjsgj_re_dcduanti")}点体力上限`;
			},
		},
	},
	qmsgswkjsgj_re_dcshicao: {
		audio: 'dcshicao',
		enable: "phaseUse",
		onremove: ["qmsgswkjsgj_re_dcshicao_aiRecord"],
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog("###识草###选择一种类型与要摸牌的来源", [["caoying_basic", "caoying_trick", "caoying_equip"], "vcard"], [["牌堆顶", "牌堆底"], "tdnodes"]);
			},
			check(button) {
				const player = get.player();
				const bottom = player.storage.qmsgswkjsgj_re_dcshicao_bottom,
					aiStorage = player.getStorage("qmsgswkjsgj_re_dcshicao_aiRecord");
				if (bottom && aiStorage.length > 0 && ui.cardPile.lastChild && get.name(ui.cardPile.lastChild, false) === get.name(aiStorage.lastItem, false)) {
					if (button.link === "牌堆底" || button.link[2].slice(8) === get.type2(aiStorage.lastItem, false)) {
						return 20;
					}
				}
				if (button.link === "牌堆顶" || button.link[2].slice(8) === "basic") {
					return 10;
				}
				return 5 + Math.random();
			},
			filter(button, player) {
				if (!ui.selected.buttons.length) {
					return true;
				}
				return ui.selected.buttons[0].parentNode != button.parentNode;
			},
			select: 2,
			backup(links, player) {
				if (links[0].includes("牌堆")) {
					links.reverse();
				}
				return {
					audio: "dcshicao",
					type: links[0][2].slice(8),
					pos: links[1],
					filterCard: () => false,
					selectCard: -1,
					async content(event, trigger, player) {
						let { type, pos } = lib.skill.qmsgswkjsgj_re_dcshicao_backup;
						game.log(player, "声明了", `#y${get.translation(type)}牌`);
						const next = player.draw();
						const bottom = pos === "牌堆底";
						if (bottom) {
							next.set("bottom", true);
							if (player.getStorage("qmsgswkjsgj_re_dcshicao_aiRecord").length > 0) {
								player.storage.qmsgswkjsgj_re_dcshicao_aiRecord.pop();
							}
						}
						const drawnCards = await next.forResult();
						if (get.type2(drawnCards[0], player) === type) {
							return;
						}
						let cards;
						if (!bottom) {
							cards = get.bottomCards(3);
							cards.reverse();
						} else {
							cards = get.cards(3);
						}
						await game.cardsGotoOrdering(cards);
						await player.viewCards(`${bottom ? "牌堆顶" : "牌堆底"}的两张牌(靠左的在牌堆更靠上)`, cards);
						player.storage.qmsgswkjsgj_re_dcshicao_record = cards.slice();
						player.storage.qmsgswkjsgj_re_dcshicao_aiRecord = cards.slice();
						player.storage.qmsgswkjsgj_re_dcshicao_bottom = !bottom;
						const skill = "qmsgswkjsgj_re_dcshicao";
						player.localMarkSkill(skill, player, event);
						if (bottom) {
							cards.reverse();
						}
						await game.cardsGotoPile(cards, bottom ? "insert" : null);
						player.tempBanSkill(skill);
					},
					ai: {
						result: { player: 1 },
					},
				};
			},
			prompt(links, player) {
				return `点击“确定”，从${links[1]}摸一张牌`;
			},
		},
		intro: {
			mark(dialog, content, player) {
				var cards = player.getStorage("dcshicao_record");
				if (cards && cards.length) {
					if (player.isUnderControl(true)) {
						dialog.addText(`上一次观看的${player.storage.dcshicao_bottom ? "牌堆底" : "牌堆顶"}的牌：`);
						dialog.addAuto(cards);
						dialog.addText("（牌堆顶——牌堆底）");
					} else {
						return "不给看";
					}
				}
			},
		},
		subSkill: {
			backup: {},
		},
		ai: {
			order: 8,
			result: {
				player: 1,
			},
		},
	},


	//阮瑀
	qmsgswkjsgj_re_xingzuo: {
		audio: 'xingzuo',
		// trigger: { player: "phaseUseBegin" },
		// frequent: true,
		enable:'phaseUse',
		usable:1,
		content() {
			"step 0";
			player.addTempSkill("qmsgswkjsgj_re_xingzuo2");
			var cards = get.bottomCards(5);
			event.cards2 = cards;
			game.cardsGotoOrdering(cards);
			var next = player.chooseToMove("兴作：将五张牌置于牌堆底");
			var list = [["牌堆底", cards]],
				hs = player.getCards("h");
			if (hs.length) {
				list.push(["手牌", hs]);
				next.set("filterMove", function (from, to) {
					return typeof to != "number";
				});
			}
			next.set("list", list);
			next.set("processAI", function (list) {
				var allcards = list[0][1].slice(0),
					cards = [];
				if (list.length > 1) {
					allcards = allcards.concat(list[1][1]);
				}
				var canchoose = allcards.slice(0);
				var player = _status.event.player;
				var getv = function (button) {
					if (
						button.name == "sha" &&
						allcards.filter(function (card) {
							return (
								card.name == "sha" &&
								!cards.filter(function () {
									return button == card;
								}).length
							);
						}).length > player.getCardUsable({ name: "sha" })
					) {
						return 10;
					}
					return -player.getUseValue(button, player);
				};
				while (cards.length < 5) {
					canchoose.sort(function (a, b) {
						return getv(b) - getv(a);
					});
					cards.push(canchoose.shift());
				}
				return [cards, canchoose];
			});
			"step 1";
			if (result.bool) {
				event.forceDie = true;
				var cards = result.moved[0];
				event.cards = cards;
				player.storage.qmsgswkjsgj_re_xingzuo2 = cards;
				var hs = player.getCards("h");
				var lose = [],
					gain = event.cards2;
				for (var i of cards) {
					if (hs.includes(i)) {
						lose.push(i);
					} else {
						gain.remove(i);
					}
				}
				if (lose.length) {
					player.lose(lose, ui.cardPile);
				}
				if (gain.length) {
					player.gain(gain, "draw");
				}
			} else {
				event.finish();
			}
			"step 2";
			for (var i of cards) {
				if (!"hejsdx".includes(get.position(i, true))) {
					i.fix();
					ui.cardPile.appendChild(i);
				}
			}
			game.updateRoundNumber();
		},
	},
	qmsgswkjsgj_re_xingzuo2: {
		trigger: { player: "phaseJieshuBegin" },
		direct: true,
		charlotte: true,
		onremove: true,
		sourceSkill: "qmsgswkjsgj_re_xingzuo",
		filter(event, player) {
			return game.hasPlayer(function (target) {
				return target.countCards("h") > 0;
			});
		},
		content() {
			"step 0";
			player
				.chooseTarget(function (card, player, target) {
					return target.countCards("h") > 0;
				}, "兴作：是否令一名角色将其手牌与牌堆底的五张牌替换？")
				.set("ai", function (target) {
					var player = _status.event.player,
						att = get.attitude(player, target),
						hs = target.getCards("h"),
						num = hs.length;
					var getv = function (list, target) {
							var num = 0;
							for (var i of list) {
								num += get.value(i, target);
							}
							return num;
						},
						val = getv(hs, target) - getv(player.storage.xingzuo2, target);
					if (num < 5) {
						return att * Math.sqrt(Math.max(0, -val)) * 1.5;
					}
					if (num == 5) {
						return -att * Math.sqrt(Math.max(0, val));
					}
					// if (player.hp < (num > 5 ? 3 : 2)) {
					// 	return 0;
					// }
					return -att * Math.sqrt(Math.max(0, val));
				});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("qmsgswkjsgj_re_xingzuo", target);
				var cards = get.bottomCards(5);
				game.cardsGotoOrdering(cards);
				var hs = target.getCards("h");
				target.lose(hs, ui.cardPile);
				target.gain(cards, "draw");
				// if (hs.length > 3) {
				// 	player.loseHp();
				// }
			} else {
				event.finish();
			}
			"step 2";
			game.updateRoundNumber();
		},
	},
	qmsgswkjsgj_re_miaoxian: {
		hiddenCard(player, name) {
			return  ["trick",'basic'].includes(get.type2(name)) && player.countCards("h", { color: "black" }) == 1;
		},
		audio: 'miaoxian',
		enable: "chooseToUse",
		filter(event, player) {
			// if (player.hasSkill("qmsgswkjsgj_re_miaoxian_used")) {
			// 	return false;
			// }
			var cards = player.getCards("h", { color: "black" });
			if (cards.length != 1) {
				return false;
			}
			var mod2 = game.checkMod(cards[0], player, "unchanged", "cardEnabled2", player);
			if (mod2 === false) {
				return false;
			}
			for (var i of lib.inpile) {
				if (
					["trick",'basic'].includes(get.type2(i)) &&
					event.filterCard(
						{
							name: i,
							cards: cards,
						},
						player,
						event
					)
				) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				var cards = player.getCards("h", { color: "black" });
				var list = [];
				for (var i of lib.inpile) {
					if (
						["trick",'basic'].includes(get.type2(i)) &&
						event.filterCard(
							{
								name: i,
								cards: cards,
							},
							player,
							event
						)
					) {
						list.push([get.type2(i), "", i]);
						if (i == 'sha') {
							for (var k of get.YB_natureList()) {
								list.push(['基本', '', i, k]);
							}
							// list.push(['基本', '', i, 'kami']);
						}
					}
				}
				return ui.create.dialog("妙弦", [list, "vcard"], "hidden");
			},
			check(button) {
				var player = _status.event.player;
				return player.getUseValue({ name: button.link[2] }) + 1;
			},
			backup(links, player) {
				return {
					audio: "miaoxian",
					popname: true,
					filterCard: { color: "black" },
					selectCard: -1,
					position: "h",
					viewAs: {
						name: links[0][2],
					},
					// onuse(links, player) {
					// 	player.addTempSkill("miaoxian_used");
					// },
				};
			},
			prompt(links, player) {
				return "将" + get.translation(player.getCards("h", { color: "black" })[0]) + "当做" +(links[0][3]?get.translation(links[0][3]):"")+ get.translation(links[0][2]) + "使用";
			},
		},
		group: "qmsgswkjsgj_re_miaoxian_use",
		subfrequent: ["use"],
		subSkill: {
			use: {
				audio: "miaoxian",
				trigger: { player: "loseAfter" },
				frequent: true,
				prompt: "是否发动【妙弦】摸一张牌？",
				filter(event, player) {
					var evt = event.getParent();
					if (evt.name != "useCard"&&evt.name!="respond") {
						return false;
					}
					return event.hs && event.hs.length == 1 && event.cards && event.cards.length == 1 && get.color(event.hs[0], player) == "red" && !player.countCards("h", { color: "red" });
				},
				content() {
					player.draw();
					var evt = trigger.getParent();
					if(evt.name=="useCard"){
						evt.directHit.addArray(game.players);
					}
				},
				mod:{
					cardUsable:function(card,player,num){
						var cards = player.getCards('h',function(x){
							return get.color(x,player)=='red';
						})
						if(cards.length==1){
							if(get.color(card)=='red')return Infinity;
						}
					},
					cardEnabled:function(card,player){
						var cards = player.getCards('h',function(x){
							return get.color(x,player)=='red';
						})
						if(cards.length==1){
							if(get.color(card)=='red')return true;
						}
					},
					targetInRange(card, player, target) {
						var cards = player.getCards('h',function(x){
							return get.color(x,player)=='red';
						})
						if(cards.length==1){
							if(get.color(card)=='red')return true;
						}
					},
				}
			},
			backup: { audio: "miaoxian" },
			used: { charlotte: true },
		},
		ai: {
			order: 12,
			result: { player: 1 },
		},
	},

	//杜预
	qmsgswkjsgj_re_dcjianguo: {
		audio: 'dcjianguo',
		enable: "phaseUse",
		filter(event, player) {
			return ["discard", "draw"].some(i => !player.getStorage("qmsgswkjsgj_re_dcjianguo_used").includes(i));
		},
		chooseButton: {
			dialog(event, player) {
				var dialog = ui.create.dialog("谏国：请选择一项", "hidden");
				dialog.add([
					[
						["discard", "令一名角色弃置一半手牌，若其弃置的牌数量小于你的体力值，你对其造成一点伤害"],
						["draw", "令一名角色摸等同于手牌数一半的牌，若其摸牌数量大于等于你的体力值，你回复一点体力"],
					],
					"textbutton",
				]);
				return dialog;
			},
			filter(button, player) {
				return !player.getStorage("qmsgswkjsgj_re_dcjianguo_used").includes(button.link);
			},
			check(button) {
				var player = _status.event.player;
				if (button.link == "discard") {
					var discard = Math.max.apply(
						Math,
						game
							.filterPlayer(current => {
								return lib.skill.qmsgswkjsgj_re_dcjianguo_discard.filterTarget(null, player, current);
							})
							.map(current => {
								return get.effect(current, "qmsgswkjsgj_re_dcjianguo_discard", player, player);
							})
					);
					return discard;
				}
				if (button.link == "draw") {
					var draw = Math.max.apply(
						Math,
						game
							.filterPlayer(current => {
								return lib.skill.qmsgswkjsgj_re_dcjianguo_draw.filterTarget(null, player, current);
							})
							.map(current => {
								return get.effect(current, "qmsgswkjsgj_re_dcjianguo_draw", player, player);
							})
					);
					return draw;
				}
				return 0;
			},
			backup(links) {
				return get.copy(lib.skill["qmsgswkjsgj_re_dcjianguo_" + links[0]]);
			},
			prompt(links) {
				if (links[0] == "discard") {
					return "令一名角色弃置一半手牌，若其弃置的牌数量小于你的体力值，你对其造成一点伤害";
				}
				return "令一名角色摸等同于手牌数一半的牌，若其摸牌数量大于等于你的体力值，你回复一点体力";
			},
		},
		ai: {
			order: 10,
			threaten: 2.8,
			result: {
				//想让杜预两个技能自我联动写起来太累了，开摆
				player: 1,
			},
		},
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
			},
			backup: { audio: "dcjianguo" },
			discard: {
				audio: "dcjianguo",
				filterTarget: () => true,
				filterCard: () => false,
				selectCard: -1,
				content() {
					"step 0";
					player.addTempSkill("qmsgswkjsgj_re_dcjianguo_used", "phaseUseAfter");
					player.markAuto("qmsgswkjsgj_re_dcjianguo_used", ["discard"]);
					// target.draw();
					game.delayex();
					"step 1";
					var num = Math.ceil(target.countCards("h") / 2);
					if (num > 0) {
						event._result = target.chooseToDiscard(num, true, "谏国：请弃置" + get.cnNumber(num) + "张手牌");
						// console.log(event._result)
					}
					'step 2'
					// console.log(result)
					if(result){
						if(result.cards&&result.cards.length<player.hp){
							target.damage();
						}
					}
				},
				ai: {
					result: {
						target(player, target) {
							return 1.1 - Math.floor(target.countCards("h") / 2);
						},
					},
					tag: {
						gain: 1,
						loseCard: 2,
					},
				},
			},
			draw: {
				audio: "dcjianguo",
				filterTarget(card, player, target) {
					return target.countCards("he");
				},
				filterCard: () => false,
				selectCard: -1,
				content() {
					"step 0";
					player.addTempSkill("qmsgswkjsgj_re_dcjianguo_used", "phaseUseAfter");
					player.markAuto("qmsgswkjsgj_re_dcjianguo_used", ["draw"]);
					// target.chooseToDiscard("he", true, "谏国：请弃置一张牌");
					"step 1";
					var num = Math.ceil(target.countCards("h") / 2);
					if (num > 0) {
						event._result = target.draw(num);
						// console.log(event._result)
					}
					'step 2'
					if(result){
						if(result&&result.length>=player.hp){
							player.recover()
						}
					}
				},
				ai: {
					result: {
						target(player, target) {
							var fix = 0;
							var num = target.countCards("h");
							if (player == target && num % 2 == 1 && num >= 5) {
								fix += 1;
							}
							return Math.ceil(num / 2 - 0.5) + fix;
						},
					},
					tag: {
						loseCard: 1,
						gain: 2,
					},
				},
			},
		},
	},
	qmsgswkjsgj_re_dcdyqingshi: {
		audio: 'dcdyqingshi',
		trigger: {
			player: "useCard",
		},
		filter(event, player) {
			if (player != _status.currentPhase) {
				return false;
			}
			// if (!event.isFirstTarget) {
			// 	return false;
			// }
			// if (event.card.name != "sha" && get.type(event.card, null, false) != "trick") {
			// 	return false;
			// }
			if (player.countCards("h") != player.getHistory("useCard").indexOf(event) + 1) {
				return false;
			}
			// return event.targets.some(target => {
			// 	return target != player && target.isIn();
			// });
			return true;
		},
		direct: true,
		locked: false,
		content() {
			"step 0";
			var targets = trigger.targets.filter(target => {
				return target != player && target.isIn();
			});
			player
				.chooseTarget(get.prompt("qmsgswkjsgj_re_dcdyqingshi"), "对一名角色造成1点伤害", (card, player, target) => {
					return true;
				})
				.set("ai", target => {
					var player = _status.event.player;
					return get.damageEffect(target, player, player);
				})
				.set("targets", targets);
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("qmsgswkjsgj_re_dcdyqingshi", target);
				target.damage();
			}
		},
		mod: {
			aiOrder(player, card, num) {
				if (_status.currentPhase != player) {
					return;
				}
				var cardsh = [];
				if (Array.isArray(card.cards)) {
					cardsh.addArray(
						card.cards.filter(card => {
							return get.position(card) == "h";
						})
					);
				}
				var del = player.countCards("h") - cardsh.length - player.getHistory("useCard").length - 1;
				if (del < 0) {
					return;
				}
				if (del > 0) {
					if (card.name == "sha" || get.type(card, null, player) != "trick") {
						return num / 3;
					}
					return num + 1;
				}
				return num + 15;
			},
		},
	},










	//神赐
	//神赐武诸葛亮
	qmsgswkjsgj_shenci_dcjincui: {
		audio: 'dcjincui',
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			return true;
		},
		forced: true,
		group: "qmsgswkjsgj_shenci_dcjincui_advent",
		async content(event, trigger, player) {
			let num = 0;
			for (let i = 0; i < ui.cardPile.childNodes.length; i++) {
				let card = ui.cardPile.childNodes[i];
				if (get.number(card) == 7) {
					num++;
					if (num >= player.maxHp) {
						break;
					}
				}
			}
			for (let i = 0; i < ui.discardPile.childNodes.length; i++) {
				let card = ui.discardPile.childNodes[i];
				if (get.number(card) == 7) {
					num++;
					if (num >= player.maxHp) {
						break;
					}
				}
			}
			if (num < 1) {
				num = 1;
			}
			if (num > player.hp) {
				await player.recover(num - player.hp);
			} else if (num < player.hp) {
				await player.loseHp(player.hp - num);
			}
			const result = await player
				.chooseToGuanxing(player.hp)
				.set("prompt", "尽瘁：点击或拖动将牌移动到牌堆顶或牌堆底")
				.set("processAI", list => {
					let cards = list[0][1],
						player = _status.event.player,
						target = _status.currentPhase || player,
						name = _status.event.getTrigger().name,
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
						top = [],
						bottom = [];
					for (let i = 0; i < cards.length; i++) {
						if (get.number(cards[i]) == 7) {
							bottom.addArray(cards.splice(i--, 1));
						}
					}
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
								bottom.addArray(cards);
								return [top, bottom];
							}
							cards.sort((a, b) => {
								return (get.value(b, target) - get.value(a, target)) * att;
							});
							while (needs--) {
								top.unshift(cards.shift());
							}
							while (cards.length) {
								if (get.value(cards[0], target) > 6 == att > 0) {
									top.unshift(cards.shift());
								} else {
									break;
								}
							}
							bottom.addArray(cards);
							return [top, bottom];
						}
						default:
							cards.sort((a, b) => {
								return get.value(b, target) - get.value(a, target);
							});
							while (cards.length) {
								if (get.value(cards[0], target) > 6) {
									top.unshift(cards.shift());
								} else {
									break;
								}
							}
							bottom.addArray(cards);
							return [top, bottom];
					}
				})
				.forResult();
			if (!result.bool || !result.moved[0].length) {
				player.addTempSkill("guanxing_fail");
			}
		},
		ai: {
			guanxing: true,
			effect: {
				target(card, player, target) {
					if (!get.tag(card, "damage")) {
						return;
					}
					var num = 0,
						bool = false;
					for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
						var card = ui.cardPile.childNodes[i];
						if (get.number(card) == 7) {
							num++;
							if (num >= target.hp) {
								bool = true;
								break;
							}
						}
					}
					if (bool) {
						return 0.2;
					}
				},
			},
			threaten: 0.6,
		},
		subSkill: {
			advent: {
				audio: "dcjincui",
				trigger: { global: "phaseBefore", player: "enterGame" },
				forced: true,
				filter(event, player) {
					return (event.name != "phase" || game.phaseNumber == 0) && player.countCards("h") < 7;
				},
				content() {
					player.drawTo(7);
				},
			},
		},
	},
	qmsgswkjsgj_shenci_dcqingshi: {
		audio: 'dcqingshi',
		trigger: { player: "useCard" },
		filter(event, player) {
			if (!player.isPhaseUsing()) {
				return false;
			}
			// if (player.getStorage("dcqingshi_clear").includes(event.card.name)) {
			// 	return false;
			// }
			if (
				player.hasCard(card => {
					return get.name(card) == event.card.name;
				})
			) {
				return true;
			}
			return false;
		},
		direct: true,
		content() {
			"step 0";
			var choices = [];
			var choiceList = ["令" + get.translation(trigger.card) + "对其中一个目标角色造成的伤害+1", "令任意名角色各摸一张牌", "摸X张牌，然后〖情势〗于本回合无效（X为你的体力值）"];
			if (trigger.targets && trigger.targets.length) {
				choices.push("选项一");
			} else {
				choiceList[0] = '<span style="opacity:0.5">' + choiceList[0] + "(无目标角色)</span>";
			}
			if (game.countPlayer()) {
				choices.push("选项二");
			} else {
				choiceList[1] = '<span style="opacity:0.5">' + choiceList[1] + "</span>";
			}
			choices.push("选项三");
			player
				.chooseControl(choices, "cancel2")
				.set("choiceList", choiceList)
				.set("prompt", get.prompt("qmsgswkjsgj_shenci_dcqingshi"))
				.set("ai", () => {
					return _status.event.choice;
				})
				.set(
					"choice",
					(() => {
						var choicesx = choices.slice();
						var cards = player.getCards("hs");
						var bool1 =
								get.tag(trigger.card, "damage") &&
								choicesx.includes("选项一") &&
								trigger.targets.some(current => {
									return get.attitude(player, current) < 0;
								}),
							bool2 = choicesx.includes("选项二");
						if (bool2) {
							bool2 = game.countPlayer(function (current) {
								return get.attitude(player, current) > 0;
							});
						} else {
							bool2 = 0;
						}
						if (bool1 || bool2) {
							for (var i = 0; i < cards.length; i++) {
								var name = get.name(cards[i]);
								// if (player.getStorage("dcqingshi_clear").includes(name)) {
								// 	continue;
								// }
								for (var j = i + 1; j < cards.length; j++) {
									if (name === get.name(cards[j]) && get.position(cards[i]) + get.position(cards[j]) !== "ss" && player.hasValueTarget(cards[i])) {
										choicesx.remove("选项三");
										break;
									}
								}
							}
						}
						if (bool2 > 2) {
							return "选项二";
						}
						if (choicesx.includes("选项三")) {
							return "选项三";
						}
						if (bool2 === 2) {
							return "选项二";
						}
						if (bool1) {
							return "选项一";
						}
						if (bool2) {
							return "选项二";
						}
						return "cancel2";
					})()
				);
			"step 1";
			if (result.control != "cancel2") {
				player.logSkill("qmsgswkjsgj_shenci_dcqingshi");
				game.log(player, "选择了", "#y" + result.control);
				var index = ["选项一", "选项二", "选项三"].indexOf(result.control) + 1;
				// player.addTempSkill("dcqingshi_clear");
				// player.markAuto("dcqingshi_clear", [trigger.card.name]);
				var next = game.createEvent("qmsgswkjsgj_shenci_dcqingshi_after");
				next.player = player;
				next.card = trigger.card;
				next.setContent(lib.skill.qmsgswkjsgj_shenci_dcqingshi["content" + index]);
			}
		},
		content1() {
			"step 0";
			player
				.chooseTarget("令" + get.translation(card) + "对其中一个目标造成的伤害+1", true, (card, player, target) => {
					return _status.event.targets.includes(target);
				})
				.set("ai", target => {
					return 2 - get.attitude(_status.event.player, target);
				})
				.set("targets", event.getParent().getTrigger().targets);
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target);
				player.addTempSkill("qmsgswkjsgj_shenci_dcqingshi_ex");
				if (!player.storage.qmsgswkjsgj_shenci_dcqingshi_ex) {
					player.storage.qmsgswkjsgj_shenci_dcqingshi_ex = [];
				}
				player.storage.qmsgswkjsgj_shenci_dcqingshi_ex.push([target, card]);
			}
		},
		content2() {
			"step 0";
			player.chooseTarget("令任意名角色各摸一张牌", [1, Infinity], true).set("ai", target => {
				return get.attitude(_status.event.player, target);
			});
			"step 1";
			if (result.bool) {
				var targets = result.targets;
				targets.sortBySeat();
				player.line(targets);
				game.asyncDraw(targets);
				game.delayex();
			}
		},
		content3() {
			"step 0";
			var num = player.hp;
			player.draw(num);
			player.tempBanSkill("qmsgswkjsgj_shenci_dcqingshi");
		},
		subSkill: {
			ex: {
				trigger: { source: "damageBegin1" },
				filter(event, player) {
					return (
						player.storage.qmsgswkjsgj_shenci_dcqingshi_ex &&
						player.storage.qmsgswkjsgj_shenci_dcqingshi_ex.some(info => {
							return info[0] == event.player && info[1] == event.card;
						})
					);
				},
				forced: true,
				charlotte: true,
				popup: false,
				onremove: true,
				content() {
					trigger.num++;
					for (var i = 0; i < player.storage.qmsgswkjsgj_shenci_dcqingshi_ex.length; i++) {
						if (player.storage.qmsgswkjsgj_shenci_dcqingshi_ex[i][1] == trigger.card) {
							player.storage.qmsgswkjsgj_shenci_dcqingshi_ex.splice(i--, 1);
						}
					}
				},
			},
			clear: {
				onremove: true,
				charlotte: true,
			},
		},
		ai: {
			threaten: 6,
		},
	},
	qmsgswkjsgj_shenci_dczhizhe: {
		audio: 'dczhizhe',
		enable: "phaseUse",
		limited: true,
		filterCard: true,
		position: "h",
		discard: false,
		lose: false,
		delay: false,
		skillAnimation: true,
		animationColor: "metal",
		check(card) {
			if (get.type(card) != "basic" && get.type(card) != "trick") {
				return 0;
			}
			return get.value(card) - 7.5;
		},
		content() {
			"step 0";
			var card = cards[0];
			player.awakenSkill(event.name);
			var cardx = game.createCard2(card.name, card.suit, card.number, card.nature);
			player.gain(cardx).gaintag.add("qmsgswkjsgj_shenci_dczhizhe");
			player.addSkill("qmsgswkjsgj_shenci_dczhizhe_effect");
		},
		ai: {
			order: 15,
			result: {
				player: 1,
			},
		},
		subSkill: {
			effect: {
				mod: {
					aiOrder(player, card, num) {
						if (num > 0 && get.itemtype(card) === "card" && card.hasGaintag("qmsgswkjsgj_shenci_dczhizhe")) {
							return num + 0.16;
						}
					},
					aiValue(player, card, num) {
						if (num > 0 && get.itemtype(card) === "card" && card.hasGaintag("qmsgswkjsgj_shenci_dczhizhe")) {
							return 2 * num;
						}
					},
					aiUseful(player, card, num) {
						if (num > 0 && !player._dczhizhe_mod && get.itemtype(card) === "card" && card.hasGaintag("qmsgswkjsgj_shenci_dczhizhe")) {
							if (player.canIgnoreHandcard(card)) {
								return Infinity;
							}
							player._dczhizhe_mod = true;
							if (
								player.hp < 3 &&
								player.needsToDiscard(0, (i, player) => {
									return !player.canIgnoreHandcard(i) && get.useful(i) > 6;
								})
							) {
								return num * 1.5;
							}
							return num * 10;
						}
					},
				},
				audio: "dczhizhe",
				// trigger: { player: ["useCardAfter", "respondAfter"] },
				trigger:{
					player:'loseAfter',
					global:['loseAsyncAfter'],
				},
				charlotte: true,
				forced: true,
				filter(event, player) {
					var evt = event.getl(player);
					
					for (var i in evt.gaintag_map) {
						if (evt.gaintag_map[i].includes("qmsgswkjsgj_shenci_dczhizhe")) {
							if (
								event.cards.some(card => {
									return (get.position(card, true) == "o"||get.position(card, true) == "d") && card.cardid == i;
								})
							) {
								return true;
							}
						}
					}
					// return player.hasHistory("lose", function (evt) {
					// 	if ((evt.relatedEvent || evt.getParent()) != event) {
					// 		return false;
					// 	}
					// 	for (var i in evt.gaintag_map) {
					// 		if (evt.gaintag_map[i].includes("qmsgswkjsgj_shenci_dczhizhe")) {
					// 			if (
					// 				event.cards.some(card => {
					// 					return get.position(card, true) == "o" && card.cardid == i;
					// 				})
					// 			) {
					// 				return true;
					// 			}
					// 		}
					// 	}
					// 	return false;
					// });
				},
				content() {
					"step 0";
					var cards = [];
					var evt = trigger.getl(player);
					
					for (var i in evt.gaintag_map) {
						if (evt.gaintag_map[i].includes("qmsgswkjsgj_shenci_dczhizhe")) {
							var cardsx = trigger.cards.filter(card => {
								return (get.position(card, true) == "o"||get.position(card, true) == "d") && card.cardid == i;
							});
							if (cardsx.length) {
								cards.addArray(cardsx);
							}
						}
					}
					// player.getHistory("lose", function (evt) {
					// 	if ((evt.relatedEvent || evt.getParent()) != trigger) {
					// 		return false;
					// 	}
					// 	for (var i in evt.gaintag_map) {
					// 		if (evt.gaintag_map[i].includes("qmsgswkjsgj_shenci_dczhizhe")) {
					// 			var cardsx = trigger.cards.filter(card => {
					// 				return get.position(card, true) == "o" && card.cardid == i;
					// 			});
					// 			if (cardsx.length) {
					// 				cards.addArray(cardsx);
					// 			}
					// 		}
					// 	}
					// });
					if (cards.length) {
						player.gain(cards, "gain2").gaintag.addArray(["qmsgswkjsgj_shenci_dczhizhe", "qmsgswkjsgj_shenci_dczhizhe_clear"]);
						player.addTempSkill("qmsgswkjsgj_shenci_dczhizhe_clear");
					}
				},
			},
			clear: {
				charlotte: true,
				onremove(player) {
					player.removeGaintag("qmsgswkjsgj_shenci_dczhizhe_clear");
				},
				mod: {
					cardEnabled2(card, player) {
						var cards = [];
						if (card.cards) {
							cards.addArray(cards);
						}
						if (get.itemtype(card) == "card") {
							cards.push(card);
						}
						for (var cardx of cards) {
							if (cardx.hasGaintag("qmsgswkjsgj_shenci_dczhizhe_clear")) {
								return false;
							}
						}
					},
					cardRespondable(card, player) {
						var cards = [];
						if (card.cards) {
							cards.addArray(cards);
						}
						if (get.itemtype(card) == "card") {
							cards.push(card);
						}
						for (var cardx of cards) {
							if (cardx.hasGaintag("qmsgswkjsgj_shenci_dczhizhe_clear")) {
								return false;
							}
						}
					},
					cardSavable(card, player) {
						var cards = [];
						if (card.cards) {
							cards.addArray(cards);
						}
						if (get.itemtype(card) == "card") {
							cards.push(card);
						}
						for (var cardx of cards) {
							if (cardx.hasGaintag("qmsgswkjsgj_shenci_dczhizhe_clear")) {
								return false;
							}
						}
					},
				},
			},
		},
	},
	//神赐界杜预
	qmsgswkjsgj_shenci_spwuku: {
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
			player.addMark("spwuku", trigger.player==player?2:1);
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
	qmsgswkjsgj_shenci_spsanchen: {
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
			player.addSkills("qmsgswkjsgj_shenci_spmiewu");
		},
		ai: {
			combo: "qmsgswkjsgj_shenci_spwuku",
		},
		derivation: "qmsgswkjsgj_shenci_spmiewu",
	},
	qmsgswkjsgj_shenci_spmiewu: {
		audio: 'spmiewu',
		enable: ["chooseToUse", "chooseToRespond"],
		filter(event, player) {
			if (!player.countMark("spwuku") || !player.countCards("hse") ) {
				return false;
			}
			for (var i of lib.inpile) {
				var type = get.type2(i);
				if ((type == "basic" || type == "trick") && event.filterCard(get.autoViewAs({ name: i }, "unsure"), player, event)) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				for (var i = 0; i < lib.inpile.length; i++) {
					var name = lib.inpile[i];
					if (name == "sha") {
						if (event.filterCard(get.autoViewAs({ name }, "unsure"), player, event)) {
							list.push(["基本", "", "sha"]);
						}
						for (var nature of lib.inpile_nature) {
							if (event.filterCard(get.autoViewAs({ name, nature }, "unsure"), player, event)) {
								list.push(["基本", "", "sha", nature]);
							}
						}
					} else if (get.type2(name) == "trick" && event.filterCard(get.autoViewAs({ name }, "unsure"), player, event)) {
						list.push(["锦囊", "", name]);
					} else if (get.type(name) == "basic" && event.filterCard(get.autoViewAs({ name }, "unsure"), player, event)) {
						list.push(["基本", "", name]);
					}
				}
				return ui.create.dialog("灭吴", [list, "vcard"]);
			},
			check(button) {
				if (_status.event.getParent().type != "phase") {
					return 1;
				}
				var player = _status.event.player;
				if (["wugu", "zhulu_card", "yiyi", "lulitongxin", "lianjunshengyan", "diaohulishan"].includes(button.link[2])) {
					return 0;
				}
				return player.getUseValue({
					name: button.link[2],
					nature: button.link[3],
				});
			},
			backup(links, player) {
				return {
					filterCard: true,
					audio: "qmsgswkjsgj_shenci_spmiewu",
					popname: true,
					check(card) {
						return 8 - get.value(card);
					},
					position: "hse",
					viewAs: { name: links[0][2], nature: links[0][3] },
					precontent() {
						// player.addTempSkill("spmiewu2");
						player.removeMark("spwuku", 1);
					},
				};
			},
			prompt(links, player) {
				return "将一张牌当做" + (get.translation(links[0][3]) || "") + get.translation(links[0][2]) + "使用";
			},
		},
		hiddenCard(player, name) {
			if (!lib.inpile.includes(name)) {
				return false;
			}
			var type = get.type2(name);
			return (type == "basic" || type == "trick") && player.countMark("spwuku") > 0 && player.countCards("she") > 0 && !player.hasSkill("spmiewu2");
		},
		ai: {
			combo: "spwuku",
			fireAttack: true,
			respondSha: true,
			respondShan: true,
			skillTagFilter(player) {
				if (!player.countMark("spwuku") || !player.countCards("hse") || player.hasSkill("spmiewu2")) {
					return false;
				}
			},
			order: 1,
			result: {
				player(player) {
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					return 1;
				},
			},
		},
		group:'qmsgswkjsgj_shenci_spmiewu2',
	},
	qmsgswkjsgj_shenci_spmiewu2: {
		trigger: { player: ["useCardAfter", "respondAfter"] },
		forced: true,
		charlotte: true,
		popup: false,
		sourceSkill: "qmsgswkjsgj_shenci_spmiewu",
		filter(event, player) {
			return event.skill == "qmsgswkjsgj_shenci_spmiewu_backup";
		},
		content() {
			player.draw();
		},
	},

	//神赐武陆逊
	qmsgswkjsgj_shenci_dcxiongmu: {
		audio: 'dcxiongmu',
		trigger: { global: "roundStart" },
		group: ["qmsgswkjsgj_shenci_dcxiongmu_minus",'qmsgswkjsgj_shenci_dcxiongmu_tag'],
		prompt2(event, player) {
			return  "摸" + get.cnNumber(player.maxHp) + "张牌，然后" + "将任意张牌随机置入牌堆并从牌堆或弃牌堆中获得等量点数为8的牌。";
		},
		async content(event, trigger, player) {
			await player.draw(player.maxHp);
			var cards = player.getCards("he");
			if (!cards.length) {
				return;
			}
			var result;
			let selectedCards = null;
			let selectedCount = 0;
			if (cards.length == 1) {
				result = { bool: true, cards: cards };
			} else {
				result = await player
					.chooseCard("雄幕：将任意张牌置入牌堆的随机位置", "he", [1, Infinity], true, "allowChooseAll")
					.set("ai", card => {
						return 6 - get.value(card);
					})
					.forResult();
			}
			if (result.bool) {
				selectedCards = result.cards;
				selectedCount = selectedCards.length;
				game.log(player, `将${get.cnNumber(selectedCount)}张牌置入了牌堆`);
				var next = player.loseToDiscardpile(selectedCards, ui.cardPile, "blank").set("log", false);
				next.insert_index = function () {
					return ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)];
				};
				await next;
			} else {
				return;
			}
			var list = [],
				shown = [];
			var piles = ["cardPile", "discardPile"];
			for (var pile of piles) {
				for (var i = 0; i < ui[pile].childNodes.length; i++) {
					var card = ui[pile].childNodes[i];
					var number = get.number(card, false);
					if (!list.includes(card) && number == 8) {
						list.push(card);
						if (pile == "discardPile") {
							shown.push(card);
						}
						if (list.length >= selectedCount) {
							break;
						}
					}
				}
				if (list.length >= selectedCount) {
					break;
				}
			}
			if (list.length) {
				var next = player.gain(list);
				next.shown_cards = shown;
				next.set("animate", function (event) {
					var player = event.player,
						cards = event.cards,
						shown = event.shown_cards;
					if (shown.length < cards.length) {
						var num = cards.length - shown.length;
						player.$draw(num);
						game.log(player, "从牌堆获得了", get.cnNumber(num), "张点数为8的牌");
					}
					if (shown.length > 0) {
						player.$gain2(shown, false);
						game.log(player, "从弃牌堆获得了", shown);
					}
					return 500;
				});
				next.gaintag.add("qmsgswkjsgj_shenci_dcxiongmu_tag");
				await next;
				// player.addTempSkill("qmsgswkjsgj_shenci_dcxiongmu_tag", "roundStart");
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (target.countCards("h") > target.getHp() || player.hasSkillTag("jueqing", false, target)) {
						return;
					}
					if (player._dcxiongmu_temp) {
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
								return "zeroplayertarget";
							}
							if (get.attitude(player, target) < 0 && !player.hasSkillTag("damageBonus")) {
								if (card.name == "sha") {
									return;
								}
								var sha = false;
								player._dcxiongmu_temp = true;
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
								delete player._dcxiongmu_temp;
								if (player.hasSkillTag("damage")) {
									num++;
								}
								if (num < 2) {
									var enemies = player.getEnemies();
									if (enemies.length == 1 && enemies[0] == target && player.needsToDiscard()) {
										return;
									}
									return "zeroplayertarget";
								}
							}
						}
					}
				},
			},
		},
		subSkill: {
			minus: {
				audio: "dcxiongmu",
				trigger: { player: "damageBegin4" },
				filter(event, player) {
					return (
						// player.countCards("h") <= player.getHp() &&
						game
							.getGlobalHistory(
								"everything",
								evt => {
									return evt.name == "damage" && evt.player == player;
								},
								event
							)
							.indexOf(event) == 0
					);
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					trigger.cancel();
				},
			},
			tag: {
				charlotte: true,
				// onremove(player) {
				// 	player.removeGaintag("dcxiongmu_tag");
				// },
				mod: {
					ignoredHandcard(card, player) {
						if(card.number==8){
							return true;
						}
					},
					cardDiscardable(card, player, name) {
						if (name == "phaseDiscard" && card.number==8) {
							return false;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_shenci_dczhangcai: {
		audio: 'dczhangcai',
		mod: {
			aiOrder: (player, card, num) => {
				if (num > 0 && get.tag(card, "draw") && ui.cardPile.childNodes.length + ui.discardPile.childNodes.length < 20) {
					return 0;
				}
			},
			aiValue: (player, card, num) => {
				if (num > 0 && card.name === "zhuge") {
					return 20;
				}
			},
			aiUseful: (player, card, num) => {
				if (num > 0 && card.name === "zhuge") {
					return 10;
				}
			},
		},
		trigger: {
			player:'loseEnd',
			global:'loseAsyncAfter',
		},
		filter(event, player) {
			var evt = event.getl(player)
			if (player.hasSkill("qmsgswkjsgj_shenci_dczhangcai_all")) {
				return true;
			}
			return evt.cards.some(card => get.number(card) == 8);
		},
		locked: false,
		cost(){
			'step 0'
			var evt = trigger.getl(player)
			var cards = player.hasSkill("qmsgswkjsgj_shenci_dczhangcai_all")?evt.cards:evt.cards.filter(card => get.number(card) == 8);
			player.chooseCardButton(cards,[1,Infinity],get.prompt2('qmsgswkjsgj_shenci_dczhangcai')).set('ai',function(button){
				var list = ui.selected.buttons;
				var num = 0;
				if(list.length){
					for(var i=0;i<list.length;i++){
						num+=get.ZC_playerCards(player,get.number(list[i].link));
					}
				}
				if(num<=ui.cardPile.childNodes.length + ui.discardPile.childNodes.length ){
					if(num+get.number(button.link)>ui.cardPile.childNodes.length + ui.discardPile.childNodes.length)return false;
					return true;
				}
				else return false;
			}).set('complex',true);
			'step 1'
			if(result.bool){
				event.result = {
					bool:true,
					cost_data:result.links,
				}
			}
		},
		content() {
			var num = 0;
			event.cost_data.forEach(card=>num+=get.ZC_playerCards(player,get.number(card)));
			player.draw(num, "nodelay");
		},
		ai: {
			threaten: 4,
			combo: "qmsgswkjsgj_shenci_dcxiongmu",
		},
		subSkill: {
			all: {
				charlotte: true,
				mark: true,
				intro: {
					content: "当失去一张牌时，你可以摸X张牌（X为你手牌中与此牌点数相同的牌数且至少为1）",
				},
			},
		},
	},
	qmsgswkjsgj_shenci_dcruxian: {
		audio: 'dcruxian',
		enable: "phaseUse",
		limited: true,
		skillAnimation: true,
		animationColor: "wood",
		content() {
			"step 0";
			player.awakenSkill(event.name);
			player.when({player:"phaseBegin"}).filter(function(event,player){
				return true
			}).then(function(){
				if(player.hasSkill("qmsgswkjsgj_shenci_dczhangcai_all")){
					player.when({player:'phaseEnd'}).filter(function(event,player){
						return true;
					}).then(function(){
						if(player.hasSkill("qmsgswkjsgj_shenci_dczhangcai_all")){
							player.removeSkill("qmsgswkjsgj_shenci_dczhangcai_all");
						}
					})

				}
			})
			player.addSkill("qmsgswkjsgj_shenci_dczhangcai_all");
		},
		ai: {
			combo: "qmsgswkjsgj_shenci_dczhangcai",
			order: 15,
			result: {
				player(player) {
					if (!player.hasSkill("qmsgswkjsgj_shenci_dczhangcai")) {
						return 0;
					}
					if (player.countCards("hs", card => get.number(card) != 8 && player.hasValueTarget(card)) > 3 || player.hp == 1) {
						return 5;
					}
					return 0;
				},
			},
		},
	},

	//神赐谋曹丕
	qmsgswkjsgj_shenci_sbxingshang: {
		// getLimit: 9,
		getList: [
			{
				cost: 1,
				prompt: () => "令一名角色复原武将牌",
				filter: () => game.hasPlayer(target => target.isLinked() || target.isTurnedOver()),
				filterTarget: (card, player, target) => target.isLinked() || target.isTurnedOver(),
				async content(player, target) {
					if (target.isLinked()) {
						await target.link(false);
					}
					if (target.isTurnedOver()) {
						await target.turnOver(false);
					}
				},
				ai: {
					result: {
						target(player, target) {
							let res = 0;
							if (target.isLinked()) {
								res = 0.3;
							}
							if (target.isTurnedOver()) {
								res += 3.5 * get.threaten(target, player);
							}
							return res;
						},
					},
				},
			},
			{
				cost: 2,
				prompt: () => "令一名角色摸X张牌（X为本场已死亡角色数，至少为3）",
				filter: () => true,
				filterTarget: true,
				async content(player, target) {
					var num = Math.max(game.dead.length,3)
					await target.draw(num);
				},
				ai: {
					result: {
						player(player, target) {
							return get.effect(target, { name: "draw" }, player, player) * 3;
						},
					},
				},
			},
			{
				cost: 3,
				prompt: () => "令一名角色增加1点体力上限，回复1点体力，随机恢复一个已废除的装备栏（体力上限不大于12方可选择）",
				filter: () => true,
				filterTarget: (card, player, target) => {
					return target.maxHp < 12;
				},
				async content(player, target) {
					// var num = game.dead.length;
					await target.gainMaxHp(1);
					await target.recover(1);
					let list = Array.from({ length: 13 }).map((_, i) => "equip" + parseFloat(i + 1));
					list = list.filter(i => target.hasDisabledSlot(i));
					if (list.length) {
						await target.enableEquip(list.randomGet());
					}
				},
				ai: {
					result: {
						target(player, target) {
							let res = 0.2;
							if (target.isHealthy()) {
								res += 0.4;
							}
							if (
								Array.from({ length: 5 })
									.map((_, i) => "equip" + parseFloat(i + 1))
									.some(i => target.hasDisabledSlot(i))
							) {
								res += 0.3;
							}
							return res + get.recoverEffect(target, target, target) / 16;
						},
					},
				},
			},
			{
				cost: 4,
				prompt: () => "获得一名已阵亡角色的武将牌上的所有技能，然后失去〖行殇〗",
				filter: () => game.dead.some(target => target.getStockSkills(true, true).some(i => get.info(i) && !get.info(i).charlotte)),
				filterTarget(card, player, target) {
					if (!target.isDead()) {
						return false;
					}
					return target.getStockSkills(true, true).some(i => get.info(i) && !get.info(i).charlotte);
				},
				deadTarget: true,
				async content(player, target) {
					await player.changeSkills(
						target.getStockSkills(true, true).filter(skill => get.info(skill) && !get.info(skill).charlotte),
						["qmsgswkjsgj_shenci_sbxingshang"]
					);
				},
				ai: {
					result: {
						player(player, target) {
							return ["name", "name1", "name2"].reduce((sum, name) => {
								if (!target[name] || !lib.character[target[name]] || (name == "name1" && target.name1 == target.name)) {
									return sum;
								}
								return sum + get.rank(target[name], true);
							}, 0);
						},
					},
				},
			},
		],
		marktext: "颂",
		intro: {
			name: "颂",
			content: "mark",
		},
		audio: 'sbxingshang',
		enable: "phaseUse",
		filter(event, player) {
			return get.info("qmsgswkjsgj_shenci_sbxingshang").getList.some(effect => {
				return player.countMark("qmsgswkjsgj_shenci_sbxingshang") >= effect.cost && effect.filter(player);
			});
		},
		usable: 2,
		chooseButton: {
			dialog() {
				let dialog = ui.create.dialog("行殇：请选择一项", "hidden");
				const list = get.info("qmsgswkjsgj_shenci_sbxingshang").getList.slice();
				dialog.add([
					list.map(effect => {
						return [effect, "移去" + effect.cost + "个“颂”标记，" + effect.prompt()];
					}),
					"textbutton",
				]);
				return dialog;
			},
			filter(button, player) {
				const effect = button.link;
				return player.countMark("qmsgswkjsgj_shenci_sbxingshang") >= effect.cost && effect.filter(player);
			},
			check(button) {
				const player = get.event().player,
					effect = button.link;
				return Math.max(
					...game
						.filterPlayer(target => {
							const filterTarget = effect.filterTarget;
							if (!filterTarget) {
								return target == player;
							}
							if (typeof filterTarget == "function") {
								return filterTarget(null, player, target);
							}
							return true;
						})
						.map(target => {
							game.broadcastAll(effect => (lib.skill["qmsgswkjsgj_shenci_sbxingshang_aiSkill"].ai = effect.ai), effect);
							return get.effect(target, "qmsgswkjsgj_shenci_sbxingshang_aiSkill", player, player);
						})
				);
			},
			backup(links, player) {
				const effect = links[0];
				return {
					effect: effect,
					audio: "qmsgswkjsgj_shenci_sbxingshang",
					filterCard: () => false,
					selectCard: -1,
					filterTarget: effect.filterTarget,
					deadTarget: effect.deadTarget,
					async content(event, trigger, player) {
						const target = event.targets[0],
							effect = lib.skill.qmsgswkjsgj_shenci_sbxingshang_backup.effect;
						player.removeMark("qmsgswkjsgj_shenci_sbxingshang", effect.cost);
						await effect.content(player, target);
					},
					ai: effect.ai,
				};
			},
			prompt(links, player) {
				const effect = links[0],
					str = "###行殇###";
				return str + '<div class="text center">' + "移去" + effect.cost + "个“颂”标记，" + effect.prompt() + "</div>";
			},
		},
		ai: {
			order: 6.5,
			result: {
				player(player) {
					const list = get.info("qmsgswkjsgj_shenci_sbxingshang").getList.filter(effect => {
						return player.countMark("qmsgswkjsgj_shenci_sbxingshang") >= effect.cost && effect.filter(player);
					});
					return Math.max(
						...list.map(effect => {
							return Math.max(
								...game
									.filterPlayer(target => {
										const filterTarget = effect.filterTarget;
										if (!filterTarget) {
											return target == player;
										}
										if (typeof filterTarget == "function") {
											return filterTarget(null, player, target);
										}
										return true;
									})
									.map(target => {
										game.broadcastAll(effect => (lib.skill["qmsgswkjsgj_shenci_sbxingshang_aiSkill"].ai = effect.ai), effect);
										return get.effect(target, "qmsgswkjsgj_shenci_sbxingshang_aiSkill", player, player);
									})
							);
						})
					);
				},
			},
		},
		group: "qmsgswkjsgj_shenci_sbxingshang_gain",
		subSkill: {
			aiSkill: {},
			backup: {},
			gain: {
				audio: "qmsgswkjsgj_shenci_sbxingshang",
				trigger: { global: ["die", "damageEnd"] },
				filter(event, player) {
					return true;
					// if (player.countMark("sbxingshang") >= get.info("sbxingshang").getLimit) {
					// 	return false;
					// }
					// return event.name == "die" || !player.getHistory("custom", evt => evt.sbxingshang).length;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					player.addMark("qmsgswkjsgj_shenci_sbxingshang", 2);
					// if (trigger.name == "damage") {
					// 	player.getHistory("custom").push({ qmsgswkjsgj_shenci_sbxingshang: true });
					// }
				},
			},
		},
	},
	qmsgswkjsgj_shenci_sbfangzhu: {
		getList: [
			{
				cost: 1,
				prompt: () => "令一名其他角色于手牌中只能使用一种类型牌直到其回合结束",
				filter: player => game.hasPlayer(target => target != player && !target.getStorage("qmsgswkjsgj_shenci_sbfangzhu_ban").includes("basic")),
				filterTarget: (card, player, target) => target != player && !target.getStorage("qmsgswkjsgj_shenci_sbfangzhu_ban").includes("basic"),
				async content(player, target) {
					
					var type=[];
					for(var i of lib.inpile){
						if(get.type2(i)&&!type.includes(get.type2(i))){
							type.push(get.type2(i));
						}
					}
					// type.push('cancel2')
					var relu = await player.chooseControl(type).set('prompt','选择一个类型').forResult();
					if(relu!='cancel2'){
						target.addTempSkill("qmsgswkjsgj_shenci_sbfangzhu_ban", { player: "phaseEnd" });
						target.markAuto("qmsgswkjsgj_shenci_sbfangzhu_ban", [relu.control]);
						lib.skill.qmsgswkjsgj_shenci_sbfangzhu_ban.init(target, "qmsgswkjsgj_shenci_sbfangzhu_ban");
					}
				},
				ai: {
					result: {
						target(player, target) {
							return -(target.countCards("hs") + 2) / 3;
						},
					},
				},
			},
			{
				cost: 2,
				prompt: () => "令一名其他角色的非Charlotte技能失效直到其回合结束",
				filter: player => /*get.mode() != "doudizhu" && */game.hasPlayer(target => target != player),
				filterTarget: lib.filter.notMe,
				async content(player, target) {
					target.addTempSkill("qmsgswkjsgj_shenci_sbfangzhu_baiban", { player: "phaseEnd" });
				},
				ai: {
					result: {
						target(player, target) {
							return -target.getSkills(null, false).filter(i => get.info(i) && !get.info(i).charlotte).length * get.threaten(target, player);
						},
					},
				},
			},
			{
				cost: 2,
				prompt: () => "令一名其他角色不能响应另一名角色使用的牌直到其回合结束",
				filter(player) {
					return game.hasPlayer(target => {
						if (target !== player) {
							return game.hasPlayer(current => {
								if (current !== target) {
									return !current.getStorage("sbfangzhu_kill").includes(target);
								}
								return false;
							});
						}
						return false;
					});
				},
				filterTarget: {
					filterTarget(card, player, target) {
						return ui.selected.targets.length > 0 || target !== player;
					},
					selectTarget: 2,
					targetprompt: ["被响应", "响应源"],
					multitarget: true,
				},
				async content(player, target, source) {
					source.addTempSkill("qmsgswkjsgj_shenci_sbfangzhu_kill", { player: "phaseEnd" });
					source.markAuto("qmsgswkjsgj_shenci_sbfangzhu_kill", [target]);
				},
			},
			{
				cost: 3,
				prompt: () => "令一名其他角色将武将牌翻面",
				filter: player => /*get.mode() != "doudizhu" && */game.hasPlayer(target => target != player),
				filterTarget: lib.filter.notMe,
				async content(player, target) {
					await target.turnOver();
				},
				ai: {
					result: {
						target(player, target) {
							return target.isTurnedOver() ? 3.5 : -3.5;
						},
					},
				},
			},
		],
		audio: 'sbfangzhu',
		enable: "phaseUse",
		filter(event, player) {
			// if(!player.hasSkill('qmsgswkjsgj_shenci_sbxingshang'))return false;
			return get.info("qmsgswkjsgj_shenci_sbfangzhu").getList.some(effect => {
				return player.countMark("qmsgswkjsgj_shenci_sbxingshang") >= effect.cost && effect.filter(player);
			});
		},
		usable: 2,
		chooseButton: {
			dialog() {
				let dialog = ui.create.dialog("放逐：请选择一项", "hidden");
				const list = get.info("qmsgswkjsgj_shenci_sbfangzhu").getList.slice();
				dialog.add([
					list.map(effect => {
						return [effect, "移去" + effect.cost + "个“颂”标记，" + effect.prompt()];
					}),
					"textbutton",
				]);
				return dialog;
			},
			filter(button, player) {
				const effect = button.link;
				return player.countMark("qmsgswkjsgj_shenci_sbxingshang") >= effect.cost && effect.filter(player);
			},
			check(button) {
				const player = get.event().player,
					effect = button.link;
				return Math.max(
					...game
						.filterPlayer(target => {
							const filterTarget = effect.filterTarget;
							if (!filterTarget) {
								return target == player;
							}
							if (typeof filterTarget == "function") {
								return filterTarget(null, player, target);
							}
							return true;
						})
						.map(target => {
							game.broadcastAll(effect => (lib.skill["qmsgswkjsgj_shenci_sbxingshang_aiSkill"].ai = effect.ai), effect);
							return get.effect(target, "qmsgswkjsgj_shenci_sbxingshang_aiSkill", player, player);
						})
				);
			},
			backup(links, player) {
				const effect = links[0];
				return {
					effect: effect,
					audio: "qmsgswkjsgj_shenci_sbfangzhu",
					audioname: ["mb_caomao"],
					filterCard: () => false,
					selectCard: -1,
					filterTarget: effect.filterTarget,
					async content(event, trigger, player) {
						const target = event.targets[0],
							effect = lib.skill.qmsgswkjsgj_shenci_sbfangzhu_backup.effect;
						player.removeMark("qmsgswkjsgj_shenci_sbxingshang", effect.cost);
						await effect.content(player, target);
					},
					ai: effect.ai,
				};
			},
			prompt(links, player) {
				const effect = links[0],
					str = "###放逐###";
				return str + '<div class="text center">' + "移去" + effect.cost + "个“颂”标记，" + effect.prompt() + "</div>";
			},
		},
		ai: {
			combo: "qmsgswkjsgj_shenci_sbxingshang",
			order: 7,
			result: {
				player(player) {
					const list = get.info("qmsgswkjsgj_shenci_sbfangzhu").getList.filter(effect => {
						return player.countMark("qmsgswkjsgj_shenci_sbxingshang") >= effect.cost && effect.filter(player);
					});
					return Math.max(
						...list.map(effect => {
							return Math.max(
								...game
									.filterPlayer(target => {
										const filterTarget = effect.filterTarget;
										if (!filterTarget) {
											return target == player;
										}
										if (typeof filterTarget == "function") {
											return filterTarget(null, player, target);
										}
										return true;
									})
									.map(target => {
										game.broadcastAll(effect => (lib.skill["qmsgswkjsgj_shenci_sbxingshang_aiSkill"].ai = effect.ai), effect);
										return get.effect(target, "qmsgswkjsgj_shenci_sbxingshang_aiSkill", player, player);
									})
							);
						})
					);
				},
			},
		},
		subSkill: {
			backup: {},
			baiban: {
				init(player, skill) {
					player.addSkillBlocker(skill);
					player.addTip(skill, "放逐 技能失效");
				},
				onremove(player, skill) {
					player.removeSkillBlocker(skill);
					player.removeTip(skill);
				},
				inherit: "baiban",
				marktext: "逐",
			},
			kill: {
				charlotte: true,
				mark: true,
				marktext: "禁",
				intro: { content: "不能响应其他角色使用的牌" },
				trigger: { global: "useCard1" },
				filter(event, player) {
					return event.player != player;
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					trigger.directHit.add(player);
				},
				init(player, skill) {
					player.addTip(skill, "放逐 无法响应");
				},
				onremove(player, skill) {
					player.removeTip(skill);
				},
			},
			ban: {
				charlotte: true,
				mark: true,
				marktext: "禁",
				intro: {
					markcount: () => 0,
					content(storage) {
						if (storage.length > 1) {
							return "不能使用手牌";
						}
						return "于手牌中只能使用" + get.translation(storage[0]) + "牌";
					},
				},
				init(player, skill) {
					let storage = player.getStorage(skill);
					if (storage.length) {
						player.addTip(skill, "放逐 限" + (storage.length === 1 ? get.translation(storage[0])[0] : "手牌"));
					}
				},
				onremove(player, skill) {
					player.removeTip(skill);
					delete player.storage[skill];
				},
				mod: {
					cardEnabled(card, player) {
						const storage = player.getStorage("qmsgswkjsgj_shenci_sbfangzhu_ban");
						const hs = player.getCards("h"),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && (storage.length > 1 || !storage.includes(get.type2(card)))) {
							return false;
						}
					},
					cardSavable(card, player) {
						const storage = player.getStorage("qmsgswkjsgj_shenci_sbfangzhu_ban");
						const hs = player.getCards("h"),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && (storage.length > 1 || !storage.includes(get.type2(card)))) {
							return false;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_shenci_sbsongwei: {
		audio: 'sbsongwei',
		trigger: { player: "phaseUseBegin" },
		filter(event, player) {
			// if(!player.hasSkill('qmsgswkjsgj_shenci_sbxingshang'))return false;
			// if (player.countMark("qmsgswkjsgj_shenci_sbxingshang") >= get.info("qmsgswkjsgj_shenci_sbxingshang").getLimit) {
			// 	return false;
			// }
			return game.hasPlayer(target => target.group == "wei" && target != player);
		},
		zhuSkill: true,
		forced: true,
		locked: false,
		async content(event, trigger, player) {
			player.addMark("qmsgswkjsgj_shenci_sbxingshang",2 * game.countPlayer(target => target.group == "wei" && target != player));
		},
		group: "qmsgswkjsgj_shenci_sbsongwei_delete",
		subSkill: {
			delete: {
				audio: "sbsongwei",
				enable: "phaseUse",
				filter(event, player) {
					if (player.hasSkill('qmsgswkjsgj_shenci_sbsongwei_xx')) {
						return false;
					}
					return game.hasPlayer(target => lib.skill.qmsgswkjsgj_shenci_sbsongwei.subSkill.delete.filterTarget(null, player, target));
				},
				filterTarget(card, player, target) {
					return target != player && target.group == "wei" && target.getStockSkills(false, true).length;
				},
				skillAnimation: true,
				animationColor: "thunder",
				async content(event, trigger, player) {
					// player.storage.sbsongwei_delete = true;
					// player.awakenSkill(event.name);
					player.YB_temp('qmsgswkjsgj_shenci_sbsongwei_xx');
					event.target.removeSkills(event.target.getStockSkills(false, true));
				},
				ai: {
					order: 13,
					result: {
						target(player, target) {
							return -target.getStockSkills(false, true).length;
						},
					},
				},
			},
		},
	},

	

	//神赐界孙寒华
	qmsgswkjsgj_shenci_chongxu:{
		audio: 'chongxu',
		enable: "phaseUse",
		usable: 1,
		
		async content(event, trigger, player) {
			let relu = await player.chooseToPlayBeatmap(lib.skill.yb016_shenzou.beatmaps.randomGet()).forResult();
			var score=Math.floor(Math.min(7,relu.accuracy/12));
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
							["qmsgswkjsgj_shenci_miaojian", '使用2积分升级【' + get.translation('qmsgswkjsgj_shenci_miaojian') + '】'],
							["qmsgswkjsgj_shenci_shhlianhua", '使用2积分升级【' + get.translation('qmsgswkjsgj_shenci_shhlianhua') + '】'],
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
							event.parent?.controls?.[0]?.classList.remove('disabled');
							game.check();
						},
					},
				});
				if (result?.bool && result.links?.length) {
					const qmsgswkjsgj_shenci_miaojian = result.links.filter(i => i === 'qmsgswkjsgj_shenci_miaojian').length;
					if (qmsgswkjsgj_shenci_miaojian > 0) {
						player.addMark("qmsgswkjsgj_shenci_miaojian", qmsgswkjsgj_shenci_miaojian, false);
						player.popup('qmsgswkjsgj_shenci_miaojian');
						if(!player.shhcisha){
							player.shhcisha = true;
							player.zb_10202.style.setProperty('--zb_10202-grayscale', '0%')
							// player.zb_10202.removeClass('huimu')
							player.say('进入“刺杀”形态')
							// player.useSkill('qmsgswkjsgj_shenci_miaojian_viewAs4')
							// player.logSkill('qmsgswkjsgj_shenci_miaojian')
							player.update()
						}
						game.log(player, '升级了技能', '#g【' + get.translation('qmsgswkjsgj_shenci_miaojian') + '】');
					}
					const qmsgswkjsgj_shenci_shhlianhua = result.links.filter(i => i === "qmsgswkjsgj_shenci_shhlianhua").length;
					if (qmsgswkjsgj_shenci_shhlianhua > 0) {
						player.addMark("qmsgswkjsgj_shenci_shhlianhua", qmsgswkjsgj_shenci_shhlianhua, false);
						player.popup('qmsgswkjsgj_shenci_shhlianhua');
						game.log(player, '升级了技能', '#g【' + get.translation('qmsgswkjsgj_shenci_shhlianhua') + '】');
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
	qmsgswkjsgj_shenci_miaojian:{
		audio: 'miaojian',
		enable: "phaseUse",
		usable: 1,
		mod:{
			cardUsable:function(card,player){
				var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
				if(level>=2){
					if(get.name(card)=='sha'&&get.natureList(card).includes('stab'))return Infinity; 
				}
			},
			targetInRange(card,player,target) {
				var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
				if(level<2){
					if (_status.event.skill == "qmsgswkjsgj_shenci_miaojian") {
						return true;
					}
				}
				else {
					// var natures = get.natureList(Array.isArray(card) ? card[3] : card);
					if(get.name(card)=='sha'&&get.natureList(card).includes('stab'))return true
				}
			},
			// cardnature(card,player){
			// 	var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
			// 	if(level>=2){
			// 		if(card.name=='sha')return 'stab'; 
			// 	}
			// },
		},
		viewAs:function(card,player){
			var next = {name:'sha',nature: "stab",storage:{qmsgswkjsgj_shenci_miaojian:true,}}
			var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
			next.isCard=true;
			return next;
		},
		filterCard:function(card,player){
			// var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
			// if(level==0)return get.type2(card) == "basic";
			return false;
		},
		selectCard:()=>{
			// var player= get.player();
			// var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
			// if(level==0)return 1;
			return -1;
		},
		precontent() {
			var player= player||get.player();
			var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
			if(level!=2){
				event.getParent().addCount = false;
			}
		},
		// check(card) {
		// 	if (card) {
		// 		return 6.5 - get.value(card);
		// 	}
		// 	return 1;
		// },
		position: "hes",
		group:['qmsgswkjsgj_shenci_miaojian_viewAs3'],
		derivation: ["qmsgswkjsgj_shenci_miaojian1", "qmsgswkjsgj_shenci_miaojian2"],
		subSkill: { 
			backup: { audio: "qmsgswkjsgj_shenci_miaojian" },
			viewAs:{
				audio: "qmsgswkjsgj_shenci_miaojian",
				filter(event,player){
					var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
					if(level<1)return false;
					return event.card.name=='sha'&&!event.card.hasNature('stab');
				},
				trigger:{
					player: "useCard1"
				},
				check(event, player) {
					let eff = 0,
						nature = event.card.nature;
					for (let i = 0; i < event.targets.length; i++) {
						eff -= get.effect(event.targets[i], event.card, player, player);
						event.card.nature = "stab";
						eff += get.effect(event.targets[i], event.card, player, player);
						event.card.nature = nature;
					}
					return eff > 0;
				},
				prompt2(event, player) {
					return "将" + get.translation(event.card) + "改为刺属性";
				},
				content() {
					game.setNature(trigger.card, "stab");
					if (get.itemtype(trigger.card) == "card") {
						var next = game.createEvent("qmsgswkjsgj_shenci_miaojian_viewAs");
						next.card = trigger.card;
						event.next.remove(next);
						trigger.after.push(next);
						next.setContent(function () {
							game.setNature(trigger.card, []);
						});
					}
				},

			}, 
			viewAs2:{
				audio: "qmsgswkjsgj_shenci_miaojian",
				filter(event,player){
					var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
					if(level<1)return false;
					return true;
					// return event.card.name=='sha'&&!event.card.hasNature('stab');
				},
				enable: ["chooseToUse"],
				filterCard(card, player) {
					return get.name(card) == "sha";
				},
				position: "hes",
				viewAs: {
					name: "sha",
					nature: "stab",
				},
				viewAsFilter(player) {
					if (!player.countCards("hes", { name: "sha" })) {
						return false;
					}
				},
				prompt: "将一张杀当刺杀使用",
				check(card) {
					var val = get.value(card);
					if (_status.event.name == "chooseToRespond") {
						return 1 / Math.max(0.1, val);
					}
					return 5 - val;
				},
				// trigger:{
				// 	player: "useCard1"
				// },
				// check(event, player) {
				// 	let eff = 0,
				// 		nature = event.card.nature;
				// 	for (let i = 0; i < event.targets.length; i++) {
				// 		eff -= get.effect(event.targets[i], event.card, player, player);
				// 		event.card.nature = "stab";
				// 		eff += get.effect(event.targets[i], event.card, player, player);
				// 		event.card.nature = nature;
				// 	}
				// 	return eff > 0;
				// },
				// prompt2(event, player) {
				// 	return "将" + get.translation(event.card) + "改为刺属性";
				// },
				// content() {
				// 	game.setNature(trigger.card, "stab");
				// 	if (get.itemtype(trigger.card) == "card") {
				// 		var next = game.createEvent("qmsgswkjsgj_shenci_miaojian_viewAs");
				// 		next.card = trigger.card;
				// 		event.next.remove(next);
				// 		trigger.after.push(next);
				// 		next.setContent(function () {
				// 			game.setNature(trigger.card, []);
				// 		});
				// 	}
				// },

			}, 
			viewAs3:{
				name:'刺杀',
				init(player){
					var next = ui.create.div('.zb_10202',player);
    				next.style.setProperty('--zb_10202-grayscale', '100%');
					next.addEventListener('click',function(){
						var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
						if(game.me==player){
							if(level<1){
								player.say('妙剑至少升级一次才能点击')
							}
							else{
								if(!player.shhcisha){
									player.shhcisha = true;
									player.zb_10202.style.setProperty('--zb_10202-grayscale', '0%')
									player.say('进入“刺杀”形态')
									player.update()
									game.check()
								}
								else {
									player.shhcisha = false;
									player.zb_10202.style.setProperty('--zb_10202-grayscale', '100%')
									player.say('退出“刺杀”形态')
									player.update()
									game.check()
								}
							}
						}
						else{
							player.say('是你的妙剑吗就瞎几把点？')
						}
					})
					player.zb_10202=next;

				},
				onremove(player){
					if(player.zb_10202)delete player.zb_10202;
					if(player.shhcisha)delete player.shhcisha;
				},
				enable:['chooseToUse','chooseToRespond','chooseCard'],
				filter(event,player){
					var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
					if(level<1){
						// player.say('妙剑至少升级一次才能点击')
						return false;
					}
					else return true;

				},
				popup:false,
				content(){
					var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
					if(level<1){
						player.say('妙剑至少升级一次才能点击')
					}
					else{
						if(!player.shhcisha){
							player.shhcisha = true;
							player.zb_10202.style.setProperty('--zb_10202-grayscale', '0%')
							player.say('进入“刺杀”形态')
							player.update()
							game.check()
						}
						else {
							player.shhcisha = false;
							player.zb_10202.style.setProperty('--zb_10202-grayscale', '100%')
							player.say('退出“刺杀”形态')
							player.update()
							game.check()
						}
					}
				},
				mod:{
					cardnature(card,player){
						var level = player.countMark("qmsgswkjsgj_shenci_miaojian");
						if(level>=2){
							if(player.shhcisha){
								if(get.name(card)=='sha')return 'stab'; 
							}
						}
					},

				},
			},
			viewAs4:{
				content(){

				},
			},
		},
		ai: {
			order: 7,
			result: { player: 1 },
		},
	},
	qmsgswkjsgj_shenci_shhlianhua:{
		audio: "shhlianhua",
		derivation: ["qmsgswkjsgj_shenci_shhlianhua1", "qmsgswkjsgj_shenci_shhlianhua2"],
		trigger: { target: "useCardToTargeted" },
		// forced: true,
		// locked: false,
		// filter: event => event.card.name == "sha",
		filter:function(event,player){
			var level = player.countMark("qmsgswkjsgj_shenci_shhlianhua");
			if(level<2)return event.card.name == "sha";
			return event.player!=player
		},
		cost(){
			var eff = get.effect(player, trigger.card, trigger.player, trigger.player);
			var level = player.countMark("qmsgswkjsgj_shenci_shhlianhua");
			if(level<2){
				event.result = {bool:true}
			}
			else {
				event.result = player.chooseBool(get.prompt2("qmsgswkjsgj_shenci_shhlianhua")).set('ai',function(){
					var num = _status.event.eff;
					return num<0;
				}).set('eff',eff).forResult();
			}
		},
		content() {
			"step 0";
			player.draw();
			var level = player.countMark("qmsgswkjsgj_shenci_shhlianhua");
			event.level = level;
			// if(level==0){
			// 	event.goto(3);
			// }
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
					if(event.level==2)return get.suit(result) != "heart" ? 1 : -1;
					else if(event.level==1)return get.color(result) == "black" ? 1 : -1;
					else return get.suit(result) == "spade" ? 1 : -1;
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

	//周宣
	qmsgswkjsgj_shenci_dcwumei: {
		audio: 'dcwumei',
		round: 1,
		trigger: { player: "phaseBeforeEnd" },
		filter(event, player) {
			if (event.finished) {
				return false;
			}
			return !player.isTurnedOver() || event._noTurnOver; //笑点解析：回合开始前，但是翻面不能发动
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill))
				.set("ai", target => get.attitude(get.player(), target))
				.forResult();
		},
		onRound(event) {
			return !event.wumei_phase;
		},
		async content(event, trigger, player) {
			const [target] = event.targets;
			const next = target.insertPhase();
			target.addSkill("qmsgswkjsgj_shenci_dcwumei_wake");
			target.storage["qmsgswkjsgj_shenci_dcwumei_wake"][2].add(next);
			if (!trigger._finished) {
				trigger.finish();
				trigger._finished = true;
				trigger.untrigger(true);
				trigger._triggered = 5;
				if (!lib.onround.includes(lib.skill.qmsgswkjsgj_shenci_dcwumei.onRound)) {
					lib.onround.push(lib.skill.qmsgswkjsgj_shenci_dcwumei.onRound);
				}
				const evt = player.insertPhase();
				evt.wumei_phase = true;
				evt.phaseList = trigger.phaseList;
				evt.relatedEvent = trigger.relatedEvent || trigger.getParent(2);
				evt.skill = trigger.skill;
				evt._noTurnOver = true;
				evt.set("phaseList", trigger.phaseList);
				evt.pushHandler("qmsgswkjsgj_shenci_dcwumei_phase", (event, option) => {
					if (event.step === 0 && option.state === "begin") {
						event.step = 4;
						_status.globalHistory.push({
							cardMove: [],
							custom: [],
							useCard: [],
							changeHp: [],
							everything: [],
						});
						var players = game.players.slice(0).concat(game.dead);
						for (var i = 0; i < players.length; i++) {
							var current = players[i];
							current.actionHistory.push({
								useCard: [],
								respond: [],
								skipped: [],
								lose: [],
								gain: [],
								sourceDamage: [],
								damage: [],
								custom: [],
								useSkill: [],
							});
							current.stat.push({ card: {}, skill: {} });
						}
					}
				});
			}
			const nexts = trigger.getParent()?.next;
			if (nexts?.length) {
				for (let evt of nexts.slice(0)) {
					if (evt.finished) {
						continue;
					}
					if (evt == next) {
						break;
					}
					nexts.remove(evt);
					nexts.push(evt);
				}
			}
		},
		subSkill: {
			wake: {
				init(player, skill) {
					if (!player.storage[skill]) {
						player.storage[skill] = [[], [], []];
					}
				},
				charlotte: true,
				onremove: true,
				trigger: {
					player: ["phaseBegin", "phaseEnd"],
					source: 'damageBegin2'
				},
				filter(event, player) {
					if(event.name=='damage')return true;
					return player.storage["qmsgswkjsgj_shenci_dcwumei_wake"][2].includes(event);
				},
				// forced: true,
				locked: true,
				cost(){
					if(event.triggername=='damageBegin2'){
						event.result = player.chooseBool('是否令即将对'+get.translation(trigger.player)+'造成的伤害+1？<br>作者临时打了补丁，这个加伤加了可以。').set('ai',function(){
							var att = get.attitude(player,trigger.player);
							if(att<0)return true;
							else return false;
						}).forResult();
					}
					else {
						event.result = {bool:true}
					}
				},
				popup: false,
				async content(event, trigger, player) {
					const name = event.triggername;
					if(name=='damageBegin2'){
						trigger.num++;
					}
					else if (name === "phaseBegin") {
						for (const playerx of game.filterPlayer()) {
							player.storage[event.name][0].push(playerx);
							player.storage[event.name][1].push(playerx.hp);
						}
						player.markSkill(event.name);
					} else {
						const storage = player.getStorage(event.name);
						if (storage.length) {
							for (let i = 0; i < storage[0].length; i++) {
								const target = storage[0][i];
								if (target?.isIn?.()) {
									if (target.hp != storage[1][i]) {
										game.log(target, "将体力从", "#y" + target.hp, "改为", "#g" + storage[1][i]);
										const next = target.changeHp(storage[1][i] - target.hp);
										next._triggered = null;
										await next;
									}
								}
							}
						}
						player.storage[event.name][2].remove(trigger);
						player.storage[event.name][0] = player.storage[event.name][1] = [];
						player[player.storage[event.name][2].length ? "unmarkSkill" : "removeSkill"](event.name);
					}
				},
				marktext: "梦",
				intro: {
					markcount: (storage = [[]]) => storage[0].length,
					content(storage = [[]], player) {
						if (!storage.length) {
							return "无信息";
						}
						var str = "所有角色于回合开始时的体力值：<br>";
						for (var i = 0; i < storage[0].length; i++) {
							var str2 = get.translation(storage[0][i]) + "：" + storage[1][i];
							if (!storage[0][i].isIn()) {
								str2 = '<span style="opacity:0.5">' + str2 + "（已故）</span>";
							}
							str += "<li>" + str2;
						}
						return str;
					},
				},
				global: "qmsgswkjsgj_shenci_dcwumei_all",
			},
			all: {
				mod: {
					aiOrder(player, card, num) {
						if (num <= 0 || !game.hasPlayer(t => t.marks["qmsgswkjsgj_shenci_dcwumei_wake"])) {
							return;
						}
						if (get.tag(card, "recover") && !_status.event.dying && player.hp > 0) {
							return 0;
						}
						if (get.tag(card, "damage")) {
							if (
								card.name == "sha" &&
								game.hasPlayer(cur => {
									return cur.hp < 2 && player.canUse(card, cur, null, true) && get.effect(cur, card, player, player) > 0;
								})
							) {
								return num;
							}
							if (player.needsToDiscard()) {
								return num / 5;
							}
							return 0;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_shenci_dczhanmeng: {
		audio: 'dczhanmeng',
		trigger: { player: ["useCard",'respond'] },
		filter(event, player) {
			return (
				!player.hasStorage("qmsgswkjsgj_shenci_dczhanmeng_choice", 1) ||
				!player.hasStorage("qmsgswkjsgj_shenci_dczhanmeng_choice", 2) ||
				(!player.hasStorage("qmsgswkjsgj_shenci_dczhanmeng_choice", 0) &&
					!game.hasPlayer2(current => {
						const history = current.actionHistory;
						if (history.length < 2) {
							return false;
						}
						for (let i = history.length - 2; i >= 0; i--) {
							if (history[i].isSkipped) {
								continue;
							}
							const list = history[i].useCard.map(evt => evt.card.name);
							return list.includes(event.card.name);
						}
						return false;
					}, true))
			);
			// return true;
		},
		async cost(event, trigger, player) {
			let list = [],
				choiceList = ["上回合若没有同名牌被使用过，你获得一张非伤害牌", "下回合当同名牌被使用后，你获得一张伤害牌", "弃置一名其他角色两张牌，对其造成1点火焰伤害"];
			let used = game.hasPlayer2(current => {
				let history = current.actionHistory;
				if (history.length < 2) {
					return false;
				}
				for (let i = history.length - 2; i >= 0; i--) {
					if (history[i].isSkipped) {
						continue;
					}
					const list = history[i].useCard.map(evt => evt.card.name);
					return list.includes(trigger.card.name);
				}
				return false;
			}, true);
			if (!player.hasStorage("qmsgswkjsgj_shenci_dczhanmeng_choice", 0) && !used) {
				list.push("选项一");
			} else {
				choiceList[0] = '<span style="opacity:0.5; ">' + choiceList[0] + (used ? "（同名牌被使用过）" : "（已选择）") + "</span>";
			}
			if (!player.hasStorage("qmsgswkjsgj_shenci_dczhanmeng_choice", 1)) {
				list.push("选项二");
			} else {
				choiceList[1] = '<span style="opacity:0.5">' + choiceList[1] + "（已选择）</span>";
			}
			let other = game.hasPlayer(current => current != player);
			if (!player.hasStorage("qmsgswkjsgj_shenci_dczhanmeng_choice", 2) && other) {
				list.push("选项三");
			} else {
				choiceList[2] = '<span style="opacity:0.5">' + choiceList[2] + (!other ? "（没人啦）" : "（已选择）") + "</span>";
			}
			const { result } = await player
				.chooseControl(list, "cancel2")
				.set("prompt", get.prompt("qmsgswkjsgj_shenci_dczhanmeng"))
				.set("ai", (event, player) => {
					const choices = _status.event.controls.slice().remove("cancel2"),
						evt = _status.event.getTrigger();
					if (choices.includes("选项三")) {
						if (
							game.hasPlayer(current => {
								if (current == player || !current.countDiscardableCards(current, "he")) {
									return false;
								}
								let eff1 = get.effect(current, { name: "guohe_copy2" }, player, player) + 0.1,
									eff2 = get.damageEffect(current, player, player, "fire") + 0.1;
								if (eff1 < 0 && eff2 < 0) {
									return false;
								}
								return eff1 * eff2 > 0;
							})
						) {
							return "选项三";
						}
						choices.remove("选项三");
					}
					if (choices.includes("选项二")) {
						if (evt.card.name == "sha") {
							return "选项二";
						}
						if (get.type(evt.card, null, false) == "equip") {
							choices.remove("选项二");
						}
					}
					if (!choices.length) {
						return "cancel2";
					}
					return choices.randomGet();
				})
				.set("choiceList", choiceList);
			event.result = {
				bool: result?.control ? result.control != "cancel2" : false,
				cost_data: result?.control,
			};
		},
		popup: false,
		async content(event, trigger, player) {
			// player.markAuto("qmsgswkjsgj_shenci_dczhanmeng_choice", ["选项一", "选项二", "选项三"].indexOf(event.cost_data), true);
			// player.addTempSkill("qmsgswkjsgj_shenci_dczhanmeng_choice");
			if (event.cost_data != "选项三") {
				await player.logSkill(event.name);
				game.log(player, "选择了", "#y" + event.cost_data);
			}
			if (event.cost_data == "选项一") {
				let card = get.cardPile2(card => {
					return !get.tag(card, "damage");
				});
				if (card) {
					await player.gain(card, "gain2");
				}
			} else if (event.cost_data == "选项二") {
				trigger["qmsgswkjsgj_shenci_dczhanmeng_" + player.playerid] = true;
				player.addSkill("qmsgswkjsgj_shenci_dczhanmeng_delay");
			} else {
				const { result } = await player.chooseTarget("占梦：弃置一名其他角色两张牌，对其造成1点火焰伤害", lib.filter.notMe, true).set("ai", target => {
					let player = _status.event.player;
					let eff1 = get.effect(target, { name: "guohe_copy2" }, player, player) + 0.1,
						eff2 = get.damageEffect(target, player, player, "fire") + 0.1;
					if (eff1 < 0 && eff2 < 0) {
						return -eff1 * eff2;
					}
					return eff1 * eff2;
				});
				if (result?.bool && result.targets?.length) {
					const target = result.targets[0];
					await player.logSkill(event.name, target);
					game.log(player, "选择了", "#y选项三");
					if (target.countDiscardableCards(player, "he")) {
						await player.discardPlayerCard(2,target, "he", true);
						// if (result2?.bool && result2.cards?.length) {
						// 	let num = result2.cards.reduce((sum, card) => sum + get.number(card, false), 0);
						// 	if (num > 10) {
						// 	}
						// }
					}
					player.line(target, "fire");
					await target.damage("fire");
				}
			}
		},
		subSkill: {
			choice: {
				charlotte: true,
				onremove: true,
			},
			delay: {
				charlotte: true,
				trigger: { global: ["useCardAfter", "phaseBeginStart"] },
				filter(event, player, name) {
					let history = player.actionHistory;
					if (history.length < 2) {
						return false;
					}
					let list = history[history.length - 2].useCard;
					if (name == "phaseBeginStart") {
						return !list.some(evt => evt["qmsgswkjsgj_shenci_dczhanmeng_" + player.playerid]);
					}
					for (let evt of list) {
						if (
							evt["qmsgswkjsgj_shenci_dczhanmeng_" + player.playerid] &&
							event.card.name == evt.card.name 
							// &&
							// game
							// 	.getGlobalHistory("useCard", evtx => {
							// 		return evtx.card.name == event.card.name;
							// 	})
							// 	.indexOf(event) == 0
						) {
							return true;
						}
					}
					return false;
				},
				forced: true,
				popup: false,
				silent: true,
				async content(event, trigger, player) {
					if (event.triggername != "phaseBeginStart") {
						await player.logSkill("qmsgswkjsgj_shenci_dczhanmeng");
						let card = get.cardPile2(card => {
							return get.tag(card, "damage");
						});
						if (card) {
							await player.gain(card, "gain2");
						}
					} else {
						player.removeSkill(event.name);
					}
				},
			},
		},
		ai: { threaten: 8 },
	},


	//曹髦
	qmsgswkjsgj_shenci_mbqianlong: {
		audio: 'mbqianlong',
		persevereSkill: true,
		trigger: {
			player: ["qmsgswkjsgj_shenci_mbqianlong_beginAfter", "qmsgswkjsgj_shenci_mbqianlong_addAfter"/*, "qmsgswkjsgj_shenci_mbweitongAfter"*/],
		},
		filter(event, player) {
			let skills = [];
			let current = player.additionalSkills?.qmsgswkjsgj_shenci_mbqianlong?.length ?? 0;
			let target = player.countMark("qmsgswkjsgj_shenci_mbqianlong") == lib.skill.qmsgswkjsgj_shenci_mbqianlong.maxMarkCount ? lib.skill.qmsgswkjsgj_shenci_mbqianlong.derivation.length : Math.floor(player.countMark("qmsgswkjsgj_shenci_mbqianlong") / 20);
			return target > current;
		},
		forced: true,
		popup: false,
		locked: false,
		beginMarkCount: 30,
		maxMarkCount: 99,
		derivation: ["qmsgswkjsgj_shenci_mbcmqingzheng", "qmsgswkjsgj_shenci_mbcmjiushi", "qmsgswkjsgj_shenci_mbcmfangzhu",'qmsgswkjsgj_shenci_cmhuituo', "qmsgswkjsgj_shenci_mbjuejin"],
		addMark(player, num) {
			num = Math.min(num, lib.skill.qmsgswkjsgj_shenci_mbqianlong.maxMarkCount - player.countMark("qmsgswkjsgj_shenci_mbqianlong"));
			player.addMark("qmsgswkjsgj_shenci_mbqianlong", num);
		},
		group: ["qmsgswkjsgj_shenci_mbqianlong_begin", "qmsgswkjsgj_shenci_mbqianlong_add", "qmsgswkjsgj_shenci_mbqianlong_die"],
		async content(event, trigger, player) {
			const derivation = lib.skill.qmsgswkjsgj_shenci_mbqianlong.derivation,
				skills = player.countMark("qmsgswkjsgj_shenci_mbqianlong") == lib.skill.qmsgswkjsgj_shenci_mbqianlong.maxMarkCount ? derivation : derivation.slice(0, Math.floor(player.countMark("qmsgswkjsgj_shenci_mbqianlong") / 20));
			player.addAdditionalSkill("qmsgswkjsgj_shenci_mbqianlong", skills);
		},
		marktext: "道",
		intro: {
			name: "道心(潜龙)",
			name2: "道心",
			content: "当前道心数为#",
		},
		subSkill: {
			begin: {
				audio: "qmsgswkjsgj_shenci_mbqianlong",
				persevereSkill: true,
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				filter(event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					const num = lib.skill.qmsgswkjsgj_shenci_mbqianlong.beginMarkCount;
					lib.skill.qmsgswkjsgj_shenci_mbqianlong.addMark(player, num);
				},
			},
			add: {
				audio: "qmsgswkjsgj_mbqianlong",
				persevereSkill: true,
				trigger: {
					player: ["gainAfter", "damageEnd"],
					source: "damageSource",
					global: "loseAsyncAfter",
				},
				filter(event, player) {
					if (player.countMark("qmsgswkjsgj_shenci_mbqianlong") >= lib.skill.qmsgswkjsgj_shenci_mbqianlong.maxMarkCount) {
						return false;
					}
					if (event.name === "damage") {
						return event.num > 0;
					}
					return event.getg(player).length > 0;
				},
				getIndex(event, player, triggername) {
					if (event.name === "damage") {
						return event.num;
					}
					return 1;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					let toAdd = 10 * (1 + (trigger.name === "damage"));
					lib.skill.qmsgswkjsgj_shenci_mbqianlong.addMark(player, toAdd);
				},
			},
			die: {
				trigger: {
					player: "dieBefore",
				},
				charlotte: true,
				firstDo: true,
				forced: true,
				popup: false,
				forceDie: true,
				async content(event, trigger, player) {
					player.changeSkin({ characterName: "qmsgswkjsgj_shenci_caomao" }, "qmsgswkjsgj_shenci_caomao_dead");
				},
			},
		},
	},
	qmsgswkjsgj_shenci_mbweitong: {
		audio: 'mbweitong',
		persevereSkill: true,
		zhuSkill: true,
		trigger: {
			global: ["phaseBefore",'recoverAfter'],
			player: "enterGame",
		},
		filter(event, player) {
			if(event.name == "recover")return event.player !=player&&event.player.group == "wei"&&player.hasZhuSkill("qmsgswkjsgj_shenci_mbweitong", event.player)
			return event.name != "phase" || game.phaseNumber == 0;
		},
		// forced: true,
		cost(){
			if(event.triggername=='recoverAfter'){
				event.result = player.chooseBool(get.prompt2('qmsgswkjsgj_shenci_mbweitong')).set('ai',true).forResult();
			}
			else {
				event.result={bool:true}
			}
		},
		locked: false,
		async content(event, trigger, player) {
			// const num = game.countPlayer(current => {
			// 	return current !== player && current.group === "wei" && player.hasZhuSkill("qmsgswkjsgj_shenci_mbweitong", current);
			// });
			if(event.triggername=='recoverAfter'){
				player.draw()
			}
			if(game.hasPlayer(current => {
				return current !== player && current.group === "wei" && player.hasZhuSkill("qmsgswkjsgj_shenci_mbweitong", current);
			}))lib.skill.qmsgswkjsgj_shenci_mbqianlong.addMark(player, 60);
		},
		ai: {
			combo: "qmsgswkjsgj_shenci_mbqianlong",
		},
	},
	qmsgswkjsgj_shenci_mbcmqingzheng: {
		audio: 'mbcmqingzheng',
		persevereSkill: true,
		trigger: { player: "phaseUseBegin" },
		filter(event, player) {
			return player.countCards("h") > 0 && game.hasPlayer(current => player != current && current.countCards("h") > 0);
		},
		/**
		 * player选择target的一种花色的牌
		 * @param {Player} player
		 * @param {Player} target
		 */
		chooseOneSuitCard(player, target, force = false, limit, str = "请选择一个花色的牌", ai = { bool: false }) {
			const { promise, resolve } = Promise.withResolvers();
			const event = _status.event;
			event.selectedCards = [];
			event.selectedButtons = [];
			//对手牌按花色分类
			let suitCards = Object.groupBy(target.getCards("h"), c => get.suit(c, target));
			suitCards.heart ??= [];
			suitCards.diamond ??= [];
			suitCards.spade ??= [];
			suitCards.club ??= [];
			let dialog = (event.dialog = ui.create.dialog());
			dialog.classList.add("fullheight");
			event.control_ok = ui.create.control("ok", link => {
				_status.imchoosing = false;
				event.dialog.close();
				event.control_ok?.close();
				event.control_cancel?.close();
				event._result = {
					bool: true,
					cards: event.selectedCards,
				};
				resolve(event._result);
				game.resume();
			});
			event.control_ok.classList.add("disabled");
			//如果是非强制的，才创建取消按钮
			if (!force) {
				event.control_cancel = ui.create.control("cancel", link => {
					_status.imchoosing = false;
					event.dialog.close();
					event.control_ok?.close();
					event.control_cancel?.close();
					event._result = {
						bool: false,
					};
					resolve(event._result);
					game.resume();
				});
			}
			event.switchToAuto = function () {
				_status.imchoosing = false;
				event.dialog?.close();
				event.control_ok?.close();
				event.control_cancel?.close();
				event._result = ai();
				resolve(event._result);
				game.resume();
			};
			dialog.addNewRow(str);
			let keys = Object.keys(suitCards).sort((a, b) => {
				let arr = ["spade", "heart", "club", "diamond", "none"];
				return arr.indexOf(a) - arr.indexOf(b);
			});
			//添加框
			while (keys.length) {
				let key1 = keys.shift();
				let cards1 = suitCards[key1];
				let key2 = keys.shift();
				let cards2 = suitCards[key2];
				//点击容器的回调
				/**@type {Row_Item_Option['clickItemContainer']} */
				const clickItemContainer = function (container, item, allContainer) {
					if (!item?.length || item.some(card => !lib.filter.cardDiscardable(card, player, event.name))) {
						return;
					}
					if (event.selectedButtons.includes(container)) {
						container.classList.remove("selected");
						event.selectedButtons.remove(container);
						event.selectedCards.removeArray(item);
					} else {
						if (event.selectedButtons.length >= limit) {
							let precontainer = event.selectedButtons[0];
							precontainer.classList.remove("selected");
							event.selectedButtons.remove(precontainer);
							let suit = get.suit(event.selectedCards[0], target),
								cards = target.getCards("h", { suit: suit });
							event.selectedCards.removeArray(cards);
						}
						container.classList.add("selected");
						event.selectedButtons.add(container);
						event.selectedCards.addArray(item);
					}
					event.control_ok.classList[event.selectedButtons.length === limit ? "remove" : "add"]("disabled");
				};
				//给框加封条，显示xxx牌多少张
				function createCustom(suit, count) {
					return function (itemContainer) {
						function formatStr(str) {
							return str.replace(/(?:♥︎|♦︎)/g, '<span style="color: red; ">$&</span>');
						}
						let div = ui.create.div(itemContainer);
						if (count) {
							div.innerHTML = formatStr(`${get.translation(suit)}牌${count}张`);
						} else {
							div.innerHTML = formatStr(`没有${get.translation(suit)}牌`);
						}
						div.css({
							position: "absolute",
							width: "100%",
							bottom: "1%",
							height: "35%",
							background: "#352929bf",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							fontSize: "1.2em",
							zIndex: "2",
						});
					};
				}
				//框的样式，不要太宽，高度最小也要100px，防止空框没有高度
				/**@type {Row_Item_Option['itemContainerCss']} */
				let itemContainerCss = {
					border: "solid #c6b3b3 2px",
					minHeight: "100px",
				};
				if (key2) {
					dialog.addNewRow(
						{
							item: cards1,
							ItemNoclick: true, //卡牌不需要被点击
							clickItemContainer,
							custom: createCustom(key1, cards1.length), //添加封条
							itemContainerCss,
						},
						{
							item: cards2,
							ItemNoclick: true, //卡牌不需要被点击
							clickItemContainer,
							custom: createCustom(key2, cards2.length),
							itemContainerCss,
						}
					);
				} else {
					dialog.addNewRow({
						item: cards1,
						ItemNoclick: true, //卡牌不需要被点击
						clickItemContainer,
						custom: createCustom(key1, cards1.length),
						itemContainerCss,
					});
				}
			}
			game.pause();
			dialog.open();
			_status.imchoosing = true;
			return promise;
		},
		async cost(event, trigger, player) {
			const list = get.addNewRowList(player.getCards("h"), "suit", player);
			let limit = event.skill === "sbqingzheng" ? 3 - player.countMark("sbjianxiong") : 1;
			// const { result } = await player.chooseButtonTarget({
			// 	createDialog: [
			// 		[
			// 			[[`${get.prompt(event.skill)}<div class="text center">${get.translation(event.skill, "info")}</div>`], "addNewRow"],
			// 			[
			// 				dialog => {
			// 					dialog.classList.add("fullheight");
			// 					// 不添加scroll1和scroll2的类名
			// 					dialog.forcebutton = false;
			// 					dialog._scrollset = false;
			// 				},
			// 				"handle",
			// 			],
			// 			list.map(item => [Array.isArray(item) ? item : [item], "addNewRow"]),
			// 		],
			// 	],
			// 	filterButton(button) {
			// 		const player = get.player();
			// 		if (!button.links.length || button.links.some(card => !lib.filter.cardDiscardable(card, player, get.event().getParent().skill))) {
			// 			return false;
			// 		}
			// 		return true;
			// 	},
			// 	selectButton: limit,
			// 	limit,
			// 	filterTarget(card, player, target) {
			// 		return target != player && target.countCards("h");
			// 	},
			// 	ai1(button) {
			// 		const player = get.player();
			// 		if (!game.hasPlayer(current => player != current && current.countDiscardableCards(player, "h") > 0 && get.attitude(player, current) < 0)) {
			// 			return 0;
			// 		}
			// 		let values = button.links.map(i => get.value(i)).reduce((p, c) => p + c, 0) / button.links.length;
			// 		if (button.links.length > 4 || values > 6) {
			// 			return 0;
			// 		}
			// 		return (13 - button.links.length) / values;
			// 	},
			// 	ai2(target) {
			// 		const player = get.player(),
			// 			att = get.attitude(player, target);
			// 		if (att >= 0) {
			// 			return 0;
			// 		}
			// 		return 1 - att / 2 + Math.sqrt(target.countCards("h"));
			// 	},
			// });
			const { result } = await player.chooseCardTarget({
				// prompt:'',
				prompt2:'弃置一张牌并选择一名其他角色，观看其手牌并弃置其中一种花色的所有牌。然后对其造成1点伤害',
				filterCard(card,player){
					return lib.filter.cardDiscardable(card, player);
				},
				selectCard:1,
				filterTarget(card, player, target) {
					return target != player && target.countCards("h");
				},
				ai1:function(card){
					return 6-get.value(card);
				},
				ai2(target) {
					const player = get.player(),
						att = get.attitude(player, target);
					if (att >= 0) {
						return 0;
					}
					return 1 - att / 2 + Math.sqrt(target.countCards("h"));
				},
			})
			event.result = {
				bool: result?.bool,
				cost_data: result?.cards,
				targets: result?.targets,
			};
			// if (event.result.bool && result?.links?.length) {
			// 	event.result.cards = player.getCards("h").filter(card => result.links.includes(get.suit(card, player)));
			// }
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
				cost_data: cards1,
			} = event;
			await player.discard(cards1);
			if (
				!target.countCards("h") ||
				lib.suits
					.slice()
					.filter(suit => target.hasCard((card, playerx) => get.suit(card, playerx) === suit, "h"))
					.every(suit => target.hasCard((card, playerx) => get.suit(card, playerx) === suit && !lib.filter.cardDiscardable(card, player), "h"))
			) {
				if (target.countCards("h")) {
					const content = [`###清正###<div class="text center">${get.translation(target)}的手牌</div>`, target.getCards("h")];
					await player.chooseControl("ok").set("dialog", content);
				}
				return;
			}
			const list = get.addNewRowList(target.getCards("h"), "suit", target);
			let { result } = await player
				.chooseButton(
					[
						[
							[[`清正：弃置${get.translation(target)}一种花色的所有牌`], "addNewRow"],
							[
								dialog => {
									dialog.classList.add("fullheight");
									dialog.forcebutton = false;
									dialog._scrollset = false;
								},
								"handle",
							],
							list.map(item => [Array.isArray(item) ? item : [item], "addNewRow"]),
						],
					],
					true
				)
				.set("filterButton", button => {
					const player = get.player();
					if (!button.links.length || button.links.some(card => !lib.filter.cardDiscardable(card, player, get.event().getParent().name))) {
						return false;
					}
					return true;
				})
				.set("ai", button => {
					const player = get.player();
					return button.links.length;
				});
			if (!result?.links?.length) {
				return;
			}
			const cards2 = target.getDiscardableCards(player, "h").filter(card => result.links.includes(get.suit(card, target)));
			if (cards2.length) {
				await target.discard(cards2, "notBySelf").set("discarder", player);
			}
			// if (cards1.length > cards2.length) {
				await target.damage(player);
			// }
			if (event.name !== "sbqingzheng" || player.countMark("sbjianxiong") >= 2) {
				return;
			}
			if (["sbjianxiong", "jdjianxiong"].some(skill => player.hasSkill(skill, null, null, false))) {
				result = await player
					.chooseBool("是否获得1枚“治世”？")
					.set("choice", Math.random() >= 0.5)
					.forResult();
				if (result?.bool) {
					player.addMark("sbjianxiong", 1);
				}
			}
		},
	},
	qmsgswkjsgj_shenci_mbcmjiushi: {
		audio: 'mbcmjiushi',
		inherit: "rejiushi",
		persevereSkill: true,
		subfrequent: null,
		group: ["qmsgswkjsgj_shenci_mbcmjiushi_use", "qmsgswkjsgj_shenci_mbcmjiushi_turnback", "qmsgswkjsgj_shenci_mbcmjiushi_gain2"],
		subSkill: {
			use: {
				hiddenCard(player, name) {
					if (name == "jiu") {
						return !player.isTurnedOver();
					}
					return false;
				},
				audio: "qmsgswkjsgj_shenci_mbcmjiushi",
				enable: "chooseToUse",
				filter(event, player) {
					if (player.classList.contains("turnedover")) {
						return false;
					}
					return event.filterCard({ name: "jiu", isCard: true }, player, event);
				},
				async content(event, trigger, player) {
					if (_status.event.getParent(2).type == "dying") {
						event.dying = player;
						event.type = "dying";
					}
					await player.turnOver();
					await player.useCard({ name: "jiu", isCard: true }, player);
				},
				ai: {
					save: true,
					skillTagFilter(player, tag, arg) {
						return !player.isTurnedOver() && _status.event?.dying == player;
					},
					order: 5,
					result: {
						player(player) {
							if (_status.event.parent.name == "phaseUse") {
								if (player.countCards("h", "jiu") > 0) {
									return 0;
								}
								if (player.getEquip("zhuge") && player.countCards("h", "sha") > 1) {
									return 0;
								}
								if (!player.countCards("h", "sha")) {
									return 0;
								}
								var targets = [];
								var target;
								var players = game.filterPlayer();
								for (var i = 0; i < players.length; i++) {
									if (get.attitude(player, players[i]) < 0) {
										if (player.canUse("sha", players[i], true, true)) {
											targets.push(players[i]);
										}
									}
								}
								if (targets.length) {
									target = targets[0];
								} else {
									return 0;
								}
								var num = get.effect(target, { name: "sha" }, player, player);
								for (var i = 1; i < targets.length; i++) {
									var num2 = get.effect(targets[i], { name: "sha" }, player, player);
									if (num2 > num) {
										target = targets[i];
										num = num2;
									}
								}
								if (num <= 0) {
									return 0;
								}
								var e2 = target.getEquip(2);
								if (e2) {
									if (e2.name == "tengjia") {
										if (!player.countCards("h", { name: "sha", nature: "fire" }) && !player.getEquip("zhuque")) {
											return 0;
										}
									}
									if (e2.name == "renwang") {
										if (!player.countCards("h", { name: "sha", color: "red" })) {
											return 0;
										}
									}
									if (e2.name == "baiyin") {
										return 0;
									}
								}
								if (player.getEquip("guanshi") && player.countCards("he") > 2) {
									return 1;
								}
								return target.countCards("h") > 3 ? 0 : 1;
							}
							if (player == _status.event.dying || player.isTurnedOver()) {
								return 3;
							}
						},
					},
					effect: {
						target(card, player, target) {
							if (target.isTurnedOver()) {
								if (get.tag(card, "damage")) {
									if (player.hasSkillTag("jueqing", false, target)) {
										return [1, -2];
									}
									if (target.hp == 1) {
										return;
									}
									return [1, target.countCards("h") / 2];
								}
							}
						},
					},
				},
			},
			turnback: {
				audio: "qmsgswkjsgj_shenci_mbcmjiushi",
				persevereSkill: true,
				trigger: { player: "damageEnd" },
				check(event, player) {
					return player.isTurnedOver();
				},
				filter(event, player) {
					if (
						player.hasHistory("useCard", evt => {
							if (evt.card.name != "jiu" || evt.getParent().name != "qmsgswkjsgj_shenci_mbcmjiushi_use") {
								return false;
							}
							return evt.getParent("damage", true) == event;
						})
					) {
						return false;
					}
					return player.isTurnedOver();
				},
				prompt(event, player) {
					return "是否发动【酒诗】，将武将牌翻面？";
				},
				content() {
					player.turnOver();
				},
			},
			gain2: {
				audio: "qmsgswkjsgj_shenci_mbcmjiushi",
				persevereSkill: true,
				trigger: { player: "turnOverAfter" },
				// frequent: true,
				prompt: "是否发动【酒诗】，牌堆或弃牌堆中的一张指定牌名的锦囊牌？",
				async cost(event, trigger, player){
					var cards = [];
					for(var i of lib.inpile){
						if(get.type2(i)=='trick'){
							// cards.push(i);
							cards.push(['锦囊','',i])
						}
					}
					var relu = await player.chooseButton([[cards,'vcard']],1).set('prompt',get.prompt('qmsgswkjsgj_shenci_mbcmjiushi_gain')).forResult();
					if(relu){
						event.result = {
							bool: true,
							cost_data: {
								name:relu.links?relu.links[0][2]:'',
							},
						}
					}
				},
				content() {
					var name=event.cost_data.name;
					var card = get.cardPile(function (card) {
						if(name=='')return get.type2(card) == "trick";
						return card.name == name;
					});
					if (card) {
						player.gain(card, "draw");
					}
					else {
						player.say('牌堆和弃牌堆翻遍了都没有我要的牌。')
					}
				},
			},
		},
	},
	qmsgswkjsgj_shenci_mbcmfangzhu: {
		audio: 'mbcmfangzhu',
		persevereSkill: true,
		inherit: "qmsgswkjsgj_shenci_sbfangzhu",
		filter(event, player) {
			// const target = player.storage.mbcmfangzhu;
			return game.hasPlayer(current => current !== player);
		},
		usable: 2,
		chooseButton: {
			dialog() {
				const dialog = ui.create.dialog("放逐：令一名其他角色...", "hidden");
				dialog.add([
					[
						[1, "只能使用一种类型牌直到其回合结束"],
						[2, "非Charlotte技能失效直到其回合结束"],
						[3, "翻面"],
					],
					"textbutton",
				]);
				return dialog;
			},
			check(button) {
				const player = get.player();
				if (button.link === 2) {
					if (
						game.hasPlayer(target => {
							if (target.hasSkill("qmsgswkjsgj_shenci_mbcmfangzhu_ban") || target.hasSkill("fengyin") || target.hasSkill("baiban")) {
								return false;
							}
							return (
								get.attitude(player, target) < 0 &&
								["name", "name1", "name2"]
									.map((sum, name) => {
										if (target[name] && (name != "name1" || target.name != target.name1)) {
											if (get.character(target[name])) {
												return get.rank(target[name], true);
											}
										}
										return 0;
									})
									.reduce((p, c) => {
										return p + c;
									}, 0) > 5
							);
						})
					) {
						return 6;
					}
				}
				return button.link === 1 ? 1 : 0;
			},
			backup(links, player) {
				return {
					num: links[0],
					audio: "qmsgswkjsgj_shenci_mbcmfangzhu",
					filterCard: () => false,
					selectCard: -1,
					filterTarget(card, player, target) {
						if (target == player) {
							return false;
						}
						const num = lib.skill.mbcmfangzhu_backup.num,
							storage = target.getStorage("qmsgswkjsgj_shenci_mbcmfangzhu_ban");
						return num != 1 || !storage.length;
					},
					async content(event, trigger, player) {
						const target = event.target;
						const num = lib.skill.qmsgswkjsgj_shenci_mbcmfangzhu_backup.num;
						switch (num) {
							case 1:
								var type=[];
								for(var i of lib.inpile){
									if(get.type2(i)&&!type.includes(get.type2(i))){
										type.push(get.type2(i));
									}
								}
								// type.push('cancel2')
								var relu = await player.chooseControl(type).set('prompt','选择一个类型').forResult();
								if(relu!='cancel2'){
									target.addTempSkill("qmsgswkjsgj_shenci_mbcmfangzhu_ban", { player: "phaseEnd" });
									target.markAuto("qmsgswkjsgj_shenci_mbcmfangzhu_ban", [relu.control]);
									lib.skill.qmsgswkjsgj_mbcmfangzhu_ban.init(target, "qmsgswkjsgj_shenci_mbcmfangzhu_ban");
								}
								break;
							case 2:
								target.addTempSkill("qmsgswkjsgj_mbcmfangzhu_baiban", { player: "phaseEnd" });
								break;
							case 3:
								target.turnOver();
								break;
						}
					},
					ai: {
						result: {
							target(player, target) {
								switch (lib.skill.mbcmfangzhu_backup.num) {
									case 1:
										return -target.countCards("h", card => get.type(card) != "trick") - 1;
									case 2:
										return -target.getSkills(null, null, false).reduce((sum, skill) => {
											return sum + Math.max(get.skillRank(skill, "out"), get.skillRank(skill, "in"));
										}, 0);
								}
							},
						},
					},
				};
			},
			prompt(links, player) {
				const str = "###放逐###";
				switch (links[0]) {
					case 1:
						return str + "令一名其他角色于手牌中只能使用一种类型牌直到其回合结束";
					case 2:
						return str + "令一名其他角色的非Charlotte技能失效直到其回合结束";
					case 3:
						return str + "令一名其他角色将武将牌翻面";
				}
			},
		},
		ai: {
			order: 10,
			result: {
				player(player) {
					return game.hasPlayer(current => get.attitude(player, current) < 0) ? 1 : 0;
				},
			},
		},
		subSkill: {
			backup: {},
			baiban: {
				init(player, skill) {
					player.addSkillBlocker(skill);
					player.addTip(skill, "放逐 技能失效");
				},
				onremove(player, skill) {
					player.removeSkillBlocker(skill);
					player.removeTip(skill);
				},
				inherit: "baiban",
				marktext: "逐",
			},
			ban: {
				init(player, skill) {
					let storage = player.getStorage(skill);
					if (storage.length) {
						player.addTip(skill, "放逐 限" + (storage.length === 1 ? get.translation(storage[0])[0] : "手牌"));
					}
				},
				onremove(player, skill) {
					player.removeTip(skill);
					delete player.storage[skill];
				},
				charlotte: true,
				mark: true,
				marktext: "禁",
				intro: {
					markcount: () => 0,
					content(storage) {
						if (storage.length > 1) {
							return "不能使用手牌";
						}
						return "不能使用手牌中的非" + get.translation(storage[0]) + "牌";
					},
				},
				mod: {
					cardEnabled(card, player) {
						const storage = player.getStorage("qmsgswkjsgj_shenci_mbcmfangzhu_ban");
						const hs = player.getCards("h"),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && !storage.includes(get.type2(card))) {
							return false;
						}
					},
					cardSavable(card, player) {
						const storage = player.getStorage("qmsgswkjsgj_shenci_mbcmfangzhu_ban");
						const hs = player.getCards("h"),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && !storage.includes(get.type2(card))) {
							return false;
						}
					},
				},
			},
		},
	},
	qmsgswkjsgj_shenci_cmhuituo:{
		// audio: 'ext:夜白神略/audio/character:2',
		persevereSkill: true,
		trigger: { player: "damageEnd" },
		getIndex: event => event.num,
		async cost(event, trigger, player) {
			var list = [
				'该角色回复X点体力',
				'该角色摸X张牌'
			];
			var storage = player.countMark("qmsgswkjsgj_shenci_cmhuituo")%2;
			var str = `${get.poptip("rule_chihengji")}。当你受到1点伤害后，你可以令一名角色进行一次判定，若结果为红色，${list[storage]}；若结果为黑色，${list[storage?0:1]}。（X为此次伤害的伤害点数）`
			event.result = await player
				.chooseTarget(str)
				.set("ai", target => {
					const player = get.player();
					if (get.attitude(player, target) > 0) {
						return get.recoverEffect(target, player, player) + 1;
					}
					return 0;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			const num = trigger.num;
			var numx = player.countMark('qmsgswkjsgj_shenci_cmhuituo')%2;
			var list = ['red','black'];
			const result = await target
				.judge(card => {
					if (get.color(card) == list[numx]) {
						return target.isDamaged() ? 1 : -1;
					}
					return 0;
				})
				.forResult();
			if (result.color === list[numx]) {
				await target.recover(num);
			}
			if (result.color === list[numx?0:1]) {
				await target.draw(num);
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
		},
	},
	qmsgswkjsgj_shenci_mbjuejin: {
		audio: 'mbjuejin',
		persevereSkill: true,
		enable: "phaseUse",
		limited: true,
		skillAnimation: true,
		animationColor: "thunder",
		filterCard: () => false,
		selectCard: [-1, -2],
		filterTarget: true,
		selectTarget: [1,Infinity],
		multiline: true,
		async contentBefore(event, trigger, player) {
			game.broadcastAll(() => {
				_status.tempMusic = "effect_caomaoBJM";
				game.playBackgroundMusic();
			});
			player.changeSkin({ characterName: "qmsgswkjsgj_shenci_caomao" }, "qmsgswkjsgj_shenci_caomao_shadow");
			player.awakenSkill(event.skill);
		},
		async content(event, trigger, player) {
			const target = event.target;
			const delt = target.getHp(true) - 1,
				num = Math.abs(delt);
			if (delt != 0) {
				if (delt > 0) {
					const next = target.changeHp(-delt);
					next._triggered = null;
					await next;
				} else {
					await target.recover(num);
				}
			}
			if (delt > 0) {
				await target.changeHujia(num + (player == target ? 2 : 0), null, true);
			} else if (player == target) {
				await target.changeHujia(2, null, true);
			}
		},
		async contentAfter(event, trigger, player) {
			game.addGlobalSkill("mbjuejin_xiangsicunwei");
			player.addSkill('qmsgswkjsgj_shenci_mbjuejin_draw');
			player.$fullscreenpop("向死存魏！", "thunder");
			const cards = ["cardPile", "discardPile"].map(pos => Array.from(ui[pos].childNodes)).flat();
			const filter = card => ["shan", "tao", "jiu"].includes(card.name);
			const cardx = cards.filter(filter);
			if (cardx.length) {
				await game.cardsGotoSpecial(cardx);
				game.log(cardx, "被移出了游戏");
			}
			for (const target of game.filterPlayer()) {
				const sishis = target.getCards("hej", filter);
				if (sishis.length) {
					target.$throw(sishis);
					game.log(sishis, "被移出了游戏");
					await target.lose(sishis, ui.special);
					if(target==player){
						await player.draw(sishis.length);
						await player.addMark('qmsgswkjsgj_shenci_cmhuituo',1,false);
						game.log(player,'反转了'+get.translation('qmsgswkjsgj_shenci_cmhuituo')+'的判定效果。');
					}
				}
			}
		},
		ai: {
			order: 0.1,
			result: {
				player(player) {
					let eff = 1;
					game.countPlayer(current => {
						const att = get.attitude(player, current),
							num = Math.abs(current.getHp(true) - 1);
						const delt = Math.max(0, num + current.hujia - 5);
						eff -= att * delt;
					});
					return eff > 0 ? 1 : 0;
				},
				target(player, target){
					const att = get.attitude(player, current),
						num = Math.abs(current.getHp(true) - 1);
					const delt = Math.max(0, num + current.hujia - 5);
					if(target.hasSkill('shangshi'))return 1;
					else if(num + current.hujia - 5 <=0 )return -1;
					else return 0;
				},
			},
		},
		subSkill: {
			xiangsicunwei: {
				trigger: {
					global: ["loseAfter", "equipAfter", "loseAsyncAfter", "cardsDiscardAfter"],
				},
				forced: true,
				silent: true,
				firstDo: true,
				filter(event, player) {
					const nameList = ["shan", "tao", "jiu"];
					return event.getd().some(card => {
						return nameList.includes(get.name(card, false)) && get.position(card, true) === "d";
					});
				},
				async content(event, trigger, player) {
					const nameList = ["shan", "tao", "jiu"];
					const cards = trigger.getd().filter(card => {
						return nameList.includes(get.name(card, false)) && get.position(card, true) === "d";
					});
					await game.cardsGotoSpecial(cards);
					game.log(cards, "被移出了游戏");
				},
			},
			draw:{
				persevereSkill: true,
				charlotte: true,
				audio:'qmsgswkjsgj_shenci_mbjuejin',
				trigger:{
					player:'loseAfter',
				},
				filter(event,player){
					var evt = event.getParent(2);
					return evt&&evt.skill&&evt.skill == 'mbjuejin_xiangsicunwei';
				},
				forced:true,
				async content(event,trigger,player){
					var num = trigger.cards.length;
					await player.draw(num);
					await player.addMark('qmsgswkjsgj_shenci_cmhuituo',1,false);
					game.log(player,'反转了'+get.translation('qmsgswkjsgj_shenci_cmhuituo')+'的判定效果。');
				},
			},
		},
	},







































































































	qmsgswkjsgj_zhenshen:{
		//我可不什么都惯着这作者
		//顶破天给你一个免疫横置翻面等
		charlotte:true,
		forced:true,
		trigger:{
			player:['linkBefore','turnOverBefore']
		},
		filter(event,player,name){
			console.log(name,':',event);
		}
	},
	qmsgswkjsgj_shenxing:{
		charlotte:true,
		trigger:{
			player:'roundStart',
		},
		filter(event,player){
			if (!lib.inpile.includes("mb_qingnangshu")) {
				return true;
			}
			return get.cardPile(card => card.name == "mb_qingnangshu");
		},
		content(event,player){
			var card = game.YB_createCard('mb_qingnangshu',null,null);
			player.storage.qmsgswkjsgj_shenxing_card = card;
			player.when({player:'loseAfter',global:'loseAsyncAfter',}).filter(function(event,player){
				const evt = event.getl(player);
				if (evt && evt.player === player && evt.es) {
					if(player.storage.qmsgswkjsgj_shenxing_card){
						return evt.es.length&&evt.es.includes(player.storage.qmsgswkjsgj_shenxing_card);
					}
				}
			}).then(function(){
				let cardx = player.storage.qmsgswkjsgj_shenxing_card;
				if(cardx){
					cardx.fix();
					cardx.remove();
					cardx.destroyed = true;
					game.log(cardx, "被销毁了");
					delete player.storage.qmsgswkjsgj_shenxing_card;
				}
			})
			player.gain(card,'gain2');
			player.useCard(card,false,false);
		},
		init(player){
			player.expandEquip(5);
		},
		onremove:function(player){
			player.disableEquip(5);
		},
	},
	qmsgswkjsgj_shenxing2:{
		charlotte:true,
		trigger:{
			player:'roundStart',
		},
		filter(event,player){
			if (!lib.inpile.includes("qmsgswkjsgj_chuanguoyuxi")) {
				return true;
			}
			return get.cardPile(card => card.name == "qmsgswkjsgj_chuanguoyuxi");
		},
		content(event,player){
			var card = game.YB_createCard('qmsgswkjsgj_chuanguoyuxi',null,null);
			player.storage.qmsgswkjsgj_shenxing2_card = card;
			player.when({player:'loseAfter',global:'loseAsyncAfter',}).filter(function(event,player){
				const evt = event.getl(player);
				if (evt && evt.player === player && evt.es) {
					if(player.storage.qmsgswkjsgj_shenxing2_card){
						return evt.es.length&&evt.es.includes(player.storage.qmsgswkjsgj_shenxing2_card);
					}
				}
			}).then(function(){
				let cardx = player.storage.qmsgswkjsgj_shenxing2_card;
				if(cardx){
					cardx.fix();
					cardx.remove();
					cardx.destroyed = true;
					game.log(cardx, "被销毁了");
					delete player.storage.qmsgswkjsgj_shenxing2_card;
				}
			})
			player.gain(card,'gain2');
			player.useCard(card,false,false);
		},
		init(player){
			player.expandEquip(5);
		},
		onremove:function(player){
			player.disableEquip(5);
		},
	},
	qmsgswkjsgj_shenxing3:{
		charlotte:true,
		trigger:{
			player:'roundStart',
		},
		filter(event,player){
			if (!lib.inpile.includes("muniu")) {
				return true;
			}
			return get.cardPile(card => card.name == "muniu");
		},
		content(event,player){
			var card = game.YB_createCard('muniu',null,null);
			player.storage.qmsgswkjsgj_shenxing3_card = card;
			player.when({player:'loseAfter',global:'loseAsyncAfter',}).filter(function(event,player){
				const evt = event.getl(player);
				if (evt && evt.player === player && evt.es) {
					if(player.storage.qmsgswkjsgj_shenxing3_card){
						return evt.es.length&&evt.es.includes(player.storage.qmsgswkjsgj_shenxing3_card);
					}
				}
			}).then(function(){
				let cardx = player.storage.qmsgswkjsgj_shenxing3_card;
				if(cardx){
					cardx.fix();
					cardx.remove();
					cardx.destroyed = true;
					game.log(cardx, "被销毁了");
					delete player.storage.qmsgswkjsgj_shenxing3_card;
				}
			})
			player.gain(card,'gain2');
			player.useCard(card,false,false);
		},
		init(player){
			player.expandEquip(5);
		},
		onremove:function(player){
			player.disableEquip(5);
		},
	},
	qmsgswkjsgj_chuanguoyuxi_skill:{
		equipSkill: true,
		audio: "weidi",
		audioname2: {
			shen_simayi: "lianpo1.mp3",
			xin_simayi: "lianpo1.mp3",
			new_simayi: "lianpo1.mp3",
		},
		trigger: { player: "phaseDiscardBegin" },
		getIndex(event, player) {
			const cards = player.getVCards("e", card => card.name == "qmsgswkjsgj_chuanguoyuxi_skill");
			return cards.length ? cards : 1;
		},
		forced: true,
		async content(event, trigger, player) {
			/*player.flashAvatar(event.name, "yuanshu");*/
			await player.draw();
			player.addSkill(event.name + "_add");
			player.addMark(event.name + "_add", 2, false);
			game.log(player, "的手牌上限", "#y+2");
			let str = "受命于天，既寿永昌！";
			if (!player.isZhu2()) {
				// await player.loseHp();
				str = ["你们都得听我的号令！", "我才是皇帝！"].randomGet();
			}
			player.chat(str);
		},
		subSkill: {
			add: {
				charlotte: true,
				onremove: true,
				mark: true,
				markimage: "image/card/handcard.png",
				intro: {
					content: "手牌上限+#",
				},
				mod: {
					maxHandcard(player, num) {
						return num + player.countMark("qmsgswkjsgj_chuanguoyuxi_skill_add");
					},
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
			combo: "qmsgswkjsgj_yingba",
		},
		subSkill: {
			usea: {
				audio: "scfuhai",
				trigger: { player: "useCardAfter" },
				forced: true,
				filter(event, player) {
					return lib.skill.qmsgswkjsgj_scfuhai_usea.logTarget(event, player).length > 0;
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
	sgsxjxfzmnl_pinghe: {
		audio: "pinghe",
		mod: {
			maxHandcardBase(player) {
				return player.getDamagedHp();
			},
		},
		trigger: { player: "damageBegin2" },
		forced: true,
		filter(event, player) {
			return event.source && event.source != player && player.maxHp > 1 && player.countCards("h") > 0;
		},
		content() {
			"step 0";
			trigger.cancel();
			player.loseMaxHp();
			"step 1";
			player.chooseCardTarget({
				prompt: "请选择【冯河】的牌和目标",
				prompt2: "将一张手牌交给一名其他角色并防止伤害" + (player.hasSkill("qmsgswkjsgj_yingba") ? "，然后令伤害来源获得一个“平定”标记" : ""),
				filterCard: true,
				forced: true,
				filterTarget: lib.filter.notMe,
				ai1(card) {
					if (
						get.tag(card, "recover") &&
						!game.hasPlayer(function (current) {
							return get.attitude(current, player) > 0 && !current.hasSkillTag("nogain");
						})
					) {
						return 0;
					}
					return 1 / Math.max(0.1, get.value(card));
				},
				ai2(target) {
					var player = _status.event.player,
						att = get.attitude(player, target);
					if (target.hasSkillTag("nogain")) {
						att /= 9;
					}
					return 4 + att;
				},
			});
			"step 2";
			if (result.bool) {
				var target = result.targets[0];
				//player.logSkill('pinghe',target);
				player.line(target, "green");
				player.give(result.cards, target);
				trigger.source.addMark("yingba_mark", 1);
			}
		},
		ai: {
			maixie_defend: true,
			effect: {
				target(card, player, target) {
					if (player !== target && target.maxHp > 1 && target.countCards("h") > 0) {
						if (get.tag(card, "damage") && target.hasSkill("qmsgswkjsgj_yingba")) {
							let damage = 1.6;
							if (target.isHealthy()) {
								damage += 1.6;
							}
							if (
								game.hasPlayer(cur => {
									return cur !== target && get.attitude(target, cur) > 0;
								})
							) {
								damage -= 0.9;
							}
							return [0, -damage, 0, -0.4];
						}
						if (card.name === "tiesuo") {
							return 0.4;
						}
					}
					if (get.tag(card, "recover") && _status.event.type == "phase" && !player.needsToDiscard()) {
						return 0;
					}
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
	//魔貂蝉
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
				if (player.hasSkill("sgsxjxfzmnl_sbbiyue")) return 4 * targets - get.value(card);
				return 6 + targets - get.value(card);
			}
			return 0;
		},
		selectTargetAi: (event, player) => {
			let cache = _status.event.getTempCache("sgsxjxfzmnl_meihuo", "targets");
			if (Array.isArray(cache)) return cache.length;
			let targets = [],
				cards = [0],
				sgsxjxfzmnl_sbbiyue = player.hasSkill("sgsxjxfzmnl_sbbiyue") ? Math.max(0, 3 - game.countPlayer2(current => current.hasHistory("damage"))) : 0,
				alter = [null, 1, 1],
				temp;
			for (let i of game.players) {
				if (player === i) continue;
				temp = get.effect(i, new lib.element.VCard({ name: "juedou", isCard: true }), i, i);
				if (temp) {
					let att = get.attitude(event.player, i);
					if ((!att && sgsxjxfzmnl_sbbiyue) || att * temp > 0) targets.push([i, temp, att]);
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
				if (Math.abs(targets[i][1]) < cards[i] / (1 + sgsxjxfzmnl_sbbiyue)) {
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
	//阴间祢衡
	sgsxjxfzmnl_kuangcai: {
		audio: 'kuangcai',
		trigger: { player: "phaseUseBegin" },
		filter(event, player) {
			return !event.player.isMad();
		},
		content() {
			game.broadcastAll(function (player) {
				if (!player.forceCountChoose) {
					player.forceCountChoose = {};
				}
				var numxl = player.starLevel||0;
				var numxx = 5+numxl;
				player.forceCountChoose.phaseUse = numxx;
			}, player);
			player.addSkill("sgsxjxfzmnl_kuangcai_use");
			player.addSkill("sgsxjxfzmnl_kuangcai_cancel");
			//ui.auto.hide();
		},
		subSkill: {
			use: {
				mod: {
					cardUsable(card) {
						if (get.info(card) && get.info(card).forceUsable) {
							return;
						}
						return Infinity;
					},
					targetInRange() {
						return true;
					},
					aiOrder(player, card, num) {
						var name = get.name(card);
						if (name == "tao") {
							return num + 7 + Math.pow(player.getDamagedHp(), 2);
						}
						if (name == "sha") {
							return num + 6;
						}
						if (get.subtype(card) == "equip2") {
							return num + get.value(card) / 3;
						}
					},
				},
				trigger: { player: "useCard" },
				forced: true,
				charlotte: true,
				silent: true,
				popup: false,
				filter(event, player) {
					if (!player.forceCountChoose || !player.forceCountChoose.phaseUse) {
						return false;
					}
					return true;
				},
				content() {
					player.draw();
					if (player.forceCountChoose.phaseUse == 1) {
						var evt = event.getParent("phaseUse");
						if (evt) {
							evt.skipped = true;
						}
					} else {
						game.broadcastAll(function (player) {
							player.forceCountChoose.phaseUse--;
						}, player);
					}
				},
			},
			cancel: {
				trigger: { player: "phaseUseEnd" },
				firstDo: true,
				silent: true,
				charlotte: true,
				content() {
					game.broadcastAll(function (player) {
						delete player.forceCountChoose;
					}, player);
					//ui.auto.show();
					player.removeSkill("sgsxjxfzmnl_kuangcai_use");
					player.removeSkill("sgsxjxfzmnl_kuangcai_cancel");
				},
			},
		},
		ai: {
			threaten: 4.5,
		},
	},
	sgsxjxfzmnl_shejian: {
		audio: 'shejian',
		trigger: { player: "phaseDiscardEnd" },
		direct: true,
		filter(event, player) {
			var cards = [];
			player.getHistory("lose", function (evt) {
				if (evt.type == "discard" && evt.getParent("phaseDiscard") == event) {
					cards.addArray(evt.cards2);
				}
			});
			if (cards) {
				return true;
			}
			return false;
		},
		content() {
			"step 0";
			var cards = [];
			player.getHistory("lose", function (evt) {
				if (evt.type == "discard" && evt.getParent("phaseDiscard") == trigger) {
					cards.addArray(evt.cards2);
				}
			});
			event.num = cards.length||1;
			player.chooseTarget(get.prompt("sgsxjxfzmnl_shejian"), "弃置一名其他角色的"+event.num+"张牌", function (card, player, target) {
				if (player == target) {
					return false;
				}
				return target.countDiscardableCards(player, "he") > 0;
			}).ai = function (target) {
				return -get.attitude(player, target);
			};
			"step 1";
			if (result.bool) {
				player.logSkill("sgsxjxfzmnl_shejian", result.targets);
				player.discardPlayerCard(result.targets[0],event.num, "he", true);
			} else {
				event.finish();
			}
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
		audio:'xinfu_limu',
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
	//神荀彧
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
			return event.card.name == "qizhengxiangsheng" || get.zhinangs().includes(event.card.name) || player.getStorage("dinghan").includes(event.card.name);
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
			return !player.getStorage("dinghan").includes(event.card.name);
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
		intro: { content: function(storage,player){
			return '已记录'+player.getStorage("dinghan")
		} },
		group: "sgsxjxfzmnl_dinghan_add",
		subSkill: {
			add: {
				trigger: { player: "phaseBegin" },
				direct: true,
				content() {
					'step 0'
					var dialog = [get.prompt('sgsxjxfzmnl_dinghan')];
					(list1 = player.getStorage("dinghan")),
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
						if (player.getStorage("dinghan").includes(name)) {
							return -get.effect(player, { name: name }, player, player);
						} else {
							return get.effect(player, { name: name }, player, player) * (1 + player.countCards("hs", name));
						}
					});
					'step 1'
					if(result.links){
						player.logSkill("sgsxjxfzmnl_dinghan");
						var listx=[],listy=[];
						for(var i of  result.links){
							var name = i[2];
							if (player.getStorage("dinghan").includes(name)) {
								listx.push([name])
								player.unmarkAuto("dinghan", [name]);
								// game.log(player, "从定汉记录中移除了", "#y" + get.translation(name));
							} else {
								listy.push([name])
								player.markAuto("dinghan", [name]);
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
					}
				},
			},
		},
	},
	//神张飞
	sgsxjxfzmnl_shencai: {
		audio: 'shencai',
		enable: "phaseUse",
		usable(skill, player) {
			return 1 + player.countMark("sgsxjxfzmnl_shencai");
		},
		filterTarget: lib.filter.notMe,
		onremove: true,
		prompt: "选择一名其他角色进行地狱审判",
		content() {
			var next = target.judge();
			next.callback = lib.skill.sgsxjxfzmnl_shencai.contentx;
		},
		ai: {
			order: 8,
			result: { target: -1 },
		},
		contentx() {
			var card = event.judgeResult.card;
			var player = event.getParent(2).player;
			var target = event.getParent(2).target;
			if (get.position(card, true) == "o") {
				player.gain(card, "gain2");
			}
			var list = [],
				str = get.cardDescription(card, player);
			for (var i in lib.skill.sgsxjxfzmnl_shencai.filterx) {
				if (str.indexOf(lib.skill.sgsxjxfzmnl_shencai.filterx[i]) != -1) {
					list.push("sgsxjxfzmnl_shencai_" + i);
				}
			}
			if (list.length) {
				for (var i in lib.skill.sgsxjxfzmnl_shencai.filterx) {
					var num = target.countMark("sgsxjxfzmnl_shencai_" + i);
					if (num > 0) {
						target.removeMark("sgsxjxfzmnl_shencai_" + i, num);
						target.removeSkill("sgsxjxfzmnl_shencai_" + i);
					}
				}
				if (target.isIn()) {
					for (var i of list) {
						target.addSkill(i);
						target.addMark(i, 1);
					}
				}
			} else if (target.isIn()) {
				player.gainPlayerCard(target, true, "hej");
				target.addMark("sgsxjxfzmnl_shencai_death", 1);
				target.addSkill("sgsxjxfzmnl_shencai_death");
			}
		},
		filterx: {
			losehp: "体力",
			weapon: "武器",
			respond: "打出",
			distance: "距离",
		},
		getStr(node) {
			var str = "",
				name = node.name;
			if (lib.translate[name + "_info"]) {
				if (lib.card[name].type && lib.translate[lib.card[name].type]) {
					str += "" + get.translation(lib.card[name].type) + "牌|";
				}
				if (get.subtype(name)) {
					str += "" + get.translation(get.subtype(name)) + "|";
				}
				if (lib.card[name] && lib.card[name].addinfomenu) {
					str += "" + lib.card[name].addinfomenu + "|";
				}
				if (get.subtype(name) == "equip1") {
					var added = false;
					if (lib.card[node.name] && lib.card[node.name].distance) {
						var dist = lib.card[node.name].distance;
						if (dist.attackFrom) {
							added = true;
							str += "攻击范围：" + (-dist.attackFrom + 1) + "|";
						}
					}
					if (!added) {
						str += "攻击范围：1|";
					}
				}
			}
			if (lib.card[name].cardPrompt) {
				str += "" + lib.card[name].cardPrompt(node) + "|";
			} else if (lib.translate[name + "_info"]) {
				str += "" + lib.translate[name + "_info"] + "|";
			}
			if (lib.translate[name + "_append"]) {
				str += "" + lib.translate[name + "_append"] + "|";
			}
			if (get.is.yingbianConditional(node)) {
				const yingbianEffects = get.yingbianEffects(node);
				if (!yingbianEffects.length) {
					const defaultYingbianEffect = get.defaultYingbianEffect(node);
					if (lib.yingbian.prompt.has(defaultYingbianEffect)) {
						yingbianEffects.push(defaultYingbianEffect);
					}
				}
				if (yingbianEffects.length) {
					str += `应变：${yingbianEffects.map(value => lib.yingbian.prompt.get(value)).join("；")}|`;
				}
			}
			return str;
		},
		subSkill: {
			losehp: {
				charlotte: true,
				marktext: "笞",
				trigger: { player: "damageEnd" },
				forced: true,
				content() {
					player.loseHp(trigger.num);
				},
				ai: {
					effect: {
						target(card, player, target, current) {
							if (get.tag(card, "damage") && current < 0 && !target._shencai_losehp_effect) {
								target._shencai_losehp_effect = true;
								let eff = get.effect(target, { name: "losehp" }, target, target) / 10;
								delete target._shencai_losehp_effect;
								return [1, eff];
							}
						},
					},
				},
				intro: {
					name: "阴间神裁 - 体力",
					name2: "笞",
					content: "锁定技。当你受到伤害后，你失去等量的体力。",
					onunmark: true,
				},
			},
			weapon: {
				charlotte: true,
				marktext: "杖",
				trigger: { target: "useCardToTargeted" },
				forced: true,
				filter(event, player) {
					// return event.card.name == "sha";
					return true;
				},
				content() {
					trigger.directHit.add(player);
					game.log(player, "不可响应", trigger.card);
				},
				intro: {
					name: "阴间神裁 - 武器",
					name2: "杖",
					content: "锁定技。当你成为【杀】的目标后，你不能使用牌响应此【杀】。",
					onunmark: true,
				},
				global: "sgsxjxfzmnl_shencai_weapon_ai",
			},
			ai: {
				ai: {
					directHit_ai: true,
					skillTagFilter(player, tag, arg) {
						if (!arg || !arg.card ) {
							return false;
						}
						if (!arg.target || !arg.target.hasSkill("sgsxjxfzmnl_shencai_weapon")) {
							return false;
						}
						return true;
					},
				},
			},
			respond: {
				charlotte: true,
				marktext: "徒",
				trigger: {
					player: "loseAfter",
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				forced: true,
				filter(event, player) {
					if (
						!player.hasCard(function (card) {
							return lib.filter.cardDiscardable(card, player, "sgsxjxfzmnl_shencai_respond");
						}, "h")
					) {
						return false;
					}
					var evt = event.getParent("sgsxjxfzmnl_shencai_respond");
					if (evt && evt.player == player) {
						return false;
					}
					evt = event.getl(player);
					return evt && evt.hs && evt.hs.length > 0;
				},
				content() {
					var cards = player.getCards("h", function (card) {
						return lib.filter.cardDiscardable(card, player, "sgsxjxfzmnl_shencai_respond");
					});
					if (cards.length > 0) {
						player.discard(cards.randomGet());
					}
				},
				intro: {
					name: "阴间神裁 - 打出",
					name2: "徒",
					content: "锁定技。当你失去手牌后，你随机弃置一张手牌（不嵌套触发）。",
					onunmark: true,
				},
			},
			distance: {
				charlotte: true,
				marktext: "流",
				trigger: { player: "phaseJieshuBegin" },
				forced: true,
				content() {
					player.turnOver();
				},
				intro: {
					name: "阴间神裁 - 距离",
					name2: "流",
					content: "锁定技。结束阶段开始时，你翻面。",
					onunmark: true,
				},
			},
			death: {
				charlotte: true,
				marktext: "死",
				mod: {
					maxHandcard(player, num) {
						return num - player.countMark("sgsxjxfzmnl_shencai_death");
					},
				},
				trigger: { player: "phaseEnd" },
				forced: true,
				filter(event, player) {
					return player.countMark("sgsxjxfzmnl_shencai_death") > game.countPlayer();
				},
				content() {
					player.die();
				},
				intro: {
					name: "阴间神裁 - 死",
					name2: "死",
					content: "锁定技。你的角色手牌上限-#；回合结束时，若场上存活人数小于#，则你死亡。",
					onunmark: true,
				},
			},
		},
		mark: true,
		intro: {
			markcount: (storage = 0) => storage + 1,
			content: (storage = 0) => "当前最大发动次数：" + (storage + 1),
		},
	},
	sgsxjxfzmnl_xunshi: {
		audio: 'xunshi',
		mod: {
			cardname(card) {
				if (lib.skill.xunshi.isXunshi(card)) {
					return "sha";
				}
			},
			cardnature(card) {
				if (lib.skill.xunshi.isXunshi(card)) {
					return false;
				}
			},
			suit(card) {
				if (lib.skill.xunshi.isXunshi(card)) {
					return "none";
				}
			},
			targetInRange(card) {
				const suit = get.color(card);
				if (suit == "none" || suit == "unsure") {
					return true;
				}
			},
			cardUsable(card) {
				const suit = get.color(card);
				if (suit == "none" || suit == "unsure") {
					return Infinity;
				}
			},
			selectTarget(card, player, range) {
				const suit = get.color(card);
				if (suit == "none" || suit == "unsure") {
					if(range[1]==-1) return;
					range[1]=Infinity;
				}
			}
		},
		isXunshi(card) {
			var info = lib.card[card.name];
			if (!info || (info.type != "trick" && info.type != "delay")) {
				return false;
			}
			if (info.notarget) {
				return false;
			}
			if (info.selectTarget != undefined) {
				if (Array.isArray(info.selectTarget)) {
					if (info.selectTarget[0] < 0) {
						return !info.toself;
					}
					return info.selectTarget[0] != 1 || info.selectTarget[1] != 1;
				} else {
					if (info.selectTarget < 0) {
						return !info.toself;
					}
					return info.selectTarget != 1;
				}
			}
			return false;
		},
		trigger: { player: "useCard2" },
		forced: true,
		filter(event, player) {
			return get.suit(event.card) == "none";
		},
		content() {
			"step 0";
			player.addMark("sgsxjxfzmnl_xunshi", 1, false);
			'step 1'
			if (player.hasSkill("sgsxjxfzmnl_shencai", null, null, false)) {
				if(player.countMark('sgsxjxfzmnl_xunshi')){
					player.addMark("sgsxjxfzmnl_shencai", player.countMark('sgsxjxfzmnl_xunshi'), false);
				}
			}
			if (trigger.addCount !== false) {
				trigger.addCount = false;
				var stat = player.getStat().card,
					name = trigger.card.name;
				if (typeof stat[name] == "number") {
					stat[name]--;
				}
			}
		},
	},
	//武诸葛
	sgsxjxfzmnl_dcjincui: {
		audio: 'dcjincui',
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			return true;
		},
		forced: true,
		group: "sgsxjxfzmnl_dcjincui_advent",
		async content(event, trigger, player) {
			// let num = 0;
			// for (let i = 0; i < ui.cardPile.childNodes.length; i++) {
			// 	let card = ui.cardPile.childNodes[i];
			// 	if (get.number(card) == 7) {
			// 		num++;
			// 		if (num >= player.maxHp) {
			// 			break;
			// 		}
			// 	}
			// }
			// if (num < 1) {
			// 	num = 1;
			// }
			// if (num > player.hp) {
			// 	await player.recover(num - player.hp);
			// } else if (num < player.hp) {
			// 	await player.loseHp(player.hp - num);
			// }
			await player.recover(player.maxHp-player.hp);
			const result = await player
				.chooseToGuanxing(player.hp)
				.set("prompt", "尽瘁：点击或拖动将牌移动到牌堆顶或牌堆底")
				.set("processAI", list => {
					let cards = list[0][1],
						player = _status.event.player,
						target = _status.currentPhase || player,
						name = _status.event.getTrigger().name,
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
						top = [],
						bottom = [];
					for (let i = 0; i < cards.length; i++) {
						if (get.number(cards[i]) == 7) {
							bottom.addArray(cards.splice(i--, 1));
						}
					}
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
								bottom.addArray(cards);
								return [top, bottom];
							}
							cards.sort((a, b) => {
								return (get.value(b, target) - get.value(a, target)) * att;
							});
							while (needs--) {
								top.unshift(cards.shift());
							}
							while (cards.length) {
								if (get.value(cards[0], target) > 6 == att > 0) {
									top.unshift(cards.shift());
								} else {
									break;
								}
							}
							bottom.addArray(cards);
							return [top, bottom];
						}
						default:
							cards.sort((a, b) => {
								return get.value(b, target) - get.value(a, target);
							});
							while (cards.length) {
								if (get.value(cards[0], target) > 6) {
									top.unshift(cards.shift());
								} else {
									break;
								}
							}
							bottom.addArray(cards);
							return [top, bottom];
					}
				})
				.forResult();
			if (!result.bool || !result.moved[0].length) {
				player.addTempSkill("guanxing_fail");
			}
		},
		ai: {
			guanxing: true,
			effect: {
				target(card, player, target) {
					if (!get.tag(card, "damage")) {
						return;
					}
					var num = 0,
						bool = false;
					for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
						var card = ui.cardPile.childNodes[i];
						if (get.number(card) == 7) {
							num++;
							if (num >= target.hp) {
								bool = true;
								break;
							}
						}
					}
					if (bool) {
						return 0.2;
					}
				},
			},
			threaten: 0.6,
		},
		subSkill: {
			advent: {
				audio: "dcjincui",
				trigger: { global: "phaseBefore", player: "enterGame" },
				forced: true,
				filter(event, player) {
					return (event.name != "phase" || game.phaseNumber == 0) && player.countCards("h") < 7;
				},
				content() {
					player.drawTo(7);
				},
			},
		},
	},
	sgsxjxfzmnl_dcqingshi: {
		audio: 'dcqingshi',
		trigger: { player: "useCard" },
		filter(event, player) {
			if (!player.isPhaseUsing()) {
				return false;
			}
			if (player.getStorage("sgsxjxfzmnl_dcqingshi_clear").includes(event.card.name)) {
				return false;
			}
			// if (
			// 	player.hasCard(card => {
			// 		return get.name(card) == event.card.name;
			// 	})
			// ) {
			// 	return true;
			// }
			// return false;
			return true;
		},
		direct: true,
		content() {
			"step 0";
			var choices = [];
			var choiceList = ["令" + get.translation(trigger.card) + "对其中一个目标角色造成的伤害+X（X为与其同势力的角色数）", "令任意名其他角色各摸Y张牌（Y为场上蜀势力角色数）", "摸七张牌"];
			if (trigger.targets && trigger.targets.length) {
				choices.push("选项一");
			} else {
				choiceList[0] = '<span style="opacity:0.5">' + choiceList[0] + "(无目标角色)</span>";
			}
			if (game.countPlayer(i => i != player)) {
				choices.push("选项二");
			} else {
				choiceList[1] = '<span style="opacity:0.5">' + choiceList[1] + "</span>";
			}
			choices.push("选项三");
			player
				.chooseControl(choices, "cancel2")
				.set("choiceList", choiceList)
				.set("prompt", get.prompt("sgsxjxfzmnl_dcqingshi"))
				.set("ai", () => {
					return _status.event.choice;
				})
				.set(
					"choice",
					(() => {
						var choicesx = choices.slice();
						var cards = player.getCards("hs");
						var bool1 =
								get.tag(trigger.card, "damage") &&
								choicesx.includes("选项一") &&
								trigger.targets.some(current => {
									return get.attitude(player, current) < 0;
								}),
							bool2 = choicesx.includes("选项二");
						if (bool2) {
							bool2 = game.countPlayer(function (current) {
								return player != current && get.attitude(player, current) > 0;
							});
						} else {
							bool2 = 0;
						}
						if (bool1 || bool2) {
							for (var i = 0; i < cards.length; i++) {
								var name = get.name(cards[i]);
								if (player.getStorage("sgsxjxfzmnl_dcqingshi_clear").includes(name)) {
									continue;
								}
								for (var j = i + 1; j < cards.length; j++) {
									if (name === get.name(cards[j]) && get.position(cards[i]) + get.position(cards[j]) !== "ss" && player.hasValueTarget(cards[i])) {
										choicesx.remove("选项三");
										break;
									}
								}
							}
						}
						if (bool2 > 2) {
							return "选项二";
						}
						if (choicesx.includes("选项三")) {
							return "选项三";
						}
						if (bool2 === 2) {
							return "选项二";
						}
						if (bool1) {
							return "选项一";
						}
						if (bool2) {
							return "选项二";
						}
						return "cancel2";
					})()
				);
			"step 1";
			if (result.control != "cancel2") {
				player.logSkill("sgsxjxfzmnl_dcqingshi");
				game.log(player, "选择了", "#y" + result.control);
				var index = ["选项一", "选项二", "选项三"].indexOf(result.control) + 1;
				player.addTempSkill("sgsxjxfzmnl_dcqingshi_clear");
				player.markAuto("sgsxjxfzmnl_dcqingshi_clear", [trigger.card.name]);
				var next = game.createEvent("sgsxjxfzmnl_dcqingshi_after");
				next.player = player;
				next.card = trigger.card;
				next.setContent(lib.skill.sgsxjxfzmnl_dcqingshi["content" + index]);
			}
		},
		content1() {
			"step 0";
			player
				.chooseTarget("令" + get.translation(card) + "对其中一个目标造成的伤害+X（X为与其同势力的角色数）", true, (card, player, target) => {
					return _status.event.targets.includes(target);
				})
				.set("ai", target => {
					return 2 - get.attitude(_status.event.player, target);
				})
				.set("targets", event.getParent().getTrigger().targets);
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.line(target);
				player.addTempSkill("sgsxjxfzmnl_dcqingshi_ex");
				if (!player.storage.sgsxjxfzmnl_dcqingshi_ex) {
					player.storage.sgsxjxfzmnl_dcqingshi_ex = [];
				}
				player.storage.sgsxjxfzmnl_dcqingshi_ex.push([target, card]);
			}
		},
		content2() {
			"step 0";
			player.chooseTarget("令任意名其他角色各摸Y张牌（Y为场上蜀势力角色数）", [1, Infinity], true, lib.filter.notMe).set("ai", target => {
				return get.attitude(_status.event.player, target);
			});
			"step 1";
			if (result.bool) {
				var targets = result.targets;
				targets.sortBySeat();
				player.line(targets);
				var num = game.countPlayer(i=>i.group=='shu')
				game.asyncDraw(targets);
				game.delayex();
			}
		},
		content3() {
			"step 0";
			player.draw(7);
			// player.tempBanSkill("dcqingshi");
		},
		subSkill: {
			ex: {
				trigger: { source: "damageBegin1" },
				filter(event, player) {
					return (
						player.storage.sgsxjxfzmnl_dcqingshi_ex &&
						player.storage.sgsxjxfzmnl_dcqingshi_ex.some(info => {
							return info[0] == event.player && info[1] == event.card;
						})
					);
				},
				forced: true,
				charlotte: true,
				popup: false,
				onremove: true,
				content() {
					var num = game.countPlayer(i=>i.group==trigger.player.group);
					trigger.num+=num;
					for (var i = 0; i < player.storage.sgsxjxfzmnl_dcqingshi_ex.length; i++) {
						if (player.storage.sgsxjxfzmnl_dcqingshi_ex[i][1] == trigger.card) {
							player.storage.sgsxjxfzmnl_dcqingshi_ex.splice(i--, 1);
						}
					}
				},
			},
			clear: {
				onremove: true,
				charlotte: true,
			},
		},
		ai: {
			threaten: 6,
		},
	},
	sgsxjxfzmnl_dczhizhe: {
		audio: 'dczhizhe',
		enable: "phaseUse",
		limited: true,
		filterCard: true,
		position: "h",
		discard: false,
		lose: false,
		delay: false,
		skillAnimation: true,
		animationColor: "metal",
		check(card) {
			if (get.type(card) != "basic" && get.type(card) != "trick") {
				return 0;
			}
			return get.value(card) - 7.5;
		},
		content() {
			"step 0";
			var card = cards[0];
			player.awakenSkill(event.name);
			var cardx = game.createCard2(card.name, card.suit, card.number, card.nature);
			player.gain(cardx).gaintag.add("sgsxjxfzmnl_dczhizhe");
			player.addSkill("sgsxjxfzmnl_dczhizhe_effect");
		},
		ai: {
			order: 15,
			result: {
				player: 1,
			},
		},
		subSkill: {
			effect: {
				mod: {
					aiOrder(player, card, num) {
						if (num > 0 && get.itemtype(card) === "card" && card.hasGaintag("sgsxjxfzmnl_dczhizhe")) {
							return num + 0.16;
						}
					},
					aiValue(player, card, num) {
						if (num > 0 && get.itemtype(card) === "card" && card.hasGaintag("sgsxjxfzmnl_dczhizhe")) {
							return 2 * num;
						}
					},
					aiUseful(player, card, num) {
						if (num > 0 && !player._dczhizhe_mod && get.itemtype(card) === "card" && card.hasGaintag("sgsxjxfzmnl_dczhizhe")) {
							if (player.canIgnoreHandcard(card)) {
								return Infinity;
							}
							player._dczhizhe_mod = true;
							if (
								player.hp < 3 &&
								player.needsToDiscard(0, (i, player) => {
									return !player.canIgnoreHandcard(i) && get.useful(i) > 6;
								})
							) {
								return num * 1.5;
							}
							return num * 10;
						}
					},
					cardDiscardable(card) {
						if (card.hasGaintag("sgsxjxfzmnl_dczhizhe")) {
							return false;
						}
					},
					
				},
				audio: "dczhizhe",
				trigger: { player: ["useCardAfter", "respondAfter"] },
				charlotte: true,
				forced: true,
				filter(event, player) {
					return player.hasHistory("lose", function (evt) {
						if ((evt.relatedEvent || evt.getParent()) != event) {
							return false;
						}
						for (var i in evt.gaintag_map) {
							if (evt.gaintag_map[i].includes("sgsxjxfzmnl_dczhizhe")) {
								if (
									event.cards.some(card => {
										return get.position(card, true) == "o" && card.cardid == i;
									})
								) {
									return true;
								}
							}
						}
						return false;
					});
				},
				content() {
					"step 0";
					var cards = [];
					player.getHistory("lose", function (evt) {
						if ((evt.relatedEvent || evt.getParent()) != trigger) {
							return false;
						}
						for (var i in evt.gaintag_map) {
							if (evt.gaintag_map[i].includes("sgsxjxfzmnl_dczhizhe")) {
								var cardsx = trigger.cards.filter(card => {
									return get.position(card, true) == "o" && card.cardid == i;
								});
								if (cardsx.length) {
									cards.addArray(cardsx);
								}
							}
						}
					});
					if (cards.length) {
						player.gain(cards, "gain2").gaintag.addArray(["sgsxjxfzmnl_dczhizhe", "sgsxjxfzmnl_dczhizhe_clear"]);
						player.addTempSkill("sgsxjxfzmnl_dczhizhe_clear");
					}
				},
			},
			clear: {
				charlotte: true,
				onremove(player) {
					player.removeGaintag("sgsxjxfzmnl_dczhizhe_clear");
				},
				mod: {
					cardEnabled2(card, player) {
						var cards = [];
						if (card.cards) {
							cards.addArray(cards);
						}
						if (get.itemtype(card) == "card") {
							cards.push(card);
						}
						for (var cardx of cards) {
							if (cardx.hasGaintag("sgsxjxfzmnl_dczhizhe_clear")) {
								return false;
							}
						}
					},
					cardRespondable(card, player) {
						var cards = [];
						if (card.cards) {
							cards.addArray(cards);
						}
						if (get.itemtype(card) == "card") {
							cards.push(card);
						}
						for (var cardx of cards) {
							if (cardx.hasGaintag("sgsxjxfzmnl_dczhizhe_clear")) {
								return false;
							}
						}
					},
					cardSavable(card, player) {
						var cards = [];
						if (card.cards) {
							cards.addArray(cards);
						}
						if (get.itemtype(card) == "card") {
							cards.push(card);
						}
						for (var cardx of cards) {
							if (cardx.hasGaintag("sgsxjxfzmnl_dczhizhe_clear")) {
								return false;
							}
						}
					},
				},
			},
		},
	},
	
	//曹丕
	sgsxjxfzmnl_sbxingshang: {
		// getLimit: 9,
		getList: [
			{
				cost: 2,
				prompt: () => "令一名角色复原武将牌",
				filter: () => game.hasPlayer(target => target.isLinked() || target.isTurnedOver()),
				filterTarget: (card, player, target) => target.isLinked() || target.isTurnedOver(),
				async content(player, target) {
					if (target.isLinked()) {
						await target.link(false);
					}
					if (target.isTurnedOver()) {
						await target.turnOver(false);
					}
				},
				ai: {
					result: {
						target(player, target) {
							let res = 0;
							if (target.isLinked()) {
								res = 0.3;
							}
							if (target.isTurnedOver()) {
								res += 3.5 * get.threaten(target, player);
							}
							return res;
						},
					},
				},
			},
			{
				cost: 2,
				prompt: () => "令一名角色摸X张牌（X为本场已死亡角色数，至少为2）",
				filter: () => true,
				filterTarget: true,
				async content(player, target) {
					var num = Math.max(game.dead.length,2)
					await target.draw(num);
				},
				ai: {
					result: {
						player(player, target) {
							return get.effect(target, { name: "draw" }, player, player) * 3;
						},
					},
				},
			},
			{
				cost: 5,
				prompt: () => "令一名角色回复X点体力，增加X点体力上限，随机恢复一个已废除的装备栏（X为本场已死亡角色数）",
				filter: () => true,
				filterTarget: (card, player, target) => true,
				async content(player, target) {
					var num = game.dead.length;
					await target.recover(num);
					await target.gainMaxHp(num);
					let list = Array.from({ length: 13 }).map((_, i) => "equip" + parseFloat(i + 1));
					list = list.filter(i => target.hasDisabledSlot(i));
					if (list.length) {
						await target.enableEquip(list.randomGet());
					}
				},
				ai: {
					result: {
						target(player, target) {
							let res = 0.2;
							if (target.isHealthy()) {
								res += 0.4;
							}
							if (
								Array.from({ length: 5 })
									.map((_, i) => "equip" + parseFloat(i + 1))
									.some(i => target.hasDisabledSlot(i))
							) {
								res += 0.3;
							}
							return res + get.recoverEffect(target, target, target) / 16;
						},
					},
				},
			},
			{
				cost: 5,
				prompt: () => "获得一名已阵亡角色的武将牌上的所有技能，然后失去〖行殇〗〖放逐〗〖颂威〗",
				filter: () => game.dead.some(target => target.getStockSkills(true, true).some(i => get.info(i) && !get.info(i).charlotte)),
				filterTarget(card, player, target) {
					if (!target.isDead()) {
						return false;
					}
					return target.getStockSkills(true, true).some(i => get.info(i) && !get.info(i).charlotte);
				},
				deadTarget: true,
				async content(player, target) {
					await player.changeSkills(
						target.getStockSkills(true, true).filter(skill => get.info(skill) && !get.info(skill).charlotte),
						["sgsxjxfzmnl_sbxingshang", "sgsxjxfzmnl_sbfangzhu", "sgsxjxfzmnl_sbsongwei"]
					);
				},
				ai: {
					result: {
						player(player, target) {
							return ["name", "name1", "name2"].reduce((sum, name) => {
								if (!target[name] || !lib.character[target[name]] || (name == "name1" && target.name1 == target.name)) {
									return sum;
								}
								return sum + get.rank(target[name], true);
							}, 0);
						},
					},
				},
			},
		],
		marktext: "颂",
		intro: {
			name: "颂",
			content: "mark",
		},
		audio: 'sbxingshang',
		enable: "phaseUse",
		filter(event, player) {
			return get.info("sgsxjxfzmnl_sbxingshang").getList.some(effect => {
				return player.countMark("sgsxjxfzmnl_sbxingshang") >= effect.cost && effect.filter(player);
			});
		},
		// usable: 2,
		chooseButton: {
			dialog() {
				let dialog = ui.create.dialog("行殇：请选择一项", "hidden");
				const list = get.info("sgsxjxfzmnl_sbxingshang").getList.slice();
				dialog.add([
					list.map(effect => {
						return [effect, "移去" + effect.cost + "个“颂”标记，" + effect.prompt()];
					}),
					"textbutton",
				]);
				return dialog;
			},
			filter(button, player) {
				const effect = button.link;
				return player.countMark("sgsxjxfzmnl_sbxingshang") >= effect.cost && effect.filter(player);
			},
			check(button) {
				const player = get.event().player,
					effect = button.link;
				return Math.max(
					...game
						.filterPlayer(target => {
							const filterTarget = effect.filterTarget;
							if (!filterTarget) {
								return target == player;
							}
							if (typeof filterTarget == "function") {
								return filterTarget(null, player, target);
							}
							return true;
						})
						.map(target => {
							game.broadcastAll(effect => (lib.skill["sgsxjxfzmnl_sbxingshang_aiSkill"].ai = effect.ai), effect);
							return get.effect(target, "sgsxjxfzmnl_sbxingshang_aiSkill", player, player);
						})
				);
			},
			backup(links, player) {
				const effect = links[0];
				return {
					effect: effect,
					audio: "sgsxjxfzmnl_sbxingshang",
					filterCard: () => false,
					selectCard: -1,
					filterTarget: effect.filterTarget,
					deadTarget: effect.deadTarget,
					async content(event, trigger, player) {
						const target = event.targets[0],
							effect = lib.skill.sgsxjxfzmnl_sbxingshang_backup.effect;
						player.removeMark("sgsxjxfzmnl_sbxingshang", effect.cost);
						await effect.content(player, target);
					},
					ai: effect.ai,
				};
			},
			prompt(links, player) {
				const effect = links[0],
					str = "###行殇###";
				return str + '<div class="text center">' + "移去" + effect.cost + "个“颂”标记，" + effect.prompt() + "</div>";
			},
		},
		ai: {
			order: 6.5,
			result: {
				player(player) {
					const list = get.info("sgsxjxfzmnl_sbxingshang").getList.filter(effect => {
						return player.countMark("sgsxjxfzmnl_sbxingshang") >= effect.cost && effect.filter(player);
					});
					return Math.max(
						...list.map(effect => {
							return Math.max(
								...game
									.filterPlayer(target => {
										const filterTarget = effect.filterTarget;
										if (!filterTarget) {
											return target == player;
										}
										if (typeof filterTarget == "function") {
											return filterTarget(null, player, target);
										}
										return true;
									})
									.map(target => {
										game.broadcastAll(effect => (lib.skill["sgsxjxfzmnl_sbxingshang_aiSkill"].ai = effect.ai), effect);
										return get.effect(target, "sgsxjxfzmnl_sbxingshang_aiSkill", player, player);
									})
							);
						})
					);
				},
			},
		},
		group: "sgsxjxfzmnl_sbxingshang_gain",
		subSkill: {
			aiSkill: {},
			backup: {},
			gain: {
				audio: "sgsxjxfzmnl_sbxingshang",
				trigger: { global: ["die", "damageEnd"] },
				filter(event, player) {
					return true;
					// if (player.countMark("sbxingshang") >= get.info("sbxingshang").getLimit) {
					// 	return false;
					// }
					// return event.name == "die" || !player.getHistory("custom", evt => evt.sbxingshang).length;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					player.addMark("sgsxjxfzmnl_sbxingshang", 2);
					// if (trigger.name == "damage") {
					// 	player.getHistory("custom").push({ sgsxjxfzmnl_sbxingshang: true });
					// }
				},
			},
		},
	},
	sgsxjxfzmnl_sbfangzhu: {
		getList: [
			{
				cost: 1,
				prompt: () => "令一名其他角色于手牌中只能使用基本牌直到其回合结束",
				filter: player => game.hasPlayer(target => target != player && !target.getStorage("sgsxjxfzmnl_sbfangzhu_ban").includes("basic")),
				filterTarget: (card, player, target) => target != player && !target.getStorage("sgsxjxfzmnl_sbfangzhu_ban").includes("basic"),
				async content(player, target) {
					target.addTempSkill("sgsxjxfzmnl_sbfangzhu_ban", { player: "phaseEnd" });
					target.markAuto("sgsxjxfzmnl_sbfangzhu_ban", ["basic"]);
					lib.skill.sgsxjxfzmnl_sbfangzhu_ban.init(target, "sgsxjxfzmnl_sbfangzhu_ban");
				},
				ai: {
					result: {
						target(player, target) {
							return -(target.countCards("hs") + 2) / 3;
						},
					},
				},
			},
			{
				cost: 2,
				prompt: () => "令一名其他角色于手牌中只能使用锦囊牌直到其回合结束",
				filter: player => game.hasPlayer(target => target != player && !target.getStorage("sgsxjxfzmnl_sbfangzhu_ban").includes("trick")),
				filterTarget: (card, player, target) => target != player && !target.getStorage("sgsxjxfzmnl_sbfangzhu_ban").includes("trick"),
				async content(player, target) {
					target.addTempSkill("sgsxjxfzmnl_sbfangzhu_ban", { player: "phaseEnd" });
					target.markAuto("sgsxjxfzmnl_sbfangzhu_ban", ["trick"]);
					lib.skill.sgsxjxfzmnl_sbfangzhu_ban.init(target, "sgsxjxfzmnl_sbfangzhu_ban");
				},
				ai: {
					result: {
						target(player, target) {
							return -(target.countCards("hs") + 2) / 2;
						},
					},
				},
			},
			{
				cost: 3,
				prompt: () => "令一名其他角色于手牌中只能使用装备牌直到其回合结束",
				filter: player => /*get.mode() != "doudizhu" && */game.hasPlayer(target => target != player && !target.getStorage("sgsxjxfzmnl_sbfangzhu_ban").includes("equip")),
				filterTarget: (card, player, target) => target != player && !target.getStorage("sgsxjxfzmnl_sbfangzhu_ban").includes("equip"),
				async content(player, target) {
					target.addTempSkill("sgsxjxfzmnl_sbfangzhu_ban", { player: "phaseEnd" });
					target.markAuto("sgsxjxfzmnl_sbfangzhu_ban", ["equip"]);
					lib.skill.sgsxjxfzmnl_sbfangzhu_ban.init(target, "sgsxjxfzmnl_sbfangzhu_ban");
				},
				ai: {
					result: {
						target(player, target) {
							return -target.countCards("hs") - 2;
						},
					},
				},
			},
			{
				cost: 2,
				prompt: () => "令一名其他角色的非Charlotte技能失效直到其回合结束",
				filter: player => /*get.mode() != "doudizhu" && */game.hasPlayer(target => target != player),
				filterTarget: lib.filter.notMe,
				async content(player, target) {
					target.addTempSkill("sgsxjxfzmnl_sbfangzhu_baiban", { player: "phaseEnd" });
				},
				ai: {
					result: {
						target(player, target) {
							return -target.getSkills(null, false).filter(i => get.info(i) && !get.info(i).charlotte).length * get.threaten(target, player);
						},
					},
				},
			},
			{
				cost: 2,
				prompt: () => "令一名其他角色不能响应除其外的角色使用的牌直到其回合结束",
				filter: player => game.hasPlayer(target => target != player && !target.hasSkill("sbfangzhu_kill")),
				filterTarget: lib.filter.notMe,
				async content(player, target) {
					target.addTempSkill("sgsxjxfzmnl_sbfangzhu_kill", { player: "phaseEnd" });
				},
				ai: {
					result: {
						target(player, target) {
							return -(target.countCards("hs") + 2) / target.hp;
						},
					},
				},
			},
			{
				cost: 3,
				prompt: () => "令一名其他角色将武将牌翻面",
				filter: player => /*get.mode() != "doudizhu" && */game.hasPlayer(target => target != player),
				filterTarget: lib.filter.notMe,
				async content(player, target) {
					await target.turnOver();
				},
				ai: {
					result: {
						target(player, target) {
							return target.isTurnedOver() ? 3.5 : -3.5;
						},
					},
				},
			},
		],
		audio: 'sbfangzhu',
		enable: "phaseUse",
		filter(event, player) {
			if(!player.hasSkill('sgsxjxfzmnl_sbxingshang'))return false;
			return get.info("sgsxjxfzmnl_sbfangzhu").getList.some(effect => {
				return player.countMark("sgsxjxfzmnl_sbxingshang") >= effect.cost && effect.filter(player);
			});
		},
		// usable: 1,
		chooseButton: {
			dialog() {
				let dialog = ui.create.dialog("放逐：请选择一项", "hidden");
				const list = get.info("sgsxjxfzmnl_sbfangzhu").getList.slice();
				dialog.add([
					list.map(effect => {
						return [effect, "移去" + effect.cost + "个“颂”标记，" + effect.prompt()];
					}),
					"textbutton",
				]);
				return dialog;
			},
			filter(button, player) {
				const effect = button.link;
				return player.countMark("sgsxjxfzmnl_sbxingshang") >= effect.cost && effect.filter(player);
			},
			check(button) {
				const player = get.event().player,
					effect = button.link;
				return Math.max(
					...game
						.filterPlayer(target => {
							const filterTarget = effect.filterTarget;
							if (!filterTarget) {
								return target == player;
							}
							if (typeof filterTarget == "function") {
								return filterTarget(null, player, target);
							}
							return true;
						})
						.map(target => {
							game.broadcastAll(effect => (lib.skill["sgsxjxfzmnl_sbxingshang_aiSkill"].ai = effect.ai), effect);
							return get.effect(target, "sgsxjxfzmnl_sbxingshang_aiSkill", player, player);
						})
				);
			},
			backup(links, player) {
				const effect = links[0];
				return {
					effect: effect,
					audio: "sgsxjxfzmnl_sbfangzhu",
					audioname: ["mb_caomao"],
					filterCard: () => false,
					selectCard: -1,
					filterTarget: effect.filterTarget,
					async content(event, trigger, player) {
						const target = event.targets[0],
							effect = lib.skill.sgsxjxfzmnl_sbfangzhu_backup.effect;
						player.removeMark("sgsxjxfzmnl_sbxingshang", effect.cost);
						await effect.content(player, target);
					},
					ai: effect.ai,
				};
			},
			prompt(links, player) {
				const effect = links[0],
					str = "###放逐###";
				return str + '<div class="text center">' + "移去" + effect.cost + "个“颂”标记，" + effect.prompt() + "</div>";
			},
		},
		ai: {
			combo: "sgsxjxfzmnl_sbxingshang",
			order: 7,
			result: {
				player(player) {
					const list = get.info("sgsxjxfzmnl_sbfangzhu").getList.filter(effect => {
						return player.countMark("sgsxjxfzmnl_sbxingshang") >= effect.cost && effect.filter(player);
					});
					return Math.max(
						...list.map(effect => {
							return Math.max(
								...game
									.filterPlayer(target => {
										const filterTarget = effect.filterTarget;
										if (!filterTarget) {
											return target == player;
										}
										if (typeof filterTarget == "function") {
											return filterTarget(null, player, target);
										}
										return true;
									})
									.map(target => {
										game.broadcastAll(effect => (lib.skill["sgsxjxfzmnl_sbxingshang_aiSkill"].ai = effect.ai), effect);
										return get.effect(target, "sgsxjxfzmnl_sbxingshang_aiSkill", player, player);
									})
							);
						})
					);
				},
			},
		},
		subSkill: {
			backup: {},
			baiban: {
				init(player, skill) {
					player.addSkillBlocker(skill);
					player.addTip(skill, "放逐 技能失效");
				},
				onremove(player, skill) {
					player.removeSkillBlocker(skill);
					player.removeTip(skill);
				},
				inherit: "baiban",
				marktext: "逐",
			},
			kill: {
				charlotte: true,
				mark: true,
				marktext: "禁",
				intro: { content: "不能响应其他角色使用的牌" },
				trigger: { global: "useCard1" },
				filter(event, player) {
					return event.player != player;
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					trigger.directHit.add(player);
				},
				init(player, skill) {
					player.addTip(skill, "放逐 无法响应");
				},
				onremove(player, skill) {
					player.removeTip(skill);
				},
			},
			ban: {
				charlotte: true,
				mark: true,
				marktext: "禁",
				intro: {
					markcount: () => 0,
					content(storage) {
						if (storage.length > 1) {
							return "不能使用手牌";
						}
						return "于手牌中只能使用" + get.translation(storage[0]) + "牌";
					},
				},
				init(player, skill) {
					let storage = player.getStorage(skill);
					if (storage.length) {
						player.addTip(skill, "放逐 限" + (storage.length === 1 ? get.translation(storage[0])[0] : "手牌"));
					}
				},
				onremove(player, skill) {
					player.removeTip(skill);
					delete player.storage[skill];
				},
				mod: {
					cardEnabled(card, player) {
						const storage = player.getStorage("sgsxjxfzmnl_sbfangzhu_ban");
						const hs = player.getCards("h"),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && (storage.length > 1 || !storage.includes(get.type2(card)))) {
							return false;
						}
					},
					cardSavable(card, player) {
						const storage = player.getStorage("sgsxjxfzmnl_sbfangzhu_ban");
						const hs = player.getCards("h"),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && (storage.length > 1 || !storage.includes(get.type2(card)))) {
							return false;
						}
					},
				},
			},
		},
	},
	sgsxjxfzmnl_sbsongwei: {
		audio: 'sbsongwei',
		trigger: { player: "phaseUseBegin" },
		filter(event, player) {
			if(!player.hasSkill('sgsxjxfzmnl_sbxingshang'))return false;
			// if (player.countMark("sgsxjxfzmnl_sbxingshang") >= get.info("sgsxjxfzmnl_sbxingshang").getLimit) {
			// 	return false;
			// }
			return game.hasPlayer(target => target.group == "wei" && target != player);
		},
		zhuSkill: true,
		forced: true,
		locked: false,
		async content(event, trigger, player) {
			player.addMark("sgsxjxfzmnl_sbxingshang",2 * game.countPlayer(target => target.group == "wei" && target != player));
		},
		group: "sgsxjxfzmnl_sbsongwei_delete",
		subSkill: {
			delete: {
				audio: "sbsongwei",
				enable: "phaseUse",
				filter(event, player) {
					if (player.hasSkill('sgsxjxfzmnl_sbsongwei_xx')) {
						return false;
					}
					return game.hasPlayer(target => lib.skill.sgsxjxfzmnl_sbsongwei.subSkill.delete.filterTarget(null, player, target));
				},
				filterTarget(card, player, target) {
					return target != player && target.group == "wei" && target.getStockSkills(false, true).length;
				},
				skillAnimation: true,
				animationColor: "thunder",
				async content(event, trigger, player) {
					// player.storage.sbsongwei_delete = true;
					// player.awakenSkill(event.name);
					player.YB_temp('sgsxjxfzmnl_sbsongwei_xx');
					event.target.removeSkills(event.target.getStockSkills(false, true));
				},
				ai: {
					order: 13,
					result: {
						target(player, target) {
							return -target.getStockSkills(false, true).length;
						},
					},
				},
			},
		},
	},

	//阴间高达一号
	sgsxjxfzmnl_boss_juejing: {
		persevereSkill: true,
		audio: "juejing",
		audioname2: {
			dc_zhaoyun: "dcjuejing",
		},
		trigger: { player: "phaseDrawBefore" },
		forced: true,
		content() {
			trigger.cancel();
		},
		ai: {
			noh: true,
			nogain: true,
		},
		group: "boss_juejing2",
	},
	sgsxjxfzmnl_boss_juejing2: {
		persevereSkill: true,
		audio: "juejing",
		sourceSkill: "sgsxjxfzmnl_boss_juejing",
		audioname2: {
			dc_zhaoyun: "dcjuejing",
		},
		mod: {
			aiOrder(player, card, num) {
				if (num > 0) {
					return num;
				}
				if (card.name === "zhuge" && player.getCardUsable("sha", true) < 6) {
					return 1;
				}
			},
			aiValue(player, card, num) {
				if (card.name === "zhuge") {
					return 60 / (1 + player.getCardUsable("sha", true));
				}
			},
			aiUseful(player, card, num) {
				if (card.name === "zhuge") {
					return 60 / (1 + player.getCardUsable("sha", true));
				}
			},
		},
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		forced: true,
		filter(event, player) {
			var numxl = player.starLevel||0;
			var numxx = 4+numxl;

			if (event.name == "gain" && event.player == player) {
				return player.countCards("h") > numxx;
			}
			var evt = event.getl(player);
			if (!evt || !evt.hs || evt.hs.length == 0 || player.countCards("h") >= numxx) {
				return false;
			}
			var evt = event;
			for (var i = 0; i < numxx; i++) {
				evt = evt.getParent("sgsxjxfzmnl_boss_juejing2");
				if (evt.name != "sgsxjxfzmnl_boss_juejing2") {
					return true;
				}
			}
			return false;
		},
		content() {
			var numxl = player.starLevel||0;
			var numxx = 4+numxl;
			var num = numxx - player.countCards("h");
			if (num > 0) {
				player.draw(num);
			} else {
				player.chooseToDiscard("h", true, -num);
			}
		},
		ai: {
			freeSha: true,
			freeShan: true,
			skillTagFilter() {
				return true;
			},
		},
	},
	sgsxjxfzmnl_xinlonghun:{
		audio: "longhun",
		logAudio(event, player) {
			return "longhun" + (4 - lib.suit.indexOf(get.suit(event.cards[0], player))) + ".mp3";
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
		prompt: "将♦牌当做杀，♥牌当做桃，♣牌当做闪，♠牌当做无懈可击使用或打出",
		//动态的viewAs
		viewAs(cards, player) {
			if (cards.length) {
				var name = false,
					nature = null;
				//根据选择的卡牌的花色 判断要转化出的卡牌是闪还是火杀还是无懈还是桃
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
		//选牌数量
		selectCard: [1, 2],
		//确保选择第一张牌后 重新检测第二张牌的合法性 避免选择两张花色不同的牌
		complexCard: true,
		//选牌范围：手牌区和装备区和木马
		position: "hes",
		//选牌合法性判断
		filterCard(card, player, event) {
			//如果已经选了一张牌 那么第二张牌和第一张花色相同即可
			if (ui.selected.cards.length) {
				return get.suit(card, player) == get.suit(ui.selected.cards[0], player);
			}
			event = event || _status.event;
			//获取当前时机的卡牌选择限制
			var filter = event._backup.filterCard;
			//获取卡牌花色
			var name = get.suit(card, player);
			//如果这张牌是梅花并且当前时机能够使用/打出闪 那么这张牌可以选择
			if (name == "club" && filter(get.autoViewAs({ name: "shan" }, "unsure"), player, event)) {
				return true;
			}
			//如果这张牌是方片并且当前时机能够使用/打出火杀 那么这张牌可以选择
			if (name == "diamond" && filter(get.autoViewAs({ name: "sha", nature: "fire" }, "unsure"), player, event)) {
				return true;
			}
			//如果这张牌是黑桃并且当前时机能够使用/打出无懈 那么这张牌可以选择
			if (name == "spade" && filter(get.autoViewAs({ name: "wuxie" }, "unsure"), player, event)) {
				return true;
			}
			//如果这张牌是红桃并且当前时机能够使用/打出桃 那么这张牌可以选择
			if (name == "heart" && filter(get.autoViewAs({ name: "tao" }, "unsure"), player, event)) {
				return true;
			}
			//上述条件都不满足 那么就不能选择这张牌
			return false;
		},
		//判断当前时机能否发动技能
		filter(event, player) {
			//获取当前时机的卡牌选择限制
			var filter = event.filterCard;
			//如果当前时机能够使用/打出火杀并且角色有方片 那么可以发动技能
			if (filter(get.autoViewAs({ name: "sha", nature: "fire" }, "unsure"), player, event) && player.countCards("hes", { suit: "diamond" })) {
				return true;
			}
			//如果当前时机能够使用/打出闪并且角色有梅花 那么可以发动技能
			if (filter(get.autoViewAs({ name: "shan" }, "unsure"), player, event) && player.countCards("hes", { suit: "club" })) {
				return true;
			}
			//如果当前时机能够使用/打出桃并且角色有红桃 那么可以发动技能
			if (filter(get.autoViewAs({ name: "tao" }, "unsure"), player, event) && player.countCards("hes", { suit: "heart" })) {
				return true;
			}
			//如果当前时机能够使用/打出无懈可击并且角色有黑桃 那么可以发动技能
			if (filter(get.autoViewAs({ name: "wuxie" }, "unsure"), player, event) && player.countCards("hes", { suit: "spade" })) {
				return true;
			}
			return false;
		},
		ai: {
			respondSha: true,
			respondShan: true,
			//让系统知道角色“有杀”“有闪”
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
			//AI牌序
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
		//让系统知道玩家“有无懈”“有桃”
		hiddenCard(player, name) {
			if (name == "wuxie" && _status.connectMode && player.countCards("hs") > 0) {
				return true;
			}
			if (name == "wuxie") {
				return player.countCards("hes", { suit: "spade" }) > 0;
			}
			if (name == "tao") {
				return player.countCards("hes", { suit: "heart" }) > 0;
			}
		},
		group: ["sgsxjxfzmnl_xinlonghun_num", "sgsxjxfzmnl_xinlonghun_discard"],
		subSkill: {
			num: {
				trigger: { player: "useCard" },
				forced: true,
				popup: false,
				filter(event) {
					var evt = event;
					return ["sha", "tao"].includes(evt.card.name) && evt.skill == "sgsxjxfzmnl_xinlonghun" && evt.cards && evt.cards.length == 2;
				},
				content() {
					trigger.baseDamage++;
				},
			},
			discard: {
				trigger: { player: ["useCardAfter", "respondAfter"] },
				forced: true,
				popup: false,
				logTarget() {
					return _status.currentPhase;
				},
				autodelay(event) {
					return event.name == "respond" ? 0.5 : false;
				},
				filter(evt, player) {
					return ["shan", "wuxie"].includes(evt.card.name) && evt.skill == "sgsxjxfzmnl_xinlonghun" && evt.cards && evt.cards.length == 2 && _status.currentPhase && _status.currentPhase != player && _status.currentPhase.countDiscardableCards(player, "he");
				},
				content() {
					//game.log(trigger.card)
					//game.log(trigger.cards)
					player.line(_status.currentPhase, "green");
					player.discardPlayerCard(_status.currentPhase, "he", true);
				},
			},
		},
	},
	sgsxjxfzmnl_zhanjiang: {
		group:'qinggang',
		locked:false,
		mod:{
			attackRange(player, num) {
				return num + 1;
			},
		},
	},
	//南华老登
	sgsxjxfzmnl_yufeng:{
		audio: "yufeng",
		filter(event, player) {
			return true;
		},
		filterTarget(card, player, target) {
			return player!=target && !target.hasSkill("yufeng2");
		},
		enable:'phaseUse',
		multiline:true,
		multitarget:true,
		selectTarget:[1,Infinity],
		content() {
			'step 0'
			targets.sortBySeat();
			game.log(targets, "获得了", "#y“御风”", "效果");
			for (var i of targets) {
				i.addSkill("yufeng2");
			}
			player.draw(targets.length);
		},
		ai:{
			result:{
				target(player,target){
					// var player = _status.event.player;
					var att = -get.attitude(player, target),
						attx = att * 2;
					if (att <= 0 || target.hasSkill("xinfu_pdgyingshi")) {
						return 0;
					}
					if (target.hasJudge("lebu")) {
						attx -= att;
					}
					if (target.hasJudge("bingliang")) {
						attx -= att;
					}
					return attx / Math.max(2.25, Math.sqrt(target.countCards("h") + 1));

				},
			}
		}
	},
	sgsxjxfzmnl_tianshu: {
		audio: 'tianshu',
		trigger: { player: "phaseUseBegin" },
		filter(event, player) {
			return (
				player.countCards("he") &&
				!get.cardPile('sgsxjxfzmnl_taipingyaoshu','field')
			);
		},
		direct: true,
		content() {
			"step 0";
			player.chooseCardTarget({
				prompt: get.prompt2("sgsxjxfzmnl_tianshu"),
				filterCard: true,
				position: "he",
				ai1(card) {
					return 5 - get.value(card);
				},
				ai2(target) {
					var player = _status.event.player;
					if (get.attitude(player, target) > 0 && !target.hasEmptySlot(2)) {
						return 0;
					}
					return get.attitude(player, target);
				},
			});
			"step 1";
			if (!result.bool) {
				event.finish();
				return;
			}
			var target = result.targets[0];
			event.target = target;
			player.logSkill("sgsxjxfzmnl_tianshu", target);
			player.discard(result.cards);
			if (!lib.inpile.includes("sgsxjxfzmnl_taipingyaoshu")) {
				lib.inpile.push("sgsxjxfzmnl_taipingyaoshu");
				event.card = game.createCard2("sgsxjxfzmnl_taipingyaoshu", "heart", 3);
			} else {
				event.card = get.cardPile(function (card) {
					return card.name == "sgsxjxfzmnl_taipingyaoshu";
				});
			}
			if (!event.card) {
				event.finish();
			} else {
				target.gain(event.card, "gain2");
			}
			"step 2";
			if (target.getCards("h").includes(card) && get.name(card, target) == "sgsxjxfzmnl_taipingyaoshu") {
				target.chooseUseTarget(card, "nopopup", true);
			}
		},
	},
	sgsxjxfzmnl_taipingyaoshu: {
		equipSkill: true,
		mod: {
			maxHandcard(player, num) {
				if (get.mode() == "guozhan") {
					// if (player.hasSkill("hongfa")) {
					// 村规
					if (player.hasSkill("hongfa", null, null, false)) {
						num += player.getExpansions("huangjintianbingfu").length;
					}
					return (
						num +
						game.countPlayer(function (current) {
							return current.isFriendOf(player);
						})
					);
				}
				return num + game.countGroup() - 1;
			},
		},
		trigger: { player: "damageBegin4" },
		filter(event, player) {
			if (player.hasSkillTag("unequip2")) {
				return false;
			}
			if (
				event.source &&
				event.source.hasSkillTag("unequip", false, {
					name: event.card ? event.card.name : null,
					target: player,
					card: event.card,
				})
			) {
				return false;
			}
			if (event.nature) {
				return true;
			}
		},
		forced: true,
		content() {
			trigger.cancel();
		},
		ai: {
			nofire: true,
			nothunder: true,
			effect: {
				target(card, player, target, current) {
					if (target.hasSkillTag("unequip2")) {
						return;
					}
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
					) {
						return;
					}
					if (get.tag(card, "natureDamage")) {
						return "zeroplayertarget";
					}
					if (card.name == "tiesuo") {
						return 0.01;
					}
				},
			},
		},
		subSkill: {
			lose: {
				audio: "taipingyaoshu",
				forced: true,
				charlotte: true,
				equipSkill: true,
				trigger: {
					player: "loseAfter",
					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
				},
				filter: (event, player) => {
					return !player.hasSkillTag("unequip2");
				},
				getIndex(event, player) {
					const evt = event.getl(player);
					const lostCards = [];
					evt.es.forEach(card => {
						const VEquip = evt.vcard_map.get(card);
						if (VEquip.name === "sgsxjxfzmnl_taipingyaoshu") {
							lostCards.add(VEquip);
						}
					});
					return lostCards.length;
				},
				async content(event, trigger, player) {
					await player.draw(2);
					if (player.hp < player.maxHp) {
						await player.recover(player.maxHp-player.hp);
					}
				},
			},
		},
	},
	g_sgsxjxfzmnl_taipingyaoshu: {},
	g_sgsxjxfzmnl_taipingyaoshu_ai: {
		ai: {
			effect: {
				player_use(card, player) {
					if (player.hasSkill("wendao")) {
						return;
					}
					if (
						card.name == "sgsxjxfzmnl_taipingyaoshu" &&
						game.hasPlayer(function (current) {
							return current.hasSkill("wendao") && get.attitude(player, current) <= 0;
						})
					) {
						return [0, 0, 0, 0];
					}
				},
				target_use(card, player, target) {
					if (target._g_sgsxjxfzmnl_taipingyaoshu_temp) {
						return;
					}
					if (get.subtype(card) === "equip2" && target.getEquip("sgsxjxfzmnl_taipingyaoshu") && !target.countEmptySlot(2)) {
						target._g_sgsxjxfzmnl_taipingyaoshu_temp = true;
						let lose = get.effect(target, { name: "losehp" }, target, target),
							draw = 2 * get.effect(target, { name: "draw" }, target, target);
						delete target._g_sgsxjxfzmnl_taipingyaoshu_temp;
						if (
							lose < 0 &&
							target.hp <= 1 &&
							!target.hasCard(i => {
								return get.name(i) === "tao" && lib.filter.cardEnabled(i, target, "forceEnable");
							})
						) {
							draw = 0;
						}
						return [1, (lose + draw) / get.attitude(target, target)];
					}
				},
			},
		},
	},
	//魔吕布
	sgsxjxfzmnl_jielve:{
		trigger:{
			source:'damageSource',
		},
		filter(event,player){
			return player.inRange(event.player)&&
				player!=event.player&&
				event.player.countGainableCards(player, "h") > 0;
		},
		content(){
			player.gainPlayerCard(trigger.player,'h',true);
		},
	},
	sgsxjxfzmnl_zhenhuo:{
		trigger:{
			global:['useCard'],
			player:['damageBegin4'],
		},
		filter(event,player){
			if(name=='damage'){
				return event.source.hasSex('female');
			}
			return get.type(event.card) == "trick"&&event.player.hasSex('female')&&event.targets&&event.targets.includes(player);
		},
		content() {
			if(event.triggername=='damageBegin4'){
				trigger.num++;
			}
			else {
				trigger.nowuxie = true;
			}
		},
	},
	sgsxjxfzmnl_wuqian:{
		usable:1,
		enable:['chooseToUse','chooseToRespond'],
		filter:function(event,player){
			return player.countCards('h')>0;
		},
		viewAs:{name:'sha'},
		viewAsFilter:function(player){
			return player.countCards('h')>0;
		},
		prompt:'将所有手牌当杀使用或打出',
		position:'h',
		selectCard:-1,
		filterCard:true,
		group:['sgsxjxfzmnl_wuqian_x','sgsxjxfzmnl_wuqian_y'],
		subSkill:{
			x:{
				trigger: { player: "useCard" },
				forced: true,
				popup: false,
				filter(event) {
					var evt = event;
					return ["sha"].includes(evt.card.name) && evt.skill == "sgsxjxfzmnl_wuqian";
				},
				content() {
					player.getStat().card.sha--;
					trigger.directHit.addArray(game.filterPlayer())
					trigger.baseDamage++;
				},
			},
			y:{
				trigger: { source:'damageAfter' },
				filter(event,player){
					return event.card&&event.getParent(1).skill=='sgsxjxfzmnl_wuqian';
				},
				forced:true,
				content(){
					player.loseHp();
				}
			},
		}
	},
	//张嫙
	sgsxjxfzmnl_tongli: {
		audio: 'tongli',
		trigger: { player: "useCardToPlayered" },
		filter(event, player) {
			if (!event.isFirstTarget || (event.card.storage && event.card.storage.sgsxjxfzmnl_tongli)) {
				return false;
			}
			// var type = get.type(event.card);
			// if (type != "basic" && type != "trick") {
			// 	return false;
			// }
			// var hs = player.getCards("h");
			// if (!hs.length) {
			// 	return false;
			// }
			var evt = event.getParent("phaseUse");
			if (!evt || evt.player != player) {
				return false;
			}
			if(player.countMark('sgsxjxfzmnl_tongli_count')>=4)return false;
			// var num1 = player.getHistory("useCard", function (evtx) {
			// 	if (evtx.getParent("phaseUse") != evt) {
			// 		return false;
			// 	}
			// 	return !evtx.card.storage || !evtx.card.storage.sgsxjxfzmnl_tongli;
			// }).length;
			// if (hs.length < num1) {
			// 	return false;
			// }
			// var list = [];
			// for (var i of hs) {
			// 	list.add(get.suit(i, player));
			// }
			// return list.length == num1;
			return true

		},

		prompt2(event, player) {
			var evt = event.getParent("phaseUse");
			var num = player.getHistory("useCard", function (evtx) {
				if (evtx.getParent("phaseUse") != evt) {
					return false;
				}
				return !evtx.card.storage || !evtx.card.storage.sgsxjxfzmnl_tongli;
			}).length;
			//var str='视为额外使用'+get.cnNumber(num)+'张'
			var str = "额外结算" + get.cnNumber(num) + "次";
			if (event.card.name == "sha" && game.hasNature(event.card)) {
				str += get.translation(event.card.nature);
			}
			return str + "【" + get.translation(event.card.name) + "】";
		},
		check(event, player) {
			return !get.tag(event.card, "norepeat");
		},
		content() {
			//player.addTempSkill('sgsxjxfzmnl_tongli_effect');
			var evt = trigger.getParent("phaseUse");
			var num = player.getHistory("useCard", function (evtx) {
				if (evtx.getParent("phaseUse") != evt) {
					return false;
				}
				return true;
				//return !evtx.card.storage||!evtx.card.storage.sgsxjxfzmnl_tongli;
			}).length;
			trigger.getParent().effectCount += num;
			player.addTempSkill('sgsxjxfzmnl_tongli_count','phaseUseAfter')
			player.addMark('sgsxjxfzmnl_tongli_count',1,false);
		},
		subSkill:{
			count:{
				onremove:true,
			}
		},
		/*subSkill:{
			effect:{
				trigger:{player:'useCardAfter'},
				forced:true,
				charlotte:true,
				filter:function(event,player){
					return event.sgsxjxfzmnl_tongli_effect!=undefined;
				},
				content:function(){
					'step 0'
					event.card=trigger.sgsxjxfzmnl_tongli_effect[0];
					event.count=trigger.sgsxjxfzmnl_tongli_effect[1];
					'step 1'
					event.count--;
					for(var i of trigger.targets){
						if(!i.isIn()||!player.canUse(card,i,false)) return;
					}
					if(trigger.addedTarget&&!trigger.addedTarget.isIn()) return;
					if(trigger.addedTargets&&trigger.addedTargets.length){
						for(var i of trigger.addedTargets){
							if(!i.isIn()) return;
						}
					}
					var next=player.useCard(get.copy(card),trigger.targets,false);
					if(trigger.addedTarget) next.addedTarget=trigger.addedTarget;
					if(trigger.addedTargets&&trigger.addedTargets.length) next.addedTargets=trigger.addedTargets.slice(0);
					if(event.count>0) event.redo();
				},
			},
		},*/
	},
	sgsxjxfzmnl_shezang: {
		audio: 'shezang',
		// round: 1,
		trigger: { global: "dying" },
		frequent: true,
		filter(event, player) {
			// return event.player == player || player == _status.currentPhase;
			return true;
		},
		content() {
			var cards = [];
			for (var i of lib.suit) {
				var card = get.cardPile2(function (card) {
					return get.suit(card, false) == i;
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
	//曹金玉
	sgsxjxfzmnl_yuqi: {
		audio: 'yuqi',
		trigger: { global: "damageEnd" },
		getInfo(player) {
			if (!player.storage.sgsxjxfzmnl_yuqi) {
				player.storage.sgsxjxfzmnl_yuqi = [0, 3, 1, 1];
			}
			return player.storage.sgsxjxfzmnl_yuqi;
		},
		// usable: 2,
		filter(event, player) {
			var list = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
			return event.player.isIn() && get.distance(player, event.player) <= list[0];
		},
		logTarget: "player",
		content() {
			"step 0";
			event.list = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
			var cards = get.cards(event.list[1]);
			event.cards = cards;
			game.cardsGotoOrdering(cards);
			var next = player.chooseToMove_new(true, "隅泣");
			next.set("list", [
				["牌堆顶的牌", cards],
				[["交给" + get.translation(trigger.player) + '<div class="text center">至少一张' + (event.list[2] > 1 ? "<br>至多" + get.cnNumber(event.list[2]) + "张" : "") + "</div>"], ['交给自己<div class="text center">至多' + get.cnNumber(event.list[3]) + "张</div>"]],
			]);
			next.set("filterMove", function (from, to, moved) {
				var info = lib.skill.sgsxjxfzmnl_yuqi.getInfo(_status.event.player);
				if (to == 1) {
					return moved[1].length < info[2];
				}
				if (to == 2) {
					return moved[2].length < info[3];
				}
				return true;
			});
			next.set("processAI", function (list) {
				var cards = list[0][1].slice(0).sort(function (a, b) {
						return get.value(b, "raw") - get.value(a, "raw");
					}),
					player = _status.event.player,
					target = _status.event.getTrigger().player;
				var info = lib.skill.sgsxjxfzmnl_yuqi.getInfo(_status.event.player);
				var cards1 = cards.splice(0, Math.min(info[3], cards.length - 1));
				var card2;
				if (get.attitude(player, target) > 0) {
					card2 = cards.shift();
				} else {
					card2 = cards.pop();
				}
				return [cards, [card2], cards1];
			});
			next.set("filterOk", function (moved) {
				return moved[1].length > 0;
			});
			"step 1";
			if (result.bool) {
				var moved = result.moved;
				cards.removeArray(moved[1]);
				cards.removeArray(moved[2]);
				while (cards.length) {
					ui.cardPile.insertBefore(cards.pop().fix(), ui.cardPile.firstChild);
				}
				var list = [[trigger.player, moved[1]]];
				if (moved[2].length) {
					list.push([player, moved[2]]);
				}
				game.loseAsync({
					gain_list: list,
					giver: player,
					animate: "draw",
				}).setContent("gaincardMultiple");
			}
		},
		mark: true,
		intro: {
			content(storage, player) {
				var info = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
				return '<div class="text center"><span class=thundertext>蓝色：' + info[0] + "</span>　<span class=firetext>红色：" + info[1] + "</span><br><span class=greentext>绿色：" + info[2] + "</span>　<span class=yellowtext>黄色：" + info[3] + "</span></div>";
			},
		},
		ai: {
			threaten: 8.8,
		},
		init(player, skill) {
			const list = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
			player.addTip(skill, get.translation(skill) + " " + list.slice().join(" "));
		},
		onremove: (player, skill) => player.removeTip(skill),
	},
	sgsxjxfzmnl_shanshen: {
		audio: 'shanshen',
		trigger: { 
			global: ["die",'dying']
		},
		direct: true,
		content() {
			"step 0";
			if(event.triggername=='dying'){
				event.ybxxx=true;
			}
			event.goon = !player.hasAllHistory("sourceDamage", function (evt) {
				return evt.player == trigger.player;
			});
			var list = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
			player
				.chooseControl("<span class=thundertext>蓝色(" + list[0] + ")</span>", "<span class=firetext>红色(" + list[1] + ")</span>", "<span class=greentext>绿色(" + list[2] + ")</span>", "<span class=yellowtext>黄色(" + list[3] + ")</span>", "cancel2")
				.set("prompt", get.prompt("sgsxjxfzmnl_shanshen"))
				.set("prompt2", event.ybxxx?"令〖隅泣〗中的一个数字+1":"令〖隅泣〗中的一个数字+2" + (event.goon ? "并回复1点体力" : ""))
				.set("ai", function () {
					var player = _status.event.player,
						info = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
					if (
						info[0] < info[3] &&
						game.countPlayer(function (current) {
							return get.distance(player, current) <= info[0];
						}) < Math.min(3, game.countPlayer())
					) {
						return 0;
					}
					if (info[3] < info[1] - 1) {
						return 3;
					}
					if (info[1] < info[3]+info[2]) {
						return 1;
					}
					if (
						// info[0] < 5 &&
						game.hasPlayer(function (current) {
							return current != player && get.distance(player, current) > info[0];
						})
					) {
						return 0;
					}
					return 2;
				});
			"step 1";
			if (result.control != "cancel2") {
				var num = 2;
				if(event.ybxxx){
					num=1;
				}
				if (event.goon&&!event.ybxxx) {
					player.recover();
					num=4;
				}
				player.logSkill("sgsxjxfzmnl_shanshen", trigger.player);
				var list = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
				list[result.index] = list[result.index] + num;
				game.log(player, "将", result.control, "数字改为", "#y" + list[result.index]);
				player.markSkill("sgsxjxfzmnl_yuqi");
				lib.skill.sgsxjxfzmnl_yuqi.init(player, "sgsxjxfzmnl_yuqi");
			}
		},
		ai: {
			combo: "sgsxjxfzmnl_yuqi",
		},
		// group:'sgsxjxfzmnl_shanshen_2',
		// subSkill:{
		// 	2:{
		// 		trigger:{global:"dying"},

		// 	}
		// }
	},
	sgsxjxfzmnl_xianjing: {
		audio: 'xianjing',
		trigger: { player: "phaseZhunbeiBegin" },
		direct: true,
		content() {
			"step 0";
			var list = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
			player
				.chooseControl("<span class=thundertext>蓝色(" + list[0] + ")</span>", "<span class=firetext>红色(" + list[1] + ")</span>", "<span class=greentext>绿色(" + list[2] + ")</span>", "<span class=yellowtext>黄色(" + list[3] + ")</span>", "cancel2")
				.set("prompt", get.prompt("sgsxjxfzmnl_xianjing"))
				.set("prompt2", "令〖隅泣〗中的一个数字+1")
				.set("ai", function () {
					var player = _status.event.player,
						info = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
					if (
						info[0] < info[3] &&
						game.countPlayer(function (current) {
							return get.distance(player, current) <= info[0];
						}) < Math.min(3, game.countPlayer())
					) {
						return 0;
					}
					if (info[3] < info[1] - 1) {
						return 3;
					}
					if (info[1] < info[3]+info[2]) {
						return 1;
					}
					if (
						// info[0] < 5 &&
						game.hasPlayer(function (current) {
							return current != player && get.distance(player, current) > info[0];
						})
					) {
						return 0;
					}
					return 2;
				});
			"step 1";
			if (result.control != "cancel2") {
				player.logSkill("sgsxjxfzmnl_xianjing");
				var list = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
				list[result.index] = list[result.index] + 1;
				game.log(player, "将", result.control, "数字改为", "#y" + list[result.index]);
				player.markSkill("sgsxjxfzmnl_yuqi");
				lib.skill.sgsxjxfzmnl_yuqi.init(player, "sgsxjxfzmnl_yuqi");
				if (player.isDamaged()) {
					event.finish();
				}
			} else {
				event.finish();
			}
			"step 2";
			var list = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
			player
				.chooseControl("<span class=thundertext>蓝色(" + list[0] + ")</span>", "<span class=firetext>红色(" + list[1] + ")</span>", "<span class=greentext>绿色(" + list[2] + ")</span>", "<span class=yellowtext>黄色(" + list[3] + ")</span>", "cancel2")
				.set("prompt", "是否令〖隅泣〗中的一个数字+1？")
				.set("ai", function () {
					var player = _status.event.player,
						info = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
					if (
						info[0] < info[3] &&
						game.countPlayer(function (current) {
							return get.distance(player, current) <= info[0];
						}) < Math.min(3, game.countPlayer())
					) {
						return 0;
					}
					if (info[3] < info[1] - 1) {
						return 3;
					}
					if (info[1] < info[3]+info[2]) {
						return 1;
					}
					if (
						// info[0] < 5 &&
						game.hasPlayer(function (current) {
							return current != player && get.distance(player, current) > info[0];
						})
					) {
						return 0;
					}
					return 2;
				});
			"step 3";
			if (result.control != "cancel2") {
				var list = lib.skill.sgsxjxfzmnl_yuqi.getInfo(player);
				list[result.index] = list[result.index] + 1;
				game.log(player, "将", result.control, "数字改为", "#y" + list[result.index]);
				player.markSkill("sgsxjxfzmnl_yuqi");
				lib.skill.sgsxjxfzmnl_yuqi.init(player, "sgsxjxfzmnl_yuqi");
			}
		},
		ai: {
			combo: "sgsxjxfzmnl_yuqi",
		},
	},
	//神马超
	sgsxjxfzmnl_shouli: {
		audio: 'shouli',
		mod: {
			cardUsable(card) {
				if (card.storage?.sgsxjxfzmnl_shouli) {
					return Infinity;
				}
			},
		},
		enable: ["chooseToUse", "chooseToRespond"],
		hiddenCard(player, name) {
			if (player != _status.currentPhase && (name == "sha" || name == "shan")) {
				return true;
			}
		},
		filter(event, player) {
			if (event.responded || event.sgsxjxfzmnl_shouli || event.type == "wuxie") {
				return false;
			}
			if (
				game.hasPlayer(function (current) {
					return current.getCards("e", card => get.is.attackingMount(card)).length > 0;
				}) &&
				event.filterCard(
					get.autoViewAs(
						{
							name: "sha",
							storage: { sgsxjxfzmnl_shouli: true },
						},
						"unsure"
					),
					player,
					event
				)
			) {
				return true;
			}
			if (
				game.hasPlayer(function (current) {
					return current.getCards("e", card => get.is.defendingMount(card)).length > 0;
				}) &&
				event.filterCard(
					get.autoViewAs(
						{
							name: "shan",
							storage: { sgsxjxfzmnl_shouli: true },
						},
						"unsure"
					),
					player,
					event
				)
			) {
				return true;
			}
			return false;
		},
		delay: false,
		locked: false,
		filterTarget(card, player, target) {
			var event = _status.event,
				evt = event;
			if (event._backup) {
				evt = event._backup;
			}
			var equip3 = target.getCards("e", card => get.is.defendingMount(card, false));
			var equip4 = target.getCards("e", card => get.is.attackingMount(card, false));
			if (
				equip3.length &&
				equip3.some(card =>
					evt.filterCard(
						get.autoViewAs(
							{
								name: "shan",
								storage: { sgsxjxfzmnl_shouli: true },
							},
							[card]
						),
						player,
						event
					)
				)
			) {
				return true;
			}
			return equip4.some(card => {
				var sha = get.autoViewAs(
					{
						name: "sha",
						storage: { sgsxjxfzmnl_shouli: true },
					},
					[card]
				);
				if (evt.filterCard(sha, player, event)) {
					if (!evt.filterTarget) {
						return true;
					}
					return game.hasPlayer(function (current) {
						return evt.filterTarget(sha, player, current);
					});
				}
			});
		},
		prompt: "将场上的一张坐骑牌当做【杀】或【闪】使用或打出",
		content() {
			"step 0";
			var evt = event.getParent(2);
			evt.set("sgsxjxfzmnl_shouli", true);
			var list = [];
			var equip3 = target.getCards("e", card => get.is.defendingMount(card, false));
			var equip4 = target.getCards("e", card => get.is.attackingMount(card, false));
			var backupx = _status.event;
			_status.event = evt;
			try {
				if (
					equip3.length &&
					equip3.some(card => {
						var shan = get.autoViewAs(
							{
								name: "shan",
								storage: { sgsxjxfzmnl_shouli: true },
							},
							[card]
						);
						if (evt.filterCard(shan, player, event)) {
							return true;
						}
						return false;
					})
				) {
					list.push("shan");
				}
				if (
					equip4.length &&
					equip4.some(card => {
						var sha = get.autoViewAs(
							{
								name: "sha",
								storage: { sgsxjxfzmnl_shouli: true },
							},
							[card]
						);
						if (
							evt.filterCard(sha, player, evt) &&
							(!evt.filterTarget ||
								game.hasPlayer(function (current) {
									return evt.filterTarget(sha, player, current);
								}))
						) {
							return true;
						}
						return false;
					})
				) {
					list.push("sha");
				}
			} catch (e) {
				game.print(e);
			}
			_status.event = backupx;
			if (list.length == 1) {
				event.cardName = list[0];
				var cards = list[0] == "shan" ? equip3 : equip4;
				if (cards.length == 1) {
					event._result = {
						bool: true,
						links: [cards[0]],
					};
				} else {
					player
						.choosePlayerCard(true, target, "e")
						.set("filterButton", function (button) {
							return _status.event.cards.includes(button.link);
						})
						.set("cards", cards);
				}
			} else {
				player.choosePlayerCard(true, target, "e").set("filterButton", function (button) {
					var card = button.link;
					return get.is.attackingMount(card) || get.is.defendingMount(card);
				});
			}
			"step 1";
			var evt = event.getParent(2);
			if (result.bool && result.links && result.links.length) {
				var name = event.cardName || (get.is.attackingMount(result.links[0]) ? "sha" : "shan");
				if (evt.name == "chooseToUse") {
					game.broadcastAll(
						function (result, name) {
							lib.skill.sgsxjxfzmnl_shouli_backup.viewAs = {
								name: name,
								cards: [result],
								storage: { sgsxjxfzmnl_shouli: true },
							};
							lib.skill.sgsxjxfzmnl_shouli_backup.prompt = "选择" + get.translation(name) + "（" + get.translation(result) + "）的目标";
						},
						result.links[0],
						name
					);
					evt.set("_backupevent", "sgsxjxfzmnl_shouli_backup");
					evt.backup("sgsxjxfzmnl_shouli_backup");
					evt.set("openskilldialog", "选择" + get.translation(name) + "（" + get.translation(result.links[0]) + "）的目标");
					evt.set("norestore", true);
					evt.set("custom", {
						add: {},
						replace: { window() {} },
					});
				} else {
					delete evt.result.used;
					evt.result.card = get.autoViewAs(
						{
							name: name,
							cards: [result.links[0]],
							storage: { sgsxjxfzmnl_shouli: true },
						},
						result.links
					);
					evt.result.cards = [result.links[0]];
					evt.result._apply_args = { addSkillCount: false };
					target.$give(result.links[0], player, false);
					if (player != target) {
						target.addTempSkill("baiban");
					}
					target.addTempSkill("sgsxjxfzmnl_shouli_thunder");
					player.addTempSkill("sgsxjxfzmnl_shouli_thunder");
					evt.redo();
					return;
				}
			}
			evt.goto(0);
		},
		ai: {
			respondSha: true,
			respondShan: true,
			skillTagFilter(player, tag) {
				var func = get.is[tag == "respondSha" ? "attackingMount" : "defendingMount"];
				return game.hasPlayer(function (current) {
					return current.hasCard(card => func(card, false), "e");
				});
			},
			order: 2,
			result: {
				player(player, target) {
					var att = Math.max(8, get.attitude(player, target));
					if (_status.event.type != "phase") {
						return 9 - att;
					}
					if (!player.hasValueTarget({ name: "sha" })) {
						return 0;
					}
					return 9 - att;
				},
			},
		},
		group: ["sgsxjxfzmnl_shouli_init",'sgsxjxfzmnl_shouli_hit'],
		subSkill: {
			thunder: {
				charlotte: true,
				trigger: { player: "damageBegin1" },
				forced: true,
				mark: true,
				content() {
					trigger.num++;
					game.setNature(trigger, "thunder");
				},
				marktext: "⚡",
				intro: { content: "受到的伤害+1且改为雷属性" },
				ai: {
					effect: {
						target: (card, player, target) => {
							if (!get.tag(card, "damage")) {
								return;
							}
							if (
								target.hasSkillTag("nodamage", null, {
									natures: ["thunder"],
								}) ||
								target.hasSkillTag("nothunder")
							) {
								return "zeroplayertarget";
							}
							if (
								target.hasSkillTag("filterDamage", null, {
									player: player,
									card: new lib.element.VCard(
										{
											name: card.name,
											nature: "thunder",
										},
										[card]
									),
								})
							) {
								return;
							}
							return 2;
						},
					},
				},
			},
			init: {
				audio: "sgsxjxfzmnl_shouli",
				trigger: {
					global: "roundStart",
				},
				forced: true,
				locked: false,
				filter(event, player) {
					// return event.name != "phase" || game.phaseNumber == 0;
					return true;
				},
				logTarget: () => game.filterPlayer(),
				content() {
					"step 0";
					var targets = game.filterPlayer().sortBySeat(player.getNext());
					event.targets = targets;
					event.num = 0;
					"step 1";
					var target = event.targets[num];
					if (target.isIn()) {
						var card = get.cardPile2(function (card) {
							if (get.cardtag(card, "gifts")) {
								return false;
							}
							var type = get.subtype(card);
							if (type != "equip3" && type != "equip4" && type != "equip6") {
								return false;
							}
							return target.canUse(card, target);
						});
						if (card) {
							target.chooseUseTarget(card, "nopopup", "noanimate", true);
						}
					}
					event.num++;
					if (event.num < targets.length) {
						event.redo();
					}
				},
			},
			backup: {
				precontent() {
					"step 0";
					var cards = event.result.card.cards;
					event.result.cards = cards;
					event.result._apply_args = { addSkillCount: false };
					var owner = get.owner(cards[0]);
					event.target = owner;
					owner.$give(cards[0], player, false);
					player.popup(event.result.card.name, "metal");
					game.delayx();
					event.getParent().addCount = false;
					"step 1";
					if (player != target) {
						target.addTempSkill("fengyin");
					}
					target.addTempSkill("sgsxjxfzmnl_shouli_thunder");
					player.addTempSkill("sgsxjxfzmnl_shouli_thunder");
				},
				filterCard: () => false,
				prompt: "请选择【杀】的目标",
				selectCard: -1,
				log: false,
			},
			hit:{
				forced:true,
				trigger:{
					player:['useCard'],
				},
				filter(event,player){
					return event.card.name == 'sha'&&event.targets?.length&&event.card.storage?.sgsxjxfzmnl_shouli;
				},
				content(){
					trigger.directHit.addArray(game.filterPlayer())
				}
			}
		},
	},
	sgsxjxfzmnl_hengwu: {
		audio: 'hengwu',
		trigger: { player: ["useCard", "respond"] },
		frequent: true,
		filter(event, player) {
			var suit = get.suit(event.card);
			if (
				// !lib.suit.includes(suit) ||
				player.hasCard(function (card) {
					return get.suit(card, player) == suit;
				}, "h")
			) {
				return false;
			}
			return game.hasPlayer(function (current) {
				return current.hasCard(function (card) {
					return get.suit(card, current) == suit;
				}, "e");
			});
		},
		content() {
			var suit = get.suit(trigger.card);
			player.draw(
				game.countPlayer(function (current) {
					return current.countCards("e", function (card) {
						return get.suit(card, current) == suit;
					});
				})
			);
		},
		ai: {
			effect: {
				player_use(card, player, target) {
					if (typeof card !== "object") {
						return;
					}
					let suit = get.suit(card);
					if (
						!lib.suit.includes(suit) ||
						player.hasCard(function (i) {
							return get.suit(i, player) == suit;
						}, "h")
					) {
						return;
					}
					return [
						1,
						0.8 *
							game.countPlayer(current => {
								return current.countCards("e", card => {
									return get.suit(card, current) == suit;
								});
							}),
					];
				},
				target: (card, player, target) => {
					if (
						card.name === "sha" &&
						!player.hasSkillTag(
							"directHit_ai",
							true,
							{
								target: target,
								card: card,
							},
							true
						) &&
						game.hasPlayer(current => {
							return current.hasCard(cardx => {
								return get.subtype(cardx) === "equip3";
							}, "e");
						})
					) {
						return [0, -0.5];
					}
				},
			},
		},
	},
	//孙寒华
	sgsxjxfzmnl_chongxu: {
		audio: 'chongxu',
		enable: "phaseUse",
		usable: 3,
		// content() {
		// 	"step 0";
		// 	player.chooseToPlayBeatmap(lib.skill.sgsxjxfzmnl_chongxu.beatmaps.randomGet());
		// 	"step 1";
		// 	var score = Math.floor(Math.min(5, result.accuracy / 17));
		// 	event.score = score;
		// 	game.log(player, "的演奏评级为", "#y" + result.rank[0], "，获得积分点数", "#y" + score, "分");
		// 	if (score < 3) {
		// 		if (score >= 2) {
		// 			player.draw();
		// 		}
		// 		event.finish();
		// 		return;
		// 	}
		// 	var list = [];
		// 	if (player.countMark("sgsxjxfzmnl_miaojian") < 2 && player.hasSkill("sgsxjxfzmnl_miaojian")) {
		// 		list.push("修改【妙剑】");
		// 	}
		// 	if (player.countMark("sgsxjxfzmnl_shhlianhua") < 2 && player.hasSkill("sgsxjxfzmnl_shhlianhua")) {
		// 		list.push("修改【莲华】");
		// 	}
		// 	if (list.length) {
		// 		list.push("全部摸牌");
		// 		player.chooseControl(list).set("prompt", "冲虚：修改技能" + (score == 5 ? "并摸一张牌" : "") + "；或摸" + Math.floor(score / 2) + "张牌");
		// 	} else {
		// 		event._result = { control: "全部摸牌" };
		// 	}
		// 	"step 2";
		// 	var score = event.score;
		// 	if (result.control != "全部摸牌") {
		// 		score -= 3;
		// 		var skill = result.control == "修改【妙剑】" ? "sgsxjxfzmnl_miaojian" : "sgsxjxfzmnl_shhlianhua";
		// 		player.addMark(skill, 1, false);
		// 		game.log(player, "修改了技能", "#g【" + get.translation(skill) + "】");
		// 	}
		// 	if (score > 1) {
		// 		player.draw(Math.floor(score / 2));
		// 	}
		// },
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
							["sgsxjxfzmnl_miaojian", '使用3积分升级【' + get.translation('sgsxjxfzmnl_miaojian') + '】'],
							["sgsxjxfzmnl_shhlianhua", '使用3积分升级【' + get.translation('sgsxjxfzmnl_shhlianhua') + '】'],
							['draw', '使用2积分摸一张牌'],
						],
						'textbutton',
					],
				], [1, Infinity]).set('filterButton', button => {
					const player = get.player(), choice = ui.selected.buttons.map(i => i.link);
					if (button.link !== 'draw' && (!player.hasSkill(button.link, null, null, false) || choice.filter(i => i === button.link).length + player.countMark(button.link) > 1)) return false;
					return [...choice, button.link].reduce((sum, i) => sum + (i === 'draw' ? 2 : 3), 0) <= score;
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
							event.parent?.controls?.[0]?.classList.remove('disabled');
							game.check();
						},
					},
				});
				if (result?.bool && result.links?.length) {
					const sgsxjxfzmnl_miaojian = result.links.filter(i => i === 'sgsxjxfzmnl_miaojian').length;
					if (sgsxjxfzmnl_miaojian > 0) {
						player.addMark("sgsxjxfzmnl_miaojian", sgsxjxfzmnl_miaojian, false);
						player.popup('sgsxjxfzmnl_miaojian');
						game.log(player, '升级了技能', '#g【' + get.translation('sgsxjxfzmnl_miaojian') + '】');
					}
					const sgsxjxfzmnl_shhlianhua = result.links.filter(i => i === "sgsxjxfzmnl_shhlianhua").length;
					if (sgsxjxfzmnl_shhlianhua > 0) {
						player.addMark("sgsxjxfzmnl_shhlianhua", sgsxjxfzmnl_shhlianhua, false);
						player.popup('sgsxjxfzmnl_shhlianhua');
						game.log(player, '升级了技能', '#g【' + get.translation('sgsxjxfzmnl_shhlianhua') + '】');
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
		beatmaps: [
			{
				//歌曲名称
				name: "鳥の詩",
				//歌曲文件名（默认在audio/effect文件夹下 若要重定向到扩展 请写为'ext:扩展名称/文件名'的格式）
				filename: "tori_no_uta",
				//每个音符的开始时间点（毫秒，相对未偏移的开始播放时间）
				timeleap: [1047, 3012, 4978, 5469, 5961, 6452, 6698, 7435, 8909, 10875, 12840],
				//开始播放时间的偏移量（毫秒）
				current: -110,
				//判定栏高度（相对整个对话框高度比例）
				judgebar_height: 0.16,
				//Good/Great/Prefect的位置判定范围（百分比，相对于整个对话框。以滑条的底部作为判定基准）
				range1: [84, 110],
				range2: [90, 104],
				range3: [94, 100],
				//滑条每相对于整个对话框下落1%所需的时间（毫秒）
				speed: 25,
			},
			{
				name: "竹取飛翔　～ Lunatic Princess",
				filename: "taketori_hishou",
				timeleap: [1021, 1490, 1959, 2896, 3834, 4537, 4771, 5709, 6646, 7585, 8039, 8494, 9403, 10291, 11180, 11832, 12049, 12920, 13345, 13771, 14196],
				current: -110,
				judgebar_height: 0.16,
				range1: [84, 110],
				range2: [90, 104],
				range3: [94, 100],
				speed: 25,
				node_color: "linear-gradient(rgba(250, 170, 190, 1), rgba(240, 160, 180, 1))",
				judgebar_color: "linear-gradient(rgba(240, 120, 243, 1), rgba(245, 106, 230, 1))",
			},
			{
				name: "ignotus",
				filename: "ignotus",
				//Number of tracks
				//轨道数量
				number_of_tracks: 4,
				//Customize the track to generate for every note (0 is the first track)
				//自定义每个音符生成的轨道（0是第一个轨道）
				mapping: [0, 2, 3, 1, 1, 0, 3, 0, 0, 3, 0, 0, 2, 1, 2],
				//Convert from beats (0 is the first beat) to timeleap
				//将节拍（0是第一拍）转换为开始时间点
				timeleap: game.generateBeatmapTimeleap(170, [0, 4, 8, 12, 14, 16, 16.5, 23.5, 24, 31, 32, 40, 45, 46, 47]),
				current: -110,
				judgebar_height: 0.16,
				range1: [84, 110],
				range2: [90, 104],
				range3: [94, 100],
				speed: 25,
				node_color: "linear-gradient(rgba(240, 250, 240, 1), rgba(230, 240, 230, 1))",
				judgebar_color: "linear-gradient(rgba(161, 59, 150, 1), rgba(58, 43, 74, 1))",
			},
			{
				name: "Super Mario 3D World Theme",
				filename: "sm3dw_overworld",
				//Random (Randomly choose tracks to generate notes each play)
				//随机（每次演奏时音符会随机选择轨道生成）
				mapping: "random",
				timeleap: [0, 1071, 1518, 2054, 4018, 4286, 5357, 6429, 7500, 8571, 9643, 10714, 11786, 12321, 12589, 12857, 13929, 15000, 16071, 17143, 18214, 18482, 18750, 19018, 19286, 20357],
				current: -110,
				judgebar_height: 0.16,
				range1: [84, 110],
				range2: [90, 104],
				range3: [94, 100],
				speed: 25,
				node_color: "linear-gradient(rgba(120, 130, 240, 1), rgba(100, 100, 230, 1))",
				judgebar_color: "linear-gradient(rgba(230, 40, 30, 1), rgba(220, 30, 10, 1))",
			},
			{
				name: "只因你太美",
				filename: "chicken_you_are_so_beautiful",
				number_of_tracks: 7,
				mapping: [3, 6, 4, 5, 6, 2, 3, 2, 1, 2, 0, 4, 3, 6, 5, 4, 3, 6, 3, 2, 3, 1, 0, 1, 2, 3, 4, 5, 6],
				timeleap: game.generateBeatmapTimeleap(107, [2, 3.5, 4.5, 5.5, 6.5, 8.5, 10, 11.5, 12.5, 13.5, 14.5, 15.5, 18, 19.5, 20.5, 21.5, 22.5, 24.5, 26, 27.5, 28.5, 29.5, 30.5, 31, 31.5, 32, 32.5, 33, 33.5]),
				//Hitsound file name (By default in the audio/effect folder. To redirect to the extension, please write in the format of 'ext:extension_name')
				//打击音文件名（默认在audio/effect文件夹下 若要重定向到扩展 请写为'ext:扩展名称'的格式）
				hitsound: "chickun.wav",
				current: -110,
				judgebar_height: 0.16,
				range1: [84, 110],
				range2: [90, 104],
				range3: [94, 100],
				speed: 25,
				node_color: "linear-gradient(#99f, #66c)",
				judgebar_color: "linear-gradient(#ccf, #99c)",
			},
			{
				name: "Croatian Rhapsody",
				filename: "croatian_rhapsody",
				mapping: [4, 1, 2, 1, 0, 0, 4, 5, 1, 3, 2, 1, 0, 0],
				timeleap: game.generateBeatmapTimeleap(96, [4, 6, 8, 9, 10, 11, 12, 13.5, 14, 15.5, 16, 17, 18, 19]),
				current: -110,
				judgebar_height: 0.16,
				range1: [84, 110],
				range2: [90, 104],
				range3: [94, 100],
				speed: 25,
				node_color: "linear-gradient(#fff, #ccc)",
				judgebar_color: "linear-gradient(#fff, #ccc)",
			},
			{
				name: "罗刹海市",
				filename: "rakshasa_sea_city",
				number_of_tracks: 7,
				mapping: "random",
				timeleap: game.generateBeatmapTimeleap(150, [0, 2, 4, 6, 7, 9, 11, 13, 14, 16, 18, 20, 21, 23, 25, 27]),
				current: -110,
				judgebar_height: 0.16,
				range1: [84, 110],
				range2: [90, 104],
				range3: [94, 100],
				speed: 25,
				node_color: "linear-gradient(#333, #000)",
				judgebar_color: "linear-gradient(#c66, #933)",
			},
			{
				name: "Pigstep (Stereo Mix)",
				filename: "pigstep",
				number_of_tracks: 16,
				timeleap: game.generateBeatmapTimeleap(170, [3, 4, 6, 6.5, 7.5, 11, 12, 14, 14.5, 15.5, 19, 20, 22, 22.5, 23.5, 27, 28, 30, 30.5, 31.5, 35, 36, 38, 38.5, 39.5, 43, 44, 46, 46.5, 47.5, 51, 52, 54, 54.5, 55.5, 59, 60, 62, 62.5]),
				current: -110,
				judgebar_height: 0.16,
				range1: [84, 110],
				range2: [90, 104],
				range3: [94, 100],
				speed: 25,
				node_color: "linear-gradient(#066, #033)",
				judgebar_color: "linear-gradient(#633, #300)",
			},
		],
		derivation: "sgsxjxfzmnl_chongxu_faq",
	},
	sgsxjxfzmnl_miaojian: {
		mod: {
			cardUsable(card, player) {
				if (card?.storage?.sgsxjxfzmnl_miaojian) return Infinity
			}
		},
		audio: 'miaojian',
		enable: "phaseUse",
		usable(skill,player){
			return player.countMark("sgsxjxfzmnl_miaojian")+1;
		},
		filter(event, player) {
			var level = player.countMark("sgsxjxfzmnl_miaojian");
			if (event.filterCard({ name: "sha", nature: "stab", storage : { sgsxjxfzmnl_miaojian : true } }, player, event)) {
				if (level == 2) {
					return true;
				}
				if (
					level == 1 &&
					player.hasCard(function (card) {
						return get.type2(card) == "basic";
					}, "hs")
				) {
					return true;
				}
				if (
					level == 0 &&
					player.hasCard(function (card) {
						return get.name(card) == "sha";
					}, "hs")
				) {
					return true;
				}
			}
			if (event.filterCard({ name: "wuzhong", storage : { sgsxjxfzmnl_miaojian : true } }, player, event)) {
				if (level == 2) {
					return true;
				}
				if (
					level == 1 &&
					player.hasCard(function (card) {
						return get.type2(card) != "basic";
					}, "hes")
				) {
					return true;
				}
				if (
					level == 0 &&
					player.hasCard(function (card) {
						return get.type2(card) == "trick";
					}, "hs")
				) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog() {
				return ui.create.dialog("妙剑", [
					[
						["基本", "", "sha", "stab"],
						["锦囊", "", "wuzhong"],
					],
					"vcard",
				]);
			},
			filter(button, player) {
				var event = _status.event.getParent(),
					level = player.countMark("sgsxjxfzmnl_miaojian");
				if (button.link[2] == "sha") {
					if (!event.filterCard({ name: "sha", nature: "stab", storage : { sgsxjxfzmnl_miaojian : true } }, player, event)) {
						return false;
					}
					if (level == 2) {
						return true;
					}
					if (level == 1) {
						return player.hasCard(function (card) {
							return get.type2(card) == "basic";
						}, "hs");
					}
					return (
						level == 0 &&
						player.hasCard(function (card) {
							return get.name(card) == "sha";
						}, "hs")
					);
				}
				if (button.link[2] == "wuzhong") {
					if (!event.filterCard({ name: "wuzhong", storage : { sgsxjxfzmnl_miaojian : true } }, player, event)) {
						return false;
					}
					if (level == 2) {
						return true;
					}
					if (level == 1) {
						return player.hasCard(function (card) {
							return get.type2(card) != "basic";
						}, "hes");
					}
					return (
						level == 0 &&
						player.hasCard(function (card) {
							return get.type2(card) == "trick";
						}, "hs")
					);
				}
			},
			check(button) {
				var card = { name: button.link[2], nature: button.link[3] },
					player = _status.event.player;
				return get.value(card, player) * get.sgn(player.getUseValue(card));
			},
			backup(links, player) {
				var index = links[0][2] == "sha" ? 0 : 1,
					level = player.countMark("sgsxjxfzmnl_miaojian");
				var next = {
					audio: "sgsxjxfzmnl_miaojian",
					filterCard: [
						[
							function (card) {
								return get.name(card) == "sha";
							},
							function (card) {
								return get.type(card) == "basic";
							},
							() => false,
						],
						[
							function (card) {
								return get.type2(card) == "trick";
							},
							function (card) {
								return get.type(card) != "basic";
							},
							() => false,
						],
					][index][level],
					position: "hes",
					check(card) {
						if (card) {
							return 6.5 - get.value(card);
						}
						return 1;
					},
					viewAs: [
						{
							name: "sha",
							nature: "stab",
							storage : { sgsxjxfzmnl_miaojian : true }
						},
						{
							name: "wuzhong",
							storage : { sgsxjxfzmnl_miaojian : true }
						},
					][index],
				};
				if (level == 2) {
					next.selectCard = -1;
					next.viewAs.isCard = true;
				}
				return next;
			},
			prompt(links, player) {
				var index = links[0][2] == "sha" ? 0 : 1,
					level = player.countMark("sgsxjxfzmnl_miaojian");
				return [
					["将一张【杀】当做刺【杀】使用", "将一张基本牌当做刺【杀】使用", "请选择刺【杀】的目标"],
					["将一张锦囊牌当做【无中生有】使用", "将一张非基本牌当做【无中生有】使用", "请选择【无中生有】的目标"],
				][index][level];
			},
		},
		onremove: true,
		derivation: ["sgsxjxfzmnl_miaojian1", "sgsxjxfzmnl_miaojian2"],
		subSkill: { backup: { audio: "sgsxjxfzmnl_miaojian" } },
		ai: {
			order: 7,
			result: { player: 1 },
		},
	},
	sgsxjxfzmnl_shhlianhua: {
		audio: "shhlianhua",
		derivation: ["sgsxjxfzmnl_shhlianhua1", "sgsxjxfzmnl_shhlianhua2"],
		trigger: { target: "useCardToTargeted" },
		forced: true,
		locked: false,
		filter: event => event.card.name == "sha",
		content() {
			"step 0";
			player.draw();
			var level = player.countMark("sgsxjxfzmnl_shhlianhua");
			if (!level) {
				event.finish();
			} else if (level == 1) {
				event.goto(2);
			} else {
				event.goto(1);
				// var eff = get.effect(player, trigger.card, trigger.player, trigger.player);
			}
			"step 1";
			var cards = trigger.player.getCards("he", function (card) {
				return lib.filter.cardDiscardable(card, trigger.player, "sgsxjxfzmnl_shhlianhua");
			});
			if(cards){
				trigger.player.discard(cards.randomGet()).discarder = player;
				event.finish();
			}
			else trigger.getParent().excluded.add(player);
			"step 2";
			player
				.judge(function (result) {
					return get.color(result) == "black" ? 1 : -1;
				})
				.set("judge2", result => result.bool);

			"step 3";
			if (result.bool) {
				trigger.excluded.add(player);
			}
			event.finish();
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

	//郭照
	sgsxjxfzmnl_yichong: {
		initSkill(skill) {
			if (!lib.skill[skill]) {
				lib.skill[skill] = {
					charlotte: true,
					onremove: true,
					mark: true,
					marktext: "雀",
					intro: {
						markcount(storage) {
							return (storage || 0).toString();
						},
						content(storage) {
							return "已被掠夺" + (storage || 0) + "张牌";
						},
					},
				};
				lib.translate[skill] = "易宠";
				lib.translate[skill + "_bg"] = "雀";
			}
		},
		getLimit: Infinity,
		audio: 'yichong',
		trigger: { player: "phaseZhunbeiBegin" },
		direct: true,
		content() {
			"step 0";
			player.chooseTarget(get.prompt("sgsxjxfzmnl_yichong"), "选择一名其他角色并选择一个花色，获得其此颜色的所有牌并令其获得“雀”标记", lib.filter.notMe).set("ai", function (target) {
				var player = _status.event.player;
				var att = get.attitude(player, target);
				if (att > 0) {
					return 0;
				}
				var getNum = function (player) {
					var list = [];
					for (var i of Object.keys(lib.color)) {
						list.push(player.countCards("he", { color: i }) + 3);
					}
					return list.sort((a, b) => b - a)[0];
				};
				return getNum(target) + target.countCards("h") / 10;
			});
			"step 1";
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("sgsxjxfzmnl_yichong", target);
				event.target = target;
				player
					.chooseControl(Object.keys(lib.color))
					.set("prompt", "请声明一个颜色")
					.set("ai", function () {
						var target = _status.event.target,
							cards = target.getCards("he");
						var suits = Object.keys(lib.color).slice(0);
						suits.sort(function (a, b) {
							var num = function (suit) {
								return cards.filter(function (card) {
									return get.color(card) == suit;
								}).length;
							};
							return num(b) - num(a);
						});
						return suits[0];
					})
					.set("target", target);
			} else {
				event.finish();
			}
			"step 2";
			var suit = result.control;
			event.suit = suit;
			player.chat(get.translation(suit));
			game.log(player, "选择了", "#y" + get.translation(suit));
			if (target.countCards("hej", { color: suit })) {
				player.gain(target.getCards("hej", { color: suit }), target, "giveAuto");
			}
			"step 3";
			//捏妈的傻逼作者，连判定区都抢，挂不上乐你就急了
			// var suit = event.suit;
			// if (target.countCards("h", { color: suit })) {
			// 	player.gain(target.getCards("h", { color: suit }), target, "giveAuto");
			// 	// player.chooseButton(["选择获得其中一张牌", target.getCards("h", { suit: suit })], true).set("ai", button => get.value(button.link));
			// } else {
			// 	event.goto(5);
			// }
			"step 4";
			// if (result.bool) {
			// 	var card = result.links[0];
			// 	if (lib.filter.canBeGained(card, player, target)) {
			// 		player.gain(card, target, "giveAuto", "bySelf");
			// 	} else {
			// 		game.log("但", card, "不能被", player, "获得！");
			// 	}
			// }
			"step 5";
			var suit = event.suit;
			player.storage.sgsxjxfzmnl_yichong = suit;
			player.markSkill("sgsxjxfzmnl_yichong");
			var skill = "yichong_" + player.playerid;
			game.broadcastAll(lib.skill.sgsxjxfzmnl_yichong.initSkill, skill);
			game.broadcastAll(
				function (player, suit) {
					if (player.marks.sgsxjxfzmnl_yichong) {
						player.marks.sgsxjxfzmnl_yichong.firstChild.innerHTML = get.translation(suit);
					}
				},
				player,
				suit
			);
			game.countPlayer(function (current) {
				current.removeSkill("yichong_" + player.playerid);
				if (current == target) {
					target.addSkill("yichong_" + player.playerid);
				}
			});
			player.addTempSkill("sgsxjxfzmnl_yichong_clear", { player: "phaseBegin" });
		},
		onremove: true,
		intro: { content: "拥有“雀”标记的角色得到$牌后，你获得之" },
		group: "sgsxjxfzmnl_yichong_gain",
		subSkill: {
			gain: {
				audio: "sgsxjxfzmnl_yichong",
				trigger: { global: ["gainAfter", "loseAsyncAfter"] },
				filter(event, player) {
					if (!player.storage.sgsxjxfzmnl_yichong) {
						return false;
					}
					return game.hasPlayer(function (current) {
						if (!event.getg(current).length || !current.hasSkill("yichong_" + player.playerid)) {
							return false;
						}
						if (current.countMark("yichong_" + player.playerid) >= lib.skill.sgsxjxfzmnl_yichong.getLimit) {
							return false;
						}
						return event.getg(current).some(card => get.color(card, current) == player.storage.sgsxjxfzmnl_yichong && lib.filter.canBeGained(card, current, player));
					});
				},
				forced: true,
				content() {
					var target = game.findPlayer(function (current) {
						if (!trigger.getg(current).length || !current.hasSkill("yichong_" + player.playerid)) {
							return false;
						}
						if (current.countMark("yichong_" + player.playerid) >= lib.skill.sgsxjxfzmnl_yichong.getLimit) {
							return false;
						}
						return trigger.getg(current).some(card => get.color(card, current) == player.storage.sgsxjxfzmnl_yichong && lib.filter.canBeGained(card, current, player));
					});
					var cards = trigger.getg(target).filter(card => get.color(card, target) == player.storage.sgsxjxfzmnl_yichong && lib.filter.canBeGained(card, target, player));
					var num = lib.skill.sgsxjxfzmnl_yichong.getLimit - target.countMark("yichong_" + player.playerid);
					cards = cards.randomGets(num);
					player.gain(cards, target, "giveAuto");
					target.addMark("yichong_" + player.playerid, cards.length, false);
				},
			},
			clear: {
				charlotte: true,
				onremove(player) {
					game.countPlayer(function (current) {
						current.removeSkill("yichong_" + player.playerid);
					});
				},
			},
		},
	},
	sgsxjxfzmnl_wufei: {
		audio: 'wufei',
		trigger: { player: ["useCardToPlayered", "damageEnd"] },
		filter(event, player) {
			var target = game.findPlayer(current => current.hasSkill("yichong_" + player.playerid));
			if (!target) {
				return false;
			}
			if (event.name == "damage") {
				return target.hp > player.hp;
			}
			return event.isFirstTarget && (event.card.name == "sha" || (get.type(event.card) == "trick" && get.tag(event.card, "damage")));
		},
		direct: true,
		content() {
			"step 0";
			var target = game.findPlayer(current => current.hasSkill("yichong_" + player.playerid));
			event.target = target;
			if (trigger.name == "damage") {
				player.chooseBool(get.prompt("sgsxjxfzmnl_wufei", target), "令" + get.translation(target) + "受到1点无来源伤害").set("choice", get.damageEffect(target, player, player) > 0);
			} else {
				player.logSkill("sgsxjxfzmnl_wufei", target);
				player.addTempSkill("sgsxjxfzmnl_wufei_effect");
				player.markAuto("sgsxjxfzmnl_wufei_effect", [trigger.card]);
				game.log(target, "成为了", trigger.card, "的伤害来源");
				event.finish();
			}
			"step 1";
			if (result.bool) {
				player.logSkill("sgsxjxfzmnl_wufei", target);
				target.damage("nosource");
			}
		},
		subSkill: {
			effect: {
				charlotte: true,
				trigger: { source: "damageBefore" },
				filter(event, player) {
					if (!event.card) {
						return false;
					}
					return player.getStorage("sgsxjxfzmnl_wufei_effect").includes(event.card);
				},
				forced: true,
				popup: false,
				firstDo: true,
				content() {
					var target = game.findPlayer(current => current.hasSkill("yichong_" + player.playerid));
					if (!target) {
						delete trigger.source;
					} else {
						trigger.source = target;
					}
				},
			},
		},
		ai: {
			combo: "sgsxjxfzmnl_yichong",
		},
	},


	//关羽
	//矢
	sgsxjxfzmnl_sbwusheng: {
		audio: 'sbwusheng',
		trigger: { player: "phaseUseBegin" },
		filter(event, player) {
			return game.hasPlayer(target => target != player );
		},
		direct: true,
		*content(event, map) {
			var player = map.player;
			var result = yield player
				.chooseTarget(get.prompt("sgsxjxfzmnl_sbwusheng"), "选择一名其他角色，本阶段对其使用【杀】无距离和次数限制，使用【杀】指定其为目标后摸两张牌，对其使用其体力值张【杀】后不能对其使用【杀】", (card, player, target) => {
					return target != player ;
				})
				.set("ai", target => {
					var player = _status.event.player;
					return get.effect(target, { name: "sha" }, player, player);
				});
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill("sgsxjxfzmnl_sbwusheng", target);
				if (get.mode() !== "identity" || player.identity !== "nei") {
					player.addExpose(0.25);
				}
				player.addTempSkill("sgsxjxfzmnl_sbwusheng_effect", { player: "phaseUseAfter" });
				player.addTempSkill("sgsxjxfzmnl_sbwusheng_max", { player: "phaseUseAfter" });
				player.storage.sgsxjxfzmnl_sbwusheng_effect[target.playerid] = 0;
				player.storage.sgsxjxfzmnl_sbwusheng_max[target.playerid] = target.hp;
			}
		},
		group: "sbwusheng_wusheng",
		subSkill: {
			wusheng: {
				audio: "sgsxjxfzmnl_sbwusheng",
				enable: ["chooseToUse", "chooseToRespond"],
				hiddenCard(player, name) {
					return name == "sha" && player.countCards("hs");
				},
				filter(event, player) {
					return event.filterCard(get.autoViewAs({ name: "sha" }, "unsure"), player, event) || lib.inpile_nature.some(nature => event.filterCard(get.autoViewAs({ name: "sha", nature }, "unsure"), player, event));
				},
				chooseButton: {
					dialog(event, player) {
						var list = [];
						if (event.filterCard(get.autoViewAs({ name: "sha" }, "unsure"), player, event)) {
							list.push(["基本", "", "sha"]);
						}
						for (var j of lib.inpile_nature) {
							if (event.filterCard(get.autoViewAs({ name: "sha", nature: j }, "unsure"), player, event)) {
								list.push(["基本", "", "sha", j]);
							}
						}
						var dialog = ui.create.dialog("武圣", [list, "vcard"], "hidden");
						dialog.direct = true;
						return dialog;
					},
					check(button) {
						var player = _status.event.player;
						var card = { name: button.link[2], nature: button.link[3] };
						if (
							_status.event.getParent().type == "phase" &&
							game.hasPlayer(function (current) {
								return player.canUse(card, current) && get.effect(current, card, player, player) > 0;
							})
						) {
							switch (button.link[2]) {
								case "sha":
									if (button.link[3] == "fire") {
										return 2.95;
									} else if (button.link[3] == "thunder" || button.link[3] == "ice") {
										return 2.92;
									} else {
										return 2.9;
									}
							}
						}
						return 1 + Math.random();
					},
					backup(links, player) {
						return {
							audio: "sgsxjxfzmnl_sbwusheng",
							filterCard: true,
							check(card) {
								return 6 - get.value(card);
							},
							viewAs: { name: links[0][2], nature: links[0][3] },
							position: "hs",
							popname: true,
						};
					},
					prompt(links, player) {
						return "将一张手牌当作" + get.translation(links[0][3] || "") + "【" + get.translation(links[0][2]) + "】" + (_status.event.name == "chooseToUse" ? "使用" : "打出");
					},
				},
				ai: {
					respondSha: true,
					fireAttack: true,
					skillTagFilter(player, tag) {
						if (!player.countCards("hs")) {
							return false;
						}
					},
					order(item, player) {
						if (player && _status.event.type == "phase") {
							var max = 0;
							if (lib.inpile_nature.some(i => player.getUseValue({ name: "sha", nature: i }) > 0)) {
								var temp = get.order({ name: "sha" });
								if (temp > max) {
									max = temp;
								}
							}
							if (max > 0) {
								max += 0.3;
							}
							return max;
						}
						return 4;
					},
					result: { player: 1 },
				},
			},
			effect: {
				charlotte: true,
				onremove: true,
				init(player) {
					if (!player.storage.sgsxjxfzmnl_sbwusheng_effect) {
						player.storage.sgsxjxfzmnl_sbwusheng_effect = {};
					}
				},
				mod: {
					targetInRange(card, player, target) {
						if (card.name == "sha" && typeof player.storage.sgsxjxfzmnl_sbwusheng_effect[target.playerid] == "number") {
							return true;
						}
					},
					cardUsableTarget(card, player, target) {
						if (card.name !== "sha" || typeof player.storage.sgsxjxfzmnl_sbwusheng_effect[target.playerid] !== "number") {
							return;
						}
						return player.storage.sgsxjxfzmnl_sbwusheng_effect[target.playerid] < player.storage.sgsxjxfzmnl_sbwusheng_max[target.playerid];//target.hp
					},
					playerEnabled(card, player, target) {
						if (card.name != "sha" || typeof player.storage.sgsxjxfzmnl_sbwusheng_effect[target.playerid] != "number") {
							return;
						}
						if (player.storage.sgsxjxfzmnl_sbwusheng_effect[target.playerid] >= player.storage.sgsxjxfzmnl_sbwusheng_max[target.playerid]) {
							return false;
						}
					},
				},
				audio: "sgsxjxfzmnl_sbwusheng",
				trigger: { player: ["useCardToPlayered", "useCardAfter"] },
				filter(event, player) {
					if (event.card.name != "sha") {
						return false;
					}
					if (event.name == "useCard") {
						return event.targets.some(target => typeof player.storage.sgsxjxfzmnl_sbwusheng_effect[target.playerid] == "number");
					}
					return typeof player.storage.sgsxjxfzmnl_sbwusheng_effect[event.target.playerid] == "number";
				},
				direct: true,
				content() {
					if (trigger.name == "useCard") {
						var targets = trigger.targets.filter(target => typeof player.storage.sgsxjxfzmnl_sbwusheng_effect[target.playerid] == "number");
						targets.forEach(target => player.storage.sgsxjxfzmnl_sbwusheng_effect[target.playerid]++);
					} else {
						player.logSkill("sgsxjxfzmnl_sbwusheng_effect", trigger.target);
						player.draw(2);
					}
				},
			},
			max:{
				charlotte:true,
				onremove:true,
			},
		},
		ai: { threaten: 114514 },
	},
	sgsxjxfzmnl_sbyijue: {
		audio: 'sbyijue',
		// trigger: { global: "damageBegin4" },
		// filter(event, player) {
		// 	if (!event.source || event.source != player || event.player == player) {
		// 		return false;
		// 	}
		// 	return event.num >= event.player.hp && !player.getStorage("sgsxjxfzmnl_sbyijue").includes(event.player);
		// },
		forced: true,
		logTarget: "player",
		// content() {
		// 	trigger.cancel();
		// 	player.addTempSkill("sgsxjxfzmnl_sbyijue_effect");
		// 	player.markAuto("sgsxjxfzmnl_sbyijue", [trigger.player]);
		// 	player.markAuto("sgsxjxfzmnl_sbyijue_effect", [trigger.player]);
		// },
		trigger:{
			global:['dyingAfter'],
		},
		filter:function (event,player,name){
			if (!event.source || event.source != player || event.player == player) {
				return false;
			}
			return event.player.isAlive()&& !player.getStorage("sgsxjxfzmnl_sbyijue").includes(event.player);
		},
		content() {
			// trigger.cancel();
			player.addTempSkill("sgsxjxfzmnl_sbyijue_effect");
			player.markAuto("sgsxjxfzmnl_sbyijue", [trigger.player]);
			player.markAuto("sgsxjxfzmnl_sbyijue_effect", [trigger.player]);
		},
		ai: {
			neg: true,
		},
		marktext: "绝",
		intro: { content: "已放$一马" },
		subSkill: {
			effect: {
				charlotte: true,
				onremove: true,
				audio: "sgsxjxfzmnl_sbyijue",
				trigger: { player: "useCardToPlayer" },
				filter(event, player) {
					return player.getStorage("sgsxjxfzmnl_sbyijue_effect").includes(event.target);
				},
				forced: true,
				logTarget: "target",
				content() {
					trigger.getParent().excluded.add(trigger.target);
				},
				ai: {
					effect: {
						player(card, player, target) {
							if (player.getStorage("sgsxjxfzmnl_sbyijue_effect").includes(target)) {
								return "zeroplayertarget";
							}
						},
					},
				},
				marktext: "义",
				intro: { content: "本回合放$一马" },
			},
		},
	},


	//黄盖
	sgsxjxfzmnl_sbkurou: {
		audio: 'sbkurou',
		trigger: { player: "phaseUseBegin" },
		async cost(event, trigger, player) {
			event.result = await player
				.chooseCardTarget({
					prompt: get.prompt(event.skill),
					prompt2: "交给其他角色一张牌，若此牌为【桃】或【酒】，你失去2点体力，否则你失去1点体力",
					filterCard: true,
					position: "he",
					filterTarget: lib.filter.notMe,
					ai1(card) {
						const player = get.player();
						if ((player.hp <= 1 && !player.canSave(player)) || player.hujia >= 5) {
							return 0;
						}
						if (
							get.value(card, player) > 6 &&
							!game.hasPlayer(current => {
								return current != player && get.attitude(current, player) > 0 && !current.hasSkillTag("nogain");
							})
						) {
							return 0;
						}
						if (
							player.hp >= 2 &&
							(card.name == "tao" ||
								(card.name == "jiu" &&
									player.countCards("hs", cardx => {
										return cardx != card && get.tag(cardx, "save");
									}))) &&
							player.hujia <= 1
						) {
							return 10;
						}
						if (player.hp <= 1 && !player.canSave(player)) {
							return 0;
						}
						return 1 / Math.max(0.1, get.value(card));
					},
					ai2(target) {
						let player = get.player(),
							att = get.attitude(player, target);
						if (ui.selected.cards.length) {
							const val = get.value(ui.selected.cards[0]);
							att *= val >= 0 ? 1 : -1;
						}
						if (target.hasSkillTag("nogain")) {
							att /= 9;
						}
						return 15 + att;
					},
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const {
				cards,
				targets: [target],
			} = event;
			if (get.mode() !== "identity" || player.identity !== "nei") {
				player.addExpose(0.15);
			}
			await player.give(cards, target);
			await player.loseHp(["tao", "jiu"].includes(get.name(cards[0], target)) ? 2 : 1);
		},
		group: "sgsxjxfzmnl_sbkurou_gain",
		ai: {
			nokeep: true,
			skillTagFilter(player, tag, arg) {
				if (tag === "nokeep") {
					return (!arg || (arg.card && get.name(arg.card) === "tao")) && player.hp <= 0 && player.isPhaseUsing();
				}
			},
		},
		subSkill: {
			gain: {
				audio: "sgsxjxfzmnl_sbkurou",
				trigger: { player: "loseHpEnd" },
				forced: true,
				locked: false,
				filter(event, player) {
					return player.isIn() && player.hujia < 5 && event.num > 0;
				},
				getIndex: event => event.num,
				async content(event, trigger, player) {
					await player.changeHujia(2, null, true);
				},
				ai: {
					maihp: true,
					effect: {
						target(card, player, target) {
							if (get.tag(card, "damage")) {
								if (player.hasSkillTag("jueqing", false, target)) {
									return [1, 1];
								}
								return 1.2;
							}
							if (get.tag(card, "loseHp")) {
								if (target.hp <= 1 || target.hujia >= 5) {
									return;
								}
								return [1, 1];
							}
						},
					},
				},
			},
		},
		mod:{
			maxHandcard:function (player,num){
				return num+player.hujia;
			},
		},
	},
	sgsxjxfzmnl_sbzhaxiang: {
		audio: 'sbzhaxiang',
		trigger: { player: "useCard1" },
		forced: true,
		group: ["sgsxjxfzmnl_sbzhaxiang_draw", "sgsxjxfzmnl_sbzhaxiang_mark"],
		filter(event, player) {
			var num = player.getDamagedHp()+player.hujia;
			return player.getHistory("useCard").length <= num && player == _status.currentPhase;
		},
		content() {
			trigger.directHit.addArray(game.filterPlayer());
			game.log(trigger.card, "不可被响应");
		},
		ai: {
			threaten: 1.5,
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				var num = player.getDamagedHp()+player.hujia;
				return player.countUsed() < num;
			},
		},
		mod: {
			targetInRange(card, player) {
				var num = player.getDamagedHp()+player.hujia;
				if (player.countUsed() < num) {
					return true;
				}
			},
			cardUsable(card, player) {
				var num = player.getDamagedHp()+player.hujia;
				if (player.countUsed() < num) {
					return Infinity;
				}
			},
			aiOrder(player, card, num) {
				var num = player.getDamagedHp()+player.hujia;
				if (player.countUsed() >= num) {
					return;
				}
				var numx = get.info(card).usable;
				if (typeof numx == "function") {
					return numx(card, player) + 10;
				}
				if (typeof numx == "number") {
					return num + 10;
				}
			},
		},
		subSkill: {
			mark: {
				charlotte: true,
				silent: true,
				firstDo: true,
				trigger: {
					player: ["changeHp", "useCard"],
					global: ["phaseBegin", "phaseAfter"],
				},
				filter(event, player) {
					return player == _status.currentPhase;
				},
				content() {
					const skill = event.name;
					var numx = player.getDamagedHp()+player.hujia;
					if (event.triggername != "phaseAfter") {
						const num = Math.max(0, numx - player.getHistory("useCard").length);
						if (player.countMark(skill) != num) {
							player.setMark(skill, num, false);
						}
						player.addTip(skill, `${get.translation(skill)}剩余${num}`);
					} else {
						player.clearMark(skill, false);
						player.removeTip(skill);
					}
				},
				intro: {
					content: "还剩 # 张牌无距离次数限制且不可被响应",
				},
			},
			draw: {
				audio: "sgsxjxfzmnl_sbzhaxiang",
				mod: {
					aiOrder(player, card, num) {
						if (num > 0 && _status.event && _status.event.type == "phase" && get.tag(card, "recover")) {
							return num / 5;
						}
					},
				},
				trigger: { player: "phaseDrawBegin2" },
				forced: true,
				filter(event, player) {
					var numx = player.getDamagedHp()+player.hujia;
					return !event.numFixed && numx > 0;
				},
				content() {
					var numx = player.getDamagedHp()+player.hujia;
					trigger.num += numx;
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (get.tag(card, "recover") && target.hp > 0 && target.needsToDiscard() < 1) {
								return [0, 0];
							}
						},
					},
				},
			},
		},
	},


	//周宣
	sgsxjxfzmnl_dcwumei: {
		audio: 'dcwumei',
		// round: 1,
		trigger: { player: "phaseBeforeEnd" },
		filter(event, player) {
			if (event.finished) {
				return false;
			}
			if(!player.storage.sgsxjxfzmnl_dcwumei||player.storage.sgsxjxfzmnl_dcwumei<2)return false
			return !player.isTurnedOver() || event._noTurnOver; //笑点解析：回合开始前，但是翻面不能发动
		},
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill))
				.set("ai", target => get.attitude(get.player(), target))
				.forResult();
		},
		onRound(event) {
			return !event.wumei_phase;
		},
		init(player){
			// player.storage.sgsxjxfzmnl_dcwumei=2;
			player.addMark('sgsxjxfzmnl_dcwumei',2,false);
			// _status.event.trigger.trigger("sgsxjxfzmnl_dcwumei_change");
			// player.useSkill('sgsxjxfzmnl_dcwumei_updata')
			// lib.skill.sgsxjxfzmnl_dcwumei_updata.content();
			// var next = game.createEvent('sgsxjxfzmnl_dcwumei_updata', false);
			// next.player = player;
			// next.setContent(lib.skill.sgsxjxfzmnl_dcwumei_updata.content());
			// next;
		},
		// contentBefore(){
		// 	player.storage.sgsxjxfzmnl_dcwumei=0;
		// 	lib.skill.sgsxjxfzmnl_dcwumei_updata.content();
		// },
		async content(event, trigger, player) {
			// player.storage.sgsxjxfzmnl_dcwumei=0;
			player.removeMark('sgsxjxfzmnl_dcwumei',player.countMark('sgsxjxfzmnl_dcwumei'),false);
			// player.useSkill('sgsxjxfzmnl_dcwumei_updata')
			const [target] = event.targets;
			const next = target.insertPhase();
			target.addSkill("sgsxjxfzmnl_dcwumei_wake");
			target.storage["sgsxjxfzmnl_dcwumei_wake"][2].add(next);
			if (!trigger._finished) {
				trigger.finish();
				trigger._finished = true;
				trigger.untrigger(true);
				trigger._triggered = 5;
				if (!lib.onround.includes(lib.skill.sgsxjxfzmnl_dcwumei.onRound)) {
					lib.onround.push(lib.skill.sgsxjxfzmnl_dcwumei.onRound);
				}
				const evt = player.insertPhase();
				evt.wumei_phase = true;
				evt.phaseList = trigger.phaseList;
				evt.relatedEvent = trigger.relatedEvent || trigger.getParent(2);
				evt.skill = trigger.skill;
				evt._noTurnOver = true;
				evt.set("phaseList", trigger.phaseList);
				evt.pushHandler("sgsxjxfzmnl_dcwumei_phase", (event, option) => {
					if (event.step === 0 && option.state === "begin") {
						event.step = 4;
						_status.globalHistory.push({
							cardMove: [],
							custom: [],
							useCard: [],
							changeHp: [],
							everything: [],
						});
						var players = game.players.slice(0).concat(game.dead);
						for (var i = 0; i < players.length; i++) {
							var current = players[i];
							current.actionHistory.push({
								useCard: [],
								respond: [],
								skipped: [],
								lose: [],
								gain: [],
								sourceDamage: [],
								damage: [],
								custom: [],
								useSkill: [],
							});
							current.stat.push({ card: {}, skill: {} });
						}
					}
				});
			}
			const nexts = trigger.getParent()?.next;
			if (nexts?.length) {
				for (let evt of nexts.slice(0)) {
					if (evt.finished) {
						continue;
					}
					if (evt == next) {
						break;
					}
					nexts.remove(evt);
					nexts.push(evt);
				}
			}
		},
		mark:true,
		marktext:'夢',
		intro: {
			name2: "寤寐",
			// mark(dialog, storage, player) {
			// 	dialog.addText("数字到2说明技能可用");
			// },
			markcount:function(storage){
				var num=storage;
				if(num>=2)return '√';
				else if(num==1)return '1';
				else return '×';
			},
		},
		group:['sgsxjxfzmnl_dcwumei_phaseAfter'],
		subSkill: {
			wake: {
				init(player, skill) {
					if (!player.storage[skill]) {
						player.storage[skill] = [[], [], []];
					}
				},
				charlotte: true,
				onremove: true,
				trigger: { player: ["phaseBegin", "phaseEnd"] },
				filter(event, player) {
					return player.storage["sgsxjxfzmnl_dcwumei_wake"][2].includes(event);
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					const name = event.triggername;
					if (name === "phaseBegin") {
						for (const playerx of game.filterPlayer()) {
							player.storage[event.name][0].push(playerx);
							player.storage[event.name][1].push(playerx.hp);
						}
						player.markSkill(event.name);
					} else {
						const storage = player.getStorage(event.name);
						if (storage.length) {
							for (let i = 0; i < storage[0].length; i++) {
								const target = storage[0][i];
								if (target?.isIn?.()&&target.getHistory("damage").length) {
									// if (target.hp != storage[1][i]) {
									// 	game.log(target, "将体力从", "#y" + target.hp, "改为", "#g" + storage[1][i]);
									// 	const next = target.changeHp(storage[1][i] - target.hp);
									// 	next._triggered = null;
									// 	await next;
									// }
									var result = await target.chooseCard('h',"将两张牌交给" + get.translation(player)+'，否则失去一点体力',2).set('ai',function(card){
										return 6-get.value(card)&&!lib.card[get.name(card)].ai.recover;
									}).forResult();
									if(result.cards){
										await event.target1.give(result.cards,player);
									}
									else{
										await target.loseHp()
									}
								}
							}
						}
						player.storage[event.name][2].remove(trigger);
						player.storage[event.name][0] = player.storage[event.name][1] = [];
						player[player.storage[event.name][2].length ? "unmarkSkill" : "removeSkill"](event.name);
					}
				},
				marktext: "梦",
				intro: {
					markcount: (storage = [[]]) => storage[0].length,
					content(storage = [[]], player) {
						// if (!storage.length) {
						// 	return "无信息";
						// }
						// var str = "所有角色于回合开始时的体力值：<br>";
						// for (var i = 0; i < storage[0].length; i++) {
						// 	var str2 = get.translation(storage[0][i]) + "：" + storage[1][i];
						// 	if (!storage[0][i].isIn()) {
						// 		str2 = '<span style="opacity:0.5">' + str2 + "（已故）</span>";
						// 	}
						// 	str += "<li>" + str2;
						// }
						var str = "所有此回合受伤的角色需选择一项：1.将两张手牌交给你；2.失去一点体力。";
						return str;
					},
				},
				// global: "sgsxjxfzmnl_dcwumei_all",
			},
			all: {
				mod: {
					aiOrder(player, card, num) {
						if (num <= 0 || !game.hasPlayer(t => t.marks["sgsxjxfzmnl_dcwumei_wake"])) {
							return;
						}
						if (get.tag(card, "recover") && !_status.event.dying && player.hp > 0) {
							return 0;
						}
						if (get.tag(card, "damage")) {
							if (
								card.name == "sha" &&
								game.hasPlayer(cur => {
									return cur.hp < 2 && player.canUse(card, cur, null, true) && get.effect(cur, card, player, player) > 0;
								})
							) {
								return num;
							}
							if (player.needsToDiscard()) {
								return num / 5;
							}
							return 0;
						}
					},
				},
			},
			phaseAfter:{
				direct:true,
				trigger:{global:'phaseAfter'},
				filter(event,player){
					return player.hasSkill('sgsxjxfzmnl_dcwumei')
				},
				content(){
					player.addMark('sgsxjxfzmnl_dcwumei',1,false);
					// if(typeof player.storage.sgsxjxfzmnl_dcwumei!='number')player.storage.sgsxjxfzmnl_dcwumei=2;
					// else player.storage.sgsxjxfzmnl_dcwumei++;
					// player.useSkill('sgsxjxfzmnl_dcwumei_updata')
				},
			},
			updata:{
				direct:true,
				trigger:{global:'sgsxjxfzmnl_dcwumei_change'},
				filter(){return true},
				content(){
					// var num = player.storage.sgsxjxfzmnl_dcwumei||0;
					var num = player.countMark('sgsxjxfzmnl_dcwumei')
					game.broadcastAll(
						function (ind,num) {
							var bgColor = ind,
								text = '夢';
							for (var player of game.players) {
								if (player.marks.sgsxjxfzmnl_dcwumei) {
									// 设置三个阶段的颜色控制
									function setStageColor(player, stage) {
										var element = player.marks.sgsxjxfzmnl_dcwumei.firstChild;
										
										switch(stage) {
											case 0: // 没有颜色
												element.style.background = 'transparent';
												break;
												
											case 1: // 只占据下半边
												// 方法1：使用linear-gradient
												element.style.background = `linear-gradient(to bottom, transparent 50%, ${bgColor} 50%)`;
												// 或者方法2：如果需要保持原有背景色
												// element.style.background = `linear-gradient(to bottom, [原有背景色] 50%, ${bgColor} 50%)`;
												break;
												
											case 2: // 占据全部
												element.style.backgroundColor = bgColor;
												break;
										}
									}

									// 使用示例：
									// setStageColor(player, 0); // 无颜色
									// setStageColor(player, 1); // 下半边
									// setStageColor(player, 2); // 全部
									// if(num<=0){

									// }
									// else if(num==1){

									// }
									// else{

									// }
									// player.marks.sgsxjxfzmnl_dcwumei.firstChild.style.backgroundColor = bgColor;
									// player.marks.sgsxjxfzmnl_dcwumei.firstChild.style.background = `linear-gradient(to bottom, transparent 50%, ${bgColor} 50%)`;
									player.marks.sgsxjxfzmnl_dcwumei.firstChild.innerHTML = text;
									setStageColor(player,num)
								}
							}
						},
						["rgba(47, 227, 206, 0.75)", "black"],
						num,
					);
				}
			},
		},
	},
	sgsxjxfzmnl_dczhanmeng: {
		audio: 'dczhanmeng',
		trigger: { player: "useCard" },
		filter(event, player) {
			// return (
			// 	!player.hasStorage("dczhanmeng_choice", 1) ||
			// 	!player.hasStorage("dczhanmeng_choice", 2) ||
			// 	(!player.hasStorage("dczhanmeng_choice", 0) &&
			// 		!game.hasPlayer2(current => {
			// 			const history = current.actionHistory;
			// 			if (history.length < 2) {
			// 				return false;
			// 			}
			// 			for (let i = history.length - 2; i >= 0; i--) {
			// 				if (history[i].isSkipped) {
			// 					continue;
			// 				}
			// 				const list = history[i].useCard.map(evt => evt.card.name);
			// 				return list.includes(event.card.name);
			// 			}
			// 			return false;
			// 		}, true))
			// );
			// if(player.storage.sgsxjxfzmnl_dczhanmeng){
			// 	return !player.storage.sgsxjxfzmnl_dczhanmeng.includes(event.card.name)
			// }
			if(!player.hasStorage("dczhanmeng_choice", event.card.name)){
				return true
			}
			return false;
		},
		async cost(event, trigger, player) {
			let list = [],
				choiceList = ["摸一张非伤害牌", "摸一张伤害牌", "令一名其他角色弃置两张牌，然后你对其造成1点火焰伤害"];
			let used = game.hasPlayer2(current => {
				let history = current.actionHistory;
				if (history.length < 2) {
					return false;
				}
				for (let i = history.length - 2; i >= 0; i--) {
					if (history[i].isSkipped) {
						continue;
					}
					const list = history[i].useCard.map(evt => evt.card.name);
					return list.includes(trigger.card.name);
				}
				return false;
			}, true);
			if (true) {
				list.push("选项一");
			}
			// if (!player.hasStorage("dczhanmeng_choice", 0) && !used) {
			// 	list.push("选项一");
			// } else {
			// 	choiceList[0] = '<span style="opacity:0.5; ">' + choiceList[0] + (used ? "（同名牌被使用过）" : "（已选择）") + "</span>";
			// }
			if (true) {
				list.push("选项二");
			}
			// if (!player.hasStorage("dczhanmeng_choice", 1)) {
			// 	list.push("选项二");
			// } else {
			// 	choiceList[1] = '<span style="opacity:0.5">' + choiceList[1] + "（已选择）</span>";
			// }
			let other = game.hasPlayer(current => current != player);
			if (!player.hasStorage("dczhanmeng_choice", 2) && other) {
				list.push("选项三");
			} else {
				choiceList[2] = '<span style="opacity:0.5">' + choiceList[2] + (!other ? "（没人啦）" : "（已选择）") + "</span>";
			}
			const { result } = await player
				.chooseControl(list, "cancel2")
				.set("prompt", get.prompt("sgsxjxfzmnl_dczhanmeng"))
				.set("ai", (event, player) => {
					const choices = _status.event.controls.slice().remove("cancel2"),
						evt = _status.event.getTrigger();
					if (choices.includes("选项三")) {
						if (
							game.hasPlayer(current => {
								if (current == player || !current.countDiscardableCards(current, "he")) {
									return false;
								}
								let eff1 = get.effect(current, { name: "guohe_copy2" }, player, player) + 0.1,
									eff2 = get.damageEffect(current, player, player, "fire") + 0.1;
								if (eff1 < 0 && eff2 < 0) {
									return false;
								}
								return eff1 * eff2 > 0;
							})
						) {
							return "选项三";
						}
						choices.remove("选项三");
					}
					if (choices.includes("选项二")) {
						if (evt.card.name == "sha") {
							return "选项二";
						}
						if (get.type(evt.card, null, false) == "equip") {
							choices.remove("选项二");
						}
					}
					if (!choices.length) {
						return "cancel2";
					}
					return choices.randomGet();
				})
				.set("choiceList", choiceList);
			event.result = {
				bool: result?.control ? result.control != "cancel2" : false,
				cost_data: result?.control,
			};
		},
		popup: false,
		async content(event, trigger, player) {
			player.markAuto("dczhanmeng_choice", trigger.card.name, true);
			player.addTempSkill("dczhanmeng_choice");
			if (event.cost_data != "选项三") {
				await player.logSkill(event.name);
				game.log(player, "选择了", "#y" + event.cost_data);
			}
			if (event.cost_data == "选项一") {
				// let card = get.cardPile2(card => {
				// 	return !get.tag(card, "damage");
				// });
				// if (card) {
				// 	await player.gain(card, "gain2");
				// }
				await player.YB_drawCard({tag:'!damage'});
			} else if (event.cost_data == "选项二") {
				// trigger["dczhanmeng_" + player.playerid] = true;
				// player.addSkill("dczhanmeng_delay");
				// let card = get.cardPile2(card => {
				// 	return get.tag(card, "damage");
				// });
				// if (card) {
				// 	await player.gain(card, "gain2");
				// }
				await player.YB_drawCard({tag:'damage'});
			} else {
				const { result } = await player.chooseTarget("占梦：令一名其他角色弃置两张牌，并对其造成1点火焰伤害", lib.filter.notMe, true).set("ai", target => {
					let player = _status.event.player;
					let eff1 = get.effect(target, { name: "guohe_copy2" }, player, player) + 0.1,
						eff2 = get.damageEffect(target, player, player, "fire") + 0.1;
					if (eff1 < 0 && eff2 < 0) {
						return -eff1 * eff2;
					}
					return eff1 * eff2;
				});
				if (result?.bool && result.targets?.length) {
					const target = result.targets[0];
					await player.logSkill(event.name, target);
					game.log(player, "选择了", "#y选项三");
					if (target.countDiscardableCards(target, "he")) {
						const { result: result2 } = await target.chooseToDiscard(2, "he", true);
						// if (result2?.bool && result2.cards?.length) {
						// 	let num = result2.cards.reduce((sum, card) => sum + get.number(card, false), 0);
						// 	if (num > 10) {
						// 		player.line(target, "fire");
						// 		await target.damage("fire");
						// 	}
						// }
					}
					player.line(target, "fire");
					await target.damage("fire");
				}
			}
		},
		subSkill: {
			choice: {
				charlotte: true,
				onremove: true,
			},
			delay: {
				charlotte: true,
				trigger: { global: ["useCardAfter", "phaseBeginStart"] },
				filter(event, player, name) {
					let history = player.actionHistory;
					if (history.length < 2) {
						return false;
					}
					let list = history[history.length - 2].useCard;
					if (name == "phaseBeginStart") {
						return !list.some(evt => evt["dczhanmeng_" + player.playerid]);
					}
					for (let evt of list) {
						if (
							evt["dczhanmeng_" + player.playerid] &&
							event.card.name == evt.card.name &&
							game
								.getGlobalHistory("useCard", evtx => {
									return evtx.card.name == event.card.name;
								})
								.indexOf(event) == 0
						) {
							return true;
						}
					}
					return false;
				},
				forced: true,
				popup: false,
				silent: true,
				async content(event, trigger, player) {
					if (event.triggername != "phaseBeginStart") {
						await player.logSkill("sgsxjxfzmnl_dczhanmeng");
						let card = get.cardPile2(card => {
							return get.tag(card, "damage");
						});
						if (card) {
							await player.gain(card, "gain2");
						}
					} else {
						player.removeSkill(event.name);
					}
				},
			},
		},
		ai: { threaten: 8 },
	},

	//孙翎鸾
	sgsxjxfzmnl_dclingyue: {
		audio: 'dclingyue',
		trigger: { global: "damageSource" },
		forced: true,
		filter(event, player) {
			if (!event.source || !event.source.isIn()) {
				return false;
			}
			var history = event.source.actionHistory;
			for (var i = history.length - 1; i >= 0; i--) {
				if (i == history.length - 1) {
					if (history[i].sourceDamage.indexOf(event) > 0) {
						return false;
					}
				} else if (history[i].sourceDamage.some(evt => evt != event)) {
					return false;
				}
				if (history[i].isRound) {
					break;
				}
			}
			return true;
		},
		content() {
			var num = 1,
				current = _status.currentPhase;
			if (current && trigger.source != current) {
				var num = 0,
					players = game.players.slice(0).concat(game.dead);
				for (var target of players) {
					target.getHistory("sourceDamage", function (evt) {
						num += evt.num;
					});
				}
			}
			player.draw(num);
		},
	},
	sgsxjxfzmnl_dcpandi: {
		audio: 'dcpandi',
		enable: "phaseUse",
		filter(event, player) {
			var players = event.sgsxjxfzmnl_dcpandi;
			if (!players || !players.length) {
				return false;
			}
			var source = player.storage.sgsxjxfzmnl_dcpandi_effect;
			return get.itemtype(source) != "player" || !source.isIn();
		},
		pandi_wrapKey() {
			var str = "";
			for (var arg of arguments) {
				if (arg === null || arg === undefined) {
					str += arg + "-";
					continue;
				}
				switch (get.itemtype(arg)) {
					case "player":
						str += "p:" + arg.playerid;
						break;
					case "card":
						if (arg.cardid) {
							str += "c:" + arg.cardid;
						} else {
							str += "c:" + arg.name;
						}
						break;
					default:
						str += "n:" + arg;
						break;
				}
				str += "-";
			}
			return str;
		},
		pandi_effect(target, card, player, viewer) {
			if (!_status.event) {
				return get.effect(target, card, player, viewer);
			}
			var key = lib.skill.sgsxjxfzmnl_dcpandi.pandi_wrapKey.apply(null, arguments);
			var effect = _status.event.getTempCache("effect", key);
			if (effect !== undefined) {
				return effect;
			}
			effect = get.effect(target, card, player, viewer);
			_status.event.putTempCache("effect", key, effect);
			return effect;
		},
		pandi_canUse(player, card, target, arg1, arg2) {
			if (!_status.event) {
				return player.canUse(card, target, arg1, arg2);
			}
			var key = lib.skill.sgsxjxfzmnl_dcpandi.pandi_wrapKey.apply(null, arguments);
			var effect = _status.event.getTempCache("canUse", key);
			if (effect !== undefined) {
				return effect;
			}
			effect = player.canUse(card, target, arg1, arg2);
			_status.event.putTempCache("canUse", key, effect);
			return effect;
		},
		pandi_effect_use(target, card, player, viewer) {
			if (!_status.event) {
				return get.effect_use(target, card, player, viewer);
			}
			var key = lib.skill.sgsxjxfzmnl_dcpandi.pandi_wrapKey.apply(null, arguments);
			var effect = _status.event.getTempCache("effect_use", key);
			if (effect !== undefined) {
				return effect;
			}
			effect = get.effect_use(target, card, player, viewer);
			_status.event.putTempCache("effect_use", key, effect);
			return effect;
		},
		onChooseToUse(event) {
			if (!game.online && event.type == "phase" && !event.sgsxjxfzmnl_dcpandi) {
				var players = game.filterPlayer(function (current) {
					return current != event.player// && current.getHistory("sourceDamage").length == 0;
				});
				event.set("sgsxjxfzmnl_dcpandi", players);
			}
		},
		filterTarget(card, player, target) {
			var players = _status.event.sgsxjxfzmnl_dcpandi;
			if (!players || !players.length) {
				return false;
			}
			return players.includes(target);
		},
		content() {
			if (target.isIn()) {
				player.storage.sgsxjxfzmnl_dcpandi_effect = target;
				player.addTempSkill("sgsxjxfzmnl_dcpandi_effect", "phaseUseAfter");
			}
		},
		ai: {
			threaten: 4,
			order: 12,
			result: {
				player(player, target) {
					return player.getCards("hs").reduce(function (eff, card) {
						return Math.max(eff, lib.skill.sgsxjxfzmnl_dcpandi.getUseValue(card, target, player) - lib.skill.sgsxjxfzmnl_dcpandi.getUseValue(card, player, player));
					}, 0);
				},
			},
		},
		getUseValue(card, player, viewer) {
			if (typeof card == "string") {
				card = { name: card, isCard: true };
			}
			var key = lib.skill.sgsxjxfzmnl_dcpandi.pandi_wrapKey(card, player, viewer);
			if (_status.event) {
				var uv = _status.event.getTempCache("getUseValue", key);
				if (uv !== undefined) {
					return uv;
				}
			}
			var targets = game.filterPlayer();
			var value = [];
			var min = 0;
			var info = get.info(card);
			if (!info || info.notarget) {
				if (_status.event) {
					_status.event.putTempCache("getUseValue", key, 0);
				}
				return 0;
			}
			var range;
			var select = get.copy(info.selectTarget);
			if (select == undefined) {
				if (info.filterTarget == undefined) {
					if (_status.event) {
						_status.event.putTempCache("getUseValue", key, true);
					}
					return true;
				}
				range = [1, 1];
			} else if (typeof select == "number") {
				range = [select, select];
			} else if (get.itemtype(select) == "select") {
				range = select;
			} else if (typeof select == "function") {
				range = select(card, player);
				if (typeof range == "number") {
					range = [range, range];
				}
			}
			if (info.singleCard) {
				range = [1, 1];
			}
			game.checkMod(card, player, range, "selectTarget", player);
			if (!range) {
				if (_status.event) {
					_status.event.putTempCache("getUseValue", key, 0);
				}
				return 0;
			}
			for (var i = 0; i < targets.length; i++) {
				if (lib.skill.sgsxjxfzmnl_dcpandi.pandi_canUse(player, card, targets[i], null, true)) {
					var eff = lib.skill.sgsxjxfzmnl_dcpandi.pandi_effect(targets[i], card, player, viewer);
					value.push(eff);
				}
			}
			value.sort(function (a, b) {
				return b - a;
			});
			for (var i = 0; i < value.length; i++) {
				if (i == range[1] || (range[1] != -1 && value[i] <= 0)) {
					break;
				}
				min += value[i];
			}
			if (_status.event) {
				_status.event.putTempCache("getUseValue", key, min);
			}
			return min;
		},
		subSkill: {
			effect: {
				audio: "sgsxjxfzmnl_dcpandi",
				charlotte: true,
				priority: Infinity,
				onremove: true,
				mark: "character",
				intro: {
					content: "下一张牌视为由$使用",
				},
				trigger: { player: "useCardBefore" },
				forced: true,
				filter(event, player) {
					var source = player.storage.sgsxjxfzmnl_dcpandi_effect;
					return get.itemtype(source) == "player" && source.isIn();
				},
				logTarget: (event, player) => player.storage.sgsxjxfzmnl_dcpandi_effect,
				content() {
					trigger.player = player.storage.sgsxjxfzmnl_dcpandi_effect;
					trigger.noai = true;
					player.removeSkill("sgsxjxfzmnl_dcpandi_effect");
					game.delay(0.5);
				},
				ai: {
					order(card, player, target, current) {
						if (typeof card != "object") {
							return;
						}
						var source = player.storage.sgsxjxfzmnl_dcpandi_effect;
						if (!source.isIn() || get.itemtype(source) != "player" || get.itemtype(source.storage.sgsxjxfzmnl_dcpandi_effect) == "player") {
							return;
						}
						return [0, lib.skill.sgsxjxfzmnl_dcpandi.pandi_effect_use(target, card, source, player), 0, lib.skill.sgsxjxfzmnl_dcpandi.pandi_effect(target, card, source, target)];
					},
				},
				mod: {
					selectTarget(card, player, range) {
						var source = player.storage.sgsxjxfzmnl_dcpandi_effect;
						if (!source.isIn() || get.itemtype(source) != "player" || get.itemtype(source.storage.sgsxjxfzmnl_dcpandi_effect) == "player") {
							return;
						}
						var range,
							info = get.info(card);
						var select = get.copy(info.selectTarget);
						if (select == undefined) {
							if (info.filterTarget == undefined) {
								return [0, 0];
							}
							range = [1, 1];
						} else if (typeof select == "number") {
							range = [select, select];
						} else if (get.itemtype(select) == "select") {
							range = select;
						} else if (typeof select == "function") {
							range = select(card, source);
							if (typeof range == "number") {
								range = [range, range];
							}
						}
						game.checkMod(card, source, range, "selectTarget", source);
					},
					cardEnabled2(card, player, event) {
						var source = player.storage.sgsxjxfzmnl_dcpandi_effect;
						if (!source.isIn() || get.itemtype(source) != "player" || get.itemtype(source.storage.sgsxjxfzmnl_dcpandi_effect) == "player") {
							return;
						}
						var check = game.checkMod(card, source, event, "unchanged", "cardEnabled2", source);
						return check;
					},
					cardEnabled(card, player, event) {
						var source = player.storage.sgsxjxfzmnl_dcpandi_effect;
						if (!source.isIn() || get.itemtype(source) != "player" || get.itemtype(source.storage.sgsxjxfzmnl_dcpandi_effect) == "player") {
							return;
						}
						if (event === "forceEnable") {
							var mod = game.checkMod(card, source, event, "unchanged", "cardEnabled", source);
							if (mod != "unchanged") {
								return mod;
							}
							return true;
						} else {
							var filter = get.info(card).enable;
							if (!filter) {
								return;
							}
							var mod = game.checkMod(card, player, source, "unchanged", "cardEnabled", source);
							if (mod != "unchanged") {
								return mod;
							}
							if (typeof filter == "boolean") {
								return filter;
							}
							if (typeof filter == "function") {
								return filter(card, source, event);
							}
						}
					},
					cardUsable(card, player, num) {
						var source = player.storage.sgsxjxfzmnl_dcpandi_effect;
						if (!source.isIn() || get.itemtype(source) != "player" || get.itemtype(source.storage.sgsxjxfzmnl_dcpandi_effect) == "player") {
							return;
						}
						var event = _status.event;
						if (event.type == "chooseToUse_button") {
							event = event.getParent();
						}
						if (source != _status.event.player) {
							return true;
						}
						if (info.updateUsable == "phaseUse") {
							if (event.getParent().name != "phaseUse") {
								return true;
							}
							if (event.getParent().player != source) {
								return true;
							}
						}
						event.addCount_extra = true;
						var num = info.usable;
						if (typeof num == "function") {
							num = num(card, source);
						}
						num = game.checkMod(card, source, num, event, "cardUsable", source);
						if (typeof num != "number") {
							return true;
						}
						if (source.countUsed(card) < num) {
							return true;
						}
						if (
							game.hasPlayer(function (current) {
								return game.checkMod(card, source, current, false, "cardUsableTarget", source);
							})
						) {
							return true;
						}
						return false;
					},
					playerEnabled(card, player, target) {
						var source = player.storage.sgsxjxfzmnl_dcpandi_effect;
						if (!source.isIn() || get.itemtype(source) != "player" || get.itemtype(source.storage.sgsxjxfzmnl_dcpandi_effect) == "player") {
							return;
						}
						return lib.filter.targetEnabledx(card, source, target);
					},
					targetInRange(card, player, target) {
						var source = player.storage.sgsxjxfzmnl_dcpandi_effect;
						if (!source.isIn() || get.itemtype(source) != "player" || get.itemtype(source.storage.sgsxjxfzmnl_dcpandi_effect) == "player") {
							return;
						}
						return lib.filter.targetInRange(card, source, target);
					},
				},
			},
		},
	},
	//许劭
	sgsxjxfzmnl_pingjian: {
		initList() {
			// game.initCharacterList();
			var list = lib.characterSort.sgstrxs.sgsxjxfzmnl.filter(c=>lib.character[c]&&lib.translate[c].startsWith('阴间'));
			// list.filter(c=>lib.translate[c].startsWith('阴间'))
			return list;
		},
		init(player) {
			player.addSkill("sgsxjxfzmnl_pingjian_check");
			if (!player.storage.sgsxjxfzmnl_pingjian_check) {
				player.storage.sgsxjxfzmnl_pingjian_check = {};
			}
		},
		audio: 'pingjian',
		trigger: { player: ["damageEnd", "phaseJieshuBegin"] },
		frequent: true,
		content() {
			"step 0";
			if (Object.keys(player.storage.sgsxjxfzmnl_pingjian_check)?.length) {
				Object.keys(player.storage.sgsxjxfzmnl_pingjian_check).forEach(skill => {
					player.removeSkill(skill);
					const names = player.tempname && player.tempname.filter(i => get.character(i, 3)?.includes(skill));
					if (names) {
						get.nameList(player).forEach(name => {
							const { tempname } = get.character(name);
							if (tempname && Array.isArray(tempname)) {
								names.removeArray(tempname);
							}
						});
						game.broadcastAll((player, names) => player.tempname.removeArray(names), player, names);
					}
					delete player.storage.sgsxjxfzmnl_pingjian_check[skill];
				});
			}
			// var listx = lib.characterSort.sgstrxs.sgsxjxfzmnl;
			// listx.filter(c=>lib.translate[c].startsWith('阴间'))
			var listx=lib.skill.sgsxjxfzmnl_pingjian.initList();
			// var allList = _status.characterlist.slice(0);
			var allList = listx;
			// game.countPlayer(function (current) {
			// 	if (current.name && lib.character[current.name] && current.name.indexOf("gz_shibing") != 0 && current.name.indexOf("gz_jun_") != 0) {
			// 		allList.add(current.name);
			// 	}
			// 	if (current.name1 && lib.character[current.name1] && current.name1.indexOf("gz_shibing") != 0 && current.name1.indexOf("gz_jun_") != 0) {
			// 		allList.add(current.name1);
			// 	}
			// 	if (current.name2 && lib.character[current.name2] && current.name2.indexOf("gz_shibing") != 0 && current.name2.indexOf("gz_jun_") != 0) {
			// 		allList.add(current.name2);
			// 	}
			// });
			var list = [];
			var skills = [];
			var map = [];
			allList.randomSort();
			var name2 = event.triggername;
			for (var i = 0; i < allList.length; i++) {
				var name = allList[i];
				if (name.indexOf("zuoci") != -1 || name.indexOf("xushao") != -1) {
					continue;
				}
				// console.log(name)
				var skills2 = lib.character[name][3];
				for (var j = 0; j < skills2.length; j++) {
					// if (player.getStorage("sgsxjxfzmnl_pingjian").includes(skills2[j])) {
					// 	continue;
					// }
					if (player.hasSkill(skills2[j], null, null, false)) {
						continue;
					}
					if (skills.includes(skills2[j])) {
						list.add(name);
						if (!map[name]) {
							map[name] = [];
						}
						map[name].push(skills2[j]);
						skills.add(skills2[j]);
						continue;
					}
					var list2 = [skills2[j]];
					game.expandSkills(list2);
					for (var k = 0; k < list2.length; k++) {
						var info = lib.skill[list2[k]];
						if (get.is.zhuanhuanji(list2[k], player)) {
							continue;
						}
						if (!info || !info.trigger || (!info.trigger.player&&!info.trigger.global) || info.silent || info.limited || info.juexingji || info.hiddenSkill || info.dutySkill || (info.zhuSkill && !player.isZhu2())) {
							continue;
						}
						var bool1=info.trigger.player == name2 || (Array.isArray(info.trigger.player) && info.trigger.player.includes(name2));
						var bool2=info.trigger.global == name2 || (Array.isArray(info.trigger.global) && info.trigger.global.includes(name2));
						// console.log(name2,list2[k],bool1,bool2)
						if (bool1||bool2){
							if (info.ai && (/*info.ai.combo || */ info.ai.notemp || info.ai.neg)) {
								continue;
							}
							if (info.init) {
								continue;
							}
							if (info.filter) {
								try {
									var bool = info.filter(trigger, player, name2);
									if (!bool) {
										continue;
									}
								} catch (e) {
									continue;
								}
							}
							list.add(name);
							if (!map[name]) {
								map[name] = [];
							}
							map[name].push(skills2[j]);
							skills.add(skills2[j]);
							break;
						}
					}
				}
				if (list.length > 2) {
					break;
				}
			}
			if (skills.length) {
				event.list = list;
				player.chooseControl(skills).set("dialog", ["评鉴：请选择尝试发动的技能", [list, "character"]]);
			} else {
				event.finish();
			}
			"step 1";
			// player.markAuto("sgsxjxfzmnl_pingjian", [result.control]);
			player.addTempSkill(result.control);
			var skill = result.control;
			// var info = get.info(skill);
			// var resetSkills = [];
			// var suffixs = ['used', 'round', 'block', 'blocker'];
			// if (typeof info.usable == 'number') {
			// 	if (player.hasSkill('counttrigger') && player.storage.counttrigger[skill] && player.storage.counttrigger[skill] >= 1) {
			// 		delete player.storage.counttrigger[skill];
			// 		resetSkills.add(skill);
			// 	}
			// 	if (typeof get.skillCount(skill) == 'number' && get.skillCount(skill) >= 1) {
			// 		delete player.getStat('skill')[skill];
			// 		resetSkills.add(skill);
			// 	}
			// 	if (info.round && player.storage[skill + '_roundcount']) {
			// 		delete player.storage[skill + '_roundcount'];
			// 		resetSkills.add(skill);
			// 	}
			// 	if (player.storage[`temp_ban_${skill}`]) {
			// 		delete player.storage[`temp_ban_${skill}`];
			// 	}
			// 	if (player.awakenedSkills.contains(skill)) {
			// 		player.restoreSkill(skill);
			// 		resetSkills.add(skill);
			// 	}
			// 	for (var suffix of suffixs) {
			// 		if (player.hasSkill(skill + '_' + suffix)) {
			// 			player.removeSkill(skill + '_' + suffix);
			// 			resetSkills.add(skill);
			// 		}
			// 	}
			// }
			player.storage.sgsxjxfzmnl_pingjian_check[result.control] = trigger.name == "damage" ? trigger : "phaseJieshu";
			var name = event.list.find(name => lib.character[name][3].includes(result.control));
			// if(name) lib.skill.rehuashen.createAudio(name,result.control,'xushao');
			if (name) {
				game.broadcastAll((player, name) => player.tempname.add(name), player, name);
			}
		},
		group: "sgsxjxfzmnl_pingjian_use",
		phaseUse_special: [],
		ai: { threaten: 5 },
	},
	sgsxjxfzmnl_pingjian_use: {
		audio: "sgsxjxfzmnl_pingjian",
		enable: "phaseUse",
		usable(skill, player){
			// var num = 0;
			var list = [];
			game.filterPlayer(c=>{
				if(!list.includes(c.group))list.push(c.group)
			});
			return list.length;
		},
		sourceSkill: "sgsxjxfzmnl_pingjian",
		prompt: () => lib.translate.sgsxjxfzmnl_pingjian_info,
		content() {
			"step 0";
			if (Object.keys(player.storage.sgsxjxfzmnl_pingjian_check)?.length) {
				Object.keys(player.storage.sgsxjxfzmnl_pingjian_check).forEach(skill => {
					player.removeSkill(skill);
					const names = player.tempname && player.tempname.filter(i => get.character(i, 3)?.includes(skill));
					if (names) {
						get.nameList(player).forEach(name => {
							const { tempname } = get.character(name);
							if (tempname && Array.isArray(tempname)) {
								names.removeArray(tempname);
							}
						});
						game.broadcastAll((player, names) => player.tempname.removeArray(names), player, names);
					}
					delete player.storage.sgsxjxfzmnl_pingjian_check[skill];
				});
			}
			var list = [];
			var skills = [];
			var map = [];
			var evt = event.getParent(2);
			// var listx = lib.characterSort.sgstrxs.sgsxjxfzmnl;
			// listx.filter(c=>lib.translate[c].startsWith('阴间'))
			var listx=lib.skill.sgsxjxfzmnl_pingjian.initList();
			// var allList = _status.characterlist.slice(0);
			var allList = listx;
			// game.countPlayer(function (current) {
			// 	if (current.name && lib.character[current.name] && current.name.indexOf("gz_shibing") != 0 && current.name.indexOf("gz_jun_") != 0) {
			// 		allList.add(current.name);
			// 	}
			// 	if (current.name1 && lib.character[current.name1] && current.name1.indexOf("gz_shibing") != 0 && current.name1.indexOf("gz_jun_") != 0) {
			// 		allList.add(current.name1);
			// 	}
			// 	if (current.name2 && lib.character[current.name2] && current.name2.indexOf("gz_shibing") != 0 && current.name2.indexOf("gz_jun_") != 0) {
			// 		allList.add(current.name2);
			// 	}
			// });
			allList.randomSort();
			for (var i = 0; i < allList.length; i++) {
				var name = allList[i];
				if (name.indexOf("zuoci") != -1 || name.indexOf("xushao") != -1) {
					continue;
				}
				// console.log(name)
				var skills2 = lib.character[name][3];
				for (var j = 0; j < skills2.length; j++) {
					if (player.getStorage("sgsxjxfzmnl_pingjian").includes(skills2[j])) {
						continue;
					}
					if (player.hasSkill(skills2[j], null, null, false)) {
						continue;
					}
					if (get.is.locked(skills2[j], player)) {
						continue;
					}
					var info = get.plainText(lib.translate[skills2[j] + "_info"] || "");
					if (skills.includes(skills2[j]) || (info.includes("当你于出牌阶段") && !info.includes("当你于出牌阶段外"))) {
						list.add(name);
						map[name] ??= [];
						map[name].push(skills2[j]);
						skills.add(skills2[j]);
						continue;
					}
					var list2 = [skills2[j]];
					game.expandSkills(list2);
					for (var k = 0; k < list2.length; k++) {
						var info = lib.skill[list2[k]];
						if (get.is.zhuanhuanji(list2[k], player)) {
							continue;
						}
						if (!info || !info.enable || info.charlotte || info.limited || info.juexingji || info.hiddenSkill || info.dutySkill || (info.zhuSkill && !player.isZhu2())) {
							continue;
						}
						if (info.enable == "phaseUse" || (Array.isArray(info.enable) && info.enable.includes("phaseUse")) || info.enable == "chooseToUse" || (Array.isArray(info.enable) && info.enable.includes("chooseToUse"))) {
							if (info.ai && (/*info.ai.combo || */info.ai.notemp || info.ai.neg)) {
								continue;
							}
							if (info.init || info.onChooseToUse) {
								continue;
							}
							if (info.filter) {
								try {
									var bool = info.filter(evt, player);
									if (!bool) {
										continue;
									}
								} catch (e) {
									continue;
								}
							} else if (info.viewAs && typeof info.viewAs != "function") {
								try {
									if (evt.filterCard && !evt.filterCard(info.viewAs, player, evt)) {
										continue;
									}
									if (info.viewAsFilter && info.viewAsFilter(player) == false) {
										continue;
									}
								} catch (e) {
									continue;
								}
							}
							list.add(name);
							if (!map[name]) {
								map[name] = [];
							}
							map[name].push(skills2[j]);
							skills.add(skills2[j]);
							break;
						}
					}
				}
				if (list.length > 2) {
					break;
				}
			}
			if (skills.length) {
				event.list = list;
				player.chooseControl(skills).set("dialog", ["评鉴：请选择尝试发动的技能", [list, "character"]]);
			} else {
				event.finish();
			}
			"step 1";
			// player.markAuto("sgsxjxfzmnl_pingjian", [result.control]);
			player.addTempSkill(result.control);
			var skill = result.control;
			// var info = get.info(skill);
			// var resetSkills = [];
			// var suffixs = ['used', 'round', 'block', 'blocker'];
			// if (typeof info.usable == 'number') {
			// 	if (player.hasSkill('counttrigger') && player.storage.counttrigger[skill] && player.storage.counttrigger[skill] >= 1) {
			// 		delete player.storage.counttrigger[skill];
			// 		resetSkills.add(skill);
			// 	}
			// 	if (typeof get.skillCount(skill) == 'number' && get.skillCount(skill) >= 1) {
			// 		delete player.getStat('skill')[skill];
			// 		resetSkills.add(skill);
			// 	}
			// 	if (info.round && player.storage[skill + '_roundcount']) {
			// 		delete player.storage[skill + '_roundcount'];
			// 		resetSkills.add(skill);
			// 	}
			// 	if (player.storage[`temp_ban_${skill}`]) {
			// 		delete player.storage[`temp_ban_${skill}`];
			// 	}
			// 	if (player.awakenedSkills.contains(skill)) {
			// 		player.restoreSkill(skill);
			// 		resetSkills.add(skill);
			// 	}
			// 	for (var suffix of suffixs) {
			// 		if (player.hasSkill(skill + '_' + suffix)) {
			// 			player.removeSkill(skill + '_' + suffix);
			// 			resetSkills.add(skill);
			// 		}
			// 	}
			// }

			player.storage.sgsxjxfzmnl_pingjian_check[result.control] = "phaseUse";
			var name = event.list.find(name => lib.character[name][3].includes(result.control));
			// if(name) lib.skill.rehuashen.createAudio(name,result.control,'xushao');
			if (name) {
				game.broadcastAll((player, name) => player.tempname.add(name), player, name);
			}
		},
		ai: { order: 12, result: { player: 1 } },
	},
	sgsxjxfzmnl_pingjian_check: {
		charlotte: true,
		trigger: { player: ["useSkill", "logSkillBegin"] },
		sourceSkill: "sgsxjxfzmnl_pingjian",
		filter(event, player) {
			var info = get.info(event.skill);
			if (info && info.charlotte) {
				return false;
			}
			var skill = get.sourceSkillFor(event);
			return player.storage.sgsxjxfzmnl_pingjian_check[skill];
		},
		direct: true,
		firstDo: true,
		priority: Infinity,
		content() {
			var skill = get.sourceSkillFor(trigger);
			player.removeSkill(skill);
			const names = player.tempname && player.tempname.filter(i => get.character(i, 3)?.includes(skill));
			if (names) {
				get.nameList(player).forEach(name => {
					const { tempname } = get.character(name);
					if (tempname && Array.isArray(tempname)) {
						names.removeArray(tempname);
					}
				});
				game.broadcastAll((player, names) => player.tempname.removeArray(names), player, names);
			}
			var suffixs = ['used', 'round', 'block', 'blocker'];
			var info = get.info(skill);
			var resetSkills = [];
			if (typeof info.usable == 'number') {
				if (player.hasSkill('counttrigger') && player.storage.counttrigger[skill] && player.storage.counttrigger[skill] >= 1) {
					delete player.storage.counttrigger[skill];
					resetSkills.add(skill);
				}
				if (typeof get.skillCount(skill) == 'number' && get.skillCount(skill) >= 1) {
					delete player.getStat('skill')[skill];
					resetSkills.add(skill);
				}
			}
			if (info.round && player.storage[skill + '_roundcount']) {
				delete player.storage[skill + '_roundcount'];
				resetSkills.add(skill);
			}
			if (player.storage[`temp_ban_${skill}`]) {
				delete player.storage[`temp_ban_${skill}`];
			}
			if (player.awakenedSkills.contains(skill)) {
				player.restoreSkill(skill);
				resetSkills.add(skill);
			}
			for (var suffix of suffixs) {
				if (player.hasSkill(skill + '_' + suffix)) {
					player.removeSkill(skill + '_' + suffix);
					resetSkills.add(skill);
				}
			}
			delete player.storage.sgsxjxfzmnl_pingjian_check[skill];
		},
		group: "sgsxjxfzmnl_pingjian_check2",
	},
	sgsxjxfzmnl_pingjian_check2: {
		charlotte: true,
		trigger: { player: ["phaseUseEnd", "damageEnd", "phaseJieshuBegin"] },
		sourceSkill: "sgsxjxfzmnl_pingjian",
		filter(event, player) {
			return Object.keys(player.storage.sgsxjxfzmnl_pingjian_check).find(function (skill) {
				if (event.name != "damage") {
					return player.storage.sgsxjxfzmnl_pingjian_check[skill] == event.name;
				}
				return player.storage.sgsxjxfzmnl_pingjian_check[skill] == event;
			});
		},
		direct: true,
		lastDo: true,
		priority: -Infinity,
		content() {
			var skills = Object.keys(player.storage.sgsxjxfzmnl_pingjian_check).filter(function (skill) {
				if (trigger.name != "damage") {
					return player.storage.sgsxjxfzmnl_pingjian_check[skill] == trigger.name;
				}
				return player.storage.sgsxjxfzmnl_pingjian_check[skill] == trigger;
			});
			player.removeSkill(skills);
			const names = player.tempname && player.tempname.filter(i => skills.some(skill => get.character(i, 3)?.includes(skill)));
			if (names) {
				get.nameList(player).forEach(name => {
					const { tempname } = get.character(name);
					if (tempname && Array.isArray(tempname)) {
						names.removeArray(tempname);
					}
				});
				game.broadcastAll((player, names) => player.tempname.removeArray(names), player, names);
			}
			for (var skill of skills) {
				delete player.storage.sgsxjxfzmnl_pingjian_check[skill];
			}
		},
	},
	//花鬘
	sgsxjxfzmnl_spxiangzhen: {
		trigger: { target: "useCardToBefore" },
		forced: true,
		filter(event, player) {
			return event.card.name == "nanman";
		},
		async content(event, trigger, player) {
			trigger.cancel();
		},
		group: "sgsxjxfzmnl_spxiangzhen_draw",
		subSkill: {
			draw: {
				audio: "spxiangzhen",
				trigger: { global: "useCardAfter" },
				forced: true,
				filter(event, player) {
					if(event.card.name=="nanman") console.log(event.card.name);
					// if(event.player.isDead()) return false;
					return event.card.name == "nanman";
				},
				async content(event, trigger, player) {
					let injured = game.filterPlayer2(cur => cur.hasHistory("damage", evt => evt.card == trigger.card));
					if (injured.length&&injured.length>0) await player.draw(injured.length);
					else await player.gain(trigger.cards, "gain2");
					game.delayx();
				},
			},
		},
	},
	sgsxjxfzmnl_spfangzong: {
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		filter(event, player) {
			return player.countCards("h") < Math.min(8, game.countPlayer());
		},
		async content(event, trigger, player) {
			await player.drawTo(game.countPlayer());
		},
		mod: {
			playerEnabled(card, player, target) {
				if (player == _status.currentPhase && get.tag(card, "damage") > 0.5 && !player.isTempBanned("sgsxjxfzmnl_spfangzong") && player.inRange(target)) {
					return false;
				}
			},
			targetEnabled(card, player, target) {
				if (get.tag(card, "damage") > 0 && !target.isTempBanned("sgsxjxfzmnl_spfangzong") && player.inRange(target)) {
					return false;
				}
			},
		},
		ai: {
			combo: "spxizhan",
			halfneg: true,
		},
	},
	sgsxjxfzmnl_spxizhan: {
		trigger: { global: "phaseBegin" },
		filter(event, player) {
			return player != event.player;
		},
		async cost(event, trigger, player) {
			const num = game.dead.length;
			const result = await player
				.chooseToDiscard("he", "嬉战：弃置一张牌或失去1点体力", "根据弃置的牌对" + get.translation(trigger.player) + "视为使用如下牌：<br>♠，其使用【酒】；♥，你使用【无中生有】<br>♣，对其使用【铁索连环】；♦：对其使用火【杀】")
				.set(
					"ai",
					/** @param {Card} card */
					function (card) {
						var player = _status.event.player,
							target = _status.event.getTrigger().player;
						var suit = get.suit(card, player),
							list;

						const useCount = get.event().useCount;
						switch (suit) {
							case "spade":
								list = [{ name: "jiu" }, target, target];
								break;
							case "heart":
								list = [{ name: "wuzhong" }, player, player];
								break;
							case "club":
								list = [{ name: "tiesuo" }, player, target];
								break;
							case "diamond":
								list = [{ name: "sha", nature: "fire" }, player, target];
								break;
							default:
								return 0;
						}
						list[0].isCard = true;
						var eff = 0;
						if (list[1].canUse(list[0], list[2], false)) {
							eff = get.effect(list[2], list[0], list[1], player) * useCount;
						}
						if (eff >= 0 || suit == "club") {
							eff = Math.max(eff / useCount, 5);
						}
						return eff * 1.5 - get.value(card);
					}
				)
				.set("chooseonly", true)
				.set("useCount", num)
				.forResult();
			event.result = {
				bool: true,
				cards: result.cards || [],
				targets: [trigger.player],
			};
		},
		async content(event, trigger, player) {
			const num = game.dead.length;
			let count = 0;
			if (event.cards && event.cards.length) {
				await player.discard(event.cards);
				player.tempBanSkill("sgsxjxfzmnl_spfangzong");
				var target = trigger.player,
					card = event.cards[0],
					suit = get.suit(card, player);

				if (!lib.suit.includes(suit) || ((!target || !target.isIn()) && suit != "heart")) {
					return;
				}
				if(suit=='club'){
					if (player.canUse("tiesuo", target)) {
						await player.useCard({ name: "tiesuo", isCard: true }, target);
					}
				}
				while (count < num) {
					switch (suit) {
						case "spade":
							await target.chooseUseTarget("jiu", true);
							break;
						case "heart":
							await player.chooseUseTarget("wuzhong", true);
							break;
						// case "club":
						// 	if (player.canUse("tiesuo", target)) {
						// 		await player.useCard({ name: "tiesuo", isCard: true }, target);
						// 		return;
						// 	}
						// 	break;
						case "diamond":
							if (player.canUse({ name: "sha", isCard: true, nature: "fire" }, target, false)) {
								await player.useCard({ name: "sha", isCard: true, nature: "fire" }, target, false);
							}
							break;
					}
					count++;
				}
			} else {
				await player.loseHp();
			}
		},
		ai: {
			halfneg: true,
		},
	},
	//麹义
	sgsxjxfzmnl_fuqi: {
		/** @param {Player} target */
		targetprompt2: target => {
			const player = get.player(),
				card = get.card();
			if (get.type(card) == "trick" || (get.type(card) == "basic" && !["shan", "tao", "jiu", "du"].includes(card.name))) {
				if (target !== player) {
					return "不可响应";
				}
			}
		},
		onChooseToUse(event) {
			event.targetprompt2.add(lib.skill.sgsxjxfzmnl_fuqi.targetprompt2);
		},
		/** @param {GameEvent} event  */
		onChooseTarget(event) {
			event.targetprompt2.add(lib.skill.sgsxjxfzmnl_fuqi.targetprompt2);
		},
		forced: true,
		trigger: {
			player: "useCard",
		},
		filter(event, player) {
			return (
				event.card &&
				(get.type(event.card) == "trick" || (get.type(event.card) == "basic" && !["shan", "tao", "jiu", "du"].includes(event.card.name))) &&
				game.hasPlayer(function (current) {
					return current != player;
				})
			);
		},
		async content(event, trigger, player) {
			trigger.directHit.addArray(
				game.filterPlayer(function (current) {
					return current != player;
				})
			);
		},
		ai: {
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				return get.distance(arg.target, player) <= 1;
			},
		},
	},
	sgsxjxfzmnl_jiaozi: {
		trigger: { player: "damageBegin3", source: "damageBegin1" },
		forced: true,
		async content(event, trigger, player) {
			trigger.num++;
			if (player.isMaxHandcard(true)) trigger.num *= 2;
		},
		ai: { presha: true },
	},
	//生姜味
	sgsxjxfzmnl_tianren: {
		audio:'tianren',
		trigger: { global: ["loseAfter", "cardsDiscardAfter", "loseAsyncAfter"] },
		forced: true,
		filter(event, player) {
			return event.getd()?.someInD("od");
		},
		async content(event, trigger, player) {
			player.addMark("sgsxjxfzmnl_tianren", trigger.getd().filterInD("od").length);
		},
		group: "sgsxjxfzmnl_tianren_maxHp",
		intro: { content: "mark" },
		subSkill: {
			maxHp: {
				audio:'sgsxjxfzmnl_tianren',
				trigger: { player: ["sgsxjxfzmnl_tianrenAfter", "gainMaxHpAfter", "loseMaxHpAfter"] },
				forced: true,
				filter(event, player) {
					return player.countMark("sgsxjxfzmnl_tianren") >= player.maxHp;
				},
				async content(event, trigger, player) {
					player.removeMark("sgsxjxfzmnl_tianren", player.maxHp);
					await player.gainMaxHp();
					await player.recover();
					await player.draw(2);
				},
			},
		},
	},
	sgsxjxfzmnl_jiufa: {
		audio: 'jiufa',
		trigger: { player: ["useCardAfter", "respondAfter"] },
		frequent: true,
		filter(event, player) {
			return event.sgsxjxfzmnl_jiufa_counted && player.getStorage("sgsxjxfzmnl_jiufa").length >= 9;
		},
		content() {
			"step 0";
			player.unmarkSkill("sgsxjxfzmnl_jiufa");
			event.cards = get.cards(9);
			event.cards.sort(function (a, b) {
				return get.number(b) - get.number(a);
			});
			game.cardsGotoOrdering(event.cards);
			event.videoId = lib.status.videoId++;
			game.broadcastAll(
				function (player, id, cards) {
					var str;
					if (player == game.me && !_status.auto) {
						str = "九伐：选择任意张点数满足条件的牌";
					} else {
						str = "九伐";
					}
					var dialog = ui.create.dialog(str, cards);
					dialog.videoId = id;
				},
				player,
				event.videoId,
				event.cards
			);
			event.time = get.utc();
			game.addVideo("showCards", player, ["九伐", get.cardsInfo(event.cards)]);
			game.addVideo("delay", null, 2);
			"step 1";
			var next = player.chooseButton([0, 9], true);
			next.set("dialog", event.videoId);
			next.set("filterButton", function (button) {
				var num = get.number(button.link),
					cards = _status.event.getParent().cards;
				for (var i of ui.selected.buttons) {
					if (get.number(i.link) == num) {
						return false;
					}
				}
				for (var i of cards) {
					if (i != button.link && get.number(i) == num) {
						return true;
					}
				}
				return false;
			});
			next.set("ai", function (button) {
				return get.value(button.link, _status.event.player);
			});
			"step 2";
			if (result.bool && result.links && result.links.length) {
				event.cards2 = result.links;
			}
			var time = 1000 - (get.utc() - event.time);
			if (time > 0) {
				game.delay(0, time);
			}
			"step 3";
			game.broadcastAll("closeDialog", event.videoId);
			var cards2 = event.cards2;
			if (cards2 && cards2.length) {
				player.gain(cards2, "log", "gain2").gaintag=['sgsxjxfzmnl_jiufa_tag'];
			}
		},
		marktext: "⑨",
		intro: {
			content: "已记录牌名：$",
			onunmark: true,
		},
		group: ["sgsxjxfzmnl_jiufa_count",'sgsxjxfzmnl_jiufa_tag'],
		subSkill: {
			count: {
				trigger: { player: ["useCard1", "respond"] },
				forced: true,
				charlotte: true,
				popup: false,
				firstDo: true,
				filter(event, player) {
					return !player.getStorage("sgsxjxfzmnl_jiufa").includes(event.card.name);
				},
				content() {
					trigger.sgsxjxfzmnl_jiufa_counted = true;
					player.markAuto("sgsxjxfzmnl_jiufa", [trigger.card.name]);
				},
			},
			tag:{
				trigger: {
					player: ["useCard"],
				},
				audio:'jiufa',
				forced: true,
				filter(event,player){
					if (
						!event ||
						event.name !== "useCard" ||
						!player.hasHistory("lose", evt => {
							const evtx = evt.relatedEvent || evt.getParent();
							if (evtx !== event) {
								return false;
							}
							return Object.values(evt.gaintag_map).flat().includes("sgsxjxfzmnl_jiufa_tag");
						})
					) {
						return false;
					}
					return true;
				},
				async content(event, trigger, player) {
					trigger.directHit.addArray(game.players);
				},
				mod:{
					targetInRange:function(card,player,target,now){
						if(card.gaintag?.includes('sgsxjxfzmnl_jiufa_tag')) return true;
					},
				},
				ai: {
					directHit_ai: true,
				},
			},
		},
		
	},
	sgsxjxfzmnl_pingxiang: {
		audio: 'pingxiang',
		enable: "phaseUse",
		limited: true,
		skillAnimation: true,
		animationColor: "ice",
		filter(event, player) {
			// return player.maxHp > 9;
			return true;
		},
		content() {
			"step 0";
			player.changeSkin({ characterName: "sgsxjxfzmnl_shen_jiangwei" }, "sgsxjxfzmnl_shen_jiangwei_shadow");
			player.awakenSkill(event.name);
			player.loseMaxHp(9);
			event.maxnum = game.countPlayer(c=>c.group=='wei')+9;
			event.num = 0;
			event.forceDie = true;
			"step 1";
			event.num++;
			var cardv ={
				name: "sha",
				nature: "fire",
				isCard: true,
			};
			player.chooseTarget(
				"请选择火【杀】的目标（" + (event.num == 9 ? "⑨" : event.num) + "/"+event.maxnum+"）",
				// false
			).set('filterTarget',function(card,player,target){
				return player.canUse(cardv,target)
			}).set('forceDie',true);
			"step 2";
			if(result.bool){
				var cardv = {
					name: "sha",
					nature: "fire",
					isCard: true,
				}
				var targets = result.targets;
				player.useCard(cardv, targets, false).forceDie = true;
			}
			else{
				event.goto(4)
			}
			'step 3'
			if (event.num < event.maxnum) {
				event.goto(1);
			} else {
				// player.removeSkills("sgsxjxfzmnl_jiufa");
			}
			"step 4";
			player.addSkill("sgsxjxfzmnl_pingxiang_effect");
		},
		forceDie:true,
		ai: {
			order() {
				return get.order({
					name: "sha",
					nature: "fire",
					isCard: true,
				});
			},
			result: {
				player(player) {
					if(player.maxHp<=9)return -1;
					if (
						player.hasValueTarget({
							name: "sha",
							nature: "fire",
							isCard: true,
						})
					) {
						return 1;
					}
					return 0;
				},
			},
			combo: "tianren",
		},
		subSkill: {
			effect: {
				marktext: "襄",
				intro: { content: "手牌上限基数改为体力上限" },
				mod: {
					maxHandcardBase(player) {
						return player.maxHp;
					},
				},
			},
		},
	},

	//刘晔
	sgsxjxfzmnl_dcpoyuan: {
		audio: 'dcpoyuan',
		// trigger: {
		// 	global: "phaseBefore",
		// 	player: ["phaseBegin", "enterGame"],
		// },
		trigger:{
			player:['enterGame','phaseBegin'],
			global:'phaseBefore',
		},
		filter(event, player, name) {
			if(name=='enterGame')return player.hasEquipableSlot(5);
			if(name=='phaseBefore'&&game.phaseNumber==0)return player.hasEquipableSlot(5);
			return game.hasPlayer(function (current) {
				return current != player && current.countDiscardableCards(player, "he") > 0;
			});
		},
		// direct: true,
		
		// content() {
		// 	"step 0";
		// 	if (player.getEquip("sgsxjxfzmnl_pilitoushiche")) {
		// 		event.goto(2);
		// 		player
		// 			.chooseTarget(get.prompt("dcpoyuan"), "弃置一名其他角色的至多两张牌", function (card, player, target) {
		// 				return target != player && target.countDiscardableCards(player, "he") > 0;
		// 			})
		// 			.set("ai", function (target) {
		// 				var player = _status.event.player,
		// 					cards = target.getDiscardableCards(player, "he");
		// 				var att = get.attitude(player, target);
		// 				if (att < 0 && target.hasSkillTag("noe")) {
		// 					att /= 2;
		// 				}
		// 				var zheng = [],
		// 					fu = [];
		// 				for (var i of cards) {
		// 					var val = get.value(i, target);
		// 					if (val > 0) {
		// 						zheng.push(i);
		// 					} else {
		// 						fu.push(i);
		// 					}
		// 				}
		// 				zheng.sort((a, b) => get.value(b, target) - get.value(a, target));
		// 				fu.sort((a, b) => get.value(b, target) - get.value(a, target));
		// 				zheng = zheng.slice(0, 2);
		// 				fu = fu.slice(0, 2);
		// 				var eff1 = 0,
		// 					eff2 = 0;
		// 				for (var i of zheng) {
		// 					eff1 += get.value(i, target);
		// 				}
		// 				for (var i of fu) {
		// 					if (get.position(i) == "e") {
		// 						eff2 += 1 - get.value(i, target);
		// 					}
		// 				}
		// 				return -att * Math.max(eff1, eff2);
		// 			});
		// 	} else {
		// 		player.chooseBool(get.prompt("dcpoyuan"), "装备一张【霹雳投石车】").set("ai", function () {
		// 			return true;
		// 		});
		// 	}
		// 	"step 1";
		// 	if (result.bool) {
		// 		player.logSkill("dcpoyuan");
		// 		var card = game.createCard("pilitoushiche", "diamond", 9);
		// 		player.$gain2(card);
		// 		game.delayx();
		// 		player.equip(card);
		// 	}
		// 	event.finish();
		// 	"step 2";
		// 	if (result.bool) {
		// 		var target = result.targets[0];
		// 		player.logSkill("dcpoyuan", target);
		// 		player.discardPlayerCard(target, true, "he", [1, 2]);
		// 	}
		// },
		cost(){
			'step 0'
			if(event.triggername=='phaseBefore'||event.triggername=='enterGame'){
				event.result = {bool:true}
			}
			else{
				player
					.chooseTarget(get.prompt("sgsxjxfzmnl_dcpoyuan"), "弃置一名其他角色的X张牌，X为其体力值", function (card, player, target) {
						return target != player && target.countDiscardableCards(player, "he") > 0;
					})
					.set("ai", function (target) {
						var player = _status.event.player,
							cards = target.getDiscardableCards(player, "he");
						var att = get.attitude(player, target);
						if (att < 0 && target.hasSkillTag("noe")) {
							att /= 2;
						}
						var zheng = [],
							fu = [];
						for (var i of cards) {
							var val = get.value(i, target);
							if (val > 0) {
								zheng.push(i);
							} else {
								fu.push(i);
							}
						}
						zheng.sort((a, b) => get.value(b, target) - get.value(a, target));
						fu.sort((a, b) => get.value(b, target) - get.value(a, target));
						zheng = zheng.slice(0, 2);
						fu = fu.slice(0, 2);
						var eff1 = 0,
							eff2 = 0;
						for (var i of zheng) {
							eff1 += get.value(i, target);
						}
						for (var i of fu) {
							if (get.position(i) == "e") {
								eff2 += 1 - get.value(i, target);
							}
						}
						return -att * Math.max(eff1, eff2);
					});

			}
			'step 1'
			if(result.targets){
				event.result = {
					bool:true,
					targets:result.targets,
				}
			}
		},
		content(){
			if(event.targets){
				var target = event.targets[0]
				player.line(target,'water')
				player.discardPlayerCard(target, true, "he",target.hp);
			}
			else{
				var card = game.createCard("sgsxjxfzmnl_pilitoushiche", "diamond", 9);
				player.$gain2(card);
				game.delayx();
				player.equip(card);
			}
		}
	},
	sgsxjxfzmnl_dchuace: {
		audio: 'dchuace',
		enable: "phaseUse",
		usable: (skill)=>game.countGroup(),
		filter(event, player) {
			return event.sgsxjxfzmnl_dchuace && event.sgsxjxfzmnl_dchuace.length > 0 && player.countCards("hs") > 0;
		},
		onChooseToUse(event) {
			if (game.online || event.sgsxjxfzmnl_dchuace) {
				return;
			}
			var list = lib.inpile.filter(function (i) {
				return ['trick','basic'].includes(get.type(i))&& lib.filter.filterCard({ name: i }, event.player, event);
			});
			if (!list.length) {
				event.set("sgsxjxfzmnl_dchuace", list);
				return;
			}
			var history = _status.globalHistory;
			var stop = false;
			for (var i = history.length - 1; i >= 0; i--) {
				var evt = history[i];
				if (!stop) {
					if (evt.isRound) {
						stop = true;
					}
					continue;
				} else {
					for (var j of evt.useCard) {
						list.remove(j.card.name);
					}
					if (evt.isRound) {
						break;
					}
				}
			}
			event.set("sgsxjxfzmnl_dchuace", list);
		},
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog("画策", [event.sgsxjxfzmnl_dchuace, "vcard"], "hidden");
			},
			check(button) {
				var player = _status.event.player,
					card = { name: button.link[2] };
				return player.getUseValue(card);
			},
			filter(button,player){
				return !player.getStorage("sgsxjxfzmnl_dchuace_ban").includes(button.link[2])
			},
			backup(links, player) {
				return {
					audio: "sgsxjxfzmnl_dchuace",
					viewAs: { name: links[0][2] },
					ai1: card => 7 - get.value(card),
					filterCard: true,
					position: "hs",
					popname: true,
					precontent(){
						player.YB_tempz('sgsxjxfzmnl_dchuace_ban',event.result.card.name)
					},
				};
			},
			prompt(links, player) {
				return "将一张手牌当做【" + get.translation(links[0][2]) + "】使用";
			},
		},
		ai: {
			order: 6,
			result: { player: 1 },
		},
		subSkill: { backup: {} },
		group:'sgsxjxfzmnl_dchuace_after',
		subSkill:{
			after:{
				trigger:{
					player:['useCardAfter'],
				},
				forced:true,
				charlotte:true,
				popup:false,
				filter:function (event,player){
					return event.skill=='sgsxjxfzmnl_dchuace_backup';
				},
				content:function (){
					player.draw();
				},
				
			}
		},
	},
	sgsxjxfzmnl_pilitoushiche: {
		audio: "pilitoushiche",
		trigger: { player: ["useCard", "respond"] },
		forced: true,
		equipSkill: true,
		filter(event, player) {
			return get.type(event.card) == "basic";
		},
		content() {
			trigger.baseDamage++;
			if (player != _status.currentPhase) {
				player.draw();
			}
		},
		mod: {
			targetInRange(card, player) {
				if (get.type(card) == "basic" && player == _status.currentPhase) {
					return true;
				}
			},

			canBeGained(card, source, player) {
				if (player.getEquips("sgsxjxfzmnl_pilitoushiche").includes(card)) {
					return false;
				}
			},
			canBeDiscarded(card, source, player) {
				if (player.getEquips("sgsxjxfzmnl_pilitoushiche").includes(card)) {
					return false;
				}
			},
			canBeReplaced(card, player) {
				if (player.getVEquips("sgsxjxfzmnl_pilitoushiche").includes(card)) {
					return false;
				}
			},
			cardDiscardable(card, player) {
				if (player.getEquips("sgsxjxfzmnl_pilitoushiche").includes(card)) {
					return false;
				}
			},
			cardEnabled2(card, player) {
				if (player.getEquips("sgsxjxfzmnl_pilitoushiche").includes(card)) {
					return false;
				}
			},
		},
		group: "sgsxjxfzmnl_pilitoushiche_blocker",
		subSkill: {
			blocker: {
				audio: "pilitoushiche",
				trigger: {
					player: ["loseBefore", "disableEquipBefore"],
				},
				forced: true,
				filter(event, player) {
					if (event.name == "disableEquip") {
						return event.slots.includes("equip5");
					}
					var cards = player.getEquips("sgsxjxfzmnl_pilitoushiche");
					return event.cards.some(card => cards.includes(card));
				},
				content() {
					if (trigger.name == "lose") {
						trigger.cards.removeArray(player.getEquips("sgsxjxfzmnl_pilitoushiche"));
					} else {
						while (trigger.slots.includes("equip5")) {
							trigger.slots.remove("equip5");
						}
					}
				},
			},
		},
	},
	//裴秀
	sgsxjxfzmnl_juezhi: {
		audio: 'juezhi',
		enable: "phaseUse",
		filter(event, player) {
			return player.countCards("he") > 1;
		},
		filterCard: true,
		position: "he",
		selectCard: [2, Infinity],
		check(card) {
			if (ui.selected.cards.length > 1) {
				return 0;
			}
			var player = _status.event.player;
			if (player.hasSkill("xingtu") && player.storage.xingtu) {
				var cards = player.getCards("he");
				var num = player.storage.xingtu,
					stop = false;
				for (var i = 0; i <= cards.length; i++) {
					if (i != cards.length) {
						var num1 = get.number(cards[i], player);
						if (typeof num1 != "number") {
							continue;
						}
						for (var j = 0; j < cards.length; j++) {
							if (i == j) {
								continue;
							}
							var num2 = get.number(cards[j], player);
							if (typeof num2 != "number") {
								continue;
							}
							var sum = num1 + num2;
							if (sum % num == 0 || num % sum == 0) {
								stop = true;
								break;
							}
						}
						if (stop) {
							break;
						}
					}
				}
				if (i != cards.length) {
					var cardx = [cards[i], cards[j]];
					if (cardx.includes(card)) {
						return 10 - get.value(card);
					}
				}
			}
			return 5 - get.value(card);
		},
		allowChooseAll: true,
		content() {
			'step 0'
			var num = 0;
			for (var i of cards) {
				num += get.number(i, player);
			}
			num = num % 13;
			if (num == 0) {
				num = 13;
			}
			// var card = get.cardPile2(function (card) {
			// 	return get.number(card, false) == num;
			// });
			if(ui.cardPile.hasChildNodes()){
				var cards = []
				for(var i of Array.from(ui.cardPile.childNodes)){
					if(get.number(i)==num){
						cards.push(i);
					}
				}
				// cards.forEach(c=>{
				// 	if(get.number(c,false)==num){
				// 		cardsx.push(c);
				// 	}
				// })
				if(cards.length){
					player.chooseCardButton(cards,1,true,'选择一张获得').set('ai',function(button){
						return get.useful(button.link)
					})
				}

			}
			'step 1'
			if (result.links) {
				player.gain(result.links, "gain2");
			}
		},
		ai: {
			order: 1,
			result: { player: 1 },
		},
	},

	//武陆逊
	sgsxjxfzmnl_dcxiongmu: {
		audio: 'dcxiongmu',
		trigger: { global: "roundStart" },
		group: ["sgsxjxfzmnl_dcxiongmu_minus",'sgsxjxfzmnl_dcxiongmu_tag'],
		prompt2(event, player) {
			return (player.countCards("h") < player.maxHp ? "将手牌摸至" + get.cnNumber(player.maxHp) + "张，然后" : "") + "将任意张牌随机置入牌堆并从牌堆或弃牌堆中获得等量点数为8的牌。";
		},
		async content(event, trigger, player) {
			await player.drawTo(player.maxHp);
			var cards = player.getCards("he");
			if (!cards.length) {
				return;
			}
			var result;
			let selectedCards = null;
			let selectedCount = 0;
			if (cards.length == 1) {
				result = { bool: true, cards: cards };
			} else {
				result = await player
					.chooseCard("雄幕：将任意张牌置入牌堆的随机位置", "he", [1, Infinity], true, "allowChooseAll")
					.set("ai", card => {
						return 6 - get.value(card);
					})
					.forResult();
			}
			if (result.bool) {
				selectedCards = result.cards;
				selectedCount = selectedCards.length;
				game.log(player, `将${get.cnNumber(selectedCount)}张牌置入了牌堆`);
				var next = player.loseToDiscardpile(selectedCards, ui.cardPile, "blank").set("log", false);
				next.insert_index = function () {
					return ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)];
				};
				await next;
			} else {
				return;
			}
			var list = [],
				shown = [];
			var piles = ["cardPile", "discardPile"];
			for (var pile of piles) {
				for (var i = 0; i < ui[pile].childNodes.length; i++) {
					var card = ui[pile].childNodes[i];
					var number = get.number(card, false);
					if (!list.includes(card) && number == 8) {
						list.push(card);
						if (pile == "discardPile") {
							shown.push(card);
						}
						if (list.length >= selectedCount) {
							break;
						}
					}
				}
				if (list.length >= selectedCount) {
					break;
				}
			}
			if (list.length) {
				var next = player.gain(list);
				next.shown_cards = shown;
				next.set("animate", function (event) {
					var player = event.player,
						cards = event.cards,
						shown = event.shown_cards;
					if (shown.length < cards.length) {
						var num = cards.length - shown.length;
						player.$draw(num);
						game.log(player, "从牌堆获得了", get.cnNumber(num), "张点数为8的牌");
					}
					if (shown.length > 0) {
						player.$gain2(shown, false);
						game.log(player, "从弃牌堆获得了", shown);
					}
					return 500;
				});
				next.gaintag.add("sgsxjxfzmnl_dcxiongmu_tag");
				await next;
				// player.addTempSkill("dcxiongmu_tag", "roundStart");
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (target.countCards("h") > target.getHp() || player.hasSkillTag("jueqing", false, target)) {
						return;
					}
					if (player._dcxiongmu_temp) {
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
								return "zeroplayertarget";
							}
							if (get.attitude(player, target) < 0 && !player.hasSkillTag("damageBonus")) {
								if (card.name == "sha") {
									return;
								}
								var sha = false;
								player._dcxiongmu_temp = true;
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
								delete player._dcxiongmu_temp;
								if (player.hasSkillTag("damage")) {
									num++;
								}
								if (num < 2) {
									var enemies = player.getEnemies();
									if (enemies.length == 1 && enemies[0] == target && player.needsToDiscard()) {
										return;
									}
									return "zeroplayertarget";
								}
							}
						}
					}
				},
			},
		},
		subSkill: {
			minus: {
				audio: "sgsxjxfzmnl_dcxiongmu",
				trigger: { player: "damageBegin4" },
				filter(event, player) {
					return (
						player.countCards("h") <= player.getHp() &&
						game
							.getGlobalHistory(
								"everything",
								evt => {
									return evt.name == "damage" && evt.player == player;
								},
								event
							)
							.indexOf(event) == 0
					);
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					trigger.num--;
				},
			},
			tag: {
				charlotte: true,
				onremove(player) {
					player.removeGaintag("sgsxjxfzmnl_dcxiongmu_tag");
				},
				mod: {
					ignoredHandcard(card, player) {
						if (card.hasGaintag("sgsxjxfzmnl_dcxiongmu_tag")) {
							return true;
						}
					},
					cardDiscardable(card, player, name) {
						if (name == "phaseDiscard" && card.hasGaintag("sgsxjxfzmnl_dcxiongmu_tag")) {
							return false;
						}
					},
				},
			},
		},
	},
	sgsxjxfzmnl_dcruxian: {
		audio: 'dcruxian',
		enable: "phaseUse",
		limited: true,
		skillAnimation: true,
		animationColor: "wood",
		content() {
			"step 0";
			player.awakenSkill(event.name);
			player.addTempSkill("dczhangcai_all", { player: "phaseBegin" });
			player.addSkill('sgsxjxfzmnl_dcruxian_huifu');
		},
		ai: {
			combo: "dczhangcai",
			order: 15,
			result: {
				player(player) {
					if (!player.hasSkill("dczhangcai")) {
						return 0;
					}
					if (player.countCards("hs", card => get.number(card) != 8 && player.hasValueTarget(card)) > 3 || player.hp == 1) {
						return 5;
					}
					return 0;
				},
			},
		},
		subSkill: {
			huifu: {
				audio: 'dcruxian_huifu',
				forced:true,
				trigger: { player: "phaseAfter" },
				filter(event, player) {
					return player.getStat("kill") >= game.countPlayer(c=>c.group=='wu')
				},
				content() {
					player.removeSkill('sgsxjxfzmnl_dcruxian_huifu');
					player.restoreSkill('sgsxjxfzmnl_dcruxian');
					game.log(player, '复原了技能', '#g【儒贤】');
				},
			},
		},
	},


	//曹髦  史?! 我求你别改了
	sgsxjxfzmnl_mbqianlong: {
		audio: 'mbqianlong',
		persevereSkill: true,
		trigger: {
			player: ["sgsxjxfzmnl_mbqianlong_beginAfter", "sgsxjxfzmnl_mbqianlong_addAfter", "sgsxjxfzmnl_mbweitongAfter"],
		},
		filter(event, player) {
			let skills = [];
			let current = player.additionalSkills?.sgsxjxfzmnl_mbqianlong?.length ?? 0;
			var list = [0,25,50,75,99,100];
			for(var i=0;i<list.length;i++){
				if(player.countMark("sgsxjxfzmnl_mbqianlong")<=list[i]){
					var target = i+1;
					break;
				}
			}
			// let target = player.countMark("sgsxjxfzmnl_mbqianlong") == lib.skill.sgsxjxfzmnl_mbqianlong.maxMarkCount ? lib.skill.sgsxjxfzmnl_mbqianlong.derivation.length : Math.floor(player.countMark("mbqianlong") / 25);
			return target > current;
		},
		forced: true,
		popup: false,
		locked: false,
		beginMarkCount: 20,
		maxMarkCount: 100,
		derivation: ['sgsxjxfzmnl_mbcmjianxiong',"sgsxjxfzmnl_mbcmqingzheng", "sgsxjxfzmnl_mbcmjiushi", "sgsxjxfzmnl_mbcmfangzhu", "sgsxjxfzmnl_mbjuejin",'sgsxjxfzmnl_mbcmguixin'],
		addMark(player, num) {
			num = Math.min(num, lib.skill.sgsxjxfzmnl_mbqianlong.maxMarkCount - player.countMark("sgsxjxfzmnl_mbqianlong"));
			player.addMark("sgsxjxfzmnl_mbqianlong", num);
		},
		group: ["sgsxjxfzmnl_mbqianlong_begin", "sgsxjxfzmnl_mbqianlong_add", "sgsxjxfzmnl_mbqianlong_die"],
		async content(event, trigger, player) {
			var list = [0,25,50,75,99,100];
			for(var i=0;i<list.length;i++){
				if(player.countMark("sgsxjxfzmnl_mbqianlong")<=list[i]){
					var target = i+1;
					break;
				}
			}
			const derivation = lib.skill.sgsxjxfzmnl_mbqianlong.derivation,
				skills = derivation.slice(0, target);
			player.addAdditionalSkill("sgsxjxfzmnl_mbqianlong", skills);
		},
		marktext: "道",
		intro: {
			name: "道心(阴间潜龙)",
			name2: "道心",
			content: "当前道心数为#",
		},
		subSkill: {
			begin: {
				audio: "mbqianlong",
				persevereSkill: true,
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				filter(event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					const num = game.hasPlayer(current => {
						return current !== player && current.group === "wei" && player.hasZhuSkill("mbweitong", current);
					})
						? 99
						: lib.skill.sgsxjxfzmnl_mbqianlong.beginMarkCount;
					lib.skill.sgsxjxfzmnl_mbqianlong.addMark(player, num);
				},
			},
			add: {
				audio: "mbqianlong",
				persevereSkill: true,
				trigger: {
					player: ["gainAfter", "damageEnd"],
					source: "damageSource",
					global: "loseAsyncAfter",
				},
				filter(event, player) {
					if (player.countMark("sgsxjxfzmnl_mbqianlong") >= lib.skill.sgsxjxfzmnl_mbqianlong.maxMarkCount) {
						return false;
					}
					if (event.name === "damage") {
						return event.num > 0;
					}
					return event.getg(player).length > 0;
				},
				getIndex(event, player, triggername) {
					if (event.name === "damage") {
						return event.num;
					}
					return 1;
				},
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					let toAdd = 5 * (1 + (trigger.name === "damage") + (event.triggername === "damageSource"));
					lib.skill.sgsxjxfzmnl_mbqianlong.addMark(player, toAdd);
				},
			},
			die: {
				trigger: {
					player: "dieBefore",
				},
				charlotte: true,
				firstDo: true,
				forced: true,
				popup: false,
				forceDie: true,
				async content(event, trigger, player) {
					player.changeSkin({ characterName: "sgsxjxfzmnl_mb_caomao" }, "sgsxjxfzmnl_mb_caomao_dead");
				},
			},
		},
	},
	sgsxjxfzmnl_mbweitong: {
		audio: 'mbweitong',
		persevereSkill: true,
		zhuSkill: true,
		trigger: {
			player: "sgsxjxfzmnl_mbqianlong_beginBegin",
		},
		forced: true,
		locked: false,
		content() {},
		ai: {
			combo: "sgsxjxfzmnl_mbqianlong",
		},
	},
	sgsxjxfzmnl_mbcmjianxiong: {
		audio: 'mbcmqingzheng',
		audioname2: { caoying: "lingren_jianxiong" },
		persevereSkill: true,
		preHidden: true,
		trigger: { player: "damageEnd" },
		filter(event, player) {
			return get.itemtype(event.cards) == "cards" && get.position(event.cards[0], true) == "o";
		},
		async content(event, trigger, player) {
			player.gain(trigger.cards, "gain2");
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (player.hasSkillTag("jueqing", false, target)) {
						return [1, -1];
					}
					if (get.tag(card, "damage")) {
						return [1, 0.55];
					}
				},
			},
		},
	},
	sgsxjxfzmnl_mbcmqingzheng: {
		audio: 'mbcmqingzheng',
		persevereSkill: true,
		trigger: { player: "phaseUseBegin" },
		filter(event, player) {
			return player.countCards("h") > 0 && game.hasPlayer(current => player != current && current.countCards("h") > 0);
		},
		/**
		 * player选择target的一种花色的牌
		 * @param {Player} player
		 * @param {Player} target
		 */
		chooseOneSuitCard(player, target, force = false, limit, str = "请选择一个花色的牌", ai = { bool: false }) {
			const { promise, resolve } = Promise.withResolvers();
			const event = _status.event;
			event.selectedCards = [];
			event.selectedButtons = [];
			//对手牌按花色分类
			let suitCards = Object.groupBy(target.getCards("h"), c => get.suit(c, target));
			suitCards.heart ??= [];
			suitCards.diamond ??= [];
			suitCards.spade ??= [];
			suitCards.club ??= [];
			let dialog = (event.dialog = ui.create.dialog());
			dialog.classList.add("fullheight");
			event.control_ok = ui.create.control("ok", link => {
				_status.imchoosing = false;
				event.dialog.close();
				event.control_ok?.close();
				event.control_cancel?.close();
				event._result = {
					bool: true,
					cards: event.selectedCards,
				};
				resolve(event._result);
				game.resume();
			});
			event.control_ok.classList.add("disabled");
			//如果是非强制的，才创建取消按钮
			if (!force) {
				event.control_cancel = ui.create.control("cancel", link => {
					_status.imchoosing = false;
					event.dialog.close();
					event.control_ok?.close();
					event.control_cancel?.close();
					event._result = {
						bool: false,
					};
					resolve(event._result);
					game.resume();
				});
			}
			event.switchToAuto = function () {
				_status.imchoosing = false;
				event.dialog?.close();
				event.control_ok?.close();
				event.control_cancel?.close();
				event._result = ai();
				resolve(event._result);
				game.resume();
			};
			dialog.addNewRow(str);
			let keys = Object.keys(suitCards).sort((a, b) => {
				let arr = ["spade", "heart", "club", "diamond", "none"];
				return arr.indexOf(a) - arr.indexOf(b);
			});
			//添加框
			while (keys.length) {
				let key1 = keys.shift();
				let cards1 = suitCards[key1];
				let key2 = keys.shift();
				let cards2 = suitCards[key2];
				//点击容器的回调
				/**@type {Row_Item_Option['clickItemContainer']} */
				const clickItemContainer = function (container, item, allContainer) {
					if (!item?.length || item.some(card => !lib.filter.cardDiscardable(card, player, event.name))) {
						return;
					}
					if (event.selectedButtons.includes(container)) {
						container.classList.remove("selected");
						event.selectedButtons.remove(container);
						event.selectedCards.removeArray(item);
					} else {
						if (event.selectedButtons.length >= limit) {
							let precontainer = event.selectedButtons[0];
							precontainer.classList.remove("selected");
							event.selectedButtons.remove(precontainer);
							let suit = get.suit(event.selectedCards[0], target),
								cards = target.getCards("h", { suit: suit });
							event.selectedCards.removeArray(cards);
						}
						container.classList.add("selected");
						event.selectedButtons.add(container);
						event.selectedCards.addArray(item);
					}
					event.control_ok.classList[event.selectedButtons.length === limit ? "remove" : "add"]("disabled");
				};
				//给框加封条，显示xxx牌多少张
				function createCustom(suit, count) {
					return function (itemContainer) {
						function formatStr(str) {
							return str.replace(/(?:♥︎|♦︎)/g, '<span style="color: red; ">$&</span>');
						}
						let div = ui.create.div(itemContainer);
						if (count) {
							div.innerHTML = formatStr(`${get.translation(suit)}牌${count}张`);
						} else {
							div.innerHTML = formatStr(`没有${get.translation(suit)}牌`);
						}
						div.css({
							position: "absolute",
							width: "100%",
							bottom: "1%",
							height: "35%",
							background: "#352929bf",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							fontSize: "1.2em",
							zIndex: "2",
						});
					};
				}
				//框的样式，不要太宽，高度最小也要100px，防止空框没有高度
				/**@type {Row_Item_Option['itemContainerCss']} */
				let itemContainerCss = {
					border: "solid #c6b3b3 2px",
					minHeight: "100px",
				};
				if (key2) {
					dialog.addNewRow(
						{
							item: cards1,
							ItemNoclick: true, //卡牌不需要被点击
							clickItemContainer,
							custom: createCustom(key1, cards1.length), //添加封条
							itemContainerCss,
						},
						{
							item: cards2,
							ItemNoclick: true, //卡牌不需要被点击
							clickItemContainer,
							custom: createCustom(key2, cards2.length),
							itemContainerCss,
						}
					);
				} else {
					dialog.addNewRow({
						item: cards1,
						ItemNoclick: true, //卡牌不需要被点击
						clickItemContainer,
						custom: createCustom(key1, cards1.length),
						itemContainerCss,
					});
				}
			}
			game.pause();
			dialog.open();
			_status.imchoosing = true;
			return promise;
		},
		async cost(event, trigger, player) {
			const list = get.addNewRowList(player.getCards("h"), "suit", player);
			let limit = event.skill === "sbqingzheng" ? 3 - player.countMark("sbjianxiong") : 1;
			const { result } = await player.chooseButtonTarget({
				createDialog: [
					[
						[[`${get.prompt(event.skill)}<div class="text center">${get.translation(event.skill, "info")}</div>`], "addNewRow"],
						[
							dialog => {
								dialog.classList.add("fullheight");
								// 不添加scroll1和scroll2的类名
								dialog.forcebutton = false;
								dialog._scrollset = false;
							},
							"handle",
						],
						list.map(item => [Array.isArray(item) ? item : [item], "addNewRow"]),
					],
				],
				filterButton(button) {
					const player = get.player();
					if (!button.links.length || button.links.some(card => !lib.filter.cardDiscardable(card, player, get.event().getParent().skill))) {
						return false;
					}
					return true;
				},
				selectButton: limit,
				limit,
				filterTarget(card, player, target) {
					return target != player && target.countCards("h");
				},
				ai1(button) {
					const player = get.player();
					if (!game.hasPlayer(current => player != current && current.countDiscardableCards(player, "h") > 0 && get.attitude(player, current) < 0)) {
						return 0;
					}
					let values = button.links.map(i => get.value(i)).reduce((p, c) => p + c, 0) / button.links.length;
					if (button.links.length > 4 || values > 6) {
						return 0;
					}
					return (13 - button.links.length) / values;
				},
				ai2(target) {
					const player = get.player(),
						att = get.attitude(player, target);
					if (att >= 0) {
						return 0;
					}
					return 1 - att / 2 + Math.sqrt(target.countCards("h"));
				},
			});
			event.result = {
				bool: result?.bool,
				cost_data: result?.links,
				targets: result?.targets,
			};
			if (event.result.bool && result?.links?.length) {
				event.result.cards = player.getCards("h").filter(card => result.links.includes(get.suit(card, player)));
			}
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
				cards: cards1,
			} = event;
			await player.discard(cards1);
			if (
				!target.countCards("h") ||
				lib.suits
					.slice()
					.filter(suit => target.hasCard((card, playerx) => get.suit(card, playerx) === suit, "h"))
					.every(suit => target.hasCard((card, playerx) => get.suit(card, playerx) === suit && !lib.filter.cardDiscardable(card, player), "h"))
			) {
				if (target.countCards("h")) {
					const content = [`###清正###<div class="text center">${get.translation(target)}的手牌</div>`, target.getCards("h")];
					await player.chooseControl("ok").set("dialog", content);
				}
				return;
			}
			const list = get.addNewRowList(target.getCards("h"), "suit", target);
			let { result } = await player
				.chooseButton(
					[
						[
							[[`清正：弃置${get.translation(target)}一种花色的所有牌`], "addNewRow"],
							[
								dialog => {
									dialog.classList.add("fullheight");
									dialog.forcebutton = false;
									dialog._scrollset = false;
								},
								"handle",
							],
							list.map(item => [Array.isArray(item) ? item : [item], "addNewRow"]),
						],
					],
					true
				)
				.set("filterButton", button => {
					const player = get.player();
					if (!button.links.length || button.links.some(card => !lib.filter.cardDiscardable(card, player, get.event().getParent().name))) {
						return false;
					}
					return true;
				})
				.set("ai", button => {
					const player = get.player();
					return button.links.length;
				});
			if (!result?.links?.length) {
				return;
			}
			const cards2 = target.getDiscardableCards(player, "h").filter(card => result.links.includes(get.suit(card, target)));
			if (cards2.length) {
				await target.discard(cards2, "notBySelf").set("discarder", player);
			}
			if (cards1.length > cards2.length) {
				await target.damage(player,'fire');
			}
			if (event.name !== "sbqingzheng" || player.countMark("sbjianxiong") >= 2) {
				return;
			}
			if (["sbjianxiong", "jdjianxiong"].some(skill => player.hasSkill(skill, null, null, false))) {
				result = await player
					.chooseBool("是否获得1枚“治世”？")
					.set("choice", Math.random() >= 0.5)
					.forResult();
				if (result?.bool) {
					player.addMark("sbjianxiong", 1);
				}
			}
		},
	},
	sgsxjxfzmnl_mbcmjiushi: {
		audio: 'mbcmjiushi',
		inherit: "rejiushi",
		persevereSkill: true,
		group: ["sgsxjxfzmnl_mbcmjiushi_use", "sgsxjxfzmnl_mbcmjiushi_turnback", "sgsxjxfzmnl_mbcmjiushi_gain"],
		subSkill: {
			use: {
				hiddenCard(player, name) {
					if (name == "jiu") {
						return !player.isTurnedOver();
					}
					return false;
				},
				audio: "mbcmjiushi",
				enable: "chooseToUse",
				filter(event, player) {
					if (player.classList.contains("turnedover")) {
						return false;
					}
					return event.filterCard({ name: "jiu", isCard: true }, player, event);
				},
				async content(event, trigger, player) {
					if (_status.event.getParent(2).type == "dying") {
						event.dying = player;
						event.type = "dying";
					}
					await player.turnOver();
					await player.useCard({ name: "jiu", isCard: true }, player);
				},
				ai: {
					save: true,
					skillTagFilter(player, tag, arg) {
						return !player.isTurnedOver() && _status.event?.dying == player;
					},
					order: 5,
					result: {
						player(player) {
							if (_status.event.parent.name == "phaseUse") {
								if (player.countCards("h", "jiu") > 0) {
									return 0;
								}
								if (player.getEquip("zhuge") && player.countCards("h", "sha") > 1) {
									return 0;
								}
								if (!player.countCards("h", "sha")) {
									return 0;
								}
								var targets = [];
								var target;
								var players = game.filterPlayer();
								for (var i = 0; i < players.length; i++) {
									if (get.attitude(player, players[i]) < 0) {
										if (player.canUse("sha", players[i], true, true)) {
											targets.push(players[i]);
										}
									}
								}
								if (targets.length) {
									target = targets[0];
								} else {
									return 0;
								}
								var num = get.effect(target, { name: "sha" }, player, player);
								for (var i = 1; i < targets.length; i++) {
									var num2 = get.effect(targets[i], { name: "sha" }, player, player);
									if (num2 > num) {
										target = targets[i];
										num = num2;
									}
								}
								if (num <= 0) {
									return 0;
								}
								var e2 = target.getEquip(2);
								if (e2) {
									if (e2.name == "tengjia") {
										if (!player.countCards("h", { name: "sha", nature: "fire" }) && !player.getEquip("zhuque")) {
											return 0;
										}
									}
									if (e2.name == "renwang") {
										if (!player.countCards("h", { name: "sha", color: "red" })) {
											return 0;
										}
									}
									if (e2.name == "baiyin") {
										return 0;
									}
								}
								if (player.getEquip("guanshi") && player.countCards("he") > 2) {
									return 1;
								}
								return target.countCards("h") > 3 ? 0 : 1;
							}
							if (player == _status.event.dying || player.isTurnedOver()) {
								return 3;
							}
						},
					},
					effect: {
						target(card, player, target) {
							if (target.isTurnedOver()) {
								if (get.tag(card, "damage")) {
									if (player.hasSkillTag("jueqing", false, target)) {
										return [1, -2];
									}
									if (target.hp == 1) {
										return;
									}
									return [1, target.countCards("h") / 2];
								}
							}
						},
					},
				},
			},
			turnback: {
				audio: "mbcmjiushi",
				persevereSkill: true,
				trigger: { player: "damageEnd" },
				check(event, player) {
					return player.isTurnedOver();
				},
				filter(event, player) {
					if (
						player.hasHistory("useCard", evt => {
							if (evt.card.name != "jiu" || evt.getParent().name != "sgsxjxfzmnl_mbcmjiushi_use") {
								return false;
							}
							return evt.getParent("damage", true) == event;
						})
					) {
						return false;
					}
					return player.isTurnedOver();
				},
				prompt(event, player) {
					return "是否发动【酒诗】，将武将牌翻面？";
				},
				content() {
					player.turnOver();
				},
			},
			gain: {
				audio: "mbcmjiushi",
				persevereSkill: true,
				trigger: { player: "turnOverAfter" },
				frequent: true,
				prompt: "是否发动【酒诗】，获得牌堆中的一张锦囊牌？",
				content() {
					var card = get.cardPile2(function (card) {
						return get.type2(card) == "trick";
					});
					if (card) {
						player.gain(card, "draw");
					}
				},
			},
		},
	},
	sgsxjxfzmnl_mbcmfangzhu: {
		audio: 'mbcmfangzhu',
		persevereSkill: true,
		inherit: "sbfangzhu",
		filter(event, player) {
			const target = player.storage.sgsxjxfzmnl_mbcmfangzhu;
			return game.hasPlayer(current => current !== player && (target ? target != current : true));
		},
		usable: 1,
		chooseButton: {
			dialog() {
				const dialog = ui.create.dialog("放逐：令一名其他角色...", "hidden");
				dialog.add([
					[
						[1, "不能使用手牌中的非锦囊牌直到其回合结束"],
						[2, "非Charlotte技能失效直到其回合结束"],
					],
					"textbutton",
				]);
				return dialog;
			},
			check(button) {
				const player = get.player();
				if (button.link === 2) {
					if (
						game.hasPlayer(target => {
							if (target.hasSkill("sgsxjxfzmnl_mbcmfangzhu_ban") || target.hasSkill("fengyin") || target.hasSkill("baiban")) {
								return false;
							}
							return (
								get.attitude(player, target) < 0 &&
								["name", "name1", "name2"]
									.map((sum, name) => {
										if (target[name] && (name != "name1" || target.name != target.name1)) {
											if (get.character(target[name])) {
												return get.rank(target[name], true);
											}
										}
										return 0;
									})
									.reduce((p, c) => {
										return p + c;
									}, 0) > 5
							);
						})
					) {
						return 6;
					}
				}
				return button.link === 1 ? 1 : 0;
			},
			backup(links, player) {
				return {
					num: links[0],
					audio: "mbcmfangzhu",
					filterCard: () => false,
					selectCard: -1,
					filterTarget(card, player, target) {
						if (target == player) {
							return false;
						}
						const num = lib.skill.mbcmfangzhu_backup.num,
							storage = target.getStorage("sgsxjxfzmnl_mbcmfangzhu_ban"),
							targetx = player.storage.sgsxjxfzmnl_mbcmfangzhu;
						if (target == targetx) {
							return false;
						}
						return num != 1 || !storage.length;
					},
					async content(event, trigger, player) {
						const target = event.target;
						const num = lib.skill.sgsxjxfzmnl_mbcmfangzhu_backup.num;
						// player.storage.sgsxjxfzmnl_mbcmfangzhu = target;
						let evt = event.getParent("phaseUse", true);
						if (evt) {
							evt.fangzhuUsed = true;
						}
						// player
						// 	.when("phaseUseEnd")
						// 	.filter(evtx => !evtx.fangzhuUsed)
						// 	.then(() => {
						// 		player.storage.sgsxjxfzmnl_mbcmfangzhu = player;
						// 	});
						switch (num) {
							case 1:
								target.addTempSkill("sgsxjxfzmnl_mbcmfangzhu_ban", { player: "phaseEnd" });
								target.markAuto("sgsxjxfzmnl_mbcmfangzhu_ban", ["trick"]);
								lib.skill.mbcmfangzhu_ban.init(target, "mbcmfangzhu_ban");
								break;
							case 2:
								target.addTempSkill("sgsxjxfzmnl_mbcmfangzhu_baiban", { player: "phaseEnd" });
								break;
						}
					},
					ai: {
						result: {
							target(player, target) {
								switch (lib.skill.mbcmfangzhu_backup.num) {
									case 1:
										return -target.countCards("h", card => get.type(card) != "trick") - 1;
									case 2:
										return -target.getSkills(null, null, false).reduce((sum, skill) => {
											return sum + Math.max(get.skillRank(skill, "out"), get.skillRank(skill, "in"));
										}, 0);
								}
							},
						},
					},
				};
			},
			prompt(links, player) {
				const str = "###放逐###";
				switch (links[0]) {
					case 1:
						return str + "令一名其他角色不能使用手牌中的非锦囊牌直到其回合结束";
					case 2:
						return str + "令一名其他角色的非Charlotte技能失效直到其回合结束";
				}
			},
		},
		ai: {
			order: 10,
			result: {
				player(player) {
					return game.hasPlayer(current => get.attitude(player, current) < 0) ? 1 : 0;
				},
			},
		},
		subSkill: {
			backup: {},
			baiban: {
				init(player, skill) {
					player.addSkillBlocker(skill);
					player.addTip(skill, "放逐 技能失效");
				},
				onremove(player, skill) {
					player.removeSkillBlocker(skill);
					player.removeTip(skill);
				},
				inherit: "baiban",
				marktext: "逐",
			},
			ban: {
				init(player, skill) {
					let storage = player.getStorage(skill);
					if (storage.length) {
						player.addTip(skill, "放逐 限" + (storage.length === 1 ? get.translation(storage[0])[0] : "手牌"));
					}
				},
				onremove(player, skill) {
					player.removeTip(skill);
					delete player.storage[skill];
				},
				charlotte: true,
				mark: true,
				marktext: "禁",
				intro: {
					markcount: () => 0,
					content(storage) {
						if (storage.length > 1) {
							return "不能使用手牌";
						}
						return "不能使用手牌中的非" + get.translation(storage[0]) + "牌";
					},
				},
				mod: {
					cardEnabled(card, player) {
						const storage = player.getStorage("sgsxjxfzmnl_mbcmfangzhu_ban");
						const hs = player.getCards("h"),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && !storage.includes(get.type2(card))) {
							return false;
						}
					},
					cardSavable(card, player) {
						const storage = player.getStorage("sgsxjxfzmnl_mbcmfangzhu_ban");
						const hs = player.getCards("h"),
							cards = [card];
						if (Array.isArray(card.cards)) {
							cards.addArray(card.cards);
						}
						if (cards.containsSome(...hs) && !storage.includes(get.type2(card))) {
							return false;
						}
					},
				},
			},
		},
	},
	sgsxjxfzmnl_mbjuejin: {
		audio: 'mbjuejin',
		persevereSkill: true,
		enable: "phaseUse",
		limited: true,
		skillAnimation: true,
		animationColor: "thunder",
		filterCard: () => false,
		selectCard: [-1, -2],
		filterTarget: true,
		selectTarget: -1,
		multiline: true,
		async contentBefore(event, trigger, player) {
			game.broadcastAll(() => {
				_status.tempMusic = "effect_caomaoBJM";
				game.playBackgroundMusic();
			});
			player.changeSkin({ characterName: "sgsxjxfzmnl_mb_caomao" }, "sgsxjxfzmnl_mb_caomao_shadow");
			player.awakenSkill(event.skill);
		},
		async content(event, trigger, player) {
			const target = event.target;
			const delt = target.getHp(true) - 1,
				num = Math.abs(delt);
			if (delt != 0) {
				if (delt > 0) {
					const next = target.changeHp(-delt);
					next._triggered = null;
					await next;
				} else {
					await target.recover(num);
				}
			}
			if (delt > 0) {
				await target.changeHujia(num + (player == target ? 2 : 0), null, true);
			} else if (player == target) {
				await target.changeHujia(2, null, true);
			}
		},
		async contentAfter(event, trigger, player) {
			game.addGlobalSkill("sgsxjxfzmnl_mbjuejin_xiangsicunwei");
			player.$fullscreenpop("向死存魏！", "thunder");
			const cards = ["cardPile", "discardPile"].map(pos => Array.from(ui[pos].childNodes)).flat();
			const filter = card => ["shan", "tao", "jiu"].includes(card.name);
			const cardx = cards.filter(filter);
			if (cardx.length) {
				await game.cardsGotoSpecial(cardx);
				game.log(cardx, "被移出了游戏");
			}
			for (const target of game.filterPlayer()) {
				const sishis = target.getCards("hej", filter);
				if (sishis.length) {
					target.$throw(sishis);
					game.log(sishis, "被移出了游戏");
					await target.lose(sishis, ui.special);
				}
			}
		},
		ai: {
			order: 0.1,
			result: {
				player(player) {
					let eff = 1;
					game.countPlayer(current => {
						const att = get.attitude(player, current),
							num = Math.abs(current.getHp(true) - 1);
						const delt = Math.max(0, num + current.hujia - 5);
						eff -= att * delt;
					});
					return eff > 0 ? 1 : 0;
				},
			},
		},
		subSkill: {
			xiangsicunwei: {
				trigger: {
					global: ["loseAfter", "equipAfter", "loseAsyncAfter", "cardsDiscardAfter"],
				},
				forced: true,
				silent: true,
				firstDo: true,
				filter(event, player) {
					const nameList = ["shan", "tao", "jiu"];
					return event.getd().some(card => {
						return nameList.includes(get.name(card, false)) && get.position(card, true) === "d";
					});
				},
				async content(event, trigger, player) {
					const nameList = ["shan", "tao", "jiu"];
					const cards = trigger.getd().filter(card => {
						return nameList.includes(get.name(card, false)) && get.position(card, true) === "d";
					});
					await game.cardsGotoSpecial(cards);
					game.log(cards, "被移出了游戏");
				},
			},
		},
	},
	sgsxjxfzmnl_mbcmguixin: {
		audio: 'guixin',
		trigger: { player: "damageEnd" },
		filter(event, player) {
			return game.hasPlayer(cur => {
				return cur !== player && cur.countCards("hej") > 0;
			});
		},
		check(event, player) {
			if (player.isTurnedOver() || event.num > 1) {
				return true;
			}
			var num = game.countPlayer(function (current) {
				if (current.countCards("he") && current != player && get.attitude(player, current) <= 0) {
					return true;
				}
				if (current.countCards("j") && current != player && get.attitude(player, current) > 0) {
					return true;
				}
			});
			return num >= 2;
		},
		getIndex(event, player) {
			return event.num;
		},
		async content(event, trigger, player) {
			let targets = game.filterPlayer(current => current != player).sortBySeat();
			player.line(targets, "green");
			await player.gainMultiple(targets, "hej");
			// await player.turnOver();
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			threaten(player, target) {
				if (target.hp == 1) {
					return 2.5;
				}
				return 0.5;
			},
			effect: {
				target(card, player, target) {
					if (
						!target._guixin_eff &&
						get.tag(card, "damage") &&
						target.hp >
							(player.hasSkillTag("damageBonus", true, {
								card: card,
								target: target,
							})
								? 2
								: 1)
					) {
						if (player.hasSkillTag("jueqing", false, target)) {
							return [1, -2];
						}
						target._guixin_eff = true;
						let gain = game.countPlayer(function (current) {
							if (target == current) {
								return 0;
							}
							if (get.attitude(target, current) > 0) {
								if (current.hasCard(cardx => lib.filter.canBeGained(cardx, target, current, "guixin") && get.effect(current, cardx, current, current) < 0, "ej")) {
									return 1.3;
								}
								return 0;
							}
							if (current.hasCard(cardx => lib.filter.canBeGained(cardx, target, current, "guixin") && get.effect(current, cardx, current, current) > 0, "ej")) {
								return 1.1;
							}
							if (current.hasCard(cardx => lib.filter.canBeGained(cardx, target, current, "guixin"), "h")) {
								return 0.9;
							}
							return 0;
						});
						if (target.isTurnedOver()) {
							gain += 2.3;
						} else {
							gain -= 2.3;
						}
						delete target._guixin_eff;
						return [1, Math.max(0, gain)];
					}
				},
			},
		},
	},


	//蒲元
	sgsxjxfzmnl_pytianjiang: {
		audio: 'pytianjiang',
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		forced: true,
		locked: false,
		filter(event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		content() {
			"step 0";
			var i = 0;
			var list = [];
			while (i++ < 4) {
				var card = get.cardPile(
					function (card) {
						if (get.type(card) != "equip") {
							return false;
						}
						return list.length == 0 || !get.YB_suit(list,'subtype').includes(get.subtype(card));
					},
					false,
					"random"
				);
				if (card) {
					list.push(card);
				}
			}
			if (!list.length) {
				event.finish();
				return;
			}
			event.list = list;
			player.gain(event.list, "gain2");
			"step 1";
			game.delay(1);
			var card = event.list.shift();
			if (player.getCards("h").includes(card)) {
				player.$give(card, player, false);
				player.equip(card);
			}
			if (event.list.length) {
				event.redo();
			}
		},
		group: "sgsxjxfzmnl_pytianjiang_move",
	},
	sgsxjxfzmnl_pytianjiang_move: {
		audio: "pytianjiang",
		prompt: "将装备区里的一张牌移动至其他角色的装备区",
		enable: "phaseUse",
		position: "e",
		sourceSkill: "sgsxjxfzmnl_pytianjiang",
		filter(event, player) {
			return player.countCards("e") > 0;
		},
		check() {
			return 1;
		},
		filterCard: true,
		filterTarget(event, player, target) {
			return target != player && target.canEquip(ui.selected.cards[0], true);
		},
		prepare: "give",
		discard: false,
		lose: false,
		content() {
			"step 0";
			target.equip(cards[0]);
			"step 1";
			if (cards[0].name.indexOf("sgsxjxfzmnl_pyzhuren_") == 0 && !player.getCards("e").includes(cards[0])) {
				var list = [];
				var suits = {
					spade:[],
					heart:[],
					club:[],
					diamond:[],
					none:[]
				}
				for(var i of ui.cardPile.childNodes){
					var suit = get.suit(i);
					suits[suit].push(i);
				}
				for(var k in suits){
					if(suits[k].length>0){
						list.addArray(suits[k].randomGets(1).slice(0,1))
					}
				}
				var fun = (function getCards(){
					return function(num){
						if (typeof num != "number") {
							num = 1;
						}
						if (num <= 0) {
							return [];
						}
						return list;
					}
				})(list)
				if(list.length>0)player.YB_drawCard(list.length,fun)
			}
		},
		ai: {
			order: (item, player) => {
				if (player.hasCard(i => get.subtype(i) === "equip1", "h")) {
					return 11;
				}
				return 1;
			},
			expose: 0.2,
			result: {
				target(player, target) {
					if (ui.selected.cards.length) {
						let card = ui.selected.cards[0],
							tv = get.value(card, target),
							sub = get.subtype(card);
						if (sub === "equip1") {
							let ev = Infinity,
								te = target.getEquips(1);
							if (!te.length) {
								return tv;
							}
							te.forEach(i => {
								ev = Math.min(ev, get.value(i));
							});
							if (card.name.indexOf("sgsxjxfzmnl_pyzhuren_") == 0) {
								return 2 + tv - ev;
							}
							return tv - ev;
						}
						if (target.hasCard(i => get.subtype(i) === sub, "he")) {
							return 0;
						}
						let pv = get.value(card, player);
						if (pv > 0 && Math.abs(tv) <= pv) {
							return 0;
						}
						return tv;
					}
					return 0;
				},
			},
		},
	},
	sgsxjxfzmnl_pyzhuren: {
		audio: 'pyzhuren',
		enable: "phaseUse",
		usable: 1,
		filterCard: true,
		selectCard: 1,
		check(card) {
			var player = _status.event.player;
			var name = "sgsxjxfzmnl_pyzhuren_" + card[card.name == "shandian" ? "name" : "suit"];
			if (!lib.card[name] || (_status.sgsxjxfzmnl_pyzhuren && _status.sgsxjxfzmnl_pyzhuren[name])) {
				if (!player.countCards("h", "sha")) {
					return 4 - get.value(card);
				}
				return 0;
			}
			return 7 - get.value(card);
		},
		content() {
			//player.addSkill('pyzhuren_destroy');
			if (!_status.sgsxjxfzmnl_pyzhuren) {
				_status.sgsxjxfzmnl_pyzhuren = {};
			}
			var rand = 0.85;
			var num = get.number(cards[0]);
			if (num > 4) {
				rand = 0.9;
			}
			if (num > 8) {
				rand = 0.95;
			}
			if (num > 12 || cards[0].name == "shandian" || get.isLuckyStar(player)) {
				rand = 1;
			}
			var name = "sgsxjxfzmnl_pyzhuren_" + cards[0][cards[0].name == "shandian" ? "name" : "suit"];
			if (!lib.card[name] || _status.sgsxjxfzmnl_pyzhuren[name] || Math.random() > rand) {
				player.popup("杯具");
				game.log(player, "锻造失败");
				var card = get.cardPile(function (card) {
					return card.name == "sha";
				});
				if (card) {
					player.gain(card, "gain2");
				}
			} else {
				_status.sgsxjxfzmnl_pyzhuren[name] = true;
				var card = game.createCard(name, cards[0].name == "shandian" ? "spade" : cards[0].suit, 1);
				card.destroyed = "discardPile";
				player.gain(card, "gain2");
			}
		},
		ai: {
			order: 10,
			result: {
				player: 1,
			},
		},
	},
	sgsxjxfzmnl_pyzhuren_heart: {
		audio: true,
		trigger: { source: "damageSource" },
		// usable: 1,
		equipSkill: true,
		filter(event, player) {
			return event.getParent().name == "sha";
		},
		content() {
			"step 0";
			player.judge(function (card) {
				var player = _status.event.getParent("sgsxjxfzmnl_pyzhuren_heart").player;
				if (player.isHealthy() && get.color(card) == "red") {
					return 0;
				}
				return 2;
			});
			"step 1";
			switch (result.color) {
				case "red":
					player.recover();
					break;
				case "black":
					player.draw(2);
					break;
				default:
					break;
			}
		},
		ai: {
			equipValue(card, player) {
				if (player.isDamaged()) {
					return 4.5;
				}
				return 6;
			},
			basic: {
				equipValue: 4.5,
			},
		},
	},
	sgsxjxfzmnl_pyzhuren_diamond: {
		audio: true,
		trigger: { source: "damageBegin1" },
		// usable: 2,
		equipSkill: true,
		locked: false,
		mod: {
			cardUsable(card, player, num) {
				var cardx = player.getEquip("pyzhuren_diamond");
				if (card.name == "sha" && (!cardx || player.hasSkill("pyzhuren_diamond", null, false) || (!_status.pyzhuren_diamond_temp && !ui.selected.cards.includes(cardx)))) {
					return num + 1;
				}
			},
			cardEnabled2(card, player) {
				if (!_status.event.addCount_extra || player.hasSkill("pyzhuren_diamond", null, false)) {
					return;
				}
				if (card && card == player.getEquip("pyzhuren_diamond")) {
					_status.pyzhuren_diamond_temp = true;
					var bool = lib.filter.cardUsable(get.autoViewAs({ name: "sha" }, ui.selected.cards.concat([card])), player);
					delete _status.pyzhuren_diamond_temp;
					if (!bool) {
						return false;
					}
				}
			},
		},
		filter(event, player) {
			if (event.getParent().name != "sha") {
				return false;
			}
			return (
				player.countCards("he", card => {
					return card != player.getEquip("pyzhuren_diamond");
				}) > 0
			);
		},
		// async cost(event, trigger, player) {
		// 	const next = player.chooseToDiscard(
		// 		"he",
		// 		(card, player) => {
		// 			return card != player.getEquip("pyzhuren_diamond");
		// 		},
		// 		get.prompt(event.name.slice(0, -5), trigger.player),
		// 		"弃置一张牌，令即将对其造成的伤害+1"
		// 	);
		// 	next.set("target", trigger.player);
		// 	next.set("ai", card => {
		// 		const { goon, target } = get.event();
		// 		if (goon) {
		// 			return 30 / (1 + target.hp) - get.value(card);
		// 		}
		// 		return -1;
		// 	});
		// 	next.set(
		// 		"goon",
		// 		get.attitude(player, trigger.player) < 0 &&
		// 			!trigger.player.hasSkillTag("filterDamage", null, {
		// 				player: player,
		// 				card: trigger.card,
		// 			}) &&
		// 			get.damageEffect(trigger.player, player, player, get.natureList(trigger)) > 0
		// 	);
		// 	event.result = await next.forResult();
		// },
		check(trigger,player){
			// var player = _status.event.player;
			var target = trigger.player;
			var goon = get.attitude(player, trigger.player) < 0 &&
				!trigger.player.hasSkillTag("filterDamage", null, {
					player: player,
					card: trigger.card,
				}) &&
				get.damageEffect(trigger.player, player, player, get.natureList(trigger)) > 0
			if (goon) {
				return 30 / (1 + target.hp) - get.value(card);
			}
			return -1;
		},
		logTarget: "player",
		async content(event, trigger, player) {
			trigger.num++;
		},
		ai: {
			expose: 0.25,
			equipValue(card, player) {
				return Math.min(7, 3.6 + player.countCards("h") / 2);
			},
			basic: { equipValue: 4.5 },
		},
	},
	sgsxjxfzmnl_pyzhuren_club: {
		audio: true,
		trigger: { player: "useCard2" },
		direct: true,
		equipSkill: true,
		filter(event, player) {
			if (event.card.name != "sha" && get.type(event.card) != "trick") {
				return false;
			}
			var info = get.info(event.card);
			if (info.allowMultiple == false) {
				return false;
			}
			var num = player.getHistory("useSkill", function (evt) {
				return evt.skill == "sgsxjxfzmnl_pyzhuren_club";
			}).length;
			// if (num >= 2) {
			// 	return false;
			// }
			if (event.targets && !info.multitarget) {
				if (
					game.hasPlayer(function (current) {
						return lib.filter.targetEnabled2(event.card, player, current) && !event.targets.includes(current);
					})
				) {
					return true;
				}
			}
			return false;
		},
		content() {
			"step 0";
			var prompt2 = "为" + get.translation(trigger.card) + "额外指定一个目标";
			player
				.chooseTarget([1, player.storage.fumian_red], get.prompt(event.name), function (card, player, target) {
					var player = _status.event.player;
					if (_status.event.targets.includes(target)) {
						return false;
					}
					return lib.filter.targetEnabled2(_status.event.card, player, target);
				})
				.set("prompt2", prompt2)
				.set("ai", function (target) {
					var trigger = _status.event.getTrigger();
					var player = _status.event.player;
					return get.effect(target, trigger.card, player, player);
				})
				.set("targets", trigger.targets)
				.set("card", trigger.card);
			"step 1";
			if (result.bool) {
				if (!event.isMine() && !event.isOnline()) {
					game.delayx();
				}
				event.targets = result.targets;
			}
			"step 2";
			if (event.targets) {
				player.logSkill(event.name, event.targets);
				trigger.targets.addArray(event.targets);
			}
		},
		ai: {
			equipValue(card, player) {
				if (player.getEnemies().length < 2) {
					if (player.isDamaged()) {
						return 0;
					}
					return 1;
				}
				return 4.5;
			},
			basic: {
				equipValue: 4.5,
			},
		},
		// subSkill: {
		// 	lose: {
		// 		audio: "pyzhuren_club",
		// 		forced: true,
		// 		charlotte: true,
		// 		equipSkill: true,
		// 		trigger: {
		// 			player: "loseAfter",
		// 			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		// 		},
		// 		filter: (event, player) => {
		// 			return player.isDamaged() && !player.hasSkillTag("unequip2");
		// 		},
		// 		getIndex(event, player) {
		// 			const evt = event.getl(player);
		// 			const lostCards = [];
		// 			evt.es.forEach(card => {
		// 				const VEquip = evt.vcard_map.get(card);
		// 				if (VEquip.name === "sgsxjxfzmnl_pyzhuren_club") {
		// 					lostCards.add(VEquip);
		// 				}
		// 			});
		// 			return lostCards.length;
		// 		},
		// 		async content(event, trigger, player) {
		// 			await player.recover();
		// 		},
		// 	},
		// },
	},
	sgsxjxfzmnl_pyzhuren_spade: {
		audio: true,
		trigger: { player: "useCardToPlayered" },
		filter(event, player) {
			return event.card.name == "sha"; //&&event.targets.length==1&&get.color(event.card)=='black';
		},
		check(event, player) {
			return get.attitude(player, event.target) <= 0;
		},
		equipSkill: true,
		logTarget: "target",
		content() {
			var num = player.getHistory("useSkill", function (evt) {
				return evt.skill == "sgsxjxfzmnl_pyzhuren_spade";
			}).length;
			trigger.target.loseHp(num); //.set('source',player);
		},
		ai: {
			equipValue(card, player) {
				return 1 + 4 * Math.min(5, player.getCardUsable("sha"));
			},
			basic: {
				equipValue: 5,
			},
			jueqing: true,
			unequip_ai: true,
			skillTagFilter(player, tag, arg) {
				if (tag == "unequip_ai") {
					return arg && arg.name === "sha";
				}
			},
		},
	},
	sgsxjxfzmnl_pyzhuren_shandian: {
		audio: true,
		trigger: { player: "useCardToPlayered" },
		filter(event, player) {
			return event.card.name == "sha"; //&&event.targets.length==1;
		},
		check(event, player) {
			return get.attitude(player, event.target) <= 0;
		},
		equipSkill: true,
		logTarget: "target",
		content() {
			"step 0";
			trigger.target.judge(function (card) {
				var suit = get.suit(card);
				if (suit == "spade") {
					return -10;
				}
				if (suit == "club") {
					return -5;
				}
				return 0;
			}).judge2 = function (result) {
				return result.color == "black" ? true : false;
			};
			"step 1";
			if (result.suit == "spade") {
				trigger.target.damage(3, "thunder");
				//trigger.getParent().excluded.add(trigger.target);
			} else if (result.suit == "club") {
				trigger.target.damage("thunder");
				player.recover();
				player.draw();
			}
		},
		ai: {
			equipValue(card, player) {
				if (player.isDamaged()) {
					return 6;
				}
				return 4.8;
			},
			basic: {
				equipValue: 5,
			},
		},
	},


	//十周年神华佗
	sgsxjxfzmnl_jingyu: {
		audio: 'jingyu',
		trigger: {
			global: ["useSkill", "logSkillBegin"],
		},
		filter(event, player) {
			if (["global", "equip"].includes(event.type)) {
				return false;
			}
			let skill = get.sourceSkillFor(event);
			if (!skill || skill === "sgsxjxfzmnl_jingyu") {
				return false;
			}
			let info = get.info(skill);
			if (!info || info.charlotte || info.equipSkill) {
				return false;
			}
			// return !player.getStorage("sgsxjxfzmnl_jingyu_used").includes(skill);
			return true;
		},
		direct: true,
		forced: true,
		async content(event, trigger, player) {
			// if (!player.storage.jingyu_used) {
			// 	player
			// 		.when({ global: "roundStart" })
			// 		.assign({
			// 			firstDo: true,
			// 		})
			// 		.then(() => delete player.storage.sgsxjxfzmnl_jingyu_used);
			// }
			// let skill = get.sourceSkillFor(trigger);
			// player.markAuto("jingyu_used", skill);
			player.logSkill(event.name);
			await player.draw();
		},
		ai: { threaten: 6 },
	},
	sgsxjxfzmnl_lvxin: {
		audio: 'lvxin',
		enable: "phaseUse",
		usable: 1,
		filterCard: true,
		filterTarget: lib.filter.notMe,
		filter() {
			const round = game.roundNumber;
			return typeof round == "number" && round > 0;
		},
		check(card) {
			const round = game.roundNumber,
				player = get.player();
			let valueFix = 0;
			if (["sha", "shan"].includes(get.name(card, false))) {
				valueFix += 3;
			}
			if (
				(round <= 2 &&
					player.hasCard(card => {
						return ["sha", "shan"].includes(get.name(card)) && get.value(card) <= 3;
					})) ||
				game.hasPlayer(current => {
					return current !== player && get.attitude(player, current) > 0;
				})
			) {
				return 6 - get.value(card) + valueFix;
			}
			return 4.5 - get.value(card) + valueFix;
		},
		delay: false,
		discard: false,
		lose: false,
		async content(event, trigger, player) {
			const { target, cards } = event,
				round = game.countGroup();
				// round = Math.min(5, game.roundNumber);
			const name = get.translation(target);
			await player.give(cards, target);
			const result = await player
				.chooseControl(["摸牌", "弃牌"])
				.set("choiceList", [`令${name}摸${get.cnNumber(round)}张牌`, `令${name}随机弃置${get.cnNumber(round)}张手牌`])
				.set("prompt", "滤心：请选择一项")
				.set("ai", () => {
					return get.event().choice;
				})
				.set("choice", get.attitude(player, target) > 0 ? "摸牌" : "弃牌")
				.forResult();
			let cards2 = [];
			const makeDraw = result.index === 0;
			if (makeDraw) {
				cards2 = await target.draw(round).forResult();
			} else {
				const cards = target.getCards("h", card => {
					return lib.filter.cardDiscardable(card, target, "lvxin");
				});
				if (cards.length > 0) {
					const evt = target.discard(cards.randomGets(round)).set("discarder", target);
					await evt;
					cards2 = evt.done.cards2;
				}
			}
			const cardName = get.name(cards[0], player);
			if (
				cards2.some(card => {
					return get.name(card, target) === cardName;
				})
			) {
				const skillName = `sgsxjxfzmnl_lvxin_${makeDraw ? "recover" : "lose"}`;
				target.addSkill(skillName);
				target.addMark(skillName, 1, false);
			}
		},
		subSkill: {
			recover: {
				trigger: { player: ["useSkill", "logSkillBegin", "useCard", "respond"] },
				filter(event, player) {
					if (["global", "equip"].includes(event.type)) {
						return false;
					}
					if ((get.info(event.skill) || {}).charlotte) {
						return false;
					}
					const skill = get.sourceSkillFor(event);
					const info = get.info(skill);
					return info && !info.charlotte && !info.equipSkill;
				},
				forced: true,
				onremove: true,
				charlotte: true,
				async content(event, trigger, player) {
					player.recover(player.countMark(event.name));
					player.removeSkill(event.name);
				},
				intro: { content: "下次发动技能时回复#点体力" },
			},
			lose: {
				trigger: { player: ["useSkill", "logSkillBegin", "useCard", "respond"] },
				filter(event, player) {
					if (["global", "equip"].includes(event.type)) {
						return false;
					}
					if ((get.info(event.skill) || {}).charlotte) {
						return false;
					}
					const skill = get.sourceSkillFor(event);
					const info = get.info(skill);
					return info && !info.charlotte && !info.equipSkill;
				},
				forced: true,
				onremove: true,
				charlotte: true,
				async content(event, trigger, player) {
					player.loseHp(player.countMark(event.name));
					player.removeSkill(event.name);
				},
				intro: { content: "下次发动技能时失去#点体力" },
			},
		},
		ai: {
			order: 5,
			result: {
				target(player, target) {
					const round = game.roundNumber;
					if (
						round <= 2 &&
						target.countCards("h") > round * 2 &&
						player.getCards("h").some(card => {
							return ["sha", "shan"].includes(get.name(card)) && get.value(card) <= 3;
						})
					) {
						return 1;
					}
					if (get.attitude(player, target) > 0) {
						return round + Math.sqrt(1 + target.getDamagedHp());
					}
					return -(round + Math.sqrt(Math.max(0, 2 - target.getHp())));
				},
			},
		},
	},
	sgsxjxfzmnl_huandao: {
		audio: 'huandao',
		enable: "phaseUse",
		usable: 1,
		limited: true,
		filterTarget: lib.filter.notMe,
		skillAnimation: true,
		animationColor: "metal",
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			const { target } = event;
			await target.turnOver(false);
			await target.link(false);
			//？
			let names = [target.name1 || target.name];
			if (target.name2) {
				names.add(target.name2);
			}
			names = names.map(name => get.rawName(name));
			if (!_status.characterlist) {
				game.initCharacterList();
			}
			var characters = [];
			outer: for (const name of _status.characterlist) {
				const info = lib.character[name];
				if (names.includes(get.rawName(name))) {
					characters.push(name);
				}
			}
			if(!characters.length){
				return;
			}
			player.line(target, "green");
			var relu = await player.chooseButton([ '选择令'+get.translation(target)+'获得一张武将牌上的所有技能，并失去原有技能。', [characters, 'character']], true).forResult();
			if(relu.bool){
				await target.clearSkills(true);
				await target.addTip('sgsxjxfzmnl_huandao', "被利斧砍开头颅");
				game.log(target, '获得了', '#y' + get.translation(relu.links[0]), '的所有技能');
				await target.addSkill(lib.character[relu.links[0]].skills);
			}
		},
		ai: {
			order: 5,
			result: {
				target(player, target) {
					if (!_status.characterlist) {
						game.initCharacterList();
					}
					if (game.roundNumber * game.countPlayer() <= (1.5 * game.countPlayer2()) / Math.sqrt(player.getDamagedHp() + 1)) {
						return 0;
					}
					const ownedSkills = target.getSkills(null, false, false).filter(skill => {
						const info = get.info(skill);
						if (!info || info.charlotte || !get.skillInfoTranslation(skill, player).length) {
							return false;
						}
						return true;
					});
					const uselessSkills = ownedSkills.filter(skill => {
						const info = get.info(skill);
						if (!info) {
							return false;
						}
						if (target.awakenedSkills.includes(skill) && (info.limited || info.juexingji || info.dutySkill)) {
							return true;
						}
						if (info.ai && (info.ai.neg || info.ai.halfneg)) {
							return true;
						}
						return false;
					});
					if (uselessSkills.length) {
						return 3;
					}
					let names = [target.name1 || target.name];
					if (target.name2) {
						names.add(target.name2);
					}
					names = names.map(name => get.rawName(name));
					if (_status.characterlist.some(name => names.includes(get.rawName(name)))) {
						return 1;
					}
					return 0;
				},
			},
		},
	},


	//新杀许靖
	sgsxjxfzmnl_dccaixia: {
		audio: 'dccaixia',
		trigger: {
			player: "damageEnd",
			source: "damageSource",
		},
		filter(event, player) {
			return !player.hasMark("sgsxjxfzmnl_dccaixia_clear");
		},
		direct: true,
		locked: false,
		content() {
			"step 0";
			var choices = Array.from({
				length: Math.min(5, game.players.length + game.dead.length),
			}).map((_, i) => get.cnNumber(i + 1, true));
			var uses=game.countGroup();
			player
				.chooseControl(choices, "cancel2")
				.set("prompt", get.prompt("sgsxjxfzmnl_dccaixia"))
				.set("prompt2", "你可以摸至多" + get.cnNumber(choices.length) + "张牌，但是你此后需要再使用" + get.cnNumber(uses) + "张牌才可再发动本技能。")
				.set("ai", () => {
					return _status.event.choice;
				})
				.set(
					"choice",
					(function () {
						// var cards = player.getCards("hs", card => get.name(card, player) !== "sha" && player.hasValueTarget(card));
						// var damage = Math.min(player.getCardUsable({ name: "sha" }), player.countCards("hs", "sha")) + cards.filter(i => get.tag(i, "damage")).length;
						// if (player.isPhaseUsing() || player.hp + player.hujia + player.countCards("hs", card => get.tag(card, "recover")) > 2) {
						// 	if (damage) {
						// 		return Math.min(choices.length - 1, cards.length - damage);
						// 	}
						// 	return Math.min(choices.length - 1, cards.length - 1);
						// }
						return choices.length - 1;
					})()
				);
			"step 1";
			if (result.control != "cancel2") {
				player.logSkill("sgsxjxfzmnl_dccaixia");
				var num = result.index + 1;
				var numx = game.countGroup();
				player.draw(num);
				player.addMark("sgsxjxfzmnl_dccaixia_clear", numx, false);
				player.addSkill("sgsxjxfzmnl_dccaixia_clear");
			}
		},
		mod: {
			aiOrder(player, card, num) {
				if (!get.tag(card, "damage")) {
					return;
				}
				if (player.countMark("sgsxjxfzmnl_dccaixia_clear") > 1) {
					return num / 3;
				}
				return num + 6;
			},
		},
		subSkill: {
			clear: {
				trigger: { player: "useCard1" },
				filter(event, player) {
					return player.hasMark("sgsxjxfzmnl_dccaixia_clear");
				},
				forced: true,
				popup: false,
				charlotte: true,
				content() {
					player.removeMark("sgsxjxfzmnl_dccaixia_clear", 1, false);
				},
				intro: {
					name: "才瑕",
					name2: "瑕",
					content: "距离刷新技能还需使用&张牌",
				},
			},
		},
	},


	//神张角
	sgsxjxfzmnl_yizhao: {
		audio: 'yizhao',
		trigger: {
			player: ["useCard", "respond"],
		},
		forced: true,
		filter(event, player) {
			const number = get.number(event.card);
			return typeof number == "number" && number > 0;
		},
		marktext: "黄",
		intro: {
			name: "黄(异兆/肆军)",
			name2: "黄",
			content: "mark",
			markcount(storage, player) {
				return (player.storage.yizhao || 0).toString().slice(-2);
			},
		},
		content() {
			"step 0";
			event.num = player.countMark("yizhao");
			player.addMark("yizhao", get.number(trigger.card));
			"step 1";
			var num = Math.floor(num / 10) % 10,
				num2 = Math.floor(player.countMark("yizhao") / 10) % 10;
			if (num != num2) {
				var card = get.cardPile(card => {
					return get.number(card, false) == num2;
				});
				if (card) {
					player.gain(card, "gain2");
				}
			}
		},
		mod: {
			aiOrder(player, card, num) {
				if (Math.floor((get.number(card) + (player.countMark("yizhao") % 10)) / 10) == 1) {
					return num + 10;
				}
			},
		},
		ai: {
			threaten: 1.5,
			effect: {
				target_use(card, player, target, current) {
					if (get.type(card) == "equip" && !get.cardtag(card, "gifts")) {
						return [1, 0.1];
					}
				},
			},
		},
	},
	sgsxjxfzmnl_sijun: {
		audio: 'sijun',
		trigger: { player: "phaseZhunbeiBegin" },
		filter(event, player) {
			return player.countMark("yizhao") > ui.cardPile.childNodes.length;
		},
		check(event, player) {
			return ui.cardPile.childNodes.length;
		},
		content() {
			"step 0";
			player.removeMark("yizhao", player.countMark("yizhao"));
			game.washCard();
			"step 1";
			var pile = Array.from(ui.cardPile.childNodes);
			if (pile.length < 3) {
				return;
			}
			var bool = false,
				max = Math.pow(2, Math.min(100, pile.length)),
				index;
			for (var i = 0; i < max; i++) {
				var num = 0;
				index = i.toString(2);
				while (index.length < pile.length) {
					index = "0" + index;
				}
				for (var k = 0; k < index.length; k++) {
					if (index[k] == "1") {
						num += get.number(pile[k]);
					}
					if (num > 36) {
						break;
					}
				}
				if (num == 36) {
					bool = true;
					break;
				}
			}
			if (bool) {
				var cards = [];
				for (var k = 0; k < index.length; k++) {
					if (index[k] == "1") {
						cards.push(pile[k]);
					}
				}
				player.gain(cards, "gain2");
			}
			'step 2'
			game.washCard();

		},
		ai: {
			combo: "yizhao",
		},
	},
	sgsxjxfzmnl_sanshou: {
		audio: 'sanshou',
		trigger: { player: "damageBegin4" },
		check(event, player) {
			return get.damageEffect(player, event.source, player, event.nature) <= 0;
		},
		content() {
			"step 0";
			var cards = game.cardsGotoOrdering(get.cards(3)).cards;
			event.cards = cards;
			player.showCards(cards, get.translation(player) + "发动了【三首】");
			"step 1";
			var types = [];
			types.addArray(game.getGlobalHistory("useCard").map(evt => get.name(evt.card)));
			if (cards.filter(card => !types.includes(get.name(card))).length) {
				trigger.cancel();
			}
			game.delayx();
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (card.name == "shandian" || card.name == "fulei") {
						return [0, 0.1];
					}
					if (!get.tag(card, "damage")) {
						return;
					}
					var types = [],
						bool = 0;
					types.addArray(game.getGlobalHistory("useCard").map(evt => get.type2(evt.card)));
					if (!types.includes(get.type2(card))) {
						bool = 1;
					}
					if (types.length < 2) {
						return Math.min(1, 0.4 + (types.length + bool) * 0.2);
					}
				},
			},
		},
	},
	sgsxjxfzmnl_tianjie: {
		audio: 'tianjie',
		trigger: { global: "phaseEnd" },
		direct: true,
		filter(event, player) {
			return game.hasGlobalHistory("cardMove", evt => evt.washCard) && game.hasPlayer(current => current != player);
		},
		skillAnimation: true,
		animationColor: "metal",
		content() {
			"step 0";
			player.chooseTarget(get.prompt("tianjie"), "选择任意名其他角色，依次对这些角色造成X点雷电伤害（X为其手牌中【闪】的数量，至少为1）", [1, Infinity], lib.filter.notMe).set("ai", target => {
				var player = _status.event.player;
				return get.damageEffect(target, player, player, "thunder") * Math.sqrt(Math.max(1, target.countCards("h", "shan")));
			});
			"step 1";
			if (result.bool) {
				var targets = result.targets;
				targets.sortBySeat();
				player.logSkill("tianjie", targets);
				for (var target of targets) {
					var num = Math.max(1, target.countCards("h", "shan"));
					target.damage(num, "thunder");
				}
			}
		},
	},

	//戏志才
	sgsxjxfzmnl_xianfu: {
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		locked: true,
		filter(event, player) {
			return game.hasPlayer(current => current != player) && (event.name != "phase" || game.phaseNumber == 0);
		},
		audio: 'xianfu',
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget("请选择【先辅】的目标", lib.translate.sgsxjxfzmnl_xianfu_info, true, function (card, player, target) {
					return target != player && (!player.storage.xianfu2 || !player.storage.xianfu2.includes(target));
				})
				.set("ai", function (target) {
					let att = get.attitude(_status.event.player, target);
					if (att > 0) {
						return att + 1;
					}
					if (att == 0) {
						return Math.random();
					}
					return att;
				})
				.set("animate", false)
				.forResult();
		},
		logAudio: () => 2,
		logLine: false,
		async content(event, trigger, player) {
			let [target] = event.targets;
			player.storage.xianfu2 ??= [];
			player.storage.xianfu2.push(target);
			player.addSkill("sgsxjxfzmnl_xianfu2");
			const func = (player, target) => {
				target.storage.xianfu_mark ??= [];
				target.storage.xianfu_mark.add(player);
				target.storage.xianfu_mark.sortBySeat();
				target.markSkill("xianfu_mark", null, null, true);
			};
			if (event.isMine()) {
				func(player, target);
			} else if (player.isOnline2()) {
				player.send(func, player, target);
			}
		},
		group:'sgsxjxfzmnl_xianfu_use',
		subSkill:{
			use:{
				trigger:{
					player:["useCardToTarget"],
				},
				filter(event,player){
					if(player.storage.xianfu2?.includes(event.target)){
						return get.type(event.card)=='basic'
					}
				},
				content(){
					trigger.extraDamage++;
				},
			}
		}
	},
	sgsxjxfzmnl_xianfu2: {
		audio: "xianfu",
		charlotte: true,
		trigger: { global: ["damageEnd", "recoverEnd"] },
		forced: true,
		sourceSkill: "sgsxjxfzmnl_xianfu",
		filter(event, player) {
			if (event.player.isDead() || !player.storage.xianfu2 || !player.storage.xianfu2.includes(event.player) || event.num <= 0) {
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
			if (!target.storage.xianfu_mark) {
				target.storage.xianfu_mark = [];
			}
			target.storage.xianfu_mark.add(player);
			target.storage.xianfu_mark.sortBySeat();
			target.markSkill("xianfu_mark");
			game.delayx();
			"step 1";
			player[trigger.name](trigger.num, "nosource");
		},
		onremove(player) {
			if (!player.storage.xianfu2) {
				return;
			}
			game.countPlayer(function (current) {
				if (player.storage.xianfu2.includes(current) && current.storage.xianfu_mark) {
					current.storage.xianfu_mark.remove(player);
					if (!current.storage.xianfu_mark.length) {
						current.unmarkSkill("xianfu_mark");
					} else {
						current.markSkill("xianfu_mark");
					}
				}
			});
			delete player.storage.xianfu2;
		},
		group: "sgsxjxfzmnl_xianfu3",
	},
	sgsxjxfzmnl_xianfu3: {
		trigger: { global: "dieBegin" },
		silent: true,
		sourceSkill: "sgsxjxfzmnl_xianfu",
		filter(event, player) {
			return event.player == player || (player.storage.xianfu2 && player.storage.xianfu2.includes(event.player));
		},
		content() {
			if (player == trigger.player) {
				lib.skill.sgsxjxfzmnl_xianfu2.onremove(player);
			} else {
				player.storage.xianfu2.remove(event.player);
			}
		},
	},
	sgsxjxfzmnl_chouce: {
		audio: 'chouce',
		trigger: { player: "damageEnd" },
		getIndex: event => event.num,
		filter(event) {
			return event.num > 0;
		},
		async content(event, trigger, player) {
			const result = await player.judge().forResult();
			const color = result?.color;
			let result2;
			switch (color) {
				case "black":
					if (game.hasPlayer(current => current.countDiscardableCards(player, "hej"))) {
						result2 = await player
							.chooseTarget(
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
							})
							.forResult();
					}
					break;

				case "red": {
					const next = player.chooseTarget("令一名角色摸一张牌");
					if (player.storage.xianfu2?.length) {
						next.set("prompt2", "（若目标为" + get.translation(player.storage.xianfu2) + "则改为摸两张牌）");
					}
					next.set("ai", target => {
						const player = get.player();
						let att = get.attitude(player, target) / Math.sqrt(1 + target.countCards("h"));
						if (target.hasSkillTag("nogain")) {
							att /= 10;
						}
						if (player.storage.xianfu2?.includes(target)) {
							return att * 2;
						}
						return att;
					});
					result2 = await next.forResult();
					break;
				}

				default:
					break;
			}
			if (result2?.bool && result2?.targets?.length) {
				const target = result2.targets[0];
				player.line(target, "green");
				if (color == "black") {
					if (target.countDiscardableCards(player, "hej")) {
						var resultx = await player.discardPlayerCard(target, "hej", true).forResult();
						if(resultx){
							if(resultx.cards)await player.gain(resultx.cards)
						}
					}
				} else {
					if (player.storage.xianfu2?.includes(target)) {
						target.storage.xianfu_mark ??= [];
						target.storage.xianfu_mark.add(player);
						target.storage.xianfu_mark.sortBySeat();
						target.markSkill("xianfu_mark");
						await target.recover();
						await target.draw(2);
					} else {
						await target.draw();
					}
				}
			}
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
						if (target.hp >= 4) {
							return [1, get.tag(card, "damage") * 1.5];
						}
						if (target.hp == 3) {
							return [1, get.tag(card, "damage") * 1];
						}
						if (target.hp == 2) {
							return [1, get.tag(card, "damage") * 0.5];
						}
					}
				},
			},
		},
	},


	//诸葛亮
	sgsxjxfzmnl_sbhuoji: {
		audio: 'sbhuoji',
		dutySkill: true,
		derivation: ["sgsxjxfzmnl_sbguanxing", "sgsxjxfzmnl_sbkongcheng"],
		group: ["sgsxjxfzmnl_sbhuoji_fire", "sgsxjxfzmnl_sbhuoji_achieve", "sgsxjxfzmnl_sbhuoji_fail", "sgsxjxfzmnl_sbhuoji_mark"],
		subSkill: {
			fire: {
				audio: "sbhuoji1.mp3",
				enable: "phaseUse",
				filterTarget: lib.filter.notMe,
				prompt: "选择一名其他角色，对其与其势力相同的所有其他角色各造成1点火属性伤害",
				usable: 1,
				line: "fire",
				content() {
					"step 0";
					target.damage("fire");
					"step 1";
					var targets = game.filterPlayer(current => {
						if (current == player || current == target) {
							return false;
						}
						return current.group == target.group;
					});
					if (targets.length) {
						game.delayx();
						player.line(targets, "fire");
						targets.forEach(i => i.damage("fire"));
					}
				},
				ai: {
					order: 7,
					fireAttack: true,
					result: {
						target(player, target) {
							var att = get.attitude(player, target);
							return (
								get.sgn(att) *
								game
									.filterPlayer(current => {
										if (current == player) {
											return false;
										}
										return current.group == target.group;
									})
									.reduce((num, current) => num + get.damageEffect(current, player, player, "fire"), 0)
							);
						},
					},
				},
			},
			achieve: {
				audio: "sbhuoji2.mp3",
				trigger: { player: "phaseZhunbeiBegin" },
				filter(event, player) {
					return player.getAllHistory("sourceDamage", evt => evt.hasNature("fire") && evt.player != player).reduce((num, evt) => num + evt.num, 0) >= game.players.length + game.dead.length;
				},
				forced: true,
				locked: false,
				skillAnimation: true,
				animationColor: "fire",
				async content(event, trigger, player) {
					player.awakenSkill("sgsxjxfzmnl_sbhuoji_achieve");
					player.awakenSkill("sgsxjxfzmnl_sbhuoji_fail");
					game.log(player, "成功完成使命");
					player.changeSkin("sgsxjxfzmnl_sbhuoji", "sgsxjxfzmnl_sb_zhugeliang");
					player.changeSkills(["sgsxjxfzmnl_sbguanxing", "sgsxjxfzmnl_sbkongcheng"]);
				},
			},
			fail: {
				audio: "sbhuoji3.mp3",
				trigger: { player: "dying" },
				forced: true,
				locked: false,
				content() {
					player.awakenSkill("sgsxjxfzmnl_sbhuoji");
					game.log(player, "使命失败");
				},
			},
			mark: {
				charlotte: true,
				trigger: { source: "damage" },
				filter(event, player) {
					return event.hasNature("fire");
				},
				firstDo: true,
				forced: true,
				popup: false,
				content() {
					player.addTempSkill("sgsxjxfzmnl_sbhuoji_count", {
						player: ["sgsxjxfzmnl_sbhuoji_achieveBegin", "sgsxjxfzmnl_sbhuoji_failBegin"],
					});
					player.storage.sgsxjxfzmnl_sbhuoji_count = player.getAllHistory("sourceDamage", evt => evt.hasNature("fire") && evt.player != player).reduce((num, evt) => num + evt.num, 0);
					player.markSkill("sgsxjxfzmnl_sbhuoji_count");
				},
			},
			count: {
				charlotte: true,
				intro: { content: "本局游戏已造成过#点火属性伤害" },
			},
		},
	},
	sgsxjxfzmnl_sbkanpo: {
		init(player) {
			if (!player.storage.sgsxjxfzmnl_sbkanpo) {
				player.storage.sgsxjxfzmnl_sbkanpo = [get.mode() !== "identity" ? 2 : 4, [], []];
				player.markSkill("sgsxjxfzmnl_sbkanpo");
			}
		},
		audio: 'sbkanpo',
		trigger: { global: "roundStart" },
		filter(event, player) {
			var storage = player.storage.sgsxjxfzmnl_sbkanpo;
			return storage[0] || storage[1].length;
		},
		forced: true,
		locked: false,
		*content(event, map) {
			var player = map.player,
				storage = player.storage.sgsxjxfzmnl_sbkanpo;
			// var sum = storage[0];
			var num = Math.max(4, game.countPlayer())
			var sum = num;
			storage[1] = [];
			player.markSkill("sgsxjxfzmnl_sbkanpo");
			if (!sum) {
				return;
			}
			const list = get.inpileVCardList(info => {
				if (info[2] == "sha" && info[3]) {
					return false;
				}
				// return info[0] != "equip";
				return true;
			});
			const func = () => {
				const event = get.event();
				const controls = [
					link => {
						const evt = get.event();
						if (evt.dialog && evt.dialog.buttons) {
							for (let i = 0; i < evt.dialog.buttons.length; i++) {
								const button = evt.dialog.buttons[i];
								button.classList.remove("selectable");
								button.classList.remove("selected");
								const counterNode = button.querySelector(".caption");
								if (counterNode) {
									counterNode.childNodes[0].innerHTML = ``;
								}
							}
							ui.selected.buttons.length = 0;
							game.check();
						}
						return;
					},
				];
				event.controls = [ui.create.control(controls.concat(["清除选择", "stayleft"]))];
			};
			if (event.isMine()) {
				func();
			} else if (event.isOnline()) {
				event.player.send(func);
			}
			var result = yield player
				.chooseButton(["看破：是否记录至多" + get.cnNumber(sum) + "个牌名？", [list, "vcard"]], [1, sum], false)
				.set("ai", function (button) {
					if (ui.selected.buttons.length >= Math.max(3, game.countPlayer() / 2)) {
						return 0;
					}
					switch (button.link[2]) {
						case "wuxie":
							return 5 + Math.random();
						case "sha":
							return 5 + Math.random();
						case "tao":
							return 4 + Math.random();
						case "jiu":
							return 3 + Math.random();
						case "lebu":
							return 3 + Math.random();
						case "shan":
							return 4.5 + Math.random();
						case "wuzhong":
							return 4 + Math.random();
						case "shunshou":
							return 2.7 + Math.random();
						case "nanman":
							return 2 + Math.random();
						case "wanjian":
							return 1.6 + Math.random();
						default:
							return 1.5 + Math.random();
					}
				})
				.set("filterButton", button => {
					// return !_status.event.names.includes(button.link[2]);
					return true;
				})
				.set("names", storage[2])
				.set("custom", {
					add: {
						confirm(bool) {
							if (bool != true) {
								return;
							}
							const event = get.event().parent;
							if (event.controls) {
								event.controls.forEach(i => i.close());
							}
							if (ui.confirm) {
								ui.confirm.close();
							}
							game.uncheck();
						},
						button() {
							if (ui.selected.buttons.length) {
								return;
							}
							const event = get.event();
							if (event.dialog && event.dialog.buttons) {
								for (let i = 0; i < event.dialog.buttons.length; i++) {
									const button = event.dialog.buttons[i];
									const counterNode = button.querySelector(".caption");
									if (counterNode) {
										counterNode.childNodes[0].innerHTML = ``;
									}
								}
							}
							if (!ui.selected.buttons.length) {
								const evt = event.parent;
								if (evt.controls) {
									evt.controls[0].classList.add("disabled");
								}
							}
						},
					},
					replace: {
						button(button) {
							const event = get.event(),
								sum = event.sum;
							if (!event.isMine()) {
								return;
							}
							if (button.classList.contains("selectable") == false) {
								return;
							}
							if (ui.selected.buttons.length >= sum) {
								return false;
							}
							button.classList.add("selected");
							ui.selected.buttons.push(button);
							let counterNode = button.querySelector(".caption");
							const count = ui.selected.buttons.filter(i => i == button).length;
							if (counterNode) {
								counterNode = counterNode.childNodes[0];
								counterNode.innerHTML = `×${count}`;
							} else {
								counterNode = ui.create.caption(`<span style="font-size:24px; font-family:xinwei; text-shadow:#FFF 0 0 4px, #FFF 0 0 4px, rgba(74,29,1,1) 0 0 3px;">×${count}</span>`, button);
								counterNode.style.right = "5px";
								counterNode.style.bottom = "2px";
							}
							const evt = event.parent;
							if (evt.controls) {
								evt.controls[0].classList.remove("disabled");
							}
							game.check();
						},
					},
				})
				.set("sum", sum);
			if (result.bool) {
				var names = result.links.map(link => link[2]);
				storage[0] -= names.length;
				storage[1] = names;
				storage[2] = names;
			} else {
				storage[2] = [];
			}
			player.markSkill("sgsxjxfzmnl_sbkanpo");
		},
		marktext: "破",
		intro: {
			markcount(storage) {
				return storage[1].length;
			},
			mark(dialog, content, player) {
				const storage = player.getStorage("sgsxjxfzmnl_sbkanpo");
				// const sum = storage[0];
				const names = storage[1];
				// dialog.addText("剩余可记录" + sum + "次牌名");
				if (player.isUnderControl(true) && names.length) {
					dialog.addText("当前记录牌名：");
					dialog.addSmall([names, "vcard"]);
				}
			},
		},
		group: "sgsxjxfzmnl_sbkanpo_kanpo",
		subSkill: {
			kanpo: {
				audio: "sbkanpo",
				trigger: { global: "useCard" },
				filter(event, player) {
					return event.player != player && player.storage.sgsxjxfzmnl_sbkanpo[1].includes(event.card.name);
				},
				prompt2(event, player) {
					return "移除" + get.translation(event.card.name) + "的记录，令" + get.translation(event.card) + "无效";
				},
				check(event, player) {
					var effect = 0;
					if (event.card.name == "wuxie" || event.card.name == "shan") {
						if (get.attitude(player, event.player) < -1) {
							effect = -1;
						}
					} else if (event.targets && event.targets.length) {
						for (var i = 0; i < event.targets.length; i++) {
							effect += get.effect(event.targets[i], event.card, event.player, player);
						}
					}
					if (effect < 0) {
						if (event.card.name == "sha") {
							var target = event.targets[0];
							if (target == player) {
								return !player.countCards("h", "shan");
							} else {
								return target.hp == 1 || (target.countCards("h") <= 2 && target.hp <= 2);
							}
						} else {
							return true;
						}
					}
					return false;
				},
				logTarget: "player",
				content() {
					player.storage.sgsxjxfzmnl_sbkanpo[1].remove(trigger.card.name);
					player.markSkill("sgsxjxfzmnl_sbkanpo");
					trigger.targets.length = 0;
					trigger.all_excluded = true;
					player.draw();
				},
			},
		},
	},
	sgsxjxfzmnl_sbguanxing: {
		audio: 'sbguanxing',
		trigger: { player: ["phaseZhunbeiBegin", "phaseJieshuBegin"] },
		filter(event, player) {
			var bool = player.hasCard(card => card.hasGaintag("sbguanxing"), "s");
			if (event.name == "phaseZhunbei") {
				// return bool || 7 - lib.skill.sgsxjxfzmnl_sbguanxing.getNum * player.countMark("sgsxjxfzmnl_sbguanxingx") > 0;
				return true;
			}
			return bool //&& player.hasSkill("sgsxjxfzmnl_sbguanxing_on");
		},
		forced: true,
		locked: false,
		content() {
			"step 0";
			if (trigger.name == "phaseJieshu") {
				event.goto(2);
				return;
			}
			// player.addMark("sgsxjxfzmnl_sbguanxingx", 1, false);
			var cards = player.getCards("s", card => card.hasGaintag("sbguanxing"));
			if (cards.length) {
				player.loseToDiscardpile(cards);
			}
			event.num = Math.max(4,game.countPlayer());
			// var num = player.countMark("sgsxjxfzmnl_sbguanxingx") - 1;
			// event.num = Math.max(0, 7 - lib.skill.sgsxjxfzmnl_sbguanxing.getNum * num);
			"step 1";
			if (num) {
				var cards2 = get.cards(num);
				player.$gain2(cards2, false);
				game.log(player, "将", cards2, "置于了武将牌上");
				player.loseToSpecial(cards2, "sbguanxing").visible = true;
				player.markSkill("sbguanxing");
			}
			"step 2";
			var cards = player.getCards("s", card => card.hasGaintag("sbguanxing"));
			if (cards.length) {
				player
					.chooseToMove("allowChooseAll")
					.set("list", [["你的“星”", cards], ["牌堆顶"]])
					.set("prompt", "观星：点击或拖动将牌移动到牌堆顶")
					.set("processAI", function (list) {
						var cards = list[0][1].slice(),
							player = _status.event.player;
						var name = _status.event.getTrigger().name;
						var target = name == "phaseZhunbei" ? player : player.getNext();
						var judges = target.getCards("j");
						var top = [],
							att = get.sgn(get.attitude(player, target));
						if (judges.length && att != 0 && (target != player || !player.hasWuxie())) {
							for (var i = 0; i < judges.length; i++) {
								var judge = (card, num) => get.judge(card) * num;
								cards.sort((a, b) => judge(b, att) - judge(a, att));
								if (judge(cards[0], att) < 0) {
									break;
								} else {
									top.unshift(cards.shift());
								}
							}
						}
						return [cards, top];
					})
					.set("filterOk", function (moved) {
						return moved[1].length;
					});
			} else {
				event._result = { bool: false };
			}
			"step 3";
			if (result.bool) {
				var cards = result.moved[1];
				player.loseToDiscardpile(cards, ui.cardPile, "insert").log = false;
				game.log(player, "将", cards, "置于了牌堆顶");
			} else if (trigger.name == "phaseZhunbei") {
				player.addTempSkill("sgsxjxfzmnl_sbguanxing_on");
			}
		},
		// getNum: 3,
		group: "sgsxjxfzmnl_sbguanxing_unmark",
		subSkill: {
			on: { charlotte: true },
			unmark: {
				trigger: { player: "loseAfter" },
				filter(event, player) {
					if (!event.ss || !event.ss.length) {
						return false;
					}
					return !player.countCards("s", card => card.hasGaintag("sbguanxing"));
				},
				charlotte: true,
				forced: true,
				silent: true,
				content() {
					player.unmarkSkill("sbguanxing");
				},
			},
		},
		marktext: "星",
		intro: {
			mark(dialog, storage, player) {
				var cards = player.getCards("s", card => card.hasGaintag("sbguanxing"));
				if (!cards || !cards.length) {
					return;
				}
				dialog.addAuto(cards);
			},
			markcount(storage, player) {
				return player.countCards("s", card => card.hasGaintag("sbguanxing"));
			},
			onunmark(storage, player) {
				var cards = player.getCards("s", card => card.hasGaintag("sbguanxing"));
				if (cards.length) {
					player.loseToDiscardpile(cards);
				}
			},
		},
		mod: {
			aiOrder(player, card, num) {
				var cards = player.getCards("s", card => card.hasGaintag("sbguanxing"));
				if (get.itemtype(card) == "card" && card.hasGaintag("sbguanxing")) {
					return num + (cards.length > 1 ? 0.5 : -0.0001);
				}
			},
		},
	},
	sgsxjxfzmnl_sbkongcheng: {
		audio: 'sbkongcheng',
		trigger: { player: ["damageBegin4"] },
		filter(event, player, name) {
			if (!player.hasSkill("sgsxjxfzmnl_sbguanxing") && !player.hasSkill("jdguanxing") && !player.hasSkill("sbguanxing")) {
				return false;
			}
			const num = player.countCards("s", card => card.hasGaintag("sbguanxing"));
			if (name == "damageBegin3" && !num) {
				return true;
			}
			if (name == "damageBegin4" && num) {
				return true;
			}
			return false;
		},
		// forced: true,
		content() {
			"step 0";
			var num = player.countCards("s", card => card.hasGaintag("sbguanxing"));
			if (!num && event.triggername == "damageBegin3") {
				trigger.increase("num");
			} else if (num && event.triggername == "damageBegin4") {
				player
					.judge(function (result) {
						if (get.number(result) <= get.player().countCards("s", card => card.hasGaintag("sbguanxing"))) {
							return 2;
						}
						return -1;
					})
					.set("judge2", result => result.bool)
					.set("callback", function () {
						if (event.judgeResult.number <= player.countCards("s", card => card.hasGaintag("sbguanxing"))) {
							event.getParent("sgsxjxfzmnl_sbkongcheng").getTrigger().decrease("num");
						}
					});
			}
		},
		ai: {
			combo: "sgsxjxfzmnl_sbguanxing",
		},
	},


	//清河公主
	sgsxjxfzmnl_dczhangji: {
		audio: 'dczhangji',
		trigger: { global: "useCardToTargeted" },
		filter(event, player) {
			if (!event.targets || event.targets.length <= 1) {
				return false;
			}
			if (event.targets.length != event.getParent().triggeredTargets4.length) {
				return false;
			}
			return event.targets.includes(player);
		},
		forced: true,
		logTarget: "player",
		async content(event, trigger, player) {
			const evtx = trigger.getParent();
			trigger.targets = [player, ...trigger.targets.remove(player)];
			evtx.targets = [player, ...evtx.targets.remove(player)];
			evtx.triggeredTargets4 = [player, ...evtx.triggeredTargets4.remove(player)];
			await player.draw(evtx.targets.length);
		},
	},
	sgsxjxfzmnl_dczengou: {
		audio: 'dczengou',
		enable: "phaseUse",
		filter(event, player) {
			return player.maxHp > 0 && player.countCards("he") > 0;
		},
		filterCard: true,
		selectCard: () => [1, _status.event.player.maxHp],
		position: "he",
		filterTarget: lib.filter.notMe,
		discard: false,
		lose: false,
		delay: false,
		usable: 1,
		check(card) {
			if (card.name == "tao" || card.name == "jiu") {
				return 0;
			}
			return 1 / (get.value(card) || 0.5);
		},
		async content(event, trigger, player) {
			const next = player.give(event.cards, event.target);
			next.gaintag.add("sgsxjxfzmnl_dczengou_debuff");
			await next;
			await player.draw(event.cards.length);
			event.target.addSkill("sgsxjxfzmnl_dczengou_debuff");
			event.target.addSkill("sgsxjxfzmnl_dczengou_debuff2");
		},
		ai: {
			order: 10,
			result: { target: -1 },
		},
		subSkill: {
			debuff: {
				charlotte: true,
				mark: true,
				intro: {
					content: "下次体力值增加或使用牌结算完毕后展示所有手牌，然后失去手牌中“谮构”牌数的体力值",
				},
				trigger: { player: ["changeHp", "useCardAfter"] },
				filter(event, player) {
					return event.name == "useCard" || event.num > 0;
				},
				forced: true,
				popup: false,
				async content(event, trigger, player) {
					await player.showHandcards();
					const cards = player.getCards("h", card => card.hasGaintag(event.name));
					player.removeSkill(event.name);
					if (cards.length) {
						await player.loseHp(cards.length);
					}
				},
				// onremove(player, skill) {
				// 	player.removeGaintag(skill);
				// },
				mod: {
					aiValue(player, card, num) {
						if (get.itemtype(card) == "card" && card.hasGaintag("sgsxjxfzmnl_dczengou_debuff")) {
							return -1;
						}
					},
					aiUseful() {
						return lib.skill.sgsxjxfzmnl_dczengou.subSkill.debuff.mod.aiValue.apply(this, arguments);
					},
					aiOrder(player, card, num) {
						if (get.itemtype(card) == "card" && card.hasGaintag("sgsxjxfzmnl_dczengou_debuff")) {
							const cards = player.getCards("h", card => card.hasGaintag("sgsxjxfzmnl_dczengou_debuff"));
							if (cards.length == 1) {
								return num + 10;
							}
							return 0;
						}
					},
				},
			},
			debuff2:{
				charlotte: true,
				mod:{
					cardDiscardable(card, player) {
						if (card.hasGaintag("sgsxjxfzmnl_dczengou_debuff")) {
							return false;
						}
					},
					cardEnabled(card, player) {
						if (card.hasGaintag("sgsxjxfzmnl_dczengou_debuff")) {
							var hs = player.getCards("h"),
								cards = [card];
							if (Array.isArray(card.cards)) {
								cards.addArray(card.cards);
							}
							for (var i of cards) {
								if (hs.includes(i)) {
									return false;
								}
							}
						}
					},
					cardRespondable(card, player) {
						if (card.hasGaintag("sgsxjxfzmnl_dczengou_debuff")) {
							var hs = player.getCards("h"),
								cards = [card];
							if (Array.isArray(card.cards)) {
								cards.addArray(card.cards);
							}
							for (var i of cards) {
								if (hs.includes(i)) {
									return false;
								}
							}
						}
					},
					cardSavable(card, player) {
						if (card.hasGaintag("sgsxjxfzmnl_dczengou_debuff")) {
							var hs = player.getCards("h"),
								cards = [card];
							if (Array.isArray(card.cards)) {
								cards.addArray(card.cards);
							}
							for (var i of cards) {
								if (hs.includes(i)) {
									return false;
								}
							}
						}
					},
					
				},
			},
		},
	},


	//卞喜
	sgsxjxfzmnl_dunxi: {
		audio: 'dunxi',
		trigger: { player: "useCard" },
		direct: true,
		filter(event, player) {
			// if (!get.tag(event.card, "damage")) {
			// 	return false;
			// }
			// return event.targets.some(target => target != player && target.isIn());
			return true;
		},
		content() {
			"step 0";
			// var targets = trigger.targets.filter(function (current) {
			// 	return current != player && current.isIn();
			// });
			var targets = game.filterPlayer(function (current) {
				return current != player && current.isIn()
			})
			if (targets.length == 1) {
				event.target = targets[0];
				player
					.chooseBool(get.prompt("sgsxjxfzmnl_dunxi", event.target), "令" + get.translation(event.target) + "获得一枚“钝”标记")
					.set("goon", get.attitude(player, event.target) < 0)
					.set("ai", () => _status.event.goon);
			} else {
				player
					.chooseTarget(get.prompt("sgsxjxfzmnl_dunxi"), "选择一名目标角色获得一枚“钝”标记", function (card, player, target) {
						return target != player ;
					})
					.set("ai", function (target) {
						var att = get.attitude(_status.event.player, target);
						if (att >= 0) {
							return 0;
						}
						return -att / (1 + target.hasMark("sgsxjxfzmnl_dunxi"));
					});
			}
			"step 1";
			if (result.bool) {
				var target = event.target || result.targets[0];
				player.logSkill("sgsxjxfzmnl_dunxi", target);
				target.addMark("sgsxjxfzmnl_dunxi", 1);
				game.delayx();
			}
		},
		intro: { content: "mark", name2: "钝" },
		group: "sgsxjxfzmnl_dunxi_random",
		global: "sgsxjxfzmnl_dunxi_lose",
		subSkill: {
			random: {
				audio: "dunxi",
				trigger: { global: "useCard" },
				forced: true,
				locked: false,
				filter(event, player) {
					if (!event.player.hasMark("sgsxjxfzmnl_dunxi") || !event.targets.length|| event._dunxi /*|| _status.dying.length*/) {
						return false;
					}
					return true;
					// var type = get.type2(event.card, false);
					// return type == "basic" || type == "trick";
				},
				logTarget: "player",
				line: "fire",
				async content(event, trigger, player) {
					trigger._dunxi = true;
					// trigger.player.removeMark("sgsxjxfzmnl_dunxi", 1);
					const target = player;
					// trigger.targets.remove(target);
					trigger.targets=[];
					await game.delayx();
					let list;
					if (get.type(trigger.card) != "delay") {
						list = game.filterPlayer(function (current) {
							return lib.filter.targetEnabled2(trigger.card, trigger.player, current);
						});
					} else {
						list = game.filterPlayer(function (current) {
							return lib.filter.judge(trigger.card, trigger.player, current);
						});
					}
					if (list.length) {
						const targetx = list.randomGet();
						trigger.targets.push(targetx);
						trigger.player.line(targetx, "fire");
						game.log(trigger.card, "的目标被改为", targetx);
						if (targetx != target) {
							await trigger.player.loseHp();
						}
						else {
							await player.draw();
						}
						const evt = trigger.getParent("phaseUse");
						if (evt && evt.player == trigger.player) {
							evt.skipped = true;
						}
					}
				},
			},
			lose:{
				trigger:{
					player: "phaseEnd"
				},
				forced:true,
				filter(event, player) {
					return player.hasMark("sgsxjxfzmnl_dunxi");
				},
				content() {
					player.removeMark("sgsxjxfzmnl_dunxi", 1);
				},
			},
		},
	},

	//比原版更令人难以吐槽的神孙权
	sgsxjxfzmnl_junkyuheng: {
		audio: "yuheng",
		trigger: { player: "phaseBegin" },
		forced: true,
		keepSkill: true,
		filter(event, player) {
			return player.hasCard(function (card) {
				return lib.filter.cardDiscardable(card, player, "sgsxjxfzmnl_junkyuheng");
			}, "he");
		},
		async content(event,trigger,player) {
			const num = player.getCards("he").reduce((arr, card) => arr.add(get.suit(card, player)), []).length;
			var result = await player
				.chooseToDiscard("he", true, [1, num], function (card, player) {
					if (!ui.selected.cards.length) {
						return true;
					}
					var suit = get.suit(card, player);
					for (var i of ui.selected.cards) {
						if (get.suit(i, player) == suit) {
							return false;
						}
					}
					return true;
				})
				.set("complexCard", true)
				.set("ai", function (card) {
					if (!player.hasValueTarget(card)) {
						return 5;
					}
					return 5 - get.value(card);
				}).forResult();
			if (result.cards) {
				// var skills = lib.skill.sgsxjxfzmnl_junkyuheng.derivation.randomGets(result.cards.length);
				// player.addAdditionalSkills("sgsxjxfzmnl_junkyuheng", skills, true);
				var result2 = await player.YB_fuhan(['wu',game.countPlayer(),result.cards.length,,,]).forResult();
				// console.log(result2)
				if(result2.skills){
					if(!player.storage.sgsxjxfzmnl_junkyuheng)player.storage.sgsxjxfzmnl_junkyuheng=[];
					player.storage.sgsxjxfzmnl_junkyuheng.addArray(result2.skills);
				}
			}
		},
		group: "sgsxjxfzmnl_junkyuheng_remove",
		// derivation: ["olbingyi", "shenxing", "xiashu", "old_anxu", "rezhiheng", "xinanguo", "lanjiang", "xinfu_guanwei", "dimeng", "xindiaodu", "xingxue", "jiexun", "olhongyuan", "xinfu_youdi", "bizheng"],
		subSkill: {
			remove: {
				audio: "yuheng",
				trigger: { player: "phaseEnd" },
				forced: true,
				filter(event, player) {
					return player.storage.sgsxjxfzmnl_junkyuheng && player.storage.sgsxjxfzmnl_junkyuheng.length > 0;
					// return player.additionalSkills.sgsxjxfzmnl_junkyuheng && player.additionalSkills.sgsxjxfzmnl_junkyuheng.length > 0;
				},
				async content(event, trigger, player) {
					const num = player.storage.sgsxjxfzmnl_junkyuheng.length;
					await player.removeSkill(player.storage.sgsxjxfzmnl_junkyuheng);
					delete player.storage.sgsxjxfzmnl_junkyuheng;
					// const skillslength = player.additionalSkills.sgsxjxfzmnl_junkyuheng.length;
					// await player.removeAdditionalSkills("sgsxjxfzmnl_junkyuheng");
					await player.draw(num*2);
				},
			},
		},
	},
	sgsxjxfzmnl_junkdili: {
		audio: "dili",
		trigger: { player: "changeSkillsAfter" },
		forced: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: "wood",
		filter(event, player) {
			// console.log(1)
			if (!event.addSkill.length) {
				return false;
			}
			var skills = player.getSkills(null, false, false).filter(function (i) {
				var info = get.info(i);
				return info && !info.charlotte;
			});
			return skills.length > game.countGroup();
		},
		content() {
			"step 0";
			player.awakenSkill(event.name);
			player.gainMaxHp();
			"step 1";
			// var skills = player.getSkills(null, false, false).filter(function (i) {
			// 	if (i == "sgsxjxfzmnl_junkdili") {
			// 		return false;
			// 	}
			// 	var info = get.info(i);
			// 	return info && !info.charlotte;
			// });
			// var next = player.chooseButton(["请选择失去任意个技能", [skills, "skill"]]);
			// next.set("forced", true);
			// next.set("selectButton", [1, skills.length]);
			// next.set("ai", function (button) {
			// 	var skill = button.link,
			// 		skills = _status.event.skills.slice(0);
			// 	skills.removeArray(["xinanguo", "lanjiang", "rezhiheng", "sgsxjxfzmnl_junkyuheng"]);
			// 	switch (ui.selected.buttons.length) {
			// 		case 0:
			// 			if (skills.includes(skill)) {
			// 				return 2;
			// 			}
			// 			if (skill == "sgsxjxfzmnl_junkyuheng") {
			// 				return 1;
			// 			}
			// 			return Math.random();
			// 		case 1:
			// 			if (skills.length < 2) {
			// 				return 0;
			// 			}
			// 			if (skills.includes(skill)) {
			// 				return 2;
			// 			}
			// 			if (skill == "sgsxjxfzmnl_junkyuheng") {
			// 				return 1;
			// 			}
			// 			return 0;
			// 		case 2:
			// 			if (skills.includes(skill)) {
			// 				return 2;
			// 			}
			// 			if (skill == "sgsxjxfzmnl_junkyuheng") {
			// 				return 1;
			// 			}
			// 			return 0;
			// 		default:
			// 			return 0;
			// 	}
			// });
			// next.set("skills", skills);
			// "step 2";
			// if (result.bool) {
			// 	var skills = result.links;
			// 	player.removeSkills(skills.slice(0));
			// }
			var list = lib.skill.sgsxjxfzmnl_junkdili.derivation;
			// list = list.slice(0, Math.min(skills.length, list.length));
			player.addSkills(list);
		},
		ai: {
			combo: "sgsxjxfzmnl_junkyuheng",
		},
		derivation: ["sgsxjxfzmnl_junkshengzhi", "sgsxjxfzmnl_junkquandao", "sgsxjxfzmnl_junkchigang"],
	},
	sgsxjxfzmnl_junkshengzhi: {
		audio: "dili_shengzhi",
		trigger: { player: ["logSkill", "useSkillAfter"] },
		forced: true,
		filter(event, player) {
			if (event.type != "player") {
				return false;
			}
			var skill = get.sourceSkillFor(event);
			if (get.is.locked(skill)) {
				return false;
			}
			var info = get.info(skill);
			return !info.charlotte;
		},
		content() {
			player.addTempSkill("sgsxjxfzmnl_junkshengzhi_effect");
		},
		subSkill: {
			effect: {
				mod: {
					cardUsable: () => Infinity,
					targetInRange: () => true,
				},
				trigger: { player: "useCard1" },
				forced: true,
				charlotte: true,
				popup: false,
				firstDo: true,
				content() {
					// player.removeSkill(event.name);
					if (trigger.addCount !== false) {
						trigger.addCount = false;
						const stat = player.getStat().card,
							name = trigger.card.name;
						if (typeof stat[name] == "number") {
							stat[name]--;
						}
					}
				},
				mark: true,
				intro: { content: "本回合使用牌无距离和次数限制" },
			},
		},
	},
	sgsxjxfzmnl_junkquandao: {
		audio: "dili_quandao",
		trigger: { player: "useCard" },
		forced: true,
		filter(event, player) {
			return get.type(event.card, null, false) == "basic" || get.type(event.card, null, false) == "trick";
		},
		async content(event, trigger, player) {
			const cards1 = player.getCards("h", card => get.type(card) === "basic"),
				cards2 = player.getCards("h", card => get.type(card) === "trick");
			if (cards1.length !== cards2.length) {
				const num = cards1.length - cards2.length,
					cards = num > 0 ? cards1 : cards2;
				let i = 0;
				cards.forEach(card => {
					if (i < Math.abs(num) && lib.filter.cardDiscardable(card, player, "sgsxjxfzmnl_junkquandao")) {
						i++;
					}
				});
				if (i > 0) {
					await player.chooseToDiscard(i, true, `权道：请弃置${get.cnNumber(i)}张${num > 0 ? "基本牌" : "普通锦囊牌"}`, num > 0 ? card => get.type(card) === "basic" : card => get.type(card) === "trick");
				}
			}
			await player.draw();
		},
	},
	sgsxjxfzmnl_junkchigang: {
		audio: "dili_chigang",
		trigger: { player: "phaseChange" },
		forced: true,
		zhuanhuanji: true,
		mark: true,
		marktext: "☯",
		filter(event, player) {
			return event.phaseList[event.num].indexOf("phaseJudge") != -1;
		},
		content() {
			player.changeZhuanhuanji(event.name);
			let phase = player.storage.sgsxjxfzmnl_junkchigang ? "phaseDraw" : "phaseUse";
			trigger.phaseList[trigger.num] = `${phase}|${event.name}`;
			game.delayx();
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (get.type(card) == "delay") {
						return "zeroplayertarget";
					}
				},
			},
		},
		intro: {
			content(storage) {
				return "转换技，锁定技。判定阶段开始前，你取消此阶段。然后你获得一个额外的" + (storage ? "出牌阶段" : "摸牌阶段") + "。";
			},
		},
	},


	//潘淑
	sgsxjxfzmnl_weiyi: {
		audio: 'weiyi',
		trigger: { global: "damageEnd" },
		filter(event, player) {
			if (player.getStorage("sgsxjxfzmnl_weiyi_mark").includes(event.player) || !event.player.isIn()) {
				return false;
			}
			return event.player.hp >= player.hp || event.player.isDamaged();
		},
		direct: true,
		content() {
			"step 0";
			var list = [];
			if (trigger.player.hp >= player.hp) {
				list.push("失去体力");
			}
			if (trigger.player.hp <= player.hp && trigger.player.isDamaged()) {
				list.push("回复体力");
			}
			list.push("cancel2");
			player
				.chooseControl(list)
				.set("prompt", get.prompt2("sgsxjxfzmnl_weiyi", trigger.player))
				.set("ai", function () {
					var player = _status.event.player,
						target = _status.event.getTrigger().player;
					var att = get.attitude(player, target),
						eff = get.recoverEffect(target, player, player);
					if (target.hp <= player.hp && target.isDamaged() && att > 2 && eff > 0) {
						if (player == target) {
							var storage = player.getStorage("sgsxjxfzmnl_weiyi_mark");
							if (
								player.hp >= 2 &&
								game.hasPlayer(function (current) {
									return current.hp == player.hp + 1 && !storage.includes(current) && get.attitude(player, current) < 0;
								})
							) {
								return "cancel2";
							}
						}
						return "回复体力";
					}
					if (target.hp >= player.hp && att < -2 && eff < 0) {
						return "失去体力";
					}
					return "cancel2";
				});
			"step 1";
			if (result.control != "cancel2") {
				var target = trigger.player;
				player.logSkill("sgsxjxfzmnl_weiyi", target);
				player.addTempSkill("sgsxjxfzmnl_weiyi_mark");
				player.markAuto("sgsxjxfzmnl_weiyi_mark", [target]);
				target[result.control == "失去体力" ? "loseHp" : "recover"]();
			}
		},
		onremove: true,
		// intro: {
		// 	content: "已令$对汝威服",
		// },
		subSkill:{
			mark:{
				charlotte:true,
				onremove:true,
				intro:{
					content: "已令$对汝威服"
				}
			},
		},
	},
	sgsxjxfzmnl_jinzhi: {
		audio: 'jinzhi',
		enable: ["chooseToUse", "chooseToRespond"],
		hiddenCard(player, name) {
			if (get.type(name) == "basic" && lib.inpile.includes(name) && player.countMark("sgsxjxfzmnl_jinzhi_used") <= player.countCards("he")) {
				return true;
			}
		},
		filter(event, player) {
			if (event.responded || event.jinzhi || player.countMark("sgsxjxfzmnl_jinzhi_used") > player.countCards("he")) {
				return false;
			}
			for (var i of lib.inpile) {
				if (get.type(i) == "basic" && event.filterCard({ name: i, isCard: true }, player, event)) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				var list = [];
				for (var i of lib.inpile) {
					if (get.type(i) == "basic" && event.filterCard({ name: i, isCard: true }, player, event)) {
						list.push(["基本", "", i]);
						if (i == "sha") {
							for (var j of lib.inpile_nature) {
								list.push(["基本", "", "sha", j]);
							}
						}
					}
				}
				return ui.create.dialog("锦织", [list, "vcard"], "hidden");
			},
			check(button) {
				if (_status.event.getParent().type != "phase") {
					return 1;
				}
				if (button.link[2] == "shan") {
					return 3;
				}
				var player = _status.event.player;
				if (button.link[2] == "jiu") {
					if (player.getUseValue({ name: "jiu" }) <= 0) {
						return 0;
					}n
					if (player.countCards("h", "sha")) {
						return player.getUseValue({ name: "jiu" });
					}
				}
				return player.getUseValue({ name: button.link[2], nature: button.link[3] }) / 4;
			},
			backup(links, player) {
				return {
					selectCard: player.countMark("sgsxjxfzmnl_jinzhi_used"),
					filterCard(card, player) {
						if (ui.selected.cards.length) {
							if (get.color(card) != get.color(ui.selected.cards[0])) {
								return false;
							}
						}
						return lib.filter.cardDiscardable.apply(this, arguments);
					},
					complexCard: true,
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						suit: "none",
						number: null,
						isCard: true,
					},
					position: "he",
					ignoreMod: true,
					check(card) {
						var player = _status.event.player,
							color = get.color(card, player);
						if (player.countCards("he", { color: color }) <= player.countMark("sgsxjxfzmnl_jinzhi_used") || (ui.selected.cards.length && get.color(ui.selected.cards[0], player) != color)) {
							return -1;
						}
						if (
							lib.skill.jinzhi_backup.viewAs.name == "jiu" &&
							!player.countCards("h", function (cardx) {
								return card != cardx && !ui.selected.cards.includes(cardx) && get.name(cardx, player) == "sha";
							})
						) {
							return 0;
						}
						return Math.min(0.01, 6 - get.value(card));
					},
					log: false,
					precontent() {
						player.logSkill("sgsxjxfzmnl_jinzhi");
						player.addTempSkill("sgsxjxfzmnl_jinzhi_used", "roundStart");
						player.addMark("sgsxjxfzmnl_jinzhi_used", 1, false);
						var cards = event.result.cards;
						player.discard(cards);
						player.draw();
						event.result.card = {
							name: event.result.card.name,
							nature: event.result.card.nature,
							isCard: true,
						};
						event.result.cards = [];
						if (cards.length > 1) {
							var color = get.color(cards[0], player);
							for (var i = 1; i < cards.length; i++) {
								if (get.color(cards[i], player) != color) {
									var evt = event.getParent();
									evt.set("sgsxjxfzmnl_jinzhi", true);
									evt.goto(0);
									return;
								}
							}
						}
					},
				};
			},
			prompt(links, player) {
				var name = links[0][2];
				var nature = links[0][3];
				return "弃置" + get.cnNumber(player.countMark("sgsxjxfzmnl_jinzhi_used")) + "张颜色相同的牌并摸一张牌，然后视为使用" + (get.translation(nature) || "") + get.translation(name);
			},
		},
		ai: {
			order(item, player) {
				if (_status.event.type == "phase" && !player.countMark("sgsxjxfzmnl_jinzhi_used") && player.getUseValue({ name: "jiu" }, null, true) > 0 && player.countCards("h", "sha")) {
					return get.order({ name: "jiu" }) + 1;
				}
				return 1;
			},
			respondShan: true,
			respondSha: true,
			skillTagFilter(player) {
				if (player.countMark("sgsxjxfzmnl_jinzhi_used") >= player.countCards("he")) {
					return false;
				}
			},
			result: {
				player(player) {
					if (_status.event.dying) {
						return get.attitude(player, _status.event.dying);
					}
					return 1;
				},
			},
		},
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
				intro: { content: "本轮已发动过#次" },
			},
		},
	},

	//郝昭
	sgsxjxfzmnl_drlt_zhengu: {
		audio: 'drlt_zhengu',
		trigger: { player: "phaseJieshuBegin" },
		async cost(event, trigger, player) {
			event.result = await player
				.chooseTarget(get.prompt2(event.skill), function (card, player, target) {
					//if(target.storage.drlt_zhengu_mark&&target.storage.drlt_zhengu_mark.includes(player)) return false;
					return target != player;
				})
				.set("ai", function (target) {
					const player = _status.event.player;
					//if(target.storage.drlt_zhengu_mark&&target.storage.drlt_zhengu_mark.includes(player)) return 0;
					const num = Math.min(5, player.countCards("h")) - target.countCards("h");
					const att = get.attitude(player, target);
					return num * att;
				})
				.forResult();
		},
		async content(event, trigger, player) {
			const target = event.targets[0];
			player.addSkill("sgsxjxfzmnl_drlt_zhengu2");
			target.addSkill("sgsxjxfzmnl_drlt_zhengu_mark");
			const num = player.countCards("h");
			if(!target.storage.sgsxjxfzmnl_drlt_zhengu_mark)target.storage.sgsxjxfzmnl_drlt_zhengu_mark=[];
			if(target.storage.sgsxjxfzmnl_drlt_zhengu_mark.length){
				for(var i of target.storage.sgsxjxfzmnl_drlt_zhengu_mark){
					if(i[0]==player){
						target.storage.sgsxjxfzmnl_drlt_zhengu_mark.remove(i)
					};
				}
			}
			target.storage.sgsxjxfzmnl_drlt_zhengu_mark.push([player,num]);
			target.markSkill("sgsxjxfzmnl_drlt_zhengu_mark");
			lib.skill.sgsxjxfzmnl_drlt_zhengu.sync(player, target,num);
		},
		sync(player, target,num) {
			// const num = num;
			// const num2 = target.countCards("h");
			target.YB_changeHandCard(num);
			// if (num < num2) {
			// 	target.chooseToDiscard(num2 - num, true, "h", "allowChooseAll");
			// } else {
			// 	target.drawTo(num);
			// }
		},
	},
	sgsxjxfzmnl_drlt_zhengu2: {
		audio: "drlt_zhengu",
		trigger: {
			global: "phaseEnd",
		},
		forced: true,
		charlotte: true,
		logTarget: "player",
		sourceSkill: "sgsxjxfzmnl_drlt_zhengu",
		filter(event, player) {
			// if(event.player)console.log(event.player);
			// if(event.player.storage.sgsxjxfzmnl_drlt_zhengu_mark)console.log(event.player.storage.sgsxjxfzmnl_drlt_zhengu_mark);
			// return event.player.storage.sgsxjxfzmnl_drlt_zhengu_mark && Object.keys(event.player.storage.sgsxjxfzmnl_drlt_zhengu_mark).includes(player.playerid);
			if(event.player.storage.sgsxjxfzmnl_drlt_zhengu_mark?.length){
				for(var i of event.player.storage.sgsxjxfzmnl_drlt_zhengu_mark){
					if(i[0]==player)return true;
				}
			}
		},
		async content(event, trigger, player) {
			const num = trigger.player.storage.sgsxjxfzmnl_drlt_zhengu_mark.find(i=>i[0]==player)[1];
			console.log(num);
			if(num>=0){
				lib.skill.sgsxjxfzmnl_drlt_zhengu.sync(player, trigger.player,num);
				var key = trigger.player.storage.sgsxjxfzmnl_drlt_zhengu_mark.find(i=>i[0]==player);
				trigger.player.storage.sgsxjxfzmnl_drlt_zhengu_mark.remove(key);
				if(!trigger.player.storage.sgsxjxfzmnl_drlt_zhengu_mark.length){
					trigger.player.unmarkSkill("sgsxjxfzmnl_drlt_zhengu_mark");
				}

			}
		},
	},
	sgsxjxfzmnl_drlt_zhengu_mark: {
		charlotte: true,
		init(player, skill) {
			if (!player.storage[skill]) {
				player.storage[skill] = [];
			}
		},
		marktext: "镇",
		intro:{
			name:'镇骨',
			content:function(storage,player,skill){
				var str = '';
				if(storage.length){
					for(var i of storage){
						str += get.translation(i[0]) + '：' + i[1] + '<br/>'
					}
				}
				return str;
			}
		},
		// intro: {
		// 	name: "镇骨",
		// 	content: function(storage,player,skill){
		// 		var str = '';
		// 		if(Object.keys(storage).length){
		// 			var keys = Object.keys(storage);
		// 			for(var i=0;i<keys.length;i++){
		// 				str += get.translation(keys[i]) + '：' + storage[keys[i]] + '<br/>'
		// 			}
		// 		}
		// 		return str;
		// 	},
		// },
	},
	//魔曹丕
	sgsxjxfzmnl_cpcuandi: {
		audio: 'songwei',
		zhuSkill: true,
		trigger: { global: "damageSource" },
		filter(event, player) {
			if (player == event.source || !event.source || event.source.group != "wei") {
				return false;
			}
			return player.hasZhuSkill("sgsxjxfzmnl_cpcuandi", event.source);
		},
		// getIndex: event => event.num,
		logTarget: "source",
		async content(event, trigger, player) {
			await player.draw();
		},
	},


	//傅佥
	sgsxjxfzmnl_jueyong: {
		audio: 'jueyong',
		trigger: { target: "useCardToTarget" },
		forced: true,
		filter(event, player) {
			return event.card.name != "jiu" && event.card.name != "tao" && event.targets.length == 1 && event.card.isCard && event.cards.length == 1 && event.getParent(2).name != "jueyong_timeout" && get.position(event.cards[0], true) == "o" && event.card.name == event.cards[0].name && (!player.storage.jueyong || player.storage.jueyong[0].length < player.getHp());
		},
		content() {
			trigger.targets.remove(player);
			trigger.getParent().triggeredTargets2.remove(player);
			trigger.untrigger();
			var card = trigger.cards[0];
			player.addToExpansion(card, "gain2").gaintag.add("jueyong");
			if (!player.storage.jueyong) {
				player.storage.jueyong = [[], []];
			}
			player.storage.jueyong[0].push(card);
			player.storage.jueyong[1].push(trigger.player);
			game.delayx();
		},
		onremove(player, skill) {
			var cards = player.getExpansions('jueyong');
			if (cards.length) {
				player.loseToDiscardpile('jueyong');
			}
			delete player.storage[skill];
		},
		intro: {
			markcount(storage) {
				if (!storage) {
					return 0;
				}
				return storage[0].length;
			},
			mark(dialog, storage, player) {
				if (!storage) {
					return;
				}
				dialog.addAuto(storage[0]);
				dialog.addText(get.translation(storage[1]));
			},
			onunmark(storage, player) {
				player.storage.jueyong = [[], []];
			},
		},
		ai: {
			reverseEquip: true,
			effect: {
				target_use(card, player, target, current) {
					if (get.type(card) == "equip" && !get.tag(card, "gifts") && target.storage.jueyong && target.storage.jueyong[1].length) {
						var result1 = get.equipResult(player, target, card),
							subtype = get.subtype(card);
						for (var i of target.storage.jueyong[0]) {
							if (get.subtype(i, false) == subtype && get.equipResult(target, target, i) >= result1) {
								return "zerotarget";
							}
						}
					}
				},
			},
		},
		group: "jueyong_timeout",
		subSkill: {
			timeout: {
				audio: "jueyong",
				trigger: { player: "phaseJieshuBegin" },
				forced: true,
				filter(event, player) {
					return player.storage.jueyong && player.storage.jueyong[0].length > 0; //=Math.max(1,player.getDamagedHp());
				},
				content() {
					var list = player.storage.jueyong,
						card = list[0].shift(),
						source = list[1].shift();
					if (player.getExpansions("jueyong").includes(card)) {
						if (source && source.isIn() && source.canUse(card, player, false)) {
							source.useCard(card, player, false);
						} else {
							player.gain(card);
						}
					}
					if (list[0].length) {
						event.redo();
					}
				},
			},
		},
	},
	sgsxjxfzmnl_poxiang: {
		audio: 'poxiang',
		enable: "phaseUse",
		usable: 1,
		filter: (event, player) => player.countCards("he") > 0,
		filterCard: true,
		filterTarget: lib.filter.notMe,
		position: "he",
		discard: false,
		lose: false,
		delay: false,
		check(card) {
			var player = _status.event.player;
			if (
				!player.storage.jueyong ||
				!player.storage.jueyong[0].length ||
				(player.hp <= 1 &&
					!player.storage.jueyong[0].some(function (card) {
						return get.tag(card, "damage") > 0;
					})) ||
				!player.storage.jueyong[0].some(function (card) {
					return get.effect(player, card, player.storage.jueyong[1][player.storage.jueyong[0].indexOf(card)], player) < 0;
				})
			) {
				return -1;
			}
			return 20 - get.value(card);
		},
		content() {
			"step 0";
			player.give(cards, target);
			player.draw(3).gaintag = ["sgsxjxfzmnl_poxiang"];
			player.addTempSkill("sgsxjxfzmnl_poxiang_mark");
			"step 1";
			var cards = player.getExpansions("jueyong");
			if (cards.length) {
				player.loseToDiscardpile(cards);
			}
			player.unmarkSkill("jueyong");
			// player.loseHp();
			"step 2";
			//player.skip('phaseDiscard');
			game.delayx();
		},
		ai: {
			order: 12,
			result: {
				player: 4,
				target: 1,
			},
		},
		subSkill: {
			mark: {
				charlotte: true,
				onremove(player) {
					player.removeGaintag("sgsxjxfzmnl_poxiang");
				},
				mod: {
					ignoredHandcard(card, player) {
						if (card.hasGaintag("sgsxjxfzmnl_poxiang")) {
							return true;
						}
					},
					cardDiscardable(card, player, name) {
						if (name == "phaseDiscard" && card.hasGaintag("sgsxjxfzmnl_poxiang")) {
							return false;
						}
					},
				},
			},
		},
	},

	//曹仁
	sgsxjxfzmnl_sbjushou: {
		audio: 'sbjushou',
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return !player.isTurnedOver();
		},
		filterCard: true,
		selectCard: [1, Infinity],
		check(card) {
			if (ui.selected.cards.length + _status.event.player.hujia >= 5) {
				return 0;
			}
			return 6.5 - get.value(card);
		},
		position: "he",
		logAudio: () => 1,
		group: ["sgsxjxfzmnl_sbjushou_damage", "sgsxjxfzmnl_sbjushou_draw"],
		content() {
			player.turnOver();
			player.changeHujia(cards.length, null, true);
		},
		ai: {
			order: 5,
			result: {
				player: 1,
			},
		},
		subSkill: {
			damage: {
				audio: "sbjushou2.mp3",
				trigger: {
					player: "damageEnd",
				},
				filter(event, player) {
					return player.isTurnedOver();
				},
				direct: true,
				content() {
					"step 0";
					player
						.chooseControl("翻面", "获得1点护甲", "cancel2")
						.set("ai", () => {
							if (_status.event.player.hujia >= 3) {
								return 0;
							}
							return 1;
						})
						.set("prompt", get.prompt("sgsxjxfzmnl_sbjushou"))
						.set("prompt2", "选择一项");
					"step 1";
					if (result.control == "cancel2") {
						event.finish();
						return;
					}
					player.logSkill("sgsxjxfzmnl_sbjushou_damage");
					if (result.control == "翻面") {
						player.turnOver();
					} else {
						player.changeHujia(1, null, true);
					}
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (!target.isTurnedOver()) {
								return;
							}
							if (get.tag(card, "damage")) {
								if (player.hasSkillTag("jueqing", false, target)) {
									return [1, -2];
								}
								if (
									(card.name == "sha" && !player.hasSkill("jiu")) ||
									target.hasSkillTag("filterDamage", null, {
										player: player,
										card: card,
									})
								) {
									return 0.1;
								}
							}
						},
					},
				},
			},
			draw: {
				audio: "sbjushou3.mp3",
				trigger: { player: "turnOverAfter" },
				forced: true,
				locked: false,
				filter(event, player) {
					return !player.isTurnedOver() && player.hujia > 0;
				},
				content() {
					player.draw(player.hujia);
				},
			},
		},
	},
	sgsxjxfzmnl_sbjiewei: {
		audio: 'sbjiewei',
		enable: "phaseUse",
		// usable: 1,
		filter(event, player) {
			return player.hujia > 0;
		},
		filterTarget(card, player, target) {
			return target != player && target.countCards("h")&&(!player.storage.sgsxjxfzmnl_sbjiewei_mark||player.storage.sgsxjxfzmnl_sbjiewei_mark.includes(target));
		},
		content() {
			player.changeHujia(-1);
			player.YB_tempz('sgsxjxfzmnl_sbjiewei_mark',target)
			player.gainPlayerCard(target, "visible", true, "h").set("ai", function (button) {
				return get.value(button.link, _status.event.target);
			});
		},
		ai: {
			combo: "sgsxjxfzmnl_sbjushou",
			order: 8,
			result: {
				player(player, target) {
					return player.hujia - 3.6;
				},
				target: -1,
			},
		},
	},


	//乐祢衡
	sgsxjxfzmnl_dcjigu: {
		audio: 'dcjigu',
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		filter(event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		forced: true,
		async content(event, trigger, player) {
			const cards = player.getCards("h");
			player.addGaintag(cards, "dcjigu");
		},
		mod: {
			ignoredHandcard(card) {
				if (card.hasGaintag("dcjigu")) {
					return true;
				}
			},
			cardDiscardable(card, _, name) {
				if (name == "phaseDiscard" && card.hasGaintag("dcjigu")) {
					return false;
				}
			},
		},
		group: "sgsxjxfzmnl_dcjigu_temp",
		subSkill: {
			used: {
				charlotte: true,
				onremove: true,
			},
			temp: {
				audio: "dcjigu",
				trigger: {
					player: "damageEnd",
					source: "damageSource",
				},
				filter(event, player) {
					return player.countCards("e") == player.countCards("h", card => card.hasGaintag("dcjigu")&&get.type(card)=='equip');
				},
				forced: true,
				prompt2(event, player) {
					return (
						"摸" +
						get.cnNumber(
							Array.from({ length: 5 })
								.map((_, i) => i + 1)
								.reduce((sum, i) => sum + player.countEmptySlot(i), 0)
						) +
						"张牌"
					);
				},
				async content(event, trigger, player) {
					// player.addTempSkill("sgsxjxfzmnl_dcjigu_used", { global: "roundStart" });
					// player.addMark("sgsxjxfzmnl_dcjigu_used");
					await player.draw(
						Array.from({ length: 5 })
							.map((_, i) => i + 1)
							.reduce((sum, i) => sum + player.countEmptySlot(i), 0)
					);
					// let num1 = player.countMark("sgsxjxfzmnl_dcjigu_used");
					// let num2 = game.countPlayer2(current => {
					// 	return current.actionHistory.some(i => i.isMe && !i.isSkipped);
					// });
					// if (num1 >= num2) {
					// 	player.tempBanSkill(event.name, "roundStart");
					// }
				},
			},
		},
	},
	sgsxjxfzmnl_dcsirui: {
		audio: 'dcsirui',
		mod: {
			targetInRange(card) {
				if (card.storage && card.storage.sgsxjxfzmnl_dcsirui) {
					return true;
				}
			},
			cardUsable(card, player, num) {
				if (card.storage && card.storage.sgsxjxfzmnl_dcsirui) {
					return Infinity;
				}
			},
		},
		enable: "phaseUse",
		filter(event, player) {
			if (!player.countCards("hes")) {
				return false;
			}
			return get
				.inpileVCardList(info => {
					const name = info[2];
					if (get.type(name) != "basic" && get.type(name) != "trick") {
						return false;
					}
					return true;
				})
				.some(card => player.hasCard(cardx => get.cardNameLength(cardx) == get.cardNameLength(card[2]) && player.hasUseTarget(get.autoViewAs({ name: card[2], nature: card[3], storage: { dcsirui: true } }, [cardx]), false, false), "hes"));
		},
		usable(skill,player){
			return Math.max(1,player.countCards("h", card => card.hasGaintag("dcjigu")));
		},
		locked: false,
		chooseButton: {
			dialog(event, player) {
				const list = get
					.inpileVCardList(info => {
						const name = info[2];
						if (get.type(name) != "basic" && get.type(name) != "trick") {
							return false;
						}
						return true;
					})
					.filter(card => player.hasCard(cardx => get.cardNameLength(cardx) == get.cardNameLength(card[2]) && player.hasUseTarget(get.autoViewAs({ name: card[2], nature: card[3], storage: { dcsirui: true } }, [cardx]), false, false), "hes"));
				return ui.create.dialog("思锐", [list, "vcard"]);
			},
			check(button) {
				return get.event().player.getUseValue({
					name: button.link[2],
					nature: button.link[3],
					storage: { dcsirui: true },
				});
			},
			backup(links, player) {
				return {
					audio: "dcsirui",
					filterCard(card, player) {
						return get.cardNameLength(card) == get.cardNameLength(lib.skill.sgsxjxfzmnl_dcsirui_backup.viewAs.name);
					},
					popname: true,
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						storage: { dcsirui: true },
					},
					check(card) {
						return 7 - get.value(card);
					},
					position: "hes",
					precontent() {
						event.getParent().addCount = false;
					},
				};
			},
			prompt(links, player) {
				return "将一张字数为" + get.cardNameLength(links[0][2]) + "的牌当作" + get.translation(links[0][3] || "") + "【" + get.translation(links[0][2]) + "】使用";
			},
		},
		ai: {
			order(item, player) {
				let list = get
					.inpileVCardList(info => {
						const name = info[2];
						if (get.type(name) != "basic" && get.type(name) != "trick") {
							return false;
						}
						return true;
					})
					.filter(card => player.hasCard(cardx => get.cardNameLength(cardx) == get.cardNameLength(card[2]) && player.hasUseTarget(get.autoViewAs({ name: card[2], nature: card[3] }, [cardx]), false, false), "hes"))
					.map(card => {
						return { name: card[2], nature: card[3] };
					})
					.filter(card => player.getUseValue(card, true, true) > 0);
				if (!list.length) {
					return 0;
				}
				list.sort((a, b) => (player.getUseValue(b, true, true) || 0) - (player.getUseValue(a, true, true) || 0));
				return get.order(list[0], player) * 0.99;
			},
			result: { player: 1 },
		},
		subSkill: {
			backup: { audio: "dcsirui" },
		},
	},

	//朱建平
	sgsxjxfzmnl_dcxiangmian: {
		audio: 'dcxiangmian',
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return game.hasPlayer(current => lib.skill.sgsxjxfzmnl_dcxiangmian.filterTarget(null, player, current));
		},
		filterTarget(card, player, target) {
			return player != target;
		},
		content() {
			"step 0";
			target.judge(card => -2 / Math.sqrt(get.number(card, false))).set("judge2", result => (result.bool === false ? true : false));
			"step 1";
			player.markAuto("sgsxjxfzmnl_dcxiangmian", [target]);
			target.addSkill("sgsxjxfzmnl_dcxiangmian_countdown");
			if (!target.storage["sgsxjxfzmnl_dcxiangmian_countdown"]) {
				target.storage["sgsxjxfzmnl_dcxiangmian_countdown"] = [];
			}
			[player.playerid, result.color, result.number].forEach(i => target.storage["sgsxjxfzmnl_dcxiangmian_countdown"].push(i));
			target.markSkill("sgsxjxfzmnl_dcxiangmian_countdown");
		},
		intro: { content: "已对$发动过技能" },
		ai: {
			expose: 0.3,
			order: 10,
			result: { target: -5 },
		},
		subSkill: {
			countdown: {
				trigger: { player: "useCardAfter" },
				mark: true,
				marktext: "💀",
				silent: true,
				forced: true,
				charlotte: true,
				intro: {
					markcount(storage) {
						if (storage) {
							var list = storage.filter((_, i) => i % 3 == 2);
							return Math.min.apply(null, list);
						}
					},
					content(storage, player) {
						if (!storage) {
							return;
						}
						var str = "使用";
						str +=
							get.cnNumber(
								Math.min.apply(
									null,
									storage.filter((_, i) => i % 3 == 2)
								)
							) + "张牌后，或使用一张";
						for (var i = 0; i < storage.length / 3; i++) {
							str += get.translation(storage[i * 3 + 1]) + "、";
						}
						str = str.slice(0, -1);
						str += "后，<font color=red>死亡</font>";
						return str;
					},
				},
				filter(event, player) {
					if (!player.getStorage("sgsxjxfzmnl_dcxiangmian_countdown").length) {
						return false;
					}
					//return (player.getStorage('dcxiangmian_countdown').filter((_,i)=>i%3==1)).includes(get.suit(event.card,player));
					return true;
				},
				content() {
					"step 0";
					var storage = player.getStorage("sgsxjxfzmnl_dcxiangmian_countdown");
					for (var i = 0; i < storage.length / 3; i++) {
						if (storage[i * 3 + 1] == get.color(trigger.card, player)) {
							storage[i * 3 + 2] = 0;
						} else {
							storage[i * 3 + 2]--;
						}
					}
					player.markSkill("sgsxjxfzmnl_dcxiangmian_countdown");
					"step 1";
					var storage = player.getStorage("sgsxjxfzmnl_dcxiangmian_countdown");
					for (var i = 0; i < storage.length / 3; i++) {
						if (storage[i * 3 + 2] <= 0) {
							if (!event.isMine() && !event.isOnline()) {
								game.delayx();
							}
							player.logSkill("sgsxjxfzmnl_dcxiangmian_countdown");
							player.storage["sgsxjxfzmnl_dcxiangmian_countdown"].splice(i * 3, 3);
							if (!player.getStorage("sgsxjxfzmnl_dcxiangmian_countdown").length) {
								player.removeSkill("sgsxjxfzmnl_dcxiangmian_countdown");
							}
							if (player.hp > 0) {
								player.die()
							}
							i--;
						}
					}
				},
				ai: {
					effect: {
						player_use(card, player, target) {
							if (typeof card != "object") {
								return;
							}
							var storage = player.getStorage("sgsxjxfzmnl_dcxiangmian_countdown");
							for (var i = 0; i < storage.length / 3; i++) {
								if (storage[i * 3 + 2] == 1 || get.color(card, player) == storage[i * 3 + 1]) {
									// if (!player.canSave(player) && !get.tag(card, "save")) {
									// 	return [0, -100, 0, 0];
									// }
									// return [1, -2 * player.hp, 1, 0];
									return -Infinity;
								}
							}
						},
					},
				},
			},
		},
	},
	sgsxjxfzmnl_dctianji: {
		audio: 'dctianji',
		trigger: { global: "cardsDiscardAfter" },
		forced: true,
		filter(event, player) {
			var evt = event.getParent().relatedEvent;
			return evt && evt.name == "judge" ;
		},
		content() {
			var card = trigger.cards[0],
				cards = [],
				func = ["type2", "suit", "number"];
			for (var fn of func) {
				var cardx = get.cardPile2(cardxx => {
					if (get[fn](card, player) == get[fn](cardxx, player) && !cards.includes(cardxx)) {
						return true;
					}
				}, "random");
				if (cardx) {
					cards.push(cardx);
				}
			}
			/*if(cards.length&&!player.isMaxHandcard(true)) player.draw();
			else*/ if (cards.length) {
				player.gain(cards, "gain2");
			}
		},
	},

	//神黄忠
	sgsxjxfzmnl_new_dclieqiong: {
		audio: "dclieqiong",
		trigger: { source: "damageSource" },
		filter(event, player) {
			return event.player.isIn() && event.source != event.player;
		},
		derivation: ["sgsxjxfzmnl_dclieqiong_place1", "sgsxjxfzmnl_dclieqiong_place4", "sgsxjxfzmnl_dclieqiong_place5", "sgsxjxfzmnl_dclieqiong_place6", "sgsxjxfzmnl_dclieqiong_place7"],
		positions: {
			head: {
				name: "天冲",
				info: "令其死亡，你增加1点体力上限并回复一点体力。",
				css_male: {
					left: "50%",
					top: "14%",
				},
				css_female: {
					left: "45%",
					top: "10%",
				},
				async content(event, trigger, player) {
					const { target, position } = event;
					game.log(player, "击伤了", target, "的", "#y天冲");
					await player.say('枪枪爆头，好运连连')
					await target.die();
					await player.gainMaxHp();
					await player.recover();
				},
			},
			hand: {
				name: "力烽",
				info: "令其随机弃置一半手牌（向上取整）",
				css_male: {
					left: "28%",
					top: "40%",
				},
				css_female: {
					left: "72%",
					top: "40%",
				},
				async content(event, trigger, player) {
					const { target, position } = event;
					game.log(player, "击伤了", target, "的", "#y力烽");
					const cardx = target.getDiscardableCards(target, "h");
					const num = Math.ceil(cardx.length / 2);
					if (cardx.length) {
						await target.discard(cardx.randomGets(num));
					}
				},
			},
			leg: {
				name: "地机",
				info: "令其接下来受到的伤害+1",
				css_male: {
					left: "35%",
					top: "80%",
				},
				css_female: {
					left: "67%",
					top: "80%",
				},
				async content(event, trigger, player) {
					const { target, position } = event;
					game.log(player, "击伤了", target, "的", "#y地机");
					// if(!target.hasSkill('sgsxjxfzmnl_new_dclieqiong_leg'))target.addTip("sgsxjxfzmnl_new_dclieqiong_leg", "裂穹 地机");
					target.addSkill('sgsxjxfzmnl_new_dclieqiong_leg')
					// target.addMark('sgsxjxfzmnl_new_dclieqiong_leg',1,false);
					// target
					// 	.when({
					// 		player: ["damageBegin3", "phaseEnd"],
					// 	})
					// 	.then(() => {
					// 		player.removeTip("sgsxjxfzmnl_new_dclieqiong_leg");
					// 		if (trigger.name == "damage") {
					// 			trigger.num++;
					// 		}
					// 	});
				},
			},
			chest: {
				name: "中枢",
				info: "令其每回合使用的第一张牌无效",
				css_male: {
					left: "50%",
					top: "30%",
				},
				css_female: {
					left: "40%",
					top: "25%",
				},
				async content(event, trigger, player) {
					const { target, position } = event;
					game.log(player, "击伤了", target, "的", "#y中枢");
					// if(!target.hasSkill('sgsxjxfzmnl_new_dclieqiong_chest'))target.addTip("sgsxjxfzmnl_new_dclieqiong_chest", "裂穹 中枢");
					target.addSkill('sgsxjxfzmnl_new_dclieqiong_chest')
					// target.addMark('sgsxjxfzmnl_new_dclieqiong_chest',1,false);
					// target
					// 	.when({
					// 		player: ["useCard", "phaseEnd"],
					// 	})
					// 	.then(() => {
					// 		player.removeTip("sgsxjxfzmnl_new_dclieqiong_chest");
					// 		if (trigger.name == "useCard") {
					// 			trigger.targets.length = 0;
					// 			trigger.all_excluded = true;
					// 		}
					// 	});
				},
			},
			abdomen: {
				name: "气海",
				info: "令其不能使用或打出红桃牌",
				css_male: {
					left: "50%",
					top: "42%",
				},
				css_female: {
					left: "40%",
					top: "35%",
				},
				async content(event, trigger, player) {
					const { target, position } = event;
					game.log(player, "击伤了", target, "的", "#y气海");
					target.addSkill("sgsxjxfzmnl_new_dclieqiong_abdomen");
				},
			},
		},
		async cost(event, trigger, player) {
			const target = trigger.player;
			let list = Object.keys(lib.skill[event.skill].positions);
			if (
				!player.hasHistory("useSkill", evt => {
					return evt.skill == event.skill && evt.targets?.includes(target);
				})
			) {
				list.remove("head");
			}
			if (!list.length) {
				event.result = { bool: false };
				return;
			}
			const result = await player
				.chooseButton([
					[
						dialog => {
							dialog.forcebutton = true;
							dialog.classList.add("forcebutton");
							dialog.listen(() => {
								let allpos = dialog.querySelectorAll(".position");
								allpos.forEach(pos => pos.classList.remove("selected_cp"));
							});
							dialog.classList.add("dclieqiong", "fixed", "fullheight");
							const { target, list } = get.event();
							dialog.style.backgroundImage = `url(${lib.assetURL}image/card/yiwu_${target.hasSex("male") ? "male" : "female"}.png)`;
							const title = ui.create.div(".title", dialog);
							title.innerHTML = `裂穹：是否击伤${get.translation(target)}的一个部位？`;
							//添加部位
							for (let pos of list) {
								let position = lib.skill.sgsxjxfzmnl_new_dclieqiong.positions[pos];
								let div = ui.create.div(".position", dialog, e => {
									e.stopPropagation();
									let allPosDiv = Array.from(dialog.querySelectorAll(".position"));
									allPosDiv.forEach(p => p.classList.remove("selected_cp"));
									div.classList.add("selected_cp");
									ui.selected.buttons = [div];
									ui.create.confirm("oc");
								});
								div.link = pos;
								let sex = target.hasSex("male") ? "male" : "female";
								div.css(position[`css_${sex}`] || {});
								div.setNodeIntro(position.name, position.info);
								div.style.setProperty("--info", `"【${position.name}】:${position.info}"`);
							}
						},
						"handle",
					],
				])
				.set("target", target)
				.set("list", list)
				.set("processAI", () => {
					const { player, target, list } = get.event();
					if (get.attitude(player, target) > 0) {
						return { bool: false };
					} else {
						return {
							bool: true,
							links: list.includes("head") ? ["head"] : ["abdomen"],
						};
					}
				})
				.set("switchToAuto", () => {
					_status.event.result = "ai";
					_status.event.dialog?.close();
					ui.confirm?.close();
				})
				.forResult();
			event.result = {
				bool: result.bool,
				targets: [target],
				cost_data: result.links,
			};
		},
		async content(event, trigger, player) {
			const {
				targets: [target],
				cost_data: [position],
			} = event;
			game.broadcastAll(function (position) {
				if (lib.config.background_speak) {
					game.playAudio("skill", "sgsxjxfzmnl_dclieqiong_" + position);
				}
			}, position);
			const positionObj = lib.skill[event.name].positions[position];
			let next = game.createEvent(event.name + "_effect", false);
			next.setContent(positionObj.content);
			next.set("target", target);
			next.set("player", player);
			next.set("position", positionObj);
			await next;
		},
		subSkill: {
			leg:{
				init(player, skill) {
					player.addTip(skill, "裂穹 地机");
				},
				onremove(player, skill) {
					player.removeTip(skill);
				},
				audio: "sgsxjxfzmnl_dclieqiong",
				charlotte: true,
				mark: true,
				marktext: "伤",
				intro: {
					name: "中伤 - 地机",
					content: (_, player) => "接下来受到的伤害+1",
				},
				trigger:{
					player: ["damageBegin3"],
				},
				content(){
					if (trigger.name == "damage") {
						trigger.num++;
					}
				},
			},
			chest:{
				init(player, skill) {
					player.addTip(skill, "裂穹 中枢");
				},
				onremove(player, skill) {
					player.removeTip(skill);
				},
				audio: "sgsxjxfzmnl_dclieqiong",
				charlotte: true,
				mark: true,
				marktext: "伤",
				intro: {
					name: "中伤 - 中枢",
					content: (_, player) => "每回合使用的第一张牌无效",
				},
				usable:1,
				trigger:{
					player: ["useCard"],
				},
				content(){
					if (trigger.name == "useCard") {
						trigger.targets.length = 0;
						trigger.all_excluded = true;
					}
				},
			},
			abdomen: {
				init(player, skill) {
					player.addTip(skill, "裂穹 气海");
				},
				onremove(player, skill) {
					player.removeTip(skill);
				},
				audio: "sgsxjxfzmnl_dclieqiong",
				charlotte: true,
				mark: true,
				marktext: "伤",
				intro: {
					name: "中伤 - 气海",
					content: (_, player) => "不能使用或打出红桃牌",
				},
				mod: {
					cardEnabled(card) {
						if (get.suit(card) == "heart") {
							return false;
						}
					},
					cardSavable(card) {
						if (get.suit(card) == "heart") {
							return false;
						}
					},
					cardRespondable(card) {
						if (get.suit(card) == "heart") {
							return false;
						}
					},
				},
			},
		},
	},
	sgsxjxfzmnl_dczhanjue: {
		audio: 'dczhanjue',
		trigger: {
			player: "phaseUseBegin",
		},
		async cost(event, trigger, player) {
			const hps = [player.getHp(), player.getDamagedHp()];
			let list = [(hps[0] > 0 ? "摸" + get.cnNumber(hps[0]) + "张牌，" : "") + "此阶段使用的下一张伤害牌无距离限制且不能被响应。", (hps[1] > 0 ? "摸" + get.cnNumber(hps[1]) + "张牌，" : "") + "此阶段造成伤害后，回复等量体力。"];
			let result = await player
				.chooseControlList(list)
				.set("ai", function () {
					let player = get.event().player,
						damaged = player.getDamagedHp();
					if (damaged) {
						damaged +=
							0.6 *
							(player.countCards("hs", card => {
								if (card.name == "sha" || !get.tag(card, "damage")) {
									return 0;
								}
								let info = get.info(card);
								if (!info || info.type != "trick") {
									return false;
								}
								if (info.notarget) {
									return false;
								}
								if (info.selectTarget != undefined) {
									if (Array.isArray(info.selectTarget)) {
										if (info.selectTarget[1] == -2) {
											return 1;
										}
										if (info.selectTarget[1] == -1) {
											let func = info.filterTarget;
											if (typeof func != "function") {
												func = () => true;
											}
											return game.countPlayer(cur => {
												return func(card, player, cur);
											});
										}
										return Math.max(1, info.selectTarget[0], info.selectTarget[1]);
									} else {
										if (info.selectTarget == -2) {
											return 1;
										}
										if (info.selectTarget == -1) {
											let func = info.filterTarget;
											if (typeof func != "function") {
												func = () => true;
											}
											return game.countPlayer(cur => {
												return func(card, player, cur);
											});
										}
										return Math.max(1, info.selectTarget);
									}
								}
								return 1;
							}) +
								Math.max(player.getCardUsable("sha"), player.countCards("hs", "sha")));
					}
					if (damaged > player.hp) {
						return "选项二";
					}
					return "选项一";
				})
				.forResult();
			event.result = {
				bool: result.control != "cancel2",
				cost_data: result.control,
			};
		},
		async content(event, trigger, player) {
			if (event.cost_data == "选项一") {
				player.draw(player.getHp());
				player.addTempSkill("sgsxjxfzmnl_dczhanjue_directHit", { player: "phaseUseEnd" });
			} else {
				player.draw(player.getDamagedHp());
				player.addTempSkill("sgsxjxfzmnl_dczhanjue_recover", { player: "phaseUseEnd" });
			}
		},
		subSkill: {
			directHit: {
				audio: "dczhanjue",
				charlotte: true,
				forced: true,
				mod: {
					targetInRange(card) {
						// if (card.name == "sha") {
						// 	return true;
						// }
						if(get.tag(card, "damage")){
							return true;
						}
					},
				},
				trigger: {
					player: "useCard",
				},
				filter(event, player) {
					return get.tag(event.card, "damage")
				},
				async content(event, trigger, player) {
					trigger.directHit.addArray(game.players);
					game.log(trigger.card, "不可被响应");
					player.removeSkill(event.name);
				},
			},
			recover: {
				audio: "dczhanjue",
				trigger: {
					source: "damageSource",
				},
				forced: true,
				charlotte: true,
				content: async function (event, trigger, player) {
					if (player.isDamaged()) {
						player.recover(trigger.num);
					}
					// player.removeSkill(event.name);
				},
			},
		},
	},

	//滕芳兰
	sgsxjxfzmnl_dcluochong: {
		audio: 'dcluochong',
		trigger: { global: "roundStart" },
		filter(event, player) {
			return game.hasPlayer(current => current.countDiscardableCards(player, "hej") > 0);
		},
		direct: true,
		async content(event, trigger, player) {
			if (_status.connectMode) {
				game.broadcastAll(function () {
					_status.noclearcountdown = true;
				});
			}
			const lose_list = [];
			let num = 4 - player.countMark("sgsxjxfzmnl_dcluochong");
			let log = false;
			// event.targets = game.filterPlayer();
			event.targets = [];
			while (event.targets.length<4) {
				const result = await player
					.chooseTarget(get.prompt("sgsxjxfzmnl_dcluochong"), `弃置任意名角色区域内的累计至多${num}张牌`, (card, player, target) => {
						return target.hasCard(card => {
							return lib.filter.canBeDiscarded(card, player, target, "dcluochong")&&!event.targets.includes(target);
						}, "hej");
					})
					.set("ai", target => {
						const player = _status.event.player,
							discarded = _status.event.lose_list.find(item => item[0] == target);
						if (discarded) {
							if (target == player) {
								return 0;
							}
							const num = discarded[1].length;
							if (num > 1 && player.hp + player.hujia > 2) {
								return 0;
							}
						}
						if (target == player) {
							if (ui.cardPile.childNodes.length > 80 && player.hasCard(card => get.value(card) < 8)) {
								return 20;
							}
							return 0;
						}
						return get.effect(target, { name: "guohe_copy2" }, player, player);
					})
					.set("lose_list", lose_list)
					.forResult();
				if (result.bool) {
					if (!log) {
						player.logSkill("sgsxjxfzmnl_dcluochong");
						log = true;
					}
					const target = result.targets[0];
					const { cards } = await player
						.choosePlayerCard(target, true, "hej", [1, Infinity], `选择弃置${get.translation(target)}区域内的牌`, "allowChooseAll")
						.set("filterButton", button => {
							const card = button.link,
								target = _status.event.target,
								player = get.player();
							return lib.filter.canBeDiscarded(card, player, target, "sgsxjxfzmnl_dcluochong");
						})
						.set("lose_list", lose_list)
						.set("ai", button => {
							if (ui.selected.buttons.length > 0) {
								return false;
							}
							var val = get.buttonValue(button);
							if (get.attitude(_status.event.player, _status.event.target) > 0) {
								return -val;
							}
							return val;
						})
						.forResult();
					// num -= cards.length;
					event.targets.push(target);
					const index = lose_list.find(item => item[0] == target);
					if (!index) {
						lose_list.push([target, cards]);
					} else {
						index[1].addArray(cards);
					}
					await target.discard(cards, "notBySelf").set("discarder", player);
				} else {
					break;
				}
			}
			if (_status.connectMode) {
				game.broadcastAll(function () {
					delete _status.noclearcountdown;
					game.stopCountChoose();
				});
			}
			// if (lose_list.length > 0 && lose_list.some(i => i[1].length > 2)) {
			// 	game.log(player, "可弃置牌数", "#g-1");
			// 	player.addMark("dcluochong", 1, false);
			// }
		},
		ai: {
			threaten: 2.5,
			effect: {
				target(card, player, target, current) {
					if (get.type(card) == "delay" && current < 0) {
						var current2 = _status.currentPhase;
						if (current2 && current2.getSeatNum() > target.getSeatNum()) {
							return 0.1;
						}
					}
				},
			},
		},
		group:['sgsxjxfzmnl_dcluochong_change'],
		subSkill:{
			change:{
				firstDo:true,
				charlotte:true,
				direct:true,
				locked:true,
				trigger: {
					global: ["loseAfter"],
				},
				filter(event, player, name) {
					const evt = event.getParent(2);
					if (evt.name == "sgsxjxfzmnl_dcluochong") {
						return true;
					}
				},
				content(){
					var evt = trigger.getParent(2);
					evt.name='dcluochong'
				}
			},
		},
	},
	sgsxjxfzmnl_dcaichen: {
		audio: 'dcaichen',
		// init(player) {
		// 	game.addGlobalSkill("qmsgswkjsgj_re_dcaichen_hit");
		// },
		// onremove(player) {
		// 	if (!game.hasPlayer(current => current.hasSkill("qmsgswkjsgj_re_dcaichen", null, null, false), true)) {
		// 		game.removeGlobalSkill("qmsgswkjsgj_re_dcaichen_hit");
		// 	}
		// },
		trigger: {
			player: ["loseAfter", "phaseDiscardBefore"],
			// target: "useCardToTargeted",
		},
		filter(event, player, name) {
			if (event.name == "phaseDiscard") {
				// return ui.cardPile.childNodes.length > 40;
				return true;
			}
			// if (name == "useCardToTargeted") {
			// 	return ui.cardPile.childNodes.length < 40 && get.suit(event.card) == "spade";
			// }
			const evt = event.getParent(2);
			if (evt.name != "dcluochong" || evt.player != player ) {
				return false;
			}
			if (!event.getl(player).cards.length) {
				return false;
			}
			// return ui.cardPile.childNodes.length > 80;
			return true;
		},
		forced: true,
		getIndex(event,player){
			if(event.name=='phaseDiscard')return 1;
			return event.getl(player).cards.length;
		},
		content() {
			if (trigger.name.indexOf("lose") == 0) {
				player.draw(2);
			} else if (trigger.name == "phaseDiscard") {
				trigger.cancel();
				game.log(player, "跳过了弃牌阶段");
			} else {
				player.say('我是怎么进入这条分支的？')
				// trigger.directHit.add(player);
				// game.log(player, "不可响应", trigger.card);
			}
		},
		// subSkill: {
		// 	hit: {
		// 		trigger: { player: "dieAfter" },
		// 		filter(event, player) {
		// 			return !game.hasPlayer(current => current.hasSkill("qmsgswkjsgj_re_dcaichen", null, null, false), true);
		// 		},
		// 		silent: true,
		// 		forceDie: true,
		// 		content() {
		// 			game.removeGlobalSkill("qmsgswkjsgj_re_dcaichen_hit");
		// 		},
		// 		ai: {
		// 			directHit_ai: true,
		// 			skillTagFilter(player, tag, arg) {
		// 				return arg && arg.card && arg.target && arg.target.hasSkill("qmsgswkjsgj_re_dcaichen") && ui.cardPile.childNodes.length < 40 && get.suit(arg.card) === "spade";
		// 			},
		// 		},
		// 	},
		// },
	},

	//貂蝉
	sgsxjxfzmnl_sblijian: {
		audio: 'sblijian',
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return game.countPlayer(current => current != player) > 1;
		},
		// filterCard: true,
		// selectCard: [1, Infinity],
		// position: "he",
		filterTarget: lib.filter.notMe,
		selectTarget() {
			return [2,Infinity];
		},
		// filterOk() {
		// 	return ui.selected.targets.length == ui.selected.cards.length + 1;
		// },
		// check(card) {
		// 	let player = get.owner(card),
		// 		targets = lib.skill.sgsxjxfzmnl_sblijian.selectTargetAi(_status.event, player);
		// 	if (ui.selected.cards.length < targets - 1) {
		// 		if (player.hasSkill("sgsxjxfzmnl_sbbiyue")) {
		// 			return 4 * targets - get.value(card);
		// 		}
		// 		return 6 + targets - get.value(card);
		// 	}
		// 	return 0;
		// },
		selectTargetAi: (event, player) => {
			let cache = _status.event.getTempCache("sgsxjxfzmnl_sblijian", "targets");
			if (Array.isArray(cache)) {
				return cache.length;
			}
			let targets = [],
				cards = [0],
				sgsxjxfzmnl_sbbiyue = player.hasSkill("sgsxjxfzmnl_sbbiyue") ? Math.max(0, 3 - game.countPlayer2(current => current.hasHistory("damage"))) : 0,
				alter = [null, 1, 1],
				temp;
			for (let i of game.players) {
				if (player === i) {
					continue;
				}
				temp = get.effect(i, new lib.element.VCard({ name: "juedou", isCard: true }), i, i);
				if (temp) {
					let att = get.attitude(event.player, i);
					if ((!att && sgsxjxfzmnl_sbbiyue) || att * temp > 0) {
						targets.push([i, temp, att]);
					} else if (!alter[2]) {
						continue;
					} else if (!att || (att > 0 && temp > -15 && i.hp > 2) || (att < 0 && temp < 15)) {
						alter = [i, temp, att];
					}
				}
			}
			targets.sort((a, b) => {
				if (Boolean(a[2]) !== Boolean(b[2])) {
					return Math.abs(b[2]) - Math.abs(a[2]);
				}
				return Math.abs(b[1]) - Math.abs(a[1]);
			});
			if (targets.length < 2 && alter[0]) {
				targets.push(alter);
			}
			targets = targets.slice(
				0,
				1 +
					player.countCards("he", card => {
						if (lib.filter.cardDiscardable(card, player, "sgsxjxfzmnl_sblijian")) {
							cards.push(get.value(card));
							return true;
						}
						return false;
					})
			);
			cards.sort((a, b) => a - b);
			for (let i = 0; i < targets.length; i++) {
				if (Math.abs(targets[i][1]) < cards[i] / (1 + sgsxjxfzmnl_sbbiyue)) {
					targets.splice(i, targets.length - i);
					break;
				}
			}
			if (targets.length < 2) {
				event.putTempCache("sgsxjxfzmnl_sblijian", "targets", []);
				return 0;
			}
			event.putTempCache("sgsxjxfzmnl_sblijian", "targets", targets);
			return targets.length;
		},
		multiline: true,
		async content(event, trigger, player) {
			const { targets, target } = event;
			const targetx = targets.slice().sortBySeat(target)[1];
			const card = { name: "juedou", isCard: true };
			if(targetx.countCards('h')){
				await player.gainPlayerCard('h', target, true).set("target", target).set("complexSelect", false).set("ai", lib.card.shunshou.ai.button);
			}
			if (target.canUse(card, targetx)) {
				await target.useCard(card, targetx);
			}
		},
		ai: {
			threaten: 3,
			order: 7,
			result: {
				player(player, target) {
					let targets = _status.event.getTempCache("sgsxjxfzmnl_sblijian", "targets");
					if (Array.isArray(targets)) {
						for (let arr of targets) {
							if (target === arr[0] && !arr[2]) {
								return 1;
							}
						}
					}
					return 0;
				},
				target(player, target) {
					let targets = _status.event.getTempCache("sgsxjxfzmnl_sblijian", "targets");
					if (Array.isArray(targets)) {
						for (let arr of targets) {
							if (target === arr[0]) {
								if (arr[1] * arr[2] < 0) {
									return get.sgn(arr[2]);
								}
								return arr[1];
							}
						}
					}
					return 0;
				},
			},
		},
	},
	sgsxjxfzmnl_sbbiyue: {
		audio: 'sbbiyue',
		trigger: { player: "phaseJieshuBegin" },
		forced: true,
		async content(event, trigger, player) {
			await player.draw(game.countPlayer2(current => current.hasHistory("damage")) + 1);
		},
	},

	//界左慈
	sgsxjxfzmnl_rehuashen: {
		unique: true,
		audio: 'rehuashen',
		trigger: {
			global: "phaseBefore",
			player: ["enterGame", "phaseBegin", "phaseEnd"],
		},
		filter(event, player, name) {
			if (event.name != "phase") {
				return true;
			}
			if (name == "phaseBefore") {
				return game.phaseNumber == 0;
			}
			return player.storage.sgsxjxfzmnl_rehuashen?.character?.length > 0;
		},
		async cost(event, trigger, player) {
			if (trigger.name !== "phase" || event.triggername === "phaseBefore") {
				event.result = { bool: true, cost_data: ["替换当前化身"] };
				return;
			}
			const prompt = "###" + get.prompt(event.skill) + '###<div class="text center">替换当前化身牌或制衡至多两张其他化身牌</div>';
			const result = await player
				.chooseControl("替换当前化身", "制衡其他化身", "cancel2")
				.set("ai", () => {
					const { player, cond } = get.event();
					let skills = player.storage.sgsxjxfzmnl_rehuashen.character.map(i => get.character(i).skills).flat();
					skills.randomSort();
					skills.sort((a, b) => get.skillRank(b, cond) - get.skillRank(a, cond));
					if (skills[0] === player.storage.sgsxjxfzmnl_rehuashen.current2 || get.skillRank(skills[0], cond) < 1) {
						return "制衡其他化身";
					}
					return "替换当前化身";
				})
				.set("cond", event.triggername)
				.set("prompt", prompt)
				.forResult();
			const control = result.control;
			event.result = { bool: typeof control === "string" && control !== "cancel2", cost_data: control };
		},
		async content(event, trigger, player) {
			let choice = event.cost_data;
			if (Array.isArray(choice)) {
				lib.skill.sgsxjxfzmnl_rehuashen.addHuashens(player, 3);
				[choice] = choice;
			}
			_status.noclearcountdown = true;
			const id = lib.status.videoId++,
				prompt = choice === "替换当前化身" ? "化身：请选择你要更换的武将牌" : "化身：选择制衡至多两张武将牌";
			const cards = player.storage.sgsxjxfzmnl_rehuashen.character;
			if (player.isOnline2()) {
				player.send(
					(cards, prompt, id) => {
						const dialog = ui.create.dialog(prompt, [cards, lib.skill.sgsxjxfzmnl_rehuashen.$createButton]);
						dialog.videoId = id;
					},
					cards,
					prompt,
					id
				);
			}
			const dialog = ui.create.dialog(prompt, [cards, lib.skill.sgsxjxfzmnl_rehuashen.$createButton]);
			dialog.videoId = id;
			if (!event.isMine()) {
				dialog.style.display = "none";
			}
			if (choice === "替换当前化身") {
				const buttons = dialog.content.querySelector(".buttons");
				const array = dialog.buttons.filter(item => !item.classList.contains("nodisplay") && item.style.display !== "none");
				const choosed = player.storage.sgsxjxfzmnl_rehuashen.choosed;
				const groups = array
					.map(i => get.character(i.link).group)
					.unique()
					.sort((a, b) => {
						const getNum = g => (lib.group.includes(g) ? lib.group.indexOf(g) : lib.group.length);
						return getNum(a) - getNum(b);
					});
				if (choosed.length > 0 || groups.length > 1) {
					dialog.style.bottom = (parseInt(dialog.style.top || "0", 10) + get.is.phoneLayout() ? 230 : 220) + "px";
					dialog.addPagination({
						data: array,
						totalPageCount: groups.length + Math.sign(choosed.length),
						container: dialog.content,
						insertAfter: buttons,
						onPageChange(state) {
							const { pageNumber, data, pageElement } = state;
							const { groups, choosed } = pageElement;
							data.forEach(item => {
								item.classList[
									(() => {
										const name = item.link,
											goon = choosed.length > 0;
										if (goon && pageNumber === 1) {
											return choosed.includes(name);
										}
										const group = get.character(name).group;
										return groups.indexOf(group) + (1 + goon) === pageNumber;
									})()
										? "remove"
										: "add"
								]("nodisplay");
							});
							ui.update();
						},
						pageLimitForCN: ["←", "→"],
						pageNumberForCN: (choosed.length > 0 ? ["常用"] : []).concat(
							groups.map(i => {
								const isChineseChar = char => {
									const regex = /[\u4e00-\u9fff\u3400-\u4dbf\ud840-\ud86f\udc00-\udfff\ud870-\ud87f\udc00-\udfff\ud880-\ud88f\udc00-\udfff\ud890-\ud8af\udc00-\udfff\ud8b0-\ud8bf\udc00-\udfff\ud8c0-\ud8df\udc00-\udfff\ud8e0-\ud8ff\udc00-\udfff\ud900-\ud91f\udc00-\udfff\ud920-\ud93f\udc00-\udfff\ud940-\ud97f\udc00-\udfff\ud980-\ud9bf\udc00-\udfff\ud9c0-\ud9ff\udc00-\udfff]/u;
									return regex.test(char);
								}; //友情提醒：regex为基本汉字区间到扩展G区的Unicode范围的正则表达式，非加密/混淆
								const str = get.plainText(lib.translate[i + "2"] || lib.translate[i] || "无");
								return isChineseChar(str.slice(0, 1)) ? str.slice(0, 1) : str;
							})
						),
						changePageEvent: "click",
						pageElement: {
							groups: groups,
							choosed: choosed,
						},
					});
				}
			}
			const finish = () => {
				if (player.isOnline2()) {
					player.send("closeDialog", id);
				}
				dialog.close();
				delete _status.noclearcountdown;
				if (!_status.noclearcountdown) {
					game.stopCountChoose();
				}
			};
			while (true) {
				const next = player.chooseButton(true).set("dialog", id);
				if (choice === "制衡其他化身") {
					next.set("selectButton", [1, 2]);
					next.set("filterButton", button => button.link !== get.event().current);
					next.set("current", player.storage.sgsxjxfzmnl_rehuashen.current);
				} else {
					next.set("ai", button => {
						const { player, cond } = get.event();
						let skills = player.storage.sgsxjxfzmnl_rehuashen.character.map(i => get.character(i).skills).flat();
						skills.randomSort();
						skills.sort((a, b) => get.skillRank(b, cond) - get.skillRank(a, cond));
						return player.storage.sgsxjxfzmnl_rehuashen.map[button.link].includes(skills[0]) ? 2.5 : 1 + Math.random();
					});
					next.set("cond", event.triggername);
				}
				const result = await next.forResult();
				if (choice === "制衡其他化身") {
					finish();
					lib.skill.sgsxjxfzmnl_rehuashen.removeHuashen(player, result.links);
					lib.skill.sgsxjxfzmnl_rehuashen.addHuashens(player, result.links.length);
					return;
				} else {
					const card = result.links[0];
					const func = function (card, id) {
						const dialog = get.idDialog(id);
						if (dialog) {
							//禁止翻页
							const paginationInstance = dialog.paginationMap?.get(dialog.content.querySelector(".buttons"));
							if (paginationInstance?.state) {
								paginationInstance.state.pageRefuseChanged = true;
							}
							for (let i = 0; i < dialog.buttons.length; i++) {
								if (dialog.buttons[i].link == card) {
									dialog.buttons[i].classList.add("selectedx");
								} else {
									dialog.buttons[i].classList.add("unselectable");
								}
							}
						}
					};
					if (player.isOnline2()) {
						player.send(func, card, id);
					} else if (event.isMine()) {
						func(card, id);
					}
					const result2 = await player
						.chooseControl(player.storage.sgsxjxfzmnl_rehuashen.map[card], "返回")
						.set("ai", () => {
							const { player, cond, controls } = get.event();
							let skills = controls.slice();
							skills.randomSort();
							skills.sort((a, b) => get.skillRank(b, cond) - get.skillRank(a, cond));
							return skills[0];
						})
						.set("cond", event.triggername)
						.forResult();
					const control = result2.control;
					if (control === "返回") {
						const func2 = function (card, id) {
							const dialog = get.idDialog(id);
							if (dialog) {
								//允许翻页
								const paginationInstance = dialog.paginationMap?.get(dialog.content.querySelector(".buttons"));
								if (paginationInstance?.state) {
									paginationInstance.state.pageRefuseChanged = false;
								}
								for (let i = 0; i < dialog.buttons.length; i++) {
									dialog.buttons[i].classList.remove("selectedx");
									dialog.buttons[i].classList.remove("unselectable");
								}
							}
						};
						if (player.isOnline2()) {
							player.send(func2, card, id);
						} else if (event.isMine()) {
							func2(card, id);
						}
					} else {
						var groupx = get.character(card).group;
						if(get.character(card).doubleGroup&&get.character(card).doubleGroup.length>1){
							var relu = await player.chooseControl(get.character(card).doubleGroup).set('prompt','请选择一个势力').set('ai',function(cont){
								// var control = _status.event.control;
								if(lib.skill[control].groupSkill){
									if(typeof lib.skill[control].groupSkill == 'string'&&lib.skill[control].groupSkill == cont){
										return true;
									}
									else {
										if(Array.isArray(lib.skill[control].groupSkill)&&lib.skill[control].groupSkill.includes(cont)){
											return true;
										}
									}
								}
							}).forResult();

							if(relu.control){
								groupx = relu.control;
								var changeG = true;
							}
						}
						finish();
						player.storage.sgsxjxfzmnl_rehuashen.choosed.add(card);
						if (player.storage.sgsxjxfzmnl_rehuashen.current != card||changeG) {
							const old = player.storage.sgsxjxfzmnl_rehuashen.current;
							player.storage.sgsxjxfzmnl_rehuashen.current = card;
							game.broadcastAll(
								(player, character, old) => {
									player.tempname.remove(old);
									player.tempname.add(character);
									player.sex = lib.character[character][0];
								},
								player,
								card,
								old
							);
							game.log(player, "将性别变为了", "#y" + get.translation(get.character(card).sex) + "性");
							player.changeGroup(groupx);
						}
						player.storage.sgsxjxfzmnl_rehuashen.current2 = control;
						if (!player.additionalSkills.sgsxjxfzmnl_rehuashen?.includes(control)) {
							player.flashAvatar("sgsxjxfzmnl_rehuashen", card);
							player.syncStorage("sgsxjxfzmnl_rehuashen");
							player.updateMarks("sgsxjxfzmnl_rehuashen");
							await player.addAdditionalSkills("sgsxjxfzmnl_rehuashen", control);
							// lib.skill.sgsxjxfzmnl_rehuashen.createAudio(card,link,'re_zuoci');
						}
						return;
					}
				}
			}
		},
		init(player, skill) {
			if (!player.storage[skill]) {
				player.storage[skill] = {
					character: [],
					choosed: [],
					map: {},
				};
			}
		},
		banned: ["lisu", "sp_xiahoudun", "xushao", "jsrg_xushao", "zhoutai", "old_zhoutai", "shixie", "xin_zhoutai", "dc_shixie", "old_shixie"],
		bannedType: ["Charlotte"/*, "主公技", "觉醒技", "限定技", "隐匿技", "使命技"*/],//没说不能获取，所以不禁用这些标签
		initList() {
			if(!_status.characterlistYinJian){
				_status.characterlistYinJian=lib.characterSort.sgstrxs.sgsxjxfzmnl.filter(c=>lib.character[c]&&lib.translate[c].startsWith('阴间'));
			}
			// var list = lib.characterSort.sgstrxs.sgsxjxfzmnl.filter(c=>lib.character[c]&&lib.translate[c].startsWith('阴间'));
			// return list;
			return _status.characterlistYinJian;
		},
		addHuashen(player) {
			if (!player.storage.sgsxjxfzmnl_rehuashen) {
				return;
			}
			if (!_status.characterlistYinJian) {
				// game.initCharacterList();
				// lib.skill.sgsxjxfzmnl_rehuashen.initList()
				_status.characterlistYinJian=lib.characterSort.sgstrxs.sgsxjxfzmnl.filter(c=>lib.character[c]&&lib.translate[c].startsWith('阴间'));
			}
			// _status.characterlist.randomSort();
			_status.characterlistYinJian.randomSort();
			// var listx=lib.skill.sgsxjxfzmnl_rehuashen.initList();
			// listx.randomSort();

			// listx.forEach(i=>{

			// 	player.storage.sgsxjxfzmnl_rehuashen.character.push(i);

			// 	player.storage.sgsxjxfzmnl_rehuashen.map[i] = lib.character[i][3];

			// })
			for (let i = 0; i < _status.characterlistYinJian.length; i++) {
				let name = _status.characterlistYinJian[i];
				if (name.indexOf("zuoci") != -1 || player.storage.sgsxjxfzmnl_rehuashen.character.includes(name)) {
					continue;
				}
				let skills = lib.character[name][3].filter(skill => {
					const categories = get.skillCategoriesOf(skill, player);
					return !categories.some(type => lib.skill.sgsxjxfzmnl_rehuashen.bannedType.includes(type));
				});
				if (skills.length) {
					player.storage.sgsxjxfzmnl_rehuashen.character.push(name);
					player.storage.sgsxjxfzmnl_rehuashen.map[name] = skills;
					_status.characterlistYinJian.remove(name);
					return name;
				}
			}
		},
		addHuashens(player, num) {
			var list = [];
			for (var i = 0; i < num; i++) {
				var name = lib.skill.sgsxjxfzmnl_rehuashen.addHuashen(player);
				if (name) {
					list.push(name);
				}
			}
			if (list.length) {
				player.syncStorage("sgsxjxfzmnl_rehuashen");
				player.updateMarks("sgsxjxfzmnl_rehuashen");
				game.log(player, "获得了", get.cnNumber(list.length) + "张", "#g化身");
				lib.skill.sgsxjxfzmnl_rehuashen.drawCharacter(player, list);
			}
		},
		removeHuashen(player, links) {
			player.storage.sgsxjxfzmnl_rehuashen.character.removeArray(links);
			_status.characterlistYinJian.addArray(links);
			game.log(player, "移去了", get.cnNumber(links.length) + "张", "#g化身");
		},
		drawCharacter(player, list) {
			game.broadcastAll(
				function (player, list) {
					if (player.isUnderControl(true)) {
						var cards = [];
						for (var i = 0; i < list.length; i++) {
							var cardname = "huashen_card_" + list[i];
							lib.card[cardname] = {
								fullimage: true,
								image: "character:" + list[i],
							};
							lib.translate[cardname] = get.rawName2(list[i]);
							cards.push(game.createCard(cardname, "", ""));
						}
						player.$draw(cards, "nobroadcast");
					}
				},
				player,
				list
			);
		},
		$createButton(item, type, position, noclick, node) {
			node = ui.create.buttonPresets.character(item, "character", position, noclick);
			const info = lib.character[item];
			const skills = info[3].filter(function (skill) {
				const categories = get.skillCategoriesOf(skill, get.player());
				return !categories.some(type => lib.skill.sgsxjxfzmnl_rehuashen.bannedType.includes(type));
			});
			if (skills.length) {
				const skillstr = skills.map(i => `[${get.translation(i)}]`).join("<br>");
				const skillnode = ui.create.caption(`<div class="text" data-nature=${get.groupnature(info[1], "raw")}m style="font-family: ${lib.config.name_font || "xinwei"},xinwei">${skillstr}</div>`, node);
				skillnode.style.left = "2px";
				skillnode.style.bottom = "2px";
			}
			node._customintro = function (uiintro, evt) {
				const character = node.link,
					characterInfo = get.character(node.link);
				let capt = get.translation(character);
				if (characterInfo) {
					capt += `&nbsp;&nbsp;${get.translation(characterInfo.sex)}`;
					let charactergroup;
					const charactergroups = get.is.double(character, true);
					if (charactergroups) {
						charactergroup = charactergroups.map(i => get.translation(i)).join("/");
					} else {
						charactergroup = get.translation(characterInfo.group);
					}
					capt += `&nbsp;&nbsp;${charactergroup}`;
				}
				uiintro.add(capt);

				if (lib.characterTitle[node.link]) {
					uiintro.addText(get.colorspan(lib.characterTitle[node.link]));
				}
				for (let i = 0; i < skills.length; i++) {
					if (lib.translate[skills[i] + "_info"]) {
						let translation = lib.translate[skills[i] + "_ab"] || get.translation(skills[i]).slice(0, 2);
						if (lib.skill[skills[i]] && lib.skill[skills[i]].nobracket) {
							uiintro.add('<div><div class="skilln">' + get.translation(skills[i]) + "</div><div>" + get.skillInfoTranslation(skills[i], null, false) + "</div></div>");
						} else {
							uiintro.add('<div><div class="skill">【' + translation + "】</div><div>" + get.skillInfoTranslation(skills[i], null, false) + "</div></div>");
						}
						if (lib.translate[skills[i] + "_append"]) {
							uiintro._place_text = uiintro.add('<div class="text">' + lib.translate[skills[i] + "_append"] + "</div>");
						}
					}
				}
			};
			return node;
		},
		// createAudio:(character,skillx,name)=>{
		// 	var skills=game.expandSkills([skillx]);
		// 	skills=skills.filter(skill=>get.info(skill));
		// 	if(!skills.length) return;
		// 	var skillss=skills.filter(skill=>get.info(skill).derivation);
		// 	if(skillss.length){
		// 		skillss.forEach(skill=>{
		// 			var derivationSkill=get.info(skill).derivation;
		// 			skills[Array.isArray(derivationSkill)?'addArray':'add'](derivationSkill);
		// 		});
		// 	}
		// 	skills.forEach(skill=>{
		// 		var info=lib.skill[skill];
		// 		if(info){
		// 			if(!info.audioname2) info.audioname2={};
		// 			if(info.audioname&&info.audioname.includes(character)){
		// 				if(info.audio){
		// 					if(typeof info.audio=='string') skill=info.audio;
		// 					if(Array.isArray(info.audio)) skill=info.audio[0];
		// 				}
		// 				if(!lib.skill[skill+'_'+character]) lib.skill[skill+'_'+character]={audio:2};
		// 				info.audioname2[name]=(skill+'_'+character);
		// 			}
		// 			else if(info.audioname2[character]){
		// 				info.audioname2[name]=info.audioname2[character];
		// 			}
		// 			else{
		// 				if(info.audio){
		// 					if(typeof info.audio=='string') skill=info.audio;
		// 					if(Array.isArray(info.audio)) skill=info.audio[0];
		// 				}
		// 				info.audioname2[name]=skill;
		// 			}
		// 		}
		// 	});
		// },
		mark: true,
		intro: {
			onunmark(storage, player) {
				_status.characterlist.addArray(storage.character);
				storage.character = [];
				const name = player.name ? player.name : player.name1;
				if (name) {
					const sex = get.character(name).sex;
					const group = get.character(name).group;
					if (player.sex !== sex) {
						game.broadcastAll(
							(player, sex) => {
								player.sex = sex;
							},
							player,
							sex
						);
						game.log(player, "将性别变为了", "#y" + get.translation(sex) + "性");
					}
					if (player.group !== group) {
						game.broadcastAll(
							(player, group) => {
								player.group = group;
								player.node.name.dataset.nature = get.groupnature(group);
							},
							player,
							group
						);
						game.log(player, "将势力变为了", "#y" + get.translation(group + 2));
					}
				}
			},
			mark(dialog, storage, player) {
				if (storage && storage.current) {
					dialog.addSmall([[storage.current], (item, type, position, noclick, node) => lib.skill.sgsxjxfzmnl_rehuashen.$createButton(item, type, position, noclick, node)]);
				}
				if (storage && storage.current2) {
					dialog.add('<div><div class="skill">【' + get.translation(lib.translate[storage.current2 + "_ab"] || get.translation(storage.current2).slice(0, 2)) + "】</div><div>" + get.skillInfoTranslation(storage.current2, player, false) + "</div></div>");
				}
				if (storage && storage.character.length) {
					if (player.isUnderControl(true)) {
						dialog.addSmall([storage.character, (item, type, position, noclick, node) => lib.skill.sgsxjxfzmnl_rehuashen.$createButton(item, type, position, noclick, node)]);
					} else {
						dialog.addText("共有" + get.cnNumber(storage.character.length) + "张“化身”");
					}
				} else {
					return "没有化身";
				}
			},
			content(storage, player) {
				return "共有" + get.cnNumber(storage.character.length) + "张“化身”";
			},
			markcount(storage, player) {
				if (storage && storage.character) {
					return storage.character.length;
				}
				return 0;
			},
		},
	},
	sgsxjxfzmnl_rexinsheng: {
		audio: 'rexinsheng',
		unique: true,
		trigger: { player: "damageEnd" },
		frequent: true,
		getIndex: event => event.num,
		filter(event) {
			return event.num;
		},
		async content(event, trigger, player) {
			lib.skill.sgsxjxfzmnl_rehuashen.addHuashens(player, 1);
		},
		ai: { combo: "sgsxjxfzmnl_rehuashen" },
	},




	
}