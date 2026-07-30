import { useEffect, useRef, useState, Suspense, lazy } from "react";

const R3F = lazy(async () => {
  const [{ Canvas, useFrame }, drei, THREE] = await Promise.all([
    import("@react-three/fiber"),
    import("@react-three/drei"),
    import("three"),
  ]);

  function Particles({ count, animate }: { count: number; animate: boolean }) {
    const ref = useRef<any>(null);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sage = new THREE.Color("#84A98C");
    const sageDeep = new THREE.Color("#52796F");
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const c = i % 3 === 0 ? sageDeep : sage;
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    useFrame((_, dt) => {
      if (!ref.current) return;
      ref.current.rotation.y += dt * 0.03;
      if (!animate) return;
      const pos = ref.current.geometry.attributes.position;
      const arr = pos.array as Float32Array;
      const t = performance.now() * 0.0005;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += Math.sin(t + i) * 0.002;
      }
      pos.needsUpdate = true;
    });
    return (
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.5} sizeAttenuation depthWrite={false} />
      </points>
    );
  }

  function TorusKnot() {
    const ref = useRef<any>(null);
    useFrame((_, dt) => {
      if (ref.current) {
        ref.current.rotation.y += dt * 0.5;
        ref.current.rotation.x += dt * 0.15;
      }
    });
    return (
      <group position={[4.2, 0, 0]}>
        <mesh ref={ref}>
          <torusKnotGeometry args={[1.1, 0.32, 180, 24]} />
          <meshStandardMaterial
            color="#84A98C"
            emissive="#52796F"
            emissiveIntensity={0.3}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
        <pointLight color="#84A98C" intensity={1.2} distance={8} />
      </group>
    );
  }

  function TorusKnotLite() {
    const ref = useRef<any>(null);
    useFrame((_, dt) => {
      if (ref.current) {
        ref.current.rotation.y += dt * 0.4;
        ref.current.rotation.x += dt * 0.12;
      }
    });
    return (
      <group position={[4.2, 0, 0]}>
        <mesh ref={ref}>
          <torusKnotGeometry args={[1.0, 0.28, 80, 12]} />
          <meshStandardMaterial
            color="#84A98C"
            emissive="#52796F"
            emissiveIntensity={0.25}
            metalness={0.4}
            roughness={0.35}
          />
        </mesh>
      </group>
    );
  }

  return {
    default: ({
      particleCount,
      showModel,
      lite,
      starCount,
      dpr,
    }: {
      particleCount: number;
      showModel: boolean;
      lite: boolean;
      starCount: number;
      dpr: [number, number];
    }) => (
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={dpr}
        gl={{ antialias: !lite, alpha: true, powerPreference: "low-power" }}
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.4} />
        {!lite && <directionalLight position={[5, 5, 5]} intensity={0.6} />}
        <Particles count={particleCount} animate={!lite} />
        {showModel && (lite ? <TorusKnotLite /> : <TorusKnot />)}
        {starCount > 0 && (
          <drei.Stars radius={40} depth={30} count={starCount} factor={2} fade speed={0.5} />
        )}
      </Canvas>
    ),
  };
});

export function Scene3D({ heavy = true }: { heavy?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<{
    mobile: boolean;
    reduce: boolean;
    lowEnd: boolean;
  }>({ mobile: false, reduce: false, lowEnd: false });

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = (navigator as any).hardwareConcurrency ?? 8;
    const mem = (navigator as any).deviceMemory ?? 8;
    const lowEnd = cores <= 4 || mem <= 4;
    setProfile({ mobile, reduce, lowEnd });
    // Mobile e reduced-motion nunca baixam o bundle 3D.
    if (mobile || reduce) return;
    const start = () => setMounted(true);
    const ric = (window as any).requestIdleCallback;
    if (typeof ric === "function") {
      const id = ric(start, { timeout: 2500 });
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const t = setTimeout(start, 1200);
    return () => clearTimeout(t);
  }, []);

  if (!mounted || profile.reduce || profile.mobile) return null;

  const mobile = profile.mobile;
  const lite = mobile || profile.lowEnd;
  const particleCount = mobile ? 35 : lite ? 90 : 180;
  const starCount = mobile ? 0 : lite ? 250 : 600;
  const dpr: [number, number] = mobile ? [1, 1] : [1, 1.5];

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Suspense fallback={null}>
        <R3F
          particleCount={particleCount}
          showModel={heavy && !mobile}
          lite={lite}
          starCount={starCount}
          dpr={dpr}
        />
      </Suspense>
    </div>
  );
}