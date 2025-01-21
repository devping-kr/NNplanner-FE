'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/core';
import Dropdown from '@/components/common/Dropdown';
import OptionList from '@/components/common/OptionList';
import { selectboxVariants } from '@/components/common/Selectbox/Selectbox.variant';
import SelectButton from '@/components/common/SelectButton';

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
  size = 'basic',
  buttonSize = 'sm',
  bgColor = 'white',
  className,
  selectedValue,
  readonly = false,
  isError = false,
  onChange,
}: SelectboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const selectboxRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    if (!readonly) {
      setIsOpen((prev) => !prev);
    }
  }, [readonly]);

  const handleOptionSelect = useCallback(
    (value: string) => {
      if (readonly) return;
      setSelectedOption(value);
      setIsOpen(false);
      onChange!(value);
    },
    [onChange, readonly],
  );

  // TODO: isOpen state랑 합쳐서 훅으로 분리하기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectboxRef.current &&
        !selectboxRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const chosenOption =
    options?.find((option) => option.value === selectedOption)?.label ?? null;

  return (
    <div className={cn('relative h-fit')} ref={selectboxRef}>
      <div className={selectboxVariants({ isOpen })}>
        <SelectButton
          selectedOption={chosenOption ?? (selectedValue as string)}
          placeholder={placeholder}
          size={size}
          buttonSize={buttonSize}
          bgColor={bgColor}
          onClick={handleToggle}
          isOpen={isOpen}
          className={className}
          isError={isError}
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
