import React from 'react'
import { RigidBody } from '@react-three/rapier'
import { WORLD } from '../constants/world'

export function Ground({ color = "#1a1a1a" }) {
  return (
    <RigidBody type="fixed" friction={1}>
      <mesh rotation-x={-Math.PI * 0.5} position={[0, -0.5, 0]}>
        <planeGeometry args={[WORLD.GROUND_SIZE, WORLD.GROUND_SIZE]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </RigidBody>
  )
}