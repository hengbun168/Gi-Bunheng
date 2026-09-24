import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DeveloperGlyphs({ mobile }) {
  const reactOrbRef = useRef();
  const terminalRef = useRef();
  const bracketRef1 = useRef();
  const bracketRef2 = useRef();
  const codePrismRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // React-style orbital rings rotation
    if (reactOrbRef.current) {
      reactOrbRef.current.rotation.y = t * 0.3;
      reactOrbRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
      reactOrbRef.current.position.y = 2.4 + Math.sin(t * 0.6) * 0.35;
    }

    // Holographic terminal panel float
    if (terminalRef.current) {
      terminalRef.current.position.y = 1.2 + Math.cos(t * 0.5) * 0.25;
      terminalRef.current.rotation.y = -0.3 + Math.sin(t * 0.3) * 0.08;
    }

    // Bracket Glyphs
    if (bracketRef1.current) {
      bracketRef1.current.position.y = 0.5 + Math.sin(t * 0.7 + 1) * 0.3;
      bracketRef1.current.rotation.y = t * 0.4;
    }
    if (bracketRef2.current) {
      bracketRef2.current.position.y = 3.6 + Math.cos(t * 0.65) * 0.3;
      bracketRef2.current.rotation.y = -t * 0.35;
    }

    // Code Prism
    if (codePrismRef.current) {
      codePrismRef.current.position.y = -0.5 + Math.sin(t * 0.8) * 0.2;
      codePrismRef.current.rotation.y += 0.01;
      codePrismRef.current.rotation.z = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group>
      {/* =========================================
          1. REACT-STYLE ASTRAL ORBITAL ATOM (LEFT)
          ========================================= */}
      <group ref={reactOrbRef} position={[-7.5, 2.4, -10]} scale={0.65}>
        {/* Core glowing node */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={2.5}
          />
        </mesh>
        {/* Ring 1 */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.3, 0.025, 8, 36]} />
          <meshBasicMaterial color="#00ff9c" transparent opacity={0.6} />
        </mesh>
        {/* Ring 2 */}
        <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[1.3, 0.025, 8, 36]} />
          <meshBasicMaterial color="#00d9ff" transparent opacity={0.6} />
        </mesh>
        {/* Ring 3 */}
        <mesh rotation={[0, -Math.PI / 3, Math.PI / 4]}>
          <torusGeometry args={[1.3, 0.025, 8, 36]} />
          <meshBasicMaterial color="#7dd3fc" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* =========================================
          2. HOLOGRAPHIC CYBER-TERMINAL HUD PANEL (RIGHT)
          ========================================= */}
      {!mobile && (
        <group ref={terminalRef} position={[7.8, 1.2, -12]} scale={0.8}>
          {/* Glass / Hologram Frame */}
          <mesh>
            <planeGeometry args={[2.8, 1.8]} />
            <meshStandardMaterial
              color="#041224"
              emissive="#00d9ff"
              emissiveIntensity={0.2}
              transparent
              opacity={0.4}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
          {/* Glowing Border Frame */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(2.8, 1.8)]} />
            <lineBasicMaterial color="#00d9ff" transparent opacity={0.7} />
          </lineSegments>
          {/* Hologram Prompt Header Line */}
          <mesh position={[0, 0.65, 0.01]}>
            <planeGeometry args={[2.4, 0.08]} />
            <meshBasicMaterial color="#00ff9c" transparent opacity={0.8} />
          </mesh>
          {/* Hologram Code Bar Lines */}
          <mesh position={[-0.4, 0.35, 0.01]}>
            <planeGeometry args={[1.4, 0.06]} />
            <meshBasicMaterial color="#7dd3fc" transparent opacity={0.7} />
          </mesh>
          <mesh position={[-0.2, 0.15, 0.01]}>
            <planeGeometry args={[1.8, 0.06]} />
            <meshBasicMaterial color="#00d9ff" transparent opacity={0.5} />
          </mesh>
          <mesh position={[-0.5, -0.05, 0.01]}>
            <planeGeometry args={[1.2, 0.06]} />
            <meshBasicMaterial color="#00ff9c" transparent opacity={0.5} />
          </mesh>
          <mesh position={[-0.3, -0.25, 0.01]}>
            <planeGeometry args={[1.6, 0.06]} />
            <meshBasicMaterial color="#7dd3fc" transparent opacity={0.4} />
          </mesh>
        </group>
      )}

      {/* =========================================
          3. FLOATING 3D CODE BRACKET RUNES (</> & {})
          ========================================= */}
      {/* Rune 1: Angle Bracket '<' */}
      <group ref={bracketRef1} position={[-6.2, 0.5, -7]} scale={0.4}>
        <mesh position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.07, 0.07, 1.4, 8]} />
          <meshStandardMaterial color="#00ff9c" emissive="#00ff9c" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, -0.6, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.07, 0.07, 1.4, 8]} />
          <meshStandardMaterial color="#00ff9c" emissive="#00ff9c" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Rune 2: Angle Bracket '>' */}
      {!mobile && (
        <group ref={bracketRef2} position={[6.0, 3.6, -9]} scale={0.35}>
          <mesh position={[0, 0.6, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.07, 0.07, 1.4, 8]} />
            <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={2} />
          </mesh>
          <mesh position={[0, -0.6, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.07, 0.07, 1.4, 8]} />
            <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={2} />
          </mesh>
        </group>
      )}

      {/* =========================================
          4. ABSTRACT TECH PRISM (JS / TS Crystal)
          ========================================= */}
      <group ref={codePrismRef} position={[2.5, -0.5, -6]} scale={0.3}>
        <mesh>
          <octahedronGeometry args={[1.2]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#003554"
            roughness={0.15}
            metalness={0.8}
            wireframe
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.7]} />
          <meshBasicMaterial color="#00ff9c" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}
