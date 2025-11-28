import React from 'react';
import { Sun, Circle, Zap } from 'lucide-react';
import { SCENES } from '../../lib/color-utils';
import type { SceneType } from '../../lib/types';
import { clsx } from 'clsx';

const ICON_MAP = {
    Sun: Sun,
    Circle: Circle,
    Zap: Zap
};

interface SceneSelectorProps {
    selected: SceneType;
    onChange: (scene: SceneType) => void;
}

export function SceneSelector({ selected, onChange }: SceneSelectorProps) {
    const scenes = Object.values(SCENES);

    return (
        <div className="h-full flex flex-col">
            <div className="px-4 py-3 border-b border-neutral-800">
                <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Target Scene</h3>
            </div>
            <div className="flex-1 p-4 space-y-2 overflow-y-auto">
                {scenes.map((scene) => {
                    const Icon = ICON_MAP[scene.icon as keyof typeof ICON_MAP];
                    const isActive = selected === scene.id;

                    return (
                        <button
                            key={scene.id}
                            onClick={() => onChange(scene.id)}
                            className={clsx(
                                "w-full flex items-start gap-3 p-3 rounded-sm border text-left transition-all",
                                isActive 
                                    ? "bg-neutral-900 border-neutral-700 ring-1 ring-neutral-700" 
                                    : "bg-transparent border-neutral-800 hover:bg-neutral-900/50 hover:border-neutral-700"
                            )}
                        >
                            <div className={clsx(
                                "mt-0.5",
                                isActive ? "text-white" : "text-neutral-500"
                            )}>
                                <Icon size={16} />
                            </div>
                            <div>
                                <div className={clsx(
                                    "text-sm font-medium",
                                    isActive ? "text-white" : "text-neutral-400"
                                )}>
                                    {/* Use hardcoded names since we don't have i18n set up yet based on types */}
                                    {scene.id === 'light' && 'Light Mode'}
                                    {scene.id === 'normal' && 'Normal / Unified'}
                                    {scene.id === 'contrast' && 'High Contrast'}
                                </div>
                                <div className="text-xs text-neutral-500 mt-1 leading-relaxed">
                                    {scene.id === 'light' && 'Optimized for dark text on light backgrounds. Targets APCA 60-95.'}
                                    {scene.id === 'normal' && 'Standard unification. Preserves original intent while normalizing lightness.'}
                                    {scene.id === 'contrast' && 'Strict accessibility compliance. Targets APCA 60-90 against white.'}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}