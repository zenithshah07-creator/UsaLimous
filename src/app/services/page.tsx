"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { FiX, FiCheckCircle, FiArrowRight, FiInfo } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import PageHero from '@/components/ui/PageHero';
import Image from 'next/image';

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { t } = useLanguage();

  const openService = services.find(s => s.id === selectedService);

  return (
    <div className="bg-primary-dark min-h-screen relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Section */}
      <PageHero
        badge={t('nav.services')}
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        image="/Assets/Corporate Travel.jpg"
      />

      {/* Services Grid */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-[#161b22] rounded-[40px] overflow-hidden border border-white/5 shadow-deep transition-all duration-700 hover:border-gold/30 hover:shadow-glow-strong h-full flex flex-col md:flex-row">
                  {/* Image Side */}
                  <div className="w-full md:w-2/5 h-[300px] md:h-auto relative overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={service.name} 
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#161b22] via-transparent to-transparent"></div>
                    <div className="absolute top-6 left-6 text-5xl drop-shadow-2xl">{service.icon}</div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="w-full md:w-3/5 p-10 flex flex-col">
                    <h2 className="font-playfair text-3xl md:text-4xl text-white mb-6 group-hover:text-gold transition-colors duration-500">{service.name}</h2>
                    <p className="font-dm text-white/40 text-sm leading-relaxed mb-8">{service.description}</p>
                    
                    <ul className="space-y-3 mb-10">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center text-xs text-white/60 font-dm">
                          <FiCheckCircle className="text-gold mr-3 shrink-0" size={14} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap gap-4">
                      <Button 
                        className="h-12 px-8 rounded-2xl shadow-glow group/btn"
                        onClick={() => window.location.href='/booking'}
                      >
                        <span>{t('services.bookNow')}</span>
                        <FiArrowRight className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                      <Button 
                        variant="secondary" 
                        className="h-12 px-8 rounded-2xl border-white/5 hover:border-white/20 text-white/60 hover:text-white"
                        onClick={() => setSelectedService(service.id)}
                      >
                        {t('services.learnMore')}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Modal View */}
      <AnimatePresence>
        {selectedService && openService && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-[#0d1117] rounded-[40px] shadow-glow-strong border border-gold/20 flex flex-col lg:flex-row"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-primary-dark transition-all duration-300"
              >
                <FiX size={24} />
              </button>

              <div className="w-full lg:w-1/2 h-80 lg:h-auto relative">
                <Image src={openService.image} alt={openService.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0d1117] via-transparent to-transparent"></div>
                <div className="absolute top-12 left-12 text-7xl">{openService.icon}</div>
              </div>

              <div className="w-full lg:w-1/2 p-12 lg:p-20 overflow-y-auto custom-scrollbar flex flex-col">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-playfair text-4xl lg:text-5xl text-white mb-4">{openService.name}</h3>
                  <p className="text-gold font-dm font-bold mb-10 tracking-[0.2em] text-sm uppercase">{t('services.details')}</p>
                  
                  <div className="space-y-8 mb-12">
                    <p className="text-white/50 font-dm text-lg leading-relaxed">
                      {openService.description} Every detail is precision-engineered to provide the pinnacle of luxury transportation.
                    </p>
                    
                    <div className="bg-white/[0.03] rounded-3xl p-8 border border-white/5">
                      <h4 className="font-playfair text-xl text-gold mb-6 flex items-center gap-3">
                        <FiInfo size={20} /> {t('services.whatIncluded')}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {openService.features.map((f, i) => (
                          <li key={i} className="flex items-center text-sm text-white/70 font-dm">
                            <FiCheckCircle className="text-gold mr-3 shrink-0" size={16} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row gap-6">
                    <Button 
                      className="h-16 px-12 rounded-2xl shadow-glow-strong text-lg flex-1" 
                      onClick={() => window.location.href='/booking'}
                    >
                      {t('services.bookNow')}
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="h-16 px-12 rounded-2xl border-white/10 hover:border-white/20 text-white/50 hover:text-white flex-1"
                      onClick={() => setSelectedService(null)}
                    >
                      {t('booking.back')}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
