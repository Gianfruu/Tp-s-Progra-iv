import { Request, Response } from 'express';
import { orderService } from '../services/order.service';
import errorsConstants from '../const/errors';
import { OrderStatus } from '../models/order.model';

module.exports = {

    async createOrder(req: Request, res: Response, next: Function) {
        try {
            const { size, toppings, items, address } = req.body;
            const newOrder = orderService.createOrder(size, toppings, items, address);
            return res.status(201).json(newOrder);
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === "Not enough items") {
                    return res.status(errorsConstants.NO_ITEMS.code).json({ error: errorsConstants.NO_ITEMS.message });
                }
                if (error.message === "Too many toppings") {
                    return res.status(errorsConstants.TOO_MANY_TOPPINGS.code).json({ error: errorsConstants.TOO_MANY_TOPPINGS.message });
                }
                if (error.message === "Address is too short") {
                    return res.status(errorsConstants.ADDRESS_TOO_SHORT.code).json({ error: errorsConstants.ADDRESS_TOO_SHORT.message });
                }
            }
            return res.status(500).json({ error: 'internal_server_error' });
        }
    },

    async changeOrderStatus(req: Request, res: Response, next: Function) {
        try {
            const { id } = req.params;
            const { status } = req.query;
            const updatedOrder = orderService.changeOrderStatus(String(id), status as OrderStatus);
            return res.json(updatedOrder);
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === "ORDER_NOT_FOUND") {
                    return res.status(errorsConstants.ORDER_NOT_FOUND.code).json({ error: errorsConstants.ORDER_NOT_FOUND.message });
                }
            }
            return res.status(500).json({ error: 'internal_server_error' });
        }
    },

    async getOrdersByStatus(req: Request, res: Response, next: Function) {
        try {
            const { status } = req.query;
            const orders = orderService.getOrdersByStatus(status as OrderStatus);
            return res.json(orders);
        }
        catch (error) {
            return res.status(500).json({ error: 'internal_server_error' });
        }
    },

    async getAllOrders(req: Request, res: Response, next: Function) {
        try {
            const orders = orderService.getAllOrders();
            return res.json(orders);
        }
        catch (error) {
            return res.status(500).json({ error: 'internal_server_error' });
        }
    },

    async getOrderById(req: Request, res: Response, next: Function) {
        try {
            const { id } = req.params;
            const order = orderService.getOrderById(String(id));
            if (order) {
                return res.json(order);
            } else {
                return res.status(errorsConstants.ORDER_NOT_FOUND.code).json({ error: errorsConstants.ORDER_NOT_FOUND.message });
            }
        }
        catch (error) {
            return res.status(500).json({ error: 'internal_server_error' });
        }
    },

    async cancelOrder(req: Request, res: Response, next: Function) {
        try {
            const { id } = req.params;
            const cancelledOrder = orderService.cancelOrder(String(id));
            return res.json(cancelledOrder);
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === "ORDER_NOT_FOUND") {
                    return res.status(errorsConstants.ORDER_NOT_FOUND.code).json({ error: errorsConstants.ORDER_NOT_FOUND.message });
                }
                if (error.message === "CANNOT_CANCEL") {
                    return res.status(errorsConstants.CANNOT_CANCEL.code).json({ error: errorsConstants.CANNOT_CANCEL.message });
                }
            }
            return res.status(500).json({ error: 'internal_server_error' });
        }
    }
}