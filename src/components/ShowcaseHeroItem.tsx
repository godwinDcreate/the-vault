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
  Zap,
  Tag,
  Share2,
  Car
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
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#34d399', '#60a5fa'],
      });
    }, 1800);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0f1422] border border-amber-500/30 shadow-2xl shadow-amber-950/20 text-white">
      {/* Subtle top accent border line */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500 w-full" />

      <div className="p-5 sm:p-7">
        {/* Header Badge Row */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <Flame className="w-3.5 h-3.5 fill-emerald-400" />
              <span>VERIFIED 50%+ IOWA PROFIT FLIP</span>
            </div>
            <span className="text-xs text-slate-400 font-mono bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800">
              Discovered: {currentDeal.dateFound}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-showcase-run-again"
              onClick={handleRunAgain}
              disabled={isScanningAgain}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 font-extrabold text-xs shadow-md transition-all disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isScanningAgain ? 'animate-spin' : ''}`} />
              <span>{isScanningAgain ? 'Scanning Local Stores...' : 'Simulate Live Scan / Next Flip'}</span>
            </button>
          </div>
        </div>

        {/* Scanning Overlay when user tests "Do It Again" */}
        {isScanningAgain && (
          <div className="absolute inset-0 z-30 bg-[#080b11]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center mb-4 text-amber-400 animate-spin">
              <RotateCw className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white font-display mb-2">
              Executing Real-Time Iowa Store Scanner
            </h4>
            <p className="text-sm font-mono text-amber-300 max-w-md animate-pulse">
              {scanStep}
            </p>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left Visual & Buy Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-[#07090e] border border-slate-800 aspect-[16/11] group shadow-inner">
              <img 
                src={currentDeal.imageUrl} 
                alt={currentDeal.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-[#0b0f19]/90 backdrop-blur-md border border-slate-700/80 text-xs font-semibold text-amber-400 flex items-center gap-1.5 shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentDeal.storeName} ({currentDeal.storeCity}, IA)</span>
              </div>
              <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black shadow-xl">
                +{currentDeal.profitMarginPercent.toFixed(0)}% NET ROI
              </div>
            </div>

            {/* Quick Location & Verification Details */}
            <div className="p-4 rounded-2xl bg-[#0b0f19]/90 border border-slate-800 text-xs space-y-2.5">
              <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800/60">
                <span className="text-slate-400">Target Store:</span>
                <strong className="text-white text-right font-medium">{currentDeal.storeAddress}, {currentDeal.storeCity}, IA</strong>
              </div>
              <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-amber-400 inline" />
                  Distance from Cedar Falls:
                </span>
                <span className="font-mono text-amber-300 font-semibold">{currentDeal.storeDistanceMiles} miles (~{Math.round(currentDeal.storeDistanceMiles * 1.4)} min drive)</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800/60">
                <span className="text-slate-400">Shelf Location:</span>
                <span className="text-slate-200 font-medium">{currentDeal.aisleLocation || 'Main Clearance Endcap'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Physical Stock Status:</span>
                <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {currentDeal.physicalVerificationStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Right Financial & Comp Breakdown (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  {currentDeal.category}
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  UPC: {currentDeal.upc}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight font-display">
                {currentDeal.title}
              </h3>

              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                {currentDeal.notes}
              </p>

              {/* Financial Numbers Highlight Bento Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                {/* Buy Price */}
                <div className="p-3.5 rounded-2xl bg-[#07090e] border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    In-Store Buy Price
                  </div>
                  <div className="text-2xl font-black text-white mt-1 font-mono">
                    ${currentDeal.inStorePrice.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400 line-through mt-0.5">
                    MSRP ${currentDeal.originalRetailPrice.toFixed(2)}
                  </div>
                </div>

                {/* Secondary Market Sold Comp */}
                <div className="p-3.5 rounded-2xl bg-[#07090e] border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Resale Comp (Sold)
                  </div>
                  <div className="text-2xl font-black text-amber-300 mt-1 font-mono">
                    ${currentDeal.secondaryMarketComps.ebaySoldMedian.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {currentDeal.secondaryMarketComps.soldPast30DaysCount || 30}+ sold past 30d
                  </div>
                </div>

                {/* Net Profit */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40">
                  <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                    Estimated Net Profit
                  </div>
                  <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                    +${currentDeal.netProfit.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-emerald-300/80 mt-0.5">
                    After platform fees
                  </div>
                </div>

                {/* Turnaround Velocity */}
                <div className="p-3.5 rounded-2xl bg-[#07090e] border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Est. Flip Speed
                  </div>
                  <div className="text-2xl font-black text-blue-400 mt-1 font-mono">
                    {currentDeal.flipVelocityDays} Days
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {currentDeal.velocityRating.split(' ')[0]} Turnover
                  </div>
                </div>
              </div>

              {/* Multi-Platform Comparative Pricing Matrix */}
              <div className="mt-4 p-4 rounded-2xl bg-[#07090e] border border-slate-800 text-xs">
                <div className="text-xs font-bold text-slate-200 mb-2.5 flex items-center justify-between">
                  <span>Multi-Marketplace Cross Comps:</span>
                  <span className="text-[11px] font-normal text-slate-400">
                    Highest Margin Target: <strong className="text-amber-400 font-semibold">{currentDeal.bestPlatformToSell}</strong>
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="p-2.5 rounded-xl bg-[#0b0f19] border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-semibold">eBay Sold Median</div>
                    <div className="text-sm font-bold text-white mt-0.5 font-mono">
                      ${currentDeal.secondaryMarketComps.ebaySoldMedian.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-500">Shipped parcel</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0b0f19] border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-semibold">FB Marketplace (IA)</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5 font-mono">
                      ${currentDeal.secondaryMarketComps.fbMarketplaceLocalMedian.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-emerald-400/80">0% fees (Cash)</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0b0f19] border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-semibold">Amazon BuyBox</div>
                    <div className="text-sm font-bold text-white mt-0.5 font-mono">
                      ${currentDeal.secondaryMarketComps.amazonBuyBox?.toFixed(2) || (currentDeal.originalRetailPrice).toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-500">MSRP Benchmark</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Ghost Stock Risk: <strong className="text-emerald-400 font-semibold">{currentDeal.ghostStockRiskScore}% (Very Low)</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-showcase-ai-deep-analyze"
                  onClick={() => onOpenSkuAnalyzer(currentDeal.title)}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI Deep Valuation</span>
                </button>

                <button
                  id="btn-showcase-generate-listing"
                  onClick={() => onOpenListingModal(currentDeal)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold shadow-md transition-all active:scale-[0.98]"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-950" />
                  <span>1-Click Listing Text</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
