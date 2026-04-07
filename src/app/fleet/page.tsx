"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { FiUsers, FiCheckCircle, FiStar, FiArrowRight } from 'react-icons/fi';
import PageHero from '@/components/ui/PageHero';
import Image from 'next/image';

export default function Fleet() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  // Categories mapping
  const categoryMap = t('fleet.categories');
  const categories = Object.keys(categoryMap);

  // Localized fleet data
  const fleetList = [
    { id: 'escalade', ...t('data.fleet.escalade'), image: '/Assets/Herosection1.jpg', category: 'suv', seating: '6' },
    { id: 'mercedes', ...t('data.fleet.mercedes'), image: '/Assets/Herosection2.jpg', category: 'sedan', seating: '3' },
    { id: 'lincoln', ...t('data.fleet.lincoln'), image: '/Assets/Herosection3.jpg', category: 'stretch', seating: '10' }
  ];

  const filteredFleet = activeCategory === 'all'
    ? fleetList
    : fleetList.filter(v => v.category === activeCategory);

  return (
    <div className="bg-primary-dark min-h-screen relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-gold/5 to-transparent pointer-events-none"></div>

      {/* Hero Section */}
      <PageHero
        badge={t('nav.fleet')}
        title={t('fleet.title')}
        subtitle={t('fleet.subtitle')}
        image="/Assets/Herosection1.jpg"
      >
        {/* Enhanced Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-4 bg-white/[0.03] backdrop-blur-md p-2 rounded-full border border-white/5 w-fit mx-auto"
        >
          {categories.map((catKey) => (
            <button
              key={catKey}
              onClick={() => setActiveCategory(catKey)}
              className={`px-8 py-3 rounded-full font-dm text-xs font-bold uppercase tracking-widest transition-all duration-500 ${activeCategory === catKey
                  ? 'bg-gold text-primary-dark shadow-glow scale-105'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            >
              {categoryMap[catKey]}
            </button>
          ))}
        </motion.div>
      </PageHero>

      {/* Fleet Grid */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 lg:px-10">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredFleet.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative bg-[#161b22] rounded-[40px] overflow-hidden border border-white/5 shadow-deep transition-all duration-700 hover:border-gold/30 hover:shadow-glow-strong">
                    {/* Image Area */}
                    <div className="relative h-[300px] overflow-hidden">
                      <Image
                        src={vehicle.image}
                        alt={vehicle.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent"></div>

                      {/* Badge */}
                      <div className="absolute top-6 right-6">
                        <span className="bg-primary-dark/80 backdrop-blur-md border border-gold/30 text-gold text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                          {categoryMap[vehicle.category]}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-10 pt-0 relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <h2 className="font-playfair text-3xl text-white group-hover:text-gold transition-colors duration-500">{vehicle.name}</h2>
                        <div className="flex items-center gap-1 text-gold">
                          <FiStar size={14} fill="currentColor" />
                          <span className="text-xs font-dm font-bold mt-0.5">5.0</span>
                        </div>
                      </div>

                      <div className="space-y-6 mb-10">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/[0.03] p-4 rounded-3xl border border-white/5">
                            <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">{t('fleet.capacity')}</p>
                            <p className="text-white font-dm font-bold flex items-center gap-2"><FiUsers size={14} className="text-gold" /> {vehicle.seating} PAX</p>
                          </div>
                          <div className="bg-white/[0.03] p-4 rounded-3xl border border-white/5">
                            <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">{t('fleet.price')}</p>
                            <p className="text-white font-dm font-bold text-lg">N/A</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {vehicle.features?.slice(0, 3).map((f: string, i: number) => (
                            <span key={i} className="text-[10px] text-white/40 font-dm border border-white/5 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                              <FiCheckCircle size={10} className="text-gold" /> {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          variant="secondary"
                          className="!rounded-2xl h-14 border-white/10 text-white/60 hover:text-white"
                          onClick={() => window.location.href = `/fleet/${vehicle.id}`}
                        >
                          {t('fleet.details')}
                        </Button>
                        <Button
                          className="!rounded-2xl h-14 shadow-glow group/btn"
                          onClick={() => window.location.href = '/booking'}
                        >
                          <span>{t('fleet.bookNow')}</span>
                          <FiArrowRight className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredFleet.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                <FiUsers size={32} className="text-white/20" />
              </div>
              <p className="font-dm text-white/30 text-xl mb-10">{t('fleet.noResults')}</p>
              <Button
                variant="secondary"
                className="px-10 h-14 rounded-full"
                onClick={() => setActiveCategory('all')}
              >
                {t('fleet.reset')}
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-gold/5 border-y border-gold/10 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-6 uppercase">{t('fleet.cta.title')}</h2>
          <p className="font-dm text-white/50 text-lg mb-12 max-w-2xl mx-auto">
            {t('fleet.cta.subtitle')}
          </p>
          <Button
            className="h-16 px-12 rounded-full text-lg shadow-glow-strong"
            onClick={() => window.location.href = '/contact'}
          >
            {t('fleet.cta.button')}
          </Button>
        </div>
      </section>
    </div>
  );
}
