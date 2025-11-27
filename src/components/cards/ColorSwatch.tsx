import { motion, type Variants } from 'framer-motion';
import { Copy, Check, Sparkles, Trash2 } from 'lucide-react';
import type { ColorData } from '../../lib/types';

interface ColorSwatchProps {
    color: ColorData;
    type: 'original' | 'adjusted';
    onRemove?: (id: string) => void;
    onCopy?: (hex: string, id: string) => void;
    isCopied?: boolean;
    variants?: Variants;
}

export function ColorSwatch({ color, type, onRemove, onCopy, isCopied, variants }: ColorSwatchProps) {
    if (type === 'original') {
        return (
             <motion.div variants={variants} className="glass-panel p-3 group relative">
                <div
                    className="w-full aspect-square rounded-2xl shadow-sm mb-3 relative overflow-hidden"
                    style={{ backgroundColor: color.hex }}
                >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onRemove?.(color.id)}
                            className="p-2 glass-mini hover:bg-red-500 hover:text-white rounded-full text-white transition-colors"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                     <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-black/10 backdrop-blur-sm text-white/90 text-xs font-mono">
                        Original
                    </div>
                </div>
                <div className="flex justify-between items-center px-2">
                    <span className="font-mono font-medium text-slate-600">{color.hex}</span>
                </div>
             </motion.div>
        );
    }

    return (
        <motion.div variants={variants} className="glass-panel p-3 group">
            <div
                className="w-full aspect-[4/5] rounded-2xl shadow-sm mb-3 relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
                style={{ backgroundColor: color.hex }}
            >
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button
                        onClick={() => onCopy?.(color.hex, color.id)}
                        className="glass-button flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-slate-800"
                    >
                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                        {isCopied ? 'Copied' : 'Copy'}
                    </button>
                </div>
                
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/40 to-transparent text-white">
                     <div className="flex items-center gap-2 opacity-80 text-xs mb-1">
                        <Sparkles size={12} />
                        <span>Adjusted</span>
                    </div>
                     <div className="font-mono text-xl font-bold tracking-wider">{color.hex}</div>
                </div>
            </div>
        </motion.div>
    );
}