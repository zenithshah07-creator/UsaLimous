import React from 'react';
import Link from 'next/link';
import { FiInstagram, FiFacebook, FiLinkedin, FiTwitter, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-primary-dark pt-20 pb-8 border-t border-gray-dark">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="font-playfair text-2xl font-bold text-gold">
                USA LIMOS
              </span>
            </Link>
            <p className="text-white/80 font-dm text-sm leading-loose mb-6">
              Experience the pinnacle of luxury travel. Premium chauffeur and limousine services across the United States. Available 24/7 for your exquisite journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-charcoal flex items-center justify-center text-white hover:bg-gold hover:text-primary-dark transition-all duration-300">
                <FiInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-charcoal flex items-center justify-center text-white hover:bg-gold hover:text-primary-dark transition-all duration-300">
                <FiFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-charcoal flex items-center justify-center text-white hover:bg-gold hover:text-primary-dark transition-all duration-300">
                <FiTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-charcoal flex items-center justify-center text-white hover:bg-gold hover:text-primary-dark transition-all duration-300">
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-xl text-gold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Services', 'Premium Fleet', 'Luxury Blog', 'Contact Us'].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-white/80 hover:text-gold transition-colors font-dm text-sm flex items-center group">
                    <span className="w-2 h-2 rounded-full bg-gold mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-xl text-gold mb-6">Services</h4>
            <ul className="space-y-4">
              {['Airport Transfer', 'Wedding Limousine', 'Corporate Travel', 'Events & Parties'].map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-white/80 hover:text-gold transition-colors font-dm text-sm flex items-center group">
                    <span className="block h-[1px] w-0 bg-gold mr-0 group-hover:w-4 group-hover:mr-3 transition-all duration-300"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-xl text-gold mb-6">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex items-start">
                <FiPhone className="text-gold mt-1 mr-4 shrink-0" size={20} />
                <div>
                  <p className="font-dm text-white/60 text-xs mb-1">24/7 RESERVATIONS</p>
                  <a href="tel:+18005550199" className="font-dm text-white hover:text-gold transition-colors">
                    +1-800-555-0199
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <FiMail className="text-gold mt-1 mr-4 shrink-0" size={20} />
                <div>
                  <p className="font-dm text-white/60 text-xs mb-1">EMAIL US</p>
                  <a href="mailto:info@usalimosservice.com" className="font-dm text-white hover:text-gold transition-colors">
                    info@usalimosservice.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <FiMapPin className="text-gold mt-1 mr-4 shrink-0" size={20} />
                <div>
                  <p className="font-dm text-white/60 text-xs mb-1">HEADQUARTERS</p>
                  <p className="font-dm text-white leading-relaxed text-sm">
                    123 Luxury Ave, Suite 500<br />
                    New York, NY 10001
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-charcoal flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/50 font-dm text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} USA Limos Service. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-white/50 hover:text-white font-dm text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-white font-dm text-sm transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
