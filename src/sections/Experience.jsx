import { experience } from '../data/experience';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import { getIcon } from '../utils/icons';
import '../styles/Experience.css';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionTitle
          title="Experience & Milestones"
          subtitle="My journey learning technologies, building web applications, and shipping real digital products."
        />

        <div className="experience-timeline">
          {/* Animated Glowing Connection Line */}
          <div className="timeline-glowing-line" />

          {experience.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <ScrollReveal key={i} delay={Math.min(i + 1, 4)}>
                <div className={`timeline-item ${i % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}>
                  {/* Glowing Node on Line */}
                  <div className="timeline-node">
                    <span className="timeline-node-pulse" />
                    <span className="timeline-node-core">
                      <Icon />
                    </span>
                  </div>

                  {/* Glass Card Content */}
                  <div className="timeline-card glass-panel">
                    <div className="timeline-card-header">
                      <span className="timeline-year-tag">{item.year}</span>
                      {item.badge && (
                        <span className="timeline-status-badge">{item.badge}</span>
                      )}
                    </div>

                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-description">{item.description}</p>

                    {item.tech && (
                      <div className="timeline-tech-tags">
                        {item.tech.map((t) => (
                          <span key={t} className="timeline-tech-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
