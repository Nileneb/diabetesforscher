import React from 'react'
import { RigidBody } from '@react-three/rapier'
import { WORLD } from '../../constants/world'

export function GateFrame() {
  const { POSITION, FRAME } = WORLD.GATE
  const { PILLAR_SIZE, PILLAR_OFFSET, ARCH_SIZE, ARCH_HEIGHT } = FRAME

  return (
    <RigidBody type="fixed" position={POSITION}>
      {/* Left pillar */}
      <mesh position={[-PILLAR_OFFSET, 0, 0]}>
        <boxGeometry args={PILLAR_SIZE} />
        <meshStandardMaterial color="#EA906C" emissive="#EA906C" emissiveIntensity={0.5} />
      </mesh>
      {/* Right pillar */}
      <mesh position={[PILLAR_OFFSET, 0, 0]}>
        <boxGeometry args={PILLAR_SIZE} />
        <meshStandardMaterial color="#EA906C" emissive="#EA906C" emissiveIntensity={0.5} />
      </mesh>
      {/* Top arch */}
      <mesh position={[0, ARCH_HEIGHT, 0]}>
        <boxGeometry args={ARCH_SIZE} />
        <meshStandardMaterial color="#EA906C" emissive="#EA906C" emissiveIntensity={0.5} />
      </mesh>
    </RigidBody>
  )
}