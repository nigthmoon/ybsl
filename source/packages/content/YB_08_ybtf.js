import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { YBSL_ybtf }
/**
 * 乱斗模式夜白塔防
 * 未完工
 */
const YBSL_ybtf = function () {
	if(lib.config.extension_夜白神略_ybsl_wujinshilian=='tf'){
		lib.brawl.yebailvcheng={
			name:'夜白塔防',
			mode:'chess',
			showcase:function(init){//简介动画
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
				'夜白的魔改，尔将进行无尽而漫长的塔防战争',
				(lib.config.yebaitafang_level?('你的最高纪录是连续通过'+lib.config.yebaitafang_level+'关，是否能够突破这一记录呢？'):'你能走到哪一步呢？'),
			],
		}
	}
}