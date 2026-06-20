import { motion, AnimatePresence } from 'motion/react';
import { X, Ruler, HelpCircle, Star, Sparkles } from 'lucide-react';

interface SizingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizingGuideModal({ isOpen, onClose }: SizingGuideModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-[#1A1040] border-2 border-woven-gold/40 p-6 md:p-8 rounded-xl max-w-2xl w-full text-left overflow-hidden shadow-2xl z-10 space-y-6"
          id="sizing-guide-modal"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-ivory/60 hover:text-woven-gold transition-colors p-1"
            aria-label="Close sizing coordinate table"
          >
            <X size={20} />
          </button>

          <div className="flex items-center space-x-3 text-woven-gold">
            <Ruler size={24} />
            <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
              Couture Body Coordinate Matrix
            </h3>
          </div>

          <p className="text-xs text-ivory/70 leading-relaxed font-sans">
            African heritage dresses are naturally voluminous. A standard S/M/L label represents a wider drape profile 
            compared to Western garments. Refer to the reference matrix below for clean physical chest and sleeve parameters.
          </p>

          <div className="overflow-x-auto border border-white/10 rounded">
            <table className="w-full text-left text-xs font-mono text-ivory/80 min-w-[500px]">
              <thead className="bg-[#120A2E] text-woven-gold uppercase text-[10px] borer-b border-white/10">
                <tr>
                  <th className="p-3">Standard Size</th>
                  <th className="p-3">UK / US Gauge</th>
                  <th className="p-3">Chest (inches)</th>
                  <th className="p-3">Shoulder Span (inches)</th>
                  <th className="p-3">Agbada / Robe Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 whitespace-nowrap">
                <tr className="hover:bg-white/2">
                  <td className="p-3 font-bold text-white">S</td>
                  <td className="p-3">36—38</td>
                  <td className="p-3">34—36</td>
                  <td className="p-3">16.5</td>
                  <td className="p-3">38 inches (Mini / Kaftan)</td>
                </tr>
                <tr className="hover:bg-white/2">
                  <td className="p-3 font-bold text-white">M</td>
                  <td className="p-3">38—40</td>
                  <td className="p-3">38—40</td>
                  <td className="p-3">17.5</td>
                  <td className="p-3">42 inches (Medium drape)</td>
                </tr>
                <tr className="hover:bg-white/2">
                  <td className="p-3 font-bold text-white">L</td>
                  <td className="p-3">42—44</td>
                  <td className="p-3">42—44</td>
                  <td className="p-3">18.5</td>
                  <td className="p-3">45 inches (Royal drape)</td>
                </tr>
                <tr className="hover:bg-white/2">
                  <td className="p-3 font-bold text-white">XL</td>
                  <td className="p-3">46—48</td>
                  <td className="p-3">46—48</td>
                  <td className="p-3">19.5</td>
                  <td className="p-3">48 inches (Grand Babariga)</td>
                </tr>
                <tr className="hover:bg-white/2">
                  <td className="p-3 font-bold text-white">XXL</td>
                  <td className="p-3">50—52</td>
                  <td className="p-3">50—52</td>
                  <td className="p-3">20.5</td>
                  <td className="p-3">52 inches (Max majestic length)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#120A2E] p-4 rounded border border-white/5 space-y-2 text-xs text-ivory/60">
            <span className="font-mono text-[9px] uppercase tracking-wider text-terracotta font-extrabold flex items-center gap-1">
              <Sparkles size={11} /> Looming Customization Notes:
            </span>
            <ul className="space-y-1 pl-4 list-disc font-sans leading-relaxed">
              <li>For Agbadas, select size matching your exact height so sleeves align with structural hand gestures.</li>
              <li>Pre-folded headwear ("Gele") has adaptive strap adjusters, rendering it accommodating to all crown measures.</li>
              <li>You may supply bespoke neck diameter offsets during any checkout modal segment config.</li>
            </ul>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-woven-gold hover:bg-ivory text-indigo-dye text-xs font-mono font-black uppercase tracking-widest transition-colors pointer-all rounded"
          >
            Acknowledge Matrix Details
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
