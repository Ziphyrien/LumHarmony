
import { useState } from 'react';
import { Download, Copy, Globe, Check, Sparkles } from 'lucide-react';
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
        <div className="flex-none h-12 min-h-[48px] bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between px-5 select-none backdrop-blur-sm">
            <div className="flex items-center gap-4">
                {/* Logo/Brand */}
                <div className="flex items-center gap-2 pr-4 border-r border-white/[0.06]">
                    <div className="p-1 rounded-md bg-[oklch(0.75_0.15_165/0.15)]">
                        <Sparkles size={12} className="text-[oklch(0.75_0.15_165)]" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-400 tracking-wide">LumHarmony</span>
                </div>
                
                <div className="flex items-center gap-4 text-[11px] text-neutral-500 font-mono">
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.75_0.15_165)]" />
                        {parsedCount} {t('status_colors_parsed', lang)}
                    </span>
                    <span className="w-px h-3 bg-white/[0.06]" />
                    <span>{t('scene_title', lang)}: {sceneName}</span>
                </div>
            </div>
            
            <div className="flex items-center gap-1.5">
                <button
                    onClick={onExportJson}
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/[0.05] text-[11px] text-neutral-400 hover:text-neutral-200 transition-all rounded-md border border-transparent hover:border-white/[0.06]"
                    title={t('status_export_json', lang)}
                >
                    <Download size={13} />
                    <span className="font-medium">JSON</span>
                </button>
                <button
                    onClick={handleCopy}
                    className={clsx(
                        "flex items-center gap-2 px-3 py-1.5 text-[11px] transition-all rounded-md border",
                        copied 
                            ? "bg-[oklch(0.75_0.15_165/0.1)] border-[oklch(0.75_0.15_165/0.2)] text-[oklch(0.85_0.12_165)]"
                            : "hover:bg-white/[0.05] text-neutral-400 hover:text-neutral-200 border-transparent hover:border-white/[0.06]"
                    )}
                    title={t('status_copy_css', lang)}
                >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    <span className="font-medium">
                        {copied ? t('status_copied', lang) : 'CSS'}
                    </span>
                </button>

                <div className="w-px h-4 bg-white/[0.06] mx-2" />

                <button
                    onClick={() => onLanguageChange(lang === 'en' ? 'zh' : 'en')}
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/[0.05] text-[11px] text-neutral-400 hover:text-neutral-200 transition-all rounded-md border border-transparent hover:border-white/[0.06]"
                    title="Switch Language"
                >
                    <Globe size={13} />
                    <span className="font-medium">
                        {lang === 'en' ? '中文' : 'EN'}
                    </span>
                </button>
            </div>
        </div>
    );
}
