import { useState, useMemo } from 'react';
import { PortfolioItem } from '../../types';
import { Key, Copy, X, Eye, EyeOff, Sliders, CheckCircle2 } from 'lucide-react';

interface QuickCredentialsModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onOpenConsole: (item: PortfolioItem) => void;
}

// Deterministic TOTP code generator
function getTotpCode(secret: string = 'JBSWY3DPEHPK3PXP'): { code: string; secondsLeft: number } {
  const step = 30;
  const now = Math.floor(Date.now() / 1000);
  const timeSlot = Math.floor(now / step);
  const secondsLeft = step - (now % step);

  let hash = 0;
  const str = secret + timeSlot.toString();
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 1000000;
  }
  const code = hash.toString().padStart(6, '0');
  return { code, secondsLeft };
}

export function QuickCredentialsModal({
  item,
  onClose,
  onOpenConsole
}: QuickCredentialsModalProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const totp = useMemo(() => {
    if (!item) return { code: '000000', secondsLeft: 30 };
    const secret = item.credentials?.twoFactorSecret || 'JBSWY3DPEHPK3PXP';
    return getTotpCode(secret);
  }, [item]);

  if (!item) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(`${label} gekopieerd!`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono text-xs">
      <div className="bg-[#0F172A] border border-slate-700 w-full max-w-md rounded-2xl p-5 shadow-2xl relative space-y-4">
        {copiedText && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-bold px-3 py-1 rounded-full text-[11px] shadow-lg flex items-center gap-1.5 animate-fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{copiedText}</span>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-slate-800"
          aria-label="Sluiten"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">
              Snelle Inlog &amp; TOTP 2FA
            </h4>
            <p className="text-slate-400 text-[11px]">
              {item.accountTitle} • ID #{item.accountId} • {item.platform}
            </p>
          </div>
        </div>

        {/* Live TOTP Display */}
        <div className="bg-slate-900 border border-emerald-500/30 p-4 rounded-xl text-center space-y-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Realtime TOTP Code</span>
          <div className="text-3xl font-black text-emerald-400 tracking-widest font-mono">
            {totp.code.slice(0, 3)} {totp.code.slice(3)}
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => handleCopy(totp.code, '2FA Code')}
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-[11px] flex items-center gap-1 shadow-md shadow-emerald-500/20"
            >
              <Copy className="w-3 h-3" />
              <span>Kopieer Code ({totp.secondsLeft}s)</span>
            </button>
          </div>
        </div>

        {/* Quick Logins */}
        <div className="space-y-2 bg-[#080C14] border border-slate-800 p-3 rounded-xl">
          <div>
            <span className="text-[9px] text-slate-500 uppercase block mb-0.5">Gebruikersnaam / ID</span>
            <div className="flex items-center justify-between text-white font-bold bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800">
              <span className="truncate">{item.credentials?.username || `user_${item.accountId}`}</span>
              <button
                onClick={() => handleCopy(item.credentials?.username || `user_${item.accountId}`, 'Gebruikersnaam')}
                className="text-slate-400 hover:text-cyan-400 transition"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div>
            <span className="text-[9px] text-slate-500 uppercase block mb-0.5">Wachtwoord</span>
            <div className="flex items-center justify-between text-white font-bold bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800">
              <span>{showPassword ? item.credentials?.passwordMasked || 'SuperSecurePass2026!#' : '••••••••••••••••'}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-white transition"
                  title={showPassword ? 'Verberg' : 'Toon'}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleCopy(item.credentials?.passwordMasked || 'SuperSecurePass2026!#', 'Wachtwoord')}
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => {
              onClose();
              onOpenConsole(item);
            }}
            className="text-cyan-400 hover:text-cyan-300 text-[11px] font-bold flex items-center gap-1 transition"
          >
            <Sliders className="w-3 h-3" />
            <span>Open Volledige Account Console &rarr;</span>
          </button>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs transition"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
}
