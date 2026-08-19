import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink, 
  DollarSign, 
  MapPin, 
  Sparkles,
  ShoppingBag,
  Package
} from 'lucide-react';
import { DealItem } from '../types';

interface ListingModalProps {
  deal: DealItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ListingModal: React.FC<ListingModalProps> = ({
  deal,
  isOpen,
  onClose,
}) => {
  const [platform, setPlatform] = useState<'fb' | 'ebay'>('fb');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen || !deal) return null;

  const fbListing = deal.listingTemplates.facebookMarketplace;
  const ebayListing = deal.listingTemplates.ebay;

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const fullFbPost = `${fbListing.title}\n\nPrice: $${fbListing.price}\n\n${fbListing.description}\n\n📍 Pickup in Cedar Falls / Waterloo, IA.\nCondition: Brand New In Box (Factory Sealed)`;

  const fullEbayPost = `Title: ${ebayListing.title}\nBuy It Now Price: $${ebayListing.price}\n\nDescription:\n${ebayListing.description}\n\nShips fast via USPS Priority Mail with tracking.`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div 
        id="listing-modal"
        className="relative w-full max-w-2xl rounded-3xl bg-[#0e1320] border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#07090e] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white font-display">
                1-Click Resale Listing Generator
              </h3>
              <p className="text-xs text-slate-400">
                Pre-formatted, SEO-optimized listing text for rapid turnaround
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Tabs */}
        <div className="flex items-center gap-2 px-6 py-3.5 bg-[#07090e]/60 border-b border-slate-800 text-xs">
          <button
            onClick={() => setPlatform('fb')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              platform === 'fb'
                ? 'bg-blue-600 text-white shadow-md font-extrabold'
                : 'bg-[#0e1320] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Facebook Marketplace (Local Cash)
          </button>
          <button
            onClick={() => setPlatform('ebay')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              platform === 'ebay'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'bg-[#0e1320] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            eBay (Shipped Nationwide)
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Target Item summary */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#07090e] border border-slate-800">
            <img 
              src={deal.imageUrl} 
              alt={deal.title} 
              className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-slate-800"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-xs text-white truncate font-display">{deal.title}</h4>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                <span>Bought for: <strong className="text-white font-mono">${deal.inStorePrice.toFixed(2)}</strong></span>
                <span>Expected Profit: <strong className="text-emerald-400 font-mono font-bold">+${deal.netProfit.toFixed(2)}</strong></span>
              </div>
            </div>
          </div>

          {/* Facebook Marketplace Format */}
          {platform === 'fb' && (
            <div className="space-y-4">
              {/* Copy Full Listing Button */}
              <button
                onClick={() => handleCopyText(fullFbPost, 'full_fb')}
                className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {copiedKey === 'full_fb' ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Copied Full FB Marketplace Listing!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Complete Listing to Clipboard</span>
                  </>
                )}
              </button>

              <div className="p-4 rounded-2xl bg-[#07090e] border border-slate-800 space-y-3.5 text-xs">
                {/* Title */}
                <div>
                  <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold mb-1 font-mono">
                    <span>Listing Title</span>
                    <button
                      onClick={() => handleCopyText(fbListing.title, 'fb_title')}
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      {copiedKey === 'fb_title' ? 'Copied' : 'Copy Title'}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0e1320] border border-slate-800 text-white font-semibold">
                    {fbListing.title}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold mb-1 font-mono">
                    <span>Cash Price</span>
                    <button
                      onClick={() => handleCopyText(fbListing.price.toString(), 'fb_price')}
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      {copiedKey === 'fb_price' ? 'Copied' : 'Copy Price'}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0e1320] border border-slate-800 text-emerald-400 font-mono font-bold text-base">
                    ${fbListing.price.toFixed(2)}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold mb-1 font-mono">
                    <span>Description</span>
                    <button
                      onClick={() => handleCopyText(fbListing.description, 'fb_desc')}
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      {copiedKey === 'fb_desc' ? 'Copied' : 'Copy Description'}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0e1320] border border-slate-800 text-slate-300 whitespace-pre-wrap font-sans text-xs leading-relaxed">
                    {fbListing.description}
                  </div>
                </div>

                {/* Suggested Pickup Location */}
                <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 text-blue-300 text-xs">
                  💡 <strong>Suggested Public Meetup Spot:</strong> Cedar Falls Target parking lot (University Ave) or Cedar Falls Police Department safe exchange zone.
                </div>
              </div>
            </div>
          )}

          {/* eBay Format */}
          {platform === 'ebay' && (
            <div className="space-y-4">
              <button
                onClick={() => handleCopyText(fullEbayPost, 'full_ebay')}
                className="w-full py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {copiedKey === 'full_ebay' ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>Copied eBay Listing!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-950" />
                    <span>Copy Full eBay Listing Text</span>
                  </>
                )}
              </button>

              <div className="p-4 rounded-2xl bg-[#07090e] border border-slate-800 space-y-3.5 text-xs">
                <div>
                  <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold mb-1 font-mono">
                    <span>eBay 80-Char Optimized Title</span>
                    <button
                      onClick={() => handleCopyText(ebayListing.title, 'ebay_title')}
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      {copiedKey === 'ebay_title' ? 'Copied' : 'Copy Title'}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0e1320] border border-slate-800 text-white font-semibold">
                    {ebayListing.title}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold mb-1 font-mono">
                    <span>Buy It Now Price</span>
                    <button
                      onClick={() => handleCopyText(ebayListing.price.toString(), 'ebay_price')}
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      {copiedKey === 'ebay_price' ? 'Copied' : 'Copy Price'}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0e1320] border border-slate-800 text-amber-400 font-mono font-bold text-base">
                    ${ebayListing.price.toFixed(2)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold mb-1 font-mono">
                    <span>Item Description</span>
                    <button
                      onClick={() => handleCopyText(ebayListing.description, 'ebay_desc')}
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      {copiedKey === 'ebay_desc' ? 'Copied' : 'Copy Description'}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0e1320] border border-slate-800 text-slate-300 whitespace-pre-wrap font-sans text-xs leading-relaxed">
                    {ebayListing.description}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#07090e] border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">Ready to paste into Facebook Marketplace or eBay Seller Hub</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
