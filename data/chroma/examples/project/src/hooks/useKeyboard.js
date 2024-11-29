import { useState, useEffect, useCallback } from 'react'

export function useKeyboard() {
  const [keys, setKeys] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
  })

  const handleKeyChange = useCallback((e, pressed) => {
    const keyMap = {
      KeyW: 'moveForward',
      KeyS: 'moveBackward',
      KeyA: 'moveLeft',
      KeyD: 'moveRight',
    }

    const key = keyMap[e.code]
    if (key) {
      e.preventDefault()
      setKeys(prev => ({
        ...prev,
        [key]: pressed
      }))
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => handleKeyChange(e, true)
    const handleKeyUp = (e) => handleKeyChange(e, false)

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Cleanup function to prevent memory leaks
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyChange])

  return keys
}