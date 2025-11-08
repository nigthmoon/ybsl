import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
import { YB_yebailvcheng } from '../../../yblc/YBLC_1.js'
import { YB_xnqbd } from '../../../yblc/YBLC_2.js'
import { cyyydsgs2 } from '../../pile/cyyydsgs.js'
export { YBSL_brawl }
/**
 * 
 * 乱斗模式夜白旅程
 */
const YBSL_brawl = function(){
	if (lib.config.mode == "brawl") {
		if (!lib.storage.stage) lib.storage.stage = {};
		
		if(lib.config.extension_夜白神略_ybsl_wujinshilian=='lc'){
			if(YB_yebailvcheng)YB_yebailvcheng();
		}
		else if(lib.config.extension_夜白神略_ybsl_wujinshilian=='qbd'){
			if(YB_xnqbd)YB_xnqbd();
		}
		// if(cyyydsgs2)cyyydsgs2()
		if (!lib.storage.stage["夜白旅程（二）"]) {
			lib.storage.stage["夜白旅程（二）"] = {
				name: "夜白旅程（二）",
				intro: "夜白旅程的新型演绎形式",
				scenes: [{
					"name": "第一关",
					"intro": "夜白旅程第一关",
					"players": [{
						"name": "ybsl_012zhengjiayi",
						"name2": "none",
						"identity": "fan",
						"position": 8,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第二关",
					"intro": "夜白旅程第二关",
					"players": [{
						"name": "ybsl_011gaoyuhang",
						"name2": "none",
						"identity": "fan",
						"position": 6,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_012zhengjiayi",
						"name2": "none",
						"identity": "zhong",
						"position": 3,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第三关",
					"intro": "夜白旅程第三关",
					"players": [{
						"name": "ybsl_009liyushan",
						"name2": "none",
						"identity": "fan",
						"position": 6,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_012zhengjiayi",
						"name2": "none",
						"identity": "zhong",
						"position": 3,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第四关",
					"intro": "夜白旅程第四关（近似）",
					"players": [{
						"name": "ybsl_008wuyuxin",
						"name2": "ybsl_009liyushan",
						"identity": "fan",
						"position": 6,
						"hp": 4,
						"maxHp": 4,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_012zhengjiayi",
						"name2": "none",
						"identity": "zhong",
						"position": 3,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第五关",
					"intro": "夜白旅程第五关（近似）",
					"players": [{
						"name": "ybsl_012zhengjiayi",
						"name2": "none",
						"identity": "zhong",
						"position": 3,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_010zhouyue",
						"name2": "ybsl_008wuyuxin",
						"identity": "fan",
						"position": 6,
						"hp": 4,
						"maxHp": 4,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第六关",
					"intro": "夜白旅程第六关（近似）",
					"players": [{
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_012zhengjiayi",
						"name2": "ybsl_016manchengqi",
						"identity": "fan",
						"position": 6,
						"hp": 5,
						"maxHp": 5,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第七关",
					"intro": "夜白旅程第七关（近似）",
					"players": [{
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_002chenailin",
						"name2": "ybsl_001sunlisong",
						"identity": "fan",
						"position": 6,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第八关",
					"intro": "夜白旅程第八关（近似）",
					"players": [{
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsp_002chenailin",
						"name2": "ybsl_001sunlisong",
						"identity": "fan",
						"position": 6,
						"hp": 6,
						"maxHp": 6,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第九关",
					"intro": "夜白旅程第九关（近似）",
					"players": [{
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsp_001sunlisong",
						"name2": "ybsl_001sunlisong",
						"identity": "fan",
						"position": 6,
						"hp": 6,
						"maxHp": 6,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}, {
					"name": "第十关",
					"intro": "夜白旅程第十关（近似）",
					"players": [{
						"name": "random",
						"name2": "none",
						"identity": "zhu",
						"position": 1,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": true,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_022salt",
						"name2": "ybsl_004zhangyujie",
						"identity": "fan",
						"position": 6,
						"hp": 6,
						"maxHp": 6,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}, {
						"name": "ybsl_002chenailin",
						"name2": "none",
						"identity": "zhong",
						"position": 3,
						"hp": null,
						"maxHp": null,
						"linked": false,
						"turnedover": false,
						"playercontrol": false,
						"handcards": [],
						"equips": [],
						"judges": []
					}],
					"cardPileTop": [],
					"cardPileBottom": [],
					"discardPile": [],
					"gameDraw": true
				}],
				mode: "free",
				level: 0,
			};
			_status.extensionstage = true;
		}
		if (!_status.extensionmade) _status.extensionmade = [];
		_status.extensionmade.push("夜白旅程（二）");
		// lib.brawl.YB_寻你千百度={
		// 	name: "寻你千百度",
		// 	mode:'identity',
		// 	intro:[
		// 		'我寻你千百度，又一岁荣枯，可你从不在灯火阑珊处',
		// 	],
		// 	// intro: "我寻你千百度，又一岁荣枯，可你从不在灯火阑珊处",
		// 	showcase:function(init){
		// 		var node=this;
		// 		var player635;
		// 		var player1;
		// 		if(init){
		// 			player635=ui.create.player(null,true).init('db_ybsp_014liutianyu');
		// 			player635.node.marks.remove();
		// 			player635.node.hp.remove();
		// 			player635.style.left='calc(40%)';
		// 			player635.style.top='calc(20%)';
		// 			player635.style.transform='scale(0.5)';
		// 			player635.node.count.remove();
		// 			this.appendChild(player635);
		// 			this.player635=player635;
		// 		}
		// 		else{
		// 			player635=this.player635;
		// 		}
		// 		if(init){
		// 			player1=ui.create.player(null,true).init('ybsl_002chenailin');
		// 			player1.node.marks.remove();
		// 			player1.node.hp.remove();
		// 			player1.style.left='calc(10%)';
		// 			player1.style.top='calc(-10%)';
		// 			player1.style.transform='scale(0.5)';
		// 			player1.node.count.remove();
		// 			this.appendChild(player1);
		// 			this.player1=player1;
		// 			ui.refresh(player1);
		// 		}
		// 		else{
		// 			player1=this.player1;
		// 		}
		// 		var func=function(){
		// 			var player2=ui.create.player(null,true).init('ybsl_022salt');
		// 			player2.node.marks.remove();
		// 			player2.node.hp.remove();
		// 			player2.style.left='auto';
		// 			player2.style.right='calc(10%)';
		// 			player2.style.top='calc(-10%)';
		// 			player2.node.count.remove();
		// 			player2.style.transform='scale(0.4)';
		// 			player2.style.opacity=0;
		// 			node.appendChild(player2);
		// 			ui.refresh(player2);
		// 			player2.style.opacity=1;
		// 			player2.style.transform='scale(0.5)';
						
		// 			setTimeout(function(){
		// 				if(!player2) return;
		// 				game.linexy([//线条
		// 					player635.getLeft()+player635.offsetWidth/2,
		// 					player635.getTop()+player635.offsetHeight/2,
		// 					player1.getLeft()+player1.offsetWidth/2,
		// 					player1.getTop()+player1.offsetHeight/2,
		// 				],node);
		// 				setTimeout(function(){
		// 					var popup1=ui.create.div('.damage');//字体
		// 					popup1.innerHTML='520';//字体的描述：
		// 					popup1.dataset.nature='wood';//-1字体的颜色：木色
		// 					player1.appendChild(popup1);//player1身上飘字popup1
		// 					ui.refresh(popup1);
		// 					popup1.classList.add('damageadded');
		// 					popup1.listenTransition(function(){
								
		// 						setTimeout(function(){
		// 							popup1.delete();
		// 						},300);//player1身上字体持续时间
		// 					});
							
		// 					setTimeout(function(){
		// 						game.linexy([
		// 							player1.getLeft()+player1.offsetWidth/2,
		// 							player1.getTop()+player1.offsetHeight/2,
		// 							player2.getLeft()+player2.offsetWidth/2,
		// 							player2.getTop()+player2.offsetHeight/2,
		// 						],node);
		// 						var popup=ui.create.div('.damage');//字体的类别:：伤害
		// 						popup.innerHTML='-999';//字体的描述：-1
		// 						popup.dataset.nature='fire';//-1字体的颜色：火
		// 						player2.appendChild(popup);//player2身上飘字popup
		// 						ui.refresh(popup);
		// 						popup.classList.add('damageadded');
		// 						popup.listenTransition(function(){
		// 							setTimeout(function(){
		// 								popup.delete();
		// 							},300);//player2身上字体持续时间
		// 						});
		// 					},900)//（两个动作之间的延迟）
		// 				},250)//陈爱琳状态执行延迟
		// 			},600);//决定从何时开始
					
		// 			setTimeout(function(){
		// 				if(!player2) return;
		// 				player2.style.transition='all 0.5s';//player2受伤动画
		// 				player2.style.transform='scale(0.7)';
		// 				player2.delete();
		// 			},2500);//盐的执行时间
		// 		};
		// 		node.showcaseinterval=setInterval(func,3500);//循环时间
		// 		func();
		// 	},
		// 	init:function(){
		// 		var pack={
		// 			character:{
		// 				ybsl_tiaoguan1:[null,null,null,[],["ext:夜白神略/image/character/ybsl_cundang1.jpg"]],
		// 				ybsl_tiaoguan2:[null,null,null,[],["ext:夜白神略/image/character/ybsl_cundang2.jpg"]],
		// 				ybsl_tiaoguan3:[null,null,null,[],["ext:夜白神略/image/character/ybsl_cundang3.jpg"]],
		// 			},
		// 			translate:{
		// 				ybsl_tiaoguan1:'起始关卡：1',
		// 				ybsl_tiaoguan2:'起始关卡：2',
		// 				ybsl_tiaoguan3:'起始关卡：3',
		// 			},
		// 			skill:{
						
		// 			},
		// 		};
		// 		for(var i in pack){
		// 			for(var j in pack[i]){
		// 				lib[i][j]=pack[i][j];
		// 			}
		// 		}
		// 		if(!_status.xunniqianbaidu) _status.xunniqianbaidu={
		// 			used:[],

		// 		}
		// 	},
		// 	content:{
		// 		submode:'normal',
		// 		chooseCharacterBefore:function(){
		// 			game.identityVideoName='寻你千百度';
		// 			// game.saveConfig('player_number',_status.yebailvcheng.player_number,'identity');
		// 			game.chooseCharacter=function(){
		// 				var next=game.createEvent('chooseCharacter',false);
		// 				next.showConfig=true;
		// 				next.setContent(function(){
		// 					'step 0'
		// 					var list = ['ybsl_tiaoguan1','ybsl_tiaoguan2','ybsl_tiaoguan3']
		// 					var dialog;
		// 					var str='选择剧情起始点';
		// 					var strt=`剧情一：
		// 							剧情二：
		// 							剧情三：暂未设计`;
		// 					dialog=ui.create.dialog(str,'hidden',strt,[list,'character']);
		// 					// if(event.swapnodialog){
		// 					// 	dialog=ui.dialog;
		// 					// 	event.swapnodialog(dialog,list);
		// 					// 	delete event.swapnodialog;
		// 					// }
		// 					// else{
		// 					// 	var str='选择角色';
		// 					// 	var strt='神夜白将在此界面常驻，方便选择<br>（若有其他想点的将可以联系作者进行加入）';
		// 					// 	//或者在上边list2方括号里自己写武将ID，将与将之间用英文逗号隔开
		// 					// 	dialog=ui.create.dialog(str,'hidden',strt,[list,'character'],[list2,'character']);
		// 					// }
		// 					dialog.setCaption('选择剧情节点（推荐从1开始玩）');
		// 					game.me.chooseButton(dialog,true);
							
		// 					'step 0'
		// 					'step 0'
		// 					ui.arena.classList.add('choose-character');
		// 					game.me.identity='zhu';
		// 					game.zhu=game.me;
		// 					game.YBLC_memory2=game.me.next;
		// 					game.YBLC_memory2.identity='fan';
		// 					game.zhu.setIdentity();
		// 					game.zhu.identityShown=true;
		// 					game.zhu.node.identity.classList.remove('guessing');
		// 					game.YBLC_memory2.setIdentity();
		// 					game.YBLC_memory2.identityShown=true;
		// 					game.YBLC_memory2.node.identity.classList.remove('guessing');

		// 					event.list=[];
		// 					for(var i in lib.character){
		// 						if(lib.filter.characterDisabled(i)) continue;
		// 						event.list.push(i);
		// 					}
		// 					event.list.randomSort();
		// 					_status.characterlist=event.list.slice(0);
		// 					var list=event.list.slice(0,5);
		// 					var list2=['ybslshen_014liutianyu'];
		// 					delete event.swapnochoose;
		// 					var dialog;
		// 					if(event.swapnodialog){
		// 						dialog=ui.dialog;
		// 						event.swapnodialog(dialog,list);
		// 						delete event.swapnodialog;
		// 					}
		// 					else{
		// 						var str='选择角色';
		// 						var strt='神夜白将在此界面常驻，方便选择<br>（若有其他想点的将可以联系作者进行加入）';
		// 						//或者在上边list2方括号里自己写武将ID，将与将之间用英文逗号隔开
		// 						dialog=ui.create.dialog(str,'hidden',strt,[list,'character'],[list2,'character']);
		// 					}
		// 					dialog.setCaption('选择角色');
		// 					game.me.chooseButton(dialog,true).set('onfree',true);
		// 					ui.create.cheat=function(){
		// 						_status.createControl=ui.cheat2;
		// 						ui.cheat=ui.create.control('更换',function(){
		// 							if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
		// 								return;
		// 							}
		// 							if(game.changeCoin){
		// 								game.changeCoin(-3);
		// 							}
		// 							event.list.randomSort();
		// 							list=event.list.slice(0,5);
		// 							var buttons=ui.create.div('.buttons');
		// 							var node=_status.event.dialog.buttons[0].parentNode;
		// 							_status.event.dialog.buttons=ui.create.buttons(list,'character',buttons);
		// 							_status.event.dialog.content.insertBefore(buttons,node);
		// 							buttons.animate('start');
		// 							node.remove();
		// 							game.uncheck();
		// 							game.check();
		// 						});
		// 						delete _status.createControl;
		// 					};
		// 					if(lib.onfree){
		// 						lib.onfree.push(function(){
		// 							event.dialogxx=ui.create.characterDialog('heightset');
		// 							if(ui.cheat2){
		// 								ui.cheat2.animate('controlpressdownx',500);
		// 								ui.cheat2.classList.remove('disabled');
		// 							}
		// 						});
		// 					}
		// 					else{
		// 						event.dialogxx=ui.create.characterDialog('heightset');
		// 					}
		// 					ui.create.cheat2=function(){
		// 						ui.cheat2=ui.create.control('自由选将',function(){
		// 							if(this.dialog==_status.event.dialog){
		// 								if(game.changeCoin){
		// 									game.changeCoin(50);
		// 								}
		// 								this.dialog.close();
		// 								_status.event.dialog=this.backup;
		// 								this.backup.open();
		// 								delete this.backup;
		// 								game.uncheck();
		// 								game.check();
		// 								if(ui.cheat){
		// 									ui.cheat.animate('controlpressdownx',500);
		// 									ui.cheat.classList.remove('disabled');
		// 								}
		// 							}
		// 							else{
		// 								if(game.changeCoin){
		// 									game.changeCoin(-10);
		// 								}
		// 								this.backup=_status.event.dialog;
		// 								_status.event.dialog.close();
		// 								_status.event.dialog=_status.event.parent.dialogxx;
		// 								this.dialog=_status.event.dialog;
		// 								this.dialog.open();
		// 								game.uncheck();
		// 								game.check();
		// 								if(ui.cheat){
		// 									ui.cheat.classList.add('disabled');
		// 								}
		// 							}
		// 						});
		// 						if(lib.onfree){
		// 							ui.cheat2.classList.add('disabled');
		// 						}
		// 					}
		// 					if(!_status.brawl||!_status.brawl.chooseCharacterFixed){
		// 						if(!ui.cheat&&get.config('change_choice'))
		// 							ui.create.cheat();
		// 						if(!ui.cheat2&&get.config('free_choose'))
		// 							ui.create.cheat2();
		// 					}
		// 					'step 1'
		// 					if(ui.cheat){
		// 						ui.cheat.close();
		// 						delete ui.cheat;
		// 					}
		// 					if(ui.cheat2){
		// 						ui.cheat2.close();
		// 						delete ui.cheat2;
		// 					}
		// 					game.addRecentCharacter(result.buttons[0].link);
		// 					game.zhu.init(result.buttons[0].link);
		// 					_status.characterlist.remove(result.buttons[0].link);
		// 					_status.yebailvcheng.used.add(result.buttons[0].link);
		// 					// game.zhu.chooseControl('一阶','二阶','三阶','四阶','五阶').set('prompt','请选择武将等阶');
		// 					'step 2'
		// 					// var hp=Math.floor(result.index/2);
		// 					// event.draw=Math.floor((result.index+1)/2);
		// 					// if(hp){
		// 					// 	game.zhu.hp+=hp;
		// 					// 	game.zhu.maxHp+=hp;
		// 					// 	game.zhu.update();
		// 					// }
		// 					// game.zhu.addMark('_YBLC_level');
		// 					// var list666=_status.characterlist.randomGets(lib.config.extension_夜白神略_ybsl_wujianghouxuan);
		// 					var list666=[];
		// 					// list666.push('ybsl_059starsFall3');
		// 					list666.push('ybsl_012zhengjiayi');
		// 					game.zhu.chooseButton(['请选择对手的登场武将',[list666,'character']],true);
		// 					'step 3'
		// 					var character01='ybsl_012zhengjiayi';
		// 					game.YBLC_memory2.init('ybsl_012zhengjiayi');
		// 					// game.fan.addMark('_YBLC_level');
		// 					_status.characterlist.remove('ybsl_012zhengjiayi');
		// 					_status.yebailvcheng.used.add('ybsl_012zhengjiayi');
		// 					if(event.draw){
		// 						game.zhu.directgain(get.cards(event.draw));
		// 					}
		// 					setTimeout(function(){
		// 						ui.arena.classList.remove('choose-character');
		// 					},500);
		// 					_status.yebailvcheng.completeYbsl.push([
		// 						'在下一关中召唤'+get.translation(result.links[0])+'一同战斗',
		// 						function(){_status.yebailvcheng.addFellow(result.links[0]);
		// 					}])
		// 					delete pack.skill;
		// 					game.addVideo('arrangeLib',null,pack);
		// 					game.addOverDialog=function(dialog){
		// 						dialog.addText('共计通过'+_status.yebailvcheng.completeNumber+'关');
		// 					};
		// 					lib.element.player.dieAfter=function(){
		// 						if(this==game.fellow) return;
		// 						_status.characterlist.removeArray(_status.yebailvcheng.used);
		// 						if(game.zhu==this||!_status.characterlist.length){
		// 							var bool=false;
		// 							if(_status.yebailvcheng.completeNumber>5) bool=true;
		// 							game.over(bool);
		// 						}
		// 						else{
		// 							var next=game.createEvent('yebailvcheng_replace',false);
		// 							next.setContent(_status.yebailvcheng.replace_character);
		// 						}
		// 					};
		// 					lib.element.player.dieAfter2=function(){
		// 						_status.characterlist.removeArray(_status.yebailvcheng.used);
		// 					};
		// 					game.zhu.dieAfter=lib.element.player.dieAfter;
		// 					game.fan.dieAfter=lib.element.player.dieAfter;
		// 					game.zhu.dieAfter2=lib.element.player.dieAfter2;
		// 					game.fan.dieAfter2=lib.element.player.dieAfter2;
		// 				});
		// 			};
		// 		}
		// 	}

		// }
	}
}