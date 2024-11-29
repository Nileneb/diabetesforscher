import React, { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useMouseControl } from '../../hooks/useMouseControl'
import { Vector3 } from 'three'

export function PlayerCamera({ target, height = 2, distance = 0.2 }) {
  const { camera } = useThree()
  const cameraPosition = useRef(new Vector3())
  
  // Handle mouse rotation
  useMouseControl(true)

  useEffect(() => {
    if (!target?.current) return

    const updateCamera = () => {
      const targetPosition = target.current?.translation()
      if (!targetPosition) return

      // Update camera position to follow player
      cameraPosition.current.set(
        targetPosition.x,
        targetPosition.y + height,
        targetPosition.z + distance
      )
      
      camera.position.copy(cameraPosition.current)
    }

    const animationFrameId = setInterval(updateCamera, 1000 / 60)
    return () => clearInterval(animationFrameId)
  }, [camera, target, height, distance])

  return null
}