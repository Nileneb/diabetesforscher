import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function PrivacyPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        padding: '4rem',
        maxWidth: '800px',
        margin: '0 auto',
        color: 'white'
      }}
    >
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginBottom: '2rem',
          color: '#EA906C',
          textDecoration: 'none',
          fontSize: '1.6rem'
        }}
      >
        ← Back to Experience
      </Link>

      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Privacy Policy</h1>
      
      <div style={{ fontSize: '1.6rem', lineHeight: 1.6 }}>
        {/* Add your privacy policy content here */}
        <h2>Data Protection</h2>
        <p>We take the protection of your personal data very seriously...</p>
        
        <h2 style={{ marginTop: '2rem' }}>Data Collection</h2>
        <p>We collect the following data...</p>
      </div>
    </motion.div>
  )
}