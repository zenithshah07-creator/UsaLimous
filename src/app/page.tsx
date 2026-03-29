"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { services, fleet, testimonials } from '@/data/mockData';
import { FiCheckCircle, FiStar, FiClock, FiUsers, FiAward } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TABS = ['One Way', 'Round Trip', 'By the Hour'];

const BookingWidget = () => {
  const [activeTab, setActiveTab] = useState(0);
  const baseInputClass = "w-full h-11 bg-[#2d333b] border border-transparent focus:border-[#d4af37]/30 rounded-xl px-4 text-white placeholder-white/30 text-xs transition-all outline-none font-dm";

  return (
    <div className="max-w-2xl mx-auto bg-[#1b2129]/95 backdrop-blur-xl rounded-2xl p-5 md:p-6 shadow-2xl border border-white/10 shadow-black/50 text-left">
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all font-dm ${
              activeTab === i
                ? 'bg-gold text-primary-dark shadow-lg shadow-gold/20'
                : 'text-white/60 border border-white/10 hover:border-white/30 hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          <input className={baseInputClass} type="text" placeholder="Pickup — City, Airport, Hotel..." />
          <input className={baseInputClass} type="text" placeholder="Drop-off Location" />
          <input className={baseInputClass} type="date" style={{ colorScheme: 'dark' }} />
          <input className={baseInputClass} type="time" style={{ colorScheme: 'dark' }} />
          <select className={`${baseInputClass} appearance-none cursor-pointer`} defaultValue="">
            <option value="" disabled className="text-gray-400">Passengers</option>
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-[#2d333b] text-white">{n}</option>)}
          </select>
          <select className={`${baseInputClass} appearance-none cursor-pointer`} defaultValue="">
            <option value="" disabled className="text-gray-400">Vehicle Type</option>
            <option value="Executive Sedan" className="bg-[#2d333b] text-white">Executive Sedan</option>
            <option value="Luxury SUV" className="bg-[#2d333b] text-white">Luxury SUV</option>
            <option value="Stretch Limo" className="bg-[#2d333b] text-white">Stretch Limo</option>
            <option value="Sprinter Van" className="bg-[#2d333b] text-white">Sprinter Van</option>
          </select>
        </div>
      )}

      {activeTab === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          <input className={baseInputClass} type="text" placeholder="Pickup — City, Airport, Hotel..." />
          <input className={baseInputClass} type="text" placeholder="Drop-off Location" />
          <input className={baseInputClass} type="text" placeholder="Departure Date" />
          <input className={baseInputClass} type="text" placeholder="Return Date" />
          <select className={`${baseInputClass} appearance-none cursor-pointer`} defaultValue="">
            <option value="" disabled className="text-gray-400">Passengers</option>
            {[1,2,3,4,5,6].map(n => <option key={n} value={n} className="bg-[#2d333b] text-white">{n}</option>)}
          </select>
          <select className={`${baseInputClass} appearance-none cursor-pointer`} defaultValue="">
            <option value="" disabled className="text-gray-400">Vehicle Type</option>
            <option value="Executive Sedan" className="bg-[#2d333b] text-white">Executive Sedan</option>
            <option value="Luxury SUV" className="bg-[#2d333b] text-white">Luxury SUV</option>
            <option value="Stretch Limo" className="bg-[#2d333b] text-white">Stretch Limo</option>
          </select>
        </div>
      )}

      {activeTab === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          <input className={baseInputClass} type="text" placeholder="Pickup Location" />
          <input className={baseInputClass} type="date" style={{ colorScheme: 'dark' }} />
          <input className={baseInputClass} type="time" style={{ colorScheme: 'dark' }} />
          <select className={`${baseInputClass} appearance-none cursor-pointer`} defaultValue="">
            <option value="" disabled className="text-gray-400">Duration</option>
            {['2 hrs','4 hrs','6 hrs','8 hrs','10 hrs','12 hrs'].map(d => <option key={d} value={d} className="bg-[#2d333b] text-white">{d}</option>)}
          </select>
          <select className={`${baseInputClass} w-full md:col-span-2 appearance-none cursor-pointer`} defaultValue="">
            <option value="" disabled className="text-gray-400">Vehicle Type</option>
            <option value="Executive Sedan" className="bg-[#2d333b] text-white">Executive Sedan</option>
            <option value="Luxury SUV" className="bg-[#2d333b] text-white">Luxury SUV</option>
            <option value="Stretch Limo" className="bg-[#2d333b] text-white">Stretch Limo</option>
          </select>
        </div>
      )}

      <button className="w-full h-12 bg-gold text-primary-dark font-bold rounded-xl hover:bg-gold-light transition-all transform active:scale-[0.98] shadow-lg shadow-gold/40 mt-2 flex items-center justify-center gap-2 group font-dm text-sm">
        Search Available Rides <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
      <p className="text-[9px] text-white/20 mt-3 font-medium tracking-wide font-dm text-center">
        SECURE BOOKING • PROFESSIONAL CHAUFFEURS • NO HIDDEN FEES
      </p>
    </div>
  );
};

