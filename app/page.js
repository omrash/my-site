import './globals.css';

export default function Home() {
  return (
    <div className="container">
      <h1 className="title">Software Engineer</h1>
      <p className="subtitle">Building solutions with code and passion</p>

      <section className="section">
        <h2 className="section-title">About</h2>
        <div className="card">
          <p className="project-description">
            I'm a software engineer passionate about clean code, efficient algorithms, 
            and building scalable solutions. Currently focused on full-stack development 
            with modern web technologies.
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          <span className="skill-item">JavaScript</span>
          <span className="skill-item">TypeScript</span>
          <span className="skill-item">React</span>
          <span className="skill-item">Node.js</span>
          <span className="skill-item">Python</span>
          <span className="skill-item">Docker</span>
          <span className="skill-item">Git</span>
          <span className="skill-item">AWS</span>
          <span className="skill-item">PostgreSQL</span>
          <span className="skill-item">Redis</span>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Projects</h2>
        <div className="project-card">
          <h3 className="project-title">Web Application</h3>
          <p className="project-description">A full-stack web application with modern UI and backend services</p>
        </div>
        <div className="project-card">
          <h3 className="project-title">API Service</h3>
          <p className="project-description">RESTful API with authentication and database integration</p>
        </div>
        <div className="project-card">
          <h3 className="project-title">DevOps Pipeline</h3>
          <p className="project-description">Automated CI/CD pipeline with Docker and monitoring</p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Contact</h2>
        <a href="mailto:email@example.com" className="contact-link">
          Get in touch
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
          View on GitHub
        </a>
      </section>
    </div>
  )
}
