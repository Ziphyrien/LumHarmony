import { AnimatePresence } from 'framer-motion';
import { ColorProvider, useColor } from './store/ColorContext';
import { LanguageProvider } from './store/LanguageContext';
import { AmbientBackground } from './components/AmbientBackground';
import { HeroSection } from './components/HeroSection';
import { MainLayout } from './components/layout/MainLayout';

function AppContent() {
    const { state } = useColor();

    // Determine if we have content (colors) to show
    const hasContent = state.primaryColors.length > 0;

    // Extract hex codes for the ambient background
    const bgColors = state.primaryColors.map(c => c.hex);

    return (
        <div className="min-h-screen relative font-sans text-slate-800 overflow-x-hidden">
            <AmbientBackground colors={bgColors} />

            <AnimatePresence>
                {!hasContent ? (
                    <HeroSection key="hero" />
                ) : (
                    <MainLayout key="main" />
                )}
            </AnimatePresence>
        </div>
    );
}

function App() {
    return (
        <LanguageProvider>
            <ColorProvider>
                <AppContent />
            </ColorProvider>
        </LanguageProvider>
    );
}

export default App;