import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OrderProvider } from '../../context/OrderProvider';
import Product from '../Product'
import { SendOrderButton } from '../SendOrder';
import OrderList from '../OrderList';

describe('Enviar pedido', () => {
  test('envía el pedido y lo confirma por pantalla', async () => {
    render(
      <OrderProvider>
        <Product id={1} name="Café" price={100} />
        <Product id={2} name="Té" price={50} />
        <OrderList />
        <SendOrderButton />
      </OrderProvider>
    );

    
    fireEvent.click(screen.getAllByText('Agregar Café')[0]); 
    fireEvent.click(screen.getAllByText('Agregar Té')[0]); 

    
    fireEvent.click(screen.getByText('Enviar pedido'));

    
    await waitFor(() =>
      expect(screen.getByText('Pedido confirmado')).toBeInTheDocument()
    );
  });
});
