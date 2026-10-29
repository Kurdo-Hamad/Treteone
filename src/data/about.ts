import type { Localised } from '~/i18n/ui';

/**
 * The six points in the About section (CLAUDE.md §6.11).
 *
 * These are the answer to the second job in §1 — surviving the "are these
 * people real?" check — so every one has to be a statement about how the
 * company works that can be verified on this page or in an email. §11 forbids
 * faked certifications, client names and numbers; there are none here.
 *
 * The last point is a claim about the footer, and the footer cannot yet back it
 * up: §10 still lists the registered name and licence number as unsupplied. It
 * therefore carries a `pendingDescription`, which the component uses while
 * those fields are placeholders. The confident wording appears by itself the
 * moment src/data/company.ts has real values — nothing to remember to change.
 */
export interface AboutPoint {
  readonly slug: string;
  readonly title: Localised;
  readonly description: Localised;
  /** Used instead of `description` while the registration details are pending. */
  readonly pendingDescription?: Localised;
}

export const aboutPoints: readonly AboutPoint[] = [
  {
    slug: 'specifications',
    title: { en: 'We read specifications', zh: '读得懂规格' },
    description: {
      en: 'Part numbers, equipment models and datasheets — not just product names.',
      zh: '不只是产品名称，我们看得懂部件号、设备型号和数据表。',
    },
  },
  {
    slug: 'brand-neutral',
    title: { en: 'Not tied to one brand', zh: '不限于单一品牌' },
    description: {
      en: 'We quote the manufacturer that fits the duty, not the one we carry.',
      zh: '按工况选择合适的制造商，而非只推手上有的。',
    },
  },
  {
    slug: 'hard-to-find',
    title: { en: 'Hard-to-find is routine', zh: '难寻件是日常' },
    description: {
      en: 'Obsolete and discontinued components are normal work here.',
      zh: '停产与淘汰件的寻源是我们的常规业务。',
    },
  },
  {
    slug: 'one-channel',
    title: { en: 'One channel, whole scope', zh: '一个渠道，全部范围' },
    description: {
      en: 'A single item or a full BOQ goes through the same team.',
      zh: '单件采购与整份清单由同一团队处理。',
    },
  },
  {
    slug: 'documentation',
    title: { en: 'Documentation where available', zh: '尽可能提供文件' },
    description: {
      en: 'Datasheets and certificates supplied when the supplier provides them.',
      zh: '在供应商可提供时随货附上数据表与证书。',
    },
  },
  {
    slug: 'registered',
    title: { en: 'A registered company', zh: '正规注册企业' },
    description: {
      en: 'Registered name, address and licence number published in the footer.',
      zh: '公司注册名称、地址与营业执照号公示于页脚。',
    },
    pendingDescription: {
      en: 'A registered Guangzhou company. Our address is in the footer, and the registered name and licence number go there before launch.',
      zh: '在广州注册的公司。地址已在页脚公示，注册名称与营业执照号将于上线前一并公布。',
    },
  },
];
