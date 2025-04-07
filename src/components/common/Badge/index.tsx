import { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/common/Badge/Badge.variant';
import {
  Body3Black,
  Body3Blue,
  Body3Red,
  SubTitle3Black,
  SubTitle3Blue,
  SubTitle3Red,
} from '@/components/common/Typography';

export type BadgeProps = VariantProps<typeof badgeVariants> & {
  text: string;
  textType: 'body' | 'subtitle';
};

const typographyMap = {
  body: {
    default: Body3Black,
    outline: Body3Black,
    blue: Body3Blue,
    red: Body3Red,
  },
  subtitle: {
    default: SubTitle3Black,
    outline: SubTitle3Black,
    blue: SubTitle3Blue,
    red: SubTitle3Red,
  },
};

const Badge = ({
  variant = 'default',
  size = 's',
  text,
  textType,
}: BadgeProps) => {
  const TextTypo =
    typographyMap[textType]?.[variant ?? 'default'] || Body3Black;

  return (
    <div className={badgeVariants({ variant, size })}>
      <TextTypo>{text}</TextTypo>
    </div>
  );
};

export default Badge;
