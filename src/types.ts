export type StoreTier = 
  | 'Tier 1: Mega-Retailers & Wholesale Clubs'
  | 'Tier 2: Home Improvement & Hardware'
  | 'Tier 3: Supermarket Chains'
  | 'Tier 4: Department & Softlines'
  | 'Tier 5: Sporting Goods, Outdoor & Auto'
  | 'Tier 6: Electronics, Books, Crafts'
  | 'Tier 7: Value, Variety & Dollar Stores'
  | 'Tier 8: Beauty, Health & Pharmacy'
  | 'Tier 9: Furniture & Home Furnishings'
  | 'Tier 10: Footwear Specialty'
  | 'Tier 11: Specialized & Mall Boutiques';

export type ItemCategory =
  | 'Power Tools & Hardware'
  | 'Tech & Electronics'
  | 'Small Furniture & Home Goods'
  | 'Farm, Lawn & Outdoor'
  | 'Sporting Goods & Camping'
  | 'Apparel & Footwear'
  | 'Toys, Hobbies & Gaming'
  | 'Seasonal & Variety / Dollar';

export type ArbitrageCategory = ItemCategory;

export interface Store {
  id: string;
  rank: number;
  name: string;
  tier: StoreTier;
  category: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  distanceMiles: number;
  latitude: number;
  longitude: number;
  markdownDay?: string;
  clearanceTagType?: string;
  clearanceTip?: string;
  rating?: number;
}

export interface SecondaryMarketComps {
  ebaySoldMedian: number;
  amazonBuyBox?: number;
  fbMarketplaceLocalMedian: number;
  mercariPrice?: number;
  activeEbayListingsCount?: number;
  soldPast30DaysCount?: number;
}

export interface DealItem {
  id: string;
  title: string;
  brand: string;
  sku: string;
  upc: string;
  category: ItemCategory;
  storeId: string;
  storeName: string;
  storeCity: string;
  storeAddress: string;
  storeDistanceMiles: number;
  inStorePrice: number;
  originalRetailPrice: number;
  discountPercent: number;
  isPennyItem: boolean;
  clearanceCodeType?: string; // e.g. "Yellow Tag Final Markdown", "Home Depot .03", "Target Yellow 70%", "Dollar General 1¢ POS drop", "Theisen's Orange Tag"
  secondaryMarketComps: SecondaryMarketComps;
  estShippingAndFees: number;
  netProfit: number;
  profitMarginPercent: number;
  flipVelocityDays: number;
  velocityRating: 'High Velocity (1-3 Days)' | 'Moderate (4-10 Days)' | 'Longer Hold (11-25 Days)';
  flipDifficulty: 'Easy Quick Flip' | 'Bulky / Local Only' | 'High Value Tech' | 'Everyday Fast Resell';
  ghostStockRiskScore: number; // 0-100%. High for 1c flags, Low for verified physical tags
  ghostStockExplanation: string;
  physicalVerificationStatus: 'Verified in Aisle' | 'High In-Stock Probability' | 'Clearance Tag Scanned' | 'Internal Markdown Flag (Risk of Ghost Stock)';
  bestPlatformToSell: 'Facebook Marketplace (Cedar Falls/Waterloo)' | 'eBay (Nationwide Shipping)' | 'Mercari' | 'Local Cash';
  suggestedListPrice: number;
  listingTemplates: {
    facebookMarketplace: { title: string; description: string; price: number };
    ebay: { title: string; description: string; price: number };
  };
  imageUrl: string;
  dateFound: string;
  aisleLocation?: string;
  notes?: string;
  inInventory?: boolean;
}

export interface ArbitrageScanFilter {
  searchQuery: string;
  category: string;
  maxDistanceMiles: number;
  minProfitMargin: number;
  minNetProfit: number;
  maxBuyPrice: number;
  tierFilter: string;
  sortBy: 'profitMargin' | 'netProfit' | 'distance' | 'flipVelocity' | 'priceLowToHigh' | 'ghostRiskLow';
  pennyItemsOnly: boolean;
  verifiedOnly: boolean;
}

export interface LiveSkuAnalysisRequest {
  query: string;
  storeName?: string;
  city?: string;
  purchasePrice?: number;
  category?: string;
}

export interface LiveSkuAnalysisResult {
  title: string;
  brand: string;
  sku: string;
  upc: string;
  category: ItemCategory;
  detectedStore: string;
  estimatedStorePrice: number;
  originalRetailPrice: number;
  ebaySoldMedian: number;
  amazonPrice: number;
  fbMarketplaceIowaMedian: number;
  estFeesAndShipping: number;
  netProfit: number;
  profitMarginPercent: number;
  flipVelocityDays: number;
  velocityRating: 'High Velocity (1-3 Days)' | 'Moderate (4-10 Days)' | 'Longer Hold (11-25 Days)';
  verdict: 'EXCELLENT 50%+ PROFIT FLIP' | 'STRONG FLIP' | 'BORDERLINE MARGIN' | 'NOT RECOMMENDED / HIGH GHOST RISK';
  ghostStockRisk: number;
  ghostStockNotes: string;
  salesPitchListingTitle: string;
  listingDescription: string;
  suggestedPlatforms: string[];
  comparableItemsSummary: string;
  sources: { title: string; uri: string }[];
}

export interface UserTrackedFlip {
  id: string;
  title: string;
  storeName: string;
  storeCity: string;
  dateBought: string;
  buyPrice: number;
  targetSellPrice: number;
  soldPrice?: number;
  soldDate?: string;
  platform: string;
  status: 'active_hunt' | 'in_stock' | 'listed' | 'sold';
  notes?: string;
}
