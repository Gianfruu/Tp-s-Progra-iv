import { createContext } from 'react';

type OrderItem = {
  id: number;
  name: string;
  price: number;
};

type OrderContextType = {
  order: OrderItem[];
  addItem: (item: OrderItem) => void;
  removeItem: (id: number) => void;
  total: number;
  sendOrder: () => Promise<void>;
};


export const OrderContext = createContext<OrderContextType | undefined>(undefined);
export type { OrderItem, OrderContextType };