import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getWaveHeight } from '../../utils/oceanMath';

export default function Ocean({ mobile }) {
  const meshRef = useRef();

  // Grid resolution
  const segments = mobile ? 45 : 85;
  const size = 120;

  // Store initial base positions to avoid allocating memory per frame
  const { geometry, basePositions } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const base = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count * 3; i++) {
      base[i] = pos.array[i];
    }

    return { geometry: geo, basePositions: base };
  }, [segments, size]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position;
    const count = pos.count;

    for (let i = 0; i < count; i++) {
      const x = basePositions[i * 3];
      const z = basePositions[i * 3 + 2];
      const y = getWaveHeight(x, z, time);
      pos.array[i * 3 + 1] = y;
    }

    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <group position={[0, -2.8, -15]}>
      {/* Primary Ocean Mesh */}
      <mesh ref={meshRef} geometry={geometry} receiveShadow>
        <meshStandardMaterial
          color="#06182d"
          emissive="#031122"
          emissiveIntensity={0.35}
          roughness={0.18}
          metalness={0.65}
          transparent
          opacity={0.96}
          flatShading={false}
        />
      </mesh>

      {/* Stylized Shimmer / Foam Wireframe Overlay */}
      <mesh geometry={geometry} position={[0, 0.04, 0]}>
        <meshBasicMaterial
          color="#00d9ff"
          wireframe
          transparent
          opacity={mobile ? 0.04 : 0.08}
        />
      </mesh>

      {/* Deep Ocean Under-glow Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[140, 140]} />
        <meshBasicMaterial color="#030609" />
      </mesh>
    </group>
  );
}
