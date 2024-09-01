'use client';

import {
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useState,
} from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/core';
import Icon from '../Icon';
import { inputContainerVariants, inputVariants } from './Input.variant';

export type InputIconProps =
  | {
      isLeftIcon?: boolean;
    }
  | {
      isLeftIcon?: never;
    };

export type InputProps = ComponentPropsWithoutRef<'input'> &
  VariantProps<typeof inputVariants> &
  VariantProps<typeof inputContainerVariants> &
  InputIconProps & {
    onClear?: VoidFunction;
    includeButton?: boolean;
    onSubmit?: VoidFunction;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      borderRadius,
      className,
      bgcolor,
      isLeftIcon,
      includeButton = false,
      value,
      disabled,
      onClear = () => {},
      onSubmit = () => {},
      height,
      ...props
    }: InputProps,
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);
    return (
      <div className='flex items-center gap-4'>
        <div
          className={inputContainerVariants({
            isFocused,
            borderRadius,
            bgcolor,
            variant,
            height,
            disabled,
          })}
        >
          {isLeftIcon && <Icon name='search' width={15} height={15} />}
          <input
            className={cn(inputVariants(), className)}
            ref={ref}
            value={value}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {value && (
            <button onClick={onClear}>
              <Icon
                name='xmark'
                width={20}
                height={20}
                className='cursor-pointer'
              />
            </button>
          )}
        </div>
        {includeButton && (
          <button
            onClick={onSubmit}
            className='w-14 cursor-pointer items-center justify-center rounded bg-button'
            disabled={disabled || !value}
          >
            검색
          </button>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
