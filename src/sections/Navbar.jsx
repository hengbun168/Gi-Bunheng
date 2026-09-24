import { useState, useEffect } from 'react';
import { personalInfo } from '../data/personalInfo';
import { FaPaperPlane } from 'react-icons/fa';
import '../styles/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    const observerOptions = {
      rootMargin: '-25% 0px -65% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    personalInfo.navLinks.forEach((link) => {
      const id = link.href.replace('#', '');
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a
          href="#home"
          className="navbar-logo"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          <span className="navbar-logo-symbol">&lt;</span>
          {personalInfo.logo}
          <span className="navbar-logo-symbol">/&gt;</span>
        </a>

        <div className="navbar-links">
          {personalInfo.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar-link ${
                activeSection === link.href.replace('#', '') ? 'active' : ''
              }`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="navbar-actions">
          <a
            href="#contact"
            className="navbar-cta-btn"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <FaPaperPlane size={11} />
            <span>Let's Talk</span>
          </a>

          <div
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          {personalInfo.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`mobile-nav-link ${
                activeSection === link.href.replace('#', '') ? 'active' : ''
              }`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary mobile-cta-btn"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <FaPaperPlane size={12} />
            <span>Contact Me</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
