import NumberFlow, { NumberFlowProps } from '@number-flow/react';

const SafeNumberFlow = ({ value, className, ...props }: NumberFlowProps) => {
  const isClient = typeof window !== 'undefined';
  const canUseNumberFlow = isClient && 'attachInternals' in HTMLElement.prototype;

  if (!isClient) {
    return <span className={className}>{value}</span>;
  }

  if (!canUseNumberFlow) {
    return <span className={className}>{value}</span>;
  }

  return <NumberFlow className={className} value={value} {...props} />;
};

export default SafeNumberFlow;
