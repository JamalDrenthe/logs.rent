import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Key,
  Copy,
  CheckCircle2,
  Lock,
  RefreshCw,
  X,
  ArrowRight,
  Server,
  FileCheck2,
  Sparkles
} from 'lucide-react';

interface HandoffWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId?: number;
  accountTitle?: string;
  onSuccess?: () => void;
}

export function HandoffWizardModal({
  isOpen,
  onClose,
  accountId = 9812,
  accountTitle = 'TikTok Verified Creator 85K [ID #9812]',
  onSuccess
}: HandoffWizardModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [totpCode, setTotpCode] = useState<string>('849 201');
  const [secondsLeft, setSecondsLeft] = useState<number>(30);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isCookieInjected, setIsCookieInjected] = useState<boolean>(false);

  // Synchronized TOTP token timer with continuous countdown
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      const now = new Date();
      const sec = 30 - (now.getSeconds() % 30);
      setSecondsLeft(sec);
      if (sec === 30 || sec === 0) {
        generateRandomTotp();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const generateRandomTotp = () => {
    const raw = Math.floor(100000 + Math.random() * 900000).toString();
    setTotpCode(`${raw.slice(0, 3)} ${raw.slice(3)}`);
  };

  if (!isOpen) return null;

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const steps = [
    { num: 1, title: 'Borg Vastlegging' },
    { num: 2, title: 'Inlog & Cookies' },
    { num: 3, title: '2FA Token Wissel' },
    { num: 4, title: 'Handshake & Release' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-slate-700/80 w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">
                Geautomatiseerde 2FA & Escrow Handoff Wizard
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Stealth Protocol
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Beveiligde overdracht voor {accountTitle}
            </p>
          </div>
        </div>

        {/* Steps Breadcrumbs */}
        <div className="grid grid-cols-4 gap-2 mb-6 font-mono text-xs">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`p-2 rounded-xl border text-center transition ${
                currentStep === s.num
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 font-bold'
                  : currentStep > s.num
                  ? 'bg-slate-900 text-slate-300 border-slate-800'
                  : 'bg-slate-950 text-slate-500 border-slate-900'
              }`}
            >
              <div className="text-[10px] opacity-75">Stap {s.num}</div>
              <div className="truncate">{s.title}</div>
            </div>
          ))}
        </div>

        {/* STEP 1: Borg Vastlegging */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="bg-[#080C14] p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Account Referentie:</span>
                <span className="text-white font-bold">ID #{accountId}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Escrow Smart Contract Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Gevalideerd & Geblokkeerd
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Borgsom Veiligheid:</span>
                <span className="text-white">€ 250,00 (Vastgezet in Escrow)</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Audit Risico Ban Score:</span>
                <span className="text-emerald-400 font-bold">0.0% (Clean Audit)</span>
              </div>
            </div>

            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-xs text-cyan-300 flex items-start gap-2.5">
              <Lock className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
              <span>
                Het overeengekomen bedrag en de borg staan vergrendeld. De verkoper ontvangt pas
                betaling zodra jij succesvol hebt ingelogd en de 2FA handoff is bevestigd.
              </span>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span>Ga Verder naar Credential & Cookie Overdracht</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Inlog & Sessie Cookies */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="bg-[#080C14] p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Gebruikersnaam / E-mail:</span>
                <div className="flex items-center gap-2">
                  <code className="text-white bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    user_verified_9812@stealthmail.net
                  </code>
                  <button
                    onClick={() => copyToClipboard('user_verified_9812@stealthmail.net', 'user')}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tijdelijk Wachtwoord:</span>
                <div className="flex items-center gap-2">
                  <code className="text-emerald-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 font-bold">
                    LR_98#Stealth_Pass2026!
                  </code>
                  <button
                    onClick={() => copyToClipboard('LR_98#Stealth_Pass2026!', 'pwd')}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Toegewezen Residentiële Proxy IP:</span>
                <span className="text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1">
                  <Server className="w-3 h-3" />
                  185.220.101.42 (NL Amsterdam)
                </span>
              </div>
            </div>

            {/* Session Cookie Box */}
            <div className="bg-[#080C14] p-3 rounded-xl border border-slate-800 text-xs font-mono">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-slate-400">Sessie Cookies (Stealth Token):</span>
                <button
                  onClick={() => setIsCookieInjected(true)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg transition ${
                    isCookieInjected
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  {isCookieInjected ? '✓ Cookies Geïnjecteerd' : 'Injecteer Sessie Cookie'}
                </button>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg text-slate-400 text-[11px] break-all border border-slate-900 font-mono">
                session_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...sec_id_9812_token_authenticated
              </div>
            </div>

            {copiedKey && (
              <div className="text-[11px] font-mono text-emerald-400 text-center">
                ✓ Gekopieerd naar klembord!
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-xs font-mono transition"
              >
                Vorige Stap
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs font-mono transition flex items-center justify-center gap-1.5"
              >
                <span>Naar 2FA Token Stap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: 2FA Token Wissel (Live TOTP) */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="bg-[#080C14] p-6 rounded-xl border border-slate-800 text-center font-mono">
              <span className="text-[11px] text-slate-400 uppercase tracking-widest block mb-1">
                Dynamische 2FA TOTP Verificatie Code
              </span>
              <div className="text-4xl font-black text-emerald-400 tracking-widest my-2">
                {totpCode}
              </div>

              {/* Countdown Progress Bar */}
              <div className="w-full max-w-xs mx-auto bg-slate-800 h-2 rounded-full overflow-hidden mt-3 mb-2">
                <div
                  className="bg-emerald-400 h-full transition-all duration-1000"
                  style={{ width: `${(secondsLeft / 30) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400">
                Code ververst over <strong className="text-white">{secondsLeft}s</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => copyToClipboard(totpCode.replace(/\s+/g, ''), 'totp')}
                className="bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs py-2.5 px-3 rounded-xl border border-slate-700 transition flex items-center justify-center gap-2"
              >
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kopieer 2FA Code</span>
              </button>
              <button
                onClick={generateRandomTotp}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs py-2.5 px-3 rounded-xl border border-slate-700 transition flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Genereer Nieuwe Code</span>
              </button>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 font-mono">
              Vul deze code in op het platform login scherm. Omdat het account gekoppeld is aan ons
              veilige escrow systeem, genereert de simulator exact geldige TOTP tokens.
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-xs font-mono transition"
              >
                Vorige Stap
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs font-mono transition flex items-center justify-center gap-1.5"
              >
                <span>Login Geslaagd • Naar Handshake</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Handshake & Release */}
        {currentStep === 4 && (
          <div className="space-y-4 font-mono text-xs">
            <div className="bg-[#080C14] p-5 rounded-xl border border-emerald-500/40 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Transactie & Overdracht Voltooid!</h4>
              <p className="text-slate-300 max-w-md mx-auto">
                Koper en verkoper hebben de overdracht bevestigd. De escrow borgsom van € 250 blijft
                beveiligd tot het einde van de huurtermijn en is beschermd tegen bans.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300">
              <div>
                <span className="text-slate-500 block">Status:</span>
                <span className="text-emerald-400 font-bold">Actief & Verhuurd</span>
              </div>
              <div>
                <span className="text-slate-500 block">Escrow Polis:</span>
                <span className="text-white">100% Borg Garantie</span>
              </div>
            </div>

            <button
              onClick={() => {
                onSuccess?.();
                onClose();
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sluit Wizard & Bekijk Actief Contract</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
