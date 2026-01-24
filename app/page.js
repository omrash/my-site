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
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r flex items-center justify-center text-white text-4xl font-bold">
              {name.charAt(0)}
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            {name}
          </h1>
          
          <p className="text-xl text-purple-300 mb-2">
            {title}
          </p>
          
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            {bio}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-12">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-6">
            Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-left hover:bg-white/15 transition-all"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  className="text-purple-300 hover:text-purple-200"
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
