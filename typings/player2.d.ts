/**
 * 夜白神略 - Player 对象扩展类型定义
 */
import {} from "@/noname/library/element/player.js";

declare module "@/noname/library/element/player.js" {
  interface Player {
    /**
     * 创建一个分配卡牌的事件。
     * - 遍历输入的元素，根据类型自动识别并赋值给 `cards`、`str` 和 `num`。
     * - 将 `cards` 中的 `num` 张牌分配给场上角色，分配时的提示信息为 `str`。
     *
     * @param  args  输入的元素（可以是卡牌组`cards`、字符串`str`、数字`num`，顺序不固定）。
     * @returns  返回创建的事件对象。
     *
     * @example
     * const cards = [{ id: 1, name: '杀' }, { id: 2, name: '闪' }];
     * const event = lib.element.player.YB_yiji(cards, '请选择一张牌', 1);
     * console.log(event);
     */
    YB_yiji(
      ...args: (
        | number
        | string
        | GameEvent[]
        | ((card: Card, player: Player, target: Player) => boolean)
      )[]
    ): GameEvent;

    /**
     * 创建一个分配卡牌的事件。
     * - 遍历输入的元素，根据类型自动识别并赋值给 `cards`、`boolyb`、`str` 和 `num`。
     * - 将 `cards` 中的 `num` 张牌分配给场上角色，分配时的提示信息为 `str`。
     * - `boolyb` 是一个布尔值，若为 true，则仅从输入的 `cards` 中选择卡牌进行分配；若为 false，则从玩家的所有手牌（`h`）中选择。
     * - fun 是一个函数，用于筛选被分配的目标
     *
     * @param args 输入的元素（可以是卡牌组、布尔值、字符串、数字，顺序不固定）。
     * @returns 返回创建的事件对象。
     *
     * @example
     * const cards = [{ id: 1, name: '杀' }, { id: 2, name: '闪' }];
     * const event = lib.element.player.YB_liangying(cards, true, '请选择一张牌', 1);
     * console.log(event);
     */
    YB_liangying(...args: any[]): GameEvent;
    /**
     * 临时获得标记用的子技能并获得标记，
     * - 若没有对应的子技能会当场创建该子技能
     * @param skill 此参数输入技能id
     * @param num 此参数输入获得的标记数
     */
    YB_temp(skill: string, num?: number): GameEvent;
    /**
     * 临时获得标记用的子技能并静默获得标记，
     * - 若没有对应的子技能会当场创建该子技能
     * @param skill 此参数输入技能id
     * @param num 此参数输入获得的标记数
     */
    YB_tempx(skill: string, num?: number): GameEvent;
    /**
     * 临时获得标记用的子技能并显示该技能标记，
     * - 若没有对应的子技能会当场创建该子技能
     * @param skill 此参数输入技能id
     * @param num 此参数输入获得的标记数
     */
    YB_tempy(skill: string, num?: number): GameEvent;
    /**
     *
     * 临时获得子技能`skill`并将此`keys`添加进`skill`标记，
     * - 若没有对应的子技能会当场创建该子技能
     * @param skill 此参数输入技能id
     * @param keys 要添加进`storage[skill]`的元素
     */
    YB_tempz(skill: string, keys: any[]): GameEvent;
    /**
     * 展示牌堆顶`num`张牌并获得其中每种花色各一张牌，
     * - 玩家选择时，不能选择多张同花色的牌。
     *
     * @param num 展示的牌数
     * @param tip 提示信息
     * @param forcedLimit 强制选择最大数量
     */
    YB_shelie(num: number, tip?: string, forcedLimit?: true): GameEvent;
    /**
     * 展示牌堆顶`num`张牌并获得其中每种花色各一张牌，
     * - 玩家选择时，不能选择多张同花色的牌。
     *
     * @param num 展示的牌数
     * @param forcedLimit 强制选择最大数量
     */
    YB_shelie(num: number, forcedLimit?: true): GameEvent;
    /**
     *
     * @param i 按顺序填入元素的数组，包含以下元素：
     * @param group 筛选的势力范围，用数组`[]`写一个或多个，或者写`all`表示全势力范围
     * @param charNum 抽取的武将数量，不写默认为`5`，建议写上，不知道啥时候会优化
     * @param selectLimitOrId 若不写`type`，则写`number`，代表选择的技能数，若`type`为`'old'`，则写武将的`'id'`，代表进行替换的武将，若`type`为`'tw'`，则写技能的`'id'`，代表进行提示的技能，
     * @param exclude 排除的武将id数组，不写默认为空数组
     * @param sex 筛选特定的性别，用数组`[]`写一个或多个，或者写`'all'`表示全性别，不写默认为`'all'`
     * @param scope 若不写，则为全范围，若写`'zhu'`，则只筛选主公，若`'nozhu'`，则只筛选非主公
     * @param type 选填，默认不写，若不写，则获得`selectLimitOrId`技能，若写`'old'`，则将`selectLimitOrId`替换为目标武将，若写`'tw'`，则直接获得目标武将的技能，
     * @returns
     */
    YB_fuhan(
      i: [
        group: string | string[],
        characterNum?: number,
        selectLimitOrId?: number | string,
        exclude?: string[],
        sex?: Sex[] | "all",
        scope?: "zhu" | "nozhu",
      ],
      type?: "tw" | "old",
    ): GameEvent;
    /**
     * 令这些角色谋离间
     * @param list 要进行操作的角色们
     *
     * @example
     * const event = lib.element.player.YB_sblijian(list);
     * console.log(event);
     */
    YB_sblijian(list: Player[]): GameEvent;
    /**
     * 将手牌数摸或弃至指定值
     *
     * @param num 要调整的目标数量
     * @returns
     */
    YB_changeHandCard(num: number): GameEvent;
    /**
     * 中流
     */
    YB_zhongliu(): GameEvent;
    /**
     * 将体力值调整至指定数值
     * @param num 目标体力值
     * @returns
     */
    YB_HpTo(num: number): GameEvent;
    /**
     * 重置势极技状态
     * @param i true表示重置阴极，false表示重置阳极
     */
    YB_shiji(i?: boolean): void;
    /**
     * 控制按钮翻页选择
     * @param control 选项数组
     * @param num 每页显示数量
     * @param str 提示信息
     * @returns
     */
    YB_control(control: string[], num?: number, str?: string): GameEvent;
    /**
     * 控制按钮翻页选择
     * @param control 选项数组
     * @param str 提示信息
     * @returns
     */
    YB_control(control: string[], str?: string): GameEvent;
    /**
     * 隅泣函数，分配牌堆顶牌给不同角色
     * @param list 数组，包含文字提示、展示数量、对方数量、自己数量等信息
     * @param tip 文字提示
     * @param cardCount 展示数量
     * @param targetLimit 对方数量
     * @param playerLimit 自己数量
     * @param target 目标角色 不填为自己
     * @returns
     */
    YB_yuqi(
      list: [
        tip: string,
        cardCount: number,
        targetLimit: number,
        playerLimit: number,
      ],
      target?: Player,
    ): GameEvent;
    /**
     * 24点算演小游戏
     * @param cards 卡牌数组
     * @param log 提示信息 （但是好像没用到）
     * @returns
     */
    FY_24(cards: Card[], log?: string): GameEvent;
    /**
     * 文本输入选择
     * @param args 多个参数，包括提示信息、过滤函数等
     * @returns
     */
    FY_chooseText(...args: any[]): GameEvent;
    /**
     * 升级指定技能
     * @param str 要升级的技能ID数组
     */
    YB_levelUp(str: string[]): void;
    /**
     * 翻牌小游戏
     * @returns
     */
    YB_playTurnCard(): GameEvent;
    /**
     * 命名小游戏
     * @returns
     */
    YB_name(): GameEvent;
    /**
     * 判断目标角色是否可以吃零食的函数
     * @returns 返回是否可以吃零食
     *
     * @example
     * const canEat = player.YB_canEat();
     * console.log(canEat);
     */
    YB_canEat(): boolean;
    /**
     * 判断目标角色饱食度上限的函数
     * @returns {number} - 返回饱食度上限
     *
     * @example
     * const maxBaoshi = player.YB_maxBaoshi();
     * console.log(maxBaoshi);
     */
    YB_maxBaoshi(): number;
    /**
     * 增加饱食度的函数，没有判断上限
     * @param num 要增加的饱食度数值
     *
     * @example
     * player.YB_addBaoshidu(1);
     */
    YB_addBaoshidu(num: number): void;
    /**
     * 获取角色的最大蓝量值
     * @returns 返回最大蓝量值
     *
     * @example
     * const maxMana = player.YB_yzdel_maxMana();
     * console.log(maxMana);
     */
    YB_yzdel_maxMana(): number;
    /**
     * 获取角色剩余可获得的蓝量值
     * @returns 返回剩余蓝量空间
     *
     * @example
     * const noneMana = player.YB_yzdel_noneMana();
     * console.log(noneMana);
     */
    YB_yzdel_noneMana(): number;
    /**
     * 增加角色的蓝量值
     * @param num 要增加的蓝量数值
     *
     * @example
     * player.YB_gainMana(5);
     */
    YB_gainMana(num: number): void;
    /**
     * 减少角色的蓝量值
     * @param num 要减少的蓝量数值
     *
     * @example
     * player.YB_loseMana(3);
     */
    YB_loseMana(num: number): void;
    /**
     * 更新角色的Mana条显示
     *
     * @example
     * player.YB_updateMana();
     */
    YB_updateMana(): void;
    /**
     * 久岛鸥【扬帆】技能处理函数
     * - 从手牌中选择4张牌分别标记为鹰(kamome_ybyangfan_ying)、燕(kamome_ybyangfan_yan)、隼(kamome_ybyangfan_sun)、雀(kamome_ybyangfan_que)四种标签
     * - 如果cards不指定，默认使用手牌
     * - 会自动检测并补全缺失的标签类型
     *
     * @param cards 要处理的手牌数组（可选，默认为所有手牌）
     *
     * @example
     * player.kamome_ybyangfan(cards);
     */
    kamome_ybyangfan(cards?: Card[]): void;
    /**
     * 夜白神庞统相关函数
     * - 吸收卡组火焰
     */
    YB_nofire(list: Card[]): void;
    /**
     * 夜白神庞统相关函数
     * - 熄灭卡组火焰
     */
    YB_fire(list: Card[]): void;

