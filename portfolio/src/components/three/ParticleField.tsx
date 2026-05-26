'use client';
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function ParticleField({ count = 1500 }) {
  const ref = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const basePositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [count]);

  const positions = useMemo(() => new Float32Array(basePositions), [basePositions]);

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.getElapsedTime();
    const geom = ref.current.geometry as THREE.BufferGeometry;
    const attr = geom.getAttribute('position') as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    const mouseX = pointer.x * 6;
    const mouseY = pointer.y * 6;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const bx = basePositions[ix];
      const by = basePositions[ix + 1];
      const bz = basePositions[ix + 2];

      const dx = bx - mouseX;
      const dy = by - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
      const force = Math.min(0.35 / dist, 0.12);

      arr[ix] = bx + (dx / dist) * force + Math.sin(time + i) * 0.002;
      arr[ix + 1] = by + (dy / dist) * force + Math.cos(time * 0.8 + i) * 0.002;
      arr[ix + 2] = bz + Math.sin(time * 0.5 + i * 0.01) * 0.01;
    }

    attr.needsUpdate = true;
    ref.current.rotation.y = time * 0.02;
    ref.current.rotation.x = Math.sin(time * 0.05) * 0.08;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f2ff"
          size={0.035}
          sizeAttenuation
          depthWrite={false}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
