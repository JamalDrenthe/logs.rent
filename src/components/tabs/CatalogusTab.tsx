import { useState } from 'react';
import { AccountListing, AccountCategory, AccountGrade } from '../../types';
import { Search, Filter, ShieldCheck, ArrowRight, TrendingUp, TrendingDown, ShoppingBag } from 'lucide-react';

interface CatalogusTabProps {
  accounts: AccountListing[];
  onSelectAccount: (account: AccountListing) => void;
  onOpenTradeModal: (account: AccountListing, mode: 'buy' | 'rent') => void;
}

export function CatalogusTab({ accounts, onSelectAccount, onOpenTradeModal }: CatalogusTabProps) {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rent_desc'>('price_desc');

  const filteredAccounts = accounts
    .filter((acc) => {
      const matchCat = selectedCategory === 'all' || acc.category === selectedCategory;
      const matchGrade = selectedGrade === 'all' || acc.grade === selectedGrade;
      const matchQuery =
        acc.title.toLowerCase().includes(search.toLowerCase()) ||
        acc.platform.toLowerCase().includes(search.toLowerCase()) ||
        acc.id.toString().includes(search);
      return matchCat && matchGrade && matchQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'price_asc') return a.price - b.price;
      return b.rentPerDay - a.rentPerDay;
    });

  return (
    <div className="space-y-6 font-sans">
      {/* Search & Filter Header Bar */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Zoek op ID, platform of trefwoord..."
            className="w-full bg-[#080C14] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto text-xs font-mono">
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
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-[#080C14] text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grade & Sort Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end text-xs font-mono">
          <div className="flex items-center gap-1 bg-[#080C14] px-2.5 py-1 rounded-xl border border-slate-800">
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

          <div className="flex items-center gap-1 bg-[#080C14] px-2.5 py-1 rounded-xl border border-slate-800">
            <span className="text-slate-400">Sorteer:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="price_desc" className="bg-slate-900">Prijs: Hoog naar Laag</option>
              <option value="price_asc" className="bg-slate-900">Prijs: Laag naar Hoog</option>
              <option value="rent_desc" className="bg-slate-900">Huurprijs / dag</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Anonymized Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAccounts.map((acc) => (
          <div
            key={acc.id}
            className="bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-3 font-mono">
                <span className="bg-[#080C14] border border-slate-850 text-slate-300 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <span className="text-cyan-400 font-bold">ID #{acc.id}</span>
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

              {/* Title & Specs */}
              <h4 className="font-bold text-white text-base mb-1 group-hover:text-emerald-400 transition">
                {acc.title}
              </h4>
              <p className="text-xs text-slate-400 font-mono mb-3">
                Platform: <strong className="text-slate-200">{acc.platform}</strong> • {acc.followersOrRating}
              </p>

              <div className="p-2.5 rounded-xl bg-[#080C14] border border-slate-850 space-y-1 text-xs font-mono mb-4 text-slate-300">
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

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectAccount(acc)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs px-3 py-2 rounded-xl transition"
                >
                  Beurs Grafiek
                </button>
                <button
                  onClick={() => onOpenTradeModal(acc, 'rent')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-3 py-2 rounded-xl transition shadow-md shadow-emerald-500/15"
                >
                  Huren
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
