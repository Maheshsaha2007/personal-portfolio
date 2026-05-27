'use client';
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { MenuAnnotations } from './MenuAnnotations';

interface FloatingOrbProps {
  is3DMode?: boolean;
}

export function FloatingOrb({ is3DMode = false }: FloatingOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Tick loop (executed on GPU animation frame)
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slow rotational velocity (pause auto-rotation in 3D mode so user can inspect with OrbitControls)
    if (!is3DMode) {
      meshRef.current.rotation.x = time * 0.15;
      meshRef.current.rotation.y = time * 0.2;
    }
    
    // Smooth sinusoidal up-down hover float
    meshRef.current.position.y = is3DMode ? 0 : Math.sin(time * 1.5) * 0.15;
  });

  const baseScale = is3DMode ? 1.6 : 1.35;
  const hoverScale = is3DMode ? 1.65 : 1.45;

  return (
    <group>
      {/* Dynamic central point lighting source inside the orb */}
      <pointLight 
        position={[0, 0, 0]} 
        color={hovered || is3DMode ? '#8b5cf6' : '#00f2ff'} 
        intensity={hovered || is3DMode ? 6 : 4} 
        distance={5}
      />
      
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          if (!is3DMode) setHovered(true);
        }}
        onPointerOut={() => {
          if (!is3DMode) setHovered(false);
        }}
        scale={hovered ? hoverScale : baseScale}
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
          color={hovered || is3DMode ? '#d9adff' : '#c3faff'}
        />

        {/* 3D HTML Annotations attached to the orb */}
        <MenuAnnotations is3DMode={is3DMode} />
      </mesh>
    </group>
  );
}
