import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Avatar3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for entire avatar assembly
    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);

    // 1. Head Outer Faceted Glass Shell
    const headGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.4,
      roughness: 0.15,
      transparent: true,
      opacity: 0.65,
      emissive: 0x0369a1,
      emissiveIntensity: 0.5,
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    avatarGroup.add(headMesh);

    // 2. Wireframe Overlay (Neural Network Grid)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireMesh = new THREE.Mesh(headGeo, wireMat);
    wireMesh.scale.setScalar(1.02);
    avatarGroup.add(wireMesh);

    // 3. Cybernetic Visor / Eye Core
    const visorGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.25, 24);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.8,
      roughness: 0.1,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.9,
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.rotation.x = Math.PI / 2;
    visorMesh.position.set(0, 0.25, 1.15);
    avatarGroup.add(visorMesh);

    // Glowing Eyes
    const eyeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.4, 0.3, 1.35);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.4, 0.3, 1.35);
    avatarGroup.add(leftEye);
    avatarGroup.add(rightEye);

    // 4. Data Halo / Neural Particles Cloud
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.07,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    avatarGroup.add(particles);

    // 5. Outer Orbital Ring
    const ringGeo = new THREE.TorusGeometry(2.6, 0.025, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    avatarGroup.add(ringMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 4, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 3, 20);
    purpleLight.position.set(-5, -3, 3);
    scene.add(purpleLight);

    // Event Handlers for Mouse Cursor (ONLY for 3D rotation, NO page scrolling)
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / innerHeight - 0.5) * 2;
    };

    // Event Handler for Explicit User Page Scrolling ONLY
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      scrollRef.current = Math.min(scrollY / maxScroll, 1);
    };

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const currentScroll = scrollRef.current;

      // Rotate avatar head based on cursor position & page scroll position
      avatarGroup.rotation.y = mouseRef.current.x * 0.5 + currentScroll * Math.PI * 2;
      avatarGroup.rotation.x = -mouseRef.current.y * 0.35;

      particles.rotation.y += 0.003;
      particles.rotation.x += 0.001;
      ringMesh.rotation.z += 0.005;

      // Position stays fixed in 3D scene (no vertical jittering on mouse move)
      avatarGroup.position.set(0, 0, 0);

      const scrollScale = 1 - currentScroll * 0.15;
      avatarGroup.scale.setScalar(Math.max(scrollScale, 0.75));

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-72 md:h-96 flex items-center justify-center my-2">
      <div className="absolute w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div ref={mountRef} className="w-full h-full relative z-10" />
      <div className="absolute bottom-1 text-[11px] text-white/60 tracking-widest uppercase flex items-center gap-2 pointer-events-none bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
        Interactive 3D Avatar (Move Cursor to Look | Scroll Page)
      </div>
    </div>
  );
};
