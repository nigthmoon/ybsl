"use strict";
game.import('character',function(lib, game, ui, get, ai, _status){ 
	var ybup={ 
		name:'ybup',//武将包命名（必填） 
		connect:true,//该武将包是否可以联机（必填） 
		characterSort:{
			ybup:{
				
			},
		},
		character:{ //武将格式 : 
			
		},
		skill:{//技能
			
		},
		translate:{//翻译
			
		},
	};
	if(lib.device||lib.node){ 
		for(var i in ybup.character){ybup.character[i][4].push('ext:夜白神略/image/update/'+i+'.jpg');} 
	}else{ 
		for(var i in ybup.character){ybup.character[i][4].push('db:extension-夜白神略:'+i+'.jpg');} 
	}//由于以此法加入的武将包武将图片是用源文件的，所以要用此法改变路径 
	return ybup; 
});