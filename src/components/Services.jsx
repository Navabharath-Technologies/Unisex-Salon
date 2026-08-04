import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag, X, Check, Clock } from 'lucide-react';

const serviceData = {
  HAIR: [
    { id: 'h1', name: 'Royal Haircut & Styling', price: 95, time: 60, desc: 'Precision cut, luxury hair wash, conditioning, blow-dry, and professional styling.' },
    { id: 'h2', name: 'Balayage Couture & Tone', price: 240, time: 150, desc: 'Bespoke hand-painted highlights tailored to enhance facial structure and natural hair flow.' },
    { id: 'h3', name: 'Keratin Restorative Therapy', price: 310, time: 120, desc: 'Deep protein reconstruction to eliminate frizz, restore elasticity, and add diamond-like shine.' },
    { id: 'h4', name: 'Signature Blow-out & Gloss', price: 80, time: 45, desc: 'Luxury conditioning wash followed by our signature voluminous blowout and glaze.' }
  ],
  SKIN: [
    { id: 's1', name: 'Gold Dust Radiance Facial', price: 180, time: 90, desc: '24-karat gold leaf mask combined with lymphatic massage for ultimate skin rejuvenation.' },
    { id: 's2', name: 'Charcoal Hydra-Peel', price: 145, time: 45, desc: 'Multi-stage deep extraction and hydration treatment utilizing mineral-infused charcoal peel.' },
    { id: 's3', name: 'Micro-Needling Collagen Boost', price: 220, time: 60, desc: 'Advanced dermal therapy targeting fine lines, texture, and deep cellular collagen repair.' }
  ],
  GROOMING: [
    { id: 'g1', name: 'Royal Beard Sculpt & Shave', price: 70, time: 45, desc: 'Beard shaping, razor line definition, luxury essential oils, hot steam towel, and massage.' },
    { id: 'g2', name: 'Imperial Hair & Beard Combo', price: 140, time: 90, desc: 'Precision haircut combined with our royal beard sculpt for the ultimate modern gentleman.' },
    { id: 'g3', name: 'Scalp Revitalizing Shave', price: 60, time: 30, desc: 'Full razor scalp shave featuring hydrating pre-shave scrubs and soothing cool towels.' }
  ],
  SPA: [
    { id: 'sp1', name: 'Deep Tissue Aroma Massage', price: 160, time: 90, desc: 'Therapeutic full-body release session using hand-selected essential extracts.' },
    { id: 'sp2', name: 'Himalayan Hot Stone Spa', price: 200, time: 100, desc: 'Basalt stone therapy targeting deep muscle tissue to release stress and ground body energy.' },
    { id: 'sp3', name: 'Dead Sea Mud Body Wrap', price: 185, time: 80, desc: 'Mineral-rich mud application followed by thermal cocooning for skin detoxification.' }
  ]
};

