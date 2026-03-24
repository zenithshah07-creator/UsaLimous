
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { fleet } from '@/data/mockData';
import { FiCheckCircle, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

export default function Booking() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm();
  
  const tripType = watch('tripType', 'airport');
  const selectedVehicle = watch('vehicle');

  const onSubmit = (data: Record<string, unknown>) => {
    console.log("Booking submitted:", data);
    setStep(5); // Success step
  };

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) isValid = await trigger(['pickup', 'dropoff', 'date', 'time', 'passengers']);
    if (step === 2) isValid = await trigger(['vehicle']);
    if (step === 3) isValid = await trigger(['name', 'email', 'phone']);
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="bg-primary-dark min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-light/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-4xl md:text-5xl text-gold mb-4"
          >
            Reservation Configuration
          </motion.h1>
          <p className="font-dm text-white/60">Configure your luxury journey securely and effortlessly.</p>
        </div>

        {/* Progress Bar */}
        {step < 5 && (
          <div className="mb-12">
            <div className="flex justify-between relative">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-charcoal -translate-y-1/2 z-0"></div>
              <div 
                className="absolute top-1/2 left-0 h-[2px] bg-gold -translate-y-1/2 z-0 transition-all duration-500 ease-out" 
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
              
              {['Trip Info', 'Vehicle', 'Details', 'Review'].map((label, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-dm text-xs transition-colors duration-500 ${step > i + 1 ? 'bg-gold text-primary-dark shadow-[0_0_10px_rgba(212,175,55,0.5)]' : step === i + 1 ? 'bg-primary-dark border-2 border-gold text-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-gray-charcoal border border-gray-dark text-white/50'}`}>
                    {step > i + 1 ? <FiCheckCircle size={16} /> : i + 1}
                  </div>
                  <span className={`absolute top-10 font-dm w-max text-xs font-semibold ${step >= i + 1 ? 'text-gold' : 'text-gray-500'}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Area */}
        <div className="bg-gray-charcoal/80 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-heavy border border-gray-dark/50 min-h-[500px]">
          
          <form id="booking-form" onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {/* STEP 1: TRIP */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-playfair text-2xl text-gold mb-6 border-b border-gray-dark pb-4">Itinerary Details</h2>
                  
                  <div className="w-full flex flex-col mb-4">
                    <label className="font-dm text-sm font-semibold text-gold mb-2">Service Type</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-primary-dark text-white font-dm text-base px-4 py-3 rounded-[4px] border border-gray-dark focus:outline-none focus:border-gold appearance-none cursor-pointer"
                        {...register('tripType')}
                      >
                        <option value="airport">Airport Transfer</option>
                        <option value="hourly">Hourly Charter</option>
                        <option value="wedding">Wedding Limo</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="pointToPoint">Point to Point</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none">▼</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Pickup Location" 
                      placeholder="Address or Airport Code" 
                      required
                      {...register('pickup', { required: 'Pickup is required' })} 
                      error={errors.pickup?.message as string} 
                    />
                    {tripType !== 'hourly' && (
                      <Input 
                        label="Drop-off Location" 
                        placeholder="Destination Address" 
                        required
                        {...register('dropoff', { required: 'Drop-off is required' })} 
                        error={errors.dropoff?.message as string} 
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input 
                      type="date"
                      label="Date"
                      required
                      className="cursor-pointer"
                      {...register('date', { required: 'Date is required' })} 
                      error={errors.date?.message as string} 
                    />
                    <Input 
                      type="time"
                      label="Time"
                      required
                      className="cursor-pointer"
                      {...register('time', { required: 'Time is required' })} 
                      error={errors.time?.message as string} 
                    />
                    <Input 
                      type="number"
                      label="Passengers"
                      min="1"
                      required
                      {...register('passengers', { required: 'Passengers is required', min: 1 })} 
                      error={errors.passengers?.message as string} 
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 2: VEHICLE */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="font-playfair text-2xl text-gold mb-6 border-b border-gray-dark pb-4">Select Premium Vehicle</h2>
                  {errors.vehicle && <p className="text-error font-dm text-sm mb-4">Please select a vehicle to continue.</p>}
                  
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {fleet.map((v) => (
                      <label 
                        key={v.id} 
                        className={`flex flex-col sm:flex-row items-center gap-6 p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 ${selectedVehicle === v.id ? 'border-gold bg-[rgba(212,175,55,0.05)] shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'border-gray-dark bg-primary-dark hover:border-gold/50'}`}
                      >
                        <input 
                          type="radio" 
                          value={v.id} 
                          {...register('vehicle', { required: true })} 
                          className="hidden" 
                        />
                        <div className="w-full sm:w-48 h-32 rounded overflow-hidden shrink-0">
                          <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow flex flex-col justify-center h-full text-center sm:text-left">
                          <h3 className="font-cormorant text-2xl font-bold text-gold mb-1">{v.name}</h3>
                          <p className="font-dm text-white/50 text-sm mb-2">{v.category} | {v.seating} Seats</p>
                          <div className="font-dm text-gold font-semibold text-lg mt-auto">{tripType === 'hourly' ? `${v.priceHourly}/hr` : `${v.priceTrip} Flat Rate`}</div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedVehicle === v.id ? 'border-gold bg-gold text-primary-dark' : 'border-gray-500'}`}>
                          {selectedVehicle === v.id && <FiCheckCircle size={14} />}
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-playfair text-2xl text-gold mb-6 border-b border-gray-dark pb-4">Personal Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Full Name" 
                      required
                      {...register('name', { required: 'Name is required' })} 
                      error={errors.name?.message as string} 
                    />
                    <Input 
                      label="Company Name (Optional)" 
                      {...register('company')} 
                    />
                    <Input 
                      label="Email Address"
                      type="email" 
                      required
                      {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} 
                      error={errors.email?.message as string} 
                    />
                    <Input 
                      label="Phone Number"
                      type="tel" 
                      required
                      {...register('phone', { required: 'Phone is required' })} 
                      error={errors.phone?.message as string} 
                    />
                  </div>

                  <TextArea 
                    label="Flight Details / Special Requests" 
                    placeholder="E.g., Flight DL405, need infant car seat..."
                    {...register('requests')} 
                  />
                  
                  <div className="flex gap-3 items-center mt-4">
                     <input type="checkbox" id="terms" className="w-5 h-5 accent-gold cursor-pointer" {...register('terms', { required: true })} />
                     <label htmlFor="terms" className="font-dm text-sm text-white/60 cursor-pointer">I agree to the <a href="#" className="text-gold underline">Terms & Conditions</a> and <a href="#" className="text-gold underline">Cancellation Policy</a>.</label>
                  </div>
                  {errors.terms && <p className="text-error text-xs font-dm">You must agree to the terms.</p>}
                </motion.div>
              )}

              {/* STEP 4: REVIEW */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="font-playfair text-2xl text-gold mb-6 border-b border-gray-dark pb-4">Review Confirmation</h2>
                  
                  <div className="bg-primary-dark border border-gold/30 rounded-lg p-6 font-dm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-4">Journey Info</h4>
                        <div className="space-y-3 text-sm">
                          <p className="flex justify-between border-b border-gray-charcoal pb-2"><span className="text-white/50">Type:</span> <span className="text-white capitalize">{watch('tripType')}</span></p>
                          <p className="flex justify-between border-b border-gray-charcoal pb-2"><span className="text-white/50">Date:</span> <span className="text-white">{watch('date')}</span></p>
                          <p className="flex justify-between border-b border-gray-charcoal pb-2"><span className="text-white/50">Time:</span> <span className="text-white">{watch('time')}</span></p>
                          <p className="flex flex-col border-b border-gray-charcoal pb-2"><span className="text-white/50 mb-1">Pickup:</span> <span className="text-white break-words">{watch('pickup')}</span></p>
                          {watch('tripType') !== 'hourly' && (
                            <p className="flex flex-col border-b border-gray-charcoal pb-2"><span className="text-white/50 mb-1">Drop-off:</span> <span className="text-white break-words">{watch('dropoff')}</span></p>
                          )}
                          <p className="flex justify-between border-b border-gray-charcoal pb-2"><span className="text-white/50">Passengers:</span> <span className="text-white">{watch('passengers')}</span></p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-4">Passenger Info</h4>
                        <div className="space-y-3 text-sm mb-6">
                           <p className="flex justify-between border-b border-gray-charcoal pb-2"><span className="text-white/50">Name:</span> <span className="text-white">{watch('name')}</span></p>
                           <p className="flex justify-between border-b border-gray-charcoal pb-2"><span className="text-white/50">Contact:</span> <span className="text-white">{watch('phone')}</span></p>
                           <p className="flex justify-between border-b border-gray-charcoal pb-2"><span className="text-white/50">Email:</span> <span className="text-white">{watch('email')}</span></p>
                        </div>

                        <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-4">Vehicle Selection</h4>
                        <div className="flex items-center gap-4 bg-gray-charcoal p-3 rounded border border-gray-dark">
                          <div className="w-16 h-10 bg-primary-dark rounded shrink-0 overflow-hidden">
                             <img src={fleet.find(v => v.id === selectedVehicle)?.image} className="w-full h-full object-cover" alt="" />
                          </div>
                          <span className="text-white font-cormorant font-bold text-lg">{fleet.find(v => v.id === selectedVehicle)?.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-white/50 font-dm text-sm mt-6">By clicking Submit Reservation, your card will not be charged. Our concierge will contact you to finalize billing.</p>
                </motion.div>
              )}

              {/* STEP 5: SUCCESS */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="w-24 h-24 bg-gold rounded-full mx-auto flex items-center justify-center text-primary-dark shadow-[0_0_30px_rgba(212,175,55,0.4)] mb-8"
                  >
                    <FiCheckCircle size={48} />
                  </motion.div>
                  <h2 className="font-playfair text-4xl text-gold mb-4">Reservation Request Sent</h2>
                  <p className="font-dm text-white/80 text-lg mb-8 max-w-lg mx-auto">
                    Thank you, {watch('name')}. Your reservation request has been securely transmitted. A concierge will be in touch within 30 minutes to confirm your itinerary.
                  </p>
                  <Button onClick={() => window.location.href='/'} className="mx-auto">Return Home</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Form Actions (Only show for steps 1-4) */}
          {step < 5 && (
            <div className="flex justify-between mt-12 pt-6 border-t border-gray-dark/50">
              {step > 1 ? (
                <Button variant="secondary" onClick={prevStep} type="button" className="!px-6">
                  <FiArrowLeft className="mr-2" /> Back
                </Button>
              ) : (
                <div></div>
              )}
              
              {step < 4 ? (
                <Button onClick={nextStep} type="button" className="!px-8">
                  Continue <FiArrowRight className="ml-2" />
                </Button>
              ) : (
                <Button type="submit" form="booking-form" className="!px-8 !bg-white !text-primary-dark hover:!bg-gold hover:!text-primary-dark shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  Submit Reservation
                </Button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
