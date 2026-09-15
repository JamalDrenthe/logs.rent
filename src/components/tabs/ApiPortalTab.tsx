import { useState } from 'react';
import { Code, Terminal, Copy, Check, Play, Globe, Shield, RefreshCw } from 'lucide-react';

export function ApiPortalTab() {
  const [selectedLang, setSelectedLang] = useState<'curl' | 'python' | 'nodejs'>('curl');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const runTestCall = () => {
    setIsTesting(true);
    setTimeout(() => {
      setTestResult(
        JSON.stringify(
          {
            status: 'success',
            server_time: new Date().toISOString(),
            data: {
              account_id: 9812,
              title: 'TikTok Verified Creator 85K',
              grade: 'A',
              market_price: 1450.0,
              daily_rent: 35.0,
              escrow_status: 'ESCROW_LOCKED_SECURE',
              ban_risk_score: 0.0,
              auto_totp_supported: true
            }
          },
          null,
          2
        )
      );
      setIsTesting(false);
    }, 600);
  };

  const curlSnippet = `curl -X GET "https://api.logs.rent/v2/market/accounts?grade=A" \\
  -H "Authorization: Bearer lr_live_9948102948194a8f90123" \\
  -H "Content-Type: application/json"`;

  const pythonSnippet = `import requests

url = "https://api.logs.rent/v2/orders/execute"
headers = {
    "Authorization": "Bearer lr_live_9948102948194a8f90123",
    "Content-Type": "application/json"
}
payload = {
    "account_id": 9812,
    "action": "RENT",
    "duration_days": 7,
    "max_price_per_day": 35.00,
    "auto_2fa_handoff": True
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`;

  const nodeSnippet = `import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.logs.rent/v2',
  headers: { Authorization: 'Bearer lr_live_9948102948194a8f90123' }
});

const executeOrder = async () => {
  const { data } = await client.post('/orders/execute', {
    account_id: 9812,
    action: 'RENT',
    duration_days: 7,
    auto_2fa_handoff: true
  });
  console.log('Order Escrow Confirmed:', data);
};
executeOrder();`;

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-cyan-500/20 text-cyan-400 font-bold text-[10px] px-2 py-0.5 rounded border border-cyan-500/30">
              OpenAPI 3.1 & WSS Specification
            </span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-cyan-400" />
              <span>Investbotiq Developer API Portal</span>
            </h2>
          </div>
          <p className="text-slate-300 font-sans leading-relaxed text-xs">
            Volledige specificatie en interactieve sandbox voor algo trading agents, geautomatiseerd
            orderbeheer, live websocket streams en webhook event hooks.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="bg-[#080C14] border border-slate-800 text-emerald-400 text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Gateway v2.5 Online</span>
          </span>
        </div>
      </div>

      {/* Interactive Code Switcher & Endpoints */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Endpoints List */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Beurs API Endpoints</span>
          </h3>

          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-[#080C14] border border-slate-850 hover:border-slate-700 transition cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[10px]">
                  GET
                </span>
                <code className="text-slate-200">/v2/market/accounts</code>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Haal realtime orderboeken, koersen en A/B/C graderingen op.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#080C14] border border-slate-850 hover:border-slate-700 transition cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[10px]">
                  POST
                </span>
                <code className="text-slate-200">/v2/orders/execute</code>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Plaats geautomatiseerde koop of huurorders met escrow verificatie.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#080C14] border border-slate-850 hover:border-slate-700 transition cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-cyan-500 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[10px]">
                  WSS
                </span>
                <code className="text-slate-200">/v2/stream/orderbook</code>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Realtime WebSocket orderboek updates en transactie feeds.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#080C14] border border-slate-850 hover:border-slate-700 transition cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-purple-500 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">
                  WEBHOOK
                </span>
                <code className="text-slate-200">/v2/webhooks/subscribe</code>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Ontvang push meldingen bij prijsdrops of nieuwe A-Grade listings.
              </p>
            </div>
          </div>
        </div>

        {/* Code Snippets & Playground */}
        <div className="lg:col-span-2 bg-[#0F172A] border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-1.5 bg-[#080C14] p-1 rounded-xl border border-slate-800">
                {(['curl', 'python', 'nodejs'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-3 py-1 rounded-lg transition uppercase text-[11px] font-bold ${
                      selectedLang === lang
                        ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang === 'nodejs' ? 'Node.js' : lang}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  copyCode(
                    selectedLang === 'curl'
                      ? curlSnippet
                      : selectedLang === 'python'
                      ? pythonSnippet
                      : nodeSnippet,
                    'code'
                  )
                }
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 transition flex items-center gap-1.5 text-xs"
              >
                {copied === 'code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied === 'code' ? 'Gekopieerd' : 'Kopieer'}</span>
              </button>
            </div>

            <pre className="p-4 bg-[#080C14] rounded-xl border border-slate-850 text-slate-300 text-[11px] overflow-x-auto leading-relaxed">
              <code>
                {selectedLang === 'curl' && curlSnippet}
                {selectedLang === 'python' && pythonSnippet}
                {selectedLang === 'nodejs' && nodeSnippet}
              </code>
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-xs">Interactieve Endpoint Sandbox:</span>
              <button
                onClick={runTestCall}
                disabled={isTesting}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-500/20 text-xs"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isTesting ? 'Verzoek Uitvoeren...' : 'Test API Call'}</span>
              </button>
            </div>

            {testResult && (
              <div className="bg-[#080C14] p-3 rounded-xl border border-slate-800 text-emerald-400 text-[11px] overflow-x-auto">
                <pre>{testResult}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
