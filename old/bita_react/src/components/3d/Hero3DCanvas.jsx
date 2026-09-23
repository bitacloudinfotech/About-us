import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const azureTechStack = [
  {
    name: 'Azure Data Factory',
    icon: 'https://symbols.getvecta.com/stencil_27/36_data-factory.e36cbf28ed.png',
    pos: [-8, 4, -4],
    speed: 0.8
  },
  {
    name: 'Power BI',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/1200px-New_Power_BI_Logo.svg.png',
    pos: [8, 5, -3],
    speed: 1.1
  },
  {
    name: 'SQL Server',
    icon: 'https://symbols.getvecta.com/stencil_27/79_sql-database-generic.494ff6320e.png',
    pos: [-9, -4, -5],
    speed: 0.9
  },
  {
    name: 'Microsoft Azure',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/2048px-Microsoft_Azure.svg.png',
    pos: [9, -3, -4],
    speed: 1.0
  },
  {
    name: 'Microsoft Fabric',
    icon: 'https://davidalzamendi.com/wp-content/uploads/2023/05/Fabric_final_x256.png',
    pos: [0, 7, -6],
    speed: 0.75
  },
  {
    name: 'Databricks',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png',
    pos: [0, -7, -5],
    speed: 1.2
  }
];

export default function Hero3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00c4d6, 4.5, 70);
    cyanLight.position.set(12, 12, 12);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 4, 70);
    purpleLight.position.set(-12, -12, 12);
    scene.add(purpleLight);

    // 3. Central Metallic Torus Mesh
    const torusGeometry = new THREE.TorusKnotGeometry(3.5, 1.1, 140, 18);
    const torusMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x071933,
      metalness: 0.85,
      roughness: 0.15,
      transmission: 0.1,
      thickness: 1.2,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      emissive: 0x002d40,
      emissiveIntensity: 0.4
    });
    const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torusKnot);

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00c4d6,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const wireKnot = new THREE.Mesh(torusGeometry, wireMaterial);
    wireKnot.scale.set(1.035, 1.035, 1.035);
    scene.add(wireKnot);

    // 4. Floating 3D Azure Tech Stack Sprites Group
    const textureLoader = new THREE.TextureLoader();
    const techSprites = [];

    azureTechStack.forEach((tech, idx) => {
      // Helper function to create fallback canvas texture with tech name if image load fails
      const createCanvasBadge = (text) => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#081226';
        ctx.strokeStyle = '#00c4d6';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(10, 10, 236, 108, 20);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#00c4d6';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 128, 64);

        return new THREE.CanvasTexture(canvas);
      };

      const texture = textureLoader.load(
        tech.icon,
        undefined,
        undefined,
        () => {
          // Fallback if URL fails
          spriteMaterial.map = createCanvasBadge(tech.name);
          spriteMaterial.needsUpdate = true;
        }
      );

      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        blending: THREE.NormalBlending
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(tech.pos[0], tech.pos[1], tech.pos[2]);
      sprite.scale.set(2.4, 2.4, 1);
      scene.add(sprite);

      // Add ambient glowing light halo ring for each tech node
      const haloGeo = new THREE.RingGeometry(1.3, 1.5, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0x00c4d6 : 0x8b5cf6,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.set(tech.pos[0], tech.pos[1], tech.pos[2] - 0.1);
      scene.add(haloMesh);

      techSprites.push({
        sprite,
        haloMesh,
        initialPos: [...tech.pos],
        speed: tech.speed,
        phase: idx * 1.2
      });
    });

    // 5. Starfield Particles
    const particleCount = 700;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x00c4d6);
    const colorPurple = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const mixedColor = colorCyan.clone().lerp(colorPurple, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 6. Mouse Camera Damping Controls
    let mouseX = 0;
    let mouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) / 120;
      mouseY = (event.clientY - windowHalfY) / 120;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Rotate Torus
      torusKnot.rotation.x += delta * 0.25;
      torusKnot.rotation.y += delta * 0.35;
      wireKnot.rotation.x += delta * 0.25;
      wireKnot.rotation.y += delta * 0.35;

      particleSystem.rotation.y += delta * 0.04;

      // Animate 3D Floating Azure Tech Nodes
      techSprites.forEach((item) => {
        const floatY = Math.sin(elapsedTime * item.speed + item.phase) * 0.6;
        const floatX = Math.cos(elapsedTime * item.speed * 0.5 + item.phase) * 0.4;
        
        item.sprite.position.y = item.initialPos[1] + floatY;
        item.sprite.position.x = item.initialPos[0] + floatX;
        
        item.haloMesh.position.y = item.initialPos[1] + floatY;
        item.haloMesh.position.x = item.initialPos[0] + floatX;
        item.haloMesh.rotation.z += delta * 0.5;
      });

      // Smooth Camera Lerp
      currentMouseX += (mouseX - currentMouseX) * 0.04;
      currentMouseY += (-mouseY - currentMouseY) * 0.04;

      camera.position.x = currentMouseX;
      camera.position.y = currentMouseY;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      torusGeometry.dispose();
      particleGeometry.dispose();
      torusMaterial.dispose();
      wireMaterial.dispose();
      particleMaterial.dispose();
      techSprites.forEach(t => {
        if (t.sprite.material.map) t.sprite.material.map.dispose();
        t.sprite.material.dispose();
        t.haloMesh.geometry.dispose();
        t.haloMesh.material.dispose();
      });
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-85 z-0" 
    />
  );
}
