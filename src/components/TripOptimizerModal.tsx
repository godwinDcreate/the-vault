import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Fuel, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  ExternalLink,
  Store as StoreIcon,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Store, DealItem } from '../types';
import { IOWA_STORES } from '../data/stores';
import { FEATURED_DEALS } from '../data/deals';

interface TripOptimizerProps {
  onOpenListing: (deal: DealItem) => void;
}

export const TripOptimizerModal: React.FC<TripOptimizerProps> = ({ onOpenListing }) => {
  const [selectedCityZone, setSelectedCityZone] = useState<'cedar_valley' | 'cedar_rapids_loop' | 'coralville_loop' | 'full_circuit'>('cedar_valley');

  const presetTrips = {
    cedar_valley: {
      name: 'Cedar Falls & Waterloo Local Sprint (15 Miles)',
      description: 'Zero highway miles. High-density run through Theisen\'s, Blain\'s, Home Depot, Dollar General, and Best Buy.',
      stores: [
        IOWA_STORES.find(s => s.id === 'store-1')!, // Walmart CF
        IOWA_STORES.find(s => s.id === 'store-9')!, // Home Depot CF
        IOWA_STORES.find(s => s.id === 'store-4')!, // Blains Farm & Fleet CF
        IOWA_STORES.find(s => s.id === 'store-103')!, // Theisens Waterloo
        IOWA_STORES.find(s => s.id === 'store-53')!, // Best Buy Waterloo
        IOWA_STORES.find(s => s.id === 'store-60')!, // Big Lots Waterloo
      ].filter(Boolean),
      estMiles: 18.5,
      driveTimeMins: 38,
      estGasCost: 2.60,
    },
    cedar_rapids_loop: {
      name: 'Hwy 218 South Corridor to Cedar Rapids (65 Miles)',
      description: 'Direct sprint down to Cedar Rapids to hit Northern Tool, Sierra Trading Post, Ollie\'s, and Menards.',
      stores: [
        IOWA_STORES.find(s => s.id === 'store-103')!, // Theisens Waterloo
        IOWA_STORES.find(s => s.id === 'store-11')!, // Northern Tool CR
        IOWA_STORES.find(s => s.id === 'store-26')!, // Sierra CR
        IOWA_STORES.find(s => s.id === 'store-2')!, // Target CR
      ].filter(Boolean),
      estMiles: 64.2,
      driveTimeMins: 75,
      estGasCost: 8.95,
    },
    coralville_loop: {
      name: 'I-380 South to Coralville & Iowa City Hub (85 Miles)',
      description: 'Target high-tier mega outlets, Costco Coralville, Barnes & Noble, and Ollie\'s Closeouts.',
      stores: [
        IOWA_STORES.find(s => s.id === 'store-57')!, // Barnes & Noble Coralville
        IOWA_STORES.find(s => s.id === 'store-65')!, // Ollies Iowa City
        IOWA_STORES.find(s => s.id === 'store-3')!, // Costco Coralville
      ].filter(Boolean),
      estMiles: 88.0,
      driveTimeMins: 95,
      estGasCost: 12.30,
    },
    full_circuit: {
      name: 'Iowa Weekend Super-Haul Circuit (140 Miles)',
      description: 'The ultimate arbitrage run hitting 10 top-margin clearance hubs across eastern Iowa.',
      stores: [
        IOWA_STORES.find(s => s.id === 'store-4')!, // Blains CF
        IOWA_STORES.find(s => s.id === 'store-103')!, // Theisens Waterloo
        IOWA_STORES.find(s => s.id === 'store-11')!, // Northern Tool CR
        IOWA_STORES.find(s => s.id === 'store-26')!, // Sierra CR
        IOWA_STORES.find(s => s.id === 'store-57')!, // Barnes & Noble Coralville
        IOWA_STORES.find(s => s.id === 'store-65')!, // Ollies Iowa City
      ].filter(Boolean),
      estMiles: 142.0,
      driveTimeMins: 160,
      estGasCost: 19.80,
    }
  };

  const currentTrip = presetTrips[selectedCityZone];
  const targetStoreIds = currentTrip.stores.map(s => s.id);
  const targetDeals = FEATURED_DEALS.filter(d => targetStoreIds.includes(d.storeId));

  const totalBuyInvestment = targetDeals.reduce((acc, d) => acc + d.inStorePrice, 0);
  const totalGrossProfit = targetDeals.reduce((acc, d) => acc + d.netProfit, 0);
  const netTakeHome = Math.max(0, totalGrossProfit - currentTrip.estGasCost);

  return (
    <div className="space-y-6">
      {/* Route Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 border border-blue-500/40">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-500/20 border border-blue-500/40 text-blue-300">
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">
                Multi-Store Arbitrage Route & Trip Optimizer
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                Start: Cedar Falls (50613)
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Calculates optimal driving sequences, estimates gas consumption ($3.35/gal), tallies required purchase capital, and projects net take-home arbitrage profit.
            </p>
          </div>
        </div>

        {/* Route Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-5 pt-4 border-t border-blue-500/20">
          {(Object.keys(presetTrips) as (keyof typeof presetTrips)[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedCityZone(key)}
              className={`p-3 rounded-xl text-left transition-all border ${
                selectedCityZone === key
                  ? 'bg-blue-500 text-slate-950 border-blue-400 font-extrabold shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="text-xs font-bold truncate">{presetTrips[key].name.split('(')[0]}</div>
              <div className={`text-[11px] font-mono mt-0.5 ${
                selectedCityZone === key ? 'text-slate-900' : 'text-slate-400'
              }`}>
                {presetTrips[key].estMiles} miles • ~{presetTrips[key].driveTimeMins} mins
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Financial Haul Projection Bento */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
            <Fuel className="w-3.5 h-3.5 text-amber-400" />
            <span>Est. Fuel Cost</span>
          </div>
          <div className="text-xl font-extrabold text-white mt-1">
            ${currentTrip.estGasCost.toFixed(2)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {currentTrip.estMiles} mi roundtrip
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
            <DollarSign className="w-3.5 h-3.5 text-blue-400" />
            <span>Capital Required</span>
          </div>
          <div className="text-xl font-extrabold text-white mt-1">
            ${totalBuyInvestment.toFixed(2)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            For {targetDeals.length} clearance items
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gross Resale Value</span>
          </div>
          <div className="text-xl font-extrabold text-emerald-400 mt-1 font-mono">
            +${(totalBuyInvestment + totalGrossProfit).toFixed(2)}
          </div>
          <div className="text-[10px] text-emerald-400/80 mt-0.5">
            Marketplace / eBay comps
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-400">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Net Haul (After Gas)</span>
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
            +${netTakeHome.toFixed(2)}
          </div>
          <div className="text-[10px] text-emerald-300/80 mt-0.5">
            Pure profit in pocket
          </div>
        </div>
      </div>

      {/* Itinerary Stops */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center justify-between">
          <span>Turn-by-Turn Route Stops & Clearance Endcap Targets</span>
          <span className="text-xs font-mono text-slate-400">{currentTrip.stores.length} Stops Total</span>
        </h3>

        <div className="space-y-3">
          {currentTrip.stores.map((store, index) => {
            const storeDeal = FEATURED_DEALS.find(d => d.storeId === store.id);
            return (
              <div 
                key={store.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{store.name}</span>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.2 rounded border border-amber-500/20">
                        {store.distanceMiles} mi from Cedar Falls
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{store.address}, {store.city}, IA</span>
                    </div>
                    {store.clearanceTip && (
                      <p className="text-[11px] text-slate-300 mt-1.5 line-clamp-1">
                        💡 <strong className="text-amber-300">Target:</strong> {store.clearanceTip}
                      </p>
                    )}
                  </div>
                </div>

                {/* Associated Item Target */}
                {storeDeal && (
                  <div className="sm:text-right flex-shrink-0 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Target Item:</span>
                    <strong className="text-xs text-amber-300 block truncate max-w-[220px]">
                      {storeDeal.title}
                    </strong>
                    <div className="text-xs font-mono mt-0.5 flex items-center sm:justify-end gap-2">
                      <span className="text-white">${storeDeal.inStorePrice.toFixed(2)} Buy</span>
                      <span className="text-emerald-400 font-bold">+${storeDeal.netProfit.toFixed(2)} Profit</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
