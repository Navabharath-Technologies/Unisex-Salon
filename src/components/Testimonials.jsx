import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Julianne Moore',
    role: 'Editorial Designer',
    rating: 5,
    text: 'STYLE ATELIER has completely elevated my standard of styling. The ambient lighting, the subtle aromas, and the absolute mastery of Sophia Loren make every visit a therapeutic experience.'
  },
  {
    id: 2,
    name: 'Marcello Silva',
    role: 'Creative Director',
    rating: 5,
    text: 'The Imperial Sculpt beard treatment by Alexander Vance is architectural perfection. The hot towel and herbal extracts left me feeling completely restored. Simply peerless.'
  },
  {
    id: 3,
    name: 'Victoria Hastings',
    role: 'Connoisseur',
    rating: 5,
    text: 'I indulged in the Gold Dust Radiance Facial. Dr. Isabella Chen has a profound knowledge of skin health. My skin is noticeably revitalized. A sanctuary of absolute refinement.'
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" style={{ padding: '120px 8%', backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
      {/* Background Glow */}
      <div className="luxury-glow" style={{ top: '20%', left: '30%', width: '500px', height: '500px' }} />

      <div className="section-header">
        <span>The Whispers of Prestige</span>
        <h2>CLIENT REVIEWS</h2>
        <p>Listen to the experiences of clients who have entered the sanctuary of STYLE ATELIER.</p>
      </div>

      <div style={{
        maxWidth: '750px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
      }}>
        {/* Quote Mark Decorative */}
        <div style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '1px solid var(--border-gold)',
          color: 'var(--text-gold)',
          marginBottom: '35px'
        }}>
          <Quote size={24} />
        </div>

        {/* Dynamic Reviews Panel */}
        <div style={{ minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              {/* Star Rating */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '20px' }}>
                {[...Array(testimonials[index].rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--gold-accent)" stroke="var(--gold-accent)" />
                ))}
              </div>

              {/* Review Text */}
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                lineHeight: 1.8,
                color: 'var(--text-primary)',
                fontStyle: 'italic',
                fontWeight: 300,
                marginBottom: '30px'
              }}>
                "{testimonials[index].text}"
              </p>

              {/* Author name */}
              <h4 style={{ fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '5px' }}>
                {testimonials[index].name}
              </h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-gold)', fontFamily: 'var(--font-display)' }}>
                {testimonials[index].role}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          marginTop: '50px'
        }}>
          <button
            onClick={handlePrev}
            style={{
              background: 'none',
              border: '1px solid var(--border-gold)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
            <ChevronLeft size={18} />
          </button>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {testimonials.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: i === index ? 'var(--text-gold)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            style={{
              background: 'none',
              border: '1px solid var(--border-gold)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
