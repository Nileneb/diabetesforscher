import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function Cube({ position = [0, 0, 0] }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#EA906C" />
    </mesh>
  )
}