import { useState } from 'react';
import { projects } from '../data/projects';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import { FaExternalLinkAlt, FaGithub, FaEye, FaTimes, FaCheckCircle } from 'react-icons/fa';
import '../styles/Projects.css';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionTitle
          title="Featured Projects"
          subtitle="Real-world products, applications, and engineering projects I have built and deployed."
        />

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={Math.min(i + 1, 4)}>
              <div className="project-card">
                <div className="project-image-container">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="project-image-placeholder">
                      <FaEye />
                    </div>
                  )}
                  <div className="project-image-overlay">
                    <button
                      type="button"
                      className="project-overlay-btn"
                      onClick={() => openProjectModal(project)}
                      aria-label={`Quick view ${project.title}`}
                    >
                      <FaEye /> Quick View
                    </button>
                  </div>
                  <span className="project-badge-number">{project.number}</span>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 3 Required Action Buttons: View Project, GitHub, Live Demo */}
                  <div className="project-actions">
                    <button
                      type="button"
                      className="project-btn project-btn-view"
                      onClick={() => openProjectModal(project)}
                    >
                      <FaEye size={12} />
                      View Project
                    </button>

                    <a
                      href={project.liveUrl}
                      className="project-btn project-btn-primary"
                      target={project.liveUrl.startsWith('#') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt size={11} />
                      Live Demo
                    </a>

                    <a
                      href={project.githubUrl}
                      className="project-btn project-btn-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <FaGithub size={13} />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="project-modal-backdrop" onClick={closeProjectModal}>
            <div
              className="project-modal-card glass-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="project-modal-close"
                onClick={closeProjectModal}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>

              <div className="project-modal-image-wrap">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="project-modal-img"
                />
              </div>

              <div className="project-modal-body">
                <div className="project-modal-header">
                  <span className="project-modal-num">{selectedProject.number}</span>
                  <h3 className="project-modal-title">{selectedProject.title}</h3>
                </div>

                <p className="project-modal-desc">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                {selectedProject.highlights && (
                  <div className="project-modal-highlights">
                    <h4>Key Highlights:</h4>
                    <ul>
                      {selectedProject.highlights.map((h, idx) => (
                        <li key={idx}>
                          <FaCheckCircle className="highlight-icon" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="project-modal-tags">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-modal-footer-actions">
                  <a
                    href={selectedProject.liveUrl}
                    className="btn btn-primary"
                    target={selectedProject.liveUrl.startsWith('#') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (selectedProject.liveUrl.startsWith('#')) closeProjectModal();
                    }}
                  >
                    <FaExternalLinkAlt size={13} />
                    Open Live Demo
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    className="btn btn-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={15} />
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
