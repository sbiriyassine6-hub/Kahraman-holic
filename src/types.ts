export type Language = 'ar' | 'en';

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string; // category ID
  price: number; // in QAR
  originalPrice?: number; // for discount display if any
  stock: number;
  isSoldOut?: boolean;
  images: string[];
  descriptionAr: string;
  descriptionEn: string;
  originAr: string;
  originEn: string;
  weightGrams: number;
  beadSizeMm?: string;
  beadsCount?: number;
  isFeatured?: boolean;
  amberTypeAr?: string;
  amberTypeEn?: string;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  municipality: string; // Doha, Al Rayyan, etc.
  address: string;
  notes?: string;
  paymentMethod: 'cash_on_delivery' | 'card_on_delivery' | 'bank_transfer';
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  totalQar: number;
  customer: CustomerDetails;
  status: 'new' | 'preparing' | 'dispatched' | 'delivered' | 'cancelled';
}
