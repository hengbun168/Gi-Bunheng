import { skillCategories } from '../data/skills';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import { getIcon } from '../utils/icons';
import '../styles/Skills.css';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionTitle
          title="Technologies & Skills"
          subtitle="Modern tools and languages I use to bring digital products to life."
        />

        <div className="skills-grid">
          {skillCategories.map((category, i) => {
            const CategoryIcon = getIcon(category.icon);
            return (
              <ScrollReveal key={category.title} delay={Math.min(i + 1, 5)}>
                <div className="skill-category">
                  <div className="skill-category-header">
                    <div className="skill-category-icon">
                      <CategoryIcon />
                    </div>
                    <h3 className="skill-category-title">{category.title}</h3>
                  </div>
                  <div className="skill-list">
                    {category.skills.map((skill) => {
                      const SkillIcon = getIcon(skill.icon);
                      return (
                        <div key={skill.name} className="skill-chip">
                          <span className="skill-chip-icon">
                            <SkillIcon />
                          </span>
                          <span className="skill-chip-text">{skill.name}</span>
                        </div>
                      );
                    })}
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
