import clsx from 'clsx';
import React from 'react';

export default function ProgressivBlur({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="relative">
      <div className={clsx('z-99', className)}>{children}</div>
      <div className="progressive-blur-container pointer-events-none absolute inset-0 -z-1 h-full w-full">
        <div className="blur-filter absolute inset-0"></div>
        <div className="blur-filter absolute inset-0"></div>
        <div className="blur-filter absolute inset-0"></div>
        <div className="blur-filter absolute inset-0"></div>
        <div className="blur-filter absolute inset-0"></div>
        <div className="blur-filter absolute inset-0"></div>
        <div className="blur-filter absolute inset-0"></div>
      </div>
    </div>
  );
}
