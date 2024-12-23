import { lib, game, ui, get, ai, _status } from '../../../../noname.js'

export const config = {
	"ybslb_help":{
		name:'<span class="yellowtext">查看介绍</span><span style="color:#ff00cc"><font size="4px">▶▶▶</font></span>',
		clear:true,
		onclick: function(){
			if(this.help==undefined){
				var log=["未加入到启动代码的那些东西别乱动，都是没做完，不能用的<br>",
				"除原版马均公式外，还有以下马均不能的：",
				"· <span class=firetext>王追</span>可升级成为<span class=yellowtext>乌云踏雪</span>，",
				"· <span class=firetext>赤兔</span>可升级为<span class=yellowtext>烈焰赤兔</span>，",
				"· <span class=firetext>朱雀扇</span>、<span class=firetext>赤炎琴</span>和<span class=firetext>五行扇</span>可升级为<span class=yellowtext>北斗七星扇</span>，",
				"· <span class=firetext>倚天剑</span>可升级为<span class=yellowtext>七星龙渊剑</span>，",
				"· 黑桃<span class=firetext>闪电</span>、<span class=firetext>太公阴符</span>和<span class=firetext>浮雷</span>可升级为<span class=yellowtext>阴勾玉</span>，",
				"· 非黑桃<span class=firetext>闪电</span>、<span class=firetext>洪水</span>和<span class=firetext>火山</span>可升级为<span class=yellowtext>阳勾玉</span>，",
				"· <span class=firetext>阴/阳勾玉</span>在装备区时，用<span class=firetext>阳/阴勾玉</span>替掉就会合成<span class=yellowtext>天雷玉璧</span>，",
				"· <span class=firetext>天雷玉璧</span>可升级为<span class=yellowtext>神雷玉璧</span>，",
				"· <span class=firetext>毒</span>可锻造为<span class=yellowtext>毒箭</span>，",
				"· <span class=firetext>青龙刀</span>可锻造为<span class=yellowtext>锁龙偃月刀</span>，",
				"· <span class=firetext>方天画戟</span>和<span class=firetext>乌铁锁链</span>可锻造为<span class=yellowtext>方天锁链鞭</span>。",
				"· <span class=firetext>铜雀</span>可锻造为<span class=yellowtext>界铜雀</span>。",
				"· <span class=firetext>护心镜</span>可锻造为<span class=yellowtext>白虎镜</span>。"
				];
				
				var more=ui.create.div('.help','<div style="border:2px solid gray"><P align=left>'+log.join('<br>')+'</P>');
				this.parentNode.insertBefore(more, this.nextSibling);
				this.help=more;
				this.innerHTML='<span class="yellowtext">查看介绍</span><span style="color:#ff00cc"><font size="4px">▼▼▼</font></span>';
			}else{
				this.parentNode.removeChild(this.help);
				delete this.help;
				this.innerHTML='<span class="yellowtext">查看介绍</span><span style="color:#ff00cc"><font size="4px">▶▶▶</font></span>';
			};
		},
	},
	// "ybslb_help":{
	// 	"nopointer":true,
	// 	"name":"<span class=firetext>夜</span><span class=yellowtext>白</span><font color=cyan>神</font><span class=thundertext>略</span>",
	// 	"init":"1",
	// 	"item":{
	// 		"1":"<span style='color:#ff00cc'>查看介绍</span>",
	// 		"2":"若这段话挤满整个页面，<span style='color:#ff00cc'>请点这</span>然后点<span style='color:#ff00cc'>查看介绍</span>，",
	// 		"3":"未加入到启动代码的那些东西别乱动，都是没做完，不能用的",
	// 		"4":"除原版马均公式外，还有以下马均不能的，",
	// 		"5":"<li><span class=firetext>王追</span>可升级成为<span class=yellowtext>乌云踏雪</span>，",
	// 		"6":"<li><span class=firetext>赤兔</span>可升级为<span class=yellowtext>烈焰赤兔</span>，",
	// 		"7":"<li><span class=firetext>朱雀扇</span>、<span class=firetext>赤炎琴</span>和<span class=firetext>五行扇</span>可升级为<span class=yellowtext>北斗七星扇</span>，",
	// 		"8":"<li><span class=firetext>倚天剑</span>可升级为<span class=yellowtext>七星龙渊剑</span>，",
	// 		"9":"<li>黑桃<span class=firetext>闪电</span>、<span class=firetext>太公阴符</span>和<span class=firetext>浮雷</span>可升级为<span class=yellowtext>阴勾玉</span>，",
	// 		"10":"<li>非黑桃<span class=firetext>闪电</span>、<span class=firetext>洪水</span>和<span class=firetext>火山</span>可升级为<span class=yellowtext>阳勾玉</span>，",
	// 		"11":"<li><span class=firetext>阴/阳勾玉</span>在装备区时，用<span class=firetext>阳/阴勾玉</span>替掉就会合成<span class=yellowtext>天雷玉璧</span>，",
	// 		"12":"<li><span class=firetext>天雷玉璧</span>可升级为<span class=yellowtext>神雷玉璧</span>，",
	// 		"13":"<li><span class=firetext>毒</span>可锻造为<span class=yellowtext>毒箭</span>。"
	// 	}
	// },
	"ybslb_jiaqun":{
		name:'<span class="yellowtext">欢迎加群</span><span style="color:#ff00cc"><font size="4px">▶▶▶</font></span>',
		clear:true,
		onclick:function(){
			if(this.jiaqun==undefined){
				var more=ui.create.div('.jiaqun','<div style="border:2px solid gray"><span><img style=width:238px src='+lib.assetURL+'extension/夜白神略/ybslb_QQ.jpg></span>');
				this.parentNode.insertBefore(more, this.nextSibling);
				this.jiaqun=more;
				this.innerHTML='<span class="yellowtext">欢迎加群</span><span style="color:#ff00cc"><font size="4px">▼▼▼</font></span>';
			}else{
				this.parentNode.removeChild(this.jiaqun);
				delete this.jiaqun;
				this.innerHTML='<span class="yellowtext">欢迎加群</span><span style="color:#ff00cc"><font size="4px">▶▶▶</font></span>';
			};
		},
	},
	// "ybsl_skillstrengthen":{
	// 	name:"技能加强（需重启）",
	// 	intro:"加强部分武将技能，有其它想加强的可跟作者许愿。"
	// 	+"<br>当前加强的有："
	// 	+"<br><span class=firetext>佐藤雏</span>的<span class=yellowtext>神视</span>，"
	// 	+"<br><span class=firetext>张琪瑛</span>的<span class=yellowtext>所有技能</span>，"
	// 	+"<br><span class=firetext>篝酱</span>的<span class=yellowtext>纵丝</span>，"
	// 	+"<br><span class=firetext>马均</span>的<span class=yellowtext>精械</span>，"
	// 	+"<br><span class=firetext>神诸葛亮</span>的<span class=yellowtext>七星</span>和<span class=yellowtext>狂风</span>，"
	// 	+"<br>因原版<span class=yellowtext>铜雀</span>被作者加入天火煅升级公式，故此移除，"//
	// 	+"<br><span class=firetext>曹金玉</span>的<span class=yellowtext>隅泣</span>，"
	// 	+"<br><span class=firetext>神户小鸟</span>的<span class=yellowtext>所有技能</span>。",
	// 	init:true,
	// },
	'ybsl_func':{
		name:'<span class="yellowtext">夜白函数详情说明</span><span style="color:#ff00cc"><font size="4px">▶▶▶</font></span>',
		clear:true,
		onclick: function(){
			if(this.help==undefined){
				var log=[
				"有点长，阅读全文需做好心理准备<br>",
				"· YB_HpTo",
				"完整写法为：player.YB_HpTo(num)，括号内填写整数即可。",
				"作用是将角色血量直接调整至该数值，且不触发相关技能。若目标血上限小于目标数值，则会把血条撑到这个数值。（夜白的牛刀小试）<br>",
				"· YB_yuqi",
				"完整写法为：player.YB_yuqi(i,target)，参数i为数组，target为目标角色，两个参数不能调换顺序。",
				"作用是对参数target使用隅泣，参数i为数组，必须要填。",
				"['隅泣',3,1,1]第一个参数为这个隅泣显示的名字，第二个参数为观看牌的数量，第三个参数是给目标的数量，第四个参数是给自己的数量。",
				"参数target为隅泣的目标，不填默认为自己。<br>",
				"· YB_fuhan",
				"完整写法为：player.YB_fuhan(i,type)，参数i为数组，type为扶汉类型，两个参数不能调换顺序。",
				"作用是player执行扶汉，类型为type，type不填为默认扶汉，填'tw'则为tw赵襄的扶汉模式，填'old'则为旧版扶汉。",
				"i参数不填则为默认参数，详情在下方具体列举<br>",
				"默认扶汉：默认参数i为['all',5,2,,'all',]。若创建了i的集合，则不论参数填写与否，英文逗号必须保留。作用是从参数一所列势力中抽取参数二张武将牌，<span class=yellowtext>player挑选至多参数三个技能获得之</span>，抽取的武将排除掉参数四所列举的武将，抽取的武将性别限定为参数五，第六个参数筛选是否为主公。",
				"第一个参数为势力筛选，是个嵌套数组，需要列举势力id（例['wei','shu']），若不输入数组或输入all则为所有势力；第二个参数为抽取武将的数量，不填默认为5；<span class=yellowtext>第三个参数为挑选技能的数量，不填默认为2</span>；第四个参数是被筛除的武将，是个嵌套的数组，需在其中列举（例['zuoci','huatuo']），默认为空，即不筛选；第五个参数为性别筛选，是个嵌套的数组，需在其中列举（例['male','double']），不填数组或填入'all'则不筛选势力；第六个参数筛选是否为主公，填'zhu'则挑选主公。填'nozhu'则挑选非主公，填其他或不填则不筛选。<br>",
				"tw扶汉：默认参数i为['all',5,,,'all',]。若创建了i的集合，则不论参数填写与否，英文逗号必须保留。作用是从参数一所列势力中抽取参数二张武将牌，<span class=yellowtext>player挑选一个获得其技能</span>，抽取的武将排除掉参数四所列举的武将，抽取的武将性别限定为参数五，第六个参数筛选是否为主公。",
				"第一个参数为势力筛选，是个嵌套数组，需要列举势力id（例['wei','shu']），若不输入数组或输入all则为所有势力；第二个参数为抽取武将的数量，不填默认为5；<span class=yellowtext>第三个参数为发动此技能的角色id，乱填不知会有何后果，不填默认为player的主将</span>；第四个参数是被筛除的武将，是个嵌套的数组，需在其中列举（例['zuoci','huatuo']），默认为空，即不筛选；第五个参数为性别筛选，是个嵌套的数组，需在其中列举（例['male','double']），不填数组或填入'all'则不筛选势力；第六个参数筛选是否为主公，填'zhu'则挑选主公。填'nozhu'则挑选非主公，填其他或不填则不筛选。<br>",
				"旧版扶汉：默认参数i为['all',5,,,'all',]。若创建了i的集合，则不论参数填写与否，英文逗号必须保留。作用是从参数一所列势力中抽取参数二张武将牌，<span class=yellowtext>player挑选一个将参数三武将替换为所选武将</span>，抽取的武将排除掉参数四所列举的武将，抽取的武将性别限定为参数五，第六个参数筛选是否为主公。",
				"第一个参数为势力筛选，是个嵌套数组，需要列举势力id（例['wei','shu']），若不输入数组或输入all则为所有势力；第二个参数为抽取武将的数量，不填默认为5；<span class=yellowtext>第三个参数为被替换角色的id，乱填不知会有何后果，不填默认为player的主将</span>；第四个参数是被筛除的武将，是个嵌套的数组，需在其中列举（例['zuoci','huatuo']），默认为空，即不筛选；第五个参数为性别筛选，是个嵌套的数组，需在其中列举（例['male','double']），不填数组或填入'all'则不筛选势力；第六个参数筛选是否为主公，填'zhu'则挑选主公。填'nozhu'则挑选非主公，填其他或不填则不筛选。",
				"综上。<br>",
				"· YB_shelie",
				"完整写法是：player.YB_shelie(num,i,log)，各个参数不能调换顺序",
				"作用是player展示牌堆顶num张牌，获取其中每种花色至多一张，参数i为窗口显示的名字，默认为涉猎，参数log若为true，则强制选择每种花色各一张。",
				"参数num不填默认为5，参数i不填默认为“涉猎”，参数log若为true则表示强制选择<br>",
				"· YB_control",
				"完整写法是：player.YB_control(control,num,str)，各个参数不能调换顺序",
				"作用是若不为玩家操作，则player.chooseControl(control)①，否则玩家进行一个可翻页的player.chooseControl(control)，参数num为每页的按钮数，log为选按钮时显示的字幕",
				"请勿在翻页选择时托管，翻页的界面ai不会选……",
				"player.YB_control()可以接.set('ai',function(control){巴拉巴拉})，会接在上面①的位置用来提供ai思考。<br>",
				"· YB_1234",
				"完整写法是：get.YB_1234(list)，list必须为一组玩家的集合",
				"作用是从当前视角重新排列list。<br>",
				"· YB_tobo",
				"完整写法是：get.YB_tobo(cards)，cards必须为一组每一项都可以翻译的集合",
				"作用是将cards每个元素都翻译出来。<br>",
				"· YB_zhiheng",
				"完整写法是：player.YB_zhiheng(list)，list需为一组卡牌",
				"作用是玩家弃置这些牌，再摸等量牌。<br>",
				// "· YB_chongzhu",
				// "完整写法是：player.YB_chongzhu(card)，card需为一组卡牌",
				// "作用是玩家将这些牌置入弃牌堆，再摸等量牌。<br>",
				"· North_bmh_chizhang",
				"完整写法是：get.North_bmh_chizhang(player)，player需为场上一名角色",
				"作用是获取player的所有已发动限定技。<br>",
				"· YB_sblijian",
				"完整写法是：player.YB_sblijian(list)，list需为一组玩家的集合",
				"作用是令list里的角色依次对处于此集合中的上家使用决斗。<br>",
				"· FY_chooseText",
				"完整写法是：player.FY_chooseText()，",
				"作用是令玩家自由输入文本（来自福瑞拓展）<br>",
				"· YB_suit",
				"完整写法是：get.YB_suit(cards,i)，cards必须为一组有属性的集合，i不写默认为suit",
				"作用是不重复的获取cards每个元素的get[i]属性。<br>",
				"",
				];
				
				var more=ui.create.div('.help','<div style="border:2px solid gray"><P align=left>'+log.join('<br>')+'</P>');
				this.parentNode.insertBefore(more, this.nextSibling);
				this.help=more;
				this.innerHTML='<span class="yellowtext">夜白函数详情说明</span><span style="color:#ff00cc"><font size="4px">▼▼▼</font></span>';
			}else{
				this.parentNode.removeChild(this.help);
				delete this.help;
				this.innerHTML='<span class="yellowtext">夜白函数详情说明</span><span style="color:#ff00cc"><font size="4px">▶▶▶</font></span>';
			};
		},
	},
	
	"夜白神略的自动更新素材开关":{
		"name":"<b>自动导入素材</b>",
		'init': true,
		'intro': '<font color=\'#ADEAEA\'>开启后将自动检测并导入图片素材',
	},
	"ybsl_cardPile":{
		"name":"<b>牌堆选取</b>",
		"intro":"使用夜白神略的专属牌堆替换当前牌堆（必须开启夜白卡包和boss搬运卡包才会生效）（会与其他牌堆替换冲突）（为了便于测试，特地在标准军争牌堆加了两张煽风点火）",
		"init":lib.config.ybsl_cardPileReplace===undefined?"close":lib.config.ybsl_cardPileReplace,
		"item":{
			"ybslCardPile":"夜白自用牌堆（共551张）",//（共547张）
			//大牌堆更耐玩
			"ybslminiCardPile":"夜白迷你牌堆（约4副扑克）",
			//又爽又耐玩
			"ybslExtraCardPile":'标准军争牌堆',
			"close":"关闭",
		},
		onclick:function(item){
			game.saveConfig('extension_夜白神略_ybsl_cardPile',item);
			game.saveConfig('ybsl_cardPileReplace',item);
		}
	},
	"ybsl_wujinshilian":{
		name:"无尽试炼（需重启）",
		intro:"经实验发现，夜白国战和无尽试炼不可兼得，开了无尽试炼玩不了夜白国战，不知为何。"
		+"<br><span class=yellowtext>夜白国战</span>："
		+"<br>将夜白包武将加入国战。"
		+"<br>平衡有待调整。"
		+"<br><span class=yellowtext>夜白旅程</span>："
		+"<br>已挑战过的敌人会作为可选队友出现在列表中；"
		+"<br>加入选项：弃置五张牌，然后凭空印制花中四君子各一张。"
		+"<br><span class=yellowtext>夜白塔防</span>："
		+"<br>可以自由点将；"
		+"<br>其它有待魔改。",
		init:"lc",
		"item":{
			// "gz":"<span class=yellowtext>夜白国战</span>",//以后有机会做一个国战将池
			"lc":"<span class=yellowtext>夜白旅程</span>",
			// "qbd":"<span class=yellowtext>寻你千百度</span>",
			// "tf":"<span class=yellowtext>夜白塔防</span>"//大饼，大坑
		}
	},
	"ybsl_loglog":{
		name:"log发生器（已禁用）",
		intro:"开启后，场上角色每次执行操作都会log一遍所有参数。（参数或时机有遗漏欢迎补充）"
		+"<br>由于会导致卡顿，请在适时使用。"
		+"<br>如果由于私自开启导致出现无法关闭，重启的bug，请游戏外前往主代码区把条件检测改成别的",
		"init":"关闭",
		"item":{
			// "开启":"<span class=yellowtext>开启</span>",
			"关闭":"<span class=yellowtext>关闭</span>"
		}
	},
	"ybsl_wujianghouxuan":{
		name:"夜白旅程候选",
		intro:"<span class=yellowtext>夜白旅程可选敌方的数量，需开启无尽试炼。</span>",
		init:"5",
		"item":{
			"3":"三",
			"4":"四",
			"5":"五",
			"6":"六",
			"7":"七",
			"8":"八",
			"9":"九",
			"10":"十",
			"11":"十一",
			"12":"十二",
			"13":"十三",
			"14":"十四",
			"15":"十五"
		}
	},

}

