import './CSSFallback.css';

export default function CSSFallback() {
  return (
    <div className="anime-pirate-fallback">
      {/* Twilight & Sunset Gradient Sky */}
      <div className="sky-gradient" />

      {/* Cyber Celestial Moon & Stars */}
      <div className="celestial-moon">
        <div className="moon-core" />
        <div className="moon-ring" />
      </div>

      {/* Anime Drifting Clouds */}
      <div className="clouds-layer clouds-far" />
      <div className="clouds-layer clouds-mid" />

      {/* Distant Mountainous Islands Silhouette */}
      <div className="distant-islands">
        <svg viewBox="0 0 1200 240" preserveAspectRatio="none" className="islands-svg">
          <path
            d="M0,240 L0,180 Q140,110 260,160 T520,130 Q680,180 840,110 T1200,170 L1200,240 Z"
            fill="#050e1c"
          />
          <path
            d="M120,240 L180,90 Q220,70 260,110 L310,240 Z"
            fill="#08162b"
            opacity="0.9"
          />
          <path
            d="M860,240 L930,120 Q970,95 1010,130 L1080,240 Z"
            fill="#061224"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Stylized Pirate Ship Silhouette with Glowing Cyan Lanterns */}
      <div className="ship-silhouette-container">
        <div className="ship-hull-silhouette">
          {/* Ship Mast & Sails Silhouette */}
          <div className="fallback-mast mast-main" />
          <div className="fallback-sail sail-main" />
          <div className="fallback-flag" />
          <div className="fallback-lantern lantern-stern" />
          <div className="fallback-lantern lantern-bow" />
        </div>
      </div>

      {/* Multi-layered Animated Ocean Waves */}
      <div className="ocean-waves-container">
        <div className="wave wave-back" />
        <div className="wave wave-mid" />
        <div className="wave wave-front" />
      </div>

      {/* Floating Bioluminescent Embers */}
      <div className="sea-embers">
        {Array.from({ length: 18 }, (_, i) => (
          <div
            key={i}
            className="ember-particle"
            style={{
              left: `${(i * 5.8) % 100}%`,
              animationDelay: `${(i * 0.4) % 4}s`,
              animationDuration: `${3.5 + (i % 3)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
