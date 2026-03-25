"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './Card';
import { Button } from './Button';
import { FiUsers, FiShoppingBag, FiArrowRight } from 'react-icons/fi';

interface FleetCardProps {
  vehicle: {
    id: string;
    name: string;
    category: string;
    image: string;
    seating: number | string;
    luggage?: number | string;
    features: string[];
    priceHourly: string;
  };
  onClick?: () => void;
}

export function FleetCard({ vehicle, onClick }: FleetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card variant="dark" hoverEffect className="p-0 overflow-hidden h-full flex flex-col group border-white/5 hover:border-gold/30 transition-all duration-500">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-primary-dark/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
          <motion.img 
            src={vehicle.image} 
            alt={vehicle.name} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-primary-dark/80 backdrop-blur-md text-gold text-[10px] font-bold px-3 py-1 rounded-full border border-gold/30 uppercase tracking-widest">
              {vehicle.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col flex-grow bg-gray-charcoal/30">
          <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
            {vehicle.name}
          </h3>
          
          <div className="flex items-center gap-6 mb-8 mt-2">
            <div className="flex items-center gap-2 text-white/60">
              <FiUsers className="text-gold" size={16} />
              <span className="text-xs font-dm font-medium">{vehicle.seating} Seats</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <FiShoppingBag className="text-gold" size={16} />
              <span className="text-xs font-dm font-medium">{vehicle.luggage || 4} Bags</span>
            </div>
          </div>

          <div className="h-[1px] w-full bg-white/5 mb-8"></div>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">From</p>
              <p className="font-poppins text-xl font-bold text-gold">{vehicle.priceHourly}<span className="text-xs font-normal text-white/40 ml-1">/ hr</span></p>
            </div>
            <Button 
              variant="primary" 
              className="!py-2.5 !px-6 text-xs group/btn glow-gold" 
              onClick={onClick || (() => window.location.href=`/booking?vehicle=${vehicle.id}`)}
            >
              Book Now <FiArrowRight className="ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
