# 夜白神略

无名杀扩展 - 夜白神略

## 简介

夜白神略是一个内容丰富的无名杀扩展,包含大量原创武将、卡牌、技能和游戏模式。

## 功能特性

### 武将系统
- **夜白将包** (YB_01/ybslj): 核心武将包,包含大量原创武将 ✅ 完整
- **六艺篇** (YB_02/ybart): 六艺主题武将包 ✅ 完整
- **校花** (YB_03/ybxh): 校花主题武将包 ✅ 完整
- **夜白杂设** (YB_04/ybnew1): ❌ 未启用(代码被注释,已封存)
- **名将传** (YB_08/ybmjz): 名将主题武将包 ✅ 完整
- **夜白接单** (YB_09/ybdd): 定制武将包 ✅ 完整
- **符咒世界** (YB_10/ybMagic): ⚠️ 空包(仅占位符)
- **永恒刻印** (YB_11/yhky): 刻印主题武将包 ✅ 完整
- **三国杀同人小说** (YB_12/sgstrxs): 小说改编武将包,含附属将包 ✅ 完整
- **武魂觉醒** (YB_13/ybwhjx): ⚠️ 空包(仅占位符)
- **夜白杂设新包** (YB_14/ybnew3): 新版杂设武将包,含附属将包和缘分点亮系统 ✅ 完整

### 卡牌系统
- **夜白牌堆** (YB_05/ybslcj): 自定义卡牌系统
- **BOSS搬运** (YB_06/ybgod): BOSS武将相关卡牌
- **夜白新卡1** (YB_07/ybnew2): 新增卡牌集合

### 游戏模式
- **乱斗模式 - 夜白旅程** (YB_07_brawl): 闯关挑战模式 ✅ 启用(包含两个关卡)
- **塔防模式** (YB_08_ybtf): 塔防游戏玩法 ⚠️ 未完工
- **国战支持** (YB_09_ybgz): 国战模式支持 ✅ 启用
- **三国杀同人小说模式** (sgstrxs): 小说改编模式 ❌ 未启用(代码被注释)

### 特色系统
- **自定义属性系统**: 雪(YB_snow)、血(YB_blood)、风(YB_wind)三种新属性
- **缘分点亮系统**: 武将组合触发特殊效果
- **珠联璧合系统**: 武将配对效果
- **马均锻造升级系统**: 卡牌升级机制
- **排名系统**: 武将评级和排名
- **穿越三国杀系统**: 技能等级系统和武将等阶
- **命运线系统**: 独特的命运机制

### 工具功能
- **弹窗管理**: 自定义弹窗系统
- **牌堆替换**: 牌堆替换机制
- **千幻皮肤适配**: 皮肤系统支持
- **调试工具**: 开发调试功能
- **技能重写**: 技能加强/重写功能
- **卡牌浏览器**: 牌堆浏览工具

## 目录结构

