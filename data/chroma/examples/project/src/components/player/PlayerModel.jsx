import React from 'react'
import { RigidBody } from '@react-three/rapier'
import { WORLD } from '../../constants/world'

export function PlayerModel({ rigidBodyRef }) {
  const { START_POSITION, SIZE } = WORLD.PLAYER

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={START_POSITION}
      enabledRotations={[false, false, false]}
      linearDamping={12}
      lockRotations
      mass={1}
      friction={1}
      type="dynamic"
    >
      <mesh>
        <boxGeometry args={SIZE} />
        <meshStandardMaterial color="#EA906C" emissive="#EA906C" emissiveIntensity={0.2} />
      </mesh>
    </RigidBody>
  )
}