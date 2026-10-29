import type { ImageMetadata } from 'astro';
import type { Localised } from '~/i18n/ui';

import imgComponent from '~/assets/scope/component.jpg';
import imgSparePart from '~/assets/scope/spare-part.jpg';
import imgAssembly from '~/assets/scope/assembly.jpg';
import imgMachine from '~/assets/scope/machine.jpg';
import imgCompleteSystem from '~/assets/scope/complete-system.jpg';

/**
 * The 5 component-to-system stages (CLAUDE.md §3), driving the ScopeScroller
 * (§6.6). The order is the argument the section makes — a single bearing at one
 * end, a complete system at the other, one team across all five — so it is the
 * array order and nothing else.
 *
 * ⚠ §10 — the photography has not been supplied. Every `image` is a
 * "PHOTOGRAPH PENDING" plate from scripts/make-placeholders.mjs. Replace
 * src/assets/scope/<slug>.jpg with the real file; nothing else changes.
 * These are portrait: the media column is sticky and full height.
 */
export interface ScopeStage {
  readonly slug: string;
  readonly name: Localised;
  readonly description: Localised;
  readonly image: ImageMetadata;
}

export const scopeStages: readonly ScopeStage[] = [
  {
    slug: 'component',
    name: { en: 'Component', zh: '零件' },
    description: {
      en: 'A bearing, a seal, a sensor. Identified from a photo or a worn original.',
      zh: '一只轴承、一套密封、一个传感器。可凭照片或旧件确认。',
    },
    image: imgComponent,
  },
  {
    slug: 'spare-part',
    name: { en: 'Spare part', zh: '备件' },
    description: {
      en: 'OEM references and tested equivalents, quoted side by side.',
      zh: '原厂件与经验证的替代件并列报价。',
    },
    image: imgSparePart,
  },
  {
    slug: 'assembly',
    name: { en: 'Assembly', zh: '组件' },
    description: {
      en: 'Valve and actuator sets, pump ends, drive packages.',
      zh: '阀门执行机构、泵头、传动总成。',
    },
    image: imgAssembly,
  },
  {
    slug: 'machine',
    name: { en: 'Machine', zh: '设备' },
    description: {
      en: 'Pumps, motors, compressors, sized to the duty you give us.',
      zh: '按您提供的工况选型的泵、电机、压缩机。',
    },
    image: imgMachine,
  },
  {
    slug: 'complete-system',
    name: { en: 'Complete system', zh: '成套系统' },
    description: {
      en: 'Skids, production lines and full equipment packages.',
      zh: '橇装设备、生产线与整套设备包。',
    },
    image: imgCompleteSystem,
  },
];
