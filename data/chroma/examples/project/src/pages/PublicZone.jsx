import React, { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Player } from '../components/Player'
import { Ground } from '../components/Ground'
import { Gate } from '../components/Gate'
import { LoginUI } from '../components/LoginUI'
import { Boundaries } from '../components/Boundaries'
import { WebGLDisplay, HTMLDisplay } from '../components/DisplayScreens'
import { DebugControls } from '../components/DebugControls'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { HUD } from '../components/ui/HUD'
import { useAuthStore } from '../store/authStore'

export function PublicZone() {
  const [showLogin, setShowLogin] = useState(false)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const [debugValues, setDebugValues] = useState({
    playerSpeed: 3,
    mouseSensitivity: 0.002,
    cameraHeight: 2,
    cameraDistance: 6,
    cameraTilt: 30
  })

  const handleDebugValues = useCallback((values) => {
    setDebugValues(values)
  }, [])

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas camera={{ position: [0, debugValues.cameraHeight, debugValues.cameraDistance], fov: 75 }}>
          <color attach="background" args={['#213363']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <pointLight position={[-10, 10, -10]} intensity={0.5} />
          <EffectComposer>
            <Bloom luminanceThreshold={1} intensity={2} levels={9} mipmapBlur />
          </EffectComposer>
          <Physics debug>
            <Ground color="#2E4374" />
            <Gate isAuthenticated={isAuthenticated} />
            <Player 
              onNearGate={() => setShowLogin(true)} 
              onLeaveGate={() => setShowLogin(false)}
              speed={debugValues.playerSpeed}
              mouseSensitivity={debugValues.mouseSensitivity}
              cameraHeight={debugValues.cameraHeight}
              cameraDistance={debugValues.cameraDistance}
              cameraTilt={debugValues.cameraTilt}
            />
            <Boundaries />
            <WebGLDisplay />
            <HTMLDisplay />
          </Physics>
        </Canvas>
        <HUD />
      </div>
      <LoginUI show={showLogin} />
      <DebugControls onValuesChange={handleDebugValues} />
    </>
  )
}