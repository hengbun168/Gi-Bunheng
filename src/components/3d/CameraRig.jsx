import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraRig({ mobile }) {
  const mouse = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const targetCamPos = useRef(new THREE.Vector3(0, 1.2, 13));
  const currentLookAt = useRef(new THREE.Vector3(0, -0.2, 0));

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress.current = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (!mobile) {
      const handleMouseMove = (e) => {
        mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobile]);

  useFrame((state, delta) => {
    const p = scrollProgress.current;
    const t = state.clock.getElapsedTime();

    // Subtle gentle ocean camera breathing
    const breathY = Math.sin(t * 0.6) * 0.12;
    const breathX = Math.cos(t * 0.4) * 0.08;

    // Mouse parallax contribution
    const mx = mobile ? 0 : mouse.current.x * 0.9;
    const my = mobile ? 0 : -mouse.current.y * 0.5;

    // Smooth spline interpolation across scroll sections:
    // 0.0 - 0.2: Hero (Ship sailing across ocean)
    // 0.2 - 0.4: About (gliding toward mysterious island)
    // 0.4 - 0.6: Skills (framing glowing developer glyphs)
    // 0.6 - 0.8: Projects (broad holographic view)
    // 0.8 - 1.0: Contact (peaceful night ocean with ship at horizon)
    let cx = 0;
    let cy = 1.2;
    let cz = 13;
    let lx = 0;
    let ly = -0.2;
    let lz = 0;

    if (p < 0.25) {
      // Hero to About: drift slightly left toward the island
      const f = p / 0.25;
      cx = THREE.MathUtils.lerp(0, -2.2, f);
      cy = THREE.MathUtils.lerp(1.2, 1.8, f);
      cz = THREE.MathUtils.lerp(13, 11, f);
      lx = THREE.MathUtils.lerp(0, -1.5, f);
    } else if (p < 0.5) {
      // About to Skills: closer view of floating rune artifacts
      const f = (p - 0.25) / 0.25;
      cx = THREE.MathUtils.lerp(-2.2, 1.0, f);
      cy = THREE.MathUtils.lerp(1.8, 1.0, f);
      cz = THREE.MathUtils.lerp(11, 9.8, f);
      lx = THREE.MathUtils.lerp(-1.5, 0.5, f);
      ly = THREE.MathUtils.lerp(-0.2, 0.2, f);
    } else if (p < 0.75) {
      // Skills to Projects: elevated panoramic view of ocean
      const f = (p - 0.5) / 0.25;
      cx = THREE.MathUtils.lerp(1.0, -1.0, f);
      cy = THREE.MathUtils.lerp(1.0, 2.4, f);
      cz = THREE.MathUtils.lerp(9.8, 12, f);
      lx = THREE.MathUtils.lerp(0.5, 0, f);
      ly = THREE.MathUtils.lerp(0.2, -0.4, f);
    } else {
      // Experience to Contact: tranquil night ocean
      const f = (p - 0.75) / 0.25;
      cx = THREE.MathUtils.lerp(-1.0, 0, f);
      cy = THREE.MathUtils.lerp(2.4, 0.9, f);
      cz = THREE.MathUtils.lerp(12, 14, f);
      lx = 0;
      ly = THREE.MathUtils.lerp(-0.4, -0.1, f);
    }

    targetCamPos.current.set(
      cx + mx + breathX,
      cy + my + breathY,
      cz
    );

    const lerpSpeed = Math.min(delta * 2.8, 0.1);
    state.camera.position.lerp(targetCamPos.current, lerpSpeed);

    currentLookAt.current.lerp(new THREE.Vector3(lx, ly, lz), lerpSpeed);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}
