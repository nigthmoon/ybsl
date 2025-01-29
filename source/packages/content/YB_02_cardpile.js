import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
// import { config } from '../config.js'
export { YBSL_cardpile }
/**
 * 掌管改变牌堆的功能
 */
const YBSL_cardpile = function(){
	//-------------改变牌堆-----------搬自时空枢纽
	if(lib.config.cards.includes('ybslc')&&lib.config.cards.includes('ybgod')&&lib.config.ybsl_cardPileReplace){
		if(lib.config.ybsl_cardPileReplace=='ybslCardPile'){
			lib.arenaReady.push(function(){
				lib.init.js(lib.assetURL+'extension/夜白神略/source/pile',lib.config.ybsl_cardPileReplace,function(){
					if(lib&&window.cardPile){
						lib.card.list.splice(0,lib.card.list.length);
						if(typeof window.cardPile=='function'){
							window.cardPile=window.cardPile();
						}
						lib.card.list.addArray(window.cardPile);
						lib.card.list.randomSort();
						game.ybsl_cardPile_on=true;
					}
				})
			})
		}
		else if(lib.config.ybsl_cardPileReplace=='ybslminiCardPile'){
			lib.arenaReady.push(function(){
				lib.init.js(lib.assetURL+'extension/夜白神略/source/pile',lib.config.ybsl_cardPileReplace,function(){
					if(lib&&window.minicardPile){
						lib.card.list.splice(0,lib.card.list.length);
						if(typeof window.minicardPile=='function'){
							window.minicardPile=window.minicardPile();
						}
						lib.card.list.addArray(window.minicardPile);
						lib.card.list.randomSort();
						game.ybsl_cardPile_on=true;
					}
				})
			})
		}
		else if(lib.config.ybsl_cardPileReplace=='ybslExtraCardPile'){
			lib.arenaReady.push(function(){
				lib.init.js(lib.assetURL+'extension/夜白神略/source/pile',lib.config.ybsl_cardPileReplace,function(){
					if(lib&&window.extracardPile){
						lib.card.list.splice(0,lib.card.list.length);
						if(typeof window.minicardPile=='function'){
							window.extracardPile=window.extracardPile();
						}
						lib.card.list.addArray(window.extracardPile);
						lib.card.list.randomSort();
						game.ybsl_cardPile_on=true;
					}
				})
			})
		}
	}
}