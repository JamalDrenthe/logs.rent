import { useState } from 'react';
import { Calculator, Sparkles, ShieldCheck, ArrowRight, TrendingUp } from 'lucide-react';

interface ValuatieTabProps {
  onOpenListingModal: () => void;
}

export function ValuatieTab({ onOpenListingModal }: ValuatieTabProps) {
  const [platform, setPlatform] = useState<string>('tiktok');
  const [ageMonths, setAgeMonths] = useState<number>(36);
  const [metrics, setMetrics] = useState<number>(45000);
  const [verification, setVerification] = useState<string>('full');

  // Algorithm calculation
  let multiplier = 0.026;
  if (platform === 'uber') multiplier = 0.42; // Ritten & Rating
  if (platform === 'facebook') multiplier = 0.035;
  if (platform === 'psn') multiplier = 2.8;

  let baseVal = metrics * multiplier + ageMonths * 18;
  let grade = 'A';
  let escrowBorg = 250;
  let banRisk = '0%';

  if (verification === 'partial') {
    baseVal *= 0.82;
    grade = 'B';
    escrowBorg = 160;
    banRisk = '4%';
  } else if (verification === 'none') {
    baseVal *= 0.58;
    grade = 'C';
    escrowBorg = 90;
    banRisk = '14%';
  }

  const calculatedPrice = Math.max(150, Math.round(baseVal));
  const dailyRent = Math.max(8, Math.round(calculatedPrice * 0.024));
  const monthlyYield = Math.round(((dailyRent * 30) / calculatedPrice) * 100);

  return (
    <div className="space-y-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Input */}
        <div className="lg:col-span-2 bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="mb-6 pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
              <Calculator className="w-5 h-5 text-emerald-400" />
              <span>Geautomatiseerd Account Waarderings & Valuatie Algoritme</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Bereken direct de reële beurswaarde, geschatte daghuur, risico gradering (A/B/C) en
              borgstelling op basis van historische beursdata.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1.5">Selecteer Platform / Sector</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="tiktok">TikTok (Volgers & Creator Monetisatie)</option>
                  <option value="uber">Uber / Bolt Rider & Driver Profile</option>
                  <option value="psn">PlayStation Network (AAA Games & PS Plus)</option>
                  <option value="facebook">Facebook Ads Aged (Unlimited Daily Spend)</option>
                  <option value="x">Twitter / X (Aged Verified Badge)</option>
                  <option value="flex">Flexwerk / Temper Profile (5-Star Shifts)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5">Accountleeftijd (Aged History)</label>
                <select
                  value={ageMonths}
                  onChange={(e) => setAgeMonths(Number(e.target.value))}
                  className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value={4}>Jonger dan 6 maanden (Nieuw / Budget)</option>
                  <option value={14}>6 maanden tot 2 jaar (Gemiddeld)</option>
                  <option value={36}>2 tot 4 jaar (Gevestigd)</option>
                  <option value={60}>Ouder dan 5 jaar (Aged Heritage)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1.5">
                  Bereik / Aantal Volgers of Ritten
                </label>
                <input
                  type="number"
                  min="100"
                  value={metrics}
                  onChange={(e) => setMetrics(Math.max(100, Number(e.target.value)))}
                  className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5">Verificatiestatus & E-mail Eigendom</label>
                <select
                  value={verification}
                  onChange={(e) => setVerification(e.target.value)}
                  className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="full">Volledig geverifieerd + OGE E-mail (A-Grade)</option>
                  <option value="partial">Telefoon / 2FA gekoppeld (B-Grade)</option>
                  <option value="none">Geen originele e-mail / Basis (C-Grade)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Instant Valuation Report Card */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between font-mono">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Berekend Valuatie Rapport
            </h3>

            <div className="text-center py-5 bg-[#080C14] rounded-2xl border border-slate-800/80 mb-4 shadow-inner">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                Geschatte Beurs Vraagprijs
              </span>
              <div className="text-3xl font-black text-emerald-400">
                € {calculatedPrice.toLocaleString('nl-NL')},00
              </div>
              <span className="text-xs text-slate-300 mt-1 block">
                Mogelijke dagelijkse huur: <strong className="text-white">€ {dailyRent},00 /dag</strong>
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Gealloceerde Status:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded border text-[11px] ${
                    grade === 'A'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : grade === 'B'
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {grade} STATUS
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Borgsom Escrow:</span>
                <span className="text-white font-bold">€ {escrowBorg},00</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Ban Risico Score:</span>
                <span className="text-emerald-400 font-bold">{banRisk}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">Verwacht Maandrendement:</span>
                <span className="text-emerald-400 font-bold">+{monthlyYield}% / mnd</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={onOpenListingModal}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Direct Noteren met deze Waarde</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
