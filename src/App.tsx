import React, { useState, useMemo } from 'react';
import { 
  Radar, 
  Sparkles, 
  Filter, 
  Search, 
  TrendingUp, 
  BadgePercent, 
  MapPin, 
  Coins, 
  ShoppingBag, 
  CheckCircle2, 
  Zap, 
  Flame, 
  RotateCcw,
  Layers,
  HelpCircle,
  PackageCheck,
  ArrowUpDown,
  DollarSign,
  Car,
  Clock,
  Compass
} from 'lucide-react';
import { FEATURED_DEALS } from './data/deals';
import { IOWA_STORES } from './data/stores';
import { DealItem, ArbitrageCategory } from './types';
import { Navbar } from './components/Navbar';
import { ShowcaseHeroItem } from './components/ShowcaseHeroItem';
import { DealCard } from './components/DealCard';
import { SkuAnalyzerModal } from './components/SkuAnalyzerModal';
import { StoreDirectory } from './components/StoreDirectory';
import { PennyItemHUD } from './components/PennyItemHUD';
import { TripOptimizerModal } from './components/TripOptimizerModal';
import { ListingModal } from './components/ListingModal';
import { FlipTracker } from './components/FlipTracker';
import { UserManual } from './components/UserManual';

const CATEGORIES: { label: string; value: ArbitrageCategory | 'all' }[] = [
  { label: 'All 50%+ Clearance Deals', value: 'all' },
  { label: 'Power Tools & Hardware', value: 'Power Tools & Hardware' },
  { label: 'Tech & Electronics', value: 'Tech & Electronics' },
  { label: 'Small Furniture & Home Goods', value: 'Small Furniture & Home Goods' },
  { label: 'Farm, Lawn & Outdoor', value: 'Farm, Lawn & Outdoor' },
  { label: 'Seasonal & Variety / Dollar', value: 'Seasonal & Variety / Dollar' },
  { label: 'Apparel & Footwear', value: 'Apparel & Footwear' },
  { label: 'Toys, Hobbies & Gaming', value: 'Toys, Hobbies & Gaming' },
];

type SortOption = 'margin_desc' | 'profit_desc' | 'distance_asc' | 'velocity_asc';

