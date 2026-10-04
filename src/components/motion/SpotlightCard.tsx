import React, { useRef, useState } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
  tiltIntensity?: number;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(225, 29, 72, 0.16)',
  enableTilt = true,
  tiltIntensity = 7,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
    setOpacity(1);

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
      const rotateY = ((x - centerX) / centerX) * tiltIntensity;
      setTilt({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform: enableTilt
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {/* Specular cursor radial spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      {/* Subtle glossy sheen line across the top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-20" />
      {children}
    </div>
  );
};
