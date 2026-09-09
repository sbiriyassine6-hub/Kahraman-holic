import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/initialData';
import { CartItem, Category, CustomerDetails, Language, Order, Product } from '../types';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  orders: Order[];
  language: Language;
  searchQuery: string;
  selectedCategory: string;
  customLogoUrl: string | null;
  isAdminAuthenticated: boolean;
  activeView: 'home' | 'shop' | 'about' | 'contact' | 'admin';
  selectedProductForDetail: Product | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  lastPlacedOrder: Order | null;
  
  // Actions
  setLanguage: (lang: Language) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (catId: string) => void;
  setActiveView: (view: 'home' | 'shop' | 'about' | 'contact' | 'admin') => void;
  setSelectedProductForDetail: (product: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setLastPlacedOrder: (order: Order | null) => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalQar: number;
  cartItemsCount: number;

  // Order Actions
  placeOrder: (customer: CustomerDetails) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Admin Actions
  addProduct: (newProduct: Omit<Product, 'id'>) => Product;
  editProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleSoldOut: (id: string) => void;
  updateStock: (id: string, stock: number) => void;
  updatePrice: (id: string, price: number) => void;
  addCategory: (cat: Category) => void;
  deleteCategory: (id: string) => void;
  setCustomLogoUrl: (url: string | null) => void;
  setAdminAuthenticated: (auth: boolean) => void;
  resetToDefaultData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('kahraman_products');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('kahraman_categories');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CATEGORIES;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kahraman_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('kahraman_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('kahraman_lang');
      if (saved === 'en' || saved === 'ar') return saved;
    } catch {
      // fallback
    }
    return 'ar'; // Arabic RTL primary default
  });

  const [customLogoUrl, setCustomLogoUrlState] = useState<string | null>(() => {
    try {
      return localStorage.getItem('kahraman_custom_logo') || null;
    } catch {
      return null;
    }
  });

  const [isAdminAuthenticated, setAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kahraman_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'about' | 'contact' | 'admin'>('home');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kahraman_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('kahraman_categories', JSON.stringify(categories));
    } catch {}
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('kahraman_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('kahraman_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('kahraman_lang', language);
    } catch {}
    // Update HTML dir and lang
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setCustomLogoUrl = (url: string | null) => {
    setCustomLogoUrlState(url);
    if (url) {
      localStorage.setItem('kahraman_custom_logo', url);
    } else {
      localStorage.removeItem('kahraman_custom_logo');
    }
  };

  const handleSetAdminAuth = (auth: boolean) => {
    setAdminAuthenticated(auth);
    if (auth) {
      localStorage.setItem('kahraman_admin_auth', 'true');
    } else {
      localStorage.removeItem('kahraman_admin_auth');
    }
  };

  // Cart Calculations
  const cartTotalQar = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  const addToCart = (product: Product, quantity = 1) => {
    if (product.isSoldOut || product.stock <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const validQty = Math.min(quantity, item.product.stock);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order Placement
  const placeOrder = (customer: CustomerDetails): Order => {
    const newOrder: Order = {
      id: `KH-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      items: [...cart],
      totalQar: cartTotalQar,
      customer,
      status: 'new',
    };

    // Decrement stock in store
    setProducts((prev) =>
      prev.map((p) => {
        const cartItem = cart.find((ci) => ci.product.id === p.id);
        if (cartItem) {
          const updatedStock = Math.max(0, p.stock - cartItem.quantity);
          return {
            ...p,
            stock: updatedStock,
            isSoldOut: updatedStock === 0,
          };
        }
        return p;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setLastPlacedOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  // Admin Operations
  const addProduct = (newProductData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...newProductData,
      id: `kh-${Date.now().toString(36)}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const editProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          if (updated.stock <= 0) {
            updated.isSoldOut = true;
          }
          return updated;
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const toggleSoldOut = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.isSoldOut;
          return {
            ...p,
            isSoldOut: nextState,
            stock: nextState ? 0 : Math.max(1, p.stock),
          };
        }
        return p;
      })
    );
  };

  const updateStock = (id: string, stock: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            stock,
            isSoldOut: stock <= 0,
          };
        }
        return p;
      })
    );
  };

  const updatePrice = (id: string, price: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price } : p))
    );
  };

  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const resetToDefaultData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    localStorage.removeItem('kahraman_products');
    localStorage.removeItem('kahraman_categories');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        cart,
        orders,
        language,
        searchQuery,
        selectedCategory,
        customLogoUrl,
        isAdminAuthenticated,
        activeView,
        selectedProductForDetail,
        isCartOpen,
        isCheckoutOpen,
        lastPlacedOrder,
        setLanguage,
        setSearchQuery,
        setSelectedCategory,
        setActiveView,
        setSelectedProductForDetail,
        setIsCartOpen,
        setIsCheckoutOpen,
        setLastPlacedOrder,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalQar,
        cartItemsCount,
        placeOrder,
        updateOrderStatus,
        addProduct,
        editProduct,
        deleteProduct,
        toggleSoldOut,
        updateStock,
        updatePrice,
        addCategory,
        deleteCategory,
        setCustomLogoUrl,
        setAdminAuthenticated: handleSetAdminAuth,
        resetToDefaultData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
