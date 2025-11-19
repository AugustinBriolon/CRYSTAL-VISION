import { useActiveSection } from '@/hooks/useActiveSection';
import clsx from 'clsx';

export default function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  useActiveSection(id);

  return (
    <section className={clsx('min-h-dvh w-full', className)} id={id}>
      {children}
    </section>
  );
}
