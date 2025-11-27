import { useState } from 'react';
import { Plus, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { isValidHex, extractHexCodes } from '../lib/color-utils';

interface HeroInputProps {
    onAdd: (colors: string[]) => void;
    compact?: boolean;
    placeholder?: string;
    layoutId?: string;
}

export function HeroInput({ onAdd, compact = false, placeholder = "e.g., #2A4365", layoutId }: HeroInputProps) {
    const [input, setInput] = useState('');
    
    const checkHex = input.trim().split(/\s+/)[0];
    const singlePreview = checkHex && (checkHex.startsWith('#') ? checkHex : `#${checkHex}`);
    const showPreview = singlePreview && isValidHex(singlePreview);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const colors = extractHexCodes(input);
        if (colors.length > 0) {
            onAdd(colors);
            setInput('');
        }
    };

    return (
        <motion.div
            layout
            layoutId={layoutId}
            className={`relative w-full max-w-2xl mx-auto ${compact ? '' : 'text-center'}`}
        >
            <form onSubmit={handleSubmit} className="relative group">
                <div className={`
                    relative flex items-center
                    glass rounded-2xl overflow-hidden transition-all duration-300
                    group-focus-within:ring-2 group-focus-within:ring-white/50
                    ${compact ? 'p-1' : 'p-2'}
                `}>
                    {/* Icon or Preview */}
                    <div className={`
                        flex items-center justify-center shrink-0 transition-all
                        ${compact ? 'w-10 h-10' : 'w-14 h-14'}
                    `}>
                        {showPreview ? (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-full h-full rounded-xl shadow-sm"
                                style={{ backgroundColor: singlePreview }}
                            />
                        ) : (
                            <Palette 
                                className={`text-slate-500 ${compact ? 'w-5 h-5' : 'w-6 h-6'}`} 
                            />
                        )}
                    </div>

                    {/* Input */}
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={placeholder}
                        className={`
                            flex-1 bg-transparent border-none outline-none text-slate-800 font-mono
                            placeholder:text-slate-400/80
                            ${compact ? 'px-3 text-base' : 'px-4 text-lg'}
                        `}
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className={`
                            flex items-center justify-center rounded-xl transition-all
                            glass-button text-slate-700 border-0
                            disabled:opacity-30 disabled:cursor-not-allowed
                            ${compact ? 'w-10 h-10' : 'w-14 h-14'}
                        `}
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </form>
        </motion.div>
    );
}