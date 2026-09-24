import { services } from '../data/services';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import { getIcon } from '../utils/icons';
import '../styles/Services.css';

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionTitle
          title="What I Can Build"
          subtitle="Specialized capabilities and end-to-end development services for modern digital solutions."
        />

        <div className="services-grid">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <ScrollReveal key={service.title} delay={Math.min(i + 1, 5)}>
                <div className="service-card glass-panel">
                  {service.tag && (
                    <span className="service-tag">{service.tag}</span>
                  )}
                  <div className="service-icon">
                    <Icon />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
