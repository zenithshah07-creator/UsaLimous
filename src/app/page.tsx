"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { services, fleet, testimonials } from '@/data/mockData';
import { FiCheckCircle, FiStar } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TABS = ['One Way', 'Round Trip', 'By the Hour'];

const BookingWidget = () => {
  const [activeTab, setActiveTab] = useState(0);
  const baseInputClass = "w-full h-14 bg-[#2d333b] border border-transparent focus:border-[#e02d2d]/30 rounded-2xl px-6 text-white placeholder-white/30 text-sm transition-all outline-none font-dm";

  return (
    <div className="max-w-4xl mx-auto bg-[#1b2129]/95 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-2xl border border-white/10 shadow-black/50 text-left">
      <div className="flex flex-wrap gap-3 mb-8">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all font-dm ${
              activeTab === i
                ? 'bg-[#e02d2d] text-white shadow-lg shadow-red-900/20'
                : 'text-white/60 border border-white/10 hover:border-white/30 hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

      <button className="w-full h-14 bg-[#e02d2d] text-white font-bold rounded-2xl hover:bg-red-700 transition-all transform active:scale-[0.98] shadow-lg shadow-red-900/40 mt-2 flex items-center justify-center gap-2 group font-dm">
        Search Available Rides <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
      <p className="text-[10px] text-white/20 mt-4 font-medium tracking-wide font-dm text-center">
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
      <div className="text-3xl font-bold text-[#eab308] mb-1 font-dm">{value}</div>
      <div className="text-xs uppercase tracking-widest text-white/40 font-semibold font-dm">{label}</div>
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
    <>
  {/* 1. HERO SECTION */}
  <section className="relative min-h-screen flex items-center justify-center pt-8 pb-16 overflow-hidden bg-[#0c1015]">

  {/* Background Slider */}
  <div className="absolute inset-0 z-0">
    <AnimatePresence mode="wait">
      <motion.img
        key={currentImageIndex}
        src={HERO_IMAGES[currentImageIndex]}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.5, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full object-cover"
        alt={`Luxury Car Background ${currentImageIndex + 1}`}
      />
    </AnimatePresence>
    
    {/* Cinematic Overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.85))]" />
  </div>

  {/* Content */}
  <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">

    {/* Badge */}
    <div className="inline-flex items-center gap-2 bg-[#d4af37]/10 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] px-2 py-2 rounded-full text-xs font-semibold tracking-[0.25em] mb-6 uppercase">
      ✦ PREMIUM CHAUFFEUR SERVICE ✦
    </div>

    {/* Heading */}
    <h1 className="font-playfair text-[40px] sm:text-[52px] md:text-[70px] lg:text-[78px] font-weight:200 text-white leading-[1.1] tracking-tight max-w-4xl mx-auto">
      Ride in Style.
      <br />
      <span className="text-white/90">Arrive in Class.</span>
    </h1>

    {/* Subtext */}
    <p className="font-dm text-base md:text-lg text-white/70 mt-6 max-w-2xl mx-auto leading-relaxed">
      Professional limo service for airport transfers, corporate travel, and special events.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">

      <button className="bg-[#e02d2d] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-red-600 transition-all shadow-lg shadow-red-900/30">
        Book Your Ride
      </button>

      <button className="border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
        View Our Fleet
      </button>

    </div>

    {/* Stats */}
    <div className="flex flex-wrap justify-center gap-10 mt-12">
      <StatCounter target={500} suffix="+" label="Happy Clients" />
      <StatCounter target={50} suffix="+" label="Cities Covered" />
      <StatCounter target={10} suffix="+" label="Years Experience" />
      <StatCounter target={49} suffix="★" label="Rating" />
    </div>

    {/* Booking */}
    <div className="mt-14">
      <BookingWidget />
    </div>

  </div>
</section>

      {/* 2. FEATURED SERVICES */}
      <section className="py-24 bg-primary-dark">
        <div className="container mx-auto px-4 lg:px-10">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemFadeUp} className="font-playfair text-4xl md:text-5xl text-gold mb-4">Our Premium Services</motion.h2>
            <motion.p variants={itemFadeUp} className="font-dm text-gray-400 max-w-2xl mx-auto">Tailored transportation solutions designed to meet the highest standards of luxury and reliability.</motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={itemFadeUp}>
                <Card variant="gold-accent-left" className="h-full flex flex-col group cursor-pointer" hoverEffect>
                  <div className="text-4xl text-gold mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                  <h3 className="font-cormorant text-2xl font-semibold text-gold mb-3">{service.name}</h3>
                  <p className="font-dm text-white text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>
                  <Link href={`/services#${service.id}`} className="font-dm text-gold font-semibold text-sm group-hover:text-gold-light transition-colors inline-block relative overflow-hidden">
                    Learn More &rarr;
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-light -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-24 bg-gray-charcoal">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <img 
                src="https://images.unsplash.com/photo-1563214545-c81bc638ef1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Chauffeur Service" 
                className="w-full rounded-lg shadow-deep object-cover h-[500px]"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-gold mb-6">Experience the Difference</h2>
              <p className="font-dm text-white/80 mb-8 leading-relaxed text-lg">
                With over a decade of redefining luxury travel, we guarantee excellence in every mile. Our commitment to perfection makes us the preferred choice for discerning clients.
              </p>
              
              <ul className="space-y-4 mb-10">
                {['24/7 Professional Chauffeur Service', 'Meticulously Maintained Premium Fleet', 'Certified & Discreet Drivers', 'Competitive & Transparent Pricing'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex items-center text-white font-dm text-lg"
                  >
                    <FiCheckCircle className="text-gold mr-4 flex-shrink-0" size={24} />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <Button onClick={() => window.location.href='/about'}>Read Our Story</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. FLEET PREVIEW */}
      <section className="py-24 bg-primary-dark">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="flex justify-between items-end mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-gold mb-4">Our Signature Fleet</h2>
              <p className="font-dm text-gray-400">Step into unparalleled comfort and prestige.</p>
            </motion.div>
            <Link href="/fleet" className="hidden md:inline-block text-gold hover:text-gold-light font-dm font-semibold transition-colors border-b border-gold-light pb-1">
              View All Vehicles
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              pagination={{ clickable: true }}
              navigation
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="pb-16 fleet-swiper"
            >
              {fleet.map((vehicle) => (
                <SwiperSlide key={vehicle.id}>
                  <Card variant="dark" hoverEffect className="p-0 overflow-hidden h-full flex flex-col group my-4 mx-2">
                    <div className="h-56 overflow-hidden relative">
                      <div className="absolute inset-0 bg-primary-dark/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="font-cormorant text-2xl font-bold text-gold mb-1">{vehicle.name}</h3>
                      <span className="inline-block bg-[rgba(212,175,55,0.1)] text-gold border border-gold px-2 py-1 text-xs font-dm rounded mb-4 w-max">
                        {vehicle.category}
                      </span>
                      <ul className="mb-6 space-y-2 font-dm text-sm text-white/70 flex-grow">
                        <li>• Seating: {vehicle.seating} Passengers</li>
                        <li>• Includes: {vehicle.features.slice(0, 2).join(', ')}</li>
                      </ul>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-dm text-lg text-gold font-semibold">{vehicle.priceHourly} / hr</span>
                        <Button variant="secondary" className="!py-2 !px-4 text-sm" onClick={() => window.location.href=`/fleet#${vehicle.id}`}>Details</Button>
                      </div>
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
          <div className="text-center mt-8 md:hidden">
            <Button variant="secondary" onClick={() => window.location.href='/fleet'} className="w-full">View All Vehicles</Button>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 bg-gray-charcoal">
        <div className="container mx-auto px-4 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl text-gold mb-4">Client Testimonials</h2>
            <p className="font-dm text-white/70">Don&apos;t just take our word for it—hear from our esteemed clientele.</p>
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
            className="pb-16"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <Card variant="dark" className="p-8 text-left bg-primary-dark">
                  <div className="flex text-gold mb-6">
                    {[1,2,3,4,5].map((star) => <FiStar key={star} fill="currentColor" /> )}
                  </div>
                  <p className="font-dm italic text-white/90 leading-relaxed mb-8">&quot;{t.text}&quot;</p>
                  <div className="flex items-center gap-4">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border border-gray-dark" />
                    <div>
                      <h4 className="font-cormorant text-xl font-bold text-gold">{t.name}</h4>
                      <p className="font-dm text-xs text-gray-400">{t.title}</p>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="py-24 relative overflow-hidden bg-primary-dark border-y border-gold/20">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?ixlib=rb-4.0.3)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}></div>
        <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl md:text-5xl text-gold mb-6"
          >
            Ready to Experience Luxury?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-dm text-xl text-white mb-10"
          >
            Book your limo in 3 easy steps and elevate your journey.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <Button className="!px-12 !py-5 text-lg" onClick={() => window.location.href='/booking'}>Book Now</Button>
            <div className="text-white/50 font-dm">
              or <a href="tel:+18005550199" className="text-gold font-bold hover:underline ml-2">+1 800-555-0199</a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
