import Link, { LinkProps } from 'next/link';
import { cn } from '@/utils/core';
import { navMenuVariants } from './NavMenu.variant';

interface NavMenuProps extends Omit<LinkProps, 'href'> {
  isActive: boolean;
  className?: string;
  href: string;
  children: React.ReactNode;
}

const NavMenu = ({
  isActive,
  href,
  className = '',
  children,
  ...props
}: NavMenuProps) => {
  return (
    <Link
      href={href}
      className={cn(navMenuVariants({ isActive }), className)}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavMenu;
