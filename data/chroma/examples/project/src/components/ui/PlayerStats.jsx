import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function PlayerStats() {
  const [playerState, setPlayerState] = useState({
    position: [0, 0, 0],
    health: 100,
    speed: 5
  })

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
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        background: 'rgba(46, 67, 116, 0.8)',
        backdropFilter: 'blur(8px)',
        padding: '1rem 2rem',
        borderRadius: '12px',
        color: 'white',
        border: '2px solid rgba(234, 144, 108, 0.3)',
        minWidth: '300px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ opacity: 0.8 }}>Position:</span>
        <span>
          X: {playerState.position[0].toFixed(1)} Y: {playerState.position[1].toFixed(1)} Z: {playerState.position[2].toFixed(1)}
        </span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ opacity: 0.8 }}>Health:</span>
        <motion.div
          style={{
            flex: 1,
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