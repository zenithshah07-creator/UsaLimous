"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  image: string;
  breadcrumb?: string;
  children?: React.ReactNode;
}

export default function PageHero({ badge, title, subtitle, image, breadcrumb, children }: PageHeroProps) {
  return (
    <section className="relative h-[420px] md:h-[480px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        style={{ filter: 'brightness(0.45)' }}
      />

      {/* Gold gradient overlay — bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-primary-dark/90" />

      {/* Gold accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gold/15 backdrop-blur-md border border-gold/30 text-gold px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.3em] mb-5 uppercase"
          >
            {badge}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.65 }}
          className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white/90 leading-tight mb-4"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-dm text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {breadcrumb && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-dm text-white/30 text-xs uppercase tracking-widest mt-5"
          >
            {breadcrumb}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  );
}
