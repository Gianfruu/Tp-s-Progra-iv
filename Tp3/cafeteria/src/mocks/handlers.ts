import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/menu', () => {
    return HttpResponse.json([
      { id: '1', name: 'Café', price: 500 },
      { id: '2', name: 'Té', price: 400 },
    ]);
  }),
    http.post('/api/orders', async ({ request }) => {
    const data = await request.json();
    console.log('Pedido recibido en mock:', data);

    return HttpResponse.json({ message: 'Pedido confirmado' }, { status: 200 });
  })
];
