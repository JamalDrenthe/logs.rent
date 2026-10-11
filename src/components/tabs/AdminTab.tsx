import { useState } from 'react';
import { AccountListing, DisputeItem } from '../../types';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Plus,
  RefreshCw,
  Server,
  Lock,
  Layers,
  TrendingUp,
  DollarSign,
  Gavel,
  Sliders,
  ExternalLink,
  UserCheck
} from 'lucide-react';

interface AdminTabProps {
  accounts: AccountListing[];
  disputes: DisputeItem[];
  userBalance: number;
  onResolveDispute: (id: string) => void;
  onOpenListingModal: () => void;
  language: 'nl' | 'en';
}

export function AdminTab({
  accounts,
  disputes,
  userBalance,
  onResolveDispute,
  onOpenListingModal,
  language
}: AdminTabProps) {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'disputes' | 'listings' | 'system'>('disputes');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const isNl = language === 'nl';

  const triggerStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const pendingDisputes = disputes.filter((d) => d.status === 'In Behandeling');
  const resolvedDisputes = disputes.filter((d) => d.status !== 'In Behandeling');

  const totalVaultBorg = accounts.reduce((acc, a) => acc + a.escrowBorg, 0);

  return (
    <div className="space-y-6 font-sans">
      {/* Admin Top Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-[#0F172A] to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              {isNl ? 'ADMINISTRATOR CONTROLE CENTRUM' : 'ADMIN CONTROL CENTER'}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 text-xs">info@jamaldrenthe.com</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white font-mono">
            Platform &amp; Escrow Beheerpaneel
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed mt-1">
            Volledige controle over actieve listings, dispuutarbitrage, smart escrow borgsommen en
            Firebase live synchronisatie voor <strong className="text-emerald-400">logs.rent</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
          <button
            onClick={onOpenListingModal}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Nieuw Account Noteren</span>
          </button>
        </div>
      </div>

      {/* Admin KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Escrow Vault Reserves</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">€ {totalVaultBorg.toLocaleString('nl-NL')},00</div>
          <div className="text-[11px] text-emerald-400 mt-2 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Geverifieerd &amp; Gedekt</span>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Actieve Listings</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400">{accounts.length} Accounts</div>
          <div className="text-[11px] text-slate-400 mt-2">
            {accounts.filter((a) => a.grade === 'A').length} A-Grade Premium
          </div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Open Geschillen</span>
            <Gavel className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{pendingDisputes.length} In Behandeling</div>
          <div className="text-[11px] text-slate-400 mt-2">
            {resolvedDisputes.length} Eerder Opgelost
          </div>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Firebase &amp; OAuth</span>
            <Server className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg font-black text-emerald-400 truncate">logs-rent-dev</div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>logs.rent Whitelist Actief</span>
          </div>
        </div>
      </div>

      {/* Admin Subtabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 font-mono text-xs">
        <button
          onClick={() => setActiveAdminSubTab('disputes')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
            activeAdminSubTab === 'disputes'
              ? 'bg-slate-800 text-amber-400 font-bold border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Gavel className="w-4 h-4" />
          <span>Dispuut Arbitrage ({pendingDisputes.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminSubTab('listings')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
            activeAdminSubTab === 'listings'
              ? 'bg-slate-800 text-cyan-400 font-bold border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Listings Beheer ({accounts.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminSubTab('system')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
            activeAdminSubTab === 'system'
              ? 'bg-slate-800 text-emerald-400 font-bold border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Systeem &amp; Beveiliging</span>
        </button>
      </div>

      {/* Status Notice Toast */}
      {statusMessage && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Subtab 1: Dispuut Arbitrage */}
      {activeAdminSubTab === 'disputes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Geschillen die arbitrage vereisen</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Escrow borgsommen worden automatisch vrijgegeven of teruggestort.
            </span>
          </div>

          {disputes.length === 0 ? (
            <div className="p-8 text-center bg-[#0F172A] border border-slate-800 rounded-2xl text-slate-400 font-mono text-xs">
              Geen openstaande geschillen. Het platform functioneert 100% vlekkeloos.
            </div>
          ) : (
            <div className="space-y-3">
              {disputes.map((dispute) => {
                const isPending = dispute.status === 'In Behandeling';
                return (
                  <div
                    key={dispute.id}
                    className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-cyan-400 font-bold">{dispute.id}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-white font-bold">{dispute.accountTitle}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            isPending
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          }`}
                        >
                          {dispute.status}
                        </span>
                      </div>
                      <div className="text-slate-300">
                        <strong className="text-slate-400">Reden:</strong> {dispute.reason}
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans">
                        <strong className="font-mono text-slate-500">Audit details:</strong> {dispute.auditDetail}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block uppercase">Borgsom</span>
                        <span className="text-base font-bold text-white">€ {dispute.amountBorg},00</span>
                      </div>

                      {isPending && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              onResolveDispute(dispute.id);
                              triggerStatus(`Borgsom € ${dispute.amountBorg},- voor ${dispute.id} teruggestort.`);
                            }}
                            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition shadow-md shadow-emerald-500/20"
                          >
                            Borg Vrijgeven / Oplossen
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Subtab 2: Listings Beheer */}
      {activeAdminSubTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Actieve Listings op logs.rent</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Totaal {accounts.length} geregistreerde accounts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map((acc) => (
              <div
                key={acc.id}
                className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 font-mono text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#080C14] text-cyan-400 border border-slate-800 font-bold">
                      {acc.platform}
                    </span>
                    <span className="text-slate-400">ID #{acc.id}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded border text-[10px] font-bold ${
                      acc.status === 'available'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {acc.status === 'available' ? 'BESCHIKBAAR' : 'VERHUURD'}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white truncate">{acc.title}</h4>
                  <p className="text-[11px] text-slate-400 font-sans line-clamp-1 mt-0.5">{acc.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#080C14] border border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">Koop</span>
                    <span className="text-white font-bold">€ {acc.price}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">Huur / dag</span>
                    <span className="text-cyan-400 font-bold">€ {acc.rentPerDay}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">Borg</span>
                    <span className="text-emerald-400 font-bold">€ {acc.escrowBorg}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 3: Systeem & Beveiliging */}
      {activeAdminSubTab === 'system' && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 font-mono text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Cloud &amp; Firebase Systeemconfiguratie</span>
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Actief Firebase Project</span>
                <span className="text-white font-bold text-sm">logs-rent-dev (Project #457788654642)</span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px]">
                ONLINE
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Geautoriseerde Domeinen (OAuth Whitelist)</span>
                <span className="text-slate-200 text-xs">logs.rent, www.logs.rent, localhost, logs-rent-dev.firebaseapp.com</span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px]">
                GEVALIDEERD
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Admin Beveiligingsregels (firestore.rules)</span>
                <span className="text-slate-200 text-xs">Exclusieve lees- en schrijfrechten voor info@jamaldrenthe.com</span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px]">
                ACTIEF
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
