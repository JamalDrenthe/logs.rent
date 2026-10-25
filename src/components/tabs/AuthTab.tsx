import { useState, FormEvent } from 'react';
import { User, Lock, Mail, CheckCircle2, AlertCircle, RefreshCw, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Logo } from '../Logo';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../lib/firebase';

interface AuthTabProps {
  initialMode?: 'login' | 'register';
  onLoginSuccess: (userEmail: string) => void;
  currentUser: string | null;
  onNavigate: (tab: string) => void;
}

export function AuthTab({ initialMode = 'login', onLoginSuccess, currentUser, onNavigate }: AuthTabProps) {
  const [isRegister, setIsRegister] = useState<boolean>(initialMode === 'register');
  const [email, setEmail] = useState<string>('handelaar@logs.rent');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [fullName, setFullName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const isAdmin = currentUser === 'info@logs.rent' || currentUser === 'info@jamaldrenthe.com';

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email || 'info@logs.rent';
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess(userEmail);
        setSuccess(false);
        setLoading(false);
        onNavigate('home');
      }, 500);
    } catch (err: any) {
      setLoading(false);
      console.error('Google sign-in error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Inloggen geannuleerd (het Google inlogvenster werd gesloten).');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('Dit domein is nog niet toegevoegd aan geautoriseerde domeinen in Firebase.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Het Google pop-upvenster is geblokkeerd door je browser. Sta pop-ups toe.');
      } else {
        setError(err.message || 'Er is een fout opgetreden bij het inloggen.');
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'info@logs.rent' || cleanEmail === 'info@jamaldrenthe.com') {
      setError('Het Administrator account is beveiligd. Log uitsluitend in via de officiële Google OAuth verificatie.');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      onLoginSuccess(cleanEmail || 'handelaar@logs.rent');
      setSuccess(false);
      onNavigate('home');
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto py-8 font-sans space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 mb-2">
          <Logo className="w-12 h-12" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {currentUser
            ? 'Je bent momenteel ingelogd'
            : isRegister
            ? 'Account Aanmaken op logs.rent'
            : 'Inloggen op logs.rent'}
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          {currentUser
            ? 'Beheer je actieve accounts, transacties en sessies'
            : 'De betrouwbare account- en logmarktplaats met escrow bescherming'}
        </p>
      </div>

      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative font-sans">
        {currentUser ? (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Actieve Sessie</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    isAdmin
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                  }`}
                >
                  {isAdmin ? 'ADMINISTRATOR' : 'ACTIEF LID / HANDELAAR'}
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-white font-bold truncate text-xs">{currentUser}</div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{isAdmin ? 'Volledige Beheerrechten (info@logs.rent)' : 'Geverifieerd Lid'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => onNavigate('portfolio')}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <span>Naar Mijn Account &amp; Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('home')}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl transition border border-slate-700"
              >
                Terug naar Home
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tab switch between Inloggen and Registreren */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#080C14] rounded-xl border border-slate-800 mb-5 text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(false);
                  setError(null);
                }}
                className={`py-2 rounded-lg transition ${
                  !isRegister ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Inloggen
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRegister(true);
                  setError(null);
                }}
                className={`py-2 rounded-lg transition ${
                  isRegister ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Registreren
              </button>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full mb-4 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-mono text-xs font-bold transition shadow-lg shadow-white/10 relative disabled:opacity-70 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{loading ? 'Bezig met inloggen...' : 'Inloggen met Google (OAuth)'}</span>
            </button>

            <div className="relative mb-4 flex items-center justify-center">
              <span className="w-full border-t border-slate-800" />
              <span className="bg-[#0F172A] px-2 text-[10px] uppercase font-mono text-slate-500">of e-mail</span>
              <span className="w-full border-t border-slate-800" />
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Inloggen succesvol! Doorsturen...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 font-mono text-xs">
              {isRegister && (
                <div>
                  <label className="block text-slate-400 mb-1">Volledige Naam of Handelaarsnaam</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="bijv. Alexander Drenthe"
                      className="w-full bg-[#080C14] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-400 mb-1">E-mailadres</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    placeholder="naam@domein.nl"
                    className="w-full bg-[#080C14] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Wachtwoord</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimaal 8 tekens"
                    className="w-full bg-[#080C14] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition shadow-lg shadow-emerald-500/20 text-xs mt-3 cursor-pointer"
              >
                {isRegister ? 'Account Registreren' : 'Inloggen op logs.rent'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('demo_trader@logs.rent');
                  onLoginSuccess('demo_trader@logs.rent');
                  onNavigate('home');
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl border border-slate-700 transition text-[11px] cursor-pointer"
              >
                Direct Demo Inloggen als Handelaar
              </button>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-slate-400">
                  {isRegister ? 'Al een account?' : 'Nog geen account?'}{' '}
                </span>
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-emerald-400 hover:text-emerald-300 text-[11px] font-bold underline"
                >
                  {isRegister ? 'Hier inloggen' : 'Direct registreren'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
