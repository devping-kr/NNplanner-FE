'use client';

import {
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useState,
} from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/core';
import Button from '../Button/Button';
import Icon from '../Icon';
import { inputContainerVariants, inputVariants } from './Input.variant';

export type InputIconProps =
  | {
      isLeftIcon?: boolean;
      isRightIcon?: boolean;
      rightIcon?: string;
    }
  | {
      isLeftIcon?: never;
      isRightIcon?: never;
      rightIcon?: string;
    };

export type InputProps = ComponentPropsWithoutRef<'input'> &
  VariantProps<typeof inputVariants> &
  VariantProps<typeof inputContainerVariants> &
  InputIconProps & {
    rightIconAction?: VoidFunction;
    includeButton?: boolean;
    buttonText?: string;
    onSubmit?: VoidFunction;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      borderRadius,
      className,
      bgcolor,
      height,
      isLeftIcon = false,
      isRightIcon = false,
      rightIcon = '',
      includeButton = false,
      value,
      disabled,
      rightIconAction = () => {},
      onSubmit = () => {},
      buttonText = '검색',
      isError,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    return (
      <div
        className={inputContainerVariants({
          isFocused,
          borderRadius,
          bgcolor,
          variant,
          height,
          disabled,
          isError,
        })}
      >
        {isLeftIcon && <Icon name='search' width={22} height={22} />}
        <input
          className={cn(inputVariants({ height }), className)}
          ref={ref}
          value={value}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {isRightIcon && rightIcon && (
          <button
            onClick={!disabled ? () => rightIconAction() : undefined}
            type='button'
          >
            <Icon
              name={rightIcon}
              width={height === 's' ? 20 : 24}
              height={height === 's' ? 20 : 24}
              className={`cursor-pointer ${disabled ? 'cursor-not-allowed' : ''}`}
            />
          </button>
        )}
        {includeButton && (
          <Button
            type='button'
            onClick={onSubmit}
            className='w-14 cursor-pointer items-center justify-center rounded px-0 py-1'
            size='small'
            width='fit'
            disabled={disabled || !value}
          >
            {buttonText}
          </Button>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
