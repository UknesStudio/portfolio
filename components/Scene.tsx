'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Scene = () => {
  const points = useRef();
  
  // Increase particle count for better coverage
  const particleCount = 3000;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Spread particles across a wider area
      positions[i * 3] = (Math.random() - 0.5) * 50;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50; // z
    }
    
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      // Slower rotation for a more subtle effect
      (points.current as THREE.Points).rotation.x += delta * 0.05;
      (points.current as THREE.Points).rotation.y += delta * 0.08;

      // Add wave effect
      const time = state.clock.getElapsedTime();
      const positions = (points.current as THREE.Points).geometry.attributes.position.array;
      
      for (let i = 0; i < particleCount; i++) {
        const x = i * 3;
        const y = i * 3 + 1;
        
        // Create wave motion
        positions[y] += Math.sin(time + positions[x]) * 0.01;
      }
      ((points.current as THREE.Points).geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }
  });
  return (
    <Points ref={points as any} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#8B0000"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
};

export default Scene; 