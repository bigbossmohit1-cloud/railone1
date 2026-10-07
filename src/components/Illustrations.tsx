import React from 'react';

// Beautiful, modern SVG illustrations matching the train themes
export const ReservedIllustration: React.FC = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full rounded-xl object-cover" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#87ceeb" />
        <stop offset="100%" stopColor="#e0f7fa" />
      </linearGradient>
      <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4caf50" />
        <stop offset="100%" stopColor="#2e7d32" />
      </linearGradient>
      <linearGradient id="trainGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    
    {/* Background Sky */}
    <rect width="120" height="80" fill="url(#skyGrad)" />
    
    {/* Sun */}
    <circle cx="85" cy="25" r="8" fill="#ffb74d" opacity="0.8" />
    
    {/* Green Mountains outside the window */}
    <path d="M-10 60 L25 35 L60 60 Z" fill="url(#hillGrad)" opacity="0.9" />
    <path d="M30 60 L65 40 L105 60 Z" fill="#388e3c" opacity="0.8" />
    <path d="M70 60 L95 45 L130 60 Z" fill="#1b5e20" opacity="0.75" />
    
    {/* Clouds */}
    <path d="M20 20 Q25 15 32 18 Q38 15 42 20 Q46 22 40 25 L18 25 Z" fill="#ffffff" opacity="0.9" />
    <path d="M90 15 Q94 11 98 13 Q102 11 105 15 Q108 17 103 19 L88 19 Z" fill="#ffffff" opacity="0.8" />

    {/* Train Window Frame */}
    <rect x="0" y="0" width="120" height="80" fill="none" stroke="#64748b" strokeWidth="6" />
    <rect x="0" y="0" width="120" height="80" fill="none" stroke="#334155" strokeWidth="2" />
    <line x1="60" y1="0" x2="60" y2="80" stroke="#475569" strokeWidth="3" />
    
    {/* Passengers looking out - cute stylized figures */}
    {/* Left Boy Passenger */}
    <circle cx="35" cy="55" r="7" fill="#fbcfe8" /> {/* Head */}
    <path d="M35 48 Q30 46 28 50" stroke="#f472b6" strokeWidth="2" fill="none" /> {/* Cap/Hair */}
    <path d="M28 58 C28 52, 42 52, 42 58 L42 80 L28 80 Z" fill="#3b82f6" /> {/* Shirt */}
    <rect x="25" y="60" width="5" height="12" rx="2" fill="#3b82f6" transform="rotate(15 25 60)" /> {/* Arm */}
    
    {/* Right Girl Passenger */}
    <circle cx="85" cy="53" r="6.5" fill="#fed7aa" /> {/* Head */}
    <path d="M85 45 Q92 45 90 52" stroke="#ea580c" strokeWidth="3" fill="none" /> {/* Hair pony */}
    <path d="M75 57 C75 52, 95 52, 95 57 L95 80 L75 80 Z" fill="#ec4899" /> {/* Clothes */}
    <rect x="90" y="58" width="5" height="12" rx="2" fill="#ec4899" transform="rotate(-10 90 58)" /> {/* Arm */}
    
    {/* Table / Details */}
    <rect x="45" y="72" width="30" height="8" rx="1" fill="#e2e8f0" />
    <circle cx="60" cy="70" r="2.5" fill="#f59e0b" /> {/* Cup */}
  </svg>
);

export const UnreservedIllustration: React.FC = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full rounded-xl object-cover" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cabinGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id="seatGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
    </defs>
    
    {/* Cabin Wall */}
    <rect width="120" height="80" fill="url(#cabinGrad)" />
    
    {/* Small Window in background */}
    <rect x="40" y="10" width="40" height="25" rx="3" fill="#bae6fd" stroke="#94a3b8" strokeWidth="2" />
    <path d="M40 25 L80 18" stroke="#38bdf8" strokeWidth="1" />
    
    {/* Blue Mountains inside small window */}
    <path d="M40 35 L55 25 L70 35 Z" fill="#0284c7" opacity="0.5" />
    <path d="M55 35 L70 28 L80 35 Z" fill="#0369a1" opacity="0.5" />
    
    {/* Luggage rack at top */}
    <line x1="5" y1="8" x2="115" y2="8" stroke="#475569" strokeWidth="2" />
    <line x1="15" y1="8" x2="15" y2="3" stroke="#475569" strokeWidth="1.5" />
    <line x1="45" y1="8" x2="45" y2="3" stroke="#475569" strokeWidth="1.5" />
    <line x1="75" y1="8" x2="75" y2="3" stroke="#475569" strokeWidth="1.5" />
    <line x1="105" y1="8" x2="105" y2="3" stroke="#475569" strokeWidth="1.5" />
    
    {/* Luggage bag on the rack */}
    <rect x="25" y="2" width="20" height="6" rx="1.5" fill="#f59e0b" />
    <rect x="65" y="3" width="15" height="5" rx="1" fill="#3b82f6" />
    
    {/* Train Seats (Red/Orange cushions) */}
    {/* Left Seat */}
    <path d="M5 45 L35 45 C38 45, 38 75, 35 75 L5 75 Z" fill="url(#seatGrad)" />
    <rect x="5" y="42" width="30" height="3" rx="1" fill="#fca5a5" />
    {/* Right Seat */}
    <path d="M115 45 L85 45 C82 45, 82 75, 85 75 L115 75 Z" fill="url(#seatGrad)" />
    <rect x="85" y="42" width="30" height="3" rx="1" fill="#fca5a5" />

    {/* Passengers */}
    {/* Left Passenger sitting */}
    <circle cx="20" cy="53" r="5" fill="#fed7aa" />
    <path d="M12 45 L20 45 C20 45, 25 55, 12 55 Z" fill="#ea580c" opacity="0.8" /> {/* Hair */}
    <path d="M10 58 C10 58, 25 58, 25 64 L22 80 L12 80 Z" fill="#db2777" /> {/* Dress */}
    
    {/* Right Passenger sitting */}
    <circle cx="100" cy="51" r="5.5" fill="#fbcfe8" />
    <path d="M96 46 Q100 42 104 46" stroke="#1e293b" strokeWidth="3" /> {/* Hair */}
    <path d="M90 56.5 C90 56.5, 108 56.5, 108 62 L105 80 L92 80 Z" fill="#2563eb" /> {/* Shirt */}
    
    {/* Hand coffee cup detail */}
    <ellipse cx="88" cy="62" rx="1.5" ry="2" fill="#fed7aa" />
    <rect x="85" y="64" width="2" height="3" fill="#ffffff" />
  </svg>
);

