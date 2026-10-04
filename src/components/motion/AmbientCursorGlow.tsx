import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

/**
 * AmbientCursorGlow:
 * Subtle luxury illumination following the pointer across the entire viewport.
 * Adds that high-end Dribbble / Apple darkroom glow aesthetic.
 */
export const AmbientCursorGlow: React.FC = () => {
  const [hasMouse, setHasMouse] = useState(false);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const mouseX = useSpring(-500, springConfig);
  const mouseY = useSpring(-500, springConfig);

  useEffect(() => {
    // Only enable if pointer device is fine (desktop / laptop)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setHasMouse(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!hasMouse) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-rose-600/8 via-rose-900/5 to-transparent blur-[120px] will-change-transform opacity-75"
      />
    </div>
  );
};
