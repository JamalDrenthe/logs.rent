import { AccountListing, OrderBookEntry, RecentTrade, PortfolioItem, DisputeItem, WalletTransaction } from '../types';

export const INITIAL_ACCOUNTS: AccountListing[] = [
  {
    id: 9812,
    title: 'TikTok Verified Creator 85K',
    category: 'social',
    platform: 'TikTok',
    grade: 'A',
    price: 1450,
    rentPerDay: 35,
    change24h: '+12.4%',
    isPositiveChange: true,
    history: {
      '1D': [1410, 1420, 1415, 1430, 1442, 1450],
      '1W': [1100, 1150, 1200, 1280, 1350, 1410, 1450],
      '1M': [950, 1020, 1100, 1190, 1300, 1380, 1450],
      '1Y': [650, 780, 920, 1100, 1250, 1360, 1450],
      'ALL': [400, 550, 780, 1050, 1280, 1450]
    },
    volumeHistory: {
      '1D': [42, 58, 65, 80, 95, 110],
      '1W': [120, 145, 190, 210, 260, 310, 390],
      '1M': [450, 520, 610, 780, 890, 950, 1120],
      '1Y': [1800, 2100, 2400, 2900, 3400, 3800, 4200],
      'ALL': [3200, 4100, 5800, 7200, 8900, 10400]
    },
    labels: {
      '1D': ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      '1W': ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
      '1M': ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Heden'],
      '1Y': ['Q1', 'Q2', 'Q3', 'Q4', 'Q1-25', 'Q2-25', 'Q3-25'],
      'ALL': ['2021', '2022', '2023', '2024', '2025', '2026']
    },
    followersOrRating: '85.400 volgers',
    ageYears: '3.5 jaar',
    verificationLevel: 'Blauwe Vink + OGE E-mail',
    banRiskPercent: 0,
    escrowBorg: 250,
    icon: 'tiktok',
    description: 'Monetized Creator Fund actief, organische doelgroep in NL/BE/DE, inclusief clean OGE transfer en 2FA handoff.',
    status: 'rented'
  },
  {
    id: 4021,
    title: 'Uber Driver Profile 4.98 Rating',
    category: 'flex',
    platform: 'Uber',
    grade: 'A',
    price: 2100,
    rentPerDay: 60,
    change24h: '+4.2%',
    isPositiveChange: true,
    history: {
      '1D': [2080, 2085, 2090, 2095, 2100, 2100],
      '1W': [1900, 1950, 2000, 2050, 2080, 2100, 2100],
      '1M': [1750, 1820, 1890, 1950, 2020, 2080, 2100],
      '1Y': [1300, 1450, 1600, 1780, 1920, 2050, 2100],
      'ALL': [900, 1200, 1500, 1750, 1950, 2100]
    },
    volumeHistory: {
      '1D': [35, 48, 52, 60, 75, 88],
      '1W': [95, 110, 135, 160, 185, 220, 260],
      '1M': [380, 420, 490, 540, 620, 710, 830],
      '1Y': [1400, 1650, 1900, 2200, 2550, 2800, 3100],
      'ALL': [2800, 3600, 4700, 5900, 7100, 8600]
    },
    labels: {
      '1D': ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      '1W': ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
      '1M': ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Heden'],
      '1Y': ['Q1', 'Q2', 'Q3', 'Q4', 'Q1-25', 'Q2-25', 'Q3-25'],
      'ALL': ['2021', '2022', '2023', '2024', '2025', '2026']
    },
    followersOrRating: '4.98 Sterren (2.840 ritten)',
    ageYears: '4.2 jaar',
    verificationLevel: 'Gold Status Diamond Tier',
    banRiskPercent: 0,
    escrowBorg: 350,
    icon: 'uber',
    description: 'Direct inzetbaar voor Randstad ritten, vlekkeloze staat van dienst en direct goedgekeurd voertuigprofiel.',
    status: 'rented'
  },
  {
    id: 1192,
    title: 'PSN Account 140+ AAA Games',
    category: 'gaming',
    platform: 'PlayStation',
    grade: 'B',
    price: 680,
    rentPerDay: 18,
    change24h: '-1.8%',
    isPositiveChange: false,
    history: {
      '1D': [690, 688, 685, 683, 680, 680],
      '1W': [720, 710, 700, 690, 685, 680, 680],
      '1M': [750, 740, 730, 710, 695, 685, 680],
      '1Y': [800, 780, 760, 730, 710, 690, 680],
      'ALL': [600, 750, 850, 800, 740, 680]
    },
    volumeHistory: {
      '1D': [20, 25, 28, 30, 34, 40],
      '1W': [60, 75, 80, 90, 105, 115, 130],
      '1M': [210, 240, 270, 310, 330, 350, 380],
      '1Y': [900, 1050, 1150, 1300, 1400, 1450, 1500],
      'ALL': [1800, 2300, 2900, 3400, 3900, 4200]
    },
    labels: {
      '1D': ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      '1W': ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
      '1M': ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Heden'],
      '1Y': ['Q1', 'Q2', 'Q3', 'Q4', 'Q1-25', 'Q2-25', 'Q3-25'],
      'ALL': ['2021', '2022', '2023', '2024', '2025', '2026']
    },
    followersOrRating: 'Level 385 Trophy Tier',
    ageYears: '6 jaar',
    verificationLevel: 'PSN Plus Premium 2026',
    banRiskPercent: 5,
    escrowBorg: 120,
    icon: 'playstation',
    description: 'Bevat o.a. GTA VI Pre-Order, Call of Duty MW3, FIFA 24, Cyberpunk, God of War Ragnarok.',
    status: 'available'
  },
  {
    id: 8843,
    title: 'X/Twitter Aged 2016 (50K Tech Audience)',
    category: 'social',
    platform: 'Twitter X',
    grade: 'A',
    price: 1890,
    rentPerDay: 45,
    change24h: '+8.5%',
    isPositiveChange: true,
    history: {
      '1D': [1840, 1855, 1865, 1870, 1885, 1890],
      '1W': [1500, 1600, 1650, 1720, 1800, 1850, 1890],
      '1M': [1350, 1450, 1550, 1650, 1750, 1820, 1890],
      '1Y': [950, 1100, 1250, 1450, 1620, 1780, 1890],
      'ALL': [500, 800, 1100, 1400, 1700, 1890]
    },
    volumeHistory: {
      '1D': [50, 62, 70, 85, 98, 120],
      '1W': [140, 175, 210, 240, 280, 330, 420],
      '1M': [510, 580, 670, 740, 830, 920, 1050],
      '1Y': [1900, 2300, 2700, 3100, 3600, 4100, 4600],
      'ALL': [3500, 4800, 6200, 7900, 9500, 11200]
    },
    labels: {
      '1D': ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      '1W': ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
      '1M': ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Heden'],
      '1Y': ['Q1', 'Q2', 'Q3', 'Q4', 'Q1-25', 'Q2-25', 'Q3-25'],
      'ALL': ['2021', '2022', '2023', '2024', '2025', '2026']
    },
    followersOrRating: '51.200 volgers',
    ageYears: '8 jaar',
    verificationLevel: 'Premium Blue Badge',
    banRiskPercent: 0,
    escrowBorg: 300,
    icon: 'twitter',
    description: 'Hoge autoriteit in AI & Web3 niche, ideale tweet impressies en directe API write access.',
    status: 'available'
  },
  {
    id: 3302,
    title: 'Facebook Ads Agency Aged (Unlimited Spend)',
    category: 'social',
    platform: 'Facebook',
    grade: 'A',
    price: 1200,
    rentPerDay: 30,
    change24h: '+3.1%',
    isPositiveChange: true,
    history: {
      '1D': [1180, 1185, 1190, 1195, 1200, 1200],
      '1W': [1000, 1050, 1100, 1150, 1180, 1200, 1200],
      '1M': [900, 950, 1020, 1080, 1140, 1180, 1200],
      '1Y': [700, 800, 900, 1000, 1100, 1150, 1200],
      'ALL': [450, 650, 850, 1050, 1150, 1200]
    },
    volumeHistory: {
      '1D': [30, 38, 45, 52, 60, 72],
      '1W': [85, 95, 120, 140, 165, 190, 220],
      '1M': [320, 360, 410, 470, 520, 590, 680],
      '1Y': [1200, 1400, 1650, 1850, 2100, 2300, 2550],
      'ALL': [2200, 2900, 3700, 4600, 5500, 6600]
    },
    labels: {
      '1D': ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      '1W': ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
      '1M': ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Heden'],
      '1Y': ['Q1', 'Q2', 'Q3', 'Q4', 'Q1-25', 'Q2-25', 'Q3-25'],
      'ALL': ['2021', '2022', '2023', '2024', '2025', '2026']
    },
    followersOrRating: 'Business Manager Verified',
    ageYears: '5 jaar',
    verificationLevel: 'Meta Verified Agency Tier',
    banRiskPercent: 1,
    escrowBorg: 200,
    icon: 'facebook',
    description: 'Onbeperkt advertentiebudget per dag, direct gekoppelde Pixel en live support toegang.',
    status: 'rented'
  },
  {
    id: 7710,
    title: 'Flexwerk / Temper Profile 5-Star Hospitality',
    category: 'flex',
    platform: 'Flexwerk',
    grade: 'B',
    price: 850,
    rentPerDay: 25,
    change24h: '+0.5%',
    isPositiveChange: true,
    history: {
      '1D': [845, 846, 848, 849, 850, 850],
      '1W': [800, 810, 830, 840, 845, 850, 850],
      '1M': [740, 760, 780, 810, 830, 845, 850],
      '1Y': [600, 660, 710, 760, 800, 830, 850],
      'ALL': [400, 520, 640, 740, 810, 850]
    },
    volumeHistory: {
      '1D': [15, 20, 24, 28, 30, 35],
      '1W': [50, 60, 70, 80, 90, 100, 115],
      '1M': [180, 205, 230, 260, 280, 310, 350],
      '1Y': [750, 880, 990, 1120, 1250, 1340, 1450],
      'ALL': [1400, 1850, 2400, 2900, 3500, 4100]
    },
    labels: {
      '1D': ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      '1W': ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
      '1M': ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Heden'],
      '1Y': ['Q1', 'Q2', 'Q3', 'Q4', 'Q1-25', 'Q2-25', 'Q3-25'],
      'ALL': ['2021', '2022', '2023', '2024', '2025', '2026']
    },
    followersOrRating: '5.0 Sterren (450 shifts)',
    ageYears: '2.5 jaar',
    verificationLevel: 'ID Geverifieerd Flex Pro',
    banRiskPercent: 3,
    escrowBorg: 150,
    icon: 'briefcase',
    description: 'Top beoordelingen voor horeca & evenementen, directe toegang tot premium uurtarieven.',
    status: 'available'
  },
  {
    id: 5541,
    title: 'Steam Account CS2 Prime & Dragon Lore',
    category: 'gaming',
    platform: 'Steam',
    grade: 'C',
    price: 420,
    rentPerDay: 12,
    change24h: '+15.2%',
    isPositiveChange: true,
    history: {
      '1D': [390, 400, 405, 410, 415, 420],
      '1W': [300, 320, 350, 380, 400, 410, 420],
      '1M': [250, 280, 310, 340, 380, 400, 420],
      '1Y': [180, 220, 260, 310, 360, 390, 420],
      'ALL': [120, 180, 240, 320, 380, 420]
    },
    volumeHistory: {
      '1D': [45, 55, 68, 80, 92, 105],
      '1W': [110, 130, 160, 190, 225, 270, 340],
      '1M': [390, 450, 520, 600, 710, 800, 920],
      '1Y': [1500, 1800, 2100, 2500, 2900, 3300, 3700],
      'ALL': [2700, 3600, 4800, 6100, 7500, 9000]
    },
    labels: {
      '1D': ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      '1W': ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
      '1M': ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Heden'],
      '1Y': ['Q1', 'Q2', 'Q3', 'Q4', 'Q1-25', 'Q2-25', 'Q3-25'],
      'ALL': ['2021', '2022', '2023', '2024', '2025', '2026']
    },
    followersOrRating: 'Steam Level 45, 800u CS2',
    ageYears: '1.2 jaar',
    verificationLevel: 'Telefoon Gekoppeld',
    banRiskPercent: 12,
    escrowBorg: 80,
    icon: 'steam',
    description: 'Leuk instap account met Prime matchmaking, inventory skins en clean match history.',
    status: 'available'
  }
];

