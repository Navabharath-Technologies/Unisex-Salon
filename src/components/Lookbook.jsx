import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ZoomIn } from 'lucide-react';

const lookbookItems = [
  { id: 1, title: 'Couture Balayage', category: 'HAIR', img: '/hair_service.png', desc: 'Seamless, sun-kissed blonde gradients, custom-tailored for rich volume and soft motion.' },
  { id: 2, title: 'Basalt Stone Harmony', category: 'STYLING', img: '/facial_service.png', desc: 'Symmetrical stones layered with aromatic oils to relieve deep muscular tension.' },
  { id: 3, title: 'The Imperial Sculpt', category: 'GROOMING', img: '/grooming_service.png', desc: 'Sharp razor lines, steam towel conditioning, and beard hydration therapy.' },
  { id: 4, title: 'Signature D’Or Salon', category: 'STYLING', img: '/hero_salon_bg.png', desc: 'An overview of our main studio floor designed with high-end brass accents.' },
  { id: 5, title: 'Gilded Nails Couture', category: 'STYLING', img: '/nail_service.png', desc: 'Prestige manicure services featuring metallic gold accents on obsidian base.' },
  { id: 6, title: 'Vogue Scalp Therapy', category: 'HAIR', img: '/hair_wash_therapy.png', desc: 'Indulgent botanical oil washing wash followed by head and shoulder acupressure.' },
  { id: 7, title: 'Couture Blowout', category: 'HAIR', img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80', desc: 'Premium blowouts crafted to create elegant bouncy curls and long-lasting shape.' },
  { id: 8, title: 'Platinum Edge Cut', category: 'GROOMING', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80', desc: 'Precision styling tailored to highlight facial symmetry and individual edge.' },
  { id: 9, title: 'Rose Gold Manicure', category: 'STYLING', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80', desc: 'Hand spa and polish utilizing premium nourishing oils and high-durability rose gold glazes.' },
  { id: 10, title: 'Botanical Coloration', category: 'HAIR', img: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80', desc: 'Vibrant organic hair color application leaving cuticles fully protected and brilliantly glossy.' },
  { id: 11, title: 'The Royal Lounge Shave', category: 'GROOMING', img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80', desc: 'Sit back in our obsidian leather chairs for an immersive straight razor shave with botanical conditioning.' },
  { id: 12, title: 'Dermal Hydra-Revive', category: 'STYLING', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', desc: 'Advanced dermal therapy targeting hydration, micro-exfoliation, and lymphatic detox.' }
];

export default function Lookbook() {
  const [filter, setFilter] = useState('ALL');
  const [activeItem, setActiveItem] = useState(null);

  const filteredItems = filter === 'ALL' 
    ? lookbookItems 
    : lookbookItems.filter(item => item.category === filter);

  return (
    <section id="lookbook" style={{ padding: '120px 8%', backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
      {/* Glow effects */}
      <div className="luxury-glow" style={{ top: '15%', left: '5%', width: '500px', height: '500px' }} />
      <div className="luxury-glow" style={{ bottom: '10%', right: '5%', width: '400px', height: '400px' }} />

      <div className="section-header">
        <span>Curated Masterpieces</span>
        <h2>STYLE LOOKBOOK</h2>
        <p>Browse through some of our elite hair styling, facial therapies, and beard sculpting services.</p>
      </div>

      {/* Filter Buttons */}
      <div
        className="lookbook-filters"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '50px',
          position: 'relative',
          zIndex: 2
        }}
      >
        {['ALL', 'HAIR', 'GROOMING', 'STYLING'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              letterSpacing: '0.25rem',
              color: filter === cat ? 'var(--text-gold)' : 'var(--text-muted)',
              cursor: 'pointer',
              padding: '8px 15px',
              transition: 'all 0.3s ease',
              borderBottom: filter === cat ? '1px solid var(--text-gold)' : '1px solid transparent'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lookbook Grid */}
      <motion.div
        layout
        className="lookbook-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          position: 'relative',
          zIndex: 2
        }}
      >
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              onClick={() => setActiveItem(item)}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid var(--border-dark)'
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                const overlay = e.currentTarget.querySelector('.overlay-grid');
                if (img) img.style.transform = 'scale(1.08)';
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                const overlay = e.currentTarget.querySelector('.overlay-grid');
                if (img) img.style.transform = 'scale(1)';
                if (overlay) overlay.style.opacity = '0';
              }}
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              />

              {/* Luxury Hover Overlay */}
              <div
                className="overlay-grid"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(8, 8, 10, 0.85)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  border: '15px solid rgba(197, 168, 128, 0.08)'
                }}
              >
                <ZoomIn size={24} style={{ color: 'var(--text-gold)', marginBottom: '15px' }} />
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '0.85rem',
                  color: 'var(--text-gold)',
                  marginBottom: '5px'
                }}>
                  {item.category}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  letterSpacing: '0.1em',
                  textAlign: 'center',
                  textTransform: 'uppercase'
                }}>
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(8, 8, 10, 0.95)',
              backdropFilter: 'blur(10px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="lookbook-modal-box"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-gold-strong)',
                maxWidth: '900px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                position: 'relative',
                boxShadow: 'var(--shadow-heavy)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-gold)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              >
                <X size={20} />
              </button>

              {/* Image Side */}
              <div className="lookbook-modal-image-side" style={{ height: '400px', overflow: 'hidden' }}>
                <img
                  src={activeItem.img}
                  alt={activeItem.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Info Side */}
              <div className="lookbook-modal-info-side" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  color: 'var(--text-gold)',
                  marginBottom: '10px'
                }}>
                  {activeItem.category} COLLECTION
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  marginBottom: '20px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid var(--border-gold)',
                  paddingBottom: '15px'
                }}>
                  {activeItem.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  fontWeight: 300,
                  marginBottom: '30px'
                }}>
                  {activeItem.desc}
                </p>
                <div>
                  <button
                    className="glow-btn"
                    style={{ fontSize: '0.75rem', padding: '12px 25px' }}
                    onClick={() => {
                      setActiveItem(null);
                      // Scroll to contact/booking
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    INQUIRE ABOUT THIS STYLE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
