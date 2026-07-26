import { useEffect, useRef, useState, Suspense, lazy } from "react";

const R3F = lazy(async () => {
  const [{ Canvas, useFrame }, drei, THREE] = await Promise.all([
    import("@react-three/fiber"),
    import("@react-three/drei"),
    import("three"),
  ]);

  function Particles({ count }: { count: number }) {
    const ref = useRef<any>(null);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cyan = new THREE.Color("#00D4FF");
    const orange = new THREE.Color("#FF6B35");
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const c = i % 3 === 0 ? orange : cyan;
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    useFrame((_, dt) => {
      if (!ref.current) return;
      ref.current.rotation.y += dt * 0.03;
      const pos = ref.current.geometry.attributes.position;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += Math.sin(performance.now() * 0.0005 + i) * 0.002;
      }
      pos.needsUpdate = true;
    });
    return (
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.08} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} />
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
            color="#00D4FF"
            emissive="#0088FF"
            emissiveIntensity={0.7}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
        <pointLight color="#00D4FF" intensity={2} distance={8} />
      </group>
    );
  }

  return {
    default: ({ particleCount, showModel }: { particleCount: number; showModel: boolean }) => (
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <Particles count={particleCount} />
        {showModel && <TorusKnot />}
        <drei.Stars radius={40} depth={30} count={800} factor={2} fade speed={0.5} />
      </Canvas>
    ),
  };
});

export function Scene3D({ heavy = true }: { heavy?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setMounted(true);
    setMobile(window.innerWidth < 768);
  }, []);
  if (!mounted) return null;
  const count = mobile ? 50 : 200;
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Suspense fallback={null}>
        <R3F particleCount={count} showModel={heavy && !mobile} />
      </Suspense>
    </div>
  );
}