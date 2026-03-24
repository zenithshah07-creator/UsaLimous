"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Fleet', path: '/fleet' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-[1000] transition-all duration-300 ${scrolled ? 'bg-primary-dark shadow-medium border-b border-gray-dark py-2' : 'bg-primary-dark/95 backdrop-blur-sm border-b border-transparent h-16'}`}>
      <div className="container mx-auto px-4 md:px-10 flex items-center justify-between h-[56px]">
        
        {/* Logo */}
        <Link href="/" className="group relative z-10 flex items-center gap-2">
          {/* A simple luxury emblem */}
          <div className="w-8 h-8 rounded-full border-2 border-gold flex items-center justify-center">
            <span className="font-playfair text-gold font-bold text-sm">UL</span>
          </div>
          <span className="font-playfair text-2xl font-bold text-gold group-hover:text-gold-light transition-colors drop-shadow-[0_0_8px_rgba(212,175,55,0.2)]">
            USA LIMOS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/');
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`text-sm font-medium font-dm transition-colors relative group py-2 ${isActive ? 'text-gold' : 'text-white hover:text-gold-light'}`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            )
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="tel:+18005550199" className="text-white hover:text-gold transition-colors flex items-center gap-2 font-dm text-sm font-medium">
            <div className="w-8 h-8 rounded-full bg-gray-charcoal flex items-center justify-center text-gold">
              <FiPhone size={14} />
            </div>
            <span>800-555-0199</span>
          </a>
          <Button variant="primary" className="!py-2.5 !px-6 text-sm" onClick={() => window.location.href='/booking'}>Book Now</Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white hover:text-gold z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

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
                  className={`block px-6 py-4 font-dm font-medium text-lg border-b border-gray-charcoal last:border-0 hover:bg-gray-charcoal/50 transition-colors ${pathname === item.path ? 'text-gold pl-8 border-l-4 border-l-gold' : 'text-white'}`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-6 py-8 flex flex-col gap-4 bg-gray-charcoal/30 mt-4">
                <Button variant="secondary" className="w-full justify-center" onClick={() => window.location.href='tel:+18005550199'}>
                  <FiPhone className="mr-2" /> 800-555-0199
                </Button>
                <Button variant="primary" className="w-full justify-center" onClick={() => { setIsOpen(false); window.location.href='/booking'; }}>
                  Book Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
