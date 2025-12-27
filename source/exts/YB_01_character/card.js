import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {card};

/** @type { importCharacterConfig['card'] } */
const card = {
	ybsl_fengmingjiuxiao:{
		audio:true,
		fullskin:true,
		type:'trick',
		enable:true,
		selectTarget:[1,3],
		filterTarget:function(card,player,target){
			return target!=player;
		},
		derivation:'ybsl_080phoenix',
		content:function(){
			"step 0"
			if(typeof event.baseDamage!='number') event.baseDamage=1;
			if(event.directHit) event._result={bool:false};
			else{
				var next=target.chooseToRespond({name:'shan'});
				next.set('ai',function(card){
					var evt=_status.event.getParent();
					if(get.damageEffect(evt.target,evt.player,evt.target)>=0) return 0;
					if(evt.player.hasSkillTag('notricksource')) return 0;
					if(evt.target.hasSkillTag('notrick')) return 0;
					if(evt.target.hasSkillTag('noShan')){
						return -1;
					}
				return get.order(card);
				});
				next.autochoose=lib.filter.autoRespondShan;
			}
			"step 1"
			if(result.bool==false){
				target.damage(event.baseDamage,'fire');
			}
		},
		ai:{
			wuxie:function(target,card,player,viewer){
				if(get.attitude(viewer,target)>0&&target.countCards('h','shan')){
					if(!target.countCards('h')||target.hp==1||Math.random()<0.7) return 0;
				}
			},
			basic:{
				order:9,
				useful:1,
				value:5
			},
			result:{
				target:function(player,target,card,isLink){
					var eff=function(){
						return -1.5;
					}();
					if(!isLink&&target.mayHaveShan()&&!player.hasSkillTag('directHit_ai',true,{
						target:target,
						card:card,
					},true)) return eff/1.2;
					return eff;
				},
			},
			tag:{
				respond:1,
				respondShan:1,
				damage:1,
				multitarget:1,
				multineg:1,
				fireDamage:function(card,nature){
					return 1;
				},
			}
		}
	},
	//-----------------------弥仙神术
	// 'ybsl_mixianshenshu':{
	// 	audio:true,
	// 	fullskin:true,
	// 	enable:true,
	// 	type:'trick',
	// 	filterTarget:true,
	// 	content:function (){
	// 		'step 0'
	// 		player.YB_control(lib.group.filter(function(group){
	// 			return['wei','shu','wu','qun','jin','shen','YB_memory','key']
	// 		})).set('ai',function(target){
	// 			return 'shen';
	// 		});
	// 		'step 1'
	// 		target.changeGroup(result.control);
	// 		target.draw(1);
	// 	},
	// 	chongzhu:true,
	// 	ai:{
	// 		order:2,
	// 		useful:0,
	// 		value:function(card,player,index,method){//不知道哪个参数有用，全写了
	// 			if(player.group!='shen'){
	// 				return 7;
	// 			}
	// 			else {return 0}
	// 		},
	// 		result:{
	// 			player:0,
	// 			target:0,
	// 		},
	// 	},
	// 	selectTarget:1,
	// },
	//-----------------------鹿鸣千转
	'ybsl_lumingqianzhuan':{
		enable:true,
		type:'trick',
		fullskin:true,
		derivation:'ybslshen_017xiaohong',
		filterTarget:function (card,player,target){
			return player!=target;
		},
		content:function (){
			'step 0'
			if(!event.ybsl_luming_name){
				if(player.isAlive()) player.chooseControl('喜啼','悲鸣').set('prompt','请选择'+get.translation(target)+'的标记').set('choice',function(){
					var e1=1.5*get.sgn(get.damageEffect(target,player,target));
					var e2=0;
					if(target.countGainableCards(player,'h')>0&&!target.hasSkillTag('noh')) e2=-1;
					var es=target.getGainableCards(player,'e');
					if(es.length) e2=Math.min(e2,function(){
						var max=0;
						for(var i of es) max=Math.max(max,get.value(i,target))
						return -max/4;
					}());
					if(Math.abs(e1-e2)<=0.3) return Math.random()<0.5?'喜啼':'悲鸣';
					if(e1<e2) return '喜啼';
					return '悲鸣';
				}()).set('ai',function(){
					return _status.event.choice;
				});
				else event.finish();
			}
			'step 1'
			if(!event.ybsl_luming_name&&result&&result.control) event.ybsl_luming_name=result.control;
			if(event.directHit) event._result={bool:false};
			else target.chooseToRespond('请打出一张【杀】或【闪】响应【鹿鸣千转】',function(card,player){
				var name=get.name(card);
				return name=='sha'||name=='shan';
			}).set('ai',function(card){
				if(_status.event.choice=='all'){
					var rand=get.rand('ybsl_lumingqianzhuan');
					if(rand>0.5) return 0;
					return 1+Math.random();
				}
				if(get.name(card)==_status.event.choice) return get.order(card);
				return 0;
			}).set('choice',function(){
				if(target.hasSkillTag('useShan')) return 'shan';
				if(typeof event.ybsl_luming_aibuff=='boolean'){
					var shas=target.getCards('h','sha'),shans=target.getCards('h','shan');
					if(event.ybsl_luming_aibuff){
						if(shas.length>=Math.max(1,shans.length)) return 'shan';
						if(shans.length>shas.length) return 'sha';
						return false;
					}
					if(!shas.length||!shans.length) return false;
				}
				var e1=1.5*get.sgn(get.damageEffect(target,player,target));
				var e2=0;
				if(target.countGainableCards(player,'h')>0&&!target.hasSkillTag('noh')) e2=-1;
				var es=target.getGainableCards(player,'e');
				if(es.length) e2=Math.min(e2,function(){
					var max=0;
					for(var i of es) max=Math.max(max,get.value(i,target))
					return -max/4;
				}());
				if(e1-e2>=0.3) return 'shan';
				if(e2-e1>=0.3) return 'sha';
				return 'all';
			}());
			'step 2'
			var name=result.bool?result.card.name:null,require=event.ybsl_luming_name;
			if(require=='喜啼'&&name!='sha') target.damage();
			else if(require=='悲鸣'&&name!='shan'&&target.countGainableCards(player,'he')>0) player.gainPlayerCard(target,true,'he');
		},
		ai:{
			order:5,
			tag:{
				damage:0.5,
				gain:0.5,
				loseCard:1,
				respondShan:1,
				respondSha:1,
			},
			result:{
				target:function (player,target){
					var e1=1.5*get.sgn(get.damageEffect(target,player,target));
					var e2=0;
					if(target.countGainableCards(player,'h')>0&&!target.hasSkillTag('noh')) e2=-1;
					var es=target.getGainableCards(player,'e');
					if(es.length) e2=Math.min(e2,function(){
						var max=0;
						for(var i of es) max=Math.max(max,get.value(i,target))
						return -max/4;
					}());
					if(game.hasPlayer(function(current){
						return current.hasSkill('yb017_mizhu')&&get.attitude(current,player)<=0;
					})) return Math.max(e1,e2);
					return Math.min(e1,e2);
				},
			},
		},
	},
	ybsl_zhezhiqiang:{
		derivation:'ybsl_070lvyanqiu',
		type:'equip',
		subtype:'equip1',
		fullskin:true,
		epic:true,
		distance:{attackFrom:-2},
		skills:['ybsl_zhezhiqiang'/*,'ybsl_zhezhiqiang_lose'*/],
		ai:{
			equipValue:4.2,
			basic:{
				equipValue:4.2,
			},
		},
		enable:true,
		selectTarget:-1,
		filterTarget:function (card,player,target){
			return target==player;
		},
		modTarget:true,
		allowMultiple:false,
		content:function (){
			if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
		},
		toself:true,
	},
	'ybsl_nohua':{
		audio:'ext:夜白神略/audio/card:true',
		fullskin:true,
		type:'basic',
		enable:true,
		savable:true,
		defaultYingbianEffect:"all",
		filterTarget:function(card,player,target){
			if(get.is.versus()){
				return player.side==target.side;
			}
			else{
				return true;
			}
		},
		selectTarget:[1,2],
		content:function(){
			'step 0'
			if(!event.card.yingbian_all){
				var list=[];
				var cards = ['ybsl_meihua','ybsl_lanhua','ybsl_zhuzi','ybsl_juhua'];
				for(var i of cards){
					list.add(['花朵','',i]);
				}
				var dialog=ui.create.dialog('请选择一种花朵的效果结算');
				dialog.add([list,'vcard']);
				// console.log(list);
				// console.log(dialog);
				target.chooseButton(dialog,true).set('filterButton',function(button){
					var target = _status.event.player;
					var player = player;
					return lib.card[button.link[2]].filterTarget('丈八二桃把营连',player,target)
				})
			}
			'step 1'
			if(result.bool){
				var list = [result.links[0]];
			}
			else {
				var list=[];
				var cards = ['ybsl_meihua','ybsl_lanhua','ybsl_zhuzi','ybsl_juhua'];
				for(var i of cards){
					list.add(['花朵','',i]);
				}
			}
			event.list = list;
			'step 2'
			if(event.list.length){
				for(var k of event.list){
					if(lib.card[k[2]].filterTarget(card,player,target)){
						var next=game.createEvent('YB_flower',false);
						next.player=player;
						next.target=target;
						next.setContent(
							lib.card[k[2]].content
						);
					}
					target.update();
				}
			}
			// else {
			// }
			// player.chooseCardB
			// 'step 1'
			// // target.draw(event.baseDamage||1);
			// target.turnOver(false);
			// 'step 2'
			// target.link(false);
			// 'step 3'
			// target.gainMaxHp(event.baseDamage||1);
			// 'step 4'
			// target.changeHujia(event.baseDamage||1);
			// 'step 5'
			// target.recover(event.baseDamage||1);
			// event.finish();
			// 'step 2'
			// var i=target.hp!=target.maxHp?0.75:1;
			// switch(Math.floor(Math.random()*4*i)){
			// 	case 0:return target.draw(event.baseDamage||1);break;
			// 	case 1:return target.gainMaxHp(event.baseDamage||1);break;
			// 	case 2:return target.changeHujia(event.baseDamage||1);break;
			// 	case 3:return target.recover(event.baseDamage||1);break;
			// }
		},
		ai:{
			basic:{
				useful:9,
				value:9,
				order:4
			},
			result:{
				target:function(player,target){
					var hs=target.getCards('h');
					if(hs.length<=1){
						return 0.3;
					}
					return Math.sqrt(target.countCards('he'));
				},
			},					
			tag:{
				recover:1,
				save:1,
			}
		},
	},
	ybsl_lingyu:{
		audio:true,
		fullskin:true,
		type:'delay',
		derivation:'ybsl_059starsFall4',
		// judge:function(card){
		// 	return 0;
		// },
		// effect:function(){},
		// ai:{
		// 	basic:{
		// 		order:1,
		// 		useful:1,
		// 		value:8,
		// 	},
		// 	result:{
		// 		target:0
		// 	},
		// },
		filterTarget:function(card,player,target){
			return lib.filter.judge(card,player,target);
		},
		judge:function(card){
			if(!get.suit(card)) return 1;
			return -2;
		},
		judge2:function(result){
			if(result.bool==false) return true;
			return false;
		},
		effect:function(){
			'step 0'
			var jud=true;
			if(player.storage.ybsl_lingyu){
				jud=false;
			}
			event.suit=result.suit;
			if(result.bool==false){
				if(player.countDiscardableCards(player,'h'))player.chooseToDiscard('h',jud).set('prompt','请弃置一张手牌，若此牌花色为'+get.translation(result.suit)+'你回复1点体力，否则失去1点体力。').set('ai',function(card){
					if(get.suit(card)==result.suit)return 16-get.value(card);
					return 6-get.value(card);
				});
			}
			else event.finish();
			'step 1'
			if(result.cards||player.storage.ybsl_lingyu){
				if(event.suit==get.suit(result.cards[0])||player.storage.ybsl_lingyu){
					player.recover();
					event.finish();
				}
			}
			'step 2'
			player.loseHp();
		},
	},
	// ybsl_lingyu_info:'出牌阶段，对一名场上角色使用。判定后，该角色需弃置一张手牌，若弃置了牌且此牌与判定结果花色相同，该角色回复1点体力，否则该角色失去1点体力。',
	//-----------------------醋
	'ybsl_cu':{//直接复制的过河
		audio:true,
		fullskin:true,
		type:'basic',
		derivation:'ybsl_019shengyan',
		enable:true,
		selectTarget:1,
		postAi:function (targets){
			return targets.length==1&&(targets[0].countCards('j')||targets[0].isDamaged());
		},
		filterTarget:function(card,player,target){
			if(get.is.versus()){
				return player.side==target.side&&target.hp!=target.maxHp;
			}
			else{
				return target.hp!=target.maxHp||target.countDiscardableCards(player,get.is.single()?'he':'hej');
			}
			return target.countDiscardableCards(player,get.is.single()?'he':'hej');
		},
		selectTarget:1,
		global:'ybsl_cu_discard',
		savable:true,
		// filterTarget:function (card,player,target){
			// if(player==target) return false;
			// return target.countDiscardableCards(player,get.is.single()?'he':'hej');
		// },
		defaultYingbianEffect:"add",
		content:function (){
			'step 0'
			if(cards.length)target.recover();
			'step 1'
			if(target.countDiscardableCards(player,'hej')){
				player.discardPlayerCard('hej',target,true);
				event.finish();
			}
			// 'step 0'
			// if(event.cards)target.recover();
			// 'step 1'
			// if(target.countDiscardableCards(player,'hej')){
			// 	player.discardPlayerCard('hej',target,true,event.cards?1:2);
			// 	event.finish();
			// }
		},
		ai:{
			basic:{
				order:9,
				useful:5,
				value:5,
			},
			// tag:{
			// 	recover:1,
			// 	save:1,
			// },
			// save:true,
			yingbian:function (card,player,targets,viewer){
				if(get.attitude(viewer,player)<=0) return 0;
				if(game.hasPlayer(function(current){
					return !targets.includes(current)&&lib.filter.targetEnabled2(card,player,current)&&get.effect(current,card,player,player)>0;
				})) return 6;
				return 0;
			},
			result:{
				target:function (player,target){
					var att=get.attitude(player,target);
					var nh=target.countCards('h');
					if(att>0){
						if(target.countCards('j',function(card){
							var cardj=card.viewAs?{name:card.viewAs}:card;
							return get.effect(target,cardj,target,player)<0;
						})>0) return 3;
						if(target.getEquip('baiyin')&&target.isDamaged()&&
							  get.recoverEffect(target,player,player)>0){
							if(target.hp==1&&!target.hujia) return 1.6;
						}
						if(target.countCards('e',function(card){
							if(get.position(card)=='e') return get.value(card,target)<0;
						})>0) return 1;
					}
					var es=target.getCards('e');
					var noe=(es.length==0||target.hasSkillTag('noe'));
					var noe2=(es.filter(function(esx){
						return get.value(esx,target)>0;
					}).length==0);
					var noh=(nh==0||target.hasSkillTag('noh'));
					if(noh&&(noe||noe2)) return 0;
					if(att<=0&&!target.countCards('he')) return 1.5;
					return -1.5;
				},
			},
			tag:{
				loseCard:1,
				discard:1,
			},
		},
	},
	'ybsl_tang':{
		derivation:'ybsl_024yuetong',
		global:'ybsl_tang_used',
		enable:true,
		audio:true,
		fullskin: true,
		type: "basic",
		savable: true,
		selectTarget:1,
		filterTarget:function(card,player,target){
			// if(get.is.versus()){
			// 	return player.side==target.side&&target.hp!=target.maxHp;
			// }
			// else{
				return target.hp!=target.maxHp;
			// }
		},
		content: function () {
			target.recover();
		},
		ai: {
			basic: {
				order: (card, player) => {
					if (player.hasSkillTag("pretao")) return 9;
					return 2;
				},
				useful: (card, i) => {
					let player = _status.event.player;
					if (!game.checkMod(card, player, "unchanged", "cardEnabled2", player)) return 2 / (1 + i);
					let fs = game.filterPlayer(current => {
							return get.attitude(player, current) > 0 && current.hp <= 2;
						}),
						damaged = 0,
						needs = 0;
					fs.forEach(f => {
						if (f.hp > 3 || !lib.filter.cardSavable(card, player, f)) return;
						if (f.hp > 1) damaged++;
						else needs++;
					});
					if (needs && damaged) return 5 * needs + 3 * damaged;
					if (needs + damaged > 1 || player.hasSkillTag("maixie")) return 8;
					if (player.hp / player.maxHp < 0.7) return 7 + Math.abs(player.hp / player.maxHp - 0.5);
					if (needs) return 7;
					if (damaged) return Math.max(3, 7.8 - i);
					return Math.max(1, 7.2 - i);
				},
				value: (card, player) => {
					let fs = game.filterPlayer(current => {
							return get.attitude(_status.event.player, current) > 0;
						}),
						damaged = 0,
						needs = 0;
					fs.forEach(f => {
						if (!player.canUse("tao", f)) return;
						if (f.hp <= 1) needs++;
						else if (f.hp == 2) damaged++;
					});
					if ((needs && damaged) || player.hasSkillTag("maixie")) return Math.max(9, 5 * needs + 3 * damaged);
					if (needs || damaged > 1) return 8;
					if (damaged) return 7.5;
					return Math.max(5, 9.2 - player.hp);
				},
			},
			result: {
				target: (player, target) => {
					if (target.hasSkillTag("maixie")) return 3;
					return 2;
				},
				target_use: (player, target, card) => {
					let mode = get.mode(),
						taos = player.getCards("hs", i => get.name(i) === "tao" && lib.filter.cardEnabled(i, target, "forceEnable"));
					if (target !== _status.event.dying) {
						if (
							!player.isPhaseUsing() ||
							player.needsToDiscard(0, (i, player) => {
								return !player.canIgnoreHandcard(i) && taos.includes(i);
							}) ||
							player.hasSkillTag(
								"nokeep",
								true,
								{
									card: card,
									target: target,
								},
								true
							)
						)
							return 2;
						let min = 8.1 - (4.5 * player.hp) / player.maxHp,
							nd = player.needsToDiscard(0, (i, player) => {
								return !player.canIgnoreHandcard(i) && (taos.includes(i) || get.value(i) >= min);
							}),
							keep = nd ? 0 : 2;
						if (nd > 2 || (taos.length > 1 && (nd > 1 || (nd && player.hp < 1 + taos.length))) || (target.identity === "zhu" && (nd || target.hp < 3) && (mode === "identity" || mode === "versus" || mode === "chess")) || !player.hasFriend()) return 2;
						if (
							game.hasPlayer(current => {
								return player !== current && current.identity === "zhu" && current.hp < 3 && (mode === "identity" || mode === "versus" || mode === "chess") && get.attitude(player, current) > 0;
							})
						)
							keep = 3;
						else if (nd === 2 || player.hp < 2) return 2;
						if (nd === 2 && player.hp <= 1) return 2;
						if (keep === 3) return 0;
						if (taos.length <= player.hp / 2) keep = 1;
						if (
							keep &&
							game.countPlayer(current => {
								if (player !== current && current.hp < 3 && player.hp > current.hp && get.attitude(player, current) > 2) {
									keep += player.hp - current.hp;
									return true;
								}
								return false;
							})
						) {
							if (keep > 2) return 0;
						}
						return 2;
					}
					if (target.isZhu2() || target === game.boss) return 2;
					if (player !== target) {
						if (target.hp < 0 && taos.length + target.hp <= 0) return 0;
						if (Math.abs(get.attitude(player, target)) < 1) return 0;
					}
					if (!player.getFriends().length) return 2;
					let tri = _status.event.getTrigger(),
						num = game.countPlayer(current => {
							if (get.attitude(current, target) > 0) return current.countCards("hs", i => get.name(i) === "tao" && lib.filter.cardEnabled(i, target, "forceEnable"));
						}),
						dis = 1,
						t = _status.currentPhase || game.me;
					while (t !== target) {
						let att = get.attitude(player, t);
						if (att < -2) dis++;
						else if (att < 1) dis += 0.45;
						t = t.next;
					}
					if (mode === "identity") {
						if (tri && tri.name === "dying") {
							if (target.identity === "fan") {
								if ((!tri.source && player !== target) || (tri.source && tri.source !== target && player.getFriends().includes(tri.source.identity))) {
									if (num > dis || (player === target && player.countCards("hs", { type: "basic" }) > 1.6 * dis)) return 2;
									return 0;
								}
							} else if (tri.source && tri.source.isZhu && (target.identity === "zhong" || target.identity === "mingzhong") && (tri.source.countCards("he") > 2 || (player === tri.source && player.hasCard(i => i.name !== "tao", "he")))) return 2;
							//if(player!==target&&!target.isZhu&&target.countCards('hs')<dis) return 0;
						}
						if (player.identity === "zhu") {
							if (
								player.hp <= 1 &&
								player !== target &&
								taos + player.countCards("hs", "jiu") <=
									Math.min(
										dis,
										game.countPlayer(current => {
											return current.identity === "fan";
										})
									)
							)
								return 0;
						}
					} else if (mode === "stone" && target.isMin() && player !== target && tri && tri.name === "dying" && player.side === target.side && tri.source !== target.getEnemy()) return 0;
					return 2;
				},
			},
			tag: {
				recover: 1,
				save: 1,
			},
		},
	},
	ybsl_minimahua:{
		derivation:'ybsl_003yanshuang',
		fullskin: true,
		type:'ybsl_lingshi',
		enable(card, player) {
			return player.YB_canEat();
		},
		toself: true,
		// filter(event,player){
		// 	return player.YB_canEat();
		// },
		selectTarget(){
			return -1;
		},
		modTarget(card, player, target) {
			return target.YB_canEat();
		},
		filterTarget(card, player, target) {
			return target == player && target.YB_canEat() ;
		},
		content(){
			'step 0'
			target.YB_addBaoshidu(1);
			'step 1'
			target.changeHujia(2);
		},
		ai:{
			order:10,
			value:2,
			result:{
				target:4,
			},
		},
	},
	ybsl_yumiruantang:{
		derivation:'ybsl_003yanshuang',
		fullskin: true,
		type:'ybsl_lingshi',
		enable(card, player) {
			return player.YB_canEat();
		},
		toself: true,
		// filter(event,player){
		// 	return player.YB_canEat();
		// },
		selectTarget(){
			return -1;
		},
		modTarget(card, player, target) {
			return target.YB_canEat();
		},
		filterTarget(card, player, target) {
			return target == player && target.YB_canEat() ;
		},
		content(){
			'step 0'
			target.YB_addBaoshidu(1);
			'step 1'
			target.recover(2);
		},
		savable: true,
		ai:{
			order:10,
			value:2,
			result:{
				target:4,
			},	
			tag:{
				recover:2,
				save:2,
			}
		},
	},
	ybsl_weihuabinggan:{
		derivation:'ybsl_003yanshuang',
		fullskin: true,
		type:'ybsl_lingshi',
		enable(card, player) {
			return player.YB_canEat();
		},
		toself: true,
		// filter(event,player){
		// 	return player.YB_canEat();
		// },
		selectTarget(){
			return -1;
		},
		modTarget(card, player, target) {
			return target.YB_canEat();
		},
		filterTarget(card, player, target) {
			return target == player && target.YB_canEat() ;
		},
		content(){
			'step 0'
			target.YB_addBaoshidu(1);
			'step 1'
			target.gainMaxHp(1);
		},
		ai:{
			order:10,
			value:2,
			result:{
				target:4,
			},
		},
	},
	ybsl_qiaokelibang:{
		derivation:'ybsl_003yanshuang',
		fullskin: true,
		type:'ybsl_lingshi',
		enable(card, player) {
			return player.YB_canEat();
		},
		toself: true,
		// filter(event,player){
		// 	return player.YB_canEat();
		// },
		selectTarget(){
			return -1;
		},
		modTarget(card, player, target) {
			return target.YB_canEat();
		},
		filterTarget(card, player, target) {
			return target == player && target.YB_canEat() ;
		},
		content(){
			'step 0'
			target.YB_addBaoshidu(1);
			'step 1'
			target.draw(3);
		},
		ai:{
			order:10,
			value:2,
			result:{
				target:4,
			},
		},
	},
	'faraway_spade':{
		fullskin:true,
	},
	'faraway_heart':{
		fullskin:true,
	},
	'faraway_club':{
		fullskin:true,
	},
	'faraway_diamond':{
		fullskin:true,
	},
	ybsl_107xiaohu1: {
		fullskin: true,
		type: 'equip',
		subtype: 'equip1',
		distance: {
			attackFrom: -1
		},
		skills: ['ybsl_107xiaohu'],
		ai: {
			equipValue: 9
		},
		onLose: function() {
			var card = event.cards[0];
			if (!card||card.name.slice(-1)=='ybsl_107xiaohu') return;
			else {
				card.YB_init([card.suit, card.number, 'ybsl_107xiaohu0', card.nature ,tag ]);
			}
		},
	},
	ybsl_107xiaohu2: {
		fullskin: true,
		type: 'equip',
		subtype: 'equip2',
		skills: ['ybsl_107xiaohu'],
		ai: {
			equipValue: 9
		},
		onLose: function() {
			var card = event.cards[0];
			if (!card||card.name.slice(-1)=='ybsl_107xiaohu') return;
			else {
				card.YB_init([card.suit, card.number, 'ybsl_107xiaohu0', card.nature ,tag ]);
			}
		},
	},
	ybsl_107xiaohu3: {
		fullskin: true,
		type: 'equip',
		subtype: 'equip3',
		distance: {
			globalFrom: -1
		},
		skills: ['ybsl_107xiaohu'],
		ai: {
			equipValue: 9
		},
		onLose: function() {
			var card = event.cards[0];
			if (!card||card.name.slice(-1)=='ybsl_107xiaohu') return;
			else {
				card.YB_init([card.suit, card.number, 'ybsl_107xiaohu0', card.nature ,tag ]);
			}
		},
	},
	ybsl_107xiaohu4: {
		fullskin: true,
		type: 'equip',
		subtype: 'equip4',
		distance: {
			globalTo: 1
		},
		skills: ['ybsl_107xiaohu'],
		ai: {
			equipValue: 9
		},
		onLose: function() {
			var card = event.cards[0];
			if (!card||card.name.slice(-1)=='ybsl_107xiaohu') return;
			else {
				card.YB_init([card.suit, card.number, 'ybsl_107xiaohu0', card.nature ,tag ]);
			}
		},
	},
	ybsl_107xiaohu5: {
		fullskin: true,
		type: 'equip',
		subtype: 'equip5',
		skills: ['ybsl_107xiaohu'],
		ai: {
			equipValue: 9
		},
		onLose: function() {
			var card = event.cards[0];
			if (!card||card.name.slice(-1)=='ybsl_107xiaohu') return;
			else {
				card.YB_init([card.suit, card.number, 'ybsl_107xiaohu0', card.nature ,tag ]);
			}
		},
	},
	ybsl_107xiaohu6: {
		fullskin: true,
		type: 'equip',
		subtype: 'equip6',
		distance: {
			globalFrom: -1,
			globalTo: 1,
		},
		skills: ['ybsl_107xiaohu'],
		ai: {
			equipValue: 9
		},
		onLose: function() {
			var card = event.cards[0];
			if (!card||card.name.slice(-1)=='ybsl_107xiaohu') return;
			else {
				card.YB_init([card.suit, card.number, 'ybsl_107xiaohu0', card.nature ,tag ]);
			}
		},
	},
	ybsl_107xiaohu0: {
		derivation:'ybsl_107tushanshuili',
		fullskin: true,
		type: 'equip',
		subtype: 'equip0',
		distance: {
			attackFrom: -1,
			globalFrom: -1,
			globalTo: 1,
		},
		skills: ['ybsl_107xiaohu'],
		ai: {
			equipValue: 9
		},
		onLose: function() {
			var card = event.cards[0];
			if (!card||card.name.slice(-1)=='ybsl_107xiaohu') return;
			else {
				card.YB_init([card.suit, card.number, 'ybsl_107xiaohu0', card.nature ,tag ]);
			}
		},
		content:function(){
			'step 0'
			if(cards.length&&get.position(cards[0],true)=='o'){
				event.list1 = ['武器', '防具', '防御马', '进攻马', '宝物', '双格马'];
				player.chooseControl(event.list1).set('prompt', '请选择将【小狐】当做哪种装备');
				
			}
			else event,finish();
			'step 1'
			if (result.control) {
				var num = result.index + 1;
				var name = 'ybsl_107xiaohu' + num;
				var tag = get.YB_tag(cards[0])
				cards[0].YB_init([cards[0].suit, cards[0].number, name, cards[0].nature ,tag]);
				player.equip(cards[0]);
			}

		},
	},
	group_YB_dream:{fullskin:true},
	group_YB_memory:{fullskin:true},
	
}