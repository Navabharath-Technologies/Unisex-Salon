import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onBookClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'SERVICES', href: '#services' },
    { label: 'LOOKBOOK', href: '#lookbook' },
    { label: 'ARTISTS', href: '#stylists' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: 'var(--nav-height)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 6%',
          transition: 'all 0.4s ease',
          backgroundColor: scrolled ? 'rgba(247, 239, 231, 0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(118, 102, 81, 0.22)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img
            src="/Unisex-Salon/logo.png"
            alt="Style Atelier"
            style={{
              height: '36px',
              objectFit: 'contain',
              display: 'block'
            }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            fontWeight: '600',
            letterSpacing: '0.2em',
            color: scrolled ? 'var(--bg-primary)' : 'var(--text-primary)',
            background: scrolled ? 'none' : 'var(--gold-gradient)',
            WebkitBackgroundClip: scrolled ? 'unset' : 'text',
            WebkitTextFillColor: scrolled ? 'initial' : 'transparent',
            textShadow: scrolled ? '0 0 12px rgba(255, 255, 255, 0.12)' : '0 0 12px rgba(255, 255, 255, 0.18)',
          }}>
            STYLE ATELIER
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }} className="desktop-nav">
          <ul style={{ display: 'flex', gap: '30px', listStyle: 'none' }}>
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  style={{
                    position: 'relative',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    letterSpacing: '0.15em',
                    color: scrolled ? 'var(--bg-primary)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--gold-accent)')}
                  onMouseLeave={(e) => (e.target.style.color = scrolled ? 'var(--bg-primary)' : 'var(--text-primary)')}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="glow-btn" onClick={onBookClick}>
            BOOK ONLINE
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: scrolled ? 'var(--bg-primary)' : 'var(--text-primary)',
            display: 'none',
          }}
          className="mobile-toggle"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </motion.nav>

      {/* CSS injection for responsive navbar behavior without libraries */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              top: 'var(--nav-height)',
              left: 0,
              width: '100%',
              backgroundColor: 'rgba(8, 8, 10, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border-gold)',
              zIndex: 998,
              padding: '40px 10%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '30px',
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="mobile-nav-link"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.2em',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--gold-accent)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-primary)')}
              >
                {item.label}
              </a>
            ))}
            <button
              className="glow-btn"
              style={{ width: '100%', marginTop: '10px' }}
              onClick={() => {
                setIsOpen(false);
                onBookClick();
              }}
            >
              BOOK ONLINE
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
