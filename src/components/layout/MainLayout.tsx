import { motion } from 'framer-motion';
import { useColor } from '../../store/ColorContext';
import { useLanguage } from '../../store/LanguageContext';
import { Header } from './Header';
import { HeroInput } from '../HeroInput';
import { SceneTabs } from '../SceneTabs';
import { ResultWaterfall } from '../ResultWaterfall';

export function MainLayout() {
    const { dispatch } = useColor();
    const { t } = useLanguage();

    return (
        <>
            {/* Sticky Header for Main Layout */}
            <Header 
                hasContent={true} 
                onReset={() => dispatch({ type: 'RESET' })} 
            />

            {/* Main Content Area with Top Padding for Header */}
            <main className="container mx-auto px-4 md:px-6 pt-24 pb-20 relative z-10 min-h-screen flex flex-col">
                <motion.div 
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-10"
                >
                    {/* Sticky Wrapper: Input & Tabs */}
                    <div className="sticky top-20 z-40 -mx-4 px-4 py-4 bg-gradient-to-b from-slate-50/0 via-slate-50/80 to-slate-50/0 backdrop-blur-[2px]">
                        <div className="max-w-3xl mx-auto flex flex-col gap-6">
                             <HeroInput
                                layoutId="hero-input-shared"
                                compact
                                onAdd={(colors) => dispatch({ type: 'ADD_COLORS', payload: colors })}
                                placeholder={t('inputPlaceholder')}
                            />
                            <SceneTabs />
                        </div>
                    </div>

                    {/* Waterfall Results */}
                    <ResultWaterfall />
                </motion.div>
            </main>
        </>
    );
}