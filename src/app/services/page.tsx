"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FiX, FiCheckCircle } from 'react-icons/fi';

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const openService = services.find(s => s.id === selectedService);

  return (
    <div className="bg-primary-dark">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden border-b border-gray-charcoal">
        <div className="absolute inset-0 bg-[url('/Assets/Herosection1.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-primary-dark/60"></div>
        <div className="relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-5xl md:text-6xl text-gold mb-4"
          >
            Premium Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-dm text-white/70 uppercase tracking-widest text-sm"
          >
            Home / Services
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-0 overflow-hidden group h-full flex flex-col relative" hoverEffect={false}>
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-primary-dark/80 group-hover:bg-primary-dark/60 transition-colors duration-500 z-10"></div>
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  
                  <div className="relative z-10 p-10 flex flex-col h-full items-start border border-transparent group-hover:border-gold transition-colors duration-500 rounded-lg">
                    <div className="text-5xl mb-6 bg-gray-charcoal/50 p-4 rounded-full backdrop-blur-sm border border-gold/20">{service.icon}</div>
                    <h2 className="font-playfair text-3xl md:text-4xl text-gold mb-4">{service.name}</h2>
                    <p className="font-dm text-white/90 text-lg mb-8 max-w-lg leading-relaxed">{service.description}</p>
                    
                    <ul className="mb-10 space-y-3 font-dm text-white/80">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex gap-4 w-full sm:w-auto flex-col sm:flex-row">
                      <Button onClick={() => window.location.href='/booking'}>Book Now</Button>
                      <Button variant="secondary" onClick={() => setSelectedService(service.id)}>Learn More</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Modal View */}
      <AnimatePresence>
        {selectedService && openService && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 text-white font-dm">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-primary-dark rounded-xl shadow-deep border border-gold/30 flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-gold hover:text-primary-dark transition-colors"
              >
                <FiX size={24} />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img src={openService.image} alt={openService.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark to-transparent md:bg-gradient-to-r"></div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col relative z-10">
                <span className="text-4xl mb-4">{openService.icon}</span>
                <h3 className="font-playfair text-3xl md:text-4xl text-gold mb-2">{openService.name}</h3>
                <p className="text-gold font-bold mb-6 text-lg tracking-wide">{openService.price}</p>
                
                <div className="h-[1px] w-full bg-gray-dark mb-6"></div>
                
                <h4 className="font-cormorant text-2xl text-white mb-4">Service Details</h4>
                <p className="text-white/70 leading-relaxed mb-6">
                  {openService.description} Every aspect of our {openService.name.toLowerCase()} is meticulously planned to ensure your ultimate comfort, prestige, and safety.
                </p>

                <h4 className="font-playfair text-2xl text-gold mb-6 border-b border-gray-dark pb-4">What&apos;s Included</h4>
                <ul className="space-y-3 mb-10">
                  {openService.features.map((f, i) => (
                    <li key={i} className="flex items-start text-white/80">
                      <FiCheckCircle className="text-gold mt-1 mr-3 shrink-0" />
                      {f}
                    </li>
                  ))}
                  <li className="flex items-start text-white/80">
                    <FiCheckCircle className="text-gold mt-1 mr-3 shrink-0" />
                    Dedicated 24/7 concierge support
                  </li>
                  <li className="flex items-start text-white/80">
                    <FiCheckCircle className="text-gold mt-1 mr-3 shrink-0" />
                    All tolls, taxes, and fees integrated
                  </li>
                </ul>

                <Button className="mt-auto w-full" onClick={() => window.location.href='/booking'}>Book This Service</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
