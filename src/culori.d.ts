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

    export interface Rgb extends Color {
        mode: 'rgb';
        r: number;
        g: number;
        b: number;
        alpha?: number;
    }

    export function converter(mode: string): (color: string | Color) => Oklch | Rgb | Color;
    export function formatHex(color: string | Color): string;
    export function parse(color: string): Color | undefined;
    export function toGamut(mode: string): (color: Color) => Color;
    export function wcagContrast(color1: string | Color, color2: string | Color): number;
}