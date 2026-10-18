import { useState, FormEvent } from 'react';
import { UserProfile } from '../../types';
import {
  User,
  Building,
  Globe,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';

interface AccountProfileProps {
  userProfile?: UserProfile;
  onUpdateUserProfile?: (profile: UserProfile) => void;
}

export function AccountProfile({
  userProfile,
  onUpdateUserProfile
}: AccountProfileProps) {
  const [profileForm, setProfileForm] = useState<UserProfile>(() => userProfile || {
    fullName: 'Jamal Drenthe',
    email: 'info@logs.rent',
    phone: '+31 6 12345678',
    iban: 'NL91 ABNA 0417 8923 11',
    bic: 'ABNANL2A',
    accountHolder: 'J.S. Drenthe',
    bankName: 'ABN AMRO Bank N.V.',
    companyName: 'Logs Rent Trading B.V.',
    kvkNumber: '89123456',
    vatNumber: 'NL891234567B01',
    addressStreet: 'Keizersgracht 421',
    addressCity: 'Amsterdam',
    addressPostalCode: '1016 EK',
    country: 'Nederland',
    isVerified: true,
    verificationLevel: 2,
    lastUpdated: '12 Okt 2026'
  });

  const [validationMsg, setValidationMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationMsg(null);
    setSuccessMsg(null);

    if (!profileForm.fullName.trim()) {
      setValidationMsg('Volledige naam is verplicht.');
      return;
    }
    if (!profileForm.email.trim()) {
      setValidationMsg('E-mailadres is verplicht.');
      return;
    }

    const updated: UserProfile = {
      ...profileForm,
      isVerified: true,
      lastUpdated: 'Zojuist'
    };

    onUpdateUserProfile?.(updated);
    setSuccessMsg('Accountgegevens en KYC-profiel succesvol opgeslagen en geverifieerd!');
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>IDENTITEIT &amp; KYC VERIFICATIE HUB</span>
          </div>
          <h3 className="text-xl font-black text-white">
            Persoonlijke Gegevens, Woonadres &amp; Verificatieniveau
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">
            Zorg dat je gegevens kloppen voor officiële transactiebewijzen, SEPA-uitbetalingen en escrow claims.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>Level {profileForm.verificationLevel || 2} KYC Geverifieerd</span>
          </span>
        </div>
      </div>

      {successMsg && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {validationMsg && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{validationMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Personal Details */}
        <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <span className="text-white font-bold text-xs flex items-center gap-2 pb-3 border-b border-slate-800">
            <User className="w-4 h-4 text-cyan-400" />
            <span>1. Persoonlijke Identificatie</span>
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Volledige Naam *</label>
              <input
                type="text"
                value={profileForm.fullName}
                onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                placeholder="bijv. Jamal Drenthe"
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">E-mailadres (Gekoppeld aan OAuth) *</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                placeholder="info@logs.rent"
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Telefoonnummer (SMS/2FA) *</label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                placeholder="+31 6 12345678"
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Business & Registration Details */}
        <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <span className="text-white font-bold text-xs flex items-center gap-2 pb-3 border-b border-slate-800">
            <Building className="w-4 h-4 text-emerald-400" />
            <span>2. Onderneming &amp; Zakelijke Registratie (Optioneel voor B.V. / Eenmanszaken)</span>
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Bedrijfsnaam</label>
              <input
                type="text"
                value={profileForm.companyName || ''}
                onChange={(e) => setProfileForm({ ...profileForm, companyName: e.target.value })}
                placeholder="Logs Rent Trading B.V."
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">KvK Nummer (Handelsregister)</label>
              <input
                type="text"
                value={profileForm.kvkNumber || ''}
                onChange={(e) => setProfileForm({ ...profileForm, kvkNumber: e.target.value })}
                placeholder="89123456"
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Btw-identificatienummer</label>
              <input
                type="text"
                value={profileForm.vatNumber || ''}
                onChange={(e) => setProfileForm({ ...profileForm, vatNumber: e.target.value })}
                placeholder="NL891234567B01"
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Residential / Company Address */}
        <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <span className="text-white font-bold text-xs flex items-center gap-2 pb-3 border-b border-slate-800">
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>3. Woon- &amp; Vestigingsadres</span>
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[11px] text-slate-400 mb-1">Straat en Huisnummer</label>
              <input
                type="text"
                value={profileForm.addressStreet}
                onChange={(e) => setProfileForm({ ...profileForm, addressStreet: e.target.value })}
                placeholder="Keizersgracht 421"
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Postcode</label>
              <input
                type="text"
                value={profileForm.addressPostalCode}
                onChange={(e) => setProfileForm({ ...profileForm, addressPostalCode: e.target.value })}
                placeholder="1016 EK"
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white uppercase focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Woonplaats</label>
              <input
                type="text"
                value={profileForm.addressCity}
                onChange={(e) => setProfileForm({ ...profileForm, addressCity: e.target.value })}
                placeholder="Amsterdam"
                className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Section 4: KYC Levels Matrix */}
        <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <span className="text-white font-bold text-xs flex items-center gap-2 pb-3 border-b border-slate-800">
            <Award className="w-4 h-4 text-amber-400" />
            <span>4. KYC Verificatieniveaus &amp; Handelslimieten</span>
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#080C14] border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">Level 1: Basis</span>
                <span className="text-emerald-400 text-[10px] font-bold">VOLTOOID</span>
              </div>
              <p className="text-[11px] text-slate-400">
                E-mail &amp; SMS verificatie. Geschikt voor transacties tot € 1.000,00 per dag.
              </p>
            </div>

            <div className="p-4 bg-[#080C14] border border-emerald-500/40 rounded-xl space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">Level 2: Handelaar</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  ACTIEF NIVEAU
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Geverifieerde SEPA IBAN bankrekening en woonadres. Handelslimiet: € 25.000,00 per dag.
              </p>
            </div>

            <div className="p-4 bg-[#080C14] border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">Level 3: Zakelijk / Pro</span>
                <span className="text-slate-500 text-[10px] font-bold">GEVERIFIEERD</span>
              </div>
              <p className="text-[11px] text-slate-400">
                KvK-verificatie en volledige API-toegang. Hoge orderlimieten voor zakelijke handelaren.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition shadow-lg shadow-emerald-500/20 text-xs flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mijn Gegevens &amp; KYC Profiel Opslaan</span>
          </button>
        </div>
      </form>
    </div>
  );
}
