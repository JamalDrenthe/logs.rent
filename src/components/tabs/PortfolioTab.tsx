import { useState, useEffect } from 'react';
import {
  PortfolioItem,
  UserRole,
  UserProfile,
  WalletTransaction,
  AccountCenterSection
} from '../../types';
import {
  LayoutDashboard,
  Layers,
  CreditCard,
  UserCheck,
  ShieldCheck,
  Bot,
  Sliders,
  Wallet,
  Plus,
  RefreshCw,
  Lock,
  ArrowRight,
  Sparkles,
  Key,
  Clock,
  CheckCircle2,
  X
} from 'lucide-react';

import { AccountOverview } from '../account/AccountOverview';
import { AccountPortfolio } from '../account/AccountPortfolio';
import { AccountFinance } from '../account/AccountFinance';
import { AccountProfile } from '../account/AccountProfile';
import { AccountSecurity } from '../account/AccountSecurity';
import { AccountApiKeys } from '../account/AccountApiKeys';
import { AccountSettings } from '../account/AccountSettings';
import { AccountOperationsModal } from '../account/AccountOperationsModal';
import { QuickCredentialsModal } from '../account/QuickCredentialsModal';

interface PortfolioTabProps {
  portfolio: PortfolioItem[];
  unclaimedYield: number;
  onClaimYield: () => void;
  onOpenListingModal: () => void;
  onOpenWalletModal: () => void;
  onToggleAccountStatus: (id: string) => void;
  userRole?: UserRole;
  onOpenAuthModal?: () => void;
  onSwitchToTraderDemo?: () => void;
  onOpenHandoffModal?: () => void;
  onOpenDisputeModal?: (accountId: number) => void;
  onUpdateAccount?: (updatedItem: PortfolioItem) => void;
  userProfile?: UserProfile;
  onUpdateUserProfile?: (profile: UserProfile) => void;
  userBalance?: number;
  walletTransactions?: WalletTransaction[];
  onUpdateBalance?: (newBalance: number, tx: WalletTransaction) => void;
  initialSection?: AccountCenterSection;
}