```
夜白神略/
├── extension.js                  # 扩展主入口文件
├── info.json                    # 扩展基本信息
├── source/                      # 核心源代码目录
│   ├── ext/                     # 武将包和卡包入口文件
│   │   ├── YB_01_character.js   # 夜白将包入口 (ybslj)
│   │   ├── YB_02_character.js   # 六艺篇入口 (ybart)
│   │   ├── YB_03_character.js   # 校花入口 (ybxh)
│   │   ├── YB_04_character.js   # 夜白杂设入口 (已封存,未启用)
│   │   ├── YB_05_card.js        # 夜白牌堆入口 (ybslcj)
│   │   ├── YB_06_card.js        # BOSS搬运入口 (ybgod)
│   │   ├── YB_07_card.js        # 夜白新卡1入口 (ybnew2)
│   │   ├── YB_08_character.js   # 名将传入库 (ybmjz)
│   │   ├── YB_09_character.js   # 夜白接单入口 (ybdd)
│   │   ├── YB_10_character.js   # 符咒世界入口 (ybMagic)
│   │   ├── YB_11_character.js   # 永恒刻印入口 (yhky)
│   │   ├── YB_12_character.js   # 三国杀同人小说入口 (sgstrxs)
│   │   ├── YB_13_character.js   # 武魂觉醒入口 (ybwhjx)
│   │   └── YB_14_character.js   # 夜白杂设新包入口 (ybnew3)
│   │
│   ├── exts/                    # 武将包和卡包详细内容
│   │   ├── YB_01_character/     # 夜白将包详细内容 (ybslj) ✅
│   │   ├── YB_02_character/     # 六艺篇详细内容 (ybart) ✅
│   │   ├── YB_03_character/     # 校花详细内容 (ybxh) ✅
│   │   ├── YB_04_character/     # 夜白杂设详细内容 (❌ 已封存,入口代码被注释)
│   │   ├── YB_05_card/          # 夜白牌堆详细内容 (ybslcj) ✅
│   │   ├── YB_06_card/          # BOSS搬运详细内容 (ybgod) ✅
│   │   ├── YB_07_card/          # 夜白新卡1详细内容 (ybnew2) ✅
│   │   ├── YB_08_character/     # 名将传详细内容 (ybmjz) ✅
│   │   ├── YB_09_character/     # 夜白接单详细内容 (ybdd) ✅
│   │   ├── YB_10_character/     # 符咒世界详细内容 (ybMagic) ⚠️ 空包,仅占位符
│   │   ├── YB_11_character/     # 永恒刻印详细内容 (yhky,含替身系统) ✅
│   │   ├── YB_12_character/     # 三国杀同人小说详细内容 (sgstrxs,含附属将包和替身系统) ✅
│   │   ├── YB_13_character/     # 武魂觉醒详细内容 (ybwhjx) ⚠️ 空包,仅占位符
│   │   └── YB_14_character/     # 夜白杂设新包详细内容 (ybnew3,含附属将包和缘分点亮系统) ✅
│   │
│   ├── packages/                # 核心功能包
│   │   ├── config.js            # 扩展配置项
│   │   ├── package.js           # 包信息
│   │   ├── content.js           # 游戏内容加载
│   │   ├── precontent.js        # 预加载内容
│   │   ├── function.js          # 自定义函数库
│   │   └── update.js            # 更新日志
│   │
│   ├── packages/content/        # 游戏内功能模块
│   │   ├── YB_01_dialog.js      # 弹窗管理 ✅
│   │   ├── YB_02_cardpile.js    # 牌堆替换 ✅
│   │   ├── YB_03_qhlyskin.js    # 千幻皮肤适配 ✅
│   │   ├── YB_04_ccinit.js      # 初始化设置 ✅
│   │   ├── YB_05_boom.js        # 调试工具(炸游戏器) ✅
│   │   ├── YB_06_rewrite.js     # 技能加强/重写 ✅
│   │   ├── YB_07_brawl.js       # 乱斗模式(夜白旅程) ✅
│   │   ├── YB_08_ybtf.js        # 塔防模式 ⚠️ 未完工
│   │   └── YB_09_ybgz.js        # 国战支持 ✅
│   │
│   ├── packages/precontent/     # 预加载功能模块
│   │   ├── YB_01_rank.js        # 排名系统 ✅
│   │   ├── YB_02_nature.js      # 自定义属性系统 ✅
│   │   ├── YB_03_trigger.js     # 自定义触发时机 ✅
│   │   ├── YB_04_special.js     # 特殊技能处理 ✅
│   │   ├── YB_05_pinyin.js      # 拼音系统 ✅
│   │   ├── YB_06_starmap.js     # 星图系统 ✅
│   │   ├── YB_07_qianhuan.js    # 千幻适配 ⚠️ 暂时停用(无皮肤)
│   │   ├── YB_08_ybslf.js       # 自定义函数 ✅
│   │   ├── YB_09_update.js      # 更新公告显示 ✅
│   │   ├── YB_10_destiny.js     # 命运线系统 ✅
│   │   └── YB_11_cardBrowser.js # 卡牌浏览器 ✅
│   │
│   ├── pile/                    # 牌堆配置
│   │   ├── ybslCardPile.js      # 夜白牌堆
│   │   ├── ybslminiCardPile.js  # 迷你牌堆
│   │   ├── ybslExtraCardPile.js # 额外牌堆
│   │   ├── cyyydsgs.js          # 穿越三国杀系统(含技能等级系统、武将等阶系统)
│   │   ├── list24.js            # 24点游戏数据(149KB)
│   │   └── ybtujian.js          # 图鉴
│   │
│   ├── ontology/                # 本体相关
│   │   └── card/yunchou.js      # 云筹卡牌 ✅ 启用
│   │
│   └── css/                     # 样式文件
│       ├── menu.css             # 菜单样式 ✅
│       ├── ybcss.css            # 夜白CSS ✅
│       └── 其他样式文件
│
├── yblc/                        # 夜白旅程(闯关模式)
│   ├── YBLC_1.js                # 旅程关卡1(叶白旅程) ✅
│   ├── YBLC_2.js                # 旅程关卡2(心难必败) ✅
│   └── 遗憾可书.emmx           # 情感记录文件(非代码)
│
├── sgstrxs/                     # 三国杀同人小说模式
│   └── mode.js                   # 模式定义 ❌ 未启用(代码被注释)
│
├── image/                       # 图片资源
│   ├── character/               # 武将头像
│   ├── card/                    # 卡牌图片
│   ├── card-skins/              # 卡牌皮肤
│   ├── 千幻势力/                 # 势力图标
│   └── 其他主题文件夹
│
├── audio/                       # 音频资源
│   ├── character/               # 武将语音
│   ├── die/                     # 死亡语音
│   └── ontology/                # 卡牌语音
│
└── skin/                        # 皮肤资源
    └── standard/                # 标准皮肤
```

