
import React, { useState } from 'react';

const AudioVisualizer: React.FC = () => (
  <div className="flex items-end justify-center space-x-1.5 h-32">
    {[...Array(40)].map((_, i) => (
      <div
        key={i}
        className="w-1.5 bg-brand rounded-full"
        style={{
          height: `${Math.random() * 90 + 10}%`,
          animation: `pulse-bar 1.2s ease-in-out ${i * 0.05}s infinite alternate`,
          opacity: (i / 40) + 0.3
        }}
      />
    ))}
    <style>{`
      @keyframes pulse-bar {
        0% { transform: scaleY(0.2); background-color: var(--brand-primary); filter: blur(1px); }
        100% { transform: scaleY(1); background-color: #fff; filter: blur(0px); }
      }
    `}</style>
  </div>
);

const RadioTab: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="p-8 max-w-lg mx-auto pb-24 min-h-screen flex flex-col">
      <header className="flex justify-between items-center mt-12 mb-12">
         <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">Radio</h1>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-white tracking-widest uppercase">Live Feed</span>
         </div>
      </header>

      <div className="bg-glass p-12 rounded-[3rem] shadow-brand relative overflow-hidden flex-grow flex flex-col items-center justify-center text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand/5 to-transparent pointer-events-none" />
        
        <div className="z-10 w-full">
            <p className="text-gray-500 text-[10px] font-bold tracking-[0.5em] uppercase mb-4">People We Like Radio</p>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase leading-none mb-2">Deep House Zurich</h2>
            <p className="text-brand font-mono text-xs uppercase tracking-widest mb-12">Set by: Aline & K-Vibe</p>
            
            <div className="mb-12">
               <AudioVisualizer />
            </div>

            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform group"
            >
              {isPlaying ? (
                <div className="flex gap-1.5">
                   <div className="w-2 h-8 bg-black rounded-full" />
                   <div className="w-2 h-8 bg-black rounded-full" />
                </div>
              ) : (
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-black border-b-[12px] border-b-transparent ml-2" />
              )}
            </button>
        </div>
      </div>

      <div className="mt-8 bg-glass p-6 rounded-[2rem] flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center font-bold text-gray-500">?</div>
            <div>
               <p className="text-white font-bold text-sm">Now Playing</p>
               <p className="text-gray-500 text-xs">Unknown Artist - Midnight Drift</p>
            </div>
         </div>
         <button className="text-brand text-xs font-black uppercase tracking-widest">Share</button>
      </div>
    </div>
  );
};

export default RadioTab;
