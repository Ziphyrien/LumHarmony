
import { ColorRow } from './ColorRow';
import type { ColorData, SceneConfig, ColorFormat } from '../../lib/types';
import { t, type Language } from '../../lib/i18n';
import { clsx } from 'clsx';
import { Sparkles } from 'lucide-react';

interface ColorTableProps {
    sourceColors: ColorData[];
    adjustedColors: ColorData[];
    scene: SceneConfig;
    lang: Language;
    primaryColorId: string | null;
    onPrimaryChange: (id: string) => void;
    format: ColorFormat;
    onFormatChange: (format: ColorFormat) => void;
}

export function ColorTable({ sourceColors, adjustedColors, scene, lang, primaryColorId, onPrimaryChange, format, onFormatChange }: ColorTableProps) {
    if (sourceColors.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                        <Sparkles size={28} className="text-neutral-600" />
                    </div>
                    <div>
                        <p className="text-sm text-neutral-500 font-medium">{t('warn_no_colors', lang)}</p>
                        <p className="text-xs mt-1.5 text-neutral-600">{t('warn_paste_hint', lang)}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            {/* Header */}
            <div className="grid grid-cols-[36px_1fr_44px_1fr_130px_130px] gap-4 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02] text-[11px] font-semibold text-neutral-500 uppercase tracking-wider sticky top-0 z-10 backdrop-blur-sm">
                <div></div>
                <div>{t('col_source', lang)}</div>
                <div></div>
                <div className="flex items-center gap-3">
                    <span>{t('col_adjusted', lang)}</span>
                    <div className="flex bg-black/30 rounded-md p-[3px] border border-white/[0.06]">
                        <button 
                            onClick={() => onFormatChange('oklch')}
                            className={clsx(
                                "text-[10px] px-2 py-1 rounded transition-all font-mono leading-none font-medium",
                                format === 'oklch' 
                                    ? "bg-[oklch(0.75_0.15_165/0.2)] text-[oklch(0.85_0.12_165)] shadow-sm" 
                                    : "text-neutral-500 hover:text-neutral-400"
                            )}
                        >
                            OKLCH
                        </button>
                        <button 
                            onClick={() => onFormatChange('hex')}
                            className={clsx(
                                "text-[10px] px-2 py-1 rounded transition-all font-mono leading-none font-medium",
                                format === 'hex' 
                                    ? "bg-[oklch(0.75_0.15_165/0.2)] text-[oklch(0.85_0.12_165)] shadow-sm" 
                                    : "text-neutral-500 hover:text-neutral-400"
                            )}
                        >
                            HEX
                        </button>
                    </div>
                </div>
                <div>{t('col_apca', lang)}</div>
                <div>{t('col_rating', lang)}</div>
            </div>
            
            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto min-h-0">
                {sourceColors.map((source, index) => {
                    const adjusted = adjustedColors[index];
                    if (!adjusted) return null;
                    
                    return (
                        <ColorRow
                            key={`${source.id}-${index}`}
                            source={source}
                            adjusted={adjusted}
                            scene={scene}
                            lang={lang}
                            isPrimary={source.id === primaryColorId}
                            onSetPrimary={() => onPrimaryChange(source.id)}
                            format={format}
                            index={index}
                        />
                    );
                })}
            </div>
        </div>
    );
}
