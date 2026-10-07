import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRightLeft, 
  Check, 
  Info, 
  Sparkles, 
  RotateCcw,
  Navigation,
  Train
} from 'lucide-react';
import { ScreenType, TicketDetails } from '../types';

interface MenuScreenProps {
  ticketDetails: TicketDetails;
  onUpdateTicketDetails: (updated: Partial<TicketDetails>) => void;
  onNavigate: (screen: ScreenType) => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const POPULAR_STATIONS = [
  { name: 'KALYAN JN.', short: 'KYN' },
  { name: 'KURLA JN.', short: 'CLA' },
  { name: 'CSMT MUMBAI', short: 'CSMT' },
  { name: 'THANE', short: 'TNA' },
  { name: 'DADAR CENTRAL', short: 'DR' },
  { name: 'PANVEL', short: 'PNVL' },
  { name: 'NEW DELHI', short: 'NDLS' },
  { name: 'PRAYAGRAJ JN.', short: 'PRYJ' },
  { name: 'HOWRAH JN.', short: 'HWH' },
  { name: 'PUNE JN.', short: 'PUNE' },
  { name: 'AHMEDABAD JN.', short: 'ADI' }
];

export const MenuScreen: React.FC<MenuScreenProps> = ({ 
  ticketDetails, 
  onUpdateTicketDetails, 
  onNavigate 
}) => {
  // Local active tab within Menu editor
  const [activeTab, setActiveTab] = useState<'datetime' | 'stations'>('datetime');

  // Working values for year, month, day, time
  const currentYear = ticketDetails.bookingDate.getFullYear();
  const currentMonth = ticketDetails.bookingDate.getMonth(); // 0-11
  const currentDay = ticketDetails.bookingDate.getDate();

  // Controlled station inputs
  const [sourceInput, setSourceInput] = useState(ticketDetails.source);
  const [destInput, setDestInput] = useState(ticketDetails.destination);
  const [distanceKmInput, setDistanceKmInput] = useState(ticketDetails.distanceKm.toString());
  const [timeInput, setTimeInput] = useState(ticketDetails.timeString || '10:45 AM');
  const [savedBanner, setSavedBanner] = useState<string | null>(null);

  // Month & Year picker state
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

  // Years range (e.g., 2024 to 2030)
  const availableYears = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

  // Calculate calendar days in selectedMonth of selectedYear
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayWeekday = new Date(selectedYear, selectedMonth, 1).getDay(); // 0 is Sunday
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Handle day click
  const handleDaySelect = (day: number) => {
    const newDate = new Date(selectedYear, selectedMonth, day);
    onUpdateTicketDetails({ bookingDate: newDate });
    showBanner(`Date updated to ${day} ${MONTH_NAMES[selectedMonth]} ${selectedYear}`);
  };

  // Quick preset dates
  const handleQuickPreset = (preset: 'today' | 'tomorrow' | 'july19_2026') => {
    let d: Date;
    if (preset === 'today') {
      d = new Date();
    } else if (preset === 'tomorrow') {
      d = new Date();
      d.setDate(d.getDate() + 1);
    } else {
      d = new Date(2026, 6, 19); // 19 July 2026
    }
    setSelectedYear(d.getFullYear());
    setSelectedMonth(d.getMonth());
    onUpdateTicketDetails({ bookingDate: d });
    showBanner(`Date set to ${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`);
  };

  // Swap source & destination
  const handleSwapStations = () => {
    const temp = sourceInput;
    setSourceInput(destInput);
    setDestInput(temp);
    onUpdateTicketDetails({
      source: destInput,
      destination: temp
    });
    showBanner('Source and Destination swapped!');
  };

  // Save station changes
  const handleSaveStations = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const distNum = parseInt(distanceKmInput, 10) || 38;
    onUpdateTicketDetails({
      source: sourceInput.toUpperCase().trim() || 'KALYAN JN.',
      destination: destInput.toUpperCase().trim() || 'KURLA JN.',
      distanceKm: distNum
    });
    showBanner('Stations & Route updated successfully!');
  };

