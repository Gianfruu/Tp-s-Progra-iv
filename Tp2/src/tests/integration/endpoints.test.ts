import { beforeEach, test, describe, expect, it } from '@jest/globals';
import Server from '../../app';
import request from 'supertest';


describe('POST /orders', () => {
    it('debería crear una nueva orden y devolverla con el precio total', async () => {
        const server = new Server(3000);
        const app = server.app;

        const res = await request(app)
            .post('/orders')
            .send({
                size: "M",
                toppings: ['queso'],
                items: [{ name: 'pizza' }],
                address: '1234 Siempreviva'
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.size).toBe('M');
        expect(res.body.toppings).toEqual(['queso']);
        expect(res.body.price).toBeGreaterThan(0);
    });

    it('debería devolver 422 para orden sin items', async () => {
        const server = new Server(3000);
        const app = server.app;

        const res = await request(app)
            .post('/orders')
            .send({
                size: 'M',
                toppings: ['queso'],
                items: [],
                address: '1234 Siempreviva'
            });

        expect(res.status).toBe(422);
        expect(res.body.error).toBe('No ha ingresado ningun item');
    });
});

describe('GET /orders/:id', () => {
    it('debería devolver una orden existente por ID', async () => {
        const server = new Server(3000);
        const app = server.app;


        const createRes = await request(app)
            .post('/orders')
            .send({
                size: 'L',
                toppings: ['pepperoni'],
                items: [{ name: 'pizza' }],
                address: '1234 Siempreviva'
            });

        const orderId = createRes.body.id;


        const getRes = await request(app).get(`/orders/${orderId}`);

        expect(getRes.status).toBe(200);
        expect(getRes.body.id).toBe(orderId);
        expect(getRes.body.size).toBe('L');
    });

    it('debería devolver 404 para una orden inexistente', async () => {
        const server = new Server(3000);
        const app = server.app;

        const res = await request(app).get('/orders/5');

        expect(res.status).toBe(404);
    });
});

describe('POST /orders/:id/cancel', () => {
    it('debería cancelar una orden en estado "preparing"', async () => {
        const server = new Server(3000);
        const app = server.app;


        const createRes = await request(app)
            .post('/orders')
            .send({
                size: 'S',
                toppings: [],
                items: [{ name: 'pizza' }],
                address: '1234 Siempreviva'
            });

        const orderId = createRes.body.id;


        const cancelRes = await request(app).post(`/orders/${orderId}/cancel`);

        expect(cancelRes.status).toBe(200);
        expect(cancelRes.body.status).toBe('cancelled');
    });

    it('debería devolver 409 al intentar cancelar una orden ya entregada', async () => {
        const server = new Server(3000);
        const app = server.app;


        const createRes = await request(app)
            .post('/orders')
            .send({
                size: 'M',
                toppings: ['queso'],
                items: [{ name: 'pizza' }],
                address: '1234 Siempreviva'
            });

        const orderId = createRes.body.id;


        await request(app).patch(`/orders/${orderId}/status?status=delivered`);


        const cancelRes = await request(app).post(`/orders/${orderId}/cancel`);

        expect(cancelRes.status).toBe(409);
        expect(cancelRes.body.error).toBe('No se puede cancelar la orden en su estado actual');
    });
});

describe('GET /orders/status?status=cancelled', () => {
    it('debería devolver todas las órdenes con estado "cancelled"', async () => {
        const server = new Server(3000);
        const app = server.app;
        const createRes1 = await request(app)
            .post('/orders')
            .send({
                size: 'S',
                toppings: [],
                items: [{ name: 'pizza' }],
                address: '1234 Siempreviva'
            });
        const orderId1 = createRes1.body.id;
        await request(app).post(`/orders/${orderId1}/cancel`);

        const createRes2 = await request(app)
            .post('/orders')
            .send({
                size: 'M',
                toppings: ['queso'],
                items: [{ name: 'pizza' }],
                address: '1234 Siempreviva'
            });
        const orderId2 = createRes2.body.id;
        await request(app).post(`/orders/${orderId2}/cancel`);

        const res = await request(app).get('/orders/status?status=cancelled');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(2);
        res.body.forEach((order: any) => {
            expect(order.status).toBe('cancelled');
        });
    });
});



