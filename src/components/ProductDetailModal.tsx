import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Sparkles, Scale, Clock, ShieldCheck, ShoppingBag, Ruler } from 'lucide-react';
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
  const [sizeMode, setSizeMode] = useState<'standard' | 'custom'>('standard');
  const [selectedStandardSize, setSelectedStandardSize] = useState<string>('M');
  
  // Custom Bespoke measurements
  const [height, setHeight] = useState<number>(180);
  const [chest, setChest] = useState<number>(40);
  const [shoulder, setShoulder] = useState<number>(18);
  const [length, setLength] = useState<number>(42);

  const [isOrdered, setIsOrdered] = useState(false);

  if (!product || !isOpen) return null;

  // Compute estimated crafting stats based on custom measurements or standard weight
  const fabricComplexity = product.culture === 'Edo' ? 1.3 : product.culture === 'Hausa' ? 1.1 : 1.2;
  const areaMultiplier = sizeMode === 'custom' 
    ? (chest * shoulder * length) / 30000 
    : selectedStandardSize === 'S' ? 0.9 : selectedStandardSize === 'M' ? 1.0 : selectedStandardSize === 'L' ? 1.1 : 1.25;
  
  const estimatedWeaponsTime = Math.round(18 * fabricComplexity * areaMultiplier);
  const yarnYards = Math.round(450 * fabricComplexity * areaMultiplier);

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
          {/* Close Trigger */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-indigo-dye/80 border border-white/10 hover:border-woven-gold text-ivory/60 hover:text-woven-gold transition-all"
            aria-label="Close details"
          >
            <X size={18} />
          </button>

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
                      <Clock size={11} className="text-terracotta" /> {estimatedWeaponsTime} Days Est.
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

          {/* Right Column: Garment Customizations */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-none">
            
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

                    <p className="text-[10px] font-mono text-terracotta/90 italic leading-snug">
                     * These coordinates are transferred directly to master weavers at our home looms in Nigeria.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* CTA action cluster */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
              <button
                onClick={onToggleWishlist}
                className="p-3.5 rounded border border-white/10 hover:border-crimson-coral text-ivory/80 hover:text-crimson-coral transition-colors bg-white/2"
                aria-label="Add item to wishlist drawer"
              >
                <Heart size={18} className={isWishlisted ? 'fill-crimson-coral text-crimson-coral' : ''} />
              </button>

              <button
                onClick={handleCreateOrder}
                disabled={isOrdered}
                className={`flex-1 p-3.5 text-xs font-mono tracking-widest font-extrabold uppercase rounded shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  isOrdered 
                    ? 'bg-forest-green text-ivory' 
                    : 'bg-gradient-to-r from-woven-gold to-crimson-coral hover:opacity-90 active:scale-95 text-indigo-dye'
                }`}
              >
                {isOrdered ? (
                  <span className="flex items-center gap-1.5 animate-pulse">
                    <ShieldCheck size={14} /> Fitting Configured!
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <ShoppingBag size={14} /> Curate Fitting Segment
                  </span>
                )}
              </button>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
