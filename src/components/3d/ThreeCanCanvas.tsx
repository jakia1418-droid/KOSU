import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ProductFlavor } from '../../types';

interface ThreeCanCanvasProps {
  flavor: ProductFlavor;
  interactive?: boolean;
  autoRotateSpeed?: number;
  className?: string;
  zoomLevel?: number;
  showCondensation?: boolean;
  onCanClick?: () => void;
}

// Generate high-resolution procedural label texture on HTML5 Canvas
function createCanLabelTexture(flavor: ProductFlavor): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // 1. Base vibrant background
  ctx.fillStyle = flavor.color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Subtle metallic vertical brush strokes
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  for (let x = 0; x < canvas.width; x += 6) {
    ctx.fillRect(x, 0, 2, canvas.height);
  }
  ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
  for (let x = 3; x < canvas.width; x += 8) {
    ctx.fillRect(x, 0, 1, canvas.height);
  }

  // 3. Central light reflection gradient
  const sheenGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  sheenGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.12)');
  sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.22)');
  sheenGrad.addColorStop(0.65, 'rgba(255, 255, 255, 0.12)');
  sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = sheenGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 4. Large bold vertical brand wordmark "KOSU"
  // Rotated 90 degrees to run vertically along the can front
  ctx.save();
  ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
  ctx.rotate(-Math.PI / 2);

  // Main KOSU wordmark in bold condensed uppercase
  ctx.font = '900 230px "Anton", "Bebas Neue", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '12px';

  // Contrast text color for brand
  ctx.fillStyle = flavor.deepColor;
  ctx.fillText('KOSU', 0, 0);

  // Soft inner shadow effect
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.fillText('KOSU', 2, 4);

  ctx.restore();

  // 5. Flavor name and micro-typography
  ctx.save();
  ctx.translate(canvas.width * 0.5, canvas.height * 0.88);
  ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = flavor.deepColor;
  ctx.letterSpacing = '6px';
  ctx.fillText(flavor.name.toUpperCase(), 0, 0);

  ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillStyle = flavor.deepColor;
  ctx.fillText('SPARKLING FRUIT SODA · 330ML · 0.0% ALC', 0, 30);
  ctx.restore();

  // 6. Top collar subtitle
  ctx.save();
  ctx.translate(canvas.width * 0.5, canvas.height * 0.12);
  ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = flavor.deepColor;
  ctx.letterSpacing = '4px';
  ctx.fillText('NO BIG PLANS. JUST GOOD DRINKS.', 0, 0);
  ctx.restore();

  // 7. Back-of-can barcode and editorial note
  ctx.save();
  ctx.translate(canvas.width * 0.92, canvas.height * 0.6);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = flavor.deepColor;
  for (let i = 0; i < 40; i++) {
    const w = (i % 3 === 0 ? 3 : 1.5);
    ctx.fillRect(i * 6, 0, w, 35);
  }
  ctx.font = '500 10px monospace';
  ctx.fillText('BATCH 2026 / COLD FILL', 0, 48);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export const ThreeCanCanvas: React.FC<ThreeCanCanvasProps> = ({
  flavor,
  interactive = true,
  autoRotateSpeed = 0.008,
  className = '',
  zoomLevel = 1.0,
  showCondensation = true,
  onCanClick,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Probe for software WebGL renderer (SwiftShader, llvmpipe)
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Setup scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38 / zoomLevel,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.1, 6.2);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment Map via PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // -------------------------------------------------------------
    // PROCEDURAL BEVERAGE CAN COMPOSITE ASSEMBLY (THREE.Group)
    // -------------------------------------------------------------
    const canGroup = new THREE.Group();

    // 1. Procedural Label Texture & Body
    const labelTexture = createCanLabelTexture(flavor);
    labelTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      map: labelTexture,
      metalness: 0.76,
      roughness: 0.22,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      reflectivity: 0.9,
    });

    // Aluminum Metal Material for Rims and Lid
    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8d8d8,
      metalness: 0.94,
      roughness: 0.24,
    });

    const brushedMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.92,
      roughness: 0.32,
    });

    // Main Cylindrical Body
    const bodyGeo = new THREE.CylinderGeometry(0.95, 0.95, 2.3, 64, 1, true);
    // Align texture seam to back
    bodyGeo.rotateY(Math.PI * 0.95);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMaterial);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    canGroup.add(bodyMesh);

    // Top Tapered Neck
    const neckGeo = new THREE.CylinderGeometry(0.86, 0.95, 0.35, 64, 1, true);
    const neckMesh = new THREE.Mesh(neckGeo, aluminumMaterial);
    neckMesh.position.y = 1.15 + 0.175;
    neckMesh.castShadow = true;
    canGroup.add(neckMesh);

    // Top Rim Chime
    const topRimGeo = new THREE.TorusGeometry(0.86, 0.045, 24, 64);
    topRimGeo.rotateX(Math.PI / 2);
    const topRimMesh = new THREE.Mesh(topRimGeo, aluminumMaterial);
    topRimMesh.position.y = 1.5;
    topRimMesh.castShadow = true;
    canGroup.add(topRimMesh);

    // Top Recessed Lid Plate
    const topLidGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.04, 64);
    const topLidMesh = new THREE.Mesh(topLidGeo, brushedMetalMaterial);
    topLidMesh.position.y = 1.48;
    canGroup.add(topLidMesh);

    // Pull Tab
    const tabGroup = new THREE.Group();
    const tabBaseGeo = new THREE.BoxGeometry(0.24, 0.02, 0.44);
    const tabBaseMesh = new THREE.Mesh(tabBaseGeo, aluminumMaterial);
    tabGroup.add(tabBaseMesh);

    const rivetGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.04, 16);
    const rivetMesh = new THREE.Mesh(rivetGeo, aluminumMaterial);
    rivetMesh.position.y = 0.02;
    tabGroup.add(rivetMesh);

    tabGroup.position.set(0, 1.51, 0.12);
    canGroup.add(tabGroup);

    // Bottom Tapered Neck
    const bottomNeckGeo = new THREE.CylinderGeometry(0.95, 0.88, 0.28, 64, 1, true);
    const bottomNeckMesh = new THREE.Mesh(bottomNeckGeo, aluminumMaterial);
    bottomNeckMesh.position.y = -1.15 - 0.14;
    bottomNeckMesh.castShadow = true;
    canGroup.add(bottomNeckMesh);

    // Bottom Chime
    const bottomRimGeo = new THREE.TorusGeometry(0.88, 0.045, 24, 64);
    bottomRimGeo.rotateX(Math.PI / 2);
    const bottomRimMesh = new THREE.Mesh(bottomRimGeo, aluminumMaterial);
    bottomRimMesh.position.y = -1.42;
    canGroup.add(bottomRimMesh);

    // Bottom Concave Plate
    const bottomPlateGeo = new THREE.CylinderGeometry(0.87, 0.87, 0.04, 64);
    const bottomPlateMesh = new THREE.Mesh(bottomPlateGeo, brushedMetalMaterial);
    bottomPlateMesh.position.y = -1.41;
    canGroup.add(bottomPlateMesh);

    // -------------------------------------------------------------
    // PROCEDURAL CONDENSATION DROPLETS (InstancedMesh)
    // -------------------------------------------------------------
    if (showCondensation && !isSoftwareGl) {
      const dropletCount = 65;
      const dropletGeo = new THREE.SphereGeometry(0.022, 8, 8);
      const dropletMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.9,
        opacity: 1,
        transparent: true,
        roughness: 0.1,
        ior: 1.33,
      });

      const dropletsMesh = new THREE.InstancedMesh(dropletGeo, dropletMat, dropletCount);
      const dummy = new THREE.Object3D();

      for (let i = 0; i < dropletCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 2.1;
        const r = 0.955;
        const scale = 0.6 + Math.random() * 0.9;

        dummy.position.set(Math.cos(theta) * r, y, Math.sin(theta) * r);
        dummy.scale.set(scale, scale * (0.8 + Math.random() * 0.5), scale * 0.6);
        dummy.lookAt(0, y, 0);
        dummy.rotateY(Math.PI);
        dummy.updateMatrix();

        dropletsMesh.setMatrixAt(i, dummy.matrix);
      }

      dropletsMesh.instanceMatrix.needsUpdate = true;
      canGroup.add(dropletsMesh);
    }

    // Soft Contact Shadow Plane Grounding
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    shadowGeo.rotateX(-Math.PI / 2);

    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext('2d');
    if (shadowCtx) {
      const grad = shadowCtx.createRadialGradient(64, 64, 10, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.18)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      shadowCtx.fillStyle = grad;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = -1.6;
    scene.add(shadowMesh);

    scene.add(canGroup);

    // -------------------------------------------------------------
    // STUDIO LIGHTING RIG
    // -------------------------------------------------------------
    // 1. Warm Key Light
    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    keyLight.position.set(3.5, 4, 3.5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // 2. Cool Fill Light
    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.2);
    fillLight.position.set(-3.5, 2, 2.5);
    scene.add(fillLight);

    // 3. Sharp Rim Highlight Light from Behind
    const rimLight = new THREE.DirectionalLight(0xffffff, 2.8);
    rimLight.position.set(1.5, 3, -4);
    scene.add(rimLight);

    // 4. Subtle Ambient Base
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // -------------------------------------------------------------
    // MOUSE & TOUCH INTERACTION DAMPING
    // -------------------------------------------------------------
    let targetRotationY = 0;
    let targetRotationX = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      isDragging = true;
      setIsInteracting(true);
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        targetRotationY += deltaX * 0.012;
        targetRotationX += deltaY * 0.008;
        // Clamp X tilt to realistic limits
        targetRotationX = Math.max(-0.4, Math.min(0.4, targetRotationX));
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      } else {
        // Subtle tilt toward cursor when hovering
        targetRotationX = mouseY * 0.15;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      setIsInteracting(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    };

    const domElement = renderer.domElement;
    domElement.style.touchAction = 'none';
    domElement.addEventListener('pointerdown', onPointerDown);
    domElement.addEventListener('pointermove', onPointerMove);
    domElement.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('pointercancel', onPointerUp);

    // -------------------------------------------------------------
    // ANIMATION & RENDER LOOP
    // -------------------------------------------------------------
    let frameId = 0;
    let clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Idle auto-rotation when user is not actively dragging
      if (!isDragging) {
        targetRotationY += autoRotateSpeed;
      }

      // Smooth kinematic damping
      canGroup.rotation.y = THREE.MathUtils.damp(canGroup.rotation.y, targetRotationY, 7, delta);
      canGroup.rotation.x = THREE.MathUtils.damp(canGroup.rotation.x, targetRotationX, 7, delta);

      // Subtle resting float
      canGroup.position.y = Math.sin(elapsed * 1.8) * 0.04;

      renderer.render(scene, camera);

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    // -------------------------------------------------------------
    // RESIZE OBSERVER
    // -------------------------------------------------------------
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // -------------------------------------------------------------
    // DISPOSAL ON UNMOUNT
    // -------------------------------------------------------------
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();

      domElement.removeEventListener('pointerdown', onPointerDown);
      domElement.removeEventListener('pointermove', onPointerMove);
      domElement.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('pointercancel', onPointerUp);

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }

      labelTexture.dispose();
      bodyMaterial.dispose();
      aluminumMaterial.dispose();
      brushedMetalMaterial.dispose();
      bodyGeo.dispose();
      neckGeo.dispose();
      topRimGeo.dispose();
      topLidGeo.dispose();
      tabBaseGeo.dispose();
      rivetGeo.dispose();
      bottomNeckGeo.dispose();
      bottomRimGeo.dispose();
      bottomPlateGeo.dispose();
      shadowGeo.dispose();
      shadowTexture.dispose();
      shadowMat.dispose();

      renderer.dispose();
    };
  }, [flavor, interactive, autoRotateSpeed, zoomLevel, showCondensation]);

  return (
    <div
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCanClick}
    >
      <div ref={mountRef} className="w-full h-full" />

      {/* Subtle interaction cue on hover */}
      {interactive && isHovered && !isInteracting && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300">
          <span className="text-[10px] tracking-widest font-semibold uppercase px-2.5 py-1 bg-black/60 text-white/90 backdrop-blur-sm rounded-full">
            DRAG TO ROTATE 360°
          </span>
        </div>
      )}
    </div>
  );
};
