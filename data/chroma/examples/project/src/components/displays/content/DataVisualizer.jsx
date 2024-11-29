import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
]

export function DataVisualizer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: '#1a1a1a',
        borderRadius: '16px',
        padding: '2rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <h2 style={{ 
        color: 'white',
        fontSize: '3rem',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        Interactive Data Visualization
      </h2>
      
      <div style={{ flex: 1, minHeight: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip 
              contentStyle={{ 
                background: '#2E4374',
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#EA906C" 
              strokeWidth={3}
              dot={{ fill: '#EA906C', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{
        marginTop: '2rem',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center'
      }}>
        <button
          style={{
            background: '#EA906C',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            color: 'white',
            fontSize: '1.8rem',
            cursor: 'pointer'
          }}
        >
          Update Data
        </button>
        <button
          style={{
            background: '#2E4374',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            color: 'white',
            fontSize: '1.8rem',
            cursor: 'pointer'
          }}
        >
          Export Chart
        </button>
      </div>
    </motion.div>
  )
}