"use strict";
//一个模板
game.import('character',function(lib, game, ui, get, ai, _status){ 
	var ybnew1={ 
		name:'ybnew1', //武将包命名（必填） 
		connect:true, //该武将包是否可以联机（必填） 
		// connectBanned:['gz_ybsl_018zhangqing_feian','gz_ybslshen_002chenailin_feian','db_ybsp_038tengwu'],
		characterSort:{
			ybnew1:{
				ybsl_ybsl2:[
					
				],
				ybsl_qygc:[
					'ybsl_xuyou'
				],
				ybsl_bqbs:[
					'ybsl_lvyi'
				],
				ybsl_clan:[
					'ybslclan_luxun','ybslclan_luyan','ybslclan_luji','ybslclan_lukang','ybslclan_lukai',
					'ybslclan_luyusheng'
				],
			},
		},
		character:{ //武将格式 : 
			//忆包新将
			//群友共创
			ybsl_xuyou:['male','qun',3,['ybsl_zigong','ybsl_zicai'],['legend']],//许攸
			//别群比赛
			ybsl_lvyi:['male','shu',3,['ybsl_jianyue','ybsl_tuntian','ybsl_quanfan'],['legend']],//吕乂
			//宗族武将
			ybslclan_luxun:['male','wu',3,['ybsl_lxtujing','ybsl_lxweiyu','ybsl_clanxingzu'],['epic','clan:吴郡陆氏']],//族陆逊
			ybslclan_luyan:['male','wu',4,['ybsl_lyyaoe','tiandu','ybsl_lykangming','ybsl_clanxingzu'],['epic','clan:吴郡陆氏']],//族陆延
			//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
		}, //武将（必填） 
		characterIntro:{
			lvyi:'吕乂（？-251年），字季阳，荆州南阳（今河南省南阳市）。三国时期蜀汉官员。吕乂出身南阳吕氏，自幼丧父，喜好读书弹琴。初任典曹都尉，管理盐税，迁绵竹县令，政绩卓著，拜巴西太守。诸葛亮北伐中原，以为汉中太守，督促农事，供应兵员军需粮草。诸葛亮死后，累迁蜀郡太守。后来，入朝担任尚书，辅佐费祎，代董允为尚书令。吕乂任职内外，生活俭朴，谦虚少言，为政简明，执法严苛，以清明能干著称。延熙十四年（251年），去世。',
		},//武将介绍（选填） 
		/*快捷复制：
		<span class=yellowtext>文字</span>暗亮双色
		<span class=thundertext>文字</span>
		<span class=thundertext></span>
		<font color=cyan>文字</font>自带单色
		<span style=\'color:#00c4ff\'>文字</span>自写颜色
		<br/>换行
		<li>点
		<span style="opacity:0.5;"></span>字体变淡
		<span style="font-family: yuanli">东吴命运线</span>
		<span style="text-decoration: line-through;">杀</span>字体划掉

		*/
		characterReplace:{//同名武将切换
			
		},//同名武将切换
		perfectPair:{//珠联璧合
			
		},//珠联璧合武将（选填）
		characterFilter:{//禁用
			
			//傀夜白和傀儡在国战禁用
		},//武将使用条件
		characterTitle:{//称号
			ybsl_xuyou:'夜白设计',
			ybsl_lvyi:'汉尚书令',
		},//武将标题（用于写称号或注释）（选填） 
		skill:{
			//-------------------------群友共创
			//许攸
			ybsl_zigong:{
				audio:'nzry_shicai',
				trigger: { player: "gainEnd" },
				filter:function(event, player) {
					// game.log( event.getParent().skill );
					// game.log( event.getParent().name );
					// game.log( event.getParent(2).skill );
					// game.log( event.getParent(2).name );
					// game.log( event.getParent(2) );
					if (event.getParent(2).name == "ybsl_zigong") return false;
					return true;
				},
				// check:true,
				check:function(event, player) {
					return true;
				},
				content:function*(event,map){
					let trigger=map.trigger,player=map.player;
					var cards=trigger.cards;
					let num=Math.min(cards.length,5);
					yield player.discard(trigger.cards);
					yield player.draw(num);
				},
			},
			ybsl_zicai:{
				audio:'nzry_chenglue',
				trigger:{ player:'discardAfter', },
				check:function(event, player) {
					return true;
				},
				filter:function(event, player) {
					return true;
				},
				derivation:'ybsl_zhaosanmusi',
				content:function*(event,map){
					let trigger=map.trigger,player=map.player;
					var cards=trigger.cards;
					let num=Math.min(cards.length,5);
					switch(num){
						case 0:event.finish();break;
						case 1:yield player.chooseUseTarget(
							{
								name: "sha",
								nature: "fire",
								isCard: true,
								card: cards,
							},
							cards,
							"请选择火【杀】的目标。",
							false
						);break;
						case 2:yield player.chooseUseTarget(
							{
								name: "diaobingqianjiang",
								isCard: true,
								card: cards,
							},
							cards,
							"是否使用【调兵谴将】。",
							false
						);break;
						case 3:yield player.chooseUseTarget(
							{
								name: "yiyi",
								isCard: true,
								card: cards,
							},
							cards,
							"是否使用【以逸待劳】。",
							false
						);break;
						case 4:yield player.chooseUseTarget(
							{
								name: "zengbin",
								isCard: true,
								card: cards,
							},
							cards,
							"是否使用【增兵减灶】。",
							false
						);break;
						default:yield player.chooseUseTarget(
							{
								name: "ybsl_zhaosanmusi",
								isCard: true,
								card: cards,
							},
							cards,
							"是否使用【朝三暮四】。",
							false
						);break;
					}
				},
			},
			//别群比赛（练手作品）
			//吕乂
			ybsl_jianyue: {
				audio:'ext:夜白神略/audio/character:2',
				trigger: { player: "judgeEnd" },
				preHidden: true,
				check(event, player) {
					return player.hasUseTarget(event.result.card);
				},
				filter(event, player) {
					return get.position(event.result.card, true) == "o"&&player.hasUseTarget(event.result.card);
				},
				async content(event, trigger, player) {
					player.chooseUseTarget(trigger.result.card,false);
				},
			},
			ybsl_tuntian:{
				audio:'ext:夜白神略/audio/character:2',
				trigger: {
					player: "loseAfter",
					global: [
						"equipAfter",
						"addJudgeAfter",
						"gainAfter",
						"loseAsyncAfter",
						"addToExpansionAfter",
					],
				},
				frequent: true,
				preHidden: true,
				filter: function (event, player) {
					if (player == _status.currentPhase) return false;
					if (event.name == "gain" && event.player == player) return false;
					var evt = event.getl(player);
					return evt && evt.cards2 && evt.cards2.length > 0;
				},
				content:function*(event,map){
					let trigger=map.trigger,player=map.player;
					var result =yield player.judge(function (card) {
						if (get.suit(card) == "heart") return -1;
						return 1;
					}).set('judge2',function (result) {
						return result.bool;
					});
					if (!result.bool || get.position(result.card) != "d") {
						//game.cardsDiscard(card);
						event.finish();
						return;
					}
					else{
						var card = result.card;
						var next=yield player.chooseBool("是否将" + get.translation(card) + "作为“田”置于武将牌上？").ai =
							function () {
								return true;
							};
						if (!next.bool && !event.directbool) {
							return;
						}
						else{
							yield player.addToExpansion(card, "gain2").gaintag.add("tuntian");
						}
					}
					
				},
				// content: function () {
					// "step 0";
					// var next = player.judge(function (card) {
						// if (get.suit(card) == "heart") return -1;
						// return 1;
					// });
					// next.judge2 = function (result) {
						// return result.bool;
					// };
					// // next.callback = lib.skill.ybsl_tuntian.callback;
					// "step 1";
					// if (!result.bool || get.position(result.card) != "d") {
						// //game.cardsDiscard(card);
						// event.finish();
						// return;
					// }
					// event.card = result.card;
					// player.chooseBool("是否将" + get.translation(event.card) + "作为“田”置于武将牌上？").ai =
						// function () {
							// return true;
						// };
					// "step 2";
					// if (!result.bool && !event.directbool) {
						// return;
					// }
					// player.addToExpansion(event.card, "gain2").gaintag.add("tuntian");
				// },
				// callback: function () {
					// if (!event.judgeResult.bool) {
						// event.finish();
						// return;
					// }
					// player.addToExpansion(event.judgeResult.card, "gain2").gaintag.add("tuntian");
				// },
				marktext: "田",
				intro: {
					content: "expansion",
					markcount: "expansion",
				},
				onremove: function (player, skill) {
					var cards = player.getExpansions(skill);
					if (cards.length) player.loseToDiscardpile(cards);
				},
				group: "ybsl_tuntian_dist",
				locked: false,
				subSkill: {
					dist: {
						locked: false,
						mod: {
							globalFrom: function (from, to, distance) {
								var num = distance - from.getExpansions("tuntian").length;
								if (
									_status.event.skill == "jixi_backup" ||
									_status.event.skill == "gzjixi_backup"
								)
									num++;
								return num;
							},
						},
					},
				},
				ai: {
					effect: {
						target: function (card, player, target, current) {
							if (
								typeof card === "object" &&
								get.name(card) === "sha" &&
								target.mayHaveShan(
									player,
									"use",
									target.getCards("h", (i) => {
										return i.hasGaintag("sha_notshan");
									})
								)
							)
								return [0.6, 0.75];
							if (!target.hasFriend() && !player.hasUnknown()) return;
							if (_status.currentPhase == target || get.type(card) === "delay") return;
							if (
								card.name != "shuiyanqijunx" &&
								get.tag(card, "loseCard") &&
								target.countCards("he")
							) {
								if (target.hasSkill("ziliang")) return 0.7;
								return [0.5, Math.max(2, target.countCards("h"))];
							}
							if (target.isUnderControl(true, player)) {
								if (
									(get.tag(card, "respondSha") && target.countCards("h", "sha")) ||
									(get.tag(card, "respondShan") && target.countCards("h", "shan"))
								) {
									if (target.hasSkill("ziliang")) return 0.7;
									return [0.5, 1];
								}
							} else if (get.tag(card, "respondSha") || get.tag(card, "respondShan")) {
								if (get.attitude(player, target) > 0 && card.name == "juedou") return;
								if (get.tag(card, "damage") && target.hasSkillTag("maixie")) return;
								if (target.countCards("h") == 0) return 2;
								if (target.hasSkill("ziliang")) return 0.7;
								if (get.mode() == "guozhan") return 0.5;
								return [
									0.5,
									Math.max(
										target.countCards("h") / 4,
										target.countCards("h", "sha") + target.countCards("h", "shan")
									),
								];
							}
						},
					},
					threaten: function (player, target) {
						if (target.countCards("h") == 0) return 2;
						return 0.5;
					},
					nodiscard: true,
					nolose: true,
				},
			},
			ybsl_quanfan:{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return (player.getExpansions("tuntian").length > 0 || player.countDiscardableCards(player,'he'))&&game.countPlayer(function(current){
						return current!=player&&(ai.get.attitude(player,current)<0);
					})>0
				},
				check:function (card){
					return 8-get.value(card);
				},
				chooseButton: {
					dialog: function (event, player) {
						var dialog=ui.create.dialog('请选择一张手牌或田');
						if(player.countDiscardableCards(player,'he')){
							dialog.add("手牌");
							dialog.add(player.getCards('h'));
						}
						if(player.getExpansions("tuntian").length > 0){
							dialog.add("田");
							dialog.add(player.getExpansions("tuntian"));
						}
						return dialog;
					},
					backup: function (links, player) {
						return {
							audio: "ybsl_quanfan",
							filterTarget: false,
							filterCard: function () {
								return false;
							},
							selectCard: -1,
							card: links[0],
							delay: false,
							content: lib.skill.ybsl_quanfan.contentx,
							ai: {
								order: 10,
								result: {
									target: function (player, target) {
										return -2;
									},
								},
							},
						};
					},
					// prompt: function () {
						// return "请选择〖劝范〗的目标";
					// },
				},
				contentx:function (){
					'step 0'
					var vard=lib.skill.ybsl_quanfan_backup.card;
					player.discard(vard);
					'step 1'
					var next = player.judge(function (card) {
						if (get.suit(card) == "heart") return -1;
						return 1;
					});
					next.judge2 = function (result) {
						return result.bool;
					};
					'step 2'
					event.card=result.card;
					if(game.filterPlayer().filter(tar=>tar!=player&&tar.countCards('h')))player.chooseTarget('展示一名其他角色的至多Y张手牌（Y为其体力值且至多为5），弃置其中与判定颜色相同的牌。',true,function(card,player,target){
						return target.countCards('h')&&target!=player;
					}).set('ai',function(target){
						return -get.attitude(_status.event.player,target);
					});
					else event.finish();
					'step 3'
					if(result.bool){
						delete result.cards;
						event.target=result.targets[0];
						player.choosePlayerCard(
							event.target,
							"h",
							[1, Math.min(event.target.countCards("he"), 5, event.target.hp)],
							'展示一名其他角色的至多Y张手牌（Y为其体力值且至多为5），弃置其中与判定颜色相同的牌。',
						).set("forceAuto", true);
					}
					else event.finish();
					'step 4'
					if(result.bool){
						var cards=result.cards,cards2=[];
						event.target.showCards(cards);
						for(var i = 0; i < cards.length; i++){
							if(get.color(cards[i])==get.color(event.card))cards2.push(cards[i]);
						}
						event.target.discard(cards2);
					}
				},
				ai:{
					order:9,
					result:{
						player:1,
						// target:-2,
					},
					threaten:2,//嘲讽值
				},
			},
			//宗族武将
			
			
			ybsl_clanxingzu:{
				clanSkill: true,
				trigger:{
					player:'useCardAfter',
				},
				filter:function(event,player){
					if(player.getStat("damage")) return false;
					var list = [];
					player.getHistory("useCard", function (evt) {
						if(evt.card!=event.card)list.push(evt.card);
					});
					for(var i of list){
						if(get.type2(i)==get.type2(event.card)) return false;
					}
					return true;
				},
				direct:true,
				content:function*(event,map){
					let trigger=map.trigger,player=map.player;
					var list=get.YB_clan(player,true);
					var list2={};
					for(var k of list){
						var skills=get.YB_pu1(k);
						// for(var yb of skills){
							// if(lib.skill[yb].filter&&lib.skill[yb].filter(event,k)!=true) skills.remove(yb);
						// }
						if(!skills.length)list.remove(k);
					}
					if(list.length){
						var cho=player.chooseTarget(1,function(card,player,target){
							return list.includes(target)
						}).set('prompt','请选择一名同族角色，令其发动一个出牌阶段限一次的技能').set('ai',function(target){
							if(list.includes(player))return target==player;
							else {
								return get.attitude(player,target);
							}
						})
						var tar=yield cho;
						if(tar.targets){
							var skillList=[];
							player.logSkill('ybsl_clanxingzu');
							var list66=get.YB_pu1(tar.targets[0]);
							// for(var z of list66){
								// if(lib.skill[z].filter&&lib.skill[z].filter(event,tar.targets[0])!=true) list66.remove(z);
							// }
							var skill=yield tar.targets[0].YB_control(list66,8,'请选择一个出限一技能发动');
							if(skill.control){
								var skillName = skill.control;
								//↓此段代码感谢霸天大佬的指导
								var next = tar.targets[0].chooseToUse();
								next.set("openskilldialog", get.prompt(skillName));
								next.set("norestore", true);
								next.set("_backupevent", skillName);
								next.set("custom", {
									add: {},
									replace: { window: function () {} },
								});
								// next.set('addCount',false);
								next._triggered=null;
								next.backup(skillName);
								yield next;
								//↑此段代码感谢霸天大佬的指导
								yield tar.targets[0].getStat('skill')[skill.control]--;
									/*
									var qy = lib.skill[skill.control].position?lib.skill[skill.control].position:'h';
									var ybfilter = lib.skill[skill.control].filter?lib.skill[skill.control].filter:function(){return true;};
									var scard = lib.skill[skill.control].selectCard?lib.skill[skill.control].selectCard:[0,1];
									var fcard = lib.skill[skill.control].filterCard?lib.skill[skill.control].filterCard:function(){return false;};
									var starget = lib.skill[skill.control].selectTarget?lib.skill[skill.control].selectTarget:[0,1];
									var ftarget = lib.skill[skill.control].filterTarget?lib.skill[skill.control].filterTarget:function(){return false;};
									var ybai1 = lib.skill[skill.control].check?lib.skill[skill.control].check:function(card){return get.unuseful(card)+9;};
									var ybpro = get.prompt(skill.control);
									// var ybai2 = 
									// game.log('qy:',qy,'ybfilter',ybfilter,'scard',scard,'fcard',fcard,'starget',starget,'ftarget',ftarget,'ybai1',ybai1,'ybpro')
									var ybchoose = yield tar.targets[0].chooseCardTarget({
										position:qy,
										filter:ybfilter,
										selectCard:scard,
										filterCard:fcard,
										selectTarget:starget,
										filterTarget:ftarget,
										ai1:ybai1,
										// ai2:function(target){
											// if(_status.event.player.countCards('h','shan')){
												// return -get.attitude(_status.event.player,target);
											// }
											// if(get.attitude(_status.event.player,target)<5){
												// return 6-get.attitude(_status.event.player,target);
											// }
											// if(_status.event.player.hp==1&&player.countCards('h','shan')==0){
												// return 10-get.attitude(_status.event.player,target);
											// }
											// if(_status.event.player.hp==2&&player.countCards('h','shan')==0){
												// return 8-get.attitude(_status.event.player,target);
											// }
											// return -1;
										// },
										prompt:get.prompt(skill.control),
										prompt2:'请选择合理的牌，合理的目标发动此技能。',
									});
									if(ybchoose.bool)yield tar.targets[0].useSkill(skill.control,ybchoose.cards,ybchoose.targets,false);
									// yield tar.targets[0].getStat('skill')[skill.control]--;
									*/
								
							}
						}
					}
				},
			},
			/*
			ybsl_clanxingzu:'兴族',
			ybsl_clanxingzu_info:'宗族技，当你每回合首次使用一种类型的牌后，若你本回合未造成伤害，你可以令一名同族角色发动一个出牌阶段限一次的技能（不计入次数）。',//可能些微调整
			*/
			ybsl_lxtujing:{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target&&!target.isMinHandcard();//此函数加true为全场唯一
				},
				content:function*(event,map){
					let trigger=map.trigger,player=map.player,target=event.target;
					let list = [];
					game.countPlayer(function(con){
						if(con.countCards('h')<target.countCards('h'))list.push(con);
					})
					list.sortBySeat(player);
					for(var i of list){
						var result = yield i.chooseCard('h',function(card,i){
							if(!game.checkMod(card,i,'unchanged','cardEnabled2',i)) return false;
							return i.canUse(get.autoViewAs({name:'sha'},[card]),target,false);
						},'选择一张手牌当做【杀】对'+get.translation(target)+'使用').set('ai',function(card){
							var player=_status.event.player;
							return get.effect(target,get.autoViewAs({name:'sha'},[card]),player,player)/Math.max(1,get.value(card));
						});
						if(result.bool){
							i.useCard({name:'sha'},result.cards,'ybsl_lxtujing',target,false);
						}
					}
				},
				ai:{
					order:9,
					result:{
						// player:1,
						target:function(player,target){
							var num = 0;
							let list = [];
							game.countPlayer(function(con){
								if(con.countCards('h')<target.countCards('h'))list.push(con);
							})
							list.sortBySeat(player);
							for(var i of list){
								if(get.effect(target,get.autoViewAs({name:'sha'}),player,player))num+=2;
							}
							return -num;
						}
					},
					threaten:3,//嘲讽值
				}
			},
			ybsl_lxweiyu:{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return true;
				},
				content:function*(event,map){
					let trigger=map.trigger,player=map.player,target=event.target;
					yield target.draw(2,"visible").gaintag = ["ybsl_lxweiyu_buff"];
					yield target.addTempSkill('ybsl_lxweiyu_buff');
				},
				subSkill:{
					buff:{
						sub:true,
						onremove:true,
						mod:{
							cardEnabled2: function (card) {
								if (get.itemtype(card) == "card" && !card.hasGaintag("ybsl_lxweiyu_buff")) return false;
							},
						},
						mark:true,
						marktext:'傲',
						intro:{
							name:'傲慢',
							markcount:function(storage,player){
								return player.countCards('h',card=>card.hasGaintag('ybsl_lxweiyu_buff'));
							},
							mark:function(dialog,content,player){
								var cards=player.getCards('h',card=>card.hasGaintag('ybsl_lxweiyu_buff'));
								if(cards.length){
									dialog.addAuto(cards);
								}
								else return '无可使用牌';
							},
						},
					}
				},
				ai:{
					order:9,
					result:{
						// player:1,
						target:function(player,target){
							if(target.countCards('h')<3)return 2;
							else return -1;
						}
					},
					threaten:3,//嘲讽值
				}
			},
			/*
			ybslclan_luxun:'族陆逊',
			ybslclan_luxun_prefix:'族',
			ybsl_lxtujing:'图荆',
			ybsl_lxtujing_info:'出牌阶段限一次，你可以选择一名手牌数不为最少或之一的其他角色，然后从你开始，每名手牌数小于其的角色可以依次将一张牌当〖杀〗对其使用（以发动此技能时，场上角色的手牌数为准）。',//可能有待调整
			// ybsl_lxtujing_info:'转换技，出牌阶段限一次，你可以将一张手牌交给一名其他角色：阳，视为对其使用一张【逐近弃远】；阴，视为对其使用一张【杀】。',//可能有待调整
			//思路1万钧神弩
			//思路2偷梁换柱
			ybsl_lxweiyu:'伪誉',
			ybsl_lxweiyu_info:'出牌阶段限一次，你可令一名角色摸两张牌并展示之。若如此做，其本回合不能使用不因此获得的牌。',//可能有待调
			ybslclan_luxun:'族陆逊',
			ybslclan_luxun_prefix:'族',
			ybsl_lxtujing:'图荆',
			ybsl_lxtujing_info:'转换技，出牌阶段限一次，你可以将一张手牌交给一名其他角色：阳，视为对其使用一张【逐近弃远】；阴，视为对其使用一张【杀】。',//可能有待调整
			//思路1万钧神弩
			//思路2偷梁换柱
			ybsl_lxzhiyu:'智誉',
			ybsl_lxzhiyu_info:'锁定技，当其他角色获得你的牌时，其本回合展示手牌，并令其本回合无法使用数量最多的颜色的牌。',//可能有待调整
			*/
			
			//族陆延
			ybsl_lyyaoe:{
				audio:'ext:夜白神略/audio/character:2',
				forced:true,
				// group:['ybsl_lyyaoe_suit','ybsl_lyyaoe_number'],
				trigger:{
					player:'useCard',
				},
				filter:function(event,player){
					if(player.hasSkill('ybsl_lyyaoe_suit'))return false;
					else if(!player.isPhaseUsing()||!event.targets.length)return false;
					var tars = event.targets.filter(current=>current!=player);
					return tars.length;
				},
				content:function(){
					player.damage(player);
				},
				ai:{
					result: {
						player(player, target) {
							if(!player.hasSkill('ybsl_lyyaoe_suit')&&player.isPhaseUsing()){
								if(event.targets.length&&event.targets.filter(current=>current!=player).length) return -2;
							}
							return 1;
						},
					},
				},
				// mod: {
					// cardUsable: function (card, player, num) {
						// if(player.hasSkill('ybsl_lyyaoe_number'))return num;
						// var list = player.getHistory("useCard");
						// if(!list.length)return num;
						// var list2 = get.YB_suit(list,'type2');
						// if(list2.contains(get.type2(card)))return false;
						// return num;
					// },
				// },
				subSkill:{
					suit:{
						forced:true,
						audio:'ybsl_lyyaoe',
						mark:true,
						marktext:'<span style="text-decoration: line-through;">伤</span>',
						intro:{
							content:function(storage,player){
								// if(storage)return '锁定技，当你于回合内使用牌时，若此牌目标包含其他角色，你对自己造成一点伤害';
								return '已封印夭厄。';
							}
						},
						onremove:true,
					},
					number:{
						forced:true,
						audio:'ybsl_lyyaoe',
						mark:true,
						marktext:'<span style="text-decoration: line-through;">限</span>',
						intro:{
							content:function(storage,player){
								// if(storage)return '锁定技，每种类型牌你每回合限用一次';
								return '已封印二效果。';
							}
						},
						onremove:true,
					},
				}
			},
			ybsl_lytiandu:{
				audio:'ext:夜白神略/audio/character:2',
			},
			ybsl_lykangming:{
				audio:'ext:夜白神略/audio/character:2',
				enable:'phaseUse',
				usable:1,
				content:function*(event,map){
					let trigger=map.trigger,player=map.player;
					var jud = yield player.judge();
					var card = jud.card;
					var cho = yield player.chooseCard('he',function(cardx){
						if(get.suit(card) != get.suit(cardx)/*&&get.number(card) != get.number(cardx)*/) return false;
						return true;
					}).set('ai',function(cardx){
						// if(get.suit(card) == get.suit(cardx)&&get.number(card) == get.number(cardx))return false;
						/*if(!player.hasSkill('ybsl_lyyaoe_number')) return get.suit(card) != get.suit(cardx)&&get.number(card) == get.number(cardx);
						else */ if(!player.hasSkill('ybsl_lyyaoe_suit')) return get.suit(card) == get.suit(cardx)&&get.number(card) != get.number(cardx);
						return false;
					}).set('prompt',get.prompt('ybsl_lykangming'));
					// cho;
					if(cho.cards){
						var cardy = cho.cards[0];
						yield player.discard(cardy);
						if (get.suit(cardy)==get.suit(card)&&get.number(cardy)==get.number(card)){
							yield player.addTempSkill(['ybsl_lyyaoe_suit','ybsl_lyyaoe_number']);
							yield player.markSkill(['ybsl_lyyaoe_suit','ybsl_lyyaoe_number']);
							yield player.loseMaxHp();
						}
						else if(get.suit(cardy)==get.suit(card)){
							yield player.addTempSkill('ybsl_lyyaoe_suit');
							yield player.markSkill('ybsl_lyyaoe_suit');
						}
						// else if(get.number(cardy)==get.number(card)){
							// yield player.addTempSkill('ybsl_lyyaoe_number');
							// yield player.markSkill('ybsl_lyyaoe_number');
						// }
					}
				},
				ai:{
					order:10,
					result:{
						player:1,
						// target:-2,
					},
				}
			},
			/*
			
			ybslclan_luyan:'族陆延',
			ybslclan_luyan_prefix:'族',
			ybsl_lyyaoe:'夭厄',
			ybsl_lyyaoe_info:'锁定技，每种类型牌你每回合限用一次；锁定技，当你于回合内使用牌时，若此牌目标包含其他角色，你对自己造成一点伤害。',
			锁定技，当你于回合内使用牌时，若此牌目标包含其他角色，你对自己造成一点伤害；锁定技，每种类型牌你每回合限用一次。'
			//ybsl_lyyaoe_info:'锁定技，每种类型牌你每回合限用一次；锁定技，当你每回合首次使用某个类型的牌指定目标后，若目标为其他角色，你对自己和目标各造成x点伤害（x为你本回合使用的类型数，从1开始算，至多为3）。',
			ybsl_lytiandu:'天妒',
			ybsl_lytiandu_info:'你猜天妒啥效果。不出意外的话，这条技能仅提供一条语音。',
			ybsl_lykangming:'抗命',
			ybsl_lykangming_info:'出牌阶段限一次，你可以进行一次判定。然后你可以弃置一张花色或点数与判定结果相同的牌。若弃置牌与判定结果：花色相同，本回合夭厄一效果失效；点数相同，本回合夭厄二效果失效；花色和点数均相同，本回合夭厄两效果均失效，然后你减一点体力上限。',
			*/
			
			//忆包武将
			yb014_gugu:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{player:'phaseUseAfter'},
				filter:function(event,player){
					var num=0;
					var evt = _status.event.getParent("phaseUse");
					player.getHistory("useCard", function (evtx) {
						if (evtx.getParent("phaseUse") == evt) {
							num++;
						}
					});
					return num<=player.hp;
				},
				content:function*(event,map){
					let trigger=map.trigger,player=map.player;
					var list=[];
					var evt = _status.event.getParent("phaseUse");
					player.getHistory("useCard", function (evtx) {
						if (evtx.getParent("phaseUse") == evt) {
							list.push(evtx);
						}
					});
					for(var i of list){
						if(player.hasUseTarget(i)){
							yield player.chooseUseTarget(
								{
									name: i.name,
									nature: i.nature,
									isCard: false,
								},
								cards,
								"是否使用【"+i.nature?get.translation(i.nature):""+get.translation(i.name)+"】。",
								false//若有false，此牌不计入次数。
							)
						}
					}
				},
			},
			yb014_minsheng:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{source:'damageBegin2'},
				filter:function(event,player){
					return event.player&&event.player.hp&&player&&playee.hp&&event.player.hp==player.hp;
				},
				content:function*(event,map){
					let trigger=map.trigger,player=map.player;
					let num=Math.min(trigger.num,5);
					yield trigger.cancel();
					yield player.draw(num);
				},
			},
			yb014_reminsheng:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{source:'damageBegin2'},
				filter:function(event,player){
					return event.player&&event.player.hp&&player&&playee.hp&&event.player.hp==player.hp;
				},
				content:function*(event,map){
					let trigger=map.trigger,player=map.player;
					let num=Math.min(trigger.num,5);
					yield trigger.cancel();
					yield player.loseHp()
					yield player.draw(num*2);
				},
			},
			
		},//技能（必填） ……………………！…！！！【…？。！！？？？？…………
		card:{
			'ybsl_zhaosanmusi':{
				audio:'ext:夜白神略/audio/card:true',
				fullskin:true,
				type:'trick',
				enable:true,
				selectTarget:-1,
				// cardcolor:'red',
				toself:true,
				filterTarget:function(card,player,target){
					return target==player;
				},
				modTarget:true,
				content:function(){
					'step 0'
					var list=['摸三弃四','弃三摸四'];
					target.chooseControl(list).set('prompt','请选择摸三弃四，还是弃三摸四').set('ai',function(control){
						if(target.countCards('h')>6)return 0;
						else return 1;
					});
					'step 1'
					if(result.control=='摸三弃四'){
						event.goto(6);
					}
					'step 2'
					'step 3'
					target.chooseCard('h',3).set('ai',function(card){
						if(target.isPhaseUsing()) return -get.useful(card);
						else return -get.value(card);
					})
					'step 4'
					if(result.cards)target.discard(result.cards);
					'step 5'
					target.draw(4);
					event.finish();
					'step 6'
					target.draw(3);
					'step 7'
					target.chooseCard('h',4).set('ai',function(card){
						if(target.isPhaseUsing()) return -get.useful(card);
						else return -get.value(card);
					})
					'step 8'
					if(result.cards)target.discard(result.cards);
				},
				ai:{
					basic:{
						order:8,
						useful:4,
						value:3,
					},
					result:{
						target:2,
					},
					tag:{
						// gain:2,
						draw:3,
					},
				},
			},
			
			
		},
		translate:{  
			//将包分类
			ybsl_qygc:'群友共创第一期',
			ybsl_xuyou:'许攸',
			ybsl_zhaosanmusi:'朝三暮四',
			ybsl_zhaosanmusi_info:'出牌阶段，对自己使用。目标角色选择：摸三张牌，然后弃置四张手牌，或弃置三张手牌，然后摸四张牌。',
			ybsl_zigong:'自功',
			ybsl_zigong_info:'当你不因此技能获得牌后，你可以弃置这些牌，然后摸等量牌（至多摸5张）',
			ybsl_zicai:'自才',
			ybsl_zicai_info:'当你弃置牌后，根据本次弃牌数，你可以将本次弃置的牌按照以下规则转化：1，火杀，2，调兵遣将，3，以逸待劳，4，增兵减灶，5及以上，朝三暮四。',
			
			ybsl_clan:'自定义宗族',
			
			ybsl_clanxingzu:'兴族',
			ybsl_clanxingzu_info:'宗族技，当你每回合首次使用一种类型的牌后，若你本回合未造成伤害，你可以令一名同族角色发动一个出牌阶段限一次的技能（不计入次数）。',//可能些微调整
			//宗族技，当你每回合首次使用一种类型的牌后，若你本回合未造成伤害，你可以令一名同族角色发动一个出牌阶段限一次的技能（不计入次数），或令一名无宗族角色加入你的宗族。
			
			ybslclan_luxun:'族陆逊',
			ybslclan_luxun_prefix:'族',
			ybsl_lxtujing:'图荆',
			ybsl_lxtujing_info:'出牌阶段限一次，你可以选择一名手牌数不为最少或之一的其他角色，然后从你开始，每名手牌数小于其的角色可以依次将一张牌当〖杀〗对其使用（以发动此技能时，场上角色的手牌数为准）。',//可能有待调整
			// ybsl_lxtujing_info:'转换技，出牌阶段限一次，你可以将一张手牌交给一名其他角色：阳，视为对其使用一张【逐近弃远】；阴，视为对其使用一张【杀】。',//可能有待调整
			//思路1万钧神弩
			//思路2偷梁换柱
			ybsl_lxweiyu:'伪誉',
			ybsl_lxweiyu_info:'出牌阶段限一次，你可令一名角色摸两张牌并展示之。若如此做，其本回合不能使用不因此获得的牌。',//可能有待调整
			// ybsl_lxzhiyu:'智誉',
			// ybsl_lxzhiyu_info:'锁定技，当其他角色获得你的牌时，其本回合展示手牌，并令其本回合无法使用数量最多的颜色的牌。',//可能有待调整
			
			
			ybslclan_luyan:'族陆延',
			ybslclan_luyan_prefix:'族',
			ybsl_lyyaoe:'夭厄',
			ybsl_lyyaoe_info:'锁定技，当你于回合内使用牌时，若此牌目标包含其他角色，你对自己造成一点伤害。',
			// 锁定技，当你于回合内使用牌时，若此牌目标包含其他角色，你对自己造成一点伤害；锁定技，每种类型牌你每回合限用一次。
			//ybsl_lyyaoe_info:'锁定技，每种类型牌你每回合限用一次；锁定技，当你每回合首次使用某个类型的牌指定目标后，若目标为其他角色，你对自己和目标各造成x点伤害（x为你本回合使用的类型数，从1开始算，至多为3）。',
			ybsl_lytiandu:'天妒',
			ybsl_lytiandu_info:'你猜天妒啥效果。不出意外的话，这条技能仅提供一条语音。',
			ybsl_lykangming:'抗命',
			ybsl_lykangming_info:'出牌阶段限一次，你可以进行一次判定。然后你可以弃置一张花色与判定结果相同的牌。若如此做，本回合夭厄失效。若弃置牌点数也与之相同，则你减一点体力上限。',
			//出牌阶段限一次，你可以进行一次判定。然后你可以弃置一张花色或点数与判定结果相同的牌。若弃置牌与判定结果：花色相同，本回合夭厄一效果失效；点数相同，本回合夭厄二效果失效；花色和点数均相同，本回合夭厄两效果均失效，然后你减一点体力上限。
			/*
			
			*/
			
			ybsl_bqbs:'别群比赛',
			ybsl_lvyi:'吕乂',//本人在其他群设计大赛的练手作品。落榜作品是另一个，现在看来太二了，就不放了
			ybsl_jianyue:'俭约',
			ybsl_jianyue_info:'当你的判定牌进入弃牌堆时，你可以使用之。',
			ybsl_tuntian:'屯田',
			ybsl_tuntian_info:'当你于回合外失去一张牌时，你可以进行一次判定，若结果不为红桃，你可以将其置于武将牌上称为“田”；你计算与其他角色的距离-X，X为你的“田”数。',
			ybsl_quanfan:'劝范',
			ybsl_quanfan_backup:'劝范',
			ybsl_quanfan_info:'出牌阶段限一次，你可以弃置一张牌或一张“田”，进行一次判定，然后展示一名其他角色的至多Y张手牌（Y为其体力值且至多为5），弃置其中与判定颜色相同的牌。',
			ybsl_xrquanfan:'劝范',
			ybsl_xrquanfan_info:'出牌阶段限一次，你可以弃置一张牌或一张“田”，进行一次判定，然后展示一名其他角色的至多Y张手牌（Y为其体力值且至多为5），弃置其中与判定颜色相同的牌。若其未因此弃牌，其摸展示数张牌。',//懒得写了
			
			//
			ybsl_ybsl2:'忆包武将',
			yb014_gugu:'咕咕',
			yb014_gugu_info:'出牌阶段结束时，若你本阶段使用的牌数不大于你体力值，你可以视为依次使用之，无合法目标的牌或不想用的牌可以跳过。',
			yb014_minsheng:'悯生',
			yb014_minsheng_info:'当你造成伤害时，若目标体力值与你相等，你可以防止此伤害，然后x张牌，x为此伤害值且至多为5。',
			yb014_reminsheng:'悯生',
			yb014_reminsheng_info:'当你造成伤害时，若目标体力值与你相等，你可以防止此伤害，然后失去一点体力并2x张牌，x为此伤害值且至多为5。',
			//----------------------装备及其他
		},//翻译（必填） 
		dynamicTranslate:{//动态翻译
			
		},
	}; 
	/*
	// if(!lib.characterPack.mode_guozhan)lib.characterPack.mode_guozhan;
	// 这是一个大饼，也是一个尝试
	*/
	if(lib.device||lib.node){ 
		for(var i in ybnew1.character){ybnew1.character[i][4].push('ext:夜白神略/image/character/'+i+'.jpg');} 
	}else{ 
		for(var i in ybnew1.character){ybnew1.character[i][4].push('db:extension-夜白神略:'+i+'.jpg');} 
	}//由于以此法加入的武将包武将图片是用源文件的，所以要用此法改变路径 
	for(var i in ybnew1.card){
		if(!ybnew1.card[i].image) ybnew1.card[i].image='ext:夜白神略/image/card/'+i+'.png'
	}
	lib.config.all.characters.push('ybnew1');
	if(!lib.config.characters.contains('ybnew1'))lib.config.characters.remove('ybnew1');
	lib.translate['ybnew1_character_config']='<span style=\'color:#28e3ce\'>夜白新包1</span>';
	
	
	
	return ybnew1; 
	
	
}); 





