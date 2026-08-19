import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Search, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Flame,
  ArrowRight,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LiveSkuAnalysisRequest, LiveSkuAnalysisResult } from '../types';
import { IOWA_STORES } from '../data/stores';

interface SkuAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const PRESET_QUERIES = [
  { label: 'DeWalt 20V Max Drill Kit', query: 'DeWalt 20V Max Brushless Compact Drill Kit DCD777', store: "Theisen's Home • Farm • Auto", price: 59 },
  { label: 'Milwaukee M12 3/8" Ratchet', query: 'Milwaukee M12 Cordless 3/8" High Speed Ratchet 2457-20', store: 'Northern Tool + Equipment', price: 69 },
  { label: 'Ninja 8-Qt DualZone Air Fryer', query: 'Ninja Foodi DualZone 8-Qt 2-Basket Air Fryer DZ201', store: "Blain's Farm & Fleet", price: 64 },
  { label: 'Husky 46" Rolling Workbench', query: 'Husky 46 in. 9-Drawer Mobile Workbench Solid Wood Top', store: 'The Home Depot', price: 219 },
  { label: 'Apple iPad 9th Gen 64GB', query: 'Apple iPad 9th Gen 10.2-inch 64GB Space Gray Wi-Fi', store: 'Best Buy', price: 139 },
  { label: 'Lodge 6-Qt Enameled Dutch Oven', query: 'Lodge 6 Quart Enameled Cast Iron Dutch Oven Red', store: 'Fleet Farm', price: 29 },
  { label: 'Stealth Cam 16MP 2-Pack', query: 'Stealth Cam Browtine 16MP Trail Camera 2-Pack Combo', store: "Theisen's Home • Farm • Auto", price: 38 },
];

