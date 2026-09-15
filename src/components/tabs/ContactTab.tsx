import { useState, FormEvent } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Clock, ShieldCheck, Globe, HelpCircle } from 'lucide-react';

export function ContactTab() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [topic, setTopic] = useState<string>('escrow');
  const [message, setMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-2 font-mono">
          <span className="bg-cyan-500/10 text-cyan-400 text-xs px-2.5 py-1 rounded-lg border border-cyan-500/30 uppercase font-bold">
            Contact en Desk Ondersteuning
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Neem contact op met het Logs Rent team
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
          Heeft u vragen over een specifieke notering, escrow borgstellingen, Investbotiq API sleutels of zakelijke partnerschappen? Ons team reageert doorgaans binnen zestig minuten.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <h2 className="text-lg font-bold text-white font-mono mb-6 pb-3 border-b border-slate-800 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>Stuur een direct bericht</span>
          </h2>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3 font-mono">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Bericht succesvol verzonden</h3>
              <p className="text-xs text-slate-300">
                Bedankt voor uw bericht. Een medewerker van de Logs Rent arbitrage desk neemt spoedig contact met u op via het opgegeven e mailadres.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Uw Naam of Handelaarsnaam</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="bijvoorbeeld Alexander"
                    className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">Uw E mailadres</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="naam@domein.nl"
                    className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5 font-bold">Onderwerp van uw verzoek</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="escrow">Escrow en Borgtocht Vragen</option>
                  <option value="listing">Account Notering en Valuatie</option>
                  <option value="investbotiq">Investbotiq API en WebSockets</option>
                  <option value="dispuut">Dispuut en Arbitrage Spoed</option>
                  <option value="overig">Algemene Zakelijke Vraag</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5 font-bold">Uw Bericht</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Beschrijf uw vraag of situatie zo gedetailleerd mogelijk..."
                  className="w-full bg-[#080C14] border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 font-sans text-xs"
                />
              </div>

              <div className="p-3.5 bg-[#080C14] border border-slate-800 rounded-xl text-slate-400 text-[11px] leading-relaxed">
                <span className="text-emerald-400 font-bold block mb-0.5">Versleutelde Communicatie:</span>
                Alle inkomende berichten worden via end to end encryptie verwerkt door onze beveiligde beurs servers.
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Verzend Bericht</span>
              </button>
            </form>
          )}
        </div>

        {/* Direct Channels & Office Info */}
        <div className="space-y-6 font-mono text-xs">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Directe Kanalen</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-[#080C14] rounded-xl border border-slate-850">
                <span className="text-slate-500 block text-[10px]">ALGEMENE ONDERSTEUNING</span>
                <span className="text-white font-bold text-xs">desk@logs.rent</span>
              </div>

              <div className="p-3 bg-[#080C14] rounded-xl border border-slate-850">
                <span className="text-slate-500 block text-[10px]">ESCROW ARBITRAGE DESK</span>
                <span className="text-emerald-400 font-bold text-xs">escrow@logs.rent</span>
              </div>

              <div className="p-3 bg-[#080C14] rounded-xl border border-slate-850">
                <span className="text-slate-500 block text-[10px]">API EN INVESTBOTIQ PARTNERS</span>
                <span className="text-amber-400 font-bold text-xs">api@logs.rent</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Beschikbaarheid</span>
            </h3>

            <div className="space-y-2.5 text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Trading Desk:</span>
                <span className="text-emerald-400 font-bold">24 uur per dag</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Escrow Arbitrage:</span>
                <span>08:00 tot 23:00 CET</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Gemiddelde Reactietijd:</span>
                <span className="text-white font-bold">&lt; 35 minuten</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
