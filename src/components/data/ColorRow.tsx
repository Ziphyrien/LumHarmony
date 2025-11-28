import React, { useState } from 'react';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { getApcaContrast, getApcaRating } from '../../lib/color-utils';
import type { ColorData, SceneConfig } from '../../lib/types';
import { t, type Language } from '../../lib/i18n';

interface ColorRowProps {
    source: ColorData;
    adjusted: ColorData;
    scene: SceneConfig;
    lang: Language;
}

export function ColorRow({ source, adjusted, scene, lang }: ColorRowProps) {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (hex: string, type: 'source' | 'adjusted') => {
        navigator.clipboard.writeText(hex);
        setCopied(type);
        setTimeout(() => setCopied(null), 1500);
    };

    // APCA Metrics
    const refHex = scene.apcaTarget?.reference === 'white' ? '#ffffff' : '#000000';
    const apcaScore = getApcaContrast(adjusted.hex, refHex);
    const apcaRating = getApcaRating(apcaScore);
    const apcaMag = Math.abs(apcaScore);
    
    // Status Color
    let statusColor = 'text-emerald-500';
    if (scene.apcaTarget) {
        if (apcaMag < scene.apcaTarget.min) statusColor = 'text-red-500';
        else if (apcaMag < scene.apcaTarget.optimal) statusColor = 'text-yellow-500';
    }

    return (
        <div className="grid grid-cols-[1fr_40px_1fr_120px_120px] gap-4 items-center py-2 px-4 border-b border-neutral-800 hover:bg-neutral-900/50 group transition-colors text-sm">
            {/* Source */}
            <div className="flex items-center gap-3">
                <div 
                    className="w-8 h-8 rounded-sm border border-white/10 shadow-sm"
                    style={{ backgroundColor: source.hex }}
                />
                <div className="font-mono text-neutral-400 group-hover:text-neutral-300 cursor-pointer" onClick={() => handleCopy(source.hex, 'source')}>
                    {source.hex}
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
                    style={{ backgroundColor: adjusted.hex }}
                >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 bg-black/20 transition-opacity cursor-pointer" onClick={() => handleCopy(adjusted.hex, 'adjusted')}>
                        <Copy size={12} className="text-white" />
                    </div>
                </div>
                <div className="font-mono text-neutral-200 font-medium cursor-pointer" onClick={() => handleCopy(adjusted.hex, 'adjusted')}>
                    {adjusted.hex}
                </div>
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