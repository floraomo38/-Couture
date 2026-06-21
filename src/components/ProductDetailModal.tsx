import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Heart, Sparkles, Scale, Clock, ShieldCheck, ShoppingBag, Ruler,
  CreditCard, ChevronLeft, MapPin, User, Phone, Check, ShieldAlert,
  Loader2, CheckCircle2, Download, Lock
} from 'lucide-react';
import { Product } from '../data';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: (sizeConfig: { size: string; customMeasurements?: { chest: number; shoulder: number; length: number; height: number } }) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}: ProductDetailModalProps) {
  // Modal states
  const [viewMode, setViewMode] = useState<'details' | 'payment' | 'success'>('details');
  const [sizeMode, setSizeMode] = useState<'standard' | 'custom'>('standard');
  const [selectedStandardSize, setSelectedStandardSize] = useState<string>('M');
  
  // Custom Bespoke measurements
  const [height, setHeight] = useState<number>(180);
  const [chest, setChest] = useState<number>(40);
  const [shoulder, setShoulder] = useState<number>(18);
  const [length, setLength] = useState<number>(42);

  const [isOrdered, setIsOrdered] = useState(false);

  // checkout form state
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryState, setDeliveryState] = useState('');
  
  // Card states
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardPin, setCardPin] = useState('');

  // loader/error states
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStep, setPaymentStep] = useState('');
  const [errorText, setErrorText] = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  // Reset modal states when closed or opened with new product
  useEffect(() => {
    if (isOpen) {
      setViewMode('details');
      setIsOrdered(false);
      setRecipientName('');
      setRecipientPhone('');
      setDeliveryAddress('');
      setDeliveryState('');
      setCardNumber('');
      setCardName('');
      setCardExpiry('');
      setCardCvv('');
      setCardPin('');
      setErrorText('');
    }
  }, [isOpen, product]);

  if (!product || !isOpen) return null;

  // Compute estimated crafting stats based on custom measurements or standard weight
  const fabricComplexity = product.culture === 'Edo' ? 1.3 : product.culture === 'Hausa' ? 1.1 : 1.2;
  const areaMultiplier = sizeMode === 'custom' 
    ? (chest * shoulder * length) / 30000 
    : selectedStandardSize === 'S' ? 0.9 : selectedStandardSize === 'M' ? 1.0 : selectedStandardSize === 'L' ? 1.1 : 1.25;
  
  const estimatedWeaponsTime = Math.round(18 * fabricComplexity * areaMultiplier);
  const yarnYards = Math.round(450 * fabricComplexity * areaMultiplier);

  // Card formatting & helpers
  const formatCardNumber = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 16);
    return clean.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    if (clean.length > 2) {
      return `${clean.slice(0, 2)}/${clean.slice(2)}`;
    }
    return clean;
  };

  const getCardType = (num: string) => {
    const clean = num.replace(/\s+/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (clean.startsWith('5')) return 'Mastercard';
    if (clean.startsWith('6') || clean.startsWith('506') || clean.startsWith('650')) return 'Verve';
    if (clean.startsWith('3')) return 'Amex';
    return 'Credit / Debit';
  };

  // Add item to shopping cart bag spec
  const handleCreateOrder = () => {
    onAddToCart({
      size: sizeMode === 'custom' ? 'Custom Bespoke' : selectedStandardSize,
      customMeasurements: sizeMode === 'custom' ? { chest, shoulder, length, height } : undefined
    });
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      onClose();
    }, 1800);
  };

  // Proceed to secure ATM payment flow
  const handleProceedToPayment = () => {
    setViewMode('payment');
  };

  // Trigger payment authorization
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    // Basic Validations
    const cleanCard = cardNumber.replace(/\D/g, '');
    if (cleanCard.length < 16) {
      setErrorText('Card number must contain exactly 16 digits.');
      return;
    }

    if (!cardName.trim()) {
      setErrorText('Please enter the cardholder name.');
      return;
    }

    const cleanExpiry = cardExpiry.replace(/\D/g, '');
    if (cleanExpiry.length < 4) {
      setErrorText('Expiration date must be in MM/YY format.');
      return;
    }
    const month = parseInt(cleanExpiry.slice(0, 2));
    if (month < 1 || month > 12) {
      setErrorText('Invalid expiration month. Must be 01 - 12.');
      return;
    }

    if (cardCvv.length < 3) {
      setErrorText('Please enter a valid 3-digit CVV authorization code.');
      return;
    }

    if (cardPin.length < 4) {
      setErrorText('ATM Debit Card PIN must be a 4-digit secure numeric code.');
      return;
    }

    // Trigger simulation timeline
    setIsPaying(true);
    const steps = [
      'Establishing secure handshake with Interswitch web portal...',
      'Encrypting and validating ATM PIN segment...',
      'Pinging Central Bank of Nigeria settlement server...',
      'Debiting luxury ledger from visa/mastercard card system...',
      'Locking loom priority coordinates with Àṣà Guild...'
    ];

    let currentStep = 0;
    setPaymentStep(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setPaymentStep(steps[currentStep]);
      } else {
        clearInterval(interval);
        setIsPaying(false);
        setConfirmedOrderId(`ASA-ATM-${Math.floor(100000 + Math.random() * 900000)}`);
        setViewMode('success');
      }
    }, 850);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        
        {/* Backdrop glass */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0A0520]/85 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className="relative bg-[#171038] border border-woven-gold/25 rounded-xl max-w-4xl w-full text-left overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row h-auto max-h-[90vh]"
          id="product-detail-modal"
        >
          {/* Close Trigger (Only show if not currently authorizing billing) */}
          {!isPaying && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-indigo-dye/80 border border-white/10 hover:border-woven-gold text-ivory/60 hover:text-woven-gold transition-all"
              aria-label="Close details"
              id="close-detail-modal-btn"
            >
              <X size={18} />
            </button>
          )}

          {/* Left Column: Image & Loom Estimation */}
          <div className="w-full md:w-1/2 relative bg-indigo-dye flex flex-col">
            <div className="relative aspect-square md:h-full md:aspect-auto min-h-[250px] md:min-h-[400px] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 z-10 bg-indigo-dye/90 border border-woven-gold/20 p-3 rounded backdrop-blur-sm">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4A843] flex items-center gap-1">
                  <Ruler size={12} /> Loom Analytics
                </span>
                <div className="grid grid-cols-2 gap-4 mt-2 text-xs font-mono">
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase">Crafting Time</span>
                    <span className="text-ivory font-semibold flex items-center gap-1 mt-0.5">
                      <Clock size={11} className="text-crimson-coral" /> {estimatedWeaponsTime} Days Est.
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase">Warp thread width</span>
                    <span className="text-ivory font-semibold flex items-center gap-1 mt-0.5">
                      <Scale size={11} className="text-woven-gold" /> {yarnYards} Thread-Yards
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Garment Customizations / Checkout Form / Success Statement */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-none h-auto">
            
            {/* VIEW MODE 1: DETAILS & SIZE SELECTIONS */}
            {viewMode === 'details' && (
              <div className="flex flex-col h-full justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full font-bold ${
                      product.culture === 'Edo' ? 'bg-crimson-coral/20 text-crimson-coral' :
                      product.culture === 'Hausa' ? 'bg-woven-gold/20 text-woven-gold' :
                      'bg-forest-green/20 text-forest-green'
                    }`}>
                      {product.culture} Lineage
                    </span>
                    <span className="text-xs text-ivory/50 font-serif">{product.fabricType}</span>
                  </div>

                  <div>
                    <h3 className="font-display font-medium text-2xl lg:text-3xl text-white tracking-wide">
                      {product.name}
                    </h3>
                    <p className="font-mono text-xl text-woven-gold font-bold mt-1">
                      ₦{product.price.toLocaleString()}
                    </p>
                  </div>

                  <p className="text-sm text-ivory/70 leading-relaxed font-light font-sans">
                    {product.description}
                  </p>

                  {/* In-box components list */}
                  <div className="bg-white/2 rounded p-3 border border-white/5 space-y-1 text-xs text-ivory/60">
                    <span className="text-[10px] font-mono text-woven-gold uppercase font-bold block mb-1">
                      Traditional Package Includes:
                    </span>
                    {product.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <ShieldCheck size={12} className="text-woven-gold" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* FIT & MEASUREMENTS SECTION */}
                  <div className="border-t border-white/10 pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-woven-gold uppercase tracking-wider font-extrabold flex items-center gap-1">
                        <Sparkles size={12} /> Curate Fit Sizing
                      </span>

                      <div className="flex bg-indigo-dye p-0.5 rounded border border-white/10">
                        <button
                          onClick={() => setSizeMode('standard')}
                          className={`px-3 py-1 text-[10px] font-mono uppercase font-bold transition-all rounded ${sizeMode === 'standard' ? 'bg-woven-gold text-indigo-dye' : 'text-ivory/60 hover:text-white'}`}
                        >
                          Standard
                        </button>
                        <button
                          onClick={() => setSizeMode('custom')}
                          className={`px-3 py-1 text-[10px] font-mono uppercase font-bold transition-all rounded ${sizeMode === 'custom' ? 'bg-woven-gold text-indigo-dye' : 'text-ivory/60 hover:text-white'}`}
                        >
                          Bespoke Sliders
                        </button>
                      </div>
                    </div>

                    {sizeMode === 'standard' ? (
                      <div className="grid grid-cols-5 gap-2">
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedStandardSize(size)}
                            className={`py-2 text-xs font-mono rounded border transition-all ${selectedStandardSize === size ? 'border-woven-gold bg-woven-gold/15 text-woven-gold font-bold' : 'border-white/5 bg-white/2 hover:border-white/20 text-ivory/70'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3 p-3 bg-black/25 rounded border border-white/5 text-xs font-sans">
                        {/* Height input */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-mono text-[10px] text-ivory/60">
                            <span>Height Offset</span>
                            <span className="text-woven-gold">{height} cm</span>
                          </div>
                          <input
                            type="range"
                            min="150"
                            max="210"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            className="w-full accent-woven-gold cursor-pointer"
                          />
                        </div>

                        {/* Chest input */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-mono text-[10px] text-ivory/60">
                            <span>Chest Width</span>
                            <span className="text-woven-gold">{chest} inches</span>
                          </div>
                          <input
                            type="range"
                            min="32"
                            max="52"
                            value={chest}
                            onChange={(e) => setChest(Number(e.target.value))}
                            className="w-full accent-woven-gold cursor-pointer"
                          />
                        </div>

                        {/* Shoulder input */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-mono text-[10px] text-ivory/60">
                            <span>Shoulder Width</span>
                            <span className="text-woven-gold">{shoulder} x-span</span>
                          </div>
                          <input
                            type="range"
                            min="14"
                            max="24"
                            value={shoulder}
                            onChange={(e) => setShoulder(Number(e.target.value))}
                            className="w-full accent-woven-gold cursor-pointer"
                          />
                        </div>

                        {/* Cape length input */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-mono text-[10px] text-ivory/60">
                            <span>Loom Length</span>
                            <span className="text-woven-gold">{length} inches</span>
                          </div>
                          <input
                            type="range"
                            min="30"
                            max="60"
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="w-full accent-woven-gold cursor-pointer"
                          />
                        </div>
                        <p className="text-[10px] font-mono text-crimson-coral/90 italic leading-snug">
                         * These coordinates are transferred directly to master weavers at our home looms in Nigeria.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA action cluster */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onToggleWishlist}
                      className="p-3.5 rounded border border-white/10 hover:border-crimson-coral text-ivory/80 hover:text-crimson-coral transition-colors bg-white/2"
                      aria-label="Add item to wishlist drawer"
                      id={`detail-wishlist-toggle-${product.id}`}
                    >
                      <Heart size={18} className={isWishlisted ? 'fill-crimson-coral text-crimson-coral' : ''} />
                    </button>

                    <button
                      onClick={handleCreateOrder}
                      disabled={isOrdered}
                      className={`flex-1 p-3.5 text-xs font-mono tracking-widest font-extrabold uppercase rounded shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                        isOrdered 
                          ? 'bg-[#153424] text-white' 
                          : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                      }`}
                      id={`add-to-bag-${product.id}`}
                    >
                      {isOrdered ? (
                        <span className="flex items-center gap-1.5 animate-pulse">
                          <ShieldCheck size={14} /> Fitting Saved to Bag
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <ShoppingBag size={14} /> Add Sizing to Bag
                        </span>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    className="w-full py-4 bg-gradient-to-r from-woven-gold via-crimson-coral to-woven-gold hover:opacity-95 active:scale-[0.98] text-indigo-dye text-xs font-mono tracking-widest font-black uppercase rounded shadow-xl transition-all flex items-center justify-center gap-2"
                    id={`instant-order-direct-${product.id}`}
                  >
                    <CreditCard size={15} /> Instant ATM Card Purchase
                  </button>
                </div>
              </div>
            )}

            {/* VIEW MODE 2: INTERACTIVE ATM CARD & BILLING CHECKOUT FORM */}
            {viewMode === 'payment' && (
              <div className="flex flex-col h-full justify-between space-y-4 text-xs">
                
                {/* Header & Back click */}
                <div className="flex items-center justify-between border-b border-white/15 pb-2">
                  <button 
                    type="button" 
                    onClick={() => setViewMode('details')}
                    disabled={isPaying}
                    className="text-ivory/60 hover:text-white flex items-center gap-1 font-mono text-[10px] uppercase"
                  >
                    <ChevronLeft size={14} /> Details
                  </button>
                  <span className="font-mono text-[10px] text-woven-gold font-bold">
                    STEP 2: COUTURE CARD CHECKOUT
                  </span>
                </div>

                {/* Secure Loom and interswitch system warning */}
                <div className="p-3 bg-[#13072e] rounded border border-woven-gold/20 flex gap-2" id="credit-security-disclaimer">
                  <Lock size={15} className="text-woven-gold shrink-0 mt-0.5" />
                  <div className="text-[10px] leading-relaxed text-ivory/60">
                    Your digital ATM transaction is brokered through <strong>Interswitch WebPay v2 Secure Tunnel</strong>. Card numbers are tokenized client-side instantly.
                  </div>
                </div>

                {isPaying ? (
                  /* SECURE DEBIT PAYMENT PROCESSING SCREEN */
                  <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-6">
                    <Loader2 size={44} className="text-woven-gold animate-spin" />
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono uppercase text-crimson-coral font-bold tracking-widest block">
                        Interbank Settlement Network
                      </span>
                      <h4 className="font-display font-medium text-lg text-white">
                        Authorizing ATM Secure Debit...
                      </h4>
                      <p className="text-xs text-ivory/50 font-mono italic max-w-xs mx-auto">
                        "{paymentStep}"
                      </p>
                    </div>
                  </div>
                ) : (
                  /* ACTIVE CARD REGISTRY INPUT FORM */
                  <form onSubmit={handleSubmitPayment} className="space-y-4 overflow-y-auto max-h-[55vh] pr-1">

                    {/* INTERACTIVE HIGH-FASHION CREDIT DEBIT CARD */}
                    <div className="py-2">
                      <div className="relative w-full h-44 rounded-xl bg-gradient-to-br from-[#1C0F4A] via-[#800D17] to-[#C4581F] p-4 md:p-5 shadow-2xl border border-white/10 flex flex-col justify-between overflow-hidden">
                        
                        {/* Chip detail & brand insignia */}
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="w-10 h-7 rounded bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                              <div className="w-6 h-4 border border-amber-400/25 rounded-xs" />
                            </div>
                            <span className="text-[6px] font-mono text-ivory/40 block">CHIP AUTH</span>
                          </div>
                          
                          <div className="text-right">
                            <span className="font-display font-black text-sm text-woven-gold tracking-widest block leading-none">ÀṢÀ</span>
                            <span className="text-[6px] font-mono text-crimson-coral tracking-widest block font-bold">COUTURE VIP</span>
                          </div>
                        </div>

                        {/* Card Number display */}
                        <div className="font-mono text-md md:text-lg tracking-[0.2em] text-white text-center py-2" id="atm-card-number-shadow">
                          {formatCardNumber(cardNumber) || '•••• •••• •••• ••••'}
                        </div>

                        {/* Card bottom tray data */}
                        <div className="flex justify-between items-end font-mono">
                          <div className="max-w-[190px] truncate">
                            <span className="text-[6px] text-ivory/40 block uppercase">Cardholder Name</span>
                            <span className="text-[11px] text-white block uppercase font-medium">
                              {cardName || 'PATRON NAME'}
                            </span>
                          </div>
                          
                          <div className="flex gap-4">
                            <div>
                              <span className="text-[6px] text-ivory/40 block uppercase">Expires</span>
                              <span className="text-[11px] text-white block">
                                {formatExpiry(cardExpiry) || 'MM/YY'}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-[6px] text-ivory/40 block uppercase">ATM Card Type</span>
                              <span className="text-[10px] text-woven-gold font-bold block uppercase">
                                {getCardType(cardNumber)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Radial atmospheric detail */}
                        <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-woven-gold/10 rounded-full blur-xl pointer-events-none" />
                      </div>
                    </div>

                    {/* ERROR TEXT BANNER if validation triggers faulty */}
                    {errorText && (
                      <div className="p-3 bg-crimson-coral/15 border border-crimson-coral/40 rounded text-crimson-coral text-[11px] flex gap-1.5 items-center">
                        <ShieldAlert size={14} className="shrink-0" />
                        <span>{errorText}</span>
                      </div>
                    )}

                    {/* SECTION: DELIVERY COORDINATES */}
                    <div className="space-y-3 pt-1 border-t border-white/5">
                      <span className="text-[9px] font-mono text-woven-gold uppercase block font-bold">
                        Part 1: Parcel Coordinates
                      </span>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-ivory/50 block">RECIPIENT NAME</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Alhaji Aminu Gbadamosi"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            className="w-full p-2 bg-black/35 text-white border border-white/5 rounded focus:border-woven-gold focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-ivory/50 block">SECURE TELEPHONE (WHATSAPP)</label>
                          <input 
                            type="tel" 
                            required
                            placeholder="+234 803 555 1234"
                            value={recipientPhone}
                            onChange={(e) => setRecipientPhone(e.target.value)}
                            className="w-full p-2 bg-black/35 text-white border border-white/5 rounded focus:border-woven-gold focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2 space-y-1">
                          <label className="text-[9px] font-mono text-ivory/50 block">SHIPPING ADDRESS</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Apt 4B, 18 Lugard Avenue"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            className="w-full p-2 bg-black/35 text-white border border-white/5 rounded focus:border-woven-gold focus:outline-none"
                          />
                        </div>
                        <div className="col-span-1 space-y-1">
                          <label className="text-[9px] font-mono text-ivory/50 block">STATE</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Lagos State"
                            value={deliveryState}
                            onChange={(e) => setDeliveryState(e.target.value)}
                            className="w-full p-2 bg-black/35 text-white border border-white/5 rounded focus:border-woven-gold focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION: ATM DEBIT CARD CREDENTIALS */}
                    <div className="space-y-3 pt-3 border-t border-white/5">
                      <span className="text-[9px] font-mono text-woven-gold uppercase block font-bold">
                        Part 2: ATM Card Cryptographic Vault
                      </span>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-ivory/50 block">CARD NUMBER (16-DIGIT)</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required
                            maxLength={19}
                            placeholder="5061 2345 6789 0123"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            className="w-full p-2 bg-black/35 text-white border border-white/5 rounded focus:border-woven-gold focus:outline-none font-mono"
                          />
                          <span className="absolute right-3 top-2 text-[9px] text-[#D4A843] font-mono font-bold uppercase">
                            {getCardType(cardNumber)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-ivory/50 block">CARDHOLDER NAME (AS SHOWN ON CHIP CARD)</label>
                        <input 
                          type="text" 
                          required
                          placeholder="AMINU A. GBADAMOSI"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full p-2 bg-black/35 text-white border border-white/5 rounded focus:border-woven-gold focus:outline-none uppercase font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-ivory/50 block">EXPIRY (MM/YY)</label>
                          <input 
                            type="text" 
                            required
                            maxLength={5}
                            placeholder="12/28"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                            className="w-full p-2 bg-black/35 text-white border border-white/5 rounded focus:border-woven-gold focus:outline-none font-mono text-center"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-ivory/50 block">CVV CODES (REVERSE)</label>
                          <input 
                            type="password" 
                            required
                            maxLength={3}
                            placeholder="***"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                            className="w-full p-2 bg-black/35 text-white border border-white/5 rounded focus:border-woven-gold focus:outline-none font-mono text-center"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-woven-gold block font-semibold">ATM PIN (SECURE)</label>
                          <input 
                            type="password" 
                            required
                            maxLength={4}
                            placeholder="****"
                            value={cardPin}
                            onChange={(e) => setCardPin(e.target.value.replace(/\D/g, ''))}
                            className="w-full p-2 bg-black/35 text-[#D4A843] border border-woven-gold/20 rounded focus:border-woven-gold focus:outline-none font-mono text-bold text-center tracking-widest"
                          />
                        </div>
                      </div>
                    </div>

                    {/* VALUATION BREAKDOWN */}
                    <div className="bg-black/30 p-3 rounded border border-white/5 space-y-1 mt-4 text-[11px] font-mono text-ivory/60">
                      <div className="flex justify-between">
                        <span>Original Loom Valuation:</span>
                        <span>₦{product.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Heritage Dye & Thread Premium:</span>
                        <span className="text-forest-green">Free (Included)</span>
                      </div>
                      <div className="flex justify-between border-t border-white/5 pt-1.5 font-bold text-white">
                        <span>Total Debit Amount (NGN):</span>
                        <span className="text-woven-gold">₦{product.price.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Submission Secure CTA button */}
                    <button
                      type="submit"
                      className="w-full mt-4 py-4 bg-gradient-to-r from-[#800D17] to-crimson-coral text-white font-mono text-xs uppercase tracking-widest font-black rounded hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                      id="process-card-settlement-btn"
                    >
                      <Lock size={13} className="text-white" /> Securely Process payment — ₦{product.price.toLocaleString()}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* VIEW MODE 3: BILLING & PAYMENT SUCCESS ROYAL SEAL CERTIFICATE */}
            {viewMode === 'success' && (
              <div className="flex flex-col h-full justify-between space-y-6 text-center py-6">
                
                {/* Checkmark cluster with golden glow */}
                <div className="w-16 h-16 rounded-full bg-[#153424] text-forest-green flex items-center justify-center mx-auto border-2 border-forest-green shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 size={32} />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-crimson-coral uppercase font-extrabold block">
                    ÀṢÀ COUTURE ROYAL SEAL OF COOPERATIVE PURCHASE
                  </span>
                  <h4 className="font-display font-bold text-2xl lg:text-3xl text-white uppercase tracking-tight">
                    PAYMENT DEBITED SECURELY
                  </h4>
                  <p className="text-xs text-woven-gold font-mono font-medium leading-none">
                    Atelier Ledger ID: {confirmedOrderId}
                  </p>
                </div>

                {/* High quality summary invoice ticket */}
                <div className="bg-[#10092B] p-4 rounded-lg text-left border border-white/5 space-y-3 font-mono text-[11px] text-ivory/80">
                  <p className="leading-relaxed text-center pb-2 border-b border-white/5 text-xs text-ivory">
                    Excellent, <strong>{recipientName || 'Patron'}</strong>. Your payment of <strong>₦{product.price.toLocaleString()}</strong> has completed successfully.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase">Loom Sized Fit:</span>
                      <span className="text-white font-semibold">
                        {sizeMode === 'custom' ? 'Bespoke Sizes' : `Size ${selectedStandardSize}`}
                      </span>
                    </div>

                    <div>
                      <span className="text-white/40 block text-[9px] uppercase">Registered Phone:</span>
                      <span className="text-white font-semibold">{recipientPhone || 'N/A'}</span>
                    </div>

                    <div className="col-span-2">
                      <span className="text-white/40 block text-[9px] uppercase">Shipping Destination Address:</span>
                      <span className="text-white font-semibold block leading-tight">
                        {deliveryAddress}, {deliveryState}
                      </span>
                    </div>

                    <div>
                      <span className="text-white/40 block text-[9px] uppercase">ATM Card Debited:</span>
                      <span className="text-woven-gold font-bold">
                        {getCardType(cardNumber)} (•••• {cardNumber.replace(/\D/g, '').slice(-4)})
                      </span>
                    </div>

                    <div>
                      <span className="text-white/40 block text-[9px] uppercase">Sourcing Guild:</span>
                      <span className="text-forest-green font-semibold">
                        Benin City, Kano, & Aba Cooperatives
                      </span>
                    </div>
                  </div>
                </div>

                {/* Helper notice */}
                <p className="text-xs text-ivory/60 leading-relaxed font-sans max-w-sm mx-auto">
                  A master weaver has been reserved for your clothing. We will contact you on WhatsApp via {recipientPhone} to crosscheck your measurements before threads are loaded onto our hand-looms.
                </p>

                {/* Print button & Close window */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] uppercase tracking-widest rounded flex items-center justify-center gap-1.5"
                    id="download-atelier-ticket-btn"
                  >
                    <Download size={13} /> Print Invoice & Receipt
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full py-3.5 bg-gradient-to-r from-woven-gold to-crimson-coral text-indigo-dye font-mono text-xs uppercase tracking-widest font-black rounded-lg hover:opacity-95 shadow-lg active:scale-95 transition-all text-center block"
                    id="finish-order-conclude-btn"
                  >
                    Conclude & Keep Browsing
                  </button>
                </div>

              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
