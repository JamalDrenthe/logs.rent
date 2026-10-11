import { useState } from 'react';
import { PortfolioItem, WalletTransaction, UserRole } from '../../types';
import { Wallet, ShieldCheck, Clock, CheckCircle2, Pause, Play, Plus, ArrowUpRight, Lock, User, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

interface PortfolioTabProps {
  portfolio: PortfolioItem[];
  unclaimedYield: number;
  onClaimYield: () => void;
  onOpenListingModal: () => void;
  onOpenWalletModal: () => void;
  onToggleAccountStatus: (id: string) => void;
  userRole?: UserRole;
  onOpenAuthModal?: () => void;
  onSwitchToTraderDemo?: () => void;
}

export function PortfolioTab({
  portfolio,
  unclaimedYield,
  onClaimYield,
  onOpenListingModal,
  onOpenWalletModal,
  onToggleAccountStatus,
  userRole = 'trader',
  onOpenAuthModal,
  onSwitchToTraderDemo
}: PortfolioTabProps) {
  const [claimedAlert, setClaimedAlert] = useState<boolean>(false);

  // If visitor, show dedicated conversion and preview screen
  if (userRole === 'visitor') {
    return (
      <div className="space-y-8 font-sans py-4">
        {/* Guest Portfolio Teaser Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-[#0F172A] to-[#080C14] p-8 sm:p-12 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-5 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
              <Lock className="w-3.5 h-3.5" />
              <span>HANDELAARS OMGEVING • INLOGGEN VEREIST</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Jouw Persoonlijke Handelskassa &amp; <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Asset Portfolio Beheer
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Als geregistreerde handelaar op Logs Rent beheer je hier al je actieve huurcontracten,
              volg je realtime passieve dagopbrengsten, beheer je escrow borgsommen en vraag je directe
              uitbetalingen aan naar je bank of crypto wallet.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3 font-mono text-xs">
              <button
                onClick={onOpenAuthModal}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center gap-2.5 shadow-lg shadow-emerald-500/20"
              >
                <User className="w-4 h-4 text-slate-950" />
                <span>Inloggen / Account Maken</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onSwitchToTraderDemo && (
                <button
                  onClick={onSwitchToTraderDemo}
                  className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Bekijk Demo Handelaar Portfolio</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3 Pillars of Trader Portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
          <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm">Passief Dagelijks Huurrendement</h4>
            <p className="text-slate-400 font-sans text-xs leading-relaxed">
              Verhuur overtollige accounts per dag en ontvang automatisch huurinkomsten rechtstreeks in je Handelskassa.
            </p>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm">100% Escrow Borgsom Garantie</h4>
            <p className="text-slate-400 font-sans text-xs leading-relaxed">
              Alle huurders leggen een verplichte borg in escrow. Bij contractbreuk of wijzigingen keert het systeem de borg aan jou uit.
            </p>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Wallet className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm">Directe Handelskassa Wallet</h4>
            <p className="text-slate-400 font-sans text-xs leading-relaxed">
              Stort of neem direct liquiditeit op via SEPA, iDEAL of Crypto met transparante transactieoverzichten.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const totalPortfolioValue = portfolio.reduce((acc, item) => acc + item.currentValue, 0);
  const totalDailyRent = portfolio
    .filter((i) => i.status === 'Actief Verhuurd')
    .reduce((acc, item) => acc + item.dailyRent, 0);
  const totalEscrowLocked = portfolio.reduce((acc, item) => acc + item.escrowLocked, 0);
  const totalEarnedHistorical = portfolio.reduce((acc, item) => acc + item.totalEarned, 0);

  const handleClaim = () => {
    if (unclaimedYield <= 0) return;
    onClaimYield();
    setClaimedAlert(true);
    setTimeout(() => setClaimedAlert(false), 2500);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Portfolio Overview Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">Totale Portfolio Waarde</span>
          <span className="text-2xl font-black text-white block">
            € {totalPortfolioValue.toLocaleString('nl-NL')},00
          </span>
          <span className="text-[11px] text-emerald-400 mt-2 block font-bold">
            +€ 380,00 winst deze maand
          </span>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">Passief Dagelijks Huurrendement</span>
          <span className="text-2xl font-black text-emerald-400 block">
            € {totalDailyRent.toLocaleString('nl-NL')},00 /dag
          </span>
          <span className="text-[11px] text-slate-400 mt-2 block">
            Gegenereerd door {portfolio.filter((i) => i.status === 'Actief Verhuurd').length} actieve huurders
          </span>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">Vastzittende Escrow Borgsommen</span>
          <span className="text-2xl font-black text-amber-400 block">
            € {totalEscrowLocked.toLocaleString('nl-NL')},00
          </span>
          <span className="text-[11px] text-slate-400 mt-2 block">
            Vrijgave na afloop contracttermijn
          </span>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Onopgehaald Rendement</span>
            <div className="text-2xl font-black text-white">
              € {unclaimedYield.toLocaleString('nl-NL')},00
            </div>
          </div>
          <button
            onClick={handleClaim}
            disabled={unclaimedYield <= 0}
            className={`mt-2 py-2 px-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md ${
              unclaimedYield > 0
                ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Claim naar Handelskassa</span>
          </button>
        </div>
      </div>

      {claimedAlert && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Rendement succesvol bijgeschreven op uw Handelskassa Wallet!</span>
        </div>
      )}

      {/* Active Accounts Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-4 font-mono">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>Mijn Verhurende Accounts op de Beurs</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Overzicht van actieve contracten, gegenereerde inkomsten en huurstatus
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenWalletModal}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs border border-slate-700 transition"
            >
              Handelskassa Saldo
            </button>
            <button
              onClick={onOpenListingModal}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs transition flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nieuw Account Noteren</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-[11px]">
                <th className="pb-3">ACCOUNT IDENTIFICATIE</th>
                <th className="pb-3">STATUS GRADE</th>
                <th className="pb-3">HUIDIGE WAARDE</th>
                <th className="pb-3">DAGHUUR</th>
                <th className="pb-3">VERDIEND TOTAAL</th>
                <th className="pb-3">STATUS</th>
                <th className="pb-3">TERMIJN</th>
                <th className="pb-3 text-right">ACTIE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {portfolio.map((item) => (
                <tr key={item.id} className="hover:bg-[#080C14]/50 transition">
                  <td className="py-3.5 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#080C14] border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-[10px]">
                        {item.platform.slice(0, 2).toUpperCase()}
                      </span>
                      <div>
                        <div>{item.accountTitle}</div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          Huurder: {item.renterOrBuyer}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`px-2 py-0.5 rounded border text-[10px] font-bold ${
                        item.grade === 'A'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                      }`}
                    >
                      {item.grade} Grade
                    </span>
                  </td>
                  <td>€ {item.currentValue.toLocaleString('nl-NL')},00</td>
                  <td className="text-emerald-400 font-bold">€ {item.dailyRent},00 /dag</td>
                  <td className="text-white font-bold">€ {item.totalEarned},00</td>
                  <td>
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${
                        item.status === 'Actief Verhuurd' ? 'text-emerald-400' : 'text-slate-400'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.status === 'Actief Verhuurd'
                            ? 'bg-emerald-400 animate-pulse'
                            : 'bg-slate-500'
                        }`}
                      />
                      <span>{item.status}</span>
                    </span>
                  </td>
                  <td className="text-slate-400 text-[11px]">{item.contractEnds}</td>
                  <td className="text-right">
                    <button
                      onClick={() => onToggleAccountStatus(item.id)}
                      className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl text-slate-300 transition text-[11px] border border-slate-700/80"
                    >
                      {item.status === 'Actief Verhuurd' ? 'Pauzeren' : 'Hervatten'}
                    </button>
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
