import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {card};
const card = {
	yzdel_mera:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: 1,
		filterTarget: function (card, player, target) {
			return target != player;
		},
		manaCost:2,
		content: function () {
			target.damage(1, "fire");
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return -2;
				},
			},
			tag: {
				damage: true,
				fireDamage:true,
			},
		},
	},
	yzdel_merami:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: 1,
		filterTarget: function (card, player, target) {
			return target != player;
		},
		manaCost:6,
		content: function () {
			target.damage(3, "fire");
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return -6;
				},
			},
			tag: {
				damage: true,
				fireDamage:true,
			},
		},
	},
	yzdel_merazolma:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: 1,
		filterTarget: function (card, player, target) {
			return target != player;
		},
		manaCost:15,
		content: function () {
			target.damage(6, "fire");
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return -12;
				},
			},
			tag: {
				damage: true,
				fireDamage:true,
			},
		},
	},
	yzdel_gira:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: [1,2],
		filterTarget: function (card, player, target) {
			return target != player;
		},
		manaCost:4,
		content: function () {
			target.damage(1, "fire");
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return -2;
				},
			},
			tag: {
				damage: true,
				fireDamage:true,
			},
		},
	},
	yzdel_begirama:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: [1,3],
		filterTarget: function (card, player, target) {
			return target != player;
		},
		manaCost:4,
		content: function () {
			target.damage(2, "fire");
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return -4;
				},
			},
			tag: {
				damage: true,
				fireDamage:true,
			},
		},
	},
	yzdel_begiragon:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: [1,3],
		filterTarget: function (card, player, target) {
			return target != player;
		},
		manaCost:4,
		content: function () {
			target.damage(4, "fire");
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return -8;
				},
			},
			tag: {
				damage: true,
				fireDamage:true,
			},
		},
	},
};
// if(player&&player.name1&&lib.characterLightext&&lib.characterLightext[player.name1]&&lib.characterLightext[player.name1](player)){
// 	var ybstr = lib.characterLightext[player.name1](player)[lib.characterLightext[player.name1](player).length-1]
// 	// ui.create.div(".xcaption", "武将缘分", rightPane.firstChild);
// 	ui.create.div(".xskill", ybstr, rightPane.firstChild)
// 	// ui.create.div(".xskill","<div data-color>" + ybstr+ "</div>", rightPane.firstChild)
// }