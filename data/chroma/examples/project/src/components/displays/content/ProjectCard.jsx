import React from 'react'
import { motion } from 'framer-motion'

export function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{
        background: 'rgba(46, 67, 116, 0.05)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        border: '2px solid rgba(46, 67, 116, 0.1)',
        cursor: 'pointer'
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}
    >
      <h3 style={{ 
        fontSize: '2.6rem',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <span style={{ fontSize: '3rem' }}>{project.icon}</span>
        {project.title}
      </h3>
      <p style={{ 
        fontSize: '2rem',
        lineHeight: '1.5',
        opacity: 0.9
      }}>
        {project.description}
      </p>
      {project.technologies && (
        <div style={{ 
          marginTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.8rem'
        }}>
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              style={{
                background: 'rgba(234, 144, 108, 0.1)',
                color: '#EA906C',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '1.6rem'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}