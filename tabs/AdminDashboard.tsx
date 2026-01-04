
import React from 'react';
import { User, UserRole, SystemLog } from '../types';

interface AdminDashboardProps {
  user: User;
  logs: SystemLog[];
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, logs, onLogout }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">{user.role} Dashboard</h1>
          <p className="text-brand font-mono text-[10px] tracking-[0.4em] mt-1 uppercase">Global Oversight Active</p>
        </div>
        <button onClick={onLogout} className="bg-white/5 border border-white/10 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Term Session</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         <div className="bg-glass p-8 rounded-[2rem]">
            <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2">Network Health</p>
            <div className="flex items-end gap-2">
               <span className="text-4xl font-black text-white">99.8%</span>
               <span className="text-green-500 text-[10px] font-bold mb-2">LATENCY 4MS</span>
            </div>
         </div>
         <div className="bg-glass p-8 rounded-[2rem]">
            <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2">Total NC Circ.</p>
            <div className="flex items-end gap-2">
               <span className="text-4xl font-black text-brand">2.4M</span>
               <span className="text-gray-500 text-[10px] font-bold mb-2">+12% WK</span>
            </div>
         </div>
         <div className="bg-glass p-8 rounded-[2rem]">
            <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2">Active Nodes</p>
            <div className="flex items-end gap-2">
               <span className="text-4xl font-black text-white">42</span>
               <span className="text-brand text-[10px] font-bold mb-2">3 PENDING</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <section className="bg-glass rounded-[2.5rem] p-8 border border-white/5">
            <h3 className="text-white font-black text-xl italic mb-6">Live Node Stream</h3>
            <div className="space-y-4 font-mono text-[10px]">
               {logs.map(log => (
                 <div key={log.id} className="flex gap-4 border-b border-white/5 pb-3">
                    <span className="text-gray-600">[{log.timestamp.toLocaleTimeString()}]</span>
                    <span className={`font-bold ${log.type === 'NC_MINT' ? 'text-brand' : 'text-gray-400'}`}>{log.type}</span>
                    <span className="text-white flex-grow truncate">{log.message}</span>
                 </div>
               ))}
            </div>
         </section>

         <section className="space-y-6">
            <div className="bg-brand/10 border border-brand/20 p-8 rounded-[2.5rem] relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-3xl group-hover:bg-brand/40 transition-all" />
               <h3 className="text-white font-black text-xl italic mb-2">Minting Control</h3>
               <p className="text-gray-400 text-xs mb-6">Authorize NC generation for licensed nodes.</p>
               <button className="bg-brand text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-brand hover:scale-105 transition-transform">Initiate Mint</button>
            </div>

            <div className="bg-glass p-8 rounded-[2.5rem]">
               <h3 className="text-white font-black text-xl italic mb-4">Node Health</h3>
               <div className="space-y-4">
                  {['Plaza Klub', 'Hive', 'Supermarket'].map(node => (
                    <div key={node} className="flex items-center justify-between">
                       <span className="text-gray-400 font-bold text-xs uppercase">{node}</span>
                       <div className="flex items-center gap-2">
                          <span className="text-white font-mono text-[10px]">98% SYNC</span>
                          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
