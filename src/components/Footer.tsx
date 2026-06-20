import { Instagram, MessageCircle, Mail, MapPin, ExternalLink, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  openSizingGuide: () => void;
}

export default function Footer({ onNavigate, openSizingGuide }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D0721] text-ivory/80 border-t border-woven-gold/15 py-16 px-4 lg:px-8 relative" id="app-footer">
      
      {/* Scroll to Top Trigger */}
      <button
        onClick={handleScrollToTop}
        className="absolute top-0 right-8 -translate-y-1/2 p-3 bg-woven-gold hover:bg-terracotta text-indigo-dye hover:text-white transition-all shadow-lg rounded"
        title="Ascend to peak"
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} />
      </button>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Logo and Tagline Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex flex-col">
            <span className="font-display text-3xl font-black text-woven-gold tracking-[0.16em] leading-none uppercase select-none">
              Àṣà
            </span>
            <span className="text-[10px] font-mono tracking-[0.32em] text-terracotta uppercase font-bold pl-0.5 mt-1">
              COUTURE
            </span>
          </div>

          <p className="text-xs text-ivory/60 leading-relaxed font-sans font-light max-w-sm">
            High-fashion Nigerian heritage atelier. Handmoulding premium textiles, Double-Warp Aso-Oke, 
            and historic royal embroideries into masterfully curated custom drapes for global runways.
          </p>

          <div className="flex items-center space-x-3 pt-2" id="footer-social-icons">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded bg-white/5 text-ivory hover:text-woven-gold transition-colors"
              aria-label="Bespoke Instagram Feed"
            >
              <Instagram size={16} />
            </a>
            
            <a
              href="mailto:curator@asacouture.com"
              className="p-1.5 rounded bg-white/5 text-ivory hover:text-woven-gold transition-colors"
              aria-label="Curator email mailto link"
            >
              <Mail size={16} />
            </a>
            
            {/* WhatsApp Contact button */}
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 px-3 rounded bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-indigo-dye transition-all flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider"
              aria-label="Contact tailor on WhatsApp"
            >
              <MessageCircle size={14} /> WhatsApp Tailor
            </a>
          </div>
        </div>

        {/* Quick Nav links Column */}
        <div className="md:col-span-3 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-woven-gold font-bold block">
            Lineage Collections
          </span>
          <ul className="space-y-2 text-xs text-ivory/60 font-sans list-none pl-0">
            <li>
              <button onClick={() => onNavigate('showcase')} className="hover:text-woven-gold transition-colors">
                Yoruba Adire & Aṣọ-Ẹbí
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('showcase')} className="hover:text-woven-gold transition-colors">
                Hausa Babbar Riga Brocades
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('showcase')} className="hover:text-woven-gold transition-colors">
                Igbo Coral Chieftain Velvet
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('collection')} className="hover:text-woven-gold transition-colors">
                The Royal Wedding Series
              </button>
            </li>
          </ul>
        </div>

        {/* Brand Information & Guidelines */}
        <div className="md:col-span-3 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-woven-gold font-bold block">
            Atelier Directories
          </span>
          <ul className="space-y-2 text-xs text-ivory/60 font-sans list-none pl-0">
            <li>
              <button onClick={() => onNavigate('story')} className="hover:text-woven-gold transition-colors">
                Handloom Guild Story
              </button>
            </li>
            <li>
              <button onClick={openSizingGuide} className="hover:text-woven-gold transition-colors flex items-center gap-1">
                Custom Measurement Sizing Guide <ExternalLink size={10} />
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('testimonials')} className="hover:text-woven-gold transition-colors">
                Artisan Co-operative Feed
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('newsletter')} className="hover:text-woven-gold transition-colors">
                Join Lookout Circle
              </button>
            </li>
          </ul>
        </div>

        {/* Showrooms Locations */}
        <div className="md:col-span-2 space-y-4 text-xs">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-woven-gold font-bold block">
            Our Showrooms
          </span>
          <div className="space-y-3 font-sans text-ivory/60">
            <div className="flex items-start gap-1.5">
              <MapPin size={14} className="text-terracotta shrink-0" />
              <div>
                <span className="text-white block font-semibold text-xs">Ikoyi Showroom</span>
                <span>44 Alfred Rewane, Ikoyi, Lagos</span>
              </div>
            </div>

            <div className="flex items-start gap-1.5">
              <MapPin size={14} className="text-woven-gold shrink-0" />
              <div>
                <span className="text-white block font-semibold text-xs">Maitama Mansion</span>
                <span>12 Gana Street, Maitama, Abuja</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Multilingual custom copyright disclaimer block */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/40">
        <p className="font-sans leading-snug">
          &copy; {new Date().getFullYear()} Àṣà Couture Ltd. Master-loomed with pride. Made in Nigeria.
        </p>

        {/* Requested Copyright line in Yoruba, Hausa, and Igbo */}
        <div className="flex items-center space-x-4 font-mono font-bold text-[10px] tracking-wider text-woven-gold" id="multilingual-disclaimer">
          <span className="px-2 py-0.5 border border-white/5 rounded">Àṣà (Yoruba)</span>
          <span>|</span>
          <span className="px-2 py-0.5 border border-white/5 rounded">Al'ada (Hausa)</span>
          <span>|</span>
          <span className="px-2 py-0.5 border border-white/5 rounded">Omenala (Igbo)</span>
        </div>
      </div>

    </footer>
  );
}
