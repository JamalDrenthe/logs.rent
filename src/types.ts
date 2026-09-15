export type AccountCategory = 'social' | 'gaming' | 'flex';

export type AccountGrade = 'A' | 'B' | 'C';

export interface AccountListing {
  id: number;
  title: string;
  category: AccountCategory;
  platform: string;
  grade: AccountGrade;
  price: number;
  rentPerDay: number;
  change24h: string;
  isPositiveChange: boolean;
  history: {
    '1D': number[];
    '1W': number[];
    '1M': number[];
    '1Y': number[];
    'ALL': number[];
  };
  volumeHistory: {
    '1D': number[];
    '1W': number[];
    '1M': number[];
    '1Y': number[];
    'ALL': number[];
  };
  labels: {
    '1D': string[];
    '1W': string[];
    '1M': string[];
    '1Y': string[];
    'ALL': string[];
  };
  followersOrRating: string;
  ageYears: string;
  verificationLevel: string;
  banRiskPercent: number;
  escrowBorg: number;
  icon: string;
  description: string;
  status: 'available' | 'rented';
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
  type: 'ask' | 'bid';
}

export interface RecentTrade {
  id: string;
  accountId: number;
  accountTitle: string;
  type: 'KOOP' | 'HUUR' | 'BOD';
  price: number;
  rentDays?: number;
  time: string;
  isBot: boolean;
}

export interface PortfolioItem {
  id: string;
  accountId: number;
  accountTitle: string;
  platform: string;
  grade: AccountGrade;
  currentValue: number;
  dailyRent: number;
  status: 'Actief Verhuurd' | 'Beschikbaar' | 'Gepauzeerd';
  totalEarned: number;
  escrowLocked: number;
  renterOrBuyer: string;
  contractEnds: string;
}

export interface DisputeItem {
  id: string;
  accountId: number;
  accountTitle: string;
  claimant: string;
  reason: string;
  amountBorg: number;
  status: 'In Behandeling' | 'Borg Teruggestort' | 'Opgelost' | 'Afgewezen';
  date: string;
  auditDetail: string;
}

export interface WalletTransaction {
  id: string;
  type: 'Storting' | 'Opname' | 'Huur Inkomsten' | 'Borg Escrow' | 'Order Transactie';
  amount: number;
  method: string;
  date: string;
  status: 'Voltooid' | 'In Behandeling';
  isCredit: boolean;
}