## 开发指南

### 添加新武将

1. 在 `source/ext/` 下创建或选择一个武将包入口文件 (如 `YB_15_character.js`)
2. 在 `source/exts/YB_15_character/` 下创建武将详细文件:
   - `character.js`: 武将属性定义(性别、势力、体力、技能)
   - `skill.js`: 技能详细逻辑
   - `translate.js`: 技能和武将翻译文本
   - `characterIntro.js`: 武将介绍(可选)
   - `characterTitle.js`: 武将称号(可选)
   - `perfectPair.js`: 珠联璧合配置(可选)
   - `characterSort.js`: 排序配置(可选)
3. 在 `source/packages/precontent.js` 中引入新武将包

### 武将包标准模板

每个武将包应包含以下基础文件:
- `character.js`: 武将定义数组,格式: `['武将名', ['势力'], '体力', ['技能1','技能2'], '头像路径']`
- `skill.js`: 技能对象,使用 `lib.skill['技能名'] = { enable: 'phase', usable: 1, filter: ..., content: ... }`
- `translate.js`: 翻译对象,包含武将名、技能名、技能描述等
- 其他可选文件: `characterIntro.js`, `characterTitle.js`, `perfectPair.js`, `characterSort.js`

### 添加新卡牌

1. 在 `source/ext/YB_XX_card.js` 中定义卡牌
2. 在 `source/exts/YB_XX_card/` 下添加详细内容:
   - `card.js`: 卡牌定义
   - `skill.js`: 卡牌技能
   - `translate.js`: 卡牌翻译
   - `list.js`: 牌堆列表配置
3. 在 `source/pile/` 下配置牌堆添加逻辑

### 自定义属性

扩展提供了三种自定义属性 (在 `source/packages/precontent/YB_02_nature.js` 中定义):
- **YB_snow (雪)**: 可传导的雪属性
- **YB_blood (血)**: 不可传导,具有吸血效果
- **YB_wind (风)**: 可传导,横置传播

使用示例:
```javascript
// 添加雪属性到卡牌
card.storage.YB_snow = true;

// 检查卡牌是否有雪属性
if (card.storage.YB_snow) {
    // 处理雪属性逻辑
}
```

### 自定义函数库

