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
		manaCost:6,
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
		manaCost:12,
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

	yzdel_io:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: -1,
		filterTarget: function (card, player, target) {
			return player.isEnemyOf(target);
		},
		manaCost:5,
		content: function () {
			target.damage(1);
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
			},
		},
	},
	yzdel_iora:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: -1,
		filterTarget: function (card, player, target) {
			return player.isEnemyOf(target);
		},
		manaCost:10,
		content: function () {
			target.damage(3);
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
			},
		},
	},
	yzdel_ionazun:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: -1,
		filterTarget: function (card, player, target) {
			return player.isEnemyOf(target);
		},
		manaCost:15,
		content: function () {
			target.damage(5);
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return -10;
				},
			},
			tag: {
				damage: true,
				fireDamage:true,
			},
		},
	},

	yzdel_hiyado:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: 1,
		filterTarget: function (card, player, target) {
			return target != player;
		},
		manaCost:3,
		content: function () {
			target.damage(1, "ice");
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
				iceDamage:true,
			},
		},
	},
	yzdel_hiyadaruko:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: [1,3],
		filterTarget: function (card, player, target) {
			return target != player;
		},
		manaCost:8,
		content: function () {
			target.damage(2, "ice");
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
				iceDamage:true,
			},
		},
	},
	yzdel_hiyadain:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: -1,
		filterTarget: function (card, player, target) {
			return player.isEnemyOf(target);
		},
		manaCost:13,
		content: function () {
			target.damage(3, "ice");
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
				iceDamage:true,
			},
		},
	},
	yzdel_mahiyado:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: [1,3],
		filterTarget: function (card, player, target) {
			return target != player;
		},
		manaCost:15,
		content: function () {
			target.damage(4, "ice");
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
				iceDamage:true,
			},
		},
	},

	yzdel_raidein:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: [1,2],
		filterTarget: function (card, player, target) {
			return target != player;
		},
		manaCost:8,
		content: function () {
			target.damage(2, "thunder");
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
				thunderDamage:true,
			},
		},
	},
	yzdel_gigadein:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: [1,3],
		filterTarget: function (card, player, target) {
			return target != player;
		},
		manaCost:8,
		content: function () {
			target.damage(3, "thunder");
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
				thunderDamage:true,
			},
		},
	},
	yzdel_bagikerosu:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: 1,
		filterTarget: function (card, player, target) {
			return player.isEnemyOf(target);
		},
		manaCost:15,
		content: function () {
			target.damage(8, "thunder");
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return -20;
				},
			},
			tag: {
				damage: true,
				thunderDamage:true,
			},
		},
	},
	
	YB_windDamage: {
		ai: {
			result: {
				target: -1.5,
			},
			tag: {
				damage: 1,
				YB_windDamage: 1,
				// natureDamage: 1,
			},
		},
	},
	yzdel_bagi:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: [1,2],
		filterTarget: function (card, player, target) {
			return target != player;
		},
		manaCost:3,
		content: function () {
			target.damage(1, "YB_wind");
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
				YB_windDamage:true,
			},
		},
	},
	yzdel_bagima:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: [1,3],
		filterTarget: function (card, player, target) {
			return target != player;
		},
		manaCost:8,
		content: function () {
			target.damage(3, "YB_wind");
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
				YB_windDamage:true,
			},
		},
	},
	yzdel_bagikerosu:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: -1,
		filterTarget: function (card, player, target) {
			return player.isEnemyOf(target);
		},
		manaCost:15,
		content: function () {
			target.damage(5, "YB_wind");
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return -10;
				},
			},
			tag: {
				damage: true,
				YB_windDamage:true,
			},
		},
	},
	
	yzdel_hoimi:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: 1,
		filterTarget: function (card, player, target) {
			return target.isDamaged();
		},
		manaCost:2,
		content: function () {
			target.recover(1);
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return 2;
				},
			},
			tag: {
				recover: 1,
				// save: 1,
			},
		},
	},
	yzdel_behoimi:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: 1,
		filterTarget: function (card, player, target) {
			return target.isDamaged();
		},
		manaCost:6,
		content: function () {
			target.recover(3);
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return 6;
				},
			},
			tag: {
				recover: 3,
				// save: 1,
			},
		},
	},
	yzdel_behoma:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: 1,
		filterTarget: function (card, player, target) {
			return target.isDamaged();
		},
		manaCost:9,
		content: function () {
			target.recover(target.maxHp - target.hp);
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return target.maxHp - target.hp;
				},
			},
			tag: {
				recover: 10,
				// save: 1,
			},
		},
	},
	yzdel_behomaral:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: [1,3],
		filterTarget: function (card, player, target) {
			return target.isDamaged();
		},
		manaCost:12,
		content: function () {
			target.recover(3);
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return 6;
				},
			},
			tag: {
				recover: 1,
				// save: 1,
			},
		},
	},
	yzdel_behomazun:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		selectTarget: [1,3],
		filterTarget: function (card, player, target) {
			return target.isDamaged();
		},
		manaCost:20,
		content: function () {
			target.recover(target.maxHp - target.hp);
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return target.maxHp - target.hp;
				},
			},
			tag: {
				recover: 10,
				// save: 1,
			},
		},
	},

	yzdel_zaoraru:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		deadTarget: true,
		savable: true,
		filter: () => game.dead,
		onChooseToUse: function (event) {
			event.deadTarget = true;
		},
		selectTarget: 1,
		filterTarget: function (card, player, target) {
			return target.isDead()
		},
		manaCost:10,
		content: function () {
			target.revive(Math.ceil(target.maxHp/2),true)
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return Math.ceil(target.maxHp/2)+10;
				},
			},
			tag: {
				// recover: 1,
				save: 1,
			},
		},
	},
	yzdel_zaoriku:{
		audio: true,
		enable: true,
		type: "ybsl_magicSkill",
		fullskin: true,
		deadTarget: true,
		savable: true,
		filter: () => game.dead,
		onChooseToUse: function (event) {
			event.deadTarget = true;
		},
		selectTarget: 1,
		filterTarget: function (card, player, target) {
			return target.isDead()
		},
		manaCost:20,
		content: function () {
			target.revive(target.maxHp,true)
		},
		ai: {
			basic: {
				order: 5,
				useful: 2,
				value: 8,
			},
			result: {
				target:function(player,target){
					return target.maxHp+10;
				},
			},
			tag: {
				// recover: 1,
				save: 1,
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