    /**
     * 获取角色的宗族
     * @param unseen 是否包含隐藏武将
     * @returns 宗族数组
     *
     * @example
     * const clans = player.getClan();
     * console.log(clans); // ['吴郡陆氏']
     */
    getClan(unseen?: boolean): string[];

    /**
     * 摸指定要求的牌
     * @returns 创建的事件对象
     *
     * @example
     * player.YB_drawCard();
     */
    YB_drawCard(): GameEvent;

    /**
     * 特殊恢复函数
     * - 根据受到伤害的数值恢复体力，并增加对应体力上限
     * @param num 目标恢复数值
     * @returns 创建的事件对象
     *
     * @example
     * player.YB_recover(3);
     */
    YB_recover(num: number): GameEvent;

    /**
     * 交换主副将函数
     * @returns 创建的事件对象
     *
     * @example
     * player.YB_exchange();
     */
    YB_exchange(): GameEvent;

    /**
     * 五谷丰登函数（已作废）
     * @param cards 卡牌数组
     * @param str 提示信息
     * @param targets 目标角色
     * @returns 创建的事件对象
     */
    YB_wugu(cards: Card[], str: string, targets: Player[]): GameEvent;
    // TODO: 让夜白自己写吧
    YB_zhuanhuanCard(card: Card): GameEvent
  }
}
