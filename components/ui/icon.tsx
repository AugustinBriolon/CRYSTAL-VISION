import clsx from 'clsx';
import { ShoppingBag } from 'lucide-react';

export default function Icon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case 'shopping-bag':
      return <ShoppingBag className={clsx('h-4 w-4', className)} />;
    default:
      return null;
  }
}
