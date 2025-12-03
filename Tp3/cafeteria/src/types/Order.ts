import { z } from 'zod';
import { ProductSchema } from './Product';

export const OrderSchema = z.object({
  products: z.array(ProductSchema).min(1)
});

export type Order = z.infer<typeof OrderSchema>;