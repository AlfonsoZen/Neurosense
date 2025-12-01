import React from 'react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const CyberButton: React.FC<CyberButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "relative px-8 py-3.5 rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none overflow-hidden group border";
  
  const variants = {
    primary: "text-neuro-base bg-white border-white hover:bg-gray-200 hover:border-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    secondary: "text-neuro-primary bg-transparent border-neuro-border hover:border-neuro-accent/50 hover:bg-neuro-accent/5"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10 flex items-center gap-3 justify-center">{children}</span>
    </button>
  );
};