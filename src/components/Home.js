import * as THREE from "three"
import React, { Suspense, useState, useCallback } from "react"
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import { Physics, usePlane, useSphere } from "@react-three/cannon"


import texUrl from "./tex.jpg"
import { Html } from "@react-three/drei"

// A physical sphere tied to mouse coordinates without visual representation
function Mouse() {
  const { viewport } = useThree()
  const [, api] = useSphere(() => ({ type: "kinematic ", args: 4.5 }))
  return useFrame(state =>
    api.position.set((state.mouse.x * viewport.width) / 1, (state.mouse.y * viewport.height) / 1, 7),
  )
}

// A physical plane without visual representation
function Plane({ color, ...props }) {
  usePlane(() => ({ ...props }))
  return null
}

// Creates a crate that catches the spheres
function Borders() {
  const { viewport } = useThree()
  return (
    <>
      <Plane scale={[40,40,40]} position={[0, -viewport.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Plane scale={[40,40,40]} position={[-viewport.width / 2 - 1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Plane scale={[40,40,40]} position={[viewport.width / 2 + 1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Plane scale={[40,40,40]} position={[0, 0, 0]} rotation={[0, 0, 0]} />
      <Plane scale={[40,40,40]} position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
      <Plane  position={[0, viewport.height + 10, 0]} rotation={[Math.PI / 2, 0, 0]} />

    </>
  )
}

// Spheres falling down
function InstancedSpheres({ count = 100 }) {
  const { viewport } = useThree()
  const texture = useLoader(THREE.TextureLoader, texUrl)
  const [ref] = useSphere(index => ({
    mass: 1,
    position: [4 - Math.random() * 8, viewport.height, 0, 0],
    args: 2
  }))
  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, count]}>
      <sphereBufferGeometry args={[2, 32, 32]} />
      <meshPhysicalMaterial color="#fff"  clearcoat={0} clearcoatRoughness={1} />
    </instancedMesh>
  )
}

export default function Home() {
  return (
<div className="main">
    <Canvas
      concurrent
      shadowMap
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 20], fov: 50, near: 17, far: 40 }}>
      <fog attach="fog" args={["#d94575", 10, 40]} />
      {/* <color attach="background" args={["red"]} /> */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[50, 50, 25]}
        angle={0.3}
        intensity={2}
        castShadow
        shadow-mapSize-width={100}
        shadow-mapSize-height={100}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <Suspense fallback={null}>
        <Physics gravity={[0, -2, 0]} defaultContactMaterial={{ restitution: 0.6 }}>
          <group position={[0, 0, -10]}>
            <Mouse />
            <Borders />
            <InstancedSpheres />
          </group>
        </Physics>
        

      </Suspense>

    </Canvas>
    <div className="hire-section">
        <h2 className="hire-section__title">Hello, my name is Ian.</h2>
        <p>I am studying Computer Science at Arizona State University,</p>
        <p>
          <strong>I love working with JavaScript, React, Three.js, and Node.js,</strong>
        </p>
        <p>contact me to create a beautiful and interactive web experience for your Valley business!</p>
        <a href="https://ian-m.xyz/contact" className="button">
          reach me
        </a>
      </div>
    </div>
    

  );
}

