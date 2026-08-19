import React from 'react';
import { 
  Radar, 
  Sparkles, 
  Store as StoreIcon, 
  Coins, 
  Navigation, 
  BadgePercent,
  Search,
  Zap,
  MapPin,
  TrendingUp,
  PackageCheck,
  BookOpen,
  Activity,
  Layers
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'deals' | 'scanner' | 'stores' | 'penny_hud' | 'route_planner' | 'portfolio' | 'manual';
  setActiveTab: (tab: 'deals' | 'scanner' | 'stores' | 'penny_hud' | 'route_planner' | 'portfolio' | 'manual') => void;
  onOpenLiveScan: () => void;
  dealsCount: number;
  storesCount: number;
  avgProfitMargin: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenLiveScan,
  dealsCount,
  storesCount,
  avgProfitMargin,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b0f19]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      {/* Top Telemetry & Status Bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/5 to-amber-500/10 border-b border-slate-800/60 px-4 sm:px-8 py-1.5 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2.5 max-w-4xl truncate">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            <span>LIVE INVENTORY RADAR</span>
          </div>
          <span className="hidden sm:inline text-slate-300 text-xs">
            Tracking <strong className="text-white font-semibold">{storesCount} Stores</strong> in 100mi radius • Hub: <strong className="text-amber-400 font-semibold">Cedar Falls & Waterloo, IA</strong>
          </span>
          <span className="sm:hidden text-slate-300 text-xs">
            100mi Cedar Falls Radius ({storesCount} Stores)
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <span className="text-slate-500">Verified Deals:</span>
            <span className="font-bold text-white px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">{dealsCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 hidden sm:inline">Avg Net Margin:</span>
            <span className="font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
              +{avgProfitMargin}% ROI
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('deals')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black ring-1 ring-amber-300/30 group-hover:scale-105 transition-transform duration-300">
                <Radar className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight font-display">
                  Iowa<span className="text-amber-400">Arbitrage</span>
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400/10 text-amber-300 border border-amber-400/30 tracking-wider">
                  50%+ ROI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400 inline" />
                <span>Cedar Falls, IA • 100-Mile Radius</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#07090e]/80 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
            <button
              id="nav-tab-deals"
              onClick={() => setActiveTab('deals')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'deals'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BadgePercent className="w-3.5 h-3.5" />
              <span>50%+ Deals</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                activeTab === 'deals' ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-amber-300'
              }`}>
                {dealsCount}
              </span>
            </button>

            <button
              id="nav-tab-scanner"
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'scanner'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI SKU Valuation</span>
            </button>

            <button
              id="nav-tab-stores"
              onClick={() => setActiveTab('stores')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'stores'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <StoreIcon className="w-3.5 h-3.5" />
              <span>102 Stores</span>
            </button>

            <button
              id="nav-tab-penny"
              onClick={() => setActiveTab('penny_hud')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'penny_hud'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Penny & Clearance HUD</span>
            </button>

            <button
              id="nav-tab-route"
              onClick={() => setActiveTab('route_planner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'route_planner'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Trip Optimizer</span>
            </button>

            <button
              id="nav-tab-portfolio"
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'portfolio'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Flip Tracker</span>
            </button>

            <button
              id="nav-tab-manual"
              onClick={() => setActiveTab('manual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'manual'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Manual & PDF</span>
            </button>
          </nav>

          {/* Quick Action Button */}
          <div className="flex items-center gap-3">
            <button
              id="btn-live-sku-scan"
              onClick={onOpenLiveScan}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden sm:inline">Evaluate Any SKU / Item</span>
              <span className="sm:hidden">Scan SKU</span>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Nav Scroll for Medium & Small Screens */}
      <div className="xl:hidden flex items-center gap-1.5 px-4 py-2 bg-[#080b11] border-t border-slate-800/80 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('deals')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'deals' ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'text-slate-300 bg-slate-900 border border-slate-800'
          }`}
        >
          Deals Grid ({dealsCount})
        </button>
        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'scanner' ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'text-slate-300 bg-slate-900 border border-slate-800'
          }`}
        >
          AI SKU Analyzer
        </button>
        <button
          onClick={() => setActiveTab('stores')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'stores' ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'text-slate-300 bg-slate-900 border border-slate-800'
          }`}
        >
          102 Stores
        </button>
        <button
          onClick={() => setActiveTab('penny_hud')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'penny_hud' ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'text-slate-300 bg-slate-900 border border-slate-800'
          }`}
        >
          Penny & Clearance HUD
        </button>
        <button
          onClick={() => setActiveTab('route_planner')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'route_planner' ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'text-slate-300 bg-slate-900 border border-slate-800'
          }`}
        >
          Trip Optimizer
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'portfolio' ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'text-slate-300 bg-slate-900 border border-slate-800'
          }`}
        >
          Flip Tracker
        </button>
        <button
          onClick={() => setActiveTab('manual')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'manual' ? 'bg-amber-400 text-slate-950 font-bold shadow-sm' : 'text-slate-300 bg-slate-900 border border-slate-800'
          }`}
        >
          Manual (PDF)
        </button>
      </div>
    </header>
  );
};
