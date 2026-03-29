"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { blogPosts } from '@/data/mockData';
import { FiClock, FiCalendar, FiUser, FiChevronLeft, FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi';
import Image from 'next/image';

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const post = blogPosts.find(p => p.slug === slug);

  // For demonstration, if post not found in mock data, use the first one 
  // (In a real app, we would return notFound())
  const activePost = post || blogPosts[0];

  return (
    <div className="bg-primary-dark min-h-screen">
      
      {/* Article Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end pb-20 overflow-hidden border-b border-gray-charcoal">
        <div className="absolute inset-0 bg-primary-dark/80 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent z-10"></div>
        <Image 
          src={activePost.image} 
          alt={activePost.title} 
          fill
          priority
          sizes="100vw"
          className="object-cover z-0 transition-transform duration-[20s] ease-linear origin-center hover:scale-110"
        />

        <div className="container mx-auto px-4 lg:px-10 relative z-20 max-w-4xl">
           <Link href="/blog" className="inline-flex items-center font-dm text-sm text-gold hover:text-gold-light transition-colors mb-6 group">
             <FiChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dispatch
           </Link>
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             <span className="bg-gold text-primary-dark font-dm text-xs font-bold px-3 py-1 rounded inline-block mb-6">
                {activePost.category}
             </span>
             <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gold mb-6 leading-tight">
               {activePost.title}
             </h1>
             
             <div className="flex flex-wrap gap-6 text-sm font-dm text-white/50">
                <span className="flex items-center"><FiUser className="mr-2 text-gold" />By {activePost.author}</span>
                <span className="flex items-center"><FiCalendar className="mr-2 text-gold" />{activePost.date}</span>
                <span className="flex items-center"><FiClock className="mr-2 text-gold" />{activePost.readTime} min read</span>
             </div>
           </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-10 flex flex-col lg:flex-row gap-16 justify-center">
          
          {/* Article Body */}
          <article className="lg:w-2/3 max-w-3xl prose prose-invert prose-gold">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-dm text-white/80 text-lg leading-[1.8] space-y-6"
            >
              <p className="font-cormorant text-2xl text-white italic border-l-4 border-gold pl-6 py-2 mb-10 bg-gray-charcoal/30">
                {activePost.excerpt}
              </p>

              <p>
                When organizing corporate logistics or an elite event in a major metropolis, the choice of ground transportation is often the defining touch of the entire itinerary. The seamless transition from arrival gate to boardroom sets the tone for subsequent negotiations or celebrations.
              </p>

              <h2 className="font-playfair text-3xl text-gold mt-12 mb-6">The Importance of Punctuality</h2>
              <p>
                In the theater of luxury travel, time is the ultimate currency. Advanced flight tracking protocols and real-time traffic algorithmic routing ensure that chauffeurs are prepositioned, eliminating the variables of urban congestion. 
              </p>

              <ul className="list-disc pl-6 space-y-3 my-8 text-white/70 mx-4">
                <li><strong className="text-white font-semibold">Flight Tracking:</strong> Immediate adjustments to pickup times corresponding to actual runway arrivals.</li>
                <li><strong className="text-white font-semibold">Chauffeur Etiquette:</strong> Discrete, professional, and anticipatory service that respects client confidentiality.</li>
                <li><strong className="text-white font-semibold">Cabin Ecosystem:</strong> Climatic perfection, bespoke refreshments, and high-fidelity acoustics.</li>
              </ul>

              <h3 className="font-playfair text-2xl text-gold mt-10 mb-4">A Sanctuary on Wheels</h3>
              <p>
                Beyond mere transit, a premium vehicle serves as an extension of the executive suite or a prelude to a gala. It is an isolated sanctuary where one can decompress, conduct confidential briefings, or simply enjoy a fleeting moment of serenity amidst the chaos of transit.
              </p>

              <div className="my-16 border-y border-gray-dark py-8 flex items-center justify-between">
                <div className="font-dm text-white/50 text-sm">Share this article:</div>
                <div className="flex gap-4">
                  <button className="w-10 h-10 rounded-full bg-gray-charcoal flex items-center justify-center text-gold hover:bg-gold hover:text-primary-dark transition-colors"><FiLinkedin size={18} /></button>
                  <button className="w-10 h-10 rounded-full bg-gray-charcoal flex items-center justify-center text-gold hover:bg-gold hover:text-primary-dark transition-colors"><FiTwitter size={18} /></button>
                  <button className="w-10 h-10 rounded-full bg-gray-charcoal flex items-center justify-center text-gold hover:bg-gold hover:text-primary-dark transition-colors"><FiFacebook size={18} /></button>
                </div>
              </div>

              {/* Author Bio */}
              <div className="bg-gray-charcoal p-8 rounded-lg border border-gray-dark flex gap-6 items-center">
                <div className="relative w-20 h-20 shrink-0">
                  <Image src="/Assets/Herosection55.jpg" alt={activePost.author} fill sizes="80px" className="rounded-full object-cover border-2 border-gold" />
                </div>
                <div>
                  <h4 className="font-cormorant text-2xl text-gold mb-1">{activePost.author}</h4>
                  <p className="font-dm text-white/50 text-sm mb-2">Senior Concierge Editor</p>
                  <p className="font-dm text-white/80 text-sm leading-relaxed">Sarah curates insights into the luxury transportation industry, drawing from a decade of experience in VVIP logistics and executive transit.</p>
                </div>
              </div>

            </motion.div>
          </article>

        </div>
      </section>

      {/* Recommended Posts */}
      <section className="py-24 bg-gray-charcoal border-t border-gray-dark">
        <div className="container mx-auto px-4 lg:px-10">
          <h2 className="font-playfair text-3xl text-gold mb-10 text-center">Continue Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {blogPosts.filter(p => p.id !== activePost.id).slice(0,3).map(post => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="group block">
                <div className="bg-primary-dark border border-gray-dark rounded-lg overflow-hidden h-full">
                  <div className="h-40 overflow-hidden relative">
                    <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="text-gold text-xs font-dm font-bold tracking-wider uppercase mb-2 block">{post.category}</span>
                    <h3 className="font-playfair text-xl text-white group-hover:text-gold transition-colors mb-2 line-clamp-2">{post.title}</h3>
                    <p className="font-dm text-gray-500 text-xs">{post.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
