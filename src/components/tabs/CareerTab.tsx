import { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  Laptop,
  CheckCircle2,
  DollarSign,
  Search,
  Filter,
  Send,
  ArrowRight,
  ShieldCheck,
  Building,
  GraduationCap,
  Sparkles,
  Users,
  ChevronRight,
  Award,
  Calendar,
  X
} from 'lucide-react';

interface Vacancy {
  id: string; // '01' to '13'
  title: string;
  domain: string;
  category: 'Corporate & Finance' | 'Growth & Marketing' | 'Recruitment & Talent' | 'Sales & Commercial' | 'Strategy & Consulting';
  rewardShort: string;
  location: string;
  experience: string;
  hours: string;
  aboutRole: string;
  tasks: string[];
  profile: string[];
  rewards: string[];
}

export const VACANCIES: Vacancy[] = [
  {
    id: '01',
    title: 'Investor Relations Manager',
    domain: 'Corporate / Pre-IPO',
    category: 'Corporate & Finance',
    rewardShort: 'Salaris + succesfee',
    location: '100% remote (reisbereidheid voor internationale roadshows)',
    experience: '5+ jaar corporate finance, private equity, venture capital of IR',
    hours: '32–40 per week',
    aboutRole:
      'Ter voorbereiding op een internationale beursnotering en meerdere kapitaalrondes zoeken wij een IR Manager. Je bent het vaste aanspreekpunt richting de financiële markt en onderhoudt relaties met institutionele beleggers, family offices en strategische co-investeerders.',
    tasks: [
      'Werven en onboarden van institutionele investeerders en kapitaalverstrekkers',
      'Regisseren van de internationale IR-roadshow en het bookbuilding-proces',
      'Presenteren van groeimodellen, kwartaalcijfers en IFRS-rapportage aan investeringscomités',
      'Schakelen met corporate finance-adviseurs, toezichthouders, juristen en auditors'
    ],
    profile: [
      'HBO/WO in finance, economie of bedrijfskunde, of gelijkwaardige ervaring',
      'Aantoonbaar netwerk binnen institutioneel kapitaal, family offices en private equity',
      'Nederlands en Engels op boardroomniveau',
      'Ervaring met IFRS, kapitaalmarkttransacties en pre-IPO-trajecten'
    ],
    rewards: [
      'Salaris in overleg, afhankelijk van ervaring',
      'Succesfee over elk door jou aangebracht en gecontracteerd investeringsvolume (percentage in overleg)',
      'Volledige secundaire arbeidsvoorwaarden (27 vakantiedagen, hardware in bruikleen, thuiswerkbudget)'
    ]
  },
  {
    id: '02',
    title: 'Campagnemanager (Growth & Crowdfunding)',
    domain: 'Growth & crowdfunding',
    category: 'Growth & Marketing',
    rewardShort: 'Salaris + campagnevergoeding',
    location: '100% remote',
    experience: '3+ jaar growth marketing, B2B of crowdfunding',
    hours: '32–40 per week',
    aboutRole:
      'Je bent verantwoordelijk voor de B2B-wervingscampagnes en co-financieringstrajecten voor nieuwe hardware- en vastgoedprojecten. Je bouwt datagedreven funnels die op Europese schaal converteren.',
    tasks: [
      'Ontwerpen, lanceren en optimaliseren van crowdfunding- en ledenwervingscampagnes',
      'Uitrollen van multi-channel campagnes (LinkedIn, Meta, Google, programmatic, e-mail) voor Europese wervingshubs',
      'Continueren van A/B-tests op landingspagina’s, advertenties en onboarding-flows',
      'Monitoren van campagnedata, acquisitiekosten (CAC) en funnelconversie'
    ],
    profile: [
      'HBO/WO in marketing, communicatie of data-analyse, of gelijkwaardige ervaring',
      'Minimaal 3 jaar ervaring met B2B performance marketing, leadgeneratie of grootschalige crowdfundingcampagnes',
      'Sterk in zowel copywriting als data-analyse',
      'Ondernemend en resultaatgericht'
    ],
    rewards: [
      'Salaris in overleg, afhankelijk van ervaring',
      'Vergoeding per succesvol geactiveerd B2B-lid en per voltooide financieringscampagne',
      'Volledige secundaire arbeidsvoorwaarden'
    ]
  },
  {
    id: '03',
    title: 'Sponsor- & Partnership Manager',
    domain: 'Media, tech, events',
    category: 'Corporate & Finance',
    rewardShort: 'Salaris + dealvergoeding',
    location: '100% remote',
    experience: '3+ jaar B2B-partnerships, media of sponsoring',
    hours: '24–40 per week',
    aboutRole:
      'Je sluit commerciële samenwerkingen, sponsorcontracten en strategische allianties voor de media-, compute- en community-platforms van de groep.',
    tasks: [
      'Binnenhalen van B2B-sponsors, adverteerders en mediapartners voor evenementen, platforms en hubs',
      'Initiëren van samenwerkingen met hardwareleveranciers, vastgoedpartijen en softwarelicentiepartners',
      'Ontwikkelen van sponsorpakketten en joint-venture-voorstellen',
      'Voeren van onderhandelingen van eerste pitch tot getekend contract'
    ],
    profile: [
      'HBO/WO, of vergelijkbare werkervaring',
      'Ervaring in B2B-sales, sponsorwerving, media-exploitatie of strategic partnerships',
      'Commercieel sterk, representatief en zelfsturend'
    ],
    rewards: [
      'Salaris in overleg, afhankelijk van ervaring',
      'Dealvergoeding: percentage van elke gecontracteerde sponsor- of partnership-deal (in overleg)',
      'Volledige secundaire arbeidsvoorwaarden'
    ]
  },
  {
    id: '04',
    title: 'Executive Search Consultant',
    domain: 'Boardroom & C-level',
    category: 'Recruitment & Talent',
    rewardShort: 'Salaris + plaatsingsfee',
    location: '100% remote',
    experience: '5+ jaar executive search of boardroom consulting',
    hours: '32–40 per week',
    aboutRole:
      'Je werft boardroomposities voor de eigen holdings en voor opdrachtgevers van de B2B recruitment-marketplace. Je opereert op strategisch niveau en bent verantwoordelijk voor het vinden en binden van bestuurders en toezichthouders.',
    tasks: [
      'Werven van statutaire directieleden, non-executive directors (RvC) en country managers',
      'Plaatsen van C-level executives (CIO, CTO, Chief AI Officer, VP Engineering) bij externe opdrachtgevers',
      'Begeleiden van het volledige search-, selectie- en benoemingsproces op boardroomniveau'
    ],
    profile: [
      'HBO/WO, of gedegen praktijkervaring',
      'Minimaal 5 jaar ervaring bij een executive search-bureau of als senior headhunter voor C-level posities',
      'Gesprekspartner voor CEO’s, commissarissen en investeringsmaatschappijen',
      'Nederlands en Engels vloeiend'
    ],
    rewards: [
      'Salaris in overleg, afhankelijk van ervaring',
      'Plaatsingsfee per geplaatste executive, gebaseerd op bruto jaarsalaris of contractwaarde (in overleg)',
      'Volledige secundaire arbeidsvoorwaarden'
    ]
  },
  {
    id: '05',
    title: '360° Recruiter (IT & Tech-Detachering)',
    domain: 'IT-detachering',
    category: 'Recruitment & Talent',
    rewardShort: 'Salaris + margedeling',
    location: '100% remote',
    experience: '2+ jaar 360°-recruitment of IT-detachering',
    hours: '24–40 per week',
    aboutRole:
      'Je beheert zowel de klantkant (IT-detacheringsopdrachten) als de kandidatenkant (selectie en plaatsing van internationale specialisten die via de eigen relocatie-tak instromen).',
    tasks: [
      'Binnenhalen van B2B IT-detacheringscontracten en aanvragen',
      'Matchen van vooraf geverifieerde kennismigranten en IT-professionals aan jouw klantportefeuille',
      'Voeren van tariefonderhandelingen, begeleiden van sollicitatiegesprekken en afsluiten van contracten via het recruitment-systeem'
    ],
    profile: [
      'HBO/WO, of vergelijkbare ervaring',
      'Ervaring als 360°-recruiter, accountmanager of consultant in IT-, engineering- of tech-detachering',
      'Commercieel gedreven, proactief en relatiegericht',
      'Ervaring met moderne recruitmentsoftware en matchingtools'
    ],
    rewards: [
      'Salaris in overleg, afhankelijk van ervaring',
      'Margedeling over gerealiseerde detacheringsomzet (in overleg)',
      'Volledige secundaire arbeidsvoorwaarden'
    ]
  },
  {
    id: '06',
    title: 'Tech Headhunter (Global AI & Engineering Talent)',
    domain: 'AI & engineering',
    category: 'Recruitment & Talent',
    rewardShort: 'Salaris + succesfee',
    location: '100% remote',
    experience: 'Aantoonbare ervaring in tech-sourcing of direct search',
    hours: '24–40 per week',
    aboutRole:
      'Je spoort wereldwijd AI-engineers, systeemarchitecten en senior developers op voor externe B2B-klanten en de eigen R&D-, AI- en hardware-afdelingen. Voor geplaatste kandidaten regelt de groep ook visum en huisvesting.',
    tasks: [
      'Actief sourcen via GitHub, LinkedIn Recruiter, StackOverflow en eigen sourcing-tools',
      'Overtuigen van internationaal talent met het totaalpakket: baan, visum, relocatie en huisvesting',
      'Begeleiden van kandidaten door technische assessments tot contractondertekening'
    ],
    profile: [
      'HBO/WO, of vergelijkbare praktijkervaring',
      'Ervaring met het sourcen van schaarse developers en engineers',
      'Bekend met Python, Rust, Kubernetes en LLM-architecturen',
      'Vloeiend Engels, comfortabel met kandidaten in verschillende tijdzones'
    ],
    rewards: [
      'Salaris in overleg, afhankelijk van ervaring',
      'Succesfee per geplaatste en geverifieerde tech-specialist (in overleg)',
      'Volledige secundaire arbeidsvoorwaarden'
    ]
  },
  {
    id: '07',
    title: 'High-Ticket Closer (B2B-Proposities)',
    domain: 'B2B-conversie',
    category: 'Sales & Commercial',
    rewardShort: 'Salaris + commissie',
    location: '100% remote',
    experience: 'Aantoonbaar trackrecord in high-ticket closing',
    hours: '24–40 per week (flexibele agenda)',
    aboutRole:
      'Je voert de eindgesprekken met warme, voorgekwalificeerde zakelijke leads en sluit de deals voor de gecombineerde proposities (compute, digitale infrastructuur, zakelijk vastgoed). Koude acquisitie is geen onderdeel van de functie.',
    tasks: [
      'Voeren van consultatieve videocalls en telefoongesprekken met zakelijke beslissers',
      'Toelichten van de modulaire B2B-pakketten en het rendement van het ecosysteem',
      'Zorgen dat overeenkomsten tijdens of direct na het gesprek digitaal worden ondertekend',
      'Afstemmen met marketing en sales over leadkwaliteit'
    ],
    profile: [
      'HBO/WO, of gelijkwaardige saleservaring',
      'Trackrecord in consultative selling en high-ticket closing (bij voorkeur B2B SaaS, finance, vastgoed of consultancy)',
      'Sterk in actief luisteren, bezwaren behandelen en vertrouwen opbouwen',
      'Resultaatgericht en gedisciplineerd'
    ],
    rewards: [
      'Salaris in overleg, afhankelijk van ervaring',
      'Commissie per gecontracteerde B2B-transactie (percentage in overleg)',
      'Volledige secundaire arbeidsvoorwaarden'
    ]
  },
  {
    id: '08',
    title: 'Commercieel Agent (Compute, Cloud & Corporate Housing)',
    domain: 'Compute & huisvesting',
    category: 'Sales & Commercial',
    rewardShort: 'Salaris + doorlopende courtage',
    location: '100% remote (eigen regio-indeling mogelijk)',
    experience: 'Zelfstandige B2B-sales of agentuurervaring',
    hours: 'Flexibel, 24–40 per week',
    aboutRole:
      'Je vertegenwoordigt de commerciële eindproducten van de operationele clusters in de zakelijke markt: GPU-rekenkracht, zakelijke account-infrastructuur en short-/long-stay huisvesting voor expats en projectteams.',
    tasks: [
      'Verkopen van GPU-servers en digitale infrastructuur aan AI-bedrijven, mediabureaus en tech-ondernemingen',
      'Bemiddelen in B2B-huisvestingscontracten voor bedrijven die internationale specialisten huisvesten',
      'Opbouwen en beheren van een eigen klantenkring met meerjarige afnamecontracten'
    ],
    profile: [
      'HBO/WO, of gedegen commerciële achtergrond',
      'Sterk zakelijk netwerk in tech, media of corporate vastgoed',
      'Zelfstandig, plant eigen agenda, bouwt graag aan terugkerende omzet'
    ],
    rewards: [
      'Salaris in overleg, afhankelijk van ervaring',
      'Provisie per afgesloten B2B-transactie én doorlopende courtage over contractverlengingen van jouw portefeuille (in overleg)',
      'Volledige secundaire arbeidsvoorwaarden'
    ]
  },
  {
    id: '09',
    title: 'B2B Sales Representative (SaaS & Ecosysteem)',
    domain: 'SaaS & ecosysteem',
    category: 'Sales & Commercial',
    rewardShort: 'Salaris + commissie',
    location: '100% remote',
    experience: 'Junior / Medior / Senior',
    hours: '32–40 per week',
    aboutRole:
      'Je vult de commerciële pijplijn: je vertegenwoordigt de B2B SaaS-software (CRM, AI-outreach, workflow-automatisering) en de bredere ecosysteem-proposities, opent deuren bij nieuwe zakelijke klanten en zet contacten om in verkoopkansen en getekende orders.',
    tasks: [
      'Uitvoeren van gepersonaliseerde outbound campagnes via telefoon, videomessaging, e-mail en LinkedIn',
      'Geven van online productdemo’s aan MKB- en enterprise-bedrijven',
      'Kwalificeren van zakelijke partijen en beheren van de eigen salesfunnel in samenwerking met de closers'
    ],
    profile: [
      'HBO/WO, of sterke aantoonbare saleservaring',
      'Communicatief vaardig, bestand tegen afwijzing, energie van nieuwe contacten',
      'Affiniteit met B2B SaaS, AI-tools en moderne salesmethodieken'
    ],
    rewards: [
      'Salaris in overleg, afhankelijk van ervaring',
      'Commissie per gesloten B2B-deal, plus maandelijkse staffelbonus bij behalen van targets (in overleg)',
      'Volledige secundaire arbeidsvoorwaarden'
    ]
  },
  {
    id: '10',
    title: 'Senior Strategy Consultant (AI, Werkkapitaal & M&A)',
    domain: 'AI, werkkapitaal, M&A',
    category: 'Strategy & Consulting',
    rewardShort: 'Salaris + projectfee',
    location: '100% remote',
    experience: '7+ jaar strategy consulting, M&A of enterprise IT',
    hours: '32–40 per week',
    aboutRole:
      'Je adviseert op directie- en C-level over AI-automatisering, werkkapitaaloptimalisatie en het begeleiden van fusies, overnames en integraties binnen het ecosysteem.',
    tasks: [
      'Adviseren van middelgrote en grote ondernemingen over AI-executiemotoren, B2B clearing-API’s en werkstroomautomatisering',
      'Identificeren, beoordelen (due diligence) en begeleiden van acquisities van tech-startups, softwarebedrijven en licentiepartners',
      'Opstellen van business cases op boardroomniveau'
    ],
    profile: [
      'WO-master in business, finance, economie of IT, of gelijkwaardig topniveau door ervaring',
      'Minimaal 7 jaar ervaring als strategy consultant, M&A-adviseur of enterprise transformation manager',
      'Diepgaand financieel inzicht (kasstroommodellen, waarderingen, WCO) en begrip van AI- en cloudarchitecturen'
    ],
    rewards: [
      'Salaris in overleg, afhankelijk van ervaring',
      'Projectfee over de contractwaarde van elk enterprise-implementatietraject of afgeronde M&A-transactie (in overleg)',
      'Volledige secundaire arbeidsvoorwaarden'
    ]
  },
  {
    id: '11',
    title: 'Subsidieconsultant (R&D, AI & Duurzaam Vastgoed)',
    domain: 'R&D, AI, duurzaamheid',
    category: 'Strategy & Consulting',
    rewardShort: 'Salaris + succespercentage',
    location: '100% remote',
    experience: '3+ jaar als subsidieadviseur of grant writer',
    hours: '24–40 per week',
    aboutRole:
      'Binnen het ecosysteem wordt geïnvesteerd in eigen R&D en duurzame fysieke infrastructuur. Je haalt nationale, Britse en Europese innovatiesubsidies, tech-grants en fiscale regelingen binnen.',
    tasks: [
      'In kaart brengen van relevante regelingen (WBSO, MIT, Horizon Europe, UK Innovate, duurzaamheidsfondsen)',
      'Opstellen en indienen van technisch en financieel onderbouwde aanvragen in samenwerking met developers, AI-architecten en vastgoedmanagers',
      'Benutten van fiscale voordelen rond kennismigranten en Europese innovatiehubs',
      'Verzorgen van projectadministratie en eindverantwoording conform UK GAAP en IFRS'
    ],
    profile: [
      'HBO/WO, of vergelijkbare ervaring',
      'Aantoonbare ervaring als subsidieconsultant met sterk slagingspercentage, bij voorkeur op het snijvlak van IT, AI, innovatie en duurzaamheid',
      'Sterk in het vertalen van technische projecten naar beoordelingscriteria'
    ],
    rewards: [
      'Salaris in overleg, afhankelijk van ervaring',
      'Succespercentage over elk daadwerkelijk toegekend subsidiebedrag of gerealiseerd fiscaal voordeel (in overleg)',
      'Volledige secundaire arbeidsvoorwaarden'
    ]
  },
  {
    id: '12',
    title: 'Recruitment Consultant (International Talent & Relocation)',
    domain: 'Internationaal talent',
    category: 'Recruitment & Talent',
    rewardShort: 'Salaris + plaatsingsfee',
    location: '100% remote',
    experience: '1+ jaar recruitment of HR',
    hours: '24–40 per week',
    aboutRole:
      'Je bent verantwoordelijk voor de kandidaatkant: je begeleidt gekwalificeerde kennismigranten door het verificatieproces en matcht hen aan openstaande B2B-vacatures op het platform.',
    tasks: [
      'Voeren van diepte-interviews en begeleiden van kandidaten door screening en verificatie',
      'Matchen van gevalideerde IT-, engineering- en tech-specialisten aan openstaande vacatures via het ATS',
      'Coördineren van de digitale overdracht na plaatsing, zodat zusterentiteiten visum, huisvesting en financiële onboarding in gang zetten'
    ],
    profile: [
      'HBO/WO, of vergelijkbare praktijkervaring',
      'Mensgericht en organisatorisch sterk',
      'Gestructureerd, vaardig met moderne HR-software',
      'Vloeiend Nederlands en Engels'
    ],
    rewards: [
      'Salaris in overleg, afhankelijk van ervaring',
      'Plaatsingsfee per succesvolle, gecontracteerde B2B-plaatsing (in overleg)',
      'Volledige secundaire arbeidsvoorwaarden'
    ]
  },
  {
    id: '13',
    title: 'Corporate Funding Broker (Asset-Backed, Lease & Vastgoed)',
    domain: 'Hardware & vastgoed',
    category: 'Corporate & Finance',
    rewardShort: 'Salaris + bemiddelingsfee',
    location: '100% remote',
    experience: '5+ jaar debt advisory, corporate finance of leasing',
    hours: '24–40 per week',
    aboutRole:
      'Je structureert en bemiddelt zakelijke financieringen voor de uitbreiding van GPU-serverclusters, de vastgoedportefeuille en de interne factoring- en werkkapitaalfaciliteiten.',
    tasks: [
      'Ophalen en structureren van kredietlijnen, equipment lease-constructies en zakelijke vastgoedhypotheken',
      'Bemiddelen bij banken, private debt-fondsen en BaaS/EMI-partners voor factoring- en liquiditeitslijnen',
      'Presenteren van geconsolideerde cijfers (UK GAAP, IFRS) en onderpandstructuren aan kredietcomités'
    ],
    profile: [
      'HBO/WO, of gelijkwaardig vakmanschap',
      'Ervaring als zakelijk financieringsadviseur, debt broker, accountmanager grootzakelijk bij een bank of leasing-specialist',
      'Netwerk van kapitaalverstrekkers, leasemaatschappijen, private debt-fondsen en vastgoedfinanciers'
    ],
    rewards: [
      'Salaris in overleg, afhankelijk van ervaring',
      'Bemiddelingscourtage per afgesloten financieringslijn, hardware-lease of vastgoedhypotheek (in overleg)',
      'Volledige secundaire arbeidsvoorwaarden'
    ]
  }
];

