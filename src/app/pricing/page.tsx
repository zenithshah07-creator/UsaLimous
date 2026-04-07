"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FiCheck, FiPlus, FiMinus } from 'react-icons/fi';
import PageHero from '@/components/ui/PageHero';
import { useLanguage } from '@/context/LanguageContext';

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { t } = useLanguage();

  const pricingPackages = useMemo(() => {
    const pkgs = t('pricing.packages');
    if (!Array.isArray(pkgs)) return [];
    return pkgs.map((pkg, i) => ({
      ...pkg,
      popular: i === 1 // "Hourly Charter" is typically i=1
    }));
  }, [t]);

  const faqs = useMemo(() => {
    const f = t('pricing.faqs.questions');
    return Array.isArray(f) ? f : [];
  }, [t]);

  return (
    <div className="bg-primary-dark">
      {/* Hero */}
      <PageHero
        title={t('pricing.title')}
        subtitle={t('pricing.subtitle')}
        image="/Assets/Pricing.avif"
        breadcrumb={`Home / ${t('pricing.title')}`}
      />

      {/* Pricing Cards */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Assets/Pricing.avif')] opacity-5 bg-cover bg-center bg-fixed"></div>
        <div className="container relative mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPackages.map((pkg: any, i: number) => (
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
                      {t('pricing.mostPopular')}
                    </div>
                  )}

                  <h3 className="font-playfair text-3xl text-gold mb-2">{pkg.title}</h3>
                  <div className="mb-6 border-b border-gray-dark pb-6">
                    <span className="font-dm text-4xl font-bold text-white">{pkg.price}</span>
                    <span className="font-dm text-white/50 text-sm block mt-2">{pkg.subtitle}</span>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {pkg.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start font-dm text-white/80 text-sm">
                        <FiCheck className="text-gold mt-1 mr-3 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={pkg.popular ? 'primary' : 'secondary'}
                    className="w-full mt-auto"
                    onClick={() => window.location.href = '/booking'}
                  >
                    {t('pricing.selectPlan')}
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
            <h2 className="font-playfair text-4xl text-gold mb-4">{t('pricing.faqs.title')}</h2>
            <p className="font-dm text-white/70">{t('pricing.faqs.subtitle')}</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq: any, i: number) => (
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
            <p className="font-dm text-white/60 mb-6">{t('pricing.faqs.moreQuestions')}</p>
            <Button variant="secondary" onClick={() => window.location.href = '/contact'}>{t('pricing.faqs.contactSupport')}</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
