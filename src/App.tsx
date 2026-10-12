import { useState, useEffect, lazy, Suspense } from 'react';
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
  WalletTransaction,
  UserRole
} from './types';
import { Logo } from './components/Logo';
import { WalletModal } from './components/WalletModal';
import { BidTradeModal } from './components/BidTradeModal';
import { HandoffWizardModal } from './components/HandoffWizardModal';
import { ListingModal } from './components/ListingModal';
import { AuthModal } from './components/AuthModal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';

import { HomeTab } from './components/tabs/HomeTab';
import { BeursTab } from './components/tabs/BeursTab';
import { CatalogusTab } from './components/tabs/CatalogusTab';
import { PortfolioTab } from './components/tabs/PortfolioTab';

// Lazy-loaded secondary views for code-splitting
const AdminTab = lazy(() => import('./components/tabs/AdminTab').then((m) => ({ default: m.AdminTab })));
const ValuatieTab = lazy(() => import('./components/tabs/ValuatieTab').then((m) => ({ default: m.ValuatieTab })));
const InvestbotiqTab = lazy(() => import('./components/tabs/InvestbotiqTab').then((m) => ({ default: m.InvestbotiqTab })));
const DispuutTab = lazy(() => import('./components/tabs/DispuutTab').then((m) => ({ default: m.DispuutTab })));
const ApiPortalTab = lazy(() => import('./components/tabs/ApiPortalTab').then((m) => ({ default: m.ApiPortalTab })));
const AnonymityGuideTab = lazy(() => import('./components/tabs/AnonymityGuideTab').then((m) => ({ default: m.AnonymityGuideTab })));
const OverOnsTab = lazy(() => import('./components/tabs/OverOnsTab').then((m) => ({ default: m.OverOnsTab })));
const ContactTab = lazy(() => import('./components/tabs/ContactTab').then((m) => ({ default: m.ContactTab })));
const FaqTab = lazy(() => import('./components/tabs/FaqTab').then((m) => ({ default: m.FaqTab })));

