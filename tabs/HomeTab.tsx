
import React from 'react';
import { User, Venue, Product } from '../types';
import { niteMarketProducts, venues } from '../services/mockData';

interface HomeTabProps {
  user: User;
  activeVenue: Venue | null;
  onEnterVenue: (id: number) => void;
  onExitVenue: () => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ user, activeVenue, onEnterVenue, onExitVenue }) => {
  return (
    <div className="p-6 pt-12 max-w-lg mx-auto">
      {/* Dynamic Header */}
      <header className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">
            {activeVenue ? activeVenue.name : 'NiteOS'}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${activeVenue ? 'bg-brand animate-pulse' : 'bg-gray-700'}`} />
            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">
              {activeVenue ? 'Connected Node' : 'Global Core Passport'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-brand font-black text-3xl leading-none">{user.ncBalance.toLocaleString()}</p>
          <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest mt-1">NiteCoins</p>
        </div>
      </header>

      {activeVenue ? (
        /* VENUE NODE UI */
        <div className="space-y-8 animate-fade-in">
          <section className="bg-glass p-8 rounded-[2rem] shadow-brand">
            <h2 className="text-white font-bold mb-6 text-xl tracking-tight">Node Services</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-brand text-white p-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">Instant Order</button>
              <button className="bg-white/5 text-white p-6 rounded-2xl font-bold text-xs uppercase tracking-widest">Friends Radar</button>
              <button className="bg-white/5 text-white p-6 rounded-2xl font-bold text-xs uppercase tracking-widest">Vibe Guide (AI)</button>
              <button onClick={onExitVenue} className="bg-red-500/10 text-red-500 border border-red-500/20 p-6 rounded-2xl font-bold text-xs uppercase tracking-widest">Exit Node</button>
            </div>
          </section>

          <section>
             <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="text-white font-bold text-xl">Secret Menu</h3>
                <span className="text-[10px] text-gray-500 font-mono uppercase">Level 5 Required</span>
             </div>
             <div className="space-y-4">
                {activeVenue.secretItems.map(item => (
                  <div key={item.id} className="bg-white/5 border border-white/10 p-5 rounded-3xl flex justify-between items-center group hover:border-brand/30 transition-colors">
                    <div>
                      <p className="text-white font-bold">{item.name}</p>
                      <p className="text-gray-500 text-xs mt-1">{item.description}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-brand font-bold">{item.price} NC</p>
                       <button className="mt-2 bg-brand/10 text-brand text-[10px] px-3 py-1 rounded-full font-bold uppercase">Order</button>
                    </div>
                  </div>
                ))}
             </div>
          </section>
        </div>
      ) : (
        /* GLOBAL CORE UI */
        <div className="space-y-12 animate-fade-in">
          {/* NiteMarket */}
          <section>
            <div className="flex justify-between items-end mb-6 px-2">
              <h2 className="text-white font-black text-2xl italic">NiteMarket</h2>
              <p className="text-brand text-[10px] font-bold uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full">New Drops</p>
            </div>
            <div className="flex overflow-x-auto gap-6 no-scrollbar -mx-2 px-2">
              {niteMarketProducts.map(product => (
                <div key={product.id} className="flex-shrink-0 w-72 bg-glass p-6 rounded-[2.5rem] group hover:border-brand/40 transition-all">
                  <div className="h-44 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] mb-6 flex items-center justify-center">
                     <div className="w-16 h-16 border-2 border-white/5 rounded-full animate-spin-slow" />
                  </div>
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">{product.vendorName}</p>
                  <h3 className="text-white font-bold text-lg mb-4">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-brand font-black text-xl">{product.price} NC</p>
                    <button className="bg-white text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand hover:text-white transition-colors">Buy</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Discovery */}
          <section>
            <h2 className="text-white font-black text-2xl italic mb-6 px-2">Connect to Node</h2>
            <div className="space-y-4">
              {venues.map(venue => (
                <button 
                  key={venue.id} 
                  onClick={() => onEnterVenue(venue.id)}
                  className="w-full bg-glass hover:scale-[1.02] active:scale-[0.98] transition-all p-6 rounded-[2rem] flex items-center gap-6"
                >
                  <div className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-xl text-black shadow-lg" style={{ backgroundColor: venue.brandColor }}>
                    {venue.name.charAt(0)}
                  </div>
                  <div className="text-left flex-grow">
                    <p className="text-white font-black text-lg uppercase tracking-tight">{venue.name}</p>
                    <p className="text-gray-500 text-xs font-mono">{venue.location} · {venue.activeGuests} GUESTS</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                     <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default HomeTab;
