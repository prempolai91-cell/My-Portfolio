import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  distance?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  distance = 32,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { y: distance, x: 0 };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialPosition() }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollStaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.08 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollStaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}> = ({ children, className = '', yOffset = 24 }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Ambient floating parallax glow reacting to global viewport scroll
 */
export const ScrollAmbientGlow: React.FC = () => {
  const { scrollY } = useScroll();

  // Subtle vertical translation as user scrolls
  const y1 = useTransform(scrollY, [0, 4000], [0, 600]);
  const y2 = useTransform(scrollY, [0, 4000], [0, -400]);
  const opacity = useTransform(scrollY, [0, 1000, 3000, 5000], [0.15, 0.25, 0.2, 0.15]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-1/4 -left-32 w-[650px] h-[650px] rounded-full bg-rose-600/10 blur-[150px] will-change-transform"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute top-2/3 -right-32 w-[700px] h-[700px] rounded-full bg-red-950/20 blur-[180px] will-change-transform"
      />
    </div>
  );
};
