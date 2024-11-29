import React from 'react'
import { RigidBody } from '@react-three/rapier'
import { WORLD } from '../constants/world'

export function Zones() {
  const { PUBLIC, PRIVATE } = WORLD.ZONES

  return (
    <RigidBody type="fixed">
      {/* Public Zone */}
      <mesh 
        rotation-x={-Math.PI * 0.5} 
        position={PUBLIC.POSITION}
      >
        <planeGeometry args={[PUBLIC.SIZE[0], PUBLIC.SIZE[2]]} />
        <meshStandardMaterial color="#2E4374" />
      </mesh>

      {/* Private Zone */}
      <mesh 
        rotation-x={-Math.PI * 0.5} 
        position={PRIVATE.POSITION}
      >
        <planeGeometry args={[PRIVATE.SIZE[0], PRIVATE.SIZE[2]]} />
        <meshStandardMaterial color="#4B527E" />
      </mesh>
    </RigidBody>
  )
}