扩展提供了丰富的自定义函数,位于:
- `source/packages/function.js` (50KB): 通用工具函数库,包含对象合并、武将介绍处理等
- `source/packages/precontent/YB_08_ybslf.js` (84KB): 夜白神略自定义函数库,包含 YB_yiji、YB_addMark、YB_removeMark 等核心函数

### 特殊系统

#### 替身系统 (characterSubstitute)
部分武将包支持替身系统,当武将死亡时切换到其他武将形态:
- YB_11 (yhky): 史丽昭仪、貂蝉支持死亡替身
- YB_12 (sgstrxs): 大量武将支持替身切换

#### 附属将包 (accessoryPacket)
部分武将包包含附属将包,可以在特定条件下切换:
- YB_12 (sgstrxs): 包含附属将包
- YB_14 (ybnew3): 包含附属将包

#### 缘分点亮系统 (characterLightext)
YB_14 包含缘分点亮系统,特定武将组合可触发特殊效果

#### 珠联璧合系统 (perfectPair)
部分武将包支持珠联璧合,特定武将组合可获得加成

### 更新日志

查看 `source/packages/update.js` 了解版本更新历史。

## 配置说明

扩展配置位于 `source/packages/config.js`,包含:
- 功能开关配置
- 帮助文档
- QQ群二维码显示
- 兼容模式提示

## 技术支持

如遇问题或有建议,请通过扩展内的帮助功能联系作者。

## 版本信息

查看 `info.json` 获取当前版本号。

## 许可证

查看 `LICENSE` 文件了解许可证信息。

## 附录: 武将包详细列表

| 包编号 | 包名称 | 代码标识 | 状态 | 内容 | 特殊功能 |
|--------|--------|----------|------|------|----------|
| YB_01 | 夜白将包 | ybslj | ✅ 启用 | 完整 (604KB技能) | 核心包 |
| YB_02 | 六艺篇 | ybart | ✅ 启用 | 完整 (42KB技能) | - |
| YB_03 | 校花 | ybxh | ✅ 启用 | 完整 (17KB技能) | - |
| YB_04 | 夜白杂设 | ybnew1 | ❌ 封存 | 空壳 | 入口代码被注释,有"锁妖塔"备注 |
| YB_05 | 夜白牌堆 | ybslcj | ✅ 启用 | 完整 (76KB卡牌) | 卡牌包 |
| YB_06 | BOSS搬运 | ybgod | ✅ 启用 | 完整 (260KB技能) | 卡牌包 |
| YB_07 | 夜白新卡1 | ybnew2 | ✅ 启用 | 完整 (18KB卡牌) | 卡牌包 |
| YB_08 | 名将传 | ybmjz | ✅ 启用 | 完整 (84KB技能) | - |
| YB_09 | 夜白接单 | ybdd | ✅ 启用 | 完整 (178KB技能) | - |
| YB_10 | 符咒世界 | ybMagic | ⚠️ 空包 | 仅占位符 (无武将,空技能) | 仅有占位符,无实际内容 |
| YB_11 | 永恒刻印 | yhky | ✅ 启用 | 完整 (74KB技能) | 替身系统 |
| YB_12 | 三国杀同人小说 | sgstrxs | ✅ 启用 | 完整 (1.07MB技能,最大) | 附属将包、替身系统 |
| YB_13 | 武魂觉醒 | ybwhjx | ⚠️ 空包 | 仅占位符 (无武将,空技能) | 仅有占位符,无实际内容 |
| YB_14 | 夜白杂设新包 | ybnew3 | ✅ 启用 | 完整 (356KB技能) | 附属将包、缘分点亮系统 |

**说明**:
- ✅ 启用: 包含完整武将和技能,正常使用
- ❌ 封存: 代码被注释禁用,无法使用
- ⚠️ 空包: 虽然启用但只有占位符,无实际武将内容
- YB_04 文件中有大量"锁妖塔"注释,说明该包存在代码异常,已被封存
- YB_10 和 YB_13 仅有空对象和占位符,未添加实际武将内容
