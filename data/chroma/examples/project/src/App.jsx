import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { PublicZone } from './pages/PublicZone'
import { PrivateZone } from './pages/PrivateZone'
import { ImprintPage } from './pages/legal/ImprintPage'
import { PrivacyPage } from './pages/legal/PrivacyPage'
import { LinkTree } from './components/navigation/LinkTree'
import { useAuthStore } from './store/authStore'

function PrivateRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/" />
}

export default function App() {
  return (
    <Router>
      <LinkTree />
      <Routes>
        <Route path="/" element={<PublicZone />} />
        <Route path="/imprint" element={<ImprintPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route
          path="/private"
          element={
            <PrivateRoute>
              <PrivateZone />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}