import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Printer, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Store, 
  Tag, 
  Coins, 
  Navigation, 
  Share2, 
  PackageCheck,
  ShieldAlert,
  HelpCircle,
  Clock,
  MapPin,
  Flame,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import jsPDF from 'jspdf';

export const UserManual: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('all');

  const handleDownloadPdf = () => {
    setIsExporting(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 40;
      const contentWidth = pageWidth - margin * 2;
      let y = 50;

      // Helper function to check page overflow
      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > doc.internal.pageSize.getHeight() - 50) {
          doc.addPage();
          y = 50;
          // Add header on new pages
          doc.setFontSize(8);
          doc.setTextColor(130, 130, 130);
          doc.text('IOWA RETAIL ARBITRAGE & HIDDEN CLEARANCE FINDER — USER MANUAL', margin, 30);
          doc.line(margin, 35, pageWidth - margin, 35);
          doc.setTextColor(30, 30, 30);
        }
      };

      // Title & Header Banner
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, pageWidth, 90, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(245, 158, 11); // Amber
      doc.text('IOWA RETAIL ARBITRAGE & CLEARANCE FINDER', margin, 40);

      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.text('Official User Manual & Operational Field Playbook', margin, 58);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(203, 213, 225);
      doc.text('Center Hub: Cedar Falls / Waterloo, IA (50613) • 100-Mile Radius • 102 Retail Stores', margin, 74);

      y = 115;

      // Section 1: Executive Overview
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text('1. Executive Overview & System Architecture', margin, y);
      y += 18;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      const text1 = `This software is a local retail arbitrage and hidden clearance intelligence platform built specifically for the Cedar Falls, Iowa market and its 100-mile retail radius (encompassing Waterloo, Waverly, Cedar Rapids, Coralville, Iowa City, Williamsburg, and Ankeny).

The system continuously scans and aggregates unadvertised manager markdowns, end-of-lifecycle inventory, and clearance price drops across 102 stores, matching them against live secondary market comps (eBay Sold past 30 days, Amazon BuyBox, and local Iowa Facebook Marketplace) to ensure a minimum 50% net cash profit margin after platform fees, shipping, and driving fuel costs.`;
      const splitText1 = doc.splitTextToSize(text1, contentWidth);
      doc.text(splitText1, margin, y);
      y += splitText1.length * 13 + 15;

      // Section 2: The 3-Step Arbitrage Routine
      checkPageBreak(120);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text('2. The 3-Step Daily Operational Routine', margin, y);
      y += 18;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);

      const routineSteps = [
        'Step 1: Check the 50%+ Deals Grid & AI Radar — Open the app in the morning or while driving near retail hubs to identify verified clearance drops in high-velocity categories (Power Tools, Tech, Small Furniture, Farm & Outdoor).',
        'Step 2: In-Store Physical Pickup — Navigate to the target store (e.g., Theisen\'s Waterloo, Blain\'s Cedar Falls, Home Depot) and locate the physical item on clearance endcaps or yellow-tagged shelves.',
        'Step 3: 1-Click Listing & Cash Out — Click "1-Click Listing" to copy pre-formatted Facebook Marketplace or eBay listing drafts. Post the item for quick cash meetup in the Cedar Valley or nationwide parcel shipping.',
      ];

      routineSteps.forEach((step) => {
        checkPageBreak(35);
        const split = doc.splitTextToSize(step, contentWidth - 10);
        doc.setFillColor(245, 158, 11);
        doc.circle(margin + 3, y - 4, 3, 'F');
        doc.text(split, margin + 12, y);
        y += split.length * 13 + 8;
      });

      y += 10;

      // Section 3: Tag Decoders Table
      checkPageBreak(160);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text('3. Retail Price Ending & Tag Decryption Matrix', margin, y);
      y += 18;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, y, contentWidth, 20, 'F');
      doc.setTextColor(15, 23, 42);
      doc.text('Store / Retailer', margin + 8, y + 14);
      doc.text('Tag Ending / Code', margin + 110, y + 14);
      doc.text('Internal Meaning & Action', margin + 220, y + 14);
      y += 24;

      const tagData = [
        ['The Home Depot', '.06 Ending', 'First markdown phase. Sits 6 weeks before dropping.'],
        ['The Home Depot', '.03 Ending', 'Final markdown (75% off). 3 weeks until $0.01 pull. BEST BUY.'],
        ['Target', '.04 or .00', 'Rock bottom clearance (70-90% off). High flip margin.'],
        ['Target', '.06 or .08', 'Item will drop further in the next bi-weekly cycle.'],
        ['Costco Wholesale', '.97 Ending', 'Manager clearance below wholesale cost.'],
        ['Costco Wholesale', 'Asterisk (*)', 'Discontinued item ("Death Star"). Never restocked.'],
        ['Dollar General', 'Tuesday 1¢ POS', 'Automated register markdown on seasonal items.'],
        ['Theisen\'s Home Auto', 'Orange Tag', 'Manager store markdown in power tools, hunting, farm.'],
        ['Menards', 'Ray\'s List (Green)', 'Open-box / return marked down 40-75% + 11% rebate eligible.'],
      ];

      doc.setFont('helvetica', 'normal');
      tagData.forEach(([store, code, meaning]) => {
        checkPageBreak(22);
        doc.setFillColor(255, 255, 255);
        doc.rect(margin, y, contentWidth, 18, 'F');
        doc.setDrawColor(226, 232, 240);
        doc.line(margin, y + 18, margin + contentWidth, y + 18);
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.text(store, margin + 8, y + 12);
        doc.setTextColor(180, 83, 9); // amber-700
        doc.text(code, margin + 110, y + 12);
        doc.setTextColor(71, 85, 105);
        doc.setFont('helvetica', 'normal');
        doc.text(meaning, margin + 220, y + 12);
        y += 20;
      });

      y += 15;

      // Section 4: Ghost Stock Safety
      checkPageBreak(130);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text('4. The Ghost-Stock Reality Check', margin, y);
      y += 18;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      const ghostText = `Why 95% of viral 1-cent penny lists are phantom stock:
1. Shrinkage & Theft: When an inventory system lists 1 or 2 penny items in stock, they are frequently stolen or broken units never removed from corporate databases.
2. Backroom Compactor Pallets: Once an item hits 1 cent, retail staff are instructed to pull it to salvage/trash bins. The system shows inventory until the pallet truck departs.
3. The Profitable Solution: Target 50% to 75% physical clearance tags (.03 tags at Home Depot, orange tags at Theisen's, yellow tags at Blain's). These physically sit on shelves, avoiding wasted trips.`;
      const splitGhost = doc.splitTextToSize(ghostText, contentWidth);
      doc.text(splitGhost, margin, y);
      y += splitGhost.length * 13 + 15;

      // Section 5: Store Registry
      checkPageBreak(130);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text('5. 102 Store Regional Registry & Weekly Markdown Days', margin, y);
      y += 18;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      const storeText = `The application tracks 102 verified stores grouped across 11 key retail tiers:
• Tier 1: Mega-Retailers (Walmart, Target, Costco, Sam's Club, Blain's, Fleet Farm, Menards, Home Depot, Lowe's, At Home)
• Tier 2: Home Improvement & Hardware (Northern Tool, Ace Hardware, True Value, Harbor Freight, Runnings, Theisen's)
• Tier 3: Supermarket Chains (Hy-Vee, Fareway, ALDI, Trader Joe's)
• Tier 4: Department & Softlines (Sierra, TJ Maxx, Marshalls, Kohl's, Ross, Burlington, Von Maur)
• Tier 5: Sporting Goods & Auto (Scheels, Bass Pro, Cabela's, AutoZone, O'Reilly)
• Tier 6: Electronics & Books (Best Buy, Barnes & Noble, Michaels, JOANN)
• Tier 7: Value & Dollar Stores (Dollar General, Dollar Tree, Family Dollar, Big Lots, Ollie's Bargain Outlet)
• Tiers 8–11: Beauty, Furniture, Footwear & Outlets (Ulta, Slumberland, DSW, Tanger Outlets Williamsburg)

Weekly Markdown Schedule:
- Monday: Electronics, Kids Apparel, Hardware markdowns begin.
- Tuesday: Dollar General weekly penny drops; Target Women's & Domestics.
- Wednesday: Target Men's, Health/Beauty; Menards Ray's List refresh.
- Thursday: Housewares, Sporting Goods, Toys markdowns.
- Friday: Hardware, Auto, and seasonal weekend clearance tag resets.`;
      const splitStore = doc.splitTextToSize(storeText, contentWidth);
      doc.text(splitStore, margin, y);
      y += splitStore.length * 13 + 15;

      // Section 6: AI SKU Scanner & Comps Math
      checkPageBreak(130);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text('6. AI SKU Valuation & Resale Comp Mathematics', margin, y);
      y += 18;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      const mathText = `The embedded AI Valuation engine calculates exact take-home cash:
• Net Profit (eBay) = Sold Comp Price - Buy Cost - (Comp Price * 13% eBay/PayPal Fee) - Est. Shipping Box Cost
• Net Profit (FB Marketplace) = Local Cash Selling Price - Buy Cost - $0.00 Platform Fees
• Net Margin ROI % = (Net Profit / Buy Cost) * 100
• Flip Velocity Rating: Evaluates average days to sell based on sales volume in the past 30 days.`;
      const splitMath = doc.splitTextToSize(mathText, contentWidth);
      doc.text(splitMath, margin, y);
      y += splitMath.length * 13 + 15;

      // Section 7: Trip Optimizer & Multi-Store Routes
      checkPageBreak(130);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text('7. Multi-Store Trip & Fuel Cost Optimization', margin, y);
      y += 18;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      const tripText = `Pre-configured driving loops starting from Cedar Falls (50613):
1. Cedar Valley Local Sprint (18.5 miles roundtrip): Theisen's, Blain's, Home Depot, Walmart, Big Lots. Fuel cost: ~$2.60.
2. Hwy 218 South to Cedar Rapids (64 miles): Northern Tool, Sierra Trading Post, Target, Ollie's. Fuel cost: ~$8.95.
3. Coralville & Iowa City Hub (88 miles): Costco, Barnes & Noble, Scheels, Ollie's. Fuel cost: ~$12.30.
4. Iowa Weekend Circuit (142 miles): Complete 6-store high-margin sweep. Fuel cost: ~$19.80.`;
      const splitTrip = doc.splitTextToSize(tripText, contentWidth);
      doc.text(splitTrip, margin, y);
      y += splitTrip.length * 13 + 15;

      // Section 8: Listing Playbook & Etiquette
      checkPageBreak(130);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text('8. Resale Listing Playbook & Safe Meetup Protocol', margin, y);
      y += 18;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      const listingText = `• Facebook Marketplace Best Practices: Always list items as "Brand New In Box (NIB) Factory Sealed". Mention original retail price to highlight the discount.
• Recommended Local Safe Meetup Spots:
  1. Cedar Falls Target Parking Lot (University Ave)
  2. Cedar Falls Police Department Safe Exchange Zone
  3. Waterloo Crossroads Mall / Hy-Vee Parking Lot
• Cash Only for Local Pickup: Never accept unverified electronic checks or advance shipping codes. Cash in hand upon inspection ensures zero fraud.`;
      const splitListing = doc.splitTextToSize(listingText, contentWidth);
      doc.text(splitListing, margin, y);
      y += splitListing.length * 13 + 25;

      // Footer signature
      checkPageBreak(40);
      doc.setDrawColor(203, 213, 225);
      doc.line(margin, y, pageWidth - margin, y);
      y += 15;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text('Generated by Iowa Retail Arbitrage & Hidden Clearance Finder • Version 2.4 Production Edition', margin, y);

      // Save PDF file
      doc.save('Iowa_Retail_Arbitrage_User_Manual.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1320] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              Official User Manual & Field Playbook
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Complete operational guide for retail arbitrage, tag decoding, and 50%+ profit flips in Iowa
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-download-manual-pdf"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg active:scale-95 transition-all disabled:opacity-50 font-display"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>{isExporting ? 'Generating PDF...' : 'Export as PDF Document'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#07090e] hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-800 transition-all"
          >
            <Printer className="w-4 h-4 text-slate-300" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Interactive Manual Document Viewer */}
      <div className="rounded-3xl bg-[#0e1320] border border-slate-800 overflow-hidden shadow-2xl">
        {/* Table of Contents Header */}
        <div className="px-6 py-4 bg-[#07090e] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Table of Contents (Jump to Section):
          </span>
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => setActiveSection('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeSection === 'all' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white bg-[#0e1320] border border-slate-800'
              }`}
            >
              Full Manual
            </button>
            <button
              onClick={() => setActiveSection('routine')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeSection === 'routine' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white bg-[#0e1320] border border-slate-800'
              }`}
            >
              3-Step Routine
            </button>
            <button
              onClick={() => setActiveSection('tags')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeSection === 'tags' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white bg-[#0e1320] border border-slate-800'
              }`}
            >
              Tag Decoders
            </button>
            <button
              onClick={() => setActiveSection('ghost')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeSection === 'ghost' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white bg-[#0e1320] border border-slate-800'
              }`}
            >
              Ghost Stock Audit
            </button>
            <button
              onClick={() => setActiveSection('stores')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeSection === 'stores' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white bg-[#0e1320] border border-slate-800'
              }`}
            >
              102 Stores & Days
            </button>
            <button
              onClick={() => setActiveSection('playbook')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeSection === 'playbook' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white bg-[#0e1320] border border-slate-800'
              }`}
            >
              Listing Playbook
            </button>
          </div>
        </div>

        {/* Manual Content Area */}
        <div className="p-6 sm:p-8 space-y-8 text-slate-200 leading-relaxed text-sm">
          {/* SECTION 1: OVERVIEW */}
          {(activeSection === 'all' || activeSection === 'routine') && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <span className="p-1 rounded-md bg-amber-400/10 text-amber-400 font-mono text-xs font-bold">01</span>
                <h3 className="text-lg font-extrabold text-white font-display">System Architecture & The 3-Step Daily Routine</h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm">
                The software functions as an automated intelligence radar scanning 102 verified retail stores across a 100-mile radius of Cedar Falls, IA. It continuously cross-references in-store clearance prices against historical eBay Sold comps (past 30 days), Amazon BuyBox, and local Iowa Facebook Marketplace medians to identify items with verified 50%+ net cash profit margins.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-[#07090e] border border-slate-800 space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-amber-400 text-xs font-display">
                    <span className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300">1</span>
                    <span>Browse Radar / Scan SKU</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Check the 50%+ Deals Grid for active local markdowns, or enter any product/barcode in the AI Scanner while standing in a store aisle.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#07090e] border border-slate-800 space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-amber-400 text-xs font-display">
                    <span className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300">2</span>
                    <span>Physically Sourced</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Visit the store (e.g., Theisen's Waterloo or Blain's Cedar Falls) and grab the item from the designated clearance endcap.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#07090e] border border-slate-800 space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-emerald-400 text-xs font-display">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300">3</span>
                    <span>1-Click List & Cash Out</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Click "1-Click Listing" to copy pre-formatted Facebook Marketplace or eBay text, post the listing, and pocket cash profit.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* SECTION 2: TAG DECODERS */}
          {(activeSection === 'all' || activeSection === 'tags') && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <span className="p-1 rounded-md bg-amber-400/10 text-amber-400 font-mono text-xs font-bold">02</span>
                <h3 className="text-lg font-extrabold text-white font-display">Retail Price Ending & Tag Decryption Matrix</h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm">
                Retail store managers and corporate computer systems encode markdown cycles into the last two digits of the price tag:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#07090e] text-slate-400 uppercase font-bold border-b border-slate-800 font-mono">
                    <tr>
                      <th className="p-3.5">Retailer</th>
                      <th className="p-3.5">Price Ending / Tag</th>
                      <th className="p-3.5">Lifecycle Meaning</th>
                      <th className="p-3.5">Flipping Strategy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-[#0e1320]">
                    <tr>
                      <td className="p-3.5 font-bold text-white">The Home Depot</td>
                      <td className="p-3.5 font-mono text-amber-300 font-bold">.06 Ending (Yellow)</td>
                      <td className="p-3.5 text-slate-300">First clearance markdown; sits 6 weeks</td>
                      <td className="p-3.5 text-slate-400">Monitor for next drop</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">The Home Depot</td>
                      <td className="p-3.5 font-mono text-emerald-400 font-bold">.03 Ending (Yellow)</td>
                      <td className="p-3.5 text-slate-300">Final clearance (75% off); 3 weeks until pull</td>
                      <td className="p-3.5 text-emerald-400 font-bold">PRIMARY BUY TARGET</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Target</td>
                      <td className="p-3.5 font-mono text-emerald-400 font-bold">.04 or .00 Ending</td>
                      <td className="p-3.5 text-slate-300">Rock-bottom markdown (70–90% off)</td>
                      <td className="p-3.5 text-emerald-400 font-bold">Instant Buy</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Costco Wholesale</td>
                      <td className="p-3.5 font-mono text-blue-400 font-bold">.97 Ending / Asterisk (*)</td>
                      <td className="p-3.5 text-slate-300">Manager closeout; discontinued permanently</td>
                      <td className="p-3.5 text-slate-300">Bulk flip opportunity</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Dollar General</td>
                      <td className="p-3.5 font-mono text-purple-400 font-bold">Tuesday 1¢ POS Drop</td>
                      <td className="p-3.5 text-slate-300">Automated system clearance purge</td>
                      <td className="p-3.5 text-purple-300 font-bold">Tuesday morning cart search</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-white">Theisen's Home Auto</td>
                      <td className="p-3.5 font-mono text-amber-300 font-bold">Orange Tag</td>
                      <td className="p-3.5 text-slate-300">Manager store markdown in tools & farm</td>
                      <td className="p-3.5 text-emerald-400 font-bold">High resale velocity in IA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* SECTION 3: GHOST STOCK */}
          {(activeSection === 'all' || activeSection === 'ghost') && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <span className="p-1 rounded-md bg-amber-400/10 text-amber-400 font-mono text-xs font-bold">03</span>
                <h3 className="text-lg font-extrabold text-white font-display">The Ghost Stock Reality & Physical Feasibility</h3>
              </div>
              
              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed space-y-2.5">
                <div className="font-bold text-amber-400 flex items-center gap-2 text-sm font-display">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Why you must never chase 1-cent database lists blindly:</span>
                </div>
                <p>
                  1-cent items in retail systems are not promotions; they are internal disposal flags telling employees to pull items for trash compactors or Return-To-Vendor (RTV) pallets. 9 times out of 10, a store showing 1 unit of a 1-cent item on an inventory database is <strong>phantom stock (theft, broken, or already tossed)</strong>.
                </p>
                <p>
                  <strong>The Winning Strategy:</strong> Target <strong>50% to 75% physical clearance tags</strong> (like Theisen's orange tags or Home Depot .03 tags). These items sit on real store shelves, are fully approved for cashier checkout, and produce reliable $50 to $160+ cash profit per item.
                </p>
              </div>
            </section>
          )}

          {/* SECTION 4: 102 STORES & MARKDOWNS */}
          {(activeSection === 'all' || activeSection === 'stores') && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <span className="p-1 rounded-md bg-amber-400/10 text-amber-400 font-mono text-xs font-bold">04</span>
                <h3 className="text-lg font-extrabold text-white font-display">102 Store Registry & Weekly Markdown Calendars</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="p-4 rounded-2xl bg-[#07090e] border border-slate-800">
                  <span className="font-bold text-white block mb-1 font-display">Monday Markdowns:</span>
                  <span className="text-slate-400">Electronics, Kids Apparel, Hardware endcaps. Home Depot price tag audits.</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#07090e] border border-slate-800">
                  <span className="font-bold text-amber-300 block mb-1 font-display">Tuesday (Golden Day):</span>
                  <span className="text-slate-400">Dollar General 1¢ weekly drops. Target Women's apparel, Domestics & Home Goods.</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#07090e] border border-slate-800">
                  <span className="font-bold text-white block mb-1 font-display">Wednesday Markdowns:</span>
                  <span className="text-slate-400">Target Men's apparel, Health & Beauty, Garden. Menards Ray's List audits.</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#07090e] border border-slate-800">
                  <span className="font-bold text-white block mb-1 font-display">Thursday / Friday:</span>
                  <span className="text-slate-400">Sporting Goods, Toys, Hardware tools, Auto accessories tag resets for the weekend.</span>
                </div>
              </div>
            </section>
          )}

          {/* SECTION 5: LISTING PLAYBOOK */}
          {(activeSection === 'all' || activeSection === 'playbook') && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <span className="p-1 rounded-md bg-amber-400/10 text-amber-400 font-mono text-xs font-bold">05</span>
                <h3 className="text-lg font-extrabold text-white font-display">Resale Listing & Safe Local Meetup Playbook</h3>
              </div>

              <div className="p-5 rounded-2xl bg-[#07090e] border border-slate-800 space-y-3.5 text-xs">
                <div className="font-bold text-white font-display text-sm">Safe Public Exchange Spots in Cedar Falls / Waterloo:</div>
                <ul className="list-disc list-inside space-y-2 text-slate-300 leading-relaxed">
                  <li><strong>Cedar Falls Police Department Safe Exchange Zone</strong> (Directly outside station with 24/7 surveillance).</li>
                  <li><strong>Cedar Falls Target / Hy-Vee Parking Lot</strong> (University Ave — well-lit, high daytime foot traffic).</li>
                  <li><strong>Waterloo Crossroads Mall / Home Depot Area</strong> (Convenient for Cedar Valley buyers).</li>
                </ul>
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
                  💡 <strong>Pro Tip:</strong> Always specify <em>"Cash in hand upon pickup"</em>. Serious buyers will gladly meet in public for a 30-40% discount off retail MSRP.
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#07090e] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>Iowa Retail Arbitrage & Hidden Clearance Finder • Field Manual v2.4</span>
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Click to Download Full PDF Document</span>
          </button>
        </div>
      </div>
    </div>
  );
};
