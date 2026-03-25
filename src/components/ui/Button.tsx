"use client";
import React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "transition-all duration-300 ease-out flex items-center justify-center";
  
  const variants = {
    primary: "bg-gold text-primary-dark font-dm font-bold text-base py-4 px-8 rounded-full shadow-lg hover:-translate-y-[2px] hover:bg-gold-light hover:shadow-gold/40 active:translate-y-0 active:bg-gold-muted glow-gold disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-transparent text-gold font-dm font-semibold text-base py-4 px-8 border-2 border-gold rounded-full hover:bg-[rgba(212,175,55,0.08)] hover:border-gold-light hover:text-gold-light active:bg-[rgba(212,175,55,0.15)]",
    tertiary: "bg-transparent text-white border border-white py-3 px-6 hover:bg-white/10 rounded-full",
    icon: "w-10 h-10 rounded-full bg-transparent text-white hover:bg-[rgba(212,175,55,0.1)] hover:text-gold hover:scale-110 flex items-center justify-center"
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </motion.button>
  );
}
