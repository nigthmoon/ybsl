import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { dynamicTranslate }

const dynamicTranslate = {//动态翻译
	yb014_shifu2:function(player){
		var str='使用非虚拟及转化牌，经验+13，否则经验+7；受到伤害后，经验+11；回合开始时，经验+6。';
		var list6=player.storage.yb014_shifu99;
		var list={
			'moon':{
				0:'①决堰（陆抗）',
				1:'<br>②伪伤（key宫泽谦吾）',
				2:'<br>③游凤（key凤千早）',
				3:'<br>④止啼（手杀神张辽）',
				4:'<br>⑤浮萍（夏侯令女）',
				5:'<br>⑥均步（key凤咲夜）/烈武（key凤千早）',
				6:'<br>⑦弥笃（胡昭）',
				7:'<br>⑧贤望（胡昭）/奋锐（霍峻）',
			},
			'clam':{
				0:'①武圣（界关羽）+倾国（界甄姬）',
				1:'<br>②龙胆（界赵云）',
				2:'<br>③善断+义烈（ol周处）',
				3:'<br>④急救（华佗）+连环（界庞统）',
				4:'<br>⑤火计+看破（手杀卧龙）',
				5:'<br>⑥矫诏+殚心（界郭皇后）',
				6:'<br>⑦龙魂（神赵云）',
				7:'<br>⑧双掣（key三枝二木）',
			},
			'lightning':{
				0:'①符咒（DIY张宁）',
				1:'<br>②鬼道（DIY张宁）',
				2:'<br>③太平（DIY张宁）',
				3:'<br>④筹策（戏志才）',
				4:'<br>⑤屯田（ol界邓艾）',
				5:'<br>⑥暴球（key枣铃）',
				6:'<br>⑦八阵（卧龙）',
				7:'<br>⑧吉境（王荣）',
			},
			'wind':{
				0:'①制衡（界孙权）',
				1:'<br>②法箓+真仪（张琪瑛）',
				2:'<br>③会输（全不会解）',
				3:'<br>④易输（全不会解）',
				4:'<br>⑤点化（张琪瑛）',
				5:'<br>⑥淑武（key七濑留美）',
				6:'<br>⑦苦肉（黄盖）/募兵（SP张辽已觉醒）',
				7:'<br>⑧敏思（王荣）/巧思（马均）',
			},
			'flame':{
				0:'①锋略（荀谌）',
				1:'<br>②天义（太史慈）+探虎（星SP吕蒙）',
				2:'<br>③烈刃（手杀祝融）',
				3:'<br>④专对（秦宓）',
				4:'<br>⑤明伐（手杀羊祜）+大喝（星SP张飞）',
				5:'<br>⑥酣战（界太史慈）/天辩（秦宓）',
				6:'<br>⑦咆哮（界张飞）/陷阵（界高顺）',
				7:'<br>⑧除害（周处）',
			},
		}
		if(player.storage.yb014_shifu99[0]=='sakuya_junbu'){
			list.moon[5]='<br>⑥均步（key凤咲夜）/<span style="text-decoration: line-through;">烈武（key凤千早）</span>'
		}
		else if(player.storage.yb014_shifu99[0]=='chihaya_liewu'){
			list.moon[5]='<br>⑥<span style="text-decoration: line-through;">均步（key凤咲夜）</span>/烈武（key凤千早）'
		}
		if(player.storage.yb014_shifu99[1]=='xianwang'){
			list.moon[7]='<br>⑧贤望（胡昭）/<span style="text-decoration: line-through;">奋锐（霍峻）</span>'
		}
		else if(player.storage.yb014_shifu99[1]=='fenrui'){
			list.moon[7]='<br>⑧<span style="text-decoration: line-through;">贤望（胡昭）</span>/奋锐（霍峻）'
		}
		if(player.storage.yb014_shifu99[2]=='kurou'){
			list.wind[6]='<br>⑦苦肉（黄盖）/<span style="text-decoration: line-through;">募兵（SP张辽已觉醒）</span>'
		}
		else if(player.storage.yb014_shifu99[2]=='mubing'){
			list.wind[6]='<br>⑦<span style="text-decoration: line-through;">苦肉（黄盖）</span>/募兵（SP张辽已觉醒）'
		}
		if(player.storage.yb014_shifu99[3]=='minsi'){
			list.wind[7]='<br>⑧敏思（王荣）/<span style="text-decoration: line-through;">巧思（马均）</span>'
		}
		else if(player.storage.yb014_shifu99[3]=='qiaosi'){
			list.wind[7]='<br>⑧<span style="text-decoration: line-through;">敏思（王荣）</span>/巧思（马均）'
		}
		if(player.storage.yb014_shifu99[4]=='hanzhan'){
			list.flame[5]='<br>⑥酣战（界太史慈）/<span style="text-decoration: line-through;">天辩（秦宓）</span>'
		}
		else if(player.storage.yb014_shifu99[4]=='tianbian'){
			list.flame[5]='<br>⑥<span style="text-decoration: line-through;">酣战（界太史慈）</span>/天辩（秦宓）'
		}
		if(player.storage.yb014_shifu99[5]=='olpaoxiao'){
			list.flame[6]='<br>⑦咆哮（界张飞）/<span style="text-decoration: line-through;">陷阵（界高顺）</span>'
		}
		else if(player.storage.yb014_shifu99[5]=='decadexianzhen'){
			list.flame[6]='<br>⑦<span style="text-decoration: line-through;">咆哮（界张飞）</span>/陷阵（界高顺）'
		}
		for(var i in list){
			var j='ybsl_'+i;
			var k='ybmyx_'+i;
			if(player.storage[j].includes('key')){
				str+='<br>主流派<br>'
				for (var q=0;q<8;q++){
					var numa=player.storage['ybsl_'+i+'_lv'];
					if(q<numa){
						list[i][q]='<span class=yellowtext>'+list[i][q]+'</span>'
					}
					else{
						list[i][q]='<span style="opacity:0.5;">'+list[i][q]+'</span>'
					}
					str+=list[i][q];
				}
			}
			else if(player.storage[j].includes('sec')){
				str+='<br>支流派<br>'
				for (var p=0;p<5;p++){
					var numb=player.storage['ybsl_'+i+'_lv'];
					if(p<numb){
						list[i][p]='<span class=yellowtext>'+list[i][p]+'</span>'
					}
					else{
						list[i][p]='<span style="opacity:0.5;">'+list[i][p]+'</span>'
					}
					str+=list[i][p];
				}
			}
		}
		return str;
	},
}
