import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function GridPlane() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = -((state.clock.elapsedTime * 0.3) % 2);
    }
  });

  return (
    <group ref={ref}>
      <gridHelper
        args={[60, 40, '#00ff8820', '#00ff8810']}
        position={[0, -8, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}
