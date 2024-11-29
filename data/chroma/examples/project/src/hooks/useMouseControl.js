import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Euler } from 'three'

export function useMouseControl(enabled = true) {
  const { camera } = useThree()
  const rotation = useRef(new Euler(0, 0, 0, 'YXZ'))
  const state = useRef({
    isLocked: false,
    rotationX: 0,
    rotationY: 0,
    sensitivity: 0.002
  })
  
  useEffect(() => {
    if (!enabled) return

    const onMouseMove = (event) => {
      if (!state.current.isLocked) return

      // Update rotation based on mouse movement
      state.current.rotationX = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, 
          state.current.rotationX - event.movementY * state.current.sensitivity
        )
      )
      state.current.rotationY -= event.movementX * state.current.sensitivity

      // Apply rotation
      rotation.current.x = state.current.rotationX
      rotation.current.y = state.current.rotationY
      camera.rotation.copy(rotation.current)
    }

    const lockPointer = () => {
      document.body.requestPointerLock()
    }

    const onPointerLockChange = () => {
      state.current.isLocked = document.pointerLockElement === document.body
      document.body.style.cursor = state.current.isLocked ? 'none' : 'auto'
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('click', lockPointer)
    document.addEventListener('pointerlockchange', onPointerLockChange)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('click', lockPointer)
      document.removeEventListener('pointerlockchange', onPointerLockChange)
    }
  }, [camera, enabled])

  return rotation.current
}