import React, { useState } from 'react';
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
  PackageCheck
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

const CATEGORIES: { label: string; value: ArbitrageCategory | 'all' }[] = [
  { label: 'All 50%+ Clearance Deals', value: 'all' },
  { label: 'Power Tools & Hardware', value: 'Power Tools & Hardware' },
  { label: 'Tech & Electronics', value: 'Tech & Electronics' },
  { label: 'Small Furniture & Home Goods', value: 'Small Furniture & Home Goods' },
  { label: 'Farm, Lawn & Outdoor', value: 'Farm, Lawn & Outdoor' },
  { label: 'Seasonal & Dollar General', value: 'Seasonal & Variety / Dollar' },
  { label: 'Apparel & Footwear', value: 'Apparel & Footwear' },
  { label: 'Toys & Collectibles', value: 'Toys, Hobbies & Gaming' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'deals' | 'scanner' | 'stores' | 'penny_hud' | 'route_planner' | 'portfolio'>('deals');
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  
  // Modals
  const [isSkuModalOpen, setIsSkuModalOpen] = useState(false);
  const [skuModalInitialQuery, setSkuModalInitialQuery] = useState('');
  const [selectedDealForListing, setSelectedDealForListing] = useState<DealItem | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ArbitrageCategory | 'all'>('all');
  const [minProfitMargin, setMinProfitMargin] = useState<number>(50);
  const [maxDistance, setMaxDistance] = useState<number>(100);
  const [pennyItemsOnly, setPennyItemsOnly] = useState<boolean>(false);

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

  // Filter Deals
  const filteredDeals = FEATURED_DEALS.filter((deal) => {
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

  const avgProfitMargin = Math.round(
    FEATURED_DEALS.reduce((acc, d) => acc + d.profitMarginPercent, 0) / FEATURED_DEALS.length
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* TAB 1: 50%+ DEALS GRID & SHOWCASE */}
        {activeTab === 'deals' && (
          <div className="space-y-8">
            {/* Top Prompt Showcase Answer Hero */}
            <section aria-label="Featured 50%+ Iowa Flip">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <Flame className="w-4 h-4" />
                  </span>
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">
                    Featured Iowa 50%+ Arbitrage Showcase (Cedar Falls / Waterloo Core)
                  </h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Cycle Deal #{showcaseIndex + 1} of {FEATURED_DEALS.length}
                </span>
              </div>

              <ShowcaseHeroItem
                currentDeal={currentShowcaseDeal}
                onNextShowcaseDeal={handleNextShowcaseDeal}
                onOpenListingModal={openListingModal}
                onOpenSkuAnalyzer={openSkuAnalyzerWithQuery}
              />
            </section>

            {/* Filter Controls & Secondary Market Feed */}
            <section aria-label="Deals Feed" className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                    <span>Active Iowa Clearance & Hidden Arbitrage Grid</span>
                    <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {filteredDeals.length} Items Found
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Scraped & verified across Theisen's, Blain's, Home Depot, Dollar General, Northern Tool, Menards & more
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
                    }}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Filters</span>
                  </button>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  {/* Search */}
                  <div className="sm:col-span-6 relative">
                    <input
                      id="input-deals-search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search DeWalt, Ninja, Cast Iron, Carhartt, SKU or Store..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>

                  {/* Category Filter */}
                  <div className="sm:col-span-6">
                    <select
                      id="select-deals-category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Secondary Filter Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
                  {/* ROI Threshold */}
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-semibold">Min Net ROI:</span>
                    {[50, 75, 100].map((margin) => (
                      <button
                        key={margin}
                        onClick={() => setMinProfitMargin(margin)}
                        className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
                          minProfitMargin === margin
                            ? 'bg-emerald-500 text-slate-950 font-black'
                            : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        +{margin}%
                      </button>
                    ))}
                  </div>

                  {/* Distance */}
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-semibold">Max Distance:</span>
                    {[10, 25, 60, 100].map((dist) => (
                      <button
                        key={dist}
                        onClick={() => setMaxDistance(dist)}
                        className={`px-2 py-1 rounded-lg font-mono text-[11px] transition-all ${
                          maxDistance === dist
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        &le; {dist} mi
                      </button>
                    ))}
                  </div>

                  {/* Penny Flag Checkbox */}
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={pennyItemsOnly}
                      onChange={(e) => setPennyItemsOnly(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-800 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="font-semibold text-[11px] text-purple-300">1¢ Penny Items Only</span>
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
                <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
                  <h4 className="text-sm font-bold text-white">No Clearance Items Match Current Filter</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Try broadening your distance slider or lowering the minimum profit margin filter.
                  </p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* TAB 2: AI SKU VALUATION MODAL / VIEW */}
        {activeTab === 'scanner' && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Live AI SKU Arbitrage & Secondary Market Comp Engine</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter any product name, SKU, or UPC found in an Iowa store to calculate real-world take-home profit and generate copy-ready listing drafts.
              </p>
            </div>
            {/* Direct Open Sku Modal View */}
            <div className="pt-2">
              <button
                onClick={() => setIsSkuModalOpen(true)}
                className="w-full py-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="w-6 h-6" />
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

      {/* Subtle Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Iowa Retail Arbitrage & Hidden Clearance Finder • Cedar Falls Hub (50613)</span>
          <span className="font-mono text-slate-400">102 Stores Monitored • Real-Time eBay & FB Comps Grounding</span>
        </div>
      </footer>
    </div>
  );
}
