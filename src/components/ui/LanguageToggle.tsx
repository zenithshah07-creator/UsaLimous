'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const FlagEN = () => (
  <svg viewBox="0 0 640 480" width="18" height="14" className="rounded-sm shadow-sm">
    <path fill="#bd3d44" d="M0 0h640v480H0z"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.4h640M0 129.2h640M0 203h640M0 277h640M0 350.8h640M0 424.6h640"/>
    <path fill="#192f5d" d="M0 0h256v240H0z"/>
    <circle fill="#fff" cx="21" cy="20" r="1.3"/>
    <circle fill="#fff" cx="21" cy="60" r="1.3"/>
    <circle fill="#fff" cx="21" cy="100" r="1.3"/>
    <circle fill="#fff" cx="21" cy="140" r="1.3"/>
    <circle fill="#fff" cx="21" cy="180" r="1.3"/>
    <circle fill="#fff" cx="21" cy="220" r="1.3"/>
    <circle fill="#fff" cx="42" cy="40" r="1.3"/>
    <circle fill="#fff" cx="42" cy="80" r="1.3"/>
    <circle fill="#fff" cx="42" cy="120" r="1.3"/>
    <circle fill="#fff" cx="42" cy="160" r="1.3"/>
    <circle fill="#fff" cx="42" cy="200" r="1.3"/>
    <circle fill="#fff" cx="63" cy="20" r="1.3"/>
    <circle fill="#fff" cx="63" cy="60" r="1.3"/>
    <circle fill="#fff" cx="63" cy="100" r="1.3"/>
    <circle fill="#fff" cx="63" cy="140" r="1.3"/>
    <circle fill="#fff" cx="63" cy="180" r="1.3"/>
    <circle fill="#fff" cx="63" cy="220" r="1.3"/>
    <circle fill="#fff" cx="84" cy="40" r="1.3"/>
    <circle fill="#fff" cx="84" cy="80" r="1.3"/>
    <circle fill="#fff" cx="84" cy="120" r="1.3"/>
    <circle fill="#fff" cx="84" cy="160" r="1.3"/>
    <circle fill="#fff" cx="84" cy="200" r="1.3"/>
    <circle fill="#fff" cx="105" cy="20" r="1.3"/>
    <circle fill="#fff" cx="105" cy="60" r="1.3"/>
    <circle fill="#fff" cx="105" cy="100" r="1.3"/>
    <circle fill="#fff" cx="105" cy="140" r="1.3"/>
    <circle fill="#fff" cx="105" cy="180" r="1.3"/>
    <circle fill="#fff" cx="105" cy="220" r="1.3"/>
    <circle fill="#fff" cx="126" cy="40" r="1.3"/>
    <circle fill="#fff" cx="126" cy="80" r="1.3"/>
    <circle fill="#fff" cx="126" cy="120" r="1.3"/>
    <circle fill="#fff" cx="126" cy="160" r="1.3"/>
    <circle fill="#fff" cx="126" cy="200" r="1.3"/>
    <circle fill="#fff" cx="147" cy="20" r="1.3"/>
    <circle fill="#fff" cx="147" cy="60" r="1.3"/>
    <circle fill="#fff" cx="147" cy="100" r="1.3"/>
    <circle fill="#fff" cx="147" cy="140" r="1.3"/>
    <circle fill="#fff" cx="147" cy="180" r="1.3"/>
    <circle fill="#fff" cx="147" cy="220" r="1.3"/>
    <circle fill="#fff" cx="168" cy="40" r="1.3"/>
    <circle fill="#fff" cx="168" cy="80" r="1.3"/>
    <circle fill="#fff" cx="168" cy="120" r="1.3"/>
    <circle fill="#fff" cx="168" cy="160" r="1.3"/>
    <circle fill="#fff" cx="168" cy="200" r="1.3"/>
    <circle fill="#fff" cx="189" cy="20" r="1.3"/>
    <circle fill="#fff" cx="189" cy="60" r="1.3"/>
    <circle fill="#fff" cx="189" cy="100" r="1.3"/>
    <circle fill="#fff" cx="189" cy="140" r="1.3"/>
    <circle fill="#fff" cx="189" cy="180" r="1.3"/>
    <circle fill="#fff" cx="189" cy="220" r="1.3"/>
    <circle fill="#fff" cx="210" cy="40" r="1.3"/>
    <circle fill="#fff" cx="210" cy="80" r="1.3"/>
    <circle fill="#fff" cx="210" cy="120" r="1.3"/>
    <circle fill="#fff" cx="210" cy="160" r="1.3"/>
    <circle fill="#fff" cx="210" cy="200" r="1.3"/>
    <circle fill="#fff" cx="231" cy="20" r="1.3"/>
    <circle fill="#fff" cx="231" cy="60" r="1.3"/>
    <circle fill="#fff" cx="231" cy="100" r="1.3"/>
    <circle fill="#fff" cx="231" cy="140" r="1.3"/>
    <circle fill="#fff" cx="231" cy="180" r="1.3"/>
    <circle fill="#fff" cx="231" cy="220" r="1.3"/>
  </svg>
);

const FlagES = () => (
  <svg viewBox="0 0 640 480" width="18" height="14" className="rounded-sm shadow-sm">
    <path fill="#f1bf00" d="M0 0h640v480H0z"/>
    <path fill="#c60b1e" d="M0 0h640v120H0zm0 360h640v120H0z"/>
    <path fill="#c60b1e" d="M110 160h100v160H110z"/>
    <path fill="#f1bf00" d="M120 170h80v140H120z"/>
    <circle fill="#c60b1e" cx="160" cy="210" r="15"/>
  </svg>
);

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'es' : 'en');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2.5 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 group"
      aria-label="Toggle Language"
    >
      <div className="flex items-center gap-2">
        {locale === 'en' ? <FlagEN /> : <FlagES />}
        <span className="text-[11px] font-dm font-bold tracking-widest text-white/80 group-hover:text-gold uppercase">
          {locale === 'en' ? 'EN' : 'ES'}
        </span>
      </div>
      <div className="w-[1px] h-3 bg-white/20"></div>
      <span className="text-[10px] font-dm font-medium text-white/40 group-hover:text-white/60">
        {locale === 'en' ? 'ESPAÑOL' : 'ENGLISH'}
      </span>
    </motion.button>
  );
}
