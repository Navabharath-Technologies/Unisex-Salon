import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Star, Scissors } from 'lucide-react';

const stylists = [
  {
    id: 1,
    name: 'Alexander Vance',
    role: 'Master Barber & Groomer',
    experience: '12 Years',
    specialty: 'Royal Beard Sculpt & Precision Fades',
    img: '/Unisex-Salon/grooming_service.png',
    quote: 'Grooming is not a routine, it is an architectural art form.'
  },
  {
    id: 2,
    name: 'Sophia Loren',
    role: 'Creative Hair Director',
    experience: '15 Years',
    specialty: 'Balayage Couture & Keratin Restorations',
    img: '/Unisex-Salon/hair_service.png',
    quote: 'Your hair is the crown you never take off. Let us gild it.'
  },
  {
    id: 3,
    name: 'Dr. Isabella Chen',
    role: 'Elite Aesthetic Therapist',
    experience: '10 Years',
    specialty: 'Radiance Facials & Dermal Reconstruction',
    img: '/Unisex-Salon/facial_service.png',
    quote: 'True beauty lies in healthy, cellular-level radiance.'
  }
];

export default function Stylists() {
  return (
    <section id="stylists" style={{ padding: '120px 8%', backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
      {/* Decorative Glow */}
      <div className="luxury-glow" style={{ top: '25%', right: '10%', width: '450px', height: '450px' }} />
      <div className="luxury-glow" style={{ bottom: '5%', left: '5%', width: '400px', height: '400px' }} />

      <div className="section-header">
        <span>The Hands of Artistry</span>
        <h2>MASTER ARTISTS</h2>
        <p>Our artisans combine years of global education with bespoke precision to craft your signature aesthetic.</p>
      </div>

      {/* Stylist Grid */}
      <div className="stylists-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px',
        position: 'relative',
        zIndex: 2
      }}>
        {stylists.map((stylist) => (
          <motion.div
            key={stylist.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: stylist.id * 0.15 }}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-dark)',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('.stylist-img');
              const overlay = e.currentTarget.querySelector('.stylist-overlay');
              if (img) img.style.transform = 'scale(1.05)';
              if (overlay) overlay.style.transform = 'translateY(0)';
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('.stylist-img');
              const overlay = e.currentTarget.querySelector('.stylist-overlay');
              if (img) img.style.transform = 'scale(1)';
              if (overlay) overlay.style.transform = 'translateY(101%)';
            }}
          >
            {/* Image Container */}
            <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
              <img
                src={stylist.img}
                alt={stylist.name}
                className="stylist-img"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s ease'
                }}
              />

              {/* Experience Badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                backgroundColor: 'rgba(8, 8, 10, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-gold)',
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                zIndex: 2
              }}>
                <Star size={12} style={{ color: 'var(--text-gold)' }} />
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', color: 'var(--text-gold)' }}>
                  {stylist.experience}
                </span>
              </div>

              {/* Sliding Info Overlay */}
              <div
                className="stylist-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(8, 8, 10, 0.92)',
                  backdropFilter: 'blur(8px)',
                  transform: 'translateY(101%)',
                  transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  padding: '40px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 3
                }}
              >
                <Scissors size={24} style={{ color: 'var(--text-gold)', marginBottom: '20px' }} />
                
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                  lineHeight: 1.6,
                  marginBottom: '25px',
                  position: 'relative',
                  padding: '0 10px'
                }}>
                  "{stylist.quote}"
                </p>

                <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--border-gold)', marginBottom: '20px' }} />

                <span style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-gold)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}>
                  Specialization
                </span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', textAlign: 'center', fontWeight: 400, marginBottom: '30px' }}>
                  {stylist.specialty}
                </p>

                <a
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '0.1em',
                    border: '1px solid var(--border-gold)',
                    padding: '8px 20px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--text-gold)';
                    e.currentTarget.style.color = 'var(--text-gold)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-gold)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  <Instagram size={14} />
                  <span>@artist_{stylist.name.split(' ')[0].toLowerCase()}</span>
                </a>
              </div>
            </div>

            {/* Title Block */}
            <div style={{ padding: '25px', textAlign: 'center', borderTop: '1px solid var(--border-dark)', flexGrow: 1 }}>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', letterSpacing: '0.08em', marginBottom: '5px' }}>
                {stylist.name}
              </h3>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '0.9rem',
                color: 'var(--text-gold)'
              }}>
                {stylist.role}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
