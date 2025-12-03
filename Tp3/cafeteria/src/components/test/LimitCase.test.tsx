import { http, HttpResponse } from 'msw';
import {server} from '../../mocks/server'
import { render, screen } from '@testing-library/react';
import { Menu } from '../Menu';


describe('Caso límite: menú vacío o error', () => {

  test('Muestra “No hay productos disponibles” cuando se devuelve lista vacía', async () => {
    server.use(
      http.get('/api/menu', () => {
        return HttpResponse.json([])
      })
    );

    render(<Menu />);
    expect(await screen.findByText('No hay productos disponibles')).toBeInTheDocument();
  });

  test('Muestra “Error al cargar menú” si el servidor responde 500', async () => {
    server.use(
      http.get('/api/menu', () => {
        return HttpResponse.json({ message: 'Error al obtener el menú' }, { status: 500 });
      })
    );

    render(<Menu />);
    expect(await screen.findByText('Error al obtener el menú')).toBeInTheDocument();
  });
});
