import React from 'react';
import { Sun, Circle, Zap } from 'lucide-react';
import { SCENES } from '../../lib/color-utils';
import type { SceneType } from '../../lib/types';
import { clsx } from 'clsx';
import { t, type Language } from '../../lib/i18n';

const ICON_MAP = {
    Sun: Sun,
    Circle: Circle,
    Zap: Zap
};

interface SceneSelectorProps {
    selected: SceneType;
    onChange: (scene: SceneType) => void;
    lang: Language;
}

export function SceneSelector({ selected, onChange, lang }: SceneSelectorProps) {
    const scenes = Object.values(SCENES);

    return (
        <div className="flex flex-col h-full">
            <div className="px-5 py-3.5 border-b border-white/[0.06] flex-none bg-white/[0.02]">
                <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">{t('scene_title', lang)}</h3>
            </div>
            <div className="p-4 space-y-2.5 flex-1">
                {scenes.map((scene) => {
                    const Icon = ICON_MAP[scene.icon as keyof typeof ICON_MAP];
                    const isActive = selected === scene.id;

                    return (
                        <button
                            key={scene.id}
                            onClick={() => onChange(scene.id)}
                            className={clsx(
                                "w-full flex items-start gap-3.5 p-3.5 rounded-lg text-left transition-all duration-200 group",
                                isActive
                                    ? "bg-[oklch(0.75_0.15_165/0.1)] border border-[oklch(0.75_0.15_165/0.25)] shadow-[0_0_20px_oklch(0.75_0.15_165/0.1)]"
                                    : "bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08]"
                            )}
                        >
                            <div className={clsx(
                                "mt-0.5 p-2 rounded-md transition-all duration-200",
                                isActive 
                                    ? "bg-[oklch(0.75_0.15_165/0.2)] text-[oklch(0.85_0.15_165)]" 
                                    : "bg-white/[0.05] text-neutral-500 group-hover:text-neutral-400"
                            )}>
                                <Icon size={14} strokeWidth={2} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className={clsx(
                                    "text-sm font-medium transition-colors",
                                    isActive ? "text-[oklch(0.9_0.08_165)]" : "text-neutral-400 group-hover:text-neutral-300"
                                )}>
                                    {t(`scene_${scene.id}`, lang)}
                                </div>
                                <div className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                                    {t(`scene_${scene.id}_desc`, lang)}
                                </div>
                            </div>
                            {/* Active indicator */}
                            {isActive && (
                                <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.75_0.15_165)] mt-1.5 shadow-[0_0_6px_oklch(0.75_0.15_165)]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
