import { Fragment } from 'react';
import { processSteps } from '../data/process';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import '../styles/Process.css';

export default function Process() {
  return (
    <section className="section process-section">
      <div className="container">
        <SectionTitle
          title="How I Build"
          subtitle="A systematic, agile engineering lifecycle from initial concept to live digital product."
        />

        <ScrollReveal>
          <div className="process-steps">
            {processSteps.map((step, i) => (
              <Fragment key={step.number}>
                <div className="process-step">
                  <div className="process-number-wrap">
                    <div className="process-number-pulse" />
                    <div className="process-number">{step.number}</div>
                  </div>
                  <h4 className="process-title">{step.title}</h4>
                  <p className="process-desc">{step.description}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="process-connector">
                    <span className="connector-glow-dot" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
