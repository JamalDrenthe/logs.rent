import { useState, useMemo } from 'react';
import { AccountListing, AccountCategory, AccountGrade, UserRole } from '../../types';
import { CATEGORY_DEFINITIONS } from '../../data/mockData';
import {
  Search,
  Filter,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  ShoppingBag,
  LayoutGrid,
  List,
  CheckCircle2,
  Lock,
  Building2,
  Sparkles,
  ShieldAlert,
  Share2,
  Megaphone,
  Gamepad2,
  Briefcase,
  Code,
  CreditCard,
  Layers,
  ChevronRight
} from 'lucide-react';

interface CatalogusTabProps {
  accounts: AccountListing[];
  onSelectAccount: (account: AccountListing) => void;
  onOpenTradeModal: (account: AccountListing, mode: 'buy' | 'rent') => void;
  userRole?: UserRole;
  onModerateListing?: (accountId: number, newStatus: 'available' | 'rented' | 'paused' | 'sold') => void;
}

const CATEGORY_ICONS: Record<string, any> = {
  all: Layers,
  social: Share2,
  ads_agency: Megaphone,
  gaming: Gamepad2,
  flex: Briefcase,
  developer: Code,
  fintech: CreditCard
};

export function CatalogusTab({
  accounts,
  onSelectAccount,
  onOpenTradeModal,
  userRole = 'visitor',
  onModerateListing
}: CatalogusTabProps) {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'rented' | 'sold' | 'paused'>('all');
  const [onlyClean, setOnlyClean] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'grouped'>('grid');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rent_desc'>('price_desc');

  // Extract unique companies from listings
  const availableCompanies = useMemo(() => {
    const list = Array.from(new Set(accounts.map((a) => a.company).filter(Boolean)));
    return ['all', ...list];
  }, [accounts]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: accounts.length };
    accounts.forEach((acc) => {
      counts[acc.category] = (counts[acc.category] || 0) + 1;
    });
    return counts;
  }, [accounts]);

  const filteredAccounts = accounts
    .filter((acc) => {
      const matchCat = selectedCategory === 'all' || acc.category === selectedCategory;
      const matchCompany = selectedCompany === 'all' || acc.company === selectedCompany;
      const matchGrade = selectedGrade === 'all' || acc.grade === selectedGrade;
      const matchClean = !onlyClean || acc.banRiskPercent === 0;
      const matchStatus = statusFilter === 'all' || acc.status === statusFilter;
      const matchQuery =
        acc.title.toLowerCase().includes(search.toLowerCase()) ||
        acc.platform.toLowerCase().includes(search.toLowerCase()) ||
        (acc.company && acc.company.toLowerCase().includes(search.toLowerCase())) ||
        (acc.categoryName && acc.categoryName.toLowerCase().includes(search.toLowerCase())) ||
        acc.id.toString().includes(search);
      return matchCat && matchCompany && matchGrade && matchClean && matchStatus && matchQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'price_asc') return a.price - b.price;
      return b.rentPerDay - a.rentPerDay;
    });

  // Grouped by Category for grouped view
  const groupedAccounts = useMemo(() => {
    const map = new Map<string, AccountListing[]>();
    filteredAccounts.forEach((acc) => {
      const catKey = acc.category;
      if (!map.has(catKey)) map.set(catKey, []);
      map.get(catKey)!.push(acc);
    });
    return map;
  }, [filteredAccounts]);

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
            Geverifieerde Profielen &amp; Bedrijfscategorieën
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Inspecteer en filter accounts per sector en moederbedrijf (ByteDance, Meta, Google, Valve, Sony, Uber, Stripe).
            Inclusief Original Email (OGE), residentiële sessies en 100% escrow borgbescherming.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono shrink-0">
          <span className="bg-[#080C14] border border-slate-800 px-3 py-2 rounded-xl text-slate-300">
            <strong className="text-cyan-400">{filteredAccounts.length}</strong> Beschikbare Listings
          </span>
        </div>
      </div>

      {/* Role Context Bar */}
      {userRole === 'admin' && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-emerald-400">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>
              <strong>Admin Toezichtsmodus:</strong> U heeft directe beheerrechten om listings per categorie te pauzeren, heractiveren en risicoprofielen te modereren.
            </span>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/30 font-bold uppercase">
            Platform Moderator
          </span>
        </div>
      )}

      {userRole === 'trader' && (
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-cyan-300">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 shrink-0 text-cyan-400" />
            <span>
              <strong>Handelaarsaccount Actief:</strong> Koop accounts direct in permanent eigendom (incl. inloggegevens in Portfolio) of huur per dag met escrow borg.
            </span>
          </div>
          <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2.5 py-1 rounded-lg border border-cyan-500/30 font-bold uppercase">
            Geverifieerde Handelaar
          </span>
        </div>
      )}

      {/* CATEGORIEËN & BEDRIJVEN SECTOR CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {CATEGORY_DEFINITIONS.filter((c) => c.key !== 'all').map((cat) => {
          const IconComponent = CATEGORY_ICONS[cat.key] || Layers;
          const isSelected = selectedCategory === cat.key;
          const count = categoryCounts[cat.key] || 0;

          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(isSelected ? 'all' : cat.key)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between group cursor-pointer ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                  : 'bg-[#0F172A] border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition ${
                    isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400 group-hover:scale-105'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-[#080C14] text-slate-400 border border-slate-800'
                  }`}
                >
                  {count}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-white leading-tight mb-0.5">{cat.shortName}</h4>
                <p className="text-[10px] text-slate-400 line-clamp-1">{cat.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Header Bar */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full xl:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Zoek op titel, platform, bedrijf..."
              className="w-full bg-[#080C14] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Quick Category Buttons Bar */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono overflow-x-auto pb-1 xl:pb-0">
            {CATEGORY_DEFINITIONS.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.key] || Layers;
              const count = categoryCounts[cat.key] || 0;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    selectedCategory === cat.key
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-[#080C14] text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.shortName}</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary filters row: Bedrijf, Grade, Status, Clean, Sort & View mode */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Bedrijf / Company Filter */}
            <div className="flex items-center gap-1.5 bg-[#080C14] px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">Bedrijf:</span>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer max-w-[150px] truncate"
              >
                <option value="all" className="bg-slate-900">
                  Alle Bedrijven
                </option>
                {availableCompanies
                  .filter((c) => c !== 'all')
                  .map((c) => (
                    <option key={c} value={c} className="bg-slate-900">
                      {c}
                    </option>
                  ))}
              </select>
            </div>

            {/* Clean history filter */}
            <button
              onClick={() => setOnlyClean(!onlyClean)}
              className={`px-2.5 py-1.5 rounded-xl border transition flex items-center gap-1.5 cursor-pointer ${
                onlyClean
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold'
                  : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Clean Historie</span>
            </button>

            {/* Grade filter */}
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

            {/* Status filter */}
            <div className="flex items-center gap-1 bg-[#080C14] px-2.5 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900">Alle Statussen</option>
                <option value="available" className="bg-slate-900">Beschikbaar</option>
                <option value="rented" className="bg-slate-900">In Huur</option>
                <option value="sold" className="bg-slate-900">Verkocht</option>
                <option value="paused" className="bg-slate-900">Gepauzeerd</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Sorting */}
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

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-[#080C14] p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'grid' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid Weergave"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('grouped')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'grouped' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Gegroepeerd per Categorie"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'table' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Tabel Weergave"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
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
                  <th className="p-3.5">Bedrijf / Uitgever</th>
                  <th className="p-3.5">Titel &amp; Categorie</th>
                  <th className="p-3.5">Status</th>
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
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-200 font-bold">
                        <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{acc.company || 'Onafhankelijk'}</span>
                      </div>
                    </td>
                    <td className="p-3.5 max-w-xs">
                      <span className="font-bold text-white block truncate">{acc.title}</span>
                      <span className="text-[10px] text-cyan-400/80 font-mono">
                        {acc.categoryName || acc.category}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border font-mono ${
                          acc.status === 'available'
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : acc.status === 'rented'
                            ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
                            : acc.status === 'sold'
                            ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                            : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {acc.status === 'available'
                          ? '● Beschikbaar'
                          : acc.status === 'rented'
                          ? '⏳ In Huur'
                          : acc.status === 'sold'
                          ? '✕ Verkocht'
                          : '⏸ Offline'}
                      </span>
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
                    <td className="p-3.5 whitespace-nowrap text-slate-300">{acc.followersOrRating}</td>
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
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-[11px] px-2.5 py-1.5 rounded-lg transition cursor-pointer"
                          title="Bekijk op de Beurs"
                        >
                          Beurs
                        </button>
                        <button
                          disabled={acc.status !== 'available'}
                          onClick={() => onOpenTradeModal(acc, 'rent')}
                          className={`font-bold text-[11px] px-2.5 py-1.5 rounded-lg transition ${
                            acc.status === 'available'
                              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                          }`}
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
      ) : viewMode === 'grouped' ? (
        /* Render View: Grouped by Category */
        <div className="space-y-8">
          {Array.from(groupedAccounts.entries()).map(([catKey, catAccounts]) => {
            const catDef = CATEGORY_DEFINITIONS.find((c) => c.key === catKey);
            const IconComponent = CATEGORY_ICONS[catKey] || Layers;

            return (
              <div key={catKey} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 font-mono">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">
                        {catDef?.name || catKey}
                      </h3>
                      <p className="text-[11px] text-slate-400">{catDef?.description}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
                    {catAccounts.length} listings
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {catAccounts.map((acc) => renderAccountCard(acc))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Render View: Grid of Listings */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAccounts.map((acc) => renderAccountCard(acc))}
        </div>
      )}
    </div>
  );

  function renderAccountCard(acc: AccountListing) {
    return (
      <div
        key={acc.id}
        className="bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all duration-200 flex flex-col justify-between group"
      >
        <div>
          {/* Header Badges: ID, Company & Status */}
          <div className="flex items-center justify-between mb-3 font-mono">
            <span className="bg-[#080C14] border border-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <span className="text-cyan-400 font-bold">ID #{acc.id}</span>
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono ${
                  acc.status === 'available'
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    : acc.status === 'rented'
                    ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
                    : acc.status === 'sold'
                    ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                    : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                }`}
              >
                {acc.status === 'available'
                  ? '● Beschikbaar'
                  : acc.status === 'rented'
                  ? '⏳ In Huur'
                  : acc.status === 'sold'
                  ? '✕ Verkocht'
                  : '⏸ Offline'}
              </span>
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

          {/* Company & Sector Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2 font-mono text-[10px]">
            <span className="bg-slate-800/90 text-slate-200 px-2 py-0.5 rounded-md border border-slate-700 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-cyan-400 shrink-0" />
              <strong className="text-white">{acc.company || 'Onafhankelijk'}</strong>
            </span>
            <span className="bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-500/30">
              {acc.categoryName || acc.category}
            </span>
          </div>

          {/* Title & Specs */}
          <h4 className="font-bold text-white text-base mb-1 group-hover:text-cyan-400 transition leading-snug">
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
            {userRole === 'admin' ? (
              <>
                <button
                  onClick={() => onSelectAccount(acc)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs px-2.5 py-2 rounded-xl transition cursor-pointer"
                  title="Bekijk op de Beurs"
                >
                  Beurs
                </button>
                <button
                  onClick={() =>
                    onModerateListing?.(
                      acc.id,
                      acc.status === 'paused' ? 'available' : 'paused'
                    )
                  }
                  className={`font-bold text-xs px-3 py-2 rounded-xl border transition cursor-pointer ${
                    acc.status === 'paused'
                      ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}
                  title="Admin: Wijzig status"
                >
                  {acc.status === 'paused' ? 'Heractiveer' : 'Pauzeer'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onSelectAccount(acc)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs px-2.5 py-2 rounded-xl transition cursor-pointer"
                  title="Bekijk op de Beurs"
                >
                  Beurs
                </button>
                <button
                  disabled={acc.status !== 'available'}
                  onClick={() => onOpenTradeModal(acc, 'buy')}
                  className={`font-bold text-xs px-3 py-2 rounded-xl transition shadow-sm ${
                    acc.status === 'available'
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-60'
                  }`}
                  title={
                    acc.status === 'sold'
                      ? 'Reeds verkocht'
                      : acc.status === 'rented'
                      ? 'In actieve huur'
                      : acc.status === 'paused'
                      ? 'Tijdelijk offline'
                      : 'Direct Kopen & Eigendom Overnemen'
                  }
                >
                  {acc.status === 'sold' ? 'Verkocht' : 'Koop Nu'}
                </button>
                <button
                  disabled={acc.status !== 'available'}
                  onClick={() => onOpenTradeModal(acc, 'rent')}
                  className={`font-bold text-xs px-3 py-2 rounded-xl transition shadow-md shadow-emerald-500/15 ${
                    acc.status === 'available'
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-60'
                  }`}
                  title={
                    acc.status === 'sold'
                      ? 'Reeds verkocht'
                      : acc.status === 'rented'
                      ? 'Reeds verhuurd'
                      : acc.status === 'paused'
                      ? 'Tijdelijk offline'
                      : 'Huren met Dagtarief'
                  }
                >
                  {acc.status === 'rented' ? 'In Huur' : 'Huur'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
