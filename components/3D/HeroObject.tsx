import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Torus, Float } from '@react-three/drei';
import * as THREE from 'three';

export const HeroObject: React.FC = () => {
  const mainMesh = useRef<THREE.Mesh>(null!);
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (mainMesh.current) {
      mainMesh.current.rotation.y = t * 0.2;
    }
    
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.3;
      ring1.current.rotation.y = t * 0.1;
    }
    
    if (ring2.current) {
      ring2.current.rotation.x = -t * 0.2;
      ring2.current.rotation.z = t * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {/* Central Core - The "Brain" */}
      <Sphere ref={mainMesh} args={[1.2, 64, 64]}>
        <MeshDistortMaterial
          color="#1a1a2e"
          emissive="#00f3ff"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={1}
          distort={0.4}
          speed={2}
          wireframe
        />
      </Sphere>

      {/* Inner Glow Sphere */}
      <Sphere args={[1.1, 32, 32]}>
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.1} />
      </Sphere>

      {/* Orbiting Rings - The "Sensors" */}
      <Torus ref={ring1} args={[2.2, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ff003c" emissive="#ff003c" emissiveIntensity={2} toneMapped={false} />
      </Torus>

      <Torus ref={ring2} args={[2.8, 0.02, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={2} toneMapped={false} />
      </Torus>
    </Float>
  );
};