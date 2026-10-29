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
  /** Short tag line used by the older homepage components. */
  readonly blurb: Localised;
  /**
   * The mono spec line on the /industries index rows, from the approved
   * mockup, verbatim: what the sector asks for, then — after the dash — the
   * duty data that decides the answer (area classification and sour service
   * for oil and gas, abrasion and solids content for mining…). That
   * vocabulary is the point of the page; do not paraphrase it.
   */
  readonly spec: Localised;
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
    spec: {
      en: 'Rotating spares · valves · instrumentation — area classification, sour service, pressure class',
      zh: '旋转设备备件 · 阀门 · 仪表 — 防爆区域等级、酸性（含硫）工况、压力等级',
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
    spec: {
      en: 'Control valves · exchangers · seals · analysers — temperature, medium, trim material',
      zh: '调节阀 · 换热器 · 密封件 · 分析仪 — 温度、介质、阀内件材质',
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
    spec: {
      en: 'Switchgear · transformers · turbine auxiliaries — voltage, breaking capacity, protection scheme',
      zh: '开关柜 · 变压器 · 汽轮机辅机 — 电压等级、分断能力、保护方案',
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
    spec: {
      en: 'Gearboxes · heavy bearings · fans · wear parts — load, dust ingress, duty cycle',
      zh: '减速机 · 重载轴承 · 风机 · 易损件 — 载荷、粉尘侵入、工作制',
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
    spec: {
      en: 'PLC and drives · sensors · pneumatics · conveyors — control platform, I/O count, cycle time',
      zh: 'PLC与驱动 · 传感器 · 气动元件 · 输送设备 — 控制平台、I/O点数、节拍时间',
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
    spec: {
      en: 'Hydraulics · heavy bearings · motors · cooling — ambient temperature, shock loading',
      zh: '液压 · 重载轴承 · 电机 · 冷却 — 环境温度、冲击载荷',
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
    spec: {
      en: 'Slurry pumps · crusher spares · couplings — abrasion, solids content, wear life',
      zh: '渣浆泵 · 破碎机备件 · 联轴器 — 磨蚀性、固含量、磨损寿命',
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
    spec: {
      en: 'Pumps · dosing · level instruments · blowers — chemical compatibility, submersion rating',
      zh: '水泵 · 加药 · 液位仪表 · 鼓风机 — 化学相容性、浸没防护等级',
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
    spec: {
      en: 'Generators · UPS · HVAC components · distribution — load profile, autonomy, footprint',
      zh: '发电机 · UPS · 暖通部件 · 配电 — 负荷曲线、后备时长、占地尺寸',
    },
    image: imgFacilitiesInstitutions,
  },
];
