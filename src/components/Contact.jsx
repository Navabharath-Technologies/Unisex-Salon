import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', category: 'HAIR', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <section id="contact" style={{ padding: '120px 8%', backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
      {/* Decorative Glow */}
      <div className="luxury-glow" style={{ top: '25%', left: '5%', width: '450px', height: '450px' }} />
      <div className="luxury-glow" style={{ bottom: '10%', right: '5%', width: '400px', height: '400px' }} />

      <div className="section-header">
        <span>Connect With Us</span>
        <h2>CONCIERGE CONTACT</h2>
        <p>For custom requests, group reservations, or corporate inquiries, reach out to our concierge.</p>
      </div>

      <div className="contact-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '60px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Info Blocks Side */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', marginBottom: '35px', letterSpacing: '0.1em' }}>
            VISIT THE <span className="gold-text">SANCTUARY</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
            {/* Block 1 */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-gold)',
                flexShrink: 0
              }}>
                <MapPin size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontFamily: 'var(--font-display)', letterSpacing: '0.05em', marginBottom: '8px' }}>SALON ADDRESS</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>105 Avenue Montaigne, Beverly Hills, CA 90210</p>
              </div>
            </div>

            {/* Block 2 */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-gold)',
                flexShrink: 0
              }}>
                <Phone size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontFamily: 'var(--font-display)', letterSpacing: '0.05em', marginBottom: '8px' }}>HOTLINE</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>+1 (310) 555-8888</p>
              </div>
            </div>

            {/* Block 3 */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-gold)',
                flexShrink: 0
              }}>
                <Mail size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontFamily: 'var(--font-display)', letterSpacing: '0.05em', marginBottom: '8px' }}>GENERAL INQUIRY</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>concierge@styleatelier.com</p>
              </div>
            </div>

            {/* Block 4 */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-gold)',
                flexShrink: 0
              }}>
                <Clock size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontFamily: 'var(--font-display)', letterSpacing: '0.05em', marginBottom: '8px' }}>SALON HOURS</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Mon - Sat: 9:00 AM - 9:00 PM<br />
                  Sun: 10:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Form Side */}
        <div className="contact-form-side" style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-gold)',
          padding: '45px 35px',
          boxShadow: 'var(--shadow-heavy)'
        }}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', marginBottom: '10px' }}>
                  SEND AN INQUIRY
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-gold)', letterSpacing: '0.1em' }}>YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-dark)',
                      color: '#fff',
                      padding: '12px 15px',
                      fontSize: '0.85rem',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-gold)', letterSpacing: '0.1em' }}>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@example.com"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-dark)',
                      color: '#fff',
                      padding: '12px 15px',
                      fontSize: '0.85rem',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-gold)', letterSpacing: '0.1em' }}>SERVICE CATEGORY</label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-dark)',
                      color: '#fff',
                      padding: '12px 15px',
                      fontSize: '0.85rem',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    <option value="HAIR">HAIR ARTISTRY</option>
                    <option value="SKIN">SKIN THERAPY</option>
                    <option value="GROOMING">BEARD & BARBER</option>
                    <option value="SPA">SPA & MASSAGE</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-gold)', letterSpacing: '0.1em' }}>MESSAGE</label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="How may our artisans accommodate you?"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-dark)',
                      color: '#fff',
                      padding: '12px 15px',
                      fontSize: '0.85rem',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      resize: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="glow-btn"
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <span>TRANSMITTING...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>SUBMIT INQUIRY</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="submitted-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  minHeight: '300px',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-gold)',
                  marginBottom: '20px'
                }}>
                  <Sparkles size={22} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '15px', letterSpacing: '0.1em' }}>
                  INQUIRY RECEIVED
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '25px' }}>
                  Thank you for reaching out, <strong>{formState.name}</strong>. Our concierge team has received your transmission and will respond to you within 2 business hours.
                </p>
                <button
                  className="outline-btn"
                  style={{ fontSize: '0.75rem', padding: '10px 20px' }}
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', email: '', category: 'HAIR', message: '' });
                  }}
                >
                  SEND ANOTHER
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
