import React, { useRef } from 'react'
import { PlayerModel } from './player/PlayerModel'
import { PlayerMovement } from './player/PlayerMovement'
import { PlayerCamera } from './player/PlayerCamera'

export function Player({ 
  onNearGate, 
  onLeaveGate, 
  speed = 5,
  cameraHeight = 2,
  cameraDistance = 6,
  cameraTilt = 30
}) {
  const rigidBodyRef = useRef()

  return (
    <>
      <PlayerModel rigidBodyRef={rigidBodyRef} />
      <PlayerMovement rigidBodyRef={rigidBodyRef} speed={speed} />
      <PlayerCamera 
        target={rigidBodyRef}
        height={cameraHeight}
        distance={cameraDistance}
        tilt={cameraTilt}
      />
    </>
  )
}