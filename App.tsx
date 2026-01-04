
import React, { useState, useEffect } from 'react';
import { Tab, User, UserRole, Venue, SystemLog } from './types';
import { mockUser, venues, staffIdentities, initialLogs } from './services/mockData';
import Header from './components/Header';
import HomeTab from './tabs/HomeTab';
import RadioTab from './tabs/RadioTab';
import NetworkTab from './tabs/NetworkTab';
import ProfileTab from './tabs/ProfileTab';
import StaffTerminals from './tabs/StaffTerminals';
import AdminDashboard from './tabs/AdminDashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [activeVenue, setActiveVenue] = useState<Venue | null>(null);
  const [logs, setLogs] = useState<SystemLog[]>(initialLogs);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const addLog = (type: SystemLog['type'], message: string) => {
    const newLog: SystemLog = { 
      id: Math.random().toString(36).substr(2, 9), 
      type, 
      message, 
      timestamp: new Date() 
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  };

  const handleEnterVenue = (venueId: number) => {
    const venue = venues.find(v => v.id === venueId);
    if (venue) {
      setActiveVenue(venue);
      addLog('NODE_SYNC', `Passport Bridge established: ${venue.name}`);
      setNotification(`NODE CONNECTED: ${venue.name.toUpperCase()}`);
    }
  };

  const handleExitVenue = () => {
    if (activeVenue) {
      addLog('NODE_SYNC', `Terminated bridge to ${activeVenue.name}`);
      setActiveVenue(null);
      setNotification('RETURNED TO GLOBAL CORE');
    }
  };

  const handleLogin = (role: UserRole) => {
    const identity = staffIdentities[role];
    if (identity) {
      setUser(prev => ({ ...prev, ...identity } as User));
      setActiveTab(Tab.Profile);
      setNotification(`AUTH SUCCESS: ${role.toUpperCase()}`);
    }
  };

  const handleLogout = () => {
    setUser(mockUser);
    setActiveVenue(null);
    setActiveTab(Tab.Home);
    setNotification('SESSION TERMINATED');
  };

  const themeStyles = {
    '--brand-primary': activeVenue ? activeVenue.brandColor : '#a855f7',
    '--brand-glow': activeVenue ? `${activeVenue.brandColor}44` : '#a855f744',
  } as React.CSSProperties;

  const renderView = () => {
    // Professional/Admin Views
    if (user.role === UserRole.BarTerminal || user.role === UserRole.DoorOps) {
      return <StaffTerminals user={user} onLogout={handleLogout} addLog={addLog} />;
    }
    
    if (user.role === UserRole.VenueAdmin || user.role === UserRole.NiteAdmin) {
      return <AdminDashboard user={user} logs={logs} onLogout={handleLogout} />;
    }

    // Consumer/Guest Views
    switch (activeTab) {
      case Tab.Home: 
        return <HomeTab user={user} activeVenue={activeVenue} onEnterVenue={handleEnterVenue} onExitVenue={handleExitVenue} />;
      case Tab.Radio: 
        return <RadioTab />;
      case Tab.Network: 
        return <NetworkTab />;
      case Tab.Profile: 
        return <ProfileTab user={user} onLogin={handleLogin} onLogout={handleLogout} />;
      default: 
        return <HomeTab user={user} activeVenue={activeVenue} onEnterVenue={handleEnterVenue} onExitVenue={handleExitVenue} />;
    }
  };

  // Determine if we show the global navigation header
  const isConsumerView = user.role === UserRole.Guest;

  return (
    <div className="bg-black text-white min-h-screen font-sans transition-colors duration-700 overflow-x-hidden selection:bg-purple-500/30" style={themeStyles}>
      {/* System Notification Overlay */}
      {notification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-fade-in-down pointer-events-none">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 px-8 py-4 rounded-full shadow-[0_0_40px_var(--brand-glow)]">
             <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-brand rounded-full animate-pulse shadow-[0_0_10px_var(--brand-primary)]" />
                <span className="text-[10px] font-mono tracking-[0.3em] font-black text-white uppercase">{notification}</span>
             </div>
          </div>
        </div>
      )}

      <main className={`${isConsumerView ? 'pb-24' : ''} transition-opacity duration-500`}>
        {renderView()}
      </main>

      {isConsumerView && (
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      <style>{`
        :root {
          --brand-primary: #a855f7;
          --brand-glow: #a855f744;
        }
        .text-brand { color: var(--brand-primary); }
        .bg-brand { background-color: var(--brand-primary); }
        .border-brand { border-color: var(--brand-primary); }
        .shadow-brand { box-shadow: 0 0 20px var(--brand-glow); }
        .bg-glass { 
          background-color: rgba(255,255,255,0.02); 
          backdrop-filter: blur(20px); 
          border: 1px solid rgba(255,255,255,0.08); 
        }
        
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translate(-50%, -15px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.5s cubic-bezier(0.19, 1, 0.22, 1); }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default App;
