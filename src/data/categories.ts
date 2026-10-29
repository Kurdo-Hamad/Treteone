import type { ImageMetadata } from 'astro';
import type { Localised } from '~/i18n/ui';

import imgAutomationControl from '~/assets/products/automation-control.jpg';
import imgInstrumentationMeasurement from '~/assets/products/instrumentation-measurement.jpg';
import imgElectricalPower from '~/assets/products/electrical-power.jpg';
import imgMotorsDrivesTransmission from '~/assets/products/motors-drives-transmission.jpg';
import imgPumps from '~/assets/products/pumps.jpg';
import imgCompressorsCompressedAir from '~/assets/products/compressors-compressed-air.jpg';
import imgValvesFlowControl from '~/assets/products/valves-flow-control.jpg';
import imgMechanicalMro from '~/assets/products/mechanical-mro.jpg';
import imgHydraulicPneumatic from '~/assets/products/hydraulic-pneumatic.jpg';
import imgProcessEquipment from '~/assets/products/process-equipment.jpg';
import imgIndustrialMachinery from '~/assets/products/industrial-machinery.jpg';
import imgIndustrialConsumables from '~/assets/products/industrial-consumables.jpg';

/**
 * The 12 product categories (CLAUDE.md §3). One definition drives the homepage
 * ecosystem, the /products index and the footer's Products column.
 *
 * ⚠ §10 — the real photography has not been supplied. Every `image` below is a
 * clearly-marked "PHOTOGRAPH PENDING" plate from scripts/make-placeholders.mjs.
 * Replace src/assets/products/<slug>.jpg with the real file and nothing else
 * changes. Do not substitute stock imagery without approval.
 */
export interface Category {
  readonly slug: string;
  readonly name: Localised;
  /** Short tag line used by the older homepage components. */
  readonly blurb: Localised;
  /**
   * The mono spec line on the /products index rows — the approved mockup's
   * wording, verbatim. A scope statement, not a stock list (§13).
   */
  readonly spec: Localised;
  readonly image: ImageMetadata;
}

