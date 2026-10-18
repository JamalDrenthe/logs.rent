import { useState } from 'react';
import {
  ShieldCheck,
  Smartphone,
  Laptop,
  Lock,
  Key,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  RefreshCw,
  Clock
} from 'lucide-react';

interface AccountSecurityProps {
  currentUserEmail?: string;
}

export function AccountSecurity({ currentUserEmail = 'info@logs.rent' }: AccountSecurityProps) {
  const [sessions, setSessions] = useState([
    {
      id: 'sess-1',
      device: 'Chrome 124 op Linux x86_64',
      type: 'desktop',
      ip: '82.161.44.120',
      location: 'Amsterdam, Nederland',
      isCurrent: true,
      lastActive: 'Nu actief'
    },
    {
      id: 'sess-2',
      device: 'Safari 17.5 op iPhone 15 Pro',
      type: 'mobile',
      ip: '188.206.91.42',
      location: 'Rotterdam, Nederland',
      isCurrent: false,
      lastActive: '3 uur geleden'
    }
  ]);

  const [revokedMsg, setRevokedMsg] = useState<string | null>(null);

  const handleRevokeOtherSessions = () => {
    setSessions((prev) => prev.filter((s) => s.isCurrent));
    setRevokedMsg('Alle overige actieve sessies en apparaten zijn succesvol afgemeld!');
    setTimeout(() => setRevokedMsg(null), 3500);
  };

  const auditLogs = [
    { id: '1', event: 'Inloggen geslaagd via Google OAuth', ip: '82.161.44.120', time: 'Vandaag 09:12', status: 'Succesvol' },
    { id: '2', event: 'SEPA IBAN verificatie voltooid', ip: '82.161.44.120', time: '12 Okt 14:30', status: 'Gevalideerd' },
    { id: '3', event: 'Developer API-sleutel gegenereerd', ip: '82.161.44.120', time: '10 Okt 11:20', status: 'Succesvol' },
    { id: '4', event: '2FA TOTP handshake gecontroleerd', ip: '188.206.91.42', time: '08 Okt 18:05', status: 'Succesvol' }
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>BEVEILIGINGS- EN SESSIECENTRUM</span>
          </div>
          <h3 className="text-xl font-black text-white">
            Twee-Staps Verificatie, Toegang &amp; Apparaatbeheer
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">
            Bescherm je Logs.rent account, handelskassa en IBAN tegen ongeautoriseerde toegang.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Account Beveiligingsscore: 100%</span>
          </span>
        </div>
      </div>

      {revokedMsg && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{revokedMsg}</span>
        </div>
      )}

      {/* Grid of Security Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Twee-staps verificatie (2FA) */}
        <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-bold text-white text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Twee-Staps Verificatie (2FA / TOTP)</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                INGESCHAKELD
              </span>
            </div>

            <p className="text-slate-400 text-xs mt-3 leading-relaxed">
              Elke inlogpoging, SEPA IBAN wijziging en opname wordt beschermd met een dynamische 6-cijferige verificatiecode via Google Authenticator of TOTP protocol.
            </p>

            <div className="mt-4 p-3 bg-[#080C14] border border-slate-800 rounded-xl space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Authenticatie Methode:</span>
                <span className="text-white font-bold">Google OAuth &amp; TOTP Token</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Gekoppeld E-mailadres:</span>
                <span className="text-cyan-400 font-bold">{currentUserEmail}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
            <span>Status:</span>
            <span className="text-emerald-400 font-bold">Volledig beveiligd</span>
          </div>
        </div>

        {/* 2. Google OAuth Koppeling */}
        <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-bold text-white text-sm flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-400" />
                <span>Geautoriseerde Domein Authenticatie</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">
                OFFICIEEL
              </span>
            </div>

            <p className="text-slate-400 text-xs mt-3 leading-relaxed">
              Jouw account is exclusief geautoriseerd via Google OAuth onder het officiële domein van <strong>logs.rent</strong>. Directe wachtwoord-bypass is vergrendeld.
            </p>

            <div className="mt-4 p-3 bg-[#080C14] border border-slate-800 rounded-xl space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Geautoriseerde Identiteit:</span>
                <span className="text-emerald-400 font-bold">{currentUserEmail}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Beheerrechten:</span>
                <span className="text-white font-bold">{currentUserEmail === 'info@logs.rent' ? 'Platform Administrator' : 'Geverifieerd Handelaar'}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
            <span>OAuth Domein:</span>
            <span className="text-cyan-400 font-bold">logs.rent</span>
          </div>
        </div>
      </div>

      {/* 3. ACTIEVE APPARATEN & INLOGSESSIES */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h4 className="text-white font-bold text-sm flex items-center gap-2">
              <Laptop className="w-4 h-4 text-indigo-400" />
              <span>Actieve Apparaten &amp; Inlogsessies ({sessions.length})</span>
            </h4>
            <span className="text-slate-400 text-[11px]">
              Apparaten die momenteel zijn ingelogd op jouw account
            </span>
          </div>

          {sessions.length > 1 && (
            <button
              onClick={handleRevokeOtherSessions}
              className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Beëindig Alle Overige Sessies</span>
            </button>
          )}
        </div>

        <div className="space-y-3">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              className="p-4 bg-[#080C14] border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-850 flex items-center justify-center text-slate-300">
                  {sess.type === 'desktop' ? <Laptop className="w-5 h-5 text-cyan-400" /> : <Smartphone className="w-5 h-5 text-indigo-400" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-xs">{sess.device}</span>
                    {sess.isCurrent && (
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[9px] border border-emerald-500/30">
                        DIT APPARAAT
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    IP: {sess.ip} • {sess.location} • {sess.lastActive}
                  </div>
                </div>
              </div>

              <span className="text-emerald-400 text-[11px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Geauthenticeerd</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. BEVEILIGINGS- EN AUDITLOGBOEK */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h4 className="text-white font-bold text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Beveiligings- &amp; Toegangslogboek</span>
          </h4>
          <span className="text-slate-400 text-[11px]">
            Laatste 4 gebeurtenissen
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-[10px] bg-[#080C14]">
                <th className="py-2.5 px-3">GEBEURTENIS</th>
                <th className="py-2.5 px-3">IP-ADRES</th>
                <th className="py-2.5 px-3">TIJDSTIP</th>
                <th className="py-2.5 px-3 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-850/50 transition">
                  <td className="py-2.5 px-3 font-bold text-white text-[11px]">{log.event}</td>
                  <td className="py-2.5 px-3 text-slate-400 text-[10px]">{log.ip}</td>
                  <td className="py-2.5 px-3 text-slate-400 text-[10px]">{log.time}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
