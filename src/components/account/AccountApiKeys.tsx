import { useState } from 'react';
import {
  Code,
  Key,
  Copy,
  RotateCcw,
  CheckCircle2,
  Terminal,
  Send,
  Zap,
  Globe,
  Bot
} from 'lucide-react';

export function AccountApiKeys() {
  const [liveKey, setLiveKey] = useState<string>('lr_live_9948102948194a8f90123b782c');
  const [testKey, setTestKey] = useState<string>('lr_test_dev88194881029471c09931a');
  const [webhookUrl, setWebhookUrl] = useState<string>('https://bot.investbotiq.ai/hook');
  const [copyMsg, setCopyMsg] = useState<string | null>(null);
  const [pingSuccess, setPingSuccess] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState<boolean>(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyMsg(`${label} gekopieerd naar klembord!`);
    setTimeout(() => setCopyMsg(null), 2000);
  };

  const handleRotateKey = (isLive: boolean) => {
    const randomHex = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    if (isLive) {
      const newKey = `lr_live_${randomHex}`;
      setLiveKey(newKey);
      handleCopy(newKey, 'Nieuwe Live API Sleutel');
    } else {
      const newKey = `lr_test_${randomHex}`;
      setTestKey(newKey);
      handleCopy(newKey, 'Nieuwe Test API Sleutel');
    }
  };

  const handleTestWebhook = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      setPingSuccess(`HTTP 200 OK ontvangen van ${webhookUrl} (Latentie: 24ms)!`);
      setTimeout(() => setPingSuccess(null), 4000);
    }, 600);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
            <Bot className="w-4 h-4 text-amber-400" />
            <span>INVESTBOTIQ &amp; DEVELOPER API HUB</span>
          </div>
          <h3 className="text-xl font-black text-white">
            API Sleutels, Webhooks &amp; Handelsbot Koppelingen
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">
            Automatiseer accountverhuur, orderboek-arbitrage en TOTP 2FA synchronisatie via onze high-speed REST &amp; WebSocket endpoints.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center gap-1.5">
          <Zap className="w-4 h-4" />
          <span>WebSocket Stream Online (11ms)</span>
        </span>
      </div>

      {copyMsg && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{copyMsg}</span>
        </div>
      )}

      {pingSuccess && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{pingSuccess}</span>
        </div>
      )}

      {/* API Keys Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Production API Key */}
        <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-bold text-white text-sm flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-400" />
              <span>Productie API Sleutel (Live Trading)</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
              LIVE
            </span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed">
            Gebruik deze sleutel voor geautomatiseerde huurcontracten, escrow smart contract bids en TOTP cookie handshakes namens jouw account.
          </p>

          <div className="space-y-2">
            <span className="text-[10px] text-slate-500 uppercase block">API Token</span>
            <div className="flex items-center justify-between bg-[#080C14] border border-slate-800 p-2.5 rounded-xl text-white font-mono text-xs">
              <span className="truncate max-w-[260px] text-emerald-400">{liveKey}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(liveKey, 'Live API Sleutel')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                  title="Kopieer Sleutel"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleRotateKey(true)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition"
                  title="Genereer Nieuwe Sleutel"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Rechten:</span>
            <span className="text-slate-300 font-bold">orders:full • vault:totp • escrow:trade</span>
          </div>
        </div>

        {/* Sandbox Test Key */}
        <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-bold text-white text-sm flex items-center gap-2">
              <Code className="w-4 h-4 text-cyan-400" />
              <span>Sandbox Test Sleutel (Development)</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">
              TESTNET
            </span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed">
            Veilig testen met virtueel saldo en gesimuleerde orderboek-respons zonder echt saldo aan te spreken.
          </p>

          <div className="space-y-2">
            <span className="text-[10px] text-slate-500 uppercase block">Sandbox Token</span>
            <div className="flex items-center justify-between bg-[#080C14] border border-slate-800 p-2.5 rounded-xl text-white font-mono text-xs">
              <span className="truncate max-w-[260px] text-cyan-400">{testKey}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(testKey, 'Sandbox API Sleutel')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                  title="Kopieer Sleutel"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleRotateKey(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition"
                  title="Genereer Nieuwe Sleutel"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Rechten:</span>
            <span className="text-slate-300 font-bold">sandbox:all • simulated:orders</span>
          </div>
        </div>
      </div>

      {/* Webhook Endpoint Configurator */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <span className="font-bold text-white text-sm flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Realtime Webhook Notificaties</span>
          </span>
          <span className="text-slate-400 text-[10px]">POST JSON Payload</span>
        </div>

        <p className="text-slate-400 text-xs leading-relaxed">
          Ontvang directe HTTP POST meldingen op jouw servers wanneer een huurder jouw account huurt, een bod plaatst, een contract bijna verloopt, of een dispuut wordt geopend.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://jouwdomein.nl/api/logs-webhook"
            className="flex-1 bg-[#080C14] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
          />

          <button
            onClick={handleTestWebhook}
            disabled={isPinging}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 shrink-0"
          >
            <Send className={`w-3.5 h-3.5 ${isPinging ? 'animate-ping' : ''}`} />
            <span>{isPinging ? 'Verzenden...' : 'Verstuur Test Ping'}</span>
          </button>
        </div>
      </div>

      {/* Code Snippet */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="font-bold text-white text-xs flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Snelle cURL API Aanroep (Orderboek &amp; TOTP Token)</span>
          </span>
          <button
            onClick={() => handleCopy(`curl -X GET https://api.logs.rent/v2/orders \\
  -H "Authorization: Bearer ${liveKey}" \\
  -H "Accept: application/json"`, 'cURL Snippet')}
            className="text-cyan-400 hover:text-cyan-300 text-[11px] flex items-center gap-1 font-bold"
          >
            <Copy className="w-3 h-3" />
            <span>Kopieer Code</span>
          </button>
        </div>

        <pre className="p-3.5 bg-slate-950 rounded-xl text-slate-300 text-[11px] overflow-x-auto border border-slate-900 leading-relaxed font-mono">
{`curl -X GET https://api.logs.rent/v2/orders \\
  -H "Authorization: Bearer ${liveKey}" \\
  -H "Accept: application/json"`}
        </pre>
      </div>
    </div>
  );
}
