import { useState } from 'react';
import { AccountListing, OrderBookEntry, RecentTrade } from '../../types';
import { TradingChart } from '../TradingChart';
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Bot,
  Layers,
  ArrowUpRight,
  ShoppingBag,
  Key,
  Gavel,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Share2,
  Lock
} from 'lucide-react';

interface BeursTabProps {
  selectedAccount: AccountListing;
  onSelectAccount: (account: AccountListing) => void;
  accounts: AccountListing[];
  orderBookAsks: OrderBookEntry[];
  orderBookBids: OrderBookEntry[];
  recentTrades: RecentTrade[];
  onOpenTradeModal: (mode: 'buy' | 'rent' | 'bid', price?: number) => void;
  onOpenHandoffModal: () => void;
}

export function BeursTab({
  selectedAccount,
  onSelectAccount,
  accounts,
  orderBookAsks,
  orderBookBids,
  recentTrades,
  onOpenTradeModal,
  onOpenHandoffModal
}: BeursTabProps) {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1W');

  return (
    <div className="min-w-0 space-y-6">
      <div className="grid min-w-0 grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left 2 Cols: Main Chart, Account Header, Quick Actions */}
        <div className="min-w-0 lg:col-span-2 bg-[#0F172A] border border-slate-800 rounded-2xl p-3 sm:p-5 flex flex-col justify-between shadow-xl">
          {/* Top header of selected asset */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#080C14] border border-slate-700 flex items-center justify-center text-emerald-400 text-xl font-mono font-bold shadow-inner">
                {selectedAccount.platform.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="max-w-full truncate text-base sm:text-lg font-bold text-white font-mono tracking-tight">
                    {selectedAccount.title}
                  </h2>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                      selectedAccount.grade === 'A'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : selectedAccount.grade === 'B'
                        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    }`}
                  >
                    {selectedAccount.grade} Grade
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mt-1">
                  <span>
                    Platform: <strong className="text-slate-200">{selectedAccount.platform}</strong>
                  </span>
                  <span>
                    Referentie: <strong className="text-cyan-400">ID #{selectedAccount.id}</strong>
                  </span>
                  <span className="hidden sm:inline">
                    Status:{' '}
                    <strong className="text-emerald-400">
                      {selectedAccount.status === 'rented' ? 'Verhuurd (€ 35/dag)' : 'Beschikbaar'}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right font-mono">
              <div className="text-[11px] text-slate-400">Actuele Beurswaarde</div>
              <div className="text-2xl font-black text-emerald-400 tracking-tight">
                € {selectedAccount.price.toLocaleString('nl-NL')},00
              </div>
              <div
                className={`text-xs font-bold flex items-center sm:justify-end gap-1 ${
                  selectedAccount.isPositiveChange ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {selectedAccount.isPositiveChange ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                <span>{selectedAccount.change24h} (24u trend)</span>
              </div>
            </div>
          </div>

          {/* Timeframe selector controls */}
          <div className="flex flex-wrap items-center justify-between my-4 gap-2 text-xs font-mono">
            <div className="flex items-center gap-1 bg-[#080C14] p-1 rounded-xl border border-slate-800">
              {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg transition font-medium ${
                    timeframe === tf
                      ? 'bg-slate-800 text-emerald-400 font-bold border border-slate-700/60 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf === 'ALL' ? 'ALLES' : tf}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={onOpenHandoffModal}
                className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 text-xs font-mono"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Test 2FA Handoff</span>
              </button>
              <div className="hidden sm:flex items-center gap-1.5 bg-[#080C14] px-3 py-1.5 rounded-xl border border-slate-800 text-amber-400 text-xs font-mono">
                <Bot className="w-3.5 h-3.5" />
                <span>Investbotiq Ready</span>
              </div>
            </div>
          </div>

          {/* High Tech Chart Canvas with Dual Layer Price & Volume Histogram */}
          <div className="bg-[#080C14] rounded-xl p-3 border border-slate-800/80 shadow-inner">
            <TradingChart account={selectedAccount} timeframe={timeframe} />
          </div>

          {/* Quick Trade Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-800">
            <button
              onClick={() => onOpenTradeModal('buy', selectedAccount.price)}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/15"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Koop Vraagprijs (€ {selectedAccount.price.toLocaleString('nl-NL')})</span>
            </button>
            <button
              onClick={() => onOpenTradeModal('rent', selectedAccount.rentPerDay)}
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/15"
            >
              <Key className="w-4 h-4" />
              <span>Huren voor € {selectedAccount.rentPerDay}/dag</span>
            </button>
            <button
              onClick={() => onOpenTradeModal('bid', Math.round(selectedAccount.price * 0.95))}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl text-xs border border-slate-700 transition flex items-center justify-center gap-2"
            >
              <Gavel className="w-4 h-4 text-amber-400" />
              <span>Bod Plaatsen in Orderboek</span>
            </button>
          </div>
        </div>

        {/* Right Col: Interactive Order Book & Recent Executed Trades */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm flex items-center gap-2 font-mono">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Live Orderboek</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Klik op rij om direct te bieden
              </span>
            </div>

            {/* Asks (Verkooporders) */}
            <div className="mt-3 space-y-1 font-mono text-xs">
              <div className="text-[10px] text-slate-400 flex justify-between px-2 uppercase mb-1">
                <span>Prijs (€)</span>
                <span>Aantal</span>
                <span>Totaal</span>
              </div>
              {orderBookAsks.map((ask, idx) => (
                <div
                  key={idx}
                  onClick={() => onOpenTradeModal('buy', ask.price)}
                  className="flex justify-between items-center px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 rounded-lg cursor-pointer transition border-l-2 border-rose-500/60 group"
                  title="Klik om direct deze vraagprijs over te nemen"
                >
                  <span className="font-bold group-hover:underline">
                    € {ask.price.toLocaleString('nl-NL')},00
                  </span>
                  <span className="text-slate-400">{ask.amount}</span>
                  <span className="text-slate-300">€ {ask.total.toLocaleString('nl-NL')}</span>
                </div>
              ))}
            </div>

            {/* Mid Market Price Indicator */}
            <div className="my-3 py-2 px-3 bg-[#080C14] border border-slate-800 rounded-xl flex items-center justify-between font-mono">
              <span className="text-xs text-slate-400">Laatste Beurs Transactie:</span>
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                <span>€ {selectedAccount.price.toLocaleString('nl-NL')},00</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Bids (Koopbiedingen) */}
            <div className="space-y-1 font-mono text-xs">
              {orderBookBids.map((bid, idx) => (
                <div
                  key={idx}
                  onClick={() => onOpenTradeModal('bid', bid.price)}
                  className="flex justify-between items-center px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 rounded-lg cursor-pointer transition border-l-2 border-emerald-500/60 group"
                  title="Klik om direct dit bod over te nemen in het biedingsscherm"
                >
                  <span className="font-bold group-hover:underline">
                    € {bid.price.toLocaleString('nl-NL')},00
                  </span>
                  <span className="text-slate-400">{bid.amount}</span>
                  <span className="text-slate-300">€ {bid.total.toLocaleString('nl-NL')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Executed Trades Console */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <div className="flex justify-between items-center mb-2 font-mono">
              <span className="text-xs font-bold text-slate-200">Recente Transacties</span>
              <span className="text-[10px] text-amber-400 flex items-center gap-1">
                <Bot className="w-3 h-3" />
                <span>Bot Trades</span>
              </span>
            </div>
            <div className="space-y-1.5 font-mono text-[11px] max-h-40 overflow-y-auto">
              {recentTrades.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between text-slate-300 p-1.5 rounded-lg bg-[#080C14] border border-slate-850"
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`font-bold ${
                        t.type === 'KOOP'
                          ? 'text-emerald-400'
                          : t.type === 'HUUR'
                          ? 'text-cyan-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {t.type}
                    </span>
                    <span className="text-slate-400">ID #{t.accountId}</span>
                    {t.isBot && <Bot className="w-3 h-3 text-amber-400" />}
                  </span>
                  <span className="text-white font-bold">
                    € {t.price}
                    {t.type === 'HUUR' ? '/dag' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* A / B / C Status Engine & Escrow Rules Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Logs Rent A/B/C Status Gradering & Risico Evaluatie</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Geautomatiseerde verificatiescore voor maximale transparantie, 0% ban risico en
              escrow borgstelling.
            </p>
          </div>
          <span className="bg-[#080C14] border border-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-xl font-mono flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Escrow Borg Protocol Actief</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {/* A-Grade */}
          <div className="bg-[#080C14] border border-emerald-500/30 p-4 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 font-bold text-[10px] px-2.5 py-1 rounded-bl-xl border-b border-l border-emerald-500/30">
              A-GRADE
            </div>
            <h4 className="font-bold text-emerald-400 text-sm mb-1">A-Status (Premium)</h4>
            <p className="text-slate-300 text-[11px] mb-3 font-sans leading-relaxed">
              Volledig geverifieerd, lange account historie, clean reputatie en 0% risicoscore op
              bans.
            </p>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Minimaal 2+ jaar actief</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Origineel E-mail (OGE) overdracht</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hoogste dagelijkse huurwaarde</span>
              </li>
            </ul>
          </div>

          {/* B-Grade */}
          <div className="bg-[#080C14] border border-cyan-500/30 p-4 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-cyan-500/20 text-cyan-400 font-bold text-[10px] px-2.5 py-1 rounded-bl-xl border-b border-l border-cyan-500/30">
              B-GRADE
            </div>
            <h4 className="font-bold text-cyan-400 text-sm mb-1">B-Status (Standaard)</h4>
            <p className="text-slate-300 text-[11px] mb-3 font-sans leading-relaxed">
              Actieve accounts met gemiddelde historie of lichte restricties op bepaalde platform
              features.
            </p>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Leeftijd tussen 6 mnd en 2 jaar</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Basisinformatie geauditeerd</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Standaard escrow borgsom vereist</span>
              </li>
            </ul>
          </div>

          {/* C-Grade */}
          <div className="bg-[#080C14] border border-amber-500/30 p-4 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500/20 text-amber-400 font-bold text-[10px] px-2.5 py-1 rounded-bl-xl border-b border-l border-amber-500/30">
              C-GRADE
            </div>
            <h4 className="font-bold text-amber-400 text-sm mb-1">C-Status (Budget / Risk)</h4>
            <p className="text-slate-300 text-[11px] mb-3 font-sans leading-relaxed">
              Nieuwe accounts, ongevulde profielen of accounts met een verhoogd schorsingsrisico.
            </p>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Recent aangemaakt (&lt; 6 maanden)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Scherpste instapprijs op beurs</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Geschikt voor snelle arbitrage / tests</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