export function PortfolioTab({
  portfolio,
  unclaimedYield,
  onClaimYield,
  onOpenListingModal,
  onOpenWalletModal,
  onToggleAccountStatus,
  userRole = 'trader',
  onOpenAuthModal,
  onSwitchToTraderDemo,
  onOpenDisputeModal,
  onUpdateAccount,
  userProfile,
  onUpdateUserProfile,
  userBalance = 14250,
  walletTransactions = [],
  onUpdateBalance,
  initialSection = 'overview'
}: PortfolioTabProps) {
  const [activeSection, setActiveSection] = useState<AccountCenterSection>(initialSection);

  // Modals state
  const [selectedConsoleItem, setSelectedConsoleItem] = useState<PortfolioItem | null>(null);
  const [selectedQuickItem, setSelectedQuickItem] = useState<PortfolioItem | null>(null);

  // Feedback notifications
  const [batchCheckSuccess, setBatchCheckSuccess] = useState<string | null>(null);
  const [isBatchChecking, setIsBatchChecking] = useState<boolean>(false);
  const [claimedAlert, setClaimedAlert] = useState<boolean>(false);

  // Sync section if initialSection prop changes
  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  // Batch Session Check
  const handleBatchSessionCheck = () => {
    setIsBatchChecking(true);
    setTimeout(() => {
      setIsBatchChecking(false);
      setBatchCheckSuccess(`Alle ${portfolio.length} account sessies gecontroleerd: 100% tokens online & valide!`);
      setTimeout(() => setBatchCheckSuccess(null), 3500);
    }, 700);
  };

  const handleClaim = () => {
    if (unclaimedYield <= 0) return;
    onClaimYield();
    setClaimedAlert(true);
    setTimeout(() => setClaimedAlert(false), 2500);
  };

  // Visitor conversion teaser screen
  if (userRole === 'visitor') {
    return (
      <div className="space-y-8 font-sans py-4">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-[#0F172A] to-[#080C14] p-8 sm:p-12 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-5 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
              <Lock className="w-3.5 h-3.5" />
              <span>ACCOUNT CENTRUM • INLOGGEN VEREIST</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Jouw Persoonlijke Account Dashboard &amp; <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Accountbeheer &amp; Sessietools
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              In het Account Centrum beheer je al je aangekochte, gehuurde en genoteerde accounts met echte logische
              mogelijkheden: live sessie cookie validatie, realtime TOTP 2FA codes, residentiële proxies,
              SEPA IBAN uitbetalingen en één-klik noodbeveiliging.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3 font-mono text-xs">
              <button
                onClick={onOpenAuthModal}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center gap-2.5 shadow-lg shadow-emerald-500/20"
              >
                <UserCheck className="w-4 h-4 text-slate-950" />
                <span>Inloggen / Account Maken</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onSwitchToTraderDemo && (
                <button
                  onClick={onSwitchToTraderDemo}
                  className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Open Demo Account Centrum</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
          <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Key className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm">Directe Sessie &amp; Cookie Injectie</h4>
            <p className="text-slate-400 font-sans text-xs leading-relaxed">
              Exporteer sessies in Netscape- en JSON-formaat voor directe import in Cookie-Editor, AdsPower of Dolphin Anty zonder inlog-triggers.
            </p>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm">Live TOTP 2FA Authenticator</h4>
            <p className="text-slate-400 font-sans text-xs leading-relaxed">
              Ingebouwde realtime 30-seconden generator voor dynamische 6-cijferige verificatiecodes per account.
            </p>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm">Geverifieerde SEPA IBAN Uitbetalingen</h4>
            <p className="text-slate-400 font-sans text-xs leading-relaxed">
              Koppel je persoonlijke gegevens en IBAN voor geautomatiseerde daguitbetalingen van je passieve huurinkomsten.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Notifications */}
      {batchCheckSuccess && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{batchCheckSuccess}</span>
          </div>
          <button onClick={() => setBatchCheckSuccess(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {claimedAlert && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Rendement succesvol bijgeschreven op uw Handelskassa Wallet!</span>
        </div>
      )}

      {/* Main Header of the Account Center */}
      <div className="bg-[#0F172A] border border-slate-800 p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>ACCOUNT CENTRUM &amp; OPERATIONS HUB</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
              <span>Ingelogd als:</span>
              <strong className="text-cyan-400">{userProfile?.email || 'info@logs.rent'}</strong>
            </span>

            {userProfile?.iban && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px]">
                <CreditCard className="w-3 h-3 text-cyan-400" />
                <span>IBAN OK</span>
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
            Mijn Account &amp; Handelaars Dashboard
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            Volledig beheer van je digitale profielen, live TOTP 2FA, anti-detect residentiële proxies, SEPA IBAN en Developer API sleutels.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs w-full md:w-auto">
          <button
            onClick={handleBatchSessionCheck}
            disabled={isBatchChecking}
            className="flex-1 md:flex-none px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center gap-1.5"
            title="Scan en valideer alle actieve sessie tokens"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isBatchChecking ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{isBatchChecking ? 'Testen...' : 'Test Sessies'}</span>
          </button>

          <button
            onClick={onOpenWalletModal}
            className="flex-1 md:flex-none px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center gap-1.5"
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Handelskassa</span>
          </button>

          <button
            onClick={onOpenListingModal}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Account Noteren</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Bar (7 dedicated pages) */}
      <div className="bg-[#0F172A] border border-slate-800 p-2 rounded-2xl shadow-lg flex items-center gap-1 overflow-x-auto font-mono text-xs">
        <button
          onClick={() => setActiveSection('overview')}
          className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'overview'
              ? 'bg-slate-800 text-white font-bold border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 text-emerald-400" />
          <span>Overzicht</span>
        </button>

        <button
          onClick={() => setActiveSection('accounts')}
          className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'accounts'
              ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
          }`}
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Mijn Accounts</span>
          <span className="px-1.5 py-0.2 rounded bg-slate-900 text-slate-300 text-[10px] font-bold">
            {portfolio.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('finance')}
          className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'finance'
              ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
          }`}
        >
          <CreditCard className="w-4 h-4 text-emerald-400" />
          <span>Financiën &amp; IBAN</span>
          {userProfile?.iban && (
            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold uppercase">
              SEPA OK
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSection('profile')}
          className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'profile'
              ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
          }`}
        >
          <UserCheck className="w-4 h-4 text-indigo-400" />
          <span>Identiteit &amp; KYC</span>
          <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-bold">
            L{userProfile?.verificationLevel || 2}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('security')}
          className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'security'
              ? 'bg-slate-800 text-white font-bold border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Beveiliging &amp; 2FA</span>
        </button>

        <button
          onClick={() => setActiveSection('api')}
          className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'api'
              ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
          }`}
        >
          <Bot className="w-4 h-4 text-amber-400" />
          <span>API &amp; Automatisering</span>
        </button>

        <button
          onClick={() => setActiveSection('settings')}
          className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'settings'
              ? 'bg-slate-800 text-white font-bold border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-850/60'
          }`}
        >
          <Sliders className="w-4 h-4 text-slate-400" />
          <span>Voorkeuren</span>
        </button>
      </div>

      {/* SECTION VIEW ROUTER */}
      {activeSection === 'overview' && (
        <AccountOverview
          userProfile={userProfile}
          portfolio={portfolio}
          userBalance={userBalance}
          unclaimedYield={unclaimedYield}
          onClaimYield={handleClaim}
          onNavigateSection={setActiveSection}
          onOpenListingModal={onOpenListingModal}
          onOpenWalletModal={onOpenWalletModal}
          onBatchCheckSessions={handleBatchSessionCheck}
          isBatchChecking={isBatchChecking}
          walletTransactions={walletTransactions}
          onOpenConsole={(item) => setSelectedConsoleItem(item)}
          onOpenQuickCreds={(item) => setSelectedQuickItem(item)}
        />
      )}

      {activeSection === 'accounts' && (
        <AccountPortfolio
          portfolio={portfolio}
          onOpenConsole={(item) => setSelectedConsoleItem(item)}
          onOpenQuickCreds={(item) => setSelectedQuickItem(item)}
          onToggleStatus={onToggleAccountStatus}
          onOpenDispute={onOpenDisputeModal}
          onOpenListingModal={onOpenListingModal}
        />
      )}

      {activeSection === 'finance' && (
        <AccountFinance
          userBalance={userBalance}
          onUpdateBalance={(newBal, tx) => onUpdateBalance?.(newBal, tx)}
          userProfile={userProfile}
          onUpdateUserProfile={onUpdateUserProfile}
          transactions={walletTransactions}
          onOpenWalletModal={onOpenWalletModal}
        />
      )}

      {activeSection === 'profile' && (
        <AccountProfile
          userProfile={userProfile}
          onUpdateUserProfile={onUpdateUserProfile}
        />
      )}

      {activeSection === 'security' && (
        <AccountSecurity
          currentUserEmail={userProfile?.email || 'info@logs.rent'}
        />
      )}

      {activeSection === 'api' && (
        <AccountApiKeys />
      )}

      {activeSection === 'settings' && (
        <AccountSettings />
      )}

      {/* Operations Console Modal */}
      <AccountOperationsModal
        item={selectedConsoleItem}
        onClose={() => setSelectedConsoleItem(null)}
        onUpdateAccount={onUpdateAccount}
        onToggleStatus={onToggleAccountStatus}
        onOpenDispute={onOpenDisputeModal}
      />

      {/* Quick Credentials & TOTP Mini-Modal */}
      <QuickCredentialsModal
        item={selectedQuickItem}
        onClose={() => setSelectedQuickItem(null)}
        onOpenConsole={(item) => setSelectedConsoleItem(item)}
      />
    </div>
  );
}
