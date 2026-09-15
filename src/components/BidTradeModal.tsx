import { useState, useEffect, FormEvent } from 'react';
import { AccountListing, OrderBookEntry } from '../types';
import { ShoppingBag, Key, Gavel, ShieldCheck, X, CheckCircle2, Clock } from 'lucide-react';

interface BidTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: AccountListing;
  initialMode: 'buy' | 'rent' | 'bid';
  initialPrice?: number;
  userBalance: number;
  onExecuteTrade: (tradeData: {
    accountId: number;
    type: 'KOOP' | 'HUUR' | 'BOD';
    price: number;
    days?: number;
    escrowBorg: number;
  }) => void;
  onOpenHandoffWizard?: () => void;
}

export function BidTradeModal({
  isOpen,
  onClose,
  account,
  initialMode,
  initialPrice,
  userBalance,
  onExecuteTrade,
  onOpenHandoffWizard
}: BidTradeModalProps) {
  const [tradeMode, setTradeMode] = useState<'buy' | 'rent' | 'bid'>(initialMode);
  const [amount, setAmount] = useState<number>(initialPrice || account.price);
  const [rentDays, setRentDays] = useState<number>(7);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setTradeMode(initialMode);
    if (initialPrice !== undefined) {
      setAmount(initialPrice);
    } else if (initialMode === 'buy') {
      setAmount(account.price);
    } else if (initialMode === 'rent') {
      setAmount(account.rentPerDay);
    } else {
      setAmount(Math.round(account.price * 0.95));
    }
  }, [initialMode, initialPrice, account]);

  if (!isOpen) return null;

  const totalCost =
    tradeMode === 'rent'
      ? amount * rentDays + account.escrowBorg
      : tradeMode === 'buy'
      ? amount
      : amount;

  const handleConfirm = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (totalCost > userBalance) {
      setError(`Onvoldoende handelskassa saldo. Totale verplichting is € ${totalCost.toLocaleString('nl-NL')},00 maar uw saldo is € ${userBalance.toLocaleString('nl-NL')},00.`);
      return;
    }

    const tradeType = tradeMode === 'buy' ? 'KOOP' : tradeMode === 'rent' ? 'HUUR' : 'BOD';
    onExecuteTrade({
      accountId: account.id,
      type: tradeType,
      price: amount,
      days: tradeMode === 'rent' ? rentDays : undefined,
      escrowBorg: account.escrowBorg
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
      if (tradeMode === 'rent' || tradeMode === 'buy') {
        onOpenHandoffWizard?.();
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-slate-700/80 w-full max-w-md rounded-2xl p-6 shadow-2xl relative font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              ID #{account.id}
            </span>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                account.grade === 'A'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : account.grade === 'B'
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}
            >
              {account.grade} Grade
            </span>
          </div>
          <h3 className="text-base font-bold text-white leading-tight">{account.title}</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Platform: {account.platform} • Escrow Borg: € {account.escrowBorg}
          </p>
        </div>

        {/* Mode selector: Buy / Rent / Bid */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#080C14] rounded-xl border border-slate-800 mb-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setTradeMode('buy');
              setAmount(account.price);
            }}
            className={`py-2 px-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
              tradeMode === 'buy'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Kopen</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTradeMode('rent');
              setAmount(account.rentPerDay);
            }}
            className={`py-2 px-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
              tradeMode === 'rent'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Huren</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTradeMode('bid');
              setAmount(Math.round(account.price * 0.95));
            }}
            className={`py-2 px-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
              tradeMode === 'bid'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gavel className="w-3.5 h-3.5" />
            <span>Bieden</span>
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Order succesvol vastgelegd in Escrow register!</span>
          </div>
        )}

        <form onSubmit={handleConfirm} className="space-y-4 font-mono text-xs">
          {tradeMode === 'rent' ? (
            <>
              <div>
                <label className="block text-slate-400 mb-1">Huurprijs per dag (€)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500 text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span>Huurperiode</span>
                  <span className="text-cyan-400 font-bold">{rentDays} dagen</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 3, 7, 14].map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setRentDays(d)}
                      className={`py-1.5 rounded-lg border text-center transition ${
                        rentDays === d
                          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 font-bold'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {d} {d === 1 ? 'dag' : 'dgn'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#080C14] border border-slate-800 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Huurbedrag ({rentDays} dgn × € {amount}):</span>
                  <span className="text-white font-bold">€ {amount * rentDays},00</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tijdelijke Escrow Borg:</span>
                  <span className="text-amber-400">€ {account.escrowBorg},00</span>
                </div>
                <div className="flex justify-between text-white border-t border-slate-800 pt-1.5 font-bold">
                  <span>Totaal te blokkeren in Escrow:</span>
                  <span className="text-emerald-400 text-sm">€ {totalCost.toLocaleString('nl-NL')},00</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-slate-400 mb-1">
                  {tradeMode === 'buy' ? 'Vraagprijs Account (€)' : 'Uw Biedprijs (€)'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-mono font-bold text-sm">€</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-[#080C14] border border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-white font-mono focus:outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#080C14] border border-slate-800 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Overnamebedrag:</span>
                  <span className="text-white font-bold">€ {amount.toLocaleString('nl-NL')},00</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Escrow Commissie (0% intro):</span>
                  <span className="text-emerald-400">€ 0,00</span>
                </div>
                <div className="flex justify-between text-white border-t border-slate-800 pt-1.5 font-bold">
                  <span>Direct af te rekenen:</span>
                  <span className="text-emerald-400 text-sm">€ {amount.toLocaleString('nl-NL')},00</span>
                </div>
              </div>
            </>
          )}

          <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Escrow Bescherming: Geen uitbetaling voor 2FA en credential verificatie.</span>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg ${
              tradeMode === 'buy'
                ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/20'
                : tradeMode === 'rent'
                ? 'bg-cyan-500 hover:bg-cyan-600 text-slate-950 shadow-cyan-500/20'
                : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
            }`}
          >
            {tradeMode === 'buy' && <span>Koop Nu (€ {totalCost.toLocaleString('nl-NL')})</span>}
            {tradeMode === 'rent' && <span>Huur Bevestigen (€ {totalCost.toLocaleString('nl-NL')})</span>}
            {tradeMode === 'bid' && <span>Bod Uitbrengen (€ {amount.toLocaleString('nl-NL')})</span>}
          </button>
        </form>
      </div>
    </div>
  );
}
