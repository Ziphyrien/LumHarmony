import React from 'react';
import { Download, Copy } from 'lucide-react';

interface StatusBarProps {
    parsedCount: number;
    sceneName: string;
    onExportJson: () => void;
    onCopyCss: () => void;
}

export function StatusBar({ parsedCount, sceneName, onExportJson, onCopyCss }: StatusBarProps) {
    return (
        <div className="h-10 min-h-[40px] bg-neutral-950 border-t border-neutral-800 flex items-center justify-between px-4 select-none">
            <div className="flex items-center gap-4 text-xs text-neutral-500 font-mono">
                <span>{parsedCount} Colors Parsed</span>
                <span className="w-px h-3 bg-neutral-800" />
                <span>Scene: {sceneName}</span>
            </div>
            
            <div className="flex items-center gap-2">
                <button 
                    onClick={onExportJson}
                    className="flex items-center gap-1.5 px-3 py-1 hover:bg-neutral-900 text-xs text-neutral-400 hover:text-neutral-200 transition-colors rounded-sm"
                    title="Export as JSON"
                >
                    <Download size={12} />
                    <span>JSON</span>
                </button>
                <button 
                    onClick={onCopyCss}
                    className="flex items-center gap-1.5 px-3 py-1 hover:bg-neutral-900 text-xs text-neutral-400 hover:text-neutral-200 transition-colors rounded-sm"
                    title="Copy CSS Variables"
                >
                    <Copy size={12} />
                    <span>CSS</span>
                </button>
            </div>
        </div>
    );
}