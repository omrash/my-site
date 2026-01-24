'use client'

import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('Your Name')
  const [title, setTitle] = useState('Software Engineer')
  const [bio, setBio] = useState('Building things, one commit at a time.')
  const [skills, setSkills] = useState(['JavaScript', 'TypeScript', 'React', 'Node.js'])
  const [projects, setProjects] = useState([
    {
      title: 'Project 1',
      description: 'A cool project I built',
      link: '#'
    },
    {
      title: 'Project 2',
      description: 'Another awesome project',
      link: '#'
    }
  ])

  return (
    <div className="home-container">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="avatar">
            {name.charAt(0)}
          </div>
          
          <h1 className="title">
            {name}
          </h1>
          
          <p className="subtitle">
            {title}
          </p>
          
          <p className="bio">
            {bio}
          </p>
          
          <div className="skills">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="skill-tag"
              >
                {skill}
              </span>
            ))}
          </div>
          
          <h2 className="section-title">
            Projects
          </h2>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card"
              >
                <h3 className="project-title">
                  {project.title}
                </h3>
                <p className="project-description">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  className="project-link"
                >
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
