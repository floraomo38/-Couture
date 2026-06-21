import React, { useState } from 'react';
import { Heart, ShoppingBag, Menu, X, Search, ChevronRight, Share2, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../data';

interface HeaderProps {
  wishlist: Product[];
  removeFromWishlist: (product: Product) => void;
  cartCount: number;
  openCartDrawer: () => void;
  onNavigate: (sectionId: string) => void;
  onProductClick: (product: Product) => void;
}

export default function Header({
  wishlist,
  removeFromWishlist,
  cartCount,
  openCartDrawer,
  onNavigate,
  onProductClick,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Search filter
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    // Dynamic mock search
    import('../data').then(({ PRODUCTS }) => {
      const filtered = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.culture.toLowerCase().includes(query.toLowerCase()) ||
          p.fabricType.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    });
  };

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Àṣà Couture',
        text: 'African Heritage Haute Couture celebrating Edo, Hausa, & Igbo textile traditions.',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-indigo-dye/95 backdrop-blur-md border-b border-woven-gold/10 px-4 py-3 lg:px-8 shadow-lg" id="app-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            className="flex flex-col items-start cursor-pointer group"
            onClick={() => handleNavClick('hero')}
            id="brand-logo"
          >
            <h1 className="font-display text-2xl lg:text-3xl font-extrabold tracking-[0.18em] text-woven-gold uppercase transition-colors group-hover:text-ivory leading-none">
              Àṣà
            </h1>
            <span className="text-[9px] font-mono tracking-[0.35em] text-crimson-coral uppercase font-bold pl-0.5 mt-1">
              COUTURE
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-sans" id="desktop-nav">
            <button 
              onClick={() => handleNavClick('showcase')} 
              className="text-ivory/80 hover:text-woven-gold transition-colors font-medium relative py-1 group"
            >
              Heritage
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-woven-gold transition-all duration-300 group-hover:w-full" />
            </button>
            <button 
              onClick={() => handleNavClick('collection')} 
              className="text-ivory/80 hover:text-woven-gold transition-colors font-medium relative py-1 group"
            >
              Collections
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-woven-gold transition-all duration-300 group-hover:w-full" />
            </button>
            <button 
              onClick={() => handleNavClick('story')} 
              className="text-ivory/80 hover:text-woven-gold transition-colors font-medium relative py-1 group"
            >
              Craftsmanship
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-woven-gold transition-all duration-300 group-hover:w-full" />
            </button>
            <button 
              onClick={() => handleNavClick('occasions')} 
              className="text-ivory/80 hover:text-woven-gold transition-colors font-medium relative py-1 group"
            >
              Occasions
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-woven-gold transition-all duration-300 group-hover:w-full" />
            </button>
            <button 
              onClick={() => handleNavClick('testimonials')} 
              className="text-ivory/80 hover:text-woven-gold transition-colors font-medium relative py-1 group"
            >
              Reviews
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-woven-gold transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* Right Interactions */}
          <div className="flex items-center space-x-2 md:space-x-4" id="header-interactions">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 rounded-full hover:bg-white/5 text-ivory/90 hover:text-woven-gold transition-colors"
              aria-label="Search Collection"
            >
              <Search size={20} />
            </button>

            {/* Share Option */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full hover:bg-white/5 text-ivory/90 hover:text-woven-gold transition-colors hidden sm:inline-block"
              aria-label="Share Website"
            >
              <Share2 size={19} />
            </button>

            {/* Wishlist Hearts Toggle */}
            <button
              onClick={() => setIsWishlistDrawerOpen(true)}
              className="p-1.5 rounded-full hover:bg-white/5 text-ivory/90 hover:text-crimson-coral transition-colors relative"
              aria-label="Wishlist items"
            >
              <Heart size={20} className={wishlist.length > 0 ? 'fill-crimson-coral text-crimson-coral' : ''} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-crimson-coral text-ivory text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={openCartDrawer}
              className="p-1.5 rounded-full hover:bg-white/5 text-ivory/90 hover:text-woven-gold transition-colors relative"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-woven-gold text-indigo-dye text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full hover:bg-white/5 text-ivory/95 transition-colors"
              aria-label="Toggle Menu"
            >
              <Menu size={22} />
            </button>
          </div>

        </div>
      </header>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-indigo-dye/98 backdrop-blur-md flex flex-col p-6 cursor-default"
          >
            <div className="max-w-4xl mx-auto w-full mt-10 md:mt-24">
              <div className="flex items-center justify-between border-b border-woven-gold/30 pb-3">
                <div className="flex items-center space-x-3 w-full">
                  <Search className="text-woven-gold" size={24} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by culture, garment, fabric model..."
                    className="bg-transparent text-xl md:text-2xl text-ivory focus:outline-none placeholder-ivory/40 w-full"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="p-2 text-ivory/60 hover:text-woven-gold transition-colors"
                >
                  <X size={26} />
                </button>
              </div>

              {/* Live Search Results */}
              <div className="mt-8 overflow-y-auto max-h-[60vh] space-y-4 pr-2">
                {searchQuery && searchResults.length === 0 ? (
                  <p className="text-ivory/50 font-mono text-center py-10">No couture garments found for "{searchQuery}"</p>
                ) : (
                  searchResults.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onProductClick(prod);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-white/5 hover:border-woven-gold/20"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-cover rounded bg-indigo-dye/40"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full font-semibold ${
                            prod.culture === 'Edo' ? 'bg-crimson-coral/20 text-crimson-coral' :
                            prod.culture === 'Hausa' ? 'bg-woven-gold/20 text-woven-gold' : 'bg-forest-green/20 text-forest-green'
                          }`}>
                            {prod.culture}
                          </span>
                          <span className="text-xs text-ivory/50 font-sans">{prod.fabricType}</span>
                        </div>
                        <h4 className="font-display font-bold text-wide text-ivory mt-0.5">{prod.name}</h4>
                      </div>
                      <div className="text-woven-gold font-mono font-medium">
                        ₦{prod.price.toLocaleString()}
                      </div>
                      <ChevronRight size={18} className="text-woven-gold/60" />
                    </div>
                  ))
                )}
                {!searchQuery && (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-ivory/40">
                    <Compass className="text-woven-gold/40 mb-3 animate-pulse" size={36} />
                    <p className="text-sm">Try searching "Edo", "Isiagu", "Silk", "George", or "Velvet"</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WISHLIST DRAWER */}
      <AnimatePresence>
        {isWishlistDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="absolute inset-0 overflow-hidden">
              {/* Overlay background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsWishlistDrawerOpen(false)}
                className="absolute inset-0 bg-black backdrop-blur-xs transition-opacity"
              />

              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className="pointer-events-auto w-screen max-w-md bg-indigo-dye border-l border-woven-gold/20 h-full shadow-2xl flex flex-col"
                >
                  <div className="p-6 border-b border-woven-gold/10 flex items-center justify-between">
                    <span className="flex items-center text-woven-gold font-display font-medium text-lg uppercase tracking-wider gap-2">
                      <Heart className="fill-crimson-coral text-crimson-coral" size={18} />
                      Your Collections Wishlist
                    </span>
                    <button
                      onClick={() => setIsWishlistDrawerOpen(false)}
                      className="text-ivory/60 hover:text-woven-gold p-2 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {wishlist.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <Heart className="text-ivory/25" size={48} />
                        <p className="text-ivory/60 font-sans text-sm">Your wardrobe curator is empty.</p>
                        <button
                          onClick={() => {
                            setIsWishlistDrawerOpen(false);
                            handleNavClick('collection');
                          }}
                          className="px-6 py-2.5 bg-woven-gold text-indigo-dye text-xs font-mono tracking-widest uppercase hover:bg-ivory transition-colors duration-300 font-bold"
                        >
                          Curate Wardrobe
                        </button>
                      </div>
                    ) : (
                      wishlist.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-3 border border-white/5 rounded-lg bg-white/2 hover:border-woven-gold/20 transition-all">
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 object-cover rounded cursor-pointer"
                            onClick={() => {
                              onProductClick(item);
                              setIsWishlistDrawerOpen(false);
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] font-mono tracking-wider text-woven-gold uppercase block">
                              {item.culture} Collection
                            </span>
                            <h4
                              onClick={() => {
                                onProductClick(item);
                                setIsWishlistDrawerOpen(false);
                              }}
                              className="font-display font-bold text-sm text-ivory truncate hover:text-woven-gold transition-colors cursor-pointer"
                            >
                              {item.name}
                            </h4>
                            <p className="text-xs text-ivory/50 truncate mb-1">{item.fabricType}</p>
                            <span className="font-mono text-crimson-coral text-sm font-semibold">₦{item.price.toLocaleString()}</span>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={() => {
                                onProductClick(item);
                                setIsWishlistDrawerOpen(false);
                              }}
                              className="p-1 px-2.5 bg-woven-gold/15 hover:bg-woven-gold text-woven-gold hover:text-indigo-dye text-[10px] rounded font-mono uppercase font-semibold transition-all"
                            >
                              Explore
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item)}
                              className="text-[10px] text-ivory/40 hover:text-crimson-coral uppercase tracking-[0.05em] font-mono transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
            {/* Dark background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-indigo-dye border-r border-woven-gold/20 flex flex-col p-6 shadow-2xl justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-woven-gold/10 pb-4 mb-8">
                  <div className="flex flex-col">
                    <span className="font-display text-2xl font-black text-woven-gold tracking-widest leading-none">ÀṢÀ</span>
                    <span className="text-[8px] font-mono tracking-[0.3em] text-crimson-coral uppercase font-bold mt-1">COUTURE</span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-ivory/80 hover:text-woven-gold">
                    <X size={22} />
                  </button>
                </div>

                <div className="flex flex-col space-y-6 text-base uppercase tracking-widest text-left font-sans">
                  <button
                    onClick={() => handleNavClick('showcase')}
                    className="text-ivory hover:text-woven-gold py-1 text-left font-medium border-b border-white/5 transition-all"
                  >
                    Cultural Heritage
                  </button>
                  <button
                    onClick={() => handleNavClick('collection')}
                    className="text-ivory hover:text-woven-gold py-1 text-left font-medium border-b border-white/5 transition-all"
                  >
                    Bespoke Collections
                  </button>
                  <button
                    onClick={() => handleNavClick('story')}
                    className="text-ivory hover:text-woven-gold py-1 text-left font-medium border-b border-white/5 transition-all"
                  >
                    Our Handcraft Story
                  </button>
                  <button
                    onClick={() => handleNavClick('occasions')}
                    className="text-ivory hover:text-woven-gold py-1 text-left font-medium border-b border-white/5 transition-all"
                  >
                    Occasions Navigator
                  </button>
                  <button
                    onClick={() => handleNavClick('testimonials')}
                    className="text-ivory hover:text-woven-gold py-1 text-left font-medium border-b border-white/5 transition-all"
                  >
                    Customer Testimony
                  </button>
                </div>
              </div>

              {/* Mobile Menu Footer Socials */}
              <div className="border-t border-woven-gold/10 pt-4 flex flex-col space-y-3">
                <span className="text-[10px] font-mono tracking-wider text-woven-gold uppercase">Heritage Values</span>
                <p className="text-xs text-ivory/60 leading-relaxed font-sans">
                  "Àṣà Couture translates generations of loom-shuttling intelligence to modern runways."
                </p>
                <div className="flex justify-between items-center text-[10px] font-mono text-crimson-coral pt-2">
                  <span>Àṣà (Edo)</span>
                  <span>Al'ada (Hausa)</span>
                  <span>Omenala (Igbo)</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
