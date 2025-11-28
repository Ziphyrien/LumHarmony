import React from 'react';
import { ColorRow } from './ColorRow';
import type { ColorData, SceneConfig } from '../../lib/types';

interface ColorTableProps {
    sourceColors: ColorData[];
    adjustedColors: ColorData[];
    scene: SceneConfig;
}

export function ColorTable({ sourceColors, adjustedColors, scene }: ColorTableProps) {
    if (sourceColors.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center text-neutral-600">
                <div className="text-center">
                    <p className="text-sm">No colors detected</p>
                    <p className="text-xs mt-1 text-neutral-700">Paste hex codes in the input area above</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            {/* Header */}
            <div className="grid grid-cols-[1fr_40px_1fr_120px_120px] gap-4 px-4 py-2 border-b border-neutral-800 bg-neutral-950 text-xs font-medium text-neutral-500 uppercase tracking-wider sticky top-0 z-10">
                <div>Source Color</div>
                <div></div>
                <div>Adjusted</div>
                <div>APCA Score</div>
                <div>Rating</div>
            </div>
            
            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto min-h-0">
                {sourceColors.map((source, index) => {
                    const adjusted = adjustedColors[index];
                    if (!adjusted) return null;
                    
                    return (
                        <ColorRow
                            key={`${source.id}-${index}`}
                            source={source}
                            adjusted={adjusted}
                            scene={scene}
                        />
                    );
                })}
            </div>
        </div>
    );
}