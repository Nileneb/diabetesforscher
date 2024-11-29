import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function ImprintPage() {
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

      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Imprint</h1>
      
      <div style={{ fontSize: '1.6rem', lineHeight: 1.6 }}>
        {/* Add your imprint content here */}
        <h2>Responsible for Content</h2>
        <p>[Your Name or Company]</p>
        <p>[Street Address]</p>
        <p>[City, Postal Code]</p>
        <p>[Country]</p>
        
        <h2 style={{ marginTop: '2rem' }}>Contact</h2>
        <p>Email: [email]</p>
        <p>Phone: [phone]</p>
      </div>
    </motion.div>
  )
}