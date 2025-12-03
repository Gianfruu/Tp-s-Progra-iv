import { useState } from 'react';
import type { ReactNode } from 'react';
import { OrderContext } from './OrderContext';
import type { OrderItem } from './OrderContext';

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [message, setMessage] = useState<string>('');

  const addItem = (item: OrderItem) => {
    setOrder(prev => [...prev, item]);
  };

  const removeItem = (id: number) => {
    setOrder(prev => prev.filter(item => item.id !== id));
  };

  const total = order.reduce((acc, item) => acc + item.price, 0);

    const sendOrder = async () => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      setMessage('Pedido confirmado');
      setOrder([]);
    }
  };

  return (
    <OrderContext.Provider value={{ order, addItem, removeItem, total, sendOrder }}>
      {children}
      {message && <p>{message}</p>}
    </OrderContext.Provider>
  );
};