export const PlatformIllustration: React.FC = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full rounded-xl object-cover" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyGrad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
      <linearGradient id="trainOrange" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
    </defs>
    
    {/* Station Ceiling/Background */}
    <rect width="120" height="80" fill="url(#skyGrad2)" />
    
    {/* Station Girders / Metal Structure */}
    <line x1="0" y1="15" x2="120" y2="15" stroke="#334155" strokeWidth="2" />
    <line x1="20" y1="0" x2="30" y2="15" stroke="#334155" strokeWidth="1.5" />
    <line x1="60" y1="0" x2="60" y2="15" stroke="#334155" strokeWidth="1.5" />
    <line x1="100" y1="0" x2="90" y2="15" stroke="#334155" strokeWidth="1.5" />
    
    {/* Platform Ground */}
    <polygon points="0,55 120,55 120,80 0,80" fill="#78716c" />
    <line x1="0" y1="55" x2="120" y2="55" stroke="#e7e5e4" strokeWidth="2" />
    <line x1="0" y1="58" x2="120" y2="58" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 2" /> {/* Safety Yellow Line */}

    {/* Modern Train (Orange, Fast) */}
    <path d="M0,20 L75,25 Q100,28 105,42 Q108,48 95,52 L0,52 Z" fill="url(#trainOrange)" />
    
    {/* Train Roof line */}
    <path d="M0,20 L73,25 Q82,26 83,28" stroke="#ffffff" strokeWidth="2" fill="none" />
    
    {/* Train Windows */}
    <path d="M10,28 L28,29 L28,35 L10,34 Z" fill="#1e293b" />
    <path d="M34,29.5 L52,30.5 L52,36.5 L34,35.5 Z" fill="#1e293b" />
    <path d="M58,31 L76,32 L74,38 L58,37 Z" fill="#1e293b" />
    
    {/* Driver's Cabin curved Front Window */}
    <path d="M82,31 Q94,32 96,40 L80,40 Z" fill="#0f172a" />
    <circle cx="91" cy="36" r="1.5" fill="#38bdf8" />
    
    {/* Train headlights */}
    <polygon points="98,46 102,46 101,48 97,48" fill="#fef08a" />
    <polygon points="94,49 97,49 96,51 93,51" fill="#fef08a" />
    
    {/* People on Platform (Silhouette/Minimal) */}
    {/* Figure 1 - Business man */}
    <circle cx="110" cy="50" r="2.5" fill="#fbcfe8" />
    <rect x="108" y="52.5" width="4" height="15" fill="#1e3a8a" />
    <line x1="109" y1="67.5" x2="109" y2="78" stroke="#1e3a8a" strokeWidth="1.5" />
    <line x1="111" y1="67.5" x2="111" y2="78" stroke="#1e3a8a" strokeWidth="1.5" />

    {/* Figure 2 - Traveler with bag */}
    <circle cx="85" cy="53" r="2" fill="#fed7aa" />
    <rect x="83.5" y="55" width="3" height="12" fill="#ec4899" />
    <line x1="84" y1="67" x2="84" y2="77" stroke="#ec4899" strokeWidth="1" />
    <line x1="86" y1="67" x2="86" y2="77" stroke="#ec4899" strokeWidth="1" />
    <rect x="80" y="58" width="3" height="6" rx="0.5" fill="#f59e0b" /> {/* Suitcase */}
  </svg>
);
