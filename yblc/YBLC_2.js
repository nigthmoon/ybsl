export { YB_xnqbd }
const YB_xnqbd=function(){
	lib.translate._YBLC_level='加点特权'
	lib.skill._YBLC_level={
		mark:true,
		marktext:'☆',
		direct:true,
		charlotte:true,
		ruleSkill:true,
		trigger:{player:'phaseBefore'},
		filter:function(event,player){
			if(!player.storage._YBLC_level>0)return false;
			return true;
		},
		content:function(){
			"step 0"
			if(!player.storage._YBLC_maxhp)player.storage._YBLC_maxhp=0;
			if(!player.storage._YBLC_hand)player.storage._YBLC_hand=0;
			if(!player.storage._YBLC_draw)player.storage._YBLC_draw=0;
			if(!player.storage._YBLC_damage)player.storage._YBLC_damage=0;
			if(!player.storage._YBLC_damage2)player.storage._YBLC_damage2=0;
			"step 1"
			var list=["伤害增加","额外摸牌数",'伤害减免',"体力上限","出杀次数","cancel2"];
			var xx=player.storage._YBLC_damage*20;
			if(xx>_status.yebailvcheng.completeNumber){
				list.remove("伤害增加");
			}
			var yy=player.storage._YBLC_draw*10;
			if(yy>_status.yebailvcheng.completeNumber){
				list.remove("额外摸牌数");
			}
			var zz=player.storage._YBLC_hand*15;
			if(zz>_status.yebailvcheng.completeNumber){
				list.remove("出杀次数");
			}
			var aa=player.storage._YBLC_damage2*20;
			if(aa>_status.yebailvcheng.completeNumber){
				list.remove("伤害减免");
			}
			player.chooseControl(list).set("prompt","你还有"+player.storage._YBLC_level+"个可用属性点，请选择加点。");
			"step 2"
			if(result.control=="伤害增加"){
				player.removeMark("_YBLC_level");
				player.storage._YBLC_damage++;
			}
			if(result.control=="额外摸牌数"){
				player.removeMark("_YBLC_level");
				player.storage._YBLC_draw++;
			}
			if(result.control=="伤害减免"){
				player.removeMark("_YBLC_level");
				player.storage._YBLC_damage2++;
			}
			if(result.control=="体力上限"){
				player.removeMark("_YBLC_level");
				player.gainMaxHp();
				player.recover();
				player.storage._YBLC_maxhp++;
			}
			if(result.control=="出杀次数"){
				player.removeMark("_YBLC_level");
				player.storage._YBLC_hand++;
			}
			if(result.control=="cancel2"){
				event.finish();
			}
			"step 3"
			if(player.storage._YBLC_level>0){
				event.goto(1);
			}
			else{
				event.finish();
			}
		},
	
		intro:{
			name:'闯关加点',
			content:function(storage,player,skill){
				var str='<br>剩余点数<li>';
				str+=player.storage._YBLC_level;
				str+='<br/>体力上限增加<li>';
				str+=get.translation(player.storage._YBLC_maxhp);
				str+='<br/>出杀次数增加<li>';
				str+=get.translation(player.storage._YBLC_hand);
				str+='<br/>摸牌阶段多摸<li>';
				str+=get.translation(player.storage._YBLC_draw);
				str+='<br/>造成伤害增加<li>';
				str+=get.translation(player.storage._YBLC_damage);
				str+='<br/>受到伤害减免<li>';
				str+=get.translation(player.storage._YBLC_damage2);
				return str;
			},
		},
		group:['_YBLC_level_1','_YBLC_level_2','_YBLC_level_3','_YBLC_level_4'],
		subSkill:{
			1:{
				trigger:{
					player:'phaseDrawBegin2',
				},
				direct:true,
				charlotte:true,
				filter:function (event,player){
					if(!player.storage._YBLC_draw) return false;
					return !event.numFixed;
				},
				content:function (){
					'step 0'
					if(!player.storage._YBLC_maxhp)player.storage._YBLC_maxhp=0;
					if(!player.storage._YBLC_hand)player.storage._YBLC_hand=0;
					if(!player.storage._YBLC_draw)player.storage._YBLC_draw=0;
					if(!player.storage._YBLC_damage)player.storage._YBLC_damage=0;
					if(!player.storage._YBLC_damage2)player.storage._YBLC_damage2=0;
					'step 1'
					if(player.storage._YBLC_draw>0){
						game.log(player,'加点特权，摸牌阶段多模'+get.translation(player.storage._YBLC_draw)+'张');
					}
					trigger.num+=(player.storage._YBLC_draw);
				},
			},
			2:{
				trigger:{
					source:'damageBegin1',
				},
				direct:true,
				charlotte:true,
				filter:function (event,player){
					if(!player.storage._YBLC_damage) return false;
					return !event.numFixed;
				},
				content:function (){
					'step 0'
					if(!player.storage._YBLC_maxhp)player.storage._YBLC_maxhp=0;
					if(!player.storage._YBLC_hand)player.storage._YBLC_hand=0;
					if(!player.storage._YBLC_draw)player.storage._YBLC_draw=0;
					if(!player.storage._YBLC_damage)player.storage._YBLC_damage=0;
					if(!player.storage._YBLC_damage2)player.storage._YBLC_damage2=0;
					'step 1'
					if(player.storage._YBLC_damage>0){
						game.log(player,'加点特权，伤害增加'+get.translation(player.storage._YBLC_damage)+'点');
					}
					trigger.num+=(player.storage._YBLC_damage);
				},
			},
			3:{
				charlotte:true,
				mod:{
					// maxHandcard:function (player,num){
						// return num+player.storage._YBLC_hand;
					// },
					cardUsable:function(card, player, num) {
						if (card.name == 'sha') return num+(player.storage._YBLC_hand||0);
					},
				},
		
				filter:function(event,player){
					if(!player.storage._YBLC_level>0)return false;
					return true;
				},
				enable:'phaseUse',
				prompt2:'是否消耗一个加点机会，摸一张牌？',
				content:function(){
					player.removeMark('_YBLC_level');
					player.draw();
				},
			},
			4:{
				trigger:{
					player:'damageBegin3',
				},
				direct:true,
				charlotte:true,
				filter:function (event,player){
					if(!player.storage._YBLC_damage2) return false;
					return !event.numFixed;
				},
				content:function (){
					'step 0'
					if(!player.storage._YBLC_maxhp)player.storage._YBLC_maxhp=0;
					if(!player.storage._YBLC_hand)player.storage._YBLC_hand=0;
					if(!player.storage._YBLC_draw)player.storage._YBLC_draw=0;
					if(!player.storage._YBLC_damage)player.storage._YBLC_damage=0;
					if(!player.storage._YBLC_damage2)player.storage._YBLC_damage2=0;
					'step 1'
					if(player.storage._YBLC_damage>0){
						game.log(player,'加点特权，伤害减免'+get.translation(player.storage._YBLC_damage2)+'点');
					}
					trigger.num-=(player.storage._YBLC_damage2);
				},
			}
		},
	}
	if(lib.brawl)lib.brawl.yebailvcheng={
		name:'夜白旅程',
		mode:'identity',
		showcase:function(init){
			var node=this;
			var player635;
			var player1;
			if(init){
				player635=ui.create.player(null,true).init('db_ybsp_014liutianyu');
				player635.node.marks.remove();
				player635.node.hp.remove();
				player635.style.left='calc(40%)';
				player635.style.top='calc(20%)';
				player635.style.transform='scale(0.5)';
				player635.node.count.remove();
				this.appendChild(player635);
				this.player635=player635;
			}
			else{
				player635=this.player635;
			}
			if(init){
				player1=ui.create.player(null,true).init('ybsl_002chenailin');
				player1.node.marks.remove();
				player1.node.hp.remove();
				player1.style.left='calc(10%)';
				player1.style.top='calc(-10%)';
				player1.style.transform='scale(0.5)';
				player1.node.count.remove();
				this.appendChild(player1);
				this.player1=player1;
				ui.refresh(player1);
			}
			else{
				player1=this.player1;
			}
			var func=function(){
				var player2=ui.create.player(null,true).init('ybsl_022salt');
				player2.node.marks.remove();
				player2.node.hp.remove();
				player2.style.left='auto';
				player2.style.right='calc(10%)';
				player2.style.top='calc(-10%)';
				player2.node.count.remove();
				player2.style.transform='scale(0.4)';
				player2.style.opacity=0;
				node.appendChild(player2);
				ui.refresh(player2);
				player2.style.opacity=1;
				player2.style.transform='scale(0.5)';
					
				setTimeout(function(){
					if(!player2) return;
					game.linexy([//线条
						player635.getLeft()+player635.offsetWidth/2,
						player635.getTop()+player635.offsetHeight/2,
						player1.getLeft()+player1.offsetWidth/2,
						player1.getTop()+player1.offsetHeight/2,
					],node);
					setTimeout(function(){
						var popup1=ui.create.div('.damage');//字体
						popup1.innerHTML='520';//字体的描述：
						popup1.dataset.nature='wood';//-1字体的颜色：木色
						player1.appendChild(popup1);//player1身上飘字popup1
						ui.refresh(popup1);
						popup1.classList.add('damageadded');
						popup1.listenTransition(function(){
							
							setTimeout(function(){
								popup1.delete();
							},300);//player1身上字体持续时间
						});
						
						setTimeout(function(){
							game.linexy([
								player1.getLeft()+player1.offsetWidth/2,
								player1.getTop()+player1.offsetHeight/2,
								player2.getLeft()+player2.offsetWidth/2,
								player2.getTop()+player2.offsetHeight/2,
							],node);
							var popup=ui.create.div('.damage');//字体的类别:：伤害
							popup.innerHTML='-999';//字体的描述：-1
							popup.dataset.nature='fire';//-1字体的颜色：火
							player2.appendChild(popup);//player2身上飘字popup
							ui.refresh(popup);
							popup.classList.add('damageadded');
							popup.listenTransition(function(){
								setTimeout(function(){
									popup.delete();
								},300);//player2身上字体持续时间
							});
						},900)//（两个动作之间的延迟）
					},250)//陈爱琳状态执行延迟
				},600);//决定从何时开始
				
				setTimeout(function(){
					if(!player2) return;
					player2.style.transition='all 0.5s';//player2受伤动画
					player2.style.transform='scale(0.7)';
					player2.delete();
				},2500);//盐的执行时间
			};
			node.showcaseinterval=setInterval(func,3500);//循环时间
			func();
		},
		intro:[
			'我寻你千百度，又一岁荣枯，可你从不在灯火阑珊处',
		],
		init:function(){
			if(!_status.yebailvcheng) _status.yebailvcheng={
				completeNumber:0,
				used:[],
				addFellow:function(name){
					game.YB_memory01.dataset.position=3;
					ui.arena.setNumber(3);
					game.fellow=game.addFellow(1,name);
					var gain=4;
					 var add=0;
					 switch(_status.yebailvcheng.completeNumber){
						case 1:gain=5;break;
						case 2:gain=5;add=1;break;
						case 3:gain=6;add=1;break;
						default:gain=6;add=2;break;
					};
					game.fellow.hp+=add;
					 game.fellow.maxHp+=add;
					game.fellow.gain(get.cards(gain));
					game.fellow.identity='zhong';
					game.fellow.setIdentity();
					game.fellow.identityShown=true;
					game.fellow.node.identity.classList.remove('guessing');
					_status.event.getParent('phaseLoop').player=game.fellow;
				},
				/*//-----------已作废
				addDiren:function(name){
					game.YB_memory01.dataset.position=3;
					ui.arena.setNumber(5);
					game.diren=game.addDiren(4,name);
					game.diren.gain(get.cards(4));
					game.diren.identity='fan';
					game.diren.setIdentity();
					game.diren.identityShown=true;
					game.diren.node.identity.classList.remove('guessing');
					_status.event.getParent('phaseLoop').player=game.diren;
				},
				addPaohui:function(name){
					game.YB_memory01.dataset.position=3;
					ui.arena.setNumber(2);
					game.paohui=game.addPaohui(2,name);
					game.paohui.gain(get.cards(4));
					game.paohui.identity='fan';
					game.paohui.setIdentity();
					game.paohui.identityShown=true;
					game.paohui.node.identity.classList.remove('guessing');
					_status.event.getParent('phaseLoop').player=game.paohui;
				},
				*/
				completeReward:[
					['回复1点体力并摸一张牌',function(){
						game.zhu.recover();
						game.zhu.draw();
					}],
					['摸三张牌',function(){
						game.zhu.draw(3);
					}],
					['将一张防具牌置入装备区并摸一张牌',function(){
						var card=get.cardPile(function(card){
							return get.subtype(card)=='equip2'&&!get.cardtag(card,'gifts');
						});
						if(card) game.zhu.equip(card);
						game.zhu.draw();
					}],
					['将一张武器牌置入装备区并摸一张牌',function(){
						var card=get.cardPile(function(card){
							return get.subtype(card)=='equip1'&&!get.cardtag(card,'gifts');
						});
						if(card) game.zhu.equip(card);
						game.zhu.draw();
					}],
					['回复2点体力并弃置一张牌',function(){
						game.zhu.recover(2);
						game.zhu.chooseToDiscard('he',true);
					}],
					['摸五张牌，然后弃置三张牌',function(){
						game.zhu.draw(5);
						game.zhu.chooseToDiscard(3,'he',true);
					}],
					// ['摸五张牌，然后对手摸两张牌',function(){
					// 	game.zhu.draw(5);
					// 	game.YB_memory01.draw(2);
					// }],
					['将一张武器牌和一张防具牌置入装备区',function(){
						var card=get.cardPile(function(card){
							return get.subtype(card)=='equip1'&&!get.cardtag(card,'gifts');
						});
						if(card) game.zhu.equip(card);
						var card2=get.cardPile(function(card){
							return get.subtype(card)=='equip2'&&!get.cardtag(card,'gifts');
						});
						if(card2) game.zhu.equip(card2);
					}],
					['将一张武器牌和一张防御坐骑牌置入装备区',function(){
						var card=get.cardPile(function(card){
							return get.subtype(card)=='equip1'&&!get.cardtag(card,'gifts');
						});
						if(card) game.zhu.equip(card);
						var card2=get.cardPile(function(card){
							return get.subtype(card)=='equip3'&&!get.cardtag(card,'gifts');
						});
						if(card2) game.zhu.equip(card2);
					}],
					['弃置所有手牌并于下一关获得【涅槃】(标)',function(){
						var hs=game.zhu.getCards('h');
						if(hs.length) game.zhu.discard(hs);
						game.zhu.addSkill('oldniepan');
						game.zhu.restoreSkill('oldniepan');
						game.zhu._oldniepan=true;
					}],
					['获得两张锦囊牌',function(){
						var list=[];
						while(list.length<2){
							var card=get.cardPile(function(card){
								return !list.includes(card)&&get.type(card,'trick')=='trick';
							});
							if(!card) break;
							list.push(card);
						}
						if(list.length) game.zhu.gain(list,'gain2','log');
					}],
					['将体力回复至体力上限，然后弃置一张牌',function(){
						var num=game.zhu.maxHp-game.zhu.hp;
						if(num) game.zhu.recover(num);
						game.zhu.chooseToDiscard('he',true);
					}],
					['弃置两张牌，在下一关的第一个回合后进行一个额外的回合',function(){
						game.zhu.chooseToDiscard(2,true,'he');
						game.zhu.addSkill('yebailvcheng_phase');
					}],
					// ['摸一张牌，然后将对手翻面',function(){
					// 	game.zhu.draw();
					// 	game.YB_memory01.turnOver(true);
					// }],
					// ['摸一张牌，然后令对手受到1点伤害',function(){
					// 	game.zhu.draw();
					// 	game.YB_memory01.damage(game.zhu);
					// }],
					['获得五张基本牌',function(){
						var list=[];
						while(list.length<5){
							var card=get.cardPile(function(card){
								return !list.includes(card)&&get.type(card)=='basic';
							});
							if(!card) break;
							list.push(card);
						}
						if(list.length) game.zhu.gain(list,'gain2','log');
					}],
					['失去1点体力，然后摸五张牌',function(){
						game.zhu.loseHp();
						game.zhu.draw(5);
					}],
					['失去体力至1点，然后摸七张牌',function(){
						var num=game.zhu.hp-1;
						if(num) game.zhu.loseHp(num);
						game.zhu.draw(7)
					}],
					// ['弃置一张牌，然后令对手受到2点伤害',function(){
					// 	game.zhu.chooseToDiscard('he',true);
					// 	game.YB_memory01.damage(game.zhu,2);
					// }],

					// ['在下一关中召唤孙丽松一同战斗',function(){
						// _status.yebailvcheng.addFellow('ybsl_001sunlisong');
					// }],
					// ['在下一关中召唤满城柒一同战斗',function(){
						// _status.yebailvcheng.addFellow('dzsl_016manchengqi');
					// }],
					// ['在下一关中召唤蚕一同战斗',function(){
						// _status.yebailvcheng.addFellow('ybsl_026can');
					// }],
					['将一张宝物牌置入装备区并摸一张牌',function(){
						var card=get.cardPile(function(card){
							return get.subtype(card)=='equip5'&&!get.cardtag(card,'gifts');
						});
						if(card) game.zhu.equip(card);
						game.zhu.draw();
					}],
					['摸五张牌，然后将自己翻面',function(){
						game.zhu.draw(5);
						game.zhu.turnOver(true);
					}],
					['获得一张【酒】和一张【杀】',function(){
						var list=[];
						var card=get.cardPile(function(card){
								return card.name=='sha';
							});
						if(card) list.push(card);
						var card=get.cardPile(function(card){
							return card.name=='jiu';
							});
						if(card) list.push(card);
						if(list.length) game.zhu.gain(list,'gain2','log');
					}],
					['弃置五张牌，获得花中四君子各一张',function(){
						game.zhu.chooseToDiscard(5,true,'he');
						var list=[];
						var card=game.YB_createCard('ybsl_meihua','club',null,null);
						if(card) list.push(card);
						var card=game.YB_createCard('ybsl_lanhua','diamond',null,null);
						if(card) list.push(card);
						var card=game.YB_createCard('ybsl_zhuzi','spade',null,null);
						if(card) list.push(card);
						var card=game.YB_createCard('ybsl_juhua','heart',null,null);
						if(card) list.push(card);
						game.zhu.gain(list,'gain2','log');
					}],
					// ['额外获得一次加点',function(){
						// game.zhu.addMark('_YBLC_level');
					// }],
				],
				// Spades, hearts, clubs, diamonds
				completeYbsl:[
					
				],
				completeSkill:[
					
				],
				completeBattle:[
					// [
						// ['ybsl_011gaoyuhang',null,{contont:function(){}}],//固定敌方武将，敌方武将固定附加技能，敌方增益
						// [null,null]//固定队友，自己获得额外技能，自己增益
					// ]
					[
						['ybsl_012zhengjiayi',null],//等以后做出孙利新，就用孙利新代替这里的郑佳怡
						[null,null]
					],
					[
						['ybsl_011gaoyuhang',null],
						['ybsl_012zhengjiayi',null]//等以后做出孙利新，就用孙利新代替这里的郑佳怡
					],
					[
						['ybsl_009liyushan',null],
						['ybsl_012zhengjiayi',null]
					],
					[
						['ybsl_008wuyuxin',['yb009_tuling']],
						['ybsl_012zhengjiayi',null]
					],
					[
						['ybsl_010zhouyue',['yb008_jianwu']],
						['ybsl_012zhengjiayi',null]
					],
					[
						['ybsl_012zhengjiayi',['yb016_juli'],{
							content:function(tar){
								if(!tar.storage.yb016_juli) {
									 tar.storage.yb016_juli=[1,1,2];
								 }
								 else tar.storage.yb016_juli[2]=2;
							}
						}],
						[null,null]
					],
					[
						['ybsl_002chenailin',['yb001_wanyue','yb001_fufeng']],
						[null,null]
					],
					[
						['ybsp_002chenailin',['yb001_wanyue','yb001_fufeng']],
						[null,null]
					],
					[
						['ybsp_001sunlisong',['yb018_zheye','yb001_fufeng','yb001_wanyue']],
						[null,null]
					],
					[
						['ybsl_022salt',null,{
							content:function(tar){
								tar.addMark('_YBLC_level',3);
							}
						}],
						['ybsl_002chenailin',null]
					]
				],
				replace_character:function(){
					'step 0'
					if(game.zhu._oldniepan){
						game.zhu.removeSkill('oldniepan');
						delete game.zhu._oldniepan;
					}
					_status.yebailvcheng.completeNumber++;
					if(!lib.config.yebailvcheng_level||lib.config.yebailvcheng_level<_status.yebailvcheng.completeNumber){
						lib.config.yebailvcheng_level=_status.yebailvcheng.completeNumber;
						game.saveConfig('yebailvcheng_level',lib.config.yebailvcheng_level);
					}
					if(game.fellow&&game.fellow.isAlive()){
						if(ui.land&&ui.land.player==game.fellow){
							game.addVideo('destroyLand');
							ui.land.destroy();
						}
						game.zhu.next=game.YB_memory01;
						game.YB_memory01.next=game.zhu;
						game.zhu.nextSeat=game.YB_memory01;
						game.YB_memory01.nextSeat=game.zhu;
						game.players.remove(game.fellow);
						_status.dying.remove(game.fellow);
						game.fellow.out();
						for(var mark in game.fellow.marks){
							game.fellow.unmarkSkill(mark);
						}
						while(game.fellow.node.marks.childNodes.length>1){
							game.fellow.node.marks.lastChild.remove();
						}
						for(var i in game.fellow.tempSkills){
							game.fellow.removeSkill(i);
						}
						var skills=game.fellow.getSkills();
						for(var i=0;i<skills.length;i++){
							if(lib.skill[skills[i]].temp){
								game.fellow.removeSkill(skills[i]);
							}
						}
						var cards=game.fellow.getCards('hej');
						while(cards.length){
							ui.discardPile.appendChild(cards.shift());
						}
					}
					'step 1'
					/*
					if(game.fellow||game.YB_memory01){
						if(game.YB_memory01){
							game.dead.remove(game.YB_memory01);
							game.YB_memory01.remove();
						}
					}
					*/
					if(game.fellow){
						game.dead.remove(game.fellow);
						game.fellow.remove();
					}
					game.YB_memory01.dataset.position=1;
					ui.arena.setNumber(2);
					game.zhu.next=game.YB_memory01;
					game.YB_memory01.next=game.zhu;
					game.zhu.nextSeat=game.YB_memory01;
					game.YB_memory01.nextSeat=game.zhu;
					
					var list10=_status.yebailvcheng.completeBattle;
					// event.list10=list10;
					var numb1=_status.yebailvcheng.completeNumber;
					// event.numb1=numb1;
					if(list10.length>=numb1){
						var list=_status.yebailvcheng.completeReward.randomGets(4);
						 var list2=[];
						 for(var i=0;i<list.length;i++){
							 list2.push(list[i][1]);
							 list[i]=list[i][0];
						 }
					}
					else{
						var list=_status.yebailvcheng.completeReward.randomGets(3);
						 var list2=[];
						 for(var i=0;i<list.length;i++){
							 list2.push(list[i][1]);
							 list[i]=list[i][0];
						 }
						var list6=_status.yebailvcheng.completeYbsl.randomGets(1);
						list2.push(list6[0][1]);
						 list.push(list6[0][0]);
					}
					 
					
					/*
					 var list=_status.yebailvcheng.completeReward.randomGets(4);
					 var list2=[];
					 for(var i=0;i<list.length;i++){
						 list2.push(list[i][1]);
						 list[i]=list[i][0];
					 }
					*/
					
					 if(_status.yebailvcheng.completeNumber>=1){
						list.push('我不想再打了，直接在这里结束吧！');
						 list2.push(function(){
							 game.over(true);
						 });
					 }
					 event.list=list2;
					 // if(_status.yebailvcheng.completeNumber%5!=0||_status.yebailvcheng.completeNumber>30){
						 // game.zhu.chooseControl().set(
							// 'choiceList',list).set(
							// 'prompt','请选择一项奖励（当前已通过'+_status.yebailvcheng.completeNumber+'关）');
					// }
					
					game.zhu.chooseControl().set(
						'choiceList',list).set(
						'prompt','请选择一项奖励（当前已通过'+_status.yebailvcheng.completeNumber+'关）');
					// else if(_status.yebailvcheng.completeNumber==10){
						// // game.zhu.addMark('_YBLC_level');
						// event.list=[
							// ['在下一关中召唤sp陈爱琳一同战斗',function(){
								// _status.yebailvcheng.addFellow('ybsp_002chenailin');
							// }],
							// ['在下一关中召唤sp陈爱琳一同战斗',function(){
								// _status.yebailvcheng.addFellow('ybsp_002chenailin');
							// }],
							// ['在下一关中召唤sp陈爱琳一同战斗',function(){
								// _status.yebailvcheng.addFellow('ybsp_002chenailin');
							// }],
							// ['在下一关中召唤sp陈爱琳一同战斗',function(){
								// _status.yebailvcheng.addFellow('ybsp_002chenailin');
							// }],
							// ['我不想再打了，直接在这里结束吧！',function(){
								// game.over(true);
							// }],
						// ];
						// game.zhu.chooseControl().set(
							// 'choiceList',list).set(
							// 'prompt','下一关BOSS战，请选择一项（当前已通过'+_status.yebailvcheng.completeNumber+'关）');
					// }
					// else{
						// // game.zhu.addMark('_YBLC_level');
						// game.zhu.chooseControl().set(
							// 'choiceList',list).set(
							// 'prompt','下一关BOSS战，请选择一项（当前已通过'+_status.yebailvcheng.completeNumber+'关）');
					// }
					'step 2'
					if(result.index==4){
						game.over(true);
						return;
					}
					event.reward=event.list[result.index];//兑换奖励
					_status.characterlist.removeArray(_status.yebailvcheng.used);
					
					var list10=_status.yebailvcheng.completeBattle;
					// event.list10=list10;
					var numb1=_status.yebailvcheng.completeNumber;
					// event.numb1=numb1;
					if(list10.length>=numb1){
						event._result={links:[list10[numb1][0][0]]};
					}
					// if(_status.yebailvcheng.completeNumber==2) {event._result={links:['ybsl_011gaoyuhang']};}
					// else if(_status.yebailvcheng.completeNumber==3) {event._result={links:['ybsl_009liyushan']};}
					// else if(_status.yebailvcheng.completeNumber==4) {event._result={links:['ybsl_008wuyuxin']};}
					// else if(_status.yebailvcheng.completeNumber==5) {event._result={links:['ybsl_010zhouyue']};}
					// else if(_status.yebailvcheng.completeNumber==6) {event._result={links:['ybsl_012zhengjiayi']};}
					// else if(_status.yebailvcheng.completeNumber==7) {event._result={links:['ybsl_002chenailin']};}
					// else if(_status.yebailvcheng.completeNumber==8) {event._result={links:['ybsp_002chenailin']};}
					// else if(_status.yebailvcheng.completeNumber==9) {event._result={links:['ybsp_001sunlisong']};}
					// else if(_status.yebailvcheng.completeNumber==10) {event._result={links:['ybsl_022salt']};}
					
					else game.zhu.chooseButton(['选择下一关出战的对手',[_status.characterlist.randomGets(lib.config.extension_夜白神略_ybsl_wujianghouxuan),'character']],true);
					//-------------------------------------------------此处数值为第二关及以后候选敌人的数目↑↑--------------//
					/*
					else if(_status.yebailvcheng.completeNumber<5){
						game.zhu.chooseButton(['选择下一关出战的对手',[_status.characterlist.randomGets(8),'character']],true);
					}
					else if(_status.yebailvcheng.completeNumber>5){
						game.zhu.chooseButton(['选择下一关出战的对手及其一个跟班',[_status.characterlist.randomGets(14),'character']],2,true);
					}
					else if(_status.yebailvcheng.completeNumber>=10){
						game.zhu.chooseButton(['选择下一关出战的对手及其两个跟班',[_status.characterlist.randomGets(20),'character']],3,true);
					}
					*/
					/*功能正在测试*/
					'step 3'
					_status.event.getParent('phaseLoop').player=game.zhu;
					var source=game.YB_memory01;
					var ybme=game.zhu;
					var name=result.links[0];
					source.revive(null,false);
					 _status.characterlist.remove(name);
					 _status.yebailvcheng.used.push(name);
					 source.uninit();
					 source.init(name);
					 
					var list10=_status.yebailvcheng.completeBattle;
					// event.list10=list10;
					var numb1=_status.yebailvcheng.completeNumber;
					// event.numb1=numb1;
					if(list10.length>=numb1){
						// var numb2=numb1;
						if(list10[numb1][0][1]!=null){
							source.addSkill(list10[numb1][0][1]);
						}
						if(list10[numb1][0][2]){
							list10[numb1][0][2].content(source);
						}
					}
					 // source.addMark('_YBLC_level',Math.floor(_status.yebailvcheng.completeNumber/5)+1);
					 // if(_status.yebailvcheng.completeNumber==4){
						 // source.addSkill('yb009_tuling');
					 // }
					 // if(_status.yebailvcheng.completeNumber==5){
						 // source.addSkill('yb008_jianwu');
					 // }
					 // if(_status.yebailvcheng.completeNumber==6){
						 // source.addSkill('yb016_juli');
						 // if(!source.storage.yb016_juli) {
							 // source.storage.yb016_juli=[1,1,2];
						 // }
						 // else source.storage.yb016_juli[2]=2;
					 // }
					 // if(_status.yebailvcheng.completeNumber==7){
						 // source.addSkill('yb001_wanyue');
						 // source.addSkill('yb001_fufeng');
					 // }
					 // if(_status.yebailvcheng.completeNumber==8){
						 // source.addSkill('yb001_wanyue');
						 // source.addSkill('yb001_fufeng');
					 // }
					 // if(_status.yebailvcheng.completeNumber==9){
						 // source.addSkill('yb018_zheye');
						 // source.addSkill('yb001_fufeng');
					 // }
					 source.lose(source.getCards('hejs'))._triggered=null;
					 game.addVideo('reinit',source,[name]);
					 var gain=4;
					 var add=0;
					 switch(_status.yebailvcheng.completeNumber){
						case 1:gain=5;break;
						case 2:gain=5;add=1;break;
						case 3:gain=6;add=1;break;
						default:gain=6;add=2;break;
					};
					 source.hp+=add;
					 source.maxHp+=add;
					 source.update();
					 source.gain(get.cards(gain))._triggered=null;
					 game.triggerEnter(source);
					//--------------------------招降模块
					_status.yebailvcheng.completeYbsl.push(
						['在下一关中召唤'+get.translation(name)+'一同战斗',function(){
						_status.yebailvcheng.addFellow(name);
						}]
					)
					//--------------------------召唤炮灰
					//if(result.links[1]){_status.yebailvcheng.addDiren(result.links[1]);}
					//if(result.links[2]){_status.yebailvcheng.addPaohui(result.links[2]);}
							//---------------------------
					/*
							 if(result.links[1]){
						var paohui=game.YB_memory01;
						 var name2=result.links[1];
								paohui.revive(null,false);
						 _status.characterlist.remove(name2);
								 _status.yebailvcheng.used.push(name2);
						 paohui.uninit();
						paohui.dataset.position=3;
						paohui.init(name2);
						 game.addVideo('reinit',paohui,[name2]);
						 paohui.lose(paohui.getCards('hejs'))._triggered=null;
						 paohui.hp+=1;
						 paohui.maxHp+=1;
								 paohui.update();
						 paohui.gain(get.cards(5))._triggered=null;
							}
					if(result.links[2]){
						var zabing=game.YB_memory01;
						var name3=result.links[2];
						zabing.revive(null,false);
						_status.characterlist.remove(name3);
						 _status.yebailvcheng.used.push(name3);
						 zabing.uninit();
						zabing.dataset.position=3;
						 zabing.init(name3);
						 game.addVideo('reinit',zabing,[name3]);
						 zabing.lose(zabing.getCards('hejs'))._triggered=null;
						 zabing.hp+=1;
						 zabing.maxHp+=1;
						zabing.update();
						 zabing.gain(get.cards(5))._triggered=null;
					}
					*/
					if(event.reward) event.reward();
					
					// var list10=_status.yebailvcheng.completeBattle;
					// // event.list10=list10;
					// var numb1=_status.yebailvcheng.completeNumber;
					// event.numb1=numb1;
					if(list10.length>=numb1){
						// var numb2=numb1;
						if(list10[numb1][1][0]!=null){
							_status.yebailvcheng.addFellow(list10[numb1][1][0]);
						}
						if(list10[numb1][1][1]!=null){
							ybme.addSkill(list10[numb1][1][1]);
						}
					}
					'step 4'
					var cards=Array.from(ui.ordering.childNodes);
					while(cards.length){
						cards.shift().discard();
					}
					var evt=_status.event.getParent('phase');
					if(evt){
						game.resetSkills();
						_status.event=evt;
						_status.event.finish();
						_status.event.untrigger(true);
					}
				},
				yblc_juqing1:function(){
					
				}
			};
			_status.yebailvcheng.player_number=get.config('player_number');
			game.saveConfig('player_number','2','identity');
		},
		content:{
			submode:'normal',
			chooseCharacterBefore:function(){
				game.identityVideoName='夜白旅程';
				game.saveConfig('player_number',_status.yebailvcheng.player_number,'identity');
				game.chooseCharacter=function(){
					var next=game.createEvent('chooseCharacter',false);
					next.showConfig=true;
					next.setContent(function(){
						'step 0'
						ui.arena.classList.add('choose-character');
						game.me.identity='zhu';
						game.zhu=game.me;
						game.zhu.setIdentity();
						game.zhu.identityShown=true;
						game.zhu.node.identity.classList.remove('guessing');
						game.YB_memory01=game.me.next;
						game.YB_memory01.identity='nei';
						game.YB_memory01.setIdentity();
						game.YB_memory01.identityShown=true;
						game.YB_memory01.node.identity.classList.remove('guessing');
						game.YB_memory02=game.me.next;
						game.YB_memory02.identity='nei';
						game.YB_memory02.setIdentity();
						game.YB_memory02.identityShown=true;
						game.YB_memory02.node.identity.classList.remove('guessing');
						game.YB_memory03=game.me.next;
						game.YB_memory03.identity='nei';
						game.YB_memory03.setIdentity();
						game.YB_memory03.identityShown=true;
						game.YB_memory03.node.identity.classList.remove('guessing');
						event.list=[];
						for(var i in lib.character){
							if(lib.filter.characterDisabled(i)) continue;
							event.list.push(i);
						}
						event.list.randomSort();
						_status.characterlist=event.list.slice(0);
						var list=event.list.slice(0,5);
						var list2=['ybslshen_014liutianyu'];
						delete event.swapnochoose;
						var dialog;
						if(event.swapnodialog){
							dialog=ui.dialog;
							event.swapnodialog(dialog,list);
							delete event.swapnodialog;
						}
						else{
							var str='选择角色';
							var strt='神夜白将在此界面常驻，方便选择<br>（若有其他想点的将可以联系作者进行加入）';
							//或者在上边list2方括号里自己写武将ID，将与将之间用英文逗号隔开
							dialog=ui.create.dialog(str,'hidden',strt,[list,'character'],[list2,'character']);
						}
						dialog.setCaption('选择角色');
						game.me.chooseButton(dialog,true).set('onfree',true);
						ui.create.cheat=function(){
							_status.createControl=ui.cheat2;
							ui.cheat=ui.create.control('更换',function(){
								if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
									return;
								}
								if(game.changeCoin){
									game.changeCoin(-3);
								}
								event.list.randomSort();
								list=event.list.slice(0,5);
								var buttons=ui.create.div('.buttons');
								var node=_status.event.dialog.buttons[0].parentNode;
								_status.event.dialog.buttons=ui.create.buttons(list,'character',buttons);
								_status.event.dialog.content.insertBefore(buttons,node);
								buttons.animate('start');
								node.remove();
								game.uncheck();
								game.check();
							});
							delete _status.createControl;
						};
						if(lib.onfree){
							lib.onfree.push(function(){
								event.dialogxx=ui.create.characterDialog('heightset');
								if(ui.cheat2){
									ui.cheat2.animate('controlpressdownx',500);
									ui.cheat2.classList.remove('disabled');
								}
							});
						}
						else{
							event.dialogxx=ui.create.characterDialog('heightset');
						}
						ui.create.cheat2=function(){
							ui.cheat2=ui.create.control('自由选将',function(){
								if(this.dialog==_status.event.dialog){
									if(game.changeCoin){
										game.changeCoin(50);
									}
									this.dialog.close();
									_status.event.dialog=this.backup;
									this.backup.open();
									delete this.backup;
									game.uncheck();
									game.check();
									if(ui.cheat){
										ui.cheat.animate('controlpressdownx',500);
										ui.cheat.classList.remove('disabled');
									}
								}
								else{
									if(game.changeCoin){
										game.changeCoin(-10);
									}
									this.backup=_status.event.dialog;
									_status.event.dialog.close();
									_status.event.dialog=_status.event.parent.dialogxx;
									this.dialog=_status.event.dialog;
									this.dialog.open();
									game.uncheck();
									game.check();
									if(ui.cheat){
										ui.cheat.classList.add('disabled');
									}
								}
							});
							if(lib.onfree){
								ui.cheat2.classList.add('disabled');
							}
						}
						if(!_status.brawl||!_status.brawl.chooseCharacterFixed){
							if(!ui.cheat&&get.config('change_choice'))
								ui.create.cheat();
							if(!ui.cheat2&&get.config('free_choose'))
								ui.create.cheat2();
						}
						'step 1'
						if(ui.cheat){
							ui.cheat.close();
							delete ui.cheat;
						}
						if(ui.cheat2){
							ui.cheat2.close();
							delete ui.cheat2;
						}
						game.addRecentCharacter(result.buttons[0].link);
						game.zhu.init(result.buttons[0].link);
						_status.characterlist.remove(result.buttons[0].link);
						_status.yebailvcheng.used.add(result.buttons[0].link);
						// game.zhu.chooseControl('一阶','二阶','三阶','四阶','五阶').set('prompt','请选择武将等阶');
						'step 2'
						var numb = 4;
						var hp=Math.floor(numb/2);
						event.draw=Math.floor((numb+1)/2);
						if(hp){
							game.zhu.hp+=hp;
							game.zhu.maxHp+=hp;
							game.zhu.update();
						}
						// game.zhu.addMark('_YBLC_level');
						// var list666=_status.characterlist.randomGets(lib.config.extension_夜白神略_ybsl_wujianghouxuan);
						// var list666=[];
						// list666.push('ybsl_059starsFall3');
						// list666.push('ybsl_012zhengjiayi');
						// game.zhu.chooseButton(['请选择对手的登场武将',[list666,'character']],true);
						'step 3'
						game.YB_memory01.init('ybsl_012zhengjiayi');
						game.YB_memory02.init('ybsl_005wangruobing');
						game.YB_memory01.init('ybsl_012zhengjiayi');
						// game.YB_memory01.addMark('_YBLC_level');
						_status.characterlist.remove(character);
						_status.yebailvcheng.used.add(character);
						if(event.draw){
							game.zhu.directgain(get.cards(event.draw));
						}
						setTimeout(function(){
							ui.arena.classList.remove('choose-character');
						},500);
						_status.yebailvcheng.completeYbsl.push([
							'在下一关中召唤'+get.translation(character)+'一同战斗',
							function(){_status.yebailvcheng.addFellow(character);
						}])
						var pack={
							character:{
								pujing:['male','qun',1,[],[]],
								huban:['male','qun',2,[],[]],
								caiyang:['male','qun',1,['zhuixi'],[]],
							},
							translate:{
								pujing:'普净',
								huban:'胡班',
								_YBLC_level:'特权加点',
							},
							skill:{
								yebailvcheng_phase:{
									trigger:{global:'phaseAfter'},
									forced:true,
									silent:true,
									firstDo:true,
									content:function(){
										player.removeSkill('yebailvcheng_phase');
										player.insertPhase();
									},
								},
							},
						};
						for(var i in pack){
							for(var j in pack[i]){
								lib[i][j]=pack[i][j];
							}
						}
						delete pack.skill;
						game.addVideo('arrangeLib',null,pack);
						game.addOverDialog=function(dialog){
							dialog.addText('共计通过'+_status.yebailvcheng.completeNumber+'关');
						};
						lib.element.player.dieAfter=function(){
							if(this==game.fellow) return;
							_status.characterlist.removeArray(_status.yebailvcheng.used);
							if(game.zhu==this||!_status.characterlist.length){
								var bool=false;
								if(_status.yebailvcheng.completeNumber>5) bool=true;
								game.over(bool);
							}
							else{
								var next=game.createEvent('yebailvcheng_replace',false);
								next.setContent(_status.yebailvcheng.replace_character);
							}
						};
						lib.element.player.dieAfter2=function(){
							_status.characterlist.removeArray(_status.yebailvcheng.used);
						};
						game.zhu.dieAfter=lib.element.player.dieAfter;
						game.YB_memory01.dieAfter=lib.element.player.dieAfter;
						game.zhu.dieAfter2=lib.element.player.dieAfter2;
						game.YB_memory01.dieAfter2=lib.element.player.dieAfter2;
					});
				};
			}
		}
	}
	

}