import { Canvas } from '@react-three/fiber';
import Ocean from './Ocean';
import PirateShip from './PirateShip';
import SkyEnvironment from './SkyEnvironment';
import Islands from './Islands';
import Birds from './Birds';
import DeveloperGlyphs from './DeveloperGlyphs';
import SeaParticles from './SeaParticles';
import CameraRig from './CameraRig';

export default function Scene3DCanvas({ mobile }) {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 13], fov: 55 }}
      dpr={mobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)}
      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      {/* Deep Ocean Twilight Sky / Atmospheric Color */}
      <color attach="background" args={['#06111f']} />
      <fog attach="fog" args={['#06111f', 22, 65]} />

      {/* Atmospheric Anime Lighting */}
      <ambientLight intensity={0.65} color="#0c1d38" />

      {/* Sunset / Twilight Key Rim Light */}
      <directionalLight
        position={[-12, 14, -18]}
        intensity={1.2}
        color="#7dd3fc"
      />

      {/* Warm Sunset Horizon Fill */}
      <directionalLight
        position={[8, 3, -30]}
        intensity={0.8}
        color="#ff8552"
      />

      {/* Ocean Surface Cyan / Emerald Specular Light */}
      <pointLight
        position={[0, 4, -4]}
        intensity={1.5}
        distance={25}
        color="#00d9ff"
      />

      {/* Camera Rig with Scroll & Mouse Parallax */}
      <CameraRig mobile={mobile} />

      {/* Celestial Sky Dome, Clouds, Moon & Stars */}
      <SkyEnvironment mobile={mobile} />

      {/* Distant Mysterious Archipelago & Floating Sky Islands */}
      <Islands mobile={mobile} />

      {/* Stylized Soaring Seabirds */}
      <Birds mobile={mobile} />

      {/* Stylized Anime Ocean with Dynamic Gerstner-type Waves */}
      <Ocean mobile={mobile} />

      {/* Original Stylized 3D Pirate Ship with GB Flag */}
      <PirateShip
        position={[3.8, -1.9, -7.5]}
        scale={0.82}
        mobile={mobile}
      />

      {/* Floating Developer + Pirate Fusion Artifacts */}
      <DeveloperGlyphs mobile={mobile} />

      {/* Bioluminescent Digital Sea Particles Rising from the Water */}
      <SeaParticles count={mobile ? 40 : 130} mobile={mobile} />
    </Canvas>
  );
}
