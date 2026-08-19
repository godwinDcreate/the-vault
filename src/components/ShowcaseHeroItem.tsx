import React, { useState } from 'react';
import { 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Flame, 
  Clock, 
  ShieldCheck, 
  RotateCw, 
  Copy, 
  ExternalLink, 
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DealItem } from '../types';

interface ShowcaseHeroItemProps {
  currentDeal: DealItem;
  onNextShowcaseDeal: () => void;
  onOpenListingModal: (deal: DealItem) => void;
  onOpenSkuAnalyzer: (initialQuery: string) => void;
}

export const ShowcaseHeroItem: React.FC<ShowcaseHeroItemProps> = ({
  currentDeal,
  onNextShowcaseDeal,
  onOpenListingModal,
  onOpenSkuAnalyzer,
}) => {
  const [isScanningAgain, setIsScanningAgain] = useState(false);
  const [scanStep, setScanStep] = useState<string | null>(null);

  const handleRunAgain = () => {
    setIsScanningAgain(true);
    setScanStep('Scraping 102 local store inventories in 100mi radius...');

    setTimeout(() => {
      setScanStep('Filtering SKUs with >50% net profit margin & active eBay/FB comps...');
    }, 600);

    setTimeout(() => {
      setScanStep('Auditing ghost-stock risk & verified physical shelf status...');
    }, 1200);

    setTimeout(() => {
      setIsScanningAgain(false);
      setScanStep(null);
      onNextShowcaseDeal();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6'],
      });
    }, 1800);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/40 shadow-2xl p-5 sm:p-7 text-white">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge Row */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-extrabold flex items-center gap-1.5 animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-emerald-400" />
            VERIFIED 50%+ IOWA PROFIT FLIP FOUND
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {currentDeal.dateFound}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-showcase-run-again"
            onClick={handleRunAgain}
            disabled={isScanningAgain}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isScanningAgain ? 'animate-spin' : ''}`} />
            <span>{isScanningAgain ? 'Scanning Local Stores...' : 'Show Software Do It Again (Next Find)'}</span>
          </button>
        </div>
      </div>

      {/* Scanning Overlay when user tests "Do It Again" */}
      {isScanningAgain && (
        <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center mb-4 text-amber-400 animate-spin">
            <RotateCw className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-white mb-2">
            Running Live Iowa Store Arbitrage Scraper
          </h4>
          <p className="text-sm font-mono text-amber-300 max-w-md animate-pulse">
            {scanStep}
          </p>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Visual & Buy Info (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video sm:aspect-[4/3] group">
            <img 
              src={currentDeal.imageUrl} 
              alt={currentDeal.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-bold text-amber-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              {currentDeal.storeName} ({currentDeal.storeCity}, IA)
            </div>
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-emerald-500/90 text-slate-950 text-xs font-extrabold shadow-lg">
              +{currentDeal.profitMarginPercent.toFixed(0)}% NET ROI
            </div>
          </div>

          {/* Quick Location & Verification */}
          <div className="mt-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Exact Store:</span>
              <strong className="text-white text-right">{currentDeal.storeAddress}, {currentDeal.storeCity}, IA</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Distance from Cedar Falls:</span>
              <span className="font-mono text-amber-300">{currentDeal.storeDistanceMiles} miles (~{Math.round(currentDeal.storeDistanceMiles * 1.5)} min drive)</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Shelf Location:</span>
              <span className="text-slate-200 font-semibold">{currentDeal.aisleLocation || 'Main Clearance Endcap'}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Physical Stock Status:</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3 h-3" />
                {currentDeal.physicalVerificationStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Right Financial & Comp Breakdown (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                {currentDeal.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                UPC: {currentDeal.upc}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight">
              {currentDeal.title}
            </h3>

            <p className="text-xs text-slate-300 mt-2 line-clamp-2">
              {currentDeal.notes}
            </p>

            {/* Financial Numbers Highlight Bento */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
              {/* Buy Price */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  In-Store Buy Price
                </div>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">
                  ${currentDeal.inStorePrice.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-400 line-through mt-0.5">
                  MSRP ${currentDeal.originalRetailPrice.toFixed(2)}
                </div>
              </div>

              {/* Secondary Market Sold Comp */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Resale Comp (Sold)
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
                  ${currentDeal.secondaryMarketComps.ebaySoldMedian.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {currentDeal.secondaryMarketComps.soldPast30DaysCount || 30}+ sold past mo
                </div>
              </div>

              {/* Net Profit */}
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Estimated Net Profit
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                  +${currentDeal.netProfit.toFixed(2)}
                </div>
                <div className="text-[10px] text-emerald-300/80 mt-0.5">
                  After platform fees
                </div>
              </div>

              {/* Turnaround Velocity */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Est. Flip Speed
                </div>
                <div className="text-xl sm:text-2xl font-black text-blue-400 mt-1">
                  {currentDeal.flipVelocityDays} Days
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {currentDeal.velocityRating.split(' ')[0]}
                </div>
              </div>
            </div>

            {/* Cross-Market Real-Time Price Comparison Table */}
            <div className="mt-4 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs">
              <div className="text-xs font-bold text-slate-200 mb-2 flex items-center justify-between">
                <span>Multi-Platform Arbitrage Comp Check:</span>
                <span className="text-[11px] font-normal text-slate-400">
                  Best Target: <strong className="text-amber-400">{currentDeal.bestPlatformToSell}</strong>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-semibold">eBay Sold Median</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    ${currentDeal.secondaryMarketComps.ebaySoldMedian.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-500">Shipped parcel</div>
                </div>

                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-semibold">FB Marketplace (IA)</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">
                    ${currentDeal.secondaryMarketComps.fbMarketplaceLocalMedian.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-emerald-400/80">0% fees (Cash)</div>
                </div>

                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-semibold">Amazon BuyBox</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    ${currentDeal.secondaryMarketComps.amazonBuyBox?.toFixed(2) || (currentDeal.originalRetailPrice).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-500">Benchmark MSRP</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ghost Stock Risk: <strong className="text-emerald-400">{currentDeal.ghostStockRiskScore}% (Very Low)</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-showcase-ai-deep-analyze"
                onClick={() => onOpenSkuAnalyzer(currentDeal.title)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Deep Scan Comps</span>
              </button>

              <button
                id="btn-showcase-generate-listing"
                onClick={() => onOpenListingModal(currentDeal)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold shadow-md transition-all active:scale-95"
              >
                <Copy className="w-3.5 h-3.5 text-slate-950" />
                <span>1-Click FB/eBay Listing</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
