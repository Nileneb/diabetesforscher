import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export function LogoutButton() {
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#EA906C',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        zIndex: 1000
      }}
    >
      Exit Portal
    </button>
  )
}