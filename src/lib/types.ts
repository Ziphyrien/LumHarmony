import type { Oklch } from 'culori';
import type { TranslationKey } from './i18n';

export type ColorFormat = 'hex' | 'oklch';

export type SceneType = 'light' | 'normal' | 'contrast';

export interface SceneConfig {
  id: SceneType;
  nameKey: TranslationKey;
  descKey: TranslationKey;
  apcaTarget: {
    min: number;
    max: number;
    optimal: number;
    reference: 'black' | 'white';
  } | null;
}

export interface ColorData {
  id: string;
  hex: string;
  oklch: Oklch;
}
