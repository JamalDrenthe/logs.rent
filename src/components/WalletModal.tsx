import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Wallet, ArrowDownRight, ArrowUpRight, CheckCircle2, ShieldCheck, CreditCard, X, Building, User } from 'lucide-react';
import { WalletTransaction, UserProfile } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onUpdateBalance: (newBalance: number, tx: WalletTransaction) => void;
  transactions: WalletTransaction[];
  userProfile?: UserProfile;
  onUpdateUserProfile?: (profile: UserProfile) => void;
}

// Format IBAN with spaces every 4 characters
function formatIban(value: string): string {
  const clean = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return clean.match(/.{1,4}/g)?.join(' ') || clean;
}

// Validate IBAN basic structure
function validateIban(iban: string): { valid: boolean; error?: string } {
  const clean = iban.replace(/\s+/g, '').toUpperCase();
  if (!clean) return { valid: false, error: 'IBAN bankrekeningnummer is verplicht voor uitbetalingen.' };
  if (clean.length < 15 || clean.length > 34) {
    return { valid: false, error: 'IBAN moet tussen 15 en 34 tekens bevatten (bijv. NL91 ABNA 0417 8923 11).' };
  }
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(clean)) {
    return { valid: false, error: 'Ongeldig IBAN formaat (moet beginnen met landcode zoals NL of BE).' };
  }
  return { valid: true };
}

