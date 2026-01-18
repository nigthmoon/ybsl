/**
 * 夜白神略 - Game 对象扩展类型定义
 */

declare module "noname" {
	interface Game {
		/**
		 * 点燃输入卡组
		 * @param list 卡牌数组
		 */
		YB_fire(list: Card[]): void;

		/**
		 * 熄灭输入卡组
		 * @param list 卡牌数组
		 */
		YB_nofire(list: Card[]): void;

		/**
		 * 创建卡牌
		 * @param name 卡牌名称或卡牌对象
		 * @param suit 花色（可选）
		 * @param number 点数（可选）
		 * @param nature 属性（可选）
		 * @param tag 标签（可选）
		 * @returns 创建的卡牌对象
		 */
		YB_createCard(name: string | { name: string; suit?: string; number?: number | string; nature?: string; tag?: string[] }, suit?: string, number?: number | string, nature?: string, tag?: string[]): Card;

		/**
		 * 用来给一个卡牌或伤害添加属性
		 * @param trigger 需要被增加属性的对象（卡牌或伤害事件）
		 * @param nature 需要加进去的属性
		 */
		YB_addNature(trigger: any, nature: string): void;
	}
}
