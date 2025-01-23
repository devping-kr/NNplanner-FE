'use client';

import { useState, useCallback } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/core';
import Dropdown from '@/components/common/Dropdown';
import OptionList from '@/components/common/OptionList';
import { selectboxVariants } from '@/components/common/Selectbox/Selectbox.variant';
import SelectButton from '@/components/common/SelectButton';
import { useToggleable } from '@/hooks/useToggleable';

export type Option = {
  value: string;
  label: string;
};

export type BgColor = 'grey' | 'white' | 'disabled';
export type ButtonSize = 'sm' | 'md';

// 리디자인 완성 후 삭제
export type Size = 'small' | 'basic' | 'large';

export type SelectboxProps = VariantProps<typeof selectboxVariants> & {
  options?: Option[];
  placeholder?: string;
  buttonSize?: ButtonSize;
  bgColor?: BgColor;
  className?: string;
  selectedValue?: string;
  readonly?: boolean;
  isError?: boolean;
  onChange?: (value: string) => void;
  // 추후 삭제
  size?: Size;
};

export const Selectbox = ({
  options,
  placeholder = '분류를 선택해주세요.',
  buttonSize = 'sm',
  bgColor = 'white',
  className,
  selectedValue,
  readonly = false,
  isError = false,
  onChange,
  // 추후 삭제
  size = 'basic',
}: SelectboxProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const {
    isOpen,
    toggle: handleToggle,
    close,
    ref: selectboxRef,
  } = useToggleable(readonly);

  const handleOptionSelect = useCallback(
    (value: string) => {
      if (readonly) return;
      setSelectedOption(value);
      // setIsOpen(false);
      close();
      onChange!(value);
    },
    [onChange, readonly],
  );

  const chosenOption =
    options?.find((option) => option.value === selectedOption)?.label ?? null;

  return (
    <div className={cn('relative h-fit')} ref={selectboxRef}>
      <div className={selectboxVariants({ isOpen })}>
        <SelectButton
          selectedOption={chosenOption ?? (selectedValue as string)}
          isOpen={isOpen}
          placeholder={placeholder}
          buttonSize={buttonSize}
          bgColor={bgColor}
          className={className}
          isError={isError}
          onClick={handleToggle}
          // 추후 삭제
          size={size}
        />
        {!readonly && options && (
          <Dropdown
            isOpen={isOpen}
            // 추후 삭제
            size={size}
          >
            <OptionList
              options={options}
              onSelect={handleOptionSelect}
              // 추후 삭제
              size={size}
            />
          </Dropdown>
        )}
      </div>
    </div>
  );
};
