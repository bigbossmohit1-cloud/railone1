import React, { useState, useRef, useEffect } from 'react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [pin, setPin] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (value: string, index: number) => {
    if (value && !/^\d+$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.substring(value.length - 1);
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!pin[index] && index > 0) {
        const newPin = [...pin];
        newPin[index - 1] = '';
        setPin(newPin);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newPin = [...pin];
        newPin[index] = '';
        setPin(newPin);
      }
    } else if (e.key === 'Enter') {
      const fullPin = pin.join('');
      if (fullPin.length === 6) {
        onLoginSuccess();
      }
    }
  };

  const handleLoginClick = () => {
    onLoginSuccess();
  };

  const handleBiometricClick = () => {
    setPin(['1', '2', '3', '4', '5', '6']);
    setTimeout(() => {
      onLoginSuccess();
    }, 400);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#e3f4fd] via-[#f4fafc] to-[#ffffff] px-8 justify-between py-10 relative overflow-hidden select-none">
      
      {/* Brand Logo Header - Exactly as Image 1 */}
      <div className="flex flex-col items-center mt-6">
        <div className="flex items-center justify-center font-display text-[42px] tracking-tight text-[#111] leading-none select-none">
          <span className="font-light text-[#475569]">Rail</span>
          <span className="font-extrabold text-[#1e293b] flex items-center relative">
            <span className="relative inline-flex items-center justify-center">
              O
              <span className="absolute w-[8px] h-[8px] bg-[#ff512f] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
            </span>
            <span className="-ml-[1px]">ne</span>
          </span>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex flex-col items-center w-full mt-2">
        <h2 className="text-[#203a5e] text-[24px] font-bold font-sans tracking-tight text-center leading-tight">
          Login using mPIN
        </h2>
        
        <p className="text-[#475569] text-base mt-4 font-normal text-center">
          Welcome Nibhesh Garain!
        </p>
        
        <p className="text-[#94a3b8] text-[13px] mt-1 font-normal text-center tracking-wide uppercase">
          Enter mPIN below
        </p>

        {/* 6 Digit Inputs - Customized to match Image 1 perfectly */}
        <div className="flex justify-between w-full max-w-sm mt-8 gap-2">
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-[45px] h-[55px] bg-white border border-[#7ec4f4]/60 rounded-[14px] text-center text-[22px] font-bold text-[#1e293b] focus:border-[#0070f3] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all shadow-sm"
              autoComplete="one-time-code"
            />
          ))}
        </div>

        {/* Forgot / Reset Links */}
        <div className="flex justify-between w-full max-w-sm mt-6 px-1">
          <button 
            onClick={() => alert("Password reset link has been dispatched to your registered phone.")}
            className="text-[#0d2a54] text-[13px] font-bold hover:opacity-80 transition-opacity"
          >
            Forgot Password?
          </button>
          <button 
            onClick={() => alert("Contact support desk to trigger mPIN reset protocol.")}
            className="text-[#0d2a54] text-[13px] font-bold hover:opacity-80 transition-opacity"
          >
            Reset mPIN?
          </button>
        </div>
      </div>

      {/* Biometrics Block */}
      <div className="flex flex-col items-center w-full mb-4">
        {/* Divider line exactly matching screenshot */}
        <div className="flex items-center justify-center w-full gap-2.5 my-8">
          <div className="h-[1px] bg-slate-300 flex-1 border-t border-dashed"></div>
          <span className="text-[#64748b] text-[13px] font-normal tracking-wide bg-transparent px-1">
            Or login using biometric
          </span>
          <div className="h-[1px] bg-slate-300 flex-1 border-t border-dashed"></div>
        </div>

        {/* Biometrics Actions and Login pill button */}
        <div className="flex items-center justify-between w-full max-w-sm px-1">
          <div className="flex gap-4 items-center">
            {/* Face ID outline icon button */}
            <button 
              onClick={handleBiometricClick}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-transparent hover:bg-slate-100 active:scale-95 transition-all text-[#64748b]"
              title="Login with Face ID"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                <path d="M3 8V5a2 2 0 012-2h3M16 3h3a2 2 0 012 2v3M21 16v3a2 2 0 01-2 2h-3M8 21H5a2 2 0 01-2-2v-3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 10h1M15 10h1M11 14a3 3 0 002 0M10 8l.01.01M14 8l.01.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
            {/* Fingerprint outline icon button */}
            <button 
              onClick={handleBiometricClick}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-transparent hover:bg-slate-100 active:scale-95 transition-all text-[#64748b]"
              title="Login with Fingerprint"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                <path d="M12 2a10 10 0 00-10 10c0 1.5.3 3 .8 4.2M22 12a10 10 0 00-10-10" strokeLinecap="round" />
                <path d="M8 12a4 4 0 018 0M6 12a6 6 0 0112 0" strokeLinecap="round" />
                <path d="M10 12a2 2 0 014 0" strokeLinecap="round" />
                <path d="M12 16v3M12 8v1" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Login Action Pill Button - Light background with soft blue border */}
          <button
            onClick={handleLoginClick}
            className="border border-[#7cbcf6] bg-[#ebf5fe] hover:bg-[#d0e7fc] text-[#0062df] font-bold text-[14px] px-8 py-2.5 rounded-full transition-all active:scale-95 shadow-sm"
          >
            Login
          </button>
        </div>
      </div>

      {/* Different User Footer */}
      <div className="flex justify-center mb-2">
        <button 
          onClick={() => alert("Loading registration menu...")}
          className="text-[#0d2a54] text-[14px] font-bold hover:opacity-80 transition-opacity"
        >
          Different User?
        </button>
      </div>
    </div>
  );
};
