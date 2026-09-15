import { useState, FormEvent } from 'react';
import { DisputeItem } from '../../types';
import { ShieldAlert, CheckCircle2, AlertTriangle, FileText, PlusCircle, ArrowDownLeft, X } from 'lucide-react';

interface DispuutTabProps {
  disputes: DisputeItem[];
  onResolveDispute: (id: string) => void;
  onAddDispute: (newDispute: DisputeItem) => void;
}

export function DispuutTab({ disputes, onResolveDispute, onAddDispute }: DispuutTabProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [accountIdInput, setAccountIdInput] = useState<string>('9812');
  const [reasonInput, setReasonInput] = useState<string>('Account geband tijdens actieve huurperiode');
  const [detailsInput, setDetailsInput] = useState<string>('');
  const [successNotice, setSuccessNotice] = useState<string>('');

  const handleSubmitDispute = (e: FormEvent) => {
    e.preventDefault();
    const newDispute: DisputeItem = {
      id: `DSP-${Math.floor(1000 + Math.random() * 9000)}`,
      accountId: Number(accountIdInput) || 9812,
      accountTitle: `Account [ID #${accountIdInput}]`,
      claimant: 'Mijn Handelskassa Account',
      reason: reasonInput,
      amountBorg: 250,
      status: 'In Behandeling',
      date: 'Vandaag',
      auditDetail: detailsInput || 'Automatische audit log gestart door gebruiker.'
    };

    onAddDispute(newDispute);
    setShowModal(false);
    setSuccessNotice('Dispuut succesvol ingediend. Escrow arbitrage analyseert de serverlogs.');
    setTimeout(() => setSuccessNotice(''), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white font-mono">
              Dispuut & Escrow Arbitrage Centrum
            </h2>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Als huurder of koper beschermd tegen onrechtmatige bans, haperende inloggegevens of
            voortijdige wachtwoordwijzigingen. De vastgezette escrow borgsom dekt schade 100% af.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-lg shadow-rose-500/20 font-mono"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Meld Account Probleem / Open Dispuut</span>
        </button>
      </div>

      {successNotice && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Disputes Table */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white font-mono mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
          <span>Actieve & Afgeronde Geschillen</span>
          <span className="text-xs text-slate-400 font-normal">Escrow Borg Teruggave Systeem</span>
        </h3>

        <div className="space-y-4 font-mono text-xs">
          {disputes.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#080C14] border border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:border-slate-700"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-400">{item.id}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-white font-bold">{item.accountTitle}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      item.status === 'In Behandeling'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : item.status === 'Borg Teruggestort'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="text-slate-300 text-xs font-sans">
                  <strong>Oorzaak:</strong> {item.reason}
                </div>
                <div className="text-slate-500 text-[11px] font-mono">
                  Audit Bevinding: {item.auditDetail}
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-850">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-500 block">Gereserveerde Borgsom</span>
                  <span className="text-base font-bold text-emerald-400">
                    € {item.amountBorg},00
                  </span>
                </div>

                {item.status === 'In Behandeling' ? (
                  <button
                    onClick={() => onResolveDispute(item.id)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-3 py-2 rounded-xl transition text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
                  >
                    <ArrowDownLeft className="w-3.5 h-3.5" />
                    <span>Borg Teruggave Vrijgeven</span>
                  </button>
                ) : (
                  <span className="text-slate-500 text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Afgehandeld</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Dispute Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative font-sans">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Nieuw Escrow Geschil Melden
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Borgteruggave en audit verificatie
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitDispute} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Betreffend Account ID</label>
                <input
                  type="number"
                  required
                  value={accountIdInput}
                  onChange={(e) => setAccountIdInput(e.target.value)}
                  className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Aard van het Probleem</label>
                <select
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Account geband tijdens actieve huurperiode">
                    Account geband tijdens actieve huurperiode (0% Ban Risk Breach)
                  </option>
                  <option value="Inloggegevens of wachtwoord gewijzigd door eigenaar">
                    Inloggegevens of wachtwoord gewijzigd door verhuurder
                  </option>
                  <option value="2FA code werkt niet en verkoper reageert niet">
                    2FA code werkt niet en verkoper reageert niet
                  </option>
                  <option value="Platform restrictie op advertenties of ritten">
                    Platform restrictie op advertenties of ritten aangetroffen
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Toelichting / Foutmelding</label>
                <textarea
                  rows={3}
                  value={detailsInput}
                  onChange={(e) => setDetailsInput(e.target.value)}
                  placeholder="Beschrijf beknopt wat er mis ging bij het inloggen..."
                  className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs">
                Bij een terechte melding keert het Escrow smart contract automatisch de € 250
                borgsom terug naar uw handelskassa.
              </div>

              <button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-rose-500/20 text-xs"
              >
                Dien Dispuut In ter Arbitrage
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
