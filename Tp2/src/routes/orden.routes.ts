import { Router } from 'express';
import { orderSchema, orderStatusSchema } from '../validators/orderSchema';
import validate from '../middlewares/validate';

const orderController = require('../controllers/order.controller');

const orderRoute = Router();

orderRoute.get("/status", orderController.getOrdersByStatus);

orderRoute.get("/:id", orderController.getOrderById);

orderRoute.get("/", orderController.getAllOrders);

orderRoute.post("/", validate.validate(orderSchema), orderController.createOrder);

orderRoute.post("/:id/cancel", orderController.cancelOrder)

orderRoute.patch("/:id/status", validate.validate(orderStatusSchema), orderController.changeOrderStatus);

export default orderRoute;


