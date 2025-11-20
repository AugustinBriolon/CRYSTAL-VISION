import clsx from 'clsx';
import { forwardRef } from 'react';

const Section = forwardRef<
  HTMLElement,
  { children: React.ReactNode; className?: string; color?: 'white' | 'black' }
>(({ children, className, color = 'white' }, ref) => {
  return (
    <section
      ref={ref}
      className={clsx(
        'h-dvh min-h-dvh w-full',
        color === 'white' ? 'bg-white' : 'bg-black',
        className,
      )}
    >
      <div className="mx-auto h-full max-w-screen-xl">{children}</div>
    </section>
  );
});

Section.displayName = 'Section';

export default Section;