game.import('card',function(lib, game, ui, get, ai, _status){ 

	var ybnew2={ 
		name:'ybnew2', //武将包命名（必填） 
		connect:true, //该武将包是否可以联机（必填） 
		// connectBanned:['gz_ybsl_018zhangqing_feian','gz_ybslshen_002chenailin_feian','db_ybsp_038tengwu'],
		/*快捷复制：
		<span class=yellowtext>文字</span>暗亮双色
		<span class=thundertext>文字</span>
		<span class=thundertext></span>
		<font color=cyan>文字</font>自带单色
		<span style=\'color:#00c4ff\'>文字</span>自写颜色
		<br/>换行
		<li>点
		<span style="opacity:0.5;"></span>字体变淡
		<span style="font-family: yuanli">东吴命运线</span>
		<span style="text-decoration: line-through;">杀</span>字体划掉

		*/
		skill:{
			//-------------------------
			rewrite_goujiangdesidai_skill:{
				inherit:'kagari_ybzongsi',
				filter:function(event,player){
					return !player.hasSkill('kagari_ybzongsi')||player.getStat('skill').kagari_ybzongsi;
				},
			},
		},//技能（必填） ……………………！…！！！【…？。！！？？？？…………
		card:{
			rewrite_goujiangdesidai:{
	 			type:'equip',
	 			subtype:'equip1',
				distance:{attackFrom:-6},
	 			skills:['rewrite_goujiangdesidai_skill'],
				modeimage:'boss',
				ai:{
					basic:{
						equipValue:8.5,
					},
				},
				fullskin:true,
	 		},
		},
		translate:{  
			//----------------------装备及其他
			rewrite_goujiangdesidai:'篝酱的执念',
			rewrite_goujiangdesidai_info:'锁定技，若你未拥有技能【界纵丝】，则你视为拥有技能【界纵丝】；若你拥有技能【界纵丝】，则你将此技能改为「出牌阶段限两次」',
			rewrite_goujiangdesidai_skill:'纵丝',
		},//翻译（必填） 
		dynamicTranslate:{//动态翻译
			
		},
		list:[
			['spade',13,'tianhuoduan']
		],
	}; 
	/*
	// if(!lib.characterPack.mode_guozhan)lib.characterPack.mode_guozhan;
	// 这是一个大饼，也是一个尝试
	*/
	if(lib.device||lib.node){ 
		for(var i in ybnew2.character){ybnew2.character[i][4].push('ext:夜白神略/image/character/'+i+'.jpg');} 
	}else{ 
		for(var i in ybnew2.character){ybnew2.character[i][4].push('db:extension-夜白神略:'+i+'.jpg');} 
	}//由于以此法加入的武将包武将图片是用源文件的，所以要用此法改变路径 
	
	for(var i in ybnew2.card){
		if(!ybnew2.card[i].image) ybnew2.card[i].image='ext:夜白神略/image/card/'+i+'.png'
	}//以此法批量添加卡牌贴图
	
	lib.config.all.cards.push('ybnew2');
	if(!lib.config.cards.contains('ybnew2'))lib.config.cards.remove('ybnew2');
	lib.translate['ybnew2_card_config']='<span style=\'color:#28e3ce\'>夜白新卡1</span>';
	
	return ybnew2; 
});