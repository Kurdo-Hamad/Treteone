import type { QuoteStrings } from '../en/quote';

/**
 * Chinese copy — quote.
 *
 * ⚠ CLAUDE.md §12 — first-pass Chinese, not yet reviewed by a native speaker.
 * Typed against the English module: a missing, extra or misspelled key fails
 * `astro check`.
 */
export const quote: QuoteStrings = {
  'meta.quote.title': '索取报价 — Treteone',
  'meta.quote.description': '发送部件号、照片或整份清单。无需注册，只需留下联系方式。',

  // ---- quote form ---------------------------------------------------------
  'quote.eyebrow': '索取报价',
  'quote.heading': '告诉我们您的需求。',
  'quote.lede': '永远无需注册账户。发送部件号、照片或整份清单，我们会回复价格与交期。',
  'quote.formLabel': '索取报价',

  'quote.type.label': '您需要什么',
  'quote.type.sparePart': '备件',
  'quote.type.equipment': '设备',
  'quote.type.machinery': '机械',
  'quote.type.automation': '自动化',
  'quote.type.instrumentation': '仪器仪表',
  'quote.type.other': '其他',

  'quote.part.label': '部件号或描述',
  'quote.manufacturer.label': '制造商',
  'quote.quantity.label': '数量',
  'quote.files.label': '附件',
  'quote.files.hint': (maxFiles: number, maxMb: number, totalMb: number) =>
    `支持 PDF、图片和 Excel。最多 ${maxFiles} 个文件，单个不超过 ${maxMb} MB，合计不超过 ${totalMb} MB。`,
  'quote.files.selected': (n: number) => `已选择 ${n} 个文件`,
  'quote.notes.label': '其他需要说明的信息',
  'quote.name.label': '姓名与公司',
  'quote.contact.label': '邮箱或 WhatsApp（必填）',
  'quote.submit': '提交需求',
  'quote.hint': '只有联系方式为必填项。一张模糊的铭牌照片，加上一个联系方式，就足以开始。',

  'quote.part.placeholder': '6ES7 214-1AG40-0XB0',
  'quote.manufacturer.placeholder': 'Siemens',
  'quote.quantity.placeholder': '4',
  'quote.notes.placeholder': '工况、使用条件、需求日期、目的地',

  'quote.aside.files': '文件',
  'quote.aside.reply': '回复',
  'quote.aside.replyBefore': '您将收到一个格式为',
  'quote.aside.replyExample': 'TO-20261026-K7Q3M',
  'quote.aside.replyAfter': '的查询编号，联系我们时请引用。',
  'quote.aside.direct': '直接',
  'quote.sending': '提交中…',

  'quote.honeypot.label': '公司网站',

  'quote.success.title': '需求已收到。',
  'quote.success.body': '我们已收到您的询价，并会通过您提供的联系方式回复。',
  'quote.success.reference': '您的查询编号',
  'quote.error.title': '提交失败。',
  'quote.error.body': (email: string) =>
    `我们这边出现了问题。请直接发送邮件至 ${email}——您的询价比这个表单重要。`,
  'quote.error.contactRequired': '请填写邮箱或WhatsApp号码，以便我们回复。',
  'quote.error.tooManyFiles': (max: number) => `最多只能上传 ${max} 个文件。`,
  'quote.error.fileTooLarge': (name: string, max: number) =>
    `${name} 超过 ${max} MB，请通过邮件单独发送。`,
  'quote.error.totalTooLarge': (max: number) =>
    `附件合计超过 ${max} MB，其余请通过邮件发送。`,
  'quote.error.badType': (name: string) =>
    `${name} 的文件类型不受支持。仅支持 PDF、图片、Excel 与 CSV。`,
};
