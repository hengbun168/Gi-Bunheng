import { personalInfo } from '../data/personalInfo';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { getIcon } from '../utils/icons';
import '../styles/About.css';

export default function About() {
  const { about } = personalInfo;

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle title="About Me" subtitle={about.subtitle} />

        <ScrollReveal>
          <p className="about-description">{about.description}</p>
        </ScrollReveal>

        <div className="about-grid">
          {about.cards.map((card, i) => {
            const Icon = getIcon(card.icon);
            return (
              <ScrollReveal key={card.title} delay={i + 1}>
                <div className="about-card">
                  <div className="about-card-icon">
                    <Icon />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="stats-grid">
          {about.stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i + 1}>
              <div className="stat-item">
                <div className="stat-value">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
