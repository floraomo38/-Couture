import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Check, Heart, HelpCircle, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { PRODUCTS, CULTURE_SHOWCASE, Product } from './data';
import Header from './components/Header';
import Hero from './components/Hero';
import AsoOkeDivider from './components/AsoOkeDivider';
import CultureCard from './components/CultureCard';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import OccasionTabs from './components/OccasionTabs';
import StorySection from './components/StorySection';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import SizingGuideModal from './components/SizingGuideModal';

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
  customMeasurements?: {
    height: number;
    chest: number;
    shoulder: number;
    length: number;
  }
}

export default function App() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizingGuideOpen, setIsSizingGuideOpen] = useState(false);
  const [cultureFilter, setCultureFilter] = useState<'All' | 'Yoruba' | 'Hausa' | 'Igbo'>('All');
  
  // Commission Checkout Form States
  const [isCheckoutModelOpen, setIsCheckoutModelOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientState, setClientState] = useState('');
  const [isCommissionSuccessOpen, setIsCommissionSuccessOpen] = useState(false);

  // Active Toast Alerts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Safe client-side storage recovery
  useEffect(() => {
    try {
      const persistedWish = localStorage.getItem('asa_wishlist');
      if (persistedWish) setWishlist(JSON.parse(persistedWish));
      const persistedCart = localStorage.getItem('asa_cart');
      if (persistedCart) setCart(JSON.parse(persistedCart));
    } catch (e) {
      console.warn('Persistence is offline/unsupported in sandbox environment');
    }
  }, []);

  const persistState = (newWish: Product[], newCart: CartItem[]) => {
    try {
      localStorage.setItem('asa_wishlist', JSON.stringify(newWish));
      localStorage.setItem('asa_cart', JSON.stringify(newCart));
    } catch (e) {
      // Ignored gracefully
    }
  };

  // Wishlist controls
  const handleToggleWishlist = (product: Product) => {
    let updated;
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      updated = wishlist.filter((p) => p.id !== product.id);
      triggerToast(`Removed ${product.name} from your Curator list`);
    } else {
      updated = [...wishlist, product];
      triggerToast(`Added ${product.name} to your Custom Curator list!`);
    }
    setWishlist(updated);
    persistState(updated, cart);
  };

  const handleRemoveFromWishlist = (product: Product) => {
    const updated = wishlist.filter((p) => p.id !== product.id);
    setWishlist(updated);
    persistState(updated, cart);
    triggerToast(`Removed ${product.name} from Curator`);
  };

  // Cart / Bespoke Commission controls
  const handleAddToCart = (
    product: Product,
    config?: { size: string; customMeasurements?: any }
  ) => {
    const size = config?.size || 'M';
    const measurements = config?.customMeasurements;
    
    // Check if identical item (same id & size configuration) exists
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.size === size
    );

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = cart.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        product,
        quantity: 1,
        size,
        customMeasurements: measurements
      };
      updatedCart = [...cart, newItem];
    }

    setCart(updatedCart);
    persistState(wishlist, updatedCart);
    triggerToast(`Configured fitting for ${product.name} successfully!`);
  };

  const handleQuantityChange = (itemId: string, delta: number) => {
    const updated = cart.map((item) => {
      if (item.id === itemId) {
        const nextQty = item.quantity + delta;
        return { ...item, quantity: nextQty < 1 ? 1 : nextQty };
      }
      return item;
    });
    setCart(updated);
    persistState(wishlist, updated);
  };

  const handleRemoveFromCart = (itemId: string) => {
    const item = cart.find((i) => i.id === itemId);
    const updated = cart.filter((i) => i.id !== itemId);
    setCart(updated);
    persistState(wishlist, updated);
    if (item) {
      triggerToast(`Removed ${item.product.name} from bespoke parcel`);
    }
  };

  // Scroll navigation helper
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Total pricing calculator
  const totalCartSum = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.reduce((ct, item) => ct + item.quantity, 0);

  // Filtered garments
  const filteredProducts = PRODUCTS.filter((p) => {
    if (cultureFilter === 'All') return true;
    return p.culture === cultureFilter;
  });

  const handleOpenCommissionCheckout = () => {
    if (cart.length === 0) {
      triggerToast('Bespoke fitting bag is empty!');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutModelOpen(true);
  };

  const handleCompleteCommission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientAddress || !clientState) {
      alert('Kindly fill in all traditional commission fields.');
      return;
    }
    setIsCheckoutModelOpen(false);
    setIsCommissionSuccessOpen(true);
  };

  const handleCloseSuccessScreen = () => {
    setIsCommissionSuccessOpen(false);
    setCart([]);
    persistState(wishlist, []);
    setClientName('');
    setClientPhone('');
    setClientAddress('');
    setClientState('');
  };

  return (
    <div className="relative min-h-screen bg-indigo-dye text-ivory font-sans selection:bg-woven-gold/30 selection:text-white" id="main-application-frame">
      
      {/* Absolute Toast alert block */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-20 left-1/2 z-50 bg-[#160E36] border border-woven-gold/40 px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-ivory/95"
            id="toast-alert"
          >
            <Sparkles className="text-woven-gold animate-spin" size={14} style={{ animationDuration: '3s' }} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Header
        wishlist={wishlist}
        removeFromWishlist={handleRemoveFromWishlist}
        cartCount={cartItemCount}
        openCartDrawer={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        onProductClick={(p) => setSelectedProduct(p)}
      />

      <Hero
        onExploreCollections={() => handleNavigate('collection')}
        onExploreHeritage={() => handleNavigate('showcase')}
      />

      <AsoOkeDivider />

      {/* CULTURES SHOWCASE */}
      <section className="py-20 md:py-28 px-4 lg:px-8 bg-[#120A2E] border-b border-woven-gold/10" id="showcase">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-[0.3em] text-terracotta uppercase font-bold block">
              The Three Lineages
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
              The Cultural Triad
            </h2>
            <p className="text-sm text-ivory/60 leading-relaxed font-light">
              Explore the distinct weaving methodologies, majestic headwear etiquette, and socio-philosophical weights that 
              define Yoruba, Hausa, and Igbo fashion architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="culture-card-grid">
            {CULTURE_SHOWCASE.map((culture) => (
              <CultureCard
                key={culture.name}
                culture={culture}
                onFilterSelect={(name) => {
                  setCultureFilter(name);
                  handleNavigate('collection');
                }}
              />
            ))}
          </div>

        </div>
      </section>

      <AsoOkeDivider />

      {/* FEATURED COLLECTION GRID */}
      <section className="py-20 md:py-28 px-4 lg:px-8 bg-indigo-dye border-b border-woven-gold/10" id="collection">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2 text-left">
              <span className="text-xs font-mono tracking-[0.25em] text-woven-gold uppercase font-semibold block">
                Imperial Collections
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-wider uppercase">
                Bespoke Showroom
              </h2>
              <p className="text-xs text-ivory/50 font-sans max-w-md">
                6 iconic models crafted dynamically. Select a garment to input customized shoulder and height dimensions 
                or standard sizes for direct shuttle commission.
              </p>
            </div>

            {/* Showcase filter tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-indigo-dye/30 p-1 border border-white/5 rounded" id="culture-pills-filter">
              {(['All', 'Yoruba', 'Hausa', 'Igbo'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setCultureFilter(filter)}
                  className={`px-4.5 py-2 font-mono text-[10px] uppercase tracking-widest transition-all pointer-all rounded ${
                    cultureFilter === filter
                      ? 'bg-woven-gold text-indigo-dye font-extrabold shadow'
                      : 'text-ivory/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Core products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="products-catalog-grid">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                isWishlisted={wishlist.some((p) => p.id === prod.id)}
                onToggleWishlist={() => handleToggleWishlist(prod)}
                onProductClick={() => setSelectedProduct(prod)}
                onAddToCart={() => handleAddToCart(prod, { size: 'M' })}
              />
            ))}
          </div>

        </div>
      </section>

      <AsoOkeDivider />

      <StorySection />

      <AsoOkeDivider />

      <OccasionTabs />

      <AsoOkeDivider />

      <Testimonials />

      <AsoOkeDivider />

      <Newsletter />

      <Footer
        onNavigate={handleNavigate}
        openSizingGuide={() => setIsSizingGuideOpen(true)}
      />

      {/* DETAIL MODAL WITH BESPOKE CUSTOM DIAMETERS */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlist.some((p) => p.id === selectedProduct.id) : false}
        onToggleWishlist={() => selectedProduct && handleToggleWishlist(selectedProduct)}
        onAddToCart={(sizeConfig) => selectedProduct && handleAddToCart(selectedProduct, sizeConfig)}
      />

      {/* SIZING REFERENCE MATRIX MODAL */}
      <SizingGuideModal
        isOpen={isSizingGuideOpen}
        onClose={() => setIsSizingGuideOpen(false)}
      />

      {/* SHOPPING CART / BESPOKE PARCEL DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="absolute inset-0 bg-black backdrop-blur-xs transition-opacity"
              />

              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className="pointer-events-auto w-screen max-w-md bg-[#130B30] border-l border-woven-gold/20 h-full shadow-22 flex flex-col justify-between"
                  id="checkout-cart-drawer"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-woven-gold/15 flex items-center justify-between">
                    <span className="flex items-center text-woven-gold font-display font-medium text-lg uppercase tracking-wider gap-2">
                      <ShoppingBag size={18} />
                      Bespoke Fitting Bag
                    </span>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-ivory/60 hover:text-woven-gold p-2 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Body list */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <ShoppingBag className="text-ivory/20" size={48} />
                        <p className="text-ivory/60 text-sm font-sans">No looms commissioned yet.</p>
                        <button
                          onClick={() => {
                            setIsCartOpen(false);
                            handleNavigate('collection');
                          }}
                          className="px-6 py-2.5 bg-woven-gold text-indigo-dye text-xs font-mono uppercase tracking-widest hover:bg-white font-bold transition-all"
                        >
                          Select Cut Model
                        </button>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="p-4 border border-white/5 rounded-lg bg-white/2 space-y-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 object-cover rounded cursor-pointer"
                              onClick={() => {
                                setSelectedProduct(item.product);
                                setIsCartOpen(false);
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[9px] font-mono text-woven-gold uppercase">
                                {item.product.culture} — {item.size} Fit
                              </span>
                              <h4
                                onClick={() => {
                                  setSelectedProduct(item.product);
                                  setIsCartOpen(false);
                                }}
                                className="font-display font-bold text-sm text-ivory truncate hover:text-woven-gold cursor-pointer"
                              >
                                {item.product.name}
                              </h4>
                              <p className="text-[11px] text-ivory/50 truncate mb-1">{item.product.fabricType}</p>
                              <span className="text-xs text-terracotta font-mono font-bold">₦{item.product.price.toLocaleString()}</span>
                            </div>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="text-ivory/30 hover:text-terracotta p-1 transition-colors"
                              title="Discard robe commission spec"
                            >
                              <X size={16} />
                            </button>
                          </div>

                          {/* Bespoke slider diagnostics if available */}
                          {item.customMeasurements && (
                            <div className="bg-black/30 p-2.5 rounded border border-white/5 text-[10px] font-mono grid grid-cols-2 gap-2 text-ivory/60">
                              <div>Height: <span className="text-white">{item.customMeasurements.height}cm</span></div>
                              <div>Chest: <span className="text-white">{item.customMeasurements.chest}in</span></div>
                              <div>Shoulders: <span className="text-white">{item.customMeasurements.shoulder}in</span></div>
                              <div>Loom Length: <span className="text-white">{item.customMeasurements.length}in</span></div>
                            </div>
                          )}

                          {/* Quantity selector */}
                          <div className="flex items-center justify-between border-t border-white/5 pt-2">
                            <span className="text-[9px] font-mono text-ivory/40">Commission Multiplet</span>
                            <div className="flex items-center space-x-2 border border-white/5 bg-black/20 p-0.5 rounded">
                              <button
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="px-1.5 py-0.5 text-xs text-ivory/70 hover:text-white"
                              >
                                -
                              </button>
                              <span className="text-xs font-mono font-bold text-woven-gold px-1.5">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="px-1.5 py-0.5 text-xs text-ivory/70 hover:text-white"
                              >
                                +
                              </button>
                            </div>
                          </div>

                        </div>
                      ))
                    )}
                  </div>

                  {/* Summary & Checkout Action */}
                  {cart.length > 0 && (
                    <div className="p-6 border-t border-woven-gold/15 bg-black/15 space-y-4">
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between text-ivory/60">
                          <span>Craft Spec Volume</span>
                          <span className="font-mono">{cartItemCount} Garments</span>
                        </div>
                        <div className="flex justify-between text-ivory/60">
                          <span>Standard Loom Dyeing</span>
                          <span className="font-mono text-forest-green">Free / Covered</span>
                        </div>
                        <div className="flex justify-between border-t border-white/5 pt-2 text-sm text-white">
                          <span className="font-bold">Total Couture Valuation</span>
                          <span className="font-mono text-woven-gold font-bold">₦{totalCartSum.toLocaleString()}</span>
                        </div>
                      </div>

                      <button
                        onClick={handleOpenCommissionCheckout}
                        className="w-full py-3 bg-gradient-to-r from-terracotta to-[#a3410e] text-white hover:text-woven-gold text-xs font-mono font-black uppercase tracking-widest shadow-xl rounded hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                      >
                        Initiate Looming Commission <ArrowRight size={14} />
                      </button>
                      <p className="text-[9px] font-mono text-ivory/35 text-center select-none">
                        * Commissions are handspooled based on order confirmation receipt.
                      </p>
                    </div>
                  )}

                </motion.div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* DYNAMIC CHECKOUT MODEL (BESPOKE COMMISSION REGISTRY) */}
      <AnimatePresence>
        {isCheckoutModelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutModelOpen(false)}
              className="absolute inset-0 bg-black/75"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#1A1040] border-2 border-woven-gold/50 p-6 md:p-8 rounded-xl max-w-lg w-full text-left overflow-hidden shadow-2xl z-10 space-y-4"
              id="checkout-dialog-form"
            >
              <button
                onClick={() => setIsCheckoutModelOpen(false)}
                className="absolute top-4 right-4 text-ivory/60 hover:text-woven-gold transition-colors"
                aria-label="Cancel commission registry"
              >
                <X size={18} />
              </button>

              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#D4A843] font-bold flex items-center gap-1">
                  <Sparkles size={11} /> Atelier Registry
                </span>
                <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                  Commission Registry
                </h3>
                <p className="text-xs text-ivory/60">
                  Please finalize your delivery coordinates. Our master tailors will confirm sizing details via phone before threads are spooled on the loom.
                </p>
              </div>

              <form onSubmit={handleCompleteCommission} className="space-y-4 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-woven-gold uppercase block">Recipient Patron Name</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Chief Tobe Awosika / Alh. Aminu"
                    className="w-full p-2.5 bg-black/25 border border-white/10 rounded focus:border-woven-gold focus:outline-none text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-woven-gold uppercase block">Secure Phone Coordinate (WhatsApp Preferred)</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+234 803 123 4567"
                    className="w-full p-2.5 bg-black/25 border border-white/10 rounded focus:border-woven-gold focus:outline-none text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-mono text-woven-gold uppercase block">Delivery Residence Address</label>
                    <input
                      type="text"
                      required
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      placeholder="14 Alfred Rewane Road"
                      className="w-full p-2.5 bg-black/25 border border-white/10 rounded focus:border-woven-gold focus:outline-none text-xs text-white"
                    />
                  </div>
                  <div className="col-span-1 space-y-1">
                    <label className="text-[10px] font-mono text-woven-gold uppercase block">State</label>
                    <input
                      type="text"
                      required
                      value={clientState}
                      onChange={(e) => setClientState(e.target.value)}
                      placeholder="Lagos State"
                      className="w-full p-2.5 bg-black/25 border border-white/10 rounded focus:border-woven-gold focus:outline-none text-xs text-white"
                    />
                  </div>
                </div>

                <div className="p-3 bg-white/2 rounded border border-white/5 flex items-start gap-2 text-[10px] text-ivory/50">
                  <AlertCircle size={14} className="text-terracotta shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    By submitting this commission, you understand that hand-weaving Aso-Oke, dye curing, and garment embroidery demands a meticulous wait-timeline of up to 4 weeks.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutModelOpen(false)}
                    className="flex-1 py-3 border border-white/10 hover:bg-white/5 text-ivory text-xs font-mono uppercase tracking-widest rounded"
                  >
                    Reselect Garments
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-terracotta to-woven-gold text-white font-mono text-xs uppercase tracking-widest font-black rounded hover:opacity-95 shadow-lg active:scale-95"
                  >
                    Confirm Commission
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FINAL MAJESTIC COMMISSION SUCCESS SCREEN */}
      <AnimatePresence>
        {isCommissionSuccessOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseSuccessScreen}
              className="absolute inset-0 bg-[#070314]/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#1A1040] border-2 border-woven-gold max-w-lg w-full p-8 text-center rounded-xl shadow-2xl z-10 space-y-6"
              id="commission-success-screen"
            >
              <div className="w-16 h-16 bg-woven-gold/10 text-woven-gold rounded-full flex items-center justify-center mx-auto border-2 border-woven-gold">
                <Check size={32} />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono tracking-[0.25em] text-[#C4581F] uppercase font-black block">
                  Àṣà Couture Royal Seal
                </span>
                <h4 className="font-display font-bold text-2.5xl lg:text-3xl text-white uppercase">
                  Commission Confirmed
                </h4>
                <p className="text-sm text-woven-gold font-mono tracking-wide font-medium">
                  Atelier Registry ID #ASA-{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>

              <div className="bg-[#120A2E] p-4 rounded-lg text-left text-xs text-ivory/80 space-y-3 border border-white/5">
                <p className="leading-relaxed font-sans text-center border-b border-white/5 pb-2">
                  Excellent choice, <strong>{clientName}</strong>. Your thread spool order is successfully locked in.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-ivory/50">
                  <div>Recieved Coordinate: <span className="text-white block">{clientPhone}</span></div>
                  <div>Atelier Location: <span className="text-white block">Aba & Oyo Co-ops</span></div>
                  <div className="col-span-2">Shipping Parcel Address: <span className="text-white block">{clientAddress}, {clientState}</span></div>
                </div>
              </div>

              <p className="text-xs text-ivory/60 leading-relaxed font-sans max-w-sm mx-auto">
                A master weaver from Oyo/Kano/Aba guild will make direct contact on WhatsApp within the next 24 business hours to 
                crosscheck your chosen sleeve lengths, neck parameters, and final embroidery configurations.
              </p>

              <button
                onClick={handleCloseSuccessScreen}
                className="w-full py-3.5 bg-gradient-to-r from-terracotta to-woven-gold text-white hover:text-indigo-dye font-mono text-xs uppercase tracking-widest font-black rounded-lg hover:shadow-xl transition-all pointer-all"
              >
                Conclude Commission and Browse More
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
