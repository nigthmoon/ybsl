import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export { skill }

const skill = {
	//-------------------------
	rewrite_goujiangdesidai_skill: {
		inherit: 'kagari_ybzongsi',
		filter: function(event, player) {
			return !player.hasSkill('kagari_ybzongsi') || player.getStat('skill').kagari_ybzongsi;
		},
	},
}
