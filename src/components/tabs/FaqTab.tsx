import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, ShieldCheck, Zap, Wallet, Key, Sparkles } from 'lucide-react';

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export function FaqTab() {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq1': true,
    'faq2': true
  });

  const faqs: FaqItem[] = [
    {
      id: 'faq1',
      category: 'escrow',
      question: 'Hoe beschermt de Logs Rent escrow borgsom mijn aankoop of huurperiode?',
      answer: 'Bij elke transactie reserveert ons platform automatisch een escrow borgsom. Deze borg blijft veilig vergrendeld in een smart contract totdat de huurperiode zonder incidenten is afgerond of de koper de volledige overdracht heeft goedgekeurd. Mocht het account tussentijds geblokkeerd raken, dan keert de escrow desk de volledige borg direct terug naar uw handelskassa.'
    },
    {
      id: 'faq2',
      category: 'veiligheid',
      question: 'Waarom zijn accounts genoteerd met geanonimiseerde identificaties zoals ID #9812?',
      answer: 'Externe platforms zoals TikTok, Uber, Meta en PlayStation monitoren het internet continu op openbare gebruikersnamen die te koop worden aangeboden. Door uitsluitend te werken met willekeurige nummeringen en afgeschermde profielgegevens kunnen automatische detectie bots de listings onmogelijk koppelen aan het daadwerkelijke account. Hierdoor blijft het ban risico nihil.'
    },
    {
      id: 'faq3',
      category: 'huren',
      question: 'Hoe verdien ik passief rendement door mijn accounts te verhuren?',
      answer: 'Wanneer u een goedgekeurd account noteert op de beurs stelt u een dagelijkse huurprijs in. Huurders betalen per dag of per week vooraf inclusief een borgsom. De inkomsten lopen continu op in uw portfolio en kunnen op elk gewenst moment met een druk op de knop worden geclaimd naar uw handelskassa.'
    },
    {
      id: 'faq4',
      category: 'veiligheid',
      question: 'Wat is residentiële proxy pairing en waarom is dit essentieel?',
      answer: 'Wanneer een huurder inlogt vanaf een compleet andere geografische locatie of een verdacht datacenter IP kan het doelplatform alarm slaan. Ons systeem kent automatisch een residentiële proxy toe die matcht met de historische regio van het account, zodat de login als een normale huishoudelijke sessie wordt herkend.'
    },
    {
      id: 'faq5',
      category: 'api',
      question: 'Hoe kan ik geautomatiseerde trading bots koppelen via Investbotiq?',
      answer: 'Binnen de Investbotiq en API tabbladen genereert u met een klik een unieke bearer API sleutel. Vervolgens kunt u via onze WebSocket stream orderboeken uitlezen, geautomatiseerde limietorders plaatsen en geautomatiseerde TOTP handoffs uitvoeren met minder dan twintig milliseconden latentie.'
    },
    {
      id: 'faq6',
      category: 'escrow',
      question: 'Wat gebeurt er als een verkoper het wachtwoord tussentijds wijzigt?',
      answer: 'Ons platform monitort via stealth sessie cookies actief de geldigheid van de credentials. Zodra een sessie ongeldig raakt zonder toestemming van de huurder, wordt de uitbetaling aan de verhuurder onmiddellijk bevroren en wordt de borgsom direct toegekend aan het gedupeerde lid via het Dispuut Centrum.'
    },
    {
      id: 'faq7',
      category: 'wallet',
      question: 'Welke betaalmethoden worden ondersteund in de Handelskassa?',
      answer: 'De handelskassa ondersteunt directe stortingen en opnames via iDEAL, Bancontact, SEPA Europese bankoverschrijving, USDT TRC20 crypto en Bitcoin. Stortingen via iDEAL en cryptovaluta worden binnen enkele seconden automatisch bijgeschreven.'
    },
    {
      id: 'faq8',
      category: 'huren',
      question: 'Wat is het verschil tussen Klasse A, Klasse B en Klasse C noteringen?',
      answer: 'Klasse A accounts zijn ouder dan twee jaar, beschikken over originele e mail toegang en hebben een ban risico van nul procent. Klasse B accounts hebben gedeeltelijke verificatie en een minimale historie. Klasse C noteringen zijn budgetvriendelijke instapaccounts met kortere historie.'
    }
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = faqs.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchQuery =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQuery;
  });

  const categories = [
    { key: 'all', label: 'Alle Onderwerpen' },
    { key: 'escrow', label: 'Escrow en Borgsom' },
    { key: 'veiligheid', label: 'Anonimiteit en Veiligheid' },
    { key: 'huren', label: 'Huren en Rendement' },
    { key: 'api', label: 'Investbotiq en API' },
    { key: 'wallet', label: 'Handelskassa en Saldo' }
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Hero Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-2 font-mono">
          <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-lg border border-emerald-500/30 uppercase font-bold">
            Kennisbank en Veelgestelde Vragen
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Veelgestelde Vragen over de Logs Rent Beurs
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
          Alles wat u moet weten over onze veilige escrow protocollen, geanonimiseerde accountnoteringen, geautomatiseerde daghuur en Investbotiq koppelingen.
        </p>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Zoek in de vragen en antwoorden..."
            className="w-full bg-[#080C14] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-emerald-500 text-xs font-mono"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key)}
              className={`px-3 py-1.5 rounded-xl transition ${
                selectedCategory === c.key
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-[#080C14] text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-[#0F172A] rounded-2xl border border-slate-800 text-slate-400 font-mono text-xs">
            Geen vragen gevonden voor uw zoekopdracht. Probeer een andere term of bekijk alle onderwerpen.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            return (
              <div
                key={faq.id}
                className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-lg transition hover:border-slate-700"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-white text-sm sm:text-base">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-emerald-400" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Help Desk Footer Banner */}
      <div className="bg-[#080C14] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div>
          <h4 className="text-white font-bold text-sm mb-1">
            Staat uw specifieke vraag er niet tussen?
          </h4>
          <p className="text-slate-400 text-xs font-sans">
            Onze gespecialiseerde arbitrage deskmedewerkers staan klaar om al uw vragen persoonlijk te beantwoorden.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">
            desk@logs.rent
          </span>
        </div>
      </div>
    </div>
  );
}
