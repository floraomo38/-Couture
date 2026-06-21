import React from 'react';
import { Heart, ZoomIn, Eye, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../data';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onProductClick: () => void;
  onAddToCart: () => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onProductClick,
  onAddToCart,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      className="group relative flex flex-col justify-between bg-[#19113E] border border-white/5 hover:border-woven-gold/30 rounded-lg overflow-hidden transition-all duration-400 shadow-lg h-full"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full overflow-hidden bg-indigo-dye/45">
        
        {/* Culture Tag Overlay */}
        <div className="absolute top-3 left-3 z-10" id={`prod-badge-${product.id}`}>
          <span className={`text-[9px] font-mono tracking-widest font-extrabold px-3 py-1 uppercase rounded-full shadow-md ${
            product.culture === 'Edo' ? 'bg-crimson-coral text-ivory border border-crimson-coral/30' :
            product.culture === 'Hausa' ? 'bg-woven-gold text-indigo-dye border border-woven-gold/30' :
            'bg-forest-green text-ivory border border-forest-green/30'
          }`}>
            {product.culture}
          </span>
        </div>

        {/* Favorite Heart Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-indigo-dye/80 backdrop-blur-md border border-white/10 hover:border-crimson-coral/40 text-ivory/60 hover:text-crimson-coral transition-all shadow-md hover:scale-105 active:scale-90"
          aria-label={isWishlisted ? "Remove from wardrobe curator" : "Add to wardrobe curator"}
          id={`wishlist-trigger-${product.id}`}
        >
          <Heart
            size={16}
            className={`transition-colors ${isWishlisted ? 'fill-crimson-coral text-crimson-coral' : 'text-ivory'}`}
          />
        </button>

        {/* Real image of item */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            // Unsplash backup if generated URLs act up
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80";
          }}
        />

        {/* Hover backdrop with action shortcuts */}
        <div className="absolute inset-0 bg-indigo-dye/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={onProductClick}
            className="p-3 rounded-full bg-woven-gold text-indigo-dye hover:bg-ivory transition-colors pointer-all shadow-lg active:scale-95 flex items-center justify-center"
            title="Configure garment sizing"
            id={`quick-view-${product.id}`}
          >
            <Eye size={18} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="p-3 rounded-full bg-crimson-coral text-ivory hover:bg-woven-gold hover:text-indigo-dye transition-colors pointer-all shadow-lg active:scale-95 flex items-center justify-center"
            title="Add to bespoke parcel"
            id={`add-parcel-${product.id}`}
          >
            <ShoppingBag size={18} />
          </button>
        </div>

      </div>

      {/* Product Information Area */}
      <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-wider text-woven-gold font-medium uppercase">
              {product.fabricType}
            </span>
          </div>

          <h4
            onClick={onProductClick}
            className="font-display font-bold text-base text-white tracking-wide hover:text-woven-gold transition-colors cursor-pointer"
          >
            {product.name}
          </h4>
          
          <p className="text-xs text-ivory/60 line-clamp-2 leading-relaxed h-8">
            {product.description}
          </p>
        </div>

        {/* Bottom Price/CTA area */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-ivory/35 uppercase">Couture Price</span>
            <span className="font-mono text-white font-bold text-sm">₦{product.price.toLocaleString()}</span>
          </div>

          <button
            onClick={onProductClick}
            className="text-[10px] font-mono uppercase font-bold tracking-widest text-woven-gold hover:text-ivory transition-colors flex items-center gap-1"
          >
            Bespoke Fit <ZoomIn size={12} />
          </button>
        </div>

      </div>

    </motion.div>
  );
}
