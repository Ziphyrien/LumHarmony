import React from 'react';
import type { SceneType } from '../../lib/types';
import { SceneSelector } from './SceneSelector';
import { t, type Language } from '../../lib/i18n';

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
        <div className="flex-none grid grid-cols-[1fr_300px] border-b border-neutral-800 divide-x divide-neutral-800">
            <div className="flex flex-col h-full min-h-0">
                <div className="px-4 py-3 border-b border-neutral-800 flex justify-between items-center bg-neutral-950">
                    <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">{t('input_title', lang)}</h3>
                    <span className="text-xs text-neutral-600">{t('input_desc', lang)}</span>
                </div>
                <textarea
                    value={inputString}
                    onChange={(e) => onInputChange(e.target.value)}
                    placeholder={t('input_placeholder', lang)}
                    className="flex-1 w-full bg-neutral-950 p-4 font-mono text-sm text-neutral-300 placeholder:text-neutral-700 resize-none focus:outline-none focus:bg-neutral-900/30 transition-colors"
                    spellCheck={false}
                />
            </div>
            
            <div className="bg-neutral-950 flex flex-col">
                <SceneSelector
                    selected={selectedScene}
                    onChange={onSceneChange}
                    lang={lang}
                />
            </div>
        </div>
    );
}