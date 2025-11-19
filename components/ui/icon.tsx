import clsx from 'clsx';
import { ShoppingBag } from 'lucide-react';

export default function Icon({ name, className }: { name: string, className?: string }) {
  switch (name) {
    case 'shopping-bag':
      return <ShoppingBag className={clsx('w-4 h-4', className)} />;
    default:
      return null;
  }
}
