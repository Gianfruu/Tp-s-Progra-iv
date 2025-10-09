
import { beforeEach, test, describe, expect } from '@jest/globals';
import { orderService } from '../../services/order.service';

describe('OrdersService - test unitario', () => {
    let svc: typeof orderService;

    beforeEach(() => {
        svc = orderService;
    });

    test('crea una orden y calcula el precio', () => {
        const order = svc.createOrder(
            'M',
            ['a', 'b'],
            [{ name: 'pizza' }, { name: 'soda' }],
            '1234 Long Street'
        );

        expect(order.id).toBeDefined();
        expect(order.toppings.length).toBe(2);
        expect(order.items.length).toBe(2);
        expect(order.size).toBe('M');
        expect(order.price).toBeCloseTo(10 + 2 * 1.5);
        expect(order.status).toBe('preparing');
    });

    test('lanza error cuando hay más de 5 ingredientes', () => {
        expect(() =>
            svc.createOrder(
                'S',
                ['a', 'b', 'c', 'd', 'e', 'f'],
                [{ name: 'pizza' }],
                '1234 Siempreviva'
            )
        ).toThrow('Too many toppings');
    });

    test('lanza error cuando los items están vacíos', () => {
        expect(() =>
            svc.createOrder(
                'L',
                ['a', 'b'],
                [],
                '1234 Siempreviva'
            )
        ).toThrow('Not enough items');
    });

    test('lanza error cuando se intenta cancelar una orden entregada', () => {
        const o = svc.createOrder(
            'S',
            [],
            [{ name: 'pizza' }],
            '1234 Siempreviva'
        );
        svc.changeOrderStatus(o.id, 'delivered');
        expect(() => svc.cancelOrder(o.id)).toThrow('CANNOT_CANCEL');
    });

    test('cancela una orden en estado preparando', () => {
        const o = svc.createOrder(
            'S',
            ['a', 'b'],
            [{ name: 'pizza' }],
            '1234 Siempreviva'
        );
        const c = svc.cancelOrder(o.id);
        expect(c.status).toBe('cancelled');
    });
});
