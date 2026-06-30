import type { ColorData, ColorFormat } from '$lib/types';
import { formatColor } from '$lib/color';

export function toCssVars(colors: ColorData[], format: ColorFormat): string {
  return colors
    .map((color, index) => `--color-${index + 1}: ${formatColor(color, format)};`)
    .join('\n');
}

export function toExportRows(adjustedColors: ColorData[], sourceColors: ColorData[]) {
  return adjustedColors.map((color, index) => ({
    hex: color.hex,
    oklch: formatColor(color, 'oklch'),
    sourceHex: sourceColors[index]?.hex,
  }));
}

export function downloadJson(filename: string, data: unknown): void {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }),
  );
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
