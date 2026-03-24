import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col mb-4">
        {label && (
          <label className="font-dm text-sm font-semibold text-gold mb-2 flex items-center">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`bg-gray-charcoal text-white font-dm text-base px-4 py-3 rounded-[4px] border placeholder:text-white/50 transition-all duration-200 ease-out min-h-[120px] resize-y focus:outline-none focus:border-gold focus:shadow-[0_0_8px_rgba(212,175,55,0.3)] ${error ? 'border-error' : props.value ? 'border-success' : 'border-gray-dark'} ${className}`}
          {...props}
        />
        {error && <span className="text-error text-xs font-dm mt-1">{error}</span>}
        {helperText && !error && <span className="text-gray-400 text-xs font-dm mt-1">{helperText}</span>}
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';