const StatCounter = ({ target, suffix, label }: { target: number, suffix: string, label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('0');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let n = 0;
        const step = target / 60;
        const iv = setInterval(() => {
          n = Math.min(n + step, target);
          setValue(
            target === 49
              ? (n / 10).toFixed(1) + suffix
              : Math.floor(n) + suffix
          );
          if (n >= target) clearInterval(iv);
        }, 25);
        observer.unobserve(el);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return (
    <div className="text-center" ref={ref}>
      <div className="text-2xl font-bold text-gold mb-1 font-dm">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold font-dm">{label}</div>
    </div>
  );
};

const HERO_IMAGES = [
  '/Assets/Herosection1.jpg',
  '/Assets/Herosection2.jpg',
  '/Assets/Herosection3.jpg',
  '/Assets/Herosection4.jpg',
  '/Assets/Herosection55.jpg',
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-primary-dark">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-8 pb-16 overflow-hidden bg-[#0c1015]">
        {/* Background images — CSS crossfade, always visible */}
        <div className="absolute inset-0 z-0">
          {HERO_IMAGES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Luxury background ${i + 1}`}
              fill
              priority={i === 0}
              className="object-cover transition-opacity duration-[1500ms] ease-in-out"
              style={{ opacity: i === currentImageIndex ? 1 : 0 }}
              sizes="100vw"
            />
          ))}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 bg-gold/15 backdrop-blur-md border border-gold/30 text-gold px-5 py-2 rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.3em] mb-8 uppercase"
          >
            {t('hero.badge')}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="font-playfair text-[40px] sm:text-[52px] md:text-[68px] lg:text-[76px] font-bold text-white leading-[1.08] tracking-tight mx-auto"
          >
            {(() => {
              const title = t('hero.title');
              const parts = title.split('USA');
              return parts.length > 1 ? (
                <>{parts[0]}<span className="text-gold italic">USA</span>{parts[1]}</>
              ) : title;
            })()}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="font-dm text-[15px] md:text-[17px] text-white/75 mt-7 max-w-xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9"
          >
            <Button 
              className="!rounded-full !px-12 !h-14 font-bold shadow-glow text-[15px] tracking-wide transform hover:scale-[1.03] active:scale-95 duration-200"
              onClick={() => window.location.href='/booking'}
            >
              {t('hero.bookRide')}
            </Button>
            <Button 
              variant="secondary"
              className="!rounded-full !px-12 !h-14 font-bold backdrop-blur-sm text-[15px] tracking-wide transform hover:scale-[1.03] active:scale-95 duration-200 !border-white/30 !text-white hover:!bg-white/10"
              onClick={() => window.location.href='/fleet'}
            >
              {t('hero.viewFleet')}
            </Button>
          </motion.div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 mt-14 lg:mt-20">
            <StatCounter target={500} suffix="+" label="Happy Clients" />
            <StatCounter target={50} suffix="+" label="Cities Covered" />
            <StatCounter target={10} suffix="+" label="Years Experience" />
            <StatCounter target={49} suffix="★" label="Rating" />
          </div>

          <div className="mt-14 hidden lg:block">
            <BookingWidget />
          </div>
        </div>
      </section>

      {/* 2. FEATURED SERVICES */}
      <section className="py-32 bg-primary-dark border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-10">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 variants={itemFadeUp} className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gold mb-6">Our Premium Services</motion.h2>
            <motion.p variants={itemFadeUp} className="font-dm text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">Tailored transportation solutions designed to meet the highest standards of luxury and reliability.</motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={itemFadeUp}>
                <Card variant="gold-accent-left" className="h-full flex flex-col group cursor-pointer p-8" hoverEffect>
                  <div className="text-4xl text-gold mb-6 group-hover:scale-110 transition-transform duration-300 transform-gpu">{service.icon}</div>
                  <h3 className="font-playfair text-2xl font-semibold text-white mb-4 group-hover:text-gold transition-colors">{service.name}</h3>
                  <p className="font-dm text-white/50 text-sm leading-relaxed mb-8 flex-grow">{service.description}</p>
                  <Link href={`/services#${service.id}`} className="font-dm text-gold font-semibold text-sm group-hover:text-gold-light transition-colors inline-block relative overflow-hidden w-max">
                    Learn More &rarr;
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-light -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="py-32 bg-gray-charcoal relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
        <div className="container mx-auto px-4 lg:px-10">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gold mb-6"
            >
              {t('whyChooseUs.title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-dm text-white/60 max-w-2xl mx-auto text-lg"
            >
              {t('whyChooseUs.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FiClock size={32} />, title: t('whyChooseUs.support'), desc: t('whyChooseUs.supportDesc') },
              { icon: <FiUsers size={32} />, title: t('whyChooseUs.drivers'), desc: t('whyChooseUs.driversDesc') },
              { icon: <FiCheckCircle size={32} />, title: t('whyChooseUs.punctuality'), desc: t('whyChooseUs.punctualityDesc') },
              { icon: <FiAward size={32} />, title: t('whyChooseUs.fleet'), desc: t('whyChooseUs.fleetDesc') }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-primary-dark/50 backdrop-blur-sm p-10 rounded-2xl border border-white/5 hover:border-gold/30 transition-all group hover:-translate-y-2 duration-500"
              >
                <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500 bg-gold/10 w-16 h-16 flex items-center justify-center rounded-full">
                  {item.icon}
                </div>
                <h3 className="font-playfair text-2xl text-white mb-4 group-hover:text-gold transition-colors">{item.title}</h3>
                <p className="font-dm text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FLEET PREVIEW */}
      <section className="py-32 bg-primary-dark">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="flex justify-between items-end mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gold mb-6">{t('fleet.title')}</h2>
              <p className="font-dm text-gray-400 text-lg">{t('fleet.subtitle')}</p>
            </motion.div>
            <Link href="/fleet" className="hidden md:inline-block text-gold hover:text-gold-light font-dm font-semibold transition-colors border-b border-gold-light pb-1 text-lg">
              View All Vehicles
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              pagination={{ clickable: true }}
              navigation
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="pb-20 fleet-swiper"
            >
              {fleet.map((vehicle) => (
                <SwiperSlide key={vehicle.id}>
                  <Card variant="dark" hoverEffect className="p-0 overflow-hidden h-full flex flex-col group border border-white/5 hover:border-gold/20 transition-all duration-500 rounded-2xl">
                    <div className="h-64 overflow-hidden relative">
                      <div className="absolute inset-0 bg-primary-dark/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                      <Image 
                        src={vehicle.image} 
                        alt={vehicle.name} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 z-20">
                         <span className="bg-gold text-primary-dark px-3 py-1 rounded-full text-xs font-bold shadow-glow">
                           {vehicle.category}
                         </span>
                      </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <h3 className="font-playfair text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{vehicle.name}</h3>
                      <div className="flex items-center gap-4 text-white/50 text-sm mb-6 font-dm">
                        <span className="flex items-center gap-1.5"><FiUsers className="text-gold" /> {vehicle.seating} Guests</span>
                      </div>
                      <p className="text-white/40 text-sm mb-8 font-dm leading-relaxed">
                        {vehicle.features.slice(0, 3).join(' • ')}
                      </p>
                      <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-6">
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">{t('fleet.price')}</p>
                          <span className="font-dm text-xl text-gold font-bold">{vehicle.priceHourly}</span>
                        </div>
                        <Button variant="primary" className="!py-2.5 !px-6 text-sm shadow-glow" onClick={() => window.location.href=`/booking?vehicle=${vehicle.id}`}>
                          {t('fleet.bookNow')}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
          <div className="text-center mt-10 md:hidden">
            <Button variant="secondary" onClick={() => window.location.href='/fleet'} className="w-full h-14">View All Vehicles</Button>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-32 bg-gray-charcoal relative">
        <div className="container mx-auto px-4 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gold mb-6">Client Testimonials</h2>
            <p className="font-dm text-white/60 text-lg max-w-2xl mx-auto">Don&apos;t just take our word for it—hear from our esteemed clientele.</p>
          </motion.div>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000 }}
            className="pb-20"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <Card variant="dark" className="p-10 text-left bg-primary-dark border border-white/5 hover:border-gold/20 h-full transition-all duration-500 rounded-2xl">
                  <div className="flex text-gold mb-8">
                    {[1,2,3,4,5].map((star) => <FiStar key={star} fill="currentColor" /> )}
                  </div>
                  <p className="font-dm italic text-white/90 text-lg leading-relaxed mb-10">&quot;{t.text}&quot;</p>
                  <div className="flex items-center gap-5 mt-auto">
                    <div className="relative w-14 h-14 shrink-0">
                      <Image src={t.image} alt={t.name} fill sizes="56px" className="rounded-full border-2 border-gold/20 p-0.5 object-cover" />
                    </div>
                    <div>
                      <h4 className="font-playfair text-xl font-bold text-white">{t.name}</h4>
                      <p className="font-dm text-xs text-gold/60 uppercase tracking-widest">{t.title}</p>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-40 relative overflow-hidden bg-primary-dark border-y border-gold/10">
        <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: "url('/Assets/Herosection2.jpg')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}></div>
        <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl md:text-6xl text-gold mb-8"
          >
            Ready to Experience Luxury?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-dm text-xl text-white/70 mb-12 max-w-2xl"
          >
            Book your limo in 3 easy steps and elevate your journey.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-8 items-center"
          >
            <Button className="!px-16 !py-6 text-xl shadow-glow" onClick={() => window.location.href='/booking'}>Book Now</Button>
            <div className="text-white/40 font-dm text-lg">
              or <a href="tel:+18005550199" className="text-gold font-bold hover:underline ml-2 transition-all">+1 800-555-0199</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
