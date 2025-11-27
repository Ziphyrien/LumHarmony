import { motion } from 'framer-motion';
import { Sun, Circle, Zap, Layers } from 'lucide-react';
import { useColor } from '../store/ColorContext';
import { useLanguage } from '../store/LanguageContext';
import { SCENES } from '../lib/color-utils';
import type { SceneType } from '../lib/types';
import type { TranslationKey } from '../lib/translations';

const icons = {
    light: Sun,
    normal: Circle,
    contrast: Zap
};

export function SceneTabs() {
    const { state, dispatch } = useColor();
    const { t } = useLanguage();

    const handleSceneChange = (sceneId: SceneType) => {
        dispatch({ type: 'SET_SCENE', payload: sceneId });
    };

    return (
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex items-center justify-center gap-3 min-w-max px-4">
                <div className="flex items-center gap-2 mr-4 opacity-50 text-sm font-medium uppercase tracking-widest">
                    <Layers size={14} />
                    <span>{t('scene_select')}</span>
                </div>

                {(Object.keys(SCENES) as SceneType[]).map((key) => {
                    const scene = SCENES[key];
                    const Icon = icons[key];
                    const isActive = state.scene === key;

                    return (
                        <button
                            key={key}
                            onClick={() => handleSceneChange(key)}
                            className={`
                                relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300
                                ${isActive
                                    ? 'glass text-slate-900 scale-105'
                                    : 'bg-white/20 text-slate-600 border border-white/20 hover:bg-white/40 hover:border-white/40'
                                }
                            `}
                        >
                            <Icon size={16} className={isActive ? 'text-slate-900' : 'opacity-70'} />
                            <span className="font-medium text-sm whitespace-nowrap">
                                {t(scene.nameKey as TranslationKey)}
                            </span>
                            
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-full ring-2 ring-white/50 ring-offset-2 ring-offset-transparent"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}