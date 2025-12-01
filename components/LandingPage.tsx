import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { HeroObject } from './3D/HeroObject';
import { BackgroundScene } from './3D/BackgroundScene';
import { CyberButton } from './UI/CyberButton';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row bg-neuro-base overflow-hidden">
      
      {/* Background Ambience (Global subtle particles) */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <BackgroundScene />
        </Canvas>
      </div>

      {/* LEFT COLUMN: Content */}
      <div className="w-full md:w-1/2 z-10 flex flex-col justify-center px-8 md:px-20 lg:px-32 py-12 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-neuro-base via-neuro-base/90 to-transparent -z-10" />
        
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-2 h-2 rounded-full bg-neuro-accent animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-neuro-secondary uppercase">
                System Operational
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.1]">
              Neuro<span className="font-semibold text-neuro-accent">Sense</span>
            </h1>
            
            <p className="text-lg text-neuro-secondary max-w-md leading-relaxed font-light">
              Experience the convergence of artificial intelligence and human emotion. 
              Real-time perception analysis with pharmaceutical-grade precision.
            </p>
          </div>

          <div className="flex gap-4">
            <CyberButton onClick={() => navigate('/detect')}>
              Initialize System
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </CyberButton>
          </div>
        </div>

        {/* Minimal Footer Info */}
        <div className="absolute bottom-8 left-8 md:left-20 lg:left-32 flex gap-8 text-[10px] text-neuro-border font-mono uppercase tracking-widest">
          <span>v2.4.0</span>
          <span>Encrypted</span>
          <span>Latency: 12ms</span>
        </div>
      </div>

      {/* RIGHT COLUMN: 3D Visual */}
      <div className="hidden md:block w-1/2 h-full relative z-0">
        <div className="absolute inset-0 bg-gradient-radial from-neuro-violet/5 to-transparent opacity-50" />
        <Canvas camera={{ position: [0, 0, 6], fov: 35 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#818CF8" />
          <pointLight position={[-10, -5, -5]} intensity={0.5} color="#38BDF8" />
          <Environment preset="city" />
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
             <HeroObject />
          </Float>
        </Canvas>
      </div>
    </div>
  );
};