import React from 'react'
import { GateFrame } from './gate/GateFrame'
import { GateBarrier } from './gate/GateBarrier'
import { PortalEffect } from './gate/PortalEffect'

export function Gate({ isAuthenticated }) {
  return (
    <group>
      <GateFrame />
      <GateBarrier isAuthenticated={isAuthenticated} />
      <group position={[0, 2, 0]} scale={[1.5, 1.5, 0.1]}>
        <PortalEffect />
      </group>
    </group>
  )
}