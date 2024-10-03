import { useState, ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';
import { tooltipVariants } from '@/components/common/Tooltip/Tooltip.variant';

export type TooltipVariant = VariantProps<typeof tooltipVariants>['position'];

type TooltipProps = {
  children: ReactNode;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
};

const Tooltip = ({ children, content, position = 'top' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='relative inline-block'>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={tooltipVariants({ position })}
          role='tooltip'
          aria-hidden={!isVisible}
        >
          <p>{content}</p>
          <div className='tooltip-arrow' data-popper-arrow></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
