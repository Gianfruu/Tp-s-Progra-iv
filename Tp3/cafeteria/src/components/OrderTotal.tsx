import { useOrder } from '../hooks/useOrder';

export const OrderTotal = () => {
  const { total } = useOrder();

  return <p>Total: ${total}</p>;
};