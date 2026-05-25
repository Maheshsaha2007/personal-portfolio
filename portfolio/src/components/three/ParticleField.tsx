'use client';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function ParticleField({ count = 1500 }) {
  const ref = useRef<THREE.Points>(null);

  // Generate randomized coordinates for coordinates list
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12; // spread X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12; // spread Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12; // spread Z
    }
    return pos;
  }, [count]);

  // Gentle wave offset animation loops inside useFrame (Runs on GPU ticker)
  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Slow rotational float
    ref.current.rotation.y = time * 0.02;
    ref.current.rotation.x = Math.sin(time * 0.05) * 0.1;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f2ff"
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
