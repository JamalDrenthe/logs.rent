import { useState, ChangeEvent, FormEvent } from 'react';
import { UserProfile, WalletTransaction } from '../../types';
import {
  CreditCard,
  Building,
  CheckCircle2,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
  Download,
  Filter,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';

interface AccountFinanceProps {
  userBalance: number;
  onUpdateBalance: (newBalance: number, tx: WalletTransaction) => void;
  userProfile?: UserProfile;
  onUpdateUserProfile?: (profile: UserProfile) => void;
  transactions: WalletTransaction[];
  onOpenWalletModal: () => void;
}

// Format IBAN with spaces every 4 characters
function formatIban(value: string): string {
  const clean = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return clean.match(/.{1,4}/g)?.join(' ') || clean;
}

// Validate IBAN basic structure
function validateIban(iban: string): { valid: boolean; error?: string } {
  const clean = iban.replace(/\s+/g, '').toUpperCase();
  if (!clean) return { valid: false, error: 'IBAN bankrekeningnummer is verplicht.' };
  if (clean.length < 15 || clean.length > 34) {
    return { valid: false, error: 'IBAN moet tussen 15 en 34 tekens bevatten (bijv. NL91 ABNA 0417 8923 11).' };
  }
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(clean)) {
    return { valid: false, error: 'Ongeldig IBAN formaat (moet beginnen met landcode zoals NL of BE).' };
  }
  return { valid: true };
}

