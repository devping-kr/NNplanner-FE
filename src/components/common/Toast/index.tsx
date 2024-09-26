'use client';

import { useEffect } from 'react';
import { VariantProps } from 'class-variance-authority';
import Icon from '@/components/common/Icon';
import { progressVariants } from '@/components/common/Toast/Toast.variant';

export type ToastVariant = NonNullable<
  VariantProps<typeof progressVariants>['variant']
>;

type ToastProps = {
  message: string;
  variant: ToastVariant;
  duration?: number;
  onClose: () => void;
};

export type AnimateDuration = '1000' | '2000' | '3000';

const Toast = ({ message, variant, duration = 3000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className='text-white fixed right-6 top-1/4 w-80 rounded-lg border-[1px] border-gray-300 bg-white-100 p-4 shadow-lg'>
      <div className='mb-2 flex items-center gap-2'>
        <Icon name={variant} color={variant} />
        <span>{message}</span>
      </div>
      <div className='h-1.5 w-full overflow-hidden rounded-full bg-gray-200'>
        <div
          className={progressVariants({
            variant,
            duration: `${duration}` as AnimateDuration,
          })}
        />
      </div>
    </div>
  );
};

export default Toast;
