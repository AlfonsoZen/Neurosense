import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export const HeroObject: React.FC = () => {
  // Tipado correcto para referencias de Three.js
  const brainRef = useRef<THREE.Group>(null!);
  
  const { scene } = useGLTF('/assets/brain_hologram/scene.gltf');

  useEffect(() => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#001e2b",
          emissive: "#00f3ff",
          emissiveIntensity: 1.5,
          wireframe: true,
          transparent: true,
          opacity: 0.8,
          roughness: 0.2,
          metalness: 0.8,
        });
      }
    });
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (brainRef.current) {
      brainRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate={true} 
        autoRotateSpeed={2} 
      />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <primitive 
          ref={brainRef} 
          object={scene} 
          scale={1.5} 
          rotation={[0.2, 0, 0]} 
          // position={[x, y, z]} -> Valores negativos en X mueven a la izquierda
          position={[-.2, 0, 0]} 
        />
      </Float>
    </>
  );
};

useGLTF.preload('/assets/brain_hologram/scene.gltf');