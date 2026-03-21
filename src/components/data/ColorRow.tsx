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
    index: number;
}

export function ColorRow({ source, adjusted, scene, lang, isPrimary, onSetPrimary, format, index }: ColorRowProps) {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (color: ColorData) => {
        const text = formatColor(color, format);
        navigator.clipboard.writeText(text);
        setCopied(color.source === 'user' ? 'source' : 'adjusted');
        setTimeout(() => setCopied(null), 1500);
    };

    // APCA Metrics
    const refHex = scene.apcaTarget?.reference === 'black' ? '#000000' : '#ffffff';
    const apcaScore = getApcaContrast(adjusted.hex, refHex);
    const apcaRating = getApcaRating(apcaScore);
    const apcaMag = Math.abs(apcaScore);
    
    // Status Color with improved palette
    let statusColor = 'text-[oklch(0.75_0.18_155)]'; // Green
    let statusBg = 'bg-[oklch(0.75_0.18_155/0.15)]';
    if (scene.apcaTarget) {
        if (apcaMag < scene.apcaTarget.min) {
            statusColor = 'text-[oklch(0.65_0.2_25)]'; // Red
            statusBg = 'bg-[oklch(0.65_0.2_25/0.15)]';
        } else if (apcaMag < scene.apcaTarget.optimal) {
            statusColor = 'text-[oklch(0.8_0.15_85)]'; // Yellow
            statusBg = 'bg-[oklch(0.8_0.15_85/0.15)]';
        }
    }

    return (
        <div 
            className={clsx(
                "grid grid-cols-[36px_1fr_44px_1fr_130px_130px] gap-4 items-center py-3 px-5 border-b border-white/[0.04] hover:bg-white/[0.02] group transition-all duration-200 text-sm relative",
                isPrimary && "bg-[oklch(0.75_0.15_165/0.05)]"
            )}
            style={{ animationDelay: `${index * 30}ms` }}
        >
            {/* Primary Selection - Expanded click area */}
            <div 
                className="absolute left-0 top-0 bottom-0 w-[52px] flex items-center justify-center cursor-pointer outline-none z-10 group/primary"
                onClick={onSetPrimary}
            >
                <div className={clsx(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    isPrimary 
                        ? "bg-[oklch(0.75_0.15_165)] shadow-[0_0_10px_oklch(0.75_0.15_165/0.6)] opacity-100 scale-100" 
                        : "bg-neutral-700 opacity-0 group-hover:opacity-60 scale-75"
                )} />

                {/* Custom Tooltip */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-1.5 px-2.5 py-1.5 bg-[oklch(0.15_0.005_260)] border border-white/10 text-neutral-400 text-[10px] rounded-md opacity-0 group-hover/primary:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-2xl">
                    {t('set_primary', lang)}
                </div>
            </div>

            {/* Spacer for grid alignment */}
            <div></div>

            {/* Source */}
            <div className="flex items-center gap-3.5">
                <div 
                    className="w-9 h-9 rounded-lg border border-white/10 shadow-lg ring-1 ring-black/20"
                    style={{ backgroundColor: source.hex }}
                />
                <div 
                    className="font-mono text-[13px] text-neutral-500 group-hover:text-neutral-400 cursor-pointer transition-colors" 
                    onClick={() => handleCopy(source)}
                >
                    {formatColor(source, format)}
                </div>
                {copied === 'source' && <Check size={14} className="text-[oklch(0.75_0.15_165)]" />}
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                    <ArrowRight size={14} className="text-neutral-500" />
                </div>
            </div>

            {/* Adjusted */}
            <div className="flex items-center gap-3.5">
                <div 
                    className="w-9 h-9 rounded-lg border border-white/10 shadow-lg ring-1 ring-black/20 relative group/preview overflow-hidden"
                    style={{ backgroundColor: formatColor(adjusted, format) }}
                >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 bg-black/30 backdrop-blur-sm transition-all cursor-pointer" onClick={() => handleCopy(adjusted)}>
                        <Copy size={14} className="text-white drop-shadow-lg" />
                    </div>
                </div>
                <div 
                    className="font-mono text-[13px] text-neutral-200 font-medium cursor-pointer hover:text-white transition-colors" 
                    onClick={() => handleCopy(adjusted)}
                >
                    {formatColor(adjusted, format)}
                </div>
                {/* Hex Clip Warning */}
                {format === 'oklch' && (
                    <div className="group/gamut relative flex items-center ml-1">
                         <div className="text-[10px] px-2 py-1 rounded-md text-neutral-500 bg-black/30 border border-white/[0.06] font-mono opacity-50 group-hover/gamut:opacity-100 transition-opacity cursor-help">
                            {adjusted.hex}
                         </div>
                         
                         {/* Tooltip */}
                         <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-[oklch(0.15_0.005_260)] border border-white/10 text-neutral-400 text-[10px] rounded-md opacity-0 group-hover/gamut:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-2xl">
                            {t('warn_gamut_clipped', lang)}
                         </div>
                    </div>
                )}
                {copied === 'adjusted' && <Check size={14} className="text-[oklch(0.75_0.15_165)]" />}
            </div>

            {/* Metrics */}
            <div className="flex flex-col justify-center">
                <div className="font-mono text-neutral-300 text-[13px]">
                    Lc {apcaScore.toFixed(1)}
                </div>
                {scene.apcaTarget && (
                    <div className="text-[10px] text-neutral-600 mt-0.5">
                        {t('label_target', lang)}: {scene.apcaTarget.min}-{scene.apcaTarget.max}
                    </div>
                )}
            </div>

            {/* Status */}
            <div className={clsx("font-medium text-xs flex items-center gap-2.5 px-2.5 py-1.5 rounded-md w-fit", statusColor, statusBg)}>
                <div className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_4px_currentColor]" />
                {apcaRating}
            </div>
        </div>
    );
}
