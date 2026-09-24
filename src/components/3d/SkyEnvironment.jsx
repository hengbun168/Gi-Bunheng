import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SkyEnvironment({ mobile }) {
  const cloudsRef = useRef();
  const starsRef = useRef();

  // Procedural Stars in upper twilight sky
  const stars = useMemo(() => {
    const count = mobile ? 80 : 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = Math.random() * 25 + 5; // upper sky
      positions[i * 3 + 2] = -Math.random() * 40 - 20; // far back
    }
    return positions;
  }, [mobile]);

  // Procedural anime cloud clusters
  const clouds = useMemo(() => {
    const list = [];
    const count = mobile ? 5 : 12;
    for (let i = 0; i < count; i++) {
      list.push({
        position: [
          (Math.random() - 0.5) * 70,
          Math.random() * 6 + 1,
          -Math.random() * 25 - 35,
        ],
        scale: [
          Math.random() * 6 + 7,
          Math.random() * 2.5 + 2,
          Math.random() * 3 + 2,
        ],
        speed: (Math.random() * 0.08 + 0.04) * (Math.random() > 0.5 ? 1 : -1),
      });
    }
    return list;
  }, [mobile]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cloudsRef.current) {
      cloudsRef.current.position.x = Math.sin(t * 0.02) * 4;
    }
  });

  return (
    <group>
      {/* Anime Twilight Horizon Glow (Large Back Curved Plane) */}
      <mesh position={[0, 2, -55]}>
        <planeGeometry args={[130, 50]} />
        <meshBasicMaterial
          color="#061a33"
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Warm Sunset / Twilight Rim on the Horizon */}
      <mesh position={[0, -2, -52]}>
        <planeGeometry args={[120, 14]} />
        <meshBasicMaterial
          color="#ff7b54"
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Cyber Moon / Celestial Astral Body */}
      <group position={[-16, 12, -45]}>
        <mesh>
          <sphereGeometry args={[2.8, 24, 24]} />
          <meshBasicMaterial color="#d4f4ff" />
        </mesh>
        {/* Soft Moon Halo */}
        <mesh>
          <sphereGeometry args={[3.6, 16, 16]} />
          <meshBasicMaterial
            color="#00d9ff"
            transparent
            opacity={0.25}
          />
        </mesh>
        {/* Celestial Orbital Rune Ring */}
        <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[4.8, 0.04, 8, 32]} />
          <meshBasicMaterial
            color="#00ff9c"
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>

      {/* Stars in Deep Night Sky */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[stars, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.25}
          color="#7dd3fc"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Stylized Anime Clouds */}
      <group ref={cloudsRef}>
        {clouds.map((c, i) => (
          <group key={i} position={c.position} scale={c.scale}>
            <mesh>
              <dodecahedronGeometry args={[1, 1]} />
              <meshStandardMaterial
                color="#0c1d38"
                emissive="#061224"
                roughness={0.9}
                transparent
                opacity={0.7}
              />
            </mesh>
            <mesh position={[0.4, 0.2, 0.2]} scale={0.7}>
              <dodecahedronGeometry args={[1, 1]} />
              <meshStandardMaterial
                color="#142c4f"
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
