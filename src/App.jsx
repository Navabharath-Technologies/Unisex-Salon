import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Lookbook from './components/Lookbook.jsx';
import Stylists from './components/Stylists.jsx';
import Testimonials from './components/Testimonials.jsx';
import Booking from './components/Booking.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [preselectedServices, setPreselectedServices] = useState([]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Handles clicking "BOOK ONLINE" or similar CTAs
  const handleScrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Triggered when user selects a custom package in Services
  const handleSelectServicesForBooking = (services) => {
    setPreselectedServices(services);
    handleScrollToBooking();
  };

  const handleClearPreselectedServices = () => {
    setPreselectedServices([]);
  };

  return (
    <>
      {/* Premium Loader Screen overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Website Content */}
      <div style={{ pointerEvents: isLoading ? 'none' : 'auto' }}>
        <motion.div
          initial={{ opacity: 0, scaleY: 0.96 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ transformOrigin: 'center', minHeight: '100vh' }}
        >
          <Navbar onBookClick={handleScrollToBooking} />
          <Hero onBookClick={handleScrollToBooking} />
          <Services onSelectServicesForBooking={handleSelectServicesForBooking} />
          <Lookbook />
          <Stylists />
          <Testimonials />
          <Booking 
            preselectedServices={preselectedServices} 
            onClearPreselected={handleClearPreselectedServices} 
          />
          <Contact />
          <Footer onBookClick={handleScrollToBooking} />
        </motion.div>
      </div>
    </>
  );
}
