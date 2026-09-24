import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

function FloatingCube({ position, size, speed }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

export default function FloatingCubes({ count = 6 }) {
  const cubes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 5,
      ],
      size: Math.random() * 1.2 + 0.4,
      speed: Math.random() * 0.5 + 0.3,
      key: i,
    }));
  }, [count]);

  return (
    <>
      {cubes.map((cube) => (
        <FloatingCube key={cube.key} {...cube} />
      ))}
    </>
  );
}