export function WalletModal({
  isOpen,
  onClose,
  balance,
  onUpdateBalance,
  transactions,
  userProfile,
  onUpdateUserProfile
}: WalletModalProps) {
  const [activeMode, setActiveMode] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState<number>(500);
  const [method, setMethod] = useState<string>('SEPA Bankoverschrijving (IBAN)');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  // IBAN payout details
  const [withdrawIban, setWithdrawIban] = useState<string>(userProfile?.iban || 'NL91 ABNA 0417 8923 11');
  const [withdrawHolder, setWithdrawHolder] = useState<string>(userProfile?.accountHolder || userProfile?.fullName || 'J.S. Drenthe');
  const [withdrawBank, setWithdrawBank] = useState<string>(userProfile?.bankName || 'ABN AMRO Bank N.V.');
  const [saveIbanToProfile, setSaveIbanToProfile] = useState<boolean>(true);

  // Sync when userProfile changes
  useEffect(() => {
    if (userProfile?.iban) {
      setWithdrawIban(userProfile.iban);
    }
    if (userProfile?.accountHolder || userProfile?.fullName) {
      setWithdrawHolder(userProfile.accountHolder || userProfile.fullName);
    }
    if (userProfile?.bankName) {
      setWithdrawBank(userProfile.bankName);
    }
  }, [userProfile]);

  if (!isOpen) return null;

  const quickAmounts = [100, 250, 500, 1000, 2500, 5000];

  const handleIbanChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatIban(e.target.value);
    setWithdrawIban(formatted);

    // Auto-detect Dutch major banks
    const clean = formatted.replace(/\s+/g, '');
    if (clean.length >= 8) {
      const bankCode = clean.slice(4, 8);
      if (bankCode === 'ABNA') setWithdrawBank('ABN AMRO Bank N.V.');
      else if (bankCode === 'INGB') setWithdrawBank('ING Bank N.V.');
      else if (bankCode === 'RABO') setWithdrawBank('Rabobank Nederland');
      else if (bankCode === 'ASNB') setWithdrawBank('ASN Bank');
      else if (bankCode === 'SNSB') setWithdrawBank('SNS Bank');
      else if (bankCode === 'KNAB') setWithdrawBank('Knab Bank');
      else if (bankCode === 'BUNQ') setWithdrawBank('Bunq B.V.');
    }
  };

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

    // IBAN validation for withdrawals
    if (activeMode === 'withdraw') {
      const ibanValidation = validateIban(withdrawIban);
      if (!ibanValidation.valid) {
        setErrorMsg(ibanValidation.error || 'Voer een geldig IBAN bankrekeningnummer in.');
        return;
      }
      if (!withdrawHolder.trim()) {
        setErrorMsg('Tenaamstelling van de rekening is verplicht.');
        return;
      }

      // Save to profile if checkbox selected
      if (saveIbanToProfile && onUpdateUserProfile && userProfile) {
        onUpdateUserProfile({
          ...userProfile,
          iban: withdrawIban,
          accountHolder: withdrawHolder,
          bankName: withdrawBank,
          isVerified: true,
          lastUpdated: 'Zojuist'
        });
      }
    }

    const newBal = activeMode === 'deposit' ? balance + amount : balance - amount;
    const finalMethod = activeMode === 'withdraw'
      ? `SEPA Uitbetaling (${withdrawIban.slice(0, 4)} •••• ${withdrawIban.slice(-4)})`
      : method;

    const newTx: WalletTransaction = {
      id: `WTX-${Date.now().toString().slice(-4)}`,
      type: activeMode === 'deposit' ? 'Storting' : 'Opname',
      amount,
      method: finalMethod,
      date: 'Zojuist',
      status: 'Voltooid',
      isCredit: activeMode === 'deposit'
    };

    onUpdateBalance(newBal, newTx);
    setSuccessMsg(
      activeMode === 'deposit'
        ? `€ ${amount.toLocaleString('nl-NL')},00 succesvol gestort op uw handelskassa!`
        : `€ ${amount.toLocaleString('nl-NL')},00 succesvol overgeboekt naar ${withdrawIban} (t.n.v. ${withdrawHolder})!`
    );

    setTimeout(() => {
      onClose();
      setSuccessMsg('');
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-slate-700/80 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative font-sans max-h-[92vh] overflow-y-auto">
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
              Handelskassa &amp; Wallet Beheer
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Beveiligde stortingen en directe SEPA IBAN uitbetalingen
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
            <span>Escrow Guaranteed • Instant Verwerkt via SEPA</span>
          </div>
        </div>

        {/* Deposit vs Withdraw tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#080C14] rounded-xl border border-slate-800 mb-5 font-mono text-xs">
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
                ? 'bg-slate-800 text-cyan-300 border border-slate-700 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Uitbetalen (IBAN)</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleExecute} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">
              {activeMode === 'deposit' ? 'Stortingsbedrag (€)' : 'Uitbetalingsbedrag (€)'}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">€</span>
              <input
                type="number"
                min="10"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-bold"
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
                className={`px-2.5 py-1 rounded-lg text-xs transition border ${
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
                className="px-2.5 py-1 rounded-lg text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 font-bold"
              >
                Max Saldo (€ {balance.toLocaleString('nl-NL')})
              </button>
            )}
          </div>

          {/* Deposit Mode Payment Methods */}
          {activeMode === 'deposit' ? (
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">
                Stortingsmethode
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="iDEAL (Direct via Rabobank/ING)">iDEAL (Direct via ING, Rabobank, ABN AMRO)</option>
                <option value="Bancontact Payconiq">Bancontact / Payconiq (België)</option>
                <option value="USDT TRC20 Crypto Escrow">USDT (TRC20 / Instant Crypto)</option>
                <option value="Bitcoin (BTC Escrow Vault)">Bitcoin (BTC Escrow Vault)</option>
                <option value="Creditcard (Visa / Mastercard)">Creditcard (Visa, Mastercard, AMEX)</option>
                <option value="SEPA Bankoverschrijving (IBAN)">SEPA Bankoverschrijving (IBAN)</option>
              </select>
            </div>
          ) : (
            /* Withdraw Mode: Full IBAN and Account Details Input */
            <div className="bg-[#080C14] border border-slate-800 p-3.5 rounded-xl space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <span className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Uitbetalingsrekening (IBAN)</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  SEPA Instant Pay
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  IBAN Bankrekeningnummer *
                </label>
                <input
                  type="text"
                  value={withdrawIban}
                  onChange={handleIbanChange}
                  placeholder="NL91 ABNA 0417 8923 11"
                  maxLength={34}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-cyan-300 font-bold uppercase tracking-wider focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Tenaamstelling Rekening *
                  </label>
                  <input
                    type="text"
                    value={withdrawHolder}
                    onChange={(e) => setWithdrawHolder(e.target.value)}
                    placeholder="bijv. Jamal Drenthe"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Bankinstelling
                  </label>
                  <input
                    type="text"
                    value={withdrawBank}
                    onChange={(e) => setWithdrawBank(e.target.value)}
                    placeholder="bijv. ABN AMRO Bank N.V."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                <input
                  type="checkbox"
                  id="saveIban"
                  checked={saveIbanToProfile}
                  onChange={(e) => setSaveIbanToProfile(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0 bg-slate-900"
                />
                <label htmlFor="saveIban" className="cursor-pointer">
                  Sla deze IBAN automatisch op in mijn handelaar profiel
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg ${
              activeMode === 'deposit'
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
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
                <span>Uitbetaling Uitvoeren naar IBAN (€ {amount.toLocaleString('nl-NL')},00)</span>
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
                <span className="text-slate-300 flex items-center gap-1.5 truncate max-w-[280px]">
                  <CreditCard className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{tx.type} • {tx.method}</span>
                </span>
                <span className={`font-bold shrink-0 ${tx.isCredit ? 'text-emerald-400' : 'text-slate-300'}`}>
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
