import type { Localised } from '~/i18n/ui';

/**
 * The 12 product categories (CLAUDE.md §3). One definition drives the product
 * rail, the ticker and the footer's Products column.
 *
 * Pass 1 uses this for the footer only; the rail and ticker land in pass 2 and
 * read the same array.
 *
 * `image` is the basename of the photograph in src/assets/products/. §10 — the
 * real photography has not been supplied, so those files do not exist yet and
 * nothing imports them. Do not substitute stock imagery without approval.
 */
export interface Category {
  readonly slug: string;
  readonly name: Localised;
  readonly blurb: Localised;
  readonly image: string;
}

export const categories: readonly Category[] = [
  {
    slug: 'automation-control',
    name: { en: 'Automation & Control', zh: '自动化与控制' },
    blurb: {
      en: 'PLC · DCS · SCADA · HMI · Remote I/O · VFDs · servo',
      zh: 'PLC · DCS · SCADA · 人机界面 · 远程I/O · 变频器 · 伺服',
    },
    image: 'automation-control',
  },
  {
    slug: 'instrumentation-measurement',
    name: { en: 'Instrumentation & Measurement', zh: '仪器仪表与测量' },
    blurb: {
      en: 'Pressure · flow · level · temperature · transmitters',
      zh: '压力 · 流量 · 液位 · 温度 · 变送器',
    },
    image: 'instrumentation-measurement',
  },
  {
    slug: 'electrical-power',
    name: { en: 'Electrical & Power', zh: '电气与配电' },
    blurb: {
      en: 'Switchgear · breakers · transformers · panels · UPS',
      zh: '开关柜 · 断路器 · 变压器 · 控制柜 · UPS',
    },
    image: 'electrical-power',
  },
  {
    slug: 'motors-drives-transmission',
    name: { en: 'Motors, Drives & Transmission', zh: '电机、驱动与传动' },
    blurb: {
      en: 'Motors · gearboxes · couplings · bearings · belts',
      zh: '电动机 · 减速机 · 联轴器 · 轴承 · 皮带',
    },
    image: 'motors-drives-transmission',
  },
  {
    slug: 'pumps',
    name: { en: 'Pumps & Pump Equipment', zh: '泵与泵用设备' },
    blurb: {
      en: 'Centrifugal · dosing · submersible · seals · impellers',
      zh: '离心泵 · 计量泵 · 潜水泵 · 机械密封 · 叶轮',
    },
    image: 'pumps',
  },
  {
    slug: 'compressors-compressed-air',
    name: { en: 'Compressors & Compressed Air', zh: '压缩机与压缩空气' },
    blurb: {
      en: 'Screw · reciprocating · dryers · receivers · spares',
      zh: '螺杆机 · 活塞机 · 干燥机 · 储气罐 · 备件',
    },
    image: 'compressors-compressed-air',
  },
  {
    slug: 'valves-flow-control',
    name: { en: 'Valves & Flow Control', zh: '阀门与流量控制' },
    blurb: {
      en: 'Ball · gate · butterfly · control · safety · actuators',
      zh: '球阀 · 闸阀 · 蝶阀 · 调节阀 · 安全阀 · 执行器',
    },
    image: 'valves-flow-control',
  },
  {
    slug: 'mechanical-mro',
    name: { en: 'Mechanical & MRO Spares', zh: '机械与MRO备件' },
    blurb: {
      en: 'Bearings · seals · gaskets · fasteners · hoses · filters',
      zh: '轴承 · 密封件 · 垫片 · 紧固件 · 软管 · 滤芯',
    },
    image: 'mechanical-mro',
  },
  {
    slug: 'hydraulic-pneumatic',
    name: { en: 'Hydraulic & Pneumatic', zh: '液压与气动' },
    blurb: {
      en: 'Pumps · cylinders · valves · power units · fittings',
      zh: '液压泵 · 油缸 · 阀 · 液压站 · 接头',
    },
    image: 'hydraulic-pneumatic',
  },
  {
    slug: 'process-equipment',
    name: { en: 'Process & Industrial Equipment', zh: '流程与工业设备' },
    blurb: {
      en: 'Heat exchangers · filtration · vessels · fans · conveyors',
      zh: '换热器 · 过滤设备 · 容器 · 风机 · 输送设备',
    },
    image: 'process-equipment',
  },
  {
    slug: 'industrial-machinery',
    name: { en: 'Industrial Machinery', zh: '工业机械' },
    blurb: {
      en: 'Generators · production lines · packaging · welding',
      zh: '发电机组 · 生产线 · 包装机械 · 焊接设备',
    },
    image: 'industrial-machinery',
  },
  {
    slug: 'industrial-consumables',
    name: { en: 'Industrial Consumables', zh: '工业耗材' },
    blurb: {
      en: 'Filters · lubricants · abrasives · cutting tools · PPE',
      zh: '滤芯 · 润滑油 · 磨料 · 刀具 · 劳保用品',
    },
    image: 'industrial-consumables',
  },
];

/** The footer shows the first eight, as in the approved prototype. */
export const footerCategories = categories.slice(0, 8);
