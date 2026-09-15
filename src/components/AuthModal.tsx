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