export const SkuAnalyzerModal: React.FC<SkuAnalyzerModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedStore, setSelectedStore] = useState("Theisen's Home • Farm • Auto");
  const [city, setCity] = useState('Cedar Falls / Waterloo, IA');
  const [purchasePrice, setPurchasePrice] = useState<string>('59.00');
  const [category, setCategory] = useState('Power Tools & Hardware');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LiveSkuAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  if (!isOpen) return null;

  const handleAnalyze = async (customQuery?: string, customStore?: string, customPrice?: number) => {
    const q = customQuery || query;
    if (!q || q.trim() === '') {
      setError('Please enter a product title, SKU, or model number.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setResult(null);

    const priceNum = customPrice !== undefined ? customPrice : (purchasePrice ? parseFloat(purchasePrice) : undefined);

    try {
      const payload: LiveSkuAnalysisRequest = {
        query: q,
        storeName: customStore || selectedStore,
        city: city,
        purchasePrice: priceNum,
        category: category,
      };

      const res = await fetch('/api/deals/analyze-sku', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to analyze SKU.');
      }

      const data = await res.json();
      setResult(data.result);

      if (data.result.profitMarginPercent >= 50) {
        confetti({
          particleCount: 60,
          spread: 50,
          origin: { y: 0.6 },
        });
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while analyzing the SKU.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div 
        id="sku-analyzer-modal"
        className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                Live AI SKU Arbitrage & Resale Comp Engine
              </h3>
              <p className="text-xs text-slate-400">
                Scrapes comps across eBay, Amazon & Iowa Facebook Marketplace to verify 50%+ profit margin
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Quick Preset Chips */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Popular Iowa Clearance Items to Test:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_QUERIES.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(preset.query);
                    setSelectedStore(preset.store);
                    setPurchasePrice(preset.price.toString());
                    handleAnalyze(preset.query, preset.store, preset.price);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-500/20 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 text-xs border border-slate-700 transition-all text-left"
                >
                  ⚡ {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Product Query */}
              <div className="sm:col-span-8">
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Product Name / Model / SKU / Barcode UPC:
                </label>
                <div className="relative">
                  <input
                    id="input-sku-query"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. DeWalt 20V Brushless Drill DCD777 or UPC 885911467452"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAnalyze();
                    }}
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Target Buy Price */}
              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  In-Store Clearance Price ($):
                </label>
                <div className="relative">
                  <input
                    id="input-sku-price"
                    type="number"
                    step="0.01"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder="e.g. 59.00"
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Store Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Local Store (100mi Radius of Cedar Falls):
                </label>
                <select
                  id="select-sku-store"
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="Theisen's Home • Farm • Auto">Theisen's Home • Farm • Auto (Waterloo / Cedar Falls)</option>
                  {IOWA_STORES.slice(0, 40).map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.city}, {s.distanceMiles}mi)
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Button */}
              <div className="flex items-end">
                <button
                  id="btn-run-sku-analysis"
                  onClick={() => handleAnalyze()}
                  disabled={isLoading}
                  className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Cross-Referencing Secondary Comps...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>Evaluate 50%+ Profit & Comps</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* Top Verdict Banner */}
              <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 ${
                result.profitMarginPercent >= 50 
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' 
                  : 'bg-amber-950/40 border-amber-500/50 text-amber-300'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${
                    result.profitMarginPercent >= 50 ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'
                  }`}>
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider block">
                      Arbitrage Valuation Verdict:
                    </span>
                    <strong className="text-lg font-black text-white">
                      {result.verdict} (+{result.profitMarginPercent.toFixed(1)}% NET ROI)
                    </strong>
                  </div>
                </div>

                <div className="text-right font-mono text-sm">
                  <span className="text-slate-400 block text-xs">Estimated Take-Home:</span>
                  <strong className="text-emerald-400 text-xl font-black">+${result.netProfit.toFixed(2)}</strong>
                </div>
              </div>

              {/* 4-Stat Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Buy Price</span>
                  <div className="text-xl font-extrabold text-white mt-1">
                    ${result.estimatedStorePrice.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-slate-400 line-through">
                    MSRP ${result.originalRetailPrice.toFixed(2)}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">eBay Sold Comp</span>
                  <div className="text-xl font-extrabold text-amber-300 mt-1">
                    ${result.ebaySoldMedian.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Amazon: ${result.amazonPrice.toFixed(2)}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Iowa FB Market</span>
                  <div className="text-xl font-extrabold text-emerald-400 mt-1">
                    ${result.fbMarketplaceIowaMedian.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-emerald-400/80">
                    0% Fees (Cash)
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Flip Velocity</span>
                  <div className="text-xl font-extrabold text-blue-400 mt-1">
                    {result.flipVelocityDays} Days
                  </div>
                  <span className="text-[10px] text-blue-300">
                    {result.velocityRating}
                  </span>
                </div>
              </div>

              {/* Ghost Stock & Feasibility Insight */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-slate-200">
                    {result.ghostStockRisk < 25 ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                    )}
                    <span>Ghost Stock & In-Store Feasibility Audit:</span>
                  </div>
                  <span className={`font-mono font-bold ${
                    result.ghostStockRisk < 25 ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {result.ghostStockRisk}% Risk
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {result.ghostStockNotes}
                </p>
                <p className="text-slate-400 text-[11px] pt-1">
                  {result.comparableItemsSummary}
                </p>
              </div>

              {/* Ready-to-Copy Listing Pitch */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Ready-to-Post Facebook Marketplace Listing:
                  </span>
                  <button
                    onClick={() => handleCopy(
                      `${result.salesPitchListingTitle}\n\nPrice: $${result.fbMarketplaceIowaMedian}\n\n${result.listingDescription}`,
                      'fb_listing'
                    )}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                  >
                    {copiedSection === 'fb_listing' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Complete Listing</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200 space-y-2">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Listing Title:</span>
                    <span className="font-semibold text-white">{result.salesPitchListingTitle}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Suggested Cash Price:</span>
                    <span className="font-semibold text-emerald-400">${result.fbMarketplaceIowaMedian.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Description:</span>
                    <p className="text-slate-300 text-[11px] whitespace-pre-wrap">{result.listingDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Powered by Gemini 3.7 Flash & live Iowa market grounding</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
