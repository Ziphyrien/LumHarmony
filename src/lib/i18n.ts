export type Language = 'en' | 'zh';

export const translations = {
  en: {
    // Input Section
    input_title: 'RAW INPUT',
    input_desc: 'Paste hex / CSS color functions anywhere',
    input_placeholder: '#123456 rgb(12 34 56) oklch(60% 0.12 240) ...',
    scene_title: 'TARGET SCENE',

    // Scenes
    scene_light: 'Light Mode',
    scene_light_desc: 'Dark text on white. Targets APCA 60-95.',
    scene_normal: 'Normal / Unified',
    scene_normal_desc: 'Unified lightness. No forced APCA target.',
    scene_contrast: 'High Contrast',
    scene_contrast_desc: 'High contrast on white. Targets APCA 90-100.',

    // Table Headers
    col_source: 'SOURCE COLOR',
    col_adjusted: 'ADJUSTED',
    col_apca: 'APCA SCORE',
    col_rating: 'RATING',
    label_target: 'Target',

    // Status Bar
    status_colors_parsed: 'colors parsed',
    status_copied: 'Copied!',

    // Warnings
    warn_no_colors: 'No colors detected',
    warn_paste_hint: 'Paste hex codes in the input area above',

    // Actions
    set_primary: 'Set as primary reference color',
  },
  zh: {
    // Input Section
    input_title: '原始输入',
    input_desc: '在此处粘贴 HEX / CSS 颜色函数',
    input_placeholder: '#123456 rgb(12 34 56) oklch(60% 0.12 240) ...',
    scene_title: '目标场景',

    // Scenes
    scene_light: '浅色模式',
    scene_light_desc: '白色背景深色文本，目标 APCA 60-95。',
    scene_normal: '标准 / 统一',
    scene_normal_desc: '统一颜色亮度关系，不强制 APCA 目标。',
    scene_contrast: '高对比度',
    scene_contrast_desc: '白色背景高对比文本，目标 APCA 90-100。',

    // Table Headers
    col_source: '原始颜色',
    col_adjusted: '调整后',
    col_apca: 'APCA 分数',
    col_rating: '评级',
    label_target: '目标',

    // Status Bar
    status_colors_parsed: '个颜色已解析',
    status_copied: '已复制!',

    // Warnings
    warn_no_colors: '未检测到颜色',
    warn_paste_hint: '请在上方输入区域粘贴十六进制颜色代码',

    // Actions
    set_primary: '设为主参考色',
  },
};

export type TranslationKey = keyof (typeof translations)['en'];

export function t(key: TranslationKey, lang: Language): string {
  return translations[lang][key] || translations.en[key] || key;
}
