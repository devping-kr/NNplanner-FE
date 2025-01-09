'use client';

import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/core';
import { buttonVariants } from '@/components/common/Button/Button.variant';

export type ButtonProps = VariantProps<typeof buttonVariants> &
  ComponentPropsWithoutRef<'button'> & {
    // redesign : xs, sm, md, lg 로 사이즈 교체
    size?: 'xSmall' | 'small' | 'basic' | 'large' | 'xs' | 'sm' | 'md' | 'lg';
    width?: 'fit' | 'full' | 'circular';
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size, width, className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, width }), className)}
        ref={ref}
        type='button'
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export default Button;
