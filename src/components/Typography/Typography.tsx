'use client';

import { ComponentPropsWithoutRef, ElementType } from 'react';
import { VariantProps } from 'class-variance-authority';
import { typographyVariants } from './Typography.variant';

export type TypographyProps = VariantProps<typeof typographyVariants> &
  ComponentPropsWithoutRef<'p'>;

const customTypography = (
  element: ElementType,
  variants: VariantProps<typeof typographyVariants>,
) => {
  const Typography = ({ children, ...props }: TypographyProps) => {
    const Tag = element;
    return (
      <Tag className={typographyVariants(variants)} {...props}>
        {children}
      </Tag>
    );
  };
  return Typography;
};

export const HeadPrimary = customTypography('h1', {
  type: 'heading1',
  weight: 'bold',
});
export const BodyPrimary = customTypography('p', {
  type: 'body1',
});
export const Label = customTypography('label', {
  type: 'caption1',
  color: 'label',
});
