import React from 'react';
import type { SceneType } from '../../lib/types';
import { SceneSelector } from './SceneSelector';

interface InputSectionProps {
    inputString: string;
    onInputChange: (value: string) => void;
    selectedScene: SceneType;
    onSceneChange: (scene: SceneType) => void;
}

export function InputSection({ 
    inputString, 
    onInputChange, 
    selectedScene, 
    onSceneChange 
}: InputSectionProps) {
    return (
        <div className="grid grid-cols-[1fr_300px] h-64 border-b border-neutral-800 divide-x divide-neutral-800 shrink-0">
            <div className="flex flex-col h-full">
                <div className="px-4 py-3 border-b border-neutral-800 flex justify-between items-center bg-neutral-950">
                    <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Raw Input</h3>
                    <span className="text-xs text-neutral-600">Paste hex codes anywhere</span>
                </div>
                <textarea
                    value={inputString}
                    onChange={(e) => onInputChange(e.target.value)}
                    placeholder="#123456 #abcdef ..."
                    className="flex-1 w-full bg-neutral-950 p-4 font-mono text-sm text-neutral-300 placeholder:text-neutral-700 resize-none focus:outline-none focus:bg-neutral-900/30 transition-colors"
                    spellCheck={false}
                />
            </div>
            
            <div className="h-full overflow-hidden bg-neutral-950">
                <SceneSelector 
                    selected={selectedScene} 
                    onChange={onSceneChange} 
                />
            </div>
        </div>
    );
}