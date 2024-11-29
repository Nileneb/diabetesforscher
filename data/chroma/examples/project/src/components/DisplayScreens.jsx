import React, { useState, useEffect } from 'react'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { InteractiveDisplay } from './displays/InteractiveDisplay'
import { WebGLContent } from './displays/WebGLContent'
import { PortfolioContent } from './displays/PortfolioContent'

function InteractionZone({ position, onEnter, onLeave }) {
  return (
    <RigidBody type="fixed" position={position} sensor>
      <CuboidCollider 
        args={[2, 2, 2]} 
        sensor
        onIntersectionEnter={onEnter}
        onIntersectionExit={onLeave}
      >
        {/* Interaction trigger volume */}
      </CuboidCollider>
    </RigidBody>
  )
}

export function WebGLDisplay() {
  const [isInteracting, setIsInteracting] = useState(false)
  const [isNearby, setIsNearby] = useState(false)
  const { controls } = useThree()
  
  const position = [10, 2, -8]
  const rotation = -90
  const interactionPosition = [8, 2, -8]

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === 'e' && isNearby) {
        setIsInteracting(!isInteracting)
        if (controls) {
          controls.enabled = !isInteracting
        }
      }
      if (e.key === 'Escape' && isInteracting) {
        setIsInteracting(false)
        if (controls) {
          controls.enabled = true
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isNearby, isInteracting, controls])
  
  return (
    <>
      <InteractionZone
        position={interactionPosition}
        onEnter={() => setIsNearby(true)}
        onLeave={() => {
          setIsNearby(false)
          setIsInteracting(false)
          if (controls) {
            controls.enabled = true
          }
        }}
      />
      <InteractiveDisplay
        position={position}
        rotation={rotation}
        isNearby={isNearby}
        isInteracting={isInteracting}
        onInteractionChange={(value) => {
          setIsInteracting(value)
          if (controls) {
            controls.enabled = !value
          }
        }}
      >
        <WebGLContent />
      </InteractiveDisplay>
    </>
  )
}

export function HTMLDisplay() {
  const [isInteracting, setIsInteracting] = useState(false)
  const [isNearby, setIsNearby] = useState(false)
  const { controls } = useThree()
  
  const position = [-10, 2, 8]
  const rotation = 90
  const interactionPosition = [-8, 2, 8]

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === 'e' && isNearby) {
        setIsInteracting(!isInteracting)
        if (controls) {
          controls.enabled = !isInteracting
        }
      }
      if (e.key === 'Escape' && isInteracting) {
        setIsInteracting(false)
        if (controls) {
          controls.enabled = true
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isNearby, isInteracting, controls])
  
  return (
    <>
      <InteractionZone
        position={interactionPosition}
        onEnter={() => setIsNearby(true)}
        onLeave={() => {
          setIsNearby(false)
          setIsInteracting(false)
          if (controls) {
            controls.enabled = true
          }
        }}
      />
      <InteractiveDisplay
        position={position}
        rotation={rotation}
        isNearby={isNearby}
        isInteracting={isInteracting}
        onInteractionChange={(value) => {
          setIsInteracting(value)
          if (controls) {
            controls.enabled = !value
          }
        }}
      >
        <PortfolioContent />
      </InteractiveDisplay>
    </>
  )
}