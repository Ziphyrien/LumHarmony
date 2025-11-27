import { 
    converter, 
    formatHex, 
    toGamut, 
    parse,
    type Oklch,
    type Color
} from 'culori';
import { calcAPCA } from 'apca-w3';
import type { ColorData, SceneType, SceneConfig, AnalysisIssue, HarmonyAnalysis } from './types';

// 初始化转换器
const toOklch = converter('oklch') as (c: string | Color) => Oklch;
const rgbGamut = toGamut('rgb');

// 场景定义常量
export const SCENES: Record<SceneType, SceneConfig> = {
    light: {
        id: 'light',
        nameKey: 'scene_light',
        descKey: 'scene_light_desc',
        icon: 'Sun',
        targetL: { min: 0.70, max: 0.95, optimal: 0.85 },
        usageKey: 'scene_light_usage'
    },
    normal: {
        id: 'normal',
        nameKey: 'scene_normal',
        descKey: 'scene_normal_desc',
        icon: 'Circle',
        targetL: null, // 动态跟随基准色
        usageKey: 'scene_normal_usage'
    },
    contrast: {
        id: 'contrast',
        nameKey: 'scene_contrast',
        descKey: 'scene_contrast_desc',
        icon: 'Zap',
        targetL: { min: 0.30, max: 0.55, optimal: 0.40 },
        usageKey: 'scene_contrast_usage'
    }
};

// 颜色处理工具函数
export function createColorData(hex: string, id: string, source: 'user' | 'adjusted' = 'user'): ColorData {
    const oklch = toOklch(hex);
    return {
        id,
        hex: formatHex(hex),
        oklch,
        source
    };
}

export function isValidHex(hex: string): boolean {
    return !!parse(hex);
}

export function extractHexCodes(input: string): string[] {
    // Matches hex codes with or without #, 3, 6, or 8 digits
    // \b ensures word boundary to avoid partial matches inside other words if possible,
    // but hex codes can be adjacent to punctuation.
    // The regex below captures:
    // # followed by 3, 4, 6, or 8 hex digits
    // OR
    // 3, 4, 6, or 8 hex digits preceded by a word boundary or whitespace
    
    const regex = /#?([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})\b/g;
    const matches = input.match(regex);
    
    if (!matches) return [];

    return matches.map(match => {
        // Ensure it starts with #
        let hex = match;
        if (!hex.startsWith('#')) {
            hex = '#' + hex;
        }
        // Validate with culori to be sure
        if (isValidHex(hex)) {
            return formatHex(hex);
        }
        return null;
    }).filter((c): c is string => c !== null);
}

// APCA 对比度计算
export function getApcaContrast(textColor: string, bgColor: string): number {
    return calcAPCA(textColor, bgColor) as number;
}

export function getApcaRating(score: number): string {
    const absScore = Math.abs(score);
    if (absScore >= 90) return 'AAA (Preferred)';
    if (absScore >= 75) return 'AAA (Body Text)';
    if (absScore >= 60) return 'AA (Readable)';
    if (absScore >= 45) return 'AA (Large Text)';
    if (absScore >= 30) return 'A (Spot Text)';
    return 'Fail';
}

// 自动调整逻辑
export function adjustColorsToScene(
    colors: ColorData[], 
    sceneId: SceneType, 
    referenceId: string | null
): ColorData[] {
    if (!colors.length) return [];

    const scene = SCENES[sceneId];
    const refColor = colors.find(c => c.id === referenceId) || colors[0];
    
    // 1. 确定目标明度 L
    let targetL = refColor.oklch.l;

    if (scene.targetL) {
        // 如果场景有明确的明度范围，将目标 L 限制在范围内
        targetL = Math.max(scene.targetL.min, Math.min(scene.targetL.max, targetL));
    }
    // 如果是 normal 场景，targetL 就是基准色的原始 L，不做额外限制

    // 2. 调整所有颜色
    return colors.map(color => {
        const newOklch = { ...color.oklch, l: targetL };
        // 色域映射：确保颜色在 RGB 范围内，防止颜色崩坏
        const gamutedColor = rgbGamut(newOklch);
        const newHex = formatHex(gamutedColor);

        return {
            ...color,
            hex: newHex,
            oklch: toOklch(newHex), // 重新解析以确保数据一致性
            source: 'adjusted'
        };
    });
}

// 分析逻辑
export function analyzeHarmony(
    colors: ColorData[],
    sceneId: SceneType,
    bgColor?: ColorData,
    textColor?: ColorData
): HarmonyAnalysis {
    const issues: AnalysisIssue[] = [];
    const scene = SCENES[sceneId];
    
    // 1. 检查主色一致性
    const lValues = colors.map(c => c.oklch.l);
    const avgL = lValues.reduce((a, b) => a + b, 0) / (lValues.length || 1);
    const variance = lValues.reduce((a, b) => a + Math.pow(b - avgL, 2), 0) / (lValues.length || 1);
    const stdDev = Math.sqrt(variance);
    
    const primaryConsistency = stdDev < 0.05; // 允许 5% 的明度偏差

    if (!primaryConsistency && colors.length > 1) {
        issues.push({
            type: 'warning',
            message: 'analysis_primary_inconsistency'
        });
    }

    // 2. 检查场景符合度
    let targetLCompliance = true;
    if (scene.targetL) {
        const outOfBounds = colors.filter(c => c.oklch.l < scene.targetL!.min || c.oklch.l > scene.targetL!.max);
        if (outOfBounds.length > 0) {
            targetLCompliance = false;
            issues.push({
                type: 'warning',
                message: 'analysis_target_noncompliance',
                value: outOfBounds.length
            });
        }
    }

    // 3. 检查 APCA 对比度 (如果有背景色和文字色)
    let apcaScore = undefined;
    let apcaRating = undefined;

    if (bgColor && textColor) {
        apcaScore = getApcaContrast(textColor.hex, bgColor.hex);
        apcaRating = getApcaRating(apcaScore);

        if (Math.abs(apcaScore) < 45) {
            issues.push({
                type: 'error',
                message: 'analysis_text_contrast_low'
            });
        }
    }

    return {
        primaryConsistency,
        targetLCompliance,
        apcaScore,
        apcaRating,
        issues
    };
}