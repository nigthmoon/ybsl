import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'
export {card};
const card = {
	rewrite_goujiangdesidai: {
		type: 'equip',
		subtype: 'equip1',
		distance: {
			attackFrom: -6
		},
		skills: ['rewrite_goujiangdesidai_skill'],
		modeimage: 'boss',
		ai: {
			basic: {
				equipValue: 8.5,
			},
		},
		fullskin: true,
	},
}