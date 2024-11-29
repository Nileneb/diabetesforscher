import React from 'react'
import { motion } from 'framer-motion'
import { ProjectCard } from './content/ProjectCard'

export function PortfolioContent() {
  const projects = [
    {
      title: 'Interactive 3D Web Experience',
      description: 'A fully immersive 3D web application built with React Three Fiber and Rapier physics',
      icon: '🌐',
      technologies: ['React', 'Three.js', 'WebGL', 'Rapier']
    },
    {
      title: 'Real-time Data Visualization',
      description: 'Dynamic data visualization platform with real-time updates and interactive charts',
      icon: '📊',
      technologies: ['D3.js', 'WebSocket', 'React', 'Node.js']
    },
    {
      title: 'Virtual Reality Game',
      description: 'Immersive VR experience developed using Unity and WebXR',
      icon: '🎮',
      technologies: ['Unity', 'WebXR', 'C#', 'Blender']
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ 
        color: '#213363',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem'
      }}
    >
      <motion.h2
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        style={{ 
          fontSize: '3.6rem',
          fontWeight: 'bold',
          marginBottom: '3rem',
          color: '#2E4374',
          textAlign: 'center'
        }}
      >
        Interactive Portfolio
      </motion.h2>
      
      <div style={{ 
        flex: 1,
        overflowY: 'auto',
        marginBottom: '2rem'
      }}>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          background: '#EA906C',
          border: 'none',
          padding: '2rem',
          borderRadius: '16px',
          color: 'white',
          cursor: 'pointer',
          width: '100%',
          fontSize: '2.2rem',
          fontWeight: 'bold',
          transition: 'all 0.2s',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        Contact Me
      </motion.button>
    </motion.div>
  )
}