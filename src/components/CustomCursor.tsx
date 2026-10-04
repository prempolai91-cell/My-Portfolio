import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [isHoveringButton, setIsHoveringButton] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(true);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element data attribute or tag
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'view') {
          setCursorText('VIEW');
          setIsHoveringButton(false);
          return;
        }
        if (type === 'explore') {
          setCursorText('EXPLORE');
          setIsHoveringButton(false);
          return;
        }
      }

      const buttonTarget = target.closest('button, a, input, textarea, select, [role="button"]') as HTMLElement | null;
      if (buttonTarget) {
        setIsHoveringButton(true);
        setCursorText('');
      } else {
        setIsHoveringButton(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  const hasText = cursorText.length > 0;

  return (
    <div
      className="pointer-events-none fixed z-[9999] top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out will-change-transform"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {hasText ? (
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-rose-600/90 text-white backdrop-blur-md shadow-lg shadow-rose-950/40 text-[11px] font-mono tracking-widest font-semibold border border-rose-400/40 animate-in fade-in zoom-in-75 duration-150">
          {cursorText}
        </div>
      ) : isHoveringButton ? (
        <div className="w-10 h-10 rounded-full border border-rose-500/80 bg-rose-500/10 backdrop-blur-xs transition-all duration-150 scale-125" />
      ) : (
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm shadow-black" />
          <div className="absolute w-8 h-8 rounded-full border border-white/20 transition-all duration-300" />
        </div>
      )}
    </div>
  );
};
