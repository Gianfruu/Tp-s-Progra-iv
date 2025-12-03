import { useOrder } from '../hooks/useOrder';

export const SendOrderButton = () => {
  const { sendOrder } = useOrder();

  return <button onClick={sendOrder}>Enviar pedido</button>;
};
