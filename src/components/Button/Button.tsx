'use client';

import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/core';
import { buttonVariants } from '@/components/Button/Button.variant';

export type ButtonProps = VariantProps<typeof buttonVariants> &
  ComponentPropsWithoutRef<'button'> & {
    size?: 'small' | 'basic' | 'large';
    width?: 'fit' | 'full';
    height?: number;
  };

const customButton = (variants: VariantProps<typeof buttonVariants>) => {
  const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ size, width, height, className, ...props }, ref) => {
      const buttonStyle = {
        height: height ? `${height}px` : undefined,
      };

      return (
        <button
          className={cn(
            buttonVariants({ ...variants, size, width }),
            className,
          )}
          ref={ref}
          style={buttonStyle}
          {...props}
        />
      );
    },
  );
  Button.displayName = 'Button';
  return Button;
};

export const PrimaryButton = customButton({
  variant: 'primary',
});

export const SecondaryButton = customButton({
  variant: 'secondary',
});

export const OutlineButton = customButton({
  variant: 'outline',
});
