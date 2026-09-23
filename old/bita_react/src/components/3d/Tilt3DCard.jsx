import React, { useRef, useEffect } from 'react';

export default function Tilt3DCard({ children, className = '', tiltMax = 12, scale = 1.02 }) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  // Target vs Current values for smooth lerp
  const currentRef = useRef({ rotateX: 0, rotateY: 0, scale: 1, glareX: 50, glareY: 50, glareOpacity: 0 });
  const targetRef = useRef({ rotateX: 0, rotateY: 0, scale: 1, glareX: 50, glareY: 50, glareOpacity: 0 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    // Linear interpolation helper
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updatePhysics = () => {
      const cur = currentRef.current;
      const tar = targetRef.current;

      // Smooth lerping (factor 0.1)
      cur.rotateX = lerp(cur.rotateX, tar.rotateX, 0.1);
      cur.rotateY = lerp(cur.rotateY, tar.rotateY, 0.1);
      cur.scale = lerp(cur.scale, tar.scale, 0.1);
      cur.glareX = lerp(cur.glareX, tar.glareX, 0.15);
      cur.glareY = lerp(cur.glareY, tar.glareY, 0.15);
      cur.glareOpacity = lerp(cur.glareOpacity, tar.glareOpacity, 0.1);

      // Direct DOM style mutations for max 120fps performance
      card.style.transform = `perspective(1000px) rotateX(${cur.rotateX.toFixed(2)}deg) rotateY(${cur.rotateY.toFixed(2)}deg) scale3d(${cur.scale.toFixed(3)}, ${cur.scale.toFixed(3)}, ${cur.scale.toFixed(3)})`;
      
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${cur.glareX.toFixed(1)}% ${cur.glareY.toFixed(1)}%, rgba(0, 196, 214, 0.3) 0%, transparent 65%)`;
        glare.style.opacity = cur.glareOpacity.toFixed(2);
      }

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetRef.current.rotateX = (-(y - centerY) / centerY) * tiltMax;
    targetRef.current.rotateY = ((x - centerX) / centerX) * tiltMax;
    targetRef.current.scale = scale;
    targetRef.current.glareX = (x / rect.width) * 100;
    targetRef.current.glareY = (y / rect.height) * 100;
    targetRef.current.glareOpacity = 1;
  };

  const handleMouseLeave = () => {
    targetRef.current.rotateX = 0;
    targetRef.current.rotateY = 0;
    targetRef.current.scale = 1;
    targetRef.current.glareOpacity = 0;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div 
        ref={glareRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ opacity: 0 }}
      />
      {children}
    </div>
  );
}