  // Save time change
  const handleSaveTime = (newTime: string) => {
    setTimeInput(newTime);
    onUpdateTicketDetails({ timeString: newTime });
    showBanner(`Booking time updated to ${newTime}`);
  };

  // Reset to default original image matching ticket
  const handleResetToDefault = () => {
    const defaultDate = new Date(2026, 6, 19);
    setSelectedYear(2026);
    setSelectedMonth(6);
    setSourceInput('KALYAN JN.');
    setDestInput('KURLA JN.');
    setDistanceKmInput('38');
    setTimeInput('10:45 AM');
    onUpdateTicketDetails({
      bookingDate: defaultDate,
      timeString: '10:45 AM',
      source: 'KALYAN JN.',
      destination: 'KURLA JN.',
      distanceKm: 38
    });
    showBanner('Reset back to Kalyan Jn. ➔ Kurla Jn. (19 Jul 2026)');
  };

  const showBanner = (msg: string) => {
    setSavedBanner(msg);
    setTimeout(() => {
      setSavedBanner(null);
    }, 2500);
  };

  const isDaySelected = (day: number) => {
    return (
      ticketDetails.bookingDate.getDate() === day &&
      ticketDetails.bookingDate.getMonth() === selectedMonth &&
      ticketDetails.bookingDate.getFullYear() === selectedYear
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] justify-between select-none relative pb-16">
      
      {/* Top Header */}
      <div className="bg-[#0070f3] text-white px-5 py-3.5 flex items-center justify-between shadow-md">
        <button 
          onClick={handleResetToDefault}
          title="Reset to default ticket"
          className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all text-white/90"
        >
          <RotateCcw size={15} />
        </button>

        <h1 className="text-white font-bold text-[17px] tracking-wide flex items-center gap-2">
          <span>Ticket Customizer</span>
        </h1>

        <button 
          onClick={() => onNavigate('bookings')}
          className="text-white text-xs font-bold bg-white/20 hover:bg-white/30 px-2.5 py-1.5 rounded-lg active:scale-95 transition-all flex items-center gap-1"
        >
          View Ticket
        </button>
      </div>

      {/* Floating Save Notification Banner */}
      {savedBanner && (
        <div className="absolute top-14 inset-x-4 z-50 bg-emerald-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
          <Check size={16} strokeWidth={3} className="shrink-0" />
          <span className="truncate">{savedBanner}</span>
        </div>
      )}

      {/* Sub-tabs: Date/Time vs Source/Destination */}
      <div className="bg-white border-b border-slate-200 px-5 pt-3 pb-0 flex gap-4">
        <button
          onClick={() => setActiveTab('datetime')}
          className={`flex items-center gap-1.5 pb-2.5 text-xs font-bold transition-all relative cursor-pointer ${
            activeTab === 'datetime' ? 'text-[#0070f3]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Calendar size={15} />
          <span>Date, Month, Year & Time</span>
          {activeTab === 'datetime' && (
            <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-[#0070f3] rounded-full"></div>
          )}
        </button>

        <button
          onClick={() => setActiveTab('stations')}
          className={`flex items-center gap-1.5 pb-2.5 text-xs font-bold transition-all relative cursor-pointer ${
            activeTab === 'stations' ? 'text-[#0070f3]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <MapPin size={15} />
          <span>Source & Destination</span>
          {activeTab === 'stations' && (
            <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-[#0070f3] rounded-full"></div>
          )}
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        
        {/* Live Synchronization Info Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-3.5 shadow-sm flex items-start gap-3">
          <Sparkles size={18} className="text-[#0070f3] shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-blue-900 text-[11px] font-bold uppercase tracking-wider">
              Live Real-Time Sync Active
            </p>
            <p className="text-blue-700 text-[11px] leading-relaxed mt-0.5">
              Any changes you make here will immediately update the ticket in <strong>My Bookings</strong>.
            </p>
          </div>
        </div>

        {/* Tab 1: Date, Month, Year & Time */}
        {activeTab === 'datetime' && (
          <div className="space-y-4">

            {/* Current Selected Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Currently Active Ticket Schedule
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-900 text-base font-extrabold flex items-center gap-1.5 font-sans">
                    <Calendar size={17} className="text-[#0070f3]" />
                    <span>
                      {ticketDetails.bookingDate.toLocaleDateString('en-US', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="text-slate-500 text-xs font-semibold mt-1 flex items-center gap-1">
                    <Clock size={13} className="text-slate-400" />
                    <span>Time: {ticketDetails.timeString}</span>
                  </div>
                </div>

                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                  Synchronized
                </span>
              </div>
            </div>

            {/* Month & Year Selectors */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-800 text-xs font-bold uppercase tracking-wide">
                  Select Month & Year
                </span>
                
                {/* Quick Preset Buttons */}
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleQuickPreset('july19_2026')}
                    className="text-[10px] bg-blue-50 text-[#0070f3] hover:bg-blue-100 font-bold px-2 py-1 rounded-md transition-colors"
                  >
                    Jul 2026
                  </button>
                  <button
                    onClick={() => handleQuickPreset('today')}
                    className="text-[10px] bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold px-2 py-1 rounded-md transition-colors"
                  >
                    Today
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {/* Month Dropdown */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Month
                  </label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => {
                      const newM = parseInt(e.target.value, 10);
                      setSelectedMonth(newM);
                      // Update ticket date with same day or clamp to max days
                      const maxDays = new Date(selectedYear, newM + 1, 0).getDate();
                      const dayToUse = Math.min(currentDay, maxDays);
                      const updated = new Date(selectedYear, newM, dayToUse);
                      onUpdateTicketDetails({ bookingDate: updated });
                      showBanner(`Month changed to ${MONTH_NAMES[newM]}`);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0070f3] cursor-pointer"
                  >
                    {MONTH_NAMES.map((m, idx) => (
                      <option key={m} value={idx}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year Dropdown */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Year
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => {
                      const newY = parseInt(e.target.value, 10);
                      setSelectedYear(newY);
                      const maxDays = new Date(newY, selectedMonth + 1, 0).getDate();
                      const dayToUse = Math.min(currentDay, maxDays);
                      const updated = new Date(newY, selectedMonth, dayToUse);
                      onUpdateTicketDetails({ bookingDate: updated });
                      showBanner(`Year changed to ${newY}`);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0070f3] cursor-pointer"
                  >
                    {availableYears.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Interactive Day Calendar Picker */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-800 font-extrabold text-xs">
                  {MONTH_NAMES[selectedMonth]} {selectedYear}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Tap day to select
                </span>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 text-center mb-2">
                {weekDays.map((wd) => (
                  <span key={wd} className="text-slate-400 text-[11px] font-bold">
                    {wd}
                  </span>
                ))}
              </div>

              {/* Day numbers */}
              <div className="grid grid-cols-7 gap-y-1.5 text-center">
                {/* Empty offset padding for first day */}
                {Array.from({ length: firstDayWeekday }).map((_, idx) => (
                  <div key={`pad-${idx}`} className="h-8 w-8"></div>
                ))}

                {/* Days of month */}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                  const selected = isDaySelected(day);
                  return (
                    <button
                      key={day}
                      onClick={() => handleDaySelect(day)}
                      className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer ${
                        selected
                          ? 'bg-[#0070f3] text-white shadow-md ring-2 ring-blue-200 scale-105'
                          : 'text-slate-700 hover:bg-slate-100 active:scale-95'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Selector */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#0070f3]" />
                  <span className="text-slate-800 text-xs font-bold uppercase tracking-wide">
                    Journey / Booking Time
                  </span>
                </div>
                <span className="text-[11px] font-extrabold text-[#0070f3] bg-blue-50 px-2 py-0.5 rounded-md">
                  {timeInput}
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                  placeholder="e.g. 10:45 AM or 18:30"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0070f3]"
                />
                <button
                  onClick={() => handleSaveTime(timeInput)}
                  className="bg-[#0070f3] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  Apply Time
                </button>
              </div>

              {/* Quick Preset Times */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['06:30 AM', '08:15 AM', '10:45 AM', '02:30 PM', '05:45 PM', '09:20 PM'].map((t) => (
                  <button
                    key={t}
                    onClick={() => handleSaveTime(t)}
                    className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                      timeInput === t
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Source & Destination */}
        {activeTab === 'stations' && (
          <form onSubmit={handleSaveStations} className="space-y-4">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-800 text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
                  <Train size={15} className="text-[#0070f3]" /> Route Stations
                </span>
                
                {/* Swap button */}
                <button
                  type="button"
                  onClick={handleSwapStations}
                  className="text-xs text-[#0070f3] font-bold flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowRightLeft size={12} /> Swap
                </button>
              </div>

              {/* Source Station */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <Navigation size={11} className="text-emerald-500 rotate-45" /> Source Station
                </label>
                <input
                  type="text"
                  value={sourceInput}
                  onChange={(e) => setSourceInput(e.target.value)}
                  placeholder="e.g. KALYAN JN."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0070f3] uppercase"
                />
              </div>

              {/* Destination Station */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <MapPin size={11} className="text-rose-500" /> Destination Station
                </label>
                <input
                  type="text"
                  value={destInput}
                  onChange={(e) => setDestInput(e.target.value)}
                  placeholder="e.g. KURLA JN."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0070f3] uppercase"
                />
              </div>

              {/* Distance in KM */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Distance (km)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={distanceKmInput}
                    onChange={(e) => setDistanceKmInput(e.target.value)}
                    placeholder="38"
                    min="1"
                    max="4500"
                    className="w-28 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0070f3]"
                  />
                  <span className="text-slate-400 text-xs font-bold">Kilometers</span>
                </div>
              </div>

              {/* Save Stations Button */}
              <button
                type="submit"
                className="w-full bg-[#0070f3] hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all active:scale-98 text-xs text-center shadow-sm cursor-pointer"
              >
                Save Route & Stations
              </button>
            </div>

            {/* Popular Railway Station Quick Chips */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2.5">
              <span className="text-slate-800 text-[11px] font-bold uppercase tracking-wider block">
                Quick Select Popular Stations
              </span>
              <p className="text-slate-400 text-[10px]">
                Tap to quickly fill Source or Destination:
              </p>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {POPULAR_STATIONS.map((station) => (
                  <div key={station.name} className="inline-flex rounded-lg border border-slate-200 overflow-hidden text-[10px] bg-slate-50">
                    <span className="px-2 py-1 font-bold text-slate-700 bg-white border-r border-slate-200">
                      {station.short}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSourceInput(station.name);
                        showBanner(`Source set to ${station.name}`);
                      }}
                      className="px-1.5 py-1 hover:bg-emerald-50 hover:text-emerald-700 font-bold text-slate-500 transition-colors"
                      title="Set as Source"
                    >
                      From
                    </button>
                    <span className="text-slate-300 py-1">|</span>
                    <button
                      type="button"
                      onClick={() => {
                        setDestInput(station.name);
                        showBanner(`Destination set to ${station.name}`);
                      }}
                      className="px-1.5 py-1 hover:bg-rose-50 hover:text-rose-700 font-bold text-slate-500 transition-colors"
                      title="Set as Destination"
                    >
                      To
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </form>
        )}

      </div>

      {/* Action Footer Button */}
      <div className="px-5 mb-4">
        <button 
          onClick={() => onNavigate('bookings')}
          className="w-full bg-[#0070f3] hover:bg-blue-600 active:scale-98 transition-all text-white font-bold py-3.5 rounded-2xl shadow-sm text-sm text-center cursor-pointer flex items-center justify-center gap-2"
        >
          <span>View Updated Ticket in My Bookings</span>
        </button>
      </div>

    </div>
  );
};
