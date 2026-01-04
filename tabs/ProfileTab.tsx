
import React from 'react';
import { User, UserRole } from '../types';

interface ProfileTabProps {
  user: User;
  onLogin: (role: UserRole) => void;
  onLogout: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ user, onLogin, onLogout }) => {
  return (
    <div className="p-8 max-w-lg mx-auto pb-24">
      <div className="flex flex-col items-center mt-12 mb-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-tr from-brand to-transparent rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000"></div>
          <img src={user.avatarUrl} className="relative w-40 h-40 rounded-full border-4 border-black object-cover" />
          <div className="absolute -bottom-2 -right-2 bg-brand text-white px-5 py-2 rounded-full text-xs font-black italic tracking-widest border-4 border-black shadow-lg">
            {user.globalLevel}
          </div>
        </div>
        <h2 className="text-4xl font-black text-white mt-8 uppercase italic tracking-tighter">{user.nickname}</h2>
        <p className="text-gray-600 font-mono text-[10px] mt-2 uppercase tracking-[0.4em]">Passport: #NITE-2027-{user.id}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="bg-glass p-8 rounded-[2.5rem] text-center">
           <p className="text-brand font-black text-4xl leading-none">{user.ncBalance.toLocaleString()}</p>
           <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest mt-2">NiteCoins</p>
        </div>
        <div className="bg-glass p-8 rounded-[2.5rem] text-center">
           <p className="text-white font-black text-4xl leading-none">{user.xp.toLocaleString()}</p>
           <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest mt-2">Authority XP</p>
        </div>
      </div>

      <div className="bg-glass p-8 rounded-[2.5rem] mb-12">
         <h3 className="text-white font-black text-xl italic mb-6">Network Progress</h3>
         <div className="space-y-6">
            <div>
               <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                  <span className="text-gray-400">Next Level: A4 Vanguard</span>
                  <span className="text-brand">62%</span>
               </div>
               <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand rounded-full shadow-brand" style={{ width: '62%' }} />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col gap-1">
                  <span className="text-gray-600 text-[10px] font-bold uppercase">Nodes Visited</span>
                  <span className="text-white font-black text-lg">14 / 25</span>
               </div>
               <div className="flex flex-col gap-1 text-right">
                  <span className="text-gray-600 text-[10px] font-bold uppercase">Total Spend</span>
                  <span className="text-white font-black text-lg">12.5K NC</span>
               </div>
            </div>
         </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-white font-black text-xl italic px-2">Role Simulation</h3>
        <p className="text-gray-600 text-xs px-2 mb-4 italic">Investors: Test the specialized staff terminal interfaces here.</p>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(UserRole).filter(r => r !== UserRole.Guest).map(role => (
            <button 
              key={role} 
              onClick={() => onLogin(role as UserRole)}
              className="bg-white/5 hover:bg-white/10 border border-white/5 py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest text-white transition-all hover:border-brand/40"
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
