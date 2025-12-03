import { render, screen, fireEvent } from '@testing-library/react';
import { OrderProvider } from '../../context/OrderProvider';
import OrderList from '../../components/OrderList';
import Product from '../Product';

describe('HU2 — Agregar ítem', () => {
  test('debe agregar un producto al pedido al clickear un boton', () => {
    render(
        <OrderProvider>
          <Product id={1} name="Café" price={100} />
          <OrderList />
        </OrderProvider>
    );

    const button = screen.getByText('Agregar Café');
    fireEvent.click(button);

    const list = screen.getByRole('list');
    expect(list).toHaveTextContent('Café');
  });
});
