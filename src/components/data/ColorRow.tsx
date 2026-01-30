import { useState } from 'react';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { getApcaContrast, getApcaRating, formatColor } from '../../lib/color-utils';
import type { ColorData, SceneConfig, ColorFormat } from '../../lib/types';
import { t, type Language } from '../../lib/i18n';

interface ColorRowProps {
    source: ColorData;
    adjusted: ColorData;
    scene: SceneConfig;
    lang: Language;
    isPrimary: boolean;
    onSetPrimary: () => void;
    format: ColorFormat;
}

export function ColorRow({ source, adjusted, scene, lang, isPrimary, onSetPrimary, format }: ColorRowProps) {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (color: ColorData) => {
        const text = formatColor(color, format);
        navigator.clipboard.writeText(text);
        setCopied(color.source === 'user' ? 'source' : 'adjusted');
        setTimeout(() => setCopied(null), 1500);
    };

    // APCA Metrics
    // Default to white reference if not specified (consistent with light/contrast scenes)
    const refHex = scene.apcaTarget?.reference === 'black' ? '#000000' : '#ffffff';
    const apcaScore = getApcaContrast(adjusted.hex, refHex);
    const apcaRating = getApcaRating(apcaScore);
    const apcaMag = Math.abs(apcaScore);
    
    // Status Color
    let statusColor = 'text-emerald-500';
    if (scene.apcaTarget) {
        if (apcaMag < scene.apcaTarget.min) statusColor = 'text-red-500';
        else if (apcaMag < scene.apcaTarget.optimal) statusColor = 'text-yellow-500';
    }

    // Check if clipped (Hex differs significantly from OKLCH intent)
    // Simple check: if we are in OKLCH mode, we can show if Hex fallback is clipped
    // Or just always show if the color is out of gamut
    // Since we don't have isClipped flag computed yet, we can check if source was 'adjusted' and presumably high chroma?
    // Actually, color-utils handles this via rgbGamut. We can check if `color.hex`'s oklch value is different from `color.oklch`.
    // Let's do a quick check on render.
    
    // Wait, a better way is to see if we want to warn about HEX output being clipped.
    // The user asked for "show hex hint".
    // Let's add an indicator next to the color value.

    return (
        <div className={clsx(
            "grid grid-cols-[30px_1fr_40px_1fr_120px_120px] gap-4 items-center py-2 px-4 border-b border-neutral-800 hover:bg-neutral-900/50 group transition-colors text-sm relative",
            isPrimary && "bg-neutral-900/30"
        )}>
            {/* Primary Selection - Expanded click area */}
            <div 
                className="absolute left-0 top-0 bottom-0 w-[46px] flex items-center justify-center cursor-pointer outline-none z-10 group/primary"
                onClick={onSetPrimary}
            >
                <div className={clsx(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    isPrimary 
                        ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] opacity-100" 
                        : "bg-neutral-700 opacity-0 group-hover:opacity-100"
                )} />

                {/* Custom Tooltip */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-1 px-2 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 text-[10px] rounded opacity-0 group-hover/primary:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                    {t('set_primary', lang)}
                </div>
            </div>

            {/* Spacer for grid alignment */}
            <div></div>

            {/* Source */}
            <div className="flex items-center gap-3">
                <div 
                    className="w-8 h-8 rounded-sm border border-white/10 shadow-sm"
                    style={{ backgroundColor: source.hex }}
                />
                <div className="font-mono text-neutral-400 group-hover:text-neutral-300 cursor-pointer" onClick={() => handleCopy(source)}>
                    {formatColor(source, format)}
                </div>
                {copied === 'source' && <Check size={12} className="text-emerald-500" />}
            </div>

            {/* Arrow */}
            <div className="flex justify-center text-neutral-600">
                <ArrowRight size={14} />
            </div>

            {/* Adjusted */}
            <div className="flex items-center gap-3">
                <div 
                    className="w-8 h-8 rounded-sm border border-white/10 shadow-sm relative group/preview"
                    style={{ backgroundColor: formatColor(adjusted, format) }}
                >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 bg-black/20 transition-opacity cursor-pointer" onClick={() => handleCopy(adjusted)}>
                        <Copy size={12} className="text-white" />
                    </div>
                </div>
                <div className="font-mono text-neutral-200 font-medium cursor-pointer" onClick={() => handleCopy(adjusted)}>
                    {formatColor(adjusted, format)}
                </div>
                {/* Hex Clip Warning */}
                {format === 'oklch' && (
                    <div className="group/gamut relative flex items-center ml-2">
                         <div className="text-[10px] px-1.5 py-0.5 rounded text-neutral-500 bg-neutral-900 border border-neutral-800 font-mono opacity-60 group-hover/gamut:opacity-100 transition-opacity cursor-help">
                            {adjusted.hex}
                         </div>
                         
                         {/* Tooltip */}
                         <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 text-[10px] rounded opacity-0 group-hover/gamut:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                            {t('warn_gamut_clipped', lang)}
                         </div>
                    </div>
                )}
                {copied === 'adjusted' && <Check size={12} className="text-emerald-500" />}
            </div>

            {/* Metrics */}
            <div className="flex flex-col justify-center">
                <div className="font-mono text-neutral-300">
                    Lc {apcaScore.toFixed(1)}
                </div>
                {scene.apcaTarget && (
                    <div className="text-[10px] text-neutral-500 mt-0.5">
                        {t('label_target', lang)}: {scene.apcaTarget.min}-{scene.apcaTarget.max}
                    </div>
                )}
            </div>

            {/* Status */}
            <div className={clsx("font-medium text-xs flex items-center gap-2", statusColor)}>
                <div className={clsx("w-1.5 h-1.5 rounded-full bg-current")} />
                {apcaRating}
            </div>
        </div>
    );
}