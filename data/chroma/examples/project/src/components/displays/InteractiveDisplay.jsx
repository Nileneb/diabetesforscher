import React from 'react'
import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export function InteractiveDisplay({ 
  position, 
  rotation, 
  isNearby,
  isInteracting,
  onInteractionChange,
  children 
}) {
  const { camera } = useThree()

  // Fixed viewing positions for each display
  const viewPositions = {
    '90': { // Left display
      camera: [-7.5, 2, -8], // 2.5 units away from display, same Z
      lookAt: [-10, 2, -8]   // Display position
    },
    '-90': {  // Right display
      camera: [-12.5, 2, 8], // 2.5 units away from display, same Z
      lookAt: [-10, 2, 8]    // Display position
    }
  }

  useEffect(() => {
    if (isInteracting) {
      // Exit pointer lock to free the mouse
      if (document.pointerLockElement) {
        document.exitPointerLock()
      }

      // Show cursor and enable pointer events
      document.body.style.cursor = 'auto'
      document.body.style.pointerEvents = 'auto'

      // Get the correct viewing position based on rotation
      const view = viewPositions[rotation.toString()]
      if (view) {
        // Set camera position and lookAt
        camera.position.set(...view.camera)
        camera.lookAt(...view.lookAt)
      }

      return () => {
        // Re-enable pointer lock when exiting display mode
        document.body.requestPointerLock()
        document.body.style.cursor = 'none'
        document.body.style.pointerEvents = 'none'
      }
    }
  }, [isInteracting, camera, position, rotation])

  return (
    <group position={position} rotation={[0, (rotation * Math.PI) / 180, 0]}>
      {/* Display frame */}
      <mesh>
        <boxGeometry args={[4, 3, 0.2]} />
        <meshStandardMaterial color="#2E4374" />
      </mesh>
      
      {/* Display screen */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[3.8, 2.8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Content */}
      {isInteracting && (
        <Html
          transform
          position={[0, 0, 0.12]}
          style={{
            width: '1520px',
            height: '1120px',
            transform: 'translate(-50%, -50%)',
            cursor: 'auto',
            pointerEvents: 'auto'
          }}
          distanceFactor={0.25}
        >
          <div style={{
            width: '100%',
            height: '100%',
            background: rotation === -90 ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.98)',
            padding: '2rem',
            borderRadius: '124px',
            position: 'relative',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            cursor: 'auto'
          }}>
            <button
              onClick={() => onInteractionChange(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#EA906C',
                border: 'none',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                zIndex: 1000,
                fontSize: '1.8rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.target.style.background = '#e67f58'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.target.style.background = '#EA906C'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              <span>Exit</span>
              <span style={{ opacity: 0.8, fontSize: '1.4rem' }}>(Esc)</span>
            </button>
            <div style={{ 
              height: '100%',
              overflow: 'auto',
              paddingTop: '1rem'
            }}>
              {children}
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}