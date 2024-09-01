import { ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/core';
import { dropdownVariants } from '@/components/Dropdown/Dropdown.variant';

export type DropdownProps = VariantProps<typeof dropdownVariants> & {
  children: ReactNode;
  isOpen: boolean;
  size?: 'small' | 'basic' | 'large';
  className?: string;
  onClose?: () => void;
};

const Dropdown = ({ children, isOpen, size, className }: DropdownProps) => {
  return (
    <div className={cn(dropdownVariants({ isOpen, size }), className)}>
      {children}
    </div>
  );
};

export default Dropdown;
