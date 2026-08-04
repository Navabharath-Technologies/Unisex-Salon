import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HERO_IMAGES = [
  "/hero_salon_bg.png",
  "/hero_slide_2.png",
  "/hero_slide_3.png",
  "/hero_slide_4.png"
];

export default function Hero({ onBookClick }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // 6 seconds per image
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '0 8%'
      }}
    >
      {/* Seamless Cinematic Background Image Cross-Fader */}
      {HERO_IMAGES.map((src, index) => (
        <motion.div
          key={index}
          initial={{ scale: 1.05 }}
          animate={{
            scale: activeIndex === index ? 1 : 1.05,
            opacity: activeIndex === index ? 1 : 0
          }}
          transition={{
            opacity: { duration: 2, ease: 'easeInOut' },
            scale: { duration: 8, ease: 'easeOut' }
          }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url("${src}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: -2,
              filter: 'blur(2px) brightness(0.85) contrast(1.1) saturate(1.1)', // Reduced blur and increased brightness
              pointerEvents: 'none',
            }}
        />
      ))}

      {/* Dark Luxury Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(8,8,10,0.04) 0%, rgba(8,8,10,0.12) 45%, rgba(8,8,10,0.28) 100%)',
          zIndex: -1
        }}
      />

      {/* Background Glows */}
      <div className="luxury-glow" style={{ top: '20%', left: '10%', width: '500px', height: '500px' }} />
      <div className="luxury-glow" style={{ bottom: '10%', right: '5%', width: '400px', height: '400px' }} />

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: '900px',
          textAlign: 'center',
          zIndex: 1,
          marginTop: '60px'
        }}
      >
        {/* Animated Subtitle */}
        <motion.p
          variants={itemVariants}
          className="hero-subtitle"
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.4rem',
            color: 'var(--text-gold)',
            marginBottom: '20px',
            letterSpacing: '0.05em'
          }}
        >
          An Sanctuary of Bespoke Artistry
        </motion.p>

        {/* Animated Title */}
        <motion.h1
          variants={itemVariants}
          className="hero-title"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.8rem)',
            fontWeight: '400',
            lineHeight: 1.15,
            marginBottom: '30px',
            fontFamily: 'var(--font-display)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em'
              ,
              textShadow: '0 10px 28px rgba(0,0,0,0.6)'
            }}
            >
          REDEFINING THE <span className="gold-text">SALON</span> EXPERIENCE
        </motion.h1>

        {/* Animated Short Description */}
        <motion.p
          variants={itemVariants}
          className="hero-desc"
          style={{
            fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
            fontWeight: 300,
            maxWidth: '650px',
            margin: '0 auto 45px',
            color: 'var(--text-secondary)',
            letterSpacing: '0.04em',
            lineHeight: 1.7,
            textShadow: '0 6px 18px rgba(0,0,0,0.55)'
          }}
        >
          Welcome to STYLE ATELIER. We deliver elite grooming services designed to celebrate your unique identity. Indulge in world-class hair artistry, custom skin treatments, and exceptional wellness rituals.
        </motion.p>

        {/* Animated Buttons */}
        <motion.div
          variants={itemVariants}
          className="hero-buttons"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px'
          }}
        >
          <button className="glow-btn" onClick={onBookClick}>
            BOOK AN EXPERIENCE
          </button>
          <a href="#services" style={{ textDecoration: 'none' }}>
            <button className="outline-btn">EXPLORE SERVICES</button>
          </a>
        </motion.div>

        {/* Floating Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="hero-scroll-indicator"
          style={{
            position: 'absolute',
            bottom: '40px',
            left: 0,
            right: 0,
            margin: '0 auto',
            width: 'max-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            zIndex: 1
          }}
          onClick={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span style={{
            fontSize: '0.65rem',
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.3em',
            color: 'var(--text-gold)'
          }}>
            SCROLL DOWN
          </span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--gold-primary), transparent)'
          }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
