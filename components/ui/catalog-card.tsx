import Image from 'next/image';
import { forwardRef } from 'react';
import { Button } from './button';

interface CatalogCardProps {
  img: string;
  title: string;
  price: number;
}

const CatalogCard = forwardRef<HTMLDivElement, CatalogCardProps>(({ img, title, price }, ref) => {
  return (
    <div
      ref={ref}
      className="flex h-[calc(100vh-10%)] max-h-[800px] min-h-[600px] w-[400px] shrink-0 flex-col items-center justify-start gap-6 px-4"
    >
      <div className="bg-gray relative h-3/4 overflow-hidden rounded-2xl">
        <Image
          alt={title}
          className="h-full w-full object-cover object-center"
          height={1200}
          src={img}
          width={1200}
          priority
        />
      </div>
      <div className="flex h-1/4 flex-col items-center gap-3 text-black">
        <h3 className="text-center">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span>{price}</span>
          <span>$</span>
        </div>
        <Button className="border bg-transparent px-6 py-2.5 text-black">Add to cart</Button>
      </div>
    </div>
  );
});

CatalogCard.displayName = 'CatalogCard';

export default CatalogCard;
