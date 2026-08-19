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
  ArrowUpRight
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
      className="group flex flex-col justify-between rounded-3xl bg-[#0e1320] border border-slate-800/80 hover:border-amber-500/40 shadow-lg hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 overflow-hidden"
    >
      {/* Top Image & Badge Container */}
      <div className="relative aspect-[16/10] bg-[#07090e] overflow-hidden">
        <img 
          src={deal.imageUrl} 
          alt={deal.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Store & Distance Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-[#0b0f19]/90 backdrop-blur-md border border-slate-800 text-[11px] font-semibold text-slate-200 flex items-center gap-1.5 shadow-md">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span className="truncate max-w-[130px]">{deal.storeName}</span>
          <span className="text-amber-400 font-mono">({deal.storeDistanceMiles}mi)</span>
        </div>

        {/* ROI Pill */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black shadow-lg flex items-center gap-1">
          <span>+{deal.profitMarginPercent.toFixed(0)}% ROI</span>
        </div>

        {/* Penny / Glitch Tag if applicable */}
        {deal.isPennyItem && (
          <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-lg bg-purple-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
            1¢ Penny Drop
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-lg bg-[#0b0f19]/80 backdrop-blur-sm text-slate-300 text-[10px] border border-slate-800">
          {deal.category}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Title */}
          <h4 className="font-bold text-sm text-white leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors font-display">
            {deal.title}
          </h4>

          {/* Pricing Row */}
          <div className="mt-3.5 flex items-baseline justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                In-Store Price
              </div>
              <div className="text-xl font-extrabold text-white flex items-baseline gap-1.5 font-mono">
                <span>${deal.inStorePrice.toFixed(2)}</span>
                <span className="text-xs text-slate-400 line-through font-normal">
                  ${deal.originalRetailPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                Est. Net Profit
              </div>
              <div className="text-xl font-extrabold text-emerald-400 font-mono">
                +${deal.netProfit.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Comps & Speed Mini-Bar */}
          <div className="mt-3 grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-[#07090e] border border-slate-800/80 text-[11px]">
            <div>
              <span className="text-slate-400 text-[10px] block">Resale Comp (Sold):</span>
              <div className="font-semibold text-slate-200 font-mono">
                ${deal.secondaryMarketComps.ebaySoldMedian.toFixed(2)} <span className="text-[10px] text-slate-400 font-normal">eBay/FB</span>
              </div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Flip Turnaround:</span>
              <div className="font-semibold text-blue-400 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 text-blue-400 inline" />
                <span>{deal.flipVelocityDays} Days</span>
              </div>
            </div>
          </div>

          {/* Clearance Tag & Ghost Risk Score */}
          <div className="mt-3 flex items-center justify-between text-[11px] px-1">
            <div className="flex items-center gap-1.5 text-slate-400 truncate max-w-[190px]">
              <Tag className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span className="truncate">{deal.clearanceCodeType || 'Yellow Clearance Tag'}</span>
            </div>

            <div className={`flex items-center gap-1 font-semibold ${
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
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2">
          <button
            id={`btn-analyze-${deal.id}`}
            onClick={() => onOpenAnalyzer(deal.title)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/80 transition-all"
            title="Deep AI Comps & Resale Calculator"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Comps</span>
          </button>

          <button
            id={`btn-listing-${deal.id}`}
            onClick={() => onOpenListing(deal)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold shadow-sm transition-all active:scale-95"
            title="Generate Copy-Ready FB Marketplace / eBay Listing"
          >
            <Copy className="w-3.5 h-3.5 text-slate-950" />
            <span>1-Click Post</span>
          </button>
        </div>
      </div>
    </div>
  );
};
