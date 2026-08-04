import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Clock, Scissors, Check, Sparkles, ChevronRight, ChevronLeft, Ticket } from 'lucide-react';

const stylists = [
  { id: 'st1', name: 'Alexander Vance', role: 'Master Barber' },
  { id: 'st2', name: 'Sophia Loren', role: 'Creative Director' },
  { id: 'st3', name: 'Dr. Isabella Chen', role: 'Elite Therapist' },
  { id: 'any', name: 'Any Available Artist', role: 'Premium Placement' }
];

const timeSlots = [
  '09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM'
];

// Generate next 7 days for selection
const generateDates = () => {
  const dates = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let i = 1; i <= 7; i++) {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + i);
    dates.push({
      dayName: days[nextDate.getDay()],
      dateNum: nextDate.getDate(),
      monthName: months[nextDate.getMonth()],
      fullString: `${days[nextDate.getDay()]}, ${months[nextDate.getMonth()]} ${nextDate.getDate()}`
    });
  }
  return dates;
};

export default function Booking({ preselectedServices, onClearPreselected }) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '', note: '' });
  const [reservationId, setReservationId] = useState('');

  // Synchronize preselected services from the Calculator
  useEffect(() => {
    if (preselectedServices && preselectedServices.length > 0) {
      setSelectedServices(preselectedServices);
      setStep(2); // Jump directly to stylist selection
    }
  }, [preselectedServices]);

  const dates = generateDates();

  const handleServiceToggle = (service) => {
    if (selectedServices.some(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      if (step === 2 && preselectedServices && preselectedServices.length > 0) {
        // Clear preselected services if going back to step 1
        onClearPreselected();
      }
      setStep(step - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guestInfo.name || !guestInfo.email || !guestInfo.phone) return;
    
    // Generate simple reservation ID
    const randomId = 'STYLEATELIER-' + Math.floor(1000 + Math.random() * 9000);
    setReservationId(randomId);
    setStep(5);
  };

  const calculateTotalCost = () => {
    return selectedServices.reduce((acc, curr) => acc + curr.price, 0);
  };

  const calculateTotalTime = () => {
    return selectedServices.reduce((acc, curr) => acc + curr.time, 0);
  };

  // Step names
  const steps = [
    { title: 'SERVICES', num: 1 },
    { title: 'ARTIST', num: 2 },
    { title: 'TIME', num: 3 },
    { title: 'GUEST', num: 4 },
    { title: 'TICKET', num: 5 }
  ];

  // Dummy catalog for manual picking in Step 1 (if not preselected)
  const quickCatalog = [
    { id: 'h1', name: 'Royal Haircut & Styling', price: 95, time: 60 },
    { id: 'h2', name: 'Balayage Couture', price: 240, time: 150 },
    { id: 's1', name: 'Gold Dust Radiance Facial', price: 180, time: 90 },
    { id: 'g1', name: 'Royal Beard Sculpt & Shave', price: 70, time: 45 },
    { id: 'sp1', name: 'Deep Tissue Aroma Massage', price: 160, time: 90 }
  ];

  return (
    <section id="booking" style={{ padding: '120px 8%', backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
      {/* Background Glow */}
      <div className="luxury-glow" style={{ top: '15%', left: '10%', width: '450px', height: '450px' }} />
      <div className="luxury-glow" style={{ bottom: '10%', right: '10%', width: '400px', height: '400px' }} />

      <div className="section-header">
        <span>Tailored Sessions</span>
        <h2>EXPERIENCE RESERVE</h2>
        <p>Book your personalized luxury appointment. Navigate through our booking ritual below.</p>
      </div>

      <div
        className="booking-card"
        style={{
          maxWidth: '850px',
          margin: '0 auto',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-gold)',
          padding: '50px 4%',
          boxShadow: 'var(--shadow-heavy)',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Step Indicator Header */}
        <div
          className="booking-steps-nav"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '50px',
            borderBottom: '1px solid var(--border-dark)',
            paddingBottom: '20px',
            overflowX: 'auto'
          }}
        >
          {steps.map((s) => (
            <div key={s.num} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: step === s.num ? 1 : step > s.num ? 0.6 : 0.3,
              transition: 'opacity 0.3s ease',
              flexShrink: 0
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: step >= s.num ? '1px solid var(--text-gold)' : '1px solid var(--text-muted)',
                backgroundColor: step > s.num ? 'var(--text-gold)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-display)',
                color: step > s.num ? 'var(--bg-primary)' : 'var(--text-primary)'
              }}>
                {step > s.num ? <Check size={12} strokeWidth={3} /> : s.num}
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: step === s.num ? 'var(--text-gold)' : 'var(--text-primary)'
              }}>
                {s.title}
              </span>
              {s.num < 5 && <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />}
            </div>
          ))}
        </div>

        {/* Wizard Forms with Animations */}
        <div style={{ minHeight: '320px' }}>
          <AnimatePresence mode="wait">
            {/* STEP 1: Select Services */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={{ fontSize: '1.2rem', marginBottom: '25px', fontFamily: 'var(--font-display)' }}>
                  SELECT TREATMENTS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {quickCatalog.map((service) => {
                    const isSelected = selectedServices.some(s => s.id === service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => handleServiceToggle(service)}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '20px',
                          border: isSelected ? '1px solid var(--gold-accent)' : '1px solid var(--border-dark)',
                          backgroundColor: 'var(--bg-card)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            border: '1px solid var(--border-gold)',
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isSelected ? 'var(--text-gold)' : 'transparent'
                          }}>
                            {isSelected && <Check size={12} color="var(--bg-primary)" strokeWidth={3} />}
                          </div>
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{service.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{service.time} mins</span>
                          <span style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', color: 'var(--text-gold)' }}>${service.price}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Select Stylist */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={{ fontSize: '1.2rem', marginBottom: '25px', fontFamily: 'var(--font-display)' }}>
                  CHOOSE MASTER ARTIST
                </h3>
                <div className="booking-stylists-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  {stylists.map((st) => (
                    <div
                      key={st.id}
                      onClick={() => setSelectedStylist(st.name)}
                      style={{
                        padding: '25px',
                        border: selectedStylist === st.name ? '1px solid var(--gold-accent)' : '1px solid var(--border-dark)',
                        backgroundColor: 'var(--bg-card)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        border: '1px solid var(--border-gold)',
                        margin: '0 auto 15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-gold)'
                      }}>
                        <User size={20} />
                      </div>
                      <h4 style={{ fontSize: '0.95rem', letterSpacing: '0.05em', marginBottom: '5px' }}>{st.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{st.role}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Choose Date & Time */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={{ fontSize: '1.2rem', marginBottom: '25px', fontFamily: 'var(--font-display)' }}>
                  SELECT DATE & TIME
                </h3>
                
                {/* Dates Carousel Row */}
                <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-gold)', marginBottom: '15px' }}>AVAILABLE DATES</h4>
                <div
                  className="booking-dates-row"
                  style={{
                    display: 'flex',
                    gap: '12px',
                    overflowX: 'auto',
                    paddingBottom: '15px',
                    marginBottom: '35px'
                  }}
                >
                  {dates.map((d) => (
                    <button
                      key={d.dateNum}
                      onClick={() => setSelectedDate(d.fullString)}
                      style={{
                        padding: '12px 18px',
                        border: selectedDate === d.fullString ? '1px solid var(--gold-accent)' : '1px solid var(--border-dark)',
                        backgroundColor: selectedDate === d.fullString ? 'rgba(197, 168, 128, 0.08)' : 'var(--bg-card)',
                        color: selectedDate === d.fullString ? 'var(--text-gold)' : 'var(--text-primary)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        minWidth: '85px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{d.dayName}</span>
                      <span style={{ fontSize: '1.2rem', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>{d.dateNum}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{d.monthName}</span>
                    </button>
                  ))}
                </div>

                {/* Time Slots Grid */}
                <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-gold)', marginBottom: '15px' }}>AVAILABLE TIMES</h4>
                <div
                  className="booking-times-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                    gap: '15px'
                  }}
                >
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      style={{
                        padding: '12px',
                        border: selectedTime === time ? '1px solid var(--gold-accent)' : '1px solid var(--border-dark)',
                        backgroundColor: selectedTime === time ? 'rgba(197, 168, 128, 0.08)' : 'var(--bg-card)',
                        color: selectedTime === time ? 'var(--text-gold)' : 'var(--text-primary)',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-sans)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Guest Info */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={{ fontSize: '1.2rem', marginBottom: '25px', fontFamily: 'var(--font-display)' }}>
                  RESERVATION DETAILS
                </h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="booking-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-gold)', letterSpacing: '0.1em' }}>FULL NAME</label>
                      <input
                        type="text"
                        required
                        value={guestInfo.name}
                        onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                        placeholder="John Doe"
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          border: '1px solid var(--border-dark)',
                          color: '#fff',
                          padding: '12px 15px',
                          outline: 'none',
                          fontSize: '0.9rem',
                          fontFamily: 'var(--font-sans)'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-gold)', letterSpacing: '0.1em' }}>EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                        placeholder="john@example.com"
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          border: '1px solid var(--border-dark)',
                          color: '#fff',
                          padding: '12px 15px',
                          outline: 'none',
                          fontSize: '0.9rem',
                          fontFamily: 'var(--font-sans)'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-gold)', letterSpacing: '0.1em' }}>PHONE NUMBER</label>
                      <input
                        type="tel"
                        required
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          border: '1px solid var(--border-dark)',
                          color: '#fff',
                          padding: '12px 15px',
                          outline: 'none',
                          fontSize: '0.9rem',
                          fontFamily: 'var(--font-sans)'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-gold)', letterSpacing: '0.1em' }}>SPECIAL REQUESTS (OPTIONAL)</label>
                    <textarea
                      rows={3}
                      value={guestInfo.note}
                      onChange={(e) => setGuestInfo({ ...guestInfo, note: e.target.value })}
                      placeholder="Let us know of any allergies, style preferences, or custom requirements."
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-dark)',
                        color: '#fff',
                        padding: '12px 15px',
                        outline: 'none',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-sans)',
                        resize: 'none'
                      }}
                    />
                  </div>

                  {/* Submission triggers step 5 */}
                  <button type="submit" style={{ display: 'none' }} id="booking-submit-btn" />
                </form>
              </motion.div>
            )}

            {/* STEP 5: Ticket Receipt */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--text-gold)',
                  marginBottom: '20px'
                }}>
                  <Sparkles size={20} />
                  <span style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.2em', fontSize: '1rem' }}>RESERVATION CONFIRMED</span>
                </div>

                {/* Golden Ticket Box */}
                <div
                  className="booking-ticket-box"
                  style={{
                    width: '100%',
                    maxWidth: '480px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-gold-strong)',
                    boxShadow: 'var(--shadow-gold)',
                    position: 'relative',
                    padding: '35px',
                    background: 'linear-gradient(180deg, var(--bg-secondary) 0%, #0f2824 100%)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Left & Right punch holes style */}
                  <div style={{ position: 'absolute', top: '50%', left: '-12px', transform: 'translateY(-50%)', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', borderRight: '1px solid var(--border-gold-strong)' }} />
                  <div style={{ position: 'absolute', top: '50%', right: '-12px', transform: 'translateY(-50%)', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', borderLeft: '1px solid var(--border-gold-strong)' }} />

                  {/* Ticket Header */}
                  <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '0.15em', color: 'var(--text-gold)' }}>STYLE ATELIER SALON</h4>
                    <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>BEVERLY HILLS</p>
                  </div>

                  <div style={{ borderBottom: '1px dashed var(--border-gold)', margin: '15px 0' }} />

                  {/* Details Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 10px', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', display: 'block', letterSpacing: '0.05em' }}>CLIENT</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{guestInfo.name}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', display: 'block', letterSpacing: '0.05em' }}>PASS CODE</span>
                      <span style={{ color: 'var(--text-gold)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{reservationId}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', display: 'block', letterSpacing: '0.05em' }}>DATE</span>
                      <span style={{ color: 'var(--text-primary)' }}>{selectedDate}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', display: 'block', letterSpacing: '0.05em' }}>TIME</span>
                      <span style={{ color: 'var(--text-primary)' }}>{selectedTime}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', display: 'block', letterSpacing: '0.05em' }}>ARTIST</span>
                      <span style={{ color: 'var(--text-primary)' }}>{selectedStylist}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', display: 'block', letterSpacing: '0.05em' }}>TOTAL</span>
                      <span style={{ color: 'var(--text-gold)', fontWeight: 600 }}>${calculateTotalCost()}</span>
                    </div>
                  </div>

                  <div style={{ borderBottom: '1px dashed var(--border-gold)', margin: '25px 0 20px' }} />

                  {/* Selected services listing */}
                  <div style={{ marginBottom: '15px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', display: 'block', letterSpacing: '0.05em', marginBottom: '8px' }}>TREATMENTS INCLUDED</span>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {selectedServices.map(s => (
                        <li key={s.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          <span>• {s.name}</span>
                          <span>{s.time} mins</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p style={{ fontSize: '0.65rem', textAlign: 'center', color: 'var(--text-muted)', marginTop: '25px', letterSpacing: '0.05em' }}>
                    Please present this pass upon arrival. Cancellation requires 24 hours notice.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                  <button
                    className="outline-btn"
                    onClick={() => {
                      // Reset booking
                      setSelectedServices([]);
                      setSelectedStylist('');
                      setSelectedDate('');
                      setSelectedTime('');
                      setGuestInfo({ name: '', email: '', phone: '', note: '' });
                      setReservationId('');
                      onClearPreselected();
                      setStep(1);
                    }}
                  >
                    BOOK ANOTHER
                  </button>
                  <button
                    className="glow-btn"
                    onClick={() => {
                      window.print();
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Ticket size={14} />
                    <span>PRINT TICKET</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons bottom */}
        {step < 5 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '50px',
            borderTop: '1px solid var(--border-dark)',
            paddingTop: '25px'
          }}>
            <button
              onClick={handleBack}
              disabled={step === 1}
              style={{
                background: 'none',
                border: 'none',
                color: step === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                cursor: step === 1 ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.1em'
              }}
            >
              <ChevronLeft size={16} />
              <span>BACK</span>
            </button>

            {step === 4 ? (
              <button
                onClick={() => {
                  document.getElementById('booking-submit-btn')?.click();
                }}
                disabled={!guestInfo.name || !guestInfo.email || !guestInfo.phone}
                className="glow-btn"
                style={{ fontSize: '0.75rem', padding: '12px 25px' }}
              >
                CONFIRM PASS
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && selectedServices.length === 0) ||
                  (step === 2 && !selectedStylist) ||
                  (step === 3 && (!selectedDate || !selectedTime))
                }
                style={{
                  background: 'none',
                  border: 'none',
                  color: (
                    (step === 1 && selectedServices.length === 0) ||
                    (step === 2 && !selectedStylist) ||
                    (step === 3 && (!selectedDate || !selectedTime))
                  ) ? 'var(--text-muted)' : 'var(--text-gold)',
                  cursor: (
                    (step === 1 && selectedServices.length === 0) ||
                    (step === 2 && !selectedStylist) ||
                    (step === 3 && (!selectedDate || !selectedTime))
                  ) ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.1em'
                }}
              >
                <span>NEXT</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
