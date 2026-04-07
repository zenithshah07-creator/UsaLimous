'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { TbMessageDots } from 'react-icons/tb';

const PHONE_NUMBER = '+9779851249747'; // E.164 format for tel: links
const WHATSAPP_NUMBER = '9779851249747'; // digits only for wa.me

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        gap: '16px',
        zIndex: 9999,
      }}
    >
      {/* ── Main Toggle Button ── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6', // Premium Blue
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
          cursor: 'pointer',
          color: 'white',
          fontSize: '24px',
          zIndex: 2,
        }}
        aria-label="Contact Options"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex' }}
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <TbMessageDots />
          )}
        </motion.div>
      </motion.button>

      {/* ── Contact Options ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '4px',
            }}
          >
            {/* Phone Button */}
            <motion.a
              href={`tel:${PHONE_NUMBER}`}
              whileHover={{ scale: 1.1, x: -5 }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#D4AF37', // Gold
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
                textDecoration: 'none',
                color: 'black',
                fontSize: '20px',
              }}
              title="Call Us"
            >
              <FaPhoneAlt />
            </motion.a>

            {/* WhatsApp Button */}
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, x: -5 }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#25D366', // Green
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                textDecoration: 'none',
                color: 'white',
                fontSize: '24px',
              }}
              title="WhatsApp"
            >
              <FaWhatsapp />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

