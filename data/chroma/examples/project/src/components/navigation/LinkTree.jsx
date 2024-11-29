import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function LinkTree() {
  const links = [
    { to: '/imprint', label: 'Imprint' },
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Service' },
    { to: '/contact', label: 'Contact' }
  ]

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        gap: '2rem',
        background: 'rgba(46, 67, 116, 0.8)',
        backdropFilter: 'blur(8px)',
        padding: '0.5rem 2rem',
        borderRadius: '8px',
        border: '2px solid rgba(234, 144, 108, 0.3)'
      }}
    >
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.4rem',
            padding: '0.5rem',
            transition: 'color 0.2s'
          }}
          onMouseEnter={e => e.target.style.color = '#EA906C'}
          onMouseLeave={e => e.target.style.color = 'white'}
        >
          {label}
        </Link>
      ))}
    </motion.nav>
  )
}