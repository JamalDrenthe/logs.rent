import { useState, useEffect } from 'react';
import {
  INITIAL_ACCOUNTS,
  INITIAL_ORDERBOOK_ASKS,
  INITIAL_ORDERBOOK_BIDS,
  INITIAL_TRADES,
  INITIAL_PORTFOLIO,
  INITIAL_DISPUTES,
  INITIAL_WALLET_TRANSACTIONS
} from './data/mockData';
import {
  AccountListing,
  OrderBookEntry,
  RecentTrade,
  PortfolioItem,
  DisputeItem,
  WalletTransaction
} from './types';
import { Logo } from './components/Logo';
import { WalletModal } from './components/WalletModal';
import { BidTradeModal } from './components/BidTradeModal';
import { HandoffWizardModal } from './components/HandoffWizardModal';
import { ListingModal } from './components/ListingModal';
import { AuthModal } from './components/AuthModal';

import { BeursTab } from './components/tabs/BeursTab';
import { CatalogusTab } from './components/tabs/CatalogusTab';
import { ValuatieTab } from './components/tabs/ValuatieTab';
import { InvestbotiqTab } from './components/tabs/InvestbotiqTab';
import { PortfolioTab } from './components/tabs/PortfolioTab';
import { DispuutTab } from './components/tabs/DispuutTab';
import { ApiPortalTab } from './components/tabs/ApiPortalTab';
import { AnonymityGuideTab } from './components/tabs/AnonymityGuideTab';
import { OverOnsTab } from './components/tabs/OverOnsTab';
import { ContactTab } from './components/tabs/ContactTab';
import { FaqTab } from './components/tabs/FaqTab';

import {
  TrendingUp,
  Store,
  Calculator,
  Bot,
  Wallet,
  ShieldCheck,
  ShieldAlert,
  Code,
  EyeOff,
  Plus,
  User,
  CheckCircle2,
  Lock,
  Info,
  HelpCircle,
  Mail
} from 'lucide-react';

