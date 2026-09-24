import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export default function MouseParallax({ intensity = 0.15 }) {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.current.x * intensity - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (mouse.current.y * intensity - groupRef.current.rotation.x) * 0.05;
    }
  });

  // Track mouse globally
  if (typeof window !== 'undefined') {
    const handler = (e) => {
      mouse.current.x = (e.clientX / size.width - 0.5) * 2;
      mouse.current.y = (e.clientY / size.height - 0.5) * 2;
    };

    // Use one-time setup via useFrame's state
    if (!groupRef._listenerAdded) {
      window.addEventListener('mousemove', handler);
      groupRef._listenerAdded = true;
    }
  }

  return <group ref={groupRef} />;
}
