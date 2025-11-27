import type { Oklch } from 'culori';

export type SceneType = 'light' | 'normal' | 'contrast';

export interface SceneConfig {
    id: SceneType;
    nameKey: string;
    descKey: string;
    icon: string; // Lucide icon name or class
    targetL?: { min: number; max: number; optimal?: number } | null; // Legacy OKLCH Lightness
    apcaTarget?: {
        min: number;
        max: number;
        optimal: number;
        reference: 'black' | 'white';
    } | null;
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
    targetLCompliance: boolean; // Checks APCA compliance if configured
    apcaScore?: number; // Lc value against scene reference
    apcaRating?: string;
    issues: AnalysisIssue[];
}