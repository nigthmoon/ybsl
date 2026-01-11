import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

/** @type { importCharacterConfig['skill'] } */
const skill = {
			
	//---------------------------鬼神易的足迹
	//---------------------------尹姬
	'dz013_qingling':{
		inherit:'dz014_qingling',
		audio:'ext:夜白神略/audio/character:1',
	},
	'dz013_shanwu':{
		inherit:'dz017_shanwu',
		audio:'ext:夜白神略/audio/character:1',
	},
	//---------------------------本人（鬼神易）
	'dz014_xianji':{
		audio:'ext:夜白神略/audio/character:1',
		audioname2:{
			ybmjz_shen_caopi_kui:'',
		},
		enable:'chooseToUse',
		filter:function (event,player){
			if(!player.storage.dz014_xinkui) return false;
			if(event.type=='dying'){
				if(player.storage.dz014_xinkui!=event.dying) return false;
				return true;
			}
			else if(event.getParent().name=='phaseUse'){
				return true;
			}
			return false;
		},
		logTarget:function (event,trigger){
			return player.storage.dz014_xinkui;
		},
		content:function (){
			'step 0'
			var target=player.storage.dz014_xinkui;
			event.target=target;
			event.num=_status.event.getParent(2).type=='dying'?1-_status.event.getParent(2).dying.hp:player.hp;
			'step 1'
			target.gainMaxHp(player.maxHp);
			if(event.num>0) target.recover(event.num);
			'step 2'
			var next=player.die();
			if(_status.event.getParent(2).type=='dying'){
				event.next.remove(next);
				_status.event.getParent(2).after.push(next);
			};
		},
		ai:{
			order:0.5,
			skillTagFilter:function (player,tag,target){
				if(player.storage.dz014_xinkui!=target) return false;
			},
			save:true,
			result:{
				player:function(){
					let tri = _status.event.getTrigger()
					if (tri && tri.name === "dying"){
						return 1;
					}
					else return -114514;
				},
			},
		},
	},
	'dz014_yangkui':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:1',
		trigger:{
			global:'loseMaxHpBegin',
		},
		filter:function (event,player){
			return player.storage.dz014_xinkui&&player.storage.dz014_xinkui==event.player;
		},
		forced:true,
		content:function (){
			player.gainMaxHp(trigger.num);
		},
		group:'dz014_yangkui_die',
		subSkill:{
			die:{
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					player:'phaseJieshuBegin',
				},
				filter:function (event,player){
					return player.storage.dz014_xinkui&&!player.storage.dz014_xinkui.isAlive();
				},
				forced:true,
				content:function (){
					player.die();
				},
				sub:true,
			},
		},
	},
	'dz014_shanwu':{
		inherit:'dz017_shanwu',
		audio:'ext:夜白神略/audio/character:1',
	},
	'dz014_qingling':{//------------轻灵
		preHidden:true,
		audio:'ext:夜白神略/audio/character:1',
		forced:true,
		trigger:{
			player:'damageBegin4',
		},
		filter:function (event,player){
			return event.num>1;
		},
		content:function (){
			trigger.cancel();
			player.loseHp();
		},
		ai:{
			filterDamage:true,
		},
		mod:{
			maxHandcard:function (player,num){
				return num+1;
			},
		},
	},
	'dz014_fuhua':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:1',
		trigger:{
			player:['useCard','phaseBegin'],
		},
		forced:true,
		filter:function (event,player){
			if(event.name=='phase') return true;
			if(get.color(event.card)=='none') return false;
			return get.color(event.card)=='black'||player.hasMark('dz014_fuhua');
		},
		content:function (){
			if(trigger.name=='phase'||get.color(trigger.card)=='black'){
				player.addMark('dz014_fuhua');
			}else player.removeMark('dz014_fuhua');
		},
		marktext:'腐',
		intro:{
			name:'腐',
			content:'mark',
		},
		mod:{
			maxHandcard:function (player,num){
				return num+player.countMark('dz014_fuhua');
			},
		},
	},
	'dz014_xinsheng':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:1',
		trigger:{
			player:['phaseJieshuBegin','dying'],
		},
		forced:true,
		filter:function (event,player){
			var num=player.countMark('dz014_fuhua');
			return num>player.maxHp&&num>=3;
		},
		content:function (){
			'step 0'
			var num=player.countMark('dz014_fuhua');
			player.removeMark('dz014_fuhua',num);
			player.draw(num);
			player.loseMaxHp();
			'step 1'
			var num=player.maxHp-player.hp;
			if(num>0) player.recover(num);
		},
		ai:{
			combo:'dz014_fuhua',
		}
	},
	'dz014_xinkui':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:1',
		trigger:{
			global:'dieAfter',
		},
		forced:true,
		filter:function (event,player){
			if(!player.side) player.side=player.playerid;
			return !event.player.isAlive()&&(!event.player.side||event.player.side!=player.side);
		},
		available:function (mode){
			if(['versus','boss','chess'].includes(mode)) return false;
		},
		logTarget:'player',
		content:function (){
			game.addGlobalSkill('autoswap');
			var fun=function(self,me){
				me=(me||game.me);
				var that=this._trueMe||this;
				if(that.isMad()||game.notMe) return false;
				if(this===me){
					if(self) return true;
					return false;
				}
				if(that===me||this==me._trueMe) return true;
				if(_status.connectMode) return false;
				if(lib.config.mode=='versus'){
					if(_status.mode=='three') return this.side==me.side;
					if(_status.mode=='standard') return lib.storage.single_control&&this.side==me.side;
					if(_status.mode=='four') return get.config('four_phaseswap')&&this.side==me.side;
					if(_status.mode=='two') return get.config('two_phaseswap')&&this.side==me.side;
					return false;
				}
				else if(lib.config.mode=='boss'){
					if(me.side) return false;
					return this.side==me.side&&get.config('single_control');
				}
				else if(game.chess){
					if(lib.config.mode=='chess'){
						if(_status.mode=='combat'&&!get.config('single_control')) return false;
					}
					return this.side==me.side;
				};
				if(this.side&&this.side==me.side) return true;
				return false;
			};
			lib.element.player.isUnderControl=fun;
			for(var i of game.players){
				i.isUnderControl=fun;
			};
			if(!player.side) player.side=player.playerid;
			trigger.player.side=player.side;
			trigger.player._trueMe=player;
			if(trigger.player==game.me){
				game.notMe=true;
				if(!_status.auto) ui.click.auto();
			}
			trigger.player.init('dzsl_014xinzhikui');
			trigger.player.storage.dz014_xinkui=player;
			if (!lib.translate['commoner']) lib.translate['commoner'] = '民';
			trigger.player.identity = 'commoner';
			trigger.player.setIdentity('commoner');
			trigger.player.identityShown = trigger.player.storage.dz014_xinkui.identityShown;
			trigger.player.ai.modAttitudeFrom = function (from, to, att) {
				const source = game.findPlayer(target => target == from.side || target.side == from.side && target.identity != 'commoner');
				if (to == from.side || to.side == from.side) return 20;
				return get.attitude(source, to);
			};
			trigger.player.ai.modAttitudeTo = function (from, to, att) {
				const source = game.findPlayer(target => target == to.side || target.side == to.side && target.identity != 'commoner');
				if (from == to.side || from.side == to.side) return 20;
				return get.attitude(from, source) * (to.identity == 'commoner' ? 0.8 : 1);
			};
			trigger.player.revive(1,false);
			trigger.player.draw(2);
		},
	},
	'dz014_zaomeng':{//--------------造梦
		audio:'ext:夜白神略/audio/character:1',
		trigger:{
			global:'useCard',
		},
		filter:function (event,player){
			if(get.color(event.card)=='none') return false;
			return player.hasZhuSkill('dz014_zaomeng')&&event.player!=player&&(get.color(event.card)=='black'||player.hasMark('dz014_fuhua'))&&event.player.group=='YB_memory';
		},
		// direct:true,
		zhuSkill:true,
		cost(){
			var bool=get.color(trigger.card)=='black';
			var str='令'+get.translation(player);
			str+=bool?'获得':'移除';
			str+='一枚“腐”标记？'
			event.bool=bool;
			event.result = trigger.player.chooseBool(get.prompt('dz014_zaomeng',player),str).set('ai',function(){
				var att=get.attitude(_status.event.player,_status.event.getParent().player);
				var bool=_status.event.bool;
				if(att>0) return bool;
				else return !bool;
			}).set('bool',bool).forResult();
		},
		content:function (){
			var bool=get.color(trigger.card)=='black';
			if(bool) player.addMark('dz014_fuhua');
			else player.removeMark('dz014_fuhua');
		},
		ai:{
			combo:'dz014_fuhua',
		},
	},
	//---------------------------王海茹（鬼神易）
	'dz015_enguang':{
		audio:'ext:夜白神略/audio/character:1',
		zhuSkill:true,
		global:'dz015_enguang_2',
		subSkill:{
			'2':{
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					global:'damageBegin4',
				},
				filter:function (event,player){
					return player.group=='YB_memory'&&event.player!=player&&event.player.hasZhuSkill('dz015_enguang')&&(!event.player.storage.dz015_enguang||!event.player.storage.dz015_enguang.includes(player))
				},
				check:function (event,player){
					var num=player.countCards('h','tao')+player.countCards('h','jiu')+player.hp;
					if(get.attitude(player,event.player)<4) return false;
					if(event.player==game.zhu) return true;
					return event.num<=num;
				},
				logTarget:'player',
				content:function (){
					if(!trigger.player.storage.dz015_enguang) trigger.player.storage.dz015_enguang=[];
					trigger.player.storage.dz015_enguang.add(player);
					trigger.cancel();
					player.damage(trigger.num,'nosource');
				},
				sub:true,
			},
		},
	},
	'dz015_shugu':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:1',
		trigger:{
			global:'damageBegin1',
		},
		filter:function (event,player){
			return event.source&&event.player==player&&player.isEmpty(2)&&!event.source.isEmpty(1)&&event.source!=player&&event.card&&event.card.name=='sha'&&event.getParent().name=='sha';
		},
		forced:true,
		content:function (){
			trigger.num++;
		},
	},
	'dz015_tianshu':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:1',
		trigger:{
			target:'useCardToTargeted',
		},
		filter:function (event,player){
			if(get.type(event.card)!='trick'||_status.currentPhase==player||event.player==player) return false;
			return !player.storage.dz015_tianshu||player.storage.dz015_tianshu!=event.card.name;
		},
		content:function (){
			player.storage.dz015_tianshu=trigger.card.name;
			player.markSkill('dz015_tianshu');
		},
		intro:{
			content:'当前记录牌名：$',
		},
		group:'dz015_tianshu_use',
		subSkill:{
			use:{
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					player:'phaseUseBegin',
				},
				direct:true,//不用改
				filter:function (event,player){
					return player.storage.dz015_tianshu&&player.hasUseTarget(player.storage.dz015_tianshu);
				},
				check:function (event,player){
					var card=player.storage.dz015_tianshu;
					return game.hasPlayer(function(current){
						return player.canUse(card,current)&&get.effect(current,{name:card},player,player)>0;
					});
				},
				content:function (){
					player.chooseUseTarget(get.prompt('dz015_tianshu'),'视为使用一张'+get.translation(player.storage.dz015_tianshu),player.storage.dz015_tianshu).set('logSkill','dz015_tianshu');
				},
				sub:true,
				'=':{
					
				},
			},
		},
	},
	'dz015_xianzhe':{
		audio:'ext:夜白神略/audio/character:1',
		enable:'chooseToUse',
		filter:function (event,player){
			if(player.countCards('h')<2||player.hasSkill('dz015_xianzhe_2')) return false;
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;
			for(var i of lib.inpile){
				var type=get.type(i);
				if(type=='trick'&&evt({name:i},player,event)) return true;
			};
			return false;
		},
		chooseButton:{
			dialog:function (event,player){
				var list=[];
				for(var i=0;i<lib.inpile.length;i++){
					if(get.type(lib.inpile[i])=='trick') list.push(['锦囊','',lib.inpile[i]]);
				}
				return ui.create.dialog('贤者',[list,'vcard']);
			},
			filter:function (button,player){
				return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
			},
			check:function (button){
				if(_status.event.getParent().type!='phase') return 1;
				var player=_status.event.player;
				if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan_gai','lianjunshengyan','diaohulishan'].includes(button.link[2])) return 0;
				return player.getUseValue({
					name:button.link[2],
					nature:button.link[3],
				});
			},
			backup:function (links,player){
				return {
					filterCard:true,
					selectCard:2,
					complexCard:true,
					position:'h',
					audio:'dz015_xianzhe',
					popname:true,
					viewAs:{name:links[0][2]},
					precontent:function(){
						player.addTempSkill('dz015_xianzhe_2');
					},
				};
			},
			prompt:function (links,player){
				return '将两张手牌当作'+get.translation(links[0][2])+'使用';
			},
		},
		hiddenCard:function (player,name){
			var type=get.type(name);
			return type=='trick'&&player.countCards('h')>=2&&!player.hasSkill('dz015_xianzhe_2');
		},
		ai:{
			fireAttack:true,
			respondSha:true,
			respondShan:true,
			skillTagFilter:function (player){
				if(player.hasSkill('dz015_xianzhe_2')||player.countCards('h')<2) return false;
			},
			threaten:1.2,//嘲讽值
			order:1,
			result:{
				player:function (player){
					if(_status.event.dying) return get.attitude(player,_status.event.dying);
					return 1;
				},
			},
		},
		subSkill:{
			'2':{
				trigger:{
					player:['useCardAfter'],
				},
				forced:true,
				charlotte:true,
				popup:false,
				filter:function (event,player){
					return event.skill=='dz015_xianzhe_backup';
				},
				content:function (){
					player.draw();
				},
				sub:true,
			},
			backup:{
				sub:true,
			},
		},
	},
	//----------------------满城柒（鬼神易）
	'dz016_zanxu':{//赞许
		audio:'ext:夜白神略/audio/character:1',
		enable:'phaseUse',
		usable:1,
		filter:function (event,player){
			return player.countCards('h',{suit:'heart'})>0;
		},
		filterTarget:function (card,player,target){
			return player!=target;
		},
		filterCard:function (card){
			return get.suit(card)=='heart';
		},
		check:function (card){
			return 8-get.value(card);
		},
		discard:false,
		lose:false,
		delay:false,
		content:function (){
			'step 0'
			target.gain(cards[0],player,'give');
			'step 1'
			var id=target.playerid;
			if(!player.storage.dz016_zanxu_buff) player.storage.dz016_zanxu_buff={};
			if(typeof player.storage.dz016_zanxu_buff[id]!='number') player.storage.dz016_zanxu_buff[id]=0;
			player.storage.dz016_zanxu_buff[id]++
			player.addSkill('dz016_zanxu_buff');
		},
		ai:{
			order:9,
			result:{
				player:1,
				target:2,
			},
			threaten:2,//嘲讽值
		},
		subSkill:{
			buff:{
				audio:'ext:夜白神略/audio/character:1',
				trigger:{
					global:['recoverBegin','phaseAfter'],
				},
				charlotte:true,
				mark:true,
				direct:true,//不用改
				onremove:true,
				filter:function (event,player){
					return player.storage.dz016_zanxu_buff&&typeof player.storage.dz016_zanxu_buff[event.player.playerid]=='number'&&_status.currentPhase==event.player;
				},
				content:function (){
					if(trigger.name=='recover'){
						player.logSkill('dz016_zanxu',trigger.player);
						player.draw(player.storage.dz016_zanxu_buff[trigger.player.playerid]*2);
					};
					delete player.storage.dz016_zanxu_buff[trigger.player.playerid];
					if(!game.hasPlayer(function(c){
						return typeof player.storage.dz016_zanxu_buff[c.playerid]=='number';
					})) player.removeSkill('dz016_zanxu_buff');
				},
				intro:{
					markcount:function (storage){
						var num=0;
						if(storage){
							for(var i in storage) num++;
						};
						return num;
					},
					mark:function (dialog,storage,player){
						if(storage){
							var targets=game.filterPlayer().sortBySeat();
							for(var i of targets){
								var id=i.playerid;
								if(storage[id]){
									dialog.addText('当'+get.translation(i)+'于其回合内第一次回复体力时你摸'+get.cnNumber(storage[id]*2)+'张牌');
								};
							};
						}else{
							dialog.addText('暂无内容');
						};
					},
				},
				sub:true,
			},
		},
	},
	'dz016_shanwu':{
		inherit:'dz017_shanwu',
		audio:'ext:夜白神略/audio/character:1',
	},
	//--------------------------涂山小红（鬼神易）
	'dz017_zhushi':{//注视
		preHidden:true,
		audio:'ext:夜白神略/audio/character:3',
		logAudio:()=>['ext:夜白神略/audio/character/dz017_zhushi1'],
		trigger:{
			player:'phaseEnd',
		},
		direct:true,//牢鬼作品
		content:function (){
			'step 0'
			player.chooseTarget(get.prompt2('dz017_zhushi'),function(card,player,target){
				return target!=player;
			}).set('ai',function(target){
				return -get.attitude(_status.event.player,target);
			});
			'step 1'
			if(result.bool){
				var target=result.targets[0];
				player.logSkill('dz017_zhushi');
				if(!player.storage.dz017_zhushi_buff) player.storage.dz017_zhushi_buff=[];
				player.storage.dz017_zhushi_buff.add(target);
				player.addTempSkill('dz017_zhushi_buff',{player:'phaseBeginStart'});
				player.addTempSkill('dz017_zhushi_shibai',{player:'phaseBeginStart'});
			};
		},
		derivation:['dz017_zhushi_buff','dz017_zhushi_shibai'],
		subSkill:{
			buff:{
				audio:'dz017_zhushi',
				logAudio:()=>['ext:夜白神略/audio/character/dz017_zhushi2'],
				trigger:{
					global:['useCardToPlayered'/*,'phaseJieshuBegin'*/],
				},
				filter:function (event,player){
					if(event.name=='phaseJieshu') return player.storage.dz017_zhushi_buff&&
						player.storage.dz017_zhushi_buff.includes(event.player)&&
						event.player.countGainableCards(player,'he')&&event.player.getHistory('useCard',function(evt){
						return evt.targets&&evt.targets.includes(player);
					}).length==0;
					else return player.storage.dz017_zhushi_buff&&
						player.storage.dz017_zhushi_buff.includes(event.player)&&
						event.player.isPhaseUsing()&&event.target==player;
				},
				content:function (){
					player.markSkill('dz017_zhushi_buff');
					if(trigger.name=='phaseJieshu'){
						player.gainPlayerCard(trigger.player,'he',true);
						player.loseHp();
						// game.trySkillAudio('dz017_zhushi_shibai',player);
					}else{
						var evtx=trigger.getParent('phaseUse');
						var num=trigger.player.getHistory('useCard',function(evt){
							return evt.getParent('phaseUse')==evtx;
						}).length;
						if(num>5){
							num=5;
						};
						player.draw(num);
						// player.logSkill('dz017_zhushi_buff');
					};
				},
				charlotte:true,
				// direct:true,
				forced:true,
				onremove:true,
				intro:{
					content:'正在注视着$',
				},
				sub:true,
			},
			shibai:{
				audio:'dz017_zhushi',
				logAudio:()=>['ext:夜白神略/audio/character/dz017_zhushi3'],
				trigger:{
					global:[/*'useCardToPlayered',*/'phaseJieshuBegin'],
				},
				filter:function (event,player){
					if(event.name=='phaseJieshu') return player.storage.dz017_zhushi_buff&&
						player.storage.dz017_zhushi_buff.includes(event.player)&&
						event.player.countGainableCards(player,'he')&&event.player.getHistory('useCard',function(evt){
						return evt.targets&&evt.targets.includes(player);
					}).length==0;
					else return player.storage.dz017_zhushi_buff&&
						player.storage.dz017_zhushi_buff.includes(event.player)&&
						event.player.isPhaseUsing()&&event.target==player;
				},
				content:function (){
					player.markSkill('dz017_zhushi_buff');
					if(trigger.name=='phaseJieshu'){
						player.gainPlayerCard(trigger.player,'he',true);
						player.loseHp();
						// game.trySkillAudio('dz017_zhushi_shibai',player);
					}else{
						var evtx=trigger.getParent('phaseUse');
						var num=trigger.player.getHistory('useCard',function(evt){
							return evt.getParent('phaseUse')==evtx;
						}).length;
						if(num>5){
							num=5;
						};
						player.draw(num);
						// player.logSkill('dz017_zhushi_buff');
					};
				},
				charlotte:true,
				forced:true,
				audio:'ext:夜白神略/audio/character:1',
				sub:true,
			},
		},
	},
	//-------------------------陆逊（鬼神易）
	'dzsl_shenhuo':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:1',
		trigger:{
			player:'damageBegin4',
		},
		filter:function (event,player){
			return event.num>0;
		},
		forced:true,
		content:function (){
			'step 0'
			event.count=trigger.num;
			'step 1'
			event.count--;
			if(!player.storage.dzsl_shennu_map) player.storage.dzsl_shennu_map=[0,0];
			var info=player.storage.dzsl_shennu_map;
			if(info[0]>=4&&info[1]>=2&&player.storage.dzsl_shennu_discard){
				player.draw();
				event.finish();
			}else{
				player.chooseControl('升级','摸牌').set('prompt','神火：升级神弩或摸一张牌');
			};
			'step 2'
			if(result.control=='升级') lib.skill.dzsl_buxi.up(player);
			else player.draw();
			'step 3'
			if(event.count) event.goto(1);
		},
	},
	'dzsl_buxi':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:1',
		trigger:{
			source:'die',
			player:'dyingAfter',
		},
		forced:true,
		filter:function (event,player){
			return event.name=='dying'||event.getParent(5)&&event.getParent(5).name=='dzsl_shennu'||'card';
		},
		up:function (player){
			var next=game.createEvent('dzsl_shennu_up',false);
			next.player=player;
			next.setContent(lib.skill.dzsl_buxi.upc);
		},
		upc:function (){
			'step 0'
			if(!player.storage.dzsl_shennu_map) player.storage.dzsl_shennu_map=[0,0];
			var info=player.storage.dzsl_shennu_map;
			var list=[];
			if(info[0]<4) list.add('X');
			if(info[1]<2) list.add('Y');
			if(list.length>1){
				player.chooseControl(list).set('prompt','升级：选择要升级的数值');
			}else{
				if(list.length==1) event._result={control:list[0]};
				else event.goto(2);
			};
			'step 1'
			if(result.control=='X'){
				player.storage.dzsl_shennu_map[0]++;
				game.log(player,'升级了','#g【神弩】','描述中的','#gX');
			}else{
				player.storage.dzsl_shennu_map[1]++;
				game.log(player,'升级了','#g【神弩】','描述中的','#gY');
			};
			event.finish();
			'step 2'
			if(!player.storage.dzsl_shennu_discard){
				player.storage.dzsl_shennu_discard=true;
				game.log(player,'升级了【神弩】的技能效果');
			};
		},
		content:function (){
			'step 0'
			player.restoreSkill('dzsl_shennu');
			if(!player.storage.dzsl_shennu_map) player.storage.dzsl_shennu_map=[0,0];
			var info=player.storage.dzsl_shennu_map;
			if(info[0]>=4&&info[1]>=2&&player.storage.dzsl_shennu_discard){
				player.draw();
				event.finish();
			}else{
				player.chooseControl('升级','摸牌').set('prompt','不息：升级神弩或摸一张牌');
			};
			'step 1'
			if(result.control=='升级') lib.skill.dzsl_buxi.up(player);
			else player.draw();
		},
	},
	'dzsl_shennu':{
		audio:'ext:夜白神略/audio/character:1',
		enable:'phaseUse',
		limited:true,
		skillAnimation:true,
		animationColor:'fire',
		filterTarget:function (card,player,target){
			return player.canUse('sha',target,false);
		},
		derivation:'dzsl_shennu_up',
		content:function (){
			'step 0'
			player.awakenSkill('dzsl_shennu');
			player.storage.dzsl_shennu_buff=[event,target];
			player.addTempSkill('dzsl_shennu_buff');
			var hs=player.getDiscardableCards('h');
			if(hs.length){
				event.discard=hs.length;
				player.discard(hs);
			};
			'step 1'
			if(!player.storage.dzsl_shennu_map) player.storage.dzsl_shennu_map=[0,0];
			var info=player.storage.dzsl_shennu_map;
			event.X=Math.max(1+info[0],player.getDamagedHp());
			//if(event.X>5) event.X=5;
			event.Y=Math.max(3+info[1],game.countPlayer());
			//if(event.Y>5) event.Y=5;
			event.count=event.X+event.Y;
			'step 2'
			event.count--;
			var card=get.cards()[0];
			var cardx=card;
			player.showCards(card);
			if(player.storage.dzsl_shennu_discard&&get.name(card)!='sha'&&event.discard>0){
				event.discard--;
				card={
					name:'sha',
					nature:'fire',
					cards:[cardx],
					suit:get.suit(cardx),
					number:get.number(cardx),
				};
			};
			if(target.isAlive()&&get.name(card)=='sha'&&player.canUse(card,target,false)){
				player.useCard(card,[cardx],target,false);
			}else game.cardsDiscard(card);
			'step 3'
			if(event.count>0){
				if(target.isAlive()) event.goto(2);
			};
		},
		subSkill:{
			buff:{
				trigger:{
					global:['dying','dyingAfter'],
				},
				charlotte:true,
				forced:true,
				onremove:true,
				direct:true,//牢鬼作品
				filter:function (event,player,name){
					if(!player.storage.dzsl_shennu_buff) return false;
					if(event.player!=player.storage.dzsl_shennu_buff[1]) return false;
					if(name=='dying') return player.storage.dzsl_shennu_buff[0].count!=0;
					else return event.player.isAlive();
				},
				content:function (){
					if(event.triggername=='dying'){
						player.storage.dzsl_shennu_buff[0].count=0;
					}else{
						if(!player.storage.dzsl_shennu_buff2) player.storage.dzsl_shennu_buff2=[];
						player.storage.dzsl_shennu_buff2.add(trigger.player);
						player.addTempSkill('dzsl_shennu_buff2');
					};
				},
				sub:true,
			},
			'buff2':{
				forced:true,
				onremove:true,
				charlotte:true,
				mark:true,
				intro:{
					content:'本回合不能对$使用牌',
				},
				mod:{
					playerEnabled:function (card,player,target){
						if(player.storage.dzsl_shennu_buff2.includes(target)) return false;
					},
					cardSavable:function (card,player,target){
						if(player.storage.dzsl_shennu_buff2.includes(target)) return false;
					},
				},
				sub:true,
			},
		},
		mark:true,
		intro:{
			content:'limited',
		},
		init:function (player,skill){
			player.storage[skill]=false;
		},
	},
	'dzsl_shennu_up':{
	},
	//------------------------善舞（鬼神易）
	'dz017_shanwu':{
		audio:'ext:夜白神略/audio/character:1',
		// audioname:[
		// 	'ybsl_013yinji','dzsl_013yinji','dzsl_014xinzhikui',
		// 	'ybart_016manchengqi','dzsl_016manchengqi','ybold_018zhangqing'
		// ],
		audioname2:{
			ybsl_013yinji:'yb013_shanwu',
			dzsl_013yinji:'dz013_shanwu',
			dzsl_014xinzhikui:'dz014_shanwu',
			ybart_016manchengqi:'yb016_shanwu',
			dzsl_016manchengqi:'dz016_shanwu',
			ybold_018zhangqing:'yb018_shanwu',
		},
		enable:'phaseUse',
		usable:1,
		position:'he',
		filterCard:true,
		selectCard:[1,Infinity],
		check:function (card){
			var player=_status.event.player;
			if(ui.selected.cards&&ui.selected.cards.length>0) return 6-get.value(card)&&get.type2(card)==get.type2(ui.selected.cards[0]);
			var eff=6-get.value(card);
			if(player.hp<=2&&player.maxHp>2&&get.type2(card)=='basic') eff+=5;
			if(get.type2(card)=='trick'&&eff>0) eff+=2;
			if(get.type2(card)=='equip'&&eff>0&&player.countCards('he')>=5) eff+=3;
			return eff;
		},
		content:function (){
			'step 0'
			player.draw(cards.length);
			'step 1'
			var bool=true;
			for(var i of cards){
				if(get.type2(i)!=get.type2(cards[0])){
					bool=false;
					break;
				};
			};
			if(bool){
				switch(get.type2(cards[0])){
					case 'basic':player.recover();break;
					case 'trick':player.draw(2);break;
					case 'equip':player.addTempSkill('dz017_shanwu_buff');break;
				};
			};
		},
		ai:{
			order:11,
			result:{
				player:1,
			},
			threaten:1.5,//嘲讽值
		},
		subSkill:{
			buff:{
				audio:'ext:夜白神略/audio/character:1',
				audioname:['ybsl_013yinji','dzsl_013yinji','dzsl_014xinzhikui','ybart_016manchengqi','dzsl_016manchengqi','ybold_018zhangqing'],
				trigger:{
					source:'damageBegin1',
				},
				mark:true,
				intro:{
					content:'造成的伤害+1',
				},
				forced:true,
				charlotte:true,
				content:function (){
					trigger.num++;
				},
				sub:true,
			},
		},
	},
	//----------------和解（用途待定）
	'ybsl_hejie':{
		preHidden:true,
		trigger:{
			global:'damageBefore',
		},
		filter:function (event,player){
			return event.target!=event.source&&!player.hasSkill('ybsl_hejie_mark');
		},
		content:function (){
			'step 0'
			trigger.cancel();
			'step 1'
			player.addTempSkill('ybsl_hejie_mark');
			trigger.source.draw(1);
			trigger.player.draw(1);
		},
		subSkill:{
			mark:{
				mark:true,
				intro:{
					content:'本回合已发动',
				},
				sub:true,
			},
		},
	},
	//---------------------周瑜小乔
	'ybsl_xianyin':{
		audio:'ext:夜白神略/audio/character:2',
		zhuanhuanji:true,
		mark:true,
		intro:{
			content:function(storage,player){
				var str0='（括号内的阴阳为鸾鸣的形态）<br/>';
		var str1='阴（阴）：当你因弃置而失去一张黑桃牌时，你可令一名角色下个摸牌阶段额外摸一张牌；';
		var str2='阴（阳）：当你因弃置而失去一张梅花牌时，你可令一名角色回复1点体力；';
		var str3='阳（阴）：当你因弃置而失去一张红桃牌时，你可令一名角色失去1点体力；';
		var str4='阳（阳）：当你因弃置而失去一张方块牌时，你可令一名角色下个摸牌阶段少摸一张牌。';
		var str5='<span class="bluetext">';//蓝色字符
		var str6='<span class=yellowtext>';//黄色字符
		var str7='<span class=firetext>';//红色字符
		var str8='</span>';
		var str9='（若你没有鸾鸣或鸾鸣已使用则改为黑色牌）<br>';
		var str10='（若你没有鸾鸣或鸾鸣已使用则改为红色牌）<br>';
		if(player.storage.ybsl_xianyin==true) {//弦音阳
			if(player.storage.ybsl_luanming==true){//鸾鸣阳
				if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
					var str=str5+str4+str8+str10+str0;//√
				}
				else{//--------------------------------无鸾鸣
					var str=str5+str4+str8+str6+str10+str8+str0;//√
				}
			}
			else{//-------------------------------------鸾鸣阴
				if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
					var str=str5+str3+str8+str10+str0;//√
				}
				else{//--------------------------------无鸾鸣
					var str=str5+str3+str8+str6+str10+str8+str0;//√
				}
			}
		}
		else{//---------------------------------弦音阴
			if(player.storage.ybsl_luanming==true){//鸾鸣阳
				if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
					var str=str5+str2+str8+str9+str0;//√
				}
				else{//------------------------------无鸾鸣
					var str=str5+str2+str8+str6+str9+str8+str0;//√
				}
			}
			else{//---------------------------------鸾鸣阴
				if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){//拥有鸾鸣
					var str=str5+str1+str8+str9+str0;//√
				}
				else{//-------------------------------无鸾鸣
					var str=str5+str1+str8+str6+str9+str8+str0;//√
				}
			}
		}
		return str;
			},
		},
		// init:function(player){
		// 	player.storage.ybsl_xianyin=false;
		// 	// player.storage.ybsl_xianyin=true;
		// 	// player.changeZhuanhuanji('ybsl_xianyin');
		// },
		marktext:'☯',
		trigger:{player:'loseAfter'},
		filter:function(event,player){
			if(event.type!='discard') return false;
			if(player.hasSkill('ybsl_luanming')&&!player.getStat('skill').ybsl_luanming){
				if(player.storage.ybsl_xianyin==true){
					if(player.storage.ybsl_luanming==true){var suit='diamond';}
					else{var suit='heart';}
				}
				else{
					if(player.storage.ybsl_luanming==true){var suit='club';}
					else{var suit='spade';}
				}
				for(var i of event.cards){
					if(get.suit(i)==suit)return true;
				}
			}
			else{
				if(player.storage.ybsl_xianyin==true){var color='red';}
				else{var color='black';}
				for(var i of event.cards){
					if(get.color(i)==color)return true;
				}
			}
			return false;
		},
		direct:true,//屏蔽
		content:function(){
			'step 0'
			if(player.storage.ybsl_xianyin==true){
				if(player.storage.ybsl_luanming==true){event.tt=-1;}
				else{event.tt=-2;}
			}
			else{
				if(player.storage.ybsl_luanming==true){event.tt=2;}
				else{event.tt=1;}
			}
			'step 1'
			switch(event.tt){
				case -2:var str='失去1点体力';break;
				case -1:var str='下个摸牌阶段少摸一张牌';break;
				case 1:var str='下个摸牌阶段额外摸一张牌';break;
				case 2:var str='回复1点体力';break;
			}
			player.chooseTarget().set('prompt2','请选择一名角色，令其'+str).set('ai',function(target){
				if(event.tt>0){return get.attitude(player,target)>0;}
				else{return get.attitude(player,target)<=0;}
			});
			'step 2'
			if(result.targets){
				var tar=result.targets[0];
				switch(event.tt){
					case -2:
						tar.loseHp();
						break;
					case -1:
						if(!tar.hasSkill('ybsl_xianyin_draw')) tar.addTempSkill('ybsl_xianyin_draw',{player:'phaseDrawAfter'});
						if(!tar.storage.ybsl_xianyin_draw) tar.storage.ybsl_xianyin_draw=0;
						tar.storage.ybsl_xianyin_draw--;
						break;
					case 1:
						if(!tar.hasSkill('ybsl_xianyin_draw')) tar.addTempSkill('ybsl_xianyin_draw',{player:'phaseDrawAfter'});
						if(!tar.storage.ybsl_xianyin_draw) tar.storage.ybsl_xianyin_draw=0;
						tar.storage.ybsl_xianyin_draw++;
						break;
					case 2:
						tar.recover();
						break;
				}
				player.changeZhuanhuanji('ybsl_xianyin');
			}
		},
		subSkill:{
			draw:{
				mark:true,
				marktext:'弦',
				intro:{
					content:function(storage,player){
						var str='下个摸牌阶段';
						if(!player.storage.ybsl_xianyin_draw){player.storage.ybsl_xianyin_draw=0}
						if(player.storage.ybsl_xianyin_draw>=0){str+='额外摸';}
						else{str+='少摸';}
						str+=Math.abs(player.storage.ybsl_xianyin_draw)+'张牌';
						return str;
					},
				},
				trigger:{player:'phaseDrawBegin',},
				direct:true,//不用改
				content:function(){
					if(!player.storage.ybsl_xianyin_draw||player.storage.ybsl_xianyin_draw==0){event.finish();}
					else{
						if(player.storage.ybsl_xianyin_draw>0){trigger.num+=player.storage.ybsl_xianyin_draw;}
						else {trigger.num-=Math.abs(player.storage.ybsl_xianyin_draw);}
						player.logSkill('ybsl_xianyin_draw',player);
					}
				},
				onremove:true,
			}
		},
		ai:{
			threaten:1.1,//嘲讽值
			expose:1,//跳立场
		},
	},
	'ybsl_luanming':{
		viewAs:function(cards,player){
			var name=false;
			var nature=null;
			if(player.storage.ybsl_luanming==true){var colorx='red';}//阳，红色
			else{var colorx='black';}//阴，黑色
			for(var i of cards){
				if(get.color(i)==colorx){
					var name=i.name;
					var nature=i.nature;
					var card=i;
				}
			}
			if(name) return {name:name,nature:nature,isCard:false,card:card,};
			return null;
		},
		lose:true,
		audio:'ext:夜白神略/audio/character:2',
		zhuanhuanji:true,
		mark:true,
		intro:{
			content:function(storage,player){
				if(player.storage.ybsl_luanming==true) return '转换技，每回合限一次，你可以弃置一黑一红共两张牌：阳：视为使用其中的黑色牌并额外执行一次；<span class="bluetext">阴：视为使用其中的红色牌并额外执行一次</span>。';
				return '转换技，每回合限一次，你可以弃置一黑一红共两张牌：<span class="bluetext">阳：视为使用其中的黑色牌并额外执行一次；</span>阴：视为使用其中的红色牌并额外执行一次。';
			},
		},
		// init:function(player){
		// 	player.storage.ybsl_luanming=false;
		// 	// player.storage.ybsl_luanming=true;
		// 	// player.changeZhuanhuanji('ybsl_luanming');
		// },
		marktext:'☯',
		usable:1,
		enable:'chooseToUse',
		position:'hs',
		filterCard:function(card,player){
			// var player=_status.event.player;
			if(player.storage.ybsl_luanming==true){
				var colro = 'red';
			}
			else {
				var colro = 'black';
			}
			// var evt=lib.filter.filterCard;
			// if(event.filterCard) evt=event.filterCard;
			// if(lib.filter.canBeDiscarded(card,player)){
				var color=get.color(card);
				for(var i=0;i<ui.selected.cards.length;i++){
					if(get.color(ui.selected.cards[i])==color) return false;
				}
				// if(color==colro)return evt(card,player);
				return get.color(card)!='none';
			// }
			// if(evt(card,player,event)&&get.color(card)==colro){
			// }
			// return true;
		},
		selectCard:2,
		complexCard:true,
		discard:true,
		lose:true,
		ignoreMod:true,
		precontent:function(){
			'step 0'
			player.discard(event.result.cards)
			'step 1'
			if(player.storage.ybsl_luanming==true){var color='red';}//阳，红色
			else{var color='black';}//阴，黑色
			for(var i of event.result.cards){
				if(get.color(i)==color){
					event.result.cards=[i];
				}
			}
			'step 2'
			player.changeZhuanhuanji('ybsl_luanming')
			// event.card.effectCount++;
		// 	if(player.storage.ybsl_luanming==true){event.color='red';}//阳，红色
		// 	else{event.color='black';}//阴，黑色
		// 	for(var i of cards){
		// 		if(get.color(i)==event.color){
		// 			event.card=i;
		// 		}
		// 	}
		// 	'step 1'
		// 	player.changeZhuanhuanji('ybsl_luanming')
		// 	if(event.card&&player.hasUseTarget(event.card)){
		// 		player.chooseUseTarget(event.card,'视为使用一张'+get.translation(event.card),true);
		// 	}
		},
		// prompt:'<span class="yellowtext">注意：此技能不能用于响应其他牌，更不能在别人濒死时用桃选择其为目标！</span>',
		// content:function(){
		// 	'step 0'
		// 	if(player.storage.ybsl_luanming==true){event.color='red';}//阳，红色
		// 	else{event.color='black';}//阴，黑色
		// 	for(var i of cards){
		// 		if(get.color(i)==event.color){
		// 			event.card=i;
		// 		}
		// 	}
		// 	'step 1'
		// 	player.changeZhuanhuanji('ybsl_luanming')
		// 	if(event.card&&player.hasUseTarget(event.card)){
		// 		player.chooseUseTarget(event.card,'视为使用一张'+get.translation(event.card),true);
		// 	}
		// },
		group:'ybsl_luanming_use',
		subSkill:{
			use:{
				trigger:{player:'useCard',},
				direct:true,//不用改
				charlotte:true,
				filter:function(event,player){
					// game.log('event.skill:',event.skill)
					// game.log('event.getParent():',event.getParent())
					// game.log('event.getParent().skill:',event.getParent().skill)
					// game.log('event.getParent(0):',event.getParent(0))
					// game.log('event.getParent(1):',event.getParent(1))
					// game.log('event.getParent(2):',event.getParent(2))//
					// game.log('event.getParent(3):',event.getParent(3))
					// game.log('event.getParent(3).skill:',event.getParent(3).skill)//√
					// game.log('event.getParent(4):',event.getParent(4))
					// game.log('event.getParent(5):',event.getParent(5))
					// return event.getParent().skill=='ybsl_luanming';
					return event.skill=='ybsl_luanming'
				},
				content:function(){
					trigger.effectCount++;
					// player.addTempSkill('ybsl_luanming_buff','phaseUseAfter');
					// trigger.ybsl_luanming_buff=player;
				}
			},
			/*
			buff:{
				trigger:{player:'useCardToTargeted'},
				forced:true,
				charlotte:true,
				popup:false,
				lastDo:true,
				filter:function(event,player){
					return (event.parent.ybsl_luanming_buff==player&&event.targets.length==event.parent.triggeredTargets4.length);
				},
				content:function(){
					trigger.getParent().targets=trigger.getParent().targets.concat(trigger.targets);
					trigger.getParent().triggeredTargets4=trigger.getParent().triggeredTargets4.concat(trigger.targets);
				},
				onremove:true,
				// onremove:function(player){
				// 	delete player.storage.counttrigger.ybsl_luanming_buff;
				// },
			},
			*/
		},
	},
	//----------------神甄姬
	ybsl_zjzilian:{
		frequent:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			target:'useCardToBegin',
		},
		filter:function(event,player){
			if(event.card&&get.type(event.card)=='trick') return true;
		},
		content:()=>{
			player.draw();
		}
	},
	ybsl_zjsqiyuan:{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		// subSkill:{
			// block:{
				// onremove:true,
				// direct:true,
				// trigger:{
					// player:'phaseUseAfter',
				// },
				// content:function(){
					// player.removeSkill('ybsl_zjsqiyuan_block');
				// }
			// },
		// },
		enable:'phaseUse',
		// filter:function(event,player){
			// return !player.hasMark('ybsl_zjsqiyuan_block');
		// },
		content:function(){
			'step 0'
			// player.addTempSkill('ybsl_zjsqiyuan_block');
			// player.addMark('ybsl_zjsqiyuan_block');
			player.judge('祈愿',function(card){
				var i,num=0,players=game.filterPlayer();
				for(i=0;i<players.length;i++){
					if(player!=players[i]){
						var att=get.attitude(player,players[i]);
						if(att>0){
							num++;
						}
					}
				}
				if(get.color(card)=='red'){
					if(num>0) return 2;
					return -2;
				}
				return 2;//这里return 的数字别私自改
			});
			'step 1'
			if(result.color=='black'){
				player.draw();
				player.storage.counttrigger.ybsl_zjsqiyuan--;
				// player.removeMark('ybsl_zjsqiyuan_block');
				event.finish();
			}
			else{
				player.chooseTarget(true,function(card,player,target){
					return target!=player;
				}).set('prompt','请选择一名其他角色，令其摸两张牌');
			}
			'step 2'
			if(result.targets[0])result.targets[0].draw(2);
		}
	},
	ybsl_zjsshixiang:{
		audio:'ext:夜白神略/audio/character:2',
		limited:true,
		skillAnimation:true,
		animationColor:'water',
		trigger:{
			player:'phaseBegin',
		},
		check:function (event,player){
			if(player.countCards('h')==3)return true;
			if(player.hp<=2&&player.countCards('h','tao')<1)return true;
			if(player.countCards('j','lebu')>0) return true;
			return false;
		},
		content:function(){
			'step 0'
			player.awakenSkill('ybsl_zjsshixiang');
			event.num=player.countCards('h');//准备工作，记录相关数据
			event.cards=player.getCards('h');
			player.discard(event.cards);
			'step 1'
			player.draw(Math.min(event.num*3,9));
			player.skip('phaseDiscard');
		}
	},
	//---------------------复刻的悲歌
	'ybsl_beige':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'damageEnd',
		},
		filter:function (event,player){
			return (event.card&&event.card.name=='sha'&&event.source&&
					event.player.classList.contains('dead')==false&&player.countCards('he'));
		},
		// direct:true,
		checkx:function (event,player){
			var att1=get.attitude(player,event.player);
			var att2=get.attitude(player,event.source);
			return att1>0&&att2<=0;
		},
		preHidden:true,
		cost(){
			var next=player.chooseToDiscard('he',get.prompt2('ybsl_beige',trigger.player));
			var check=lib.skill.ybsl_beige.checkx(trigger,player);
			next.set('ai',function(card){
				if(_status.event.goon) return 8-get.value(card);
				return 0;
			});
			next.set('logSkill','ybsl_beige');
			next.set('goon',check);
			event.result = next.forResult();
		},
		content:function (){
			'step 0'
			trigger.player.judge();
			'step 1'
			switch(result.suit){
				case 'heart':trigger.player.recover();break;
				case 'diamond':trigger.player.draw(2);break;
				case 'club':trigger.source.chooseToDiscard('he',2,true);break;
				case 'spade':trigger.source.turnOver();break;
			}
		},
		ai:{
			expose:0.3,//跳立场
		},
	},

	//---------------栩仙
	'ybsl_xuxian':{
		audio:'ybsl_xuxian1',
		group:['ybsl_xuxian1','ybsl_xuxian2'],
		derivation:['ybsl_mixianshenshu'],
	},
	'ybsl_xuxian1':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'chooseToUse',
		filter:function (event,player){
			return player.countCards('hs',{suit:'diamond'})>0;
		},
		position:'hs',
		filterCard:function (card){
			return get.suit(card)=='diamond';
		},
		viewAs:{
			name:'ybsl_mixianshenshu',
		},
		prompt:'将一张方块牌当弥仙神术使用',
		check:function (card){return 4.5-get.value(card)},
		ai:{
			order:2,
			useful:0,
			value:function(card,player,index,method){//不知道哪个参数有用，全写了
				if(player.group!='shen'){
					return 7;
				}
				else {return 0}
			},
			result:{
				// player:function(player,target){//发动这个技能对你的收益
					// if(player.group!='shen'){
						// return 7;
					// }
					// else {return 0}
				// },
				target:function(player,target){//发动这个技能对你的收益
					if(target.group!='shen'){
						return 7;
					}
					else {return 0}
				},
			},
		},
	},
	'ybsl_xuxian2':{
		audio:'ext:夜白神略/audio/character:2',
		popup:'ybsl_xuxian',
		enable:'phaseUse',
		filter:function (event,player){
			return player.countCards('h',{suit:'diamond'})>0;
		},
		filterCard:function (card){
			return get.suit(card)=='diamond';
		},
		check:function (card){
			return 5-get.useful(card);
		},
		content:function (){
			player.draw();
		},
		discard:false,
		visible:true,
		loseTo:'discardPile',
		prompt:'献祭一次成仙化凡的机会并换取神明的补偿',
		delay:0.5,
		prepare:function (cards,player){
			player.$throw(cards,1000);
			game.log(player,'将',cards,'献祭了');
		},
		ai:{
			basic:{
				order:1.5,
			},
			result:{
				player:2,
			},
		},
	},
	//群里抄的双持
	// ybsl_doubleEquip: {
	// 	silent: true,
	// 	locked: true,
	// 	trigger: {
	// 		player: 'equipBegin',
	// 	},
	// 	filter: function (event, player) {
	// 		var subtype = get.subtype(event.card);
	// 		if (subtype != 'equip1') return false;//判定装备的类型
	// 		return player.countCards('e', {subtype: 'equip1'});
	// 	},
	// 	content: function () {
	// 		// game.log('event.name',event.name)
	// 		trigger.setContent(lib.skill[event.name].equip);
	// 	},
	// 	equip: function () {
	// 		'step 0'
	// 		var owner = get.owner(card);
	// 		if (owner) owner.lose(card, ui.special, 'visible').set('type', 'equip');
	// 		'step 1'
	// 		if (event.cancelled) {
	// 			event.finish();
	// 			return;
	// 		}
	// 		if (card.destroyed) {
	// 			if (player.hasSkill(card.destroyed)) {
	// 				delete card.destroyed;
	// 			} else {
	// 				event.finish();
	// 				return;
	// 			}
	// 		}
	// 		if (event.draw) {
	// 			game.delay(0, 300);
	// 			player.$draw(card);
	// 		}
	// 		'step 2'
	// 		if (card.clone) {
	// 			game.broadcast(function (card, player) {
	// 				if (card.clone) {
	// 					card.clone.moveDelete(player);
	// 				}
	// 			}, card, player);
	// 			card.clone.moveDelete(player);
	// 			game.addVideo('gain2', player, get.cardsInfo([card.clone]));
	// 		}
	// 		player.equiping = true;
	// 		'step 3'
	// 		var cards = player.getCards('e', {subtype: get.subtype(card)});
	// 		if (cards.length > 1) {//这里的数字是武器栏上限-1
	// 			player.chooseCardButton(cards, true, '选择要替换的装备');
	// 		} else event.goto(5);
	// 		'step 4'
	// 		player.lose(result.links, false, 'visible').set('type', 'equip').set('getlx', false).swapEquip = true;
	// 		if (get.info(card, false).loseThrow) {
	// 			player.$throw(result.links);
	// 		}
	// 		event.swapped = true;
	// 		'step 5'
	// 		if (player.isMin()) {
	// 			event.finish();
	// 			game.cardsDiscard(card);
	// 			delete player.equiping;
	// 			return;
	// 		}
	// 		if (lib.config.background_audio) {
	// 			game.playAudio('effect', get.subtype(card));
	// 		}
	// 		game.broadcast(function (type) {
	// 			if (lib.config.background_audio) {
	// 				game.playAudio('effect', type);
	// 			}
	// 		}, get.subtype(card));
	// 		player.$equip(card);
	// 		game.addVideo('equip', player, get.cardInfo(card));
	// 		game.log(player, '装备了', card);
	// 		'step 6'
	// 		var info = get.info(card, false);
	// 		if (info.onEquip && (!info.filterEquip || info.filterEquip(card, player))) {
	// 			if (Array.isArray(info.onEquip)) {
	// 				for (var i = 0; i < info.onEquip.length; i++) {
	// 					var next = game.createEvent('equip_' + card.name);
	// 					next.setContent(info.onEquip[i]);
	// 					next.player = player;
	// 					next.card = card;
	// 				}
	// 			} else {
	// 				var next = game.createEvent('equip_' + card.name);
	// 				next.setContent(info.onEquip);
	// 				next.player = player;
	// 				next.card = card;
	// 			}
	// 			if (info.equipDelay != 'false') game.delayx();
	// 		}
	// 		delete player.equiping;
	// 		if (event.delay) {
	// 			game.delayx();
	// 		}
	// 	},
	// },
	// ///吴六剑同时穿戴依托于这个
	// ybsl_infEquip: {
	// 	silent: true,
	// 	locked: true,
	// 	trigger: {
	// 		player: 'equipBegin',
	// 	},
	// 	filter: function (event, player) {
	// 		// var subtype = get.subtype(event.card);
	// 		// if (subtype != 'equip1') return false;//判定装备的类型
	// 		// return player.countCards('e', {subtype: 'equip1'});
	// 		return true;
	// 	},
	// 	content: function () {
	// 		// game.log('event.name',event.name)
	// 		trigger.setContent(lib.skill[event.name].equip);
	// 	},
	// 	equip: function () {
	// 		'step 0'
	// 		var owner = get.owner(card);
	// 		if (owner) owner.lose(card, ui.special, 'visible').set('type', 'equip');
	// 		'step 1'
	// 		if (event.cancelled) {
	// 			event.finish();
	// 			return;
	// 		}
	// 		if (card.destroyed) {
	// 			if (player.hasSkill(card.destroyed)) {
	// 				delete card.destroyed;
	// 			} else {
	// 				event.finish();
	// 				return;
	// 			}
	// 		}
	// 		if (event.draw) {
	// 			game.delay(0, 300);
	// 			player.$draw(card);
	// 		}
	// 		'step 2'
	// 		if (card.clone) {
	// 			game.broadcast(function (card, player) {
	// 				if (card.clone) {
	// 					card.clone.moveDelete(player);
	// 				}
	// 			}, card, player);
	// 			card.clone.moveDelete(player);
	// 			game.addVideo('gain2', player, get.cardsInfo([card.clone]));
	// 		}
	// 		player.equiping = true;
	// 		'step 3'
	// 		var cards = player.getCards('e', {subtype: get.subtype(card)});
	// 		if (cards.length > 114514) {//这里的数字是武器栏上限-1
	// 			player.chooseCardButton(cards, true, '选择要替换的装备');
	// 		} else event.goto(5);
	// 		'step 4'
	// 		player.lose(result.links, false, 'visible').set('type', 'equip').set('getlx', false).swapEquip = true;
	// 		if (get.info(card, false).loseThrow) {
	// 			player.$throw(result.links);
	// 		}
	// 		event.swapped = true;
	// 		'step 5'
	// 		if (player.isMin()) {
	// 			event.finish();
	// 			game.cardsDiscard(card);
	// 			delete player.equiping;
	// 			return;
	// 		}
	// 		if (lib.config.background_audio) {
	// 			game.playAudio('effect', get.subtype(card));
	// 		}
	// 		game.broadcast(function (type) {
	// 			if (lib.config.background_audio) {
	// 				game.playAudio('effect', type);
	// 			}
	// 		}, get.subtype(card));
	// 		player.$equip(card);
	// 		game.addVideo('equip', player, get.cardInfo(card));
	// 		game.log(player, '装备了', card);
	// 		'step 6'
	// 		var info = get.info(card, false);
	// 		if (info.onEquip && (!info.filterEquip || info.filterEquip(card, player))) {
	// 			if (Array.isArray(info.onEquip)) {
	// 				for (var i = 0; i < info.onEquip.length; i++) {
	// 					var next = game.createEvent('equip_' + card.name);
	// 					next.setContent(info.onEquip[i]);
	// 					next.player = player;
	// 					next.card = card;
	// 				}
	// 			} else {
	// 				var next = game.createEvent('equip_' + card.name);
	// 				next.setContent(info.onEquip);
	// 				next.player = player;
	// 				next.card = card;
	// 			}
	// 			if (info.equipDelay != 'false') game.delayx();
	// 		}
	// 		delete player.equiping;
	// 		if (event.delay) {
	// 			game.delayx();
	// 		}
	// 	},
	// },
	//-------------------孙丽松
	'yb001_fufeng':{
		audio:'ext:夜白神略/audio/character:1',//听吧，这是风的呼吸
		audioname2:{
			'ybslshen_014liutianyu':'yb014_fufeng',
		},
		trigger:{
			player:'phaseUseBefore',
		},
		filter:function(event,player){
			return player.maxHp-player.hp>0;
		},
		frequent:true,
		content:function (){
			var num=player.maxHp-player.hp;
			if(num>3)num=3;
			player.draw(num);
		},
	},
	'yb001_wanyue':{
		trigger:{
			player:'phaseJieshuBegin',
		},
		frequent:true,
		mod : {
			aiValue(player, card, num) {
				if (_status.yb001_wanyue) return
				const evt = get.event()
				if (evt.yb001_wanyue) return num + 3 * evt.yb001_wanyue.includes(card)
				_status.yb001_wanyue = true
				if (evt.name != 'chooseToDiscard' || evt.getParent().name != 'phaseDiscard') return
				const phase = evt.getParent(2)
				if (phase.name != 'phase' || phase.phaseList[phase.num + 1] != 'phaseJieshu') return
				const knum = player.countCards() - evt.selectCard[0]
				const hs = {}, keep = []
				player.getCards('h', cardx => (hs[get.suit(cardx)] ??= []).push(cardx))
				for (const i of Object.values(hs)) i.sort((a, b) => get.value(b) - get.value(a))
				while (keep.length < knum) {
					let suit, value = - Infinity
					for (const i in hs) {
						if (!hs[i][0]) continue
						let val = get.value(hs[i][0])
						if (keep.some(j => get.suit(j) == i)) val += 3
						if (val > value) [suit, value] = [i, val]
					}
					keep.push(hs[suit].shift())
				}
				evt.yb001_wanyue = keep
				delete _status.yb001_wanyue
				if (keep.includes(card)) return num + 3
			},
			get aiUseful() {
				return lib.skill.yb001_wanyue.mod.aiValue
			}
		},
		locked : false,
		audio:'ext:夜白神略/audio/character:2',
		content:function (){
			'step 0'
			var suits=[];
			var hs=player.getCards('h');
			for(var i=0;i<hs.length;i++){
				suits.add(get.suit(hs[i]));
			}
			player.removeAdditionalSkill('yb001_wanyue');
			var num=4-suits.length;
			if(num<1){
				num=1;
			}
			player.draw(num);
		},
	},
	'yb001_beige':{
		inherit:'ybsl_beige',
		audio:'ext:夜白神略/audio/character:2',
	},
	'yb001_yishui':{
		trigger:{
			player:'phaseEnd',
		},
		frequent:true,
		audio:'ext:夜白神略/audio/character:2',
		content:function (){
			'step 0'
			var discarded=get.discarded();
			if(discarded.length){
				player.chooseCardButton('选择一张获得之',discarded).set('ai',function(button){
					return get.value(button.link);
				});
			}
			else{
				event.finish();
			}
			'step 1'
			if(result.bool&&result.links&&result.links.length){
				player.gain(result.links,'gain2');
			}
			event.finish();
		},
	},
	// yb001_yongyue:{//没写完呢，别着急咏月
	// 	audio:'ext:夜白神略/audio/character:2',
	// 	forced:true,
	// 	trigger:{player:'phaseBegin',},
	// 	filter:(event,player)=>{
	// 		return player.getDamagedHp()>0;
	// 	},
	// 	content:function(){
	// 		'step 0'
	// 		var list=[];
	// 		var type=[];
	// 		for(var i of lib.inpile){
	// 			if(!type.includes(get.type2(i)))type.push(get.type2(i));
	// 		};
	// 		// if(player.getDamagedHp()>=1)
	// 	},
	// },//这个作废
	yb001_yongyue:{
		audio:'ext:夜白神略/audio/character:2',
		audioname2:{
			'ybslshen_014liutianyu':'yb014_yongyue',
		},
		forced:true,
		trigger:{player:['phaseJudgeBegin','damageBegin3']},
		filter:(event,player,name)=>{
			// if(name=='loseAfter')return player.getDamagedHp()==0;
			return player.getDamagedHp()>0;
		},
		content:function(){
			'step 0'
			var num=player.getDamagedHp();
			// if(num==0){player.gainMaxHp();}
			// else{}
			trigger.cancel();
			player.loseMaxHp(num);player.draw(num);
		},
		group:'yb001_yongyue_lose',
		subSkill:{
			lose:{
				trigger:{player:['loseAfter']},
				audio:'yb001_yongyue',
				audioname2:{
					'ybslshen_014liutianyu':'yb014_yongyue',//世间悲欢离合，但无两全策
				},
				forced:true,
				filter:(event,player)=>{
					if(player.getDamagedHp()<1)return true;
					return false;
				},
				content:function(){
					player.gainMaxHp();
				}
			},
		}
	},
	/*
	yb001_yongyue:'咏月',
	yb001_yongyue_info:'锁定技，判定阶段开始时/当你受到伤害时，若你存在已损体力值，你跳过之，改为失去空血条，然后摸等量牌；当你失去牌后，若你的已损体力值不大于3，你增加1点体力上限。',
	'yb001_minglun_info':'锁定技，回合开始时，根据你已损体力值：<br/>不小于1：你可选择一个牌的类型，本回合使用此类型的牌时，摸一张牌；<br/>不小于2：你可获得一张随机装备；<br/>不小于3：你可摸3张牌。<br/>结束阶段，你回复X点体力或摸2X张牌（记X为回合开始时你可选的选项，但你没选，且当前阶段不满足的选项数）',
	锁定技，回合开始时，你展示牌堆顶一张牌并放在武将牌上，至多放四张。根据“命轮”的花色，你视为拥有技能：
	<br>黑桃：栖月；红桃，旅心；<br>梅花，折叶；方块：忆水。
	结束阶段，若“命轮”包含相同花色或四种花色，则你需弃置所有“命轮”或失去1点体力。
	*/
	yb001_haowan:{
		audio:'ext:夜白神略/audio/character:2',//垆边人似月，皓腕凝霜雪
		forced:true,
		usable:1,
		trigger:{player:'damageBegin3',},
		filter:(event,player)=>{
			if(!event.cards)return false;
			if(!get.itemtype(event.cards)=='cards') return false;
			if(event.cards.length!=1)return false;
			var suits=[],es=player.getCards('e');
			for(var i of es) suits.add(get.suit(i,player));
			return suits.includes(get.suit(event.cards[0]));
		},
		content:()=>{trigger.cancel();},
	},
	yb001_minglun:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:['phaseBegin','phaseAfter'],
		},
		mark:true,
		intro:{
			markcount:'expansion',
			mark:function(dialog,content,player){
				var content=player.getExpansions('yb001_minglun');
				if(content&&content.length){
					dialog.addAuto(content);
				}
			},
			content:function(content,player){
				var content=player.getExpansions('yb001_minglun');
				if(content&&content.length){
					return get.translation(content);
				}
			}
		},
		filter:function(event,player,name){
			if(name=='phaseAfter') {
				var cards=player.getExpansions('yb001_minglun');
				var list=[];
				for(var i of cards){
					if(list.includes(get.suit(i))){return true;}
					else{list.push(get.suit(i));}
				}
				return player.getExpansions('yb001_minglun')&&player.getExpansions('yb001_minglun').length>=4;
			} 
			else return !player.getExpansions('yb001_minglun')||player.getExpansions('yb001_minglun').length<4;
		},
		content:function(){
			'step 0'
			if(event.triggername=='phaseAfter'){
				player.chooseControl(['掉血','弃掉']).set('prompt','请选择一项：弃掉所有“命轮”牌，或失去1点体力').set('ai',function(control){
					var cards=player.getExpansions('yb001_minglun');
					var list=[];
					for(var i of cards){
						list.push(get.suit(i));
					}
					if(player.hp<=2)return '弃掉';
					else if(list.length<3) return '掉血';
					return '弃掉';
				});
			}
			else{
				event.goto(2);
			}
			'step 1'
			if(result.control=='掉血'){
				player.loseHp();
			}
			else{
				player.discard(player.getExpansions('yb001_minglun'));
			}
			event.finish();
			'step 2'
			var card=get.cards()[0];
			player.showCards(card);
			player.addToExpansion(card,'gain2').gaintag.add('yb001_minglun');
		},
		derivation:['yb001_minglun_spade','yb001_minglun_heart','yb001_minglun_club','yb001_minglun_diamond'],
		group:['yb001_minglun_spade','yb001_minglun_heart','yb001_minglun_club','yb001_minglun_diamond'],
		subSkill:{
			spade:{
				nobracket:true,
				inherit:'yb018_qiyue',
				audio:'ext:夜白神略/audio/character:2',
				filter:function(event,player){
					// if(!lib.skill.yb018_qiyue.filter(event,player)) return false;
					var cards=player.getExpansions('yb001_minglun');
					for(var i of cards){
						if(get.suit(i)=='spade'){return true;}
					}
					return false;
				}
			},
			heart:{
				nobracket:true,
				inherit:'yb014_lvxin',
				audio:'ext:夜白神略/audio/character:2',
				filter:function(event,player){
					if(!lib.skill.yb014_lvxin.filter(event,player)) return false;
					var cards=player.getExpansions('yb001_minglun');
					for(var i of cards){
						if(get.suit(i)=='heart'){return true;}
					}
					return false;
				}
			},
			club:{
				nobracket:true,
				inherit:'yb018_zheye',
				audio:'ext:夜白神略/audio/character:2',
				filter:function(event,player){
					// if(!lib.skill.yb018_zheye.filter(event,player)) return false;
					var cards=player.getExpansions('yb001_minglun');
					for(var i of cards){
						if(get.suit(i)=='club'){return true;}
					}
					return false;
				}
			},
			diamond:{
				nobracket:true,
				inherit:'yb001_yishui',
				audio:'ext:夜白神略/audio/character:2',
				filter:function(event,player){
					// if(!lib.skill.yb001_yishui.filter(event,player)) return false;
					var cards=player.getExpansions('yb001_minglun');
					for(var i of cards){
						if(get.suit(i)=='diamond'){return true;}
					}
					return false;
				}
			},
		},
	},
	//-----------------陈爱琳
	'yb002_ziren':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		// filter:function(event,player){
		// 	return player.storage.yb002_ziren!=true;
		// },
		ai:{
			order:11,//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
			result:{//主动技的收益
				player:function(player,target){//注意，和effect里的参数不一样
					return player.hp-1.1;//血越多收益越高,1血不发动
				},
			},
		},
		chooseButton: {
			dialog(event, player) {
				return ui.create.dialog("###自刃###" + lib.translate.yb002_ziren_info);
			},
			chooseControl(event, player) {
				var list2 = ['无','火','雷','cancel2'];
				return list2;
			},
			check() {
				var player = get.player();
				if(get.damageEffect(player, player,player,'fire')>0)return '火';
				else if(get.damageEffect(player, player,player,'thunder')>0)return '雷';
				else if(player.hp>1)return '无';//血量大于1时，默认选项为无
				// return '无';//默认选项
				return "cancel2";
			},
			backup(result, player) {
				return {
					markname: result.control,
					filterCard() {
						return false;
					},
					selectCard: -1,
					// log: false,
					content() {
						var name = lib.skill.yb002_ziren_backup.markname;
						if(name=='无'){
							player.damage('nocard',player);
						}
						if(name=='火'){
							player.damage('fire','nocard',player);
						}
						if(name=='雷'){
							player.damage('thunder','nocard',player);
						}
					},
				};
			},
		},
		// direct:true,
		// content:function(){
		// 	'step 0'
		// 	player.chooseControl('无','火','雷','cancel2');
		// 	'step 1'
		// 	if(result.control=='cancel2'){
		// 		player.storage.counttrigger.yb002_ziren--;
		// 		event.finish;
		// 	}
		// 	else{
		// 		if(result.control=='无'){
		// 			player.damage('nocard',player);
		// 		}
		// 		if(result.control=='火'){
		// 			player.damage('fire','nocard',player);
		// 		}
		// 		if(result.control=='雷'){
		// 			player.damage('thunder','nocard',player);
		// 		}
		// 		game.log('yb002_ziren');
		// 		// player.storage.yb002_ziren=true;
		// 	}
		// },
	},
	//------------------------SP陈爱琳（旧版）
	'yb002_touxin':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',//此技能代码截自蒋干盗书
		filterTarget:function(c,p,t){
			return t!=p&&t.countGainableCards(p,'hej')>0;
		},
		content:function(){
			'step 0'
			player.loseHp();
			'step 1'
			player.gainPlayerCard(target,true,'hej','visibleMove');
		},
		ai:{
			order:1,
			result:{
				// player:function(player){
				// 	if(player.countCards('h')>=player.hp-1) return -1;
				// 	if(player.hp<3) return -1.1;
				// 	return 1;
				// },
				// target:-1,
				player: function (player, target) {
					// if(player.countCards('h')>=player.hp-1) return -1;
					if(player.hp<3) return -1.1;
					const hs = target.getGainableCards(player, 'h');
					const es = target.getGainableCards(player, 'e');
					const js = target.getGainableCards(player, 'j');
					const att = get.attitude(player, target);
					if (att < 0) {
						if (!hs.length && !es.some(card => {
							return get.value(card, target) > 0 && card != target.getEquip('jinhe');
						}) && !js.some(card => {
							var cardj = card.viewAs ? { name: card.viewAs } : card;
							if (cardj.name == "xumou_jsrg") return true;
							return get.effect(target, cardj, target, player) < 0;
						})) return 0;
					}
					else if (att > 1) {
						return (es.some(card => {
							return get.value(card, target) <= 0;
						}) || js.some(card => {
							var cardj = card.viewAs ? { name: card.viewAs } : card;
							if (cardj.name == "xumou_jsrg") return false;
							return get.effect(target, cardj, target, player) < 0;
						})) ? 1.5 : 0;
					}
					return 1;
				},
				target: function (player, target) {
					const hs = target.getGainableCards(player, 'h');
					const es = target.getGainableCards(player, 'e');
					const js = target.getGainableCards(player, 'j');

					if (get.attitude(player, target) <= 0) {
						if (hs.length > 0) return -1.5;
						return (es.some(card => {
							return get.value(card, target) > 0 && card != target.getEquip('jinhe');
						}) || js.some(card => {
							var cardj = card.viewAs ? { name: card.viewAs } : card;
							if (cardj.name == "xumou_jsrg") return true;
							return get.effect(target, cardj, target, player) < 0;
						})) ? -1.5 : 1.5;
					}
					return (es.some(card => {
						return get.value(card, target) <= 0;
					}) || js.some(card => {
						var cardj = card.viewAs ? { name: card.viewAs } : card;
						if (cardj.name == "xumou_jsrg") return false;
						return get.effect(target, cardj, target, player) < 0;
					})) ? 1.5 : -1.5;
				},
			},
			threaten:2,//嘲讽值
			expose:1,//跳立场
		},
	},
	'yb002_zheye':{
		inherit:'yb018_zheye',
		audio:'ext:夜白神略/audio/character:2',
	},
	QQQ002_xiangyun:{
		audio:'yb002_xiangyun',
		trigger: {
			global: ['gameStart'],
		},
		forced: true,
		mark: true,
		intro: {
			content: 'expansion',
		},
		dutySkill:true,
		init: (player) => player.storage.QQQ002_xiangyun = 1,
		async content(event, trigger, player) {
			var num = Math.floor(game.players.length / 2);
			var cards = get.cards(num);
			player.addToExpansion(cards, 'draw').gaintag.add('QQQ002_xiangyun');
		},
		group: ['QQQ002_xiangyun_1', 'QQQ002_xiangyun_2', 'QQQ002_xiangyun_3', 'QQQ002_xiangyun_4'],
		subSkill: {
			1: {
				audio:'yb002_xiangyun',
				trigger: {
					global: ['roundStart'],
				},
				forced: true,
				filter: (event, player) => player.countCards('he'),
				async content(event, trigger, player) {
					var prompt = '将至少一张花色各不相同的牌置入<香>,然后摸等量的牌';
					if (player.storage.QQQ002_xiangyun > 1) prompt = '将至少一张牌置入<香>,然后摸双倍的牌';
					const result = await player.chooseButton([prompt, player.getCards('he')], [1, player.countCards('he')], true)
						.set('filterButton', (button) => {
							if (ui.selected.buttons.length && player.storage.QQQ002_xiangyun < 2) {
								return !ui.selected.buttons.map((q) => q.link.suit).includes(button.link.suit);
							}
							return true;
						}).set('ai', (button) => 10 - get.value(button.link)).forResult();
					if (result.links && result.links[0]) {
						player.addToExpansion(result.links, player, 'give').gaintag.add('QQQ002_xiangyun');
						player.draw((player.storage.QQQ002_xiangyun > 1 ? 2 : 1) * result.links.length);
					}
				},
			},
			2: {
				audio:'yb002_xiangyun',
				trigger: {
					global: ['phaseUseBegin'],
				},
				forced: true,
				filter: (event, player) => (event.player == player || event.player.countCards('h') < event.player.hp) && player.getExpansions('QQQ002_xiangyun').length,
				async content(event, trigger, player) {
					const result = await trigger.player.chooseButton(['获得' + get.translation(player) + '的一张<香>', player.getExpansions('QQQ002_xiangyun')]).forResult()
					if (result.links && result.links[0]) {
						trigger.player.gain(result.links, 'gain2');
					}
				},
			},
			3: {
				audio:'yb002_xiangyun',
				trigger: {
					player: ['phaseZhunbeiBegin'],
				},
				forced: true,
				filter: (event, player) => (player.storage.QQQ002_xiangyun > 1 && player.getExpansions('QQQ002_xiangyun').map((q) => q.suit).unique().length == 4)
					|| (player.storage.QQQ002_xiangyun < 2 && player.getExpansions('QQQ002_xiangyun').map((q) => q.suit).unique().length == 3),
				async content(event, trigger, player) {
					player.$skill('使命成功');
					player.awakenSkill('QQQ002_xiangyun');
					player.when({ global: 'roundStart' }).then(() => {
						player.restoreSkill('QQQ002_xiangyun');
						player.storage.QQQ002_xiangyun++;
					});
					player.gain(player.getExpansions('QQQ002_xiangyun'), 'gain2');
					player.recover();
				},
			},
			4: {
				audio:'yb002_xiangyun',
				trigger: {
					player: ['phaseZhunbeiBegin'],
				},
				forced: true,
				filter: (event, player) => !player.getExpansions('QQQ002_xiangyun').length,
				async content(event, trigger, player) {
					player.$skill('使命失败');
					player.awakenSkill('QQQ002_xiangyun');
					player.when({ global: 'roundStart' }).then(() => {
						player.restoreSkill('QQQ002_xiangyun');
					});
					player.loseHp();
					player.recast(player.getCards('h'));
				},
			},
		}
	},
	/*
	'yb002_xiangyun':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:['loseAfter','useCard','respond','loseAsyncAfter','cardsDiscardAfter']
		},
		forced:true,
		filter:function(event,player){
			if(get.type(event.cards)!='equip'&&get.type(event.cards)!='delay')return true;
			return false;
		},
		content:function(){
			if(get.type(trigger.cards)!='equip'&&get.type(trigger.cards)!='delay')player.addToExpansion(trigger.cards,player,'giveAuto').gaintag.add('yb002_xiangyun');
		},
		marktext:'香',
		intro:{
			content:'expansion',
			markcount:'expansion',
		},
	},
	*/
	'yb002_xiangyun':{//太复杂，鸽了
		audio:'ext:夜白神略/audio/character:2',
		group:['yb002_xiangyun_1','yb002_xiangyun_2'],
		subSkill:{
			1:{
				audio:'yb002_xiangyun',
			},
			2:{
				audio:'yb002_xiangyun',
			},
		},
	},
	'yb002_yishui':{
		inherit:'yb001_yishui',
		audio:'ext:夜白神略/audio/character:2',
	},
	//-------------------------神陈爱琳
	'yb002_yiqu':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		//usable:1,
		filter:function (event,player){
			if(player.hasSkill('yb002_shangyuan')&&player.countMark('yb002_shangyuan')>(game.countPlayer()*2-1))return false;
			// return player.storage.yb002_yiqu==true;
			return !player.hasSkill('yb002_yiqu_block');
			// return true;
		},
		content:function (){
			'step 0'
			var controls=[];
			if(ui.cardPile.hasChildNodes()) controls.push('选择牌堆中的一张牌');
			if(ui.discardPile.hasChildNodes()) controls.push('选择弃牌堆中的一张牌');
			if(game.hasPlayer(function(current){
				return current.countCards('hej')>0;
			})) controls.push('选择一名角色区域内的一张牌');
			if(!controls.length){event.finish();return;}
			event.controls=controls;
			var next=player.chooseControl();
			next.set('choiceList',controls)
			next.set('prompt','请选择要移动的卡牌的来源');
			next.ai=function(){return 0};
			'step 1'
			result.control=event.controls[result.index];
			var list=['弃牌堆','牌堆','角色'];
			for(var i=0;i<list.length;i++){
				if(result.control.indexOf(list[i])!=-1){event.index=i;break;}
			}
			if(event.index==2){
				player.chooseTarget('请选择要移动的卡牌的来源',true,function(card,kagari,target){
					return target.countCards('hej')>0;
				});
			}
			else{
				var source=ui[event.index==0?'discardPile':'cardPile'].childNodes;
				var list=[];
				for(var i=0;i<source.length;i++) list.push(source[i]);
				player.chooseButton(['请选择要移动的卡牌',list],true).ai=get.buttonValue;
			}
			'step 2'
			if(event.index==2){
				player.line(result.targets[0]);
				event.target1=result.targets[0];
				player.choosePlayerCard(result.targets[0],true,'hej').set('visible',true);
			}
			else{
				event.card=result.links[0];
			}
			'step 3'
			if(event.index==2) event.card=result.cards[0];
			var controls=[
				'将这张牌移动到牌堆的顶部或者底部',
				'将这张牌移动到弃牌堆的顶部或者底部',
				'将这张牌移动到一名角色对应的区域里',
			];
			event.controls=controls;
			var next=player.chooseControl();
			next.set('prompt','要对'+get.translation(event.card)+'做什么呢？');
			next.set('choiceList',controls);
			next.ai=function(){return 2};
			'step 4'
			result.control=event.controls[result.index];
			var list=['弃牌堆','牌堆','角色'];
			for(var i=0;i<list.length;i++){
				if(result.control.indexOf(list[i])!=-1){event.index2=i;break;}
			}
			if(event.index2==2){
				player.chooseTarget('要将'+get.translation(card)+'移动到哪一名角色的对应区域呢',true).ai=function(target){
					return target==_status.event.player?1:0;
				};
			}
			else{
				player.chooseControl('顶部','底部').set(
					'prompt','把'+get.translation(card)+'移动到'+(event.index2==0?'弃':'')+'牌堆的...'
				);
			}
			'step 5'
			if(event.index2!=2){
				//if(event.target1) event.target1.lose(card,ui.special);
				//else card.goto(ui.special);
				event.way=result.control;
			}
			else{
				event.target2=result.targets[0];
				var list=['手牌区'];
				if(lib.card[card.name].type=='equip'&&event.target2.isEmpty(lib.card[card.name].subtype)) list.push('装备区');
				if(lib.card[card.name].type=='delay'&&!event.target2.storage._disableJudge&&!event.target2.hasJudge(card.name))
					list.push('判定区');
				if(list.length==1) event._result={control:list[0]};
				else{
					player.chooseControl(list).set(
						'prompt','把'+get.translation(card)+'移动到'+get.translation(event.target2)+'的...'
					).ai=function(){return 0};
				}
			}
			'step 6'
			if(event.index2!=2){
				var node=ui[event.index==0?'discardPile':'cardPile'];
				if(event.target1){
					var next=event.target1.lose(card,event.position);
					if(event.way=='顶部') next.insert_card=true;
				}
				else{
					if(event.way=='底部') node.appendChild(card);
					else node.insertBefore(card,node.firstChild);
				}
				player.addTempSkill('yb002_yiqu_block');
				game.updateRoundNumber();
				// player.storage.yb002_yiqu=false;
				event.finish();
			}
			else{
				if(result.control=='手牌区'){
					var next=event.target2.gain(card);
					if(event.target1){
						next.source=event.target1;
						next.animate='giveAuto';
					}
					else next.animate='draw';
				}
				else if(result.control=='装备区'){
					if(event.target1) event.target1.$give(card,event.target2);
					event.target2.equip(card);
				}
				else{
					if(event.target1) event.target1.$give(card,event.target2);
					event.target2.addJudge(card);
				}
			}
			'step 7'
			player.addTempSkill('yb002_yiqu_block');
			game.updateRoundNumber();
			// player.storage.yb002_yiqu=false;
		},
		ai:{
			order:10,
			result:{
				player:1,
			},
		},
		subSkill:{
			block:{
				forced:true,
				direct:true,//标记不用管
				charlotte:true,
				sub:true,
			},
		},
	},
	'ybold_shangyuan':{
		enable:'phaseUse',
		filter:function (event,player){
			if(player.hasSkill('yb002_yiqu_block')&&player.countMark('ybold_shangyuan')<(player.maxHp-player.hp))return true;
		},
		content:function (){
			player.removeSkill('yb002_yiqu_block');
			player.addMark('ybold_shangyuan');
		},
		mark:true,
		marktext:'怨',
		intro:{
			content:function (storage,player){
				var str='本回合已使用';
				var max=player.maxHp-player.hp;
				if(max<0)max=0;
				str+=get.translation(player.storage.ybold_shangyuan);
				str+='/';
				str+=get.translation(max);
				str+='次';
				return str;
			},
		},
		ai:{
			combo:'yb002_yiqu',
		},
	},
	'yb002_shangyuan':{
		audio:'ybold_shangyuan',
		trigger:{
			player:'damageEnd',
		},
		// direct:true,
		cost(){
			event.result = player.chooseTarget('请选择一个目标').set('ai',function(target){//ai选目标的限制条件
				return target.getDamagedHp();//选已损体力最大的
			}).forResult();
		},
		content:function (){
			'step 0'
			event.tar=event.targets[0];
			event.num=event.tar.maxHp-event.tar.hp;
			if(event.num>5)event.num=5;
			if(event.num<1)event.num=1;
			player.chooseControl('摸牌','弃牌').set('prompt','令'+get.translation(event.tar)+'摸或弃'+event.num+'张牌?').set('ai',function(target){
				var player=get.player();//定义变量player为选目标的发起者(不懂可以先不写)
				var target=event.tar;
				return get.attitude(player,target)>0?'摸牌':'弃牌';
			})
			'step 1'
			if(result.control=='摸牌'){
				event.tar.draw(event.num);
				event.xuan='摸';
			}
			else{
				event.tar.chooseToDiscard(event.num,'he',true);
				event.xuan='弃';
			}
			game.log(player,'令',event.tar,event.xuan,'了',get.cnNumber(event.num),'张牌');
			player.addMark('yb002_shangyuan',event.num);
		},
		mark:true,
		marktext:'殇',
		intro:{
			content:'mark',
		},
		ai:{
			maixie:true,
			threaten:0.6,//嘲讽值
			expose:1,//跳立场
		},
		group:['yb002_shangyuan_buff'],
		subSkill:{
			buff:{
				trigger:{
					player:'phaseEnd',
				},
				forced:true,
				content:function (){
					player.removeMark('yb002_shangyuan',player.storage.yb002_shangyuan);
				},
				sub:true,
			},
		},
	},
	//----------------闫爽003
	'yb003_wucai':{
		inherit:'yb009_wucai',
		audio:'ext:夜白神略/audio/character:1',
	},
	'yb003_toushi':{
		audio:'ext:夜白神略/audio/character:2',
	},
	'yb003_fenxiang':{
		audio:'ext:夜白神略/audio/character:2',
	},
	yb003_yeyan:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			global:'phaseBefore',
			player:'enterGame',
		},
		filter:function (event,player){
			return (event.name!='phase'||game.phaseNumber==0)&&!lib.inpile.includes('ybsl_lumingqianzhuan');
		},
		content:function (){
			var listup = ['ybsl_minimahua','ybsl_yumiruantang','ybsl_weihuabinggan','ybsl_qiaokelibang'];
			var list = [];
			var numb=Math.ceil(ui.cardPile.childElementCount/54)+1;
			for(var i=0;i< numb;i++){
				for(var k of listup){
					list.push(k);
				}
			}
			list.sort(() => Math.random() - 0.5);
			console.log(list)
			var numc=numb*4;
			var suits=['spade','heart','club','diamond'];
			var numbers=[1,2,3,4,5,6,7,8,9,10,11,12,13];
			suits.sort(() => Math.random() - 0.5);
			numbers.sort(() => Math.random() - 0.5);
			for(var k=0;k<numc;k++){
				var card=game.createCard2(list[k%list.length],suits[k%4],numbers[k%13]);
				ui.cardPile.insertBefore(card,ui.cardPile.childNodes[get.rand(0,ui.cardPile.childNodes.length)]);
			}
			game.broadcastAll(function(){
				lib.inpile.add('ybsl_minimahua')
				lib.inpile.add('ybsl_yumiruantang')
				lib.inpile.add('ybsl_weihuabinggan')
				lib.inpile.add('ybsl_qiaokelibang')
			});
			game.updateRoundNumber();
		},
	},
	yb003_xiangyan:{
		audio:'ext:夜白神略/audio/character:2',
		global:'yb003_xiangyan_global',
		forced:true,
		subSkill:{
			global:{
				audio:'yb003_xiangyan',
				trigger:{
					player:'useCard2',
				},
				filter(event,player){
					return get.type2(event.card)=='ybsl_lingshi'&&game.filterPlayer(c=>c.hasSkillTag('YB_fenxiang'));
				},
				async cost(event,trigger,player){
					event.result = await player.chooseTarget('请选择'+get.translation(trigger.card)+'的额外目标').set('selectTarget',function(){
						return [1,game.countPlayer(c=>c.hasSkillTag('YB_fenxiang'))];
					}).set('filterTarget',function(card,player,target){
						var trigger = _status.event.getTrigger();
						var targets = ui.selected.targets;
						if(player.hasSkillTag('YB_fenxiang')){
							if(targets){
								for(var i of targets){
									if(!i.hasSkillTag('YB_fenxiang'))return !trigger.targets.includes(target)&&target.hasSkillTag('YB_fenxiang');
								}
								return !trigger.targets.includes(target);
							}
							else return !trigger.targets.includes(target);
						}
						else{
							return !trigger.targets.includes(target)&&target.hasSkillTag('YB_fenxiang');
						}
						// return true;
					}).set('multitarget',function(){return true}).set('ai',function(target){
						var player=get.player();//定义变量player为选目标的发起者(不懂可以先不写)
						return get.attitude(player,target)>5;//选队友
					}).forResult();
				},
				content(){
					var targets=event.targets;
					game.log(player, "令", targets, "也成为了", trigger.card, "的目标");
					for(var i of targets){
						trigger.targets.add(i);
					}
				}
			},
		},
		ai:{
			YB_fenxiang:true,
		}
	},
	//----------------张玉洁004
	'yb004_wunv':{
		audio:'ext:夜白神略/audio/character:2',
		// audioname:['ybsl_048wushuang'],
		audioname2:{
			'ybsl_048wushuang':'yb048_wuling',
		},
		trigger:{player:'useCard',source:'damageBegin1'},
		forced:true,
		filter:function(event,player){
			if(event.name=='useCard') return get.type(event.card)=='trick';
			return player!=event.player&&player.countCards('h')>=event.player.countCards('h');
		},
		content:function(){
			if(event.triggername=='useCard')trigger.nowuxie=true;
			else trigger.num++;
		},
	},
	'yb004_tianqi':{
		audio:'ext:夜白神略/audio/character:2',
		locked:function(skill,player){
			if(!player||!player.storage.yb004_shangyuan) return true;
			return false;
		},
		trigger:{
			player:['phaseZhunbeiBegin','phaseJieshuBegin','damageEnd'],
			source:'damageAfter',
		},
		levelUpFilter:function(player){
			if(!player.storage.yb004_shangyuan)return true;
			return false;
		},
		levelUp:function(player){
			player.storage.yb004_shangyuan=true;
		},
		// direct:true,
		filter:function(event,player,name){
			if(name=='damageAfter'){
				if(event.player==player) return false;
			}
			if(!player.storage.yb004_shangyuan) return event.name=='damage'&&event.num>0;
			return name!='damageAfter';
		},
		cost(){
			var str='';
			if(event.triggername=='phaseZhunbeiBegin')str+='<span style=\'color:#e1ff00\'>准备阶段</span>或结束阶段或当你受到伤害后';
			if(event.triggername=='phaseJieshuBegin')str+='准备阶段或<span style=\'color:#e1ff00\'>结束阶段</span>或当你受到伤害后';
			if(event.triggername=='damageEnd')str+='准备阶段或结束阶段或<span style=\'color:#e1ff00\'>当你受到伤害后</span>';
			str+='，你可以进行一次判定，若结果为红色，则你回复1点体力或摸两张牌。';
			if(player.storage.yb004_shangyuan){
				event.result = player.chooseBool(get.prompt('yb004_tianqi',trigger.player),str).forResult();
			}
			else event.result={bool:true};
		},
		content:function(){
			'step 0'
			
			// if(event.bool){
				player.judge('天祈',function(card){
					if(player.storage.yb004_shangyuan){
						if(get.color(card)=='red')return 2;
						return 0;
					}//这里return 的数字别私自改
					else{
						if(event.triggername=='damageAfter'){
							if(trigger.num<=1){
								if(get.color(card)=='red')return 1.8;
								return 0;
							}
							else{
								if(get.color(card)=='black')return -2;
								return 0;
							}
						}
						else{
							if(get.color(card)=='black')return 3;
							return 2.5;
						}
					}
				});
			// }
			'step 1'
			switch(result.judge){
				case 3:player.draw(trigger.num+1);break;
				case 2.5:player.recover(Math.max(trigger.num-1,0));break;
				case 2:player.chooseDrawRecover(2,true);break;
				case 1.8:player.chooseDrawRecover(1,true);break;
				case -2:player.loseHp();player.draw();break;
				case 0:event.finish();break;
			}
		},
		// init:function(player,skill){
		// 	lib.skill.xinleiji_misa.disableReason.push('天祈')
		// },
	},
	'yb004_shangyuan':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			source:['die'],
		},
		filter:function(event,player){
			// if(event.num)game.log('event.num：',event.num);
			// if(event.getParent())game.log('event.getParent()：',event.getParent());
			// if(event.getParent(0))game.log('event.getParent(0)：',event.getParent(0));
			// if(event.getParent(1))game.log('event.getParent(1)：',event.getParent(1));//父事件为dying
			// if(event.getParent(2))game.log('event.getParent(2)：',event.getParent(2));//父事件为伤害
			// if(event.getParent(2).num)game.log('event.getParent(2).num：',event.getParent(2).num);
			// if(event.getParent(3))game.log('event.getParent(3)：',event.getParent(3));//父事件为技能
			// if(event.getParent(4))game.log('event.getParent(4)：',event.getParent(4));
			return event.getParent(2).num>1;
		},
		forced:true,
		juexingji:true,
		skillAnimation:true,
		animationColor:'YB_snow',
		derivation:['yb004_tianqi_rewrite','yb004_yujie'],
		// onremove:true,
		content:function(){
			'step 0'
			player.awakenSkill('yb004_shangyuan');
			player.removeSkill('yb004_wunv');
			player.storage.yb004_shangyuan=true;
			// player.YB_levelUp(['yb004_tianqi']);
			// lib.skill.xinleiji_misa.disableReason.remove('天祈')
			player.chooseDrawRecover(2,true);
			player.addSkill('yb004_yujie');
		},
	},
	'yb004_yujie':{
		audio:'ext:夜白神略/audio/character:1',
		audioname2:{
			ybsl_005wangruobing:'yb005_yujie',
		},
		forced:true,
		trigger:{player:['judgeBefore']},
		content:function(){
			'step 0'
			trigger.noJudgeTrigger=true;
			'step 1'
			var card=get.cards()[0];
			game.cardsGotoOrdering(card);
			event.card=card;
			game.broadcast(function(card){
				ui.arena.classList.add('thrownhighlight');
				card.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
			},event.card);
			event.node=event.card.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
			ui.arena.classList.add('thrownhighlight');
			game.addVideo('thrownhighlight1');
			game.addVideo('centernode',null,get.cardInfo(event.card));
			player.chooseBool('是否弃置'+get.translation(event.card)+'？');
			'step 2'
			if(!result.bool){
				game.log(player,'观看并放回了',event.card);
				ui.cardPile.insertBefore(event.card,ui.cardPile.firstChild);
			}
			else{
				game.log(player,'展示并弃掉了',event.card);
				event.card.discard();
			}
			game.addVideo('deletenode',player,[get.cardInfo(event.node)]);
			event.node.delete();
			game.broadcast(function(card){
				ui.arena.classList.remove('thrownhighlight');
				if(card.clone){
					card.clone.delete();
				}
			},event.card);
		},
	},
	/*
	巫女：锁定技玉洁
	1.当有角色即将进行判定时，你观看牌堆顶一张牌并可选择是否弃置。
	2.你的判定结果不能被更改。

	天祈：
	当你造成或受到伤害后，
	1.若本回合没有判定牌进入弃牌堆，则你可以进行一次判定
	红色：你获得判定牌并随机获得场上一张同颜色的牌
	黑色：若目标或来源手牌数不大于你则令此伤害-1或+1

	殇怨：觉醒技
	当你对其他角色造成＞1的伤害而令其陷入濒死状态时，你修改 天祈 
	获得技能：玉洁

	玉洁：同调
	锁定技，当有判定牌进入弃牌堆后，你本回合使用与此牌颜色相同的锦囊牌不能被响应。

	天祈•改：
	删除本回合没有判定牌进入弃牌堆的条件。
	*/
	//----------------王若冰005
	'yb005_bingqing':{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			target:'useCardToBegin',
		},
		filter:function(event,player){
			return event.card.name=='sha'&&(event.card.nature=='ice'||event.card.nature=='YB_snow'||event.player.getEquip('hanbing')||event.player.getEquip('ybsl_piaoxueruyi'));
		},
		content:()=>{trigger.cancel();},
		mod:{
			cardnature:function(card,player){
				if(get.name(card)=='sha') return 'ice';
			},
		},
		ai:{
			threaten:3,
			effect:{
				target:function(card,player,target){
					if(card.name=='sha'&&(get.nature(card)=='ice'||get.nature(card)=='YB_snow'||player.getEquip('hanbing')||player.getEquip('ybsl_piaoxueruyi'))) return 'zerotarget';
				}
			}
		},
		/*
		*/
	},
	'yb005_ruyu':{
		audio:'ext:夜白神略/audio/character:2',
	},
	yb005_qianxun:{
		mod:{
			targetEnabled:function(card,player,target,now){
				if(card.name=='shunshou'||card.name=='lebu') return false;
			}
		},
		audio:'ext:夜白神略/audio/character:2',
	},
	'yb005_jieshen':{
		audio:'ext:夜白神略/audio/character:2',
		// limited:true,
		skillAnimation:true,
		animationColor:'YB_snow',
		// enable:'phaseUse',
		trigger:{player:'phaseZhunbeiBegin',},
		check:function (event,player){
			if(player.maxHp>3)return true;
			if(player.maxHp<=2)return false;
			if(player.getDamagedHp()>1)return true;
		},
		derivation:['yb009_wucai','yb018_zheye','yb004_yujie'],
		content:function(){
			'step 0'
			// player.awakenSkill('yb005_jieshen');
			player.loseMaxHp();
			var list=[];
			if(!player.hasSkill('yb009_wucai'))list.push('yb009_wucai');
			if(!player.hasSkill('yb018_zheye'))list.push('yb018_zheye');
			if(!player.hasSkill('yb004_yujie'))list.push('yb004_yujie');
			if(list.length>0){player.chooseControl(list);}
			'step 1'
			if(result.control){player.addSkill(result.control);}
			player.draw(3);
		},
	},
	'yb005_wucai':{
		inherit:'yb009_wucai',
		audio:'ext:夜白神略/audio/character:1',
	},
	'yb005_zheye':{
		inherit:'yb018_zheye',
		audio:'ext:夜白神略/audio/character:2',
	},
	'yb005_yujie':{
		inherit:'yb004_yujie',
		audio:'ext:夜白神略/audio/character:2',
	},
	//----------------王汉桢006
	'yb006_boxue':{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:['useCard'],
			target:['useCardToTargeted'],
		},
		forced:true,
		init:function(player){
			player.storage.yb006_boxue=[];
		},
		levelUpFilter:function(player){
			if(!player.storage.yb006_boxuex)return true;
			return false;
		},
		levelUp:function(player){
			player.storage.yb006_boxuex=true;
		},
		filter:(event,player)=>{
			if(get.type(event.card)=='equip')return false;
			if(!player.storage.yb006_boxue.includes(event.card.name)) return true;
			return player.storage.yb006_boxuex;
		},
		content:function(){
			'step 0'
			if(!player.storage.yb006_boxue.includes(trigger.card.name)){
				player.storage.yb006_boxue.push(trigger.card.name);
				game.log(player,'记录了',get.translation(trigger.card.name))
			}
			else{
				player.storage.yb006_boxue.remove(trigger.card.name);
				game.log(player,'移除了',get.translation(trigger.card.name))
				var num=(!trigger.targets||!trigger.targets.includes(trigger.player))?2:1;
				player.draw(num);
			}
		},
		mark:true,
		intro:{
			content:function(event,player,storage,name,skill){
				var str='已记录了';
				str+=get.translation(player.storage.yb006_boxue);
				return str;
			}
		}
	},
	'yb006_jufan':{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		unique:true,
		juexingji:true,
		skillAnimation:true,
		animationColor:'YB_snow',
		trigger:{
			player:['phaseZhunbeiBegin','phaseJieshuBegin'],
		},
		derivation:['yb006_boxue_rewrite','yb006_biaoshuai_rewrite'],
		// onremove:true,
		filter:function(event,player){
			if(player.storage.yb006_boxue.length>=3)return true;
			return false;
		},
		init: function (player) {
			player.storage.yb006_boxue = [];
		},//QQQ
		content:function(){
			'step 0'
			player.awakenSkill('yb006_jufan');
			// player.YB_levelUp(['yb006_boxue','yb006_biaoshuai']);
			player.storage.yb006_boxuex=true;
			player.storage.yb006_biaoshuaix=true;
			game.log(player,'的【博学】和【表率】改变了。')
		},
		ai:{
			combo:'yb006_boxue',
		}
	},
	'yb006_biaoshuai':{
		audio:'ext:夜白神略/audio/character:2',
		zhuSkill:true,
		// global:'yb006_biaoshuai_2',
		trigger:{
			player:'useCard',
		},
		usable:1,
		direct:true,//也许不用管吧
		filter:(event,player)=>{
			if(_status.currentPhase!=player) return false;
			return true;
		},
		content:function(){
			// player.addTempSkill('yb006_biaoshuai_1');
			player.storage.yb006_biaoshuai=trigger.card.name;
			player.markSkill('yb006_biaoshuai');
		},
		intro:{
			content:function(event,player,storage,name,skill){
				return '本回合第一次用的牌是'+get.translation(player.storage.yb006_biaoshuai)+'。';
			}
		},
		levelUpFilter:function(player){
			if(!player.storage.yb006_biaoshuaix)return true;
			return false;
		},
		levelUp:function(player){
			player.storage.yb006_biaoshuaix=true;
		},
		group:'yb006_biaoshuai_3',
		subSkill:{
			// 1:{
			// 	direct:true,
			// 	trigger:{player:'phaseBefore'},
			// 	filter:(event,player)=>{
			// 		if(!player.storage.yb006_biaoshuai) return false;
			// 		return true;
			// 	},
			// 	content:function(){
			// 		delete player.storage.yb006_biaoshuai;
			// 		player.unmarkSkill('yb006_biaoshuai');
			// 	},
			// 	//这段并没什么卵用，本人作废的片段罢了
			// },
			// 2:{
			// 	trigger:{player:['useCard','respond'],},
			// 	round:1,
			// 	filter:(event,player)=>{
			// 		var name=event.card.name;
			// 		return game.countPlayer(function(current){
			// 			if(current==player)return false;
			// 			if(current.storage.yb006_biaoshuai==name) return true;
			// 		}).length>0;
			// 	},
			// 	//这段仍然没什么卵用，本人作废的片段罢了
			// },
			3:{
				trigger:{global:['useCard','respond'],},
				filter:function(event,player){
					if(event.player.group!='YB_memory') return false;
					if(event.player.hasSkill('yb006_biaoshuai_4')) return false;
					var name=event.card.name;
					return player.hasZhuSkill('yb006_biaoshuai')&&event.player!=player&&name==player.storage.yb006_biaoshuai;
				},
				// direct:true,
				cost(){
					if(player.storage.yb006_biaoshuaix){
						var str='表率：是否摸一张牌，然后你可以令'+get.translation(trigger.player)+'摸一张牌。';
						player.chooseBool(str).set('ai',function() {
							return true;
						});
					}
					else{
						var str='表率：是否令';
						str+=get.translation(player);
						str+='摸一张牌，然后你摸一张牌。'
						trigger.player.chooseBool(str).set('ai',function() {
							var att=get.attitude(_status.event.player,player);
							if(att>0) return true;
							else return false;
						});
					}
				},
				async content(event,trigger,player){
					await trigger.player.addTempSkill('yb006_biaoshuai_4','roundStart');
					await player.draw();
					var result = { bool : true };
					if(player.storage.yb006_biaoshuaix){
						var result = await player.chooseBool('表率：是否令'+get.translation(trigger.player)+'摸一张牌。').set('ai',function() {
							var att=get.attitude(_status.event.player,trigger.player);
							if(att>0) return true;
							else return false;
						}).forResult();
					}
					if(result.bool){
						await trigger.player.draw();
					}
				},
			},
			4:{onremove:true,},
		}
	},
	yb006_xueyan:{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		trigger:{
			global:'useCardToTargeted',
		},
		filter(event,player){
			return event.targets.length==1&&event.target!=event.player&&get.suit(event.card);
		},
		cost(){
			var suit =get.suit(trigger.card);
			event.result = player.chooseToDiscard('he').set('filterCard',function(card){
				return get.suit(card)==suit;
			})
			.set('prompt',get.translation(trigger.player)+'对'+get.translation(trigger.target)+'使用了'+get.translation(trigger.card))
			.set('prompt2',get.prompt('yb006_xueyan')+"<br>弃置一张同花色的牌，令此牌无效？<br>然后此牌原目标摸两张牌。")
			.set("chooseonly", true).set('ai',function(card){
				var trigger = _status.event.getTrigger();
				var atk = get.effect(trigger.target,trigger.card,trigger.player,player);
				if(atk>0) return false;
				var att = get.attitude(_status.event.player,trigger.target);
				if(att>5)return 6-get.value(card);
			}).forResult();
		},
		logTarget(event,player){
			return event.target;
		},
		content(){
			'step 0'
			event.target = trigger.target;
			player.discard(event.cards);
			'step 1'
			game.log(player,'令'+get.translation(trigger.card)+'无效了。')
			trigger.targets.length = 0;
			trigger.all_excluded = true;
			'step 2'
			event.target.draw(2);
		}
	},
	//----------------吴格格007
	// 'yb007_renqing':{
		// audio:'ext:夜白神略/audio/character:2',
	// },
	// 'yb007_shigu':{
		// audio:'ext:夜白神略/audio/character:2',
	// },
	// 'yb007_zhengling':{
		// audio:'ext:夜白神略/audio/character:2',
	// },
	yb007_chenwang:{
		audio:'ext:夜白神略/audio/character:2',
		//看在以往的情面，这次再宽限你一会
		//歪歪，你不会一点都没动吧
		enable:['chooseToUse'],
		usable:1,
		filter:function(event,player){
			if(player.countCards('hes')<=0)return false;
			var history=player.getAllHistory('useCard');
			if(history.length<1) return false;
			var evt=history[history.length-1];
			if(get.type(evt.card)=='equip')return false;
			if(event.filterCard({name:evt.card.name,isCard:true},player,event)) return true;
		},
		filterCard:function(card){
			return true;
		},
		check:function(card){
			return 7-get.value(card);
		},
		position:'hes',
		hiddenCard:function(player,name){
			var history=player.getAllHistory('useCard');
			if(history.length<1) return false;
			var evt=history[history.length-1];
			// game.log(evt.card.name,name)
			return name==evt.card.name;
		},
		viewAs:function(cards,player){
			var history=player.getAllHistory('useCard');
			if(history.length<1) return false;
			var evt=history[history.length-1];
			return {name:evt.card.name}
		},
		getLastUse:function(player){
			var history=player.getAllHistory('useCard');
			if(history.length<1) return false;
			var evt=history[history.length-1];
			return evt.card.name;
		},
		prompt:function(event,player){
			return '是否将一张牌当做'+get.translation(lib.skill.yb007_chenwang.getLastUse(_status.event.player))+'使用，然后摸一张牌'
		},
		selectCard:1,
		group:'yb007_chenwang_2',
		subSkill:{
			2:{
				trigger:{player:'useCardAfter'},
				audio:'yb007_chenwang',
				filter:function(event,player){
					return event.skill&&event.skill=='yb007_chenwang';
				},
				// direct:true,
				forced:true,
				content:function(){
					// player.logSkill('yb007_chenwang')
					player.draw();
				},
			},
		},
		ai:{
			order(item,player) {
				var history = player.getAllHistory('useCard')
				if (!history.length) return false
				var evt = history.lastItem
				if(player.isPhaseUsing()) {
					var card = evt.card
					var num = player.getUseValue({ name : card.name, nature : card.nature })
					if (player.countCards('hs', cardx => player.getUseValue(cardx) > num)) return 1
					return 11
				}
				return 1;
			},//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
			result:{//主动技的收益
				player:function(player,target){
					return 1;
				},
			},
		},
	},
	//----------------吴雨欣
	'yb008_wucai':{
		inherit:'yb009_wucai',
		audio:'ext:夜白神略/audio/character:1',
	},
	'yb008_jianwu':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		// animationColor:'YB_snow',
		// skillAnimation:true,
		filterCard:function(card){
			var suit=get.suit(card);
			for(var i=0;i<ui.selected.cards.length;i++){
				if(get.suit(ui.selected.cards[i])==suit) return false;
			}
			return true;
		},
		selectCard:[1,64],
		complexCard:true,
		filterTarget:function(card,player,target){
			return player!=target;
		},
		selectTarget:function(){
			if(ui.selected.targets.length>ui.selected.cards.length){
				game.uncheck('target');
			}
			return ui.selected.cards.length;
		},
		content:function(){
			target.damage('nocard');
		},
		check:function(card){
			return 5-get.value(card);
		},
		position:'he',
		ai:{
			threaten:1.5,//嘲讽值
			damage:true,
			expose:1,//跳立场
			order:8,//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
			result:{//主动技的收益
				player:function(player,target){
					return 1;
				},
				target:function(player,target){
					return get.damageEffect(target,player);
				},
			},
		},
	},
	'yb008_zhenxin':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{player:'phaseJieshuBegin'},
		frequent:true,
		preHidden:true,
		content:function(){
			'step 0'
			event.num=1;
			'step 1'
			var suits=[];
			var history=game.getGlobalHistory('cardMove',function(evt){
				if(evt.player==player){
					if(evt.name=='lose'){
						for(var i of evt.cards) suits.add(get.suit(i,false));
					}
					else{
						if(evt.name=='cardsDiscard'){
							for(var i of evt.cards) suits.add(get.suit(i,false));
						}
					}
				}
			});
			event.num+=suits.length>2?2:suits.length;
			'step 2'
			player.draw(event.num);
		},
		ai:{
			threaten:1.1,//嘲讽值
		},
	},
	'yb008_wanyue':{
		inherit:'yb001_wanyue',
		audio:'ext:夜白神略/audio/character:2',
	},
	//-----------------李玉珊
	'yb009_wucai':{
		audio:'ext:夜白神略/audio/character:1',
		audioname2:{
			ybsl_003yanshuang:'yb003_wucai',
			ybsl_005wangruobing:'yb005_wucai',
			ybsl_008wuyuxin:'yb008_wucai',
			ybsl_010zhouyue:'yb010_wucai',
		},
		trigger:{
			player:'phaseDrawBegin2',
		},
		forced:true,
		preHidden:true,
		filter:function (event,player){
			return !event.numFixed;
		},
		content:function (){
			trigger.num++;
		},
		ai:{
			threaten:1.5,//嘲讽值
		},
		group:'yb009_wucai_luv',
		subSkill:{
			luv:{
				audio:'yb009_wucai',
				trigger:{
					player:'damageBegin4',
				},
				audioname2:{
					ybsl_003yanshuang:'yb003_wucai',
					ybsl_005wangruobing:'yb005_wucai',
					ybsl_008wuyuxin:'yb008_wucai',
					ybsl_010zhouyue:'yb010_wucai',
				},
				forced:true,
				filter:function (event,player){
					return player.hp>1;
				},
				content:function (){
					trigger.cancel();
					trigger.player.loseHp(trigger.num);
				},
				sub:true,
			},
		},
	},
	'yb009_tuling':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'loseHpEnd',
		},
		forced:true,
		preHidden:true,
		content:function (){
			'step 0'
			event.num=trigger.num*2;
			'step 1'
			player.changeHujia(event.num);
		},
		ai:{
			maihp:true,
		},
		mod:{
			maxHandcard:function (player,num){
				return num+player.hujia;
			},
		},
	},
	'yb009_tulinghuaqi':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:['phaseJudgeBegin','phaseDrawBegin','phaseUseBegin','phaseDiscardBegin'],
		},
		check:function (event,player){
			if(player.hp<=1)return false;
			if(player.hp==2&&!player.hasSkill('yb009_tuling'))return false;
			return true;
		},
		preHidden:true,
		content:function (){
			'step 0'
			player.loseHp(1);
			'step 1' 
			player.draw(2);
			game.log(player,'：后土所鉴，贞心一片！');
		},
		'prompt2':function(event,player){
			var str='现在是';
			if(event.name=='phaseJudge')str+='<span style=\'color:#e1ff00\'>判定</span>';
			if(event.name=='phaseDraw')str+='<span style=\'color:#e1ff00\'>摸牌</span>';
			if(event.name=='phaseUse')str+='<span style=\'color:#e1ff00\'>出牌</span>';
			if(event.name=='phaseDiscard')str+='<span style=\'color:#e1ff00\'>弃牌</span>';
			str+='阶段开始时，是否失去1点体力并摸两张牌？';
			return str;
		},
		init:function (player){
			player.addSkill('yb009_tulinghuaqi_add');
		},
		subSkill:{
			add:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					source:'damageBefore',
				},
				filter:function (event,player){
					return player.hujia;
				},
				check:function (event,player){
					var nm=player.hp+player.hujia;
					if(nm<=3)return false;
					return true;
				},
				content:function (){
					'step 0'
					player.changeHujia(-1);
					'step 1'
					trigger.num++;
					game.log(player,'：大地赐予我力量！');
				},
				sub:true,
				ai:{
					threaten:2,//嘲讽值
					effect:{//牌的影响
						player:function(card,player,target){//你使用牌时对你的影响
							if(card.name=="tao"){//如果使用的牌是桃
								return 1.1;//影响比一般人大点
							}
						},
						target:function(card,player,target){//你成为牌的目标时对你的影响
							if(get.tag(card,"damage")){//如果牌能造成伤害
								return 1.1;//影响比一般人大点
							}
						},
					},
				},
			},
		},
	},
	//----------------周玥
	'yb010_wucai':{
		inherit:'yb009_wucai',
		audio:'ext:夜白神略/audio/character:1',
	},
	'yb010_yeyu':{//夜语
		// preHidden:true,
		usable:1,
		audio:'ext:夜白神略/audio/character:2',
		// direct:true,
		trigger:{
			player:'damageAfter',
			source:'damageSource',
		},
		filter:function(event,player){
			if(event.player==player){var target=event.source;}
			else{var target=event.player;}
			return (event.source&&event.player&&player!=target&&target.isAlive()&&event.num>0);
		},
		content:function(){
			'step 0'
			if(trigger.player==player){event.target=trigger.source;}
			else{event.target=trigger.player;}
			'step 1'
			player.gainPlayerCard('h',2,event.target,true);
			'step 2'
			if(event.target.countCards('h')==0)event.target.draw(2);
		},
		ai:{
			expose:0.6,//跳立场
			maixie:true,
			maixie_hp:true,
			/*
			maixie_defend:function{
				
			},
			*/
			result:{
				player:function(player){
					return 2;
				},
			},
		},
	},
	'yb010_zheye':{
		inherit:'yb018_zheye',
		audio:'ext:夜白神略/audio/character:2',
	},
	'yb010_mingzhu':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:"damageBegin3",
		},
		audioname2:{
			ybsl_068qingyue:'yb068_mingzhu',
			ybsb_068qingyue:'yb068_mingzhu',
		},
		forced:true,
		filter:function(event,player){
			if(!player.isEmpty(5)) return false;
			if(event.hasNature()) return true;
			// if(event.nature) return true;
		},
		content:function (){
			trigger.cancel();
		},
		ai:{
			nofire:true,
			nothunder:true,
			effect:{
				target:function (card,player,target,current){
					if(player==target&&get.subtype(card)=='equip5'){
						if(get.equipValue(card)<=8) return 0;
					}
					if(!target.isEmpty(5)) return;
					if(get.tag(card,'natureDamage')) return 'zerotarget';
				},
			},
		},
	},
	//----------------高宇航
	'yb011_lijian':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		filter:function(event,player){
			return game.countPlayer(function(current){
				return current!=player&&current.hasSex('male');
			})>1;
		},
		check:function(card){return 10-get.value(card)},
		filterCard:true,
		position:'he',
		filterTarget:function(card,player,target){
			if(player==target) return false;
			if(!target.hasSex('male')) return false;
			if(ui.selected.targets.length==1){
				return target.canUse({name:'juedou'},ui.selected.targets[0]);
			}
			return true;
		},
		targetprompt:['先出杀','后出杀'],
		selectTarget:2,
		multitarget:true,
		content:function(){
			targets[1].useCard({name:'juedou',isCard:true},'nowuxie',targets[0],'noai').animate=false;
			game.delay(0.5);
		},
		ai:{
			order:8,
			result:{
				target:function(player,target){
					if(ui.selected.targets.length==0){
						return -3;
					}
					else{
						return get.effect(target,{name:'juedou'},ui.selected.targets[0],target);
					}
				}
			},
			expose:0.4,//跳立场
			threaten:3,//嘲讽值
		}
	},
	'yb011_jueleng':{
		preHidden:true,
		mark:true,
		audio:'yb011_jueleng_1',
		locked:false,
		zhuanhuanji:true,
		marktext:'☯',
		intro:{
			content:function(storage,player,skill){
				if(player.storage.yb011_jueleng==true) return '当场上角色受到伤害后，若<span class=yellowtext>受伤角色</span>为其他角色，则你可以与受伤角色各摸一张牌或各弃一张牌。';
				return '当场上角色受到伤害后，若<span class=firetext>伤害来源</span>为其他角色，则你可以与伤害来源各摸一张牌或各弃一张牌。';
			},
		},
		group:['yb011_jueleng_1','yb011_jueleng_3'],
		subSkill:{
			1:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{
					global:'damageEnd'
				},
				prompt2:function(event,player){
					var str='';
					str+='与其各摸一张牌或各弃一张牌？';
					return str;
				},
				filter:function(event,player){
					if(!player.storage.yb011_jueleng){var tar=event.source}
					else{var tar=event.player}
					if(tar)return tar!=player&&tar.isAlive();
				},
				logTarget:function (event,player){
					if(!player.storage.yb011_jueleng){var tar=event.source}
					else{var tar=event.player}
					if(tar)return tar;
				},
				content:function(){
					'step 0'
					if(!player.storage.yb011_jueleng){var tar=trigger.source,str='造成'}
					else{var tar=trigger.player,str='受到'}
					event.tar=tar;
					event.str=str;
					'step 1'
					var list=['各摸一张牌','各弃一张牌'];
					player.chooseControl(list).set('prompt',get.translation(event.tar)+event.str+'了伤害，请选择');
					'step 2'
					if(result.control=='各摸一张牌'){
						player.draw();
						event.tar.draw();
					}
					else{
						player.chooseToDiscard(true,'he');
						event.tar.chooseToDiscard(true,'he');
					}
					player.changeZhuanhuanji('yb011_jueleng');
					'step 3'
					game.delayx();
				},
			},
			3:{
				audio:'yb011_jueleng_1',
				trigger:{
					player:['damageBegin3','phaseJieshuBegin'],
				},
				content:function(){
					player.changeZhuanhuanji('yb011_jueleng');
				},
				check:function (event,player){
					if(!player.storage.yb011_jueleng)return false;
					return true;
				},
				prompt2:'结束阶段或当你受到伤害时，你可以改变此技能状态。',
			},
		},
	},
	//----------------
	yb011_kongbai:{
		audio:'ext:夜白神略/audio/character:4',
		logAudio(event, player, name) {
			if (name == "damageBegin4") {
				return ['ext:夜白神略/audio/character/yb011_kongbai3','ext:夜白神略/audio/character/yb011_kongbai4'];
			}
			return ['ext:夜白神略/audio/character/yb011_kongbai1','ext:夜白神略/audio/character/yb011_kongbai2'];
		},
		trigger: {
			player:["equipBegin",'damageBegin4'],
		},
		forced: true,
		filter: function (event, player,name) {
			if(name=='damageBegin4'){
				var list = player.storage.yb011_khen||[];
				return event.card&&!list.includes(event.card.name);
			}
			return true;
			// return get.type(event.card) == "equip";
		},
		async content(event,trigger,player){
			if(event.triggername=='damageBegin4'){
				var card = trigger.card;
				if(!player.hasSkill('yb011_khen'))player.addSkill('yb011_khen');
				if(!player.storage.yb011_khen)player.storage.yb011_khen=[];
				await player.storage.yb011_khen.push(card.name);
				player.updateMarks();
			}
			else{
				var card = trigger.card;
				var cards = trigger.cards;
				// player.addToExpansion(cards,player,'giveAuto').gaintag.add('sczs_qiangxi');
				if(!player.hasSkill('yb011_lhen'))player.addSkill('yb011_lhen');
				
				if(!player.storage.yb011_lhen)player.storage.yb011_lhen=[];
				await player.storage.yb011_lhen.push(card);
				cards.forEach(cardx => {
					cardx.fix();
					cardx.remove();
					cardx.destroyed = true;
					game.log(cardx, "被销毁了");
				});
				var subtype = lib.card[card.name].subtype;
				await player.disableEquip(subtype);
				var info=lib.card[card.name].skills;
				if(info&&info.length) await player.addAdditionalSkill('yb011_lhen',info,true);
				
				if (Array.isArray(info)) {
					for (var i of info) {
						var infox = lib.skill[i];
						if (!infox.audioname2) infox.audioname2 = {};
						if (!infox.audioname2.sgscq_dianwei) infox.audioname2.sgscq_dianwei = 'sczs_qiangxi_add';
					}
				}

				player.updateMarks();
			}
		},
	},
	yb011_khen:{
		audio:'yb011_kongbai',
		logAudio:()=>['ext:夜白神略/audio/character/yb011_kongbai3','ext:夜白神略/audio/character/yb011_kongbai4'],
		charlotte:true,
		mark:true,
		marktext:'痕',
		intro:{
			name:'痕',
			content:function(storage,player){
				if(storage&&storage.length){
					var str = get.YB_tobo(storage);
					if(player.hasSkill('yb011_hen'))return '<span style="color: #ff0000;">累了就毁灭吧：<br>' + str+'</span>';
					return '你仿佛伤痕累累：<br>'+str;
				}
				return '你仿佛洁白无瑕';
			},
		},
	},
	yb011_lhen:{
		audio:'yb011_kongbai',
		logAudio:()=>2,
		charlotte:true,
		mark:true,
		marktext:'迹',
		intro:{
			name:'迹',
			mark:function(dialog,storage,player){
				dialog.addText('你人生的白纸上写下了以下篇章');
				var list = [];
				for(var i=0;i<storage.length;i++){
					list.add([storage[i].suit,storage[i].number,storage[i].name,get.YB_tag(storage[i])])
				}
				dialog.addSmall([list,'vcard'])
			},

		},
	},
	yb011_chenxing:{
		audio:'ext:夜白神略/audio/character:2',
		dutySkill: true,
		group: ['yb011_chenxing_1', 'yb011_chenxing_2', 'yb011_chenxing_3', 'yb011_chenxing_4'],
		subSkill:{
			1:{},
			2:{},
			3:{//成功
				audio:'yb002_xiangyun',
				logAudio:()=>1,
				trigger: {
					player: ['phaseZhunbeiBegin'],
				},
				forced: true,
				filter: (event, player) => player.countDisabled()>=3,
				async content(event, trigger, player) {
					player.$skill('使命成功');
					player.awakenSkill('yb011_chenxing');
					await player.gainMaxHp();
					await player.recover();
					await player.addSkill('yb011_yinmeng');
				},
			},
			4:{//失败
				audio:'yb002_xiangyun',
				logAudio:()=>['ext:夜白神略/audio/character/yb011_chenxing_2'],
				trigger: {
					player: ['phaseZhunbeiBegin','dying'],
				},
				forced: true,
				filter: (event, player,name) => {
					if(name=='dying')return true;
					return player.countDisabled()<3&&player.storage.yb011_khen?.length>=3

				},
				async content(event, trigger, player) {
					player.$skill('使命失败');
					player.awakenSkill('yb011_chenxing');
					await player.loseMaxHp();
					await player.recover(player.maxHp-player.hp);
					await player.removeSkill('yb011_kongbai');
					await player.addSkill('yb011_hen');
				},
			},
		},
		derivation:['yb011_yinmeng','yb011_hen']
	},
	yb011_yinmeng:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			source:'damageBegin1',
		},
		filter(event,player){
			if(!event.card)return false;
			return true;
		},
		check:function(event,player){
			var storage = player.storage.yb011_khen;
			if(storage.length>0&&storage.includes(event.card.name))return event.player.hp*2-player.countCards('h')>2;
			return true;
		},
		prompt2:function(event,player){
			var storage = player.storage.yb011_khen;
			if(storage.length>0&&storage.includes(event.card.name))return '当你即将造成卡牌伤害时，<span class=yellowtext>若你有此牌对应的“痕”，你可以防止此伤害并移除对应的“痕”，然后你与当前回合角色各摸一张牌</span>，否则你可以记录对应的“痕”。';
			return '当你即将造成卡牌伤害时，若你有此牌对应的“痕”，你可以防止此伤害并移除对应的“痕”，然后你与当前回合角色各摸一张牌，<span class=yellowtext>否则你可以记录对应的“痕”</span>。';
		},
		content(){
			'step 0'
			var storage = player.storage.yb011_khen;
			if(storage.length>0&&storage.includes(trigger.card.name)){
				trigger.cancel()
				player.storage.yb011_khen.remove(trigger.card.name);
				player.updateMarks();
				player.draw();
				_status.currentPhase.draw();
			}
			else {
				player.storage.yb011_khen.push(trigger.card.name);
				player.updateMarks();
			}
		}
	},
	yb011_hen:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		mod:{
			maxHandcard:function(player,num){
				var numb=player.storage.yb011_khen?.length;
				if(numb>0)return num+numb;
			},
		},
		trigger:{
			player:['damageBegin3','phaseDrawBegin','phaseAfter'],
			source:['damageBegin2'],
		},
		filter(event,player,name){
			var storage = player.storage.yb011_khen;
			if(name=='damageBegin2'){
				return event.card&&storage.includes(event.card.name);
			}
			else if(name=='phaseAfter'){
				return !player.getStat("kill")||player.getStat('kill')==0;
			}
			else if(name=='damageBegin3'){
				return event.card&&storage.includes(event.card.name);
			}
			else {
				return storage.length>0;
			}
		},
		content(){
			var storage = player.storage.yb011_khen;
			var name = event.triggername;
			if(name=='damageBegin2'){
				trigger.num++;
			}
			else if(name=='phaseAfter'){
				player.loseHp();
			}
			else if(name=='damageBegin3'){
				trigger.cancel();
			}
			else {
				trigger.num+=storage.length;
			}
		}
	},
	//---------------郑佳怡
	yb012_bianqian:{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		filter:function(event,player){
			return player.countCards('h')>0;
		},
		selectCard:1,
		filterCard:true,
		position:'h',
		discard:false,
		loseCard:false,
		content:function(){
			player.addToExpansion(cards,player,'giveAuto').gaintag.add('yb012_bianqian');
		},
		intro:{
			markcount:"expansion",
			mark:function(dialog,content,player){
				var content=player.getExpansions('yb012_bianqian');
				if(content&&content.length){
					if(player==game.me||player.isUnderControl()/*||_status.event.player.hasSkill('yb012_bianqian')*/){
						dialog.addAuto(content);
					}
					else{
						return '共有'+get.cnNumber(content.length)+'张小抄';
					}
				}
			},
			content:function(content,player){
				var content=player.getExpansions('yb012_bianqian');
				if(content&&content.length){
					if(player==game.me||player.isUnderControl()){
						return get.translation(content);
					}
					return '共有'+get.cnNumber(content.length)+'张小抄';
				}
			},
		},
		group:['yb012_bianqian_taoluan','yb012_bianqian_longhun'],
		subSkill:{
			taoluan:{
				audio:'yb012_bianqian',
				enable:'chooseToUse',
				name:'小抄',
				filter:function (event,player){
					var evt=lib.filter.filterCard;
					if(event.filterCard) evt=event.filterCard;
					for(var i of player.getExpansions('yb012_bianqian')){
						if(evt({name:i.name},player,event)) return true;
					};
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var cards=player.getExpansions('yb012_bianqian');
						return ui.create.dialog('小抄',cards,'hidden');
					},
					filter:function (button,player){
						var card=button.link;
						return _status.event.getParent().filterCard({name:card.name},player,_status.event.getParent());
					},
					check:function (button){
						return _status.event.player.getUseValue({name:button.link['name'],isCard:true});
					},
					backup:function(links,player){
						var skill=_status.event.buttoned;
						return {
							audio:'yb012_bianqian',
							// filterCard:function(){return false},
							viewAs:{
								name:links[0].name,
								nature:links[0].nature,
								// suit:links[0].suit,
								// number:links[0].number,
							},
							filterCard:()=>true,
							YBcard:links[0],
							selectCard:[0,1],
							position:'h',
							check:function(event,player,card){
								var cards=player.getExpansions('yb012_bianqian');
								if(cards.length==1)return 0;
								else return 10-get.value(card);
							},
							card:()=>card?card:links[0],
							precontent:function(){
								if(event.result.cards&&event.result.cards[0]){
									player.discard(lib.skill.yb012_bianqian_taoluan_backup.YBcard)
								}
								else{
									var cardv=lib.skill.yb012_bianqian_taoluan_backup.YBcard;
									event.result.cards=cardv;
								}
							}
						}
					},
					prompt:function(links,player){
						return '小抄：选择 '+get.translation(links[0])+'的目标';
					}
				},
				hiddenCard:function (player,name){
					// var list=player.getExpansions('yb012_bianqian');
					// return list.includes(name);
					return true;
				},
				ai:{
					order:function(item,player){
						if(!player)var player=_status.event.player;
						if(player.getExpansions('yb012_bianqian')&&player.getExpansions('yb012_bianqian'))return get.order(player.getExpansions('yb012_bianqian')[0])+5;//假如列表仅剩一个，则使用收益顺序排在最高
						return 5;
					},//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
					result:{
						player:function (player){
							if(_status.event.dying) return get.attitude(player,_status.event.dying);
							return 1;
						},
					},
					// tag:{
						// save:true,
					// }
				},
			},
			longhun:{
				trigger:{player:'useCard'},
				forced:true,
				popup:false,
				filter:function(event){
					var evt=event;
					// return evt.skill=='yb012_bianqian_taoluan_backup'&&!event.cards.length;
					return evt.skill=='yb012_bianqian_taoluan_backup'&&event.cards[0]==lib.skill.yb012_bianqian_taoluan_backup.YBcard;
				},
				content:function(){
					player.discard(player.getExpansions('yb012_bianqian'))
				}
			},
		},
	},
	yb012_xibei:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'useCardAfter',
		},
		filter:function(event,player){
			if(event.player==player)return false;
			if(event.card.isCard&&event.cards.length==1){
				return get.position(event.cards[0],true)=='o';
			}
		},
		check:function(){return true},
		content:async function(event, trigger, player) {
			player.addToExpansion(trigger.cards,player,'giveAuto').gaintag.add('yb012_bianqian');
		},
		prompt2:function(event,player){
			return get.translation(event.player)+'使用了一张'+get.translation(event.card)+'，是否收录为小抄？';
		},
		ai:{
			combo:'yb012_bianqian'
		}
	},
	yb012_suotu:{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		filterTarget: function (card, player, target) {
			return target != player && target.countCards("h") > 0;
		},
		content: function () {
			"step 0"
			if (!target.countCards("h") || !player.isIn()) event.finish();
			else player.choosePlayerCard(target, "h", true);
			"step 1"
			if (result.bool) {
				event.show_card = result.cards[0];
				var str = get.translation(player);
				player.showCards(event.show_card);
				target
					.chooseControl()
					.set("choiceList", [
						`令${str}获得${get.translation(event.show_card)}`,
						`受到${str}造成的1点伤害`,
					])
					.set("ai", function () {
						var evt = _status.event.getParent(),
							player = evt.target,
							source = evt.player,
							card = evt.show_card;
						if (get.damageEffect(player, source, player) > 0) return 1;
						if (get.attitude(player, source) * get.value(card, source) >= 0) return 0;
						if (card.name == "tao") return 1;
						return get.value(card, player) >
							6 + (Math.max(player.maxHp, 3) - player.hp) * 1.5
							? 1
							: 0;
					});
			} else event.finish();
			"step 2";
			if (result.index == 0) target.give(event.show_card, player);
			else target.damage();
		},
		ai: {
			order: 6,
			tag: {
				damage: 1,
				loseCard: 1,
				gain: 1,
			},
			result: {
				player: 0.1,
				target: -1.2,
			},
		},
	},
	yb012_juli:{
		audio:'ext:夜白神略/audio/character:2',
	},
	// 'yb012_bianqian':'便签',
	// 'yb012_bianqian_info':'出牌阶段限一次，你可以将一张手牌盖在武将牌上称为“小抄”；
	// 你可以在合适的时机选择一张“小抄”，然后①使用此“小抄”，并弃置其余小抄②弃置此“小抄”，并将一张手牌当此”小抄”使用。',
	
	// 'yb012_xibei':'习备',
	// 'yb012_xibei_info':'场上其他角色使用非转化即时牌后，若此牌存在于弃牌堆中，你可以将之充入“小抄”。',
	// 'yb012_suotu':'索图',
	// 'yb012_suotu_info':'出牌阶段限一次，你可以选择一名有手牌的其他角色，你展示其一张手牌，令其选择：①令你获得此牌，②受到你造成的1点伤害。',
	//---------------尹姬
	yb013_shanwu:{
		audio:'ext:夜白神略/audio/character:1',
	},
	yb013_qingling:{
		audio:'ext:夜白神略/audio/character:1',
	},
	//神夜白的特定技能语音
	yb014_sanmeng:{
		audio:'ext:夜白神略/audio/character:1',
		inherit:'ybsl_sanmeng',
	},
	yb014_fufeng:{
		audio:'ext:夜白神略/audio/character:1',
	},
	yb014_yongyue:{
		audio:'ext:夜白神略/audio/character:2',
	},
	//----------------旅心
	'yb014_lvxin':{//---------旅心
		locked:false,
		mod:{
			aiOrder:function (player,card,num){
				if(typeof card=='object'&&player==_status.currentPhase){
					var evt=player.getLastUsed();
					if(evt&&evt.card&&get.type(evt.card)!='none'&&get.type(card)!='none'&&get.type(evt.card)!=get.type(card)){
						return num+10;
					}
				}
			},
		},
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'useCard',
		},
		audioname2:{
			'ybsl_033xiaohui':'yb033_lvxin',
			'ybsl_053qiuer':'yb053_lvxin',
			'ybsl_081chenli':'yb081_lvxin',
		},
		frequent:true,
		filter:function (event,player){
			var evt=player.getLastUsed(1);
			if(!evt) return false;
			var type1=get.type(evt.card);
			var type2=get.type(event.card);
			return type1&&type2&&type1!='none'&&type2!='none'&&type1!=type2;
		},
		content:function (){
			var evt=player.getLastUsed(1);
			if(!evt) return false;
			// if(!evet) return false;
			var type1=get.type(evt.card);
			var type2=get.type(trigger.card);
			if(type1&&type2&&
			  type1!='none'&&type2!='none'&&
			  type1!=type2
			){
				player.draw(num);
			}
		},
		ai:{
			threaten:2.5,//嘲讽值
		},
	},
	//----------------------SP本人
	'yb014_yingbian':{
		preHidden:true,
		groupSkill:true,
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:'useCardAfter',
		},
		filter:function(event,player){
			return (event.card&&event.card.isCard&&(event.skill!='yb014_yingbian_1')&&(player.group=='YB_memory'||player.group=='ye'));
		},
		content:function(){
			var type=get.type(trigger.card);
			if(type=='basic'||type=='trick'){
				player.storage.suijiyingbian=trigger.card.name;
				player.storage.suijiyingbian_nature=trigger.card.nature;
			}
			player.storage.yb014_yingbian=get.type2(trigger.card);
			player.addTempSkill('yb014_yingbian_1',{player:'useCardBegin'});
		},
		subSkill:{
			1:{
				mod:{
					cardname:function(card,player){
						if(get.type2(card,false)==player.storage.yb014_yingbian&&player.storage.suijiyingbian) return player.storage.suijiyingbian;
					},
					cardnature:function(card,player){
						if(get.type2(card,false)==player.storage.yb014_yingbian&&player.storage.suijiyingbian_nature) return player.storage.suijiyingbian_nature;
					},
				},
				sub:true,
			},
		},
	},
	'yb014_yazhi':{
		preHidden:true,
		groupSkill:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{source:'damageBegin1'},
		forced:true,
		filter:function(event,player){
			return (player.group=='shen'||player.group=='ye');
		},
		content:function(){
			trigger.num++;
		},
		ai:{presha:true},
		group:['yb014_yazhi_1','yb014_yazhi_2'],
		subSkill:{
			1:{
				groupSkill:true,
				audio:'yb014_yazhi',
				trigger:{
					global:['dying'],
				},
				charlotte:true,
				forced:true,
				onremove:true,
				filter:function (event,player,name){
					return event.player.hp<1&&event.reason&&event.reason.name=='damage'&&event.source==player&&(player.group=='shen'||player.group=='ye');
				},
				content:function(){
					if(player.hp<player.maxHp){
						player.loseMaxHp();
					}
					else{
						player.loseHp();
					}
				},
			},
			2:{
				groupSkill:true,
				audio:'yb014_yazhi',
				trigger:{
					source:['die'],
				},
				filter:function(event,player){
					return (player.group=='shen'||player.group=='ye');
				},
				charlotte:true,
				forced:true,
				onremove:true,
				content:function(){
					player.chooseDrawRecover(2,true);
				},
			},
		},
		ai:{
			threaten:3,//嘲讽值
		},
	},
	//-------------------------神本人（逼格满满）----------------------------//
	'yb014_shizhui':{
		audio:'ext:夜白神略/audio/character:18',
		// audio:[/*'shiki_omusubi'*/'tianren'],
		trigger:{
			global:'roundStart',
		},
		mark:true,
		direct:true,
		content:function (){
			var kkk=[];
			if(lib.character[player.name]&&lib.character[player.name][3].includes('yb014_shizhui')) kkk.add([player.name]);
			if(lib.character[player.name1]&&lib.character[player.name1][3].includes('yb014_shizhui')) kkk.add([player.name1]);
			if(lib.character[player.name2]&&lib.character[player.name2][3].includes('yb014_shizhui')) kkk.add([player.name2]);
			if(!kkk.length)kkk.add([player.name]);
			if(!kkk.length)kkk.add([player.name1]);
			'step 0'
			player.chooseTarget(lib.filter.notMe).set(
				'prompt','<span class=yellowtext>游戏开始时或一轮游戏开始时，你可以减1点体力上限，然后将一名其他角色武将牌上的技能加入到你的武将牌上。</span>'
			).set('ai',function(target){
				var player=_status.event.player;
				if(player.isHealthy()) return 0;
				if(player.hp<3&&player.getDamagedHp()<2) return 0;
				var list=[];
				if(lib.character[target.name]) list.addArray(lib.character[target.name][3]);
				if(lib.character[target.name1]) list.addArray(lib.character[target.name1][3]);
				if(lib.character[target.name2]) list.addArray(lib.character[target.name2][3]);
				list=list.filter(function(i){
					return !player.hasSkill(i);
				});
				if(!list.length) return 0;
				return 1+Math.random();
			});
			'step 1'
			if(result.bool){
				var target=result.targets[0];
				player.logSkill('yb014_shizhui',target);
				player.loseMaxHp();
				var list=[],liat=[];
				if(lib.character[target.name]){
					list.addArray(lib.character[target.name][3]);
					liat.add(target.name);
				}
				if(lib.character[target.name1]){
					list.addArray(lib.character[target.name1][3]);
					liat.add(target.name1);
				}
				if(lib.character[target.name2]){
					list.addArray(lib.character[target.name2][3]);
					liat.add(target.name2);
				}
				if(!player.storage.yb014_shizhui_character)player.storage.yb014_shizhui_character=[];
				player.storage.yb014_shizhui_character.addArray(liat)
				for(var j=0;j<list.length;j++){
					if(!player.hasSkill(list[j])){
						player.storage.yb014_shizhui_list.push(list[j]);
						player.addSkill(list[j]);
					}
				}
				game.broadcastAll(function(list){
					lib.character[kkk[0]][3].addArray(list);
					game.expandSkills(list);
					for(var i of list){
						var info=lib.skill[i];
						if(!info) continue;
						if(!info.audioname2) info.audioname2={};
						if(!info.audioname2[kkk[0]])info.audioname2[kkk[0]]='yb014_shizhui';
					}
				},list);
			}
		},
		init:function(player){
			player.storage.yb014_shizhui_list=[];
			player.storage.yb014_shizhui_delete=true;
			player.storage.yb014_shizhui_character=[];
		},
		group:[
			'yb014_shizhui_delete','yb014_shizhui_ent'
			//,'yb014_shizhui_reset'
		],
		subSkill:{
			delete:{
				audio:'yb014_shizhui',
				enable:'phaseUse',
				filter:function(event,player){
					//return player.storage.yb014_shizhui_reset!=true;
					return true;
				},
				// ai:{
				// 	order:3,
				// 	result:{//主动技的收益
				// 		player:function(player,target){
				// 			if(player.countCards('h')<4) return 4-player.countCards('h');
				// 			return 2-player.hp;
				// 		},
				// 	},
				// },
				direct:true,
				// check:function(event,player){
				// 	// var player=_status.event.player;
				// 	if(player.hp<2)return true;
				// 	if(player.countCards('h')<=1) return true;
				// 	return false;
				// },
				zhuanhuanSkill:true,
				content:function(){
					'step 0'
					var list=player.storage.yb014_shizhui_list;
					var num=8;
					var str='<span class=yellowtext>出牌阶段，你可以删除一个以此法获得的技能，然后摸三张牌，并</span>'
					if(player.storage.yb014_shizhui_delete==true){str+='<span class=yellowtext>回复1点体力。</span>';}
					else{str+='<span class=yellowtext>增加1点体力上限。</span>';}
					player.YB_control(list,num,str);
					'step 1'
					if(result.control=='cancel2'){
						event.finish();
					}
					else{
						player.removeSkill(result.control);
						player.storage.yb014_shizhui_list.remove(result.control);
						player.logSkill('yb014_shizhui');
						game.log(player,'删除了',result.control);
						//player.storage.yb014_shizhui_reset=true;
						player.draw(3);
						event.yy=true;
					}
					'step 2'
					if(event.yy==true){
						if(player.storage.yb014_shizhui_delete==true){
							player.storage.yb014_shizhui_delete=false;
							player.recover();
						}
						else{
							player.storage.yb014_shizhui_delete=true;
							player.gainMaxHp();
						}
					}
				},
			},
			ent:{
				trigger:{
					global:['phaseBefore','gameStart'],
					player:'gameStart',
				},
				filter:function (event,player){
					return (event.name!='phase'||game.phaseNumber==0);
				},
				direct:true,
				content:()=>{player.useSkill('yb014_shizhui');},
			}
			/*reset:{
				direct:true,
				forced:true,
				trigger:{
					player:['phaseUseBefore','phaseUseAfter'],
				},
				content:function(){
					player.storage.yb014_shizhui_reset=false;
				}
			},*/
		},
		intro:{
			name:'诗追',
			// content:function(event,player,storage,name,skill){
				// var str='已学习了';
				// str+=get.translation(player.storage.yb014_shizhui_list);
				// if(player.storage.yb014_shizhui_delete==true){
					// str+='<br>本次删除技能回复1点体力';
				// }
				// else{
					// str+='<br>本次删除技能增加1点体力上限';
				// }
				// return str;
			// },
			mark:function(dialog,storage,player){
				if(player.storage.yb014_shizhui_character){
					var list=player.storage.yb014_shizhui_character;
					dialog.addText('学习过了这些角色');
					dialog.addSmall([list,'character']);
				}
				var str='已学习了';
				str+=get.translation(player.storage.yb014_shizhui_list);
				if(player.storage.yb014_shizhui_delete==true){
					str+='<br>本次删除技能回复1点体力';
				}
				else{
					str+='<br>本次删除技能增加1点体力上限';
				}
				dialog.addText(str);
			}
		},
		ai:{
			threaten:2.2,//嘲讽值
		}
	},
	//--------------------安以014
	yb014_xuyuan:{
		audio:'ext:夜白神略/audio/character:2',
		usable:3,
		chongzhiji:true,
		chongzhiList:[
			'yihuajiemu',
			'ybsl_lumingqianzhuan',
			'ybsl_qisihuisheng'
		],
		init:function(player,skill){
			player.storage[skill+'_chongzhijiList']=lib.skill[skill].chongzhiList;
		},
		// getChongzhiList:function(player,skill){
		// 	if(!player.storage[skill]||player.storage.yb014_xuyuan.length==0){
		// 		player.storage.yb014_xuyuan=[];
		// 		for(var i = 0;i<lib.skill.yb014_xuyuan.chongzhiList.length;i++){
		// 			player.storage.yb014_xuyuan.add(lib.skill.yb014_xuyuan.chongzhiList[i]);
		// 		}
		// 	} 
		// 	return player.storage.yb014_xuyuan;
		// },
		mark:true,
		intro:{ // 标记描述
			content:function(storage,player){
				var storage=get.YB_chongzhiList(player,'yb014_xuyuan');//当前列表
				if(!storage) return '无';
				var list1=player.storage['yb014_xuyuan'+'_chongzhijiList'];//刷新列表
				// var list1=get.YB_chongzhijiList(player,'yb014_xuyuan');//刷新列表
				var str='<br>';
				for(var i=0;i<list1.length;i++){
					if(storage.includes(list1[i]))str+='<span class=yellowtext>'+get.translation(list1[i])+'</span><br>';
					else str+='<span style="opacity:0.5;">'+get.translation(list1[i])+'</span><br>';
				}
				for(var i=0;i<storage.length;i++){
					if(!list1.includes(storage[i]))str+='<span class=thundertext>'+get.translation(storage[i])+'</span><br>';
				}
				return '当前列表如下：'+str;
			},
			// markcount:"Infinity"// 标记数量为无限大，即不会因为没有技能使用次数而消失
		},
		enable:'chooseToUse',
		filter:function (event,player){
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;
			var list=get.YB_chongzhiList(player,'yb014_xuyuan');
			for(var i=0;i<list.length;i++){
				if(evt({name:list[i]},player,event)) return true;
			};
			return false;
		},
		chooseButton:{
			dialog:function (event,player){
				var list=[];
				var list2=get.YB_chongzhiList(player,'yb014_xuyuan');
				for(var i=0;i<list2.length;i++){
					list.push(['<span style=\'color:#e328b7\'>许愿</span>','',list2[i]]);
				}
				return ui.create.dialog('<span style=\'color:#e328b7\'>许愿</span>',[list,'vcard']);
			},
			filter:function (button,player){
				return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
			},
			check:function (button){
				if(_status.event.getParent().type!='phase') return 1;
				var player=_status.event.player;
				return player.getUseValue({
					name:button.link[2],
					nature:button.link[3],
				});
			},
			backup:function (links,player){
				return {
					filterCard:function(card,player){
						var suit=get.suit(card);
						return true;
					},
					selectCard:[1,2],
					complexCard:true,
					position:'hs',
					audio:'yb014_xuyuan',
					popname:true,
					viewAs:{name:links[0][2],},
					precontent:function(){
						'step 0'
						player.logSkill('yb014_xuyuan');
						'step 1'
						var name=event.result.card.name;
						get.YB_chongzhiList(player,'yb014_xuyuan').remove(name);
					},
				};
			},
			prompt:function (links,player){
				return '将一手牌当作'+get.translation(links[0][2])+'使用';
			},
		},
		hiddenCard:function (player,name){
			var list=get.YB_chongzhiList(player,'yb014_xuyuan');
			return list.includes(name)&&player.countCards('hs')>=1;
		},
	},
	yb014_jumeng:{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseZhunbei',
		},
		filter:function (event,player){
			return !event.numFixed;
		},
		frequent:true,
		content:function (){
			player.YB_shelie(3,'聚梦');
		},
		ai:{
			threaten:1.2,//嘲讽值
		},
	},
	/*
	'yb014_xuyuan':'许愿',
	'yb014_xuyuan_info':'重置技，每回合限三次，你可以将一张手牌当作以下锦囊之一使用：移花接木，鹿鸣千转，起死回生。',
	'yb014_jumeng':'聚梦',
	'yb014_jumeng_info':'准备阶段，你可以展示牌堆顶三张牌，获得其中每种花色的牌各一张。',
	*/
	//-----------王海茹
	yb015_liangquan:{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		trigger:{
			global:['useCardToTargeted'],
		},
		filter(event,player){
			return event.target!=event.player&&event.targets.length==1&& player.canCompare(event.player);
		},
		logTarget: "player",
		content() {
			"step 0";
			player.chooseToCompare(trigger.player);
			"step 1";
			event.winer=[],event.loser=[];
			if (!result.tie) {
				if (result.bool) {
					event.loser.push(trigger.player);
					event.winer.push(player);
				} else {
					event.loser.push(player);
					event.winer.push(trigger.player);
				}
			}
			else{
				event.loser.push(trigger.player);
				event.loser.push(player);
			}
			'step 2'
			if(event.loser.length>0){
				for(var i of event.loser){
					trigger.getParent().targets.push(i);
				}
			}
			'step 3'
			delete result.bool;
			'step 4'
			if(event.winer.length>0){
				event.winer[0].chooseBool('是否摸两张牌令'+get.translation(trigger.card)+'无效？');
			}
			else event.finish();
			'step 5'
			if(result.bool){
				event.winer[0].draw(2);
				trigger.targets.length = 0;
				trigger.all_excluded = true;
			}
			// if (result.bool) {
			// 	trigger.getParent().excluded.add(player);
			// }
		},
	},
	yb015_bixin:{
		audio:'ext:夜白神略/audio/character:2',
		audioname2:{
			ybsl_123xuelang:'yb123_bixin',
		},
		mod: {
			cardnumber(card) {
				if (card.suit == "heart") return 13;
				if (card.suit == "spade") return 1;
			},
		},
		
		forced:true,
		group: "yb015_bixin_number",
		subSkill: {
			number: {
				audio:'yb015_bixin',
				trigger: { player: "compare", target: "compare" },
				filter(event, player) {
					if (event.player == player) {
						return !event.iwhile && ["heart",'spade'].includes(get.suit(event.card1));
					} else {
						return ["heart",'spade'].includes(get.suit(event.card2));
					}
				},
				// silent: true,
				forced:true,
				content() {
					if (player == trigger.player) {
						if(get.suit(trigger.card1)=='heart'){
							game.log(player, "拼点牌点数视为", "#yK");
							trigger.num1 = 13;
						}
						else {
							game.log(player, "拼点牌点数视为", "#yA");
							trigger.num1 = 1;
						}
					} else {
						if(get.suit(trigger.card2)=='heart'){
							game.log(player, "拼点牌点数视为", "#yK");
							trigger.num2 = 13;
						}
						else {
							game.log(player, "拼点牌点数视为", "#yA");
							trigger.num2 = 1;
						}
					}
				},
			},
		},
	},
	// yb015_liangquan:'良劝',
	// yb015_liangquan_info:'每回合限一次，当有其他角色使用牌指定另一名角色为唯一目标时，你可以与其拼点。然后败者成为此牌额外目标，胜者可以令此牌无效并摸两张牌。',
	// yb015_bixin:'比心',
	// yb015_bixin_info:'锁定技，你的红桃牌点数均视为K，你的黑桃牌点数均视为A。（包括手牌，拼点牌，判定牌）',
	//----------------新满城柒
	'yb016_shenzou':{
		audio:'ext:夜白神略/audio/character:2',
		enable:"phaseUse",
		usable:1,
		content:function(){
			'step 0'
			player.chooseToPlayBeatmap(lib.skill.yb016_shenzou.beatmaps.randomGet());
			'step 1'
			var score=Math.floor(Math.min(5,result.accuracy/17));
			event.score=score;
			game.log(player,'的演奏评级为','#y'+result.rank[0],'，获得积分点数','#y'+score,'分');
			var list2=lib.skill.yb016_juli.getInfo(player);
			var num=Math.min(list2[0],list2[1],2)
			if(score<num){
				event.finish();
				return;
			}
			'step 2'
			var list=[];
			var list2=lib.skill.yb016_juli.getInfo(player);
			if(event.score>=list2[0])list.push('增加最大重铸数['+list2[0]+']');
			if(event.score>=list2[1])list.push('增加技能囊括范围['+list2[1]+']');//暂时的限制方法为禁止加点这项
			if(event.score>=5&&!player.storage.yb016_juli_add)list.push('将【杀】改为伤害牌');
			if(event.score>=2)list.push('全部摸牌');
			event.list4=list;
			if(list.length){
				var str='神奏：还剩'+event.score+'分，';
				for(var i=0;i<list.length;i++){
					str+=list[i];
					if(i<list.length-1)str+='，还是'
				}
				player.chooseControl(list).set('prompt',str);
			}
			else event._result={control:'全部摸牌'};
			'step 3'
			var score=event.score;
			var list6=lib.skill.yb016_juli.getInfo(player);
			if(result.control=='全部摸牌'){
				if(score>1) player.draw(Math.floor(score/2));
				event.finish();
			}
			else if(result.control=='将【杀】改为伤害牌'){
				// if(score>1) player.draw(Math.floor(score/2));
				player.storage.yb016_juli_add=true;
				event.finish();
			}
			else {
				if(result.control=='增加最大重铸数['+list6[0]+']'){
					event.score-=list6[0];
					player.storage.yb016_juli[0]++;
					if(event.score>0){
						event.goto(2);
					}
					else event.finish();
				}else if(result.control=='增加技能囊括范围['+list6[1]+']'){
					event.score-=list6[1];
					player.storage.yb016_juli[1]++;
					if(event.score>0){
						event.goto(2);
					}
					else event.finish();
				}
			}
		},
		ai:{
			order:10,
			result:{
				player:1,
			},
		},
		beatmaps:[
			{
				//歌曲名称
				name:'鳥の詩',
				//歌曲文件名（默认在audio/effect文件夹下 若要重定向到扩展 请写为'ext:扩展名称'的格式 并将文件名重命名为和上面的歌曲名称相同）
				filename:'tori_no_uta',
				//每个音符的开始时间点（毫秒，相对未偏移的开始播放时间）
				timeleap:[1047,3012,4978,5469,5961,6452,6698,7435,8909,10875,12840],
				//开始播放时间的偏移量（毫秒）
				current:-110,
				//判定栏高度（相对整个对话框高度比例）
				judgebar_height:0.16,
				//Good/Great/Prefect的位置判定范围（百分比，相对于整个对话框。以滑条的底部作为判定基准）
				range1:[84,110],
				range2:[90,104],
				range3:[94,100],
				//滑条每相对于整个对话框下落1%所需的时间（毫秒）
				speed:25,
			},
			{
				name:'竹取飛翔　～ Lunatic Princess',
				filename:'taketori_hishou',
				timeleap:[1021,1490,1959,2896,3834,4537,4771,5709,6646,7585,8039,8494,9403,10291,11180,11832,12049,12920,13345,13771,14196],
				current:-110,
				judgebar_height:0.16,
				range1:[84,110],
				range2:[90,104],
				range3:[94,100],
				speed:25,
				node_color:'linear-gradient(rgba(250, 170, 190, 1), rgba(240, 160, 180, 1))',
				judgebar_color:'linear-gradient(rgba(240, 120, 243, 1), rgba(245, 106, 230, 1))',
			},
			{
				name:'ignotus',
				filename:'ignotus',
				//Number of tracks
				//轨道数量
				number_of_tracks:4,
				//Customize the track to generate for every note (0 is the first track)
				//自定义每个音符生成的轨道（0是第一个轨道）
				mapping:[0,2,3,1,1,0,3,0,0,3,0,0,2,1,2],
				//Convert from beats (0 is the first beat) to timeleap
				//将节拍（0是第一拍）转换为开始时间点
				timeleap:game.generateBeatmapTimeleap(170,[0,4,8,12,14,16,16.5,23.5,24,31,32,40,45,46,47]),
				current:-110,
				judgebar_height:0.16,
				range1:[84,110],
				range2:[90,104],
				range3:[94,100],
				speed:25,
				node_color:'linear-gradient(rgba(240, 250, 240, 1), rgba(230, 240, 230, 1))',
				judgebar_color:'linear-gradient(rgba(161, 59, 150, 1), rgba(58, 43, 74, 1))',
			},
			{
				name:'Super Mario 3D World Theme',
				filename:'sm3dw_overworld',
				//Random (Randomly choose tracks to generate notes each play)
				//随机（每次演奏时音符会随机选择轨道生成）
				mapping:'random',
				timeleap:[0,1071,1518,2054,4018,4286,5357,6429,7500,8571,9643,10714,11786,12321,12589,12857,13929,15000,16071,17143,18214,18482,18750,19018,19286,20357],
				current:-110,
				judgebar_height:0.16,
				range1:[84,110],
				range2:[90,104],
				range3:[94,100],
				speed:25,
				node_color:'linear-gradient(rgba(120, 130, 240, 1), rgba(100, 100, 230, 1))',
				judgebar_color:'linear-gradient(rgba(230, 40, 30, 1), rgba(220, 30, 10, 1))',
			},
			{
				name:'只因你太美',
				filename:'chicken_you_are_so_beautiful',
				number_of_tracks:7,
				mapping:[3,6,4,5,6,2,3,2,1,2,0,4,3,6,5,4,3,6,3,2,3,1,0,1,2,3,4,5,6],
				timeleap:game.generateBeatmapTimeleap(107,[2,3.5,4.5,5.5,6.5,8.5,10,11.5,12.5,13.5,14.5,15.5,18,19.5,20.5,21.5,22.5,24.5,26,27.5,28.5,29.5,30.5,31,31.5,32,32.5,33,33.5]),
				//Hitsound file name (By default in the audio/effect folder. To redirect to the extension, please write in the format of 'ext:extension_name')
				//打击音文件名（默认在audio/effect文件夹下 若要重定向到扩展 请写为'ext:扩展名称'的格式）
				hitsound:'chickun.wav',
				current:-110,
				judgebar_height:0.16,
				range1:[84,110],
				range2:[90,104],
				range3:[94,100],
				speed:25,
				node_color:'linear-gradient(#99f, #66c)',
				judgebar_color:'linear-gradient(#ccf, #99c)',
			},
			{
				name:'Croatian Rhapsody',
				filename:'croatian_rhapsody',
				mapping:[4,1,2,1,0,0,4,5,1,3,2,1,0,0],
				timeleap:game.generateBeatmapTimeleap(96,[4,6,8,9,10,11,12,13.5,14,15.5,16,17,18,19]),
				current:-110,
				judgebar_height:0.16,
				range1:[84,110],
				range2:[90,104],
				range3:[94,100],
				speed:25,
				node_color:'linear-gradient(#fff, #ccc)',
				judgebar_color:'linear-gradient(#fff, #ccc)',
			},
			{
				name:'罗刹海市',
				filename:'rakshasa_sea_city',
				number_of_tracks:7,
				mapping:'random',
				timeleap:game.generateBeatmapTimeleap(150,[0,2,4,6,7,9,11,13,14,16,18,20,21,23,25,27]),
				current:-110,
				judgebar_height:0.16,
				range1:[84,110],
				range2:[90,104],
				range3:[94,100],
				speed:25,
				node_color:'linear-gradient(#333, #000)',
				judgebar_color:'linear-gradient(#c66, #933)',
			},
			{
				name:'Pigstep (Stereo Mix)',
				filename:'pigstep',
				number_of_tracks:16,
				timeleap:game.generateBeatmapTimeleap(170,[3,4,6,6.5,7.5,11,12,14,14.5,15.5,19,20,22,22.5,23.5,27,28,30,30.5,31.5,35,36,38,38.5,39.5,43,44,46,46.5,47.5,51,52,54,54.5,55.5,59,60,62,62.5]),
				current:-110,
				judgebar_height:0.16,
				range1:[84,110],
				range2:[90,104],
				range3:[94,100],
				speed:25,
				node_color:'linear-gradient(#066, #033)',
				judgebar_color:'linear-gradient(#633, #300)',
			},
		],
		derivation:"yb016_shenzou_faq",
	},
	'yb016_juli':{
		audio:'ext:夜白神略/audio/character:2',
		audioname2:{
			'ybsl_012zhengjiayi':'yb012_juli',
		},
		init:function(player){
			if(!player.storage.yb016_juli) player.storage.yb016_juli=[1,1,1];
		},
		getInfo:function(player){
			if(!player.storage.yb016_juli) player.storage.yb016_juli=[1,1,1];
			return player.storage.yb016_juli;
		},
		direct:true,
		trigger:{
			global:'useCardToTargeted',
		},
		filter:function(event,player){
			if(event.player==event.target)return false;
			var list=lib.skill.yb016_juli.getInfo(player);
			// if(event.player.hasMark('yb033_shuhui_mark')) return true;
			if(!event.player.isIn()||get.distance(player,event.target)>list[1])return false;
			if(player.storage.yb016_juli_add==true){
				return get.tag(event.card,'damage');
			}
			else return event.card.name=='sha';
		},
		content:function(){
			'step 0'
			event.list=lib.skill.yb016_juli.getInfo(player);
			if(trigger.target==player){
				event._result={bool:true};
			}
			else{
				player.chooseBool('是否令'+get.translation(trigger.target)+'选择是否重铸牌，以此令'+get.translation(trigger.card)+'有几率对其无效？').set('ai',function(){
					var att=get.attitude(_status.event.player,trigger.target);
					var bool=_status.event.bool;
					if(att>0) return bool;
					else return !bool;
				});
			}
			'step 1'
			if(result.bool){
				trigger.target.chooseCard('he',[1,event.list[0]]).set('prompt',get.prompt2('yb016_juli')).set('ai',function(card){
					return 6-get.value(card);
				});
			}
			else event.finish();
			'step 2'
			if(result.cards){
				event.cards=result.cards;
				trigger.target.recast(event.cards);
			}
			else event.finish();
			'step 3'
			event.list2=[];
			for(var i of event.cards){
				var type=get.type2(i);
				if(!event.list2.includes(type)) event.list2.push(type);
			}
			var eff=get.effect(player,trigger.card,trigger.player,trigger.player);
			var list3=get.YB_tobo(event.list2);
			trigger.player.chooseToDiscard(event.list[2],'he',function(card){
				return event.list2.includes(get.type2(card));
			}).set('prompt','请弃置'+event.list[2]+'张牌，且牌的类型必须在【'+list3+'】之中。').set('ai',function(card){
				if(_status.event.eff>0){
					return 10-get.value(card);
				}
				return 0;
			}).set('eff',eff);
			'step 4'
			if(!result.cards){
				trigger.getParent().excluded.add(trigger.target);
			}
		}
	},
	//----------------------SP满城柒
	yb016_shanbiao:{
		audio:'ext:夜白神略/audio/character:2',
		init:function(player,skill){
			player.storage.yb016_shanbiao=false;
		},
		zhuanhuanji:true,
		mark:true,
		marktext:'☯',
		intro:{
			content:function(storage,player,skill){
				if (!player.storage.yb016_shanbiao){
					return '锁定技，转换技，回合结束时或当你武将牌翻面时，阳：<span class="bluetext">你摸两张牌</span>；阴，你受到当前回合角色造成的1点伤害。<br><span class="bluetext">你阳状态下，受到的伤害-1</span>；<br>你阴状态下，造成的伤害-1。';
				}
				return '锁定技，转换技，回合结束时或当你武将牌翻面时，阳：你摸两张牌；阴，<span class="bluetext">你受到当前回合角色造成的1点伤害</span>。<br>你阳状态下，受到的伤害-1；<br><span class="bluetext">你阴状态下，造成的伤害-1</span>。';
			},
		},
		group:['yb016_shanbiao_damage'],
		subSkill:{
			damage:{
				forced:true,
				trigger:{
					player:'damageBegin4',
					source:'damageBegin2',
				},
				filter(event,player,name){
					if(name=='damageBegin4')return player.storage.yb016_shanbiao;
					return !player.storage.yb016_shanbiao;
				},
				content(){
					trigger.num--;
				},
			},
			yang:{},
			ying:{},
		},
		forced:true,
		trigger:{
			player:['phaseEnd','turnOverEnd'],
		},
		filter(){return true},
		content(){
			if(player.storage.yb016_shanbiao==true){
				player.draw(2);
				player.changeZhuanhuanji('yb016_shanbiao');
			}
			else {
				player.damage(_status.currentPhase||'nosource');
				player.changeZhuanhuanji('yb016_shanbiao');
			}
		}
	},
	yb016_jiushi:{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'jiushi',
	},
	//----------------------废案
	'yb016_xianyue':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'recoverAfter',
		},
		direct:true,
		preHidden:true,
		check:function (player,cards){
			if(player.countCards('he')>2) return true;
		},
		content:function (){
			'step 0'
			player.chooseToDiscard('he',get.prompt2('yb016_xianyue',trigger.player)).set('ai',function(card){
				return 8-get.value(card);
			});
			'step 1'
			if(result.bool){
				player.judge();
			}
			else{
				event.finish();
			}
			'step 2'
			event.suit=result.suit;
			if(event.suit=='heart'){
				player.recover()
			};
			if(event.suit=='diamond'){
				player.draw(2)
			};
			if(event.suit=='spade'){
				player.chooseTarget(get.prompt('yb016_xianyue'),'令一名角色失去1点体力').set('ai',function(target){
					var player=_status.event.player;
					var att=get.attitude(player,target);
					if(att<0){
						att=-Math.sqrt(-att);
					}
					else{
						att=Math.sqrt(att);
					}
					return att*lib.card.guohe.ai.result.target(player,target);
				})
			};
			if(event.suit=='club'){
				player.chooseTarget('弃置一名角色两张牌',function(card,player,target){
					return target.countCards('he');
				}).set('ai',function(target){
					var player=_status.event.player;
					var att=get.attitude(player,target);
					if(att<0){
						att=-Math.sqrt(-att);
					}
					else{
						att=Math.sqrt(att);
					}
					return att*lib.card.guohe.ai.result.target(player,target);
				})
			};
			'step 3'
			if(result.bool){
				var target=result.targets[0];
				player.line(target,'green');
				if(event.suit=='spade'){
					player.logSkill('yb016_xianyue',target);
					target.loseHp();
				}
				if(event.suit=='club'){
					player.discardPlayerCard(target,'he',2,true);
				};
			}
		},
		ai:{
			result:{
				player:2,
			},
		},
	},
	'yb016_tianliao':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'recoverBefore',
		},
		direct:true,
		preHidden:true,
		check:function (event,player,cards){
			var ys=player.maxHp-player.hp;
			if(event.num==ys-1)return false;
			if(player.countCards('he')>2) return true;
		},
		content:function (){
			'step 0'
			player.chooseToDiscard('he',get.prompt2('yb016_tianliao',trigger.player)).set('ai',function(card){
				return 8-get.value(card);
			});
			'step 1'
			if(result.bool){
				trigger.num++;
				player.logSkill('yb016_tianliao')
			}
			else{
				event.finish();
			}
		},
		ai:{
			result:{
				player:3,
			},
			effect:{
				player:function (card,player,target){//你使用牌时对你的影响
					if(card.name=='tao'){//如果使用的牌是桃
						return 1.3;//影响比一般人大点
					}
				},
				target:function (card,player,target){//你成为牌的目标时对你的影响
					if(get.tag(card,'damage')){//如果牌能造成伤害
						if(player.hasSkillTag('jueqing',false,target))return [1,-1];
						return 0.7;//影响比一般人大点
					}
				},
			},
		},
	},
	'yb016_qingjie':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'damageEnd',
		},
		forced:true,
		content:function (){
			'step 0'
			event.num=trigger.num;
			player.recover(event.num);
			'step 1'
			player.loseHp(event.num);
		},
		ai:{
			maixie:true,
			'maixie_hp':true,
		},
	},
	'yb016_pojie':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'recoverBegin',
		},
		forced:true,
		filter:function (event,player){
			event.ys=player.maxHp-player.hp;
			event.zl=event.num;
			if(event.ys<event.zl)
				return event.yc=event.zl-event.ys;
		},
		content:function (){
			'step 0'
			trigger.num-=trigger.yc;
			'step 1'
			player.gainMaxHp(trigger.yc);
			player.draw(trigger.yc);
		},
	},
	//--------------新涂山小红
	'yb017_chuanxin':{
		audio:'ext:夜白神略/audio/character:1',
		trigger:{
			global:"phaseJieshuBegin",
		},
		forced:true,
		filter:function(event,player){
			return event.player.getHistory('useCard',function(card){
				// return get.type(card.card)!='equip'&&get.type(card.card)!='delay';
				return true;
			}).length>0;
		},
		content:function(){
			'step 0'
			var list=[];
			var list1=[];
			trigger.player.getHistory('useCard',function(evt){
				if(get.type(evt.card)=='equip'||get.type(evt.card)=='delay') return;
				var name=evt.card.name;
				var nature=evt.card.nature;
				var name2;
				if(name=='sha'){
					if(nature){
						switch(nature){
							case 'fire':name2='huosha';break;
							case 'thunder':name2='leisha';break;
							case 'kami':name2='kamisha';break;
							case 'ice':name2='icesha';break;
							case 'stab':name2='cisha';break;
							default :name2=(nature+'sha');break;
						}
					}
				}
				var name3=(name2||name);
				if(!list1.includes(name3)){
					list.add(['传信','',name,nature]);
					list1.add(name3);
				}
			});
			player.chooseButton(['传信：选择要使用的牌，或点取消摸一张牌<br>此操作不可逆，如果选择了卡牌但没有选择使用的话，不会回退到这一步，而是直接摸一张牌。',[list,'vcard']],function(button){
				return _status.event.player.getUseValue({name:button.link[2],nature:button.link[3]});
			},function(button){
				return _status.event.player.hasUseTarget({name:button.link[2],nature:button.link[3]});
			});
			// trigger.player.getHistory('useCard',function(evt){
			// 	if(get.type(evt.card)=='equip'||get.type(evt.card)=='delay') return;
			// 	var name=evt.card.name;
			// 	if(name=='sha'){
			// 		var nature=evt.card.nature;
			// 		switch(nature){
			// 			case 'fire':name='huosha';break;
			// 			case 'thunder':name='leisha';break;
			// 			case 'kami':name='kamisha';break;
			// 			case 'ice':name='icesha';break;
			// 			case 'stab':name='cisha';break;
			// 			case 'YB_snow':name='YB_snowsha';break;
			// 			case 'YB_blood':name='YB_bloodsha';break;
			// 		}
			// 	}
			// 	list.add(name);
			// });
			// player.chooseButton(['传信：选择要使用的牌，或点取消摸一张牌',[list.map(function(name){
			// 	return ['传信','',name];
			// }),'vcard']],function(button){
			// 	return _status.event.player.getUseValue({name:button.link[2],nature:button.link[3]});
			// },function(button){
			// 	return _status.event.player.hasUseTarget({name:button.link[2],nature:button.link[3]});
			// });
			'step 1'
			if(!result.bool) {
				player.draw();
				event.finish();
			}
			else {
				event._result=player.chooseUseTarget({name:result.links[0][2],isCard:true,nature:result.links[0][3]},false);
			}
			'step 2'
			if(!result.bool){
				player.draw();
				event.finish();
			}
		},
	},
	'yb017_chuanxinx':{
		audio:'yb017_chuanxin',
		trigger:{
			global:"phaseJieshuBegin",
		},
		forced:true,
		filter:function(event,player){
			return event.player.getHistory('useCard',function(card){
				// return get.type(card.card)!='equip'&&get.type(card.card)!='delay';
				return get.color(card.card)!='none';
			}).length>0;
		},
		content:function(){
			'step 0'
			event.color = [];
			trigger.player.getHistory('useCard',function(card){
				// return get.type(card.card)!='equip'&&get.type(card.card)!='delay';
				// return get.color(card.card)!='none';
				if(get.color(card.card)!='none'){
					event.color.add(get.color(card.card));
				}
			})
			event.count = 0;
			'step 1'
			event.count++;
			var list=[];
			var list1=[];
			trigger.player.getHistory('useCard',function(evt){
				if(get.type(evt.card)=='equip'||get.type(evt.card)=='delay') return;
				var name=evt.card.name;
				var nature=evt.card.nature;
				var name2;
				if(name=='sha'){
					if(nature){
						switch(nature){
							case 'fire':name2='huosha';break;
							case 'thunder':name2='leisha';break;
							case 'kami':name2='kamisha';break;
							case 'ice':name2='icesha';break;
							case 'stab':name2='cisha';break;
							default :name2=(nature+'sha');break;
						}
					}
				}
				var name3=(name2||name);
				if(!list1.includes(name3)){
					list.add(['传信','',name,nature]);
					list1.add(name3);
				}
			});
			player.chooseButton(['传信：选择要使用的牌，或点取消摸一张牌'+event.count+'/'+event.color.length+'<br>此操作不可逆，如果选择了卡牌但没有选择使用的话，不会回退到这一步，而是直接摸一张牌。',[list,'vcard']],function(button){
				return _status.event.player.getUseValue({name:button.link[2],nature:button.link[3]});
			},function(button){
				return _status.event.player.hasUseTarget({name:button.link[2],nature:button.link[3]});
			});
			// trigger.player.getHistory('useCard',function(evt){
			// 	if(get.type(evt.card)=='equip'||get.type(evt.card)=='delay') return;
			// 	var name=evt.card.name;
			// 	if(name=='sha'){
			// 		var nature=evt.card.nature;
			// 		switch(nature){
			// 			case 'fire':name='huosha';break;
			// 			case 'thunder':name='leisha';break;
			// 			case 'kami':name='kamisha';break;
			// 			case 'ice':name='icesha';break;
			// 			case 'stab':name='cisha';break;
			// 			case 'YB_snow':name='YB_snowsha';break;
			// 			case 'YB_blood':name='YB_bloodsha';break;
			// 		}
			// 	}
			// 	list.add(name);
			// });
			// player.chooseButton(['传信：选择要使用的牌，或点取消摸一张牌',[list.map(function(name){
			// 	return ['传信','',name];
			// }),'vcard']],function(button){
			// 	return _status.event.player.getUseValue({name:button.link[2],nature:button.link[3]});
			// },function(button){
			// 	return _status.event.player.hasUseTarget({name:button.link[2],nature:button.link[3]});
			// });
			'step 2'
			if(!result.bool) {
				player.draw();
				// event.finish();
				event.goto(4);
			}
			else {
				event._result=player.chooseUseTarget({name:result.links[0][2],isCard:true,nature:result.links[0][3]},false);
			}
			'step 3'
			if(!result.bool){
				player.draw();
				// event.finish();
			}
			'step 4'
			if(event.count<event.color.length){
				player.logSkill('yb017_chuanxinx');
				event.goto(1);
			}
		},
	},
	'yb017_chuanxiny':{
		audio:'yb017_chuanxin',
		trigger:{
			global:"phaseJieshuBegin",
		},
		forced:true,
		filter:function(event,player){
			return event.player.getHistory('useCard',function(card){
				// return get.type(card.card)!='equip'&&get.type(card.card)!='delay';
				return true;
			}).length>0;
		},
		content:function(){
			'step 0'
			event.color = [];
			trigger.player.getHistory('useCard',function(card){
				// return get.type(card.card)!='equip'&&get.type(card.card)!='delay';
				// return get.color(card.card)!='none';
				// if(get.color(card.card)!='none'){
					event.color.add(get.color(card.card));
				// }
			})
			event.count = 0;
			'step 1'
			event.count++;
			var list=[];
			var list1=[];
			trigger.player.getHistory('useCard',function(evt){
				if(get.type(evt.card)=='equip'||get.type(evt.card)=='delay') return;
				var name=evt.card.name;
				var nature=evt.card.nature;
				var name2;
				if(name=='sha'){
					if(nature){
						switch(nature){
							case 'fire':name2='huosha';break;
							case 'thunder':name2='leisha';break;
							case 'kami':name2='kamisha';break;
							case 'ice':name2='icesha';break;
							case 'stab':name2='cisha';break;
							default :name2=(nature+'sha');break;
						}
					}
				}
				var name3=(name2||name);
				if(!list1.includes(name3)){
					list.add(['传信','',name,nature]);
					list1.add(name3);
				}
			});
			player.chooseButton(['传信：选择要使用的牌，或点取消摸一张牌'+event.count+'/'+event.color.length+'<br>此操作不可逆，如果选择了卡牌但没有选择使用的话，不会回退到这一步，而是直接摸一张牌。',[list,'vcard']],function(button){
				return _status.event.player.getUseValue({name:button.link[2],nature:button.link[3]});
			},function(button){
				return _status.event.player.hasUseTarget({name:button.link[2],nature:button.link[3]});
			});
			// trigger.player.getHistory('useCard',function(evt){
			// 	if(get.type(evt.card)=='equip'||get.type(evt.card)=='delay') return;
			// 	var name=evt.card.name;
			// 	if(name=='sha'){
			// 		var nature=evt.card.nature;
			// 		switch(nature){
			// 			case 'fire':name='huosha';break;
			// 			case 'thunder':name='leisha';break;
			// 			case 'kami':name='kamisha';break;
			// 			case 'ice':name='icesha';break;
			// 			case 'stab':name='cisha';break;
			// 			case 'YB_snow':name='YB_snowsha';break;
			// 			case 'YB_blood':name='YB_bloodsha';break;
			// 		}
			// 	}
			// 	list.add(name);
			// });
			// player.chooseButton(['传信：选择要使用的牌，或点取消摸一张牌',[list.map(function(name){
			// 	return ['传信','',name];
			// }),'vcard']],function(button){
			// 	return _status.event.player.getUseValue({name:button.link[2],nature:button.link[3]});
			// },function(button){
			// 	return _status.event.player.hasUseTarget({name:button.link[2],nature:button.link[3]});
			// });
			'step 2'
			if(!result.bool) {
				player.draw();
				// event.finish();
				event.goto(4);
			}
			else {
				event._result=player.chooseUseTarget({name:result.links[0][2],isCard:true,nature:result.links[0][3]},false);
			}
			'step 3'
			if(!result.bool){
				player.draw();
				// event.finish();
			}
			'step 4'
			if(event.count<event.color.length){
				player.logSkill('yb017_chuanxiny');
				event.goto(1);
			}
		},
	},
	'yb017_zuigui':{
		audio:'ext:夜白神略/audio/character:1',
		forced:true,
		trigger:{
			player:'phaseDiscardBegin',
		},
		content:function(){
			player.chooseUseTarget({name:'jiu',isCard:true},true,false);
		},
		mod: {
			cardUsable(card, player, num) {
				if (card.name == "jiu") {
					return Infinity;
				}
			},
		},
		group:['yb017_zuigui_jiu','yb017_zuigui_jiu2','yb017_zuigui_jiu3'],
		subSkill:{
			jiu:{
				audio:'yb017_zuigui',
				trigger:{player:'jiuBegin'},
				forced:true,
				filter:function(event,player){
					return event.getParent().name=='useCard';
				},
				content:function(){
					trigger.setContent(lib.skill.yb017_zuigui_jiu.jiuContent);
				},
				jiuContent:function(){
					if(typeof event.baseDamage!='number') event.baseDamage=1;
					// if(target.isDamaged()){
						target.recover(event.baseDamage);
						// if(_status.currentPhase==target){
							// target.getStat().card.jiu--;
						// }
					// }
					game.addVideo('jiuNode',target,true);
					if(cards&&cards.length){
						card=cards[0];
					}
					if(!target.storage.jiu) target.storage.jiu=0;
					target.storage.jiu+=event.baseDamage;
					game.broadcastAll(function(target,card,gain2){
						target.addSkill('jiu');
						if(!target.node.jiu&&lib.config.jiu_effect){
							target.node.jiu=ui.create.div('.playerjiu',target.node.avatar);
							target.node.jiu2=ui.create.div('.playerjiu',target.node.avatar2);
						}
						if(gain2&&card.clone&&(card.clone.parentNode==target.parentNode||card.clone.parentNode==ui.arena)){
							card.clone.moveDelete(target);
						}
					},target,card,target==targets[0]&&cards.length==1);
					if(target==targets[0]&&cards.length==1){
						if(card.clone&&(card.clone.parentNode==target.parentNode||card.clone.parentNode==ui.arena)){
							game.addVideo('gain2',target,get.cardsInfo([card]));
						}
					}
				},
			},
			jiu3:{
				audio:'yb017_zuigui',
				trigger:{player:'useCard1'},
				filter:function(event,player){
					if(!player.hasSkill('jiu'))return false;
					return event.card&&event.card.name!='sha'&&get.tag(event.card,'damage')>0;
				},
				forced:true,
				charlotte:true,
				firstDo:true,
				content:function(){
					if(!trigger.baseDamage) trigger.baseDamage=1;
					trigger.baseDamage+=player.storage.jiu;
					trigger.jiu=true;
					trigger.jiu_add=player.storage.jiu;
					game.addVideo('jiuNode',player,false);
					game.broadcastAll(function(player){
						player.removeSkill('jiu');
					},player);
				},
				temp:true,
				vanish:true,
				silent:true,
				popup:false,
				nopop:true,
				onremove:function(player){
					if(player.node.jiu){
						player.node.jiu.delete();
						player.node.jiu2.delete();
						delete player.node.jiu;
						delete player.node.jiu2;
					}
					delete player.storage.jiu;
				},
				ai:{
					damageBonus:true
				},
			},
			jiu2:{
				trigger:{player:'useCardAfter',global:'phaseAfter'},
				priority:2,
				firstDo:true,
				charlotte:true,
				filter:function(event,player){
					if(!player.hasSkill('jiu'))return false;
					if(player.hasSkillTag('jiuSustain',null,event.name)) return false;
					if(event.name=='useCard') return (event.card&&event.card.name!='sha'&&(get.tag(event.card,'damage')>0));
					return true;
				},
				forced:true,
				popup:false,
				audio:false,
				content:function(){
					game.broadcastAll(function(player){
						player.removeSkill('jiu');
					},player);
					game.addVideo('jiuNode',player,false);
				},
			},
		}
	},
	//-----------------神涂山小红
	'yb017_mizhu':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'phaseBefore',
			player:'enterGame',
		},
		forced:true,
		locked:false,
		filter:function (event,player){
			return (event.name!='phase'||game.phaseNumber==0)&&!lib.inpile.includes('ybsl_lumingqianzhuan');
		},
		content:function (){
			game.addGlobalSkill('yb017_mizhu_global');
			for(var i=2;i<10;i++){
				var card=game.createCard2('ybsl_lumingqianzhuan',i%2?'club':'spade',i);
				ui.cardPile.insertBefore(card,ui.cardPile.childNodes[get.rand(0,ui.cardPile.childNodes.length)]);
			}
			game.broadcastAll(function(){lib.inpile.add('ybsl_lumingqianzhuan')});
			game.updateRoundNumber();
		},
		group:['yb017_mizhu_remove','yb017_mizhu_rewrite'],
		derivation:'ybsl_lumingqianzhuan',
		subSkill:{
			remove:{
				audio:'yb017_mizhu',
				trigger:{
					target:'useCardToBefore',
				},
				forced:true,
				priority:15,
				filter:function (event,player){
					return event.card&&event.card.name=='ybsl_lumingqianzhuan';
				},
				content:function (){
					trigger.cancel();
				},
				ai:{
					target:function (card,player,target){
						if(card&&card.name=='ybsl_lumingqianzhuan') return 'zerotarget';
					},
				},
				sub:true,
			},
			global:{
				trigger:{
					player:'useCardToPlayered',
				},
				forced:true,
				popup:false,
				filter:function (event,player){
					return event.card.name=='ybsl_lumingqianzhuan';
				},
				content:function (){
					'step 0'
					var target=trigger.target;
					event.target=target;
					player.chooseControl('喜啼','悲鸣').set('prompt','请选择'+get.translation(target)+'的标记').set('choice',function(){
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
					'step 1'
					var map=trigger.getParent().customArgs,id=target.playerid;
					if(!map[id]) map[id]={};
					map[id].ybsl_luming_name=result.control;
				},
				sub:true,
			},
			rewrite:{
				audio:'yb017_mizhu',
				trigger:{
					global:'useCardToTargeted',
				},
				filter:function (event,player){
					return event.card.name=='ybsl_lumingqianzhuan';
				},
				logTarget:'target',
				'prompt2':'观看其手牌并修改“鹿鸣千转”标记',
				content:function (){
					'step 0'
					var target=trigger.target;
					event.target=target;
					if(player!=target&&target.countCards('h')>0) player.viewHandcards(target);
					player.chooseControl('喜啼','悲鸣').set('prompt','请选择'+get.translation(target)+'的标记').set('choice',function(){
						var shas=target.getCards('h','sha'),shans=target.getCards('h','shan');
						var e1=1.5*get.sgn(get.damageEffect(target,player,target));
						var e2=0;
						if(target.countGainableCards(player,'h')>0&&!target.hasSkillTag('noh')) e2=-1;
						var es=target.getGainableCards(player,'e');
						if(es.length) e2=Math.min(e2,function(){
							var max=0;
							for(var i of es) max=Math.max(max,get.value(i,target))
							return -max/4;
						}());
						if(get.attitude(player,target)>0){
							if(shas.length>=Math.max(1,shans.length)) return '喜啼';
							if(shans.length>shas.length) return '悲鸣';
							return e1>e2?'喜啼':'悲鸣';
						}
						if(shas.length) e1=-0.5;
						if(shans.length) e2=-0.7;
						if(Math.abs(e1-e2)<=0.3) return Math.random()<0.5?'喜啼':'悲鸣';
						var rand=Math.random();
						if(e1<e2) return rand<0.1?'喜啼':'悲鸣';
						return rand<0.1?'悲鸣':'喜啼';
					}()).set('ai',()=>(_status.event.choice));
					'step 1'
					var map=trigger.getParent().customArgs,id=target.playerid;
					if(!map[id]) map[id]={};
					map[id].ybsl_luming_name=result.control;
					map[id].ybsl_luming_aibuff=get.attitude(player,target)>0;
				},
				sub:true,
				'audioname2':{
					
				},
			},
		},
	},
	'yb017_guangzhu':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'useCard',
		},
		forced:true,
		filter:function (event,player){		
			return (event.card.name=='ybsl_lumingqianzhuan'||get.zhinangs().includes(event.card.name)||player.getStorage('yb017_zhenshi').includes(event.card.name))&&event.card.isCard&&event.cards.length==1;
		},
		content:function (){player.draw()},
	},
	'yb017_zhenshi':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			target:'useCardToTarget',
		},
		forced:true,
		filter:function (event,player){
			return get.type2(event.card)=='trick'&&!player.getStorage('yb017_zhenshi').includes(event.card.name);
		},
		content:function (){
			player.markAuto('yb017_zhenshi',[trigger.card.name]);
			trigger.targets.remove(player);
			trigger.getParent().triggeredTargets2.remove(player);
			trigger.untrigger();
		},
		onremove:true,
		intro:{
			content:'已记录牌名：$',
		},
		group:'yb017_zhenshi_add',
		subSkill:{
			add:{
				trigger:{
					player:'phaseBegin',
				},
				direct:true,
				content:function (){
					'step 0'
					var dialog=
					[get.prompt('yb017_zhenshi')];list1=player.getStorage('yb017_zhenshi'),list2=lib.inpile.filter(function(i){
						return get.type2(i,false)=='trick'&&!list1.includes(i);
					});
					if(list1.length){
						dialog.push('<div class="text center">已记录</div>');
						dialog.push([list1,'vcard']);
					}
					if(list2.length){
						dialog.push('<div class="text center">未记录</div>');
						dialog.push([list2,'vcard']);
					}
					player.chooseButton(dialog).set('ai',function(button){
						var player=_status.event.player,name=button.link[2];
						if(player.getStorage('yb017_zhenshi').includes(name)){
							return -get.effect(player,{name:name},player,player);
						}
						else{
							return get.effect(player,{name:name},player,player)*(1+player.countCards('hs',name));
						}
					});
					'step 1'
					if(result.bool){
						player.logSkill('yb017_zhenshi');
						var name=result.links[0][2];
						if(player.getStorage('yb017_zhenshi').includes(name)){
							player.unmarkAuto('yb017_zhenshi',[name]);
							game.log(player,'从贞侍记录中移除了','#y'+get.translation(name));
						}
						else{
							player.markAuto('yb017_zhenshi',[name]);
							game.log(player,'向贞侍记录中添加了','#y'+get.translation(name));
						}
						game.delayx();
					}
				},
				sub:true,
				'audioname2':{
					
				},
			},
		},
	},
	//-----------------------张晴
	'yb018_huaimeng':{
		audio:'ext:夜白神略/audio/character:2',
		marktext:'梦',
		unique:true,
		trigger:{
			global:'roundStart',
		},
		forced:true,
		content:function (){
			'step 0'
			player.chooseControl(lib.suit).set('prompt','怀梦：请选择一种花色，接下来这轮因此花色获得的梦改为三枚').set('ai',function(event){
				switch(Math.floor(Math.random()*8)){
					case 0:case 6:case 3:return 'heart';
					case 1:case 4:case 5:return 'diamond';
					case 2:return 'club';
					case 7:return 'spade';
				}
			});
			'step 1'
			player.storage.YB_memorysuit=result.control;
			player.popup(player.storage.YB_memorysuit+2);
			game.log(player,'铭记了',player.storage.YB_memorysuit+2);
		},
		init:function (player,skill){
			player.addMark('yb018_huaimeng',5);
		},
		intro:{
			name:'梦',
			content:function (storage,player){
				var str='<li>纪念着';
				str+=get.translation(player.countMark('yb018_huaimeng'));
				str+='段过往<br><li>印象最深刻的是';
				str+=get.translation(player.storage.YB_memorysuit);
				str+='<br><li>这次已梦见';
				str+=get.translation(player.storage.losesuit);
				return str;
			},
		},
		group:['yb018_huaimeng_2','yb018_huaimeng_3'],
		subSkill:{
			2:{
				direct:true,
				forced:true,
				trigger:{
					global:'phaseBefore',
				},
				content:function(){
					'step 0'
					player.storage.losesuit=[];
				},
			},
			3:{
				direct:true,
				forced:true,
				trigger:{
					player:['useCardBegin','respondBegin'],
				},
				filter:function(event,player,card){
					if (!player.storage.losesuit) player.storage.losesuit = [];//QQQ
					return !player.storage.losesuit.includes(get.suit(event.card));
				},
				content:function(){
					'step 0'
					event.suit=get.suit(trigger.card);
					if(event.suit==player.storage.YB_memorysuit){
						player.addMark('yb018_huaimeng',3);
						game.log(player,'再逢故人，觅得三载光阴。');
					}
					else {
						player.addMark('yb018_huaimeng');
						game.log(player,'重拾旧物，忆起一段过往。');
					};
					'step 1'
					player.storage.losesuit.add(event.suit);
				},
			}
		}
	},
	'yb018_minxing':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:['phaseZhunbeiBegin','phaseJieshuAfter'],
		},
		filter:function(event,player){ 
			if(player.hasSkill('yb018_minxing_buff'))return player.countMark('yb018_huaimeng')>=2;
			return true;
		},
		content:function (){
			'step 0'
			// if(player.hasSkill('yb018_minxing_add')){
				player.removeMark('yb018_huaimeng',2);
			// }
			'step 1'
			var list=[];
			if(player.hasMark('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=2) list.push('两枚');
			if(player.hasMark('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=1) list.push('一枚');
			list.push('不移除');
			player.chooseControl(list).set('choiceList',['移除两枚梦，然后摸五放五','移除一枚梦，然后摸四放四','不移除梦，然后摸三放三']).set('prompt','请选择');					
			'step 2'
			if(result.control=='两枚'){
				var nuk=2;
			}
			if(result.control=='一枚'){
				var nuk=1;
			}
			if(result.control=='不移除'){
				var nuk=0;
			};
			var nur=3+nuk;
			event.numb=nur;
			player.removeMark('yb018_huaimeng',nuk);
			player.draw(nur);
			player.chooseCard(nur,'h','请选择'+nur+'张手牌',true).set('complexCard', true).set('ai', function (card) {
				if(ui.selected.cards.length>0){
					if(get.suit(ui.selected.cards[ui.selected.cards.length-1])==get.suit(card)) return 10
				}
				else{
					return 6 - get.value(card);
				}
			})
			result.cards;
				'step 3'
			event.cards=result.cards;
			//player.chooseCardButton(event.cards,true,'按顺序将牌置于牌堆顶，先选的在上',event.cards.length);
			/*player.chooseCardButton(event.cards,true,'按顺序将牌置于牌堆顶，先选的在上',event.cards.length).set('ai', function (button) {
				var player = _status.event.player;
				if(player.countMark('yb018_huaimeng')>=2){
					var num=[]
					for(var i in suit){
						num.add(suit[i])
					}
					for(var i in suit){
						if(suit[i]==Math.max(num)){
							return get.type(button.link)==suit[i]
						}
					}
				}
				else{
					return 10 - get.value(card)
				}
			})*/
			var next = player.chooseToMove('将牌按照顺序置于牌堆顶', true);
			var list = [['待选择牌', event.cards]]
			list.push(['牌堆顶', []]);
			next.set('list', list); // 设置需要选择牌的数组
			next.set('selectButton', function (buttons) {
				// 设置选择的按钮，即只能选择一张牌
				return buttons.slice(0, 1);
			});
			next.set('filterOk', function (moved) {
				return moved[0].length == 0
				//设置OK按钮触发条件 总数组的第0项数组数量为0
			});
			next.set('processAI',  (list) =>{
				var cards = list[0][1], cards1 = list[1][1]
				//cards为待定选择牌 cards1为牌堆顶的牌
				var player = _status.event.player;
				if(player.countMark('yb018_huaimeng')>=2){
					var number={
						"club":0,
						"spade":0, 
						"diamond":0, 
						"heart":0,
					}
					//定义一个花色对象
					for(var i of cards){
						number[get.suit(i)]++
					}
					//索捡花色数量
					var num=[]
					for(var i in number) num.push(number[i])
					var	maxnum=Math.max(...num)
					//获取最多的数量
					for(var i in number){
						if(number[i]==maxnum){
							//索捡出数量最多的花色
							for(var o of cards){
								if(get.suit(o)==i) cards1.add(o)
								//将该花色的加入cards1数组
							}
							for(var o of cards1){
								cards.remove(o)
								//从cards中移除cards1中已有牌
							}
						}
					}
					//用于给cards1数组增加花色最多的卡牌
				}
				cards.sort(function(a,b){
					return get.value(b,player)-get.value(a,player);
				});
				//为cards排序，价值最大的在最前面
				for(var o of cards){
					cards1.add(o)
				}
				//将cards数组中的牌加入cards1数组
				return [[], cards1];
			})
			game.log(player,'将'+event.numb+'张牌盖在了牌堆顶')
			'step 4'
			var list=result.moved[1].slice(0);
			while(list.length){
				ui.cardPile.insertBefore(list.pop(),ui.cardPile.firstChild);
			}

			'step 5'
			var lista=['是','cancel'];
			// if(player.hasSkill('yb018_minxing_buff'))lista.remove('是');
			player.chooseControl(lista).set('prompt','是否展示牌堆顶三张牌，并根据花色数获得收益');
			'step 6'
			if(result.control=='是'){
				var cards=get.cards(3);
				event.cards=cards;
				//------此模块检测独苗卡牌与花色数
				var suit=[];
				for (var t=0;t<3;t++){
					var huase=get.suit(cards[t],false);
					if(!suit.includes(huase)){
						suit.push(huase);
					}
				}
				if(get.suit(cards[0])==get.suit(cards[1]))event.y=cards[2];
				if(get.suit(cards[0])==get.suit(cards[2]))event.y=cards[1];
				if(get.suit(cards[2])==get.suit(cards[1]))event.y=cards[0];
				// event.y=y;//独苗卡牌对象
				event.u=suit.length;//花色数
				game.cardsGotoOrdering(event.cards);
				player.showCards(event.cards,get.translation(player)+'展示了牌堆顶的三张牌');
				player.$throw(event.cards,1000);
				player.loseToDiscardpile(event.cards);
				// player.addTempSkill('yb018_minxing_buff');
			}
			else{
				event.goto(9);
			}
			'step 7'
			var listb=[];
			if(event.u==1){
				listb.push('选项一');
				if(player.hp<player.maxHp)listb.push('选项二');
				if(player.hp<player.maxHp&&player.hasSkill('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=2)listb.push('背水！');
			}
			if(event.u==2){
				listb.push('选项四');
				listb.push('选项五');
				if(player.hasSkill('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=1)listb.push('背水');
			}
			player.chooseControl(listb).set('choiceList',[
				'<span class=yellowtext>摸两张牌</span>',
				'<span class=yellowtext>回复1点体力</span>',
				'背水！消耗<span class=yellowtext>两</span>枚梦',
				'<span class=yellowtext>摸一张牌</span>',
				'<span class=yellowtext>获得仅有一张的花色的牌</span>',
				'背水：消耗<span class=yellowtext>一</span>枚梦'
			]).set('prompt','<span class=yellowtext>请选择</span>').set('ai',function(){
				var player=_status.event.player;
				return listb.length-1
			});
			'step 8'
			if(result.control=='选项一'){
				player.draw(2);
			}
			if(result.control=='选项二'){
				player.recover();
			}
			if(result.control=='背水！'){
				player.removeMark('yb018_huaimeng',2);
				player.draw(2);
				player.recover();
			}
			if(result.control=='选项四'){
				player.draw();
			}
			if(result.control=='选项五'){
				player.gain(event.y,'gain2');
			}
			if(result.control=='背水'){
				player.removeMark('yb018_huaimeng');
				player.draw();
				player.gain(event.y,'gain2');
			}
			// 'step 9'
			// 	player.addTempSkill('yb018_minxing_add');					
		},
		subSkill:{
			add:{
				charlotte:true,
				forced:true,
				mark:true,
				marktext:'悯',
				intro:{
					content:'本回合已发动过悯星，再次发动需要两枚梦。'
				}
			},
			buff:{
				charlotte:true,
				forced:true,
				mark:true,
				marktext:'追',
				intro:{
					content:'本回合已发动过悯星的追加效果，故而无法再次发动。'
				}
			},
		},
		ai:{
			threaten:1.3,//嘲讽值
		}
	},
	'yb018_fanling':{
		mark:true,
		locked:true,
		marktext:'灵',
		charlotte:true,
		intro:{
			content:function (storage,player,skill){
				if(player.storage.yb018_fanling==true) return '当前为栖月形态';
				return '当前为折叶形态';
			},
		},
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'roundStart',
		},
		forced:true,
		filter:function (event,player){
			if(game.roundNumber>1)return false;
			return true;
		},
		content:function (){
			'step 0'
			player.chooseControl('栖月','折叶').set('prompt','请选择起始状态');
			'step 1'
			if(result.control=='栖月'){
				player.storage.yb018_fanling=true;
				player.addTempSkill('yb018_qiyue','roundStart');
				player.addSkill('yb018_fanling1');
			}
			if(result.control=='折叶'){
				player.storage.yb018_fanling=false;
				player.addTempSkill('yb018_zheye','roundStart');
				player.addSkill('yb018_fanling1');
			}
		},
		init:function (player){
			player.storage.yb018_fanling=true;
		},
		derivation:['yb018_zheye','yb018_qiyue'],
		group:['yb018_fanling_1'],
		subSkill:{
			1:{
				audio:'eyb018_fanling',
				trigger:{
					global:'roundStart',
				},
				forced:true,
				filter:function (event,player){
					if(game.roundNumber==1)return false;
					if(!player.countMark('yb018_huaimeng')>=1) return false;
					return true;
				},
				content:function (){
					'step 0'
					player.removeMark('yb018_huaimeng');
					'step 1'
					if(player.storage.yb018_fanling==true){
						player.storage.yb018_fanling=false;
						player.addTempSkill('yb018_zheye','roundStart');
					}
					else{
						player.storage.yb018_fanling=true;
						player.addTempSkill('yb018_qiyue','roundStart');
					}
				},
			}
		}
	},
	'yb018_zheye':{
		audio:'ext:夜白神略/audio/character:2',
		audioname2:{
			'ybsp_002chenailin':'yb002_zheye',//
			'ybsl_005wangruobing':'yb005_zheye',//
			'ybsl_010zhouyue':'yb010_zheye',//
		},
		trigger:{
			player:['changeHp'],
		},
		forced:true,
		content:function (){
			event.num=Math.abs(trigger.num);
			player.draw(event.num);
		},
	},
	'yb018_qiyue':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:['phaseZhunbeiBegin','phaseJieshuAfter'],
		},
		forced:true,
		content:function (){
			'step 0'
			if(event.triggername=='phaseJieshuAfter'){
				player.draw(2);
				event.finish();
			}
			'step 1'
			if(player.hasMark('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=1)
				return player.chooseControl('打牌','弃梦').set('prompt','请选择打出一张牌或移除一枚“梦”。').set('ai',function(){
					if(player.countMark('yb018_huaimeng')>3) return '弃梦';
					return '打牌';
				})
				else player.chooseControl('打牌').set('prompt','你没有梦，请点击打牌。');
			'step 2'
			if(result.control=='弃梦'){
				player.removeMark('yb018_huaimeng',1);
			}
			if(result.control=='打牌'){
				if(player.countCards('he')>0){
					player.chooseToRespond('he',true).set('ai',function(card){
						if(player.storage.YB_memorysuit&&get.suit(card)==player.storage.YB_memorysuit)return 3;
						return 1;
					});
				}
			};
		},
	},
	//------------------神张晴
	'yb018_isi':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		filter:function (event,player){
			return player.maxHp<10;
		},
		content:function (){
			'step 0'
			event.cards=[];
			event.suits=[];
			'step 1'
			player.judge(function(result){
				var evt=_status.event.getParent('yb018_isi');
				if(evt&&evt.suits&&evt.suits.includes(get.suit(result))) return 0;
				return 1;
			}).set('callback',function(){
				event.getParent().orderingCards.remove(event.judgeResult.card);
			}).judge2=function(result){
				return result.bool?true:false;
			};
			'step 2'
			event.cards.push(result.card);
			if(result.bool&&player.maxHp<10){
				event.suits.push(result.suit);
				player.gainMaxHp();
				event.goto(1);
			}
			else{
				cards=cards.filterInD();
				if(cards.length) player.chooseTarget('将'+get.translation(cards)+'交给一名角色',true).set('ai',function(target){
					var player=_status.event.player;
					var att=get.attitude(player,target)/Math.sqrt(1+target.countCards('h'));
					if(target.hasSkillTag('nogain')) att/=10;
					return att;
				});
				else event.finish();
			}
			'step 3'
			if(result.bool){
				var target=result.targets[0];
				event.target=target;
				player.line(target,'green');
				target.gain(cards,'gain2');
			}
			'step 4'
			if(target.isMaxHandcard()) player.loseMaxHp();
		},
		ai:{
			order:1,
			result:{
				player:1,
			},
			threaten:2,//嘲讽值
		},
	},
	yb018_newisi:{
		audio: "yb018_isi",
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
					var evt = _status.event.getParent("yb018_newisi");
					if (evt && evt.suits && evt.suits.includes(get.suit(result))) return 0;
					return 1;
				})
				.set("callback", lib.skill.yb018_newisi.callback).judge2 = function (result) {
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
				player.chooseBool("是否继续发动【懿思】？").set("frequentSkill", "reshuishi");
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
	'yb018_chongmeng':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseZhunbeiBegin',
		},
		forced:true,
		juexingji:true,
		skillAnimation:true,
		animationColor:'YB_snow',
		filter:function (event,player){
			if(player.storage.yb018_yisi) return true;
			return this.yb018_guajian_filter.apply(this,arguments);
		},
		content:function (){
			'step 0'
			player.awakenSkill('yb018_chongmeng');
			player.gainMaxHp(2);
			player.recover();
			'step 1'
			player.chooseTarget(true,'令一名角色获得技能〖释罔〗').set('ai',function(target){
				return get.attitude(_status.event.player,target);
			});
			'step 2'
			if(result.bool){
				var target=result.targets[0];
				player.line(target,'green');
				target.storage.yb018_shiwang=player;
				target.addSkill('yb018_shiwang');
			}
		},
		derivation:'yb018_shiwang',
		'yb018_guajian_filter':function (event,player){
			return !game.hasPlayer(function(current){
				return current.getAllHistory('damage').length==0;
			});
		},
	},
	'yb018_yisi':{
		audio:'ext:夜白神略:1',
		inherit:'yb018_yisi',
		filterTarget:true,
		content:function (){
			'step 0'
			player.awakenSkill('yb018_yisi');
			var list=target.getSkills(null,false,false).filter(function(skill){
				var info=lib.skill[skill];
				return info&&info.juexingji&&!target.awakenedSkills.includes(skill);
			});
			if(player.maxHp>=game.players.length&&list.length>0){
				if(list.length==1) event._result={control:list[0]};
				else player.chooseControl(list).set('prompt','选择一个觉醒技，令'+get.translation(target)+'可无视条件发动该技能');
			}
			else{
				target.draw(4);
				event.goto(2);
			}
			'step 1'
			target.storage.yb018_yisi=result.control;
			target.markSkill('yb018_yisi');
			var info=lib.skill[result.control];
			if(info.filter&&!info.charlotte&&!info.yb018_guajian_filter){
				info.yb018_guajian_filter=info.filter;
				info.filter=function(event,player){
					if(player.storage.yb018_yisi) return true;
					return this.yb018_guajian_filter.apply(this,arguments);
				}
			}
			'step 2'
			player.loseMaxHp(2);
		},
		intro:{
			content:'发动【$】时无视条件',
		},
		ai:{
			order:0.1,
			expose:0.2,//跳立场
			result:{
				target:function (player,target){
					if(target!=player&&player.hasUnknown()||player.maxHp<(player.getDamagedHp()>1?5:6)) return 0;
					if(target==player&&player.hasSkill('yb018_yisi')&&game.hasPlayer(function(current){
						return current.getAllHistory('damage').length==0;
					})) return 4;
					var list=target.getSkills(null,false,false).filter(function(skill){
						var info=lib.skill[skill];
						return info&&info.juexingji&&!target.awakenedSkills.includes(skill);
					});
					if(list.length||target.hasJudge('lebu')||target.hasSkillTag('nogain')) return 0;
					return 4;
				},
			},
		},
		enable:'phaseUse',
		limited:true,
		skillAnimation:true,
		animationColor:'YB_snow',
		mark:true,
		init:function (player,skill){
			player.storage[skill]=false;
		},
	},
	'yb018_guajian':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		limited:true,
		skillAnimation:true,
		animationColor:'YB_snow',
		filterTarget:function (card,player,target){
			return player!=target;
		},
		content:function (){
			'step 0'
			player.awakenSkill('yb018_guajian');
			var list=target.getSkills(null,false,false).filter(function(skill){
				var info=lib.skill[skill];
				return info&&info.juexingji;
			});
			if(list.length){
				target.addMark('yb018_guajian',1,false);
				for(var i of list){
					var info=lib.skill[i];
					if(info.filter&&!info.charlotte&&!info.yb018_guajian_filter){
						info.yb018_guajian_filter=info.filter;
						info.filter=function(event,player){
							if(player.hasMark('yb018_guajian')) return true;
							return this.yb018_guajian_filter.apply(this,arguments);
						}
					}
				}
			}
			else target.draw(4);
			player.loseMaxHp(2);
		},
		intro:{
			content:'发动非Charlotte觉醒技时无视条件',
		},
		ai:{
			order:0.1,
			expose:0.2,//跳立场
			result:{
				target:function (player,target){
					if(player.hasUnknown()||player.maxHp<5) return 0;
					var list=target.getSkills(null,false,false).filter(function(skill){
						var info=lib.skill[skill];
						return info&&info.juexingji;
					});
					if(list.length||target.hasJudge('lebu')||target.hasSkillTag('nogain')) return 0;
					return 4;
				},
			},
		},
		mark:true,
		init:function (player,skill){
			player.storage[skill]=false;
		},
	},
	'yb018_shiwang':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseZhunbeiBegin',
		},
		filter:function (event,player){
			var target=player.storage.yb018_shiwang;
			return target&&target.isAlive()&&target.maxHp>1;
		},
		logTarget:function (event,player){
			return player.storage.yb018_shiwang;
		},
		check:function (event,player){
			var target=player.storage.yb018_shiwang;
			if(get.attitude(player,target)<=0) return true;
			return target.maxHp>3&&!player.hasJudge('lebu');
		},
		content:function (){
			player.storage.yb018_shiwang.loseMaxHp();
			player.addTempSkill('yb018_shiwang2');
		},
	},
	'yb018_shiwang2':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		filter:function (event,player){
			for(var i of lib.inpile){
				if(get.type(i)=='trick'&&event.filterCard({name:i,isCard:true},player,event)) return true;
			}
			return false;
		},
		chooseButton:{
			dialog:function (event,player){
				var list=[];
				for(var i of lib.inpile){
					if(get.type(i)=='trick'&&event.filterCard({name:i,isCard:true},player,event)) list.push(['锦囊','',i]);
				}
				return ui.create.dialog('释罔',[list,'vcard']);
			},
			check:function (button){
				return _status.event.player.getUseValue({name:button.link[2],isCard:true});
			},
			backup:function (links,player){
				return {
					viewAs:{
						name:links[0][2],
						isCard:true,
					},
					filterCard:()=>false,
					selectCard:-1,
					popname:true,
					precontent:function(){
						player.logSkill('yb018_shiwang');
						//delete event.result.skill;
					},
				}
			},
			prompt:function (links,player){
				return '请选择'+get.translation(links[0][2])+'的目标';
			},
		},
		ai:{
			order:1,
			result:{
				player:1,
			},
		},
	},
	//---------------废案张晴
	'yb018_yinsi':{
		// trigger:{
			// global:'gameDrawBefore',
		// },
		// direct:true,
		derivation:['dz017_shanwu','dz014_qingling','dz017_zhushi'],
		// content:function (){
		// 	player.addSkill('yb018_yinsia');
		// 	player.addSkill('yb018_yinsib');
		// 	player.addSkill('yb018_yinsic');
		// 	player.addSkill('yb018_yinsid');
		// },
		// init:function (player){
		// 	player.addSkill('yb018_yinsia');
		// 	player.addSkill('yb018_yinsib');
		// 	player.addSkill('yb018_yinsic');
		// 	player.addSkill('yb018_yinsid');
		// },
		group:['yb018_yinsia','yb018_yinsib','yb018_yinsic','yb018_yinsid']
	},
	'yb018_yinsia':{
		audio:'ext:夜白神略:1',
		trigger:{
			player:'phaseZhunbeiBegin',
		},
		filter:function (event,player){
			if(player.hasMark('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=2) return true;
			return false;
		},
		content:function (){
			'step 0'
			player.chooseControl('是','否').set('prompt','是否移除两枚”梦“，然后卜算3？');
			'step 1'
			var jg=result.control;
			if(jg=='是'){
				player.removeMark('yb018_huaimeng',2);
				player.chooseToGuanxing(3);
			}
			else event.finish();
		},
	},
	'yb018_yinsib':{
		audio:'ext:夜白神略:1',
		trigger:{
			player:'phaseDrawBefore',
		},
		filter:function (event,player){
			if(player.hasMark('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=1) return true;
			return false;
		},
		content:function (){
			'step 0'
			player.chooseControl('是','否').set('prompt','是否移除一枚”梦“，然后多摸一张牌？');
			'step 1'
			var jg=result.control;
			if(jg=='是'){
				player.removeMark('yb018_huaimeng',1);
				trigger.num++;
				game.log(player,'多摸了一张牌');
			}
			else event.finish;
		},
	},
	'yb018_yinsic':{
		audio:'ext:夜白神略:1',
		trigger:{
			player:'phaseUseBegin',
		},
		filter:function (event,player){
			if(player.hasMark('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=2) return true;
			return false;
		},
		content:function (){
			'step 0'
			player.chooseControl('是','否').set('prompt','是否移除两枚”梦“，然后本回合获得【善舞】？');
			'step 1'
			var jg=result.control;
			if(jg=='是'){
				player.removeMark('yb018_huaimeng',2);
				player.addTempSkill('dz017_shanwu');
				game.log(player,'：当初我跳舞时，那小子看我直勾勾的');
			}
			else event.finish();
		},
	},
	'dz018_shanwu':{
		inherit:'dz017_shanwu',
		audio:'ext:夜白神略/audio/character:1',
	},
	'yb018_yinsid':{
		audio:'ext:夜白神略:1',
		trigger:{
			player:'phaseJieshuBefore',
		},
		filter:function (event,player){
			if(player.hasMark('yb018_huaimeng')&&player.countMark('yb018_huaimeng')>=2) return true;
			return false;
		},
		content:function (){
			'step 0'
			player.chooseControl('是','否').set('prompt','是否移除两枚”梦“，然后获得【注视】和【轻灵】直到下回合开始？');
			'step 1'
			var jg=result.control;
			if(jg=='是'){
				player.removeMark('yb018_huaimeng',2);
				player.addTempSkill('dz018_zhushi',{player:'phaseZhunbeiBefore'});
				player.addTempSkill('dz018_qingling',{player:'phaseZhunbeiBefore'});
			}
			else event.finish();
		},
	},
	'dz018_qingling':{
		inherit:'dz014_qingling',
		audio:'ext:夜白神略/audio/character:1',
	},
	'dz018_zhushi':{
		inherit:'dz017_zhushi',
		audio:'ext:夜白神略/audio/character:1',
	},
	//----------------消消乐张晴
	yb018_tongmou:{
		audio:'ext:夜白神略/audio/character:2',
		init(player,skill) {
			player.storage[skill] = [[], [], [], [], []]
			player.markSkill(skill)
		},
		enable : 'phaseUse',
		trigger : {
			player : 'changeSkillsAfter'
		},
		usable : 1,
		forced : true,
		locked : false,
		filter : event => event.name == 'chooseToUse' || event.addSkill.includes('yb018_tongmou'),
		async content(event, trigger, player) {
			async function addCards(bool) {
				const num = player.countExpansions(event.name)
				const cards = get.cards(25 - num)
				const next = player.addToExpansion(cards, player)
				next.gaintag.add(event.name)
				await next
				if (bool) {
					const xs = player.getExpansions(event.name)
					player.storage[event.name] = [
						xs.slice(0, 5),
						xs.slice(5, 10),
						xs.slice(10, 15),
						xs.slice(15, 20),
						xs.slice(20, 25)
					]
				}
			}
			if (trigger?.name == 'changeSkills') {
				const num = player.countExpansions(event.name)
				//什么情况下会出现这种情况呢？好奇怪啊
				if (num) player.say('诶？上次玩完没放回去吗？')
				if (num == 25) return
				await addCards(true)
				// player.markSkill('yb018_tongmou')
				return
			}
			else {
				const num = player.countExpansions(event.name)
				//你只获得此技能时放牌，游戏开始时不放是这样的
				if (num < 25) {
					player.say('诶？我忘放牌了吗？洗一下吧')
					await addCards(true)
				}
				const storage = player.storage[event.name]
				const dialog = ui.create.dialog()
				dialog.classList.add('fixed')
				dialog.classList.add('scroll1')
				dialog.classList.add('scroll2')
				dialog.classList.add('fullwidth')
				dialog.classList.add('fullheight')
				dialog.classList.add('noupdate')
				const tip = ui.create.div('.select-all.popup.pointerdiv', dialog.contentContainer)
				tip.innerHTML = `${get.poptip(event.name + '_tip')}`
				//加两行翻译 yb018_tongmou_tip : '属性效果', yb018_tongmou_tip_info : '牌附有能造成伤害的属性<br>火：清除此行牌<br>雷：清除此列牌<br>雪：清除相邻牌<br>神 : 清除全部牌<br>风：随意交换牌<br>其他：清除同花牌'
				dialog.matched = []
				for (let x = 0; x < 5; x ++) {
					for (let y = 0; y < 5; y ++) {
						const card = ui.create.card(ui.special, 'noclick', true)
						card.init(storage[x][y])
						card.x = x
						card.y = y
						card.link = storage[x][y]
						let str = ''
						for (const nature of getNatures(card)) {
							if (nature == 'other') str += '◈'
							else str += get.translation(nature)
						}
						card.node.gaintag.innerHTML = str
						card.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', click)
						card.style.position = 'absolute'
						card.style.opacity = 0
						//有现成的我就用了
						const glow = {
							heart : 'dctuoyu-qingqu-glow',
							spade : 'dctuoyu-junshan-glow',
							diamond : 'dctuoyu-fengtian-glow',
							club:'YB-zqxxl-zise',
						}
						card.classList.add(glow[get.suit(card)])
						dialog.contentContainer.appendChild(card)
					}
				}
				function update(bool) {
					//确保5*5的卡牌可以完整展示
					const card = ui.create.card(ui.special, 'noclick', true)
					card.style.opacity = 0
					dialog.contentContainer.appendChild(card)
					ui.refresh(card)
					const dw = dialog.contentContainer.offsetWidth,
						dh = dialog.contentContainer.offsetHeight,
						cw = card.offsetWidth,
						ch = card.offsetHeight
					card.remove()
					const scale = Math.min(dw / cw / 6, dh / ch / 8)
					const left = dw / 2 - cw * 2 * scale - cw / 2,
						top = dh / 2 - ch * 3 * scale - ch / 2
					const cards = Array.from(dialog.contentContainer.childNodes).filter(i => get.itemtype(i) == 'card')
					for (const button of cards) {
						if (get.itemtype(button) != 'card') continue
						const { x, y } = button
						button.style.transform = `scale(${scale * 100}%)`
						if (bool === true) button.style.transitionDuration = '0.05s'
						if (get.itemtype(bool) == 'card' && button != bool) continue
						if (dialog.matched.includes(button)) {
							const len = Math.max(5, dialog.matched.length)
							const index = dialog.matched.indexOf(button)
							button.style.transitionDuration = '0.75s'
							button.style.left = left + cw * scale * index * 5 / len+ 'px'
							button.style.top = top + ch * scale * 6 + 'px'
							button.style.zIndex = index + ''
						}
						else {
							button.style.left = left + cw * scale * x + 'px'
							button.style.top = top + ch * scale * y + 'px'
						}
						ui.refresh(button)
						button.style.opacity = 1
					}
				}
				function click() {
					if (dialog.isBusy) return
					if (dialog.matched.includes(this)) return
					if (!dialog.selectedCard) {
						this.classList.add('selected')
						dialog.selectedCard = this
					}
					else if (dialog.selectedCard == this) {
						delete dialog.selectedCard
						this.classList.remove('selected')
					}
					else if (isAdj(dialog.selectedCard, this)){
						swapCard(dialog.selectedCard, this)
						dialog.selectedCard.classList.remove('selected')
						delete dialog.selectedCard
					}
					else {
						dialog.selectedCard.classList.remove('selected')
						this.classList.add('selected')
						dialog.selectedCard = this
					}
				}
				function getNatures(...cards) {
					const natures = []
					const naturex = ['fire', 'thunder', 'kami', 'ice', 'YB_wind', 'YB_snow']
					for (const card of cards) {
						for (const [nature] of lib.nature) {
							if (get.tag(card, nature + 'Damage')) {
								if (naturex.includes(nature)) natures.add(nature)
								else natures.add('other')
							}
						}
					}
					return natures
				}
				function isAdj(card1, card2) {
					if ([card1, card2].some(card => dialog.matched.includes(card))) return false
					if (Math.abs(card1.x - card2.x) + Math.abs(card1.y - card2.y) == 1) return true
					if (getNatures(card1, card2).includes('YB_wind')) return true
					return false
				}
				//原本判断能不能换的，现在用不到了，不过可以给ai用，我懒得写了，ai禁用了吧
				function checkSwap(card1, card2) {
					if (!isAdj(card1, card2)) return false
					function match(card1, card2) {
						[card1.x, card2.x, card1.y, card2.y] = [card2.x, card1.x, card2.y, card1.y]
						const cards = Array.from(dialog.contentContainer.childNodes).filter(i => get.itemtype(i) == 'card')
						const matchx = [card2], matchy = [card2]
						const { x, y } = card2
						for (let xx = x - 1; xx >= 0; xx --) {
							const cardx = cards.find(i => i.x == xx && i.y == y)
							if (get.suit(cardx) == get.suit(card2)) matchx.push(cardx)
							else break
						}
						for (let xx = x + 1; xx < 5; xx ++) {
							const cardx = cards.find(i => i.x == xx && i.y == y)
							if (get.suit(cardx) == get.suit(card2)) matchx.push(cardx)
							else break
						}
						for (let yy = y - 1; yy >= 0; yy --) {
							const cardy = cards.find(i => i.y == yy && i.x == x)
							if (get.suit(cardy) == get.suit(card2)) matchy.push(cardy)
							else break
						}
						for (let yy = y + 1; yy < 5; yy ++) {
							const cardy = cards.find(i => i.y == yy && i.x == x)
							if (get.suit(cardy) == get.suit(card2)) matchy.push(cardy)
							else break
						}
						[card1.x, card2.x, card1.y, card2.y] = [card2.x, card1.x, card2.y, card1.y]
						if (matchx.length > 2) return true
						if (matchy.length > 2) return true
						return false
					}
					if (match(card1, card2)) return true
					if (match(card2, card1)) return true
					return false
				}
				function matchCard() {
					const matched = []
					const cards = Array.from(dialog.contentContainer.childNodes).filter(i => get.itemtype(i) == 'card').filter(i => !dialog.matched.includes(i))
					for (const card of cards) {
						if (matched.includes(card)) continue
						const matchx = [card], matchy = [card]
						const { x, y } = card
						for (let xx = x - 1; xx >= 0; xx --) {
							const cardx = cards.find(i => i.x == xx && i.y == y)
							if (get.suit(cardx) == get.suit(card)) matchx.push(cardx)
							else break
						}
						for (let xx = x + 1; xx < 5; xx ++) {
							const cardx = cards.find(i => i.x == xx && i.y == y)
							if (get.suit(cardx) == get.suit(card)) matchx.push(cardx)
							else break
						}
						for (let yy = y - 1; yy >= 0; yy --) {
							const cardy = cards.find(i => i.y == yy && i.x == x)
							if (get.suit(cardy) == get.suit(card)) matchy.push(cardy)
							else break
						}
						for (let yy = y + 1; yy < 5; yy ++) {
							const cardy = cards.find(i => i.y == yy && i.x == x)
							if (get.suit(cardy) == get.suit(card)) matchy.push(cardy)
							else break
						}
						if (matchx.length > 2) matched.addArray(matchx)
						if (matchy.length > 2) matched.addArray(matchy)
					}
					let ice = false
					for (const card of matched) {
						const natures = getNatures(card)
						if (natures.includes('kami')) matched.addArray(cards)
						if (natures.includes('fire')) matched.addArray(cards.filter(i => i.y == card.y))
						if (natures.includes('thunder')) matched.addArray(cards.filter(i => i.x == card.x))
						if (natures.includes('YB_snow')) matched.addArray(cards.filter(i => Math.abs(i.y - card.y) + Math.abs(i.x - card.x) == 1))
						if (natures.includes('other')) matched.addArray(cards.filter(i => get.suit(i) == get.suit(card)))
						if (natures.includes('ice')) ice = true
					}
					dialog.matched.addArray(matched)
					update()
					if (ice && cards.some(card => cards.some(cardx => isAdj(card, cardx)))) setTimeout(() => {
						dialog.isBusy = false
						if (!event.isMine()) ai()
						dialog.ice = true
					}, 750)
					else {
						let delay = 0.75
						const add = get.cards(25 - cards.filter(i => !dialog.matched.includes(i)).length)
						for (let x = 0; x < 5; x ++) {
							const xs = cards.filter(i => i.x == x && !dialog.matched.includes(i)).sort((a, b) => b.y - a.y)
							let len = xs.length
							for (let i = 0; i < xs.length; i ++) {
								const card = xs[i]
								const time = Math.abs(card.y - 4 + i) / 4
								delay = Math.max(delay, time)
								card.style.transitionDuration = time + 's'
								card.y = 4 - i
							}
							while (xs.length < 5) {
								const card = ui.create.card(ui.special, 'noclick', true)
								card.style.position = 'absolute'
								card.style.opacity = 0
								card.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', click)
								
								dialog.contentContainer.appendChild(card)
								card.style.transitionDuration = '0.05s'
								xs.push(card)
								card.link = add.shift()
								card.init(card.link)
								const glow = {
									heart : 'dctuoyu-qingqu-glow',
									spade : 'dctuoyu-junshan-glow',
									diamond : 'dctuoyu-fengtian-glow',
									club:'YB-zqxxl-zise',
								}
								card.classList.add(glow[get.suit(card)])
								card.x = x
								card.y = len - xs.length
								let str = ''
								for (const nature of getNatures(card)) {
									if (nature == 'other') str += '◈'
									else str += get.translation(nature)
								}
								card.node.gaintag.innerHTML = str
								update(card)
								const time = Math.abs(card.y - 5 + xs.length) / 4
								delay = Math.max(delay, time)
								card.style.transitionDuration = time + 's'
								card.y = 5 - xs.length
							}
						}
						update()
						setTimeout((matched.length || dialog.ice) ? matchCard : () => {
							dialog.matchAfter = true
							game.resume()
						}, delay * 1000)
						dialog.ice = false
					}
				}
				function swapCard(card1, card2) {
					dialog.isBusy = true
					const time = Math.hypot(card1.x - card2.x, card1.y - card2.y) / 4
					card1.style.transitionDuration = time + 's'
					card2.style.transitionDuration = time + 's';
					[card1.x, card2.x, card1.y, card2.y] = [card2.x, card1.x, card2.y, card1.y]
					update()
					setTimeout(() => {
						matchCard()
					}, time * 1000)
				}
				update(true)
				const resizeObserver = new ResizeObserver(() => update(true))
				resizeObserver.observe(dialog)
				if (!event.isMine()) ai()
				event.switchToAuto = function() {
					if (!dialog.isBusy && !dialog.matchAfter) ai()
				}
				//防止有人在动画过程中来了个game.resume
				while (!dialog.matchAfter) await game.pause()
				function ai() {
					setTimeout(function() {
						const cards = Array.from(dialog.contentContainer.childNodes).filter(i => get.itemtype(i) == 'card').filter(i => !dialog.matched.includes(i)).sort((a, b) => b.y - a.y)
						let swaped = false
						for (const card1 of cards) {
							const card2 = cards.find(i => checkSwap(card1, i))
							if (card2) {
								swapCard(card1, card2)
								swaped = true
								break
							}
						}
						if (swaped) return
						cards.sort(() => 0.5 - Math.random())
						for (const card1 of cards) {
							const card2 = cards.find(i => isAdj(card1, i))
							if (card2) {
								swapCard(card1, card2)
								break
							}
						}
					}, 300)
				}
				dialog.close()
				const gain = get.links(dialog.matched)
				const buttons = Array.from(dialog.contentContainer.childNodes).filter(i => get.itemtype(i) == 'card').filter(i => !dialog.matched.includes(i))
				for (const { x, y, link } of buttons) storage[x][y] = link
				//托管。。。不在动画过程中托管就行
				const addToExpansions = get.links(buttons).filter(i => !player.getExpansions(event.name).includes(i))
				//最后再处理这些牌，防周妃插结
				await player.gain(gain, 'gain2')
				const next = player.addToExpansion(addToExpansions, player)
				next.gaintag.add(event.name)
				await next
			}
		},
		onremove(player, skill) {
			const cards = player.getExpansions(skill)
			if (cards.length) player.loseToDiscardpile(cards)
			delete player.storage[skill]
		},
		ai : {
			order : 11,
			result : {
				player : 3
			}
		},
		intro:{
			mark(dialog, storage, player){
				dialog.content.style["overflow-x"] = "visible";
				if (!storage || !storage.length) {
					return "（棋盘空空如也）";
				}
			},
		},
		subSkill : {
			tip : {}
		}
	},
	//-------------------------盛妍
	'yb019_lincu':{
		init:function (player,skill){
			player.addSkillBlocker(skill);
		},
		onremove:function (player,skill){
			player.removeSkillBlocker(skill);
		},
		charlotte:true,
		skillBlocker:function (skill,player){
			return !lib.skill[skill].charlotte&&!get.is.locked(skill,player);
		},
		group:'yb019_lincu_jia',
		mark:true,
		intro:{
			content:function (storage,player,skill){
				var list=player.getSkills(null,false,false).filter(function(i){
					return lib.skill.fengyin.skillBlocker(i,player);
				});
				if(list.length) return '失效技能：'+get.translation(list);
				return '无失效技能';
			},
		},
		subSkill:{
			jia:{
				trigger:{
					player:'damageBegin3',
				},
				direct:true,
				content:function (){
					trigger.num++;
				},
				sub:true,
			},
		},
	},
	'yb019_chicu':{
		audio:'ext:夜白神略/audio/character:2',
		direct:true,
		trigger:{
			global:'loseAfter',
		},
		filter:function (event,player,card){
			if(event.type!='discard'||_status.currentPhase!=player||event.player==player){return false;}
			for(var i=0;i<event.cards2.length;i++){
				if(get.name(event.cards2[i],null,event.hs.includes(event.cards2[i])?event.player:false)=='ybsl_cu'){
					return true;
				}
			}
			return false;
		},
		content:function (){
			var target=trigger.player;
			target.addTempSkill('yb019_lincu');
		},
	},
	'yb019_renxing':{
		shaRelated:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'useCardToTargeted',
		},
		filter:function (event,player){
			if(event.target.countCards('h')==0)return false;
			return (event.card.name=='sha'||(get.type2(event.card,false)=='trick'&&get.tag(event.card,'damage')>0))&&
				!event.target.hasSkill('yb019_renxingbiaoji');
		},
		// 'prompt2':function(event,player,target){
			// var str='是否对';
			// var tar=get.translation(event.target);
			// str+=tar;
			// str+='发动任性';
			// return str;
		// },
		logTarget:'target',
		content:function (){
			'step 0'
			var target=trigger.target;
			event.target=target;
			//if(player!=target&&target.countCards('h')>0) player.viewHandcards(target);
			//player.chooseToDiscard(1)
			event.videoId=lib.status.videoId++;
			var cards=target.getCards('h');
			if(player.isOnline2()){
				player.send(function(cards,id){
					ui.create.dialog('任性',cards).videoId=id;
				},cards,event.videoId);
			}
			event.dialog=ui.create.dialog('任性',cards);
			event.dialog.videoId=event.videoId;
			if(!event.isMine()){
				event.dialog.style.display='none';
			}
			player.chooseButton().set('filterButton',function(button){
				return get.type(button.link)=='basic';
			}).set('dialog',event.videoId);
			'step 1'
			if(result.bool){
				event.card=result.links[0];
				var func=function(card,id){
					var dialog=get.idDialog(id);
					if(dialog){
						for(var i=0;i<dialog.buttons.length;i++){
							if(dialog.buttons[i].link==card){
								dialog.buttons[i].classList.add('selectedx');
							}
							else{
								dialog.buttons[i].classList.add('unselectable');
							}
						}
					}
				}
				if(player.isOnline2()){
					player.send(func,event.card,event.videoId);
				}
				else if(event.isMine()){
					func(event.card,event.videoId);
				}
				player.chooseControl(['弃置','重选','cancel2']);
			}
			else{
				if(player.isOnline2()){
					player.send('closeDialog',event.videoId);
				}
				event.dialog.close();
				event.finish();
				target.addTempSkill('yb019_renxingbiaoji');
			}
			'step 2'
			if(player.isOnline2()){
				player.send('closeDialog',event.videoId);
				event.dialog.close();
				var card=event.card;
				target.discard(card);
				target.addTempSkill('yb019_renxingbiaoji');
			}
			else if(result.control=='弃置'){
				event.dialog.close();
				var card=event.card;
				target.discard(card);
				target.addTempSkill('yb019_renxingbiaoji');
			}
			else if(result.control=='重选'){
				event.dialog.close();
				event.goto(0);
			}
			else target.addTempSkill('yb019_renxingbiaoji');
			//史山别学！
		},
		ai:{
			threaten:1.5,//嘲讽值
			result:{
				target:function (player,target){
					return -target.countCards('h');
				},
			},
			expose:0.4,//跳立场
		},
		subSkill:{
			biaoji:{
				locked:true,
				charlotte:true,
				forced:true,
			},
		},
	},
	'yb019_renxingbiaoji':{
		mark:true,
		marktext:'任性',
		intro:{
			content:'已被任性过'
		},
		locked:true,
		charlotte:true,
		forced:true,
	},
	'yb019_misan':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'useCardAfter',
		},
		direct:true,
		filter:function (event,player){
			if(player.getHistory('custom',function(evt){
				return evt.yb019_misan_name==event.card.name;
			}).length>0) return false;
			if(get.type(event.card)!='basic') return false;
			return event.cards.filterInD().length>0
		},
		content:function (){
			'step 0'
			player.chooseTarget(get.prompt('yb019_misan'),'将'+get.translation(trigger.cards)+'交给一名其他角色',function(card,player,target){
				return target!=player;
			}).set('ai',function(target){
				if(target.hasJudge('lebu')) return 0;
				var att=get.attitude(_status.event.player,target);
				if(att<3) return 0;
				if(target.hasSkillTag('nogain')) att/=10;
				if(target.hasSha()&&_status.event.sha){
					att/=5;
				}
				return att/(1+get.distance(player,target,'absolute'));
			}).set('sha',trigger.cards[0].name=='sha');
			'step 1'
			if(result.bool){
				player.logSkill('yb019_misan',result.targets[0]);
				result.targets[0].gain(trigger.cards.filterInD(),'gain2');
				player.getHistory('custom').push({yb019_misan_name:trigger.card.name});
			}
		},
	},
	'yb019_cutan':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:['phaseZhunbeiBegin','damageEnd'],
		},
		frequent:true,
		content:function (){//触发的效果，具体填在下面
			player.gain(game.YB_createCard('ybsl_cu',null,null,null),'gain2');
		},
		derivation:['ybsl_cu'],
		init:function(player,skill){
			game.broadcastAll(function(){lib.inpile.add('ybsl_cu')});
		},
	},
	// 'yb019_zhiyu':'掷郁',
	// 'yb019_zhiyu_info':'每回合每种牌名（限实体牌名）限一次。出牌阶段，你可以展示一张手牌并交给一名其他角色，然后视为你对其使用此牌（不计入次数，不受距离限制）。',还没开写呢，懒
	// yb019_zhiyu:{
		
	// },
	ybsl_cu_discard:{
		trigger: {
			player:'loseAfter',
			// player: ["loseAfter", "compare"],
			// global: [
			// 	"equipAfter",
			// 	"addJudgeAfter",
			// 	"gainAfter",
			// 	"loseAsyncAfter",
			// 	"addToExpansionAfter",
			// ],
			// target: "compare",
		},
		cardSkill: true,
		// filter: function (event, player, name) {
		// 	if(event.type!='discard')return false;
		// 	var evt = event.getl(player);
		// 	if (
		// 		!evt ||
		// 		!evt.hs ||
		// 		!evt.hs.filter(function (i) {
		// 			return get.name(i, player) == "ybsl_cu";
		// 		}).length
		// 	)
		// 		return false;
		// 	// for (var i of lib.skill.ybsl_cu.whiteListFilter) {
		// 	// 	if (i(event, player)) return false;
		// 	// }
		// 	return true;
		// },
		getIndex:function (event, player, name) {
			if(event.type!='discard')return false;
			var evt = event.getl(player);
			if (
				!evt ||
				!evt.hs ||
				!evt.hs.filter(function (i) {
					return get.name(i, player) == "ybsl_cu";
				}).length
			)
				return false;
			// for (var i of lib.skill.ybsl_cu.whiteListFilter) {
			// 	if (i(event, player)) return false;
			// }
			var num = evt.hs.filter(function (i) {
				return get.name(i, player) == "ybsl_cu";
			}).length;
			if(num>0){
				game.log(player, "触发了", "#g【醋】", "的效果");
				return num;
			}
		},
		whiteListFilter: [
			//豁免
			// (event) => event.getParent().name == "g_du_give",
			// (event) => event.getParent(3).name == "guaguliaodu",
		],
		forced: true,
		popup: false,
		content: function () {
			"step 0";
			if (trigger.delay === false) game.delayx();
			"step 1";
			// var num = 1;
			// if (typeof trigger.getl == "function") {
			// 	num = trigger.getl(player).hs.filter(function (i) {
			// 		return get.name(i, player) == "ybsl_cu";
			// 	}).length;
			// }
			// player.loseHp(num).type = "du";
			player.chooseToDiscard(true).type='ybsl_cu';
		},

	},
	yb019_zhiyu:{
		audio:'yb019_renxing',
		enable:'phaseUse',
		selectCard:1,
		filterCard:function (card){
			var player = _status.event.player;
			return !player.storage.yb019_zhiyu_ban||!player.storage.yb019_zhiyu_ban.includes(card.name);
		},
		filter:function (event,player){
			return true;
		},
		filterTarget:function (card,player,target){
			return player!=target;
		},
		discard:false,
		selectTarget:1,
		content:async function (event,trigger,player){
			await player.addTempSkill('yb019_zhiyu_ban');
			if(!player.storage.yb019_zhiyu_ban)player.storage.yb019_zhiyu_ban=[];
			await player.storage.yb019_zhiyu_ban.push(event.cards[0].name);
			await player.showCards(event.cards);
			await player.give(event.cards[0], event.target);
			if(player.canUse(get.autoViewAs({
				name:event.cards[0].name,
				nature:event.cards[0].nature
			}),event.target,false)){
				await player.useCard({
					name:event.cards[0].name,
					nature:event.cards[0].nature
				},event.target,false);
			}
		},
		ai:{
			order:5,
			result:{
				// player:function(player,target){
					// var card = ui.selected.cards[0];
					// if(card.name=='du') return -2;
					// return 0;
				// },
				target:function(player,target){
					var card = ui.selected.cards[0];
					if(card.name=='cu') return -1;
					else if(card.name=='du') return -2;
					else if(player.canUse(get.autoViewAs({
						name:event.cards[0].name,
						nature:event.cards[0].nature
					}),event.target,false)){
						return get.effect(target,get.autoViewAs({
							name:event.cards[0].name,
							nature:event.cards[0].nature
						}),player,target)+1;
					}
					else {
						return 1;
					}
				}
			}
		},
		subSkill:{
			ban:{
				intro:{
					content:'expansion',
				},
				onremove:true,
				charlotte:true,
			}
		},
	},
	//--------------贾雨桐
	'yb020_shange':{
		audio:'ext:夜白神略/audio/character:2',
	},
	'yb020_wanyue':{
		inherit:'yb001_wanyue',
		audio:'ext:夜白神略/audio/character:2',
	},
	'yb020_yuyun':{
		audio:'ext:夜白神略/audio/character:2',
	},
	yb020_zhishi:{
		audio:'ext:夜白神略/audio/character:2',
	},
	yb020_zhuangrong:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger: {
			global: "phaseBefore",
			player: "enterGame",
		},
		forced: true,
		locked: false,
		filter: function (event, player) {
			return event.name != "phase" || game.phaseNumber == 0;
		},
		content: function () {
			"step 0";
			var i = 0;
			var list = [];
			while (i++ < 2) {
				var card = get.cardPile(function (card) {
					if (get.type(card) != "equip") return false;
					return list.length == 0 || get.subtype(card) != get.subtype(list[0]);
				});
				if (card) list.push(card);
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
			if (event.list.length) event.redo();
		},
		group: "yb020_zhuangrong_damage",
		subSkill:{
			used:{
				init:function(player){
					if(!player.storage.yb020_zhuangrong_used1)player.storage.yb020_zhuangrong_used1=0;
					if(!player.storage.yb020_zhuangrong_used2)player.storage.yb020_zhuangrong_used2=0;
				},
				onremove:function(player,skill){
					delete player.storage.yb020_zhuangrong_used1;
					delete player.storage.yb020_zhuangrong_used2;
				}
			},
			damage:{
				audio:'yb020_zhuangrong',
				trigger:{
					source:'damageAfter',
					player:'damageAfter',
				},
				// forced:true,
				locked:true,
				YB_usable:function(player,i){
					var num1=player.storage.yb020_zhuangrong_used1||0,
						num2=player.storage.yb020_zhuangrong_used2||0;
					var eqs1=player.getCards('e').filter(card=>get.color(card)=='black').length,
						eqs2=player.getCards('e').filter(card=>get.color(card)=='red').length;
					if(i)return [num1,eqs1,num2,eqs2];
					return [eqs1-num1,eqs2-num2];
				},
				init(player){
					player.markSkill('yb020_zhuangrong_damage')
				},
				mark:true,
				intro:{
					content:function(storage,player){
						var list = lib.skill.yb020_zhuangrong_damage.YB_usable(player,true);
						return `<span class=thundertext>${list[0]}/${list[1]}</span>、<span class=firetext>${list[2]}/${list[3]}</span>`
					}
				},
				filter(event,player){
					var list = lib.skill.yb020_zhuangrong_damage.YB_usable(player);
					return list[0]>0||list[1]>0&&player.isDamaged();
				},
				async cost(event, trigger, player) {
					event.result = { bool: true, cost_data: { index: 0 } };
					var list = lib.skill.yb020_zhuangrong_damage.YB_usable(player);
					var list2 = lib.skill.yb020_zhuangrong_damage.YB_usable(player,true);
					if(list[0]>0&&list[1]>0&&player.isDamaged()){
						const { index } = await player
							.chooseControl()
							.set("prompt", "妆容：请选择一项")
							.set("choiceList", ["黑：摸两张牌"+list2[0]+'/'+list2[1], "红：回复1点体力"+list2[2]+'/'+list2[3]])
							.set("ai", function () {
								return 1;
							})
							.forResult();
						event.result = { bool: true, cost_data: { index: index } };
					}
					else if(list[1]>0&&player.isDamaged()){
						event.result = { bool: true, cost_data: { index: 1 } };
					}
					// else {
						// event.result = { bool: false};
					// }
				},
				async content(event, trigger, player) {
					const result = event.cost_data;
					player.addTempSkill('yb020_zhuangrong_used');
					if (result.index == 0) {
						if(!player.storage.yb020_zhuangrong_used1)player.storage.yb020_zhuangrong_used1=0;
						player.storage.yb020_zhuangrong_used1++;
						player.draw(2);
					} else {
						if(!player.storage.yb020_zhuangrong_used2)player.storage.yb020_zhuangrong_used2=0;
						player.storage.yb020_zhuangrong_used2++;
						player.recover();
					}
				},
			},
		}				
	},
	yb020_zhuangrongx:{
		audio:'yb020_zhuangrong',
		trigger:{
			player:['useCard','respond'],
		},
		filter:function(event,player){
			return get.color(event.card)=='red';
		},
		cost(){
			event.result = player.chooseTarget(get.prompt2('yb020_zhuangrongx'),function(card,player,target){
				return target.isDamaged();
			}).set('ai',function(target){
				return get.attitude(_status.event.player,target)>5;
			}).forResult();
		},
		content(){
			targets[0].recover();
		},
		ai:{
			expose:0.3,//跳立场
		},
	},
	//--------------刘域枫
	yb021_shusuan:{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		enable:'phaseUse',
		init:function(player){
			if(!player.storage.yb021_shusuan) player.storage.yb021_shusuan=4;
		},
		// getInfo:function(player){
		// 	if(!player.storage.yb021_shusuan) player.storage.yb021_shusuan=4;
		// 	return player.storage.yb021_shusuan;
		// },
		// mark:true,
		// intro:{
		// 	content:function(storage,player){
		// 		var str='下次数算展示<span class=yellowtext>';
		// 		str+=get.cnNumber(lib.skill.yb021_shusuan.getInfo(player));
		// 		str+='</span>张牌。';
		// 		return str;
		// 	}
		// },
		content:function(){
			'step 0'
			// event.num=lib.skill.yb021_shusuan.getInfo(player);
			event.num=player.storage.yb021_qiujiao||0;
			event.str='牌堆顶';
			event.cards=get.cards(event.num);
			event.str2='手牌';
			event.cards2=player.getCards('h');
			game.cardsGotoOrdering(event.cards);
			'step 1'
			player.storage.yb021_qiujiao=0;

			var dialog=ui.create.dialog('请选择共计四张牌进行24点计算（即使出现无限小数也不要紧，一样可以计算）');
			dialog.add('牌堆顶');
			dialog.add(event.cards);
			dialog.add('手牌');
			dialog.add(event.cards2);
			player.chooseButton(dialog,4,true);
			'step 2'
			event.list66=result.links;
			//将没选的牌放回牌堆顶
			var list=[];
			for(var i=0;i<event.cards.length;i++){
				if(!event.list66.includes(event.cards[i])) list.push(event.cards[i]);
			}
			game.log('!',list);
			list.reverse();
			for(var i=0;i<list.length;i++){
				ui.cardPile.insertBefore(list[i],ui.cardPile.firstChild);
			}

			player.showCards(event.list66);
			player.FY_24(event.list66,'数算');
			'step 3'
			if(result.FY_24=='victoey'){
				player.draw(event.num);
			}
			player.$throw(event.list66);
			player.chooseControl('交出','弃置').set('ai',function(control){
				if(game.hasPlayer(function(current){
					return current!=player&&get.attitude(player,current)>2;
				})) return 0;
				return 1;
			}).set('prompt','将用于计算的牌交给一名其他角色还是弃置？');
			'step 4'
			if(result.index==0){
				player.chooseTarget(function(card,player,target){
					return target!=player;
				}).set('ai',function(current){
					return current!=player&&get.attitude(player,current)>2;
				});
			}
			else{
				player.discard(event.list66,true);
				event.finish();
			}
			'step 5'
			if(result.bool){
				var target=result.targets[0];
				player.line(target,'water');
				target.gain(event.list66,'gain2');
			}
		},
		ai:{
			order:11,
			result:{
				player:1,
			},
			threaten:1.5,//嘲讽值
		},
	},
	yb021_qiujiao:{
		audio:'ext:夜白神略/audio/character:2',
		// usable:1,
		// enable:'phaseUse',
		// group:'yb021_qiujiao_damage',
		// content:function(){
		// 	var next=game.createEvent('yb021_qiujiao');
		// 	next.player=player;
		// 	next.setContent(lib.skill.yb021_qiujiao.num);
		// },
		// subSkill:{
		// 	damage:{
		// 		audio:'yb021_qiujiao',
		// 		trigger:{player:'damageEnd'},
		// 		content:function(){
		// 			var next=game.createEvent('yb021_qiujiao');
		// 			next.player=player;
		// 			next.setContent(lib.skill.yb021_qiujiao.num);
		// 		}
		// 	}
		// },
		// num:function(){
		// 	'step 0'
		// 	if(game.hasPlayer(function(current){
		// 		return current!=player&&current.countCards('he');
		// 	})){
		// 		player.chooseTarget(get.prompt2('yb021_qiujiao'),function(card,player,target){
		// 			return target!=player&&target.countCards('he')>0;
		// 		}).set('ai',function(target){
		// 			var att=get.attitude(_status.event.player,target);
		// 			if(att>0) return Math.sqrt(att)/10;
		// 			return 5-att;
		// 		});
		// 	}
		// 	'step 1'
		// 	if(result.bool){
		// 		var target=result.targets[0];
		// 		event.target=target;
		// 		target.chooseCard('he',true,'求教：将一张牌交给'+get.translation(player));
		// 	}
		// 	else{
		// 		event.finish();
		// 	}
		// 	'step 2'
		// 	event.target.give(result.cards,player,true);
		// 	'step 3'
		// 	var list=lib.skill.yb021_shusuan.getInfo(player);
		// 	list=(list+1);
		// 	player.storage.yb021_shusuan=list;
		// 	player.markSkill('yb021_shusuan');
		// }
		audioname2:{
			ybsl_087tianlu:'yb087_qiujiao',
		},
		group:'yb021_qiujiao_use',
		subSkill:{
			use:{
				enable:'phaseUse',
				usable:1,
				audio:'yb021_qiujiao',
				selectTarget:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('he')>0;
				},
				content:()=>{
					var next=game.createEvent('yb021_qiujiao',false);
					next.player=player;
					next.target=event.targets[0];
					next.setContent(lib.skill.yb021_qiujiao.sword);
					// trigger.setContent(lib.skill.yb021_qiujiao.sword);
				},
				ai:{
					rusult:{
						player:1.1,
						target:function (target){
							return -1;
						},
					}
				}
			}
		},
		trigger:{player:'damageEnd'},
		cost:function(){
			var list=game.filterPlayer(function(current){
				return current!=player&&current.countCards('he')>0;
			});
			event.result = player.chooseTarget(1,function(card,player,target){
				return list.includes(target)
			}).set('prompt','请选择一名其他角色，令其交给你一张牌').set('ai',function(target){
				return get.attitude(player,target);
			}).forResult();
		},
		content:()=>{
			var next=game.createEvent('yb021_qiujiao',false);
			next.player=player;
			next.target=event.targets[0];
			next.setContent(lib.skill.yb021_qiujiao.sword);
		},
		sword:function(){
			'step 0'
			target.chooseToGive('he',true,player,'求教：将一张牌交给'+get.translation(player)+'。');
			'step 1'
			if(!player.storage.yb021_qiujiao)player.storage.yb021_qiujiao=0;
			player.storage.yb021_qiujiao++;
			// var list=lib.skill.yb021_shusuan.getInfo(player);
			// list=(list+1);
			// player.storage.yb021_shusuan=list;
			player.markSkill('yb021_qiujiao');
		},
		mark:true,
		marktext:'知',
		intro:{
			markcount:function(storage,player){
				return storage||0;
			},
			name:'知识点',
		},
		init:function(player){
			player.storage.yb021_qiujiao=0;
		},
	},
	//------------------------盐
	yb022_yiduan:{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		filterTarget:function(card,player,target){
			return player!=target&&target.countCards('h')>0;
		},
		content:function(){
			'step 0'
			event.type=[];
			event.list={};
			var listk=[];
			var listn=[];
			for(var i of lib.inpile){
				if(event[get.type2(i)]!=true){
					event.type.add(get.translation(get.type2(i)));
					var n=get.type2(i);
					event.list[n]=get.type2(i);
					listn.add(n);
					listk.add([n,get.translation(get.type2(i))]);
					event[n]=true;
				}
			};
			event.listk=listk;
			event.listn=listn;
			// event.videoId = lib.status.videoId++;
			// game.broadcastAll(
			// 	function (id, listk) {
			// 		var dialog =ui.create.dialog('<font size=6><b>臆断</b></font><br>选择若干个类型，令其交给你一张符合其中一种类型的手牌，若不执行则受到等量伤害。',[listk,'tdnodes']);
			// 		dialog.videoId = id;
			// 	},
			// 	event.videoId,
			// 	event.listk
			// );
			event.videoId = lib.status.videoId++;
			if (event.isMine()) {
				event.dialog =ui.create.dialog('<font size=6><b>臆断</b></font><br>选择若干个类型，令其交给你一张符合其中一种类型的手牌，若不执行则受到等量伤害。',[listk,'tdnodes']);
				event.dialog.videoId = event.videoId;
			} else if (player.isOnline2()) {
				player.send(
					function (listk,id) {
						var dialog =ui.create.dialog('<font size=6><b>臆断</b></font><br>选择若干个类型，令其交给你一张符合其中一种类型的手牌，若不执行则受到等量伤害。',[listk,'tdnodes']);
						dialog.videoId = id;
					},
					listk,
					event.videoId
				);
			}
			// var dialog=ui.create.dialog('<font size=6><b>臆断</b></font>','forcebutton','hidden');
			// dialog.add('选择若干个类型，令其交给你一张符合其中一种类型的手牌，若不执行则受到等量伤害。');
			// dialog.add([listk,'tdnodes']);
			'step 1'
			var chooseButton=player.chooseButton([1,Infinity],true);
			chooseButton.set('dialog',event.videoId);
			chooseButton.set('ai',function(button){
				if(button.link=='trick')return true;
				return false;
			});
			chooseButton.set('filterButton',function(button){
				var listn = _status.event.getParent().listn;
				for(var i=0;i<ui.selected.buttons.length;i++){
					if(!listn.includes(ui.selected.buttons[i].link)||!listn.includes(button.link)) return false;
				}
				return true;
			});
			
			'step 2'
			game.broadcastAll("closeDialog", event.videoId);
			if(result.links){
				event.lists=result.links;
				game.log(player,'选择了',event.lists)
				event.types=get.YB_map(event.lists,event.list);
				target.chooseCard('h',function(card){
					if(!_status.event.getParent().types.includes(get.type(card))) return false;
					return true;
				}).set('ai',function(card){
					return true;
				})
			}
			else{event.finish();}
			'step 3'
			if(result.cards){
				target.give(result.cards,player);
			}
			else{
				target.damage(event.types.length,player);
			}
		},
		ai:{
			order:5,
			result:{
				player:1,
				target:-1,
			},
			threaten:1.5,//嘲讽值
		},
	},
	yb022_duanxiang:{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		trigger:{global:'damageEnd'},
		check:function(event,player){
			var att=get.attitude(_status.event.player,event.player);
			if(att<0) return true;
			return false;
		},
		content:function(){
			'step 0'
			var num=trigger.num;
			if(trigger.player.countCards('he')>=num*2){
				trigger.player.discardPlayerCard('he',trigger.player,num*2).set('prompt','断想').set('prompt2','请选择'+get.cnNumber(num*2)+'张牌弃置，然后回复'+get.cnNumber(num)+'点体力，<br>否则减少'+get.cnNumber(num)+'点体力上限并摸等量牌。').set('ai',function(button){
					return 100-get.value(button.link);
				});
			}
			'step 1'
			if(result.bool){
				trigger.player.recover(trigger.num);
			}
			else {
				trigger.player.loseMaxHp(trigger.num);
				trigger.player.draw(trigger.num);
			}
		},
	},
	yb022_duanxiangxin:{
		audio:'yb022_duanxiang',
		// usable:1,
		trigger:{global:'damageEnd'},
		filter:(event,player)=>{
			// if(player.hasSkill('yb022_duanxiangxin_mark'))return false;
			if(!event.source||!event.source.isAlive()||!event.player.isAlive())return false;
			var source=event.source,target=event.player;
			var num1=source.countCards('h')-target.hp;
			var num2=target.countCards('h')-source.hp;
			if(num1!=0||num2!=0)return true;
			return false;
		},
		usable:1,
		cost(){
			'step 0'
			event.result = {bool:false,cost_data:null}
			var list = [];
			var trigger = _status.event.getTrigger();
			var source=trigger.source,target=trigger.player;
			var num1=source.countCards('h')-target.hp;
			var num2=target.countCards('h')-source.hp;
			if(num1<0)list.push([1,'令'+get.translation(source)+'将手牌摸'+(-num1)+'张']);
			if(num1>0)list.push([2,'令'+get.translation(source)+'将手牌弃'+(num1)+'张']);
			if(num2<0)list.push([3,'令'+get.translation(target)+'将手牌摸'+(-num2)+'张']);
			if(num2>0)list.push([4,'令'+get.translation(target)+'将手牌弃'+(num2)+'张']);
			
			event.videoId = lib.status.videoId++;
			if (event.isMine()) {
				event.dialog = ui.create.dialog('<font size=6><b>断想</b></font><br>是否选择一项',[list,'tdnodes']);
				event.dialog.videoId = event.videoId;
			} else if (player.isOnline2()) {
				player.send(
					function (list,id) {
						var dialog = ui.create.dialog('<font size=6><b>断想</b></font><br>是否选择一项',[list,'tdnodes']);
						event.dialog.videoId = id;
					},
					list,
					event.videoId
				);
			}
			'step 1'
			player.chooseButton(1)
			.set('dialog',event.videoId)
			.set('ai',function(button){
				var trigger = _status.event.getTrigger();
				var player=_status.event.player;
				var source=trigger.source,target=trigger.player;
				var att1=get.attitude(player,trigger.source),att2=get.attitude(player,trigger.target);
				var num1=source.countCards('h')-target.hp;
				var num2=target.countCards('h')-source.hp;
				if(att1>0&&num1<0){
					if(button.link==1)return true;
				};
				if(att1<0&&num1>0){
					if(button.link==2)return true;
				};
				if(att2>0&&num2<0){
					if(button.link==3)return true;
				};
				if(att2<0&&num2>0){
					if(button.link==4)return true;
				};
				return false;
			}).set('filterButton',function(button){
				return true;
			}).forResult();
			'step 2'
			game.broadcastAll("closeDialog", event.videoId);
			if(result.links)event.result = {bool:true,cost_data:result.links[0]};
		},
		content(){
			var trigger = trigger||_status.event.getTrigger();
			var source=trigger.source,target=trigger.player;
			var num1=source.countCards('h')-target.hp;
			var num2=target.countCards('h')-source.hp;
			switch(event.cost_data){
				case 1:source.draw(-num1);break;
				case 2:source.discardPlayerCard('h',source,num1,true);break;
				case 3:target.draw(-num2);break;
				case 4:target.discardPlayerCard('h',target,num2,true);break;
			}

		},
		// direct:true,
		// content:function(){
		// 	'step 0'
		// 	var list=[];
		// 	event.source=trigger.source;
		// 	event.target=trigger.player;
		// 	var source=_status.event.getTrigger().source,target=_status.event.getTrigger().player;
		// 	var num1=source.countCards('h')-target.hp;
		// 	var num2=target.countCards('h')-source.hp;
		// 	if(num1!=0){
		// 		if(num1<0) {
		// 			var numx=-num1;
		// 			list.push([1,'令'+get.translation(source)+'将手牌摸'+numx+'张']);
		// 		}
		// 		if(num1>0) {
		// 			// var numx=-num1;
		// 			list.push([2,'令'+get.translation(source)+'将手牌弃'+num1+'张']);
		// 		}
		// 	}
		// 	if(num2!=0){
		// 		if(num2<0) {
		// 			var numy=-num2;
		// 			list.push([3,'令'+get.translation(target)+'将手牌摸'+numy+'张']);
		// 		}
		// 		if(num2>0) {
		// 			// var numy=-num1;
		// 			list.push([4,'令'+get.translation(target)+'将手牌弃'+num2+'张']);
		// 		}
		// 	}
		// 	event.videoId = lib.status.videoId++;
		// 	game.broadcastAll(
		// 		function (id, list) {
		// 			var dialog=ui.create.dialog('<font size=6><b>断想</b></font><br>是否选择一项',[list,'tdnodes']);
		// 			dialog.videoId = id;
		// 		},
		// 		event.videoId,
		// 		list
		// 	);
		// 	var chooseButton=player.chooseButton(event.videoId,[0,1]);
		// 	chooseButton.set('ai',function(button){
		// 		var trigger = _status.event.getTrigger();
		// 		var player=_status.event.player;
		// 		var att1=get.attitude(player,trigger.source),att2=get.attitude(player,trigger.target);
		// 		if(att1>0&&num1<0){
		// 			if(button.link==1)return true;
		// 		};
		// 		if(att1<0&&num1>0){
		// 			if(button.link==2)return true;
		// 		};
		// 		if(att2>0&&num2<0){
		// 			if(button.link==3)return true;
		// 		};
		// 		if(att2<0&&num2>0){
		// 			if(button.link==4)return true;
		// 		};
		// 		return false;
		// 	}).set('filterButton',function(button){
		// 		return true;
		// 	}).set('filterOk',function(){
		// 		return ui.selected.buttons.length>0;
		// 	});
		// 	event.numo=(numx||num1);
		// 	event.nump=(numy||num2);
		// 	'step 1'
		// 	game.broadcastAll("closeDialog", event.videoId);
		// 	if(result.links){
		// 		player.addTempSkill('yb022_duanxiangxin_mark');
		// 		player.logSkill('yb022_duanxiangxin');
		// 		switch(result.links[0]){
		// 			case 1:event.source.draw(event.numo);break;
		// 			case 2:event.source.discardPlayerCard('h',event.source,event.numo,true);break;
		// 			case 3:event.target.draw(event.nump);break;
		// 			case 4:event.target.discardPlayerCard('h',event.target,event.nump,true);break;
		// 		}
		// 	}
		// },
		// subSkill:{
		// 	mark:{
		// 		onremove:true,
		// 	}
		// }
	},
	/*
	'yb022_duanxiangxin':'断想',
	'yb022_duanxiangxin_info':'每回合限一次，当有角色受到伤害后，<br>①若伤害来源的手牌数不等于受伤角色的体力值，你可令伤害来源将手牌调整至受伤角色的体力值；<br>②若受伤角色的手牌数不等于伤害来源的体力值，你可令受伤角色将手牌调整至伤害来源的体力值。',
	*/
	//--------------023
	yb023_jiang:{
		audio:'ext:夜白神略/audio/character:2',

	},
	yb023_fenghou:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:'damageEnd',
			source:'damageSource',
		},
		filter(event,player){
			return event.player.countCards('h')>0;
		},
		async content(event,trigger,player){
			var target = trigger.player;
			var result = await player.choosePlayerCard(
				'展示'+get.translation(target)+'的一张手牌，若为红色，这张牌视为血杀，否则弃置之，你摸两张牌。',target, true, "h"
			).set('ai',function(button){
				var trigger = _status.event.getTrigger();
				var att = get.attitude(_status.event.player,trigger.player);
				if(att>0)return -get.value(button.link);
				return get.value(button.link)&&!button.link.hasGaintag(yb023_fenghou);
			}).forResult();
			if(result.bool){
				await target.showCards(result.cards);
				if(get.color(result.cards[0])=='red'){
					target.addSkill("yb023_fenghou_viewas");
					target.addGaintag(result.cards, "yb023_fenghou");
				}
				else {
					await target.modedDiscard(result.cards).set("discarder", player);
					await player.draw(2);
				}
			}
		},
		subSkill: {
			viewas: {
				mod: {
					cardname(card) {
						if (get.itemtype(card) == "card" && card.hasGaintag("yb023_fenghou")) {
							return "sha";
						}
					},
					cardnature(card) {
						if (get.itemtype(card) == "card" && card.hasGaintag("yb023_fenghou")) {
							return 'YB_blood';
						}
					},
				},
				charlotte: true,
			},
		},
	},
	//--------------024
	ybsl_tang_used:{
		trigger: {
			player:'useCard1',
		},
		// forecd:true,
		cardSkill: true,
		filter:function(event,player){
			var cards=event.cards;
			if(!cards.length)return false;
			for(var i of cards){
				if(i.name!='ybsl_tang')return false;
			}
			return player.countCards('h')>0;
		},
		forced: true,
		popup: false,
		content(){
			'step 0'
			player.chooseCard('h',true).set('prompt2','请选择一张手牌加入此牌实体牌');
			'step 1'
			if(result.cards){
				game.log(player,'将',"#y"+get.translation(result.cards[0]),'加入了',"#y"+get.translation(trigger.card),'的实体牌中')
				player.lose(result.cards[0],"visible");
				trigger.cards.push(result.cards[0]);
			}
			else{
				event.goto(4);
			}
			'step 2'
			var cards=trigger.cards;
			for(var i of cards){
				if(i.name!='ybsl_tang')event.goto(4);
			}
			'step 3'
			event.goto(0);
			'step 4'
			var cards=trigger.cards;
			var num=cards.filter(function (i) {
				return i.name == "ybsl_tang";
			}).length;
			trigger.baseDamage=num;
		}
	},
	//--------------025
	
	// //-----------------------史庆宇（待写）
	// 'yb025_shiyuan':'释元',
	// 'yb025_shiyuan_info':'出牌阶段限一次，你可以弃置任意张手牌，然后摸等量牌，然后你可以失去等量体力再摸等量牌。',
	yb025_shiyuan:{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		mod: {
			aiOrder(player, card, num) {
				if (num <= 0 || get.itemtype(card) !== "card" || get.type(card) !== "equip") return num;
				let eq = player.getEquip(get.subtype(card));
				if (eq && get.equipValue(card) - get.equipValue(eq) < Math.max(1.2, 6 - player.hp)) return 0;
			},
		},
		locked: false,
		position: "he",
		filterCard: true,
		selectCard: [1, Infinity],
		prompt: "弃置任意张牌并摸等量的牌",
		check(card) {
			return 6 - get.value(card);
		},
		content:async function(event, trigger, player) {
			var num=event.cards.length;
			await player.draw(num);
			if(player.hp>=num){
				var result=await player.chooseBool().set('ai',function(){
					if(player.hp-num>1) return true;
					else return false;
				}).set('prompt','是否失去'+num+'点体力，然后再摸'+num+'张牌').forResult();
				if(result.control=='是'){
					await player.loseHp(num);
					await player.draw(num);
				}
			}
		},
		ai: {
			order: 1,
			result: {
				player: 1,
			},
			threaten: 1.5,
		},
	},
	// yb025_tuiqiao:'蜕壳',
	// yb025_tuiqiao_info:'锁定技，准备阶段，若你有大于3点的空血条，则你失去3点体力上限，然后摸三张牌。',
	yb025_tuiqiao:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:'phaseZhunbeiBegin',
		},
		filter:function(event,player){
			return player.maxHp-player.hp>=3;
		},
		content:async function(event, trigger, player) {
			await player.loseMaxHp(3);
			await player.draw(3);					
		},
	},
	yb025_chengyin:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'loseMaxHpAfter',
		},
		filter:function(event,player){
			if(game.countPlayer(function(current){
				return current!=player;
			})>=1)return true;
		},
		// async cost(event, trigger, player) {
		// 	var list=game.filterPlayer(function(current){
		// 		return current!=player;
		// 	});
		// 	event.result = await player.chooseTarget(1,function(card,player,target){
		// 		return list.includes(target)
		// 	}).set('prompt','请选择一名其他角色，令其获得1点护甲').set('ai',function(target){
		// 		return get.attitude(player,target);
		// 	}).forResult();
		// },
		cost:function() {
			var list=game.filterPlayer(function(current){
				return current!=player;
			});
			event.result = player.chooseTarget(1,function(card,player,target){
				return list.includes(target)
			}).set('prompt','请选择一名其他角色，令其获得'+trigger.num+'点护甲').set('ai',function(target){
				return get.attitude(player,target);
			}).forResult();
		},
		// direct:true,
		// locked:false,
		content:async function(event, trigger, player) {
			var target=event.targets[0];
			await target.changeHujia(trigger.num)
		},
		
	},
	// yb025_chengyin:'成荫',
	// yb025_chengyin_info:'当你失去体力上限后，你可以令一名其他角色增加等量护甲。',
	// yb025_chengyinx:'成荫',
	// yb025_chengyinx_info:'锁定技，当有牌指定包括你在内的多个目标时，且你不是此牌使用者，
	// 你令所有体力值不大于你的角色取消成为目标，然后此牌额外对你结算等量次。。',
	yb025_chengyinx:{
		audio:'yb025_chengyin',
		trigger:{
			target:'useCardToTargeted',
		},
		filter:function(event,player){
			if(event.player==player)return false;
			// if(!event.targets.includes(player))return false;
			if(event.targets.length<=1)return false;
			return true;
		},
		forced:true,
		content:function(){
			'step 0'
			var targets=trigger.targets;
			var num=0;
			for(var i of targets){
				if(i.hp<=player.hp&&i!=player){
					trigger.getParent().excluded.add(i);
					num++;
				}
			}
			event.num=num;
			'step 1'
			var list=[];
			for(var i=0;i<event.num;i++){
				list.push(player);
			}
			trigger.getParent().targets = trigger.getParent().targets.concat(list);
			trigger.getParent().triggeredTargets4 = trigger.getParent().triggeredTargets4.concat(list);
		},
		
	},

	// //-----------------------史庆宇王贺（）
	yb025_choujiang:{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		selectCard:1,
		filterCard:function(card){
			return get.number(card);
		},
		check:function(card){
			return 6-get.value(card);
		},
		position:'he',
		content:function(){
			'step 0'
			event.num=get.number(event.cards[0])-1;
			event.cards=get.cards(13);
			game.cardsGotoOrdering(event.cards);
			'step 1'
			ui.clear();
			event.cardlist=[];
			// var dialog = ui.create.dialog("抽奖", cards.map(function(card){
			// 	if(event.cardlist.includes(card)){
			// 		// return {card:card,prompt:'已点亮'};
			// 		return card.querySelector(".info").innerHTML='已点亮亮'
			// 	}
			// 	else {
			// 		return card;
			// 	}
			// }), true);
			var dialog = ui.create.dialog('抽奖',cards,true);
			_status.dieClose.push(dialog);
			dialog.videoId = lib.status.videoId++;
			game.addVideo("cardDialog", null, ["抽奖", get.cardsInfo(cards), dialog.videoId]);
			event.getParent().preResult = dialog.videoId;
			event.dialog=dialog;
			game.delay(1);
			// game.log(dialog.buttons)
			'step 2'
			var numb=0;
			var button;
			while(numb<13){
				numb++;
				var cardx=event.cards[num];
				if(event.cardlist.includes(cardx))break;
				else{
					event.cardlist.push(cardx);
					// game.addGlow(cardx);
					// cardx.classList.add('YB_glow');
					// $(cardx).addClass('YB_glow');
					// cardx.glow_result=true;
					// cardx.querySelector(".info").innerHTML='已点亮';
					// dialog.buttons[num].querySelector(".info").innerHTML='已点亮';
					// cardx.addText('已点亮',{y:-0.5,color:'green'});
					// cardx.style = 'YB_glow';
					num=get.number(cardx)-1;
				}
			}
			'step 3'
			// event.cardlist=cardlist;
			// var cards=event.cards;
			// event.dialog = ui.create.dialog("抽奖", cards.map(function(card){
			// 	if(event.cardlist.includes(card)){
			// 		return {card:card,style:'glow'};
			// 	}
			// 	else {
			// 		return card;
			// 	}
			// }), true);
			// ui.refresh();
			// var dialog = ui.create.dialog("抽奖", cardlist, true);
			// _status.dieClose.push(dialog);
			// dialog.videoId = lib.status.videoId++;
			// game.addVideo("cardDialog", null, ["抽奖", get.cardsInfo(cards), dialog.videoId]);
			// event.getParent().preResult = dialog.videoId;
			// event.dialog=dialog;
			game.delay(5);
			'step 4'
			player.chooseTarget(`请选择将${get.YB_tobo(event.cardlist)}交给一名角色`).set('ai',function(target){
				var atk=get.attitude(player,target);
				return atk;
			});
			'step 5'
			if(result.targets){
				var cardlist=event.cardlist;
				var cardlist2=event.cards.filter(function(cardf){
					return !cardlist.includes(cardf);
				})
				player.discard(cardlist2);
				result.targets[0].gain(cardlist,'gain2');

			}
			'step 6'
			event.dialog.close();
			_status.dieClose.remove(event.dialog);
			game.addVideo("cardDialog", null, event.preResult);
		},
	},
	yb025_haodu:{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		selectCard:[1,13],
		complexCard:true,
		filterCard:function(card){
			var number=get.number(card);
			for(var i=0;i<ui.selected.cards.length;i++){
				if(get.number(ui.selected.cards[i])==number) return false;
			}
			return get.number(card);
		},
		check:function(card){
			return 6-get.value(card);
		},
		position:'h',
		content:async function(event, trigger, player) {
			var lista=[];
			for(var i of event.cards){
				lista.push(get.number(i));
			}
			// list.sort(function(a,b){
			// 	return b-a;
			// })
			var cardsx=get.cards(13);
			await game.cardsGotoOrdering(cardsx);

			ui.clear();
			// event.cardlist=[];
			var cardlist=[];
			for(var z of lista){
				// if(cardsx[k]==card)	return {card:card,style:'glow'};
				// else return card;
				cardlist.push(cardsx[z-1]);
			}
			var dialog = ui.create.dialog('豪赌',cardsx,true);
			// var dialog = ui.create.dialog("豪赌", cardsx.map(function(card){
			// 	for(var k of lista){
			// 		if(cardsx[k]==card)	return {card:card,style:'glow'};
			// 		else return card;
					
			// 	}
			// 	// if(cardlist.includes(card)){
			// 	// 	// return {card:card,prompt:'已点亮'};
			// 	// 	// return card.querySelector(".info").innerHTML='已点亮亮'
			// 	// 	return {card:card,style:'glow'};
			// 	// }
			// 	// else {
			// 	// 	return card;
			// 	// }
			// }), true);
			_status.dieClose.push(dialog);
			dialog.videoId = lib.status.videoId++;
			game.addVideo("cardDialog", null, ["豪赌^", get.cardsInfo(cardsx), dialog.videoId]);
			event.getParent().preResult = dialog.videoId;
			// event.dialog=dialog;
			await game.delay(3);
			await player.gain(cardlist,'gain2');
			dialog.close();
			_status.dieClose.remove(dialog);
			game.addVideo("cardDialog", null, event.preResult);
		},
	},
	yb025_zanzhu:{
		audio:'ext:夜白神略/audio/character:2',
		group:'yb025_zanzhu_use',
		subSkill:{
			use:{
				enable:'phaseUse',
				usable:1,
				audio:'yb025_zanzhu',
				selectTarget:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('he')>0;
				},
				content:()=>{
					var next=game.createEvent('yb025_zanzhu',false);
					next.player=player;
					next.target=event.targets[0];
					next.setContent(lib.skill.yb025_zanzhu.sword);
					// trigger.setContent(lib.skill.yb025_zanzhu.sword);
				},
				ai:{
					rusult:{
						player:1.1,
						target:function (target){
							return target.countCards('he')-2.5;
						},
					}
				}
			}
		},
		trigger:{player:'damageEnd'},
		cost:function(){
			var list=game.filterPlayer(function(current){
				return current!=player&&current.countCards('he')>0;
			});
			event.result = player.chooseTarget(1,function(card,player,target){
				return list.includes(target)
			}).set('prompt','请选择一名其他角色，令其交给你一张牌，然后其摸一张牌').set('ai',function(target){
				if(get.attitude(player,target)<0) return get.attitude(player,target)*(target.countCards('he')-2.5);
				else return get.attitude(player,target)*target.countCards('he');
			}).forResult();
		},
		content:()=>{
			var next=game.createEvent('yb025_zanzhu',false);
			next.player=player;
			next.target=event.targets[0];
			next.setContent(lib.skill.yb025_zanzhu.sword);
		},
		sword:function(){
			'step 0'
			target.chooseToGive('he',true,player,'赞助：将一张牌交给'+get.translation(player)+'然后你摸一张牌');
			'step 1'
			if(result.cards){
				target.draw();
			}
		},
	},
	// yb025_zanzhu:'赞助',
	// yb025_zanzhu_info:'出牌阶段限一次或当你受到伤害后，你可令一名其他角色交给你一张牌，然后其摸一张牌。',

	//---------------散梦系武将
	//----------------------入梦者通用技能
	'ybsl_sanmeng':{//----------散梦
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseZhunbeiBegin',
		},
		groupSkill:'YB_dream',
		direct:true,
		filter:function(event,player){
			return player.group=='YB_dream';
		},
		audioname:[
			'ybsl_014liutianyu','ybsl_026can','ybsl_027rain','ybsp_027rain',
			'ybsl_029dawn',
			'ybsl_018huanqing','ybsl_034zhoulianyuan','ybnb_034zhoulianyuan',
			'ybsl_036bright',
			'ybsl_037diamondqueen','ybsl_038tengwu','db_ybsp_038tengwu','ybsl_039zhafu',
			'db_ybsl_067snake','ybsl_069xiangzi','ybsl_076zhujun',
			'ybsl_077yangqixu','ybsb_077yangqixu','ybsl_078zhuyahai','ybsl_083xiaozhu',
			'ybsl_122wangbingyu',
		],
		// audioname2:{
		// 	'ybslshen_014liutianyu':'yb014_sanmeng',
		// 	'ybsl_026can':'yb026_sanmeng',
		// 	'ybsl_027rain':'yb027_sanmeng',
		// 	'ybsp_027rain':'yb027_sanmeng',
		// 	'ybsl_029dawn':'yb029_sanmeng',
		// 	'ybsl_018huanqing':'yb018_sanmeng',
		// 	'ybsl_034zhoulianyuan':'yb034_sanmeng',
		// 	'ybnb_034zhoulianyuan':'yb034_sanmeng',
		// 	'ybsl_036bright':'yb036_sanmeng',
		// 	'ybsl_037diamondqueen':'yb037_sanmeng',
		// 	'db_ybsl_038tengwu':'yb038_sanmeng',
		// 	'db_ybsp_038tengwu':'yb038_sanmeng',
		// 	'ybsl_039zhafu':'yb039_sanmeng',
		// 	'db_ybsl_067snake':'yb067_sanmeng',
		// 	'ybsl_069xiangzi':'yb069_sanmeng',
		// 	'ybsl_076zhujun':'yb076_sanmeng',
		// 	'ybsl_077yangqixu':'yb077_sanmeng',
		// 	'ybsb_077yangqixu':'yb077_sanmeng',
		// 	'ybsl_078zhuyahai':'yb078_sanmeng',
		// 	'ybsl_083xiaozhu':'yb083_sanmeng',
		// },
		content:function (){
			'step 0'
			player.chooseControl('是','cancel2').set('prompt','是否摸两张牌，令本回合手牌上限-1').set('ai',function(){
				if(player.hasJudge('lubu')){
					return 'cancel2';
				}
				return '是';
			});
			'step 1'
			if(result.control=='cancel2'){
				event.finish();return;
			}
			player.logSkill('ybsl_sanmeng');
			player.draw(2);
			player.addTempSkill('ybsl_sanmeng_buff');
		},
		group:'ybsl_sanmeng_add',
		subSkill:{
			buff:{
				mark:true,
				marktext:'散',
				intro:{
					content:'本回合手牌上限-1',
				},
				mod:{
					maxHandcard:function (player,num){
						return num-1;
					},
				},
				sub:true,
			},
			add:{
				audio:'ybsl_sanmeng',
				filter:function(event,player){
					return player.group=='YB_dream';
				},
				trigger:{
					player:'phaseDiscardBefore',
				},
				groupSkill:'YB_dream',
				direct:true,
				content:function(){
					'step 0'
					// if(player.countDiscardableCards('he')>=2){
						player.chooseToDiscard(2,'he').set('prompt','是否弃置两张牌，令手牌上限+1？'
						).set('ai',function(card){
							var trigger = _status.event.getTrigger();
							var player = _status.event.player;
							if(trigger.player.countCards('h')-2>=trigger.player.getHandcardLimit())return -get.value(card);
							else return 6-get.value(card);
						});

					// }
					'step 1'
					if(result.bool){
						player.logSkill('ybsl_sanmeng_add')
						// player.removeSkill('ybsl_sanmeng_buff');
						lib.skill.chenliuwushi.change(player,1);
					}
				},
			},
		
		},
	},
	//-------------------蚕
	'yb026_xiaoye':{
		audio:'ext:夜白神略/audio/character:2',
		direct:true,
		trigger:{
			target:'useCardToTargeted',
		},
		filter:function (event,player){
			return (event.card.name=='sha');
		},
		content:function (){
			'step 0'
			player.chooseControl('摸一张牌','弃一张牌','cancel2').set('prompt',get.prompt2('yb026_xiaoye')).set('ai',function(){
				return '摸一张牌';
			});
			'step 1'
			// game.log(trigger.player,trigger.target);
			if(result.control!='cancel2'){
				player.logSkill('yb026_xiaoye');
				if(result.control=='摸一张牌'){
					player.draw();
					event.goto(2);
				}
				else if(result.control=='弃一张牌'){
					player.chooseToDiscard(true,'he');
					event.goto(3);
				}
			}
			'step 2'
			if(!player.hasSkill('yb026_xiaoye_dr')&&player.countCards('h')<trigger.player.countCards('h')){
				player.addTempSkill('yb026_xiaoye_dr');
				trigger.getParent().excluded.add(player);
				event.finish();
			}
			else{
				event.finish();
			}
			'step 3'
			if(!player.hasSkill('yb026_xiaoye_di')&&player.countCards('h')<trigger.player.countCards('h')){
				player.addTempSkill('yb026_xiaoye_di');
				trigger.getParent().excluded.add(player);
				event.finish();
			}
			else{
				event.finish();
			}
		},
		subSkill:{
			dr:{
				mark:true,
				marktext:'摸',
				charlotte:true,
				onremove:true,
				sub:true,
			},
			di:{
				mark:true,
				marktext:'弃',
				charlotte:true,
				onremove:true,
				sub:true,
			},
		},
	},
	'yb026_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	//---------------------雨027
	'yb027_jisi':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'phaseDrawAfter',
		},
		// direct:true,
		check:function(event,player){
			if(get.attitude(player,event.player)>0) return false;
			return true;
		},
		filter:function(event,player){
			if(event.player==player)return false;
			if(event.player.countCards('h')<=player.countCards('h'))return false;
			return true;
		},
		content:function(){
			'step 0'
			player.gainPlayerCard('he',trigger.player,true);
			'step 1'
			if(trigger.player.countCards('h')>player.countCards('h')){
				player.chooseControl('继续','cancel2').set('prompt','是否继续发动汲丝？').set('prompt2','获得'+get.translation(trigger.player)+'的一张手牌。');
			}
			// else{event.finish();}
			'step 2'
			if(result.control=='继续'){event.goto(0);}
			else{event.finish();}
		},
	},
	'yb027_mili':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			target:'useCardToTargeted',
		},
		filter:function(event,player){
			if(event.player!=player)return true;
		},
		content:function(){
			trigger.player.addMark('yb027_mili_mark');
		},
		forced:true,
		group:['yb027_mili_mili'],
		subSkill:{
			mark:{
				mark:true,
				marktext:'迷',
				charlotte:true,
				intro:{
					name:'迷离',
					content:"mark",
				},
			},
			mili:{
				trigger:{
					global:'phaseAfter',
				},
				forced:true,
				filter:function(event,player){
					if(event.player==player)return false;
					if(event.player.countMark('yb027_mili_mark')<=0)return false;
					return true;
				},
				content:function(){
					var num=trigger.player.countMark('yb027_mili_mark');
					trigger.player.removeMark('yb027_mili_mark',num);
					player.draw(num);
					// player.addTempSkill('diaohulishan');
				},
			},
		},
	},
	// yb027_milixx:{//没写完呢，别私自加
		// audio:'ext:夜白神略/audio/character:2',
		// trigger:{
			// global:['useCard'],
			// // player:['useCard'],
			// // target:['useCardToTargeted'],
		// },
		// forced:true,
		// init:function(player){
			// player.storage.yb027_milixx=[];
		// },
		// filter:(event,player,name)=>{
			// if(get.type(event.card)!='basic'||get.type(event.card)!='trick')return false;
			// if(event.player==player&&event.targets.includes(player))
			// // if(name=='useCardToTargeted'&&event.source==player)return false;
			// if(player.storage.yb027_milixx.includes(event.card.name)) return false;
			// // return !event.YB_mili;
		// },
		// content:function(){
			// 'step 0'
			// player.storage.yb006_boxue.push(trigger.card.name);
			// game.log(player,'记录了',get.translation(trigger.card.name))
		// },
		// mark:true,
		// intro:{
			// content:function(event,player,storage,name,skill){
				// var str='已记录了';
				// str+=get.translation(player.storage.yb027_milixx);
				// return str;
			// }
		// }
	// },
	// 'yb027_milixx_info':'锁定技，当你使用基本或普通锦囊牌时，或当你被其他角色使用基本或普通锦囊指定为目标时，若此牌未被记录，你记录之。每回合限一次，当你使用基本或普通锦囊时，或成为其他角色使用基本或普通锦囊的目标时，若已有记录，你可以令此牌的效果改为你记录的另一张牌的效果（同时移除此记录），本次使用牌不会被主技能记录。',
	'yb027_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	//---------------------晶028
	'yb028_jianzhen':{
		audio:'ext:夜白神略/audio/character:2',
		superCharlotte:true,
		charlotte:true,
		group:'yb028_jianzhen_use',
		subSkill:{
			use:{
				enable:'phaseUse',
				usable:1,
				audio:'yb028_jianzhen',
				superCharlotte:true,
				charlotte:true,
				content:()=>{
					player.draw();
					var next=game.createEvent('yb028_jianzhen',false);
					next.player=player;
					next.setContent(lib.skill.yb028_jianzhen.sword);
					// trigger.setContent(lib.skill.yb028_jianzhen.sword);
				},
			}
		},
		trigger:{player:'damageEnd'},
		content:()=>{
			player.draw();
			var next=game.createEvent('yb028_jianzhen',false);
			next.player=player;
			next.setContent(lib.skill.yb028_jianzhen.sword);
		},
		sword:function(){
			'step 0'
			var list=['jin','tu','huo','shui','mu'];
			var list3=['金剑元（武器栏）','土剑元（防具栏）','火剑元（进攻马）','水剑元（防御马）','木剑元（宝物栏）'];
			var list2=[];
			for(var i=0;i<list.length;i++){
				if(!player.hasSkill('yb_jianyuan_'+list[i])){
					list2.add(['yb_jianyuan_'+list[i],list3[i]]);
				}
			}
			if(list2.length<1){event.finish();}
			else{
				var cards=player.getCards('h');
				player.chooseButton(2,[
					'剑阵',
					cards,
					[list2,'tdnodes'],
				]).set('filterButton',function(button){
					var type=typeof button.link;
					if(ui.selected.buttons.length&&type==typeof ui.selected.buttons[0].link) return false;
					return true;
				}).set('ai',function(button){
					var type=typeof button.link;
					if(type=='object') return 6-get.value(button.link);
				});
			}
			'step 1'
			if(result.bool){
				if(typeof result.links[0]!='string') result.links.reverse();
				var card=result.links[1],choice=result.links[0];
				player.addToExpansion(card,'gain2').gaintag.add(choice);
				if(choice){
					if(choice=='yb_jianyuan_jin'&&!player.isDisabled(1))player.disableEquip('equip1');
					if(choice=='yb_jianyuan_tu'&&!player.isDisabled(2))player.disableEquip('equip2');
					if(choice=='yb_jianyuan_shui'&&!player.isDisabled(3))player.disableEquip('equip3');
					if(choice=='yb_jianyuan_huo'&&!player.isDisabled(4))player.disableEquip('equip4');
					if(choice=='yb_jianyuan_mu'&&!player.isDisabled(5))player.disableEquip('equip5');
				}
				player.addSkill(choice);
			}
		},
	},
	/*
	yb_jianyuan_jin_info:'锁定技，你的攻击范围加2；当你使用杀时，你无视对方防具。当你造成伤害时，你可以移除金剑元，令伤害+1。',
	yb_jianyuan_mu_info:'当你失去最后的手牌时，你可以摸一张牌，然后你可以移除木剑元并摸等同体力上限的牌数。',
	yb_jianyuan_shui_info:'当你成为其他角色使用【杀】的目标时，你可以依次选择是否①弃置一张牌，将此杀【流离】出去；②移除水剑元，然后与一名可成为【流离】目标的其它角色互换座位。',
	yb_jianyuan_huo_info:'出牌阶段限一次，你可以将所有手牌当任意锦囊使用。当你使用牌指定目标后，你可以移除火剑元，弃置此牌目标各一张牌。',
	yb_jianyuan_tu_info:'你可以将一张装备牌当【无中生有】使用。当你受到伤害时，你可以移除土剑元，令伤害-1。',
	*/
	yb_jianyuan_jin:{
		forced:true,
		mod:{
			attackRange:function(player,num){
				return num+2;
			},
		},
		mark:true,
		marktext:'金',
		intro:{
			name:'金剑元',
			// content:'expansion',
			// markcount:'expansion',
			mark:function(dialog,storage,player){
				if(player.getExpansions('yb_jianyuan_jin')){
					var content=player.getExpansions('yb_jianyuan_jin');
					dialog.addAuto(content);
					dialog.addText('锁定技，你的攻击范围加2；当你使用杀时，你无视对方防具。<span class=yellowtext>当你造成伤害时，你可以移除金剑元，令伤害+1。</span>');
				}
				else{dialog.addText('你现在并没有金剑元');}
			},
		},
		nobracket:true,
		onremove:function(player,skill){
			var cards=player.getExpansions(skill);
			if(cards.length) player.loseToDiscardpile(cards);
			player.unmarkSkill(skill);
		},
		inherit:'qinggang_skill',
		group:'yb_jianyuan_jin_remove',
		subSkill:{
			remove:{
				trigger:{
					source:'damageBegin1',
				},
				prompt:'是否移除金剑元，令此伤害+1',
				content:function(){
					player.removeSkill('yb_jianyuan_jin');
					trigger.num++;
				},
			}
		}
	},
	yb_jianyuan_mu:{
		trigger:{
			player:'loseAfter',
			global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
		},
		zhuijia:['是否移除木剑元，然后摸等同体力上限数量的牌'],
		frequent:true,
		filter:function(event,player){
			if(player.countCards('h')) return false;
			var evt=event.getl(player);
			return evt&&evt.player==player&&evt.hs&&evt.hs.length>0;
		},
		mark:true,
		marktext:'木',
		intro:{
			name:'木剑元',
			// content:'expansion',
			// markcount:'expansion',
			mark:function(dialog,storage,player){
				if(player.getExpansions('yb_jianyuan_jin')){
					var content=player.getExpansions('yb_jianyuan_mu');
					dialog.addAuto(content);
					dialog.addText('当你失去最后的手牌时，你可以摸一张牌，<span class=yellowtext>然后你可以移除木剑元并摸等同体力上限的牌数。</span>');
				}
				else{dialog.addText('你现在并没有木剑元');}
			},
		},
		nobracket:true,
		onremove:function(player,skill){
			var cards=player.getExpansions(skill);
			if(cards.length) player.loseToDiscardpile(cards);
			player.unmarkSkill(skill);
		},
		content:function(){
			'step 0'
			player.draw();
			player.chooseBool(get.prompt('yb_jianyuan_mu',player),lib.skill.yb_jianyuan_mu.zhuijia);
			'step 1'
			if(result.bool){
				player.removeSkill('yb_jianyuan_mu');
				player.draw(player.maxHp);
			}
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
	yb_jianyuan_tu:{
		mark:true,
		marktext:'土',
		intro:{
			name:'土剑元',
			// content:'expansion',
			// markcount:'expansion',
			mark:function(dialog,storage,player){
				if(player.getExpansions('yb_jianyuan_jin')){
					var content=player.getExpansions('yb_jianyuan_tu');
					dialog.addAuto(content);
					dialog.addText('你可以将一张装备牌当【无中生有】使用。<span class=yellowtext>当你受到伤害时，你可以移除土剑元，令伤害-1。</span>');
				}
				else{dialog.addText('你现在并没有土剑元');}
			},
		},
		nobracket:true,
		onremove:function(player,skill){
			var cards=player.getExpansions(skill);
			if(cards.length) player.loseToDiscardpile(cards);
			player.unmarkSkill(skill);
		},
		enable:['chooseToUse'],
		filterCard:function(card,player){
			return get.type(card)=='equip';
		},
		position:'hes',
		viewAs:{name:'wuzhong'},
		viewAsFilter:function(player){
			if(!player.countCards('hes',{type:'equip'})) return false;
		},
		prompt:'将一张装备牌当无中生有使用',
		check:function(card){
			var val=get.value(card);
			if(_status.event.name=='chooseToRespond') return 1/Math.max(0.1,val);
			return 5-val;
		},
		group:'yb_jianyuan_tu_remove',
		subSkill:{
			remove:{
				trigger:{
					player:'damageBegin3',
				},
				prompt:'是否移除土剑元，令此伤害-1',
				content:function(){
					player.removeSkill('yb_jianyuan_tu');
					trigger.num--;
				},
			}
		}
	},
	yb_jianyuan_huo:{
		mark:true,
		marktext:'火',
		intro:{
			name:'火剑元',
			// content:'expansion',
			// markcount:'expansion',
			mark:function(dialog,storage,player){
				if(player.getExpansions('yb_jianyuan_jin')){
					var content=player.getExpansions('yb_jianyuan_huo');
					dialog.addAuto(content);
					dialog.addText('出牌阶段限一次，你可以将所有手牌当任意锦囊使用。<span class=yellowtext>当你使用牌指定目标后，你可以移除火剑元，弃置此牌目标各一张牌。</span>');
				}
				else{dialog.addText('你现在并没有火剑元');}
			},
		},
		nobracket:true,
		onremove:function(player,skill){
			var cards=player.getExpansions(skill);
			if(cards.length) player.loseToDiscardpile(cards);
			player.unmarkSkill(skill);
		},
		inherit:'qice',
		audio:false,
		group:'yb_jianyuan_huo_remove',
		subSkill:{
			remove:{
				trigger:{
					player:'useCard',
				},
				prompt:'是否移除火剑元，弃置此牌目标各一张牌',
				filter:function(event,player){
					if(!event.targets||event.targets.length<1)return false;
					return true;
				},
				content:function(){
					'step 0'
					player.removeSkill('yb_jianyuan_huo');
					var targets=trigger.targets;
					for (var i of targets){
						player.discardPlayerCard(i,'he',1,true);
					}
				}
			}
		}
	},
	yb_jianyuan_shui:{
		mark:true,
		marktext:'水',
		intro:{
			name:'水剑元',
			// content:'expansion',
			// markcount:'expansion',
			mark:function(dialog,storage,player){
				if(player.getExpansions('yb_jianyuan_jin')){
					var content=player.getExpansions('yb_jianyuan_shui');
					dialog.addAuto(content);
					dialog.addText('当你成为其他角色使用【杀】的目标时，你可以依次选择是否①弃置一张牌，将此杀【流离】出去；<span class=yellowtext>②移除水剑元，然后与一名可成为【流离】目标的其它角色互换座位。</span>');
				}
				else{dialog.addText('你现在并没有水剑元');}
			},
		},
		nobracket:true,
		onremove:function(player,skill){
			var cards=player.getExpansions(skill);
			if(cards.length) player.loseToDiscardpile(cards);
			player.unmarkSkill(skill);
		},
		trigger:{target:'useCardToTarget'},
		direct:true,
		preHidden:true,
		filter:function(event,player){
			if(event.card.name!='sha') return false;
			return game.hasPlayer(function(current){
				return player.inRange(current)&&current!=event.player&&
					current!=player&&lib.filter.targetEnabled(event.card,event.player,current);
			});
		},
		content:function(){
			"step 0"
			var next=player.chooseCardTarget({
				position:'he',
				filterCard:lib.filter.cardDiscardable,
				filterTarget:function(card,player,target){
					var trigger=_status.event;
					if(player.inRange(target)&&target!=trigger.source){
						if(lib.filter.targetEnabled(trigger.card,trigger.source,target)) return true;
					}
					return false;
				},
				ai1:function(card){
					return get.unuseful(card)+9;
				},
				ai2:function(target){
					if(_status.event.player.countCards('h','shan')){
						return -get.attitude(_status.event.player,target);
					}
					if(get.attitude(_status.event.player,target)<5){
						return 6-get.attitude(_status.event.player,target);
					}
					if(_status.event.player.hp==1&&player.countCards('h','shan')==0){
						return 10-get.attitude(_status.event.player,target);
					}
					if(_status.event.player.hp==2&&player.countCards('h','shan')==0){
						return 8-get.attitude(_status.event.player,target);
					}
					return -1;
				},
				prompt:get.prompt('yb_jianyuan_shui'),
				prompt2:'弃置一张牌，将此【杀】转移给攻击范围内的一名其他角色',
				source:trigger.player,
				card:trigger.card,
			}).setHiddenSkill(event.name);
			"step 1"
			if(result.bool){
				var target=result.targets[0];
				player.logSkill(event.name,target);
				player.discard(result.cards);
				var evt=trigger.getParent();
				evt.triggeredTargets2.remove(player);
				evt.targets.remove(player);
				evt.targets.push(target);
			}
			"step 2"
			var next=player.chooseTarget('是否移除水剑元，与一名能成为流离目标的玩家交换座位？现在由于作者菜，这个没写出来……'
			/*{
				// filterCard:()=>false,
				filterTarget:function(card,player,target){
					var trigger=_status.event;
					if(player.inRange(target)&&target!=trigger.source){
						if(lib.filter.targetEnabled(trigger.card,trigger.source,target)) return true;
					}
					return false;
				},
				// selectCard:false,
				ai:function(target){
					return -1;
				},
				prompt:get.prompt('yb_jianyuan_shui'),
				prompt2:'是否移除水剑元，与一名能成为流离目标的玩家交换座位？',
				source:trigger.player,
				card:trigger.card,
			}
			*/
			).set('filterTarget',function(card,player,target){
				var trigger=_status.event;
				if(player.inRange(target)&&target!=trigger.source){
					if(lib.filter.targetEnabled(trigger.card,trigger.source,target)) return true;
				}
				return false;
			}).setHiddenSkill(event.name);
			"step 3"
			if(result.bool){
				var target=result.targets[0];
				player.logSkill(event.name,target);
				game.broadcastAll(function(target1,target2){
					game.swapSeat(target1,target2);
				},player,target)
			}
		},
		ai:{
			effect:{
				target:function(card,player,target){
					if(target.countCards('he')==0) return;
					if(card.name!='sha') return;
					var min=1;
					var friend=get.attitude(player,target)>0;
					var vcard={name:'shacopy',nature:card.nature,suit:card.suit};
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(player!=players[i]&&
							get.attitude(target,players[i])<0&&
							target.canUse(card,players[i])){
							if(!friend) return 0;
							if(get.effect(players[i],vcard,player,player)>0){
								if(!player.canUse(card,players[0])){
									return [0,0.1];
								}
								min=0;
							}
						}
					}
					return min;
				}
			}
		},
		audio:false,
	},
	/*
	'yb028_jianzhen_info':
	'（初稿待定）苏婆夏洛特，出牌阶段限一次或当你受到伤害（伤害至少为一）后，你可以摸一张牌，
			然后将一张手牌置于武将牌上称为“剑元”，同时为此“剑元”绑定一个装备栏
			（被绑定的装备栏若未被废除，则在绑定时废除）<br>根据剑元对应的装备栏获得如下技能。
	<br>武器栏：金剑元，锁定技，你的攻击范围加2；当你使用杀时，你无视对方防具。当你造成伤害时，你可以移除金剑元，令伤害+1。
	<br>防具栏：土剑元，你可以将一张装备牌当【无中生有】使用。当你受到伤害时，你可以移除土剑元，令伤害-1。
	<br>进攻马：火剑元，出牌阶段限一次，你可以将所有手牌当任意锦囊使用。当你使用牌指定目标后，你可以移除火剑元，令此牌所有目标各弃一张牌。
	<br>防御马：水剑元，当你成为其他角色使用【杀】的目标时，你可以选择至多两项①弃置一张牌，将此杀【流离】出去；
							②移除水剑元，然后与一名可成为【流离】目标的其它角色互换座位。
	<br>宝物栏：木剑元，当你失去最后的手牌时，你可以摸一张牌，然后你可以移除木剑元并摸等同体力上限的牌数。',
	
	*/
	'yb028_sheshen':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{player:'disableEquipAfter'},
		forced:true,
		content:function(){
			'step 0'
			player.chooseTarget(true).set('prompt','请选择一名角色，令其摸两张牌并回复1点体力').set('ai',function(target){
				var player=_status.event.player;
				var att=get.attitude(player,target)/Math.sqrt(1+target.countCards('h'));
				return att;
			});
			'step 1'
			if(result.bool){
				var tar=result.targets[0];
				tar.draw(2);
				tar.recover();
				player.loseMaxHp();
			}
		},
		group:['yb028_sheshen_max'],
		subSkill:{
			max:{
				mod:{
					maxHandcard:function (player,num){
						var numb=player.countDisabled();
						return num+numb;
					},
				},
				trigger:{
					player:'loseMaxHpBegin',
				},
				forced:true,
				filter:(event,player)=>(player.maxHp<=1),
				content:()=>{trigger.cancel();},
			}
		}
	},
	/*
	'yb028_sheshen_info':
	'（初稿待定）锁定技，当你装备栏被废除时，你令一名角色摸两张牌并回复1点体力，然后你减1点体力上限；
	你的手牌上限额外增加被废除装备栏的数量；
	当你体力上限不大于1时，你无法扣减体力上限。',
	
	*/
	'yb028_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	//---------------------黎
	'yb029_chonghui':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:['useCard','respond'],
		},
		filter:function(event,player){
			return (!player.getStorage('yb029_chonghui2').includes(event.card.name)&&!event.card.isCard);
		},
		frequent:true,
		content:function(){
			'step 0'
			game.delay(0.5);
			player.draw();
			'step 1'
			if(!player.storage.yb029_chonghui2) player.storage.yb029_chonghui2=[];
			player.storage.yb029_chonghui2.push(trigger.card.name);
			player.addTempSkill('yb029_chonghui2');
		},
		group:['yb029_chonghui_juedou','yb029_chonghui_youdishenru'],
		subSkill:{
			youdishenru:{
				audio:'yb029_chonghui',
				usable:1,
				enable:['chooseToUse'],
				filterCard:1,
				viewAs:{name:'youdishenru'},
				prompt:'将一张手牌当作诱敌深入使用',
				check:function(event,player,card){
					if(event.card=='shan')return 0.5;
					return 1.5;
				},
				position:'hs',
				viewAsFilter:function(player){
					if(!player.countCards('hs')) return false;
				},
				ai:{
					skillTagFilter:function(player){
						if(!player.countCards('hs')) return false;
					},
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondShan')&&current<0) return 0.6
						}
					},
					order:4,
					useful:-1,
					value:-1
				}
			},
			juedou:{
				audio:'yb029_chonghui',
				usable:1,
				enable:['chooseToUse'],
				filterCard:1,
				viewAs:{name:'juedou'},
				prompt:'将一张手牌当作【决斗】使用',
				check:function(event,player,card){
					if(event.card=='sha')return 0.5;
					return 1.5;
				},
				position:'hs',
				viewAsFilter:function(player){
					if(!player.countCards('hs')) return false;
				},
				ai:{
					skillTagFilter:function(player){
						if(!player.countCards('hs')) return false;
					},
					order:4,
					useful:-1,
					value:-1
				}
			},
		},
	},
	'yb029_chonghui2':{onremove:true},
	'yb029_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	//--------------------书
	yb030_jiangdao:{
		audio:'yb030_rejiangdao',
		group:['yb030_rejiangdao_1','yb030_rejiangdao_2'],
	},
	yb030_rejiangdao:{
		audio:'ext:夜白神略/audio/character:2',
		group:['yb030_rejiangdao_1','yb030_rejiangdao_2','yb030_rejiangdao_3'],
		subSkill:{
			1:{},
			2:{},
			3:{},
		},
	},
	/*
	'yb030_jiangdao':'讲道',
	'yb030_jiangdao_info':'出牌阶段限一次，你可以视为使用一张五谷丰登；
	当你成为五谷丰登的目标时，你可以将任意手牌与展示的牌进行替换。',
	'yb030_lunyi':'论义',
	'yb030_lunyi_info':'每回合限一次，当你受到其他角色造成的伤害时，你可以展示一张手牌，
	若伤害来源不弃置与之同花色或点数的牌，则此伤害无效，若其弃置了一张同点数的牌，则此伤害加一。',
	*/
	//--------------------------幻晴
	'yb018_lihun':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		filterTarget:function(card,player,target){
			return player!=target;
		},
		filterCard:true,
		position:'he',
		content:function(){
			player.gainPlayerCard(target,true,'h',target.countCards('h'));
			player.addSkill('yb018_lihun2');
			player.storage.yb018_lihun=target;
			player.markSkill('yb018_lihun2');
		},
		check:function(card){return 8-get.value(card)},
		ai:{
			order:10,
			result:{
				player:function(player){
					if(player.classList.contains('turnedover')) return 10;
					return 0;
				},
				target:function(player,target){
					if(target.countCards('h')>target.hp) return target.hp-target.countCards('h');
					return 0;
				}
			},
			threaten:1.5,//嘲讽值
			effect:{
				target:function(card){
					if(card.name=='guiyoujie') return [0,2];
				}
			}
		},
		group:['yb018_lihun_2'],
		subSkill:{
			2:{
				trigger:{player:'phaseUseBefore'},
				direct:true,
				filter:function(event,player){
					if(!player.hasSkill('yb018_lihun2')) return false;
					return true;
				},
				content:()=>{player.removeSkill('yb018_lihun2')},
			},
		},
	},
	'yb018_lihun2':{
		trigger:{player:'phaseUseEnd'},
		forced:true,
		popup:false,
		audio:false,
		mod:{
			globalFrom:function (from,to){
				if(from.storage.yb018_lihun&&from.storage.yb018_lihun.contains(to))return -Infinity;
			},
		},
		intro:{
			content:function(content,player){
				return '至'+get.translation(player.storage.yb018_lihun)+'的距离视为1';
			},
		},
		content:function(){
			"step 0"
			var cards=player.getCards('he');
			player.removeSkill('yb018_lihun2');
			if(player.storage.yb018_lihun.classList.contains('dead')||player.storage.yb018_lihun.hp<=0||cards.length==0){
				event.finish();
			}
			else{
				if(cards.length<player.storage.yb018_lihun.hp) event._result={bool:true,cards:cards};
				else player.chooseCard('he',true,player.storage.yb018_lihun.hp,'离魂：选择要交给'+get.translation(player.storage.yb018_lihun)+'的牌');
				player.turnOver();
			}
			"step 1"
			player.storage.yb018_lihun.gain(result.cards,player);
			player.$give(result.cards.length,player.storage.yb018_lihun);
		}
	},
	'yb018_wanyue':{
		inherit:'yb001_wanyue',
		audio:'ext:夜白神略/audio/character:2',
	},
	'yb018_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	//----------------------白衣尘
	'yb032_tonglv':{
		audio:'ext:夜白神略/audio/character:2',
	},
	'yb032_zhuiji':{
		audio:'ext:夜白神略/audio/character:2',
	},
	'yb032_duanchang':{
		audio:'ext:夜白神略/audio/character:2',
	},
	//---------------------小慧
	'yb033_huiyue':{
		audio:'ext:夜白神略/audio/character:2',
		skillAnimation:true,
		animationColor:'YB_snow',
		forced:true,
		trigger:{player:'phaseBegin'},
		filter:(event,player)=>{
			var num=(player.maxHp*2)/3;
			return player.hp>num&&!player.hasSkill('yb033_shuhui');
		},
		content:function(){
			player.addSkill('yb033_shuhui');
		},
		derivation:['yb033_shuhui','yb033_yuqi','yb014_lvxin'],
		group:['yb033_huiyue_yuqi','yb033_huiyue_lvxin','yb033_huiyue_botu'],
		subSkill:{
			yuqi:{
				audio:'yb033_huiyue',
				forced:true,
				skillAnimation:true,
				animationColor:'YB_snow',
				trigger:{player:'damageBegin4'},
				filter:(event,player)=>{
					if(player.hasSkill('yb033_yuqi')) return player.hasSkill('yb033_shuhui')&&!player.storage.yb033_shuhui;
					return true;
				},
				content:()=>{
					if(!player.hasSkill('yb033_yuqi')) player.addSkill('yb033_yuqi');
					if(player.hasSkill('yb033_shuhui')) {
						player.storage.yb033_shuhui=true;
						game.log(player,'修改了','#b淑慧');
					}
				},
			},
			lvxin:{
				audio:'yb033_huiyue',
				forced:true,
				skillAnimation:true,
				animationColor:'YB_snow',
				trigger:{player:'phaseJieshuBegin'},
				filter:(event,player)=>{
					if(player.hasSkill('yb014_lvxin'))return false;
					var history=player.getHistory('useCard',function(evt){
						return evt.isPhaseUsing();
					});
					var suits=[];
					for(var i=0;i<history.length;i++){
						var suit=get.type2(history[i].card);
						if(suit) suits.add(suit);
					}
					return suits.length>=2;
				},
				content:()=>{
					player.addSkill('yb014_lvxin');
				},
			},
			botu:{
				audio:'yb033_huiyue',
				forced:true,
				round:1,
				trigger:{player:'phaseJieshuBegin'},
				filter:(event,player)=>{
					var history=player.getHistory('useCard',function(evt){
						return evt.isPhaseUsing();
					});
					var suits=[];
					for(var i=0;i<history.length;i++){
						var suit=get.type2(history[i].card);
						if(suit) suits.add(suit);
					}
					return suits.length>=3;
				},
				content:()=>{
					player.insertPhase();
				},
			},
		},
	},
	'yb033_shuhui':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseBegin',
		},
		direct:true,
		content:function(){
			'step 0'
			player.chooseCardTarget({
				position:'h',
				selectCard:1,
				selectTarget:1,
				filterCard:lib.filter.cardDiscardable,
				filterTarget:function(card,player,target){
					// var att=get.attitude(_status.event.player,target);
					// return false;
					return ui.selected.cards.length==1;
				},
				ai1:function(card){
					return get.unuseful(card)+9;
				},
				ai2:function(target){
					var att=get.attitude(_status.event.player,target);
					// return false;
					if(target.isDamaged()&&att>0){
						return Math.min(2,5-target.hp);
					}
					if(att<0){
						return Math.min(1,4-target.hp);
					}
					return -1;
				},
				prompt:'请选择一名角色和一张手牌，令其掉血或回血。'
			});
			'step 1'
			if(result.bool){
				event.card=result.cards[0];
				event.target=result.targets[0];
				var list=[];
				if(event.target.isDamaged())list.push('回血');
				list.push('掉血');
				if(list.length==1)event._result={control:list[0],};
				else player.chooseControl(list).set('prompt','请选择令'+get.translation(event.target)+'回血还是掉血');
			}
			'step 2'
			switch(result.control){
				case '回血':player.discard(event.card);event.target.recover();delete result.control;break;
				case '掉血':player.discard(event.card);event.target.loseHp();delete result.control;break;
			}
			'step 3'
			if(player.storage.yb033_shuhui==true){
				var card=get.cards(1);
				event.numb=get.number(card[0]);
				event.card=card;
				// event.numa=numa+2;
			}
			else{event.finish();}
			'step 4'
			player.showCards(event.card);
			var list=lib.skill.yb033_yuqi.getInfo(player);
			let min = list[0], index = 0;
			for (let i = 1; i < list.length; ++i) {
				if (list[i] < min) { 
					min = list[i];
					index = i;
				}
			}
			event.numa=min;
			event.numc=Math.min(event.numa+2,event.numb);
			player.chooseControl('<span class=thundertext>蓝色('+list[0]+')</span>','<span class=firetext>红色('+list[1]+')</span>','<span class=greentext>绿色('+list[2]+')</span>','<span class=yellowtext>黄色('+list[3]+')</span>','cancel2').set('prompt',get.prompt('yb033_shuhui')).set('prompt2','令〖隅泣〗中的一个数字改为'+(event.numc)+'，新数字不会小于原数字').set('ai',function(){
				// for(var i=0;i<list.length;i++){
				// 	if(Math.min(list)==list[i]) return i;
				// }
				// return i;//夜白专用邪修写法
				let min = list[0], index = 0;
				for (let i = 1; i < list.length; ++i) {
					if (list[i] < min) { 
						min = list[i];
						index = i;
					}
				}
				return index;//R佬的指点迷津
			});
			'step 5'
			if(result.control&&result.control!='cancel2'){
				// player.logSkill('shanshen',trigger.player);
				var list=lib.skill.yb033_yuqi.getInfo(player);
				list[result.index]=Math.max(event.numc,list[result.index]);
				game.log(player,'将',result.control,'数字改为','#y'+list[result.index])
				player.markSkill('yb033_yuqi');
				// if(event.goon) player.recover();
			}
		}
	},
	'yb033_yuqi':{
		audio:'ext:夜白神略/audio/character:2',
		usable:3,
		trigger:{global:'damageEnd'},
		init:function(player){
			if(!player.storage.yb033_yuqi) player.storage.yb033_yuqi=[2,3,2,2];
		},
		getInfo:function(player){
			if(!player.storage.yb033_yuqi) player.storage.yb033_yuqi=[2,3,2,2];
			return player.storage.yb033_yuqi;
		},
		filter:function(event,player){
			var list=lib.skill.yb033_yuqi.getInfo(player);
			// if(event.player.hasMark('yb033_shuhui_mark')) return true;
			return event.player.isIn()&&get.distance(player,event.player)<=list[0];
		},
		logTarget:'player',
		content:function(){
			'step 0'
			event.list=lib.skill.yb033_yuqi.getInfo(player);
			player.YB_yuqi(['隅泣',event.list[1],event.list[2],event.list[3]],trigger.player);
			// 'step 1'
			// if(trigger.player.hasMark('yb033_shuhui_mark')){
			// 	player.chooseControl(['ok2','cancel2']).set('prompt','是否移除其“诉”标记？').set('prompt2','然后其回复1点体力。').set('ai',function(control){
			// 		var att=get.attitude(_status.event.player,trigger.player);
			// 		if(att>0)return 'ok2';
			// 		return 'cancel2';
			// 	})
			// }
			// else{event.finish();}
			// 'step 2'
			// if(result.control=='ok2'){
			// 	trigger.player.removeMark('yb033_shuhui_mark');
			// 	trigger.player.recover();
			// }
		},
		mark:true,
		intro:{
			content:function(storage,player){
				var info=lib.skill.yb033_yuqi.getInfo(player);
				return '<div class="text center"><span class=thundertext>蓝色：'+info[0]+'</span>　<span class=firetext>红色：'+info[1]+'</span><br><span class=greentext>绿色：'+info[2]+'</span>　<span class=yellowtext>黄色：'+info[3]+'</span></div>'
			},
		},
	},
	'yb033_lvxin':{
		// inherit:'yb014_lvxin',
		audio:'ext:夜白神略/audio/character:2',
	},
	yb033_beilei:{
		forced:true,
		audio:'ext:夜白神略/audio/character:2',
		mod:{
			cardUsable(card, player, num) {
				return Infinity;
			},
			cardEnabled2(card) {
				if (get.position(card) == "h"&&card.hasGaintag('yb033_beilei')) return false;
			},
		},
		trigger:{
			player:'drawAfter',
		},
		filter(event,player){
			return true;
		},
		content(){
			var cards = player.getCards('h');
			for(var i of cards){
				if((!trigger.result.includes(i)))i.addGaintag('yb033_beilei')
			}
		},
	},
	yb033_qijue:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:'phaseUseBegin',
		},
		filter(){
			return true;
		},
		content(){
			'step 0'
			var choiceList = ["失去1点体力", "受到1点伤害","弃置一张牌"];
			if(!player.countDiscardableCards(player, 'h'))choiceList.remove("弃置一张牌");
			player.chooseControl()
			.set("choiceList", choiceList)
			.set('ai',function(){
				if(choiceList.length>2&&!event.not2)return 2;
				return 0;
			})
			'step 1'
			if(result.index == 2){
				player.chooseToDiscard('h');
			}
			else if(result.index == 0){
				player.loseHp();
				event.finish();
			}
			else if(result.index == 1){
				player.damage();
				event.finish();
			}
			
			'step 2'
			if(result.index = 2&&!result.cards){
				event.not2=true;
				event.goto(0);
			}
		},
		// content:[
		// 	async function(event,trigger,player){
		// 		event.result = player.chooseControl()
		// 			.set("choiceList", ["失去1点体力", "受到1点伤害","弃置一张牌"])
		// 			.set('ai',function(){
		// 				return 2;
		// 			})
		// 	},
		// 	async function(event,trigger,player){
				
		// 	}
		// ],
		init(player){
			if(!player.storage.yb033_qijue_lh)player.storage.yb033_qijue_lh=[
				['①你下次失去体力后','loseHpEnd'],
				['②回复此数值*2点体力',function(){
					player.recover(trigger.num*2);
				}],
				['③弃置一张手牌',function(){
					player.chooseToDiscard('h',true);
					// delete player.storage.yb033_qijue_loseHp;
				}]
			];
			if(!player.storage.yb033_qijue_da)player.storage.yb033_qijue_da=[
				['①你下次受到伤害后','damageEnd'],
				['②摸此数值*3张牌',function(){
					player.draw(trigger.num*3);
				}],
				['③失去1点体力',function(){
					// player.chooseToDiscard('h',true);
					player.loseHp(1);
					// delete player.storage.yb033_qijue_damage;
				}]
			];
			if(!player.storage.yb033_qijue_dc)player.storage.yb033_qijue_dc=[
				['①你下次弃置牌后','discardEnd'],
				['②对所有其他角色各造成1点伤害',function(){
					var targets = game.filterPlayer().sortBySeat(player);
					for(var i of targets){
						if(i.isIn()&&i!=player)i.damage(player);
					}
				}],
				['③令一个数字之后的效果向前错位',function(){
					// var targets = game.filterPlayer().sortBySeat(player);
					// for(var i of targets){
					// 	if(i.isIn())i.loseHp();
					// }
					// delete player.storage.yb033_qijue_discard;
					//'step 0'
					/*var storage1=player.storage.yb033_qijue_lh;
					var storage2=player.storage.yb033_qijue_da;
					var storage3=player.storage.yb033_qijue_dc;
					var dialog = ui.create.dialog('泣绝','forcebutton','hidden');
					dialog.add('锁定技，<span class=firetext>当你失去体力后，'+storage1[0][0]+'，'+storage1[1][0]+'，然后'+storage1[2][0]+'</span>；<span class=yellowtext>当你受到伤害后，'+storage2[0][0]+'，'+storage2[1][0]+'，然后'+storage2[2][0]+'</span>；<span class=thundertext>当你弃置牌后，'+storage3[0][0]+'，'+storage3[1][0]+'，然后'+storage3[2][0]+'</span>。');
					var dialogChangeAfter=function(){
						let storageC1=player.storage.yb033_qijue_lh;
						let storageC2=player.storage.yb033_qijue_da;
						let storageC3=player.storage.yb033_qijue_dc;
						if(ui.selected.buttons){
							if(ui.selected.buttons[0]=='错动①'){
								var storageC4=storageC1;
								storageC1[0]=storageC2[0];
								storagec1[1]=storageC2[1];
								storageC1[2]=storageC2[2];
								storageC2[0]=storageC3[0];
								storageC2[1]=storageC3[1];
								storageC2[2]=storageC3[2];
								storageC3[0]=storageC4[0];
								storageC3[1]=storageC4[1];
								storageC3[2]=storageC4[2];
							}
							else if(ui.selected.buttons[0]=='错动②'){
								var storageC4=storageC1;
								storagec1[1]=storageC2[1];
								storageC1[2]=storageC2[2];
								storageC2[1]=storageC3[1];
								storageC2[2]=storageC3[2];
								storageC3[1]=storageC4[1];
								storageC3[2]=storageC4[2];
							}
							else if(ui.selected.buttons[0]=='错动③'){
								var storageC4=storageC1;
								storageC1[2]=storageC2[2];
								storageC2[2]=storageC3[2];
								storageC3[2]=storageC4[2];
							}
						}
						return '锁定技，<span class=firetext>当你失去体力后，'+storageC1[0][0]+'，'+storageC1[1][0]+'，然后'+storageC1[2][0]+'</span>；<span class=yellowtext>当你受到伤害后，'+storageC2[0][0]+'，'+storageC2[1][0]+'，然后'+storageC2[2][0]+'</span>；<span class=thundertext>你下次弃置牌后，'+storageC3[0][0]+'，'+storageC3[1][0]+'，然后'+storageC3[2][0]+'</span>。'
					}
					dialog.add('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
					dialog.add(dialogChangeAfter());
					dialog.add([['错动①','错动②','错动③'],'tdnodes']);
					var chooseButton=player.chooseButton(dialog,1,true);
					chooseButton.set('ai',function(button){
						return '错动③';
					});*/
					const dialog = ui.create.dialog('泣绝：令一个数字之后的效果上移','forcebutton','hidden')
					const sto1=player.storage.yb033_qijue_lh
					const sto2=player.storage.yb033_qijue_da
					const sto3=player.storage.yb033_qijue_dc
					const str = '<div style = "font-size : 16px">'
					let itemContainerCss = { border: 'solid #c6b3b3 2px' }
					function clickItemContainer(container) {
						if (!container.classList.contains('selected')) {
							if (ui.selected.buttons.length) return
							container.classList.add('selected')
							ui.selected.buttons.add(container)
							for (let i = container.link; i < dialog.itemContainers.length - 1; i ++) dialog.itemContainers[i + 1].innerHTML = '<div class="caption item">' + str + sto2[i][0] + '<br>' + sto3[i][0] + '<br> ' + sto1[i][0]
						}
						else {
							container.classList.remove('selected')
							ui.selected.buttons.remove(container)
							for (let i = container.link; i < dialog.itemContainers.length - 1; i ++) dialog.itemContainers[i + 1].innerHTML = '<div class="caption item">' + str + sto1[i][0] + '<br>' + sto2[i][0] + '<br> ' + sto3[i][0]
						}
						game.check()
					}
					dialog.addNewRow(
						{item : str + '当你失去体力后<br>当你失去体力后<br>你下次弃置牌后', ratio : 1},
						{item : str + sto1[0][0] + '<br>' + sto2[0][0] + '<br> ' + sto3[0][0], ratio : 1.3, itemContainerCss, clickItemContainer},
						{item : str + sto1[1][0] + '<br>' + sto2[1][0] + '<br> ' + sto3[1][0], ratio : 1.7, itemContainerCss, clickItemContainer},
						{item : str + sto1[2][0] + '<br>' + sto2[2][0] + '<br> ' + sto3[2][0], ratio : 2, itemContainerCss, clickItemContainer}
					)
					for (const i in dialog.itemContainers) dialog.itemContainers[i].link = i - 1
					player.chooseButton(dialog, true)
						.set('processAI', () => ({ bool : true, links : [2]}))
						.set('custom', {
							add : {},
							replace : { window() {} }
						})
						.set('callback', function(player, result) {
							var link=result.links;
							let storageC1=player.storage.yb033_qijue_lh;
							let storageC2=player.storage.yb033_qijue_da;
							let storageC3=player.storage.yb033_qijue_dc;
							if(link){
								if(link[0] == 0){
									const storageC4=storageC1;
									player.storage.yb033_qijue_lh[0]=storageC2[0];
									player.storage.yb033_qijue_lh[1]=storageC2[1];
									player.storage.yb033_qijue_lh[2]=storageC2[2];
									player.storage.yb033_qijue_da[0]=storageC3[0];
									player.storage.yb033_qijue_da[1]=storageC3[1];
									player.storage.yb033_qijue_da[2]=storageC3[2];
									player.storage.yb033_qijue_dc[0]=storageC4[0];
									player.storage.yb033_qijue_dc[1]=storageC4[1];
									player.storage.yb033_qijue_dc[2]=storageC4[2];
								}
								else if(link[0] == 1){
									const storageC4=storageC1;
									player.storage.yb033_qijue_lh[1]=storageC2[1];
									player.storage.yb033_qijue_lh[2]=storageC2[2];
									player.storage.yb033_qijue_da[1]=storageC3[1];
									player.storage.yb033_qijue_da[2]=storageC3[2];
									player.storage.yb033_qijue_dc[1]=storageC4[1];
									player.storage.yb033_qijue_dc[2]=storageC4[2];
								}
								else if(link[0] == 2){
									const storageC4=storageC1;
									player.storage.yb033_qijue_lh[2]=storageC2[2];
									player.storage.yb033_qijue_da[2]=storageC3[2];
									player.storage.yb033_qijue_dc[2]=storageC4[2];
								}
								player.syncStorage('yb033_qijue_lh')
								player.syncStorage('yb033_qijue_da')
								player.syncStorage('yb033_qijue_dc')
							}
						})
				}]
			];
		},
		group:['yb033_qijue_lh','yb033_qijue_da','yb033_qijue_dc'],
		subSkill:{
			lh:{
				audio:'yb033_qijue',
				trigger:{
					player:'loseHpEnd',
				},
				firstDo:true,
				// lastDo:true,
				forced:true,
				filter(event,player){
					// console.log('player.storage.yb033_qijue_loseHp',player.storage.yb033_qijue_loseHp)
					return !player.storage.yb033_qijue_loseHp;
				},
				content(){
					'step 0'
					if(!player.storage.yb033_qijue_lh)lib.skill.yb033_qijue.init(player);
					// if(!player.storage.yb033_qijue_loseHp){
						player.storage.yb033_qijue_loseHp=true;
					'step 1'
						var storage = player.storage.yb033_qijue_lh;
						player.when({player:storage[0][1]}).filter(function(event,player){
							return event!=trigger;
						}).then(storage[1][1]).then(storage[2][1]).then(function(){
							delete player.storage.yb033_qijue_loseHp;
						});
					// }
					// else delete player.storage.yb033_qijue_loseHp;
				},
			},
			da:{
				audio:'yb033_qijue',
				trigger:{
					player:'damageEnd',
				},
				firstDo:true,
				// lastDo:true,
				forced:true,
				filter(event,player){
					// console.log('player.storage.yb033_qijue_damage',player.storage.yb033_qijue_damage)
					return !player.storage.yb033_qijue_damage;
				},
				content(){
					'step 0'
					if(!player.storage.yb033_qijue_da)lib.skill.yb033_qijue.init(player);
					// if(!player.storage.yb033_qijue_damage){
						player.storage.yb033_qijue_damage=true;
					
					'step 1'
						var storage = player.storage.yb033_qijue_da;
						player.when({player:storage[0][1]}).filter(function(event,player){
							return event!=trigger;
						}).then(storage[1][1]).then(storage[2][1]).then(function(){
							delete player.storage.yb033_qijue_damage;
						});
					// }
					// else delete player.storage.yb033_qijue_damage;
				},
			},
			dc:{
				audio:'yb033_qijue',
				trigger:{
					player:'discardEnd',
				},
				firstDo:true,
				// lastDo:true,
				forced:true,
				filter(event,player){
					// console.log('player.storage.yb033_qijue_discard',player.storage.yb033_qijue_discard)
					return !player.storage.yb033_qijue_discard;
				},
				content(){
					'step 0'
					if(!player.storage.yb033_qijue_dc)lib.skill.yb033_qijue.init(player);
					// if(!player.storage.yb033_qijue_discard){
						player.storage.yb033_qijue_discard=true;
					'step 1'
						var storage = player.storage.yb033_qijue_dc;
						player.when({player:storage[0][1]}).filter(function(event,player){
							return event!=trigger;
						}).then(storage[1][1]).then(storage[2][1]).then(function(){
							delete player.storage.yb033_qijue_discard;
						});
					// }
					// else delete player.storage.yb033_qijue_dc;
				},
			},
		}
	},
	//---------------------周怜渊
	yb034_bifa:{
		// usable:1,
		enable:'phaseUse',
		audio:'ext:夜白神略/audio/character:2',
		// init:function(player){
		// 	player.storage.yb034_bifa=[];
		// },
		filter:function(event,player){
			if(player.countCards('h')<=0) return false;
			return game.countPlayer(function(current){
				return current.hasSkill('yb034_bifa_card');
			})<=0;
		},
		filterTarget:function(card,player,target){
			return player!=target;
		},
		filterCard:true,
		check:function(card){
			return 8-get.value(card);
		},
		discard:false,
		lose:false,
		delay:false,
		position:'h',
		content:function(){
			'step 0'
			player.give(cards[0],target);
			target.storage.yb034_bifa_card=cards[0];
			target.addTempSkill('yb034_bifa_card','YB_anyAfter');
		},
		check:function(card){return 8-get.value(card)},
		ai:{
			order:9,
			result:{
				target:function(player,target){
					return -target.countCards('he')-(player.countCards('h','du')?1:0);
				}
			},
			threaten:2,//嘲讽值
		},
		subSkill:{
			card:{
				trigger:{player:'die'},
				direct:true,
				onremove:true,
				forceDie:true,
				filter:function(event,player){
					return game.countPlayer(function(current){
						return current.hasSkill('yb034_bifa');
					})>0;
				},
				content:()=>{
					var list=game.filterPlayer(function(current){
						return current.hasSkill('yb034_bifa');
					});
					for (var i of list){
						i.logSkill('yb034_bifa',i);
						i.draw();
					}
				},
				mod:{
					cardEnabled2:function(card,player){
						if(!player.storage.yb034_bifa_card){
							if(get.position(card)=='h') return false;
						}
						else if(get.position(card)=='h'&&get.color(card)==get.color(player.storage.yb034_bifa_card)) return false;
					},
				},
				mark:true,
				marktext:'禁',
				intro:{
					name:'笔伐',
					content:function(storage,player){
						var str='不能使用或打出';
						if(player.storage.yb034_bifa_card)str+=get.translation(get.color(player.storage.yb034_bifa_card));
						str+='手牌。'
						return str;
					},
				},
			},
		},
	},
	yb034_rebifa:{
		// usable:1,
		enable:'phaseUse',
		audio:'ext:夜白神略/audio/character:2',
		filter:function(event,player){
			if(player.countCards('h')<=0) return false;
			return game.countPlayer(function(current){
				return current.hasSkill('yb034_bifa_card');
			})<=0;
		},
		filterTarget:function(card,player,target){
			return player!=target;
		},
		filterCard:true,
		check:function(card){
			return 8-get.value(card);
		},
		discard:false,
		lose:false,
		delay:false,
		position:'h',
		content:function(){
			'step 0'
			player.give(cards[0],target);
			if(target.storage.yb034_bifa_card)delete target.storage.yb034_bifa_card;
			target.addTempSkill('yb034_bifa_card','YB_anyAfter');
		},
		check:function(card){return 8-get.value(card)},
		ai:{
			order:9,
			result:{
				target:function(player,target){
					return -target.countCards('he')-(player.countCards('h','du')?1:0);
				}
			},
			threaten:2,//嘲讽值
		},
	},
	yb034_jiandao:{
		inherit:'yb034_rejiandao',
		filter:function(event,player){
			return player.getEquip(1);
		},
	},
	yb034_rejiandao:{
		mod:{
			maxHandcard:function (player,num){
				return num+1;
			},
			cardUsable:function(card,player){
				if(card.name=='sha'&&card.storage&&card.storage.xxx) return Infinity;
			},
		},
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		enable:'phaseUse',
		viewAs:{name:'sha',isCard:true,storage:{xxx:true,},xxx:true},
		filterCard:function(){return false},
		selectCard:-1,
		prompt:'视为使用一张杀（无次数限制）',
	},
	'yb034_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	ybceshijineng1:{
		mod:{
			targetInRange:function(card,player,target,now){
				if(card.name=='sha'&&card.storage&&card.storage.xx) return true;
			},
		},
		usable:2,
		enable:'phaseUse',
		viewAs:{name:'sha',nature:'thunder',storage:{xx:true,}},
		filterCard:function(){return false},
		selectCard:-1,
		prompt:'视为使用一张雷杀（无距离限制）',
		precontent:function(){
			player.link(true);
			var next=game.createEvent('afterEffect',null,{next:[]});
			next.player=player;
			next.setContent(function(){
				var history=player.getHistory('useCard',evt=>evt.parent==event.parent);
				if(history.length){
					for(var target of history.map(value=>value.targets).flat()){
						target.link(true);
					}
				}
			});
			event.parent.after.unshift(next);
		}
	},
	/*
	'yb034_rebifa':'笔伐',
	'yb034_rebifa_info':'出牌阶段，若场上没有被此技能选择的角色，你可以展示一张手牌并交给一名其他角色，然后该角色不能使用或打出手牌直到此阶段结束。若被此技能选择的目标于此阶段阵亡，你摸一张牌。',
	'yb034_bifa':'笔伐',
	'yb034_bifa_info':'出牌阶段，若场上没有被此技能选择的角色，你可以展示一张手牌并交给一名其他角色，然后该角色不能使用或打出与此牌同颜色的手牌直到此阶段结束。若被此技能选择的目标于此阶段阵亡，你摸一张牌。',
	'yb034_rejiandao':'剑道',
	'yb034_rejiandao_info':'锁定技，你的手牌上限加一，且获得如下效果：出牌阶段限一次，你可以视为使用一张【杀】（无次数限制）。',
	'yb034_jiandao':'剑道',
	'yb034_jiandao_info':'锁定技，若你已装备武器牌，你的手牌上限加一，且获得如下效果：出牌阶段限一次，你可以视为使用一张【杀】。',
	*/
	//---------------------玺
	yb035_zhengzhao:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'phaseZhunbeiBegin',
		},
		filter(event,player){
			return event.player!=player&&event.player.maxHp>=player.maxHp;
		},
		forced:true,
		content:[
			async function(event,trigger,player){
				trigger.player.chooseToGive(player,1,'h','①交给'+get.translation(player)+'一张手牌，②减少1点体力上限。')
				.set("ai", function(card) {
					var trigger=_status.event.getTrigger();
					if(get.attitude(trigger.player,player)>5)return 10-get.value(card);
					// else if(trigger.player.maxHp>player.maxHp)return 10-get.value(card);
					return false;
				} )
			},
			async function(event,trigger,player){
				let result = event._result;
				if(!result.bool)trigger.player.loseMaxHp();
			}
		],
	},
	yb035_jitian:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseZhunbeiBegin',
		},
		filter(event,player){
			return true;
		},
		cost(){
			'step 0'
			player.chooseControl()
				.set("prompt", "祭天：请选择一项")
				.set("choiceList", ["减少1点体力上限并回复1点体力", "增加1点体力上限并失去1点体力",'取消'])
				.set("ai", () => {
					if(player.maxHp>=4&&player.maxHp-player.hp>=2)return 0;
					else if(player.hp>=2)return 1;
					else return 2;
				})
			'step 1'
			if(result.index!=2){
				event.result = {bool:true,cost_data:result.index};
			}
		},
		content(){
			'step 0'
			if(event.cost_data==0){
				player.loseMaxHp();
				player.recover();
			}
			else {
				player.gainMaxHp();
				player.loseHp();
			}
			'step 1'
			player.draw(2);
		}

	},
	yb035_liuwang:{
		audio:'ext:夜白神略/audio/character:2',
		enable: "chooseToUse",
		derivation:['yb035_weiyan'],
		limited: true,
		skillAnimation: true,
		animationColor: "kami",
		filter(event, player) {
			if (event.type == "dying") {
				if (player != event.dying) return false;
				return true;
			}
			return false;
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			player.storage.yb035_liuwang = true;
			await player.recoverTo(1);
			await player.YB_fuhan([,4,'流亡',,'all','zhu'],'tw');
			await player.addSkill('yb035_weiyan');
		},
		ai: {
			order: 0.5,
			skillTagFilter(player, tag, target) {
				if (player != target || player.storage.yb035_liuwang) return false;
			},
			save: true,
			result: {
				player(player) {
					if (player.hp <= 0) return 10;
					return 0;
				},
			},
			threaten(player, target) {
				if (!target.storage.yb035_liuwang) return 0.6;
			},
		},
	},
	yb035_weiyan:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:'useCardToTargeted',
		},
		filter(event,player){
			return player!=event.target&&player.hp>event.target.hp&&event.target.hp>1;
		},
		content(){
			trigger.target.loseHp();
		}
	},
	//---------------------熙
	'yb036_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	yb036_qianjin:{
		audio:'ext:夜白神略/audio/character:4',
		logAudio: () => 2,
		derivation:['yb036_chongzheng','yb036_aoxiang'],
		dutySkill:true,
		forced:true,
		locked:false,
		trigger:{
			player:['useCard','phaseJieshuBegin','damageAfter'],
		},
		filter(event,player,name){
			// if(name=='useCard')return true;
			// else return player.countMark('yb036_qianjin')>0;
			return true;
		},
		content(){
			if(event.triggername=='useCard'){
				player.addMark('yb036_qianjin',1);
				trigger.trigger('yb036_qianjin_change')
			}
			else if(player.countMark('yb036_qianjin')>0){
				player.removeMark('yb036_qianjin',1);
				trigger.trigger('yb036_qianjin_change')
			}
			else {
				trigger.trigger('yb036_qianjin_fail')
			}
		},
		mark:true,
		marktext:'进',
		intro:{
			name:'进',
			content:'$',
		},
		// ai:{
		// 	effect:{
		// 		target:function(card,player,target,result2){
		// 			if(get.tag(card,'damage')){
		// 				return result2-10;
		// 			}
		// 			return result2;
		// 		}
		// 	},
		// },
		group: ['yb036_qianjin_achieve', 'yb036_qianjin_fail'],
		subSkill:{
			achieve:{
				audio:"yb036_qianjin",
				logAudio(event, player) {
					return ["ext:夜白神略/audio/yb036_qianjin3.mp3"];
				},
				trigger:{
					player:'yb036_qianjin_change',
				},
				forced: true,
				filter(event,player){
					var num = player.yb036_qianjin_achieve;
					if(player.countMark('yb036_qianjin')>=num) return true;
				},
				init(player){
					if(!player.yb036_qianjin_achieve)player.yb036_qianjin_achieve=5;
				},
				// skillAnimation: true,
				// animationColor: 'YB_dream',
				content(){
					'step 0'
					player.$skill('使命成功');
					player.changeSkin({ characterName: "ybsl_036bright" }, "ybsl_036bright_aoxiang");
					'step 1'
					player.awakenSkill('yb036_qianjin');
					'step 2'
					player.draw(2);
					'step 3'
					player.addSkill('yb036_aoxiang');
				},
			},
			fail:{
				audio:"yb036_qianjin",
				logAudio(event, player) {
					return ["ext:夜白神略/audio/yb036_qianjin4.mp3"];
				},
				trigger:{
					player:'yb036_qianjin_fail',
				},
				filter(event,player){
					return true;
				},
				forced:true,
				content(){
					'step 0'
					player.$skill('使命失败');
					'step 1'
					player.awakenSkill('yb036_qianjin');
					player.changeSkin({ characterName: "ybsl_036bright" }, "ybsl_036bright_chongzheng");
					'step 2'
					player.addSkill('yb036_chongzheng');
					player.restoreSkill('yb036_chongzheng');
				},
			},
		},
	},
	yb036_chongzheng:{
		audio:'ext:夜白神略/audio/character:2',
		skillAnimation: true,
		animationColor: 'YB_dream',
		limited:true,
		trigger:{
			player:['phaseZhunbeiBegin','phaseJieshuBegin']
		},
		enable:'chooseToUse',
		filter(event,player,name){
			if(name)return true;
			if(player.storage.yb036_chongzheng) return false;
			if(event.type=='dying'){
				if(player!=event.dying) return false;
				return true;
			}
			return false;
		},
		check(event,player,name){
			if(name) return player.getDamagedHp()>0||player.countCards('h')<=1;
			return true;
		},
		content(){
			'step 0'
			player.awakenSkill('yb036_chongzheng');
			'step 1'
			player.recover()
			'step 2'
			player.draw(2);
			'step 3'
			player.restoreSkill('yb036_qianjin');
			player.changeSkin({ characterName: "ybsl_036bright" }, "ybsl_036bright");
		}
	},
	yb036_aoxiang:{
		audio:'ext:夜白神略/audio/character:2',
		group:['yb036_aoxiang_draw','yb036_aoxiang_restore'],
		subSkill:{
			draw:{
				forced:true,
				trigger:{
					player:['useCard'],
				},
				filter(event,player){
					return player.countMark('yb036_qianjin')>0;
				},
				content(){
					'step 0'
					player.removeMark('yb036_qianjin',1);
					trigger.trigger('yb036_qianjin_change')

					'step 1'
					player.draw();
				}
			},
			restore:{
				trigger:{
					player:'yb036_qianjin_change',
				},
				forced: true,
				filter(event,player){
					return player.countMark('yb036_qianjin')==0;
				},
				// skillAnimation: true,
				// animationColor: 'YB_dream',
				content(){
					'step 0'
					player.removeSkill('yb036_aoxiang');
					player.restoreSkill('yb036_qianjin');
					player.changeSkin({ characterName: "ybsl_036bright" }, "ybsl_036bright");
					'step 1'
					if(player.yb036_qianjin_achieve){
						var list = [];
						if(player.yb036_qianjin_achieve<8)list.push('增加');
						if(player.yb036_qianjin_achieve>3)list.push('减少');
						list.push('取消');
						player.chooseControl(list).set('prompt',`当前临界值为${player.yb036_qianjin_achieve}，请选择增加还是减少（至多加至8，至少减至3）`);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.control&&result.control!='取消'){
						if(result.control=='增加'){
							player.yb036_qianjin_achieve++;
						}
						else if(result.control=='减少'){
							player.yb036_qianjin_achieve--;
						}

					}
				},

			},
		},
		enable:['chooseToUse','chooseToRespond'],
		//发动时提示的技能描述
		prompt:'将红牌当【杀】，黑牌当【闪】使用或打出',
		//动态的viewAs
		viewAs:function(cards,player){
			var name=false;
			var color=get.color(cards[0],player);
			//根据选择的卡牌的花色 判断要转化出的卡牌是闪还是火杀还是无懈还是桃
			switch(color){
				case 'red':
					name='sha';break;
				case 'black':
					name='shan';break;
			}
			//返回判断结果
			if(name) return {
				name:name
			};
			return null;
		},
		check:function(card){
			var val = get.value(card);
			return 5 - val;
		},
		selectCard:1,
		position:'hes',
		filterCard:function(card,player,event){
			//如果已经选了一张牌 那么第二张牌和第一张花色相同即可
			// if(ui.selected.cards.length) return get.suit(card,player)==get.suit(ui.selected.cards[0],player);
			event=event||_status.event;
			//获取当前时机的卡牌选择限制
			var filter=event._backup.filterCard;
			//获取卡牌颜色
			var name=get.color(card,player);
			//如果这张牌是梅花并且当前时机能够使用/打出闪 那么这张牌可以选择
			if(name=='black'&&filter({name:'shan',cards:[card]},player,event)) return true;
			//如果这张牌是方片并且当前时机能够使用/打出雷杀 那么这张牌可以选择
			if(name=='red'&&filter({name:'sha',cards:[card]},player,event)) return true;
			//上述条件都不满足 那么就不能选择这张牌
			return false;
		},
		filter:function(event,player){
			// if(player.countMark('yb070_meiying')<1) return false;
			//获取当前时机的卡牌选择限制
			var filter=event.filterCard;
			//如果当前时机能够使用/打出火杀并且角色有方片 那么可以发动技能
			if(filter({name:'sha'},player,event)&&player.countCards('hes',{color:'red'})) return true;
			//如果当前时机能够使用/打出闪并且角色有梅花 那么可以发动技能
			if(filter({name:'shan'},player,event)&&player.countCards('hes',{color:'black'})) return true;
			return false;
		},
		// hiddenCard:function(player,name){
		// 	// if(player.countMark('yb070_meiying')<1) return false;
		// 	if(name=='wuxie'&&_status.connectMode&&player.countCards('hs')>0) return true;
		// 	if(name=='wuxie') return player.countCards('hes',{suit:'spade'})>0;
		// 	if(name=='tao') return player.countCards('hes',{suit:'heart'})>0;
		// },
		ai:{
			respondSha:true,
			respondShan:true,
			//让系统知道角色“有杀”“有闪”
			skillTagFilter:function(player,tag){
				var name;
				switch(tag){
					case 'respondSha':name='red';break;
					case 'respondShan':name='black';break;
				}
				if(!player.countCards('hes',{color:name})) return false;
			},
			//AI牌序
			order:function(item,player){
				return 2;
			},
		},
	},
	//----------------------方块Q
	'yb037_yizhong':{
		trigger:{target:'shaBefore'},
		forced:true,
		audio:'ext:夜白神略/audio/character:2',
		filter:function(event,player){
			if(player.getEquip(2)) return false;
			return (event.card.name=='sha'&&get.color(event.card)=='black')
		},
		content:function(){
			trigger.cancel();
		},
		ai:{
			effect:{
				target:function(card,player,target){
					if(player==target&&get.subtype(card)=='equip2'){
						if(get.equipValue(card)<=8) return 0;
					}
					if(target.getEquip(2)) return;
					if(card.name=='sha'&&get.color(card)=='black') return 'zerotarget';
				}
			}
		}
	},
	'yb037_kexie':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{player:'loseAfter'},
		forced:true,
		marktext:'咳',
		mark:true,
		intro:{
			name:'咳血',
			content:"mark",
		},
		filter:function(event,player){
			if(event.type!='discard') return false;
			return true;
		},
		content:function(){
			'step 0'
			event.count=0;
			var evt=trigger.getl(player);
			if(player.countMark('yb037_kexie')==0){
				event.count=evt.cards2.length;
				event.goto(1);
			};
			if(player.countMark('yb037_kexie')==1){
				for(var i=0;i<evt.cards2.length;i++){
					if(get.color(evt.cards2[i],player)=='red') event.count++;
				}
				event.goto(1)
			};
			if(player.countMark('yb037_kexie')>=2){
				for(var i=0;i<evt.cards2.length;i++){
					if(get.suit(evt.cards2[i],player)=='heart') event.count++;
				}
				event.goto(1)
			};
			'step 1'
			player.loseHp(event.count);
		},
		// getIndex(event,player){
		// 	var num = player.storage.yb037_kexie;
		// 	var evt = event.getl(player);
		// 	if(!num||num==0)return event.num;
		// 	else if(num==1)return evt.cards2.filter(function(card){
		// 		return get.color(card,player)=='red'
		// 	}).length;
		// 	else return evt.cards2.filter(function(card){
		// 		return get.suit(card,player)=='heart'
		// 	}).length;
		// },
		// content(){
		// 	player.loseHp();
		// }
	},
	'yb037_guiling':{
		trigger:{player:'damageBegin4'},
		forced:true,
		audio:'ext:夜白神略/audio/character:2',
		filter:function(event,player){
			if(player.getEquip(2)) return false;
			if(event.num<=1) return false;
			if(player.hasSkillTag('unequip2')) return false;
			if(event.source&&event.source.hasSkillTag('unequip',false,{
				name:event.card?event.card.name:null,
				target:player,
				card:event.card
			})) return false;
			return true;
		},
		content:function(){
			trigger.num=1;
		},
		group:['yb037_guiling_1','yb037_guiling_2'],
		subSkill:{
			1:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{player:['dyingAfter']},
				forced:true,
				filter:function(event,player){
					if(!player.hasSkill('yb037_kexie')) return false;
					return true;
				},
				content:function(){
					if(player.countMark('yb037_kexie')<2){
						player.addMark('yb037_kexie');
					}
					else{
						player.removeSkill('yb037_kexie');
					}
				},
				sub:true,
			},
			2:{
				audio:'ext:夜白神略/audio/character:2',
				trigger:{player:['dying']},
				filter:function (event,player){
					return event.getParent(2)&&event.getParent(2).name=='yb037_kexie';
				},
				forced:true,
				content:function(){
					if(player.maxHp>3)player.loseMaxHp();
					if(player.hp<1) player.recover(player.maxHp-player.hp);
				},
				sub:true,
			},
		},
		ai:{
			filterDamage:true,
			skillTagFilter:function(player,tag,arg){
				if(player.hasSkillTag('unequip2')) return false;
				if(arg&&arg.player){
					if(arg.player.hasSkillTag('unequip',false,{
						name:arg.card?arg.card.name:null,
						target:player,
						card:arg.card,
					})) return false;
					if(arg.player.hasSkillTag('unequip_ai',false,{
						name:arg.card?arg.card.name:null,
						target:player,
						card:arg.card,
					})) return false;
					if(arg.player.hasSkillTag('jueqing',false,player)) return false;
				}
			},
			effect:{
				target:function(card,player,target){
					if(player==target&&get.subtype(card)=='equip2'){
						if(get.equipValue(card)<=8) return 0;
					}
					if(target.getEquip(2)) return;
					
				}
			}
		},
	},
	'yb037_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	//----------------------------------滕叔颖＆武宁
	'yb038_quanlu':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'useCard',
		},
		mark:true,
		marktext:'泉',
		intro:{
			name:'泉路',
			content:function(storage,player,skill){
				var str='本技能累积次数<li>';
				str+=player.storage.yb038_quanlu;
				str+='<br/>因此技能失去体力<li>';
				str+=get.translation(player.storage.ybsl_quan);
				str+='<br/>因此技能失去上限<li>';
				str+=get.translation(player.storage.ybsl_lu);
				return str;
			},
		},
		init:function(player,skill){
			player.storage.ybsl_quan=0;
			player.storage.ybsl_lu=0;
		},
		// onremove:true,
		forced:true,
		content:function (){
			'step 0'
			player.chooseToDiscard(1,'h',true).set('prompt','请选择弃置一张手牌');
			'step 1'
			if(player.countCards('h')==0){
				var list=['掉血','掉上限'];
				if(player.maxHp==player.hp){
					list.remove('掉上限');
				}
				player.chooseControl(list).set(
					'prompt2','请选择失去1点体力<span class=yellowtext>或</span>体力上限'
				).set('ai',function(player){
					if(player.hp>2||player.hp==player.maxHp)return '掉血';
					return '掉上限';
				});
			}
			'step 2'
			if(result.control=='掉血'){
				player.loseHp(1);
				event.kk=true;
				player.storage.ybsl_quan++;
			}
			else if(result.control=='掉上限'){
				player.loseMaxHp(1);
				event.kk=true;
				player.storage.ybsl_lu++;
			}
			'step 3'
			if(event.kk==true){
				var n=player.maxHp;
				if(n>5)n=5;
				player.draw(n);
				if(player.hasSkill('yb038_quanlu'))player.addMark('yb038_quanlu');
			}
		},
	},
	'yb038_wangyuan':{
		audio:'yb038_shenglu',
		trigger:{
			player:'phaseJieshuAfter',
		},
		forced:true,
		filter:function(event,player){
			return player.storage.ybsl_quan>0||player.storage.ybsl_lu>0;
		},
		content:function(){
			'step 0'
			var quan=player.storage.ybsl_quan;
			var lu=player.storage.ybsl_lu;
			player.recover(player.storage.ybsl_quan);
			player.gainMaxHp(player.storage.ybsl_lu);
			'step 1'
			player.storage.ybsl_quan=0;
			player.storage.ybsl_lu=0;
			game.log(player,'归还了',quan,'点体力和',lu,'点体力上限');
			'step 2'
			if(player.countMark('yb038_quanlu')>=3){
				player.removeMark('yb038_quanlu',3);
				player.gainMaxHp();
			}
		}
	},
	'yb038_shenglu':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'useCard',
		},
		locked:true,
		direct:true,
		content:function (){
			'step 0'
			player.chooseToDiscard(1,'he').set('prompt2','生路：是否弃置一张牌').set('ai',function(card){
				return 2-get.value(card);
			})
			'step 1'
			if(player.countCards('h')==0){
				var list=['掉血加上限','掉上限回血'];
				if(player.maxHp==player.hp){
					list.remove('掉上限回血');
				}
				player.chooseControl(list).set(
					'prompt2','请选择失去1点体力并增加1点体力上限<span class=yellowtext>或</span>失去1点体力上限并回复1点体力'
				).set('ai',function(player){
					if(player.hp>2||player.hp==player.maxHp)return '掉血加上限';
					return '掉上限回血';
				});
			};
			'step 2'
			if(result.control=='掉血加上限'){
				player.loseHp();
				player.gainMaxHp();
				event.kk=true;
			}
			else if(result.control=='掉上限回血'){
				player.loseMaxHp();
				player.recover();
				event.kk=true;
			}
			'step 3'
			if(event.kk==true){
				var n=player.maxHp;
				if(n>5)n=5;
				player.draw(n);
			}
		},
	},
	'yb038_fusheng':{
		skillAnimation:true,
		animationColor:'YB_snow',
		unique:true,
		juexingji:true,
		audio:'ext:夜白神略/audio/character:2',
		derivation:['yb038_shenglu','yb038_enxu'],
		trigger:{
			player:'dying',
		},
		forced:true,
		filter:function (event,player){
			return !player.storage.yb038_fusheng;
		},
		content:function (){
			'step 0'
			player.storage.yb038_fusheng=true;
			player.awakenSkill('yb038_fusheng');
			player.addSkill('yb038_fusheng_die');
			'step 1'
			var k=Math.abs(player.countMark('yb038_quanlu')-2);
			if(player.countMark('yb038_quanlu')>=3){player.gainMaxHp(k+1);}
			else{player.loseMaxHp(k);}
			event.k=player.countMark('yb038_quanlu')-2;
			if(event.k<1)event.k=1;
			'step 2'
			player.recover(event.k);
			'step 3'
			player.removeSkill('yb038_quanlu');
			player.addSkill('yb038_shenglu');
			player.addSkill('yb038_enxu');

		},
		subSkill:{
			die:{
				direct:true,
				forceDie:true,
				trigger:{
					player:'die'
				},
				filter:function(event,player){
					return true;
					// if(player.isAlive())
					// else{return event.player==player}
				},
				content:async function(event, trigger, player) {
					await player.removeSkill('yb038_fusheng_die');
					if(!player.isAlive()){
						var result=await player.chooseTarget('请选择一名其他角色获得【生路】',lib.filter.notMe).set('ai',function(target){
							return get.attitude(_status.event.player,target);
						}).forResult();
						if(result.targets){
							var target=result.targets[0];
							target.addSkill('yb038_shenglu')
						}
					}
				}
			}
		}
	},
	'yb038_fushengxx':{
		skillAnimation:true,
		animationColor:'YB_snow',
		unique:true,
		juexingji:true,
		audio:'ext:夜白神略/audio/character:2',
		derivation:['yb038_wangyuan','yb038_enxu','yb038_shenglu'],
		trigger:{
			player:'dying',
		},
		forced:true,
		filter:function (event,player){
			return !player.storage.yb038_fushengxx;
		},
		content:function (){
			'step 0'
			player.storage.yb038_fushengxx=true;
			player.awakenSkill('yb038_fushengxx');
			player.addSkill('yb038_fusheng_die');
			'step 1'
			var quan=player.storage.ybsl_quan;
			var lu=player.storage.ybsl_lu;
			player.gainMaxHp(player.storage.ybsl_lu);
			player.recover(player.storage.ybsl_quan);
			game.log(player,'归还了',quan,'点体力和',lu,'点体力上限');
			'step 2'
			player.storage.ybsl_quan=0;
			player.storage.ybsl_lu=0;
			player.gainMaxHp(2);
			'step 3'
			player.addSkill('yb038_wangyuan');
			player.addSkill('yb038_enxu');
			player.removeMark('yb038_quanlu',player.storage.yb038_quanlu);
		},
	},
	'yb038_enxu':{
		groupSkill:true,
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		filterCard:true,
		usable:1,
		selectCard:0,
		filter:function(event,player){
			return player.group=='YB_memory';
		},
		filterTarget:function (card,player,target){
			if(!target.hasSex('male')) return false;
			if(target==player) return false;
			return true;
		},
		content:function (){
			'step 0'
			var n=player.maxHp;
			if(n>6)n=6;
			player.loseMaxHp(2);
			target.draw(n);
			'step 1'
			var c=Math.abs(player.hp-target.hp);
			if(c>0){
				player.hp>target.hp?target.recover(c):player.recover(c);
			};
		},
		ai:{
			order:3.5,
			result:{
				player:function (player){
					if(player.maxHp>=6) return 4;
					return -1;
				},
				target:4,
			},
			threaten:1.7,//嘲讽值
			expose:0.4,//跳立场
		},
	},
	'yb038_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	
	//------------卞秋雯
	yb038_youhun:{
		audio:'ext:夜白神略/audio/character:2',
		// inherit:'yb047_youhun',
	},
	yb038_chameng:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:['loseAfter','gainAfter'],
		},
		filter:function(event,player,name){
			if(!event.player||!event.player.isAlive())return false;
			if(name=='loseAfter'){
				var evt=event.getParent('phaseDiscard');
				  if(evt&&evt.name=='phaseDiscard') return false;
				if(event.type=='discard')return true;
				return false;
			}
			else{
				var evt=event.getParent('phaseDraw');
				  if(evt&&evt.name=='phaseDraw') return false;
				if(event.getParent().name=='draw')return true;
				return false;
			}
			return false;
		},
		usable:1,
		check:function(event,player){
			var numa=(event.name=='lose')?-1:1;
			var numb=get.attitude(player,event.player);
			return numa*numb>0;
		},
		prompt2:function(event,player){
			var str=get.translation(event.player);
			var numb=(event.num||event.cards.length);
			if(event.name=='lose'){
				str+='刚才弃了';
				var str2=(event.player.isTurnedOver())?('再弃'+get.cnNumber(numb)+'张牌？'):('翻面？');
			}
			if(event.name=='gain'){
				str+='刚才摸了';
				var str2=(!event.player.isTurnedOver())?('再摸'+get.cnNumber(numb)+'张牌？'):('翻回？');
			}
			str+=(get.cnNumber(numb)+'张牌，是否令其'+str2);
			return str;
		},
		content:function(){
			if(event.triggername=='loseAfter'){
				if(trigger.player.isTurnedOver()){
					trigger.player.chooseToDiscard('he',trigger.num,true);
				}
				else{trigger.player.turnOver(true);}
			}
			else{
				if(trigger.player.isTurnedOver()){
					trigger.player.turnOver(false);
				}
				else{
					trigger.player.draw(trigger.cards.length);
				}
			}
		}
	},
	//--------------------查符039
	'yb039_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	yb039_zhifu:{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		filterCard:function(card){
			var suit=get.suit(card);
			for(var i=0;i<ui.selected.cards.length;i++){
				if(get.suit(ui.selected.cards[i])==suit) return false;
			}
			return true;
		},
		selectCard:1,
		check:function(card){
			if(get.suit(card)=='heart') return 8-get.value(card);
			if(get.suit(card)=='diamond') return 8-get.value(card);
			return 6-get.value(card);
		},
		content:function(){
			'step 0'
			event.list=[get.suit(cards[0]),get.type2(cards[0]),get.number(cards[0])]
			'step 1'
			var nature,num,select;
			switch(event.list[0]){
				case 'spade':nature='thunder';break;
				case 'heart':nature='recover';break;
				case 'club':nature='ice';break;
				case 'diamond':nature='fire';break;
				default:nature='kami';break;
			}
			var numb=(Math.floor(Math.random()*13))<=event.list[2]?[2,3]:[1,1];
			if(get.isLuckyStar(player)) numb=[2,3];
			switch(event.list[1]){
				case 'basic':num=1;select=[1,1];break;
				case 'trick':num=1;select=[1,numb[1]];break;
				default:num=numb[0];select=[1,1];break;
			}
			if(player.hasSkill('yb039_feiyan')&&nature=='fire'){
				(Math.random()*2)>1?num++:select[1]++;
			}
			var cardx='ybsl_magic_'+nature+'_'+num+'_'+select[1];
			event.cardx=cardx;
			if(!lib.card[cardx]){
				lib.card[cardx]={
					audio:true,
					fullskin:true,
					type:'ybsl_magicbook',
					enable:true,
					selectTarget:select,
					damagenum:num,
					damagenature:nature,
					content:function(){
						'step 0'
						var num=(lib.card[get.name(event.card)].damagenum||1)
						event.baseDamage=num;
						var nature=(lib.card[get.name(event.card)].damagenature||'recover')
						event.nature=nature;
						'step 1'
						if(event.nature=='recover'){
							target.recover(event.baseDamage);
						}
						else{
							target.damage(event.baseDamage,event.nature);
						}
					},
					ai:{
						basic:{
							order:function(){
								return 11;
							},
							useful:[5,1],
							value:5,
						},
					},
				}
				if(lib.card[cardx].damagenature=='recover'){
					lib.card[cardx].filterTarget=function(card,player,target){
						return true;
					}
					lib.card[cardx].ai.result={
						target:function(player,target){
							return (target.hp<target.maxHp)?2:0;
						},
						tag:{
							recover:num,
							save:num,
						}
					}
				}
				else{
					lib.card[cardx].filterTarget=function(card,player,target){
						return player!=target;
					}
					lib.card[cardx].ai.result={
						target:function(player,target){
							return -2;
						},
						tag:{
							damage:function(card){
								return 1;
							},
							natureDamage:function(card){
								if(lib.card[card].damagenature) return 1;
							},
							fireDamage:function(card,nature){
								if(lib.card[card].damagenature=='fire') return 1;
							},
							thunderDamage:function(card,nature){
								if(lib.card[card].damagenature=='thunder') return 1;
							},
							iceDamage:function(card,nature){
								if(lib.card[card].damagenature=='ice') return 1;
							},
						}
					}
				}
				lib.translate[cardx+'_info']='出牌阶段，对'+(select[1]==1?'一':'至多'+get.cnNumber(select[1]))+'名'+(nature=='recover'?'':'其他')+'角色使用，目标'+
					(nature=='recover'?'回复':'受到')+get.cnNumber(num)+'点'+
					(nature=='fire'?'火属性伤害':'')+(nature=='thunder'?'雷属性伤害':'')+(nature=='ice'?'冰属性伤害':'')+(nature=='kami'?'神属性伤害':'')+'。';
				lib.translate.recover='愈';
				lib.translate.recover2='治愈';
				event.str=get.translation(nature)+get.cnNumber(select[1],true)+get.cnNumber(num,true);
				event.goto(2);
			}
			else{
				event.goto(4);
			}
			'step 2'
			player.FY_chooseText().set('prompt','请为这张牌命名<br>'+lib.translate[event.cardx+'_info']).set('ai', function () {
				return event.str;
			});
			'step 3'
			lib.translate[event.cardx]=result.text;
			'step 4'
			var cardxx=game.YB_createCard(event.cardx,null,null,null);
			player.showCards(cardxx);
			player.gain(cardxx,'gain2');
		},
		ai:{
			order:8,
			result:{
				player:1,
			},
			// threaten:0.7,//嘲讽值
		},
	},
	yb039_feiyan:{
		audio:'ext:夜白神略/audio/character:2',
		charlotte:true,
		forced:true,
	},
	
	//--------------------蘋姉042
	'yb042_sizhi':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'shizuku_sizhi',
	},
	'yb042_mingtui':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			target:'useCardToTargeted',
		},
		filter:function(event,player){
			if(event.card.number)return true;
		},
		check:function(event,player){
			var num=4;
			if(event.getParent().excluded.includes(player)) num/=2;
			if(get.attitude(player,event.player)>0){
				num*=0;
			}
			num-=get.effect(player,{name:event.card.name},event.player,player);
			return num>0;
		},
		content:function(){
			'step 0'
			var numa=trigger.card.number+1;
			player.chooseToDiscard([1,Infinity],'he').set('ai',function(card){
				var player=_status.event.player;
				var numa=_status.event.numa;
				//if(card.name!='tengjia'&&get.position(card)=='e'&&get.equipValue(card,player)<=0) return 14;
				var num=0;
				for(var i of ui.selected.cards){
					num+=i.number;
				}
				if(num>=numa) return 0;
				if(card.number+num>=numa) return 15-get.value(card);
				if(!ui.selected.cards.length){
					var min=_status.event.min;
					if(card.number<min&&!player.countCards('h',function(xcard){
						return xcard!=card&&card.number+xcard.number>min;
					})) return 0;
					return card.number;
				}
				return Math.max(5-get.value(card),card.number);
			}).set('prompt','请选择要弃置的牌').set('numa',numa).set('min',trigger.card.number+1).set('prompt2','选择的牌点数之和至少为'+(trigger.card.number+1)+'方能抵挡');
			var func=function(id){
				var dialog=get.idDialog(id);
				if(dialog) dialog.content.firstChild.innerHTML='请选择要弃置的牌';
			};
			if(player==game.me) func(event.videoId);
			else if(player.isOnline()) player.send(func,event.videoId);
			'step 1'
			if(result.cards){
				var numx=0;
				for(var i of result.cards){
					numx+=get.number(i);
				}
				event.numx=numx;
				if(event.numx>trigger.card.number){
					trigger.getParent().excluded.add(player);
				}
			}
		},
		/*
		mod:{
			aiValue:function(player,card,num){
				var numb=get.number(card);
				var numc=numb/6;
				return num+numb;
			},
			aiUseful:function(){
				return lib.skill.yb042_mingtui.mod.aiValue.apply(this,arguments);
			},
		},
		*/
	},
	'yb042_lisheng':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{global:'die'},
		forceDie:true,
		skillAnimation:true,
		animationColor:'thunder',
		frequent:true,
		filter:function(event,player){
			if(player.isAlive())return true;
			else{return event.player==player}
		},
		content:function(){
			'step 0'
			if(trigger.player!=player){
				event.player=player;
			}
			else{
				player.chooseTarget(get.prompt2('yb042_lisheng'),lib.filter.notMe).set('ai',function(target){
					return get.attitude(_status.event.player,target);
				});
			}
			'step 1'
			if(event.player.isAlive()){
				var tar=event.player;
			}
			else{var tar=result.targets[0];}
			var cards=[];
			for(var i of lib.suit){
				var card=get.cardPile2(function(card){
					return get.suit(card,false)==i;
				});
				if(card) cards.push(card);
			}
			if(tar){
				if(cards.length) tar.gain(cards,'gain2');
				tar.recover();
			}
		},
	},
	//--------------------房佳谕043
	// yb043_zhishi:'知世',
	// yb043_zhishi_info:'每回合限一次，你可以使用一张弃牌堆中你本回合没有使用的牌名的一张牌。该牌结算完毕后，你重置【书海】。',
	// yb043_shuhai:'书海',
	// yb043_shihai_info:'每回合限一次，你可以将两张手牌当做任意一张普通锦囊牌使用。该牌结算完毕后，你重置【知世】。',
	/*
	yb043_zhishi:{
		audio:'ext:夜白神略/audio/character:2',
		enable:'chooseToUse',
		usable:1,
		group:'yb043_zhishi_2',
		subSkill:{
			'2':{
				trigger:{
					player:['useCardAfter'],
				},
				forced:true,
				charlotte:true,
				popup:false,
				filter:function (event,player){
					return event.skill=='yb043_zhishi_backup';
				},
				content:function (){
					// delete player.getStat('skill')['yb043_shuhai'];
					delete player.storage.counttrigger['yb043_shuhai'];
					// delete player.storage.counttrigger['yb043_zhishi'];
				},
				sub:true,
			},
			backup:{
				sub:true,
			},
		},
		filter:function(event,player){
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;
			var list = Array.from(ui.discardPile.childNodes);
			// var list=ui.discardPile.childNodes;
			// game.log(list)
			for( var i of list){
				if(evt(i,player,event)) return true;
			}
		},
		chooseButton: {
			dialog: function (event, player) {
				// var cards = ui.discardPile.childNodes;
				var cards = Array.from(ui.discardPile.childNodes);
				return ui.create.dialog('知世', cards, 'hidden');
			},
			filter: function (button, player) {
				var card = button.link;
				var name=card.name;
				// if(lib.skill.yb043_zhishi.getUsed(player).includes(name)) return false;
				return _status.event.getParent().filterCard({name: card.name}, player, _status.event.getParent());
			},
			backup: function (links, player) {
				// var skill = _status.event.buttoned;
				return {
					audio: 'yb043_zhishi',
					selectCard: -1,
					// position: 'x',
					discard: false,
					lose: false,
					filterCard: function () {
						return false
					},
					// viewAs: {
					// 	name: links[0].name,
					// 	nature: links[0].nature,
					// },
					card: links[0],
				}
			},
			prompt: function (links, player) {
				return `知世:选择 ${get.translation(links[0])}的目标`;
			},
		},
		hiddenCard: function (player, name) {
			for(var i of ui.discardPile.childNodes){
				var namea=i.name;
				// if(lib.skill.yb043_zhishi.getUsed(player).includes(namea)) break;
				if(evt(i,player,event)) return true;
			}
			// var type = get.type(name);
			// return type == 'trick';
		},
	},
	*/
	yb043_zhishi:{
		audio:'ext:夜白神略/audio/character:2',
		audioname2:{
			'ybsl_020jiayutong':'yb020_zhishi',
			'ybsl_046jiangxuewu':'yb046_zhishi',
			// 'ybsl_046jiangxuewu':'yb046_zhishi',
		},
		enable:'chooseToUse',
		// name:'<span class=firetext>知世</span>',
		// usable:1,
		// nobracket:true,
		YB_shiji:'yang',
		group:'yb043_zhishi_2',
		filter:function (event,player){
			// if(player.countCards('h')<2) return false;
			// if(player.hasSkill('ybsl_shiji_yang'))return false;
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;//此时点能用的牌
			// for(var i of lib.inpile){
			// 	// var type=get.type(i);
			// 	var list=ui.discardPile.childNodes;
			// 	if(!list.includes({name:i})) break;
			// 	if(lib.skill.yb043_zhishi.getUsed(player).includes(i)) break;
			// 	if(evt({name:i},player,event)) return true;
			// };
			// Array.from(ui.discardPile.childNodes);
			for(var i of Array.from(ui.discardPile.childNodes)){
				var namea=i.name;
				// if(lib.skill.yb043_zhishi.getUsed(player).includes(namea)) break;
				if(evt(i,player,event)&&!lib.skill.yb043_zhishi.getUsed(player).includes(namea)) return true;
			}
			// return false;
		},
		getUsed: function (player) {
			var list = [];
			player.getHistory("useCard", function (evt) {
				list.add(evt.card.name);//（活墨改的
			});
			return list;
		},
		chooseButton: {
			dialog: function (event, player) {
				var cards = Array.from(ui.discardPile.childNodes);
				return ui.create.dialog('知世', cards.filter(function(card){
					// var namea=get.name(i);
					// if(lib.skill.yb043_zhishi.getUsed(player).includes(namea)) return false;
					return true;
				}), 'hidden');
			},
			filter: function (button, player) {
				var card = button.link;
				var name=card.name;
				if(lib.skill.yb043_zhishi.getUsed(player).includes(name)) return false;
				return _status.event.getParent().filterCard({name: card.name}, player, _status.event.getParent());
			},
			backup:function (links, player) {
				// var skill = _status.event.buttoned;
				return {
					audio: 'yb043_zhishi',
					// YB_shiji:'yang',
					selectCard: 0,
					// position: 'x',
					discard: false,
					lose: false,
					filterCard: function () {
						return true
					},
					viewAs: {
						name: links[0].name,
						nature: links[0].nature,
					},
					card: links[0],
					precontent:function(){
						// player.YB_shiji(true);
						// player.YB_tempy('ybsl_shiji_yang')
						var cardv=lib.skill.yb043_zhishi_backup.card;
						event.result.cards=cardv;
					}
				}
			},
			prompt: function (links, player) {
				return `知世:选择 ${get.translation(links[0])}的目标`;
			},
		},
		hiddenCard: function (player, name) {
			// var evt=lib.filter.filterCard;
			for(var i of Array.from(ui.discardPile.childNodes)){
				var namea=i.name;
				// if(lib.skill.yb043_zhishi.getUsed(player).includes(namea)) break;
				if(name==namea&&!lib.skill.yb043_zhishi.getUsed(player).includes(namea)) return true;
			}
			// var type = get.type(name);
			// return type == 'trick';
		},
		subSkill:{
			'2':{
				trigger:{
					player:['useCardAfter'],
				},
				forced:true,
				charlotte:true,
				popup:false,
				filter:function (event,player){
					return event.skill=='yb043_zhishi_backup';
				},
				content:function (){
					// player.YB_shiji(true);

					// game.log(player,'重置了','#g【书海】')
					// delete player.getStat('skill')['yb043_shuhai'];
					// delete player.storage.counttrigger['yb043_shuhai'];
					// delete player.storage.counttrigger['yb043_zhishi'];
				},
				sub:true,
			},
			backup:{
				sub:true,
			},
		},
		ai:{
			order:10,
			result:{
				player:function (player){
					if(_status.event.dying) return get.attitude(player,_status.event.dying);
					return 1;
				},
			},
		}
	},
	yb043_shuhai:{
		audio:'ext:夜白神略/audio/character:2',
		enable:'chooseToUse',
		// name:'<span class=thundertext>书海</span>',
		// usable:1,
		// nobracket:true,
		YB_shiji:'yin',
		filter:function (event,player){
			// if(player.hasSkill('ybsl_shiji_yin'))return false;
			if(player.countCards('h')<2) return false;
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;
			for(var i of lib.inpile){
				var type=get.type(i);
				// if(lib.skill.yb043_zhishi.getUsed(player).includes(i)) break;
				if(type=='trick'&&evt({name:i},player,event)&&!lib.skill.yb043_zhishi.getUsed(player).includes(i)) return true;
			};
			return false;
		},
		group:'yb043_shuhai_2',
		chooseButton:{
			dialog:function (event,player){
				var list=[];
				for(var i=0;i<lib.inpile.length;i++){
					if(get.type(lib.inpile[i])=='trick') list.push(['锦囊','',lib.inpile[i]]);
				}
				return ui.create.dialog('贤者',[list,'vcard']);
			},
			filter:function (button,player){
				var card = button.link;
				var name=button.link[2];
				if(lib.skill.yb043_zhishi.getUsed(player).includes(name)) return false;
				return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
			},
			check:function (button){
				if(_status.event.getParent().type!='phase') return 1;
				var player=_status.event.player;
				if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan_gai','lianjunshengyan','diaohulishan'].includes(button.link[2])) return 0;
				return player.getUseValue({
					name:button.link[2],
					nature:button.link[3],
				});
			},
			backup:function (links,player){
				return {
					audio:'yb043_shuhai',
					// YB_shiji:'yin',
					filterCard:true,
					selectCard:2,
					complexCard:true,
					position:'h',
					popname:true,
					viewAs:{name:links[0][2]},
					precontent:function(){
						// player.YB_shiji();
						// player.YB_tempy('ybsl_shiji_yin')
						// player.addTempSkill('dz015_xianzhe_2');
					},
				};
			},
			prompt:function (links,player){
				return '将两张手牌当作'+get.translation(links[0][2])+'使用';
			},
		},
		hiddenCard:function (player,name){
			var type=get.type(name);
			// var name=card.name;
			if(lib.skill.yb043_zhishi.getUsed(player).includes(name)) return false;
			return type=='trick'&&player.countCards('h')>=2;
		},
		ai:{
			fireAttack:true,
			respondSha:true,
			respondShan:true,
			skillTagFilter:function (player){
				if(player.countCards('h')<2) return false;
			},
			threaten:1.2,//嘲讽值
			order:10,
			result:{
				player:function (player){
					if(_status.event.dying) return get.attitude(player,_status.event.dying);
					return 1;
				},
			},
		},
		subSkill:{
			'2':{
				trigger:{
					player:['useCardAfter'],
				},
				forced:true,
				charlotte:true,
				popup:false,
				filter:function (event,player){
					return event.skill=='yb043_shuhai_backup';
				},
				content:function (){
					// player.YB_shiji();

					// delete player.getStat('skill')['yb043_shuhai'];
					// game.log(player,'重置了','#g【知世】')
					// delete player.getStat('skill')['yb043_zhishi'];
					// delete player.storage.counttrigger['yb043_shuhai'];
					// delete player.storage.counttrigger['yb043_zhishi'];
				},
				sub:true,
			},
			backup:{
				sub:true,
			},
		},
	},
	//--------------------胡瑞航044
	//--------------------高聪045
	//--------------------江雪舞046
	yb046_zhishi:{
		audio:'ext:夜白神略/audio/character:2',
	},
	yb046_xuewu:{
		audio:'ext:夜白神略/audio/character:2',
		enable:'chooseToUse',
		filter:function (event,player){
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;
			if(Array.from(ui.discardPile.childNodes).length<=0)return false;
			for(var i of lib.inpile){
				var type=get.type(i);
				if(type=='basic'&&evt({name:i},player,event)) return true;
			};
			return false;
		},
		hiddenCard:function (player,name){
			var type=get.type(name);
			return type=='basic'&&player.countCards('h')>=1;
		},
		chooseButton:{
			dialog:function (event,player){
				var list=[];
				var nature=null;
				for(var i=0;i<lib.inpile.length;i++){
					if(get.type(lib.inpile[i])=='basic'){
						list.push(['基本','',lib.inpile[i],null]);
						if(lib.inpile[i]=='sha'){
							for(var k of get.YB_natureList()){
								k=get.YB_nature(k);
								list.push(['基本','',lib.inpile[i],k]);
							}
						}
					} 
				}
				return ui.create.dialog('雪舞',[list,'vcard']);
			},
			filter:function (button,player){
				return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
			},
			check:function (button){
				if(_status.event.getParent().type!='phase') return 1;
				var player=_status.event.player;
				return player.getUseValue({
					name:button.link[2],
					nature:button.link[3],
				});
			},
			backup:function (links,player){
				return {
					filterCard:function(card,player){
						var cards=Array.from(ui.discardPile.childNodes);
						var cardx = cards[cards.length-1]
						// var cardx = Array.from(ui.discardPile.childNodes)[0];
						return get.suit(card)==get.suit(cardx);
						return card.suit==cardx.suit;
					},
					selectCard:1,
					complexCard:true,
					position:'h',
					audio:'yb046_xuewu',
					popname:true,
					viewAs:{name:links[0][2],nature:links[0][3]},
					// precontent:function(){
					// 	player.addTempSkill('dz015_xianzhe_2');
					// },
					prompt:function (links,player){
						var cards=Array.from(ui.discardPile.childNodes);
						var cardx = cards[cards.length-1]
						return '将一张'+get.translation(get.suit(cardx))+'手牌当作'+links[0][3]==null?'':get.translation(links[0][3])+get.translation(links[0][2])+'使用';
						// return '将一张'+get.translation(cardx.suit)+'手牌当作'+links[0][3]==null?'':get.translation(links[0][3])+get.translation(links[0][2])+'使用';
					},
				};
			},
		},
		ai:{
			fireAttack:true,
			respondSha:true,
			respondShan:true,
			save:true,
			// skillTagFilter:function (player){
			// 	// if(player.hasSkill('dz015_xianzhe_2')||player.countCards('h')<2) return false;
			// 	//待写
			// },
			order:4,
			result:{
				player:function (player){
					if(_status.event.dying) return get.attitude(player,_status.event.dying);
					return 1;
				},
			},
		},
	},
	yb046_qingxue:{
		audio:'ext:夜白神略/audio/character:2',
		YB_shiji:'yin',
		name:'清雪',
		trigger:{
			source:'damageSource',
			player:'damageEnd',
		},
		filter(event,player) {
			if (event._notrigger.includes(event.player)) return false;
			if(event.source == event.player)return false;
			if (event.player == player) var target=event.source;
			else var target=event.player;
			return event.num && target.isIn() && player.isIn() /*&& target.countCards('he')>0*/;
			// return event.num && event.source && event.player && event.player.isIn() && event.source.isIn() && event.source != event.player;
		},
		check(event, player) {
			if (event.player == player) var target=event.source;
			else var target=event.player;
			// return get.attitude(player, event.player) < 0;
			return true;
		},
		logTarget(event, player) {
			if (event.player == player) return event.source;
			return event.player;
		},
		content:async function(event, trigger, player) {
			if (trigger.player == player) var target=trigger.source;
			else var target=trigger.player;
			if(target.countDiscardableCards(player,'he')){
				var result=await player.discardPlayerCard('he',target,[1,2]).set('ai',function(button){
					var att=get.attitude(player,target);
					if(att>=0)return false;
					return get.value(button.link)>5;
				}).forResult();
			}
			var num=2;
			if(result?.cards){
				var list =get.YB_suit(result.cards);
				num-=list.length;
				await target.draw(list.length);
			}
			if(num>0)await player.draw(num);
		},
		subSkill:{
			yb:{
				name:'清雪',
			}
		}
	},
	//--------------------彡047
	yb047_youhun:{
		audio:'ext:夜白神略/audio/character:2',
		audioname2:{
			ybsl_038bianqiuwen:'yb038_youhun',
		},
		enable:'chooseToUse',
		zhuanhuanji:true,
		mark:true,
		intro:{
			content:function(storage,player){
				var str=storage?'你可以将X+Y张牌当作任意一张基本使用。':'你可以将X+Y张牌当作任意一张普通锦囊牌使用。';
				str+='<br>（X为本轮此技能使用次数且至少为0，Y为本局游戏内以此法增加的体力上限数，且至少为0）';
				return str;
			},
		},
		marktext:'☯',
		init:function(player){
			player.storage.yb047_youhun=false;
		},
		hiddenCard:function(player,name){
			var type=get.type(name);
			if(player.storage.yb047_youhun) return type=='basic';
			return type=='trick';
		},
		filter:function(event,player){
			var type=player.storage.yb047_youhun?'basic':'trick';
			for(var name of lib.inpile){
				if(get.type(name)!=type) continue;
				if(event.filterCard({name:name,isCard:true},player,event)) return true;
			}
			return false;
		},
		chooseButton:{
			dialog:function(event,player){
				var dialog=ui.create.dialog('游魂','hidden');
				var type=player.storage.yb047_youhun?'basic':'trick';
				var list=[];
				for(var name of lib.inpile){
					if(get.type(name)!=type) continue;
					if(event.filterCard({name:name,isCard:true},player,event)){
						list.push([type,'',name]);
						if(name=='sha'){
							for(var j of get.YB_natureList()){
								j=get.YB_nature(j);
								list.push([type,'',name,j]);
							} 
						}
					}
				}
				dialog.add([list,'vcard']);
				return dialog;
			},
			filter:function(button){
				if(ui.selected.buttons.length&&typeof button.link==typeof ui.selected.buttons[0].link) return false;
				return true;
			},
			select:function(){
				return 1;
			},
			check:function(button){
				var player=_status.event.player;
				if(typeof button.link=='number'){
					var card=player.getEquip(button.link);
					if(card){
						var val=get.value(card);
						if(val>0) return 0;
						return 5-val;
					}
					switch(button.link){
						case 3:return 4.5;break;
						case 4:return 4.4;break;
						case 5:return 4.3;break;
						case 2:return (3-player.hp)*1.5;break;
						case 1:{
							if(game.hasPlayer(function(current){
								return (get.realAttitude||get.attitude)(player,current)<0&&get.distance(player,current)>1;
							})) return 0;
							return 3.2;
						}
					}
				}
				var name=button.link[2];
				var evt=_status.event.getParent();
				if(get.type(name)=='basic'){
					if(name=='shan') return 2;
					if(evt.type=='dying'){
						if(get.attitude(player,evt.dying)<2) return false;
						if(name=='jiu') return 2.1;
						return 1.9;
					}
					if(evt.type=='phase') return player.getUseValue({name:name,nature:button.link[3],isCard:true});
					return 1;
				}
				if(!['chuqibuyi','shuiyanqijunx','juedou','nanman','wanjian','shunshou','zhujinqiyuan'].includes(name)) return 0;
				var card={name:name,isCard:true};
				if(['shunshou','zhujinqiyuan'].includes(card.name)){
					if(!game.hasPlayer(function(current){
						return get.attitude(player,current)!=0&&get.distance(player,current)<=1&&player.canUse(card,current)&&get.effect(current,card,player,player)>0;
					})) return 0;
					return player.getUseValue(card)-7;
				}
				return player.getUseValue(card)-4;
			},
			backup:function(links,player){
				return {
					audio:'yb047_youhun',
					filterCard:function(){
						return true;
					},
					selectCard:function(){
						var numa=0;
						if(player.countMark('yb047_youhun_round')>0)numa=player.countMark('yb047_youhun_round');
						var numb=0;
						if(player.countMark('yb047_youhun_maxHp')>0)numb=player.countMark('yb047_youhun_maxHp');
						return numa+numb;
					},
					viewAs:{
						name:links[0][2],
						nature:links[0][3],
						isCard:true,
					},
					position:'hes',
					popname:true,
					precontent:function(){
						player.logSkill('yb047_youhun');
						player.addTempSkill('yb047_youhun_round','roundStart');
						player.addMark('yb047_youhun_round');
						player.changeZhuanhuanji('yb047_youhun');
						player.markSkill('yb047_youhun_maxHp')
					},
				}
			},
			prompt:function(links,player){
				var name=links[0][2];
				var nature=links[0][3];
				var str='视为使用一张'+(get.translation(links[0][3])||'')+get.translation(links[0][2]);
				var numa=0;
				if(player.countMark('yb047_youhun_round')>0)numa=player.countMark('yb047_youhun_round');
				var numb=0;
				if(player.countMark('yb047_youhun_maxHp')>0)numb=player.countMark('yb047_youhun_maxHp');
				if((numa+numb)>0)var str='将'+get.cnNumber(numa+numb)+'张牌当作'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'使用。';
				return str;
			},
		},
		ai:{
			respondSha:true,
			respondShan:true,
			skillTagFilter:function(player,tag,arg){
				if(arg=='respond') return false;
				if(!player.storage.yb047_youhun||player.hasSkill('yb047_youhun_true')) return false;
			},
			order:1,
			result:{
				player:1,
			},
		},
		group:['yb047_youhun_damage','yb047_youhun_maxHp'],
		subSkill:{
			round:{
				charlotte:true,
				onremove:true,
			},
			maxHp:{
				charlotte:true,
				onremove:true,
				mark:true,
				marktext:'魂',
				intro:{
					content:function (storage,player){
						var str='当前X值为';
						var numa=0;
						if(player.countMark('yb047_youhun_round')>0)numa=player.countMark('yb047_youhun_round');
						str+=numa;
						str+='，Y值为';
						var numb=0;
						if(player.countMark('yb047_youhun_maxHp')>0)numb=player.countMark('yb047_youhun_maxHp');
						str+=numb;
						str+='。';
						return str;
					},
				},
				direct:true,
				locked:true,
				trigger:{
					player:'disableEquipAfter'
				},
				content:function(){
					if(player.countMark('yb047_youhun_maxHp')>0){
						player.removeMark('yb047_youhun_maxHp');
						game.log(player,'令','#y'+'游魂','的Y计数-1。');
					}
				},
			},
			damage:{
				charlotte:true,
				trigger:{source:'damageSource'},
				direct:true,
				locked:true,
				filter:function(event,player){
					return event.getParent().skill=='yb047_youhun_backup';
				},
				content:()=>{
					player.gainMaxHp();
					player.addMark('yb047_youhun_maxHp');
					game.log(player,'令','#y'+'游魂','的Y计数+1。');
				},
			},
		}
	},
	yb047_wanxin:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{global:'phaseEnd'},
		hasHistory:function(player){
			return player.getHistory('damage').length>0;
		},
		filter:function(event,player){
			return game.hasPlayer(function(current){
				return lib.skill.yb047_wanxin.hasHistory(current);
			});
		},
		direct:true,
		content:function(){
			'step 0'
			player.chooseTarget(get.prompt2('yb047_wanxin'),function(card,player,target){
				return _status.event.yuus.includes(target);
			}).set('yuus',game.filterPlayer(function(current){
				return lib.skill.yb047_wanxin.hasHistory(current);
			})).set('ai',function(target){
				return get.attitude(_status.event.player,target);
			});
			'step 1'
			if(result.bool){
				var target=result.targets[0];
				event.target=target;
				player.logSkill('yb047_wanxin',target);
				target.draw(2);
			}
			else event.finish();
			'step 2'
			player.turnOver(false);
			'step 3'
			player.link(false);
			if(target==player) event.finish();
			'step 4'
			target.turnOver(false);
			'step 5'
			target.link(false);
		},
	},
	yb047_shouqing:{
		audio:'ext:夜白神略/audio/character:2',
		global:'yb047_shouqing2',
	},
	yb047_shouqing2:{
		enable:'phaseUse',
		viewAs:function(){
			return {name:'tao'}
		},
		filterCard:{name:'tao'},
		ignoreMod:true,
		filterTarget:function(card,player,target){
			return target!=player&&target.isDamaged()&&target.hasSkill('yb047_shouqing');
		},
		selectTarget:function(){
			return game.countPlayer(function(current){
				return lib.skill.yb047_shouqing2.filterTarget(null,_status.event.player,current);
			})>1?1:-1;
		},
		filter:function(event,player){
			return player.countCards('hs','tao')&&game.hasPlayer(function(current){
				return lib.skill.yb047_shouqing2.filterTarget(null,player,current)
			});
		},
		position:'hs',
		onuse:function(links,player){
			player.addSkill('yb047_shouqing3');
			player.addMark('yb047_shouqing3',1,false);
		},
		prompt:function(){
			var list=game.filterPlayer(function(current){
				return lib.skill.yb047_shouqing2.filterTarget(null,_status.event.player,current);
			});
			var str='对'+get.translation(list);
			if(list.length>1) str+='中的一名角色';
			str+='使用一张【桃】';
			return str;
		},
	},
	yb047_shouqing3:{
		intro:{
			content:'手牌上限+#',
		},
		mod:{
			maxHandcard:function(player,num){
				return num+player.countMark('yb047_shouqing3');
			},
		},
		trigger:{player:'useCardAfter'},
		forced:true,
		popup:false,
		filter:function(event,player){
			return event.skill=='yb047_shouqing2';
		},
		content:function(){
			player.draw();
		},
	},
	//--------------------吴爽048
	yb048_ningyuan:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{player:'phaseDiscardBegin'},
		direct:true,
		filter:function(event,player){
			return player.countCards('h')>0;
		},
		content:function(){
			'step 0'
			player.chooseCard('h',get.prompt('yb048_ningyuan'),[1,5],'将至多五张手牌置于武将牌上作为“元”').set('ai',function(card){
				if(ui.selected.cards.length>=player.needsToDiscard()) return 6-get.value(card);
				return 100-get.useful(card);
			});
			'step 1'
			if(result.bool){
				var cards=result.cards;
				player.logSkill('yb048_ningyuan');
				player.addToExpansion(cards,player,'give').gaintag.add('yb048_ningyuan');
			}
		},
		marktext:'元',
		intro:{
			content:'expansion',
			markcount:'expansion',
		},
		onremove:function(player,skill){
			var cards=player.getExpansions(skill);
			if(cards.length) player.loseToDiscardpile(cards);
		},
		group:['yb048_ningyuan_use','yb048_ningyuan_discard'],
		subSkill:{
			use:{
				audio:'yb048_ningyuan',
				trigger:{player:'useCard'},
				forced:true,
				locked:false,
				filter:function(event,player){
					return player.getExpansions('yb048_ningyuan').length>0;
				},
				content:function(){
					'step 0'
					var num=Math.min(5,player.isMaxHandcard(true)?1:player.getExpansions('yb048_ningyuan').length);
					if(num>0) player.draw(num);
					'step 1'
					var cards=player.getExpansions('yb048_ningyuan');
					if(cards.length) player.chooseButton(['选择移去一张“旋”',cards],true);
					else event.finish();
					'step 2'
					if(result.bool) player.loseToDiscardpile(result.links);
				},
			},
			discard:{
				// trigger:{player:'phaseUseEnd'},
				// forced:true,
				// locked:false,
				// filter:function(event,player){
				// 	return player.getExpansions('yb048_ningyuan').length>0;
				// },
				// content:function(){
				// 	player.loseToDiscardpile(player.getExpansions('yb048_ningyuan'));
				// },
			},
		},
	},
	yb048_wuling:{
		audio:'ext:夜白神略/audio/character:2',
		group:'yb004_wunv',
		derivation:['yb004_wunv'],
		enable:'phaseUse',
		usable:1,
		locked:true,
		filter:function(event,player){
			return player.countCards('h')>0;
		},
		filterCard:true,
		selectCard:function(){
			if(ui.selected.targets.length) return [1,ui.selected.targets[0].countCards('he')];
			return [1,Infinity];
		},
		filterTarget:function(event,player,target){
			return target!=player&&target.countCards('he')>=Math.max(1,ui.selected.cards.length);
		},
		check:function(card){
			if(!game.hasPlayer(function(current){
				return current!=_status.event.player&&get.attitude(_status.event.player,current)<0&&current.countCards('he')>ui.selected.cards.length;
			})) return 0;
			return 6-get.value(card);
		},
		content:function(){
			'step 0'
			event.cardsx=cards.slice(0);
			var num=get.cnNumber(cards.length);
			var trans=get.translation(player);
			var prompt=('弃置'+num+'张牌，然后'+trans+'摸一张牌');
			if(cards.length>1) prompt+=('；或弃置一张牌，然后'+trans+'摸'+num+'张牌');
			var next=target.chooseToDiscard(prompt,'he',true);
			next.numx=cards.length;
			next.selectCard=function(){
				if(ui.selected.cards.length>1) return _status.event.numx;
				return [1,_status.event.numx];
			};
			next.complexCard=true;
			next.ai=function(card){
				if(ui.selected.cards.length==0||(_status.event.player.countCards('he',function(cardxq){
					return get.value(cardxq)<7;
				})>=_status.event.numx)) return 7-get.value(card);
				return -1;
			};
			'step 1'
			if(result.bool){
				if(result.cards.length==cards.length) player.draw();
				else player.draw(cards.length);
				event.cardsx.addArray(result.cards);
				for(var i=0;i<event.cardsx.length;i++){
					if(get.position(event.cardsx[i])!='d') event.cardsx.splice(i--,1);
				}
			}
			else event.finish();
			'step 2'
			if(event.cardsx.length){
				player.chooseButton(['请按顺序将卡牌置于牌堆顶（先选择的在上）',event.cardsx],true,event.cardsx.length);
			}
			else event.finish();
			'step 3'
			if(result.bool){
				event.cardsxx=result.links;
				if(player.hasSkill('yb048_ningyuan')){
					player.chooseControl('是','cancel2').set('prompt','是否将这些牌置于武将牌上充入凝元？');
				}
				else event.goto(6);
			}
			'step 4'
			if(result.control!='是'){
				event.goto(6);
			}
			'step 5'
			delete event.cardxx;
			var cards=event.cardsxx;
			player.addToExpansion(cards,player,'give').gaintag.add('yb048_ningyuan');
			event.finish();
			'step 6'
			if(event.cardsxx){
				while(event.cardsxx.length){
					var card=event.cardsxx.pop();
					card.fix();
					ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
				}
			}
			event.finish();
		},
		ai:{
			threaten:3,//嘲讽值
			expose:1,//跳立场
			order:10,
			result:{
				target:-1,
			},
		},
	},
	yb048_huanjie:{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'key_huanjie',
	},
	yb048_zhimeng:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			global:'judgeEnd',
			player:'phaseDrawBegin2',
		},
		preHidden:true,
		filter:function(event,player,name){
			if(name=='phaseDrawBegin2')return player.getExpansions('yb048_zhimeng');
			else return get.position(event.result.card,true)=='o';
		},
		content:function(){
			if(event.triggername=='phaseDrawBegin2'){
				var cards=player.getExpansions('yb048_zhimeng');
				var list=[];
				for(var i of cards){
					list.add(get.suit(i));
				}
				trigger.num+=list.length;
			}
			else {
				player.addToExpansion(trigger.result.card,'gain2').gaintag.add('yb048_zhimeng');
			}
		},
		mark:true,
		intro:{
			markcount:'expansion',
			mark:function(dialog,content,player){
				var content=player.getExpansions('yb048_zhimeng');
				if(content&&content.length){
					dialog.addAuto(content);
				}
			},
			content:function(content,player){
				var content=player.getExpansions('yb048_zhimeng');
				if(content&&content.length){
					return get.translation(content);
				}
			}
		},
		mod:{
			maxHandcard:function (player,num){
				var cards=player.getExpansions('yb048_zhimeng');
				var list=[];
				for(var i of cards){
					list.add(get.suit(i));
				}
				return num+list.length;
			},
		}
	},
	yb048_shennv:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{player:'useCard'},
		content:function(){
			'step 0'
			player.judge('神女',function(card){;
				if(get.suit(card)==get.suit(trigger.card)){
					if(!get.tag(trigger.card,'norepeat'))return 2;
					return -1;
				}
				return 0;//这里return 的数字别私自改
			});
			'step 1'
			if(result.judge!=0){
				trigger.effectCount++;
			}
		}
	},
	yb048_minzhen:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			global:'phaseBegin',
		},
		filter:function(event,player){
			if(!player.getExpansions('yb048_zhimeng'))return false;
			var cards=player.getExpansions('yb048_zhimeng');
			if(cards.length>=event.player.maxHp)return true;
			return false;
		},
		content:function(){
			'step 0'
			event.cards=player.getExpansions('yb048_zhimeng');
			event.num=trigger.player.maxHp;
			'step 1'
			player.chooseButton(event.num,[
				'罠阵：请选择'+event.num+'张牌',
				event.cards,
			],true);
			'step 2'
			if(result.bool){
				event.cardsx=result.links;
			}
			'step 3'
			if(event.cardsx.length){
				player.chooseButton(['罠阵：请按顺序将卡牌置于牌堆顶（先选择的在上）',event.cardsx],true,event.cardsx.length);
			}
			else event.finish();
			'step 4'
			if(result.bool){
				var cardsx=result.links;
				while(cardsx.length){
					var card=cardsx.pop();
					card.fix();
					ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
				}
				game.updateRoundNumber();
			}
		}
	},
	//--------------------王婉儿049
	yb049_rongxiao:{
		audio:'ext:夜白神略/audio/character:2',
		limited:true,
		skillAnimation:true,
		animationColor:"YB_snow",
		trigger:{
			player:['damageEnd','recoverEnd'],
		},
		filter(event,player){
			var discarded=ui['discardPile'].childNodes;
			if(discarded.length){
				for(var i of discarded){
					if(get.type(i)=='trick')return true;
				}
			}
			return false;
		},
		cost(){
			event.result = player.chooseTarget(1,get.prompt2('yb049_rongxiao')).set('filterTarget',function(card,player,target){
				return target!=player&&target.hp<player.hp;
			}).set('ai',function(target){
				return get.attitude(player,target);
			}).forResult();
		},
		content(){
			'step 0'
			player.awakenSkill('yb049_rongxiao')
			'step 1'
			var discarded=ui['discardPile'].childNodes;
			event.list = [];
			if(discarded.length){
				for(var i of discarded){
					if(get.type(i)=='trick')event.list.push(i);
				}
			}
			if(event.list.length){
				event.targets[0].chooseCardButton('选择一张获得之',event.list,true).set('ai',function(button){
					return get.value(button.link);
				});
			}
			'step 2'
			if(result.bool&&result.links){
				var gaintag=[];
				gaintag.add('yb049_rongxiao');
				player.addSkill('yb049_rongxiao_use');
				event.targets[0].gain(result.links,'gain2').gaintag.addArray(gaintag);
			}
		},
		subSkill:{
			use:{
				trigger:{
					global: ["useCardAfter"],
				},
				filter:function(event,player){
					return event.player.hasHistory("lose", evt => evt.getParent() == event && Object.values(evt.gaintag_map).some(value => value.includes("yb049_rongxiao")))&&!event.yb049_rongxiao;
				},
				popup:false,
				content(){
					var cards = trigger.cards;
					var card = trigger.card;
					trigger.yb049_rongxiao=true;
					if(player.hasUseTarget(card)){
						player.chooseUseTarget(
							card,
							false //若有false，此牌不计入次数。
						).set('logSkill','yb049_rongxiao')
					}
				}
			}
		}
	},
	yb049_fuhun:{
		audio:'ext:夜白神略/audio/character:2',
		limited:true,
		skillAnimation:true,
		animationColor:"YB_snow",
		trigger:{
			global:'damageEnd',
		},
		filter(event,player){
			return event.player.isIn()&&event.source&&event.source!=event.player;
		},
		logTarget:function(event,player){
			return event.player;
		},
		content(){
			'step 0'
			player.awakenSkill('yb049_fuhun')
			'step 1'
			player.addSkill('yb049_fuhun_use');
			var gaintag = ['yb049_fuhun'];
			trigger.player.draw(4).gaintag.addArray(gaintag);
		},
		subSkill:{
			use:{
				trigger:{
					global: ["loseAfter",'loseAsyncAfter'],
				},
				popup:false,
				filter:function(event,player){
					if (event.type != "discard") {
						return false;
					}
					return event.player.hasHistory("lose", evt => {
						if(evt!=event&&evt.getParent() != event ){
							return false;
						}
						event.cardsx = [];
						evt.cards.forEach(c=>{
							if(evt.gaintag_map[c.cardid]&&evt.gaintag_map[c.cardid].includes("yb049_fuhun")&&!event.cardsx.includes(c)){
								// console.log('c',c);
								event.cardsx.push(c);
							}
						})
						// for(var i in evt.gaintag_map){
						// 	if(evt.gaintag_map[i].includes("yb049_fuhun")){
						// 		console.log('evt.cards',evt.cards);
						// 		evt.cards.forEach(c=>{
						// 			if(c.cardid = i&&!event.cardsx.includes(c)){
						// 				console.log('c',c);
						// 				event.cardsx.push(c);
						// 			}
						// 		})
						// 	}
						// }
						// console.log('event.cardsx',event.cardsx);
						return event.cardsx.length>0;
					})&&!event.yb049_fuhun;
				},
				content(){
					'step 0'
					var cards = trigger.cardsx;
					trigger.yb049_fuhun=true;
					// if(cards.length>1){
					player.chooseButton(['选择一张使用之？',cards],1).set('filterButton',function(button){
						var cardxx=button.link;
						if(player.hasUseTarget(cardxx))return lib.filter.filterCard.apply(this,arguments);
						return false;
					})
					// }
					// else {
					// 	event.result = {bool:true,links:cards}
					// }
					'step 1'
					if(result.links){
						var card = result.links[0];
						if(player.hasUseTarget(card)){
							player.chooseUseTarget(
								card,
								false //若有false，此牌不计入次数。
							).set('logSkill','yb049_fuhun')
						}
					}
				}
			},
		},
	},
	yb049_zhongliu:{
		audio:'ext:夜白神略/audio/character:2',
	},
	//--------------------鐏柬050
	//--------------------北落师门051
	//--------------------姜森052
	yb052_chongji:{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		enable:'phaseUse',
		filter:function(event,player){
			return player.countCards('h')>0;
		},
		filterTarget:lib.filter.notMe,
		selectTarget:1,
		filterCard:true,
		// selectCard:[1,Infinity],
		selectCard:function(){
			var player=_status.event.player;
			var num = Math.min(player.hp,5);
			return [1,num];
		},
		check:function (card){
			var player=_status.event.player;
			if(ui.selected.cards&&ui.selected.cards.length>0) return 6-get.value(card)&&get.color(card)==get.color(ui.selected.cards[0]);
			return 6-get.value(card);
		},
		position:'he',
		content:async function(event, trigger, player) {
			let cards=event.cards,target=event.target;
			var num=cards.length;
			var cards1=[];
			cards1.push(Array.from(cards));
			if(target.countDiscardableCards(player,'he')){
				var relu = await player.discardPlayerCard('he',target,true,target.countDiscardableCards(player,'he')>num?num:target.countDiscardableCards(player,'he')).forResult();
				if(relu.cards) cards1.push(Array.from(relu.cards));
			}
			if(get.YB_suit(cards1,'color').length==1)await target.damage(num);
		},
		ai:{
			order:5,
			result:{
				target:function(player,target){
					return get.damageEffect(target,player);
				},
			}
		}
	},
	// yb052_chongji:'冲击',
	// yb052_chongji_info:'出牌阶段限一次，你可以弃置至多X张牌并选择一名其他角色，
	// 弃置其等量牌，若以此法弃置的牌均为同一颜色，你对其造成Y点伤害，
	// X为你的体力值且至多为5，Y为你弃置的牌数。',
	//--------------------秋儿053
	yb053_lvxin:{
		subSkill:{
			// list:{
			// 	// onremove:true,
			// 	charlotte:true,
			// },
			hand:{
				// onremove:true,
				charlotte:true,
				trigger:{global:'phaseAfter'},
				silent:true,
				content:function(){
					player.storage.yb053_lvxin=0;
					player.storage.yb053_lvxin_list=[];
					player.unmarkSkill('yb053_lvxin');
				}
			},
		},
		audio:'ext:夜白神略/audio/character:2',
		group:['yb014_lvxin','yb053_lvxin_hand'],
		trigger:{
			player:'gainEnd',
		},
		filter:function(event,player){
			// game.log('event.skill：',event.skill)
			// game.log('event.getParent(1)：',event.getParent(1))
			// game.log('event.getParent(2)：',event.getParent(2))
			// game.log('event.getParent(2).name：',event.getParent(2).name)
			// game.log('event.getParent(2).skill：',event.getParent(2).skill)
			// game.log('event.getParent(3)：',event.getParent(3))
			// game.log('event.getParent(4)：',event.getParent(4))
			// game.log('event.getParent(5)：',event.getParent(5))
			if(event.getParent(2)&&event.getParent(2).name&&event.getParent(2).name=='yb014_lvxin')return true;
			return false;
		},
		check:function(event,player){
			if(player.storage.yb053_lvxin_list) return player.getDamagedHp()>0&&!player.storage.yb053_lvxin_list.includes(get.type(event.card));
			return player.getDamagedHp()>0;
		},
		derivation:['yb014_lvxin'],
		content:function(){
			'step 0'
			var list=[];
			if(player.getDamagedHp()>0){
				if(player.storage.yb053_lvxin_list){
					if(!player.storage.yb053_lvxin_list.includes(get.type(trigger.cards[0]))){
						list.push('回血');
					}
				}
				else list.push('回血')
			}
			list.push('加上限');
			list.push('cancel2');
			player.chooseControl(list).set('prompt','是否弃置本次旅心摸的牌，然后回复1点体力或本回合手牌上限+1？');
			'step 1'
			if(result.control=='回血'){
				player.discard(trigger.cards[0]);
				player.storage.yb053_lvxin_list.push(get.type(trigger.cards[0]));
				player.recover();
			}
			else if(result.control=='加上限'){
				// player.addTempSkill('yb053_lvxin_hand');
				player.discard(trigger.cards[0]);
				player.storage.yb053_lvxin++;
				player.markSkill('yb053_lvxin');
			}
			else event.finish();
		},
		init:function(player){
			player.storage.yb053_lvxin=0;
			player.storage.yb053_lvxin_list=[];
		},
		intro:{
			content:'本回合手牌上限+#'
		},
		mod:{
			maxHandcard:function(player,num){
				return num+player.storage.yb053_lvxin;
			}
		},
		ai:{
			threaten:2,//嘲讽值
		}
	},
	yb053_yinren:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		getname:function(player){
			if(player.storage.yb053_yinren==true)return '迸射';
			return '隐忍';
		},
		levelUpFilter:function(player){
			if(!player.storage.yb053_yinren)return true;
			return false;
		},
		levelUp:function(player){
			player.storage.yb053_yinren=true;
			player.addSkill('yb053_yinren_after');
		},
		group:['yb053_yinren_damage','yb053_yinren_die'],
		subSkill:{
			damage:{
				forced:true,
				trigger:{
					player:'damageBegin4',
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('h',1);
					'step 1'
					if(!result.bool){
						trigger.num++;
					}
					player.addTempSkill('yb053_yinren_after');
				}
			},
			after:{
				trigger:{
					global:'phaseEnd',
				},
				forced:true,
				content:function(){
					'step 0'
					var list=[];
					event.num=1;
					if(player.getDamagedHp()>0) event.num+=(Math.min(player.getDamagedHp(),3))
					if(player.getDamagedHp()>0) list.push('回血');
					list.push('摸'+get.cnNumber(event.num)+'张牌');
					if(list.length==1){
						event._result={control:list[0]}
					}
					else{
						player.chooseControl(list,true).set('prompt','请选择回复2点体力或摸'+get.cnNumber(event.num)+'张牌。');
					}
					'step 1'
					if(result.control=='回血'){
						player.recover(2);
					}
					else{
						player.draw(event.num);
					}
				}
			},
			die:{
				trigger:{
					player:'dyingAfter',
				},
				skillAnimation:true,
				animationColor:"YB_snow",
				sub:true,
				forced:true,
				filter:function(event,player){
					// return lib.skill.yb053_yinren.levelUpFilter(player)==true;
					if(!player.storage.yb053_yinren)return true;
					return false;
				},
				content:function(){
					// player.YB_levelUp(['yb053_yinren']);
					player.storage.yb053_yinren=true;
					player.addSkill('yb053_yinren_after');
					// if(player.hasSkill('yb053_yinren_after'))player.removeSkill('yb053_yinren_after')
					// player.addSkill('yb053_yinren_after');
					// player.storage.yb053_yinren=true;
					// lib.translate.yb053_yinren_ab='隐忍';
					// lib.translate.yb053_yinren=lib.skill.yb053_yinren.getname(player);
					// lib.translate.yb053_yinren_damage=lib.skill.yb053_yinren.getname(player);
					// lib.translate.yb053_yinren_after=lib.skill.yb053_yinren.getname(player);
					// lib.translate.yb053_yinren_die=lib.skill.yb053_yinren.getname(player);
				}
			},
		},
	},
	//--------------------悦儿
	'yb054_caijin':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'useCard',
		},
		filter:function(event,player){
			return get.type(event.card)=='equip'&&get.number(event.card)>1&&event.player!=player;
		},
		content:function(){
			'step 0'
			var cards=trigger.cards[0];
			var card=get.copy(cards);
			// var tag=[];
			// if(get.cardtag(card,'gifts'))var tag=['gifts'];
			var tag = get.YB_tag(card)
			// if(card.cardtag)cards.cardtag=card.cardtag;
			// game.me.gain(game.YB_createCard('YB_shashan','none',1,'fire'),'gain2')
			// game.YB_createCard(trigger.card.name,trigger.card.suit,1,trigger.card.nature,tag)
			// YB_shashan
			// event.card.cardtag=tag;
			// if(card.cardtag)event.card.cardtag=card.cardtag;
			// event.card.number=1;
			// 'step 1'
			var cardxx;
			game.broadcastAll(function(card,cards,tag,cardx){
				cards.YB_init([card.suit,card.number-1,card.name,card.nature,tag]);
				cardxx=game.YB_createCard(cardx.name,cardx.suit,1,cardx.nature,tag)
				cardxx.storage._yb054_caijin=cards;
			},card,cards,tag,trigger.card)
			player.gain(cardxx,'gain2');
			player.chooseUseTarget(cardxx);
			// 'step 1'
			
		},
	},
	//失去牌的效果被我放主文件里了，防止出现特殊情况，引用了主技能而没开本将包导致无法触发效果
	//其他角色使用点数大于1的装备牌时，你可以令此牌点数-1，然后你获得一张点数为1的同名牌并可立即使用。当复制牌进入弃牌堆时，自动销毁，并令此牌的原型点数+1，若此牌的原型仍在场上，则区域内有该牌的角色回复1点体力。
	'yb054_xiezhi':{
		audio:'ext:夜白神略/audio/character:2',
	},
	yb054_chouqi:{
		audio:'ext:夜白神略/audio/character:2',
	},
	yb054_zhishang:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{player:'damageAfter'},
		content:function(){
			'step 0'
			player.draw(3);
			'step 1'
			if(player.storage.yb054_zhishang&&player.storage.yb054_zhishang==trigger){
				delete player.storage.yb054_zhishang;
				player.loseMaxHp();
			}
		},
		group:'yb054_zhishang_2',
		subSkill:{
			2:{
				trigger:{player:'damageBegin3'},
				direct:true,
				filter:function(event,player){
					return !player.isLinked()&&event.hasNature();//event.nature
				},
				content:function(){
					player.storage.yb054_zhishang=trigger;
				}
			}
		},
		ai:{
			maixie:true,
			maixie_hp:true,
			effect:{
				target:function(card,player,target){
					if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
					if(get.tag(card,'natureDamage')) return [1,-2];
					return 0.8;
					// if(get.tag(card,'damage')&&get.damageEffect(target,player,player)>0) return [1,0,0,-1.5];
				}
			}
		}
	},
	yb054_tongxin:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'damageBegin4',
		},
		direct:true,
		filter:function(event,player){
			if(event.player==player)return false;
			if(!event.source) return false;
			if(event.num<=1) return false;
			return true;
		},
		content:function(){
			'step 0'
			var list=[];
			list.push('是');
			list.push('cancel2');
			event.tar=trigger.player;
			player.chooseControl(list).set('prompt',get.translation(trigger.player)+'即将受到'+get.cnNumber(trigger.num)+'点'+get.translation(trigger.nature)+'伤害，是否令此伤害-1，然后自己受到1点无来源伤害？').set('ai',function(){
				var attitude=get.attitude(player,trigger.player);
				if(attitude>=0) return 0;
				if(attitude<0){
					if(player.hp>2)return 2;
					return 1;
				}
			});
			'step 1'
			if(result.control=='是'){
				player.logSkill(event.name,event.tar);
				trigger.num--;
				player.storage.yb054_tongxin=trigger;
			}
			else{
				event.finish();
			}
		},
		ai:{
			expose:0.3,//跳立场
		},
		group:'yb054_tongxin_2',
		subSkill:{
			2:{
				trigger:{global:'damageEnd'},
				audio:'yb054_tongxin',
				forced:true,
				filter:(e,p)=>{
					return p.storage.yb054_tongxin&&p.storage.yb054_tongxin==e;
				},
				content:()=>{
					// var nature=trigger.hasNature();
					var nature=trigger.nature;
					player.damage(1,'nosource',nature);
					delete player.storage.yb054_tongxin;
				}
			}
		}
	},
	yb054_qiangzhi:{
		audio:'ext:夜白神略/audio/character:2',
		zhuanhuanji:true,
		mark:true,
		marktext:'☯',
		intro:{
			content:function(storage,player,skill){
				var str = [
					'转换技，出牌阶段开始时或当你受到伤害后，你可以',
					'展示手牌并：',
					'阳：弃置所有红色手牌；',
					'阴，弃置所有黑色手牌（无牌不弃）。',
					'然后摸三张牌。',
					'当你因弃置而失去以此法摸的牌时，你令此技能下次发动仅转一下，并对当前回合角色造成一点伤害。'
				];
				if(player.storage.yb054_qiangzhi){
					str[2]='<span class=thundertext>'+str[2]+'</span>'
				}
				else {
					str[3]='<span class=thundertext>'+str[3]+'</span>'
				}
				if(player.storage.yb054_qiangzhi_top==true){
					str[1]='<span style="text-decoration: line-through;text-decoration-color: red;">'+str[1];
					str.push(str[5]);
					str[4]+='</span>转一下：';
					str[5]=player.storage.yb054_qiangzhi?'<span class=thundertext>阳</span>':'<span class=thundertext>阴</span>';
					str[5]+='。'
				}
				return str.join('');
			},
		},
		trigger:{
			player:['phaseUseBegin','damageEnd']
		},
		filter(event,player){
			return player.isIn();
		},
		check(event,player){
			var color = player.storage.yb054_qiangzhi?'red':'black';
			var target = _status.currentPhase;
			var cards = player.getCards('h',{color:target});
			if(cards.length>0){
				if(get.attitude(player,target)>0)return false;
				else if(cards.forEach(c=>get.value(c)>5))return false;
				return true;
			}
			return true;
		},
		init:function(player){
			player.storage.yb054_qiangzhi=true;
		},
		content(){
			'step 0'
			if(player.storage.yb054_qiangzhi_top){
				player.storage.yb054_qiangzhi_top=false;
				player.unmarkSkill('yb054_qiangzhi_top');
				event.goto(3);
			}
			'step 1'
			var color = player.storage.yb054_qiangzhi?'red':'black';
			if(player.countCards('h')){
				player.showCards(player.getCards('h'));
				player.discard(player.getCards('h',{color:color}),true);
			}
			'step 2'
			player.draw(3).gaintag.addArray(['yb054_qiangzhi_top']);
			'step 3'
			player.changeZhuanhuanji('yb054_qiangzhi');
		},
		group:['yb054_qiangzhi_top'],
		subSkill:{
			top:{
				trigger:{
					player: "loseAfter",
					global: "loseAsyncAfter",
				},
				filter(event,player){
					if (event.type != "discard") {
						return false;
					}
					var evt = event.getl(player);
					if (!evt || !evt.cards || !evt.cards.length) {
						return false;
					}
					for (var i in evt.gaintag_map){
						if(evt.gaintag_map[i].includes("yb054_qiangzhi_top"))return true;
					}
					return false;
					
				},
				mark:true,

				marktext:'转',
				forced:true,
				content:function(){
					'step 0'
					player.markSkill('yb054_qiangzhi_top');
					player.storage.yb054_qiangzhi_top=true;
					'step 1'
					var target = _status.currentPhase;
					if(target.isIn()){
						target.damage();
					}
				}
				
			}
		},
	},
	/*
	'yb054_caijin':'裁巾',
	'yb054_caijin_info':'限定技，出牌阶段，你选择一张在游戏内且点数大于1的装备牌，你将此牌移出游戏，
	然后创建两张与此牌同牌名的牌，且两张牌的点数之和等于原来的那张牌，花色与原来的牌相同。
	然后你选择一名其他角色，你与其各获得一张，且可立即使用之。然后标记该角色为“裁巾”。',
	'yb054_xiezhi':'血指',
	'yb054_xiezhi_info':'①锁定技，当你受到伤害后，你展示手牌，若其中红色手牌数不大于你体力值，你摸三张牌；
	<br>②当你进入濒死状态时，你可以展示手牌并弃置所有红色手牌，然后回复体力至所弃红色牌的数量。
	若如此做，此伤害结算完成后，1和2效果于本回合失效。<br>③当“裁巾”角色造成伤害时，你可选择①或②其中一项内容执行。',
	yb054_chouqi:'愁泣',
	yb054_chouqi_info:'转换技，当你受到伤害后，
	你可以展示手牌，并制衡任意张（阴，黑色手牌；阳，红色手牌），
	若你以此法制衡了该颜色所有牌，你额外摸一张牌。',
	yb054_zhishang:'炙伤',
	yb054_zhishang_info:'锁定技，每当你受到一次伤害后，你摸三张牌，
	然后若此伤害为属性伤害且你受伤时未处于横置（叠置）状态，
	你减1点体力上限。',
	yb054_tongxin:'同心',
	yb054_tongxin_info:'当其他角色受到大于1点且来源不为自己的伤害时，
	你可令此伤害-1，然后受到1点无来源伤害。',
	*/
	//--------------------郑琰055
	yb055_zhuandu:{
		audio:'ext:夜白神略/audio/character:2',
		forced: true,
		trigger:{
			player:'useCard',
		},
		filter(event,player){
			var history = player.getHistory('useCard');
			if(!history)return true;
			else {
				var suits = [get.suit(event.card)];
				for(var i =0;i< history.length;i++){
					suits.add(get.suit(history[i].card));
				}
				if(suits.length>1)return false;
				return true;
			}
		},
		content(){
			var num = player.getHistory('useCard').length;
			if(num>player.maxHp)num=player.maxHp;
			player.draw(num);
		},
		mark:true,
		marktext:'笃',
		intro:{
			markcount: (storage,player) => {
				var history = player.getHistory('useCard');
				if(!history)return false;
				else {
					var suits = [];
					for(var i =0;i< history.length;i++){
						suits.add(get.suit(history[i].card));
					}
					if(suits.length>1)return false;
					return get.translation(suits[0]);
				}
			},
		},
		ai : {
			effect : {
				player_use(card, player, target) {
					const suits = [], suit = get.suit(card)
					player.getHistory('useCard', evt => suits.add(get.suit(evt.card)))
					if (suits.length > 1) return
					if (suits.length == 1 && get.suit(card) == suits[0]) return [1, 2]
					if (!player.isPhaseUsing()) return [1, player.countCards('hs', {suit}) / 5]
					let cards = player.getCards('hs', card => get.suit(card) == suit),
						names = cards.reduce((a, b) => a.add(get.name(b)), []),
						len = cards.length
					for (const name of names) {
						let usable = player.getCardUsable(name, true) - player.countUsed(name),
							count = cards.filter(i => get.name(i) == name).length
						if (name == 'tao') usable = Math.min(usable, player.getDamagedHp())
						len -= Math.max(count - usable, 0)
					}
					return [1, len / 2]
				}
			}
		},
		mod:{
			aiOrder(player, card, num) {
				const suits = [], suit = get.suit(card), event = get.event()
				player.getHistory('useCard', evt => suits.add(get.suit(evt.card)))
				if (suits.length == 1 && suit == suits[0]) return num + 100
				let cards = player.getCards('hs', card => get.suit(card) == suit),
					names = cards.reduce((a, b) => a.add(get.name(b)), []),
					len = cards.length
				for (const name of names) {
					let usable = player.getCardUsable(name, true) - player.countUsed(name),
						count = cards.filter(i => get.name(i) == name).length
					if (name == 'tao') usable = Math.min(usable, player.getDamagedHp())
					len -= Math.max(count - usable, 0)
				}
				return num + len * 10
			},
			aiValue(player, card, num){
				var history = player.getHistory('useCard');
				if(history) {
					var suits = [];
					for(var i =0;i< history.length;i++){
						suits.add(get.suit(history[i].card));
					}
					if(suits.length==1){
						if(get.suit(card)==suits[0])return num+100;
					}
				}
			}
		},
		
	},
	yb055_zangxin:{
		audio:'ext:夜白神略/audio/character:2',
		mod: {
			cardname(card, player, name) {
				if (get.suit(card) == "heart") {
					return "tao";
				}
			},
		},
		trigger: { player: "useCard" },
		forced: true,
		filter(event, player) {
			return event.card.name == "tao" && get.suit(event.card) == "heart";
		},
		content() {
			
		},

	},
	//--------------------董建超056
	//--------------------孙美琪057
	//--------------------孙世博058
	//--------------------星落四公主059
	// yb059_huiguang:'晖光',
	// yb059_huiguang_info:'锁定技，游戏开始时，你选择一名星落四公主之一，将武将牌替换为其。当你即将阵亡时，若你仍有存活公主，则取消之，改为减少1点体力上限（至多减至1）并将武将牌替换为一名未阵亡的公主，并将你武将牌上的技能添加至新公主武将牌上，然后回复体力至上限。',
	// yb059_xingshi:'星逝',
	// yb059_xingshi_info:'锁定技，每回合限一次，当你使用牌指定其他角色为唯一目标后，或成为其他角色使用牌的唯一目标后，你依次弃置你和对方的所有手牌，此牌结算完成后，你和对方各自摸等同自身当前体力值的牌数。',
	// yb059_guanhong:'贯虹',
	// yb059_guanhong_info:'出牌阶段限一次，你可以进行一次判定并获得判定牌。你记录你持有此技能时判定牌的花色，并覆盖上一次记录。
	// 当场上有角色使用该花色牌时，你可视为对该角色使用一张杀（不计入次数）',
	// yb059_zhuotan:'濯潭',
	// yb059_zhuotan_info:'重置技，刷新列表为[酒，桃，闪，杀]。你可以将手牌数调整至X，视为使用一张列表里的牌，X为你本次选择的选项所处的序号。',
	// yb059_qingliu:'擎流',
	// yb059_qingliu_info:'锁定技，当你使用牌时，若此牌不为你的手牌，则你重置武将牌上的技能；你摸牌阶段额外摸6-你武将牌上技能数张牌',
	// yb059_pingyu:'评雨',
	// yb059_pingyu_info:'场上角色的判定阶段开始时，若其判定区没有牌，你可令其进行一次【灵雨】判定。每当场上有判定牌即将生效时，你可以打出一张牌替换之，然后若此牌与原判定牌的花色相同，你摸一张牌。',
	yb059_huiguang:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		mark:true,
		intro:{
			mark:function(dialog,storage,player){
				var list=lib.skill.yb059_huiguang.ybsl_059starsFall(player);
				dialog.addText('剩余公主');
				dialog.addSmall([list,'character']);
			}
		},
		trigger:{
			player:'enterGame',
			global:'phaseBefore',
		},
		filter:function(event,player){
			var list=[];
			if(lib.character[player.name]) list.add([player.name]);
			if(lib.character[player.name1]) list.add([player.name1]);
			if(lib.character[player.name2]) list.add([player.name2]);
			for(var i=1;i<=4;i++){
				if(list.includes('ybsl_059starsFall'+i))return false;
			}
			if(!player.storage.yb059_huiguang)return false;
			return event.name!='phase'||game.phaseNumber==0;
		},
		ybsl_059starsFall:function(player){
			var kkk=[];
			if(lib.character[player.name]&&lib.character[player.name][3].includes('yb059_huiguang')) kkk.add([player.name]);
			if(lib.character[player.name1]&&lib.character[player.name1][3].includes('yb059_huiguang')) kkk.add([player.name1]);
			if(lib.character[player.name2]&&lib.character[player.name2][3].includes('yb059_huiguang')) kkk.add([player.name2]);
			if(!player.storage.yb059_huiguang&&kkk.length)player.storage.yb059_huiguang=['ybsl_059starsFall1','ybsl_059starsFall2','ybsl_059starsFall3','ybsl_059starsFall4'];
			// else player.storage.yb059_huiguang=[];
			return player.storage.yb059_huiguang;
		},
		init:function(player){
			var kkk=[];
			if(lib.character[player.name]&&lib.character[player.name][3].includes('yb059_huiguang')) kkk.add([player.name]);
			if(lib.character[player.name1]&&lib.character[player.name1][3].includes('yb059_huiguang')) kkk.add([player.name1]);
			if(lib.character[player.name2]&&lib.character[player.name2][3].includes('yb059_huiguang')) kkk.add([player.name2]);
			if(!player.storage.yb059_huiguang&&kkk.length)player.storage.yb059_huiguang=['ybsl_059starsFall1','ybsl_059starsFall2','ybsl_059starsFall3','ybsl_059starsFall4'];
			// else player.storage.yb059_huiguang=[];
		},
		content:function(){
			var kkk=[];
			if(lib.character[player.name]&&lib.character[player.name][3].includes('yb059_huiguang')) kkk.add([player.name]);
			if(lib.character[player.name1]&&lib.character[player.name1][3].includes('yb059_huiguang')) kkk.add([player.name1]);
			if(lib.character[player.name2]&&lib.character[player.name2][3].includes('yb059_huiguang')) kkk.add([player.name2]);
			'step 0'
			var list=lib.skill.yb059_huiguang.ybsl_059starsFall(player);
			if(!list.length||!kkk.length)event.finish();
			else{
				player.chooseButton(true).set('ai',function(button){
					// return get.rank(button.link,true)-lib.character[button.link][2];
					return true;//让ai无脑选第一名成员
				}).set('createDialog',['将'+get.translation(kkk[0])+'替换为一名角色',[list,'character']]);
			}
			// game.me.reinit(game.me.name2,'ybslshen_018zhangqing',false)
			'step 1'
			player.reinit(kkk[0],result.links[0],false);
			lib.skill.yb059_huiguang.ybsl_059starsFall(player).remove(result.links[0]);
			var list=[];
			if(lib.character[kkk[0]]) list.addArray(lib.character[kkk[0]][3]);
			player.addSkill(list);
			game.broadcastAll(function(list){
				lib.character[result.links[0]][3].addArray(list);
				game.expandSkills(list);
				// for(var i of list){
				// 	var info=lib.skill[i];
				// 	if(!info) continue;
				// 	if(!info.audioname2) info.audioname2={};
				// 	info.audioname2.key_shiki='shiki_';
				// }omusubi
			},list);
			// player.recover(player.maxHp-player.hp);
		},
		group:['yb059_huiguang_die'],
		subSkill:{
			die:{
				audio:'yb059_huiguang',
				trigger:{player:'dieBefore'},
				filter:function(event,player){
					var kkk=[];
					if(lib.character[player.name]&&lib.character[player.name][3].includes('yb059_huiguang')) kkk.add([player.name]);
					if(lib.character[player.name1]&&lib.character[player.name1][3].includes('yb059_huiguang')) kkk.add([player.name1]);
					if(lib.character[player.name2]&&lib.character[player.name2][3].includes('yb059_huiguang')) kkk.add([player.name2]);
					if(!kkk)return false;
					return lib.skill.yb059_huiguang.ybsl_059starsFall(player).length&&event.getParent().name!='giveup'&&player.maxHp>0;
				},
				forced:true,
				content:function(){
					'step 0'
					trigger.cancel();
					if(player.maxHp>1)player.loseMaxHp();
					'step 1'
					player.useSkill('yb059_huiguang');
					'step 2'
					player.recover(player.maxHp-player.hp);
				},
			}
		},
	},
	yb059_xingshi:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		usable:1,
		trigger:{
			player:'useCardToPlayered',
			target:'useCardToTargeted',
			// global:'useCard',
		},
		filter:function(event,player,name){
			if(event.targets.length!=1)return false;
			if(event.player!=player&&player!=event.targets[0])return false;
			if(event.player==player&&player==event.targets[0])return false;
			return true;
		},
		ai:{
			effect:{
				player:function(card,player,target){
					if(!player.storage.counttrigger||!player.storage.counttrigger.yb059_xingshi||player.storage.counttrigger.yb059_xingshi<=0){
						if(player!=target&&ui.selected.targets.length==1){
							var num1=player.hp+Math.min(player.hp,5)-player.countCards('h');
							var num2=target.hp+Math.min(target.hp,5)-target.countCards('h');
							return [1,-num2,1,-num1]
						}
					}
					return 1;
				},
				target:function(card,player,target){
					if(!player.storage.counttrigger||!player.storage.counttrigger.yb059_xingshi||player.storage.counttrigger.yb059_xingshi<=0){
						if(player!=target&&ui.selected.targets.length==1){
							var num1=player.hp+Math.min(player.hp,5)-player.countCards('h');
							var num2=target.hp+Math.min(target.hp,5)-target.countCards('h');
							return [1,-num2,1,-num1]
						}
					}
					return 1;
				},
			}
		},
		content:function(){
			if(trigger.player==player)var tar=trigger.targets[0];
			else var tar=trigger.player;
			trigger.card.yb059_xingshi=[player,tar];
			if(!_status.yb059_xingshi)_status.yb059_xingshi={};
			_status.yb059_xingshi[trigger.card]=[player,tar];
			player.discard(player.getCards('h'));
			var next=tar.discard(tar.getCards('h'));
			next.notBySelf=true;
			next.discarder=player;
		},
		group:['yb059_xingshi_use'],
		subSkill:{
			use:{
				trigger:{global:'useCardAfter'},
				forced:true,
				filter:function(event,player){
					if(!_status.yb059_xingshi)return false;
					if(!_status.yb059_xingshi[event.card])return false;
					return true;
				},
				content:function(){
					'step 0'
					event.num=0;
					event.list=_status.yb059_xingshi[trigger.card];
					'step 1'
					delete _status.yb059_xingshi[trigger.card];
					'step 2'
					if(event.list[event.num].isIn())event.list[event.num].draw(Math.min(event.list[event.num].hp,5));
					'step 3'
					if(event.num<1){
						event.num++
						event.goto(2);
					}
				}
			}
		}
	},
	yb059_guanhong:{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		content:function(){
			var next=player.judge();
			next.callback=function(){player.gain(event.judgeResult.card);}
		},
		ai:{
			result:{
				player:1
			},
			order:11
		},
		group:['yb059_guanhong_judge','yb059_guanhong_sha'],
		subSkill:{
			judge:{
				audio:'yb059_guanhong',
				direct:true,
				mark:true,
				marktext:'虹',
				intro:{
					content:function(storage,player){
						if(storage)return '记录的花色是'+get.translation(storage);
						return '无';
					}
				},
				trigger:{player:'judgeEnd'},
				content:function(){
					player.markSkill('yb059_guanhong_judge');
					player.storage.yb059_guanhong_judge=get.suit(trigger.result.card)
				}
			},
			sha:{
				audio:'yb059_guanhong',
				trigger:{global:'useCard'},
				filter:function(event,player){
					if(!player.storage.yb059_guanhong_judge)return false;
					if(player.storage.yb059_guanhong_judge!=get.suit(event.card))return false;
					if(player.canUse('sha',event.player,false))return true;
					return false;
				},
				logTarget:function(event,player){
					return event.player;
				},
				prompt:function(event,player){
					return '是否视为对'+get.translation(event.player)+'使用一张杀';//'+get.logTarget('yb059_guanhong_sha')+'
				},
				check:function(event,player){
					var eff=get.effect(event.player,{name:'sha'},player,_status.event.player);
					var att=get.attitude(_status.event.player,event.player);
					return eff>0;
				},
				content:function(){
					player.useCard({name:'sha',isCard:false},trigger.player,false);
				}
			},
		}
	},
	yb059_zhuotan:{
		audio:'ext:夜白神略/audio/character:2',
		chongzhiji:true,
		chongzhiList:[
			'jiu',
			'tao',
			'shan',
			'sha',
		],
		init:function(player,skill){
			player.storage[skill+'_chongzhijiList']=lib.skill[skill].chongzhiList;
		},
		// getChongzhiList:function(player,skill){
		// 	if(!player.storage[skill]||player.storage.yb014_xuyuan.length==0){
		// 		player.storage.yb014_xuyuan=[];
		// 		for(var i = 0;i<lib.skill.yb014_xuyuan.chongzhiList.length;i++){
		// 			player.storage.yb014_xuyuan.add(lib.skill.yb014_xuyuan.chongzhiList[i]);
		// 		}
		// 	} 
		// 	return player.storage.yb014_xuyuan;
		// },
		mark:true,
		intro:{ // 标记描述
			content:function(storage,player){
				var storage=get.YB_chongzhiList(player,'yb059_zhuotan');//当前列表
				if(!storage) return '无';
				var list1=player.storage['yb059_zhuotan'+'_chongzhijiList'];//刷新列表
				// var list1=get.YB_chongzhijiList(player,'yb059_zhuotan');//刷新列表
				var str='<br>';
				for(var i=0;i<list1.length;i++){
					if(storage.includes(list1[i]))str+='<span class=yellowtext>'+get.translation(list1[i])+'</span><br>';
					else str+='<span style="opacity:0.5;">'+get.translation(list1[i])+'</span><br>';
				}
				for(var i=0;i<storage.length;i++){
					if(!list1.includes(storage[i]))str+='<span class=thundertext>'+get.translation(storage[i])+'</span><br>';
				}
				return '当前列表如下：'+str;
			},
			// markcount:"Infinity"// 标记数量为无限大，即不会因为没有技能使用次数而消失
		},
		enable:'chooseToUse',
		filter:function (event,player){
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;
			var list=get.YB_chongzhiList(player,'yb059_zhuotan');
			for(var i=0;i<list.length;i++){
				if(evt({name:list[i]},player,event)) return true;
			};
			return false;
		},
		chooseButton:{
			dialog:function (event,player){
				var list=[];
				var list2=get.YB_chongzhiList(player,'yb059_zhuotan');
				for(var i=0;i<list2.length;i++){
					list.push(['濯潭','',list2[i]]);
				}
				return ui.create.dialog('濯潭',[list,'vcard']);
			},
			filter:function (button,player){
				return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
			},
			check:function (button){
				if(_status.event.getParent().type!='phase') return 1;
				var player=_status.event.player;
				return player.getUseValue({
					name:button.link[2],
					nature:button.link[3],
				});
			},
			backup:function (links,player){
				return {
					filterCard:function(card,player){
						// var suit=get.suit(card);
						// return true;
						return false
					},
					selectCard:-1,
					// complexCard:true,
					// position:'hs',
					audio:'yb059_zhuotan',
					popname:true,
					viewAs:{name:links[0][2],},
					precontent:function(){
						'step 0'
						player.logSkill('yb059_zhuotan');
						var name=event.result.card.name;
						var list=get.YB_chongzhiList(player,'yb059_zhuotan');
						var num=1;
						for(var i=0;i<list.length;i++){
							if(name==list[i])num+=i;
						}
						player.YB_changeHandCard(num);
						'step 1'
						var name=event.result.card.name;
						get.YB_chongzhiList(player,'yb059_zhuotan').remove(name);
					},
				};
			},
			prompt:function (links,player){
				var name=links[0][2];
				var list=get.YB_chongzhiList(player,'yb059_zhuotan');
				var num=1;
				for(var i=0;i<list.length;i++){
					if(name==list[i])num+=i;
				}
				return '将手牌调整至'+num+'张，视为使用一张'+get.translation(links[0][2])+'';
			},
		},
		hiddenCard:function (player,name){
			var list=get.YB_chongzhiList(player,'yb059_zhuotan');
			return list.includes(name);
		},
		ai:{
			respondSha:true,
			respondShan:true,
			order:function(item,player){
				if(!player)var player=_status.event.player;
				if(get.YB_chongzhiList(player,'yb059_zhuotan')&&get.YB_chongzhiList(player,'yb059_zhuotan').length==1)return get.order(get.YB_chongzhiList(player,'yb059_zhuotan')[0])+5;//假如列表仅剩一个，则使用收益顺序排在最高
				return 5;
			},//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
			result:{
				player:function(player){
					if(_status.event.type=='dying'){
						return get.attitude(player,_status.event.dying);
					}
					// else if(get.YB_chongzhiList(player,'yb059_zhuotan').length==1)return get.effect(target,get.YB_chongzhiList(player,'yb059_zhuotan')[0],player,_status.event.player)+10;
					return 5;//假如列表仅剩一个，则使用收益拔高
				},
			},
		}
	},
	yb059_qingliu:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{player:'useCard'},
		forced:true,
		clanSkill:true,
		filter:function(event,player){
			if(!event.cards.length) return true;
			return !game.hasPlayer2(current=>{
				if(current!=player) return false;
				return current.hasHistory('lose',evt=>{
					return evt.getParent()==event&&evt.hs.length>0;
				});
			});
		},
		content:function(){
			player.YB_zhongliu();
		},
		group:['yb059_qingliu_draw'],
		subSkill:{
			draw:{
				audio:'yb059_qingliu',
				trigger:{
					player:'phaseDrawBegin2',
				},
				forced:true,
				preHidden:true,
				filter:function(event,player){
					var num=6-player.getStockSkills(true,true).length;
					if(num<=0)return false;
					return !event.numFixed;
				},
				content:function(){
					var num=6-player.getStockSkills(true,true).length;
					if(num>0)trigger.num+=num;
				},
			}
		}
	},
	yb059_pingyu:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{global:'judge'},
		filter:function(event,player){
			return player.countCards('hes',function(card){
				return true;
			})>0;
		},
		direct:true,
		content:function(){
			"step 0"
			player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
			get.translation(trigger.player.judging[0])+'，'+get.prompt('yb059_pingyu'),'hes',function(card,player){
				var player=_status.event.player;
				var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
				if(mod2!='unchanged') return mod2;
				var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
				if(mod!='unchanged') return mod;
				return true;
			}).set('ai',function(card){
				var trigger=_status.event.getTrigger();
				var player=_status.event.player;
				var judging=_status.event.judging;
				var result=trigger.judge(card)-trigger.judge(judging);
				var attitude=get.attitude(player,trigger.player);
				if(attitude==0||result==0) return 0;
				if(attitude>0){
					return result;
				}
				else{
					return -result;
				}
			}).set('judging',trigger.player.judging[0]);
			"step 1"
			if(result.bool){
				player.respond(result.cards,'highlight','yb059_pingyu','noOrdering');
				if(get.suit(trigger.player.judging[0])==get.suit(result.cards[0])){
					event.YB_draw=true;
				}
			}
			else{
				event.finish();
			}
			"step 2"
			if(result.bool){
				player.$gain2(trigger.player.judging[0]);
				player.gain(trigger.player.judging[0]);
				trigger.player.judging[0]=result.cards[0];
				trigger.orderingCards.addArray(result.cards);
				game.log(trigger.player,'的判定牌改为',result.cards[0]);
			}
			"step 3"
			if(event.YB_draw){
				player.draw();
			}
			"step 4"
			game.delay(2);
		},
		ai:{
			rejudge:true,
			tag:{
				rejudge:1
			}
		},
		group:['yb059_pingyu_lingyu'],
		subSkill:{
			lingyu:{
				audio:'yb059_pingyu',
				trigger:{
					global:'phaseJudgeBegin',
				},
				check:function (event,player){
					return get.attitude(player,event.player)<=0;
				},
				filter:function(event,player){
					return event.player.countCards('j')==0;
				},
				content:function (){
					trigger.player.executeDelayCardEffect('ybsl_lingyu');
				},
				ai:{
					expose:1,//跳立场
					threaten:0.5,//嘲讽值
				},
			}
		},
		derivation:['ybsl_lingyu'],
	},
	//--------------------刘天杭060
	//--------------------哲宇061
	//--------------------于洪岩062
	//--------------------魏铭利063
	//--------------------吕明岩064
	//--------------------阎锡文065
	//--------------------武筠066
	//-----------------------------------蛇妃
	'yb067_chanqing':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		filterTarget:function(card,player,target){
			return player!=target;
		},
		intro:{
			content:function(content,player){
				return '上次缠情是和'+get.translation(player.storage.yb067_chanqing)+'进行的';
			},
		},
		filterCard:false,
		// init:function(player,skill){
			// player.addSkill('yb067_chanqing1');
		// },
		async content(event, trigger, player) {
			player.storage.yb067_chanqing1.push(event.target);
			if (event.target == player.storage.yb067_chanqing) {
				player.changeGroup('YB_memory');
				player.recover();
			}
			else {
				player.changeGroup('YB_dream');
				player.draw(2);
			}
			player.storage.yb067_chanqing = event.target;
			player.markSkill('yb067_chanqing');//用mark记录本次缠情的角色
			event.num = 0;
			while (event.num < event.target.hp && event.num < 5) {
				event.num++;
				await player.chooseToDiscard('h', true);
				if (event.target.countCards('h') <= event.target.maxHp) await event.target.draw();
				const result = await player.gainPlayerCard('h', event.target, true).forResult();
				if (result.bool) {
					await player.chooseUseTarget(result.cards[0], true, false);
					game.log(result.cards[0], event.num);
				}
			}
			const result1 = await player.chooseButton(['选择任意项执行', [['令自己摸' + event.num + '张牌', '令' + get.translation(event.target) + '摸' + event.num + '张牌'], 'textbutton']], [0, 2])
				.set('ai', (button) => {
					var player = _status.event.player;
					switch (button.link) {
						case '令自己摸' + event.num + '张牌': return event.num;
						case '令' + get.translation(event.target) + '摸' + event.num + '张牌': return event.target.isFriendsOf(player);
					}
				}).forResult();
			console.log(result1);
			if (result1.bool && result1.links.length) {
				if (result1.links.includes('令自己摸' + event.num + '张牌')) player.draw(event.num);
				if (result1.links.includes('令' + get.translation(event.target) + '摸' + event.num + '张牌')) event.target.draw(event.num);
			}
			//QQQ
		},
		/*
		content:function(){
			'step 0'
			//用yb067_chanqing1记录本回合缠情过的角色
			player.storage.yb067_chanqing1.push(target);
			event.num=1;
			'step 1'
			if(target&&player.storage.yb067_chanqing&&target==player.storage.yb067_chanqing){
				delete player.storage.yb067_chanqing;//根据上次记录触发效果，并清除上次记录
				player.changeGroup('YB_memory');
				player.recover();
			}
			else if(target&&player.storage.yb067_chanqing&&target!=player.storage.yb067_chanqing){
				delete player.storage.yb067_chanqing;
				player.changeGroup('YB_dream');
				player.draw(2);
			}
			'step 2'
			if(player.countCards('h')>0)player.chooseToDiscard('h',true);
			if(target.countCards('h')<=target.maxHp)target.draw();
			player.storage.yb067_chanqing=target;
			player.markSkill('yb067_chanqing');//用mark记录本次缠情的角色
			'step 3'
			player.gainPlayerCard('h',target,true);
			'step 4'
			var next=player.chooseUseTarget(result.cards[0]);
			game.log(result.cards[0],event.num);
			if(get.info(result.cards[0]).updateUsable=='phaseUse') next.addCount=false;
			'step 5'
			if(event.num<target.hp&&event.num<5) {
				event.num+=1;
				event.goto(2);
			}
			else{
				event.goto(6);
			}
			'step 6'
			//---------------------此处为对话框
			event.videoId=lib.status.videoId++;
			game.log('event.videoId');
			var func=function(player,id){
				var list=[
					'令你自己摸'+get.cnNumber(event.num)+'张牌',
					'令'+get.translation(target)+'摸'+get.cnNumber(event.num)+'张牌'
				];
				var choiceList=ui.create.dialog('缠情：请选择零至两项');choiceList.videoId=id;
				for(var i=0;i<list.length;i++){
					var str='<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
					str+=list[i];
					str+='</div>';
					var next=choiceList.add(str);
					next.firstChild.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
					next.firstChild.link=i;
					for(var j in lib.element.button){
						next[j]=lib.element.button[j];
					}
					choiceList.buttons.add(next.firstChild);
				}
			return choiceList;
			}
			if(player.isOnline2()){
				player.send(func,player,event.videoId);
			}
				event.dialog=func(player,event.videoId);
				if(player!=game.me||_status.auto){
				event.dialog.style.display='none';
			}
			var next=player.chooseButton([0,2]);//
			next.set('dialog',event.videoId);//读取对话框
			next.set('forced',true);//此处作用未知
			next.set('ai',function(button){//ai选按钮思维
				// var player=_status.event.player;
				// var target=target;
				switch(button.link){
					case 0:
						return get.attitude(_status.event.player,player);
						break;
					case 1:
						return get.attitude(_status.event.player,target);
						break;
				}
			});
			next.set('selectButton',[0,2]);//
			'step 7'
			if(player.isOnline2()){
				player.send('closeDialog',event.videoId);
			}
			event.dialog.close();
			result.links.sort();
			event.links=result.links;
			'step 8'
			if(result.links.includes(0)) player.draw(event.num);
			if(result.links.includes(1)) target.draw(event.num);
		},
		*/
		group:['yb067_chanqing_last','yb067_chanqing1'],
		subSkill:{
			last:{
				audio:false,
				trigger:{
					player:'phaseUseEnd',
				},
				forced:true,
				direct:true,
				filter:function(event,player){
					return !player.hasHistory('useSkill',function(evt){
						if(evt.skill!='yb067_chanqing')return false;
						return evt.event.getParent('phaseUse')==event;
					})
				},
				content:function(){
					delete player.storage.yb067_chanqing;
				},
			},
		},
		ai:{
			order:5.5,//主动技使用的先后，杀是3，酒是3.2。
			result:{//主动技的收益
				player:function(player,target){//注意，和effect里的参数不一样
					return target.hp-1.1;//血越多收益越高,1血不发动
				},
				target:function(player,target){//注意，和effect里的参数不一样
					return 1;//血越多收益越高,1血不发动
				},
			},					
			threaten:2.4,//嘲讽值
		},
	},
	'yb067_chanqing1':{
		audio:false,
		trigger:{
			player:'phaseAfter',
		},
		forced:true,
		direct:true,
		unseen:true,
		mark:true,
		init:function (player,skill){
			player.storage.yb067_chanqing1=[];
		},
		intro:{
			content:function(content,player){
				return '本回合已和'+get.translation(player.storage.yb067_chanqing1)+'缠过情';
			},
		},
		filter:function(event,player){
			return player.storage.yb067_chanqing1;
		},
		content:function(){
			for(var i=0;i<player.storage.yb067_chanqing1.length;i++){
				player.storage.yb067_chanqing1.remove(player.storage.yb067_chanqing1[0])
			}
			player.removeMark('yb067_chanqing1',player.countMark('yb067_chanqing1'))
		},
	},
	'yb067_kuiyi':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:'phaseJieshuBegin',
		},
		groupSkill:true,
		prompt:'是否弃置所有手牌？',
		//check:true,//为了让ai无脑用，我不会写具体分类
		filter:function(event,player){
			return (player.countCards('h')>0&&player.group=='YB_memory');
		},
		content:function(){
			'step 0'
			event.num=player.countCards('h');//准备工作，记录相关数据
			event.cards=player.getCards('h');
			var suits=[];
			for(var i=0;i<event.cards.length;i++){
				suits.add(get.suit(event.cards[i]));
			}
			event.suits=suits.length;
			event.numb=1;
			event.list=[];
			event.list2=[];
			event.map={};
			'step 1'
			player.discard(event.cards);//弃牌
			'step 2'
			var str='目标角色将';
			switch(event.numb){
				case 1:str+='摸一张牌';break;
				case 2:str+='回复1点体力';break;
				case 3:str+='增加1点体力上限';break;
				case 4:str+='摸三张牌';break;
			}
			event.str=str;
			if(event.numb>=4)event.num=1;
			'step 3'
			if(event.suits>=1)player.chooseTarget([1,event.num],true,'请选择一'+(event.num>1?('至'+get.cnNumber(event.num)):'')+'名角色').set('prompt2',event.str).set('ai',function(target){
				var player=_status.event.player,att=get.attitude(player,target);
				if(att>=0) return event.numb;
				if(att<0) return -event.numb;
				if(att>=0&&player.storage.yb067_chanqing1.includes(target)) return event.numb*2;
				if(target==player) return event.numb;
			});
			'step 4'
			event.targets=result.targets;
			'step 5'
			switch(event.numb){
				case 1:event.targets[0].draw();break;
				case 2:event.targets[0].recover();break;
				case 3:event.targets[0].gainMaxHp();break;
				case 4:event.targets[0].draw(3);break;
			}
			'step 6'
			if(player.storage.yb067_chanqing1.includes(event.targets[0])){
				//二维数组方案
				if(!event.list.includes(event.targets[0])){
					event.list.push(event.targets[0]);
					event.list2.push(event.numb);
				}
				else{
					for(var i=0;i<event.list.length;i++){
						if(event.list[i]==event.targets[0]){
							event.list2[i]=event.numb;
						}
					}
				}
			}
			'step 7'
			event.targets.remove(event.targets[0]);
			'step 8'
			if(event.targets.length>0){event.goto(5)}
			else{
				if(event.numb>=event.suits){event.goto(9);}
				else{
					event.numb++;
					event.goto(2);
				}
			}
			'step 9'
			if(event.list.length>0){
				for(var i=0;i<event.list.length;i++){
					var tar=event.list[i];
					var num=event.list2[i];
					switch(num){
						case 1:tar.draw();break;
						case 2:tar.recover();break;
						case 3:tar.gainMaxHp();break;
						case 4:tar.draw(3);break;
					}
				}
			}
		},
		ai:{
			threaten:1.1,//嘲讽值为1.1，稍微注意点
		},
	},
	'yb067_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	//-------------------清月
	'yb068_mingzhu':{
		inherit:'yb010_mingzhu',
		audio:'ext:夜白神略/audio/character:2',
	},
	'yb068_chenyu':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{player:'phaseJieshuBegin'},
		frequent:true,
		preHidden:true,
		content:function(){
			var x=player.getDamagedHp();
			if(x>3)x=3;
			player.draw(x+1);
		},
	},
	'yb068_jingyue':{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		enable:'chooseToUse',
		onChooseToUse:function(event){
			if(game.online||event.type!='phase') return;
			var list=[];
			event.player.getHistory('useCard',function(evt){
				var name=evt.card.name;
				var type=get.type(name);
				if(type!='basic'&&type!='trick'&&type!='ybsl_flower') return;
				if(name=='sha'){
					var nature=evt.card.nature;
					switch(nature){
						case 'fire':name='huosha';break;
						case 'thunder':name='leisha';break;
						case 'kami':name='kamisha';break;
						case 'ice':name='icesha';break;
						case 'stab':name='cisha';break;
						case 'YB_snow':name='YB_snowsha';break;
						case 'YB_blood':name='YB_bloodsha';break;
					}
				}
				list.add(type+'咕咕'+name);
			});
			event.set('yb068_jingyue_list',list);
		},
		filter:function(event,player){
			return event.yb068_jingyue_list&&event.yb068_jingyue_list.length>0;
		},
		chooseButton:{
			dialog:function(event,player){
				return ui.create.dialog('镜月',[event.yb068_jingyue_list.map(function(i){
					return i.split('咕');
				}),'vcard']);
			},
			filter:function(button,player){
				return lib.filter.cardEnabled({
					name:button.link[2],
					nature:button.link[3],
				},player);
			},
			check:function(button){
				return _status.event.player.getUseValue({
					name:button.link[2],
					nature:button.link[3],
				},false);
			},
			backup:function(links,player){
				return {
					popname:true,
					filterCard:false,
					selectCard:0,
					audio:'yb068_jingyue',
					viewAs:{
						name:links[0][2],
						nature:links[0][3],
					},
					onuse:function(links,player){
						if(player.hp>1)player.loseHp();
						player.logSkill('yb068_jingyue');
					},
				}
			},
			prompt:function (links,player){
				var str=player.hp>1?'失去1点体力并':'';
				return str+'视为使用一张'+get.translation(links[0][2]);
			},
		},
	},
	'yb068_jingyue2':{onremove:true,},
	yb068_yingxian:{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		enable:'phaseUse',
		filter:(event,player)=>{
			var num=player.getExpansions('yb068_yingxian');
			if(num&&num.length>0) return true;
			return false;
		},
		check:function(event,player){
			var num=player.getExpansions('yb068_yingxian');
			if(num&&num.length>3) return true;
			return false;
		},
		content:function(){
			'step 0'
			player.loseHp();
			// event.count=player.getExpansions('yb068_yingxian').length;
			'step 1'
			// event.count--;
			'step 2'
			var list=player.getExpansions('yb068_yingxian');
			var card=list[list.length-1];
			var next=player.chooseUseTarget(card);
			if(get.info(card).updateUsable=='phaseUse') next.addCount=false;
			'step 3'
			if(player.getExpansions('yb068_yingxian').length){
				event.goto(1);
			}
		},
		group:['yb068_yingxian_use','yb068_yingxian_delete'],
		mark:true,
		intro:{
			content:'expansion',
			markcount:'expansion',
			// mark:function(dialog,storage,player){
				// dialog.addSmall([player.storage.yb068_yingxian,'card']);
			// },
			mark:'expansion',
		},
		subSkill:{
			use:{
				trigger:{player:'useCardAfter'},
				filter:(event,player)=>{
					if(!player.isPhaseUsing)return false;
					// game.log('event.getParent(1)：',event.getParent(1))
					// game.log('event.getParent(2)：',event.getParent(2))
					// game.log('event.getParent(3)：',event.getParent(3))
					// game.log('event.getParent(4)：',event.getParent(4))
					// game.log('event.getParent(5)：',event.getParent(5))
					if(event.getParent(2).name&&event.getParent(2).name=='yb068_yingxian')return false;
					if(!event.card)return false;
					if(!event.card.isCard)return false;
					return get.position(event.cards[0],true)=='o';
				},
				direct:true,
				popup:true,
				content:()=>{
					player.addToExpansion(trigger.cards[0],player,'giveAuto').gaintag.add('yb068_yingxian');
				},
			},
			delete:{
				trigger:{player:'phaseUseAfter'},
				filter:(event,player)=>{
					var num=player.getExpansions('yb068_yingxian');
					if(num&&num.length>0) return true;
					return false;
				},
				direct:true,
				popup:true,
				content:()=>{
					player.discard(player.getExpansions('yb068_yingxian'));
				},
			},
		}
	},
	//-------------------香紫
	'yb069_yaomian':{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		enable:'phaseUse',
		filterTarget:function(card,player,target){
			if(player==target)return false;
			var str = '';
			if(target.hasSex('male')){
				str+='获得一张牌<br>';
			}
			str+='各自翻面';
			target.prompt(str);
			return player!=target;
		},
		filterCard:false,
		content:async function(event,trigger,player){
			var target = event.target;
			if(target.countCards('he')>0&&target.hasSex('male'))await player.gainPlayerCard(target,true,'he',1);
			await player.turnOver();
			await target.turnOver();
		},
		// targetprompt(target) {
		// 	var player = _status.event.player;
		// 	var str = '';
		// 	if(target.hasSex('male')){
		// 		str+='获得一张牌<br>';
		// 	}
		// 	str+='各自翻面';
		// 	return str;
		// },
		ai:{
			order:6,
			result:{
				player:function(player,target){
					var num=0;
					if(player.classList.contains('turnedover')) num+=10;
					if(target.hasSex('male')) num+=1;
					return num;
				},
				target:function(player,target){
					var num=0;
					if(!target.classList.contains('turnedover')) num-=6;
					if(target.classList.contains('turnedover')) num+=10;
					if(target.hasSex('male')) num-=1;
					return num;
				}
			},
			threaten:1.5,//嘲讽值
			effect:{
				target:function(card){
					if(card.name=='guiyoujie') return [0,2];
				}
			}
		},
	},
	'yb069_yaomianx':{
		audio:'yb069_yaomian',
		usable:1,
		enable:'phaseUse',
		filterTarget:function(card,player,target){
			if(player==target)return false;
			var str = '';
			if(target.hasSex('male')){
				str+='获得一张牌<br>';
			}
			str+='各自回血';
			target.prompt(str);
			return player!=target;
		},
		filterCard:false,
		content:async function(event,trigger,player){
			var target = event.target;
			if(target.countCards('he')>0&&target.hasSex('male'))await player.gainPlayerCard(target,true,'he',1);
			await player.recover();
			await target.recover();
		},
		// targetprompt(target) {
		// 	var player = _status.event.player;
		// 	var str = '';
		// 	if(target.hasSex('male')){
		// 		str+='获得一张牌<br>';
		// 	}
		// 	str+='各自回血';
		// 	return str;
		// },
		ai:{
			order:6,
			result:{
				player:function(player,target){
					var num=0;
					if(player.isDamaged()) num+=2;
					if(target.hasSex('male')) num+=1;
					return num;
				},
				target:function(player,target){
					var num=0;
					if(target.isDamaged()) num+=1;
					// if(!target.classList.contains('turnedover')) num-=6;
					// if(target.classList.contains('turnedover')) num+=10;
					if(target.hasSex('male')) num-=1;
					return num;
				}
			},
			threaten:1.5,//嘲讽值
			effect:{
				target:function(card){
					if(card.name=='guiyoujie') return [0,2];
				}
			}
		},
	},
	'yb069_yaomiany':{
		audio:'yb069_yaomian',
		usable:1,
		enable:'phaseUse',
		filterTarget:function(card,player,target){
			if(player==target)return false;
			var str = '';
			if(target.hasSex('male')){
				str+='获得一张牌<br>';
			}
			if(player.storage.yb069_yaomiany&&player.storage.yb069_yaomiany.includes(target)){
				str+='各自回血';
			}
			else {
				str+='各自翻面';
			}
			target.prompt(str);
			return player!=target;
		},
		filterCard:false,
		content:async function(event,trigger,player){
			var target = event.target;
			if(target.countCards('he')>0&&target.hasSex('male'))await player.gainPlayerCard(target,true,'he',1);
			if(!player.storage.yb069_yaomiany||!player.storage.yb069_yaomiany.includes(target)){
				player.storage.yb069_yaomiany=player.storage.yb069_yaomiany||[];
				player.storage.yb069_yaomiany.push(target);
				await player.turnOver();
				await target.turnOver();
			}
			else {
				await player.recover();
				await target.recover();
			}
		},
		// targetprompt(target) {
		// 	var player = _status.event.player;
		// 	var str = '';
		// 	if(target.hasSex('male')){
		// 		str+='获得一张牌<br>';
		// 	}
		// 	if(player.storage.yb069_yaomiany&&player.storage.yb069_yaomiany.includes(target)){
		// 		str+='各自回血';
		// 	}
		// 	else {
		// 		str+='各自翻面';
		// 	}
		// 	return str;
		// },
		ai:{
			order:6,
			result:{
				player:function(player,target){
					var num=0;
					var storage=player.storage.yb069_yaomiany||[];
					if(storage.includes(target)){
						if(player.isDamaged()) num+=2;
						if(target.hasSex('male')) num+=1;
					}
					else {
						if(player.classList.contains('turnedover')) num+=10;
						if(target.hasSex('male')) num+=1;
					}
					return num;
				},
				target:function(player,target){
					var num=0;
					var storage=player.storage.yb069_yaomiany||[];
					if(storage.includes(target)){
						if(target.isDamaged()) num+=1;
						if(target.hasSex('male')) num-=1;
					}
					else {
						if(!target.classList.contains('turnedover')) num-=6;
						if(target.classList.contains('turnedover')) num+=10;
						if(target.hasSex('male')) num-=1;
					}
					return num;
				}
			},
			threaten:1.5,//嘲讽值
			effect:{
				target:function(card){
					if(card.name=='guiyoujie') return [0,2];
				}
			}
		},
	},
	'yb069_wenhuan':{
		preHidden:true,
		mark:true,
		audio:'ext:夜白神略/audio/character:2',
		locked:false,
		zhuanhuanji:true,
		marktext:'☯',
		intro:{
			content:function(storage,player,skill){
				if(player.storage.yb069_wenhuan==true) return '当场上角色回复体力时，你可以令其翻面，并令此次回复效果+1。';
				return '当场上角色受到伤害后，你可令其武将牌复位，然后摸一张牌。';
			},
		},
		group:['yb069_wenhuan_1'],
		subSkill:{
			1:{
				audio:'yb069_wenhuan',
				trigger:{
					global:['damageEnd','recoverBegin'],
				},
				prompt2:function(event,player){
					var str='';
					str+=(player.storage.yb069_wenhuan==true)?'是否令其翻面，并令此次回复效果+1':'是否令其武将牌复位，然后其摸一张牌';
					return str;
				},
				check:function (event,player){
					var tar=event.player;
					var att=get.attitude(player,tar);//好感度
					if(!player.storage.yb069_wenhuan){
						if(att<=0)return false;
						return true;
					}//阴
					else{
						if(att<0){
							if(tar.getDamagedHp()<event.num&&!tar.isTurnedOver())return true;
							return false;
						}
						else{
							if(tar.isTurnedOver())return true;
							return (tar.getDamagedHp()<event.num||tar.hp<=0);
						}
					}//阳
				},
				filter:function(event,player){
					if(!player.storage.yb069_wenhuan){return event.name=='damage'&&event.player.isAlive()}//阴
					else{return event.name=='recover'&&event.player.isAlive()}//阳
				},
				logTarget:function (event,player){
					return event.player;
				},
				content:function(){
					'step 0'
					player.changeZhuanhuanji('yb069_wenhuan');
					if(trigger.name=='recover'){
						trigger.num++;
						trigger.player.turnOver();
						event.goto(2);
					}else{
						trigger.player.turnOver(false);
					}
					//这里直接复制了单推狗妈的代码，感谢帮我节省的时间
					'step 1'
					trigger.player.link(false);
					trigger.player.draw();
					'step 2'
					game.delayx();
				},
			},
		}
	},
	'yb069_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	//--------------070吕艳秋
	yb070_queshi:{
		audio:'ext:夜白神略/audio/character:2',
		init:function(player){
			player.equip(game.YB_createCard('ybsl_zhezhiqiang',null,null));
		},
		trigger:{
			player:'loseAfter',
		},
		filter:(event,player)=>{
			if(event.getParent(1).name=='equip') return false;
			if(!player.isEmpty(1)) return false;
			return true;
		},
		charlotte:true,
		forced:true,
		content:function(){
			var num=Math.ceil(Math.random()*100);
			if(num>=1&&num<=24)var suit='spade';
			if(num>=25&&num<=48)var suit='heart';
			if(num>=49&&num<=52)var suit='none';
			if(num>=53&&num<=76)var suit='club';
			if(num>=77&&num<=100)var suit='diamond';
			player.equip(game.YB_createCard('ybsl_zhezhiqiang',suit,null));
		}
	},
	yb070_meiying:{
		audio:'ext:夜白神略/audio/character:2',
		// mark:true,
		// intro:{
		// 	content:function(storage,player){
		// 		var str='当前有';
		// 		// str+=get.cnNumber(player.countMark('yb070_meiying'));
		// 		str+=player.countMark('yb070_meiying');
		// 		str+='/4枚梅影标记<br>';
		// 		// var suit=['spade','heart','club','diamond','none'];
		// 		// for(var i=0;i<suit.length;i++){
		// 		// 	str+='<br>';
		// 		// 	str+=get.translation(suit[i]);
		// 		// 	str+='记录了';
		// 		// 	var list=player.storage[yb070_meiying_+suit[i]];
		// 		// 	for(var j=0;j<list.length;j++){
		// 		// 		if(j!=0)str+='、';
		// 		// 		str+=get.translation(list[j]);
		// 		// 	}
		// 		// }
		// 		return str;
		// 	},
		// },
		group:[/*'yb070_meiying_use',*/'yb070_meiying_num','yb070_meiying_discard'],
		subSkill:{
			use:{
				audio:'yb070_meiying',
				trigger: {
					player: ['damageBegin3'],
					source: ['damageBegin1'],
				},
				direct: true,
				filter: (event, player) => {
					if (player.countMark('yb070_meiying') >= 4) return false;
					return event.card && lib.card[event.card.name];
				},
				content:()=>{
					player.logSkill('yb070_meiying')
					player.addMark('yb070_meiying');
				},
			},
			num:{
				trigger:{player:'useCard'},
				forced:true,
				popup:false,
				filter:function(event){
					var evt=event;
					return ['sha','tao'].includes(evt.card.name)&&evt.skill=='yb070_meiying'&&evt.cards&&evt.cards.length==2;
				},
				content:function(){
					trigger.baseDamage++;
				}
			},
			discard:{
				trigger:{player:['useCardAfter','respondAfter']},
				forced:true,
				popup:false,
				logTarget:function(){
					return _status.currentPhase;
				},
				autodelay:function(event){
					return event.name=='respond'?0.5:false;
				},
				filter:function(evt,player){
					return ['shan','wuxie'].includes(evt.card.name)&&evt.skill=='yb070_meiying'&&
						evt.cards&&evt.cards.length==2&&_status.currentPhase&&_status.currentPhase!=player&&_status.currentPhase.countDiscardableCards(player,'he');
				},
				content:function(){
					player.line(_status.currentPhase,'green');
					player.discardPlayerCard(_status.currentPhase,'he',true);
				}
			}
			// list:{
			// 	init:function(player,skill){
			// 		player.storage.yb070_meiying_list=[];
			// 		player.storage.yb070_meiying_none=[];
			// 		player.storage.yb070_meiying_spade=[];
			// 		player.storage.yb070_meiying_heart=[];
			// 		player.storage.yb070_meiying_club=[];
			// 		player.storage.yb070_meiying_diamond=[];
			// 	},
			// 	charlotte:true,
			// 	direct:true,
			// }
		},//技能发动时机
		enable:['chooseToUse','chooseToRespond'],
		//发动时提示的技能描述
		prompt:'将♦牌当做雷杀，♥牌当做桃，♣牌当做闪，♠牌当做无懈可击使用或打出',
		//动态的viewAs
		viewAs:function(cards,player){
			var name=false;
			var nature=null;
			var suit=get.suit(cards[0],player);
			//根据选择的卡牌的花色 判断要转化出的卡牌是闪还是火杀还是无懈还是桃
			switch(suit){
				case 'club':name='shan';break;
				case 'diamond':name='sha';nature='thunder';break;
				case 'spade':name='wuxie';break;
				case 'heart':name='tao';break;
			}
			//返回判断结果
			if(name) return {name:name,suit:suit,nature:nature};
			return null;
		},
		//-------------代价
		// precontent:function(){
		// 	player.removeMark('yb070_meiying');
		// 	player.logSkill('yb070_meiying');
		// },
		//AI选牌思路
		check:function(card){
			if(ui.selected.cards.length) return 0;
			var player=_status.event.player;
			if(_status.event.type=='phase'){
				var max=0;
				var name2;
				var list=['sha','tao'];
				var map={sha:'diamond',tao:'heart'}
				for(var i=0;i<list.length;i++){
					var name=list[i];
					if(player.countCards('hes',function(card){
						return (name!='sha'||get.value(card)<5)&&get.suit(card,player)==map[name];
					})>0&&player.getUseValue({name:name,nature:name=='sha'?'thunder':null})>0){
						var temp=get.order({name:name,nature:name=='sha'?'thunder':null});
						if(temp>max){
							max=temp;
							name2=map[name];
						}
					}
				}
				if(name2==get.suit(card,player)) return (name2=='diamond'?(5-get.value(card)):20-get.value(card));
				return 0;
			}
			return 1;
		},
		//选牌数量
		selectCard:[1,2],
		//确保选择第一张牌后 重新检测第二张牌的合法性 避免选择两张花色不同的牌
		complexCard:true,
		//选牌范围：手牌区和装备区和木马
		position:'hes',
		//选牌合法性判断
		filterCard:function(card,player,event){
			//如果已经选了一张牌 那么第二张牌和第一张花色相同即可
			if(ui.selected.cards.length) return get.suit(card,player)==get.suit(ui.selected.cards[0],player);
			event=event||_status.event;
			//获取当前时机的卡牌选择限制
			var filter=event._backup.filterCard;
			//获取卡牌花色
			var name=get.suit(card,player);
			//如果这张牌是梅花并且当前时机能够使用/打出闪 那么这张牌可以选择
			if(name=='club'&&filter({name:'shan',cards:[card]},player,event)) return true;
			//如果这张牌是方片并且当前时机能够使用/打出雷杀 那么这张牌可以选择
			if(name=='diamond'&&filter({name:'sha',cards:[card],nature:'thunder'},player,event)) return true;
			//如果这张牌是黑桃并且当前时机能够使用/打出无懈 那么这张牌可以选择
			if(name=='spade'&&filter({name:'wuxie',cards:[card]},player,event)) return true;
			//如果这张牌是红桃并且当前时机能够使用/打出桃 那么这张牌可以选择
			if(name=='heart'&&filter({name:'tao',cards:[card]},player,event)) return true;
			//上述条件都不满足 那么就不能选择这张牌
			return false;
		},
		//判断当前时机能否发动技能
		filter:function(event,player){
			// if(player.countMark('yb070_meiying')<1) return false;
			//获取当前时机的卡牌选择限制
			var filter=event.filterCard;
			//如果当前时机能够使用/打出火杀并且角色有方片 那么可以发动技能
			if(filter({name:'sha',nature:'thunder'},player,event)&&player.countCards('hes',{suit:'diamond'})) return true;
			//如果当前时机能够使用/打出闪并且角色有梅花 那么可以发动技能
			if(filter({name:'shan'},player,event)&&player.countCards('hes',{suit:'club'})) return true;
			//如果当前时机能够使用/打出桃并且角色有红桃 那么可以发动技能
			if(filter({name:'tao'},player,event)&&player.countCards('hes',{suit:'heart'})) return true;
			//如果当前时机能够使用/打出无懈可击并且角色有黑桃 那么可以发动技能
			if(filter({name:'wuxie'},player,event)&&player.countCards('hes',{suit:'spade'})) return true;
			return false;
		},
		ai:{
			respondSha:true,
			respondShan:true,
			//让系统知道角色“有杀”“有闪”
			skillTagFilter:function(player,tag){
				var name;
				switch(tag){
					case 'respondSha':name='diamond';break;
					case 'respondShan':name='club';break;
					case 'save':name='heart';break;
				}
				if(player.countMark('yb070_meiying')<1) return false;
				if(!player.countCards('hes',{suit:name})) return false;
			},
			//AI牌序
			order:function(item,player){
				if(player&&_status.event.type=='phase'){
					var max=0;
					var list=['sha','tao'];
					var map={sha:'diamond',tao:'heart'}
					for(var i=0;i<list.length;i++){
						var name=list[i];
						if(player.countCards('hes',function(card){
							return (name!='sha'||get.value(card)<5)&&get.suit(card,player)==map[name];
						})>0&&player.getUseValue({name:name,nature:name=='sha'?'thunder':null})>0){
							var temp=get.order({name:name,nature:name=='sha'?'thunder':null});
							if(temp>max) max=temp;
						}
					}
					max/=1.1;
					return max;
				}
				return 2;
			},
		},
		//让系统知道玩家“有无懈”“有桃”
		hiddenCard:function(player,name){
			// if(player.countMark('yb070_meiying')<1) return false;
			if(name=='wuxie'&&_status.connectMode&&player.countCards('hs')>0) return true;
			if(name=='wuxie') return player.countCards('hes',{suit:'spade'})>0;
			if(name=='tao') return player.countCards('hes',{suit:'heart'})>0;
		},
	},
	yb070_fuyi:{
		audio:'ext:夜白神略/audio/character:2',
		group:['yb070_fuyi_use','yb070_fuyi_die'],
		subSkill:{
			use:{
				enable:'phaseUse',
				audio:'yb070_fuyi',
				usable:1,
				superCharlotte:true,
				charlotte:true,
				content:()=>{
					var skill=player.getSkills()[0];
					player.removeSkill(skill);
					game.log(player,'失去了',get.translation(skill))
					var next=game.createEvent('yb070_fuyi',false);
					next.player=player;
					next.setContent(lib.skill.yb070_fuyi.sword);
				},
			},
			die:{
				trigger:{player:['dying','phaseZhunbei'],},
				audio:'yb070_fuyi',
				// usable:1,
				superCharlotte:true,
				charlotte:true,
				content:()=>{
					var skill=player.getSkills()[0];
					player.removeSkill(skill);
					game.log(player,'失去了',get.translation(skill))
					var next=game.createEvent('yb070_fuyi',false);
					next.player=player;
					next.setContent(lib.skill.yb070_fuyi.sword);
				},
			}
		},
		sword:function(){
			'step 0'
			var list1=['shen','YB_dream','YB_memory'];
			var numa=Math.max(4,game.countPlayer());
			var numb=get.translation('yb070_fuyi');
			var band=['ybslshen_014liutianyu','shen_jiaxu','ps_shen_machao'];
			player.YB_fuhan([list1,numa,numb,band,'all',],'tw');
			if(player.isMinHp()) player.recover();
		},
	},
	ybsl_zhezhiqiang:{
		charlotte:true,
		equipSkill:true,
		usable:1,
		enable:['chooseToUse'],
		// filter:function(event,player){
			// return true;
		// },
		filter:function (event,player){
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;
			var name='ybsl_nohua';
			if(player.getCards('e',function(card){
				return get.name(card)=='ybsl_zhezhiqiang';
			})){
				var card=player.getCards('e',function(card){
					return get.name(card)=='ybsl_zhezhiqiang';
				});
			}
			//根据装备区折枝枪的花色 判断要转化出的卡牌是闪还是火杀还是无懈还是桃
			if(card){
				switch(get.suit(card)){
					case 'club':name='ybsl_meihua';break;
					case 'diamond':name='ybsl_lanhua';break;
					case 'spade':name='ybsl_zhuzi';break;
					case 'heart':name='ybsl_juhua';break;
					case 'none':name='ybsl_nohua';break;
				}
			}
			//返回判断结果
			if(name) return evt({name:name},player,event);
		},
		audio:'zhangba_skill',
		viewAs:function(cards,player){
			var name='ybsl_nohua';
			// var nature=null;
			if(player.getCards('e',function(card){
				return get.name(card)=='ybsl_zhezhiqiang';
			})){
				var card=player.getCards('e',function(card){
					return get.name(card)=='ybsl_zhezhiqiang';
				});
			}
			//根据选择的卡牌的花色 判断要转化出的卡牌是闪还是火杀还是无懈还是桃
			if(card){
				switch(get.suit(card)){
					case 'club':name='ybsl_meihua';break;
					case 'diamond':name='ybsl_lanhua';break;
					case 'spade':name='ybsl_zhuzi';break;
					case 'heart':name='ybsl_juhua';break;
					case 'none':name='ybsl_nohua';break;
				}
			}
			//返回判断结果
			if(name) return {name:name};
			return null;
		},
		viewAsFilter:function(player){
			// return player.countCards('h')>0;
			return true;
		},
		prompt:function(event,card){
			var str='视为使用一张';
			var name='ybsl_nohua';
			if(_status.event.player.getCards('e',function(card){
				return get.name(card)=='ybsl_zhezhiqiang';
			})){
				var card=_status.event.player.getCards('e',function(card){
					return get.name(card)=='ybsl_zhezhiqiang';
				});
			}
			if(card){
				switch(get.suit(card)){
					case 'club':name='ybsl_meihua';break;
					case 'diamond':name='ybsl_lanhua';break;
					case 'spade':name='ybsl_zhuzi';break;
					case 'heart':name='ybsl_juhua';break;
					case 'none':name='ybsl_nohua';break;
				}
			}
			str+=get.translation(name);
			return str;
		},
		// prompt:function(){
		// 	return '根据装备区内折枝枪的花色，视为使用一张：<br><span class=yellowtext>梅花：梅花；方块：兰花；<br>黑桃：竹子；红桃：菊花。</span><br><span style="opacity:0.05;">无花：无花</span>';
		// },
		position:'h',
		filterCard:()=>false,
		selectCard:-1,
		hiddenCard:function(player,name){
			if(name=='ybsl_juhua') return true;
			if(name=='ybsl_wuhua') return true;
		},
	},
	//折枝枪全局技能加入special了
	//---------------071想去远方
	'ybsl_xinghen':{
		mod:{
			maxHandcard:function(player,num){
				var i=player.storage.ybsl_xinghen;
				if(i>5)i=5;
				return i+num;
			}
		},
		intro:{
			content:'mark',
		},
		audio:'ext:夜白神略/audio/character:2',
		trigger:{player:'phaseDrawBegin2'},
		//priority:-5,
		filter:function(event,player){
			return !event.numFixed&&player.countMark('ybsl_xinghen')>0;
		},
		mark:true,
		marktext:'痕',
		forced:true,
		content:function(){
			var k=player.storage.ybsl_xinghen;
			if(k>3)k=3;
			trigger.num+=k;
		},
		init:function (player){
			player.storage.ybsl_xinghen=0;
		},
		group:['ybsl_xinghen_juejing','ybsl_xinghen_suilie','ybsl_xinghen_baiai'],
		subSkill:{
			juejing:{
				audio:'ybsl_xinghen',
				trigger:{player:['dying','dyingAfter']},
				forced:true,
				content:function(){
					var num=Math.floor(Math.random()*3)+1;
					if(get.isLuckyStar(player)) num=3;
					player.draw(num);
				}
			},
			suilie:{
				audio:'ybsl_xinghen',
				trigger:{
					player:['changeHp'],
				},
				forced:true,
				content:function (){
					event.num=Math.abs(trigger.num);
					player.addMark('ybsl_xinghen',event.num);
				},
			},
			baiai:{
				audio:'ybsl_xinghen',
				trigger:{
					player:['phaseJieshuBegin'],
				},
				forced:true,
				filter:function(event,player){
					var numb=player.countCards('h')+player.hp;
					if(player.storage.ybsl_xinghen<numb)return false;
					return true;
				},
				content:function (){
					'step 0'
					player.discard(player.getCards('h'));//弃牌
					'step 1'
					player.removeMark('ybsl_xinghen',player.countMark('ybsl_xinghen'));
					player.gainMaxHp();
					'step 2'
					var numc=player.maxHp;
					var carde=player.countCards('h');
					player.draw(numc-carde);
				},
			},
		},
	},
	'ybsl_cuixing':{
		audio:'ext:夜白神略/audio/character:1',
		mark:true,
		intro:{
			content:function(storage,player){
				var str='';
				var suit=['spade','heart','club','diamond'];
				for(var i=0;i<suit.length;i++){
					str+='<br>';
					str+=get.translation(suit[i]);
					str+='可以转化成';
					switch(i){
						case 0:var list=player.storage.ybsl_cuixing_spade,list2=player.storage.ybsl_cuixing_ban_spade;break;
						case 1:var list=player.storage.ybsl_cuixing_heart,list2=player.storage.ybsl_cuixing_ban_heart;break;
						case 2:var list=player.storage.ybsl_cuixing_club,list2=player.storage.ybsl_cuixing_ban_club;break;
						case 3:var list=player.storage.ybsl_cuixing_diamond,list2=player.storage.ybsl_cuixing_ban_diamond;break;
					}
					for(var j=0;j<list.length;j++){
						if(j!=0)str+='、';
						if(list2.includes(list[j])){str+='<span style="text-decoration: line-through;">'+get.translation(list[j])+'</span>'}
						else{str+=get.translation(list[j]);}
					}
				}
				return str;
			}
		},
		group:['ybsl_cuixing_spade','ybsl_cuixing_heart','ybsl_cuixing_club','ybsl_cuixing_diamond'],
		derivation:['ybsl_cuixing_spade','ybsl_cuixing_heart','ybsl_cuixing_club','ybsl_cuixing_diamond'],
		init:function(player){
			player.storage.ybsl_cuixing_spade=['wuxie'];
			player.storage.ybsl_cuixing_heart=['tao'];
			player.storage.ybsl_cuixing_club=['shan'];
			player.storage.ybsl_cuixing_diamond=['sha'];
			player.storage.ybsl_cuixing_ban_spade=[];
			player.storage.ybsl_cuixing_ban_heart=[];
			player.storage.ybsl_cuixing_ban_club=[];
			player.storage.ybsl_cuixing_ban_diamond=[];
			player.storage.ybsl_cuixing_list=[];
		},
		getCuixing:function(player){
			return ['faraway_spade','faraway_heart','faraway_club','faraway_diamond'];
		},
		levelUpFilter:function(player){
			return true;
		},
		levelUp:function(player){
			var next=game.createEvent('ybsl_cuixing_change',false);
			next.player=player;
			next.setContent(lib.skill.ybsl_cuixing.upc);
		},
		// up:function(player){
		// 	var next=game.createEvent('ybsl_cuixing_change',false);
		// 	next.player=player;
		// 	next.setContent(lib.skill.ybsl_cuixing.upc);
		// },
		upc:function(){
			'step 0'
			var list=lib.skill.ybsl_cuixing.getCuixing(player);
			var list66=[];
			for(var i of lib.inpile){
				var type=get.type(i);
				if((['trick','basic','ybsl_flower'].includes(type))&&!player.storage.ybsl_cuixing_list.includes(i)) list66.push(i);
			};
			/*颜色快速提取
			'ybsl_cuixing_spade':'<span style=\'color:#28e3ce\'>淬星</span>',
			'ybsl_cuixing_heart':'<span style=\'color:#fff600\'>淬星</span>',
			'ybsl_cuixing_club':'<span style=\'color:#a900ff\'>淬星</span>',
			'ybsl_cuixing_diamond':'<span style=\'color:#ff0000\'>淬星</span>',
			*/
			var next=player.chooseToMove('淬星：请选择要新增的牌名。');
			next.set('list',[
				['黑桃/红桃/梅花/方块',[list,'vcard'],function(list){
					var list2=list.map(function(i){
						return get.translation(i[2]);
					});
				return '<span class=YB_snowtext>黑桃新增'+list2[0]+'可转化；</span><span class=yellowtext>红桃新增'+list2[1]+'可转化；</span><br><span class=YB_darktext>梅花新增'+list2[2]+'可转化；</span><span class=firetext>方块新增'+list2[3]+'可转化。</span><br>请不要为黑桃赋予无懈，为红桃赋予桃，为梅花赋予闪，为方块赋予杀，不仅是无事发生，而是会出大问题。';
				}],
				['操作方法：从下方选择你想要的目标牌，然后替换你要赋予的花色。操作结算时，会根据你选择的牌名对该花色进行添加。<br>此操作本质上是读取此格内牌名的序列，按照黑桃，红桃，梅花，方块的顺序依次读取，故而想要不为这个花色赋予时，可以把自带的花色图案放在那里卡位，那玩意不会被读取。<br><span style=\'color:#fff600\'>请勿在此界面托管，否则ai不会进行任何操作，并直接确认</span><br>——感谢Angel大佬撰写的ai框架，并顺手让这个框只能替换而不能移动',[list66,'vcard']
				
				]
			]);
			next.set('filterMove',function(from,to){
				return typeof to!='number';
			});
			next.processAI=function(list){
				var suits=list[0][1][0],player=_status.event.player,names=list[1][1][0]
				var suit=suits
				var name=names
				//给个例子，suit花色的第一个设置设置为桃，如果没有桃则随机 只有第一个，剩下的自己看着加吧
				if(name.includes('tao')){//黑桃
					var i = name.length;
					while (i--) {
						if (name[i] === 'tao') {
							var num= i;
						}
					}
					name[num]=suit[0]
					suit[0]='tao'
				}
				else if(name.includes('ybsl_juhua')){
					var i = name.length;
					while (i--) {
						if (name[i] === 'ybsl_juhua') {
							var num= i;
						}
					}
					name[num]=suit[0]
					suit[0]='ybsl_juhua'
				}
				else {
					var i = name.length;
					var	cardname=name.randomGets(1)
					while (i--) {
						if (name[i] === cardname[0]) {
							var num= i;
						}
					}
					name[num]=suit[0]
					suit[0]=cardname[0]
				}
				if(name.includes('wuxie')){//红桃
					var i = name.length;
					while (i--) {
						if (name[i] === 'wuxie') {
							var num= i;
						}
					}
					name[num]=suit[1]
					suit[1]='wuxie'
				}
				else if(name.includes('zhujinqiyuan')){
					var i = name.length;
					while (i--) {
						if (name[i] === 'zhujinqiyuan') {
							var num= i;
						}
					}
					name[num]=suit[1]
					suit[1]='zhujinqiyuan'
				}
				else {
					var i = name.length;
					var	cardname=name.randomGets(1)
					while (i--) {
						if (name[i] === cardname[0]) {
							var num= i;
						}
					}
					name[num]=suit[1]
					suit[1]=cardname[0]
				}
				if(name.includes('ybsl_lanhua')){//梅花
					var i = name.length;
					while (i--) {
						if (name[i] === 'ybsl_lanhua') {
							var num= i;
						}
					}
					name[num]=suit[2]
					suit[2]='ybsl_lanhua'
				}
				else if(name.includes('zengbingjianzao')){
					var i = name.length;
					while (i--) {
						if (name[i] === 'zengbingjianzao') {
							var num= i;
						}
					}
					name[num]=suit[2]
					suit[2]='zengbingjianzao'
				}
				else {
					var i = name.length;
					var	cardname=name.randomGets(1)
					while (i--) {
						if (name[i] === cardname[0]) {
							var num= i;
						}
					}
					name[num]=suit[2]
					suit[2]=cardname[0]
				}
				if(name.includes('sadouchengbing')){//方块
					var i = name.length;
					while (i--) {
						if (name[i] === 'sadouchengbing') {
							var num= i;
						}
					}
					name[num]=suit[3]
					suit[3]='sadouchengbing'
				}
				else if(name.includes('dongzhuxianji')){
					var i = name.length;
					while (i--) {
						if (name[i] === 'dongzhuxianji') {
							var num= i;
						}
					}
					name[num]=suit[3]
					suit[3]='dongzhuxianji'
				}
				else if(name.includes('wuzhong')){
					var i = name.length;
					while (i--) {
						if (name[i] === 'wuzhong') {
							var num= i;
						}
					}
					name[num]=suit[3]
					suit[3]='wuzhong'
				}
				else {
					var i = name.length;
					var	cardname=name.randomGets(1)
					while (i--) {
						if (name[i] === cardname[0]) {
							var num= i;
						}
					}
					name[num]=suit[3]
					suit[3]=cardname[0]
				}
				//这段代码别被鸽子看见，我怕他打死我…理论上可以写的简短一点，不过不知为何到我手上就这么繁冗………
				//以上的suit[0]代表suit数组的第一项，[1]为第二项，顺便提醒一下suit为带有花色的那个数组，name是牌名的数组
				var suit=suit.map((Angel)=>['','',Angel])
				var name=name.map((Angel)=>['','',Angel])
				return [suit,name]
				//这是最后的结果
			}
			/*
			
			*/
			event.list=list;
			// event.list2=list2;
			'step 1'
			if(result.bool){
				var list=['faraway_spade','faraway_heart','faraway_club','faraway_diamond'],list2=result.moved[0].map(function(i){
					return i[2];
				});
				for(var i=0;i<4;i++){
					if(!list.includes(list2[i])){
						switch(i){
							case 0:player.storage.ybsl_cuixing_spade.push(list2[i]);break;
							case 1:player.storage.ybsl_cuixing_heart.push(list2[i]);break;
							case 2:player.storage.ybsl_cuixing_club.push(list2[i]);break;
							case 3:player.storage.ybsl_cuixing_diamond.push(list2[i]);break;
						}
						player.storage.ybsl_cuixing_list.push(list2[i]);
					}
				}
				var str='#g';
				for(var j=0;j<4;j++){
					str+=get.translation(list2[j]);
					if(j!=3) str+='/';
				}
				game.log(player,'#g【淬星】','各花色依次新增',str);
				
			}
		},
		subSkill:{
			spade:{
				audio:'ext:夜白神略/audio/character:1',
				enable:['chooseToUse','chooseToRespond'],
				filter:function (event,player){
					if(player.countCards('hes',{suit:'spade'})<1) return false;
					var evt=lib.filter.filterCard;
					if(event.filterCard) evt=event.filterCard;
					var list1=[];
					for(var i of player.storage.ybsl_cuixing_spade){
						if(!player.storage.ybsl_cuixing_ban_spade.includes(i)){list1.push(i);}
					};
					for(var k of list1){
						if(evt({name:k},player,event)) return true;
					};
					return false;
				},
				chooseButton:{
					dialog:function (event,player){
						var list=[];
						var list2=player.storage.ybsl_cuixing_spade;
						for(var i=0;i<list2.length;i++){
							if(!player.storage.ybsl_cuixing_ban_spade.includes(list2[i])) list.push(['淬星','',list2[i],'ice']);
						}
						return ui.create.dialog('淬星黑桃',[list,'vcard']);
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
								if(suit!='spade')return false;
								return true;
							},
							selectCard:[1,2],
							complexCard:true,
							position:'hes',
							audio:'ybsl_cuixing_spade',
							popname:true,
							viewAs:{name:links[0][2],nature:links[0][3],suit:'spade'},
							precontent:function(){
								'step 0'
								player.logSkill('ybsl_cuixing');
								'step 1'
								var name=event.result.card.name;
								player.addTempSkill('ybsl_cuixing_ban');
								if(name!='wuxie')player.storage.ybsl_cuixing_ban_spade.push(name);
							},
						};
					},
					prompt:function (links,player){
						return '将一至两张黑桃牌当作冰属性'+get.translation(links[0][2])+'使用';
					},
				},
				hiddenCard:function (player,name){
					return player.storage.ybsl_cuixing_spade.includes(name)&&player.countCards('hes')>=1;
				},
				ai:{
					fireAttack:true,
					respondSha:true,
					respondShan:true,
					skillTagFilter:function (player){
						if(player.countCards('hes')<1) return false;
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
			heart:{
				audio:'ext:夜白神略/audio/character:1',
				enable:['chooseToUse','chooseToRespond'],
				filter:function (event,player){
					if(player.countCards('hes',{suit:'heart'})<1) return false;
					var evt=lib.filter.filterCard;
					if(event.filterCard) evt=event.filterCard;
					var list1=[];
					for(var i of player.storage.ybsl_cuixing_heart){
						if(!player.storage.ybsl_cuixing_ban_heart.includes(i)){list1.push(i);}
					};
					for(var k of list1){
						if(evt({name:k},player,event)) return true;
					};
					return false;
				},
				chooseButton:{
					dialog:function (event,player){
						var list=[];
						var list2=player.storage.ybsl_cuixing_heart;
						for(var i=0;i<list2.length;i++){
							if(!player.storage.ybsl_cuixing_ban_heart.includes(list2[i])) list.push(['淬星','',list2[i],'YB_blood']);
						}
						return ui.create.dialog('淬星红桃',[list,'vcard']);
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
								if(suit!='heart')return false;
								return true;
							},
							selectCard:[1,2],
							complexCard:true,
							position:'hes',
							audio:'ybsl_cuixing_heart',
							popname:true,
							viewAs:{name:links[0][2],nature:links[0][3],suit:'heart'},
							precontent:function(){
								'step 0'
								player.logSkill('ybsl_cuixing');
								'step 1'
								var name=event.result.card.name;
								player.addTempSkill('ybsl_cuixing_ban');
								if(name!='tao')player.storage.ybsl_cuixing_ban_heart.push(name);
							},
						};
					},
					prompt:function (links,player){
						return '将一至两张红桃牌当作血属性'+get.translation(links[0][2])+'使用';
					},
				},
				hiddenCard:function (player,name){
					return player.storage.ybsl_cuixing_heart.includes(name)&&player.countCards('hes')>=1;
				},
				ai:{
					fireAttack:true,
					respondSha:true,
					respondShan:true,
					skillTagFilter:function (player){
						if(player.countCards('hes')<1) return false;
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
			club:{
				audio:'ext:夜白神略/audio/character:1',
				enable:['chooseToUse','chooseToRespond'],
				filter:function (event,player){
					if(player.countCards('hes',{suit:'club'})<1) return false;
					var evt=lib.filter.filterCard;
					if(event.filterCard) evt=event.filterCard;
					var list1=[];
					for(var i of player.storage.ybsl_cuixing_club){
						if(!player.storage.ybsl_cuixing_ban_club.includes(i)){list1.push(i);}
					};
					for(var k of list1){
						if(evt({name:k},player,event)) return true;
					};
					return false;
				},
				chooseButton:{
					dialog:function (event,player){
						var list=[];
						var list2=player.storage.ybsl_cuixing_club;
						for(var i=0;i<list2.length;i++){
							if(!player.storage.ybsl_cuixing_ban_club.includes(list2[i])) list.push(['淬星','',list2[i],'thunder']);
						}
						return ui.create.dialog('淬星梅花',[list,'vcard']);
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
								if(suit!='club')return false;
								return true;
							},
							selectCard:[1,2],
							complexCard:true,
							position:'hes',
							audio:'ybsl_cuixing_club',
							popname:true,
							viewAs:{name:links[0][2],nature:links[0][3],suit:'club'},
							precontent:function(){
								'step 0'
								player.logSkill('ybsl_cuixing');
								'step 1'
								var name=event.result.card.name;
								player.addTempSkill('ybsl_cuixing_ban');
								if(name!='shan')player.storage.ybsl_cuixing_ban_club.push(name);
							},
						};
					},
					prompt:function (links,player){
						return '将一至两张梅花牌当作雷属性'+get.translation(links[0][2])+'使用';
					},
				},
				hiddenCard:function (player,name){
					return player.storage.ybsl_cuixing_club.includes(name)&&player.countCards('hes')>=1;
				},
				ai:{
					fireAttack:true,
					respondSha:true,
					respondShan:true,
					skillTagFilter:function (player){
						if(player.countCards('hes')<1) return false;
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
			diamond:{
				audio:'ext:夜白神略/audio/character:1',
				enable:['chooseToUse','chooseToRespond'],
				filter:function (event,player){
					if(player.countCards('hes',{suit:'diamond'})<1) return false;
					var evt=lib.filter.filterCard;
					if(event.filterCard) evt=event.filterCard;
					var list1=[];
					for(var i of player.storage.ybsl_cuixing_diamond){
						if(!player.storage.ybsl_cuixing_ban_diamond.includes(i)){list1.push(i);}
					};
					for(var k of list1){
						if(evt({name:k},player,event)) return true;
					};
					return false;
				},
				chooseButton:{
					dialog:function (event,player){
						var list=[];
						var list2=player.storage.ybsl_cuixing_diamond;
						for(var i=0;i<list2.length;i++){
							if(!player.storage.ybsl_cuixing_ban_diamond.includes(list2[i]))list.push(['淬星','',list2[i],'fire']);
						}
						return ui.create.dialog('淬星方块',[list,'vcard']);
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
								if(suit!='diamond')return false;
								return true;
							},
							selectCard:[1,2],
							complexCard:true,
							position:'hes',
							audio:'ybsl_cuixing_diamond',
							popname:true,
							viewAs:{name:links[0][2],nature:links[0][3],suit:'diamond'},
							precontent:function(){
								'step 0'
								player.logSkill('ybsl_cuixing');
								'step 1'
								var name=event.result.card.name;
								player.addTempSkill('ybsl_cuixing_ban');
								if(name!='sha')player.storage.ybsl_cuixing_ban_diamond.push(name);
							},
						};
					},
					prompt:function (links,player){
						return '将一至两张方块牌当作火属性'+get.translation(links[0][2])+'使用';
					},
				},
				hiddenCard:function (player,name){
					return player.storage.ybsl_cuixing_diamond.includes(name)&&player.countCards('hes')>=1;
				},
				ai:{
					fireAttack:true,
					respondSha:true,
					respondShan:true,
					skillTagFilter:function (player){
						if(player.countCards('hes')<1) return false;
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
			change:{},
			ban:{
				// trigger:{player:'phaseAfter'},
				direct:true,
				content:()=>{
					player.storage.ybsl_cuixing_ban_spade=[];
					player.storage.ybsl_cuixing_ban_heart=[];
					player.storage.ybsl_cuixing_ban_club=[];
					player.storage.ybsl_cuixing_ban_diamond=[];
				},
				onremove:(player)=>{
					// player.useSkill('ybsl_cuixing_ban');
					player.storage.ybsl_cuixing_ban_spade=[];
					player.storage.ybsl_cuixing_ban_heart=[];
					player.storage.ybsl_cuixing_ban_club=[];
					player.storage.ybsl_cuixing_ban_diamond=[];
				},
			}
		}
	},
	'ybsl_xinghui':{
		audio:'ext:夜白神略/audio/character:1',
		trigger:{player:['useCard1','respond']},
		direct:true,
		popup:false,
		filter:function(event){
			var evt=event;
			return evt.cards&&evt.cards.length>=2;
		},
		content:function(){
			'step 0'
			event.list=[];
			// if(!trigger.card.yingbian&&(Array.isArray(get.info(trigger.card).yingbian_tags))&&event.triggername=='useCard1'){
				if(player.storage.ybsl_xinghui2){
					if(!player.storage.ybsl_xinghui2.includes(trigger.card.name)){
						event.list.push('应变');
					}
				}
				else {event.list.push('应变');}
			// }
			event.list.push('摸一');
			event.list.push('cancel2');
			'step 1'
			player.chooseControl(event.list);
			'step 2'
			if(result.control!='cancel2'){
				player.logSkill('ybsl_xinghui');
				if(result.control=='应变'){
					if(!Array.isArray(trigger.temporaryYingbian)) trigger.temporaryYingbian=[];
					trigger.temporaryYingbian.add('force');
					trigger.temporaryYingbian.addArray(get.yingbianEffects());
					// if(!trigger.card.yingbian){
					// 	trigger.card.yingbian=true;
					// 	var info=get.info(trigger.card);
					// 	trigger.card.cardtags=info.yingbian_tags.map(function(i){
					// 		return 'yingbian_'+i;
					// 	});
					// 	if(info&&info.yingbian) info.yingbian(trigger);
						player.addTempSkill('yingbian_changeTarget');
						player.addTempSkill('ybsl_xinghui2');
						if(!player.storage.ybsl_xinghui2) player.storage.ybsl_xinghui2=[];
						player.storage.ybsl_xinghui2.push(trigger.card.name);
					// }
				};
				if(result.control=='摸一'){player.draw()};
			}
			
		}
	},
	'ybsl_xinghui2':{onremove:true,},
	'ybsl_xingbian':{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:'gainBegin',
		},
		filter:function(event,player){
			var num1=player.hp+player.maxHp;
			var num2=player.countCards('h')*2
			return num1>num2&&!player.storage.ybsl_xingbian;
		},
		init: function (player) {
			player.storage.ybsl_cuixing_spade = ['wuxie'];
			player.storage.ybsl_cuixing_heart = ['tao'];
			player.storage.ybsl_cuixing_club = ['shan'];
			player.storage.ybsl_cuixing_diamond = ['sha'];
			player.storage.ybsl_cuixing_ban_spade = [];
			player.storage.ybsl_cuixing_ban_heart = [];
			player.storage.ybsl_cuixing_ban_club = [];
			player.storage.ybsl_cuixing_ban_diamond = [];
			player.storage.ybsl_cuixing_list = [];//QQQ
			lib.onwash.push(function () {
				delete player.storage.ybsl_xingbian;
			});
		},
		skillAnimation:true,
		content:function(){
			'step 0'
			player.storage.ybsl_xingbian=true;
			if(player.maxHp>1)player.loseMaxHp();
			'step 1'
			// player.YB_levelUp(['ybsl_cuixing']);
			var next=game.createEvent('ybsl_cuixing_change',false);
			next.player=player;
			next.setContent(lib.skill.ybsl_cuixing.upc);
		},
		derivation:'ybsl_cuixing_change',
		
	},
	//-------------------苏令燚
	'yb072_ezhao':{
		preHidden:true,
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'phaseBegin',
		},
		forced:true,
		filter:function (event,player){
			if(event.player==player)return false;
			return true;
		},
		marktext:'呪',
		intro:{
			content:'expansion',
			markcount:'expansion',
		},
		content:function (){
			'step 0'
			trigger.player.judge();
			'step 1'
			event.card=result.card;
			if(trigger.player.getExpansions('yb072_ezhao_mark').length>0){
				var suit=get.suit(event.card,false);
				var list=trigger.player.getExpansions('yb072_ezhao_mark');
				game.log(suit,list);
				for(var i=0;i<list.length;i++){
					if(suit==get.suit(list[i],false)){
						var gogo=true;
					}
					else if(i==list.length-1&&gogo!=true){
						trigger.player.addToExpansion(event.card,'gain2').gaintag.add('yb072_ezhao_mark');
						event.finish();
					}
					else if(i==list.length-1&&gogo==true){
						game.log('成');
						event.goto(2);
					}
				}
			}
			else{
				trigger.player.addToExpansion(event.card,'gain2').gaintag.add('yb072_ezhao_mark');
				event.finish();
			}
			'step 2'
			trigger.player.chooseControl('是','否').set('prompt','是否对其发起投江').set('ai',function(){
				var att=get.attitude(_status.event.player,player);
				if(att<0)return '是';
				return '否';
			});
			'step 3'
			if(result.control=='否'){
				event.finish();
			}
			else{
				game.log('因作者水平受限，这里临时改成视为对'+get.translation(player)+'使用一张杀');
				trigger.player.useCard(
					{
						name:'sha',
						isCard:false,
					},player,false
				);
				//lib.skill.yb072_toujiang.up(trigger.player);
			}
		},
		group:['yb072_ezhao_mark','yb072_ezhao_jie'],
		subSkill:{
			mark:{
				forced:true,
				onremove:true,
				charlotte:true,
				marktext:'呪',
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
			},
			jie:{
				direct:true,
				trigger:{
					global:'useCard',
				},
				audio:'yb072_ezhao',
				filter:function(event,player){
					if(event.player.getExpansions('yb072_ezhao_mark').length==0)return false;
					return true;
				},
				content:function(){
					'step 0'
					event.goto(1);
					//为以后有可能的无理要求留个空位
					'step 1'
					var suit=get.suit(trigger.cards[0]);
					var list=trigger.player.getExpansions('yb072_ezhao_mark');
					for(var i=0;i<list.length;i++){
						if(suit==get.suit(list[i])){
							game.delay(0.5);
							event.goto(3);
						}
					}
					'step 2'
					event.finish();
					'step 3'
					var list2=['无效','令其摸一','cancel2'];
					player.chooseControl(list2).set(
						'prompt',
						get.translation(trigger.player)+'对'+get.translation(trigger.targets)+'使用了'+get.translation(trigger.cards)+'，<br>是否令此牌无效'
					).set('ai',function(){
						var att=get.attitude(_status.event.player,trigger.player);
						if(att<0){return '无效';}
						else if(att>0){return '令其摸一';}
						else if(att=0){return 'cancel2';}
					});
					'step 4'
					if(result.control=='cancel2'){
						event.finish();
					}
					else if(result.control=='无效'){
						player.logSkill('yb072_ezhao',trigger.player);
						game.delay(0.5);
						trigger.cancel();
					}
					else if(result.control=='令其摸一'){
						player.logSkill('yb072_ezhao',trigger.player);
						game.delay(0.5);
						trigger.player.draw();
					}
				},
				ai:{
					expose:1,//跳立场
					threaten:2,//嘲讽值
				},
			},
		},
	},
	'yb072_toujiang':{
		// popup:false,
		up:function(){
			'step 0'
			player.chooseTarget().set('prompt','要把谁投进河里').set('ai',function(target){
				var player=_status.event.player;
				var att=get.attitude(player,target);
				if(att<0){
					att=-Math.sqrt(-att);
				}
				else{
					att=Math.sqrt(att);
				}
				return att*lib.card.guohe.ai.result.target(player,target);
			})
			'step 1'
			if(result.bool){
				//此处接入投票系统
			}
			else{
				event.finish();
			}
		},
	},
	//----------------铝笨073（意为铝和神孙策的结合体）
	'ybsl_duanzui':{//断罪
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		filter:(event,player)=>(game.hasPlayer((current)=>(current!=player))),
		filterTarget:(card,player,target)=>(target!=player),
		content:function(){
			'step 0'
			if(target.isIn()){
				if(target.countCards('he')>0){
					player.choosePlayerCard(target,'he',true);
				}
				else{
					result.cards=get.cards(1);
				}
			}
			'step 1'
			player.showCards(result.cards);
			event.card=result.cards;
			'step 2'
			target.addToExpansion(event.card,'gain2').gaintag.add('ybsl_duanzui_mark');
			'step 3'
			if(target.maxHp>1){target.loseMaxHp();}
			else{event.finish();}
			'step 4'
			player.loseMaxHp();
		},
		locked:false,
		//global:'ybsl_duanzui_mark',
		mod:{
			targetInRange:function(card,player,target){
				if(target.hasMark('ybsl_duanzui_mark')) return true;
			},
		},
		ai:{
			combo:'ybsl_zhenhun',
			threaten:3,//嘲讽值
			expose:1,//跳立场
			order:2,
			result:{
				target:function(player,target){
					if(target.isHealthy()) return -2;
					return -1;
				},
			},
		},
		subSkill:{
			mark:{
				marktext:'§',
				intro:{
					name:'§',
					content:'expansion',
					markcount:'expansion',
					onunmark:true,
				},
				mod:{
					maxHandcard:function(player,num){
						var numx=player.countMark('ybsl_duanzui_mark');
						if(numx) return num+numx*game.countPlayer(function(current){
							return current.hasSkill('ybsl_duanzui');
						});
					},
				},
			},
		},
	},
	'ybsl_zhenhun':{//镇魂
		audio:'ext:夜白神略/audio/character:2',
		trigger:{player:'useCardToPlayered'},
		forced:true,
		filter:function(event,player){
			if(event.target.getExpansions('ybsl_duanzui_mark').length==0)return false;
			return true;
		},
		logTarget:'target',
		content:function(){
			trigger.directHit.add(trigger.target);
			if(player.getHistory('gain',function(evt){
				return evt.getParent(2).name=='ybsl_zhenhun';
			}).length<2) player.draw();
		},
		group:['ybsl_zhenhun_usea','ybsl_zhenhun_die'],
		ai:{
			directHit_ai:true,
			skillTagFilter:function(player,tag,arg){
				return arg&&arg.target&&arg.target.hasMark('ybsl_duanzui_mark')
			},
		},
		subSkill:{
			usea:{
				trigger:{source:'damageSource'},
				// forced:true,
				usable:1,
				filter:function(event,player){
					if(event.player.getExpansions('ybsl_duanzui_mark').length==0)return false;
					return true;
				},
				prompt:'是否获得其一张"§"标记？',
				prompt2:'然后你加1点体力上限并摸一张牌。',
				content:function(){
					'step 0'
					event.cards=trigger.player.getExpansions('ybsl_duanzui_mark');
					'step 1'
					player.chooseCardButton(event.cards,true,'镇魂：获得其一张“§”牌').set('ai',function(button){
						return get.useful(button.link);
					});
					'step 2'
					player.gain(result.links,'gain2');
					player.gainMaxHp();
					player.draw();
				},
			},
			die:{
				trigger:{global:'die'},
				forced:true,
				filter:function(event,player){
					if(event.player.getExpansions('ybsl_duanzui_mark').length==0)return false;
					return true;
				},
				// filter:function(event,player){
					// return event.player.countMark('ybsl_duanzui_mark')>0;
				// },
				content:function(){
					player.gainMaxHp(trigger.player.getExpansions('ybsl_duanzui_mark').length);
					player.draw(trigger.player.getExpansions('ybsl_duanzui_mark').length);
				},
			},
		},
	},
	'ybsl_kunyu':{//困圄
		audio:'ext:夜白神略/audio/character:2',
		mod:{
			maxHandcardBase:function(player){
				return player.getDamagedHp();
			},
		},
		trigger:{player:'damageBegin2'},
		forced:true,
		filter:function(event,player){
			return event.source&&event.source!=player&&player.maxHp>1&&player.countCards('h')>0;
		},
		content:function(){
			'step 0'
			player.chooseCardTarget({
				prompt:'请选择【困圄】的牌和目标',
				prompt2:'将一张手牌交给一名其他角色并防止伤害'+(player.hasSkill('ybsl_duanzui')?'，然后将伤害来源的一张牌置于其武将牌上称为“§”（若其无牌则改为牌堆顶一张牌）':''),
				filterCard:true,
				forced:true,
				filterTarget:lib.filter.notMe,
				ai1:function(card){
					if(get.tag(card,'recover')&&!game.hasPlayer(function(current){
						return get.attitude(current,player)>0&&!current.hasSkillTag('nogain');
					})) return 0;
					return 1/Math.max(0.1,get.value(card));
				},
				ai2:function(target){
					var player=_status.event.player,att=get.attitude(player,target);
					if(target.hasSkillTag('nogain')) att/=9;
					return 4+att;
				},
			});
			'step 1'
			if(result.bool){
				var target=result.targets[0];
				//player.logSkill('ybsl_kunyu',target);
				player.line(target,'green');
				player.give(result.cards,target);
				trigger.cancel();
				player.loseMaxHp();
				if(player.hasSkill('ybsl_duanzui')){
					event.target=trigger.source;
					event.goto(2);
					// trigger.source.addMark('ybsl_duanzui_mark',1);
				}
				else{event.finish();}
			}
			'step 2'
			if(event.target.isIn()){
				if(event.target.countCards('he')>0){
					player.choosePlayerCard(event.target,'he',true);
				}
				else{
					result.cards=get.cards(1);
				}
			}
			'step 3'
			player.showCards(result.cards);
			event.card=result.cards;
			'step 4'
			event.target.addToExpansion(event.card,'gain2').gaintag.add('ybsl_duanzui_mark');
		},
	},
	//-------------074花落隨風
	ybsl_guanxing:{
		audio:'ext:夜白神略/audio/character:2',
	},
	ybsl_tianwen:{
		audio:'ext:夜白神略/audio/character:2',
	},
	ybsl_guayao:{
		audio:'ext:夜白神略/audio/character:2',
	},
	//-------------------苟卡
	'yb075_quanke':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'phaseUseBefore',
		},
		filter:function(event,player){
			return event.player!=player&&event.player.countCards('he')>1;
		},
		check:function (event,player){
			var tar=event.player;
			var att=get.attitude(player,tar);//好感度
			if(att<=0){
				return tar.countCards('h')<5;
			}
			else{
				return tar.countCards('h')>3
			}
		},
		content:function(){
			'step 0'
			// player.chooseControl('一张','两张');
			trigger.player.chooseCard('he',true,'劝氪：将一张牌交给'+get.translation(player));
			'step 1'
			if(result.bool){
				// event.card=result.cards;
				// game.log('1',result.cards);
				trigger.player.showCards(result.cards);
				trigger.player.give(result.cards,player,true);
				trigger.player.storage.yb075_quanke_buff=get.type2(result.cards[0]);
				trigger.player.addTempSkill('yb075_quanke_buff',{player:'phaseUseAfter'});
			}
			else{event.finish();}
		},
	},
	'yb075_quanke_buff':{
		trigger:{
			player:'useCard',
		},
		forced:true,
		filter:function(event,player,card){
			return get.type2(event.card)==player.storage.yb075_quanke_buff;
		},
		content:function(){
			player.draw();
		},
		charlotte:true,
		mark:true,
		marktext:'氪',
		intro:{
			name:'氪金',
			content:function (storage,player){
				var str='本阶段使用';
				str+=get.translation(player.storage.yb075_quanke_buff);
				str+='类型牌时摸一张牌。';
				return str;
			},
		},
		onremove:true,
	},
	'yb075_wuma':{
		audio:'ext:夜白神略/audio/character:2',
		init:function (player,skill){
			player.disableEquip('equip3');
			player.disableEquip('equip4');
		},
	},
	'yb075_qianma':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'chooseToUse',
		filterCard:function(card){
			return get.subtype(card)=='equip3'||get.subtype(card)=='equip4'||get.subtype(card)=='equip6';
		},
		position:'hes',
		viewAs:{name:'wuzhong'},
		viewAsFilter:function(player){
			if(!player.countCards('hes',function(card){
				return get.subtype(card)=='equip3'||get.subtype(card)=='equip4'||get.subtype(card)=='equip6';
			})) return false;
		},
		prompt:'将一张坐骑牌当无中生有使用',
		check:function(card){return 4-get.value(card)}
	},
	//-------------------朱焌
	'yb076_suiyan':{
		audio:'ext:夜白神略/audio/character:2',
		preHidden:true,
		trigger:{
			global:'phaseUseBefore',
		},
		filter:function (event,player){
			return player!=event.player&&!player.hasSkill('yb076_suiyan_mark');
		},
		content:function (){
			'step 0'
			trigger.player.draw(2);
			player.addTempSkill('yb076_suiyan_mark','roundStart');
			'step 1'
			player.addTempSkill('yb076_suiyan_use'/*,{global:'phaseUseAfter'}*/);
			player.storage.yb076_suiyan_use=trigger.player;
		},
		subSkill:{
			use:{
				onremove:true,
				audio:'yb076_suiyan',
				mark:true,
				intro:{
					content:'本回合$使用非{装备或延时锦囊}后，你可以视为使用一张同样的牌',
				},
				trigger:{
					global:'useCardAfter',
				},
				filter:(event,player)=>{
					if(!player.storage.yb076_suiyan_use||event.player!=player.storage.yb076_suiyan_use)return false;
					if(get.type(event.card)=='equip'||get.type(event.card)=='delay')return false;
					return player.hasUseTarget(event.card);
				},
				content:function (){
					var name=(trigger.card.viewAs||trigger.card.name);
					player.chooseUseTarget(
						get.prompt('yb076_suiyan'),
						'视为使用一张'+get.translation(trigger.card),
						{
							name:name,
							nature:trigger.card.nature,
							isCard:false
						}
					).set('logSkill','yb076_suiyan');
				},
				sub:true,
			},
			mark:{
				mark:true,
				intro:{
					content:'本轮已发动',
				},
				sub:true,
			},
		},
	},
	'yb076_zhenlie':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'zhenlie',
	},
	'yb076_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	//-------------------羊祈絮
	'yb077_shensu':{
		audio:'yb077_shensu1',
		group:['yb077_shensu1','yb077_shensu2','yb077_shensu4']
	},
	yb077_shensu1:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{player:'phaseJudgeBefore'},
		direct:true,
		content:function(){
			"step 0"
			var check= player.countCards('h')>2;
			player.chooseTarget(get.prompt("yb077_shensu"),"跳过判定阶段和摸牌阶段，视为对一名其他角色使用一张【杀】",function(card,player,target){
				if(player==target) return false;
				return player.canUse({name:'sha'},target,false);
			}).set('check',check).set('ai',function(target){
				if(!_status.event.check) return 0;
				return get.effect(target,{name:'sha'},_status.event.player);
			}).setHiddenSkill('yb077_shensu1');
			"step 1"
			if(result.bool){
				player.logSkill('yb077_shensu1',result.targets);
				player.useCard({name:'sha',isCard:true},result.targets[0],false);
				trigger.cancel();
				player.skip('phaseDraw');
			}
		}
	},
	yb077_shensu2:{
		audio:'yb077_shensu1',
		trigger:{player:'phaseUseBefore'},
		direct:true,
		filter:function(event,player){
			return player.countCards('he',function(card){
				if(_status.connectMode) return true;
				return get.type(card)=='equip';
			})>0;
		},
		content:function(){
			"step 0"
			var check=player.needsToDiscard();
			player.chooseCardTarget({
				prompt:get.prompt('yb077_shensu'),
				prompt2:"弃置一张装备牌并跳过出牌阶段，视为对一名其他角色使用一张【杀】",
				filterCard:function(card,player){
					return get.type(card)=='equip'&&lib.filter.cardDiscardable(card,player)
				},
				position:'he',
				filterTarget:function(card,player,target){
					if(player==target) return false;
					return player.canUse({name:'sha'},target,false);
				},
				ai1:function(card){
					if(_status.event.check) return 0;
					return 6-get.value(card);
				},
				ai2:function(target){
					if(_status.event.check) return 0;
					return get.effect(target,{name:'sha'},_status.event.player);
				},
				check:check
			}).setHiddenSkill('yb077_shensu2');
			"step 1"
			if(result.bool){
				player.logSkill('yb077_shensu2',result.targets);
				player.discard(result.cards[0]);
				player.useCard({name:'sha',isCard:true},result.targets[0],false);
				trigger.cancel();
			}
		}
	},
	yb077_shensu4:{
		audio:'yb077_shensu1',
		trigger:{player:'phaseDiscardBefore'},
		direct:true,
		content:function(){
			"step 0"
			var check=player.needsToDiscard()||player.isTurnedOver()||(player.hasSkill('shebian')&&player.canMoveCard(true,true));
			player.chooseTarget(get.prompt('yb077_shensu'),"跳过弃牌阶段并将武将牌翻面，视为对一名其他角色使用一张【杀】",function(card,player,target){
				if(player==target) return false;
				return player.canUse({name:'sha'},target,false);
			}).set('check',check).set('ai',function(target){
				if(!_status.event.check) return 0;
				return get.effect(target,{name:'sha'},_status.event.player,_status.event.player);
			});
			"step 1"
			if(result.bool){
				player.logSkill('yb077_shensu4',result.targets);
				player.turnOver();
				player.useCard({name:'sha',isCard:true},result.targets[0],false);
				trigger.cancel();
			}
		}
	},
	'yb077_yingmu':{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{global:'useCard1'},
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		firstDo:true,
		filter:function(event,player){
			if(!player.isTurnedOver()) return false;
			return event,player!=player;
		},
		content:function(){},
		mod:{
			targetEnabled:function(card,player,target){
				if(target.isTurnedOver()&&player!=target) return false;
			}
		}
	},
	'yb077_jibu':{
		audio:'ext:夜白神略/audio/character:2',
		usable:3,
		trigger:{player:'useCardAfter'},
		filter:function(event,player){
			//event.cards.filterInD().length>0&&//此牌在弃牌堆
			return !player.getHistory('sourceDamage',function(evt){
				return evt.card==event.card;
			}).length;
		},
		check:function(){return true;},
		frequent:true,
		content:()=>{player.draw();},
	},
	'yb077_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	//-------------------朱涯海
	'yb078_yaoyan':{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		filterTarget:function(card,player,target){
			if(player==target) return false;
			return target.hasCard(card=>lib.filter.canBeGained(card,target,player),'he');
		},
		selectTarget:[1,Infinity],
		content:function(){
			if(target.countGainableCards(player,'he')){
				player.gainPlayerCard('he',target,true);
				target.addTempSkill('yb078_yaoyan_add');
			}
		},
		ai:{
			threaten:1.1,//嘲讽值
			expose:1,
			order:8,//主动技使用的先后，杀是3，酒是3.2。这个技能排在最前面
			result:{//主动技的收益
				player:function(player,target){
					if(ui.selected.targets.length) return ui.selected.targets.length;
					return 1;
				},
				target:function(player,target){
					return 0;
				},
			},
		},
		subSkill:{
			add:{
				forced:true,
				charlotte:true,
				onremove:function(player){
					player.draw();
				},
			}
		}
	},
	'yb078_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	//-----------小新
	// yb079_qingnian:'情念',
	// yb079_qingnian_info:'锁定技，每轮开始时，若场上没有你指定的“情念”角色，你需指定一名其他的未折棒的男性角色，标记为“情念”。当“情念”角色于摸牌时，若你有手牌，则你{可以}弃置一张手牌，令其本次摸牌数+2。当你于一回合内第二次询问此技能时，你将前文中的{可以}删掉，然后失去【浸染】，获得【吟咏】。',//当你不因此技能而获得牌时，若其有手牌，其需交给你一张手牌。
	// yb079_jinran:'浸染',
	// yb079_jinran_info:'其他角色弃牌阶段结束时，你可以获得一张本阶段其弃置的牌，然后若你手牌数不大于体力上限，你可再执行一次。当你再一次执行时，若场上有你指定的“情念”角色，且当前弃牌的角色{不为“情念”角色，不为折棒角色，不为女性角色}，则视为当前弃牌的角色对“情念”角色使用一张决斗，因此决斗受伤的角色可以选择折棒，防止此伤害。当“情念”角色折棒时，你取消对其的“情念”。',
	// yb079_yinyong:'吟咏',
	// yb079_yinyong_info:'每回合限一次，当你因弃置而失去一张手牌时，你可以视为使用之。此技能在“情念”角色的回合改为限两次。',
	yb079_qingnian:{
		audio:'ext:夜白神略/audio/character:2',
		derivation:'yb079_yinyong',
	},
	yb079_jinran:{
		audio:'ext:夜白神略/audio/character:2',
	},
	yb079_yinyong:{
		audio:'ext:夜白神略/audio/character:2',
	},
	//-----------SP小新
	yb079_xiuxin:{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		trigger:{
			global:['loseAfter','loseAsyncAfter'],
		},
		filter:function(event,player){
			if (event.type != "discard") {
				return false;
			}
			return event.cards.length;

		},
		cost(){
			'step 0'
			player.chooseCardButton(get.prompt2('yb079_xiuxin'),trigger.cards).set('ai',function(button){
				var player = player||_status.event.player;
				return get.value(button.link)+player.maxHp-5;
			})
			'step 1'
			if(result.bool){
				event.result = {
					bool:true,

					cost_data:{
						card:result.links[0],
					}
				};
			}
		},
		content:function(){
			'step 0'
			player.loseMaxHp();
			'step 1'
			player.addToExpansion(event.cost_data.card, 'gain2').gaintag.add('yb079_xiuxin');
			
			var evt = trigger.getl(player);
			event.cost_data.card.storage.source = trigger.player;
		},
		mark:true,
		marktext:'心',
		intro:{
			mark:function (dialog,storage,player){
				if(player.getExpansions('yb079_xiuxin')){
					dialog.addSmall([player.getExpansions('yb079_xiuxin'),'card']);
				}
				
			},
		}
	},
	yb079_newyinyong:{
		audio:'ext:夜白神略/audio/character:2',
		enable:'chooseToUse',
		filter(event,player){
			var evt=lib.filter.filterCard;
			if(event.filterCard) evt=event.filterCard;
			return player.getExpansions('yb079_xiuxin')?.length&&player.getExpansions('yb079_xiuxin').filter(card=>{
				if(player.storage.yb079_newyinyong_used&&player.storage.yb079_newyinyong_used.includes(card))return false;
				return evt({name:card.name},player,event)
			}).length;
		},
		hiddenCard:function (player,name){
			return player.getExpansions('yb079_xiuxin')?.length&&player.getExpansions('yb079_xiuxin').filter(card=>{
				if(player.storage.yb079_newyinyong_used&&player.storage.yb079_newyinyong_used.includes(card))return false;
				return card.name==name;
			}).length;
		},
		chooseButton:{
			dialog:function(event,player){
				var cards=player.getExpansions('yb079_xiuxin');
				return ui.create.dialog('吟咏',cards,'hidden');
			},
			filter:function (button,player){
				var card=button.link;
				if(player.storage.yb079_newyinyong_used&&player.storage.yb079_newyinyong_used.includes(card))return false;
				return _status.event.getParent().filterCard({name:card.name},player,_status.event.getParent());
			},
			backup:function(links,player){
				var skill=_status.event.buttoned;
				return {
					audio:'yb079_newyinyong',
					selectCard:1,
					position:'he',
					// discard:false,
					// lose:false,
					filterCard:function(){return true},
					viewAs:{
						name:links[0].name,
						nature:links[0].nature,
					},
					precontent(){
						event.result.card.storage.source=lib.skill.yb079_newyinyong_backup.card.storage.source;
						player.YB_tempz('yb079_newyinyong_used',lib.skill.yb079_newyinyong_backup.card)
					},
					card:links[0],
				}
			},
			prompt:function(links,player){
				return '吟咏：选择 '+get.translation(links[0])+'的目标';
			}
		},
		group:['yb079_newyinyong_useAfter'],
		subSkill:{
			useAfter:{
				trigger:{
					player:['useCardAfter'],
				},
				// forced:true,
				charlotte:true,
				// popup:false,
				filter:function (event,player){
					return event.skill=='yb079_newyinyong_backup';
				},
				cost(){
					event.result = player.chooseTarget(true,'选择一名角色令其摸一张牌<br>如果是'+get.translation(trigger.card.storage.source)+'改为摸两张。').forResult()
				},
				content:function (){
					var num = trigger.card.storage.source==event.targets[0]?2:1;
					event.targets[0].draw(num);
				},

			}
		}


	},
	//-----------凤
	yb080_huayu:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{player:'die'},
		forced:true,
		forceDie:true,
		skillAnimation:true,
		animationColor:'fire',
		filter:function(event){
			return true;
		},
		content:function(){
			'step 0'
			// var card=get.cardPile('ybsl_fengqiuhuang','field');
			event.card=(get.cardPile('ybsl_fengqiuhuang','field')||game.YB_createCard('ybsl_fengqiuhuang',null,null,null))
			player.chooseTarget(get.prompt2('yb080_huayu'),lib.filter.notMe).set('ai',function(target){
				return get.attitude(_status.event.player,target);
			});
			// ui.discardPile.appendChild(event.card);
			'step 1'
			var tar=result.targets[0];
			if(tar){
				tar.equip(event.card);
			}
			else{
				ui.discardPile.appendChild(event.card);
			}
		},
		derivation:'ybsl_fengqiuhuang',
		group:'yb080_huayu_3',
		locked:true,
		subSkill:{
			2:{
				audio:'yb080_huayu',
				name:'华羽',
				equipSkill:true,
				noHidden:true,
				inherit:'ybsl_fengqiuhuang',
				filter:function(event,player){
					if(!lib.skill.ybsl_fengqiuhuang.filter(event,player)) return false;
					if(player.storage.yb080_niepan) return false;
					if(!player.hasEmptySlot(5)) return false;
					return true;
				},
				ai:{
					effect:{
						player:function(card,player,target){
							 if(player==target&&get.subtype(card)=='equip5'){
								if(get.equipValue(card)<=8.5) return 0;
							}
							if(!target.hasEmptySlot(5)) return;
							return lib.skill.ybsl_fengqiuhuang.ai.effect.player.apply(this,arguments);
						}
					}
				}
			},
			3:{
				trigger:{
					global:"phaseBefore",
					player:"enterGame",
				},
				forced:true,
				locked:false,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0);
				},
				content:function(){
					event.card=game.YB_createCard('ybsl_fengqiuhuang',null,null,null);
					player.equip(event.card);
				},
			},
		}
	},
	yb080_niepan:{
		audio:'ext:夜白神略/audio/character:2',
		unique:true,
		enable:'chooseToUse',
		mark:true,
		skillAnimation:true,
		limited:true,
		animationColor:'orange',
		init:function(player){
			player.storage.yb080_niepan=false;
		},
		filter:function(event,player){
			if(player.storage.yb080_niepan) return false;
			if(event.type=='dying'){
				if(player!=event.dying) return false;
				return true;
			}
			return false;
		},
		content:function(){
			'step 0'
			player.awakenSkill('yb080_niepan');
			player.storage.yb080_niepan=true;
			'step 1'
			player.link(false);
			'step 2'
			player.turnOver(false);
			'step 3'
			if(player.hp<3){
				player.recover(3-player.hp);
			}
			'step 4'
			player.draw(3);
			'step 5'
			player.addSkill('yb080_fengming');
		},
		ai:{
			order:1,
			skillTagFilter:function(player,arg,target){
				if(player!=target||player.storage.yb080_niepan) return false;
			},
			save:true,
			result:{
				player:function(player){
					if(player.hp<=0) return 10;
					if(player.hp<=2&&player.countCards('he')<=1) return 10;
					return 0;
				}
			},
			threaten:function(player,target){
				if(!target.storage.yb080_niepan) return 0.6;
			}
		},
		derivation:'yb080_fengming',
		intro:{
			content:'limited'
		}
	},
	yb080_fengming:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			player:['phaseUseSkipped','phaseUseCancelled','phaseUseAfter'],
		},
		filter:function(event,player,name){
			if(name=='phaseUseAfter') return  player.getHistory('useCard').length<=0;
			return true;
		},
		direct:true,
		content:function(){
			'step 0'
			var list=['选项一','选项二','cancel2'];
			var str='选项一：本回合手牌上限+3；选项二：视为使用一张〖凤鸣九霄〗。';
			player.chooseControl(list).set('prompt',str).set('ai',function(control){
				var player=_status.event.player;
				if(game.countPlayer(function(current){
					return current!=player&&(ai.get.attitude(player,current)<0);
				})>0){
					return '选项二';
				}
				return '选项一';
			})
			'step 1'
			if(result.control=='选项一'){
				player.logSkill('yb080_fengming');
				player.addTempSkill('yb080_fengming_2');
				player.addMark('yb080_fengming_2');
			}
			else if(result.control=='选项二'){
				player.logSkill('yb080_fengming');
				player.chooseUseTarget({name:'ybsl_fengmingjiuxiao',isCard:false},true,false);
			}
		},
		derivation:'ybsl_fengmingjiuxiao',
		subSkill:{
			2:{
				onremove:true,
				mark:true,
				mod:{
					maxHandcard:function(player,num){
						var numb=(player.storage.yb080_fengming_2||0);
						var numa=(3*numb);
						return num+numa;
					}
				}
			}
		},
	},
	/*
	yb080_huayu:'华羽',
	yb080_huayu_info:'锁定技，①若你涅槃未发动且宝物栏为空且未被废除，则视为你装备着〖凤求凰〗②当你阵亡时，将一张〖凤求凰〗置入弃牌堆。',
	yb080_niepan:'涅槃',
	yb080_niepanv_info:'限定技，当你进入濒死状态时，你可以回复体力至3，然后摸三张牌，然后获得技能【凤鸣】。',
	yb080_fengming:'凤鸣',
	yb080_fengming_info:'出牌阶段结束后若你于本阶段未使用过牌，或出牌阶段被跳过，你可以选择一项①本回合手牌上限+3；②视为使用一张〖凤鸣九霄〗。',
	*/
	//------------陈丽陈思
	yb081_lvxin:{
		audio:'ext:夜白神略/audio/character:2',
	},
	yb081_shanhui:{
		audio:'ext:夜白神略/audio/character:2',
	},
	yb081_sishi:{
		audio:'ext:夜白神略/audio/character:2',
	},
	yb081_yinmeng:{
		audio:'ext:夜白神略/audio/character:2',
	},
	//------------小筑
	yb083_shenshou:{
		audio:'ext:夜白神略/audio/character:2',
	},
	'yb083_sanmeng':{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybsl_sanmeng',
	},
	//------------张汨
	yb047_xundu:{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		trigger:{global:'gainBegin'},
		filter:function(event,player){
			if(player.storage.yb047_xundu&&player.storage.yb047_xundu.includes(event.player))return false;
			return event.player!=player&&!(event.getParent().name=='draw'&&event.getParent(2).name=='phaseDraw');
		},
		init:function(player){
			player.storage.yb047_xundu=[];
		},
		check:function (event,player){
			if(get.attitude(player,event.player)>0) return false;
			return true;
		},
		// forced:true,
		// logTarget:'player',
		prompt:function(event,player){
			var target=event.player;
			return get.translation(target)+'即将获得'+event.cards.length+'张牌，是否发动'+"【寻妒】"
		},
		mark:true,
		intro:{
			content:function(storage,player){
				if(storage)return '已对'+get.translation(storage)+'发动过此技能'
			},
		},
		content:function(){
			'step 0'
			if(!player.storage.yb047_xundu)player.storage.yb047_xundu=[];
			player.storage.yb047_xundu.push(trigger.player);
			event.h=trigger.cards;//即将被获得的牌
			event.cards=player.getCards('h');//自己手牌
			player.showCards(event.h);
			player.$throw(event.h,1000);
			'step 1'
			player.showCards(event.cards);
			player.$throw(event.cards,1000);
			event.north=[];
			if(event.cards.length>0){
				for(var i of event.cards){
					var na=get.name(i);
					for(var t of event.h){
						var nb=get.name(t);
						if(na==nb){
							event.north.add(i);
						}
					}
				}
			}
			'step 2'
			if(event.north.length>0){
				player.chooseControl('是','cancel2').set('prompt','是否弃置【'+get.YB_tobo(event.north)+'】，并将选择权交给自己？');
			}
			'step 3'
			if(result.control=='是'){
				player.discard(event.north);
				var tar=player;
				var str='对';
				str+=get.translation(trigger.player);
				str+='造成1点伤害还是获得这些牌';
			}
			else{
				var tar=trigger.player;
				var str='受到';
				str+=get.translation(player);
				str+='造成的1点伤害还是改为其获得这些牌';
			}
			tar.chooseControl('伤害','交牌').set('prompt',str).set('ai',function(control){
				// var trigger = _status.event.getTrigger();
				if(_status.event.player==trigger.player){
					if(get.attitude(_status.event.player,player)>0){
						return '交牌';
					}
					else if(_status.event.player.hp>1){
						return '伤害';
					}
					else{return '交牌';}
				}
				else{
					if(get.attitude(_status.event.player,trigger.player)>0){
						return '交牌';
					}
					else if(trigger.player.hp<=2){
						return '伤害';
					}
					else{return '交牌';}
				}
			});
			'step 4'
			if(result.control=='交牌'){
				trigger.cancel();
				player.gain(event.h,'gain2');
			}
			else{
				trigger.player.damage(1,'nocard',player);
			}
		},
		ai:{
			threaten:3,//嘲讽值
			expose:1,//跳立场
		},
	},
	yb047_efei:{
		audio:'ext:夜白神略/audio/character:2',
		trigger: {
			global: ['useCard', 'damageEnd'],
		},
		usable: 1,
		filter: (event, player, name) => {
			if (name == 'useCard') return event.player != player;
			return event.player != player && event.player.isAlive() && event.card && lib.card[event.card.name];
		},
		direct:true,
		content:function(){
			'step 0'
			var str='是否弃置一张同名牌，令';
			str+=get.translation(trigger.card);
			if(event.triggername=='useCard'){str+='无效？';}
			else{str+='追加一次伤害？'}
			player.chooseCard('he',function(card){
				var trigger = _status.event.getTrigger();
				if(get.name(card)!=get.name(trigger.card)) return false;
				return true;
			}).set('ai',function(card){
				var trigger = _status.event.getTrigger();
				if(get.attitude(_status.event.player,trigger.player)>0) return false;
				return true;
			}).set('prompt',str);
			'step 1'
			if(result.bool){
				player.discard(result.cards);
				player.logSkill('yb047_efei');
			}
			else{
				player.storage.counttrigger.yb047_efei--;
				event.finish();
			}
			'step 2'
			if(event.triggername=='useCard'){trigger.cancel();}
			else{
				trigger.player.damage(trigger.num,trigger.card,trigger.source,trigger.nature);
			}
		},
		ai:{
			threaten:3,//嘲讽值
			expose:1,//跳立场
		},
	},
	yb047_pomen:{
		audio:'yb047_pomeng',
		trigger:{
			global:'loseAfter',
		},
		// direct:true,
		filter:(event,player)=>{
			if(event.type!='discard') return false;
			if(event.player==player) return false;
			return event.player.isAlive();
		},
		usable:1,
		async cost(event,trigger,player){
			event.result = await player.chooseCardButton('选择一张令其收回，视为其对自己造成1点由此牌造成的伤害',trigger.cards.filter(i=>get.position(i,true)=='d')).set('ai',function(card){
				var trigger = _status.event.getTrigger();
				if(get.attitude(_status.event.player,trigger.player)>0) return false;
				return 6 - get.value(card);
			}).forResult();
			event.result.cards = event.result.links;
		},
		async content(event,trigger,player){
			if(!player.storage.yb047_pomen_card)player.storage.yb047_pomen_card=[];
			player.storage.yb047_pomen_card.add(event.cards[0]);
			await trigger.player.gain(event.cards[0],'gain2');
			await trigger.player.damage(1,event.cards[0],trigger.player);
		},
		// content:function(){
		// 	'step 0'
		// 	player.chooseCardButton('选择一张令其收回，视为其对自己造成1点由此牌造成的伤害',trigger.cards.filter(i=>get.position(i,true)=='d')).set('ai',function(card){
		// 		if(get.attitude(_status.event.player,trigger.player)>0) return false;
		// 		return 6 - get.value(card);
		// 	});
		// 	'step 1'
		// 	if(result.bool&&result.links&&result.links.length){
		// 		player.storage.yb047_pomen_card.add(result.links[0]);
		// 		trigger.player.gain(result.links[0],'gain2');
		// 		trigger.player.damage(1,result.links[0],trigger.player);
		// 	}
		// 	else{
		// 		player.storage.counttrigger.yb047_pomen--;
		// 	}
		// },
		init:function(player){
			if(!player.storage.yb047_pomen_card)player.storage.yb047_pomen_card=[];
		},
		ai:{
			threaten:2,//嘲讽值
			expose:1,//跳立场
		},
		mark:true,
		intro:{
			mark:function(dialog,storage,player){
				dialog.addText('当以下牌致人死亡时，你获得之');
				dialog.addSmall([player.storage.yb047_pomen_card,'card']);
			},
		},
		group:'yb047_pomen_die',
		subSkill:{
			die:{
				trigger:{
					global:'die',
				},
				audio:'yb047_pomeng',
				filter:(event,player)=>{
					// game.log('event.card：',event.card)
					// game.log('event.getParent(0)：',event.getParent(0))
					// game.log('event.getParent(0).source：',event.getParent(0).source)
					// game.log('event.getParent(0).card：',event.getParent(0).card)
					// game.log('event.getParent(1)：',event.getParent(1))
					// game.log('event.getParent(2)：',event.getParent(2))
					// game.log('event.getParent(2).card：',event.getParent(2).card)//√√
					// game.log('event.getParent(3)：',event.getParent(3))
					// game.log('event.getParent(3).card：',event.getParent(3).card)
					// game.log('event.getParent(4)：',event.getParent(4))
					// game.log('event.getParent(5)：',event.getParent(5))
					// game.log('event.getParent(6)：',event.getParent(6))
					// game.log('event.getParent(7)：',event.getParent(7))
					// game.log('event.getParent(8)：',event.getParent(8))
					// game.log('event.getParent(9)：',event.getParent(9))
					if(!event.getParent(2).card) return false;
					if(player.storage.yb047_pomen_card.includes(event.getParent(2).card)) return true;
					return false;
				},
				direct:true,
				content:function(){
					player.logSkill('yb047_pomen');
					player.gain(trigger.getParent(2).card,'gain2');
				},
			}
		}
	},
	yb047_pomeng:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{
			global:'loseAfter',
		},
		// direct:true,
		filter:(event,player)=>{
			if(event.type!='discard') return false;
			if(event.player==player) return false;
			return event.player.isAlive();
		},
		async cost(event,trigger,player){
			event.result = await player.chooseCardButton('选择一张令其收回，视为其对自己造成1点由此牌造成的伤害',trigger.cards.filter(i=>get.position(i,true)=='d')).set('ai',function(card){
				var trigger = _status.event.getTrigger();
				if(get.attitude(_status.event.player,trigger.player)>0) return false;
				return 6 - get.value(card);
			}).forResult();
			event.result.cards = event.result.links;
		},
		async content(event,trigger,player){
			if(!player.storage.yb047_pomen_card)player.storage.yb047_pomen_card=[];
			player.storage.yb047_pomen_card.add(event.cards[0]);
			await trigger.player.gain(event.cards[0],'gain2');
			await trigger.player.damage(1,event.cards[0],trigger.player);
		},
		// content:function(){
		// 	'step 0'
		// 	player.chooseCardButton('选择一张令其收回，视为其对自己造成1点由此牌造成的伤害',trigger.cards.filter(i=>get.position(i,true)=='d')).set('ai',function(card){
		// 		if(get.attitude(_status.event.player,trigger.player)>0) return false;
		// 		return 6 - get.value(card);
		// 	});
		// 	'step 1'
		// 	if(result.bool&&result.links&&result.links.length){
		// 		player.storage.yb047_pomen_card.add(result.links[0]);
		// 		trigger.player.gain(result.links[0],'gain2');
		// 		trigger.player.damage(1,result.links[0],trigger.player);
		// 	}
		// },
		init:function(player){
			if(!player.storage.yb047_pomen_card)player.storage.yb047_pomen_card=[];
		},
		mark:true,
		intro:{
			mark:function(dialog,storage,player){
				dialog.addText('当以下牌致人死亡时，你获得之');
				dialog.addSmall([player.storage.yb047_pomen_card,'card']);
			},
		},
		group:'yb047_pomen_die',
		ai:{
			threaten:4,//嘲讽值
			expose:1,//跳立场
		},
	},
	//------------------独孤雨
	yb085_muyuan:{
		trigger: {
			player: ["useCardToTarget"],
		},
		audio:'ext:夜白神略/audio/character:2',
		check:function (event,player){
			return get.attitude(player,event.targets[0])<=0;
		},
		filter: function (event, player) {
			if(event.targets.length!=1)return false;
			if(get.type(event.card)=='equip')return false;
			return event.player==player&&player!=event.targets[0];
		},
		content: function () {
			'step 0'
			player.gainPlayerCard(trigger.targets[0], "he", true);
			'step 1'
			trigger.targets[0].draw();
			game.delay();
		},
	},
	yb085_cibie:{
		audio:'ext:夜白神略/audio/character:2',
		subSkill: {
			count: {
				trigger: {
					player: "recoverBegin",
				},
				forced: true,
				silent: true,
				popup: false,
				filter: function (event, player) {
					if (!event.source) return false;
					if (!player.isDying()) return false;
					return true;
				},
				content: function () {
					trigger.yb085_cibie = true;
				},
				sub: true,
			},
			cibie:{
				mark: true,
				intro: {
					content: "limited",
				},
				init: function (player) {
					player.storage.yb085_cibie_cibie = false;
				},
				skillAnimation:true,
				animationColor:'YB_snow',
				enable: "phaseUse",
				filter: function (event, player) {
					return player.hp>0&&!player.storage.yb085_cibie_cibie;
				},
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:async function(event, trigger, player) {
					let target = event.target;
					player.awakenSkill('yb085_cibie_cibie');
					let numb=player.hp;
					await player.loseHp(numb);
					var result = await target.chooseToDiscard('h',numb,(card, player) => {
						return lib.filter.cardDiscardable(card, player);
					}).set('ai',function(card){return -get.value(card)}).forResult();
					if(!result.bool)await target.damage(numb,player);
				},
				ai:{
					result:{
						player:function(player,target){
							return game.hasPlayer(function (current) {
								return get.attitude(player, current) > 4 && current.countCards("h", "tao");
							})
						},
						target:function(player,target){
							return -player.hp;
						}
					},
				},
				sub:true,
			}
		},
		group: ["yb085_cibie_count",'yb085_cibie_cibie'],
		trigger: {
			player: "recoverAfter",
		},
		// limited: true,
		filter: function (event, player) {
			if (player.isDying()) return false;
			return event.yb085_cibie == true;
		},
		direct: true,
		content: function () {
			"step 0";
			player.chooseBool("【辞别】：令其获得技能【慕愿】？").set("ai", function () {
				return get.attitude(player,trigger.source);
			});
			"step 1";
			if (result.bool) {
				player.logSkill("yb085_cibie", trigger.source);
				trigger.source.addSkill('yb085_muyuan');
			} else event.finish();
		},
	},
	// 'yb085_muyuan':'慕愿',
	// 'yb085_muyuan_info':'当你使用非装备牌指定唯一其他角色为目标后，你可获得其一张牌，然后其摸一张牌。',
	// 'yb085_cibie':'辞别',
	// 'yb085_cibie_info':'你可以让使你脱离濒死状态的角色获得技能【慕愿】。限定技，出牌阶段，你可以失去全部体力，并令一名其他角色选择：弃置等量手牌（牌数不够不可选），或受到等量伤害。',
	//--------------------龚洁------------------//
	// 'ybsl_086GJ':'龚洁',
	yb086_jieyin:{
		audio:'ext:夜白神略/audio/character:6',
		logAudio: () => 2,
		dutySkill:true,
		usable:1,
		enable:'phaseUse',
		filter(event,player){
			if(_status.yb086_jieyin){
				for(var i of _status.yb086_jieyin){
					if(i[0]==player||i[1]==player){
						return false;
					}
				}
			}
			return !player.choubanhunli;
		},
		filterTarget(card,player,target){
			if(_status.yb086_jieyin){
				for(var i of _status.yb086_jieyin){
					if(i[0]==target||i[1]==target){
						return false;
					}
				}
			}
			return !target.choubanhunli/*&&player.differentSexFrom(target);*/
		},
		derivation:'yb086_zuiyuan',
		selectTarget:1,
		async content(event,trigger,player){
			var target = event.target;
			var result = await target.chooseBool(get.translation(player)+'想你请求结姻，是否同意？').set('ai',function(){
				if(get.attitude(player,target)>5) return true;
				return false;
			}).forResult();
			if(result.bool){
				await target.logSkill('yb086_jieyin_ok',player);
				player.choubanhunli=target;
				target.choubanhunli=player;
				player.storage.hunlizijin=0;
				player.storage.choubanshijian=0;
				await player.markSkill('yb086_jieyin_ok');
				await player.markSkill('yb086_jieyin_hunlijishi');
				await target.addSkill('yb086_jieyin_choubanhunli')
				game.delayx();
			}
		},
		ai:{
			order:10,
			result:{
				player:function(player,target){
					return get.attitude(player,target)-5;
				},
				target:10,
			},
		},
		group:[
			/*'yb086_jieyin_choubanhunli',*/
			'yb086_jieyin_achieve','yb086_jieyin_fail',
			'yb086_jieyin_hunlijishi'
		],
		subSkill:{
			ok:{
				skillAnimation: true,
				animationColor: "YB_snow",
				mark:true,
				marktext:'婚',
				intro:{
					markcount:function(storage,player){
						return player.storage.hunlizijin;
					},
					content(storage,player){
						return '婚礼资金：'+player.storage.hunlizijin;
					},
				}
			},
			hunlijishi:{
				direct:true,
				trigger:{
					global:['roundStart'],
				},
				filter(event,player){
					return player.storage.choubanshijian&&player.storage.choubanshijian>=0;
				},
				content(){
					'step 0'
					player.storage.choubanshijian++;
					'step 1'
					trigger.trigger('yb086_jieyin_choubanshijian');
				},
				mark:true,
				marktext:'筹',
				intro:{
					markcount:function(storage,player){
						return player.storage.choubanshijian||0;
					}
				}
			},
			choubanhunli:{
				audio:"yb086_jieyin",
				logAudio(event, player) {
					return ["ext:夜白神略/audio/yb086_jieyin3.mp3","ext:夜白神略/audio/yb086_jieyin4.mp3"];
				},
				trigger:{
					global:['loseAfter'],
				},
				// usable:1,
				enable:'phaseUse',
				filter(event,player,name){
					if(name&&name=='loseAfter'){
						if(event.type!='discard'){return false;}
						return player.choubanhunli&&player.choubanhunli.isIn()&&(event.player==player||event.player==player.choubanhunli);
					}
					else {
						return true;
					}
				},
				selectCard:1,
				filterCard(){return true},
				position:'he',
				check(card){
					return get.value(card)<=6.5;
				},
				discard:false,
				cost(){
					event.result = trigger.player.chooseBool('是否出售这些牌？<br>'+get.translation(trigger.cards)).set('ai',function(){
						return true;
					}).forResult();
					
				},
				content(){
					var cards = event.triggername?trigger.cards:event.cards;
					if(trigger.cards)console.log('trigger.cards',trigger.cards);
					if(event.cards)console.log('event.cards',event.cards);
					var player2 = player.hasSkill('yb086_jieyin')?player:player.choubanhunli;
					if(player)console.log('player',player);
					if(player.choubanhunli)console.log('player.choubanhunli',player.choubanhunli);
					for(var i of cards){
						game.log(trigger.player,'出售了',i)
						player2.addToExpansion(i).gaintag.add('yb086_jieyin');
						player2.storage.hunlizijin+=get.cardNameLength(i);
						trigger.trigger('yb086_jieyin_choubanhunli')
					}
				},
			},
			achieve:{
				audio:"yb086_jieyin",
				logAudio(event, player) {
					return ["ext:夜白神略/audio/yb086_jieyin5.mp3"];
				},
				// skillAnimation: true,
				// animationColor: 'YB_dream',
				trigger:{
					player:'yb086_jieyin_choubanhunli',
				},
				filter(event,player){
					return player.storage.hunlizijin>=18;
				},
				forced:true,
				// async content(event,trigger,player){
				// 	if(!_status.yb086_jieyin)_status.yb086_jieyin=[]
				// 	_status

				// }
				content(){
					'step 0'
					player.$skill('婚礼筹办成功');
					event.target = player.choubanhunli;
					'step 1'
					player.awakenSkill('yb086_jieyin');
					delete player.choubanhunli;
					delete event.target.choubanhunli;
					delete player.storage.choubanshijian;
					player.unmarkSkill('yb086_jieyin_ok');
					player.unmarkSkill('yb086_jieyin_hunlijishi');
					event.target.removeSkill('yb086_jieyin_choubanhunli')
					'step 2'
					if(!_status.yb086_jieyin)_status.yb086_jieyin=[]
					_status.yb086_jieyin.push([player,event.target])
					player.markSkill('yb086_jieyin_banlv')
					event.target.markSkill('yb086_jieyin_banlv');
					'step 3'
					player.gainMaxHp()
					event.target.gainMaxHp();
					'step 4'
					player.addSkill('yb086_zuiyuan');
					event.target.addSkill('yb086_zuiyuan');
					'step 5'
					delete player.storage.hunlizijin;
					let cards=player.getExpansions('yb086_jieyin');
					player.lose(cards,ui.discardPile,'visible');
					game.log(player,'将',cards,'置入了弃牌堆');

				}
			},
			fail:{
				audio:"yb086_jieyin",
				logAudio(event, player) {
					return ["ext:夜白神略/audio/yb086_jieyin6.mp3"];
				},
				trigger:{
					player:['yb086_jieyin_choubanshijian'],
					global:['dieEnd'],
				},
				filter(event,player,name){
					if(name=='dieEnd'){
						return player.choubanhunli&&(event.player==player||event.player==player.choubanhunli);
					}
					else {
						return player.storage.choubanshijian&&player.storage.choubanshijian>3;
					}
				},
				forced:true,
				forceDie:true,
				async content(event,trigger,player){
					var target=player;
					let player2 = player.choubanhunli;
					await player.$skill('婚礼筹办失败');
					await player.awakenSkill('yb086_jieyin');
					delete player.choubanhunli;
					delete player2.choubanhunli;
					delete player.storage.hunlizijin;
					delete player.storage.choubanshijian;
					await player.unmarkSkill('yb086_jieyin_ok');
					await player.unmarkSkill('yb086_jieyin_hunlijishi');
					await player2.removeSkill('yb086_jieyin_choubanhunli')
					if(event.triggername=='dieEnd'){
						if(trigger.player==player){
							target=player.choubanhunli;
						}
						if(player.getExpansions('yb086_jieyin').length>0){
							var relu = await target.chooseBool('是否赎回出售的牌？').forResult();
							if(relu.bool){
								await target.gain(player.getExpansions('yb086_jieyin'),'gain2')
							}
						}
					}
					else{
						var list = ['赎回卡牌','重新择偶'];
						var relu = await target.chooseControl(list,true).set('ai',function(control){
							return '重新择偶';
						}).forResult()
						if(relu.control=='赎回卡牌'){
							if(player.getExpansions('yb086_jieyin').length>0){
								await target.gain(player.getExpansions('yb086_jieyin'),'gain2')
							}
						}
						else {
							if(player.getExpansions('yb086_jieyin').length>0){
								let cards=player.getExpansions('yb086_jieyin');
							}
							await player.restoreSkill('yb086_jieyin');
							if(cards){
								await player.lose(cards,ui.discardPile,'visible');
								game.log(player,'将',cards,'置入了弃牌堆');
							}
						}
					}
				},
			},
			banlv:{
				charlotte:true,
				mark:true,
				marktext:'婚',
				intro:{
					content(storage,player){
						if(_status.yb086_jieyin){
							for(var i of _status.yb086_jieyin){
								if(i[0]==player||i[1]==player){
									var target = i[0]==player?i[1]:i[0];
									return '你和'+get.translation(target)+'组成“结姻伴侣”。';
								}
							}
						}
						else return ;
					}
				},
			},
		},
	},
	yb086_zuiyuan:{
		audio:'ext:夜白神略/audio/character:2',
		enable:'phaseUse',
		usable:1,
		filter(event,player){
			if(player.getCards('he',function(card){
				return card.hasGaintag('yb086_zuiyuan');
			}).length>0){
				return false;
			}
			return player.countCards('he')>=2;
		},
		selectCard:2,
		filterCard(card,player){
			return player.getDiscardableCards(player,'he').includes(card)
		},
		position:'he',
		filterTarget(card,player,target){
			return player!=target;
		},
		selectTarget:1,
		async content(event,trigger,player){
			var target = event.target;
			async function jiaohe(player,target){
				await target.recover();
				var num = Math.min(target.hp,5);
				var draw = player.draw(num);
				draw.gaintag = ['yb086_zuiyuan'];
				await draw;
			}
			await jiaohe(player,target);
			if(_status.yb086_jieyin){
				for(var i of _status.yb086_jieyin){
					if(i[0]==player||i[1]==player){
						var target2 = i[0]==player?i[1]:i[0];
						if(target==target2){
							var result = await target.chooseToDiscard('he','弃置两张牌与'+get.translation(player)+'嬉戏？',2).set('ai',function(card){
								if(get.attitude(target,player))return 10-get.value(card);
							}).forResult();
							if(result.cards){
								await jiaohe(target,player);
							}
						}
					}
				}
			}
		},
		check(card){
			return 10-get.value(card);
		},
		ai:{
			order:1,
			result:{
				player:function(player,target){
					if(_status.yb086_jieyin){
						for(var i of _status.yb086_jieyin){
							if(i[0]==player||i[1]==player){
								var target = i[0]==player?i[1]:i[0];
								return get.attitude(player,target);
							}
						}
					}
				},
				target:5,
			},
		}
	},
	// yb086_jieyin:'结姻',
	// yb086_jieyin_info:`使命技，出牌阶段限一次，若你没有结姻角色，你邀请一名其他异性角色是否结姻。若其选择是，则开始筹办婚礼。筹办婚礼：对方出牌阶段，其可以出售一张手牌（移出游戏，并根据其字数获得资金）；你和对方因弃置而失去牌时，失去牌的人可以改为出售之。成功：筹办婚礼后三轮内，若资金达到18或更多，你和对方获得技能${get.poptip('yb086_zuiyuan')}。失败：筹办婚礼三轮后，若资金未达到18，则你选择：①移去所有资金，赎回出售的牌（获得因此移出游戏的牌）②重置此技能，移去所有资金，因此出售的牌进入弃牌堆。`,
	// yb086_zuiyuan:'醉缘',
	// yb086_zuiyuan_info:'出牌阶段限一次，你可以弃置两张牌，并指定一名其他角色进行交合（其回复一点体力，然后你摸其体力值数张牌，因此摸的牌存在手牌中时，无法发动〖醉缘〗），若目标拥有〖醉缘〗，其可以与你交合。',
	
	
	//-------------------田璐
	yb087_qiujiao:{
		audio:'ext:夜白神略/audio/character:2',
	},
	//-------------------
	//-------------------
	//-------------------
	//-------------------
	
	//--------------玉蝶心
	yb092_biyue:{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'yb001_wanyue',
	},
	yb092_xiuhua:{
		audio:'ext:夜白神略/audio/character:2',
		trigger: { player: "turnOverEnd" },
		filter(event, player) {
			return !player.isTurnedOver();
		},
		forced:true,
		logTarget : (event, player) => game.filterPlayer(current => current != player && current.inRange(player)).sortBySeat(),
		async content(event, trigger, player){
			for (var target of event.targets) {
				player.line(target, 'YB_snow')
				const card1 = (await target.chooseToDiscard('he', true, 'chooseonly').forResult()).cards[0]
				const pos1 = get.position(card1)
				await target.discard(card1)
				const card2 = (await target.chooseToDiscard('he', true, 'chooseonly')
					.set('ai', card => {
						const pos = get.event().pos
						if (get.position(card) != pos) return - get.value(card)
						return player.getCards(pos).reduce((a, b) => a - get.value(b), 0)
					})
					.set('pos', pos1).forResult()).cards[0]
				const pos2 = get.position(card2)
				await target.discard(card2)
				if (pos1 == pos2) {
					player.line(target,'YB_snow')
					await target.discard(target.getCards(pos1))
				}
			}
		},
	},
	yb092_chenyu:{
		mod : {
			aiValue(player, card, num) {
				if (_status.yb092_chenyu) return
				const evt = get.event()
				if (evt.yb092_chenyu) return num - 2 * evt.yb092_chenyu.includes(card)
				if (evt.name != 'chooseToDiscard') return
				const dnum = evt.selectCard[0],
					snum = get.YB_suit(Array.from(ui.discardPile.childNodes)).length
				if (snum > dnum) return
				_status.yb092_chenyu = true
				const hs = {}, discard = []
				player.getCards('h', cardx => (hs[get.suit(cardx)] ??= []).push(cardx))
				for (const i of Object.values(hs)) i.sort((a, b) => get.value(a) - get.value(b))
				while (discard.length < dnum) {
					let suit, value = Infinity
					for (const i in hs) {
						if (!hs[i][0]) continue
						let val = get.value(hs[i][0])
						if (get.YB_suit(discard).length < snum == discard.every(j => get.suit(j) != i)) val -= 2
						if (val < value) [suit, value] = [i, val]
					}
					discard.push(hs[suit].shift())
				}
				if (get.YB_suit(discard).length != snum) discard.length = 0
				evt.yb092_chenyu = discard
				delete _status.yb092_chenyu
				if (discard.includes(card)) return num - 2
			},
			get aiUseful() {
				return lib.skill.yb092_chenyu.mod.aiValue
			}
		},
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player: "loseAfter",
		},
		filter:function(event,player){
			if (event.type != "discard") return false;
			var cards = event.cards;
			var cards2 = Array.from(ui.discardPile.childNodes).remove(cards);
			return get.YB_suit(cards).length&&get.YB_suit(cards2).length&&get.YB_suit(cards).length==get.YB_suit(cards2).length;
		},
		content:function(){
			player.recover();
		},
	},
	yb092_luoyan:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		trigger:{
			player:'phaseUseEnd',
		},
		filter:function(event,player){
			var history=event.player.getHistory('useCard',function(evt){
				return evt.getParent('phaseUse')==event;
			});
			return history;
		},
		content:function(){
			'step 0'
			var history=trigger.player.getHistory('useCard',function(evt){
				return evt.getParent('phaseUse')==trigger;
			});
			if(history.length>game.countPlayer()) event.nature='YB_snow'
			else event.nature=null;
			event.num=history.length;
			event.count=1;
			event.target=player;
			'step 1'
			if(event.target.isIn()){
				player.line(event.target);
				event.target.damage(event.nature,player)
			}
			'step 2'
			if(event.count>event.num)event.finish();
			else event.count++;
			event.target=event.target.getNext();
			'step 3'
			if(event.target!=player)event.goto(1);
		}
	},
	// //-------------------玉蝶心
	// yb092_biyue:'闭月',
	// yb092_biyue_info:'结束阶段，你可以摸4-X张牌，X为你手牌中的花色数。',
	// yb092_xiuhua:'羞花',
	// yb092_xiuhua_info:'锁定技，当你武将牌翻至正面时，攻击范围包含你的角色需各自依次弃置两张牌，若均为同一区域的牌，则需弃置该区域其余的牌。',
	// yb092_chenyu:'沉鱼',
	// yb092_chenyu_info:'锁定技，当你弃置牌时，若此次弃置的花色数与弃牌堆除这些牌外的牌的花色数相等，你回复1点体力。',
	// yb092_luoyan:'落雁',
	// yb092_luoyan_info:'锁定技，出牌阶段结束时，你对从你开始的至下X家各造成1点伤害，X为你本阶段使用的牌数。若X大于场上角色数，则将伤害属性改为雪属性。',

	//------------------珂赛特
	yb100_lieshi:{
		audio:'ext:夜白神略/audio/character:2',
		chongzhiji:true,
		chongzhiList:[
			['·受到你造成的1点火焰伤害，然后废除一个随机装备栏',{
				content:function(player,target){
					'step 0'
					target.damage(1,'fire',player);
					'step 1'
					var list=[];
					for(var i=1;i<5;i++){
						if(target.hasEnabledSlot(i)) list.add(i);
					}
					var num=list.randomGet();
					target.disableEquip(num);
				},
				ai:function(player,target){
					var eff1=get.damageEffect(target,player,player,'fire');
					var eff2=get.damageEffect(target,player,target,'fire');
					return [eff2,-1,eff1,0];
				},
			}],
			['·受到你造成的2点火焰伤害',{
				content:function(player,target){
					'step 0'
					target.damage(2,'fire',player);
				},
				ai:function(player,target){
					var eff1=get.damageEffect(target,player,player,'fire');
					var eff2=get.damageEffect(target,player,target,'fire');
					return [eff2*2,0,eff1*2,0];
				},
			}],
			['·受到你造成的3点火焰伤害，然后摸三张牌',{
				content:function(player,target){
					'step 0'
					target.damage(3,'fire',player);
					'step 1'
					target.draw(3);
				},
				ai:function(player,target){
					var eff1=get.damageEffect(target,player,player,'fire');
					var eff2=get.damageEffect(target,player,target,'fire');
					return [eff2*3,1.5,eff1*3,0];
				},
			}],
		],
		init:function(player,skill){
			player.storage[skill+'_chongzhijiList']=lib.skill[skill].chongzhiList;
		},
		mark:true,
		marktext:'誓',
		intro:{ // 标记描述
			content:function(storage,player){
				var storage=get.YB_chongzhiList(player,'yb100_lieshi');//当前列表
				if(!storage) return '无';
				var list1=player.storage['yb100_lieshi'+'_chongzhijiList'];//刷新列表
				// var list1=get.YB_chongzhijiList(player,'yb100_lieshi');//刷新列表
				var str='<br>';
				for(var i=0;i<list1.length;i++){
					if(storage.includes(list1[i]))str+='<span class=yellowtext>'+list1[i][0]+'</span><br>';
					else str+='<span style="opacity:0.5;">'+list1[i][0]+'</span><br>';
				}
				for(var i=0;i<storage.length;i++){
					if(!list1.includes(storage[i]))str+='<span class=thundertext>'+storage[i][0]+'</span><br>';
				}
				return '当前列表如下：'+str;
			},
		},
		usable:1,
		enable:'phaseUse',
		selectTarget:1,
		filterTarget:lib.filter.notMe,
		filter:function(event,player){
			var storage=get.YB_chongzhiList(player,'yb100_lieshi');//当前列表
			if(!storage||storage.length==0) return false;
			return true;
		},
		subSkill:{
			block:{onremove:true,},
		},
		prompt:function(event,player){
			var player=player||_status.event.player;
			var storage=get.YB_chongzhiList(player,'yb100_lieshi');//当前列表
			if(!storage) return '无';
			var list1=player.storage['yb100_lieshi'+'_chongzhijiList'];//刷新列表
			// var list1=get.YB_chongzhijiList(player,'yb100_lieshi');//刷新列表
			var str='<br>';
			for(var i=0;i<list1.length;i++){
				if(storage.includes(list1[i]))str+='<span class=yellowtext>'+list1[i][0]+'</span><br>';
				else str+='<span style="opacity:0.5;">'+list1[i][0]+'</span><br>';
			}
			for(var i=0;i<storage.length;i++){
				if(!list1.includes(storage[i]))str+='<span class=thundertext>'+storage[i][0]+'</span><br>';
			}
			return '当前列表如下：'+str+lib.skill['yb100_lieshi'].prompt2;
		},
		prompt2:'出牌阶段限一次，你可以选择一名其他角色，你令你们之一先选择列表其中一项执行，然后另一方执行列表中其未选择的一项。',
		content:function(){
			'step 0'
			event.storage=get.YB_chongzhiList(player,'yb100_lieshi');//当前列表
			var list1=player.storage['yb100_lieshi'+'_chongzhijiList'];//刷新列表
			// var list1=get.YB_chongzhijiList(player,'yb100_lieshi');//刷新列表
			var str='<br>';
			for(var i=0;i<list1.length;i++){
				if(event.storage.includes(list1[i]))str+='<span class=yellowtext>'+list1[i][0]+'</span><br>';
				else str+='<span style="opacity:0.5;">'+list1[i][0]+'</span><br>';
			}
			for(var i=0;i<event.storage.length;i++){
				if(!list1.includes(event.storage[i]))str+='<span class=thundertext>'+event.storage[i][0]+'</span><br>';
			}
			player.chooseControl('你先选','对方先选').set('prompt','你先选还是对方先选？'+str).set('ai',function(control){
				if(event.storage.length>1)return '你先选';
				else return '对方先选';
				//简单粗暴一些，多个选项自己先选，一个选项对方别无可选
			});
			'step 1'
			event.YBlist=(result.index==0?[player,target]:[target,player]);
			event.count=0;
			'step 2'
			if(!event.YBlist[event.count]||!event.YBlist[event.count].isIn())event.finish();
			else {
				event.tar=event.YBlist[event.count];
				var list2=get.YB_chongzhiList(player,'yb100_lieshi');//当前列表
				event.list3=[];
				event.list4=[];
				for(var i=0;i<list2.length;i++){
					event.list3.push(list2[i][0]);
					event.list4.push(list2[i][1]);
				}
				if(event.list3.length==1){event._result={links:[event.list3[0]]}}
				else if(event.list3.length>1){
					event.tar.chooseButton([[event.list3,'tdnodes']]).set('ai',function(link){
						for(var i=0;i<event.list3.length;i++){
							if(event.list3[i]==link)var num2=i+1;
						}
						if(num2){
							var list66=event.list4[num2-1]['ai'](player,event.tar);//提取此项对目标的收益值
							var att=get.attitude(player,event.tar);
							var num3=list66[0]*att+list66[1];
							return num3;
						}
					});
				}
				else event.finish();
			}
			'step 3'
			if(result.links){
				for(var i=0;i<event.list3.length;i++){
					if(event.list3[i]==result.links[0])event.num1=i+1;
				}
				if(event.num1){
					get.YB_chongzhiList(player,'yb100_lieshi').remove(get.YB_chongzhiList(player,'yb100_lieshi')[event.num1-1]);//删去此项
					event.list4[event.num1-1]['content'](player,event.tar);//执行此项
				}
			}
			'step 4'
			event.count++;
			event.goto(2);
		},
		ai:{
			damage:true,
			fireAttack:true,
			order:8,
			result:{
				player:function(player,target){
					if(player.hp<=2) return -10;
					if(player.hp>=target.hp) return 0.9;
					return -2;
				},
				target:function(player,target){
					return get.damageEffect(target,player,player,'fire');
				}
			},
			//ai的考虑有些困难，等以后找人写。
			threaten:1.3,
		},
	},
	// yb100_lieshi:'烈誓',
	// yb100_lieshi_info:'重置技，刷新列表为：["受到你造成的1点火焰伤害，然后废除一个随机装备栏","受到你造成的2点火焰伤害","受到你造成的3点火焰伤害，然后摸三张牌"]。
	// 出牌阶段限一次，你可以选择一名其他角色，你令你们之一先选择列表其中一项执行，然后另一方执行列表中仍存的一项。',

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
	
	yb100_dianzhan:{
		audio:'ext:夜白神略/audio/character:2',
		chongzhiji:true,
		chongzhiList:[
			['·横置自身然后展示手牌并重铸一种花色所有手牌',{
				content:function(player,target){
					'step 0'
					target.link(true);
					var next=game.createEvent('YB_chooseToChongzhu',false);
					next.player=target;
					next.setContent('YB_chooseToChongzhu');
					return next;
				},
				ai:function(player,target){
					return [1,1,1,0];
				},
			}],
			['·调整手牌至四张',{
				content:function(player,target){
					target.YB_changeHandCard(4);
				},
				ai:function(player,target){
					var num=4-target.countCards('h');
					return [1,num,1,0];
				},
			}],
			['·展示手牌并弃置每种类型手牌各一张',{
				content:function(player,target){
					'step 0'
					var cards=target.getCards('h');
					var suits=get.YB_suit(cards,'type2');
					target.showCards(cards);
					target.chooseToDiscard('h',suits.length,true,function(card){
						var suit2=get.YB_suit(ui.selected.cards,'type2');
						return !suit2.includes(get.type(card));
					}).set('complexCard', true);
				},
				ai:function(player,target){
					var num=-Math.min(target.countCards('h')/2,3);
					return [1,num,1,0];
				},
			}],
		],
		init:function(player,skill){
			player.storage[skill+'_chongzhijiList']=lib.skill[skill].chongzhiList;
			player.storage[skill+'_mark']=[];
		},
		//去夜白神略启动代码里找get.YB_chongzhiList
		mark:true,
		marktext:'盏',
		intro:{ // 标记描述
			content:function(storage,player){
				var storage=get.YB_chongzhiList(player,'yb100_dianzhan');//当前列表
				if(!storage) return '无';
				// var list1=get.YB_chongzhijiList(player,'yb100_dianzhan');//刷新列表
				var list1=player.storage['yb100_dianzhan'+'_chongzhijiList'];
				var str='<br>';
				for(var i=0;i<list1.length;i++){
					if(storage.includes(list1[i]))str+='<span class=yellowtext>'+list1[i][0]+'</span><br>';
					else str+='<span style="opacity:0.5;">'+list1[i][0]+'</span><br>';
				}
				for(var i=0;i<storage.length;i++){
					if(!list1.includes(storage[i]))str+='<span class=thundertext>'+storage[i][0]+'</span><br>';
				}
				return '当前列表如下：'+str;
			},
		},
		prompt:function(event,player){
			var player=player||_status.event.player;
			var storage=get.YB_chongzhiList(player,'yb100_dianzhan');//当前列表
			if(!storage) return '无';
			// var list1=get.YB_chongzhijiList(player,'yb100_dianzhan');//刷新列表
			var list1=player.storage['yb100_dianzhan'+'_chongzhijiList'];
			var str='<br>';
			for(var i=0;i<list1.length;i++){
				if(storage.includes(list1[i]))str+='<span class=yellowtext>'+list1[i][0]+'</span><br>';
				else str+='<span style="opacity:0.5;">'+list1[i][0]+'</span><br>';
			}
			for(var i=0;i<storage.length;i++){
				if(!list1.includes(storage[i]))str+='<span class=thundertext>'+storage[i][0]+'</span><br>';
			}
			return '当前列表如下：'+str+lib.skill['yb100_dianzhan'].prompt2;
		},
		prompt2:'当你使用牌指定目标时，若此是你本回合首次指定其为目标，你横置自身并执行列表中的一项，然后令目标也执行此项。',
		subSkill:{
			mark:{
				onremove:function(player,skill){
					player.storage[skill]=[];
				},
			}
		},
		trigger:{player:'useCardToTarget'},
		filter:function(event,player){
			var storage=get.YB_chongzhiList(player,'yb100_dianzhan');//当前列表
			if(!storage||storage.length==0) return false;
			if(!player.storage.yb100_dianzhan_mark)return true;
			else if(player.storage.yb100_dianzhan_mark.includes(event.target))return false;
			return true;
		},
		forced:true,
		logTarget:'target',
		content:function(){
			'step 0'
			player.addTempSkill('yb100_dianzhan_mark');
			if(!player.storage.yb100_dianzhan_mark)player.storage.yb100_dianzhan_mark=[];
			player.storage.yb100_dianzhan_mark.push(trigger.target);
			event.tar=trigger.target;
			'step 1'
			player.link(true);
			var list2=get.YB_chongzhiList(player,'yb100_dianzhan');//当前列表
			event.list3=[];
			event.list4=[];
			for(var i=0;i<list2.length;i++){
				event.list3.push(list2[i][0]);
				event.list4.push(list2[i][1]);
			}
			if(event.list3.length==1){event._result={links:[event.list3[0]]}}
			else if(event.list3.length>1){
				player.chooseButton([lib.skill['yb100_dianzhan'].prompt2,[event.list3,'tdnodes']],true).set('ai',function(link){
					for(var i=0;i<event.list3.length;i++){
						if(event.list3[i]==link)var num2=i+1;
					}
					if(num2){
						var list66=event.list4[num2-1]['ai'](player,player);//提取此项对目标的收益值
						var list77=event.list4[num2-1]['ai'](player,event.tar);//提取此项对目标的收益值
						var att1=get.attitude(player,player);
						var att2=get.attitude(player,event.tar);
						var num3=list77[0]*att2+list77[1];
						var num4=list66[0]*att1+list66[1];
						return num4-num3;
					}
				});
			}
			else{event.finish();}
			'step 2'
			if(result.links){
				for(var i=0;i<event.list3.length;i++){
					if(event.list3[i]==result.links[0])event.num1=i+1;
				}
				if(event.num1){
					get.YB_chongzhiList(player,'yb100_dianzhan').remove(get.YB_chongzhiList(player,'yb100_dianzhan')[event.num1-1]);//删去此项
					event.sss=event.list4[event.num1-1]['content'];
				}
			}
			'step 3'
			event.sss(player,player);//执行此项
			'step 4'
			if(player!=trigger.target)event.sss(player,trigger.target);//执行此项
		},
	},
	// yb100_dianzhan:'点盏',
	// yb100_dianzhan_info:'重置技，锁定技，刷新列表为：["横置自身然后展示手牌并重铸一种花色所有手牌","调整手牌至4张","展示手牌并弃置每种类型手牌各一张"]。
	// 当你使用有目标的牌时，若此是你本回合首次指定其为目标，你横置自身并执行列表中的一项，然后若你不为目标，则令目标也执行此项。',
	yb100_huanyin:{
		audio:'ext:夜白神略/audio/character:2',
		trigger:{player:'dying',},
		forced:true,
		changeCards:function(player,link){//转移之后摸牌数
			var list1=get.YB_chongzhiList(player,'yb100_lieshi');//【烈誓】当前列表
			// var list2=get.YB_chongzhijiList(player,'yb100_lieshi');//【烈誓】刷新列表
			var list2=player.storage['yb100_lieshi'+'_chongzhijiList'];//刷新列表
			var list3=get.YB_chongzhiList(player,'yb100_dianzhan');//【点盏】当前列表
			// var list4=get.YB_chongzhijiList(player,'yb100_dianzhan');//【点盏】刷新列表
			var list4=player.storage['yb100_dianzhan'+'_chongzhijiList'];//刷新列表
			var lista=[],listb=[],listc=[],listd=[],liste=[],listf=[];
			var listj=[],listk=[];
			for(var i of list2){
				listb.add(i);
				if(list1.includes(i)){
					listj.add(i);
				}
			}
			for(var k of list4){
				listd.add(k);
				if(list3.includes(k)){
					listk.add(k);
				}
			}
			var num=1;
			num+=list2.length;
			num+=list4.length;
			num-=listj.length;
			num-=listk.length;
			if(!link)return num;
			else{
				if(listb.includes(link)){
					listb.remove(link);
					listd.add(link);
				}
				else {
					listd.remove(link);
					listb.add(link);
				}
				//  listb==list2 listd==list4
				for(var i of listb){
					if(list1.includes(i)){
						liste.add(i);
					}
				}
				for(var k of listd){
					if(list3.includes(k)){
						listf.add(k);
					}
				}
				var num2=1;
				num2+=listb.length;
				num2+=listd.length;
				num2-=liste.length;
				num2-=listf.length;
				return num2;
			}
		},
		content:function(){
			'step 0'
			var list1=get.YB_chongzhiList(player,'yb100_lieshi');//【烈誓】当前列表
			var list2=player.storage['yb100_lieshi'+'_chongzhijiList'];//刷新列表
			var list3=get.YB_chongzhiList(player,'yb100_dianzhan');//【点盏】当前列表
			var list4=player.storage['yb100_dianzhan'+'_chongzhijiList'];//刷新列表
			var listj=[],listk=[],listq=[];
			for(var i of list2){
				listq.add(i);
				if(list1.includes(i))listj.add(i[0]);//,lib.skill.yb100_huanyin.changeCards(player,i)
			}
			for(var k of list4){
				listq.add(k);
				if(list3.includes(k))listk.add(k[0]);//,lib.skill.yb100_huanyin.changeCards(player,k)
			}
			var dialog=ui.create.dialog('<font size=6><b>还阴</b></font>','forcebutton','hidden');
			dialog.add('请选择移至另一刷新列表的选项');
			if(listj.length){
				dialog.add('烈誓列表');
				dialog.add([listj,'textbutton']);
			}
			if(listk.length){
				dialog.add('点盏列表');
				dialog.add([listk,'textbutton']);
			}
			if(listj.length+listk.length>0){
				player.chooseButton(dialog,1,true);
			}
			event.list2=list2;
			event.list4=list4;
			'step 1'
			for(var m=0;m<event.list2.length;m++){
				if(event.list2[m][0]==result.links[0]){
					game.log('从【烈誓】调整了'+result.links[0]+'·至【点盏】')
					event.hhhhh=m;
				}
			}
			for(var n=0;n<event.list4.length;n++){
				if(event.list4[n][0]==result.links[0]){
					game.log('从【点盏】调整了'+result.links[0]+'·至【烈誓】')
					event.zzzzz=n;
				}
			}
			'step 2'
			if(event.hhhhh){
				player.storage['yb100_dianzhan'+'_chongzhijiList'].add(event.list2[event.hhhhh]);
				player.storage['yb100_lieshi'+'_chongzhijiList'].remove(event.list2[event.hhhhh]);
			}
			else if(event.zzzzz){
				player.storage['yb100_lieshi'+'_chongzhijiList'].add(event.list4[event.zzzzz]);
				player.storage['yb100_dianzhan'+'_chongzhijiList'].remove(event.list4[event.zzzzz]);
			}
			'step 3'
			var num666=lib.skill.yb100_huanyin.changeCards(player);
			game.log('当前已使用选项数为',num666-1)
			player.YB_changeHandCard(num666-1);
			'step 4'
			player.showCards(player.getCards('h'));
			if(player.countCards('h')==0||get.YB_suit(player.getCards('h')).length==player.getCards('h').length){
				if(player.hp<1){
					player.recover(1-player.hp);
				}
			}
		},
		// content:function*(event,map){
		// 	let player=map.player;
		// 	var list1=get.YB_chongzhiList(player,'yb100_lieshi');//【烈誓】当前列表
		// 	// var list2=get.YB_chongzhijiList(player,'yb100_lieshi');//【烈誓】刷新列表
		// 	var list2=player.storage['yb100_lieshi'+'_chongzhijiList'];//刷新列表
		// 	var list3=get.YB_chongzhiList(player,'yb100_dianzhan');//【点盏】当前列表
		// 	// var list4=get.YB_chongzhijiList(player,'yb100_dianzhan');//【点盏】刷新列表
		// 	var list4=player.storage['yb100_dianzhan'+'_chongzhijiList'];//刷新列表
		// 	var listj=[],listk=[],listq=[];
		// 	for(var i of list2){
		// 		listq.add(i);
		// 		if(list1.includes(i))listj.add(i[0]);//,lib.skill.yb100_huanyin.changeCards(player,i)
		// 	}
		// 	for(var k of list4){
		// 		listq.add(k);
		// 		if(list3.includes(k))listk.add(k[0]);//,lib.skill.yb100_huanyin.changeCards(player,k)
		// 	}
		// 	var dialog=ui.create.dialog('<font size=6><b>还阴</b></font>','forcebutton','hidden');
		// 	dialog.add('请选择移至另一刷新列表的选项');
		// 	// dialog.add(function(){//失败，被人看见还可能被笑
		// 	// 	if(ui.selected.buttons)return '摸牌数：'+(lib.skill.yb100_huanyin.changeCards(player,ui.selected.buttons[0])-1);
		// 	// 	return '摸牌数：想看的话就关闭自动确认再看'
		// 	// });
		// 	if(listj.length){
		// 		dialog.add('烈誓列表');
		// 		dialog.add([listj,'textbutton']);
		// 	}
		// 	if(listk.length){
		// 		dialog.add('点盏列表');
		// 		dialog.add([listk,'textbutton']);
		// 	}
		// 	if(listj.length+listk.length>0){
		// 		var result=yield player.chooseButton(dialog,[1,1],true);
		// 		for(var m=0;m<list2.length;m++){
		// 			if(list2[m][0]==result.links[0]){
		// 				yield player.storage['yb100_dianzhan'+'_chongzhijiList'].add(list2[m]);
		// 				player.storage['yb100_lieshi'+'_chongzhijiList'].remove(list2[m]);
		// 				// yield get.YB_chongzhijiList(player,'yb100_lieshi').remove(list2[m]);
		// 				// yield get.YB_chongzhijiList(player,'yb100_dianzhan').add(list2[m]);
		// 				var num666=lib.skill.yb100_huanyin.changeCards(player);
		// 				game.log('调整了'+result.links[0]+'，当前已使用选项数为',num666-1)
		// 				yield player.YB_changeHandCard(num666-1);
		// 				yield player.showCards(player.getCards('h'));
		// 				if(get.YB_suit(player.getCards('h')).length==player.getCards('h').length){
		// 					if(player.hp<1){
		// 						yield player.recover(1-player.hp);
		// 					}
		// 				}
		// 				event.finish();
		// 			}
		// 		}
		// 		for(var n=0;n<list4.length;n++){
		// 			if(list4[n][0]==result.links[0]){
		// 				yield player.storage['yb100_lieshi'+'_chongzhijiList'].add(list2[n]);
		// 				player.storage['yb100_dianzhan'+'_chongzhijiList'].remove(list2[n]);
		// 				var num666=lib.skill.yb100_huanyin.changeCards(player);
		// 				game.log('调整了'+result.links[0]+'，当前已使用选项数为',num666-1)
		// 				yield player.YB_changeHandCard(num666-1);
		// 				yield player.showCards(player.getCards('h'));
		// 				if(get.YB_suit(player.getCards('h')).length==player.getCards('h').length){
		// 					if(player.hp<1){
		// 						yield player.recover(1-player.hp);
		// 					}
		// 				}
		// 				event.finish();
		// 			}
		// 		}
		// 	}
		// 	var num666=lib.skill.yb100_huanyin.changeCards(player);
		// 	game.log('当前已使用选项数为',num666-1)
		// 	yield player.showCards(player.getCards('h'));
		// 	yield player.YB_changeHandCard(num666-1);
		// 	if(get.YB_suit(player.getCards('h')).length==player.getCards('h').length){
		// 		if(player.hp<1){
		// 			yield player.recover(1-player.hp);
		// 		}
		// 	}
		// 	event.finish();
		// },
	},
	// yb100_huanyin:'还阴',
	// yb100_huanyin_info:'锁定技，当你进入濒死状态时，
	// 你将技能二列表未执行且刷新列表存在的一项中移至技能一刷新列表，或将技能一列表未执行且刷新列表存在的一项中移至技能二刷新列表，
	// 然后将手牌调整至与已发动选项数相同，然后你展示手牌，若花色各不相同，你回复体力至1。（已发动选项数，即刷新列表存在，但现存列表没有的选项）',
	
	ybsl_rumeng:{
		// audio:'ybsl_sanmeng',
		mainSkill:true,
		available:function (mode){
			if(['guozhan'].includes(mode)) return true;
			return false;
		},
		trigger:{player:['showCharacterAfter']},
		// direct:true,
		// nopop:true,
		forced:true,
		content:function(){
			if(player.checkMainSkill('ybsl_rumeng')){
				// player.logSkill('ybsl_rumeng');
				player.changeGroup('YB_dream',false);
			}
		},
	},
	yb014_fufeng:{
		audio:'ext:夜白神略/audio/character:2',//再靠近一点吧，让我听听你的呼吸
	},
	yb014_yongyue:{
		audio:'ext:夜白神略/audio/character:2',//世间悲欢离合，但无两全策
	},
	yb014_sanmeng:{
		audio:'ext:夜白神略/audio/character:2',//浮生如梦，你我皆是过客
	},
	// ybsl_zhuyizhuyi:{

	// },
	//忆包武将
	yb014_gugu: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'phaseUseAfter'
		},
		filter: function(event, player) {
			var num = 0;
			var evt = _status.event.getParent("phaseUse");
			player.getHistory("useCard", function(evtx) {
				if (evtx.getParent("phaseUse") == evt) {
					num++;
				}
			});
			return num <= player.hp;
		},
		content: async function(event, trigger, player) {
			var list = [];
			var evt = _status.event.getParent("phaseUse");
			player.getHistory("useCard", function(evtx) {
				if (evtx.getParent("phaseUse") == evt) {
					list.push(evtx);
				}
			});
			for (var i of list) {
				if (player.hasUseTarget(i)) {
					await player.chooseUseTarget({
							name: i.name,
							nature: i.nature,
							isCard: false,
						},
						cards,
						"是否使用【" + i.nature ? get.translation(i.nature) : "" + get.translation(i.name) + "】。",
						false //若有false，此牌不计入次数。
					)
				}
			}
		},
	},
	yb014_minsheng: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			source: 'damageBegin2'
		},
		filter: function(event, player) {
			return event.player && event.player.hp && player && player.hp && event.player.hp == player.hp;
		},
		content: async function(event, trigger, player) {
			let num = Math.min(trigger.num, 5);
			trigger.cancel();
			await player.draw(num);
		},
	},
	yb014_reminsheng: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			source: 'damageBegin2'
		},
		filter: function(event, player) {
			return event.player && event.player.hp && player && player.hp && event.player.hp == player.hp;
		},
		content: async function(event, trigger, player) {
			let num = Math.min(trigger.num, 5);
			trigger.cancel();
			await player.loseHp()
			await player.draw(num * 2);
		},
	},
	// ybsl_107tushanshuili:'涂山水璃',
	yb107_xunhu: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			global: 'phaseBefore',
			player: 'enterGame',
		},
		forced: true,
		locked: false,
		filter: function(event, player) {
			return (event.name != 'phase' || game.phaseNumber == 0) && !player.storage.yb107_xunhu;
		},
		// init:function(player){
		// player.storage.yb107_xunhu
		// },
		content: function() {
			var card = game.YB_createCard('ybsl_107xiaohu0', null, null);
			player.storage.yb107_xunhu = card;
			ui.cardPile.insertBefore(card, ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length)]);
			game.broadcastAll(function() {
				lib.inpile.add('ybsl_107xiaohu0')
			});
			game.updateRoundNumber();
		},
		// group:['yb107_xunhu_gain'],
		// subSkill:{
		// gain:{
		// sub:true,
		// }
		// },
	},
	// yb107_xunhu:'寻狐',
	// yb107_xunhu_info:'游戏开始时（选将后，发牌前），在牌堆中插入一张【小狐】。当以此法添加的【小狐】进入你的手牌区时，改为移出游戏，然后获得【小狐】的技能。',
	yb107_taye: {
		audio: 'ext:夜白神略/audio/character:2',
		trigger: {
			player: 'useCardAfter',
		},
		// init(player){
		// player.storage.yb107_taye=1;
		// },
		mark: true,
		intro: {
			content: '$',
		},
		// direct:true,
		filter: (event, player) => {
			var cards = Array.from(ui.discardPile.childNodes);
			if (cards.length == 0) return false;
			return (get.YB_type2(cards).includes(get.type2(event.card)))
		},
		content: async function(event, trigger, player) {
			let cards = Array.from(ui.discardPile.childNodes);
			// if(!get.YB_type2(cards).includes(get.type2(trigger.card)))event.finish();
			{
				let typeyb = get.type2(trigger.card)
				var list = cards.filter(card => get.type2(card) == typeyb);
				if (!player.storage.yb107_taye) player.storage.yb107_taye = 1;
				let num = player.storage.yb107_taye;
				// delete player.storage.yb107_taye;
				player.storage.yb107_taye = 1;
				var result = await player.chooseCardButton('请选择弃牌堆中至多[' + num + ']张' + get.translation(get.type2(trigger.card)) + '牌，置于牌堆底，先选的靠上，最后选的垫底。', [1, num]).set('ai', function() {
					return true
				}).forResult();
				if (result.bool) {
					let cards1 = result.links;
					var numb = cards.length;
					for (i = 0; i < cards1.length; i++) {
						ui.cardPile.appendChild(cards1[i]);
					}
					var cards2 = get.cards(numb);
					await game.cardsGotoOrdering(cards2);
					var cards3 = [],
						cards4 = [];
					for (var k of cards2) {
						if (get.type2(k) == typeyb) cards3.push(k);
						else cards4.push(k);
					}
					if (cards4.length) game.cardsDiscard(cards4);
					if (cards3.length) {
						// var ybmap={};
						var next = game.createEvent('yb107_taye');
						next.player = player;
						next.cards3 = cards3;
						next.setContent(function() {
							'step 0'
							event.ybmap = {};
							'step 1'
							player.chooseCardButton(event.cards3, [1, Infinity], '踏野：请选择任意张牌，然后选择一名角色，若仍有未分配的牌，则继续选择。').set('ai', function(button) {
								return get.value(button.link);
							});
							'step 2'
							if (result.cards) {
								event.cards6 = result.cards;
								player.chooseTarget(true, '踏野：请选择任意张牌，然后选择一名角色，若仍有未分配的牌，则继续选择。').set('ai', function(target) {
									return get.attitude(_status.event.player, target);
								})
							} else event.goto(5);
							'step 3'
							if (result.targets) {
								var tar = result.targets;
								if (!event.ybmap[tar]) event.ybmap[tar] = [];
								event.ybmap[tar].push(event.cards6);
								event.cards3.remove(event.cards6);
								event.tayeok = true;
							}
							'step 4'
							if (event.cards3.length) event.goto(1);
							'step 5'
							if (event.tayeok) {
								var list = [];
								for (var z in event.ybmap) {
									list.push([z, event.ybmap[z]]);
								}
								//牢狂保佑，牢火保佑，牢鬼保佑，牢鸽保佑
								//希望代码能跑
								game
									.loseAsync({
										gain_list: list,
										player: player,
										cards: list.slice().map(list => list[1]),
										giver: player,
										animate: "giveAuto",
									})
									.setContent("gaincardMultiple");
							} else event.finish();
						});
						var cartar = await next.forResult();
					}
				}
				// var list = get.YB_suit(ui.discardPile,'type2')
			}
		},
		group: 'yb107_taye_buff',
		subSkill: {
			buff: {
				direct: true,
				audio: 'yb107_taye',
				trigger: {
					global: ["loseAfter", "cardsDiscardAfter", "loseAsyncAfter"]
				},
				filter(event, player) {
					if (event.name.indexOf("lose") == 0) {
						if (event.getlx === false || event.position != ui.discardPile) return false;
					} else {
						var evt = event.getParent();
						if (evt.relatedEvent && evt.relatedEvent.name == "useCard") return false;
					}
					return true;
					// for (var i of event.cards) {
					// var owner = false;
					// if (event.hs && event.hs.includes(i)) owner = event.player;
					// var type = get.type(i, null, owner);
					// if (type == "basic" || type == "trick") return true;
					// }
					// return false;
				},
				content() {
					if (!player.storage.yb107_taye) player.storage.yb107_taye = 1;
					if (player.storage.yb107_taye < 5) {
						player.storage.yb107_taye++;
						player.logSkill('yb107_taye_buff');
					}
				},
			}
		},
	},
	// yb107_taye:'踏野',
	// yb107_taye_info:'当你使用一张牌后，你可以从弃牌堆中选择至多[1]张与此牌类型相同的其他牌，将这些牌置于牌堆底，然后展示牌堆顶等量张牌。然后将与触发技能的牌类型不同的置入弃牌堆，其余牌由你依次分配给场上角色。<br>当有牌不因使用而进入弃牌堆时，你令下次发动此技能时，方括号内的数字+1，至多加至5。',
	yb107_yaoyi: {
		audio: 'ext:夜白神略/audio/character:2',
		enable: 'chooseToUse',
		hiddenCard: function(player, name) {
			var type = get.type(name);
			return type == 'basic';
		},

		filter: function(event, player) {
			if (!player.countCards('e') && !player.countCards('j') && !player.getCards('h', {
					name: 'ybsl_107xiaohu'
				}).length) return false;
			var evt = lib.filter.filterCard;
			if (event.filterCard) evt = event.filterCard;
			for (var i of lib.inpile) {
				var type = get.type(i);
				if (type == 'basic' && evt({
						name: i
					}, player, event)) return true;
			};
			return false;
		},
		/*
		chooseButton: {
			dialog: function (event, player) {
				var dialog = ui.create.dialog("妖异", "hidden");
				const equips = [];
				var hss=player.getCards('h',{name:'ybsl_107xiaohu0'});
				// if(hss.length)equips.push(hss);
				if(player.countCards('e'))equips.push(player.getCards('e'));
				if(player.countCards('j'))equips.push(player.getCards('j'));
				// for (let i = 1; i < 6; i++) {
					// if (!player.hasEnabledSlot(i)) continue;
					// equips.push([i, get.translation("equip" + i)]);
				// }
				if (equips.length > 0) dialog.add([equips]);
				var type = 'baisc';
				var list = [];
				for (var name of lib.inpile) {
					if (get.type(name) != type) continue;
					if (event.filterCard({ name: name, isCard: true }, player, event)) {
						list.push([type, "", name]);
						if (name == "sha") {
							for (var j of lib.inpile_nature) list.push(["基本", "", "sha", j]);
						}
					}
				}
				dialog.add([list, "vcard"]);
				return dialog;
			},
			filter: function (button) {
				if (ui.selected.buttons.length && typeof button.link == typeof ui.selected.buttons[0].link) return false;
				return true;
			},
			select: 2,
			check: function (button) {
				var player = _status.event.player;
				if (typeof button.link == "vcard") {
					var card = { name: name, nature: button.link[3], isCard: true };
					return player.getUseValue(card);
				}
			},
			backup: function (links, player) {
				if (typeof links[1] == "card") links.reverse();
				var equip = links[0];
				var name = links[1][2];
				var nature = links[1][3];
				return {
					filterCard: function () {
						return false;
					},
					selectCard: -1,
					card:equip,
					viewAs: {
						name: name,
						nature: nature,
						isCard: true,
					},
					popname: true,
					// precontent: function () {
						// var card6=lib.skill.yb107_yaoyi_backup.card;
						// if(get.name(card6).slice(-1)=='ybsl_107xiaohu'){
							// ui.cardPile.insertBefore(card6,ui.cardPile.childNodes[get.rand(0,ui.cardPile.childNodes.length)]);
						// }
					// },
				};
			},
			
		},
		*/
		chooseButton: {
			dialog: function(event, player) {
				// return ui.create.dialog("排异", player.getExpansions("quanji"), "hidden");

				var type = 'basic';
				var list = [];
				for (var name of lib.inpile) {
					if (get.type(name) == type) {
						list.push([type, "", name]);
						if (name == "sha") {
							for (var j of get.YB_natureList()){
								j=get.YB_nature(j);
								list.push([type,'',name,j]);
								// list.push(["基本", "", "sha", j]);
							} 
						}
					}

				}
				var dialog = ui.create.dialog("妖异", [list, "vcard"], 'hidden');
				// dialog.add([list, "vcard"]);
				return dialog;
			},
			filter: function(button, player) {
				return _status.event.getParent().filterCard({
					name: button.link[2]
				}, player, _status.event.getParent());
			},
			backup: function(links, player) {
				return {
					audio: "yb107_yaoyi",
					selectCard: -1,
					card: links[0],
					delay: false,
					// content: lib.skill.yb107_yaoyi.contentx,
					content: function() {
						'step 0'
						var card = lib.skill.yb107_yaoyi_backup.card;
						event.card = card;
						'step 1'

						const equips = [];
						var hss = player.getCards('h', {
							name: 'ybsl_107xiaohu0'
						});
						if (hss.length) equips.push(hss);
						if (player.countCards('e')) equips.push(player.getCards('e'));
						if (player.countCards('j')) equips.push(player.getCards('j'));
						// for (let i = 1; i < 6; i++) {
						// if (!player.hasEnabledSlot(i)) continue;
						// equips.push([i, get.translation("equip" + i)]);
						// }
						player.chooseButton(['妖异：选择要转化的牌', equips]);
						'step 2'
						var evt = event.getParent(2);
						if (result.bool && result.links && result.links.length) {
							var name = event.card.name;
							game.broadcastAll(function(result, name) {
								lib.skill.yb107_yaoyi_bbb.viewAs = {
									name: name,
									cards: [result],
									isCard: true
								};
								lib.skill.yb107_yaoyi_bbb.prompt = '选择' + get.translation(result) + '的目标';
							}, result.links[0], name);
							evt.set('_backupevent', 'yb107_yaoyi_bbb');
							evt.backup('yb107_yaoyi_bbb');
						}
					},

				};
			},
		},
		// contentx: function () {


		// },
		group: 'yb107_yaoyi_buff',
		subSkill: {
			bbb: {
				sourceSkill: 'yb107_yaoyi',
				precontent: function() {
					delete event.result.skill;
					var name = event.result.card.name;
					event.result.cards = event.result.card.cards;
					event.result.card = get.autoViewAs(event.result.cards[0]);
					event.result.card.name = name;
				},
				filterCard: function() {
					return false
				},
				selectCard: -1,
			},
			buff: {
				trigger: {
					player: 'useCardAfter'
				},
				filter: function(event) {
					var evt = event;
					// return evt.skill=='yb012_bianqian_taoluan_backup'&&!event.cards.length;
					return evt.skill == 'yb107_yaoyi_backup' && get.name(lib.skill.yb107_yaoyi_backup.card).slice(-1) == 'ybsl_107xiaohu';
				},
				content: function() {
					var card6 = trigger.cards[0];
					ui.cardPile.insertBefore(card6, ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length)]);
				}
			}
		}
	},
	// yb107_yaoyi:'妖异',
	// yb107_yaoyi_info:'你可以将【小狐】或装备区一张牌或判定区一张牌当做一张基本牌使用或打出。然后若以此法使用或打出的牌为【小狐】，则在结算完成后插入牌堆随机位置。',
	// ybsl_107xiaohu:'小狐',
	// ybsl_107xiaohu_info:'（此牌可置入任意装备格。进入武器区时，范围为2；进入坐骑区时，攻击距离-1或防御距离+1。）<br>锁定技，当你受到伤害后，你展示手牌（没有则跳过），然后摸五张牌。锁定技，你手牌中每有一种花色，你以任意途径的摸牌数-1。',
	QQQ107_taye: {
		audio: 'yb107_taye',
		trigger: {
			player: 'useCardAfter',
		},
		forced: true,
		mark: true,
		intro: {
			content: '$',
		},
		init: (player) => player.storage.QQQ107_taye = 1,
		//当你使用一张牌后，你可以从弃牌堆中选择至多[1]张与此牌类型相同的其他牌，将这些牌置于牌堆底，然后展示牌堆顶等量张牌。
		//然后将与触发技能的牌类型不同的置入弃牌堆，其余牌由你依次分配给场上角色。<br>当有牌不因使用而进入弃牌堆时，你令下次发动此技能时，方括号内的数字+1，至多加至5
		filter: (event, player) => Array.from(ui.discardPile.childNodes).some((q) => get.type(q) == get.type(event.card)),
		async content(event, trigger, player) { //QQQ
			var num = player.storage.QQQ107_taye;
			const {
				result
			} = await player.chooseButton(['从弃牌堆中选择至多' + num + '张与此牌类型相同的其他牌',
					Array.from(ui.discardPile.childNodes).filter((q) => get.type(q) == get.type(trigger.card))
				], [1, num])
				.set('ai', (button) => get.buttonValue(button));
			if (result.links && result.links[0]) {
				player.storage.QQQ107_taye = 1;
				for (var i of result.links) {
					ui.cardPile.appendChild(i);
					game.log('将' + get.translation(i) + '由弃牌堆置入牌堆');
				}
				var card = get.cards(result.links.length);
				var card1 = [];
				game.cardsGotoOrdering(card);
				player.showCards(card);
				for (var i of card) {
					if (get.type(i) != get.type(trigger.card)) {
						ui.cardPile.appendChild(i);
						game.log('将' + get.translation(i) + '由处理区置入弃牌堆');
						player.storage.QQQ107_taye++;
					} else card1.push(i);
				}
				while (card1.length) {
					const {
						result: result1
					} = await player.chooseButton(['依次分配给场上角色', card1], [1, card1.length]);
					if (result1.links && result1.links[0]) {
						const {
							result: result2
						} = await player.chooseTarget('依次分配给场上角色')
							.set('ai', (t) => get.attitude(t, player));
						if (result2.targets && result2.targets[0]) {
							result2.targets[0].gain(result1.links, 'gain2');
							card1 = card1.filter((q) => !result1.links.includes(q));
						}
					}
				}
			}
		},
		group: 'QQQ107_taye_buff',
		subSkill: {
			buff: {
				forced: true,
				audio: 'QQQ107_taye',
				trigger: {
					global: ["loseAfter", "cardsDiscardAfter", "loseAsyncAfter"]
				},
				filter(event, player) {
					if (event.name.indexOf("lose") == 0) {
						if (event.getlx === false || event.position != ui.discardPile) return false;
					} else {
						var evt = event.getParent();
						if (evt.relatedEvent && evt.relatedEvent.name == "useCard") return false;
					}
					return true;
				},
				content() {
					if (player.storage.QQQ107_taye < 5) {
						player.storage.QQQ107_taye++;
					}
				},
			}
		},
	},
	/*
	QQQ107_yaoyi: {
		audio: 'yb107_yaoyi',
		enable: ["chooseToUse", "chooseToRespond"],
		filter: function (event, player) {
			for (var i in lib.card) {
				if (lib.card[i].type == 'basic' && event.filterCard({ name: i }, player, event)
					&& (player.countCards('ejsx') || player.hasCard('h', { name: 'ybsl_107xiaohu' }))) return true;
			}
			return false;
		},
		hiddenCard: (player, name) => lib.card[name].type == 'basic',
		//你可以将【小狐】或非手牌区一张牌当做一张基本牌使用或打出。然后若以此法使用或打出的牌为【小狐】，则在结算完成后插入牌堆随机位置。',
		chooseButton: {
			dialog: function (event, player) {
				var list = [];
				for (var i in lib.card) {
					if (lib.card[i].type == 'basic' && event.filterCard({ name: i }, player, event)) {
						list.push(['basic', "", i]);
						if (i == "sha") {
							for (var j of Array.from(lib.nature.keys())) {
								list.push(["基本", "", "sha", j]);
							}
						}
					}
				}
				var dialog = ui.create.dialog("妖异", [list, "vcard"], 'hidden');
				return dialog;
			},
			backup: function (links, player) {
				return {
					audio: "yb107_yaoyi",
					selectCard: 1,
					position: 'hesxj',
					filterCard: (card) => get.position(card) != 'h' || card.name == 'ybsl_107xiaohu',
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
						suit: 'none',
						number: null,
						isCard: true,
					},
					async precontent(event, trigger, player) {
						if (event.result.cards && event.result.cards[0] && event.result.cards[0].name == 'ybsl_107xiaohu') {
							ui.cardPile.insertBefore(event.cards[0], ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)])
						}
					},
	
				};
			},
			check: function (button, player) {
				var card = { name: button.link[2], nature: button.link[3] };
				switch (button.link[2]) {
					case 'tao': case 'shan': return 5;
					case 'jiu': return 3;
					case 'sha':
						if (button.link[3] == 'kami') return 2.95;
						else return 2.8;
				}
			},
			prompt: function (links, player) {
				return "将【小狐】或非手牌区一张牌当做一张基本牌使用或打出";
			},
		},
		ai: {
			order: 80,
			respondShan: true,
			respondSha: true,
			save: true,
			result: {
				player: function (player) {
					if (_status.event.dying) return get.attitude(player, _status.event.dying);
					return 1;
				},
			},
		},
	},
	*/
	QQQ107_yaoyi: {
		audio: 'yb107_yaoyi',
		enable: ["chooseToUse", "chooseToRespond"],
		filter: function(event, player) {
			for (var i in lib.card) {
				if (lib.card[i].type == 'basic' && event.filterCard({
						name: i
					}, player, event) &&
					(player.countCards('ejsx') || player.hasCard('h', {
						name: 'ybsl_107xiaohu'
					}))) return true;
			}
			return false;
		},
		hiddenCard: (player, name) => lib.card[name].type == 'basic',
		//你可以将【小狐】或非手牌区一张牌当做一张基本牌使用或打出。然后若以此法使用或打出的牌为【小狐】，则在结算完成后插入牌堆随机位置。',
		async content(event, trigger, player) {
			var cards = player.getCards('esjx');
			var card = player.getCards('h', 'ybsl_107xiaohu')[0];
			if (card) cards.push(card);
			if (cards[0]) {
				const {
					result
				} = await player.chooseButton(['将【小狐】或非手牌区一张牌当做一张基本牌使用或打出', cards]);
				if (result.links && result.links[0]) {
					var list = [];
					for (var i in lib.card) {
						if (lib.card[i].mode && !lib.card[i].mode.includes(lib.config.mode)) continue;
						if (lib.card[i].type == 'basic' && event.getParent(2).filterCard({
								name: i
							}, player, event)) {
							list.push(['basic', "", i]);
							if (i == "sha") {
								for (var j of Array.from(lib.nature.keys())) {
									list.push(["基本", "", "sha", j]);
								}
							}
						}
					}
					const {
						result: result1
					} = await player.chooseButton(['使用或打出一张基本牌', [list, "vcard"]]);
					if (result1.links && result1.links[0]) {
						var evt = event.getParent(2);
						if (evt.name == 'chooseToUse' && result1.links[0][2] != 'shan') {
							await player.chooseUseTarget({
								name: result1.links[0][2],
								nature: result1.links[0][3]
							}, result.links, true, false);
						} else {
							evt.untrigger();
							evt.set('responded', true);
							evt.result = {
								bool: true,
								card: {
									name: result1.links[0][2]
								},
								cards: result.links
							};
							evt.redo();
						}
						if (result.links[0].name == 'ybsl_107xiaohu') {
							ui.cardPile.insertBefore(result.links[0], ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)])
						}
					}
				}
			}
		},
		ai: {
			order: 80,
			respondShan: true,
			respondSha: true,
			save: true,
			result: {
				player: function(player) {
					if (_status.event.dying) return get.attitude(player, _status.event.dying);
					return 1;
				},
			},
		},
	},
	ybsl_107xiaohu: {
		equipSkill: true,
		charlotte: true,
		group: ['ybsl_107xiaohu_2', 'ybsl_107xiaohu_3', 'ybsl_107xiaohu_4'],
		subSkill: {
			2: {
				equipSkill: true,
				forced: true,
				trigger: {
					player: 'damageAfter',
				},
				content: function() {
					if (player.countCards('h')) player.showCards(player.getCards('h'));
					player.draw(5);
				},
				ai: {
					maixie: true,
					maixie_hp: true,
					effect: {
						target: function(card, player, target) {
							if (player.hasSkillTag('jueqing', false, target)) return [1, -1];
							return 5;
							// if(get.tag(card,'damage')&&get.damageEffect(target,player,player)>0) return [1,0,0,-1.5];
						}
					}
				},
			},
			3: {
				equipSkill: true,
				forced: true,
				trigger: {
					player: 'drawBefore'
				},
				content: function() {
					if (player.countCards('h')) {
						var num = get.YB_type2(player.getCards('h')).length;
						trigger.num -= num;
						if (trigger.num <= 0) trigger.finish();
					}
				}
			},
			4: {
				equipSkill: true,
			}
		},
	},
	
	// ybsl_107xiaohu1:'小狐',
	// ybsl_107xiaohu2:'小狐',
	// ybsl_107xiaohu3:'小狐',
	// ybsl_107xiaohu4:'小狐',
	// ybsl_107xiaohu5:'小狐',
	// ybsl_107xiaohu6:'小狐',
	// ybsl_107xiaohu0:'小狐',
	// equip0:'万能',

	/*
	水璃  巡梦归途
	梦，3血，女
	
	寻狐
	游戏开始时（选将后，发牌前），在牌堆中插入一张【小狐】。当以此法添加的【小狐】进入你的手牌区时，改为移出游戏，然后获得【小狐】的技能。
	
	踏野
	当你使用一张牌后，你可以从弃牌堆中选择至多[1]张与此牌类型相同的其他牌，将这些牌置于牌堆底，然后展示牌堆顶等量张牌。然后将与触发技能的牌类型不同的置入弃牌堆，其余牌由你依次分配给场上角色。
	当有牌不因使用而进入弃牌堆时，你令下次发动此技能时，方括号内的数字+1，至多加至5。
	
	妖异
	你可以将【小狐】或装备区一张牌或判定区一张牌当做一张基本牌使用或打出。然后若以此法使用或打出的牌为【小狐】，则在结算完成后插入牌堆随机位置。
	
	【小狐】
	装备牌——万能装备牌
	（此牌可置入任意装备格。进入武器区时，范围为2；进入坐骑区时，攻击距离-1或防御距离+1。）
	锁定技，当你受到伤害后，你展示手牌（没有则跳过），然后摸五张牌。锁定技，你手牌中每有一种花色，你以任意途径的摸牌数-1。
	当有装备牌即将进入你的装备区时，你可将此装备牌置入弃牌堆，然后【小狐】进入你的该装备栏。
	*/
	yb121_yuanjie:{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		trigger:{
			global:'damageSource',
		},
		filter(event,player){
			return event.source&&event.source.isIn()&&event.player&&event.player.isIn();
		},
		content(){
			'step 0'
			trigger.player.recover();
			if(!trigger.player.countMark('yb121_yuanjie_mark'))trigger.player.addMark('yb121_yuanjie_mark');
			'step 1'
			trigger.source.draw(2);
			'step 2'
			var num = game.countPlayer(c=>c.countMark('yb121_yuanjie_mark')>0);
			player.draw(num);
		},
		check(event, player) {
			// var tar=trigger.player,sou = trigger.source;
			// if(get.attitude(player,tar)<0&&get.attitude(player,sou)<0)return false;
			// if(get.attitude(player,tar)>0&&get.attitude(player,sou)<0)return tar.getDamagedHp()-1;
			// if(get.attitude(player,tar)<0&&get.attitude(player,sou)>0)return false;
			// if(get.attitude(player,tar)>0&&get.attitude(player,sou)>0)return true;
			return true;

		},
		subSkill:{
			mark:{
				mark:true,
				marktext:'缘',
			}
		},
	},
	yb121_tiandu:{
		audio:'ext:夜白神略/audio/character:2',
		inherit:'ybmjz_tiandu',
	},
	//------------王冰雨
	yb122_yinjin:{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		enable:'phaseUse',
		selectCard:1,
		filterCard(card){
			// if(ui.selected.targets){
			// 	if(get.type(card)=='equip')return ui.selected.targets[0].canEquip(card);
			// }
			return true;
		},
		selectTarget:1,
		filterTarget(card,player,target){
			// if(ui.selected.cards){
			// 	if(get.type(ui.selected.cards[0])=='equip')return target.canEquip(card);
			// }
			return true;
		},
		check(card){
			return -get.value(card);
		},
		discard:false,
		position:'h',
		content(){
			'step 0'
			player.give(event.cards,event.target);
			player.$give(event.cards,event.target,true);
			'step 1'
			event.target.chooseDrawRecover(2,true);
			'step 2'
			// var playerx = player;
			if(!player.storage.yb122_yinjin)player.storage.yb122_yinjin=[];
			player.storage.yb122_yinjin.push(event.target);
			//这里待定
			player.when({global:'damageEnd'}).filter(function(event,player){
				if(!event.source)return false;
				var playerx = event.source;
				return playerx.isIn()&&
					player.storage.yb122_yinjin&&
					player.storage.yb122_yinjin.includes(playerx)&&
					playerx.countCards('h')>0;
			}).then(function(){
				var playerx = trigger.source;
				if(player.storage.yb122_yinjin?.includes(playerx))player.storage.yb122_yinjin.remove(playerx);
				playerx.chooseCard('选择是否一张手牌交给'+get.translation(player)).set('ai',function(card){
					if(get.attitude(playerx,player)>0)return get.value(card,player);
					return false;
				})
			}).then(function(){
				if(result.bool){
					var playerx = trigger.source;
					playerx.give(result.cards,player);
					playerx.logSkill('yb122_yinjin',player);
					// playerx.$give(result.cards,player,true);
				}
			}).then(function(){
				if(result.bool){
					player.chooseDrawRecover(2,true);
				}
			})
		},
		ai:{
			order:3,
			result:{
				target:1,
			}
		}
	},
	yb122_yinjinsp:{
		audio:'yb122_yinjin',
		usable:1,
		enable:'phaseUse',
		selectCard:1,
		filterCard(card){
			// if(ui.selected.targets){
			// 	if(get.type(card)=='equip')return ui.selected.targets[0].canEquip(card);
			// }
			return true;
		},
		selectTarget:1,
		filterTarget(card,player,target){
			// if(ui.selected.cards){
			// 	if(get.type(ui.selected.cards[0])=='equip')return target.canEquip(card);
			// }
			return true;
		},
		check(card){
			return -get.value(card);
		},
		discard:false,
		position:'h',
		content(){
			'step 0'
			player.give(event.cards,event.target);
			player.$give(event.cards,event.target,true);
			'step 1'
			event.target.chooseDrawRecover(2,true);
			'step 2'
			// var playerx = player;
			if(!player.storage.yb122_yinjinsp)player.storage.yb122_yinjinsp=[];
			player.storage.yb122_yinjinsp.push(event.target);
			//这里待定
			player.when({global:'damageEnd'}).filter(function(event,player){
				if(!event.source)return false;
				var playerx = event.source;
				return playerx.isIn()&&
					player.storage.yb122_yinjinsp&&
					player.storage.yb122_yinjinsp.includes(playerx)
			}).then(function(){
				var playerx = trigger.source;
				if(player.storage.yb122_yinjinsp?.includes(playerx))player.storage.yb122_yinjinsp.remove(playerx);
				player.chooseDrawRecover(2).set('logSkill','yb122_yinjin');
			})
		},
		ai:{
			order:3,
			result:{
				target:1,
			}
		}
	},
	yb122_buchen:{
		audio:'ext:夜白神略/audio/character:2',
		forced:true,
		mod:{
			targetEnabled:function(card,player,target,now){
				if(!get.tag(card,'damage')) return false;
			},
			
			cardDiscardable(card, player) {
				return false;
			},
			canBeDiscarded(card, player) {
				return false;
			},
			aiOrder(player, card, num) {
				if (num > 0 && get.name(card, player) == "huogong") {
					return 0;
				}
			},
			aiValue(player, card, num) {
				if (num > 0 && get.name(card, player) == "huogong") {
					return 0.01;
				}
				if(num>0){
					if(lib.card[card.name].toself)return 0.1;
				}
			},
			aiUseful(player, card, num) {
				if (num > 0 && get.name(card, player) == "huogong") {
					return 0;
				}
			},
		}
	},
	yb122_sanmeng:{
		audio:'ybsl_sanmeng',
	},
	//------------雪琅
	yb123_zouhe:{
		audio:'ext:夜白神略/audio/character:2',
		usable:1,
		enable: "phaseUse",
		filter(event, player) {
			if (!player.countCards("h")) {
				return false;
			}
			return game.hasPlayer(target => lib.skill.yb123_zouhe.filterTarget(null, player, target));
		},
		filterTarget(event, player, target) {
			return player.canCompare(target);
		},
		content() {
			"step 0";
			player.chooseToCompare(target)
			"step 1";
			event.winer=[],event.loser=[];
			event.wincard=[];
			if (!result.tie) {
				if (result.bool) {
					event.loser.push(target);
					event.winer.push(player);
					event.wincard.push(result.player)
				} else {
					event.loser.push(player);
					event.winer.push(target);
					event.wincard.push(result.target)
				}
			}
			else{
				event.loser.push(target);
				event.loser.push(player);
			}
			event.cardsx = [result.player,result.target].filterInD("d");
			'step 2'
			if(event.winer.length>0&&event.wincard.length>0){
				if(event.winer[0].hasUseTarget(event.wincard[0])){
					event.resultx = event.winer[0].chooseUseTarget([event.wincard[0]])
				}
			}
			'step 3'
			if(!event.winer.includes(player)||!event.resultx.bool){
				if(event.cardsx[0]&&get.position(event.cardsx[0], true) == "d"){
					player.gain(event.cardsx[0], 'gain2');
				}
				player.recover();
			}
			'step 4'
			if(!event.winer.includes(target)||!event.resultx.bool){
				if(event.cardsx[1]&&get.position(event.cardsx[1], true) == "d"){
					target.gain(event.cardsx[1], 'gain2');
				}
				target.recover();
			}
		},

	},
	yb123_bixin:{
		audio:'ext:夜白神略/audio/character:2',
	},
	//-------夜白示范的傲才
	ybsl_aocai:{
		audio:'ext:夜白神略/audio/character:2',
		enable:['chooseToUse','chooseToRespond'],
		hiddenCard:function(player,name){
			if(name!='wuxie'&&lib.inpile.includes(name)) return true;
			return false;
		},
		filter:function(event,player){
			if(event.responded||event.ybsl_aocai) return false;
			for(var i of lib.inpile){
				if(i!='wuxie'&&event.filterCard({name:i},player,event)) return true;
			}
			return false;
		},
		delay:false,
		content:function(){
			'step 0'
			var evt=event.getParent(2);
			evt.set('ybsl_aocai',true);
			var cards=get.cards((player.countCards('h')==0)?4:2);
			for(var i=cards.length-1;i>=0;i--){
				ui.cardPile.insertBefore(cards[i].fix(),ui.cardPile.firstChild);
			}
			var aozhan=player.hasSkill('aozhan');
			player.chooseButton(['傲才：选择要'+(evt.name=='chooseToUse'?'使用':'打出')+'的牌',cards]).set('filterButton',function(button){
				return _status.event.cards.includes(button.link);
			}).set('cards',cards.filter(function(card){
				if(aozhan&&card.name=='tao'){
					return evt.filterCard({
						name:'sha',isCard:true,cards:[card],
					},evt.player,evt)||evt.filterCard({
						name:'shan',isCard:true,cards:[card],
					},evt.player,evt);
				}
				return evt.filterCard(card,evt.player,evt);
			})).set('ai',function(button){
				var evt=_status.event.getParent(3);
				if(evt&&evt.ai){
					var tmp=_status.event;
					_status.event=evt;
					var result=(evt.ai||event.ai1)(button.link,_status.event.player,evt);
					_status.event=tmp;
					return result;
				}
				return 1;
			});
			'step 1'
			var evt=event.getParent(2);
			if(result.bool&&result.links&&result.links.length){
				var name=result.links[0].name,aozhan=(player.hasSkill('aozhan')&&name=='tao');
				if(aozhan){
					name=evt.filterCard({
						name:'sha',isCard:true,cards:[card],
					},evt.player,evt)?'sha':'shan';
				}
				if(evt.name=='chooseToUse'){
					game.broadcastAll(function(result,name){
						lib.skill.ybsl_aocai_backup.viewAs={name:name,cards:[result],isCard:true};
						lib.skill.ybsl_aocai_backup.prompt='选择'+get.translation(result)+'的目标';
					},result.links[0],name);
					evt.set('_backupevent','ybsl_aocai_backup');
					evt.backup('ybsl_aocai_backup');
				}
				else{
					delete evt.result.skill;
					delete evt.result.used;
					evt.result.card=get.autoViewAs(result.links[0]);
					if(aozhan) evt.result.card.name=name;
					evt.result.cards=[result.links[0]];
					evt.redo();
					return;
				}
			}
			evt.goto(0);
		},
		ai:{
			effect:{
				target:function(card,player,target,effect){
					if(get.tag(card,'respondShan')) return 0.7;
					if(get.tag(card,'respondSha')) return 0.7;
				}
			},
			order:11,
			respondShan:true,
			respondSha:true,
			result:{
				player:function(player){
					if(_status.event.dying) return get.attitude(player,_status.event.dying);
					return 1;
				}
			}
		}
	},
	ybsl_aocai_backup:{
		sourceSkill:'ybsl_aocai',
		precontent:function(){
			delete event.result.skill;
			var name=event.result.card.name;
			event.result.cards=event.result.card.cards;
			event.result.card=get.autoViewAs(event.result.cards[0]);
			event.result.card.name=name;
		},
		filterCard:function(){return false},
		selectCard:-1,
	},
	//整个活
	ybsl_yiji:{
		enable:'phaseUse',
		usable:1,
		filter(){return true},
		content(){
			'step 0'
			var cards=get.cards(2);
			game.cardsGotoOrdering(cards);
			player.showCards(cards);//
			var num10=get.number(cards[0])||4;
			var num11=get.number(cards[1])||4;
			if(num10<num11){
				event.num1=num11;
				event.num2=num10;
			}
			else {
				event.num1=num10;
				event.num2=num11;
			}
			'step 1'
			event.cardsxx=get.cards(event.num1);
			event.cards2=game.cardsGotoOrdering(event.cardsxx);
			var yb = {};
			// var relu = player.YB_yiji(event,{cards:event.cards2,num:event.num2},player);
			var relu = player.YB_yiji(event.num2,event.cards2);
			relu;
			'step 2'
			var cards3=event.cardsxx.filterInD();
			if(cards3.length){
				player.addToExpansion(cards3).gaintag.add('ybsl_yiji');
			}
		},
		intro:{
			markcount:function(storage,player){
				var content=player.getExpansions('ybsl_yiji');
				return content.length;
			},
			mark:function(dialog,content,player){
				var content=player.getExpansions('ybsl_yiji');
				if(content&&content.length){
					if(player==game.me||player.isUnderControl()){
						dialog.addAuto(content);
					}
					else{
						return '共有'+get.cnNumber(content.length)+'张遗计';
					}
				}
			},
			content:function(content,player){
				var content=player.getExpansions('ybsl_yiji');
				if(content&&content.length){
					if(player==game.me||player.isUnderControl()){
						return get.translation(content);
					}
					return '共有'+get.cnNumber(content.length)+'张遗计';
				}
			}
		},
		group:'ybsl_yiji_gain',
		subSkill:{
			gain:{
				trigger:{player:'damageAfter'},
				filter(event,player){
					var content=player.getExpansions('ybsl_yiji');
					return content.length&&event.num;
				},
				async cost(event, trigger, player){
					var cards = player.getExpansions('ybsl_yiji');
					if(!cards){
						event.result = {
							bool: false,
						};
					}
					else {
						var num = Math.min(trigger.num*2,cards.length)
						const result = await player.chooseButton([get.prompt("ybsl_yiji"), cards], num).set("ai", function () {
							return 1;
						}).forResult();
						if (result.bool)
							event.result = {
								bool: true,
								cards: result.links,
							};
					}
				},
				content(){
					if(!event.cards){
						event.finish();
					}
					else player.gain(event.cards,'gain2');
				}
			},
		}
	},
	ybsl_liangying:{
		enable:'phaseUse',
		usable:1,
		filter(){return true},
		content(){
			'step 0'
			var cards = player.draw(5);
			event.cardsx=cards;
			'step 1'
			var cardsx=[];
			for(var k of event.cardsx.result){
				if(player.getCards('h').includes(k))cardsx.push(k);
			}
			event.cardsxx=cardsx;
			if(cardsx?.length){
				var ddd =player.YB_liangying(cardsx,true,3);
				event.ddd=ddd;
			}
			'step 2'
			console.log(event.ddd.result)
			var list9=event.ddd.result;
			var listx1=[];
			for(var j of list9){
				listx1.push(j[1][0]);
			}
			var cards2=listx1;
			var cards3=[];
			var cards4=event.cardsxx;
			for(var k of cards4){
				if(player.getCards('h').includes(k)&&!cards2.includes(k))cards3.push(k);
			}
			console.log(cards3)
			if(cards3.length){
				player.addToExpansion(cards3).gaintag.add('ybsl_yiji');
			}
		},
		intro:{
			markcount:function(storage,player){
				var content=player.getExpansions('ybsl_yiji');
				return content.length;
			},
			mark:function(dialog,content,player){
				var content=player.getExpansions('ybsl_yiji');
				if(content&&content.length){
					if(player==game.me||player.isUnderControl()){
						dialog.addAuto(content);
					}
					else{
						return '共有'+get.cnNumber(content.length)+'张遗计';
					}
				}
			},
			content:function(content,player){
				var content=player.getExpansions('ybsl_yiji');
				if(content&&content.length){
					if(player==game.me||player.isUnderControl()){
						return get.translation(content);
					}
					return '共有'+get.cnNumber(content.length)+'张遗计';
				}
			}
		},
		
	},
	//---------------------属性杀遗址








	
}