export const help = {
	'夜白神略':'总有游客玩我的扩展不开将包，然后找不到别的武将呢，说没意思。现在我希望你能耐心读指引。'
	+'<br>首先打开菜单，去武将列表下翻找到夜白将包和六艺篇，打开，然后去卡牌列表下翻找到夜白牌堆，打开（BOSS搬运看心情开），然后重启就OK了。',

	"六艺篇":"<li>关于六艺系列"
	+"<br>六艺区是夜白神略包创立的机制。六艺区相当于一个私人的木牛流马，可以如手牌般使用或打出。"
	+"<br>出牌阶段限一次，你可以将一张手牌置入六艺区，然后若六艺区牌数大于等于3，则获得精艺（精艺：每当你失去一张六艺区的牌时，你摸一张牌。）六艺区至多为6。"
	+"<br>与此同时，作者同时推出了六艺技，其特征是可以通过对六艺区牌的应用来触发效果。需要注意的是，某些技能虽然和六艺区有关，但作者并没有给它定义为六艺技，因为它只是额外的把牌放入六艺区而并没有利用。",
	
	// "结阵技":"<li>关于结阵技"
	// +"<br>结阵是夜白神略包三传分包创立的机制。"
	// // +"<br>出牌阶段限一次，若你未处于阵列，你可以选择至多两名其他角色发起结阵，然后设定你为阵眼；若你处于阵列且不是阵眼，你可以将阵眼转移给你。"
	// // +"<br>出牌阶段限一次，若你处于阵列，你可以解除你所处的阵列。"
	// // +"<br>同一角色仅能加入一个阵列，假如某个成员自私的退出了阵列，那么阵列便会直接破解。"
	// // +"<br>同一阵列内彼此伤害豁免，一些技能会因为阵列或阵眼而发生变化。大嘴表示：快给我个结阵技。"
	// +"<br>有结阵技的角色出牌阶段限一次，若其未结阵，其可以选择至多两名其他角色进行结阵，发起结阵的角色称为阵眼。"
	// +"<br>若其已结阵，且其有结阵技，其可以消耗结阵次数，将阵眼改为自己。"
	// +"<br>每名角色的出牌阶段限一次，若其处于结阵状态，其可以解除结阵状态。"
	// +"<br>一名角色仅能加入一个阵列。"
	// +"<br>同一阵列内的成员造成的伤害对彼此豁免，一些技能会因为阵列或阵眼而发生变化。大嘴表示：快给我个结阵技。"

}
export const files = {
	"character": [], "card": [], "skill": []
}