import { useState } from 'react';
import { PortfolioItem } from '../../types';
import {
  Layers,
  ShoppingBag,
  Clock,
  TrendingUp,
  Search,
  X,
  LayoutDashboard,
  Key,
  Sliders,
  Globe,
  ShieldAlert,
  Pause,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface AccountPortfolioProps {
  portfolio: PortfolioItem[];
  onOpenConsole: (item: PortfolioItem) => void;
  onOpenQuickCreds: (item: PortfolioItem) => void;
  onToggleStatus: (id: string) => void;
  onOpenDispute?: (accountId: number) => void;
  onOpenListingModal: () => void;
}

export function AccountPortfolio({
  portfolio,
  onOpenConsole,
  onOpenQuickCreds,
  onToggleStatus,
  onOpenDispute,
  onOpenListingModal
}: AccountPortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'bought' | 'rented' | 'listed'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const boughtItems = portfolio.filter((i) => i.type === 'KOOP' || i.status === 'Eigendom (Gekocht)');
  const rentedItems = portfolio.filter((i) => i.type === 'HUUR' || i.status === 'In Huur (Actief)');
  const listedItems = portfolio.filter((i) => i.type === 'NOTERING' || i.status === 'Actief Verhuurd' || i.status === 'Gepauzeerd');

  const filteredItems = portfolio.filter((item) => {
    if (activeFilter === 'bought' && item.type !== 'KOOP' && item.status !== 'Eigendom (Gekocht)') return false;
    if (activeFilter === 'rented' && item.type !== 'HUUR' && item.status !== 'In Huur (Actief)') return false;
    if (activeFilter === 'listed' && item.type !== 'NOTERING' && item.status !== 'Actief Verhuurd' && item.status !== 'Gepauzeerd') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.accountTitle.toLowerCase().includes(q);
      const matchPlatform = item.platform.toLowerCase().includes(q);
      const matchId = item.accountId.toString().includes(q);
      const matchUser = item.credentials?.username?.toLowerCase().includes(q) || false;
      return matchTitle || matchPlatform || matchId || matchUser;
    }
    return true;
  });

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-[#0F172A] border border-slate-800 p-4 rounded-2xl shadow-xl">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 border ${
              activeFilter === 'all'
                ? 'bg-slate-800 text-white font-bold border-slate-600 shadow-sm'
                : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Alle Accounts ({portfolio.length})</span>
          </button>

          <button
            onClick={() => setActiveFilter('bought')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 border ${
              activeFilter === 'bought'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border-cyan-500/40 shadow-sm'
                : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Eigendom / Gekocht ({boughtItems.length})</span>
          </button>

          <button
            onClick={() => setActiveFilter('rented')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 border ${
              activeFilter === 'rented'
                ? 'bg-indigo-500/20 text-indigo-300 font-bold border-indigo-500/40 shadow-sm'
                : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>In Huur ({rentedItems.length})</span>
          </button>

          <button
            onClick={() => setActiveFilter('listed')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 border ${
              activeFilter === 'listed'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border-emerald-500/40 shadow-sm'
                : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Te Huur Aangeboden ({listedItems.length})</span>
          </button>
        </div>

        {/* Search Bar & View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Zoek account, platform of ID..."
              className="w-full bg-[#080C14] border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="inline-flex rounded-xl bg-[#080C14] border border-slate-800 p-0.5 shrink-0">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 ${
                viewMode === 'cards'
                  ? 'bg-slate-800 text-white font-bold border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Kaartweergave"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kaarten</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 ${
                viewMode === 'table'
                  ? 'bg-slate-800 text-white font-bold border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tabelweergave"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tabel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-white font-bold text-base">Geen accounts gevonden</h4>
          <p className="text-slate-400 text-xs max-w-md mx-auto">
            Er zijn geen accounts die voldoen aan je huidige zoekopdracht of filter. Noteer een nieuw account of verken de beurs.
          </p>
          <button
            onClick={onOpenListingModal}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition inline-flex items-center gap-1.5"
          >
            <span>Noteer Nieuw Account</span>
          </button>
        </div>
      )}

      {/* CARDS VIEW */}
      {viewMode === 'cards' && filteredItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isBought = item.type === 'KOOP' || item.status === 'Eigendom (Gekocht)';
            const isRented = item.type === 'HUUR' || item.status === 'In Huur (Actief)';
            const isListed = item.type === 'NOTERING' || item.status === 'Actief Verhuurd' || item.status === 'Gepauzeerd';

            return (
              <div
                key={item.id}
                className="bg-[#0F172A] border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-xl transition flex flex-col justify-between space-y-4 group relative overflow-hidden"
              >
                <div>
                  {/* Card Header with Badges */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-extrabold text-white text-sm truncate max-w-[170px]">
                        {item.accountTitle}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-cyan-400 text-[10px] font-bold border border-slate-800">
                        ID #{item.accountId}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        Grade {item.grade}
                      </span>
                    </div>
                  </div>

                  {/* Type & Status Tag */}
                  <div className="flex items-center justify-between mt-3 text-[11px]">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                        isBought
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          : isRented
                          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {isBought ? 'Eigendom (Gekocht)' : isRented ? 'In Huur (Lopend)' : 'Te Huur Aangeboden'}
                    </span>

                    <span className="text-slate-400">
                      Platform: <strong className="text-white">{item.platform}</strong>
                    </span>
                  </div>

                  {/* Financial & Yield Block */}
                  <div className="grid grid-cols-2 gap-2.5 mt-3.5 p-3 rounded-xl bg-[#080C14] border border-slate-850">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block mb-0.5">
                        {isBought ? 'Aankoopwaarde' : isRented ? 'Daghuur' : 'Huurprijs'}
                      </span>
                      <span className="text-sm font-black text-white">
                        {isBought
                          ? `€ ${item.currentValue.toLocaleString('nl-NL')},00`
                          : `€ ${item.dailyRent},00/dag`}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block mb-0.5">
                        {isRented ? 'Borgsom' : isListed ? 'Gegenereerd' : 'Status'}
                      </span>
                      <span className="text-sm font-black text-emerald-400">
                        {isRented
                          ? `€ ${item.escrowLocked || 0},00`
                          : isListed
                          ? `+€ ${item.totalEarned || 0},00`
                          : '100% Eigendom'}
                      </span>
                    </div>
                  </div>

                  {/* Telemetry info */}
                  <div className="mt-3 space-y-1 text-[10px] text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>Sessie Status:</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{item.sessionHealth === 'ingetrokken' ? 'Ingetrokken' : 'Actief (0 bans)'}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Toegewezen Proxy:</span>
                      <span className="text-slate-300 font-bold">🇳🇱 {item.proxy?.country || 'Nederland'} ({item.proxy?.protocol || 'SOCKS5'})</span>
                    </div>
                    {isRented && (
                      <div className="flex items-center justify-between">
                        <span>Contract verloopt:</span>
                        <span className="text-amber-400 font-bold">{item.contractEnds}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenQuickCreds(item)}
                    className="flex-1 py-2 px-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 font-bold text-center transition flex items-center justify-center gap-1.5"
                    title="Snelle 2FA TOTP code en inloggegevens"
                  >
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>2FA Inlog</span>
                  </button>

                  <button
                    onClick={() => onOpenConsole(item)}
                    className="flex-1 py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-center transition flex items-center justify-center gap-1.5"
                    title="Open sessietools voor cookies, proxy en noodcentrum"
                  >
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Console</span>
                  </button>

                  {isListed && (
                    <button
                      onClick={() => onToggleStatus(item.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                      title={item.status === 'Actief Verhuurd' ? 'Pauzeer Verhuur' : 'Hervat Verhuur'}
                    >
                      {item.status === 'Actief Verhuurd' ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && filteredItems.length > 0 && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl shadow-xl overflow-hidden font-mono text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 text-[10px] bg-[#080C14]">
                  <th className="py-3 px-4">ACCOUNT &amp; ID</th>
                  <th className="py-3 px-3">PLATFORM</th>
                  <th className="py-3 px-3">TYPE</th>
                  <th className="py-3 px-3">STATUS</th>
                  <th className="py-3 px-3">DAGHUUR / WAARDE</th>
                  <th className="py-3 px-3">SESSIE</th>
                  <th className="py-3 px-3">PROXY</th>
                  <th className="py-3 px-4 text-right">ACTIES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-850/50 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-xs">{item.accountTitle}</div>
                      <div className="text-[10px] text-cyan-400">ID #{item.accountId} • Grade {item.grade}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-bold">{item.platform}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-emerald-400 font-bold text-[11px]">{item.status}</span>
                    </td>
                    <td className="py-3 px-3 font-bold text-white">
                      {item.type === 'KOOP' ? `€ ${item.currentValue},00` : `€ ${item.dailyRent},00/dag`}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Online</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[10px] text-slate-300">
                      🇳🇱 {item.proxy?.country || 'NL'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => onOpenQuickCreds(item)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold"
                        >
                          2FA
                        </button>
                        <button
                          onClick={() => onOpenConsole(item)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-bold"
                        >
                          Console
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
