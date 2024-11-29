import React from 'react'
import { motion } from 'framer-motion'
import { DataVisualizer } from './content/DataVisualizer'

export function WebGLContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ 
        color: 'white', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem'
      }}
    >
      <DataVisualizer />
    </motion.div>
  )
}