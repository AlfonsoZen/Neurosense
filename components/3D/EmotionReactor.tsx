import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { EmotionType, EMOTION_COLORS } from '../../types';

interface EmotionReactorProps {
  emotion: EmotionType;
}

export const EmotionReactor: React.FC<EmotionReactorProps> = ({ emotion }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  const targetColor = useMemo(() => new THREE.Color(EMOTION_COLORS[emotion]), [emotion]);
  
  useFrame((state, delta) => {
    if (mesh.current) {
      // Cast material to MeshStandardMaterial to access color and emissive properties
      const material = mesh.current.material as THREE.MeshStandardMaterial;

      // Smoothly interpolate color
      material.color.lerp(targetColor, delta * 2);
      material.emissive.lerp(targetColor, delta * 2);

      // Animation logic based on emotion
      const time = state.clock.getElapsedTime();
      
      switch (emotion) {
        case EmotionType.ANGRY:
          mesh.current.rotation.x += delta * 4;
          mesh.current.rotation.y += delta * 4;
          mesh.current.scale.setScalar(1 + Math.sin(time * 10) * 0.1);
          break;
        case EmotionType.HAPPY:
          mesh.current.rotation.y += delta * 1;
          mesh.current.position.y = Math.sin(time * 3) * 0.2;
          mesh.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
          break;
        case EmotionType.SURPRISED:
          mesh.current.scale.setScalar(1.2 + Math.sin(time * 20) * 0.02);
          mesh.current.rotation.z += delta;
          break;
        default: // Neutral
          mesh.current.rotation.x += delta * 0.5;
          mesh.current.rotation.y += delta * 0.5;
          mesh.current.scale.setScalar(1);
          mesh.current.position.y = Math.sin(time) * 0.1;
      }
    }
  });

  return (
    <Icosahedron ref={mesh} args={[1, 1]}>
      <MeshWobbleMaterial
        factor={emotion === EmotionType.ANGRY ? 1 : 0.3}
        speed={emotion === EmotionType.ANGRY ? 5 : 1}
        color={EMOTION_COLORS[EmotionType.NEUTRAL]}
        emissive={EMOTION_COLORS[EmotionType.NEUTRAL]}
        emissiveIntensity={1.5}
        roughness={0}
        metalness={0.8}
        wireframe={emotion === EmotionType.FEAR}
      />
    </Icosahedron>
  );
};