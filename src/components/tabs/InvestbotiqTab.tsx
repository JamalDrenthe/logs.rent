import { useState, useEffect } from 'react';
import { Bot, Play, Pause, Key, Copy, Terminal, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

export function InvestbotiqTab() {
  const [isBotActive, setIsBotActive] = useState<boolean>(true);
  const [maxBid, setMaxBid] = useState<number>(2500);
  const [minGrade, setMinGrade] = useState<'A' | 'B' | 'C'>('A');
  const [auto2FA, setAuto2FA] = useState<boolean>(true);
  const [apiKey, setApiKey] = useState<string>('lr_live_9948102948194a8f90123');
  const [copied, setCopied] = useState<boolean>(false);
  const [logs, setLogs] = useState<Array<{ id: string; time: string; text: string; type: string }>>([
    { id: '1', time: '12:45:01', text: '[WEBSOCKET] Connected to wss://stream.logs.rent/v2/orders (12ms latency)', type: 'system' },
    { id: '2', time: '12:45:04', text: '[ARBITRAGE] Match found for TikTok #9812 yield +12.4% > target 10%', type: 'info' },
    { id: '3', time: '12:45:08', text: '[EXECUTION] Auto-bid placed € 1.435,00 via Escrow Smart Contract', type: 'success' },
    { id: '4', time: '12:45:12', text: '[WEBHOOK] Notified subscriber endpoint https://bot.investbotiq.ai/hook', type: 'system' },
    { id: '5', time: '12:45:18', text: '[TOTP] Session handshake token retrieved for Account ID #4021', type: 'info' }
  ]);

  useEffect(() => {
    if (!isBotActive) return;

    const streamLogs = [
      { text: '[ORDERBOOK] New ask order € 1.450 for ID #9812 inserted into queue', type: 'info' },
      { text: '[BOT AGENT] Verified 0% ban risk compliance for A-Grade Uber Profile #4021', type: 'success' },
      { text: '[AUTO RENT] Executed 7-day rental contract € 35/dag with automated 2FA handoff', type: 'success' },
      { text: '[ESCROW] Locked € 350 borgsom in smart vault until 22 Sep 2026', type: 'system' },
      { text: '[HEARTBEAT] Ping 11ms • 4 active bot sub-agents running smoothly', type: 'info' }
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
    }, 3800);

    return () => clearInterval(interval);
  }, [isBotActive]);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerateKey = () => {
    const newKey = `lr_live_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
    setApiKey(newKey);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] via-slate-900 to-amber-950/30 border border-amber-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono">
            <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded uppercase">
              Official Integration
            </span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
              <Bot className="w-5 h-5 text-amber-400" />
              <span>Investbotiq Automated Trading Hub</span>
            </h2>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Laat geautomatiseerde trading bots en AI agents namens jou accounts verhuren, opbieden
            en exploiteren via onze realtime WebSocket en REST API interfaces.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <div className="flex items-center gap-2 bg-[#080C14] px-3 py-2 rounded-xl border border-slate-800">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isBotActive ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
              }`}
            />
            <span
              className={`text-xs font-bold ${
                isBotActive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isBotActive ? 'Agent Online' : 'Gepauzeerd'}
            </span>
          </div>

          <button
            onClick={() => setIsBotActive(!isBotActive)}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition flex items-center gap-1.5 shadow-md ${
              isBotActive
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
            }`}
          >
            {isBotActive ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pauzeer Agent</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Start Agent</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid: Parameters vs Live Terminal Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        {/* Left Col: Bot Strategy Configuration */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Bot Strategie Parameters</span>
          </h3>

          <div>
            <label className="block text-slate-400 mb-1">Max Vraagprijs per Account (€)</label>
            <input
              type="number"
              value={maxBid}
              onChange={(e) => setMaxBid(Number(e.target.value))}
              className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Minimale Risico Gradering</label>
            <select
              value={minGrade}
              onChange={(e) => setMinGrade(e.target.value as any)}
              className="w-full bg-[#080C14] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            >
              <option value="A">Alleen A-Grade (0% Ban Risico)</option>
              <option value="B">A-Grade & B-Grade (Gebalanceerd)</option>
              <option value="C">Alle Grades (Maximale Arbitrage)</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#080C14] border border-slate-850">
            <div>
              <span className="text-slate-200 block font-bold">Auto 2FA Handoff</span>
              <span className="text-[10px] text-slate-400">Automatische TOTP exchange</span>
            </div>
            <input
              type="checkbox"
              checked={auto2FA}
              onChange={(e) => setAuto2FA(e.target.checked)}
              className="w-4 h-4 accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-400">Investbotiq API Sleutel</label>
              <button
                onClick={regenerateKey}
                className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
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
            {copied && <span className="text-[10px] text-emerald-400 mt-1 block">✓ Gekopieerd!</span>}
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
                  <span>investbotiq-daemon-v2.5.log</span>
                </span>
              </div>
              <span className="text-[10px] text-amber-400 animate-pulse font-mono font-bold">
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
            <span>Protocol: REST v2.5 / WSS Secure</span>
            <span>Latency: 11ms • 100% Uptime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
