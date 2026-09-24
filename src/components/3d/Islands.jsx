import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Islands({ mobile }) {
  const floatingIslandRef1 = useRef();
  const floatingIslandRef2 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (floatingIslandRef1.current) {
      floatingIslandRef1.current.position.y = 3.8 + Math.sin(t * 0.7) * 0.25;
      floatingIslandRef1.current.rotation.y = Math.sin(t * 0.2) * 0.05;
    }
    if (floatingIslandRef2.current) {
      floatingIslandRef2.current.position.y = 5.2 + Math.cos(t * 0.6) * 0.3;
      floatingIslandRef2.current.rotation.y = Math.cos(t * 0.25) * 0.06;
    }
  });

  return (
    <group>
      {/* =========================================
          1. DISTANT MYSTERIOUS ISLAND SILHOUETTE (LEFT)
          ========================================= */}
      <group position={[-18, -1.8, -32]}>
        {/* Main jagged mountain peak */}
        <mesh position={[0, 3.5, 0]}>
          <coneGeometry args={[7.5, 9, 6]} />
          <meshStandardMaterial
            color="#081526"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
        {/* Secondary lower peak */}
        <mesh position={[5.2, 2.2, -2]}>
          <coneGeometry args={[5, 6.5, 5]} />
          <meshStandardMaterial color="#050e1b" roughness={0.9} />
        </mesh>
        {/* Natural Sea Arch / Cave */}
        <mesh position={[-4.5, 1.2, 1]}>
          <torusGeometry args={[2.2, 0.9, 5, 8, Math.PI]} />
          <meshStandardMaterial color="#071322" roughness={0.9} />
        </mesh>
        {/* Distant ancient beacon / cyan tech light atop the highest crag */}
        <mesh position={[0, 8.2, 0]}>
          <octahedronGeometry args={[0.45]} />
          <meshBasicMaterial color="#00ff9c" />
        </mesh>
      </group>

      {/* =========================================
          2. DISTANT ARCHIPELAGO CRAGS (RIGHT)
          ========================================= */}
      <group position={[22, -2, -36]}>
        <mesh position={[0, 4, 0]}>
          <coneGeometry args={[9, 10.5, 6]} />
          <meshStandardMaterial color="#061222" roughness={0.9} />
        </mesh>
        <mesh position={[-6, 2.5, 1]}>
          <coneGeometry args={[4.8, 6.8, 5]} />
          <meshStandardMaterial color="#081628" roughness={0.9} />
        </mesh>
        <mesh position={[6, 2.0, -2]}>
          <coneGeometry args={[5.2, 5.8, 5]} />
          <meshStandardMaterial color="#040b17" roughness={0.9} />
        </mesh>
        {/* Tech Lighthouse / Runic Siphon Tower */}
        <mesh position={[-6, 6.2, 1]}>
          <cylinderGeometry args={[0.25, 0.4, 1.8, 6]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={2}
          />
        </mesh>
      </group>

      {/* =========================================
          3. SMALL FLOATING ANIME SKY ISLAND (LEFT)
          ========================================= */}
      <group ref={floatingIslandRef1} position={[-8.5, 3.8, -18]} scale={0.75}>
        {/* Inverted rock cone bottom */}
        <mesh position={[0, -0.6, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.6, 2.2, 6]} />
          <meshStandardMaterial color="#101e33" roughness={0.8} />
        </mesh>
        {/* Flat grassy / mossy top plateau */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[1.7, 1.6, 0.4, 6]} />
          <meshStandardMaterial color="#0d2836" roughness={0.7} />
        </mesh>
        {/* Floating Cyber Crystal on the island */}
        <mesh position={[0, 1.1, 0]}>
          <octahedronGeometry args={[0.55]} />
          <meshStandardMaterial
            color="#00ff9c"
            emissive="#00ff9c"
            emissiveIntensity={2.5}
            wireframe
          />
        </mesh>
        {/* Orbital Crystal Debris */}
        <mesh position={[1.4, 0.2, 0.6]}>
          <dodecahedronGeometry args={[0.22]} />
          <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-1.2, -0.2, -0.8]}>
          <dodecahedronGeometry args={[0.18]} />
          <meshStandardMaterial color="#00ff9c" emissive="#00ff9c" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* =========================================
          4. SECOND SMALL FLOATING SKY ISLAND (RIGHT)
          ========================================= */}
      {!mobile && (
        <group ref={floatingIslandRef2} position={[9.5, 5.2, -22]} scale={0.6}>
          <mesh position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[1.4, 2.0, 5]} />
            <meshStandardMaterial color="#0a1728" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[1.5, 1.4, 0.35, 5]} />
            <meshStandardMaterial color="#0b2433" roughness={0.7} />
          </mesh>
          {/* Cyber Totem / Monolith */}
          <mesh position={[0, 1.0, 0]}>
            <boxGeometry args={[0.35, 1.2, 0.35]} />
            <meshStandardMaterial
              color="#00d9ff"
              emissive="#00d9ff"
              emissiveIntensity={1.8}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}
