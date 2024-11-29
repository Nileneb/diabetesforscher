import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function PortalEffect({ count = 2000 }) {
  const mesh = useRef()
  const light = useRef()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const x = Math.random() * 2 - 1
      const y = Math.random() * 2 - 1
      const z = Math.random() * 2 - 1

      temp.push({ time, factor, speed, x, y, z })
    }
    return temp
  }, [count])

  const positions = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      temp[i * 3] = particles[i].x
      temp[i * 3 + 1] = particles[i].y
      temp[i * 3 + 2] = particles[i].z
    }
    return temp
  }, [count, particles])

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const { factor, speed, x, y, z } = particles[i]
      const idx = i * 3
      const positionArray = mesh.current.geometry.attributes.position.array
      const angle = speed * time + i
      const radius = Math.max(0.1, (1 - speed * time) % 1) * factor
      
      positionArray[idx] = Math.cos(angle) * radius * x
      positionArray[idx + 1] = Math.sin(angle) * radius * y
      positionArray[idx + 2] = Math.cos(angle) * Math.sin(angle) * radius * z
    }

    mesh.current.geometry.attributes.position.needsUpdate = true

    if (light.current) {
      light.current.position.x = Math.sin(time) * 2
      light.current.position.z = Math.cos(time) * 2
    }
  })

  return (
    <group>
      <pointLight
        ref={light}
        distance={6}
        intensity={5}
        color="#EA906C"
      />

      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#ffffff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}