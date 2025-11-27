import { motion } from 'framer-motion';
import { useLanguage } from '../store/LanguageContext';
import { useColor } from '../store/ColorContext';
import { HeroInput } from './HeroInput';
import { Header } from './layout/Header';

export function HeroSection() {
    const { t } = useLanguage();
    const { dispatch } = useColor();

    return (
        <>
            {/* Header in Hero mode (transparent) */}
            <Header hasContent={false} />

            <motion.div 
                key="hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col justify-center items-center text-center max-w-2xl mx-auto -mt-20 min-h-screen pt-24 pb-20"
            >
                <h1 className="text-4xl md:text-5xl font-light mb-6 text-slate-800 tracking-tight leading-tight">
                    {t('startTitle')}
                </h1>
                <p className="text-lg text-slate-500 mb-12 max-w-md mx-auto leading-relaxed">
                    Enter a hex code to generate a beautiful, harmonious color palette instantly.
                </p>
                <div className="w-full">
                    <HeroInput
                        layoutId="hero-input-shared"
                        onAdd={(colors) => dispatch({ type: 'ADD_COLORS', payload: colors })}
                        placeholder={t('inputPlaceholder')}
                    />
                </div>
            </motion.div>
        </>
    );
}