"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { FiCheckCircle, FiPhone, FiMail, FiMessageCircle, FiMapPin, FiGlobe, FiClock, FiInstagram, FiFacebook, FiYoutube, FiLinkedin, FiTwitter, FiArrowRight, FiAward, FiShield, FiSend } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa6';
import PageHero from '@/components/ui/PageHero';
import { generateContactWhatsAppLink } from '@/utils/whatsapp';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, string | undefined> | null>(null);
  const { t } = useLanguage();

  const onSubmit = async (data: Record<string, string | undefined>) => {
    setFormData(data);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setIsSubmitted(true);
      window.open(generateContactWhatsAppLink(data), '_blank');
    } catch (err) {
      console.error('Failed to send message:', err);
      setIsSubmitted(true);
    }
  };

  const contactDetails = [
    { 
      label: t('contact.callDirectly'), 
      value: "+1 (800) 123-4567", 
      icon: <FiPhone size={16} />, 
      color: "gold",
      bgClass: "bg-gold/10 text-gold"
    },
    { 
      label: t('contact.whatsapp'), 
      value: "+1 (800) 123-4567", 
      icon: <FiMessageCircle size={16} />, 
      color: "green",
      bgClass: "bg-green-500/10 text-green-500"
    },
    { 
      label: t('contact.email'), 
      value: "info@usalimosservice.com", 
      icon: <FiMail size={16} />, 
      color: "gold",
      bgClass: "bg-gold/10 text-gold"
    },
    { 
      label: t('contact.website'), 
      value: "www.usalimosservice.com", 
      icon: <FiGlobe size={16} />, 
      color: "gold",
      bgClass: "bg-gold/10 text-gold"
    },
    { 
      label: t('contact.serviceAreas'), 
      value: "CA • NJ • Chicago • FL • TX • Atlanta", 
      icon: <FiMapPin size={16} />, 
      color: "gold",
      bgClass: "bg-gold/10 text-gold"
    },
    { 
      label: t('contact.hours'), 
      value: "24 Hours / 7 Days a Week", 
      icon: <FiClock size={16} />, 
      color: "gold",
      bgClass: "bg-gold/10 text-gold"
    },
  ];

  return (
    <div className="bg-primary-dark">
      {/* Hero */}
      <PageHero
        title={t('nav.contact')}
        subtitle={t('hero.subtitle')}
        image="/Assets/Herosection2.jpg"
        breadcrumb={t('about.breadcrumb')}
      />

      {/* Main Content */}
      <section className="py-24 bg-[#0c1015]">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left Column: Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-2/3"
            >
              <div className="bg-[#151a21] p-8 md:p-14 rounded-3xl shadow-2xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-gold/10 transition-colors duration-500"></div>

                <div className="mb-12 relative z-10">
                  <h2 className="font-playfair text-3xl md:text-4xl text-gold mb-3 group-hover:text-gold-light transition-colors duration-500">{t('contact.sendMessage')}</h2>
                  <p className="font-dm text-white/30 text-sm leading-relaxed">{t('contact.formSubtitle')}</p>
                </div>
                
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <FiCheckCircle size={64} className="text-gold mx-auto mb-8 shadow-glow-gold rounded-full" />
                    <h3 className="font-playfair text-3xl text-white/90 mb-4">{t('contact.messageTransmitted')}</h3>
                    <p className="font-dm text-white/50 mb-10 max-w-sm mx-auto leading-relaxed">Thank you, <span className="text-gold font-bold">{formData?.name}</span>. Our concierge team has received your inquiry and will reach out shortly.</p>
                    
                    <div className="flex flex-col gap-4 max-w-xs mx-auto">
                      <Button 
                        className="w-full !py-4 shadow-glow group"
                        onClick={() => window.open(generateContactWhatsAppLink(formData as Record<string, string>), '_blank')}
                      >
                        {t('contact.connectWhatsApp')} <FiMessageCircle className="ml-2 group-hover:scale-110 transition-transform" />
                      </Button>
                      <Button 
                        variant="secondary"
                        className="w-full !py-4 border-white/10"
                        onClick={() => setIsSubmitted(false)}
                      >
                        {t('contact.sendAnother')}
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input 
                        label="FULL NAME *" 
                        placeholder="John Smith" 
                        {...register('name', { required: 'Name is required' })} 
                        error={errors.name?.message as string} 
                        className="!bg-[#1c2229] !border-none !h-14 font-dm"
                      />
                      <Input 
                        label="EMAIL ADDRESS *" 
                        type="email" 
                        placeholder="john@email.com" 
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                        })} 
                        error={errors.email?.message as string} 
                        className="!bg-[#1c2229] !border-none !h-14 font-dm"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input 
                        label="PHONE NUMBER" 
                        type="tel" 
                        placeholder="+1 (555) 000-0000" 
                        {...register('phone')} 
                        className="!bg-[#1c2229] !border-none !h-14 font-dm"
                      />
                      <div className="flex flex-col">
                        <label className="text-[11px] font-dm font-bold text-gold/80 mb-2 uppercase tracking-widest">SERVICE TYPE</label>
                        <select 
                          {...register('service')}
                          className="w-full h-14 bg-[#1c2229] border border-white/5 rounded-xl px-4 text-white/90 font-dm text-sm outline-none focus:ring-1 focus:ring-gold/30 hover:border-gold/10 transition-all"
                        >
                          <option value="">Select Service</option>
                          <option value="Airport">Airport Transfer</option>
                          <option value="Wedding">Wedding Limousine</option>
                          <option value="Corporate">Corporate Travel</option>
                          <option value="Event">Event & Party</option>
                        </select>
                      </div>
                    </div>
                    <TextArea 
                      label="MESSAGE *" 
                      placeholder="Tell us about your transportation needs, preferred dates, or any special requests..." 
                      {...register('message', { required: 'Message is required' })} 
                      error={errors.message?.message as string} 
                      className="!bg-[#1c2229] !border-none !h-32 font-dm"
                    />

                    {/* reCAPTCHA Placeholder */}
                    <div className="flex items-center gap-3 bg-[#1c2229] p-4 rounded-xl border border-white/10 w-fit group cursor-pointer hover:border-gold/20 transition-all">
                      <input 
                        type="checkbox" 
                        id="recaptcha"
                        className="w-5 h-5 rounded border-white/10 bg-primary-dark checked:bg-gold accent-gold cursor-pointer"
                        required
                      />
                      <label htmlFor="recaptcha" className="text-xs font-dm text-white/30 cursor-pointer group-hover:text-white/60 transition-colors">
                        {t('contact.notARobot')}
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      className="!bg-gold !text-primary-dark !h-16 !px-16 rounded-xl text-lg font-bold uppercase tracking-[0.1em] mt-4 hover:!bg-gold-light transition-all flex items-center justify-center gap-4 border-none shadow-glow-gold active:scale-95"
                    >
                      <span>{t('contact.sendMessage')}</span>
                      <FiSend className="text-xl" />
                    </Button>
                  </form>
                )}
              </div>

              {/* Added "Why choose us" section below the form to fill empty space */}
              <div className="mt-16 px-4">
                <h3 className="font-playfair text-2xl text-gold mb-8">{t('whyChooseUs.title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { icon: <FiAward size={24} />, title: t('whyChooseUs.drivers'), desc: t('whyChooseUs.driversDesc') },
                    { icon: <FiClock size={24} />, title: t('whyChooseUs.punctuality'), desc: t('whyChooseUs.punctualityDesc') },
                    { icon: <FiShield size={24} />, title: t('whyChooseUs.support'), desc: t('whyChooseUs.supportDesc') },
                    { icon: <FiGlobe size={24} />, title: t('whyChooseUs.fleet'), desc: t('whyChooseUs.fleetDesc') }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="shrink-0 text-gold mt-1 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-playfair text-white text-lg mb-1">{item.title}</h4>
                        <p className="font-dm text-white/50 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/3"
            >
              <div className="mb-12">
                <p className="text-gold font-dm font-bold text-xs tracking-widest mb-3 uppercase">{t('contact.reachUs')}</p>
                <h2 className="font-playfair text-4xl md:text-5xl text-white mb-2 leading-tight">
                  {t('contact.alwaysAvailable').split(' ')[0]} <span className="text-gold italic">{t('contact.alwaysAvailable').split(' ')[1]}</span>
                </h2>
              </div>

              <div className="space-y-8 mb-16">
                {contactDetails.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className={`w-9 h-9 rounded-lg ${item.bgClass} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-dm font-bold text-gold/60 tracking-[0.15em] mb-0.5 uppercase">{item.label}</p>
                      <p className="text-white font-dm text-[13px] font-medium leading-tight">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Headquarters Card with Map */}
              <div className="bg-[#151a21] rounded-3xl overflow-hidden border border-white/5 shadow-2xl mb-12">
                <div className="h-48 w-full relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    title="Headquarters Location"
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src="https://maps.google.com/maps?q=7756%20Shorthorn%20Way,%20Fort%20Worth,%20Texas,%2076131&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="grayscale contrast-125 opacity-70"
                  ></iframe>
                  <div className="absolute inset-0 bg-primary-dark/20 pointer-events-none"></div>
                </div>
                <div className="p-8 text-center relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary-dark border border-gold rounded-xl flex items-center justify-center text-gold shadow-lg">
                    <FiMapPin size={20} />
                  </div>
                  <h3 className="font-playfair text-2xl text-gold mt-2 mb-1">{t('contact.hq')}</h3>
                  <p className="font-dm text-white/80 text-sm tracking-wide">{t('contact.city')}</p>
                </div>
              </div>

              <div>
                <p className="border-t border-white/10 pt-10 text-gold font-dm font-bold text-xs tracking-widest mb-6 uppercase">{t('contact.followUs')}</p>
                <div className="flex gap-5">
                  {[FiFacebook, FiInstagram, FiYoutube, FiLinkedin, FiTwitter, FaTiktok].map((Icon, i) => (
                    <a key={i} href="#" className="text-white/40 hover:text-gold transition-colors duration-300">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
