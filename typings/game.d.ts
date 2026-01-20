/**
 * 夜白神略 - Game 对象扩展类型定义
 */
import {} from '@/noname.js'

declare module '@/noname.js' {
  interface Game {
    /**
     * 点燃输入卡组
     * @param list 卡牌数组
     */
    YB_fire(list: Card[]): void

    /**
     * 熄灭输入卡组
     * @param list 卡牌数组
     */
    YB_nofire(list: Card[]): void

    /**
     * 创建卡牌
     * @param name 卡牌名称或卡牌对象
     * @param suit 花色（可选）
     * @param number 点数（可选）
     * @param nature 属性（可选）
     * @param tag 标签（可选）
     * @returns 创建的卡牌对象
     */
    YB_createCard(
      name: string | { name: string; suit?: string; number?: number | string; nature?: string; tag?: string[] },
      suit?: string,
      number?: number | string,
      nature?: string,
      tag?: string[]
    ): Card

    /**
     * 用来给一个卡牌或伤害添加属性
     * @param trigger 需要被增加属性的对象（卡牌或伤害事件）
     * @param nature 需要加进去的属性
     */
    YB_addNature(trigger: any, nature: string): void

    /**
     * 为指定的技能添加音频映射，支持多个角色使用同一个技能念不同的语音
     * @param objects 音频映射对象数组，每个元素为 [目标技能名, {源技能名: 音频名}]
     *
     * @example
     * game.YB_addAudio(
     *   ['retieji', {sgskjdbzjms_zhen_machao: 'shouli'}]
     * );
     */
    YB_addAudio(...objects: [string, { [key: string]: string }][]): void

    /**
     * 复制技能的audioname和audioname2属性到另一个技能，实现音频共享
     * @param objects 音频名映射对象数组，每个元素为 [目标技能名, 源技能名]
     *
     * @example
     * game.YB_addAudioName(['ybmjz_tiandu', 'tiandu']);
     */
    YB_addAudioName(...objects: [string, string][]): void
  }
}
