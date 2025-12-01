import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EmotionReactor } from './3D/EmotionReactor';
import { CyberButton } from './UI/CyberButton';
import { EmotionType, EMOTION_COLORS } from '../types';

export const DetectionPage: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType>(EmotionType.NEUTRAL);
  const [statusText, setStatusText] = useState("Initializing optical sensors...");

  // Setup Webcam
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startWebcam = async () => {
      try {
        setStatusText("Requesting permission...");
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 1280, height: 720, facingMode: "user" } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStatusText("Calibrating neural link...");
          
          setTimeout(() => {
            setStreamActive(true);
            setStatusText("Active");
          }, 1500);
        }
      } catch (err) {
        console.error("Webcam error:", err);
        setStatusText("Source unavailable");
      }
    };

    startWebcam();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Simulate Emotion Detection
  useEffect(() => {
    if (!streamActive) return;

    const interval = setInterval(() => {
      const emotions = Object.values(EmotionType);
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setCurrentEmotion(randomEmotion);
    }, 4000);

    return () => clearInterval(interval);
  }, [streamActive]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-neuro-base flex flex-col p-6 md:p-8 gap-6">
      
      {/* Subtle Background Gradient */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-neuro-violet/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-neuro-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="flex justify-between items-center z-20">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neuro-violet to-neuro-accent flex items-center justify-center">
            <div className="w-3 h-3 bg-neuro-base rounded-full" />
          </div>
          <h2 className="text-xl font-light tracking-wide text-white">
            Neuro<span className="font-semibold text-neuro-secondary">Sense</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${streamActive ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400'}`} />
            <span className="text-xs font-mono text-neuro-secondary uppercase tracking-wider">{statusText}</span>
          </div>
          <CyberButton variant="secondary" onClick={() => navigate('/')} className="!px-5 !py-2 !text-xs !tracking-widest">
            End Session
          </CyberButton>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 z-10">
        
        {/* Left: Camera Feed */}
        <div className="flex-1 relative rounded-3xl overflow-hidden border border-neuro-border bg-neuro-surface/50 shadow-2xl">
          
          {/* Subtle Frame Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none">
             <div className="absolute top-6 left-6 w-32 h-[1px] bg-white/20" />
             <div className="absolute top-6 left-6 h-32 w-[1px] bg-white/20" />
             <div className="absolute bottom-6 right-6 w-32 h-[1px] bg-white/20" />
             <div className="absolute bottom-6 right-6 h-32 w-[1px] bg-white/20" />
          </div>

          <video 
            ref={videoRef}
            autoPlay 
            playsInline 
            muted 
            className={`w-full h-full object-cover transition-all duration-1000 ${streamActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          />

          {/* Loading State */}
          {!streamActive && (
             <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
               <div className="w-12 h-12 rounded-full border-2 border-neuro-border border-t-neuro-accent animate-spin" />
               <span className="text-xs font-mono text-neuro-secondary tracking-widest">CONNECTING...</span>
             </div>
          )}
        </div>

        {/* Right: Analytics Panel */}
        <div className="lg:w-[400px] flex flex-col gap-6">
          
          {/* 3D Visualization Card */}
          <div className="flex-1 glass-panel rounded-3xl relative overflow-hidden flex flex-col p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4 z-10">
              <span className="text-xs font-mono text-neuro-secondary uppercase tracking-widest">Pattern Recognition</span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
            
            <div className="absolute inset-0">
              <Canvas camera={{ position: [0, 0, 3] }}>
                 <ambientLight intensity={0.6} />
                 <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                 <Environment preset="studio" />
                 <EmotionReactor emotion={currentEmotion} />
              </Canvas>
            </div>
          </div>

          {/* Metrics Card */}
          <div className="h-auto glass-panel rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden transition-all duration-500"
               style={{ borderLeft: `2px solid ${EMOTION_COLORS[currentEmotion]}` }}>
            
            {/* Background color bleed */}
            <div className="absolute right-0 top-0 w-32 h-32 rounded-full blur-[60px] opacity-20 transition-colors duration-700"
                 style={{ backgroundColor: EMOTION_COLORS[currentEmotion] }} />

            <span className="text-xs font-mono text-neuro-secondary uppercase tracking-widest mb-3">Detected State</span>
            
            <div className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6 capitalize transition-all duration-300">
              {currentEmotion.toLowerCase()}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-neuro-secondary uppercase">
                 <span>Certainty</span>
                 <span>98.4%</span>
              </div>
              <div className="w-full bg-neuro-surface h-1 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${90 + Math.random() * 8}%`, 
                    backgroundColor: EMOTION_COLORS[currentEmotion],
                    boxShadow: `0 0 10px ${EMOTION_COLORS[currentEmotion]}`
                  }} 
                />
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};