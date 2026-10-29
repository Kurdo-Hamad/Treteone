import type { ImageMetadata } from 'astro';
import type { Localised } from '~/i18n/ui';

import imgOilGas from '~/assets/industries/oil-gas.jpg';
import imgRefiningPetrochemical from '~/assets/industries/refining-petrochemical.jpg';
import imgPowerGeneration from '~/assets/industries/power-generation.jpg';
import imgCement from '~/assets/industries/cement.jpg';
import imgManufacturing from '~/assets/industries/manufacturing.jpg';
import imgSteelMetals from '~/assets/industries/steel-metals.jpg';
import imgMining from '~/assets/industries/mining.jpg';
import imgWaterWastewater from '~/assets/industries/water-wastewater.jpg';
import imgFacilitiesInstitutions from '~/assets/industries/facilities-institutions.jpg';

/**
 * The 9 industries (CLAUDE.md §3).
 *
 * Drives the homepage industries preview, the /industries index and every
 * "9 industries" count. That figure is `industries.length`, not a literal typed
 * into a component, so adding or dropping an industry moves it on its own.
 *
 * ⚠ §10 — the photography has not been supplied. Every `image` is a
 * "PHOTOGRAPH PENDING" plate from scripts/make-placeholders.mjs. Replace
 * src/assets/industries/<slug>.jpg with the real file; nothing else changes.
 */
export interface Industry {
  readonly slug: string;
  readonly name: Localised;
  readonly blurb: Localised;
  readonly image: ImageMetadata;
}

export const industries: readonly Industry[] = [
  {
    slug: 'oil-gas',
    name: { en: 'Oil & Gas', zh: '石油天然气' },
    blurb: {
      en: 'Pumps · valves · instrumentation · rotating equipment spares',
      zh: '泵 · 阀门 · 仪表 · 旋转设备备件',
    },
    image: imgOilGas,
  },
  {
    slug: 'refining-petrochemical',
    name: { en: 'Refining & Petrochemical', zh: '炼化与石化' },
    blurb: {
      en: 'Control valves · heat exchangers · seals · analysers',
      zh: '调节阀 · 换热器 · 密封件 · 分析仪',
    },
    image: imgRefiningPetrochemical,
  },
  {
    slug: 'power-generation',
    name: { en: 'Power Generation', zh: '电力' },
    blurb: {
      en: 'Switchgear · transformers · turbine auxiliaries · protection',
      zh: '开关柜 · 变压器 · 汽机辅机 · 保护装置',
    },
    image: imgPowerGeneration,
  },
  {
    slug: 'cement',
    name: { en: 'Cement', zh: '水泥' },
    blurb: {
      en: 'Gearboxes · bearings · fans · wear parts · drives',
      zh: '减速机 · 轴承 · 风机 · 易损件 · 传动',
    },
    image: imgCement,
  },
  {
    slug: 'manufacturing',
    name: { en: 'Manufacturing', zh: '制造业' },
    blurb: {
      en: 'PLC and drives · sensors · pneumatics · conveyors',
      zh: 'PLC与驱动 · 传感器 · 气动元件 · 输送设备',
    },
    image: imgManufacturing,
  },
  {
    slug: 'steel-metals',
    name: { en: 'Steel & Metals', zh: '钢铁与金属' },
    blurb: {
      en: 'Hydraulics · heavy bearings · motors · cooling systems',
      zh: '液压 · 重载轴承 · 电机 · 冷却系统',
    },
    image: imgSteelMetals,
  },
  {
    slug: 'mining',
    name: { en: 'Mining', zh: '矿业' },
    blurb: {
      en: 'Slurry pumps · crusher spares · couplings · lubrication',
      zh: '渣浆泵 · 破碎机备件 · 联轴器 · 润滑',
    },
    image: imgMining,
  },
  {
    slug: 'water-wastewater',
    name: { en: 'Water & Wastewater', zh: '给排水' },
    blurb: {
      en: 'Pumps · dosing systems · level instruments · blowers',
      zh: '水泵 · 加药系统 · 液位仪表 · 鼓风机',
    },
    image: imgWaterWastewater,
  },
  {
    slug: 'facilities-institutions',
    name: { en: 'Facilities & Institutions', zh: '公共与商业设施' },
    blurb: {
      en: 'Generators · UPS · HVAC components · distribution',
      zh: '发电机 · UPS · 暖通部件 · 配电',
    },
    image: imgFacilitiesInstitutions,
  },
];
