import React, { useState } from 'react';
import { 
  Store as StoreIcon, 
  MapPin, 
  Search, 
  Filter, 
  Calendar, 
  Tag, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Compass,
  ArrowUpDown
} from 'lucide-react';
import { Store, StoreTier } from '../types';
import { IOWA_STORES } from '../data/stores';

interface StoreDirectoryProps {
  onSelectStoreDeals: (storeName: string) => void;
  onEvaluateStoreSku: (storeName: string) => void;
}

const TIERS: { label: string; value: string }[] = [
  { label: 'All 102 Stores', value: 'all' },
  { label: 'Tier 1: Mega-Retailers & Clubs', value: 'Tier 1' },
  { label: 'Tier 2: Home Improvement & Hardware', value: 'Tier 2' },
  { label: 'Tier 3: Supermarkets', value: 'Tier 3' },
  { label: 'Tier 4: Department & Softlines', value: 'Tier 4' },
  { label: 'Tier 5: Sporting Goods, Outdoor & Auto', value: 'Tier 5' },
  { label: 'Tier 6: Electronics, Books, Crafts', value: 'Tier 6' },
  { label: 'Tier 7: Value, Variety & Dollar Stores', value: 'Tier 7' },
  { label: 'Tier 8: Beauty, Health & Pharmacy', value: 'Tier 8' },
  { label: 'Tier 9: Furniture & Home Furnishings', value: 'Tier 9' },
  { label: 'Tier 10: Footwear Specialty', value: 'Tier 10' },
  { label: 'Tier 11: Specialized Boutiques', value: 'Tier 11' },
];

export const StoreDirectory: React.FC<StoreDirectoryProps> = ({
  onSelectStoreDeals,
  onEvaluateStoreSku,
}) => {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [maxDistance, setMaxDistance] = useState<number>(100);
  const [selectedCity, setSelectedCity] = useState('all');

  const filteredStores = IOWA_STORES.filter((store) => {
    const matchesSearch = 
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.city.toLowerCase().includes(search.toLowerCase()) ||
      store.category.toLowerCase().includes(search.toLowerCase()) ||
      store.clearanceTip?.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase());

    const matchesTier = selectedTier === 'all' || store.tier.includes(selectedTier);
    const matchesDistance = store.distanceMiles <= maxDistance;
    const matchesCity = selectedCity === 'all' || store.city.toLowerCase() === selectedCity.toLowerCase();

    return matchesSearch && matchesTier && matchesDistance && matchesCity;
  });

  const cities = Array.from(new Set(IOWA_STORES.map((s) => s.city))).sort();

  return (
    <div className="space-y-6">
      {/* Directory Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
              <StoreIcon className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-white">
                102 Retail Stores Registry (100-Mile Radius)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Targeting Cedar Falls, Waterloo, Cedar Rapids, Coralville, Iowa City, Williamsburg, Ankeny & Polk City
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-slate-300">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
            Matching: <strong className="text-amber-400">{filteredStores.length}</strong> / 102
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
            Center Hub: <strong className="text-white">Cedar Falls (50613)</strong>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search bar */}
          <div className="sm:col-span-6 relative">
            <input
              id="input-store-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search store name, city, tag type, or clearance tips..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          {/* Tier Filter */}
          <div className="sm:col-span-3">
            <select
              id="select-store-tier"
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-amber-500"
            >
              {TIERS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div className="sm:col-span-3">
            <select
              id="select-store-city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Iowa Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}, IA
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Distance Slider */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              Radius from Cedar Falls:
            </span>
            <div className="flex items-center gap-1.5">
              {[10, 25, 55, 80, 100].map((dist) => (
                <button
                  key={dist}
                  onClick={() => setMaxDistance(dist)}
                  className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-all ${
                    maxDistance === dist
                      ? 'bg-amber-500 text-slate-950 font-extrabold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  &le; {dist} mi
                </button>
              ))}
            </div>
          </div>

          <span className="text-slate-400 font-mono">
            Showing stores within <strong className="text-amber-400">{maxDistance} miles</strong>
          </span>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStores.map((store) => (
          <div
            key={store.id}
            id={`store-card-${store.id}`}
            className="flex flex-col justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 hover:shadow-lg transition-all"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 text-slate-300 border border-slate-800 font-mono">
                  Rank #{store.rank}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                  {store.distanceMiles} mi away
                </span>
              </div>

              <h4 className="font-extrabold text-sm text-white mb-0.5">
                {store.name}
              </h4>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 mb-3">
                <MapPin className="w-3 h-3 text-amber-400 inline" />
                <span>{store.address}, {store.city}, {store.state} {store.zip}</span>
              </p>

              {/* Tier & Category */}
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] space-y-1.5 mb-3">
                <div className="text-slate-300">
                  <span className="text-slate-400">Tier: </span>
                  <span className="font-semibold text-amber-300">{store.tier.split(':')[1] || store.tier}</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-400">Category: </span>
                  <span>{store.category}</span>
                </div>
                {store.markdownDay && (
                  <div className="text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    <span className="text-slate-400">Markdown Day: </span>
                    <strong className="text-emerald-400">{store.markdownDay}</strong>
                  </div>
                )}
              </div>

              {/* Clearance Tag Secret Tip */}
              {store.clearanceTip && (
                <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-[11px] text-amber-200/90 leading-relaxed mb-3">
                  <div className="font-bold text-amber-400 flex items-center gap-1 mb-0.5">
                    <Tag className="w-3 h-3 text-amber-400" />
                    <span>Clearance Tag System:</span>
                  </div>
                  {store.clearanceTip}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectStoreDeals(store.name)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center transition-all"
              >
                View Deals
              </button>
              <button
                onClick={() => onEvaluateStoreSku(store.name)}
                className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 text-xs font-bold text-center border border-amber-500/40 transition-all flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>AI Scan Store</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
