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
  Mail,
  Moon,
  Sun,
  Languages
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (window.localStorage.getItem('logs-rent-theme') as 'dark' | 'light' | null) ?? 'dark';
  });
  const [language, setLanguage] = useState<'nl' | 'en'>(() => {
    if (typeof window === 'undefined') return 'nl';
    return (window.localStorage.getItem('logs-rent-language') as 'nl' | 'en' | null) ?? 'nl';
  });

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

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.classList.toggle('light', theme === 'light');
    window.localStorage.setItem('logs-rent-theme', theme);
    window.localStorage.setItem('logs-rent-language', language);
  }, [language, theme]);

  const copy = {
    nl: {
      subtitle: 'Digital Asset Exchange',
      version: 'v2.5 Pro',
      wallet: 'Handelskassa Saldo',
      list: 'Noteren',
      trader: 'Handelaar',
      login: 'Inloggen',
      stats: ['24u Beursvolume', 'Actieve Accounts', 'Escrow Borgsommen', 'A-Grade Premium', 'Investbotiq Volume'],
      footer: 'Realtime Digitale Account & Flex Activa Marktplaats',
      theme: 'Donkere modus',
      heroEyebrow: 'De exchange voor digitale assets',
      heroTitle: 'Handel met overzicht.',
      heroDescription: 'Ontdek, vergelijk en beheer digitale accounts met realtime marktdata, escrow-bescherming en een portfolio dat met je meebeweegt.',
      liveMarket: 'Markt live',
      activeListings: '3.492 actieve listings',
      browse: 'Bekijk catalogus'
    },
    en: {
      subtitle: 'Digital Asset Exchange',
      version: 'v2.5 Pro',
      wallet: 'Trading Wallet',
      list: 'List asset',
      trader: 'Trader',
      login: 'Sign in',
      stats: ['24h Market Volume', 'Active Accounts', 'Escrow Deposits', 'A-Grade Premium', 'Investbotiq Volume'],
      footer: 'Realtime Digital Account & Flexible Asset Marketplace',
      theme: 'Light mode',
      heroEyebrow: 'The exchange for digital assets',
      heroTitle: 'Trade with clarity.',
      heroDescription: 'Discover, compare and manage digital accounts with realtime market data, escrow protection and a portfolio that moves with you.',
      liveMarket: 'Market live',
      activeListings: '3,492 active listings',
      browse: 'Browse catalog'
    }
  }[language];

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
    { key: 'beurs', label: language === 'nl' ? 'Beurs' : 'Market', icon: TrendingUp },
    { key: 'catalogus', label: language === 'nl' ? 'Catalogus' : 'Catalog', icon: Store },
    { key: 'valuatie', label: language === 'nl' ? 'Valuatie' : 'Valuation', icon: Calculator },
    { key: 'investbotiq', label: 'Investbotiq', icon: Bot },
    { key: 'portfolio', label: language === 'nl' ? 'Mijn Portfolio' : 'My Portfolio', icon: Wallet },
    { key: 'escrow', label: 'Escrow & 2FA', icon: ShieldCheck },
    { key: 'dispuut', label: language === 'nl' ? 'Dispuut Centrum' : 'Dispute Center', icon: ShieldAlert },
    { key: 'api', label: 'API Portal', icon: Code },
    { key: 'veiligheid', label: language === 'nl' ? 'ToS Veiligheid' : 'ToS Safety', icon: EyeOff },
    { key: 'overons', label: language === 'nl' ? 'Over Logs Rent' : 'About Logs Rent', icon: Info },
    { key: 'faq', label: 'FAQ', icon: HelpCircle },
    { key: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <div className={`${theme === 'light' ? 'theme-light' : ''} min-w-0 overflow-x-hidden bg-[#080C14] text-slate-200 min-h-screen flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300`}>
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
        <div className="max-w-[1600px] mx-auto w-full min-w-0 px-3 sm:px-6 lg:px-8 min-h-16 py-2 flex flex-nowrap items-center justify-between gap-2">
          {/* Brand Monogram L.R */}
          <div
            onClick={() => setActiveTab('beurs')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <Logo className="w-10 h-10" variant={theme === 'light' ? 'light' : 'dark'} />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-wider text-white">
                  LOGS.RENT
                </span>
                <span className="hidden sm:inline-block bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-1.5 py-0.5 rounded border border-emerald-500/30 uppercase">
                  {copy.version}
                </span>
              </div>
              <p className="hidden sm:block text-[10px] text-slate-400 uppercase tracking-widest font-mono truncate">
                {copy.subtitle}
              </p>
            </div>
          </div>

          {/* Navigation Tabs bar */}
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-hidden text-xs font-mono 2xl:flex">
            {navTabs.filter((tab) => !['escrow', 'dispuut', 'api', 'veiligheid', 'faq', 'contact'].includes(tab.key)).map((tab) => {
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
                  className={`px-2 py-1.5 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
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
          <div className="ml-auto flex items-center justify-end gap-1.5 shrink-0 sm:gap-2.5">
            {/* Handelskassa Saldo Module with Deposit/Withdraw trigger */}
              <div
              onClick={() => setIsWalletOpen(true)}
              className="hidden md:flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 border border-slate-700/80 px-3 py-1.5 rounded-xl cursor-pointer transition shadow-sm group"
              title="Klik voor storting of opname uit de Handelskassa"
            >
              <div className="text-right font-mono">
                <span className="text-[9px] text-slate-400 block leading-none">
                  {copy.wallet}
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
              <span className="hidden sm:inline">{copy.list}</span>
            </button>

            {/* User Login/Auth trigger */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="bg-[#0F172A] hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs px-3 py-2 rounded-xl transition flex items-center gap-1.5 font-mono"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">
                {currentUser ? copy.trader : copy.login}
              </span>
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="bg-[#0F172A] hover:bg-slate-800 text-slate-300 border border-slate-700 p-2 rounded-xl transition"
              aria-label={copy.theme}
              title={copy.theme}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-300" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
              )}
            </button>
            <button
              onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
              className="bg-[#0F172A] hover:bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-2 rounded-xl transition flex items-center gap-1.5 font-mono text-[10px]"
              aria-label={`Switch to ${language === 'nl' ? 'English' : 'Nederlands'}`}
              title={language === 'nl' ? 'English' : 'Nederlands'}
            >
              <Languages className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Horizontal Navigation Tabs */}
      <div className="2xl:hidden bg-[#0F172A] border-b border-slate-800 px-3 py-2.5 overflow-x-auto scrollbar-none flex flex-nowrap items-center justify-start gap-1 text-xs font-mono">
        {navTabs.filter((tab) => !['escrow', 'dispuut', 'api', 'veiligheid', 'faq', 'contact'].includes(tab.key)).map((tab) => {
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

      {/* Market overview */}
      <section className="border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#080C14] to-[#080C14] px-3 py-6 sm:px-6 lg:px-8 font-mono">
        <div className="mx-auto grid max-w-7xl min-w-0 gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.95fr)] lg:gap-6">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5 sm:p-7">
            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  {copy.heroEyebrow}
                </div>
                <h1 className="max-w-md font-sans text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  {copy.heroTitle}
                </h1>
                <p className="mt-4 max-w-lg font-sans text-sm leading-6 text-slate-400">
                  {copy.heroDescription}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('catalogus')}
                  className="rounded-xl bg-emerald-400 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  {copy.browse}
                </button>
                <span className="text-xs text-slate-400">{copy.activeListings}</span>
              </div>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { label: copy.stats[0], value: '€ 482.910', note: '+14.8%', color: 'text-emerald-400' },
              { label: copy.stats[1], value: '3.492 Stuks', note: copy.liveMarket, color: 'text-cyan-400' },
              { label: copy.stats[2], value: '€ 128.450', note: '100% Guaranteed', color: 'text-emerald-400' },
              { label: copy.stats[3], value: '64.2% A-Grade', note: '0% Ban Risk', color: 'text-emerald-400' },
              { label: copy.stats[4], value: '41.5% Bot Trades', note: 'High-Freq', color: 'text-amber-400' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`min-w-0 rounded-2xl border border-slate-800 bg-[#0F172A]/70 p-4 sm:p-5 ${
                  index === 4 ? 'sm:col-span-2' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="min-w-0 truncate text-[11px] text-slate-400">{stat.label}</span>
                  <span className={`shrink-0 text-[10px] font-bold ${stat.color}`}>{stat.note}</span>
                </div>
                <div className={`mt-3 text-xl font-bold tracking-tight ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content View Switcher */}
      <main className="flex-grow max-w-7xl w-full min-w-0 mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
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
            <Logo className="w-7 h-7" variant={theme === 'light' ? 'light' : 'dark'} />
            <span>
              LOGS.RENT • {copy.footer}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-slate-400">
            <button
              onClick={() => setActiveTab('overons')}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              Over Logs Rent
            </button>
            <span>•</span>
            <button
              onClick={() => setIsHandoffOpen(true)}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              Escrow &amp; 2FA
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('dispuut')}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              {language === 'nl' ? 'Dispuut Centrum' : 'Dispute Center'}
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('api')}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              API Portal
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('veiligheid')}
              className="hover:text-emerald-400 transition cursor-pointer"
            >
              {language === 'nl' ? 'ToS Veiligheid' : 'ToS Safety'}
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
