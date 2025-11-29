
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { server } from "../../src/mocks/server";
import App from '../../src/App';

test('muestra "Error al cargar menú" ante error 500', async () => {
  server.use(
    rest.get('/api/menu', (req, res, ctx) => res(ctx.status(500)))
  );

  render(<App />);

  await screen.findByText(/Error al cargar menú/i);
});

test('muestra "No hay productos disponibles" ante lista vacía', async () => {
  server.use(
    rest.get('/api/menu', (req, res, ctx) => res(ctx.status(200), ctx.json([])))
  );

  render(<App />);

  await screen.findByText(/No hay productos disponibles/i);
});