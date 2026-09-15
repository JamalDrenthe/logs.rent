import { ShieldCheck, TrendingUp, Users, Cpu, Lock, CheckCircle2, Award, Zap } from 'lucide-react';

export function OverOnsTab() {
  const pillars = [
    {
      title: 'Geanonimiseerde Asset Notatie',
      desc: 'Elk account wordt verhandeld onder een neutrale ID code zoals ID #9812. Publieke gebruikersnamen en e mails blijven afgeschermd zodat moderatie bots van externe platformen geen sancties kunnen opleggen.',
      icon: Lock
    },
    {
      title: '100% Escrow Borgsom Garantie',
      desc: 'Zowel koper als verkoper zijn beschermd door geautomatiseerde escrow contracten. De borgsom wordt pas vrijgegeven wanneer de sessie en inlogverificatie vlekkeloos zijn gevalideerd.',
      icon: ShieldCheck
    },
    {
      title: 'Transparante Beurswaardering',
      desc: 'Onze realtime orderboeken en historische prijsgrafieken zorgen voor een eerlijke marktwerking. Vraag en aanbod bepalen de exacte daghuur en koopprijzen zonder verborgen opslagen.',
      icon: TrendingUp
    },
    {
      title: 'Investbotiq Automatiserings Hub',
      desc: 'Met onze officiële API en WebSocket interfaces kunnen geautomatiseerde trading agents 24 uur per dag accounts huren, arbitreren en direct renderen met minimale latentie.',
      icon: Cpu
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Oprichting Logs Rent Beurs',
      text: 'Lancering van de allereerste geautomatiseerde escrow beurs voor digitale profielen en sociale activa met gegarandeerde borgstelling.'
    },
    {
      year: '2024',
      title: 'Introductie Residentiële Proxy Pairing',
      text: 'Ontwikkeling van onze gepatenteerde IP matching technologie waardoor externe netwerken geen verdachte login sprongen waarnemen.'
    },
    {
      year: '2025',
      title: 'Investbotiq Algoritmische Integratie',
      text: 'Koppeling met geavanceerde handelsbots en API protocollen voor high frequency accountverhuur en geautomatiseerde TOTP verificaties.'
    },
    {
      year: '2026',
      title: 'Volledige Decentrale Arbitrage',
      text: 'Meer dan 3.400 geverifieerde accounts actief verhandeld met een 99.8% geschilvrije transactiehistorie binnen de Europese markt.'
    }
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Hero Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-mono px-2.5 py-1 rounded-lg border border-emerald-500/30 uppercase font-bold">
              Over logs.rent
            </span>
            <span className="text-xs font-mono text-slate-400">
              De Referentie in Digitale Reputatie Handel
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            De eerste professionele beurs voor geanonimiseerde accounts, flex profielen en digitale activa
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            logs.rent is opgericht met een heldere missie: het professionaliseren, beveiligen en liquide maken van digitale accounts. Waar traditionele fora en schimmige chatgroepen kopers blootstellen aan oplichting en plotselinge bans, biedt logs.rent een gereguleerd ecosysteem met realtime orderboeken, verplichte escrow borgsommen en geavanceerde stealth sessie overdrachten.
          </p>
        </div>
      </div>

      {/* Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-slate-700 transition space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {p.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Statistics Section */}
      <div className="bg-[#080C14] border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-6 pb-3 border-b border-slate-800 flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>Kerncijfers en Betrouwbaarheid</span>
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          <div className="p-4 bg-[#0F172A] rounded-xl border border-slate-850">
            <span className="text-xs text-slate-400 block mb-1">Actieve Noteringen</span>
            <span className="text-2xl font-black text-white">3.492</span>
            <span className="text-[11px] text-emerald-400 block mt-1 font-bold">100% Geverifieerd</span>
          </div>

          <div className="p-4 bg-[#0F172A] rounded-xl border border-slate-850">
            <span className="text-xs text-slate-400 block mb-1">Vastgezet Escrow Saldo</span>
            <span className="text-2xl font-black text-emerald-400">€ 128.450</span>
            <span className="text-[11px] text-slate-400 block mt-1">Actieve Borgstellingen</span>
          </div>

          <div className="p-4 bg-[#0F172A] rounded-xl border border-slate-850">
            <span className="text-xs text-slate-400 block mb-1">Succesvolle Handoffs</span>
            <span className="text-2xl font-black text-cyan-400">99.8%</span>
            <span className="text-[11px] text-slate-400 block mt-1">Nul Valse Bans</span>
          </div>

          <div className="p-4 bg-[#0F172A] rounded-xl border border-slate-850">
            <span className="text-xs text-slate-400 block mb-1">Gemiddelde Handoff Tijd</span>
            <span className="text-2xl font-black text-amber-400">12 Sec</span>
            <span className="text-[11px] text-slate-400 block mt-1">TOTP en Cookie Injectie</span>
          </div>
        </div>
      </div>

      {/* History Timeline */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white font-mono mb-6 pb-3 border-b border-slate-800 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>Evolutie van de Logs Rent Beurs</span>
        </h3>

        <div className="space-y-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="font-mono text-sm font-bold text-emerald-400 bg-[#080C14] border border-slate-800 px-3 py-1 rounded-xl shrink-0">
                {m.year}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-mono">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