export const INITIAL_ORDERBOOK_ASKS: OrderBookEntry[] = [
  { price: 1475, amount: 2, total: 2950, type: 'ask' },
  { price: 1465, amount: 1, total: 1465, type: 'ask' },
  { price: 1455, amount: 3, total: 4365, type: 'ask' },
  { price: 1450, amount: 1, total: 1450, type: 'ask' }
];

export const INITIAL_ORDERBOOK_BIDS: OrderBookEntry[] = [
  { price: 1435, amount: 2, total: 2870, type: 'bid' },
  { price: 1420, amount: 4, total: 5680, type: 'bid' },
  { price: 1400, amount: 1, total: 1400, type: 'bid' },
  { price: 1380, amount: 5, total: 6900, type: 'bid' }
];

export const INITIAL_TRADES: RecentTrade[] = [
  { id: 'T-9812-1', accountId: 9812, accountTitle: 'TikTok Verified 85K', type: 'HUUR', price: 35, rentDays: 7, time: '12:44:10', isBot: true },
  { id: 'T-4021-2', accountId: 4021, accountTitle: 'Uber Driver Profile 4.98', type: 'KOOP', price: 2100, time: '12:42:05', isBot: false },
  { id: 'T-8843-3', accountId: 8843, accountTitle: 'X/Twitter Aged 2016', type: 'BOD', price: 1850, time: '12:38:19', isBot: true },
  { id: 'T-1192-4', accountId: 1192, accountTitle: 'PSN Account 140+ AAA', type: 'HUUR', price: 18, rentDays: 3, time: '12:35:42', isBot: false },
  { id: 'T-3302-5', accountId: 3302, accountTitle: 'Facebook Ads Agency', type: 'KOOP', price: 1200, time: '12:29:11', isBot: true }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'P-1',
    accountId: 9812,
    accountTitle: 'TikTok Verified 85K [ID #9812]',
    platform: 'TikTok',
    grade: 'A',
    currentValue: 1450,
    dailyRent: 35,
    status: 'Actief Verhuurd',
    totalEarned: 245,
    escrowLocked: 250,
    renterOrBuyer: 'Investbotiq Agent #04',
    contractEnds: 'Nog 4 dagen'
  },
  {
    id: 'P-2',
    accountId: 4021,
    accountTitle: 'Uber Driver Profile 4.98 [ID #4021]',
    platform: 'Uber',
    grade: 'A',
    currentValue: 2100,
    dailyRent: 60,
    status: 'Actief Verhuurd',
    totalEarned: 420,
    escrowLocked: 350,
    renterOrBuyer: 'Gebruiker #2910',
    contractEnds: 'Nog 7 dagen'
  },
  {
    id: 'P-3',
    accountId: 3302,
    accountTitle: 'Facebook Ads Agency [ID #3302]',
    platform: 'Facebook',
    grade: 'A',
    currentValue: 1200,
    dailyRent: 30,
    status: 'Actief Verhuurd',
    totalEarned: 180,
    escrowLocked: 200,
    renterOrBuyer: 'MarketingBot Corp',
    contractEnds: 'Nog 2 dagen'
  }
];

