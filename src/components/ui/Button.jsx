import './Button.css';

export default function Button({ children, variant = 'primary', href, onClick, size = 'md' }) {
  const className = `btn btn-${variant} btn-${size}`;

  if (href) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  );
}
