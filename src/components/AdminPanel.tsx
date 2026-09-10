import React, { useState, useRef } from 'react';
import {
  Shield,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Image as ImageIcon,
  Check,
  X,
  Lock,
  Unlock,
  Layers,
  ShoppingBag,
  DollarSign,
  Package,
  AlertCircle,
  Eye,
  RefreshCw,
  Phone,
  MessageCircle,
  FileCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, Category, Order } from '../types';
import { Logo } from './Logo';

export const AdminPanel: React.FC = () => {
  const {
    products,
    categories,
    orders,
    language,
    isAdminAuthenticated,
    setAdminAuthenticated,
    addProduct,
    editProduct,
    deleteProduct,
    toggleSoldOut,
    updateStock,
    updatePrice,
    addCategory,
    deleteCategory,
    updateOrderStatus,
    customLogoUrl,
    setCustomLogoUrl,
    resetToDefaultData,
    setActiveView,
  } = useStore();

  const isAr = language === 'ar';

  // Admin passcode login state
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Tab navigation
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'branding'>('products');

  // Product Add / Edit Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // New/Edit product form state
  const [productForm, setProductForm] = useState({
    nameAr: '',
    nameEn: '',
    category: categories[0]?.id || 'misbaha',
    price: 1500,
    originalPrice: 0,
    stock: 3,
    isSoldOut: false,
    images: [] as string[],
    descriptionAr: '',
    descriptionEn: '',
    originAr: 'بحر البلطيق، بولندا',
    originEn: 'Baltic Sea, Poland',
    weightGrams: 45,
    beadSizeMm: '11 × 10 mm',
    beadsCount: 33,
    amberTypeAr: 'كهرمان طبيعي 100%',
    amberTypeEn: '100% Natural Amber',
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');

  // Category Add Form State
  const [newCatAr, setNewCatAr] = useState('');
  const [newCatEn, setNewCatEn] = useState('');

  // File input refs
  const productFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  // Handle Admin Passcode Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passcodes: '1937'
    if (passcode === '1937' (
      setAdminAuthenticated(true);
      setAuthError(false);
      setPasscode('');
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
  };

  // Open Add Product Modal
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      nameAr: '',
      nameEn: '',
      category: categories[0]?.id || 'misbaha',
      price: 1500,
      originalPrice: 0,
      stock: 1,
      isSoldOut: false,
      images: [new URL('../assets/images/hero_amber_beads_1788970530400.jpg', import.meta.url).href],
      descriptionAr: '',
      descriptionEn: '',
      originAr: 'بحر البلطيق، بولندا',
      originEn: 'Baltic Sea, Poland',
      weightGrams: 40,
      beadSizeMm: '11 × 10 mm',
      beadsCount: 33,
      amberTypeAr: 'كهرمان بولندي أصيل',
      amberTypeEn: 'Genuine Baltic Amber',
    });
    setIsProductModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setProductForm({
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      stock: product.stock,
      isSoldOut: !!product.isSoldOut,
      images: [...product.images],
      descriptionAr: product.descriptionAr,
      descriptionEn: product.descriptionEn,
      originAr: product.originAr,
      originEn: product.originEn,
      weightGrams: product.weightGrams,
      beadSizeMm: product.beadSizeMm || '',
      beadsCount: product.beadsCount || 33,
      amberTypeAr: product.amberTypeAr || 'كهرمان طبيعي',
      amberTypeEn: product.amberTypeEn || 'Natural Amber',
    });
    setIsProductModalOpen(true);
  };

  // Handle Photo File Upload (converts file to data URL)
  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      if (dataUrl) {
        setProductForm((prev) => ({
          ...prev,
          images: [dataUrl, ...prev.images],
        }));
        setUploadSuccessMessage(isAr ? 'تم تحميل الصورة بنجاح!' : 'Photo uploaded successfully!');
        setTimeout(() => setUploadSuccessMessage(''), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Logo Upload
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      if (dataUrl) {
        setCustomLogoUrl(dataUrl);
        setUploadSuccessMessage(isAr ? 'تم تعيين الشعار بنجاح!' : 'Logo updated successfully!');
        setTimeout(() => setUploadSuccessMessage(''), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Product (Create or Update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.nameAr.trim()) {
      alert(isAr ? 'يرجى كتابة اسم المنتج بالعربية' : 'Please enter Arabic name');
      return;
    }

    if (productForm.images.length === 0) {
      alert(isAr ? 'يرجى إضافة صورة واحدة على الأقل للمنتج' : 'Please add at least one product photo');
      return;
    }

    if (editingProductId) {
      editProduct(editingProductId, {
        ...productForm,
        originalPrice: productForm.originalPrice > 0 ? productForm.originalPrice : undefined,
      });
    } else {
      addProduct({
        ...productForm,
        originalPrice: productForm.originalPrice > 0 ? productForm.originalPrice : undefined,
      });
    }

    setIsProductModalOpen(false);
  };

  // Create Category
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatAr.trim()) return;

    const catId = newCatEn.toLowerCase().replace(/\s+/g, '-') || `cat-${Date.now()}`;
    addCategory({
      id: catId,
      nameAr: newCatAr,
      nameEn: newCatEn || newCatAr,
    });
    setNewCatAr('');
    setNewCatEn('');
  };

  // 1. IF NOT LOGGED IN: SHOW SECURE PIN LOGIN
  if (!isAdminAuthenticated) {
    return (
      <div className="w-full min-h-[70vh] bg-[#0B0B0C] py-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#130F0C] border border-[#3A2B1D] rounded-2xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#241A10] border border-[#D4AF37]/40 text-[#D4AF37] mx-auto flex items-center justify-center mb-5 shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            {isAr ? 'لوحة إدارة كهرمان هوليك' : 'Kahraman Holic Admin Portal'}
          </h2>
          <p className="text-xs text-[#A69582] mb-6">
            {isAr
              ? 'أدخل رمز المرور السري للتحكم في المنتجات والأسعار والصور والطلبات'
              : 'Enter passkey to manage products, pricing, photos, and orders'}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-right">
              <label className="block text-xs font-semibold text-[#D4C3AC] mb-1.5">
                {isAr ? 'رمز المرور (PIN):' : 'Passcode PIN:'}
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••"
                className="w-full bg-[#1A140F] border border-[#382A1C] focus:border-[#D4AF37] rounded-xl px-4 py-3 text-center text-xl text-white tracking-widest focus:outline-none"
                autoFocus
              />
              <span className="text-[11px] text-[#7A6A58] block mt-1.5 text-center">
                {isAr ? 'الرمز الافتراضي: 1234' : 'Default PIN: 1234'}
              </span>
            </div>

            {authError && (
              <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{isAr ? 'رمز المرور غير صحيح، جرب 1234' : 'Invalid passkey, try 1234'}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0B0C] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Unlock className="w-4 h-4" />
              <span>{isAr ? 'تسجيل الدخول للإدارة' : 'Unlock Admin Panel'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. IF LOGGED IN: FULL PRODUCT MANAGEMENT INTERFACE
  return (
    <div className="w-full bg-[#0B0B0C] py-10 sm:py-16 text-right min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="bg-[#14100D] border border-[#2B2016] rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#241A10] border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  {isAr ? 'نظام إدارة المنتجات والمتجر' : 'Store & Product Management'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {isAr ? 'مسؤول المتجر' : 'Store Admin'}
                </span>
              </div>
              <p className="text-xs text-[#8C7A65] mt-0.5">
                {isAr
                  ? 'إضافة وتعديل المنتجات، تغيير الأسعار، تحديث المخزون، ورفع صور الكهرمان الحقيقية'
                  : 'Add, update products, modify prices, upload photos and manage orders'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('shop')}
              className="px-4 py-2 rounded-lg bg-[#241A10] hover:bg-[#332517] text-[#D4AF37] text-xs font-semibold border border-[#3A2B1D] flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>{isAr ? 'معاينة المتجر كزبون' : 'View Storefront'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold border border-red-900/80 transition-colors"
            >
              {isAr ? 'تسجيل الخروج' : 'Logout'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#241A10] pb-4 mb-8 overflow-x-auto">
          {[
            { id: 'products', labelAr: `المنتجات (${products.length})`, labelEn: `Products (${products.length})`, icon: Package },
            { id: 'orders', labelAr: `الطلبات المستلمة (${orders.length})`, labelEn: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'categories', labelAr: `الفئات والأقسام (${categories.length})`, labelEn: `Categories (${categories.length})`, icon: Layers },
            { id: 'branding', labelAr: 'شعار المتجر الأصلي', labelEn: 'Brand Logo', icon: ImageIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#D4AF37] text-[#0B0B0C] shadow-md'
                    : 'bg-[#14100D] text-[#A69582] hover:text-white hover:bg-[#1F1813] border border-[#2B2016]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{isAr ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div>
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-[#14100D] p-4 rounded-xl border border-[#2B2016]">
              <div className="text-xs text-[#A69582]">
                {isAr
                  ? 'يمكنك تعديل الأسعار والمخزون مباشرة، أو النقر على "تعديل" لتغيير الصور والأوصاف'
                  : 'Quickly adjust prices and stock, or click Edit to update images and full details'}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={resetToDefaultData}
                  className="px-3 py-2 rounded-lg bg-[#1C1611] hover:bg-[#2A2017] text-[#8C7A65] hover:text-white text-xs border border-[#2E2217] flex items-center gap-1"
                  title={isAr ? 'استعادة التشكيلة الافتراضية' : 'Restore Default Catalog'}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إعادة ضبط' : 'Reset'}</span>
                </button>

                <button
                  id="admin-add-product-btn"
                  onClick={handleOpenAddProduct}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0B0C] text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? 'إضافة منتج كهرمان جديد' : 'Add New Amber Product'}</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-[#14100D] border border-[#2B2016] rounded-xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#1C1611] text-[#A69582] border-b border-[#2B2016]">
                    <tr>
                      <th className="p-4">{isAr ? 'المنتج والصورة' : 'Product & Photo'}</th>
                      <th className="p-4">{isAr ? 'الفئة' : 'Category'}</th>
                      <th className="p-4">{isAr ? 'السعر (ر.ق)' : 'Price (QAR)'}</th>
                      <th className="p-4">{isAr ? 'المخزون' : 'Stock'}</th>
                      <th className="p-4">{isAr ? 'الحالة' : 'Status'}</th>
                      <th className="p-4 text-center">{isAr ? 'إجراءات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#241A10]">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-[#19130E] transition-colors">
                        {/* Thumbnail & Title */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.images[0]}
                              alt=""
                              className="w-12 h-12 object-cover rounded-md border border-[#382A1C] flex-shrink-0"
                            />
                            <div>
                              <span className="font-bold text-white block">
                                {isAr ? product.nameAr : product.nameEn}
                              </span>
                              <span className="text-[11px] text-[#7A6A58]">
                                {product.weightGrams}g • {isAr ? product.originAr : product.originEn}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="p-4 text-[#C5B39A]">
                          {categories.find((c) => c.id === product.category)?.nameAr || product.category}
                        </td>

                        {/* Price with Quick Editor */}
                        <td className="p-4">
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={product.price}
                              onChange={(e) => updatePrice(product.id, Number(e.target.value))}
                              className="w-24 bg-[#0E0C0A] border border-[#2E2217] rounded px-2 py-1 text-xs text-[#E5C378] font-bold focus:outline-none focus:border-[#D4AF37]"
                            />
                            <span className="text-[#8C7A65]">{isAr ? 'ر.ق' : 'QAR'}</span>
                          </div>
                        </td>

                        {/* Stock with Quick Editor */}
                        <td className="p-4">
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min={0}
                              value={product.stock}
                              onChange={(e) => updateStock(product.id, Number(e.target.value))}
                              className="w-16 bg-[#0E0C0A] border border-[#2E2217] rounded px-2 py-1 text-xs text-white text-center focus:outline-none focus:border-[#D4AF37]"
                            />
                            <span className="text-[11px] text-[#8C7A65]">{isAr ? 'قطع' : 'pcs'}</span>
                          </div>
                        </td>

                        {/* Sold Out Toggle Badge */}
                        <td className="p-4">
                          <button
                            onClick={() => toggleSoldOut(product.id)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                              product.isSoldOut || product.stock <= 0
                                ? 'bg-red-950/80 text-red-300 border-red-800 hover:bg-red-900'
                                : 'bg-emerald-950/80 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                            }`}
                          >
                            {product.isSoldOut || product.stock <= 0
                              ? isAr ? 'نفدت الكمية (تبديل)' : 'Sold Out'
                              : isAr ? 'متوفر للطلب' : 'In Stock'}
                          </button>
                        </td>

                        {/* Actions: Edit, Delete */}
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEditProduct(product)}
                              className="p-1.5 rounded-lg bg-[#241A10] hover:bg-[#382819] text-[#D4AF37] border border-[#3A2B1D] transition-colors"
                              title={isAr ? 'تعديل كامل المنتج' : 'Full Edit'}
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(isAr ? 'هل أنت متأكد من حذف هذه القطعة؟' : 'Delete product?')) {
                                  deleteProduct(product.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/60 text-red-400 border border-red-900/60 transition-colors"
                              title={isAr ? 'حذف القطعة' : 'Delete'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div>
            <div className="bg-[#14100D] border border-[#2B2016] rounded-xl p-5 mb-6">
              <h3 className="text-base font-bold text-white mb-1">
                {isAr ? 'سجل الطلبات الواردة من عملاء قطر' : 'Customer Orders in Qatar'}
              </h3>
              <p className="text-xs text-[#8C7A65]">
                {isAr
                  ? 'يتم هنا تسجيل أي طلب يتم عبر متجرك، مع إمكانية التواصل مباشرة مع العميل عبر WhatsApp لتأكيد التسليم'
                  : 'Orders placed via your store checkout with direct WhatsApp customer communication'}
              </p>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-16 bg-[#14100D] border border-[#2B2016] rounded-xl">
                <ShoppingBag className="w-12 h-12 text-[#5E4C3C] mx-auto mb-3" />
                <h4 className="text-base font-bold text-white mb-1">
                  {isAr ? 'لا توجد طلبات جديدة حالياً' : 'No orders yet'}
                </h4>
                <p className="text-xs text-[#8C7A65]">
                  {isAr
                    ? 'عند قيام العملاء بالطلب عبر الموقع، ستظهر بياناتهم وعناوينهم هنا فوراً.'
                    : 'When customers place orders, they will appear here in real-time.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#14100D] border border-[#2B2016] rounded-xl p-5 hover:border-[#D4AF37]/50 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#241A10] gap-3 mb-4">
                      <div>
                        <span className="text-xs font-bold text-[#D4AF37] block">#{order.id}</span>
                        <span className="text-xs text-white font-semibold">
                          {order.customer.name} • {order.customer.phone}
                        </span>
                        <span className="text-[11px] text-[#7A6A58] block">
                          {new Date(order.createdAt).toLocaleString(isAr ? 'ar-QA' : 'en-US')}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Order Status Selector */}
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="bg-[#1C1611] text-xs text-[#E5D5BC] border border-[#3A2B1D] rounded-lg px-3 py-1.5 focus:outline-none"
                        >
                          <option value="new">{isAr ? 'طلب جديد' : 'New Order'}</option>
                          <option value="preparing">{isAr ? 'قيد التجهيز والتغليف' : 'Preparing'}</option>
                          <option value="dispatched">{isAr ? 'خرج مع مندوب التوصيل' : 'Out for Delivery'}</option>
                          <option value="delivered">{isAr ? 'تم التسليم بنجاح' : 'Delivered'}</option>
                          <option value="cancelled">{isAr ? 'ملغي' : 'Cancelled'}</option>
                        </select>

                        {/* WhatsApp Customer Button */}
                        <a
                          href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            isAr
                              ? `مرحباً ${order.customer.name}، معك متجر كهرمان هوليك بخصوص طلبك رقم #${order.id}.`
                              : `Hello ${order.customer.name}, contacting you from Kahraman Holic regarding order #${order.id}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-lg text-xs flex items-center gap-1 shadow-sm"
                          title={isAr ? 'مراسلة العميل واتساب' : 'WhatsApp Customer'}
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Delivery & Item Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#A6937E]">
                      <div>
                        <strong className="text-white block mb-1">{isAr ? 'عنوان التوصيل في قطر:' : 'Delivery Address:'}</strong>
                        <p>{order.customer.municipality} - {order.customer.address}</p>
                        {order.customer.email && <p className="mt-0.5">{order.customer.email}</p>}
                      </div>

                      <div>
                        <strong className="text-white block mb-1">{isAr ? 'القطع المطلوبة:' : 'Ordered Items:'}</strong>
                        <ul className="space-y-1">
                          {order.items.map((item) => (
                            <li key={item.product.id} className="flex justify-between">
                              <span>{isAr ? item.product.nameAr : item.product.nameEn} × {item.quantity}</span>
                              <span className="text-[#E5C378]">{(item.product.price * item.quantity).toLocaleString()} {isAr ? 'ر.ق' : 'QAR'}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2 pt-2 border-t border-[#241A10] flex justify-between font-bold text-white text-sm">
                          <span>{isAr ? 'الإجمالي:' : 'Total:'}</span>
                          <span className="text-[#E5C378]">{order.totalQar.toLocaleString()} {isAr ? 'ر.ق' : 'QAR'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create Category Form */}
            <div className="lg:col-span-5 bg-[#14100D] border border-[#2B2016] rounded-xl p-6">
              <h3 className="text-base font-bold text-white mb-2">
                {isAr ? 'إنشاء قسم / فئة جديدة' : 'Create New Category'}
              </h3>
              <p className="text-xs text-[#8C7A65] mb-4">
                {isAr
                  ? 'أضف أقساماً جديدة مثل مسابيح، خواتم، تحف، مسابيح بكلايت، إلخ'
                  : 'Add custom product categories to organize your luxury collection'}
              </p>

              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'اسم الفئة بالعربية *' : 'Category Name (Arabic) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newCatAr}
                    onChange={(e) => setNewCatAr(e.target.value)}
                    placeholder="مثال: مسابيح ملكية خاصة"
                    className="w-full bg-[#1A140F] border border-[#2E2217] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'اسم الفئة بالإنجليزية' : 'Category Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={newCatEn}
                    onChange={(e) => setNewCatEn(e.target.value)}
                    placeholder="e.g. Royal Misbaha Edition"
                    className="w-full bg-[#1A140F] border border-[#2E2217] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0B0C] font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? 'حفظ الفئة' : 'Add Category'}</span>
                </button>
              </form>
            </div>

            {/* Existing Categories List */}
            <div className="lg:col-span-7 bg-[#14100D] border border-[#2B2016] rounded-xl p-6">
              <h3 className="text-base font-bold text-white mb-4">
                {isAr ? 'الفئات الحالية في المتجر' : 'Active Store Categories'}
              </h3>

              <div className="space-y-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between p-3.5 bg-[#1C1611] rounded-lg border border-[#2B2117]"
                  >
                    <div>
                      <span className="font-bold text-white text-xs block">{cat.nameAr}</span>
                      <span className="text-[11px] text-[#7A6A58]">{cat.nameEn} ({cat.id})</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-[#D4AF37] bg-[#241A10] px-2 py-0.5 rounded border border-[#3A2B1D]">
                        {products.filter((p) => p.category === cat.id).length} {isAr ? 'قطع' : 'items'}
                      </span>

                      {/* Prevent deleting if standard */}
                      <button
                        onClick={() => {
                          if (confirm(isAr ? 'حذف هذه الفئة؟' : 'Delete category?')) {
                            deleteCategory(cat.id);
                          }
                        }}
                        className="p-1 text-[#7A6A58] hover:text-red-400"
                        title={isAr ? 'حذف' : 'Delete'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BRAND LOGO UPLOAD & MANAGEMENT */}
        {activeTab === 'branding' && (
          <div className="max-w-2xl mx-auto bg-[#14100D] border border-[#2B2016] rounded-xl p-6 sm:p-8 text-center">
            <h3 className="text-lg font-bold text-white mb-2">
              {isAr ? 'شعار كهرمان هوليك (Kahraman Holic)' : 'Kahraman Holic Brand Logo'}
            </h3>
            <p className="text-xs text-[#8C7A65] mb-6">
              {isAr
                ? 'استخدم الشعار الملكي المصمم، أو قم برفع ملف الشعار الأصلي الخاص بك (PNG / SVG / JPG) ليتم تطبيقه فوراً في كافة أرجاء المتجر'
                : 'Upload your original logo file (PNG, SVG, JPG) to apply it across the entire store header and packaging'}
            </p>

            {/* Current Active Logo Preview */}
            <div className="p-8 bg-[#0B0B0C] border border-[#2E2217] rounded-xl mb-6 flex flex-col items-center justify-center">
              <Logo size="lg" customLogoUrl={customLogoUrl} />
              <span className="text-[11px] text-[#7A6A58] mt-4">
                {customLogoUrl
                  ? (isAr ? 'الشعار المخصص المرفوع' : 'Custom Uploaded Logo')
                  : (isAr ? 'الشعار الملكي الافتراضي لكهرمان هوليك' : 'Default Royal Kahraman Holic Crest')}
              </span>
            </div>

            {uploadSuccessMessage && (
              <div className="mb-4 p-2 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>{uploadSuccessMessage}</span>
              </div>
            )}

            {/* Upload Buttons */}
            <input
              type="file"
              ref={logoFileInputRef}
              onChange={handleLogoFileUpload}
              accept="image/*"
              className="hidden"
            />

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => logoFileInputRef.current?.click()}
                className="px-6 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0B0C] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>{isAr ? 'رفع ملف الشعار الأصلي الخاص بك' : 'Upload Original Logo File'}</span>
              </button>

              {customLogoUrl && (
                <button
                  onClick={() => setCustomLogoUrl(null)}
                  className="px-4 py-3 rounded-lg bg-[#1C1611] hover:bg-[#2A2017] text-[#C5B39A] text-xs font-semibold border border-[#2E2217]"
                >
                  {isAr ? 'استعادة الشعار الملكي الافتراضي' : 'Reset to Default Crest'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FULL PRODUCT ADD / EDIT MODAL */}
      {isProductModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsProductModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#130F0C] border border-[#3A2B1D] rounded-xl overflow-hidden shadow-2xl text-right my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-[#241A10] flex items-center justify-between">
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-full text-[#A69582] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-bold text-white">
                {editingProductId
                  ? (isAr ? 'تعديل بيانات قطعة الكهرمان' : 'Edit Amber Product')
                  : (isAr ? 'إضافة قطعة كهرمان جديدة للمتجر' : 'Add New Amber Product')}
              </h2>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              
              {/* Image Upload Zone */}
              <div>
                <label className="block text-xs font-bold text-[#D4C3AC] mb-2">
                  {isAr ? 'صور المنتج (ارفع صورتك الحقيقية) *' : 'Product Photos (Upload your real photos) *'}
                </label>

                {/* Upload Action */}
                <input
                  type="file"
                  ref={productFileInputRef}
                  onChange={handlePhotoFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                <div
                  onClick={() => productFileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#3A2B1D] hover:border-[#D4AF37] rounded-xl p-6 text-center cursor-pointer bg-[#1A140F] transition-colors"
                >
                  <Upload className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                  <span className="text-xs font-bold text-white block mb-1">
                    {isAr ? 'انقر لرفع صورة حقيقية من جهازك' : 'Click to upload real photo from device'}
                  </span>
                  <span className="text-[11px] text-[#7A6A58]">
                    {isAr ? 'يدعم PNG، JPG، WEBP بدقة عالية' : 'Supports high-res PNG, JPG, WEBP'}
                  </span>
                </div>

                {/* Uploaded Images Preview Thumbnails */}
                {productForm.images.length > 0 && (
                  <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                    {productForm.images.map((img, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-md overflow-hidden border border-[#382A1C] flex-shrink-0 group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() =>
                            setProductForm((prev) => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== idx),
                            }))
                          }
                          className="absolute inset-0 bg-red-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'اسم القطعة بالعربية *' : 'Name (Arabic) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.nameAr}
                    onChange={(e) => setProductForm({ ...productForm, nameAr: e.target.value })}
                    placeholder="مثال: مسباح كهرمان بولندي شجري ملكي"
                    className="w-full bg-[#1A140F] border border-[#2E2217] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'اسم القطعة بالإنجليزية' : 'Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={productForm.nameEn}
                    onChange={(e) => setProductForm({ ...productForm, nameEn: e.target.value })}
                    placeholder="e.g. Royal Baltic Butterscotch Misbaha"
                    className="w-full bg-[#1A140F] border border-[#2E2217] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Category, Price, Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'الفئة / القسم *' : 'Category *'}
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-[#1A140F] border border-[#2E2217] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'السعر (ريال قطري QAR) *' : 'Price (QAR) *'}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-[#1A140F] border border-[#2E2217] rounded-lg p-2.5 text-xs text-[#E5C378] font-bold focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'الكمية في المخزن *' : 'Stock Quantity *'}
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full bg-[#1A140F] border border-[#2E2217] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Specifications: Weight, Size, Origin */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'الوزن (جرام)' : 'Weight (Grams)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={productForm.weightGrams}
                    onChange={(e) => setProductForm({ ...productForm, weightGrams: Number(e.target.value) })}
                    className="w-full bg-[#1A140F] border border-[#2E2217] rounded-lg p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'مقاس الخرز / الأبعاد' : 'Bead Dimensions'}
                  </label>
                  <input
                    type="text"
                    value={productForm.beadSizeMm}
                    onChange={(e) => setProductForm({ ...productForm, beadSizeMm: e.target.value })}
                    placeholder="مثال: 12 × 11 mm برميلي"
                    className="w-full bg-[#1A140F] border border-[#2E2217] rounded-lg p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                    {isAr ? 'بلد المنشأ والمصدر' : 'Origin'}
                  </label>
                  <input
                    type="text"
                    value={productForm.originAr}
                    onChange={(e) => setProductForm({ ...productForm, originAr: e.target.value })}
                    placeholder="مثال: بحر البلطيق، بولندا"
                    className="w-full bg-[#1A140F] border border-[#2E2217] rounded-lg p-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Arabic Description */}
              <div>
                <label className="block text-xs font-semibold text-[#D4C3AC] mb-1">
                  {isAr ? 'وصف القطعة بالعربية' : 'Description (Arabic)'}
                </label>
                <textarea
                  rows={3}
                  value={productForm.descriptionAr}
                  onChange={(e) => setProductForm({ ...productForm, descriptionAr: e.target.value })}
                  placeholder="اكتب وصفاً مفصلاً لنوع الكهرمان، الخراطة، الملمس، والكركوشة..."
                  className="w-full bg-[#1A140F] border border-[#2E2217] rounded-lg p-2.5 text-xs text-white focus:outline-none resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#241A10] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-[#2E2217] text-[#8C7A65] hover:text-white text-xs"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B0B0C] font-bold text-xs shadow-md transition-all"
                >
                  {editingProductId
                    ? (isAr ? 'حفظ التعديلات' : 'Save Changes')
                    : (isAr ? 'إضافة القطعة للمتجر' : 'Add to Catalog')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
