'use client'

// src/components/ui/Button.tsx
import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

const Button = ({
  className,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-full font-medium transition-all duration-300 ease-in-out',
        variant === 'primary' 
          ? 'bg-slate-900 text-white hover:bg-slate-800' 
          : 'bg-white/90 text-slate-900 hover:bg-white',
        'transform hover:scale-105',
        className
      )}
      {...props}
    />
  )
}

export default Button