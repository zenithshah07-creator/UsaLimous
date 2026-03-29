"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { fleet } from '@/data/mockData';
import { FiCheckCircle, FiArrowRight, FiArrowLeft, FiMapPin, FiCalendar, FiClock, FiUsers, FiInfo, FiMessageCircle } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import { generateBookingWhatsAppLink } from '@/utils/whatsapp';
import Image from 'next/image';

interface BookingFormData {
  tripType: string;
  vehicle: string;
  passengers: number;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  requests?: string;
  terms: boolean;
}

export default function Booking() {
  const [step, setStep] = useState(1);
  const { t } = useLanguage();
  const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm<BookingFormData>({
    defaultValues: {
      passengers: 1,
      tripType: 'airport'
    }
  });
  const tripType = watch('tripType', 'airport');
  const selectedVehicleId = watch('vehicle');
  const passengers = watch('passengers', 1);

  const selectedVehicle = useMemo(() => {
    return fleet.find(v => v.id === selectedVehicleId);
  }, [selectedVehicleId]);

  const estimatedPrice = useMemo(() => {
    if (!selectedVehicle) return 0;
    
    // Simple mock logic for price estimation
    let basePrice = parseFloat(selectedVehicle.priceTrip.replace('$', '')) || 150;
    if (tripType === 'hourly') {
      basePrice = parseFloat(selectedVehicle.priceHourly.replace('$', '')) * 3; // Assume 3 hours min
    } else if (tripType === 'roundTrip') {
      basePrice *= 1.8;
    }
    
    return Math.round(basePrice);
  }, [selectedVehicle, tripType]);

  const [submittedData, setSubmittedData] = useState<any>(null);

  const onSubmit = async (data: BookingFormData) => {
    if (step < 4) {
      nextStep();
      return;
    }

    const fullData = {
      ...data,
      estimatedPrice,
      vehicleName: selectedVehicle?.name || 'Standard Luxury Vehicle'
    };
    setSubmittedData(fullData);
    
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullData),
      });
      setStep(5);
    } catch (err) {
      console.error('Failed to submit booking:', err);
      // Still show success to user
      setStep(5);
    }
  };

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) isValid = await trigger(['pickup', 'dropoff', 'date', 'time', 'passengers']);
    if (step === 2) isValid = await trigger(['vehicle']);
    if (step === 3) isValid = await trigger(['name', 'email', 'phone', 'terms']);
    if (isValid) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-primary-dark min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-light/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold font-bold tracking-[0.3em] text-[10px] mb-4 uppercase"
          >
            ✦ {t('nav.bookNow')} ✦
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6"
          >
            {t('booking.title')}
          </motion.h1>
          <p className="font-dm text-white/50 text-lg max-w-2xl mx-auto">{t('booking.subtitle')}</p>
        </div>

        {/* Progress Stepper */}
        {step < 5 && (
          <div className="mb-16 max-w-3xl mx-auto">
            <div className="flex justify-between relative">
              <div className="absolute top-4 left-0 w-full h-[1px] bg-white/10 z-0"></div>
              <div 
                className="absolute top-4 left-0 h-[1px] bg-gold z-0 transition-all duration-700 ease-in-out" 
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
              
              {[t('booking.steps.trip'), t('booking.steps.vehicle'), t('booking.steps.details'), t('booking.steps.review')].map((label, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center group">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-dm text-xs transition-all duration-500 border ${step > i + 1 ? 'bg-gold border-gold text-primary-dark shadow-glow' : step === i + 1 ? 'bg-primary-dark border-gold text-gold shadow-glow-strong scale-110' : 'bg-primary-dark border-white/20 text-white/30'}`}>
                    {step > i + 1 ? <FiCheckCircle size={16} /> : i + 1}
                  </div>
                  <span className={`absolute top-12 font-dm text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-colors duration-500 ${step >= i + 1 ? 'text-gold' : 'text-white/20'}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2">
            <div className="bg-[#161b22]/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-deep border border-white/5 min-h-[500px]">
              
              <form id="booking-form" onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {/* STEP 1: TRIP */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                          <FiMapPin size={24} />
                        </div>
                        <div>
                          <h2 className="font-playfair text-2xl text-white">Journey Selection</h2>
                          <p className="font-dm text-white/40 text-sm">Where and when would you like to travel?</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="font-dm text-xs font-bold text-gold/80 uppercase tracking-widest ml-1">Service Type</label>
                          <div className="relative">
                            <select 
                              className="w-full bg-primary-dark/50 text-white font-dm text-sm px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-gold/50 appearance-none cursor-pointer transition-all"
                              {...register('tripType')}
                            >
                              <option value="airport">Airport Transfer</option>
                              <option value="hourly">Hourly Charter</option>
                              <option value="wedding">Wedding Limo</option>
                              <option value="corporate">Corporate Event</option>
                              <option value="pointToPoint">Point to Point</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gold/50 pointer-events-none text-xs">▼</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="font-dm text-xs font-bold text-gold/80 uppercase tracking-widest ml-1">Passengers</label>
                          <div className="relative">
                            <input 
                              type="number" 
                              min="1"
                              max="14"
                              className={`w-full bg-primary-dark/50 text-white font-dm text-sm px-5 py-4 rounded-xl border ${errors.passengers ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-gold/50 transition-all font-bold placeholder:font-normal`}
                              placeholder="1"
                              {...register('passengers', { required: 'Passengers required', min: {value: 1, message: 'Min 1'}, valueAsNumber: true })}
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gold/50 pointer-events-none">
                              <FiUsers size={16} />
                            </div>
                          </div>
                          {errors.passengers && <p className="text-red-400 text-[10px] mt-1 font-bold">{errors.passengers.message as string}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="font-dm text-xs font-bold text-gold/80 uppercase tracking-widest ml-1">Pickup Address</label>
                           <div className="relative">
                             <input 
                               className="w-full bg-primary-dark/50 text-white font-dm text-sm px-5 py-4 pr-12 rounded-xl border border-white/10 focus:outline-none focus:border-gold/50 transition-all"
                               placeholder="Street, City, or Airport"
                               {...register('pickup', { required: t('booking.steps.trip') + ' is required' })}
                             />
                             <FiMapPin className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20" />
                           </div>
                           {errors.pickup && <p className="text-red-400 text-[10px] mt-1 font-bold">{errors.pickup.message as string}</p>}
                        </div>

                         <div className="space-y-2">
                           <label className="font-dm text-xs font-bold text-gold/80 uppercase tracking-widest ml-1">{tripType === 'hourly' ? 'Duration' : 'Drop-off Address'}</label>
                           <div className="relative">
                              {tripType === 'hourly' ? (
                                <select className="w-full bg-primary-dark/50 text-white font-dm text-sm px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-gold/50 appearance-none cursor-pointer transition-all">
                                  {['2 Hours', '4 Hours', '6 Hours', '8 Hours', 'Full Day'].map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                              ) : (
                                <input 
                                  className={`w-full bg-primary-dark/50 text-white font-dm text-sm px-5 py-4 pr-12 rounded-xl border ${errors.dropoff ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-gold/50 transition-all`}
                                  placeholder="Destination"
                                  {...register('dropoff', { required: tripType !== 'hourly' ? 'Drop-off is required' : false })}
                                />
                              )}
                             <FiMapPin className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20" />
                           </div>
                           {errors.dropoff && <p className="text-red-400 text-[10px] mt-1 font-bold">{errors.dropoff.message as string}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="font-dm text-xs font-bold text-gold/80 uppercase tracking-widest ml-1">Pickup Date</label>
                           <div className="relative">
                             <input 
                               type="date"
                               className={`w-full bg-primary-dark/50 text-white font-dm text-sm px-5 py-4 rounded-xl border ${errors.date ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-gold/50 transition-all dark-calendar-inverse appearance-none`}
                               {...register('date', { required: 'Date is required' })}
                             />
                           </div>
                           {errors.date && <p className="text-red-400 text-[10px] mt-1 font-bold">{errors.date.message as string}</p>}
                        </div>
                         <div className="space-y-2">
                           <label className="font-dm text-xs font-bold text-gold/80 uppercase tracking-widest ml-1">Pickup Time</label>
                           <div className="relative">
                             <input 
                               type="time"
                               className={`w-full bg-primary-dark/50 text-white font-dm text-sm px-5 py-4 rounded-xl border ${errors.time ? 'border-red-500' : 'border-white/10'} focus:outline-none focus:border-gold/50 transition-all appearance-none`}
                               {...register('time', { required: 'Time is required' })}
                             />
                           </div>
                           {errors.time && <p className="text-red-400 text-[10px] mt-1 font-bold">{errors.time.message as string}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: VEHICLE */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                          <FiCheckCircle size={24} />
                        </div>
                        <div>
                          <h2 className="font-playfair text-2xl text-white">Vehicle Selection</h2>
                          <p className="font-dm text-white/40 text-sm">Select the perfect ride for your party of {passengers}.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {fleet.filter(v => v.seating >= Number(passengers)).map((v) => (
                          <label 
                            key={v.id} 
                            className={`relative flex flex-col md:flex-row items-center gap-8 p-6 rounded-2xl cursor-pointer transition-all duration-500 border overflow-hidden group ${selectedVehicleId === v.id ? 'border-gold bg-gold/[0.03] shadow-glow' : 'border-white/5 bg-primary-dark/30 hover:border-white/20'}`}
                          >
                            <input 
                              type="radio" 
                              value={v.id} 
                              {...register('vehicle', { required: true })} 
                              className="hidden" 
                            />
                            
                            <div className="w-full md:w-56 h-36 rounded-xl overflow-hidden shrink-0 relative bg-primary-dark shadow-heavy">
                              <Image src={v.image} alt={v.name} fill sizes="(max-width: 768px) 100vw, 224px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                              <div className="absolute top-2 right-2 flex gap-1">
                                <span className="bg-primary-dark/80 backdrop-blur-md text-gold text-[8px] font-bold px-2 py-0.5 rounded-full border border-gold/30">
                                  {v.category}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex-grow text-center md:text-left">
                              <h3 className="font-playfair text-2xl text-white mb-2 group-hover:text-gold transition-colors">{v.name}</h3>
                              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 text-white/40 text-xs font-dm">
                                <span className="flex items-center gap-1.5"><FiUsers size={12} className="text-gold" /> {v.seating} Seats</span>
                                <span className="flex items-center gap-1.5"><FiCheckCircle size={12} className="text-gold" /> Premium Leather</span>
                                <span className="flex items-center gap-1.5"><FiCheckCircle size={12} className="text-gold" /> Climate Control</span>
                              </div>
                              <div className="flex items-end justify-center md:justify-start gap-2">
                                <span className="text-gold font-bold text-2xl font-dm">{v.priceHourly}</span>
                                <span className="text-white/20 text-[10px] uppercase font-bold mb-1.5 tracking-tighter">/ hr Base</span>
                              </div>
                            </div>

                            <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${selectedVehicleId === v.id ? 'bg-gold border-gold text-primary-dark scale-110 shadow-glow' : 'border-white/10 text-white/10 group-hover:border-white/30'}`}>
                              <FiCheckCircle size={20} />
                            </div>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: DETAILS */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                          <FiInfo size={24} />
                        </div>
                        <div>
                          <h2 className="font-playfair text-2xl text-white">Passenger Details</h2>
                          <p className="font-dm text-white/40 text-sm">Help us tailor the experience for you.</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Input 
                          label="Full Name" 
                          required
                          placeholder="John Doe"
                          {...register('name', { required: 'Name is required' })} 
                          error={errors.name?.message as string} 
                        />
                        <Input 
                          label="Email Address"
                          type="email" 
                          required
                          placeholder="john@example.com"
                          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} 
                          error={errors.email?.message as string} 
                        />
                        <Input 
                          label="Phone Number"
                          type="tel" 
                          required
                          placeholder="+1 234 567 8900"
                          {...register('phone', { required: 'Phone is required' })} 
                          error={errors.phone?.message as string} 
                        />
                         <Input 
                          label="Company Name (Optional)" 
                          placeholder="Luxury Corp"
                          {...register('company')} 
                        />
                      </div>

                      <TextArea 
                        label="Special Requests & Notes" 
                        placeholder="E.g., Flight number, preferred beverages, extra baggage..."
                        rows={4}
                        {...register('requests')} 
                      />
                      
                      <div className="pt-6 border-t border-white/5 space-y-4">
                        <label className="flex gap-4 cursor-pointer group">
                           <input type="checkbox" className="w-6 h-6 bg-primary-dark border-white/10 rounded-md checked:bg-gold checked:border-gold accent-gold shrink-0 transition-all mt-0.5" {...register('terms', { required: true })} />
                           <span className="font-dm text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                            I agree to the <a href="#" className="text-gold underline underline-offset-4 hover:text-gold-light">Terms of Service</a> and our <a href="#" className="text-gold underline underline-offset-4 hover:text-gold-light">Cancellation Policy</a>. I understand this is a reservation request.
                           </span>
                        </label>
                        {errors.terms && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest pl-10">You must agree to continue</p>}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: REVIEW */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-10"
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                          <FiCheckCircle size={24} />
                        </div>
                        <div>
                          <h2 className="font-playfair text-2xl text-white">Final Confirmation</h2>
                          <p className="font-dm text-white/40 text-sm">Please verify your itinerary details.</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                             <div>
                               <h4 className="font-playfair text-gold text-lg mb-4 flex items-center gap-2"><FiMapPin size={16} /> Travel Info</h4>
                               <div className="space-y-4 font-dm border-l border-white/10 pl-5 ml-2">
                                  <div className="relative">
                                     <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Service</p>
                                     <p className="text-white font-semibold flex items-center gap-2">{tripType.replace(/([A-Z])/g, ' $1').toUpperCase()}</p>
                                  </div>
                                  <div>
                                     <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Pickup</p>
                                     <p className="text-white text-sm leading-relaxed">{watch('pickup')}</p>
                                     <p className="text-gold/60 text-[10px] mt-1 font-bold">{watch('date')} @ {watch('time')}</p>
                                  </div>
                                  {tripType !== 'hourly' && (
                                    <div>
                                      <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Drop-off</p>
                                      <p className="text-white text-sm leading-relaxed">{watch('dropoff')}</p>
                                    </div>
                                  )}
                               </div>
                             </div>

                             <div>
                               <h4 className="font-playfair text-gold text-lg mb-4 flex items-center gap-2"><FiInfo size={16} /> Guest Info</h4>
                               <div className="space-y-4 font-dm border-l border-white/10 pl-5 ml-2">
                                  <div className="flex gap-10">
                                    <div>
                                      <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Name</p>
                                      <p className="text-white text-sm">{watch('name')}</p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Phone</p>
                                      <p className="text-white text-sm">{watch('phone')}</p>
                                    </div>
                                  </div>
                                  <div>
                                     <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Email</p>
                                     <p className="text-white text-sm">{watch('email')}</p>
                                  </div>
                               </div>
                             </div>
                        </div>

                        <div className="bg-primary-dark/50 border border-white/5 p-8 rounded-3xl flex flex-col">
                           <h4 className="font-playfair text-gold text-lg mb-6">{t('booking.steps.vehicle')}</h4>
                           {selectedVehicle && (
                             <div className="space-y-6">
                               <div className="rounded-2xl overflow-hidden h-40 border border-white/10 relative shadow-deep">
                                 <Image src={selectedVehicle.image} alt={selectedVehicle.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                 <p className="absolute bottom-4 left-4 text-white font-playfair text-xl font-bold">{selectedVehicle.name}</p>
                               </div>
                               <div className="flex justify-between items-center px-2">
                                  <span className="text-white/40 text-sm font-dm">{selectedVehicle.category}</span>
                                  <span className="flex items-center gap-1.5 text-gold font-dm text-sm"><FiUsers size={14} /> {passengers} PAX</span>
                               </div>
                               <div className="pt-6 border-t border-white/10 mt-auto">
                                  <div className="flex justify-between items-end">
                                     <div>
                                        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Estimated Journey Price</p>
                                        <div className="flex items-center gap-2">
                                          <span className="text-4xl text-white font-dm font-bold tracking-tighter">${estimatedPrice}</span>
                                          <span className="text-gold/60 text-xs font-bold font-dm">* EST</span>
                                        </div>
                                     </div>
                                  </div>
                               </div>
                             </div>
                           )}
                        </div>
                      </div>

                      <div className="bg-gold/10 p-5 rounded-2xl flex gap-4 border border-gold/20 mt-6">
                         <FiInfo className="text-gold shrink-0 mt-1" size={18} />
                         <p className="text-xs text-white/60 leading-relaxed font-dm italic">
                           This amount is a non-binding estimate. A concierge will review your itinerary and provide a final all-inclusive quote shortly after submission.
                         </p>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: SUCCESS */}
                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 15, delay: 0.2 }}
                        className="w-24 h-24 bg-gold rounded-full mx-auto flex items-center justify-center text-primary-dark shadow-glow-strong mb-10"
                      >
                        <FiCheckCircle size={48} />
                      </motion.div>
                      <h2 className="font-playfair text-4xl md:text-5xl text-white mb-6">Reservation Transmitted</h2>
                      <p className="font-dm text-white/50 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
                        Thank you, <span className="text-gold font-bold">{watch('name')}</span>. Our elite concierge team has received your request and is currently verifying luxury vehicle availability.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button 
                          className="px-10 h-14 shadow-glow group"
                          onClick={() => window.open(generateBookingWhatsAppLink(submittedData), '_blank')}
                        >
                          Confirm via WhatsApp <FiMessageCircle className="ml-2 group-hover:scale-110 transition-transform" />
                        </Button>
                        <Button variant="secondary" onClick={() => window.location.href='/fleet'} className="px-10 h-14 border-white/10">Explore More Vehicles</Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Navigation Actions */}
              {step < 5 && (
                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-0 mt-12 md:mt-16 pt-8 md:pt-10 border-t border-white/5">
                  <div className="w-full md:w-1/3 flex justify-start">
                    {step > 1 && (
                      <Button variant="secondary" onClick={prevStep} type="button" className="w-full md:w-auto h-12 border-white/10 text-white/60 hover:text-white hover:border-white/30 group justify-center">
                        <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" /> {t('booking.back')}
                      </Button>
                    )}
                  </div>
                  
                  <div className="w-full md:w-1/3 text-center flex items-center justify-center">
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{t('booking.steps.details')} {step} / 4</p>
                  </div>

                  <div className="w-full md:w-1/3 flex justify-end">
                    {step < 4 ? (
                      <Button onClick={nextStep} type="button" className="w-full md:w-auto h-12 shadow-glow group pl-8 pr-6 justify-center">
                        {t('booking.next')} <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    ) : (
                      <Button type="submit" form="booking-form" className="w-full md:w-auto h-14 shadow-glow-strong px-12 font-bold uppercase tracking-widest text-xs justify-center">
                        {t('booking.submit')}
                      </Button>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Sidebar Summary */}
          {step < 5 && (
            <div className="space-y-6">
               <div className="bg-[#161b22]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-deep">
                  <h3 className="font-playfair text-xl text-gold mb-6 pb-4 border-b border-white/5">Reservation Summary</h3>
                  
                  <div className="space-y-6 font-dm">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gold shrink-0 mt-1">
                        <FiInfo size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mb-1">Service</p>
                        <p className="text-white text-sm capitalize">{tripType.replace(/([A-Z])/g, ' $1')}</p>
                      </div>
                    </div>

                    {watch('pickup') && (
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gold shrink-0 mt-1">
                          <FiMapPin size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mb-1">From</p>
                          <p className="text-white text-sm line-clamp-2">{watch('pickup')}</p>
                        </div>
                      </div>
                    )}

                    {watch('date') && (
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gold shrink-0 mt-1">
                          <FiCalendar size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mb-1">Departure</p>
                          <p className="text-white text-sm">{watch('date')} @ {watch('time')}</p>
                        </div>
                      </div>
                    )}

                    {selectedVehicle && (
                      <div className="flex items-start gap-4 pt-6 border-t border-white/5">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gold shrink-0 mt-1">
                          <FiCheckCircle size={16} />
                        </div>
                        <div className="flex-grow">
                          <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mb-1">Vehicle</p>
                          <div className="flex justify-between items-center">
                            <p className="text-white text-sm">{selectedVehicle.name}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {estimatedPrice > 0 && (
                      <div className="mt-8 p-6 bg-gold/5 rounded-2xl border border-gold/10">
                        <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-2">Estimated Price</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-white text-3xl font-bold font-dm tracking-tighter">${estimatedPrice}</span>
                          <span className="text-gold/60 text-xs font-bold">*</span>
                        </div>
                      </div>
                    )}
                  </div>
               </div>

               <div className="bg-gold/5 p-6 rounded-3xl border border-gold/10 text-center">
                  <FiClock className="text-gold mx-auto mb-4" size={24} />
                  <p className="text-xs text-white/60 font-dm leading-relaxed">
                    Booking is quick & easy. Your requests are handled in real-time by our 24/7 dispatching center.
                  </p>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
