import React, { useState } from 'react';
import { 
  PackageCheck, 
  Plus, 
  DollarSign, 
  TrendingUp, 
  Trash2, 
  CheckCircle, 
  Clock, 
  MapPin,
  Sparkles,
  ShoppingBag,
  ArrowUpRight
} from 'lucide-react';
import { DealItem } from '../types';

interface TrackedFlip {
  id: string;
  title: string;
  storeName: string;
  buyPrice: number;
  expectedSoldPrice: number;
  actualSoldPrice?: number;
  status: 'Sourced' | 'Listed' | 'Sold & Paid';
  platform: 'Facebook Marketplace' | 'eBay' | 'Mercari' | 'Cash Local';
  dateAdded: string;
}

const INITIAL_FLIPS: TrackedFlip[] = [
  {
    id: 'flip-1',
    title: 'DeWalt 20V Max Brushless Drill Kit (DCD777C2)',
    storeName: "Theisen's Home • Farm • Auto (Waterloo)",
    buyPrice: 59.00,
    expectedSoldPrice: 129.00,
    actualSoldPrice: 125.00,
    status: 'Sold & Paid',
    platform: 'Facebook Marketplace',
    dateAdded: '2 days ago',
  },
  {
    id: 'flip-2',
    title: 'Ninja Foodi DualZone 8-Qt 2-Basket Air Fryer',
    storeName: "Blain's Farm & Fleet (Cedar Falls)",
    buyPrice: 64.99,
    expectedSoldPrice: 135.00,
    actualSoldPrice: 135.00,
    status: 'Sold & Paid',
    platform: 'Facebook Marketplace',
    dateAdded: 'Yesterday',
  },
  {
    id: 'flip-3',
    title: 'Milwaukee M12 3/8" Ratchet Kit (2457-20)',
    storeName: 'Northern Tool + Equipment (Cedar Rapids)',
    buyPrice: 69.00,
    expectedSoldPrice: 139.00,
    status: 'Listed',
    platform: 'eBay',
    dateAdded: 'Today',
  },
];

