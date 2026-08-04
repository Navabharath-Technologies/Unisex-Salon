import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
  CINEMATIC FIVE-PHASE LOADER SEQUENCE
  Phase 1 — "blank"         : Silence, dark canvas with subtle breathing glow (0.0s → 0.8s)
  Phase 2 — "text-reveal"   : Letter-by-letter staggered brand reveal with blur/sharp glow transition (0.8s → 2.6s)
  Phase 3 — "scissor-enter" : Scissors slide gracefully down to center, opening blades in ready stance (2.6s → 3.8s)
  Phase 4 — "cut"           : Scissor snaps shut (snip) and vertical spark travels down seam (3.8s → 4.2s)
  Phase 5 — "reveal"        : Left/Right panels slide open like grand double doors to reveal home screen (4.2s → 5.1s)
*/

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState('blank');

  useEffect(() => {
    const blankDur = 800;
    const textRevealDur = 1800;
    const scissorEnterDur = 1200;
    const cutDur = 400;
    const revealDur = 900;

    const tTextReveal = setTimeout(() => setPhase('text-reveal'), blankDur);
    const tScissorEnter = setTimeout(() => setPhase('scissor-enter'), blankDur + textRevealDur);
    const tCut = setTimeout(() => setPhase('cut'), blankDur + textRevealDur + scissorEnterDur);
    const tReveal = setTimeout(() => setPhase('reveal'), blankDur + textRevealDur + scissorEnterDur + cutDur * 0.85);
    const tDone = setTimeout(() => { setPhase('done'); onComplete(); }, blankDur + textRevealDur + scissorEnterDur + cutDur + revealDur);

    return () => {
      clearTimeout(tTextReveal);
      clearTimeout(tScissorEnter);
      clearTimeout(tCut);
      clearTimeout(tReveal);
      clearTimeout(tDone);
    };
  }, [onComplete]);

  // Scissor variants (slides down from top, cuts, scales out - rotated -90deg to be vertical!)
  const scissorVariants = {
    initial: { y: -250, x: 0, rotate: -90, opacity: 0, scale: 0.9 },
    enter: {
      y: 0,
      x: 0,
      rotate: -90,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1] // sleek easeOut
      }
    },
    cut: {
      y: 0,
      x: 0,
      rotate: -90,
      opacity: 1,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.4, ease: 'easeIn' }
    }
  };

  // Blade variants for scissors (simulating a high-end physical snip)
  const handleVariants = {
    initial: { rotate: 0 },
    enter: (side) => ({
      rotate: side === 'left' ? -22 : 22,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 }
    }),
    cut: (side) => ({
      rotate: side === 'left' ? [ -22, 5, 0, -4 ] : [ 22, -5, 0, 4 ],
      transition: { duration: 0.4, times: [0, 0.3, 0.6, 1], ease: 'easeOut' }
    }),
    exit: { 
      rotate: 0, 
      transition: { duration: 0.4 } 
    }
  };

  // Subtle scissor contact shadow
  const shadowVariants = {
    initial: { scale: 0.5, opacity: 0 },
    enter: {
      scale: 1,
      opacity: 0.3,
      transition: { duration: 1.1, ease: 'easeInOut' }
    },
    cut: { scale: 0.8, opacity: 0.15, transition: { duration: 0.28 } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };

  /* ── Curtain panels (sliding Left / Right) ── */
  const curtainLeft = {
    visible: { x: '0%' },
    hidden:  { x: '-100%', transition: { duration: 0.9, ease: [0.85, 0, 0.15, 1] } }
  };
  const curtainRight = {
    visible: { x: '0%' },
    hidden:  { x: '100%',  transition: { duration: 0.9, ease: [0.85, 0, 0.15, 1] } }
  };

  // Staggered letters variants for the brand name
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      filter: 'blur(8px)',
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Centered elements global fade-out when panels slide
  const mainContentVariants = {
    visible: { opacity: 1, scale: 1 },
    fade: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.45, ease: 'easeIn' }
    }
  };

  const titleText = "STYLE ATELIER";
  const subtitleText = "Luxury Unisex Salon";

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      overflow: 'hidden',
      pointerEvents: phase === 'reveal' ? 'none' : 'all',
    }}>

      {/* ── LEFT CURTAIN PANEL ── */}
      <motion.div
        initial="visible"
        animate={phase === 'reveal' ? 'hidden' : 'visible'}
        variants={curtainLeft}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '50%',
          height: '100%',
          backgroundColor: 'var(--bg-primary)',
          transformOrigin: 'left center',
          zIndex: 20,
        }}
      />

      {/* ── RIGHT CURTAIN PANEL ── */}
      <motion.div
        initial="visible"
        animate={phase === 'reveal' ? 'hidden' : 'visible'}
        variants={curtainRight}
        style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '50%',
          height: '100%',
          backgroundColor: 'var(--bg-primary)',
          transformOrigin: 'right center',
          zIndex: 20,
        }}
      />

      {/* ── BACKGROUND BREATHING HALO ── */}
      <motion.div
        animate={{
          opacity: phase === 'reveal' ? 0 : [0.35, 0.65, 0.35],
          scale: phase === 'reveal' ? 0.8 : [0.95, 1.05, 0.95],
        }}
        transition={{
          opacity: phase === 'reveal' ? { duration: 0.4 } : { repeat: Infinity, duration: 3, ease: 'easeInOut' },
          scale: phase === 'reveal' ? { duration: 0.4 } : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 'auto',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(195, 171, 122, 0.16) 0%, transparent 70%)',
          filter: 'blur(30px)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* ── VERTICAL SEAM LINE ── */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={
          phase === 'blank' || phase === 'text-reveal' 
            ? { opacity: 0, scaleY: 0 } 
            : phase === 'reveal' 
            ? { opacity: 0, scaleY: 1 } 
            : { opacity: 0.5, scaleY: 1 }
        }
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '1px',
          height: '100%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(195,171,122,0.4) 30%, rgba(211,197,167,0.8) 50%, rgba(195,171,122,0.4) 70%, transparent 100%)',
          transform: 'translateX(-50%)',
          transformOrigin: 'top center',
          zIndex: 25,
        }}
      />

      {/* ── VERTICAL CUT SLASH/SPARK ── */}
      {phase === 'cut' && (
        <motion.div
          initial={{ top: '0%', height: '0%', opacity: 0 }}
          animate={{
            top: ['0%', '0%', '100%'],
            height: ['0%', '40%', '0%'],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: '50%',
            width: '3px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0), #ffffff, #c3ab7a, rgba(255,255,255,0))',
            boxShadow: '0 0 15px #c3ab7a, 0 0 30px #ffffff',
            transform: 'translateX(-50%)',
            zIndex: 26,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* ── CENTERED LOADER CONTENT ── */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 50,
        width: '100%',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <motion.div 
          variants={mainContentVariants}
          initial="visible"
          animate={phase === 'reveal' ? 'fade' : 'visible'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <AnimatePresence>
            {phase !== 'blank' && phase !== 'text-reveal' && phase !== 'done' && (
              <motion.div
                key="scissors"
                variants={scissorVariants}
                initial="initial"
                animate={phase === 'scissor-enter' ? 'enter' : phase === 'cut' ? 'cut' : 'exit'}
                style={{
                  position: 'relative',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Ground contact shadow */}
                <motion.div
                  variants={shadowVariants}
                  initial="initial"
                  animate={phase === 'scissor-enter' ? 'enter' : phase === 'cut' ? 'cut' : 'exit'}
                  style={{
                    position: 'absolute',
                    bottom: '-14%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '140px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.28), rgba(0,0,0,0.06))',
                    zIndex: 8,
                    pointerEvents: 'none'
                  }}
                />

                {/* SVG Scissors */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="110"
                  height="110"
                  viewBox="0 0 100 100"
                  style={{ filter: 'drop-shadow(0 0 14px rgba(195,171,122,0.42))' }}
                >
                  <defs>
                    <linearGradient id="goldMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%"   stopColor="#4f503b" />
                      <stop offset="25%"  stopColor="#a38f65" />
                      <stop offset="50%"  stopColor="#dbc69c" />
                      <stop offset="75%"  stopColor="#a38f65" />
                      <stop offset="100%" stopColor="#716144" />
                    </linearGradient>
                    <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"   stopColor="rgba(255,255,255,0)"   />
                      <stop offset="50%"  stopColor="rgba(255,255,255,0.35)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)"   />
                    </linearGradient>
                  </defs>

                  {/* BLADE 1 */}
                  <motion.g
                    style={{ transformBox: 'fill-box', transformOrigin: '11px 12px' }}
                    variants={handleVariants}
                    animate={phase === 'scissor-enter' ? 'enter' : phase === 'cut' ? 'cut' : 'exit'}
                    custom="left"
                  >
                    <path d="M 18 18 L 58 52 L 55 56 L 14 22 Z" fill="url(#goldMetal)" stroke="#a07828" strokeWidth="0.4" />
                    <path d="M 18 18 L 58 52 L 56 54 L 16 20 Z" fill="url(#goldHighlight)" opacity="0.6" />
                    <ellipse cx="11" cy="12" rx="9" ry="10" fill="none" stroke="url(#goldMetal)" strokeWidth="4" />
                    <ellipse cx="11" cy="12" rx="5" ry="6"  fill="none" stroke="url(#goldMetal)" strokeWidth="1.5" opacity="0.6"/>
                    <ellipse cx="11" cy="12" rx="8" ry="9" fill="rgba(0,0,0,0.3)" />
                  </motion.g>

                  {/* PIVOT SCREW */}
                  <circle cx="56" cy="54" r="4.5" fill="url(#goldMetal)" stroke="#7b6647" strokeWidth="0.5" />
                  <circle cx="56" cy="54" r="2"   fill="#f4e4b9" opacity="0.8" />

                  {/* BLADE 2 */}
                  <motion.g
                    style={{ transformBox: 'fill-box', transformOrigin: '11px 93px' }}
                    variants={handleVariants}
                    animate={phase === 'scissor-enter' ? 'enter' : phase === 'cut' ? 'cut' : 'exit'}
                    custom="right"
                  >
                    <path d="M 18 88 L 58 54 L 55 50 L 14 84 Z" fill="url(#goldMetal)" stroke="#a07828" strokeWidth="0.4" />
                    <path d="M 18 88 L 58 54 L 56 52 L 16 86 Z" fill="url(#goldHighlight)" opacity="0.6" />
                    <ellipse cx="11" cy="93" rx="9" ry="10" fill="none" stroke="url(#goldMetal)" strokeWidth="4" />
                    <ellipse cx="11" cy="93" rx="5" ry="6"  fill="none" stroke="url(#goldMetal)" strokeWidth="1.5" opacity="0.6" />
                    <ellipse cx="11" cy="93" rx="8" ry="9" fill="rgba(0,0,0,0.3)" />
                  </motion.g>

                  {/* Extended tips and highlights */}
                  <line x1="58" y1="52" x2="88" y2="38" stroke="url(#goldMetal)" strokeWidth="3" strokeLinecap="round" />
                  <line x1="58" y1="56" x2="88" y2="68" stroke="url(#goldMetal)" strokeWidth="3" strokeLinecap="round" />
                  <line x1="58" y1="52" x2="88" y2="38" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" />
                  <line x1="58" y1="56" x2="88" y2="68" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Brand Name Text Containers */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            animate={phase === 'blank' ? 'hidden' : 'visible'}
            style={{
              marginTop: '28px',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              fontWeight: '600',
              letterSpacing: '0.35em',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              {titleText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  style={{
                    display: 'inline-block',
                    minWidth: char === ' ' ? '0.3em' : 'auto',
                    background: 'var(--gold-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <motion.span
              initial={{ opacity: 0, y: 10, letterSpacing: '0.05em' }}
              animate={phase === 'blank' ? { opacity: 0, y: 10 } : { opacity: 1, y: 0, letterSpacing: '0.18em' }}
              transition={{ delay: 0.8, duration: 1.0, ease: 'easeOut' }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '0.75rem',
                color: 'rgba(195,171,122,0.6)',
                display: 'block',
                marginTop: '8px',
              }}
            >
              {subtitleText}
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
