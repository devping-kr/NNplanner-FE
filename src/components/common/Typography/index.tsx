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
  color: 'dark',
});
export const Label = customTypography('label', {
  type: 'subLabel1',
  color: 'darken',
});
export const BodyGray = customTypography('p', {
  type: 'body3',
  color: 'gray',
});
export const AuthTitle = customTypography('h1', {
  type: 'authTitle',
  weight: 'bold',
});
export const MealHeaderTitle = customTypography('h1', {
  type: 'mealHeaderTitle',
  weight: 'bold',
  color: 'dark',
});
export const PageHeaderTitle = customTypography('h1', {
  type: 'pageHeaderTitle',
  weight: 'bold',
  color: 'dark',
});

export const CardTitle = customTypography('h1', {
  type: 'title2',
  weight: 'bold',
  color: 'dark',
});
export const MealCalenderTitle = customTypography('span', {
  type: 'mealCalendarTitle',
  color: 'dark',
});
export const NutritionDate = customTypography('h2', {
  type: 'title2',
  color: 'dark',
});
export const NutritionMenu = customTypography('h3', {
  type: 'title3',
  color: 'dark',
});
export const NutritionEtc = customTypography('h4', {
  type: 'title4',
  color: 'gray',
  weight: 'normal',
});
