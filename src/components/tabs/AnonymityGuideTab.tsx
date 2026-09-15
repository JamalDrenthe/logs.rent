import { Shield, EyeOff, Lock, Server, CheckCircle2, AlertTriangle, FileKey } from 'lucide-react';

export function AnonymityGuideTab() {
  return (
    <div className="space-y-6 font-sans">
      {/* Hero Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2 font-mono">
          <EyeOff className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Veiligheid & ToS Protectie Protocol
          </span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2 font-mono">
          Veiligheid & Geanonimiseerde ID Notatie Gids
        </h2>
        <p className="text-slate-300 text-xs leading-relaxed max-w-3xl font-sans">
          Hoe de geanonimiseerde ID codering (zoals ID #9812) accounts 100% beschermt tegen
          voortijdige opsporing, ban risico's en schorsingen door externe platformen zoals TikTok,
          Uber, Meta en PlayStation.
        </p>
      </div>

      {/* Core Security Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-mono text-xs">
        {/* Pillar 1 */}
        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1.5">1. Geanonimiseerde Catalogus</h3>
            <p className="text-slate-300 text-xs font-sans leading-relaxed mb-4">
              Accounts worden uitsluitend weergegeven onder willekeurig gegenereerde identificaties
              (zoals ID #9812). Publieke handles, e-mailadressen en gebruikersnamen worden nooit
              publiekelijk geïndexeerd.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-[#080C14] border border-slate-850 text-[11px] text-slate-400">
            <span className="text-emerald-400 font-bold block mb-0.5">ToS Voordeel:</span>
            Platform crawlers en moderatie bots kunnen listings op Logs Rent niet linken aan een
            echt profiel.
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1.5">2. Residentiële Proxy Pairing</h3>
            <p className="text-slate-300 text-xs font-sans leading-relaxed mb-4">
              Bij elke accountoverdracht wijst Logs Rent automatisch een bijpassende residentiële
              proxy toe (bijvoorbeeld Amsterdam Ziggo IP). Hierdoor detecteren login servers geen
              verdachte geolocatie sprongen.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-[#080C14] border border-slate-850 text-[11px] text-slate-400">
            <span className="text-cyan-400 font-bold block mb-0.5">Geolocatie Matching:</span>
            Geen verdachte IP switches waardoor het ban risico nihil blijft.
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
              <FileKey className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1.5">3. Stealth Sessie Cookies & 2FA</h3>
            <p className="text-slate-300 text-xs font-sans leading-relaxed mb-4">
              In plaats van harde wachtwoord resets wisselt onze overdracht wizard geauthenticeerde
              sessie cookies en realtime TOTP authenticatietokens uit. Het platform ziet een
              doorlopende actieve sessie.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-[#080C14] border border-slate-850 text-[11px] text-slate-400">
            <span className="text-amber-400 font-bold block mb-0.5">Zero Security Trigger:</span>
            Geen 'Password Changed' of 'Suspicious Activity' notificaties.
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl font-mono text-xs">
        <h3 className="text-base font-bold text-white mb-4 border-b border-slate-800 pb-3">
          Vergelijking: Traditionele Marktplaatsen versus Logs Rent Beurs
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-[11px]">
                <th className="pb-3">BEVEILIGINGSASPECT</th>
                <th className="pb-3 text-rose-400">TRADITIONEEL (FORUMS / TELEGRAM)</th>
                <th className="pb-3 text-emerald-400">LOGS RENT BEURS SYSTEEM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              <tr>
                <td className="py-3 font-bold text-white">Weergave in Catalogus</td>
                <td className="text-rose-400">Openbare screenshots met zichtbare profielnaam</td>
                <td className="text-emerald-400 font-bold">100% Geanonimiseerde ID Notatie (ID #9812)</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-white">Overdrachtsmethode</td>
                <td className="text-rose-400">Handmatige overdracht via chat zonder borg</td>
                <td className="text-emerald-400 font-bold">Geautomatiseerde Escrow Smart Contract Handoff</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-white">2FA Authenticatie</td>
                <td className="text-rose-400">Verkoper moet continu handmatig codes SMS'en</td>
                <td className="text-emerald-400 font-bold">Dynamische TOTP Generator met 30s Countdown</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-white">Risico bij Account Ban</td>
                <td className="text-rose-400">Geld kwijt, geen verhaal of vergoeding</td>
                <td className="text-emerald-400 font-bold">100% Borgteruggave via Dispuut Centrum</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
