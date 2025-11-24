import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';
import Icon from './icon';

interface ButtonProps {
  href?: string;
  icon?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  ({ href, icon, onClick, children, className }, ref) => {
    const buttonClassName = clsx(
      'bg-gray flex cursor-pointer items-center gap-1.5 rounded-full text-black',
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

Button.displayName = 'Button';

export const HeaderButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  ({ href, icon, onClick, children, className }, ref) => {
    const buttonClassName = clsx(
      'bg-gray flex h-12 w-fit cursor-pointer items-center gap-1.5 rounded-full px-6 text-black md:h-9',
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
