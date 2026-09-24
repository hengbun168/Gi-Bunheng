import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

function SingleBird({ basePosition, speed, radius, yOffset, phaseOffset }) {
  const group = useRef();
  const leftWing = useRef();
  const rightWing = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + phaseOffset;

    if (group.current) {
      // Circular / elliptical gliding flight path across the sky
      const x = basePosition[0] + Math.cos(t * 0.4) * radius;
      const z = basePosition[2] + Math.sin(t * 0.4) * (radius * 0.6);
      const y = basePosition[1] + Math.sin(t * 0.8) * 0.8 + yOffset;

      // Heading rotation tangent to path
      const angle = Math.atan2(
        Math.cos(t * 0.4) * (radius * 0.6),
        -Math.sin(t * 0.4) * radius
      );

      group.current.position.set(x, y, z);
      group.current.rotation.y = angle;
      // Gentle banking roll when turning
      group.current.rotation.z = Math.sin(t * 0.4) * 0.25;
    }

    // Wing flapping animation
    const wingFlap = Math.sin(t * 5.0) * 0.45;
    if (leftWing.current) {
      leftWing.current.rotation.z = wingFlap;
    }
    if (rightWing.current) {
      rightWing.current.rotation.z = -wingFlap;
    }
  });

  return (
    <group ref={group} scale={0.22}>
      {/* Bird Body */}
      <mesh>
        <coneGeometry args={[0.2, 1.2, 4]} />
        <meshBasicMaterial color="#e0f2fe" />
      </mesh>

      {/* Left Wing */}
      <group position={[-0.1, 0, 0]} ref={leftWing}>
        <mesh position={[-0.8, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.04, 0.4]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Right Wing */}
      <group position={[0.1, 0, 0]} ref={rightWing}>
        <mesh position={[0.8, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.04, 0.4]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

export default function Birds({ mobile }) {
  const birds = useMemo(() => {
    const list = [
      { basePosition: [-4, 6.5, -20], speed: 0.6, radius: 14, yOffset: 0, phaseOffset: 0 },
      { basePosition: [-2, 7.2, -22], speed: 0.62, radius: 12, yOffset: 0.5, phaseOffset: 0.5 },
      { basePosition: [-5, 6.0, -19], speed: 0.58, radius: 15, yOffset: -0.3, phaseOffset: 1.1 },
    ];
    if (!mobile) {
      list.push(
        { basePosition: [6, 8.5, -28], speed: 0.45, radius: 18, yOffset: 1.0, phaseOffset: 2.2 },
        { basePosition: [8, 9.0, -30], speed: 0.47, radius: 16, yOffset: 1.4, phaseOffset: 2.7 }
      );
    }
    return list;
  }, [mobile]);

  return (
    <group>
      {birds.map((b, i) => (
        <SingleBird key={i} {...b} />
      ))}
    </group>
  );
}
