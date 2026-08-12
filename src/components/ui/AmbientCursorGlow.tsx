import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const AmbientCursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let frameId = 0;
    let x = -400;
    let y = -400;

    const render = () => {
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frameId = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      x = event.clientX - 180;
      y = event.clientY - 180;

      if (!frameId) frameId = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return <div ref={glowRef} aria-hidden="true" className="ambient-cursor-glow" />;
};

export default AmbientCursorGlow;
