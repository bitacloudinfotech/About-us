import React, { useEffect, useRef } from 'react';

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);
  const opacityRef = useRef<number>(0);

  const cancelFade = () => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  const fadeTo = (targetOpacity: number, durationMs: number, onComplete?: () => void) => {
    cancelFade();
    const video = videoRef.current;
    if (!video) return;

    const startOpacity = opacityRef.current;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;

      video.style.opacity = currentOpacity.toString();
      opacityRef.current = currentOpacity;

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        animFrameRef.current = null;
        if (onComplete) onComplete();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  const startLoop = () => {
    const video = videoRef.current;
    if (!video) return;

    fadingOutRef.current = false;
    video.currentTime = 0;
    video.style.opacity = opacityRef.current.toString();

    video
      .play()
      .then(() => {
        fadeTo(0.65, 600);
      })
      .catch((err) => {
        console.warn('Video background autoplay restricted:', err);
      });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    opacityRef.current = 0;
    video.style.opacity = '0';

    const handleLoadedData = () => {
      startLoop();
    };

    const handleTimeUpdate = () => {
      if (!video.duration || fadingOutRef.current) return;
      const timeLeft = video.duration - video.currentTime;
      if (timeLeft <= 0.6 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        fadeTo(0, 500);
      }
    };

    const handleEnded = () => {
      cancelFade();
      opacityRef.current = 0;
      video.style.opacity = '0';
      setTimeout(() => {
        startLoop();
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    if (video.readyState >= 2) {
      startLoop();
    }

    return () => {
      cancelFade();
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
      muted
      autoPlay
      playsInline
      className="absolute inset-0 w-full h-full object-cover translate-y-[10%] pointer-events-none"
      style={{ opacity: 0 }}
    />
  );
};
