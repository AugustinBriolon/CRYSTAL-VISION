import Image from 'next/image';
import { forwardRef } from 'react';
import SafeNumberFlow from '../shared/safe-number-flow';
import { Button } from './button';

interface CatalogCardProps {
  img: string;
  title: string;
  price: number;
}

const CatalogCard = forwardRef<HTMLDivElement, CatalogCardProps>(({ img, title, price }, ref) => {
  return (
    <div ref={ref} className="flex shrink-0 flex-col items-center justify-center gap-6 px-4">
      <div className="bg-gray relative flex h-[400px] w-[300px] items-center justify-center overflow-hidden rounded-2xl md:h-[600px] md:w-[450px] md:max-h-[60vh] md:max-w-[30vw]">
        <Image
          alt={title}
          className="h-full w-full object-cover object-center"
          height={1200}
          src={img}
          width={1200}
          unoptimized
        />
      </div>
      <div className="flex flex-col items-center gap-3 text-black">
        <h3 className="text-center">{title}</h3>
        <div className="flex items-baseline gap-1">
          <SafeNumberFlow format={{ style: 'decimal', maximumFractionDigits: 0 }} value={price} />
          <span>$</span>
        </div>
        <Button className="border bg-transparent px-6 py-2.5 text-black">Add to cart</Button>
      </div>
    </div>
  );
});

CatalogCard.displayName = 'CatalogCard';

export default CatalogCard;
