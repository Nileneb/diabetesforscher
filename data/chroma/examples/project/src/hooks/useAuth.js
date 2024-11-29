import { create } from 'zustand'
import { authService } from '../services/auth'

export const useAuth = create((set) => ({
  user: null,
  loading: true,
  error: null,

  initialize: async () => {
    try {
      const user = await authService.getCurrentUser()
      set({ user, loading: false })
    } catch (error) {
      set({ error, loading: false })
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null })
      const { user } = await authService.login(email, password)
      set({ user, loading: false })
    } catch (error) {
      set({ error, loading: false })
      throw error
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null })
      await authService.logout()
      set({ user: null, loading: false })
    } catch (error) {
      set({ error, loading: false })
      throw error
    }
  }
}))