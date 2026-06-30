import { calcAPCA } from 'apca-w3';
import { converter, formatHex, parse, toGamut, type Color, type Oklch } from 'culori';
import type { ColorData, ColorFormat, SceneConfig, SceneType } from '$lib/types';

const toOklch = converter('oklch') as (color: string | Color) => Oklch;
const rgbGamut = toGamut('rgb');

export const SCENES: Record<SceneType, SceneConfig> = {
  light: {
    id: 'light',
    nameKey: 'scene_light',
    descKey: 'scene_light_desc',
    apcaTarget: { min: 60, max: 95, optimal: 75, reference: 'white' },
  },
  normal: {
    id: 'normal',
    nameKey: 'scene_normal',
    descKey: 'scene_normal_desc',
    apcaTarget: null,
  },
  contrast: {
    id: 'contrast',
    nameKey: 'scene_contrast',
    descKey: 'scene_contrast_desc',
    apcaTarget: { min: 90, max: 100, optimal: 95, reference: 'white' },
  },
};

export function createColorData(color: string, id: string): ColorData {
  return {
    id,
    hex: formatHex(color),
    oklch: toOklch(color),
  };
}

const COLOR_CANDIDATE_RE =
  /(?:^|[^\w-])((?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\([^)]*\)|#?(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})\b)(?![\w-])/gi;

function toHexColor(value: string): string | null {
  const candidate = value.startsWith('#') || value.includes('(') ? value : `#${value}`;
  const color = parse(candidate);
  return color ? formatHex(color) : null;
}

export function extractColors(input: string): string[] {
  return [...input.matchAll(COLOR_CANDIDATE_RE)]
    .map((match) => toHexColor(match[1]))
    .filter((hex): hex is string => hex !== null);
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

function findLForApca(
  originalOklch: Oklch,
  targetLcMag: number,
  reference: 'black' | 'white',
): number {
  const refHex = reference === 'black' ? '#000000' : '#ffffff';
  let min = 0;
  let max = 1;
  let bestL = originalOklch.l;
  let minDiff = Infinity;

  for (let i = 0; i < 20; i++) {
    const mid = (min + max) / 2;
    const hex = formatHex(rgbGamut({ ...originalOklch, l: mid }));
    const mag = Math.abs(calcAPCA(hex, refHex) as number);
    const diff = Math.abs(mag - targetLcMag);

    if (diff < minDiff) {
      minDiff = diff;
      bestL = mid;
    }

    if (diff < 0.01) break;

    if (reference === 'black') {
      if (mag < targetLcMag) min = mid;
      else max = mid;
    } else {
      if (mag < targetLcMag) max = mid;
      else min = mid;
    }
  }

  return bestL;
}

export function adjustColorsToScene(
  colors: ColorData[],
  sceneId: SceneType,
  referenceId: string | null,
): ColorData[] {
  if (!colors.length) return [];

  const scene = SCENES[sceneId];
  const refColor = colors.find((color) => color.id === referenceId) ?? colors[0];
  const targetL = refColor.oklch.l;
  let targetApcaMag: number | null = null;

  if (scene.apcaTarget) {
    const refHex = scene.apcaTarget.reference === 'white' ? '#ffffff' : '#000000';
    const currentMag = Math.abs(calcAPCA(refColor.hex, refHex) as number);
    targetApcaMag = Math.max(
      scene.apcaTarget.min + 0.2,
      Math.min(scene.apcaTarget.max, currentMag),
    );
  }

  return colors.map((color) => {
    const finalL =
      scene.apcaTarget && targetApcaMag !== null
        ? findLForApca(color.oklch, targetApcaMag, scene.apcaTarget.reference)
        : targetL;
    const oklch = { ...color.oklch, l: finalL };

    return {
      ...color,
      hex: formatHex(rgbGamut(oklch)),
      oklch,
    };
  });
}

export function formatColor(color: ColorData, format: ColorFormat): string {
  if (format === 'hex') return color.hex;

  const l = `${(color.oklch.l * 100).toFixed(2)}%`;
  const c = color.oklch.c.toFixed(4);
  const h = color.oklch.h?.toFixed(2) ?? '0';

  return `oklch(${l} ${c} ${h})`;
}