import {
  Home,
  TrendingUp,
  Store,
  Calculator,
  Bot,
  Wallet,
  ShieldCheck,
  ShieldAlert,
  Code,
  Eye,
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

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (window.localStorage.getItem('logs-rent-theme') as 'dark' | 'light' | null) ?? 'dark';
  });
  const [language, setLanguage] = useState<'nl' | 'en'>(() => {
    if (typeof window === 'undefined') return 'nl';
    return (window.localStorage.getItem('logs-rent-language') as 'nl' | 'en' | null) ?? 'nl';
  });

  // State management with localStorage persistence
  const [activeTab, setActiveTab] = useState<string>('home');
  const [accounts, setAccounts] = useState<AccountListing[]>(() =>
    loadFromStorage('logs-rent-accounts', INITIAL_ACCOUNTS)
  );
  const [selectedAccount, setSelectedAccount] = useState<AccountListing>(
    () => accounts[0] || INITIAL_ACCOUNTS[0]
  );
  const [orderBookAsks, setOrderBookAsks] = useState<OrderBookEntry[]>(INITIAL_ORDERBOOK_ASKS);
  const [orderBookBids, setOrderBookBids] = useState<OrderBookEntry[]>(INITIAL_ORDERBOOK_BIDS);
  const [recentTrades, setRecentTrades] = useState<RecentTrade[]>(() =>
    loadFromStorage('logs-rent-trades', INITIAL_TRADES)
  );
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() =>
    loadFromStorage('logs-rent-portfolio', INITIAL_PORTFOLIO)
  );
  const [disputes, setDisputes] = useState<DisputeItem[]>(() =>
    loadFromStorage('logs-rent-disputes', INITIAL_DISPUTES)
  );
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() =>
    loadFromStorage('logs-rent-txs', INITIAL_WALLET_TRANSACTIONS)
  );

  const [userBalance, setUserBalance] = useState<number>(() =>
    loadFromStorage('logs-rent-balance', 14250.0)
  );
  const [unclaimedYield, setUnclaimedYield] = useState<number>(() =>
    loadFromStorage('logs-rent-yield', 285.0)
  );
  const [currentUser, setCurrentUser] = useState<string | null>(() => auth.currentUser?.email ?? null);
  const [disputePrefillId, setDisputePrefillId] = useState<number | null>(null);
  const [disputeAutoOpen, setDisputeAutoOpen] = useState<boolean>(false);

  const userRole: UserRole =
    !currentUser
      ? 'visitor'
      : currentUser === 'info@jamaldrenthe.com'
      ? 'admin'
      : 'trader';

  const isAdmin = userRole === 'admin';
  const isTrader = userRole === 'trader';
  const isVisitor = userRole === 'visitor';

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setCurrentUser(user.email);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    window.localStorage.setItem('logs-rent-accounts', JSON.stringify(accounts));
  }, [accounts]);
  useEffect(() => {
    window.localStorage.setItem('logs-rent-portfolio', JSON.stringify(portfolio));
  }, [portfolio]);
  useEffect(() => {
    window.localStorage.setItem('logs-rent-balance', JSON.stringify(userBalance));
  }, [userBalance]);
  useEffect(() => {
    window.localStorage.setItem('logs-rent-yield', JSON.stringify(unclaimedYield));
  }, [unclaimedYield]);
  useEffect(() => {
    window.localStorage.setItem('logs-rent-txs', JSON.stringify(walletTransactions));
  }, [walletTransactions]);
  useEffect(() => {
    window.localStorage.setItem('logs-rent-disputes', JSON.stringify(disputes));
  }, [disputes]);
  useEffect(() => {
    window.localStorage.setItem('logs-rent-trades', JSON.stringify(recentTrades));
  }, [recentTrades]);

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
    if (userRole === 'visitor') {
      triggerToast('Log in als handelaar om direct orders te plaatsen met Escrow borg.');
      setIsAuthOpen(true);
      return;
    }
    setBidModalMode(mode);
    setBidModalPrice(price);
    setIsBidModalOpen(true);
  };

  // Open listing modal guarded for visitors
  const handleOpenListing = () => {
    if (userRole === 'visitor') {
      triggerToast('Log in als handelaar om een account te noteren op de beurs.');
      setIsAuthOpen(true);
      return;
    }
    setIsListingOpen(true);
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

    // Strict balance check: reject trade if balance is insufficient
    if (userBalance < totalCost) {
      triggerToast(
        `Onvoldoende saldo (€ ${userBalance.toLocaleString('nl-NL')}). Totaal vereist: € ${totalCost.toLocaleString('nl-NL')}. Waardeer uw handelskassa op.`
      );
      setIsWalletOpen(true);
      return;
    }

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

    // Add to portfolio if bought or rented
    if (tradeData.type === 'KOOP') {
      const newPortItem: PortfolioItem = {
        id: `P-BUY-${Date.now().toString().slice(-4)}`,
        accountId: selectedAccount.id,
        accountTitle: selectedAccount.title,
        platform: selectedAccount.platform,
        grade: selectedAccount.grade,
        currentValue: tradeData.price,
        dailyRent: selectedAccount.rentPerDay,
        status: 'Eigendom (Gekocht)',
        type: 'KOOP',
        totalEarned: 0,
        escrowLocked: 0,
        renterOrBuyer: 'Mijn Handelskassa (Volledig Eigendom)',
        contractEnds: 'Permanent in Eigendom',
        credentials: {
          username: `${selectedAccount.platform.toLowerCase()}_trader_${selectedAccount.id}`,
          email: `oge_${selectedAccount.id}@privatemail.com`,
          passwordMasked: '•••••••••••••••• (Verifieer in Handoff)',
          sessionCookies: `lr_auth_token_${Date.now()}_sec_sess`,
          twoFactorSecret: 'JBSWY3DPEHPK3PXP'
        }
      };
      setPortfolio((prev) => [newPortItem, ...prev]);
      setAccounts((prev) =>
        prev.map((a) => (a.id === selectedAccount.id ? { ...a, status: 'sold' } : a))
      );
      triggerToast(`Account ID #${selectedAccount.id} gekocht en toegevoegd aan je Portfolio onder Eigendom!`);
      setIsHandoffOpen(true);
    } else if (tradeData.type === 'HUUR') {
      const newPortItem: PortfolioItem = {
        id: `P-LEASE-${Date.now().toString().slice(-4)}`,
        accountId: selectedAccount.id,
        accountTitle: selectedAccount.title,
        platform: selectedAccount.platform,
        grade: selectedAccount.grade,
        currentValue: selectedAccount.price,
        dailyRent: tradeData.price,
        status: 'In Huur (Actief)',
        type: 'HUUR',
        totalEarned: 0,
        escrowLocked: tradeData.escrowBorg,
        renterOrBuyer: 'Mijn Handelskassa (Huurder)',
        contractEnds: `Nog ${tradeData.days || 7} dagen`,
        credentials: {
          username: `${selectedAccount.platform.toLowerCase()}_lease_${selectedAccount.id}`,
          email: `lease_${selectedAccount.id}@logs.rent`,
          passwordMasked: '•••••••••••••••• (Tijdelijke Sessie)',
          sessionCookies: `lr_lease_cookie_${Date.now()}`,
          twoFactorSecret: 'HXDMVJECJJWSRB3H'
        }
      };
      setPortfolio((prev) => [newPortItem, ...prev]);
      setAccounts((prev) =>
        prev.map((a) => (a.id === selectedAccount.id ? { ...a, status: 'rented' } : a))
      );
      triggerToast(`Account ID #${selectedAccount.id} voor ${tradeData.days || 7} dagen gehuurd met Escrow borg!`);
      setIsHandoffOpen(true);
    } else {
      triggerToast(`Bod van € ${tradeData.price},00 voor ${selectedAccount.title} in orderboek geplaatst!`);
    }
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

  // Toggle portfolio item status (Handelaar)
  const handleTogglePortfolioStatus = (id: string) => {
    setPortfolio((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.status === 'Eigendom (Gekocht)') {
            return {
              ...item,
              status: 'Actief Verhuurd',
              type: 'NOTERING',
              contractEnds: 'Verhuurd op Beurs (Dagopbrengst)'
            };
          }
          const nextStatus =
            item.status === 'Actief Verhuurd' ? 'Gepauzeerd' : 'Actief Verhuurd';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
    triggerToast('Account verhuurstatus bijgewerkt in je portfolio.');
  };

  // Moderate listing handler (Admin)
  const handleModerateListing = (
    accountId: number,
    newStatus: 'available' | 'rented' | 'paused' | 'sold'
  ) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === accountId ? { ...a, status: newStatus } : a))
    );
    triggerToast(
      newStatus === 'available'
        ? `Listing ID #${accountId} is heractiveerd door Admin.`
        : `Listing ID #${accountId} status is gewijzigd naar '${newStatus}' door Admin.`
    );
  };

  // Reset all data to factory demo defaults
  const handleResetData = () => {
    if (window.confirm('Weet u zeker dat u alle marktdata, portfolio en transacties wilt resetten naar de standaard beginwaarden?')) {
      window.localStorage.removeItem('logs-rent-accounts');
      window.localStorage.removeItem('logs-rent-portfolio');
      window.localStorage.removeItem('logs-rent-balance');
      window.localStorage.removeItem('logs-rent-yield');
      window.localStorage.removeItem('logs-rent-txs');
      window.localStorage.removeItem('logs-rent-disputes');
      window.localStorage.removeItem('logs-rent-trades');
      setAccounts(INITIAL_ACCOUNTS);
      setPortfolio(INITIAL_PORTFOLIO);
      setUserBalance(14250.0);
      setUnclaimedYield(285.0);
      setWalletTransactions(INITIAL_WALLET_TRANSACTIONS);
      setDisputes(INITIAL_DISPUTES);
      setRecentTrades(INITIAL_TRADES);
      triggerToast('Demo data gereset naar fabrieksinstellingen.');
    }
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
    { key: 'home', label: 'Home', icon: Home },
    { key: 'logs', label: 'Logs', icon: Store },
    { key: 'rent', label: 'Rent', icon: TrendingUp },
    { key: 'portfolio', label: language === 'nl' ? 'Portfolio' : 'Portfolio', icon: Wallet },
    { key: 'investbotiq', label: 'Investbotiq', icon: Bot },
    { key: 'valuatie', label: language === 'nl' ? 'Valuatie' : 'Valuation', icon: Calculator },
    ...(isAdmin ? [{ key: 'admin', label: 'Admin', icon: ShieldAlert }] : []),
    { key: 'escrow', label: 'Escrow & 2FA', icon: ShieldCheck },
    { key: 'dispuut', label: language === 'nl' ? 'Dispuut Centrum' : 'Dispute Center', icon: ShieldAlert },
    { key: 'api', label: 'API Portal', icon: Code },
    { key: 'veiligheid', label: language === 'nl' ? 'ToS Veiligheid' : 'ToS Safety', icon: EyeOff },
    { key: 'overons', label: language === 'nl' ? 'Over Logs Rent' : 'About Logs Rent', icon: Info },
    { key: 'faq', label: 'FAQ', icon: HelpCircle },
    { key: 'contact', label: 'Contact', icon: Mail }
  ];

  const visibleTabKeys =
    userRole === 'visitor'
      ? ['home', 'logs', 'rent', 'investbotiq', 'valuatie']
      : userRole === 'trader'
      ? ['home', 'logs', 'rent', 'portfolio', 'investbotiq', 'valuatie']
      : ['home', 'logs', 'rent', 'portfolio', 'investbotiq', 'valuatie', 'admin'];

  return (
    <div className={`${theme === 'light' ? 'theme-light' : ''} min-w-0 overflow-x-hidden bg-[#080C14] text-slate-200 min-h-screen flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300`}>
      {/* Top Ticker Bar with dynamic price action & Role Preview Switcher */}
      <div className="bg-slate-950 border-b border-slate-800 py-1.5 text-xs font-mono text-slate-400 select-none flex items-center justify-between px-3 sm:px-6">
        <div className="overflow-hidden whitespace-nowrap min-w-0 flex-1 mr-4">
          <div className="animate-ticker flex items-center gap-8">
            {accounts.concat(accounts).map((acc, index) => (
              <span
                key={`${acc.id}-${index}`}
                onClick={() => {
                  setSelectedAccount(acc);
                  setActiveTab('rent');
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

        {/* Dynamic Role Selector Pill */}
        <div className="hidden lg:flex items-center gap-2 shrink-0 text-[10px]">
          <span className="text-slate-500 uppercase font-bold text-[9px] tracking-wider">Rol:</span>
          <div className="inline-flex rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => {
                setCurrentUser(null);
                triggerToast('Weergave: Bezoeker (Gast)');
              }}
              className={`px-2 py-0.5 rounded-md transition flex items-center gap-1 ${
                userRole === 'visitor'
                  ? 'bg-slate-800 text-white font-bold border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Bekijk hoe een anonieme bezoeker logs.rent ervaart"
            >
              <Eye className="w-3 h-3 text-cyan-400" />
              <span>Bezoeker</span>
            </button>
            <button
              onClick={() => {
                setCurrentUser('trader_pro@logs.rent');
                triggerToast('Weergave: Handelaar (trader_pro@logs.rent)');
              }}
              className={`px-2 py-0.5 rounded-md transition flex items-center gap-1 ${
                userRole === 'trader'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Bekijk hoe een actieve handelaar logs.rent ervaart"
            >
              <Wallet className="w-3 h-3 text-cyan-400" />
              <span>Handelaar</span>
            </button>
            <button
              onClick={() => {
                setCurrentUser('info@jamaldrenthe.com');
                triggerToast('Weergave: Platform Admin (info@jamaldrenthe.com)');
              }}
              className={`px-2 py-0.5 rounded-md transition flex items-center gap-1 ${
                userRole === 'admin'
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Bekijk hoe platform admin Jamal Drenthe logs.rent ervaart"
            >
              <ShieldAlert className="w-3 h-3 text-emerald-400" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header with Monogram Logo & Handelskassa Wallet Module */}
      <header className="sticky top-0 z-40 bg-[#080C14]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto w-full min-w-0 px-3 sm:px-6 lg:px-8 min-h-16 py-2 flex flex-nowrap items-center justify-between gap-2">
          {/* Brand Monogram L.R */}
          <div
            onClick={() => setActiveTab('home')}
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
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-hidden text-xs font-mono 2xl:flex">
            {navTabs.filter((tab) => visibleTabKeys.includes(tab.key)).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              const isAdminTab = tab.key === 'admin';
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? tab.key === 'home'
                        ? 'text-white bg-slate-800 border border-slate-700 font-bold shadow-sm'
                        : tab.key === 'logs'
                        ? 'text-cyan-400 bg-slate-800 border border-slate-700 font-bold shadow-sm'
                        : isAdminTab
                        ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 font-bold shadow-sm'
                        : 'text-emerald-400 bg-slate-800 border border-slate-700 font-bold shadow-sm'
                      : isAdminTab
                      ? 'text-emerald-400/80 hover:text-emerald-300 hover:bg-emerald-500/10'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {isAdminTab && (
                    <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-1 py-0.5 rounded font-mono font-bold leading-none">
                      PRO
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Handelskassa Wallet Module & Account Noteren */}
          <div className="ml-auto flex items-center justify-end gap-1.5 shrink-0 sm:gap-2.5">
            {/* If Trader or Admin: Show Handelskassa Saldo */}
            {userRole !== 'visitor' ? (
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
            ) : (
              /* If Visitor: Show Start als Handelaar button */
              <button
                onClick={() => setIsAuthOpen(true)}
                className="hidden sm:flex bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold text-xs px-3.5 py-2 rounded-xl transition items-center gap-1.5 font-mono shadow-sm"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Start als Handelaar</span>
              </button>
            )}

            {/* Noteren button (only if trader or admin) */}
            {userRole !== 'visitor' ? (
              <button
                onClick={handleOpenListing}
                className="hidden sm:flex bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl transition items-center gap-1.5 shadow-lg shadow-emerald-500/20 font-mono"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{copy.list}</span>
              </button>
            ) : null}

            {/* User Login/Auth trigger */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className={`text-xs px-3 py-2 rounded-xl transition flex items-center gap-1.5 font-mono border ${
                userRole === 'admin'
                  ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-bold'
                  : userRole === 'trader'
                  ? 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-bold'
                  : 'bg-[#0F172A] hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              {userRole === 'admin' ? (
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              ) : userRole === 'trader' ? (
                <User className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <User className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className="hidden sm:inline">
                {userRole === 'admin' ? 'Admin' : userRole === 'trader' ? 'Handelaar' : copy.login}
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
        {navTabs.filter((tab) => visibleTabKeys.includes(tab.key)).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          const isAdminTab = tab.key === 'admin';
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
                isActive
                  ? tab.key === 'home'
                    ? 'text-white bg-slate-800 font-bold border border-slate-700'
                    : tab.key === 'logs'
                    ? 'text-cyan-400 bg-slate-800 font-bold border border-slate-700'
                    : isAdminTab
                    ? 'text-emerald-400 bg-emerald-500/10 font-bold border border-emerald-500/30'
                    : 'text-emerald-400 bg-slate-800 font-bold border border-slate-700'
                  : isAdminTab
                  ? 'text-emerald-400/80'
                  : 'text-slate-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content View Switcher */}
      <main className="flex-grow max-w-7xl w-full min-w-0 mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center min-h-[350px] gap-3 font-mono text-xs text-slate-400">
              <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
              <span>Gegevens laden...</span>
            </div>
          }
        >
        {activeTab === 'home' && (
          <HomeTab
            accounts={accounts}
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectAccount={(acc) => {
              setSelectedAccount(acc);
              setActiveTab('rent');
            }}
            onOpenTradeModal={(acc, mode) => {
              setSelectedAccount(acc);
              handleOpenTradeModal(mode, mode === 'buy' ? acc.price : acc.rentPerDay);
            }}
            onOpenListingModal={handleOpenListing}
            onOpenHandoffModal={() => setIsHandoffOpen(true)}
            language={language}
            userRole={userRole}
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthOpen(true)}
          />
        )}

        {(activeTab === 'rent' || activeTab === 'beurs') && (
          <BeursTab
            selectedAccount={selectedAccount}
            onSelectAccount={setSelectedAccount}
            accounts={accounts}
            orderBookAsks={orderBookAsks}
            orderBookBids={orderBookBids}
            recentTrades={recentTrades}
            onOpenTradeModal={handleOpenTradeModal}
            onOpenHandoffModal={() => setIsHandoffOpen(true)}
            userRole={userRole}
            onModerateListing={handleModerateListing}
            onNavigateToDisputes={() => setActiveTab('dispuut')}
          />
        )}

        {(activeTab === 'logs' || activeTab === 'catalogus') && (
          <CatalogusTab
            accounts={accounts}
            onSelectAccount={(acc) => {
              setSelectedAccount(acc);
              setActiveTab('rent');
            }}
            onOpenTradeModal={(acc, mode) => {
              setSelectedAccount(acc);
              handleOpenTradeModal(mode, mode === 'buy' ? acc.price : acc.rentPerDay);
            }}
            userRole={userRole}
            onModerateListing={handleModerateListing}
          />
        )}

        {activeTab === 'valuatie' && (
          <ValuatieTab onOpenListingModal={handleOpenListing} />
        )}

        {activeTab === 'investbotiq' && <InvestbotiqTab />}

        {activeTab === 'portfolio' && (
          <PortfolioTab
            portfolio={portfolio}
            unclaimedYield={unclaimedYield}
            onClaimYield={handleClaimYield}
            onOpenListingModal={handleOpenListing}
            onOpenWalletModal={() => setIsWalletOpen(true)}
            onToggleAccountStatus={handleTogglePortfolioStatus}
            userRole={userRole}
            onOpenAuthModal={() => setIsAuthOpen(true)}
            onOpenHandoffModal={() => setIsHandoffOpen(true)}
            onOpenDisputeModal={(accId) => {
              setDisputePrefillId(accId);
              setDisputeAutoOpen(true);
              setActiveTab('dispuut');
            }}
            onSwitchToTraderDemo={() => {
              setCurrentUser('trader_pro@logs.rent');
              triggerToast('Demo Handelaar sessie geactiveerd.');
            }}
          />
        )}

        {activeTab === 'admin' && (
          <AdminTab
            accounts={accounts}
            disputes={disputes}
            userBalance={userBalance}
            onResolveDispute={handleResolveDispute}
            onOpenListingModal={handleOpenListing}
            language={language}
          />
        )}

        {activeTab === 'dispuut' && (
          <DispuutTab
            disputes={disputes}
            onResolveDispute={handleResolveDispute}
            onAddDispute={handleAddDispute}
            initialAccountId={disputePrefillId}
            autoOpenModal={disputeAutoOpen}
          />
        )}

        {activeTab === 'api' && <ApiPortalTab />}

        {activeTab === 'veiligheid' && <AnonymityGuideTab />}

        {activeTab === 'overons' && <OverOnsTab />}

        {activeTab === 'faq' && <FaqTab />}

        {activeTab === 'contact' && <ContactTab />}
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <Logo className="w-7 h-7" variant={theme === 'light' ? 'light' : 'dark'} />
            <span className="group-hover:text-white transition">
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
            <span>•</span>
            <button
              onClick={handleResetData}
              className="text-slate-500 hover:text-amber-400 transition cursor-pointer"
              title="Herstel alle markt- en portfolio beginwaarden"
            >
              Reset Demo
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
          triggerToast(`Ingelogd als ${email}${email === 'info@jamaldrenthe.com' ? ' (Admin)' : ''}`);
        }}
        onLogout={() => {
          setCurrentUser(null);
          triggerToast('Succesvol uitgelogd');
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
