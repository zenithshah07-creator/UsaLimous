"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { blogPosts } from '@/data/mockData';
import { FiClock, FiCalendar, FiUser } from 'react-icons/fi';
import PageHero from '@/components/ui/PageHero';
import Image from 'next/image';

export default function BlogListing() {
  const categories = ['Travel Tips', 'Corporate', 'Weddings', 'Fleet News', 'Luxury Lifestyle'];
  
  return (
    <div className="bg-primary-dark min-h-screen">
      {/* Hero */}
      <PageHero
        title="Luxury Dispatch"
        subtitle="Insights, travel tips, and news from the forefront of elite transportation."
        image="/Assets/Blogging.avif"
        breadcrumb="Home / Blog"
      />

      {/* Main Layout */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-10 flex flex-col lg:flex-row gap-16">
          
          {/* Main Column */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full flex flex-col p-0 overflow-hidden group border border-gray-dark hover:border-gold">
                    {/* Image */}
                    <div className="h-48 overflow-hidden relative">
                       <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-20"></Link>
                       <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute top-4 left-4 z-10 bg-gold text-primary-dark font-dm text-xs font-bold px-3 py-1 rounded">
                         {post.category}
                       </div>
                    </div>
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow bg-gray-charcoal relative">
                      <h2 className="font-playfair text-2xl text-gold mb-4 line-clamp-2 hover:underline">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      
                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 text-xs font-dm text-gray-500 mb-4">
                        <span className="flex items-center"><FiUser className="mr-2" />{post.author}</span>
                        <span className="flex items-center"><FiCalendar className="mr-2" />{post.date}</span>
                        <span className="flex items-center"><FiClock className="mr-2" />{post.readTime} min read</span>
                      </div>

                      <p className="font-dm text-white/70 text-sm mb-6 flex-grow">{post.excerpt}</p>
                      
                      <Link href={`/blog/${post.slug}`} className="font-dm text-gold font-semibold text-sm hover:text-gold-light mt-auto inline-flex items-center">
                        Read More 
                        <span className="ml-2 w-0 h-[1px] bg-gold-light group-hover:w-4 transition-all duration-300 inline-block"></span>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 text-center">
              <Button variant="secondary" className="!px-12">Load More Articles</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-12">
              
              {/* Search */}
              <div className="bg-gray-charcoal p-8 rounded-lg border border-gray-dark shadow-light">
                <h3 className="font-playfair text-xl text-gold mb-6 border-b border-gray-dark pb-3">Search</h3>
                <div className="flex bg-primary-dark rounded border border-gray-dark focus-within:border-gold overflow-hidden transition-colors">
                  <input type="text" placeholder="Search articles..." className="bg-transparent text-white font-dm px-4 py-3 w-full outline-none text-sm" />
                  <button className="bg-gold text-primary-dark px-4 hover:bg-gold-light font-dm font-bold text-sm transition-colors">Go</button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-gray-charcoal p-8 rounded-lg border border-gray-dark shadow-light">
                <h3 className="font-playfair text-xl text-gold mb-6 border-b border-gray-dark pb-3">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <Link href="#" className="font-dm text-white/70 hover:text-gold text-sm flex items-center group transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 group-hover:bg-gold mr-3 transition-colors"></span>
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts Mini */}
              <div className="bg-gray-charcoal p-8 rounded-lg border border-gray-dark shadow-light">
                <h3 className="font-playfair text-xl text-gold mb-6 border-b border-gray-dark pb-3">Recent Posts</h3>
                <div className="space-y-6">
                  {blogPosts.slice(0,3).map(post => (
                    <div key={post.id} className="flex gap-4 group cursor-pointer" onClick={() => window.location.href=`/blog/${post.slug}`}>
                      <div className="w-16 h-16 rounded overflow-hidden shrink-0 relative">
                        <Image src={post.image} alt={post.title} fill sizes="64px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center">
                         <h4 className="font-cormorant text-white group-hover:text-gold transition-colors line-clamp-2 leading-tight mb-1">{post.title}</h4>
                         <span className="font-dm text-gray-500 text-xs">{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
