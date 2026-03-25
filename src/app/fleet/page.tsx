"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fleet } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const categories = ['All', 'Luxury Sedan', 'Luxury SUV', 'Stretch Limousine', 'Party Bus'];

export default function Fleet() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFleet = activeCategory === 'All' 
    ? fleet 
    : fleet.filter(v => v.category === activeCategory);

  return (
    <div className="bg-primary-dark min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 border-b border-gray-charcoal overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: "url('/Assets/Herosection1.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-primary-dark/60"></div>
        <div className="container mx-auto px-4 lg:px-10 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl md:text-6xl text-gold mb-6"
          >
            Our Premium Fleet
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-dm text-white/70 max-w-2xl mx-auto mb-12 text-lg"
          >
            Discover our meticulously maintained selection of world-class vehicles, each chosen for ultimate comfort, safety, and prestige.
          </motion.p>
          
          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-dm text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat 
                  ? 'bg-gold text-primary-dark border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                  : 'bg-transparent text-white border-gray-dark hover:border-gold-light/50 hover:text-gold-light'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-10">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredFleet.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="p-0 overflow-hidden h-full flex flex-col group border-gray-dark hover:border-gold transition-colors duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-transparent transition-colors z-10"></div>
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 z-20 bg-primary-dark/80 backdrop-blur-sm border border-gold/50 text-gold text-xs font-dm font-bold px-3 py-1 rounded">
                        {vehicle.category}
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow bg-gray-charcoal">
                      <h2 className="font-cormorant text-2xl md:text-3xl font-bold text-gold mb-6">{vehicle.name}</h2>
                      
                      <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm font-dm mb-8 flex-grow">
                        <div className="text-white/80">
                          <span className="block text-gray-500 text-xs mb-1">CAPACITY</span>
                          {vehicle.seating} Passengers
                        </div>
                        <div className="text-white/80">
                          <span className="block text-gray-500 text-xs mb-1">RATES STARTING</span>
                          {vehicle.priceHourly} / hr
                        </div>
                        <div className="col-span-2 text-white/80">
                          <span className="block text-gray-500 text-xs mb-1">AMENITIES</span>
                          {vehicle.features.join(' • ')}
                        </div>
                      </div>

                      <div className="flex gap-3 mt-auto">
                        <Button variant="secondary" className="flex-1 !py-3 !px-2 text-sm" onClick={() => window.location.href='/contact'}>Specs</Button>
                        <Button className="flex-1 !py-3 !px-2 text-sm" onClick={() => window.location.href='/booking'}>Reserve</Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {filteredFleet.length === 0 && (
            <div className="text-center py-20">
              <p className="font-dm text-white/50 text-lg">No vehicles found in this category.</p>
              <Button variant="secondary" className="mt-6" onClick={() => setActiveCategory('All')}>View All Fleet</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
