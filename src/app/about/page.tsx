"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { FiAward, FiUsers, FiClock, FiShield, FiLinkedin, FiMail } from 'react-icons/fi';
import PageHero from '@/components/ui/PageHero';

const team = [
  { name: 'Robert Stirling', role: 'Founder & CEO', image: '/Assets/Herosection1.jpg', bio: 'With 20 years in luxury transport, Robert sets our gold standard for service.' },
  { name: 'Sarah Jenkins', role: 'Head of Operations', image: '/Assets/Herosection55.jpg', bio: 'Sarah ensures our fleet is immaculate and every dispatch is perfectly timed.' },
  { name: 'Michael Chen', role: 'Chief Concierge', image: '/Assets/Herosection2.jpg', bio: 'Michael curates the bespoke amenities for our VVIP and corporate clients.' },
];

export default function About() {
  return (
    <div className="bg-primary-dark">
      {/* Hero */}
      {/* Hero */}
      <PageHero
        title="About USA Limos"
        breadcrumb="Home / About"
        image="/Assets/Corporate Travel.jpg"
      />

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-6"
            >
              <h2 className="font-playfair text-4xl lg:text-5xl text-gold mb-6">Our Legacy of Excellence</h2>
              <p className="font-dm text-white/80 leading-relaxed text-lg">
                Founded on the principles of discretion, reliability, and uncompromised luxury, USA Limos Service has grown from a boutique fleet to a nationwide symbol of elite transportation.
              </p>
              <p className="font-dm text-white/80 leading-relaxed text-lg">
                Our mission is simple: <span className="text-gold font-semibold">To transform every journey into a memorable experience of comfort and prestige.</span>
              </p>
              <p className="font-dm text-white/80 leading-relaxed text-lg">
                We believe that true luxury is found in perfectly executed details—from the ambient temperature of the cabin upon your arrival, to the subtle professionalism of your chauffeur.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gold/10 transform translate-x-4 translate-y-4 rounded-lg"></div>
                <img src="/Assets/Costumer trust.webp" alt="Luxury Fleet" className="rounded-lg relative z-10 shadow-heavy w-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us Stats */}
      <section className="py-24 bg-gray-charcoal border-y border-gray-dark">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FiUsers size={32} />, stat: "10,000+", title: "Happy Clients", desc: "Trusted by executives and VIPs." },
              { icon: <FiAward size={32} />, stat: "500+", title: "Premium Vehicles", desc: "Nationwide meticulous fleet." },
              { icon: <FiClock size={32} />, stat: "24/7", title: "VIP Support", desc: "Always available concierge." },
              { icon: <FiShield size={32} />, stat: "99.9%", title: "Punctuality", desc: "On-time arrival guarantee." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8"
              >
                <div className="text-gold flex justify-center mb-6">{item.icon}</div>
                <div className="font-playfair text-4xl text-gold mb-2">{item.stat}</div>
                <div className="font-cormorant text-2xl text-white mb-2">{item.title}</div>
                <p className="font-dm text-white/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl lg:text-5xl text-gold mb-4">Leadership Team</h2>
            <p className="font-dm text-white/70 max-w-2xl mx-auto">The visionaries dedicated to elevating your transit experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="dark" hoverEffect className="group text-center">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 border-2 border-transparent group-hover:border-gold transition-colors">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="font-cormorant text-2xl text-gold mb-1">{member.name}</h3>
                  <p className="font-dm text-white/70 text-sm mb-4 tracking-wide">{member.role}</p>
                  <p className="font-dm text-white/50 text-sm mb-6 px-4">{member.bio}</p>
                  <div className="flex justify-center gap-4 text-white/40">
                    <a href="#" className="hover:text-gold transition-colors"><FiLinkedin size={20} /></a>
                    <a href="#" className="hover:text-gold transition-colors"><FiMail size={20} /></a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
