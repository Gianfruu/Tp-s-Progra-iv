import { Order, OrderItem, OrderStatus, Size, SIZE_BASE_PRICE, TOPPING_PRICE } from '../models/order.model';

class OrderService {
    private orders: Order[] = [];
    private idCounter = 1;

    createOrder(size: Size, toppings: string[], items: OrderItem[], address: string): Order {

        if (items.length === 0) {
            throw new Error("Not enough items");
        }
        if (toppings.length > 5) {
            throw new Error("Too many toppings");
        }
        if (!address || address.length < 10) {
            throw new Error("Address is too short");
        }

        const price = SIZE_BASE_PRICE[size] + (toppings.length * TOPPING_PRICE);
        const newOrder: Order = {
            id: (this.idCounter++).toString(),
            size,
            toppings,
            items,
            address,
            price,
            status: 'preparing'
        };
        this.orders.push(newOrder);
        return newOrder;
    }

    getOrderById(id: string): Order | undefined {
        return this.orders.find(order => order.id === id);
    }

    getAllOrders(): Order[] {
        return this.orders;
    }

    getOrdersByStatus(status: OrderStatus): Order[] {
        return this.orders.filter(order => order.status === status);
    }

    changeOrderStatus(id: string, status: OrderStatus): Order {
        const order = this.getOrderById(id);
        if (order) {
            order.status = status;
            return order;
        } else {
            throw new Error("ORDER_NOT_FOUND");
        }
    }

    cancelOrder(id: string): Order {
        const order = this.getOrderById(id);
        if (order) {
            if (order.status === 'preparing') {
                order.status = 'cancelled';
                return order;
            } else {
                throw new Error("CANNOT_CANCEL");
            }
        }
        throw new Error("ORDER_NOT_FOUND");
    }
}

export const orderService = new OrderService();