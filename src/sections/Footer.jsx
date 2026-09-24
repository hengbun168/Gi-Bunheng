import { personalInfo } from '../data/personalInfo';
import SocialIcons from '../components/ui/SocialIcons';
import { FaEnvelope, FaHeart } from 'react-icons/fa';
import '../styles/Footer.css';

export default function Footer() {
  const { socialLinks, footer, contact } = personalInfo;

  const footerNavLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <a
              href="#home"
              className="footer-logo"
              onClick={(e) => handleNavClick(e, '#home')}
            >
              {personalInfo.logo}
            </a>
            <p className="footer-tagline">{footer.tagline}</p>
            <div className="footer-socials-wrap">
              <SocialIcons
                links={socialLinks}
                className="footer-socials"
                linkClassName="footer-social-link"
              />
              <a
                href={contact.emailUrl}
                className="footer-email-link"
                title="Send Email"
              >
                <FaEnvelope />
                <span>{contact.email}</span>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-links-title">Navigation</h4>
            <div className="footer-links">
              {footerNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="footer-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-links-title">Connect</h4>
            <div className="footer-links">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name} <span className="footer-handle">({link.username})</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">{footer.copyright}</p>
          <p className="footer-crafted">
            Engineered with <span className="footer-heart"><FaHeart size={11} /></span> in Cambodia // GB.DEV
          </p>
        </div>
      </div>
    </footer>
  );
}
