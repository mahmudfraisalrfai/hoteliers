import React, { useState, useEffect } from 'react';

interface AuthViewProps {
  onSuccess: () => void;
  onCancel: () => void;
}

type AuthStage = 'FORM' | 'OTP' | 'SUCCESS';

export const AuthView: React.FC<AuthViewProps> = ({ onSuccess, onCancel }) => {
  const [stage, setStage] = useState<AuthStage>('FORM');
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStage('OTP');
    }, 1200);
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input
    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }

    // Check if full OTP is entered
    if (newOtp.every(v => v !== "")) {
      handleOtpVerify();
    }
  };

  const handleOtpVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStage('SUCCESS');
    }, 1000);
  };

  // Auto-redirect after success
  useEffect(() => {
    if (stage === 'SUCCESS') {
      const timer = setTimeout(() => {
        onSuccess();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [stage, onSuccess]);

  if (stage === 'SUCCESS') {
    return (
      <div className="max-w-lg mx-auto my-16 animate-in fade-in zoom-in duration-1000">
        <div className="bg-white rounded-[48px] shadow-3xl border border-slate-100 p-16 text-center overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#dec52d] to-transparent"></div>
          
          <div className="w-24 h-24 bg-[#dec52d] rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-[#dec52d]/30 animate-bounce">
            <svg className="w-12 h-12 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter leading-tight">Welcome Back!</h2>
          <p className="text-slate-500 font-medium mb-8">Verification Successful. Redirecting to your Britrip (hoteliers) marketplace...</p>
          
          <div className="flex justify-center items-center space-x-2">
            <div className="w-2 h-2 bg-[#dec52d] rounded-full animate-ping"></div>
            <span className="text-[10px] font-black text-[#dec52d] uppercase tracking-[0.3em]">Access Granted</span>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'OTP') {
    return (
      <div className="max-w-lg mx-auto my-16 animate-in fade-in slide-in-from-right duration-700">
        <div className="bg-white rounded-[48px] shadow-3xl border border-slate-100 overflow-hidden">
          <div className="p-12 md:p-16">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-[#0f172a] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <svg className="w-10 h-10 text-[#dec52d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter leading-none">Enter Verification Code</h2>
              <p className="text-slate-400 font-medium px-4">A 6-digit access token was dispatched to <span className="text-slate-900 font-bold">{email || "your authorized email"}</span></p>
            </div>

            <div className="flex justify-between gap-3 mb-10">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  onChange={e => handleOtpChange(e.target, index)}
                  onFocus={e => e.target.select()}
                  className="w-full h-16 text-center text-2xl font-black bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#dec52d] focus:ring-4 focus:ring-[#dec52d]/10 outline-none transition-all text-slate-900"
                />
              ))}
            </div>

            <button 
              onClick={handleOtpVerify}
              disabled={loading}
              className="w-full py-6 bg-slate-950 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-[#dec52d] hover:text-slate-950 shadow-2xl transition-all flex items-center justify-center disabled:bg-slate-300 border border-slate-800"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Verify Code'}
            </button>

            <div className="mt-8 text-center">
               <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#dec52d] transition-colors">
                 Resend code in 0:29
               </button>
            </div>
          </div>
          <div className="bg-slate-50 px-8 py-6 flex justify-center border-t border-slate-100">
            <button 
              onClick={() => setStage('FORM')}
              className="text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-all"
            >
              Use different email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto my-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white rounded-[48px] shadow-3xl border border-slate-100 overflow-hidden">
        <div className="p-12 md:p-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#0f172a] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
               <svg className="w-10 h-10 text-[#dec52d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
               </svg>
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter leading-none">
              {isLogin ? 'Partner Login' : 'Onboard Property'}
            </h2>
            <p className="text-slate-400 font-medium">
              {isLogin ? 'Access your institutional dashboard' : 'Join the Britrip (hoteliers) global network'}
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Authorized Email</label>
              <input 
                type="email" 
                required
                placeholder="representative@hotel-group.com" 
                className="w-full px-6 py-5 rounded-[24px] border border-slate-200 focus:ring-4 focus:ring-[#dec52d]/10 focus:border-[#dec52d] focus:outline-none transition-all bg-slate-50 font-bold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secret Key</label>
              <input 
                type="password" 
                required
                placeholder="••••••••" 
                className="w-full px-6 py-5 rounded-[24px] border border-slate-200 focus:ring-4 focus:ring-[#dec52d]/10 focus:border-[#dec52d] focus:outline-none transition-all bg-slate-50 font-bold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-slate-950 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-[#dec52d] hover:text-slate-950 shadow-2xl transition-all flex items-center justify-center disabled:bg-slate-300 border border-slate-800"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                isLogin ? 'Authenticate' : 'Submit Application'
              )}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-slate-50 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#dec52d] font-black uppercase text-[10px] tracking-widest hover:text-slate-950 transition-all border-b border-transparent hover:border-slate-950 pb-0.5"
            >
              {isLogin ? "Request Network Access" : "Already a Registered Partner? Login"}
            </button>
          </div>
        </div>
        <div className="bg-slate-50 px-8 py-6 flex justify-center border-t border-slate-100">
          <button 
            onClick={onCancel}
            className="text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-all"
          >
            Cancel and Return
          </button>
        </div>
      </div>
    </div>
  );
};