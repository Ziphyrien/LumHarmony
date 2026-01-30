
import { ColorRow } from './ColorRow';
import type { ColorData, SceneConfig, ColorFormat } from '../../lib/types';
import { t, type Language } from '../../lib/i18n';
import { clsx } from 'clsx';

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
            <div className="flex-1 flex items-center justify-center text-neutral-600">
                <div className="text-center">
                    <p className="text-sm">{t('warn_no_colors', lang)}</p>
                    <p className="text-xs mt-1 text-neutral-700">{t('warn_paste_hint', lang)}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            {/* Header */}
            <div className="grid grid-cols-[30px_1fr_40px_1fr_120px_120px] gap-4 px-4 py-2 border-b border-neutral-800 bg-neutral-950 text-xs font-medium text-neutral-500 uppercase tracking-wider sticky top-0 z-10">
                <div></div>
                <div>{t('col_source', lang)}</div>
                <div></div>
                <div className="flex items-center gap-2">
                    <span>{t('col_adjusted', lang)}</span>
                    <div className="flex bg-neutral-900 rounded p-[2px] border border-neutral-800">
                        <button 
                            onClick={() => onFormatChange('oklch')}
                            className={clsx(
                                "text-[10px] px-1.5 py-0.5 rounded-[2px] transition-all font-mono leading-none",
                                format === 'oklch' ? "bg-neutral-700 text-white shadow-sm" : "text-neutral-600 hover:text-neutral-400"
                            )}
                        >
                            OKLCH
                        </button>
                        <button 
                            onClick={() => onFormatChange('hex')}
                            className={clsx(
                                "text-[10px] px-1.5 py-0.5 rounded-[2px] transition-all font-mono leading-none",
                                format === 'hex' ? "bg-neutral-700 text-white shadow-sm" : "text-neutral-600 hover:text-neutral-400"
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
                        />
                    );
                })}
            </div>
        </div>
    );
}