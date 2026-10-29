import type { SourcingStrings } from '../en/sourcing';

/**
 * Chinese copy — sourcing.
 *
 * ⚠ CLAUDE.md §12 — first-pass Chinese, not yet reviewed by a native speaker.
 * Typed against the English module: a missing, extra or misspelled key fails
 * `astro check`.
 */
export const sourcing: SourcingStrings = {
  'meta.sourcing.title': '难寻件与停产件 — Treteone',
  'meta.sourcing.description':
    '停产、淘汰及无标识的工业备件。发送部件号、铭牌照片或清单，我们来查。询价处理的五个步骤。',

  // ---- sourcing -----------------------------------------------------------
  'sourcing.eyebrow': '寻源采购',
  'sourcing.heading': '找不到备件？把型号给我们。',
  'sourcing.lede':
    '停产件、老旧自动化系统、无标识铸件，甚至只有一张铭牌照片——把您手上的资料发给我们，我们来查。',
  'sourcing.cta': '上传需求',
  'sourcing.checklistLabel': '需要提供的资料',
  'sourcing.checklistLede': '以下任一资料即可开始询价。',
  'sourcing.send.partNumber': '部件号或制造商编号',
  'sourcing.send.nameplate': '设备型号与铭牌照片',
  'sourcing.send.datasheet': '技术数据表、图纸或PDF',
  'sourcing.send.boq': 'Excel清单或多项询价',
  'sourcing.send.description': '只有文字描述也可以',

  // ---- process ------------------------------------------------------------
  'process.heading': '从需求到交付。',
  'process.lede': '一份询价从开始到结束的处理过程。',
  'process.stepCount': (n: number, total: number) => `第 ${n} 步，共 ${total} 步`,
};
