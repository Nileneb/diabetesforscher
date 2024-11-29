import React from 'react'
import { RigidBody } from '@react-three/rapier'
import { SpaceEffect } from './effects/SpaceEffect'

export function Boundaries() {
  return (
    <group>
      {/* Space effect outside the boundaries */}
      <SpaceEffect />

      {/* Invisible wall with gate opening */}
      <RigidBody type="fixed" position={[0, 2, 0]}>
        {/* Left wall section */}
        <mesh position={[-3, 0, 0]}>
          <boxGeometry args={[2, 4, 0.2]} />
          <meshStandardMaterial transparent opacity={0.2} color="#7C81AD" />
        </mesh>
        {/* Right wall section */}
        <mesh position={[3, 0, 0]}>
          <boxGeometry args={[2, 4, 0.2]} />
          <meshStandardMaterial transparent opacity={0.2} color="#7C81AD" />
        </mesh>
        {/* Top wall section */}
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[4, 1, 0.2]} />
          <meshStandardMaterial transparent opacity={0.2} color="#7C81AD" />
        </mesh>
      </RigidBody>

      {/* Boundary walls */}
      <RigidBody type="fixed" colliders="trimesh">
        {/* Left boundary */}
        <mesh position={[-10, 2, 0]}>
          <boxGeometry args={[0.5, 4, 30]} />
          <meshStandardMaterial transparent opacity={0.2} color="#7C81AD" />
        </mesh>
        {/* Right boundary */}
        <mesh position={[10, 2, 0]}>
          <boxGeometry args={[0.5, 4, 30]} />
          <meshStandardMaterial transparent opacity={0.2} color="#7C81AD" />
        </mesh>
        {/* Back boundary */}
        <mesh position={[0, 2, -15]}>
          <boxGeometry args={[20, 4, 0.5]} />
          <meshStandardMaterial transparent opacity={0.2} color="#7C81AD" />
        </mesh>
        {/* Front boundary */}
        <mesh position={[0, 2, 15]}>
          <boxGeometry args={[20, 4, 0.5]} />
          <meshStandardMaterial transparent opacity={0.2} color="#7C81AD" />
        </mesh>
      </RigidBody>
    </group>
  )
}