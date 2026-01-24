
import React, { useState, useEffect } from 'react';

interface LoginProps {
  onLogin: (email: string) => void;
  onForgot: () => void;
}

const Icons = {
  Bolt: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  ArrowRight: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>,
  Lock: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Mail: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Google: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>,
  ShieldCheck: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
};

const Login: React.FC<LoginProps> = ({ onLogin, onForgot }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) onLogin(email);
  };

  const handleSkipLogin = () => {
    onLogin('demo.admin@unifuse.edu');
  };

  return (
    <div className="h-screen w-screen bg-[#FAFAFA] flex items-stretch overflow-hidden">
      
      {/* Left: Brand / Visual Side */}
      <div className={`hidden lg:flex w-1/2 h-screen bg-[#050505] relative flex-col justify-between p-16 overflow-hidden transition-all duration-1000 transform ${isAnimating ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
        
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0">
           <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#1B9AAA]/20 rounded-full blur-[120px] animate-pulse"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#52D1DC]/10 rounded-full blur-[100px]"></div>
           <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#DDDBCB]/10 rounded-full blur-[80px] animate-pulse delay-700"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3">
           <div className="relative">
              <span className="text-xl font-bold text-white tracking-tight">Unifuse</span>
              <span className="absolute -top-1 -right-3 text-[10px] font-bold text-[#52D1DC]">AI</span>
           </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 space-y-8">
           <h1 className="text-6xl font-medium text-white leading-[1.1] tracking-tight">
              Orchestrate your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B9AAA] to-[#52D1DC]">Institutional Intelligence.</span>
           </h1>
           <p className="text-[#737373] text-lg max-w-md leading-relaxed">
              Unified enrollment, student success, and advancement operations powered by the Unicore Engine.
           </p>
           
           {/* Stats Ticker */}
           <div className="flex gap-8 pt-8 border-t border-white/10">
              <div>
                 <div className="text-3xl font-bold text-white">94%</div>
                 <div className="text-xs text-[#737373] uppercase tracking-widest mt-1">Retention Rate</div>
              </div>
              <div>
                 <div className="text-3xl font-bold text-white">$12M</div>
                 <div className="text-xs text-[#737373] uppercase tracking-widest mt-1">Campaign ROI</div>
              </div>
              <div>
                 <div className="text-3xl font-bold text-white">2.4s</div>
                 <div className="text-xs text-[#737373] uppercase tracking-widest mt-1">Response Time</div>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-3 text-xs font-medium text-[#737373]">
           <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1B9AAA]/10 border border-[#1B9AAA]/20 rounded-full text-[#1B9AAA]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B9AAA] animate-pulse"></span>
              System Operational
           </div>
           <span>v4.5.0-stable</span>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="w-full lg:w-1/2 h-screen bg-[#FAFAFA] flex flex-col justify-center items-center p-8 lg:p-16 relative overflow-hidden">
         <div className={`w-full max-w-md space-y-5 transition-all duration-1000 delay-300 transform ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            <div className="text-center lg:text-left">
               <h2 className="text-3xl font-bold text-[#050505] tracking-tight mb-2">Welcome back</h2>
               <p className="text-[#737373]">Please enter your details to access the workspace.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#737373] uppercase tracking-wide">Email</label>
                  <div className="relative group">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373] group-focus-within:text-[#1B9AAA] transition-colors"><Icons.Mail /></span>
                     <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-[#DDDBCB] rounded-xl outline-none focus:ring-2 focus:ring-[#52D1DC]/50 focus:border-[#1B9AAA] transition-all font-medium text-[#050505] placeholder:text-[#DDDBCB]"
                        placeholder="name@university.edu"
                     />
                  </div>
               </div>

               <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                     <label className="text-xs font-bold text-[#737373] uppercase tracking-wide">Password</label>
                     <button type="button" onClick={onForgot} className="text-xs font-semibold text-[#1B9AAA] hover:text-[#157f8c]">Forgot password?</button>
                  </div>
                  <div className="relative group">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373] group-focus-within:text-[#1B9AAA] transition-colors"><Icons.Lock /></span>
                     <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-[#DDDBCB] rounded-xl outline-none focus:ring-2 focus:ring-[#52D1DC]/50 focus:border-[#1B9AAA] transition-all font-medium text-[#050505] placeholder:text-[#DDDBCB]"
                        placeholder="••••••••"
                     />
                  </div>
               </div>

               <button 
                  type="submit"
                  className="w-full py-3.5 bg-[#1B9AAA] text-white rounded-xl font-bold text-sm hover:bg-[#157f8c] transition-all transform active:scale-[0.98] shadow-lg shadow-[#1B9AAA]/20 flex items-center justify-center gap-2"
               >
                  Sign In <Icons.ArrowRight />
               </button>
            </form>

            <div className="relative">
               <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#DDDBCB]"></div>
               </div>
               <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-[#FAFAFA] text-[#737373] font-medium">Or continue with</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white border border-[#DDDBCB] rounded-xl hover:bg-[#FAFAFA] transition-all font-bold text-sm text-[#050505]">
                  <Icons.Google /> Google
               </button>
               <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white border border-[#DDDBCB] rounded-xl hover:bg-[#FAFAFA] transition-all font-bold text-sm text-[#050505]">
                  <span className="text-lg">❖</span> SSO
               </button>
            </div>

            {/* Demo Shortcut */}
            <div className="bg-[#1B9AAA]/10 border border-[#1B9AAA]/20 rounded-xl p-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg text-[#1B9AAA] shadow-sm"><Icons.ShieldCheck /></div>
                  <div className="text-xs">
                     <div className="font-bold text-[#050505]">Visiting for a demo?</div>
                     <div className="text-[#1B9AAA]">Access the sandbox environment.</div>
                  </div>
               </div>
               <button 
                  onClick={handleSkipLogin}
                  className="px-4 py-2 bg-[#1B9AAA] text-white text-xs font-bold rounded-lg hover:bg-[#157f8c] transition-colors shadow-sm"
               >
                  Instant Access
               </button>
            </div>

         </div>
         
         <div className="fixed bottom-4 left-0 right-0 text-center text-xs text-[#737373] font-medium">
  © 2025 Unifuse Inc. <span className="mx-2">•</span> Privacy Policy <span className="mx-2">•</span> Terms
</div>

      </div>

    </div>
  );
};

export default Login;
