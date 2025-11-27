import type { Oklch } from 'culori';

export type SceneType = 'light' | 'normal' | 'contrast';

export interface SceneConfig {
    id: SceneType;
    nameKey: string;
    descKey: string;
    icon: string; // Lucide icon name or class
    targetL: { min: number; max: number; optimal?: number } | null; // OKLCH Lightness 0.0 - 1.0
    usageKey: string;
}

export interface ColorData {
    id: string;
    hex: string;
    oklch: Oklch;
    source: 'user' | 'adjusted';
}

export interface AnalysisIssue {
    type: 'warning' | 'error' | 'success';
    message: string;
    value?: string | number;
}

export interface HarmonyAnalysis {
    primaryConsistency: boolean;
    targetLCompliance: boolean;
    apcaScore?: number; // Lc value against background
    apcaRating?: string;
    issues: AnalysisIssue[];
}