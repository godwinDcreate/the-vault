import React, { useState } from 'react';
import { 
  Coins, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Zap, 
  Store, 
  Sparkles,
  Info
} from 'lucide-react';

export const PennyItemHUD: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'codes' | 'ghost_reality' | 'dg_system' | 'checkout_rules'>('codes');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/40">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">
                The Penny Item & Hidden Clearance Protocol
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                Truth & Strategy HUD
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Demystifying viral $0.01 glitch videos, explaining internal retail markdown systems, eliminating phantom ghost inventory wasted trips, and maximizing 50%+ profit real-world arbitrage.
            </p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-purple-500/20 text-xs">
          <button
            onClick={() => setActiveTab('codes')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'codes'
                ? 'bg-purple-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            🏷️ Price Ending Decoders
          </button>
          <button
            onClick={() => setActiveTab('ghost_reality')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'ghost_reality'
                ? 'bg-purple-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            👻 "Ghost Stock" Reality Check
          </button>
          <button
            onClick={() => setActiveTab('dg_system')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'dg_system'
                ? 'bg-purple-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            🛒 Dollar General Tuesday Drops
          </button>
          <button
            onClick={() => setActiveTab('checkout_rules')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'checkout_rules'
                ? 'bg-purple-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            💳 Store POS Policies & Cashier Rules
          </button>
        </div>
      </div>

      {/* Tab 1: Price Ending Decoders */}
      {activeTab === 'codes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Home Depot */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-amber-400">The Home Depot Price Ending Codes</span>
              <span className="text-[10px] font-mono text-slate-400">Yellow Tag System</span>
            </div>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <strong className="text-white font-mono">.06 Ending (e.g. $14.06):</strong> First yellow clearance markdown. Item will sit for 6 weeks before dropping again.
              </li>
              <li className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <strong className="text-amber-300 font-mono">.03 Ending (e.g. $7.03):</strong> Final markdown stage (typically 75% off). Will sit 3 weeks before automated drop to $0.01. Best time to buy before pull!
              </li>
              <li className="p-2 rounded-lg bg-purple-950/30 border border-purple-500/30">
                <strong className="text-purple-300 font-mono">$0.01 Penny Drop:</strong> Internal flag instructing Merchandising Execution Team (MET) to discard or return to vendor (RTV).
              </li>
            </ul>
          </div>

          {/* Target */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-red-400">Target Markdown Tag Matrix</span>
              <span className="text-[10px] font-mono text-slate-400">Small Yellow Square</span>
            </div>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <strong className="text-white font-mono">Top Right Number (15, 30, 50, 70, 90):</strong> Exact discount percentage off original retail MSRP.
              </li>
              <li className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <strong className="text-white font-mono">.06 / .08 Endings:</strong> Item will be marked down further in next bi-weekly cycle.
              </li>
              <li className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                <strong className="text-emerald-300 font-mono">.04 or .00 Endings:</strong> Rock bottom final markdown. 70-90% off. High flip profit!
              </li>
            </ul>
          </div>

          {/* Costco */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-blue-400">Costco Wholesale Price Signs</span>
              <span className="text-[10px] font-mono text-slate-400">Coralville / Regional</span>
            </div>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <strong className="text-white font-mono">.99 Ending:</strong> Standard everyday retail regular price.
              </li>
              <li className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                <strong className="text-emerald-300 font-mono">.97 Ending:</strong> Manager clearance markdown (often below wholesale cost).
              </li>
              <li className="p-2 rounded-lg bg-amber-950/30 border border-amber-500/30">
                <strong className="text-amber-300 font-mono">Asterisk (*) in Top Right:</strong> "Death Star" — discontinued item, will never be restocked.
              </li>
            </ul>
          </div>

          {/* Menards */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-emerald-400">Menards Ray's List & 11% Rebate Stack</span>
              <span className="text-[10px] font-mono text-slate-400">Cedar Falls Store</span>
            </div>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <strong className="text-white font-mono">Ray's List Green Tag:</strong> Open-box, display model, or customer return marked down 40-75%.
              </li>
              <li className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <strong className="text-emerald-300 font-mono">11% Rebate Stack:</strong> Menards 11% mail-in rebate applies even on deep clearance Ray's List items.
              </li>
              <li className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                <strong className="text-white font-mono">Overstock Blue Tag:</strong> Bulk warehouse closeout in building materials and electrical.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: Ghost Stock Reality Check */}
      {activeTab === 'ghost_reality' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Why 95% of Viral "Penny Item" Lists Are Phantom Inventory (Ghost Stock)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-red-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" />
                <span>1. Retail "Shrinkage" & Theft</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                When an inventory database says 1 or 2 items are in stock for $0.01, 9 times out of 10 that item was stolen, broken, or miscounted months ago and never officially written off by store auditors.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-red-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" />
                <span>2. Backroom Compactor Pallets</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                When items penny out, stock associates immediately pull them into salvage carts destined for trash compactors or Return-To-Vendor (RTV) pallets. The system still reflects on-hand stock until trucks depart.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>3. The Real 50%+ Arbitrage Strategy</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Instead of chasing 1¢ phantoms, target <strong>50%–75% physical clearance tags</strong> (e.g. Theisen's orange tags, Home Depot .03, Target .04). They actually exist on shelves and produce reliable $50-$150 cash profit per flip.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Dollar General System */}
      {activeTab === 'dg_system' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <span>Dollar General: The Undisputed King of Volume Penny Drops</span>
          </h3>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-amber-300 block mb-1">Why Dollar General has more penny items than any other chain:</strong>
              Dollar General stores rotate hundreds of seasonal items (Halloween, Christmas, Summer pool, housewares, apparel) with minimal store staffing (often 1-2 workers per shift). When items hit the end of their markdown cycle, corporate registers automatically drop them to $0.01 every <strong>Tuesday morning</strong>.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-white block mb-1">The Symbol / Dot System:</span>
                DG uses colored dots and shapes (Brown Dot, Pink Square, Blue Star) on apparel and home tags. Each symbol follows a scheduled countdown from 25% → 50% → 70% → 90% → 1¢.
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-white block mb-1">In-Store Scanning Secret:</span>
                Use the official Dollar General App's barcode price checker set to your local store (e.g., 290 Branch St, Cedar Falls) to verify prices before reaching the cashier.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Checkout Rules & Policy */}
      {activeTab === 'checkout_rules' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Store Policies & Polite Checkout Protocol</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-300">Self-Checkout vs. Cashier Guidelines:</div>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                <li>Self-checkout registers will ring up system markdowns automatically without manager intervention (unless store POS hard-locks).</li>
                <li>Never argue with retail employees if a manager pulls a $0.01 item. Corporate policy instructs them not to sell penny items. Be polite and respectful.</li>
                <li>For 50-70% clearance items, cashiers will gladly process your purchase since they actively want clearance cleared out.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-400">Winning Flipping Etiquette:</div>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                <li>Never leave store aisles disorganized or torn apart while searching endcaps.</li>
                <li>Bundle smaller items into lots (e.g. 3-packs of kitchenware or Carhartt pants) to maximize secondary market shipping efficiency.</li>
                <li>Use Facebook Marketplace for local cash pickup on bulky items (tools, furniture, air fryers) to avoid 13% platform fees.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
