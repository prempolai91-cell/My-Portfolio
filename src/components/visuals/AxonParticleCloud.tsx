import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AxonParticleCloudProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
  accentColor?: string; // hex or rgb
  onFpsUpdate?: (fps: number) => void;
}

/**
 * Creates a 64x64 soft grey sphere shading (matcap) texture in-memory.
 * Exactly as specified in the AXON recreation brief.
 */
function createMatcapTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const imgData = ctx.createImageData(64, 64);
  for (let y = 0; y < 64; y++) {
    for (let x = 0; x < 64; x++) {
      const idx = (y * 64 + x) * 4;
      const nx = x / 32 - 1.0;
      const ny = 1.0 - y / 32;
      const r2 = nx * nx + ny * ny;
      if (r2 <= 1.0) {
        const nz = Math.sqrt(1.0 - r2);
        // Soft cinematic key & rim light
        const lx = 0.35, ly = 0.55, lz = 0.75;
        const diff = Math.max(0, nx * lx + ny * ly + nz * lz);
        const spec = Math.pow(Math.max(0, nz * 0.95 + ny * 0.25), 6.0) * 0.35;
        const rim = Math.pow(1.0 - nz, 3.0) * 0.25;
        const val = Math.min(255, Math.floor((0.3 + diff * 0.45 + spec + rim) * 255));
        imgData.data[idx] = val;
        imgData.data[idx + 1] = val;
        imgData.data[idx + 2] = val;
        imgData.data[idx + 3] = 255;
      } else {
        imgData.data[idx] = 20;
        imgData.data[idx + 1] = 20;
        imgData.data[idx + 2] = 20;
        imgData.data[idx + 3] = 0;
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

/**
 * GLSL Shaders for the Simulation Ping-Pong Pass
 */
const simVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const simFragmentShader = `
  uniform sampler2D uCurrentPos;
  uniform sampler2D uOrigin;
  uniform sampler2D uFluidVelocity;
  uniform sampler2D uFluidDensity;
  uniform float uTime;
  uniform float uHZ;
  uniform vec2 uResolution;
  uniform mat4 uProjectionMatrix;
  uniform mat4 uViewMatrix;
  uniform mat4 uModelMatrix;
  uniform mat4 uInvViewMatrix;
  varying vec2 vUv;

  // Quaternion rotation helper: rotate vector p by quaternion q
  vec3 rotateByQuat(vec3 p, vec4 q) {
    return p + 2.0 * cross(q.xyz, cross(q.xyz, p) + q.w * p);
  }

  // Organic sculpted bent ring / torus SDF shape
  float sdfShape(vec3 p) {
    // Mirror depth axis: p.z = sqrt(p.z*p.z + 0.0215) - sqrt(0.012)
    float z = p.z;
    p.z = sqrt(z * z + 0.0215) - sqrt(0.012);

    // Rotate by quaternion (0.5, 0.5, 0.5, 0.5)
    vec4 q = vec4(0.5, 0.5, 0.5, 0.5);
    p = rotateByQuat(p, q);

    float r = length(p);
    if (r > 0.8) {
      return r - 0.7;
    }

    // Bent hollow ring / torus mass with one large opening and soft lobes
    float dRing = length(vec2(length(p.xy) - 0.38, p.z)) - 0.16;
    float angle = atan(p.y, p.x);
    float lobes = sin(angle * 3.0 + p.z * 4.0) * 0.04 + cos(angle * 2.0) * 0.025;
    return dRing + lobes;
  }

  // Central differences SDF normal gradient (step 0.001)
  vec3 sdfNormal(vec3 p) {
    float eps = 0.001;
    float d = sdfShape(p);
    return normalize(vec3(
      sdfShape(p + vec3(eps, 0.0, 0.0)) - d,
      sdfShape(p + vec3(0.0, eps, 0.0)) - d,
      sdfShape(p + vec3(0.0, 0.0, eps)) - d
    ));
  }

  // Analytic curl of three sine-sum potentials (Bridson-style), normalized
  vec3 curlNoise(vec3 p) {
    // PsiX = sin(p.y * 2.1 + 0.3) + sin(p.z * 1.7 + 1.2)
    // PsiY = sin(p.z * 2.3 + 0.7) + sin(p.x * 1.9 + 2.1)
    // PsiZ = sin(p.x * 2.0 + 1.5) + sin(p.y * 1.8 + 0.4)
    float curlX = 1.8 * cos(p.y * 1.8 + 0.4) - 2.3 * cos(p.z * 2.3 + 0.7);
    float curlY = 1.7 * cos(p.z * 1.7 + 1.2) - 2.0 * cos(p.x * 2.0 + 1.5);
    float curlZ = 1.9 * cos(p.x * 1.9 + 2.1) - 2.1 * cos(p.y * 2.1 + 0.3);
    return normalize(vec3(curlX, curlY, curlZ));
  }

  void main() {
    vec3 pos = texture2D(uCurrentPos, vUv).xyz;
    vec3 origin = texture2D(uOrigin, vUv).xyz;

    // Boundary check
    if (length(pos) > 0.85) {
      pos /= 1.5;
    }

    // 1. Curl noise turbulence: pos += curlNoise(pos * 0.1 + time * 0.05) * 1.0 * 0.0002 * HZ
    pos += curlNoise(pos * 0.1 + uTime * 0.05) * 0.00022 * uHZ;

    // 2. Surface normal & SDF
    vec3 gradient = sdfNormal(pos);
    float sdf = sdfShape(pos);

    // 3. Swirl along the surface: pos += cross(normalize(pos), normalize(gradient)) * 0.0005
    pos += cross(normalize(pos + vec3(0.0001)), normalize(gradient)) * 0.0006 * uHZ;

    // 4. Pull onto the surface: pos += -gradient * sdf * 0.5
    pos += -gradient * sdf * 0.55 * uHZ;

    // 5. Spring back to origin: pos += (origin - pos) * 0.0002 * HZ
    pos += (origin - pos) * 0.00022 * uHZ;

    // 6. Project particle into screen UV to sample mouse fluid
    vec4 worldPos = uModelMatrix * vec4(pos, 1.0);
    vec4 clipPos = uProjectionMatrix * uViewMatrix * worldPos;
    vec2 screenUV = (clipPos.xy / clipPos.w) * 0.5 + 0.5;

    // Sample fluid velocity & density if inside viewport
    if (screenUV.x >= 0.0 && screenUV.x <= 1.0 && screenUV.y >= 0.0 && screenUV.y <= 1.0) {
      vec2 fluidVel = texture2D(uFluidVelocity, screenUV).xy;
      float fluidDen = texture2D(uFluidDensity, screenUV).r;

      if (fluidDen > 0.001) {
        vec3 flow = vec3(fluidVel.x, fluidVel.y, 0.0);
        // Rotate flow by inverse camera world rotation
        flow = (uInvViewMatrix * vec4(flow, 0.0)).xyz;
        // Apply mouse fluid impulse: pos += flow * 0.0001 * HZ * 0.4 * fluidDensity
        pos += flow * 0.00035 * uHZ * 0.45 * fluidDen;
      }
    }

    gl_FragColor = vec4(pos, 1.0);
  }
`;

/**
 * GLSL Shaders for Point Rendering
 */
const renderVertexShader = `
  uniform sampler2D uPosTexture;
  uniform float uDPR;
  uniform float uTime;
  attribute vec4 aRandom;
  varying vec4 vRandom;
  varying float vScale;

  void main() {
    vRandom = aRandom;
    vec3 pos = texture2D(uPosTexture, uv).xyz;

    // Point position jitter based on random y
    pos *= mix(1.0, 1.35, pow(aRandom.y, 140.0));

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vec4 mvPosition = viewMatrix * worldPos;
    gl_Position = projectionMatrix * mvPosition;

    float distToCamera = length(mvPosition.xyz);
    vScale = smoothstep(2.5, 12.0, distToCamera) * mix(0.5, 1.0, aRandom.z);
    
    // gl_PointSize = 0.04 * DPR * 2.0 * scale * (1000 / viewDistance)
    float pointSize = 0.045 * uDPR * 2.0 * vScale * (1000.0 / max(distToCamera, 0.1));
    gl_PointSize = clamp(pointSize, 1.5, 34.0);
  }
`;

const renderFragmentShader = `
  uniform sampler2D uMatcap;
  uniform float uTime;
  uniform vec3 uAccentColor; // e.g. crimson or lavender
  varying vec4 vRandom;
  varying float vScale;

  void main() {
    // Discard outside point circle
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    if (vScale < 0.08) discard;

    // Base colour mix(0.0, 0.25, random.x) grey
    vec3 baseGrey = vec3(mix(0.15, 0.38, vRandom.x));

    // Mixed to lavender (0.6, 0.45, 1.0) & brand accent by pow(random.z, 80.0)
    vec3 lavender = vec3(0.66, 0.53, 1.0);
    vec3 cyberAccent = mix(lavender, uAccentColor, vRandom.w);
    vec3 col = mix(baseGrey, cyberAccent, pow(vRandom.z, 30.0) * 1.9);

    // Sparkle: 0.5 + (0.4 + sin(time * 4.0 + random.y * 20.0)) * pow(random.z, 10.0) * 2.5
    float sparkle = 0.5 + (0.4 + sin(uTime * 4.0 + vRandom.y * 20.0)) * pow(vRandom.z, 8.0) * 2.5;
    col *= sparkle;

    // Matcap sampled with sprite UV rotated by sin(time + random.z * 20.0) * 0.5 + 1.0
    float angle = sin(uTime + vRandom.z * 20.0) * 0.5 + 1.0;
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    vec2 matcapUv = rot * coord + vec2(0.5);
    vec4 matcapCol = texture2D(uMatcap, matcapUv);

    // Blended soft-light 0.8 then overlay 0.2
    col = mix(col, col * (matcapCol.rgb * 1.5), 0.7);

    // Smooth circular alpha feather
    float alpha = smoothstep(0.5, 0.15, dist);
    gl_FragColor = vec4(col, alpha);
  }
`;

/**
 * High-performance 2D GPU Fluid Simulation
 * Drives cursor velocity splats and density dissipation.
 */
class FluidSimulation {
  renderer: THREE.WebGLRenderer;
  width = 128;
  height = 128;
  simScene: THREE.Scene;
  simCamera: THREE.OrthographicCamera;
  quad: THREE.Mesh;

  velocityA: THREE.WebGLRenderTarget;
  velocityB: THREE.WebGLRenderTarget;
  densityA: THREE.WebGLRenderTarget;
  densityB: THREE.WebGLRenderTarget;

  splatMaterial: THREE.ShaderMaterial;
  dissipateMaterial: THREE.ShaderMaterial;

  constructor(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;
    this.simScene = new THREE.Scene();
    this.simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const type = renderer.capabilities.isWebGL2 ? THREE.HalfFloatType : THREE.FloatType;
    const options: THREE.RenderTargetOptions = {
      format: THREE.RGBAFormat,
      type: type,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    };

    this.velocityA = new THREE.WebGLRenderTarget(this.width, this.height, options);
    this.velocityB = new THREE.WebGLRenderTarget(this.width, this.height, options);
    this.densityA = new THREE.WebGLRenderTarget(this.width, this.height, options);
    this.densityB = new THREE.WebGLRenderTarget(this.width, this.height, options);

    // Quad mesh for full-screen render passes
    const geo = new THREE.PlaneGeometry(2, 2);

    // Splat shader: adds velocity and density in a circular Gaussian brush
    this.splatMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTarget: { value: null },
        uPoint: { value: new THREE.Vector2() },
        uColor: { value: new THREE.Vector3() },
        uRadius: { value: 0.05 },
        uAspect: { value: 1.0 },
      },
      vertexShader: simVertexShader,
      fragmentShader: `
        uniform sampler2D uTarget;
        uniform vec2 uPoint;
        uniform vec3 uColor;
        uniform float uRadius;
        uniform float uAspect;
        varying vec2 vUv;
        void main() {
          vec4 base = texture2D(uTarget, vUv);
          vec2 p = vUv - uPoint;
          p.x *= uAspect;
          float dist = length(p);
          float splat = exp(-dist * dist / max(uRadius * uRadius, 0.0001));
          gl_FragColor = base + vec4(uColor * splat, splat);
        }
      `,
      depthTest: false,
      depthWrite: false,
    });

    // Dissipation shader: gently fades fluid velocity (0.98) & density (0.97)
    this.dissipateMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uDissipation: { value: 0.98 },
      },
      vertexShader: simVertexShader,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uDissipation;
        varying vec2 vUv;
        void main() {
          gl_FragColor = texture2D(uTexture, vUv) * uDissipation;
        }
      `,
      depthTest: false,
      depthWrite: false,
    });

    this.quad = new THREE.Mesh(geo, this.dissipateMaterial);
    this.simScene.add(this.quad);
  }

  splat(x: number, y: number, dx: number, dy: number, radius: number, aspect: number) {
    // 1. Splat velocity
    this.quad.material = this.splatMaterial;
    this.splatMaterial.uniforms.uTarget.value = this.velocityA.texture;
    this.splatMaterial.uniforms.uPoint.value.set(x, y);
    this.splatMaterial.uniforms.uColor.value.set(dx, -dy, 1.0);
    this.splatMaterial.uniforms.uRadius.value = radius;
    this.splatMaterial.uniforms.uAspect.value = aspect;

    this.renderer.setRenderTarget(this.velocityB);
    this.renderer.render(this.simScene, this.simCamera);
    let tmp = this.velocityA;
    this.velocityA = this.velocityB;
    this.velocityB = tmp;

    // 2. Splat density
    this.splatMaterial.uniforms.uTarget.value = this.densityA.texture;
    this.splatMaterial.uniforms.uColor.value.set(1.0, 1.0, 1.0);

    this.renderer.setRenderTarget(this.densityB);
    this.renderer.render(this.simScene, this.simCamera);
    tmp = this.densityA;
    this.densityA = this.densityB;
    this.densityB = tmp;
  }

  step() {
    // Dissipate velocity
    this.quad.material = this.dissipateMaterial;
    this.dissipateMaterial.uniforms.uTexture.value = this.velocityA.texture;
    this.dissipateMaterial.uniforms.uDissipation.value = 0.978;
    this.renderer.setRenderTarget(this.velocityB);
    this.renderer.render(this.simScene, this.simCamera);
    let tmp = this.velocityA;
    this.velocityA = this.velocityB;
    this.velocityB = tmp;

    // Dissipate density
    this.dissipateMaterial.uniforms.uTexture.value = this.densityA.texture;
    this.dissipateMaterial.uniforms.uDissipation.value = 0.965;
    this.renderer.setRenderTarget(this.densityB);
    this.renderer.render(this.simScene, this.simCamera);
    tmp = this.densityA;
    this.densityA = this.densityB;
    this.densityB = tmp;
  }

  dispose() {
    this.velocityA.dispose();
    this.velocityB.dispose();
    this.densityA.dispose();
    this.densityB.dispose();
    this.splatMaterial.dispose();
    this.dissipateMaterial.dispose();
    this.quad.geometry.dispose();
  }
}

export const AxonParticleCloud: React.FC<AxonParticleCloudProps> = ({
  className = '',
  particleCount,
  interactive = true,
  accentColor = '#f43f5e', // Prem's signature cyber rose
  onFpsUpdate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Reduced motion preference check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const isMobile = window.innerWidth < 768;
    // Desktop: 256x256 (65,536 points), Mobile: 128x128 (16,384 points)
    const simSize = particleCount
      ? Math.round(Math.sqrt(particleCount))
      : isMobile
      ? 128
      : 256;
    const totalPoints = simSize * simSize;

    // WebGL Renderer Setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
    } catch {
      setIsSupported(false);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // 1. Perspective Scene & Camera (from AXON Brief Section 7)
    // Perspective camera FOV 30, near 0.1, far 1000, base position (-1.17, 0, 6) looking at the origin
    const camera = new THREE.PerspectiveCamera(
      30,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    const baseCamPos = new THREE.Vector3(-1.17, 0, 6);
    camera.position.copy(baseCamPos);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();

    // 2. Points Group at (0.343, 0.16, -1), rotation (-28.4deg, 390deg, 4.92deg), scale (5, 5, 6)
    const pointsGroup = new THREE.Group();
    // In mobile, center more cleanly
    pointsGroup.position.set(isMobile ? 0 : 0.343, 0.16, -1);
    pointsGroup.rotation.set(
      THREE.MathUtils.degToRad(-28.4),
      THREE.MathUtils.degToRad(390),
      THREE.MathUtils.degToRad(4.92)
    );
    const groupScale = isMobile ? 3.8 : 5.0;
    pointsGroup.scale.set(groupScale, groupScale, groupScale * 1.2);
    scene.add(pointsGroup);

    // 3. Matcap texture
    const matcapTexture = createMatcapTexture();

    // 4. Initial Position & Origin DataTexture
    const originData = new Float32Array(totalPoints * 4);
    for (let i = 0; i < totalPoints; i++) {
      const idx = i * 4;
      // Uniform positions inside [-1, 1]^3
      originData[idx] = (Math.random() - 0.5) * 1.4;
      originData[idx + 1] = (Math.random() - 0.5) * 1.4;
      originData[idx + 2] = (Math.random() - 0.5) * 1.4;
      originData[idx + 3] = 1.0;
    }

    const originTexture = new THREE.DataTexture(
      originData,
      simSize,
      simSize,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    originTexture.needsUpdate = true;

    // Ping-pong render targets for simulation
    const targetOptions: THREE.RenderTargetOptions = {
      format: THREE.RGBAFormat,
      type: renderer.capabilities.isWebGL2 ? THREE.HalfFloatType : THREE.FloatType,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthBuffer: false,
      stencilBuffer: false,
    };

    let simTargetA = new THREE.WebGLRenderTarget(simSize, simSize, targetOptions);
    let simTargetB = new THREE.WebGLRenderTarget(simSize, simSize, targetOptions);

    // 5. GPU Fluid Simulation
    const fluidSim = new FluidSimulation(renderer);

    // 6. Simulation Pass Setup
    const simScene = new THREE.Scene();
    const simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const simQuadGeo = new THREE.PlaneGeometry(2, 2);

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uCurrentPos: { value: originTexture },
        uOrigin: { value: originTexture },
        uFluidVelocity: { value: fluidSim.velocityA.texture },
        uFluidDensity: { value: fluidSim.densityA.texture },
        uTime: { value: 0 },
        uHZ: { value: 1.0 },
        uResolution: { value: new THREE.Vector2(simSize, simSize) },
        uProjectionMatrix: { value: camera.projectionMatrix },
        uViewMatrix: { value: camera.matrixWorldInverse },
        uModelMatrix: { value: pointsGroup.matrixWorld },
        uInvViewMatrix: { value: camera.matrixWorld },
      },
      vertexShader: simVertexShader,
      fragmentShader: simFragmentShader,
      depthTest: false,
      depthWrite: false,
    });

    const simQuad = new THREE.Mesh(simQuadGeo, simMaterial);
    simScene.add(simQuad);

    // Initial populate pass into simTargetA & simTargetB
    renderer.setRenderTarget(simTargetA);
    renderer.render(simScene, simCamera);
    renderer.setRenderTarget(simTargetB);
    renderer.render(simScene, simCamera);

    // 7. Points Mesh Geometry
    const pointsGeo = new THREE.BufferGeometry();
    const uvs = new Float32Array(totalPoints * 2);
    const randoms = new Float32Array(totalPoints * 4);

    for (let y = 0; y < simSize; y++) {
      for (let x = 0; x < simSize; x++) {
        const i = y * simSize + x;
        uvs[i * 2] = (x + 0.5) / simSize;
        uvs[i * 2 + 1] = (y + 0.5) / simSize;

        randoms[i * 4] = Math.random();
        randoms[i * 4 + 1] = Math.random();
        randoms[i * 4 + 2] = Math.random();
        randoms[i * 4 + 3] = Math.random();
      }
    }

    pointsGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(totalPoints * 3), 3));
    pointsGeo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    pointsGeo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 4));

    // Render Material (from AXON Brief Section 7)
    // Additive blending, transparent, depth test on, depth write off
    const parsedAccent = new THREE.Color(accentColor);
    const pointsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPosTexture: { value: simTargetA.texture },
        uMatcap: { value: matcapTexture },
        uDPR: { value: dpr },
        uTime: { value: 0 },
        uAccentColor: { value: new THREE.Vector3(parsedAccent.r, parsedAccent.g, parsedAccent.b) },
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthTest: true,
      depthWrite: false,
    });

    const pointsMesh = new THREE.Points(pointsGeo, pointsMaterial);
    pointsGroup.add(pointsMesh);

    // 8. Mouse & Cursor Fluid Tracking (Section 8 & 9)
    let mouse = {
      x: container.clientWidth * 0.5,
      y: container.clientHeight * 0.5,
      prevX: container.clientWidth * 0.5,
      prevY: container.clientHeight * 0.5,
      normX: 0,
      normY: 0,
      lastMoveTime: performance.now(),
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = x;
      mouse.y = y;
      mouse.normX = (x / rect.width) * 2 - 1; // -1..1
      mouse.normY = (y / rect.height) * 2 - 1; // -1..1

      const now = performance.now();
      const dtMs = now - mouse.lastMoveTime;
      mouse.lastMoveTime = now;

      // Cursor movement calculations (Section 8)
      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      const len = Math.hypot(dx, dy);

      if (len > 0.01 && interactive) {
        // Splat radius = clamp-map(len, 0..5 -> 0..60) * 0.6 (* 0.8 on mobile)
        const radiusT = Math.min(Math.max((len - 0) / 5.0, 0), 1.0);
        const radiusPx = (radiusT * 60) * (isMobile ? 0.8 : 0.6);
        const radiusUv = Math.max(radiusPx / 200.0, 0.04);

        // Force multiplier = clamp-map(len, 0..15 -> 0..10)
        const forceT = Math.min(Math.max((len - 0) / 15.0, 0), 1.0);
        const forceMult = forceT * 10.0 + 1.2;

        const uvX = x / rect.width;
        const uvY = 1.0 - y / rect.height; // WebGL UV flip
        const aspect = rect.width / rect.height;

        fluidSim.splat(
          uvX,
          uvY,
          (dx / rect.width) * forceMult * 12.0,
          (dy / rect.height) * forceMult * 12.0,
          radiusUv,
          aspect
        );
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      pointsMaterial.uniforms.uDPR.value = renderer.getPixelRatio();
    };
    window.addEventListener('resize', handleResize);

    // 10. Main Animation Loop
    let animId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTime = performance.now();

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      const timeSec = currentTime * 0.001;
      const HZ = Math.min(dt * 60, 2.0);

      // FPS Counter
      frameCount++;
      if (currentTime - fpsTime > 1000) {
        if (onFpsUpdate) onFpsUpdate(Math.round((frameCount * 1000) / (currentTime - fpsTime)));
        frameCount = 0;
        fpsTime = currentTime;
      }

      // Gaze camera drift (Section 7)
      // Base + (mouse.x mapped 0..width -> -1..1) * (-1) on x and (mouse.y mapped 0..height -> -1..1) * 2 on y
      // Camera lerps to it at 0.05 and looks at origin
      const targetCamX = baseCamPos.x + mouse.normX * -0.85;
      const targetCamY = baseCamPos.y + mouse.normY * 1.4;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Step fluid dissipation
      fluidSim.step();

      // Step simulation ping-pong pass
      pointsGroup.updateMatrixWorld();
      camera.updateMatrixWorld();

      simMaterial.uniforms.uCurrentPos.value = simTargetA.texture;
      simMaterial.uniforms.uFluidVelocity.value = fluidSim.velocityA.texture;
      simMaterial.uniforms.uFluidDensity.value = fluidSim.densityA.texture;
      simMaterial.uniforms.uTime.value = timeSec;
      simMaterial.uniforms.uHZ.value = HZ;
      simMaterial.uniforms.uProjectionMatrix.value = camera.projectionMatrix;
      simMaterial.uniforms.uViewMatrix.value = camera.matrixWorldInverse;
      simMaterial.uniforms.uModelMatrix.value = pointsGroup.matrixWorld;
      simMaterial.uniforms.uInvViewMatrix.value = camera.matrixWorld;

      // Render simulation into target B
      renderer.setRenderTarget(simTargetB);
      renderer.render(simScene, simCamera);

      // Swap simulation targets
      const tmp = simTargetA;
      simTargetA = simTargetB;
      simTargetB = tmp;

      // Render points mesh to screen
      pointsMaterial.uniforms.uPosTexture.value = simTargetA.texture;
      pointsMaterial.uniforms.uTime.value = timeSec;

      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', handleResize);

      fluidSim.dispose();
      simTargetA.dispose();
      simTargetB.dispose();
      originTexture.dispose();
      matcapTexture.dispose();
      pointsGeo.dispose();
      pointsMaterial.dispose();
      simMaterial.dispose();
      simQuadGeo.dispose();
      renderer.dispose();
    };
  }, [particleCount, interactive, accentColor, onFpsUpdate]);

  if (!isSupported) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ pointerEvents: interactive ? 'auto' : 'none' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

