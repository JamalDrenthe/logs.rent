import { useState, useEffect } from 'react';
import { Bot, Play, Pause, Key, Copy, Terminal, ShieldCheck, Zap, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

export function InvestbotiqTab() {
  const [isStreamActive, setIsStreamActive] = useState<boolean>(true);
  const [webhookUrl, setWebhookUrl] = useState<string>('https://api.jouwdomein.nl/webhooks/logs-rent');
  const [notifyOnRental, setNotifyOnRental] = useState<boolean>(true);
  const [notifyOnDispute, setNotifyOnDispute] = useState<boolean>(true);
  const [notifyOnSessionExpired, setNotifyOnSessionExpired] = useState<boolean>(true);
  const [apiKey, setApiKey] = useState<string>('lr_live_9948102948194a8f90123');
  const [copied, setCopied] = useState<boolean>(false);
  const [testSent, setTestSent] = useState<string | null>(null);
  const [logs, setLogs] = useState<Array<{ id: string; time: string; text: string; type: string }>>([
    { id: '1', time: '12:45:01', text: '[GATEWAY] Verbonden met logs.rent event gateway (wss://stream.logs.rent/v2/events)', type: 'system' },
    { id: '2', time: '12:45:04', text: '[ORDER] Nieuw huurcontract gestart voor TikTok Creator #9812 (duur: 7 dagen)', type: 'info' },
    { id: '3', time: '12:45:08', text: '[ESCROW] Borgsom € 250,00 vergrendeld in kassa kluis voor order #9812', type: 'success' },
    { id: '4', time: '12:45:12', text: '[WEBHOOK] Status-notificatie verzonden naar webhook-eindpunt: HTTP 200 OK', type: 'system' },
    { id: '5', time: '12:45:18', text: '[SESSIE] 2FA handoff code geverifieerd via Handoff Wizard voor Account ID #4021', type: 'info' }
  ]);

  useEffect(() => {
    if (!isStreamActive) return;

    const streamLogs = [
      { text: '[CATALOGUS] Nieuwe notering geplaatst: Uber Driver ID #5102 (A-Grade, minimaal ban-risico)', type: 'info' },
      { text: '[SESSIE] Geautomatiseerde cookie-validatie uitgevoerd voor ID #9812: Status Actief', type: 'success' },
      { text: '[HUUR] Daghuur afgerekend voor TikTok Creator #9812: € 35,00 bijgeschreven op kassa', type: 'success' },
      { text: '[ESCROW] Borgsom € 350,00 gereserveerd tot afloop huurcontract', type: 'system' },
      { text: '[HEARTBEAT] WebSocket verbinding stabiel • Latentie 14ms • 0 foutmeldingen', type: 'info' }
    ];

    let counter = 0;
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const nextLog = streamLogs[counter % streamLogs.length];
      setLogs((prev) => [
        ...prev.slice(-18),
        { id: Date.now().toString(), time: now, text: nextLog.text, type: nextLog.type }
      ]);
      counter++;
    }, 4500);

    return () => clearInterval(interval);
  }, [isStreamActive]);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerateKey = () => {
    const newKey = `lr_live_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
    setApiKey(newKey);
  };

  const handleSendTestWebhook = () => {
    const now = new Date().toLocaleTimeString();
    setTestSent('Test payload verzonden naar ' + webhookUrl + ' (HTTP 200 OK)');
    setLogs((prev) => [
      ...prev.slice(-18),
      {
        id: Date.now().toString(),
        time: now,
        text: `[TEST] Webhook test-event afgeleverd aan ${webhookUrl}: HTTP 200 OK (22ms)`,
        type: 'success'
      }
    ]);
    setTimeout(() => setTestSent(null), 3500);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono">
            <span className="bg-emerald-500/10 text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded border border-emerald-500/30 uppercase">
              API &amp; Automatisering
            </span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <Bot className="w-5 h-5 text-emerald-400" />
              <span>Automatisering &amp; Webhook Console</span>
            </h2>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Beheer realtime webhook-notificaties, geautomatiseerde orderverwerking en account-events
            voor al jouw actieve listings en verhuurcontracten op logs.rent.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <div className="flex items-center gap-2 bg-[#080C14] px-3 py-2 rounded-xl border border-slate-800">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isStreamActive ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
              }`}
            />
            <span
              className={`text-xs font-bold ${
                isStreamActive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isStreamActive ? 'Event Stream Live' : 'Gepauzeerd'}
            </span>
          </div>

          <button
            onClick={() => setIsStreamActive(!isStreamActive)}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition flex items-center gap-1.5 shadow-md ${
              isStreamActive
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
            }`}
          >
            {isStreamActive ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pauzeer Stream</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Start Stream</span>
              </>
            )}
          </button>
        </div>
      </div>

      {testSent && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{testSent}</span>
        </div>
      )}

      {/* Grid: Parameters vs Live Terminal Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* Left Col: Webhook & API Configuration */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Webhook &amp; Notificatie Instellingen</span>
          </h3>

          <div>
            <label className="block text-slate-400 mb-1">Webhook Callback URL</label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://jouwdomein.nl/webhooks/logs-rent"
              className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-xs font-mono"
            />
          </div>

          <div className="space-y-2 pt-1">
            <span className="text-slate-400 block text-[11px] font-bold">Actieve Gebeurtenissen (Events)</span>
            
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#080C14] border border-slate-850 cursor-pointer">
              <div>
                <span className="text-slate-200 block font-semibold text-xs">Huurcontract Gestart / Verlengd</span>
                <span className="text-[10px] text-slate-400">Notificatie zodra huurder order afrondt</span>
              </div>
              <input
                type="checkbox"
                checked={notifyOnRental}
                onChange={(e) => setNotifyOnRental(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#080C14] border border-slate-850 cursor-pointer">
              <div>
                <span className="text-slate-200 block font-semibold text-xs">Dispuut Geopend of Afgewikkeld</span>
                <span className="text-[10px] text-slate-400">Directe alert bij geschil of borguitkering</span>
              </div>
              <input
                type="checkbox"
                checked={notifyOnDispute}
                onChange={(e) => setNotifyOnDispute(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#080C14] border border-slate-850 cursor-pointer">
              <div>
                <span className="text-slate-200 block font-semibold text-xs">Sessie-Cookie Ongeldig</span>
                <span className="text-[10px] text-slate-400">Alert wanneer sessietest mislukt</span>
              </div>
              <input
                type="checkbox"
                checked={notifyOnSessionExpired}
                onChange={(e) => setNotifyOnSessionExpired(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </label>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSendTestWebhook}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold transition flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400" />
              <span>Verzend Test Webhook Payload</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-400">API Sleutel (Bearer Token)</label>
              <button
                onClick={regenerateKey}
                className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Nieuwe Sleutel</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="password"
                readOnly
                value={apiKey}
                className="w-full bg-[#080C14] border border-slate-800 rounded-xl px-3 py-2 text-slate-300 font-mono text-xs"
              />
              <button
                onClick={copyKey}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-xl border border-slate-700 transition shrink-0"
                title="Kopieer API Token"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && <span className="text-[10px] text-emerald-400 mt-1 block">✓ Sleutel gekopieerd naar klembord!</span>}
          </div>
        </div>

        {/* Right 2 Cols: Live Streaming Terminal */}
        <div className="lg:col-span-2 bg-[#080C14] border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-400 ms-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>logs-rent-webhook-stream.log</span>
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 animate-pulse font-mono font-bold">
                ● WEBSOCKET LIVE
              </span>
            </div>

            <div className="h-72 overflow-y-auto space-y-1 text-[11px] font-mono pr-2">
              {logs.map((item) => (
                <div
                  key={item.id}
                  className="p-1 rounded hover:bg-slate-900/60 transition flex items-start gap-2"
                >
                  <span className="text-slate-600 shrink-0">[{item.time}]</span>
                  <span
                    className={
                      item.type === 'success'
                        ? 'text-emerald-400 font-bold'
                        : item.type === 'system'
                        ? 'text-cyan-300'
                        : 'text-slate-300'
                    }
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-900 flex flex-wrap justify-between items-center text-[11px] text-slate-500">
            <span>Protocol: WSS Event Stream / REST v2.5</span>
            <span>Gateway: stream.logs.rent • Beveiligd met TLS 1.3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