export const FlipTracker: React.FC = () => {
  const [flips, setFlips] = useState<TrackedFlip[]>(INITIAL_FLIPS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newStore, setNewStore] = useState("Theisen's Waterloo");
  const [newBuyPrice, setNewBuyPrice] = useState('');
  const [newExpectedPrice, setNewExpectedPrice] = useState('');
  const [newPlatform, setNewPlatform] = useState<TrackedFlip['platform']>('Facebook Marketplace');

  const totalInvested = flips.reduce((acc, f) => acc + f.buyPrice, 0);
  const totalRevenue = flips.reduce((acc, f) => acc + (f.actualSoldPrice || f.expectedSoldPrice), 0);
  const totalProfit = totalRevenue - totalInvested;
  const roi = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;
  const soldCount = flips.filter(f => f.status === 'Sold & Paid').length;

  const handleAddFlip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newBuyPrice || !newExpectedPrice) return;

    const newEntry: TrackedFlip = {
      id: `flip-${Date.now()}`,
      title: newTitle,
      storeName: newStore,
      buyPrice: parseFloat(newBuyPrice) || 0,
      expectedSoldPrice: parseFloat(newExpectedPrice) || 0,
      status: 'Listed',
      platform: newPlatform,
      dateAdded: 'Just now',
    };

    setFlips([newEntry, ...flips]);
    setNewTitle('');
    setNewBuyPrice('');
    setNewExpectedPrice('');
    setShowAddForm(false);
  };

  const handleStatusChange = (id: string, newStatus: TrackedFlip['status']) => {
    setFlips(flips.map(f => {
      if (f.id === id) {
        return {
          ...f,
          status: newStatus,
          actualSoldPrice: newStatus === 'Sold & Paid' ? (f.actualSoldPrice || f.expectedSoldPrice) : undefined
        };
      }
      return f;
    }));
  };

  const handleDelete = (id: string) => {
    setFlips(flips.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#0e1320] to-[#0e1320] border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold">
            <PackageCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              My Iowa Retail Flip Portfolio & Cash Ledger
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Log purchases from local Iowa stores, track active listings, and record realized cash in hand
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all active:scale-[0.98] self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Purchase</span>
        </button>
      </div>

      {/* Stats Bento */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-3xl bg-[#0e1320] border border-slate-800 shadow-md">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Total Sourced (Cost)</span>
          <div className="text-2xl font-black text-white mt-1 font-mono">
            ${totalInvested.toFixed(2)}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">{flips.length} items logged</span>
        </div>

        <div className="p-4 rounded-3xl bg-[#0e1320] border border-slate-800 shadow-md">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Total Revenue</span>
          <div className="text-2xl font-black text-white mt-1 font-mono">
            ${totalRevenue.toFixed(2)}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">{soldCount} items sold</span>
        </div>

        <div className="p-4 rounded-3xl bg-emerald-950/30 border border-emerald-500/40 shadow-md">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">Total Cash Profit</span>
          <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
            +${totalProfit.toFixed(2)}
          </div>
          <span className="text-[10px] text-emerald-300/80 mt-0.5 block">Pure pocket return</span>
        </div>

        <div className="p-4 rounded-3xl bg-[#0e1320] border border-slate-800 shadow-md">
          <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">Portfolio ROI</span>
          <div className="text-2xl font-black text-amber-400 mt-1 font-mono">
            +{roi.toFixed(1)}%
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">50%+ target exceeded</span>
        </div>
      </div>

      {/* Add New Flip Form */}
      {showAddForm && (
        <form onSubmit={handleAddFlip} className="p-6 rounded-3xl bg-[#0e1320] border border-slate-700/80 space-y-4 shadow-2xl animate-in fade-in duration-300">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2 font-display">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Record New Clearance Item Bought</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 text-xs">
            <div className="sm:col-span-6">
              <label className="block text-slate-300 font-bold mb-1.5">Item Title / Model:</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. DeWalt 20V Drill Kit or Ninja Air Fryer"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#07090e] border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="sm:col-span-6">
              <label className="block text-slate-300 font-bold mb-1.5">Store Purchased From:</label>
              <input
                type="text"
                value={newStore}
                onChange={e => setNewStore(e.target.value)}
                placeholder="e.g. Theisen's Waterloo or Home Depot Cedar Falls"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#07090e] border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-slate-300 font-bold mb-1.5">Buy Price ($):</label>
              <input
                type="number"
                step="0.01"
                required
                value={newBuyPrice}
                onChange={e => setNewBuyPrice(e.target.value)}
                placeholder="59.00"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#07090e] border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-slate-300 font-bold mb-1.5">Target Resale Price ($):</label>
              <input
                type="number"
                step="0.01"
                required
                value={newExpectedPrice}
                onChange={e => setNewExpectedPrice(e.target.value)}
                placeholder="129.00"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#07090e] border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-slate-300 font-bold mb-1.5">Selling Channel:</label>
              <select
                value={newPlatform}
                onChange={e => setNewPlatform(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#07090e] border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="Facebook Marketplace">Facebook Marketplace (Cash)</option>
                <option value="eBay">eBay (Shipped)</option>
                <option value="Mercari">Mercari</option>
                <option value="Cash Local">Cash Local Word-of-Mouth</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-md transition-all active:scale-95"
            >
              Save Flip to Tracker
            </button>
          </div>
        </form>
      )}

      {/* Flips Table */}
      <div className="rounded-3xl bg-[#0e1320] border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-6 py-4 bg-[#07090e] border-b border-slate-800 flex items-center justify-between">
          <span className="font-extrabold text-sm text-white font-display">Active Flip Inventory Log</span>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800">{flips.length} Records</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {flips.map((flip) => {
            const profit = (flip.actualSoldPrice || flip.expectedSoldPrice) - flip.buyPrice;
            const margin = (profit / flip.buyPrice) * 100;

            return (
              <div key={flip.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs hover:bg-[#07090e]/40 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-white font-display">{flip.title}</span>
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${
                      flip.status === 'Sold & Paid'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                    }`}>
                      {flip.status}
                    </span>
                  </div>
                  <div className="text-slate-400 flex items-center gap-3 text-xs">
                    <span>Store: <strong className="text-slate-300">{flip.storeName}</strong></span>
                    <span>•</span>
                    <span>Platform: <strong className="text-slate-300">{flip.platform}</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5">
                  <div className="text-right">
                    <div className="text-slate-400 text-[10px]">Buy → Sell</div>
                    <div className="font-mono font-semibold text-white">
                      ${flip.buyPrice.toFixed(2)} → ${ (flip.actualSoldPrice || flip.expectedSoldPrice).toFixed(2) }
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-emerald-400 font-extrabold text-sm font-mono">
                      +${profit.toFixed(2)}
                    </div>
                    <div className="text-emerald-400/80 text-[10px] font-bold font-mono">
                      +{margin.toFixed(0)}% ROI
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {flip.status !== 'Sold & Paid' && (
                      <button
                        onClick={() => handleStatusChange(flip.id, 'Sold & Paid')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 text-xs font-bold border border-emerald-500/40 transition-all active:scale-95"
                        title="Mark as Sold & Collected"
                      >
                        Mark Sold
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(flip.id)}
                      className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
