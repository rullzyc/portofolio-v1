import { useScrollReveal } from '../hooks/useScrollReveal'

const frontend = [
  { icon: '🌐', name: 'HTML / CSS', level: 50 },
  { icon: '⚡', name: 'JavaScript', level: 5 },
  { icon: '⚛️', name: 'React.js', level: 5 },
  // { icon: '💚', name: 'Vue.js', level: 75 },
]
const backend = [
  // { icon: '🟢', name: 'Node.js', level: 85 },
  { icon: '🐍', name: 'Python', level: 10 },
  { icon: '🐘', name: 'PHP / Laravel', level: 50 },
  { icon: '🗄️', name: 'MySQL / MongoDB', level: 40 },
]
const tools = ['Git','Docker','Figma','VS Code','AWS','REST API','Bootstrap','Firebase']

const SkillItem = ({ icon, name, level }) => (
  <div className="skill-item">
    <div className="skill-icon">{icon}</div>
    <div className="skill-info">
      <span className="skill-name">{name}</span>
      <div className="skill-bar">
        <div className="skill-fill" style={{ width: `${level}%` }} />
      </div>
    </div>
  </div>
)

export default function Skills() {
  const ref = useScrollReveal(130)

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">

        <div className="section-header">
          <span className="section-tag" data-reveal="up" data-delay="0">// tech stack</span>
          <h2 className="section-title" data-reveal="up" data-delay="80">
            Keahlian <span className="gradient-text">Teknologi</span>
          </h2>
        </div>

        <div className="skills-grid">
          <div className="skill-category" data-reveal="up" data-delay="0">
            <h3 className="skill-cat-title">Frontend</h3>
            <div className="skill-items">{frontend.map(s => <SkillItem key={s.name} {...s} />)}</div>
          </div>
          <div className="skill-category" data-reveal="up" data-delay="130">
            <h3 className="skill-cat-title">Backend</h3>
            <div className="skill-items">{backend.map(s => <SkillItem key={s.name} {...s} />)}</div>
          </div>
          <div className="skill-category" data-reveal="up" data-delay="260">
            <h3 className="skill-cat-title">Tools & Others</h3>
            <div className="skill-tools">{tools.map(t => <span key={t} className="tool-tag">{t}</span>)}</div>
          </div>
        </div>

      </div>
    </section>
  )
}