export const INITIAL_DISPUTES: DisputeItem[] = [
  {
    id: 'DSP-8821',
    accountId: 5541,
    accountTitle: 'Steam Account CS2 Prime [ID #5541]',
    claimant: 'Koper #6712',
    reason: 'Wachtwoord gewijzigd door verkoper binnen 24 uur na overdracht',
    amountBorg: 80,
    status: 'In Behandeling',
    date: '15 Sep 2026',
    auditDetail: 'Geautomatiseerde audit toont IP conflict op Steam auth server om 04:12.'
  },
  {
    id: 'DSP-7910',
    accountId: 1192,
    accountTitle: 'PSN Account 140+ AAA Titels [ID #1192]',
    claimant: 'Huurder #3319',
    reason: '2FA sessie cookie verlopen, nieuwe TOTP token vereist',
    amountBorg: 120,
    status: 'Opgelost',
    date: '12 Sep 2026',
    auditDetail: 'Verkoper heeft binnen 15 minuten een verse TOTP gegenereerd via Handoff Wizard.'
  }
];

export const INITIAL_WALLET_TRANSACTIONS: WalletTransaction[] = [
  { id: 'WTX-101', type: 'Storting', amount: 5000, method: 'iDEAL Rabobank', date: 'Vandaag 09:15', status: 'Voltooid', isCredit: true },
  { id: 'WTX-102', type: 'Huur Inkomsten', amount: 125, method: 'Logs Rent Escrow Yield', date: 'Gisteren 23:59', status: 'Voltooid', isCredit: true },
  { id: 'WTX-103', type: 'Borg Escrow', amount: 250, method: 'Gereserveerd voor ID #9812', date: '12 Sep 14:20', status: 'Voltooid', isCredit: false },
  { id: 'WTX-104', type: 'Storting', amount: 10000, method: 'USDT TRC20 Crypto', date: '10 Sep 11:00', status: 'Voltooid', isCredit: true }
];
