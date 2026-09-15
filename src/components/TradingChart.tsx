import { useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  BarController,
  BarElement,
  Filler,
  Tooltip,
  Legend,
  ChartConfiguration
} from 'chart.js';
import { AccountListing } from '../types';

// Register Chart.js modules
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  BarController,
  BarElement,
  Filler,
  Tooltip,
  Legend
);

interface TradingChartProps {
  account: AccountListing;
  timeframe: '1D' | '1W' | '1M' | '1Y' | 'ALL';
}

export function TradingChart({ account, timeframe }: TradingChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const prices = account.history[timeframe] || account.history['1W'];
    const volumes = account.volumeHistory[timeframe] || account.volumeHistory['1W'];
    const labels = account.labels[timeframe] || account.labels['1W'];

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const maxVolume = Math.max(...volumes);

    const isBullish = account.isPositiveChange;
    const primaryColor = isBullish ? '#10B981' : '#F43F5E';
    const volumeColor = isBullish ? 'rgba(16, 185, 129, 0.35)' : 'rgba(244, 63, 94, 0.35)';

    // Create subtle background gradient for line fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, isBullish ? 'rgba(16, 185, 129, 0.28)' : 'rgba(244, 63, 94, 0.28)');
    gradient.addColorStop(1, 'rgba(8, 12, 20, 0.0)');

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'Beurskoers (€)',
            data: prices,
            borderColor: primaryColor,
            borderWidth: 2.5,
            backgroundColor: gradient,
            fill: true,
            tension: 0.36,
            pointBackgroundColor: primaryColor,
            pointBorderColor: '#080C14',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 7,
            yAxisID: 'y'
          },
          {
            type: 'bar',
            label: 'Handelsvolume',
            data: volumes,
            backgroundColor: volumeColor,
            hoverBackgroundColor: isBullish ? '#10B981' : '#F43F5E',
            borderRadius: 3,
            barPercentage: 0.5,
            yAxisID: 'yVolume'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#0F172A',
            titleColor: '#94A3B8',
            bodyColor: '#F8FAFC',
            borderColor: '#334155',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 10,
            displayColors: true,
            callbacks: {
              label: (context) => {
                if (context.datasetIndex === 0) {
                  return ` Koers: € ${Number(context.raw).toLocaleString('nl-NL')},00`;
                }
                return ` Volume: ${Number(context.raw).toLocaleString('nl-NL')} orders`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: '#1E293B',
              lineWidth: 0.8
            },
            ticks: {
              color: '#64748B',
              font: {
                family: 'JetBrains Mono',
                size: 11
              }
            }
          },
          y: {
            position: 'right',
            min: Math.floor(minPrice * 0.92),
            max: Math.ceil(maxPrice * 1.05),
            grid: {
              color: '#1E293B',
              lineWidth: 0.8
            },
            ticks: {
              color: '#64748B',
              font: {
                family: 'JetBrains Mono',
                size: 11
              },
              callback: (value) => `€ ${value}`
            }
          },
          yVolume: {
            position: 'left',
            min: 0,
            max: maxVolume * 3.5, // Volume occupies bottom ~28% so it stays cleanly beneath the price line
            grid: {
              display: false
            },
            ticks: {
              display: false
            }
          }
        }
      }
    };

    chartInstanceRef.current = new Chart(ctx, config);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [account, timeframe]);

  return (
    <div className="relative w-full h-[320px]">
      <canvas ref={canvasRef} id="tradingChartCanvas" />
      {/* Legend indicator for Volume histogram */}
      <div className="absolute top-2 left-3 flex items-center gap-4 text-[11px] font-mono text-slate-400 pointer-events-none bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
        <span className="flex items-center gap-1.5">
          <span className={`w-2.5 h-0.5 rounded-full ${account.isPositiveChange ? 'bg-emerald-400' : 'bg-rose-500'}`} />
          <span>Koerslijn</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2.5 rounded-sm bg-cyan-400/60" />
          <span>Volume Histogram</span>
        </span>
      </div>
    </div>
  );
}