export function AccountFinance({
  userBalance,
  onUpdateBalance,
  userProfile,
  onUpdateUserProfile,
  transactions,
  onOpenWalletModal
}: AccountFinanceProps) {
  // IBAN form state
  const [ibanInput, setIbanInput] = useState<string>(userProfile?.iban || 'NL91 ABNA 0417 8923 11');
  const [holderInput, setHolderInput] = useState<string>(userProfile?.accountHolder || userProfile?.fullName || 'J.S. Drenthe');
  const [bankInput, setBankInput] = useState<string>(userProfile?.bankName || 'ABN AMRO Bank N.V.');
  const [bicInput, setBicInput] = useState<string>(userProfile?.bic || 'ABNANL2A');
  const [ibanSuccess, setIbanSuccess] = useState<string | null>(null);
  const [ibanError, setIbanError] = useState<string | null>(null);

  // Sweep state
  const [autoSweep, setAutoSweep] = useState<boolean>(userProfile?.autoSweepEnabled ?? true);
  const [sweepThreshold, setSweepThreshold] = useState<number>(userProfile?.autoSweepThreshold ?? 500);

  // Instant Payout Wizard state
  const [payoutAmount, setPayoutAmount] = useState<number>(500);
  const [isProcessingPayout, setIsProcessingPayout] = useState<boolean>(false);
  const [payoutSuccess, setPayoutSuccess] = useState<string | null>(null);
  const [payoutError, setPayoutError] = useState<string | null>(null);

  // Transaction filter
  const [txFilter, setTxFilter] = useState<'all' | 'deposit' | 'withdraw' | 'yield' | 'escrow'>('all');

  const handleIbanChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatIban(e.target.value);
    setIbanInput(formatted);

    const clean = formatted.replace(/\s+/g, '');
    if (clean.length >= 8) {
      const code = clean.slice(4, 8);
      if (code === 'ABNA') {
        setBankInput('ABN AMRO Bank N.V.');
        setBicInput('ABNANL2A');
      } else if (code === 'INGB') {
        setBankInput('ING Bank N.V.');
        setBicInput('INGBNL2A');
      } else if (code === 'RABO') {
        setBankInput('Rabobank Nederland');
        setBicInput('RABONL2U');
      } else if (code === 'ASNB') {
        setBankInput('ASN Bank');
        setBicInput('ASNBNL21');
      } else if (code === 'SNSB') {
        setBankInput('SNS Bank');
        setBicInput('SNSBNL2A');
      } else if (code === 'KNAB') {
        setBankInput('Knab Bank');
        setBicInput('KNABNL2H');
      } else if (code === 'BUNQ') {
        setBankInput('Bunq B.V.');
        setBicInput('BUNQNL2A');
      }
    }
  };

  const handleSaveIban = (e: FormEvent) => {
    e.preventDefault();
    setIbanError(null);
    setIbanSuccess(null);

    const check = validateIban(ibanInput);
    if (!check.valid) {
      setIbanError(check.error || 'Voer een geldig IBAN bankrekeningnummer in.');
      return;
    }
    if (!holderInput.trim()) {
      setIbanError('Tenaamstelling van de rekening is verplicht.');
      return;
    }

    if (userProfile && onUpdateUserProfile) {
      const updated: UserProfile = {
        ...userProfile,
        iban: ibanInput,
        accountHolder: holderInput,
        bankName: bankInput,
        bic: bicInput,
        autoSweepEnabled: autoSweep,
        autoSweepThreshold: sweepThreshold,
        isVerified: true,
        lastUpdated: 'Zojuist'
      };
      onUpdateUserProfile(updated);
      setIbanSuccess('SEPA IBAN uitbetalingsrekening succesvol gevalideerd en opgeslagen!');
      setTimeout(() => setIbanSuccess(null), 3000);
    }
  };

  const handleExecutePayout = () => {
    setPayoutError(null);
    setPayoutSuccess(null);

    if (payoutAmount <= 0) {
      setPayoutError('Voer een geldig uitbetalingsbedrag in.');
      return;
    }
    if (payoutAmount > userBalance) {
      setPayoutError(`Onvoldoende vrij saldo. U kunt maximaal € ${userBalance.toLocaleString('nl-NL')},00 opnemen.`);
      return;
    }
    const check = validateIban(ibanInput);
    if (!check.valid) {
      setPayoutError('Geen geldige SEPA IBAN gekoppeld. Vul eerst uw bankrekening in.');
      return;
    }

    setIsProcessingPayout(true);
    setTimeout(() => {
      setIsProcessingPayout(false);
      const newBalance = userBalance - payoutAmount;
      const tx: WalletTransaction = {
        id: `WTX-${Date.now().toString().slice(-4)}`,
        type: 'Opname',
        amount: payoutAmount,
        method: `SEPA Instant (${ibanInput.slice(0, 4)}••••${ibanInput.slice(-4)})`,
        date: 'Zojuist',
        status: 'Voltooid',
        isCredit: false
      };
      onUpdateBalance(newBalance, tx);
      setPayoutSuccess(`€ ${payoutAmount.toLocaleString('nl-NL')},00 succesvol overgeboekt naar ${ibanInput} t.n.v. ${holderInput}!`);
      setTimeout(() => setPayoutSuccess(null), 4000);
    }, 700);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (txFilter === 'deposit') return tx.type === 'Storting';
    if (txFilter === 'withdraw') return tx.type === 'Opname';
    if (txFilter === 'yield') return tx.type === 'Huur Inkomsten';
    if (txFilter === 'escrow') return tx.type === 'Borg Escrow';
    return true;
  });

  const handleDownloadCsv = () => {
    const headers = 'ID,Type,Bedrag,Methode,Datum,Status\n';
    const rows = transactions
      .map((t) => `${t.id},${t.type},${t.amount},"${t.method}",${t.date},${t.status}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `logs_rent_afschrift_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* 1. TOP BALANCES OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
              Beschikbaar Saldo (Handelskassa)
            </span>
            <div className="text-3xl font-black text-white">
              € {userBalance.toLocaleString('nl-NL')},00
            </div>
            <span className="text-[10px] text-emerald-400 mt-1 block">
              Direct uitbetaalbaar via SEPA Instant
            </span>
          </div>

          <button
            onClick={onOpenWalletModal}
            className="mt-4 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition flex items-center justify-center gap-1.5"
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Saldo Storten / Opladen</span>
          </button>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
              Gekoppelde Uitbetalingsrekening
            </span>
            <div className="text-xl font-black text-cyan-400 truncate">
              {ibanInput ? ibanInput : 'Nog niet gekoppeld'}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {bankInput || 'Nederlandse Bank'} • t.n.v. {holderInput}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px] text-emerald-400 pt-2 border-t border-slate-800/80">
            <span className="flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>SEPA Instant Pay Gevalideerd</span>
            </span>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
              Automatische Uitbetaling (Sweep)
            </span>
            <div className="text-xl font-black text-white flex items-center gap-2">
              <span className={autoSweep ? 'text-emerald-400' : 'text-slate-500'}>
                {autoSweep ? `Actief (> € ${sweepThreshold})` : 'Uitgeschakeld'}
              </span>
              <span className={`w-2.5 h-2.5 rounded-full ${autoSweep ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Wekelijkse automatische storting naar IBAN
            </span>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
            Drempel: overschot boven € {sweepThreshold} wordt automatisch overgemaakt.
          </div>
        </div>
      </div>

      {/* 2. DUAL INTERACTIVE PANELS: SEPA IBAN BEHEER & DIRECTE UITBETALING WIZARD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PANEL A: SEPA BANKREKENING BEHEER */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-cyan-400" />
              <h4 className="text-white font-bold text-sm">
                SEPA Bankrekening &amp; IBAN Gegevens
              </h4>
            </div>
            <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-bold">
              Uitbetalingsprofiel
            </span>
          </div>

          {ibanSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{ibanSuccess}</span>
            </div>
          )}

          {ibanError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{ibanError}</span>
            </div>
          )}

          <form onSubmit={handleSaveIban} className="space-y-3.5">
            <div>
              <label className="block text-[11px] text-slate-300 font-bold mb-1">
                IBAN Bankrekeningnummer *
              </label>
              <input
                type="text"
                value={ibanInput}
                onChange={handleIbanChange}
                placeholder="NL91 ABNA 0417 8923 11"
                maxLength={34}
                className="w-full bg-[#080C14] border border-cyan-500/40 rounded-xl px-3.5 py-2.5 text-sm text-cyan-300 font-mono font-black uppercase tracking-widest focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Nederlands of Europees IBAN (automatisch gespatieerd)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Tenaamstelling Rekening *
                </label>
                <input
                  type="text"
                  value={holderInput}
                  onChange={(e) => setHolderInput(e.target.value)}
                  placeholder="bijv. J.S. Drenthe"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Bankinstelling
                </label>
                <input
                  type="text"
                  value={bankInput}
                  onChange={(e) => setBankInput(e.target.value)}
                  placeholder="ABN AMRO Bank N.V."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] text-slate-400 mb-1">
                  BIC / SWIFT Code
                </label>
                <input
                  type="text"
                  value={bicInput}
                  onChange={(e) => setBicInput(e.target.value)}
                  placeholder="ABNANL2A"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white uppercase focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Sweep Settings */}
            <div className="p-3 bg-[#080C14] border border-slate-800 rounded-xl space-y-2 mt-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-bold text-xs block">Automatische Uitbetaling (Sweep)</span>
                  <span className="text-[10px] text-slate-400">
                    Maak saldo automatisch over naar IBAN wanneer het boven de drempel komt
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoSweep(!autoSweep)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    autoSweep ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      autoSweep ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {autoSweep && (
                <div className="pt-2 flex items-center justify-between border-t border-slate-850">
                  <span className="text-slate-400 text-[10px]">Drempelbedrag:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold text-xs">€ {sweepThreshold},00</span>
                    <input
                      type="range"
                      min="100"
                      max="2500"
                      step="100"
                      value={sweepThreshold}
                      onChange={(e) => setSweepThreshold(Number(e.target.value))}
                      className="w-28 accent-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition shadow-md shadow-cyan-500/20 text-xs flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>IBAN Gegevens Opslaan &amp; Valideren</span>
            </button>
          </form>
        </div>

        {/* PANEL B: DIRECTE SEPA INSTANT UITBETALING WIZARD */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h4 className="text-white font-bold text-sm">
                  Directe SEPA Instant Uitbetaling
                </h4>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                0% Transactiekosten
              </span>
            </div>

            <p className="text-slate-400 text-xs mt-3 leading-relaxed">
              Neem direct geld op uit je Handelskassa naar je gekoppelde bankrekening. Binnen enkele seconden bijgeschreven via het Europese SEPA Instant netwerk.
            </p>

            {payoutSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs flex items-center gap-2 mt-3 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{payoutSuccess}</span>
              </div>
            )}

            {payoutError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs flex items-center gap-2 mt-3">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{payoutError}</span>
              </div>
            )}

            {/* Amount Selection */}
            <div className="space-y-3 mt-4">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Opnamebedrag (€ EUR)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">€</span>
                  <input
                    type="number"
                    min="10"
                    max={userBalance}
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(Number(e.target.value))}
                    className="w-full bg-[#080C14] border border-slate-700 rounded-xl pl-8 pr-3.5 py-2.5 text-white font-bold text-base focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[100, 250, 500, 1000, 2500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setPayoutAmount(amt)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition ${
                      payoutAmount === amt
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    € {amt}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPayoutAmount(userBalance)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[11px] font-bold hover:bg-cyan-500/20 transition"
                >
                  Alles (€ {userBalance.toLocaleString('nl-NL')})
                </button>
              </div>

              {/* Destination Summary Card */}
              <div className="p-3.5 bg-[#080C14] border border-slate-800 rounded-xl space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Ontvangende IBAN:</span>
                  <span className="text-white font-bold">{ibanInput || 'Geen IBAN ingesteld'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Tenaamstelling:</span>
                  <span className="text-white font-bold">{holderInput}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Verwerkingstijd:</span>
                  <span className="text-emerald-400 font-bold">Direct (Instant Pay &lt; 10 sec)</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleExecutePayout}
            disabled={isProcessingPayout || userBalance <= 0}
            className="w-full mt-4 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 text-xs"
          >
            <Zap className={`w-4 h-4 ${isProcessingPayout ? 'animate-spin' : ''}`} />
            <span>{isProcessingPayout ? 'Overboeken...' : `Direct € ${payoutAmount.toLocaleString('nl-NL')},00 Uitbetalen naar IBAN`}</span>
          </button>
        </div>
      </div>

      {/* 3. TRANSACTION HISTORY & STATEMENTS */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h4 className="text-white font-bold text-sm">
              Volledige Transactiegeschiedenis &amp; Afschriften
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadCsv}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-[11px] font-bold transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download CSV Afschrift</span>
            </button>
          </div>
        </div>

        {/* Transaction Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <button
            onClick={() => setTxFilter('all')}
            className={`px-3 py-1 rounded-lg border transition ${
              txFilter === 'all'
                ? 'bg-slate-800 text-white font-bold border-slate-600'
                : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Alle Transacties ({transactions.length})
          </button>

          <button
            onClick={() => setTxFilter('withdraw')}
            className={`px-3 py-1 rounded-lg border transition ${
              txFilter === 'withdraw'
                ? 'bg-rose-500/20 text-rose-300 font-bold border-rose-500/40'
                : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            SEPA Opnames / Uitbetalingen
          </button>

          <button
            onClick={() => setTxFilter('deposit')}
            className={`px-3 py-1 rounded-lg border transition ${
              txFilter === 'deposit'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border-emerald-500/40'
                : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Stortingen
          </button>

          <button
            onClick={() => setTxFilter('yield')}
            className={`px-3 py-1 rounded-lg border transition ${
              txFilter === 'yield'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border-cyan-500/40'
                : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Huur Inkomsten
          </button>

          <button
            onClick={() => setTxFilter('escrow')}
            className={`px-3 py-1 rounded-lg border transition ${
              txFilter === 'escrow'
                ? 'bg-indigo-500/20 text-indigo-300 font-bold border-indigo-500/40'
                : 'bg-[#080C14] text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Escrow Borgsommen
          </button>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-[10px] bg-[#080C14]">
                <th className="py-2.5 px-3">TRANSACTIE ID</th>
                <th className="py-2.5 px-3">TYPE</th>
                <th className="py-2.5 px-3">BEDRAG</th>
                <th className="py-2.5 px-3">OMSCHRIJVING / METHODE</th>
                <th className="py-2.5 px-3">DATUM</th>
                <th className="py-2.5 px-3 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-850/50 transition">
                  <td className="py-2.5 px-3 font-bold text-white text-[11px]">{tx.id}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tx.type === 'Opname'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : tx.type === 'Storting'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : tx.type === 'Huur Inkomsten'
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className={`py-2.5 px-3 font-bold ${tx.isCredit ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {tx.isCredit ? '+' : '-'}€ {tx.amount.toLocaleString('nl-NL')},00
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">{tx.method}</td>
                  <td className="py-2.5 px-3 text-slate-400 text-[10px]">{tx.date}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      {tx.status}
                    </span>
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
