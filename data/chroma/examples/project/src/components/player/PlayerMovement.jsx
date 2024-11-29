import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useKeyboard } from '../../hooks/useKeyboard'

export function PlayerMovement({ rigidBodyRef, speed = 5 }) {
  const { moveForward, moveBackward, moveLeft, moveRight } = useKeyboard()
  const velocity = useRef(new Vector3())

  useFrame(({ camera }) => {
    if (!rigidBodyRef.current) return

    const direction = new Vector3()
    
    if (moveForward || moveBackward || moveLeft || moveRight) {
      // Get camera direction vectors
      const forward = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
      const right = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion)

      // Keep movement horizontal
      forward.y = 0
      right.y = 0
      
      forward.normalize()
      right.normalize()

      // Combine movement directions
      if (moveForward) direction.add(forward)
      if (moveBackward) direction.sub(forward)
      if (moveRight) direction.add(right)
      if (moveLeft) direction.sub(right)

      direction.normalize()
    }

    // Update velocity
    velocity.current.lerp(direction.multiplyScalar(speed), 0.15)

    // Apply movement
    rigidBodyRef.current.setLinvel({
      x: velocity.current.x,
      y: 0,
      z: velocity.current.z
    }, true)

    // Update player state
    const position = rigidBodyRef.current.translation()
    window.playerState = {
      position: [position.x, position.y, position.z],
      health: 100,
      speed
    }
  })

  return null
}