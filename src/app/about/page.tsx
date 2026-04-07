"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { FiAward, FiUsers, FiClock, FiShield, FiLinkedin, FiMail } from 'react-icons/fi';
import PageHero from '@/components/ui/PageHero';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { icon: <FiUsers size={32} />, stat: "10,000+", title: t('about.stats.clients'), desc: t('about.stats.clientsDesc') },
    { icon: <FiAward size={32} />, stat: "500+", title: t('about.stats.fleet'), desc: t('about.stats.fleetDesc') },
    { icon: <FiClock size={32} />, stat: "24/7", title: t('about.stats.support'), desc: t('about.stats.supportDesc') },
    { icon: <FiShield size={32} />, stat: "99.9%", title: t('about.stats.punctuality'), desc: t('about.stats.punctualityDesc') }
  ];

  const team = (t('about.team') as unknown as any[]) || []; // Type assertion for translation array

  return (
    <div className="bg-primary-dark">
      {/* Hero */}
      <PageHero
        title={t('about.title')}
        breadcrumb={t('about.breadcrumb')}
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
              <h2 className="font-playfair text-4xl lg:text-5xl text-gold mb-6">{t('about.legacyTitle')}</h2>
              <p className="font-dm text-white/70 leading-relaxed text-lg">
                {t('about.legacy1')}
              </p>
              <p className="font-dm text-white/70 leading-relaxed text-lg">
                <span className="text-gold font-semibold">{t('about.legacy2')}</span>
              </p>
              <p className="font-dm text-white/70 leading-relaxed text-lg">
                {t('about.legacy3')}
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
                <Image src="/Assets/Costumer trust.webp" alt="Luxury Fleet" width={800} height={600} className="rounded-lg relative z-10 shadow-heavy w-full h-auto" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us Stats */}
      <section className="py-24 bg-gray-charcoal border-y border-gray-dark">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((item, i) => (
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
                <div className="font-cormorant text-2xl text-white/90 mb-2">{item.title}</div>
                <p className="font-dm text-white/50 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl lg:text-5xl text-gold mb-4">{t('about.teamTitle')}</h2>
            <p className="font-dm text-white/60 max-w-2xl mx-auto">{t('about.teamSubtitle')}</p>
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
                    <Image src={`/Assets/Herosection${i+1}.jpg`} alt={member.name} width={160} height={160} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="font-cormorant text-2xl text-gold mb-1">{member.name}</h3>
                  <p className="font-dm text-white/60 text-sm mb-4 tracking-wide">{member.role}</p>
                  <p className="font-dm text-white/40 text-sm mb-6 px-4">{member.bio}</p>
                  <div className="flex justify-center gap-4 text-white/30">
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
