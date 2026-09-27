import { characterSort as a } from './sgskjdbzjms/characterSort.js';
import { characterSort as b } from './qmsgswkjsgj/characterSort.js';
import { characterSort as c } from './sgsxjxfzmnl/characterSort.js';
import { characterSort as d } from './zzrsqlkjygzz/characterSort.js';
import { characterSort as e } from './sgskjgydxsg/characterSort.js';

// 子文件夹以小说名为顶层键（如 { sgskjdbzjms: [...] }），聚合时统一嵌套进 sgstrxs
const sgstrxs = {};
for (const o of [a, b, c, d, e]) {
	for (const k in o) sgstrxs[k] = o[k];
}

export const characterSort = { sgstrxs };
