"use strict";
game.import('character',function(lib, game, ui, get, ai, _status){ 
	var ybgz={ 
		name:'ybgz', //武将包命名（必填） 
		connect:true, //该武将包是否可以联机（必填） 
		connectBanned:['gz_ybsl_018zhangqing_feian','gz_ybslshen_002chenailin_feian','db_ybsp_038tengwu'],
		characterSort:{
			ybgz:{
			},
		},
		character:{ //武将格式 : 
			//'武将名字':['性别','势力',体力,[技能],[]], //格式内每一样东西都不能缺少，否则无法导入该武将包及其以下内容 
		}, //武将（必填） 
		characterIntro:{
			
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
			
		},//武将标题（用于写称号或注释）（选填） 
		skill:{
			//-------------------------入梦
			ybsl_rumeng:{
				// audio:'ybsl_sanmeng',
				mainSkill:true,
				available:function (mode){
					if(['guozhan'].contains(mode)) return true;
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
			
		},//技能（必填） ……………………！…！！！【…？。！！？？？？…………
		card:{
			
		},
		translate:{  
			ybsl_mztz2:'梦中陶醉',
			ybsl_rumeng:'入梦',
			ybsl_rumeng_info_guozhan:'主将技，锁定技，当你明置此武将牌时，你将表象势力改为梦（不会影响阵营判断）。',
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
		for(var i in ybgz.character){ybgz.character[i][4].push('ext:夜白神略/image/character/'+i+'.jpg');} 
	}else{ 
		for(var i in ybgz.character){ybgz.character[i][4].push('db:extension-夜白神略:'+i+'.jpg');} 
	}//由于以此法加入的武将包武将图片是用源文件的，所以要用此法改变路径 
	return ybgz; 
}); 