export default function Services({ onSelectServicesForBooking }) {
  const [activeTab, setActiveTab] = useState('HAIR');
  const [selectedItems, setSelectedItems] = useState([]);

  const handleToggleService = (service) => {
    if (selectedItems.some(item => item.id === service.id)) {
      setSelectedItems(selectedItems.filter(item => item.id !== service.id));
    } else {
      setSelectedItems([...selectedItems, service]);
    }
  };

  const handleRemoveService = (id) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return selectedItems.reduce((acc, curr) => acc + curr.price, 0);
  };

  const calculateTotalTime = () => {
    return selectedItems.reduce((acc, curr) => acc + curr.time, 0);
  };

  const handleBookSelected = () => {
    onSelectServicesForBooking(selectedItems);
  };

  return (
    <section id="services" style={{ padding: '120px 8%', backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
      {/* Decorative Glow */}
      <div className="luxury-glow" style={{ top: '10%', right: '5%', width: '450px', height: '450px' }} />
      <div className="luxury-glow" style={{ bottom: '15%', left: '5%', width: '400px', height: '400px' }} />

      <div className="section-header">
        <span>Indulge in Exquisite Care</span>
        <h2>OUR SERVICES</h2>
        <p>Choose from our meticulously crafted menu of luxury services, or curate your personalized experience below.</p>
      </div>

      <div className="services-container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Main Menu Side */}
        <div>
          {/* Tabs */}
          <div
            className="services-filters"
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '15px',
              marginBottom: '50px'
            }}
          >
            {Object.keys(serviceData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  letterSpacing: '0.2em',
                  color: activeTab === tab ? 'var(--bg-primary)' : 'var(--text-primary)',
                  background: activeTab === tab ? 'var(--gold-gradient)' : 'transparent',
                  border: activeTab === tab ? 'none' : '1px solid var(--border-gold)',
                  padding: '12px 28px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.borderColor = 'var(--text-gold)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.borderColor = 'var(--border-gold)';
                  }
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Services List Grid */}
          <motion.div
            layout
            className="services-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px'
            }}
          >
            <AnimatePresence mode="wait">
              {serviceData[activeTab].map((service) => {
                const isSelected = selectedItems.some(item => item.id === service.id);
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleToggleService(service)}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: isSelected ? '1px solid var(--gold-accent)' : '1px solid var(--border-dark)',
                      padding: '30px',
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s ease',
                      boxShadow: isSelected ? '0 0 15px rgba(229, 196, 83, 0.1)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = isSelected ? 'var(--gold-accent)' : 'rgba(197, 168, 128, 0.4)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isSelected ? 'var(--gold-accent)' : 'var(--border-dark)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div>
                      {/* Name & Select Icon */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                        <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', letterSpacing: '0.05em', paddingRight: '20px' }}>
                          {service.name}
                        </h3>
                        <div style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          border: isSelected ? 'none' : '1px solid var(--border-gold-strong)',
                          background: isSelected ? 'var(--gold-gradient)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {isSelected && <Check size={12} color="var(--bg-primary)" strokeWidth={3} />}
                        </div>
                      </div>

                      {/* Description */}
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', fontWeight: 300 }}>
                        {service.desc}
                      </p>
                    </div>

                    {/* Price and duration */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-dark)', paddingTop: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                        <Clock size={14} />
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 400 }}>{service.time} MINS</span>
                      </div>
                      <span style={{
                        fontSize: '1.2rem',
                        fontFamily: 'var(--font-display)',
                        color: 'var(--text-gold)',
                        fontWeight: 600
                      }}>
                        ${service.price}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Floating Custom Experience Builder (Receipt) */}
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="services-receipt"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-gold-strong)',
              boxShadow: 'var(--shadow-heavy)',
              padding: '40px',
              maxWidth: '550px',
              margin: '30px auto 0',
              width: '100%',
              position: 'relative'
            }}
          >
            {/* Corner styling */}
            <div style={{ position: 'absolute', top: 0, left: 0, borderTop: '2px solid var(--text-gold)', borderLeft: '2px solid var(--text-gold)', width: '20px', height: '20px' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, borderTop: '2px solid var(--text-gold)', borderRight: '2px solid var(--text-gold)', width: '20px', height: '20px' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, borderBottom: '2px solid var(--text-gold)', borderLeft: '2px solid var(--text-gold)', width: '20px', height: '20px' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, borderBottom: '2px solid var(--text-gold)', borderRight: '2px solid var(--text-gold)', width: '20px', height: '20px' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '25px' }}>
              <Sparkles size={18} style={{ color: 'var(--text-gold)' }} />
              <h3 style={{ fontSize: '1.2rem', textAlign: 'center', fontFamily: 'var(--font-display)' }}>
                YOUR LUXURY EXPERIENCE
              </h3>
            </div>

            <div style={{
              maxHeight: '220px',
              overflowY: 'auto',
              marginBottom: '30px',
              paddingRight: '5px'
            }}>
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px dotted var(--border-gold)'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '0.85rem', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>{item.name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '2px' }}>
                      <Clock size={10} />
                      <span>{item.time} mins</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '0.95rem', fontFamily: 'var(--font-display)', color: 'var(--text-gold)' }}>${item.price}</span>
                    <button
                      onClick={() => handleRemoveService(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'red'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations block */}
            <div
              className="services-receipt-calc"
              style={{
                backgroundColor: 'var(--bg-primary)',
                padding: '20px',
                border: '1px solid var(--border-dark)',
                marginBottom: '30px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Selected Treatments:</span>
                <span>{selectedItems.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Estimated Time:</span>
                <span>{calculateTotalTime()} mins</span>
              </div>
              <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-gold)', marginBottom: '15px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>TOTAL COST:</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-gold)', fontWeight: 600 }}>
                  ${calculateTotal()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="services-receipt-actions" style={{ display: 'flex', gap: '15px' }}>
              <button
                className="outline-btn"
                style={{ flex: 1, padding: '12px 20px', fontSize: '0.75rem' }}
                onClick={() => setSelectedItems([])}
              >
                CLEAR ALL
              </button>
              <button
                className="glow-btn"
                style={{ flex: 2, padding: '12px 20px', fontSize: '0.75rem' }}
                onClick={handleBookSelected}
              >
                PROCEED TO BOOK
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* CSS selector for layout grids responsive */}
      <style>{`
        @media(min-width: 992px) {
          .services-container {
            grid-template-columns: ${selectedItems.length > 0 ? '1.5fr 1fr' : '1fr'} !important;
          }
        }
      `}</style>
    </section>
  );
}
