import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getWaveHeight } from '../../utils/oceanMath';
import { getPirateFlagTexture } from '../../utils/createPirateFlagTexture';

export default function PirateShip({ position = [4.5, -1.8, -8], scale = 0.85 }) {
  const shipGroup = useRef();
  const flagMesh = useRef();
  const mainSailRef = useRef();
  const foreSailRef = useRef();
  const mizzenSailRef = useRef();
  const lanternLightRef = useRef();
  const compassRingRef = useRef();

  // Flag texture
  const flagTexture = useMemo(() => {
    return getPirateFlagTexture();
  }, []);

  // Flag geometry with subdivision for wind ripple
  const flagGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2.4, 1.5, 16, 10);
    return geo;
  }, []);

  // Billowing curved sail geometry helper
  const createCurvedSail = (width, height, curveDepth = 0.35) => {
    const geo = new THREE.PlaneGeometry(width, height, 16, 16);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = (pos.getX(i) / (width / 2)); // -1 to 1
      const v = (pos.getY(i) / (height / 2)); // -1 to 1
      // Quadratic bulge towards -Z (wind pushing forward)
      const bulge = (1 - u * u) * (1 - v * v * 0.4) * curveDepth;
      pos.setZ(i, -bulge);
    }
    geo.computeVertexNormals();
    return geo;
  };

  const mainSailGeo = useMemo(() => createCurvedSail(3.2, 2.4, 0.45), []);
  const foreSailGeo = useMemo(() => createCurvedSail(2.5, 1.9, 0.38), []);
  const mizzenSailGeo = useMemo(() => createCurvedSail(2.2, 1.6, 0.32), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (shipGroup.current) {
      // Base coordinates of the ship in world space
      const baseX = position[0];
      const baseZ = position[2];

      // Sample wave heights around the ship for pitch & roll physics
      const bowZ = baseZ - 3.2;
      const sternZ = baseZ + 3.2;
      const portX = baseX - 1.2;
      const stbdX = baseX + 1.2;

      const midH = getWaveHeight(baseX, baseZ, t);
      const bowH = getWaveHeight(baseX, bowZ, t);
      const sternH = getWaveHeight(baseX, sternZ, t);
      const portH = getWaveHeight(portX, baseZ, t);
      const stbdH = getWaveHeight(stbdX, baseZ, t);

      // Pitch: rotation around X axis (bow dipping and rising)
      const targetPitch = Math.atan2(bowH - sternH, 6.4) * 0.85;
      // Roll: rotation around Z axis (listing to port or starboard)
      const targetRoll = Math.atan2(portH - stbdH, 2.4) * 0.75;
      // Gentle yaw drift
      const targetYaw = Math.sin(t * 0.25) * 0.08 - 0.22;

      // Smooth interpolation for natural boat inertia
      shipGroup.current.position.y = position[1] + midH * 0.85 + Math.sin(t * 0.8) * 0.05;
      shipGroup.current.rotation.x += (targetPitch - shipGroup.current.rotation.x) * 0.08;
      shipGroup.current.rotation.z += (targetRoll - shipGroup.current.rotation.z) * 0.08;
      shipGroup.current.rotation.y += (targetYaw - shipGroup.current.rotation.y) * 0.04;
    }

    // Flag fluttering in ocean wind
    if (flagMesh.current) {
      const pos = flagMesh.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Ripple increases toward the fly end (free edge)
        const factor = (x + 1.2) / 2.4;
        const wave = Math.sin(x * 4.0 - t * 6.0) * 0.18 * factor;
        const ripple = Math.cos(y * 3.0 + t * 4.0) * 0.06 * factor;
        pos.setZ(i, wave + ripple);
      }
      pos.needsUpdate = true;
      flagMesh.current.geometry.computeVertexNormals();
    }

    // Subtle sail billowing animation
    if (mainSailRef.current) {
      mainSailRef.current.rotation.y = Math.sin(t * 1.5) * 0.04;
    }
    if (foreSailRef.current) {
      foreSailRef.current.rotation.y = Math.sin(t * 1.5 + 0.4) * 0.035;
    }

    // Holographic compass rotation
    if (compassRingRef.current) {
      compassRingRef.current.rotation.z += 0.015;
      compassRingRef.current.rotation.y = Math.sin(t * 0.8) * 0.15;
    }

    // Lantern pulse
    if (lanternLightRef.current) {
      lanternLightRef.current.intensity = 1.2 + Math.sin(t * 3.5) * 0.35;
    }
  });

  return (
    <group ref={shipGroup} position={position} scale={scale} rotation={[0, -0.25, 0]}>
      {/* =========================================
          1. HULL STRUCTURE
          ========================================= */}
      {/* Lower Main Hull (Keel to Waterline) */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[2.2, 1.3, 7.2]} />
        <meshStandardMaterial color="#110905" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Pointed Clipper Bow */}
      <mesh position={[0, 0.25, -4.1]} rotation={[0.42, 0, 0]}>
        <coneGeometry args={[1.1, 2.2, 4]} />
        <meshStandardMaterial color="#1a0f08" roughness={0.65} />
      </mesh>

      {/* Forward Bowsprit Spar */}
      <mesh position={[0, 1.1, -5.6]} rotation={[-0.45, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.12, 3.2, 8]} />
        <meshStandardMaterial color="#2d1c10" roughness={0.5} />
      </mesh>

      {/* Bow Figurehead Tech Crystal */}
      <mesh position={[0, 0.65, -5.1]}>
        <octahedronGeometry args={[0.26]} />
        <meshStandardMaterial
          color="#00ff9c"
          emissive="#00ff9c"
          emissiveIntensity={1.2}
          wireframe
        />
      </mesh>

      {/* Main Deck Bulwarks (Wood Side Walls) */}
      <mesh position={[-1.15, 0.65, 0]}>
        <boxGeometry args={[0.16, 0.65, 6.8]} />
        <meshStandardMaterial color="#26160c" roughness={0.7} />
      </mesh>
      <mesh position={[1.15, 0.65, 0]}>
        <boxGeometry args={[0.16, 0.65, 6.8]} />
        <meshStandardMaterial color="#26160c" roughness={0.7} />
      </mesh>

      {/* Main Deck Floor */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[2.14, 0.08, 6.7]} />
        <meshStandardMaterial color="#352216" roughness={0.8} />
      </mesh>

      {/* Glowing Cyber Rune Channels Along Hull Port & Starboard */}
      <mesh position={[-1.18, 0.2, 0]}>
        <boxGeometry args={[0.04, 0.08, 6.4]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={1.8}
        />
      </mesh>
      <mesh position={[1.18, 0.2, 0]}>
        <boxGeometry args={[0.04, 0.08, 6.4]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={1.8}
        />
      </mesh>

      {/* Secondary Lower Green Waterline Energy Channel */}
      <mesh position={[-1.14, -0.4, 0]}>
        <boxGeometry args={[0.04, 0.05, 5.8]} />
        <meshStandardMaterial
          color="#00ff9c"
          emissive="#00ff9c"
          emissiveIntensity={1.4}
        />
      </mesh>
      <mesh position={[1.14, -0.4, 0]}>
        <boxGeometry args={[0.04, 0.05, 5.8]} />
        <meshStandardMaterial
          color="#00ff9c"
          emissive="#00ff9c"
          emissiveIntensity={1.4}
        />
      </mesh>

      {/* =========================================
          2. STERN CASTLE & CAPTAIN'S CABIN
          ========================================= */}
      {/* Elevated Quarterdeck Structure */}
      <mesh position={[0, 1.15, 2.5]}>
        <boxGeometry args={[2.24, 1.1, 2.2]} />
        <meshStandardMaterial color="#1a0e08" roughness={0.65} />
      </mesh>

      {/* Stern Transom Balcony */}
      <mesh position={[0, 1.45, 3.65]}>
        <boxGeometry args={[2.0, 0.7, 0.2]} />
        <meshStandardMaterial color="#2d190f" roughness={0.6} />
      </mesh>

      {/* Stern Cyber Windows (Lattice of glowing glass) */}
      <mesh position={[0, 1.25, 3.72]}>
        <planeGeometry args={[1.7, 0.45]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={1.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* =========================================
          3. MASTS & RIGGING
          ========================================= */}
      {/* 3a. Fore Mast (Front) */}
      <group position={[0, 2.4, -2.1]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.12, 4.6, 8]} />
          <meshStandardMaterial color="#2c1a0e" roughness={0.7} />
        </mesh>
        {/* Yardarm 1 */}
        <mesh position={[0, 1.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 2.8, 8]} />
          <meshStandardMaterial color="#1e120a" />
        </mesh>
        {/* Fore Sail */}
        <mesh ref={foreSailRef} geometry={foreSailGeo} position={[0, 0.8, -0.2]}>
          <meshStandardMaterial
            color="#090f1a"
            roughness={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* 3b. Main Mast (Center - Tallest) */}
      <group position={[0, 3.2, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.15, 6.2, 8]} />
          <meshStandardMaterial color="#2c1a0e" roughness={0.7} />
        </mesh>
        {/* Yardarm Main Lower */}
        <mesh position={[0, 1.3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 3.6, 8]} />
          <meshStandardMaterial color="#1e120a" />
        </mesh>
        {/* Yardarm Main Upper */}
        <mesh position={[0, 2.3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 2.9, 8]} />
          <meshStandardMaterial color="#1e120a" />
        </mesh>
        {/* Main Sail */}
        <mesh ref={mainSailRef} geometry={mainSailGeo} position={[0, 1.1, -0.25]}>
          <meshStandardMaterial
            color="#080e18"
            roughness={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Crow's Nest Platform */}
        <mesh position={[0, 2.65, 0]}>
          <cylinderGeometry args={[0.38, 0.32, 0.45, 8]} />
          <meshStandardMaterial color="#21130a" />
        </mesh>

        {/* =========================================
            CUSTOM PIRATE FLAG (GB EMBLEM)
            ========================================= */}
        <group position={[0, 3.3, 0]}>
          {/* Flagpole Halyard Attachment */}
          <mesh position={[1.2, 0, 0]} ref={flagMesh} geometry={flagGeometry}>
            <meshStandardMaterial
              map={flagTexture}
              side={THREE.DoubleSide}
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>
        </group>
      </group>

      {/* 3c. Mizzen Mast (Aft) */}
      <group position={[0, 2.6, 2.2]}>
        <mesh>
          <cylinderGeometry args={[0.07, 0.1, 4.4, 8]} />
          <meshStandardMaterial color="#2c1a0e" roughness={0.7} />
        </mesh>
        {/* Yardarm Mizzen */}
        <mesh position={[0, 0.9, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 2.5, 8]} />
          <meshStandardMaterial color="#1e120a" />
        </mesh>
        {/* Mizzen Sail */}
        <mesh ref={mizzenSailRef} geometry={mizzenSailGeo} position={[0, 0.7, -0.18]}>
          <meshStandardMaterial
            color="#080d16"
            roughness={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* =========================================
          4. FUTURISTIC NAVIGATION & ASTRAL HELM
          ========================================= */}
      {/* Holographic Astral Compass Ring on Quarterdeck */}
      <group position={[0, 1.95, 1.8]}>
        <mesh ref={compassRingRef} rotation={[-Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.42, 0.02, 12, 32]} />
          <meshStandardMaterial
            color="#00ff9c"
            emissive="#00ff9c"
            emissiveIntensity={2.0}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Center Gyroscopic Rune Node */}
        <mesh>
          <dodecahedronGeometry args={[0.1]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>

      {/* =========================================
          5. LANTERNS & GLOWING ATMOSPHERE
          ========================================= */}
      {/* Stern Port Lantern */}
      <group position={[-0.95, 1.8, 3.7]}>
        <mesh>
          <cylinderGeometry args={[0.09, 0.06, 0.22, 6]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={3}
          />
        </mesh>
      </group>

      {/* Stern Starboard Lantern */}
      <group position={[0.95, 1.8, 3.7]}>
        <mesh>
          <cylinderGeometry args={[0.09, 0.06, 0.22, 6]} />
          <meshStandardMaterial
            color="#00ff9c"
            emissive="#00ff9c"
            emissiveIntensity={3}
          />
        </mesh>
      </group>

      {/* Dynamic Stern Glow Light */}
      <pointLight
        ref={lanternLightRef}
        position={[0, 1.9, 4.0]}
        color="#00d9ff"
        intensity={1.2}
        distance={7}
      />

      {/* Bowsprit Lantern */}
      <group position={[0, 1.4, -6.4]}>
        <mesh>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color="#00ff9c"
            emissive="#00ff9c"
            emissiveIntensity={3.5}
          />
        </mesh>
        <pointLight position={[0, 0, 0]} color="#00ff9c" intensity={0.9} distance={5} />
      </group>

      {/* Stylized Bow Wave Spray Rings */}
      <mesh position={[0, -0.4, -3.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.4, 16]} />
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
