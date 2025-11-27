import { motion } from 'framer-motion';

interface AmbientBackgroundProps {
    colors: string[];
}

export function AmbientBackground({ colors }: AmbientBackgroundProps) {
    const defaultColors = ['#E2E8F0', '#F1F5F9', '#CBD5E1'];
    
    const bgColors = colors.length > 0
        ? [
            colors[0] || defaultColors[0],
            colors[1] || colors[0] || defaultColors[1],
            colors[2] || colors[0] || defaultColors[2]
        ]
        : defaultColors;

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-slate-50/50 pointer-events-none">
             {/* Orb 1 */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                    backgroundColor: bgColors[0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-20 -left-20 w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-3xl opacity-40"
            />

            {/* Orb 2 */}
            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.1, 1],
                    backgroundColor: bgColors[1]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute top-1/3 right-0 w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-3xl opacity-40"
            />

             {/* Orb 3 */}
             <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.3, 1],
                    backgroundColor: bgColors[2]
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }}
                className="absolute -bottom-20 left-1/4 w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-3xl opacity-40"
            />
            
            {/* Overlay for noise/texture if needed, currently just a white wash to keep it light */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[100px]" />
        </div>
    );
}