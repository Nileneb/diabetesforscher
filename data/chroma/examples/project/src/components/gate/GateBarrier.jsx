import React from 'react'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useSpring, animated } from '@react-spring/three'
import { WORLD } from '../../constants/world'

export function GateBarrier({ isAuthenticated }) {
  const { POSITION, BARRIER } = WORLD.GATE
  
  const { opacity } = useSpring({
    opacity: isAuthenticated ? 0 : 0.1,
    config: { tension: 100, friction: 20 }
  })

  return (
    <RigidBody type="fixed" position={POSITION} colliders={false}>
      {/* Visual barrier */}
      <animated.mesh position={[0, -0.5, 0]}>
        <boxGeometry args={BARRIER.SIZE} />
        <animated.meshStandardMaterial 
          color="#EA906C"
          transparent={true}
          opacity={opacity}
          emissive="#EA906C"
          emissiveIntensity={0.1}
        />
      </animated.mesh>

      {/* Collision barrier */}
      {!isAuthenticated && (
        <CuboidCollider 
          position={[0, -0.5, 0]} 
          args={BARRIER.COLLIDER}
          sensor
        />
      )}
    </RigidBody>
  )
}