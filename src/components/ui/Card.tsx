import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'standard' | 'dark' | 'gold-accent-left' | 'gold-accent-top';
  hoverEffect?: boolean;
}

export function Card({ children, className = '', variant = 'standard', hoverEffect = true }: CardProps) {
  const baseStyles = "rounded-lg transition-all duration-300 ease-out";
  
  const variants = {
    standard: "bg-gray-charcoal border border-gray-dark p-6 shadow-light",
    dark: "bg-primary-dark border border-gray-charcoal p-6 shadow-subtle",
    "gold-accent-left": "bg-gray-charcoal border border-gray-dark border-l-4 border-l-gold p-8 shadow-light",
    "gold-accent-top": "bg-gray-charcoal border border-gray-dark border-t-4 border-t-gold p-8 shadow-light",
  };

  const hoverStyles = hoverEffect 
    ? "hover:shadow-medium hover:-translate-y-1 hover:border-gold lg:hover:shadow-medium lg:hover:-translate-y-1 lg:hover:border-gold cursor-pointer" 
    : "";

  return (
    <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
