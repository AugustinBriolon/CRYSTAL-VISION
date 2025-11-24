import clsx from 'clsx';
import { ShoppingBag } from 'lucide-react';

export default function Icon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case 'shopping-bag':
      return <ShoppingBag className={clsx('h-6 w-6 md:h-4 md:w-4', className)} />;
    default:
      return null;
  }
}
