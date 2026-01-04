
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface StaffTerminalsProps {
  user: User;
  onLogout: () => void;
  addLog: (type: any, message: string) => void;
}

const StaffTerminals: React.FC<StaffTerminalsProps> = ({ user, onLogout, addLog }) => {
  const [ncAmount, setNcAmount] = useState('0');

  const handleTransaction = () => {
    addLog('USER_CHECKIN', `Staff ${user.nickname} processed payment: ${ncAmount} NC`);
    alert(`Payment of ${ncAmount} NC Success`);
    setNcAmount('0');
  };

  return (
    <div className="p-8 max-w-lg mx-auto min-h-screen flex flex-col">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">{user.role}</h1>
          <p className="text-brand font-mono text-[10px] tracking-widest mt-1 uppercase">Node Session Active</p>
        </div>
        <button onClick={onLogout} className="bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Exit</button>
      </header>

      {user.role === UserRole.BarTerminal ? (
        <div className="flex-grow flex flex-col gap-8">
           <div className="bg-glass p-8 rounded-[2.5rem] flex flex-col items-center justify-center">
              <span className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-2">Total NC Due</span>
              <div className="text-6xl font-black text-white tracking-tighter">{ncAmount}</div>
           </div>

           <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '.'].map(key => (
                <button 
                  key={key} 
                  onClick={() => {
                    if (key === 'C') setNcAmount('0');
                    else setNcAmount(prev => prev === '0' ? String(key) : prev + key);
                  }}
                  className="bg-white/5 hover:bg-white/10 h-20 rounded-2xl text-2xl font-bold transition-colors"
                >
                  {key}
                </button>
              ))}
           </div>

           <button 
            onClick={handleTransaction}
            className="w-full bg-brand h-24 rounded-3xl font-black text-xl uppercase tracking-widest shadow-brand hover:scale-[1.02] active:scale-[0.98] transition-all"
           >
              Tap User NFC
           </button>
        </div>
      ) : (
        /* Door Ops UI */
        <div className="flex-grow flex flex-col gap-6">
           <div className="bg-glass p-12 rounded-[3rem] border-2 border-brand/50 border-dashed flex flex-col items-center justify-center gap-6 group hover:border-brand transition-all cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-brand/20 flex items-center justify-center animate-pulse">
                <div className="w-16 h-16 border-4 border-brand rounded-full" />
              </div>
              <p className="text-brand font-black text-lg uppercase tracking-widest text-center">Ready to Scan Passport</p>
           </div>

           <div className="bg-glass p-8 rounded-[2rem] space-y-4">
              <div className="flex justify-between items-center">
                 <span className="text-gray-500 text-xs font-bold uppercase">Recent Entry</span>
                 <span className="text-brand text-xs font-mono">2 min ago</span>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10" />
                 <div>
                    <p className="text-white font-bold">GlitchGoddess</p>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">A9 Elite VIP</p>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="bg-glass p-6 rounded-3xl text-center">
                 <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">In Node</p>
                 <p className="text-3xl font-black text-white">482</p>
              </div>
              <div className="bg-glass p-6 rounded-3xl text-center">
                 <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Walk-ins</p>
                 <p className="text-3xl font-black text-brand">12</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default StaffTerminals;
