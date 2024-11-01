export interface Wallet {
  currency: string;
  amount: number;
}

export interface Balance {
  mainWallet: Wallet;
  profitWallet: Wallet;
}

export interface User {
  uid: string;
  email: string;
  role: string;
  username: string;
  avatarUrl: string;
  country: string;
  createdAt: string;
  balance: Balance;
}
