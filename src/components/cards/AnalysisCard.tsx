import { motion, type Variants } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../store/LanguageContext';
import type { HarmonyAnalysis } from '../../lib/types';
import type { TranslationKey } from '../../lib/translations';

interface AnalysisCardProps {
    analysis: HarmonyAnalysis | null;
    variants?: Variants;
}

export function AnalysisCard({ analysis, variants }: AnalysisCardProps) {
    const { t } = useLanguage();

    if (!analysis) return null;

    const isHealthy = analysis.issues.length === 0;

    return (
        <motion.div variants={variants} className="glass-panel p-6 flex flex-col h-full min-h-[180px] gap-4">
            <div>
                <h3 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-4">{t('analysis_title')}</h3>
                <div className="flex items-center gap-3 mb-2">
                    <div className={`
                        flex items-center justify-center w-10 h-10 rounded-full
                        ${isHealthy ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}
                    `}>
                        {isHealthy ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    </div>
                    <div>
                        <div className="font-bold text-lg leading-tight">
                            {isHealthy ? 'Perfect Harmony' : 'Needs Adjustment'}
                        </div>
                        <div className="text-xs opacity-60">
                            {isHealthy ? 'Ready for use' : `${analysis.issues.length} issues found`}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mini Issues List */}
            {!isHealthy && (
                <div className="space-y-2">
                    {analysis.issues.slice(0, 2).map((issue, i) => (
                        <div key={i} className="text-xs px-3 py-2 rounded-lg bg-yellow-50/50 text-yellow-800 border border-yellow-100/50">
                            {t(issue.message as TranslationKey)}
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}