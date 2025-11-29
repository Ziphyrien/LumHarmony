export type Language = 'en' | 'zh';

export const translations = {
    en: {
        app_title: 'LumHarmony',
        // Input Section
        input_title: 'RAW INPUT',
        input_desc: 'Paste hex codes anywhere',
        input_placeholder: '#123456 #abcdef ...',
        scene_title: 'TARGET SCENE',
        primary_color_title: 'PRIMARY COLOR',
        
        // Scenes
        scene_light: 'Light Mode',
        scene_light_desc: 'Optimized for dark text on light backgrounds. Targets APCA 60-95.',
        scene_normal: 'Normal / Unified',
        scene_normal_desc: 'Standard unification. Preserves original intent while normalizing lightness.',
        scene_contrast: 'High Contrast',
        scene_contrast_desc: 'Strict accessibility compliance. Targets APCA 90-100 against white.',
        
        // Table Headers
        col_source: 'SOURCE COLOR',
        col_adjusted: 'ADJUSTED',
        col_apca: 'APCA SCORE',
        col_rating: 'RATING',
        label_target: 'Target',
        
        // Status Bar
        status_colors_parsed: 'colors parsed',
        status_export_json: 'Export JSON',
        status_copy_css: 'Copy CSS Vars',
        status_copied: 'Copied!',
        
        // Warnings
        warn_no_colors: 'No colors detected',
        warn_paste_hint: 'Paste hex codes in the input area above',
    },
    zh: {
        app_title: 'LumHarmony',
        // Input Section
        input_title: '原始输入',
        input_desc: '在此处粘贴 HEX 色值',
        input_placeholder: '#123456 #abcdef ...',
        scene_title: '目标场景',
        primary_color_title: '主色 / 背景色',
        
        // Scenes
        scene_light: '浅色模式',
        scene_light_desc: '适用于浅色背景上的深色文本。目标 APCA 60-95。',
        scene_normal: '标准 / 统一',
        scene_normal_desc: '标准统一化处理。在统一亮度时保留原始意图。',
        scene_contrast: '高对比度',
        scene_contrast_desc: '严格的无障碍合规性。针对白色背景目标 APCA 90-100。',
        
        // Table Headers
        col_source: '原始颜色',
        col_adjusted: '调整后',
        col_apca: 'APCA 分数',
        col_rating: '评级',
        label_target: '目标',
        
        // Status Bar
        status_colors_parsed: '个颜色已解析',
        status_export_json: '导出 JSON',
        status_copy_css: '复制 CSS 变量',
        status_copied: '已复制!',
        
        // Warnings
        warn_no_colors: '未检测到颜色',
        warn_paste_hint: '请在上方输入区域粘贴十六进制颜色代码',
    }
};

export function t(key: keyof typeof translations['en'], lang: Language): string {
    return translations[lang][key] || translations['en'][key] || key;
}