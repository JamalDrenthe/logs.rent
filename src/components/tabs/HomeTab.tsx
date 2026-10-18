import { useState } from 'react';
import { AccountListing, UserRole } from '../../types';
import {
  TrendingUp,
  Store,
  ShieldCheck,
  ShieldAlert,
  Bot,
  Zap,
  Sparkles,
  ArrowRight,
  Clock,
  Lock,
  CheckCircle2,
  Calculator,
  ChevronRight,
  Plus,
  Flame,
  Globe,
  Award,
  Layers,
  ArrowUpRight,
  Wallet,
  User
} from 'lucide-react';

interface HomeTabProps {
  accounts: AccountListing[];
  onNavigate: (tab: string) => void;
  onSelectAccount: (account: AccountListing) => void;
  onOpenTradeModal: (account: AccountListing, mode: 'buy' | 'rent' | 'bid') => void;
  onOpenListingModal: () => void;
  onOpenHandoffModal: () => void;
  language: 'nl' | 'en';
  userRole?: UserRole;
  currentUser?: string | null;
  onOpenAuthModal?: () => void;
}

export function HomeTab({
  accounts,
  onNavigate,
  onSelectAccount,
  onOpenTradeModal,
  onOpenListingModal,
  onOpenHandoffModal,
  language,
  userRole = 'visitor',
  currentUser,
  onOpenAuthModal
}: HomeTabProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const isNl = language === 'nl';

  // Highlight 3 featured accounts
  const featuredAccounts = accounts.slice(0, 3);
  const heroAccount = accounts[0] || null;

  const stats = [
    { label: isNl ? '24u Handelsvolume' : '24h Trading Volume', value: '€ 482.910', note: '+14.8%', color: 'text-emerald-400' },
    { label: isNl ? 'Actieve Logs & Accounts' : 'Active Logs & Accounts', value: '3.492 Stuks', note: isNl ? 'Geverifieerd' : 'Verified', color: 'text-cyan-400' },
    { label: isNl ? 'Borgsommen in Escrow' : 'Protected Escrow Deposits', value: '€ 128.450', note: isNl ? 'Gedekt in kassa' : 'Held in vault', color: 'text-emerald-400' },
    { label: isNl ? 'Gemiddelde Overdracht' : 'Avg. Transfer Time', value: '< 2 min', note: isNl ? 'Directe 2FA' : 'Instant 2FA', color: 'text-amber-400' },
  ];

  const steps = [
    {
      step: '01',
      title: isNl ? 'Kies Log of Account' : 'Choose Log or Asset',
      desc: isNl
        ? 'Filter door geverifieerde social-, gaming- of flex-profielen met gedetailleerde ratings, ban-risico checks en statistieken.'
        : 'Filter through verified social, gaming, or gig-economy profiles with transparent ratings, ban risk checks, and metrics.'
    },
    {
      step: '02',
      title: isNl ? 'Beveiligde Escrow & Borg' : 'Secured Escrow Vault',
      desc: isNl
        ? 'Betalingen en borgsommen worden automatisch vergrendeld in de escrow kassa. Pas na succesvolle validatie volgt uitbetaling.'
        : 'Payments and deposits are locked inside the escrow vault. Payouts only release after successful verification.'
    },
    {
      step: '03',
      title: isNl ? 'Direct Actief & 2FA Handoff' : 'Instant Active & 2FA Handoff',
      desc: isNl
        ? 'Krijg binnen seconden veilige toegang met sessie-cookies en live gesynchroniseerde 2FA-codes via onze Handoff Wizard.'
        : 'Get instant access via session cookies and live synced 2FA codes through our automated Handoff Wizard.'
    }
  ];

  const faqs = [
    {
      q: isNl ? 'Wat is het verschil tussen Logs en Rent?' : 'What is the difference between Logs and Rent?',
      a: isNl
        ? 'Onder "Logs" vind je het complete aanbod van geverifieerde accounts voor directe aankoop of inspectie. Onder "Rent" betreed je de live beurs waar je accounts tijdelijk per dag kunt huren of verhuren met dagelijks passief rendement.'
        : 'Under "Logs" you find verified accounts for permanent purchase or inspection. Under "Rent" you access the live exchange to temporarily rent or lease accounts per day with passive yield.'
    },
    {
      q: isNl ? 'Hoe beschermt het Escrow-systeem mijn aankoop of huur?' : 'How does the Escrow system protect my transaction?',
      a: isNl
        ? 'Bij elke transactie of huurperiode wordt het bedrag plus een borgsom vastgezet in onze smart escrow. Pas wanneer de koper/huurder de accountoverdracht via de Handoff Wizard heeft geverifieerd, wordt het geld vrijgegeven.'
        : 'During every transaction or rental, funds and security deposits are held in our smart escrow vault. Funds are only released once account transfer is verified in the Handoff Wizard.'
    },
    {
      q: isNl ? 'Kan ik zelf accounts verhuren en yield verdienen?' : 'Can I list my own accounts and earn daily yield?',
      a: isNl
        ? 'Zeker! Klik op "Noteren" om jouw ongebruikte TikTok, Uber, PlayStation of Facebook accounts aan te bieden. Je ontvangt dagelijks huurinkomsten rechtstreeks in je Handelskassa.'
        : 'Yes! Click "List" to list your accounts. You will earn daily rental income directly into your trading wallet with 100% deposit protection.'
    },
    {
      q: isNl ? 'Wat gebeurt er als de huurder de gegevens wijzigt?' : 'What happens if a renter alters credentials?',
      a: isNl
        ? 'De huurder heeft een borgsom (escrow) gestort. Bij niet-toegestane wijzigingen of contractbreuk keert ons geautomatiseerde Dispuut Centrum de borg direct uit aan de accounteigenaar.'
        : 'The renter has locked a deposit in escrow. Any unauthorized changes trigger our automated Dispute Center to forfeit the deposit to the owner.'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 font-sans pb-12">
      {/* 0. ROLE STATUS HEADER BANNER */}
      {userRole === 'admin' && (
        <div className="bg-gradient-to-r from-emerald-950/60 via-[#0F172A] to-slate-900 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">Platform Beheerdersmodus Actief</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-bold border border-emerald-500/30">
                  ADMIN
                </span>
              </div>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Ingelogd als {currentUser || 'info@logs.rent'} • Volledige beheer-, moderatie- en geschillenbeslechting
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('admin')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Naar Admin Dashboard</span>
            </button>
          </div>
        </div>
      )}

      {userRole === 'trader' && (
        <div className="bg-gradient-to-r from-cyan-950/50 via-[#0F172A] to-slate-900 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">Welkom terug, Handelaar</span>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-1.5 py-0.5 rounded font-bold border border-cyan-500/30">
                  PRO TRADER
                </span>
              </div>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Actieve sessie: {currentUser} • Handelskassa &amp; Escrow Borgsommen actief
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('portfolio')}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Account Centrum</span>
            </button>
            <button
              onClick={onOpenListingModal}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Noteren</span>
            </button>
          </div>
        </div>
      )}

      {userRole === 'visitor' && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-3.5 px-4 sm:px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>
              <strong>Bezoeker Weergave:</strong> Verken publieke marktdata, orderboeken en noteringen.
            </span>
          </div>
          <button
            onClick={onOpenAuthModal}
            className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 text-xs shrink-0"
          >
            <span>Log in om te handelen met escrow borg</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-[#080C14] to-[#080C14] p-6 sm:p-10 lg:p-14 shadow-2xl">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isNl ? 'BETROUWBARE ACCOUNT & LOG MARKTPLAATS' : 'VERIFIED ACCOUNT & LOG EXCHANGE'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              {isNl ? (
                <>
                  Huur &amp; Verhandel <br />
                  <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                    Geverifieerde Logs
                  </span> <br />
                  met Escrow Garantie.
                </>
              ) : (
                <>
                  Rent &amp; Trade <br />
                  <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                    Verified Logs
                  </span> <br />
                  with Escrow Protection.
                </>
              )}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              {isNl
                ? 'Koop geverifieerde accounts in permanent eigendom of huur flexibel per dag. Alle transacties zijn beschermd met een verplichte borgsom in escrow en een gecontroleerde 2FA-overdracht.'
                : 'Acquire verified digital accounts or rent them flexibly per day. All orders are protected with an escrow security deposit and verified 2FA handoff.'}
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 font-mono">
              <button
                onClick={() => onNavigate('logs')}
                className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition flex items-center gap-2.5 shadow-lg shadow-cyan-500/20 group"
              >
                <Store className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>{isNl ? 'Bekijk Logs Catalogus' : 'Browse Logs Catalog'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('rent')}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition flex items-center gap-2.5 shadow-lg shadow-emerald-500/20 group"
              >
                <TrendingUp className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
                <span>{isNl ? 'Open Rent Beurs' : 'Open Rent Exchange'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {userRole === 'visitor' ? (
                <button
                  onClick={onOpenAuthModal}
                  className="px-5 py-3.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-bold text-sm transition flex items-center gap-2 shadow-md shadow-emerald-500/10"
                >
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>{isNl ? 'Start als Handelaar' : 'Join as Trader'}</span>
                </button>
              ) : userRole === 'admin' ? (
                <button
                  onClick={() => onNavigate('admin')}
                  className="px-5 py-3.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 font-bold text-sm transition flex items-center gap-2 shadow-md shadow-emerald-500/10"
                >
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                  <span>Admin Controle</span>
                </button>
              ) : (
                <button
                  onClick={onOpenListingModal}
                  className="px-5 py-3.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>{isNl ? 'Account Noteren' : 'List Asset'}</span>
                </button>
              )}
            </div>

            {/* Quick trust metrics row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 font-mono">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-[11px] text-slate-400 truncate">{s.label}</div>
                  <div className={`text-lg font-bold ${s.color} mt-0.5`}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Interactive Spotlight Card */}
          {heroAccount && (
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-emerald-500/30 bg-[#0F172A]/90 backdrop-blur-xl p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-400">
                      LR
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{heroAccount.platform}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Grade {heroAccount.grade}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">ID #{heroAccount.id}</span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                    <Flame className="w-3.5 h-3.5" />
                    {heroAccount.change24h}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white leading-snug">{heroAccount.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{heroAccount.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#080C14] border border-slate-800 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">{isNl ? 'Vraagprijs Koop' : 'Buy Price'}</span>
                    <span className="text-emerald-400 text-base font-bold">€ {heroAccount.price.toLocaleString('nl-NL')},00</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">{isNl ? 'Daghuur Tarief' : 'Daily Rent'}</span>
                    <span className="text-cyan-400 text-base font-bold">€ {heroAccount.rentPerDay},00 <span className="text-[10px] font-normal text-slate-400">/dag</span></span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">{isNl ? 'Escrow Borg' : 'Escrow Deposit'}</span>
                    <span className="text-slate-300 font-semibold">€ {heroAccount.escrowBorg},00</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">{isNl ? 'Ban Risico' : 'Ban Risk'}</span>
                    <span className="text-emerald-400 font-semibold">{heroAccount.banRiskPercent}% Clean</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                  <button
                    onClick={() => {
                      onSelectAccount(heroAccount);
                      onOpenTradeModal(heroAccount, 'rent');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition text-center shadow-md shadow-emerald-500/20"
                  >
                    {isNl ? 'Huur Dit Account' : 'Rent This Asset'}
                  </button>
                  <button
                    onClick={() => {
                      onSelectAccount(heroAccount);
                      onNavigate('rent');
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition text-center border border-slate-700"
                  >
                    {isNl ? 'Bekijk Orderboek' : 'View Order Book'}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    100% Escrow Protected
                  </span>
                  <span>{heroAccount.followersOrRating}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. DE TWEE PIJLERS: LOGS VS RENT */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>{isNl ? 'TWEE MANIEREN VAN HANDELEN' : 'TWO WAYS TO TRADE'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isNl ? 'Kopen of huren: Logs versus Rent' : 'Buy or Rent: Logs versus Rent'}
          </h2>
          <p className="text-slate-400 text-sm">
            {isNl
              ? 'Onder Logs koop je accounts in permanent eigendom met volledige e-mailtoegang. Onder Rent huur je accounts per dag of verhuur je eigen accounts voor dagelijkse inkomsten.'
              : 'Under Logs you acquire permanent accounts with original email access. Under Rent you lease accounts daily or list your own for regular rental income.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: LOGS */}
          <div
            onClick={() => onNavigate('logs')}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-[#0F172A] to-[#080C14] p-8 shadow-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/10 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Store className="w-7 h-7" />
              </div>
              <span className="inline-flex items-center gap-1 font-mono text-xs text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                <span>{isNl ? 'Naar Logs Catalogus' : 'Explore Logs'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {isNl ? 'Logs: Geverifieerde Accounts & Eigendom' : 'Logs: Verified Accounts & Assets'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {isNl
                  ? 'Blader door honderden geverifieerde accounts voor social media (TikTok, X, Instagram), gaming (PSN, Steam) en flex gig-profielen (Uber). Volledig inclusief Original Email (OGE), schone geschiedenis en zero-ban garanties.'
                  : 'Browse hundreds of verified assets for social media, gaming, and gig profiles. Fully inclusive of Original Email (OGE), clean history, and zero-ban guarantees.'}
              </p>
            </div>

            <ul className="mt-6 space-y-2.5 font-mono text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{isNl ? 'Inclusief Original Email (OGE) en 2FA reset' : 'Includes Original Email (OGE) & 2FA reset'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{isNl ? 'Geverifieerde volgers, ratings en transactiehistorie' : 'Verified followers, ratings, and transaction history'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{isNl ? 'Direct doorzoekbaar met diepgaande filters' : 'Instantly searchable with deep multi-metric filters'}</span>
              </li>
            </ul>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">{isNl ? 'Vanaf € 45,- tot € 5.000,-' : 'From € 45 to € 5,000'}</span>
              <span className="text-cyan-400 font-bold">{isNl ? 'Open Catalogus →' : 'Open Catalog →'}</span>
            </div>
          </div>

          {/* Card 2: RENT */}
          <div
            onClick={() => onNavigate('rent')}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-[#0F172A] to-[#080C14] p-8 shadow-xl transition-all duration-300 hover:border-emerald-400 hover:shadow-emerald-500/10 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7" />
              </div>
              <span className="inline-flex items-center gap-1 font-mono text-xs text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                <span>{isNl ? 'Naar Rent Beurs' : 'Explore Rent'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                {isNl ? 'Rent: Tijdelijk Huren & Dagelijkse Inkomsten' : 'Rent: Daily Leases & Rental Income'}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {isNl
                  ? 'Betreed de beurs om accounts per dag of week te huren voor tijdelijke campagnes, ritten of projecten. Bezit je zelf accounts? Verhuur ze en ontvang dagelijks huurinkomsten met 100% borgbescherming.'
                  : 'Access the exchange to rent accounts per day or week for projects and operations. Own idle accounts? Lease them for steady daily income with escrow protection.'}
              </p>
            </div>

            <ul className="mt-6 space-y-2.5 font-mono text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isNl ? 'Realtime Orderboek (Bids & Asks) en koersgrafieken' : 'Realtime Order Book (Bids & Asks) and live charts'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isNl ? 'Automatische Escrow borgtocht tegen misbruik' : 'Automated Escrow deposit locking against misuse'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isNl ? 'Dagelijkse uitkering van huurrendement (yield)' : 'Daily automated yield distributions to your wallet'}</span>
              </li>
            </ul>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">{isNl ? 'Vanaf € 10,-/dag huur' : 'From € 10/day rental'}</span>
              <span className="text-emerald-400 font-bold">{isNl ? 'Open Beurs →' : 'Open Exchange →'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRENDING OPPORTUNITIES SHOWCASE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 font-mono text-xs mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>{isNl ? 'HOT MARKET PICKS' : 'HOT MARKET PICKS'}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {isNl ? 'Uitgelichte Logs & Rent Kansen' : 'Featured Logs & Rent Opportunities'}
            </h2>
            <p className="text-slate-400 text-sm">
              {isNl ? 'Direct verhandelbaar of te huren op de beurs met actuele marktprijzen.' : 'Directly tradable or rentable on the exchange with live pricing.'}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => onNavigate('logs')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              {isNl ? 'Bekijk alle logs →' : 'View all logs →'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredAccounts.map((account) => (
            <div
              key={account.id}
              className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-400 font-bold text-xs border border-slate-700">
                    {account.platform}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">ID #{account.id}</span>
                    <span
                      className={`text-xs font-bold ${
                        account.isPositiveChange ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {account.change24h}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                    {account.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{account.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-800/80 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase">{isNl ? 'Koop' : 'Buy'}</span>
                    <span className="text-white font-bold">€ {account.price.toLocaleString('nl-NL')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase">{isNl ? 'Huur / Dag' : 'Rent / Day'}</span>
                    <span className="text-emerald-400 font-bold">€ {account.rentPerDay}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{account.followersOrRating}</span>
                  <span className="text-emerald-400">{account.banRiskPercent}% Ban Risk</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-5 font-mono text-xs">
                <button
                  onClick={() => {
                    onSelectAccount(account);
                    onOpenTradeModal(account, 'rent');
                  }}
                  className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition text-center shadow-md shadow-emerald-500/20"
                >
                  {isNl ? 'Huur' : 'Rent'}
                </button>
                <button
                  onClick={() => {
                    onSelectAccount(account);
                    onNavigate('rent');
                  }}
                  className="py-2.5 rounded-xl bg-[#080C14] hover:bg-slate-800 text-slate-300 font-semibold border border-slate-800 transition text-center"
                >
                  {isNl ? 'Orderboek' : 'Orderbook'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOE HET WERKT (3-STAPPEN ESCROW WORKFLOW) */}
      <section className="rounded-3xl border border-slate-800 bg-[#0F172A]/80 p-8 sm:p-12 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 font-mono text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isNl ? 'GEGARANDEERD VEILIG' : 'SECURITY GUARANTEED'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isNl ? 'Hoe werkt de Logs Rent Overdracht?' : 'How Does the Logs Rent Escrow Work?'}
          </h2>
          <p className="text-slate-400 text-sm">
            {isNl
              ? 'Volledige bescherming voor zowel koper, huurder als verkoper via onze geautomatiseerde escrow en handoff protocollen.'
              : 'End-to-end protection for buyer, renter, and seller via automated escrow vaults and handoff wizards.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((st) => (
            <div
              key={st.step}
              className="rounded-2xl border border-slate-800 bg-[#080C14] p-6 space-y-4 relative"
            >
              <div className="font-mono text-3xl font-extrabold text-emerald-500/30">{st.step}</div>
              <h3 className="text-lg font-bold text-white">{st.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
          <button
            onClick={onOpenHandoffModal}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-2"
          >
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>{isNl ? 'Demonstreer Handoff Wizard (Live 2FA)' : 'Demo Handoff Wizard (Live 2FA)'}</span>
          </button>
          <button
            onClick={() => onNavigate('veiligheid')}
            className="px-5 py-3 rounded-xl bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-white transition flex items-center gap-2"
          >
            <span>{isNl ? 'Lees Anonimiteit & OPSEC Gids →' : 'Read OPSEC & Anonymity Guide →'}</span>
          </button>
        </div>
      </section>

      {/* 5. INVESTBOTIQ & VALUATIE SPOTLIGHT DUAL BANNERS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Investbotiq Banner */}
        {/* Automatisering & API Banner */}
        <div className="lg:col-span-7 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-[#0F172A] to-[#080C14] p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs">
              <Bot className="w-3.5 h-3.5" />
              <span>{isNl ? 'VOORRAADBEHEER & API' : 'INVENTORY MANAGEMENT & API'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {isNl ? 'Geautomatiseerd Order- & Voorraadbeheer' : 'Automated Order & Inventory API'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-lg">
              {isNl
                ? 'Beheer je listings op schaal via onze REST API en realtime webhooks. Ontvang direct notificaties bij een nieuwe huurperiode, sessie-controle of borguitkering.'
                : 'Manage your listings at scale via our REST API and realtime webhooks. Get immediate event notifications for rental starts, session checks, and escrow payouts.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <button
              onClick={() => onNavigate('investbotiq')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>{isNl ? 'Open Automatisering' : 'Open Automation'}</span>
            </button>
            <button
              onClick={() => onNavigate('api')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              {isNl ? 'API Documentatie' : 'API Docs'}
            </button>
          </div>
        </div>

        {/* Valuatie Calculator Banner */}
        <div className="lg:col-span-5 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-[#0F172A] to-[#080C14] p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
              <Calculator className="w-3.5 h-3.5" />
              <span>{isNl ? 'WAARDERINGSTOOL' : 'VALUATION TOOL'}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              {isNl ? 'Bereken Jouw Accountwaarde' : 'Calculate Asset Valuation'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {isNl
                ? 'Voer platform, volgers, omzet en accountleeftijd in. Onze waarderingsengine berekent direct een eerlijke verkoopprijs en geschat daghuurtarief.'
                : 'Enter platform, followers, revenue, and age. Our valuation engine calculates a fair market price and estimated daily rent.'}
            </p>
          </div>

          <div className="font-mono text-xs">
            <button
              onClick={() => onNavigate('valuatie')}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition text-center shadow-lg shadow-cyan-500/20"
            >
              {isNl ? 'Start Waarderingscalculator →' : 'Launch Valuation Tool →'}
            </button>
          </div>
        </div>
      </section>

      {/* 6. VEILIGHEID & BESCHERMING */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {isNl ? 'Veiligheid & Bescherming bij elke transactie' : 'Security & Protection on Every Transaction'}
          </h2>
          <p className="text-slate-400 text-sm">
            {isNl
              ? 'Ontworpen voor betrouwbare overdrachten, zonder risico op plotselinge accountblokkades of onbetaalde huur.'
              : 'Designed for dependable account handoffs without unauthorized changes or unpaid rental fees.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h4 className="font-bold text-white text-sm">{isNl ? '100% Escrow Borg' : '100% Escrow Vault'}</h4>
            <p className="text-slate-400 text-[11px] font-sans">
              {isNl ? 'Geen rechtstreekse overmakingen. Alle fondsen blijven in escrow tot geslaagde verificatie.' : 'Zero direct transfers. All funds held securely until verification.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-2.5">
            <Globe className="w-6 h-6 text-cyan-400" />
            <h4 className="font-bold text-white text-sm">{isNl ? 'Anti-Detect Geschikt' : 'Anti-Detect Ready'}</h4>
            <p className="text-slate-400 text-[11px] font-sans">
              {isNl ? 'Compatibel met Dolphin, AdsPower en schone residential proxies zonder sessieverlies.' : 'Compatible with Dolphin, AdsPower, and residential proxies.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-2.5">
            <Clock className="w-6 h-6 text-indigo-400" />
            <h4 className="font-bold text-white text-sm">{isNl ? 'Realtime 2FA Engine' : 'Realtime 2FA Engine'}</h4>
            <p className="text-slate-400 text-[11px] font-sans">
              {isNl ? 'Gesynchroniseerde TOTP handoff met live countdown timers voor veilige sessie-overdracht.' : 'Synchronized TOTP handoff with countdown timers for seamless transfers.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-2.5">
            <Award className="w-6 h-6 text-amber-400" />
            <h4 className="font-bold text-white text-sm">{isNl ? 'Dispuutbehandeling' : 'Dispute Resolution'}</h4>
            <p className="text-slate-400 text-[11px] font-sans">
              {isNl ? 'Automatische server-audits en IP-conflict detectie bij onterechte claims.' : 'Automated server audits and IP conflict detection on dispute claims.'}
            </p>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTIE */}
      <section className="rounded-3xl border border-slate-800 bg-[#0F172A]/60 p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-slate-400 text-sm">
            {isNl ? 'Alles wat je moet weten over handelen en verhuren op logs.rent.' : 'Everything you need to know about trading and renting on logs.rent.'}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-800 bg-[#080C14] overflow-hidden transition"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-sm hover:text-emerald-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-90 text-emerald-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. BOTTOM CALL TO ACTION BANNER */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-[#0F172A] to-cyan-950/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isNl ? 'Klaar om te beginnen op Logs Rent?' : 'Ready to Start on Logs Rent?'}
          </h2>
          <p className="text-slate-300 text-sm">
            {isNl
              ? 'Verken het live aanbod aan logs of stap direct in de verhuurbeurs met orderboeken en escrow-bescherming.'
              : 'Explore the live logs directory or step directly into the rental exchange with order books and escrow security.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
          <button
            onClick={() => onNavigate('logs')}
            className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Store className="w-4 h-4" />
            <span>{isNl ? 'Verken Logs Catalogus' : 'Explore Logs'}</span>
          </button>
          <button
            onClick={() => onNavigate('rent')}
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <TrendingUp className="w-4 h-4" />
            <span>{isNl ? 'Open Rent Beurs & Orderboek' : 'Open Rent Exchange'}</span>
          </button>
        </div>
      </section>
    </div>
  );
}
