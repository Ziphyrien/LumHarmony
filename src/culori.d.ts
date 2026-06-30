declare module 'culori' {
  export interface Color {
    mode: string;
    [key: string]: unknown;
  }

  export interface Oklch extends Color {
    mode: 'oklch';
    l: number;
    c: number;
    h?: number;
  }

  export function converter(mode: string): (color: string | Color) => Color;
  export function formatHex(color: string | Color): string;
  export function parse(color: string): Color | undefined;
  export function toGamut(mode: string): (color: Color) => Color;
}
