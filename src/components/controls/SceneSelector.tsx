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
        <div className="flex flex-col">
            <div className="px-4 py-3 border-b border-neutral-800 flex-none">
                <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">{t('scene_title', lang)}</h3>
            </div>
            <div className="p-4 space-y-2">
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
                                    {t(`scene_${scene.id}`, lang)}
                                </div>
                                <div className="text-xs text-neutral-500 mt-1 leading-relaxed">
                                    {t(`scene_${scene.id}_desc`, lang)}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}