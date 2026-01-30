
import { useState } from 'react';
import { Download, Copy, Globe, Check } from 'lucide-react';
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
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        onCopyCss();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1 hover:bg-neutral-900 text-xs text-neutral-400 hover:text-neutral-200 transition-colors rounded-sm"
                    title={t('status_copy_css', lang)}
                >
                    {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    <span className={clsx(copied && "text-emerald-500")}>
                        {copied ? t('status_copied', lang) : 'CSS'}
                    </span>
                </button>

                <div className="w-px h-3 bg-neutral-800 mx-2" />

                <button
                    onClick={() => onLanguageChange(lang === 'en' ? 'zh' : 'en')}
                    className="flex items-center gap-1.5 px-3 py-1 hover:bg-neutral-900 text-xs text-neutral-400 hover:text-neutral-200 transition-colors rounded-sm"
                    title="Switch Language"
                >
                    <Globe size={12} />
                    <span className={clsx(lang === 'en' ? "font-sans" : "font-mono")}>
                        {lang === 'en' ? '中文' : 'EN'}
                    </span>
                </button>
            </div>
        </div>
    );
}