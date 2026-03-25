"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { FiCheckCircle, FiPhone, FiMail, FiMessageCircle, FiMapPin } from 'react-icons/fi';

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data: Record<string, unknown>) => {
    console.log(data);
    setIsSubmitted(true);
  };

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Memphis', 'Boston'];

  return (
    <div className="bg-primary-dark">
      {/* Hero */}
      <section className="relative pt-32 pb-20 border-b border-gray-charcoal">
        <div className="container mx-auto px-4 lg:px-10 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl md:text-6xl text-gold mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-dm text-white/70 max-w-2xl mx-auto text-lg"
          >
            Experience immediate, white-glove assistance. Our concierge is available 24/7 to accommodate your requests.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <div className="bg-gray-charcoal p-8 md:p-12 rounded-lg shadow-deep border border-gray-dark">
                <h2 className="font-playfair text-3xl text-gold mb-2">Send a Message</h2>
                <p className="font-dm text-white/60 mb-8">We aim to respond to all inquiries within 2 hours.</p>
                
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <FiCheckCircle size={48} className="text-success mx-auto mb-6" />
                    <h3 className="font-playfair text-2xl text-white mb-2">Message Sent</h3>
                    <p className="font-dm text-white/70">Thank you for reaching out. A concierge will be with you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input 
                      label="Full Name" 
                      placeholder="John Doe" 
                      {...register('name', { required: 'Name is required' })} 
                      error={errors.name?.message as string} 
                    />
                    <Input 
                      label="Email Address" 
                      type="email" 
                      placeholder="john@example.com" 
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                      })} 
                      error={errors.email?.message as string} 
                    />
                    <Input 
                      label="Phone Number" 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      {...register('phone')} 
                    />
                    <Input 
                      label="Subject" 
                      placeholder="Inquiry about..." 
                      {...register('subject', { required: 'Subject is required' })} 
                      error={errors.subject?.message as string} 
                    />
                    <TextArea 
                      label="Message" 
                      placeholder="How can we assist you?" 
                      {...register('message', { required: 'Message is required' })} 
                      error={errors.message?.message as string} 
                    />
                    <Button type="submit" className="w-full mt-8 !py-4 text-sm font-bold uppercase tracking-widest">
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Info Cards */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2 space-y-6"
            >
              {[
                { icon: <FiPhone size={24} />, title: "Call Us", data: "+1-800-555-0199", sub: "24/7 Availability", action: "Call Now", link: "tel:+18005550199" },
                { icon: <FiMail size={24} />, title: "Email Us", data: "info@usalimosservice.com", sub: "Response within 2 hours", action: "Email Us", link: "mailto:info@usalimosservice.com" },
                { icon: <FiMessageCircle size={24} />, title: "WhatsApp Us", data: "+1-800-555-0199", sub: "Instant chat available", action: "WhatsApp", link: "#" },
              ].map((info, i) => (
                <div key={i} className="bg-primary-dark p-8 rounded-lg border border-gray-charcoal hover:border-gold hover:-translate-y-1 hover:shadow-medium transition-all duration-300 flex items-center justify-between group">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-[rgba(212,175,55,0.1)] flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-primary-dark transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-playfair text-xl text-white mb-1 group-hover:text-gold transition-colors">{info.title}</h3>
                      <p className="font-dm text-white/90 text-sm mb-1">{info.data}</p>
                      <p className="font-dm text-white/50 text-xs">{info.sub}</p>
                    </div>
                  </div>
                  <Button variant="secondary" className="hidden sm:block !py-2 !px-4 text-xs" onClick={() => window.location.href=info.link}>{info.action}</Button>
                </div>
              ))}

              <div className="bg-gray-charcoal mt-8 p-1 border border-gray-dark rounded-lg overflow-hidden h-64 relative group">
                {/* Mock Google Map Embed */}
                <div className="absolute inset-0 bg-[url('/Assets/Herosection2.jpg')] bg-cover bg-center opacity-40 transition-opacity duration-500 group-hover:opacity-70"></div>
                <div className="absolute inset-0 bg-primary-dark/50 pointer-events-none"></div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-primary-dark border border-gold px-6 py-4 rounded-lg shadow-deep flex flex-col items-center">
                    <FiMapPin className="text-gold mb-2" size={32} />
                    <span className="font-playfair text-gold text-xl">Headquarters</span>
                    <span className="font-dm text-white/80 text-sm">New York, NY</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-24 bg-gray-charcoal border-t border-gray-dark">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl text-gold mb-4">We proudly serve the following cities:</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 max-w-5xl mx-auto">
            {cities.map((city) => (
              <div key={city} className="font-dm text-white/70 hover:text-gold hover:underline cursor-pointer transition-colors text-center text-sm md:text-base">
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
