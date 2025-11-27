import { Palette, RotateCcw, Languages } from 'lucide-react';
import { useLanguage } from '../../store/LanguageContext';

interface HeaderProps {
    hasContent?: boolean;
    onReset?: () => void;
    className?: string;
}

export function Header({ hasContent = false, onReset, className = '' }: HeaderProps) {
    const { t, lang, setLang } = useLanguage();

    return (
        <header className={`
            fixed top-0 left-0 right-0 z-50 transition-all duration-500
            ${hasContent ? 'py-4 glass-nav' : 'py-6 bg-transparent'}
            ${className}
        `}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl glass-mini">
                        <Palette size={20} className="text-slate-800" />
                    </div>
                    <div className={`font-bold tracking-tight text-slate-800 transition-opacity ${hasContent ? 'opacity-100' : 'opacity-80'}`}>
                        {t('title')}
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
                        className="glass-button flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                    >
                        <Languages size={14} />
                        {lang === 'en' ? '中文' : 'EN'}
                    </button>
                    {hasContent && onReset && (
                        <button
                            onClick={onReset}
                            className="glass-button flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:text-red-600 hover:border-red-200 hover:bg-red-50/50"
                        >
                            <RotateCcw size={14} />
                            {t('reset')}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}