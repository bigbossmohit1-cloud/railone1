import React, { useState } from 'react';
import { Home, Tickets, User, Menu } from 'lucide-react';
import { ScreenType, TicketDetails } from './types';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { MyBookingsScreen } from './components/MyBookingsScreen';
import { MenuScreen } from './components/MenuScreen';
import { ProfileScreen } from './components/ProfileScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');

  // Complete customizable ticket details state (initialized to Kalyan to Kurla on 19 Jul 2026)
  const [ticketDetails, setTicketDetails] = useState<TicketDetails>({
    bookingDate: new Date(2026, 6, 19), // 19 July 2026
    timeString: '10:45 AM',
    source: 'KALYAN JN.',
    destination: 'KURLA JN.',
    distanceKm: 38,
    ticketType: 'Unreserved',
    utsCode: 'X00KEDX1D6',
  });

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('home');
  };

  const handleUpdateTicketDetails = (updated: Partial<TicketDetails>) => {
    setTicketDetails((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900/90 flex flex-col items-center justify-center p-0 sm:p-4 select-none font-sans relative overflow-hidden">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#f5a623]/10 rounded-full filter blur-[100px] -z-10 pointer-events-none"></div>

      {/* Main Container - Responsive Smart Phone Mockup Frame */}
      <div className="w-full sm:w-[380px] h-screen sm:h-[780px] sm:max-h-[820px] bg-slate-50 sm:rounded-[36px] sm:shadow-2xl sm:ring-[12px] sm:ring-slate-950/90 sm:border-4 sm:border-slate-800 relative flex flex-col overflow-hidden">
        
        {/* Device Speaker & Camera Notch (Only visible on framed view) */}
        <div className="hidden sm:block absolute top-0 inset-x-0 h-6 bg-slate-950/90 z-50 rounded-b-xl">
          <div className="w-24 h-4 bg-black mx-auto rounded-full mt-1.5 flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
            <div className="w-10 h-1 bg-slate-900 rounded-full"></div>
          </div>
        </div>

        {/* Content Viewport */}
        <div className="flex-1 flex flex-col h-full pt-0 sm:pt-6 relative">
          
          {/* Unauthenticated View */}
          {!isLoggedIn ? (
            <LoginScreen onLoginSuccess={handleLoginSuccess} />
          ) : (
            /* Authenticated Views */
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              
              <div className="flex-1 overflow-hidden">
                {currentScreen === 'home' && (
                  <HomeScreen onNavigate={(screen) => setCurrentScreen(screen)} />
                )}
                {currentScreen === 'bookings' && (
                  <MyBookingsScreen 
                    ticketDetails={ticketDetails} 
                    onNavigate={(screen) => setCurrentScreen(screen)} 
                  />
                )}
                {currentScreen === 'menu' && (
                  <MenuScreen 
                    ticketDetails={ticketDetails} 
                    onUpdateTicketDetails={handleUpdateTicketDetails} 
                    onNavigate={(screen) => setCurrentScreen(screen)} 
                  />
                )}
                {currentScreen === 'profile' && (
                  <ProfileScreen onLogout={handleLogout} />
                )}
              </div>

              {/* Bottom Persistent Navigation Bar (Styled exactly like Image 2) */}
              <div className="absolute bottom-0 inset-x-0 h-15 bg-[#0070f3] flex items-center justify-around z-50 shadow-inner">
                
                {/* 1. Home Tab */}
                <button
                  onClick={() => setCurrentScreen('home')}
                  className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 cursor-pointer ${
                    currentScreen === 'home' 
                      ? 'text-white scale-105 font-bold' 
                      : 'text-white/65 hover:text-white/90 font-medium'
                  }`}
                >
                  <Home size={20} strokeWidth={currentScreen === 'home' ? 2.5 : 1.8} />
                  <span className="text-[9px] mt-1 tracking-wider">
                    Home
                  </span>
                </button>

                {/* 2. My Bookings Tab */}
                <button
                  onClick={() => setCurrentScreen('bookings')}
                  className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 cursor-pointer ${
                    currentScreen === 'bookings' 
                      ? 'text-white scale-105 font-bold' 
                      : 'text-white/65 hover:text-white/90 font-medium'
                  }`}
                >
                  <Tickets size={20} strokeWidth={currentScreen === 'bookings' ? 2.5 : 1.8} />
                  <span className="text-[9px] mt-1 tracking-wider">
                    My Bookings
                  </span>
                </button>

                {/* 3. You Tab (Profile) */}
                <button
                  onClick={() => setCurrentScreen('profile')}
                  className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 cursor-pointer ${
                    currentScreen === 'profile' 
                      ? 'text-white scale-105 font-bold' 
                      : 'text-white/65 hover:text-white/90 font-medium'
                  }`}
                >
                  <User size={20} strokeWidth={currentScreen === 'profile' ? 2.5 : 1.8} />
                  <span className="text-[9px] mt-1 tracking-wider">
                    You
                  </span>
                </button>

                {/* 4. Menu Tab (Ticket Date, Time, Month, Year, Source & Destination Customizer) */}
                <button
                  onClick={() => setCurrentScreen('menu')}
                  className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 cursor-pointer ${
                    currentScreen === 'menu' 
                      ? 'text-white scale-105 font-bold' 
                      : 'text-white/65 hover:text-white/90 font-medium'
                  }`}
                >
                  <Menu size={20} strokeWidth={currentScreen === 'menu' ? 2.5 : 1.8} />
                  <span className="text-[9px] mt-1 tracking-wider">
                    Menu
                  </span>
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
