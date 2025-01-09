'use client';

import { useEffect } from 'react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/core';
import Icon from '@/components/common/Icon';
import { toastVariants } from '@/components/common/Toast/Toast.variant';

export type ToastVariant = NonNullable<
  VariantProps<typeof toastVariants>['variant']
>;

type ToastProps = {
  message: string;
  variant: ToastVariant;
  duration?: number;
  onClose: () => void;
};

const Toast = ({ message, variant, duration, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        toastVariants({ variant }),
        'fixed bottom-10 right-10 z-50 rounded-lg border border-grey-100 p-4',
      )}
    >
      <div className='flex items-center gap-2'>
        <Icon
          name={variant}
          color={variant === 'warning' ? 'warning' : 'black'}
          width={24}
          height={24}
        />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
