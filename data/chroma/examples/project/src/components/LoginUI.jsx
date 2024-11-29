import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export function LoginUI({ show }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  if (!show) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login({ username, password })
      navigate('/private')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(46, 67, 116, 0.95)',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 0 20px rgba(234, 144, 108, 0.5)',
      color: 'white',
      border: '2px solid #EA906C',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#EA906C' }}>
        Access Portal
      </h2>
      {error && (
        <div style={{ color: '#ff6b6b', marginBottom: '1rem', textAlign: 'center' }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Username (demo)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          style={{
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #EA906C',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white'
          }}
        />
        <input
          type="password"
          placeholder="Password (demo)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          style={{
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #EA906C',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            backgroundColor: '#EA906C',
            color: 'white',
            cursor: loading ? 'wait' : 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.2s',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Accessing...' : 'Enter Portal'}
        </button>
      </form>
    </div>
  )
}