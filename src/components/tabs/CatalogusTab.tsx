import { useState } from 'react';
import { AccountListing, AccountCategory, AccountGrade } from '../../types';
import { Search, Filter, ShieldCheck, ArrowRight, TrendingUp, TrendingDown, ShoppingBag, LayoutGrid, List, CheckCircle2, Lock, Eye } from 'lucide-react';

interface CatalogusTabProps {
  accounts: AccountListing[];
  onSelectAccount: (account: AccountListing) => void;
  onOpenTradeModal: (account: AccountListing, mode: 'buy' | 'rent') => void;
}

export function CatalogusTab({ accounts, onSelectAccount, onOpenTradeModal }: CatalogusTabProps) {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [onlyClean, setOnlyClean] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rent_desc'>('price_desc');

  const filteredAccounts = accounts
    .filter((acc) => {
      const matchCat = selectedCategory === 'all' || acc.category === selectedCategory;
      const matchGrade = selectedGrade === 'all' || acc.grade === selectedGrade;
      const matchClean = !onlyClean || acc.banRiskPercent === 0;
      const matchQuery =
        acc.title.toLowerCase().includes(search.toLowerCase()) ||
        acc.platform.toLowerCase().includes(search.toLowerCase()) ||
        acc.id.toString().includes(search);
      return matchCat && matchGrade && matchClean && matchQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'price_asc') return a.price - b.price;
      return b.rentPerDay - a.rentPerDay;
    });

  return (
    <div className="space-y-6 font-sans">
      {/* Logs Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0F172A] to-cyan-950/30 border border-cyan-500/20 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
              LOGS &amp; ACCOUNTS MARKTPLAATS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
            Geverifieerde Profielen &amp; Sessie-Logs
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Inspecteer en koop geverifieerde accounts met Original Email (OGE), schone sessie-cookies,
            100% escrow borgbescherming en directe 2FA overdracht.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono shrink-0">
          <span className="bg-[#080C14] border border-slate-800 px-3 py-2 rounded-xl text-slate-300">
            <strong className="text-cyan-400">{filteredAccounts.length}</strong> Beschikbare Listings
          </span>
        </div>
      </div>

      {/* Search & Filter Header Bar */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full xl:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Zoek op ID, platform..."
            className="w-full bg-[#080C14] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          {[
            { key: 'all', label: 'Alle Sectoren' },
            { key: 'social', label: 'Social Media' },
            { key: 'gaming', label: 'Gaming' },
            { key: 'flex', label: 'Flex & Gig Work' }
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl transition ${
                selectedCategory === cat.key
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-[#080C14] text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grade, Ban Risk, Sort & View Mode */}
        <div className="flex flex-wrap items-center gap-2 justify-end text-xs font-mono">
          <button
            onClick={() => setOnlyClean(!onlyClean)}
            className={`px-2.5 py-1.5 rounded-xl border transition flex items-center gap-1.5 ${
              onlyClean
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold'
                : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>0% Ban Risk</span>
          </button>

          <div className="flex items-center gap-1 bg-[#080C14] px-2.5 py-1.5 rounded-xl border border-slate-800">
            <span className="text-slate-400">Grade:</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">Alle (A/B/C)</option>
              <option value="A" className="bg-slate-900">A-Grade (Premium)</option>
              <option value="B" className="bg-slate-900">B-Grade (Standaard)</option>
              <option value="C" className="bg-slate-900">C-Grade (Budget)</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-[#080C14] px-2.5 py-1.5 rounded-xl border border-slate-800">
            <span className="text-slate-400">Sorteer:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="price_desc" className="bg-slate-900">Prijs: Hoog - Laag</option>
              <option value="price_asc" className="bg-slate-900">Prijs: Laag - Hoog</option>
              <option value="rent_desc" className="bg-slate-900">Huurprijs / dag</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-[#080C14] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid Weergave"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'table' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Tabel Weergave"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Render View: Table View */}
      {viewMode === 'table' ? (
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl font-mono text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-[#080C14] text-[10px] text-slate-400 uppercase">
                  <th className="p-3.5">ID &amp; Platform</th>
                  <th className="p-3.5">Titel / Beschrijving</th>
                  <th className="p-3.5">Grade</th>
                  <th className="p-3.5">Volgers / Rating</th>
                  <th className="p-3.5">Ban Risico</th>
                  <th className="p-3.5">Koop Prijs</th>
                  <th className="p-3.5">Daghuur</th>
                  <th className="p-3.5 text-right">Acties</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredAccounts.map((acc) => (
                  <tr key={acc.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-bold text-cyan-400">ID #{acc.id}</span>
                      <span className="block text-[10px] text-slate-400">{acc.platform}</span>
                    </td>
                    <td className="p-3.5 max-w-xs">
                      <span className="font-bold text-white block truncate">{acc.title}</span>
                      <span className="text-[10px] text-slate-400 line-clamp-1 font-sans">{acc.description}</span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          acc.grade === 'A'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : acc.grade === 'B'
                            ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                            : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {acc.grade} Grade
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap text-slate-300">
                      {acc.followersOrRating}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="text-emerald-400 font-bold">{acc.banRiskPercent}% Clean</span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap font-bold text-white">
                      € {acc.price.toLocaleString('nl-NL')}
                    </td>
                    <td className="p-3.5 whitespace-nowrap font-bold text-cyan-400">
                      € {acc.rentPerDay}/dag
                    </td>
                    <td className="p-3.5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectAccount(acc)}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-[11px] px-2.5 py-1.5 rounded-lg transition"
                          title="Bekijk op de Beurs"
                        >
                          Beurs
                        </button>
                        <button
                          onClick={() => onOpenTradeModal(acc, 'buy')}
                          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] px-2.5 py-1.5 rounded-lg transition"
                        >
                          Koop
                        </button>
                        <button
                          onClick={() => onOpenTradeModal(acc, 'rent')}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] px-2.5 py-1.5 rounded-lg transition"
                        >
                          Huur
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Render View: Grid of Listings */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAccounts.map((acc) => (
            <div
              key={acc.id}
              className="bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header Badges */}
                <div className="flex items-center justify-between mb-3 font-mono">
                  <span className="bg-[#080C14] border border-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                    <span className="text-cyan-400 font-bold">ID #{acc.id}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded border ${
                        acc.grade === 'A'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : acc.grade === 'B'
                          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {acc.grade} Grade
                    </span>
                  </div>
                </div>

                {/* Title & Specs */}
                <h4 className="font-bold text-white text-base mb-1 group-hover:text-cyan-400 transition">
                  {acc.title}
                </h4>
                <p className="text-xs text-slate-400 font-mono mb-3">
                  Platform: <strong className="text-slate-200">{acc.platform}</strong> • {acc.followersOrRating}
                </p>

                <div className="p-2.5 rounded-xl bg-[#080C14] border border-slate-800 space-y-1 text-xs font-mono mb-4 text-slate-300">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Leeftijd:</span>
                    <span>{acc.ageYears}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Ban Risico Score:</span>
                    <span className="text-emerald-400 font-bold">{acc.banRiskPercent}% (Veilig)</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Escrow Borg:</span>
                    <span>€ {acc.escrowBorg},00</span>
                  </div>
                </div>

                {/* Verification badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4 text-[10px] font-mono text-slate-400">
                  <span className="inline-flex items-center gap-1 bg-[#080C14] px-2 py-0.5 rounded border border-slate-800 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>OGE E-mail</span>
                  </span>
                  <span className="inline-flex items-center gap-1 bg-[#080C14] px-2 py-0.5 rounded border border-slate-800 text-cyan-400">
                    <Lock className="w-3 h-3" />
                    <span>Escrow Borg</span>
                  </span>
                </div>
              </div>

              {/* Price & Trade actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">Vraagprijs / Daghuur</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-white">
                      € {acc.price.toLocaleString('nl-NL')}
                    </span>
                    <span className="text-xs text-cyan-400 font-bold">
                      (€ {acc.rentPerDay}/dag)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectAccount(acc)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs px-2.5 py-2 rounded-xl transition"
                    title="Bekijk op de Beurs"
                  >
                    Beurs
                  </button>
                  <button
                    onClick={() => onOpenTradeModal(acc, 'buy')}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-2.5 py-2 rounded-xl transition"
                  >
                    Koop
                  </button>
                  <button
                    onClick={() => onOpenTradeModal(acc, 'rent')}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-2.5 py-2 rounded-xl transition shadow-md shadow-emerald-500/15"
                  >
                    Huur
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
