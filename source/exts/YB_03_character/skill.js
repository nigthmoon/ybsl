import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

const skill = {
	//-------------------------林逸
	xhly_yulong:{
		audio:'ext:夜白神略/audio/character:2',
		trigger: {
			player: "changeHp",
		},
		initList() {
			var list,
				skills = [],
				banned = [],
				bannedInfo = ["游戏开始时"];
			if (get.mode() == "guozhan") {
				list = [];
				for (var i in lib.characterPack.mode_guozhan) list.push(i);
			} else if (_status.connectMode) list = get.charactersOL();
			else {
				list = [];
				for (var i in lib.character) {
					if (lib.filter.characterDisabled2(i) || lib.filter.characterDisabled(i)) continue;
					list.push(i);
				}
			}
			for (var i of list) {
				if (i.indexOf("gz_jun") == 0) continue;
				for (var j of lib.character[i][3]) {
					var skill = lib.skill[j];
					if (!skill || skill.zhuSkill || banned.includes(j)) continue;
					if (skill.ai && (skill.ai.combo || skill.ai.neg)) continue;
					const infox = get.plainText(get.skillInfoTranslation(j));
					if (bannedInfo.some(item => infox.includes(item))) continue;
					const info = get.plainText(get.translation(j));
					if ("龙".split("/").some(item => info.includes(item))) skills.add(j);
				}
			}
			_status.xhly_yulong_list = skills;
		},
		locked:true,
		filter(event, player) {
			const hp = player.getHp();
			// if (hp <= 0) return false;
			return !player
				.getAllHistory("custom", evt => evt.xhly_yulong_num)
				.map(evt => evt.xhly_yulong_num)
				.includes(hp);
		},
		async cost(event, trigger, player) {
			player.getHistory("custom").push({
				xhly_yulong_num: player.getHp(),
			});
			if (!_status.xhly_yulong_list) lib.skill.xhly_yulong.initList();
			var list = _status.xhly_yulong_list
				.filter(function (i) {
					return !player.hasSkill(i, null, null, false);
				})
				.randomGets(3);
			if (list.length == 0) event.result={bool:false};
			if (list.length == 1) event.result={bool:true,cost_data:list};
			else {
				event.videoId = lib.status.videoId++;
				var func = function (skills, id, target) {
					var dialog = ui.create.dialog("forcebutton");
					dialog.videoId = id;
					dialog.add("令" + get.translation(target) + "获得一个技能");
					for (var i = 0; i < skills.length; i++) {
						dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【' + get.translation(skills[i]) + "】</div><div>" + lib.translate[skills[i] + "_info"] + "</div></div>");
					}
					dialog.addText(" <br> ");
				};
				if (player.isOnline()) player.send(func, list, event.videoId, player);
				else if (player == game.me) func(list, event.videoId, player);
				event.resultx = await player.chooseControl(list).set("ai", function () {
					var controls = _status.event.controls;
					// if (controls.includes("cslilu")) return "cslilu";
					// if (controls.includes("zhichi")) return "zhichi";
					return controls[0];
				}).forResult();
				if(event.resultx.control){
					console.log(event)
					game.broadcastAll("closeDialog", event.videoId);
					event.result ={bool:true,cost_data:event.resultx.control};
				}
			}
		},
		async content(event, trigger, player) {
			console.log(event)
			if(!lib.skill[event.cost_data].audioname2)lib.skill[event.cost_data].audioname2={}
			lib.skill[event.cost_data].audioname2.ssj_ybxh_linyi='xhly_yulong'
			player.addSkills(event.cost_data);
		},
		init(player){
			if(player
				.getAllHistory("custom", evt => evt.xhly_yulong_num)
				.map(evt => evt.xhly_yulong_num)
			){
				for(var i of player.getAllHistory("custom")){
					if(i['xhly_yulong_num'])delete i['xhly_yulong_num'];
				}
			}
		}
	},
	'xhly_tiancan':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'useCard',
		},
		filter:function(e,p){
			if(e.player==p)return false;
			return e.player.countCards('h')<=p.countCards('h');
		},
		content:function(){
			player.viewHandcards(trigger.player);
		},
	},
	'xhly_baihe':{
		audio:'ext:夜白神略/audio/character:2',
		init:function(player,skill){
			player.storage.xhly_baihe_list=lib.skill.xhly_baihe.getBaihe(player);
		},
		getBaihe:function(player){
			return ['sha','shan','tao','jiu'];
		},
		mark:true,
		marktext:'鹤',
		intro:{
			content:function(storage,player,skill){
				var str='';
				var list=lib.skill.xhly_baihe.getBaihe(player),list2=player.storage.xhly_baihe_list;
				str+='';
				for(var j=0;j<list.length;j++){
					if(j!=0)str+='、';
					if(!list2.includes(list[j])){str+='<span class=greentext>'+get.translation(list[j])+'</span>'}
					else{str+=get.translation(list[j]);}
				}
				return str;
			}
		},
		trigger:{
			player:'useCard1',
			target:'useCardToTargeted',
		},
		forced:true,
		filter:function(event,player){
			if(!player.storage.xhly_baihe_list.includes(event.card.name))return false;
			return true;
		},
		content:function(){
			'step 0'
			player.storage.xhly_baihe_list.remove(trigger.card.name);
			'step 1'
			if(player.storage.xhly_baihe_list.length==0){
				player.storage.xhly_baihe_list=lib.skill.xhly_baihe.getBaihe(player);
				player.gainMaxHp();
				player.recover();
			}
			else{
				event.finish();
			}
		},
	},
	'xhly_wuji':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{global:'useCard1'},
		direct:true,
		filter:(e,p,c)=>{
			if(p.hasSkill('xhly_wuji_block'))return false;
			if(get.suit(e.cards[0])==null)return false;
			return get.type2(e.card)!='equip';
		},
		init:function(player,skill){
			if(!player.storage.xhly_wuji_wuji)player.storage.xhly_wuji_wuji=[];
		},
		// content:()=>{
		// 	'step 0'
		// 	event.name=trigger.card.name;
		// 	event.suit=get.suit(trigger.cards[0]);
		// 	player.chooseControl('学习','cancel2').set('prompt2','是否学习'+get.translation(event.name)+'的'+get.translation(event.suit)+'变化？');
		// 	'step 1'
		// 	if(result.control=='cancel2'){event.finish();}
		// 	'step 2'
		// 	if(!player.storage.xhly_wuji_wuji.contains(event.name)){
		// 		player.storage.xhly_wuji_wuji.push(event.name);
		// 	}
		// 	if(!player.storage.xhly_wuji_wuji[event.name]){
		// 		player.storage.xhly_wuji_wuji[event.name]=[];
		// 	}
		// 	'step 3'
		// 	if(!(player.storage.xhly_wuji_wuji[event.name]).contains(event.suit)){
		// 		player.storage.xhly_wuji_wuji[event.name].push(event.suit);
		// 		player.addTempSkill('xhly_wuji_block');
		// 		game.log(player,'学到了，'+get.translation(event.name)+'的'+get.translation(event.suit)+'变化');
		// 	}
		// 	else{game.log(player,'，你好像已经学会了哦，'+get.translation(event.name)+'的'+get.translation(event.suit)+'变化')}
		// },
		content:function*(event,map){
			let player=map.player,trigger=map.trigger;
			let name=trigger.card.name,suit=get.suit(trigger.cards[0]);
			var result = yield player.chooseControl('学习','cancel2').set('prompt2','是否学习'+get.translation(event.name)+'的'+get.translation(event.suit)+'变化？');
			if(result.control=='cancel2'){event.finish();}
			else{
				if(!player.storage.xhly_wuji_wuji.includes(name)){
					player.storage.xhly_wuji_wuji.push(name);
				}
				if(!player.storage.xhly_wuji_wuji[name]){
					player.storage.xhly_wuji_wuji[name]=[];
				}
				if(!(player.storage.xhly_wuji_wuji[name]).includes(suit)){
					player.storage.xhly_wuji_wuji[name].push(suit);
					player.addTempSkill('xhly_wuji_block');
					game.log(player,'学到了，'+get.translation(name)+'的'+get.translation(suit)+'变化');
				}
				else{game.log(player,'，你好像已经学会了哦，'+get.translation(name)+'的'+get.translation(suit)+'变化')}
			}
		},
		mark:true,
		marktext:'武',
		intro:{
			name:'学会的武技',
			content:function(storage,player,skill){
				var str='<br>';
				for(var i of player.storage.xhly_wuji_wuji){
					str+=get.translation(i);
					str+='：';
					str+=get.translation(player.storage.xhly_wuji_wuji[i]);
					str+='<br>';
				};
				return str;
			},
		},
		group:['xhly_wuji_draw','xhly_wuji_use'],
		subSkill:{
			block:{onremove:true,},
		},
	},
	xhly_wuji_use:{
		enable:['chooseToUse','chooseToRespond'],
		name:'武技',
		filter:function (event,player){
			if(player.countCards('h',function(card){
				return card.hasGaintag('xhly_wuji_draw');
			})<1) return false;
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;
			for(var i of player.storage.xhly_wuji_wuji){
				if(evt({name:i},player,event)) return true;
			};
			return false;
		},
		chooseButton:{
			dialog:function (event,player){
				// player.countCards('h',function(card){
				// 	if(card.hasGaintag('xhly_wuji_draw'))card.classList.add('thrownhighlight');
				// })
				var list=[];
				for(var i=0;i<lib.inpile.length;i++){
					if(player.storage.xhly_wuji_wuji.includes(lib.inpile[i])){
						list.push(['<span style=\"color:#e328b7\">'+get.YB_tobo2(player.storage.xhly_wuji_wuji[lib.inpile[i]])+'</span>',,lib.inpile[i]]);
					}
				}
				return ui.create.dialog('万能武技','可转化为目标牌的花色标记在牌的左上角',[list,'vcard']);
			},
			filter:function (button,player){
				return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
			},
			check:function (button){
				if(_status.event.getParent().type!='phase') return 1;
				var player=_status.event.player;
				if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan','diaohulishan'].includes(button.link[2])) return 0;
				return player.getUseValue({
					name:button.link[2],
					nature:button.link[3],
				});
			},
			backup:function (links,player){
				return {
					filterCard:function(card,player){
						var suit=get.suit(card);
						var list=player.storage.xhly_wuji_wuji[links[0][2]];
						for(var i of list){
							if(i==suit)return card.hasGaintag('xhly_wuji_draw');
						}
						return false;
					},
					selectCard:1,
					complexCard:true,
					position:'h',
					popname:true,
					viewAs:{name:links[0][2]},
					precontent:function(){
						player.logSkill('xhly_wuji_use');
					},
				};
			},
			prompt:function (links,player){
				return '将一张真气牌当作'+get.translation(links[0][2])+'使用';
			},
		},
		hiddenCard:function (player,name){
			return player.storage.xhly_wuji_wuji.includes(name)&&player.countCards('h')>=1;
		},
		ai:{
			fireAttack:true,
			respondSha:true,
			respondShan:true,
			skillTagFilter:function (player){
				if(player.countCards('h')<1) return false;
			},
			order:1,
			result:{
				player:function (player){
					if(_status.event.dying) return get.attitude(player,_status.event.dying);
					return 1;
				},
			},
		},
		
	},
	xhly_wuji_draw:{
		trigger:{
			player:'gainEnd',
		},
		filter:function(event,player){
			return (event.getParent(2).name=='phaseDraw')&&event.player.countCards('h');
		},
		direct:true,
		content:function(){
			'step 0'
			trigger.player.addGaintag(trigger.cards,'xhly_wuji_draw');
		},
	},
	'xhly_duotian':{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{player:'phaseDrawBegin2'},
		filter:(e,p)=>{return p.storage.xhly_duotian_ey},
		content:()=>{
			'step 0'
			trigger.num+=player.storage.xhly_duotian_ey;
			'step 1'
			player.storage.xhly_duotian_ey=0;
		},
		mark:true,
		intro:{
			content:function(event,player,storage){
				if(player.storage.xhly_duotian_ey)return get.translation(player.storage.xhly_duotian_ey);
				return '0';
			},
		},
		group:['xhly_duotian_ey'],
		derivation:'xhly_duotian_ey',
		subSkill:{
			ey:{
				name:'夺天',
				audio:'xhly_duotian',
				trigger:{player:['loseAfter','cardsDiscardAfter','loseAsyncAfter'],},
				filter:function(event,player){
					return true;
				},
				// preHidden:true,
				frequent:function(event,player){
					if(!player.storage.xhly_duotian_ey||event.num>player.storage.xhly_duotian_ey)return true;
					else if(player.storage.xhly_duotian_ey&&player.storage.xhly_duotian_ey<=event.num)return false;
				},
				prompt:'是否记录此次失去牌的数量？',
				content:()=>{player.storage.xhly_duotian_ey=trigger.num},
				check:function(event,player){
					if(!player.storage.xhly_duotian_ey||event.num>player.storage.xhly_duotian_ey)return true;
				},
			},
		},
	},
	//---------------------张龙李妖
	'xhzlly_guihuo':{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:"damageBegin4",
			source:"damageBegin2",
		},
		filter:function(event){
			if(event._notrigger.includes(event.player)) return false;
			return event.source&&event.player&&
			event.player.isIn()&&event.source.isIn()&&event.source!=event.player;
		},
		check:function(event,player){
			if(player.isPhaseUsing()) return true;
			if(event.player==player) return get.attitude(player,event.source)>-3;
			return get.attitude(player,event.player)>-3;
		},
		logTarget:function(event,player){
			if(event.player==player) return event.source;
			return event.player;
		},
		preHidden:true,
		content:function(){
			trigger.num++;
			if(!trigger.xhzlly_guihuo)trigger.xhzlly_guihuo=[];
			trigger.xhzlly_guihuo.add(player);
		},
		group:['xhzlly_guihuo_add','xhzlly_guihuo_ddd'],
		subSkill:{
			ddd:{
				trigger:{
					player:"damageEnd",
					source:"damageSource",
				},
				forced:true,
				filter:function(event,player){
					if(!event.xhzlly_guihuo)return false;
					if(!event.xhzlly_guihuo.includes(player))return false;
					if(event._notrigger.includes(event.player)) return false;
					return event.source&&event.player&&
					event.player.isIn()&&event.source.isIn()&&event.source!=event.player;
				},
				check:function(event,player){
					if(player.isPhaseUsing()) return true;
					if(event.player==player) return get.attitude(player,event.source)>-3;
					return get.attitude(player,event.player)>-3;
				},
				logTarget:function(event,player){
					if(event.player==player) return event.source;
					return event.player;
				},
				preHidden:true,
				content:function(){
					"step 0"
					event.target=lib.skill.xhzlly_guihuo_ddd.logTarget(trigger,player);
					"step 1"
					if(player&&target&&player.isIn()&&target.isIn()){
						if(target.countGainableCards(player,'hej')){
							player.gainPlayerCard('hej',target,true);
						}
					}
				},
			},
			add:{
				trigger:{
					player:"die",
				},
				forced:true,
				forceDie:true,
				skillAnimation:true,
				animationColor:"gray",
				filter:function(event){
					return event.source&&event.source.isIn();
				},
				content:function(){
					trigger.source.addSkill('xhzlly_guihuo');
				},
				logTarget:"source",
			}
		}
	},

	/*
	'xhzlly_guihuo':'诡祸',
	'xhzlly_guihuo_info':'锁定技，当你对其他角色造成伤害时或受到其他角色造成的伤害时，此伤害+1，然后若双方均存活，你获得对方的一张牌；锁定技，杀死你的角色获得【诡祸】。',
	*/
	/*
	_ssj_ybxh_neijialiupai:{
		charlotte:true,
		direct:true,
		ruleSkill:true,
		trigger:{
			player:'phaseDrawAfter',
		},
		filter:function(event,player){
			if(!player.hasXhclan('内家流派'))return false;
			return event.player.getHistory('gain',function(evt){
				return evt.getParent('phaseDraw')==event;
			}).length>0;
		},
		
	},
	*/
	xhwzf_cangyan:{
		audio:'ext:夜白神略/audio/character:2',
		group:['xhwzf_cangyan_lose','xhwzf_cangyan_give'],
		subSkill:{
			lose:{
				audio:'xhwzf_cangyan',
				forced:true,
				trigger:{
					player:'discardAfter',
				},
				filter(event,player){
					for(var i of event.cards){
						if(_status.xhwzf_cangyan_characterlist.includes(i))return true;
					}
				},
				content(){
					player.loseHp();
				},
			},
			give:{
				audio:'xhwzf_cangyan',
				forced:true,
			},
		},
		trigger:{
			player:['phaseZhunbeiBegin','phaseJieshuBegin'],
		},
		filter(event,player,name){
			if(name=='phaseZhunbeiBegin')return true;
			else {
				if(player.countCards('h',c=>_status.xhwzf_cangyan_characterlist.includes(c))>0)return true;
			}
		},
		init(player){
			if (!_status.xhwzf_cangyan_characterlist) {
				_status.xhwzf_cangyan_characterlist=[];
			}
		},
		async cost(event,trigger,player){
			if(event.triggername=='phaseZhunbeiBegin'){
				event.result = await player.chooseBool().set('prompt',get.prompt2('xhwzf_cangyan')).forResult();
			}
			else event.result = {bool : true};
		},
		async content(event,trigger,player){
			var func = function(){
				if (!_status.characterlist) {
					lib.skill.pingjian.initList();
				}
				var characters = _status.characterlist.filter(ch=>lib.character[ch][0]=='female');
				// console.log(characters)
				var character = characters.randomSort();
				// console.log(character)
				var name = character[0];
				if(!lib.card['xhwzf_cangyan_'+name]){
					lib.card['xhwzf_cangyan_'+name]={
						fullimage: true,
						image: "character:" + name,
						// type:'character',
						ai:{
							value:10,
						}
					}
					// lib.translate.character='武将'
					lib.translate['xhwzf_cangyan_'+name]=get.translation(name);
				}
				var card = game.createCard("xhwzf_cangyan_" + name, "none", "none");
				if (!_status.xhwzf_cangyan_characterlist) {
					_status.xhwzf_cangyan_characterlist=[];
				}
				_status.xhwzf_cangyan_characterlist.push(card);
				return card;
			}
			if(event.triggername=='phaseZhunbeiBegin'){
				await player.gain(func(),'gain2')
				// card[0].addGaintag('xhwzf_cangyan');
			}
			else{
				var num = player.countCards('h',c=>_status.xhwzf_cangyan_characterlist.includes(c));
				if(num>=1)await player.draw(2);
				if(num>=2)await player.recover();
				if(num>=3){
					await player.gainMaxHp();
					await player.gain(func(),'gain2')
					// card[0].addGaintag('xhwzf_cangyan');
				}
			}
		},
	},
}