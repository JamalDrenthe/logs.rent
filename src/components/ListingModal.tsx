import { useState, FormEvent } from 'react';
import { PlusCircle, ShieldCheck, X, CheckCircle2 } from 'lucide-react';
import { AccountListing, AccountCategory, AccountGrade } from '../types';

interface ListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing: (listing: AccountListing) => void;
}

export function ListingModal({ isOpen, onClose, onAddListing }: ListingModalProps) {
  const [category, setCategory] = useState<AccountCategory>('social');
  const [platform, setPlatform] = useState<string>('TikTok');
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(1250);
  const [rent, setRent] = useState<number>(30);
  const [ageMonths, setAgeMonths] = useState<number>(24);
  const [metrics, setMetrics] = useState<string>('45.000 volgers / 4.9 rating');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  // Derive estimated grade
  const estimatedGrade: AccountGrade = ageMonths >= 24 ? 'A' : ageMonths >= 12 ? 'B' : 'C';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newId = Math.floor(1000 + Math.random() * 9000);
    const newAccount: AccountListing = {
      id: newId,
      title: title.trim(),
      category,
      platform,
      grade: estimatedGrade,
      price: Number(price),
      rentPerDay: Number(rent),
      change24h: '+2.5%',
      isPositiveChange: true,
      history: {
        '1D': [price * 0.98, price * 0.99, price],
        '1W': [price * 0.9, price * 0.93, price * 0.96, price],
        '1M': [price * 0.8, price * 0.86, price * 0.92, price],
        '1Y': [price * 0.6, price * 0.75, price * 0.9, price],
        'ALL': [price * 0.5, price * 0.7, price]
      },
      volumeHistory: {
        '1D': [30, 45, 60],
        '1W': [80, 110, 150, 190],
        '1M': [250, 320, 400, 480],
        '1Y': [900, 1200, 1600, 2000],
        'ALL': [1500, 2200, 3000]
      },
      labels: {
        '1D': ['00:00', '12:00', 'Nu'],
        '1W': ['Di', 'Do', 'Za', 'Zo'],
        '1M': ['W1', 'W2', 'W3', 'W4'],
        '1Y': ['Q1', 'Q2', 'Q3', 'Q4'],
        'ALL': ['2024', '2025', '2026']
      },
      followersOrRating: metrics,
      ageYears: `${(ageMonths / 12).toFixed(1)} jaar`,
      verificationLevel: estimatedGrade === 'A' ? 'Geverifieerd OGE' : 'Telefoon Verifieerd',
      banRiskPercent: estimatedGrade === 'A' ? 0 : estimatedGrade === 'B' ? 4 : 15,
      escrowBorg: Math.round(price * 0.18),
      icon: platform.toLowerCase().includes('uber') ? 'uber' : 'globe',
      description: 'Zojuist genoteerd op Logs Rent beurs. Automatische verificatie voltooid.',
      status: 'available'
    };

    onAddListing(newAccount);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-slate-700/80 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Account Noteren op de Beurs
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Geanonimiseerde listing met geautomatiseerde A/B/C audit
            </p>
          </div>
        </div>

        {submitted && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Account goedgekeurd & direct genoteerd in het orderboek!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Sector Categorie</label>
              <select
                value={category}
                onChange={(e) => {
                  const cat = e.target.value as AccountCategory;
                  setCategory(cat);
                  setPlatform(cat === 'social' ? 'TikTok' : cat === 'gaming' ? 'PlayStation' : 'Uber');
                }}
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="social">Social Media</option>
                <option value="gaming">Gaming Platform</option>
                <option value="flex">Flexwerk & Gig</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Specifiek Platform</label>
              <input
                type="text"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="TikTok, Uber, Steam, etc."
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">
              Geanonimiseerde Noteringstitel
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="bijv. TikTok Monetized 80K NL Creator Aged"
              className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Vraagprijs Koop (€)</label>
              <input
                type="number"
                min="10"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Huurprijs per Dag (€)</label>
              <input
                type="number"
                min="1"
                value={rent}
                onChange={(e) => setRent(Number(e.target.value))}
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Accountleeftijd</label>
              <select
                value={ageMonths}
                onChange={(e) => setAgeMonths(Number(e.target.value))}
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value={6}>6 Maanden (C-Grade)</option>
                <option value={18}>1.5 Jaar (B-Grade)</option>
                <option value={36}>3 Jaar (A-Grade)</option>
                <option value={60}>5+ Jaar Aged (A-Grade)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Bereik of Beoordeling</label>
              <input
                type="text"
                value={metrics}
                onChange={(e) => setMetrics(e.target.value)}
                placeholder="bijv. 4.97 Rating of 60k volgers"
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Grade Estimator preview */}
          <div className="p-3 bg-[#080C14] border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-slate-400">Automatische Status Classificatie:</span>
            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
              {estimatedGrade} Grade (0% Ban Risk)
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Notering Direct Live Plaatsen</span>
          </button>
        </form>
      </div>
    </div>
  );
}
