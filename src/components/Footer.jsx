import React from 'react';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ onBookClick }) {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-gold)',
      padding: '80px 8% 40px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Blur Background */}
      <div className="luxury-glow" style={{ bottom: '-10%', right: '10%', width: '400px', height: '400px' }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '50px',
        marginBottom: '60px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Column 1: Brand Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
            <img
              src="/Unisex-Salon/logo.png"
              alt="Style Atelier"
              style={{ height: '32px', objectFit: 'contain', display: 'block' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: '600',
              letterSpacing: '0.2em',
              background: 'var(--gold-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              STYLE ATELIER
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', marginBottom: '25px', color: 'var(--text-secondary)' }}>
            Elevating the art of grooming. STYLE ATELIER blends luxury aesthetics with world-class artistry, creating bespoke styles for individuals of distinction.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            {[
              { Icon: Instagram, href: '#' },
              { Icon: Facebook, href: '#' },
              { Icon: Twitter, href: '#' }
            ].map(({ Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-gold)',
                  color: 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--text-gold)';
                  e.currentTarget.style.color = 'var(--text-gold)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-gold)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '25px', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
            NAVIGATION
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Home', href: '#home' },
              { label: 'Our Services', href: '#services' },
              { label: 'Style Lookbook', href: '#lookbook' },
              { label: 'Master Artists', href: '#stylists' },
              { label: 'Contact Us', href: '#contact' }
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-gold)';
                    e.currentTarget.style.paddingLeft = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.paddingLeft = '0';
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '25px', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
            THE SALON
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <MapPin size={16} style={{ color: 'var(--text-gold)', marginTop: '3px', flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                105 Avenue Montaigne, Suite 400, Beverly Hills, CA 90210
              </span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone size={16} style={{ color: 'var(--text-gold)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                +1 (310) 555-8888
              </span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mail size={16} style={{ color: 'var(--text-gold)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                concierge@styleatelier.com
              </span>
            </li>
          </ul>
        </div>

        {/* Column 4: Hours */}
        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '25px', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
            HOURS
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Mon - Fri:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 400 }}>9:00 AM - 8:00 PM</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Saturday:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 400 }}>9:00 AM - 9:00 PM</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Sunday:</span>
              <span style={{ color: 'var(--text-gold)', fontWeight: 400 }}>10:00 AM - 6:00 PM</span>
            </li>
          </ul>
          <button
            className="outline-btn"
            style={{ width: '100%', marginTop: '20px', fontSize: '0.75rem', padding: '10px 15px' }}
            onClick={onBookClick}
          >
            SCHEDULE VISIT
          </button>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--border-gold), transparent)',
        margin: '40px 0 30px'
      }} />

      {/* Copyright info */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '15px',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <span>&copy; {new Date().getFullYear()} STYLE ATELIER LUXURY SALON. ALL RIGHTS RESERVED.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>PRIVACY POLICY</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>TERMS OF SERVICE</a>
        </div>
      </div>
    </footer>
  );
}