export const categories: readonly Category[] = [
  {
    slug: 'automation-control',
    name: { en: 'Automation & Control', zh: '自动化与控制' },
    blurb: {
      en: 'PLC · DCS · SCADA · HMI · Remote I/O · VFDs · servo',
      zh: 'PLC · DCS · SCADA · 人机界面 · 远程I/O · 变频器 · 伺服',
    },
    spec: {
      en: 'PLC · DCS · SCADA · HMI · remote I/O · VFDs · servo drives',
      zh: 'PLC · DCS · SCADA · 人机界面 · 远程I/O · 变频器 · 伺服驱动',
    },
    image: imgAutomationControl,
  },
  {
    slug: 'instrumentation-measurement',
    name: { en: 'Instrumentation & Measurement', zh: '仪器仪表与测量' },
    blurb: {
      en: 'Pressure · flow · level · temperature · transmitters',
      zh: '压力 · 流量 · 液位 · 温度 · 变送器',
    },
    spec: {
      en: 'Pressure · flow · level · temperature · transmitters · analysers',
      zh: '压力 · 流量 · 液位 · 温度 · 变送器 · 分析仪',
    },
    image: imgInstrumentationMeasurement,
  },
  {
    slug: 'electrical-power',
    name: { en: 'Electrical & Power', zh: '电气与配电' },
    blurb: {
      en: 'Switchgear · breakers · transformers · panels · UPS',
      zh: '开关柜 · 断路器 · 变压器 · 控制柜 · UPS',
    },
    spec: {
      en: 'Switchgear · breakers · transformers · panels · UPS · cable',
      zh: '开关柜 · 断路器 · 变压器 · 配电柜 · UPS · 电缆',
    },
    image: imgElectricalPower,
  },
  {
    slug: 'motors-drives-transmission',
    name: { en: 'Motors, Drives & Transmission', zh: '电机、驱动与传动' },
    blurb: {
      en: 'Motors · gearboxes · couplings · bearings · belts',
      zh: '电动机 · 减速机 · 联轴器 · 轴承 · 皮带',
    },
    spec: {
      en: 'Motors · gearboxes · couplings · bearings · belts · chain',
      zh: '电动机 · 减速机 · 联轴器 · 轴承 · 皮带 · 链条',
    },
    image: imgMotorsDrivesTransmission,
  },
  {
    slug: 'pumps',
    name: { en: 'Pumps & Pump Equipment', zh: '泵与泵用设备' },
    blurb: {
      en: 'Centrifugal · dosing · submersible · seals · impellers',
      zh: '离心泵 · 计量泵 · 潜水泵 · 机械密封 · 叶轮',
    },
    spec: {
      en: 'Centrifugal · dosing · submersible · seals · impellers · wear parts',
      zh: '离心泵 · 计量泵 · 潜水泵 · 机械密封 · 叶轮 · 易损件',
    },
    image: imgPumps,
  },
  {
    slug: 'compressors-compressed-air',
    name: { en: 'Compressors & Compressed Air', zh: '压缩机与压缩空气' },
    blurb: {
      en: 'Screw · reciprocating · dryers · receivers · spares',
      zh: '螺杆机 · 活塞机 · 干燥机 · 储气罐 · 备件',
    },
    spec: {
      en: 'Screw · reciprocating · dryers · receivers · service kits',
      zh: '螺杆机 · 活塞机 · 干燥机 · 储气罐 · 保养包',
    },
    image: imgCompressorsCompressedAir,
  },
  {
    slug: 'valves-flow-control',
    name: { en: 'Valves & Flow Control', zh: '阀门与流量控制' },
    blurb: {
      en: 'Ball · gate · butterfly · control · safety · actuators',
      zh: '球阀 · 闸阀 · 蝶阀 · 调节阀 · 安全阀 · 执行器',
    },
    spec: {
      en: 'Ball · gate · globe · butterfly · control · safety · actuators',
      zh: '球阀 · 闸阀 · 截止阀 · 蝶阀 · 调节阀 · 安全阀 · 执行器',
    },
    image: imgValvesFlowControl,
  },
  {
    slug: 'mechanical-mro',
    name: { en: 'Mechanical & MRO Spares', zh: '机械与MRO备件' },
    blurb: {
      en: 'Bearings · seals · gaskets · fasteners · hoses · filters',
      zh: '轴承 · 密封件 · 垫片 · 紧固件 · 软管 · 滤芯',
    },
    spec: {
      en: 'Bearings · seals · gaskets · fasteners · hoses · filtration',
      zh: '轴承 · 密封件 · 垫片 · 紧固件 · 软管 · 过滤',
    },
    image: imgMechanicalMro,
  },
  {
    slug: 'hydraulic-pneumatic',
    name: { en: 'Hydraulic & Pneumatic', zh: '液压与气动' },
    blurb: {
      en: 'Pumps · cylinders · valves · power units · fittings',
      zh: '液压泵 · 油缸 · 阀 · 液压站 · 接头',
    },
    spec: {
      en: 'Pumps · cylinders · valves · power units · fittings · FRL',
      zh: '液压泵 · 油缸 · 阀 · 液压站 · 接头 · 气源三联件',
    },
    image: imgHydraulicPneumatic,
  },
  {
    slug: 'process-equipment',
    name: { en: 'Process & Industrial Equipment', zh: '流程与工业设备' },
    blurb: {
      en: 'Heat exchangers · filtration · vessels · fans · conveyors',
      zh: '换热器 · 过滤设备 · 容器 · 风机 · 输送设备',
    },
    spec: {
      en: 'Heat exchangers · filtration · vessels · fans · conveyors',
      zh: '换热器 · 过滤设备 · 容器 · 风机 · 输送设备',
    },
    image: imgProcessEquipment,
  },
  {
    slug: 'industrial-machinery',
    name: { en: 'Industrial Machinery', zh: '工业机械' },
    blurb: {
      en: 'Generators · production lines · packaging · welding',
      zh: '发电机组 · 生产线 · 包装机械 · 焊接设备',
    },
    spec: {
      en: 'Generators · production lines · packaging · welding plant',
      zh: '发电机组 · 生产线 · 包装机械 · 焊接设备',
    },
    image: imgIndustrialMachinery,
  },
  {
    slug: 'industrial-consumables',
    name: { en: 'Industrial Consumables', zh: '工业耗材' },
    blurb: {
      en: 'Filters · lubricants · abrasives · cutting tools · PPE',
      zh: '滤芯 · 润滑油 · 磨料 · 刀具 · 劳保用品',
    },
    spec: {
      en: 'Filters · lubricants · abrasives · cutting tools · PPE',
      zh: '滤芯 · 润滑油 · 磨料 · 刀具 · 劳保用品',
    },
    image: imgIndustrialConsumables,
  },
];

/** The footer shows the first eight, as in the approved prototype. */
export const footerCategories = categories.slice(0, 8);
