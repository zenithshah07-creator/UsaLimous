"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { FiMenu, FiX, FiPhone, FiMail, FiFacebook, FiInstagram, FiYoutube, FiLinkedin } from 'react-icons/fi';
import { FaTiktok, FaXTwitter, FaCarSide } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || '/';
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.fleet'), path: '/fleet' },
    { name: t('nav.pricing'), path: '/pricing' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-[1000] transition-all duration-300 ${scrolled ? 'bg-primary-dark/95 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-primary-dark/95 backdrop-blur-sm border-b border-transparent'}`}>
      {/* Top Bar */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="hidden lg:block bg-black/60 border-b border-white/5 py-3 font-dm overflow-hidden"
          >
            <div className="container mx-auto px-4 lg:px-6 xl:px-10 flex justify-between items-center">
              <div className="flex items-center gap-8">
                <a href="tel:+18001234567" className="flex items-center gap-2 text-[13px] text-white/50 hover:text-gold transition-colors group">
                  <FiPhone className="text-gold group-hover:scale-110 transition-transform" size={14} />
                  <span>+1 (800) 123-4567</span>
                </a>
                <a href="mailto:info@usalimosservice.com" className="flex items-center gap-2 text-[13px] text-white/50 hover:text-gold transition-colors group">
                  <FiMail className="text-gold group-hover:scale-110 transition-transform" size={14} />
                  <span>info@usalimosservice.com</span>
                </a>
              </div>
              <div className="flex items-center gap-5">
                {[
                  { Icon: FiFacebook, href: "#" },
                  { Icon: FiInstagram, href: "#" },
                  { Icon: FiYoutube, href: "#" },
                  { Icon: FiLinkedin, href: "#" },
                  { Icon: FaXTwitter, href: "#" },
                  { Icon: FaTiktok, href: "#" },
                ].map((social, i) => (
                  <a key={i} href={social.href} className="text-white/40 hover:text-gold transition-all hover:scale-120">
                    <social.Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`container mx-auto px-4 lg:px-6 xl:px-10 flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
        
        {/* Logo */}
        <Link href="/" className="group relative z-10 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center shrink-0 shadow-lg shadow-gold/20">
            <FaCarSide className="text-primary-dark text-xl" />
          </div>
          <span className="font-playfair text-xl xl:text-2xl font-bold text-white/90 group-hover:text-gold transition-colors tracking-tight">
            USA<span className="text-gold">Limos</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center lg:space-x-4 xl:space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/');
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`text-sm lg:text-[13px] xl:text-sm font-medium font-dm transition-colors relative group py-2 whitespace-nowrap ${isActive ? 'text-gold' : 'text-white/90 hover:text-gold-light'}`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            )
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center lg:space-x-3 xl:space-x-5 shrink-0">
          <LanguageToggle />
          <Button variant="primary" className="!py-2 !px-4 xl:!py-2.5 xl:!px-6 text-xs xl:text-sm" onClick={() => window.location.href='/booking'}>{t('nav.bookNow')}</Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <LanguageToggle />
          <button 
            className="text-white/90 hover:text-gold z-50 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 w-full bg-primary-dark border-b border-gray-dark shadow-heavy lg:hidden flex flex-col overflow-hidden"
          >
            <div className="py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-4 font-dm font-medium text-lg border-b border-gray-charcoal last:border-0 hover:bg-gray-charcoal/50 transition-colors ${pathname === item.path ? 'text-gold pl-8 border-l-4 border-l-gold' : 'text-white/90'}`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-6 py-8 flex flex-col gap-4 bg-gray-charcoal/30 mt-4">
                <Button variant="primary" className="w-full justify-center" onClick={() => { setIsOpen(false); window.location.href='/booking'; }}>
                  {t('nav.bookNow')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
