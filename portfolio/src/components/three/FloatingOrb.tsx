'use client';
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Tick loop (executed on GPU animation frame)
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow rotational velocity
    meshRef.current.rotation.x = time * 0.15;
    meshRef.current.rotation.y = time * 0.2;
    
    // Smooth sinusoidal up-down hover float
    meshRef.current.position.y = Math.sin(time * 1.5) * 0.15;
  });

  return (
    <group>
      {/* Dynamic central point lighting source inside the orb */}
      <pointLight 
        position={[0, 0, 0]} 
        color={hovered ? '#8b5cf6' : '#00f2ff'} 
        intensity={hovered ? 6 : 4} 
        distance={5}
      />
      
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.45 : 1.35}
      >
        <sphereGeometry args={[1, 64, 64]} />
        {/* Triple reflection refraction transmission shader */}
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.4}
          distortionScale={0.3}
          temporalDistortion={0.2}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color={hovered ? '#d9adff' : '#c3faff'}
        />
      </mesh>
    </group>
  );
}
