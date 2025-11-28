import React from 'react';
import { Download, Copy, Globe } from 'lucide-react';
import { t, type Language } from '../../lib/i18n';
import { clsx } from 'clsx';

interface StatusBarProps {
    parsedCount: number;
    sceneName: string;
    onExportJson: () => void;
    onCopyCss: () => void;
    lang: Language;
    onLanguageChange: (lang: Language) => void;
}

export function StatusBar({ parsedCount, sceneName, onExportJson, onCopyCss, lang, onLanguageChange }: StatusBarProps) {
    return (
        <div className="flex-none h-10 min-h-[40px] bg-neutral-950 border-t border-neutral-800 flex items-center justify-between px-4 select-none">
            <div className="flex items-center gap-4 text-xs text-neutral-500 font-mono">
                <span>{parsedCount} {t('status_colors_parsed', lang)}</span>
                <span className="w-px h-3 bg-neutral-800" />
                <span>{t('scene_title', lang)}: {sceneName}</span>
            </div>
            
            <div className="flex items-center gap-2">
                <button
                    onClick={onExportJson}
                    className="flex items-center gap-1.5 px-3 py-1 hover:bg-neutral-900 text-xs text-neutral-400 hover:text-neutral-200 transition-colors rounded-sm"
                    title={t('status_export_json', lang)}
                >
                    <Download size={12} />
                    <span>JSON</span>
                </button>
                <button
                    onClick={onCopyCss}
                    className="flex items-center gap-1.5 px-3 py-1 hover:bg-neutral-900 text-xs text-neutral-400 hover:text-neutral-200 transition-colors rounded-sm"
                    title={t('status_copy_css', lang)}
                >
                    <Copy size={12} />
                    <span>CSS</span>
                </button>
                
                <div className="w-px h-3 bg-neutral-800 mx-2" />

                <button
                    onClick={() => onLanguageChange(lang === 'en' ? 'zh' : 'en')}
                    className="flex items-center justify-center gap-1.5 px-3 py-1 min-w-[70px] hover:bg-neutral-900 text-xs text-neutral-400 hover:text-neutral-200 transition-colors rounded-sm"
                    title="Switch Language"
                >
                    <Globe size={12} />
                    <span className={clsx("uppercase", lang === 'zh' ? "font-sans" : "font-mono")}>
                        {lang === 'en' ? 'EN' : '中文'}
                    </span>
                </button>
            </div>
        </div>
    );
}