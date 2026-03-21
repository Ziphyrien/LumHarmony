
import type { SceneType } from '../../lib/types';
import { SceneSelector } from './SceneSelector';
import { t, type Language } from '../../lib/i18n';
import { Palette } from 'lucide-react';

interface InputSectionProps {
    inputString: string;
    onInputChange: (value: string) => void;
    selectedScene: SceneType;
    onSceneChange: (scene: SceneType) => void;
    lang: Language;
}

export function InputSection({
    inputString,
    onInputChange,
    selectedScene,
    onSceneChange,
    lang
}: InputSectionProps) {
    return (
        <div className="flex-none grid grid-cols-[1fr_320px] border-b border-white/[0.06]">
            <div className="flex flex-col h-full min-h-0">
                <div className="px-5 py-3.5 border-b border-white/[0.06] flex justify-between items-center bg-white/[0.02] backdrop-blur-sm">
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-md bg-[oklch(0.75_0.15_165/0.15)]">
                            <Palette size={14} className="text-[oklch(0.75_0.15_165)]" />
                        </div>
                        <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">{t('input_title', lang)}</h3>
                    </div>
                    <span className="text-[11px] text-neutral-500 font-medium">{t('input_desc', lang)}</span>
                </div>
                <div className="relative flex-1">
                    <textarea
                        value={inputString}
                        onChange={(e) => onInputChange(e.target.value)}
                        placeholder={t('input_placeholder', lang)}
                        className="absolute inset-0 w-full h-full bg-transparent p-5 font-mono text-sm text-neutral-300 placeholder:text-neutral-600 resize-none focus:outline-none transition-colors leading-relaxed"
                        spellCheck={false}
                    />
                    {/* Subtle inner glow on focus */}
                    <div className="absolute inset-0 pointer-events-none rounded-sm ring-1 ring-inset ring-white/[0.03] transition-all duration-300 peer-focus:ring-[oklch(0.75_0.15_165/0.2)]" />
                </div>
            </div>
            
            <div className="bg-white/[0.01] flex flex-col h-full border-l border-white/[0.06]">
                <SceneSelector
                    selected={selectedScene}
                    onChange={onSceneChange}
                    lang={lang}
                />
            </div>
        </div>
    );
}
