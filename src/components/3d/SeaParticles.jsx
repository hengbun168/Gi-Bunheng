import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SeaParticles({ count = 120, mobile = false }) {
  const pointsRef = useRef();
  const particleCount = mobile ? 45 : count;

  const [positions, speeds, opacities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    const op = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Distributed across the sea and foreground
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = Math.random() * 8 - 2.5; // From water level up to sky
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;

      spd[i] = Math.random() * 0.4 + 0.15;
      op[i] = Math.random() * 0.6 + 0.4;
    }

    return [pos, spd, op];
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < particleCount; i++) {
      let y = pos.getY(i);
      let x = pos.getX(i);

      // Rise slowly like ocean fireflies / digital bioluminescence
      y += speeds[i] * delta * 0.9;
      // Gentle horizontal drift
      x += Math.sin(time * 0.5 + i) * 0.004;

      // Wrap around when rising past upper boundary
      if (y > 7.5) {
        y = -2.6;
        x = (Math.random() - 0.5) * 28;
      }

      pos.setY(i, y);
      pos.setX(i, x);
    }

    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={mobile ? 0.08 : 0.12}
        color="#00ff9c"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
