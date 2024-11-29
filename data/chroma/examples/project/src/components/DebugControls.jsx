import React from 'react'
import { useControls } from 'leva'

export function DebugControls({ onValuesChange }) {
  const values = useControls({
    playerSpeed: {
      value: 3,
      min: 1,
      max: 10,
      step: 0.1,
    },
    mouseSensitivity: {
      value: 0.002,
      min: 0.001,
      max: 0.01,
      step: 0.001,
    },
    cameraHeight: {
      value: 2,
      min: 0.5,
      max: 5,
      step: 0.1,
    },
    cameraDistance: {
      value: 6,
      min: 2,
      max: 15,
      step: 0.5,
    },
    cameraTilt: {
      value: 30,
      min: 0,
      max: 89,
      step: 1,
    }
  })

  React.useEffect(() => {
    onValuesChange?.(values)
  }, [values, onValuesChange])

  return null
}