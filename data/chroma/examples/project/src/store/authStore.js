import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: (credentials) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username === 'demo' && credentials.password === 'demo') {
          set({ isAuthenticated: true, user: { username: credentials.username } })
          resolve({ success: true })
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  },
  logout: () => {
    set({ isAuthenticated: false, user: null })
  }
}))