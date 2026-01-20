declare module "noname" {
	interface Get {
		/**
		 * 判断`player`的同族角色
		 * - 若`bool`为true，则包括自己，否则不包括自己
		 * - 返回同族角色数组
		 *
		 * @param player 进行判断的参考角色
		 * @param bool 是否包括自己
		 * @returns 同族角色数组
		 *
		 * @example
		 */
		YB_clan(player: Player, bool?: boolean): Player[];
		/**
		 * 返回`player`的所有出限一技能
		 *
		 * @param player 进行判断的参考角色
		 * @returns 出限一技能数组
		 *
		 * @example
		 * const skills = get.YB_pu1(player);
		 * console.log(skills);
		 */
		YB_pu1(player: Player): Skill[];
		/**
		 * 逐个翻译
		 * @param cards 输入可翻译的数组
		 * @returns 输出翻译后的数组
		 */
		YB_tobo(cards: unknown[]): string[];
		/**
		 * 逐个翻译，无缝拼接
		 * @param cards 输入可翻译的数组
		 * @returns 输出翻译后的数组，无缝拼接
		 */
		YB_tobo2(cards: unknown[]): string;
		/**
		 * 逐个翻译，用、拼接
		 * @param cards 输入可翻译的数组
		 * @returns 输出翻译后的数组，用、拼接
		 */
		YB_tobo3(cards: unknown[]): string;
		/**
		 * 逐个翻译
		 * @param list 输入要翻译的数组
		 * @param map 输入要翻译的数组的映射
		 * @returns 输出翻译后的数组
		 */
		// REVIEW YB_map(list: PropertyKey[], map: { [key: PropertyKey]: unknown }): unknown[];
		YB_map(list: string[], map: { [key: PropertyKey]: string }): string[];
		/**
		 * 从输入的卡牌组中提取出不重复的花色或类型。
		 *
		 * @param cards 输入的卡牌组。
		 * @param i 要提取的属性，默认为 'suit'。可以传入其他 `get` 对象下的方法名（如 `type2`）。
		 * @returns 包含所有不重复的花色或类型的字符串数组。
		 */
		YB_suit<
			T extends {
				[U in keyof Get]: U extends "YB_suit" | "event" ? never : unknown extends Parameters<Get[U]>[0] ? never : Parameters<Get[U]>[0] extends undefined ? never : Get[U] extends (card: Card) => unknown ? U : never;
			}[keyof Get]
		>(
			cards: Card[],
			i?: T
		): {
			[U in keyof Get]: U extends "YB_suit" | "event" ? never : unknown extends Parameters<Get[U]>[0] ? never : Parameters<Get[U]>[0] extends undefined ? never : Get[U] extends (card: Card) => unknown ? U : never;
		}[keyof Get] extends T
			? string[]
			: ReturnType<Get[T]>[];
		/**
		 * 提取对象的键名数组
		 * - 遍历输入的对象，将所有键名提取到数组中返回
		 *
		 * @param map 要提取键名的对象
		 * @returns {string[]} - 返回包含对象所有键名的数组
		 *
		 * @example
		 * const obj = { spade: '黑桃', heart: '红桃', club: '梅花', diamond: '方块' };
		 * const keys = get.YB_cobo(obj);
		 * console.log(keys); // ['spade', 'heart', 'club', 'diamond']
		 */
		YB_cobo(map: Object[]): string[];
		/**
		 * 输出所有牌的类型，不用写参数
		 * @returns 输出所有牌的类型
		 */
		YB_type(): string[];
		/**
		 * 所有输入牌的类型
		 * @param cards 输入要处理的卡牌组
		 * @returns 输出所有牌的类型
		 */
		YB_type2(cards: Card[]): string[];
		/**
		 * 获取`player`的所有已发动的限定技
		 * @param player 进行判断的参考角色
		 * @returns 已发动的限定技数组
		 *
		 * @example
		 * const skills = get.YB_pu1(player);
		 * console.log(skills);
		 */
		North_bmh_chizhang(player: Player): Skill[];
		/**
		 * 获取对象的键名数组
		 * @param list 输入要提取键名的对象
		 * @returns 键名数组
		 *
		 * @example
		 * const obj = { spade: '黑桃', heart: '红桃' };
		 * const keys = get.YB_key(obj);
		 * console.log(keys); // ['spade', 'heart']
		 */
		YB_key(list: Object): string[];
		// /**
		//  * 创建卡牌
		//  * @param name 卡牌名称或卡牌对象
		//  * @param suit 花色（可选）
		//  * @param number 点数（可选）
		//  * @param nature 属性（可选）
		//  * @param tag 标签（可选）
		//  * @returns 创建的卡牌对象
		//  */
		// const YB_createCard:(name:string|Object,suit?:string,number?:number|string,nature?:string,tag?:string)=>Card;
		/**
		 * 获取卡牌的所有标签
		 * @param card 卡牌对象
		 * @returns 标签数组
		 */
		YB_tag(card: Card): string[];
		/**
		 * 角色集合从主视角按座位排序
		 * @param list 角色数组
		 * @returns 按座位排序后的角色数组
		 */
		YB_1234(list: Player[]): Player[];
		/**
		 * 突袭价值判断
		 * @param player 进行判断的角色
		 * @returns 是否具有突袭价值
		 */
		YB_tuxivalue(player: Player): boolean;
		/**
		 * 突袭价值判断（自定义数量）
		 * @param player 进行判断的角色
		 * @param numx 需要的角色数量
		 * @returns 是否具有突袭价值
		 */
		YB_tuxi2value(player: Player, numx?: number): boolean;
		/**
		 * 移牌价值判断
		 * @param player 进行判断的角色
		 * @returns 是否具有移牌价值
		 */
		YB_movevalue(player: Player): boolean;

		/**
		 * 获取久岛鸥【扬帆】卡片的标签类型
		 * @param card 要检查的卡牌
		 * @returns {string|false} - 返回扬帆类型（'kamome_ybyangfan_ying'/'kamome_ybyangfan_yan'/'kamome_ybyangfan_sun'/'kamome_ybyangfan_que'）或false
		 *
		 * @example
		 * const type = get.kamome_ybyangfan(card);
		 * console.log(type); // 'kamome_ybyangfan_ying' 或 false
		 */
		kamome_ybyangfan(card: Card): 'kamome_ybyangfan_ying' | 'kamome_ybyangfan_yan' | 'kamome_ybyangfan_sun' | 'kamome_ybyangfan_que' | false;

		/**
		 * 获取久岛鸥【扬帆】卡片的标签类型（映射版本）
		 * @param card 要检查的卡牌
		 * @returns {string|false} - 返回扬帆映射（'kamome_ybyangfan_ying'/'kamome_ybyangfan_yan'/'kamome_ybyangfan_sun'/'kamome_ybyangfan_que'）或false
		 *
		 * @example
		 * const map = get.kamome_ybyangfan_map(card);
		 * console.log(map); // 'kamome_ybyangfan_ying' 或 false
		 */
		kamome_ybyangfan_map(card: Card): 'kamome_ybyangfan_ying' | 'kamome_ybyangfan_yan' | 'kamome_ybyangfan_sun' | 'kamome_ybyangfan_que' | false;

		/**
		 * 获取神赐武陆逊的特定数字牌数量
		 * @param player 要检查的角色
		 * @param num 要检查的数字（可选）
		 * @returns {number} - 返回符合条件的牌数量，最小为1
		 *
		 * @example
		 * const count = get.ZC_playerCards(player, 3);
		 * console.log(count);
		 */
		ZC_playerCards(player: Player, num?: number): number;

		/**
		 * 处理武将的缘分点亮系统，返回格式化后的缘分文本
		 * @param list 缘分数组，每个元素为 [缘分名称, {YB_filterOk: Function}]
		 * @param player 当前角色（可选）
		 * @returns {Array} - 返回处理后的缘分文本数组，满足条件的缘分会用特殊颜色显示
		 *
		 * @example
		 * const list = [
		 *   ['缘分1', {YB_filterOk: (p) => p.hp > 2}],
		 *   ['缘分2', {YB_filterOk: (p) => p.maxHp > 3}]
		 * ];
		 * const text = get.characterLightext(list, player);
		 * console.log(text);
		 */
		characterLightext(list: [string, { YB_filterOk: (player: Player) => boolean }][], player?: Player): string[];

		//夜白的神庞统专用
		/**
		 * 夜白神庞统相关函数
		 * - 输出`list`中未点燃的卡
		 *
		 * @param list 卡牌数组
		 * @returns - 输出`list`中未点燃的卡
		 *
		 * @example
		 */
		YB_noflames(list: Card[]): Card[];
		/**
		 * 夜白神庞统相关函数
		 * - 输出`list`中未点燃的卡
		 *
		 * @param list 卡牌数组
		 * @returns - 输出`list`中点燃的卡
		 *
		 * @example
		 */
		YB_flames(list: Card[]): Card[];
		/**
		 * 夜白神庞统相关函数
		 * - 输出火焰数
		 * @param {*} num
		 * @returns
		 */
		YB_fire_num(num: number): number;
		
		/**
		 * 获取重置技列表
		 * @param player 角色
		 * @param skill 技能名
		 * @returns 重置技列表
		 *
		 * @example
		 * const list = get.YB_chongzhijiList(player, 'skill_name');
		 * console.log(list);
		 */
		YB_chongzhijiList(player: Player, skill: string): any[];
		
		/**
		 * 获取重置列表
		 * @param player 角色
		 * @param skill 技能名
		 * @returns 重置列表
		 *
		 * @example
		 * const list = get.YB_chongzhiList(player, 'skill_name');
		 * console.log(list);
		 */
		YB_chongzhiList(player: Player, skill: string): any[];
		
		/**
		 * 判断该角色一次性失去多少张手牌会不再是手牌数最多
		 * @param target 目标角色
		 * @returns 可失去的手牌数量
		 *
		 * @example
		 * const num = get.YB_cardMaxLose(player);
		 * console.log(num);
		 */
		YB_cardMaxLose(target: Player): number;
		
		/**
		 * 获取武将图片路径
		 * @param character 武将名称
		 * @returns 图片路径
		 *
		 * @example
		 * const image = get.YB_characterImage('puyuan');
		 * console.log(image); // 'image/character/puyuan.jpg'
		 */
		YB_characterImage(character: string): string;
		
		/**
		 * 获取YB_mjz属性
		 * @param name 武将名称
		 * @returns YB_mjz值或false
		 *
		 * @example
		 * const mjz = get.YB_mjz('character_name');
		 * console.log(mjz);
		 */
		YB_mjz(name: string): string | false;
	}
}
