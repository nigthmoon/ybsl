/**
 * 夜白神略扩展类型定义
 * 扩展全局的 importCharacterConfig 接口
 * 添加自定义字段: characterCopyright, characterCitetext, characterUndertext, accessoryPacket, characterLightextParent, characterLightext
 */

declare interface importCharacterConfig {
    /**
     * 版权信息
     *
     * 显示在武将介绍的最上方
     */
    characterCopyright?: SMap<string>;

    /**
     * 上引文
     *
     * 显示在武将介绍中,通常用于引用古诗词或其他文本
     */
    characterCitetext?: SMap<string>;

    /**
     * 下引文
     *
     * 显示在武将介绍的底部或技能之后
     */
    characterUndertext?: SMap<string>;

    /**
     * 附属将包
     *
     * 关联的附属武将包信息
     */
    accessoryPacket?: SMap<any>;

    /**
     * 缘分信息(函数形式)
     *
     * 函数,用于判断和生成武将的缘分点亮信息
     * @param name - 武将名称或玩家对象
     * @returns 缘分信息数组
     */
    characterLightextParent?: SMap<(name: string | Player) => string[]>;

    /**
     * 编译后的缘分信息
     *
     * 已经编译完成的缘分信息,用于显示在武将介绍中
     * @param name - 武将名称或玩家对象
     * @returns 缘分信息数组
     */
    characterLightext?: SMap<(name: string | Player) => string[]>;

    // /**
    //  * 武将配置（带夜白神略扩展）
    //  *
    //  * 覆盖原 character 字段，添加自定义字段类型支持
    //  */
    // character?: (
    //     | [Sex, string, number | string, string[], string[]]
    //     | [Sex, string, number | string, string[]]
    //     | (import('@/library/element/character.js').Character & {
    //         /**
    //          * 用于读取输入值的对应的本体武将图片
    //          * @example YB_mjz: 'puyuan'
    //          */
    //         YB_mjz?: string;

    //         /**
    //          * 关联武将
    //          *
    //          * 用于加入输入值的换将列表
    //          * @example linkTo: 'puyuan'
    //          */
    //         linkTo?: string;

    //         /**
    //          * 武将稀有度
    //          *
    //          * 用于武将抽取系统的稀有度权重配置
    //          * @example rankAdd: 'legend'
    //          */
    //         rankAdd?: 'legend' | 'epic' | 'rare' | 'junk';

    //         /**
    //          * 武将品质
    //          *
    //          * 武将的品质等级标识
    //          * @example rankS: 's'
    //          */
    //         rankS?: 's' | 'ap' | 'a' | 'am' | 'bo' | 'b' | 'bm' | 'c' | 'd';
    //     })
    // )[];
}