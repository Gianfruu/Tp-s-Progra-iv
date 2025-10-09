import { z } from 'zod';

export const sizeEnum = z.enum(['S', 'M', 'L']);

export const orderSchema = z.object({
    size: sizeEnum,
    toppings: z.array(z.string()).max(5, { message: 'Too many toppings' }).optional().default([]),
    items: z.array(z.object({ name: z.string().min(1, { message: 'Not enough items' }) })).min(1),
    address: z.string().min(10, { message: 'Address is too short' })
});

export const orderStatusSchema = z.object({
    status: z.enum(['preparing', 'delivered', 'cancelled']).optional()
});