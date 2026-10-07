import React from 'react';
import { ArrowLeft, RotateCw } from 'lucide-react';
import { ScreenType, TicketDetails } from '../types';

interface MyBookingsScreenProps {
  ticketDetails: TicketDetails;
  onNavigate: (screen: ScreenType) => void;
}

export const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({ ticketDetails, onNavigate }) => {
  // Format selected date into: "Fri, 19 Jun 26" / "Sun, 19 Jul 26" style based on state
  const formatTicketDate = (date: Date): string => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[date.getDay()];
    const dateNum = date.getDate();
    const monthName = months[date.getMonth()];
    const yearTwoDigit = String(date.getFullYear()).substring(2);
    
    return `${dayName}, ${dateNum} ${monthName} ${yearTwoDigit}`;
  };

  const formattedDate = formatTicketDate(ticketDetails.bookingDate);

  return (
    <div className="flex flex-col h-full bg-white justify-between select-none relative pb-[60px]">
      
      {/* Top Header Bar - Exactly as Image 3 */}
      <div className="bg-[#0070f3] text-white px-5 py-4 flex items-center justify-between shadow-md">
        <button 
          onClick={() => onNavigate('home')}
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft size={18} className="text-white" strokeWidth={2.5} />
        </button>
        
        <h1 className="text-white font-bold text-[20px] tracking-wide font-sans">
          My Bookings
        </h1>
        
        {/* Sorting icon exactly as in Image 3 */}
        <button 
          onClick={() => alert("Sorting bookings...")}
          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full active:scale-95 transition-all text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M7 4v16M3 16l4 4 4-4" />
            <path d="M15 6h6M15 12h4M15 18h2" />
          </svg>
        </button>
      </div>

      {/* Main Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        
        {/* Subtitle Header with Refresh - Exactly as Image 3 */}
        <div className="flex items-center justify-between mt-1 mb-4 select-none">
          <span className="text-[#f2994a] font-bold text-[15px] tracking-wide">
            Upcoming (1)
          </span>
          <button 
            onClick={() => alert("Bookings refreshed.")}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
          >
            <RotateCw size={17} className="text-slate-400" />
          </button>
        </div>

        {/* Ticket Container (Relative, with no overflow-hidden so notches can protrude) */}
        <div className="relative w-full bg-white rounded-[18px] border-2 border-[#f2a154] shadow-sm select-none p-5 pb-3">
          
          {/* Left Circular Inward Cutout Notch with White Cover Mask */}
          <div className="absolute -left-[14px] top-[138px] w-7 h-7 rounded-full bg-white border border-[#f2a154] z-20"></div>
          <div className="absolute -left-[24px] top-[138px] w-[14px] h-8 bg-white z-30"></div>

          {/* Right Circular Inward Cutout Notch with White Cover Mask */}
          <div className="absolute -right-[14px] top-[138px] w-7 h-7 rounded-full bg-white border border-[#f2a154] z-20"></div>
          <div className="absolute -right-[24px] top-[138px] w-[14px] h-8 bg-white z-30"></div>

          {/* Top Row: Unreserved Badge & UTS Code */}
          <div className="flex justify-between items-center mb-4">
            <span className="bg-[#f0e7f6] text-[#a855f7] px-4 py-1.5 rounded-[10px] text-xs font-bold tracking-wide">
              {ticketDetails.ticketType || 'Unreserved'}
            </span>
            <div className="flex items-center text-xs font-semibold">
              <span className="text-slate-500 font-medium text-[11px] uppercase tracking-wider">UTS: </span>
              <span className="text-slate-900 font-extrabold ml-1 tracking-wider font-mono text-[13px]">
                {ticketDetails.utsCode || 'X00KEDX1D6'}
              </span>
            </div>
          </div>

          {/* Ticket Info Grid (Ticket Type & Booking Date) */}
          <div className="grid grid-cols-2 gap-y-1 mb-3">
            <div>
              <p className="text-[#94a3b8] text-[11px] font-medium tracking-wide">
                Ticket Type
              </p>
              <p className="text-slate-900 text-sm font-extrabold mt-0.5 font-sans">
                JOURNEY
              </p>
            </div>
            <div className="text-right">
              <p className="text-[#94a3b8] text-[11px] font-medium tracking-wide">
                Booking Date
              </p>
              <p className="text-slate-900 text-sm font-extrabold mt-0.5 font-sans">
                {formattedDate}
              </p>
            </div>
          </div>

          {/* Stations Row - dynamically reflects source & destination */}
          <div className="flex items-center justify-between mt-2 mb-2">
            <div>
              <p className="text-slate-900 text-sm font-extrabold tracking-wide font-sans">
                {ticketDetails.source || 'KALYAN JN.'}
              </p>
            </div>
            
            {/* Center Distance Separator */}
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold px-2">
              <span className="text-slate-300 font-light">—</span>
              <span className="text-[11px] font-bold text-slate-400">
                {ticketDetails.distanceKm || 38} km
              </span>
              <span className="text-slate-300 font-light">—</span>
            </div>

            <div>
              <p className="text-slate-900 text-sm font-extrabold tracking-wide font-sans text-right">
                {ticketDetails.destination || 'KURLA JN.'}
              </p>
            </div>
          </div>

          {/* Dashed Separator Line - Exactly as in Image 3 */}
          <div className="h-6 flex items-center select-none my-1">
            <div className="w-full border-t border-dashed border-[#f2a154] mx-1"></div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-around py-2.5 select-none">
            <button 
              onClick={() => alert(`Starting a new booking for ${ticketDetails.source} to ${ticketDetails.destination}...`)}
              className="flex-1 text-center text-[#0066ff] text-[15px] font-bold hover:opacity-85 active:scale-95 transition-all cursor-pointer"
            >
              Book Again
            </button>
            <div className="h-5 w-[1px] bg-slate-200"></div>
            <button 
              onClick={() => alert(`Ticket reference UTS: ${ticketDetails.utsCode}\nRoute: ${ticketDetails.source} ➔ ${ticketDetails.destination}\nDistance: ${ticketDetails.distanceKm} km\nBooking Date: ${formattedDate}\nTime: ${ticketDetails.timeString}`)}
              className="flex-1 text-center text-[#0066ff] text-[15px] font-bold hover:opacity-85 active:scale-95 transition-all cursor-pointer"
            >
              View Details
            </button>
          </div>

        </div>

      </div>

      {/* Bookings Categories Bottom Container - Exactly as Image 3 */}
      <div className="w-full bg-[#e3f2fd] rounded-t-[24px] p-4 flex justify-between gap-3 border-t border-blue-100/40 select-none z-40 shadow-inner">
        
        {/* 1. Upcoming Category (Active) */}
        <button className="flex-1 bg-white rounded-2xl py-3 px-1.5 flex flex-col items-center justify-center shadow-sm border border-[#f2a154]/25">
          {/* Custom yellow horizontal ticket with black outline */}
          <svg viewBox="0 0 24 24" className="w-6 h-6 mb-1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20C21.1 6 22 6.9 22 8V10C21 10 20.2 10.8 20.2 12C20.2 13.2 21 14 22 14V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V14C3 14 3.8 13.2 3.8 12C3.8 10.8 3 10 2 10V8C2 6.9 2.9 6 4 6Z" fill="#ffb800" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="9" y1="10" x2="9" y2="14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="13" y1="10" x2="13" y2="14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="17" y1="10" x2="17" y2="14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-[#e28743] text-[10px] font-extrabold tracking-wide uppercase">
            Upcoming
          </span>
        </button>

        {/* 2. Completed Category */}
        <button 
          onClick={() => alert("No completed bookings found.")}
          className="flex-1 rounded-2xl py-3 px-1.5 flex flex-col items-center justify-center hover:bg-white/10 active:scale-95 transition-all text-slate-500 hover:text-slate-700"
        >
          {/* Custom grey ticket with a tick */}
          <svg viewBox="0 0 24 24" className="w-6 h-6 mb-1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20C21.1 6 22 6.9 22 8V10C21 10 20.2 10.8 20.2 12C20.2 13.2 21 14 22 14V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V14C3 14 3.8 13.2 3.8 12C3.8 10.8 3 10 2 10V8C2 6.9 2.9 6 4 6Z" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 12L11 14L15 10" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-slate-500 text-[10px] font-bold tracking-wide">
            Completed
          </span>
        </button>

        {/* 3. Cancelled Category */}
        <button 
          onClick={() => alert("No cancelled bookings found.")}
          className="flex-1 rounded-2xl py-3 px-1.5 flex flex-col items-center justify-center hover:bg-white/10 active:scale-95 transition-all text-slate-500 hover:text-slate-700"
        >
          {/* Custom grey ticket with a cross */}
          <svg viewBox="0 0 24 24" className="w-6 h-6 mb-1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20C21.1 6 22 6.9 22 8V10C21 10 20.2 10.8 20.2 12C20.2 13.2 21 14 22 14V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V14C3 14 3.8 13.2 3.8 12C3.8 10.8 3 10 2 10V8C2 6.9 2.9 6 4 6Z" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 10L14 14M14 10L10 14" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-slate-500 text-[10px] font-bold tracking-wide">
            Cancelled
          </span>
        </button>

        {/* 4. All Category */}
        <button 
          onClick={() => alert("Showing all bookings. Currently only 1 upcoming booking exists.")}
          className="flex-1 rounded-2xl py-3 px-1.5 flex flex-col items-center justify-center hover:bg-white/10 active:scale-95 transition-all text-slate-500 hover:text-slate-700"
        >
          {/* Custom grey ticket with stacked lines */}
          <svg viewBox="0 0 24 24" className="w-6 h-6 mb-1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20C21.1 6 22 6.9 22 8V10C21 10 20.2 10.8 20.2 12C20.2 13.2 21 14 22 14V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V14C3 14 3.8 13.2 3.8 12C3.8 10.8 3 10 2 10V8C2 6.9 2.9 6 4 6Z" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="text-slate-500 text-[10px] font-bold tracking-wide">
            All
          </span>
        </button>

      </div>

    </div>
  );
};
