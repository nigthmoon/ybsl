import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {card};

/** @type { importCharacterConfig['card'] } */
const card = {
	'ybsl_zhaosanmusi': {
		audio: 'ext:夜白神略/audio/card:true',
		fullskin: true,
		type: 'trick',
		enable: true,
		selectTarget: -1,
		// cardcolor:'red',
		toself: true,
		filterTarget: function(card, player, target) {
			return target == player;
		},
		modTarget: true,
		content: function() {
			'step 0'
			var list = ['摸三弃四', '弃三摸四'];
			target.chooseControl(list).set('prompt', '请选择摸三弃四，还是弃三摸四').set('ai', function(control) {
				if (target.countCards('h') > 6) return 0;
				else return 1;
			});
			'step 1'
			if (result.control == '摸三弃四') {
				event.goto(6);
			}
			'step 2'
			'step 3'
			target.chooseCard('h', 3).set('ai', function(card) {
				if (target.isPhaseUsing()) return -get.useful(card);
				else return -get.value(card);
			})
			'step 4'
			if (result.cards) target.discard(result.cards);
			'step 5'
			target.draw(4);
			event.finish();
			'step 6'
			target.draw(3);
			'step 7'
			target.chooseCard('h', 4).set('ai', function(card) {
				if (target.isPhaseUsing()) return -get.useful(card);
				else return -get.value(card);
			})
			'step 8'
			if (result.cards) target.discard(result.cards);
		},
		ai: {
			basic: {
				order: 8,
				useful: 4,
				value: 3,
			},
			result: {
				target: 2,
			},
			tag: {
				// gain:2,
				draw: 3,
			},
		},
	},

	ybsl_ptchiling1:{
		cardimage:'ybsl_fengqiuhuang',
		ai:{
			value:1,
		}
	},
	ybsl_ptchiling2:{
		cardimage:'ybsl_fengqiuhuang',
		ai:{
			value:3,
		}
	},
	ybsl_ptchiling3:{
		cardimage:'ybsl_fengqiuhuang',
		ai:{
			value:5,
		}
	},
	ybsl_ptqiwu1:{
		cardimage:'tao',
		ai:{
			value:2,
		}
	},
	ybsl_ptqiwu2:{
		cardimage:'tao',
		ai:{
			value:4,
		}
	},
	ybsl_ptqiwu3:{
		cardimage:'tao',
		ai:{
			value:6,
		}
	},
	niya_wangmeizhike:{
		audio: true,
		fullskin: true,
		type: "delay",
		cardnature: "wood",
		modTarget(card, player, target) {
			return lib.filter.judge(card, player, target);
		},
		enable(card, player) {
			return player.canAddJudge(card);
		},
		filterTarget(card, player, target) {
			return lib.filter.judge(card, player, target) && player == target;
		},
		selectTarget: [-1, -1],
		toself: true,
		judge(card) {
			if (get.suit(card) == "diamond") {
				return 0;
			}
			return 2;
		},
		judge2(result) {
			if (result.bool == true) {
				return true;
			}
			return false;
		},
		effect() {
			if (result.bool == true) {
				player.chooseDrawRecover(2,true);
			}
		},
		ai: {
			basic: {
				order: 4,
				useful: 4,
				value: 1,
			},
			result: {
				target(player, target) {
					return 1;
				},
			},
		},
	

	},
}