import Link, { LinkProps } from 'next/link';
import { cn } from '@/utils/core';
import { navMenuVariants } from './NavMenu.variant';

interface NavMenuProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

const NavMenu = ({
  href,
  children,
  isActive = false,
  className,
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
