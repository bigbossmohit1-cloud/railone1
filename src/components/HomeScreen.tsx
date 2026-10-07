import React from 'react';
import { Bell, Search, FileText, Compass, MapPin, ClipboardList, Utensils, RefreshCw, HeartHandshake, Zap } from 'lucide-react';
import { ScreenType } from '../types';
import { ReservedIllustration, UnreservedIllustration, PlatformIllustration } from './Illustrations';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  // Unsplash images for the "Do You know?" scrollable section
  const doYouKnowCards = [
    {
      id: 1,
      title: "Steam Locomotive",
      image: "https://images.unsplash.com/photo-1532103054090-334e6e60ab29?auto=format&fit=crop&w=300&q=80",
      alt: "Vintage steam train"
    },
    {
      id: 2,
      title: "Scenic Rail Bridge",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=300&q=80",
      alt: "Train crossing a bridge over mountain valley"
    },
    {
      id: 3,
      title: "Emerald Mountain Route",
      image: "https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=300&q=80",
      alt: "Train passing through green hills"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between select-none relative pb-16">
      
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mt-1 mb-6">
          {/* Language Switcher Button (A/अ) */}
          <button 
            onClick={() => alert("Language changed successfully.")}
            className="w-10 h-10 rounded-full border border-blue-200 bg-white flex items-center justify-center text-[#1d4ed8] font-semibold text-xs shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
          >
            <div className="flex items-center gap-[1px]">
              <span className="font-sans text-[11px] font-bold">A</span>
              <span className="text-[11px] text-blue-500">/</span>
              <span className="font-serif text-[11px] font-semibold">अ</span>
            </div>
          </button>

          {/* Centered Logo */}
          <div className="flex items-center font-display text-[24px] tracking-tight leading-none select-none">
            <span className="font-light text-[#475569]">Rail</span>
            <span className="font-extrabold text-[#1e293b] flex items-center relative">
              <span className="relative inline-flex items-center justify-center">
                O
                <span className="absolute w-[5.5px] h-[5.5px] bg-[#ff512f] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
              </span>
              <span className="-ml-[0.5px]">ne</span>
            </span>
          </div>

          {/* Notifications Button */}
          <button 
            onClick={() => alert("You have 3 unread alerts.")}
            className="w-10 h-10 rounded-full border border-slate-100 bg-white flex items-center justify-center text-slate-700 shadow-sm relative hover:bg-slate-50 active:scale-95 transition-all"
          >
            <Bell size={18} strokeWidth={2.2} className="text-[#334155]" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[9px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm">
              3
            </span>
          </button>
        </div>

        {/* Welcome Greeting */}
        <div className="mb-5 select-none">
          <p className="text-[#0d2a54] text-[18px] font-extrabold tracking-tight">
            Hi, Nibhesh Garain!
          </p>
        </div>

        {/* Journey Planner Section */}
        <div className="mb-6">
          <h3 className="text-[#0d2a54] text-base font-bold tracking-tight mb-3">
            Journey Planner
          </h3>
          
          <div className="grid grid-cols-3 gap-2.5">
            {/* Card 1: Reserved */}
            <div 
              onClick={() => onNavigate('bookings')}
              className="flex flex-col items-center cursor-pointer active:scale-98 transition-transform group"
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 shadow-sm group-hover:shadow transition-shadow bg-[#e0f2fe]">
                <ReservedIllustration />
              </div>
              <span className="text-[#475569] text-xs font-medium mt-1.5 text-center">
                Reserved
              </span>
            </div>

            {/* Card 2: Unreserved */}
            <div 
              onClick={() => onNavigate('bookings')}
              className="flex flex-col items-center cursor-pointer active:scale-98 transition-transform group"
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 shadow-sm group-hover:shadow transition-shadow bg-[#fef2f2]">
                <UnreservedIllustration />
              </div>
              <span className="text-[#475569] text-xs font-medium mt-1.5 text-center">
                Unreserved
              </span>
            </div>

            {/* Card 3: Platform */}
            <div 
              onClick={() => alert("Platform ticket booking module clicked.")}
              className="flex flex-col items-center cursor-pointer active:scale-98 transition-transform group"
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 shadow-sm group-hover:shadow transition-shadow bg-[#f3f4f6]">
                <PlatformIllustration />
              </div>
              <span className="text-[#475569] text-xs font-medium mt-1.5 text-center">
                Platform
              </span>
            </div>
          </div>
        </div>

        {/* More Offerings Section */}
        <div className="mb-6">
          <h3 className="text-[#0d2a54] text-base font-bold tracking-tight mb-3">
            More Offerings
          </h3>

          <div className="grid grid-cols-4 gap-x-2 gap-y-4">
            
            {/* 1. Search Trains */}
            <div 
              onClick={() => alert("Searching trains module...")}
              className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100/60 shadow-sm">
                <Search size={22} className="text-rose-500" />
              </div>
              <span className="text-[#334155] text-[10px] font-semibold mt-2 text-center leading-tight max-w-[64px]">
                Search Trains
              </span>
            </div>

            {/* 2. PNR Status */}
            <div 
              onClick={() => alert("Checking PNR Status...")}
              className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100/60 shadow-sm">
                <FileText size={22} className="text-emerald-500" />
              </div>
              <span className="text-[#334155] text-[10px] font-semibold mt-2 text-center leading-tight max-w-[64px]">
                PNR Status
              </span>
            </div>

            {/* 3. Coach Position */}
            <div 
              onClick={() => alert("Checking Coach Position...")}
              className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center border border-sky-100/60 shadow-sm">
                <Compass size={22} className="text-sky-500" />
              </div>
              <span className="text-[#334155] text-[10px] font-semibold mt-2 text-center leading-tight max-w-[64px]">
                Coach Position
              </span>
            </div>

            {/* 4. Track Your Train */}
            <div 
              onClick={() => alert("Tracking Train Live Position...")}
              className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100/60 shadow-sm">
                <MapPin size={22} className="text-amber-500" />
              </div>
              <span className="text-[#334155] text-[10px] font-semibold mt-2 text-center leading-tight max-w-[64px]">
                Track Your Train
              </span>
            </div>

            {/* 5. Order Food */}
            <div 
              onClick={() => alert("Food delivery on train module...")}
              className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100/60 shadow-sm">
                <Utensils size={22} className="text-indigo-500" />
              </div>
              <span className="text-[#334155] text-[10px] font-semibold mt-2 text-center leading-tight max-w-[64px]">
                Order Food
              </span>
            </div>

            {/* 6. File Refund */}
            <div 
              onClick={() => alert("Filing ticket cancellation refund...")}
              className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200/60 shadow-sm">
                <RefreshCw size={21} className="text-slate-600" />
              </div>
              <span className="text-[#334155] text-[10px] font-semibold mt-2 text-center leading-tight max-w-[64px]">
                File Refund
              </span>
            </div>

            {/* 7. Rail Madad */}
            <div 
              onClick={() => alert("Opening Rail Madad helpdesk portal...")}
              className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100/60 shadow-sm">
                <HeartHandshake size={22} className="text-rose-500" />
              </div>
              <span className="text-[#334155] text-[10px] font-semibold mt-2 text-center leading-tight max-w-[64px]">
                Rail Madad
              </span>
            </div>

            {/* 8. Go To WAVES */}
            <div 
              onClick={() => alert("Navigating to WAVES digital railway platform...")}
              className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-[#4c5d80] rounded-2xl flex items-center justify-center border border-slate-700/30 shadow-sm">
                <Zap size={22} className="text-white" />
              </div>
              <span className="text-[#334155] text-[10px] font-semibold mt-2 text-center leading-tight max-w-[64px]">
                Go To WAVES
              </span>
            </div>

          </div>
        </div>

        {/* Do You Know? Section */}
        <div className="mb-4">
          <h3 className="text-[#0d2a54] text-base font-bold tracking-tight mb-3">
            Do You know?
          </h3>
          
          {/* Horizontal scroll cards */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
            {doYouKnowCards.map((card) => (
              <div 
                key={card.id} 
                className="w-48 h-32 rounded-2xl overflow-hidden shrink-0 snap-start shadow-sm border border-slate-100/80 relative"
              >
                <img 
                  src={card.image} 
                  alt={card.alt} 
                  className="w-full h-full object-cover brightness-[0.85]" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2.5">
                  <p className="text-white font-semibold text-[10px] tracking-wide truncate">
                    {card.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
