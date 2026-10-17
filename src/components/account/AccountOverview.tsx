import { PortfolioItem, UserProfile, WalletTransaction } from '../../types';
import {
  UserCheck,
  ShieldCheck,
  CreditCard,
  Wallet,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Plus,
  Clock,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Sliders
} from 'lucide-react';

interface AccountOverviewProps {
  userProfile?: UserProfile;
  portfolio: PortfolioItem[];
  userBalance: number;
  unclaimedYield: number;
  onClaimYield: () => void;
  onNavigateSection: (section: 'accounts' | 'finance' | 'profile' | 'security' | 'api' | 'settings') => void;
  onOpenListingModal: () => void;
  onOpenWalletModal: () => void;
  onBatchCheckSessions: () => void;
  isBatchChecking: boolean;
  walletTransactions: WalletTransaction[];
  onOpenConsole: (item: PortfolioItem) => void;
  onOpenQuickCreds: (item: PortfolioItem) => void;
}

export function AccountOverview({
  userProfile,
  portfolio,
  userBalance,
  unclaimedYield,
  onClaimYield,
  onNavigateSection,
  onOpenListingModal,
  onOpenWalletModal,
  onBatchCheckSessions,
  isBatchChecking,
  walletTransactions,
  onOpenConsole,
  onOpenQuickCreds
}: AccountOverviewProps) {
  const boughtItems = portfolio.filter((i) => i.type === 'KOOP' || i.status === 'Eigendom (Gekocht)');
  const rentedItems = portfolio.filter((i) => i.type === 'HUUR' || i.status === 'In Huur (Actief)');
  const listedItems = portfolio.filter((i) => i.type === 'NOTERING' || i.status === 'Actief Verhuurd' || i.status === 'Gepauzeerd');

  const totalPortfolioValue = portfolio.reduce((acc, item) => acc + item.currentValue, 0);
  const totalDailyRent = listedItems
    .filter((i) => i.status === 'Actief Verhuurd')
    .reduce((acc, item) => acc + item.dailyRent, 0);
  const totalEscrowLocked = rentedItems.reduce((acc, item) => acc + item.escrowLocked, 0);
  const activeSessionsCount = portfolio.filter((i) => i.sessionHealth !== 'ingetrokken' && i.sessionHealth !== 'verlopen').length;

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* 1. TRADER PASSPORT & IDENTITY CARD */}
      <div className="bg-gradient-to-r from-[#0F172A] via-slate-900 to-emerald-950/20 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 text-slate-950 font-black text-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
              {userProfile?.fullName ? userProfile.fullName.slice(0, 2).toUpperCase() : 'LR'}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-white font-extrabold text-base sm:text-lg">
                  {userProfile?.fullName || 'Jamal Drenthe'}
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full text-[10px] border border-emerald-500/40 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Level {userProfile?.verificationLevel || 2} Geverifieerd Handelaar</span>
                </span>
                <span className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full text-[10px] border border-cyan-500/30">
                  ID #LR-TRD-4921
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-400 text-[11px]">
                <span className="text-slate-300">{userProfile?.email || 'info@logs.rent'}</span>
                <span>•</span>
                <span className="text-slate-400">{userProfile?.phone || '+31 6 12345678'}</span>
                <span>•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Google OAuth 2FA Actief</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Profile & IBAN Status Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {userProfile?.iban ? (
              <button
                onClick={() => onNavigateSection('finance')}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold hover:bg-cyan-500/20 transition flex items-center gap-2"
                title="Beheer je SEPA IBAN uitbetalingsrekening"
              >
                <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                <span>IBAN: {userProfile.iban.slice(0, 4)} •••• {userProfile.iban.slice(-4)}</span>
                <span className="text-[9px] bg-slate-900 px-1 py-0.5 rounded text-emerald-400 uppercase font-black">
                  SEPA OK
                </span>
              </button>
            ) : (
              <button
                onClick={() => onNavigateSection('finance')}
                className="px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold hover:bg-amber-500/25 transition flex items-center gap-2 animate-pulse"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>IBAN Uitbetalingsrekening Koppelen</span>
              </button>
            )}

            <button
              onClick={() => onNavigateSection('profile')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold transition flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Mijn Gegevens &amp; KYC</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. FINANCIAL BALANCES & YIELD TELEMETRY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Handelskassa Vrij Saldo */}
        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                Vrij Handelskassa Saldo
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              € {userBalance.toLocaleString('nl-NL')},00
            </div>
            <span className="text-[10px] text-emerald-400 mt-1 block">
              Direct beschikbaar voor opname &amp; orders
            </span>
          </div>

          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/80">
            <button
              onClick={() => onNavigateSection('finance')}
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 font-bold text-center transition flex items-center justify-center gap-1"
            >
              <CreditCard className="w-3 h-3 text-emerald-400" />
              <span>SEPA Uitbetaling</span>
            </button>
            <button
              onClick={onOpenWalletModal}
              className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold transition"
            >
              Storten
            </button>
          </div>
        </div>

        {/* Escrow Borgsommen */}
        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                Gereserveerd in Escrow
              </span>
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-400 tracking-tight">
              € {totalEscrowLocked.toLocaleString('nl-NL')},00
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Vastgezet in actieve borgstellingen ({rentedItems.length} huurcontracten)
            </span>
          </div>

          <div className="text-[10px] text-slate-400 mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span>Arbitrage garantie:</span>
            <span className="text-emerald-400 font-bold">100% Gedekt</span>
          </div>
        </div>

        {/* Passief Dagrendement */}
        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                Passief Dagrendement
              </span>
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-300 tracking-tight flex items-baseline gap-1">
              <span>€ {totalDailyRent.toLocaleString('nl-NL')},00</span>
              <span className="text-xs text-slate-400 font-normal">/dag</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Gegenereerd door {listedItems.filter((i) => i.status === 'Actief Verhuurd').length} verhuurde accounts
            </span>
          </div>

          <div className="text-[10px] text-slate-400 mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span>Maandprognose:</span>
            <span className="text-cyan-400 font-bold">€ {(totalDailyRent * 30).toLocaleString('nl-NL')},00</span>
          </div>
        </div>

        {/* Onopgehaald Rendement */}
        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                Onopgehaald Rendement
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              € {unclaimedYield.toLocaleString('nl-NL')},00
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Klaar voor overschrijving naar kassa
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <button
              onClick={onClaimYield}
              disabled={unclaimedYield <= 0}
              className={`w-full py-2 px-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 shadow ${
                unclaimedYield > 0
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Claim Rendement Nu</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. QUICK ACTIONS BAR */}
      <div className="bg-[#0F172A] border border-slate-800 p-4 rounded-2xl shadow-lg flex flex-wrap items-center justify-between gap-3">
        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span>Snelle Account Acties:</span>
        </span>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onNavigateSection('finance')}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold transition flex items-center justify-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
            <span>Direct Uitbetalen naar IBAN</span>
          </button>

          <button
            onClick={onOpenListingModal}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Account Noteren op Beurs</span>
          </button>

          <button
            onClick={onBatchCheckSessions}
            disabled={isBatchChecking}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center gap-1.5"
            title="Scan en test alle actieve cookie tokens in je portfolio"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isBatchChecking ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{isBatchChecking ? 'Sessies Scannen...' : 'Test Alle Sessies'}</span>
          </button>

          <button
            onClick={() => onNavigateSection('accounts')}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Mijn Accounts ({portfolio.length})</span>
          </button>
        </div>
      </div>

      {/* 4. PORTFOLIO BREAKDOWN & RECENT ACTIVITY DUAL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Portfolio Assets Breakdown & Quick Access */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-850">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h4 className="text-white font-bold text-sm">
                  Mijn Accounts &amp; Digitale Logs ({portfolio.length})
                </h4>
              </div>
              <button
                onClick={() => onNavigateSection('accounts')}
                className="text-cyan-400 hover:text-cyan-300 text-xs font-bold flex items-center gap-1 transition"
              >
                <span>Bekijk Alle &rarr;</span>
              </button>
            </div>

            {/* Quick Status Sub-counts */}
            <div className="grid grid-cols-3 gap-3">
              <div
                onClick={() => onNavigateSection('accounts')}
                className="bg-[#080C14] border border-slate-800 p-3 rounded-xl cursor-pointer hover:border-cyan-500/40 transition"
              >
                <span className="text-[10px] text-slate-500 uppercase block mb-0.5">Eigendom (Gekocht)</span>
                <span className="text-xl font-black text-cyan-400">{boughtItems.length}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Volledig overgedragen</span>
              </div>

              <div
                onClick={() => onNavigateSection('accounts')}
                className="bg-[#080C14] border border-slate-800 p-3 rounded-xl cursor-pointer hover:border-indigo-500/40 transition"
              >
                <span className="text-[10px] text-slate-500 uppercase block mb-0.5">In Huur (Actief)</span>
                <span className="text-xl font-black text-indigo-400">{rentedItems.length}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Lopend contract</span>
              </div>

              <div
                onClick={() => onNavigateSection('accounts')}
                className="bg-[#080C14] border border-slate-800 p-3 rounded-xl cursor-pointer hover:border-emerald-500/40 transition"
              >
                <span className="text-[10px] text-slate-500 uppercase block mb-0.5">Te Huur / Notering</span>
                <span className="text-xl font-black text-emerald-400">{listedItems.length}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Rendement genererend</span>
              </div>
            </div>

            {/* Top 3 Active Accounts List */}
            <div className="space-y-2.5 pt-2">
              <span className="text-slate-400 text-[11px] font-bold block">
                Actieve Accounts met Directe Inlog &amp; Sessiebeheer:
              </span>

              {portfolio.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-[#080C14] border border-slate-800/80 hover:border-slate-700 p-3.5 rounded-xl flex items-center justify-between gap-3 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-base shrink-0 font-bold">
                      {item.platform === 'TikTok' ? '🎵' : item.platform === 'Instagram' ? '📸' : item.platform === 'Steam' ? '🎮' : '🔐'}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-bold truncate text-xs">{item.accountTitle}</span>
                        <span className="text-[10px] text-cyan-400 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800">
                          ID #{item.accountId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span>{item.platform}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold">{item.status}</span>
                        <span>•</span>
                        <span>{item.proxy?.country ? `🇳🇱 ${item.proxy.country}` : 'Proxy OK'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onOpenQuickCreds(item)}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold transition flex items-center gap-1"
                      title="Toon realtime 2FA TOTP code en inloggegevens"
                    >
                      <Clock className="w-3 h-3 text-emerald-400" />
                      <span>2FA Inlog</span>
                    </button>

                    <button
                      onClick={() => onOpenConsole(item)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-bold transition flex items-center gap-1"
                      title="Open volledige console voor cookie export, proxy en audit"
                    >
                      <Sliders className="w-3 h-3 text-cyan-400" />
                      <span>Beheer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Security & Audit Telemetry */}
        <div className="space-y-4">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-850">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="text-white font-bold text-sm">
                  Beveiliging &amp; Compliance
                </h4>
              </div>
              <button
                onClick={() => onNavigateSection('security')}
                className="text-cyan-400 hover:text-cyan-300 text-xs font-bold"
              >
                <span>Details &rarr;</span>
              </button>
            </div>

            <div className="space-y-2.5 text-[11px]">
              <div className="p-3 bg-[#080C14] rounded-xl border border-slate-850 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">Sessie Integriteit</span>
                  <span className="text-slate-400 text-[10px]">{activeSessionsCount}/{portfolio.length} cookies online &amp; schoon</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                  100% OK
                </span>
              </div>

              <div className="p-3 bg-[#080C14] rounded-xl border border-slate-850 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">Residentiële Proxy Pairing</span>
                  <span className="text-slate-400 text-[10px]">Amsterdam Ziggo Pool (0% ban risk)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold text-[10px]">
                  GEKOPPELD
                </span>
              </div>

              <div className="p-3 bg-[#080C14] rounded-xl border border-slate-850 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">Smart Escrow Vault</span>
                  <span className="text-slate-400 text-[10px]">Geautomatiseerde borgstelling</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                  ACTIEF
                </span>
              </div>
            </div>

            {/* Recent Transaction Log Widget */}
            <div className="pt-2 border-t border-slate-850">
              <span className="text-slate-400 text-[11px] font-bold block mb-2">
                Recente Handelskassa Mutaties:
              </span>
              <div className="space-y-1.5">
                {walletTransactions.slice(0, 3).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between text-[10px] py-1">
                    <span className="text-slate-300 truncate max-w-[140px]">{tx.method}</span>
                    <span className={`font-bold font-mono ${tx.isCredit ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {tx.isCredit ? '+' : '-'}€ {tx.amount.toLocaleString('nl-NL')},00
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
