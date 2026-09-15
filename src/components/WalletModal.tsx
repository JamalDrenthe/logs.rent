import { useState, FormEvent } from 'react';
import { Wallet, ArrowDownRight, ArrowUpRight, CheckCircle2, ShieldCheck, CreditCard, X } from 'lucide-react';
import { WalletTransaction } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onUpdateBalance: (newBalance: number, tx: WalletTransaction) => void;
  transactions: WalletTransaction[];
}

export function WalletModal({ isOpen, onClose, balance, onUpdateBalance, transactions }: WalletModalProps) {
  const [activeMode, setActiveMode] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState<number>(500);
  const [method, setMethod] = useState<string>('iDEAL (Direct via Rabobank/ING)');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  if (!isOpen) return null;

  const quickAmounts = [100, 250, 500, 1000, 2500, 5000];

  const handleExecute = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (amount <= 0) {
      setErrorMsg('Voer een geldig bedrag in groter dan nul.');
      return;
    }

    if (activeMode === 'withdraw' && amount > balance) {
      setErrorMsg(`Onvoldoende saldo. Uw huidige handelskassa saldo is € ${balance.toLocaleString('nl-NL')},00.`);
      return;
    }

    const newBal = activeMode === 'deposit' ? balance + amount : balance - amount;
    const newTx: WalletTransaction = {
      id: `WTX-${Date.now().toString().slice(-4)}`,
      type: activeMode === 'deposit' ? 'Storting' : 'Opname',
      amount,
      method,
      date: 'Zojuist',
      status: 'Voltooid',
      isCredit: activeMode === 'deposit'
    };

    onUpdateBalance(newBal, newTx);
    setSuccessMsg(
      activeMode === 'deposit'
        ? `€ ${amount.toLocaleString('nl-NL')},00 succesvol gestort op uw handelskassa!`
        : `€ ${amount.toLocaleString('nl-NL')},00 succesvol opgenomen naar uw rekening!`
    );

    setTimeout(() => {
      onClose();
      setSuccessMsg('');
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
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Handelskassa & Wallet Beheer
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Beveiligde stortingen en directe uitbetalingen
            </p>
          </div>
        </div>

        {/* Current Balance Display */}
        <div className="bg-[#080C14] p-4 rounded-xl border border-slate-800 text-center mb-5">
          <span className="text-[11px] text-slate-400 font-mono uppercase tracking-wider block mb-1">
            Beschikbaar Handelskassa Saldo
          </span>
          <div className="text-3xl font-black font-mono text-emerald-400">
            € {balance.toLocaleString('nl-NL')},00
          </div>
          <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400 mt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Escrow Guaranteed • Instant Verwerkt</span>
          </div>
        </div>

        {/* Deposit vs Withdraw tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#080C14] rounded-xl border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => {
              setActiveMode('deposit');
              setErrorMsg('');
            }}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 ${
              activeMode === 'deposit'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowDownRight className="w-4 h-4" />
            <span>Tegoed Storten</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveMode('withdraw');
              setErrorMsg('');
            }}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 ${
              activeMode === 'withdraw'
                ? 'bg-slate-800 text-white border border-slate-700 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Winst Opnemen</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleExecute} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">
              {activeMode === 'deposit' ? 'Stortingsbedrag (€)' : 'Opnamebedrag (€)'}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-mono font-bold text-sm">€</span>
              <input
                type="number"
                min="10"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Quick amount chips */}
          <div className="flex flex-wrap gap-1.5">
            {quickAmounts.map((amt) => (
              <button
                type="button"
                key={amt}
                onClick={() => setAmount(amt)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition border ${
                  amount === amt
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                € {amt}
              </button>
            ))}
            {activeMode === 'withdraw' && (
              <button
                type="button"
                onClick={() => setAmount(balance)}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20"
              >
                Max (€ {balance.toLocaleString('nl-NL')})
              </button>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">
              Betaalmethode / Bestemming
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
            >
              <option value="iDEAL (Direct via Rabobank/ING)">iDEAL (Direct via ING, Rabobank, ABN AMRO)</option>
              <option value="Bancontact Payconiq">Bancontact / Payconiq (België)</option>
              <option value="USDT TRC20 Crypto Escrow">USDT (TRC20 / Instant Crypto)</option>
              <option value="Bitcoin (BTC Escrow Vault)">Bitcoin (BTC Escrow Vault)</option>
              <option value="Creditcard (Visa / Mastercard)">Creditcard (Visa, Mastercard, AMEX)</option>
              <option value="SEPA Bankoverschrijving (IBAN)">SEPA Bankoverschrijving (IBAN)</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg ${
              activeMode === 'deposit'
                ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/20'
                : 'bg-cyan-500 hover:bg-cyan-600 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            {activeMode === 'deposit' ? (
              <>
                <ArrowDownRight className="w-4 h-4" />
                <span>Bevestig Storting van € {amount.toLocaleString('nl-NL')},00</span>
              </>
            ) : (
              <>
                <ArrowUpRight className="w-4 h-4" />
                <span>Vraag Uitbetaling aan van € {amount.toLocaleString('nl-NL')},00</span>
              </>
            )}
          </button>
        </form>

        {/* Recent mini history */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block mb-2">
            Laatste Handelskassa Mutaties:
          </span>
          <div className="space-y-1.5 max-h-28 overflow-y-auto">
            {transactions.slice(0, 3).map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between text-[11px] font-mono p-1.5 rounded-lg bg-[#080C14] border border-slate-800/80"
              >
                <span className="text-slate-300 flex items-center gap-1.5">
                  <CreditCard className="w-3 h-3 text-slate-400" />
                  <span>{tx.type} • {tx.method}</span>
                </span>
                <span className={`font-bold ${tx.isCredit ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {tx.isCredit ? '+' : '-'}€ {tx.amount.toLocaleString('nl-NL')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
