import React from 'react';
import { 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  Tag,
  Share2,
  Navigation,
  Plus
} from 'lucide-react';
import { DealItem } from '../types';

interface DealCardProps {
  deal: DealItem;
  onOpenListing: (deal: DealItem) => void;
  onOpenAnalyzer: (query: string) => void;
  onAddToTrip?: (deal: DealItem) => void;
  onTrackFlip?: (deal: DealItem) => void;
  isTripSelected?: boolean;
}

export const DealCard: React.FC<DealCardProps> = ({
  deal,
  onOpenListing,
  onOpenAnalyzer,
  onAddToTrip,
  onTrackFlip,
  isTripSelected = false,
}) => {
  return (
    <div 
      id={`deal-card-${deal.id}`}
      className="group flex flex-col justify-between rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 shadow-md hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 overflow-hidden"
    >
      {/* Top Image & Badge Container */}
      <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
        <img 
          src={deal.imageUrl} 
          alt={deal.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Store & Distance Badge */}
        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] font-semibold text-slate-200 flex items-center gap-1 shadow-sm">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>{deal.storeName}</span>
          <span className="text-amber-400 font-mono">({deal.storeCity}, {deal.storeDistanceMiles}mi)</span>
        </div>

        {/* ROI Pill */}
        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 text-xs font-black shadow-md flex items-center gap-1">
          <span>+{deal.profitMarginPercent.toFixed(0)}% ROI</span>
        </div>

        {/* Penny / Glitch Tag if applicable */}
        {deal.isPennyItem && (
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-purple-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
            1¢ Penny Item Flag
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-sm text-slate-300 text-[10px] border border-slate-800">
          {deal.category}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title */}
          <h4 className="font-bold text-sm text-white leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors">
            {deal.title}
          </h4>

          {/* Pricing Row */}
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">
                In-Store Price
              </div>
              <div className="text-xl font-extrabold text-white flex items-center">
                <span>${deal.inStorePrice.toFixed(2)}</span>
                <span className="ml-1.5 text-xs text-slate-400 line-through font-normal">
                  ${deal.originalRetailPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-emerald-400">
                Est. Net Profit
              </div>
              <div className="text-xl font-extrabold text-emerald-400 font-mono">
                +${deal.netProfit.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Comps & Speed Mini-Bar */}
          <div className="mt-3 grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px]">
            <div>
              <span className="text-slate-400">Resale Comp:</span>
              <div className="font-semibold text-slate-200">
                ${deal.secondaryMarketComps.ebaySoldMedian.toFixed(2)} <span className="text-[10px] text-slate-400 font-normal">eBay/FB</span>
              </div>
            </div>
            <div>
              <span className="text-slate-400">Flip Turnaround:</span>
              <div className="font-semibold text-blue-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-blue-400 inline" />
                <span>{deal.flipVelocityDays} Days</span>
              </div>
            </div>
          </div>

          {/* Ghost Stock / Verification Status */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] px-1">
            <div className="flex items-center gap-1 text-slate-400 truncate max-w-[210px]">
              <Tag className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span className="truncate">{deal.clearanceCodeType || 'Clearance Tag'}</span>
            </div>

            <div className={`flex items-center gap-1 font-bold ${
              deal.ghostStockRiskScore < 20 
                ? 'text-emerald-400' 
                : deal.ghostStockRiskScore < 50 
                ? 'text-amber-400' 
                : 'text-purple-400'
            }`}>
              {deal.ghostStockRiskScore < 20 ? (
                <ShieldCheck className="w-3.5 h-3.5" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5" />
              )}
              <span>{deal.ghostStockRiskScore}% Ghost Risk</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
          <button
            id={`btn-analyze-${deal.id}`}
            onClick={() => onOpenAnalyzer(deal.title)}
            className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            title="Deep AI Comps & Resale Calculator"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>AI Valuation</span>
          </button>

          <button
            id={`btn-listing-${deal.id}`}
            onClick={() => onOpenListing(deal)}
            className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-sm transition-all active:scale-95"
            title="Generate Copy-Ready FB Marketplace / eBay Listing"
          >
            <Copy className="w-3 h-3 text-slate-950" />
            <span>1-Click Listing</span>
          </button>
        </div>
      </div>
    </div>
  );
};
