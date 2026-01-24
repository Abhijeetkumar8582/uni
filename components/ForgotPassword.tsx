
import React from 'react';

interface ForgotPasswordProps {
  onBack: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#217dbb] to-[#5faee3] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-12 w-full max-w-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FACF39] via-[#fbdb6b] to-[#5faee3]"></div>
        
        <div className="text-center mb-8 mt-2">
          <div className="flex items-center justify-center gap-3 text-[#5faee3] font-bold text-2xl tracking-widest">
            <span>UNIFUSE AI</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 text-center mb-3">Forgot Password?</h1>
        <p className="text-slate-500 text-center mb-8 leading-relaxed">
          No worries! Enter your email address and we'll send you instructions to reset your password.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#5faee3] outline-none transition-all placeholder:text-slate-400"
              placeholder="your.email@university.edu"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#5faee3] to-[#3498db] text-white font-semibold rounded-lg hover:shadow-lg transition-all mb-4"
          >
            Send Reset Instructions
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <div className="text-sm font-bold text-blue-800 flex items-center gap-2">
              <span>📧</span> Check Your Email
            </div>
            <p className="text-xs text-blue-700 leading-relaxed">
              You'll receive an email with a link to reset your password. The link will expire in 24 hours.
            </p>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <button onClick={onBack} className="text-blue-500 font-medium text-sm flex items-center justify-center gap-2 mx-auto hover:underline">
            <span>←</span> Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
