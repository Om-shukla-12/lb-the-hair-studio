import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    
    const baseStyles = "font-label-sm text-label-sm uppercase px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 tracking-widest inline-flex items-center justify-center";
    
    const variants = {
      primary: "btn-primary text-on-primary shadow-[0_10px_30px_rgba(87,0,0,0.1)]",
      outline: "border border-outline text-on-surface hover:bg-surface-container-high",
      ghost: "text-on-surface hover:bg-surface-container-low"
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
