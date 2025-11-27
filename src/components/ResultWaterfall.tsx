import { motion } from 'framer-motion';
import { useState } from 'react';
import { useColor } from '../store/ColorContext';
import { AnalysisCard } from './cards/AnalysisCard';
import { ColorSwatch } from './cards/ColorSwatch';

export function ResultWaterfall() {
    const { state, dispatch } = useColor();
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (hex: string, id: string) => {
        navigator.clipboard.writeText(hex);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (state.primaryColors.length === 0) return null;

    // Unified animation container
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const analysis = state.analysis;

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20"
        >
            {/* 1. Analysis Summary Card (Small & Elegant) */}
            {analysis && (
                <AnalysisCard 
                    analysis={analysis} 
                    variants={item} 
                />
            )}

            {/* 2. Input Colors (Originals) */}
            {state.primaryColors.map((color) => (
                 <ColorSwatch
                    key={color.id}
                    color={color}
                    type="original"
                    variants={item}
                    onRemove={(id) => dispatch({ type: 'REMOVE_COLOR', payload: id })}
                 />
            ))}

            {/* 3. Generated/Adjusted Colors (Results) */}
            {state.adjustedColors.map((color) => (
                <ColorSwatch
                    key={color.id}
                    color={color}
                    type="adjusted"
                    variants={item}
                    onCopy={handleCopy}
                    isCopied={copiedId === color.id}
                />
            ))}
        </motion.div>
    );
}