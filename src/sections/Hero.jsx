import { useRef, useState } from 'react';
import { personalInfo } from '../data/personalInfo';
import Button from '../components/ui/Button';
import SocialIcons from '../components/ui/SocialIcons';
import ScrollReveal from '../components/ui/ScrollReveal';
import { FaCode, FaRocket, FaBrain, FaEnvelope } from 'react-icons/fa';
import '../styles/Hero.css';

export default function Hero() {
  const { hero, socialLinks, contact } = personalInfo;
  const frameRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-inner">
          {/* Left Column: Hero Information */}
          <div className="hero-content">
            <ScrollReveal>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                <span className="hero-badge-text">{hero.badge}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <h1 className="hero-title">
                {hero.greeting}
                <br />
                <span className="hero-highlight">{hero.title}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <p className="hero-description">{hero.description}</p>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <div className="hero-buttons">
                <Button href="#projects" className="hero-btn-primary">
                  View My Projects
                </Button>
                <Button variant="secondary" href="#contact" className="hero-btn-secondary">
                  Contact Me
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={4}>
              <div className="hero-socials-wrapper">
                <SocialIcons
                  links={socialLinks}
                  className="hero-socials"
                  linkClassName="hero-social-link"
                />
                <a
                  href={contact.emailUrl}
                  className="hero-email-badge"
                  title="Send Direct Email"
                >
                  <FaEnvelope className="hero-email-icon" />
                  <span>{contact.email}</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Premium Profile Photo Presentation */}
          <div className="hero-visual">
            <div
              ref={frameRef}
              className="profile-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              }}
            >
              {/* Outer Ambient Glow Aura */}
              <div className="profile-glow-aura" />

              {/* Rotating Anime Astrolabe / Celestial Navigation Compass Ring */}
              <div className="profile-astrolabe-ring">
                <span className="astrolabe-tick tick-n">N // 00°</span>
                <span className="astrolabe-tick tick-e">E // 90°</span>
                <span className="astrolabe-tick tick-s">S // 180°</span>
                <span className="astrolabe-tick tick-w">W // 270°</span>
              </div>

              {/* Animated Rotating Conic Gradient Energy Border */}
              <div className="profile-conic-ring" />

              {/* Floating Energy Sparks */}
              <div className="profile-sparks">
                <span className="spark spark-1" />
                <span className="spark spark-2" />
                <span className="spark spark-3" />
                <span className="spark spark-4" />
              </div>

              {/* Glass Frame Shell */}
              <div className="profile-frame">
                <div className="profile-hud-header">
                  <div className="profile-hud-dots">
                    <span className="hud-dot red" />
                    <span className="hud-dot yellow" />
                    <span className="hud-dot green" />
                  </div>
                  <span className="profile-hud-label">GB.DEV // PIRATE.VOYAGE</span>
                </div>

                <div className="profile-image-wrapper">
                  <img
                    src={personalInfo.profileImage}
                    alt="Gi Bunheng — Full-Stack Developer"
                    className="profile-image"
                    loading="eager"
                  />
                  <div className="profile-image-overlay" />
                  <div className="profile-energy-scanline" />
                </div>

                <div className="profile-hud-footer">
                  <div className="profile-hud-indicator">
                    <span className="status-live-dot" />
                    <span>CAPTAIN // ONLINE</span>
                  </div>
                  <span className="profile-hud-id">EXPEDITION-2026</span>
                </div>
              </div>

              {/* Floating UI Elements Around Profile */}
              <div className="floating-badge badge-role">
                <span className="floating-badge-icon role-icon">
                  <FaCode />
                </span>
                <div className="floating-badge-content">
                  <span className="floating-badge-title">Full-Stack Developer</span>
                  <span className="floating-badge-sub">Frontend & Backend</span>
                </div>
              </div>

              <div className="floating-badge badge-projects">
                <span className="floating-badge-icon projects-icon">
                  <FaRocket />
                </span>
                <div className="floating-badge-content">
                  <span className="floating-badge-title">Building Projects</span>
                  <span className="floating-badge-sub">Real Products</span>
                </div>
              </div>

              <div className="floating-badge badge-learning">
                <span className="floating-badge-icon learning-icon">
                  <FaBrain />
                </span>
                <div className="floating-badge-content">
                  <span className="floating-badge-title">Learning & Growing</span>
                  <span className="floating-badge-sub">Modern Tech</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
