import { supabaseClient } from './supabase'

export const authService = {
  async login(email, password) {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  async register(email, password) {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password
      })
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  },

  async logout() {
    try {
      const { error } = await supabaseClient.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabaseClient.auth.getUser()
      if (error) throw error
      return user
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  }
}