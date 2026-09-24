import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { techStackItems } from '../data/skills';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import { getIcon } from '../utils/icons';
import '../styles/TechStack.css';

function DeveloperCoreMesh({ mouse }) {
  const outerRef = useRef();
  const innerRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.25 + mouse.current.y * 0.4;
      outerRef.current.rotation.y = t * 0.35 + mouse.current.x * 0.4;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.3;
      innerRef.current.rotation.z = t * 0.2;
      const s = 1 + Math.sin(t * 2) * 0.08;
      innerRef.current.scale.set(s, s, s);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.15;
      ringRef.current.rotation.x = Math.PI / 3 + mouse.current.y * 0.2;
    }
  });

  return (
    <group>
      {/* Outer Rotating Wireframe Icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.6} />
      </mesh>

      {/* Center solid energy sphere */}
      <mesh>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>

      {/* Orbit Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.3, 0.02, 16, 64]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
      </mesh>

      <pointLight color="#00ff88" intensity={1.5} distance={6} />
      <pointLight color="#00f0ff" intensity={1.5} distance={6} />
    </group>
  );
}

function TechCoreScene({ mouse }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      dpr={Math.min(window.devicePixelRatio || 1, 1.5)}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ background: 'transparent' }}
    >
      <DeveloperCoreMesh mouse={mouse} />
    </Canvas>
  );
}

export default function TechStack() {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [activeItem, setActiveItem] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, isMobile: false });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        isMobile: window.innerWidth < 768,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const orbitPositions = useMemo(() => {
    const count = techStackItems.length;
    const radius = dimensions.isMobile ? 135 : 210;

    return techStackItems.map((_, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * (radius * 0.82), // subtle 3D oval perspective
      };
    });
  }, [dimensions.isMobile]);

  return (
    <section className="section techstack">
      <div className="container">
        <SectionTitle
          title="Technologies I Work With"
          subtitle="An interactive 3D developer core powering my digital engineering ecosystem."
        />

        <ScrollReveal>
          <div
            className="techstack-scene"
            ref={containerRef}
            onMouseMove={handleMouseMove}
          >
            {/* Ambient Radial Cyber Glow */}
            <div className="techstack-ambient-glow" />

            {/* Central 3D Developer Core */}
            <div className="techstack-center">
              <Suspense
                fallback={
                  <div className="techstack-fallback-core">
                    <div className="fallback-pulse-ring" />
                    <div className="fallback-pulse-center" />
                  </div>
                }
              >
                <TechCoreScene mouse={mouse} />
              </Suspense>
              <div className="techstack-core-badge">
                <span className="core-badge-dot" />
                <span>DEV CORE // 3D</span>
              </div>
            </div>

            {/* Floating Orbiting Tech Icons */}
            <div className="techstack-orbit-container">
              {techStackItems.map((item, i) => {
                const Icon = getIcon(item.icon);
                const pos = orbitPositions[i] || { x: 0, y: 0 };
                const isHovered = activeItem === item.name;

                return (
                  <div
                    key={item.name}
                    className={`techstack-orbit-item ${isHovered ? 'active' : ''}`}
                    style={{
                      transform: `translate(${pos.x}px, ${pos.y}px)`,
                      animationDelay: `${i * 0.15}s`,
                    }}
                    onMouseEnter={() => setActiveItem(item.name)}
                    onMouseLeave={() => setActiveItem(null)}
                  >
                    <div
                      className="techstack-orbit-icon"
                      style={{
                        borderColor: isHovered ? item.color : undefined,
                        boxShadow: isHovered
                          ? `0 0 20px ${item.color}60`
                          : undefined,
                      }}
                    >
                      <Icon style={{ color: isHovered ? item.color : undefined }} />
                    </div>
                    <span className="techstack-orbit-label">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
