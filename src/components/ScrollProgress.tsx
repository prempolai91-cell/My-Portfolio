import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for a refined, responsive mechanical feel
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.0005,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none bg-white/[0.04]"
    >
      <motion.div
        className="h-full w-full bg-gradient-to-r from-rose-700 via-rose-500 to-red-400 origin-left shadow-[0_0_10px_rgba(225,29,72,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
};
