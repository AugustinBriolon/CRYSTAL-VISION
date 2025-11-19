import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';
import Icon from './icon';

interface HeaderButtonProps {
  href?: string;
  icon?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const HeaderButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, HeaderButtonProps>(
  ({ href, icon, onClick, children, className }, ref) => {
    const buttonClassName = clsx(
      'bg-gray flex h-9 w-fit items-center gap-1.5 rounded-full px-5 text-black',
      className,
    );

    return href ? (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={buttonClassName}
        href={href}
        onClick={onClick}
      >
        {icon && <Icon name={icon} />}
        {children}
      </Link>
    ) : (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={buttonClassName}
        onClick={onClick}
      >
        {icon && <Icon name={icon} />}
        {children}
      </button>
    );
  },
);

HeaderButton.displayName = 'HeaderButton';
