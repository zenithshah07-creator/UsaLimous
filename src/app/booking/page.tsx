
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { fleet } from '@/data/mockData';
import { FiCheckCircle, FiArrowRight, FiArrowLeft, FiMapPin, FiCalendar, FiClock, FiUsers, FiInfo } from 'react-icons/fi';

export default function Booking() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, watch, formState: { errors }, trigger, setValue } = useForm({
    defaultValues: {
      tripType: 'airport',
      passengers: 1,
      pickup: '',
      dropoff: '',
      date: '',
      time: '',
      vehicle: '',
      name: '',
      email: '',
      phone: '',
      requests: '',
      terms: false
    }
  });
  
  const watchedFields = watch();
  const selectedVehicle = fleet.find(v => v.id === watchedFields.vehicle);

  // Price Estimation Logic (Fake)
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  useEffect(() => {
    if (selectedVehicle) {
      let base = parseInt(selectedVehicle.priceHourly.replace('$', ''));
      if (watchedFields.tripType === 'hourly') base *= 3; // 3 hour minimum
      setEstimatedPrice(base);
    }
  }, [selectedVehicle, watchedFields.tripType]);

  const onSubmit = (data: Record<string, unknown>) => {
    console.log("Booking submitted:", data);
    setStep(5); // Success step
  };

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) isValid = await trigger(['pickup', 'dropoff', 'tripType']);
    if (step === 2) isValid = await trigger(['date', 'time', 'passengers']);
    if (step === 3) {
      if (!watchedFields.vehicle) {
        trigger(['vehicle']);
        return;
      }
      isValid = true;
    }
    if (step === 4) isValid = await trigger(['name', 'email', 'phone', 'terms']);
    
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const steps = [
    { title: 'Route', icon: <FiMapPin /> },
    { title: 'Schedule', icon: <FiCalendar /> },
    { title: 'Vehicle', icon: <FiUsers /> },
    { title: 'Confirm', icon: <FiCheckCircle /> }
  ];

  return (
    <div className="bg-primary-dark min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-light/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-gold/10 text-gold text-[10px] font-bold px-4 py-1.5 rounded-full border border-gold/20 tracking-widest uppercase mb-4"
          >
            Secure Reservation
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-4xl md:text-6xl text-white mb-4"
          >
            Book Your <span className="text-gold">Luxury</span> Experience
          </motion.h1>
          <p className="font-dm text-white/50 text-lg">Four simple steps to your premium journey.</p>
        </div>

        {/* Progress Stepper */}
        {step < 5 && (
          <div className="mb-16 max-w-3xl mx-auto">
            <div className="flex justify-between relative">
              <div className="absolute top-5 left-0 w-full h-[1px] bg-white/10 z-0"></div>
              <div 
                className="absolute top-5 left-0 h-[2px] bg-gold z-0 transition-all duration-700 ease-in-out" 
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
              
              {steps.map((s, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <motion.div 
                    animate={{ 
                      scale: step === i + 1 ? 1.2 : 1,
                      backgroundColor: step > i + 1 ? '#D4AF37' : step === i + 1 ? '#0F1419' : '#1A1A1A',
                      borderColor: step >= i + 1 ? '#D4AF37' : '#2A2A2A'
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${step > i + 1 ? 'text-primary-dark shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'text-white/40'}`}
                  >
                    {step > i + 1 ? <FiCheckCircle size={20} /> : <span className={step === i + 1 ? 'text-gold' : ''}>{s.icon}</span>}
                  </motion.div>
                  <span className={`absolute top-12 font-poppins text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-colors duration-500 ${step >= i + 1 ? 'text-gold' : 'text-white/20'}`}>{s.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <div className="bg-gray-charcoal/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-heavy border border-white/5 min-h-[550px] relative overflow-hidden">
              <form id="booking-form" onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {/* STEP 1: ROUTE */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                          <FiMapPin size={24} />
                        </div>
                        <div>
                          <h2 className="font-playfair text-2xl text-white">Define Your Route</h2>
                          <p className="font-dm text-white/40 text-sm">Where should we pick you up?</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-primary-dark/30 p-6 rounded-2xl border border-white/5">
                           <label className="font-poppins text-[10px] font-bold text-gold uppercase tracking-widest mb-4 block">Service Category</label>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             {['airport', 'hourly', 'pointToPoint', 'corporate'].map((type) => (
                               <button
                                 key={type}
                                 type="button"
                                 onClick={() => setValue('tripType', type as any)}
                                 className={`p-4 rounded-xl border font-dm text-sm text-left transition-all ${watchedFields.tripType === type ? 'bg-gold text-primary-dark border-gold font-bold' : 'bg-white/5 text-white/60 border-white/10 hover:border-gold/50'}`}
                               >
                                 {type === 'airport' && '✈️ Airport Transfer'}
                                 {type === 'hourly' && '🕒 Hourly Charter'}
                                 {type === 'pointToPoint' && '📍 Point to Point'}
                                 {type === 'corporate' && '💼 Corporate'}
                               </button>
                             ))}
                           </div>
                        </div>

                        <div className="space-y-4">
                          <div className="relative">
                            <Input 
                              label="Pickup Point" 
                              placeholder="Address, Airport, or Hotel" 
                              {...register('pickup', { required: 'Please specify pickup' })} 
                              error={errors.pickup?.message as string} 
                              className="!mb-0"
                            />
                            <div className="absolute right-4 bottom-4 text-white/20 text-[10px] hidden sm:block">MOCK AUTOCOMPLETE ACTIVE</div>
                          </div>
                          
                          {watchedFields.tripType !== 'hourly' && (
                            <Input 
                              label="Drop-off Point" 
                              placeholder="Your destination" 
                              {...register('dropoff', { required: 'Please specify destination' })} 
                              error={errors.dropoff?.message as string} 
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: SCHEDULE */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                          <FiCalendar size={24} />
                        </div>
                        <div>
                          <h2 className="font-playfair text-2xl text-white">Date & Time</h2>
                          <p className="font-dm text-white/40 text-sm">When will your journey begin?</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Input 
                          type="date"
                          label="Preferred Date"
                          {...register('date', { required: 'Date is required' })} 
                          error={errors.date?.message as string} 
                          style={{ colorScheme: 'dark' }}
                        />
                        <Input 
                          type="time"
                          label="Pickup Time"
                          {...register('time', { required: 'Time is required' })} 
                          error={errors.time?.message as string} 
                          style={{ colorScheme: 'dark' }}
                        />
                        <div className="md:col-span-2 bg-primary-dark/30 p-6 rounded-2xl border border-white/5">
                           <label className="font-poppins text-[10px] font-bold text-gold uppercase tracking-widest mb-4 block">Passengers & Luggage</label>
                           <div className="flex items-center gap-8">
                              <div className="flex-1">
                                <p className="text-white/60 text-xs mb-2">Number of Passengers</p>
                                <input 
                                  type="range" min="1" max="14" 
                                  className="w-full accent-gold bg-white/10 h-1 rounded-full appearance-none cursor-pointer"
                                  {...register('passengers')}
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-white/40 font-bold">
                                  <span>1</span>
                                  <span className="text-gold text-sm">{watchedFields.passengers} PASSENGERS</span>
                                  <span>14</span>
                                </div>
                              </div>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: VEHICLE */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-8">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                          <FiUsers size={24} />
                        </div>
                        <div>
                          <h2 className="font-playfair text-2xl text-white">Select Your Fleet</h2>
                          <p className="font-dm text-white/40 text-sm">Choose the perfect vehicle for your arrival.</p>
                        </div>
                      </div>

                      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                        {fleet.map((v) => (
                          <label 
                            key={v.id} 
                            className={`flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl cursor-pointer transition-all duration-500 border-2 ${watchedFields.vehicle === v.id ? 'border-gold bg-gold/5 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border-white/5 bg-primary-dark/40 hover:border-white/20'}`}
                          >
                            <input 
                              type="radio" 
                              value={v.id} 
                              {...register('vehicle', { required: 'Please select a vehicle' })} 
                              className="hidden" 
                            />
                            <div className="w-full sm:w-44 h-28 rounded-xl overflow-hidden shrink-0 border border-white/5">
                              <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow">
                              <h3 className="font-playfair text-xl text-white mb-1">{v.name}</h3>
                              <p className="text-[10px] text-gold font-bold uppercase tracking-widest mb-3">{v.category}</p>
                              <div className="flex items-center gap-4 text-white/40 text-xs">
                                <span className="flex items-center gap-1"><FiUsers size={12} /> {v.seating} Seats</span>
                                <span className="flex items-center gap-1"><FiInfo size={12} /> {v.features.slice(0,1)}</span>
                              </div>
                            </div>
                            <div className="text-right">
                               <p className="text-gold font-poppins font-bold text-lg">{v.priceHourly}</p>
                               <p className="text-white/20 text-[10px]">Per Hour</p>
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.vehicle && <p className="text-error text-xs mt-4">Please select a vehicle to continue.</p>}
                    </motion.div>
                  )}

                  {/* STEP 4: REVIEW */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                          <FiCheckCircle size={24} />
                        </div>
                        <div>
                          <h2 className="font-playfair text-2xl text-white">Final Confirmation</h2>
                          <p className="font-dm text-white/40 text-sm">Review your details and secure the booking.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Full Name" {...register('name', { required: 'Name is required' })} error={errors.name?.message as string} />
                        <Input label="Email Address" type="email" {...register('email', { required: 'Email is required' })} error={errors.email?.message as string} />
                        <Input label="Phone Number" type="tel" {...register('phone', { required: 'Phone is required' })} error={errors.phone?.message as string} />
                        <div className="flex items-center gap-3 mt-6">
                           <input type="checkbox" id="terms" className="w-5 h-5 accent-gold" {...register('terms', { required: true })} />
                           <label htmlFor="terms" className="text-white/50 text-xs font-dm">I agree to the premium terms & privacy policy.</label>
                        </div>
                      </div>
                      {errors.terms && <p className="text-error text-xs mt-[-20px]">Agreement is required.</p>}

                      <TextArea label="Special Requests (Optional)" placeholder="Preferred music, drinks, car temperature..." {...register('requests')} />
                    </motion.div>
                  )}

                  {/* STEP 5: SUCCESS */}
                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20"
                    >
                      <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center text-primary-dark shadow-[0_0_40px_rgba(212,175,55,0.4)] mx-auto mb-8">
                        <FiCheckCircle size={48} />
                      </div>
                      <h2 className="font-playfair text-4xl text-white mb-4">Request Transmitted</h2>
                      <p className="font-dm text-white/60 mb-10 max-w-md mx-auto">Thank you, {watchedFields.name}. Your luxury reservation is being processed. A concierge will reach out within 15 minutes.</p>
                      <Button onClick={() => window.location.href='/'} variant="primary">Return To Home</Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Form Controls */}
              {step < 5 && (
                <div className="flex justify-between mt-12 pt-8 border-t border-white/5">
                  <Button 
                    variant="secondary" 
                    onClick={prevStep} 
                    disabled={step === 1}
                    className="!px-8 border-white/10 text-white/40 disabled:opacity-0"
                  >
                    <FiArrowLeft className="mr-2" /> Back
                  </Button>
                  
                  {step < 4 ? (
                    <Button onClick={nextStep} variant="primary" className="!px-10 shadow-gold/20">
                      Continue <FiArrowRight className="ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" form="booking-form" variant="primary" className="!px-12 shadow-gold/50 glow-gold">
                      Confirm Reservation
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Summary */}
          {step < 5 && (
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-charcoal/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-medium">
                <h3 className="font-playfair text-xl text-gold mb-6 border-b border-white/5 pb-4">Reservation Summary</h3>
                
                <div className="space-y-6 font-dm">
                  {watchedFields.pickup && (
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">Pickup</p>
                      <p className="text-white text-sm leading-relaxed">{watchedFields.pickup}</p>
                    </div>
                  )}
                  {watchedFields.date && (
                    <div className="flex gap-8">
                       <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">Date</p>
                        <p className="text-white text-sm">{watchedFields.date}</p>
                      </div>
                       <div>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">Time</p>
                        <p className="text-white text-sm">{watchedFields.time}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedVehicle && (
                    <div className="bg-primary-dark/50 p-4 rounded-2xl border border-gold/20 flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-white/5">
                        <img src={selectedVehicle.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gold font-bold uppercase tracking-widest">{selectedVehicle.name}</p>
                        <p className="text-white/60 text-xs">{selectedVehicle.category}</p>
                      </div>
                    </div>
                  )}

                  <div className="h-[1px] w-full bg-white/10 my-6"></div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gold font-bold uppercase tracking-widest mb-1">Estimated Total</p>
                      <p className="text-white/40 text-[9px]">Final quote pending concierge review</p>
                    </div>
                    <div className="text-right">
                      <p className="font-poppins text-2xl font-bold text-white">${estimatedPrice}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gold/5 rounded-2xl border border-gold/10">
                <div className="flex gap-4 items-start">
                  <FiInfo className="text-gold shrink-0 mt-1" size={18} />
                  <p className="text-[11px] text-white/50 leading-loose">
                    Our elite service includes flight tracking, 60 minutes complimentary wait time, and a professional meet & greet. No charges are made today.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
