import React, { useState, useEffect } from 'react';
import { User, LogOut, Shield, Key, Heart, Users, ExternalLink, Download, Smartphone, CheckCircle, HelpCircle } from 'lucide-react';

interface ProfileScreenProps {
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>('ios');
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if running as standalone PWA
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(checkStandalone);

    // Capture the PWA install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("To install RailOne, please use your mobile browser's 'Add to Home Screen' option.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] justify-between select-none relative pb-16">
      
      {/* Top Header */}
      <div className="bg-[#0070f3] text-white px-5 py-4 flex items-center justify-between shadow-md">
        <div className="w-9 h-9"></div> {/* Spacer */}
        <h1 className="text-white font-bold text-lg tracking-wide flex items-center gap-2">
          <User size={19} /> Profile Details
        </h1>
        <div className="w-9 h-9"></div> {/* Spacer */}
      </div>

      {/* Main content scrollable */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        
        {/* User Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-[#0070f3] text-white text-2xl font-black rounded-full flex items-center justify-center shadow-md mb-3.5 border-4 border-blue-50">
            NG
          </div>
          <h2 className="text-slate-800 font-extrabold text-lg">
            Nibhesh Garain
          </h2>
          <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-0.5 rounded-full text-[10px] font-bold mt-1.5 uppercase tracking-wider">
            Verified Account
          </span>

          <div className="w-full border-t border-slate-100 mt-5 pt-4 grid grid-cols-2 text-center">
            <div>
              <p className="text-[#94a3b8] text-[9px] font-bold uppercase tracking-wider">
                User ID
              </p>
              <p className="text-slate-700 text-xs font-bold mt-0.5">
                RAIL_982461
              </p>
            </div>
            <div className="border-l border-slate-100">
              <p className="text-[#94a3b8] text-[9px] font-bold uppercase tracking-wider">
                Travel Category
              </p>
              <p className="text-slate-700 text-xs font-bold mt-0.5">
                Frequent Traveler
              </p>
            </div>
          </div>
        </div>

        {/* NEW: Interactive PWA / Mobile Download Guide */}
        <div className="bg-white rounded-2xl border-2 border-blue-100 p-5 shadow-sm mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/40 rounded-full -mr-8 -mt-8 -z-0"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[#0070f3] font-bold text-sm mb-2">
              <Smartphone size={18} />
              <span>Convert to Mobile App</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed mb-4">
              RailOne is fully compatible with iOS and Android. Install it as a standalone Progressive Web App with offline support.
            </p>

            {isStandalone ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 text-emerald-800 text-xs font-bold mb-1">
                <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                <span>Running inside the Installed App!</span>
              </div>
            ) : (
              <div>
                {/* Platform Switcher Tabs */}
                <div className="flex border-b border-slate-100 mb-3.5">
                  <button 
                    onClick={() => setActiveTab('ios')}
                    className={`flex-1 pb-2 text-xs font-bold text-center transition-colors relative ${
                      activeTab === 'ios' ? 'text-[#0070f3]' : 'text-slate-400'
                    }`}
                  >
                    iPhone (iOS)
                    {activeTab === 'ios' && <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-[#0070f3] rounded-full"></div>}
                  </button>
                  <button 
                    onClick={() => setActiveTab('android')}
                    className={`flex-1 pb-2 text-xs font-bold text-center transition-colors relative ${
                      activeTab === 'android' ? 'text-[#0070f3]' : 'text-slate-400'
                    }`}
                  >
                    Android / Chrome
                    {activeTab === 'android' && <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-[#0070f3] rounded-full"></div>}
                  </button>
                </div>

                {/* Tab content */}
                {activeTab === 'ios' ? (
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2.5">
                      <span className="bg-slate-100 text-slate-800 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <p className="text-slate-600 text-xs leading-tight">Open this link in <strong className="text-slate-800">Safari Browser</strong>.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="bg-slate-100 text-slate-800 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <p className="text-slate-600 text-xs leading-tight">Tap the <strong className="text-slate-800">Share</strong> icon (box with up arrow).</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="bg-slate-100 text-slate-800 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <p className="text-slate-600 text-xs leading-tight">Scroll down & tap <strong className="text-slate-800">"Add to Home Screen"</strong>.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2.5">
                      <span className="bg-slate-100 text-slate-800 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <p className="text-slate-600 text-xs leading-tight">Open this link in <strong className="text-slate-800">Google Chrome</strong>.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="bg-slate-100 text-slate-800 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <p className="text-slate-600 text-xs leading-tight">Tap the <strong className="text-slate-800">Menu (3 dots)</strong> on top-right.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="bg-slate-100 text-slate-800 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <p className="text-slate-600 text-xs leading-tight">Choose <strong className="text-slate-800">"Install App"</strong> or <strong className="text-slate-800">"Add to Home Screen"</strong>.</p>
                    </div>
                  </div>
                )}

                {/* Instant Action Button */}
                <button 
                  onClick={handleInstallClick}
                  className="w-full bg-[#0070f3] hover:bg-blue-600 active:scale-98 transition-all text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download size={14} />
                  {deferredPrompt ? 'Install App Directly' : 'Add to Home Screen'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Details list */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden p-1.5 space-y-1 mb-6">
          <div className="flex items-center gap-3.5 px-4.5 py-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
            <Shield size={16} className="text-slate-400" />
            <div className="flex-1">
              <p className="text-slate-700 text-xs font-bold">Privacy & Consent Security</p>
              <p className="text-slate-400 text-[10px]">Manage app sharing & biometric data</p>
            </div>
            <ExternalLink size={14} className="text-slate-300" />
          </div>

          <div className="flex items-center gap-3.5 px-4.5 py-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
            <Key size={16} className="text-slate-400" />
            <div className="flex-1">
              <p className="text-slate-700 text-xs font-bold">Change 6-digit mPIN</p>
              <p className="text-slate-400 text-[10px]">Update security code for logging in</p>
            </div>
            <ExternalLink size={14} className="text-slate-300" />
          </div>

          <div className="flex items-center gap-3.5 px-4.5 py-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
            <Heart size={16} className="text-slate-400" />
            <div className="flex-1">
              <p className="text-slate-700 text-xs font-bold">Favorite Journeys</p>
              <p className="text-slate-400 text-[10px]">Quick-book Kalyan to Kurla routes</p>
            </div>
            <ExternalLink size={14} className="text-slate-300" />
          </div>

          <div className="flex items-center gap-3.5 px-4.5 py-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
            <Users size={16} className="text-slate-400" />
            <div className="flex-1">
              <p className="text-slate-700 text-xs font-bold">Co-Passenger Profiles</p>
              <p className="text-slate-400 text-[10px]">Add family & friends for booking lists</p>
            </div>
            <ExternalLink size={14} className="text-slate-300" />
          </div>
        </div>

        {/* Source Code Download Tip */}
        <div className="bg-slate-50 rounded-xl border border-slate-200/60 p-4 mb-4 flex items-start gap-2.5">
          <HelpCircle size={15} className="text-slate-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-slate-700 text-[11px] font-bold">Developer Source Download</p>
            <p className="text-slate-500 text-[10px] leading-normal">
              You can download this entire code repository as a clean <strong className="text-slate-700">ZIP</strong> archive or export directly to <strong className="text-slate-700">GitHub</strong> via the Google AI Studio top-right settings panel.
            </p>
          </div>
        </div>

      </div>

      {/* Logout Action Footer */}
      <div className="px-5 mb-5">
        <button 
          onClick={onLogout}
          className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-3.5 rounded-2xl transition-all border border-rose-200/50 shadow-sm active:scale-98 text-sm text-center flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut size={16} /> Log Out from Device
        </button>
      </div>

    </div>
  );
};
