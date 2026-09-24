import { useState } from 'react';
import { personalInfo } from '../data/personalInfo';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import { FaEnvelope, FaTelegramPlane, FaGithub, FaLinkedinIn, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import '../styles/Contact.css';

export default function Contact() {
  const { contact } = personalInfo;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const contactCards = [
    {
      label: 'Email',
      value: contact.email,
      icon: FaEnvelope,
      href: contact.emailUrl,
      sub: 'Direct Inquiry',
    },
    {
      label: 'Telegram',
      value: contact.telegram,
      icon: FaTelegramPlane,
      href: contact.telegramUrl,
      sub: 'Quick Response',
    },
    {
      label: 'GitHub',
      value: contact.github,
      icon: FaGithub,
      href: contact.githubUrl,
      sub: 'Open Source Code',
    },
    {
      label: 'LinkedIn',
      value: contact.linkedin,
      icon: FaLinkedinIn,
      href: contact.linkedinUrl,
      sub: 'Professional Network',
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <SectionTitle
          title={contact.title}
          subtitle={contact.description}
        />

        <div className="contact-content">
          {/* Left Column: Direct Contact Info Cards */}
          <div className="contact-info">
            <div className="contact-cards-grid">
              {contactCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <ScrollReveal key={card.label} delay={i + 1}>
                    <a
                      href={card.href}
                      target={card.href.startsWith('mailto:') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="contact-card glass-panel"
                    >
                      <div className="contact-card-icon">
                        <Icon />
                      </div>
                      <div className="contact-card-details">
                        <span className="contact-card-sub">{card.sub}</span>
                        <span className="contact-card-label">{card.label}</span>
                        <span className="contact-card-value">{card.value}</span>
                      </div>
                    </a>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Right Column: Frontend-Only Contact Form */}
          <div className="contact-form-column">
            <ScrollReveal delay={1}>
              <div className="contact-form-card glass-panel">
                <div className="form-header">
                  <div className="form-hud-dot" />
                  <span className="form-header-title">DIRECT MESSAGE CHANNEL</span>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      className="form-input"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      className="form-input"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      className="form-input"
                      type="text"
                      placeholder="Project inquiry / collaboration"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      placeholder="Tell me about your project, ideas, or timeline..."
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {submitted ? (
                    <div className="form-success glass-panel">
                      <FaCheckCircle className="form-success-icon" />
                      <div className="form-success-content">
                        <span className="form-success-text">
                          {contact.successMessage}
                        </span>
                        <span className="form-success-sub">
                          Client-side message registered. You can also reach me directly at {contact.email}.
                        </span>
                      </div>
                      <button
                        type="button"
                        className="form-reset-btn"
                        onClick={() => setSubmitted(false)}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <button type="submit" className="btn btn-primary contact-submit-btn">
                      <FaPaperPlane size={13} />
                      Send Message
                    </button>
                  )}
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
