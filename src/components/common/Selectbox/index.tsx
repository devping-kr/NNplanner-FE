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

export type Size = 'small' | 'basic' | 'large';

export type SelectboxProps = VariantProps<typeof selectboxVariants> & {
  options: Option[];
  placeholder?: string;
  size?: Size;
  className?: string;
  onChange?: (value: string) => void;
};

export const Selectbox = ({
  options,
  placeholder = '옵션을 선택하세요',
  size = 'small',
  className,
  onChange,
}: SelectboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const selectboxRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleOptionSelect = useCallback(
    (value: string) => {
      setSelectedOption(value);
      setIsOpen(false);
      onChange?.(value);
    },
    [onChange],
  );

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
    options.find((option) => option.value === selectedOption)?.label ?? null;

  return (
    <div className={cn('relative h-fit', className)} ref={selectboxRef}>
      <div className={selectboxVariants({ isOpen })}>
        <SelectButton
          selectedOption={chosenOption}
          placeholder={placeholder}
          size={size}
          onClick={handleToggle}
          isOpen={isOpen}
        />
        <Dropdown isOpen={isOpen} size={size}>
          <OptionList
            options={options}
            size={size}
            onSelect={handleOptionSelect}
          />
        </Dropdown>
      </div>
    </div>
  );
};
