import React, { useState } from 'react';
import { X, Mail, Lock, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userLoggedIn: boolean;
  setUserLoggedIn: (val: boolean) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  userLoggedIn,
  setUserLoggedIn,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'phone'>('signin');
  const [email, setEmail] = useState('student@hidayat.edu');
  const [password, setPassword] = useState('••••••••');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [phoneCode, setPhoneCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserLoggedIn(true);
    onClose();
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {userLoggedIn ? (
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">You Are Signed In</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{email}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Student Profile</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                Go to Student Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {mode === 'signin' && 'Welcome Back to Hidayat'}
                {mode === 'signup' && 'Create Student Account'}
                {mode === 'phone' && 'Sign in with Phone (2FA)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Unlock personalized AI career guidance & scholarship tracking
              </p>
            </div>

            {/* Social Logins */}
            {mode !== 'phone' && (
              <div className="space-y-2 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setUserLoggedIn(true);
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserLoggedIn(true);
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current text-blue-600" viewBox="0 0 23 23">
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
                  </svg>
                  <span>Continue with Microsoft</span>
                </button>
              </div>
            )}

            {mode !== 'phone' && (
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-wider text-slate-400">
                  <span className="bg-white dark:bg-slate-900 px-2">Or email address</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {mode !== 'phone' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                        placeholder="student@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {codeSent && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Enter 6-Digit SMS Code
                      </label>
                      <input
                        type="text"
                        required
                        value={phoneCode}
                        onChange={(e) => setPhoneCode(e.target.value)}
                        placeholder="123456"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500 text-center tracking-widest font-mono"
                      />
                    </div>
                  )}
                </>
              )}

              <button
                type="submit"
                onClick={(e) => {
                  if (mode === 'phone' && !codeSent) {
                    e.preventDefault();
                    setCodeSent(true);
                  }
                }}
                className="w-full py-2.5 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-blue-500/20"
              >
                <span>
                  {mode === 'phone'
                    ? codeSent
                      ? 'Verify Code & Login'
                      : 'Send SMS Code'
                    : mode === 'signin'
                    ? 'Sign In'
                    : 'Create Free Account'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Mode Footer */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
              {mode === 'signin' && (
                <>
                  <button onClick={() => setMode('signup')} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                    Create Account
                  </button>
                  <button onClick={() => setMode('phone')} className="text-slate-500 hover:underline">
                    Phone Login
                  </button>
                </>
              )}
              {mode === 'signup' && (
                <>
                  <button onClick={() => setMode('signin')} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                    Already have account?
                  </button>
                  <button onClick={() => setMode('phone')} className="text-slate-500 hover:underline">
                    Phone Login
                  </button>
                </>
              )}
              {mode === 'phone' && (
                <button onClick={() => setMode('signin')} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline mx-auto">
                  Back to Email Sign In
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