export default function App() {
  const [activeTab, setActiveTab] = useState<'deals' | 'scanner' | 'stores' | 'penny_hud' | 'route_planner' | 'portfolio' | 'manual'>('deals');
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  
  // Modals
  const [isSkuModalOpen, setIsSkuModalOpen] = useState(false);
  const [skuModalInitialQuery, setSkuModalInitialQuery] = useState('');
  const [selectedDealForListing, setSelectedDealForListing] = useState<DealItem | null>(null);

  // Filter & Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ArbitrageCategory | 'all'>('all');
  const [minProfitMargin, setMinProfitMargin] = useState<number>(50);
  const [maxDistance, setMaxDistance] = useState<number>(100);
  const [pennyItemsOnly, setPennyItemsOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('margin_desc');

  const currentShowcaseDeal = FEATURED_DEALS[showcaseIndex % FEATURED_DEALS.length];

  const handleNextShowcaseDeal = () => {
    setShowcaseIndex((prev) => (prev + 1) % FEATURED_DEALS.length);
  };

  const openSkuAnalyzerWithQuery = (query: string) => {
    setSkuModalInitialQuery(query);
    setIsSkuModalOpen(true);
  };

  const openListingModal = (deal: DealItem) => {
    setSelectedDealForListing(deal);
  };

  // Filter and Sort Deals
  const filteredDeals = useMemo(() => {
    const list = FEATURED_DEALS.filter((deal) => {
      const matchesSearch = 
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.storeCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || deal.category === selectedCategory;
      const matchesMargin = deal.profitMarginPercent >= minProfitMargin;
      const matchesDistance = deal.storeDistanceMiles <= maxDistance;
      const matchesPenny = !pennyItemsOnly || deal.isPennyItem || deal.inStorePrice <= 1.0;

      return matchesSearch && matchesCategory && matchesMargin && matchesDistance && matchesPenny;
    });

    return list.sort((a, b) => {
      if (sortBy === 'margin_desc') return b.profitMarginPercent - a.profitMarginPercent;
      if (sortBy === 'profit_desc') return b.netProfit - a.netProfit;
      if (sortBy === 'distance_asc') return a.storeDistanceMiles - b.storeDistanceMiles;
      if (sortBy === 'velocity_asc') return a.flipVelocityDays - b.flipVelocityDays;
      return 0;
    });
  }, [searchQuery, selectedCategory, minProfitMargin, maxDistance, pennyItemsOnly, sortBy]);

  const avgProfitMargin = Math.round(
    FEATURED_DEALS.reduce((acc, d) => acc + d.profitMarginPercent, 0) / FEATURED_DEALS.length
  );

  const totalPotentialProfit = Math.round(
    FEATURED_DEALS.reduce((acc, d) => acc + d.netProfit, 0)
  );

  const nearestStoreDistance = Math.min(
    ...FEATURED_DEALS.map(d => d.storeDistanceMiles)
  );

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 bg-grid-pattern relative">
      {/* Top ambient radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-vignette pointer-events-none" />

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLiveScan={() => openSkuAnalyzerWithQuery('')}
        dealsCount={FEATURED_DEALS.length}
        storesCount={IOWA_STORES.length}
        avgProfitMargin={avgProfitMargin}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 relative z-10">
        {/* TAB 1: 50%+ DEALS GRID & SHOWCASE */}
        {activeTab === 'deals' && (
          <div className="space-y-8">
            {/* Top Stat Telemetry Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-[#0e1320] border border-slate-800/80 shadow-md">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Monitored Iowa Stores</span>
                  <MapPin className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white mt-1 font-mono">102 Stores</div>
                <div className="text-[11px] text-slate-400 mt-0.5">100-mile Cedar Falls ring</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e1320] border border-slate-800/80 shadow-md">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Average Net ROI</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">+{avgProfitMargin}%</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Post fees & shipping</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e1320] border border-slate-800/80 shadow-md">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Available Net Cash</span>
                  <DollarSign className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-amber-300 mt-1 font-mono">${totalPotentialProfit.toLocaleString()}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Live verified clearance inventory</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e1320] border border-slate-800/80 shadow-md">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Closest Verified Deal</span>
                  <Car className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-black text-blue-400 mt-1 font-mono">{nearestStoreDistance} Miles</div>
                <div className="text-[11px] text-slate-400 mt-0.5">~7 mins from University Ave</div>
              </div>
            </div>

            {/* Featured Showcase Answer Hero */}
            <section aria-label="Featured 50%+ Iowa Flip">
              <div className="mb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    <Flame className="w-4 h-4" />
                  </span>
                  <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-300 font-display">
                    Featured Iowa 50%+ Arbitrage Showcase (Cedar Falls / Waterloo Core)
                  </h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Deal #{showcaseIndex + 1} of {FEATURED_DEALS.length}
                </span>
              </div>

              <ShowcaseHeroItem
                currentDeal={currentShowcaseDeal}
                onNextShowcaseDeal={handleNextShowcaseDeal}
                onOpenListingModal={openListingModal}
                onOpenSkuAnalyzer={openSkuAnalyzerWithQuery}
              />
            </section>

            {/* Filter Controls & Live Arbitrage Grid */}
            <section aria-label="Deals Feed" className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2 font-display">
                    <span>Active Iowa Clearance & Hidden Arbitrage Grid</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/30">
                      {filteredDeals.length} Items Found
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time catalog across Theisen's, Blain's, Home Depot, Dollar General, Northern Tool, Menards & more
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setMinProfitMargin(50);
                      setMaxDistance(100);
                      setPennyItemsOnly(false);
                      setSearchQuery('');
                      setSortBy('margin_desc');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Filters</span>
                  </button>
                </div>
              </div>

              {/* Filter Command Bar */}
              <div className="p-4 rounded-3xl bg-[#0e1320] border border-slate-800/90 space-y-3.5 shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  {/* Search Input */}
                  <div className="sm:col-span-6 relative">
                    <input
                      id="input-deals-search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search DeWalt, Ninja, Cast Iron, Carhartt, SKU, City or Store..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[#07090e] border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>

                  {/* Category Dropdown */}
                  <div className="sm:col-span-3">
                    <select
                      id="select-deals-category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-[#07090e] border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="sm:col-span-3">
                    <div className="relative">
                      <select
                        id="select-deals-sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="w-full pl-8 pr-3.5 py-2.5 rounded-2xl bg-[#07090e] border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="margin_desc">Highest Net ROI %</option>
                        <option value="profit_desc">Highest Net Profit ($)</option>
                        <option value="distance_asc">Closest Distance (Miles)</option>
                        <option value="velocity_asc">Fastest Turnaround Speed</option>
                      </select>
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                {/* Secondary Interactive Filter Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
                  {/* ROI Filter Buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-400 font-semibold text-[11px]">Min Net ROI:</span>
                    {[50, 75, 100].map((margin) => (
                      <button
                        key={margin}
                        onClick={() => setMinProfitMargin(margin)}
                        className={`px-3 py-1 rounded-xl font-mono text-xs transition-all ${
                          minProfitMargin === margin
                            ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                            : 'bg-[#07090e] text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        +{margin}%
                      </button>
                    ))}
                  </div>

                  {/* Radius Distance Filter */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-400 font-semibold text-[11px]">Radius:</span>
                    {[15, 30, 60, 100].map((dist) => (
                      <button
                        key={dist}
                        onClick={() => setMaxDistance(dist)}
                        className={`px-2.5 py-1 rounded-xl font-mono text-xs transition-all ${
                          maxDistance === dist
                            ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                            : 'bg-[#07090e] text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        &le; {dist} mi
                      </button>
                    ))}
                  </div>

                  {/* 1c Penny Items Checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none bg-[#07090e] px-3 py-1 rounded-xl border border-slate-800 hover:border-purple-500/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={pennyItemsOnly}
                      onChange={(e) => setPennyItemsOnly(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-700 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="font-bold text-xs text-purple-300">1¢ Penny Drops Only</span>
                  </label>
                </div>
              </div>

              {/* Deals Grid Cards */}
              {filteredDeals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredDeals.map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      onOpenListing={openListingModal}
                      onOpenAnalyzer={openSkuAnalyzerWithQuery}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-3xl bg-[#0e1320] border border-slate-800 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                  <h4 className="text-base font-bold text-white font-display">No Clearance Items Match Current Criteria</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Try broadening your distance slider or resetting your category filter to see all 50%+ margin inventory.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setMinProfitMargin(50);
                      setMaxDistance(100);
                      setPennyItemsOnly(false);
                      setSearchQuery('');
                    }}
                    className="mt-2 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Show All Active Iowa Deals
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

        {/* TAB 2: AI SKU VALUATION VIEW */}
        {activeTab === 'scanner' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-[#0e1320] border border-slate-800">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-display">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span>Live AI SKU Arbitrage & Secondary Market Valuation Engine</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Scan or enter any product name, SKU, or UPC found in an Iowa store to calculate real-world take-home profit, compare eBay and Facebook comps, and generate copy-ready listing drafts.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setIsSkuModalOpen(true)}
                className="w-full py-8 rounded-3xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-lg shadow-2xl flex items-center justify-center gap-3 active:scale-[0.99] transition-all font-display"
              >
                <Sparkles className="w-7 h-7" />
                <span>Launch Interactive AI SKU Scanner</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: 102 STORES DIRECTORY */}
        {activeTab === 'stores' && (
          <StoreDirectory
            onSelectStoreDeals={(storeName) => {
              setSearchQuery(storeName);
              setActiveTab('deals');
            }}
            onEvaluateStoreSku={(storeName) => {
              openSkuAnalyzerWithQuery(`Clearance Tool at ${storeName}`);
            }}
          />
        )}

        {/* TAB 4: PENNY CODE & GHOST STOCK TRUTH HUD */}
        {activeTab === 'penny_hud' && <PennyItemHUD />}

        {/* TAB 5: MULTI-STORE ROUTE PLANNER */}
        {activeTab === 'route_planner' && (
          <TripOptimizerModal onOpenListing={openListingModal} />
        )}

        {/* TAB 6: MY FLIP PORTFOLIO & TRACKER */}
        {activeTab === 'portfolio' && <FlipTracker />}

        {/* TAB 7: OFFICIAL USER MANUAL & PDF EXPORT */}
        {activeTab === 'manual' && <UserManual />}
      </main>

      {/* Global Modals */}
      <SkuAnalyzerModal
        isOpen={isSkuModalOpen || activeTab === 'scanner'}
        onClose={() => {
          setIsSkuModalOpen(false);
          if (activeTab === 'scanner') setActiveTab('deals');
        }}
        initialQuery={skuModalInitialQuery}
      />

      <ListingModal
        deal={selectedDealForListing}
        isOpen={!!selectedDealForListing}
        onClose={() => setSelectedDealForListing(null)}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-[#07090e] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>Iowa Retail Arbitrage & Hidden Clearance Finder • Cedar Falls Core Hub (50613)</span>
          </div>
          <span className="font-mono text-slate-400 text-[11px]">102 Stores Monitored • Real-Time eBay & FB Comps Grounding</span>
        </div>
      </footer>
    </div>
  );
}
