import clsx from 'clsx';
import { forwardRef } from 'react';

const Section = forwardRef<
  HTMLElement,
  { id?: string; children: React.ReactNode; className?: string; color?: 'white' | 'black' }
>(({ id, children, className, color = 'white' }, ref) => {
  return (
    <section
      ref={ref}
      id={id}
      className={clsx(
        'block h-dvh min-h-dvh w-full',
        color === 'white' ? 'bg-white' : 'bg-black',
        className,
      )}
    >
      <div className="mx-auto h-fit max-w-screen-xl">{children}</div>
    </section>
  );
});

export default Section;
