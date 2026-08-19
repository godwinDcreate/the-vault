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
  BookOpen
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
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 shadow-md">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-4xl truncate">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-400">Live Inventory Radar:</span>
          <span className="text-slate-300">
            Monitoring <strong className="text-white">{storesCount} Retail Stores</strong> across a 100-mile radius around <strong className="text-amber-300">Cedar Falls & Waterloo, IA</strong> (50613)
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs font-mono">
          <span className="text-slate-400">
            Active Flips: <strong className="text-white">{dealsCount}</strong>
          </span>
          <span className="text-slate-400">
            Avg Net ROI: <strong className="text-emerald-400">+{avgProfitMargin}%</strong>
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setActiveTab('deals')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-bold">
                <Radar className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-white tracking-tight">
                    Iowa<span className="text-amber-400">Arbitrage</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    50%+ ROI
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400 inline" />
                  Cedar Falls Hub • 100mi Radius
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <button
              id="nav-tab-deals"
              onClick={() => setActiveTab('deals')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'deals'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BadgePercent className="w-3.5 h-3.5" />
              <span>50%+ Deals Grid</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                activeTab === 'deals' ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-amber-300'
              }`}>
                {dealsCount}
              </span>
            </button>

            <button
              id="nav-tab-scanner"
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'scanner'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI SKU Valuation</span>
            </button>

            <button
              id="nav-tab-stores"
              onClick={() => setActiveTab('stores')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'stores'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <StoreIcon className="w-3.5 h-3.5" />
              <span>102 Store Registry</span>
            </button>

            <button
              id="nav-tab-penny"
              onClick={() => setActiveTab('penny_hud')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'penny_hud'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Coins className="w-3.5 h-3.5 text-amber-300" />
              <span>Penny Code & Ghost Radar</span>
            </button>

            <button
              id="nav-tab-route"
              onClick={() => setActiveTab('route_planner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'route_planner'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Trip Optimizer</span>
            </button>

            <button
              id="nav-tab-portfolio"
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>My Flip Tracker</span>
            </button>

            <button
              id="nav-tab-manual"
              onClick={() => setActiveTab('manual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'manual'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>User Manual (PDF)</span>
            </button>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-2.5">
            <button
              id="btn-live-sku-scan"
              onClick={onOpenLiveScan}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span className="hidden sm:inline">Evaluate Any SKU / Item</span>
              <span className="sm:hidden">Scan SKU</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Tab Scrollbar */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 bg-slate-950 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('deals')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'deals' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 bg-slate-900'
          }`}
        >
          Deals ({dealsCount})
        </button>
        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'scanner' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 bg-slate-900'
          }`}
        >
          AI SKU Analyzer
        </button>
        <button
          onClick={() => setActiveTab('stores')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'stores' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 bg-slate-900'
          }`}
        >
          102 Stores
        </button>
        <button
          onClick={() => setActiveTab('penny_hud')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'penny_hud' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 bg-slate-900'
          }`}
        >
          Penny Guide & Truth
        </button>
        <button
          onClick={() => setActiveTab('route_planner')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'route_planner' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 bg-slate-900'
          }`}
        >
          Trip Optimizer
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'portfolio' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 bg-slate-900'
          }`}
        >
          Flip Tracker
        </button>
        <button
          onClick={() => setActiveTab('manual')}
          className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
            activeTab === 'manual' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 bg-slate-900'
          }`}
        >
          User Manual (PDF)
        </button>
      </div>
    </header>
  );
};
