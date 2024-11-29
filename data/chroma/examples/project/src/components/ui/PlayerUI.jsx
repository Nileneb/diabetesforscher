import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function PlayerUI() {
  const [playerState, setPlayerState] = useState({ position: [0, 0, 0], health: 100 })

  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (window.playerState) {
        setPlayerState(window.playerState)
      }
    }, 1000 / 60)

    return () => clearInterval(updateInterval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '1rem',
        background: 'rgba(46, 67, 116, 0.8)',
        borderRadius: '12px',
        color: 'white',
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        backdropFilter: 'blur(8px)',
        border: '2px solid rgba(234, 144, 108, 0.3)',
        zIndex: 1000
      }}
    >
      <div>
        <div style={{ fontSize: '1.4rem', opacity: 0.8 }}>Position</div>
        <div style={{ fontSize: '1.2rem' }}>
          X: {playerState.position[0].toFixed(2)} Y: {playerState.position[1].toFixed(2)} Z: {playerState.position[2].toFixed(2)}
        </div>
      </div>
      <div>
        <div style={{ fontSize: '1.4rem', opacity: 0.8 }}>Health</div>
        <motion.div
          style={{
            width: '100px',
            height: '8px',
            background: '#2E4374',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${playerState.health}%` }}
            style={{
              height: '100%',
              background: '#EA906C',
              borderRadius: '4px'
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}