export function CareerTab() {
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [applyVacancy, setApplyVacancy] = useState<Vacancy | null>(null);

  // Sollicitatie modal state
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantLinkedIn, setApplicantLinkedIn] = useState('');
  const [applicantContractType, setApplicantContractType] = useState('vast');
  const [applicantHours, setApplicantHours] = useState('32-40 uur');
  const [applicantMotivation, setApplicantMotivation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    'all',
    'Corporate & Finance',
    'Growth & Marketing',
    'Recruitment & Talent',
    'Sales & Commercial',
    'Strategy & Consulting'
  ];

  const filteredVacancies = VACANCIES.filter((v) => {
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.aboutRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.id.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setApplyVacancy(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setApplicantLinkedIn('');
      setApplicantMotivation('');
    }, 2800);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* 1. HERO HEADER */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="bg-emerald-500/10 text-emerald-400 font-bold px-3 py-1 rounded-lg border border-emerald-500/30 uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Vacatures — Internationale Tech-, AI- &amp; Vastgoedgroep</span>
            </span>
            <span className="bg-cyan-500/10 text-cyan-300 font-bold px-2.5 py-1 rounded-lg border border-cyan-500/20 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>100% Remote</span>
            </span>
            <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>24–40 uur • ZZP/Freelance of Vast</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Bouw mee aan de infrastructuur voor digitale activa, AI-compute en internationaal talent.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Wij groeien snel op het snijvlak van digitale asset liquiditeit, high-performance compute clusters en wereldwijde recruitment.
            Bekijk hieronder onze 13 openstaande posities en solliciteer direct.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
            <a
              href="#vacature-matrix"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span>Bekijk Overzichtsmatrix (13 rollen)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#arbeidsvoorwaarden"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl transition border border-slate-700"
            >
              Arbeidsvoorwaarden
            </a>
          </div>
        </div>

        {/* Ambient subtle glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* 2. ARBEIDSVOORWAARDEN (Geldig voor alle 13 functies) */}
      <section id="arbeidsvoorwaarden" className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Eenduidig &amp; Transparant</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Arbeidsvoorwaarden (gelden voor alle 13 functies)
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-[#080C14] px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
            13 Functies • Gelijke basisrechten
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans text-xs">
          <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <DollarSign className="w-4 h-4" />
              <span>Salaris &amp; Beloning</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              In overleg, op basis van ervaring en dienstverband (vast maandsalaris of freelance tarief).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Calendar className="w-4 h-4" />
              <span>Vakantiedagen</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              27 dagen op fulltime basis, inclusief de optie tot bijkopen of flexibel sparen.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <MapPin className="w-4 h-4" />
              <span>Werkplek &amp; Vrijheid</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              100% remote werken waar je maar wilt, inclusief maandelijkse thuiswerkvergoeding.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Laptop className="w-4 h-4" />
              <span>Hardware &amp; Toestel</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Moderne high-end laptop en smartphone direct in bruikleen geleverd.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Building className="w-4 h-4" />
              <span>Ergonomische Inrichting</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Royale thuiswerkvergoeding voor zit-sta bureau, 4K monitor en ergonomische bureaustoel.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <GraduationCap className="w-4 h-4" />
              <span>Ontwikkeling &amp; Academie</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Toegang tot de interne academie, certificeringstrajecten en opleidingsbudget.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Users className="w-4 h-4" />
              <span>Evenementen &amp; Workation</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Kwartaalborrels, jaarlijkse internationale workation en innovatieve hackathons.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#080C14] border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>Functie-eis</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              HBO- of WO-werk- en denkniveau, of aantoonbare gelijkwaardige praktijkervaring.
            </p>
          </div>
        </div>
      </section>

      {/* 3. OVERZICHTSMATRIX (Interactive Table) */}
      <section id="vacature-matrix" className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <span>Overzichtsmatrix van 13 Openstaande Rollen</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Filter op vakgebied of zoek op trefwoord om de rol te vinden die aansluit bij jouw expertise.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Zoek vacature of domein..."
              className="w-full bg-[#080C14] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-[#080C14] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'Alle Domeinen (13)' : cat}
            </button>
          ))}
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#080C14] text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-bold">ID</th>
                <th className="py-3.5 px-4 font-bold">Functie</th>
                <th className="py-3.5 px-4 font-bold">Domein</th>
                <th className="py-3.5 px-4 font-bold">Beloning</th>
                <th className="py-3.5 px-4 font-bold text-right">Actie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredVacancies.map((v) => (
                <tr
                  key={v.id}
                  className="hover:bg-slate-800/40 transition cursor-pointer group"
                  onClick={() => setSelectedVacancy(v)}
                >
                  <td className="py-3.5 px-4 font-bold text-emerald-400">
                    #{v.id}
                  </td>
                  <td className="py-3.5 px-4 text-white font-bold group-hover:text-cyan-300 transition">
                    {v.title}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/80 text-[11px]">
                      {v.domain}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400">
                    {v.rewardShort}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVacancy(v);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition font-bold text-[11px] inline-flex items-center gap-1"
                    >
                      <span>Details &amp; Solliciteer</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredVacancies.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Geen vacatures gevonden voor "{searchQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. DETAILS GRID (ALL 13 ROLES EXPANDED CARDS) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Alle 13 Functiebeschrijvingen in Detail
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Klik op een vacature voor de volledige functie-eisen, taken en beloningsstructuur.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
            {filteredVacancies.length} posities beschikbaar
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVacancies.map((vac) => (
            <div
              key={vac.id}
              className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      [{vac.id}/13] {vac.domain}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1.5">
                      {vac.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-[#080C14] px-2.5 py-1 rounded-lg border border-slate-800 whitespace-nowrap">
                    {vac.hours}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block">LOCATIE:</span>
                    <span className="text-slate-200">{vac.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">ERVARING:</span>
                    <span className="text-slate-200">{vac.experience}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-1">
                    Over de rol
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {vac.aboutRole}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Kernactiviteiten &amp; Taken
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                    {vac.tasks.slice(0, 3).map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                    {vac.tasks.length > 3 && (
                      <li className="text-[11px] text-cyan-400 font-mono pl-5">
                        + {vac.tasks.length - 3} extra verantwoordelijkheden in detailweergave
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between gap-3">
                <div className="font-mono text-xs">
                  <span className="text-[10px] text-slate-500 block">BELONING:</span>
                  <span className="text-emerald-400 font-bold">{vac.rewardShort}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedVacancy(vac)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition border border-slate-700"
                  >
                    Bekijk Profiel
                  </button>
                  <button
                    onClick={() => setApplyVacancy(vac)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs transition flex items-center gap-1 shadow-md shadow-emerald-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Solliciteer</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HET SOLLICITATIEPROCES */}
      <section className="bg-[#080C14] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-slate-800/80 pb-4">
          <span className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            In 4 Stappen Naar Je Nieuwe Rol
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Het Sollicitatie- &amp; Onboardingproces
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              01
            </span>
            <h4 className="font-bold text-white text-sm">Kennismaking</h4>
            <p className="text-slate-400 text-[11px] font-sans leading-relaxed">
              Stuur je CV en LinkedIn-profiel in met het gewenste vacature-ID (01 t/m 13).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
              02
            </span>
            <h4 className="font-bold text-white text-sm">Gesprek (30 min)</h4>
            <p className="text-slate-400 text-[11px] font-sans leading-relaxed">
              Videogesprek over je trackrecord, beschikbaarheid en de concrete vergoedingsstructuur.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
              03
            </span>
            <h4 className="font-bold text-white text-sm">Contract &amp; Setup</h4>
            <p className="text-slate-400 text-[11px] font-sans leading-relaxed">
              Toegang tot systemen, apparatuurlevering en onboarding in de interne academie.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
              04
            </span>
            <h4 className="font-bold text-white text-sm">Start &amp; Begeleiding</h4>
            <p className="text-slate-400 text-[11px] font-sans leading-relaxed">
              100% remote aan de slag met persoonlijke begeleiding en direct contact met het team.
            </p>
          </div>
        </div>
      </section>

      {/* 6. DETAIL MODAL (WHEN A USER CLICKS 'BEKIJK PROFIEL') */}
      {selectedVacancy && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0F172A] border border-slate-700 w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl relative my-8 font-sans space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedVacancy(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
                VACATURE ID #{selectedVacancy.id} • {selectedVacancy.domain}
              </span>
              <h2 className="text-2xl font-black text-white mt-2">
                {selectedVacancy.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-mono text-slate-400">
                <span>📍 {selectedVacancy.location}</span>
                <span>•</span>
                <span>⏱️ {selectedVacancy.hours}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px] mb-1">
                  Over de rol
                </h4>
                <p className="p-3.5 bg-[#080C14] rounded-xl border border-slate-800">
                  {selectedVacancy.aboutRole}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px] mb-2">
                  Jouw Verantwoordelijkheden &amp; Taken
                </h4>
                <ul className="space-y-2">
                  {selectedVacancy.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2.5 bg-[#080C14] p-2.5 rounded-xl border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px] mb-2">
                  Profiel &amp; Ervaring
                </h4>
                <ul className="space-y-2">
                  {selectedVacancy.profile.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 bg-[#080C14] p-2.5 rounded-xl border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase tracking-wider font-mono text-[11px] mb-2">
                  Beloning &amp; Voorwaarden
                </h4>
                <ul className="space-y-2">
                  {selectedVacancy.rewards.map((rew, i) => (
                    <li key={i} className="flex items-start gap-2.5 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-300">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{rew}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedVacancy(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
              >
                Sluiten
              </button>

              <button
                onClick={() => {
                  setApplyVacancy(selectedVacancy);
                  setSelectedVacancy(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Direct Solliciteren op ID #{selectedVacancy.id}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. SOLLICITATIE FORMULIER MODAL */}
      {applyVacancy && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0F172A] border border-slate-700 w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl relative my-8 font-sans space-y-5">
            <button
              onClick={() => setApplyVacancy(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                SOLLICITATIE ID #{applyVacancy.id}
              </span>
              <h2 className="text-xl font-bold text-white mt-1.5">
                Solliciteer op: {applyVacancy.title}
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                100% Remote • 24–40 uur • ZZP/Freelance of Vast
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3 font-mono">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Sollicitatie Succesvol Ontvangen</h3>
                <p className="text-xs text-slate-300">
                  Bedankt {applicantName}! Onze recruiter neemt binnen 24 uur contact met je op voor het 30-minuten kennismakingsgesprek.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Volledige Naam *</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="bijv. Sophie van Dam"
                    className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">E-mailadres *</label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="naam@domein.nl"
                      className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Telefoonnummer *</label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="+31 6 12345678"
                      className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">LinkedIn-profiel URL of CV Link *</label>
                  <input
                    type="url"
                    required
                    value={applicantLinkedIn}
                    onChange={(e) => setApplicantLinkedIn(e.target.value)}
                    placeholder="https://linkedin.com/in/jouwprofiel"
                    className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Gewenst Dienstverband</label>
                    <select
                      value={applicantContractType}
                      onChange={(e) => setApplicantContractType(e.target.value)}
                      className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="vast">Vast contract</option>
                      <option value="zzp">ZZP / Freelance</option>
                      <option value="beide">In overleg</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Beschikbaarheid</label>
                    <select
                      value={applicantHours}
                      onChange={(e) => setApplicantHours(e.target.value)}
                      className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="24-32">24–32 uur per week</option>
                      <option value="32-40">32–40 uur per week</option>
                      <option value="40+">40 uur (Fulltime)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Korte Toelichting / Trackrecord</label>
                  <textarea
                    rows={3}
                    value={applicantMotivation}
                    onChange={(e) => setApplicantMotivation(e.target.value)}
                    placeholder="Beschrijf beknopt jouw relevante ervaring met betrekking tot deze rol..."
                    className="w-full bg-[#080C14] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 font-sans text-xs"
                  />
                </div>

                <div className="p-3 bg-[#080C14] rounded-xl border border-slate-800 text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-bold block">100% Remote Onboarding:</span>
                  Na verzending ontvang je binnen 24 uur een uitnodiging per e-mail voor het videokennismakingsgesprek.
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setApplyVacancy(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Verstuur Sollicitatie</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
