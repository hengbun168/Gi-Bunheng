import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

function Sphere({ position, size, speed, color }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 1;
      ref.current.position.x =
        position[0] + Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} wireframe />
    </mesh>
  );
}

export default function GlowingSpheres({ count = 4 }) {
  const spheres = useMemo(() => {
    const colors = ['#00ff88', '#00d4ff', '#7b61ff', '#00ff88'];
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8 - 5,
      ],
      size: Math.random() * 1 + 0.6,
      speed: Math.random() * 0.3 + 0.2,
      color: colors[i % colors.length],
      key: i,
    }));
  }, [count]);

  return (
    <>
      {spheres.map((s) => (
        <Sphere key={s.key} {...s} />
      ))}
    </>
  );
}
