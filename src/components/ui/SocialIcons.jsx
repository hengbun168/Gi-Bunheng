import { FaGithub, FaLinkedinIn, FaTelegramPlane, FaYoutube, FaEnvelope } from 'react-icons/fa';

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  telegram: FaTelegramPlane,
  youtube: FaYoutube,
  email: FaEnvelope,
};

export default function SocialIcons({ links, className = '', linkClassName = '' }) {
  return (
    <div className={className}>
      {links.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            aria-label={link.name}
            title={link.name}
          >
            {Icon && <Icon />}
          </a>
        );
      })}
    </div>
  );
}
