export type Size = 'S' | 'M' | 'L';

export const SIZE_BASE_PRICE: Record<Size, number> = {
    S: 8,
    M: 10,
    L: 12
};

export const TOPPING_PRICE = 1.5;

export type OrderStatus = 'preparing' | 'delivered' | 'cancelled';

export interface OrderItem {
    name: string;
}

export interface Order {
    id: string;
    size: Size;
    toppings: string[];
    items: OrderItem[];
    address: string;
    price: number;
    status: OrderStatus;

}