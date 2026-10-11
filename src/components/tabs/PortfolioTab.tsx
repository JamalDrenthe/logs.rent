import { useState } from 'react';
import { PortfolioItem, WalletTransaction, UserRole } from '../../types';
import {
  Wallet,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Pause,
  Play,
  Plus,
  ArrowUpRight,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Key,
  Copy,
  AlertTriangle,
  Layers,
  X,
  Eye,
  EyeOff,
  ShoppingBag
} from 'lucide-react';

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
  onOpenHandoffModal?: () => void;
  onOpenDisputeModal?: (accountId: number) => void;
  onRelistItem?: (item: PortfolioItem) => void;
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
  onSwitchToTraderDemo,
  onOpenHandoffModal,
  onOpenDisputeModal,
  onRelistItem
}: PortfolioTabProps) {
  const [claimedAlert, setClaimedAlert] = useState<boolean>(false);
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'bought' | 'rented' | 'listed'>('all');
  const [credentialsItem, setCredentialsItem] = useState<PortfolioItem | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

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
              Als geregistreerde handelaar op Logs Rent beheer je hier al je aangekochte accounts,
              actieve huurcontracten, dagelijkse passieve inkomsten, escrow borgsommen en vraag je directe
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

  // Filter items by type
  const boughtItems = portfolio.filter((i) => i.type === 'KOOP' || i.status === 'Eigendom (Gekocht)');
  const rentedItems = portfolio.filter((i) => i.type === 'HUUR' || i.status === 'In Huur (Actief)');
  const listedItems = portfolio.filter((i) => i.type === 'NOTERING' || i.status === 'Actief Verhuurd' || i.status === 'Gepauzeerd');

  const filteredPortfolio = portfolio.filter((item) => {
    if (portfolioFilter === 'bought') return item.type === 'KOOP' || item.status === 'Eigendom (Gekocht)';
    if (portfolioFilter === 'rented') return item.type === 'HUUR' || item.status === 'In Huur (Actief)';
    if (portfolioFilter === 'listed') return item.type === 'NOTERING' || item.status === 'Actief Verhuurd' || item.status === 'Gepauzeerd';
    return true;
  });

  const totalPortfolioValue = portfolio.reduce((acc, item) => acc + item.currentValue, 0);
  const totalBoughtValue = boughtItems.reduce((acc, item) => acc + item.currentValue, 0);
  const totalDailyRent = listedItems
    .filter((i) => i.status === 'Actief Verhuurd')
    .reduce((acc, item) => acc + item.dailyRent, 0);
  const totalEscrowLocked = rentedItems.reduce((acc, item) => acc + item.escrowLocked, 0);

  const handleClaim = () => {
    if (unclaimedYield <= 0) return;
    onClaimYield();
    setClaimedAlert(true);
    setTimeout(() => setClaimedAlert(false), 2500);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(`${label} gekopieerd naar klembord!`);
    setTimeout(() => setCopyFeedback(null), 2000);
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
            {portfolio.length} Actieve Posities in Eigendom &amp; Beheer
          </span>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">Aangekocht Eigendom</span>
          <span className="text-2xl font-black text-cyan-400 block">
            € {totalBoughtValue.toLocaleString('nl-NL')},00
          </span>
          <span className="text-[11px] text-slate-400 mt-2 block">
            {boughtItems.length} accounts permanent in bezit
          </span>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">Passief Dagelijks Huurrendement</span>
          <span className="text-2xl font-black text-emerald-400 block">
            € {totalDailyRent.toLocaleString('nl-NL')},00 /dag
          </span>
          <span className="text-[11px] text-slate-400 mt-2 block">
            Gegenereerd door {listedItems.filter((i) => i.status === 'Actief Verhuurd').length} verhuurde accounts
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

      {/* Main Asset Management Card */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        {/* Top Header with Handelaar Sub-Tabs */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-5 font-mono">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>Mijn Activa, Aankopen &amp; Posities</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct inzicht in gekochte logins, actieve huurleases en gegenereerde opbrengsten
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={onOpenWalletModal}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 transition flex items-center gap-1.5"
            >
              <Wallet className="w-3.5 h-3.5 text-cyan-400" />
              <span>Handelskassa</span>
            </button>
            <button
              onClick={onOpenListingModal}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nieuw Account Noteren</span>
            </button>
          </div>
        </div>

        {/* Sub-Filters: Alle | Gekocht | Gehuurd | Noteringen */}
        <div className="flex flex-wrap items-center gap-2 mb-5 font-mono text-xs">
          <button
            onClick={() => setPortfolioFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 border ${
              portfolioFilter === 'all'
                ? 'bg-slate-800 text-white font-bold border-slate-600 shadow-sm'
                : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Alle Activa ({portfolio.length})</span>
          </button>
          <button
            onClick={() => setPortfolioFilter('bought')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 border ${
              portfolioFilter === 'bought'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border-cyan-500/40 shadow-sm'
                : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Gekochte Accounts ({boughtItems.length})</span>
          </button>
          <button
            onClick={() => setPortfolioFilter('rented')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 border ${
              portfolioFilter === 'rented'
                ? 'bg-indigo-500/20 text-indigo-300 font-bold border-indigo-500/40 shadow-sm'
                : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>In Huur ({rentedItems.length})</span>
          </button>
          <button
            onClick={() => setPortfolioFilter('listed')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 border ${
              portfolioFilter === 'listed'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border-emerald-500/40 shadow-sm'
                : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verhuurde Noteringen ({listedItems.length})</span>
          </button>
        </div>

        {/* Table of Assets */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-[10px] uppercase">
                <th className="pb-3">ACCOUNT IDENTIFICATIE</th>
                <th className="pb-3">TYPE / STATUS</th>
                <th className="pb-3">WAARDE</th>
                <th className="pb-3">DAGHUUR / RENDEMENT</th>
                <th className="pb-3">TERMIJN</th>
                <th className="pb-3 text-right">HANDELAAR ACTIES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {filteredPortfolio.map((item) => {
                const isBought = item.type === 'KOOP' || item.status === 'Eigendom (Gekocht)';
                const isRented = item.type === 'HUUR' || item.status === 'In Huur (Actief)';
                const isListed = !isBought && !isRented;

                return (
                  <tr key={item.id} className="hover:bg-[#080C14]/60 transition">
                    <td className="py-3.5 font-bold text-white">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-[#080C14] border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-[10px] shrink-0">
                          {item.platform.slice(0, 2).toUpperCase()}
                        </span>
                        <div>
                          <div className="font-bold text-white text-xs">{item.accountTitle}</div>
                          <div className="text-[10px] text-slate-400 font-normal">
                            Platform: <strong className="text-slate-300">{item.platform}</strong> • Grade {item.grade}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                          isBought
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : isRented
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {isBought ? 'Eigendom (Gekocht)' : isRented ? 'In Huur (Actief)' : item.status}
                      </span>
                    </td>

                    <td className="font-bold text-white">
                      € {item.currentValue.toLocaleString('nl-NL')},00
                    </td>

                    <td>
                      {isListed ? (
                        <span className="text-emerald-400 font-bold">
                          € {item.dailyRent},00 /dag (+€ {item.totalEarned})
                        </span>
                      ) : isRented ? (
                        <span className="text-cyan-400 font-bold">
                          € {item.dailyRent},00 /dag (Borg: € {item.escrowLocked})
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">
                          Klaar voor verhuur (€ {item.dailyRent}/d)
                        </span>
                      )}
                    </td>

                    <td className="text-slate-400 text-[11px]">
                      {item.contractEnds}
                    </td>

                    <td className="text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Option 1: View credentials for bought or rented assets */}
                        {(isBought || isRented) && (
                          <button
                            onClick={() => {
                              setCredentialsItem(item);
                              setShowPassword(false);
                            }}
                            className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-1.5 rounded-lg transition text-[11px] font-bold flex items-center gap-1 shadow-sm"
                            title="Toon Inloggegevens, Sessie Cookies & 2FA"
                          >
                            <Key className="w-3.5 h-3.5" />
                            <span>Inloggegevens</span>
                          </button>
                        )}

                        {/* Option 2: Bought asset - put up for rent to earn yield */}
                        {isBought && (
                          <button
                            onClick={() => onToggleAccountStatus(item.id)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-2.5 py-1.5 rounded-lg transition text-[11px] flex items-center gap-1 shadow-sm"
                            title="Zet dit account direct te huur op de beurs om passief rendement te verdienen"
                          >
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>Verhuren</span>
                          </button>
                        )}

                        {/* Option 3: Listed asset - pause / resume */}
                        {isListed && (
                          <button
                            onClick={() => onToggleAccountStatus(item.id)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-lg transition text-[11px] border border-slate-700"
                          >
                            {item.status === 'Actief Verhuurd' ? 'Pauzeren' : 'Hervatten'}
                          </button>
                        )}

                        {/* Option 4: Dispute trigger for bought or rented assets */}
                        {(isBought || isRented) && (
                          <button
                            onClick={() => onOpenDisputeModal?.(item.accountId)}
                            className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-1.5 rounded-lg transition text-[11px]"
                            title="Meld probleem of start dispuut"
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credentials Viewer Modal for Handelaar */}
      {credentialsItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-[#0F172A] border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setCredentialsItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">
                  Inloggegevens &amp; 2FA Overdracht
                </h4>
                <p className="text-slate-400 text-[11px]">
                  {credentialsItem.accountTitle} • ID #{credentialsItem.accountId}
                </p>
              </div>
            </div>

            {copyFeedback && (
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{copyFeedback}</span>
              </div>
            )}

            <div className="space-y-3 bg-[#080C14] border border-slate-800 p-4 rounded-xl">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Gebruikersnaam / Login ID</span>
                <div className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-white">
                  <span className="font-bold">{credentialsItem.credentials?.username || `user_${credentialsItem.accountId}`}</span>
                  <button
                    onClick={() => handleCopy(credentialsItem.credentials?.username || `user_${credentialsItem.accountId}`, 'Gebruikersnaam')}
                    className="text-slate-400 hover:text-cyan-400"
                    title="Kopieer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Origineel E-mailadres (OGE)</span>
                <div className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-white">
                  <span className="font-bold">{credentialsItem.credentials?.email || `oge_${credentialsItem.accountId}@verified.com`}</span>
                  <button
                    onClick={() => handleCopy(credentialsItem.credentials?.email || `oge_${credentialsItem.accountId}@verified.com`, 'E-mailadres')}
                    className="text-slate-400 hover:text-cyan-400"
                    title="Kopieer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Account Wachtwoord</span>
                <div className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-white">
                  <span className="font-bold">
                    {showPassword ? 'SuperSecurePass2026!#' : '••••••••••••••••'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-white"
                      title={showPassword ? 'Verberg' : 'Toon'}
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleCopy('SuperSecurePass2026!#', 'Wachtwoord')}
                      className="text-slate-400 hover:text-cyan-400"
                      title="Kopieer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Sessie Cookies Token (Instant Login)</span>
                <div className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-cyan-400">
                  <span className="truncate max-w-[280px]">
                    {credentialsItem.credentials?.sessionCookies || 'lr_session_token_39a9c2...'}
                  </span>
                  <button
                    onClick={() => handleCopy(credentialsItem.credentials?.sessionCookies || 'lr_session_token_39a9c2...', 'Sessie token')}
                    className="text-slate-400 hover:text-cyan-400 shrink-0"
                    title="Kopieer Sessie Token"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase block mb-1">2FA Secret Seed (Google Authenticator)</span>
                <div className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-emerald-400">
                  <span className="font-bold">
                    {credentialsItem.credentials?.twoFactorSecret || 'JBSWY3DPEHPK3PXP'}
                  </span>
                  <button
                    onClick={() => handleCopy(credentialsItem.credentials?.twoFactorSecret || 'JBSWY3DPEHPK3PXP', '2FA Seed')}
                    className="text-slate-400 hover:text-cyan-400"
                    title="Kopieer 2FA Seed"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setCredentialsItem(null);
                  onOpenHandoffModal?.();
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Open Volledige 2FA Handoff Wizard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
