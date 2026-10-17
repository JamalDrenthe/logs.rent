import { useState } from 'react';
import {
  Bell,
  Globe,
  Sliders,
  CheckCircle2,
  Lock,
  Volume2,
  Mail,
  Smartphone,
  EyeOff
} from 'lucide-react';

export function AccountSettings() {
  const [emailAlerts, setEmailAlerts] = useState<boolean>(true);
  const [smsContractAlerts, setSmsContractAlerts] = useState<boolean>(true);
  const [payoutAlerts, setPayoutAlerts] = useState<boolean>(true);
  const [disputeAlerts, setDisputeAlerts] = useState<boolean>(true);
  const [soundEffects, setSoundEffects] = useState<boolean>(true);
  const [currency, setCurrency] = useState<string>('EUR');
  const [timezone, setTimezone] = useState<string>('Europe/Amsterdam');
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const handleSave = () => {
    setSavedMsg('Alle accountvoorkeuren en notificatie-instellingen succesvol bijgewerkt!');
    setTimeout(() => setSavedMsg(null), 3000);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>NOTIFICATIES &amp; ACCOUNTINSTELLINGEN</span>
          </div>
          <h3 className="text-xl font-black text-white">
            Voorkeuren, Meldingen &amp; Weergave
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">
            Configureer hoe en wanneer je alerts ontvangt over verkopen, contracten en uitbetalingen.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition shadow-md shadow-emerald-500/20 text-xs flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Voorkeuren Opslaan</span>
        </button>
      </div>

      {savedMsg && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{savedMsg}</span>
        </div>
      )}

      {/* Grid: Notifications & Interface Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notificatie Triggers */}
        <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-bold text-white text-sm flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              <span>Notificaties &amp; Alerts</span>
            </span>
            <span className="text-slate-400 text-[10px]">E-mail &amp; SMS</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#080C14] border border-slate-800 rounded-xl">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Nieuwe Order &amp; Verhuurder</span>
                  <span className="text-[10px] text-slate-400">Directe e-mail zodra iemand jouw account huurt of koopt</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 shrink-0 ${
                  emailAlerts ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${emailAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#080C14] border border-slate-800 rounded-xl">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">SMS Alert: Contractverloop</span>
                  <span className="text-[10px] text-slate-400">SMS-waarschuwing 2 uur voordat een huurcontract afloopt</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSmsContractAlerts(!smsContractAlerts)}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 shrink-0 ${
                  smsContractAlerts ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${smsContractAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#080C14] border border-slate-800 rounded-xl">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">SEPA IBAN Uitbetaling Bevestiging</span>
                  <span className="text-[10px] text-slate-400">Ontvang afschriftbewijs bij elke voltooide opname</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPayoutAlerts(!payoutAlerts)}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 shrink-0 ${
                  payoutAlerts ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${payoutAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#080C14] border border-slate-800 rounded-xl">
              <div className="flex items-center gap-2.5">
                <Volume2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Orderboek Audio Feedback</span>
                  <span className="text-[10px] text-slate-400">Subtiel geluidssignaal bij gematchte orders</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSoundEffects(!soundEffects)}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 shrink-0 ${
                  soundEffects ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${soundEffects ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Region & Privacy Preferences */}
        <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-bold text-white text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Regio, Valuta &amp; Privacy Protocol</span>
            </span>
            <span className="text-slate-400 text-[10px]">Standaardwaarden</span>
          </div>

          <div className="space-y-3.5">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Standaard Handelsvaluta</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-cyan-500"
              >
                <option value="EUR">EUR (€) - Europese Euro (Standaard SEPA)</option>
                <option value="USD">USD ($) - Amerikaanse Dollar</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Tijdzone voor Contracten &amp; Rekeningsafschriften</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-cyan-500"
              >
                <option value="Europe/Amsterdam">Europe/Amsterdam (CET / CEST)</option>
                <option value="Europe/London">Europe/London (GMT / BST)</option>
                <option value="America/New_York">America/New_York (EST / EDT)</option>
              </select>
            </div>

            {/* Anonymity Protocol Compliance */}
            <div className="p-3.5 bg-[#080C14] border border-emerald-500/30 rounded-xl space-y-1.5 mt-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <EyeOff className="w-4 h-4" />
                <span>Geanonimiseerde ID Notatie Actief</span>
              </div>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                Jouw genoteerde accounts worden altijd publiek afgeschermd achter ID codes (zoals ID #9812). Publieke handles worden pas na escrow handoff en TOTP handshake vrijgegeven.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
