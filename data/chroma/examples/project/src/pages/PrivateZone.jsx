import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Player } from '../components/Player'
import { Ground } from '../components/Ground'
import { Gate } from '../components/Gate'
import { Boundaries } from '../components/Boundaries'
import { LogoutButton } from '../components/LogoutButton'
import { WebGLDisplay, HTMLDisplay } from '../components/DisplayScreens'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export function PrivateZone() {
  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas camera={{ position: [0, 3, 6], fov: 75 }}>
          <color attach="background" args={['#213363']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <pointLight position={[-10, 10, -10]} intensity={0.5} />
          <EffectComposer>
            <Bloom luminanceThreshold={1} intensity={2} levels={9} mipmapBlur />
          </EffectComposer>
          <Physics debug>
            <Ground color="#4B527E" />
            <Player startPosition={[0, 0.5, 0]} />
            <Boundaries />
            <Gate />
            <WebGLDisplay />
            <HTMLDisplay />
          </Physics>
        </Canvas>
      </div>
      <LogoutButton />
    </>
  )
}