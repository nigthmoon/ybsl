import { lib, game, ui, get, ai, _status } from '../../../../../noname.js';
export { skill };

/** @type { importCharacterConfig['skill'] } */
const skill = {
	//----------连招张辽
	zhangliao_yuxi: {
		trigger: {
			source: 'damageBegin2',
			player: 'damageBegin4',
		},
		audio:'dcyuxi',
		filter: () => true,
		check(){return true},
		content() {
			player.draw().gaintag = ['zhangliao_yuxi']
		},
		mod: {
			cardUsable: function (card, player, num) {
				if (!card.cards) return;
				for (var i of card.cards) {
					if (i.hasGaintag('zhangliao_yuxi')) return Infinity;
				}
			},
		},
		locked:false,
		group: 'zhangliao_yuxi_use',
		subSkill: {
			use: {
				popup: false,
				silent: true,
				firstDo: true,
				trigger: { player: "useCard1" },
				filter: (event, player) => event.addCount!==false&&event.card.isCard && player.hasHistory("lose", evt => evt.getParent() == event && Object.values(evt.gaintag_map).some(value => value.includes("zhangliao_yuxi"))),
				//以上代码借鉴自本体佐藤雏
				forced: true,
				content: function () {
					if (trigger.addCount !== false){
						trigger.addCount = false;
						var stat = player.getStat().card,
							name = trigger.card.name;
						if (typeof stat[name] == "number") stat[name]--;
					}
				},
			}
		}
	},
	zhangliao_porong: {
		audio:'dcporong',
		// getLianzhao: function () {
		// 	return [
		// 		function (card) { return get.tag(card, "damage")>0.5 },
		// 		function (card) { return get.name(card) == 'sha' }
		// 	]
		// },
		getLianzhao: function () {
			return [
				function (event,player) { return get.tag(event.card, "damage")>0.5 },
				function (event,player) { return get.name(event.card) == 'sha' }
			]
		},
		comboSkill: true,
		init(player) {
			player.storage.zhangliao_porong = 0;
		},
		trigger: {
			player: 'YB_zhangliao_porong',
		},
		check(event, player) {
			// 借鉴破戎：仅当相邻目标有可抢手牌时才发动，避免空结算
			const tg = (event.targets && event.targets.length) ? event.targets
				: (event.trigger && event.trigger.targets) ? event.trigger.targets
				: (event._triggered && event._triggered.targets) ? event._triggered.targets : [];
			for (const tar of tg) {
				if (!tar.isIn()) continue;
				const around = [tar, tar.getNext(), tar.getPrevious()];
				for (const i of around) {
					if (i && i != player && i.countGainableCards(player, 'h')) return true;
				}
			}
			return false;
		},
		filter() { return true; },
		mod: {
			aiOrder(player, card, num) {
				if (typeof card == 'object' && get.name(card, player) == 'sha' && (player.storage.zhangliao_porong || 0) >= 1) {
					return num + 10;
				}
			},
		},
		ai: {
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (!arg || !arg.card || get.name(arg.card, player) !== 'sha') return;
				return (player.storage.zhangliao_porong || 0) >= 1;
			},
		},
		async content(event, trigger, player) {
			// 连招“箭在弦上”：弹出“是否发动”询问，期间标记显示全蓝连招记录
			// let go = (await player.chooseBool(get.prompt(event.name) + '：是否发动连招？')
			// 	.set('ai', () => true)
			// 	.forResult()).bool;
			// if (!go) {
			// 	player.storage[event.name + '_lzasking'] = null;
			// 	return;
			// }
			player.storage[event.name + '_lzasking'] = null;
			trigger.effectCount++;
			let targets = trigger.targets.sortBySeat();
			for (var tar of targets) {
				if (tar.isIn()) {
					var players = [];
					player.line(tar, 'thunder');
					players.add(tar);
					if (tar.getNext() != player) players.add(tar.getNext());
					if (tar.getPrevious() != player) players.add(tar.getPrevious());
					players.sortBySeat();
					for (var i of players) {
						await player.gainPlayerCard(i, true, 'h');
					}
				}
			}
		},
		mark: true,
		intro: {
			content: function (storage, player) {
				var skill = 'zhangliao_porong';
				var list = ['伤害牌', '杀'], str = '';
				if (player.storage[skill + '_lzasking']) {
					// 连招“箭在弦上”：询问是否发动时，连招记录全蓝
					for (var i = 0; i < list.length; i++) {
						if (i > 0) str += '、';
						str += `<span class=bluetext>${list[i]}</span>`;
					}
					str += '<br><span class=bluetext>连招就绪·箭在弦上</span>';
					return str;
				}
				var num = storage;
				for (var i = 0; i < list.length; i++) {
					if (i > 0) str += '、';
					if (num > i) str += `<span class=thundertext>${list[i]}</span>`;
					else str += list[i];
				}
				return str;
			},
		}
	},
	//----------连招吕布
	lvbu_xiaowu: {
		// audio:'dcxiaowu',
		enable:'phaseUse',
		usable:1,
		filter:()=>true,
		content(){
			let card = false;
			card = get.cardPile2(card => {
				if (get.name(card) == "sha") return true;
				const str = lib.skill.shencai.getStr(card);
				return str.includes("【杀】");
			}, "top");
			if (card) {
				player.addTempSkill('lvbu_xiaowu_card');
				player.gain(card,'gain2').gaintag = ['lvbu_xiaowu_card']
			} 
			
		},
		group: ['lvbu_xiaowu_use','lvbu_xiaowu_damage'],
		subSkill: {
			damage:{
				audio:'lvbu_xiaowu',
				trigger:{
					source:'damageSource',
				},
				forced:true,
				filter(){return true},
				content(){
					if(player.getStat('skill').lvbu_xiaowu)delete player.getStat('skill').lvbu_xiaowu;
				},
			},
			use: {
				popup: false,
				silent: true,
				firstDo: true,
				trigger: { player: "useCard1" },
				filter: (event, player) => event.addCount!==false&&event.card.isCard &&player.hasHistory("lose",evt => evt.getParent() == event &&Object.values(evt.gaintag_map).some(value => value.includes("lvbu_xiaowu_card"))),
				//以上代码借鉴自本体佐藤雏
				forced: true,
				content: function () {
					if (trigger.addCount !== false){
						trigger.addCount = false;
						var stat = player.getStat().card,
							name = trigger.card.name;
						if (typeof stat[name] == "number") stat[name]--;
					}
				},
			},
			card:{
				mod: {
					cardUsable: function (card, player, num) {
						if (!card.cards) return;
						for (var i of card.cards) {
							if (i.hasGaintag('lvbu_xiaowu_card')) return Infinity;
						}
					},
				},
				onremove:function(player){
					player.removeGaintag('lvbu_xiaowu_card');
				},
			}
		}
	},
	lvbu_baguan: {
		// audio:'dcbaguan',
		lianzhao_wushuang:true,
		getLianzhao: function () {
			return [
				function (event,player) { return event.targets&&event.targets.includes(player) },
				function (event,player) { return get.subtype(event.card) == 'equip1' }
			]
		},
		init(player) {
			player.storage.lvbu_baguan = 0;
		},
		trigger: {
			player: 'YB_lvbu_baguanEnd',
		},
		check(){return true},
		filter() { return true; },
		direct:true,
		async content(){
			'step 0'
			// 连招“箭在弦上”：弹出“是否发动”询问，期间标记显示全蓝连招记录
			// let go = (await player.chooseBool(get.prompt(event.name) + '：是否发动连招？')
			// 	.set('ai', () => true)
			// 	.forResult()).bool;
			// if (!go) {
			// 	player.storage[event.name + '_lzasking'] = null;
			// 	event.finish();
			// 	return;
			// }
			// 发动：清除“箭在弦上”记录
			player.storage[event.name + '_lzasking'] = null;
			var cards=player.getCards('e',card=>get.subtype(card)=='equip1');
			var num=0,num2=0;
			if(cards){
				for(let i of cards){
					num+=get.cardNameLength(i,player);
					var num3=get.info(i, false).distance.attackFrom||0;
					num2+=(1-num3);
				}
				event.num2=num2;
				if(num>0){
					var ybnext=game.createEvent('lvbu_baguan_shat');
					ybnext.player=player;
					ybnext.skillname='lvbu_baguan_shat';
					ybnext.skillnamep='lvbu_baguan';
					ybnext.setContent(function(){
						'step 0'
						var next = player.chooseToUse();
						next.set("openskilldialog", get.prompt2(event.skillnamep));
						next.set("norestore", true);
						next.set('addCount',false);
						next.set("_backupevent", event.skillname);
						next.set("custom", {
							add: {},
							replace: {
								window: function () { }
							},
						});
						next._triggered = null;
						next.backup(event.skillname);
						// next.logSkill='lvbu_baguan';
					});
				}
			}
			else event.finish();
			
		},
		group:['lvbu_baguan_use'/*,'lvbu_baguan_sha'*/],
		subSkill:{
			sha:{
				filterCard: true,
				viewAs: { name: "sha" },
				complexCard: true,
				filter: function (event, player) {
					return player.countCards("h") >= 0;
				},
				enable:['chooseToUse'],
				position:'h',
				viewas:(cards,player)=>{
					return {
						name:'sha',
						isCard:true,
					}
				},
				complexCard: true,
				selectCard:function(){
					var player=_status.event.player;
					var cards=player.getCards('e',card=>get.subtype(card)=='equip1');
					var num=0;
					for(let i of cards){
						num+=get.cardNameLength(i,player);
					}
					if(num>0){
						return [1,num];
					}
				},
				prompt:function(){
					var player=_status.event.player;
					var cards=player.getCards('e',card=>get.subtype(card)=='equip1');
					var num=0,num2=0;
					for(let i of cards){
						num+=get.cardNameLength(i,player);
						var num3=get.info(i, false).distance.attackFrom||0;
						num2+=(1-num3);
					}
					return '将至多'+num+'张手牌当杀使用'
				},
				check:function(card){
					var val=get.value(card);
					return 5-val;
				},
				precontent(){
					var cardsx=player.getCards('e',card=>get.subtype(card)=='equip1');
					var num2=0;
					for(let i of cardsx){
						var num3=get.info(i, false).distance.attackFrom||0;
						num2+=(1-num3);
					}
					event.result.card.lvbu_baguan=num2;
				},

			},
			shat:{
				filterCard: true,
				viewAs: { name: "sha" },
				complexCard: true,
				filter: function (event, player) {
					return player.countCards("h") >= 0;
				},
				enable:['chooseToUse'],
				position:'h',
				viewas:(cards,player)=>{
					return {
						name:'sha',
						isCard:true,
					}
				},
				complexCard: true,
				selectCard:function(){
					var player=_status.event.player;
					var cards=player.getCards('e',card=>get.subtype(card)=='equip1');
					var num=0;
					for(let i of cards){
						num+=get.cardNameLength(i,player);
					}
					if(num>0){
						return [1,num];
					}
				},
				prompt:function(){
					var player=_status.event.player;
					var cards=player.getCards('e',card=>get.subtype(card)=='equip1');
					var num=0;
					for(let i of cards){
						num+=get.cardNameLength(i,player);
					}
					return '将至多'+num+'张手牌当杀使用'
				},
				check:function(card){
					var val=get.value(card);
					return 5-val;
				},
				precontent(){
					let num2=event.result.cards.length;
					event.result.card.lvbu_baguan=num2;
				},

			},
			use:{
				trigger: {
					player:'useCard1',
				},
				direct:true,
				filter(event,player){
					return event.card.lvbu_baguan>=0;
				},
				content(){
					trigger.baseDamage=trigger.card.lvbu_baguan;
				}
			}
		},
		mark: true,
		intro: {
			content: function (storage, player) {
				var num = storage, list = ['指定自己为目标的牌', '武器牌'], str = '';
				for (var i = 0; i < list.length; i++) {
					if (i > 0) str += '、';
					if (num > i) str += `<span class=thundertext>${list[i]}</span>`;
					else str += list[i];
				}
				str+='<br>此连招不会被其他牌打断';
				return str;
			},
		}
	},
};
