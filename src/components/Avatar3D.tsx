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

    // Group for entire avatar / data mesh assembly
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);

    // 1. Central Faceted Crystal Core (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.5,
      roughness: 0.15,
      transparent: true,
      opacity: 0.7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    meshGroup.add(coreMesh);

    // 2. Wireframe Overlay (Neural Data Mesh)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const wireMesh = new THREE.Mesh(coreGeo, wireMat);
    wireMesh.scale.setScalar(1.03);
    meshGroup.add(wireMesh);

    // 3. Cybernetic Glowing Core Ring (OneLake & Fabric Ring)
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.035, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    meshGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    meshGroup.add(ring2);

    // 4. Data Nodes / Floating Neural Particles
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.9 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    meshGroup.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 4.5, 20);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x7c3aed, 3.5, 20);
    purpleLight.position.set(-5, -4, 4);
    scene.add(purpleLight);

    // Mouse Tracking (3D orientation only)
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / innerHeight - 0.5) * 2;
    };

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

    // Render loop
    let animationFrameId: number;
    const animate = () => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const currentScroll = scrollRef.current;

      meshGroup.rotation.y = mouseRef.current.x * 0.6 + currentScroll * Math.PI * 2;
      meshGroup.rotation.x = -mouseRef.current.y * 0.4;

      particles.rotation.y += 0.0025;
      particles.rotation.x += 0.001;
      ring1.rotation.z += 0.004;
      ring2.rotation.z -= 0.003;

      meshGroup.position.set(0, 0, 0);

      const scrollScale = 1 - currentScroll * 0.12;
      meshGroup.scale.setScalar(Math.max(scrollScale, 0.8));

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
    <div className="relative w-full h-80 md:h-[420px] flex items-center justify-center my-2">
      <div className="absolute w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div ref={mountRef} className="w-full h-full relative z-10" />
      <div className="absolute bottom-2 text-[11px] text-white/70 tracking-widest uppercase flex items-center gap-2 pointer-events-none bg-black/50 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        Interactive Azure Data Mesh (Move Cursor to Rotate | Scroll Page)
      </div>
    </div>
  );
};
