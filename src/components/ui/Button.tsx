'use client'

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
        // Base styles
        'relative px-4 py-2 rounded-full font-medium transition-all duration-300 ease-out',
        'transform hover:-translate-y-1 active:translate-y-0',
        
        // 3D effect styles
        'before:absolute before:inset-0 before:rounded-full before:transition-all before:duration-300',
        'before:hover:translate-y-1.5 before:active:translate-y-0',
        
        // Shadow effects
        'shadow-[0_6px_0] active:shadow-[0_0px_0] hover:shadow-[0_8px_0]',
        'before:shadow-[0_0_12px_rgba(0,0,0,0.2)]',
        
        // Variant-specific styles
        variant === 'primary' ? [
          'bg-blue-600 text-white',
          'shadow-blue-800',
          'hover:bg-blue-500',
          'active:bg-blue-700',
          'before:bg-blue-600/10'
        ] : [
          'bg-white text-slate-900',
          'shadow-slate-200',
          'hover:bg-slate-50',
          'active:bg-slate-100',
          'before:bg-slate-100/10'
        ],
        
        // Custom classes
        className
      )}
      {...props}
    />
  )
}

export default Button