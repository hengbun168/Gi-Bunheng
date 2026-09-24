import ScrollReveal from './ScrollReveal';

export default function SectionTitle({ title, subtitle, align = 'center' }) {
  return (
    <ScrollReveal>
      <div
        style={{
          textAlign: align,
          marginBottom: 'var(--space-2xl)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: align === 'center' ? 'center' : 'flex-start',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-family-mono)',
            fontSize: '0.72rem',
            color: 'var(--accent-green)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '10px',
            background: 'rgba(0, 255, 136, 0.08)',
            border: '1px solid rgba(0, 255, 136, 0.2)',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--accent-green)',
              boxShadow: '0 0 6px var(--accent-green)',
            }}
          />
          <span>GB.DEV // ARCHITECTURE</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-family-display)',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 'var(--font-weight-extrabold)',
            color: 'var(--text-white)',
            marginBottom: '12px',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
              margin: align === 'center' ? '0 auto' : '0',
              lineHeight: '1.6',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
