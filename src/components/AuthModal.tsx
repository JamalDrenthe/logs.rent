import { useState, FormEvent } from 'react';
import { User, Lock, Mail, CheckCircle2, X } from 'lucide-react';
import { Logo } from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userEmail: string) => void;
  currentUser: string | null;
}

export function AuthModal({ isOpen, onClose, onLoginSuccess, currentUser }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('handelaar@logs.rent');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [success, setSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      onLoginSuccess(email || 'handelaar@logs.rent');
      setSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-slate-700/80 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <Logo className="w-10 h-10" />
          <div>
            <h3 className="text-base font-bold text-white">
              {isRegister ? 'Account Registreren' : 'Inloggen op logs.rent'}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Digital Account & Flex Activa Beurs
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#080C14] rounded-xl border border-slate-800 mb-4 text-xs font-mono">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`py-1.5 rounded-lg transition ${
              !isRegister ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Inloggen
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`py-1.5 rounded-lg transition ${
              isRegister ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Registreren
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setSuccess(true);
            setTimeout(() => {
              onLoginSuccess('info@jamaldrenthe.com');
              setSuccess(false);
              onClose();
            }, 500);
          }}
          className="w-full mb-3 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs border border-slate-700 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Inloggen met Google (Admin)
        </button>

        <div className="relative mb-3 flex items-center justify-center">
          <span className="w-full border-t border-slate-800" />
          <span className="bg-[#0F172A] px-2 text-[10px] uppercase font-mono text-slate-500">of</span>
          <span className="w-full border-t border-slate-800" />
        </div>

        {success && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Sessie geverifieerd. Welkom op de beurs!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
          <div>
            <label className="block text-slate-400 mb-1">E-mailadres</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-xl transition shadow-lg shadow-emerald-500/20 text-xs mt-2"
          >
            {isRegister ? 'Maak Handelskassa Account' : 'Inloggen op Beurs Terminal'}
          </button>

          <button
            type="button"
            onClick={() => {
              setEmail('trader_pro@logs.rent');
              onLoginSuccess('trader_pro@logs.rent');
              onClose();
            }}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-xl border border-slate-700 transition text-[11px]"
          >
            Direct Demo Inloggen als Pro Handelaar
          </button>
        </form>
      </div>
    </div>
  );
}
