import type { Localised } from '~/i18n/ui';

/**
 * The 9 industries (CLAUDE.md §3).
 *
 * The IndustryPicker (§6.7) is not built yet — this module exists now because
 * the StatBand claims "9 industries served" and that number has to come from
 * the actual list rather than from a literal typed into a component. If an
 * industry is added or dropped, the stat follows on its own.
 *
 * No `image` field yet: the picker's photo panel is pass 3, and §10 has not
 * supplied that photography. Add the field when there is something behind it.
 */
export interface Industry {
  readonly slug: string;
  readonly name: Localised;
  readonly blurb: Localised;
}

export const industries: readonly Industry[] = [
  {
    slug: 'oil-gas',
    name: { en: 'Oil & Gas', zh: '石油天然气' },
    blurb: {
      en: 'Pumps · valves · instrumentation · rotating equipment spares',
      zh: '泵 · 阀门 · 仪表 · 旋转设备备件',
    },
  },
  {
    slug: 'refining-petrochemical',
    name: { en: 'Refining & Petrochemical', zh: '炼化与石化' },
    blurb: {
      en: 'Control valves · heat exchangers · seals · analysers',
      zh: '调节阀 · 换热器 · 密封件 · 分析仪',
    },
  },
  {
    slug: 'power-generation',
    name: { en: 'Power Generation', zh: '电力' },
    blurb: {
      en: 'Switchgear · transformers · turbine auxiliaries · protection',
      zh: '开关柜 · 变压器 · 汽机辅机 · 保护装置',
    },
  },
  {
    slug: 'cement',
    name: { en: 'Cement', zh: '水泥' },
    blurb: {
      en: 'Gearboxes · bearings · fans · wear parts · drives',
      zh: '减速机 · 轴承 · 风机 · 易损件 · 传动',
    },
  },
  {
    slug: 'manufacturing',
    name: { en: 'Manufacturing', zh: '制造业' },
    blurb: {
      en: 'PLC and drives · sensors · pneumatics · conveyors',
      zh: 'PLC与驱动 · 传感器 · 气动元件 · 输送设备',
    },
  },
  {
    slug: 'steel-metals',
    name: { en: 'Steel & Metals', zh: '钢铁与金属' },
    blurb: {
      en: 'Hydraulics · heavy bearings · motors · cooling systems',
      zh: '液压 · 重载轴承 · 电机 · 冷却系统',
    },
  },
  {
    slug: 'mining',
    name: { en: 'Mining', zh: '矿业' },
    blurb: {
      en: 'Slurry pumps · crusher spares · couplings · lubrication',
      zh: '渣浆泵 · 破碎机备件 · 联轴器 · 润滑',
    },
  },
  {
    slug: 'water-wastewater',
    name: { en: 'Water & Wastewater', zh: '给排水' },
    blurb: {
      en: 'Pumps · dosing systems · level instruments · blowers',
      zh: '水泵 · 加药系统 · 液位仪表 · 鼓风机',
    },
  },
  {
    slug: 'facilities-institutions',
    name: { en: 'Facilities & Institutions', zh: '公共与商业设施' },
    blurb: {
      en: 'Generators · UPS · HVAC components · distribution',
      zh: '发电机 · UPS · 暖通部件 · 配电',
    },
  },
];
