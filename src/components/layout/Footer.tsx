"use client";
import React from 'react';
import Link from 'next/link';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube, 
  FaTiktok 
} from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary-dark pt-20 pb-8 border-t border-gray-dark">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="font-playfair text-2xl font-bold text-gold">
                USA LIMOS
              </span>
            </Link>
            <p className="text-white/70 font-dm text-sm leading-loose mb-6">
              {t('footer.companyInfo')}
            </p>
            <div className="flex flex-nowrap gap-3 justify-center md:justify-start">
              {[
                { Icon: FaFacebookF, href: "#", name: "Facebook" },
                { Icon: FaInstagram, href: "#", name: "Instagram" },
                { Icon: FaYoutube, href: "#", name: "YouTube" },
                { Icon: FaLinkedinIn, href: "#", name: "LinkedIn" },
                { Icon: FaXTwitter, href: "#", name: "X" },
                { Icon: FaTiktok, href: "#", name: "TikTok" }
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.href} 
                  className="w-10 h-10 rounded-full bg-gray-charcoal flex items-center justify-center text-white/70 hover:bg-gold hover:text-primary-dark hover:scale-110 shadow-lg transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-xl text-gold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4">
              {[
                { name: t('nav.about'), path: '/about' },
                { name: t('nav.services'), path: '/services' },
                { name: t('nav.fleet'), path: '/fleet' },
                { name: t('nav.blog'), path: '/blog' },
                { name: t('nav.contact'), path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-white/70 hover:text-gold transition-colors font-dm text-sm flex items-center group">
                    <span className="block h-[1px] w-0 bg-gold mr-0 group-hover:w-4 group-hover:mr-3 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-xl text-gold mb-6">{t('footer.services')}</h4>
            <ul className="space-y-4">
              {['Airport Transfer', 'Wedding Limousine', 'Corporate Travel', 'Events & Parties'].map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-white/70 hover:text-gold transition-colors font-dm text-sm flex items-center group">
                    <span className="block h-[1px] w-0 bg-gold mr-0 group-hover:w-4 group-hover:mr-3 transition-all duration-300"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-playfair text-xl text-gold mb-6">{t('footer.areas')}</h4>
            <ul className="space-y-4">
              {['California', 'New Jersey', 'Chicago, IL', 'Florida', 'Texas', 'Atlanta, GA'].map((area) => (
                <li key={area}>
                  <Link href="/contact" className="text-white/70 hover:text-gold transition-colors font-dm text-sm flex items-center group">
                    <span className="block h-[1px] w-0 bg-gold mr-0 group-hover:w-4 group-hover:mr-3 transition-all duration-300"></span>
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-xl text-gold mb-6">{t('footer.contactInfo')}</h4>
            <ul className="space-y-6">
              <li className="flex items-start">
                <FiPhone className="text-gold mt-1 mr-4 shrink-0" size={20} />
                <div>
                  <p className="font-dm text-white/50 text-xs mb-1 uppercase">{t('footer.reservations')}</p>
                  <a href="tel:+18005550199" className="font-dm text-white/90 hover:text-gold transition-colors">
                    +1-800-555-0199
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <FiMail className="text-gold mt-1 mr-4 shrink-0" size={20} />
                <div>
                  <p className="font-dm text-white/50 text-xs mb-1 uppercase">{t('footer.emailUs')}</p>
                  <a href="mailto:info@usalimosservice.com" className="font-dm text-white/90 hover:text-gold transition-colors">
                    info@usalimosservice.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <FiMapPin className="text-gold mt-1 mr-4 shrink-0" size={20} />
                <div>
                  <p className="font-dm text-white/50 text-xs mb-1 uppercase">{t('footer.headquarters')}</p>
                  <p className="font-dm text-white/90 leading-relaxed text-sm">
                    7756 Shorthorn Way<br />
                    Fort Worth, Texas, 76131
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-charcoal flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/50 font-dm text-sm mb-4 md:mb-0" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} USA Limos Service. {t('footer.rights')}
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-white/50 hover:text-white font-dm text-sm transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-white font-dm text-sm transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
