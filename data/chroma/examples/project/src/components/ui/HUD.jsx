import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayerStats } from './PlayerStats'

export function HUD() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          zIndex: 1000
        }}
      >
        <PlayerStats />
      </motion.div>
    </AnimatePresence>
  )
}