"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FiCheck, FiPlus, FiMinus } from 'react-icons/fi';
import PageHero from '@/components/ui/PageHero';

const pricingPackages = [
  {
    title: 'Airport Transfer',
    price: '$80',
    subtitle: 'Starting from, Flat Rate',
    features: ['60 mins complimentary wait time', 'Chauffeur meet & greet', 'Real-time flight tracking', 'Luggage assistance', 'Premium Sedans or SUVs'],
    popular: false
  },
  {
    title: 'Hourly Charter',
    price: '$130',
    subtitle: 'Per Hour, 3-hour minimum',
    features: ['Dedicated chauffeur on standby', 'Multiple stops allowed', 'Flexible itinerary', 'Complimentary bottled water', 'Ideal for corporate or shopping'],
    popular: true
  },
  {
    title: 'Wedding Package',
    price: '$1,200',
    subtitle: 'Starting from, 6 Hours',
    features: ['Red carpet rollout', 'Complimentary champagne', 'Just Married signage', 'Immaculate stretch limousine', 'Coordinated timeline'],
    popular: false
  }
];

const faqs = [
  { q: 'Do you offer discounts for long-term bookings?', a: 'Yes, we provide custom corporate accounts and volume discounts for regular clients or long-term multi-day bookings. Please contact our sales team for a personalized quote.' },
  { q: 'What is included in the pricing?', a: 'Our standard pricing includes the vehicle, professional chauffeur, fuel, and standard amenities (water, mints, Wi-Fi). Tolls, parking, and gratuity are typically calculated separately unless a flat rate explicitly includes them.' },
  { q: 'Are gratuities included?', a: 'A standard 20% chauffeur gratuity is added to the final invoice for your convenience, ensuring a seamless, cashless experience on the day of service.' },
  { q: 'Can I modify my booking after confirmation?', a: 'Absolutely. You can modify your reservation details up to 24 hours before your scheduled pickup time without any penalty. Last-minute changes are subject to fleet availability.' }
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-primary-dark">
      {/* Hero */}
      <PageHero
        title="Transparent Pricing"
        subtitle="Uncompromising luxury tailored to your itinerary. View our baseline rates below or request a custom quote for complex journeys."
        image="/Assets/Pricing.avif"
        breadcrumb="Home / Pricing"
      />

      {/* Pricing Cards */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Assets/Pricing.avif')] opacity-5 bg-cover bg-center bg-fixed"></div>
        <div className="container relative mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPackages.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={pkg.popular ? 'md:-translate-y-4' : ''}
              >
                <Card 
                  className={`h-full flex flex-col p-8 relative ${pkg.popular ? 'border-2 border-gold shadow-[0_0_30px_rgba(212,175,55,0.15)]' : 'border border-gray-dark'}`}
                  hoverEffect={false}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-gold text-primary-dark font-dm font-bold text-xs py-1 px-4 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <h3 className="font-playfair text-3xl text-gold mb-2">{pkg.title}</h3>
                  <div className="mb-6 border-b border-gray-dark pb-6">
                    <span className="font-dm text-4xl font-bold text-white">{pkg.price}</span>
                    <span className="font-dm text-white/50 text-sm block mt-2">{pkg.subtitle}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-10 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start font-dm text-white/80 text-sm">
                        <FiCheck className="text-gold mt-1 mr-3 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={pkg.popular ? 'primary' : 'secondary'} 
                    className="w-full mt-auto"
                    onClick={() => window.location.href='/booking'}
                  >
                    Select Plan
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-charcoal">
        <div className="container mx-auto px-4 lg:px-10 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl text-gold mb-4">Frequently Asked Questions</h2>
            <p className="font-dm text-white/70">Clear answers about our billing and policies.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-gray-dark rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full text-left p-6 flex items-center justify-between font-cormorant text-xl md:text-2xl transition-colors ${openFaq === i ? 'text-gold bg-[rgba(212,175,55,0.05)]' : 'text-white hover:text-gold'}`}
                >
                  {faq.q}
                  <div className="text-gold ml-4 shrink-0">
                    {openFaq === i ? <FiMinus /> : <FiPlus />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 font-dm text-white/70 leading-relaxed border-t border-gray-dark/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="font-dm text-white/60 mb-6">Have a specific question not listed here?</p>
            <Button variant="secondary" onClick={() => window.location.href='/contact'}>Contact Support</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