export default function App() {
  // State management
  const [activeTab, setActiveTab] = useState<string>('beurs');
  const [accounts, setAccounts] = useState<AccountListing[]>(INITIAL_ACCOUNTS);
  const [selectedAccount, setSelectedAccount] = useState<AccountListing>(INITIAL_ACCOUNTS[0]);
  const [orderBookAsks, setOrderBookAsks] = useState<OrderBookEntry[]>(INITIAL_ORDERBOOK_ASKS);
  const [orderBookBids, setOrderBookBids] = useState<OrderBookEntry[]>(INITIAL_ORDERBOOK_BIDS);
  const [recentTrades, setRecentTrades] = useState<RecentTrade[]>(INITIAL_TRADES);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [disputes, setDisputes] = useState<DisputeItem[]>(INITIAL_DISPUTES);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(INITIAL_WALLET_TRANSACTIONS);

  const [userBalance, setUserBalance] = useState<number>(14250.0);
  const [unclaimedYield, setUnclaimedYield] = useState<number>(285.0);
  const [currentUser, setCurrentUser] = useState<string | null>('handelaar@logs.rent');

  // Modals state
  const [isWalletOpen, setIsWalletOpen] = useState<boolean>(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState<boolean>(false);
  const [bidModalMode, setBidModalMode] = useState<'buy' | 'rent' | 'bid'>('buy');
  const [bidModalPrice, setBidModalPrice] = useState<number | undefined>(undefined);
  const [isHandoffOpen, setIsHandoffOpen] = useState<boolean>(false);
  const [isListingOpen, setIsListingOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Open trade modal with pre-filled price and mode
  const handleOpenTradeModal = (mode: 'buy' | 'rent' | 'bid', price?: number) => {
    setBidModalMode(mode);
    setBidModalPrice(price);
    setIsBidModalOpen(true);
  };

  // Execute trade handler
  const handleExecuteTrade = (tradeData: {
    accountId: number;
    type: 'KOOP' | 'HUUR' | 'BOD';
    price: number;
    days?: number;
    escrowBorg: number;
  }) => {
    const totalCost =
      tradeData.type === 'HUUR'
        ? tradeData.price * (tradeData.days || 7) + tradeData.escrowBorg
        : tradeData.price;

    setUserBalance((prev) => Math.max(0, prev - totalCost));

    const newTx: WalletTransaction = {
      id: `WTX-${Date.now().toString().slice(-4)}`,
      type: 'Order Transactie',
      amount: totalCost,
      method: `Logs Rent Escrow (${tradeData.type} ID #${tradeData.accountId})`,
      date: 'Zojuist',
      status: 'Voltooid',
      isCredit: false
    };
    setWalletTransactions((prev) => [newTx, ...prev]);

    const newTrade: RecentTrade = {
      id: `T-${Date.now().toString().slice(-4)}`,
      accountId: tradeData.accountId,
      accountTitle: selectedAccount.title,
      type: tradeData.type,
      price: tradeData.price,
      rentDays: tradeData.days,
      time: new Date().toLocaleTimeString(),
      isBot: false
    };
    setRecentTrades((prev) => [newTrade, ...prev]);

    // Add to portfolio if rented
    if (tradeData.type === 'HUUR') {
      const newPortItem: PortfolioItem = {
        id: `P-${Date.now().toString().slice(-4)}`,
        accountId: selectedAccount.id,
        accountTitle: selectedAccount.title,
        platform: selectedAccount.platform,
        grade: selectedAccount.grade,
        currentValue: selectedAccount.price,
        dailyRent: tradeData.price,
        status: 'Actief Verhuurd',
        totalEarned: 0,
        escrowLocked: tradeData.escrowBorg,
        renterOrBuyer: 'Mijn Handelskassa',
        contractEnds: `Nog ${tradeData.days || 7} dagen`
      };
      setPortfolio((prev) => [newPortItem, ...prev]);
    }

    triggerToast(`Order voor ${selectedAccount.title} succesvol in Escrow geplaatst!`);
  };

  // Claim yield
  const handleClaimYield = () => {
    setUserBalance((prev) => prev + unclaimedYield);
    const newTx: WalletTransaction = {
      id: `WTX-${Date.now().toString().slice(-4)}`,
      type: 'Huur Inkomsten',
      amount: unclaimedYield,
      method: 'Logs Rent Escrow Yield Uitkering',
      date: 'Zojuist',
      status: 'Voltooid',
      isCredit: true
    };
    setWalletTransactions((prev) => [newTx, ...prev]);
    setUnclaimedYield(0);
    triggerToast('Passieve huurinkomsten bijgeschreven op uw handelskassa!');
  };

  // Add new listing
  const handleAddListing = (newListing: AccountListing) => {
    setAccounts((prev) => [newListing, ...prev]);
    setSelectedAccount(newListing);
    triggerToast(`Account ID #${newListing.id} genoteerd op de beurs!`);
  };

  // Toggle portfolio item status
  const handleTogglePortfolioStatus = (id: string) => {
    setPortfolio((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus =
            item.status === 'Actief Verhuurd' ? 'Gepauzeerd' : 'Actief Verhuurd';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
    triggerToast('Account verhuurstatus bijgewerkt.');
  };

  // Resolve dispute
  const handleResolveDispute = (id: string) => {
    const dispute = disputes.find((d) => d.id === id);
    if (!dispute) return;

    setUserBalance((prev) => prev + dispute.amountBorg);
    const newTx: WalletTransaction = {
      id: `WTX-${Date.now().toString().slice(-4)}`,
      type: 'Storting',
      amount: dispute.amountBorg,
      method: `Escrow Borg Teruggave (${dispute.id})`,
      date: 'Zojuist',
      status: 'Voltooid',
      isCredit: true
    };
    setWalletTransactions((prev) => [newTx, ...prev]);

    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'Borg Teruggestort' } : d))
    );
    triggerToast(`€ ${dispute.amountBorg},00 borgsom teruggestort op uw handelskassa!`);
  };

  // Add dispute
  const handleAddDispute = (newDispute: DisputeItem) => {
    setDisputes((prev) => [newDispute, ...prev]);
  };

  // Handle wallet balance update
  const handleUpdateBalance = (newBalance: number, tx: WalletTransaction) => {
    setUserBalance(newBalance);
    setWalletTransactions((prev) => [tx, ...prev]);
  };

  const navTabs = [
    { key: 'beurs', label: 'Beurs', icon: TrendingUp },
    { key: 'catalogus', label: 'Catalogus', icon: Store },
    { key: 'valuatie', label: 'Valuatie', icon: Calculator },
    { key: 'investbotiq', label: 'Investbotiq', icon: Bot },
    { key: 'portfolio', label: 'Mijn Portfolio', icon: Wallet },
    { key: 'escrow', label: 'Escrow & 2FA', icon: ShieldCheck },
    { key: 'dispuut', label: 'Dispuut Centrum', icon: ShieldAlert },
    { key: 'api', label: 'API Portal', icon: Code },
    { key: 'veiligheid', label: 'ToS Veiligheid', icon: EyeOff },
    { key: 'overons', label: 'Over Logs Rent', icon: Info },
    { key: 'faq', label: 'FAQ', icon: HelpCircle },
    { key: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <div className="bg-[#080C14] text-slate-200 min-h-screen flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top Ticker Bar with dynamic price action */}
      <div className="bg-slate-950 border-b border-slate-800 py-1.5 text-xs font-mono text-slate-400 overflow-hidden select-none">
        <div className="w-full overflow-hidden whitespace-nowrap">
          <div className="animate-ticker flex items-center gap-8">
            {accounts.concat(accounts).map((acc, index) => (
              <span
                key={`${acc.id}-${index}`}
                onClick={() => {
                  setSelectedAccount(acc);
                  setActiveTab('beurs');
                }}
                className="inline-flex items-center gap-1.5 cursor-pointer hover:text-white transition"
              >
                <span className="text-cyan-400 font-bold">{acc.platform}</span>
                <span className="text-slate-300">ID #{acc.id}</span>
                <span className="text-emerald-400 font-bold">€{acc.price}</span>
                <span
                  className={`text-[10px] font-bold ${
                    acc.isPositiveChange ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {acc.change24h}
                </span>
                <span className="text-slate-600">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Sticky Header with Monogram Logo & Handelskassa Wallet Module */}
      <header className="sticky top-0 z-40 bg-[#080C14]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Brand Monogram L.R */}
          <div
            onClick={() => setActiveTab('beurs')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <Logo className="w-10 h-10" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-wider text-white">
                  LOGS.RENT
                </span>
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-1.5 py-0.5 rounded border border-emerald-500/30 uppercase">
                  v2.5 Pro
                </span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                Digital Asset Exchange
              </p>
            </div>
          </div>

          {/* Navigation Tabs bar */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#0F172A] p-1 rounded-xl border border-slate-800 text-xs font-mono">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    if (tab.key === 'escrow') {
                      setIsHandoffOpen(true);
                    } else {
                      setActiveTab(tab.key);
                    }
                  }}
                  className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    isActive
                      ? 'text-emerald-400 bg-slate-800 border border-slate-700 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Handelskassa Wallet Module & Account Noteren */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Handelskassa Saldo Module with Deposit/Withdraw trigger */}
            <div
              onClick={() => setIsWalletOpen(true)}
              className="flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 border border-slate-700/80 px-3 py-1.5 rounded-xl cursor-pointer transition shadow-sm group"
              title="Klik voor storting of opname uit de Handelskassa"
            >
              <div className="text-right font-mono">
                <span className="text-[9px] text-slate-400 block leading-none">
                  Handelskassa Saldo
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  € {userBalance.toLocaleString('nl-NL')},00
                </span>
              </div>
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                <Plus className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Noteren button */}
            <button
              onClick={() => setIsListingOpen(true)}
              className="hidden sm:flex bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl transition items-center gap-1.5 shadow-lg shadow-emerald-500/20 font-mono"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Noteren</span>
            </button>

            {/* User Login/Auth trigger */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="bg-[#0F172A] hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs px-3 py-2 rounded-xl transition flex items-center gap-1.5 font-mono"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">
                {currentUser ? 'Handelaar' : 'Inloggen'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Horizontal Navigation Tabs */}
      <div className="xl:hidden bg-[#0F172A] border-b border-slate-800 px-4 py-2 overflow-x-auto flex items-center gap-1 text-xs font-mono">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                if (tab.key === 'escrow') {
                  setIsHandoffOpen(true);
                } else {
                  setActiveTab(tab.key);
                }
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
                isActive
                  ? 'text-emerald-400 bg-slate-800 font-bold border border-slate-700'
                  : 'text-slate-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Key Market Stats Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-[#080C14] to-[#080C14] border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8 font-mono">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="bg-[#0F172A]/70 border border-slate-800 p-3 rounded-xl">
            <div className="flex justify-between items-start">
              <span className="text-[11px] text-slate-400">24u Beursvolume</span>
              <span className="text-emerald-400 text-[10px] font-bold">+14.8%</span>
            </div>
            <div className="text-lg font-bold text-white mt-1">€ 482.910</div>
          </div>

          <div className="bg-[#0F172A]/70 border border-slate-800 p-3 rounded-xl">
            <div className="flex justify-between items-start">
              <span className="text-[11px] text-slate-400">Actieve Accounts</span>
              <span className="text-cyan-400 text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Live
              </span>
            </div>
            <div className="text-lg font-bold text-white mt-1">3.492 Stuks</div>
          </div>

          <div className="bg-[#0F172A]/70 border border-slate-800 p-3 rounded-xl">
            <div className="flex justify-between items-start">
              <span className="text-[11px] text-slate-400">Escrow Borgsommen</span>
              <span className="text-emerald-400 text-[10px]">100% Guaranteed</span>
            </div>
            <div className="text-lg font-bold text-white mt-1">€ 128.450</div>
          </div>

          <div className="bg-[#0F172A]/70 border border-slate-800 p-3 rounded-xl">
            <div className="flex justify-between items-start">
              <span className="text-[11px] text-slate-400">A-Grade Premium</span>
              <span className="text-emerald-400 text-[10px]">0% Ban Risk</span>
            </div>
            <div className="text-lg font-bold text-white mt-1">64.2% A-Grade</div>
          </div>

          <div className="bg-[#0F172A]/70 border border-slate-800 p-3 rounded-xl col-span-2 lg:col-span-1">
            <div className="flex justify-between items-start">
              <span className="text-[11px] text-slate-400">Investbotiq Volume</span>
              <span className="text-amber-400 text-[10px]">High-Freq</span>
            </div>
            <div className="text-lg font-bold text-amber-400 mt-1">41.5% Bot Trades</div>
          </div>
        </div>
      </section>

      {/* Main Content View Switcher */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'beurs' && (
          <BeursTab
            selectedAccount={selectedAccount}
            onSelectAccount={setSelectedAccount}
            accounts={accounts}
            orderBookAsks={orderBookAsks}
            orderBookBids={orderBookBids}
            recentTrades={recentTrades}
            onOpenTradeModal={handleOpenTradeModal}
            onOpenHandoffModal={() => setIsHandoffOpen(true)}
          />
        )}

        {activeTab === 'catalogus' && (
          <CatalogusTab
            accounts={accounts}
            onSelectAccount={(acc) => {
              setSelectedAccount(acc);
              setActiveTab('beurs');
            }}
            onOpenTradeModal={(acc, mode) => {
              setSelectedAccount(acc);
              handleOpenTradeModal(mode, mode === 'buy' ? acc.price : acc.rentPerDay);
            }}
          />
        )}

        {activeTab === 'valuatie' && (
          <ValuatieTab onOpenListingModal={() => setIsListingOpen(true)} />
        )}

        {activeTab === 'investbotiq' && <InvestbotiqTab />}

        {activeTab === 'portfolio' && (
          <PortfolioTab
            portfolio={portfolio}
            unclaimedYield={unclaimedYield}
            onClaimYield={handleClaimYield}
            onOpenListingModal={() => setIsListingOpen(true)}
            onOpenWalletModal={() => setIsWalletOpen(true)}
            onToggleAccountStatus={handleTogglePortfolioStatus}
          />
        )}

        {activeTab === 'dispuut' && (
          <DispuutTab
            disputes={disputes}
            onResolveDispute={handleResolveDispute}
            onAddDispute={handleAddDispute}
          />
        )}

        {activeTab === 'api' && <ApiPortalTab />}

        {activeTab === 'veiligheid' && <AnonymityGuideTab />}

        {activeTab === 'overons' && <OverOnsTab />}

        {activeTab === 'faq' && <FaqTab />}

        {activeTab === 'contact' && <ContactTab />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo className="w-7 h-7" />
            <span>
              LOGS.RENT • Realtime Digitale Account & Flex Activa Marktplaats
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-slate-400">
            <button
              onClick={() => setActiveTab('overons')}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              Over Logs Rent
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('faq')}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              FAQ
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('contact')}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              Contact
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('veiligheid')}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              ToS Veiligheid
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        balance={userBalance}
        onUpdateBalance={handleUpdateBalance}
        transactions={walletTransactions}
      />

      <BidTradeModal
        isOpen={isBidModalOpen}
        onClose={() => setIsBidModalOpen(false)}
        account={selectedAccount}
        initialMode={bidModalMode}
        initialPrice={bidModalPrice}
        userBalance={userBalance}
        onExecuteTrade={handleExecuteTrade}
        onOpenHandoffWizard={() => setIsHandoffOpen(true)}
      />

      <HandoffWizardModal
        isOpen={isHandoffOpen}
        onClose={() => setIsHandoffOpen(false)}
        accountId={selectedAccount.id}
        accountTitle={selectedAccount.title}
        onSuccess={() => triggerToast('Escrow handoff en contractoverdracht succesvol afgerond!')}
      />

      <ListingModal
        isOpen={isListingOpen}
        onClose={() => setIsListingOpen(false)}
        onAddListing={handleAddListing}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(email) => {
          setCurrentUser(email);
          triggerToast(`Ingelogd als ${email}`);
        }}
        currentUser={currentUser}
      />

      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0F172A] border border-emerald-500/50 text-white font-mono text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
